"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

const details = [
  { icon: Mail, label: "Email", value: "contact@magiclineeng.com" },
  { icon: Phone, label: "Phone", value: "+1 (435) 341-0647" },
  { icon: MapPin, label: "Studio", value: "340 W 28th St, New York, NY" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="px-16 py-28 bg-[#f5f4f0]">
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

          <div className="mt-10 flex flex-col gap-6">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <Icon size={16} className="text-[#c8a96e] mt-1 shrink-0" />
                <div>
                  <span className="text-[0.68rem] tracking-[0.2em] uppercase text-[#c8a96e] block mb-1">
                    {label}
                  </span>
                  <p className="text-sm">{value}</p>
                </div>
              </div>
            ))}
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
              className="bg-transparent border-b border-black/20 py-3 text-sm font-light placeholder:text-[#888] placeholder:text-[0.85rem] outline-none focus:border-[#c8a96e] transition-colors duration-300"
            />
          ))}
          <textarea
            placeholder="Tell us about your project"
            rows={5}
            required
            className="bg-transparent border-b border-black/20 py-3 text-sm font-light placeholder:text-[#888] placeholder:text-[0.85rem] outline-none focus:border-[#c8a96e] transition-colors duration-300 resize-none"
          />
          <button
            type="submit"
            disabled={sent}
            className={`self-start mt-2 px-10 py-3 text-[0.75rem] tracking-[0.2em] uppercase transition-colors duration-300 ${
              sent
                ? "bg-[#c8a96e] text-white cursor-default"
                : "bg-[#0d0d0d] text-[#f5f4f0] hover:bg-[#c8a96e]"
            }`}
          >
            {sent ? "Message Sent ✓" : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
