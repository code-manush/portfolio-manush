"use client";

import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Folder, Briefcase, Code2, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden shadow-2xl glass-card border-white/10 max-w-2xl bg-background/80 backdrop-blur-xl">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <Command className="w-full flex flex-col bg-transparent text-white">
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="w-5 h-5 text-muted-foreground mr-2" />
            <Command.Input 
              placeholder="Type a command or search..." 
              className="flex-1 bg-transparent py-4 outline-none placeholder:text-muted-foreground text-lg"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-area">
            <Command.Empty className="py-6 text-center text-muted-foreground">No results found.</Command.Empty>
            
            <Command.Group heading={<div className="px-2 text-xs font-medium text-muted-foreground mb-2 mt-4">Navigation</div>}>
              <Command.Item onSelect={() => runCommand(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10">
                <Folder className="w-4 h-4 text-primary" />
                <span>Projects</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }))} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10">
                <Briefcase className="w-4 h-4 text-secondary" />
                <span>Experience</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }))} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10">
                <Code2 className="w-4 h-4 text-accent" />
                <span>Skills</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading={<div className="px-2 text-xs font-medium text-muted-foreground mb-2 mt-4">Links</div>}>
              <Command.Item onSelect={() => runCommand(() => window.open('#', '_blank'))} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10">
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => window.open('#', '_blank'))} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10">
                <FaGithub className="w-4 h-4 text-white" />
                <span>GitHub</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => window.open('#', '_blank'))} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10">
                <FaLinkedin className="w-4 h-4 text-[#0077b5]" />
                <span>LinkedIn</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }))} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10">
                <Mail className="w-4 h-4 text-green-400" />
                <span>Contact</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
