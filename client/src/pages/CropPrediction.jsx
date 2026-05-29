  import { useState } from "react";
  import axios from "axios";
  import MainLayout from "../layouts/MainLayout";

  const CropPrediction = () => {
    const [form, setForm] = useState({
      soilType: "",
      rainfall: "",
      season: "",
    });

    const [result, setResult] = useState(null);

    const soilTypes = [
      "Black Soil",
      "Red Soil",
      "Alluvial Soil",
      "Laterite Soil",
      "Rocky Soil",
      "Clay Soil",
      "Sandy Soil",
    ];

    const rainfallOptions = [
      50,
      100,
      150,
      200,
      250,
      300,
      350,
      400,
    ];

    const seasons = ["Summer", "Winter", "Monsoon"];

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/crop/predict",
        form
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);
      alert("Prediction Failed");
    }
  };
const cropImages = {
  Rice:
    "https://images.unsplash.com/photo-1536055895387-5b7b1c3b7f1f?w=1200",

  Wheat:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200",

  Cotton:
    "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=1200",

  Tea:
    "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=1200",

  Millet:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200",

  Groundnut:
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=1200",

  Watermelon:
    "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=1200",
};
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-lg">
          <h1 className="text-4xl font-bold text-green-700 mb-8">
            AI Crop Prediction
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Soil Type */}
            <select
              name="soilType"
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
            >
              <option value="">Select Soil Type</option>

              {soilTypes.map((soil, index) => (
                <option key={index} value={soil}>
                  {soil}
                </option>
              ))}
            </select>

            {/* Rainfall */}
            <select
              name="rainfall"
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
            >
              <option value="">Select Rainfall</option>

              {rainfallOptions.map((rain, index) => (
                <option key={index} value={rain}>
                  {rain} mm
                </option>
              ))}
            </select>

            {/* Season */}
            <select
              name="season"
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
            >
              <option value="">Select Season</option>

              {seasons.map((season, index) => (
                <option key={index} value={season}>
                  {season}
                </option>
              ))}
            </select>

            <button className="bg-green-700 hover:bg-green-800 transition text-white w-full py-4 rounded-2xl text-lg font-semibold">
              Predict Crop
            </button>
          </form>
{result && (

  <div className="mt-12 animate-[fadeIn_0.7s_ease]">

    <div className="relative bg-white border-2 border-green-600 rounded-[40px] overflow-hidden shadow-2xl">

      {/* TOP BAR */}
      <div className="h-3 bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400"></div>

      <div className="grid md:grid-cols-2 gap-10 p-8 md:p-12 items-center">

        {/* LEFT IMAGE */}
        <div className="relative group overflow-hidden rounded-[30px]">

          <img
            src={cropImages[result.recommendedCrop]}
            alt={result.recommendedCrop}
            className="w-full h-[350px] object-cover rounded-[30px] transition duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Floating Badge */}
          <div className="absolute top-5 left-5 bg-white text-green-700 px-5 py-2 rounded-full font-bold shadow-lg">
            AI Recommended
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">

          <div>

            <p className="uppercase tracking-[5px] text-sm text-green-600 font-semibold">
              Smart Agriculture AI
            </p>

            <h1 className="text-5xl md:text-6xl font-black text-gray-800 mt-3">
              {result.recommendedCrop}
            </h1>

          </div>

          {/* Stats */}
     

          {/* Description */}
          <div className="bg-gray-50 border rounded-3xl p-6 leading-8 text-gray-700 text-lg">

            Based on soil condition, rainfall level and seasonal analysis,
            our Machine Learning model predicts
            {" "}
            <span className="font-bold text-green-700">
              {result.recommendedCrop}
            </span>
            {" "}
            as the most suitable crop for maximum productivity.

          </div>

          {/* Button */}
          <button className="bg-green-700 hover:bg-green-800 transition-all duration-300 hover:scale-105 text-white px-8 py-4 rounded-2xl font-bold shadow-lg">

            Smart Farming Recommendation

          </button>

        </div>

      </div>

    </div>

  </div>
)}
        </div>
      </MainLayout>
    );
  };

  export default CropPrediction;