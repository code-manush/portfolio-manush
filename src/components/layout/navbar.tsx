"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Keyboard } from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
      style={
        isScrolled
          ? { boxShadow: "0 4px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,41,58,0.08)" }
          : {}
      }
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group relative z-50 flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <span className="font-heading font-bold text-xl text-white group-hover:text-gradient transition-all duration-300">
            Manush.
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: "linear-gradient(90deg, #E8293A, #FF6B35)" }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Ctrl+K hint */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-muted-foreground border border-white/10 hover:border-primary/30 hover:text-white transition-all"
          >
            <Keyboard className="w-3 h-3" />
            <span>Ctrl K</span>
          </button>

          <MagneticButton>
            <a
              href="/resume.pdf" target="_blank" rel="noreferrer"
              className="relative px-6 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden group transition-all inline-block"
              style={{
                background: "linear-gradient(135deg, #E8293A, #9B1C2E)",
                boxShadow: "0 0 20px rgba(232,41,58,0.3)",
              }}
            >
              <span className="relative z-10">Resume</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(135deg, #ff4d5e, #E8293A)" }}
              />
            </a>
          </MagneticButton>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 text-white p-2 rounded-md border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen glass bg-background/98 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              <ul className="flex flex-col items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-heading font-semibold text-muted-foreground hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href="/resume.pdf" target="_blank" rel="noreferrer"
                className="px-8 py-4 rounded-full text-white font-semibold text-lg inline-block text-center"
                style={{ background: "linear-gradient(135deg, #E8293A, #9B1C2E)", boxShadow: "0 0 30px rgba(232,41,58,0.3)" }}
              >
                Download Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
