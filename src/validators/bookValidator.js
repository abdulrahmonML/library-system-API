const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().max(225).required(),
  isbn: Joi.string().uppercase().required(),
  authors: Joi.array().items(Joi.string()).required(),
  totalCopies: Joi.number().min(1).required(),
  availableCopies: Joi.number().min(0).required(),
});

const getBookQuerySchema = Joi.object({
  available: Joi.boolean(),
  status: Joi.string().valid("IN", "OUT"),
  title: Joi.string().max(255),
  isbn: Joi.string(),
  author: Joi.string().hex().length(24), // must be a valid MongoDB ObjectId
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
});

module.exports = { createBookSchema, getBookQuerySchema };
