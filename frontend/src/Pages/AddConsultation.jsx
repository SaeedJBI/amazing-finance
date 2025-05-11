import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddConsultation() {
  const [form, setForm] = useState({
    doctor_id: '',
    patient_id: '',
    consultation_date: '',
    amount_paid: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch doctors and patients from the backend
    axios.get('http://localhost:8000/doctors/')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors:', error));

    axios.get('http://localhost:8000/patients/')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/consultations/', form);
      console.log('Success:', res.data);
      alert('Consultation added!');
      // Reset the form
      setForm({
        doctor_id: '',
        patient_id: '',
        consultation_date: '',
        amount_paid: ''
      });
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add consultation.');
    }
  };

  return (
    <div>
      <h2>Add Consultation</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <select name="doctor_id" value={form.doctor_id} onChange={handleChange}>
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.first_name} {doctor.last_name}
            </option>
          ))}
        </select>

        <select name="patient_id" value={form.patient_id} onChange={handleChange}>
          <option value="">Select Patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.first_name} {patient.last_name}
            </option>
          ))}
        </select>

        <input 
          name="consultation_date" 
          type="date" 
          value={form.consultation_date} 
          onChange={handleChange} 
        />
        
        <input 
          name="amount_paid" 
          type="number" 
          placeholder="Amount Paid" 
          value={form.amount_paid} 
          onChange={handleChange} 
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
