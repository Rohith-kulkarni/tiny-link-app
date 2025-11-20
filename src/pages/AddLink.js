import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AddLink() {
  const { token } = useContext(AuthContext);
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const createLink = async () => {
    const res = await fetch(`${baseUrl}/api/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ target_url: url }),
    });

    const json = await res.json();
    setResponse(json);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Short Link</h2>
      <input
        type="text"
        className="border w-full px-4 py-2 rounded mb-3"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={createLink}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Link
      </button>

      {response && (
        <div className="mt-4 bg-white shadow p-4 rounded">
          <p>
            <strong>Code:</strong> {response.code}
          </p>
          <p>
            <strong>URL:</strong> {response.target_url}
          </p>
        </div>
      )}
    </div>
  );
}
