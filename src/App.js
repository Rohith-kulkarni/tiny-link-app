import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LinkStats from "./pages/LinkStats";
import { api } from "./api/client";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const url = process.env.REACT_APP_BASE_URL;

  // Auto-detect login state (cookie-based)
  useEffect(() => {
    api(`${url}/api/auth/me`, { method: "GET" })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const handleLogin = (u) => {
    setUser(u);
  };

  const handleLogout = async () => {
    await api(`${url}/api/auth/logout`, { method: "POST" });
    setUser(null);
  };

  if (loading) return <div className="p-6 text-gray-700">Loading...</div>;

  // If user isn't logged in, redirect away from protected routes
  const isAuth = !!user;
  const protectedRoutes = ["/dashboard"];

  if (!isAuth && protectedRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />

        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/links/:code" element={<LinkStats />} />

        <Route path="*" element={<div className="p-6">Not found</div>} />
      </Routes>
    </div>
  );
}
