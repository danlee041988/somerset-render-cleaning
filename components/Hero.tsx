"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight tracking-tight font-heading">
              Professional Render Cleaning Across Somerset
            </h1>
            <p className="mt-5 text-lg text-brand-slate leading-relaxed max-w-lg">
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
                href="#gallery"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-green text-brand-green font-semibold rounded-lg hover:bg-brand-green-light transition-colors text-base"
              >
                View Our Work
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.97 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src="/images/hero.webp"
                alt="Professional render cleaning on a Somerset property"
                width={800}
                height={600}
                priority
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-brand-green-light rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
