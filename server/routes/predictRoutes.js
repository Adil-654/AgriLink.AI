const express = require('express')

const router = express.Router()

router.post('/crop', async (req, res) => {
  const { soilType, rainfall, season } = req.body

  let recommendation = 'Wheat'

  if (rainfall > 200)
    recommendation = 'Rice'

  res.json({
    recommendedCrop: recommendation,
    expectedYield: '75%',
  })
})

router.post('/create', async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body)
    res.json(shipment)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router