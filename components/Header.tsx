"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            {/* SR Monogram */}
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tight leading-none">
                SR
              </span>
            </div>
            {/* Text */}
            <div className="hidden sm:block">
              <p className="text-brand-charcoal font-semibold text-sm leading-tight">
                {siteConfig.name}
              </p>
              <p className="text-brand-slate text-xs leading-tight">
                {siteConfig.tagline}
              </p>
            </div>
          </div>

          {/* Centre: Nav links — desktop only */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#gallery"
              className="text-sm font-medium text-brand-slate hover:text-brand-green transition-colors"
            >
              Our Work
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-brand-slate hover:text-brand-green transition-colors"
            >
              Pricing
            </a>
            <a
              href="#enquiry"
              className="text-sm font-medium text-brand-slate hover:text-brand-green transition-colors"
            >
              Get a Quote
            </a>
          </nav>

          {/* Right: Phone + CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone - full on desktop, icon on mobile */}
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-brand-charcoal hover:text-brand-green transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">
                {siteConfig.phone}
              </span>
            </a>

            {/* CTA */}
            <a
              href="#enquiry"
              className="inline-flex items-center px-4 py-2 bg-brand-green text-white text-sm font-semibold rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm hover:shadow-md"
            >
              Free Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
