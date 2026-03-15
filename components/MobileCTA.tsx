"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden">
      <div className="bg-brand-charcoal/95 backdrop-blur-sm border-t border-slate-700 px-4 py-3 flex items-center gap-3">
        <a
          href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-white text-brand-charcoal font-semibold rounded-lg text-sm"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a
          href="#enquiry"
          className="flex items-center justify-center flex-1 py-2.5 bg-brand-green text-white font-semibold rounded-lg text-sm hover:bg-brand-green-dark transition-colors"
        >
          Free Quote
        </a>
      </div>
    </div>
  );
}
