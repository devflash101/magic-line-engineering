"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  portfolioCategories,
  portfolioProjects,
  getProjectCoverImage,
} from "@/lib/projects";

type CategoryFilter = (typeof portfolioCategories)[number];

export default function ProjectsPortfolio() {
  const [filter, setFilter] = useState<CategoryFilter>("Residential");

  const filtered = useMemo(
    () => portfolioProjects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section className="px-6 md:px-16 pb-28">
      <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-3">
          Portfolio
        </span>
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-[#0d0d0d] leading-[1.1]">
          Our <em className="text-[#c8a96e]">Projects</em>
        </h1>
        <p className="mt-5 max-w-xl text-[#0d0d0d]/65 leading-[1.8] text-sm">
          A selection of completed residential and commercial work — from hotels
          and ADUs to custom homes across multiple regions.
        </p>
      </motion.div>

      <div className="flex gap-8 mb-14 border-b border-black/10 pb-4">
        {portfolioCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer ${
              filter === cat
                ? "text-[#c8a96e]"
                : "text-[#0d0d0d]/45 hover:text-[#0d0d0d]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={`/project/${project.id}`}
              className="group block cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] max-h-[min(48vh,420px)] overflow-hidden rounded-xl mb-5 shadow-[0_12px_40px_rgba(13,13,13,0.08)] ring-1 ring-black/5 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(13,13,13,0.12)]">
                <Image
                  src={getProjectCoverImage(project)}
                  alt={project.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
                <span className="absolute bottom-4 left-4 text-[0.65rem] tracking-[0.2em] uppercase text-[#f5f4f0] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  View Project →
                </span>
              </div>
              <span className="text-[0.68rem] tracking-[0.2em] uppercase text-[#888]">
                {project.category}
              </span>
              <h2 className="font-serif text-[1.35rem] font-light text-[#0d0d0d] mt-1 group-hover:text-[#c8a96e] transition-colors duration-300">
                {project.name}
              </h2>
            </Link>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
