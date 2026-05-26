const mongoose = require('mongoose')
const User=require('../models/User')

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
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User' 
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