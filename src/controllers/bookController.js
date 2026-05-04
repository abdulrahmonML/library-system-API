const AppError = require("../utils/appError");
const Author = require("../models/author");
const Book = require("../models/book");
const bookService = require("../services/bookService");
const cloudinary = require("../config/cloudinary");
const { cloudinary_js_config } = require("../config/cloudinary");

const createBook = async (req, res, next) => {
  try {
    const { title, isbn, authors, totalCopies, availableCopies } = req.body;

    if (!req.file) {
      return next(new AppError("Book cover image is required", 400));
    }

    console.log(req.file);

    const data = {
      title,
      isbn,
      authors,
      totalCopies,
      availableCopies,
      image: {
        imageUrl: req.file.path,
        publicId: req.file.filename,
      },
    };

    const newBook = await bookService.create(data);
    res.status(201).json({
      success: true,
      message: "Book created",
      data: { book: newBook },
    });
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  try {
    const { available, status, title, isbn, author, page, limit } = req.query;
    const books = await bookService.getAll(
      { available, status, title, isbn, author },
      page,
      limit,
    );

    res.status(200).json({
      success: true,
      message: "Books fetched",
      data: { book: books },
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await bookService.getById(id);

    res.status(200).json({
      success: true,
      message: "Book fetched",
      data: { book },
    });
  } catch (error) {
    next(error);
  }
};

//PUT Book
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newFile = req.file;

    const { title, isbn, authors, availableCopies, totalCopies } = req.body;

    const data = { title, isbn, authors, availableCopies, totalCopies };

    const book = await bookService.update(id, data, newFile);

    return res.status(200).json({
      success: true,
      message: "Book updated ",
      data: { book },
    });
  } catch (error) {
    next(error);
  }
};

// Delete Book
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await bookService.deleteById(id);

    return res.status(200).json({
      success: true,
      message: "Book deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
