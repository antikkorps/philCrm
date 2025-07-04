const API_BASE_URL = 'http://172.20.235.22:3030'; // adapte selon ton cas
const FAKE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmYWY4YjEzLWEyZWEtNDM5OC1hMjgwLWJlNDBlY2JhZWJjZSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidGVuYW50SWQiOiIwMjRhNzE4NC01YTI4LTRiNzQtODBmZC0wZTA3MjliYTlkNTkiLCJpYXQiOjE3NTE2NTY4NjUsImV4cCI6MTc1MTc0MzI2NX0.Qhwt2BOZkRcwAVLHIsp48C83tfUJSB-_nf6hfAMw9Qw';

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
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}