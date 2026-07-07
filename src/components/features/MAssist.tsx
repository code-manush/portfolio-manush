"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Cpu } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function MAssist() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm M-Assist. Ask me anything about Manush's skills, projects, or experience." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white z-50"
            style={{
              background: "linear-gradient(135deg, #E8293A, #9B1C2E)",
              boxShadow: "0 0 25px rgba(232,41,58,0.5), 0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <Cpu className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] z-50 flex flex-col overflow-hidden rounded-2xl"
            style={{
              background: "rgba(10,10,10,0.92)",
              border: "1px solid rgba(232,41,58,0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(0,0,0,0.7), 0 0 30px rgba(232,41,58,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between border-b"
              style={{ borderColor: "rgba(232,41,58,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(232,41,58,0.15)" }}
                >
                  <Cpu className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm font-heading">M-Assist</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] text-primary font-mono">online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? { background: "linear-gradient(135deg, #E8293A, #9B1C2E)", color: "#fff", borderRadius: "18px 18px 4px 18px" }
                        : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,41,58,0.1)", color: "#e5e7eb", borderRadius: "18px 18px 18px 4px" }
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-2xl text-sm flex gap-1 items-center"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,41,58,0.1)", borderRadius: "18px 18px 18px 4px" }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t" style={{ borderColor: "rgba(232,41,58,0.1)" }}>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 rounded-full pl-4 pr-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none transition-all"
                  style={{
                    background: "rgba(232,41,58,0.06)",
                    border: "1px solid rgba(232,41,58,0.15)",
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-all"
                  style={{ background: "linear-gradient(135deg, #E8293A, #9B1C2E)" }}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
