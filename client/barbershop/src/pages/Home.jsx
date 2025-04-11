// src/pages/Home.jsx
import { useEffect, useState } from "react";
import BarberCard from "../components/BarberCard";

export default function Home() {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/barbers")
      .then((res) => res.json())
      .then((data) => setBarbers(data))
      .catch((error) => console.error("Error fetching barbers:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Barbers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {barbers.map((barber) => (
          <BarberCard key={barber.id} barber={barber} />
        ))}
      </div>
    </div>
  );
}
