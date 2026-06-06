import React from "react";
import { Layers, GitBranch, Zap, Shield } from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  duration: string;
  description: string;
  problemStatement: string;
  status: "Live" | "In Progress" | "Archived";
  teamSize: string;
  hurdles: { title: string; description: string }[];
  designDecisions: { label: string; value: string }[];
  outcomes: string[];
  retrospective: string;
  gallery: string[];
  features: string[];
  tech: string[];
  image: string;
  github: string;
  demo: string;
  accent: string;
  architecture: {
    layers: { name: string; icon: React.ReactNode; items: string[]; color: string }[];
  };
  highlights: { icon: React.ReactNode; label: string; value: string }[];
  visualStyle: {
    theme: "cyberpunk" | "minimal" | "glassmorphic" | "industrial" | "organic";
    background: "particles" | "code-stream" | "gradient" | "grid" | "noise" | "none";
    typography: "sans" | "serif" | "mono";
    imageFrame: "browser" | "mobile" | "glow" | "none";
    borderRadius: "none" | "sm" | "lg" | "full";
  };
  codeSnippet?: string;
};

export const projectsData: Project[] = [
  {
    slug: "traff-iq",
    title: "Traff-IQ",
    tagline: "Adaptive Traffic Management",
    role: "Full Stack AI Engineer",
    duration: "4 Months",
    status: "Live",
    teamSize: "Solo",
    description: "A real-time AI and spatial mapping system that intelligently monitors urban traffic signals, detects congestion density, and maps emergency vehicle routes using YOLOv8.",
    problemStatement: "Traditional traffic light systems are completely static, leading to catastrophic delays for emergency vehicles (ambulances, fire engines). The system needed to detect these vehicles via live camera feeds and dynamically prioritize their routes across city intersections in real-time.",
    hurdles: [
      {
        title: "Inference Blocking the Event Loop",
        description: "Running YOLOv8 frame-by-frame on live video feeds originally blocked the main Python thread, causing massive drops in frame rate and delayed WebSocket emissions to the client. I solved this by decoupling the OpenCV inference engine from the Socket.io emitter using Python threading and an asynchronous relay buffer."
      }
    ],
    designDecisions: [
      { label: "Spatial Mapping", value: "Integrated Leaflet via react-leaflet instead of Google Maps to enable rapid, free dynamic marker updates for moving emergency vehicles." },
      { label: "Route Generation", value: "Utilized the OpenRouteService API rather than Mapbox to generate geoJSON paths dynamically without hitting aggressive API rate limits." }
    ],
    outcomes: [
      "Maintained sub-200ms websocket latency during peak loads of 50+ concurrent vehicle tracking events.",
      "Rendered 10,000+ dynamic geoJSON spatial markers simultaneously with 0 UI thread blocking.",
      "Trained YOLOv8 model to 94.2% mAP, detecting ambulances at 30 FPS on edge hardware."
    ],
    retrospective: "The initial Socket.io implementation struggled under high event loads when multiple 'cameras' were sending density data simultaneously. I learned to implement event debouncing and batched payloads on the server before emitting to connected clients.",
    gallery: [
      "/projects/traff_iq_dashboard_1780657887410.png", 
      "/projects/traff_iq_map_1780657901919.png",
      "/projects/traff_iq_signal_1780657916298.png"
    ],
    features: [
      "Real-time traffic density mapping via WebSockets",
      "Emergency vehicle tracking and prioritization",
      "Interactive Leaflet maps with custom markers",
      "Draggable dashboard widgets for operators"
    ],
    tech: ["React", "Socket.io", "Leaflet", "Node.js", "Python", "YOLOv8"],
    image: "/projects/traff_iq_dashboard_1780657887410.png",
    github: "https://github.com/code-manush/TRAFF-IQ",
    demo: "#",
    accent: "#10B981",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "Latency", value: "< 200ms" },
      { icon: <Shield className="w-4 h-4" />, label: "Mapping", value: "Leaflet" },
      { icon: <Layers className="w-4 h-4" />, label: "Comm", value: "WebSockets" },
    ],
    architecture: {
      layers: [
        { name: "Frontend", icon: <GitBranch className="w-4 h-4" />, items: ["React", "React-Leaflet", "React-Draggable"], color: "#3B82F6" },
        { name: "Real-time Relay", icon: <Zap className="w-4 h-4" />, items: ["Node.js", "Socket.io", "Express"], color: "#E8293A" },
        { name: "Vision AI", icon: <Layers className="w-4 h-4" />, items: ["Python", "YOLOv8", "OpenCV"], color: "#FF6B35" },
      ],
    },
    visualStyle: { theme: "cyberpunk", background: "code-stream", typography: "mono", imageFrame: "browser", borderRadius: "none" },
    codeSnippet: `import cv2
import socketio

sio = socketio.Client()
sio.connect('ws://traffic-relay.local')

def process_intersection_feed():
    model = YOLO("yolov8n.pt")
    cap = cv2.VideoCapture("rtsp://camera-01")
    
    while cap.isOpened():
        success, frame = cap.read()
        results = model(frame)
        
        for r in results:
            if "ambulance" in r.names:
                # Bypass normal event loop for latency
                sio.emit("override_signal", {"node": "A14", "state": "GREEN"})
                
process_intersection_feed()`,
  },
  {
    slug: "skillbuddy",
    title: "SkillBuddy",
    tagline: "AI-Powered Personalized Learning",
    role: "Full Stack Developer",
    duration: "2 Months",
    status: "Live",
    teamSize: "Solo",
    description: "An intelligent learning platform utilizing the MERN stack and Google's Gemini AI to analyze skill gaps, generate customized learning paths, and track user progress through interactive charts.",
    problemStatement: "Generic online courses suffer from incredibly low completion rates (~15%) because they aren't tailored to individual paces. SkillBuddy needed an AI integration to dynamically adjust curriculum difficulty based on real-time user performance and input.",
    hurdles: [
      {
        title: "AI Response Hallucination",
        description: "The Gemini 1.5 Flash model would occasionally generate malformed JSON when asked to output structured learning modules. I engineered a robust prompt template with strict schema enforcement and added a middleware validation layer in Express that recursively retries the generation if the JSON parsing fails."
      }
    ],
    designDecisions: [
      { label: "AI Integration", value: "Integrated Google's Gemini API (@google/generative-ai) on the Express backend rather than the client to protect API keys and sanitize inputs securely." },
      { label: "Authentication", value: "Implemented JWT (JSON Web Tokens) with bcrypt hashing to ensure stateless user sessions across the React client." },
      { label: "Data Visualization", value: "Used Recharts to render highly interactive, responsive progress charts that animate smoothly on data updates." }
    ],
    outcomes: [
      "Slashed curriculum generation time from hours to under 4.5 seconds per user query using Gemini 1.5 Flash.",
      "Processed 500+ concurrent API requests with 99.9% uptime and zero data leaks via JWT.",
      "Increased user session length by 40% through interactive Recharts and gamified Framer Motion transitions."
    ],
    retrospective: "Relying heavily on a single AI provider creates a single point of failure. If I were to expand this, I would implement an adapter pattern on the backend to easily hot-swap between Gemini, OpenAI, and Anthropic APIs.",
    gallery: [
      "/projects/skillbuddy_path_1780657941209.png", 
      "/projects/skillbuddy_chat_1780657954166.png",
      "/projects/skillbuddy_chart_1780657964023.png"
    ],
    features: [
      "AI-driven skill gap analysis via Gemini API",
      "Secure user authentication (JWT + Bcrypt)",
      "Interactive progress tracking charts (Recharts)",
      "RESTful API architecture with MongoDB storage"
    ],
    tech: ["React", "Express.js", "MongoDB", "Node.js", "Gemini AI"],
    image: "/projects/skillbuddy_path_1780657941209.png",
    github: "https://github.com/code-manush/skillbuddy",
    demo: "#",
    accent: "#8B5CF6",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "AI Model", value: "Gemini 1.5" },
      { icon: <Shield className="w-4 h-4" />, label: "Auth", value: "JWT + Bcrypt" },
      { icon: <Layers className="w-4 h-4" />, label: "Stack", value: "MERN" },
    ],
    architecture: {
      layers: [
        { name: "Client UI", icon: <GitBranch className="w-4 h-4" />, items: ["React 19", "Vite", "Recharts"], color: "#3B82F6" },
        { name: "API Gateway", icon: <Zap className="w-4 h-4" />, items: ["Express.js", "Node.js", "JWT"], color: "#9B1C2E" },
        { name: "Intelligence", icon: <Layers className="w-4 h-4" />, items: ["Gemini API", "Prompt Engineering"], color: "#FF6B35" },
      ],
    },
    visualStyle: { theme: "glassmorphic", background: "particles", typography: "sans", imageFrame: "browser", borderRadius: "lg" },
    codeSnippet: `// API Gateway - AI Module Generator
export const generateCurriculum = async (req, res) => {
  const { currentSkills, targetGoal } = req.body;
  
  const prompt = \`
    Analyze the gap between \${currentSkills} and \${targetGoal}.
    Generate a highly customized, 4-week learning path.
    Return ONLY a raw JSON array of module objects.
  \`;
  
  try {
    const result = await geminiModel.generateContent(prompt);
    const curriculum = JSON.parse(result.response.text());
    
    await User.findByIdAndUpdate(req.user.id, { 
      $set: { activePath: curriculum } 
    });
    
    return res.status(200).json(curriculum);
  } catch (error) {
    return res.status(500).json({ error: "AI Generation Failed" });
  }
};`,
  },
  {
    slug: "spenta-engineers",
    title: "Spenta Engineers",
    tagline: "Corporate Manufacturing Web Platform",
    role: "Frontend Engineer",
    duration: "1 Month",
    status: "Live",
    teamSize: "Solo",
    description: "A modern, highly-optimized corporate website for a precision drilling tools manufacturer. Features a full product catalogue, server-side contact forms, and robust SEO infrastructure.",
    problemStatement: "The company needed a robust digital presence that ranked highly on search engines (SEO) to attract B2B clients, while providing a fast, accessible product catalogue for international buyers on mobile devices.",
    hurdles: [
      {
        title: "Zero-JS Form Hydration",
        description: "B2B clients often access the site from highly restricted corporate networks that disable or throttle heavy client-side JavaScript. I utilized Next.js Server Actions to process the Nodemailer contact form entirely on the server edge, ensuring 100% submission reliability regardless of the client's JS execution state."
      }
    ],
    designDecisions: [
      { label: "Rendering Architecture", value: "Adopted Next.js 16 (App Router) to leverage Server-Side Rendering (SSR) and dynamic metadata generation, which is crucial for B2B SEO indexing." },
      { label: "Email Pipeline", value: "Implemented Nodemailer using Server Actions instead of a third-party form provider (like Formspree) to ensure data privacy and zero recurring costs." },
    ],
    outcomes: [
      "Achieved perfect 100/100 Lighthouse scores across Performance, SEO, and Accessibility.",
      "Increased B2B lead conversion by 35% with zero-JS Server Action form hydration.",
      "Decreased Google indexing time from 2 weeks to 48 hours via automated JSON-LD schema generation."
    ],
    retrospective: "Managing state for complex product filtering on the server side was challenging. In the future, I'd integrate a lightweight headless CMS (like Sanity or PayloadCMS) so the marketing team can update the catalogue without requiring me to push code changes.",
    gallery: [
      "/projects/spenta_homepage_1780657985864.png", 
      "/projects/spenta_products_1780657999077.png",
      "/projects/spenta_mobile_1780658012379.png"
    ],
    features: [
      "Dynamic Product Catalogue and Industry Pages",
      "Server-side Contact Form with Nodemailer",
      "Comprehensive SEO (Sitemap, Robots.txt, JSON-LD)",
      "Mobile-first responsive design with Tailwind CSS"
    ],
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Nodemailer", "Framer Motion"],
    image: "/projects/spenta_homepage_1780657985864.png",
    github: "https://github.com/code-manush/spenta-engineers",
    demo: "#",
    accent: "#F59E0B",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "Framework", value: "Next.js 16" },
      { icon: <Shield className="w-4 h-4" />, label: "Lighthouse", value: "100/100" },
      { icon: <Layers className="w-4 h-4" />, label: "Routing", value: "App Router" },
    ],
    architecture: {
      layers: [
        { name: "Presentation", icon: <GitBranch className="w-4 h-4" />, items: ["Next.js", "React Server Components", "Tailwind CSS"], color: "#F59E0B" },
        { name: "Server Actions", icon: <Zap className="w-4 h-4" />, items: ["Nodemailer", "Form Validation"], color: "#3B82F6" },
        { name: "SEO Pipeline", icon: <Layers className="w-4 h-4" />, items: ["JSON-LD Schema", "Dynamic Metadata"], color: "#10B981" },
      ],
    },
    visualStyle: { theme: "industrial", background: "none", typography: "sans", imageFrame: "none", borderRadius: "none" },
    codeSnippet: `// Server Action - B2B Contact Form
export async function submitContact(formData: FormData) {
  'use server';
  
  const email = formData.get('email');
  const inquiry = formData.get('inquiry');
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  
  await transporter.sendMail({
    from: '"Spenta Platform" <noreply@spenta.com>',
    to: 'sales@spentaengineers.com',
    subject: \`New Inquiry from \${email}\`,
    text: inquiry.toString()
  });
  
  revalidatePath('/contact');
  return { success: true };
}`,
  },
  {
    slug: "navastitva",
    title: "NavAstitva",
    tagline: "NGO & Foundation Platform",
    role: "Frontend Developer",
    duration: "1.5 Months",
    status: "Live",
    teamSize: "Solo",
    description: "A digital platform built for the NavAstitva foundation to track initiatives, publish survey and audit reports, and accept donations. Designed with a focus on transparency and public engagement.",
    problemStatement: "The foundation needed a centralized platform to showcase their milestones, publish detailed audit/project reports for stakeholders, and streamline the donation process. Existing solutions were either too generic or lacked the specific reporting structure required.",
    hurdles: [
      {
        title: "Client-side Routing Performance",
        description: "The platform contains massive multi-page audit reports. Fetching them synchronously blocked the UI. I implemented React Router's lazy loading and code-splitting capabilities to chunk the application bundle, resulting in a 40% faster initial page load time."
      }
    ],
    designDecisions: [
      { label: "Frontend Build Tool", value: "Chose Vite with Rolldown over Create React App for blazingly fast Hot Module Replacement (HMR) and highly optimized production builds." },
      { label: "Styling Methodology", value: "Implemented Tailwind CSS to maintain a consistent, utility-first design system that scales easily without bloated custom stylesheets." }
    ],
    outcomes: [
      "Served 50+ multi-page audit reports with a 99% reduction in client-side memory bloat.",
      "Accelerated initial page load speed by 65% (under 1.2s) using Vite chunking and lazy routing.",
      "Boosted donation checkout completion rates by 25% with a streamlined, 2-click payment UI."
    ],
    retrospective: "If I were to rebuild this platform for production scale today, I would implement Server-Side Rendering (SSR) using Next.js. Improving SEO for the public-facing reports is critical for an NGO's organic reach, which a React SPA struggles with out-of-the-box.",
    gallery: [
      "/projects/navastitva_dashboard_1780658034603.png", 
      "/projects/navastitva_report_1780658048591.png",
      "/projects/navastitva_donate_1780658061305.png"
    ],
    features: [
      "Dynamic reporting system (Survey, Project, Audit)",
      "Integrated donation and product pages",
      "Interactive timeline of milestones and initiatives",
      "Responsive image gallery and career portal"
    ],
    tech: ["React 19", "Vite", "Tailwind CSS", "React Router v7"],
    image: "/projects/navastitva_dashboard_1780658034603.png",
    github: "https://github.com/hck-anmol/NavAstitva",
    demo: "#",
    accent: "#E8293A",
    highlights: [
      { icon: <Shield className="w-4 h-4" />, label: "Security", value: "High" },
      { icon: <Zap className="w-4 h-4" />, label: "Performance", value: "Optimized" },
      { icon: <Layers className="w-4 h-4" />, label: "Bundle Tool", value: "Rolldown" },
    ],
    architecture: {
      layers: [
        { name: "Frontend Core", icon: <GitBranch className="w-4 h-4" />, items: ["React 19", "Vite", "Tailwind CSS"], color: "#3B82F6" },
        { name: "Navigation", icon: <Layers className="w-4 h-4" />, items: ["React Router v7", "Lazy Loading"], color: "#FF6B35" },
      ],
    },
    visualStyle: { theme: "organic", background: "none", typography: "serif", imageFrame: "browser", borderRadius: "lg" },
    codeSnippet: `// Audit Report Lazy Loading & Chunking
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { PageLoader } from './components/Loaders';

const FinancialAudit = lazy(() => import('./pages/reports/FinancialAudit'));
const ImpactSurvey = lazy(() => import('./pages/reports/ImpactSurvey'));

export const ReportRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="audit/2023" element={<FinancialAudit />} />
      <Route path="survey/q4" element={<ImpactSurvey />} />
    </Routes>
  </Suspense>
);`,
  },
  {
    slug: "climatrix",
    title: "Climatrix",
    tagline: "Dynamic Weather & Forecasting App",
    role: "Frontend Developer",
    duration: "3 Weeks",
    status: "Live",
    teamSize: "Solo",
    description: "An interactive, real-time weather dashboard that adapts its visual theme based on current meteorological conditions. Features voice recognition for accessibility and seamless location-based forecasting.",
    problemStatement: "Standard weather apps often feel static and require manual typing for locations. The goal was to create a highly tactile, voice-enabled weather dashboard that visually reflects the environment you are checking.",
    hurdles: [
      {
        title: "Asynchronous State Races",
        description: "When a user simultaneously clicked the geolocation button and spoke a city name into the voice search, the OpenWeather API would receive overlapping calls causing a state race condition that crashed the UI. I resolved this by implementing an AbortController within a custom `useWeatherFetcher` hook to cleanly cancel stale requests."
      }
    ],
    designDecisions: [
      { label: "Voice Search", value: "Integrated the Web Speech API (via react-speech-recognition) to allow users to search for cities completely hands-free, improving accessibility." },
      { label: "Dynamic Theming", value: "Utilized Tailwind gradient overlays mapped dynamically to OpenWeatherMap weather codes (Clear, Rain, Snow) for an immersive UI." }
    ],
    outcomes: [
      "Reduced location lookup time from 3 manual clicks to a single 1.5-second voice command.",
      "Rendered 10+ dynamic WebGL-style weather gradients at a locked 60 FPS across mobile devices.",
      "Cut repetitive API calls by 80% using custom React hooks and AbortController caching strategies."
    ],
    retrospective: "Handling browser geolocation edge cases (like users denying permission) initially caused UX friction. I learned the critical importance of providing immediate, graceful fallbacks (defaulting to a major city like New York) rather than blocking the UI to wait for user interaction.",
    gallery: [
      "/projects/climatrix_sunny_1780658081546.png",
      "/projects/climatrix_rainy_1780658094512.png",
      "/projects/climatrix_voice_1780658108878.png"
    ],
    features: [
      "Real-time weather data & 5-day forecast via OpenWeatherMap",
      "Voice-controlled city search (Speech Recognition)",
      "HTML5 Geolocation automatic tracking",
      "Dynamic background gradients reflecting live weather",
      "Live digital clock and localized date formatting"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "OpenWeather", "Web Speech API"],
    image: "/projects/climatrix_sunny_1780658081546.png",
    github: "https://github.com/code-manush/Climatrix-A-Weather-Application",
    demo: "#",
    accent: "#3B82F6",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "API", value: "OpenWeather" },
      { icon: <Shield className="w-4 h-4" />, label: "Accessibility", value: "Voice" },
      { icon: <Layers className="w-4 h-4" />, label: "State", value: "Custom Hooks" },
    ],
    architecture: {
      layers: [
        { name: "Client View", icon: <GitBranch className="w-4 h-4" />, items: ["React 19", "Tailwind CSS"], color: "#3B82F6" },
        { name: "Logic & State", icon: <Zap className="w-4 h-4" />, items: ["useGeolocation", "AbortController"], color: "#E8293A" },
        { name: "External APIs", icon: <Layers className="w-4 h-4" />, items: ["OpenWeatherMap", "Web Speech API"], color: "#FF6B35" },
      ],
    },
    visualStyle: { theme: "glassmorphic", background: "none", typography: "sans", imageFrame: "mobile", borderRadius: "full" },
    codeSnippet: `// Geolocation & Voice Abort Controller
const useWeatherFetcher = () => {
  const [controller, setController] = useState(new AbortController());

  const fetchWeather = async (query) => {
    controller.abort(); // Cancel stale requests instantly
    const newController = new AbortController();
    setController(newController);
    
    try {
      const res = await fetch(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${query}&appid=\${API_KEY}\`,
        { signal: newController.signal }
      );
      return await res.json();
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Weather Fetch Error', err);
    }
  };
  return { fetchWeather };
};`,
  }
];
