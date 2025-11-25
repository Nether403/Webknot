import{r as i,j as n,B as a,T as o,F as f,b7 as p}from"./index-wsKSLPNH.js";import{T as g,P as u,a as x,C as h,b}from"./PropTable-C4uPWs8h.js";import{C as v}from"./Customize-1m_ZNqR9.js";import{P as y}from"./PreviewSlider-m1G_aiYP.js";import{P as w}from"./PreviewInput-C0y58bk9.js";import{G as s}from"./GradientText-EsAXXgs6.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const k=`import './GradientText.css';\r
\r
export default function GradientText({\r
  children,\r
  className = '',\r
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],\r
  animationSpeed = 8,\r
  showBorder = false\r
}) {\r
  const gradientStyle = {\r
    backgroundImage: \`linear-gradient(to right, \${colors.join(', ')})\`,\r
    animationDuration: \`\${animationSpeed}s\`\r
  };\r
\r
  return (\r
    <div className={\`animated-gradient-text \${className}\`}>\r
      {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}\r
      <div className="text-content" style={gradientStyle}>\r
        {children}\r
      </div>\r
    </div>\r
  );\r
}\r
`,N=`.animated-gradient-text {\r
  position: relative;\r
  margin: 0 auto;\r
  display: flex;\r
  max-width: fit-content;\r
  flex-direction: row;\r
  align-items: center;\r
  justify-content: center;\r
  border-radius: 1.25rem;\r
  font-weight: 500;\r
  backdrop-filter: blur(10px);\r
  transition: box-shadow 0.5s ease-out;\r
  overflow: hidden;\r
  cursor: pointer;\r
}\r
\r
.gradient-overlay {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  bottom: 0;\r
  background-size: 300% 100%;\r
  animation: gradient linear infinite;\r
  border-radius: inherit;\r
  z-index: 0;\r
  pointer-events: none;\r
}\r
\r
.gradient-overlay::before {\r
  content: '';\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  border-radius: inherit;\r
  width: calc(100% - 2px);\r
  height: calc(100% - 2px);\r
  left: 50%;\r
  top: 50%;\r
  transform: translate(-50%, -50%);\r
  background-color: #060010;\r
  z-index: -1;\r
}\r
\r
@keyframes gradient {\r
  0% {\r
    background-position: 0% 50%;\r
  }\r
\r
  50% {\r
    background-position: 100% 50%;\r
  }\r
\r
  100% {\r
    background-position: 0% 50%;\r
  }\r
}\r
\r
.text-content {\r
  display: inline-block;\r
  position: relative;\r
  z-index: 2;\r
  background-size: 300% 100%;\r
  background-clip: text;\r
  -webkit-background-clip: text;\r
  color: transparent;\r
  animation: gradient linear infinite;\r
}\r
`,S=`export default function GradientText({\r
  children,\r
  className = '',\r
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],\r
  animationSpeed = 8,\r
  showBorder = false\r
}) {\r
  const gradientStyle = {\r
    backgroundImage: \`linear-gradient(to right, \${colors.join(', ')})\`,\r
    animationDuration: \`\${animationSpeed}s\`\r
  };\r
\r
  return (\r
    <div\r
      className={\`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer \${className}\`}\r
    >\r
      {showBorder && (\r
        <div\r
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"\r
          style={{\r
            ...gradientStyle,\r
            backgroundSize: '300% 100%'\r
          }}\r
        >\r
          <div\r
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"\r
            style={{\r
              width: 'calc(100% - 2px)',\r
              height: 'calc(100% - 2px)',\r
              left: '50%',\r
              top: '50%',\r
              transform: 'translate(-50%, -50%)'\r
            }}\r
          ></div>\r
        </div>\r
      )}\r
      <div\r
        className="inline-block relative z-2 text-transparent bg-cover animate-gradient"\r
        style={{\r
          ...gradientStyle,\r
          backgroundClip: 'text',\r
          WebkitBackgroundClip: 'text',\r
          backgroundSize: '300% 100%'\r
        }}\r
      >\r
        {children}\r
      </div>\r
    </div>\r
  );\r
}\r
\r
// tailwind.config.js\r
// module.exports = {\r
//   theme: {\r
//     extend: {\r
//       keyframes: {\r
//         gradient: {\r
//           '0%': { backgroundPosition: '0% 50%' },\r
//           '50%': { backgroundPosition: '100% 50%' },\r
//           '100%': { backgroundPosition: '0% 50%' },\r
//         },\r
//       },\r
//       animation: {\r
//         gradient: 'gradient 8s linear infinite'\r
//       },\r
//     },\r
//   },\r
//   plugins: [],\r
// };\r
`,j=`import './GradientText.css';\r
import React, { ReactNode } from 'react';\r
\r
interface GradientTextProps {\r
  children: ReactNode;\r
  className?: string;\r
  colors?: string[];\r
  animationSpeed?: number;\r
  showBorder?: boolean;\r
}\r
\r
export default function GradientText({\r
  children,\r
  className = '',\r
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],\r
  animationSpeed = 8,\r
  showBorder = false\r
}: GradientTextProps) {\r
  const gradientStyle = {\r
    backgroundImage: \`linear-gradient(to right, \${colors.join(', ')})\`,\r
    animationDuration: \`\${animationSpeed}s\`\r
  };\r
\r
  return (\r
    <div className={\`animated-gradient-text \${className}\`}>\r
      {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}\r
      <div className="text-content" style={gradientStyle}>\r
        {children}\r
      </div>\r
    </div>\r
  );\r
}\r
`,T=`import React, { ReactNode } from 'react';\r
\r
interface GradientTextProps {\r
  children: ReactNode;\r
  className?: string;\r
  colors?: string[];\r
  animationSpeed?: number;\r
  showBorder?: boolean;\r
}\r
\r
export default function GradientText({\r
  children,\r
  className = '',\r
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],\r
  animationSpeed = 8,\r
  showBorder = false\r
}: GradientTextProps) {\r
  const gradientStyle = {\r
    backgroundImage: \`linear-gradient(to right, \${colors.join(', ')})\`,\r
    animationDuration: \`\${animationSpeed}s\`\r
  };\r
\r
  return (\r
    <div\r
      className={\`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer \${className}\`}\r
    >\r
      {showBorder && (\r
        <div\r
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"\r
          style={{\r
            ...gradientStyle,\r
            backgroundSize: '300% 100%'\r
          }}\r
        >\r
          <div\r
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"\r
            style={{\r
              width: 'calc(100% - 2px)',\r
              height: 'calc(100% - 2px)',\r
              left: '50%',\r
              top: '50%',\r
              transform: 'translate(-50%, -50%)'\r
            }}\r
          ></div>\r
        </div>\r
      )}\r
      <div\r
        className="inline-block relative z-2 text-transparent bg-cover animate-gradient"\r
        style={{\r
          ...gradientStyle,\r
          backgroundClip: 'text',\r
          WebkitBackgroundClip: 'text',\r
          backgroundSize: '300% 100%'\r
        }}\r
      >\r
        {children}\r
      </div>\r
    </div>\r
  );\r
}\r
\r
// tailwind.config.js\r
// module.exports = {\r
//   theme: {\r
//     extend: {\r
//       keyframes: {\r
//         gradient: {\r
//           '0%': { backgroundPosition: '0% 50%' },\r
//           '50%': { backgroundPosition: '100% 50%' },\r
//           '100%': { backgroundPosition: '0% 50%' },\r
//         },\r
//       },\r
//       animation: {\r
//         gradient: 'gradient 8s linear infinite'\r
//       },\r
//     },\r
//   },\r
//   plugins: [],\r
// };\r
`,z={usage:`import GradientText from './GradientText'
  
<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Add a splash of color!
</GradientText>`,code:k,css:N,tailwind:S,tsCode:j,tsTailwind:T},E=()=>{const[r,d]=i.useState("#40ffaa, #4079ff, #40ffaa, #4079ff, #40ffaa"),[e,l]=i.useState(3),c=r.split(",").map(t=>t.trim()),m=[{name:"children",type:"ReactNode",default:"-",description:"The content to be displayed inside the gradient text."},{name:"className",type:"string",default:"''",description:"Adds custom classes to the root element for additional styling."},{name:"colors",type:"string[]",default:'["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]',description:"Defines the gradient colors for the text or border."},{name:"animationSpeed",type:"number",default:"8",description:"The duration of the gradient animation in seconds."},{name:"showBorder",type:"boolean",default:"false",description:"Determines whether a border with the gradient effect is displayed."}];return n.jsxs(g,{children:[n.jsxs(u,{children:[n.jsx("h2",{className:"demo-title-extra",children:"Default"}),n.jsx(a,{position:"relative",className:"demo-container",minH:150,children:n.jsx(o,{fontSize:"2rem",as:"div",children:n.jsx(s,{colors:r.split(","),animationSpeed:e,showBorder:!1,children:"Add a splash of color!"})})}),n.jsx("h2",{className:"demo-title-extra",children:"Border Animation"}),n.jsx(a,{position:"relative",className:"demo-container",minH:150,children:n.jsx(o,{fontSize:"2rem",as:"div",children:n.jsx(s,{colors:r.split(","),animationSpeed:e,className:"custom-gradient-class",children:"Now with a cool border!"})})}),n.jsxs(v,{children:[n.jsx(y,{title:"Loop Duration",min:1,max:10,step:.5,value:e,onChange:l,valueUnit:"s"}),n.jsxs(f,{gap:0,direction:"column",children:[n.jsx(w,{title:"Colors",maxLength:100,placeholder:"Enter colors separated by commas",onChange:t=>d(t),value:r}),n.jsx(a,{bg:`linear-gradient(to right, ${c.join(", ")})`,w:"300px",marginLeft:"calc(2rem + 24px)",h:"12px",borderRadius:"md",border:"1px solid #271E37"})]})]}),n.jsxs("p",{className:"demo-extra-info",style:{marginTop:"1rem"},children:[n.jsx(p,{position:"relative"})," For a smoother animation, the gradient should start and end with the same color."]}),n.jsx(x,{data:m})]}),n.jsx(h,{children:n.jsx(b,{codeObject:z})})]})};export{E as default};
