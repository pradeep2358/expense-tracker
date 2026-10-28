// Helper: sends JWT token with every request
export async function api(url, method = "GET", body) {
  const token = localStorage.getItem("token");
  const res = await fetch("/api" + url, {
    method,
    headers: { "Content-Type": "application/json", ...(token && { Authorization: "Bearer " + token }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
