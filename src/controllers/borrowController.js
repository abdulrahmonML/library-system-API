const borrowService = require("../services/borrowService");

const borrowBook = async (req, res) => {
  try {
    const { bookId, studentId } = req.body;
    const user = req.user;

    const borrowedBook = await borrowService.borrow(user, bookId, studentId);

    return res.status(200).json({
      message: "Book borrowed successfully!",
      data: borrowedBook,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const returnBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const borrowId = id;

    const user = req.user;

    const returnedBook = await borrowService.returnBook(user, borrowId);

    return res.status(200).json({
      message: "Book returned successfully!",
      data: returnedBook,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

module.exports = { borrowBook, returnBookById };
