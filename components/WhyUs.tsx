import { Beaker, Shield, Star, Leaf } from "lucide-react";
import { siteConfig } from "@/config/site";

const features = [
  {
    icon: Beaker,
    title: "Specialist Equipment",
    description:
      "Professional softwash systems — not a jet wash from Screwfix",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: `${siteConfig.trust.insurance} public liability. Your property is protected.`,
  },
  {
    icon: Star,
    title: `${siteConfig.trust.reviewCount} Five-Star Reviews`,
    description:
      "Backed by Somerset Window Cleaning\u2019s proven track record",
  },
  {
    icon: Leaf,
    title: "Safe for Plants & Pets",
    description:
      "Biodegradable solutions that won\u2019t harm your garden",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-charcoal font-heading tracking-tight">
            Why Somerset Trusts Us
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 max-w-3xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-50 rounded-xl p-6 lg:p-7 border border-slate-100"
            >
              <feature.icon className="w-6 h-6 text-brand-green mb-4" />
              <h3 className="text-base font-bold text-brand-charcoal mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm text-brand-slate leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
