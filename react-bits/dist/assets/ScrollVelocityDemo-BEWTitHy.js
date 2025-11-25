import{bi as ye,bj as ge,bb as x,bk as P,bl as xe,bm as he,bn as ve,bo as Se,bp as Ce,bq as be,br as U,bs as Ne,bt as Ve,bg as we,bu as w,r as p,ba as Re,bv as X,bw as We,bh as J,j as c,bx as Ee,by as A,q as Te,B as $,F as Fe}from"./index-wsKSLPNH.js";import{T as Me,P as Le,a as Oe,C as Be,b as Pe}from"./PropTable-C4uPWs8h.js";import{D as ze}from"./Dependencies-BHoMfJUj.js";import{P as je}from"./PreviewSlider-m1G_aiYP.js";import{u as He}from"./use-motion-value-event-ChN_if4t.js";import{C as ke}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";const W=new WeakMap;let m;const _=(e,n,t)=>(r,s)=>s&&s[0]?s[0][e+"Size"]:ge(r)&&"getBBox"in r?r.getBBox()[n]:r[t],Xe=_("inline","width","offsetWidth"),Ae=_("block","height","offsetHeight");function $e({target:e,borderBoxSize:n}){var t;(t=W.get(e))==null||t.forEach(r=>{r(e,{get width(){return Xe(e,n)},get height(){return Ae(e,n)}})})}function Ye(e){e.forEach($e)}function De(){typeof ResizeObserver>"u"||(m=new ResizeObserver(Ye))}function Ie(e,n){m||De();const t=ye(e);return t.forEach(r=>{let s=W.get(r);s||(s=new Set,W.set(r,s)),s.add(n),m==null||m.observe(r)}),()=>{t.forEach(r=>{const s=W.get(r);s==null||s.delete(n),s!=null&&s.size||m==null||m.unobserve(r)})}}const E=new Set;let S;function Ge(){S=()=>{const e={get width(){return window.innerWidth},get height(){return window.innerHeight}};E.forEach(n=>n(e))},window.addEventListener("resize",S)}function qe(e){return E.add(e),S||Ge(),()=>{E.delete(e),!E.size&&typeof S=="function"&&(window.removeEventListener("resize",S),S=void 0)}}function Ke(e,n){return typeof e=="function"?qe(e):Ie(e,n)}function Q(e,n){let t;const r=()=>{const{currentTime:s}=n,o=(s===null?0:s.value)/100;t!==o&&e(o),t=o};return x.preUpdate(r,!0),()=>P(r)}const Ue=50,Y=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Je=()=>({time:0,x:Y(),y:Y()}),_e={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function D(e,n,t,r){const s=t[n],{length:l,position:o}=_e[n],i=s.current,u=t.time;s.current=e[`scroll${o}`],s.scrollLength=e[`scroll${l}`]-e[`client${l}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=xe(0,s.scrollLength,s.current);const a=r-u;s.velocity=a>Ue?0:he(s.current-i,a)}function Qe(e,n,t){D(e,"x",n,t),D(e,"y",n,t),n.time=t}function Ze(e,n){const t={x:0,y:0};let r=e;for(;r&&r!==n;)if(ve(r))t.x+=r.offsetLeft,t.y+=r.offsetTop,r=r.offsetParent;else if(r.tagName==="svg"){const s=r.getBoundingClientRect();r=r.parentElement;const l=r.getBoundingClientRect();t.x+=s.left-l.left,t.y+=s.top-l.top}else if(r instanceof SVGGraphicsElement){const{x:s,y:l}=r.getBBox();t.x+=s,t.y+=l;let o=null,i=r.parentNode;for(;!o;)i.tagName==="svg"&&(o=i),i=r.parentNode;r=o}else break;return t}const B={start:0,center:.5,end:1};function I(e,n,t=0){let r=0;if(e in B&&(e=B[e]),typeof e=="string"){const s=parseFloat(e);e.endsWith("px")?r=s:e.endsWith("%")?e=s/100:e.endsWith("vw")?r=s/100*document.documentElement.clientWidth:e.endsWith("vh")?r=s/100*document.documentElement.clientHeight:e=s}return typeof e=="number"&&(r=n*e),t+r}const en=[0,0];function nn(e,n,t,r){let s=Array.isArray(e)?e:en,l=0,o=0;return typeof e=="number"?s=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?s=e.split(" "):s=[e,B[e]?e:"0"]),l=I(s[0],t,r),o=I(s[1],n),l-o}const rn={All:[[0,0],[1,1]]},tn={x:0,y:0};function sn(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function ln(e,n,t){const{offset:r=rn.All}=t,{target:s=e,axis:l="y"}=t,o=l==="y"?"height":"width",i=s!==e?Ze(s,e):tn,u=s===e?{width:e.scrollWidth,height:e.scrollHeight}:sn(s),a={width:e.clientWidth,height:e.clientHeight};n[l].offset.length=0;let d=!n[l].interpolate;const y=r.length;for(let g=0;g<y;g++){const h=nn(r[g],a[o],u[o],i[l]);!d&&h!==n[l].interpolatorOffsets[g]&&(d=!0),n[l].offset[g]=h}d&&(n[l].interpolate=Se(n[l].offset,Ce(r),{clamp:!1}),n[l].interpolatorOffsets=[...n[l].offset]),n[l].progress=be(0,1,n[l].interpolate(n[l].current))}function on(e,n=e,t){if(t.x.targetOffset=0,t.y.targetOffset=0,n!==e){let r=n;for(;r&&r!==e;)t.x.targetOffset+=r.offsetLeft,t.y.targetOffset+=r.offsetTop,r=r.offsetParent}t.x.targetLength=n===e?n.scrollWidth:n.clientWidth,t.y.targetLength=n===e?n.scrollHeight:n.clientHeight,t.x.containerLength=e.clientWidth,t.y.containerLength=e.clientHeight}function an(e,n,t,r={}){return{measure:s=>{on(e,r.target,t),Qe(e,t,s),(r.offset||r.target)&&ln(e,t,r)},notify:()=>n(t)}}const b=new WeakMap,G=new WeakMap,O=new WeakMap,q=e=>e===document.scrollingElement?window:e;function Z(e,{container:n=document.scrollingElement,...t}={}){if(!n)return U;let r=O.get(n);r||(r=new Set,O.set(n,r));const s=Je(),l=an(n,e,s,t);if(r.add(l),!b.has(n)){const i=()=>{for(const y of r)y.measure(Ne.timestamp);x.preUpdate(u)},u=()=>{for(const y of r)y.notify()},a=()=>x.read(i);b.set(n,a);const d=q(n);window.addEventListener("resize",a,{passive:!0}),n!==document.documentElement&&G.set(n,Ke(n,a)),d.addEventListener("scroll",a,{passive:!0}),a()}const o=b.get(n);return x.read(o,!1,!0),()=>{var a;P(o);const i=O.get(n);if(!i||(i.delete(l),i.size))return;const u=b.get(n);b.delete(n),u&&(q(n).removeEventListener("scroll",u),(a=G.get(n))==null||a(),window.removeEventListener("resize",u))}}const K=new Map;function cn(e){const n={value:0},t=Z(r=>{n.value=r[e.axis].progress*100},e);return{currentTime:n,cancel:t}}function ee({source:e,container:n,...t}){const{axis:r}=t;e&&(n=e);const s=K.get(n)??new Map;K.set(n,s);const l=t.target??"self",o=s.get(l)??{},i=r+(t.offset??[]).join(",");return o[i]||(o[i]=!t.target&&Ve()?new ScrollTimeline({source:n,axis:r}):cn({container:n,...t})),o[i]}function un(e,n){const t=ee(n);return e.attachTimeline({timeline:n.target?void 0:t,observe:r=>(r.pause(),Q(s=>{r.time=r.iterationDuration*s},t))})}function pn(e){return e.length===2}function fn(e,n){return pn(e)?Z(t=>{e(t[n.axis].progress,t)},n):Q(e,ee(n))}function mn(e,{axis:n="y",container:t=document.scrollingElement,...r}={}){if(!t)return U;const s={axis:n,container:t,...r};return typeof e=="function"?fn(e,s):un(e,s)}const dn=()=>({scrollX:w(0),scrollY:w(0),scrollXProgress:w(0),scrollYProgress:w(0)}),R=e=>e?!e.current:!1;function yn({container:e,target:n,...t}={}){const r=we(dn),s=p.useRef(null),l=p.useRef(!1),o=p.useCallback(()=>(s.current=mn((i,{x:u,y:a})=>{r.scrollX.set(u.current),r.scrollXProgress.set(u.progress),r.scrollY.set(a.current),r.scrollYProgress.set(a.progress)},{...t,container:(e==null?void 0:e.current)||void 0,target:(n==null?void 0:n.current)||void 0}),()=>{var i;(i=s.current)==null||i.call(s)}),[e,n,JSON.stringify(t.offset)]);return Re(()=>{if(l.current=!1,R(e)||R(n)){l.current=!0;return}else return o()},[o]),p.useEffect(()=>{if(l.current)return X(!R(e)),X(!R(n)),o()},[o]),r}function gn(e){const n=p.useRef(0),{isStatic:t}=p.useContext(We);p.useEffect(()=>{if(t)return;const r=({timestamp:s,delta:l})=>{n.current||(n.current=s),e(s-n.current,l)};return x.update(r,!0),()=>P(r)},[e])}function xn(e){const n=J(e.getVelocity()),t=()=>{const r=e.getVelocity();n.set(r),r&&x.update(t)};return He(e,"change",()=>{x.update(t,!1,!0)}),n}function hn(e){const[n,t]=p.useState(0);return p.useLayoutEffect(()=>{function r(){e.current&&t(e.current.offsetWidth)}return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[e]),n}const vn=({scrollContainerRef:e,texts:n=[],velocity:t=100,className:r="",damping:s=50,stiffness:l=400,numCopies:o=6,velocityMapping:i={input:[0,1e3],output:[0,5]},parallaxClassName:u="parallax",scrollerClassName:a="scroller",parallaxStyle:d,scrollerStyle:y})=>{function g({children:h,baseVelocity:N=t,scrollContainerRef:z,className:ne="",damping:re,stiffness:te,numCopies:se,velocityMapping:v,parallaxClassName:le,scrollerClassName:oe,parallaxStyle:ie,scrollerStyle:ae}){const T=J(0),ce=z?{container:z}:{},{scrollY:ue}=yn(ce),pe=xn(ue),fe=Ee(pe,{damping:re??50,stiffness:te??400}),F=A(fe,(v==null?void 0:v.input)||[0,1e3],(v==null?void 0:v.output)||[0,5],{clamp:!1}),j=p.useRef(null),H=hn(j);function me(f,M,C){const L=M-f;return((C-f)%L+L)%L+f}const de=A(T,f=>H===0?"0px":`${me(-H,0,f)}px`),V=p.useRef(1);gn((f,M)=>{let C=V.current*N*(M/1e3);F.get()<0?V.current=-1:F.get()>0&&(V.current=1),C+=V.current*C*F.get(),T.set(T.get()+C)});const k=[];for(let f=0;f<se;f++)k.push(c.jsx("span",{className:ne,ref:f===0?j:null,children:h},f));return c.jsx("div",{className:le,style:ie,children:c.jsx(Te.div,{className:oe,style:{x:de,...ae},children:k})})}return c.jsx("section",{children:n.map((h,N)=>c.jsxs(g,{className:r,baseVelocity:N%2!==0?-t:t,scrollContainerRef:e,damping:s,stiffness:l,numCopies:o,velocityMapping:i,parallaxClassName:u,scrollerClassName:a,parallaxStyle:d,scrollerStyle:y,children:[h," "]},N))})},Sn=`import { useRef, useLayoutEffect, useState } from 'react';\r
import {\r
  motion,\r
  useScroll,\r
  useSpring,\r
  useTransform,\r
  useMotionValue,\r
  useVelocity,\r
  useAnimationFrame\r
} from 'motion/react';\r
import './ScrollVelocity.css';\r
\r
function useElementWidth(ref) {\r
  const [width, setWidth] = useState(0);\r
\r
  useLayoutEffect(() => {\r
    function updateWidth() {\r
      if (ref.current) {\r
        setWidth(ref.current.offsetWidth);\r
      }\r
    }\r
    updateWidth();\r
    window.addEventListener('resize', updateWidth);\r
    return () => window.removeEventListener('resize', updateWidth);\r
  }, [ref]);\r
\r
  return width;\r
}\r
\r
export const ScrollVelocity = ({\r
  scrollContainerRef,\r
  texts = [],\r
  velocity = 100,\r
  className = '',\r
  damping = 50,\r
  stiffness = 400,\r
  numCopies = 6,\r
  velocityMapping = { input: [0, 1000], output: [0, 5] },\r
  parallaxClassName = 'parallax',\r
  scrollerClassName = 'scroller',\r
  parallaxStyle,\r
  scrollerStyle\r
}) => {\r
  function VelocityText({\r
    children,\r
    baseVelocity = velocity,\r
    scrollContainerRef,\r
    className = '',\r
    damping,\r
    stiffness,\r
    numCopies,\r
    velocityMapping,\r
    parallaxClassName,\r
    scrollerClassName,\r
    parallaxStyle,\r
    scrollerStyle\r
  }) {\r
    const baseX = useMotionValue(0);\r
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};\r
    const { scrollY } = useScroll(scrollOptions);\r
    const scrollVelocity = useVelocity(scrollY);\r
    const smoothVelocity = useSpring(scrollVelocity, {\r
      damping: damping ?? 50,\r
      stiffness: stiffness ?? 400\r
    });\r
    const velocityFactor = useTransform(\r
      smoothVelocity,\r
      velocityMapping?.input || [0, 1000],\r
      velocityMapping?.output || [0, 5],\r
      { clamp: false }\r
    );\r
\r
    const copyRef = useRef(null);\r
    const copyWidth = useElementWidth(copyRef);\r
\r
    function wrap(min, max, v) {\r
      const range = max - min;\r
      const mod = (((v - min) % range) + range) % range;\r
      return mod + min;\r
    }\r
\r
    const x = useTransform(baseX, v => {\r
      if (copyWidth === 0) return '0px';\r
      return \`\${wrap(-copyWidth, 0, v)}px\`;\r
    });\r
\r
    const directionFactor = useRef(1);\r
    useAnimationFrame((t, delta) => {\r
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);\r
\r
      if (velocityFactor.get() < 0) {\r
        directionFactor.current = -1;\r
      } else if (velocityFactor.get() > 0) {\r
        directionFactor.current = 1;\r
      }\r
\r
      moveBy += directionFactor.current * moveBy * velocityFactor.get();\r
      baseX.set(baseX.get() + moveBy);\r
    });\r
\r
    const spans = [];\r
    for (let i = 0; i < numCopies; i++) {\r
      spans.push(\r
        <span className={className} key={i} ref={i === 0 ? copyRef : null}>\r
          {children}\r
        </span>\r
      );\r
    }\r
\r
    return (\r
      <div className={parallaxClassName} style={parallaxStyle}>\r
        <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>\r
          {spans}\r
        </motion.div>\r
      </div>\r
    );\r
  }\r
\r
  return (\r
    <section>\r
      {texts.map((text, index) => (\r
        <VelocityText\r
          key={index}\r
          className={className}\r
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}\r
          scrollContainerRef={scrollContainerRef}\r
          damping={damping}\r
          stiffness={stiffness}\r
          numCopies={numCopies}\r
          velocityMapping={velocityMapping}\r
          parallaxClassName={parallaxClassName}\r
          scrollerClassName={scrollerClassName}\r
          parallaxStyle={parallaxStyle}\r
          scrollerStyle={scrollerStyle}\r
        >\r
          {text}&nbsp;\r
        </VelocityText>\r
      ))}\r
    </section>\r
  );\r
};\r
\r
export default ScrollVelocity;\r
`,Cn=`.parallax {\r
  position: relative;\r
  overflow: hidden;\r
}\r
\r
.scroller {\r
  display: flex;\r
  white-space: nowrap;\r
  text-align: center;\r
  font-family: sans-serif;\r
  font-size: 2.25rem;\r
  font-weight: bold;\r
  letter-spacing: -0.02em;\r
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));\r
}\r
\r
.scroller span {\r
  flex-shrink: 0;\r
}\r
\r
@media (min-width: 768px) {\r
  .scroller {\r
    font-size: 5rem;\r
    line-height: 5rem;\r
  }\r
}\r
`,bn=`import { useRef, useLayoutEffect, useState } from 'react';\r
import {\r
  motion,\r
  useScroll,\r
  useSpring,\r
  useTransform,\r
  useMotionValue,\r
  useVelocity,\r
  useAnimationFrame\r
} from 'motion/react';\r
\r
function useElementWidth(ref) {\r
  const [width, setWidth] = useState(0);\r
\r
  useLayoutEffect(() => {\r
    function updateWidth() {\r
      if (ref.current) {\r
        setWidth(ref.current.offsetWidth);\r
      }\r
    }\r
    updateWidth();\r
    window.addEventListener('resize', updateWidth);\r
    return () => window.removeEventListener('resize', updateWidth);\r
  }, [ref]);\r
\r
  return width;\r
}\r
\r
export const ScrollVelocity = ({\r
  scrollContainerRef,\r
  texts = [],\r
  velocity = 100,\r
  className = '',\r
  damping = 50,\r
  stiffness = 400,\r
  numCopies = 6,\r
  velocityMapping = { input: [0, 1000], output: [0, 5] },\r
  parallaxClassName,\r
  scrollerClassName,\r
  parallaxStyle,\r
  scrollerStyle\r
}) => {\r
  function VelocityText({\r
    children,\r
    baseVelocity = velocity,\r
    scrollContainerRef,\r
    className = '',\r
    damping,\r
    stiffness,\r
    numCopies,\r
    velocityMapping,\r
    parallaxClassName,\r
    scrollerClassName,\r
    parallaxStyle,\r
    scrollerStyle\r
  }) {\r
    const baseX = useMotionValue(0);\r
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};\r
    const { scrollY } = useScroll(scrollOptions);\r
    const scrollVelocity = useVelocity(scrollY);\r
    const smoothVelocity = useSpring(scrollVelocity, {\r
      damping: damping ?? 50,\r
      stiffness: stiffness ?? 400\r
    });\r
    const velocityFactor = useTransform(\r
      smoothVelocity,\r
      velocityMapping?.input || [0, 1000],\r
      velocityMapping?.output || [0, 5],\r
      { clamp: false }\r
    );\r
\r
    const copyRef = useRef(null);\r
    const copyWidth = useElementWidth(copyRef);\r
\r
    function wrap(min, max, v) {\r
      const range = max - min;\r
      const mod = (((v - min) % range) + range) % range;\r
      return mod + min;\r
    }\r
\r
    const x = useTransform(baseX, v => {\r
      if (copyWidth === 0) return '0px';\r
      return \`\${wrap(-copyWidth, 0, v)}px\`;\r
    });\r
\r
    const directionFactor = useRef(1);\r
    useAnimationFrame((t, delta) => {\r
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);\r
\r
      if (velocityFactor.get() < 0) {\r
        directionFactor.current = -1;\r
      } else if (velocityFactor.get() > 0) {\r
        directionFactor.current = 1;\r
      }\r
\r
      moveBy += directionFactor.current * moveBy * velocityFactor.get();\r
      baseX.set(baseX.get() + moveBy);\r
    });\r
\r
    const spans = [];\r
    for (let i = 0; i < (numCopies ?? 1); i++) {\r
      spans.push(\r
        <span className={\`flex-shrink-0 \${className}\`} key={i} ref={i === 0 ? copyRef : null}>\r
          {children}\r
        </span>\r
      );\r
    }\r
\r
    return (\r
      <div className={\`\${parallaxClassName} relative overflow-hidden\`} style={parallaxStyle}>\r
        <motion.div\r
          className={\`\${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]\`}\r
          style={{ x, ...scrollerStyle }}\r
        >\r
          {spans}\r
        </motion.div>\r
      </div>\r
    );\r
  }\r
\r
  return (\r
    <section>\r
      {texts.map((text, index) => (\r
        <VelocityText\r
          key={index}\r
          className={className}\r
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}\r
          scrollContainerRef={scrollContainerRef}\r
          damping={damping}\r
          stiffness={stiffness}\r
          numCopies={numCopies}\r
          velocityMapping={velocityMapping}\r
          parallaxClassName={parallaxClassName}\r
          scrollerClassName={scrollerClassName}\r
          parallaxStyle={parallaxStyle}\r
          scrollerStyle={scrollerStyle}\r
        >\r
          {text}&nbsp;\r
        </VelocityText>\r
      ))}\r
    </section>\r
  );\r
};\r
\r
export default ScrollVelocity;\r
`,Nn=`import React, { useRef, useLayoutEffect, useState } from 'react';\r
import {\r
  motion,\r
  useScroll,\r
  useSpring,\r
  useTransform,\r
  useMotionValue,\r
  useVelocity,\r
  useAnimationFrame\r
} from 'motion/react';\r
import './ScrollVelocity.css';\r
\r
interface VelocityMapping {\r
  input: [number, number];\r
  output: [number, number];\r
}\r
\r
interface VelocityTextProps {\r
  children: React.ReactNode;\r
  baseVelocity: number;\r
  scrollContainerRef?: React.RefObject<HTMLElement>;\r
  className?: string;\r
  damping?: number;\r
  stiffness?: number;\r
  numCopies?: number;\r
  velocityMapping?: VelocityMapping;\r
  parallaxClassName?: string;\r
  scrollerClassName?: string;\r
  parallaxStyle?: React.CSSProperties;\r
  scrollerStyle?: React.CSSProperties;\r
}\r
\r
interface ScrollVelocityProps {\r
  scrollContainerRef?: React.RefObject<HTMLElement>;\r
  texts: string[];\r
  velocity?: number;\r
  className?: string;\r
  damping?: number;\r
  stiffness?: number;\r
  numCopies?: number;\r
  velocityMapping?: VelocityMapping;\r
  parallaxClassName?: string;\r
  scrollerClassName?: string;\r
  parallaxStyle?: React.CSSProperties;\r
  scrollerStyle?: React.CSSProperties;\r
}\r
\r
function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {\r
  const [width, setWidth] = useState(0);\r
\r
  useLayoutEffect(() => {\r
    function updateWidth() {\r
      if (ref.current) {\r
        setWidth(ref.current.offsetWidth);\r
      }\r
    }\r
    updateWidth();\r
    window.addEventListener('resize', updateWidth);\r
    return () => window.removeEventListener('resize', updateWidth);\r
  }, [ref]);\r
\r
  return width;\r
}\r
\r
export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({\r
  scrollContainerRef,\r
  texts = [],\r
  velocity = 100,\r
  className = '',\r
  damping = 50,\r
  stiffness = 400,\r
  numCopies = 6,\r
  velocityMapping = { input: [0, 1000], output: [0, 5] },\r
  parallaxClassName = 'parallax',\r
  scrollerClassName = 'scroller',\r
  parallaxStyle,\r
  scrollerStyle\r
}) => {\r
  function VelocityText({\r
    children,\r
    baseVelocity = velocity,\r
    scrollContainerRef,\r
    className = '',\r
    damping,\r
    stiffness,\r
    numCopies,\r
    velocityMapping,\r
    parallaxClassName,\r
    scrollerClassName,\r
    parallaxStyle,\r
    scrollerStyle\r
  }: VelocityTextProps) {\r
    const baseX = useMotionValue(0);\r
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};\r
    const { scrollY } = useScroll(scrollOptions);\r
    const scrollVelocity = useVelocity(scrollY);\r
    const smoothVelocity = useSpring(scrollVelocity, {\r
      damping: damping ?? 50,\r
      stiffness: stiffness ?? 400\r
    });\r
    const velocityFactor = useTransform(\r
      smoothVelocity,\r
      velocityMapping?.input || [0, 1000],\r
      velocityMapping?.output || [0, 5],\r
      { clamp: false }\r
    );\r
\r
    const copyRef = useRef<HTMLSpanElement>(null);\r
    const copyWidth = useElementWidth(copyRef);\r
\r
    function wrap(min: number, max: number, v: number): number {\r
      const range = max - min;\r
      const mod = (((v - min) % range) + range) % range;\r
      return mod + min;\r
    }\r
\r
    const x = useTransform(baseX, v => {\r
      if (copyWidth === 0) return '0px';\r
      return \`\${wrap(-copyWidth, 0, v)}px\`;\r
    });\r
\r
    const directionFactor = useRef<number>(1);\r
    useAnimationFrame((t, delta) => {\r
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);\r
\r
      if (velocityFactor.get() < 0) {\r
        directionFactor.current = -1;\r
      } else if (velocityFactor.get() > 0) {\r
        directionFactor.current = 1;\r
      }\r
\r
      moveBy += directionFactor.current * moveBy * velocityFactor.get();\r
      baseX.set(baseX.get() + moveBy);\r
    });\r
\r
    const spans = [];\r
    for (let i = 0; i < numCopies!; i++) {\r
      spans.push(\r
        <span className={className} key={i} ref={i === 0 ? copyRef : null}>\r
          {children}\r
        </span>\r
      );\r
    }\r
\r
    return (\r
      <div className={parallaxClassName} style={parallaxStyle}>\r
        <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>\r
          {spans}\r
        </motion.div>\r
      </div>\r
    );\r
  }\r
\r
  return (\r
    <section>\r
      {texts.map((text: string, index: number) => (\r
        <VelocityText\r
          key={index}\r
          className={className}\r
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}\r
          scrollContainerRef={scrollContainerRef}\r
          damping={damping}\r
          stiffness={stiffness}\r
          numCopies={numCopies}\r
          velocityMapping={velocityMapping}\r
          parallaxClassName={parallaxClassName}\r
          scrollerClassName={scrollerClassName}\r
          parallaxStyle={parallaxStyle}\r
          scrollerStyle={scrollerStyle}\r
        >\r
          {text}&nbsp;\r
        </VelocityText>\r
      ))}\r
    </section>\r
  );\r
};\r
\r
export default ScrollVelocity;\r
`,Vn=`import React, { useRef, useLayoutEffect, useState } from 'react';\r
import {\r
  motion,\r
  useScroll,\r
  useSpring,\r
  useTransform,\r
  useMotionValue,\r
  useVelocity,\r
  useAnimationFrame\r
} from 'motion/react';\r
\r
interface VelocityMapping {\r
  input: [number, number];\r
  output: [number, number];\r
}\r
\r
interface VelocityTextProps {\r
  children: React.ReactNode;\r
  baseVelocity: number;\r
  scrollContainerRef?: React.RefObject<HTMLElement>;\r
  className?: string;\r
  damping?: number;\r
  stiffness?: number;\r
  numCopies?: number;\r
  velocityMapping?: VelocityMapping;\r
  parallaxClassName?: string;\r
  scrollerClassName?: string;\r
  parallaxStyle?: React.CSSProperties;\r
  scrollerStyle?: React.CSSProperties;\r
}\r
\r
interface ScrollVelocityProps {\r
  scrollContainerRef?: React.RefObject<HTMLElement>;\r
  texts: string[];\r
  velocity?: number;\r
  className?: string;\r
  damping?: number;\r
  stiffness?: number;\r
  numCopies?: number;\r
  velocityMapping?: VelocityMapping;\r
  parallaxClassName?: string;\r
  scrollerClassName?: string;\r
  parallaxStyle?: React.CSSProperties;\r
  scrollerStyle?: React.CSSProperties;\r
}\r
\r
function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {\r
  const [width, setWidth] = useState(0);\r
\r
  useLayoutEffect(() => {\r
    function updateWidth() {\r
      if (ref.current) {\r
        setWidth(ref.current.offsetWidth);\r
      }\r
    }\r
    updateWidth();\r
    window.addEventListener('resize', updateWidth);\r
    return () => window.removeEventListener('resize', updateWidth);\r
  }, [ref]);\r
\r
  return width;\r
}\r
\r
export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({\r
  scrollContainerRef,\r
  texts = [],\r
  velocity = 100,\r
  className = '',\r
  damping = 50,\r
  stiffness = 400,\r
  numCopies = 6,\r
  velocityMapping = { input: [0, 1000], output: [0, 5] },\r
  parallaxClassName,\r
  scrollerClassName,\r
  parallaxStyle,\r
  scrollerStyle\r
}) => {\r
  function VelocityText({\r
    children,\r
    baseVelocity = velocity,\r
    scrollContainerRef,\r
    className = '',\r
    damping,\r
    stiffness,\r
    numCopies,\r
    velocityMapping,\r
    parallaxClassName,\r
    scrollerClassName,\r
    parallaxStyle,\r
    scrollerStyle\r
  }: VelocityTextProps) {\r
    const baseX = useMotionValue(0);\r
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};\r
    const { scrollY } = useScroll(scrollOptions);\r
    const scrollVelocity = useVelocity(scrollY);\r
    const smoothVelocity = useSpring(scrollVelocity, {\r
      damping: damping ?? 50,\r
      stiffness: stiffness ?? 400\r
    });\r
    const velocityFactor = useTransform(\r
      smoothVelocity,\r
      velocityMapping?.input || [0, 1000],\r
      velocityMapping?.output || [0, 5],\r
      { clamp: false }\r
    );\r
\r
    const copyRef = useRef<HTMLSpanElement>(null);\r
    const copyWidth = useElementWidth(copyRef);\r
\r
    function wrap(min: number, max: number, v: number): number {\r
      const range = max - min;\r
      const mod = (((v - min) % range) + range) % range;\r
      return mod + min;\r
    }\r
\r
    const x = useTransform(baseX, v => {\r
      if (copyWidth === 0) return '0px';\r
      return \`\${wrap(-copyWidth, 0, v)}px\`;\r
    });\r
\r
    const directionFactor = useRef<number>(1);\r
    useAnimationFrame((t, delta) => {\r
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);\r
\r
      if (velocityFactor.get() < 0) {\r
        directionFactor.current = -1;\r
      } else if (velocityFactor.get() > 0) {\r
        directionFactor.current = 1;\r
      }\r
\r
      moveBy += directionFactor.current * moveBy * velocityFactor.get();\r
      baseX.set(baseX.get() + moveBy);\r
    });\r
\r
    const spans = [];\r
    for (let i = 0; i < numCopies!; i++) {\r
      spans.push(\r
        <span className={\`flex-shrink-0 \${className}\`} key={i} ref={i === 0 ? copyRef : null}>\r
          {children}\r
        </span>\r
      );\r
    }\r
\r
    return (\r
      <div className={\`\${parallaxClassName} relative overflow-hidden\`} style={parallaxStyle}>\r
        <motion.div\r
          className={\`\${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]\`}\r
          style={{ x, ...scrollerStyle }}\r
        >\r
          {spans}\r
        </motion.div>\r
      </div>\r
    );\r
  }\r
\r
  return (\r
    <section>\r
      {texts.map((text: string, index: number) => (\r
        <VelocityText\r
          key={index}\r
          className={className}\r
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}\r
          scrollContainerRef={scrollContainerRef}\r
          damping={damping}\r
          stiffness={stiffness}\r
          numCopies={numCopies}\r
          velocityMapping={velocityMapping}\r
          parallaxClassName={parallaxClassName}\r
          scrollerClassName={scrollerClassName}\r
          parallaxStyle={parallaxStyle}\r
          scrollerStyle={scrollerStyle}\r
        >\r
          {text}&nbsp;\r
        </VelocityText>\r
      ))}\r
    </section>\r
  );\r
};\r
\r
export default ScrollVelocity;\r
`,wn={dependencies:"motion",usage:`import ScrollVelocity from './ScrollVelocity';
  
<ScrollVelocity
  texts={['React Bits', 'Scroll Down']} 
  velocity={velocity} 
  className="custom-scroll-text"
/>`,code:Sn,css:Cn,tailwind:bn,tsCode:Nn,tsTailwind:Vn},Bn=()=>{const[e,n]=p.useState(100),t=[{name:"scrollContainerRef",type:"React.RefObject<HTMLElement>",default:"undefined",description:"Optional ref for a custom scroll container to track scroll position."},{name:"texts",type:"string[]",default:"[]",description:"Array of strings to display as scrolling text."},{name:"velocity",type:"number",default:"100",description:"Base velocity for scrolling; sign is flipped for odd indexed texts."},{name:"className",type:"string",default:'""',description:"CSS class applied to each text copy (span)."},{name:"damping",type:"number",default:"50",description:"Damping value for the spring animation."},{name:"stiffness",type:"number",default:"400",description:"Stiffness value for the spring animation."},{name:"numCopies",type:"number",default:"6",description:"Number of copies of the text rendered for a continuous scrolling effect."},{name:"velocityMapping",type:"{ input: number[]; output: number[] }",default:"{ input: [0, 1000], output: [0, 5] }",description:"Mapping from scroll velocity to a movement multiplier for dynamic scrolling."},{name:"parallaxClassName",type:"string",default:'"parallax"',description:"CSS class for the parallax container."},{name:"scrollerClassName",type:"string",default:'"scroller"',description:"CSS class for the scroller container."},{name:"parallaxStyle",type:"React.CSSProperties",default:"undefined",description:"Inline styles for the parallax container."},{name:"scrollerStyle",type:"React.CSSProperties",default:"undefined",description:"Inline styles for the scroller container."}];return c.jsxs(Me,{children:[c.jsxs(Le,{children:[c.jsx($,{position:"relative",className:"demo-container",h:600,maxH:600,overflow:"hidden",children:c.jsx(Fe,{position:"relative",justifyContent:"center",alignItems:"center",children:c.jsx(vn,{texts:["React Bits","Scroll Down"],velocity:e,className:"custom-scroll-text"})})}),c.jsx(ke,{children:c.jsx(je,{title:"Velocity",min:10,max:500,step:10,value:e,onChange:r=>{n(r)}})}),c.jsx(Oe,{data:t}),c.jsx(ze,{dependencyList:["motion"]}),c.jsx($,{mb:"50vh"})]}),c.jsx(Be,{children:c.jsx(Pe,{codeObject:wn})})]})};export{Bn as default};
