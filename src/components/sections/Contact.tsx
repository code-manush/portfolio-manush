"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MagneticButton from "@/components/ui/magnetic-button";

const socialLinks = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "manush@example.com",
    href: "mailto:manush@example.com",
    color: "#E8293A",
  },
  {
    icon: <FaLinkedin className="w-5 h-5" />,
    label: "LinkedIn",
    value: "/in/manushpatel",
    href: "#",
    color: "#0077b5",
  },
  {
    icon: <FaGithub className="w-5 h-5" />,
    label: "GitHub",
    value: "github.com/manush",
    href: "#",
    color: "#E8293A",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }}
      />
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(232,41,58,0.08) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>
                // get in touch
              </span>
              <h2 className="text-5xl md:text-6xl font-bold font-heading leading-tight">
                Let's Build Something{" "}
                <span className="text-gradient neon-glow-text">Extraordinary</span>.
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Whether you're a founder scaling a product or an engineering team looking for
              talent — I'm always open to impactful opportunities.
            </p>

            <div className="flex flex-col gap-5 mt-2">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-4 group w-fit"
                >
                  <div
                    className="p-3 rounded-xl border transition-all"
                    style={{
                      background: `${link.color}10`,
                      borderColor: `${link.color}20`,
                      color: link.color,
                    }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{link.label}</p>
                    <p className="text-white font-medium group-hover:text-primary transition-colors">{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              className="flex flex-col gap-5 rounded-3xl p-8 md:p-10"
              style={{
                background: "rgba(14,14,14,0.8)",
                border: "1px solid rgba(232,41,58,0.12)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,41,58,0.05)",
              }}
            >
              {[
                { id: "name", label: "Name", type: "text", placeholder: "John Doe" },
                { id: "email", label: "Email", type: "email", placeholder: "john@company.com" },
              ].map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label htmlFor={field.id} className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none transition-all"
                    style={{
                      background: "rgba(232,41,58,0.04)",
                      border: "1px solid rgba(232,41,58,0.15)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,41,58,0.45)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(232,41,58,0.1)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(232,41,58,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none transition-all resize-none"
                  style={{
                    background: "rgba(232,41,58,0.04)",
                    border: "1px solid rgba(232,41,58,0.15)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,41,58,0.45)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(232,41,58,0.1)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(232,41,58,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>

              <MagneticButton className="mt-2 w-full">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm group transition-all"
                  style={{
                    background: "linear-gradient(135deg, #E8293A 0%, #9B1C2E 100%)",
                    boxShadow: "0 0 25px rgba(232,41,58,0.35)",
                  }}
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 relative">
        <div className="h-px mx-12 md:mx-24" style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.2), transparent)" }} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-8 text-center"
        >
          <p className="text-muted-foreground text-sm font-mono">
            Designed & Developed by{" "}
            <span
              className="font-bold text-white"
              style={{ textShadow: "0 0 15px rgba(232,41,58,0.4)" }}
            >
              Manush Patel
            </span>
            {" "}— Built with Next.js & ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
}
