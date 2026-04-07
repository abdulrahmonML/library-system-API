require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authorRoutes = require("./routes/authorRoute");
const bookRoutes = require("./routes/bookRoute");
const studentRoutes = require("./routes/studentRoute");
const attendantRoutes = require("./routes/attendantRoute");

app.use(express.json());

connectDB();

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/attendants", attendantRoutes);
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(4006, () => {
  console.log("server running on port http://localhost:4006/");
});
