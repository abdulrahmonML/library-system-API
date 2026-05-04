const { cloudinary } = require("../config/cloudinary");
const Author = require("../models/author");
const Book = require("../models/book");
const AppError = require("../utils/appError");

const create = async (data) => {
  if (!Array.isArray(data.authors) || data.authors.length === 0) {
    throw new AppError("Authors cannot be empty", 400);
  }

  const uniqueAuthors = [...new Set(data.authors)];

  const isbn = data.isbn;

  const [foundAuthors, existingIsbn] = await Promise.all([
    Author.find({ _id: { $in: uniqueAuthors } }),
    Book.findOne({ isbn }),
  ]);

  if (foundAuthors.length !== uniqueAuthors.length) {
    throw new AppError("One or more IDs are Invalid", 404);
  }

  if (existingIsbn) throw new AppError("isbn already exists", 400);

  const newBook = await Book.create(data);

  return newBook;
};

const getAll = async (queryFilter, page, limit) => {
  const dbfilter = {};

  // Filter by availability
  if (queryFilter.available) dbfilter.availableCopies = { $gt: 0 };

  // Search by title (partial, case insensitive)
  if (queryFilter.title)
    dbfilter.title = { $regex: queryFilter.title, $options: "i" };

  // Search by isbn
  if (queryFilter.isbn)
    dbfilter.isbn = { $regex: queryFilter.isbn, $options: "i" };

  // Filter by author id
  if (queryFilter.author) dbfilter.authors = queryFilter.author;

  // convert to number and set defaults
  const pageNumber = page || 1;
  const limitNumber = Math.min(limit || 10, 50);
  const skip = (pageNumber - 1) * limitNumber;

  if (pageNumber < 1 || limitNumber < 1) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  // Get total count for metadata response
  const total = await Book.countDocuments(dbfilter);

  const books = await Book.find(dbfilter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  return {
    books,
    results: books.length,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

const getById = async (id) => {
  const book = await Book.findById(id)
    .populate({ path: "authors", select: "_id name bio" })
    .populate({ path: "borrowId", select: "borrowDate dueDate status" });

  if (!book) {
    throw new AppError("Book does not exist", 404);
  }

  return book;
};

const update = async (id, data, newFile) => {
  const book = await Book.findById(id);

  if (!book) {
    throw new AppError("Book to update does not exist", 404);
  }

  if (newFile) {
    if (book.publicId) {
      await cloudinary.uploader.destroy(book.publicId);
    }

    data.imageUrl = newFile.path;
    data.publicId = newFile.filename;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after", runValidators: true },
    );
  }

  return updatedBook;
};

const deleteById = async (id) => {
  const book = await Book.findById(id);

  if (!book) {
    throw new AppError("Book to delete does not exist", 404);
  }

  if (book.publicId) {
    await cloudinary.uploader.destroy(book.publicId);
  }

  await Book.findfindByIdAndDelete(id);

  return book;
};

module.exports = { create, getAll, getById, update, deleteById };
