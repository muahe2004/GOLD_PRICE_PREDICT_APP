from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np
from app.services.predict_services import GoldPriceService

router = APIRouter()
service = GoldPriceService()

class PredictDate(BaseModel):
    target_date: str  # "YYYY-MM-DD"

@router.post("/index")
def predict(input_data: PredictDate):
    try:
        price = service.predict_price(input_data.target_date)
        return {
            "target_date": input_data.target_date,
            "predicted_price": price
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
class LSTMInput(BaseModel):
    scaled_data: List[List[float]]  # danh sách các ngày, mỗi ngày là 1 list features đã scale

@router.post("/lstm-next-day")
def predict_lstm(input_data: LSTMInput):
    try:
        # Chuyển sang numpy array
        scaled_array = np.array(input_data.scaled_data)
        price = service.predict_next_day_price(scaled_array)
        return {
            "predicted_next_day_price": price
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))