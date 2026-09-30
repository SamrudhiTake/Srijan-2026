/**
 * Srijan Backend API Client
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

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
        'Unable to connect to the registration server. Please make sure the backend is running at http://localhost:5000'
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
