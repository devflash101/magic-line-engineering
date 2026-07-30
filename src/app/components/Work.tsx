"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  getProjectById,
  getProjectCoverImage,
  type PortfolioProject,
} from "@/lib/projects";

/** Curated highlights — one per discipline, in the order they read best on the grid. */
const FEATURED_IDS = [
  "commercial-hotel",
  "residential-adu2",
  "interior-office",
  "residential-multi-family",
  "commercial-gym",
];

const featured = FEATURED_IDS.map(getProjectById).filter(
  (p): p is PortfolioProject => Boolean(p)
);

/** Editorial layout: wide / narrow / narrow / narrow / wide-offset on large screens. */
const spanFor = (index: number) => {
  if (index === 0) return "lg:col-span-2";
  if (index === featured.length - 1) return "lg:col-span-2 lg:col-start-2";
  return "";
};

export default function Work() {
  return (
    <section id="work" className="px-6 md:px-16 py-20 md:py-28">
      <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-3">
            Selected Projects
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light">Our Work</h2>
        </div>
        <Link
          href="/project"
          className="inline-block text-[0.7rem] tracking-[0.2em] uppercase text-[#0d0d0d]/50 hover:text-[#c8a96e] transition-colors duration-300"
        >
          View All Projects →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project, i) => {
          const wide = spanFor(i) !== "";

          return (
            <motion.div
              key={project.id}
              className={spanFor(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
            >
              <Link href={`/project/${project.id}`} className="group block">
                <div
                  className={`relative w-full overflow-hidden ${
                    wide
                      ? "h-[300px] sm:h-[420px] lg:h-[520px]"
                      : "h-[300px] sm:h-[360px] lg:h-[420px]"
                  }`}
                >
                  <Image
                    src={getProjectCoverImage(project)}
                    alt={project.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes={
                      wide
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                  />
                </div>
                <div className="pt-4 pb-2">
                  <span className="text-[0.68rem] tracking-[0.2em] uppercase text-[#888]">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-[1.4rem] font-normal mt-1 group-hover:text-[#c8a96e] transition-colors duration-300">
                    {project.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
