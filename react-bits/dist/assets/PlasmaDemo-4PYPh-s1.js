import{r as i,R as O,P as F,M as U,j as r,B as A,F as E,T as D,d as B}from"./index-wsKSLPNH.js";import{T as j,P as Q,a as L,C as q,b as V}from"./PropTable-C4uPWs8h.js";import{C as k}from"./Customize-1m_ZNqR9.js";import{D as H}from"./Dependencies-BHoMfJUj.js";import{P as R}from"./PreviewSlider-m1G_aiYP.js";import{P as _}from"./PreviewSwitch-DqnF708j.js";import{P as N}from"./PreviewSelect-B8u33nUa.js";import{T as W}from"./Triangle-66-Bqe-c.js";import{B as X}from"./BackgroundContent-CqU7Wlm2.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const Y=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
import './Plasma.css';\r
\r
const hexToRgb = hex => {\r
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
  if (!result) return [1, 0.5, 0.2];\r
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];\r
};\r
\r
const vertex = \`#version 300 es\r
precision highp float;\r
in vec2 position;\r
in vec2 uv;\r
out vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragment = \`#version 300 es\r
precision highp float;\r
uniform vec2 iResolution;\r
uniform float iTime;\r
uniform vec3 uCustomColor;\r
uniform float uUseCustomColor;\r
uniform float uSpeed;\r
uniform float uDirection;\r
uniform float uScale;\r
uniform float uOpacity;\r
uniform vec2 uMouse;\r
uniform float uMouseInteractive;\r
out vec4 fragColor;\r
\r
void mainImage(out vec4 o, vec2 C) {\r
  vec2 center = iResolution.xy * 0.5;\r
  C = (C - center) / uScale + center;\r
  \r
  vec2 mouseOffset = (uMouse - center) * 0.0002;\r
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);\r
  \r
  float i, d, z, T = iTime * uSpeed * uDirection;\r
  vec3 O, p, S;\r
\r
  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {\r
    p = z*normalize(vec3(C-.5*r,r.y)); \r
    p.z -= 4.; \r
    S = p;\r
    d = p.y-T;\r
    \r
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); \r
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); \r
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; \r
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));\r
  }\r
  \r
  o.xyz = tanh(O/1e4);\r
}\r
\r
bool finite1(float x){ return !(isnan(x) || isinf(x)); }\r
vec3 sanitize(vec3 c){\r
  return vec3(\r
    finite1(c.r) ? c.r : 0.0,\r
    finite1(c.g) ? c.g : 0.0,\r
    finite1(c.b) ? c.b : 0.0\r
  );\r
}\r
\r
void main() {\r
  vec4 o = vec4(0.0);\r
  mainImage(o, gl_FragCoord.xy);\r
  vec3 rgb = sanitize(o.rgb);\r
  \r
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;\r
  vec3 customColor = intensity * uCustomColor;\r
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));\r
  \r
  float alpha = length(rgb) * uOpacity;\r
  fragColor = vec4(finalColor, alpha);\r
}\`;\r
\r
export const Plasma = ({\r
  color = '#ffffff',\r
  speed = 1,\r
  direction = 'forward',\r
  scale = 1,\r
  opacity = 1,\r
  mouseInteractive = true\r
}) => {\r
  const containerRef = useRef(null);\r
  const mousePos = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const useCustomColor = color ? 1.0 : 0.0;\r
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];\r
\r
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;\r
\r
    const renderer = new Renderer({\r
      webgl: 2,\r
      alpha: true,\r
      antialias: false,\r
      dpr: Math.min(window.devicePixelRatio || 1, 2)\r
    });\r
    const gl = renderer.gl;\r
    const canvas = gl.canvas;\r
    canvas.style.display = 'block';\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    containerRef.current.appendChild(canvas);\r
\r
    const geometry = new Triangle(gl);\r
\r
    const program = new Program(gl, {\r
      vertex: vertex,\r
      fragment: fragment,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new Float32Array([1, 1]) },\r
        uCustomColor: { value: new Float32Array(customColorRgb) },\r
        uUseCustomColor: { value: useCustomColor },\r
        uSpeed: { value: speed * 0.4 },\r
        uDirection: { value: directionMultiplier },\r
        uScale: { value: scale },\r
        uOpacity: { value: opacity },\r
        uMouse: { value: new Float32Array([0, 0]) },\r
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const handleMouseMove = e => {\r
      if (!mouseInteractive) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      mousePos.current.x = e.clientX - rect.left;\r
      mousePos.current.y = e.clientY - rect.top;\r
      const mouseUniform = program.uniforms.uMouse.value;\r
      mouseUniform[0] = mousePos.current.x;\r
      mouseUniform[1] = mousePos.current.y;\r
    };\r
\r
    if (mouseInteractive) {\r
      containerRef.current.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    const setSize = () => {\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const width = Math.max(1, Math.floor(rect.width));\r
      const height = Math.max(1, Math.floor(rect.height));\r
      renderer.setSize(width, height);\r
      const res = program.uniforms.iResolution.value;\r
      res[0] = gl.drawingBufferWidth;\r
      res[1] = gl.drawingBufferHeight;\r
    };\r
\r
    const ro = new ResizeObserver(setSize);\r
    ro.observe(containerRef.current);\r
    setSize();\r
\r
    let raf = 0;\r
    const t0 = performance.now();\r
    const loop = t => {\r
      let timeValue = (t - t0) * 0.001;\r
\r
      if (direction === 'pingpong') {\r
        const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;\r
        program.uniforms.uDirection.value = cycle;\r
      }\r
\r
      program.uniforms.iTime.value = timeValue;\r
      renderer.render({ scene: mesh });\r
      raf = requestAnimationFrame(loop);\r
    };\r
    raf = requestAnimationFrame(loop);\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      ro.disconnect();\r
      if (mouseInteractive && containerRef.current) {\r
        containerRef.current.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      try {\r
        // eslint-disable-next-line react-hooks/exhaustive-deps\r
        containerRef.current?.removeChild(canvas);\r
      } catch {\r
        console.warn('Canvas already removed from container');\r
      }\r
    };\r
  }, [color, speed, direction, scale, opacity, mouseInteractive]);\r
\r
  return <div ref={containerRef} className="plasma-container" />;\r
};\r
\r
export default Plasma;\r
`,$=`.plasma-container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
}\r
`,Z=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
\r
const hexToRgb = hex => {\r
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
  if (!result) return [1, 0.5, 0.2];\r
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];\r
};\r
\r
const vertex = \`#version 300 es\r
precision highp float;\r
in vec2 position;\r
in vec2 uv;\r
out vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragment = \`#version 300 es\r
precision highp float;\r
uniform vec2 iResolution;\r
uniform float iTime;\r
uniform vec3 uCustomColor;\r
uniform float uUseCustomColor;\r
uniform float uSpeed;\r
uniform float uDirection;\r
uniform float uScale;\r
uniform float uOpacity;\r
uniform vec2 uMouse;\r
uniform float uMouseInteractive;\r
out vec4 fragColor;\r
\r
void mainImage(out vec4 o, vec2 C) {\r
  vec2 center = iResolution.xy * 0.5;\r
  C = (C - center) / uScale + center;\r
  \r
  vec2 mouseOffset = (uMouse - center) * 0.0002;\r
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);\r
  \r
  float i, d, z, T = iTime * uSpeed * uDirection;\r
  vec3 O, p, S;\r
\r
  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {\r
    p = z*normalize(vec3(C-.5*r,r.y)); \r
    p.z -= 4.; \r
    S = p;\r
    d = p.y-T;\r
    \r
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); \r
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); \r
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; \r
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));\r
  }\r
  \r
  o.xyz = tanh(O/1e4);\r
}\r
\r
bool finite1(float x){ return !(isnan(x) || isinf(x)); }\r
vec3 sanitize(vec3 c){\r
  return vec3(\r
    finite1(c.r) ? c.r : 0.0,\r
    finite1(c.g) ? c.g : 0.0,\r
    finite1(c.b) ? c.b : 0.0\r
  );\r
}\r
\r
void main() {\r
  vec4 o = vec4(0.0);\r
  mainImage(o, gl_FragCoord.xy);\r
  vec3 rgb = sanitize(o.rgb);\r
  \r
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;\r
  vec3 customColor = intensity * uCustomColor;\r
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));\r
  \r
  float alpha = length(rgb) * uOpacity;\r
  fragColor = vec4(finalColor, alpha);\r
}\`;\r
\r
export const Plasma = ({\r
  color = '#ffffff',\r
  speed = 1,\r
  direction = 'forward',\r
  scale = 1,\r
  opacity = 1,\r
  mouseInteractive = true\r
}) => {\r
  const containerRef = useRef(null);\r
  const mousePos = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const useCustomColor = color ? 1.0 : 0.0;\r
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];\r
\r
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;\r
\r
    const renderer = new Renderer({\r
      webgl: 2,\r
      alpha: true,\r
      antialias: false,\r
      dpr: Math.min(window.devicePixelRatio || 1, 2)\r
    });\r
    const gl = renderer.gl;\r
    const canvas = gl.canvas;\r
    canvas.style.display = 'block';\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    containerRef.current.appendChild(canvas);\r
\r
    const geometry = new Triangle(gl);\r
\r
    const program = new Program(gl, {\r
      vertex: vertex,\r
      fragment: fragment,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new Float32Array([1, 1]) },\r
        uCustomColor: { value: new Float32Array(customColorRgb) },\r
        uUseCustomColor: { value: useCustomColor },\r
        uSpeed: { value: speed * 0.4 },\r
        uDirection: { value: directionMultiplier },\r
        uScale: { value: scale },\r
        uOpacity: { value: opacity },\r
        uMouse: { value: new Float32Array([0, 0]) },\r
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const handleMouseMove = e => {\r
      if (!mouseInteractive) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      mousePos.current.x = e.clientX - rect.left;\r
      mousePos.current.y = e.clientY - rect.top;\r
      const mouseUniform = program.uniforms.uMouse.value;\r
      mouseUniform[0] = mousePos.current.x;\r
      mouseUniform[1] = mousePos.current.y;\r
    };\r
\r
    if (mouseInteractive) {\r
      containerRef.current.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    const setSize = () => {\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const width = Math.max(1, Math.floor(rect.width));\r
      const height = Math.max(1, Math.floor(rect.height));\r
      renderer.setSize(width, height);\r
      const res = program.uniforms.iResolution.value;\r
      res[0] = gl.drawingBufferWidth;\r
      res[1] = gl.drawingBufferHeight;\r
    };\r
\r
    const ro = new ResizeObserver(setSize);\r
    ro.observe(containerRef.current);\r
    setSize();\r
\r
    let raf = 0;\r
    const t0 = performance.now();\r
    const loop = t => {\r
      let timeValue = (t - t0) * 0.001;\r
\r
      if (direction === 'pingpong') {\r
        const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;\r
        program.uniforms.uDirection.value = cycle;\r
      }\r
\r
      program.uniforms.iTime.value = timeValue;\r
      renderer.render({ scene: mesh });\r
      raf = requestAnimationFrame(loop);\r
    };\r
    raf = requestAnimationFrame(loop);\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      ro.disconnect();\r
      if (mouseInteractive && containerRef.current) {\r
        containerRef.current.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      try {\r
        // eslint-disable-next-line react-hooks/exhaustive-deps\r
        containerRef.current?.removeChild(canvas);\r
      } catch {\r
        console.warn('Canvas already removed from container');\r
      }\r
    };\r
  }, [color, speed, direction, scale, opacity, mouseInteractive]);\r
\r
  return <div ref={containerRef} className="w-full h-full overflow-hidden relative" />;\r
};\r
\r
export default Plasma;\r
`,G=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
import './Plasma.css';\r
\r
interface PlasmaProps {\r
  color?: string;\r
  speed?: number;\r
  direction?: 'forward' | 'reverse' | 'pingpong';\r
  scale?: number;\r
  opacity?: number;\r
  mouseInteractive?: boolean;\r
}\r
\r
const hexToRgb = (hex: string): [number, number, number] => {\r
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
  if (!result) return [1, 0.5, 0.2];\r
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];\r
};\r
\r
const vertex = \`#version 300 es\r
precision highp float;\r
in vec2 position;\r
in vec2 uv;\r
out vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragment = \`#version 300 es\r
precision highp float;\r
uniform vec2 iResolution;\r
uniform float iTime;\r
uniform vec3 uCustomColor;\r
uniform float uUseCustomColor;\r
uniform float uSpeed;\r
uniform float uDirection;\r
uniform float uScale;\r
uniform float uOpacity;\r
uniform vec2 uMouse;\r
uniform float uMouseInteractive;\r
out vec4 fragColor;\r
\r
void mainImage(out vec4 o, vec2 C) {\r
  vec2 center = iResolution.xy * 0.5;\r
  C = (C - center) / uScale + center;\r
  \r
  vec2 mouseOffset = (uMouse - center) * 0.0002;\r
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);\r
  \r
  float i, d, z, T = iTime * uSpeed * uDirection;\r
  vec3 O, p, S;\r
\r
  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {\r
    p = z*normalize(vec3(C-.5*r,r.y)); \r
    p.z -= 4.; \r
    S = p;\r
    d = p.y-T;\r
    \r
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); \r
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); \r
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; \r
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));\r
  }\r
  \r
  o.xyz = tanh(O/1e4);\r
}\r
\r
bool finite1(float x){ return !(isnan(x) || isinf(x)); }\r
vec3 sanitize(vec3 c){\r
  return vec3(\r
    finite1(c.r) ? c.r : 0.0,\r
    finite1(c.g) ? c.g : 0.0,\r
    finite1(c.b) ? c.b : 0.0\r
  );\r
}\r
\r
void main() {\r
  vec4 o = vec4(0.0);\r
  mainImage(o, gl_FragCoord.xy);\r
  vec3 rgb = sanitize(o.rgb);\r
  \r
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;\r
  vec3 customColor = intensity * uCustomColor;\r
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));\r
  \r
  float alpha = length(rgb) * uOpacity;\r
  fragColor = vec4(finalColor, alpha);\r
}\`;\r
\r
export const Plasma: React.FC<PlasmaProps> = ({\r
  color = '#ffffff',\r
  speed = 1,\r
  direction = 'forward',\r
  scale = 1,\r
  opacity = 1,\r
  mouseInteractive = true\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const mousePos = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const useCustomColor = color ? 1.0 : 0.0;\r
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];\r
\r
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;\r
\r
    const renderer = new Renderer({\r
      webgl: 2,\r
      alpha: true,\r
      antialias: false,\r
      dpr: Math.min(window.devicePixelRatio || 1, 2)\r
    });\r
    const gl = renderer.gl;\r
    const canvas = gl.canvas as HTMLCanvasElement;\r
    canvas.style.display = 'block';\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    containerRef.current.appendChild(canvas);\r
\r
    const geometry = new Triangle(gl);\r
\r
    const program = new Program(gl, {\r
      vertex: vertex,\r
      fragment: fragment,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new Float32Array([1, 1]) },\r
        uCustomColor: { value: new Float32Array(customColorRgb) },\r
        uUseCustomColor: { value: useCustomColor },\r
        uSpeed: { value: speed * 0.4 },\r
        uDirection: { value: directionMultiplier },\r
        uScale: { value: scale },\r
        uOpacity: { value: opacity },\r
        uMouse: { value: new Float32Array([0, 0]) },\r
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!mouseInteractive) return;\r
      const rect = containerRef.current!.getBoundingClientRect();\r
      mousePos.current.x = e.clientX - rect.left;\r
      mousePos.current.y = e.clientY - rect.top;\r
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;\r
      mouseUniform[0] = mousePos.current.x;\r
      mouseUniform[1] = mousePos.current.y;\r
    };\r
\r
    if (mouseInteractive) {\r
      containerRef.current.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    const setSize = () => {\r
      const rect = containerRef.current!.getBoundingClientRect();\r
      const width = Math.max(1, Math.floor(rect.width));\r
      const height = Math.max(1, Math.floor(rect.height));\r
      renderer.setSize(width, height);\r
      const res = program.uniforms.iResolution.value as Float32Array;\r
      res[0] = gl.drawingBufferWidth;\r
      res[1] = gl.drawingBufferHeight;\r
    };\r
\r
    const ro = new ResizeObserver(setSize);\r
    ro.observe(containerRef.current);\r
    setSize();\r
\r
    let raf = 0;\r
    const t0 = performance.now();\r
    const loop = (t: number) => {\r
      let timeValue = (t - t0) * 0.001;\r
\r
      if (direction === 'pingpong') {\r
        const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;\r
        (program.uniforms.uDirection as any).value = cycle;\r
      }\r
\r
      (program.uniforms.iTime as any).value = timeValue;\r
      renderer.render({ scene: mesh });\r
      raf = requestAnimationFrame(loop);\r
    };\r
    raf = requestAnimationFrame(loop);\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      ro.disconnect();\r
      if (mouseInteractive && containerRef.current) {\r
        containerRef.current.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      try {\r
        containerRef.current?.removeChild(canvas);\r
      } catch {}\r
    };\r
  }, [color, speed, direction, scale, opacity, mouseInteractive]);\r
\r
  return <div ref={containerRef} className="plasma-container" />;\r
};\r
\r
export default Plasma;\r
`,J=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
\r
interface PlasmaProps {\r
  color?: string;\r
  speed?: number;\r
  direction?: 'forward' | 'reverse' | 'pingpong';\r
  scale?: number;\r
  opacity?: number;\r
  mouseInteractive?: boolean;\r
}\r
\r
const hexToRgb = (hex: string): [number, number, number] => {\r
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
  if (!result) return [1, 0.5, 0.2];\r
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];\r
};\r
\r
const vertex = \`#version 300 es\r
precision highp float;\r
in vec2 position;\r
in vec2 uv;\r
out vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragment = \`#version 300 es\r
precision highp float;\r
uniform vec2 iResolution;\r
uniform float iTime;\r
uniform vec3 uCustomColor;\r
uniform float uUseCustomColor;\r
uniform float uSpeed;\r
uniform float uDirection;\r
uniform float uScale;\r
uniform float uOpacity;\r
uniform vec2 uMouse;\r
uniform float uMouseInteractive;\r
out vec4 fragColor;\r
\r
void mainImage(out vec4 o, vec2 C) {\r
  vec2 center = iResolution.xy * 0.5;\r
  C = (C - center) / uScale + center;\r
  \r
  vec2 mouseOffset = (uMouse - center) * 0.0002;\r
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);\r
  \r
  float i, d, z, T = iTime * uSpeed * uDirection;\r
  vec3 O, p, S;\r
\r
  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {\r
    p = z*normalize(vec3(C-.5*r,r.y)); \r
    p.z -= 4.; \r
    S = p;\r
    d = p.y-T;\r
    \r
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); \r
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); \r
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; \r
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));\r
  }\r
  \r
  o.xyz = tanh(O/1e4);\r
}\r
\r
bool finite1(float x){ return !(isnan(x) || isinf(x)); }\r
vec3 sanitize(vec3 c){\r
  return vec3(\r
    finite1(c.r) ? c.r : 0.0,\r
    finite1(c.g) ? c.g : 0.0,\r
    finite1(c.b) ? c.b : 0.0\r
  );\r
}\r
\r
void main() {\r
  vec4 o = vec4(0.0);\r
  mainImage(o, gl_FragCoord.xy);\r
  vec3 rgb = sanitize(o.rgb);\r
  \r
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;\r
  vec3 customColor = intensity * uCustomColor;\r
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));\r
  \r
  float alpha = length(rgb) * uOpacity;\r
  fragColor = vec4(finalColor, alpha);\r
}\`;\r
\r
export const Plasma: React.FC<PlasmaProps> = ({\r
  color = '#ffffff',\r
  speed = 1,\r
  direction = 'forward',\r
  scale = 1,\r
  opacity = 1,\r
  mouseInteractive = true\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const mousePos = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const useCustomColor = color ? 1.0 : 0.0;\r
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];\r
\r
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;\r
\r
    const renderer = new Renderer({\r
      webgl: 2,\r
      alpha: true,\r
      antialias: false,\r
      dpr: Math.min(window.devicePixelRatio || 1, 2)\r
    });\r
    const gl = renderer.gl;\r
    const canvas = gl.canvas as HTMLCanvasElement;\r
    canvas.style.display = 'block';\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    containerRef.current.appendChild(canvas);\r
\r
    const geometry = new Triangle(gl);\r
\r
    const program = new Program(gl, {\r
      vertex: vertex,\r
      fragment: fragment,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new Float32Array([1, 1]) },\r
        uCustomColor: { value: new Float32Array(customColorRgb) },\r
        uUseCustomColor: { value: useCustomColor },\r
        uSpeed: { value: speed * 0.4 },\r
        uDirection: { value: directionMultiplier },\r
        uScale: { value: scale },\r
        uOpacity: { value: opacity },\r
        uMouse: { value: new Float32Array([0, 0]) },\r
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!mouseInteractive) return;\r
      const rect = containerRef.current!.getBoundingClientRect();\r
      mousePos.current.x = e.clientX - rect.left;\r
      mousePos.current.y = e.clientY - rect.top;\r
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;\r
      mouseUniform[0] = mousePos.current.x;\r
      mouseUniform[1] = mousePos.current.y;\r
    };\r
\r
    if (mouseInteractive) {\r
      containerRef.current.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    const setSize = () => {\r
      const rect = containerRef.current!.getBoundingClientRect();\r
      const width = Math.max(1, Math.floor(rect.width));\r
      const height = Math.max(1, Math.floor(rect.height));\r
      renderer.setSize(width, height);\r
      const res = program.uniforms.iResolution.value as Float32Array;\r
      res[0] = gl.drawingBufferWidth;\r
      res[1] = gl.drawingBufferHeight;\r
    };\r
\r
    const ro = new ResizeObserver(setSize);\r
    ro.observe(containerRef.current);\r
    setSize();\r
\r
    let raf = 0;\r
    const t0 = performance.now();\r
    const loop = (t: number) => {\r
      let timeValue = (t - t0) * 0.001;\r
\r
      if (direction === 'pingpong') {\r
        const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;\r
        (program.uniforms.uDirection as any).value = cycle;\r
      }\r
\r
      (program.uniforms.iTime as any).value = timeValue;\r
      renderer.render({ scene: mesh });\r
      raf = requestAnimationFrame(loop);\r
    };\r
    raf = requestAnimationFrame(loop);\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      ro.disconnect();\r
      if (mouseInteractive && containerRef.current) {\r
        containerRef.current.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      try {\r
        containerRef.current?.removeChild(canvas);\r
      } catch {}\r
    };\r
  }, [color, speed, direction, scale, opacity, mouseInteractive]);\r
\r
  return <div ref={containerRef} className="w-full h-full relative overflow-hidden" />;\r
};\r
\r
export default Plasma;\r
`,K={dependencies:"ogl",usage:`import Plasma from './Plasma';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Plasma 
    color="#ff6b35"
    speed={0.6}
    direction="forward"
    scale={1.1}
    opacity={0.8}
    mouseInteractive={true}
  />
</div>`,code:Y,css:$,tailwind:Z,tsCode:G,tsTailwind:J},rr=o=>{const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,.5,.2]},er=`#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,nr=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  
  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}`,or=({color:o="#ffffff",speed:t=1,direction:l="forward",scale:h=1,opacity:v=1,mouseInteractive:s=!0})=>{const e=i.useRef(null),m=i.useRef({x:0,y:0});return i.useEffect(()=>{if(!e.current)return;const C=o?1:0,y=o?rr(o):[1,1,1],p=l==="reverse"?-1:1,d=new O({webgl:2,alpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),a=d.gl,c=a.canvas;c.style.display="block",c.style.width="100%",c.style.height="100%",e.current.appendChild(c);const P=new W(a),g=new F(a,{vertex:er,fragment:nr,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uCustomColor:{value:new Float32Array(y)},uUseCustomColor:{value:C},uSpeed:{value:t*.4},uDirection:{value:p},uScale:{value:h},uOpacity:{value:v},uMouse:{value:new Float32Array([0,0])},uMouseInteractive:{value:s?1:0}}}),I=new U(a,{geometry:P,program:g}),b=n=>{if(!s)return;const u=e.current.getBoundingClientRect();m.current.x=n.clientX-u.left,m.current.y=n.clientY-u.top;const f=g.uniforms.uMouse.value;f[0]=m.current.x,f[1]=m.current.y};s&&e.current.addEventListener("mousemove",b);const w=()=>{const n=e.current.getBoundingClientRect(),u=Math.max(1,Math.floor(n.width)),f=Math.max(1,Math.floor(n.height));d.setSize(u,f);const z=g.uniforms.iResolution.value;z[0]=a.drawingBufferWidth,z[1]=a.drawingBufferHeight},M=new ResizeObserver(w);M.observe(e.current),w();let x=0;const T=performance.now(),S=n=>{let u=(n-T)*.001;if(l==="pingpong"){const f=Math.sin(u*.5)*p;g.uniforms.uDirection.value=f}g.uniforms.iTime.value=u,d.render({scene:I}),x=requestAnimationFrame(S)};return x=requestAnimationFrame(S),()=>{var n;cancelAnimationFrame(x),M.disconnect(),s&&e.current&&e.current.removeEventListener("mousemove",b);try{(n=e.current)==null||n.removeChild(c)}catch{}}},[o,t,l,h,v,s]),r.jsx("div",{ref:e,className:"plasma-container"})},dr=()=>{const[o,t]=i.useState("#B19EEF"),[l,h]=i.useState(1),[v,s]=i.useState("forward"),[e,m]=i.useState(1),[C,y]=i.useState(1),[p,d]=i.useState(!1),a=[{name:"color",type:"string",default:"undefined",description:"Optional hex color to tint the plasma effect. If not provided, uses original colors."},{name:"speed",type:"number",default:"1.0",description:"Animation speed multiplier. Higher values = faster animation."},{name:"direction",type:"'forward' | 'reverse' | 'pingpong'",default:"'forward'",description:"Animation direction. 'pingpong' oscillates back and forth."},{name:"scale",type:"number",default:"1.0",description:"Zoom level of the plasma pattern. Higher values zoom in."},{name:"opacity",type:"number",default:"1.0",description:"Overall opacity of the effect (0-1)."},{name:"mouseInteractive",type:"boolean",default:"false",description:"Whether the plasma responds to mouse movement."}];return r.jsxs(j,{children:[r.jsxs(Q,{children:[r.jsxs(A,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[r.jsx(or,{color:o,speed:l,direction:v,scale:e,opacity:C,mouseInteractive:p}),r.jsx(X,{pillText:"New Background",headline:"Minimal plasma waves that soothe the eyes"})]}),r.jsxs(k,{children:[r.jsxs(E,{alignItems:"center",mb:4,children:[r.jsx(D,{fontSize:"sm",mr:2,children:"Color"}),r.jsx(B,{type:"color",value:o,onChange:c=>{t(c.target.value)},width:"50px"})]}),r.jsx(N,{title:"Direction",options:[{value:"forward",label:"Forward"},{value:"reverse",label:"Reverse"},{value:"pingpong",label:"Ping Pong"}],value:v,onChange:s,width:120}),r.jsx(R,{title:"Speed",min:.1,max:3,step:.1,value:l,onChange:h}),r.jsx(R,{title:"Scale",min:.5,max:3,step:.1,value:e,onChange:m}),r.jsx(R,{title:"Opacity",min:.1,max:1,step:.1,value:C,onChange:y}),r.jsx(_,{title:"Mouse Interactive",isChecked:p,onChange:d})]}),r.jsx(L,{data:a}),r.jsx(H,{dependencyList:["ogl"]})]}),r.jsx(q,{children:r.jsx(V,{codeObject:K})})]})};export{dr as default};
