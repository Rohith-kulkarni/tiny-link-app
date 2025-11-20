import React from "react";
import { Link } from "react-router-dom";

export default function LinkCard({ link, onDelete }) {
  const linkUrl = process.env.REACT_APP_BASE_URL;
  console.log(link.created_at);
  return (
    <div className="bg-white rounded shadow p-4 flex items-start justify-between gap-4">
      {/* Left: Link info */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <a href="/" className="font-mono text-indigo-600 text-sm">
              {linkUrl}/{link.code}
            </a>
            <a
              href={link.target_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:underline break-all whitespace-normal max-w-xs"
            >
              {link.target_url}
            </a>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {link.created_at ? new Date(link.created_at).toLocaleString() : "N/A"}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex flex-col items-end gap-2">
        <a
          href={link.base_url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-indigo-600 hover:underline"
        >
          Open
        </a>
        <Link
          to={`/links/${link.code}`}
          className="text-sm text-gray-700 hover:text-indigo-600"
        >
          Stats
        </Link>
        <button
          onClick={() => onDelete(link.code)}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
