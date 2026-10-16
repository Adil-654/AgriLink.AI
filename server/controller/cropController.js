
const axios = require("axios");

const predictCrop = async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      req.body
    );

    return res.json(response.data);
  } catch (err) {
    console.error("ERROR:", err.message);

    return res.status(500).json({
      message: "Flask service not reachable",
    });
  }
};

module.exports = predictCrop;
