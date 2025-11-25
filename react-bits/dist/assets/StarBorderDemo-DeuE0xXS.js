import{j as r,r as d,B as m,T as p}from"./index-wsKSLPNH.js";import{T as u,P as b,a as h,C as x,b as g}from"./PropTable-C4uPWs8h.js";import{P as l}from"./PreviewSlider-m1G_aiYP.js";import{P as y}from"./PreviewSelect-B8u33nUa.js";import{C as v}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const f=({as:e="button",className:s="",color:n="white",speed:t="6s",thickness:a=1,children:i,...o})=>r.jsxs(e,{className:`star-border-container ${s}`,style:{padding:`${a}px 0`,...o.style},...o,children:[r.jsx("div",{className:"border-gradient-bottom",style:{background:`radial-gradient(circle, ${n}, transparent 10%)`,animationDuration:t}}),r.jsx("div",{className:"border-gradient-top",style:{background:`radial-gradient(circle, ${n}, transparent 10%)`,animationDuration:t}}),r.jsx("div",{className:"inner-content",children:i})]}),N=`import './StarBorder.css';\r
\r
const StarBorder = ({\r
  as: Component = 'button',\r
  className = '',\r
  color = 'white',\r
  speed = '6s',\r
  thickness = 1,\r
  children,\r
  ...rest\r
}) => {\r
  return (\r
    <Component\r
      className={\`star-border-container \${className}\`}\r
      style={{\r
        padding: \`\${thickness}px 0\`,\r
        ...rest.style\r
      }}\r
      {...rest}\r
    >\r
      <div\r
        className="border-gradient-bottom"\r
        style={{\r
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,\r
          animationDuration: speed\r
        }}\r
      ></div>\r
      <div\r
        className="border-gradient-top"\r
        style={{\r
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,\r
          animationDuration: speed\r
        }}\r
      ></div>\r
      <div className="inner-content">{children}</div>\r
    </Component>\r
  );\r
};\r
\r
export default StarBorder;\r
`,k=`.star-border-container {\r
  display: inline-block;\r
  position: relative;\r
  border-radius: 20px;\r
  overflow: hidden;\r
}\r
\r
.border-gradient-bottom {\r
  position: absolute;\r
  width: 300%;\r
  height: 50%;\r
  opacity: 0.7;\r
  bottom: -12px;\r
  right: -250%;\r
  border-radius: 50%;\r
  animation: star-movement-bottom linear infinite alternate;\r
  z-index: 0;\r
}\r
\r
.border-gradient-top {\r
  position: absolute;\r
  opacity: 0.7;\r
  width: 300%;\r
  height: 50%;\r
  top: -12px;\r
  left: -250%;\r
  border-radius: 50%;\r
  animation: star-movement-top linear infinite alternate;\r
  z-index: 0;\r
}\r
\r
.inner-content {\r
  position: relative;\r
  border: 1px solid #222;\r
  background: #000;\r
  color: white;\r
  font-size: 16px;\r
  text-align: center;\r
  padding: 16px 26px;\r
  border-radius: 20px;\r
  z-index: 1;\r
}\r
\r
@keyframes star-movement-bottom {\r
  0% {\r
    transform: translate(0%, 0%);\r
    opacity: 1;\r
  }\r
  100% {\r
    transform: translate(-100%, 0%);\r
    opacity: 0;\r
  }\r
}\r
\r
@keyframes star-movement-top {\r
  0% {\r
    transform: translate(0%, 0%);\r
    opacity: 1;\r
  }\r
  100% {\r
    transform: translate(100%, 0%);\r
    opacity: 0;\r
  }\r
}\r
`,S=`const StarBorder = ({\r
  as: Component = 'button',\r
  className = '',\r
  color = 'white',\r
  speed = '6s',\r
  thickness = 1,\r
  children,\r
  ...rest\r
}) => {\r
  return (\r
    <Component\r
      className={\`relative inline-block overflow-hidden rounded-[20px] \${className}\`}\r
      style={{\r
        padding: \`\${thickness}px 0\`,\r
        ...rest.style\r
      }}\r
      {...rest}\r
    >\r
      <div\r
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"\r
        style={{\r
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,\r
          animationDuration: speed\r
        }}\r
      ></div>\r
      <div\r
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"\r
        style={{\r
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,\r
          animationDuration: speed\r
        }}\r
      ></div>\r
      <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">\r
        {children}\r
      </div>\r
    </Component>\r
  );\r
};\r
\r
export default StarBorder;\r
\r
// tailwind.config.js\r
// module.exports = {\r
//   theme: {\r
//     extend: {\r
//       animation: {\r
//         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',\r
//         'star-movement-top': 'star-movement-top linear infinite alternate',\r
//       },\r
//       keyframes: {\r
//         'star-movement-bottom': {\r
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },\r
//           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },\r
//         },\r
//         'star-movement-top': {\r
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },\r
//           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },\r
//         },\r
//       },\r
//     },\r
//   }\r
// }\r
`,w=`import React from 'react';\r
import './StarBorder.css';\r
\r
type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {\r
  as?: T;\r
  className?: string;\r
  children?: React.ReactNode;\r
  color?: string;\r
  speed?: React.CSSProperties['animationDuration'];\r
  thickness?: number;\r
};\r
\r
const StarBorder = <T extends React.ElementType = 'button'>({\r
  as,\r
  className = '',\r
  color = 'white',\r
  speed = '6s',\r
  thickness = 1,\r
  children,\r
  ...rest\r
}: StarBorderProps<T>) => {\r
  const Component = as || 'button';\r
\r
  return (\r
    <Component\r
      className={\`star-border-container \${className}\`}\r
      {...(rest as any)}\r
      style={{\r
        padding: \`\${thickness}px 0\`,\r
        ...(rest as any).style\r
      }}\r
    >\r
      <div\r
        className="border-gradient-bottom"\r
        style={{\r
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,\r
          animationDuration: speed\r
        }}\r
      ></div>\r
      <div\r
        className="border-gradient-top"\r
        style={{\r
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,\r
          animationDuration: speed\r
        }}\r
      ></div>\r
      <div className="inner-content">{children}</div>\r
    </Component>\r
  );\r
};\r
\r
export default StarBorder;\r
`,C=`import React from 'react';\r
\r
type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {\r
  as?: T;\r
  className?: string;\r
  children?: React.ReactNode;\r
  color?: string;\r
  speed?: React.CSSProperties['animationDuration'];\r
  thickness?: number;\r
};\r
\r
const StarBorder = <T extends React.ElementType = 'button'>({\r
  as,\r
  className = '',\r
  color = 'white',\r
  speed = '6s',\r
  thickness = 1,\r
  children,\r
  ...rest\r
}: StarBorderProps<T>) => {\r
  const Component = as || 'button';\r
\r
  return (\r
    <Component\r
      className={\`relative inline-block overflow-hidden rounded-[20px] \${className}\`}\r
      {...(rest as any)}\r
      style={{\r
        padding: \`\${thickness}px 0\`,\r
        ...(rest as any).style\r
      }}\r
    >\r
      <div\r
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"\r
        style={{\r
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,\r
          animationDuration: speed\r
        }}\r
      ></div>\r
      <div\r
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"\r
        style={{\r
          background: \`radial-gradient(circle, \${color}, transparent 10%)\`,\r
          animationDuration: speed\r
        }}\r
      ></div>\r
      <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">\r
        {children}\r
      </div>\r
    </Component>\r
  );\r
};\r
\r
export default StarBorder;\r
\r
// tailwind.config.js\r
// module.exports = {\r
//   theme: {\r
//     extend: {\r
//       animation: {\r
//         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',\r
//         'star-movement-top': 'star-movement-top linear infinite alternate',\r
//       },\r
//       keyframes: {\r
//         'star-movement-bottom': {\r
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },\r
//           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },\r
//         },\r
//         'star-movement-top': {\r
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },\r
//           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },\r
//         },\r
//       },\r
//     },\r
//   }\r
// }\r
`,B={usage:`import StarBorder from './StarBorder'
  
<StarBorder
  as="button"
  className="custom-class"
  color="cyan"
  speed="5s"
>
  // content
</StarBorder>`,code:N,css:k,tailwind:S,tsCode:w,tsTailwind:C},E=()=>{const[e,s]=d.useState(1),[n,t]=d.useState(5),[a,i]=d.useState("magenta"),o=[{value:"magenta",label:"Magenta"},{value:"cyan",label:"Cyan"},{value:"white",label:"White"}],c=[{name:"as",type:"string",default:"button",description:"Allows specifying the type of the parent component to be rendered."},{name:"className",type:"string",default:"-",description:"Allows adding custom classes to the component."},{name:"color",type:"string",default:"white",description:"Changes the main color of the border (fades to transparent)"},{name:"speed",type:"string",default:"6s",description:"Changes the speed of the animation."},{name:"thickness",type:"number",default:"3",description:"Controls the thickness of the star border effect."}];return r.jsxs(u,{children:[r.jsxs(b,{children:[r.jsx(m,{position:"relative",className:"demo-container",h:400,children:r.jsx(f,{className:"star-border-demo",color:a,thickness:e,speed:`${n}s`,children:r.jsx(p,{mx:0,fontSize:"1em",children:"Star Border"})})}),r.jsxs(v,{children:[r.jsx(y,{title:"Color",options:o,value:a,width:120,onChange:i}),r.jsx(l,{title:"Thickness",min:.5,max:8,step:.5,value:e,valueUnit:"px",width:200,onChange:s}),r.jsx(l,{title:"Speed",min:1,max:10,step:.5,value:n,valueUnit:"s",width:200,onChange:t})]}),r.jsx(h,{data:c})]}),r.jsx(x,{children:r.jsx(g,{codeObject:B})})]})};export{E as default};
