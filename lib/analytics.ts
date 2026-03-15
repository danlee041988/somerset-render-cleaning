/**
 * GA4 Analytics helpers for Somerset Render Cleaning
 *
 * Lightweight wrapper around gtag for form events and page views.
 * Google Ads server-side conversion tracking is NOT included here
 * (that's a separate task requiring OAuth setup).
 */

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

const sanitizeEnv = (v?: string | null) => v?.trim() ?? undefined;

export const GA_MEASUREMENT_ID = sanitizeEnv(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
export const GA_ENABLED = sanitizeEnv(process.env.NEXT_PUBLIC_GA_TRACKING_ENABLED) === "true";

/** Fire a GA4 event (no-op when GA is disabled or SSR). */
function sendEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!GA_ENABLED || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", name, params);

  if (process.env.NODE_ENV === "development") {
    console.log(`[SRC] GA4 event: ${name}`, params);
  }
}

/**
 * Track a page view on SPA route change.
 * The initial page view is handled by the gtag('config', ...) call in GoogleAnalytics.
 */
export function trackPageView(url: string, title: string): void {
  sendEvent("page_view", { page_title: title, page_location: url });
}

/**
 * Track a successful enquiry form submission.
 */
export function trackFormSubmit(params: {
  service_type?: string;
  lead_source?: string;
}): void {
  sendEvent("render_enquiry_submit", {
    event_category: "Enquiry Form",
    event_label: "Render Cleaning Enquiry Submitted",
    service_type: params.service_type ?? "render_cleaning",
    lead_source: params.lead_source ?? "website",
    value: 10,
  });
}

/**
 * Track when a user starts interacting with the form (first field focus).
 */
export function trackFormStart(): void {
  sendEvent("form_start", {
    event_category: "Enquiry Form",
    event_label: "Render Cleaning Enquiry Started",
    value: 1,
  });
}
