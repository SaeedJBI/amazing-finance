from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, date

# ---------------------------
# Doctor Schema
# ---------------------------
class DoctorBase(BaseModel):
    first_name: str
    last_name: str
    mobile_number: Optional[str]
    whatsapp_number: Optional[str]
    address: Optional[str]
    specialty: Optional[str]
    commission_rate: float

class DoctorCreate(DoctorBase):
    pass

class Doctor(DoctorBase):
    id: int

    class Config:
        from_attributes  = True


# ---------------------------
# Patient Schema
# ---------------------------
class PatientBase(BaseModel):
    first_name: str
    last_name: str
    phone_number: Optional[str]

class PatientCreate(PatientBase):
    pass

class Patient(PatientBase):
    id: int

    class Config:
        from_attributes  = True


# ---------------------------
# Consultation Schema
# ---------------------------
class ConsultationBase(BaseModel):
    doctor_id: int
    patient_id: int
    consultation_date: date
    amount_paid: float

class ConsultationCreate(ConsultationBase):
    pass

class Consultation(ConsultationBase):
    id: int

    class Config:
        from_attributes  = True


# ---------------------------
# Payment Schema
# ---------------------------
class PaymentBase(BaseModel):
    consultation_id: int
    doctor_id: int
    patient_id: int
    payment_date: date
    amount_paid: float
    commission_value: float
    doctor_receives: float
    created_at: datetime

class PaymentCreate(PaymentBase):
    pass

class Payment(PaymentBase):
    id: int

    class Config:
        from_attributes  = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
