require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoute");
const authorRoutes = require("./src/routes/authorRoute");
const bookRoutes = require("./src/routes/bookRoute");
const borrowRoutes = require("./src/routes/borrowRoute");

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", borrowRoutes);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(4006, () => {
  console.log("server running on port http://localhost:4006/");
});
