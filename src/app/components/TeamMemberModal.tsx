"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";
import type { TeamMember } from "@/lib/team";

export default function TeamMemberModal({
  member,
  onClose,
}: {
  member: TeamMember | null;
  onClose: () => void;
}) {
  const isMember = member?.tier === "member";

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-[#1a1a1a] w-full max-h-[90vh] overflow-hidden rounded-2xl flex flex-col md:flex-row ${
              isMember
                ? "max-w-4xl md:items-stretch"
                : "max-w-5xl md:items-stretch min-h-[min(85vh,640px)]"
            }`}
            style={{ scrollbarWidth: "thin", scrollbarColor: "#c8a96e33 transparent" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-[#f5f4f0]/60 hover:text-[#c8a96e] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {isMember ? (
              /* Full portrait: panel height follows image, nothing cropped */
              <div className="flex justify-center bg-[#1a1a1a] shrink-0 md:rounded-l-2xl overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={420}
                  height={560}
                  className="block w-auto h-auto max-w-[min(100vw,420px)] max-h-[min(85vh,720px)] object-contain rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
                  sizes="420px"
                  priority
                />
              </div>
            ) : (
              /* Leadership: wide panel, cover fill */
              <div className="relative w-full md:w-[min(50%,560px)] md:min-w-[420px] h-[min(58vh,500px)] md:h-auto md:flex-shrink-0 md:self-stretch overflow-hidden bg-[#111] md:rounded-l-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </div>
            )}

            <div className="p-6 md:p-8 flex-1 min-w-0 text-[#f5f4f0] overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
              <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-2">
                {member.role}
              </span>
              <h3 className="font-serif text-3xl font-light mb-1">{member.name}</h3>
              {member.location && (
                <p className="text-[0.75rem] tracking-wide opacity-50 mb-6">
                  {member.location}
                </p>
              )}
              {member.workEmail && (
                <p className="text-[0.75rem] tracking-wide mb-6 flex items-center gap-2">
                  <Mail size={14} className="text-[#c8a96e]" />
                  <a
                    href={`mailto:${member.workEmail}`}
                    className="text-[#c8a96e] hover:text-[#e3c98f] transition-colors"
                  >
                    {member.workEmail}
                  </a>
                </p>
              )}

              {member.bioSections ? (
                <div className="space-y-5 mb-6">
                  {member.bioSections.map((section, i) => (
                    <div key={i}>
                      {section.title && (
                        <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c8a96e]/70 mb-2.5">
                          {section.title}
                        </h4>
                      )}
                      {section.paragraphs?.map((paragraph, j) => (
                        <p
                          key={j}
                          className="text-sm leading-[1.8] opacity-70 mb-3 last:mb-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.items && (
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li
                              key={item}
                              className="text-sm leading-[1.7] opacity-70 pl-3 border-l border-[#c8a96e]/30"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-[1.8] opacity-70 mb-6">{member.bio}</p>
              )}

              {member.licenses.length > 0 && (
                <div>
                  <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c8a96e]/70 mb-3">
                    Licenses & Certifications
                  </h4>
                  <ul className="space-y-1.5">
                    {member.licenses.map((lic) => (
                      <li
                        key={lic}
                        className="text-[0.75rem] opacity-60 leading-relaxed pl-3 border-l border-[#c8a96e]/30"
                      >
                        {lic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
