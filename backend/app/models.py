from sqlalchemy import Column, Integer, String, Date, DECIMAL, ForeignKey, Text, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.database import Base


# ---------------------------
# Doctor Model
# ---------------------------
class Doctor(Base):
    __tablename__ = 'doctors'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    mobile_number = Column(String, unique=True)
    whatsapp_number = Column(String)
    address = Column(String)
    specialty = Column(String)
    commission_rate = Column(DECIMAL(5, 2))  # % like 20.00 for 20%
    created_at = Column(TIMESTAMP, server_default=func.now())

    consultations = relationship("Consultation", back_populates="doctor")
    payments = relationship("Payment", back_populates="doctor")


# ---------------------------
# Patient Model
# ---------------------------
class Patient(Base):
    __tablename__ = 'patients'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone_number = Column(String)

    consultations = relationship("Consultation", back_populates="patient")


# ---------------------------
# Consultation Model
# ---------------------------
class Consultation(Base):
    __tablename__ = 'consultations'

    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'), nullable=False)
    patient_id = Column(Integer, ForeignKey('patients.id'), nullable=False)
    consultation_date = Column(Date, nullable=False)
    amount_paid = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    doctor = relationship("Doctor", back_populates="consultations")
    patient = relationship("Patient", back_populates="consultations")
    payment = relationship("Payment", back_populates="consultation", uselist=False)


# ---------------------------
# Payment Model
# ---------------------------
class Payment(Base):
    __tablename__ = 'payments'

    id = Column(Integer, primary_key=True, index=True)
    consultation_id = Column(Integer, ForeignKey('consultations.id'), nullable=False, unique=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'), nullable=False)
    patient_id = Column(Integer, ForeignKey('patients.id'), nullable=False)
    payment_date = Column(Date, nullable=False)
    amount_paid = Column(DECIMAL(10, 2), nullable=False)
    commission_value = Column(DECIMAL(10, 2), nullable=False)
    doctor_receives = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    consultation = relationship("Consultation", back_populates="payment")
    doctor = relationship("Doctor", back_populates="payments")
