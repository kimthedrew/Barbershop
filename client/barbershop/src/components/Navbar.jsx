import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 shadow-md">
      <div className="text-xl font-bold">Barber Shop</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/reviews">Reviews</Link>
        <button>Log out</button>
      </div>
    </nav>
  );
}