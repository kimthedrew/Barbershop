import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Client");

  function handleLogin(e) {
    e.preventDefault();
    // TODO: Fetch login logic
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Log In</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input w-full"
        >
          <option>Client</option>
          <option>Barber</option>
        </select>
        <button className="btn w-full">Log In</button>
      </form>
    </div>
  );
}