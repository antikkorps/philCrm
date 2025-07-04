const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE_URL || 'http://172.20.235.22:3030'; // adapte selon ton cas
const FAKE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmYWY4YjEzLWEyZWEtNDM5OC1hMjgwLWJlNDBlY2JhZWJjZSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidGVuYW50SWQiOiIwMjRhNzE4NC01YTI4LTRiNzQtODBmZC0wZTA3MjliYTlkNTkiLCJpYXQiOjE3NTE5OTU2MTEsImV4cCI6MTc1MjA4MjAxMX0.zi2uIs_qXln8dU8mCqvhMgRXidetXgi0lvyOL1Mc2Wk';

export async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}) {
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${FAKE_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.status}`;
    try {
      const data = await response.json();
      if (data && data.error) {
        errorMessage = data.error;
      }
    } catch (e) {
      // ignore, on garde le message par défaut
    }
    throw new ApiError(errorMessage, response.status);
  }


  if (response.status === 204 || response.status === 205) {
    return null;
  }



  return response.json() as Promise<T>;
}


export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype); // ← important pour instanceof
  }
}