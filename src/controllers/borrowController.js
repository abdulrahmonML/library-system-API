const borrowService = require("../services/borrowService");

const borrowBook = async (req, res, next) => {
  try {
    const { bookId, studentId } = req.body;
    if (!bookId || !studentId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = req.user;

    const borrowedBook = await borrowService.borrow(user, bookId, studentId);

    return res.status(200).json({
      success: true,
      message: "Book borrowed!",
      data: borrowedBook,
    });
  } catch (error) {
    next(error);
  }
};

const returnBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const borrowId = id;

    const user = req.user;

    const returnedBook = await borrowService.returnBook(user, borrowId);

    return res.status(200).json({
      success: true,
      message: "Book returned!",
      data: returnedBook,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { borrowBook, returnBookById };
