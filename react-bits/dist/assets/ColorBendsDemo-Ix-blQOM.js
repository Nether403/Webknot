import{r as n,j as r,B as $,F as Y,T as Z,d as J}from"./index-wsKSLPNH.js";import{T as K,P as Q,a as ee,C as re,b as ne}from"./PropTable-C4uPWs8h.js";import{C as te}from"./Customize-1m_ZNqR9.js";import{D as oe}from"./Dependencies-BHoMfJUj.js";import{P as u}from"./PreviewSlider-m1G_aiYP.js";import{B as ae}from"./BackgroundContent-CqU7Wlm2.js";import{V as O,S as se,O as le,P as ue,f as N,a as ie,M as ce,W as me,d as fe,i as pe}from"./three.module-0PRdiASR.js";import"./index-Bpz4cGEA.js";import"./PreviewSwitch-DqnF708j.js";const de=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import './ColorBends.css';\r
\r
const MAX_COLORS = 8;\r
\r
const frag = \`\r
#define MAX_COLORS \${MAX_COLORS}\r
uniform vec2 uCanvas;\r
uniform float uTime;\r
uniform float uSpeed;\r
uniform vec2 uRot;\r
uniform int uColorCount;\r
uniform vec3 uColors[MAX_COLORS];\r
uniform int uTransparent;\r
uniform float uScale;\r
uniform float uFrequency;\r
uniform float uWarpStrength;\r
uniform vec2 uPointer; // in NDC [-1,1]\r
uniform float uMouseInfluence;\r
uniform float uParallax;\r
uniform float uNoise;\r
varying vec2 vUv;\r
\r
void main() {\r
  float t = uTime * uSpeed;\r
  vec2 p = vUv * 2.0 - 1.0;\r
  p += uPointer * uParallax * 0.1;\r
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);\r
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);\r
  q /= max(uScale, 0.0001);\r
  q /= 0.5 + 0.2 * dot(q, q);\r
  q += 0.2 * cos(t) - 7.56;\r
  vec2 toward = (uPointer - rp);\r
  q += toward * uMouseInfluence * 0.2;\r
\r
    vec3 col = vec3(0.0);\r
    float a = 1.0;\r
\r
    if (uColorCount > 0) {\r
      vec2 s = q;\r
      vec3 sumCol = vec3(0.0);\r
      float cover = 0.0;\r
      for (int i = 0; i < MAX_COLORS; ++i) {\r
            if (i >= uColorCount) break;\r
            s -= 0.01;\r
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\r
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);\r
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);\r
            float kMix = pow(kBelow, 0.3); // strong response across 0..1\r
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // allow >1 to amplify displacement\r
            vec2 disp = (r - s) * kBelow;\r
            vec2 warped = s + disp * gain;\r
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);\r
            float m = mix(m0, m1, kMix);\r
            float w = 1.0 - exp(-6.0 / exp(6.0 * m));\r
            sumCol += uColors[i] * w;\r
            cover = max(cover, w);\r
      }\r
      col = clamp(sumCol, 0.0, 1.0);\r
      a = uTransparent > 0 ? cover : 1.0;\r
    } else {\r
        vec2 s = q;\r
        for (int k = 0; k < 3; ++k) {\r
            s -= 0.01;\r
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\r
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);\r
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);\r
            float kMix = pow(kBelow, 0.3);\r
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);\r
            vec2 disp = (r - s) * kBelow;\r
            vec2 warped = s + disp * gain;\r
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);\r
            float m = mix(m0, m1, kMix);\r
            col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));\r
        }\r
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;\r
    }\r
\r
    if (uNoise > 0.0001) {\r
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);\r
      col += (n - 0.5) * uNoise;\r
      col = clamp(col, 0.0, 1.0);\r
    }\r
\r
    vec3 rgb = (uTransparent > 0) ? col * a : col;\r
    gl_FragColor = vec4(rgb, a);\r
}\r
\`;\r
\r
const vert = \`\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
export default function ColorBends({\r
  className,\r
  style,\r
  rotation = 45,\r
  speed = 0.2,\r
  colors = [],\r
  transparent = true,\r
  autoRotate = 0,\r
  scale = 1,\r
  frequency = 1,\r
  warpStrength = 1,\r
  mouseInfluence = 1,\r
  parallax = 0.5,\r
  noise = 0.1\r
}) {\r
  const containerRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const rafRef = useRef(null);\r
  const materialRef = useRef(null);\r
  const resizeObserverRef = useRef(null);\r
  const rotationRef = useRef(rotation);\r
  const autoRotateRef = useRef(autoRotate);\r
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));\r
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));\r
  const pointerSmoothRef = useRef(8);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geometry = new THREE.PlaneGeometry(2, 2);\r
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));\r
    const material = new THREE.ShaderMaterial({\r
      vertexShader: vert,\r
      fragmentShader: frag,\r
      uniforms: {\r
        uCanvas: { value: new THREE.Vector2(1, 1) },\r
        uTime: { value: 0 },\r
        uSpeed: { value: speed },\r
        uRot: { value: new THREE.Vector2(1, 0) },\r
        uColorCount: { value: 0 },\r
        uColors: { value: uColorsArray },\r
        uTransparent: { value: transparent ? 1 : 0 },\r
        uScale: { value: scale },\r
        uFrequency: { value: frequency },\r
        uWarpStrength: { value: warpStrength },\r
        uPointer: { value: new THREE.Vector2(0, 0) },\r
        uMouseInfluence: { value: mouseInfluence },\r
        uParallax: { value: parallax },\r
        uNoise: { value: noise }\r
      },\r
      premultipliedAlpha: true,\r
      transparent: true\r
    });\r
    materialRef.current = material;\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    scene.add(mesh);\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      powerPreference: 'high-performance',\r
      alpha: true\r
    });\r
    rendererRef.current = renderer;\r
    renderer.outputColorSpace = THREE.SRGBColorSpace;\r
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r
    renderer.setClearColor(0x000000, transparent ? 0 : 1);\r
    renderer.domElement.style.width = '100%';\r
    renderer.domElement.style.height = '100%';\r
    renderer.domElement.style.display = 'block';\r
    container.appendChild(renderer.domElement);\r
\r
    const clock = new THREE.Clock();\r
\r
    const handleResize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h, false);\r
      material.uniforms.uCanvas.value.set(w, h);\r
    };\r
\r
    handleResize();\r
\r
    if ('ResizeObserver' in window) {\r
      const ro = new ResizeObserver(handleResize);\r
      ro.observe(container);\r
      resizeObserverRef.current = ro;\r
    } else {\r
      window.addEventListener('resize', handleResize);\r
    }\r
\r
    const loop = () => {\r
      const dt = clock.getDelta();\r
      const elapsed = clock.elapsedTime;\r
      material.uniforms.uTime.value = elapsed;\r
\r
      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;\r
      const rad = (deg * Math.PI) / 180;\r
      const c = Math.cos(rad);\r
      const s = Math.sin(rad);\r
      material.uniforms.uRot.value.set(c, s);\r
\r
      const cur = pointerCurrentRef.current;\r
      const tgt = pointerTargetRef.current;\r
      const amt = Math.min(1, dt * pointerSmoothRef.current);\r
      cur.lerp(tgt, amt);\r
      material.uniforms.uPointer.value.copy(cur);\r
      renderer.render(scene, camera);\r
      rafRef.current = requestAnimationFrame(loop);\r
    };\r
    rafRef.current = requestAnimationFrame(loop);\r
\r
    return () => {\r
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);\r
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();\r
      else window.removeEventListener('resize', handleResize);\r
      geometry.dispose();\r
      material.dispose();\r
      renderer.dispose();\r
      if (renderer.domElement && renderer.domElement.parentElement === container) {\r
        container.removeChild(renderer.domElement);\r
      }\r
    };\r
  }, [frequency, mouseInfluence, noise, parallax, scale, speed, transparent, warpStrength]);\r
\r
  useEffect(() => {\r
    const material = materialRef.current;\r
    const renderer = rendererRef.current;\r
    if (!material) return;\r
\r
    rotationRef.current = rotation;\r
    autoRotateRef.current = autoRotate;\r
    material.uniforms.uSpeed.value = speed;\r
    material.uniforms.uScale.value = scale;\r
    material.uniforms.uFrequency.value = frequency;\r
    material.uniforms.uWarpStrength.value = warpStrength;\r
    material.uniforms.uMouseInfluence.value = mouseInfluence;\r
    material.uniforms.uParallax.value = parallax;\r
    material.uniforms.uNoise.value = noise;\r
\r
    const toVec3 = hex => {\r
      const h = hex.replace('#', '').trim();\r
      const v =\r
        h.length === 3\r
          ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]\r
          : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];\r
      return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);\r
    };\r
\r
    const arr = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);\r
    for (let i = 0; i < MAX_COLORS; i++) {\r
      const vec = material.uniforms.uColors.value[i];\r
      if (i < arr.length) vec.copy(arr[i]);\r
      else vec.set(0, 0, 0);\r
    }\r
    material.uniforms.uColorCount.value = arr.length;\r
\r
    material.uniforms.uTransparent.value = transparent ? 1 : 0;\r
    if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);\r
  }, [\r
    rotation,\r
    autoRotate,\r
    speed,\r
    scale,\r
    frequency,\r
    warpStrength,\r
    mouseInfluence,\r
    parallax,\r
    noise,\r
    colors,\r
    transparent\r
  ]);\r
\r
  useEffect(() => {\r
    const material = materialRef.current;\r
    const container = containerRef.current;\r
    if (!material || !container) return;\r
\r
    const handlePointerMove = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;\r
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);\r
      pointerTargetRef.current.set(x, y);\r
    };\r
\r
    container.addEventListener('pointermove', handlePointerMove);\r
    return () => {\r
      container.removeEventListener('pointermove', handlePointerMove);\r
    };\r
  }, []);\r
\r
  return <div ref={containerRef} className={\`color-bends-container \${className}\`} style={style} />;\r
}\r
`,ve=`.color-bends-container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
}\r
`,Re=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
\r
const MAX_COLORS = 8;\r
\r
const frag = \`\r
#define MAX_COLORS \${MAX_COLORS}\r
uniform vec2 uCanvas;\r
uniform float uTime;\r
uniform float uSpeed;\r
uniform vec2 uRot;\r
uniform int uColorCount;\r
uniform vec3 uColors[MAX_COLORS];\r
uniform int uTransparent;\r
uniform float uScale;\r
uniform float uFrequency;\r
uniform float uWarpStrength;\r
uniform vec2 uPointer; // in NDC [-1,1]\r
uniform float uMouseInfluence;\r
uniform float uParallax;\r
uniform float uNoise;\r
varying vec2 vUv;\r
\r
void main() {\r
  float t = uTime * uSpeed;\r
  vec2 p = vUv * 2.0 - 1.0;\r
  p += uPointer * uParallax * 0.1;\r
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);\r
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);\r
  q /= max(uScale, 0.0001);\r
  q /= 0.5 + 0.2 * dot(q, q);\r
  q += 0.2 * cos(t) - 7.56;\r
  vec2 toward = (uPointer - rp);\r
  q += toward * uMouseInfluence * 0.2;\r
\r
    vec3 col = vec3(0.0);\r
    float a = 1.0;\r
\r
    if (uColorCount > 0) {\r
      vec2 s = q;\r
      vec3 sumCol = vec3(0.0);\r
      float cover = 0.0;\r
      for (int i = 0; i < MAX_COLORS; ++i) {\r
            if (i >= uColorCount) break;\r
            s -= 0.01;\r
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\r
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);\r
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);\r
            float kMix = pow(kBelow, 0.3); // strong response across 0..1\r
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // allow >1 to amplify displacement\r
            vec2 disp = (r - s) * kBelow;\r
            vec2 warped = s + disp * gain;\r
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);\r
            float m = mix(m0, m1, kMix);\r
            float w = 1.0 - exp(-6.0 / exp(6.0 * m));\r
            sumCol += uColors[i] * w;\r
            cover = max(cover, w);\r
      }\r
      col = clamp(sumCol, 0.0, 1.0);\r
      a = uTransparent > 0 ? cover : 1.0;\r
    } else {\r
        vec2 s = q;\r
        for (int k = 0; k < 3; ++k) {\r
            s -= 0.01;\r
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\r
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);\r
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);\r
            float kMix = pow(kBelow, 0.3);\r
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);\r
            vec2 disp = (r - s) * kBelow;\r
            vec2 warped = s + disp * gain;\r
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);\r
            float m = mix(m0, m1, kMix);\r
            col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));\r
        }\r
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;\r
    }\r
\r
    if (uNoise > 0.0001) {\r
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);\r
      col += (n - 0.5) * uNoise;\r
      col = clamp(col, 0.0, 1.0);\r
    }\r
\r
    vec3 rgb = (uTransparent > 0) ? col * a : col;\r
    gl_FragColor = vec4(rgb, a);\r
}\r
\`;\r
\r
const vert = \`\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
export default function ColorBends({\r
  className,\r
  style,\r
  rotation = 45,\r
  speed = 0.2,\r
  colors = [],\r
  transparent = true,\r
  autoRotate = 0,\r
  scale = 1,\r
  frequency = 1,\r
  warpStrength = 1,\r
  mouseInfluence = 1,\r
  parallax = 0.5,\r
  noise = 0.1\r
}) {\r
  const containerRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const rafRef = useRef(null);\r
  const materialRef = useRef(null);\r
  const resizeObserverRef = useRef(null);\r
  const rotationRef = useRef(rotation);\r
  const autoRotateRef = useRef(autoRotate);\r
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));\r
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));\r
  const pointerSmoothRef = useRef(8);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geometry = new THREE.PlaneGeometry(2, 2);\r
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));\r
    const material = new THREE.ShaderMaterial({\r
      vertexShader: vert,\r
      fragmentShader: frag,\r
      uniforms: {\r
        uCanvas: { value: new THREE.Vector2(1, 1) },\r
        uTime: { value: 0 },\r
        uSpeed: { value: speed },\r
        uRot: { value: new THREE.Vector2(1, 0) },\r
        uColorCount: { value: 0 },\r
        uColors: { value: uColorsArray },\r
        uTransparent: { value: transparent ? 1 : 0 },\r
        uScale: { value: scale },\r
        uFrequency: { value: frequency },\r
        uWarpStrength: { value: warpStrength },\r
        uPointer: { value: new THREE.Vector2(0, 0) },\r
        uMouseInfluence: { value: mouseInfluence },\r
        uParallax: { value: parallax },\r
        uNoise: { value: noise }\r
      },\r
      premultipliedAlpha: true,\r
      transparent: true\r
    });\r
    materialRef.current = material;\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    scene.add(mesh);\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      powerPreference: 'high-performance',\r
      alpha: true\r
    });\r
    rendererRef.current = renderer;\r
    // Three r152+ uses outputColorSpace and SRGBColorSpace\r
    renderer.outputColorSpace = THREE.SRGBColorSpace;\r
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r
    renderer.setClearColor(0x000000, transparent ? 0 : 1);\r
    renderer.domElement.style.width = '100%';\r
    renderer.domElement.style.height = '100%';\r
    renderer.domElement.style.display = 'block';\r
    container.appendChild(renderer.domElement);\r
\r
    const clock = new THREE.Clock();\r
\r
    const handleResize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h, false);\r
      material.uniforms.uCanvas.value.set(w, h);\r
    };\r
\r
    handleResize();\r
\r
    if ('ResizeObserver' in window) {\r
      const ro = new ResizeObserver(handleResize);\r
      ro.observe(container);\r
      resizeObserverRef.current = ro;\r
    } else {\r
      window.addEventListener('resize', handleResize);\r
    }\r
\r
    const loop = () => {\r
      const dt = clock.getDelta();\r
      const elapsed = clock.elapsedTime;\r
      material.uniforms.uTime.value = elapsed;\r
\r
      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;\r
      const rad = (deg * Math.PI) / 180;\r
      const c = Math.cos(rad);\r
      const s = Math.sin(rad);\r
      material.uniforms.uRot.value.set(c, s);\r
\r
      const cur = pointerCurrentRef.current;\r
      const tgt = pointerTargetRef.current;\r
      const amt = Math.min(1, dt * pointerSmoothRef.current);\r
      cur.lerp(tgt, amt);\r
      material.uniforms.uPointer.value.copy(cur);\r
      renderer.render(scene, camera);\r
      rafRef.current = requestAnimationFrame(loop);\r
    };\r
    rafRef.current = requestAnimationFrame(loop);\r
\r
    return () => {\r
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);\r
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();\r
      else window.removeEventListener('resize', handleResize);\r
      geometry.dispose();\r
      material.dispose();\r
      renderer.dispose();\r
      if (renderer.domElement && renderer.domElement.parentElement === container) {\r
        container.removeChild(renderer.domElement);\r
      }\r
    };\r
  }, [frequency, mouseInfluence, noise, parallax, scale, speed, transparent, warpStrength]);\r
\r
  useEffect(() => {\r
    const material = materialRef.current;\r
    const renderer = rendererRef.current;\r
    if (!material) return;\r
\r
    rotationRef.current = rotation;\r
    autoRotateRef.current = autoRotate;\r
    material.uniforms.uSpeed.value = speed;\r
    material.uniforms.uScale.value = scale;\r
    material.uniforms.uFrequency.value = frequency;\r
    material.uniforms.uWarpStrength.value = warpStrength;\r
    material.uniforms.uMouseInfluence.value = mouseInfluence;\r
    material.uniforms.uParallax.value = parallax;\r
    material.uniforms.uNoise.value = noise;\r
\r
    const toVec3 = hex => {\r
      const h = hex.replace('#', '').trim();\r
      const v =\r
        h.length === 3\r
          ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]\r
          : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];\r
      return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);\r
    };\r
\r
    const arr = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);\r
    for (let i = 0; i < MAX_COLORS; i++) {\r
      const vec = material.uniforms.uColors.value[i];\r
      if (i < arr.length) vec.copy(arr[i]);\r
      else vec.set(0, 0, 0);\r
    }\r
    material.uniforms.uColorCount.value = arr.length;\r
\r
    material.uniforms.uTransparent.value = transparent ? 1 : 0;\r
    if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);\r
  }, [\r
    rotation,\r
    autoRotate,\r
    speed,\r
    scale,\r
    frequency,\r
    warpStrength,\r
    mouseInfluence,\r
    parallax,\r
    noise,\r
    colors,\r
    transparent\r
  ]);\r
\r
  useEffect(() => {\r
    const material = materialRef.current;\r
    const container = containerRef.current;\r
    if (!material || !container) return;\r
\r
    const handlePointerMove = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;\r
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);\r
      pointerTargetRef.current.set(x, y);\r
    };\r
\r
    container.addEventListener('pointermove', handlePointerMove);\r
    return () => {\r
      container.removeEventListener('pointermove', handlePointerMove);\r
    };\r
  }, []);\r
\r
  return <div ref={containerRef} className={\`w-full h-full relative overflow-hidden \${className}\`} style={style} />;\r
}\r
`,he=`import React, { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import './ColorBends.css';\r
\r
type ColorBendsProps = {\r
  className?: string;\r
  style?: React.CSSProperties;\r
  rotation?: number;\r
  speed?: number;\r
  colors?: string[];\r
  transparent?: boolean;\r
  autoRotate?: number;\r
  scale?: number;\r
  frequency?: number;\r
  warpStrength?: number;\r
  mouseInfluence?: number;\r
  parallax?: number;\r
  noise?: number;\r
};\r
\r
const MAX_COLORS = 8 as const;\r
\r
const frag = \`\r
#define MAX_COLORS \${MAX_COLORS}\r
uniform vec2 uCanvas;\r
uniform float uTime;\r
uniform float uSpeed;\r
uniform vec2 uRot;\r
uniform int uColorCount;\r
uniform vec3 uColors[MAX_COLORS];\r
uniform int uTransparent;\r
uniform float uScale;\r
uniform float uFrequency;\r
uniform float uWarpStrength;\r
uniform vec2 uPointer; // in NDC [-1,1]\r
uniform float uMouseInfluence;\r
uniform float uParallax;\r
uniform float uNoise;\r
varying vec2 vUv;\r
\r
void main() {\r
  float t = uTime * uSpeed;\r
  vec2 p = vUv * 2.0 - 1.0;\r
  p += uPointer * uParallax * 0.1;\r
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);\r
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);\r
  q /= max(uScale, 0.0001);\r
  q /= 0.5 + 0.2 * dot(q, q);\r
  q += 0.2 * cos(t) - 7.56;\r
  vec2 toward = (uPointer - rp);\r
  q += toward * uMouseInfluence * 0.2;\r
\r
    vec3 col = vec3(0.0);\r
    float a = 1.0;\r
\r
    if (uColorCount > 0) {\r
      vec2 s = q;\r
      vec3 sumCol = vec3(0.0);\r
      float cover = 0.0;\r
      for (int i = 0; i < MAX_COLORS; ++i) {\r
            if (i >= uColorCount) break;\r
            s -= 0.01;\r
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\r
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);\r
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);\r
            float kMix = pow(kBelow, 0.3); // strong response across 0..1\r
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // allow >1 to amplify displacement\r
            vec2 disp = (r - s) * kBelow;\r
            vec2 warped = s + disp * gain;\r
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);\r
            float m = mix(m0, m1, kMix);\r
            float w = 1.0 - exp(-6.0 / exp(6.0 * m));\r
            sumCol += uColors[i] * w;\r
            cover = max(cover, w);\r
      }\r
      col = clamp(sumCol, 0.0, 1.0);\r
      a = uTransparent > 0 ? cover : 1.0;\r
    } else {\r
        vec2 s = q;\r
        for (int k = 0; k < 3; ++k) {\r
            s -= 0.01;\r
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\r
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);\r
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);\r
            float kMix = pow(kBelow, 0.3);\r
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);\r
            vec2 disp = (r - s) * kBelow;\r
            vec2 warped = s + disp * gain;\r
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);\r
            float m = mix(m0, m1, kMix);\r
            col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));\r
        }\r
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;\r
    }\r
\r
    if (uNoise > 0.0001) {\r
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);\r
      col += (n - 0.5) * uNoise;\r
      col = clamp(col, 0.0, 1.0);\r
    }\r
\r
    vec3 rgb = (uTransparent > 0) ? col * a : col;\r
    gl_FragColor = vec4(rgb, a);\r
}\r
\`;\r
\r
const vert = \`\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
export default function ColorBends({\r
  className,\r
  style,\r
  rotation = 45,\r
  speed = 0.2,\r
  colors = [],\r
  transparent = true,\r
  autoRotate = 0,\r
  scale = 1,\r
  frequency = 1,\r
  warpStrength = 1,\r
  mouseInfluence = 1,\r
  parallax = 0.5,\r
  noise = 0.1\r
}: ColorBendsProps) {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);\r
  const rafRef = useRef<number | null>(null);\r
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);\r
  const resizeObserverRef = useRef<ResizeObserver | null>(null);\r
  const rotationRef = useRef<number>(rotation);\r
  const autoRotateRef = useRef<number>(autoRotate);\r
  const pointerTargetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));\r
  const pointerCurrentRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));\r
  const pointerSmoothRef = useRef<number>(8);\r
\r
  useEffect(() => {\r
    const container = containerRef.current!;\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geometry = new THREE.PlaneGeometry(2, 2);\r
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));\r
    const material = new THREE.ShaderMaterial({\r
      vertexShader: vert,\r
      fragmentShader: frag,\r
      uniforms: {\r
        uCanvas: { value: new THREE.Vector2(1, 1) },\r
        uTime: { value: 0 },\r
        uSpeed: { value: speed },\r
        uRot: { value: new THREE.Vector2(1, 0) },\r
        uColorCount: { value: 0 },\r
        uColors: { value: uColorsArray },\r
        uTransparent: { value: transparent ? 1 : 0 },\r
        uScale: { value: scale },\r
        uFrequency: { value: frequency },\r
        uWarpStrength: { value: warpStrength },\r
        uPointer: { value: new THREE.Vector2(0, 0) },\r
        uMouseInfluence: { value: mouseInfluence },\r
        uParallax: { value: parallax },\r
        uNoise: { value: noise }\r
      },\r
      premultipliedAlpha: true,\r
      transparent: true\r
    });\r
    materialRef.current = material;\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    scene.add(mesh);\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      powerPreference: 'high-performance',\r
      alpha: true\r
    });\r
    rendererRef.current = renderer;\r
    (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;\r
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r
    renderer.setClearColor(0x000000, transparent ? 0 : 1);\r
    renderer.domElement.style.width = '100%';\r
    renderer.domElement.style.height = '100%';\r
    renderer.domElement.style.display = 'block';\r
    container.appendChild(renderer.domElement);\r
\r
    const clock = new THREE.Clock();\r
\r
    const handleResize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h, false);\r
      (material.uniforms.uCanvas.value as THREE.Vector2).set(w, h);\r
    };\r
\r
    handleResize();\r
\r
    if ('ResizeObserver' in window) {\r
      const ro = new ResizeObserver(handleResize);\r
      ro.observe(container);\r
      resizeObserverRef.current = ro;\r
    } else {\r
      (window as Window).addEventListener('resize', handleResize);\r
    }\r
\r
    const loop = () => {\r
      const dt = clock.getDelta();\r
      const elapsed = clock.elapsedTime;\r
      material.uniforms.uTime.value = elapsed;\r
\r
      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;\r
      const rad = (deg * Math.PI) / 180;\r
      const c = Math.cos(rad);\r
      const s = Math.sin(rad);\r
      (material.uniforms.uRot.value as THREE.Vector2).set(c, s);\r
\r
      const cur = pointerCurrentRef.current;\r
      const tgt = pointerTargetRef.current;\r
      const amt = Math.min(1, dt * pointerSmoothRef.current);\r
      cur.lerp(tgt, amt);\r
      (material.uniforms.uPointer.value as THREE.Vector2).copy(cur);\r
      renderer.render(scene, camera);\r
      rafRef.current = requestAnimationFrame(loop);\r
    };\r
    rafRef.current = requestAnimationFrame(loop);\r
\r
    return () => {\r
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);\r
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();\r
      else (window as Window).removeEventListener('resize', handleResize);\r
      geometry.dispose();\r
      material.dispose();\r
      renderer.dispose();\r
      if (renderer.domElement && renderer.domElement.parentElement === container) {\r
        container.removeChild(renderer.domElement);\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    const material = materialRef.current;\r
    const renderer = rendererRef.current;\r
    if (!material) return;\r
\r
    rotationRef.current = rotation;\r
    autoRotateRef.current = autoRotate;\r
    material.uniforms.uSpeed.value = speed;\r
    material.uniforms.uScale.value = scale;\r
    material.uniforms.uFrequency.value = frequency;\r
    material.uniforms.uWarpStrength.value = warpStrength;\r
    material.uniforms.uMouseInfluence.value = mouseInfluence;\r
    material.uniforms.uParallax.value = parallax;\r
    material.uniforms.uNoise.value = noise;\r
\r
    const toVec3 = (hex: string) => {\r
      const h = hex.replace('#', '').trim();\r
      const v =\r
        h.length === 3\r
          ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]\r
          : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];\r
      return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);\r
    };\r
\r
    const arr = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);\r
    for (let i = 0; i < MAX_COLORS; i++) {\r
      const vec = (material.uniforms.uColors.value as THREE.Vector3[])[i];\r
      if (i < arr.length) vec.copy(arr[i]);\r
      else vec.set(0, 0, 0);\r
    }\r
    material.uniforms.uColorCount.value = arr.length;\r
\r
    material.uniforms.uTransparent.value = transparent ? 1 : 0;\r
    if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);\r
  }, [\r
    rotation,\r
    autoRotate,\r
    speed,\r
    scale,\r
    frequency,\r
    warpStrength,\r
    mouseInfluence,\r
    parallax,\r
    noise,\r
    colors,\r
    transparent\r
  ]);\r
\r
  useEffect(() => {\r
    const material = materialRef.current;\r
    const container = containerRef.current;\r
    if (!material || !container) return;\r
\r
    const handlePointerMove = (e: PointerEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;\r
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);\r
      pointerTargetRef.current.set(x, y);\r
    };\r
\r
    container.addEventListener('pointermove', handlePointerMove);\r
    return () => {\r
      container.removeEventListener('pointermove', handlePointerMove);\r
    };\r
  }, []);\r
\r
  return <div ref={containerRef} className={\`color-bends-container \${className}\`} style={style} />;\r
}\r
`,ge=`import React, { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
\r
type ColorBendsProps = {\r
  className?: string;\r
  style?: React.CSSProperties;\r
  rotation?: number;\r
  speed?: number;\r
  colors?: string[];\r
  transparent?: boolean;\r
  autoRotate?: number;\r
  scale?: number;\r
  frequency?: number;\r
  warpStrength?: number;\r
  mouseInfluence?: number;\r
  parallax?: number;\r
  noise?: number;\r
};\r
\r
const MAX_COLORS = 8 as const;\r
\r
const frag = \`\r
#define MAX_COLORS \${MAX_COLORS}\r
uniform vec2 uCanvas;\r
uniform float uTime;\r
uniform float uSpeed;\r
uniform vec2 uRot;\r
uniform int uColorCount;\r
uniform vec3 uColors[MAX_COLORS];\r
uniform int uTransparent;\r
uniform float uScale;\r
uniform float uFrequency;\r
uniform float uWarpStrength;\r
uniform vec2 uPointer; // in NDC [-1,1]\r
uniform float uMouseInfluence;\r
uniform float uParallax;\r
uniform float uNoise;\r
varying vec2 vUv;\r
\r
void main() {\r
  float t = uTime * uSpeed;\r
  vec2 p = vUv * 2.0 - 1.0;\r
  p += uPointer * uParallax * 0.1;\r
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);\r
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);\r
  q /= max(uScale, 0.0001);\r
  q /= 0.5 + 0.2 * dot(q, q);\r
  q += 0.2 * cos(t) - 7.56;\r
  vec2 toward = (uPointer - rp);\r
  q += toward * uMouseInfluence * 0.2;\r
\r
    vec3 col = vec3(0.0);\r
    float a = 1.0;\r
\r
    if (uColorCount > 0) {\r
      vec2 s = q;\r
      vec3 sumCol = vec3(0.0);\r
      float cover = 0.0;\r
      for (int i = 0; i < MAX_COLORS; ++i) {\r
            if (i >= uColorCount) break;\r
            s -= 0.01;\r
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\r
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);\r
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);\r
            float kMix = pow(kBelow, 0.3); // strong response across 0..1\r
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // allow >1 to amplify displacement\r
            vec2 disp = (r - s) * kBelow;\r
            vec2 warped = s + disp * gain;\r
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);\r
            float m = mix(m0, m1, kMix);\r
            float w = 1.0 - exp(-6.0 / exp(6.0 * m));\r
            sumCol += uColors[i] * w;\r
            cover = max(cover, w);\r
      }\r
      col = clamp(sumCol, 0.0, 1.0);\r
      a = uTransparent > 0 ? cover : 1.0;\r
    } else {\r
        vec2 s = q;\r
        for (int k = 0; k < 3; ++k) {\r
            s -= 0.01;\r
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));\r
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);\r
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);\r
            float kMix = pow(kBelow, 0.3);\r
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);\r
            vec2 disp = (r - s) * kBelow;\r
            vec2 warped = s + disp * gain;\r
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);\r
            float m = mix(m0, m1, kMix);\r
            col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));\r
        }\r
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;\r
    }\r
\r
    if (uNoise > 0.0001) {\r
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);\r
      col += (n - 0.5) * uNoise;\r
      col = clamp(col, 0.0, 1.0);\r
    }\r
\r
    vec3 rgb = (uTransparent > 0) ? col * a : col;\r
    gl_FragColor = vec4(rgb, a);\r
}\r
\`;\r
\r
const vert = \`\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
export default function ColorBends({\r
  className,\r
  style,\r
  rotation = 45,\r
  speed = 0.2,\r
  colors = [],\r
  transparent = true,\r
  autoRotate = 0,\r
  scale = 1,\r
  frequency = 1,\r
  warpStrength = 1,\r
  mouseInfluence = 1,\r
  parallax = 0.5,\r
  noise = 0.1\r
}: ColorBendsProps) {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);\r
  const rafRef = useRef<number | null>(null);\r
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);\r
  const resizeObserverRef = useRef<ResizeObserver | null>(null);\r
  const rotationRef = useRef<number>(rotation);\r
  const autoRotateRef = useRef<number>(autoRotate);\r
  const pointerTargetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));\r
  const pointerCurrentRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));\r
  const pointerSmoothRef = useRef<number>(8);\r
\r
  useEffect(() => {\r
    const container = containerRef.current!;\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geometry = new THREE.PlaneGeometry(2, 2);\r
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));\r
    const material = new THREE.ShaderMaterial({\r
      vertexShader: vert,\r
      fragmentShader: frag,\r
      uniforms: {\r
        uCanvas: { value: new THREE.Vector2(1, 1) },\r
        uTime: { value: 0 },\r
        uSpeed: { value: speed },\r
        uRot: { value: new THREE.Vector2(1, 0) },\r
        uColorCount: { value: 0 },\r
        uColors: { value: uColorsArray },\r
        uTransparent: { value: transparent ? 1 : 0 },\r
        uScale: { value: scale },\r
        uFrequency: { value: frequency },\r
        uWarpStrength: { value: warpStrength },\r
        uPointer: { value: new THREE.Vector2(0, 0) },\r
        uMouseInfluence: { value: mouseInfluence },\r
        uParallax: { value: parallax },\r
        uNoise: { value: noise }\r
      },\r
      premultipliedAlpha: true,\r
      transparent: true\r
    });\r
    materialRef.current = material;\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    scene.add(mesh);\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      powerPreference: 'high-performance',\r
      alpha: true\r
    });\r
    rendererRef.current = renderer;\r
    (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;\r
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r
    renderer.setClearColor(0x000000, transparent ? 0 : 1);\r
    renderer.domElement.style.width = '100%';\r
    renderer.domElement.style.height = '100%';\r
    renderer.domElement.style.display = 'block';\r
    container.appendChild(renderer.domElement);\r
\r
    const clock = new THREE.Clock();\r
\r
    const handleResize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h, false);\r
      (material.uniforms.uCanvas.value as THREE.Vector2).set(w, h);\r
    };\r
\r
    handleResize();\r
\r
    if ('ResizeObserver' in window) {\r
      const ro = new ResizeObserver(handleResize);\r
      ro.observe(container);\r
      resizeObserverRef.current = ro;\r
    } else {\r
      (window as Window).addEventListener('resize', handleResize);\r
    }\r
\r
    const loop = () => {\r
      const dt = clock.getDelta();\r
      const elapsed = clock.elapsedTime;\r
      material.uniforms.uTime.value = elapsed;\r
\r
      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;\r
      const rad = (deg * Math.PI) / 180;\r
      const c = Math.cos(rad);\r
      const s = Math.sin(rad);\r
      (material.uniforms.uRot.value as THREE.Vector2).set(c, s);\r
\r
      const cur = pointerCurrentRef.current;\r
      const tgt = pointerTargetRef.current;\r
      const amt = Math.min(1, dt * pointerSmoothRef.current);\r
      cur.lerp(tgt, amt);\r
      (material.uniforms.uPointer.value as THREE.Vector2).copy(cur);\r
      renderer.render(scene, camera);\r
      rafRef.current = requestAnimationFrame(loop);\r
    };\r
    rafRef.current = requestAnimationFrame(loop);\r
\r
    return () => {\r
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);\r
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();\r
      else (window as Window).removeEventListener('resize', handleResize);\r
      geometry.dispose();\r
      material.dispose();\r
      renderer.dispose();\r
      if (renderer.domElement && renderer.domElement.parentElement === container) {\r
        container.removeChild(renderer.domElement);\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    const material = materialRef.current;\r
    const renderer = rendererRef.current;\r
    if (!material) return;\r
\r
    rotationRef.current = rotation;\r
    autoRotateRef.current = autoRotate;\r
    material.uniforms.uSpeed.value = speed;\r
    material.uniforms.uScale.value = scale;\r
    material.uniforms.uFrequency.value = frequency;\r
    material.uniforms.uWarpStrength.value = warpStrength;\r
    material.uniforms.uMouseInfluence.value = mouseInfluence;\r
    material.uniforms.uParallax.value = parallax;\r
    material.uniforms.uNoise.value = noise;\r
\r
    const toVec3 = (hex: string) => {\r
      const h = hex.replace('#', '').trim();\r
      const v =\r
        h.length === 3\r
          ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]\r
          : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];\r
      return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);\r
    };\r
\r
    const arr = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);\r
    for (let i = 0; i < MAX_COLORS; i++) {\r
      const vec = (material.uniforms.uColors.value as THREE.Vector3[])[i];\r
      if (i < arr.length) vec.copy(arr[i]);\r
      else vec.set(0, 0, 0);\r
    }\r
    material.uniforms.uColorCount.value = arr.length;\r
\r
    material.uniforms.uTransparent.value = transparent ? 1 : 0;\r
    if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);\r
  }, [\r
    rotation,\r
    autoRotate,\r
    speed,\r
    scale,\r
    frequency,\r
    warpStrength,\r
    mouseInfluence,\r
    parallax,\r
    noise,\r
    colors,\r
    transparent\r
  ]);\r
\r
  useEffect(() => {\r
    const material = materialRef.current;\r
    const container = containerRef.current;\r
    if (!material || !container) return;\r
\r
    const handlePointerMove = (e: PointerEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;\r
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);\r
      pointerTargetRef.current.set(x, y);\r
    };\r
\r
    container.addEventListener('pointermove', handlePointerMove);\r
    return () => {\r
      container.removeEventListener('pointermove', handlePointerMove);\r
    };\r
  }, []);\r
\r
  return <div ref={containerRef} className={\`w-full h-full relative overflow-hidden \${className}\`} style={style} />;\r
}\r
`,we={dependencies:"three",usage:`import ColorBends from './ColorBends';
  
<ColorBends
  colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
  rotation={30}
  speed={0.3}
  scale={1.2}
  frequency={1.4}
  warpStrength={1.2}
  mouseInfluence={0.8}
  parallax={0.6}
  noise={0.08}
  transparent
/>`,code:de,css:ve,tailwind:Re,tsCode:he,tsTailwind:ge},A=8,Ce=`
#define MAX_COLORS ${A}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer; // in NDC [-1,1]
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

    vec3 col = vec3(0.0);
    float a = 1.0;

    if (uColorCount > 0) {
      vec2 s = q;
      vec3 sumCol = vec3(0.0);
      float cover = 0.0;
      for (int i = 0; i < MAX_COLORS; ++i) {
            if (i >= uColorCount) break;
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3); // strong response across 0..1
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // allow >1 to amplify displacement
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float m = mix(m0, m1, kMix);
            float w = 1.0 - exp(-6.0 / exp(6.0 * m));
            sumCol += uColors[i] * w;
            cover = max(cover, w);
      }
      col = clamp(sumCol, 0.0, 1.0);
      a = uTransparent > 0 ? cover : 1.0;
    } else {
        vec2 s = q;
        for (int k = 0; k < 3; ++k) {
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3);
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float m = mix(m0, m1, kMix);
            col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
        }
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
    }

    if (uNoise > 0.0001) {
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
      col += (n - 0.5) * uNoise;
      col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = (uTransparent > 0) ? col * a : col;
    gl_FragColor = vec4(rgb, a);
}
`,ye=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;function xe({className:P,style:B,rotation:v=45,speed:R=.2,colors:S=[],transparent:i=!0,autoRotate:h=0,scale:g=1,frequency:c=1,warpStrength:w=1,mouseInfluence:m=1,parallax:C=.5,noise:f=.1}){const T=n.useRef(null),q=n.useRef(null),y=n.useRef(null),x=n.useRef(null),M=n.useRef(null),b=n.useRef(v),H=n.useRef(h),F=n.useRef(new O(0,0)),z=n.useRef(new O(0,0)),X=n.useRef(8);return n.useEffect(()=>{const t=T.current,s=new se,E=new le(-1,1,1,-1,0,1),l=new ue(2,2),o=Array.from({length:A},()=>new N(0,0,0)),e=new ie({vertexShader:ye,fragmentShader:Ce,uniforms:{uCanvas:{value:new O(1,1)},uTime:{value:0},uSpeed:{value:R},uRot:{value:new O(1,0)},uColorCount:{value:0},uColors:{value:o},uTransparent:{value:i?1:0},uScale:{value:g},uFrequency:{value:c},uWarpStrength:{value:w},uPointer:{value:new O(0,0)},uMouseInfluence:{value:m},uParallax:{value:C},uNoise:{value:f}},premultipliedAlpha:!0,transparent:!0});x.current=e;const p=new ce(l,e);s.add(p);const a=new me({antialias:!1,powerPreference:"high-performance",alpha:!0});q.current=a,a.outputColorSpace=fe,a.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),a.setClearColor(0,i?0:1),a.domElement.style.width="100%",a.domElement.style.height="100%",a.domElement.style.display="block",t.appendChild(a.domElement);const L=new pe,I=()=>{const d=t.clientWidth||1,k=t.clientHeight||1;a.setSize(d,k,!1),e.uniforms.uCanvas.value.set(d,k)};if(I(),"ResizeObserver"in window){const d=new ResizeObserver(I);d.observe(t),M.current=d}else window.addEventListener("resize",I);const W=()=>{const d=L.getDelta(),k=L.elapsedTime;e.uniforms.uTime.value=k;const V=(b.current%360+H.current*k)*Math.PI/180,j=Math.cos(V),U=Math.sin(V);e.uniforms.uRot.value.set(j,U);const _=z.current,G=F.current,D=Math.min(1,d*X.current);_.lerp(G,D),e.uniforms.uPointer.value.copy(_),a.render(s,E),y.current=requestAnimationFrame(W)};return y.current=requestAnimationFrame(W),()=>{y.current!==null&&cancelAnimationFrame(y.current),M.current?M.current.disconnect():window.removeEventListener("resize",I),l.dispose(),e.dispose(),a.dispose(),a.domElement&&a.domElement.parentElement===t&&t.removeChild(a.domElement)}},[c,m,f,C,g,R,i,w]),n.useEffect(()=>{const t=x.current,s=q.current;if(!t)return;b.current=v,H.current=h,t.uniforms.uSpeed.value=R,t.uniforms.uScale.value=g,t.uniforms.uFrequency.value=c,t.uniforms.uWarpStrength.value=w,t.uniforms.uMouseInfluence.value=m,t.uniforms.uParallax.value=C,t.uniforms.uNoise.value=f;const E=o=>{const e=o.replace("#","").trim(),p=e.length===3?[parseInt(e[0]+e[0],16),parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16)]:[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)];return new N(p[0]/255,p[1]/255,p[2]/255)},l=(S||[]).filter(Boolean).slice(0,A).map(E);for(let o=0;o<A;o++){const e=t.uniforms.uColors.value[o];o<l.length?e.copy(l[o]):e.set(0,0,0)}t.uniforms.uColorCount.value=l.length,t.uniforms.uTransparent.value=i?1:0,s&&s.setClearColor(0,i?0:1)},[v,h,R,g,c,w,m,C,f,S,i]),n.useEffect(()=>{const t=x.current,s=T.current;if(!t||!s)return;const E=l=>{const o=s.getBoundingClientRect(),e=(l.clientX-o.left)/(o.width||1)*2-1,p=-((l.clientY-o.top)/(o.height||1)*2-1);F.current.set(e,p)};return s.addEventListener("pointermove",E),()=>{s.removeEventListener("pointermove",E)}},[]),r.jsx("div",{ref:T,className:`color-bends-container ${P}`,style:B})}const Fe=()=>{const[P,B]=n.useState(0),[v,R]=n.useState(0),[S,i]=n.useState(.2),[h,g]=n.useState(1),[c,w]=n.useState(1),[m,C]=n.useState(1),[f,T]=n.useState(1),[q,y]=n.useState(.5),[x,M]=n.useState(.1),[b,H]=n.useState(""),F=[{name:"rotation",type:"number",default:"45",description:"Base rotation angle in degrees."},{name:"autoRotate",type:"number",default:"0",description:"Automatic rotation speed in degrees/sec."},{name:"speed",type:"number",default:"0.2",description:"Animation time scale of the shader."},{name:"colors",type:"string[]",default:"[]",description:"Palette of up to 8 hex colors used to blend the bends."},{name:"transparent",type:"boolean",default:"true",description:"Whether the background is transparent (uses alpha)."},{name:"scale",type:"number",default:"1",description:"Zoom factor of the pattern."},{name:"frequency",type:"number",default:"1",description:"Wave frequency used in the pattern."},{name:"warpStrength",type:"number",default:"1",description:"Amount of warping/distortion applied to waves."},{name:"mouseInfluence",type:"number",default:"1",description:"How strongly the waves react to pointer movement."},{name:"parallax",type:"number",default:"0.5",description:"Parallax factor shifting content with pointer."},{name:"noise",type:"number",default:"0.1",description:"Adds subtle grain. 0 disables noise."},{name:"className",type:"string",default:"''",description:"Additional CSS classes for the container."},{name:"style",type:"React.CSSProperties",default:"{}",description:"Inline styles for the container."}];return r.jsxs(K,{children:[r.jsxs(Q,{children:[r.jsxs($,{position:"relative",className:"demo-container",h:600,overflow:"hidden",p:0,children:[r.jsx(xe,{rotation:P,autoRotate:v,speed:S,scale:h,frequency:c,warpStrength:m,mouseInfluence:f,parallax:q,noise:x,colors:[b]}),r.jsx(ae,{pillText:"New Background",headline:"You have the power to reshape your own destiny"})]}),r.jsxs(te,{children:[r.jsxs(Y,{alignItems:"center",mb:4,children:[r.jsx(Z,{fontSize:"sm",mr:2,children:"Single Color"}),r.jsx(J,{type:"color",value:b,onChange:z=>H(z.target.value),width:"50px"})]}),r.jsx(u,{title:"Rotation (deg)",min:-180,max:180,step:1,value:P,onChange:B}),r.jsx(u,{title:"Auto Rotate (deg/s)",min:-5,max:5,step:1,value:v,onChange:R}),r.jsx(u,{title:"Speed",min:0,max:1,step:.01,value:S,onChange:i}),r.jsx(u,{title:"Scale",min:.2,max:5,step:.1,value:h,onChange:g}),r.jsx(u,{title:"Frequency",min:0,max:5,step:.1,value:c,onChange:w}),r.jsx(u,{title:"Warp Strength",min:0,max:1,step:.05,value:m,onChange:C}),r.jsx(u,{title:"Mouse Influence",min:0,max:2,step:.05,value:f,onChange:T}),r.jsx(u,{title:"Parallax",min:0,max:2,step:.05,value:q,onChange:y}),r.jsx(u,{title:"Noise",min:0,max:1,step:.01,value:x,onChange:M})]}),r.jsx(ee,{data:F}),r.jsx(oe,{dependencyList:["three"]})]}),r.jsx(re,{children:r.jsx(ne,{codeObject:we})})]})};export{Fe as default};
