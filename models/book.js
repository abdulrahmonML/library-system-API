const mongoose = require("mongoose");
const author = require("./author");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,

        //custom validation
        validate: {
          validator: async (value) => {
            //checks is an an author exists with this ID.
            const authorExists = await author.exists({
              _id: value,
            });
            return authorExists !== null;
          },
          message: "Author does not exist.",
        },
      },
    ],
    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN",
    },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendant",
    },

    returnDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
