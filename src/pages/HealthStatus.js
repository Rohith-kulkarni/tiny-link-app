import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function HealthStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    async function fetchHealth() {
      try {
        const data = await api(`${url}/healthz`, {
          method: "GET",
        });
        setStatus(data);
      } catch (err) {
        setError(err.message || "Error fetching health");
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
    //eslint-disable-next-line
  }, []);

  if (loading) return <p className="text-blue-500">Checking health...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 rounded-lg shadow bg-white border">
      <h2 className="text-xl font-semibold mb-2">Server Health</h2>

      <div className="flex items-center gap-2 mb-2">
        <span
          className={`w-3 h-3 rounded-full ${
            status.ok ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <span className="text-lg">{status.ok ? "Healthy" : "Unhealthy"}</span>
      </div>

      <p className="text-gray-600">
        Version: <strong>{status.version}</strong>
      </p>
    </div>
  );
}
