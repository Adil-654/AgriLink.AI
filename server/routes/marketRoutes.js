const express = require('express')

const router = express.Router()

router.get('/prices', (req, res) => {
  const prices = [
    {
      crop: 'Rice',
      pricePerKg: 42,
    },
    {
      crop: 'Wheat',
      pricePerKg: 25,
    },
    {
      crop: 'Millet',
      pricePerKg: 34,
    },
    {
      crop: 'Cotton',
      pricePerKg: 70,
    },
    {
      crop: 'Groundnut',
      pricePerKg: 60,
    },
    {
      crop: 'Maize',
      pricePerKg: 21,
    },
    {
      crop: 'Tea',
      pricePerKg: 200,
    },
    {
      crop: 'Coffee',
      pricePerKg: 280,
    },
    {
      crop: 'Watermelon',
      pricePerKg: 12,
    },
    {
      crop: 'Sugarcane',
      pricePerKg: 4,
    },
  ]

  res.json(prices)
})

module.exports = router