const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const predictRoutes = require('./routes/predictRoutes')
const shipmentRoutes=require('./routes/shipmentRoutes')
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api/predict', predictRoutes)

app.use('/api/shipments', shipmentRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'AgriLink AI API Running' })
})

module.exports = app