"use client";

import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

// ── Particle representing one dot of the ASCII text ──
interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

const COLORS = ["#E8293A", "#ff4d5e", "#FF6B35", "#c0202f", "#ffffff"];

export default function ASCIIHeroCanvas({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let cssW = 0;
    let cssH = 0;

    // ── Sample text pixels from an offscreen canvas ──
    function sampleText(w: number, h: number): { x: number; y: number }[] {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const offCtx = off.getContext("2d")!;

      const fontSize = Math.min(w / 4.2, h / 2, 170);

      offCtx.fillStyle = "#fff";
      offCtx.font = `900 ${fontSize}px "Space Grotesk", "Inter", system-ui, sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText("MANUSH", w / 2, h / 2);

      const imageData = offCtx.getImageData(0, 0, w, h);
      const points: { x: number; y: number }[] = [];
      const gap = Math.max(3, Math.floor(fontSize / 30));

      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const i = (y * w + x) * 4;
          if (imageData.data[i + 3] > 128) {
            points.push({ x, y });
          }
        }
      }
      return points;
    }

    function initParticles(w: number, h: number) {
      const points = sampleText(w, h);
      particlesRef.current = points.map((p) => ({
        x: p.x + (Math.random() - 0.5) * 500,
        y: p.y + (Math.random() - 0.5) * 500,
        originX: p.x,
        originY: p.y,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.5 + 0.5,
      }));
    }

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      if (canvas.clientWidth === 0 || canvas.clientHeight === 0) return; // skip if not layed out
      cssW = canvas.clientWidth;
      cssH = canvas.clientHeight;
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(cssW, cssH);
    }

    // Use ResizeObserver to reliably get dimensions even after React layout changes
    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    // Also wait for fonts to load since offscreen canvas fillText needs it
    document.fonts.ready.then(() => {
      resize();
    });
    
    // Fallback resize just in case
    setTimeout(resize, 500);
    setTimeout(resize, 1500);

    // Mouse tracking relative to the canvas
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Register listeners AFTER declaring them to avoid block-scope errors
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // ── Single animation loop (never restarts) ──
    function animate() {
      ctx.clearRect(0, 0, cssW, cssH);

      const particles = particlesRef.current;
      if (particles.length === 0) {
        console.log(`[ASCIIHeroCanvas] Zero particles! cssW: ${cssW}, cssH: ${cssH}`);
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Log occasionally
      if (Math.random() < 0.01) {
        console.log(`[ASCIIHeroCanvas] Rendering ${particles.length} particles. Opacity factor: ${1 - Math.min(scrollProgress.get() * 2.5, 1) * 0.9}`);
      }

      const mouse = mouseRef.current;
      // Clamp scroll value to prevent accidental scattering if scroll is slightly > 0 at top
      let scrollVal = scrollProgress.get();
      if (scrollVal < 0.05) scrollVal = 0;
      const dissolve = Math.min(scrollVal * 2.5, 1);

      const MOUSE_RADIUS = 120;
      const MOUSE_FORCE = 7;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Target position
        let targetX = p.originX;
        let targetY = p.originY;

        if (dissolve > 0) {
          const cx = cssW / 2;
          const cy = cssH / 2;
          const dx = p.originX - cx;
          const dy = p.originY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const spread = dissolve * 450;
          targetX = p.originX + (dx / dist) * spread;
          targetY = p.originY + (dy / dist) * spread;
        }

        // Spring toward target
        const springK = dissolve > 0 ? 0.025 : 0.065;
        p.vx += (targetX - p.x) * springK;
        p.vy += (targetY - p.y) * springK;

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < MOUSE_RADIUS && mdist > 0) {
          const force =
            ((MOUSE_RADIUS - mdist) / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (mdx / mdist) * force;
          p.vy += (mdy / mdist) * force;
        }

        // Friction
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        // Draw
        const alpha = p.opacity * (1 - dissolve * 0.9);
        if (alpha <= 0.01) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // Subtle connection lines between nearby particles
      const LINK_DIST = 16;
      for (let i = 0; i < particles.length; i += 2) {
        // skip every other for perf
        const a = particles[i];
        for (let j = i + 2; j < particles.length; j += 2) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = dx * dx + dy * dy; // squared for perf
          if (dist < LINK_DIST * LINK_DIST) {
            const realDist = Math.sqrt(dist);
            const linkAlpha = (1 - realDist / LINK_DIST) * 0.07 * (1 - dissolve);
            if (linkAlpha > 0.005) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = "#E8293A";
              ctx.globalAlpha = linkAlpha;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (ro) ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
