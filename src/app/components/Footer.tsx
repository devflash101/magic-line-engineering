export default function Footer() {
  const socials = ["Instagram", "LinkedIn", "Behance"];

  return (
    <footer className="bg-[#0d0d0d] text-[#f5f4f0] px-16 py-10 flex justify-between items-center border-t border-white/5">
      <span className="text-xs tracking-[0.25em] uppercase">Magic Line</span>
      <p className="text-[0.75rem] opacity-40 tracking-wide">
        © 2025 Magic Line Architecture. All rights reserved.
      </p>
      <div className="flex gap-8">
        {socials.map((s) => (
          <a
            key={s}
            href="#"
            className="text-[0.75rem] tracking-[0.1em] opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}
