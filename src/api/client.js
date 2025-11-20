// Small fetch wrapper for TinyLink frontend.
// Automatically sends cookies + JSON headers.

export async function api(path, options = {}) {
  const res = await fetch(path, {
    method: "GET",
    credentials: "include", // IMPORTANT: sends auth_token cookie
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // Some endpoints may return 204 (no content)
  if (res.status === 204) return null;

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!res.ok) {
    const err = new Error(data.error || "API Error");
    err.status = res.status;
    err.payload = data;
    throw err;
  }

  return data;
}
