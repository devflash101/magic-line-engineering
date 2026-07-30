import Link from "next/link";

const links = [
  { label: "Project", href: "/project" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-[#f5f4f0] px-6 md:px-16 py-10 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center text-center md:text-left border-t border-white/5">
      <p className="text-[0.75rem] opacity-40 tracking-wide">
        © 2020–{new Date().getFullYear()} Magic Line Engineering. All rights reserved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[0.75rem] tracking-[0.1em] uppercase opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            {link.label}
          </Link>
        ))}
        <a
          href="mailto:info@magiclineeng.com"
          className="text-[0.75rem] tracking-[0.1em] opacity-50 hover:opacity-100 hover:text-[#c8a96e] transition-all duration-300"
        >
          info@magiclineeng.com
        </a>
      </div>
    </footer>
  );
}
