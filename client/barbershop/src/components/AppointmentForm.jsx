import { useEffect, useState } from "react";

export default function AppointmentForm() {
  const [form, setForm] = useState({
    client_id: "",
    barber_id: "",
    service_id: "",
    date_time: "",
  });
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/barbers")
      .then((r) => r.json())
      .then(setBarbers);

    fetch("http://localhost:5555/services")
      .then((r) => r.json())
      .then(setServices);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5555/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((data) => {
        alert("Appointment booked!");
        console.log(data);
      })
      .catch((err) => console.error("Booking failed", err));
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>

      <input
        type="text"
        name="client_id"
        placeholder="Client ID"
        value={form.client_id}
        onChange={handleChange}
        className="input w-full mb-3"
      />

      <select
        name="barber_id"
        value={form.barber_id}
        onChange={handleChange}
        className="input w-full mb-3"
      >
        <option value="">Select Barber</option>
        {barbers.map((barber) => (
          <option key={barber.id} value={barber.id}>
            {barber.name}
          </option>
        ))}
      </select>

      <select
        name="service_id"
        value={form.service_id}
        onChange={handleChange}
        className="input w-full mb-3"
      >
        <option value="">Select Service</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        name="date_time"
        value={form.date_time}
        onChange={handleChange}
        className="input w-full mb-3"
      />

      <button className="btn w-full">Book</button>
    </form>
  );
}
