
const express = require("express");
const predictCrop = require("../controller/cropController");

const router = express.Router();

router.post("/predict", predictCrop);

module.exports = router;
