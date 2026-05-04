const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const sendEmail = require("../services/emailService");
const { registrationEmailTemplate } = require("../email/templates");
const AppError = require("../utils/appError");

const register = async (name, email, password, role) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new AppError("User already exist", 400);
  }

  //password already hashed in schema

  //create user
  const user = await User.create({
    name,
    email,
    role,
    password,
  });

  const html = registrationEmailTemplate(user.name, user.role);

  sendEmail({
    to: user.email,
    subject: "Account creation done",
    text: `New user  ${user.name} created successfully`,
    html: html,
  }).catch((err) => console.error(err));

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
    throw new AppError("Invalid credentials", 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 400);
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
      role: user.role,
    },
  };
};

const authService = {
  login,
  register,
};

module.exports = authService;
