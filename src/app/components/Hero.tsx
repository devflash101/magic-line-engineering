"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-start px-8 md:px-16 pt-[10vh] md:pt-[12vh] overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-10 md:gap-12 max-w-5xl text-[#0d0d0d] [text-shadow:0_1px_12px_rgba(255,255,255,0.85)]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="shrink-0 -translate-y-10 md:-translate-y-14"
        >
          <Logo
            href=""
            variant="hero"
            priority
            className="w-[clamp(140px,20vw,240px)] h-auto drop-shadow-[0_4px_16px_rgba(13,13,13,0.12)]"
          />
        </motion.div>

        <div className="min-w-0">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="font-serif font-light leading-[1.08] mb-6"
          >
            <span className="block whitespace-nowrap text-[clamp(1.6rem,5.5vw,6rem)]">
              Magic Line Engineering
            </span>
            <span className="block mt-2 text-[clamp(1.35rem,3.2vw,2.5rem)] text-[#c8a96e] italic font-light tracking-wide">
              architecture &amp; structural &amp; mep
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-base text-[#0d0d0d]/70 mb-10 tracking-wide"
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
              className="inline-block px-10 py-3 border border-[#0d0d0d] text-[#0d0d0d] text-[0.75rem] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#0d0d0d] hover:text-[#f5f4f0]"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 right-16 flex flex-col items-center gap-3">
        <div className="w-px h-12 bg-[#0d0d0d]/30" />
        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#0d0d0d]/50 [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>
    </section>
  );
}
