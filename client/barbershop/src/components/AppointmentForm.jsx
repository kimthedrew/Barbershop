import { useState } from "react";

export default function AppointmentForm() {
  const [date, setDate] = useState("");
  const [service, setService] = useState("");

  function handleBook(e) {
    e.preventDefault();
    // TODO: Send POST to /appointments
  }

  return (
    <form onSubmit={handleBook} className="max-w-md mx-auto mt-10 p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input w-full mb-3"
      />
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="input w-full mb-3"
      >
        <option value="">Select service</option>
        <option value="1">Haircut</option>
        <option value="2">Shave</option>
      </select>
      <button className="btn w-full">Book</button>
    </form>
  );
}
