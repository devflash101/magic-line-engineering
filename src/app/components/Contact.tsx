"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "info@magiclineeng.com";

const fields = [
  { name: "name", label: "Your Name", type: "text", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "projectType", label: "Project Type", type: "text", required: false },
] as const;

const emptyForm = { name: "", email: "", projectType: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [handedOff, setHandedOff] = useState(false);

  const update = (name: string, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = form.projectType
      ? `Project inquiry — ${form.projectType}`
      : "Project inquiry";
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.projectType ? `Project type: ${form.projectType}` : null,
      "",
      form.message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setHandedOff(true);
  };

  return (
    <section
      id="contact"
      className="px-6 md:px-16 py-20 md:py-28 bg-[#161616] text-[#f5f4f0]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-start">
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
            We’d love to hear about your project. Reach out and let’s talk.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Mail size={16} className="text-[#c8a96e] shrink-0" />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[0.68rem] tracking-[0.2em] text-[#c8a96e] hover:opacity-80 transition-opacity duration-300 break-all"
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
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label htmlFor={`contact-${field.name}`} className="sr-only">
                {field.label}
              </label>
              <input
                id={`contact-${field.name}`}
                name={field.name}
                type={field.type}
                placeholder={field.label}
                required={field.required}
                value={form[field.name]}
                onChange={(e) => update(field.name, e.target.value)}
                className="bg-transparent border-b border-white/20 py-3 text-sm font-light text-[#f5f4f0] placeholder:text-white/40 placeholder:text-[0.85rem] outline-none focus:border-[#c8a96e] transition-colors duration-300"
              />
            </div>
          ))}
          <div className="flex flex-col">
            <label htmlFor="contact-message" className="sr-only">
              Tell us about your project
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell us about your project"
              rows={5}
              required
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="bg-transparent border-b border-white/20 py-3 text-sm font-light text-[#f5f4f0] placeholder:text-white/40 placeholder:text-[0.85rem] outline-none focus:border-[#c8a96e] transition-colors duration-300 resize-none"
            />
          </div>
          <button
            type="submit"
            className="self-start mt-2 px-10 py-3 text-[0.75rem] tracking-[0.2em] uppercase bg-[#f5f4f0] text-[#0d0d0d] hover:bg-[#c8a96e] hover:text-[#f5f4f0] transition-colors duration-300"
          >
            Send Message
          </button>
          {handedOff && (
            <p aria-live="polite" className="text-[0.75rem] leading-relaxed opacity-65">
              Your email app should open with the message ready to send. If nothing
              happened, write to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#c8a96e] break-all">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
