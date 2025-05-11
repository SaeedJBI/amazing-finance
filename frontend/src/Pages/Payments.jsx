import PaymentsTable from '../Components/PaymentsTable';
import { Link } from 'react-router-dom';

export default function Payments() {
  return (
    <div>
      <h1>Payments</h1>
      <Link to="/payments/add">
        <button>Add New Payment</button>
      </Link>
      <PaymentsTable />
    </div>
  );
}
