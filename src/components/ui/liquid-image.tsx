"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

const LiquidShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uHover: 0,
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uHover;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Slight bulge on hover to make it feel 3D
      float dist = distance(uv, uMouse);
      float bulge = smoothstep(0.5, 0.0, dist) * uHover * 0.15;
      pos.z += bulge;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;

    void main() {
      vec2 uv = vUv;
      
      // Liquid distortion wave
      float dist = distance(uv, uMouse);
      float wave = sin(dist * 20.0 - uTime * 5.0) * 0.03 * uHover * smoothstep(0.5, 0.0, dist);
      
      vec2 distortedUv = uv + wave;
      
      // RGB Split on hover
      float r = texture2D(uTexture, distortedUv + vec2(0.015 * uHover, 0.0)).r;
      float g = texture2D(uTexture, distortedUv).g;
      float b = texture2D(uTexture, distortedUv - vec2(0.015 * uHover, 0.0)).b;
      
      vec4 tex = texture2D(uTexture, distortedUv);
      
      // Grayscale + red tint base (to match portfolio vibe)
      float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
      vec3 tinted = vec3(gray * 1.2, gray * 0.5, gray * 0.6); // slight red tint
      
      // Mix grayscale tint with RGB split glitch on hover
      vec3 finalColor = mix(tinted, vec3(r, g, b), uHover);
      
      gl_FragColor = vec4(finalColor, tex.a);
    }
  `
);

extend({ LiquidShaderMaterial });

function Scene({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<any>(null);
  const texture = useTexture(imageUrl);
  const [hovered, setHover] = useState(false);
  const [mouse, setMouse] = useState(new THREE.Vector2(0.5, 0.5));

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Smoothly animate hover uniform
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        hovered ? 1 : 0,
        0.1
      );
      materialRef.current.uMouse.lerp(mouse, 0.1);
    }
  });

  return (
    <mesh
      onPointerMove={(e) => setMouse(new THREE.Vector2(e.uv?.x || 0.5, e.uv?.y || 0.5))}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[2.5, 3.33, 1]} // Fill the camera view
    >
      <planeGeometry args={[1, 1, 32, 32]} /> {/* Subdivided geometry for z-bulge */}
      {/* @ts-ignore */}
      <liquidShaderMaterial ref={materialRef} uTexture={texture} transparent />
    </mesh>
  );
}

export default function LiquidImage({ imageUrl = "/IMG-20260209-WA0119.jpg" }: { imageUrl?: string }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl" style={{ boxShadow: "0 25px 50px -12px rgba(232, 41, 58, 0.25)" }}>
      {/* Outer Glow Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />

      <Canvas camera={{ position: [0, 0, 2] }} className="w-full h-full bg-[#0a0a0f]">
        <Scene imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
