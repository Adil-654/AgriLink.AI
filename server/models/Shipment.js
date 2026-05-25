const mongoose = require('mongoose')

const shipmentSchema = new mongoose.Schema(
  {
    crop: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    farmerName: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['Pending', 'In Transit', 'Delivered'],
      default: 'Pending',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Shipment', shipmentSchema)