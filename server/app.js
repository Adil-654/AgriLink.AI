
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const cropRoutes = require("./routes/cropRoutes");
const adminRoutes = require("./routes/adminRoutes");
const marketRoutes = require("./routes/marketRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/crop", cropRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/market", marketRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "AgriLink AI API Running" });
});

module.exports = app;
