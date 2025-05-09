from sqlalchemy.orm import Session
from app.models import Doctor, Patient, Consultation, Payment
from app.schemas import DoctorCreate, PatientCreate, ConsultationCreate, PaymentCreate


# ---------------------------
# Doctor CRUD Operations
# ---------------------------
def create_doctor(db: Session, doctor: DoctorCreate):
    db_doctor = Doctor(**doctor.dict())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

def get_doctors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Doctor).offset(skip).limit(limit).all()


# ---------------------------
# Patient CRUD Operations
# ---------------------------
def create_patient(db: Session, patient: PatientCreate):
    db_patient = Patient(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def get_patients(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Patient).offset(skip).limit(limit).all()


# ---------------------------
# Consultation CRUD Operations
# ---------------------------
def create_consultation(db: Session, consultation: ConsultationCreate):
    db_consultation = Consultation(**consultation.dict())
    db.add(db_consultation)
    db.commit()
    db.refresh(db_consultation)
    return db_consultation

def get_consultations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Consultation).offset(skip).limit(limit).all()


# ---------------------------
# Payment CRUD Operations
# ---------------------------
def create_payment(db: Session, payment: PaymentCreate):
    db_payment = Payment(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_payments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Payment).offset(skip).limit(limit).all()
