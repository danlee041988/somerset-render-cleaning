import { Star, Shield, Medal, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site";

const trustItems = [
  {
    icon: Star,
    text: `${siteConfig.trust.reviewCount} Five-Star Reviews`,
  },
  {
    icon: Shield,
    text: `${siteConfig.trust.insurance} Insured`,
  },
  {
    icon: Medal,
    text: "Veteran-Owned",
  },
  {
    icon: Calendar,
    text: `Est. ${siteConfig.trust.established}`,
  },
];

export default function TrustBar() {
  return (
    <section className="bg-brand-charcoal py-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-center gap-2.5 py-1"
            >
              <item.icon className="w-5 h-5 text-brand-green flex-shrink-0" />
              <span className="text-white text-sm font-medium whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
