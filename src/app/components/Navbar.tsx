"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Work", "About", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-16 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-[#f5f4f0]/95 backdrop-blur-md border-b border-black/8"
          : "py-6"
      }`}
    >
      <Link
        href="/"
        className={`text-xs tracking-[0.25em] uppercase font-normal transition-colors duration-400 ${
          scrolled ? "text-[#0d0d0d]" : "text-[#f5f4f0]"
        }`}
      >
        Magic Line
      </Link>
      <ul className="flex gap-10 list-none">
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className={`text-[0.75rem] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#c8a96e] ${
                scrolled ? "text-[#0d0d0d]" : "text-[#f5f4f0]/85"
              }`}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
