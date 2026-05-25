"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "18+", label: "Years of Practice" },
  { value: "240", label: "Projects Completed" },
  { value: "32", label: "Design Awards" },
];

export default function About() {
  return (
    <section id="about" className="bg-[#0d0d0d] text-[#f5f4f0] px-16 py-28">
      <div className="grid grid-cols-2 gap-24 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-3">
            About Us
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.1]">
            Design with
            <br />
            <em className="text-[#c8a96e]">Purpose</em>
          </h2>
          <p className="mt-6 leading-[1.8] opacity-70 max-w-md">
            Magic Line is a full-service architecture and design studio founded on the belief
            that great buildings shape great lives. From private residences to civic landmarks,
            we bring precision, creativity, and care to every project.
          </p>
          <p className="mt-4 leading-[1.8] opacity-70 max-w-md">
            Our team of architects, designers, and planners work collaboratively — listening
            first, then designing with intention.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-12 border-l border-white/10 pl-16"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <h3 className="font-serif text-[3.5rem] font-light text-[#c8a96e] leading-none">
                {s.value}
              </h3>
              <span className="text-[0.75rem] tracking-[0.15em] uppercase opacity-50 mt-2 block">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
