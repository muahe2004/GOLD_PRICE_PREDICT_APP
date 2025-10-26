from fastapi import APIRouter

from app.apis.routes import (
    predicts
)

api_router = APIRouter()
api_router.include_router(predicts.router, prefix="/predicts", tags=["predicts"])