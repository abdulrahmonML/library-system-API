const Book = require("../models/book");
const Student = require("../models/student");
const Attendant = require("../models/attendant");

const borrowBook = async ({ bookId, studentId, attendantId, returnDate }) => {
  try {
    const book = await Book.findById(bookId);
    if (!book) throw { status: 404, message: "Book not found" };
    if (book.status === "OUT")
      throw { status: 400, message: "Book is currently unavailable" };

    const student = await Student.findOne({ studentId });
    if (!student) throw { status: 404, message: "Student not found" };

    const attendant = await Attendant.findOne({ attendantId });
    if (!attendant) throw { status: 404, message: "Attendant not found" };

    book.status = "OUT";
    book.borrowedBy = student._id;
    book.issuedBy = attendant._id;
    book.returnDate = new Date(returnDate);
    await book.save();

    return Book.findById(book._id).populate([
      { path: "authors" },
      { path: "borrowedBy", select: "name studentId email" },
      { path: "issuedBy", select: "name attendantId" },
    ]);
  } catch (error) {
    if (error.name === "CastError")
      throw { status: 400, message: "Invalid ID" };
    throw { status: 500, message: error.message };
  }
};

const returnBook = async (bookId) => {
  try {
    const book = await Book.findById(bookId);
    if (!book) throw { status: 404, message: "Book not found" };
    if (book.status === "IN")
      throw { status: 400, message: "Book is already in the library" };

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;
    await book.save();

    return Book.findById(book._id).populate("authors");
  } catch (error) {
    if (error.name === "CastError")
      throw { status: 400, message: "Invalid ID" };
    throw { status: 500, message: error.message };
  }
};

module.exports = { borrowBook, returnBook };
