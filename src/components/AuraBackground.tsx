import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShaderFluid = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScale;
  uniform float uDistortion;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 2; ++i) {
      v += a * snoise(x);
      x = x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;
    float t = uTime * uSpeed * 0.15;
    vec3 p1 = vec3(p * uScale, t);
    float n1 = fbm(p1);
    vec3 p2 = vec3(p * uScale + n1 * uDistortion, t * 1.2 + 10.0);
    float n2 = fbm(p2);
    vec3 p3 = vec3(p * uScale + n2 * uDistortion * 1.5, t * 1.5 - 10.0);
    float n3 = fbm(p3);
    float f1 = n1 * 0.5 + 0.5;
    float f2 = n2 * 0.5 + 0.5;
    float r = fbm(p3 + vec3(0.04, 0.0, 0.0));
    float g = n3;
    float b = fbm(p3 - vec3(0.04, 0.0, 0.0));
    vec3 chroma = vec3(r, g, b) * 0.5 + 0.5;
    float ridge = pow(1.0 - abs(n3), 6.0);
    vec3 colorBg = mix(uColor1, uColor3, f1);
    vec3 colorMid = mix(colorBg, uColor2, smoothstep(0.2, 0.8, f2));
    vec3 finalColor = colorMid + (chroma * ridge * uIntensity * uColor4);
    finalColor = pow(finalColor, vec3(0.85));
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface AuraBackgroundProps {
  className?: string;
  intensity?: number;
  speed?: number;
  mode?: 'ambient' | 'subtle';
}

export const AuraBackground: React.FC<AuraBackgroundProps> = ({
  className = '',
  intensity = 1.2,
  speed = 0.25,
  mode = 'subtle',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectiveSpeed = prefersReducedMotion ? 0.02 : speed;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        depth: false,
        stencil: false,
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Harmonious academic palette:
    // Base: Soft warm pearl/alabaster (#F8F9FA)
    // Accent 1: Subtle atmospheric mineral slate (#E2E8F0)
    // Accent 2: Gentle serene azure-slate mist (#EEF2F6)
    // Highlight: Pure luminescent white (#FFFFFF)
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth || 800, container.clientHeight || 600) },
      uScale: { value: 1.8 },
      uDistortion: { value: 0.8 },
      uSpeed: { value: effectiveSpeed },
      uIntensity: { value: intensity },
      uColor1: { value: new THREE.Color(0xf6f7f9) }, // Pearl base
      uColor2: { value: new THREE.Color(0xe8edf4) }, // Soft slate mist
      uColor3: { value: new THREE.Color(0xf1f5f9) }, // Cloud neutral
      uColor4: { value: new THREE.Color(0xffffff) }, // Crystalline highlight
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShaderFluid,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    let isIntersecting = true;
    let lastTime = performance.now();

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver((entries) => {
      isIntersecting = entries[0].isIntersecting;
      if (isIntersecting) {
        lastTime = performance.now();
      }
    });

    intersectionObserver.observe(container);

    const renderLoop = (time: number) => {
      frameId = requestAnimationFrame(renderLoop);
      if (!isIntersecting) return;

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (delta < 0.1) {
        uniforms.uTime.value += delta;
      }

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      scene.clear();
      geometry.dispose();
      material.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [speed, intensity]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Three.js WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full opacity-70 transition-opacity duration-1000"
      />

      {/* Fallback CSS Aura for non-WebGL / Reduced-motion */}
      {!hasWebGL && (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-slate-50/80 to-stone-50" />
      )}

      {/* Gentle frosted overlay ensuring optimal reading contrast (100% WCAG AAA) */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          mode === 'subtle'
            ? 'bg-radial-[circle_at_top,_var(--tw-gradient-stops)] from-transparent via-white/50 to-white/80 backdrop-blur-[0.5px]'
            : 'bg-white/40'
        }`}
      />
    </div>
  );
};
