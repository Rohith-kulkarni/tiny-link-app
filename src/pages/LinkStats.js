import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client";
import Charts from "../components/Charts";

export default function LinkStats() {
  const { code } = useParams();
  const [meta, setMeta] = useState(null);
  const [daily, setDaily] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    async function load() {
      try {
        // Meta info (public)
        const m = await api(`${url}/api/links/${code}`);
        setMeta(m);

        // Daily clicks
        const d = await api(`${url}/api/links/${code}/daily`);
        setDaily(
          d.map((item) => ({
            label: new Date(item.day).toLocaleDateString(),
            clicks: Number(item.clicks),
          }))
        );

        // Hourly clicks
        const h = await api(`${url}/api/links/${code}/hourly`);
        console.log(h);
        setHourly(
          h.map((item) => ({
            label: new Date(item.hour)
              .toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata",
              })
              .replace(":30", ":00"),
            clicks: Number(item.clicks),
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load stats");
      }
    }

    load();
  }, [code, url]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Stats — {code}</h2>

        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}

        {meta && (
          <div className="mt-2 text-sm text-gray-700">
            <div>
              Target URL:{" "}
              <Link
                to={meta.target_url}
                className="text-indigo-600"
                target="_blank"
              >
                {meta.target_url}
              </Link>
            </div>
            <div>Total Clicks: {meta.clicks}</div>
            <div>Created: {new Date(meta.created_at).toLocaleString()}</div>
          </div>
        )}

        {/* Daily Chart */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Daily Clicks</h3>
          <Charts data={daily} />
        </div>

        {/* Hourly Chart */}
        <div className="mt-10">
          <h3 className="font-semibold mb-2">Hourly Clicks</h3>
          <Charts data={hourly} />
        </div>
      </div>
    </div>
  );
}
