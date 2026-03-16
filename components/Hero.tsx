"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center">
      {/* Full backdrop image */}
      <Image
        src="/images/hero.webp"
        alt="Professional render cleaning on a Somerset property"
        fill
        priority
        className="object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight font-heading">
            Professional Render Cleaning Across Somerset
          </h1>
          <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-lg">
            Specialist softwash treatment that removes algae, black spots,
            and weathering — restoring your property&apos;s exterior to
            like-new condition.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-green-dark transition-colors shadow-sm hover:shadow-md text-base"
            >
              Get a Free Quote
            </a>
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-base"
            >
              Call 01458 860 339
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
