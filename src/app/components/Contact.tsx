"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "info@magiclineeng.com";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="px-16 py-28 bg-[#161616] text-[#f5f4f0]">
      <div className="grid grid-cols-2 gap-24 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[#c8a96e] block mb-3">
            Get In Touch
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.1]">
            Start a
            <br />
            <em className="text-[#c8a96e]">Conversation</em>
          </h2>
          <p className="mt-6 leading-[1.8] opacity-65 max-w-sm">
            We'd love to hear about your project. Reach out and let's talk.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Mail size={16} className="text-[#c8a96e] shrink-0" />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[0.68rem] tracking-[0.2em] text-[#c8a96e] hover:opacity-80 transition-opacity duration-300"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-5 pt-2"
        >
          {[
            { placeholder: "Your Name", type: "text", required: true },
            { placeholder: "Email Address", type: "email", required: true },
            { placeholder: "Project Type", type: "text", required: false },
          ].map((field) => (
            <input
              key={field.placeholder}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              className="bg-transparent border-b border-white/20 py-3 text-sm font-light text-[#f5f4f0] placeholder:text-white/40 placeholder:text-[0.85rem] outline-none focus:border-[#c8a96e] transition-colors duration-300"
            />
          ))}
          <textarea
            placeholder="Tell us about your project"
            rows={5}
            required
            className="bg-transparent border-b border-white/20 py-3 text-sm font-light text-[#f5f4f0] placeholder:text-white/40 placeholder:text-[0.85rem] outline-none focus:border-[#c8a96e] transition-colors duration-300 resize-none"
          />
          <button
            type="submit"
            disabled={sent}
            className={`self-start mt-2 px-10 py-3 text-[0.75rem] tracking-[0.2em] uppercase transition-colors duration-300 ${
              sent
                ? "bg-[#c8a96e] text-white cursor-default"
                : "bg-[#f5f4f0] text-[#0d0d0d] hover:bg-[#c8a96e] hover:text-[#f5f4f0]"
            }`}
          >
            {sent ? "Message Sent ✓" : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
