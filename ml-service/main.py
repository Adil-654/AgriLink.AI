from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def home():
    return {'message': 'ML Service Running'}

@app.post('/predict')
def predict(data: dict):
    rainfall = data.get('rainfall', 0)

    if rainfall > 200:
        crop = 'Rice'
    else:
        crop = 'Wheat'

    return {
        'recommended_crop': crop,
        'confidence': 92
    }