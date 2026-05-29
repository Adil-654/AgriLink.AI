from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load trained model
with open("crop_model.pkl", "rb") as file:
    data = pickle.load(file)

model = data["model"]
soil_encoder = data["soil_encoder"]
season_encoder = data["season_encoder"]
crop_encoder = data["crop_encoder"]


@app.route("/predict", methods=["POST"])
def predict():

    try:

        req = request.json

        soil = req.get("soilType", "").strip()
        rainfall = int(req.get("rainfall", 0))
        season = req.get("season", "").strip()

        # Encode input
        soil_encoded = soil_encoder.transform([soil])[0]
        season_encoded = season_encoder.transform([season])[0]

        # Predict
        prediction = model.predict([
            [soil_encoded, rainfall, season_encoded]
        ])

        crop = crop_encoder.inverse_transform(prediction)[0]

        return jsonify({
            "recommendedCrop": crop,
            "expectedYield": "4 Tons/Hectare"
        })

    except Exception as e:

        print("Prediction Error:", e)

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(port=8000, debug=True)