import { useState } from "react";
import api from "../services/api";

const PredictionForm = () => {
  const [soilType, setSoilType] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [season, setSeason] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!soilType || !rainfall || !season) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await api.post("/predict", {
        soilType,
        rainfall: Number(rainfall), // ✅ important fix
        season,
      });

      setResult(response.data);
    } catch (error) {
      console.log(error);
      setError("Prediction Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">
          🌾 Crop Prediction AI
        </h2>

        {/* SOIL */}
        <input
          type="text"
          placeholder="Enter Soil Type (Black Soil, Red Soil...)"
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        />

        {/* RAINFALL */}
        <input
          type="number"
          placeholder="Enter Rainfall (e.g. 200)"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        />

        {/* SEASON */}
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        >
          <option value="">Select Season</option>
          <option value="Monsoon">Monsoon</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg w-full disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Crop"}
        </button>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 mt-3">{error}</p>
        )}
      </form>

      {/* RESULT */}
      {result && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">
            🌱 Prediction Result
          </h2>

          <p className="text-lg">
            Recommended Crop:
            <span className="font-bold text-green-600">
              {" "}{result.recommendedCrop}
            </span>
          </p>

          <p className="mt-2">
            Expected Yield:
            <span className="font-bold">
              {" "}{result.expectedYield}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;