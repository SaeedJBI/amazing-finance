from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import create_patient, get_patients
from app.schemas import PatientCreate, Patient
from app.database import SessionLocal
from typing import List

router = APIRouter()

# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create a new patient
@router.post("/patients/", response_model=Patient)
def add_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    return create_patient(db=db, patient=patient)

# get all patietns
@router.get("/patients/", response_model=List[Patient])
def read_patients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_patients(db=db, skip=skip, limit=limit)