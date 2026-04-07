const express = require("express");
const router = express.Router();

const {
  createAttendant,
  getAttendants,
} = require("../controllers/attendantController");

router.post("/", createAttendant);
router.get("/", getAttendants);

module.exports = router;
