import{r as o,j as r,g as h,S as R,B as x,T as S}from"./index-wsKSLPNH.js";import{T as C,P as y,a as T,C as w,b as E}from"./PropTable-C4uPWs8h.js";import{u as N}from"./useForceRerender-BCFU-k0M.js";import{D}from"./Dependencies-BHoMfJUj.js";import{P as b}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";h.registerPlugin(R);const v=({children:e,scrollContainerRef:t,containerClassName:u="",textClassName:m="",animationDuration:g=1,ease:p="back.inOut(2)",scrollStart:s="center bottom+=50%",scrollEnd:f="bottom bottom-=40%",stagger:n=.03})=>{const c=o.useRef(null),a=o.useMemo(()=>(typeof e=="string"?e:"").split("").map((l,d)=>r.jsx("span",{className:"char",children:l===" "?" ":l},d)),[e]);return o.useEffect(()=>{const i=c.current;if(!i)return;const l=t&&t.current?t.current:window,d=i.querySelectorAll(".char");h.fromTo(d,{willChange:"opacity, transform",opacity:0,yPercent:120,scaleY:2.3,scaleX:.7,transformOrigin:"50% 0%"},{duration:g,ease:p,opacity:1,yPercent:0,scaleY:1,scaleX:1,stagger:n,scrollTrigger:{trigger:i,scroller:l,start:s,end:f,scrub:!0}})},[t,g,p,s,f,n]),r.jsx("h2",{ref:c,className:`scroll-float ${u}`,children:r.jsx("span",{className:`scroll-float-text ${m}`,children:a})})},j=`import { useEffect, useMemo, useRef } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
import './ScrollFloat.css';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
const ScrollFloat = ({\r
  children,\r
  scrollContainerRef,\r
  containerClassName = '',\r
  textClassName = '',\r
  animationDuration = 1,\r
  ease = 'back.inOut(2)',\r
  scrollStart = 'center bottom+=50%',\r
  scrollEnd = 'bottom bottom-=40%',\r
  stagger = 0.03\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  const splitText = useMemo(() => {\r
    const text = typeof children === 'string' ? children : '';\r
    return text.split('').map((char, index) => (\r
      <span className="char" key={index}>\r
        {char === ' ' ? '\\u00A0' : char}\r
      </span>\r
    ));\r
  }, [children]);\r
\r
  useEffect(() => {\r
    const el = containerRef.current;\r
    if (!el) return;\r
\r
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;\r
\r
    const charElements = el.querySelectorAll('.char');\r
\r
    gsap.fromTo(\r
      charElements,\r
      {\r
        willChange: 'opacity, transform',\r
        opacity: 0,\r
        yPercent: 120,\r
        scaleY: 2.3,\r
        scaleX: 0.7,\r
        transformOrigin: '50% 0%'\r
      },\r
      {\r
        duration: animationDuration,\r
        ease: ease,\r
        opacity: 1,\r
        yPercent: 0,\r
        scaleY: 1,\r
        scaleX: 1,\r
        stagger: stagger,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: scrollStart,\r
          end: scrollEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);\r
\r
  return (\r
    <h2 ref={containerRef} className={\`scroll-float \${containerClassName}\`}>\r
      <span className={\`scroll-float-text \${textClassName}\`}>{splitText}</span>\r
    </h2>\r
  );\r
};\r
\r
export default ScrollFloat;\r
`,F=`.scroll-float {\r
  overflow: hidden;\r
}\r
\r
.scroll-float-text {\r
  display: inline-block;\r
  font-size: clamp(1.6rem, 8vw, 10rem);\r
  font-weight: 900;\r
  text-align: center;\r
  line-height: 1.5;\r
}\r
\r
.char {\r
  display: inline-block;\r
}\r
`,P=`import { useEffect, useMemo, useRef } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
const ScrollFloat = ({\r
  children,\r
  scrollContainerRef,\r
  containerClassName = '',\r
  textClassName = '',\r
  animationDuration = 1,\r
  ease = 'back.inOut(2)',\r
  scrollStart = 'center bottom+=50%',\r
  scrollEnd = 'bottom bottom-=40%',\r
  stagger = 0.03\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  const splitText = useMemo(() => {\r
    const text = typeof children === 'string' ? children : '';\r
    return text.split('').map((char, index) => (\r
      <span className="inline-block word" key={index}>\r
        {char === ' ' ? '\\u00A0' : char}\r
      </span>\r
    ));\r
  }, [children]);\r
\r
  useEffect(() => {\r
    const el = containerRef.current;\r
    if (!el) return;\r
\r
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;\r
\r
    const charElements = el.querySelectorAll('.inline-block');\r
\r
    gsap.fromTo(\r
      charElements,\r
      {\r
        willChange: 'opacity, transform',\r
        opacity: 0,\r
        yPercent: 120,\r
        scaleY: 2.3,\r
        scaleX: 0.7,\r
        transformOrigin: '50% 0%'\r
      },\r
      {\r
        duration: animationDuration,\r
        ease: ease,\r
        opacity: 1,\r
        yPercent: 0,\r
        scaleY: 1,\r
        scaleX: 1,\r
        stagger: stagger,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: scrollStart,\r
          end: scrollEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);\r
\r
  return (\r
    <h2 ref={containerRef} className={\`my-5 overflow-hidden \${containerClassName}\`}>\r
      <span className={\`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] \${textClassName}\`}>{splitText}</span>\r
    </h2>\r
  );\r
};\r
\r
export default ScrollFloat;\r
`,k=`import React, { useEffect, useMemo, useRef, ReactNode, RefObject } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
import './ScrollFloat.css';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
interface ScrollFloatProps {\r
  children: ReactNode;\r
  scrollContainerRef?: RefObject<HTMLElement>;\r
  containerClassName?: string;\r
  textClassName?: string;\r
  animationDuration?: number;\r
  ease?: string;\r
  scrollStart?: string;\r
  scrollEnd?: string;\r
  stagger?: number;\r
}\r
\r
const ScrollFloat: React.FC<ScrollFloatProps> = ({\r
  children,\r
  scrollContainerRef,\r
  containerClassName = '',\r
  textClassName = '',\r
  animationDuration = 1,\r
  ease = 'back.inOut(2)',\r
  scrollStart = 'center bottom+=50%',\r
  scrollEnd = 'bottom bottom-=40%',\r
  stagger = 0.03\r
}) => {\r
  const containerRef = useRef<HTMLHeadingElement>(null);\r
\r
  const splitText = useMemo(() => {\r
    const text = typeof children === 'string' ? children : '';\r
    return text.split('').map((char, index) => (\r
      <span className="char" key={index}>\r
        {char === ' ' ? '\\u00A0' : char}\r
      </span>\r
    ));\r
  }, [children]);\r
\r
  useEffect(() => {\r
    const el = containerRef.current;\r
    if (!el) return;\r
\r
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;\r
\r
    const charElements = el.querySelectorAll('.char');\r
\r
    gsap.fromTo(\r
      charElements,\r
      {\r
        willChange: 'opacity, transform',\r
        opacity: 0,\r
        yPercent: 120,\r
        scaleY: 2.3,\r
        scaleX: 0.7,\r
        transformOrigin: '50% 0%'\r
      },\r
      {\r
        duration: animationDuration,\r
        ease: ease,\r
        opacity: 1,\r
        yPercent: 0,\r
        scaleY: 1,\r
        scaleX: 1,\r
        stagger: stagger,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: scrollStart,\r
          end: scrollEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);\r
\r
  return (\r
    <h2 ref={containerRef} className={\`scroll-float \${containerClassName}\`}>\r
      <span className={\`scroll-float-text \${textClassName}\`}>{splitText}</span>\r
    </h2>\r
  );\r
};\r
\r
export default ScrollFloat;\r
`,O=`import React, { useEffect, useMemo, useRef, ReactNode, RefObject } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
interface ScrollFloatProps {\r
  children: ReactNode;\r
  scrollContainerRef?: RefObject<HTMLElement>;\r
  containerClassName?: string;\r
  textClassName?: string;\r
  animationDuration?: number;\r
  ease?: string;\r
  scrollStart?: string;\r
  scrollEnd?: string;\r
  stagger?: number;\r
}\r
\r
const ScrollFloat: React.FC<ScrollFloatProps> = ({\r
  children,\r
  scrollContainerRef,\r
  containerClassName = '',\r
  textClassName = '',\r
  animationDuration = 1,\r
  ease = 'back.inOut(2)',\r
  scrollStart = 'center bottom+=50%',\r
  scrollEnd = 'bottom bottom-=40%',\r
  stagger = 0.03\r
}) => {\r
  const containerRef = useRef<HTMLHeadingElement>(null);\r
\r
  const splitText = useMemo(() => {\r
    const text = typeof children === 'string' ? children : '';\r
    return text.split('').map((char, index) => (\r
      <span className="inline-block word" key={index}>\r
        {char === ' ' ? '\\u00A0' : char}\r
      </span>\r
    ));\r
  }, [children]);\r
\r
  useEffect(() => {\r
    const el = containerRef.current;\r
    if (!el) return;\r
\r
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;\r
\r
    const charElements = el.querySelectorAll('.inline-block');\r
\r
    gsap.fromTo(\r
      charElements,\r
      {\r
        willChange: 'opacity, transform',\r
        opacity: 0,\r
        yPercent: 120,\r
        scaleY: 2.3,\r
        scaleX: 0.7,\r
        transformOrigin: '50% 0%'\r
      },\r
      {\r
        duration: animationDuration,\r
        ease: ease,\r
        opacity: 1,\r
        yPercent: 0,\r
        scaleY: 1,\r
        scaleX: 1,\r
        stagger: stagger,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: scrollStart,\r
          end: scrollEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);\r
\r
  return (\r
    <h2 ref={containerRef} className={\`my-5 overflow-hidden \${containerClassName}\`}>\r
      <span className={\`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] \${textClassName}\`}>{splitText}</span>\r
    </h2>\r
  );\r
};\r
\r
export default ScrollFloat;\r
`,M={dependencies:"gsap",usage:`import ScrollFloat from './ScrollFloat';

<ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
  React Bits
</ScrollFloat>`,code:j,css:F,tailwind:P,tsCode:k,tsTailwind:O},q=()=>{const e=o.useRef(null),[t,u]=o.useState(.03),[m,g]=o.useState(1),[p,s]=N();o.useEffect(()=>{const n=e.current;if(!n)return;const c=a=>{a.preventDefault();const l=(a.deltaY||a.detail||a.wheelDelta)*2;h.to(n,{scrollTop:n.scrollTop+l,duration:2,ease:"power3.out",overwrite:"auto"})};return n.addEventListener("wheel",c,{passive:!1}),()=>{n.removeEventListener("wheel",c)}},[]);const f=[{name:"children",type:"ReactNode",default:"—",description:"The content to animate. If a string, it will be split into individual characters."},{name:"scrollContainerRef",type:"RefObject<HTMLElement>",default:"window",description:"Optional ref to the scroll container. Defaults to window if not provided."},{name:"containerClassName",type:"string",default:'""',description:"Additional Tailwind classes for the container element."},{name:"textClassName",type:"string",default:'""',description:"Additional Tailwind classes for the text element."},{name:"animationDuration",type:"number",default:"1",description:"Duration (in seconds) of the animation."},{name:"ease",type:"string",default:'"back.inOut(2)"',description:"Easing function used for the animation."},{name:"scrollStart",type:"string",default:'"center bottom+=50%"',description:"The scroll trigger start position."},{name:"scrollEnd",type:"string",default:'"bottom bottom-=40%"',description:"The scroll trigger end position."},{name:"stagger",type:"number",default:"0.03",description:"Delay between the animation start of each character."}];return r.jsxs(C,{children:[r.jsxs(y,{children:[r.jsxs(x,{className:"demo-container",style:{height:"500px",maxHeight:"500px"},overflowY:"scroll",overflowX:"hidden",ref:e,position:"relative",children:[r.jsx(S,{textAlign:"center",color:"#271E37",fontSize:"clamp(4rem, 6vw, 4rem)",fontWeight:900,position:"absolute",top:"50%",transform:"translateY(-50%)",children:"Scroll Down"}),r.jsx(x,{position:"relative",pt:1600,pb:600,px:"3rem",children:r.jsx(v,{stagger:t,animationDuration:m,scrollContainerRef:e,children:"React Bits"},p)})]}),r.jsxs("div",{className:"preview-options",children:[r.jsx("h2",{className:"demo-title-extra",children:"Customize"}),r.jsx(b,{title:"Stagger",min:.01,max:.1,step:.01,value:t,onChange:n=>{e.current.scrollTo({top:0,behavior:"smooth"}),u(n),s()},width:150}),r.jsx(b,{title:"Duration",min:1,max:10,step:.1,value:m,onChange:n=>{e.current.scrollTo({top:0,behavior:"smooth"}),g(n),s()},width:150})]}),r.jsx(T,{data:f}),r.jsx(D,{dependencyList:["gsap"]})]}),r.jsx(w,{children:r.jsx(E,{codeObject:M})})]})};export{q as default};
