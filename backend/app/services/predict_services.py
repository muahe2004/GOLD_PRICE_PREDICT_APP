import numpy as np
import joblib
from tensorflow.keras.models import load_model
from datetime import datetime

class GoldPriceService:
    def __init__(self):
        self.model = load_model("./app/models/gold_model.keras")
        self.scaler = joblib.load("./app/models/scaler.save")
        self.last_lag = np.load("./app/models/last_lag.npy").reshape(1, -1)
        self.last_date = datetime.strptime("2025-10-19", "%Y-%m-%d")  # data đang đến ngày 19/10/2025

    def predict_price(self, target_date: str) -> float:
        target_date_dt = datetime.strptime(target_date, "%Y-%m-%d")
        if target_date_dt <= self.last_date:
            raise ValueError("Ngày mục tiêu phải sau ngày cuối cùng trong dữ liệu!")

        n_days = (target_date_dt - self.last_date).days
        input_arr = self.last_lag.copy().reshape(1, -1)
        preds_scaled = []

        for _ in range(n_days):
            next_price_scaled = self.model.predict(input_arr, verbose=0)[0,0]
            preds_scaled.append(next_price_scaled)
            input_arr = np.roll(input_arr, -1).reshape(1, -1)
            input_arr[0, -1] = next_price_scaled

        dummy = np.zeros((1, 6))
        dummy[0,0] = preds_scaled[-1]
        predicted_price_real = self.scaler.inverse_transform(dummy)[0,0]

        return float(predicted_price_real)