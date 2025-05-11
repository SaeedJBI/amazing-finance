import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ConsultationList() {
  const [consultations, setConsultations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch consultations
    axios.get('http://localhost:8000/consultations/')
      .then(res => setConsultations(res.data))
      .catch(err => console.error('Failed to fetch consultations:', err));

    // Fetch doctors
    axios.get('http://localhost:8000/doctors/')
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Failed to fetch doctors:', err));

    // Fetch patients
    axios.get('http://localhost:8000/patients/')
      .then(res => setPatients(res.data))
      .catch(err => console.error('Failed to fetch patients:', err));
  }, []);

  const getDoctorName = (id) => {
    const doc = doctors.find(d => d.id === id);
    return doc ? `${doc.first_name} ${doc.last_name}` : 'Unknown';
  };

  const getPatientName = (id) => {
    const pat = patients.find(p => p.id === id);
    return pat ? `${pat.first_name} ${pat.last_name}` : 'Unknown';
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/consultations/${id}`);
      setConsultations(consultations.filter(consultation => consultation.id !== id)); // Remove consultation from table after deleting
      alert('Consultation deleted!');
    } catch (err) {
      console.error('Error deleting consultation:', err);
      alert('Failed to delete consultation.');
    }
  };
  return (
    <div>
      <h2>Consultation Records</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation.id}>
              <td>{getDoctorName(consultation.doctor_id)}</td>
              <td>{getPatientName(consultation.patient_id)}</td>
              <td>{consultation.consultation_date}</td>
              <td>${consultation.amount_paid}</td>
                <td>
                    <button onClick={() => handleDelete(consultation.id)}>Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
