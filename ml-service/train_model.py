import pandas as pd
import pickle
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("crop_data.csv")

soil_encoder = LabelEncoder()
season_encoder = LabelEncoder()
crop_encoder = LabelEncoder()

df["soil_enc"] = soil_encoder.fit_transform(df["soil"])
df["season_enc"] = season_encoder.fit_transform(df["season"])
df["crop_enc"] = crop_encoder.fit_transform(df["crop"])

X = df[["soil_enc", "rainfall", "season_enc"]]
y = df["crop_enc"]

model = DecisionTreeClassifier()
model.fit(X, y)

with open("crop_model.pkl", "wb") as f:
    pickle.dump({
        "model": model,
        "soil_encoder": soil_encoder,
        "season_encoder": season_encoder,
        "crop_encoder": crop_encoder
    }, f)

print("✅ crop_model.pkl created")