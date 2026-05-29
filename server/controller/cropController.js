const axios = require("axios");

const predictCrop = async (req, res) => {

  try {

    const response = await axios.post(
     "http://127.0.0.1:8000/predict",
      req.body
    );

    res.status(200).json(response.data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Prediction Failed"
    });
  }
};

module.exports = {
  predictCrop,
};