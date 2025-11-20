import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BASE_URL;

  const submit = async (e) => {
    console.log(url);
    e.preventDefault();
    setError(null);
    try {
      const res = await api(`${url}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // backend responds: { ok:true, user:{...} }
      onLogin(res.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.payload?.error || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold text-center">Sign in</h2>

        <form onSubmit={submit} className="mt-6 grid gap-3">
          {error && <div className="text-red-600 text-sm">{error}</div>}

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

          <button className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500">
            Sign in
          </button>

          <div className="text-sm text-gray-600 text-center mt-2">
            Don't have an account?
            <Link to="/signup" className="text-indigo-600 ml-1">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
