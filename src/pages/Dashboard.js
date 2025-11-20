import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import LinkCard from "../components/LinkCard";

export default function Dashboard({ user }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [targetUrl, setTargetUrl] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const url = process.env.REACT_APP_BASE_URL;

  // Fetch all user's links
  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await api(`${url}/api/links`);
      setLinks(res);
      console.log(res);
    } catch (err) {
      console.error("Failed to fetch links", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
    //eslint-disable-next-line
  }, []);

  // Create new short link
  const createLink = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api(`${url}/api/links`, {
        method: "POST",
        body: JSON.stringify({
          targetUrl,
          code: code || undefined,
        }),
      });

      setTargetUrl("");
      setCode("");
      fetchLinks();
    } catch (err) {
      setError(err.payload?.error || "Failed to create link");
    }
  };

  // Delete link
  const deleteLink = async (codeToDelete) => {
    if (!window.confirm("Delete this link?")) return;

    try {
      await api(`${url}/api/links/${codeToDelete}`, { method: "DELETE" });
      setLinks((prev) => prev.filter((l) => l.code !== codeToDelete));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT: Create + List */}
      <div className="md:col-span-2">
        {/* Create Form */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Create new short link</h3>

          <form onSubmit={createLink} className="mt-3 grid gap-3">
            {error && <div className="text-red-600 text-sm">{error}</div>}

            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="border rounded px-3 py-2"
              placeholder="https://example.com"
            />

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border rounded px-3 py-2"
              placeholder="optional custom code (6-8 chars)"
            />

            <div className="flex justify-end">
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500">
                Create
              </button>
            </div>
          </form>
        </div>

        {/* List of links */}
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Your links</h3>

          {loading ? (
            <div>Loading...</div>
          ) : links.length === 0 ? (
            <div className="text-gray-500">No links yet</div>
          ) : (
            <div className="grid gap-3">
              {links.length > 0 &&
                links.map((link) => (
                  <LinkCard key={link.code} link={link} onDelete={deleteLink} />
                ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Quick Stats */}
      <aside className="h-fit">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold text-lg">Quick stats</h4>

          <div className="text-sm text-gray-600 mt-2">
            Total links: {links.length}
          </div>

          <div className="text-sm text-gray-600">
            Total clicks: {links.reduce((sum, l) => sum + (l.clicks || 0), 0)}
          </div>
        </div>
      </aside>
    </div>
  );
}
