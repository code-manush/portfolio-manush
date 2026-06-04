import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Layers, GitBranch, Zap, Shield, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Navbar from "@/components/layout/navbar";
import CustomCursor from "@/components/ui/custom-cursor";
import ParticleBackground from "@/components/ui/particle-background";
import { projectsData } from "@/data/projects";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <CustomCursor />
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24 container mx-auto px-6 md:px-12 max-w-5xl">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero image */}
        <div className="relative h-64 md:h-96 overflow-hidden rounded-3xl border mb-12" style={{ borderColor: `${project.accent}30` }}>
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 70%)" }} />
          <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 z-10">
            <p className="text-sm font-mono mb-2 tracking-widest uppercase" style={{ color: project.accent }}>// {project.tagline}</p>
            <h1 className="text-4xl md:text-6xl font-black font-heading text-white mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full font-mono text-white/80 border backdrop-blur-md"
                  style={{ background: `${project.accent}15`, borderColor: `${project.accent}30` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content (Case Study Mode) */}
          <div className="md:col-span-2 space-y-16">
            
            {/* The Problem */}
            <div>
              <h2 className="text-2xl font-bold font-heading mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-[2px]" style={{ background: project.accent }}></span>
                The Problem
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{project.problemStatement}</p>
            </div>

            {/* Design Decisions & Trade-offs */}
            <div>
              <h2 className="text-2xl font-bold font-heading mb-6 text-white flex items-center gap-3">
                <span className="w-8 h-[2px]" style={{ background: project.accent }}></span>
                Design Decisions & Trade-offs
              </h2>
              <div className="space-y-4">
                {project.designDecisions.map((decision, i) => (
                  <div key={i} className="p-5 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
                    <h3 className="font-semibold text-white mb-2 font-mono text-sm uppercase tracking-wider" style={{ color: project.accent }}>{decision.label}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{decision.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Architecture */}
            <div>
              <h2 className="text-2xl font-bold font-heading mb-6 text-white flex items-center gap-3">
                <span className="w-8 h-[2px]" style={{ background: project.accent }}></span>
                System Architecture
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.architecture.layers.map((layer, i) => (
                  <div key={i} className="p-5 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg" style={{ background: `${layer.color}15`, color: layer.color }}>
                        {layer.icon}
                      </div>
                      <span className="font-semibold text-white">{layer.name}</span>
                    </div>
                    <div className="space-y-2">
                      {layer.items.map((item, j) => (
                        <div key={j} className="px-3 py-2 rounded-lg text-sm text-muted-foreground border border-white/5 bg-white/[0.01]">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div>
              <h2 className="text-2xl font-bold font-heading mb-6 text-white flex items-center gap-3">
                <span className="w-8 h-[2px]" style={{ background: project.accent }}></span>
                Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((img, i) => (
                  <div key={i} className="relative h-48 rounded-2xl overflow-hidden border border-white/10 group">
                    <Image src={img} alt={`${project.title} screenshot ${i+1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>

            {/* Retrospective */}
            <div>
              <h2 className="text-2xl font-bold font-heading mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-[2px]" style={{ background: project.accent }}></span>
                Retrospective
              </h2>
              <div className="p-6 rounded-2xl border-l-4" style={{ background: "rgba(255,255,255,0.02)", borderColor: project.accent }}>
                <p className="text-muted-foreground leading-relaxed italic">"{project.retrospective}"</p>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-6 rounded-3xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
              <h3 className="text-sm font-mono uppercase tracking-widest mb-6" style={{ color: project.accent }}>Project Metrics</h3>
              <div className="space-y-5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div style={{ color: project.accent }}>{h.icon}</div>
                      <span className="text-sm">{h.label}</span>
                    </div>
                    <span className="font-bold text-white font-heading">{h.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Measurable Outcomes */}
            <div className="p-6 rounded-3xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
              <h3 className="text-sm font-mono uppercase tracking-widest mb-6" style={{ color: project.accent }}>Outcomes</h3>
              <div className="space-y-4">
                {project.outcomes.map((outcome, i) => (
                  <div key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: project.accent }} />
                    <span className="leading-snug">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={project.demo}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)`,
                  boxShadow: `0 0 20px ${project.accent}40`,
                }}
              >
                <ExternalLink className="w-4 h-4" /> View Live Demo
              </a>
              <a
                href={project.github}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold text-white border transition-all hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <FaGithub className="w-4 h-4" /> Source Code
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
