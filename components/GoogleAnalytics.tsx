"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { trackPageView, GA_MEASUREMENT_ID, GA_ENABLED } from "@/lib/analytics";

/**
 * GA4 + Google Ads tag loader for Somerset Render Cleaning.
 *
 * - Loads gtag.js and configures GA4 (G-HW336XSP12) + Google Ads (AW-766877634)
 * - Captures GCLID / UTM params into localStorage on every page load
 * - Tracks SPA route changes as page_view events
 * - Only renders in production (VERCEL_ENV or NODE_ENV)
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Capture ad parameters on mount and route changes
  useEffect(() => {
    import("@/lib/ad-tracking")
      .then(({ captureAdParameters }) => captureAdParameters())
      .catch(() => {});
  }, [pathname]);

  // Track SPA page views (skip initial — gtag config handles it)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (GA_ENABLED && typeof window !== "undefined") {
      trackPageView(window.location.href, document.title);
    }
  }, [pathname]);

  if (!GA_ENABLED || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: 'Somerset Render Cleaning',
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });

            gtag('config', 'AW-766877634', {
              allow_ad_personalization_signals: false
            });

            gtag('set', 'ads_data_redaction', false);
          `,
        }}
      />
    </>
  );
}
