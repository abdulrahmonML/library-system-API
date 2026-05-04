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

const validate = require("../middleware/validate");
const {
  createAuthorSchema,
  getAuthorQuerySchema,
} = require("../validators/authorValidator");

router.post(
  "/",
  protect,
  roleMiddleware("attendant"),
  validate(createAuthorSchema),
  createAuthor,
);
router.get("/", validate(getAuthorQuerySchema, "query"), getAuthors);
router.get("/:id", getAuthorById);
router.put("/:id", protect, roleMiddleware("attendant"), updateAuthor);
router.delete("/:id", protect, roleMiddleware("attendant"), deleteAuthor);

module.exports = router;
