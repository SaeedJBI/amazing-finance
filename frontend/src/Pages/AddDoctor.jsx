import { useState } from 'react';
import axios from 'axios';

export default function AddDoctor() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',   // Updated from 'mobile' to 'mobile_number'
    whatsapp_number: '', // Updated from 'whatsapp' to 'whatsapp_number'
    address: '',
    specialty: '',       // Updated from 'speciality' to 'specialty'
    commission_rate: ''  // Updated from 'commission' to 'commission_rate'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/doctors/', form);
      console.log('Success:', res.data);
      alert('Doctor added!');
      // Reset form after successful submission
      setForm({
        first_name: '',
        last_name: '',
        mobile_number: '',
        whatsapp_number: '',
        address: '',
        specialty: '',
        commission_rate: ''
      });
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add doctor.');
    }
  };

  return (
    <div>
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
        <input name="mobile_number" placeholder="Mobile Number" value={form.mobile_number} onChange={handleChange} />
        <input name="whatsapp_number" placeholder="WhatsApp Number" value={form.whatsapp_number} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="specialty" placeholder="Specialty" value={form.specialty} onChange={handleChange} />
        <input name="commission_rate" placeholder="Commission Rate" value={form.commission_rate} onChange={handleChange} type="number" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
// This code defines a React component for adding a new doctor. It uses the useState hook to manage form state and axios for making HTTP requests. The form includes fields for the doctor's first name, last name, mobile number, WhatsApp number, address, specialty, and commission rate. When the form is submitted, it sends a POST request to the server with the form data. If successful, it resets the form and displays a success message; otherwise, it logs the error and shows a failure message.