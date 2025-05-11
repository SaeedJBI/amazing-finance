import PatientsTable from '../components/PatientsTable';
import { Link } from 'react-router-dom';

export default function Patients() {
  return (
    <div>
      <h1>Patients Page</h1>
      <Link to="/patients/add">
        <button>Add New Patient</button>
      </Link>
      <PatientsTable /> 
    </div>
  );
}
// // This code defines a React component for the Patients page. It includes a link to add a new patient. The button navigates to the "Add Patient" page when clicked. The component is structured with a header and a button for adding new patients.
// // The component is exported for use in other parts of the application.