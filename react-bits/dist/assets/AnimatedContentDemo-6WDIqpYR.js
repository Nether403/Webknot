import{r,g as b,S as w,j as e,B as z,F as A,a as j,T as R}from"./index-wsKSLPNH.js";import{T as I,P as N,a as F,C as $,b as B}from"./PropTable-C4uPWs8h.js";import{R as L}from"./RefreshButton-CA3SFRlq.js";import{D as W}from"./Dependencies-BHoMfJUj.js";import{u as H}from"./useForceRerender-BCFU-k0M.js";import{C as M}from"./Customize-1m_ZNqR9.js";import{P as o}from"./PreviewSlider-m1G_aiYP.js";import{P}from"./PreviewSwitch-DqnF708j.js";import"./index-Bpz4cGEA.js";b.registerPlugin(w);const _=({children:s,distance:l=100,direction:c="vertical",reverse:g=!1,duration:d=.8,ease:h="power3.out",initialOpacity:p=0,animateOpacity:y=!0,scale:u=1,threshold:x=.1,delay:i=0,onComplete:v})=>{const m=r.useRef(null);return r.useEffect(()=>{const a=m.current;if(!a)return;const f=c==="horizontal"?"x":"y",O=g?-l:l,C=(1-x)*100;return b.set(a,{[f]:O,scale:u,opacity:y?p:1}),b.to(a,{[f]:0,scale:1,opacity:1,duration:d,ease:h,delay:i,onComplete:v,scrollTrigger:{trigger:a,start:`top ${C}%`,toggleActions:"play none none none",once:!0}}),()=>{w.getAll().forEach(T=>T.kill()),b.killTweensOf(a)}},[l,c,g,d,h,p,y,u,x,i,v]),e.jsx("div",{ref:m,children:s})},G=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
const AnimatedContent = ({\r
  children,\r
  distance = 100,\r
  direction = 'vertical',\r
  reverse = false,\r
  duration = 0.8,\r
  ease = 'power3.out',\r
  initialOpacity = 0,\r
  animateOpacity = true,\r
  scale = 1,\r
  threshold = 0.1,\r
  delay = 0,\r
  onComplete\r
}) => {\r
  const ref = useRef(null);\r
\r
  useEffect(() => {\r
    const el = ref.current;\r
    if (!el) return;\r
\r
    const axis = direction === 'horizontal' ? 'x' : 'y';\r
    const offset = reverse ? -distance : distance;\r
    const startPct = (1 - threshold) * 100;\r
\r
    gsap.set(el, {\r
      [axis]: offset,\r
      scale,\r
      opacity: animateOpacity ? initialOpacity : 1\r
    });\r
\r
    gsap.to(el, {\r
      [axis]: 0,\r
      scale: 1,\r
      opacity: 1,\r
      duration,\r
      ease,\r
      delay,\r
      onComplete,\r
      scrollTrigger: {\r
        trigger: el,\r
        start: \`top \${startPct}%\`,\r
        toggleActions: 'play none none none',\r
        once: true\r
      }\r
    });\r
\r
    return () => {\r
      ScrollTrigger.getAll().forEach(t => t.kill());\r
      gsap.killTweensOf(el);\r
    };\r
  }, [\r
    distance,\r
    direction,\r
    reverse,\r
    duration,\r
    ease,\r
    initialOpacity,\r
    animateOpacity,\r
    scale,\r
    threshold,\r
    delay,\r
    onComplete\r
  ]);\r
\r
  return <div ref={ref}>{children}</div>;\r
};\r
\r
export default AnimatedContent;\r
`,q=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
const AnimatedContent = ({\r
  children,\r
  distance = 100,\r
  direction = 'vertical',\r
  reverse = false,\r
  duration = 0.8,\r
  ease = 'power3.out',\r
  initialOpacity = 0,\r
  animateOpacity = true,\r
  scale = 1,\r
  threshold = 0.1,\r
  delay = 0,\r
  onComplete\r
}) => {\r
  const ref = useRef(null);\r
\r
  useEffect(() => {\r
    const el = ref.current;\r
    if (!el) return;\r
\r
    const axis = direction === 'horizontal' ? 'x' : 'y';\r
    const offset = reverse ? -distance : distance;\r
    const startPct = (1 - threshold) * 100;\r
\r
    gsap.set(el, {\r
      [axis]: offset,\r
      scale,\r
      opacity: animateOpacity ? initialOpacity : 1\r
    });\r
\r
    gsap.to(el, {\r
      [axis]: 0,\r
      scale: 1,\r
      opacity: 1,\r
      duration,\r
      ease,\r
      delay,\r
      onComplete,\r
      scrollTrigger: {\r
        trigger: el,\r
        start: \`top \${startPct}%\`,\r
        toggleActions: 'play none none none',\r
        once: true\r
      }\r
    });\r
\r
    return () => {\r
      ScrollTrigger.getAll().forEach(t => t.kill());\r
      gsap.killTweensOf(el);\r
    };\r
  }, [\r
    distance,\r
    direction,\r
    reverse,\r
    duration,\r
    ease,\r
    initialOpacity,\r
    animateOpacity,\r
    scale,\r
    threshold,\r
    delay,\r
    onComplete\r
  ]);\r
\r
  return <div ref={ref}>{children}</div>;\r
};\r
\r
export default AnimatedContent;\r
`,J=`import React, { useRef, useEffect, ReactNode } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
interface AnimatedContentProps {\r
  children: ReactNode;\r
  distance?: number;\r
  direction?: 'vertical' | 'horizontal';\r
  reverse?: boolean;\r
  duration?: number;\r
  ease?: string | ((progress: number) => number);\r
  initialOpacity?: number;\r
  animateOpacity?: boolean;\r
  scale?: number;\r
  threshold?: number;\r
  delay?: number;\r
  onComplete?: () => void;\r
}\r
\r
const AnimatedContent: React.FC<AnimatedContentProps> = ({\r
  children,\r
  distance = 100,\r
  direction = 'vertical',\r
  reverse = false,\r
  duration = 0.8,\r
  ease = 'power3.out',\r
  initialOpacity = 0,\r
  animateOpacity = true,\r
  scale = 1,\r
  threshold = 0.1,\r
  delay = 0,\r
  onComplete\r
}) => {\r
  const ref = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const el = ref.current;\r
    if (!el) return;\r
\r
    const axis = direction === 'horizontal' ? 'x' : 'y';\r
    const offset = reverse ? -distance : distance;\r
    const startPct = (1 - threshold) * 100;\r
\r
    gsap.set(el, {\r
      [axis]: offset,\r
      scale,\r
      opacity: animateOpacity ? initialOpacity : 1\r
    });\r
\r
    gsap.to(el, {\r
      [axis]: 0,\r
      scale: 1,\r
      opacity: 1,\r
      duration,\r
      ease,\r
      delay,\r
      onComplete,\r
      scrollTrigger: {\r
        trigger: el,\r
        start: \`top \${startPct}%\`,\r
        toggleActions: 'play none none none',\r
        once: true\r
      }\r
    });\r
\r
    return () => {\r
      ScrollTrigger.getAll().forEach(t => t.kill());\r
      gsap.killTweensOf(el);\r
    };\r
  }, [\r
    distance,\r
    direction,\r
    reverse,\r
    duration,\r
    ease,\r
    initialOpacity,\r
    animateOpacity,\r
    scale,\r
    threshold,\r
    delay,\r
    onComplete\r
  ]);\r
\r
  return <div ref={ref}>{children}</div>;\r
};\r
\r
export default AnimatedContent;\r
`,K=`import React, { useRef, useEffect, ReactNode } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
interface AnimatedContentProps {\r
  children: ReactNode;\r
  distance?: number;\r
  direction?: 'vertical' | 'horizontal';\r
  reverse?: boolean;\r
  duration?: number;\r
  ease?: string | ((progress: number) => number);\r
  initialOpacity?: number;\r
  animateOpacity?: boolean;\r
  scale?: number;\r
  threshold?: number;\r
  delay?: number;\r
  onComplete?: () => void;\r
}\r
\r
const AnimatedContent: React.FC<AnimatedContentProps> = ({\r
  children,\r
  distance = 100,\r
  direction = 'vertical',\r
  reverse = false,\r
  duration = 0.8,\r
  ease = 'power3.out',\r
  initialOpacity = 0,\r
  animateOpacity = true,\r
  scale = 1,\r
  threshold = 0.1,\r
  delay = 0,\r
  onComplete\r
}) => {\r
  const ref = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const el = ref.current;\r
    if (!el) return;\r
\r
    const axis = direction === 'horizontal' ? 'x' : 'y';\r
    const offset = reverse ? -distance : distance;\r
    const startPct = (1 - threshold) * 100;\r
\r
    gsap.set(el, {\r
      [axis]: offset,\r
      scale,\r
      opacity: animateOpacity ? initialOpacity : 1\r
    });\r
\r
    gsap.to(el, {\r
      [axis]: 0,\r
      scale: 1,\r
      opacity: 1,\r
      duration,\r
      ease,\r
      delay,\r
      onComplete,\r
      scrollTrigger: {\r
        trigger: el,\r
        start: \`top \${startPct}%\`,\r
        toggleActions: 'play none none none',\r
        once: true\r
      }\r
    });\r
\r
    return () => {\r
      ScrollTrigger.getAll().forEach(t => t.kill());\r
      gsap.killTweensOf(el);\r
    };\r
  }, [\r
    distance,\r
    direction,\r
    reverse,\r
    duration,\r
    ease,\r
    initialOpacity,\r
    animateOpacity,\r
    scale,\r
    threshold,\r
    delay,\r
    onComplete\r
  ]);\r
\r
  return <div ref={ref}>{children}</div>;\r
};\r
\r
export default AnimatedContent;\r
`,Q={dependencies:"gsap",usage:`import AnimatedContent from './AnimatedContent'

<AnimatedContent
  distance={150}
  direction="horizontal"
  reverse={false}
  duration={1.2}
  ease="bounce.out"
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
  delay={0.3}
>
  <div>Content to Animate</div>
</AnimatedContent>`,code:G,tailwind:q,tsCode:J,tsTailwind:K},ie=()=>{const[s,l]=r.useState("vertical"),[c,g]=r.useState(100),[d,h]=r.useState(0),[p,y]=r.useState(!1),[u,x]=r.useState(.8),[i,v]=r.useState("power3.out"),[m,a]=r.useState(0),[f,O]=r.useState(!0),[C,T]=r.useState(1),[S,E]=r.useState(.1),[D,t]=H(),k=[{name:"children",type:"ReactNode",default:"",description:"The content to be animated."},{name:"distance",type:"number",default:"100",description:"Distance (in pixels) the component moves during animation."},{name:"direction",type:"string",default:'"vertical"',description:'Animation direction. Can be "vertical" or "horizontal".'},{name:"reverse",type:"boolean",default:"false",description:"Whether the animation moves in the reverse direction."},{name:"duration",type:"number",default:"0.8",description:"Duration of the animation in seconds."},{name:"ease",type:"string",default:'"power3.out"',description:"GSAP easing function for the animation."},{name:"initialOpacity",type:"number",default:"0",description:"Initial opacity before animation begins."},{name:"animateOpacity",type:"boolean",default:"true",description:"Whether to animate opacity during transition."},{name:"scale",type:"number",default:"1",description:"Initial scale of the component."},{name:"threshold",type:"number",default:"0.1",description:"Intersection threshold to trigger animation (0-1)."},{name:"delay",type:"number",default:"0",description:"Delay before animation starts (in seconds)."},{name:"onComplete",type:"function",default:"undefined",description:"Callback function called when animation completes."}];return e.jsxs(I,{children:[e.jsxs(N,{children:[e.jsxs(z,{position:"relative",className:"demo-container",minH:400,overflow:"hidden",children:[e.jsx(L,{onClick:t}),e.jsx(_,{direction:s,delay:d,distance:c,reverse:p,duration:u,ease:i,initialOpacity:m,animateOpacity:f,scale:C,threshold:S,children:e.jsx(A,{fontSize:"xl",fontWeight:"bolder",justifyContent:"center",alignItems:"center",color:"#fff",h:100,borderRadius:"25px",border:"1px solid #392e4e",w:200,bg:"#060010",children:"Animate Me"})},D)]}),e.jsxs(M,{children:[e.jsxs(A,{gap:2,wrap:"wrap",children:[e.jsxs(j,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:8,onClick:()=>{l(s==="vertical"?"horizontal":"vertical"),t()},children:["Direction: ",e.jsxs(R,{color:"#a1a1aa",children:[" ",String(s)]})]}),e.jsxs(j,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:8,onClick:()=>{v(i==="power3.out"?"bounce.out":i==="bounce.out"?"elastic.out(1, 0.3)":"power3.out"),t()},children:["Ease: ",e.jsxs(R,{color:"#a1a1aa",children:[" ",i]})]})]}),e.jsx(P,{title:"Reverse Direction",isChecked:p,onChange:n=>{y(n),t()}}),e.jsx(P,{title:"Animate Opacity",isChecked:f,onChange:n=>{O(n),t()}}),e.jsx(o,{title:"Distance",min:50,max:300,step:10,value:c,onChange:n=>{g(n),t()}}),e.jsx(o,{title:"Duration",min:.1,max:3,step:.1,value:u,onChange:n=>{x(n),t()}}),e.jsx(o,{title:"Delay",min:0,max:2,step:.1,value:d,onChange:n=>{h(n),t()}}),e.jsx(o,{title:"Initial Opacity",min:0,max:1,step:.1,value:m,onChange:n=>{a(n),t()}}),e.jsx(o,{title:"Initial Scale",min:.1,max:2,step:.1,value:C,onChange:n=>{T(n),t()}}),e.jsx(o,{title:"Threshold",min:.1,max:1,step:.1,value:S,onChange:n=>{E(n),t()}})]}),e.jsx(F,{data:k}),e.jsx(W,{dependencyList:["gsap"]})]}),e.jsx($,{children:e.jsx(B,{codeObject:Q})})]})};export{ie as default};
