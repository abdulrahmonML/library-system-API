const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["student", "attendant"],
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  // If password isn't changed, just stop (don't call next)
  if (!this.isModified("password")) return;

  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);

  // In async hooks, simply returning (or finishing) acts as next()
});

module.exports = mongoose.model("User", userSchema);
