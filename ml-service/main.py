from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    soil = data.get("soilType", "").lower()
    rainfall = int(data.get("rainfall", 0))
    season = data.get("season", "").lower()

    if soil == "black soil":
        crop = "Cotton"

    elif soil == "red soil":
        crop = "Groundnut"

    elif soil == "alluvial soil":
        crop = "Wheat"

    elif soil == "laterite soil":
        crop = "Tea"

    elif soil == "rocky soil":
        crop = "Millet"

    else:
        crop = "Rice"

    # Rainfall impact
    if rainfall > 300:
        crop = "Rice"

    elif rainfall < 100:
        crop = "Millet"

    # Season impact
    if season == "summer":
        crop = "Maize"

    elif season == "winter":
        crop = "Wheat"

    elif season == "monsoon":
        crop = "Rice"

    return jsonify({
        "recommendedCrop": crop,
        "expectedYield": "4 Tons/Hectare"
    })


app.run(host="0.0.0.0", port=8000, debug=True)