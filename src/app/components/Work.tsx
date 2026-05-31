"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "The Meridian House",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    large: true,
  },
  {
    title: "Vertex Tower",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
  },
  {
    title: "Lumen Studio",
    category: "Interior",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    title: "Cascade Villa",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    title: "The Pavilion",
    category: "Cultural",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    large: true,
    right: true,
  },
];

export default function Work() {
  return (
    <section id="work" className="px-16 py-28">
      <div className="mb-16">
        <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-3">
          Selected Projects
        </span>
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light">Our Work</h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            className={`group cursor-pointer overflow-hidden ${
              p.large ? "col-span-2" : "col-span-1"
            } ${p.right ? "col-start-2" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
          >
            <div className="overflow-hidden">
              <div
                className={`w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${
                  p.large ? "h-[520px]" : "h-[420px]"
                }`}
                style={{ backgroundImage: `url('${p.img}')` }}
              />
            </div>
            <div className="pt-4 pb-2">
              <span className="text-[0.68rem] tracking-[0.2em] uppercase text-[#888]">
                {p.category}
              </span>
              <h3 className="font-serif text-[1.4rem] font-normal mt-1">{p.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
