"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ceo, managers, type TeamMember } from "@/lib/team";
import TeamMembersCarousel from "./TeamMembersCarousel";
import TeamMemberModal from "./TeamMemberModal";

function LeadershipCard({
  member,
  size = "default",
  onClick,
}: {
  member: TeamMember;
  size?: "ceo" | "default";
  onClick: () => void;
}) {
  const isCeo = size === "ceo";

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className={`group cursor-pointer ${
        isCeo
          ? "flex flex-col items-center w-full max-w-sm mx-auto text-center"
          : "w-full text-left"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl mb-4 ring-1 ring-black/5 shadow-[0_12px_40px_rgba(13,13,13,0.08)] transition-all duration-500 group-hover:ring-[#c8a96e]/30 group-hover:shadow-[0_20px_50px_rgba(13,13,13,0.12)] ${
          isCeo ? "h-[380px] md:h-[420px] w-full" : "h-[320px] md:h-[360px]"
        }`}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
            isCeo ? "object-center" : "object-top"
          }`}
          sizes={isCeo ? "400px" : "360px"}
          priority={isCeo}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span
          className={`absolute bottom-4 text-[0.65rem] tracking-[0.2em] uppercase text-[#f5f4f0] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isCeo ? "left-1/2 -translate-x-1/2" : "left-4"
          }`}
        >
          View Profile →
        </span>
      </div>
      <h3 className={`font-serif font-light text-[#0d0d0d] ${isCeo ? "text-2xl text-center" : "text-xl"}`}>
        {member.name}
      </h3>
      <span
        className={`text-[0.7rem] tracking-[0.15em] uppercase text-[#c8a96e]/80 mt-1 block ${
          isCeo ? "text-center" : ""
        }`}
      >
        {member.role}
      </span>
    </motion.button>
  );
}

export default function TeamPageContent() {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <>
      <section className="bg-[#f5f4f0] text-[#0d0d0d] py-28 overflow-x-hidden">
        <div className="px-6 md:px-16 max-w-6xl mx-auto mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.7rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-3"
          >
            Our Team
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.1]"
          >
            The People Behind
            <br />
            <em className="text-[#c8a96e]">Every Project</em>
          </motion.h1>
        </div>

        {/* CEO */}
        <div className="px-6 md:px-16 max-w-6xl mx-auto mb-20 flex flex-col items-center">
          <p className="text-[0.65rem] tracking-[0.28em] uppercase text-[#c8a96e]/80 text-center mb-8">
            Leadership
          </p>
          <LeadershipCard member={ceo} size="ceo" onClick={() => setSelected(ceo)} />
        </div>

        {/* Managers */}
        <div className="px-6 md:px-16 max-w-4xl mx-auto mb-24">
          <p className="text-[0.65rem] tracking-[0.28em] uppercase text-[#0d0d0d]/40 text-center mb-8">
            Management
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
            {managers.map((manager, i) => (
              <motion.div
                key={manager.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                <LeadershipCard
                  member={manager}
                  onClick={() => setSelected(manager)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Members carousel */}
        <div className="border-t border-black/8 pt-16">
          <div className="px-6 md:px-16 mb-10">
            <p className="text-[0.65rem] tracking-[0.28em] uppercase text-[#c8a96e]/80">
              Team Members
            </p>
            <h2 className="font-serif text-2xl font-light mt-2">Our Specialists</h2>
          </div>
          <div className="px-6 md:px-16">
            <TeamMembersCarousel onSelect={setSelected} />
          </div>
        </div>
      </section>

      <TeamMemberModal member={selected} onClose={() => setSelected(null)} />
    </>
  );
}
