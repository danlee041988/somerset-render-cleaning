"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does a render clean last?",
    answer:
      "A professional softwash treatment typically lasts 3\u20135 years depending on your property\u2019s location, exposure to weather, and render type. North-facing walls or properties in shaded, damp areas may need retreating sooner. Our biocide treatment continues working for months after application, helping to prevent regrowth.",
  },
  {
    question: "Will softwash damage my render?",
    answer:
      "No. Unlike pressure washing, softwash uses low pressure \u2014 similar to a garden hose \u2014 combined with specialist biodegradable biocides. It\u2019s safe for all render types including K-rend, monocouche, silicone, and traditional lime render. We assess your render type before treatment to ensure we use the right approach.",
  },
  {
    question: "How much does render cleaning cost?",
    answer:
      "Every property is different, so we provide free, no-obligation quotes after assessing your property. As a guide, a typical 3-bed semi ranges from \u00a3250\u2013400 depending on size, access, and the extent of biological growth. We\u2019ll always agree a price before starting any work.",
  },
  {
    question:
      "What\u2019s the difference between softwash and pressure washing?",
    answer:
      "Pressure washing blasts dirt off surfaces with high-pressure water \u2014 which can damage render, force water behind cladding, and doesn\u2019t kill the biological growth. Softwash uses low-pressure application of biocide solutions that kill algae, lichen, and moss at the root. The results last much longer because the growth is eliminated, not just displaced.",
  },
  {
    question: "Do you cover my area?",
    answer:
      "We cover all of central Somerset including Glastonbury, Street, Wells, Shepton Mallet, Frome, Midsomer Norton, Bridgwater, Taunton, and surrounding villages. If you\u2019re unsure, just enter your postcode in the enquiry form and we\u2019ll confirm.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-brand-charcoal pr-4 group-hover:text-brand-green transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-brand-slate flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-brand-slate leading-relaxed pr-8">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <FAQJsonLd />
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-charcoal tracking-tight">
            Common Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-xl border border-slate-200 px-6 sm:px-8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
