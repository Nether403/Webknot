import{be as y,bf as h,bg as C,ba as D,bh as w,r as m,j as o,q as k,B as H}from"./index-wsKSLPNH.js";import{T as E,P as V,a as M,C as S,b as N}from"./PropTable-C4uPWs8h.js";import{D as P}from"./Dependencies-BHoMfJUj.js";import{C as A}from"./Customize-1m_ZNqR9.js";import{P as $}from"./PreviewSlider-m1G_aiYP.js";import{P as R}from"./PreviewSelect-B8u33nUa.js";import{P as U}from"./PreviewInput-C0y58bk9.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";function j(n){n.values.forEach(r=>r.stop())}function d(n,r){[...r].reverse().forEach(c=>{const a=n.getVariant(c);a&&h(n,a),n.variantChildren&&n.variantChildren.forEach(s=>{d(s,r)})})}function B(n,r){if(Array.isArray(r))return d(n,r);if(typeof r=="string")return d(n,[r]);h(n,r)}function I(){const n=new Set,r={subscribe(t){return n.add(t),()=>void n.delete(t)},start(t,c){const a=[];return n.forEach(s=>{a.push(y(s,t,{transitionOverride:c}))}),Promise.all(a)},set(t){return n.forEach(c=>{B(c,t)})},stop(){n.forEach(t=>{j(t)})},mount(){return()=>{r.stop()}}};return r}function L(){const n=C(I);return D(n.mount,[]),n}const O=L,z=(n,r,t=!0)=>({from:r,to:r+360,ease:"linear",duration:n,type:"tween",repeat:t?1/0:0}),p=(n,r)=>({rotate:z(n,r),scale:{type:"spring",damping:20,stiffness:300}}),W=({text:n,spinDuration:r=20,onHover:t="speedUp",className:c=""})=>{const a=Array.from(n),s=O(),l=w(0);m.useEffect(()=>{const e=l.get();s.start({rotate:e+360,scale:1,transition:p(r,e)})},[r,n,t,s,l]);const g=()=>{const e=l.get();if(console.log("CircularText mounted with text:",n),!t)return;let i,f=1;switch(t){case"slowDown":i=p(r*2,e);break;case"speedUp":i=p(r/4,e);break;case"pause":i={rotate:{type:"spring",damping:20,stiffness:300},scale:{type:"spring",damping:20,stiffness:300}},f=1;break;case"goBonkers":i=p(r/20,e),f=.8;break;default:i=p(r,e)}s.start({rotate:e+360,scale:f,transition:i})},u=()=>{const e=l.get();s.start({rotate:e+360,scale:1,transition:p(r,e)})};return o.jsx(k.div,{className:`circular-text ${c}`,style:{rotate:l},initial:{rotate:0},animate:s,onMouseEnter:g,onMouseLeave:u,children:a.map((e,i)=>{const f=360/a.length*i,x=Math.PI/a.length,b=x*i,v=x*i,T=`rotateZ(${f}deg) translate3d(${b}px, ${v}px, 0)`;return o.jsx("span",{style:{transform:T,WebkitTransform:T},children:e},i)})})},Z=`import { useEffect } from 'react';\r
import { motion, useAnimation, useMotionValue } from 'motion/react';\r
\r
import './CircularText.css';\r
\r
const getRotationTransition = (duration, from, loop = true) => ({\r
  from,\r
  to: from + 360,\r
  ease: 'linear',\r
  duration,\r
  type: 'tween',\r
  repeat: loop ? Infinity : 0\r
});\r
\r
const getTransition = (duration, from) => ({\r
  rotate: getRotationTransition(duration, from),\r
  scale: {\r
    type: 'spring',\r
    damping: 20,\r
    stiffness: 300\r
  }\r
});\r
\r
const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }) => {\r
  const letters = Array.from(text);\r
  const controls = useAnimation();\r
  const rotation = useMotionValue(0);\r
\r
  useEffect(() => {\r
    const start = rotation.get();\r
    controls.start({\r
      rotate: start + 360,\r
      scale: 1,\r
      transition: getTransition(spinDuration, start)\r
    });\r
  }, [spinDuration, text, onHover, controls, rotation]);\r
\r
  const handleHoverStart = () => {\r
    const start = rotation.get();\r
    console.log('CircularText mounted with text:', text);\r
    if (!onHover) return;\r
\r
    let transitionConfig;\r
    let scaleVal = 1;\r
\r
    switch (onHover) {\r
      case 'slowDown':\r
        transitionConfig = getTransition(spinDuration * 2, start);\r
        break;\r
      case 'speedUp':\r
        transitionConfig = getTransition(spinDuration / 4, start);\r
        break;\r
      case 'pause':\r
        transitionConfig = {\r
          rotate: { type: 'spring', damping: 20, stiffness: 300 },\r
          scale: { type: 'spring', damping: 20, stiffness: 300 }\r
        };\r
        scaleVal = 1;\r
        break;\r
      case 'goBonkers':\r
        transitionConfig = getTransition(spinDuration / 20, start);\r
        scaleVal = 0.8;\r
        break;\r
      default:\r
        transitionConfig = getTransition(spinDuration, start);\r
    }\r
\r
    controls.start({\r
      rotate: start + 360,\r
      scale: scaleVal,\r
      transition: transitionConfig\r
    });\r
  };\r
\r
  const handleHoverEnd = () => {\r
    const start = rotation.get();\r
    controls.start({\r
      rotate: start + 360,\r
      scale: 1,\r
      transition: getTransition(spinDuration, start)\r
    });\r
  };\r
\r
  return (\r
    <motion.div\r
      className={\`circular-text \${className}\`}\r
      style={{ rotate: rotation }}\r
      initial={{ rotate: 0 }}\r
      animate={controls}\r
      onMouseEnter={handleHoverStart}\r
      onMouseLeave={handleHoverEnd}\r
    >\r
      {letters.map((letter, i) => {\r
        const rotationDeg = (360 / letters.length) * i;\r
        const factor = Math.PI / letters.length;\r
        const x = factor * i;\r
        const y = factor * i;\r
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;\r
\r
        return (\r
          <span key={i} style={{ transform, WebkitTransform: transform }}>\r
            {letter}\r
          </span>\r
        );\r
      })}\r
    </motion.div>\r
  );\r
};\r
\r
export default CircularText;\r
`,F=`.circular-text {\r
  margin: 0 auto;\r
  border-radius: 50%;\r
  width: 200px;\r
  position: relative;\r
  height: 200px;\r
  font-weight: bold;\r
  color: #fff;\r
  font-weight: 900;\r
  text-align: center;\r
  cursor: pointer;\r
  transform-origin: 50% 50%;\r
  -webkit-transform-origin: 50% 50%;\r
}\r
\r
.circular-text span {\r
  position: absolute;\r
  display: inline-block;\r
  left: 0;\r
  right: 0;\r
  top: 0;\r
  bottom: 0;\r
  font-size: 24px;\r
  transition: all 0.5s cubic-bezier(0, 0, 0, 1);\r
}\r
`,q=`import { useEffect } from 'react';\r
import { motion, useAnimation, useMotionValue } from 'motion/react';\r
\r
const getRotationTransition = (duration, from, loop = true) => ({\r
  from,\r
  to: from + 360,\r
  ease: 'linear',\r
  duration,\r
  type: 'tween',\r
  repeat: loop ? Infinity : 0\r
});\r
\r
const getTransition = (duration, from) => ({\r
  rotate: getRotationTransition(duration, from),\r
  scale: {\r
    type: 'spring',\r
    damping: 20,\r
    stiffness: 300\r
  }\r
});\r
\r
const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }) => {\r
  const letters = Array.from(text);\r
  const controls = useAnimation();\r
  const rotation = useMotionValue(0);\r
\r
  useEffect(() => {\r
    const start = rotation.get();\r
    controls.start({\r
      rotate: start + 360,\r
      scale: 1,\r
      transition: getTransition(spinDuration, start)\r
    });\r
  }, [spinDuration, text, onHover, controls, rotation]);\r
\r
  const handleHoverStart = () => {\r
    const start = rotation.get();\r
    if (!onHover) return;\r
\r
    let transitionConfig;\r
    let scaleVal = 1;\r
\r
    switch (onHover) {\r
      case 'slowDown':\r
        transitionConfig = getTransition(spinDuration * 2, start);\r
        break;\r
      case 'speedUp':\r
        transitionConfig = getTransition(spinDuration / 4, start);\r
        break;\r
      case 'pause':\r
        transitionConfig = {\r
          rotate: { type: 'spring', damping: 20, stiffness: 300 },\r
          scale: { type: 'spring', damping: 20, stiffness: 300 }\r
        };\r
        scaleVal = 1;\r
        break;\r
      case 'goBonkers':\r
        transitionConfig = getTransition(spinDuration / 20, start);\r
        scaleVal = 0.8;\r
        break;\r
      default:\r
        transitionConfig = getTransition(spinDuration, start);\r
    }\r
\r
    controls.start({\r
      rotate: start + 360,\r
      scale: scaleVal,\r
      transition: transitionConfig\r
    });\r
  };\r
\r
  const handleHoverEnd = () => {\r
    const start = rotation.get();\r
    controls.start({\r
      rotate: start + 360,\r
      scale: 1,\r
      transition: getTransition(spinDuration, start)\r
    });\r
  };\r
\r
  return (\r
    <motion.div\r
      className={\`m-0 mx-auto rounded-full w-[200px] h-[200px] relative text-white font-black text-center cursor-pointer origin-center \${className}\`}\r
      style={{ rotate: rotation }}\r
      initial={{ rotate: 0 }}\r
      animate={controls}\r
      onMouseEnter={handleHoverStart}\r
      onMouseLeave={handleHoverEnd}\r
    >\r
      {letters.map((letter, i) => {\r
        const rotationDeg = (360 / letters.length) * i;\r
        const factor = Math.PI / letters.length;\r
        const x = factor * i;\r
        const y = factor * i;\r
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;\r
\r
        return (\r
          <span\r
            key={i}\r
            className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"\r
            style={{ transform, WebkitTransform: transform }}\r
          >\r
            {letter}\r
          </span>\r
        );\r
      })}\r
    </motion.div>\r
  );\r
};\r
\r
export default CircularText;\r
`,G=`import React, { useEffect } from 'react';\r
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from 'motion/react';\r
\r
import './CircularText.css';\r
interface CircularTextProps {\r
  text: string;\r
  spinDuration?: number;\r
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';\r
  className?: string;\r
}\r
\r
const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({\r
  from,\r
  to: from + 360,\r
  ease: 'linear' as const,\r
  duration,\r
  type: 'tween' as const,\r
  repeat: loop ? Infinity : 0\r
});\r
\r
const getTransition = (duration: number, from: number) => ({\r
  rotate: getRotationTransition(duration, from),\r
  scale: {\r
    type: 'spring' as const,\r
    damping: 20,\r
    stiffness: 300\r
  }\r
});\r
\r
const CircularText: React.FC<CircularTextProps> = ({\r
  text,\r
  spinDuration = 20,\r
  onHover = 'speedUp',\r
  className = ''\r
}) => {\r
  const letters = Array.from(text);\r
  const controls = useAnimation();\r
  const rotation: MotionValue<number> = useMotionValue(0);\r
\r
  useEffect(() => {\r
    const start = rotation.get();\r
    controls.start({\r
      rotate: start + 360,\r
      scale: 1,\r
      transition: getTransition(spinDuration, start)\r
    });\r
  }, [spinDuration, text, onHover, controls]);\r
\r
  const handleHoverStart = () => {\r
    const start = rotation.get();\r
\r
    if (!onHover) return;\r
\r
    let transitionConfig: ReturnType<typeof getTransition> | Transition;\r
    let scaleVal = 1;\r
\r
    switch (onHover) {\r
      case 'slowDown':\r
        transitionConfig = getTransition(spinDuration * 2, start);\r
        break;\r
      case 'speedUp':\r
        transitionConfig = getTransition(spinDuration / 4, start);\r
        break;\r
      case 'pause':\r
        transitionConfig = {\r
          rotate: { type: 'spring', damping: 20, stiffness: 300 },\r
          scale: { type: 'spring', damping: 20, stiffness: 300 }\r
        };\r
        break;\r
      case 'goBonkers':\r
        transitionConfig = getTransition(spinDuration / 20, start);\r
        scaleVal = 0.8;\r
        break;\r
      default:\r
        transitionConfig = getTransition(spinDuration, start);\r
    }\r
\r
    controls.start({\r
      rotate: start + 360,\r
      scale: scaleVal,\r
      transition: transitionConfig\r
    });\r
  };\r
\r
  const handleHoverEnd = () => {\r
    const start = rotation.get();\r
    controls.start({\r
      rotate: start + 360,\r
      scale: 1,\r
      transition: getTransition(spinDuration, start)\r
    });\r
  };\r
\r
  return (\r
    <motion.div\r
      className={\`circular-text \${className}\`}\r
      style={{ rotate: rotation }}\r
      initial={{ rotate: 0 }}\r
      animate={controls}\r
      onMouseEnter={handleHoverStart}\r
      onMouseLeave={handleHoverEnd}\r
    >\r
      {letters.map((letter, i) => {\r
        const rotationDeg = (360 / letters.length) * i;\r
        const factor = Math.PI / letters.length;\r
        const x = factor * i;\r
        const y = factor * i;\r
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;\r
\r
        return (\r
          <span key={i} style={{ transform, WebkitTransform: transform }}>\r
            {letter}\r
          </span>\r
        );\r
      })}\r
    </motion.div>\r
  );\r
};\r
\r
export default CircularText;\r
`,J=`import React, { useEffect } from 'react';\r
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from 'motion/react';\r
interface CircularTextProps {\r
  text: string;\r
  spinDuration?: number;\r
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';\r
  className?: string;\r
}\r
\r
const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({\r
  from,\r
  to: from + 360,\r
  ease: 'linear' as const,\r
  duration,\r
  type: 'tween' as const,\r
  repeat: loop ? Infinity : 0\r
});\r
\r
const getTransition = (duration: number, from: number) => ({\r
  rotate: getRotationTransition(duration, from),\r
  scale: {\r
    type: 'spring' as const,\r
    damping: 20,\r
    stiffness: 300\r
  }\r
});\r
\r
const CircularText: React.FC<CircularTextProps> = ({\r
  text,\r
  spinDuration = 20,\r
  onHover = 'speedUp',\r
  className = ''\r
}) => {\r
  const letters = Array.from(text);\r
  const controls = useAnimation();\r
  const rotation: MotionValue<number> = useMotionValue(0);\r
\r
  useEffect(() => {\r
    const start = rotation.get();\r
    controls.start({\r
      rotate: start + 360,\r
      scale: 1,\r
      transition: getTransition(spinDuration, start)\r
    });\r
  }, [spinDuration, text, onHover, controls]);\r
\r
  const handleHoverStart = () => {\r
    const start = rotation.get();\r
\r
    if (!onHover) return;\r
\r
    let transitionConfig: ReturnType<typeof getTransition> | Transition;\r
    let scaleVal = 1;\r
\r
    switch (onHover) {\r
      case 'slowDown':\r
        transitionConfig = getTransition(spinDuration * 2, start);\r
        break;\r
      case 'speedUp':\r
        transitionConfig = getTransition(spinDuration / 4, start);\r
        break;\r
      case 'pause':\r
        transitionConfig = {\r
          rotate: { type: 'spring', damping: 20, stiffness: 300 },\r
          scale: { type: 'spring', damping: 20, stiffness: 300 }\r
        };\r
        break;\r
      case 'goBonkers':\r
        transitionConfig = getTransition(spinDuration / 20, start);\r
        scaleVal = 0.8;\r
        break;\r
      default:\r
        transitionConfig = getTransition(spinDuration, start);\r
    }\r
\r
    controls.start({\r
      rotate: start + 360,\r
      scale: scaleVal,\r
      transition: transitionConfig\r
    });\r
  };\r
\r
  const handleHoverEnd = () => {\r
    const start = rotation.get();\r
    controls.start({\r
      rotate: start + 360,\r
      scale: 1,\r
      transition: getTransition(spinDuration, start)\r
    });\r
  };\r
\r
  return (\r
    <motion.div\r
      className={\`m-0 mx-auto rounded-full w-[200px] h-[200px] relative font-black text-white text-center cursor-pointer origin-center \${className}\`}\r
      style={{ rotate: rotation }}\r
      initial={{ rotate: 0 }}\r
      animate={controls}\r
      onMouseEnter={handleHoverStart}\r
      onMouseLeave={handleHoverEnd}\r
    >\r
      {letters.map((letter, i) => {\r
        const rotationDeg = (360 / letters.length) * i;\r
        const factor = Math.PI / letters.length;\r
        const x = factor * i;\r
        const y = factor * i;\r
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;\r
\r
        return (\r
          <span\r
            key={i}\r
            className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"\r
            style={{ transform, WebkitTransform: transform }}\r
          >\r
            {letter}\r
          </span>\r
        );\r
      })}\r
    </motion.div>\r
  );\r
};\r
\r
export default CircularText;\r
`,K={dependencies:"motion",usage:`import CircularText from './CircularText';
  
<CircularText
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/>`,code:Z,css:F,tailwind:q,tsCode:G,tsTailwind:J},an=()=>{const[n,r]=m.useState("REACT*BITS*COMPONENTS*"),[t,c]=m.useState("speedUp"),[a,s]=m.useState(20),l=[{name:"text",type:"string",default:"''",description:"The text to display in a circular layout."},{name:"spinDuration",type:"number",default:"20",description:"The duration (in seconds) for one full rotation."},{name:"onHover",type:"'slowDown' | 'speedUp' | 'pause' | 'goBonkers'",default:"undefined",description:"Specifies the hover behavior variant. Options include 'slowDown', 'speedUp', 'pause', and 'goBonkers'."},{name:"className",type:"string",default:"''",description:"Optional additional CSS classes to apply to the component."}],g=[{label:"Slow Down",value:"slowDown"},{label:"Speed Up",value:"speedUp"},{label:"Pause",value:"pause"},{label:"Go Bonkers",value:"goBonkers"}];return o.jsxs(E,{children:[o.jsxs(V,{children:[o.jsx(H,{position:"relative",className:"demo-container",h:400,overflow:"hidden",children:o.jsx(W,{text:n,onHover:t,spinDuration:a})}),o.jsxs(A,{className:"preview-options",children:[o.jsx(U,{title:"Text",value:n,placeholder:"Enter text...",width:220,maxLength:25,onChange:r}),o.jsx(R,{title:"On Hover",options:g,value:t,name:"setOnHover",width:150,onChange:u=>{c(u)}}),o.jsx($,{min:1,title:"Spin Duration (s)",max:60,step:1,value:a,onChange:u=>{s(u)}})]}),o.jsx(M,{data:l}),o.jsx(P,{dependencyList:["motion"]})]}),o.jsx(S,{children:o.jsx(N,{codeObject:K})})]})};export{an as default};
