const express = require("express");
const router = express.Router();

const {
  predictCrop,
} = require("../controller/cropController");

router.post("/predict", predictCrop);

module.exports = router;