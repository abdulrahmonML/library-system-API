const Joi = require("joi");

const createAuthorSchema = Joi.object({
  name: Joi.string().min(3).required(),
  bio: Joi.string().optional(),
});

const getAuthorQuerySchema = Joi.object({
  name: Joi.string().max(255),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
});

module.exports = { createAuthorSchema, getAuthorQuerySchema };
