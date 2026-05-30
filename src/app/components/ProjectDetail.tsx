"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import type { PortfolioProject } from "@/lib/projects";

export default function ProjectDetail({ project }: { project: PortfolioProject }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/project"
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.15em] uppercase text-[#0d0d0d]/50 hover:text-[#c8a96e] transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            Back
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 md:mb-16"
          >
            <span className="text-[0.65rem] tracking-[0.28em] uppercase text-[#c8a96e] block mb-4">
              {project.category}
            </span>
            <h1 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-light text-[#0d0d0d] leading-[1.15] tracking-tight">
              {project.name}
            </h1>
            <p className="mt-5 text-[0.7rem] tracking-[0.2em] uppercase text-[#0d0d0d]/40">
              {project.images.length} images
            </p>
          </motion.header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {project.images.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setLightbox(src)}
                className="group cursor-pointer text-left w-full"
              >
                <div className="relative w-full aspect-[4/3] max-h-[min(42vh,400px)] overflow-hidden rounded-xl bg-[#e8e6e0] shadow-[0_12px_40px_rgba(13,13,13,0.08)] ring-1 ring-black/5 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(13,13,13,0.12)] group-hover:ring-[#c8a96e]/30">
                  <Image
                    src={src}
                    alt={`${project.name} — ${i + 1}`}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d]/92 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-[#f5f4f0]/70 hover:text-[#c8a96e] transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(92vw,1000px)] h-[min(80vh,750px)] rounded-lg overflow-hidden bg-[#111]"
            >
              <Image
                src={lightbox}
                alt={project.name}
                fill
                className="object-contain"
                sizes="1100px"
                priority
              />
            </motion.div>
            <p className="absolute bottom-6 left-0 right-0 text-center font-serif text-lg text-[#f5f4f0]/90 pointer-events-none">
              {project.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
