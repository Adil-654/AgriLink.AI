const mongoose = require('mongoose')

const cropSchema = new mongoose.Schema({
  farmerId: mongoose.Schema.Types.ObjectId,
  cropName: String,
  soilType: String,
  landArea: Number,
  rainfall: Number,
  season: String,
  expectedYield: Number,
})

module.exports = mongoose.model('Crop', cropSchema)