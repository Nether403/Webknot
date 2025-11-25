import{j as r,r as a,B as R,T as x,F as k}from"./index-wsKSLPNH.js";import{T as O,P as I,a as z,C as w,b as P}from"./PropTable-C4uPWs8h.js";import{C as G}from"./Customize-1m_ZNqR9.js";import{P as v}from"./PreviewSlider-m1G_aiYP.js";import{P as A}from"./PreviewSwitch-DqnF708j.js";import"./index-Bpz4cGEA.js";const H=`import './GlareHover.css';\r
\r
const GlareHover = ({\r
  width = '500px',\r
  height = '500px',\r
  background = '#000',\r
  borderRadius = '10px',\r
  borderColor = '#333',\r
  children,\r
  glareColor = '#ffffff',\r
  glareOpacity = 0.5,\r
  glareAngle = -45,\r
  glareSize = 250,\r
  transitionDuration = 650,\r
  playOnce = false,\r
  className = '',\r
  style = {}\r
}) => {\r
  const hex = glareColor.replace('#', '');\r
  let rgba = glareColor;\r
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {\r
    const r = parseInt(hex.slice(0, 2), 16);\r
    const g = parseInt(hex.slice(2, 4), 16);\r
    const b = parseInt(hex.slice(4, 6), 16);\r
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;\r
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {\r
    const r = parseInt(hex[0] + hex[0], 16);\r
    const g = parseInt(hex[1] + hex[1], 16);\r
    const b = parseInt(hex[2] + hex[2], 16);\r
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;\r
  }\r
\r
  const vars = {\r
    '--gh-width': width,\r
    '--gh-height': height,\r
    '--gh-bg': background,\r
    '--gh-br': borderRadius,\r
    '--gh-angle': \`\${glareAngle}deg\`,\r
    '--gh-duration': \`\${transitionDuration}ms\`,\r
    '--gh-size': \`\${glareSize}%\`,\r
    '--gh-rgba': rgba,\r
    '--gh-border': borderColor\r
  };\r
\r
  return (\r
    <div\r
      className={\`glare-hover \${playOnce ? 'glare-hover--play-once' : ''} \${className}\`}\r
      style={{ ...vars, ...style }}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default GlareHover;\r
`,T=`.glare-hover {\r
  width: var(--gh-width);\r
  height: var(--gh-height);\r
  background: var(--gh-bg);\r
  border-radius: var(--gh-br);\r
  border: 1px solid var(--gh-border);\r
  overflow: hidden;\r
  position: relative;\r
  display: grid;\r
  place-items: center;\r
}\r
\r
.glare-hover::before {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  background: linear-gradient(\r
    var(--gh-angle),\r
    hsla(0, 0%, 0%, 0) 60%,\r
    var(--gh-rgba) 70%,\r
    hsla(0, 0%, 0%, 0),\r
    hsla(0, 0%, 0%, 0) 100%\r
  );\r
  transition: var(--gh-duration) ease;\r
  background-size:\r
    var(--gh-size) var(--gh-size),\r
    100% 100%;\r
  background-repeat: no-repeat;\r
  background-position:\r
    -100% -100%,\r
    0 0;\r
}\r
\r
.glare-hover:hover {\r
  cursor: pointer;\r
}\r
\r
.glare-hover:hover::before {\r
  background-position:\r
    100% 100%,\r
    0 0;\r
}\r
\r
.glare-hover--play-once::before {\r
  transition: none;\r
}\r
\r
.glare-hover--play-once:hover::before {\r
  transition: var(--gh-duration) ease;\r
  background-position:\r
    100% 100%,\r
    0 0;\r
}\r
`,j=`import { useRef } from 'react';\r
\r
const GlareHover = ({\r
  width = '500px',\r
  height = '500px',\r
  background = '#000',\r
  borderRadius = '10px',\r
  borderColor = '#333',\r
  children,\r
  glareColor = '#ffffff',\r
  glareOpacity = 0.5,\r
  glareAngle = -45,\r
  glareSize = 250,\r
  transitionDuration = 650,\r
  playOnce = false,\r
  className = '',\r
  style = {}\r
}) => {\r
  const hex = glareColor.replace('#', '');\r
  let rgba = glareColor;\r
  if (/^[\\dA-Fa-f]{6}$/.test(hex)) {\r
    const r = parseInt(hex.slice(0, 2), 16);\r
    const g = parseInt(hex.slice(2, 4), 16);\r
    const b = parseInt(hex.slice(4, 6), 16);\r
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;\r
  } else if (/^[\\dA-Fa-f]{3}$/.test(hex)) {\r
    const r = parseInt(hex[0] + hex[0], 16);\r
    const g = parseInt(hex[1] + hex[1], 16);\r
    const b = parseInt(hex[2] + hex[2], 16);\r
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;\r
  }\r
\r
  const overlayRef = useRef(null);\r
\r
  const animateIn = () => {\r
    const el = overlayRef.current;\r
    if (!el) return;\r
\r
    el.style.transition = 'none';\r
    el.style.backgroundPosition = '-100% -100%, 0 0';\r
    el.style.transition = \`\${transitionDuration}ms ease\`;\r
    el.style.backgroundPosition = '100% 100%, 0 0';\r
  };\r
\r
  const animateOut = () => {\r
    const el = overlayRef.current;\r
    if (!el) return;\r
\r
    if (playOnce) {\r
      el.style.transition = 'none';\r
      el.style.backgroundPosition = '-100% -100%, 0 0';\r
    } else {\r
      el.style.transition = \`\${transitionDuration}ms ease\`;\r
      el.style.backgroundPosition = '-100% -100%, 0 0';\r
    }\r
  };\r
\r
  const overlayStyle = {\r
    position: 'absolute',\r
    inset: 0,\r
    background: \`linear-gradient(\${glareAngle}deg,\r
        hsla(0,0%,0%,0) 60%,\r
        \${rgba} 70%,\r
        hsla(0,0%,0%,0) 100%)\`,\r
    backgroundSize: \`\${glareSize}% \${glareSize}%, 100% 100%\`,\r
    backgroundRepeat: 'no-repeat',\r
    backgroundPosition: '-100% -100%, 0 0',\r
    pointerEvents: 'none'\r
  };\r
\r
  return (\r
    <div\r
      className={\`relative grid place-items-center overflow-hidden border cursor-pointer \${className}\`}\r
      style={{\r
        width,\r
        height,\r
        background,\r
        borderRadius,\r
        borderColor,\r
        ...style\r
      }}\r
      onMouseEnter={animateIn}\r
      onMouseLeave={animateOut}\r
    >\r
      <div ref={overlayRef} style={overlayStyle} />\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default GlareHover;\r
`,D=`import React from 'react';\r
import './GlareHover.css';\r
\r
interface GlareHoverProps {\r
  width?: string;\r
  height?: string;\r
  background?: string;\r
  borderRadius?: string;\r
  borderColor?: string;\r
  children?: React.ReactNode;\r
  glareColor?: string;\r
  glareOpacity?: number;\r
  glareAngle?: number;\r
  glareSize?: number;\r
  transitionDuration?: number;\r
  playOnce?: boolean;\r
  className?: string;\r
  style?: React.CSSProperties;\r
}\r
\r
const GlareHover: React.FC<GlareHoverProps> = ({\r
  width = '500px',\r
  height = '500px',\r
  background = '#000',\r
  borderRadius = '10px',\r
  borderColor = '#333',\r
  children,\r
  glareColor = '#ffffff',\r
  glareOpacity = 0.5,\r
  glareAngle = -45,\r
  glareSize = 250,\r
  transitionDuration = 650,\r
  playOnce = false,\r
  className = '',\r
  style = {}\r
}) => {\r
  const hex = glareColor.replace('#', '');\r
  let rgba = glareColor;\r
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {\r
    const r = parseInt(hex.slice(0, 2), 16);\r
    const g = parseInt(hex.slice(2, 4), 16);\r
    const b = parseInt(hex.slice(4, 6), 16);\r
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;\r
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {\r
    const r = parseInt(hex[0] + hex[0], 16);\r
    const g = parseInt(hex[1] + hex[1], 16);\r
    const b = parseInt(hex[2] + hex[2], 16);\r
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;\r
  }\r
\r
  const vars: React.CSSProperties & { [k: string]: string } = {\r
    '--gh-width': width,\r
    '--gh-height': height,\r
    '--gh-bg': background,\r
    '--gh-br': borderRadius,\r
    '--gh-angle': \`\${glareAngle}deg\`,\r
    '--gh-duration': \`\${transitionDuration}ms\`,\r
    '--gh-size': \`\${glareSize}%\`,\r
    '--gh-rgba': rgba,\r
    '--gh-border': borderColor\r
  };\r
\r
  return (\r
    <div\r
      className={\`glare-hover \${playOnce ? 'glare-hover--play-once' : ''} \${className}\`}\r
      style={{ ...vars, ...style } as React.CSSProperties}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default GlareHover;\r
`,N=`import React, { useRef } from 'react';\r
\r
interface GlareHoverProps {\r
  width?: string;\r
  height?: string;\r
  background?: string;\r
  borderRadius?: string;\r
  borderColor?: string;\r
  children?: React.ReactNode;\r
  glareColor?: string;\r
  glareOpacity?: number;\r
  glareAngle?: number;\r
  glareSize?: number;\r
  transitionDuration?: number;\r
  playOnce?: boolean;\r
  className?: string;\r
  style?: React.CSSProperties;\r
}\r
\r
const GlareHover: React.FC<GlareHoverProps> = ({\r
  width = '500px',\r
  height = '500px',\r
  background = '#000',\r
  borderRadius = '10px',\r
  borderColor = '#333',\r
  children,\r
  glareColor = '#ffffff',\r
  glareOpacity = 0.5,\r
  glareAngle = -45,\r
  glareSize = 250,\r
  transitionDuration = 650,\r
  playOnce = false,\r
  className = '',\r
  style = {}\r
}) => {\r
  const hex = glareColor.replace('#', '');\r
  let rgba = glareColor;\r
  if (/^[\\dA-Fa-f]{6}$/.test(hex)) {\r
    const r = parseInt(hex.slice(0, 2), 16);\r
    const g = parseInt(hex.slice(2, 4), 16);\r
    const b = parseInt(hex.slice(4, 6), 16);\r
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;\r
  } else if (/^[\\dA-Fa-f]{3}$/.test(hex)) {\r
    const r = parseInt(hex[0] + hex[0], 16);\r
    const g = parseInt(hex[1] + hex[1], 16);\r
    const b = parseInt(hex[2] + hex[2], 16);\r
    rgba = \`rgba(\${r}, \${g}, \${b}, \${glareOpacity})\`;\r
  }\r
\r
  const overlayRef = useRef<HTMLDivElement | null>(null);\r
\r
  const animateIn = () => {\r
    const el = overlayRef.current;\r
    if (!el) return;\r
\r
    el.style.transition = 'none';\r
    el.style.backgroundPosition = '-100% -100%, 0 0';\r
    el.style.transition = \`\${transitionDuration}ms ease\`;\r
    el.style.backgroundPosition = '100% 100%, 0 0';\r
  };\r
\r
  const animateOut = () => {\r
    const el = overlayRef.current;\r
    if (!el) return;\r
\r
    if (playOnce) {\r
      el.style.transition = 'none';\r
      el.style.backgroundPosition = '-100% -100%, 0 0';\r
    } else {\r
      el.style.transition = \`\${transitionDuration}ms ease\`;\r
      el.style.backgroundPosition = '-100% -100%, 0 0';\r
    }\r
  };\r
\r
  const overlayStyle: React.CSSProperties = {\r
    position: 'absolute',\r
    inset: 0,\r
    background: \`linear-gradient(\${glareAngle}deg,\r
        hsla(0,0%,0%,0) 60%,\r
        \${rgba} 70%,\r
        hsla(0,0%,0%,0) 100%)\`,\r
    backgroundSize: \`\${glareSize}% \${glareSize}%, 100% 100%\`,\r
    backgroundRepeat: 'no-repeat',\r
    backgroundPosition: '-100% -100%, 0 0',\r
    pointerEvents: 'none'\r
  };\r
\r
  return (\r
    <div\r
      className={\`relative grid place-items-center overflow-hidden border cursor-pointer \${className}\`}\r
      style={{\r
        width,\r
        height,\r
        background,\r
        borderRadius,\r
        borderColor,\r
        ...style\r
      }}\r
      onMouseEnter={animateIn}\r
      onMouseLeave={animateOut}\r
    >\r
      <div ref={overlayRef} style={overlayStyle} />\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default GlareHover;\r
`,F={usage:`import GlareHover from './GlareHover'

<div style={{ height: '600px', position: 'relative' }}>
  <GlareHover
    glareColor="#ffffff"
    glareOpacity={0.3}
    glareAngle={-30}
    glareSize={300}
    transitionDuration={800}
    playOnce={false}
  >
    <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#333', margin: 0 }}>
      Hover Me
    </h2>
  </GlareHover>
</div>`,code:H,css:T,tailwind:j,tsCode:D,tsTailwind:N},E=({width:o="500px",height:c="500px",background:s="#000",borderRadius:h="10px",borderColor:i="#333",children:d,glareColor:n="#ffffff",glareOpacity:l=.5,glareAngle:g=-45,glareSize:p=250,transitionDuration:u=650,playOnce:t=!1,className:$="",style:C={}})=>{const e=n.replace("#","");let f=n;if(/^[0-9A-Fa-f]{6}$/.test(e)){const b=parseInt(e.slice(0,2),16),m=parseInt(e.slice(2,4),16),y=parseInt(e.slice(4,6),16);f=`rgba(${b}, ${m}, ${y}, ${l})`}else if(/^[0-9A-Fa-f]{3}$/.test(e)){const b=parseInt(e[0]+e[0],16),m=parseInt(e[1]+e[1],16),y=parseInt(e[2]+e[2],16);f=`rgba(${b}, ${m}, ${y}, ${l})`}const S={"--gh-width":o,"--gh-height":c,"--gh-bg":s,"--gh-br":h,"--gh-angle":`${g}deg`,"--gh-duration":`${u}ms`,"--gh-size":`${p}%`,"--gh-rgba":f,"--gh-border":i};return r.jsx("div",{className:`glare-hover ${t?"glare-hover--play-once":""} ${$}`,style:{...S,...C},children:d})},J=()=>{const[o,c]=a.useState("#ffffff"),[s,h]=a.useState(.3),[i,d]=a.useState(300),[n,l]=a.useState(800),[g,p]=a.useState(!1),u=[{name:"width",type:"string",default:"500px",description:"The width of the hover element."},{name:"height",type:"string",default:"500px",description:"The height of the hover element."},{name:"background",type:"string",default:"#000",description:"The background color of the element."},{name:"borderRadius",type:"string",default:"10px",description:"The border radius of the element."},{name:"borderColor",type:"string",default:"#333",description:"The border color of the element."},{name:"children",type:"React.ReactNode",default:"undefined",description:"The content to display inside the glare hover element."},{name:"glareColor",type:"string",default:"#ffffff",description:"The color of the glare effect (hex format)."},{name:"glareOpacity",type:"number",default:"0.5",description:"The opacity of the glare effect (0-1)."},{name:"glareAngle",type:"number",default:"-45",description:"The angle of the glare effect in degrees."},{name:"glareSize",type:"number",default:"250",description:"The size of the glare effect as a percentage (e.g. 250 = 250%)."},{name:"transitionDuration",type:"number",default:"650",description:"The duration of the transition in milliseconds."},{name:"playOnce",type:"boolean",default:"false",description:"If true, the glare only animates on hover and doesn't return on mouse leave."},{name:"className",type:"string",default:'""',description:"Additional CSS class names."},{name:"style",type:"React.CSSProperties",default:"{}",description:"Additional inline styles."}];return r.jsxs(O,{children:[r.jsxs(I,{children:[r.jsx(R,{position:"relative",className:"demo-container",h:600,overflow:"hidden",children:r.jsx(E,{background:"#060010",borderColor:"#271E37",borderRadius:"20px",width:"400px",height:"300px",glareColor:o,glareOpacity:s,glareSize:i,transitionDuration:n,playOnce:g,children:r.jsx(x,{textAlign:"center",fontSize:"3rem",fontWeight:"900",color:"#271E37",m:0,children:"Hover Me"})})}),r.jsxs(G,{children:[r.jsxs(k,{gap:4,align:"center",mt:4,children:[r.jsx(x,{fontSize:"sm",children:"Glare Color"}),r.jsx("input",{type:"color",value:o,onChange:t=>c(t.target.value),style:{height:"22px",outline:"none",border:"none",width:"50px"}})]}),r.jsx(v,{title:"Glare Opacity",min:0,max:1,step:.1,value:s,onChange:h}),r.jsx(v,{title:"Glare Size",min:100,max:500,step:25,value:i,onChange:d,valueUnit:"%"}),r.jsx(v,{title:"Transition Duration",min:200,max:2e3,step:50,value:n,onChange:l,valueUnit:"ms"}),r.jsx(A,{title:"Play Once",isChecked:g,onChange:t=>p(t)})]}),r.jsx(z,{data:u})]}),r.jsx(w,{children:r.jsx(P,{codeObject:F})})]})};export{J as default};
