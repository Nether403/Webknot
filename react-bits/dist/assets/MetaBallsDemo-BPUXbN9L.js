import{r as p,R as an,C as sn,V as F,P as ln,M as cn,f as un,j as e,B as mn,F as pn,T as fn,d as dn}from"./index-wsKSLPNH.js";import{T as hn,P as vn,a as gn,C as xn,b as bn}from"./PropTable-C4uPWs8h.js";import{D as Cn}from"./Dependencies-BHoMfJUj.js";import{C as yn}from"./Customize-1m_ZNqR9.js";import{P as w}from"./PreviewSlider-m1G_aiYP.js";import{P as Bn}from"./PreviewSwitch-DqnF708j.js";import{T as Mn}from"./Triangle-66-Bqe-c.js";import"./index-Bpz4cGEA.js";const zn=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } from 'ogl';\r
\r
import './MetaBalls.css';\r
\r
function parseHexColor(hex) {\r
  const c = hex.replace('#', '');\r
  const r = parseInt(c.substring(0, 2), 16) / 255;\r
  const g = parseInt(c.substring(2, 4), 16) / 255;\r
  const b = parseInt(c.substring(4, 6), 16) / 255;\r
  return [r, g, b];\r
}\r
\r
function fract(x) {\r
  return x - Math.floor(x);\r
}\r
\r
function hash31(p) {\r
  let r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);\r
  const r_yzx = [r[1], r[2], r[0]];\r
  const dotVal = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);\r
  for (let i = 0; i < 3; i++) {\r
    r[i] = fract(r[i] + dotVal);\r
  }\r
  return r;\r
}\r
\r
function hash33(v) {\r
  let p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);\r
  const p_yxz = [p[1], p[0], p[2]];\r
  const dotVal = p[0] * (p_yxz[0] + 33.33) + p[1] * (p_yxz[1] + 33.33) + p[2] * (p_yxz[2] + 33.33);\r
  for (let i = 0; i < 3; i++) {\r
    p[i] = fract(p[i] + dotVal);\r
  }\r
  const p_xxy = [p[0], p[0], p[1]];\r
  const p_yxx = [p[1], p[0], p[0]];\r
  const p_zyx = [p[2], p[1], p[0]];\r
  const result = [];\r
  for (let i = 0; i < 3; i++) {\r
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);\r
  }\r
  return result;\r
}\r
\r
const vertex = \`#version 300 es\r
precision highp float;\r
layout(location = 0) in vec2 position;\r
void main() {\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragment = \`#version 300 es\r
precision highp float;\r
uniform vec3 iResolution;\r
uniform float iTime;\r
uniform vec3 iMouse;\r
uniform vec3 iColor;\r
uniform vec3 iCursorColor;\r
uniform float iAnimationSize;\r
uniform int iBallCount;\r
uniform float iCursorBallSize;\r
uniform vec3 iMetaBalls[50];\r
uniform float iClumpFactor;\r
uniform bool enableTransparency;\r
out vec4 outColor;\r
const float PI = 3.14159265359;\r
\r
float getMetaBallValue(vec2 c, float r, vec2 p) {\r
  vec2 d = p - c;\r
  float dist2 = dot(d, d);\r
  return (r * r) / dist2;\r
}\r
\r
void main() {\r
  vec2 fc = gl_FragCoord.xy;\r
  float scale = iAnimationSize / iResolution.y;\r
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;\r
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;\r
  float m1 = 0.0;\r
  for (int i = 0; i < 50; i++) {\r
    if (i >= iBallCount) break;\r
    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);\r
  }\r
  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);\r
  float total = m1 + m2;\r
  float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));\r
  vec3 cFinal = vec3(0.0);\r
  if (total > 0.0) {\r
    float alpha1 = m1 / total;\r
    float alpha2 = m2 / total;\r
    cFinal = iColor * alpha1 + iCursorColor * alpha2;\r
  }\r
  outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);\r
}\r
\`;\r
\r
const MetaBalls = ({\r
  className = '',\r
  color = '#ffffff',\r
  speed = 0.3,\r
  enableMouseInteraction = true,\r
  hoverSmoothness = 0.05,\r
  animationSize = 30,\r
  ballCount = 15,\r
  clumpFactor = 1,\r
  cursorBallSize = 3,\r
  cursorBallColor = '#ffffff',\r
  enableTransparency = true\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const dpr = 1;\r
    const renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: false });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);\r
    container.appendChild(gl.canvas);\r
\r
    const camera = new Camera(gl, {\r
      left: -1,\r
      right: 1,\r
      top: 1,\r
      bottom: -1,\r
      near: 0.1,\r
      far: 10\r
    });\r
    camera.position.z = 1;\r
\r
    const geometry = new Triangle(gl);\r
    const [r1, g1, b1] = parseHexColor(color);\r
    const [r2, g2, b2] = parseHexColor(cursorBallColor);\r
\r
    const metaBallsUniform = [];\r
    for (let i = 0; i < 50; i++) {\r
      metaBallsUniform.push(new Vec3(0, 0, 0));\r
    }\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new Vec3(0, 0, 0) },\r
        iMouse: { value: new Vec3(0, 0, 0) },\r
        iColor: { value: new Vec3(r1, g1, b1) },\r
        iCursorColor: { value: new Vec3(r2, g2, b2) },\r
        iAnimationSize: { value: animationSize },\r
        iBallCount: { value: ballCount },\r
        iCursorBallSize: { value: cursorBallSize },\r
        iMetaBalls: { value: metaBallsUniform },\r
        iClumpFactor: { value: clumpFactor },\r
        enableTransparency: { value: enableTransparency }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    const scene = new Transform();\r
    mesh.setParent(scene);\r
\r
    const maxBalls = 50;\r
    const effectiveBallCount = Math.min(ballCount, maxBalls);\r
    const ballParams = [];\r
    for (let i = 0; i < effectiveBallCount; i++) {\r
      const idx = i + 1;\r
      const h1 = hash31(idx);\r
      const st = h1[0] * (2 * Math.PI);\r
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);\r
      const baseScale = 5.0 + h1[1] * (10.0 - 5.0);\r
      const h2 = hash33(h1);\r
      const toggle = Math.floor(h2[0] * 2.0);\r
      const radiusVal = 0.5 + h2[2] * (2.0 - 0.5);\r
      ballParams.push({ st, dtFactor, baseScale, toggle, radius: radiusVal });\r
    }\r
\r
    const mouseBallPos = { x: 0, y: 0 };\r
    let pointerInside = false;\r
    let pointerX = 0;\r
    let pointerY = 0;\r
\r
    function resize() {\r
      if (!container) return;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width * dpr, height * dpr);\r
      gl.canvas.style.width = width + 'px';\r
      gl.canvas.style.height = height + 'px';\r
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0);\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    function onPointerMove(e) {\r
      if (!enableMouseInteraction) return;\r
      const rect = container.getBoundingClientRect();\r
      const px = e.clientX - rect.left;\r
      const py = e.clientY - rect.top;\r
      pointerX = (px / rect.width) * gl.canvas.width;\r
      pointerY = (1 - py / rect.height) * gl.canvas.height;\r
    }\r
    function onPointerEnter() {\r
      if (!enableMouseInteraction) return;\r
      pointerInside = true;\r
    }\r
    function onPointerLeave() {\r
      if (!enableMouseInteraction) return;\r
      pointerInside = false;\r
    }\r
    container.addEventListener('pointermove', onPointerMove);\r
    container.addEventListener('pointerenter', onPointerEnter);\r
    container.addEventListener('pointerleave', onPointerLeave);\r
\r
    const startTime = performance.now();\r
    let animationFrameId;\r
    function update(t) {\r
      animationFrameId = requestAnimationFrame(update);\r
      const elapsed = (t - startTime) * 0.001;\r
      program.uniforms.iTime.value = elapsed;\r
\r
      for (let i = 0; i < effectiveBallCount; i++) {\r
        const p = ballParams[i];\r
        const dt = elapsed * speed * p.dtFactor;\r
        const th = p.st + dt;\r
        const x = Math.cos(th);\r
        const y = Math.sin(th + dt * p.toggle);\r
        const posX = x * p.baseScale * clumpFactor;\r
        const posY = y * p.baseScale * clumpFactor;\r
        metaBallsUniform[i].set(posX, posY, p.radius);\r
      }\r
\r
      let targetX, targetY;\r
      if (pointerInside) {\r
        targetX = pointerX;\r
        targetY = pointerY;\r
      } else {\r
        const cx = gl.canvas.width * 0.5;\r
        const cy = gl.canvas.height * 0.5;\r
        const rx = gl.canvas.width * 0.15;\r
        const ry = gl.canvas.height * 0.15;\r
        targetX = cx + Math.cos(elapsed * speed) * rx;\r
        targetY = cy + Math.sin(elapsed * speed) * ry;\r
      }\r
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;\r
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;\r
      program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);\r
\r
      renderer.render({ scene, camera });\r
    }\r
    animationFrameId = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('pointermove', onPointerMove);\r
      container.removeEventListener('pointerenter', onPointerEnter);\r
      container.removeEventListener('pointerleave', onPointerLeave);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    color,\r
    cursorBallColor,\r
    speed,\r
    enableMouseInteraction,\r
    hoverSmoothness,\r
    animationSize,\r
    ballCount,\r
    clumpFactor,\r
    cursorBallSize,\r
    enableTransparency\r
  ]);\r
\r
  return <div ref={containerRef} className={\`metaballs-container \${className}\`} />;\r
};\r
\r
export default MetaBalls;\r
`,wn=`.metaballs-container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
}\r
`,Pn=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } from 'ogl';\r
\r
function parseHexColor(hex) {\r
  const c = hex.replace('#', '');\r
  const r = parseInt(c.substring(0, 2), 16) / 255;\r
  const g = parseInt(c.substring(2, 4), 16) / 255;\r
  const b = parseInt(c.substring(4, 6), 16) / 255;\r
  return [r, g, b];\r
}\r
\r
function fract(x) {\r
  return x - Math.floor(x);\r
}\r
\r
function hash31(p) {\r
  let r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);\r
  const r_yzx = [r[1], r[2], r[0]];\r
  const dotVal = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);\r
  for (let i = 0; i < 3; i++) {\r
    r[i] = fract(r[i] + dotVal);\r
  }\r
  return r;\r
}\r
\r
function hash33(v) {\r
  let p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);\r
  const p_yxz = [p[1], p[0], p[2]];\r
  const dotVal = p[0] * (p_yxz[0] + 33.33) + p[1] * (p_yxz[1] + 33.33) + p[2] * (p_yxz[2] + 33.33);\r
  for (let i = 0; i < 3; i++) {\r
    p[i] = fract(p[i] + dotVal);\r
  }\r
  const p_xxy = [p[0], p[0], p[1]];\r
  const p_yxx = [p[1], p[0], p[0]];\r
  const p_zyx = [p[2], p[1], p[0]];\r
  const result = [];\r
  for (let i = 0; i < 3; i++) {\r
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);\r
  }\r
  return result;\r
}\r
\r
const vertex = \`#version 300 es\r
precision highp float;\r
layout(location = 0) in vec2 position;\r
void main() {\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragment = \`#version 300 es\r
precision highp float;\r
uniform vec3 iResolution;\r
uniform float iTime;\r
uniform vec3 iMouse;\r
uniform vec3 iColor;\r
uniform vec3 iCursorColor;\r
uniform float iAnimationSize;\r
uniform int iBallCount;\r
uniform float iCursorBallSize;\r
uniform vec3 iMetaBalls[50];\r
uniform float iClumpFactor;\r
uniform bool enableTransparency;\r
out vec4 outColor;\r
const float PI = 3.14159265359;\r
\r
float getMetaBallValue(vec2 c, float r, vec2 p) {\r
  vec2 d = p - c;\r
  float dist2 = dot(d, d);\r
  return (r * r) / dist2;\r
}\r
\r
void main() {\r
  vec2 fc = gl_FragCoord.xy;\r
  float scale = iAnimationSize / iResolution.y;\r
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;\r
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;\r
  float m1 = 0.0;\r
  for (int i = 0; i < 50; i++) {\r
    if (i >= iBallCount) break;\r
    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);\r
  }\r
  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);\r
  float total = m1 + m2;\r
  float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));\r
  vec3 cFinal = vec3(0.0);\r
  if (total > 0.0) {\r
    float alpha1 = m1 / total;\r
    float alpha2 = m2 / total;\r
    cFinal = iColor * alpha1 + iCursorColor * alpha2;\r
  }\r
  outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);\r
}\r
\`;\r
\r
const MetaBalls = ({\r
  color = '#ffffff',\r
  speed = 0.3,\r
  enableMouseInteraction = true,\r
  hoverSmoothness = 0.05,\r
  animationSize = 30,\r
  ballCount = 15,\r
  clumpFactor = 1,\r
  cursorBallSize = 3,\r
  cursorBallColor = '#ffffff',\r
  enableTransparency = false\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const dpr = 1;\r
    const renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: false });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);\r
    container.appendChild(gl.canvas);\r
\r
    const camera = new Camera(gl, {\r
      left: -1,\r
      right: 1,\r
      top: 1,\r
      bottom: -1,\r
      near: 0.1,\r
      far: 10\r
    });\r
    camera.position.z = 1;\r
\r
    const geometry = new Triangle(gl);\r
    const [r1, g1, b1] = parseHexColor(color);\r
    const [r2, g2, b2] = parseHexColor(cursorBallColor);\r
\r
    const metaBallsUniform = [];\r
    for (let i = 0; i < 50; i++) {\r
      metaBallsUniform.push(new Vec3(0, 0, 0));\r
    }\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new Vec3(0, 0, 0) },\r
        iMouse: { value: new Vec3(0, 0, 0) },\r
        iColor: { value: new Vec3(r1, g1, b1) },\r
        iCursorColor: { value: new Vec3(r2, g2, b2) },\r
        iAnimationSize: { value: animationSize },\r
        iBallCount: { value: ballCount },\r
        iCursorBallSize: { value: cursorBallSize },\r
        iMetaBalls: { value: metaBallsUniform },\r
        iClumpFactor: { value: clumpFactor },\r
        enableTransparency: { value: enableTransparency }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    const scene = new Transform();\r
    mesh.setParent(scene);\r
\r
    const maxBalls = 50;\r
    const effectiveBallCount = Math.min(ballCount, maxBalls);\r
    const ballParams = [];\r
    for (let i = 0; i < effectiveBallCount; i++) {\r
      const idx = i + 1;\r
      const h1 = hash31(idx);\r
      const st = h1[0] * (2 * Math.PI);\r
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);\r
      const baseScale = 5.0 + h1[1] * (10.0 - 5.0);\r
      const h2 = hash33(h1);\r
      const toggle = Math.floor(h2[0] * 2.0);\r
      const radiusVal = 0.5 + h2[2] * (2.0 - 0.5);\r
      ballParams.push({ st, dtFactor, baseScale, toggle, radius: radiusVal });\r
    }\r
\r
    const mouseBallPos = { x: 0, y: 0 };\r
    let pointerInside = false;\r
    let pointerX = 0;\r
    let pointerY = 0;\r
\r
    function resize() {\r
      if (!container) return;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width * dpr, height * dpr);\r
      gl.canvas.style.width = width + 'px';\r
      gl.canvas.style.height = height + 'px';\r
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0);\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    function onPointerMove(e) {\r
      if (!enableMouseInteraction) return;\r
      const rect = container.getBoundingClientRect();\r
      const px = e.clientX - rect.left;\r
      const py = e.clientY - rect.top;\r
      pointerX = (px / rect.width) * gl.canvas.width;\r
      pointerY = (1 - py / rect.height) * gl.canvas.height;\r
    }\r
    function onPointerEnter() {\r
      if (!enableMouseInteraction) return;\r
      pointerInside = true;\r
    }\r
    function onPointerLeave() {\r
      if (!enableMouseInteraction) return;\r
      pointerInside = false;\r
    }\r
    container.addEventListener('pointermove', onPointerMove);\r
    container.addEventListener('pointerenter', onPointerEnter);\r
    container.addEventListener('pointerleave', onPointerLeave);\r
\r
    const startTime = performance.now();\r
    let animationFrameId;\r
    function update(t) {\r
      animationFrameId = requestAnimationFrame(update);\r
      const elapsed = (t - startTime) * 0.001;\r
      program.uniforms.iTime.value = elapsed;\r
\r
      for (let i = 0; i < effectiveBallCount; i++) {\r
        const p = ballParams[i];\r
        const dt = elapsed * speed * p.dtFactor;\r
        const th = p.st + dt;\r
        const x = Math.cos(th);\r
        const y = Math.sin(th + dt * p.toggle);\r
        const posX = x * p.baseScale * clumpFactor;\r
        const posY = y * p.baseScale * clumpFactor;\r
        metaBallsUniform[i].set(posX, posY, p.radius);\r
      }\r
\r
      let targetX, targetY;\r
      if (pointerInside) {\r
        targetX = pointerX;\r
        targetY = pointerY;\r
      } else {\r
        const cx = gl.canvas.width * 0.5;\r
        const cy = gl.canvas.height * 0.5;\r
        const rx = gl.canvas.width * 0.15;\r
        const ry = gl.canvas.height * 0.15;\r
        targetX = cx + Math.cos(elapsed * speed) * rx;\r
        targetY = cy + Math.sin(elapsed * speed) * ry;\r
      }\r
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;\r
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;\r
      program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);\r
\r
      renderer.render({ scene, camera });\r
    }\r
    animationFrameId = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('pointermove', onPointerMove);\r
      container.removeEventListener('pointerenter', onPointerEnter);\r
      container.removeEventListener('pointerleave', onPointerLeave);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    color,\r
    cursorBallColor,\r
    speed,\r
    enableMouseInteraction,\r
    hoverSmoothness,\r
    animationSize,\r
    ballCount,\r
    clumpFactor,\r
    cursorBallSize,\r
    enableTransparency\r
  ]);\r
\r
  return <div ref={containerRef} className="w-full h-full relative" />;\r
};\r
\r
export default MetaBalls;\r
`,Sn=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } from 'ogl';\r
import './MetaBalls.css';\r
\r
type MetaBallsProps = {\r
  color?: string;\r
  speed?: number;\r
  enableMouseInteraction?: boolean;\r
  hoverSmoothness?: number;\r
  animationSize?: number;\r
  ballCount?: number;\r
  clumpFactor?: number;\r
  cursorBallSize?: number;\r
  cursorBallColor?: string;\r
  enableTransparency?: boolean;\r
};\r
\r
function parseHexColor(hex: string): [number, number, number] {\r
  const c = hex.replace('#', '');\r
  const r = parseInt(c.substring(0, 2), 16) / 255;\r
  const g = parseInt(c.substring(2, 4), 16) / 255;\r
  const b = parseInt(c.substring(4, 6), 16) / 255;\r
  return [r, g, b];\r
}\r
\r
function fract(x: number): number {\r
  return x - Math.floor(x);\r
}\r
\r
function hash31(p: number): number[] {\r
  let r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);\r
  const r_yzx = [r[1], r[2], r[0]];\r
  const dotVal = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);\r
  for (let i = 0; i < 3; i++) {\r
    r[i] = fract(r[i] + dotVal);\r
  }\r
  return r;\r
}\r
\r
function hash33(v: number[]): number[] {\r
  let p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);\r
  const p_yxz = [p[1], p[0], p[2]];\r
  const dotVal = p[0] * (p_yxz[0] + 33.33) + p[1] * (p_yxz[1] + 33.33) + p[2] * (p_yxz[2] + 33.33);\r
  for (let i = 0; i < 3; i++) {\r
    p[i] = fract(p[i] + dotVal);\r
  }\r
  const p_xxy = [p[0], p[0], p[1]];\r
  const p_yxx = [p[1], p[0], p[0]];\r
  const p_zyx = [p[2], p[1], p[0]];\r
  const result: number[] = [];\r
  for (let i = 0; i < 3; i++) {\r
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);\r
  }\r
  return result;\r
}\r
\r
const vertex = \`#version 300 es\r
precision highp float;\r
layout(location = 0) in vec2 position;\r
void main() {\r
    gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragment = \`#version 300 es\r
precision highp float;\r
uniform vec3 iResolution;\r
uniform float iTime;\r
uniform vec3 iMouse;\r
uniform vec3 iColor;\r
uniform vec3 iCursorColor;\r
uniform float iAnimationSize;\r
uniform int iBallCount;\r
uniform float iCursorBallSize;\r
uniform vec3 iMetaBalls[50];\r
uniform float iClumpFactor;\r
uniform bool enableTransparency;\r
out vec4 outColor;\r
const float PI = 3.14159265359;\r
 \r
float getMetaBallValue(vec2 c, float r, vec2 p) {\r
    vec2 d = p - c;\r
    float dist2 = dot(d, d);\r
    return (r * r) / dist2;\r
}\r
 \r
void main() {\r
    vec2 fc = gl_FragCoord.xy;\r
    float scale = iAnimationSize / iResolution.y;\r
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;\r
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;\r
    float m1 = 0.0;\r
    for (int i = 0; i < 50; i++) {\r
        if (i >= iBallCount) break;\r
        m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);\r
    }\r
    float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);\r
    float total = m1 + m2;\r
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));\r
    vec3 cFinal = vec3(0.0);\r
    if (total > 0.0) {\r
        float alpha1 = m1 / total;\r
        float alpha2 = m2 / total;\r
        cFinal = iColor * alpha1 + iCursorColor * alpha2;\r
    }\r
    outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);\r
}\r
\`;\r
\r
type BallParams = {\r
  st: number;\r
  dtFactor: number;\r
  baseScale: number;\r
  toggle: number;\r
  radius: number;\r
};\r
\r
const MetaBalls: React.FC<MetaBallsProps> = ({\r
  color = '#ffffff',\r
  speed = 0.3,\r
  enableMouseInteraction = true,\r
  hoverSmoothness = 0.05,\r
  animationSize = 30,\r
  ballCount = 15,\r
  clumpFactor = 1,\r
  cursorBallSize = 3,\r
  cursorBallColor = '#ffffff',\r
  enableTransparency = false\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const dpr = 1;\r
    const renderer = new Renderer({\r
      dpr,\r
      alpha: true,\r
      premultipliedAlpha: false\r
    });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);\r
    container.appendChild(gl.canvas);\r
\r
    const camera = new Camera(gl, {\r
      left: -1,\r
      right: 1,\r
      top: 1,\r
      bottom: -1,\r
      near: 0.1,\r
      far: 10\r
    });\r
    camera.position.z = 1;\r
\r
    const geometry = new Triangle(gl);\r
    const [r1, g1, b1] = parseHexColor(color);\r
    const [r2, g2, b2] = parseHexColor(cursorBallColor);\r
\r
    const metaBallsUniform: Vec3[] = [];\r
    for (let i = 0; i < 50; i++) {\r
      metaBallsUniform.push(new Vec3(0, 0, 0));\r
    }\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new Vec3(0, 0, 0) },\r
        iMouse: { value: new Vec3(0, 0, 0) },\r
        iColor: { value: new Vec3(r1, g1, b1) },\r
        iCursorColor: { value: new Vec3(r2, g2, b2) },\r
        iAnimationSize: { value: animationSize },\r
        iBallCount: { value: ballCount },\r
        iCursorBallSize: { value: cursorBallSize },\r
        iMetaBalls: { value: metaBallsUniform },\r
        iClumpFactor: { value: clumpFactor },\r
        enableTransparency: { value: enableTransparency }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    const scene = new Transform();\r
    mesh.setParent(scene);\r
\r
    const maxBalls = 50;\r
    const effectiveBallCount = Math.min(ballCount, maxBalls);\r
    const ballParams: BallParams[] = [];\r
    for (let i = 0; i < effectiveBallCount; i++) {\r
      const idx = i + 1;\r
      const h1 = hash31(idx);\r
      const st = h1[0] * (2 * Math.PI);\r
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);\r
      const baseScale = 5.0 + h1[1] * (10.0 - 5.0);\r
      const h2 = hash33(h1);\r
      const toggle = Math.floor(h2[0] * 2.0);\r
      const radiusVal = 0.5 + h2[2] * (2.0 - 0.5);\r
      ballParams.push({ st, dtFactor, baseScale, toggle, radius: radiusVal });\r
    }\r
\r
    const mouseBallPos = { x: 0, y: 0 };\r
    let pointerInside = false;\r
    let pointerX = 0;\r
    let pointerY = 0;\r
\r
    function resize() {\r
      if (!container) return;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width * dpr, height * dpr);\r
      gl.canvas.style.width = \`\${width}px\`;\r
      gl.canvas.style.height = \`\${height}px\`;\r
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0);\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    function onPointerMove(e: PointerEvent) {\r
      if (!enableMouseInteraction || !container) return;\r
      const rect = container.getBoundingClientRect();\r
      const px = e.clientX - rect.left;\r
      const py = e.clientY - rect.top;\r
      pointerX = (px / rect.width) * gl.canvas.width;\r
      pointerY = (1 - py / rect.height) * gl.canvas.height;\r
    }\r
    function onPointerEnter() {\r
      if (!enableMouseInteraction) return;\r
      pointerInside = true;\r
    }\r
    function onPointerLeave() {\r
      if (!enableMouseInteraction) return;\r
      pointerInside = false;\r
    }\r
    container.addEventListener('pointermove', onPointerMove);\r
    container.addEventListener('pointerenter', onPointerEnter);\r
    container.addEventListener('pointerleave', onPointerLeave);\r
\r
    const startTime = performance.now();\r
    let animationFrameId: number;\r
    function update(t: number) {\r
      animationFrameId = requestAnimationFrame(update);\r
      const elapsed = (t - startTime) * 0.001;\r
      program.uniforms.iTime.value = elapsed;\r
\r
      for (let i = 0; i < effectiveBallCount; i++) {\r
        const p = ballParams[i];\r
        const dt = elapsed * speed * p.dtFactor;\r
        const th = p.st + dt;\r
        const x = Math.cos(th);\r
        const y = Math.sin(th + dt * p.toggle);\r
        const posX = x * p.baseScale * clumpFactor;\r
        const posY = y * p.baseScale * clumpFactor;\r
        metaBallsUniform[i].set(posX, posY, p.radius);\r
      }\r
\r
      let targetX: number, targetY: number;\r
      if (pointerInside) {\r
        targetX = pointerX;\r
        targetY = pointerY;\r
      } else {\r
        const cx = gl.canvas.width * 0.5;\r
        const cy = gl.canvas.height * 0.5;\r
        const rx = gl.canvas.width * 0.15;\r
        const ry = gl.canvas.height * 0.15;\r
        targetX = cx + Math.cos(elapsed * speed) * rx;\r
        targetY = cy + Math.sin(elapsed * speed) * ry;\r
      }\r
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;\r
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;\r
      program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);\r
\r
      renderer.render({ scene, camera });\r
    }\r
    animationFrameId = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('pointermove', onPointerMove);\r
      container.removeEventListener('pointerenter', onPointerEnter);\r
      container.removeEventListener('pointerleave', onPointerLeave);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    color,\r
    cursorBallColor,\r
    speed,\r
    enableMouseInteraction,\r
    hoverSmoothness,\r
    animationSize,\r
    ballCount,\r
    clumpFactor,\r
    cursorBallSize,\r
    enableTransparency\r
  ]);\r
\r
  return <div ref={containerRef} className="metaballs-container" />;\r
};\r
\r
export default MetaBalls;\r
`,Fn=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } from 'ogl';\r
\r
type MetaBallsProps = {\r
  color?: string;\r
  speed?: number;\r
  enableMouseInteraction?: boolean;\r
  hoverSmoothness?: number;\r
  animationSize?: number;\r
  ballCount?: number;\r
  clumpFactor?: number;\r
  cursorBallSize?: number;\r
  cursorBallColor?: string;\r
  enableTransparency?: boolean;\r
};\r
\r
function parseHexColor(hex: string): [number, number, number] {\r
  const c = hex.replace('#', '');\r
  const r = parseInt(c.substring(0, 2), 16) / 255;\r
  const g = parseInt(c.substring(2, 4), 16) / 255;\r
  const b = parseInt(c.substring(4, 6), 16) / 255;\r
  return [r, g, b];\r
}\r
\r
function fract(x: number): number {\r
  return x - Math.floor(x);\r
}\r
\r
function hash31(p: number): number[] {\r
  let r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);\r
  const r_yzx = [r[1], r[2], r[0]];\r
  const dotVal = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);\r
  for (let i = 0; i < 3; i++) {\r
    r[i] = fract(r[i] + dotVal);\r
  }\r
  return r;\r
}\r
\r
function hash33(v: number[]): number[] {\r
  let p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);\r
  const p_yxz = [p[1], p[0], p[2]];\r
  const dotVal = p[0] * (p_yxz[0] + 33.33) + p[1] * (p_yxz[1] + 33.33) + p[2] * (p_yxz[2] + 33.33);\r
  for (let i = 0; i < 3; i++) {\r
    p[i] = fract(p[i] + dotVal);\r
  }\r
  const p_xxy = [p[0], p[0], p[1]];\r
  const p_yxx = [p[1], p[0], p[0]];\r
  const p_zyx = [p[2], p[1], p[0]];\r
  const result: number[] = [];\r
  for (let i = 0; i < 3; i++) {\r
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);\r
  }\r
  return result;\r
}\r
\r
const vertex = \`#version 300 es\r
precision highp float;\r
layout(location = 0) in vec2 position;\r
void main() {\r
    gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragment = \`#version 300 es\r
precision highp float;\r
uniform vec3 iResolution;\r
uniform float iTime;\r
uniform vec3 iMouse;\r
uniform vec3 iColor;\r
uniform vec3 iCursorColor;\r
uniform float iAnimationSize;\r
uniform int iBallCount;\r
uniform float iCursorBallSize;\r
uniform vec3 iMetaBalls[50];\r
uniform float iClumpFactor;\r
uniform bool enableTransparency;\r
out vec4 outColor;\r
const float PI = 3.14159265359;\r
 \r
float getMetaBallValue(vec2 c, float r, vec2 p) {\r
    vec2 d = p - c;\r
    float dist2 = dot(d, d);\r
    return (r * r) / dist2;\r
}\r
 \r
void main() {\r
    vec2 fc = gl_FragCoord.xy;\r
    float scale = iAnimationSize / iResolution.y;\r
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;\r
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;\r
    float m1 = 0.0;\r
    for (int i = 0; i < 50; i++) {\r
        if (i >= iBallCount) break;\r
        m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);\r
    }\r
    float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);\r
    float total = m1 + m2;\r
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));\r
    vec3 cFinal = vec3(0.0);\r
    if (total > 0.0) {\r
        float alpha1 = m1 / total;\r
        float alpha2 = m2 / total;\r
        cFinal = iColor * alpha1 + iCursorColor * alpha2;\r
    }\r
    outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);\r
}\r
\`;\r
\r
type BallParams = {\r
  st: number;\r
  dtFactor: number;\r
  baseScale: number;\r
  toggle: number;\r
  radius: number;\r
};\r
\r
const MetaBalls: React.FC<MetaBallsProps> = ({\r
  color = '#ffffff',\r
  speed = 0.3,\r
  enableMouseInteraction = true,\r
  hoverSmoothness = 0.05,\r
  animationSize = 30,\r
  ballCount = 15,\r
  clumpFactor = 1,\r
  cursorBallSize = 3,\r
  cursorBallColor = '#ffffff',\r
  enableTransparency = false\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const dpr = 1;\r
    const renderer = new Renderer({\r
      dpr,\r
      alpha: true,\r
      premultipliedAlpha: false\r
    });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);\r
    container.appendChild(gl.canvas);\r
\r
    const camera = new Camera(gl, {\r
      left: -1,\r
      right: 1,\r
      top: 1,\r
      bottom: -1,\r
      near: 0.1,\r
      far: 10\r
    });\r
    camera.position.z = 1;\r
\r
    const geometry = new Triangle(gl);\r
    const [r1, g1, b1] = parseHexColor(color);\r
    const [r2, g2, b2] = parseHexColor(cursorBallColor);\r
\r
    const metaBallsUniform: Vec3[] = [];\r
    for (let i = 0; i < 50; i++) {\r
      metaBallsUniform.push(new Vec3(0, 0, 0));\r
    }\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new Vec3(0, 0, 0) },\r
        iMouse: { value: new Vec3(0, 0, 0) },\r
        iColor: { value: new Vec3(r1, g1, b1) },\r
        iCursorColor: { value: new Vec3(r2, g2, b2) },\r
        iAnimationSize: { value: animationSize },\r
        iBallCount: { value: ballCount },\r
        iCursorBallSize: { value: cursorBallSize },\r
        iMetaBalls: { value: metaBallsUniform },\r
        iClumpFactor: { value: clumpFactor },\r
        enableTransparency: { value: enableTransparency }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    const scene = new Transform();\r
    mesh.setParent(scene);\r
\r
    const maxBalls = 50;\r
    const effectiveBallCount = Math.min(ballCount, maxBalls);\r
    const ballParams: BallParams[] = [];\r
    for (let i = 0; i < effectiveBallCount; i++) {\r
      const idx = i + 1;\r
      const h1 = hash31(idx);\r
      const st = h1[0] * (2 * Math.PI);\r
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);\r
      const baseScale = 5.0 + h1[1] * (10.0 - 5.0);\r
      const h2 = hash33(h1);\r
      const toggle = Math.floor(h2[0] * 2.0);\r
      const radiusVal = 0.5 + h2[2] * (2.0 - 0.5);\r
      ballParams.push({ st, dtFactor, baseScale, toggle, radius: radiusVal });\r
    }\r
\r
    const mouseBallPos = { x: 0, y: 0 };\r
    let pointerInside = false;\r
    let pointerX = 0;\r
    let pointerY = 0;\r
\r
    function resize() {\r
      if (!container) return;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width * dpr, height * dpr);\r
      gl.canvas.style.width = \`\${width}px\`;\r
      gl.canvas.style.height = \`\${height}px\`;\r
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0);\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    function onPointerMove(e: PointerEvent) {\r
      if (!enableMouseInteraction || !container) return;\r
      const rect = container.getBoundingClientRect();\r
      const px = e.clientX - rect.left;\r
      const py = e.clientY - rect.top;\r
      pointerX = (px / rect.width) * gl.canvas.width;\r
      pointerY = (1 - py / rect.height) * gl.canvas.height;\r
    }\r
    function onPointerEnter() {\r
      if (!enableMouseInteraction) return;\r
      pointerInside = true;\r
    }\r
    function onPointerLeave() {\r
      if (!enableMouseInteraction) return;\r
      pointerInside = false;\r
    }\r
    container.addEventListener('pointermove', onPointerMove);\r
    container.addEventListener('pointerenter', onPointerEnter);\r
    container.addEventListener('pointerleave', onPointerLeave);\r
\r
    const startTime = performance.now();\r
    let animationFrameId: number;\r
    function update(t: number) {\r
      animationFrameId = requestAnimationFrame(update);\r
      const elapsed = (t - startTime) * 0.001;\r
      program.uniforms.iTime.value = elapsed;\r
\r
      for (let i = 0; i < effectiveBallCount; i++) {\r
        const p = ballParams[i];\r
        const dt = elapsed * speed * p.dtFactor;\r
        const th = p.st + dt;\r
        const x = Math.cos(th);\r
        const y = Math.sin(th + dt * p.toggle);\r
        const posX = x * p.baseScale * clumpFactor;\r
        const posY = y * p.baseScale * clumpFactor;\r
        metaBallsUniform[i].set(posX, posY, p.radius);\r
      }\r
\r
      let targetX: number, targetY: number;\r
      if (pointerInside) {\r
        targetX = pointerX;\r
        targetY = pointerY;\r
      } else {\r
        const cx = gl.canvas.width * 0.5;\r
        const cy = gl.canvas.height * 0.5;\r
        const rx = gl.canvas.width * 0.15;\r
        const ry = gl.canvas.height * 0.15;\r
        targetX = cx + Math.cos(elapsed * speed) * rx;\r
        targetY = cy + Math.sin(elapsed * speed) * ry;\r
      }\r
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;\r
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;\r
      program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);\r
\r
      renderer.render({ scene, camera });\r
    }\r
    animationFrameId = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('pointermove', onPointerMove);\r
      container.removeEventListener('pointerenter', onPointerEnter);\r
      container.removeEventListener('pointerleave', onPointerLeave);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    color,\r
    cursorBallColor,\r
    speed,\r
    enableMouseInteraction,\r
    hoverSmoothness,\r
    animationSize,\r
    ballCount,\r
    clumpFactor,\r
    cursorBallSize,\r
    enableTransparency\r
  ]);\r
\r
  return <div ref={containerRef} className="w-full h-full relative" />;\r
};\r
\r
export default MetaBalls;\r
`,In={dependencies:"ogl",usage:`import MetaBalls from './MetaBalls';

<MetaBalls
  color="#ffffff"
  cursorBallColor="#ffffff"
  cursorBallSize={2}
  ballCount={15}
  animationSize={30}
  enableMouseInteraction={true}
  enableTransparency={true}
  hoverSmoothness={0.05}
  clumpFactor={1}
  speed={0.3}
/>`,code:zn,css:wn,tailwind:Pn,tsCode:Sn,tsTailwind:Fn};function O(o){const n=o.replace("#",""),s=parseInt(n.substring(0,2),16)/255,m=parseInt(n.substring(2,4),16)/255,c=parseInt(n.substring(4,6),16)/255;return[s,m,c]}function I(o){return o-Math.floor(o)}function Tn(o){let n=[o*.1031,o*.103,o*.0973].map(I);const s=[n[1],n[2],n[0]],m=n[0]*(s[0]+33.33)+n[1]*(s[1]+33.33)+n[2]*(s[2]+33.33);for(let c=0;c<3;c++)n[c]=I(n[c]+m);return n}function En(o){let n=[o[0]*.1031,o[1]*.103,o[2]*.0973].map(I);const s=[n[1],n[0],n[2]],m=n[0]*(s[0]+33.33)+n[1]*(s[1]+33.33)+n[2]*(s[2]+33.33);for(let a=0;a<3;a++)n[a]=I(n[a]+m);const c=[n[0],n[0],n[1]],C=[n[1],n[0],n[0]],v=[n[2],n[1],n[0]],h=[];for(let a=0;a<3;a++)h[a]=I((c[a]+C[a])*v[a]);return h}const _n=`#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Rn=`#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;
const float PI = 3.14159265359;

float getMetaBallValue(vec2 c, float r, vec2 p) {
  vec2 d = p - c;
  float dist2 = dot(d, d);
  return (r * r) / dist2;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float scale = iAnimationSize / iResolution.y;
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
  float m1 = 0.0;
  for (int i = 0; i < 50; i++) {
    if (i >= iBallCount) break;
    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
  }
  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
  float total = m1 + m2;
  float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
  vec3 cFinal = vec3(0.0);
  if (total > 0.0) {
    float alpha1 = m1 / total;
    float alpha2 = m2 / total;
    cFinal = iColor * alpha1 + iCursorColor * alpha2;
  }
  outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
`,Vn=({className:o="",color:n="#ffffff",speed:s=.3,enableMouseInteraction:m=!0,hoverSmoothness:c=.05,animationSize:C=30,ballCount:v=15,clumpFactor:h=1,cursorBallSize:a=3,cursorBallColor:T="#ffffff",enableTransparency:y=!0})=>{const E=p.useRef(null);return p.useEffect(()=>{const l=E.current;if(!l)return;const P=1,B=new an({dpr:P,alpha:!0,premultipliedAlpha:!1}),r=B.gl;r.clearColor(0,0,0,y?0:1),l.appendChild(r.canvas);const S=new sn(r,{left:-1,right:1,top:1,bottom:-1,near:.1,far:10});S.position.z=1;const R=new Mn(r),[V,t,J]=O(n),[K,Q,Z]=O(T),L=[];for(let i=0;i<50;i++)L.push(new F(0,0,0));const _=new ln(r,{vertex:_n,fragment:Rn,uniforms:{iTime:{value:0},iResolution:{value:new F(0,0,0)},iMouse:{value:new F(0,0,0)},iColor:{value:new F(V,t,J)},iCursorColor:{value:new F(K,Q,Z)},iAnimationSize:{value:C},iBallCount:{value:v},iCursorBallSize:{value:a},iMetaBalls:{value:L},iClumpFactor:{value:h},enableTransparency:{value:y}}}),nn=new cn(r,{geometry:R,program:_}),H=new un;nn.setParent(H);const W=Math.min(v,50),U=[];for(let i=0;i<W;i++){const u=i+1,f=Tn(u),x=f[0]*(2*Math.PI),g=.1*Math.PI+f[1]*(.4*Math.PI-.1*Math.PI),d=5+f[1]*5,b=En(f),z=Math.floor(b[0]*2),j=.5+b[2]*(2-.5);U.push({st:x,dtFactor:g,baseScale:d,toggle:z,radius:j})}const M={x:0,y:0};let X=!1,q=0,N=0;function Y(){if(!l)return;const i=l.clientWidth,u=l.clientHeight;B.setSize(i*P,u*P),r.canvas.style.width=i+"px",r.canvas.style.height=u+"px",_.uniforms.iResolution.value.set(r.canvas.width,r.canvas.height,0)}window.addEventListener("resize",Y),Y();function D(i){if(!m)return;const u=l.getBoundingClientRect(),f=i.clientX-u.left,x=i.clientY-u.top;q=f/u.width*r.canvas.width,N=(1-x/u.height)*r.canvas.height}function k(){m&&(X=!0)}function $(){m&&(X=!1)}l.addEventListener("pointermove",D),l.addEventListener("pointerenter",k),l.addEventListener("pointerleave",$);const rn=performance.now();let A;function G(i){A=requestAnimationFrame(G);const u=(i-rn)*.001;_.uniforms.iTime.value=u;for(let g=0;g<W;g++){const d=U[g],b=u*s*d.dtFactor,z=d.st+b,j=Math.cos(z),en=Math.sin(z+b*d.toggle),tn=j*d.baseScale*h,on=en*d.baseScale*h;L[g].set(tn,on,d.radius)}let f,x;if(X)f=q,x=N;else{const g=r.canvas.width*.5,d=r.canvas.height*.5,b=r.canvas.width*.15,z=r.canvas.height*.15;f=g+Math.cos(u*s)*b,x=d+Math.sin(u*s)*z}M.x+=(f-M.x)*c,M.y+=(x-M.y)*c,_.uniforms.iMouse.value.set(M.x,M.y,0),B.render({scene:H,camera:S})}return A=requestAnimationFrame(G),()=>{var i;cancelAnimationFrame(A),window.removeEventListener("resize",Y),l.removeEventListener("pointermove",D),l.removeEventListener("pointerenter",k),l.removeEventListener("pointerleave",$),l.removeChild(r.canvas),(i=r.getExtension("WEBGL_lose_context"))==null||i.loseContext()}},[n,T,s,m,c,C,v,h,a,y]),e.jsx("div",{ref:E,className:`metaballs-container ${o}`})},Nn=()=>{const[o,n]=p.useState("#ffffff"),[s,m]=p.useState("#ffffff"),[c,C]=p.useState(.3),[v,h]=p.useState(30),[a,T]=p.useState(15),[y,E]=p.useState(1),[l,P]=p.useState(!0),[B,r]=p.useState(.15),[S,R]=p.useState(2),V=[{name:"color",type:"string",default:"#ffffff",description:"The base color of the metaballs."},{name:"speed",type:"number",default:"0.3",description:"Speed multiplier for the animation."},{name:"enableMouseInteraction",type:"boolean",default:"true",description:"Enables or disables the ball following the mouse."},{name:"enableTransparency",type:"boolean",default:"false",description:"Enables or disables transparency for the container of the animation."},{name:"hoverSmoothness",type:"number",default:"0.05",description:"Smoothness factor for the cursor ball when following the mouse."},{name:"animationSize",type:"number",default:"30",description:"The size of the world for the animation."},{name:"ballCount",type:"number",default:"15",description:"Number of metaballs rendered."},{name:"clumpFactor",type:"number",default:"1",description:"Determines how close together the balls are rendered."},{name:"cursorBallSize",type:"number",default:"3",description:"Size of the cursor-controlled ball."},{name:"cursorBallColor",type:"string",default:"#ff0000",description:"Color of the cursor ball."}];return e.jsxs(hn,{children:[e.jsxs(vn,{children:[e.jsx(mn,{position:"relative",className:"demo-container",h:500,p:0,overflow:"hidden",children:e.jsx(Vn,{color:o,cursorBallColor:s,cursorBallSize:S,ballCount:a,animationSize:v,enableMouseInteraction:l,hoverSmoothness:B,clumpFactor:y,speed:c})}),e.jsxs(yn,{className:"preview-options",children:[e.jsxs(pn,{gap:4,align:"center",mt:4,children:[e.jsx(fn,{fontSize:"sm",children:"Color"}),e.jsx(dn,{type:"color",value:o,onChange:t=>{n(t.target.value),m(t.target.value)},width:"50px"})]}),e.jsx(w,{title:"Ball Count",min:2,max:30,step:1,value:a,onChange:t=>T(t),width:150}),e.jsx(w,{title:"Speed",min:.1,max:1,step:.1,value:c,onChange:t=>C(t),width:150}),e.jsx(w,{title:"Size",min:10,max:50,step:1,value:v,onChange:t=>h(t),width:150}),e.jsx(w,{title:"Clump Factor",min:.1,max:2,step:.1,value:y,onChange:t=>E(t),width:150}),e.jsx(Bn,{title:"Follow Cursor",isChecked:l,onChange:t=>P(t)}),e.jsx(w,{title:"Cursor Smoothing",min:.001,max:.25,step:.001,value:B,onChange:t=>r(t),width:150}),e.jsx(w,{title:"Cursor Size",min:1,max:5,step:1,value:S,onChange:t=>R(t),width:150})]}),e.jsx(gn,{data:V}),e.jsx(Cn,{dependencyList:["ogl"]})]}),e.jsx(xn,{children:e.jsx(bn,{codeObject:In})})]})};export{Nn as default};
