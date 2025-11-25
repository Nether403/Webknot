import{r as e,j as o,R as k,P as X,M as Y,B as J,F as K,T as Q,d as Z}from"./index-wsKSLPNH.js";import{T as rr,P as nr,a as er,C as or,b as tr}from"./PropTable-C4uPWs8h.js";import{C as ir}from"./Customize-1m_ZNqR9.js";import{B as sr}from"./BackgroundContent-CqU7Wlm2.js";import{D as ar}from"./Dependencies-BHoMfJUj.js";import{P as p}from"./PreviewSlider-m1G_aiYP.js";import{P as ur}from"./PreviewSwitch-DqnF708j.js";import{P as cr}from"./PreviewSelect-B8u33nUa.js";import{u as lr}from"./useForceRerender-BCFU-k0M.js";import{T as fr}from"./Triangle-66-Bqe-c.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const dr=`import { useRef, useEffect, useState } from 'react';\r
import { Renderer, Program, Triangle, Mesh } from 'ogl';\r
import './LightRays.css';\r
\r
const DEFAULT_COLOR = '#ffffff';\r
\r
const hexToRgb = hex => {\r
  const m = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];\r
};\r
\r
const getAnchorAndDir = (origin, w, h) => {\r
  const outside = 0.2;\r
  switch (origin) {\r
    case 'top-left':\r
      return { anchor: [0, -outside * h], dir: [0, 1] };\r
    case 'top-right':\r
      return { anchor: [w, -outside * h], dir: [0, 1] };\r
    case 'left':\r
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };\r
    case 'right':\r
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };\r
    case 'bottom-left':\r
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };\r
    case 'bottom-center':\r
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };\r
    case 'bottom-right':\r
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };\r
    default: // "top-center"\r
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };\r
  }\r
};\r
\r
const LightRays = ({\r
  raysOrigin = 'top-center',\r
  raysColor = DEFAULT_COLOR,\r
  raysSpeed = 1,\r
  lightSpread = 1,\r
  rayLength = 2,\r
  pulsating = false,\r
  fadeDistance = 1.0,\r
  saturation = 1.0,\r
  followMouse = true,\r
  mouseInfluence = 0.1,\r
  noiseAmount = 0.0,\r
  distortion = 0.0,\r
  className = ''\r
}) => {\r
  const containerRef = useRef(null);\r
  const uniformsRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const mouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const animationIdRef = useRef(null);\r
  const meshRef = useRef(null);\r
  const cleanupFunctionRef = useRef(null);\r
  const [isVisible, setIsVisible] = useState(false);\r
  const observerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    observerRef.current = new IntersectionObserver(\r
      entries => {\r
        const entry = entries[0];\r
        setIsVisible(entry.isIntersecting);\r
      },\r
      { threshold: 0.1 }\r
    );\r
\r
    observerRef.current.observe(containerRef.current);\r
\r
    return () => {\r
      if (observerRef.current) {\r
        observerRef.current.disconnect();\r
        observerRef.current = null;\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!isVisible || !containerRef.current) return;\r
\r
    if (cleanupFunctionRef.current) {\r
      cleanupFunctionRef.current();\r
      cleanupFunctionRef.current = null;\r
    }\r
\r
    const initializeWebGL = async () => {\r
      if (!containerRef.current) return;\r
\r
      await new Promise(resolve => setTimeout(resolve, 10));\r
\r
      if (!containerRef.current) return;\r
\r
      const renderer = new Renderer({\r
        dpr: Math.min(window.devicePixelRatio, 2),\r
        alpha: true\r
      });\r
      rendererRef.current = renderer;\r
\r
      const gl = renderer.gl;\r
      gl.canvas.style.width = '100%';\r
      gl.canvas.style.height = '100%';\r
\r
      while (containerRef.current.firstChild) {\r
        containerRef.current.removeChild(containerRef.current.firstChild);\r
      }\r
      containerRef.current.appendChild(gl.canvas);\r
\r
      const vert = \`\r
attribute vec2 position;\r
varying vec2 vUv;\r
void main() {\r
  vUv = position * 0.5 + 0.5;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\`;\r
\r
      const frag = \`precision highp float;\r
\r
uniform float iTime;\r
uniform vec2  iResolution;\r
\r
uniform vec2  rayPos;\r
uniform vec2  rayDir;\r
uniform vec3  raysColor;\r
uniform float raysSpeed;\r
uniform float lightSpread;\r
uniform float rayLength;\r
uniform float pulsating;\r
uniform float fadeDistance;\r
uniform float saturation;\r
uniform vec2  mousePos;\r
uniform float mouseInfluence;\r
uniform float noiseAmount;\r
uniform float distortion;\r
\r
varying vec2 vUv;\r
\r
float noise(vec2 st) {\r
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);\r
}\r
\r
float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,\r
                  float seedA, float seedB, float speed) {\r
  vec2 sourceToCoord = coord - raySource;\r
  vec2 dirNorm = normalize(sourceToCoord);\r
  float cosAngle = dot(dirNorm, rayRefDirection);\r
\r
  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;\r
  \r
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));\r
\r
  float distance = length(sourceToCoord);\r
  float maxDistance = iResolution.x * rayLength;\r
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);\r
  \r
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);\r
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;\r
\r
  float baseStrength = clamp(\r
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +\r
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),\r
    0.0, 1.0\r
  );\r
\r
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);\r
  \r
  vec2 finalRayDir = rayDir;\r
  if (mouseInfluence > 0.0) {\r
    vec2 mouseScreenPos = mousePos * iResolution.xy;\r
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);\r
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));\r
  }\r
\r
  vec4 rays1 = vec4(1.0) *\r
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,\r
                           1.5 * raysSpeed);\r
  vec4 rays2 = vec4(1.0) *\r
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,\r
                           1.1 * raysSpeed);\r
\r
  fragColor = rays1 * 0.5 + rays2 * 0.4;\r
\r
  if (noiseAmount > 0.0) {\r
    float n = noise(coord * 0.01 + iTime * 0.1);\r
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);\r
  }\r
\r
  float brightness = 1.0 - (coord.y / iResolution.y);\r
  fragColor.x *= 0.1 + brightness * 0.8;\r
  fragColor.y *= 0.3 + brightness * 0.6;\r
  fragColor.z *= 0.5 + brightness * 0.5;\r
\r
  if (saturation != 1.0) {\r
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));\r
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);\r
  }\r
\r
  fragColor.rgb *= raysColor;\r
}\r
\r
void main() {\r
  vec4 color;\r
  mainImage(color, gl_FragCoord.xy);\r
  gl_FragColor  = color;\r
}\`;\r
\r
      const uniforms = {\r
        iTime: { value: 0 },\r
        iResolution: { value: [1, 1] },\r
\r
        rayPos: { value: [0, 0] },\r
        rayDir: { value: [0, 1] },\r
\r
        raysColor: { value: hexToRgb(raysColor) },\r
        raysSpeed: { value: raysSpeed },\r
        lightSpread: { value: lightSpread },\r
        rayLength: { value: rayLength },\r
        pulsating: { value: pulsating ? 1.0 : 0.0 },\r
        fadeDistance: { value: fadeDistance },\r
        saturation: { value: saturation },\r
        mousePos: { value: [0.5, 0.5] },\r
        mouseInfluence: { value: mouseInfluence },\r
        noiseAmount: { value: noiseAmount },\r
        distortion: { value: distortion }\r
      };\r
      uniformsRef.current = uniforms;\r
\r
      const geometry = new Triangle(gl);\r
      const program = new Program(gl, {\r
        vertex: vert,\r
        fragment: frag,\r
        uniforms\r
      });\r
      const mesh = new Mesh(gl, { geometry, program });\r
      meshRef.current = mesh;\r
\r
      const updatePlacement = () => {\r
        if (!containerRef.current || !renderer) return;\r
\r
        renderer.dpr = Math.min(window.devicePixelRatio, 2);\r
\r
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;\r
        renderer.setSize(wCSS, hCSS);\r
\r
        const dpr = renderer.dpr;\r
        const w = wCSS * dpr;\r
        const h = hCSS * dpr;\r
\r
        uniforms.iResolution.value = [w, h];\r
\r
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);\r
        uniforms.rayPos.value = anchor;\r
        uniforms.rayDir.value = dir;\r
      };\r
\r
      const loop = t => {\r
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {\r
          return;\r
        }\r
\r
        uniforms.iTime.value = t * 0.001;\r
\r
        if (followMouse && mouseInfluence > 0.0) {\r
          const smoothing = 0.92;\r
\r
          smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);\r
          smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);\r
\r
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];\r
        }\r
\r
        try {\r
          renderer.render({ scene: mesh });\r
          animationIdRef.current = requestAnimationFrame(loop);\r
        } catch (error) {\r
          console.warn('WebGL rendering error:', error);\r
          return;\r
        }\r
      };\r
\r
      window.addEventListener('resize', updatePlacement);\r
      updatePlacement();\r
      animationIdRef.current = requestAnimationFrame(loop);\r
\r
      cleanupFunctionRef.current = () => {\r
        if (animationIdRef.current) {\r
          cancelAnimationFrame(animationIdRef.current);\r
          animationIdRef.current = null;\r
        }\r
\r
        window.removeEventListener('resize', updatePlacement);\r
\r
        if (renderer) {\r
          try {\r
            const canvas = renderer.gl.canvas;\r
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');\r
            if (loseContextExt) {\r
              loseContextExt.loseContext();\r
            }\r
\r
            if (canvas && canvas.parentNode) {\r
              canvas.parentNode.removeChild(canvas);\r
            }\r
          } catch (error) {\r
            console.warn('Error during WebGL cleanup:', error);\r
          }\r
        }\r
\r
        rendererRef.current = null;\r
        uniformsRef.current = null;\r
        meshRef.current = null;\r
      };\r
    };\r
\r
    initializeWebGL();\r
\r
    return () => {\r
      if (cleanupFunctionRef.current) {\r
        cleanupFunctionRef.current();\r
        cleanupFunctionRef.current = null;\r
      }\r
    };\r
  }, [\r
    isVisible,\r
    raysOrigin,\r
    raysColor,\r
    raysSpeed,\r
    lightSpread,\r
    rayLength,\r
    pulsating,\r
    fadeDistance,\r
    saturation,\r
    followMouse,\r
    mouseInfluence,\r
    noiseAmount,\r
    distortion\r
  ]);\r
\r
  useEffect(() => {\r
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) return;\r
\r
    const u = uniformsRef.current;\r
    const renderer = rendererRef.current;\r
\r
    u.raysColor.value = hexToRgb(raysColor);\r
    u.raysSpeed.value = raysSpeed;\r
    u.lightSpread.value = lightSpread;\r
    u.rayLength.value = rayLength;\r
    u.pulsating.value = pulsating ? 1.0 : 0.0;\r
    u.fadeDistance.value = fadeDistance;\r
    u.saturation.value = saturation;\r
    u.mouseInfluence.value = mouseInfluence;\r
    u.noiseAmount.value = noiseAmount;\r
    u.distortion.value = distortion;\r
\r
    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;\r
    const dpr = renderer.dpr;\r
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);\r
    u.rayPos.value = anchor;\r
    u.rayDir.value = dir;\r
  }, [\r
    raysColor,\r
    raysSpeed,\r
    lightSpread,\r
    raysOrigin,\r
    rayLength,\r
    pulsating,\r
    fadeDistance,\r
    saturation,\r
    mouseInfluence,\r
    noiseAmount,\r
    distortion\r
  ]);\r
\r
  useEffect(() => {\r
    const handleMouseMove = e => {\r
      if (!containerRef.current || !rendererRef.current) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = (e.clientY - rect.top) / rect.height;\r
      mouseRef.current = { x, y };\r
    };\r
\r
    if (followMouse) {\r
      window.addEventListener('mousemove', handleMouseMove);\r
      return () => window.removeEventListener('mousemove', handleMouseMove);\r
    }\r
  }, [followMouse]);\r
\r
  return <div ref={containerRef} className={\`light-rays-container \${className}\`.trim()} />;\r
};\r
\r
export default LightRays;\r
`,mr=`.light-rays-container {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
  pointer-events: none;\r
  z-index: 3;\r
  overflow: hidden;\r
}\r
`,gr=`import { useRef, useEffect, useState } from 'react';\r
import { Renderer, Program, Triangle, Mesh } from 'ogl';\r
\r
const DEFAULT_COLOR = '#ffffff';\r
\r
const hexToRgb = hex => {\r
  const m = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];\r
};\r
\r
const getAnchorAndDir = (origin, w, h) => {\r
  const outside = 0.2;\r
  switch (origin) {\r
    case 'top-left':\r
      return { anchor: [0, -outside * h], dir: [0, 1] };\r
    case 'top-right':\r
      return { anchor: [w, -outside * h], dir: [0, 1] };\r
    case 'left':\r
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };\r
    case 'right':\r
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };\r
    case 'bottom-left':\r
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };\r
    case 'bottom-center':\r
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };\r
    case 'bottom-right':\r
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };\r
    default: // "top-center"\r
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };\r
  }\r
};\r
\r
const LightRays = ({\r
  raysOrigin = 'top-center',\r
  raysColor = DEFAULT_COLOR,\r
  raysSpeed = 1,\r
  lightSpread = 1,\r
  rayLength = 2,\r
  pulsating = false,\r
  fadeDistance = 1.0,\r
  saturation = 1.0,\r
  followMouse = true,\r
  mouseInfluence = 0.1,\r
  noiseAmount = 0.0,\r
  distortion = 0.0,\r
  className = ''\r
}) => {\r
  const containerRef = useRef(null);\r
  const uniformsRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const mouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const animationIdRef = useRef(null);\r
  const meshRef = useRef(null);\r
  const cleanupFunctionRef = useRef(null);\r
  const [isVisible, setIsVisible] = useState(false);\r
  const observerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    observerRef.current = new IntersectionObserver(\r
      entries => {\r
        const entry = entries[0];\r
        setIsVisible(entry.isIntersecting);\r
      },\r
      { threshold: 0.1 }\r
    );\r
\r
    observerRef.current.observe(containerRef.current);\r
\r
    return () => {\r
      if (observerRef.current) {\r
        observerRef.current.disconnect();\r
        observerRef.current = null;\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!isVisible || !containerRef.current) return;\r
\r
    if (cleanupFunctionRef.current) {\r
      cleanupFunctionRef.current();\r
      cleanupFunctionRef.current = null;\r
    }\r
\r
    const initializeWebGL = async () => {\r
      if (!containerRef.current) return;\r
\r
      await new Promise(resolve => setTimeout(resolve, 10));\r
\r
      if (!containerRef.current) return;\r
\r
      const renderer = new Renderer({\r
        dpr: Math.min(window.devicePixelRatio, 2),\r
        alpha: true\r
      });\r
      rendererRef.current = renderer;\r
\r
      const gl = renderer.gl;\r
      gl.canvas.style.width = '100%';\r
      gl.canvas.style.height = '100%';\r
\r
      while (containerRef.current.firstChild) {\r
        containerRef.current.removeChild(containerRef.current.firstChild);\r
      }\r
      containerRef.current.appendChild(gl.canvas);\r
\r
      const vert = \`\r
attribute vec2 position;\r
varying vec2 vUv;\r
void main() {\r
  vUv = position * 0.5 + 0.5;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\`;\r
\r
      const frag = \`precision highp float;\r
\r
uniform float iTime;\r
uniform vec2  iResolution;\r
\r
uniform vec2  rayPos;\r
uniform vec2  rayDir;\r
uniform vec3  raysColor;\r
uniform float raysSpeed;\r
uniform float lightSpread;\r
uniform float rayLength;\r
uniform float pulsating;\r
uniform float fadeDistance;\r
uniform float saturation;\r
uniform vec2  mousePos;\r
uniform float mouseInfluence;\r
uniform float noiseAmount;\r
uniform float distortion;\r
\r
varying vec2 vUv;\r
\r
float noise(vec2 st) {\r
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);\r
}\r
\r
float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,\r
                  float seedA, float seedB, float speed) {\r
  vec2 sourceToCoord = coord - raySource;\r
  vec2 dirNorm = normalize(sourceToCoord);\r
  float cosAngle = dot(dirNorm, rayRefDirection);\r
\r
  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;\r
  \r
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));\r
\r
  float distance = length(sourceToCoord);\r
  float maxDistance = iResolution.x * rayLength;\r
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);\r
  \r
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);\r
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;\r
\r
  float baseStrength = clamp(\r
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +\r
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),\r
    0.0, 1.0\r
  );\r
\r
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);\r
  \r
  vec2 finalRayDir = rayDir;\r
  if (mouseInfluence > 0.0) {\r
    vec2 mouseScreenPos = mousePos * iResolution.xy;\r
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);\r
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));\r
  }\r
\r
  vec4 rays1 = vec4(1.0) *\r
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,\r
                           1.5 * raysSpeed);\r
  vec4 rays2 = vec4(1.0) *\r
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,\r
                           1.1 * raysSpeed);\r
\r
  fragColor = rays1 * 0.5 + rays2 * 0.4;\r
\r
  if (noiseAmount > 0.0) {\r
    float n = noise(coord * 0.01 + iTime * 0.1);\r
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);\r
  }\r
\r
  float brightness = 1.0 - (coord.y / iResolution.y);\r
  fragColor.x *= 0.1 + brightness * 0.8;\r
  fragColor.y *= 0.3 + brightness * 0.6;\r
  fragColor.z *= 0.5 + brightness * 0.5;\r
\r
  if (saturation != 1.0) {\r
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));\r
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);\r
  }\r
\r
  fragColor.rgb *= raysColor;\r
}\r
\r
void main() {\r
  vec4 color;\r
  mainImage(color, gl_FragCoord.xy);\r
  gl_FragColor  = color;\r
}\`;\r
\r
      const uniforms = {\r
        iTime: { value: 0 },\r
        iResolution: { value: [1, 1] },\r
\r
        rayPos: { value: [0, 0] },\r
        rayDir: { value: [0, 1] },\r
\r
        raysColor: { value: hexToRgb(raysColor) },\r
        raysSpeed: { value: raysSpeed },\r
        lightSpread: { value: lightSpread },\r
        rayLength: { value: rayLength },\r
        pulsating: { value: pulsating ? 1.0 : 0.0 },\r
        fadeDistance: { value: fadeDistance },\r
        saturation: { value: saturation },\r
        mousePos: { value: [0.5, 0.5] },\r
        mouseInfluence: { value: mouseInfluence },\r
        noiseAmount: { value: noiseAmount },\r
        distortion: { value: distortion }\r
      };\r
      uniformsRef.current = uniforms;\r
\r
      const geometry = new Triangle(gl);\r
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });\r
      const mesh = new Mesh(gl, { geometry, program });\r
      meshRef.current = mesh;\r
\r
      const updatePlacement = () => {\r
        if (!containerRef.current || !renderer) return;\r
\r
        renderer.dpr = Math.min(window.devicePixelRatio, 2);\r
\r
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;\r
        renderer.setSize(wCSS, hCSS);\r
\r
        const dpr = renderer.dpr;\r
        const w = wCSS * dpr;\r
        const h = hCSS * dpr;\r
\r
        uniforms.iResolution.value = [w, h];\r
\r
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);\r
        uniforms.rayPos.value = anchor;\r
        uniforms.rayDir.value = dir;\r
      };\r
\r
      const loop = t => {\r
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {\r
          return;\r
        }\r
\r
        uniforms.iTime.value = t * 0.001;\r
\r
        if (followMouse && mouseInfluence > 0.0) {\r
          const smoothing = 0.92;\r
\r
          smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);\r
          smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);\r
\r
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];\r
        }\r
\r
        try {\r
          renderer.render({ scene: mesh });\r
          animationIdRef.current = requestAnimationFrame(loop);\r
        } catch (error) {\r
          console.warn('WebGL rendering error:', error);\r
          return;\r
        }\r
      };\r
\r
      window.addEventListener('resize', updatePlacement);\r
      updatePlacement();\r
      animationIdRef.current = requestAnimationFrame(loop);\r
\r
      cleanupFunctionRef.current = () => {\r
        if (animationIdRef.current) {\r
          cancelAnimationFrame(animationIdRef.current);\r
          animationIdRef.current = null;\r
        }\r
\r
        window.removeEventListener('resize', updatePlacement);\r
\r
        if (renderer) {\r
          try {\r
            const canvas = renderer.gl.canvas;\r
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');\r
            if (loseContextExt) {\r
              loseContextExt.loseContext();\r
            }\r
\r
            if (canvas && canvas.parentNode) {\r
              canvas.parentNode.removeChild(canvas);\r
            }\r
          } catch (error) {\r
            console.warn('Error during WebGL cleanup:', error);\r
          }\r
        }\r
\r
        rendererRef.current = null;\r
        uniformsRef.current = null;\r
        meshRef.current = null;\r
      };\r
    };\r
\r
    initializeWebGL();\r
\r
    return () => {\r
      if (cleanupFunctionRef.current) {\r
        cleanupFunctionRef.current();\r
        cleanupFunctionRef.current = null;\r
      }\r
    };\r
  }, [\r
    isVisible,\r
    raysOrigin,\r
    raysColor,\r
    raysSpeed,\r
    lightSpread,\r
    rayLength,\r
    pulsating,\r
    fadeDistance,\r
    saturation,\r
    followMouse,\r
    mouseInfluence,\r
    noiseAmount,\r
    distortion\r
  ]);\r
\r
  useEffect(() => {\r
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) return;\r
\r
    const u = uniformsRef.current;\r
    const renderer = rendererRef.current;\r
\r
    u.raysColor.value = hexToRgb(raysColor);\r
    u.raysSpeed.value = raysSpeed;\r
    u.lightSpread.value = lightSpread;\r
    u.rayLength.value = rayLength;\r
    u.pulsating.value = pulsating ? 1.0 : 0.0;\r
    u.fadeDistance.value = fadeDistance;\r
    u.saturation.value = saturation;\r
    u.mouseInfluence.value = mouseInfluence;\r
    u.noiseAmount.value = noiseAmount;\r
    u.distortion.value = distortion;\r
\r
    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;\r
    const dpr = renderer.dpr;\r
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);\r
    u.rayPos.value = anchor;\r
    u.rayDir.value = dir;\r
  }, [\r
    raysColor,\r
    raysSpeed,\r
    lightSpread,\r
    raysOrigin,\r
    rayLength,\r
    pulsating,\r
    fadeDistance,\r
    saturation,\r
    mouseInfluence,\r
    noiseAmount,\r
    distortion\r
  ]);\r
\r
  useEffect(() => {\r
    const handleMouseMove = e => {\r
      if (!containerRef.current || !rendererRef.current) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = (e.clientY - rect.top) / rect.height;\r
      mouseRef.current = { x, y };\r
    };\r
\r
    if (followMouse) {\r
      window.addEventListener('mousemove', handleMouseMove);\r
      return () => window.removeEventListener('mousemove', handleMouseMove);\r
    }\r
  }, [followMouse]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`w-full h-full pointer-events-none z-[3] overflow-hidden relative \${className}\`.trim()}\r
    />\r
  );\r
};\r
\r
export default LightRays;\r
`,hr=`import { useRef, useEffect, useState } from 'react';\r
import { Renderer, Program, Triangle, Mesh } from 'ogl';\r
import './LightRays.css';\r
\r
export type RaysOrigin =\r
  | 'top-center'\r
  | 'top-left'\r
  | 'top-right'\r
  | 'right'\r
  | 'left'\r
  | 'bottom-center'\r
  | 'bottom-right'\r
  | 'bottom-left';\r
\r
interface LightRaysProps {\r
  raysOrigin?: RaysOrigin;\r
  raysColor?: string;\r
  raysSpeed?: number;\r
  lightSpread?: number;\r
  rayLength?: number;\r
  pulsating?: boolean;\r
  fadeDistance?: number;\r
  saturation?: number;\r
  followMouse?: boolean;\r
  mouseInfluence?: number;\r
  noiseAmount?: number;\r
  distortion?: number;\r
  className?: string;\r
}\r
\r
const DEFAULT_COLOR = '#ffffff';\r
\r
const hexToRgb = (hex: string): [number, number, number] => {\r
  const m = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];\r
};\r
\r
const getAnchorAndDir = (\r
  origin: RaysOrigin,\r
  w: number,\r
  h: number\r
): { anchor: [number, number]; dir: [number, number] } => {\r
  const outside = 0.2;\r
  switch (origin) {\r
    case 'top-left':\r
      return { anchor: [0, -outside * h], dir: [0, 1] };\r
    case 'top-right':\r
      return { anchor: [w, -outside * h], dir: [0, 1] };\r
    case 'left':\r
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };\r
    case 'right':\r
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };\r
    case 'bottom-left':\r
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };\r
    case 'bottom-center':\r
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };\r
    case 'bottom-right':\r
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };\r
    default: // "top-center"\r
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };\r
  }\r
};\r
\r
const LightRays: React.FC<LightRaysProps> = ({\r
  raysOrigin = 'top-center',\r
  raysColor = DEFAULT_COLOR,\r
  raysSpeed = 1,\r
  lightSpread = 1,\r
  rayLength = 2,\r
  pulsating = false,\r
  fadeDistance = 1.0,\r
  saturation = 1.0,\r
  followMouse = true,\r
  mouseInfluence = 0.1,\r
  noiseAmount = 0.0,\r
  distortion = 0.0,\r
  className = ''\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const uniformsRef = useRef<any>(null);\r
  const rendererRef = useRef<Renderer | null>(null);\r
  const mouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const animationIdRef = useRef<number | null>(null);\r
  const meshRef = useRef<any>(null);\r
  const cleanupFunctionRef = useRef<(() => void) | null>(null);\r
  const [isVisible, setIsVisible] = useState(false);\r
  const observerRef = useRef<IntersectionObserver | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    observerRef.current = new IntersectionObserver(\r
      entries => {\r
        const entry = entries[0];\r
        setIsVisible(entry.isIntersecting);\r
      },\r
      { threshold: 0.1 }\r
    );\r
\r
    observerRef.current.observe(containerRef.current);\r
\r
    return () => {\r
      if (observerRef.current) {\r
        observerRef.current.disconnect();\r
        observerRef.current = null;\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!isVisible || !containerRef.current) return;\r
\r
    if (cleanupFunctionRef.current) {\r
      cleanupFunctionRef.current();\r
      cleanupFunctionRef.current = null;\r
    }\r
\r
    const initializeWebGL = async () => {\r
      if (!containerRef.current) return;\r
\r
      await new Promise(resolve => setTimeout(resolve, 10));\r
\r
      if (!containerRef.current) return;\r
\r
      const renderer = new Renderer({\r
        dpr: Math.min(window.devicePixelRatio, 2),\r
        alpha: true\r
      });\r
      rendererRef.current = renderer;\r
\r
      const gl = renderer.gl;\r
      gl.canvas.style.width = '100%';\r
      gl.canvas.style.height = '100%';\r
\r
      while (containerRef.current.firstChild) {\r
        containerRef.current.removeChild(containerRef.current.firstChild);\r
      }\r
      containerRef.current.appendChild(gl.canvas);\r
\r
      const vert = \`\r
attribute vec2 position;\r
varying vec2 vUv;\r
void main() {\r
  vUv = position * 0.5 + 0.5;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\`;\r
\r
      const frag = \`precision highp float;\r
\r
uniform float iTime;\r
uniform vec2  iResolution;\r
\r
uniform vec2  rayPos;\r
uniform vec2  rayDir;\r
uniform vec3  raysColor;\r
uniform float raysSpeed;\r
uniform float lightSpread;\r
uniform float rayLength;\r
uniform float pulsating;\r
uniform float fadeDistance;\r
uniform float saturation;\r
uniform vec2  mousePos;\r
uniform float mouseInfluence;\r
uniform float noiseAmount;\r
uniform float distortion;\r
\r
varying vec2 vUv;\r
\r
float noise(vec2 st) {\r
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);\r
}\r
\r
float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,\r
                  float seedA, float seedB, float speed) {\r
  vec2 sourceToCoord = coord - raySource;\r
  vec2 dirNorm = normalize(sourceToCoord);\r
  float cosAngle = dot(dirNorm, rayRefDirection);\r
\r
  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;\r
  \r
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));\r
\r
  float distance = length(sourceToCoord);\r
  float maxDistance = iResolution.x * rayLength;\r
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);\r
  \r
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);\r
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;\r
\r
  float baseStrength = clamp(\r
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +\r
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),\r
    0.0, 1.0\r
  );\r
\r
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);\r
  \r
  vec2 finalRayDir = rayDir;\r
  if (mouseInfluence > 0.0) {\r
    vec2 mouseScreenPos = mousePos * iResolution.xy;\r
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);\r
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));\r
  }\r
\r
  vec4 rays1 = vec4(1.0) *\r
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,\r
                           1.5 * raysSpeed);\r
  vec4 rays2 = vec4(1.0) *\r
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,\r
                           1.1 * raysSpeed);\r
\r
  fragColor = rays1 * 0.5 + rays2 * 0.4;\r
\r
  if (noiseAmount > 0.0) {\r
    float n = noise(coord * 0.01 + iTime * 0.1);\r
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);\r
  }\r
\r
  float brightness = 1.0 - (coord.y / iResolution.y);\r
  fragColor.x *= 0.1 + brightness * 0.8;\r
  fragColor.y *= 0.3 + brightness * 0.6;\r
  fragColor.z *= 0.5 + brightness * 0.5;\r
\r
  if (saturation != 1.0) {\r
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));\r
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);\r
  }\r
\r
  fragColor.rgb *= raysColor;\r
}\r
\r
void main() {\r
  vec4 color;\r
  mainImage(color, gl_FragCoord.xy);\r
  gl_FragColor  = color;\r
}\`;\r
\r
      const uniforms = {\r
        iTime: { value: 0 },\r
        iResolution: { value: [1, 1] },\r
\r
        rayPos: { value: [0, 0] },\r
        rayDir: { value: [0, 1] },\r
\r
        raysColor: { value: hexToRgb(raysColor) },\r
        raysSpeed: { value: raysSpeed },\r
        lightSpread: { value: lightSpread },\r
        rayLength: { value: rayLength },\r
        pulsating: { value: pulsating ? 1.0 : 0.0 },\r
        fadeDistance: { value: fadeDistance },\r
        saturation: { value: saturation },\r
        mousePos: { value: [0.5, 0.5] },\r
        mouseInfluence: { value: mouseInfluence },\r
        noiseAmount: { value: noiseAmount },\r
        distortion: { value: distortion }\r
      };\r
      uniformsRef.current = uniforms;\r
\r
      const geometry = new Triangle(gl);\r
      const program = new Program(gl, {\r
        vertex: vert,\r
        fragment: frag,\r
        uniforms\r
      });\r
      const mesh = new Mesh(gl, { geometry, program });\r
      meshRef.current = mesh;\r
\r
      const updatePlacement = () => {\r
        if (!containerRef.current || !renderer) return;\r
\r
        renderer.dpr = Math.min(window.devicePixelRatio, 2);\r
\r
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;\r
        renderer.setSize(wCSS, hCSS);\r
\r
        const dpr = renderer.dpr;\r
        const w = wCSS * dpr;\r
        const h = hCSS * dpr;\r
\r
        uniforms.iResolution.value = [w, h];\r
\r
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);\r
        uniforms.rayPos.value = anchor;\r
        uniforms.rayDir.value = dir;\r
      };\r
\r
      const loop = (t: number) => {\r
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {\r
          return;\r
        }\r
\r
        uniforms.iTime.value = t * 0.001;\r
\r
        if (followMouse && mouseInfluence > 0.0) {\r
          const smoothing = 0.92;\r
\r
          smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);\r
          smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);\r
\r
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];\r
        }\r
\r
        try {\r
          renderer.render({ scene: mesh });\r
          animationIdRef.current = requestAnimationFrame(loop);\r
        } catch (error) {\r
          console.warn('WebGL rendering error:', error);\r
          return;\r
        }\r
      };\r
\r
      window.addEventListener('resize', updatePlacement);\r
      updatePlacement();\r
      animationIdRef.current = requestAnimationFrame(loop);\r
\r
      cleanupFunctionRef.current = () => {\r
        if (animationIdRef.current) {\r
          cancelAnimationFrame(animationIdRef.current);\r
          animationIdRef.current = null;\r
        }\r
\r
        window.removeEventListener('resize', updatePlacement);\r
\r
        if (renderer) {\r
          try {\r
            const canvas = renderer.gl.canvas;\r
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');\r
            if (loseContextExt) {\r
              loseContextExt.loseContext();\r
            }\r
\r
            if (canvas && canvas.parentNode) {\r
              canvas.parentNode.removeChild(canvas);\r
            }\r
          } catch (error) {\r
            console.warn('Error during WebGL cleanup:', error);\r
          }\r
        }\r
\r
        rendererRef.current = null;\r
        uniformsRef.current = null;\r
        meshRef.current = null;\r
      };\r
    };\r
\r
    initializeWebGL();\r
\r
    return () => {\r
      if (cleanupFunctionRef.current) {\r
        cleanupFunctionRef.current();\r
        cleanupFunctionRef.current = null;\r
      }\r
    };\r
  }, [\r
    isVisible,\r
    raysOrigin,\r
    raysColor,\r
    raysSpeed,\r
    lightSpread,\r
    rayLength,\r
    pulsating,\r
    fadeDistance,\r
    saturation,\r
    followMouse,\r
    mouseInfluence,\r
    noiseAmount,\r
    distortion\r
  ]);\r
\r
  useEffect(() => {\r
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) return;\r
\r
    const u = uniformsRef.current;\r
    const renderer = rendererRef.current;\r
\r
    u.raysColor.value = hexToRgb(raysColor);\r
    u.raysSpeed.value = raysSpeed;\r
    u.lightSpread.value = lightSpread;\r
    u.rayLength.value = rayLength;\r
    u.pulsating.value = pulsating ? 1.0 : 0.0;\r
    u.fadeDistance.value = fadeDistance;\r
    u.saturation.value = saturation;\r
    u.mouseInfluence.value = mouseInfluence;\r
    u.noiseAmount.value = noiseAmount;\r
    u.distortion.value = distortion;\r
\r
    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;\r
    const dpr = renderer.dpr;\r
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);\r
    u.rayPos.value = anchor;\r
    u.rayDir.value = dir;\r
  }, [\r
    raysColor,\r
    raysSpeed,\r
    lightSpread,\r
    raysOrigin,\r
    rayLength,\r
    pulsating,\r
    fadeDistance,\r
    saturation,\r
    mouseInfluence,\r
    noiseAmount,\r
    distortion\r
  ]);\r
\r
  useEffect(() => {\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!containerRef.current || !rendererRef.current) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = (e.clientY - rect.top) / rect.height;\r
      mouseRef.current = { x, y };\r
    };\r
\r
    if (followMouse) {\r
      window.addEventListener('mousemove', handleMouseMove);\r
      return () => window.removeEventListener('mousemove', handleMouseMove);\r
    }\r
  }, [followMouse]);\r
\r
  return <div ref={containerRef} className={\`light-rays-container \${className}\`.trim()} />;\r
};\r
\r
export default LightRays;\r
`,vr=`import { useRef, useEffect, useState } from 'react';\r
import { Renderer, Program, Triangle, Mesh } from 'ogl';\r
\r
export type RaysOrigin =\r
  | 'top-center'\r
  | 'top-left'\r
  | 'top-right'\r
  | 'right'\r
  | 'left'\r
  | 'bottom-center'\r
  | 'bottom-right'\r
  | 'bottom-left';\r
\r
interface LightRaysProps {\r
  raysOrigin?: RaysOrigin;\r
  raysColor?: string;\r
  raysSpeed?: number;\r
  lightSpread?: number;\r
  rayLength?: number;\r
  pulsating?: boolean;\r
  fadeDistance?: number;\r
  saturation?: number;\r
  followMouse?: boolean;\r
  mouseInfluence?: number;\r
  noiseAmount?: number;\r
  distortion?: number;\r
  className?: string;\r
}\r
\r
const DEFAULT_COLOR = '#ffffff';\r
\r
const hexToRgb = (hex: string): [number, number, number] => {\r
  const m = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];\r
};\r
\r
const getAnchorAndDir = (\r
  origin: RaysOrigin,\r
  w: number,\r
  h: number\r
): { anchor: [number, number]; dir: [number, number] } => {\r
  const outside = 0.2;\r
  switch (origin) {\r
    case 'top-left':\r
      return { anchor: [0, -outside * h], dir: [0, 1] };\r
    case 'top-right':\r
      return { anchor: [w, -outside * h], dir: [0, 1] };\r
    case 'left':\r
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };\r
    case 'right':\r
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };\r
    case 'bottom-left':\r
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };\r
    case 'bottom-center':\r
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };\r
    case 'bottom-right':\r
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };\r
    default: // "top-center"\r
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };\r
  }\r
};\r
\r
const LightRays: React.FC<LightRaysProps> = ({\r
  raysOrigin = 'top-center',\r
  raysColor = DEFAULT_COLOR,\r
  raysSpeed = 1,\r
  lightSpread = 1,\r
  rayLength = 2,\r
  pulsating = false,\r
  fadeDistance = 1.0,\r
  saturation = 1.0,\r
  followMouse = true,\r
  mouseInfluence = 0.1,\r
  noiseAmount = 0.0,\r
  distortion = 0.0,\r
  className = ''\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const uniformsRef = useRef<any>(null);\r
  const rendererRef = useRef<Renderer | null>(null);\r
  const mouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const animationIdRef = useRef<number | null>(null);\r
  const meshRef = useRef<any>(null);\r
  const cleanupFunctionRef = useRef<(() => void) | null>(null);\r
  const [isVisible, setIsVisible] = useState(false);\r
  const observerRef = useRef<IntersectionObserver | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    observerRef.current = new IntersectionObserver(\r
      entries => {\r
        const entry = entries[0];\r
        setIsVisible(entry.isIntersecting);\r
      },\r
      { threshold: 0.1 }\r
    );\r
\r
    observerRef.current.observe(containerRef.current);\r
\r
    return () => {\r
      if (observerRef.current) {\r
        observerRef.current.disconnect();\r
        observerRef.current = null;\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!isVisible || !containerRef.current) return;\r
\r
    if (cleanupFunctionRef.current) {\r
      cleanupFunctionRef.current();\r
      cleanupFunctionRef.current = null;\r
    }\r
\r
    const initializeWebGL = async () => {\r
      if (!containerRef.current) return;\r
\r
      await new Promise(resolve => setTimeout(resolve, 10));\r
\r
      if (!containerRef.current) return;\r
\r
      const renderer = new Renderer({\r
        dpr: Math.min(window.devicePixelRatio, 2),\r
        alpha: true\r
      });\r
      rendererRef.current = renderer;\r
\r
      const gl = renderer.gl;\r
      gl.canvas.style.width = '100%';\r
      gl.canvas.style.height = '100%';\r
\r
      while (containerRef.current.firstChild) {\r
        containerRef.current.removeChild(containerRef.current.firstChild);\r
      }\r
      containerRef.current.appendChild(gl.canvas);\r
\r
      const vert = \`\r
attribute vec2 position;\r
varying vec2 vUv;\r
void main() {\r
  vUv = position * 0.5 + 0.5;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\`;\r
\r
      const frag = \`precision highp float;\r
\r
uniform float iTime;\r
uniform vec2  iResolution;\r
\r
uniform vec2  rayPos;\r
uniform vec2  rayDir;\r
uniform vec3  raysColor;\r
uniform float raysSpeed;\r
uniform float lightSpread;\r
uniform float rayLength;\r
uniform float pulsating;\r
uniform float fadeDistance;\r
uniform float saturation;\r
uniform vec2  mousePos;\r
uniform float mouseInfluence;\r
uniform float noiseAmount;\r
uniform float distortion;\r
\r
varying vec2 vUv;\r
\r
float noise(vec2 st) {\r
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);\r
}\r
\r
float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,\r
                  float seedA, float seedB, float speed) {\r
  vec2 sourceToCoord = coord - raySource;\r
  vec2 dirNorm = normalize(sourceToCoord);\r
  float cosAngle = dot(dirNorm, rayRefDirection);\r
\r
  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;\r
  \r
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));\r
\r
  float distance = length(sourceToCoord);\r
  float maxDistance = iResolution.x * rayLength;\r
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);\r
  \r
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);\r
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;\r
\r
  float baseStrength = clamp(\r
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +\r
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),\r
    0.0, 1.0\r
  );\r
\r
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);\r
  \r
  vec2 finalRayDir = rayDir;\r
  if (mouseInfluence > 0.0) {\r
    vec2 mouseScreenPos = mousePos * iResolution.xy;\r
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);\r
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));\r
  }\r
\r
  vec4 rays1 = vec4(1.0) *\r
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,\r
                           1.5 * raysSpeed);\r
  vec4 rays2 = vec4(1.0) *\r
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,\r
                           1.1 * raysSpeed);\r
\r
  fragColor = rays1 * 0.5 + rays2 * 0.4;\r
\r
  if (noiseAmount > 0.0) {\r
    float n = noise(coord * 0.01 + iTime * 0.1);\r
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);\r
  }\r
\r
  float brightness = 1.0 - (coord.y / iResolution.y);\r
  fragColor.x *= 0.1 + brightness * 0.8;\r
  fragColor.y *= 0.3 + brightness * 0.6;\r
  fragColor.z *= 0.5 + brightness * 0.5;\r
\r
  if (saturation != 1.0) {\r
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));\r
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);\r
  }\r
\r
  fragColor.rgb *= raysColor;\r
}\r
\r
void main() {\r
  vec4 color;\r
  mainImage(color, gl_FragCoord.xy);\r
  gl_FragColor  = color;\r
}\`;\r
\r
      const uniforms = {\r
        iTime: { value: 0 },\r
        iResolution: { value: [1, 1] },\r
\r
        rayPos: { value: [0, 0] },\r
        rayDir: { value: [0, 1] },\r
\r
        raysColor: { value: hexToRgb(raysColor) },\r
        raysSpeed: { value: raysSpeed },\r
        lightSpread: { value: lightSpread },\r
        rayLength: { value: rayLength },\r
        pulsating: { value: pulsating ? 1.0 : 0.0 },\r
        fadeDistance: { value: fadeDistance },\r
        saturation: { value: saturation },\r
        mousePos: { value: [0.5, 0.5] },\r
        mouseInfluence: { value: mouseInfluence },\r
        noiseAmount: { value: noiseAmount },\r
        distortion: { value: distortion }\r
      };\r
      uniformsRef.current = uniforms;\r
\r
      const geometry = new Triangle(gl);\r
      const program = new Program(gl, {\r
        vertex: vert,\r
        fragment: frag,\r
        uniforms\r
      });\r
      const mesh = new Mesh(gl, { geometry, program });\r
      meshRef.current = mesh;\r
\r
      const updatePlacement = () => {\r
        if (!containerRef.current || !renderer) return;\r
\r
        renderer.dpr = Math.min(window.devicePixelRatio, 2);\r
\r
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;\r
        renderer.setSize(wCSS, hCSS);\r
\r
        const dpr = renderer.dpr;\r
        const w = wCSS * dpr;\r
        const h = hCSS * dpr;\r
\r
        uniforms.iResolution.value = [w, h];\r
\r
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);\r
        uniforms.rayPos.value = anchor;\r
        uniforms.rayDir.value = dir;\r
      };\r
\r
      const loop = (t: number) => {\r
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {\r
          return;\r
        }\r
\r
        uniforms.iTime.value = t * 0.001;\r
\r
        if (followMouse && mouseInfluence > 0.0) {\r
          const smoothing = 0.92;\r
\r
          smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);\r
          smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);\r
\r
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];\r
        }\r
\r
        try {\r
          renderer.render({ scene: mesh });\r
          animationIdRef.current = requestAnimationFrame(loop);\r
        } catch (error) {\r
          console.warn('WebGL rendering error:', error);\r
          return;\r
        }\r
      };\r
\r
      window.addEventListener('resize', updatePlacement);\r
      updatePlacement();\r
      animationIdRef.current = requestAnimationFrame(loop);\r
\r
      cleanupFunctionRef.current = () => {\r
        if (animationIdRef.current) {\r
          cancelAnimationFrame(animationIdRef.current);\r
          animationIdRef.current = null;\r
        }\r
\r
        window.removeEventListener('resize', updatePlacement);\r
\r
        if (renderer) {\r
          try {\r
            const canvas = renderer.gl.canvas;\r
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');\r
            if (loseContextExt) {\r
              loseContextExt.loseContext();\r
            }\r
\r
            if (canvas && canvas.parentNode) {\r
              canvas.parentNode.removeChild(canvas);\r
            }\r
          } catch (error) {\r
            console.warn('Error during WebGL cleanup:', error);\r
          }\r
        }\r
\r
        rendererRef.current = null;\r
        uniformsRef.current = null;\r
        meshRef.current = null;\r
      };\r
    };\r
\r
    initializeWebGL();\r
\r
    return () => {\r
      if (cleanupFunctionRef.current) {\r
        cleanupFunctionRef.current();\r
        cleanupFunctionRef.current = null;\r
      }\r
    };\r
  }, [\r
    isVisible,\r
    raysOrigin,\r
    raysColor,\r
    raysSpeed,\r
    lightSpread,\r
    rayLength,\r
    pulsating,\r
    fadeDistance,\r
    saturation,\r
    followMouse,\r
    mouseInfluence,\r
    noiseAmount,\r
    distortion\r
  ]);\r
\r
  useEffect(() => {\r
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) return;\r
\r
    const u = uniformsRef.current;\r
    const renderer = rendererRef.current;\r
\r
    u.raysColor.value = hexToRgb(raysColor);\r
    u.raysSpeed.value = raysSpeed;\r
    u.lightSpread.value = lightSpread;\r
    u.rayLength.value = rayLength;\r
    u.pulsating.value = pulsating ? 1.0 : 0.0;\r
    u.fadeDistance.value = fadeDistance;\r
    u.saturation.value = saturation;\r
    u.mouseInfluence.value = mouseInfluence;\r
    u.noiseAmount.value = noiseAmount;\r
    u.distortion.value = distortion;\r
\r
    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;\r
    const dpr = renderer.dpr;\r
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);\r
    u.rayPos.value = anchor;\r
    u.rayDir.value = dir;\r
  }, [\r
    raysColor,\r
    raysSpeed,\r
    lightSpread,\r
    raysOrigin,\r
    rayLength,\r
    pulsating,\r
    fadeDistance,\r
    saturation,\r
    mouseInfluence,\r
    noiseAmount,\r
    distortion\r
  ]);\r
\r
  useEffect(() => {\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!containerRef.current || !rendererRef.current) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = (e.clientY - rect.top) / rect.height;\r
      mouseRef.current = { x, y };\r
    };\r
\r
    if (followMouse) {\r
      window.addEventListener('mousemove', handleMouseMove);\r
      return () => window.removeEventListener('mousemove', handleMouseMove);\r
    }\r
  }, [followMouse]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`w-full h-full pointer-events-none z-[3] overflow-hidden relative \${className}\`.trim()}\r
    />\r
  );\r
};\r
\r
export default LightRays;\r
`,pr={dependencies:"ogl",usage:`import LightRays from './LightRays';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <LightRays
    raysOrigin="top-center"
    raysColor="#00ffff"
    raysSpeed={1.5}
    lightSpread={0.8}
    rayLength={1.2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="custom-rays"
  />
</div>`,code:dr,css:mr,tailwind:gr,tsCode:hr,tsTailwind:vr},yr="#ffffff",U=c=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);return n?[parseInt(n[1],16)/255,parseInt(n[2],16)/255,parseInt(n[3],16)/255]:[1,1,1]},V=(c,n,a)=>{switch(c){case"top-left":return{anchor:[0,-.2*a],dir:[0,1]};case"top-right":return{anchor:[n,-.2*a],dir:[0,1]};case"left":return{anchor:[-.2*n,.5*a],dir:[1,0]};case"right":return{anchor:[(1+.2)*n,.5*a],dir:[-1,0]};case"bottom-left":return{anchor:[0,(1+.2)*a],dir:[0,-1]};case"bottom-center":return{anchor:[.5*n,(1+.2)*a],dir:[0,-1]};case"bottom-right":return{anchor:[n,(1+.2)*a],dir:[0,-1]};default:return{anchor:[.5*n,-.2*a],dir:[0,1]}}},Rr=({raysOrigin:c="top-center",raysColor:n=yr,raysSpeed:a=1,lightSpread:y=1,rayLength:R=2,pulsating:D=!1,fadeDistance:C=1,saturation:A=1,followMouse:S=!0,mouseInfluence:x=.1,noiseAmount:b=0,distortion:L=0,className:F=""})=>{const s=e.useRef(null),d=e.useRef(null),m=e.useRef(null),P=e.useRef({x:.5,y:.5}),g=e.useRef({x:.5,y:.5}),h=e.useRef(null),T=e.useRef(null),l=e.useRef(null),[E,O]=e.useState(!1),w=e.useRef(null);return e.useEffect(()=>{if(s.current)return w.current=new IntersectionObserver(t=>{const i=t[0];O(i.isIntersecting)},{threshold:.1}),w.current.observe(s.current),()=>{w.current&&(w.current.disconnect(),w.current=null)}},[]),e.useEffect(()=>!E||!s.current?void 0:(l.current&&(l.current(),l.current=null),(async()=>{if(!s.current||(await new Promise(u=>setTimeout(u,10)),!s.current))return;const i=new k({dpr:Math.min(window.devicePixelRatio,2),alpha:!0});m.current=i;const r=i.gl;for(r.canvas.style.width="100%",r.canvas.style.height="100%";s.current.firstChild;)s.current.removeChild(s.current.firstChild);s.current.appendChild(r.canvas);const M=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`,I=`precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`,f={iTime:{value:0},iResolution:{value:[1,1]},rayPos:{value:[0,0]},rayDir:{value:[0,1]},raysColor:{value:U(n)},raysSpeed:{value:a},lightSpread:{value:y},rayLength:{value:R},pulsating:{value:D?1:0},fadeDistance:{value:C},saturation:{value:A},mousePos:{value:[.5,.5]},mouseInfluence:{value:x},noiseAmount:{value:b},distortion:{value:L}};d.current=f;const z=new fr(r),H=new X(r,{vertex:M,fragment:I,uniforms:f}),W=new Y(r,{geometry:z,program:H});T.current=W;const N=()=>{if(!s.current||!i)return;i.dpr=Math.min(window.devicePixelRatio,2);const{clientWidth:u,clientHeight:v}=s.current;i.setSize(u,v);const j=i.dpr,B=u*j,G=v*j;f.iResolution.value=[B,G];const{anchor:q,dir:$}=V(c,B,G);f.rayPos.value=q,f.rayDir.value=$},_=u=>{if(!(!m.current||!d.current||!T.current)){f.iTime.value=u*.001,S&&x>0&&(g.current.x=g.current.x*.92+P.current.x*(1-.92),g.current.y=g.current.y*.92+P.current.y*(1-.92),f.mousePos.value=[g.current.x,g.current.y]);try{i.render({scene:W}),h.current=requestAnimationFrame(_)}catch(v){console.warn("WebGL rendering error:",v);return}}};window.addEventListener("resize",N),N(),h.current=requestAnimationFrame(_),l.current=()=>{if(h.current&&(cancelAnimationFrame(h.current),h.current=null),window.removeEventListener("resize",N),i)try{const u=i.gl.canvas,v=i.gl.getExtension("WEBGL_lose_context");v&&v.loseContext(),u&&u.parentNode&&u.parentNode.removeChild(u)}catch(u){console.warn("Error during WebGL cleanup:",u)}m.current=null,d.current=null,T.current=null}})(),()=>{l.current&&(l.current(),l.current=null)}),[E,c,n,a,y,R,D,C,A,S,x,b,L]),e.useEffect(()=>{if(!d.current||!s.current||!m.current)return;const t=d.current,i=m.current;t.raysColor.value=U(n),t.raysSpeed.value=a,t.lightSpread.value=y,t.rayLength.value=R,t.pulsating.value=D?1:0,t.fadeDistance.value=C,t.saturation.value=A,t.mouseInfluence.value=x,t.noiseAmount.value=b,t.distortion.value=L;const{clientWidth:r,clientHeight:M}=s.current,I=i.dpr,{anchor:f,dir:z}=V(c,r*I,M*I);t.rayPos.value=f,t.rayDir.value=z},[n,a,y,c,R,D,C,A,x,b,L]),e.useEffect(()=>{const t=i=>{if(!s.current||!m.current)return;const r=s.current.getBoundingClientRect(),M=(i.clientX-r.left)/r.width,I=(i.clientY-r.top)/r.height;P.current={x:M,y:I}};if(S)return window.addEventListener("mousemove",t),()=>window.removeEventListener("mousemove",t)},[S]),o.jsx("div",{ref:s,className:`light-rays-container ${F}`.trim()})},Fr=()=>{const[c,n]=lr(),[a,y]=e.useState("top-center"),[R,D]=e.useState("#ffffff"),[C,A]=e.useState(1),[S,x]=e.useState(.5),[b,L]=e.useState(3),[F,s]=e.useState(!1),[d,m]=e.useState(1),[P,g]=e.useState(1),[h,T]=e.useState(.1),[l,E]=e.useState(0),[O,w]=e.useState(0),t=[{value:"top-center",label:"Top"},{value:"right",label:"Right"},{value:"left",label:"Left"},{value:"bottom-center",label:"Bottom"}],i=[{name:"raysOrigin",type:"RaysOrigin",default:'"top-center"',description:"Origin position of the light rays. Options: 'top-center', 'top-left', 'top-right', 'right', 'left', 'bottom-center', 'bottom-right', 'bottom-left'"},{name:"raysColor",type:"string",default:'"#ffffff"',description:"Color of the light rays in hex format"},{name:"raysSpeed",type:"number",default:"1",description:"Animation speed of the rays"},{name:"lightSpread",type:"number",default:"0.5",description:"How wide the light rays spread. Lower values = tighter rays, higher values = wider spread"},{name:"rayLength",type:"number",default:"1.0",description:"Maximum length/reach of the rays"},{name:"pulsating",type:"boolean",default:"false",description:"Enable pulsing animation effect"},{name:"fadeDistance",type:"number",default:"1.0",description:"How far rays fade out from origin"},{name:"saturation",type:"number",default:"1.0",description:"Color saturation level (0-1)"},{name:"followMouse",type:"boolean",default:"false",description:"Make rays rotate towards the mouse cursor"},{name:"mouseInfluence",type:"number",default:"0.5",description:"How much mouse affects rays (0-1)"},{name:"noiseAmount",type:"number",default:"0.0",description:"Add noise/grain to rays (0-1)"},{name:"distortion",type:"number",default:"0.0",description:"Apply wave distortion to rays"},{name:"className",type:"string",default:'""',description:"Additional CSS classes to apply to the container"}];return o.jsxs(rr,{children:[o.jsxs(nr,{children:[o.jsxs(J,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[o.jsx(Rr,{raysOrigin:a,raysColor:R,raysSpeed:C,lightSpread:S,rayLength:b,pulsating:F,fadeDistance:d,saturation:P,mouseInfluence:h,noiseAmount:l,distortion:O},c),o.jsx(sr,{pillText:"New Background",headline:"May these lights guide you on your path"})]}),o.jsxs(ir,{children:[o.jsxs(K,{alignItems:"center",mb:4,children:[o.jsx(Q,{fontSize:"sm",mr:2,children:"Rays Color"}),o.jsx(Z,{type:"color",value:R,onChange:r=>{D(r.target.value),n()},width:"50px"})]}),o.jsx(cr,{title:"Rays Origin",value:a,onChange:r=>{y(r),n()},width:160,options:t}),o.jsx(p,{title:"Rays Speed",min:.1,max:3,step:.1,value:C,onChange:r=>{A(r),n()}}),o.jsx(p,{title:"Light Spread",min:.1,max:2,step:.1,value:S,onChange:r=>{x(r),n()}}),o.jsx(p,{title:"Ray Length",min:.5,max:3,step:.1,value:b,onChange:r=>{L(r),n()}}),o.jsx(p,{title:"Fade Distance",min:.5,max:2,step:.1,value:d,onChange:r=>{m(r),n()}}),o.jsx(p,{title:"Saturation",min:0,max:2,step:.1,value:P,onChange:r=>{g(r),n()}}),o.jsx(p,{title:"Mouse Influence",min:0,max:1,step:.1,value:h,onChange:r=>{T(r),n()}}),o.jsx(p,{title:"Noise Amount",min:0,max:.5,step:.01,value:l,onChange:r=>{E(r),n()}}),o.jsx(p,{title:"Distortion",min:0,max:1,step:.1,value:O,onChange:r=>{w(r),n()}}),o.jsx(ur,{title:"Pulsating",checked:F,onChange:r=>{s(r),n()}})]}),o.jsx(er,{data:i}),o.jsx(ar,{dependencyList:["ogl"]})]}),o.jsx(or,{children:o.jsx(tr,{codeObject:pr})})]})};export{Fr as default};
