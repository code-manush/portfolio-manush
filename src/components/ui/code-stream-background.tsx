"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CODE_SNIPPETS = `
// Core System Architecture
import { forwardRef, useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";

// AI Engineering: YOLOv8 Integration
function initTrafficModel(weights: string) {
  const model = new YOLOv8(weights);
  return model.optimize({ device: 'cuda', fp16: true });
}

export const NeuralCore = () => {
  const { data, error } = useSWR('/api/systems/metrics');
  
  if (!data) return <LoadingCore />;
  return <DataPipeline stream={data.stream} />;
};

// Full Stack: Backend Scaling
async function scaleBackend(req: Request) {
  const cluster = await db.clusters.findActive();
  cluster.allocate({ cpu: "8", memory: "16Gi" });
}

// Data Processing Pipeline
export function processStream(buffer: ArrayBuffer) {
  const view = new DataView(buffer);
  return parseTensorData(view);
}
`;

export default function CodeStreamBackground() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const splitLines = CODE_SNIPPETS.trim().split("\n");
    // Repeat enough to scroll indefinitely without stuttering
    const repeated = Array(20).fill(splitLines).flat();
    setLines(repeated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] select-none z-0 blur-[1px]">
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="font-mono text-[10px] sm:text-xs text-white leading-relaxed whitespace-pre w-full h-full p-8"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </motion.div>
    </div>
  );
}
