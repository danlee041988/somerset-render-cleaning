/**
 * GCLID and UTM Parameter Tracking for Somerset Render Cleaning
 *
 * Captures ad attribution parameters from URL on page load and stores
 * them in localStorage with a 30-day TTL (matching Google Ads attribution window).
 *
 * Usage:
 *   captureAdParameters()  — call on every page load
 *   getAdParameters()      — retrieve stored params (or undefined if expired)
 *   getGCLID()             — shortcut for just the GCLID string
 */

export interface AdParameters {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  captured_at?: number;
  expires_at?: number;
}

const STORAGE_KEY = "src_ad_params"; // src = somerset render cleaning
const ATTRIBUTION_WINDOW_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Capture ad parameters from the current URL and persist to localStorage.
 * Idempotent — safe to call on every page load / route change.
 */
export function captureAdParameters(): void {
  if (typeof window === "undefined") return;

  try {
    const url = new URLSearchParams(window.location.search);

    const gclid = url.get("gclid");
    const utm_source = url.get("utm_source");
    const utm_medium = url.get("utm_medium");
    const utm_campaign = url.get("utm_campaign");
    const utm_term = url.get("utm_term");
    const utm_content = url.get("utm_content");

    // Nothing in URL — just clean up expired data and bail
    if (!gclid && !utm_source && !utm_medium && !utm_campaign && !utm_term && !utm_content) {
      cleanupExpired();
      return;
    }

    const now = Date.now();
    const params: AdParameters = {
      captured_at: now,
      expires_at: now + ATTRIBUTION_WINDOW_MS,
    };

    if (gclid) params.gclid = gclid;
    if (utm_source) params.utm_source = utm_source;
    if (utm_medium) params.utm_medium = utm_medium;
    if (utm_campaign) params.utm_campaign = utm_campaign;
    if (utm_term) params.utm_term = utm_term;
    if (utm_content) params.utm_content = utm_content;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));

    if (process.env.NODE_ENV === "development") {
      console.log("[SRC] Ad parameters captured:", params);
    }
  } catch {
    // Fail silently — never break the page for analytics
  }
}

/**
 * Retrieve stored ad parameters. Returns undefined if nothing stored or expired.
 */
export function getAdParameters(): AdParameters | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const params: AdParameters = JSON.parse(raw);

    if (params.expires_at && params.expires_at < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return undefined;
    }

    return params;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return undefined;
  }
}

/**
 * Get just the GCLID (the critical value for Google Ads attribution).
 */
export function getGCLID(): string | undefined {
  return getAdParameters()?.gclid;
}

/** Remove expired data from localStorage. */
function cleanupExpired(): void {
  getAdParameters(); // side-effect: removes if expired
}
