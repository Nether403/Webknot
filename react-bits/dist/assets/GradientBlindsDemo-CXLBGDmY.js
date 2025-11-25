import{r as n,R as rr,P as nr,M as er,j as r,B as or,F as _,T as $,d as K}from"./index-wsKSLPNH.js";import{T as tr,P as ir,a as ur,C as lr,b as ar}from"./PropTable-C4uPWs8h.js";import{C as sr}from"./Customize-1m_ZNqR9.js";import{D as cr}from"./Dependencies-BHoMfJUj.js";import{P as b}from"./PreviewSlider-m1G_aiYP.js";import{P as fr}from"./PreviewSelect-B8u33nUa.js";import{B as mr}from"./BackgroundContent-CqU7Wlm2.js";import{T as dr}from"./Triangle-66-Bqe-c.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";import"./PreviewSwitch-DqnF708j.js";const vr=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
import './GradientBlinds.css';\r
\r
const MAX_COLORS = 8;\r
const hexToRGB = hex => {\r
  const c = hex.replace('#', '').padEnd(6, '0');\r
  const r = parseInt(c.slice(0, 2), 16) / 255;\r
  const g = parseInt(c.slice(2, 4), 16) / 255;\r
  const b = parseInt(c.slice(4, 6), 16) / 255;\r
  return [r, g, b];\r
};\r
const prepStops = stops => {\r
  const base = (stops && stops.length ? stops : ['#FF9FFC', '#5227FF']).slice(0, MAX_COLORS);\r
  if (base.length === 1) base.push(base[0]);\r
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);\r
  const arr = [];\r
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]));\r
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2));\r
  return { arr, count };\r
};\r
\r
const GradientBlinds = ({\r
  className,\r
  dpr,\r
  paused = false,\r
  gradientColors,\r
  angle = 0,\r
  noise = 0.3,\r
  blindCount = 16,\r
  blindMinWidth = 60,\r
  mouseDampening = 0.15,\r
  mirrorGradient = false,\r
  spotlightRadius = 0.5,\r
  spotlightSoftness = 1,\r
  spotlightOpacity = 1,\r
  distortAmount = 0,\r
  shineDirection = 'left',\r
  mixBlendMode = 'lighten'\r
}) => {\r
  const containerRef = useRef(null);\r
  const rafRef = useRef(null);\r
  const programRef = useRef(null);\r
  const meshRef = useRef(null);\r
  const geometryRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const mouseTargetRef = useRef([0, 0]);\r
  const lastTimeRef = useRef(0);\r
  const firstResizeRef = useRef(true);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({\r
      dpr: dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),\r
      alpha: true,\r
      antialias: true\r
    });\r
    rendererRef.current = renderer;\r
    const gl = renderer.gl;\r
    const canvas = gl.canvas;\r
\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    canvas.style.display = 'block';\r
    container.appendChild(canvas);\r
\r
    const vertex = \`\r
attribute vec2 position;\r
attribute vec2 uv;\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
    const fragment = \`\r
#ifdef GL_ES\r
precision mediump float;\r
#endif\r
\r
uniform vec3  iResolution;\r
uniform vec2  iMouse;\r
uniform float iTime;\r
\r
uniform float uAngle;\r
uniform float uNoise;\r
uniform float uBlindCount;\r
uniform float uSpotlightRadius;\r
uniform float uSpotlightSoftness;\r
uniform float uSpotlightOpacity;\r
uniform float uMirror;\r
uniform float uDistort;\r
uniform float uShineFlip;\r
uniform vec3  uColor0;\r
uniform vec3  uColor1;\r
uniform vec3  uColor2;\r
uniform vec3  uColor3;\r
uniform vec3  uColor4;\r
uniform vec3  uColor5;\r
uniform vec3  uColor6;\r
uniform vec3  uColor7;\r
uniform int   uColorCount;\r
\r
varying vec2 vUv;\r
\r
float rand(vec2 co){\r
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
vec2 rotate2D(vec2 p, float a){\r
  float c = cos(a);\r
  float s = sin(a);\r
  return mat2(c, -s, s, c) * p;\r
}\r
\r
vec3 getGradientColor(float t){\r
  float tt = clamp(t, 0.0, 1.0);\r
  int count = uColorCount;\r
  if (count < 2) count = 2;\r
  float scaled = tt * float(count - 1);\r
  float seg = floor(scaled);\r
  float f = fract(scaled);\r
\r
  if (seg < 1.0) return mix(uColor0, uColor1, f);\r
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);\r
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);\r
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);\r
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);\r
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);\r
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);\r
  if (count > 7) return uColor7;\r
  if (count > 6) return uColor6;\r
  if (count > 5) return uColor5;\r
  if (count > 4) return uColor4;\r
  if (count > 3) return uColor3;\r
  if (count > 2) return uColor2;\r
  return uColor1;\r
}\r
\r
void mainImage( out vec4 fragColor, in vec2 fragCoord )\r
{\r
    vec2 uv0 = fragCoord.xy / iResolution.xy;\r
\r
    float aspect = iResolution.x / iResolution.y;\r
    vec2 p = uv0 * 2.0 - 1.0;\r
    p.x *= aspect;\r
    vec2 pr = rotate2D(p, uAngle);\r
    pr.x /= aspect;\r
    vec2 uv = pr * 0.5 + 0.5;\r
\r
    vec2 uvMod = uv;\r
    if (uDistort > 0.0) {\r
      float a = uvMod.y * 6.0;\r
      float b = uvMod.x * 6.0;\r
      float w = 0.01 * uDistort;\r
      uvMod.x += sin(a) * w;\r
      uvMod.y += cos(b) * w;\r
    }\r
    float t = uvMod.x;\r
    if (uMirror > 0.5) {\r
      t = 1.0 - abs(1.0 - 2.0 * fract(t));\r
    }\r
    vec3 base = getGradientColor(t);\r
\r
    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);\r
  float d = length(uv0 - offset);\r
  float r = max(uSpotlightRadius, 1e-4);\r
  float dn = d / r;\r
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;\r
  vec3 cir = vec3(spot);\r
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));\r
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;\r
    vec3 ran = vec3(stripe);\r
\r
    vec3 col = cir + base - ran;\r
    col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;\r
\r
    fragColor = vec4(col, 1.0);\r
}\r
\r
void main() {\r
    vec4 color;\r
    mainImage(color, vUv * iResolution.xy);\r
    gl_FragColor = color;\r
}\r
\`;\r
\r
    const { arr: colorArr, count: colorCount } = prepStops(gradientColors);\r
    const uniforms = {\r
      iResolution: {\r
        value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]\r
      },\r
      iMouse: { value: [0, 0] },\r
      iTime: { value: 0 },\r
      uAngle: { value: (angle * Math.PI) / 180 },\r
      uNoise: { value: noise },\r
      uBlindCount: { value: Math.max(1, blindCount) },\r
      uSpotlightRadius: { value: spotlightRadius },\r
      uSpotlightSoftness: { value: spotlightSoftness },\r
      uSpotlightOpacity: { value: spotlightOpacity },\r
      uMirror: { value: mirrorGradient ? 1 : 0 },\r
      uDistort: { value: distortAmount },\r
      uShineFlip: { value: shineDirection === 'right' ? 1 : 0 },\r
      uColor0: { value: colorArr[0] },\r
      uColor1: { value: colorArr[1] },\r
      uColor2: { value: colorArr[2] },\r
      uColor3: { value: colorArr[3] },\r
      uColor4: { value: colorArr[4] },\r
      uColor5: { value: colorArr[5] },\r
      uColor6: { value: colorArr[6] },\r
      uColor7: { value: colorArr[7] },\r
      uColorCount: { value: colorCount }\r
    };\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms\r
    });\r
    programRef.current = program;\r
\r
    const geometry = new Triangle(gl);\r
    geometryRef.current = geometry;\r
    const mesh = new Mesh(gl, { geometry, program });\r
    meshRef.current = mesh;\r
\r
    const resize = () => {\r
      const rect = container.getBoundingClientRect();\r
      renderer.setSize(rect.width, rect.height);\r
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];\r
\r
      if (blindMinWidth && blindMinWidth > 0) {\r
        const maxByMinWidth = Math.max(1, Math.floor(rect.width / blindMinWidth));\r
\r
        const effective = blindCount ? Math.min(blindCount, maxByMinWidth) : maxByMinWidth;\r
        uniforms.uBlindCount.value = Math.max(1, effective);\r
      } else {\r
        uniforms.uBlindCount.value = Math.max(1, blindCount);\r
      }\r
\r
      if (firstResizeRef.current) {\r
        firstResizeRef.current = false;\r
        const cx = gl.drawingBufferWidth / 2;\r
        const cy = gl.drawingBufferHeight / 2;\r
        uniforms.iMouse.value = [cx, cy];\r
        mouseTargetRef.current = [cx, cy];\r
      }\r
    };\r
\r
    resize();\r
    const ro = new ResizeObserver(resize);\r
    ro.observe(container);\r
\r
    const onPointerMove = e => {\r
      const rect = canvas.getBoundingClientRect();\r
      const scale = renderer.dpr || 1;\r
      const x = (e.clientX - rect.left) * scale;\r
      const y = (rect.height - (e.clientY - rect.top)) * scale;\r
      mouseTargetRef.current = [x, y];\r
      if (mouseDampening <= 0) {\r
        uniforms.iMouse.value = [x, y];\r
      }\r
    };\r
    canvas.addEventListener('pointermove', onPointerMove);\r
\r
    const loop = t => {\r
      rafRef.current = requestAnimationFrame(loop);\r
      uniforms.iTime.value = t * 0.001;\r
      if (mouseDampening > 0) {\r
        if (!lastTimeRef.current) lastTimeRef.current = t;\r
        const dt = (t - lastTimeRef.current) / 1000;\r
        lastTimeRef.current = t;\r
        const tau = Math.max(1e-4, mouseDampening);\r
        let factor = 1 - Math.exp(-dt / tau);\r
        if (factor > 1) factor = 1;\r
        const target = mouseTargetRef.current;\r
        const cur = uniforms.iMouse.value;\r
        cur[0] += (target[0] - cur[0]) * factor;\r
        cur[1] += (target[1] - cur[1]) * factor;\r
      } else {\r
        lastTimeRef.current = t;\r
      }\r
      if (!paused && programRef.current && meshRef.current) {\r
        try {\r
          renderer.render({ scene: meshRef.current });\r
        } catch (e) {\r
          console.error(e);\r
        }\r
      }\r
    };\r
    rafRef.current = requestAnimationFrame(loop);\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      canvas.removeEventListener('pointermove', onPointerMove);\r
      ro.disconnect();\r
      if (canvas.parentElement === container) {\r
        container.removeChild(canvas);\r
      }\r
      const callIfFn = (obj, key) => {\r
        if (obj && typeof obj[key] === 'function') {\r
          obj[key].call(obj);\r
        }\r
      };\r
      callIfFn(programRef.current, 'remove');\r
      callIfFn(geometryRef.current, 'remove');\r
      callIfFn(meshRef.current, 'remove');\r
      callIfFn(rendererRef.current, 'destroy');\r
      programRef.current = null;\r
      geometryRef.current = null;\r
      meshRef.current = null;\r
      rendererRef.current = null;\r
    };\r
  }, [\r
    dpr,\r
    paused,\r
    gradientColors,\r
    angle,\r
    noise,\r
    blindCount,\r
    blindMinWidth,\r
    mouseDampening,\r
    mirrorGradient,\r
    spotlightRadius,\r
    spotlightSoftness,\r
    spotlightOpacity,\r
    distortAmount,\r
    shineDirection\r
  ]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`gradient-blinds-container \${className}\`}\r
      style={{\r
        ...(mixBlendMode && {\r
          mixBlendMode: mixBlendMode\r
        })\r
      }}\r
    />\r
  );\r
};\r
\r
export default GradientBlinds;\r
`,gr=`.gradient-blinds-container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
}\r
`,pr=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
\r
const MAX_COLORS = 8;\r
const hexToRGB = hex => {\r
  const c = hex.replace('#', '').padEnd(6, '0');\r
  const r = parseInt(c.slice(0, 2), 16) / 255;\r
  const g = parseInt(c.slice(2, 4), 16) / 255;\r
  const b = parseInt(c.slice(4, 6), 16) / 255;\r
  return [r, g, b];\r
};\r
const prepStops = stops => {\r
  const base = (stops && stops.length ? stops : ['#FF9FFC', '#5227FF']).slice(0, MAX_COLORS);\r
  if (base.length === 1) base.push(base[0]);\r
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);\r
  const arr = [];\r
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]));\r
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2));\r
  return { arr, count };\r
};\r
\r
const GradientBlinds = ({\r
  className,\r
  dpr,\r
  paused = false,\r
  gradientColors,\r
  angle = 0,\r
  noise = 0.3,\r
  blindCount = 16,\r
  blindMinWidth = 60,\r
  mouseDampening = 0.15,\r
  mirrorGradient = false,\r
  spotlightRadius = 0.5,\r
  spotlightSoftness = 1,\r
  spotlightOpacity = 1,\r
  distortAmount = 0,\r
  shineDirection = 'left',\r
  mixBlendMode = 'lighten'\r
}) => {\r
  const containerRef = useRef(null);\r
  const rafRef = useRef(null);\r
  const programRef = useRef(null);\r
  const meshRef = useRef(null);\r
  const geometryRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const mouseTargetRef = useRef([0, 0]);\r
  const lastTimeRef = useRef(0);\r
  const firstResizeRef = useRef(true);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({\r
      dpr: dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),\r
      alpha: true,\r
      antialias: true\r
    });\r
    rendererRef.current = renderer;\r
    const gl = renderer.gl;\r
    const canvas = gl.canvas;\r
\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    canvas.style.display = 'block';\r
    container.appendChild(canvas);\r
\r
    const vertex = \`\r
attribute vec2 position;\r
attribute vec2 uv;\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
    const fragment = \`\r
#ifdef GL_ES\r
precision mediump float;\r
#endif\r
\r
uniform vec3  iResolution;\r
uniform vec2  iMouse;\r
uniform float iTime;\r
\r
uniform float uAngle;\r
uniform float uNoise;\r
uniform float uBlindCount;\r
uniform float uSpotlightRadius;\r
uniform float uSpotlightSoftness;\r
uniform float uSpotlightOpacity;\r
uniform float uMirror;\r
uniform float uDistort;\r
uniform float uShineFlip;\r
uniform vec3  uColor0;\r
uniform vec3  uColor1;\r
uniform vec3  uColor2;\r
uniform vec3  uColor3;\r
uniform vec3  uColor4;\r
uniform vec3  uColor5;\r
uniform vec3  uColor6;\r
uniform vec3  uColor7;\r
uniform int   uColorCount;\r
\r
varying vec2 vUv;\r
\r
float rand(vec2 co){\r
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
vec2 rotate2D(vec2 p, float a){\r
  float c = cos(a);\r
  float s = sin(a);\r
  return mat2(c, -s, s, c) * p;\r
}\r
\r
vec3 getGradientColor(float t){\r
  float tt = clamp(t, 0.0, 1.0);\r
  int count = uColorCount;\r
  if (count < 2) count = 2;\r
  float scaled = tt * float(count - 1);\r
  float seg = floor(scaled);\r
  float f = fract(scaled);\r
\r
  if (seg < 1.0) return mix(uColor0, uColor1, f);\r
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);\r
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);\r
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);\r
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);\r
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);\r
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);\r
  if (count > 7) return uColor7;\r
  if (count > 6) return uColor6;\r
  if (count > 5) return uColor5;\r
  if (count > 4) return uColor4;\r
  if (count > 3) return uColor3;\r
  if (count > 2) return uColor2;\r
  return uColor1;\r
}\r
\r
void mainImage( out vec4 fragColor, in vec2 fragCoord )\r
{\r
    vec2 uv0 = fragCoord.xy / iResolution.xy;\r
\r
    float aspect = iResolution.x / iResolution.y;\r
    vec2 p = uv0 * 2.0 - 1.0;\r
    p.x *= aspect;\r
    vec2 pr = rotate2D(p, uAngle);\r
    pr.x /= aspect;\r
    vec2 uv = pr * 0.5 + 0.5;\r
\r
    vec2 uvMod = uv;\r
    if (uDistort > 0.0) {\r
      float a = uvMod.y * 6.0;\r
      float b = uvMod.x * 6.0;\r
      float w = 0.01 * uDistort;\r
      uvMod.x += sin(a) * w;\r
      uvMod.y += cos(b) * w;\r
    }\r
    float t = uvMod.x;\r
    if (uMirror > 0.5) {\r
      t = 1.0 - abs(1.0 - 2.0 * fract(t));\r
    }\r
    vec3 base = getGradientColor(t);\r
\r
    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);\r
  float d = length(uv0 - offset);\r
  float r = max(uSpotlightRadius, 1e-4);\r
  float dn = d / r;\r
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;\r
  vec3 cir = vec3(spot);\r
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));\r
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;\r
    vec3 ran = vec3(stripe);\r
\r
    vec3 col = cir + base - ran;\r
    col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;\r
\r
    fragColor = vec4(col, 1.0);\r
}\r
\r
void main() {\r
    vec4 color;\r
    mainImage(color, vUv * iResolution.xy);\r
    gl_FragColor = color;\r
}\r
\`;\r
\r
    const { arr: colorArr, count: colorCount } = prepStops(gradientColors);\r
    const uniforms = {\r
      iResolution: {\r
        value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]\r
      },\r
      iMouse: { value: [0, 0] },\r
      iTime: { value: 0 },\r
      uAngle: { value: (angle * Math.PI) / 180 },\r
      uNoise: { value: noise },\r
      uBlindCount: { value: Math.max(1, blindCount) },\r
      uSpotlightRadius: { value: spotlightRadius },\r
      uSpotlightSoftness: { value: spotlightSoftness },\r
      uSpotlightOpacity: { value: spotlightOpacity },\r
      uMirror: { value: mirrorGradient ? 1 : 0 },\r
      uDistort: { value: distortAmount },\r
      uShineFlip: { value: shineDirection === 'right' ? 1 : 0 },\r
      uColor0: { value: colorArr[0] },\r
      uColor1: { value: colorArr[1] },\r
      uColor2: { value: colorArr[2] },\r
      uColor3: { value: colorArr[3] },\r
      uColor4: { value: colorArr[4] },\r
      uColor5: { value: colorArr[5] },\r
      uColor6: { value: colorArr[6] },\r
      uColor7: { value: colorArr[7] },\r
      uColorCount: { value: colorCount }\r
    };\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms\r
    });\r
    programRef.current = program;\r
\r
    const geometry = new Triangle(gl);\r
    geometryRef.current = geometry;\r
    const mesh = new Mesh(gl, { geometry, program });\r
    meshRef.current = mesh;\r
\r
    const resize = () => {\r
      const rect = container.getBoundingClientRect();\r
      renderer.setSize(rect.width, rect.height);\r
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];\r
\r
      if (blindMinWidth && blindMinWidth > 0) {\r
        const maxByMinWidth = Math.max(1, Math.floor(rect.width / blindMinWidth));\r
\r
        const effective = blindCount ? Math.min(blindCount, maxByMinWidth) : maxByMinWidth;\r
        uniforms.uBlindCount.value = Math.max(1, effective);\r
      } else {\r
        uniforms.uBlindCount.value = Math.max(1, blindCount);\r
      }\r
\r
      if (firstResizeRef.current) {\r
        firstResizeRef.current = false;\r
        const cx = gl.drawingBufferWidth / 2;\r
        const cy = gl.drawingBufferHeight / 2;\r
        uniforms.iMouse.value = [cx, cy];\r
        mouseTargetRef.current = [cx, cy];\r
      }\r
    };\r
\r
    resize();\r
    const ro = new ResizeObserver(resize);\r
    ro.observe(container);\r
\r
    const onPointerMove = e => {\r
      const rect = canvas.getBoundingClientRect();\r
      const scale = renderer.dpr || 1;\r
      const x = (e.clientX - rect.left) * scale;\r
      const y = (rect.height - (e.clientY - rect.top)) * scale;\r
      mouseTargetRef.current = [x, y];\r
      if (mouseDampening <= 0) {\r
        uniforms.iMouse.value = [x, y];\r
      }\r
    };\r
    canvas.addEventListener('pointermove', onPointerMove);\r
\r
    const loop = t => {\r
      rafRef.current = requestAnimationFrame(loop);\r
      uniforms.iTime.value = t * 0.001;\r
      if (mouseDampening > 0) {\r
        if (!lastTimeRef.current) lastTimeRef.current = t;\r
        const dt = (t - lastTimeRef.current) / 1000;\r
        lastTimeRef.current = t;\r
        const tau = Math.max(1e-4, mouseDampening);\r
        let factor = 1 - Math.exp(-dt / tau);\r
        if (factor > 1) factor = 1;\r
        const target = mouseTargetRef.current;\r
        const cur = uniforms.iMouse.value;\r
        cur[0] += (target[0] - cur[0]) * factor;\r
        cur[1] += (target[1] - cur[1]) * factor;\r
      } else {\r
        lastTimeRef.current = t;\r
      }\r
      if (!paused && programRef.current && meshRef.current) {\r
        try {\r
          renderer.render({ scene: meshRef.current });\r
        } catch (e) {\r
          console.error(e);\r
        }\r
      }\r
    };\r
    rafRef.current = requestAnimationFrame(loop);\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      canvas.removeEventListener('pointermove', onPointerMove);\r
      ro.disconnect();\r
      if (canvas.parentElement === container) {\r
        container.removeChild(canvas);\r
      }\r
      const callIfFn = (obj, key) => {\r
        if (obj && typeof obj[key] === 'function') {\r
          obj[key].call(obj);\r
        }\r
      };\r
      callIfFn(programRef.current, 'remove');\r
      callIfFn(geometryRef.current, 'remove');\r
      callIfFn(meshRef.current, 'remove');\r
      callIfFn(rendererRef.current, 'destroy');\r
      programRef.current = null;\r
      geometryRef.current = null;\r
      meshRef.current = null;\r
      rendererRef.current = null;\r
    };\r
  }, [\r
    dpr,\r
    paused,\r
    gradientColors,\r
    angle,\r
    noise,\r
    blindCount,\r
    blindMinWidth,\r
    mouseDampening,\r
    mirrorGradient,\r
    spotlightRadius,\r
    spotlightSoftness,\r
    spotlightOpacity,\r
    distortAmount,\r
    shineDirection\r
  ]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`w-full h-full overflow-hidden relative \${className}\`}\r
      style={{\r
        ...(mixBlendMode && {\r
          mixBlendMode: mixBlendMode\r
        })\r
      }}\r
    />\r
  );\r
};\r
\r
export default GradientBlinds;\r
`,hr=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
import './GradientBlinds.css';\r
\r
export interface GradientBlindsProps {\r
  className?: string;\r
  dpr?: number;\r
  paused?: boolean;\r
  gradientColors?: string[];\r
  angle?: number;\r
  noise?: number;\r
  blindCount?: number;\r
  blindMinWidth?: number;\r
  mouseDampening?: number;\r
  mirrorGradient?: boolean;\r
  spotlightRadius?: number;\r
  spotlightSoftness?: number;\r
  spotlightOpacity?: number;\r
  distortAmount?: number;\r
  shineDirection?: 'left' | 'right';\r
  mixBlendMode?: string;\r
}\r
\r
const MAX_COLORS = 8;\r
const hexToRGB = (hex: string): [number, number, number] => {\r
  const c = hex.replace('#', '').padEnd(6, '0');\r
  const r = parseInt(c.slice(0, 2), 16) / 255;\r
  const g = parseInt(c.slice(2, 4), 16) / 255;\r
  const b = parseInt(c.slice(4, 6), 16) / 255;\r
  return [r, g, b];\r
};\r
const prepStops = (stops?: string[]) => {\r
  const base = (stops && stops.length ? stops : ['#FF9FFC', '#5227FF']).slice(0, MAX_COLORS);\r
  if (base.length === 1) base.push(base[0]);\r
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);\r
  const arr: [number, number, number][] = [];\r
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]));\r
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2));\r
  return { arr, count };\r
};\r
\r
const GradientBlinds: React.FC<GradientBlindsProps> = ({\r
  className,\r
  dpr,\r
  paused = false,\r
  gradientColors,\r
  angle = 0,\r
  noise = 0.3,\r
  blindCount = 16,\r
  blindMinWidth = 60,\r
  mouseDampening = 0.15,\r
  mirrorGradient = false,\r
  spotlightRadius = 0.5,\r
  spotlightSoftness = 1,\r
  spotlightOpacity = 1,\r
  distortAmount = 0,\r
  shineDirection = 'left',\r
  mixBlendMode = 'lighten'\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const rafRef = useRef<number | null>(null);\r
  const programRef = useRef<Program | null>(null);\r
  const meshRef = useRef<Mesh<Triangle> | null>(null);\r
  const geometryRef = useRef<Triangle | null>(null);\r
  const rendererRef = useRef<Renderer | null>(null);\r
  const mouseTargetRef = useRef<[number, number]>([0, 0]);\r
  const lastTimeRef = useRef<number>(0);\r
  const firstResizeRef = useRef<boolean>(true);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({\r
      dpr: dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),\r
      alpha: true,\r
      antialias: true\r
    });\r
    rendererRef.current = renderer;\r
    const gl = renderer.gl;\r
    const canvas = gl.canvas as HTMLCanvasElement;\r
\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    canvas.style.display = 'block';\r
    container.appendChild(canvas);\r
\r
    const vertex = \`\r
attribute vec2 position;\r
attribute vec2 uv;\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
    const fragment = \`\r
#ifdef GL_ES\r
precision mediump float;\r
#endif\r
\r
uniform vec3  iResolution;\r
uniform vec2  iMouse;\r
uniform float iTime;\r
\r
uniform float uAngle;\r
uniform float uNoise;\r
uniform float uBlindCount;\r
uniform float uSpotlightRadius;\r
uniform float uSpotlightSoftness;\r
uniform float uSpotlightOpacity;\r
uniform float uMirror;\r
uniform float uDistort;\r
uniform float uShineFlip;\r
uniform vec3  uColor0;\r
uniform vec3  uColor1;\r
uniform vec3  uColor2;\r
uniform vec3  uColor3;\r
uniform vec3  uColor4;\r
uniform vec3  uColor5;\r
uniform vec3  uColor6;\r
uniform vec3  uColor7;\r
uniform int   uColorCount;\r
\r
varying vec2 vUv;\r
\r
float rand(vec2 co){\r
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
vec2 rotate2D(vec2 p, float a){\r
  float c = cos(a);\r
  float s = sin(a);\r
  return mat2(c, -s, s, c) * p;\r
}\r
\r
vec3 getGradientColor(float t){\r
  float tt = clamp(t, 0.0, 1.0);\r
  int count = uColorCount;\r
  if (count < 2) count = 2;\r
  float scaled = tt * float(count - 1);\r
  float seg = floor(scaled);\r
  float f = fract(scaled);\r
\r
  if (seg < 1.0) return mix(uColor0, uColor1, f);\r
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);\r
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);\r
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);\r
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);\r
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);\r
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);\r
  if (count > 7) return uColor7;\r
  if (count > 6) return uColor6;\r
  if (count > 5) return uColor5;\r
  if (count > 4) return uColor4;\r
  if (count > 3) return uColor3;\r
  if (count > 2) return uColor2;\r
  return uColor1;\r
}\r
\r
void mainImage( out vec4 fragColor, in vec2 fragCoord )\r
{\r
    vec2 uv0 = fragCoord.xy / iResolution.xy;\r
\r
    float aspect = iResolution.x / iResolution.y;\r
    vec2 p = uv0 * 2.0 - 1.0;\r
    p.x *= aspect;\r
    vec2 pr = rotate2D(p, uAngle);\r
    pr.x /= aspect;\r
    vec2 uv = pr * 0.5 + 0.5;\r
\r
    vec2 uvMod = uv;\r
    if (uDistort > 0.0) {\r
      float a = uvMod.y * 6.0;\r
      float b = uvMod.x * 6.0;\r
      float w = 0.01 * uDistort;\r
      uvMod.x += sin(a) * w;\r
      uvMod.y += cos(b) * w;\r
    }\r
    float t = uvMod.x;\r
    if (uMirror > 0.5) {\r
      t = 1.0 - abs(1.0 - 2.0 * fract(t));\r
    }\r
    vec3 base = getGradientColor(t);\r
\r
    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);\r
  float d = length(uv0 - offset);\r
  float r = max(uSpotlightRadius, 1e-4);\r
  float dn = d / r;\r
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;\r
  vec3 cir = vec3(spot);\r
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));\r
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;\r
    vec3 ran = vec3(stripe);\r
\r
    vec3 col = cir + base - ran;\r
    col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;\r
\r
    fragColor = vec4(col, 1.0);\r
}\r
\r
void main() {\r
    vec4 color;\r
    mainImage(color, vUv * iResolution.xy);\r
    gl_FragColor = color;\r
}\r
\`;\r
\r
    const { arr: colorArr, count: colorCount } = prepStops(gradientColors);\r
    const uniforms: {\r
      iResolution: { value: [number, number, number] };\r
      iMouse: { value: [number, number] };\r
      iTime: { value: number };\r
      uAngle: { value: number };\r
      uNoise: { value: number };\r
      uBlindCount: { value: number };\r
      uSpotlightRadius: { value: number };\r
      uSpotlightSoftness: { value: number };\r
      uSpotlightOpacity: { value: number };\r
      uMirror: { value: number };\r
      uDistort: { value: number };\r
      uShineFlip: { value: number };\r
      uColor0: { value: [number, number, number] };\r
      uColor1: { value: [number, number, number] };\r
      uColor2: { value: [number, number, number] };\r
      uColor3: { value: [number, number, number] };\r
      uColor4: { value: [number, number, number] };\r
      uColor5: { value: [number, number, number] };\r
      uColor6: { value: [number, number, number] };\r
      uColor7: { value: [number, number, number] };\r
      uColorCount: { value: number };\r
    } = {\r
      iResolution: {\r
        value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]\r
      },\r
      iMouse: { value: [0, 0] },\r
      iTime: { value: 0 },\r
      uAngle: { value: (angle * Math.PI) / 180 },\r
      uNoise: { value: noise },\r
      uBlindCount: { value: Math.max(1, blindCount) },\r
      uSpotlightRadius: { value: spotlightRadius },\r
      uSpotlightSoftness: { value: spotlightSoftness },\r
      uSpotlightOpacity: { value: spotlightOpacity },\r
      uMirror: { value: mirrorGradient ? 1 : 0 },\r
      uDistort: { value: distortAmount },\r
      uShineFlip: { value: shineDirection === 'right' ? 1 : 0 },\r
      uColor0: { value: colorArr[0] },\r
      uColor1: { value: colorArr[1] },\r
      uColor2: { value: colorArr[2] },\r
      uColor3: { value: colorArr[3] },\r
      uColor4: { value: colorArr[4] },\r
      uColor5: { value: colorArr[5] },\r
      uColor6: { value: colorArr[6] },\r
      uColor7: { value: colorArr[7] },\r
      uColorCount: { value: colorCount }\r
    };\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms\r
    });\r
    programRef.current = program;\r
\r
    const geometry = new Triangle(gl);\r
    geometryRef.current = geometry;\r
    const mesh = new Mesh(gl, { geometry, program });\r
    meshRef.current = mesh;\r
\r
    const resize = () => {\r
      const rect = container.getBoundingClientRect();\r
      renderer.setSize(rect.width, rect.height);\r
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];\r
\r
      if (blindMinWidth && blindMinWidth > 0) {\r
        const maxByMinWidth = Math.max(1, Math.floor(rect.width / blindMinWidth));\r
\r
        const effective = blindCount ? Math.min(blindCount, maxByMinWidth) : maxByMinWidth;\r
        uniforms.uBlindCount.value = Math.max(1, effective);\r
      } else {\r
        uniforms.uBlindCount.value = Math.max(1, blindCount);\r
      }\r
\r
      if (firstResizeRef.current) {\r
        firstResizeRef.current = false;\r
        const cx = gl.drawingBufferWidth / 2;\r
        const cy = gl.drawingBufferHeight / 2;\r
        uniforms.iMouse.value = [cx, cy];\r
        mouseTargetRef.current = [cx, cy];\r
      }\r
    };\r
\r
    resize();\r
    const ro = new ResizeObserver(resize);\r
    ro.observe(container);\r
\r
    const onPointerMove = (e: PointerEvent) => {\r
      const rect = canvas.getBoundingClientRect();\r
      const scale = (renderer as unknown as { dpr?: number }).dpr || 1;\r
      const x = (e.clientX - rect.left) * scale;\r
      const y = (rect.height - (e.clientY - rect.top)) * scale;\r
      mouseTargetRef.current = [x, y];\r
      if (mouseDampening <= 0) {\r
        uniforms.iMouse.value = [x, y];\r
      }\r
    };\r
    canvas.addEventListener('pointermove', onPointerMove);\r
\r
    const loop = (t: number) => {\r
      rafRef.current = requestAnimationFrame(loop);\r
      uniforms.iTime.value = t * 0.001;\r
      if (mouseDampening > 0) {\r
        if (!lastTimeRef.current) lastTimeRef.current = t;\r
        const dt = (t - lastTimeRef.current) / 1000;\r
        lastTimeRef.current = t;\r
        const tau = Math.max(1e-4, mouseDampening);\r
        let factor = 1 - Math.exp(-dt / tau);\r
        if (factor > 1) factor = 1;\r
        const target = mouseTargetRef.current;\r
        const cur = uniforms.iMouse.value;\r
        cur[0] += (target[0] - cur[0]) * factor;\r
        cur[1] += (target[1] - cur[1]) * factor;\r
      } else {\r
        lastTimeRef.current = t;\r
      }\r
      if (!paused && programRef.current && meshRef.current) {\r
        try {\r
          renderer.render({ scene: meshRef.current });\r
        } catch (e) {\r
          console.error(e);\r
        }\r
      }\r
    };\r
    rafRef.current = requestAnimationFrame(loop);\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      canvas.removeEventListener('pointermove', onPointerMove);\r
      ro.disconnect();\r
      if (canvas.parentElement === container) {\r
        container.removeChild(canvas);\r
      }\r
      const callIfFn = <T extends object, K extends keyof T>(obj: T | null, key: K) => {\r
        if (obj && typeof obj[key] === 'function') {\r
          (obj[key] as unknown as () => void).call(obj);\r
        }\r
      };\r
      callIfFn(programRef.current, 'remove');\r
      callIfFn(geometryRef.current, 'remove');\r
      callIfFn(meshRef.current as unknown as { remove?: () => void }, 'remove');\r
      callIfFn(rendererRef.current as unknown as { destroy?: () => void }, 'destroy');\r
      programRef.current = null;\r
      geometryRef.current = null;\r
      meshRef.current = null;\r
      rendererRef.current = null;\r
    };\r
  }, [\r
    dpr,\r
    paused,\r
    gradientColors,\r
    angle,\r
    noise,\r
    blindCount,\r
    blindMinWidth,\r
    mouseDampening,\r
    mirrorGradient,\r
    spotlightRadius,\r
    spotlightSoftness,\r
    spotlightOpacity,\r
    distortAmount,\r
    shineDirection\r
  ]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`gradient-blinds-container \${className}\`}\r
      style={{\r
        ...(mixBlendMode && {\r
          mixBlendMode: mixBlendMode as React.CSSProperties['mixBlendMode']\r
        })\r
      }}\r
    />\r
  );\r
};\r
\r
export default GradientBlinds;\r
`,Cr=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
\r
export interface GradientBlindsProps {\r
  className?: string;\r
  dpr?: number;\r
  paused?: boolean;\r
  gradientColors?: string[];\r
  angle?: number;\r
  noise?: number;\r
  blindCount?: number;\r
  blindMinWidth?: number;\r
  mouseDampening?: number;\r
  mirrorGradient?: boolean;\r
  spotlightRadius?: number;\r
  spotlightSoftness?: number;\r
  spotlightOpacity?: number;\r
  distortAmount?: number;\r
  shineDirection?: 'left' | 'right';\r
  mixBlendMode?: string;\r
}\r
\r
const MAX_COLORS = 8;\r
const hexToRGB = (hex: string): [number, number, number] => {\r
  const c = hex.replace('#', '').padEnd(6, '0');\r
  const r = parseInt(c.slice(0, 2), 16) / 255;\r
  const g = parseInt(c.slice(2, 4), 16) / 255;\r
  const b = parseInt(c.slice(4, 6), 16) / 255;\r
  return [r, g, b];\r
};\r
const prepStops = (stops?: string[]) => {\r
  const base = (stops && stops.length ? stops : ['#FF9FFC', '#5227FF']).slice(0, MAX_COLORS);\r
  if (base.length === 1) base.push(base[0]);\r
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);\r
  const arr: [number, number, number][] = [];\r
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]));\r
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2));\r
  return { arr, count };\r
};\r
\r
const GradientBlinds: React.FC<GradientBlindsProps> = ({\r
  className,\r
  dpr,\r
  paused = false,\r
  gradientColors,\r
  angle = 0,\r
  noise = 0.3,\r
  blindCount = 16,\r
  blindMinWidth = 60,\r
  mouseDampening = 0.15,\r
  mirrorGradient = false,\r
  spotlightRadius = 0.5,\r
  spotlightSoftness = 1,\r
  spotlightOpacity = 1,\r
  distortAmount = 0,\r
  shineDirection = 'left',\r
  mixBlendMode = 'lighten'\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const rafRef = useRef<number | null>(null);\r
  const programRef = useRef<Program | null>(null);\r
  const meshRef = useRef<Mesh<Triangle> | null>(null);\r
  const geometryRef = useRef<Triangle | null>(null);\r
  const rendererRef = useRef<Renderer | null>(null);\r
  const mouseTargetRef = useRef<[number, number]>([0, 0]);\r
  const lastTimeRef = useRef<number>(0);\r
  const firstResizeRef = useRef<boolean>(true);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({\r
      dpr: dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),\r
      alpha: true,\r
      antialias: true\r
    });\r
    rendererRef.current = renderer;\r
    const gl = renderer.gl;\r
    const canvas = gl.canvas as HTMLCanvasElement;\r
\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    canvas.style.display = 'block';\r
    container.appendChild(canvas);\r
\r
    const vertex = \`\r
attribute vec2 position;\r
attribute vec2 uv;\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
    const fragment = \`\r
#ifdef GL_ES\r
precision mediump float;\r
#endif\r
\r
uniform vec3  iResolution;\r
uniform vec2  iMouse;\r
uniform float iTime;\r
\r
uniform float uAngle;\r
uniform float uNoise;\r
uniform float uBlindCount;\r
uniform float uSpotlightRadius;\r
uniform float uSpotlightSoftness;\r
uniform float uSpotlightOpacity;\r
uniform float uMirror;\r
uniform float uDistort;\r
uniform float uShineFlip;\r
uniform vec3  uColor0;\r
uniform vec3  uColor1;\r
uniform vec3  uColor2;\r
uniform vec3  uColor3;\r
uniform vec3  uColor4;\r
uniform vec3  uColor5;\r
uniform vec3  uColor6;\r
uniform vec3  uColor7;\r
uniform int   uColorCount;\r
\r
varying vec2 vUv;\r
\r
float rand(vec2 co){\r
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
vec2 rotate2D(vec2 p, float a){\r
  float c = cos(a);\r
  float s = sin(a);\r
  return mat2(c, -s, s, c) * p;\r
}\r
\r
vec3 getGradientColor(float t){\r
  float tt = clamp(t, 0.0, 1.0);\r
  int count = uColorCount;\r
  if (count < 2) count = 2;\r
  float scaled = tt * float(count - 1);\r
  float seg = floor(scaled);\r
  float f = fract(scaled);\r
\r
  if (seg < 1.0) return mix(uColor0, uColor1, f);\r
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);\r
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);\r
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);\r
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);\r
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);\r
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);\r
  if (count > 7) return uColor7;\r
  if (count > 6) return uColor6;\r
  if (count > 5) return uColor5;\r
  if (count > 4) return uColor4;\r
  if (count > 3) return uColor3;\r
  if (count > 2) return uColor2;\r
  return uColor1;\r
}\r
\r
void mainImage( out vec4 fragColor, in vec2 fragCoord )\r
{\r
    vec2 uv0 = fragCoord.xy / iResolution.xy;\r
\r
    float aspect = iResolution.x / iResolution.y;\r
    vec2 p = uv0 * 2.0 - 1.0;\r
    p.x *= aspect;\r
    vec2 pr = rotate2D(p, uAngle);\r
    pr.x /= aspect;\r
    vec2 uv = pr * 0.5 + 0.5;\r
\r
    vec2 uvMod = uv;\r
    if (uDistort > 0.0) {\r
      float a = uvMod.y * 6.0;\r
      float b = uvMod.x * 6.0;\r
      float w = 0.01 * uDistort;\r
      uvMod.x += sin(a) * w;\r
      uvMod.y += cos(b) * w;\r
    }\r
    float t = uvMod.x;\r
    if (uMirror > 0.5) {\r
      t = 1.0 - abs(1.0 - 2.0 * fract(t));\r
    }\r
    vec3 base = getGradientColor(t);\r
\r
    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);\r
  float d = length(uv0 - offset);\r
  float r = max(uSpotlightRadius, 1e-4);\r
  float dn = d / r;\r
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;\r
  vec3 cir = vec3(spot);\r
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));\r
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;\r
    vec3 ran = vec3(stripe);\r
\r
    vec3 col = cir + base - ran;\r
    col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;\r
\r
    fragColor = vec4(col, 1.0);\r
}\r
\r
void main() {\r
    vec4 color;\r
    mainImage(color, vUv * iResolution.xy);\r
    gl_FragColor = color;\r
}\r
\`;\r
\r
    const { arr: colorArr, count: colorCount } = prepStops(gradientColors);\r
    const uniforms: {\r
      iResolution: { value: [number, number, number] };\r
      iMouse: { value: [number, number] };\r
      iTime: { value: number };\r
      uAngle: { value: number };\r
      uNoise: { value: number };\r
      uBlindCount: { value: number };\r
      uSpotlightRadius: { value: number };\r
      uSpotlightSoftness: { value: number };\r
      uSpotlightOpacity: { value: number };\r
      uMirror: { value: number };\r
      uDistort: { value: number };\r
      uShineFlip: { value: number };\r
      uColor0: { value: [number, number, number] };\r
      uColor1: { value: [number, number, number] };\r
      uColor2: { value: [number, number, number] };\r
      uColor3: { value: [number, number, number] };\r
      uColor4: { value: [number, number, number] };\r
      uColor5: { value: [number, number, number] };\r
      uColor6: { value: [number, number, number] };\r
      uColor7: { value: [number, number, number] };\r
      uColorCount: { value: number };\r
    } = {\r
      iResolution: {\r
        value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]\r
      },\r
      iMouse: { value: [0, 0] },\r
      iTime: { value: 0 },\r
      uAngle: { value: (angle * Math.PI) / 180 },\r
      uNoise: { value: noise },\r
      uBlindCount: { value: Math.max(1, blindCount) },\r
      uSpotlightRadius: { value: spotlightRadius },\r
      uSpotlightSoftness: { value: spotlightSoftness },\r
      uSpotlightOpacity: { value: spotlightOpacity },\r
      uMirror: { value: mirrorGradient ? 1 : 0 },\r
      uDistort: { value: distortAmount },\r
      uShineFlip: { value: shineDirection === 'right' ? 1 : 0 },\r
      uColor0: { value: colorArr[0] },\r
      uColor1: { value: colorArr[1] },\r
      uColor2: { value: colorArr[2] },\r
      uColor3: { value: colorArr[3] },\r
      uColor4: { value: colorArr[4] },\r
      uColor5: { value: colorArr[5] },\r
      uColor6: { value: colorArr[6] },\r
      uColor7: { value: colorArr[7] },\r
      uColorCount: { value: colorCount }\r
    };\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms\r
    });\r
    programRef.current = program;\r
\r
    const geometry = new Triangle(gl);\r
    geometryRef.current = geometry;\r
    const mesh = new Mesh(gl, { geometry, program });\r
    meshRef.current = mesh;\r
\r
    const resize = () => {\r
      const rect = container.getBoundingClientRect();\r
      renderer.setSize(rect.width, rect.height);\r
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];\r
\r
      if (blindMinWidth && blindMinWidth > 0) {\r
        const maxByMinWidth = Math.max(1, Math.floor(rect.width / blindMinWidth));\r
\r
        const effective = blindCount ? Math.min(blindCount, maxByMinWidth) : maxByMinWidth;\r
        uniforms.uBlindCount.value = Math.max(1, effective);\r
      } else {\r
        uniforms.uBlindCount.value = Math.max(1, blindCount);\r
      }\r
\r
      if (firstResizeRef.current) {\r
        firstResizeRef.current = false;\r
        const cx = gl.drawingBufferWidth / 2;\r
        const cy = gl.drawingBufferHeight / 2;\r
        uniforms.iMouse.value = [cx, cy];\r
        mouseTargetRef.current = [cx, cy];\r
      }\r
    };\r
\r
    resize();\r
    const ro = new ResizeObserver(resize);\r
    ro.observe(container);\r
\r
    const onPointerMove = (e: PointerEvent) => {\r
      const rect = canvas.getBoundingClientRect();\r
      const scale = (renderer as unknown as { dpr?: number }).dpr || 1;\r
      const x = (e.clientX - rect.left) * scale;\r
      const y = (rect.height - (e.clientY - rect.top)) * scale;\r
      mouseTargetRef.current = [x, y];\r
      if (mouseDampening <= 0) {\r
        uniforms.iMouse.value = [x, y];\r
      }\r
    };\r
    canvas.addEventListener('pointermove', onPointerMove);\r
\r
    const loop = (t: number) => {\r
      rafRef.current = requestAnimationFrame(loop);\r
      uniforms.iTime.value = t * 0.001;\r
      if (mouseDampening > 0) {\r
        if (!lastTimeRef.current) lastTimeRef.current = t;\r
        const dt = (t - lastTimeRef.current) / 1000;\r
        lastTimeRef.current = t;\r
        const tau = Math.max(1e-4, mouseDampening);\r
        let factor = 1 - Math.exp(-dt / tau);\r
        if (factor > 1) factor = 1;\r
        const target = mouseTargetRef.current;\r
        const cur = uniforms.iMouse.value;\r
        cur[0] += (target[0] - cur[0]) * factor;\r
        cur[1] += (target[1] - cur[1]) * factor;\r
      } else {\r
        lastTimeRef.current = t;\r
      }\r
      if (!paused && programRef.current && meshRef.current) {\r
        try {\r
          renderer.render({ scene: meshRef.current });\r
        } catch (e) {\r
          console.error(e);\r
        }\r
      }\r
    };\r
    rafRef.current = requestAnimationFrame(loop);\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      canvas.removeEventListener('pointermove', onPointerMove);\r
      ro.disconnect();\r
      if (canvas.parentElement === container) {\r
        container.removeChild(canvas);\r
      }\r
      const callIfFn = <T extends object, K extends keyof T>(obj: T | null, key: K) => {\r
        if (obj && typeof obj[key] === 'function') {\r
          (obj[key] as unknown as () => void).call(obj);\r
        }\r
      };\r
      callIfFn(programRef.current, 'remove');\r
      callIfFn(geometryRef.current, 'remove');\r
      callIfFn(meshRef.current as unknown as { remove?: () => void }, 'remove');\r
      callIfFn(rendererRef.current as unknown as { destroy?: () => void }, 'destroy');\r
      programRef.current = null;\r
      geometryRef.current = null;\r
      meshRef.current = null;\r
      rendererRef.current = null;\r
    };\r
  }, [\r
    dpr,\r
    paused,\r
    gradientColors,\r
    angle,\r
    noise,\r
    blindCount,\r
    blindMinWidth,\r
    mouseDampening,\r
    mirrorGradient,\r
    spotlightRadius,\r
    spotlightSoftness,\r
    spotlightOpacity,\r
    distortAmount,\r
    shineDirection\r
  ]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`w-full h-full overflow-hidden relative \${className}\`}\r
      style={{\r
        ...(mixBlendMode && {\r
          mixBlendMode: mixBlendMode as React.CSSProperties['mixBlendMode']\r
        })\r
      }}\r
    />\r
  );\r
};\r
\r
export default GradientBlinds;\r
`,Rr={dependencies:"ogl",usage:`import GradientBlinds from './GradientBlinds';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <GradientBlinds
    gradientColors={['#FF9FFC', '#5227FF']}
    angle={0}
    noise={0.3}
    blindCount={12}
    blindMinWidth={50}
    spotlightRadius={0.5}
    spotlightSoftness={1}
    spotlightOpacity={1}
    mouseDampening={0.15}
    distortAmount={0}
    shineDirection="left"
    mixBlendMode="lighten"
  />
</div>`,code:vr,css:gr,tailwind:pr,tsCode:hr,tsTailwind:Cr},z=8,br=i=>{const o=i.replace("#","").padEnd(6,"0"),a=parseInt(o.slice(0,2),16)/255,f=parseInt(o.slice(2,4),16)/255,l=parseInt(o.slice(4,6),16)/255;return[a,f,l]},xr=i=>{const o=(i&&i.length?i:["#FF9FFC","#5227FF"]).slice(0,z);for(o.length===1&&o.push(o[0]);o.length<z;)o.push(o[o.length-1]);const a=[];for(let l=0;l<z;l++)a.push(br(o[l]));const f=Math.max(2,Math.min(z,(i==null?void 0:i.length)??2));return{arr:a,count:f}},Mr=({className:i,dpr:o,paused:a=!1,gradientColors:f,angle:l=0,noise:I=.3,blindCount:m=16,blindMinWidth:x=60,mouseDampening:g=.15,mirrorGradient:P=!1,spotlightRadius:S=.5,spotlightSoftness:W=1,spotlightOpacity:w=1,distortAmount:j=0,shineDirection:B="left",mixBlendMode:E="lighten"})=>{const F=n.useRef(null),M=n.useRef(null),p=n.useRef(null),h=n.useRef(null),A=n.useRef(null),T=n.useRef(null),C=n.useRef([0,0]),D=n.useRef(0),N=n.useRef(!0);return n.useEffect(()=>{const y=F.current;if(!y)return;const O=new rr({dpr:o??(typeof window<"u"&&window.devicePixelRatio||1),alpha:!0,antialias:!0});T.current=O;const s=O.gl,c=s.canvas;c.style.width="100%",c.style.height="100%",c.style.display="block",y.appendChild(c);const V=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,J=`
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;

uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;

varying vec2 vUv;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rotate2D(vec2 p, float a){
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec3 getGradientColor(float t){
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount;
  if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float seg = floor(scaled);
  float f = fract(scaled);

  if (seg < 1.0) return mix(uColor0, uColor1, f);
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv0 = fragCoord.xy / iResolution.xy;

    float aspect = iResolution.x / iResolution.y;
    vec2 p = uv0 * 2.0 - 1.0;
    p.x *= aspect;
    vec2 pr = rotate2D(p, uAngle);
    pr.x /= aspect;
    vec2 uv = pr * 0.5 + 0.5;

    vec2 uvMod = uv;
    if (uDistort > 0.0) {
      float a = uvMod.y * 6.0;
      float b = uvMod.x * 6.0;
      float w = 0.01 * uDistort;
      uvMod.x += sin(a) * w;
      uvMod.y += cos(b) * w;
    }
    float t = uvMod.x;
    if (uMirror > 0.5) {
      t = 1.0 - abs(1.0 - 2.0 * fract(t));
    }
    vec3 base = getGradientColor(t);

    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 1e-4);
  float dn = d / r;
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;
  vec3 cir = vec3(spot);
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;
    vec3 ran = vec3(stripe);

    vec3 col = cir + base - ran;
    col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;

    fragColor = vec4(col, 1.0);
}

void main() {
    vec4 color;
    mainImage(color, vUv * iResolution.xy);
    gl_FragColor = color;
}
`,{arr:d,count:Q}=xr(f),v={iResolution:{value:[s.drawingBufferWidth,s.drawingBufferHeight,1]},iMouse:{value:[0,0]},iTime:{value:0},uAngle:{value:l*Math.PI/180},uNoise:{value:I},uBlindCount:{value:Math.max(1,m)},uSpotlightRadius:{value:S},uSpotlightSoftness:{value:W},uSpotlightOpacity:{value:w},uMirror:{value:P?1:0},uDistort:{value:j},uShineFlip:{value:B==="right"?1:0},uColor0:{value:d[0]},uColor1:{value:d[1]},uColor2:{value:d[2]},uColor3:{value:d[3]},uColor4:{value:d[4]},uColor5:{value:d[5]},uColor6:{value:d[6]},uColor7:{value:d[7]},uColorCount:{value:Q}},k=new nr(s,{vertex:V,fragment:J,uniforms:v});p.current=k;const X=new dr(s);A.current=X;const Z=new er(s,{geometry:X,program:k});h.current=Z;const U=()=>{const t=y.getBoundingClientRect();if(O.setSize(t.width,t.height),v.iResolution.value=[s.drawingBufferWidth,s.drawingBufferHeight,1],x&&x>0){const e=Math.max(1,Math.floor(t.width/x)),u=m?Math.min(m,e):e;v.uBlindCount.value=Math.max(1,u)}else v.uBlindCount.value=Math.max(1,m);if(N.current){N.current=!1;const e=s.drawingBufferWidth/2,u=s.drawingBufferHeight/2;v.iMouse.value=[e,u],C.current=[e,u]}};U();const H=new ResizeObserver(U);H.observe(y);const q=t=>{const e=c.getBoundingClientRect(),u=O.dpr||1,R=(t.clientX-e.left)*u,G=(e.height-(t.clientY-e.top))*u;C.current=[R,G],g<=0&&(v.iMouse.value=[R,G])};c.addEventListener("pointermove",q);const Y=t=>{if(M.current=requestAnimationFrame(Y),v.iTime.value=t*.001,g>0){D.current||(D.current=t);const e=(t-D.current)/1e3;D.current=t;const u=Math.max(1e-4,g);let R=1-Math.exp(-e/u);R>1&&(R=1);const G=C.current,L=v.iMouse.value;L[0]+=(G[0]-L[0])*R,L[1]+=(G[1]-L[1])*R}else D.current=t;if(!a&&p.current&&h.current)try{O.render({scene:h.current})}catch(e){console.error(e)}};return M.current=requestAnimationFrame(Y),()=>{M.current&&cancelAnimationFrame(M.current),c.removeEventListener("pointermove",q),H.disconnect(),c.parentElement===y&&y.removeChild(c);const t=(e,u)=>{e&&typeof e[u]=="function"&&e[u].call(e)};t(p.current,"remove"),t(A.current,"remove"),t(h.current,"remove"),t(T.current,"destroy"),p.current=null,A.current=null,h.current=null,T.current=null}},[o,a,f,l,I,m,x,g,P,S,W,w,j,B]),r.jsx("div",{ref:F,className:`gradient-blinds-container ${i}`,style:{...E&&{mixBlendMode:E}}})},Pr=()=>{const[i,o]=n.useState("#FF9FFC"),[a,f]=n.useState("#5227FF"),[l,I]=n.useState(20),[m,x]=n.useState(.5),[g,P]=n.useState(16),[S,W]=n.useState(60),[w,j]=n.useState(.5),[B,E]=n.useState(0),[F,M]=n.useState(.15),[p,h]=n.useState("left"),A=[i,a],T=[{name:"gradientColors",type:"string[]",default:"['#FF9FFC', '#5227FF']",description:"Array of hex colors (up to 8) forming the animated gradient. If one color is provided it is duplicated."},{name:"angle",type:"number",default:0,description:"Rotation of the gradient in degrees (0 = horizontal left→right)."},{name:"noise",type:"number",default:.3,description:"Strength of per‑pixel noise added to the final color (0 = clean)."},{name:"blindCount",type:"number",default:16,description:"Target number of vertical blinds. Acts as an upper bound when blindMinWidth is set."},{name:"blindMinWidth",type:"number",default:60,description:"Minimum pixel width for each blind. Reduces effective blindCount if necessary to satisfy this width."},{name:"mouseDampening",type:"number",default:.15,description:"Easing time constant (seconds) for the spotlight to follow the cursor. 0 = immediate."},{name:"mirrorGradient",type:"boolean",default:!1,description:"Creates a mirrored ping‑pong gradient progression instead of a linear wrap."},{name:"spotlightRadius",type:"number",default:.5,description:"Normalized spotlight radius relative to the shorter canvas dimension."},{name:"spotlightSoftness",type:"number",default:1,description:"Falloff exponent for spotlight edge. Higher = sharper edge (values >1 increase contrast)."},{name:"spotlightOpacity",type:"number",default:1,description:"Overall intensity multiplier for the spotlight highlight."},{name:"distortAmount",type:"number",default:0,description:"Sin/cos warp intensity applied to UVs for subtle wavy distortion."},{name:"shineDirection",type:"'left' | 'right'",default:"left",description:"Flips the bright side of each blind; useful for composition with other elements."},{name:"mixBlendMode",type:"string",default:"'lighten'",description:"CSS mix-blend-mode applied to the canvas (e.g. 'screen', 'overlay', 'multiply')."},{name:"paused",type:"boolean",default:!1,description:"If true, stops rendering updates (freezing the current frame)."},{name:"dpr",type:"number",default:"window.devicePixelRatio",description:"Overrides device pixel ratio; lower for performance, higher for sharpness."},{name:"className",type:"string",default:"",description:"Additional class names for the root container."}];return r.jsxs(tr,{children:[r.jsxs(ir,{children:[r.jsxs(or,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[r.jsx(Mr,{gradientColors:A,angle:l,noise:m,blindCount:g,blindMinWidth:S,spotlightRadius:w,distortAmount:B,mouseDampening:F,shineDirection:p}),r.jsx(mr,{pillText:"New Background",headline:"Smooth gradients make everything better"})]}),r.jsxs(sr,{children:[r.jsxs(_,{alignItems:"center",mb:4,gap:4,wrap:"wrap",children:[r.jsxs(_,{alignItems:"center",mb:2,gap:2,children:[r.jsx($,{fontSize:"sm",children:"Color 1"}),r.jsx(K,{type:"color",value:i,width:"50px",onChange:C=>o(C.target.value)})]}),r.jsxs(_,{alignItems:"center",mb:2,gap:2,children:[r.jsx($,{fontSize:"sm",children:"Color 2"}),r.jsx(K,{type:"color",value:a,width:"50px",onChange:C=>f(C.target.value)})]})]}),r.jsx(fr,{title:"Light Direction",value:p,onChange:h,options:[{label:"Left",value:"left"},{label:"Right",value:"right"}]}),r.jsx(b,{title:"Blinds Angle",min:0,max:360,step:1,value:l,onChange:I}),r.jsx(b,{title:"Noise Amount",min:0,max:1,step:.01,value:m,onChange:x}),r.jsx(b,{title:"Blinds Count",min:1,max:64,step:1,value:g,onChange:P}),r.jsx(b,{title:"Min Blind W",min:10,max:200,step:5,value:S,onChange:W}),r.jsx(b,{title:"Spot Radius",min:.05,max:1,step:.05,value:w,onChange:j}),r.jsx(b,{title:"Distort",min:0,max:100,step:1,value:B,onChange:E}),r.jsx(b,{title:"Mouse Damp",min:0,max:1,step:.01,value:F,onChange:M})]}),r.jsx(ur,{data:T}),r.jsx(cr,{dependencyList:["ogl"]})]}),r.jsx(lr,{children:r.jsx(ar,{codeObject:Rr})})]})};export{Pr as default};
