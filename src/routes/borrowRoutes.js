const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");
const roleMiddleware = require("../middleware/authorizationMiddleware");

const {
  borrowBook,
  returnBookById,
} = require("../controllers/borrowController");

const validate = require("../middleware/validate");
const borrowSchema = require("../validators/borrowValidator");

router.post(
  "/",
  protect,
  roleMiddleware("attendant"),
  validate(borrowSchema),
  borrowBook,
);
router.put("/:id/return", protect, roleMiddleware("attendant"), returnBookById);

module.exports = router;
