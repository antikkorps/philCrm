const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3030'; // adapte selon ton cas
const FAKE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4Y2IwMTFiLTdhZGQtNDkzYy04NWEzLWVmZWRiZjQxYmJiZCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidGVuYW50SWQiOiJkZTNlNTc2YS1iZGY4LTQyN2MtYWM1Zi0yZTZhMDM0YmViODMiLCJpYXQiOjE3NTI1OTQ0NzMsImV4cCI6MTc1MjY4MDg3M30.oWENiSKaPWxlWscddu-qkni7BfhUXzL2L94L8REjM7Y';

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
      console.log(data);
      if (data && data.error) {
        errorMessage = data.error;
      }
    } catch (e) {
      // ignore, on garde le message par défaut
      console.log(e);
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