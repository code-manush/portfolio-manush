"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

const ParticleRevealMaterial = shaderMaterial(
  {
    uTime: 0,
    uHover: 0,
    uTexture: new THREE.Texture(),
  },
  // Vertex
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;

    void main() {
      // Grid dimensions (number of particles)
      float cols = 60.0; 
      float rows = 80.0;
      
      // Calculate cell size
      vec2 cellSize = vec2(1.0 / cols, 1.0 / rows);
      
      // Get the center UV of the current cell
      vec2 cellUv = floor(vUv * vec2(cols, rows)) / vec2(cols, rows) + cellSize * 0.5;
      
      // Sample the texture at the cell center (Particle Color)
      vec4 particleTex = texture2D(uTexture, cellUv);
      float gray = dot(particleTex.rgb, vec3(0.299, 0.587, 0.114));
      
      // Tint the particle red/white to match the cyberpunk aesthetic
      vec3 particleColor = mix(vec3(0.6, 0.05, 0.1), vec3(1.0, 1.0, 1.0), gray + 0.2);
      
      // Draw a circle in the cell
      vec2 localUv = fract(vUv * vec2(cols, rows)) - 0.5; // -0.5 to 0.5
      
      // Add a slight sine wave floating effect to the particles based on time
      float wave = sin(uTime * 3.0 + cellUv.x * 15.0 + cellUv.y * 15.0) * 0.15 * (1.0 - uHover);
      float dist = length(localUv + vec2(wave, wave));
      
      // The radius of the particle. On hover, it expands to cover the whole cell.
      // We also make brighter pixels slightly larger
      float radius = mix(0.15 + gray * 0.3, 1.0, uHover); 
      float alpha = smoothstep(radius, radius - 0.05, dist);
      
      // The real continuous image
      vec4 realTex = texture2D(uTexture, vUv);
      
      // Transition from Particle to Real Image
      vec3 finalColor = mix(particleColor, realTex.rgb, uHover);
      
      // When hovered, alpha should just be 1.0 everywhere.
      float finalAlpha = mix(alpha, realTex.a, uHover);
      
      // Discard empty space in particle mode to show background
      if (finalAlpha < 0.1) discard;
      
      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `
);

extend({ ParticleRevealMaterial });

function Scene({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<any>(null);
  const texture = useTexture(imageUrl);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        hovered ? 1 : 0,
        0.08
      );
    }
  });

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[2.5, 3.33, 1]} // Aspect ratio adjustment
    >
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <particleRevealMaterial ref={materialRef} uTexture={texture} transparent />
    </mesh>
  );
}

export default function ParticleImage({ imageUrl = "/IMG-20260209-WA0119.jpg" }: { imageUrl?: string }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl" style={{ boxShadow: "0 25px 50px -12px rgba(232, 41, 58, 0.25)" }}>
      {/* Outer Glow Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />
      
      <Canvas camera={{ position: [0, 0, 2] }} className="w-full h-full bg-[#0a0a0f]">
        <Scene imageUrl={imageUrl} />
      </Canvas>
      
      {/* Tooltip hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-white/40 pointer-events-none z-20">
        HOVER TO DECODE
      </div>
    </div>
  );
}
