const BASE = import.meta.env.VITE_API_URL ?? "/api";
/** Typed fetch wrapper. Adds the JWT if present and throws ApiError-shaped errors. */
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("cf_token");
  const res = await fetch(`${BASE}${path}`, { ...init, headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }), ...init.headers } });
  if (!res.ok) throw { status: res.status, message: await res.text() };
  return res.json() as Promise<T>;
}
