from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import create_payment, get_payments
from app.schemas import PaymentCreate, Payment
from app.database import SessionLocal
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create a new payment
@router.post("/payments/", response_model=Payment)
def add_payment(payment: PaymentCreate, db: Session = Depends(get_db)):
    return create_payment(db=db, payment=payment)

# Get all payments
@router.get("/payments/", response_model=List[Payment])
def read_payments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_payments(db=db, skip=skip, limit=limit)