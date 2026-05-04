const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");
const roleMiddleware = require("../middleware/authorizationMiddleware");

const book = require("../controllers/bookController");
const { upload } = require("../config/cloudinary");

const validate = require("../middleware/validate");
const {
  createBookSchema,
  getBookQuerySchema,
} = require("../validators/bookValidator");

router.post(
  "/",
  protect,
  roleMiddleware("attendant"),
  upload.single("image"),
  validate(createBookSchema),
  book.createBook,
);
router.get("/", protect, validate(getBookQuerySchema, "query"), book.getBooks);
router.get("/:id", protect, book.getBookById);
router.put("/:id", protect, roleMiddleware("attendant"), book.updateBook);
router.delete("/:id", protect, roleMiddleware("attendant"), book.deleteBook);

module.exports = router;
