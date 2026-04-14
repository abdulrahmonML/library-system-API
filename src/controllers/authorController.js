const Author = require("../models/author");

const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const author = await Author.create({ name, bio });

    res.status(201).json({
      message: "Author created successfully",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Authors fetched successfully",
      data: authors,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({
        message: "Author does not exist",
      });
    }

    res.status(200).json({
      message: `Author  fetched successfully`,
      data: author,
    });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({
        message: "Invalid ID",
      });

    return res.status(500).json({
      message: error.message,
    });
  }
};

//PUT AUTHOR
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, bio } = req.body;

    const author = await Author.findByIdAndUpdate(
      id,
      { $set: { name, bio } },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!author) {
      return res.status(404).json({
        message: "Author to update does not exist",
      });
    }

    return res.status(200).json({
      message: "Author updated successfully",
      data: author,
    });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({
        message: "Invalid ID",
      });

    return res.status(500).json({
      message: error.message,
    });
  }
};
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      return res.status(400).json({
        message: "Author to delete does not exist",
      });
    }

    return res.status(200).json({
      message: "Author deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({
        message: "Invalid ID",
      });

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
