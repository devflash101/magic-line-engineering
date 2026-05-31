"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Project", href: "/project" },
  { label: "About", href: "/#about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const isSubpage = !isHome;
  const useLightNav = forceScrolled || isSubpage || scrolled || isHome;
  const hideNav = isHome && !forceScrolled && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-16 transition-all duration-500 ${
        hideNav
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      } ${
        useLightNav
          ? "py-4 bg-[#f5f4f0]/95 backdrop-blur-md border-b border-black/8"
          : "py-6"
      }`}
    >
      <Logo href="/" variant="hero" className="h-11 md:h-12 w-auto" priority />
      <ul className="flex gap-10 list-none">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`text-[0.75rem] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#c8a96e] ${
                useLightNav ? "text-[#0d0d0d]" : "text-[#f5f4f0]/85"
              } ${
                (link.href === "/project" && pathname.startsWith("/project")) ||
                (link.href === "/team" && pathname.startsWith("/team"))
                  ? "text-[#c8a96e]"
                  : pathname === link.href
                    ? "text-[#c8a96e]"
                    : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
