 const axios = require("axios");

const cropMarketAnalysis = async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/crop-analysis",
      req.body
    );

    res.json(response.data);

  } catch (err) {
    console.log("Flask Error:", err.message);

    res.status(500).json({
      message: "Crop analysis failed",
      error: err.message
    });
  }
};

module.exports = { cropMarketAnalysis };