"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "3-Bed Semi",
    detail: "Front elevation",
    price: "\u00a3250 \u2013 \u00a3400",
    badge: "Most popular",
  },
  {
    name: "Detached",
    detail: "All sides",
    price: "\u00a3400 \u2013 \u00a3700",
    badge: null,
  },
  {
    name: "Large / Farmhouse",
    detail: "Full property",
    price: "\u00a3600 \u2013 \u00a31,200",
    badge: null,
  },
  {
    name: "Commercial",
    detail: "Offices, retail, industrial",
    price: "From \u00a31,000",
    badge: "Bespoke quote",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-charcoal tracking-tight">
            Transparent Pricing
          </h2>
          <p className="mt-3 text-brand-slate text-lg max-w-lg mx-auto">
            Every property is different, but here&apos;s a guide to our typical
            costs
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`relative rounded-xl border p-6 lg:p-7 text-center ${
                tier.badge === "Most popular"
                  ? "border-brand-green bg-brand-green-light shadow-md ring-1 ring-brand-green/20"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full ${
                    tier.badge === "Most popular"
                      ? "bg-brand-green text-white"
                      : "bg-brand-charcoal text-white"
                  }`}
                >
                  {tier.badge}
                </span>
              )}

              {/* Tier name */}
              <h3 className="text-base font-bold text-brand-charcoal mt-1">
                {tier.name}
              </h3>
              <p className="text-xs text-brand-slate mt-1">{tier.detail}</p>

              {/* Price */}
              <p className="mt-5 text-2xl sm:text-3xl font-bold text-brand-charcoal tracking-tight">
                {tier.price}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Inclusions + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 sm:mt-12"
        >
          <p className="text-sm text-brand-slate max-w-xl mx-auto leading-relaxed">
            All prices include softwash treatment, biocide application, and a
            satisfaction guarantee. Free, no-obligation quotes.
          </p>
          <a
            href="#enquiry"
            className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm hover:shadow-md text-base"
          >
            Get Your Free Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
