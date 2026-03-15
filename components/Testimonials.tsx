"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { siteConfig } from "@/config/site";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Glastonbury",
    rating: 5,
    text: "Absolutely brilliant job on our render. The whole front of the house looks brand new. Dan and his team were professional, on time, and the price was very fair.",
  },
  {
    name: "Mark T.",
    location: "Street",
    rating: 5,
    text: "Had the render cleaned on our 3-bed semi. The algae and black marks are completely gone. Very impressed with the softwash technique \u2014 no damage to the render at all.",
  },
  {
    name: "Janet P.",
    location: "Wells",
    rating: 5,
    text: "We\u2019d been putting off getting our render cleaned for years. Wish we\u2019d done it sooner! The difference is incredible. Highly recommend Somerset Render Cleaning.",
  },
  {
    name: "David R.",
    location: "Bridgwater",
    rating: 5,
    text: "Professional service from start to finish. The biocide treatment means the algae shouldn\u2019t come back for years. Great value for money.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-charcoal tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-brand-slate text-lg max-w-md mx-auto">
            Real reviews from real Somerset homeowners
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 lg:p-7 border border-slate-200 shadow-sm"
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 text-sm text-brand-slate leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-charcoal">
                    {t.name}
                  </p>
                  <p className="text-xs text-brand-slate">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google reviews link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/maps/place/Somerset+Window+Cleaning/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-green-dark transition-colors"
          >
            See all {siteConfig.trust.reviewCount}+ reviews on Google
            <span aria-hidden="true">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
