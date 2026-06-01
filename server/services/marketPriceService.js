// services/marketPriceService.js

const prices = {
  Rice: 42,
  Wheat: 25,
  Millet: 34,
  Cotton: 70,
  Groundnut: 60,
  Maize: 21,
  Tea: 200,
  Coffee: 280,
  Watermelon: 12,
  Sugarcane: 4,
}

const getCropPrice = async (crop) => {
  return prices[crop] || 20
}

module.exports = getCropPrice