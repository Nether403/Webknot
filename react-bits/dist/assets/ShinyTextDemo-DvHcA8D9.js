import{j as n,r as d,B as s}from"./index-wsKSLPNH.js";import{T as l,P as c,a as m,C as x,b}from"./PropTable-C4uPWs8h.js";import{P as p}from"./PreviewSlider-m1G_aiYP.js";import{C as h}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";const i=({text:e,disabled:t=!1,speed:r=5,className:a=""})=>{const o=`${r}s`;return n.jsx("div",{className:`shiny-text ${t?"disabled":""} ${a}`,style:{animationDuration:o},children:e})},u=`import './ShinyText.css';\r
\r
const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {\r
  const animationDuration = \`\${speed}s\`;\r
\r
  return (\r
    <div className={\`shiny-text \${disabled ? 'disabled' : ''} \${className}\`} style={{ animationDuration }}>\r
      {text}\r
    </div>\r
  );\r
};\r
\r
export default ShinyText;\r
`,y=`.shiny-text {\r
  color: #b5b5b5a4; /* Adjust this color to change intensity/style */\r
  background: linear-gradient(\r
    120deg,\r
    rgba(255, 255, 255, 0) 40%,\r
    rgba(255, 255, 255, 0.8) 50%,\r
    rgba(255, 255, 255, 0) 60%\r
  );\r
  background-size: 200% 100%;\r
  -webkit-background-clip: text;\r
  background-clip: text;\r
  display: inline-block;\r
  animation: shine 5s linear infinite;\r
}\r
\r
@keyframes shine {\r
  0% {\r
    background-position: 100%;\r
  }\r
  100% {\r
    background-position: -100%;\r
  }\r
}\r
\r
.shiny-text.disabled {\r
  animation: none;\r
}\r
`,g=`const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {\r
  const animationDuration = \`\${speed}s\`;\r
\r
  return (\r
    <div\r
      className={\`text-[#b5b5b5a4] bg-clip-text inline-block \${disabled ? '' : 'animate-shine'} \${className}\`}\r
      style={{\r
        backgroundImage:\r
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',\r
        backgroundSize: '200% 100%',\r
        WebkitBackgroundClip: 'text',\r
        animationDuration: animationDuration\r
      }}\r
    >\r
      {text}\r
    </div>\r
  );\r
};\r
\r
export default ShinyText;\r
\r
// tailwind.config.js\r
// module.exports = {\r
//   theme: {\r
//     extend: {\r
//       keyframes: {\r
//         shine: {\r
//           '0%': { 'background-position': '100%' },\r
//           '100%': { 'background-position': '-100%' },\r
//         },\r
//       },\r
//       animation: {\r
//         shine: 'shine 5s linear infinite',\r
//       },\r
//     },\r
//   },\r
//   plugins: [],\r
// };\r
`,f=`import './ShinyText.css';\r
\r
interface ShinyTextProps {\r
  text: string;\r
  disabled?: boolean;\r
  speed?: number;\r
  className?: string;\r
}\r
\r
const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {\r
  const animationDuration = \`\${speed}s\`;\r
\r
  return (\r
    <div className={\`shiny-text \${disabled ? 'disabled' : ''} \${className}\`} style={{ animationDuration }}>\r
      {text}\r
    </div>\r
  );\r
};\r
\r
export default ShinyText;\r
`,S=`import React from 'react';\r
\r
interface ShinyTextProps {\r
  text: string;\r
  disabled?: boolean;\r
  speed?: number;\r
  className?: string;\r
}\r
\r
const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {\r
  const animationDuration = \`\${speed}s\`;\r
\r
  return (\r
    <div\r
      className={\`text-[#b5b5b5a4] bg-clip-text inline-block \${disabled ? '' : 'animate-shine'} \${className}\`}\r
      style={{\r
        backgroundImage:\r
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',\r
        backgroundSize: '200% 100%',\r
        WebkitBackgroundClip: 'text',\r
        animationDuration: animationDuration\r
      }}\r
    >\r
      {text}\r
    </div>\r
  );\r
};\r
\r
export default ShinyText;\r
\r
// tailwind.config.js\r
// module.exports = {\r
//   theme: {\r
//     extend: {\r
//       keyframes: {\r
//         shine: {\r
//           '0%': { 'background-position': '100%' },\r
//           '100%': { 'background-position': '-100%' },\r
//         },\r
//       },\r
//       animation: {\r
//         shine: 'shine 5s linear infinite',\r
//       },\r
//     },\r
//   },\r
//   plugins: [],\r
// };\r
`,T={usage:`import ShinyText from './ShinyText';
  
<ShinyText 
  text="Just some shiny text!" 
  disabled={false} 
  speed={3} 
  className='custom-class' 
/>`,code:u,css:y,tailwind:g,tsCode:f,tsTailwind:S},$=()=>{const[e,t]=d.useState(3),r=[{name:"text",type:"string",default:"-",description:"The text to be displayed with the shiny effect."},{name:"disabled",type:"boolean",default:"false",description:"Disables the shiny effect when set to true."},{name:"speed",type:"number",default:"5",description:"Specifies the duration of the animation in seconds."},{name:"className",type:"string",default:"''",description:"Adds custom classes to the root element."}];return n.jsxs(l,{children:[n.jsxs(c,{children:[n.jsx("h2",{className:"demo-title-extra",children:"Basic"}),n.jsx(s,{position:"relative",className:"demo-container",minH:150,fontSize:"24px",children:n.jsx(i,{text:"Just some shiny text!",disabled:!1,speed:3,className:"shiny-text-demo"})}),n.jsx("h2",{className:"demo-title-extra",children:"Button Text"}),n.jsx(s,{position:"relative",className:"demo-container",minH:150,fontSize:"24px",children:n.jsx("div",{className:"shiny-button",children:n.jsx(i,{text:"Shiny Button",disabled:!1,speed:3,className:"shiny-text-demo"})})}),n.jsx("h2",{className:"demo-title-extra",children:"Configurable Speed"}),n.jsx(s,{position:"relative",className:"demo-container",minH:150,fontSize:"24px",children:n.jsx(i,{text:e<2.5?"🐎 This is fast!":"🐌 This is slow!",disabled:!1,speed:e,className:"shiny-text-demo"})}),n.jsx(h,{children:n.jsx(p,{title:"Animation Duration",min:1,max:5,step:.1,value:e,valueUnit:"s",onChange:t})}),n.jsx(m,{data:r})]}),n.jsx(x,{children:n.jsx(b,{codeObject:T})})]})};export{$ as default};
