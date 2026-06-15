"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";
import { getTeamMemberImageSrc, type TeamMember } from "@/lib/team";

export default function TeamMemberModal({
  member,
  onClose,
}: {
  member: TeamMember | null;
  onClose: () => void;
}) {
  const isMember = member?.tier === "member";
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const [contentMaxHeight, setContentMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!member) {
      setContentMaxHeight(null);
      return;
    }

    const panel = imagePanelRef.current;
    if (!panel) return;

    const syncHeight = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setContentMaxHeight(panel.offsetHeight);
      } else {
        setContentMaxHeight(null);
      }
    };

    syncHeight();

    const observer = new ResizeObserver(syncHeight);
    observer.observe(panel);
    window.addEventListener("resize", syncHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, [member]);

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
            className={`relative bg-[#1a1a1a] w-full max-h-[90vh] min-h-0 overflow-hidden rounded-2xl flex flex-col md:flex-row md:items-start ${
              isMember ? "max-w-4xl" : "max-w-5xl"
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

            <div
              ref={imagePanelRef}
              className={`relative shrink-0 self-start w-full overflow-hidden rounded-t-2xl md:rounded-t-none md:rounded-l-2xl ${
                isMember ? "md:w-[min(42%,400px)]" : "md:w-[min(50%,460px)]"
              }`}
            >
              <Image
                src={getTeamMemberImageSrc(member)}
                alt={member.name}
                width={1023}
                height={1537}
                className="block w-full h-auto max-h-[min(45vh,380px)] md:max-h-[90vh]"
                sizes={isMember ? "(max-width: 768px) 100vw, 400px" : "(max-width: 768px) 100vw, 460px"}
                priority={isMember}
                onLoad={() => {
                  if (imagePanelRef.current) {
                    setContentMaxHeight(
                      window.matchMedia("(min-width: 768px)").matches
                        ? imagePanelRef.current.offsetHeight
                        : null,
                    );
                  }
                }}
              />
            </div>

            <div
              className="p-6 md:p-8 flex-1 min-w-0 min-h-0 text-[#f5f4f0] overflow-y-auto overscroll-contain"
              style={
                contentMaxHeight ? { maxHeight: contentMaxHeight } : undefined
              }
            >
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
