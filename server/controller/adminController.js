const User = require('../models/User')

const getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({
      role: 'farmer',
    }).sort({ createdAt: -1 })

    res.status(200).json(farmers)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  getAllFarmers,
}