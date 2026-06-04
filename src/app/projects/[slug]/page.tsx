import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Layers, GitBranch, Zap, Shield } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Navbar from "@/components/layout/navbar";
import CustomCursor from "@/components/ui/custom-cursor";
import ParticleBackground from "@/components/ui/particle-background";

// Reusing project data for the dynamic page. In a real app this would come from a DB or CMS.
const projectsData = [
  {
    slug: "traff-iq",
    title: "Traff-IQ",
    tagline: "AI-Powered Adaptive Traffic Management",
    description:
      "A real-time AI system that uses computer vision to intelligently manage urban traffic signals, detect violations, and prioritize emergency vehicles. Built with robust computer vision models and an adaptive traffic signal control algorithm, Traff-IQ aims to revolutionize how modern cities handle vehicle flow.",
    features: [
      "YOLOv8 vehicle detection & classification",
      "Real-time multi-camera traffic analysis",
      "Emergency vehicle prioritization",
      "Violation detection with evidence capture",
      "Smart adaptive signal optimization",
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "PyTorch", "React", "Node.js"],
    image: "/traff-iq-mockup.png",
    github: "#",
    demo: "#",
    accent: "#E8293A",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "Latency", value: "<100ms" },
      { icon: <Shield className="w-4 h-4" />, label: "Accuracy", value: "94.3%" },
      { icon: <Layers className="w-4 h-4" />, label: "Cameras", value: "Multi-Feed" },
    ],
    architecture: {
      layers: [
        { name: "Input Layer", icon: <GitBranch className="w-4 h-4" />, items: ["Camera Feeds", "RTSP Streams", "Sensor Data"], color: "#3B82F6" },
        { name: "AI Core", icon: <Zap className="w-4 h-4" />, items: ["YOLOv8 Detection", "PyTorch Models", "OpenCV Processing"], color: "#E8293A" },
        { name: "Logic Engine", icon: <Layers className="w-4 h-4" />, items: ["Priority Queue", "Signal Controller", "Violation Tracker"], color: "#FF6B35" },
        { name: "Frontend", icon: <Shield className="w-4 h-4" />, items: ["React Dashboard", "Node.js API", "Real-time WebSockets"], color: "#9B1C2E" },
      ],
    },
  },
  {
    slug: "skillbuddy",
    title: "SkillBuddy",
    tagline: "AI-Powered Personalized Learning Platform",
    description:
      "An intelligent learning platform that uses Gemini AI to analyze skill gaps, create personalized learning paths, and track progress over time. SkillBuddy is designed to adapt to a user's unique learning pace, providing tailored resources and dynamically adjusting difficulty to maximize educational outcomes.",
    features: [
      "Adaptive learning path generation",
      "AI-driven skill gap analysis",
      "Gemini API integration for personalization",
      "Real-time progress tracking & analytics",
      "Smart content recommendations",
    ],
    tech: ["React", "Node.js", "MongoDB", "Gemini API", "Express.js", "JWT"],
    image: "/skillbuddy-mockup.png",
    github: "#",
    demo: "#",
    accent: "#9B1C2E",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "AI Model", value: "Gemini Pro" },
      { icon: <Shield className="w-4 h-4" />, label: "Auth", value: "JWT + Bcrypt" },
      { icon: <Layers className="w-4 h-4" />, label: "Stack", value: "MERN" },
    ],
    architecture: {
      layers: [
        { name: "Client", icon: <GitBranch className="w-4 h-4" />, items: ["React 18", "Tailwind CSS", "Framer Motion"], color: "#3B82F6" },
        { name: "API Layer", icon: <Zap className="w-4 h-4" />, items: ["Node.js", "Express.js", "JWT Auth"], color: "#9B1C2E" },
        { name: "AI Service", icon: <Layers className="w-4 h-4" />, items: ["Gemini API", "Prompt Engineering", "RAG Pipeline"], color: "#FF6B35" },
        { name: "Database", icon: <Shield className="w-4 h-4" />, items: ["MongoDB Atlas", "Redis Cache", "CDN Assets"], color: "#E8293A" },
      ],
    },
  },
];

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
          <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10">
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
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-xl font-bold font-heading mb-4 text-white flex items-center gap-3">
                <span className="w-8 h-[2px]" style={{ background: project.accent }}></span>
                Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading mb-6 text-white flex items-center gap-3">
                <span className="w-8 h-[2px]" style={{ background: project.accent }}></span>
                Key Features
              </h2>
              <ul className="space-y-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1" style={{ color: project.accent }}>▸</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading mb-6 text-white flex items-center gap-3">
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
