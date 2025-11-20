import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded bg-indigo-600 text-white flex items-center justify-center font-bold">
            TL
          </div>
          <div className="hidden sm:block">
            <div className="font-semibold">TinyLink</div>
            <div className="text-xs text-gray-500">Shorten & share links</div>
          </div>
        </Link>

        {/* Right: Navigation */}
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm hover:text-indigo-600">
            Dashboard
          </Link>

          {user ? (
            <>
              <span className="text-sm text-gray-700">{user.name}</span>

              <button
                onClick={async () => {
                  await onLogout();
                  navigate("/login");
                }}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
