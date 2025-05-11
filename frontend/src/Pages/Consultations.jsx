import ConsultationsTable from '../components/ConsultationTable';
import { Link } from 'react-router-dom';

export default function Consultations() {
  return (
    <div>
      <h1>Consultations Page</h1>
      <Link to="/consultations/add">
        <button>Add New Consultation</button>
      </Link>
        <ConsultationsTable /> 
    </div>
  );
}
// // This code defines a React component for the Consultations page. It includes a link to add a new consultation. The button navigates to the "Add Consultation" page when clicked. The component is structured with a header and a button for adding new consultations.