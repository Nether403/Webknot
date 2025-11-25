import{j as e,r as h,B as d}from"./index-wsKSLPNH.js";import{T as b,P as x,a as v,C as m,b as u}from"./PropTable-C4uPWs8h.js";import{u as w}from"./useForceRerender-BCFU-k0M.js";import{P as p}from"./PreviewSwitch-DqnF708j.js";import{C as g}from"./Customize-1m_ZNqR9.js";import{P as S}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";const y=({children:r,speed:o=1,enableShadows:t=!0,enableOnHover:i=!0,className:n=""})=>{const s={"--after-duration":`${o*3}s`,"--before-duration":`${o*2}s`,"--after-shadow":t?"-5px 0 red":"none","--before-shadow":t?"5px 0 cyan":"none"},l=i?"enable-on-hover":"";return e.jsx("div",{className:`glitch ${l} ${n}`,style:s,"data-text":r,children:r})},C=`import './GlitchText.css';\r
\r
const GlitchText = ({ children, speed = 1, enableShadows = true, enableOnHover = true, className = '' }) => {\r
  const inlineStyles = {\r
    '--after-duration': \`\${speed * 3}s\`,\r
    '--before-duration': \`\${speed * 2}s\`,\r
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',\r
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'\r
  };\r
\r
  const hoverClass = enableOnHover ? 'enable-on-hover' : '';\r
\r
  return (\r
    <div className={\`glitch \${hoverClass} \${className}\`} style={inlineStyles} data-text={children}>\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default GlitchText;\r
`,T=`.glitch {\r
  color: #fff;\r
  font-size: clamp(2rem, 10vw, 8rem);\r
  white-space: nowrap;\r
  font-weight: 900;\r
  position: relative;\r
  margin: 0 auto;\r
  user-select: none;\r
  cursor: pointer;\r
}\r
\r
.glitch::after,\r
.glitch::before {\r
  content: attr(data-text);\r
  position: absolute;\r
  top: 0;\r
  color: #fff;\r
  background-color: #060010;\r
  overflow: hidden;\r
  clip-path: inset(0 0 0 0);\r
}\r
\r
.glitch:not(.enable-on-hover)::after {\r
  left: 10px;\r
  text-shadow: var(--after-shadow, -10px 0 red);\r
  animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse;\r
}\r
.glitch:not(.enable-on-hover)::before {\r
  left: -10px;\r
  text-shadow: var(--before-shadow, 10px 0 cyan);\r
  animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse;\r
}\r
\r
.glitch.enable-on-hover::after,\r
.glitch.enable-on-hover::before {\r
  content: '';\r
  opacity: 0;\r
  animation: none;\r
}\r
\r
.glitch.enable-on-hover:hover::after {\r
  content: attr(data-text);\r
  opacity: 1;\r
  left: 10px;\r
  text-shadow: var(--after-shadow, -10px 0 red);\r
  animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse;\r
}\r
.glitch.enable-on-hover:hover::before {\r
  content: attr(data-text);\r
  opacity: 1;\r
  left: -10px;\r
  text-shadow: var(--before-shadow, 10px 0 cyan);\r
  animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse;\r
}\r
\r
@keyframes animate-glitch {\r
  0% {\r
    clip-path: inset(20% 0 50% 0);\r
  }\r
  5% {\r
    clip-path: inset(10% 0 60% 0);\r
  }\r
  10% {\r
    clip-path: inset(15% 0 55% 0);\r
  }\r
  15% {\r
    clip-path: inset(25% 0 35% 0);\r
  }\r
  20% {\r
    clip-path: inset(30% 0 40% 0);\r
  }\r
  25% {\r
    clip-path: inset(40% 0 20% 0);\r
  }\r
  30% {\r
    clip-path: inset(10% 0 60% 0);\r
  }\r
  35% {\r
    clip-path: inset(15% 0 55% 0);\r
  }\r
  40% {\r
    clip-path: inset(25% 0 35% 0);\r
  }\r
  45% {\r
    clip-path: inset(30% 0 40% 0);\r
  }\r
  50% {\r
    clip-path: inset(20% 0 50% 0);\r
  }\r
  55% {\r
    clip-path: inset(10% 0 60% 0);\r
  }\r
  60% {\r
    clip-path: inset(15% 0 55% 0);\r
  }\r
  65% {\r
    clip-path: inset(25% 0 35% 0);\r
  }\r
  70% {\r
    clip-path: inset(30% 0 40% 0);\r
  }\r
  75% {\r
    clip-path: inset(40% 0 20% 0);\r
  }\r
  80% {\r
    clip-path: inset(20% 0 50% 0);\r
  }\r
  85% {\r
    clip-path: inset(10% 0 60% 0);\r
  }\r
  90% {\r
    clip-path: inset(15% 0 55% 0);\r
  }\r
  95% {\r
    clip-path: inset(25% 0 35% 0);\r
  }\r
  100% {\r
    clip-path: inset(30% 0 40% 0);\r
  }\r
}\r
`,_=`const GlitchText = ({ children, speed = 0.5, enableShadows = true, enableOnHover = false, className = '' }) => {\r
  const inlineStyles = {\r
    '--after-duration': \`\${speed * 3}s\`,\r
    '--before-duration': \`\${speed * 2}s\`,\r
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',\r
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'\r
  };\r
\r
  const baseClasses = 'text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer';\r
\r
  const pseudoClasses = !enableOnHover\r
    ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ' +\r
      'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before'\r
    : "after:content-[''] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +\r
      "before:content-[''] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +\r
      'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after ' +\r
      'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before';\r
\r
  const combinedClasses = \`\${baseClasses} \${pseudoClasses} \${className}\`;\r
\r
  return (\r
    <div style={inlineStyles} data-text={children} className={combinedClasses}>\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default GlitchText;\r
\r
// tailwind.config.js\r
// module.exports = {\r
//   theme: {\r
//     extend: {\r
//       keyframes: {\r
//         glitch: {\r
//           "0%": { "clip-path": "inset(20% 0 50% 0)" },\r
//           "5%": { "clip-path": "inset(10% 0 60% 0)" },\r
//           "10%": { "clip-path": "inset(15% 0 55% 0)" },\r
//           "15%": { "clip-path": "inset(25% 0 35% 0)" },\r
//           "20%": { "clip-path": "inset(30% 0 40% 0)" },\r
//           "25%": { "clip-path": "inset(40% 0 20% 0)" },\r
//           "30%": { "clip-path": "inset(10% 0 60% 0)" },\r
//           "35%": { "clip-path": "inset(15% 0 55% 0)" },\r
//           "40%": { "clip-path": "inset(25% 0 35% 0)" },\r
//           "45%": { "clip-path": "inset(30% 0 40% 0)" },\r
//           "50%": { "clip-path": "inset(20% 0 50% 0)" },\r
//           "55%": { "clip-path": "inset(10% 0 60% 0)" },\r
//           "60%": { "clip-path": "inset(15% 0 55% 0)" },\r
//           "65%": { "clip-path": "inset(25% 0 35% 0)" },\r
//           "70%": { "clip-path": "inset(30% 0 40% 0)" },\r
//           "75%": { "clip-path": "inset(40% 0 20% 0)" },\r
//           "80%": { "clip-path": "inset(20% 0 50% 0)" },\r
//           "85%": { "clip-path": "inset(10% 0 60% 0)" },\r
//           "90%": { "clip-path": "inset(15% 0 55% 0)" },\r
//           "95%": { "clip-path": "inset(25% 0 35% 0)" },\r
//           "100%": { "clip-path": "inset(30% 0 40% 0)" },\r
//         },\r
//       },\r
//       animation: {\r
//         "glitch-after": "glitch var(--after-duration) infinite linear alternate-reverse",\r
//         "glitch-before": "glitch var(--before-duration) infinite linear alternate-reverse",\r
//       },\r
//     },\r
//   },\r
//   plugins: [],\r
// };\r
`,G=`import { FC, CSSProperties } from 'react';\r
import './GlitchText.css';\r
\r
interface GlitchTextProps {\r
  children: string;\r
  speed?: number;\r
  enableShadows?: boolean;\r
  enableOnHover?: boolean;\r
  className?: string;\r
}\r
\r
interface CustomCSSProperties extends CSSProperties {\r
  '--after-duration': string;\r
  '--before-duration': string;\r
  '--after-shadow': string;\r
  '--before-shadow': string;\r
}\r
\r
const GlitchText: FC<GlitchTextProps> = ({\r
  children,\r
  speed = 0.5,\r
  enableShadows = true,\r
  enableOnHover = false,\r
  className = ''\r
}) => {\r
  const inlineStyles: CustomCSSProperties = {\r
    '--after-duration': \`\${speed * 3}s\`,\r
    '--before-duration': \`\${speed * 2}s\`,\r
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',\r
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'\r
  };\r
\r
  const hoverClass = enableOnHover ? 'enable-on-hover' : '';\r
\r
  return (\r
    <div className={\`glitch \${hoverClass} \${className}\`} style={inlineStyles} data-text={children}>\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default GlitchText;\r
`,$=`import { FC, CSSProperties } from 'react';\r
\r
interface GlitchTextProps {\r
  children: string;\r
  speed?: number;\r
  enableShadows?: boolean;\r
  enableOnHover?: boolean;\r
  className?: string;\r
}\r
\r
interface CustomCSSProperties extends CSSProperties {\r
  '--after-duration': string;\r
  '--before-duration': string;\r
  '--after-shadow': string;\r
  '--before-shadow': string;\r
}\r
\r
const GlitchText: FC<GlitchTextProps> = ({\r
  children,\r
  speed = 0.5,\r
  enableShadows = true,\r
  enableOnHover = false,\r
  className = ''\r
}) => {\r
  const inlineStyles: CustomCSSProperties = {\r
    '--after-duration': \`\${speed * 3}s\`,\r
    '--before-duration': \`\${speed * 2}s\`,\r
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',\r
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'\r
  };\r
\r
  const baseClasses = 'text-white text-[clamp(2rem,10vw,8rem)] font-black relative mx-auto select-none cursor-pointer';\r
\r
  const pseudoClasses = !enableOnHover\r
    ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ' +\r
      'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before'\r
    : "after:content-[''] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +\r
      "before:content-[''] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +\r
      'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after ' +\r
      'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before';\r
\r
  const combinedClasses = \`\${baseClasses} \${pseudoClasses} \${className}\`;\r
\r
  return (\r
    <div style={inlineStyles} data-text={children} className={combinedClasses}>\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default GlitchText;\r
\r
// tailwind.config.js\r
// module.exports = {\r
//   theme: {\r
//     extend: {\r
//       keyframes: {\r
//         glitch: {\r
//           "0%": { "clip-path": "inset(20% 0 50% 0)" },\r
//           "5%": { "clip-path": "inset(10% 0 60% 0)" },\r
//           "10%": { "clip-path": "inset(15% 0 55% 0)" },\r
//           "15%": { "clip-path": "inset(25% 0 35% 0)" },\r
//           "20%": { "clip-path": "inset(30% 0 40% 0)" },\r
//           "25%": { "clip-path": "inset(40% 0 20% 0)" },\r
//           "30%": { "clip-path": "inset(10% 0 60% 0)" },\r
//           "35%": { "clip-path": "inset(15% 0 55% 0)" },\r
//           "40%": { "clip-path": "inset(25% 0 35% 0)" },\r
//           "45%": { "clip-path": "inset(30% 0 40% 0)" },\r
//           "50%": { "clip-path": "inset(20% 0 50% 0)" },\r
//           "55%": { "clip-path": "inset(10% 0 60% 0)" },\r
//           "60%": { "clip-path": "inset(15% 0 55% 0)" },\r
//           "65%": { "clip-path": "inset(25% 0 35% 0)" },\r
//           "70%": { "clip-path": "inset(30% 0 40% 0)" },\r
//           "75%": { "clip-path": "inset(40% 0 20% 0)" },\r
//           "80%": { "clip-path": "inset(20% 0 50% 0)" },\r
//           "85%": { "clip-path": "inset(10% 0 60% 0)" },\r
//           "90%": { "clip-path": "inset(15% 0 55% 0)" },\r
//           "95%": { "clip-path": "inset(25% 0 35% 0)" },\r
//           "100%": { "clip-path": "inset(30% 0 40% 0)" },\r
//         },\r
//       },\r
//       animation: {\r
//         "glitch-after": "glitch var(--after-duration) infinite linear alternate-reverse",\r
//         "glitch-before": "glitch var(--before-duration) infinite linear alternate-reverse",\r
//       },\r
//     },\r
//   },\r
//   plugins: [],\r
// };\r
`,P={usage:`import GlitchText from './GlitchText';
  
<GlitchText
  speed={1}
  enableShadows={true}
  enableOnHover={true}
  className='custom-class'
>
  React Bits
</GlitchText>`,code:C,css:T,tailwind:_,tsCode:G,tsTailwind:$},F=()=>{const[r,o]=h.useState(1),[t,i]=h.useState(!0),[n,s]=h.useState(!1),[l,c]=w(),f=[{name:"children",type:"string",default:"",description:"The text content that will display the glitch effect."},{name:"speed",type:"number",default:"0.5",description:"Multiplier for the animation speed. Higher values slow down the glitch effect."},{name:"enableShadows",type:"boolean",default:"true",description:"Toggle the colored text shadows on the glitch pseudo-elements."},{name:"enableOnHover",type:"boolean",default:"false",description:"If true, the glitch animation is only activated on hover."},{name:"className",type:"string",default:"",description:"Additional custom classes to apply to the component."}];return e.jsxs(b,{children:[e.jsxs(x,{children:[e.jsx(d,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:e.jsx(y,{speed:r,enableShadows:t,enableOnHover:n,children:n?"Hover Me":"React Bits"},l)}),e.jsxs(g,{children:[e.jsx(S,{title:"Refresh Delay",min:.1,max:5,step:.1,value:r,onChange:a=>{o(a),c()}}),e.jsx(p,{title:"Glitch Colors",isChecked:t,onChange:a=>{i(a),c()}}),e.jsx(p,{title:"Glitch On Hover",isChecked:n,onChange:a=>{s(a),c()}})]}),e.jsx(v,{data:f})]}),e.jsx(m,{children:e.jsx(u,{codeObject:P})})]})};export{F as default};
