import{r,R as G,P as A,M as j,j as e,B as N,F as H,T as q,d as $}from"./index-wsKSLPNH.js";import{T as O,P as Y,a as X,C as V,b as J}from"./PropTable-C4uPWs8h.js";import{C as K}from"./Customize-1m_ZNqR9.js";import{D as Q}from"./Dependencies-BHoMfJUj.js";import{P as c}from"./PreviewSlider-m1G_aiYP.js";import{P as W}from"./PreviewSwitch-DqnF708j.js";import{B as Z}from"./BackgroundContent-CqU7Wlm2.js";import{T as ee}from"./Triangle-66-Bqe-c.js";import"./index-Bpz4cGEA.js";const ne=`import { useRef, useEffect } from 'react';\r
import { Renderer, Program, Triangle, Mesh } from 'ogl';\r
import './RippleGrid.css';\r
\r
const RippleGrid = ({\r
  enableRainbow = false,\r
  gridColor = '#ffffff',\r
  rippleIntensity = 0.05,\r
  gridSize = 10.0,\r
  gridThickness = 15.0,\r
  fadeDistance = 1.5,\r
  vignetteStrength = 2.0,\r
  glowIntensity = 0.1,\r
  opacity = 1.0,\r
  gridRotation = 0,\r
  mouseInteraction = true,\r
  mouseInteractionRadius = 1\r
}) => {\r
  const containerRef = useRef(null);\r
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });\r
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const mouseInfluenceRef = useRef(0);\r
  const uniformsRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const hexToRgb = hex => {\r
      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
      return result\r
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]\r
        : [1, 1, 1];\r
    };\r
\r
    const renderer = new Renderer({\r
      dpr: Math.min(window.devicePixelRatio, 2),\r
      alpha: true\r
    });\r
    const gl = renderer.gl;\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
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
uniform float iTime;\r
uniform vec2 iResolution;\r
uniform bool enableRainbow;\r
uniform vec3 gridColor;\r
uniform float rippleIntensity;\r
uniform float gridSize;\r
uniform float gridThickness;\r
uniform float fadeDistance;\r
uniform float vignetteStrength;\r
uniform float glowIntensity;\r
uniform float opacity;\r
uniform float gridRotation;\r
uniform bool mouseInteraction;\r
uniform vec2 mousePosition;\r
uniform float mouseInfluence;\r
uniform float mouseInteractionRadius;\r
varying vec2 vUv;\r
\r
float pi = 3.141592;\r
\r
mat2 rotate(float angle) {\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    return mat2(c, -s, s, c);\r
}\r
\r
void main() {\r
    vec2 uv = vUv * 2.0 - 1.0;\r
    uv.x *= iResolution.x / iResolution.y;\r
\r
    if (gridRotation != 0.0) {\r
        uv = rotate(gridRotation * pi / 180.0) * uv;\r
    }\r
\r
    float dist = length(uv);\r
    float func = sin(pi * (iTime - dist));\r
    vec2 rippleUv = uv + uv * func * rippleIntensity;\r
\r
    if (mouseInteraction && mouseInfluence > 0.0) {\r
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);\r
        mouseUv.x *= iResolution.x / iResolution.y;\r
        float mouseDist = length(uv - mouseUv);\r
        \r
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));\r
        \r
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;\r
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;\r
    }\r
\r
    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);\r
    vec2 b = abs(a);\r
\r
    float aaWidth = 0.5;\r
    vec2 smoothB = vec2(\r
        smoothstep(0.0, aaWidth, b.x),\r
        smoothstep(0.0, aaWidth, b.y)\r
    );\r
\r
    vec3 color = vec3(0.0);\r
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));\r
    color += exp(-gridThickness * smoothB.y);\r
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));\r
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);\r
\r
    if (glowIntensity > 0.0) {\r
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);\r
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);\r
    }\r
\r
    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));\r
    \r
    vec2 vignetteCoords = vUv - 0.5;\r
    float vignetteDistance = length(vignetteCoords);\r
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);\r
    vignette = clamp(vignette, 0.0, 1.0);\r
    \r
    vec3 t;\r
    if (enableRainbow) {\r
        t = vec3(\r
            uv.x * 0.5 + 0.5 * sin(iTime),\r
            uv.y * 0.5 + 0.5 * cos(iTime),\r
            pow(cos(iTime), 4.0)\r
        ) + 0.5;\r
    } else {\r
        t = gridColor;\r
    }\r
\r
    float finalFade = ddd * vignette;\r
    float alpha = length(color) * finalFade * opacity;\r
    gl_FragColor = vec4(color * t * finalFade * opacity, alpha);\r
}\`;\r
\r
    const uniforms = {\r
      iTime: { value: 0 },\r
      iResolution: { value: [1, 1] },\r
      enableRainbow: { value: enableRainbow },\r
      gridColor: { value: hexToRgb(gridColor) },\r
      rippleIntensity: { value: rippleIntensity },\r
      gridSize: { value: gridSize },\r
      gridThickness: { value: gridThickness },\r
      fadeDistance: { value: fadeDistance },\r
      vignetteStrength: { value: vignetteStrength },\r
      glowIntensity: { value: glowIntensity },\r
      opacity: { value: opacity },\r
      gridRotation: { value: gridRotation },\r
      mouseInteraction: { value: mouseInteraction },\r
      mousePosition: { value: [0.5, 0.5] },\r
      mouseInfluence: { value: 0 },\r
      mouseInteractionRadius: { value: mouseInteractionRadius }\r
    };\r
\r
    uniformsRef.current = uniforms;\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const resize = () => {\r
      const { clientWidth: w, clientHeight: h } = containerRef.current;\r
      renderer.setSize(w, h);\r
      uniforms.iResolution.value = [w, h];\r
    };\r
\r
    const handleMouseMove = e => {\r
      if (!mouseInteraction || !containerRef.current) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y coordinate\r
      targetMouseRef.current = { x, y };\r
    };\r
\r
    const handleMouseEnter = () => {\r
      if (!mouseInteraction) return;\r
      mouseInfluenceRef.current = 1.0;\r
    };\r
\r
    const handleMouseLeave = () => {\r
      if (!mouseInteraction) return;\r
      mouseInfluenceRef.current = 0.0;\r
    };\r
\r
    window.addEventListener('resize', resize);\r
    if (mouseInteraction) {\r
      containerRef.current.addEventListener('mousemove', handleMouseMove);\r
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);\r
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
    resize();\r
\r
    const render = t => {\r
      uniforms.iTime.value = t * 0.001;\r
\r
      const lerpFactor = 0.1;\r
      mousePositionRef.current.x += (targetMouseRef.current.x - mousePositionRef.current.x) * lerpFactor;\r
      mousePositionRef.current.y += (targetMouseRef.current.y - mousePositionRef.current.y) * lerpFactor;\r
\r
      const currentInfluence = uniforms.mouseInfluence.value;\r
      const targetInfluence = mouseInfluenceRef.current;\r
      uniforms.mouseInfluence.value += (targetInfluence - currentInfluence) * 0.05;\r
\r
      uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y];\r
\r
      renderer.render({ scene: mesh });\r
      requestAnimationFrame(render);\r
    };\r
\r
    requestAnimationFrame(render);\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      if (mouseInteraction && containerRef.current) {\r
        containerRef.current.removeEventListener('mousemove', handleMouseMove);\r
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);\r
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();\r
      containerRef.current?.removeChild(gl.canvas);\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!uniformsRef.current) return;\r
\r
    const hexToRgb = hex => {\r
      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
      return result\r
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]\r
        : [1, 1, 1];\r
    };\r
\r
    uniformsRef.current.enableRainbow.value = enableRainbow;\r
    uniformsRef.current.gridColor.value = hexToRgb(gridColor);\r
    uniformsRef.current.rippleIntensity.value = rippleIntensity;\r
    uniformsRef.current.gridSize.value = gridSize;\r
    uniformsRef.current.gridThickness.value = gridThickness;\r
    uniformsRef.current.fadeDistance.value = fadeDistance;\r
    uniformsRef.current.vignetteStrength.value = vignetteStrength;\r
    uniformsRef.current.glowIntensity.value = glowIntensity;\r
    uniformsRef.current.opacity.value = opacity;\r
    uniformsRef.current.gridRotation.value = gridRotation;\r
    uniformsRef.current.mouseInteraction.value = mouseInteraction;\r
    uniformsRef.current.mouseInteractionRadius.value = mouseInteractionRadius;\r
  }, [\r
    enableRainbow,\r
    gridColor,\r
    rippleIntensity,\r
    gridSize,\r
    gridThickness,\r
    fadeDistance,\r
    vignetteStrength,\r
    glowIntensity,\r
    opacity,\r
    gridRotation,\r
    mouseInteraction,\r
    mouseInteractionRadius\r
  ]);\r
\r
  return <div ref={containerRef} className="ripple-grid-container" />;\r
};\r
\r
export default RippleGrid;\r
`,re=`import { useRef, useEffect } from 'react';\r
import { Renderer, Program, Triangle, Mesh } from 'ogl';\r
\r
const RippleGrid = ({\r
  enableRainbow = false,\r
  gridColor = '#ffffff',\r
  rippleIntensity = 0.05,\r
  gridSize = 10.0,\r
  gridThickness = 15.0,\r
  fadeDistance = 1.5,\r
  vignetteStrength = 2.0,\r
  glowIntensity = 0.1,\r
  opacity = 1.0,\r
  gridRotation = 0,\r
  mouseInteraction = true,\r
  mouseInteractionRadius = 1\r
}) => {\r
  const containerRef = useRef(null);\r
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });\r
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const mouseInfluenceRef = useRef(0);\r
  const uniformsRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const hexToRgb = hex => {\r
      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
      return result\r
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]\r
        : [1, 1, 1];\r
    };\r
\r
    const renderer = new Renderer({\r
      dpr: Math.min(window.devicePixelRatio, 2),\r
      alpha: true\r
    });\r
    const gl = renderer.gl;\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
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
uniform float iTime;\r
uniform vec2 iResolution;\r
uniform bool enableRainbow;\r
uniform vec3 gridColor;\r
uniform float rippleIntensity;\r
uniform float gridSize;\r
uniform float gridThickness;\r
uniform float fadeDistance;\r
uniform float vignetteStrength;\r
uniform float glowIntensity;\r
uniform float opacity;\r
uniform float gridRotation;\r
uniform bool mouseInteraction;\r
uniform vec2 mousePosition;\r
uniform float mouseInfluence;\r
uniform float mouseInteractionRadius;\r
varying vec2 vUv;\r
\r
float pi = 3.141592;\r
\r
mat2 rotate(float angle) {\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    return mat2(c, -s, s, c);\r
}\r
\r
void main() {\r
    vec2 uv = vUv * 2.0 - 1.0;\r
    uv.x *= iResolution.x / iResolution.y;\r
\r
    if (gridRotation != 0.0) {\r
        uv = rotate(gridRotation * pi / 180.0) * uv;\r
    }\r
\r
    float dist = length(uv);\r
    float func = sin(pi * (iTime - dist));\r
    vec2 rippleUv = uv + uv * func * rippleIntensity;\r
\r
    if (mouseInteraction && mouseInfluence > 0.0) {\r
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);\r
        mouseUv.x *= iResolution.x / iResolution.y;\r
        float mouseDist = length(uv - mouseUv);\r
        \r
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));\r
        \r
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;\r
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;\r
    }\r
\r
    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);\r
    vec2 b = abs(a);\r
\r
    float aaWidth = 0.5;\r
    vec2 smoothB = vec2(\r
        smoothstep(0.0, aaWidth, b.x),\r
        smoothstep(0.0, aaWidth, b.y)\r
    );\r
\r
    vec3 color = vec3(0.0);\r
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));\r
    color += exp(-gridThickness * smoothB.y);\r
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));\r
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);\r
\r
    if (glowIntensity > 0.0) {\r
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);\r
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);\r
    }\r
\r
    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));\r
    \r
    vec2 vignetteCoords = vUv - 0.5;\r
    float vignetteDistance = length(vignetteCoords);\r
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);\r
    vignette = clamp(vignette, 0.0, 1.0);\r
    \r
    vec3 t;\r
    if (enableRainbow) {\r
        t = vec3(\r
            uv.x * 0.5 + 0.5 * sin(iTime),\r
            uv.y * 0.5 + 0.5 * cos(iTime),\r
            pow(cos(iTime), 4.0)\r
        ) + 0.5;\r
    } else {\r
        t = gridColor;\r
    }\r
\r
    float finalFade = ddd * vignette;\r
    float alpha = length(color) * finalFade * opacity;\r
    gl_FragColor = vec4(color * t * finalFade * opacity, alpha);\r
}\`;\r
\r
    const uniforms = {\r
      iTime: { value: 0 },\r
      iResolution: { value: [1, 1] },\r
      enableRainbow: { value: enableRainbow },\r
      gridColor: { value: hexToRgb(gridColor) },\r
      rippleIntensity: { value: rippleIntensity },\r
      gridSize: { value: gridSize },\r
      gridThickness: { value: gridThickness },\r
      fadeDistance: { value: fadeDistance },\r
      vignetteStrength: { value: vignetteStrength },\r
      glowIntensity: { value: glowIntensity },\r
      opacity: { value: opacity },\r
      gridRotation: { value: gridRotation },\r
      mouseInteraction: { value: mouseInteraction },\r
      mousePosition: { value: [0.5, 0.5] },\r
      mouseInfluence: { value: 0 },\r
      mouseInteractionRadius: { value: mouseInteractionRadius }\r
    };\r
\r
    uniformsRef.current = uniforms;\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const resize = () => {\r
      const { clientWidth: w, clientHeight: h } = containerRef.current;\r
      renderer.setSize(w, h);\r
      uniforms.iResolution.value = [w, h];\r
    };\r
\r
    const handleMouseMove = e => {\r
      if (!mouseInteraction || !containerRef.current) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y coordinate\r
      targetMouseRef.current = { x, y };\r
    };\r
\r
    const handleMouseEnter = () => {\r
      if (!mouseInteraction) return;\r
      mouseInfluenceRef.current = 1.0;\r
    };\r
\r
    const handleMouseLeave = () => {\r
      if (!mouseInteraction) return;\r
      mouseInfluenceRef.current = 0.0;\r
    };\r
\r
    window.addEventListener('resize', resize);\r
    if (mouseInteraction) {\r
      containerRef.current.addEventListener('mousemove', handleMouseMove);\r
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);\r
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
    resize();\r
\r
    const render = t => {\r
      uniforms.iTime.value = t * 0.001;\r
\r
      const lerpFactor = 0.1;\r
      mousePositionRef.current.x += (targetMouseRef.current.x - mousePositionRef.current.x) * lerpFactor;\r
      mousePositionRef.current.y += (targetMouseRef.current.y - mousePositionRef.current.y) * lerpFactor;\r
\r
      const currentInfluence = uniforms.mouseInfluence.value;\r
      const targetInfluence = mouseInfluenceRef.current;\r
      uniforms.mouseInfluence.value += (targetInfluence - currentInfluence) * 0.05;\r
\r
      uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y];\r
\r
      renderer.render({ scene: mesh });\r
      requestAnimationFrame(render);\r
    };\r
\r
    requestAnimationFrame(render);\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      if (mouseInteraction && containerRef.current) {\r
        containerRef.current.removeEventListener('mousemove', handleMouseMove);\r
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);\r
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();\r
      containerRef.current?.removeChild(gl.canvas);\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!uniformsRef.current) return;\r
\r
    const hexToRgb = hex => {\r
      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
      return result\r
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]\r
        : [1, 1, 1];\r
    };\r
\r
    uniformsRef.current.enableRainbow.value = enableRainbow;\r
    uniformsRef.current.gridColor.value = hexToRgb(gridColor);\r
    uniformsRef.current.rippleIntensity.value = rippleIntensity;\r
    uniformsRef.current.gridSize.value = gridSize;\r
    uniformsRef.current.gridThickness.value = gridThickness;\r
    uniformsRef.current.fadeDistance.value = fadeDistance;\r
    uniformsRef.current.vignetteStrength.value = vignetteStrength;\r
    uniformsRef.current.glowIntensity.value = glowIntensity;\r
    uniformsRef.current.opacity.value = opacity;\r
    uniformsRef.current.gridRotation.value = gridRotation;\r
    uniformsRef.current.mouseInteraction.value = mouseInteraction;\r
    uniformsRef.current.mouseInteractionRadius.value = mouseInteractionRadius;\r
  }, [\r
    enableRainbow,\r
    gridColor,\r
    rippleIntensity,\r
    gridSize,\r
    gridThickness,\r
    fadeDistance,\r
    vignetteStrength,\r
    glowIntensity,\r
    opacity,\r
    gridRotation,\r
    mouseInteraction,\r
    mouseInteractionRadius\r
  ]);\r
\r
  return <div ref={containerRef} className="w-full h-full relative overflow-hidden [&_canvas]:block" />;\r
};\r
\r
export default RippleGrid;\r
`,te=`import { useRef, useEffect } from 'react';\r
import { Renderer, Program, Triangle, Mesh } from 'ogl';\r
import './RippleGrid.css';\r
\r
type Props = {\r
  enableRainbow?: boolean;\r
  gridColor?: string;\r
  rippleIntensity?: number;\r
  gridSize?: number;\r
  gridThickness?: number;\r
  fadeDistance?: number;\r
  vignetteStrength?: number;\r
  glowIntensity?: number;\r
  opacity?: number;\r
  gridRotation?: number;\r
  mouseInteraction?: boolean;\r
  mouseInteractionRadius?: number;\r
};\r
\r
const RippleGrid: React.FC<Props> = ({\r
  enableRainbow = false,\r
  gridColor = '#ffffff',\r
  rippleIntensity = 0.05,\r
  gridSize = 10.0,\r
  gridThickness = 15.0,\r
  fadeDistance = 1.5,\r
  vignetteStrength = 2.0,\r
  glowIntensity = 0.1,\r
  opacity = 1.0,\r
  gridRotation = 0,\r
  mouseInteraction = true,\r
  mouseInteractionRadius = 1\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });\r
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const mouseInfluenceRef = useRef(0);\r
  const uniformsRef = useRef<any>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const hexToRgb = (hex: string): [number, number, number] => {\r
      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
      return result\r
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]\r
        : [1, 1, 1];\r
    };\r
\r
    const renderer = new Renderer({\r
      dpr: Math.min(window.devicePixelRatio, 2),\r
      alpha: true\r
    });\r
    const gl = renderer.gl;\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
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
uniform float iTime;\r
uniform vec2 iResolution;\r
uniform bool enableRainbow;\r
uniform vec3 gridColor;\r
uniform float rippleIntensity;\r
uniform float gridSize;\r
uniform float gridThickness;\r
uniform float fadeDistance;\r
uniform float vignetteStrength;\r
uniform float glowIntensity;\r
uniform float opacity;\r
uniform float gridRotation;\r
uniform bool mouseInteraction;\r
uniform vec2 mousePosition;\r
uniform float mouseInfluence;\r
uniform float mouseInteractionRadius;\r
varying vec2 vUv;\r
\r
float pi = 3.141592;\r
\r
mat2 rotate(float angle) {\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    return mat2(c, -s, s, c);\r
}\r
\r
void main() {\r
    vec2 uv = vUv * 2.0 - 1.0;\r
    uv.x *= iResolution.x / iResolution.y;\r
\r
    if (gridRotation != 0.0) {\r
        uv = rotate(gridRotation * pi / 180.0) * uv;\r
    }\r
\r
    float dist = length(uv);\r
    float func = sin(pi * (iTime - dist));\r
    vec2 rippleUv = uv + uv * func * rippleIntensity;\r
\r
    if (mouseInteraction && mouseInfluence > 0.0) {\r
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);\r
        mouseUv.x *= iResolution.x / iResolution.y;\r
        float mouseDist = length(uv - mouseUv);\r
        \r
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));\r
        \r
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;\r
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;\r
    }\r
\r
    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);\r
    vec2 b = abs(a);\r
\r
    float aaWidth = 0.5;\r
    vec2 smoothB = vec2(\r
        smoothstep(0.0, aaWidth, b.x),\r
        smoothstep(0.0, aaWidth, b.y)\r
    );\r
\r
    vec3 color = vec3(0.0);\r
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));\r
    color += exp(-gridThickness * smoothB.y);\r
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));\r
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);\r
\r
    if (glowIntensity > 0.0) {\r
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);\r
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);\r
    }\r
\r
    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));\r
    \r
    vec2 vignetteCoords = vUv - 0.5;\r
    float vignetteDistance = length(vignetteCoords);\r
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);\r
    vignette = clamp(vignette, 0.0, 1.0);\r
    \r
    vec3 t;\r
    if (enableRainbow) {\r
        t = vec3(\r
            uv.x * 0.5 + 0.5 * sin(iTime),\r
            uv.y * 0.5 + 0.5 * cos(iTime),\r
            pow(cos(iTime), 4.0)\r
        ) + 0.5;\r
    } else {\r
        t = gridColor;\r
    }\r
\r
    float finalFade = ddd * vignette;\r
    float alpha = length(color) * finalFade * opacity;\r
    gl_FragColor = vec4(color * t * finalFade * opacity, alpha);\r
}\`;\r
\r
    const uniforms = {\r
      iTime: { value: 0 },\r
      iResolution: { value: [1, 1] },\r
      enableRainbow: { value: enableRainbow },\r
      gridColor: { value: hexToRgb(gridColor) },\r
      rippleIntensity: { value: rippleIntensity },\r
      gridSize: { value: gridSize },\r
      gridThickness: { value: gridThickness },\r
      fadeDistance: { value: fadeDistance },\r
      vignetteStrength: { value: vignetteStrength },\r
      glowIntensity: { value: glowIntensity },\r
      opacity: { value: opacity },\r
      gridRotation: { value: gridRotation },\r
      mouseInteraction: { value: mouseInteraction },\r
      mousePosition: { value: [0.5, 0.5] },\r
      mouseInfluence: { value: 0 },\r
      mouseInteractionRadius: { value: mouseInteractionRadius }\r
    };\r
\r
    uniformsRef.current = uniforms;\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const resize = () => {\r
      const { clientWidth: w, clientHeight: h } = containerRef.current!;\r
      renderer.setSize(w, h);\r
      uniforms.iResolution.value = [w, h];\r
    };\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!mouseInteraction || !containerRef.current) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMouseRef.current = { x, y };\r
    };\r
\r
    const handleMouseEnter = () => {\r
      if (!mouseInteraction) return;\r
      mouseInfluenceRef.current = 1.0;\r
    };\r
\r
    const handleMouseLeave = () => {\r
      if (!mouseInteraction) return;\r
      mouseInfluenceRef.current = 0.0;\r
    };\r
\r
    window.addEventListener('resize', resize);\r
    if (mouseInteraction) {\r
      containerRef.current.addEventListener('mousemove', handleMouseMove);\r
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);\r
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
    resize();\r
\r
    const render = (t: number) => {\r
      uniforms.iTime.value = t * 0.001;\r
\r
      const lerpFactor = 0.1;\r
      mousePositionRef.current.x += (targetMouseRef.current.x - mousePositionRef.current.x) * lerpFactor;\r
      mousePositionRef.current.y += (targetMouseRef.current.y - mousePositionRef.current.y) * lerpFactor;\r
\r
      const currentInfluence = uniforms.mouseInfluence.value;\r
      const targetInfluence = mouseInfluenceRef.current;\r
      uniforms.mouseInfluence.value += (targetInfluence - currentInfluence) * 0.05;\r
\r
      uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y];\r
\r
      renderer.render({ scene: mesh });\r
      requestAnimationFrame(render);\r
    };\r
\r
    requestAnimationFrame(render);\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      if (mouseInteraction && containerRef.current) {\r
        containerRef.current.removeEventListener('mousemove', handleMouseMove);\r
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);\r
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();\r
      containerRef.current?.removeChild(gl.canvas);\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!uniformsRef.current) return;\r
\r
    const hexToRgb = (hex: string): [number, number, number] => {\r
      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
      return result\r
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]\r
        : [1, 1, 1];\r
    };\r
\r
    uniformsRef.current.enableRainbow.value = enableRainbow;\r
    uniformsRef.current.gridColor.value = hexToRgb(gridColor);\r
    uniformsRef.current.rippleIntensity.value = rippleIntensity;\r
    uniformsRef.current.gridSize.value = gridSize;\r
    uniformsRef.current.gridThickness.value = gridThickness;\r
    uniformsRef.current.fadeDistance.value = fadeDistance;\r
    uniformsRef.current.vignetteStrength.value = vignetteStrength;\r
    uniformsRef.current.glowIntensity.value = glowIntensity;\r
    uniformsRef.current.opacity.value = opacity;\r
    uniformsRef.current.gridRotation.value = gridRotation;\r
    uniformsRef.current.mouseInteraction.value = mouseInteraction;\r
    uniformsRef.current.mouseInteractionRadius.value = mouseInteractionRadius;\r
  }, [\r
    enableRainbow,\r
    gridColor,\r
    rippleIntensity,\r
    gridSize,\r
    gridThickness,\r
    fadeDistance,\r
    vignetteStrength,\r
    glowIntensity,\r
    opacity,\r
    gridRotation,\r
    mouseInteraction,\r
    mouseInteractionRadius\r
  ]);\r
\r
  return <div ref={containerRef} className="ripple-grid-container" />;\r
};\r
\r
export default RippleGrid;\r
`,oe=`import { useRef, useEffect } from 'react';\r
import { Renderer, Program, Triangle, Mesh } from 'ogl';\r
\r
type Props = {\r
  enableRainbow?: boolean;\r
  gridColor?: string;\r
  rippleIntensity?: number;\r
  gridSize?: number;\r
  gridThickness?: number;\r
  fadeDistance?: number;\r
  vignetteStrength?: number;\r
  glowIntensity?: number;\r
  opacity?: number;\r
  gridRotation?: number;\r
  mouseInteraction?: boolean;\r
  mouseInteractionRadius?: number;\r
};\r
\r
const RippleGrid: React.FC<Props> = ({\r
  enableRainbow = false,\r
  gridColor = '#ffffff',\r
  rippleIntensity = 0.05,\r
  gridSize = 10.0,\r
  gridThickness = 15.0,\r
  fadeDistance = 1.5,\r
  vignetteStrength = 2.0,\r
  glowIntensity = 0.1,\r
  opacity = 1.0,\r
  gridRotation = 0,\r
  mouseInteraction = true,\r
  mouseInteractionRadius = 1\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });\r
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });\r
  const mouseInfluenceRef = useRef(0);\r
  const uniformsRef = useRef<any>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const hexToRgb = (hex: string): [number, number, number] => {\r
      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
      return result\r
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]\r
        : [1, 1, 1];\r
    };\r
\r
    const renderer = new Renderer({\r
      dpr: Math.min(window.devicePixelRatio, 2),\r
      alpha: true\r
    });\r
    const gl = renderer.gl;\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
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
uniform float iTime;\r
uniform vec2 iResolution;\r
uniform bool enableRainbow;\r
uniform vec3 gridColor;\r
uniform float rippleIntensity;\r
uniform float gridSize;\r
uniform float gridThickness;\r
uniform float fadeDistance;\r
uniform float vignetteStrength;\r
uniform float glowIntensity;\r
uniform float opacity;\r
uniform float gridRotation;\r
uniform bool mouseInteraction;\r
uniform vec2 mousePosition;\r
uniform float mouseInfluence;\r
uniform float mouseInteractionRadius;\r
varying vec2 vUv;\r
\r
float pi = 3.141592;\r
\r
mat2 rotate(float angle) {\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    return mat2(c, -s, s, c);\r
}\r
\r
void main() {\r
    vec2 uv = vUv * 2.0 - 1.0;\r
    uv.x *= iResolution.x / iResolution.y;\r
\r
    if (gridRotation != 0.0) {\r
        uv = rotate(gridRotation * pi / 180.0) * uv;\r
    }\r
\r
    float dist = length(uv);\r
    float func = sin(pi * (iTime - dist));\r
    vec2 rippleUv = uv + uv * func * rippleIntensity;\r
\r
    if (mouseInteraction && mouseInfluence > 0.0) {\r
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);\r
        mouseUv.x *= iResolution.x / iResolution.y;\r
        float mouseDist = length(uv - mouseUv);\r
        \r
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));\r
        \r
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;\r
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;\r
    }\r
\r
    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);\r
    vec2 b = abs(a);\r
\r
    float aaWidth = 0.5;\r
    vec2 smoothB = vec2(\r
        smoothstep(0.0, aaWidth, b.x),\r
        smoothstep(0.0, aaWidth, b.y)\r
    );\r
\r
    vec3 color = vec3(0.0);\r
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));\r
    color += exp(-gridThickness * smoothB.y);\r
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));\r
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);\r
\r
    if (glowIntensity > 0.0) {\r
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);\r
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);\r
    }\r
\r
    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));\r
    \r
    vec2 vignetteCoords = vUv - 0.5;\r
    float vignetteDistance = length(vignetteCoords);\r
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);\r
    vignette = clamp(vignette, 0.0, 1.0);\r
    \r
    vec3 t;\r
    if (enableRainbow) {\r
        t = vec3(\r
            uv.x * 0.5 + 0.5 * sin(iTime),\r
            uv.y * 0.5 + 0.5 * cos(iTime),\r
            pow(cos(iTime), 4.0)\r
        ) + 0.5;\r
    } else {\r
        t = gridColor;\r
    }\r
\r
    float finalFade = ddd * vignette;\r
    float alpha = length(color) * finalFade * opacity;\r
    gl_FragColor = vec4(color * t * finalFade * opacity, alpha);\r
}\`;\r
\r
    const uniforms = {\r
      iTime: { value: 0 },\r
      iResolution: { value: [1, 1] },\r
      enableRainbow: { value: enableRainbow },\r
      gridColor: { value: hexToRgb(gridColor) },\r
      rippleIntensity: { value: rippleIntensity },\r
      gridSize: { value: gridSize },\r
      gridThickness: { value: gridThickness },\r
      fadeDistance: { value: fadeDistance },\r
      vignetteStrength: { value: vignetteStrength },\r
      glowIntensity: { value: glowIntensity },\r
      opacity: { value: opacity },\r
      gridRotation: { value: gridRotation },\r
      mouseInteraction: { value: mouseInteraction },\r
      mousePosition: { value: [0.5, 0.5] },\r
      mouseInfluence: { value: 0 },\r
      mouseInteractionRadius: { value: mouseInteractionRadius }\r
    };\r
\r
    uniformsRef.current = uniforms;\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const resize = () => {\r
      const { clientWidth: w, clientHeight: h } = containerRef.current!;\r
      renderer.setSize(w, h);\r
      uniforms.iResolution.value = [w, h];\r
    };\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!mouseInteraction || !containerRef.current) return;\r
      const rect = containerRef.current.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMouseRef.current = { x, y };\r
    };\r
\r
    const handleMouseEnter = () => {\r
      if (!mouseInteraction) return;\r
      mouseInfluenceRef.current = 1.0;\r
    };\r
\r
    const handleMouseLeave = () => {\r
      if (!mouseInteraction) return;\r
      mouseInfluenceRef.current = 0.0;\r
    };\r
\r
    window.addEventListener('resize', resize);\r
    if (mouseInteraction) {\r
      containerRef.current.addEventListener('mousemove', handleMouseMove);\r
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);\r
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
    resize();\r
\r
    const render = (t: number) => {\r
      uniforms.iTime.value = t * 0.001;\r
\r
      const lerpFactor = 0.1;\r
      mousePositionRef.current.x += (targetMouseRef.current.x - mousePositionRef.current.x) * lerpFactor;\r
      mousePositionRef.current.y += (targetMouseRef.current.y - mousePositionRef.current.y) * lerpFactor;\r
\r
      const currentInfluence = uniforms.mouseInfluence.value;\r
      const targetInfluence = mouseInfluenceRef.current;\r
      uniforms.mouseInfluence.value += (targetInfluence - currentInfluence) * 0.05;\r
\r
      uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y];\r
\r
      renderer.render({ scene: mesh });\r
      requestAnimationFrame(render);\r
    };\r
\r
    requestAnimationFrame(render);\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      if (mouseInteraction && containerRef.current) {\r
        containerRef.current.removeEventListener('mousemove', handleMouseMove);\r
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);\r
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();\r
      containerRef.current?.removeChild(gl.canvas);\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!uniformsRef.current) return;\r
\r
    const hexToRgb = (hex: string): [number, number, number] => {\r
      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
      return result\r
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]\r
        : [1, 1, 1];\r
    };\r
\r
    uniformsRef.current.enableRainbow.value = enableRainbow;\r
    uniformsRef.current.gridColor.value = hexToRgb(gridColor);\r
    uniformsRef.current.rippleIntensity.value = rippleIntensity;\r
    uniformsRef.current.gridSize.value = gridSize;\r
    uniformsRef.current.gridThickness.value = gridThickness;\r
    uniformsRef.current.fadeDistance.value = fadeDistance;\r
    uniformsRef.current.vignetteStrength.value = vignetteStrength;\r
    uniformsRef.current.glowIntensity.value = glowIntensity;\r
    uniformsRef.current.opacity.value = opacity;\r
    uniformsRef.current.gridRotation.value = gridRotation;\r
    uniformsRef.current.mouseInteraction.value = mouseInteraction;\r
    uniformsRef.current.mouseInteractionRadius.value = mouseInteractionRadius;\r
  }, [\r
    enableRainbow,\r
    gridColor,\r
    rippleIntensity,\r
    gridSize,\r
    gridThickness,\r
    fadeDistance,\r
    vignetteStrength,\r
    glowIntensity,\r
    opacity,\r
    gridRotation,\r
    mouseInteraction,\r
    mouseInteractionRadius\r
  ]);\r
\r
  return <div ref={containerRef} className="w-full h-full relative overflow-hidden [&_canvas]:block" />;\r
};\r
\r
export default RippleGrid;\r
`,ie={dependencies:"ogl",usage:`import RippleGrid from './RippleGrid';

<div style={{position: 'relative', height: '500px', overflow: 'hidden'}}>
  <RippleGrid
    enableRainbow={false}
    gridColor="#ffffff"
    rippleIntensity={0.05}
    gridSize={10}
    gridThickness={15}
    mouseInteraction={true}
    mouseInteractionRadius={1.2}
    opacity={0.8}
  />
</div>`,code:ne,tailwind:re,tsCode:te,tsTailwind:oe},se=({enableRainbow:m=!1,gridColor:h="#ffffff",rippleIntensity:d=.05,gridSize:I=10,gridThickness:v=15,fadeDistance:y=1.5,vignetteStrength:g=2,glowIntensity:x=.1,opacity:p=1,gridRotation:b=0,mouseInteraction:a=!0,mouseInteractionRadius:w=1})=>{const o=r.useRef(null),f=r.useRef({x:.5,y:.5}),R=r.useRef({x:.5,y:.5}),T=r.useRef(0),i=r.useRef(null);return r.useEffect(()=>{if(!o.current)return;const C=s=>{const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},l=new G({dpr:Math.min(window.devicePixelRatio,2),alpha:!0}),n=l.gl;n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.canvas.style.width="100%",n.canvas.style.height="100%",o.current.appendChild(n.canvas);const S=`
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`,E=`precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    if (gridRotation != 0.0) {
        uv = rotate(gridRotation * pi / 180.0) * uv;
    }

    float dist = length(uv);
    float func = sin(pi * (iTime - dist));
    vec2 rippleUv = uv + uv * func * rippleIntensity;

    if (mouseInteraction && mouseInfluence > 0.0) {
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);
        mouseUv.x *= iResolution.x / iResolution.y;
        float mouseDist = length(uv - mouseUv);
        
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
        
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
    }

    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);

    float aaWidth = 0.5;
    vec2 smoothB = vec2(
        smoothstep(0.0, aaWidth, b.x),
        smoothstep(0.0, aaWidth, b.y)
    );

    vec3 color = vec3(0.0);
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
    color += exp(-gridThickness * smoothB.y);
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

    if (glowIntensity > 0.0) {
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
    }

    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
    
    vec2 vignetteCoords = vUv - 0.5;
    float vignetteDistance = length(vignetteCoords);
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
    vignette = clamp(vignette, 0.0, 1.0);
    
    vec3 t;
    if (enableRainbow) {
        t = vec3(
            uv.x * 0.5 + 0.5 * sin(iTime),
            uv.y * 0.5 + 0.5 * cos(iTime),
            pow(cos(iTime), 4.0)
        ) + 0.5;
    } else {
        t = gridColor;
    }

    float finalFade = ddd * vignette;
    float alpha = length(color) * finalFade * opacity;
    gl_FragColor = vec4(color * t * finalFade * opacity, alpha);
}`,u={iTime:{value:0},iResolution:{value:[1,1]},enableRainbow:{value:m},gridColor:{value:C(h)},rippleIntensity:{value:d},gridSize:{value:I},gridThickness:{value:v},fadeDistance:{value:y},vignetteStrength:{value:g},glowIntensity:{value:x},opacity:{value:p},gridRotation:{value:b},mouseInteraction:{value:a},mousePosition:{value:[.5,.5]},mouseInfluence:{value:0},mouseInteractionRadius:{value:w}};i.current=u;const M=new ee(n),P=new A(n,{vertex:S,fragment:E,uniforms:u}),z=new j(n,{geometry:M,program:P}),D=()=>{const{clientWidth:s,clientHeight:t}=o.current;l.setSize(s,t),u.iResolution.value=[s,t]},U=s=>{if(!a||!o.current)return;const t=o.current.getBoundingClientRect(),L=(s.clientX-t.left)/t.width,k=1-(s.clientY-t.top)/t.height;R.current={x:L,y:k}},F=()=>{a&&(T.current=1)},B=()=>{a&&(T.current=0)};window.addEventListener("resize",D),a&&(o.current.addEventListener("mousemove",U),o.current.addEventListener("mouseenter",F),o.current.addEventListener("mouseleave",B)),D();const _=s=>{u.iTime.value=s*.001;const t=.1;f.current.x+=(R.current.x-f.current.x)*t,f.current.y+=(R.current.y-f.current.y)*t;const L=u.mouseInfluence.value,k=T.current;u.mouseInfluence.value+=(k-L)*.05,u.mousePosition.value=[f.current.x,f.current.y],l.render({scene:z}),requestAnimationFrame(_)};return requestAnimationFrame(_),()=>{var s,t;window.removeEventListener("resize",D),a&&o.current&&(o.current.removeEventListener("mousemove",U),o.current.removeEventListener("mouseenter",F),o.current.removeEventListener("mouseleave",B)),(s=l.gl.getExtension("WEBGL_lose_context"))==null||s.loseContext(),(t=o.current)==null||t.removeChild(n.canvas)}},[]),r.useEffect(()=>{if(!i.current)return;const C=l=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(l);return n?[parseInt(n[1],16)/255,parseInt(n[2],16)/255,parseInt(n[3],16)/255]:[1,1,1]};i.current.enableRainbow.value=m,i.current.gridColor.value=C(h),i.current.rippleIntensity.value=d,i.current.gridSize.value=I,i.current.gridThickness.value=v,i.current.fadeDistance.value=y,i.current.vignetteStrength.value=g,i.current.glowIntensity.value=x,i.current.opacity.value=p,i.current.gridRotation.value=b,i.current.mouseInteraction.value=a,i.current.mouseInteractionRadius.value=w},[m,h,d,I,v,y,g,x,p,b,a,w]),e.jsx("div",{ref:o,className:"ripple-grid-container"})},pe=()=>{const[m,h]=r.useState(!1),[d,I]=r.useState("#5227FF"),[v,y]=r.useState(.05),[g,x]=r.useState(10),[p,b]=r.useState(15),[a,w]=r.useState(1.5),[o,f]=r.useState(2),[R,T]=r.useState(.1),[i,C]=r.useState(1),[l,n]=r.useState(0),[S,E]=r.useState(!0),[u,M]=r.useState(.8),P=[{name:"enableRainbow",type:"boolean",default:"false",description:"Enables rainbow color cycling animation for the grid."},{name:"gridColor",type:"string",default:"'#ffffff'",description:"Color of the grid when rainbow mode is disabled."},{name:"rippleIntensity",type:"number",default:"0.05",description:"Controls the intensity of the ripple effect from the center."},{name:"gridSize",type:"number",default:"10.0",description:"Controls the density/size of the grid pattern."},{name:"gridThickness",type:"number",default:"15.0",description:"Controls the thickness of the grid lines."},{name:"fadeDistance",type:"number",default:"1.5",description:"Controls how far the fade effect extends from the center."},{name:"vignetteStrength",type:"number",default:"2.0",description:"Controls the intensity of the vignette (edge darkening) effect."},{name:"glowIntensity",type:"number",default:"0.1",description:"Adds a glow effect to the grid lines."},{name:"opacity",type:"number",default:"1.0",description:"Overall opacity of the entire effect."},{name:"gridRotation",type:"number",default:"0",description:"Rotate the entire grid pattern by degrees."},{name:"mouseInteraction",type:"boolean",default:"false",description:"Enable mouse/touch interaction to create ripples."},{name:"mouseInteractionRadius",type:"number",default:"0.8",description:"Controls the radius of the mouse interaction effect."}];return e.jsxs(O,{children:[e.jsxs(Y,{children:[e.jsxs(N,{position:"relative",className:"demo-container",h:600,overflow:"hidden",children:[e.jsx(se,{enableRainbow:m,gridColor:d,rippleIntensity:v,gridSize:g,gridThickness:p,fadeDistance:a,vignetteStrength:o,glowIntensity:R,opacity:i,gridRotation:l,mouseInteraction:S,mouseInteractionRadius:u}),e.jsx(Z,{pillText:"New Background",headline:"Retro yet futuristic, this is Ripple Grid!"})]}),e.jsxs(K,{children:[e.jsxs(H,{alignItems:"center",mb:4,children:[e.jsx(q,{fontSize:"sm",mr:2,children:"Grid Color"}),e.jsx($,{type:"color",value:d,onChange:z=>I(z.target.value),width:"50px"})]}),e.jsx(c,{title:"Ripple Intensity",min:0,max:.3,step:.01,value:v,onChange:y}),e.jsx(c,{title:"Grid Size",min:5,max:30,step:1,value:g,onChange:x}),e.jsx(c,{title:"Grid Thickness",min:5,max:50,step:1,value:p,onChange:b}),e.jsx(c,{title:"Fade Distance",min:.5,max:3,step:.1,value:a,onChange:w}),e.jsx(c,{title:"Vignette Strength",min:.5,max:5,step:.1,value:o,onChange:f}),e.jsx(c,{title:"Glow Intensity",min:0,max:1,step:.05,value:R,onChange:T}),e.jsx(c,{title:"Opacity",min:0,max:1,step:.05,value:i,onChange:C}),e.jsx(c,{title:"Grid Rotation",min:0,max:360,step:1,value:l,onChange:n,valueUnit:"°"}),e.jsx(c,{title:"Mouse Interaction Radius",min:.2,max:2,step:.1,value:u,onChange:M}),e.jsx(W,{title:"Mouse Interaction",isChecked:S,onChange:E}),e.jsx(W,{title:"Enable Rainbow",isChecked:m,onChange:h})]}),e.jsx(X,{data:P}),e.jsx(Q,{dependencyList:["ogl"]})]}),e.jsx(V,{children:e.jsx(J,{codeObject:ie})})]})};export{pe as default};
