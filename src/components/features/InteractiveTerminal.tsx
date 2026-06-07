"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type CommandLog = {
  command: string;
  output: string;
};

const COMMANDS: Record<string, string> = {
  whoami: "Manush Patel — Full Stack Developer & AI Engineer.\nCSE Student at IIIT Vadodara. Building systems that matter.",
  skills: "FRONTEND  → React, Next.js, Tailwind CSS, TypeScript\nBACKEND   → Node.js, Express.js, REST APIs\nAI/ML     → Python, PyTorch, OpenCV, YOLOv8\nDATABASE  → MongoDB, Firebase\nTOOLS     → Git, Docker, Vercel, Postman",
  projects: "01 Traff-IQ     → AI Traffic Management System (YOLOv8 + React)\n02 SkillBuddy   → AI Learning Platform (Gemini API + MERN)",
  experience: "► Full Stack Developer    @ Spenta Engineers   [Present]\n► Full Stack SDE Intern   @ Nav Astitva Found. [Past]\n► Open Source Contributor @ GSSoC             [Past]",
  contact: "EMAIL     → manush@example.com\nLINKEDIN  → /in/manushpatel\nGITHUB    → github.com/manush",
  clear: "",
  help: "AVAILABLE COMMANDS\n──────────────────\nwhoami      About Manush\nskills      Technical stack\nprojects    Featured work\nexperience  Work history\ncontact     Get in touch\nclear       Clear terminal\nhelp        Show this menu",
};

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    { command: "__init__", output: "ManushOS v2.0 — Initialized.\nType 'help' to explore available commands.\n" }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logs.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setLogs([]);
      setInput("");
      return;
    }

    const output = COMMANDS[cmd] ?? `bash: ${cmd}: command not found\nType 'help' for available commands.`;
    setLogs((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  return (
    <section className="py-20 container mx-auto px-6 md:px-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>
          // interactive
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-heading">
          Developer <span className="text-gradient">Terminal</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(6,6,6,0.95)",
          border: "1px solid rgba(232,41,58,0.2)",
          boxShadow: "0 0 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,41,58,0.05), inset 0 0 60px rgba(232,41,58,0.02)",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div
          className="px-5 py-3.5 flex items-center gap-3 border-b"
          style={{ borderColor: "rgba(232,41,58,0.12)", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: "#E8293A", boxShadow: "0 0 8px rgba(232,41,58,0.6)" }} />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-muted-foreground flex-1 text-center">
            manush@portfolio — bash
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-6 h-[380px] overflow-y-auto font-mono text-sm space-y-4">
          {logs.map((log, i) => (
            <div key={i} className="space-y-1.5">
              {log.command !== "__init__" && (
                <div className="flex items-center gap-2">
                  <span style={{ color: "#E8293A" }}>❯</span>
                  <span className="text-white/90">{log.command}</span>
                </div>
              )}
              <pre
                className="whitespace-pre-wrap leading-relaxed text-[13px]"
                style={{ color: log.command === "__init__" ? "rgba(232,41,58,0.8)" : "#9CA3AF" }}
              >
                {log.output}
              </pre>
            </div>
          ))}

          {/* Input row */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4">
            <span style={{ color: "#E8293A" }}>❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-mono text-white text-sm placeholder:text-white/20"
              placeholder="type a command..."
              autoComplete="off"
              spellCheck="false"
              suppressHydrationWarning={true}
            />
            <span className="cursor-blink text-primary font-bold">█</span>
          </form>

          <div ref={bottomRef} />
        </div>
      </motion.div>
    </section>
  );
}
