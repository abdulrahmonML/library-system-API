class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;

/* throw new AppError("Book not found", 404);
throw new AppError("Book not available", 400);
throw new AppError("Unauthorized", 401); */
