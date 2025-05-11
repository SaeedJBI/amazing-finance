import { useState } from 'react';
import axios from 'axios';

export default function AddPatient() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone_number: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/patients/', form);
      console.log('Success:', res.data);
      alert('Patient added!');
      // Reset the form after submission
      setForm({
        first_name: '',
        last_name: '',
        phone_number: ''
      });
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add patient.');
    }
  };

  return (
    <div>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
        <input name="phone_number" placeholder="Phone Number" value={form.phone_number} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
// // This code defines a React component for adding a new patient. It uses the useState hook to manage form state and axios for making HTTP requests. The form includes fields for the patient's first name, last name, and phone number. When the form is submitted, it sends a POST request to the server with the form data. If successful, it resets the form and displays a success message; otherwise, it logs the error and shows a failure message.
// // The form is styled with a flexbox layout for better spacing and alignment.