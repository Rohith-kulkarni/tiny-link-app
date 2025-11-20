import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";

export default function Signup({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BASE_URL;

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api(`${url}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      // backend responds: { ok:true, user:{...} }
      onLogin(res.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.payload?.error || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold text-center">Create account</h2>

        <form onSubmit={submit} className="mt-6 grid gap-3">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <input
            type="text"
            className="border rounded px-3 py-2"
            placeholder="full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="border rounded px-3 py-2"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="border rounded px-3 py-2"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
          >
            Create account
          </button>

          <div className="text-sm text-gray-600 text-center mt-2">
            Already have an account?
            <Link to="/login" className="text-indigo-600 ml-1">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
