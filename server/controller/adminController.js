const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Get all farmers
const getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({
      role: "farmer",
    }).sort({ createdAt: -1 });

    res.status(200).json(farmers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create new admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllFarmers,
  createAdmin,
};
