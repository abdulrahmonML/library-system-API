const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");
const roleMiddleware = require("../middleware/authorizationMiddleware");

const {
  borrowBook,
  returnBookById,
} = require("../controllers/borrowController");

router.post(
  "/borrows",
  protect,
  roleMiddleware("student", "attendant"),
  borrowBook,
);
router.put(
  "/:id/return",
  protect,
  roleMiddleware("student", "attendant"),
  returnBookById,
);

module.exports = router;
