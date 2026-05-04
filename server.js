require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");

const authRoutes = require("./src/routes/authRoutes");
const authorRoutes = require("./src/routes/authorRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const borrowRoutes = require("./src/routes/borrowRoutes");

const AppError = require("./src/utils/appError");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server running");
});

connectDB();

//routes
app.use("/api/auth", authRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);

// 404 handler
app.use((req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
});

//error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4006;
app.listen(PORT, () => {
  console.log("server running on port http://localhost:4006/");
});
