# backend/app/main.py
from fastapi import FastAPI
from app.routers import doctors, patients, consultations, payments

app = FastAPI()

# Include the doctor router
app.include_router(doctors.router)
app.include_router(patients.router)
app.include_router(consultations.router)
app.include_router(payments.router)
