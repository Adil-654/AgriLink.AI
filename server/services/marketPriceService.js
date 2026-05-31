// services/marketPriceService.js

const axios = require('axios')

const getCropPrice = async (crop) => {
  try {
    const response = await axios.get(
      'ACTUAL_API_URL_HERE'
    )

    const data = response.data

    const cropData = data.find(
      (item) =>
        item.commodity?.toLowerCase() ===
        crop.toLowerCase()
    )

    if (!cropData) return 20

    return Number(cropData.modal_price) / 100
  } catch (err) {
    console.log(err.message)
    return 20
  }
}

module.exports = getCropPrice