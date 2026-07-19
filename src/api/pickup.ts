const API_BASE = import.meta.env.VITE_API_BASE; // e.g. http://localhost:8080

export type PickupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  enquiryType: string;
  industry: string;
  containerSize: string;
  containerQty: string;
  frequency: string[];
  message: string;
};

export async function submitPickup(payload: PickupPayload) {
  const res = await fetch(`${API_BASE}/api/request-pickup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed");
  return data as { ok: true; id?: string; message?: string };
}
