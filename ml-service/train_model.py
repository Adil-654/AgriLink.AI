import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
import pickle

df = pd.read_csv("crop_data.csv")

soil_encoder = LabelEncoder()
season_encoder = LabelEncoder()
crop_encoder = LabelEncoder()

df["soil"] = soil_encoder.fit_transform(df["soil"])
df["season"] = season_encoder.fit_transform(df["season"])
df["crop"] = crop_encoder.fit_transform(df["crop"])

X = df[["soil", "rainfall", "season"]]
y = df["crop"]

model = DecisionTreeClassifier()
model.fit(X, y)

data = {
    "model": model,
    "soil_encoder": soil_encoder,
    "season_encoder": season_encoder,
    "crop_encoder": crop_encoder,
}

with open("crop_model.pkl", "wb") as file:
    pickle.dump(data, file)

print("Model trained")