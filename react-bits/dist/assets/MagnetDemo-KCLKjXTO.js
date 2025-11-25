import{r as e,j as n,B as M,F as S,T as j}from"./index-wsKSLPNH.js";import{T as L,P as H,a as I,C as D,b as $}from"./PropTable-C4uPWs8h.js";import{P as y}from"./PreviewSlider-m1G_aiYP.js";import{P as B}from"./PreviewSwitch-DqnF708j.js";import{C as k}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";const w=({children:r,padding:s=100,disabled:t=!1,magnetStrength:i=2,activeTransition:a="transform 0.3s ease-out",inactiveTransition:c="transform 0.5s ease-in-out",wrapperClassName:l="",innerClassName:d="",...C})=>{const[R,u]=e.useState(!1),[p,m]=e.useState({x:0,y:0}),f=e.useRef(null);e.useEffect(()=>{if(t){m({x:0,y:0});return}const g=o=>{if(!f.current)return;const{left:N,top:Y,width:h,height:v}=f.current.getBoundingClientRect(),x=N+h/2,b=Y+v/2,T=Math.abs(x-o.clientX),P=Math.abs(b-o.clientY);if(T<h/2+s&&P<v/2+s){u(!0);const E=(o.clientX-x)/i,A=(o.clientY-b)/i;m({x:E,y:A})}else u(!1),m({x:0,y:0})};return window.addEventListener("mousemove",g),()=>{window.removeEventListener("mousemove",g)}},[s,t,i]);const X=R?a:c;return n.jsx("div",{ref:f,className:l,style:{position:"relative",display:"inline-block"},...C,children:n.jsx("div",{className:d,style:{transform:`translate3d(${p.x}px, ${p.y}px, 0)`,transition:X,willChange:"transform"},children:r})})},F=`import { useState, useEffect, useRef } from 'react';\r
\r
const Magnet = ({\r
  children,\r
  padding = 100,\r
  disabled = false,\r
  magnetStrength = 2,\r
  activeTransition = 'transform 0.3s ease-out',\r
  inactiveTransition = 'transform 0.5s ease-in-out',\r
  wrapperClassName = '',\r
  innerClassName = '',\r
  ...props\r
}) => {\r
  const [isActive, setIsActive] = useState(false);\r
  const [position, setPosition] = useState({ x: 0, y: 0 });\r
  const magnetRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (disabled) {\r
      setPosition({ x: 0, y: 0 });\r
      return;\r
    }\r
\r
    const handleMouseMove = e => {\r
      if (!magnetRef.current) return;\r
\r
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();\r
      const centerX = left + width / 2;\r
      const centerY = top + height / 2;\r
\r
      const distX = Math.abs(centerX - e.clientX);\r
      const distY = Math.abs(centerY - e.clientY);\r
\r
      if (distX < width / 2 + padding && distY < height / 2 + padding) {\r
        setIsActive(true);\r
\r
        const offsetX = (e.clientX - centerX) / magnetStrength;\r
        const offsetY = (e.clientY - centerY) / magnetStrength;\r
        setPosition({ x: offsetX, y: offsetY });\r
      } else {\r
        setIsActive(false);\r
        setPosition({ x: 0, y: 0 });\r
      }\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
    };\r
  }, [padding, disabled, magnetStrength]);\r
\r
  const transitionStyle = isActive ? activeTransition : inactiveTransition;\r
\r
  return (\r
    <div\r
      ref={magnetRef}\r
      className={wrapperClassName}\r
      style={{ position: 'relative', display: 'inline-block' }}\r
      {...props}\r
    >\r
      <div\r
        className={innerClassName}\r
        style={{\r
          transform: \`translate3d(\${position.x}px, \${position.y}px, 0)\`,\r
          transition: transitionStyle,\r
          willChange: 'transform'\r
        }}\r
      >\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Magnet;\r
`,z=`import { useState, useEffect, useRef } from 'react';\r
\r
const Magnet = ({\r
  children,\r
  padding = 100,\r
  disabled = false,\r
  magnetStrength = 2,\r
  activeTransition = 'transform 0.3s ease-out',\r
  inactiveTransition = 'transform 0.5s ease-in-out',\r
  wrapperClassName = '',\r
  innerClassName = '',\r
  ...props\r
}) => {\r
  const [isActive, setIsActive] = useState(false);\r
  const [position, setPosition] = useState({ x: 0, y: 0 });\r
  const magnetRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (disabled) {\r
      setPosition({ x: 0, y: 0 });\r
      return;\r
    }\r
\r
    const handleMouseMove = e => {\r
      if (!magnetRef.current) return;\r
\r
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();\r
      const centerX = left + width / 2;\r
      const centerY = top + height / 2;\r
\r
      const distX = Math.abs(centerX - e.clientX);\r
      const distY = Math.abs(centerY - e.clientY);\r
\r
      if (distX < width / 2 + padding && distY < height / 2 + padding) {\r
        setIsActive(true);\r
\r
        const offsetX = (e.clientX - centerX) / magnetStrength;\r
        const offsetY = (e.clientY - centerY) / magnetStrength;\r
        setPosition({ x: offsetX, y: offsetY });\r
      } else {\r
        setIsActive(false);\r
        setPosition({ x: 0, y: 0 });\r
      }\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
    };\r
  }, [padding, disabled, magnetStrength]);\r
\r
  const transitionStyle = isActive ? activeTransition : inactiveTransition;\r
\r
  return (\r
    <div\r
      ref={magnetRef}\r
      className={wrapperClassName}\r
      style={{ position: 'relative', display: 'inline-block' }}\r
      {...props}\r
    >\r
      <div\r
        className={innerClassName}\r
        style={{\r
          transform: \`translate3d(\${position.x}px, \${position.y}px, 0)\`,\r
          transition: transitionStyle,\r
          willChange: 'transform'\r
        }}\r
      >\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Magnet;\r
`,O=`import React, { useState, useEffect, useRef, ReactNode, HTMLAttributes } from 'react';\r
\r
interface MagnetProps extends HTMLAttributes<HTMLDivElement> {\r
  children: ReactNode;\r
  padding?: number;\r
  disabled?: boolean;\r
  magnetStrength?: number;\r
  activeTransition?: string;\r
  inactiveTransition?: string;\r
  wrapperClassName?: string;\r
  innerClassName?: string;\r
}\r
\r
const Magnet: React.FC<MagnetProps> = ({\r
  children,\r
  padding = 100,\r
  disabled = false,\r
  magnetStrength = 2,\r
  activeTransition = 'transform 0.3s ease-out',\r
  inactiveTransition = 'transform 0.5s ease-in-out',\r
  wrapperClassName = '',\r
  innerClassName = '',\r
  ...props\r
}) => {\r
  const [isActive, setIsActive] = useState<boolean>(false);\r
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });\r
  const magnetRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    if (disabled) {\r
      setPosition({ x: 0, y: 0 });\r
      return;\r
    }\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!magnetRef.current) return;\r
\r
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();\r
      const centerX = left + width / 2;\r
      const centerY = top + height / 2;\r
\r
      const distX = Math.abs(centerX - e.clientX);\r
      const distY = Math.abs(centerY - e.clientY);\r
\r
      if (distX < width / 2 + padding && distY < height / 2 + padding) {\r
        setIsActive(true);\r
        const offsetX = (e.clientX - centerX) / magnetStrength;\r
        const offsetY = (e.clientY - centerY) / magnetStrength;\r
        setPosition({ x: offsetX, y: offsetY });\r
      } else {\r
        setIsActive(false);\r
        setPosition({ x: 0, y: 0 });\r
      }\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
    };\r
  }, [padding, disabled, magnetStrength]);\r
\r
  const transitionStyle = isActive ? activeTransition : inactiveTransition;\r
\r
  return (\r
    <div\r
      ref={magnetRef}\r
      className={wrapperClassName}\r
      style={{ position: 'relative', display: 'inline-block' }}\r
      {...props}\r
    >\r
      <div\r
        className={innerClassName}\r
        style={{\r
          transform: \`translate3d(\${position.x}px, \${position.y}px, 0)\`,\r
          transition: transitionStyle,\r
          willChange: 'transform'\r
        }}\r
      >\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Magnet;\r
`,G=`import React, { useState, useEffect, useRef, ReactNode, HTMLAttributes } from 'react';\r
\r
interface MagnetProps extends HTMLAttributes<HTMLDivElement> {\r
  children: ReactNode;\r
  padding?: number;\r
  disabled?: boolean;\r
  magnetStrength?: number;\r
  activeTransition?: string;\r
  inactiveTransition?: string;\r
  wrapperClassName?: string;\r
  innerClassName?: string;\r
}\r
\r
const Magnet: React.FC<MagnetProps> = ({\r
  children,\r
  padding = 100,\r
  disabled = false,\r
  magnetStrength = 2,\r
  activeTransition = 'transform 0.3s ease-out',\r
  inactiveTransition = 'transform 0.5s ease-in-out',\r
  wrapperClassName = '',\r
  innerClassName = '',\r
  ...props\r
}) => {\r
  const [isActive, setIsActive] = useState<boolean>(false);\r
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });\r
  const magnetRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    if (disabled) {\r
      setPosition({ x: 0, y: 0 });\r
      return;\r
    }\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!magnetRef.current) return;\r
\r
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();\r
      const centerX = left + width / 2;\r
      const centerY = top + height / 2;\r
\r
      const distX = Math.abs(centerX - e.clientX);\r
      const distY = Math.abs(centerY - e.clientY);\r
\r
      if (distX < width / 2 + padding && distY < height / 2 + padding) {\r
        setIsActive(true);\r
        const offsetX = (e.clientX - centerX) / magnetStrength;\r
        const offsetY = (e.clientY - centerY) / magnetStrength;\r
        setPosition({ x: offsetX, y: offsetY });\r
      } else {\r
        setIsActive(false);\r
        setPosition({ x: 0, y: 0 });\r
      }\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
    };\r
  }, [padding, disabled, magnetStrength]);\r
\r
  const transitionStyle = isActive ? activeTransition : inactiveTransition;\r
\r
  return (\r
    <div\r
      ref={magnetRef}\r
      className={wrapperClassName}\r
      style={{ position: 'relative', display: 'inline-block' }}\r
      {...props}\r
    >\r
      <div\r
        className={innerClassName}\r
        style={{\r
          transform: \`translate3d(\${position.x}px, \${position.y}px, 0)\`,\r
          transition: transitionStyle,\r
          willChange: 'transform'\r
        }}\r
      >\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Magnet;\r
`,J={usage:`import Magnet from './Magnet'

<Magnet padding={50} disabled={false} magnetStrength={50}>
  <p>Star React Bits on GitHub!</p>
</Magnet>`,code:F,tailwind:z,tsCode:O,tsTailwind:G},V=()=>{const[r,s]=e.useState(!1),[t,i]=e.useState(100),[a,c]=e.useState(2),l=[{name:"padding",type:"number",default:100,description:"Specifies the distance (in pixels) around the element that activates the magnet pull."},{name:"disabled",type:"boolean",default:!1,description:"Disables the magnet effect when set to true."},{name:"magnetStrength",type:"number",default:2,description:"Controls the strength of the pull; higher values reduce movement, lower values increase it."},{name:"activeTransition",type:"string",default:'"transform 0.3s ease-out"',description:"CSS transition applied to the element when the magnet is active."},{name:"inactiveTransition",type:"string",default:'"transform 0.5s ease-in-out"',description:"CSS transition applied when the magnet is inactive (mouse out of range)."},{name:"wrapperClassName",type:"string",default:'""',description:"Optional CSS class name for the outermost wrapper element."},{name:"innerClassName",type:"string",default:'""',description:"Optional CSS class name for the moving (inner) element."},{name:"children",type:"ReactNode",default:"",description:"The content (JSX) to be displayed inside the magnetized element."}];return n.jsxs(L,{children:[n.jsxs(H,{children:[n.jsx("h2",{className:"demo-title-extra",children:"Container"}),n.jsx(M,{position:"relative",className:"demo-container",minH:300,children:n.jsx(w,{padding:t,disabled:r,magnetStrength:a,children:n.jsx(S,{w:200,h:100,fontSize:"xl",fontWeight:"bolder",color:"#fff",bg:"#060010",border:"1px solid #222",borderRadius:"20px",justifyContent:"center",alignItems:"center",children:"Hover Me!"})})}),n.jsx("h2",{className:"demo-title-extra",children:"Link"}),n.jsx(M,{position:"relative",className:"demo-container",minH:300,children:n.jsx(w,{padding:Math.floor(t/2),disabled:r,magnetStrength:a,children:n.jsx("a",{href:"https://github.com/DavidHDev/react-bits",target:"_blank",rel:"noreferrer",children:n.jsxs(S,{fontSize:"lg",color:"#fff",children:["Star ",n.jsx(j,{color:"#5227FF",children:"React Bits"})," on GitHub!"]})})})}),n.jsxs(k,{children:[n.jsx(B,{title:"Disabled",isChecked:r,onChange:d=>s(d)}),n.jsx(y,{title:"Padding",min:0,max:300,step:10,value:t,valueUnit:"px",onChange:i}),n.jsx(y,{title:"Strength",min:1,max:10,step:1,value:a,onChange:c})]}),n.jsx(I,{data:l})]}),n.jsx(D,{children:n.jsx($,{codeObject:J})})]})};export{V as default};
