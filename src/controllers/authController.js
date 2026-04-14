require("dotenv").config();

const authService = require("../services/authService");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (role !== "student" && role !== "attendant")
      return res.status(400).json({
        message: "You must be a student or attendant",
      });

    const result = await authService.register(name, email, password, role);

    res.status(201).json({
      message: `User ${name} registered successfully`,
      data: {
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    const result = await authService.login(email, password);

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.log(error); // This will tell you exactly which line in the service is dying
    res.status(401).json({ message: error.message });
  }
};

//export
module.exports = { registerUser, loginUser };
