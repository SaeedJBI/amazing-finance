from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Doctor, Patient, Consultation, Payment
from datetime import date

# Create a session
db = SessionLocal()

def create_doctor():
    doctor = Doctor(
        first_name="John",
        last_name="Doe",
        mobile_number="1234567890",
        whatsapp_number="1234567890",
        address="123 Medical St.",
        specialty="Cardiologist",
        commission_rate=20.00  # 20% commission
    )
    db.add(doctor)
    db.commit()
    db.refresh(doctor)
    print(f"Doctor created: {doctor.first_name} {doctor.last_name}")
    return doctor

def create_patient():
    patient = Patient(
        first_name="Jane",
        last_name="Smith",
        phone_number="9876543210"
    )
    db.add(patient)
    db.commit()
    db.refresh(patient)
    print(f"Patient created: {patient.first_name} {patient.last_name}")
    return patient

def create_consultation(doctor, patient):
    consultation = Consultation(
        doctor_id=doctor.id,
        patient_id=patient.id,
        consultation_date=date.today(),
        amount_paid=500.00  # Amount paid for consultation
    )
    db.add(consultation)
    db.commit()
    db.refresh(consultation)
    print(f"Consultation created for: {doctor.first_name} {doctor.last_name} with {patient.first_name} {patient.last_name}")
    return consultation

def create_payment(consultation, doctor, patient):
    # Calculate the commission and what the doctor receives after commission
    commission_value = (consultation.amount_paid * doctor.commission_rate) / 100
    doctor_receives = consultation.amount_paid - commission_value

    payment = Payment(
        consultation_id=consultation.id,
        doctor_id=doctor.id,
        patient_id=patient.id,
        payment_date=date.today(),
        amount_paid=consultation.amount_paid,
        commission_value=commission_value,
        doctor_receives=doctor_receives
    )
    db.add(payment)
    db.commit()
    db.refresh(payment)
    print(f"Payment created: {payment.amount_paid}, Commission: {payment.commission_value}, Doctor Receives: {payment.doctor_receives}")
    return payment

# Run the functions
doctor = create_doctor()
patient = create_patient()
consultation = create_consultation(doctor, patient)
payment = create_payment(consultation, doctor, patient)

# Close the session
db.close()
