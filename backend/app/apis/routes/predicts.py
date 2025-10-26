from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
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