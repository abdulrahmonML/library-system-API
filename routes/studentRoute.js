const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
} = require("../controllers/studentController");

router.post("/", createStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);

module.exports = router;
