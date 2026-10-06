/**
 * AUTH API  —  src/contexts/auth/authApi.js
 * ============================================
 * Mock implementation. To swap to a real API:
 *   1. Set VITE_USE_MOCK_AUTH=false in your .env
 *   2. Fill in the TODO sections below with real fetch() calls.
 *   3. Adjust the response shapes to match your backend.
 *
 * @module authApi
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH !== "false";

/** Token key used in localStorage */
const TOKEN_KEY = "auth_token";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeLocalStorage(fn) {
  try {
    return fn();
  } catch (err) {
    console.error("[auth] localStorage error:", err);
    return null;
  }
}

function saveToken(token) {
  safeLocalStorage(() => localStorage.setItem(TOKEN_KEY, token));
}

function clearToken() {
  safeLocalStorage(() => localStorage.removeItem(TOKEN_KEY));
}

function readToken() {
  return safeLocalStorage(() => localStorage.getItem(TOKEN_KEY));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} Session
 * @property {string} token   - Bearer token
 * @property {string} email   - Authenticated user email
 */

/**
 * Attempt to log in with email + password.
 * Mock: resolves for any non-empty email + password >= 4 chars.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Session>}
 */
export async function login(email, password) {
  if (USE_MOCK) {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 400));

    if (!email || !password || password.length < 4) {
      throw new Error("Invalid credentials");
    }

    const token = `mock-token-${Date.now()}`;
    saveToken(token);
    return { token, email };
  }

  // TODO: replace with real fetch when VITE_USE_MOCK_AUTH=false
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });
  // if (!res.ok) throw new Error("Invalid credentials");
  // const data = await res.json();
  // saveToken(data.token);
  // return data;
}

/**
 * Read the current session from localStorage.
 * Returns null if no session exists.
 *
 * @returns {Session|null}
 */
export function getSession() {
  const token = readToken();
  if (!token) return null;

  if (USE_MOCK) {
    // Derive a mock email from the stored token (good enough for dev)
    return { token, email: "demo@example.com" };
  }

  // TODO: for real APIs, validate the token (e.g. JWT decode or /me endpoint)
  return { token, email: null };
}

/**
 * Clear the current session.
 *
 * @returns {Promise<void>}
 */
export async function logout() {
  clearToken();

  if (!USE_MOCK) {
    // TODO: call the backend logout endpoint
    // await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, { method: "POST" });
  }
}
