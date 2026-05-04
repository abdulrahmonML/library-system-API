const mongoose = require("mongoose");
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
      trim: true,
      uppercase: true,
    },
    authors: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Author",
        },
      ],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "A book must have at least one author",
      },
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    borrowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookRecord",
    },
    image: {
      imageUrl: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    // Add the transformation logic here
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Book", bookSchema);
