import{j as r,r as i,B as l,bX as c,c0 as m,c1 as d,c2 as p,c3 as b,c4 as g}from"./index-wsKSLPNH.js";import{T as u,P as h,a as f,C as x,b as _}from"./PropTable-C4uPWs8h.js";import{C as y}from"./Customize-1m_ZNqR9.js";import{P as k}from"./PreviewSwitch-DqnF708j.js";import"./index-Bpz4cGEA.js";const o={blue:"linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",purple:"linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",red:"linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",indigo:"linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",orange:"linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",green:"linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))"},N=({items:n,className:a})=>{const t=e=>o[e]?{background:o[e]}:{background:e};return r.jsx("div",{className:`icon-btns ${a||""}`,children:n.map((e,s)=>r.jsxs("button",{className:`icon-btn ${e.customClass||""}`,"aria-label":e.label,type:"button",children:[r.jsx("span",{className:"icon-btn__back",style:t(e.color)}),r.jsx("span",{className:"icon-btn__front",children:r.jsx("span",{className:"icon-btn__icon","aria-hidden":"true",children:e.icon})}),r.jsx("span",{className:"icon-btn__label",children:e.label})]},s))})},v=`import './GlassIcons.css';\r
\r
const gradientMapping = {\r
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',\r
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',\r
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',\r
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',\r
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',\r
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'\r
};\r
\r
const GlassIcons = ({ items, className }) => {\r
  const getBackgroundStyle = color => {\r
    if (gradientMapping[color]) {\r
      return { background: gradientMapping[color] };\r
    }\r
    return { background: color };\r
  };\r
\r
  return (\r
    <div className={\`icon-btns \${className || ''}\`}>\r
      {items.map((item, index) => (\r
        <button key={index} className={\`icon-btn \${item.customClass || ''}\`} aria-label={item.label} type="button">\r
          <span className="icon-btn__back" style={getBackgroundStyle(item.color)}></span>\r
          <span className="icon-btn__front">\r
            <span className="icon-btn__icon" aria-hidden="true">\r
              {item.icon}\r
            </span>\r
          </span>\r
          <span className="icon-btn__label">{item.label}</span>\r
        </button>\r
      ))}\r
    </div>\r
  );\r
};\r
\r
export default GlassIcons;\r
`,w=`.icon-btns {\r
  display: grid;\r
  grid-gap: 5em;\r
  grid-template-columns: repeat(2, 1fr);\r
  margin: auto;\r
  padding: 3em 0;\r
  overflow: visible;\r
}\r
\r
.icon-btn {\r
  background-color: transparent;\r
  outline: none;\r
  position: relative;\r
  width: 4.5em;\r
  height: 4.5em;\r
  perspective: 24em;\r
  transform-style: preserve-3d;\r
  -webkit-tap-highlight-color: transparent;\r
}\r
\r
.icon-btn__back,\r
.icon-btn__front,\r
.icon-btn__label {\r
  transition:\r
    opacity 0.3s cubic-bezier(0.83, 0, 0.17, 1),\r
    transform 0.3s cubic-bezier(0.83, 0, 0.17, 1);\r
}\r
\r
.icon-btn__back,\r
.icon-btn__front {\r
  border-radius: 1.25em;\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
}\r
\r
.icon-btn__back {\r
  box-shadow: 0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15);\r
  display: block;\r
  transform: rotate(15deg);\r
  transform-origin: 100% 100%;\r
}\r
\r
.icon-btn__front {\r
  background-color: hsla(0, 0%, 100%, 0.15);\r
  box-shadow: 0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset;\r
  backdrop-filter: blur(0.75em);\r
  -webkit-backdrop-filter: blur(0.75em);\r
  display: flex;\r
  transform-origin: 80% 50%;\r
}\r
\r
.icon-btn__icon {\r
  margin: auto;\r
  width: 1.5em;\r
  height: 1.5em;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.icon-btn__label {\r
  font-size: 1em;\r
  white-space: nowrap;\r
  text-align: center;\r
  line-height: 2;\r
  opacity: 0;\r
  position: absolute;\r
  top: 100%;\r
  right: 0;\r
  left: 0;\r
  transform: translateY(0);\r
}\r
\r
.icon-btn:focus-visible .icon-btn__back,\r
.icon-btn:hover .icon-btn__back {\r
  transform: rotate(25deg) translate3d(-0.5em, -0.5em, 0.5em);\r
}\r
\r
.icon-btn:focus-visible .icon-btn__front,\r
.icon-btn:hover .icon-btn__front {\r
  transform: translateZ(2em);\r
}\r
\r
.icon-btn:focus-visible .icon-btn__label,\r
.icon-btn:hover .icon-btn__label {\r
  opacity: 1;\r
  transform: translateY(20%);\r
}\r
\r
@media (min-width: 768px) {\r
  .icon-btns {\r
    grid-template-columns: repeat(3, 1fr);\r
  }\r
}\r
`,I=`const gradientMapping = {\r
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',\r
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',\r
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',\r
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',\r
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',\r
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'\r
};\r
\r
const GlassIcons = ({ items, className }) => {\r
  const getBackgroundStyle = color => {\r
    if (gradientMapping[color]) {\r
      return { background: gradientMapping[color] };\r
    }\r
    return { background: color };\r
  };\r
\r
  return (\r
    <div className={\`grid gap-[5em] grid-cols-2 md:grid-cols-3 mx-auto py-[3em] overflow-visible \${className || ''}\`}>\r
      {items.map((item, index) => (\r
        <button\r
          key={index}\r
          type="button"\r
          aria-label={item.label}\r
          className={\`relative bg-transparent outline-none w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group \${\r
            item.customClass || ''\r
          }\`}\r
        >\r
          <span\r
            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"\r
            style={{\r
              ...getBackgroundStyle(item.color),\r
              boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)'\r
            }}\r
          ></span>\r
\r
          <span\r
            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"\r
            style={{\r
              boxShadow: '0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset'\r
            }}\r
          >\r
            <span className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center" aria-hidden="true">\r
              {item.icon}\r
            </span>\r
          </span>\r
\r
          <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">\r
            {item.label}\r
          </span>\r
        </button>\r
      ))}\r
    </div>\r
  );\r
};\r
\r
export default GlassIcons;\r
`,j=`import React from 'react';\r
import './GlassIcons.css';\r
\r
export interface GlassIconsItem {\r
  icon: React.ReactElement;\r
  color: string;\r
  label: string;\r
  customClass?: string;\r
}\r
\r
export interface GlassIconsProps {\r
  items: GlassIconsItem[];\r
  className?: string;\r
}\r
\r
const gradientMapping: Record<string, string> = {\r
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',\r
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',\r
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',\r
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',\r
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',\r
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'\r
};\r
\r
const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {\r
  const getBackgroundStyle = (color: string): React.CSSProperties => {\r
    if (gradientMapping[color]) {\r
      return { background: gradientMapping[color] };\r
    }\r
    return { background: color };\r
  };\r
\r
  return (\r
    <div className={\`icon-btns \${className || ''}\`}>\r
      {items.map((item, index) => (\r
        <button key={index} type="button" className={\`icon-btn \${item.customClass || ''}\`} aria-label={item.label}>\r
          <span className="icon-btn__back" style={getBackgroundStyle(item.color)}></span>\r
          <span className="icon-btn__front">\r
            <span className="icon-btn__icon" aria-hidden="true">\r
              {item.icon}\r
            </span>\r
          </span>\r
          <span className="icon-btn__label">{item.label}</span>\r
        </button>\r
      ))}\r
    </div>\r
  );\r
};\r
\r
export default GlassIcons;\r
`,C=`import React from 'react';\r
\r
export interface GlassIconsItem {\r
  icon: React.ReactElement;\r
  color: string;\r
  label: string;\r
  customClass?: string;\r
}\r
\r
export interface GlassIconsProps {\r
  items: GlassIconsItem[];\r
  className?: string;\r
}\r
\r
const gradientMapping: Record<string, string> = {\r
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',\r
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',\r
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',\r
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',\r
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',\r
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'\r
};\r
\r
const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {\r
  const getBackgroundStyle = (color: string): React.CSSProperties => {\r
    if (gradientMapping[color]) {\r
      return { background: gradientMapping[color] };\r
    }\r
    return { background: color };\r
  };\r
\r
  return (\r
    <div className={\`grid gap-[5em] grid-cols-2 md:grid-cols-3 mx-auto py-[3em] overflow-visible \${className || ''}\`}>\r
      {items.map((item, index) => (\r
        <button\r
          key={index}\r
          type="button"\r
          aria-label={item.label}\r
          className={\`relative bg-transparent outline-none w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group \${\r
            item.customClass || ''\r
          }\`}\r
        >\r
          <span\r
            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"\r
            style={{\r
              ...getBackgroundStyle(item.color),\r
              boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)'\r
            }}\r
          ></span>\r
\r
          <span\r
            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"\r
            style={{\r
              boxShadow: '0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset'\r
            }}\r
          >\r
            <span className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center" aria-hidden="true">\r
              {item.icon}\r
            </span>\r
          </span>\r
\r
          <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">\r
            {item.label}\r
          </span>\r
        </button>\r
      ))}\r
    </div>\r
  );\r
};\r
\r
export default GlassIcons;\r
`,G={usage:`import GlassIcons from './GlassIcons'

// update with your own icons and colors
const items = [
  { icon: <FiFileText />, color: 'blue', label: 'Files' },
  { icon: <FiBook />, color: 'purple', label: 'Books' },
  { icon: <FiHeart />, color: 'red', label: 'Health' },
  { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
  { icon: <FiEdit />, color: 'orange', label: 'Notes' },
  { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
];

<div style={{ height: '600px', position: 'relative' }}>
  <GlassIcons items={items} className="custom-class"/>
</div>`,code:v,css:w,tailwind:I,tsCode:j,tsTailwind:C},P=()=>{const[n,a]=i.useState(!1),t=[{name:"items",type:"GlassIconsItem[]",default:"[]",description:"Array of items to render. Each item should include: an icon (React.ReactElement), a color (string), a label (string), and an optional customClass (string)."},{name:"className",type:"string",default:"''",description:"Optional additional CSS class(es) to be added to the container."}],e=[{icon:r.jsx(c,{}),color:n?"blue":"#444",label:"Files"},{icon:r.jsx(m,{}),color:n?"purple":"#444",label:"Books"},{icon:r.jsx(d,{}),color:n?"red":"#444",label:"Health"},{icon:r.jsx(p,{}),color:n?"indigo":"#444",label:"Weather"},{icon:r.jsx(b,{}),color:n?"orange":"#444",label:"Notes"},{icon:r.jsx(g,{}),color:n?"green":"#444",label:"Stats"}];return r.jsxs(u,{children:[r.jsxs(h,{children:[r.jsx(l,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:r.jsx(N,{items:e,className:"my-glass-icons"})}),r.jsx(y,{children:r.jsx(k,{title:"Colorful",isChecked:n,onChange:s=>{a(s)}})}),r.jsx(f,{data:t})]}),r.jsx(x,{children:r.jsx(_,{codeObject:G})})]})};export{P as default};
