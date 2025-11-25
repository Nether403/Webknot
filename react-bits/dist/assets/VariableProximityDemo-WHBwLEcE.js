import{r as l,j as e,q,B as P,T as M,F as D,a as $}from"./index-wsKSLPNH.js";import{T as z,P as O,a as G,C as U,b as J}from"./PropTable-C4uPWs8h.js";import{D as K}from"./Dependencies-BHoMfJUj.js";import{P as Q}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";function W(o){l.useEffect(()=>{let i;const c=()=>{o(),i=requestAnimationFrame(c)};return i=requestAnimationFrame(c),()=>cancelAnimationFrame(i)},[o])}function Z(o){const i=l.useRef({x:0,y:0});return l.useEffect(()=>{const c=(n,r)=>{if(o!=null&&o.current){const x=o.current.getBoundingClientRect();i.current={x:n-x.left,y:r-x.top}}else i.current={x:n,y:r}},u=n=>c(n.clientX,n.clientY),d=n=>{const r=n.touches[0];c(r.clientX,r.clientY)};return window.addEventListener("mousemove",u),window.addEventListener("touchmove",d),()=>{window.removeEventListener("mousemove",u),window.removeEventListener("touchmove",d)}},[o]),i}const F=l.forwardRef((o,i)=>{const{label:c,fromFontVariationSettings:u,toFontVariationSettings:d,containerRef:n,radius:r=50,falloff:x="linear",className:C="",onClick:E,style:I,...L}=o,h=l.useRef([]),S=l.useRef([]),g=Z(n),R=l.useRef({x:null,y:null}),k=l.useMemo(()=>{const s=t=>new Map(t.split(",").map(f=>f.trim()).map(f=>{const[p,y]=f.split(" ");return[p.replace(/['"]/g,""),parseFloat(y)]})),a=s(u),m=s(d);return Array.from(a.entries()).map(([t,f])=>({axis:t,fromValue:f,toValue:m.get(t)??f}))},[u,d]),T=(s,a,m,t)=>Math.sqrt((m-s)**2+(t-a)**2),j=s=>{const a=Math.min(Math.max(1-s/r,0),1);switch(x){case"exponential":return a**2;case"gaussian":return Math.exp(-((s/(r/2))**2)/2);case"linear":default:return a}};W(()=>{if(!(n!=null&&n.current))return;const s=n.current.getBoundingClientRect(),{x:a,y:m}=g.current;R.current.x===a&&R.current.y===m||(R.current={x:a,y:m},h.current.forEach((t,f)=>{if(!t)return;const p=t.getBoundingClientRect(),y=p.left+p.width/2-s.left,N=p.top+p.height/2-s.top,w=T(g.current.x,g.current.y,y,N);if(w>=r){t.style.fontVariationSettings=u;return}const B=j(w),v=k.map(({axis:H,fromValue:V,toValue:X})=>{const Y=V+(X-V)*B;return`'${H}' ${Y}`}).join(", ");S.current[f]=v,t.style.fontVariationSettings=v}))});const b=c.split(" ");let A=0;return e.jsxs("span",{ref:i,className:`${C} variable-proximity`,onClick:E,style:{display:"inline",...I},...L,children:[b.map((s,a)=>e.jsxs("span",{style:{display:"inline-block",whiteSpace:"nowrap"},children:[s.split("").map(m=>{const t=A++;return e.jsx(q.span,{ref:f=>{h.current[t]=f},style:{display:"inline-block",fontVariationSettings:S.current[t]},"aria-hidden":"true",children:m},t)}),a<b.length-1&&e.jsx("span",{style:{display:"inline-block"},children:" "})]},a)),e.jsx("span",{className:"sr-only",children:c})]})});F.displayName="VariableProximity";const _=`import { forwardRef, useMemo, useRef, useEffect } from 'react';\r
import { motion } from 'motion/react';\r
import './VariableProximity.css';\r
\r
function useAnimationFrame(callback) {\r
  useEffect(() => {\r
    let frameId;\r
    const loop = () => {\r
      callback();\r
      frameId = requestAnimationFrame(loop);\r
    };\r
    frameId = requestAnimationFrame(loop);\r
    return () => cancelAnimationFrame(frameId);\r
  }, [callback]);\r
}\r
\r
function useMousePositionRef(containerRef) {\r
  const positionRef = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    const updatePosition = (x, y) => {\r
      if (containerRef?.current) {\r
        const rect = containerRef.current.getBoundingClientRect();\r
        positionRef.current = { x: x - rect.left, y: y - rect.top };\r
      } else {\r
        positionRef.current = { x, y };\r
      }\r
    };\r
\r
    const handleMouseMove = ev => updatePosition(ev.clientX, ev.clientY);\r
    const handleTouchMove = ev => {\r
      const touch = ev.touches[0];\r
      updatePosition(touch.clientX, touch.clientY);\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    window.addEventListener('touchmove', handleTouchMove);\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      window.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, [containerRef]);\r
\r
  return positionRef;\r
}\r
\r
const VariableProximity = forwardRef((props, ref) => {\r
  const {\r
    label,\r
    fromFontVariationSettings,\r
    toFontVariationSettings,\r
    containerRef,\r
    radius = 50,\r
    falloff = 'linear',\r
    className = '',\r
    onClick,\r
    style,\r
    ...restProps\r
  } = props;\r
\r
  const letterRefs = useRef([]);\r
  const interpolatedSettingsRef = useRef([]);\r
  const mousePositionRef = useMousePositionRef(containerRef);\r
  const lastPositionRef = useRef({ x: null, y: null });\r
\r
  const parsedSettings = useMemo(() => {\r
    const parseSettings = settingsStr =>\r
      new Map(\r
        settingsStr\r
          .split(',')\r
          .map(s => s.trim())\r
          .map(s => {\r
            const [name, value] = s.split(' ');\r
            return [name.replace(/['"]/g, ''), parseFloat(value)];\r
          })\r
      );\r
\r
    const fromSettings = parseSettings(fromFontVariationSettings);\r
    const toSettings = parseSettings(toFontVariationSettings);\r
\r
    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({\r
      axis,\r
      fromValue,\r
      toValue: toSettings.get(axis) ?? fromValue\r
    }));\r
  }, [fromFontVariationSettings, toFontVariationSettings]);\r
\r
  const calculateDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\r
\r
  const calculateFalloff = distance => {\r
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);\r
    switch (falloff) {\r
      case 'exponential':\r
        return norm ** 2;\r
      case 'gaussian':\r
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);\r
      case 'linear':\r
      default:\r
        return norm;\r
    }\r
  };\r
\r
  useAnimationFrame(() => {\r
    if (!containerRef?.current) return;\r
    const containerRect = containerRef.current.getBoundingClientRect();\r
    const { x, y } = mousePositionRef.current;\r
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {\r
      return;\r
    }\r
    lastPositionRef.current = { x, y };\r
\r
    letterRefs.current.forEach((letterRef, index) => {\r
      if (!letterRef) return;\r
\r
      const rect = letterRef.getBoundingClientRect();\r
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;\r
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;\r
\r
      const distance = calculateDistance(\r
        mousePositionRef.current.x,\r
        mousePositionRef.current.y,\r
        letterCenterX,\r
        letterCenterY\r
      );\r
\r
      if (distance >= radius) {\r
        letterRef.style.fontVariationSettings = fromFontVariationSettings;\r
        return;\r
      }\r
\r
      const falloffValue = calculateFalloff(distance);\r
      const newSettings = parsedSettings\r
        .map(({ axis, fromValue, toValue }) => {\r
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;\r
          return \`'\${axis}' \${interpolatedValue}\`;\r
        })\r
        .join(', ');\r
\r
      interpolatedSettingsRef.current[index] = newSettings;\r
      letterRef.style.fontVariationSettings = newSettings;\r
    });\r
  });\r
\r
  const words = label.split(' ');\r
  let letterIndex = 0;\r
\r
  return (\r
    <span\r
      ref={ref}\r
      className={\`\${className} variable-proximity\`}\r
      onClick={onClick}\r
      style={{ display: 'inline', ...style }}\r
      {...restProps}\r
    >\r
      {words.map((word, wordIndex) => (\r
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>\r
          {word.split('').map(letter => {\r
            const currentLetterIndex = letterIndex++;\r
            return (\r
              <motion.span\r
                key={currentLetterIndex}\r
                ref={el => {\r
                  letterRefs.current[currentLetterIndex] = el;\r
                }}\r
                style={{\r
                  display: 'inline-block',\r
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]\r
                }}\r
                aria-hidden="true"\r
              >\r
                {letter}\r
              </motion.span>\r
            );\r
          })}\r
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}\r
        </span>\r
      ))}\r
      <span className="sr-only">{label}</span>\r
    </span>\r
  );\r
});\r
\r
VariableProximity.displayName = 'VariableProximity';\r
export default VariableProximity;\r
`,ee=`@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');\r
\r
.variable-proximity {\r
  font-family: 'Roboto Flex', sans-serif;\r
}\r
\r
.sr-only {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  padding: 0;\r
  margin: -1px;\r
  overflow: hidden;\r
  clip: rect(0, 0, 0, 0);\r
  white-space: nowrap;\r
  border: 0;\r
}\r
`,re=`import { forwardRef, useMemo, useRef, useEffect } from 'react';\r
import { motion } from 'motion/react';\r
\r
function useAnimationFrame(callback) {\r
  useEffect(() => {\r
    let frameId;\r
    const loop = () => {\r
      callback();\r
      frameId = requestAnimationFrame(loop);\r
    };\r
    frameId = requestAnimationFrame(loop);\r
    return () => cancelAnimationFrame(frameId);\r
  }, [callback]);\r
}\r
\r
function useMousePositionRef(containerRef) {\r
  const positionRef = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    const updatePosition = (x, y) => {\r
      if (containerRef?.current) {\r
        const rect = containerRef.current.getBoundingClientRect();\r
        positionRef.current = { x: x - rect.left, y: y - rect.top };\r
      } else {\r
        positionRef.current = { x, y };\r
      }\r
    };\r
\r
    const handleMouseMove = ev => updatePosition(ev.clientX, ev.clientY);\r
    const handleTouchMove = ev => {\r
      const touch = ev.touches[0];\r
      updatePosition(touch.clientX, touch.clientY);\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    window.addEventListener('touchmove', handleTouchMove);\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      window.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, [containerRef]);\r
\r
  return positionRef;\r
}\r
\r
const VariableProximity = forwardRef((props, ref) => {\r
  const {\r
    label,\r
    fromFontVariationSettings,\r
    toFontVariationSettings,\r
    containerRef,\r
    radius = 50,\r
    falloff = 'linear',\r
    className = '',\r
    onClick,\r
    style,\r
    ...restProps\r
  } = props;\r
\r
  const letterRefs = useRef([]);\r
  const interpolatedSettingsRef = useRef([]);\r
  const mousePositionRef = useMousePositionRef(containerRef);\r
  const lastPositionRef = useRef({ x: null, y: null });\r
\r
  const parsedSettings = useMemo(() => {\r
    const parseSettings = settingsStr =>\r
      new Map(\r
        settingsStr\r
          .split(',')\r
          .map(s => s.trim())\r
          .map(s => {\r
            const [name, value] = s.split(' ');\r
            return [name.replace(/['"]/g, ''), parseFloat(value)];\r
          })\r
      );\r
\r
    const fromSettings = parseSettings(fromFontVariationSettings);\r
    const toSettings = parseSettings(toFontVariationSettings);\r
\r
    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({\r
      axis,\r
      fromValue,\r
      toValue: toSettings.get(axis) ?? fromValue\r
    }));\r
  }, [fromFontVariationSettings, toFontVariationSettings]);\r
\r
  const calculateDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\r
\r
  const calculateFalloff = distance => {\r
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);\r
    switch (falloff) {\r
      case 'exponential':\r
        return norm ** 2;\r
      case 'gaussian':\r
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);\r
      case 'linear':\r
      default:\r
        return norm;\r
    }\r
  };\r
\r
  useAnimationFrame(() => {\r
    if (!containerRef?.current) return;\r
    const { x, y } = mousePositionRef.current;\r
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {\r
      return;\r
    }\r
    lastPositionRef.current = { x, y };\r
\r
    const containerRect = containerRef.current.getBoundingClientRect();\r
\r
    letterRefs.current.forEach((letterRef, index) => {\r
      if (!letterRef) return;\r
\r
      const rect = letterRef.getBoundingClientRect();\r
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;\r
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;\r
\r
      const distance = calculateDistance(\r
        mousePositionRef.current.x,\r
        mousePositionRef.current.y,\r
        letterCenterX,\r
        letterCenterY\r
      );\r
\r
      if (distance >= radius) {\r
        letterRef.style.fontVariationSettings = fromFontVariationSettings;\r
        return;\r
      }\r
\r
      const falloffValue = calculateFalloff(distance);\r
      const newSettings = parsedSettings\r
        .map(({ axis, fromValue, toValue }) => {\r
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;\r
          return \`'\${axis}' \${interpolatedValue}\`;\r
        })\r
        .join(', ');\r
\r
      interpolatedSettingsRef.current[index] = newSettings;\r
      letterRef.style.fontVariationSettings = newSettings;\r
    });\r
  });\r
\r
  const words = label.split(' ');\r
  let letterIndex = 0;\r
\r
  return (\r
    <span\r
      ref={ref}\r
      onClick={onClick}\r
      style={{\r
        display: 'inline',\r
        fontFamily: '"Roboto Flex", sans-serif',\r
        ...style\r
      }}\r
      className={className}\r
      {...restProps}\r
    >\r
      {words.map((word, wordIndex) => (\r
        <span key={wordIndex} className="inline-block whitespace-nowrap">\r
          {word.split('').map(letter => {\r
            const currentLetterIndex = letterIndex++;\r
            return (\r
              <motion.span\r
                key={currentLetterIndex}\r
                ref={el => {\r
                  letterRefs.current[currentLetterIndex] = el;\r
                }}\r
                style={{\r
                  display: 'inline-block',\r
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]\r
                }}\r
                aria-hidden="true"\r
              >\r
                {letter}\r
              </motion.span>\r
            );\r
          })}\r
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}\r
        </span>\r
      ))}\r
      <span className="sr-only">{label}</span>\r
    </span>\r
  );\r
});\r
\r
VariableProximity.displayName = 'VariableProximity';\r
export default VariableProximity;\r
`,ne=`import { forwardRef, useMemo, useRef, useEffect, MutableRefObject, RefObject, HTMLAttributes } from 'react';\r
import { motion } from 'motion/react';\r
import './VariableProximity.css';\r
\r
type Callback = () => void;\r
\r
function useAnimationFrame(callback: Callback) {\r
  useEffect(() => {\r
    let frameId: number;\r
    const loop = () => {\r
      callback();\r
      frameId = requestAnimationFrame(loop);\r
    };\r
    frameId = requestAnimationFrame(loop);\r
    return () => cancelAnimationFrame(frameId);\r
  }, [callback]);\r
}\r
\r
function useMousePositionRef(containerRef: RefObject<HTMLElement>) {\r
  const positionRef = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    const updatePosition = (x: number, y: number) => {\r
      if (containerRef?.current) {\r
        const rect = containerRef.current.getBoundingClientRect();\r
        positionRef.current = { x: x - rect.left, y: y - rect.top };\r
      } else {\r
        positionRef.current = { x, y };\r
      }\r
    };\r
\r
    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);\r
    const handleTouchMove = (ev: TouchEvent) => {\r
      const touch = ev.touches[0];\r
      updatePosition(touch.clientX, touch.clientY);\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    window.addEventListener('touchmove', handleTouchMove);\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      window.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, [containerRef]);\r
\r
  return positionRef;\r
}\r
\r
interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {\r
  label: string;\r
  fromFontVariationSettings: string;\r
  toFontVariationSettings: string;\r
  containerRef: RefObject<HTMLElement>;\r
  radius?: number;\r
  falloff?: 'linear' | 'exponential' | 'gaussian';\r
  className?: string;\r
  onClick?: () => void;\r
  style?: React.CSSProperties;\r
}\r
\r
const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {\r
  const {\r
    label,\r
    fromFontVariationSettings,\r
    toFontVariationSettings,\r
    containerRef,\r
    radius = 50,\r
    falloff = 'linear',\r
    className = '',\r
    onClick,\r
    style,\r
    ...restProps\r
  } = props;\r
\r
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);\r
  const interpolatedSettingsRef = useRef<string[]>([]);\r
  const mousePositionRef = useMousePositionRef(containerRef);\r
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });\r
\r
  const parsedSettings = useMemo(() => {\r
    const parseSettings = (settingsStr: string) =>\r
      new Map(\r
        settingsStr\r
          .split(',')\r
          .map(s => s.trim())\r
          .map(s => {\r
            const [name, value] = s.split(' ');\r
            return [name.replace(/['"]/g, ''), parseFloat(value)];\r
          })\r
      );\r
\r
    const fromSettings = parseSettings(fromFontVariationSettings);\r
    const toSettings = parseSettings(toFontVariationSettings);\r
\r
    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({\r
      axis,\r
      fromValue,\r
      toValue: toSettings.get(axis) ?? fromValue\r
    }));\r
  }, [fromFontVariationSettings, toFontVariationSettings]);\r
\r
  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>\r
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\r
\r
  const calculateFalloff = (distance: number) => {\r
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);\r
    switch (falloff) {\r
      case 'exponential':\r
        return norm ** 2;\r
      case 'gaussian':\r
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);\r
      case 'linear':\r
      default:\r
        return norm;\r
    }\r
  };\r
\r
  useAnimationFrame(() => {\r
    if (!containerRef?.current) return;\r
    const { x, y } = mousePositionRef.current;\r
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {\r
      return;\r
    }\r
    lastPositionRef.current = { x, y };\r
    const containerRect = containerRef.current.getBoundingClientRect();\r
\r
    letterRefs.current.forEach((letterRef, index) => {\r
      if (!letterRef) return;\r
\r
      const rect = letterRef.getBoundingClientRect();\r
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;\r
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;\r
\r
      const distance = calculateDistance(\r
        mousePositionRef.current.x,\r
        mousePositionRef.current.y,\r
        letterCenterX,\r
        letterCenterY\r
      );\r
\r
      if (distance >= radius) {\r
        letterRef.style.fontVariationSettings = fromFontVariationSettings;\r
        return;\r
      }\r
\r
      const falloffValue = calculateFalloff(distance);\r
      const newSettings = parsedSettings\r
        .map(({ axis, fromValue, toValue }) => {\r
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;\r
          return \`'\${axis}' \${interpolatedValue}\`;\r
        })\r
        .join(', ');\r
\r
      interpolatedSettingsRef.current[index] = newSettings;\r
      letterRef.style.fontVariationSettings = newSettings;\r
    });\r
  });\r
\r
  const words = label.split(' ');\r
  let letterIndex = 0;\r
\r
  return (\r
    <span\r
      ref={ref}\r
      className={\`\${className} variable-proximity\`}\r
      onClick={onClick}\r
      style={{ display: 'inline', ...style }}\r
      {...restProps}\r
    >\r
      {words.map((word, wordIndex) => (\r
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>\r
          {word.split('').map(letter => {\r
            const currentLetterIndex = letterIndex++;\r
            return (\r
              <motion.span\r
                key={currentLetterIndex}\r
                ref={el => {\r
                  letterRefs.current[currentLetterIndex] = el;\r
                }}\r
                style={{\r
                  display: 'inline-block',\r
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]\r
                }}\r
                aria-hidden="true"\r
              >\r
                {letter}\r
              </motion.span>\r
            );\r
          })}\r
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}\r
        </span>\r
      ))}\r
      <span className="sr-only">{label}</span>\r
    </span>\r
  );\r
});\r
\r
VariableProximity.displayName = 'VariableProximity';\r
export default VariableProximity;\r
`,te=`import { forwardRef, useMemo, useRef, useEffect, MutableRefObject, CSSProperties, HTMLAttributes } from 'react';\r
import { motion } from 'motion/react';\r
\r
function useAnimationFrame(callback: () => void) {\r
  useEffect(() => {\r
    let frameId: number;\r
    const loop = () => {\r
      callback();\r
      frameId = requestAnimationFrame(loop);\r
    };\r
    frameId = requestAnimationFrame(loop);\r
    return () => cancelAnimationFrame(frameId);\r
  }, [callback]);\r
}\r
\r
function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {\r
  const positionRef = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    const updatePosition = (x: number, y: number) => {\r
      if (containerRef?.current) {\r
        const rect = containerRef.current.getBoundingClientRect();\r
        positionRef.current = { x: x - rect.left, y: y - rect.top };\r
      } else {\r
        positionRef.current = { x, y };\r
      }\r
    };\r
\r
    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);\r
    const handleTouchMove = (ev: TouchEvent) => {\r
      const touch = ev.touches[0];\r
      updatePosition(touch.clientX, touch.clientY);\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    window.addEventListener('touchmove', handleTouchMove);\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      window.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, [containerRef]);\r
\r
  return positionRef;\r
}\r
\r
interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {\r
  label: string;\r
  fromFontVariationSettings: string;\r
  toFontVariationSettings: string;\r
  containerRef: MutableRefObject<HTMLElement | null>;\r
  radius?: number;\r
  falloff?: 'linear' | 'exponential' | 'gaussian';\r
  className?: string;\r
  onClick?: () => void;\r
  style?: CSSProperties;\r
}\r
\r
const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {\r
  const {\r
    label,\r
    fromFontVariationSettings,\r
    toFontVariationSettings,\r
    containerRef,\r
    radius = 50,\r
    falloff = 'linear',\r
    className = '',\r
    onClick,\r
    style,\r
    ...restProps\r
  } = props;\r
\r
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);\r
  const interpolatedSettingsRef = useRef<string[]>([]);\r
  const mousePositionRef = useMousePositionRef(containerRef);\r
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });\r
\r
  const parsedSettings = useMemo(() => {\r
    const parseSettings = (settingsStr: string) =>\r
      new Map(\r
        settingsStr\r
          .split(',')\r
          .map(s => s.trim())\r
          .map(s => {\r
            const [name, value] = s.split(' ');\r
            return [name.replace(/['"]/g, ''), parseFloat(value)];\r
          })\r
      );\r
\r
    const fromSettings = parseSettings(fromFontVariationSettings);\r
    const toSettings = parseSettings(toFontVariationSettings);\r
\r
    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({\r
      axis,\r
      fromValue,\r
      toValue: toSettings.get(axis) ?? fromValue\r
    }));\r
  }, [fromFontVariationSettings, toFontVariationSettings]);\r
\r
  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>\r
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\r
\r
  const calculateFalloff = (distance: number) => {\r
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);\r
    switch (falloff) {\r
      case 'exponential':\r
        return norm ** 2;\r
      case 'gaussian':\r
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);\r
      case 'linear':\r
      default:\r
        return norm;\r
    }\r
  };\r
\r
  useAnimationFrame(() => {\r
    if (!containerRef?.current) return;\r
    const { x, y } = mousePositionRef.current;\r
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {\r
      return;\r
    }\r
    lastPositionRef.current = { x, y };\r
    const containerRect = containerRef.current.getBoundingClientRect();\r
\r
    letterRefs.current.forEach((letterRef, index) => {\r
      if (!letterRef) return;\r
\r
      const rect = letterRef.getBoundingClientRect();\r
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;\r
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;\r
\r
      const distance = calculateDistance(\r
        mousePositionRef.current.x,\r
        mousePositionRef.current.y,\r
        letterCenterX,\r
        letterCenterY\r
      );\r
\r
      if (distance >= radius) {\r
        letterRef.style.fontVariationSettings = fromFontVariationSettings;\r
        return;\r
      }\r
\r
      const falloffValue = calculateFalloff(distance);\r
      const newSettings = parsedSettings\r
        .map(({ axis, fromValue, toValue }) => {\r
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;\r
          return \`'\${axis}' \${interpolatedValue}\`;\r
        })\r
        .join(', ');\r
\r
      interpolatedSettingsRef.current[index] = newSettings;\r
      letterRef.style.fontVariationSettings = newSettings;\r
    });\r
  });\r
\r
  const words = label.split(' ');\r
  let letterIndex = 0;\r
\r
  return (\r
    <span\r
      ref={ref}\r
      onClick={onClick}\r
      style={{\r
        display: 'inline',\r
        fontFamily: '"Roboto Flex", sans-serif',\r
        ...style\r
      }}\r
      className={className}\r
      {...restProps}\r
    >\r
      {words.map((word, wordIndex) => (\r
        <span key={wordIndex} className="inline-block whitespace-nowrap">\r
          {word.split('').map(letter => {\r
            const currentLetterIndex = letterIndex++;\r
            return (\r
              <motion.span\r
                key={currentLetterIndex}\r
                ref={el => {\r
                  letterRefs.current[currentLetterIndex] = el;\r
                }}\r
                style={{\r
                  display: 'inline-block',\r
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]\r
                }}\r
                aria-hidden="true"\r
              >\r
                {letter}\r
              </motion.span>\r
            );\r
          })}\r
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}\r
        </span>\r
      ))}\r
      <span className="sr-only">{label}</span>\r
    </span>\r
  );\r
});\r
\r
VariableProximity.displayName = 'VariableProximity';\r
export default VariableProximity;\r
`,oe={dependencies:"motion",usage:`import { useRef } from 'react';
import VariableProximity from './VariableProximity';

const containerRef = useRef(null);

<div
ref={containerRef}
style={{position: 'relative'}}
>
  <VariableProximity
    label={'Hover me! And then star React Bits on GitHub, or else...'}
    className={'variable-proximity-demo'}
    fromFontVariationSettings="'wght' 400, 'opsz' 9"
    toFontVariationSettings="'wght' 1000, 'opsz' 40"
    containerRef={containerRef}
    radius={100}
    falloff='linear'
  />
</div>`,code:_,css:ee,tailwind:re,tsCode:ne,tsTailwind:te},ue=()=>{const o=l.useRef(null),[i,c]=l.useState(100),[u,d]=l.useState("linear"),n=[{name:"label",type:"string",default:'""',description:"The text content to display."},{name:"fromFontVariationSettings",type:"string",default:"'wght' 400, 'opsz' 9",description:"The starting variation settings."},{name:"toFontVariationSettings",type:"string",default:"'wght' 800, 'opsz' 40",description:"The variation settings to reach at cursor proximity."},{name:"containerRef",type:"RefObject<HTMLDivElement>",default:"undefined",description:"Reference to container for relative calculations."},{name:"radius",type:"number",default:"50",description:"Proximity radius to influence the effect."},{name:"falloff",type:"'linear' | 'exponential' | 'gaussian'",default:'"linear"',description:"Type of falloff for the effect."}];return e.jsxs(z,{children:[e.jsxs(O,{children:[e.jsx(P,{ref:o,position:"relative",className:"demo-container",minH:400,overflow:"hidden",p:4,children:e.jsx(F,{label:"Hover me! And then star React Bits on GitHub, or else...",className:"variable-proximity-demo",fromFontVariationSettings:"'wght' 400, 'opsz' 9",toFontVariationSettings:"'wght' 1000, 'opsz' 40",containerRef:o,radius:i,falloff:u})}),e.jsxs(P,{mt:6,className:"preview-options",children:[e.jsx(M,{fontSize:"xl",mb:2,children:"Customize"}),e.jsx(Q,{title:"Radius",min:50,max:300,step:10,value:i,valueUnit:"px",onChange:r=>c(r),width:200}),e.jsxs(D,{gap:4,align:"center",mt:4,children:[e.jsx(M,{fontSize:"sm",children:"Falloff"}),["linear","exponential","gaussian"].map(r=>e.jsx($,{size:"sm",color:"#ffffff",borderRadius:"10px",border:r===u?"1px solid #170D27":"1px solid #271E37",bg:r===u?"#5227FF":"#170D27",onClick:()=>d(r),children:r},r))]})]}),e.jsx(G,{data:n}),e.jsx(K,{dependencyList:["motion"]})]}),e.jsx(U,{children:e.jsx(J,{codeObject:oe})})]})};export{ue as default};
