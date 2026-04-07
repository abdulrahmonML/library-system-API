const Attendant = require("../models/attendant");

const createAttendant = async (req, res) => {
  try {
    const { name, attendantId } = req.body;

    if (!name || !attendantId) {
      return res.status(400).json({
        message: "Name and attendantId are Required",
      });
    }

    const attendant = await Attendant.create({ ...req.body });

    res.status(201).json({
      message: "Attendant created successfully",
      data: attendant,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Attendants fetched successfully",
      data: attendants,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAttendant,
  getAttendants,
};
