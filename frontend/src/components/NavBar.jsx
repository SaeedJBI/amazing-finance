import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      background: '#282c34',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2>Amazing Finance</h2>
      <div>
        <Link to="/doctors" style={linkStyle}>Doctors</Link>
        <Link to="/patients" style={linkStyle}>Patients</Link>
        <Link to="/consultations" style={linkStyle}>Consultations</Link>
        <Link to="/payments" style={linkStyle}>Payments</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: 'white',
  marginLeft: '1rem',
  textDecoration: 'none'
};
// This code defines a navigation bar for a React application. It uses React Router's Link component to create links to different pages (Doctors, Patients, Consultations, Payments). The navigation bar has a dark background and white text, and the links are styled to have no underline and a margin between them. The Navbar component can be imported and used in other parts of the application to provide consistent navigation.