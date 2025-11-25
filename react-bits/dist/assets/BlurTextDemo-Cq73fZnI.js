import{r as o,j as r,q as R,B as E,u as F,F as I,a as w,T}from"./index-wsKSLPNH.js";import{T as N,P as K,a as V,C as O,b as P}from"./PropTable-C4uPWs8h.js";import{R as _}from"./RefreshButton-CA3SFRlq.js";import{D as L}from"./Dependencies-BHoMfJUj.js";import{u as z}from"./useForceRerender-BCFU-k0M.js";import{C as H}from"./Customize-1m_ZNqR9.js";import{P as W}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";const $=(e,m)=>{const s=new Set([...Object.keys(e),...m.flatMap(n=>Object.keys(n))]),i={};return s.forEach(n=>{i[n]=[e[n],...m.map(l=>l[n])]}),i},q=({text:e="",delay:m=200,className:s="",animateBy:i="words",direction:n="top",threshold:l=.1,rootMargin:u="0px",animationFrom:c,animationTo:y,easing:x=p=>p,onAnimationComplete:k,stepDuration:C=.35})=>{const p=i==="words"?e.split(" "):e.split(""),[S,v]=o.useState(!1),f=o.useRef(null);o.useEffect(()=>{if(!f.current)return;const a=new IntersectionObserver(([t])=>{t.isIntersecting&&(v(!0),a.unobserve(f.current))},{threshold:l,rootMargin:u});return a.observe(f.current),()=>a.disconnect()},[l,u]);const A=o.useMemo(()=>n==="top"?{filter:"blur(10px)",opacity:0,y:-50}:{filter:"blur(10px)",opacity:0,y:50},[n]),B=o.useMemo(()=>[{filter:"blur(5px)",opacity:.5,y:n==="top"?5:-5},{filter:"blur(0px)",opacity:1,y:0}],[n]),h=c??A,b=y??B,d=b.length+1,M=C*(d-1),D=Array.from({length:d},(a,t)=>d===1?0:t/(d-1));return r.jsx("p",{ref:f,className:s,style:{display:"flex",flexWrap:"wrap"},children:p.map((a,t)=>{const j=$(h,b),g={duration:M,times:D,delay:t*m/1e3};return g.ease=x,r.jsxs(R.span,{className:"inline-block will-change-[transform,filter,opacity]",initial:h,animate:S?j:h,transition:g,onAnimationComplete:t===p.length-1?k:void 0,children:[a===" "?" ":a,i==="words"&&t<p.length-1&&" "]},t)})})},U=`import { motion } from 'motion/react';\r
import { useEffect, useRef, useState, useMemo } from 'react';\r
\r
const buildKeyframes = (from, steps) => {\r
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);\r
\r
  const keyframes = {};\r
  keys.forEach(k => {\r
    keyframes[k] = [from[k], ...steps.map(s => s[k])];\r
  });\r
  return keyframes;\r
};\r
\r
const BlurText = ({\r
  text = '',\r
  delay = 200,\r
  className = '',\r
  animateBy = 'words',\r
  direction = 'top',\r
  threshold = 0.1,\r
  rootMargin = '0px',\r
  animationFrom,\r
  animationTo,\r
  easing = t => t,\r
  onAnimationComplete,\r
  stepDuration = 0.35\r
}) => {\r
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');\r
  const [inView, setInView] = useState(false);\r
  const ref = useRef(null);\r
\r
  useEffect(() => {\r
    if (!ref.current) return;\r
    const observer = new IntersectionObserver(\r
      ([entry]) => {\r
        if (entry.isIntersecting) {\r
          setInView(true);\r
          observer.unobserve(ref.current);\r
        }\r
      },\r
      { threshold, rootMargin }\r
    );\r
    observer.observe(ref.current);\r
    return () => observer.disconnect();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [threshold, rootMargin]);\r
\r
  const defaultFrom = useMemo(\r
    () =>\r
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },\r
    [direction]\r
  );\r
\r
  const defaultTo = useMemo(\r
    () => [\r
      {\r
        filter: 'blur(5px)',\r
        opacity: 0.5,\r
        y: direction === 'top' ? 5 : -5\r
      },\r
      { filter: 'blur(0px)', opacity: 1, y: 0 }\r
    ],\r
    [direction]\r
  );\r
\r
  const fromSnapshot = animationFrom ?? defaultFrom;\r
  const toSnapshots = animationTo ?? defaultTo;\r
\r
  const stepCount = toSnapshots.length + 1;\r
  const totalDuration = stepDuration * (stepCount - 1);\r
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));\r
\r
  return (\r
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>\r
      {elements.map((segment, index) => {\r
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);\r
\r
        const spanTransition = {\r
          duration: totalDuration,\r
          times,\r
          delay: (index * delay) / 1000\r
        };\r
        spanTransition.ease = easing;\r
\r
        return (\r
          <motion.span\r
            className="inline-block will-change-[transform,filter,opacity]"\r
            key={index}\r
            initial={fromSnapshot}\r
            animate={inView ? animateKeyframes : fromSnapshot}\r
            transition={spanTransition}\r
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}\r
          >\r
            {segment === ' ' ? '\\u00A0' : segment}\r
            {animateBy === 'words' && index < elements.length - 1 && '\\u00A0'}\r
          </motion.span>\r
        );\r
      })}\r
    </p>\r
  );\r
};\r
\r
export default BlurText;\r
`,G=`import { motion } from 'motion/react';\r
import { useEffect, useRef, useState, useMemo } from 'react';\r
\r
const buildKeyframes = (from, steps) => {\r
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);\r
\r
  const keyframes = {};\r
  keys.forEach(k => {\r
    keyframes[k] = [from[k], ...steps.map(s => s[k])];\r
  });\r
  return keyframes;\r
};\r
\r
const BlurText = ({\r
  text = '',\r
  delay = 200,\r
  className = '',\r
  animateBy = 'words',\r
  direction = 'top',\r
  threshold = 0.1,\r
  rootMargin = '0px',\r
  animationFrom,\r
  animationTo,\r
  easing = t => t,\r
  onAnimationComplete,\r
  stepDuration = 0.35\r
}) => {\r
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');\r
  const [inView, setInView] = useState(false);\r
  const ref = useRef(null);\r
\r
  useEffect(() => {\r
    if (!ref.current) return;\r
    const observer = new IntersectionObserver(\r
      ([entry]) => {\r
        if (entry.isIntersecting) {\r
          setInView(true);\r
          observer.unobserve(ref.current);\r
        }\r
      },\r
      { threshold, rootMargin }\r
    );\r
    observer.observe(ref.current);\r
    return () => observer.disconnect();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [threshold, rootMargin]);\r
\r
  const defaultFrom = useMemo(\r
    () =>\r
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },\r
    [direction]\r
  );\r
\r
  const defaultTo = useMemo(\r
    () => [\r
      {\r
        filter: 'blur(5px)',\r
        opacity: 0.5,\r
        y: direction === 'top' ? 5 : -5\r
      },\r
      { filter: 'blur(0px)', opacity: 1, y: 0 }\r
    ],\r
    [direction]\r
  );\r
\r
  const fromSnapshot = animationFrom ?? defaultFrom;\r
  const toSnapshots = animationTo ?? defaultTo;\r
\r
  const stepCount = toSnapshots.length + 1;\r
  const totalDuration = stepDuration * (stepCount - 1);\r
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));\r
\r
  return (\r
    <p ref={ref} className={\`blur-text \${className} flex flex-wrap\`}>\r
      {elements.map((segment, index) => {\r
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);\r
\r
        const spanTransition = {\r
          duration: totalDuration,\r
          times,\r
          delay: (index * delay) / 1000\r
        };\r
        spanTransition.ease = easing;\r
\r
        return (\r
          <motion.span\r
            className="inline-block will-change-[transform,filter,opacity]"\r
            key={index}\r
            initial={fromSnapshot}\r
            animate={inView ? animateKeyframes : fromSnapshot}\r
            transition={spanTransition}\r
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}\r
          >\r
            {segment === ' ' ? '\\u00A0' : segment}\r
            {animateBy === 'words' && index < elements.length - 1 && '\\u00A0'}\r
          </motion.span>\r
        );\r
      })}\r
    </p>\r
  );\r
};\r
\r
export default BlurText;\r
`,J=`import { motion, Transition } from 'motion/react';\r
import { useEffect, useRef, useState, useMemo } from 'react';\r
\r
type BlurTextProps = {\r
  text?: string;\r
  delay?: number;\r
  className?: string;\r
  animateBy?: 'words' | 'letters';\r
  direction?: 'top' | 'bottom';\r
  threshold?: number;\r
  rootMargin?: string;\r
  animationFrom?: Record<string, string | number>;\r
  animationTo?: Array<Record<string, string | number>>;\r
  easing?: (t: number) => number;\r
  onAnimationComplete?: () => void;\r
  stepDuration?: number;\r
};\r
\r
const buildKeyframes = (\r
  from: Record<string, string | number>,\r
  steps: Array<Record<string, string | number>>\r
): Record<string, Array<string | number>> => {\r
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);\r
\r
  const keyframes: Record<string, Array<string | number>> = {};\r
  keys.forEach(k => {\r
    keyframes[k] = [from[k], ...steps.map(s => s[k])];\r
  });\r
  return keyframes;\r
};\r
\r
const BlurText: React.FC<BlurTextProps> = ({\r
  text = '',\r
  delay = 200,\r
  className = '',\r
  animateBy = 'words',\r
  direction = 'top',\r
  threshold = 0.1,\r
  rootMargin = '0px',\r
  animationFrom,\r
  animationTo,\r
  easing = (t: number) => t,\r
  onAnimationComplete,\r
  stepDuration = 0.35\r
}) => {\r
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');\r
  const [inView, setInView] = useState(false);\r
  const ref = useRef<HTMLParagraphElement>(null);\r
\r
  useEffect(() => {\r
    if (!ref.current) return;\r
    const observer = new IntersectionObserver(\r
      ([entry]) => {\r
        if (entry.isIntersecting) {\r
          setInView(true);\r
          observer.unobserve(ref.current as Element);\r
        }\r
      },\r
      { threshold, rootMargin }\r
    );\r
    observer.observe(ref.current);\r
    return () => observer.disconnect();\r
  }, [threshold, rootMargin]);\r
\r
  const defaultFrom = useMemo(\r
    () =>\r
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },\r
    [direction]\r
  );\r
\r
  const defaultTo = useMemo(\r
    () => [\r
      {\r
        filter: 'blur(5px)',\r
        opacity: 0.5,\r
        y: direction === 'top' ? 5 : -5\r
      },\r
      { filter: 'blur(0px)', opacity: 1, y: 0 }\r
    ],\r
    [direction]\r
  );\r
\r
  const fromSnapshot = animationFrom ?? defaultFrom;\r
  const toSnapshots = animationTo ?? defaultTo;\r
\r
  const stepCount = toSnapshots.length + 1;\r
  const totalDuration = stepDuration * (stepCount - 1);\r
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));\r
\r
  return (\r
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>\r
      {elements.map((segment, index) => {\r
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);\r
\r
        const spanTransition: Transition = {\r
          duration: totalDuration,\r
          times,\r
          delay: (index * delay) / 1000,\r
          ease: easing\r
        };\r
\r
        return (\r
          <motion.span\r
            key={index}\r
            initial={fromSnapshot}\r
            animate={inView ? animateKeyframes : fromSnapshot}\r
            transition={spanTransition}\r
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}\r
            style={{\r
              display: 'inline-block',\r
              willChange: 'transform, filter, opacity'\r
            }}\r
          >\r
            {segment === ' ' ? '\\u00A0' : segment}\r
            {animateBy === 'words' && index < elements.length - 1 && '\\u00A0'}\r
          </motion.span>\r
        );\r
      })}\r
    </p>\r
  );\r
};\r
\r
export default BlurText;\r
`,Q=`import { motion, Transition, Easing } from 'motion/react';\r
import { useEffect, useRef, useState, useMemo } from 'react';\r
\r
type BlurTextProps = {\r
  text?: string;\r
  delay?: number;\r
  className?: string;\r
  animateBy?: 'words' | 'letters';\r
  direction?: 'top' | 'bottom';\r
  threshold?: number;\r
  rootMargin?: string;\r
  animationFrom?: Record<string, string | number>;\r
  animationTo?: Array<Record<string, string | number>>;\r
  easing?: Easing | Easing[];\r
  onAnimationComplete?: () => void;\r
  stepDuration?: number;\r
};\r
\r
const buildKeyframes = (\r
  from: Record<string, string | number>,\r
  steps: Array<Record<string, string | number>>\r
): Record<string, Array<string | number>> => {\r
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);\r
\r
  const keyframes: Record<string, Array<string | number>> = {};\r
  keys.forEach(k => {\r
    keyframes[k] = [from[k], ...steps.map(s => s[k])];\r
  });\r
  return keyframes;\r
};\r
\r
const BlurText: React.FC<BlurTextProps> = ({\r
  text = '',\r
  delay = 200,\r
  className = '',\r
  animateBy = 'words',\r
  direction = 'top',\r
  threshold = 0.1,\r
  rootMargin = '0px',\r
  animationFrom,\r
  animationTo,\r
  easing = (t: number) => t,\r
  onAnimationComplete,\r
  stepDuration = 0.35\r
}) => {\r
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');\r
  const [inView, setInView] = useState(false);\r
  const ref = useRef<HTMLParagraphElement>(null);\r
\r
  useEffect(() => {\r
    if (!ref.current) return;\r
    const observer = new IntersectionObserver(\r
      ([entry]) => {\r
        if (entry.isIntersecting) {\r
          setInView(true);\r
          observer.unobserve(ref.current as Element);\r
        }\r
      },\r
      { threshold, rootMargin }\r
    );\r
    observer.observe(ref.current);\r
    return () => observer.disconnect();\r
  }, [threshold, rootMargin]);\r
\r
  const defaultFrom = useMemo(\r
    () =>\r
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },\r
    [direction]\r
  );\r
\r
  const defaultTo = useMemo(\r
    () => [\r
      {\r
        filter: 'blur(5px)',\r
        opacity: 0.5,\r
        y: direction === 'top' ? 5 : -5\r
      },\r
      { filter: 'blur(0px)', opacity: 1, y: 0 }\r
    ],\r
    [direction]\r
  );\r
\r
  const fromSnapshot = animationFrom ?? defaultFrom;\r
  const toSnapshots = animationTo ?? defaultTo;\r
\r
  const stepCount = toSnapshots.length + 1;\r
  const totalDuration = stepDuration * (stepCount - 1);\r
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));\r
\r
  return (\r
    <p ref={ref} className={\`blur-text \${className} flex flex-wrap\`}>\r
      {elements.map((segment, index) => {\r
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);\r
\r
        const spanTransition: Transition = {\r
          duration: totalDuration,\r
          times,\r
          delay: (index * delay) / 1000,\r
          ease: easing\r
        };\r
\r
        return (\r
          <motion.span\r
            key={index}\r
            initial={fromSnapshot}\r
            animate={inView ? animateKeyframes : fromSnapshot}\r
            transition={spanTransition}\r
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}\r
            style={{\r
              display: 'inline-block',\r
              willChange: 'transform, filter, opacity'\r
            }}\r
          >\r
            {segment === ' ' ? '\\u00A0' : segment}\r
            {animateBy === 'words' && index < elements.length - 1 && '\\u00A0'}\r
          </motion.span>\r
        );\r
      })}\r
    </p>\r
  );\r
};\r
\r
export default BlurText;\r
`,X={dependencies:"motion",usage:`import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

<BlurText
  text="Isn't this so cool?!"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-2xl mb-8"
/>`,code:U,tailwind:G,tsCode:J,tsTailwind:Q},ir=()=>{const[e,m]=o.useState("words"),[s,i]=o.useState("top"),[n,l]=o.useState(200),[u,c]=z(),y=[{name:"text",type:"string",default:'""',description:"The text content to animate."},{name:"animateBy",type:"string",default:'"words"',description:"Determines whether to animate by 'words' or 'letters'."},{name:"direction",type:"string",default:'"top"',description:"Direction from which the words/letters appear ('top' or 'bottom')."},{name:"delay",type:"number",default:"200",description:"Delay between animations for each word/letter (in ms)."},{name:"stepDuration",type:"number",default:"0.35",description:"The time taken for each letter/word to animate (in seconds)."},{name:"threshold",type:"number",default:"0.1",description:"Intersection threshold for triggering the animation."},{name:"rootMargin",type:"string",default:'"0px"',description:"Root margin for the intersection observer."},{name:"onAnimationComplete",type:"function",default:"undefined",description:"Callback function triggered when all animations complete."}];return r.jsxs(N,{children:[r.jsxs(K,{children:[r.jsxs(E,{position:"relative",className:"demo-container",minH:400,overflow:"hidden",children:[r.jsx(_,{onClick:c}),r.jsx(q,{text:"Isn't this so cool?!",animateBy:e,direction:s,delay:n,onAnimationComplete:()=>F("✅ Animation Finished!"),className:"blur-text-demo"},u)]}),r.jsxs(H,{children:[r.jsxs(I,{gap:4,wrap:"wrap",children:[r.jsxs(w,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:8,onClick:()=>{m(e==="words"?"letters":"words"),c()},children:["Animate By: ",r.jsxs(T,{color:"#a1a1aa",children:[" ",e]})]}),r.jsxs(w,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:8,onClick:()=>{i(s==="top"?"bottom":"top"),c()},children:["Direction: ",r.jsxs(T,{color:"#a1a1aa",children:[" ",s]})]})]}),r.jsx(W,{title:"Delay",min:50,max:500,step:10,value:n,valueUnit:"ms",onChange:x=>{l(x),c()},width:200})]}),r.jsx(V,{data:y}),r.jsx(L,{dependencyList:["motion"]})]}),r.jsx(O,{children:r.jsx(P,{codeObject:X})})]})};export{ir as default};
