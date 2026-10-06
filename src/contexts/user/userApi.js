/**
 * USER API  —  src/contexts/user/userApi.js
 * ===========================================
 * Mock implementation. To swap to a real API:
 *   1. Replace the mock return with a fetch() call to your /me endpoint.
 *   2. Pass the auth token via the Authorization header.
 *
 * @module userApi
 */

/**
 * @typedef {Object} User
 * @property {string} id        - Unique user identifier
 * @property {string} name      - Display name
 * @property {string} email     - Email address
 * @property {"admin"|"member"|"viewer"} role - Role within the org
 * @property {string} avatarUrl - URL to user avatar image
 */

/**
 * Fetch the current authenticated user profile.
 * Accepts an AbortSignal so the provider can cancel on unmount.
 *
 * @param {AbortSignal} [signal]
 * @returns {Promise<User>}
 */
export async function fetchUser(signal) {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 250));
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  // TODO: replace with real fetch
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
  //   signal,
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  // if (!res.ok) throw new Error("Failed to load user profile");
  // return res.json();

  return {
    id:        "user-1",
    name:      "Alex Rivera",
    email:     "alex@freshtable.example.com",
    role:      "admin",
    avatarUrl: "https://placehold.co/48x48/4F7D4A/FFFFFF?text=AR",
  };
}
