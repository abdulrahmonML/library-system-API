const authorService = require("../services/authorService");

const createAuthor = async (req, res, next) => {
  try {
    const { name, bio } = req.body;

    const author = await authorService.create(name, bio);

    res.status(201).json({
      status: "success",
      message: "Author created successfully",
      data: author,
    });
  } catch (error) {
    next(error);
  }
};

const getAuthors = async (req, res, next) => {
  try {
    const { name, page, limit } = req.query;

    const authors = await authorService.getAll({ name }, page, limit);

    res.status(200).json({
      success: true,
      message: "Authors fetched",
      data: authors,
    });
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await authorService.getOne(id);

    res.status(200).json({
      success: true,
      message: "Author fetched",
      data: author,
    });
  } catch (error) {
    next(error);
  }
};

//PUT AUTHOR
const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, bio } = req.body;

    const author = await authorService.update(id);

    return res.status(200).json({
      success: true,
      message: "Author updated",
      data: author,
    });
  } catch (error) {
    next(error);
  }
};
const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await authorService.deleteOne(id);

    return res.status(200).json({
      success: true,
      message: "Author deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
