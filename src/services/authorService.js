const Author = require("../models/author");
const AppError = require("../utils/appError");

const create = async (name, bio) => {
  const author = await Author.create({ name, bio });

  return author;
};

const getAll = async (queryFilter, page, limit) => {
  const dbfilter = {};

  // Search by name (partial, case insensitive)
  if (queryFilter.name)
    dbfilter.name = { $regex: queryFilter.name, $options: "i" };

  const pageNumber = parseInt(page) || 1;
  const limitNumber = Math.min(parseInt(limit) || 10, 50);
  const skip = (pageNumber - 1) * limitNumber;
  const total = await Author.countDocuments();

  if (pageNumber < 1 || limitNumber < 1) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const authors = await Author.find(dbfilter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  return {
    authors,
    results: authors.length,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

const getOne = async (id) => {
  const author = await Author.findById(id);

  if (!author) {
    throw new AppError("Author does not exist", 404);
  }

  return author;
};
const update = async (id, name, bio) => {
  const author = await Author.findByIdAndUpdate(
    id,
    { $set: { name, bio } },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!author) {
    throw new AppError("Author to update does not exist", 404);
  }
  return author;
};
const deleteOne = async (id) => {
  const author = await Author.findByIdAndDelete(id);

  if (!author) {
    throw new AppError("Author to delete does not exist", 404);
  }

  return author;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
};
