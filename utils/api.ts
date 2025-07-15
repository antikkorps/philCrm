const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE_URL || 'http://172.20.235.22:3030'; // adapte selon ton cas
const FAKE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1ZGEwNDAzLTIyNzctNDFiOS05NGZiLWY3OGMwZDA2YTY3YiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidGVuYW50SWQiOiI5MTc2MjNlZS0zZmQyLTQ2OGMtYjlmNi1kNmUyNmIxYzY5NWMiLCJpYXQiOjE3NTIzMzgxNjIsImV4cCI6MTc1MjQyNDU2Mn0.0AhM9jBMbfRq_gkK_KGBfLNPutWtecnP60kKD4YOgeg';

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