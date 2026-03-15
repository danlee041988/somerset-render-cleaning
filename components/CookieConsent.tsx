"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CONSENT_KEY = "src_cookie_consent";

export type ConsentValue = "accepted" | "declined";

/** Read consent value from localStorage (safe for SSR). */
export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === "accepted" || v === "declined") return v;
    return null;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no consent recorded yet
    if (getConsent() === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {}
    setVisible(false);
    // Reload so GoogleAnalytics picks up the new consent
    window.location.reload();
  }

  function decline() {
    try {
      localStorage.setItem(CONSENT_KEY, "declined");
    } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-brand-slate">
                We use cookies to improve your experience and measure site
                performance.{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-brand-green hover:underline"
                >
                  Privacy policy
                </Link>
              </p>
              <div className="flex shrink-0 gap-3">
                <button
                  onClick={decline}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-brand-slate transition-colors hover:bg-gray-50"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
