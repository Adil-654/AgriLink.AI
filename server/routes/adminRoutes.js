const express = require('express')
const router = express.Router()

const {
  getAllFarmers,
} = require('../controller/adminController')

// Get all farmers
router.get('/farmers', getAllFarmers)

module.exports = router