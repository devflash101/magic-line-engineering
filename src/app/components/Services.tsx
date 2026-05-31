"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/lib/services";

function ServiceCard({ title, image, index }: { title: string; image: string; index: number }) {
  const isLocal = image.startsWith("/");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="group bg-white rounded-xl border border-black/[0.08] shadow-[0_2px_12px_rgba(13,13,13,0.06)] overflow-hidden hover:shadow-[0_8px_24px_rgba(13,13,13,0.1)] transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e6e1]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized={isLocal}
        />
      </div>
      <div className="px-4 py-5 text-center">
        <h3 className="text-[0.95rem] md:text-base font-normal tracking-wide text-[#0d0d0d]">
          {title}
        </h3>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-white text-[#0d0d0d] px-6 md:px-16 py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.25rem)] font-light leading-tight">
          Our Services
        </h2>
        <p className="mt-4 text-sm md:text-base text-[#0d0d0d]/55 leading-relaxed">
          Comprehensive architectural and engineering solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.title} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}
