from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import create_doctor, get_doctors, get_doctor
from app.schemas import DoctorCreate, Doctor
from app.database import SessionLocal
from typing import List
from fastapi import HTTPException 

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

# Get a single doctor by ID
@router.get("/doctors/{doctor_id}", response_model=Doctor)
def read_doctor(doctor_id: int, db: Session = Depends(get_db)):
    from app.crud import get_doctor  # import it here if not at top
    doctor = get_doctor(db, doctor_id=doctor_id)
    if doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor