"use client";

import { useRef, useEffect } from "react";

// GLSL vertex shader — pass-through
const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// GLSL fragment shader — plasma / lava lamp effect
const FRAG = `
  uniform float uTime;
  uniform vec2  uResolution;
  varying vec2  vUv;

  // smooth noise
  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),           hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p  = p * 2.0 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.12;

    // Layered warped noise for plasma
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(1.0, t)));
    vec2 r = vec2(fbm(uv + 1.5*q + vec2(1.7, 9.2) + 0.15*t),
                  fbm(uv + 1.5*q + vec2(8.3, 2.8) + 0.12*t));
    float f = fbm(uv + 1.7 * r);

    // Map to neon red palette — very subtle
    vec3 col = mix(
      vec3(0.03, 0.01, 0.01),   // near-black
      vec3(0.55, 0.07, 0.10),   // deep crimson
      clamp(f * f * 4.0, 0.0, 1.0)
    );
    col = mix(col, vec3(0.90, 0.12, 0.18), clamp(length(q) * 0.5, 0.0, 1.0));
    col = mix(col, vec3(1.00, 0.35, 0.18), clamp(length(r.x) * 0.6, 0.0, 1.0));

    // Keep it very dark and subtle
    col *= 0.18;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Compile shader helper
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,-1, 0, 0,   1,-1, 1, 0,  -1, 1, 0, 1,
       1,-1, 1, 0,   1, 1, 1, 1,  -1, 1, 0, 1,
    ]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "position");
    const uvs = gl.getAttribLocation(prog, "uv");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(uvs);
    gl.vertexAttribPointer(uvs, 2, gl.FLOAT, false, 16, 8);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes  = gl.getUniformLocation(prog, "uResolution");
    startRef.current = performance.now();

    const render = () => {
      const t = (performance.now() - startRef.current) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85, mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
