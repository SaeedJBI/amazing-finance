import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DoctorsTable() {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from the backend when component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:8000/doctors/');
        setDoctors(res.data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/doctors/${id}`);
      setDoctors(doctors.filter(doctor => doctor.id !== id)); // Remove doctor from table after deleting
      alert('Doctor deleted!');
    } catch (err) {
      console.error('Error deleting doctor:', err);
      alert('Failed to delete doctor.');
    }
  };

  return (
    <div>
      <h2>Doctors List</h2>
      <table style={{ width: '100%', border: '1px solid #ccc', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile</th>
            <th>WhatsApp</th>
            <th>Address</th>
            <th>Speciality</th>
            <th>Commission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td>{doctor.first_name}</td>
              <td>{doctor.last_name}</td>
              <td>{doctor.mobile_number}</td>
              <td>{doctor.whatsapp_number}</td>
              <td>{doctor.address}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.commission_rate}</td>
              <td>
                <button onClick={() => handleDelete(doctor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// This code defines a React component that displays a table of doctors fetched from a backend API. It uses the useState and useEffect hooks to manage state and side effects, respectively. The component fetches the list of doctors when it mounts and allows users to delete a doctor from the list. The table includes columns for the doctor's first name, last name, mobile number, WhatsApp number, address, specialty, commission rate, and an action button to delete the doctor.