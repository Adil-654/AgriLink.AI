import pandas as pd
import pickle
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("crop_prices.csv")

crop_encoder = LabelEncoder()
df["crop_encoded"] = crop_encoder.fit_transform(df["crop"])

X = df[["crop_encoded", "year"]]
y = df["price"]

model = LinearRegression()
model.fit(X, y)

with open("price_model.pkl", "wb") as f:
    pickle.dump({
        "model": model,
        "crop_encoder": crop_encoder
    }, f)

print("✅ price_model.pkl created")