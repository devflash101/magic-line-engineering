"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/team";
import TeamMembersCarousel from "./TeamMembersCarousel";
import TeamMemberModal from "./TeamMemberModal";

export default function TeamSection() {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <>
      <section
        id="team"
        className="bg-[#f5f4f0] text-[#0d0d0d] py-28 overflow-x-hidden overflow-y-visible"
      >
        <div className="px-6 md:px-16 mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-3">
              Our Team
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.1]">
              The People Behind
              <br />
              <em className="text-[#c8a96e]">Every Project</em>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Link
              href="/team"
              className="inline-block text-[0.7rem] tracking-[0.2em] uppercase text-[#0d0d0d]/50 hover:text-[#c8a96e] transition-colors duration-300"
            >
              Meet Leadership →
            </Link>
          </motion.div>
        </div>

        <div className="px-6 md:px-16">
          <TeamMembersCarousel onSelect={setSelected} />
        </div>
      </section>

      <TeamMemberModal member={selected} onClose={() => setSelected(null)} />
    </>
  );
}
