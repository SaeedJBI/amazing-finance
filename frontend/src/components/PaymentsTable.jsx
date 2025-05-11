import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/payments/')
      .then(res => setPayments(res.data))
      .catch(err => console.error('Error fetching payments:', err));

    axios.get('http://localhost:8000/doctors/')
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Error fetching doctors:', err));

    axios.get('http://localhost:8000/patients/')
      .then(res => setPatients(res.data))
      .catch(err => console.error('Error fetching patients:', err));

    axios.get('http://localhost:8000/consultations/')
      .then(res => setConsultations(res.data))
      .catch(err => console.error('Error fetching consultations:', err));
  }, []);

  const getDoctorName = (id) => {
    const doc = doctors.find(d => d.id === id);
    return doc ? `${doc.first_name} ${doc.last_name}` : 'Unknown';
  };

  const getPatientName = (id) => {
    const pat = patients.find(p => p.id === id);
    return pat ? `${pat.first_name} ${pat.last_name}` : 'Unknown';
  };

  const getConsultationDate = (id) => {
    const con = consultations.find(c => c.id === id);
    return con ? con.consultation_date : 'Unknown';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Payment Records</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Consultation ID</th>
            <th>Doctor ID</th>
            <th>Patient ID</th>
            <th>Payment Date</th>
            <th>Total Payment</th>
            <th>Commission</th>
            <th>Doctor Receives</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.consultation_id}</td>
              <td>{p.doctor_id}</td>
              <td>{p.patient_id}</td>
              <td>{new Date(p.payment_date).toLocaleDateString()}</td> {/* Formatting Date */}
              <td>${Number(p.amount_paid).toFixed(2)}</td>
              <td>${Number(p.commission_value).toFixed(2)}</td>
              <td>${Number(p.doctor_receives).toFixed(2)}</td>
              <td>{new Date(p.created_at).toLocaleDateString()}</td> {/* Formatting Created At */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
