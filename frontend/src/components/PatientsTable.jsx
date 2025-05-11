import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PatientsTable() {
  const [patients, setPatients] = useState([]);

  // Fetch patients from the backend when component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:8000/patients/');
        setPatients(res.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/patients/${id}`);
      setPatients(patients.filter(doctor => patient.id !== id)); // Remove patient from table after deleting
      alert('Patient deleted!');
    } catch (err) {
      console.error('Error deleting patient:', err);
      alert('Failed to delete patient.');
    }
  };

  return (
    <div>
      <h2>Patients List</h2>
      <table style={{ width: '100%', border: '1px solid #ccc', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.phone_number}</td>
              <td>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// // This code defines a React component for displaying a list of patients in a table format. It uses the useState and useEffect hooks to manage state and side effects, respectively. The component fetches patient data from a backend API when it mounts and displays it in a table. Each row includes a button to delete the corresponding patient, which updates the state and UI accordingly after deletion. The table is styled with basic CSS for better readability.
// // The table includes columns for the patient's first name, last name, and phone number. The delete functionality is implemented using an asynchronous function that sends a DELETE request to the backend API.