"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Project", href: "/project" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const linkClass = (href: string) =>
    `text-[0.75rem] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#c8a96e] ${
      useLightNav ? "text-[#0d0d0d]" : "text-[#f5f4f0]/85"
    } ${
      (href === "/project" && pathname.startsWith("/project")) ||
      (href === "/team" && pathname.startsWith("/team")) ||
      pathname === href
        ? "text-[#c8a96e]"
        : ""
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hideNav
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      } ${
        useLightNav || menuOpen
          ? "py-4 bg-[#f5f4f0]/95 backdrop-blur-md border-b border-black/8"
          : "py-6"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-16">
        <Logo href="/" variant="hero" className="h-10 md:h-12 w-auto" priority />

        <ul className="hidden md:flex gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={`md:hidden p-2 -mr-2 cursor-pointer transition-colors duration-300 ${
            useLightNav || menuOpen ? "text-[#0d0d0d]" : "text-[#f5f4f0]"
          }`}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden list-none flex flex-col gap-1 px-6 pt-4 pb-2"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${linkClass(link.href)} block py-3 border-b border-black/5`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
