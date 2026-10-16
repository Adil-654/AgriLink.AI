from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
# =========================
# LOAD CROP MODEL
# =========================
with open("crop_model.pkl", "rb") as f:
    crop_data = pickle.load(f)

crop_model = crop_data["model"]
soil_encoder = crop_data["soil_encoder"]
season_encoder = crop_data["season_encoder"]
crop_encoder = crop_data["crop_encoder"]

# =========================
# LOAD PRICE MODEL
# =========================
with open("price_model.pkl", "rb") as f:
    price_data = pickle.load(f)

price_model = price_data["model"]
price_crop_encoder = price_data["crop_encoder"]

# =========================
# HOME
# =========================
@app.route("/")
def home():
    return "🚀 Agri AI Service Running"

# =========================
# CROP PREDICTION
# =========================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        req = request.json

        soil = req.get("soilType", "")
        rainfall = int(req.get("rainfall", 0))
        season = req.get("season", "")

        soil_encoded = soil_encoder.transform([soil])[0]
        season_encoded = season_encoder.transform([season])[0]

        prediction = crop_model.predict([
            [soil_encoded, rainfall, season_encoded]
        ])

        crop = crop_encoder.inverse_transform(prediction)[0]

        return jsonify({
            "recommendedCrop": crop
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =========================
# CROP PRICE ANALYSIS AI
# =========================
@app.route("/crop-analysis", methods=["POST"])
def crop_analysis():
    try:
        crop = request.json.get("crop", "").strip()

        if not crop:
            return jsonify({"error": "Crop required"}), 400

        if crop not in price_crop_encoder.classes_:
            return jsonify({"error": "Crop not found"}), 400

        crop_encoded = price_crop_encoder.transform([crop])[0]

        historical = []
        future = []

        # past
        for year in range(2020, 2025):
            price = price_model.predict([[crop_encoded, year]])[0]
            historical.append({"year": year, "price": round(price, 2)})

        # future
        for year in range(2025, 2030):
            price = price_model.predict([[crop_encoded, year]])[0]
            future.append({"year": year, "price": round(price, 2)})

        # analysis
        first = historical[0]["price"]
        last = historical[-1]["price"]

        growth = ((last - first) / first) * 100 if first != 0 else 0

        if growth > 15:
            trend = "Strong Uptrend 📈"
            suggestion = "High profit crop"
        elif growth > 5:
            trend = "Stable Growth 📊"
            suggestion = "Moderate opportunity"
        else:
            trend = "Weak / Declining 📉"
            suggestion = "High risk crop"

        volatility = max(p["price"] for p in historical) - min(p["price"] for p in historical)

        return jsonify({
            "crop": crop,
            "trend": trend,
            "growth_percent": round(growth, 2),
            "volatility": volatility,
            "suggestion": suggestion,
            "historical": historical,
            "future": future
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(port=8000, debug=True)