const Student = require("../models/student");

const createStudent = async (req, res) => {
  try {
    const { name, studentId } = req.body;

    if (!name || !studentId) {
      return res.status(400).json({
        message: "Name and studentId are required",
      });
    }

    const student = await Student.create({ name, studentId });

    res.status(201).json({
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).populate("author");

    if (!student) {
      return res.status(404).json({
        message: "Student does not exist",
      });
    }

    res.status(200).json({
      message: `Student ${id} fetched successfully`,
      data: student,
    });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({
        message: "Invalid ID",
      });

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
};
