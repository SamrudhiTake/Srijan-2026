/**
 * Srijan Backend API Client
 */

const rawApiUrl = import.meta.env.VITE_API_URL;

/**
 * Normalize the API base URL:
 * - If not provided, defaults to '/api' (which is proxied by Vite dev server to localhost:9000)
 * - If provided without trailing '/api' (e.g. 'https://srijan-2026-ebak.onrender.com'), appends '/api'
 * - If provided with '/api' (e.g. 'http://localhost:9000/api'), keeps it clean without duplicate slashes
 */
const formatApiBase = (url) => {
  if (!url || !url.trim()) return '/api';
  const clean = url.trim().replace(/\/+$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
};

const API_BASE = formatApiBase(rawApiUrl);

export async function submitRegistration(payload) {
  try {
    const res = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Registration failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(
        `Unable to connect to the backend server (${API_BASE}). Please verify the backend is running and reachable.`
      );
    }
    throw error;
  }
}

export async function getRegistrationDetails(registrationId) {
  try {
    const res = await fetch(`${API_BASE}/registrations/${registrationId}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch registration');
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) return { status: 'offline', databaseConnected: false };
    return await res.json();
  } catch (e) {
    return { status: 'offline', databaseConnected: false };
  }
}
