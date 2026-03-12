import { Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
          {/* Left column */}
          <div>
            <h3 className="text-white font-bold text-lg">{siteConfig.name}</h3>
            <p className="mt-2 text-slate-400 text-sm">
              {siteConfig.legal.tradingName}
            </p>
            <p className="mt-1 text-slate-400 text-sm">
              A specialist service from{" "}
              <a
                href={siteConfig.swcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green hover:text-brand-green/80 transition-colors"
              >
                Somerset Window Cleaning
              </a>
            </p>
          </div>

          {/* Right column */}
          <div className="sm:text-right">
            <div className="space-y-2">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex sm:justify-end items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex sm:justify-end items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.email}
              </a>
            </div>
            <div className="mt-4">
              <a
                href="/privacy"
                className="text-slate-400 hover:text-slate-300 transition-colors text-sm"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-700">
          <p className="text-slate-500 text-xs text-center">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
