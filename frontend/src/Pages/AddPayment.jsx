import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddPayment() {
  const [consultations, setConsultations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/consultations/')
      .then(res => setConsultations(res.data))
      .catch(err => console.error('Failed to fetch consultations', err));
  }, []);

  const handleConsultationSelect = async (e) => {
    const consultationId = e.target.value;
    if (!consultationId) return;

    const consultation = consultations.find(c => c.id == consultationId);
    if (!consultation) return;

    try {
      const doctorRes = await axios.get(`http://localhost:8000/doctors/${consultation.doctor_id}`);
      const patientRes = await axios.get(`http://localhost:8000/patients/${consultation.patient_id}`);
      const doctor = doctorRes.data;
      const patient = patientRes.data;

      const commissionValue = parseFloat(consultation.amount_paid) * (parseFloat(doctor.commission_rate) / 100);
      const doctorReceives = parseFloat(consultation.amount_paid) - commissionValue;

      setSelected({
        consultationId: consultation.id,
        doctor,
        patient,
        amount_paid: parseFloat(consultation.amount_paid),
        commissionValue: commissionValue.toFixed(2),
        doctorReceives: doctorReceives.toFixed(2),
      });

      setPaymentData({
        consultation_id: consultation.id,
        doctor_id: doctor.id,
        patient_id: patient.id,
        payment_date: new Date().toISOString().split('T')[0],  // today's date
        amount_paid: consultation.amount_paid,
        commission_value: commissionValue.toFixed(2),
        doctor_receives: doctorReceives.toFixed(2)
      });

    } catch (error) {
      console.error('Error fetching doctor or patient', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentData) return;

    try {
      await axios.post('http://localhost:8000/payments/', paymentData);
      alert('✅ Payment recorded!');
    } catch (err) {
      console.error('Error submitting payment:', err);
      alert('❌ Failed to submit payment. Make sure this consultation hasn’t been paid already.');
    }
  };

  return (
    <div>
      <h2>Add Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Consultation:</label>
        <select onChange={handleConsultationSelect}>
          <option value="">Select...</option>
          {consultations.map((c) => (
            <option key={c.id} value={c.id}>
              {`Consultation ID ${c.id} | Doctor ${c.doctor_id} | Patient ${c.patient_id}`}
            </option>
          ))}
        </select>

        {selected && (
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Doctor:</strong> {selected.doctor.first_name} {selected.doctor.last_name}</p>
            <p><strong>Patient:</strong> {selected.patient.first_name} {selected.patient.last_name}</p>
            <p><strong>Paid:</strong> ${selected.amount_paid}</p>
            <p><strong>Commission:</strong> ${selected.commissionValue} ({selected.doctor.commission_rate}%)</p>
            <p><strong>Doctor Receives:</strong> ${selected.doctorReceives}</p>

            <button type="submit">Submit Payment</button>
          </div>
        )}
      </form>
    </div>
  );
}
