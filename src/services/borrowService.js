const Book = require("../models/book");
const User = require("../models/user");
const Bookrecord = require("../models/borrowRecord");
const AppError = require("../utils/appError");
const sendEmail = require("../services/emailService");
const {
  borrowEmailTemplate,
  returnEmailTemplate,
} = require("../email/templates");

const borrow = async (user, bookId, studentId) => {
  const student = await User.findById(studentId);

  if (!student) {
    throw new AppError("Student does not exist", 404);
  }

  // find book by Id
  const book = await Book.findById(bookId);
  if (!book) {
    throw new AppError("Book to be borrowed not found", 404);
  }

  // check if book is available
  if (book.availableCopies === 0) {
    throw new AppError("Book not available for borrowing", 400);
  }
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 7);

  const borrowRecord = await Bookrecord.create({
    book: bookId,
    borrowedBy: studentId,
    issuedBy: user,
    borrowDate: new Date(),
    dueDate: dueDate,
    returnDate: null,
    status: "borrowed",
  });

  const html = borrowEmailTemplate(
    student.name,
    book.title,
    borrowRecord.borrowDate,
    borrowRecord.dueDate,
  );

  sendEmail({
    to: student.email,
    subject: "Book Borrowed - LibraryMS",
    text: `Book Borrowed by   ${student.name}`,
    html: html,
  }).catch((err) => console.error(err));

  book.availableCopies -= 1;
  book.borrowId = borrowRecord.id;
  await book.save();

  return borrowRecord;
};

const returnBook = async (user, borrowId) => {
  // find borrow record
  const borrowRecord = await Bookrecord.findById(borrowId)
    .populate(
      /* ("book") */ {
        path: "book",
        select: "availableCopies title", // Only pull the stock count
      },
    )
    .populate({
      path: "borrowedBy", // The student/user field
      select: "name email", // Mongoose includes the _id by default
    });
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

  //increment available copies
  borrowRecord.book.availableCopies += 1;
  await borrowRecord.book.save();

  const html = returnEmailTemplate(
    borrowRecord.borrowedBy.name,
    borrowRecord.book.title,
    borrowRecord.borrowDate,
    borrowRecord.returnDate,
  );

  sendEmail({
    to: borrowRecord.borrowedBy.email,
    subject: "Book Returned - LibraryMS",
    text: `Book Returned by   ${borrowRecord.borrowedBy.name}`,
    html: html,
  }).catch((err) => console.error(err));

  return borrowRecord;
};

module.exports = { borrow, returnBook };
