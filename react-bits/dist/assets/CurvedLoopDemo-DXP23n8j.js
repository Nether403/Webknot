import{r as t,j as e,B as N}from"./index-wsKSLPNH.js";import{T as F,P as I,a as $,C as k,b as B}from"./PropTable-C4uPWs8h.js";import{C as W}from"./Customize-1m_ZNqR9.js";import{P as L}from"./PreviewSlider-m1G_aiYP.js";import{P as G}from"./PreviewInput-C0y58bk9.js";import{P as U}from"./PreviewSwitch-DqnF708j.js";import{u as V}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const Q=`import { useRef, useEffect, useState, useMemo, useId } from 'react';\r
import './CurvedLoop.css';\r
\r
const CurvedLoop = ({\r
  marqueeText = '',\r
  speed = 2,\r
  className,\r
  curveAmount = 400,\r
  direction = 'left',\r
  interactive = true\r
}) => {\r
  const text = useMemo(() => {\r
    const hasTrailing = /\\s|\\u00A0$/.test(marqueeText);\r
    return (hasTrailing ? marqueeText.replace(/\\s+$/, '') : marqueeText) + '\\u00A0';\r
  }, [marqueeText]);\r
\r
  const measureRef = useRef(null);\r
  const textPathRef = useRef(null);\r
  const pathRef = useRef(null);\r
  const [spacing, setSpacing] = useState(0);\r
  const [offset, setOffset] = useState(0);\r
  const uid = useId();\r
  const pathId = \`curve-\${uid}\`;\r
  const pathD = \`M-100,40 Q500,\${40 + curveAmount} 1540,40\`;\r
\r
  const dragRef = useRef(false);\r
  const lastXRef = useRef(0);\r
  const dirRef = useRef(direction);\r
  const velRef = useRef(0);\r
\r
  const textLength = spacing;\r
  const totalText = textLength\r
    ? Array(Math.ceil(1800 / textLength) + 2)\r
        .fill(text)\r
        .join('')\r
    : text;\r
  const ready = spacing > 0;\r
\r
  useEffect(() => {\r
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());\r
  }, [text, className]);\r
\r
  useEffect(() => {\r
    if (!spacing) return;\r
    if (textPathRef.current) {\r
      const initial = -spacing;\r
      textPathRef.current.setAttribute('startOffset', initial + 'px');\r
      setOffset(initial);\r
    }\r
  }, [spacing]);\r
\r
  useEffect(() => {\r
    if (!spacing || !ready) return;\r
    let frame = 0;\r
    const step = () => {\r
      if (!dragRef.current && textPathRef.current) {\r
        const delta = dirRef.current === 'right' ? speed : -speed;\r
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');\r
        let newOffset = currentOffset + delta;\r
\r
        const wrapPoint = spacing;\r
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;\r
        if (newOffset > 0) newOffset -= wrapPoint;\r
\r
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');\r
        setOffset(newOffset);\r
      }\r
      frame = requestAnimationFrame(step);\r
    };\r
    frame = requestAnimationFrame(step);\r
    return () => cancelAnimationFrame(frame);\r
  }, [spacing, speed, ready]);\r
\r
  const onPointerDown = e => {\r
    if (!interactive) return;\r
    dragRef.current = true;\r
    lastXRef.current = e.clientX;\r
    velRef.current = 0;\r
    e.target.setPointerCapture(e.pointerId);\r
  };\r
\r
  const onPointerMove = e => {\r
    if (!interactive || !dragRef.current || !textPathRef.current) return;\r
    const dx = e.clientX - lastXRef.current;\r
    lastXRef.current = e.clientX;\r
    velRef.current = dx;\r
\r
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');\r
    let newOffset = currentOffset + dx;\r
\r
    const wrapPoint = spacing;\r
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;\r
    if (newOffset > 0) newOffset -= wrapPoint;\r
\r
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');\r
    setOffset(newOffset);\r
  };\r
\r
  const endDrag = () => {\r
    if (!interactive) return;\r
    dragRef.current = false;\r
    dirRef.current = velRef.current > 0 ? 'right' : 'left';\r
  };\r
\r
  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';\r
\r
  return (\r
    <div\r
      className="curved-loop-jacket"\r
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}\r
      onPointerDown={onPointerDown}\r
      onPointerMove={onPointerMove}\r
      onPointerUp={endDrag}\r
      onPointerLeave={endDrag}\r
    >\r
      <svg className="curved-loop-svg" viewBox="0 0 1440 120">\r
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>\r
          {text}\r
        </text>\r
        <defs>\r
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />\r
        </defs>\r
        {ready && (\r
          <text fontWeight="bold" xmlSpace="preserve" className={className}>\r
            <textPath ref={textPathRef} href={\`#\${pathId}\`} startOffset={offset + 'px'} xmlSpace="preserve">\r
              {totalText}\r
            </textPath>\r
          </text>\r
        )}\r
      </svg>\r
    </div>\r
  );\r
};\r
\r
export default CurvedLoop;\r
`,z=`.curved-loop-jacket {\r
  min-height: 100vh;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 100%;\r
}\r
\r
.curved-loop-svg {\r
  user-select: none;\r
  width: 100%;\r
  aspect-ratio: 100 / 12;\r
  overflow: visible;\r
  display: block;\r
  font-size: 6rem;\r
  fill: #ffffff;\r
  user-select: none;\r
  -moz-user-select: none;\r
  -webkit-user-select: none;\r
  font-weight: 700;\r
  text-transform: uppercase;\r
  line-height: 1;\r
}\r
`,H=`import { useRef, useEffect, useState, useMemo, useId } from 'react';\r
\r
const CurvedLoop = ({\r
  marqueeText = '',\r
  speed = 2,\r
  className,\r
  curveAmount = 400,\r
  direction = 'left',\r
  interactive = true\r
}) => {\r
  const text = useMemo(() => {\r
    const hasTrailing = /\\s|\\u00A0$/.test(marqueeText);\r
    return (hasTrailing ? marqueeText.replace(/\\s+$/, '') : marqueeText) + '\\u00A0';\r
  }, [marqueeText]);\r
\r
  const measureRef = useRef(null);\r
  const textPathRef = useRef(null);\r
  const pathRef = useRef(null);\r
  const [spacing, setSpacing] = useState(0);\r
  const [offset, setOffset] = useState(0);\r
  const uid = useId();\r
  const pathId = \`curve-\${uid}\`;\r
  const pathD = \`M-100,40 Q500,\${40 + curveAmount} 1540,40\`;\r
\r
  const dragRef = useRef(false);\r
  const lastXRef = useRef(0);\r
  const dirRef = useRef(direction);\r
  const velRef = useRef(0);\r
\r
  const textLength = spacing;\r
  const totalText = textLength\r
    ? Array(Math.ceil(1800 / textLength) + 2)\r
        .fill(text)\r
        .join('')\r
    : text;\r
  const ready = spacing > 0;\r
\r
  useEffect(() => {\r
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());\r
  }, [text, className]);\r
\r
  useEffect(() => {\r
    if (!spacing) return;\r
    if (textPathRef.current) {\r
      const initial = -spacing;\r
      textPathRef.current.setAttribute('startOffset', initial + 'px');\r
      setOffset(initial);\r
    }\r
  }, [spacing]);\r
\r
  useEffect(() => {\r
    if (!spacing || !ready) return;\r
    let frame = 0;\r
    const step = () => {\r
      if (!dragRef.current && textPathRef.current) {\r
        const delta = dirRef.current === 'right' ? speed : -speed;\r
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');\r
        let newOffset = currentOffset + delta;\r
        const wrapPoint = spacing;\r
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;\r
        if (newOffset > 0) newOffset -= wrapPoint;\r
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');\r
        setOffset(newOffset);\r
      }\r
      frame = requestAnimationFrame(step);\r
    };\r
    frame = requestAnimationFrame(step);\r
    return () => cancelAnimationFrame(frame);\r
  }, [spacing, speed, ready]);\r
\r
  const onPointerDown = e => {\r
    if (!interactive) return;\r
    dragRef.current = true;\r
    lastXRef.current = e.clientX;\r
    velRef.current = 0;\r
    e.target.setPointerCapture(e.pointerId);\r
  };\r
\r
  const onPointerMove = e => {\r
    if (!interactive || !dragRef.current || !textPathRef.current) return;\r
    const dx = e.clientX - lastXRef.current;\r
    lastXRef.current = e.clientX;\r
    velRef.current = dx;\r
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');\r
    let newOffset = currentOffset + dx;\r
    const wrapPoint = spacing;\r
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;\r
    if (newOffset > 0) newOffset -= wrapPoint;\r
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');\r
    setOffset(newOffset);\r
  };\r
\r
  const endDrag = () => {\r
    if (!interactive) return;\r
    dragRef.current = false;\r
    dirRef.current = velRef.current > 0 ? 'right' : 'left';\r
  };\r
\r
  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';\r
\r
  return (\r
    <div\r
      className="min-h-screen flex items-center justify-center w-full"\r
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}\r
      onPointerDown={onPointerDown}\r
      onPointerMove={onPointerMove}\r
      onPointerUp={endDrag}\r
      onPointerLeave={endDrag}\r
    >\r
      <svg\r
        className="select-none w-full overflow-visible block aspect-[100/12] text-[6rem] font-bold uppercase leading-none"\r
        viewBox="0 0 1440 120"\r
      >\r
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>\r
          {text}\r
        </text>\r
        <defs>\r
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />\r
        </defs>\r
        {ready && (\r
          <text xmlSpace="preserve" className={\`fill-white \${className ?? ''}\`}>\r
            <textPath ref={textPathRef} href={\`#\${pathId}\`} startOffset={offset + 'px'} xmlSpace="preserve">\r
              {totalText}\r
            </textPath>\r
          </text>\r
        )}\r
      </svg>\r
    </div>\r
  );\r
};\r
\r
export default CurvedLoop;\r
`,J=`import { useRef, useEffect, useState, useMemo, useId, FC, PointerEvent } from 'react';\r
import './CurvedLoop.css';\r
\r
interface CurvedLoopProps {\r
  marqueeText?: string;\r
  speed?: number;\r
  className?: string;\r
  curveAmount?: number;\r
  direction?: 'left' | 'right';\r
  interactive?: boolean;\r
}\r
\r
const CurvedLoop: FC<CurvedLoopProps> = ({\r
  marqueeText = '',\r
  speed = 2,\r
  className,\r
  curveAmount = 400,\r
  direction = 'left',\r
  interactive = true\r
}) => {\r
  const text = useMemo(() => {\r
    const hasTrailing = /\\s|\\u00A0$/.test(marqueeText);\r
    return (hasTrailing ? marqueeText.replace(/\\s+$/, '') : marqueeText) + '\\u00A0';\r
  }, [marqueeText]);\r
\r
  const measureRef = useRef<SVGTextElement | null>(null);\r
  const textPathRef = useRef<SVGTextPathElement | null>(null);\r
  const pathRef = useRef<SVGPathElement | null>(null);\r
  const [spacing, setSpacing] = useState(0);\r
  const [offset, setOffset] = useState(0);\r
  const uid = useId();\r
  const pathId = \`curve-\${uid}\`;\r
  const pathD = \`M-100,40 Q500,\${40 + curveAmount} 1540,40\`;\r
\r
  const dragRef = useRef(false);\r
  const lastXRef = useRef(0);\r
  const dirRef = useRef<'left' | 'right'>(direction);\r
  const velRef = useRef(0);\r
\r
  const textLength = spacing;\r
  const totalText = textLength\r
    ? Array(Math.ceil(1800 / textLength) + 2)\r
        .fill(text)\r
        .join('')\r
    : text;\r
  const ready = spacing > 0;\r
\r
  useEffect(() => {\r
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());\r
  }, [text, className]);\r
\r
  useEffect(() => {\r
    if (!spacing) return;\r
    if (textPathRef.current) {\r
      const initial = -spacing;\r
      textPathRef.current.setAttribute('startOffset', initial + 'px');\r
      setOffset(initial);\r
    }\r
  }, [spacing]);\r
\r
  useEffect(() => {\r
    if (!spacing || !ready) return;\r
    let frame = 0;\r
    const step = () => {\r
      if (!dragRef.current && textPathRef.current) {\r
        const delta = dirRef.current === 'right' ? speed : -speed;\r
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');\r
        let newOffset = currentOffset + delta;\r
        const wrapPoint = spacing;\r
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;\r
        if (newOffset > 0) newOffset -= wrapPoint;\r
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');\r
        setOffset(newOffset);\r
      }\r
      frame = requestAnimationFrame(step);\r
    };\r
    frame = requestAnimationFrame(step);\r
    return () => cancelAnimationFrame(frame);\r
  }, [spacing, speed, ready]);\r
\r
  const onPointerDown = (e: PointerEvent) => {\r
    if (!interactive) return;\r
    dragRef.current = true;\r
    lastXRef.current = e.clientX;\r
    velRef.current = 0;\r
    (e.target as HTMLElement).setPointerCapture(e.pointerId);\r
  };\r
\r
  const onPointerMove = (e: PointerEvent) => {\r
    if (!interactive || !dragRef.current || !textPathRef.current) return;\r
    const dx = e.clientX - lastXRef.current;\r
    lastXRef.current = e.clientX;\r
    velRef.current = dx;\r
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');\r
    let newOffset = currentOffset + dx;\r
    const wrapPoint = spacing;\r
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;\r
    if (newOffset > 0) newOffset -= wrapPoint;\r
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');\r
    setOffset(newOffset);\r
  };\r
\r
  const endDrag = () => {\r
    if (!interactive) return;\r
    dragRef.current = false;\r
    dirRef.current = velRef.current > 0 ? 'right' : 'left';\r
  };\r
\r
  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';\r
\r
  return (\r
    <div\r
      className="curved-loop-jacket"\r
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}\r
      onPointerDown={onPointerDown}\r
      onPointerMove={onPointerMove}\r
      onPointerUp={endDrag}\r
      onPointerLeave={endDrag}\r
    >\r
      <svg className="curved-loop-svg" viewBox="0 0 1440 120">\r
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>\r
          {text}\r
        </text>\r
        <defs>\r
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />\r
        </defs>\r
        {ready && (\r
          <text fontWeight="bold" xmlSpace="preserve" className={className}>\r
            <textPath ref={textPathRef} href={\`#\${pathId}\`} startOffset={offset + 'px'} xmlSpace="preserve">\r
              {totalText}\r
            </textPath>\r
          </text>\r
        )}\r
      </svg>\r
    </div>\r
  );\r
};\r
\r
export default CurvedLoop;\r
`,K=`import { useRef, useEffect, useState, useMemo, useId, FC, PointerEvent } from 'react';\r
\r
interface CurvedLoopProps {\r
  marqueeText?: string;\r
  speed?: number;\r
  className?: string;\r
  curveAmount?: number;\r
  direction?: 'left' | 'right';\r
  interactive?: boolean;\r
}\r
\r
const CurvedLoop: FC<CurvedLoopProps> = ({\r
  marqueeText = '',\r
  speed = 2,\r
  className,\r
  curveAmount = 400,\r
  direction = 'left',\r
  interactive = true\r
}) => {\r
  const text = useMemo(() => {\r
    const hasTrailing = /\\s|\\u00A0$/.test(marqueeText);\r
    return (hasTrailing ? marqueeText.replace(/\\s+$/, '') : marqueeText) + '\\u00A0';\r
  }, [marqueeText]);\r
\r
  const measureRef = useRef<SVGTextElement | null>(null);\r
  const textPathRef = useRef<SVGTextPathElement | null>(null);\r
  const pathRef = useRef<SVGPathElement | null>(null);\r
  const [spacing, setSpacing] = useState(0);\r
  const [offset, setOffset] = useState(0);\r
  const uid = useId();\r
  const pathId = \`curve-\${uid}\`;\r
  const pathD = \`M-100,40 Q500,\${40 + curveAmount} 1540,40\`;\r
\r
  const dragRef = useRef(false);\r
  const lastXRef = useRef(0);\r
  const dirRef = useRef<'left' | 'right'>(direction);\r
  const velRef = useRef(0);\r
\r
  const textLength = spacing;\r
  const totalText = textLength\r
    ? Array(Math.ceil(1800 / textLength) + 2)\r
        .fill(text)\r
        .join('')\r
    : text;\r
  const ready = spacing > 0;\r
\r
  useEffect(() => {\r
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());\r
  }, [text, className]);\r
\r
  useEffect(() => {\r
    if (!spacing) return;\r
    if (textPathRef.current) {\r
      const initial = -spacing;\r
      textPathRef.current.setAttribute('startOffset', initial + 'px');\r
      setOffset(initial);\r
    }\r
  }, [spacing]);\r
\r
  useEffect(() => {\r
    if (!spacing || !ready) return;\r
    let frame = 0;\r
    const step = () => {\r
      if (!dragRef.current && textPathRef.current) {\r
        const delta = dirRef.current === 'right' ? speed : -speed;\r
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');\r
        let newOffset = currentOffset + delta;\r
        const wrapPoint = spacing;\r
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;\r
        if (newOffset > 0) newOffset -= wrapPoint;\r
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');\r
        setOffset(newOffset);\r
      }\r
      frame = requestAnimationFrame(step);\r
    };\r
    frame = requestAnimationFrame(step);\r
    return () => cancelAnimationFrame(frame);\r
  }, [spacing, speed, ready]);\r
\r
  const onPointerDown = (e: PointerEvent) => {\r
    if (!interactive) return;\r
    dragRef.current = true;\r
    lastXRef.current = e.clientX;\r
    velRef.current = 0;\r
    (e.target as HTMLElement).setPointerCapture(e.pointerId);\r
  };\r
\r
  const onPointerMove = (e: PointerEvent) => {\r
    if (!interactive || !dragRef.current || !textPathRef.current) return;\r
    const dx = e.clientX - lastXRef.current;\r
    lastXRef.current = e.clientX;\r
    velRef.current = dx;\r
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');\r
    let newOffset = currentOffset + dx;\r
    const wrapPoint = spacing;\r
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;\r
    if (newOffset > 0) newOffset -= wrapPoint;\r
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');\r
    setOffset(newOffset);\r
  };\r
\r
  const endDrag = () => {\r
    if (!interactive) return;\r
    dragRef.current = false;\r
    dirRef.current = velRef.current > 0 ? 'right' : 'left';\r
  };\r
\r
  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';\r
\r
  return (\r
    <div\r
      className="min-h-screen flex items-center justify-center w-full"\r
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}\r
      onPointerDown={onPointerDown}\r
      onPointerMove={onPointerMove}\r
      onPointerUp={endDrag}\r
      onPointerLeave={endDrag}\r
    >\r
      <svg\r
        className="select-none w-full overflow-visible block aspect-[100/12] text-[6rem] font-bold uppercase leading-none"\r
        viewBox="0 0 1440 120"\r
      >\r
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>\r
          {text}\r
        </text>\r
        <defs>\r
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />\r
        </defs>\r
        {ready && (\r
          <text xmlSpace="preserve" className={\`fill-white \${className ?? ''}\`}>\r
            <textPath ref={textPathRef} href={\`#\${pathId}\`} startOffset={offset + 'px'} xmlSpace="preserve">\r
              {totalText}\r
            </textPath>\r
          </text>\r
        )}\r
      </svg>\r
    </div>\r
  );\r
};\r
\r
export default CurvedLoop;\r
`,Y={usage:`import CurvedLoop from './CurvedLoop';

// Basic usage
<CurvedLoop marqueeText="Welcome to React Bits ✦" />

// With custom props
<CurvedLoop 
  marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
  speed={3}
  curveAmount={500}
  direction="right"
  interactive={true}
  className="custom-text-style"
/>

// Non-interactive with slower speed
<CurvedLoop 
  marqueeText="Smooth Curved Animation"
  speed={1}
  curveAmount={300}
  interactive={false}
/>`,code:Q,css:z,tailwind:H,tsCode:J,tsTailwind:K},Z=({marqueeText:u="",speed:i=2,className:p,curveAmount:v=400,direction:g="left",interactive:l=!0})=>{const o=t.useMemo(()=>(/\s|\u00A0$/.test(u)?u.replace(/\s+$/,""):u)+" ",[u]),d=t.useRef(null),n=t.useRef(null),R=t.useRef(null),[s,f]=t.useState(0),[E,P]=t.useState(0),y=`curve-${t.useId()}`,q=`M-100,40 Q500,${40+v} 1540,40`,m=t.useRef(!1),w=t.useRef(0),A=t.useRef(g),O=t.useRef(0),S=s,D=S?Array(Math.ceil(1800/S)+2).fill(o).join(""):o,h=s>0;t.useEffect(()=>{d.current&&f(d.current.getComputedTextLength())},[o,p]),t.useEffect(()=>{if(s&&n.current){const r=-s;n.current.setAttribute("startOffset",r+"px"),P(r)}},[s]),t.useEffect(()=>{if(!s||!h)return;let r=0;const x=()=>{if(!m.current&&n.current){const C=A.current==="right"?i:-i;let a=parseFloat(n.current.getAttribute("startOffset")||"0")+C;const b=s;a<=-b&&(a+=b),a>0&&(a-=b),n.current.setAttribute("startOffset",a+"px"),P(a)}r=requestAnimationFrame(x)};return r=requestAnimationFrame(x),()=>cancelAnimationFrame(r)},[s,i,h]);const M=r=>{l&&(m.current=!0,w.current=r.clientX,O.current=0,r.target.setPointerCapture(r.pointerId))},j=r=>{if(!l||!m.current||!n.current)return;const x=r.clientX-w.current;w.current=r.clientX,O.current=x;let c=parseFloat(n.current.getAttribute("startOffset")||"0")+x;const a=s;c<=-a&&(c+=a),c>0&&(c-=a),n.current.setAttribute("startOffset",c+"px"),P(c)},T=()=>{l&&(m.current=!1,A.current=O.current>0?"right":"left")},X=l?m.current?"grabbing":"grab":"auto";return e.jsx("div",{className:"curved-loop-jacket",style:{visibility:h?"visible":"hidden",cursor:X},onPointerDown:M,onPointerMove:j,onPointerUp:T,onPointerLeave:T,children:e.jsxs("svg",{className:"curved-loop-svg",viewBox:"0 0 1440 120",children:[e.jsx("text",{ref:d,xmlSpace:"preserve",style:{visibility:"hidden",opacity:0,pointerEvents:"none"},children:o}),e.jsx("defs",{children:e.jsx("path",{ref:R,id:y,d:q,fill:"none",stroke:"transparent"})}),h&&e.jsx("text",{fontWeight:"bold",xmlSpace:"preserve",className:p,children:e.jsx("textPath",{ref:n,href:`#${y}`,startOffset:E+"px",xmlSpace:"preserve",children:D})})]})})},ce=()=>{const[u,i]=V(),[p,v]=t.useState("Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"),[g,l]=t.useState(2),[o,d]=t.useState(400),[n,R]=t.useState(!0),s=[{name:"marqueeText",type:"string",default:'""',description:"The text to display in the curved marquee"},{name:"speed",type:"number",default:"2",description:"Animation speed of the marquee text"},{name:"className",type:"string",default:"undefined",description:"CSS class name for styling the text"},{name:"curveAmount",type:"number",default:"400",description:"Amount of curve in the text path"},{name:"direction",type:'"left" | "right"',default:'"left"',description:"Initial direction of the marquee animation"},{name:"interactive",type:"boolean",default:"true",description:"Whether the marquee can be dragged by the user"}];return e.jsxs(F,{children:[e.jsxs(I,{children:[e.jsx(N,{position:"relative",className:"demo-container",h:500,overflow:"hidden",p:0,children:e.jsx(Z,{marqueeText:p,speed:g,curveAmount:o,interactive:n},u)}),e.jsxs(W,{children:[e.jsx(G,{title:"Marquee Text",value:p,placeholder:"Enter text...",width:300,onChange:f=>{v(f),i()}}),e.jsx(L,{title:"Speed",min:0,max:10,step:.1,value:g,onChange:f=>{l(f),i()}}),e.jsx(L,{title:"Curve Amount",min:-400,max:400,step:10,value:o,valueUnit:"px",onChange:f=>{d(f),i()}}),e.jsx(U,{title:"Draggable",isChecked:n,onChange:f=>{R(f),i()}})]}),e.jsx($,{data:s})]}),e.jsx(k,{children:e.jsx(B,{codeObject:Y})})]})};export{ce as default};
