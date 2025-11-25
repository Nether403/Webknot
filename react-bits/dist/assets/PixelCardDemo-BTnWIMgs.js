import{r as a,j as r,B as G,F as H,T as $}from"./index-wsKSLPNH.js";import{T as D,P as J,a as X,C as W,b as Y}from"./PropTable-C4uPWs8h.js";import{C as K}from"./Customize-1m_ZNqR9.js";import{P as Q}from"./PreviewSelect-B8u33nUa.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const U=`import { useEffect, useRef } from 'react';\r
import './PixelCard.css';\r
\r
class Pixel {\r
  constructor(canvas, context, x, y, color, speed, delay) {\r
    this.width = canvas.width;\r
    this.height = canvas.height;\r
    this.ctx = context;\r
    this.x = x;\r
    this.y = y;\r
    this.color = color;\r
    this.speed = this.getRandomValue(0.1, 0.9) * speed;\r
    this.size = 0;\r
    this.sizeStep = Math.random() * 0.4;\r
    this.minSize = 0.5;\r
    this.maxSizeInteger = 2;\r
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);\r
    this.delay = delay;\r
    this.counter = 0;\r
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;\r
    this.isIdle = false;\r
    this.isReverse = false;\r
    this.isShimmer = false;\r
  }\r
\r
  getRandomValue(min, max) {\r
    return Math.random() * (max - min) + min;\r
  }\r
\r
  draw() {\r
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;\r
    this.ctx.fillStyle = this.color;\r
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);\r
  }\r
\r
  appear() {\r
    this.isIdle = false;\r
    if (this.counter <= this.delay) {\r
      this.counter += this.counterStep;\r
      return;\r
    }\r
    if (this.size >= this.maxSize) {\r
      this.isShimmer = true;\r
    }\r
    if (this.isShimmer) {\r
      this.shimmer();\r
    } else {\r
      this.size += this.sizeStep;\r
    }\r
    this.draw();\r
  }\r
\r
  disappear() {\r
    this.isShimmer = false;\r
    this.counter = 0;\r
    if (this.size <= 0) {\r
      this.isIdle = true;\r
      return;\r
    } else {\r
      this.size -= 0.1;\r
    }\r
    this.draw();\r
  }\r
\r
  shimmer() {\r
    if (this.size >= this.maxSize) {\r
      this.isReverse = true;\r
    } else if (this.size <= this.minSize) {\r
      this.isReverse = false;\r
    }\r
    if (this.isReverse) {\r
      this.size -= this.speed;\r
    } else {\r
      this.size += this.speed;\r
    }\r
  }\r
}\r
\r
function getEffectiveSpeed(value, reducedMotion) {\r
  const min = 0;\r
  const max = 100;\r
  const throttle = 0.001;\r
  const parsed = parseInt(value, 10);\r
\r
  if (parsed <= min || reducedMotion) {\r
    return min;\r
  } else if (parsed >= max) {\r
    return max * throttle;\r
  } else {\r
    return parsed * throttle;\r
  }\r
}\r
\r
const VARIANTS = {\r
  default: {\r
    activeColor: null,\r
    gap: 5,\r
    speed: 35,\r
    colors: '#f8fafc,#f1f5f9,#cbd5e1',\r
    noFocus: false\r
  },\r
  blue: {\r
    activeColor: '#e0f2fe',\r
    gap: 10,\r
    speed: 25,\r
    colors: '#e0f2fe,#7dd3fc,#0ea5e9',\r
    noFocus: false\r
  },\r
  yellow: {\r
    activeColor: '#fef08a',\r
    gap: 3,\r
    speed: 20,\r
    colors: '#fef08a,#fde047,#eab308',\r
    noFocus: false\r
  },\r
  pink: {\r
    activeColor: '#fecdd3',\r
    gap: 6,\r
    speed: 80,\r
    colors: '#fecdd3,#fda4af,#e11d48',\r
    noFocus: true\r
  }\r
};\r
\r
export default function PixelCard({ variant = 'default', gap, speed, colors, noFocus, className = '', children }) {\r
  const containerRef = useRef(null);\r
  const canvasRef = useRef(null);\r
  const pixelsRef = useRef([]);\r
  const animationRef = useRef(null);\r
  const timePreviousRef = useRef(performance.now());\r
  const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;\r
\r
  const variantCfg = VARIANTS[variant] || VARIANTS.default;\r
  const finalGap = gap ?? variantCfg.gap;\r
  const finalSpeed = speed ?? variantCfg.speed;\r
  const finalColors = colors ?? variantCfg.colors;\r
  const finalNoFocus = noFocus ?? variantCfg.noFocus;\r
\r
  const initPixels = () => {\r
    if (!containerRef.current || !canvasRef.current) return;\r
\r
    const rect = containerRef.current.getBoundingClientRect();\r
    const width = Math.floor(rect.width);\r
    const height = Math.floor(rect.height);\r
    const ctx = canvasRef.current.getContext('2d');\r
\r
    canvasRef.current.width = width;\r
    canvasRef.current.height = height;\r
    canvasRef.current.style.width = \`\${width}px\`;\r
    canvasRef.current.style.height = \`\${height}px\`;\r
\r
    const colorsArray = finalColors.split(',');\r
    const pxs = [];\r
    for (let x = 0; x < width; x += parseInt(finalGap, 10)) {\r
      for (let y = 0; y < height; y += parseInt(finalGap, 10)) {\r
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];\r
\r
        const dx = x - width / 2;\r
        const dy = y - height / 2;\r
        const distance = Math.sqrt(dx * dx + dy * dy);\r
        const delay = reducedMotion ? 0 : distance;\r
\r
        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay));\r
      }\r
    }\r
    pixelsRef.current = pxs;\r
  };\r
\r
  const doAnimate = fnName => {\r
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));\r
    const timeNow = performance.now();\r
    const timePassed = timeNow - timePreviousRef.current;\r
    const timeInterval = 1000 / 60;\r
\r
    if (timePassed < timeInterval) return;\r
    timePreviousRef.current = timeNow - (timePassed % timeInterval);\r
\r
    const ctx = canvasRef.current?.getContext('2d');\r
    if (!ctx || !canvasRef.current) return;\r
\r
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);\r
\r
    let allIdle = true;\r
    for (let i = 0; i < pixelsRef.current.length; i++) {\r
      const pixel = pixelsRef.current[i];\r
      pixel[fnName]();\r
      if (!pixel.isIdle) {\r
        allIdle = false;\r
      }\r
    }\r
    if (allIdle) {\r
      cancelAnimationFrame(animationRef.current);\r
    }\r
  };\r
\r
  const handleAnimation = name => {\r
    cancelAnimationFrame(animationRef.current);\r
    animationRef.current = requestAnimationFrame(() => doAnimate(name));\r
  };\r
\r
  const onMouseEnter = () => handleAnimation('appear');\r
  const onMouseLeave = () => handleAnimation('disappear');\r
  const onFocus = e => {\r
    if (e.currentTarget.contains(e.relatedTarget)) return;\r
    handleAnimation('appear');\r
  };\r
  const onBlur = e => {\r
    if (e.currentTarget.contains(e.relatedTarget)) return;\r
    handleAnimation('disappear');\r
  };\r
\r
  useEffect(() => {\r
    initPixels();\r
    const observer = new ResizeObserver(() => {\r
      initPixels();\r
    });\r
    if (containerRef.current) {\r
      observer.observe(containerRef.current);\r
    }\r
    return () => {\r
      observer.disconnect();\r
      cancelAnimationFrame(animationRef.current);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [finalGap, finalSpeed, finalColors, finalNoFocus]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`pixel-card \${className}\`}\r
      onMouseEnter={onMouseEnter}\r
      onMouseLeave={onMouseLeave}\r
      onFocus={finalNoFocus ? undefined : onFocus}\r
      onBlur={finalNoFocus ? undefined : onBlur}\r
      tabIndex={finalNoFocus ? -1 : 0}\r
    >\r
      <canvas className="pixel-canvas" ref={canvasRef} />\r
      {children}\r
    </div>\r
  );\r
}\r
`,Z=`.pixel-canvas {\r
  width: 100%;\r
  height: 100%;\r
  display: block;\r
}\r
\r
.pixel-card {\r
  height: 400px;\r
  width: 300px;\r
  position: relative;\r
  overflow: hidden;\r
  display: grid;\r
  place-items: center;\r
  aspect-ratio: 4 / 5;\r
  border: 1px solid #27272a;\r
  border-radius: 25px;\r
  isolation: isolate;\r
  transition: border-color 200ms cubic-bezier(0.5, 1, 0.89, 1);\r
  user-select: none;\r
}\r
\r
.pixel-card::before {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  margin: auto;\r
  aspect-ratio: 1;\r
  background: radial-gradient(circle, #09090b, transparent 85%);\r
  opacity: 0;\r
  transition: opacity 800ms cubic-bezier(0.5, 1, 0.89, 1);\r
}\r
\r
.pixel-card:hover::before,\r
.pixel-card:focus-within::before {\r
  opacity: 1;\r
}\r
`,_=`import { useEffect, useRef } from 'react';\r
\r
class Pixel {\r
  constructor(canvas, context, x, y, color, speed, delay) {\r
    this.width = canvas.width;\r
    this.height = canvas.height;\r
    this.ctx = context;\r
    this.x = x;\r
    this.y = y;\r
    this.color = color;\r
    this.speed = this.getRandomValue(0.1, 0.9) * speed;\r
    this.size = 0;\r
    this.sizeStep = Math.random() * 0.4;\r
    this.minSize = 0.5;\r
    this.maxSizeInteger = 2;\r
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);\r
    this.delay = delay;\r
    this.counter = 0;\r
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;\r
    this.isIdle = false;\r
    this.isReverse = false;\r
    this.isShimmer = false;\r
  }\r
\r
  getRandomValue(min, max) {\r
    return Math.random() * (max - min) + min;\r
  }\r
\r
  draw() {\r
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;\r
    this.ctx.fillStyle = this.color;\r
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);\r
  }\r
\r
  appear() {\r
    this.isIdle = false;\r
    if (this.counter <= this.delay) {\r
      this.counter += this.counterStep;\r
      return;\r
    }\r
    if (this.size >= this.maxSize) {\r
      this.isShimmer = true;\r
    }\r
    if (this.isShimmer) {\r
      this.shimmer();\r
    } else {\r
      this.size += this.sizeStep;\r
    }\r
    this.draw();\r
  }\r
\r
  disappear() {\r
    this.isShimmer = false;\r
    this.counter = 0;\r
    if (this.size <= 0) {\r
      this.isIdle = true;\r
      return;\r
    } else {\r
      this.size -= 0.1;\r
    }\r
    this.draw();\r
  }\r
\r
  shimmer() {\r
    if (this.size >= this.maxSize) {\r
      this.isReverse = true;\r
    } else if (this.size <= this.minSize) {\r
      this.isReverse = false;\r
    }\r
    if (this.isReverse) {\r
      this.size -= this.speed;\r
    } else {\r
      this.size += this.speed;\r
    }\r
  }\r
}\r
\r
function getEffectiveSpeed(value, reducedMotion) {\r
  const min = 0;\r
  const max = 100;\r
  const throttle = 0.001;\r
  const parsed = parseInt(value, 10);\r
\r
  if (parsed <= min || reducedMotion) {\r
    return min;\r
  } else if (parsed >= max) {\r
    return max * throttle;\r
  } else {\r
    return parsed * throttle;\r
  }\r
}\r
\r
const VARIANTS = {\r
  default: {\r
    activeColor: null,\r
    gap: 5,\r
    speed: 35,\r
    colors: '#f8fafc,#f1f5f9,#cbd5e1',\r
    noFocus: false\r
  },\r
  blue: {\r
    activeColor: '#e0f2fe',\r
    gap: 10,\r
    speed: 25,\r
    colors: '#e0f2fe,#7dd3fc,#0ea5e9',\r
    noFocus: false\r
  },\r
  yellow: {\r
    activeColor: '#fef08a',\r
    gap: 3,\r
    speed: 20,\r
    colors: '#fef08a,#fde047,#eab308',\r
    noFocus: false\r
  },\r
  pink: {\r
    activeColor: '#fecdd3',\r
    gap: 6,\r
    speed: 80,\r
    colors: '#fecdd3,#fda4af,#e11d48',\r
    noFocus: true\r
  }\r
};\r
\r
export default function PixelCard({ variant = 'default', gap, speed, colors, noFocus, className = '', children }) {\r
  const containerRef = useRef(null);\r
  const canvasRef = useRef(null);\r
  const pixelsRef = useRef([]);\r
  const animationRef = useRef(null);\r
  const timePreviousRef = useRef(performance.now());\r
  const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;\r
\r
  const variantCfg = VARIANTS[variant] || VARIANTS.default;\r
  const finalGap = gap ?? variantCfg.gap;\r
  const finalSpeed = speed ?? variantCfg.speed;\r
  const finalColors = colors ?? variantCfg.colors;\r
  const finalNoFocus = noFocus ?? variantCfg.noFocus;\r
\r
  const initPixels = () => {\r
    if (!containerRef.current || !canvasRef.current) return;\r
\r
    const rect = containerRef.current.getBoundingClientRect();\r
    const width = Math.floor(rect.width);\r
    const height = Math.floor(rect.height);\r
    const ctx = canvasRef.current.getContext('2d');\r
\r
    canvasRef.current.width = width;\r
    canvasRef.current.height = height;\r
    canvasRef.current.style.width = \`\${width}px\`;\r
    canvasRef.current.style.height = \`\${height}px\`;\r
\r
    const colorsArray = finalColors.split(',');\r
    const pxs = [];\r
    for (let x = 0; x < width; x += parseInt(finalGap, 10)) {\r
      for (let y = 0; y < height; y += parseInt(finalGap, 10)) {\r
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];\r
\r
        const dx = x - width / 2;\r
        const dy = y - height / 2;\r
        const distance = Math.sqrt(dx * dx + dy * dy);\r
        const delay = reducedMotion ? 0 : distance;\r
\r
        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay));\r
      }\r
    }\r
    pixelsRef.current = pxs;\r
  };\r
\r
  const doAnimate = fnName => {\r
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));\r
    const timeNow = performance.now();\r
    const timePassed = timeNow - timePreviousRef.current;\r
    const timeInterval = 1000 / 60;\r
\r
    if (timePassed < timeInterval) return;\r
    timePreviousRef.current = timeNow - (timePassed % timeInterval);\r
\r
    const ctx = canvasRef.current?.getContext('2d');\r
    if (!ctx || !canvasRef.current) return;\r
\r
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);\r
\r
    let allIdle = true;\r
    for (let i = 0; i < pixelsRef.current.length; i++) {\r
      const pixel = pixelsRef.current[i];\r
      pixel[fnName]();\r
      if (!pixel.isIdle) {\r
        allIdle = false;\r
      }\r
    }\r
    if (allIdle) {\r
      cancelAnimationFrame(animationRef.current);\r
    }\r
  };\r
\r
  const handleAnimation = name => {\r
    cancelAnimationFrame(animationRef.current);\r
    animationRef.current = requestAnimationFrame(() => doAnimate(name));\r
  };\r
\r
  const onMouseEnter = () => handleAnimation('appear');\r
  const onMouseLeave = () => handleAnimation('disappear');\r
  const onFocus = e => {\r
    if (e.currentTarget.contains(e.relatedTarget)) return;\r
    handleAnimation('appear');\r
  };\r
  const onBlur = e => {\r
    if (e.currentTarget.contains(e.relatedTarget)) return;\r
    handleAnimation('disappear');\r
  };\r
\r
  useEffect(() => {\r
    initPixels();\r
    const observer = new ResizeObserver(() => {\r
      initPixels();\r
    });\r
    if (containerRef.current) {\r
      observer.observe(containerRef.current);\r
    }\r
    return () => {\r
      observer.disconnect();\r
      cancelAnimationFrame(animationRef.current);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [finalGap, finalSpeed, finalColors, finalNoFocus]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`h-[400px] w-[300px] relative overflow-hidden grid place-items-center aspect-[4/5] border border-[#27272a] rounded-[25px] isolate transition-colors duration-200 ease-[cubic-bezier(0.5,1,0.89,1)] select-none \${className}\`}\r
      onMouseEnter={onMouseEnter}\r
      onMouseLeave={onMouseLeave}\r
      onFocus={finalNoFocus ? undefined : onFocus}\r
      onBlur={finalNoFocus ? undefined : onBlur}\r
      tabIndex={finalNoFocus ? -1 : 0}\r
    >\r
      <canvas className="w-full h-full block" ref={canvasRef} />\r
      {children}\r
    </div>\r
  );\r
}\r
`,nn=`import { useEffect, useRef } from 'react';\r
import { JSX } from 'react';\r
import './PixelCard.css';\r
\r
class Pixel {\r
  width: number;\r
  height: number;\r
  ctx: CanvasRenderingContext2D;\r
  x: number;\r
  y: number;\r
  color: string;\r
  speed: number;\r
  size: number;\r
  sizeStep: number;\r
  minSize: number;\r
  maxSizeInteger: number;\r
  maxSize: number;\r
  delay: number;\r
  counter: number;\r
  counterStep: number;\r
  isIdle: boolean;\r
  isReverse: boolean;\r
  isShimmer: boolean;\r
\r
  constructor(\r
    canvas: HTMLCanvasElement,\r
    context: CanvasRenderingContext2D,\r
    x: number,\r
    y: number,\r
    color: string,\r
    speed: number,\r
    delay: number\r
  ) {\r
    this.width = canvas.width;\r
    this.height = canvas.height;\r
    this.ctx = context;\r
    this.x = x;\r
    this.y = y;\r
    this.color = color;\r
    this.speed = this.getRandomValue(0.1, 0.9) * speed;\r
    this.size = 0;\r
    this.sizeStep = Math.random() * 0.4;\r
    this.minSize = 0.5;\r
    this.maxSizeInteger = 2;\r
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);\r
    this.delay = delay;\r
    this.counter = 0;\r
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;\r
    this.isIdle = false;\r
    this.isReverse = false;\r
    this.isShimmer = false;\r
  }\r
\r
  getRandomValue(min: number, max: number) {\r
    return Math.random() * (max - min) + min;\r
  }\r
\r
  draw() {\r
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;\r
    this.ctx.fillStyle = this.color;\r
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);\r
  }\r
\r
  appear() {\r
    this.isIdle = false;\r
    if (this.counter <= this.delay) {\r
      this.counter += this.counterStep;\r
      return;\r
    }\r
    if (this.size >= this.maxSize) {\r
      this.isShimmer = true;\r
    }\r
    if (this.isShimmer) {\r
      this.shimmer();\r
    } else {\r
      this.size += this.sizeStep;\r
    }\r
    this.draw();\r
  }\r
\r
  disappear() {\r
    this.isShimmer = false;\r
    this.counter = 0;\r
    if (this.size <= 0) {\r
      this.isIdle = true;\r
      return;\r
    } else {\r
      this.size -= 0.1;\r
    }\r
    this.draw();\r
  }\r
\r
  shimmer() {\r
    if (this.size >= this.maxSize) {\r
      this.isReverse = true;\r
    } else if (this.size <= this.minSize) {\r
      this.isReverse = false;\r
    }\r
    if (this.isReverse) {\r
      this.size -= this.speed;\r
    } else {\r
      this.size += this.speed;\r
    }\r
  }\r
}\r
\r
function getEffectiveSpeed(value: number, reducedMotion: boolean) {\r
  const min = 0;\r
  const max = 100;\r
  const throttle = 0.001;\r
\r
  if (value <= min || reducedMotion) {\r
    return min;\r
  } else if (value >= max) {\r
    return max * throttle;\r
  } else {\r
    return value * throttle;\r
  }\r
}\r
\r
const VARIANTS = {\r
  default: {\r
    activeColor: null,\r
    gap: 5,\r
    speed: 35,\r
    colors: '#f8fafc,#f1f5f9,#cbd5e1',\r
    noFocus: false\r
  },\r
  blue: {\r
    activeColor: '#e0f2fe',\r
    gap: 10,\r
    speed: 25,\r
    colors: '#e0f2fe,#7dd3fc,#0ea5e9',\r
    noFocus: false\r
  },\r
  yellow: {\r
    activeColor: '#fef08a',\r
    gap: 3,\r
    speed: 20,\r
    colors: '#fef08a,#fde047,#eab308',\r
    noFocus: false\r
  },\r
  pink: {\r
    activeColor: '#fecdd3',\r
    gap: 6,\r
    speed: 80,\r
    colors: '#fecdd3,#fda4af,#e11d48',\r
    noFocus: true\r
  }\r
};\r
\r
interface PixelCardProps {\r
  variant?: 'default' | 'blue' | 'yellow' | 'pink';\r
  gap?: number;\r
  speed?: number;\r
  colors?: string;\r
  noFocus?: boolean;\r
  className?: string;\r
  children: React.ReactNode;\r
}\r
\r
interface VariantConfig {\r
  activeColor: string | null;\r
  gap: number;\r
  speed: number;\r
  colors: string;\r
  noFocus: boolean;\r
}\r
\r
export default function PixelCard({\r
  variant = 'default',\r
  gap,\r
  speed,\r
  colors,\r
  noFocus,\r
  className = '',\r
  children\r
}: PixelCardProps): JSX.Element {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const pixelsRef = useRef<Pixel[]>([]);\r
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);\r
  const timePreviousRef = useRef(performance.now());\r
  const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;\r
\r
  const variantCfg: VariantConfig = VARIANTS[variant] || VARIANTS.default;\r
  const finalGap = gap ?? variantCfg.gap;\r
  const finalSpeed = speed ?? variantCfg.speed;\r
  const finalColors = colors ?? variantCfg.colors;\r
  const finalNoFocus = noFocus ?? variantCfg.noFocus;\r
\r
  const initPixels = () => {\r
    if (!containerRef.current || !canvasRef.current) return;\r
\r
    const rect = containerRef.current.getBoundingClientRect();\r
    const width = Math.floor(rect.width);\r
    const height = Math.floor(rect.height);\r
    const ctx = canvasRef.current.getContext('2d');\r
\r
    canvasRef.current.width = width;\r
    canvasRef.current.height = height;\r
    canvasRef.current.style.width = \`\${width}px\`;\r
    canvasRef.current.style.height = \`\${height}px\`;\r
\r
    const colorsArray = finalColors.split(',');\r
    const pxs = [];\r
    for (let x = 0; x < width; x += parseInt(finalGap.toString(), 10)) {\r
      for (let y = 0; y < height; y += parseInt(finalGap.toString(), 10)) {\r
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];\r
\r
        const dx = x - width / 2;\r
        const dy = y - height / 2;\r
        const distance = Math.sqrt(dx * dx + dy * dy);\r
        const delay = reducedMotion ? 0 : distance;\r
        if (!ctx) return;\r
        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay));\r
      }\r
    }\r
    pixelsRef.current = pxs;\r
  };\r
\r
  const doAnimate = (fnName: keyof Pixel) => {\r
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));\r
    const timeNow = performance.now();\r
    const timePassed = timeNow - timePreviousRef.current;\r
    const timeInterval = 1000 / 60;\r
\r
    if (timePassed < timeInterval) return;\r
    timePreviousRef.current = timeNow - (timePassed % timeInterval);\r
\r
    const ctx = canvasRef.current?.getContext('2d');\r
    if (!ctx || !canvasRef.current) return;\r
\r
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);\r
\r
    let allIdle = true;\r
    for (let i = 0; i < pixelsRef.current.length; i++) {\r
      const pixel = pixelsRef.current[i];\r
      // @ts-ignore\r
      pixel[fnName]();\r
      if (!pixel.isIdle) {\r
        allIdle = false;\r
      }\r
    }\r
    if (allIdle) {\r
      cancelAnimationFrame(animationRef.current);\r
    }\r
  };\r
\r
  const handleAnimation = (name: keyof Pixel) => {\r
    if (animationRef.current !== null) {\r
      cancelAnimationFrame(animationRef.current);\r
    }\r
    animationRef.current = requestAnimationFrame(() => doAnimate(name));\r
  };\r
\r
  const onMouseEnter = () => handleAnimation('appear');\r
  const onMouseLeave = () => handleAnimation('disappear');\r
  const onFocus: React.FocusEventHandler<HTMLDivElement> = e => {\r
    if (e.currentTarget.contains(e.relatedTarget)) return;\r
    handleAnimation('appear');\r
  };\r
  const onBlur: React.FocusEventHandler<HTMLDivElement> = e => {\r
    if (e.currentTarget.contains(e.relatedTarget)) return;\r
    handleAnimation('disappear');\r
  };\r
\r
  useEffect(() => {\r
    initPixels();\r
    const observer = new ResizeObserver(() => {\r
      initPixels();\r
    });\r
    if (containerRef.current) {\r
      observer.observe(containerRef.current);\r
    }\r
    return () => {\r
      observer.disconnect();\r
      if (animationRef.current !== null) {\r
        cancelAnimationFrame(animationRef.current);\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [finalGap, finalSpeed, finalColors, finalNoFocus]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`pixel-card \${className}\`}\r
      onMouseEnter={onMouseEnter}\r
      onMouseLeave={onMouseLeave}\r
      onFocus={finalNoFocus ? undefined : onFocus}\r
      onBlur={finalNoFocus ? undefined : onBlur}\r
      tabIndex={finalNoFocus ? -1 : 0}\r
    >\r
      <canvas className="pixel-canvas" ref={canvasRef} />\r
      {children}\r
    </div>\r
  );\r
}\r
`,en=`import { useEffect, useRef } from 'react';\r
import { JSX } from 'react';\r
\r
class Pixel {\r
  width: number;\r
  height: number;\r
  ctx: CanvasRenderingContext2D;\r
  x: number;\r
  y: number;\r
  color: string;\r
  speed: number;\r
  size: number;\r
  sizeStep: number;\r
  minSize: number;\r
  maxSizeInteger: number;\r
  maxSize: number;\r
  delay: number;\r
  counter: number;\r
  counterStep: number;\r
  isIdle: boolean;\r
  isReverse: boolean;\r
  isShimmer: boolean;\r
\r
  constructor(\r
    canvas: HTMLCanvasElement,\r
    context: CanvasRenderingContext2D,\r
    x: number,\r
    y: number,\r
    color: string,\r
    speed: number,\r
    delay: number\r
  ) {\r
    this.width = canvas.width;\r
    this.height = canvas.height;\r
    this.ctx = context;\r
    this.x = x;\r
    this.y = y;\r
    this.color = color;\r
    this.speed = this.getRandomValue(0.1, 0.9) * speed;\r
    this.size = 0;\r
    this.sizeStep = Math.random() * 0.4;\r
    this.minSize = 0.5;\r
    this.maxSizeInteger = 2;\r
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);\r
    this.delay = delay;\r
    this.counter = 0;\r
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;\r
    this.isIdle = false;\r
    this.isReverse = false;\r
    this.isShimmer = false;\r
  }\r
\r
  getRandomValue(min: number, max: number) {\r
    return Math.random() * (max - min) + min;\r
  }\r
\r
  draw() {\r
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;\r
    this.ctx.fillStyle = this.color;\r
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);\r
  }\r
\r
  appear() {\r
    this.isIdle = false;\r
    if (this.counter <= this.delay) {\r
      this.counter += this.counterStep;\r
      return;\r
    }\r
    if (this.size >= this.maxSize) {\r
      this.isShimmer = true;\r
    }\r
    if (this.isShimmer) {\r
      this.shimmer();\r
    } else {\r
      this.size += this.sizeStep;\r
    }\r
    this.draw();\r
  }\r
\r
  disappear() {\r
    this.isShimmer = false;\r
    this.counter = 0;\r
    if (this.size <= 0) {\r
      this.isIdle = true;\r
      return;\r
    } else {\r
      this.size -= 0.1;\r
    }\r
    this.draw();\r
  }\r
\r
  shimmer() {\r
    if (this.size >= this.maxSize) {\r
      this.isReverse = true;\r
    } else if (this.size <= this.minSize) {\r
      this.isReverse = false;\r
    }\r
    if (this.isReverse) {\r
      this.size -= this.speed;\r
    } else {\r
      this.size += this.speed;\r
    }\r
  }\r
}\r
\r
function getEffectiveSpeed(value: number, reducedMotion: boolean) {\r
  const min = 0;\r
  const max = 100;\r
  const throttle = 0.001;\r
\r
  if (value <= min || reducedMotion) {\r
    return min;\r
  } else if (value >= max) {\r
    return max * throttle;\r
  } else {\r
    return value * throttle;\r
  }\r
}\r
\r
const VARIANTS = {\r
  default: {\r
    activeColor: null,\r
    gap: 5,\r
    speed: 35,\r
    colors: '#f8fafc,#f1f5f9,#cbd5e1',\r
    noFocus: false\r
  },\r
  blue: {\r
    activeColor: '#e0f2fe',\r
    gap: 10,\r
    speed: 25,\r
    colors: '#e0f2fe,#7dd3fc,#0ea5e9',\r
    noFocus: false\r
  },\r
  yellow: {\r
    activeColor: '#fef08a',\r
    gap: 3,\r
    speed: 20,\r
    colors: '#fef08a,#fde047,#eab308',\r
    noFocus: false\r
  },\r
  pink: {\r
    activeColor: '#fecdd3',\r
    gap: 6,\r
    speed: 80,\r
    colors: '#fecdd3,#fda4af,#e11d48',\r
    noFocus: true\r
  }\r
};\r
\r
interface PixelCardProps {\r
  variant?: 'default' | 'blue' | 'yellow' | 'pink';\r
  gap?: number;\r
  speed?: number;\r
  colors?: string;\r
  noFocus?: boolean;\r
  className?: string;\r
  children: React.ReactNode;\r
}\r
\r
interface VariantConfig {\r
  activeColor: string | null;\r
  gap: number;\r
  speed: number;\r
  colors: string;\r
  noFocus: boolean;\r
}\r
\r
export default function PixelCard({\r
  variant = 'default',\r
  gap,\r
  speed,\r
  colors,\r
  noFocus,\r
  className = '',\r
  children\r
}: PixelCardProps): JSX.Element {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const pixelsRef = useRef<Pixel[]>([]);\r
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);\r
  const timePreviousRef = useRef(performance.now());\r
  const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;\r
\r
  const variantCfg: VariantConfig = VARIANTS[variant] || VARIANTS.default;\r
  const finalGap = gap ?? variantCfg.gap;\r
  const finalSpeed = speed ?? variantCfg.speed;\r
  const finalColors = colors ?? variantCfg.colors;\r
  const finalNoFocus = noFocus ?? variantCfg.noFocus;\r
\r
  const initPixels = () => {\r
    if (!containerRef.current || !canvasRef.current) return;\r
\r
    const rect = containerRef.current.getBoundingClientRect();\r
    const width = Math.floor(rect.width);\r
    const height = Math.floor(rect.height);\r
    const ctx = canvasRef.current.getContext('2d');\r
\r
    canvasRef.current.width = width;\r
    canvasRef.current.height = height;\r
    canvasRef.current.style.width = \`\${width}px\`;\r
    canvasRef.current.style.height = \`\${height}px\`;\r
\r
    const colorsArray = finalColors.split(',');\r
    const pxs = [];\r
    for (let x = 0; x < width; x += parseInt(finalGap.toString(), 10)) {\r
      for (let y = 0; y < height; y += parseInt(finalGap.toString(), 10)) {\r
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];\r
\r
        const dx = x - width / 2;\r
        const dy = y - height / 2;\r
        const distance = Math.sqrt(dx * dx + dy * dy);\r
        const delay = reducedMotion ? 0 : distance;\r
        if (!ctx) return;\r
        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay));\r
      }\r
    }\r
    pixelsRef.current = pxs;\r
  };\r
\r
  const doAnimate = (fnName: keyof Pixel) => {\r
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));\r
    const timeNow = performance.now();\r
    const timePassed = timeNow - timePreviousRef.current;\r
    const timeInterval = 1000 / 60;\r
\r
    if (timePassed < timeInterval) return;\r
    timePreviousRef.current = timeNow - (timePassed % timeInterval);\r
\r
    const ctx = canvasRef.current?.getContext('2d');\r
    if (!ctx || !canvasRef.current) return;\r
\r
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);\r
\r
    let allIdle = true;\r
    for (let i = 0; i < pixelsRef.current.length; i++) {\r
      const pixel = pixelsRef.current[i];\r
      // @ts-ignore\r
      pixel[fnName]();\r
      if (!pixel.isIdle) {\r
        allIdle = false;\r
      }\r
    }\r
    if (allIdle) {\r
      cancelAnimationFrame(animationRef.current);\r
    }\r
  };\r
\r
  const handleAnimation = (name: keyof Pixel) => {\r
    if (animationRef.current !== null) {\r
      cancelAnimationFrame(animationRef.current);\r
    }\r
    animationRef.current = requestAnimationFrame(() => doAnimate(name));\r
  };\r
\r
  const onMouseEnter = () => handleAnimation('appear');\r
  const onMouseLeave = () => handleAnimation('disappear');\r
  const onFocus: React.FocusEventHandler<HTMLDivElement> = e => {\r
    if (e.currentTarget.contains(e.relatedTarget)) return;\r
    handleAnimation('appear');\r
  };\r
  const onBlur: React.FocusEventHandler<HTMLDivElement> = e => {\r
    if (e.currentTarget.contains(e.relatedTarget)) return;\r
    handleAnimation('disappear');\r
  };\r
\r
  useEffect(() => {\r
    initPixels();\r
    const observer = new ResizeObserver(() => {\r
      initPixels();\r
    });\r
    if (containerRef.current) {\r
      observer.observe(containerRef.current);\r
    }\r
    return () => {\r
      observer.disconnect();\r
      if (animationRef.current !== null) {\r
        cancelAnimationFrame(animationRef.current);\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [finalGap, finalSpeed, finalColors, finalNoFocus]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`h-[400px] w-[300px] relative overflow-hidden grid place-items-center aspect-[4/5] border border-[#27272a] rounded-[25px] isolate transition-colors duration-200 ease-[cubic-bezier(0.5,1,0.89,1)] select-none \${className}\`}\r
      onMouseEnter={onMouseEnter}\r
      onMouseLeave={onMouseLeave}\r
      onFocus={finalNoFocus ? undefined : onFocus}\r
      onBlur={finalNoFocus ? undefined : onBlur}\r
      tabIndex={finalNoFocus ? -1 : 0}\r
    >\r
      <canvas className="w-full h-full block" ref={canvasRef} />\r
      {children}\r
    </div>\r
  );\r
}\r
`,rn={usage:`import PixelCard from './PixelCard';

<PixelCard variant="pink">
  // your card content (use position: absolute)
</PixelCard>
`,code:U,css:Z,tailwind:_,tsCode:nn,tsTailwind:en};class tn{constructor(e,i,h,m,c,w,l){this.width=e.width,this.height=e.height,this.ctx=i,this.x=h,this.y=m,this.color=c,this.speed=this.getRandomValue(.1,.9)*w,this.size=0,this.sizeStep=Math.random()*.4,this.minSize=.5,this.maxSizeInteger=2,this.maxSize=this.getRandomValue(this.minSize,this.maxSizeInteger),this.delay=l,this.counter=0,this.counterStep=Math.random()*4+(this.width+this.height)*.01,this.isIdle=!1,this.isReverse=!1,this.isShimmer=!1}getRandomValue(e,i){return Math.random()*(i-e)+e}draw(){const e=this.maxSizeInteger*.5-this.size*.5;this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+e,this.y+e,this.size,this.size)}appear(){if(this.isIdle=!1,this.counter<=this.delay){this.counter+=this.counterStep;return}this.size>=this.maxSize&&(this.isShimmer=!0),this.isShimmer?this.shimmer():this.size+=this.sizeStep,this.draw()}disappear(){if(this.isShimmer=!1,this.counter=0,this.size<=0){this.isIdle=!0;return}else this.size-=.1;this.draw()}shimmer(){this.size>=this.maxSize?this.isReverse=!0:this.size<=this.minSize&&(this.isReverse=!1),this.isReverse?this.size-=this.speed:this.size+=this.speed}}function sn(o,e){const c=parseInt(o,10);return c<=0||e?0:c>=100?100*.001:c*.001}const V={default:{activeColor:null,gap:5,speed:35,colors:"#f8fafc,#f1f5f9,#cbd5e1",noFocus:!1},blue:{activeColor:"#e0f2fe",gap:10,speed:25,colors:"#e0f2fe,#7dd3fc,#0ea5e9",noFocus:!1},yellow:{activeColor:"#fef08a",gap:3,speed:20,colors:"#fef08a,#fde047,#eab308",noFocus:!1},pink:{activeColor:"#fecdd3",gap:6,speed:80,colors:"#fecdd3,#fda4af,#e11d48",noFocus:!0}};function an({variant:o="default",gap:e,speed:i,colors:h,noFocus:m,className:c="",children:w}){const l=a.useRef(null),t=a.useRef(null),z=a.useRef([]),p=a.useRef(null),F=a.useRef(performance.now()),M=a.useRef(window.matchMedia("(prefers-reduced-motion: reduce)").matches).current,R=V[o]||V.default,C=e??R.gap,A=i??R.speed,I=h??R.colors,g=m??R.noFocus,N=()=>{if(!l.current||!t.current)return;const n=l.current.getBoundingClientRect(),f=Math.floor(n.width),u=Math.floor(n.height),S=t.current.getContext("2d");t.current.width=f,t.current.height=u,t.current.style.width=`${f}px`,t.current.style.height=`${u}px`;const x=I.split(","),v=[];for(let d=0;d<f;d+=parseInt(C,10))for(let s=0;s<u;s+=parseInt(C,10)){const y=x[Math.floor(Math.random()*x.length)],T=d-f/2,E=s-u/2,j=Math.sqrt(T*T+E*E),q=M?0:j;v.push(new tn(t.current,S,d,s,y,sn(A,M),q))}z.current=v},P=n=>{var d;p.current=requestAnimationFrame(()=>P(n));const f=performance.now(),u=f-F.current,S=1e3/60;if(u<S)return;F.current=f-u%S;const x=(d=t.current)==null?void 0:d.getContext("2d");if(!x||!t.current)return;x.clearRect(0,0,t.current.width,t.current.height);let v=!0;for(let s=0;s<z.current.length;s++){const y=z.current[s];y[n](),y.isIdle||(v=!1)}v&&cancelAnimationFrame(p.current)},b=n=>{cancelAnimationFrame(p.current),p.current=requestAnimationFrame(()=>P(n))},L=()=>b("appear"),k=()=>b("disappear"),B=n=>{n.currentTarget.contains(n.relatedTarget)||b("appear")},O=n=>{n.currentTarget.contains(n.relatedTarget)||b("disappear")};return a.useEffect(()=>{N();const n=new ResizeObserver(()=>{N()});return l.current&&n.observe(l.current),()=>{n.disconnect(),cancelAnimationFrame(p.current)}},[C,A,I,g]),r.jsxs("div",{ref:l,className:`pixel-card ${c}`,onMouseEnter:L,onMouseLeave:k,onFocus:g?void 0:B,onBlur:g?void 0:O,tabIndex:g?-1:0,children:[r.jsx("canvas",{className:"pixel-canvas",ref:t}),w]})}const hn=()=>{const[o,e]=a.useState("default"),i=[{name:"variant",type:"string",default:'"default"',description:"Defines the color scheme and animation style.",options:"default | yellow | blue | pink"},{name:"gap",type:"number",default:"varies by variant",description:"Pixel grid gap size in pixels."},{name:"speed",type:"number",default:"varies by variant",description:"Animation speed modifier (lower is slower)."},{name:"colors",type:"string",default:'"#f8fafc,#f1f5f9,#cbd5e1"',description:"Comma-separated list of colors for the pixel effect."},{name:"noFocus",type:"boolean",default:"false",description:"If true, prevents animation from triggering on focus."},{name:"className",type:"string",default:'""',description:"Additional CSS class for the wrapper."},{name:"style",type:"object",default:"{}",description:"Inline styles for the wrapper."},{name:"children",type:"ReactNode",default:"null",description:"Content to render inside the pixel effect container."}],h=[{value:"default",label:"Default"},{value:"yellow",label:"Yellow"},{value:"blue",label:"Blue"},{value:"pink",label:"Pink"}];return r.jsxs(D,{children:[r.jsxs(J,{children:[r.jsx(G,{position:"relative",className:"demo-container",minH:500,maxH:500,overflow:"hidden",children:r.jsx(an,{variant:o,children:r.jsx(H,{w:"100%",h:"100%",position:"absolute",justifyContent:"center",alignItems:"center",children:r.jsx($,{fontSize:"3rem",userSelect:"none",fontWeight:900,mixBlendMode:"screen",color:"#271E37",children:"Hover Me."})})})}),r.jsx(K,{children:r.jsx(Q,{title:"Variant",options:h,value:o,name:"variant",width:150,onChange:m=>{e(m)}})}),r.jsx(X,{data:i})]}),r.jsx(W,{children:r.jsx(Y,{codeObject:rn})})]})};export{hn as default};
