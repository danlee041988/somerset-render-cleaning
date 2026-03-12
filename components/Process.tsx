"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Assess",
    description:
      "Free site survey. We check your render type, identify growth, and plan the treatment.",
  },
  {
    number: 2,
    title: "Treat",
    description:
      "Low-pressure softwash with biocide solution. Kills algae and organic growth at the root.",
  },
  {
    number: 3,
    title: "Rinse & Protect",
    description:
      "Gentle rinse reveals clean render. Biocide continues working for months, preventing regrowth.",
  },
];

export default function Process() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-charcoal tracking-tight">
            How We Clean Your Render
          </h2>
          <p className="mt-3 text-brand-slate text-lg max-w-md mx-auto">
            Safe, effective softwash — no pressure damage
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.15 }}
              className="text-center"
            >
              {/* Number circle */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-green text-white font-bold text-lg mb-5">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-brand-charcoal mb-2">
                {step.title}
              </h3>
              <p className="text-brand-slate text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
