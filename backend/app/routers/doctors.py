from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import create_doctor, get_doctors
from app.schemas import DoctorCreate, Doctor
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

# Create a new doctor
@router.post("/doctors/", response_model=Doctor)
def add_doctor(doctor: DoctorCreate, db: Session = Depends(get_db)):
    return create_doctor(db=db, doctor=doctor)

# Get all doctors
@router.get("/doctors/", response_model=List[Doctor])
def read_doctors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_doctors(db=db, skip=skip, limit=limit)
