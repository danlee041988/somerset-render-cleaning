"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    before: "/images/before-1.webp",
    after: "/images/after-1.webp",
    caption: "3-bed semi, Glastonbury",
  },
  {
    before: "/images/before-2.webp",
    after: "/images/after-2.webp",
    caption: "Detached farmhouse, Street",
  },
  {
    before: "/images/before-3.webp",
    after: "/images/after-3.webp",
    caption: "New build estate, Meare",
  },
];

export default function BeforeAfter() {
  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-charcoal tracking-tight">
            See the Difference
          </h2>
          <p className="mt-3 text-brand-slate text-lg max-w-md mx-auto">
            Real results from properties across Somerset
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.caption}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group"
            >
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                {/* Image pair */}
                <div className="grid grid-cols-2">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={project.before}
                      alt={`Before cleaning — ${project.caption}`}
                      width={400}
                      height={533}
                      className="object-cover w-full h-full"
                    />
                    <span className="absolute bottom-2 left-2 bg-brand-charcoal/80 text-white text-xs font-medium px-2 py-0.5 rounded">
                      Before
                    </span>
                  </div>
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={project.after}
                      alt={`After cleaning — ${project.caption}`}
                      width={400}
                      height={533}
                      className="object-cover w-full h-full"
                    />
                    <span className="absolute bottom-2 right-2 bg-brand-green/90 text-white text-xs font-medium px-2 py-0.5 rounded">
                      After
                    </span>
                  </div>
                </div>
                {/* Caption */}
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-brand-charcoal">
                    {project.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
