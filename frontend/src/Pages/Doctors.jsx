import DoctorsTable from '../components/DoctorsTable';
import { Link } from 'react-router-dom';

export default function Doctors() {
  return (
    <div>
      <h1>Doctors Page</h1>
      <Link to="/doctors/add">
        <button>Add New Doctor</button>
      </Link>
      <DoctorsTable /> {/* This will display the doctors table */}
    </div>
  );
}
// This code defines a React component for the Doctors page. It includes a link to add a new doctor and displays a table of existing doctors using the DoctorsTable component. The DoctorsTable component is responsible for fetching and displaying the list of doctors, as well as handling the deletion of doctors.
// The page is structured with a header and a button that navigates to the "Add Doctor" page when clicked.