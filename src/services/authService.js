const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const register = async (name, email, password, role) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exist");
  }

  //password already hashed in schema

  //create user
  const user = await User.create({
    name,
    email,
    role,
    password,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  return {
    token: token,
    user: {
      name: user.name,
      id: user.id,
    },
  };
};

const authService = {
  login,
  register,
};

module.exports = authService;
