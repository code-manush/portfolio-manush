import React from "react";
import { Layers, GitBranch, Zap, Shield } from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problemStatement: string;
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
};

export const projectsData: Project[] = [
  {
    slug: "traff-iq",
    title: "Traff-IQ",
    tagline: "Adaptive Traffic Management",
    description: "A real-time AI and spatial mapping system that intelligently monitors urban traffic signals, detects congestion density, and maps emergency vehicle routes.",
    problemStatement: "Traditional traffic light systems are time-based and do not react to real-world congestion or emergency vehicles. Traff-IQ required a real-time data pipeline to adapt signals dynamically and visualize this on a live map.",
    designDecisions: [
      { label: "Real-time Communication", value: "Chose Socket.io over standard HTTP polling to ensure ultra-low latency updates between the traffic sensors and the central dashboard." },
      { label: "Spatial Mapping", value: "Implemented Leaflet and React-Leaflet to render interactive, performant maps capable of tracking moving emergency vehicles." },
      { label: "Modular Backend", value: "Split the backend architecture into specific domains (density calculation, emergency prioritization) to scale processing independently." }
    ],
    outcomes: [
      "Achieved sub-second latency for emergency vehicle tracking updates",
      "Successfully rendered dynamic spatial data using Leaflet without UI blocking",
      "Created an intuitive drag-and-drop dashboard for traffic operators"
    ],
    retrospective: "The initial Socket.io implementation struggled under high event loads when multiple 'cameras' were sending density data simultaneously. I learned to implement event debouncing and batching on the server before emitting to clients.",
    gallery: [
      "/traff-iq-mockup.png", 
      "/traff-iq-mockup.png"
    ],
    features: [
      "Real-time traffic density mapping via WebSockets",
      "Emergency vehicle tracking and prioritization",
      "Interactive Leaflet maps with custom markers",
      "Draggable dashboard widgets for operators"
    ],
    tech: ["React", "Socket.io", "Leaflet", "Node.js", "Python"],
    image: "/traff-iq-mockup.png",
    github: "https://github.com/code-manush/TRAFF-IQ",
    demo: "#",
    accent: "#10B981",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "Latency", value: "Real-time" },
      { icon: <Shield className="w-4 h-4" />, label: "Mapping", value: "Leaflet" },
      { icon: <Layers className="w-4 h-4" />, label: "Comm", value: "WebSockets" },
    ],
    architecture: {
      layers: [
        { name: "Frontend", icon: <GitBranch className="w-4 h-4" />, items: ["React", "React-Leaflet", "React-Draggable"], color: "#3B82F6" },
        { name: "Real-time", icon: <Zap className="w-4 h-4" />, items: ["Socket.io Client", "Event Batching"], color: "#E8293A" },
        { name: "Backend Modules", icon: <Layers className="w-4 h-4" />, items: ["Density Engine", "Emergency Router"], color: "#FF6B35" },
      ],
    },
  },
  {
    slug: "skillbuddy",
    title: "SkillBuddy",
    tagline: "AI-Powered Personalized Learning",
    description: "An intelligent learning platform utilizing the MERN stack and Google's Gemini AI to analyze skill gaps, generate customized learning paths, and track user progress through interactive charts.",
    problemStatement: "Generic online courses suffer from low completion rates because they aren't tailored to individual paces. SkillBuddy needed an AI integration to dynamically adjust curriculum difficulty based on real-time user performance.",
    designDecisions: [
      { label: "AI Integration", value: "Integrated Google's Gemini API (@google/generative-ai) on the Express backend to securely generate and stream personalized learning roadmaps." },
      { label: "Authentication", value: "Implemented JWT (JSON Web Tokens) with bcrypt hashing to ensure secure, stateless user sessions." },
      { label: "Data Visualization", value: "Used Recharts on the React client to render intuitive, responsive progress charts that keep users motivated." }
    ],
    outcomes: [
      "Successfully integrated LLM capabilities to generate on-the-fly curriculum",
      "Built a secure, scalable RESTful API with Express and MongoDB",
      "Created highly interactive frontend with Framer Motion and Typewriter effects"
    ],
    retrospective: "Relying heavily on a single AI provider (Gemini) creates a single point of failure. If I were to expand this, I would implement an adapter pattern on the backend to easily hot-swap between Gemini, OpenAI, and Anthropic APIs.",
    gallery: [
      "/skillbuddy-mockup.png", 
      "/skillbuddy-mockup.png"
    ],
    features: [
      "AI-driven skill gap analysis via Gemini API",
      "Secure user authentication (JWT + Bcrypt)",
      "Interactive progress tracking charts (Recharts)",
      "RESTful API architecture with MongoDB storage"
    ],
    tech: ["React", "Express.js", "MongoDB", "Node.js", "Gemini AI"],
    image: "/skillbuddy-mockup.png",
    github: "https://github.com/code-manush/skillbuddy",
    demo: "#",
    accent: "#8B5CF6",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "AI Model", value: "Gemini Pro" },
      { icon: <Shield className="w-4 h-4" />, label: "Auth", value: "JWT + Bcrypt" },
      { icon: <Layers className="w-4 h-4" />, label: "Stack", value: "MERN" },
    ],
    architecture: {
      layers: [
        { name: "Client", icon: <GitBranch className="w-4 h-4" />, items: ["React 19", "Vite", "Recharts"], color: "#3B82F6" },
        { name: "API Layer", icon: <Zap className="w-4 h-4" />, items: ["Express.js", "Node.js", "JWT Auth"], color: "#9B1C2E" },
        { name: "AI Service", icon: <Layers className="w-4 h-4" />, items: ["Gemini API", "Prompt Engineering"], color: "#FF6B35" },
        { name: "Database", icon: <Shield className="w-4 h-4" />, items: ["MongoDB", "Mongoose"], color: "#10B981" },
      ],
    },
  },
  {
    slug: "spenta-engineers",
    title: "Spenta Engineers",
    tagline: "Corporate Manufacturing Web Platform",
    description: "A modern, highly-optimized corporate website for a precision drilling tools manufacturer. Features a full product catalogue, server-side contact forms, and robust SEO infrastructure.",
    problemStatement: "The company needed a robust digital presence that ranked highly on search engines (SEO) to attract B2B clients, while providing a fast, accessible product catalogue for international buyers.",
    designDecisions: [
      { label: "Framework", value: "Adopted Next.js 16 (App Router) to leverage Server-Side Rendering (SSR) and dynamic metadata generation, which is crucial for B2B SEO." },
      { label: "Email Integration", value: "Implemented Nodemailer using Server Actions instead of a third-party form provider to ensure data privacy and reduce recurring costs." },
      { label: "SEO Strategy", value: "Programmatically generated sitemaps, robots.txt, and JSON-LD structured data (Organization/LocalBusiness) to maximize search visibility." }
    ],
    outcomes: [
      "Achieved a 100/100 Lighthouse score for SEO and Accessibility",
      "Streamlined B2B inquiries through a secure, server-side contact form",
      "Delivered a responsive, mobile-first catalogue experience"
    ],
    retrospective: "Managing state for complex product filtering on the server side was challenging. In the future, I'd integrate a lightweight headless CMS (like Sanity) so the client can update the catalogue without requiring code deployments.",
    gallery: [
      "/skillbuddy-mockup.png", 
      "/skillbuddy-mockup.png"
    ],
    features: [
      "Dynamic Product Catalogue and Industry Pages",
      "Server-side Contact Form with Nodemailer",
      "Comprehensive SEO (Sitemap, Robots.txt, JSON-LD)",
      "Mobile-first responsive design with Tailwind CSS"
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Nodemailer", "Framer Motion"],
    image: "/skillbuddy-mockup.png",
    github: "https://github.com/code-manush/spenta-engineers",
    demo: "#",
    accent: "#F59E0B",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "Framework", value: "Next.js 16" },
      { icon: <Shield className="w-4 h-4" />, label: "SEO", value: "100/100" },
      { icon: <Layers className="w-4 h-4" />, label: "Type", value: "B2B Platform" },
    ],
    architecture: {
      layers: [
        { name: "Frontend", icon: <GitBranch className="w-4 h-4" />, items: ["Next.js 16", "React 19", "Tailwind CSS"], color: "#F59E0B" },
        { name: "Backend Logic", icon: <Zap className="w-4 h-4" />, items: ["Server Actions", "Nodemailer"], color: "#3B82F6" },
        { name: "SEO Layer", icon: <Layers className="w-4 h-4" />, items: ["JSON-LD Schema", "Dynamic Metadata"], color: "#10B981" },
      ],
    },
  },
  {
    slug: "navastitva",
    title: "NavAstitva",
    tagline: "Comprehensive NGO & Foundation Platform",
    description: "A digital platform built for the NavAstitva foundation to track initiatives, publish survey and audit reports, and accept donations. Designed with a focus on transparency and public engagement.",
    problemStatement: "The foundation needed a centralized platform to showcase their milestones, publish detailed audit/project reports for stakeholders, and streamline the donation process. Existing solutions were either too generic or lacked the specific reporting structure required.",
    designDecisions: [
      { label: "Frontend Framework", value: "Chose React + Vite over Create React App for fast Hot Module Replacement (HMR) and optimized production builds." },
      { label: "Styling", value: "Implemented Tailwind CSS to maintain a consistent, utility-first design system that scales easily without bloated stylesheets." },
      { label: "Routing", value: "Utilized React Router DOM for seamless client-side transitions between nested reports and initiatives without jarring page reloads." }
    ],
    outcomes: [
      "Streamlined public access to survey, project, and audit reports",
      "Seamless client-side navigation reducing perceived page load times significantly",
      "Integrated modular donation flow and product showcases to boost user conversion"
    ],
    retrospective: "If I were to rebuild this platform for production scale today, I would implement Server-Side Rendering (SSR) using Next.js. Improving SEO for the public-facing reports and initiatives is critical for an NGO's organic reach, which SPA React struggles with out-of-the-box.",
    gallery: [
      "/navastitva-mockup.png", 
      "/navastitva-mockup.png"
    ],
    features: [
      "Dynamic reporting system (Survey, Project, Audit)",
      "Integrated donation and product pages",
      "Interactive timeline of milestones and initiatives",
      "Responsive image gallery and career portal"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "React Router"],
    image: "/navastitva-mockup.png",
    github: "https://github.com/hck-anmol/NavAstitva",
    demo: "#",
    accent: "#E8293A",
    highlights: [
      { icon: <Shield className="w-4 h-4" />, label: "Security", value: "High" },
      { icon: <Zap className="w-4 h-4" />, label: "Performance", value: "98/100" },
      { icon: <Layers className="w-4 h-4" />, label: "Pages", value: "10+" },
    ],
    architecture: {
      layers: [
        { name: "Frontend", icon: <GitBranch className="w-4 h-4" />, items: ["React 19", "Vite", "Tailwind CSS"], color: "#3B82F6" },
        { name: "Routing", icon: <Layers className="w-4 h-4" />, items: ["React Router v7", "Client-side Nav"], color: "#FF6B35" },
        { name: "Assets", icon: <Shield className="w-4 h-4" />, items: ["React Icons", "Optimized Images"], color: "#9B1C2E" },
      ],
    },
  },
  {
    slug: "climatrix",
    title: "Climatrix",
    tagline: "Dynamic Weather & Forecasting App",
    description: "An interactive, real-time weather dashboard that adapts its visual theme based on current meteorological conditions. Features voice recognition for accessibility and seamless location-based forecasting.",
    problemStatement: "Standard weather apps often feel static and require manual typing for locations. The goal was to create a highly tactile, voice-enabled weather dashboard that visually reflects the environment you are checking.",
    designDecisions: [
      { label: "Voice Search", value: "Integrated react-speech-recognition to allow users to search for cities completely hands-free, improving accessibility." },
      { label: "Dynamic Theming", value: "Utilized Tailwind gradient overlays mapped to OpenWeatherMap weather codes (Clear, Rain, Snow, etc.) for an immersive, adaptive UI." },
      { label: "Data Fetching", value: "Built custom React Hooks (useGeolocationWeather) to handle the complex state of browser geolocation permissions and API fallbacks seamlessly." }
    ],
    outcomes: [
      "Hands-free accessibility through speech-to-text location search",
      "Real-time dynamic UI that changes color palettes based on active weather states",
      "Zero-latency feeling with client-side caching of recent searches"
    ],
    retrospective: "Handling browser geolocation edge cases (like users denying permission) initially caused UX friction. I learned the critical importance of providing immediate, graceful fallbacks (defaulting to a major city like New York) rather than blocking the UI to wait for user interaction.",
    gallery: [
      "/climatrix-mockup.png",
      "/climatrix-mockup.png"
    ],
    features: [
      "Real-time weather data & 5-day forecast via OpenWeatherMap",
      "Voice-controlled city search (Speech Recognition)",
      "HTML5 Geolocation automatic tracking",
      "Dynamic background gradients reflecting live weather",
      "Live digital clock and localized date formatting"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "OpenWeather", "Speech Recognition"],
    image: "/climatrix-mockup.png",
    github: "https://github.com/code-manush/Climatrix-A-Weather-Application",
    demo: "#",
    accent: "#3B82F6",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "API", value: "OpenWeather" },
      { icon: <Shield className="w-4 h-4" />, label: "Voice", value: "Enabled" },
      { icon: <Layers className="w-4 h-4" />, label: "State", value: "Hooks" },
    ],
    architecture: {
      layers: [
        { name: "Client", icon: <GitBranch className="w-4 h-4" />, items: ["React 19", "Tailwind CSS"], color: "#3B82F6" },
        { name: "Logic Hooks", icon: <Zap className="w-4 h-4" />, items: ["useGeolocation", "useClock"], color: "#E8293A" },
        { name: "APIs", icon: <Layers className="w-4 h-4" />, items: ["OpenWeatherMap", "Web Speech API"], color: "#FF6B35" },
      ],
    },
  }
];
