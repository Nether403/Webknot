import{r as C,j as x,g as j,B as jn,F as xn,T as vn,d as mn}from"./index-wsKSLPNH.js";import{T as qn,P as Bn,a as Hn,C as Wn,b as Vn}from"./PropTable-C4uPWs8h.js";import{C as Un}from"./Customize-1m_ZNqR9.js";import{D as Jn}from"./Dependencies-BHoMfJUj.js";import{P as L}from"./PreviewSlider-m1G_aiYP.js";import{B as Kn}from"./BackgroundContent-CqU7Wlm2.js";import"./index-Bpz4cGEA.js";import"./PreviewSwitch-DqnF708j.js";const Qn=`'use client';\r
import { useRef, useEffect, useCallback, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import { InertiaPlugin } from 'gsap/InertiaPlugin';\r
\r
import './DotGrid.css';\r
\r
gsap.registerPlugin(InertiaPlugin);\r
\r
const throttle = (func, limit) => {\r
  let lastCall = 0;\r
  return function (...args) {\r
    const now = performance.now();\r
    if (now - lastCall >= limit) {\r
      lastCall = now;\r
      func.apply(this, args);\r
    }\r
  };\r
};\r
\r
function hexToRgb(hex) {\r
  const m = hex.match(/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i);\r
  if (!m) return { r: 0, g: 0, b: 0 };\r
  return {\r
    r: parseInt(m[1], 16),\r
    g: parseInt(m[2], 16),\r
    b: parseInt(m[3], 16)\r
  };\r
}\r
\r
const DotGrid = ({\r
  dotSize = 16,\r
  gap = 32,\r
  baseColor = '#5227FF',\r
  activeColor = '#5227FF',\r
  proximity = 150,\r
  speedTrigger = 100,\r
  shockRadius = 250,\r
  shockStrength = 5,\r
  maxSpeed = 5000,\r
  resistance = 750,\r
  returnDuration = 1.5,\r
  className = '',\r
  style\r
}) => {\r
  const wrapperRef = useRef(null);\r
  const canvasRef = useRef(null);\r
  const dotsRef = useRef([]);\r
  const pointerRef = useRef({\r
    x: 0,\r
    y: 0,\r
    vx: 0,\r
    vy: 0,\r
    speed: 0,\r
    lastTime: 0,\r
    lastX: 0,\r
    lastY: 0\r
  });\r
\r
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);\r
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);\r
\r
  const circlePath = useMemo(() => {\r
    if (typeof window === 'undefined' || !window.Path2D) return null;\r
\r
    const p = new window.Path2D();\r
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);\r
    return p;\r
  }, [dotSize]);\r
\r
  const buildGrid = useCallback(() => {\r
    const wrap = wrapperRef.current;\r
    const canvas = canvasRef.current;\r
    if (!wrap || !canvas) return;\r
\r
    const { width, height } = wrap.getBoundingClientRect();\r
    const dpr = window.devicePixelRatio || 1;\r
\r
    canvas.width = width * dpr;\r
    canvas.height = height * dpr;\r
    canvas.style.width = \`\${width}px\`;\r
    canvas.style.height = \`\${height}px\`;\r
    const ctx = canvas.getContext('2d');\r
    if (ctx) ctx.scale(dpr, dpr);\r
\r
    const cols = Math.floor((width + gap) / (dotSize + gap));\r
    const rows = Math.floor((height + gap) / (dotSize + gap));\r
    const cell = dotSize + gap;\r
\r
    const gridW = cell * cols - gap;\r
    const gridH = cell * rows - gap;\r
\r
    const extraX = width - gridW;\r
    const extraY = height - gridH;\r
\r
    const startX = extraX / 2 + dotSize / 2;\r
    const startY = extraY / 2 + dotSize / 2;\r
\r
    const dots = [];\r
    for (let y = 0; y < rows; y++) {\r
      for (let x = 0; x < cols; x++) {\r
        const cx = startX + x * cell;\r
        const cy = startY + y * cell;\r
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });\r
      }\r
    }\r
    dotsRef.current = dots;\r
  }, [dotSize, gap]);\r
\r
  useEffect(() => {\r
    if (!circlePath) return;\r
\r
    let rafId;\r
    const proxSq = proximity * proximity;\r
\r
    const draw = () => {\r
      const canvas = canvasRef.current;\r
      if (!canvas) return;\r
      const ctx = canvas.getContext('2d');\r
      if (!ctx) return;\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      const { x: px, y: py } = pointerRef.current;\r
\r
      for (const dot of dotsRef.current) {\r
        const ox = dot.cx + dot.xOffset;\r
        const oy = dot.cy + dot.yOffset;\r
        const dx = dot.cx - px;\r
        const dy = dot.cy - py;\r
        const dsq = dx * dx + dy * dy;\r
\r
        let style = baseColor;\r
        if (dsq <= proxSq) {\r
          const dist = Math.sqrt(dsq);\r
          const t = 1 - dist / proximity;\r
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);\r
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);\r
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);\r
          style = \`rgb(\${r},\${g},\${b})\`;\r
        }\r
\r
        ctx.save();\r
        ctx.translate(ox, oy);\r
        ctx.fillStyle = style;\r
        ctx.fill(circlePath);\r
        ctx.restore();\r
      }\r
\r
      rafId = requestAnimationFrame(draw);\r
    };\r
\r
    draw();\r
    return () => cancelAnimationFrame(rafId);\r
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);\r
\r
  useEffect(() => {\r
    buildGrid();\r
    let ro = null;\r
    if ('ResizeObserver' in window) {\r
      ro = new ResizeObserver(buildGrid);\r
      wrapperRef.current && ro.observe(wrapperRef.current);\r
    } else {\r
      window.addEventListener('resize', buildGrid);\r
    }\r
    return () => {\r
      if (ro) ro.disconnect();\r
      else window.removeEventListener('resize', buildGrid);\r
    };\r
  }, [buildGrid]);\r
\r
  useEffect(() => {\r
    const onMove = e => {\r
      const now = performance.now();\r
      const pr = pointerRef.current;\r
      const dt = pr.lastTime ? now - pr.lastTime : 16;\r
      const dx = e.clientX - pr.lastX;\r
      const dy = e.clientY - pr.lastY;\r
      let vx = (dx / dt) * 1000;\r
      let vy = (dy / dt) * 1000;\r
      let speed = Math.hypot(vx, vy);\r
      if (speed > maxSpeed) {\r
        const scale = maxSpeed / speed;\r
        vx *= scale;\r
        vy *= scale;\r
        speed = maxSpeed;\r
      }\r
      pr.lastTime = now;\r
      pr.lastX = e.clientX;\r
      pr.lastY = e.clientY;\r
      pr.vx = vx;\r
      pr.vy = vy;\r
      pr.speed = speed;\r
\r
      const rect = canvasRef.current.getBoundingClientRect();\r
      pr.x = e.clientX - rect.left;\r
      pr.y = e.clientY - rect.top;\r
\r
      for (const dot of dotsRef.current) {\r
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);\r
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {\r
          dot._inertiaApplied = true;\r
          gsap.killTweensOf(dot);\r
          const pushX = dot.cx - pr.x + vx * 0.005;\r
          const pushY = dot.cy - pr.y + vy * 0.005;\r
          gsap.to(dot, {\r
            inertia: { xOffset: pushX, yOffset: pushY, resistance },\r
            onComplete: () => {\r
              gsap.to(dot, {\r
                xOffset: 0,\r
                yOffset: 0,\r
                duration: returnDuration,\r
                ease: 'elastic.out(1,0.75)'\r
              });\r
              dot._inertiaApplied = false;\r
            }\r
          });\r
        }\r
      }\r
    };\r
\r
    const onClick = e => {\r
      const rect = canvasRef.current.getBoundingClientRect();\r
      const cx = e.clientX - rect.left;\r
      const cy = e.clientY - rect.top;\r
      for (const dot of dotsRef.current) {\r
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);\r
        if (dist < shockRadius && !dot._inertiaApplied) {\r
          dot._inertiaApplied = true;\r
          gsap.killTweensOf(dot);\r
          const falloff = Math.max(0, 1 - dist / shockRadius);\r
          const pushX = (dot.cx - cx) * shockStrength * falloff;\r
          const pushY = (dot.cy - cy) * shockStrength * falloff;\r
          gsap.to(dot, {\r
            inertia: { xOffset: pushX, yOffset: pushY, resistance },\r
            onComplete: () => {\r
              gsap.to(dot, {\r
                xOffset: 0,\r
                yOffset: 0,\r
                duration: returnDuration,\r
                ease: 'elastic.out(1,0.75)'\r
              });\r
              dot._inertiaApplied = false;\r
            }\r
          });\r
        }\r
      }\r
    };\r
\r
    const throttledMove = throttle(onMove, 50);\r
    window.addEventListener('mousemove', throttledMove, { passive: true });\r
    window.addEventListener('click', onClick);\r
\r
    return () => {\r
      window.removeEventListener('mousemove', throttledMove);\r
      window.removeEventListener('click', onClick);\r
    };\r
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);\r
\r
  return (\r
    <section className={\`dot-grid \${className}\`} style={style}>\r
      <div ref={wrapperRef} className="dot-grid__wrap">\r
        <canvas ref={canvasRef} className="dot-grid__canvas" />\r
      </div>\r
    </section>\r
  );\r
};\r
\r
export default DotGrid;\r
`,Zn=`.dot-grid {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  height: 100%;\r
  width: 100%;\r
  position: relative;\r
}\r
\r
.dot-grid__wrap {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
}\r
\r
.dot-grid__canvas {\r
  position: absolute;\r
  inset: 0;\r
  width: 100%;\r
  height: 100%;\r
  pointer-events: none;\r
}\r
`,nr=`'use client';\r
import { useRef, useEffect, useCallback, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import { InertiaPlugin } from 'gsap/InertiaPlugin';\r
\r
gsap.registerPlugin(InertiaPlugin);\r
\r
const throttle = (func, limit) => {\r
  let lastCall = 0;\r
  return function (...args) {\r
    const now = performance.now();\r
    if (now - lastCall >= limit) {\r
      lastCall = now;\r
      func.apply(this, args);\r
    }\r
  };\r
};\r
\r
function hexToRgb(hex) {\r
  const m = hex.match(/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i);\r
  if (!m) return { r: 0, g: 0, b: 0 };\r
  return {\r
    r: parseInt(m[1], 16),\r
    g: parseInt(m[2], 16),\r
    b: parseInt(m[3], 16)\r
  };\r
}\r
\r
const DotGrid = ({\r
  dotSize = 16,\r
  gap = 32,\r
  baseColor = '#5227FF',\r
  activeColor = '#5227FF',\r
  proximity = 150,\r
  speedTrigger = 100,\r
  shockRadius = 250,\r
  shockStrength = 5,\r
  maxSpeed = 5000,\r
  resistance = 750,\r
  returnDuration = 1.5,\r
  className = '',\r
  style\r
}) => {\r
  const wrapperRef = useRef(null);\r
  const canvasRef = useRef(null);\r
  const dotsRef = useRef([]);\r
  const pointerRef = useRef({\r
    x: 0,\r
    y: 0,\r
    vx: 0,\r
    vy: 0,\r
    speed: 0,\r
    lastTime: 0,\r
    lastX: 0,\r
    lastY: 0\r
  });\r
\r
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);\r
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);\r
\r
  const circlePath = useMemo(() => {\r
    if (typeof window === 'undefined' || !window.Path2D) return null;\r
\r
    const p = new Path2D();\r
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);\r
    return p;\r
  }, [dotSize]);\r
\r
  const buildGrid = useCallback(() => {\r
    const wrap = wrapperRef.current;\r
    const canvas = canvasRef.current;\r
    if (!wrap || !canvas) return;\r
\r
    const { width, height } = wrap.getBoundingClientRect();\r
    const dpr = window.devicePixelRatio || 1;\r
\r
    canvas.width = width * dpr;\r
    canvas.height = height * dpr;\r
    canvas.style.width = \`\${width}px\`;\r
    canvas.style.height = \`\${height}px\`;\r
    const ctx = canvas.getContext('2d');\r
    if (ctx) ctx.scale(dpr, dpr);\r
\r
    const cols = Math.floor((width + gap) / (dotSize + gap));\r
    const rows = Math.floor((height + gap) / (dotSize + gap));\r
    const cell = dotSize + gap;\r
\r
    const gridW = cell * cols - gap;\r
    const gridH = cell * rows - gap;\r
\r
    const extraX = width - gridW;\r
    const extraY = height - gridH;\r
\r
    const startX = extraX / 2 + dotSize / 2;\r
    const startY = extraY / 2 + dotSize / 2;\r
\r
    const dots = [];\r
    for (let y = 0; y < rows; y++) {\r
      for (let x = 0; x < cols; x++) {\r
        const cx = startX + x * cell;\r
        const cy = startY + y * cell;\r
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });\r
      }\r
    }\r
    dotsRef.current = dots;\r
  }, [dotSize, gap]);\r
\r
  useEffect(() => {\r
    if (!circlePath) return;\r
\r
    let rafId;\r
    const proxSq = proximity * proximity;\r
\r
    const draw = () => {\r
      const canvas = canvasRef.current;\r
      if (!canvas) return;\r
      const ctx = canvas.getContext('2d');\r
      if (!ctx) return;\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      const { x: px, y: py } = pointerRef.current;\r
\r
      for (const dot of dotsRef.current) {\r
        const ox = dot.cx + dot.xOffset;\r
        const oy = dot.cy + dot.yOffset;\r
        const dx = dot.cx - px;\r
        const dy = dot.cy - py;\r
        const dsq = dx * dx + dy * dy;\r
\r
        let style = baseColor;\r
        if (dsq <= proxSq) {\r
          const dist = Math.sqrt(dsq);\r
          const t = 1 - dist / proximity;\r
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);\r
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);\r
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);\r
          style = \`rgb(\${r},\${g},\${b})\`;\r
        }\r
\r
        ctx.save();\r
        ctx.translate(ox, oy);\r
        ctx.fillStyle = style;\r
        ctx.fill(circlePath);\r
        ctx.restore();\r
      }\r
\r
      rafId = requestAnimationFrame(draw);\r
    };\r
\r
    draw();\r
    return () => cancelAnimationFrame(rafId);\r
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);\r
\r
  useEffect(() => {\r
    buildGrid();\r
    let ro = null;\r
    if ('ResizeObserver' in window) {\r
      ro = new ResizeObserver(buildGrid);\r
      wrapperRef.current && ro.observe(wrapperRef.current);\r
    } else {\r
      window.addEventListener('resize', buildGrid);\r
    }\r
    return () => {\r
      if (ro) ro.disconnect();\r
      else window.removeEventListener('resize', buildGrid);\r
    };\r
  }, [buildGrid]);\r
\r
  useEffect(() => {\r
    const onMove = e => {\r
      const now = performance.now();\r
      const pr = pointerRef.current;\r
      const dt = pr.lastTime ? now - pr.lastTime : 16;\r
      const dx = e.clientX - pr.lastX;\r
      const dy = e.clientY - pr.lastY;\r
      let vx = (dx / dt) * 1000;\r
      let vy = (dy / dt) * 1000;\r
      let speed = Math.hypot(vx, vy);\r
      if (speed > maxSpeed) {\r
        const scale = maxSpeed / speed;\r
        vx *= scale;\r
        vy *= scale;\r
        speed = maxSpeed;\r
      }\r
      pr.lastTime = now;\r
      pr.lastX = e.clientX;\r
      pr.lastY = e.clientY;\r
      pr.vx = vx;\r
      pr.vy = vy;\r
      pr.speed = speed;\r
\r
      const rect = canvasRef.current.getBoundingClientRect();\r
      pr.x = e.clientX - rect.left;\r
      pr.y = e.clientY - rect.top;\r
\r
      for (const dot of dotsRef.current) {\r
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);\r
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {\r
          dot._inertiaApplied = true;\r
          gsap.killTweensOf(dot);\r
          const pushX = dot.cx - pr.x + vx * 0.005;\r
          const pushY = dot.cy - pr.y + vy * 0.005;\r
          gsap.to(dot, {\r
            inertia: { xOffset: pushX, yOffset: pushY, resistance },\r
            onComplete: () => {\r
              gsap.to(dot, {\r
                xOffset: 0,\r
                yOffset: 0,\r
                duration: returnDuration,\r
                ease: 'elastic.out(1,0.75)'\r
              });\r
              dot._inertiaApplied = false;\r
            }\r
          });\r
        }\r
      }\r
    };\r
\r
    const onClick = e => {\r
      const rect = canvasRef.current.getBoundingClientRect();\r
      const cx = e.clientX - rect.left;\r
      const cy = e.clientY - rect.top;\r
      for (const dot of dotsRef.current) {\r
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);\r
        if (dist < shockRadius && !dot._inertiaApplied) {\r
          dot._inertiaApplied = true;\r
          gsap.killTweensOf(dot);\r
          const falloff = Math.max(0, 1 - dist / shockRadius);\r
          const pushX = (dot.cx - cx) * shockStrength * falloff;\r
          const pushY = (dot.cy - cy) * shockStrength * falloff;\r
          gsap.to(dot, {\r
            inertia: { xOffset: pushX, yOffset: pushY, resistance },\r
            onComplete: () => {\r
              gsap.to(dot, {\r
                xOffset: 0,\r
                yOffset: 0,\r
                duration: returnDuration,\r
                ease: 'elastic.out(1,0.75)'\r
              });\r
              dot._inertiaApplied = false;\r
            }\r
          });\r
        }\r
      }\r
    };\r
\r
    const throttledMove = throttle(onMove, 50);\r
    window.addEventListener('mousemove', throttledMove, { passive: true });\r
    window.addEventListener('click', onClick);\r
\r
    return () => {\r
      window.removeEventListener('mousemove', throttledMove);\r
      window.removeEventListener('click', onClick);\r
    };\r
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);\r
\r
  return (\r
    <section className={\`p-4 flex items-center justify-center h-full w-full relative \${className}\`} style={style}>\r
      <div ref={wrapperRef} className="w-full h-full relative">\r
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />\r
      </div>\r
    </section>\r
  );\r
};\r
\r
export default DotGrid;\r
`,rr=`'use client';\r
import React, { useRef, useEffect, useCallback, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import { InertiaPlugin } from 'gsap/InertiaPlugin';\r
\r
import './DotGrid.css';\r
\r
gsap.registerPlugin(InertiaPlugin);\r
\r
const throttle = (func: (...args: any[]) => void, limit: number) => {\r
  let lastCall = 0;\r
  return function (this: any, ...args: any[]) {\r
    const now = performance.now();\r
    if (now - lastCall >= limit) {\r
      lastCall = now;\r
      func.apply(this, args);\r
    }\r
  };\r
};\r
\r
interface Dot {\r
  cx: number;\r
  cy: number;\r
  xOffset: number;\r
  yOffset: number;\r
  _inertiaApplied: boolean;\r
}\r
\r
export interface DotGridProps {\r
  dotSize?: number;\r
  gap?: number;\r
  baseColor?: string;\r
  activeColor?: string;\r
  proximity?: number;\r
  speedTrigger?: number;\r
  shockRadius?: number;\r
  shockStrength?: number;\r
  maxSpeed?: number;\r
  resistance?: number;\r
  returnDuration?: number;\r
  className?: string;\r
  style?: React.CSSProperties;\r
}\r
\r
function hexToRgb(hex: string) {\r
  const m = hex.match(/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i);\r
  if (!m) return { r: 0, g: 0, b: 0 };\r
  return {\r
    r: parseInt(m[1], 16),\r
    g: parseInt(m[2], 16),\r
    b: parseInt(m[3], 16)\r
  };\r
}\r
\r
const DotGrid: React.FC<DotGridProps> = ({\r
  dotSize = 16,\r
  gap = 32,\r
  baseColor = '#5227FF',\r
  activeColor = '#5227FF',\r
  proximity = 150,\r
  speedTrigger = 100,\r
  shockRadius = 250,\r
  shockStrength = 5,\r
  maxSpeed = 5000,\r
  resistance = 750,\r
  returnDuration = 1.5,\r
  className = '',\r
  style\r
}) => {\r
  const wrapperRef = useRef<HTMLDivElement>(null);\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const dotsRef = useRef<Dot[]>([]);\r
  const pointerRef = useRef({\r
    x: 0,\r
    y: 0,\r
    vx: 0,\r
    vy: 0,\r
    speed: 0,\r
    lastTime: 0,\r
    lastX: 0,\r
    lastY: 0\r
  });\r
\r
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);\r
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);\r
\r
  const circlePath = useMemo(() => {\r
    if (typeof window === 'undefined' || !window.Path2D) return null;\r
\r
    const p = new Path2D();\r
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);\r
    return p;\r
  }, [dotSize]);\r
\r
  const buildGrid = useCallback(() => {\r
    const wrap = wrapperRef.current;\r
    const canvas = canvasRef.current;\r
    if (!wrap || !canvas) return;\r
\r
    const { width, height } = wrap.getBoundingClientRect();\r
    const dpr = window.devicePixelRatio || 1;\r
\r
    canvas.width = width * dpr;\r
    canvas.height = height * dpr;\r
    canvas.style.width = \`\${width}px\`;\r
    canvas.style.height = \`\${height}px\`;\r
    const ctx = canvas.getContext('2d');\r
    if (ctx) ctx.scale(dpr, dpr);\r
\r
    const cols = Math.floor((width + gap) / (dotSize + gap));\r
    const rows = Math.floor((height + gap) / (dotSize + gap));\r
    const cell = dotSize + gap;\r
\r
    const gridW = cell * cols - gap;\r
    const gridH = cell * rows - gap;\r
\r
    const extraX = width - gridW;\r
    const extraY = height - gridH;\r
\r
    const startX = extraX / 2 + dotSize / 2;\r
    const startY = extraY / 2 + dotSize / 2;\r
\r
    const dots: Dot[] = [];\r
    for (let y = 0; y < rows; y++) {\r
      for (let x = 0; x < cols; x++) {\r
        const cx = startX + x * cell;\r
        const cy = startY + y * cell;\r
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });\r
      }\r
    }\r
    dotsRef.current = dots;\r
  }, [dotSize, gap]);\r
\r
  useEffect(() => {\r
    if (!circlePath) return;\r
\r
    let rafId: number;\r
    const proxSq = proximity * proximity;\r
\r
    const draw = () => {\r
      const canvas = canvasRef.current;\r
      if (!canvas) return;\r
      const ctx = canvas.getContext('2d');\r
      if (!ctx) return;\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      const { x: px, y: py } = pointerRef.current;\r
\r
      for (const dot of dotsRef.current) {\r
        const ox = dot.cx + dot.xOffset;\r
        const oy = dot.cy + dot.yOffset;\r
        const dx = dot.cx - px;\r
        const dy = dot.cy - py;\r
        const dsq = dx * dx + dy * dy;\r
\r
        let style = baseColor;\r
        if (dsq <= proxSq) {\r
          const dist = Math.sqrt(dsq);\r
          const t = 1 - dist / proximity;\r
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);\r
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);\r
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);\r
          style = \`rgb(\${r},\${g},\${b})\`;\r
        }\r
\r
        ctx.save();\r
        ctx.translate(ox, oy);\r
        ctx.fillStyle = style;\r
        ctx.fill(circlePath);\r
        ctx.restore();\r
      }\r
\r
      rafId = requestAnimationFrame(draw);\r
    };\r
\r
    draw();\r
    return () => cancelAnimationFrame(rafId);\r
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);\r
\r
  useEffect(() => {\r
    buildGrid();\r
    let ro: ResizeObserver | null = null;\r
    if ('ResizeObserver' in window) {\r
      ro = new ResizeObserver(buildGrid);\r
      wrapperRef.current && ro.observe(wrapperRef.current);\r
    } else {\r
      (window as Window).addEventListener('resize', buildGrid);\r
    }\r
    return () => {\r
      if (ro) ro.disconnect();\r
      else window.removeEventListener('resize', buildGrid);\r
    };\r
  }, [buildGrid]);\r
\r
  useEffect(() => {\r
    const onMove = (e: MouseEvent) => {\r
      const now = performance.now();\r
      const pr = pointerRef.current;\r
      const dt = pr.lastTime ? now - pr.lastTime : 16;\r
      const dx = e.clientX - pr.lastX;\r
      const dy = e.clientY - pr.lastY;\r
      let vx = (dx / dt) * 1000;\r
      let vy = (dy / dt) * 1000;\r
      let speed = Math.hypot(vx, vy);\r
      if (speed > maxSpeed) {\r
        const scale = maxSpeed / speed;\r
        vx *= scale;\r
        vy *= scale;\r
        speed = maxSpeed;\r
      }\r
      pr.lastTime = now;\r
      pr.lastX = e.clientX;\r
      pr.lastY = e.clientY;\r
      pr.vx = vx;\r
      pr.vy = vy;\r
      pr.speed = speed;\r
\r
      const rect = canvasRef.current!.getBoundingClientRect();\r
      pr.x = e.clientX - rect.left;\r
      pr.y = e.clientY - rect.top;\r
\r
      for (const dot of dotsRef.current) {\r
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);\r
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {\r
          dot._inertiaApplied = true;\r
          gsap.killTweensOf(dot);\r
          const pushX = dot.cx - pr.x + vx * 0.005;\r
          const pushY = dot.cy - pr.y + vy * 0.005;\r
          gsap.to(dot, {\r
            inertia: { xOffset: pushX, yOffset: pushY, resistance },\r
            onComplete: () => {\r
              gsap.to(dot, {\r
                xOffset: 0,\r
                yOffset: 0,\r
                duration: returnDuration,\r
                ease: 'elastic.out(1,0.75)'\r
              });\r
              dot._inertiaApplied = false;\r
            }\r
          });\r
        }\r
      }\r
    };\r
\r
    const onClick = (e: MouseEvent) => {\r
      const rect = canvasRef.current!.getBoundingClientRect();\r
      const cx = e.clientX - rect.left;\r
      const cy = e.clientY - rect.top;\r
      for (const dot of dotsRef.current) {\r
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);\r
        if (dist < shockRadius && !dot._inertiaApplied) {\r
          dot._inertiaApplied = true;\r
          gsap.killTweensOf(dot);\r
          const falloff = Math.max(0, 1 - dist / shockRadius);\r
          const pushX = (dot.cx - cx) * shockStrength * falloff;\r
          const pushY = (dot.cy - cy) * shockStrength * falloff;\r
          gsap.to(dot, {\r
            inertia: { xOffset: pushX, yOffset: pushY, resistance },\r
            onComplete: () => {\r
              gsap.to(dot, {\r
                xOffset: 0,\r
                yOffset: 0,\r
                duration: returnDuration,\r
                ease: 'elastic.out(1,0.75)'\r
              });\r
              dot._inertiaApplied = false;\r
            }\r
          });\r
        }\r
      }\r
    };\r
\r
    const throttledMove = throttle(onMove, 50);\r
    window.addEventListener('mousemove', throttledMove, { passive: true });\r
    window.addEventListener('click', onClick);\r
\r
    return () => {\r
      window.removeEventListener('mousemove', throttledMove);\r
      window.removeEventListener('click', onClick);\r
    };\r
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);\r
\r
  return (\r
    <section className={\`dot-grid \${className}\`} style={style}>\r
      <div ref={wrapperRef} className="dot-grid__wrap">\r
        <canvas ref={canvasRef} className="dot-grid__canvas" />\r
      </div>\r
    </section>\r
  );\r
};\r
\r
export default DotGrid;\r
`,er=`'use client';\r
import React, { useRef, useEffect, useCallback, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import { InertiaPlugin } from 'gsap/InertiaPlugin';\r
\r
gsap.registerPlugin(InertiaPlugin);\r
\r
const throttle = (func: (...args: any[]) => void, limit: number) => {\r
  let lastCall = 0;\r
  return function (this: any, ...args: any[]) {\r
    const now = performance.now();\r
    if (now - lastCall >= limit) {\r
      lastCall = now;\r
      func.apply(this, args);\r
    }\r
  };\r
};\r
\r
interface Dot {\r
  cx: number;\r
  cy: number;\r
  xOffset: number;\r
  yOffset: number;\r
  _inertiaApplied: boolean;\r
}\r
\r
export interface DotGridProps {\r
  dotSize?: number;\r
  gap?: number;\r
  baseColor?: string;\r
  activeColor?: string;\r
  proximity?: number;\r
  speedTrigger?: number;\r
  shockRadius?: number;\r
  shockStrength?: number;\r
  maxSpeed?: number;\r
  resistance?: number;\r
  returnDuration?: number;\r
  className?: string;\r
  style?: React.CSSProperties;\r
}\r
\r
function hexToRgb(hex: string) {\r
  const m = hex.match(/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i);\r
  if (!m) return { r: 0, g: 0, b: 0 };\r
  return {\r
    r: parseInt(m[1], 16),\r
    g: parseInt(m[2], 16),\r
    b: parseInt(m[3], 16)\r
  };\r
}\r
\r
const DotGrid: React.FC<DotGridProps> = ({\r
  dotSize = 16,\r
  gap = 32,\r
  baseColor = '#5227FF',\r
  activeColor = '#5227FF',\r
  proximity = 150,\r
  speedTrigger = 100,\r
  shockRadius = 250,\r
  shockStrength = 5,\r
  maxSpeed = 5000,\r
  resistance = 750,\r
  returnDuration = 1.5,\r
  className = '',\r
  style\r
}) => {\r
  const wrapperRef = useRef<HTMLDivElement>(null);\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const dotsRef = useRef<Dot[]>([]);\r
  const pointerRef = useRef({\r
    x: 0,\r
    y: 0,\r
    vx: 0,\r
    vy: 0,\r
    speed: 0,\r
    lastTime: 0,\r
    lastX: 0,\r
    lastY: 0\r
  });\r
\r
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);\r
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);\r
\r
  const circlePath = useMemo(() => {\r
    if (typeof window === 'undefined' || !window.Path2D) return null;\r
\r
    const p = new Path2D();\r
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);\r
    return p;\r
  }, [dotSize]);\r
\r
  const buildGrid = useCallback(() => {\r
    const wrap = wrapperRef.current;\r
    const canvas = canvasRef.current;\r
    if (!wrap || !canvas) return;\r
\r
    const { width, height } = wrap.getBoundingClientRect();\r
    const dpr = window.devicePixelRatio || 1;\r
\r
    canvas.width = width * dpr;\r
    canvas.height = height * dpr;\r
    canvas.style.width = \`\${width}px\`;\r
    canvas.style.height = \`\${height}px\`;\r
    const ctx = canvas.getContext('2d');\r
    if (ctx) ctx.scale(dpr, dpr);\r
\r
    const cols = Math.floor((width + gap) / (dotSize + gap));\r
    const rows = Math.floor((height + gap) / (dotSize + gap));\r
    const cell = dotSize + gap;\r
\r
    const gridW = cell * cols - gap;\r
    const gridH = cell * rows - gap;\r
\r
    const extraX = width - gridW;\r
    const extraY = height - gridH;\r
\r
    const startX = extraX / 2 + dotSize / 2;\r
    const startY = extraY / 2 + dotSize / 2;\r
\r
    const dots: Dot[] = [];\r
    for (let y = 0; y < rows; y++) {\r
      for (let x = 0; x < cols; x++) {\r
        const cx = startX + x * cell;\r
        const cy = startY + y * cell;\r
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });\r
      }\r
    }\r
    dotsRef.current = dots;\r
  }, [dotSize, gap]);\r
\r
  useEffect(() => {\r
    if (!circlePath) return;\r
\r
    let rafId: number;\r
    const proxSq = proximity * proximity;\r
\r
    const draw = () => {\r
      const canvas = canvasRef.current;\r
      if (!canvas) return;\r
      const ctx = canvas.getContext('2d');\r
      if (!ctx) return;\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      const { x: px, y: py } = pointerRef.current;\r
\r
      for (const dot of dotsRef.current) {\r
        const ox = dot.cx + dot.xOffset;\r
        const oy = dot.cy + dot.yOffset;\r
        const dx = dot.cx - px;\r
        const dy = dot.cy - py;\r
        const dsq = dx * dx + dy * dy;\r
\r
        let style = baseColor;\r
        if (dsq <= proxSq) {\r
          const dist = Math.sqrt(dsq);\r
          const t = 1 - dist / proximity;\r
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);\r
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);\r
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);\r
          style = \`rgb(\${r},\${g},\${b})\`;\r
        }\r
\r
        ctx.save();\r
        ctx.translate(ox, oy);\r
        ctx.fillStyle = style;\r
        ctx.fill(circlePath);\r
        ctx.restore();\r
      }\r
\r
      rafId = requestAnimationFrame(draw);\r
    };\r
\r
    draw();\r
    return () => cancelAnimationFrame(rafId);\r
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);\r
\r
  useEffect(() => {\r
    buildGrid();\r
    let ro: ResizeObserver | null = null;\r
    if ('ResizeObserver' in window) {\r
      ro = new ResizeObserver(buildGrid);\r
      wrapperRef.current && ro.observe(wrapperRef.current);\r
    } else {\r
      (window as Window).addEventListener('resize', buildGrid);\r
    }\r
    return () => {\r
      if (ro) ro.disconnect();\r
      else window.removeEventListener('resize', buildGrid);\r
    };\r
  }, [buildGrid]);\r
\r
  useEffect(() => {\r
    const onMove = (e: MouseEvent) => {\r
      const now = performance.now();\r
      const pr = pointerRef.current;\r
      const dt = pr.lastTime ? now - pr.lastTime : 16;\r
      const dx = e.clientX - pr.lastX;\r
      const dy = e.clientY - pr.lastY;\r
      let vx = (dx / dt) * 1000;\r
      let vy = (dy / dt) * 1000;\r
      let speed = Math.hypot(vx, vy);\r
      if (speed > maxSpeed) {\r
        const scale = maxSpeed / speed;\r
        vx *= scale;\r
        vy *= scale;\r
        speed = maxSpeed;\r
      }\r
      pr.lastTime = now;\r
      pr.lastX = e.clientX;\r
      pr.lastY = e.clientY;\r
      pr.vx = vx;\r
      pr.vy = vy;\r
      pr.speed = speed;\r
\r
      const rect = canvasRef.current!.getBoundingClientRect();\r
      pr.x = e.clientX - rect.left;\r
      pr.y = e.clientY - rect.top;\r
\r
      for (const dot of dotsRef.current) {\r
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);\r
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {\r
          dot._inertiaApplied = true;\r
          gsap.killTweensOf(dot);\r
          const pushX = dot.cx - pr.x + vx * 0.005;\r
          const pushY = dot.cy - pr.y + vy * 0.005;\r
          gsap.to(dot, {\r
            inertia: { xOffset: pushX, yOffset: pushY, resistance },\r
            onComplete: () => {\r
              gsap.to(dot, {\r
                xOffset: 0,\r
                yOffset: 0,\r
                duration: returnDuration,\r
                ease: 'elastic.out(1,0.75)'\r
              });\r
              dot._inertiaApplied = false;\r
            }\r
          });\r
        }\r
      }\r
    };\r
\r
    const onClick = (e: MouseEvent) => {\r
      const rect = canvasRef.current!.getBoundingClientRect();\r
      const cx = e.clientX - rect.left;\r
      const cy = e.clientY - rect.top;\r
      for (const dot of dotsRef.current) {\r
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);\r
        if (dist < shockRadius && !dot._inertiaApplied) {\r
          dot._inertiaApplied = true;\r
          gsap.killTweensOf(dot);\r
          const falloff = Math.max(0, 1 - dist / shockRadius);\r
          const pushX = (dot.cx - cx) * shockStrength * falloff;\r
          const pushY = (dot.cy - cy) * shockStrength * falloff;\r
          gsap.to(dot, {\r
            inertia: { xOffset: pushX, yOffset: pushY, resistance },\r
            onComplete: () => {\r
              gsap.to(dot, {\r
                xOffset: 0,\r
                yOffset: 0,\r
                duration: returnDuration,\r
                ease: 'elastic.out(1,0.75)'\r
              });\r
              dot._inertiaApplied = false;\r
            }\r
          });\r
        }\r
      }\r
    };\r
\r
    const throttledMove = throttle(onMove, 50);\r
    window.addEventListener('mousemove', throttledMove, { passive: true });\r
    window.addEventListener('click', onClick);\r
\r
    return () => {\r
      window.removeEventListener('mousemove', throttledMove);\r
      window.removeEventListener('click', onClick);\r
    };\r
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);\r
\r
  return (\r
    <section className={\`p-4 flex items-center justify-center h-full w-full relative \${className}\`} style={style}>\r
      <div ref={wrapperRef} className="w-full h-full relative">\r
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />\r
      </div>\r
    </section>\r
  );\r
};\r
\r
export default DotGrid;\r
`,tr={dependencies:"gsap",usage:`import DotGrid from './DotGrid';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <DotGrid
    dotSize={10}
    gap={15}
    baseColor="#5227FF"
    activeColor="#5227FF"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  />
</div>`,code:Qn,css:Zn,tailwind:nr,tsCode:rr,tsTailwind:er};/*!
 * VelocityTracker: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var F,on,U,Sn,B,H,cn,Mn,On=function(){return F||typeof window<"u"&&(F=window.gsap)},an={},sr=function(n){return Math.round(n*1e4)/1e4},ln=function(n){return Mn(n).id},V=function(n){return an[ln(typeof n=="string"?U(n)[0]:n)]},yn=function(n){var r=B,e;if(n-cn>=.05)for(cn=n;r;)e=r.g(r.t,r.p),(e!==r.v1||n-r.t1>.2)&&(r.v2=r.v1,r.v1=e,r.t2=r.t1,r.t1=n),r=r._next},or={deg:360,rad:Math.PI*2},sn=function(){F=On(),F&&(U=F.utils.toArray,Sn=F.utils.getUnit,Mn=F.core.getCache,H=F.ticker,on=1)},ir=function(n,r,e,t){this.t=n,this.p=r,this.g=n._gsap.get,this.rCap=or[e||Sn(this.g(n,r))],this.v1=this.v2=0,this.t1=this.t2=H.time,t&&(this._next=t,t._prev=this)},Z=function(){function s(r,e){on||sn(),this.target=U(r)[0],an[ln(this.target)]=this,this._props={},e&&this.add(e)}s.register=function(e){F=e,sn()};var n=s.prototype;return n.get=function(e,t){var i=this._props[e]||console.warn("Not tracking "+e+" velocity."),p,a,c;return p=parseFloat(t?i.v1:i.g(i.t,i.p)),a=p-parseFloat(i.v2),c=i.rCap,c&&(a=a%c,a!==a%(c/2)&&(a=a<0?a+c:a-c)),sr(a/((t?i.t1:H.time)-i.t2))},n.getAll=function(){var e={},t=this._props,i;for(i in t)e[i]=this.get(i);return e},n.isTracking=function(e){return e in this._props},n.add=function(e,t){e in this._props||(B||(H.add(yn),cn=H.time),B=this._props[e]=new ir(this.target,e,t,B))},n.remove=function(e){var t=this._props[e],i,p;t&&(i=t._prev,p=t._next,i&&(i._next=p),p?p._prev=i:B===t&&(H.remove(yn),B=0),delete this._props[e])},n.kill=function(e){for(var t in this._props)this.remove(t);e||delete an[ln(this.target)]},s.track=function(e,t,i){on||sn();for(var p=[],a=U(e),c=t.split(","),o=(i||"").split(","),f=a.length,v,u;f--;){for(v=V(a[f])||new s(a[f]),u=c.length;u--;)v.add(c[u],o[u]||o[0]);p.push(v)}return p},s.untrack=function(e,t){var i=(t||"").split(",");U(e).forEach(function(p){var a=V(p);a&&(i.length?i.forEach(function(c){return a.remove(c)}):a.kill(1))})},s.isTracking=function(e,t){var i=V(e);return i&&i.isTracking(t)},s.getVelocity=function(e,t){var i=V(e);return!i||!i.isTracking(t)?console.warn("Not tracking velocity of "+t):i.get(t)},s}();Z.getByTarget=V;On()&&F.registerPlugin(Z);/*!
 * InertiaPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var k,Tn,wn,Pn,dn,J,En,Xn,Yn,un,An,K,pn,zn,rn=Z.getByTarget,Dn=function(){return k||typeof window<"u"&&(k=window.gsap)&&k.registerPlugin&&k},cr=function(n){return typeof n=="string"},Q=function(n){return typeof n=="number"},G=function(n){return typeof n=="object"},fn=function(n){return typeof n=="function"},ar=1,Fn=Array.isArray,lr=function(n){return n},q=1e10,bn=1/q,In=.05,dr=function(n){return Math.round(n*1e4)/1e4},pr=function(n,r,e){for(var t in r)!(t in n)&&t!==e&&(n[t]=r[t]);return n},fr=function s(n){var r={},e,t;for(e in n)r[e]=G(t=n[e])&&!Fn(t)?s(t):t;return r},Rn=function(n,r,e,t,i){var p=r.length,a=0,c=q,o,f,v,u;if(G(n)){for(;p--;){o=r[p],f=0;for(v in n)u=o[v]-n[v],f+=u*u;f<c&&(a=p,c=f)}if((i||q)<q&&i<Math.sqrt(c))return n}else for(;p--;)o=r[p],f=o-n,f<0&&(f=-f),f<c&&o>=t&&o<=e&&(a=p,c=f);return r[a]},Gn=function(n,r,e,t,i,p,a){if(n.end==="auto")return n;var c=n.end,o,f;if(e=isNaN(e)?q:e,t=isNaN(t)?-q:t,G(r)){if(o=r.calculated?r:(fn(c)?c(r,a):Rn(r,c,e,t,p))||r,!r.calculated){for(f in o)r[f]=o[f];r.calculated=!0}o=o[i]}else o=fn(c)?c(r,a):Fn(c)?Rn(r,c,e,t,p):parseFloat(c);return o>e?o=e:o<t&&(o=t),{max:o,min:o,unitFactor:n.unitFactor}},en=function(n,r,e){return isNaN(n[r])?e:+n[r]},hn=function(n,r){return r*In*n/un},Cn=function(n,r,e){return Math.abs((r-n)*un/e/In)},Nn={resistance:1,checkpoint:1,preventOvershoot:1,linkedProps:1,radius:1,duration:1},$n=function(n,r,e,t){if(r.linkedProps){var i=r.linkedProps.split(","),p={},a,c,o,f,v,u;for(a=0;a<i.length;a++)c=i[a],o=r[c],o&&(Q(o.velocity)?f=o.velocity:(v=v||rn(n),f=v&&v.isTracking(c)?v.get(c):0),u=Math.abs(f/en(o,"resistance",t)),p[c]=parseFloat(e(n,c))+hn(f,u));return p}},ur=function(n,r,e,t,i,p){if(e===void 0&&(e=10),t===void 0&&(t=.2),i===void 0&&(i=1),cr(n)&&(n=Pn(n)[0]),!n)return 0;var a=0,c=q,o=r.inertia||r,f=Yn(n).get,v=en(o,"resistance",J.resistance),u,d,h,l,w,O,R,g,T,m;m=$n(n,o,f,v);for(u in o)Nn[u]||(d=o[u],G(d)||(g=g||rn(n),g&&g.isTracking(u)?d=Q(d)?{velocity:d}:{velocity:g.get(u)}:(l=+d||0,h=Math.abs(l/v))),G(d)&&(Q(d.velocity)?l=d.velocity:(g=g||rn(n),l=g&&g.isTracking(u)?g.get(u):0),h=An(t,e,Math.abs(l/en(d,"resistance",v))),w=parseFloat(f(n,u))||0,O=w+hn(l,h),"end"in d&&(d=Gn(d,m&&u in m?m:O,d.max,d.min,u,o.radius,l),K===r&&(K=o=fr(r)),o[u]=pr(d,o[u],"end")),"max"in d&&O>+d.max+bn?(T=d.unitFactor||J.unitFactors[u]||1,R=w>d.max&&d.min!==d.max||l*T>-15&&l*T<45?t+(e-t)*.1:Cn(w,d.max,l),R+i<c&&(c=R+i)):"min"in d&&O<+d.min-bn&&(T=d.unitFactor||J.unitFactors[u]||1,R=w<d.min&&d.min!==d.max||l*T>-45&&l*T<15?t+(e-t)*.1:Cn(w,d.min,l),R+i<c&&(c=R+i)),R>a&&(a=R)),h>a&&(a=h));return a>c&&(a=c),a>e?e:a<t?t:a},_n=function(){k=Dn(),k&&(wn=k.parseEase,Pn=k.utils.toArray,En=k.utils.getUnit,Yn=k.core.getCache,An=k.utils.clamp,pn=k.core.getStyleSaver,zn=k.core.reverting||function(){},dn=wn("power3"),un=dn(.05),Xn=k.core.PropTween,k.config({resistance:100,unitFactors:{time:1e3,totalTime:1e3,progress:1e3,totalProgress:1e3}}),J=k.config(),k.registerPlugin(Z),Tn=1)},gn={version:"3.13.0",name:"inertia",register:function(n){k=n,_n()},init:function(n,r,e,t,i){Tn||_n();var p=rn(n);if(r==="auto"){if(!p){console.warn("No inertia tracking on "+n+". InertiaPlugin.track(target) first.");return}r=p.getAll()}this.styles=pn&&typeof n.style=="object"&&pn(n),this.target=n,this.tween=e,K=r;var a=n._gsap,c=a.get,o=r.duration,f=G(o),v=r.preventOvershoot||f&&o.overshoot===0,u=en(r,"resistance",J.resistance),d=Q(o)?o:ur(n,r,f&&o.max||10,f&&o.min||.2,f&&"overshoot"in o?+o.overshoot:v?0:1),h,l,w,O,R,g,T,m,P;r=K,K=0,P=$n(n,r,c,u);for(h in r)Nn[h]||(l=r[h],fn(l)&&(l=l(t,n,i)),Q(l)?R=l:G(l)&&!isNaN(l.velocity)?R=+l.velocity:p&&p.isTracking(h)?R=p.get(h):console.warn("ERROR: No velocity was defined for "+n+" property: "+h),g=hn(R,d),m=0,w=c(n,h),O=En(w),w=parseFloat(w),G(l)&&(T=w+g,"end"in l&&(l=Gn(l,P&&h in P?P:T,l.max,l.min,h,r.radius,R)),"max"in l&&+l.max<T?v||l.preventOvershoot?g=l.max-w:m=l.max-w-g:"min"in l&&+l.min>T&&(v||l.preventOvershoot?g=l.min-w:m=l.min-w-g)),this._props.push(h),this.styles&&this.styles.save(h),this._pt=new Xn(this._pt,n,h,w,0,lr,0,a.set(n,h,this)),this._pt.u=O||0,this._pt.c1=g,this._pt.c2=m);return e.duration(d),ar},render:function(n,r){var e=r._pt;if(n=dn(r.tween._time/r.tween._dur),n||!zn())for(;e;)e.set(e.t,e.p,dr(e.s+e.c1*n+e.c2*n*n)+e.u,e.d,n),e=e._next;else r.styles.revert()}};"track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(s){return gn[s]=Z[s]});Dn()&&k.registerPlugin(gn);j.registerPlugin(gn);const hr=(s,n)=>{let r=0;return function(...e){const t=performance.now();t-r>=n&&(r=t,s.apply(this,e))}};function kn(s){const n=s.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:{r:0,g:0,b:0}}const gr=({dotSize:s=16,gap:n=32,baseColor:r="#5227FF",activeColor:e="#5227FF",proximity:t=150,speedTrigger:i=100,shockRadius:p=250,shockStrength:a=5,maxSpeed:c=5e3,resistance:o=750,returnDuration:f=1.5,className:v="",style:u})=>{const d=C.useRef(null),h=C.useRef(null),l=C.useRef([]),w=C.useRef({x:0,y:0,vx:0,vy:0,speed:0,lastTime:0,lastX:0,lastY:0}),O=C.useMemo(()=>kn(r),[r]),R=C.useMemo(()=>kn(e),[e]),g=C.useMemo(()=>{if(typeof window>"u"||!window.Path2D)return null;const m=new window.Path2D;return m.arc(0,0,s/2,0,Math.PI*2),m},[s]),T=C.useCallback(()=>{const m=d.current,P=h.current;if(!m||!P)return;const{width:z,height:_}=m.getBoundingClientRect(),S=window.devicePixelRatio||1;P.width=z*S,P.height=_*S,P.style.width=`${z}px`,P.style.height=`${_}px`;const y=P.getContext("2d");y&&y.scale(S,S);const D=Math.floor((z+n)/(s+n)),b=Math.floor((_+n)/(s+n)),X=s+n,Y=X*D-n,A=X*b-n,E=z-Y,N=_-A,M=E/2+s/2,nn=N/2+s/2,I=[];for(let $=0;$<b;$++)for(let W=0;W<D;W++){const tn=M+W*X,Ln=nn+$*X;I.push({cx:tn,cy:Ln,xOffset:0,yOffset:0,_inertiaApplied:!1})}l.current=I},[s,n]);return C.useEffect(()=>{if(!g)return;let m;const P=t*t,z=()=>{const _=h.current;if(!_)return;const S=_.getContext("2d");if(!S)return;S.clearRect(0,0,_.width,_.height);const{x:y,y:D}=w.current;for(const b of l.current){const X=b.cx+b.xOffset,Y=b.cy+b.yOffset,A=b.cx-y,E=b.cy-D,N=A*A+E*E;let M=r;if(N<=P){const I=1-Math.sqrt(N)/t,$=Math.round(O.r+(R.r-O.r)*I),W=Math.round(O.g+(R.g-O.g)*I),tn=Math.round(O.b+(R.b-O.b)*I);M=`rgb(${$},${W},${tn})`}S.save(),S.translate(X,Y),S.fillStyle=M,S.fill(g),S.restore()}m=requestAnimationFrame(z)};return z(),()=>cancelAnimationFrame(m)},[t,r,R,O,g]),C.useEffect(()=>{T();let m=null;return"ResizeObserver"in window?(m=new ResizeObserver(T),d.current&&m.observe(d.current)):window.addEventListener("resize",T),()=>{m?m.disconnect():window.removeEventListener("resize",T)}},[T]),C.useEffect(()=>{const m=_=>{const S=performance.now(),y=w.current,D=y.lastTime?S-y.lastTime:16,b=_.clientX-y.lastX,X=_.clientY-y.lastY;let Y=b/D*1e3,A=X/D*1e3,E=Math.hypot(Y,A);if(E>c){const M=c/E;Y*=M,A*=M,E=c}y.lastTime=S,y.lastX=_.clientX,y.lastY=_.clientY,y.vx=Y,y.vy=A,y.speed=E;const N=h.current.getBoundingClientRect();y.x=_.clientX-N.left,y.y=_.clientY-N.top;for(const M of l.current){const nn=Math.hypot(M.cx-y.x,M.cy-y.y);if(E>i&&nn<t&&!M._inertiaApplied){M._inertiaApplied=!0,j.killTweensOf(M);const I=M.cx-y.x+Y*.005,$=M.cy-y.y+A*.005;j.to(M,{inertia:{xOffset:I,yOffset:$,resistance:o},onComplete:()=>{j.to(M,{xOffset:0,yOffset:0,duration:f,ease:"elastic.out(1,0.75)"}),M._inertiaApplied=!1}})}}},P=_=>{const S=h.current.getBoundingClientRect(),y=_.clientX-S.left,D=_.clientY-S.top;for(const b of l.current){const X=Math.hypot(b.cx-y,b.cy-D);if(X<p&&!b._inertiaApplied){b._inertiaApplied=!0,j.killTweensOf(b);const Y=Math.max(0,1-X/p),A=(b.cx-y)*a*Y,E=(b.cy-D)*a*Y;j.to(b,{inertia:{xOffset:A,yOffset:E,resistance:o},onComplete:()=>{j.to(b,{xOffset:0,yOffset:0,duration:f,ease:"elastic.out(1,0.75)"}),b._inertiaApplied=!1}})}}},z=hr(m,50);return window.addEventListener("mousemove",z,{passive:!0}),window.addEventListener("click",P),()=>{window.removeEventListener("mousemove",z),window.removeEventListener("click",P)}},[c,i,t,o,f,p,a]),x.jsx("section",{className:`dot-grid ${v}`,style:u,children:x.jsx("div",{ref:d,className:"dot-grid__wrap",children:x.jsx("canvas",{ref:h,className:"dot-grid__canvas"})})})},_r=()=>{const[s,n]=C.useState(5),[r,e]=C.useState(15),[t,i]=C.useState("#271E37"),[p,a]=C.useState("#5227FF"),[c,o]=C.useState(120),[f,v]=C.useState(250),[u,d]=C.useState(5),[h,l]=C.useState(750),[w,O]=C.useState(1.5),R=[{name:"dotSize",type:"number",default:"16",description:"Size of each dot in pixels."},{name:"gap",type:"number",default:"32",description:"Gap between each dot in pixels."},{name:"baseColor",type:"string",default:"'#5227FF'",description:"Base color of the dots."},{name:"activeColor",type:"string",default:"'#5227FF'",description:"Color of dots when hovered or activated."},{name:"proximity",type:"number",default:"150",description:"Radius around the mouse pointer within which dots react."},{name:"speedTrigger",type:"number",default:"100",description:"Mouse speed threshold to trigger inertia effect."},{name:"shockRadius",type:"number",default:"250",description:"Radius of the shockwave effect on click."},{name:"shockStrength",type:"number",default:"5",description:"Strength of the shockwave effect on click."},{name:"maxSpeed",type:"number",default:"5000",description:"Maximum speed for inertia calculation."},{name:"resistance",type:"number",default:"750",description:"Resistance for the inertia effect."},{name:"returnDuration",type:"number",default:"1.5",description:"Duration for dots to return to their original position after inertia."},{name:"className",type:"string",default:"''",description:"Additional CSS classes for the component."},{name:"style",type:"React.CSSProperties",default:"{}",description:"Inline styles for the component."}];return x.jsxs(qn,{children:[x.jsxs(Bn,{children:[x.jsxs(jn,{position:"relative",className:"demo-container",h:600,overflow:"hidden",children:[x.jsx(gr,{dotSize:s,gap:r,baseColor:t,activeColor:p,proximity:c,shockRadius:f,shockStrength:u,resistance:h,returnDuration:w}),x.jsx(Kn,{pillText:"New Background",headline:"Organized chaos with every cursor movement!"})]}),x.jsxs(Un,{children:[x.jsxs(xn,{alignItems:"center",mb:4,children:[x.jsx(vn,{fontSize:"sm",mr:2,children:"Base Color"}),x.jsx(mn,{type:"color",value:t,onChange:g=>{i(g.target.value)},width:"50px"})]}),x.jsxs(xn,{alignItems:"center",mb:4,children:[x.jsx(vn,{fontSize:"sm",mr:2,children:"Active Color"}),x.jsx(mn,{type:"color",value:p,onChange:g=>{a(g.target.value)},width:"50px"})]}),x.jsx(L,{title:"Dot Size",min:2,max:50,step:1,value:s,onChange:n}),x.jsx(L,{title:"Gap",min:5,max:100,step:1,value:r,onChange:e}),x.jsx(L,{title:"Proximity",min:50,max:500,step:10,value:c,onChange:o}),x.jsx(L,{title:"Shock Radius",min:50,max:500,step:10,value:f,onChange:v}),x.jsx(L,{title:"Shock Strength",min:1,max:20,step:1,value:u,onChange:d}),x.jsx(L,{title:"Resistance (Inertia)",min:100,max:2e3,step:50,value:h,onChange:l}),x.jsx(L,{title:"Return Duration (Inertia)",min:.1,max:5,step:.1,value:w,onChange:O})]}),x.jsx(Hn,{data:R}),x.jsx(Jn,{dependencyList:["gsap"]})]}),x.jsx(Wn,{children:x.jsx(Vn,{codeObject:tr})})]})};export{_r as default};
