const Book = require("../models/book");
const Bookrecord = require("../models/borrowRecord");
const AppError = require("../utils/appError");

const borrow = async (user, bookId, studentId) => {
  // validate user
  const attendantId = user.id;
  const role = user.role;

  if (!attendantId) {
    throw new AppError("Unauthorized", 401);
  }

  // confirm role
  if (role !== "attendant") {
    throw new AppError("Forbidden: Not sufficient permissions", 403);
  }

  // find book by Id
  const book = await Book.findById(bookId);
  if (!book) {
    throw new AppError("Book to be borrowed not found", 404);
  }

  // check if book is available
  if (book.availableCopies === 0) {
    throw new AppError("Book not available for borrow", 400);
  }
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 7);

  const borrowRecord = await Bookrecord.create({
    book: bookId,
    borrowedBy: studentId,
    issuedBy: attendantId,
    borrowDate: new Date(),
    dueDate: dueDate,
    returnDate: null,
    status: "borrowed",
  });

  book.availableCopies -= 1;
  await book.save();

  return borrowRecord;
};

const returnBook = async (user, borrowId) => {
  const attendantId = user.id;
  const role = user.role;

  if (!attendantId) {
    throw new AppError("Unauthorized", 401);
  }

  // confirm role
  if (role !== "attendant") {
    throw new AppError("Forbidden: Not sufficient permissions", 403);
  }

  // find borrow record
  const borrowRecord = await Bookrecord.findById(borrowId).populate("book");
  if (!borrowRecord) {
    throw new AppError("Borrow record not found", 404);
  }

  // check not already returned
  if (borrowRecord.returnDate) {
    throw new AppError("Book already returned ", 400);
  }

  // set returnDate
  borrowRecord.returnDate = new Date();
  borrowRecord.status = "returned";
  await borrowRecord.save();

  //increement available copies
  borrowRecord.book.availableCopies += 1;
  await borrowRecord.book.save();

  const updatedBorrowRecord = borrowRecord;

  return updatedBorrowRecord;
};

module.exports = { borrow, returnBook };
