/**
 * ORG API  —  src/contexts/org/orgApi.js
 * ========================================
 * Mock implementation. To swap to a real API:
 *   1. Set VITE_USE_MOCK_ORG=false in your .env
 *   2. Fill in the TODO section below with real fetch() calls.
 *   3. Adjust the response shape to match your backend.
 *
 * @module orgApi
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCK_ORG !== "false";

/**
 * @typedef {Object} Org
 * @property {string} id           - Unique org identifier
 * @property {string} name         - Display name
 * @property {string} logoUrl      - URL to org logo image
 * @property {"free"|"pro"|"enterprise"} plan - Subscription plan
 * @property {string} timezone     - IANA timezone string
 * @property {string} contactEmail - Primary contact email
 */

/**
 * Fetch the current organisation data.
 * Accepts an AbortSignal so the provider can cancel on unmount.
 *
 * @param {AbortSignal} [signal]
 * @returns {Promise<Org>}
 */
export async function fetchOrg(signal) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

    return {
      id:           "org-1",
      name:         "FreshTable",
      logoUrl:      "https://placehold.co/64x64/D94F30/FFFFFF?text=FT",
      plan:         "pro",
      timezone:     "America/New_York",
      contactEmail: "hello@freshtable.example.com",
    };
  }

  // TODO: replace with real fetch when VITE_USE_MOCK_ORG=false
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/org`, { signal });
  // if (!res.ok) throw new Error("Failed to load organisation data");
  // return res.json();
}
