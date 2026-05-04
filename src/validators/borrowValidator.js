const Joi = require("joi");

const borrowSchema = Joi.object({
  bookId: Joi.string().required(),
  studentId: Joi.string().optional(),
});

module.exports = borrowSchema;
