const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");
const roleMiddleware = require("../middleware/authorizationMiddleware");

const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

router.post("/", protect, roleMiddleware("attendant"), createAuthor);
router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.put("/:id", protect, roleMiddleware("attendant"), updateAuthor);
router.delete("/:id", protect, roleMiddleware("attendant"), deleteAuthor);

module.exports = router;
