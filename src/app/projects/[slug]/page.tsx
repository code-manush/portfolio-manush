import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, GitBranch, ExternalLink, Calendar, User, Activity, Check, Zap, Mic } from "lucide-react";
import BrowserMockup from "@/components/ui/browser-mockup";
import FloatingDevice from "@/components/ui/floating-device";
import AnimatedSection from "@/components/ui/animated-section";
import ReadingProgress from "@/components/ui/reading-progress";
import ThematicEnvironment from "@/components/ui/thematic-environments";
import CustomCursor from "@/components/ui/custom-cursor";
import { projectsData } from "@/data/projects";
import { Syne, Space_Grotesk, Playfair_Display } from "next/font/google";

const fontSyne = Syne({ subsets: ["latin"], weight: ["700", "800"] });
const fontSpace = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });
const fontPlayfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], style: ["italic", "normal"] });

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);
  if (!project) notFound();

  const isMobileApp = project.visualStyle?.imageFrame === "mobile";

  let titleFontClass = "";
  if (project.visualStyle?.theme === "organic") titleFontClass = fontPlayfair.className;
  else if (project.visualStyle?.theme === "cyberpunk" || project.visualStyle?.theme === "industrial") titleFontClass = fontSyne.className;
  else titleFontClass = fontSpace.className;

  // CUSTOM HEADING TYPOGRAPHY
  const sectionHeadingClass = project.slug === 'traff-iq'
    ? "text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-white mb-8"
    : project.slug === 'spenta-engineers'
    ? "text-3xl font-bold text-white mb-8 tracking-[0.02em]"
    : "text-3xl font-bold text-white mb-8 tracking-tight";

  // BASE BACKGROUND
  let bgClass = "bg-[#050505]";
  if (project.slug === 'navastitva') bgClass = "bg-[#1a0a0e]";
  else if (project.slug === 'climatrix') bgClass = "bg-[linear-gradient(to_bottom,#020813,#061124,#091833)]";

  return (
    <div className={`relative min-h-screen ${bgClass} selection:bg-white/20 overflow-x-hidden pb-32`}>
      {project.slug === 'navastitva' && (
         <div className="fixed inset-0 pointer-events-none -z-20 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      )}
      {project.slug === 'climatrix' && (
         <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      )}

      <CustomCursor color={project.accent} />
      <ReadingProgress accent={project.accent} />
      <ThematicEnvironment slug={project.slug} />

      {/* ========================================================= */}
      {/* 1. HEADER SECTION */}
      {/* ========================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 pt-16 pb-16 flex flex-col items-center text-center">

        {/* TRAFF-IQ: HERO BACKGROUND CSS GRID */}
        {project.slug === 'traff-iq' && (
          <div className="absolute inset-0 pointer-events-none -z-20 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px] opacity-100 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        )}

        {/* TRAFF-IQ: SIGNAL-STATE DOTS */}
        {project.slug === 'traff-iq' && (
          <div className="absolute top-8 right-8 flex gap-2 z-50">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-[pulse_2s_ease-in-out_infinite_0.6s] shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite_1.2s] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          </div>
        )}

        {/* IDEA 1: AMBIENT PROJECT-SPECIFIC GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[600px] pointer-events-none -z-10 overflow-hidden flex justify-center">
          <div
            className="w-[800px] h-[600px] rounded-full blur-[150px] opacity-20 animate-pulse-slow mix-blend-screen"
            style={{ backgroundColor: project.accent }}
          />
        </div>
        <AnimatedSection delay={0.1} className="w-full flex justify-start mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors group text-xs uppercase tracking-[0.2em] font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Index
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="w-full flex flex-col items-center">
          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tighter text-white leading-none ${titleFontClass}`}>
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/60 mb-6 font-light leading-relaxed max-w-xl">
            {project.tagline}
          </p>

          {/* NAVASTITVA: COLLABORATION CALLOUT */}
          {project.slug === 'navastitva' && (
             <div className="mt-2 mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8293A]/30 bg-[#E8293A]/10 text-[#E8293A] text-sm font-medium">
                Lead Developer on a 2-person team
             </div>
          )}

          {/* CLIMATRIX: VOICE SEARCH DEMO BLOCK */}
          {project.slug === 'climatrix' && (
             <div className="mt-2 mb-8 inline-flex items-center gap-4 px-6 py-3 rounded-full border border-[#3B82F6]/30 bg-black/40 backdrop-blur-md shadow-2xl text-[#3B82F6] text-sm font-medium relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3B82F6]/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                <Mic className="w-5 h-5 animate-pulse" />
                <span className="text-white/90">Say: <span className="font-bold">"New York"</span></span>
                <div className="flex gap-1 items-center h-4 ml-2">
                   {[1, 2, 3, 4, 5].map((i) => (
                     <div key={i} className="w-1 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s`, height: i % 2 === 0 ? '16px' : '8px' }} />
                   ))}
                </div>
             </div>
          )}
        </AnimatedSection>

        {/* SKILLBUDDY: HERO CHAT BUBBLE */}
        {project.slug === 'skillbuddy' && (
          <AnimatedSection delay={0.25} className="w-full max-w-lg mx-auto mb-16 flex flex-col gap-4 text-left">
            <div className="flex justify-end">
              <div className="bg-white/10 border border-white/10 text-white/90 px-5 py-3 rounded-2xl rounded-tr-sm text-sm shadow-xl">
                I want to learn Python for Data Science in 4 weeks.
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-white px-5 py-4 rounded-2xl rounded-tl-sm text-sm relative overflow-hidden group shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                <p className="font-bold text-[#A78BFA] mb-1 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Gemini AI
                </p>
                <p className="text-white/80 leading-relaxed">I've generated a custom 4-week path. Week 1 focuses on Pandas and NumPy fundamentals...</p>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* NAVASTITVA: HUMAN IMPACT NUMBERS */}
        {project.slug === 'navastitva' && (
          <AnimatedSection delay={0.25} className="w-full max-w-2xl mx-auto mb-16 flex justify-around items-center bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-[2rem] border border-[#E8293A]/20 shadow-[0_10px_40px_rgba(232,41,58,0.1)]">
             <div className="flex flex-col items-center gap-1">
               <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">10+</span>
               <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest font-light mt-1">Pages Built</span>
             </div>
             <div className="w-px h-12 bg-white/10" />
             <div className="flex flex-col items-center gap-1">
               <span className="text-4xl sm:text-5xl font-bold text-[#E8293A] tracking-tight">3</span>
               <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest font-light mt-1">Report Types</span>
             </div>
             <div className="w-px h-12 bg-white/10" />
             <div className="flex flex-col items-center gap-1">
               <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">10k+</span>
               <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest font-light mt-1">Community Reach</span>
             </div>
          </AnimatedSection>
        )}

        {/* SPENTA ENGINEERS: LIGHTHOUSE SCORES */}
        {project.slug === 'spenta-engineers' && (
          <AnimatedSection delay={0.25} className="w-full max-w-2xl mx-auto mb-16 flex justify-between items-center bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/5 shadow-2xl">
            {[
              { label: "Performance", score: 98, dash: 295 },
              { label: "Accessibility", score: 100, dash: 314 },
              { label: "Best Practices", score: 95, dash: 282 },
              { label: "SEO", score: 100, dash: 314 }
            ].map((metric, i) => (
              <div key={i} className="flex flex-col items-center gap-3 sm:gap-4">
                 <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90 absolute inset-0">
                      <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                      <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="314" strokeDashoffset={314 - metric.dash} className="transition-all duration-1000 ease-out" />
                    </svg>
                    <span className="text-[#10B981] font-mono text-xl sm:text-2xl">{metric.score}</span>
                 </div>
                 <span className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest text-center whitespace-nowrap">{metric.label}</span>
              </div>
            ))}
          </AnimatedSection>
        )}

        <AnimatedSection delay={0.3} className="w-full">
          {/* Meta Grid */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-8">
            <div className="flex flex-col items-center">
              <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3 font-bold">Role</p>
              <p className="text-white/90 font-medium flex items-center gap-2 text-sm">
                <User className="w-4 h-4" style={{ color: project.accent }} />
                {project.role}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3 font-bold">Timeline</p>
              <p className="text-white/90 font-medium flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" style={{ color: project.accent }} />
                {project.duration}
              </p>
            </div>
          </div>

          {/* Stack */}
          <div className="flex flex-col items-center mb-10">
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-4 font-bold">Technologies</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/[0.03] border border-white/5 text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-[1.02] transition-transform text-sm">
              <GitBranch className="w-4 h-4" />
              Source Code
            </a>
            {project.demo !== "#" && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-transparent text-white font-bold border border-white/20 hover:bg-white/5 transition-colors text-sm">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </AnimatedSection>
      </div>

      {/* ========================================================= */}
      {/* 2. HORIZONTAL CAROUSEL (MEDIUM SIZE, INFINITE LOOP) */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full mb-32 overflow-hidden flex flex-col items-center">
        <div className="flex w-max animate-scroll-x-4 pb-8 pt-4 hover:[animation-play-state:paused] group">
          {[...Array(4)].map((_, setIndex) => (
            <div key={`set-${setIndex}`} className="flex gap-8 pr-8" aria-hidden={setIndex > 0 ? "true" : undefined}>

              {/* NAVASTITVA: MOBILE PARITY GALLERY ITEM */}
              {project.slug === 'navastitva' && setIndex === 0 && (
                <div className="shrink-0 w-[85vw] sm:w-[500px] md:w-[700px] h-full flex items-center justify-center relative">
                   <div className="w-2/3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-white/10 self-start mt-4">
                     <BrowserMockup accent={project.accent} className="w-full h-full">
                        <Image src={project.gallery[0]} alt="Desktop Parity" width={800} height={600} className="w-full h-[250px] sm:h-[300px] object-cover object-top rounded-b-2xl" />
                     </BrowserMockup>
                   </div>
                   <div className="w-[120px] sm:w-[150px] shadow-[0_30px_60px_rgba(0,0,0,0.7)] z-10 -ml-16 sm:-ml-24 mt-20 sm:mt-16 bg-black rounded-[2rem] p-2 border border-[#404040]">
                     <FloatingDevice imageUrl={project.gallery[2] || project.gallery[0]} />
                   </div>
                </div>
              )}

              {/* SKILLBUDDY: CSS DASHBOARD AS FIRST ITEM IN GALLERY */}
              {project.slug === 'skillbuddy' && setIndex === 0 && (
                <div className="shrink-0 w-[85vw] sm:w-[450px] md:w-[650px] h-full flex items-center">
                  <div className="w-full relative p-6 sm:p-8 rounded-[2rem] bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-6">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />
                    <div className="flex justify-between items-end mb-2 border-b border-white/5 pb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Learning Progress</h3>
                        <p className="text-white/50 text-xs font-light">Python Data Science Track</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-mono text-white font-light tracking-tighter">68%</p>
                        <p className="text-[#10B981] text-[10px] font-bold tracking-widest uppercase mt-1">+12% this week</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-1 md:col-span-2 h-48 bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-end gap-2">
                        <div className="flex items-end justify-between h-full gap-2 sm:gap-3">
                          {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                            <div key={i} className="w-full bg-[#8B5CF6]/20 rounded-t-sm relative group/bar cursor-crosshair hover:bg-[#8B5CF6]/40 transition-colors" style={{ height: `${h}%` }}>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                {h}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-[8px] text-white/30 uppercase font-mono mt-2 tracking-widest">
                          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                      </div>
                      <div className="h-48 bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center relative">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                          <circle cx="48" cy="48" r="38" fill="none" stroke="#8B5CF6" strokeWidth="8" strokeDasharray="238" strokeDashoffset="76" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-2xl font-mono font-light text-white">12</span>
                          <span className="text-[8px] text-white/50 uppercase tracking-widest mt-1">Modules</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.gallery.map((img, i) => (
                <div key={i} className="shrink-0 w-[85vw] sm:w-[450px] md:w-[550px]">
                  <div className="w-full group/card">
                    <BrowserMockup accent={project.accent} className="w-full shadow-2xl rounded-2xl transition-all duration-700 hover:shadow-[0_20px_80px_-20px_rgba(255,255,255,0.1)]">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        width={1200}
                        height={800}
                        className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover object-top rounded-b-2xl transition-transform duration-1000 group-hover/card:scale-[1.02]"
                      />
                    </BrowserMockup>
                  </div>
                </div>
              ))}
            </div>
          ))}

        </div>
        <div className="flex justify-center opacity-50 mt-4">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Hover to pause auto-scroll</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. CASE STUDY BODY */}
      {/* ========================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 flex flex-col gap-24">

        {/* Overview & Problem */}
        <AnimatedSection>
          <h2 className={sectionHeadingClass.replace("mb-8", "mb-6")}>Overview</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-16 font-light">
            {project.description}
          </p>

          {/* SPENTA ENGINEERS: CLIENT BRIEF */}
          {project.slug === 'spenta-engineers' ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 p-8 sm:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full transition-all duration-500 group-hover:w-2" style={{ background: project.accent }} />
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-4 tracking-[0.02em]">
                    <Activity className="w-6 h-6" style={{ color: project.accent }} />
                    Client Brief
                  </h3>
                  <p className="text-base sm:text-lg text-white/60 leading-relaxed font-light">
                    {project.problemStatement}
                  </p>
                </div>
                <div className="p-8 sm:p-10 rounded-[2rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 tracking-[0.02em]">
                     <Check className="w-5 h-5" style={{ color: project.accent }} />
                     Deliverables
                  </h3>
                  <ul className="flex flex-col gap-4">
                     {["Homepage Redesign", "Product Catalog", "Contact Form + API", "sitemap.xml", "robots.txt", "Structured Data (JSON-LD)"].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-sm text-white/70 font-light">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
                          {item}
                       </li>
                     ))}
                  </ul>
                </div>
             </div>
          ) : (
            <div className="p-8 sm:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full transition-all duration-500 group-hover:w-2" style={{ background: project.accent }} />
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
                <Activity className="w-6 h-6" style={{ color: project.accent }} />
                <span className={project.slug === 'traff-iq' ? "font-mono uppercase tracking-widest text-sm" : ""}>The Problem</span>
              </h3>
              <p className="text-base sm:text-lg text-white/60 leading-relaxed font-light">
                {project.problemStatement}
              </p>
            </div>
          )}
        </AnimatedSection>

        {/* SPENTA ENGINEERS: BEFORE VS AFTER */}
        {project.slug === 'spenta-engineers' && (
          <AnimatedSection className="mb-16 -mt-8">
            <h2 className={sectionHeadingClass}>Digital Transformation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Before */}
               <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between px-4 py-3 border border-white/10 rounded-t-2xl bg-[#1A1A1A]">
                    <span className="text-white/40 text-xs font-mono uppercase tracking-widest">Before (Static HTML)</span>
                 </div>
                 <div className="bg-[#E5E5E5] p-8 border border-white/10 rounded-b-2xl h-[400px] overflow-hidden flex flex-col gap-6 opacity-80 grayscale">
                    <h1 className="text-black font-serif text-4xl underline mb-2">Spenta Engineers</h1>
                    <div className="flex gap-6 border-b border-black/20 pb-4">
                       <span className="text-blue-700 underline font-serif">Home</span>
                       <span className="text-blue-700 underline font-serif">Products</span>
                       <span className="text-blue-700 underline font-serif">Contact</span>
                    </div>
                    <p className="text-black font-serif">Welcome to our website. We are manufacturers of engineering equipment and industrial supplies.</p>
                    <table className="w-full border-collapse border border-gray-400 mt-4">
                       <tbody>
                          <tr><td className="border border-gray-400 p-2 text-black font-serif">Product A - Industrial Valve</td></tr>
                          <tr><td className="border border-gray-400 p-2 text-black font-serif">Product B - Steel Fittings</td></tr>
                       </tbody>
                    </table>
                 </div>
               </div>
               {/* After */}
               <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-between px-4 py-3 border border-[#F5A623]/30 rounded-t-2xl bg-[#0A0A0A]">
                    <span className="text-[#F5A623] text-xs font-mono uppercase tracking-widest font-bold">After (Next.js)</span>
                 </div>
                 <div className="h-[400px] border border-white/5 rounded-b-2xl overflow-hidden relative shadow-2xl">
                    <Image src={project.gallery[0]} alt="After Transformation" fill className="object-cover object-top" />
                 </div>
               </div>
            </div>
          </AnimatedSection>
        )}

        {/* TRAFF-IQ METRICS SIDEBAR */}
        {project.slug === 'traff-iq' && (
          <AnimatedSection>
            <h2 className={sectionHeadingClass}>Live Metrics</h2>
            <div className="relative p-8 rounded-[2rem] bg-[#0A0A0A] border border-white/5 overflow-hidden flex flex-col sm:flex-row gap-8 justify-around items-center group shadow-2xl">
              {/* SVG Map Tile Background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:15px_15px]" />
              <svg className="absolute top-[-50%] right-[-20%] w-[150%] h-[200%] opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,50 L100,50 L100,0 M150,200 L150,100 L250,100 M300,50 L400,150 L350,250 M500,100 L600,200 L800,100" stroke={project.accent} strokeWidth="1" fill="none" />
                <path d="M50,150 L200,300 M250,0 L300,200 L450,250" stroke={project.accent} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              </svg>
              {project.highlights.map((h, i) => (
                <div key={i} className="flex flex-col items-center z-10 p-4 bg-black/50 backdrop-blur-md rounded-2xl border border-white/5 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]" style={{ color: project.accent }}>
                    {h.icon}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{h.label}</p>
                  <p className="text-xl font-mono text-white tracking-tight">{h.value}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* SKILLBUDDY UX LOOP */}
        {project.slug === 'skillbuddy' && (
          <AnimatedSection className="mb-8 mt-4">
            <h3 className="text-xl font-bold text-white mb-10 text-center tracking-tight">The AI Learning Loop</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 relative max-w-2xl mx-auto">
              <div className="hidden sm:block absolute top-[32px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent -translate-y-1/2 z-0" />

              {["Assess", "Generate", "Practice", "Track"].map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#8B5CF6]/30 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.15)] mb-4 transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] cursor-crosshair">
                    <span className="text-[#8B5CF6] font-mono text-xl">{i + 1}</span>
                  </div>
                  <p className="text-white/80 font-medium text-sm tracking-wide">{step}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Architecture & Decisions */}
        <AnimatedSection className="relative">
          {/* IDEA 4: TECH-STACK CODE BACKGROUND */}
          {project.codeSnippet && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] pointer-events-none -z-10 opacity-[0.05] sm:opacity-[0.08] mix-blend-screen overflow-hidden flex justify-center">
              <pre className="text-[10px] sm:text-[12px] md:text-[16px] font-mono whitespace-pre-wrap leading-[2] select-none text-left" style={{ color: project.accent }}>
                {project.codeSnippet}
              </pre>
            </div>
          )}

          <h2 className={sectionHeadingClass}>
            {project.slug === 'navastitva' ? "Engineering choices" : "Architecture & Design"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {project.designDecisions.map((decision, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors relative overflow-hidden">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: project.accent }}>
                  {decision.label}
                </h4>
                <p className="text-base text-white/80 leading-relaxed font-light relative z-10">{decision.value}</p>
                
                {/* CLIMATRIX DYNAMIC THEMING SWATCHES */}
                {project.slug === 'climatrix' && decision.label === 'Dynamic Theming' && (
                  <div className="mt-6 flex gap-2 w-full max-w-xs z-10 relative">
                     {[
                       {name: 'Clear', hex: '#3B82F6'},
                       {name: 'Rain', hex: '#64748B'},
                       {name: 'Snow', hex: '#E2E8F0'},
                       {name: 'Storm', hex: '#1E1B4B'}
                     ].map((swatch, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                           <div className="w-full h-8 rounded-md shadow-inner border border-white/10" style={{ backgroundColor: swatch.hex }} />
                           <span className="text-[9px] text-white/50 uppercase tracking-wider">{swatch.name}</span>
                        </div>
                     ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Layer Stack / Architecture Diagram */}
          {project.slug === 'traff-iq' ? (
            <div className="relative p-12 rounded-[2rem] bg-[#0A0A0A] border border-white/5 flex flex-col items-center gap-24 overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Frontend Node */}
              <div className="relative z-10 flex flex-col items-center p-6 bg-black/80 border border-[#3B82F6]/30 rounded-xl backdrop-blur-md min-w-[250px] shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-transform group-hover:-translate-y-2">
                <p className="text-[#3B82F6] font-mono text-[10px] tracking-widest uppercase mb-2">Client_Node</p>
                <p className="text-white font-bold tracking-wide">Frontend + WebSocket</p>
              </div>

              {/* Bidirectional Arrows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-full opacity-60 pointer-events-none">
                <div className="h-32 border-l border-dashed border-[#10B981]/50 relative flex justify-center">
                  <div className="absolute top-0 w-2 h-2 rounded-full bg-[#10B981] animate-[bounce_2s_infinite]" />
                  <div className="absolute top-1/2 -translate-y-1/2 bg-[#0A0A0A] px-2 text-[10px] text-[#10B981] font-mono rotate-90 whitespace-nowrap tracking-widest">DATA_STREAM</div>
                  <div className="absolute bottom-0 w-2 h-2 rounded-full bg-[#10B981] animate-[bounce_2s_infinite_1s]" />
                </div>
              </div>

              {/* Engine Node */}
              <div className="relative z-10 flex flex-col items-center p-6 bg-black/80 border border-[#FF6B35]/30 rounded-xl backdrop-blur-md min-w-[250px] shadow-[0_0_30px_rgba(255,107,53,0.15)] transition-transform group-hover:translate-y-2">
                <p className="text-[#FF6B35] font-mono text-[10px] tracking-widest uppercase mb-2">Inference_Core</p>
                <p className="text-white font-bold tracking-wide">Python Engine + YOLOv8 Map</p>
              </div>
            </div>
          ) : project.slug === 'skillbuddy' ? (
            <div className="relative p-12 rounded-[2rem] bg-[#0A0A0A] border border-white/5 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_70%)] pointer-events-none" />

              {/* React Node */}
              <div className="flex flex-col items-center p-6 bg-white/[0.02] border border-white/10 rounded-2xl w-48 z-10 hover:bg-white/[0.04] transition-all duration-500 hover:scale-105">
                <p className="text-white/50 text-[10px] uppercase tracking-widest mb-3">Frontend</p>
                <p className="text-white font-bold text-lg">React UI</p>
              </div>

              {/* Connecting lines - Desktop */}
              <div className="hidden md:flex flex-1 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent relative min-w-[50px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#8B5CF6] bg-[#0A0A0A] px-3 py-1 font-mono border border-[#8B5CF6]/30 rounded-full tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.2)]">REST_API</div>
              </div>

              {/* Gemini Core */}
              <div className="relative flex flex-col items-center p-8 bg-[#8B5CF6]/10 border border-[#8B5CF6]/50 rounded-full w-56 h-56 justify-center shadow-[0_0_50px_rgba(139,92,246,0.2)] z-10 cursor-crosshair transition-all duration-700 hover:scale-110 hover:bg-[#8B5CF6]/20">
                <div className="absolute inset-0 rounded-full border border-[#8B5CF6]/20 animate-[ping_3s_infinite]" />
                <Zap className="w-10 h-10 text-[#8B5CF6] mb-3 transition-transform duration-500" />
                <p className="text-white font-black text-2xl tracking-tighter">Gemini AI</p>
                <p className="text-white/50 text-[10px] uppercase tracking-widest mt-2">Intelligence Core</p>
              </div>

              {/* Connecting lines - Desktop */}
              <div className="hidden md:flex flex-1 h-px bg-gradient-to-r from-[#8B5CF6] via-transparent to-transparent relative min-w-[50px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#8B5CF6] bg-[#0A0A0A] px-3 py-1 font-mono border border-[#8B5CF6]/30 rounded-full tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.2)]">NoSQL</div>
              </div>

              {/* Backend Node */}
              <div className="flex flex-col items-center p-6 bg-white/[0.02] border border-white/10 rounded-2xl w-48 z-10 hover:bg-white/[0.04] transition-all duration-500 hover:scale-105">
                <p className="text-white/50 text-[10px] uppercase tracking-widest mb-3">Database</p>
                <p className="text-white font-bold text-lg">MongoDB</p>
              </div>
            </div>
          ) : project.slug === 'climatrix' ? (
             <div className="relative p-12 rounded-[2rem] bg-gradient-to-b from-[#0A192F] to-[#0A0A0A] border border-white/5 flex flex-col items-center gap-12 overflow-hidden shadow-2xl group">
               {/* Client Hooks Layer */}
               <div className="w-full max-w-xl p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md relative z-10 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                 <div className="absolute -top-3 left-6 px-3 py-1 bg-[#3B82F6] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]">Client Layer</div>
                 <div className="flex justify-center gap-4 flex-wrap">
                    <span className="px-4 py-2 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/30 font-mono text-sm text-white shadow-inner">useGeolocationWeather()</span>
                    <span className="px-4 py-2 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/30 font-mono text-sm text-white shadow-inner">useClock()</span>
                 </div>
               </div>
               
               {/* Arrow down */}
               <div className="h-16 w-px bg-gradient-to-b from-[#3B82F6]/50 to-transparent relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#3B82F6]/50 animate-[ping_2s_infinite]" />
               </div>

               {/* API Layer */}
               <div className="w-full max-w-xl p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md relative z-10 flex justify-center gap-8">
                 <div className="absolute -top-3 left-6 px-3 py-1 bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">External APIs</div>
                 <span className="text-white/70 font-bold tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/10">OpenWeatherMap</span>
                 <span className="text-white/70 font-bold tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/10">Geocoding API</span>
               </div>
             </div>
          ) : (
            <div className="flex flex-col gap-4">
              {project.architecture.layers.map((layer, i) => (
                <div key={i} className="flex items-center p-5 sm:p-6 rounded-2xl bg-black border border-white/5 gap-6 hover:border-white/10 transition-colors">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shrink-0 shadow-inner" style={{ background: `${layer.color}15`, color: layer.color, border: `1px solid ${layer.color}30` }}>
                    {layer.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{layer.name}</h4>
                    <p className="text-sm sm:text-base text-white/50">{layer.items.join("  •  ")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* Outcomes */}
        <AnimatedSection>
          <h2 className={sectionHeadingClass}>Outcomes</h2>
          <div className="flex flex-col gap-4 sm:gap-6">
            {project.outcomes.map((outcome, i) => (
              <div key={i} className="flex items-start gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/5">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-1 shadow-[0_0_20px_rgba(255,255,255,0.1)]" style={{ background: project.accent, color: "#000" }}>
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 stroke-[3]" />
                </div>
                <p className="text-base sm:text-xl text-white/80 leading-relaxed font-light">{outcome}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
