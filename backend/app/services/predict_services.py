import numpy as np
import joblib
from tensorflow.keras.models import load_model
from datetime import datetime

class GoldPriceService:
    def __init__(self):
        # Model Dense
        self.model = load_model("./app/models/gold_model.keras")
        self.scaler = joblib.load("./app/models/scaler.save")
        self.last_lag = np.load("./app/models/last_lag.npy").reshape(1, -1)
        self.last_date = datetime.strptime("2025-10-19", "%Y-%m-%d")  # data đang đến ngày 19/10/2025

        # Model LSTM
        self.lstm_model = load_model("./app/models/lstm_gold_model.keras")
        self.lstm_scaler = joblib.load("./app/models/hieuLuongScaler.save")
        self.seq_length = 10
        self.num_cols = 6

    def predict_price(self, target_date: str) -> float:
        target_date_dt = datetime.strptime(target_date, "%Y-%m-%d")
        if target_date_dt <= self.last_date:
            raise ValueError("Ngày mục tiêu phải sau ngày cuối cùng trong dữ liệu!")

        n_days = (target_date_dt - self.last_date).days
        input_arr = self.last_lag.copy().reshape(1, -1)
        preds_scaled = []

        for _ in range(n_days):
            next_price_scaled = self.model.predict(input_arr, verbose=0)[0, 0]
            preds_scaled.append(next_price_scaled)
            input_arr = np.roll(input_arr, -1).reshape(1, -1)
            input_arr[0, -1] = next_price_scaled

        dummy = np.zeros((1, self.num_cols))
        dummy[0,0] = preds_scaled[-1]
        predicted_price_real = self.scaler.inverse_transform(dummy)[0,0]

        return float(predicted_price_real)

    def predict_next_day_price(self, scaled_data: np.ndarray) -> float:
        """
        scaled_data: numpy array đã scale, shape = (num_days, num_features)
        return: dự đoán giá ngày tiếp theo (float)
        """
        last_seq = scaled_data[-self.seq_length:].reshape(1, self.seq_length, self.num_cols)
        next_price_scaled = self.lstm_model.predict(last_seq, verbose=0)[0, 0]

        # Chuyển về giá thực tế
        next_price = self.lstm_scaler.inverse_transform(
            np.array([[next_price_scaled] + [0]*(self.num_cols-1)])
        )[0, 0]

        return float(next_price)
