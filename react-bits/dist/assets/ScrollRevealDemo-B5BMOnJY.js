import{r as l,j as n,g,S as T,B as x,T as E}from"./index-wsKSLPNH.js";import{T as y,P as C,a as v,C as N,b as A}from"./PropTable-C4uPWs8h.js";import{u as O}from"./useForceRerender-BCFU-k0M.js";import{D as j}from"./Dependencies-BHoMfJUj.js";import{P as w}from"./PreviewSlider-m1G_aiYP.js";import{P as B}from"./PreviewSwitch-DqnF708j.js";import{C as $}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";g.registerPlugin(T);const P=({children:e,scrollContainerRef:a,enableBlur:u=!0,baseOpacity:i=.1,baseRotation:p=3,blurStrength:c=4,containerClassName:b="",textClassName:d="",rotationEnd:f="bottom bottom",wordAnimationEnd:m="bottom bottom"})=>{const s=l.useRef(null),h=l.useMemo(()=>(typeof e=="string"?e:"").split(/(\s+)/).map((t,o)=>t.match(/^\s+$/)?t:n.jsx("span",{className:"word",children:t},o)),[e]);return l.useEffect(()=>{const r=s.current;if(!r)return;const t=a&&a.current?a.current:window;g.fromTo(r,{transformOrigin:"0% 50%",rotate:p},{ease:"none",rotate:0,scrollTrigger:{trigger:r,scroller:t,start:"top bottom",end:f,scrub:!0}});const o=r.querySelectorAll(".word");return g.fromTo(o,{opacity:i,willChange:"opacity"},{ease:"none",opacity:1,stagger:.05,scrollTrigger:{trigger:r,scroller:t,start:"top bottom-=20%",end:m,scrub:!0}}),u&&g.fromTo(o,{filter:`blur(${c}px)`},{ease:"none",filter:"blur(0px)",stagger:.05,scrollTrigger:{trigger:r,scroller:t,start:"top bottom-=20%",end:m,scrub:!0}}),()=>{T.getAll().forEach(R=>R.kill())}},[a,u,p,i,f,m,c]),n.jsx("h2",{ref:s,className:`scroll-reveal ${b}`,children:n.jsx("p",{className:`scroll-reveal-text ${d}`,children:h})})},M=`import { useEffect, useRef, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
import './ScrollReveal.css';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
const ScrollReveal = ({\r
  children,\r
  scrollContainerRef,\r
  enableBlur = true,\r
  baseOpacity = 0.1,\r
  baseRotation = 3,\r
  blurStrength = 4,\r
  containerClassName = '',\r
  textClassName = '',\r
  rotationEnd = 'bottom bottom',\r
  wordAnimationEnd = 'bottom bottom'\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  const splitText = useMemo(() => {\r
    const text = typeof children === 'string' ? children : '';\r
    return text.split(/(\\s+)/).map((word, index) => {\r
      if (word.match(/^\\s+$/)) return word;\r
      return (\r
        <span className="word" key={index}>\r
          {word}\r
        </span>\r
      );\r
    });\r
  }, [children]);\r
\r
  useEffect(() => {\r
    const el = containerRef.current;\r
    if (!el) return;\r
\r
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;\r
\r
    gsap.fromTo(\r
      el,\r
      { transformOrigin: '0% 50%', rotate: baseRotation },\r
      {\r
        ease: 'none',\r
        rotate: 0,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: 'top bottom',\r
          end: rotationEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
\r
    const wordElements = el.querySelectorAll('.word');\r
\r
    gsap.fromTo(\r
      wordElements,\r
      { opacity: baseOpacity, willChange: 'opacity' },\r
      {\r
        ease: 'none',\r
        opacity: 1,\r
        stagger: 0.05,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: 'top bottom-=20%',\r
          end: wordAnimationEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
\r
    if (enableBlur) {\r
      gsap.fromTo(\r
        wordElements,\r
        { filter: \`blur(\${blurStrength}px)\` },\r
        {\r
          ease: 'none',\r
          filter: 'blur(0px)',\r
          stagger: 0.05,\r
          scrollTrigger: {\r
            trigger: el,\r
            scroller,\r
            start: 'top bottom-=20%',\r
            end: wordAnimationEnd,\r
            scrub: true\r
          }\r
        }\r
      );\r
    }\r
\r
    return () => {\r
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());\r
    };\r
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);\r
\r
  return (\r
    <h2 ref={containerRef} className={\`scroll-reveal \${containerClassName}\`}>\r
      <p className={\`scroll-reveal-text \${textClassName}\`}>{splitText}</p>\r
    </h2>\r
  );\r
};\r
\r
export default ScrollReveal;\r
`,k=`.scroll-reveal {\r
  margin: 20px 0;\r
}\r
\r
.scroll-reveal-text {\r
  font-size: clamp(1.6rem, 4vw, 3rem);\r
  line-height: 1.5;\r
  font-weight: 600;\r
}\r
\r
.word {\r
  display: inline-block;\r
}\r
`,L=`import { useEffect, useRef, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
const ScrollReveal = ({\r
  children,\r
  scrollContainerRef,\r
  enableBlur = true,\r
  baseOpacity = 0.1,\r
  baseRotation = 3,\r
  blurStrength = 4,\r
  containerClassName = '',\r
  textClassName = '',\r
  rotationEnd = 'bottom bottom',\r
  wordAnimationEnd = 'bottom bottom'\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  const splitText = useMemo(() => {\r
    const text = typeof children === 'string' ? children : '';\r
    return text.split(/(\\s+)/).map((word, index) => {\r
      if (word.match(/^\\s+$/)) return word;\r
      return (\r
        <span className="inline-block word" key={index}>\r
          {word}\r
        </span>\r
      );\r
    });\r
  }, [children]);\r
\r
  useEffect(() => {\r
    const el = containerRef.current;\r
    if (!el) return;\r
\r
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;\r
\r
    gsap.fromTo(\r
      el,\r
      { transformOrigin: '0% 50%', rotate: baseRotation },\r
      {\r
        ease: 'none',\r
        rotate: 0,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: 'top bottom',\r
          end: rotationEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
\r
    const wordElements = el.querySelectorAll('.word');\r
\r
    gsap.fromTo(\r
      wordElements,\r
      { opacity: baseOpacity, willChange: 'opacity' },\r
      {\r
        ease: 'none',\r
        opacity: 1,\r
        stagger: 0.05,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: 'top bottom-=20%',\r
          end: wordAnimationEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
\r
    if (enableBlur) {\r
      gsap.fromTo(\r
        wordElements,\r
        { filter: \`blur(\${blurStrength}px)\` },\r
        {\r
          ease: 'none',\r
          filter: 'blur(0px)',\r
          stagger: 0.05,\r
          scrollTrigger: {\r
            trigger: el,\r
            scroller,\r
            start: 'top bottom-=20%',\r
            end: wordAnimationEnd,\r
            scrub: true\r
          }\r
        }\r
      );\r
    }\r
\r
    return () => {\r
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());\r
    };\r
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);\r
\r
  return (\r
    <h2 ref={containerRef} className={\`my-5 \${containerClassName}\`}>\r
      <p className={\`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold \${textClassName}\`}>{splitText}</p>\r
    </h2>\r
  );\r
};\r
\r
export default ScrollReveal;\r
`,W=`import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
import './ScrollReveal.css';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
interface ScrollRevealProps {\r
  children: ReactNode;\r
  scrollContainerRef?: RefObject<HTMLElement>;\r
  enableBlur?: boolean;\r
  baseOpacity?: number;\r
  baseRotation?: number;\r
  blurStrength?: number;\r
  containerClassName?: string;\r
  textClassName?: string;\r
  rotationEnd?: string;\r
  wordAnimationEnd?: string;\r
}\r
\r
const ScrollReveal: React.FC<ScrollRevealProps> = ({\r
  children,\r
  scrollContainerRef,\r
  enableBlur = true,\r
  baseOpacity = 0.1,\r
  baseRotation = 3,\r
  blurStrength = 4,\r
  containerClassName = '',\r
  textClassName = '',\r
  rotationEnd = 'bottom bottom',\r
  wordAnimationEnd = 'bottom bottom'\r
}) => {\r
  const containerRef = useRef<HTMLHeadingElement>(null);\r
\r
  const splitText = useMemo(() => {\r
    const text = typeof children === 'string' ? children : '';\r
    return text.split(/(\\s+)/).map((word, index) => {\r
      if (word.match(/^\\s+$/)) return word;\r
      return (\r
        <span className="word" key={index}>\r
          {word}\r
        </span>\r
      );\r
    });\r
  }, [children]);\r
\r
  useEffect(() => {\r
    const el = containerRef.current;\r
    if (!el) return;\r
\r
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;\r
\r
    gsap.fromTo(\r
      el,\r
      { transformOrigin: '0% 50%', rotate: baseRotation },\r
      {\r
        ease: 'none',\r
        rotate: 0,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: 'top bottom',\r
          end: rotationEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
\r
    const wordElements = el.querySelectorAll<HTMLElement>('.word');\r
\r
    gsap.fromTo(\r
      wordElements,\r
      { opacity: baseOpacity, willChange: 'opacity' },\r
      {\r
        ease: 'none',\r
        opacity: 1,\r
        stagger: 0.05,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: 'top bottom-=20%',\r
          end: wordAnimationEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
\r
    if (enableBlur) {\r
      gsap.fromTo(\r
        wordElements,\r
        { filter: \`blur(\${blurStrength}px)\` },\r
        {\r
          ease: 'none',\r
          filter: 'blur(0px)',\r
          stagger: 0.05,\r
          scrollTrigger: {\r
            trigger: el,\r
            scroller,\r
            start: 'top bottom-=20%',\r
            end: wordAnimationEnd,\r
            scrub: true\r
          }\r
        }\r
      );\r
    }\r
\r
    return () => {\r
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());\r
    };\r
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);\r
\r
  return (\r
    <h2 ref={containerRef} className={\`scroll-reveal \${containerClassName}\`}>\r
      <p className={\`scroll-reveal-text \${textClassName}\`}>{splitText}</p>\r
    </h2>\r
  );\r
};\r
\r
export default ScrollReveal;\r
`,H=`import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
\r
gsap.registerPlugin(ScrollTrigger);\r
\r
interface ScrollRevealProps {\r
  children: ReactNode;\r
  scrollContainerRef?: RefObject<HTMLElement>;\r
  enableBlur?: boolean;\r
  baseOpacity?: number;\r
  baseRotation?: number;\r
  blurStrength?: number;\r
  containerClassName?: string;\r
  textClassName?: string;\r
  rotationEnd?: string;\r
  wordAnimationEnd?: string;\r
}\r
\r
const ScrollReveal: React.FC<ScrollRevealProps> = ({\r
  children,\r
  scrollContainerRef,\r
  enableBlur = true,\r
  baseOpacity = 0.1,\r
  baseRotation = 3,\r
  blurStrength = 4,\r
  containerClassName = '',\r
  textClassName = '',\r
  rotationEnd = 'bottom bottom',\r
  wordAnimationEnd = 'bottom bottom'\r
}) => {\r
  const containerRef = useRef<HTMLHeadingElement>(null);\r
\r
  const splitText = useMemo(() => {\r
    const text = typeof children === 'string' ? children : '';\r
    return text.split(/(\\s+)/).map((word, index) => {\r
      if (word.match(/^\\s+$/)) return word;\r
      return (\r
        <span className="inline-block word" key={index}>\r
          {word}\r
        </span>\r
      );\r
    });\r
  }, [children]);\r
\r
  useEffect(() => {\r
    const el = containerRef.current;\r
    if (!el) return;\r
\r
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;\r
\r
    gsap.fromTo(\r
      el,\r
      { transformOrigin: '0% 50%', rotate: baseRotation },\r
      {\r
        ease: 'none',\r
        rotate: 0,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: 'top bottom',\r
          end: rotationEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
\r
    const wordElements = el.querySelectorAll<HTMLElement>('.word');\r
\r
    gsap.fromTo(\r
      wordElements,\r
      { opacity: baseOpacity, willChange: 'opacity' },\r
      {\r
        ease: 'none',\r
        opacity: 1,\r
        stagger: 0.05,\r
        scrollTrigger: {\r
          trigger: el,\r
          scroller,\r
          start: 'top bottom-=20%',\r
          end: wordAnimationEnd,\r
          scrub: true\r
        }\r
      }\r
    );\r
\r
    if (enableBlur) {\r
      gsap.fromTo(\r
        wordElements,\r
        { filter: \`blur(\${blurStrength}px)\` },\r
        {\r
          ease: 'none',\r
          filter: 'blur(0px)',\r
          stagger: 0.05,\r
          scrollTrigger: {\r
            trigger: el,\r
            scroller,\r
            start: 'top bottom-=20%',\r
            end: wordAnimationEnd,\r
            scrub: true\r
          }\r
        }\r
      );\r
    }\r
\r
    return () => {\r
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());\r
    };\r
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);\r
\r
  return (\r
    <h2 ref={containerRef} className={\`my-5 \${containerClassName}\`}>\r
      <p className={\`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold \${textClassName}\`}>{splitText}</p>\r
    </h2>\r
  );\r
};\r
\r
export default ScrollReveal;\r
`,D={dependencies:"gsap",usage:`import ScrollReveal from './ScrollReveal';

<ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
>
  When does a man die? When he is hit by a bullet? No! When he suffers a disease?
  No! When he ate a soup made out of a poisonous mushroom?
  No! A man dies when he is forgotten!
</ScrollReveal>`,code:M,css:k,tailwind:L,tsCode:W,tsTailwind:H},J=()=>{const e=l.useRef(null),[a,u]=l.useState(!0),[i,p]=l.useState(.1),[c,b]=l.useState(3),[d,f]=l.useState(4),[m,s]=O();l.useEffect(()=>{const r=e.current;if(!r)return;const t=o=>{o.preventDefault();const S=(o.deltaY||o.detail||o.wheelDelta)*2;g.to(r,{scrollTop:r.scrollTop+S,duration:2,ease:"power3.out",overwrite:"auto"})};return r.addEventListener("wheel",t,{passive:!1}),()=>{r.removeEventListener("wheel",t)}},[]);const h=[{name:"children",type:"ReactNode",default:"—",description:"The text or elements to be animated. If a string is provided, it will be split into words."},{name:"scrollContainerRef",type:"React.RefObject",default:"window",description:"Optional ref for the scroll container. If provided, GSAP will use this container for scroll triggers; otherwise, it defaults to the window."},{name:"enableBlur",type:"boolean",default:"true",description:"Enables the blur animation effect on the words."},{name:"baseOpacity",type:"number",default:"0.1",description:"The initial opacity value for the words before the animation."},{name:"baseRotation",type:"number",default:"3",description:"The starting rotation (in degrees) for the container before it animates to 0."},{name:"blurStrength",type:"number",default:"4",description:"The strength of the blur effect (in pixels) applied at the start of the animation."},{name:"containerClassName",type:"string",default:'""',description:"Additional CSS class(es) to apply to the container element."},{name:"textClassName",type:"string",default:'""',description:"Additional CSS class(es) to apply to the text element."},{name:"rotationEnd",type:"string",default:'"bottom bottom"',description:"The scroll trigger end point for the container rotation animation."},{name:"wordAnimationEnd",type:"string",default:'"bottom bottom"',description:"The scroll trigger end point for the word opacity and blur animations. The animation will complete when the bottom of the text reaches the bottom of the container."}];return n.jsxs(y,{children:[n.jsxs(C,{children:[n.jsxs(x,{className:"demo-container",style:{height:"500px",maxHeight:"500px"},overflowY:"scroll",overflowX:"hidden",ref:e,position:"relative",children:[n.jsx(E,{textAlign:"center",color:"#271E37",fontSize:"clamp(4rem, 6vw, 4rem)",fontWeight:900,position:"absolute",top:"50%",transform:"translateY(-50%)",children:"Scroll Down"}),n.jsx(x,{position:"relative",pt:1600,pb:600,px:"3rem",children:n.jsx(P,{scrollContainerRef:e,baseOpacity:i,enableBlur:a,baseRotation:c,blurStrength:d,children:"When does a man die? When he is hit by a bullet? No! When he suffers a disease? No! When he ate a soup made out of a poisonous mushroom? No! A man dies when he is forgotten!"},m)})]}),n.jsxs($,{children:[n.jsx(B,{title:"Enable Blur",isChecked:a,onChange:r=>{e.current.scrollTo({top:0,behavior:"smooth"}),u(r),s()}}),n.jsx(w,{title:"Blur Strength",min:0,max:15,step:1,value:d,onChange:r=>{e.current.scrollTo({top:0,behavior:"smooth"}),f(r),s()}}),n.jsx(w,{title:"Starting Opacity",min:0,max:1,step:.1,value:i,onChange:r=>{e.current.scrollTo({top:0,behavior:"smooth"}),p(r),s()}}),n.jsx(w,{title:"Starting Rotation",min:0,max:10,step:1,value:c,onChange:r=>{e.current.scrollTo({top:0,behavior:"smooth"}),b(r),s()},valueUnit:"°"})]}),n.jsx(v,{data:h}),n.jsx(j,{dependencyList:["gsap"]})]}),n.jsx(N,{children:n.jsx(A,{codeObject:D})})]})};export{J as default};
