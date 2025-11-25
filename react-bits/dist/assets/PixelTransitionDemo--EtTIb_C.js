import{r as i,j as e,g as f,F as P,T as b,d as G}from"./index-wsKSLPNH.js";import{T as A,P as L,a as N,C as j,b as M}from"./PropTable-C4uPWs8h.js";import{D as $}from"./Dependencies-BHoMfJUj.js";import{C as I}from"./Customize-1m_ZNqR9.js";import{P as z}from"./PreviewSlider-m1G_aiYP.js";import{u as H}from"./useForceRerender-BCFU-k0M.js";import{P as F}from"./PreviewSwitch-DqnF708j.js";import"./index-Bpz4cGEA.js";function O({firstContent:x,secondContent:y,gridSize:t=7,pixelColor:m="currentColor",animationStepDuration:s=.3,once:v=!1,aspectRatio:C="100%",className:p="",style:g={}}){const R=i.useRef(null),r=i.useRef(null),w=i.useRef(null),E=i.useRef(null),[o,k]=i.useState(!1),u="ontouchstart"in window||navigator.maxTouchPoints>0||window.matchMedia("(pointer: coarse)").matches;i.useEffect(()=>{const a=r.current;if(a){a.innerHTML="";for(let c=0;c<t;c++)for(let l=0;l<t;l++){const n=document.createElement("div");n.classList.add("pixelated-image-card__pixel"),n.style.backgroundColor=m;const d=100/t;n.style.width=`${d}%`,n.style.height=`${d}%`,n.style.left=`${l*d}%`,n.style.top=`${c*d}%`,a.appendChild(n)}}},[t,m]);const h=a=>{k(a);const c=r.current,l=w.current;if(!c||!l)return;const n=c.querySelectorAll(".pixelated-image-card__pixel");if(!n.length)return;f.killTweensOf(n),E.current&&E.current.kill(),f.set(n,{display:"none"});const d=n.length,D=s/d;f.to(n,{display:"block",duration:0,stagger:{each:D,from:"random"}}),E.current=f.delayedCall(s,()=>{l.style.display=a?"block":"none",l.style.pointerEvents=a?"none":""}),f.to(n,{display:"none",duration:0,delay:s,stagger:{each:D,from:"random"}})},T=()=>{o||h(!0)},S=()=>{o&&!v&&h(!1)},_=()=>{o?o&&!v&&h(!1):h(!0)};return e.jsxs("div",{ref:R,className:`pixelated-image-card ${p}`,style:g,onMouseEnter:u?void 0:T,onMouseLeave:u?void 0:S,onClick:u?_:void 0,onFocus:u?void 0:T,onBlur:u?void 0:S,tabIndex:0,children:[e.jsx("div",{style:{paddingTop:C}}),e.jsx("div",{className:"pixelated-image-card__default","aria-hidden":o,children:x}),e.jsx("div",{className:"pixelated-image-card__active",ref:w,"aria-hidden":!o,children:y}),e.jsx("div",{className:"pixelated-image-card__pixels",ref:r})]})}const q=`import { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
import './PixelTransition.css';\r
\r
function PixelTransition({\r
  firstContent,\r
  secondContent,\r
  gridSize = 7,\r
  pixelColor = 'currentColor',\r
  animationStepDuration = 0.3,\r
  once = false,\r
  aspectRatio = '100%',\r
  className = '',\r
  style = {}\r
}) {\r
  const containerRef = useRef(null);\r
  const pixelGridRef = useRef(null);\r
  const activeRef = useRef(null);\r
  const delayedCallRef = useRef(null);\r
\r
  const [isActive, setIsActive] = useState(false);\r
\r
  const isTouchDevice =\r
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;\r
\r
  useEffect(() => {\r
    const pixelGridEl = pixelGridRef.current;\r
    if (!pixelGridEl) return;\r
\r
    pixelGridEl.innerHTML = '';\r
\r
    for (let row = 0; row < gridSize; row++) {\r
      for (let col = 0; col < gridSize; col++) {\r
        const pixel = document.createElement('div');\r
        pixel.classList.add('pixelated-image-card__pixel');\r
        pixel.style.backgroundColor = pixelColor;\r
\r
        const size = 100 / gridSize;\r
        pixel.style.width = \`\${size}%\`;\r
        pixel.style.height = \`\${size}%\`;\r
        pixel.style.left = \`\${col * size}%\`;\r
        pixel.style.top = \`\${row * size}%\`;\r
        pixelGridEl.appendChild(pixel);\r
      }\r
    }\r
  }, [gridSize, pixelColor]);\r
\r
  const animatePixels = activate => {\r
    setIsActive(activate);\r
\r
    const pixelGridEl = pixelGridRef.current;\r
    const activeEl = activeRef.current;\r
    if (!pixelGridEl || !activeEl) return;\r
\r
    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');\r
    if (!pixels.length) return;\r
\r
    gsap.killTweensOf(pixels);\r
    if (delayedCallRef.current) {\r
      delayedCallRef.current.kill();\r
    }\r
\r
    gsap.set(pixels, { display: 'none' });\r
\r
    const totalPixels = pixels.length;\r
    const staggerDuration = animationStepDuration / totalPixels;\r
\r
    gsap.to(pixels, {\r
      display: 'block',\r
      duration: 0,\r
      stagger: {\r
        each: staggerDuration,\r
        from: 'random'\r
      }\r
    });\r
\r
    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {\r
      activeEl.style.display = activate ? 'block' : 'none';\r
      activeEl.style.pointerEvents = activate ? 'none' : '';\r
    });\r
\r
    gsap.to(pixels, {\r
      display: 'none',\r
      duration: 0,\r
      delay: animationStepDuration,\r
      stagger: {\r
        each: staggerDuration,\r
        from: 'random'\r
      }\r
    });\r
  };\r
\r
  const handleEnter = () => {\r
    if (!isActive) animatePixels(true);\r
  };\r
  const handleLeave = () => {\r
    if (isActive && !once) animatePixels(false);\r
  };\r
  const handleClick = () => {\r
    if (!isActive) animatePixels(true);\r
    else if (isActive && !once) animatePixels(false);\r
  };\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`pixelated-image-card \${className}\`}\r
      style={style}\r
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}\r
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}\r
      onClick={isTouchDevice ? handleClick : undefined}\r
      onFocus={!isTouchDevice ? handleEnter : undefined}\r
      onBlur={!isTouchDevice ? handleLeave : undefined}\r
      tabIndex={0}\r
    >\r
      <div style={{ paddingTop: aspectRatio }} />\r
      <div className="pixelated-image-card__default" aria-hidden={isActive}>\r
        {firstContent}\r
      </div>\r
      <div className="pixelated-image-card__active" ref={activeRef} aria-hidden={!isActive}>\r
        {secondContent}\r
      </div>\r
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />\r
    </div>\r
  );\r
}\r
\r
export default PixelTransition;\r
`,B=`.pixelated-image-card {\r
  background-color: #222;\r
  color: var(--color-primary, #fff);\r
  border-radius: 15px;\r
  border: 2px solid #fff;\r
  width: 300px;\r
  max-width: 100%;\r
  position: relative;\r
  overflow: hidden;\r
}\r
\r
.pixelated-image-card__default,\r
.pixelated-image-card__active,\r
.pixelated-image-card__pixels {\r
  width: 100%;\r
  height: 100%;\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
}\r
\r
.pixelated-image-card__active {\r
  z-index: 2;\r
}\r
\r
.pixelated-image-card__active {\r
  display: none;\r
}\r
\r
.pixelated-image-card__pixels {\r
  pointer-events: none;\r
  position: absolute;\r
  z-index: 3;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
}\r
\r
.pixelated-image-card__pixel {\r
  display: none;\r
  position: absolute;\r
}\r
`,W=`import { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
\r
function PixelTransition({\r
  firstContent,\r
  secondContent,\r
  gridSize = 7,\r
  pixelColor = 'currentColor',\r
  animationStepDuration = 0.3,\r
  aspectRatio = '100%',\r
  className = '',\r
  once = false,\r
  style = {},\r
  aspectRatio = '100%'\r
  style = {}\r
}) {\r
  const containerRef = useRef(null);\r
  const pixelGridRef = useRef(null);\r
  const activeRef = useRef(null);\r
  const delayedCallRef = useRef(null);\r
\r
  const [isActive, setIsActive] = useState(false);\r
\r
  const isTouchDevice =\r
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;\r
\r
  useEffect(() => {\r
    const pixelGridEl = pixelGridRef.current;\r
    if (!pixelGridEl) return;\r
\r
    pixelGridEl.innerHTML = '';\r
\r
    for (let row = 0; row < gridSize; row++) {\r
      for (let col = 0; col < gridSize; col++) {\r
        const pixel = document.createElement('div');\r
        pixel.classList.add('pixelated-image-card__pixel');\r
        pixel.classList.add('absolute', 'hidden');\r
        pixel.style.backgroundColor = pixelColor;\r
\r
        const size = 100 / gridSize;\r
        pixel.style.width = \`\${size}%\`;\r
        pixel.style.height = \`\${size}%\`;\r
        pixel.style.left = \`\${col * size}%\`;\r
        pixel.style.top = \`\${row * size}%\`;\r
\r
        pixelGridEl.appendChild(pixel);\r
      }\r
    }\r
  }, [gridSize, pixelColor]);\r
\r
  const animatePixels = activate => {\r
    setIsActive(activate);\r
\r
    const pixelGridEl = pixelGridRef.current;\r
    const activeEl = activeRef.current;\r
    if (!pixelGridEl || !activeEl) return;\r
\r
    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');\r
    if (!pixels.length) return;\r
\r
    gsap.killTweensOf(pixels);\r
    if (delayedCallRef.current) {\r
      delayedCallRef.current.kill();\r
    }\r
\r
    gsap.set(pixels, { display: 'none' });\r
\r
    const totalPixels = pixels.length;\r
    const staggerDuration = animationStepDuration / totalPixels;\r
\r
    gsap.to(pixels, {\r
      display: 'block',\r
      duration: 0,\r
      stagger: {\r
        each: staggerDuration,\r
        from: 'random'\r
      }\r
    });\r
\r
    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {\r
      activeEl.style.display = activate ? 'block' : 'none';\r
      activeEl.style.pointerEvents = activate ? 'none' : '';\r
    });\r
\r
    gsap.to(pixels, {\r
      display: 'none',\r
      duration: 0,\r
      delay: animationStepDuration,\r
      stagger: {\r
        each: staggerDuration,\r
        from: 'random'\r
      }\r
    });\r
  };\r
\r
  const handleEnter = () => {\r
    if (!isActive) animatePixels(true);\r
  };\r
  const handleLeave = () => {\r
    if (isActive && !once) animatePixels(false);\r
  };\r
  const handleClick = () => {\r
    if (!isActive) animatePixels(true);\r
    else if (isActive && !once) animatePixels(false);\r
  };\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`\r
        \${className}\r
        bg-[#271E37]\r
        text-white\r
        rounded-[15px]\r
        border-2\r
        border-white\r
        w-[300px]\r
        max-w-full\r
        relative\r
        overflow-hidden\r
      \`}\r
      style={style}\r
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}\r
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}\r
      onClick={isTouchDevice ? handleClick : undefined}\r
      onFocus={!isTouchDevice ? handleEnter : undefined}\r
      onBlur={!isTouchDevice ? handleLeave : undefined}\r
      tabIndex={0}\r
    >\r
      <div style={{ paddingTop: aspectRatio }} />\r
\r
      <div className="absolute inset-0 w-full h-full" aria-hidden={isActive}>\r
        {firstContent}\r
      </div>\r
\r
      <div\r
        ref={activeRef}\r
        className="absolute inset-0 w-full h-full z-[2]"\r
        style={{ display: 'none' }}\r
        aria-hidden={!isActive}\r
      >\r
        {secondContent}\r
      </div>\r
\r
      <div ref={pixelGridRef} className="absolute inset-0 w-full h-full pointer-events-none z-[3]" />\r
    </div>\r
  );\r
}\r
\r
export default PixelTransition;\r
`,U=`import React, { useRef, useEffect, useState, CSSProperties } from 'react';\r
import { gsap } from 'gsap';\r
import './PixelTransition.css';\r
\r
interface PixelTransitionProps {\r
  firstContent: React.ReactNode | string;\r
  secondContent: React.ReactNode | string;\r
  gridSize?: number;\r
  pixelColor?: string;\r
  animationStepDuration?: number;\r
  once?: boolean;\r
  className?: string;\r
  style?: CSSProperties;\r
  aspectRatio?: string;\r
}\r
\r
const PixelTransition: React.FC<PixelTransitionProps> = ({\r
  firstContent,\r
  secondContent,\r
  gridSize = 7,\r
  pixelColor = 'currentColor',\r
  animationStepDuration = 0.3,\r
  once = false,\r
  aspectRatio = '100%',\r
  className = '',\r
  style = {}\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const pixelGridRef = useRef<HTMLDivElement | null>(null);\r
  const activeRef = useRef<HTMLDivElement | null>(null);\r
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);\r
\r
  const [isActive, setIsActive] = useState<boolean>(false);\r
\r
  const isTouchDevice =\r
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;\r
\r
  useEffect(() => {\r
    const pixelGridEl = pixelGridRef.current;\r
    if (!pixelGridEl) return;\r
\r
    pixelGridEl.innerHTML = '';\r
\r
    for (let row = 0; row < gridSize; row++) {\r
      for (let col = 0; col < gridSize; col++) {\r
        const pixel = document.createElement('div');\r
        pixel.classList.add('pixelated-image-card__pixel');\r
        pixel.style.backgroundColor = pixelColor;\r
\r
        const size = 100 / gridSize;\r
        pixel.style.width = \`\${size}%\`;\r
        pixel.style.height = \`\${size}%\`;\r
        pixel.style.left = \`\${col * size}%\`;\r
        pixel.style.top = \`\${row * size}%\`;\r
        pixelGridEl.appendChild(pixel);\r
      }\r
    }\r
  }, [gridSize, pixelColor]);\r
\r
  const animatePixels = (activate: boolean): void => {\r
    setIsActive(activate);\r
\r
    const pixelGridEl = pixelGridRef.current;\r
    const activeEl = activeRef.current;\r
    if (!pixelGridEl || !activeEl) return;\r
\r
    const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>('.pixelated-image-card__pixel');\r
    if (!pixels.length) return;\r
\r
    gsap.killTweensOf(pixels);\r
    if (delayedCallRef.current) {\r
      delayedCallRef.current.kill();\r
    }\r
\r
    gsap.set(pixels, { display: 'none' });\r
\r
    const totalPixels = pixels.length;\r
    const staggerDuration = animationStepDuration / totalPixels;\r
\r
    gsap.to(pixels, {\r
      display: 'block',\r
      duration: 0,\r
      stagger: {\r
        each: staggerDuration,\r
        from: 'random'\r
      }\r
    });\r
\r
    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {\r
      activeEl.style.display = activate ? 'block' : 'none';\r
      activeEl.style.pointerEvents = activate ? 'none' : '';\r
    });\r
\r
    gsap.to(pixels, {\r
      display: 'none',\r
      duration: 0,\r
      delay: animationStepDuration,\r
      stagger: {\r
        each: staggerDuration,\r
        from: 'random'\r
      }\r
    });\r
  };\r
\r
  const handleEnter = (): void => {\r
    if (!isActive) animatePixels(true);\r
  };\r
  const handleLeave = (): void => {\r
    if (isActive && !once) animatePixels(false);\r
  };\r
  const handleClick = (): void => {\r
    if (!isActive) animatePixels(true);\r
    else if (isActive && !once) animatePixels(false);\r
  };\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`pixelated-image-card \${className}\`}\r
      style={style}\r
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}\r
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}\r
      onClick={isTouchDevice ? handleClick : undefined}\r
      onFocus={!isTouchDevice ? handleEnter : undefined}\r
      onBlur={!isTouchDevice ? handleLeave : undefined}\r
      tabIndex={0}\r
    >\r
      <div style={{ paddingTop: aspectRatio }} />\r
      <div className="pixelated-image-card__default" aria-hidden={isActive}>\r
        {firstContent}\r
      </div>\r
      <div className="pixelated-image-card__active" ref={activeRef} aria-hidden={!isActive}>\r
        {secondContent}\r
      </div>\r
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />\r
    </div>\r
  );\r
};\r
\r
export default PixelTransition;\r
`,J=`import React, { useRef, useEffect, useState, CSSProperties } from 'react';\r
import { gsap } from 'gsap';\r
\r
interface PixelTransitionProps {\r
  firstContent: React.ReactNode | string;\r
  secondContent: React.ReactNode | string;\r
  gridSize?: number;\r
  pixelColor?: string;\r
  animationStepDuration?: number;\r
  once?: boolean;\r
  className?: string;\r
  style?: CSSProperties;\r
  aspectRatio?: string;\r
}\r
\r
const PixelTransition: React.FC<PixelTransitionProps> = ({\r
  firstContent,\r
  secondContent,\r
  gridSize = 7,\r
  pixelColor = 'currentColor',\r
  animationStepDuration = 0.3,\r
  once = false,\r
  aspectRatio = '100%',\r
  className = '',\r
  style = {}\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const pixelGridRef = useRef<HTMLDivElement | null>(null);\r
  const activeRef = useRef<HTMLDivElement | null>(null);\r
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);\r
\r
  const [isActive, setIsActive] = useState<boolean>(false);\r
\r
  const isTouchDevice =\r
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;\r
\r
  useEffect(() => {\r
    const pixelGridEl = pixelGridRef.current;\r
    if (!pixelGridEl) return;\r
\r
    pixelGridEl.innerHTML = '';\r
\r
    for (let row = 0; row < gridSize; row++) {\r
      for (let col = 0; col < gridSize; col++) {\r
        const pixel = document.createElement('div');\r
        pixel.classList.add('pixelated-image-card__pixel');\r
        pixel.classList.add('absolute', 'hidden');\r
        pixel.style.backgroundColor = pixelColor;\r
\r
        const size = 100 / gridSize;\r
        pixel.style.width = \`\${size}%\`;\r
        pixel.style.height = \`\${size}%\`;\r
        pixel.style.left = \`\${col * size}%\`;\r
        pixel.style.top = \`\${row * size}%\`;\r
\r
        pixelGridEl.appendChild(pixel);\r
      }\r
    }\r
  }, [gridSize, pixelColor]);\r
\r
  const animatePixels = (activate: boolean): void => {\r
    setIsActive(activate);\r
\r
    const pixelGridEl = pixelGridRef.current;\r
    const activeEl = activeRef.current;\r
    if (!pixelGridEl || !activeEl) return;\r
\r
    const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>('.pixelated-image-card__pixel');\r
    if (!pixels.length) return;\r
\r
    gsap.killTweensOf(pixels);\r
    if (delayedCallRef.current) {\r
      delayedCallRef.current.kill();\r
    }\r
\r
    gsap.set(pixels, { display: 'none' });\r
\r
    const totalPixels = pixels.length;\r
    const staggerDuration = animationStepDuration / totalPixels;\r
\r
    gsap.to(pixels, {\r
      display: 'block',\r
      duration: 0,\r
      stagger: {\r
        each: staggerDuration,\r
        from: 'random'\r
      }\r
    });\r
\r
    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {\r
      activeEl.style.display = activate ? 'block' : 'none';\r
      activeEl.style.pointerEvents = activate ? 'none' : '';\r
    });\r
\r
    gsap.to(pixels, {\r
      display: 'none',\r
      duration: 0,\r
      delay: animationStepDuration,\r
      stagger: {\r
        each: staggerDuration,\r
        from: 'random'\r
      }\r
    });\r
  };\r
\r
  const handleEnter = (): void => {\r
    if (!isActive) animatePixels(true);\r
  };\r
  const handleLeave = (): void => {\r
    if (isActive && !once) animatePixels(false);\r
  };\r
  const handleClick = (): void => {\r
    if (!isActive) animatePixels(true);\r
    else if (isActive && !once) animatePixels(false);\r
  };\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`\r
        \${className}\r
        bg-[#222]\r
        text-white\r
        rounded-[15px]\r
        border-2\r
        border-white\r
        w-[300px]\r
        max-w-full\r
        relative\r
        overflow-hidden\r
      \`}\r
      style={style}\r
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}\r
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}\r
      onClick={isTouchDevice ? handleClick : undefined}\r
      onFocus={!isTouchDevice ? handleEnter : undefined}\r
      onBlur={!isTouchDevice ? handleLeave : undefined}\r
      tabIndex={0}\r
    >\r
      <div style={{ paddingTop: aspectRatio }} />\r
\r
      <div className="absolute inset-0 w-full h-full" aria-hidden={isActive}>\r
        {firstContent}\r
      </div>\r
\r
      <div\r
        ref={activeRef}\r
        className="absolute inset-0 w-full h-full z-[2]"\r
        style={{ display: 'none' }}\r
        aria-hidden={!isActive}\r
      >\r
        {secondContent}\r
      </div>\r
\r
      <div ref={pixelGridRef} className="absolute inset-0 w-full h-full pointer-events-none z-[3]" />\r
    </div>\r
  );\r
};\r
\r
export default PixelTransition;\r
`,K={dependencies:"gsap",usage:`import PixelTransition from './PixelTransition';

<PixelTransition
  firstContent={
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
      alt="default pixel transition content, a cat!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#111"
      }}
    >
      <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
    </div>
  }
  gridSize={12}
  pixelColor='#ffffff'
  once={false}
  animationStepDuration={0.4}
  className="custom-pixel-card"
/>`,code:q,css:B,tailwind:W,tsCode:U,tsTailwind:J},Q=[{name:"firstContent",type:"ReactNode | string",default:"—",description:"Content to show by default (e.g., an <img> or text)."},{name:"secondContent",type:"ReactNode | string",default:"—",description:"Content revealed upon hover or click."},{name:"gridSize",type:"number",default:"7",description:"Number of rows/columns in the pixel grid."},{name:"pixelColor",type:"string",default:"currentColor",description:"Background color used for each pixel block."},{name:"animationStepDuration",type:"number",default:"0.3",description:"Length of the pixel reveal/hide in seconds."},{name:"aspectRatio",type:"string",default:'"100%"',description:"Sets the 'padding-top' (or aspect-ratio) for the container."},{name:"once",type:"boolean",default:"false",description:"If true, the transition will not revert on mouse leave or subsequent clicks."},{name:"className",type:"string",default:"—",description:"Optional additional class names for styling."},{name:"style",type:"object",default:"{}",description:"Optional inline styles for the container."}],te=()=>{const[x,y]=i.useState(8),[t,m]=i.useState("#ffffff"),[s,v]=i.useState(.4),[C,p]=H(),[g,R]=i.useState(!1);return e.jsxs(A,{children:[e.jsxs(L,{children:[e.jsxs(P,{direction:"column",position:"relative",className:"demo-container",minH:400,maxH:400,overflow:"hidden",children:[e.jsx(O,{firstContent:e.jsx("img",{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",alt:"Default",style:{width:"100%",height:"100%",objectFit:"cover"}}),secondContent:e.jsx("div",{style:{width:"100%",height:"100%",display:"grid",placeItems:"center",backgroundColor:"#111"},children:e.jsx("p",{style:{fontWeight:900,fontSize:"3rem",color:"#ffffff"},children:"Meow!"})}),gridSize:x,pixelColor:t,animationStepDuration:s,once:g,className:"custom-pixel-card"},C),e.jsx(b,{mt:2,color:"#a6a6a6",children:"Psst, hover the card!"})]}),e.jsxs(I,{children:[e.jsx(z,{title:"Grid Size",min:2,max:50,step:1,value:x,onChange:r=>{y(r),p()},width:200}),e.jsx(z,{title:"Animation Duration",min:.1,max:2,step:.1,value:s,valueUnit:"s",onChange:r=>{v(r),p()},width:200}),e.jsxs(P,{gap:4,align:"center",mt:4,children:[e.jsx(b,{fontSize:"sm",children:"Pixel Color"}),e.jsx(G,{type:"color",value:t,onChange:r=>{m(r.target.value),p()},width:"60px",p:0})]}),e.jsx(F,{title:"Once",isChecked:g,onChange:r=>R(r)})]}),e.jsx(N,{data:Q}),e.jsx($,{dependencyList:["gsap"]})]}),e.jsx(j,{children:e.jsx(M,{codeObject:K})})]})};export{te as default};
