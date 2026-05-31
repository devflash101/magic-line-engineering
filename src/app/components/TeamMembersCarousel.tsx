"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { teamMembers, type TeamMember } from "@/lib/team";

export default function TeamMembersCarousel({
  onSelect,
}: {
  onSelect: (member: TeamMember) => void;
}) {
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
      if (el.scrollLeft < 0) el.scrollLeft += el.scrollWidth / 2;
      else if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
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
    if (Math.abs(deltaX) > 5) didDragRef.current = true;
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

  useEffect(() => () => stopInertia(), []);

  const handleWheelLock = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const el = scrollRef.current;
    if (el) el.scrollTop = 0;
  };

  const handleRailScroll = () => {
    const el = scrollRef.current;
    if (el && el.scrollTop !== 0) el.scrollTop = 0;
  };

  return (
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
      className="flex h-[430px] items-start gap-14 overflow-x-hidden overflow-y-hidden py-2 cursor-grab select-none touch-pan-x"
      style={{ scrollbarWidth: "none", overscrollBehavior: "contain" }}
    >
      {[...teamMembers, ...teamMembers].map((member, i) => (
        <motion.div
          key={`${member.id}-${i}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: (i % teamMembers.length) * 0.1 }}
          onClick={() => {
            if (!didDragRef.current) onSelect(member);
          }}
          className="flex-shrink-0 w-[260px] group cursor-pointer"
        >
          <div className="relative w-[260px] h-[340px] overflow-hidden rounded-2xl mb-4">
            <Image
              src={member.image}
              alt={member.name}
              fill
              loading="lazy"
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
      ))}
    </div>
  );
}
