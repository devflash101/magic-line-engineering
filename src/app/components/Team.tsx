"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  location: string;
  licenses: string[];
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "James Anderson",
    role: "Architect",
    image: "/team/james-anderson.png",
    location: "Multi-State",
    licenses: ["Multi-State Licensed Architect"],
    bio: "James Anderson is a multi-licensed architect specializing in residential, commercial, and mixed-use developments. With extensive experience in design, planning, permitting, and construction administration, he helps clients successfully navigate projects across multiple states and jurisdictions. His work is defined by thoughtful design, technical expertise, and a commitment to creating spaces that are functional, sustainable, and enduring.",
  },
  {
    name: "Frank Gonani",
    role: "Civil Engineer",
    image: "/team/frank-gonani.png",
    location: "Surprise, AZ",
    licenses: [
      "Civil Engineer — AZ, CO, FL, NM, TX, UT, WY",
      "Consulting Engineer — AZ, FL, OH, TX",
      "Electrical Engineer — AZ, CA, CO, FL, IL, IN, MD, ME, NM, OH, TX, UT, WY",
      "Industrial Engineer — AZ",
      "Traffic Engineer — AZ, CO",
    ],
    bio: "QCK Electric, a trusted subsidiary of Traffic Signal Coordination LLC, delivers high-quality yet cost-effective engineering solutions specializing in electrical, mechanical, and civil design. Our team of licensed Professional Engineers (PEs) is dedicated to accuracy, efficiency, and responsive service — offering expert plan preparation, detailed reviews, PE stamping, and customized consulting.",
  },
  {
    name: "Sarah Aher",
    role: "Building Designer",
    image: "/team/sarah-aher.png",
    location: "",
    licenses: ["Interior Design Specialist", "Building Designer"],
    bio: "Sarah Aher is an experienced designer specializing in commercial and residential interior design, building design, and project development. She is known for creating functional, elegant, and client-focused spaces that balance creativity, comfort, and efficiency. Her experience includes residential homes, commercial interiors, renovations, and custom design projects, with a strong emphasis on collaboration, detail, and thoughtful design solutions.",
  },
  {
    name: "Saady Amin",
    role: "Structural Engineer",
    image: "/team/saady-amin.png",
    location: "Sylvania, OH",
    licenses: [
      "Structural Engineer — AL, CO, DC, DE, FL, GA, ID, IN, KS, KY, LA, MA, MD, MI, MN, MO, NC, NE, NJ, NM, NV, NY, OH, OK, OR, PA, SC, SD, TN, TX, UT, VA, WA, WI, WY",
    ],
    bio: "I am a Structural Engineer based in Sylvania, Ohio with 22 years of experience in the industry. Most of my work is related to commercial construction. I have the necessary toolset and software available at my disposal which will allow me to take on challenging design projects. I am also covered by Professional Liability Insurance for my work.",
  },
  {
    name: "Sean Green",
    role: "Professional Engineer",
    image: "/team/sean-green.png",
    location: "Barberton, OH",
    licenses: [
      "Civil Engineer — DC, FL, GA, IA, KY, MD, MI, MO, NC, NE, OH, SC, VA, WI",
    ],
    bio: "Registered professional engineer in Ohio, Maryland, and Kentucky with 10+ years of civil engineering experience and 6+ years working in the oil and natural gas industry. Specialty services include AutoCAD Civil 3D, Driveway Permits, Right-of-Way Permits, Railroad Crossing Permits, Road Use Maintenance Agreements, and Storm Water Pollution Prevention Plans.",
  },
  {
    name: "Thomas Johnson",
    role: "Professional Engineer",
    image: "/team/thomas-johnson.png",
    location: "Multi-State",
    licenses: ["Multi-State Licensed Professional Engineer"],
    bio: "Thomas Johnson is a multi-state licensed professional engineer with extensive experience in residential and commercial building design, engineering coordination, and municipal approval processes. He provides code-compliant engineering solutions for a variety of project types and works closely with project teams to support permitting, construction documentation, and successful project execution across multiple jurisdictions.",
  },
];

export default function Team() {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const velocityRef = useRef(0);
  const inertiaFrameRef = useRef<number | null>(null);
  const didDragRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isPaused) return;

    let animId: number;
    const speed = 0.5;

    const step = () => {
      el.scrollLeft += speed;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  const stopInertia = () => {
    if (inertiaFrameRef.current !== null) {
      cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = null;
    }
  };

  const startInertia = () => {
    const el = scrollRef.current;
    if (!el) return;

    stopInertia();
    setIsPaused(true);

    const glide = () => {
      if (!el) return;

      el.scrollLeft -= velocityRef.current;

      if (el.scrollLeft < 0) {
        el.scrollLeft += el.scrollWidth / 2;
      } else if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft -= el.scrollWidth / 2;
      }

      velocityRef.current *= 0.94;

      if (Math.abs(velocityRef.current) < 0.08) {
        velocityRef.current = 0;
        inertiaFrameRef.current = null;
        setIsPaused(false);
        return;
      }

      inertiaFrameRef.current = requestAnimationFrame(glide);
    };

    inertiaFrameRef.current = requestAnimationFrame(glide);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    stopInertia();
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = event.clientX;
    lastPointerXRef.current = event.clientX;
    dragStartScrollLeftRef.current = el.scrollLeft;
    velocityRef.current = 0;
    setIsPaused(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !isDraggingRef.current) return;

    const deltaX = event.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 5) {
      didDragRef.current = true;
    }

    el.scrollLeft = dragStartScrollLeftRef.current - deltaX;
    velocityRef.current = event.clientX - lastPointerXRef.current;
    lastPointerXRef.current = event.clientX;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    startInertia();
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      startInertia();
      return;
    }
    setIsPaused(false);
  };

  useEffect(() => {
    return () => stopInertia();
  }, []);

  const handleWheelLock = (event: React.WheelEvent<HTMLDivElement>) => {
    // Hard block any wheel-driven scroll inside the team rail.
    event.preventDefault();
    event.stopPropagation();

    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = 0;
  };

  const handleRailScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // Enforce horizontal-only rail.
    if (el.scrollTop !== 0) {
      el.scrollTop = 0;
    }
  };

  return (
    <>
      <section
        id="team"
        className="bg-[#0d0d0d] text-[#f5f4f0] py-28 overflow-x-hidden overflow-y-visible"
      >
        <div className="px-16 mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[0.7rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-3"
          >
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.1]"
          >
            The People Behind
            <br />
            <em className="text-[#c8a96e]">Every Project</em>
          </motion.h2>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheelCapture={handleWheelLock}
          onWheel={handleWheelLock}
          onScroll={handleRailScroll}
          className="flex h-[430px] items-start gap-14 overflow-x-hidden overflow-y-hidden px-16 py-2 cursor-grab select-none touch-pan-x"
          style={{ scrollbarWidth: "none", overscrollBehavior: "contain" }}
        >
          {[...teamMembers, ...teamMembers].map((member, i) => {
            const isLcp =
              member.image === "/team/james-anderson.png" && i === 0;

            return (
              <motion.div
                key={`${member.name}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % teamMembers.length) * 0.1 }}
                onClick={() => {
                  if (!didDragRef.current) {
                    setSelected(member);
                  }
                }}
                className="flex-shrink-0 w-[260px] group cursor-pointer"
              >
                <div className="relative w-[260px] h-[340px] overflow-hidden rounded-2xl mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    loading={isLcp ? "eager" : "lazy"}
                    priority={isLcp}
                    className="object-cover object-top rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    sizes="260px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c8a96e]">
                      View Profile →
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-light">{member.name}</h3>
                <span className="text-[0.7rem] tracking-[0.15em] uppercase text-[#c8a96e]/80 mt-1 block">
                  {member.role}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#1a1a1a] max-w-3xl w-full max-h-[85vh] overflow-hidden rounded-2xl flex flex-col md:flex-row"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#c8a96e33 transparent" }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 text-[#f5f4f0]/60 hover:text-[#c8a96e] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="relative w-full md:w-[300px] h-[min(50vh,420px)] md:h-[min(85vh,640px)] flex-shrink-0 overflow-hidden bg-[#111] flex items-center justify-center md:rounded-l-2xl">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-contain rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
                  sizes="300px"
                />
              </div>

              <div className="p-8 flex-1 text-[#f5f4f0] overflow-y-auto max-h-[85vh]">
                <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-2">
                  {selected.role}
                </span>
                <h3 className="font-serif text-3xl font-light mb-1">{selected.name}</h3>
                {selected.location && (
                  <p className="text-[0.75rem] tracking-wide opacity-50 mb-6">
                    {selected.location}
                  </p>
                )}

                <p className="text-sm leading-[1.8] opacity-70 mb-6">{selected.bio}</p>

                {selected.licenses.length > 0 && (
                  <div>
                    <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c8a96e]/70 mb-3">
                      Licenses & Certifications
                    </h4>
                    <ul className="space-y-1.5">
                      {selected.licenses.map((lic) => (
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
    </>
  );
}
