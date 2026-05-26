const express = require('express')
const Shipment = require('../models/Shipment')
const User = require('../models/User')
const router = express.Router()

// ==========================================
// CREATE SHIPMENT
// ==========================================
router.post('/create', async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Shipment created successfully',
      shipment,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

// ==========================================
// GET ALL SHIPMENTS
// ==========================================
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({
      createdAt: -1,
    })

    res.status(200).json(shipments)
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

// ==========================================
// GET SINGLE SHIPMENT
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findById(
      req.params.id
    )

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found',
      })
    }

    res.status(200).json(shipment)
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

// ==========================================
// UPDATE SHIPMENT STATUS
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Shipment updated successfully',
      shipment,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

// ==========================================
// DELETE SHIPMENT
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(
      req.params.id
    )

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Shipment deleted successfully',
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

// ==========================================
// SHIPMENT ANALYTICS
// ==========================================
router.get('/analytics/stats', async (req, res) => {

  try {

    const totalShipments =
      await Shipment.countDocuments()

    const deliveredShipments =
      await Shipment.countDocuments({
        status: 'Delivered',
      })

    const pendingShipments =
      await Shipment.countDocuments({
        status: 'Pending',
      })

    const inTransitShipments =
      await Shipment.countDocuments({
        status: 'In Transit',
      })

    // Count users with farmer role
    const totalFarmers =
      await User.countDocuments({
        role: 'farmer',
      })

    const shipments = await Shipment.find()

    let totalRevenue = 0

    shipments.forEach((shipment) => {
      totalRevenue += shipment.quantity * 20
    })

    res.status(200).json({
      totalShipments,
      deliveredShipments,
      pendingShipments,
      inTransitShipments,
      totalFarmers,
      totalRevenue,
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})
module.exports = router