/**
 * Srijan Backend API Client
 */

/**
 * Determine the backend API URL:
 * 1. Explicit environment variable: VITE_API_URL
 * 2. On production domain / Vercel (or when built for production): https://srijan-2026-ebak.onrender.com
 * 3. Local development fallback: '/api' (proxied by Vite to localhost:9000 or Render)
 */
const resolveApiUrl = () => {
  if (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) {
    return import.meta.env.VITE_API_URL.trim();
  }

  // If running in browser on a production domain (such as Vercel)
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return 'https://srijan-2026-ebak.onrender.com';
  }

  // If built for production
  if (import.meta.env.PROD) {
    return 'https://srijan-2026-ebak.onrender.com';
  }

  // Default for local development
  return '/api';
};

const rawApiUrl = resolveApiUrl();

/**
 * Normalize the API base URL:
 * - If relative (e.g. '/api'), returns as-is
 * - If full URL (e.g. 'https://srijan-2026-ebak.onrender.com'), ensures it ends with '/api'
 * - Cleans any duplicate trailing slashes
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
      'The backend server is currently starting up or unavailable. If this is the first request on Render, please allow ~30-60 seconds for spin-up and try again.'
    );
  }

  if (res.status === 404) {
    throw new Error(
      `API endpoint not found. Please ensure the backend server (${API_BASE}) is online.`
    );
  }

  // Generic non-JSON response
  throw new Error(
    `The server returned an unexpected response (HTTP ${res.status}). Please ensure the backend server is reachable at ${API_BASE}.`
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
    // Network-level errors (server waking up, DNS failure, CORS preflight failure, etc.)
    throw new Error(
      `Unable to connect to the backend server (${API_BASE}). If Render is waking up from sleep, please wait 30 seconds and try again.`
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
      `Unable to connect to the backend server (${API_BASE}). Please ensure the server is running and try again.`
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
