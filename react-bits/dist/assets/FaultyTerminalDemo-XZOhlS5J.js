import{r,R as Q,P as Z,M as nn,j as n,B as rn,F as en,T as tn,d as on}from"./index-wsKSLPNH.js";import{T as an,P as sn,a as un,C as ln,b as cn}from"./PropTable-C4uPWs8h.js";import{C as fn}from"./Customize-1m_ZNqR9.js";import{D as mn}from"./Dependencies-BHoMfJUj.js";import{P as f}from"./PreviewSlider-m1G_aiYP.js";import{P as J}from"./PreviewSwitch-DqnF708j.js";import{B as pn}from"./BackgroundContent-CqU7Wlm2.js";import{u as dn}from"./useForceRerender-BCFU-k0M.js";import{T as vn}from"./Triangle-66-Bqe-c.js";import{C as N}from"./Color-YRkaOI4u.js";import"./index-Bpz4cGEA.js";const gn=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef, useMemo, useCallback } from 'react';\r
import './FaultyTerminal.css';\r
\r
const vertexShader = \`\r
attribute vec2 position;\r
attribute vec2 uv;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision mediump float;\r
\r
varying vec2 vUv;\r
\r
uniform float iTime;\r
uniform vec3  iResolution;\r
uniform float uScale;\r
\r
uniform vec2  uGridMul;\r
uniform float uDigitSize;\r
uniform float uScanlineIntensity;\r
uniform float uGlitchAmount;\r
uniform float uFlickerAmount;\r
uniform float uNoiseAmp;\r
uniform float uChromaticAberration;\r
uniform float uDither;\r
uniform float uCurvature;\r
uniform vec3  uTint;\r
uniform vec2  uMouse;\r
uniform float uMouseStrength;\r
uniform float uUseMouse;\r
uniform float uPageLoadProgress;\r
uniform float uUsePageLoadAnimation;\r
uniform float uBrightness;\r
\r
float time;\r
\r
float hash21(vec2 p){\r
  p = fract(p * 234.56);\r
  p += dot(p, p + 34.56);\r
  return fract(p.x * p.y);\r
}\r
\r
float noise(vec2 p)\r
{\r
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; \r
}\r
\r
mat2 rotate(float angle)\r
{\r
  float c = cos(angle);\r
  float s = sin(angle);\r
  return mat2(c, -s, s, c);\r
}\r
\r
float fbm(vec2 p)\r
{\r
  p *= 1.1;\r
  float f = 0.0;\r
  float amp = 0.5 * uNoiseAmp;\r
  \r
  mat2 modify0 = rotate(time * 0.02);\r
  f += amp * noise(p);\r
  p = modify0 * p * 2.0;\r
  amp *= 0.454545;\r
  \r
  mat2 modify1 = rotate(time * 0.02);\r
  f += amp * noise(p);\r
  p = modify1 * p * 2.0;\r
  amp *= 0.454545;\r
  \r
  mat2 modify2 = rotate(time * 0.08);\r
  f += amp * noise(p);\r
  \r
  return f;\r
}\r
\r
float pattern(vec2 p, out vec2 q, out vec2 r) {\r
  vec2 offset1 = vec2(1.0);\r
  vec2 offset0 = vec2(0.0);\r
  mat2 rot01 = rotate(0.1 * time);\r
  mat2 rot1 = rotate(0.1);\r
  \r
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));\r
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));\r
  return fbm(p + r);\r
}\r
\r
float digit(vec2 p){\r
    vec2 grid = uGridMul * 15.0;\r
    vec2 s = floor(p * grid) / grid;\r
    p = p * grid;\r
    vec2 q, r;\r
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;\r
    \r
    if(uUseMouse > 0.5){\r
        vec2 mouseWorld = uMouse * uScale;\r
        float distToMouse = distance(s, mouseWorld);\r
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;\r
        intensity += mouseInfluence;\r
        \r
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;\r
        intensity += ripple;\r
    }\r
    \r
    if(uUsePageLoadAnimation > 0.5){\r
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);\r
        float cellDelay = cellRandom * 0.8;\r
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);\r
        \r
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);\r
        intensity *= fadeAlpha;\r
    }\r
    \r
    p = fract(p);\r
    p *= uDigitSize;\r
    \r
    float px5 = p.x * 5.0;\r
    float py5 = (1.0 - p.y) * 5.0;\r
    float x = fract(px5);\r
    float y = fract(py5);\r
    \r
    float i = floor(py5) - 2.0;\r
    float j = floor(px5) - 2.0;\r
    float n = i * i + j * j;\r
    float f = n * 0.0625;\r
    \r
    float isOn = step(0.1, intensity - f);\r
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);\r
    \r
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;\r
}\r
\r
float onOff(float a, float b, float c)\r
{\r
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;\r
}\r
\r
float displace(vec2 look)\r
{\r
    float y = look.y - mod(iTime * 0.25, 1.0);\r
    float window = 1.0 / (1.0 + 50.0 * y * y);\r
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;\r
}\r
\r
vec3 getColor(vec2 p){\r
    \r
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;\r
    bar *= uScanlineIntensity;\r
    \r
    float displacement = displace(p);\r
    p.x += displacement;\r
\r
    if (uGlitchAmount != 1.0) {\r
      float extra = displacement * (uGlitchAmount - 1.0);\r
      p.x += extra;\r
    }\r
\r
    float middle = digit(p);\r
    \r
    const float off = 0.002;\r
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +\r
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +\r
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));\r
    \r
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;\r
    return baseColor;\r
}\r
\r
vec2 barrel(vec2 uv){\r
  vec2 c = uv * 2.0 - 1.0;\r
  float r2 = dot(c, c);\r
  c *= 1.0 + uCurvature * r2;\r
  return c * 0.5 + 0.5;\r
}\r
\r
void main() {\r
    time = iTime * 0.333333;\r
    vec2 uv = vUv;\r
\r
    if(uCurvature != 0.0){\r
      uv = barrel(uv);\r
    }\r
    \r
    vec2 p = uv * uScale;\r
    vec3 col = getColor(p);\r
\r
    if(uChromaticAberration != 0.0){\r
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;\r
      col.r = getColor(p + ca).r;\r
      col.b = getColor(p - ca).b;\r
    }\r
\r
    col *= uTint;\r
    col *= uBrightness;\r
\r
    if(uDither > 0.0){\r
      float rnd = hash21(gl_FragCoord.xy);\r
      col += (rnd - 0.5) * (uDither * 0.003922);\r
    }\r
\r
    gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
function hexToRgb(hex) {\r
  let h = hex.replace('#', '').trim();\r
  if (h.length === 3)\r
    h = h\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  const num = parseInt(h, 16);\r
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];\r
}\r
\r
export default function FaultyTerminal({\r
  scale = 1,\r
  gridMul = [2, 1],\r
  digitSize = 1.5,\r
  timeScale = 0.3,\r
  pause = false,\r
  scanlineIntensity = 0.3,\r
  glitchAmount = 1,\r
  flickerAmount = 1,\r
  noiseAmp = 0,\r
  chromaticAberration = 0,\r
  dither = 0,\r
  curvature = 0.2,\r
  tint = '#ffffff',\r
  mouseReact = true,\r
  mouseStrength = 0.2,\r
  dpr = Math.min(window.devicePixelRatio || 1, 2),\r
  pageLoadAnimation = true,\r
  brightness = 1,\r
  className,\r
  style,\r
  ...rest\r
}) {\r
  const containerRef = useRef(null);\r
  const programRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const mouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const frozenTimeRef = useRef(0);\r
  const rafRef = useRef(0);\r
  const loadAnimationStartRef = useRef(0);\r
  const timeOffsetRef = useRef(Math.random() * 100);\r
\r
  const tintVec = useMemo(() => hexToRgb(tint), [tint]);\r
\r
  const ditherValue = useMemo(() => (typeof dither === 'boolean' ? (dither ? 1 : 0) : dither), [dither]);\r
\r
  const handleMouseMove = useCallback(e => {\r
    const ctn = containerRef.current;\r
    if (!ctn) return;\r
    const rect = ctn.getBoundingClientRect();\r
    const x = (e.clientX - rect.left) / rect.width;\r
    const y = 1 - (e.clientY - rect.top) / rect.height;\r
    mouseRef.current = { x, y };\r
  }, []);\r
\r
  useEffect(() => {\r
    const ctn = containerRef.current;\r
    if (!ctn) return;\r
\r
    const renderer = new Renderer({ dpr });\r
    rendererRef.current = renderer;\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 1);\r
\r
    const geometry = new Triangle(gl);\r
\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uScale: { value: scale },\r
\r
        uGridMul: { value: new Float32Array(gridMul) },\r
        uDigitSize: { value: digitSize },\r
        uScanlineIntensity: { value: scanlineIntensity },\r
        uGlitchAmount: { value: glitchAmount },\r
        uFlickerAmount: { value: flickerAmount },\r
        uNoiseAmp: { value: noiseAmp },\r
        uChromaticAberration: { value: chromaticAberration },\r
        uDither: { value: ditherValue },\r
        uCurvature: { value: curvature },\r
        uTint: { value: new Color(tintVec[0], tintVec[1], tintVec[2]) },\r
        uMouse: {\r
          value: new Float32Array([smoothMouseRef.current.x, smoothMouseRef.current.y])\r
        },\r
        uMouseStrength: { value: mouseStrength },\r
        uUseMouse: { value: mouseReact ? 1 : 0 },\r
        uPageLoadProgress: { value: pageLoadAnimation ? 0 : 1 },\r
        uUsePageLoadAnimation: { value: pageLoadAnimation ? 1 : 0 },\r
        uBrightness: { value: brightness }\r
      }\r
    });\r
    programRef.current = program;\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      if (!ctn || !renderer) return;\r
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);\r
      program.uniforms.iResolution.value = new Color(\r
        gl.canvas.width,\r
        gl.canvas.height,\r
        gl.canvas.width / gl.canvas.height\r
      );\r
    }\r
\r
    const resizeObserver = new ResizeObserver(() => resize());\r
    resizeObserver.observe(ctn);\r
    resize();\r
\r
    const update = t => {\r
      rafRef.current = requestAnimationFrame(update);\r
\r
      if (pageLoadAnimation && loadAnimationStartRef.current === 0) {\r
        loadAnimationStartRef.current = t;\r
      }\r
\r
      if (!pause) {\r
        const elapsed = (t * 0.001 + timeOffsetRef.current) * timeScale;\r
        program.uniforms.iTime.value = elapsed;\r
        frozenTimeRef.current = elapsed;\r
      } else {\r
        program.uniforms.iTime.value = frozenTimeRef.current;\r
      }\r
\r
      if (pageLoadAnimation && loadAnimationStartRef.current > 0) {\r
        const animationDuration = 2000;\r
        const animationElapsed = t - loadAnimationStartRef.current;\r
        const progress = Math.min(animationElapsed / animationDuration, 1);\r
        program.uniforms.uPageLoadProgress.value = progress;\r
      }\r
\r
      if (mouseReact) {\r
        const dampingFactor = 0.08;\r
        const smoothMouse = smoothMouseRef.current;\r
        const mouse = mouseRef.current;\r
        smoothMouse.x += (mouse.x - smoothMouse.x) * dampingFactor;\r
        smoothMouse.y += (mouse.y - smoothMouse.y) * dampingFactor;\r
\r
        const mouseUniform = program.uniforms.uMouse.value;\r
        mouseUniform[0] = smoothMouse.x;\r
        mouseUniform[1] = smoothMouse.y;\r
      }\r
\r
      renderer.render({ scene: mesh });\r
    };\r
    rafRef.current = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    if (mouseReact) ctn.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      cancelAnimationFrame(rafRef.current);\r
      resizeObserver.disconnect();\r
      if (mouseReact) ctn.removeEventListener('mousemove', handleMouseMove);\r
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
      loadAnimationStartRef.current = 0;\r
      timeOffsetRef.current = Math.random() * 100;\r
    };\r
  }, [\r
    dpr,\r
    pause,\r
    timeScale,\r
    scale,\r
    gridMul,\r
    digitSize,\r
    scanlineIntensity,\r
    glitchAmount,\r
    flickerAmount,\r
    noiseAmp,\r
    chromaticAberration,\r
    ditherValue,\r
    curvature,\r
    tintVec,\r
    mouseReact,\r
    mouseStrength,\r
    pageLoadAnimation,\r
    brightness,\r
    handleMouseMove\r
  ]);\r
\r
  return <div ref={containerRef} className={\`faulty-terminal-container \${className}\`} style={style} {...rest} />;\r
}\r
`,hn=`.faulty-terminal-container {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
  overflow: hidden;\r
}\r
`,yn=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef, useMemo, useCallback } from 'react';\r
\r
const vertexShader = \`\r
attribute vec2 position;\r
attribute vec2 uv;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision mediump float;\r
\r
varying vec2 vUv;\r
\r
uniform float iTime;\r
uniform vec3  iResolution;\r
uniform float uScale;\r
\r
uniform vec2  uGridMul;\r
uniform float uDigitSize;\r
uniform float uScanlineIntensity;\r
uniform float uGlitchAmount;\r
uniform float uFlickerAmount;\r
uniform float uNoiseAmp;\r
uniform float uChromaticAberration;\r
uniform float uDither;\r
uniform float uCurvature;\r
uniform vec3  uTint;\r
uniform vec2  uMouse;\r
uniform float uMouseStrength;\r
uniform float uUseMouse;\r
uniform float uPageLoadProgress;\r
uniform float uUsePageLoadAnimation;\r
uniform float uBrightness;\r
\r
float time;\r
\r
float hash21(vec2 p){\r
  p = fract(p * 234.56);\r
  p += dot(p, p + 34.56);\r
  return fract(p.x * p.y);\r
}\r
\r
float noise(vec2 p)\r
{\r
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; \r
}\r
\r
mat2 rotate(float angle)\r
{\r
  float c = cos(angle);\r
  float s = sin(angle);\r
  return mat2(c, -s, s, c);\r
}\r
\r
float fbm(vec2 p)\r
{\r
  p *= 1.1;\r
  float f = 0.0;\r
  float amp = 0.5 * uNoiseAmp;\r
  \r
  mat2 modify0 = rotate(time * 0.02);\r
  f += amp * noise(p);\r
  p = modify0 * p * 2.0;\r
  amp *= 0.454545;\r
  \r
  mat2 modify1 = rotate(time * 0.02);\r
  f += amp * noise(p);\r
  p = modify1 * p * 2.0;\r
  amp *= 0.454545;\r
  \r
  mat2 modify2 = rotate(time * 0.08);\r
  f += amp * noise(p);\r
  \r
  return f;\r
}\r
\r
float pattern(vec2 p, out vec2 q, out vec2 r) {\r
  vec2 offset1 = vec2(1.0);\r
  vec2 offset0 = vec2(0.0);\r
  mat2 rot01 = rotate(0.1 * time);\r
  mat2 rot1 = rotate(0.1);\r
  \r
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));\r
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));\r
  return fbm(p + r);\r
}\r
\r
float digit(vec2 p){\r
    vec2 grid = uGridMul * 15.0;\r
    vec2 s = floor(p * grid) / grid;\r
    p = p * grid;\r
    vec2 q, r;\r
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;\r
    \r
    if(uUseMouse > 0.5){\r
        vec2 mouseWorld = uMouse * uScale;\r
        float distToMouse = distance(s, mouseWorld);\r
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;\r
        intensity += mouseInfluence;\r
        \r
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;\r
        intensity += ripple;\r
    }\r
    \r
    if(uUsePageLoadAnimation > 0.5){\r
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);\r
        float cellDelay = cellRandom * 0.8;\r
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);\r
        \r
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);\r
        intensity *= fadeAlpha;\r
    }\r
    \r
    p = fract(p);\r
    p *= uDigitSize;\r
    \r
    float px5 = p.x * 5.0;\r
    float py5 = (1.0 - p.y) * 5.0;\r
    float x = fract(px5);\r
    float y = fract(py5);\r
    \r
    float i = floor(py5) - 2.0;\r
    float j = floor(px5) - 2.0;\r
    float n = i * i + j * j;\r
    float f = n * 0.0625;\r
    \r
    float isOn = step(0.1, intensity - f);\r
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);\r
    \r
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;\r
}\r
\r
float onOff(float a, float b, float c)\r
{\r
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;\r
}\r
\r
float displace(vec2 look)\r
{\r
    float y = look.y - mod(iTime * 0.25, 1.0);\r
    float window = 1.0 / (1.0 + 50.0 * y * y);\r
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;\r
}\r
\r
vec3 getColor(vec2 p){\r
    \r
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;\r
    bar *= uScanlineIntensity;\r
    \r
    float displacement = displace(p);\r
    p.x += displacement;\r
\r
    if (uGlitchAmount != 1.0) {\r
      float extra = displacement * (uGlitchAmount - 1.0);\r
      p.x += extra;\r
    }\r
\r
    float middle = digit(p);\r
    \r
    const float off = 0.002;\r
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +\r
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +\r
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));\r
    \r
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;\r
    return baseColor;\r
}\r
\r
vec2 barrel(vec2 uv){\r
  vec2 c = uv * 2.0 - 1.0;\r
  float r2 = dot(c, c);\r
  c *= 1.0 + uCurvature * r2;\r
  return c * 0.5 + 0.5;\r
}\r
\r
void main() {\r
    time = iTime * 0.333333;\r
    vec2 uv = vUv;\r
\r
    if(uCurvature != 0.0){\r
      uv = barrel(uv);\r
    }\r
    \r
    vec2 p = uv * uScale;\r
    vec3 col = getColor(p);\r
\r
    if(uChromaticAberration != 0.0){\r
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;\r
      col.r = getColor(p + ca).r;\r
      col.b = getColor(p - ca).b;\r
    }\r
\r
    col *= uTint;\r
    col *= uBrightness;\r
\r
    if(uDither > 0.0){\r
      float rnd = hash21(gl_FragCoord.xy);\r
      col += (rnd - 0.5) * (uDither * 0.003922);\r
    }\r
\r
    gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
function hexToRgb(hex) {\r
  let h = hex.replace('#', '').trim();\r
  if (h.length === 3)\r
    h = h\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  const num = parseInt(h, 16);\r
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];\r
}\r
\r
export default function FaultyTerminal({\r
  scale = 1,\r
  gridMul = [2, 1],\r
  digitSize = 1.5,\r
  timeScale = 0.3,\r
  pause = false,\r
  scanlineIntensity = 0.3,\r
  glitchAmount = 1,\r
  flickerAmount = 1,\r
  noiseAmp = 1,\r
  chromaticAberration = 0,\r
  dither = 0,\r
  curvature = 0.2,\r
  tint = '#ffffff',\r
  mouseReact = true,\r
  mouseStrength = 0.2,\r
  dpr = Math.min(window.devicePixelRatio || 1, 2),\r
  pageLoadAnimation = true,\r
  brightness = 1,\r
  className,\r
  style,\r
  ...rest\r
}) {\r
  const containerRef = useRef(null);\r
  const programRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const mouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const frozenTimeRef = useRef(0);\r
  const rafRef = useRef(0);\r
  const loadAnimationStartRef = useRef(0);\r
  const timeOffsetRef = useRef(Math.random() * 100);\r
\r
  const tintVec = useMemo(() => hexToRgb(tint), [tint]);\r
\r
  const ditherValue = useMemo(() => (typeof dither === 'boolean' ? (dither ? 1 : 0) : dither), [dither]);\r
\r
  const handleMouseMove = useCallback(e => {\r
    const ctn = containerRef.current;\r
    if (!ctn) return;\r
    const rect = ctn.getBoundingClientRect();\r
    const x = (e.clientX - rect.left) / rect.width;\r
    const y = 1 - (e.clientY - rect.top) / rect.height;\r
    mouseRef.current = { x, y };\r
  }, []);\r
\r
  useEffect(() => {\r
    const ctn = containerRef.current;\r
    if (!ctn) return;\r
\r
    const renderer = new Renderer({ dpr });\r
    rendererRef.current = renderer;\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 1);\r
\r
    const geometry = new Triangle(gl);\r
\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uScale: { value: scale },\r
\r
        uGridMul: { value: new Float32Array(gridMul) },\r
        uDigitSize: { value: digitSize },\r
        uScanlineIntensity: { value: scanlineIntensity },\r
        uGlitchAmount: { value: glitchAmount },\r
        uFlickerAmount: { value: flickerAmount },\r
        uNoiseAmp: { value: noiseAmp },\r
        uChromaticAberration: { value: chromaticAberration },\r
        uDither: { value: ditherValue },\r
        uCurvature: { value: curvature },\r
        uTint: { value: new Color(tintVec[0], tintVec[1], tintVec[2]) },\r
        uMouse: {\r
          value: new Float32Array([smoothMouseRef.current.x, smoothMouseRef.current.y])\r
        },\r
        uMouseStrength: { value: mouseStrength },\r
        uUseMouse: { value: mouseReact ? 1 : 0 },\r
        uPageLoadProgress: { value: pageLoadAnimation ? 0 : 1 },\r
        uUsePageLoadAnimation: { value: pageLoadAnimation ? 1 : 0 },\r
        uBrightness: { value: brightness }\r
      }\r
    });\r
    programRef.current = program;\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      if (!ctn || !renderer) return;\r
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);\r
      program.uniforms.iResolution.value = new Color(\r
        gl.canvas.width,\r
        gl.canvas.height,\r
        gl.canvas.width / gl.canvas.height\r
      );\r
    }\r
\r
    const resizeObserver = new ResizeObserver(() => resize());\r
    resizeObserver.observe(ctn);\r
    resize();\r
\r
    const update = t => {\r
      rafRef.current = requestAnimationFrame(update);\r
\r
      if (pageLoadAnimation && loadAnimationStartRef.current === 0) {\r
        loadAnimationStartRef.current = t;\r
      }\r
\r
      if (!pause) {\r
        const elapsed = (t * 0.001 + timeOffsetRef.current) * timeScale;\r
        program.uniforms.iTime.value = elapsed;\r
        frozenTimeRef.current = elapsed;\r
      } else {\r
        program.uniforms.iTime.value = frozenTimeRef.current;\r
      }\r
\r
      if (pageLoadAnimation && loadAnimationStartRef.current > 0) {\r
        const animationDuration = 2000;\r
        const animationElapsed = t - loadAnimationStartRef.current;\r
        const progress = Math.min(animationElapsed / animationDuration, 1);\r
        program.uniforms.uPageLoadProgress.value = progress;\r
      }\r
\r
      if (mouseReact) {\r
        const dampingFactor = 0.08;\r
        const smoothMouse = smoothMouseRef.current;\r
        const mouse = mouseRef.current;\r
        smoothMouse.x += (mouse.x - smoothMouse.x) * dampingFactor;\r
        smoothMouse.y += (mouse.y - smoothMouse.y) * dampingFactor;\r
\r
        const mouseUniform = program.uniforms.uMouse.value;\r
        mouseUniform[0] = smoothMouse.x;\r
        mouseUniform[1] = smoothMouse.y;\r
      }\r
\r
      renderer.render({ scene: mesh });\r
    };\r
    rafRef.current = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    if (mouseReact) ctn.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      cancelAnimationFrame(rafRef.current);\r
      resizeObserver.disconnect();\r
      if (mouseReact) ctn.removeEventListener('mousemove', handleMouseMove);\r
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
      loadAnimationStartRef.current = 0;\r
      timeOffsetRef.current = Math.random() * 100;\r
    };\r
  }, [\r
    dpr,\r
    pause,\r
    timeScale,\r
    scale,\r
    gridMul,\r
    digitSize,\r
    scanlineIntensity,\r
    glitchAmount,\r
    flickerAmount,\r
    noiseAmp,\r
    chromaticAberration,\r
    ditherValue,\r
    curvature,\r
    tintVec,\r
    mouseReact,\r
    mouseStrength,\r
    pageLoadAnimation,\r
    brightness,\r
    handleMouseMove\r
  ]);\r
\r
  return (\r
    <div ref={containerRef} className={\`w-full h-full relative overflow-hidden \${className}\`} style={style} {...rest} />\r
  );\r
}\r
`,Rn=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import React, { useEffect, useRef, useMemo, useCallback } from 'react';\r
import './FaultyTerminal.css';\r
\r
type Vec2 = [number, number];\r
\r
export interface FaultyTerminalProps extends React.HTMLAttributes<HTMLDivElement> {\r
  scale?: number;\r
  gridMul?: Vec2;\r
  digitSize?: number;\r
  timeScale?: number;\r
  pause?: boolean;\r
  scanlineIntensity?: number;\r
  glitchAmount?: number;\r
  flickerAmount?: number;\r
  noiseAmp?: number;\r
  chromaticAberration?: number;\r
  dither?: number | boolean;\r
  curvature?: number;\r
  tint?: string;\r
  mouseReact?: boolean;\r
  mouseStrength?: number;\r
  dpr?: number;\r
  pageLoadAnimation?: boolean;\r
  brightness?: number;\r
}\r
\r
const vertexShader = \`\r
attribute vec2 position;\r
attribute vec2 uv;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision mediump float;\r
\r
varying vec2 vUv;\r
\r
uniform float iTime;\r
uniform vec3  iResolution;\r
uniform float uScale;\r
\r
uniform vec2  uGridMul;\r
uniform float uDigitSize;\r
uniform float uScanlineIntensity;\r
uniform float uGlitchAmount;\r
uniform float uFlickerAmount;\r
uniform float uNoiseAmp;\r
uniform float uChromaticAberration;\r
uniform float uDither;\r
uniform float uCurvature;\r
uniform vec3  uTint;\r
uniform vec2  uMouse;\r
uniform float uMouseStrength;\r
uniform float uUseMouse;\r
uniform float uPageLoadProgress;\r
uniform float uUsePageLoadAnimation;\r
uniform float uBrightness;\r
\r
float time;\r
\r
float hash21(vec2 p){\r
  p = fract(p * 234.56);\r
  p += dot(p, p + 34.56);\r
  return fract(p.x * p.y);\r
}\r
\r
float noise(vec2 p)\r
{\r
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; \r
}\r
\r
mat2 rotate(float angle)\r
{\r
  float c = cos(angle);\r
  float s = sin(angle);\r
  return mat2(c, -s, s, c);\r
}\r
\r
float fbm(vec2 p)\r
{\r
  p *= 1.1;\r
  float f = 0.0;\r
  float amp = 0.5 * uNoiseAmp;\r
  \r
  mat2 modify0 = rotate(time * 0.02);\r
  f += amp * noise(p);\r
  p = modify0 * p * 2.0;\r
  amp *= 0.454545;\r
  \r
  mat2 modify1 = rotate(time * 0.02);\r
  f += amp * noise(p);\r
  p = modify1 * p * 2.0;\r
  amp *= 0.454545;\r
  \r
  mat2 modify2 = rotate(time * 0.08);\r
  f += amp * noise(p);\r
  \r
  return f;\r
}\r
\r
float pattern(vec2 p, out vec2 q, out vec2 r) {\r
  vec2 offset1 = vec2(1.0);\r
  vec2 offset0 = vec2(0.0);\r
  mat2 rot01 = rotate(0.1 * time);\r
  mat2 rot1 = rotate(0.1);\r
  \r
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));\r
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));\r
  return fbm(p + r);\r
}\r
\r
float digit(vec2 p){\r
    vec2 grid = uGridMul * 15.0;\r
    vec2 s = floor(p * grid) / grid;\r
    p = p * grid;\r
    vec2 q, r;\r
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;\r
    \r
    if(uUseMouse > 0.5){\r
        vec2 mouseWorld = uMouse * uScale;\r
        float distToMouse = distance(s, mouseWorld);\r
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;\r
        intensity += mouseInfluence;\r
        \r
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;\r
        intensity += ripple;\r
    }\r
    \r
    if(uUsePageLoadAnimation > 0.5){\r
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);\r
        float cellDelay = cellRandom * 0.8;\r
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);\r
        \r
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);\r
        intensity *= fadeAlpha;\r
    }\r
    \r
    p = fract(p);\r
    p *= uDigitSize;\r
    \r
    float px5 = p.x * 5.0;\r
    float py5 = (1.0 - p.y) * 5.0;\r
    float x = fract(px5);\r
    float y = fract(py5);\r
    \r
    float i = floor(py5) - 2.0;\r
    float j = floor(px5) - 2.0;\r
    float n = i * i + j * j;\r
    float f = n * 0.0625;\r
    \r
    float isOn = step(0.1, intensity - f);\r
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);\r
    \r
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;\r
}\r
\r
float onOff(float a, float b, float c)\r
{\r
	return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;\r
}\r
\r
float displace(vec2 look)\r
{\r
    float y = look.y - mod(iTime * 0.25, 1.0);\r
    float window = 1.0 / (1.0 + 50.0 * y * y);\r
	  return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;\r
}\r
\r
vec3 getColor(vec2 p){\r
    \r
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;\r
    bar *= uScanlineIntensity;\r
    \r
    float displacement = displace(p);\r
    p.x += displacement;\r
\r
    if (uGlitchAmount != 1.0) {\r
      float extra = displacement * (uGlitchAmount - 1.0);\r
      p.x += extra;\r
    }\r
\r
    float middle = digit(p);\r
    \r
    const float off = 0.002;\r
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +\r
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +\r
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));\r
    \r
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;\r
    return baseColor;\r
}\r
\r
vec2 barrel(vec2 uv){\r
  vec2 c = uv * 2.0 - 1.0;\r
  float r2 = dot(c, c);\r
  c *= 1.0 + uCurvature * r2;\r
  return c * 0.5 + 0.5;\r
}\r
\r
void main() {\r
    time = iTime * 0.333333;\r
    vec2 uv = vUv;\r
\r
    if(uCurvature != 0.0){\r
      uv = barrel(uv);\r
    }\r
    \r
    vec2 p = uv * uScale;\r
    vec3 col = getColor(p);\r
\r
    if(uChromaticAberration != 0.0){\r
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;\r
      col.r = getColor(p + ca).r;\r
      col.b = getColor(p - ca).b;\r
    }\r
\r
    col *= uTint;\r
    col *= uBrightness;\r
\r
    if(uDither > 0.0){\r
      float rnd = hash21(gl_FragCoord.xy);\r
      col += (rnd - 0.5) * (uDither * 0.003922);\r
    }\r
\r
    gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
function hexToRgb(hex: string): [number, number, number] {\r
  let h = hex.replace('#', '').trim();\r
  if (h.length === 3)\r
    h = h\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  const num = parseInt(h, 16);\r
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];\r
}\r
\r
export default function FaultyTerminal({\r
  scale = 1,\r
  gridMul = [2, 1],\r
  digitSize = 1.5,\r
  timeScale = 0.3,\r
  pause = false,\r
  scanlineIntensity = 0.3,\r
  glitchAmount = 1,\r
  flickerAmount = 1,\r
  noiseAmp = 1,\r
  chromaticAberration = 0,\r
  dither = 0,\r
  curvature = 0.2,\r
  tint = '#ffffff',\r
  mouseReact = true,\r
  mouseStrength = 0.2,\r
  dpr = Math.min(window.devicePixelRatio || 1, 2),\r
  pageLoadAnimation = true,\r
  brightness = 1,\r
  className,\r
  style,\r
  ...rest\r
}: FaultyTerminalProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const programRef = useRef<Program>(null);\r
  const rendererRef = useRef<Renderer>(null);\r
  const mouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const frozenTimeRef = useRef(0);\r
  const rafRef = useRef<number>(0);\r
  const loadAnimationStartRef = useRef<number>(0);\r
  const timeOffsetRef = useRef<number>(Math.random() * 100);\r
\r
  const tintVec = useMemo(() => hexToRgb(tint), [tint]);\r
\r
  const ditherValue = useMemo(() => (typeof dither === 'boolean' ? (dither ? 1 : 0) : dither), [dither]);\r
\r
  const handleMouseMove = useCallback((e: MouseEvent) => {\r
    const ctn = containerRef.current;\r
    if (!ctn) return;\r
    const rect = ctn.getBoundingClientRect();\r
    const x = (e.clientX - rect.left) / rect.width;\r
    const y = 1 - (e.clientY - rect.top) / rect.height;\r
    mouseRef.current = { x, y };\r
  }, []);\r
\r
  useEffect(() => {\r
    const ctn = containerRef.current;\r
    if (!ctn) return;\r
\r
    const renderer = new Renderer({ dpr });\r
    rendererRef.current = renderer;\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 1);\r
\r
    const geometry = new Triangle(gl);\r
\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uScale: { value: scale },\r
\r
        uGridMul: { value: new Float32Array(gridMul) },\r
        uDigitSize: { value: digitSize },\r
        uScanlineIntensity: { value: scanlineIntensity },\r
        uGlitchAmount: { value: glitchAmount },\r
        uFlickerAmount: { value: flickerAmount },\r
        uNoiseAmp: { value: noiseAmp },\r
        uChromaticAberration: { value: chromaticAberration },\r
        uDither: { value: ditherValue },\r
        uCurvature: { value: curvature },\r
        uTint: { value: new Color(tintVec[0], tintVec[1], tintVec[2]) },\r
        uMouse: {\r
          value: new Float32Array([smoothMouseRef.current.x, smoothMouseRef.current.y])\r
        },\r
        uMouseStrength: { value: mouseStrength },\r
        uUseMouse: { value: mouseReact ? 1 : 0 },\r
        uPageLoadProgress: { value: pageLoadAnimation ? 0 : 1 },\r
        uUsePageLoadAnimation: { value: pageLoadAnimation ? 1 : 0 },\r
        uBrightness: { value: brightness }\r
      }\r
    });\r
    programRef.current = program;\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      if (!ctn || !renderer) return;\r
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);\r
      program.uniforms.iResolution.value = new Color(\r
        gl.canvas.width,\r
        gl.canvas.height,\r
        gl.canvas.width / gl.canvas.height\r
      );\r
    }\r
\r
    const resizeObserver = new ResizeObserver(() => resize());\r
    resizeObserver.observe(ctn);\r
    resize();\r
\r
    const update = (t: number) => {\r
      rafRef.current = requestAnimationFrame(update);\r
\r
      if (pageLoadAnimation && loadAnimationStartRef.current === 0) {\r
        loadAnimationStartRef.current = t;\r
      }\r
\r
      if (!pause) {\r
        const elapsed = (t * 0.001 + timeOffsetRef.current) * timeScale;\r
        program.uniforms.iTime.value = elapsed;\r
        frozenTimeRef.current = elapsed;\r
      } else {\r
        program.uniforms.iTime.value = frozenTimeRef.current;\r
      }\r
\r
      if (pageLoadAnimation && loadAnimationStartRef.current > 0) {\r
        const animationDuration = 2000;\r
        const animationElapsed = t - loadAnimationStartRef.current;\r
        const progress = Math.min(animationElapsed / animationDuration, 1);\r
        program.uniforms.uPageLoadProgress.value = progress;\r
      }\r
\r
      if (mouseReact) {\r
        const dampingFactor = 0.08;\r
        const smoothMouse = smoothMouseRef.current;\r
        const mouse = mouseRef.current;\r
        smoothMouse.x += (mouse.x - smoothMouse.x) * dampingFactor;\r
        smoothMouse.y += (mouse.y - smoothMouse.y) * dampingFactor;\r
\r
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;\r
        mouseUniform[0] = smoothMouse.x;\r
        mouseUniform[1] = smoothMouse.y;\r
      }\r
\r
      renderer.render({ scene: mesh });\r
    };\r
    rafRef.current = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    if (mouseReact) ctn.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      cancelAnimationFrame(rafRef.current);\r
      resizeObserver.disconnect();\r
      if (mouseReact) ctn.removeEventListener('mousemove', handleMouseMove);\r
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
      loadAnimationStartRef.current = 0;\r
      timeOffsetRef.current = Math.random() * 100;\r
    };\r
  }, [\r
    dpr,\r
    pause,\r
    timeScale,\r
    scale,\r
    gridMul,\r
    digitSize,\r
    scanlineIntensity,\r
    glitchAmount,\r
    flickerAmount,\r
    noiseAmp,\r
    chromaticAberration,\r
    ditherValue,\r
    curvature,\r
    tintVec,\r
    mouseReact,\r
    mouseStrength,\r
    pageLoadAnimation,\r
    brightness,\r
    handleMouseMove\r
  ]);\r
\r
  return <div ref={containerRef} className={\`faulty-terminal-container \${className}\`} style={style} {...rest} />;\r
}\r
`,bn=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import React, { useEffect, useRef, useMemo, useCallback } from 'react';\r
\r
type Vec2 = [number, number];\r
\r
export interface FaultyTerminalProps extends React.HTMLAttributes<HTMLDivElement> {\r
  scale?: number;\r
  gridMul?: Vec2;\r
  digitSize?: number;\r
  timeScale?: number;\r
  pause?: boolean;\r
  scanlineIntensity?: number;\r
  glitchAmount?: number;\r
  flickerAmount?: number;\r
  noiseAmp?: number;\r
  chromaticAberration?: number;\r
  dither?: number | boolean;\r
  curvature?: number;\r
  tint?: string;\r
  mouseReact?: boolean;\r
  mouseStrength?: number;\r
  dpr?: number;\r
  pageLoadAnimation?: boolean;\r
  brightness?: number;\r
}\r
\r
const vertexShader = \`\r
attribute vec2 position;\r
attribute vec2 uv;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision mediump float;\r
\r
varying vec2 vUv;\r
\r
uniform float iTime;\r
uniform vec3  iResolution;\r
uniform float uScale;\r
\r
uniform vec2  uGridMul;\r
uniform float uDigitSize;\r
uniform float uScanlineIntensity;\r
uniform float uGlitchAmount;\r
uniform float uFlickerAmount;\r
uniform float uNoiseAmp;\r
uniform float uChromaticAberration;\r
uniform float uDither;\r
uniform float uCurvature;\r
uniform vec3  uTint;\r
uniform vec2  uMouse;\r
uniform float uMouseStrength;\r
uniform float uUseMouse;\r
uniform float uPageLoadProgress;\r
uniform float uUsePageLoadAnimation;\r
uniform float uBrightness;\r
\r
float time;\r
\r
float hash21(vec2 p){\r
  p = fract(p * 234.56);\r
  p += dot(p, p + 34.56);\r
  return fract(p.x * p.y);\r
}\r
\r
float noise(vec2 p)\r
{\r
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; \r
}\r
\r
mat2 rotate(float angle)\r
{\r
  float c = cos(angle);\r
  float s = sin(angle);\r
  return mat2(c, -s, s, c);\r
}\r
\r
float fbm(vec2 p)\r
{\r
  p *= 1.1;\r
  float f = 0.0;\r
  float amp = 0.5 * uNoiseAmp;\r
  \r
  mat2 modify0 = rotate(time * 0.02);\r
  f += amp * noise(p);\r
  p = modify0 * p * 2.0;\r
  amp *= 0.454545;\r
  \r
  mat2 modify1 = rotate(time * 0.02);\r
  f += amp * noise(p);\r
  p = modify1 * p * 2.0;\r
  amp *= 0.454545;\r
  \r
  mat2 modify2 = rotate(time * 0.08);\r
  f += amp * noise(p);\r
  \r
  return f;\r
}\r
\r
float pattern(vec2 p, out vec2 q, out vec2 r) {\r
  vec2 offset1 = vec2(1.0);\r
  vec2 offset0 = vec2(0.0);\r
  mat2 rot01 = rotate(0.1 * time);\r
  mat2 rot1 = rotate(0.1);\r
  \r
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));\r
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));\r
  return fbm(p + r);\r
}\r
\r
float digit(vec2 p){\r
    vec2 grid = uGridMul * 15.0;\r
    vec2 s = floor(p * grid) / grid;\r
    p = p * grid;\r
    vec2 q, r;\r
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;\r
    \r
    if(uUseMouse > 0.5){\r
        vec2 mouseWorld = uMouse * uScale;\r
        float distToMouse = distance(s, mouseWorld);\r
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;\r
        intensity += mouseInfluence;\r
        \r
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;\r
        intensity += ripple;\r
    }\r
    \r
    if(uUsePageLoadAnimation > 0.5){\r
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);\r
        float cellDelay = cellRandom * 0.8;\r
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);\r
        \r
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);\r
        intensity *= fadeAlpha;\r
    }\r
    \r
    p = fract(p);\r
    p *= uDigitSize;\r
    \r
    float px5 = p.x * 5.0;\r
    float py5 = (1.0 - p.y) * 5.0;\r
    float x = fract(px5);\r
    float y = fract(py5);\r
    \r
    float i = floor(py5) - 2.0;\r
    float j = floor(px5) - 2.0;\r
    float n = i * i + j * j;\r
    float f = n * 0.0625;\r
    \r
    float isOn = step(0.1, intensity - f);\r
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);\r
    \r
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;\r
}\r
\r
float onOff(float a, float b, float c)\r
{\r
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;\r
}\r
\r
float displace(vec2 look)\r
{\r
    float y = look.y - mod(iTime * 0.25, 1.0);\r
    float window = 1.0 / (1.0 + 50.0 * y * y);\r
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;\r
}\r
\r
vec3 getColor(vec2 p){\r
    \r
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;\r
    bar *= uScanlineIntensity;\r
    \r
    float displacement = displace(p);\r
    p.x += displacement;\r
\r
    if (uGlitchAmount != 1.0) {\r
      float extra = displacement * (uGlitchAmount - 1.0);\r
      p.x += extra;\r
    }\r
\r
    float middle = digit(p);\r
    \r
    const float off = 0.002;\r
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +\r
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +\r
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));\r
    \r
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;\r
    return baseColor;\r
}\r
\r
vec2 barrel(vec2 uv){\r
  vec2 c = uv * 2.0 - 1.0;\r
  float r2 = dot(c, c);\r
  c *= 1.0 + uCurvature * r2;\r
  return c * 0.5 + 0.5;\r
}\r
\r
void main() {\r
    time = iTime * 0.333333;\r
    vec2 uv = vUv;\r
\r
    if(uCurvature != 0.0){\r
      uv = barrel(uv);\r
    }\r
    \r
    vec2 p = uv * uScale;\r
    vec3 col = getColor(p);\r
\r
    if(uChromaticAberration != 0.0){\r
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;\r
      col.r = getColor(p + ca).r;\r
      col.b = getColor(p - ca).b;\r
    }\r
\r
    col *= uTint;\r
    col *= uBrightness;\r
\r
    if(uDither > 0.0){\r
      float rnd = hash21(gl_FragCoord.xy);\r
      col += (rnd - 0.5) * (uDither * 0.003922);\r
    }\r
\r
    gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
function hexToRgb(hex: string): [number, number, number] {\r
  let h = hex.replace('#', '').trim();\r
  if (h.length === 3)\r
    h = h\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  const num = parseInt(h, 16);\r
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];\r
}\r
\r
export default function FaultyTerminal({\r
  scale = 1,\r
  gridMul = [2, 1],\r
  digitSize = 1.5,\r
  timeScale = 0.3,\r
  pause = false,\r
  scanlineIntensity = 0.3,\r
  glitchAmount = 1,\r
  flickerAmount = 1,\r
  noiseAmp = 1,\r
  chromaticAberration = 0,\r
  dither = 0,\r
  curvature = 0.2,\r
  tint = '#ffffff',\r
  mouseReact = true,\r
  mouseStrength = 0.2,\r
  dpr = Math.min(window.devicePixelRatio || 1, 2),\r
  pageLoadAnimation = true,\r
  brightness = 1,\r
  className,\r
  style,\r
  ...rest\r
}: FaultyTerminalProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const programRef = useRef<Program>(null);\r
  const rendererRef = useRef<Renderer>(null);\r
  const mouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const frozenTimeRef = useRef(0);\r
  const rafRef = useRef<number>(0);\r
  const loadAnimationStartRef = useRef<number>(0);\r
  const timeOffsetRef = useRef<number>(Math.random() * 100);\r
\r
  const tintVec = useMemo(() => hexToRgb(tint), [tint]);\r
\r
  const ditherValue = useMemo(() => (typeof dither === 'boolean' ? (dither ? 1 : 0) : dither), [dither]);\r
\r
  const handleMouseMove = useCallback((e: MouseEvent) => {\r
    const ctn = containerRef.current;\r
    if (!ctn) return;\r
    const rect = ctn.getBoundingClientRect();\r
    const x = (e.clientX - rect.left) / rect.width;\r
    const y = 1 - (e.clientY - rect.top) / rect.height;\r
    mouseRef.current = { x, y };\r
  }, []);\r
\r
  useEffect(() => {\r
    const ctn = containerRef.current;\r
    if (!ctn) return;\r
\r
    const renderer = new Renderer({ dpr });\r
    rendererRef.current = renderer;\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 1);\r
\r
    const geometry = new Triangle(gl);\r
\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uScale: { value: scale },\r
\r
        uGridMul: { value: new Float32Array(gridMul) },\r
        uDigitSize: { value: digitSize },\r
        uScanlineIntensity: { value: scanlineIntensity },\r
        uGlitchAmount: { value: glitchAmount },\r
        uFlickerAmount: { value: flickerAmount },\r
        uNoiseAmp: { value: noiseAmp },\r
        uChromaticAberration: { value: chromaticAberration },\r
        uDither: { value: ditherValue },\r
        uCurvature: { value: curvature },\r
        uTint: { value: new Color(tintVec[0], tintVec[1], tintVec[2]) },\r
        uMouse: {\r
          value: new Float32Array([smoothMouseRef.current.x, smoothMouseRef.current.y])\r
        },\r
        uMouseStrength: { value: mouseStrength },\r
        uUseMouse: { value: mouseReact ? 1 : 0 },\r
        uPageLoadProgress: { value: pageLoadAnimation ? 0 : 1 },\r
        uUsePageLoadAnimation: { value: pageLoadAnimation ? 1 : 0 },\r
        uBrightness: { value: brightness }\r
      }\r
    });\r
    programRef.current = program;\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      if (!ctn || !renderer) return;\r
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);\r
      program.uniforms.iResolution.value = new Color(\r
        gl.canvas.width,\r
        gl.canvas.height,\r
        gl.canvas.width / gl.canvas.height\r
      );\r
    }\r
\r
    const resizeObserver = new ResizeObserver(() => resize());\r
    resizeObserver.observe(ctn);\r
    resize();\r
\r
    const update = (t: number) => {\r
      rafRef.current = requestAnimationFrame(update);\r
\r
      if (pageLoadAnimation && loadAnimationStartRef.current === 0) {\r
        loadAnimationStartRef.current = t;\r
      }\r
\r
      if (!pause) {\r
        const elapsed = (t * 0.001 + timeOffsetRef.current) * timeScale;\r
        program.uniforms.iTime.value = elapsed;\r
        frozenTimeRef.current = elapsed;\r
      } else {\r
        program.uniforms.iTime.value = frozenTimeRef.current;\r
      }\r
\r
      if (pageLoadAnimation && loadAnimationStartRef.current > 0) {\r
        const animationDuration = 2000;\r
        const animationElapsed = t - loadAnimationStartRef.current;\r
        const progress = Math.min(animationElapsed / animationDuration, 1);\r
        program.uniforms.uPageLoadProgress.value = progress;\r
      }\r
\r
      if (mouseReact) {\r
        const dampingFactor = 0.08;\r
        const smoothMouse = smoothMouseRef.current;\r
        const mouse = mouseRef.current;\r
        smoothMouse.x += (mouse.x - smoothMouse.x) * dampingFactor;\r
        smoothMouse.y += (mouse.y - smoothMouse.y) * dampingFactor;\r
\r
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;\r
        mouseUniform[0] = smoothMouse.x;\r
        mouseUniform[1] = smoothMouse.y;\r
      }\r
\r
      renderer.render({ scene: mesh });\r
    };\r
    rafRef.current = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    if (mouseReact) ctn.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      cancelAnimationFrame(rafRef.current);\r
      resizeObserver.disconnect();\r
      if (mouseReact) ctn.removeEventListener('mousemove', handleMouseMove);\r
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
      loadAnimationStartRef.current = 0;\r
      timeOffsetRef.current = Math.random() * 100;\r
    };\r
  }, [\r
    dpr,\r
    pause,\r
    timeScale,\r
    scale,\r
    gridMul,\r
    digitSize,\r
    scanlineIntensity,\r
    glitchAmount,\r
    flickerAmount,\r
    noiseAmp,\r
    chromaticAberration,\r
    ditherValue,\r
    curvature,\r
    tintVec,\r
    mouseReact,\r
    mouseStrength,\r
    pageLoadAnimation,\r
    brightness,\r
    handleMouseMove\r
  ]);\r
\r
  return (\r
    <div ref={containerRef} className={\`w-full h-full relative overflow-hidden \${className}\`} style={style} {...rest} />\r
  );\r
}\r
`,An={dependencies:"ogl",usage:`import FaultyTerminal from './FaultyTerminal';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <FaultyTerminal
    scale={1.5}
    gridMul={[2, 1]}
    digitSize={1.2}
    timeScale={1}
    pause={false}
    scanlineIntensity={1}
    glitchAmount={1}
    flickerAmount={1}
    noiseAmp={1}
    chromaticAberration={0}
    dither={0}
    curvature={0}
    tint="#ffffff"
    mouseReact={true}
    mouseStrength={0.5}
    pageLoadAnimation={false}
    brightness={1}
  />
</div>`,code:gn,css:hn,tailwind:yn,tsCode:Rn,tsTailwind:bn},xn=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Mn=`
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;

uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p)
{
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; 
}

mat2 rotate(float angle)
{
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p)
{
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;
  
  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);
  
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);
  
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
    
    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;
        
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }
    
    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
        
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }
    
    p = fract(p);
    p *= uDigitSize;
    
    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);
    
    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;
    
    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);
    
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c)
{
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look)
{
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){
    
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;
    
    float displacement = displace(p);
    p.x += displacement;

    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);
    
    const float off = 0.002;
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));
    
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }
    
    vec2 p = uv * uScale;
    vec3 col = getColor(p);

    if(uChromaticAberration != 0.0){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      col.r = getColor(p + ca).r;
      col.b = getColor(p - ca).b;
    }

    col *= uTint;
    col *= uBrightness;

    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * (uDither * 0.003922);
    }

    gl_FragColor = vec4(col, 1.0);
}
`;function Sn(v){let i=v.replace("#","").trim();i.length===3&&(i=i.split("").map(m=>m+m).join(""));const a=parseInt(i,16);return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]}function Cn({scale:v=1,gridMul:i=[2,1],digitSize:a=1.5,timeScale:m=.3,pause:y=!1,scanlineIntensity:w=.3,glitchAmount:R=1,flickerAmount:P=1,noiseAmp:b=0,chromaticAberration:F=0,dither:p=0,curvature:z=.2,tint:A="#ffffff",mouseReact:d=!0,mouseStrength:x=.2,dpr:L=Math.min(window.devicePixelRatio||1,2),pageLoadAnimation:u=!0,brightness:D=1,className:U,style:G,...k}){const M=r.useRef(null),I=r.useRef(null),q=r.useRef(null),t=r.useRef({x:.5,y:.5}),S=r.useRef({x:.5,y:.5}),g=r.useRef(0),C=r.useRef(0),T=r.useRef(0),_=r.useRef(Math.random()*100),E=r.useMemo(()=>Sn(A),[A]),W=r.useMemo(()=>typeof p=="boolean"?p?1:0:p,[p]),V=r.useCallback(o=>{const l=M.current;if(!l)return;const e=l.getBoundingClientRect(),B=(o.clientX-e.left)/e.width,s=1-(o.clientY-e.top)/e.height;t.current={x:B,y:s}},[]);return r.useEffect(()=>{const o=M.current;if(!o)return;const l=new Q({dpr:L});q.current=l;const e=l.gl;e.clearColor(0,0,0,1);const B=new vn(e),s=new Z(e,{vertex:xn,fragment:Mn,uniforms:{iTime:{value:0},iResolution:{value:new N(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height)},uScale:{value:v},uGridMul:{value:new Float32Array(i)},uDigitSize:{value:a},uScanlineIntensity:{value:w},uGlitchAmount:{value:R},uFlickerAmount:{value:P},uNoiseAmp:{value:b},uChromaticAberration:{value:F},uDither:{value:W},uCurvature:{value:z},uTint:{value:new N(E[0],E[1],E[2])},uMouse:{value:new Float32Array([S.current.x,S.current.y])},uMouseStrength:{value:x},uUseMouse:{value:d?1:0},uPageLoadProgress:{value:u?0:1},uUsePageLoadAnimation:{value:u?1:0},uBrightness:{value:D}}});I.current=s;const K=new nn(e,{geometry:B,program:s});function H(){!o||!l||(l.setSize(o.offsetWidth,o.offsetHeight),s.uniforms.iResolution.value=new N(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height))}const X=new ResizeObserver(()=>H());X.observe(o),H();const Y=h=>{if(C.current=requestAnimationFrame(Y),u&&T.current===0&&(T.current=h),y)s.uniforms.iTime.value=g.current;else{const O=(h*.001+_.current)*m;s.uniforms.iTime.value=O,g.current=O}if(u&&T.current>0){const c=h-T.current,j=Math.min(c/2e3,1);s.uniforms.uPageLoadProgress.value=j}if(d){const c=S.current,j=t.current;c.x+=(j.x-c.x)*.08,c.y+=(j.y-c.y)*.08;const $=s.uniforms.uMouse.value;$[0]=c.x,$[1]=c.y}l.render({scene:K})};return C.current=requestAnimationFrame(Y),o.appendChild(e.canvas),d&&o.addEventListener("mousemove",V),()=>{var h;cancelAnimationFrame(C.current),X.disconnect(),d&&o.removeEventListener("mousemove",V),e.canvas.parentElement===o&&o.removeChild(e.canvas),(h=e.getExtension("WEBGL_lose_context"))==null||h.loseContext(),T.current=0,_.current=Math.random()*100}},[L,y,m,v,i,a,w,R,P,b,F,W,z,E,d,x,u,D,V]),n.jsx("div",{ref:M,className:`faulty-terminal-container ${U}`,style:G,...k})}const On=()=>{const[v,i]=dn(),[a,m]=r.useState(1.5),[y,w]=r.useState(1.2),[R,P]=r.useState(.5),[b,F]=r.useState(.5),[p,z]=r.useState(.1),[A,d]=r.useState("#A7EF9E"),[x,L]=r.useState(!0),[u,D]=r.useState(.5),[U,G]=r.useState(!0),[k,M]=r.useState(1),[I,q]=r.useState(.6),t=g=>C=>{g(C),i()},S=[{name:"scale",type:"number",default:"1.5",description:"Controls the zoom/scale of the pattern."},{name:"gridMul",type:"Vec2",default:"[2, 1]",description:"Grid multiplier for glyph density [x, y]."},{name:"digitSize",type:"number",default:"1.2",description:"Size of individual glyphs."},{name:"timeScale",type:"number",default:"1",description:"Animation speed multiplier."},{name:"pause",type:"boolean",default:"false",description:"Pause/resume animation."},{name:"scanlineIntensity",type:"number",default:"1",description:"Strength of scanline effects."},{name:"glitchAmount",type:"number",default:"1",description:"Glitch displacement intensity."},{name:"flickerAmount",type:"number",default:"1",description:"Flicker effect strength."},{name:"noiseAmp",type:"number",default:"1",description:"Noise pattern amplitude."},{name:"chromaticAberration",type:"number",default:"0",description:"RGB channel separation in pixels."},{name:"dither",type:"number | boolean",default:"0",description:"Dithering effect intensity."},{name:"curvature",type:"number",default:"0",description:"Barrel distortion amount."},{name:"tint",type:"string",default:"'#ffffff'",description:"Color tint (hex)."},{name:"mouseReact",type:"boolean",default:"true",description:"Enable/disable mouse interaction."},{name:"mouseStrength",type:"number",default:"0.5",description:"Mouse interaction intensity."},{name:"pageLoadAnimation",type:"boolean",default:"false",description:"Enable fade-in animation on load."},{name:"brightness",type:"number",default:"1",description:"Overall opacity/brightness control."},{name:"className",type:"string",default:"''",description:"Additional CSS classes."},{name:"style",type:"React.CSSProperties",default:"{}",description:"Inline styles."}];return n.jsxs(an,{children:[n.jsxs(sn,{children:[n.jsxs(rn,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[n.jsx(Cn,{scale:a,digitSize:y,timeScale:R,scanlineIntensity:b,curvature:p,tint:A,mouseReact:x,mouseStrength:u,pageLoadAnimation:U,noiseAmp:k,brightness:I},v),n.jsx(pn,{pillText:"New Background",headline:"It works on my machine, please check again"})]}),n.jsxs(fn,{children:[n.jsxs(en,{alignItems:"center",mb:4,children:[n.jsx(tn,{fontSize:"sm",mr:2,children:"Tint Color"}),n.jsx(on,{type:"color",value:A,onChange:g=>t(d)(g.target.value),width:"50px"})]}),n.jsx(f,{title:"Scale",min:1,max:3,step:.1,value:a,onChange:t(m)}),n.jsx(f,{title:"Digit Size",min:.5,max:3,step:.1,value:y,onChange:t(w)}),n.jsx(f,{title:"Speed",min:0,max:3,step:.1,value:R,onChange:t(P)}),n.jsx(f,{title:"Noise Amplitude",min:.5,max:1,step:.1,value:k,onChange:t(M)}),n.jsx(f,{title:"Brightness",min:.1,max:1,step:.1,value:I,onChange:t(q)}),n.jsx(f,{title:"Scanline Intensity",min:0,max:2,step:.1,value:b,onChange:t(F)}),n.jsx(f,{title:"Curvature",min:0,max:.5,step:.01,value:p,onChange:t(z)}),n.jsx(f,{title:"Mouse Strength",min:0,max:2,step:.1,value:u,onChange:t(D)}),n.jsx(J,{title:"Mouse React",isChecked:x,onChange:t(L)}),n.jsx(J,{title:"Page Load Animation",isChecked:U,onChange:t(G)})]}),n.jsx(un,{data:S}),n.jsx(mn,{dependencyList:["ogl"]})]}),n.jsx(ln,{children:n.jsx(cn,{codeObject:An})})]})};export{On as default};
