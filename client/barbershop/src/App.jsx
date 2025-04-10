// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import BarberList from "./pages/BarberList";
import BookAppointment from "./pages/BookAppointment";
import SubmitReview from "./pages/SubmitReview";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Update this to route to Home */}
        <Route path="/barbers" element={<BarberList />} />
        <Route path="/appointments" element={<BookAppointment />} />
        <Route path="/reviews" element={<SubmitReview />} />
      </Routes>
    </Router>
  );
}

export default App;
