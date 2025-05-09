from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import create_consultation, get_consultations
from app.schemas import ConsultationCreate, Consultation
from app.database import SessionLocal
from typing import List

router = APIRouter()

# Dependecy to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create a new consulation
@router.post("/consultations/", response_model=Consultation)
def add_consultation(consultation: ConsultationCreate, db: Session = Depends(get_db)):
    return create_consultation(db=db, consultation=consultation)

# Get all consultations
@router.get("/consultations/", response_model=List[Consultation])
def read_consultations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_consultations(db=db, skip=skip, limit=limit)

