import{r as f,j as e,B as i,F as a,ak as l,T as n}from"./index-wsKSLPNH.js";import{d as g}from"./index-76PpzJQ4.js";import{b as v}from"./index-Dgof5MVj.js";import{T as x,P as y,a as b,C,b as M}from"./PropTable-C4uPWs8h.js";import"./index-Bpz4cGEA.js";const c=({children:t,className:d="",spotlightColor:u="rgba(255, 255, 255, 0.25)"})=>{const r=f.useRef(null),p=o=>{const s=r.current.getBoundingClientRect(),h=o.clientX-s.left,m=o.clientY-s.top;r.current.style.setProperty("--mouse-x",`${h}px`),r.current.style.setProperty("--mouse-y",`${m}px`),r.current.style.setProperty("--spotlight-color",u)};return e.jsx("div",{ref:r,onMouseMove:p,className:`card-spotlight ${d}`,children:t})},R=`import { useRef } from 'react';\r
import './SpotlightCard.css';\r
\r
const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {\r
  const divRef = useRef(null);\r
\r
  const handleMouseMove = e => {\r
    const rect = divRef.current.getBoundingClientRect();\r
    const x = e.clientX - rect.left;\r
    const y = e.clientY - rect.top;\r
\r
    divRef.current.style.setProperty('--mouse-x', \`\${x}px\`);\r
    divRef.current.style.setProperty('--mouse-y', \`\${y}px\`);\r
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);\r
  };\r
\r
  return (\r
    <div ref={divRef} onMouseMove={handleMouseMove} className={\`card-spotlight \${className}\`}>\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default SpotlightCard;\r
`,S=`.card-spotlight {\r
  position: relative;\r
  border-radius: 1.5rem;\r
  border: 1px solid #222;\r
  background-color: #111;\r
  padding: 2rem;\r
  overflow: hidden;\r
  --mouse-x: 50%;\r
  --mouse-y: 50%;\r
  --spotlight-color: rgba(255, 255, 255, 0.05);\r
}\r
\r
.card-spotlight::before {\r
  content: '';\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  bottom: 0;\r
  background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%);\r
  opacity: 0;\r
  transition: opacity 0.5s ease;\r
  pointer-events: none;\r
}\r
\r
.card-spotlight:hover::before,\r
.card-spotlight:focus-within::before {\r
  opacity: 0.6;\r
}\r
`,P=`import { useRef, useState } from 'react';\r
\r
const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {\r
  const divRef = useRef(null);\r
  const [isFocused, setIsFocused] = useState(false);\r
  const [position, setPosition] = useState({ x: 0, y: 0 });\r
  const [opacity, setOpacity] = useState(0);\r
\r
  const handleMouseMove = e => {\r
    if (!divRef.current || isFocused) return;\r
\r
    const rect = divRef.current.getBoundingClientRect();\r
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });\r
  };\r
\r
  const handleFocus = () => {\r
    setIsFocused(true);\r
    setOpacity(0.6);\r
  };\r
\r
  const handleBlur = () => {\r
    setIsFocused(false);\r
    setOpacity(0);\r
  };\r
\r
  const handleMouseEnter = () => {\r
    setOpacity(0.6);\r
  };\r
\r
  const handleMouseLeave = () => {\r
    setOpacity(0);\r
  };\r
\r
  return (\r
    <div\r
      ref={divRef}\r
      onMouseMove={handleMouseMove}\r
      onFocus={handleFocus}\r
      onBlur={handleBlur}\r
      onMouseEnter={handleMouseEnter}\r
      onMouseLeave={handleMouseLeave}\r
      className={\`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 \${className}\`}\r
    >\r
      <div\r
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"\r
        style={{\r
          opacity,\r
          background: \`radial-gradient(circle at \${position.x}px \${position.y}px, \${spotlightColor}, transparent 80%)\`\r
        }}\r
      />\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default SpotlightCard;\r
`,$=`import React, { useRef } from 'react';\r
import './SpotlightCard.css';\r
\r
interface Position {\r
  x: number;\r
  y: number;\r
}\r
\r
interface SpotlightCardProps extends React.PropsWithChildren {\r
  className?: string;\r
  spotlightColor?: \`rgba(\${number}, \${number}, \${number}, \${number})\`;\r
}\r
\r
const SpotlightCard: React.FC<SpotlightCardProps> = ({\r
  children,\r
  className = '',\r
  spotlightColor = 'rgba(255, 255, 255, 0.25)'\r
}) => {\r
  const divRef = useRef<HTMLDivElement>(null);\r
\r
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {\r
    if (!divRef.current) return;\r
\r
    const rect = divRef.current.getBoundingClientRect();\r
    const x = e.clientX - rect.left;\r
    const y = e.clientY - rect.top;\r
\r
    divRef.current.style.setProperty('--mouse-x', \`\${x}px\`);\r
    divRef.current.style.setProperty('--mouse-y', \`\${y}px\`);\r
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);\r
  };\r
\r
  return (\r
    <div ref={divRef} onMouseMove={handleMouseMove} className={\`card-spotlight \${className}\`}>\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default SpotlightCard;\r
`,j=`import React, { useRef, useState } from 'react';\r
\r
interface Position {\r
  x: number;\r
  y: number;\r
}\r
\r
interface SpotlightCardProps extends React.PropsWithChildren {\r
  className?: string;\r
  spotlightColor?: \`rgba(\${number}, \${number}, \${number}, \${number})\`;\r
}\r
\r
const SpotlightCard: React.FC<SpotlightCardProps> = ({\r
  children,\r
  className = '',\r
  spotlightColor = 'rgba(255, 255, 255, 0.25)'\r
}) => {\r
  const divRef = useRef<HTMLDivElement>(null);\r
  const [isFocused, setIsFocused] = useState<boolean>(false);\r
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });\r
  const [opacity, setOpacity] = useState<number>(0);\r
\r
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {\r
    if (!divRef.current || isFocused) return;\r
\r
    const rect = divRef.current.getBoundingClientRect();\r
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });\r
  };\r
\r
  const handleFocus = () => {\r
    setIsFocused(true);\r
    setOpacity(0.6);\r
  };\r
\r
  const handleBlur = () => {\r
    setIsFocused(false);\r
    setOpacity(0);\r
  };\r
\r
  const handleMouseEnter = () => {\r
    setOpacity(0.6);\r
  };\r
\r
  const handleMouseLeave = () => {\r
    setOpacity(0);\r
  };\r
\r
  return (\r
    <div\r
      ref={divRef}\r
      onMouseMove={handleMouseMove}\r
      onFocus={handleFocus}\r
      onBlur={handleBlur}\r
      onMouseEnter={handleMouseEnter}\r
      onMouseLeave={handleMouseLeave}\r
      className={\`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 \${className}\`}\r
    >\r
      <div\r
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"\r
        style={{\r
          opacity,\r
          background: \`radial-gradient(circle at \${position.x}px \${position.y}px, \${spotlightColor}, transparent 80%)\`\r
        }}\r
      />\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default SpotlightCard;\r
`,N={usage:`import SpotlightCard from './SpotlightCard';
  
<SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
  // Content goes here
</SpotlightCard>`,code:R,css:S,tailwind:P,tsCode:$,tsTailwind:j},T=()=>{const t=[{name:"spotlightColor",type:"string",default:"rgba(255, 255, 255, 0.25)",description:"Controls the color of the radial gradient used for the spotlight effect."},{name:"className",type:"string",default:"",description:"Allows adding custom classes to the component."}];return e.jsxs(x,{children:[e.jsxs(y,{children:[e.jsx(i,{position:"relative",className:"demo-container",py:10,children:e.jsx(c,{className:"custom-spotlight-card",children:e.jsxs(a,{h:"100%",direction:"column",alignItems:"flex-start",justifyContent:"center",children:[e.jsx(l,{mb:3,boxSize:12,as:g}),e.jsx(n,{fontWeight:600,fontSize:"1.4rem",letterSpacing:"-.5px",children:"Boost Your Experience"}),e.jsx(n,{color:"#a1a1aa",fontSize:"14px",mt:1,mb:8,children:"Get exclusive benefits, features & 24/7 support as a permanent club member."})]})})}),e.jsx("h2",{className:"demo-title-extra",children:"Custom Color"}),e.jsx(i,{position:"relative",className:"demo-container",py:10,children:e.jsx(c,{className:"custom-spotlight-card",spotlightColor:"purple",children:e.jsxs(a,{h:"100%",direction:"column",alignItems:"flex-start",justifyContent:"center",children:[e.jsx(l,{mb:3,boxSize:8,as:v}),e.jsx(n,{fontWeight:600,fontSize:"1.4rem",letterSpacing:"-.5px",children:"Enhanced Security"}),e.jsx(n,{color:"#a1a1aa",fontSize:"14px",mt:1,mb:8,children:"Our state of the art software offers peace of mind through strict security measures."})]})})}),e.jsx(b,{data:t})]}),e.jsx(C,{children:e.jsx(M,{codeObject:N})})]})};export{T as default};
