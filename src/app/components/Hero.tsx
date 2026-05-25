"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center px-16 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl text-[#f5f4f0]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-serif text-[clamp(3.5rem,8vw,7rem)] font-light leading-[1.05] mb-6"
        >
          Architecture
          <br />
          <em className="text-[#c8a96e]">&amp; Design</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-base opacity-85 mb-10 tracking-wide"
        >
          We craft spaces that inspire, endure, and belong.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <Link
            href="#work"
            className="inline-block px-10 py-3 border border-[#f5f4f0] text-[0.75rem] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#f5f4f0] hover:text-[#0d0d0d]"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-16 flex flex-col items-center gap-3">
        <div className="w-px h-12 bg-white/40" />
        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/60 [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>
    </section>
  );
}
