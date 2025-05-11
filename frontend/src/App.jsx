import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';

import Doctors from './Pages/Doctors';
import Patients from './Pages/Patients';
import Consultations from './Pages/Consultations';
import Payments from './Pages/Payments';
import AddDoctor from './Pages/AddDoctor';
import AddPatient from './Pages/AddPatient';
import AddConsultation from './Pages/AddConsultation';
import AddPayment from './Pages/AddPayment';

function App() {
  return (
    <div>
      <NavBar />

      <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <Routes>
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/doctors/add" element={<AddDoctor />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/consultations/add" element={<AddConsultation />} />
          <Route path="/payments/add" element={<AddPayment />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
// This code defines the main application component for a React application. It imports the necessary components and sets up routing using React Router. The Navbar component is displayed at the top, and the main content area is defined with padding and a maximum width. The Routes component defines different routes for the application, each rendering a specific page (Doctors, Patients, Consultations, Payments) when the corresponding path is accessed. The App component is exported for use in other parts of the application.