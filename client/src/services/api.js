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

/**
 * Safely parse a fetch Response as JSON.
 * If the response is not JSON (e.g. an HTML error page from the proxy or server),
 * throws a user-friendly error instead of a cryptic "Unexpected token" error.
 */
async function safeJsonParse(res) {
  const contentType = res.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return await res.json();
  }

  // The response is not JSON — likely an HTML error page from a dead backend / proxy
  // Read the text for debugging but don't expose it to the user
  await res.text().catch(() => '');

  if (res.status === 502 || res.status === 503 || res.status === 504) {
    throw new Error(
      'The backend server is currently unavailable. Please ensure the server is running on port 9000 and try again.'
    );
  }

  if (res.status === 404) {
    throw new Error(
      'API endpoint not found. Please ensure the backend server is running and the API URL is configured correctly.'
    );
  }

  // Generic non-JSON response
  throw new Error(
    `The server returned an unexpected response (HTTP ${res.status}). Please ensure the backend server is running at ${API_BASE}.`
  );
}

export async function submitRegistration(payload) {
  let res;
  try {
    res = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Network-level errors (server not running, DNS failure, CORS preflight failure, etc.)
    throw new Error(
      `Unable to connect to the backend server. Please ensure the server is running at ${API_BASE} and try again.`
    );
  }

  const data = await safeJsonParse(res);

  if (!res.ok) {
    throw new Error(data.message || `Registration failed with status ${res.status}`);
  }

  return data;
}

export async function getRegistrationDetails(registrationId) {
  let res;
  try {
    res = await fetch(`${API_BASE}/registrations/${registrationId}`);
  } catch (error) {
    throw new Error(
      'Unable to connect to the backend server. Please ensure the server is running and try again.'
    );
  }

  const data = await safeJsonParse(res);

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch registration');
  }

  return data;
}

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) return { status: 'offline', databaseConnected: false };
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { status: 'offline', databaseConnected: false };
    }
    return await res.json();
  } catch (e) {
    return { status: 'offline', databaseConnected: false };
  }
}
