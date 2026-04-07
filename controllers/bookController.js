const Author = require("../models/author");
const Book = require("../models/book");
const { borrowBook, returnBook } = require("../services/borrowService");

const createBook = async (req, res) => {
  try {
    const { title, isbn, authors } = req.body;

    if (!title || !authors || !isbn) {
      return res.status(400).json({
        message: "Title, ISBN number, and Author details are required",
      });
    }

    if (!Array.isArray(authors) || authors.length === 0)
      return res.status(400).json({
        message: "Authors cannot be empty",
      });

    const uniqueAuthors = [...new Set(authors)];

    const foundAuthors = await Author.find({
      _id: { $in: uniqueAuthors },
    });

    if (foundAuthors.length !== uniqueAuthors.length)
      return res.status(404).json({ message: "One or more IDs are Invalid" });

    const existingIsbn = await Book.findOne({ isbn });

    if (existingIsbn)
      return res.status(400).json({ message: "Isbn already exist" });

    const newBook = await Book.create({ title, isbn, authors: uniqueAuthors });

    res.status(201).json({
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id).populate([
      {
        path: "authors",
        path: "borrowedBy",
        select: "name studentId email",
        path: "issuedBy",
        select: "name attendantId",
      },
    ]);

    if (!book) {
      return res.status(404).json({
        message: "Book does not exist",
      });
    }

    if (book.status === "OUT") {
      return res.status(200).json({
        message: "Book fetched successfully.",
        data: book,
      });
    }

    res.status(200).json({
      message: `Book fetched successfully`,
      data: book,
    });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({
        message: "Invalid ID",
      });

    return res.status(500).json({
      message: error.message,
    });
  }
};

//PUT Book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, isbn, authors } = req.body;

    const book = await Book.findByIdAndUpdate(
      id,
      { $set: { title, isbn, authors } },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!book) {
      return res.status(404).json({
        message: "Book to update does not exist",
      });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({
        message: "Invalid ID",
      });

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        message: "Book to delete does not exist",
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({
        message: "Invalid ID",
      });

    return res.status(500).json({
      message: error.message,
    });
  }
};

const borrowBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, attendantId, returnDate } = req.body;

    if (!studentId || !attendantId || !returnDate) {
      return res.status(400).json({
        message: "studentId, attendantId, and returnDate are required",
      });
    }

    const book = await borrowBook({
      bookId: id,
      studentId,
      attendantId,
      returnDate,
    });
    res.status(200).json({ message: "Book borrowed successfully", data: book });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({ message: "Invalid ID" });
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const returnBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await returnBook(id);
    res.status(200).json({ message: "Book returned successfully", data: book });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({ message: "Invalid ID" });
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBookById,
  returnBookById,
};
