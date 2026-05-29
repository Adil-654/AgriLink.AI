import { useState } from "react";
import api from "../services/api";

const PredictionForm = () => {
  const [soilType, setSoilType] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [season, setSeason] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/predict", {
        soilType,
        rainfall,
        season,
      });

      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Soil Type"
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
          className="border p-3 w-full mb-4"
        />

        <input
          type="number"
          placeholder="Enter Rainfall"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          className="border p-3 w-full mb-4"
        />

        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="border p-3 w-full mb-4"
        >
          <option value="">Select Season</option>
          <option value="Monsoon">Monsoon</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg w-full"
        >
          Predict Crop
        </button>
      </form>

      {result && (
        <div className="mt-5 bg-white p-5 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-3">Prediction Result</h2>

          <p>
            Recommended Crop:
            <strong> {result.recommendedCrop}</strong>
          </p>

          <p>
            Expected Yield:
            <strong> {result.expectedYield}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
