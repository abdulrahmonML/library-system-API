const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");
const roleMiddleware = require("../middleware/authorizationMiddleware");

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.post("/", protect, createBook);
router.get("/", protect, getBooks);
router.get("/:id", protect, getBookById);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
