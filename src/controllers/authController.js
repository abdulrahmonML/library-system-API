require("dotenv").config();

const authService = require("../services/authService");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const result = await authService.register(name, email, password, role);

    res.status(201).json({
      success: true,
      message: `User ${name} registered successfully`,
      data: {
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

//export
module.exports = { registerUser, loginUser };
