import{bB as de,bi as fe,bC as me,bD as ge,bE as ie,bp as he,bF as pe,bG as Ve,bH as ve,bI as we,bl as xe,bJ as Re,bK as Se,bj as ye,bL as be,bM as Me,bN as Ee,bO as L,bP as Te,bQ as Pe,bR as Ie,s as se,j as a,ak as H,bS as Ne,bT as je,r as F,bh as k,q as B,by as E,B as _}from"./index-wsKSLPNH.js";import{T as Ae,P as Xe,a as Ce,C as De,b as Oe}from"./PropTable-C4uPWs8h.js";import{D as ze}from"./Dependencies-BHoMfJUj.js";import{u as Fe}from"./use-motion-value-event-ChN_if4t.js";import"./index-Bpz4cGEA.js";const Be=(e,r,t)=>{const n=r-e;return((t-e)%n+n)%n+e};function oe(e,r){return de(e)?e[Be(0,e.length,r)]:e}class Le{constructor(r){this.stop=()=>this.runAll("stop"),this.animations=r.filter(Boolean)}get finished(){return Promise.all(this.animations.map(r=>r.finished))}getAll(r){return this.animations[0][r]}setAll(r,t){for(let n=0;n<this.animations.length;n++)this.animations[n][r]=t}attachTimeline(r){const t=this.animations.map(n=>n.attachTimeline(r));return()=>{t.forEach((n,i)=>{n&&n(),this.animations[i].stop()})}}get time(){return this.getAll("time")}set time(r){this.setAll("time",r)}get speed(){return this.getAll("speed")}set speed(r){this.setAll("speed",r)}get state(){return this.getAll("state")}get startTime(){return this.getAll("startTime")}get duration(){return ee(this.animations,"duration")}get iterationDuration(){return ee(this.animations,"iterationDuration")}runAll(r){this.animations.forEach(t=>t[r]())}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}}function ee(e,r){let t=0;for(let n=0;n<e.length;n++){const i=e[n][r];i!==null&&i>t&&(t=i)}return t}class He extends Le{then(r,t){return this.finished.finally(r).then(()=>{})}}function $(e){return typeof e=="object"&&!Array.isArray(e)}function le(e,r,t,n){return typeof e=="string"&&$(r)?fe(e,t,n):e instanceof NodeList?Array.from(e):Array.isArray(e)?e:[e]}function Ue(e,r,t){return e*(r+1)}function re(e,r,t,n){return typeof r=="number"?r:r.startsWith("-")||r.startsWith("+")?Math.max(0,e+parseFloat(r)):r==="<"?t:r.startsWith("<")?Math.max(0,t+parseFloat(r.slice(1))):n.get(r)??e}function We(e,r,t){for(let n=0;n<e.length;n++){const i=e[n];i.at>r&&i.at<t&&(ge(e,i),n--)}}function ke(e,r,t,n,i,f){We(e,i,f);for(let o=0;o<r.length;o++)e.push({value:r[o],at:me(i,f,n[o]),easing:oe(t,o)})}function _e(e,r){for(let t=0;t<e.length;t++)e[t]=e[t]/(r+1)}function Ge(e,r){return e.at===r.at?e.value===null?1:r.value===null?-1:0:e.at-r.at}const $e="easeInOut";function Ke(e,{defaultTransition:r={},...t}={},n,i){const f=r.duration||.3,o=new Map,c=new Map,x={},d=new Map;let S=0,m=0,T=0;for(let v=0;v<e.length;v++){const l=e[v];if(typeof l=="string"){d.set(l,m);continue}else if(!Array.isArray(l)){d.set(l.name,re(m,l.at,S,d));continue}let[y,R,p={}]=l;p.at!==void 0&&(m=re(m,p.at,S,d));let w=0;const s=(g,V,u,I=0,N=0)=>{const h=Ye(g),{delay:U=0,times:b=he(h),type:W="keyframes",repeat:D,repeatType:Vr,repeatDelay:vr=0,...ce}=V;let{ease:P=r.ease||"easeOut",duration:M}=V;const K=typeof U=="function"?U(I,N):U,Y=h.length,J=ve(W)?W:i==null?void 0:i[W||"keyframes"];if(Y<=2&&J){let j=100;if(Y===2&&qe(h)){const A=h[1]-h[0];j=Math.abs(A)}const O={...ce};M!==void 0&&(O.duration=we(M));const z=pe(O,j,J);P=z.ease,M=z.duration}M??(M=f);const Q=m+K;b.length===1&&b[0]===0&&(b[1]=1);const q=b.length-h.length;if(q>0&&Ve(b,q),h.length===1&&h.unshift(null),D){M=Ue(M,D);const j=[...h],O=[...b];P=Array.isArray(P)?[...P]:[P];const z=[...P];for(let A=0;A<D;A++){h.push(...j);for(let X=0;X<j.length;X++)b.push(O[X]+(A+1)),P.push(X===0?"linear":oe(z,X-1))}_e(b,D)}const Z=Q+M;ke(u,h,P,b,Q,Z),w=Math.max(K+M,w),T=Math.max(Z,T)};if(ie(y)){const g=te(y,c);s(R,p,ne("default",g))}else{const g=le(y,R,n,x),V=g.length;for(let u=0;u<V;u++){R=R,p=p;const I=g[u],N=te(I,c);for(const h in R)s(R[h],Je(p,h),ne(h,N),u,V)}}S=m,m+=w}return c.forEach((v,l)=>{for(const y in v){const R=v[y];R.sort(Ge);const p=[],w=[],s=[];for(let V=0;V<R.length;V++){const{at:u,value:I,easing:N}=R[V];p.push(I),w.push(xe(0,T,u)),s.push(N||"easeOut")}w[0]!==0&&(w.unshift(0),p.unshift(p[0]),s.unshift($e)),w[w.length-1]!==1&&(w.push(1),p.push(null)),o.has(l)||o.set(l,{keyframes:{},transition:{}});const g=o.get(l);g.keyframes[y]=p,g.transition[y]={...r,duration:T,ease:s,times:w,...t}}}),o}function te(e,r){return!r.has(e)&&r.set(e,{}),r.get(e)}function ne(e,r){return r[e]||(r[e]=[]),r[e]}function Ye(e){return Array.isArray(e)?e:[e]}function Je(e,r){return e&&e[r]?{...e,...e[r]}:{...e}}const Qe=e=>typeof e=="number",qe=e=>e.every(Qe);function Ze(e,r){return e in r}class er extends Re{constructor(){super(...arguments),this.type="object"}readValueFromInstance(r,t){if(Ze(t,r)){const n=r[t];if(typeof n=="string"||typeof n=="number")return n}}getBaseTargetFromProps(){}removeValueFromRenderState(r,t){delete t.output[r]}measureInstanceViewportBox(){return Se()}build(r,t){Object.assign(r.output,t)}renderInstance(r,{output:t}){Object.assign(r,t)}sortInstanceNodePosition(){return 0}}function rr(e){const r={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},t=ye(e)&&!be(e)?new Me(r):new Ee(r);t.mount(e),L.set(e,t)}function tr(e){const r={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},t=new er(r);t.mount(e),L.set(e,t)}function nr(e,r){return ie(e)||typeof e=="number"||typeof e=="string"&&!$(r)}function ue(e,r,t,n){const i=[];if(nr(e,r))i.push(Te(e,$(r)&&r.default||r,t&&(t.default||t)));else{const f=le(e,r,n),o=f.length;for(let c=0;c<o;c++){const x=f[c],d=x instanceof Element?rr:tr;L.has(x)||d(x);const S=L.get(x),m={...t};"delay"in m&&typeof m.delay=="function"&&(m.delay=m.delay(c,o)),i.push(...Pe(S,{...r,transition:m},{}))}}return i}function ar(e,r,t){const n=[];return Ke(e,r,t,{spring:Ie}).forEach(({keyframes:f,transition:o},c)=>{n.push(...ue(c,f,o))}),n}function ir(e){return Array.isArray(e)&&e.some(Array.isArray)}function sr(e){function r(t,n,i){let f=[],o;if(ir(t))f=ar(t,n,e);else{const{onComplete:x,...d}=i||{};typeof x=="function"&&(o=x),f=ue(t,n,d,e)}const c=new He(f);return o&&c.finished.then(o),c}return r}const C=sr();function or(e){return se({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"},child:[]}]})(e)}function lr(e){return se({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"},child:[]}]})(e)}const ae=50;function G({defaultValue:e=50,startingValue:r=0,maxValue:t=100,className:n="",isStepped:i=!1,stepSize:f=1,leftIcon:o=a.jsx(H,{as:Ne}),rightIcon:c=a.jsx(H,{as:je})}){return a.jsx("div",{className:`slider-container ${n}`,children:a.jsx(ur,{defaultValue:e,startingValue:r,maxValue:t,isStepped:i,stepSize:f,leftIcon:o,rightIcon:c})})}function ur({defaultValue:e,startingValue:r,maxValue:t,isStepped:n,stepSize:i,leftIcon:f,rightIcon:o}){const[c,x]=F.useState(e),d=F.useRef(null),[S,m]=F.useState("middle"),T=k(0),v=k(0),l=k(1);F.useEffect(()=>{x(e)},[e]),Fe(T,"change",s=>{if(d.current){const{left:g,right:V}=d.current.getBoundingClientRect();let u;s<g?(m("left"),u=g-s):s>V?(m("right"),u=s-V):(m("middle"),u=0),v.jump(cr(u,ae))}});const y=s=>{if(s.buttons>0&&d.current){const{left:g,width:V}=d.current.getBoundingClientRect();let u=r+(s.clientX-g)/V*(t-r);n&&(u=Math.round(u/i)*i),u=Math.min(Math.max(u,r),t),x(u),T.jump(s.clientX)}},R=s=>{y(s),s.currentTarget.setPointerCapture(s.pointerId)},p=()=>{C(v,0,{type:"spring",bounce:.5})},w=()=>{const s=t-r;return s===0?0:(c-r)/s*100};return a.jsxs(a.Fragment,{children:[a.jsxs(B.div,{onHoverStart:()=>C(l,1.2),onHoverEnd:()=>C(l,1),onTouchStart:()=>C(l,1.2),onTouchEnd:()=>C(l,1),style:{scale:l,opacity:E(l,[1,1.2],[.7,1])},className:"slider-wrapper",children:[a.jsx(B.div,{animate:{scale:S==="left"?[1,1.4,1]:1,transition:{duration:.25}},style:{x:E(()=>S==="left"?-v.get()/l.get():0)},children:f}),a.jsx("div",{ref:d,className:"slider-root",onPointerMove:y,onPointerDown:R,onPointerUp:p,children:a.jsx(B.div,{style:{scaleX:E(()=>{if(d.current){const{width:s}=d.current.getBoundingClientRect();return 1+v.get()/s}}),scaleY:E(v,[0,ae],[1,.8]),transformOrigin:E(()=>{if(d.current){const{left:s,width:g}=d.current.getBoundingClientRect();return T.get()<s+g/2?"right":"left"}}),height:E(l,[1,1.2],[6,12]),marginTop:E(l,[1,1.2],[0,-3]),marginBottom:E(l,[1,1.2],[0,-3])},className:"slider-track-wrapper",children:a.jsx("div",{className:"slider-track",children:a.jsx("div",{className:"slider-range",style:{width:`${w()}%`}})})})}),a.jsx(B.div,{animate:{scale:S==="right"?[1,1.4,1]:1,transition:{duration:.25}},style:{x:E(()=>S==="right"?v.get()/l.get():0)},children:o})]}),a.jsx("p",{className:"value-indicator",children:Math.round(c)})]})}function cr(e,r){const t=e/r;return 2*(1/(1+Math.exp(-t))-.5)*r}const dr=`import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';\r
import { useEffect, useRef, useState } from 'react';\r
import { Icon } from '@chakra-ui/react';\r
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';\r
\r
import './ElasticSlider.css';\r
\r
const MAX_OVERFLOW = 50;\r
\r
export default function ElasticSlider({\r
  defaultValue = 50,\r
  startingValue = 0,\r
  maxValue = 100,\r
  className = '',\r
  isStepped = false,\r
  stepSize = 1,\r
  leftIcon = <Icon as={RiVolumeDownFill} />,\r
  rightIcon = <Icon as={RiVolumeUpFill} />\r
}) {\r
  return (\r
    <div className={\`slider-container \${className}\`}>\r
      <Slider\r
        defaultValue={defaultValue}\r
        startingValue={startingValue}\r
        maxValue={maxValue}\r
        isStepped={isStepped}\r
        stepSize={stepSize}\r
        leftIcon={leftIcon}\r
        rightIcon={rightIcon}\r
      />\r
    </div>\r
  );\r
}\r
\r
function Slider({ defaultValue, startingValue, maxValue, isStepped, stepSize, leftIcon, rightIcon }) {\r
  const [value, setValue] = useState(defaultValue);\r
  const sliderRef = useRef(null);\r
  const [region, setRegion] = useState('middle');\r
  const clientX = useMotionValue(0);\r
  const overflow = useMotionValue(0);\r
  const scale = useMotionValue(1);\r
\r
  useEffect(() => {\r
    setValue(defaultValue);\r
  }, [defaultValue]);\r
\r
  useMotionValueEvent(clientX, 'change', latest => {\r
    if (sliderRef.current) {\r
      const { left, right } = sliderRef.current.getBoundingClientRect();\r
      let newValue;\r
\r
      if (latest < left) {\r
        setRegion('left');\r
        newValue = left - latest;\r
      } else if (latest > right) {\r
        setRegion('right');\r
        newValue = latest - right;\r
      } else {\r
        setRegion('middle');\r
        newValue = 0;\r
      }\r
\r
      overflow.jump(decay(newValue, MAX_OVERFLOW));\r
    }\r
  });\r
\r
  const handlePointerMove = e => {\r
    if (e.buttons > 0 && sliderRef.current) {\r
      const { left, width } = sliderRef.current.getBoundingClientRect();\r
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);\r
\r
      if (isStepped) {\r
        newValue = Math.round(newValue / stepSize) * stepSize;\r
      }\r
\r
      newValue = Math.min(Math.max(newValue, startingValue), maxValue);\r
      setValue(newValue);\r
      clientX.jump(e.clientX);\r
    }\r
  };\r
\r
  const handlePointerDown = e => {\r
    handlePointerMove(e);\r
    e.currentTarget.setPointerCapture(e.pointerId);\r
  };\r
\r
  const handlePointerUp = () => {\r
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });\r
  };\r
\r
  const getRangePercentage = () => {\r
    const totalRange = maxValue - startingValue;\r
    if (totalRange === 0) return 0;\r
\r
    return ((value - startingValue) / totalRange) * 100;\r
  };\r
\r
  return (\r
    <>\r
      <motion.div\r
        onHoverStart={() => animate(scale, 1.2)}\r
        onHoverEnd={() => animate(scale, 1)}\r
        onTouchStart={() => animate(scale, 1.2)}\r
        onTouchEnd={() => animate(scale, 1)}\r
        style={{\r
          scale,\r
          opacity: useTransform(scale, [1, 1.2], [0.7, 1])\r
        }}\r
        className="slider-wrapper"\r
      >\r
        <motion.div\r
          animate={{\r
            scale: region === 'left' ? [1, 1.4, 1] : 1,\r
            transition: { duration: 0.25 }\r
          }}\r
          style={{\r
            x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))\r
          }}\r
        >\r
          {leftIcon}\r
        </motion.div>\r
\r
        <div\r
          ref={sliderRef}\r
          className="slider-root"\r
          onPointerMove={handlePointerMove}\r
          onPointerDown={handlePointerDown}\r
          onPointerUp={handlePointerUp}\r
        >\r
          <motion.div\r
            style={{\r
              scaleX: useTransform(() => {\r
                if (sliderRef.current) {\r
                  const { width } = sliderRef.current.getBoundingClientRect();\r
                  return 1 + overflow.get() / width;\r
                }\r
              }),\r
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),\r
              transformOrigin: useTransform(() => {\r
                if (sliderRef.current) {\r
                  const { left, width } = sliderRef.current.getBoundingClientRect();\r
                  return clientX.get() < left + width / 2 ? 'right' : 'left';\r
                }\r
              }),\r
              height: useTransform(scale, [1, 1.2], [6, 12]),\r
              marginTop: useTransform(scale, [1, 1.2], [0, -3]),\r
              marginBottom: useTransform(scale, [1, 1.2], [0, -3])\r
            }}\r
            className="slider-track-wrapper"\r
          >\r
            <div className="slider-track">\r
              <div className="slider-range" style={{ width: \`\${getRangePercentage()}%\` }} />\r
            </div>\r
          </motion.div>\r
        </div>\r
\r
        <motion.div\r
          animate={{\r
            scale: region === 'right' ? [1, 1.4, 1] : 1,\r
            transition: { duration: 0.25 }\r
          }}\r
          style={{\r
            x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))\r
          }}\r
        >\r
          {rightIcon}\r
        </motion.div>\r
      </motion.div>\r
      <p className="value-indicator">{Math.round(value)}</p>\r
    </>\r
  );\r
}\r
\r
function decay(value, max) {\r
  if (max === 0) {\r
    return 0;\r
  }\r
\r
  const entry = value / max;\r
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);\r
\r
  return sigmoid * max;\r
}\r
`,fr=`.slider-container {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 1rem;\r
  width: 12rem;\r
}\r
\r
.slider-wrapper {\r
  display: flex;\r
  width: 100%;\r
  touch-action: none;\r
  user-select: none;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 1rem;\r
}\r
\r
.slider-root {\r
  position: relative;\r
  display: flex;\r
  width: 100%;\r
  max-width: 200px;\r
  flex-grow: 1;\r
  cursor: grab;\r
  touch-action: none;\r
  user-select: none;\r
  align-items: center;\r
  padding: 1rem 0;\r
}\r
\r
.slider-root:active {\r
  cursor: grabbing;\r
}\r
\r
.slider-track-wrapper {\r
  display: flex;\r
  flex-grow: 1;\r
}\r
\r
.slider-track {\r
  position: relative;\r
  height: 100%;\r
  flex-grow: 1;\r
  overflow: hidden;\r
  border-radius: 9999px;\r
  background-color: rgba(128, 128, 128, 0.4);\r
}\r
\r
.slider-range {\r
  position: absolute;\r
  height: 100%;\r
  background-color: #888;\r
  border-radius: 9999px;\r
}\r
\r
.value-indicator {\r
  color: #808080;\r
  position: absolute;\r
  transform: translateY(-1rem);\r
  font-size: 0.75rem;\r
  font-weight: 500;\r
  letter-spacing: 0.05em;\r
}\r
\r
.icon {\r
  width: 24px;\r
  height: 24px;\r
  color: #888;\r
}\r
\r
.icon.dark {\r
  color: #ddd;\r
}\r
`,mr=`import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';\r
import { useEffect, useRef, useState } from 'react';\r
\r
const MAX_OVERFLOW = 50;\r
\r
export default function ElasticSlider({\r
  defaultValue = 50,\r
  startingValue = 0,\r
  maxValue = 100,\r
  className = '',\r
  isStepped = false,\r
  stepSize = 1,\r
  leftIcon = <>-</>,\r
  rightIcon = <>+</>\r
}) {\r
  return (\r
    <div className={\`flex flex-col items-center justify-center gap-4 w-48 \${className}\`}>\r
      <Slider\r
        defaultValue={defaultValue}\r
        startingValue={startingValue}\r
        maxValue={maxValue}\r
        isStepped={isStepped}\r
        stepSize={stepSize}\r
        leftIcon={leftIcon}\r
        rightIcon={rightIcon}\r
      />\r
    </div>\r
  );\r
}\r
\r
function Slider({ defaultValue, startingValue, maxValue, isStepped, stepSize, leftIcon, rightIcon }) {\r
  const [value, setValue] = useState(defaultValue);\r
  const sliderRef = useRef(null);\r
  const [region, setRegion] = useState('middle');\r
  const clientX = useMotionValue(0);\r
  const overflow = useMotionValue(0);\r
  const scale = useMotionValue(1);\r
\r
  useEffect(() => {\r
    setValue(defaultValue);\r
  }, [defaultValue]);\r
\r
  useMotionValueEvent(clientX, 'change', latest => {\r
    if (sliderRef.current) {\r
      const { left, right } = sliderRef.current.getBoundingClientRect();\r
      let newValue;\r
\r
      if (latest < left) {\r
        setRegion('left');\r
        newValue = left - latest;\r
      } else if (latest > right) {\r
        setRegion('right');\r
        newValue = latest - right;\r
      } else {\r
        setRegion('middle');\r
        newValue = 0;\r
      }\r
\r
      overflow.jump(decay(newValue, MAX_OVERFLOW));\r
    }\r
  });\r
\r
  const handlePointerMove = e => {\r
    if (e.buttons > 0 && sliderRef.current) {\r
      const { left, width } = sliderRef.current.getBoundingClientRect();\r
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);\r
\r
      if (isStepped) {\r
        newValue = Math.round(newValue / stepSize) * stepSize;\r
      }\r
\r
      newValue = Math.min(Math.max(newValue, startingValue), maxValue);\r
      setValue(newValue);\r
      clientX.jump(e.clientX);\r
    }\r
  };\r
\r
  const handlePointerDown = e => {\r
    handlePointerMove(e);\r
    e.currentTarget.setPointerCapture(e.pointerId);\r
  };\r
\r
  const handlePointerUp = () => {\r
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });\r
  };\r
\r
  const getRangePercentage = () => {\r
    const totalRange = maxValue - startingValue;\r
    if (totalRange === 0) return 0;\r
    return ((value - startingValue) / totalRange) * 100;\r
  };\r
\r
  return (\r
    <>\r
      <motion.div\r
        onHoverStart={() => animate(scale, 1.2)}\r
        onHoverEnd={() => animate(scale, 1)}\r
        onTouchStart={() => animate(scale, 1.2)}\r
        onTouchEnd={() => animate(scale, 1)}\r
        style={{\r
          scale,\r
          opacity: useTransform(scale, [1, 1.2], [0.7, 1])\r
        }}\r
        className="flex w-full touch-none select-none items-center justify-center gap-4"\r
      >\r
        <motion.div\r
          animate={{\r
            scale: region === 'left' ? [1, 1.4, 1] : 1,\r
            transition: { duration: 0.25 }\r
          }}\r
          style={{\r
            x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))\r
          }}\r
        >\r
          {leftIcon}\r
        </motion.div>\r
\r
        <div\r
          ref={sliderRef}\r
          className="relative flex w-full max-w-xs flex-grow cursor-grab touch-none select-none items-center py-4"\r
          onPointerMove={handlePointerMove}\r
          onPointerDown={handlePointerDown}\r
          onPointerUp={handlePointerUp}\r
        >\r
          <motion.div\r
            style={{\r
              scaleX: useTransform(() => {\r
                if (sliderRef.current) {\r
                  const { width } = sliderRef.current.getBoundingClientRect();\r
                  return 1 + overflow.get() / width;\r
                }\r
              }),\r
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),\r
              transformOrigin: useTransform(() => {\r
                if (sliderRef.current) {\r
                  const { left, width } = sliderRef.current.getBoundingClientRect();\r
                  return clientX.get() < left + width / 2 ? 'right' : 'left';\r
                }\r
              }),\r
              height: useTransform(scale, [1, 1.2], [6, 12]),\r
              marginTop: useTransform(scale, [1, 1.2], [0, -3]),\r
              marginBottom: useTransform(scale, [1, 1.2], [0, -3])\r
            }}\r
            className="flex flex-grow"\r
          >\r
            <div className="relative h-full flex-grow overflow-hidden rounded-full bg-gray-400">\r
              <div className="absolute h-full bg-gray-500 rounded-full" style={{ width: \`\${getRangePercentage()}%\` }} />\r
            </div>\r
          </motion.div>\r
        </div>\r
\r
        <motion.div\r
          animate={{\r
            scale: region === 'right' ? [1, 1.4, 1] : 1,\r
            transition: { duration: 0.25 }\r
          }}\r
          style={{\r
            x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))\r
          }}\r
        >\r
          {rightIcon}\r
        </motion.div>\r
      </motion.div>\r
      <p className="absolute text-gray-400 transform -translate-y-4 text-xs font-medium tracking-wide">\r
        {Math.round(value)}\r
      </p>\r
    </>\r
  );\r
}\r
\r
function decay(value, max) {\r
  if (max === 0) {\r
    return 0;\r
  }\r
\r
  const entry = value / max;\r
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);\r
\r
  return sigmoid * max;\r
}\r
`,gr=`import React, { useEffect, useRef, useState } from 'react';\r
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';\r
import { Icon } from '@chakra-ui/react';\r
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';\r
\r
import './ElasticSlider.css';\r
\r
const MAX_OVERFLOW = 50;\r
\r
interface ElasticSliderProps {\r
  defaultValue?: number;\r
  startingValue?: number;\r
  maxValue?: number;\r
  className?: string;\r
  isStepped?: boolean;\r
  stepSize?: number;\r
  leftIcon?: React.ReactNode;\r
  rightIcon?: React.ReactNode;\r
}\r
\r
const ElasticSlider: React.FC<ElasticSliderProps> = ({\r
  defaultValue = 50,\r
  startingValue = 0,\r
  maxValue = 100,\r
  className = '',\r
  isStepped = false,\r
  stepSize = 1,\r
  leftIcon = <Icon as={RiVolumeDownFill} />,\r
  rightIcon = <Icon as={RiVolumeUpFill} />\r
}) => {\r
  return (\r
    <div className={\`slider-container \${className}\`}>\r
      <Slider\r
        defaultValue={defaultValue}\r
        startingValue={startingValue}\r
        maxValue={maxValue}\r
        isStepped={isStepped}\r
        stepSize={stepSize}\r
        leftIcon={leftIcon}\r
        rightIcon={rightIcon}\r
      />\r
    </div>\r
  );\r
};\r
\r
interface SliderProps {\r
  defaultValue: number;\r
  startingValue: number;\r
  maxValue: number;\r
  isStepped: boolean;\r
  stepSize: number;\r
  leftIcon: React.ReactNode;\r
  rightIcon: React.ReactNode;\r
}\r
\r
const Slider: React.FC<SliderProps> = ({\r
  defaultValue,\r
  startingValue,\r
  maxValue,\r
  isStepped,\r
  stepSize,\r
  leftIcon,\r
  rightIcon\r
}) => {\r
  const [value, setValue] = useState<number>(defaultValue);\r
  const sliderRef = useRef<HTMLDivElement>(null);\r
  const [region, setRegion] = useState<'left' | 'middle' | 'right'>('middle');\r
  const clientX = useMotionValue(0);\r
  const overflow = useMotionValue(0);\r
  const scale = useMotionValue(1);\r
\r
  useEffect(() => {\r
    setValue(defaultValue);\r
  }, [defaultValue]);\r
\r
  useMotionValueEvent(clientX, 'change', (latest: number) => {\r
    if (sliderRef.current) {\r
      const { left, right } = sliderRef.current.getBoundingClientRect();\r
      let newValue: number;\r
      if (latest < left) {\r
        setRegion('left');\r
        newValue = left - latest;\r
      } else if (latest > right) {\r
        setRegion('right');\r
        newValue = latest - right;\r
      } else {\r
        setRegion('middle');\r
        newValue = 0;\r
      }\r
      overflow.jump(decay(newValue, MAX_OVERFLOW));\r
    }\r
  });\r
\r
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {\r
    if (e.buttons > 0 && sliderRef.current) {\r
      const { left, width } = sliderRef.current.getBoundingClientRect();\r
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);\r
      if (isStepped) {\r
        newValue = Math.round(newValue / stepSize) * stepSize;\r
      }\r
      newValue = Math.min(Math.max(newValue, startingValue), maxValue);\r
      setValue(newValue);\r
      clientX.jump(e.clientX);\r
    }\r
  };\r
\r
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {\r
    handlePointerMove(e);\r
    e.currentTarget.setPointerCapture(e.pointerId);\r
  };\r
\r
  const handlePointerUp = () => {\r
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });\r
  };\r
\r
  const getRangePercentage = (): number => {\r
    const totalRange = maxValue - startingValue;\r
    if (totalRange === 0) return 0;\r
    return ((value - startingValue) / totalRange) * 100;\r
  };\r
\r
  return (\r
    <>\r
      <motion.div\r
        onHoverStart={() => animate(scale, 1.2)}\r
        onHoverEnd={() => animate(scale, 1)}\r
        onTouchStart={() => animate(scale, 1.2)}\r
        onTouchEnd={() => animate(scale, 1)}\r
        style={{\r
          scale,\r
          opacity: useTransform(scale, [1, 1.2], [0.7, 1])\r
        }}\r
        className="slider-wrapper"\r
      >\r
        <motion.div\r
          animate={{\r
            scale: region === 'left' ? [1, 1.4, 1] : 1,\r
            transition: { duration: 0.25 }\r
          }}\r
          style={{\r
            x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))\r
          }}\r
        >\r
          {leftIcon}\r
        </motion.div>\r
\r
        <div\r
          ref={sliderRef}\r
          className="slider-root"\r
          onPointerMove={handlePointerMove}\r
          onPointerDown={handlePointerDown}\r
          onPointerUp={handlePointerUp}\r
        >\r
          <motion.div\r
            style={{\r
              scaleX: useTransform(() => {\r
                if (sliderRef.current) {\r
                  const { width } = sliderRef.current.getBoundingClientRect();\r
                  return 1 + overflow.get() / width;\r
                }\r
                return 1;\r
              }),\r
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),\r
              transformOrigin: useTransform(() => {\r
                if (sliderRef.current) {\r
                  const { left, width } = sliderRef.current.getBoundingClientRect();\r
                  return clientX.get() < left + width / 2 ? 'right' : 'left';\r
                }\r
                return 'center';\r
              }),\r
              height: useTransform(scale, [1, 1.2], [6, 12]),\r
              marginTop: useTransform(scale, [1, 1.2], [0, -3]),\r
              marginBottom: useTransform(scale, [1, 1.2], [0, -3])\r
            }}\r
            className="slider-track-wrapper"\r
          >\r
            <div className="slider-track">\r
              <div className="slider-range" style={{ width: \`\${getRangePercentage()}%\` }} />\r
            </div>\r
          </motion.div>\r
        </div>\r
\r
        <motion.div\r
          animate={{\r
            scale: region === 'right' ? [1, 1.4, 1] : 1,\r
            transition: { duration: 0.25 }\r
          }}\r
          style={{\r
            x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))\r
          }}\r
        >\r
          {rightIcon}\r
        </motion.div>\r
      </motion.div>\r
      <p className="value-indicator">{Math.round(value)}</p>\r
    </>\r
  );\r
};\r
\r
function decay(value: number, max: number): number {\r
  if (max === 0) {\r
    return 0;\r
  }\r
  const entry = value / max;\r
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);\r
  return sigmoid * max;\r
}\r
\r
export default ElasticSlider;\r
`,hr=`import React, { useEffect, useRef, useState } from 'react';\r
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';\r
\r
const MAX_OVERFLOW = 50;\r
\r
interface ElasticSliderProps {\r
  defaultValue?: number;\r
  startingValue?: number;\r
  maxValue?: number;\r
  className?: string;\r
  isStepped?: boolean;\r
  stepSize?: number;\r
  leftIcon?: React.ReactNode;\r
  rightIcon?: React.ReactNode;\r
}\r
\r
const ElasticSlider: React.FC<ElasticSliderProps> = ({\r
  defaultValue = 50,\r
  startingValue = 0,\r
  maxValue = 100,\r
  className = '',\r
  isStepped = false,\r
  stepSize = 1,\r
  leftIcon = <>-</>,\r
  rightIcon = <>+</>\r
}) => {\r
  return (\r
    <div className={\`flex flex-col items-center justify-center gap-4 w-48 \${className}\`}>\r
      <Slider\r
        defaultValue={defaultValue}\r
        startingValue={startingValue}\r
        maxValue={maxValue}\r
        isStepped={isStepped}\r
        stepSize={stepSize}\r
        leftIcon={leftIcon}\r
        rightIcon={rightIcon}\r
      />\r
    </div>\r
  );\r
};\r
\r
interface SliderProps {\r
  defaultValue: number;\r
  startingValue: number;\r
  maxValue: number;\r
  isStepped: boolean;\r
  stepSize: number;\r
  leftIcon: React.ReactNode;\r
  rightIcon: React.ReactNode;\r
}\r
\r
const Slider: React.FC<SliderProps> = ({\r
  defaultValue,\r
  startingValue,\r
  maxValue,\r
  isStepped,\r
  stepSize,\r
  leftIcon,\r
  rightIcon\r
}) => {\r
  const [value, setValue] = useState<number>(defaultValue);\r
  const sliderRef = useRef<HTMLDivElement>(null);\r
  const [region, setRegion] = useState<'left' | 'middle' | 'right'>('middle');\r
  const clientX = useMotionValue(0);\r
  const overflow = useMotionValue(0);\r
  const scale = useMotionValue(1);\r
\r
  useEffect(() => {\r
    setValue(defaultValue);\r
  }, [defaultValue]);\r
\r
  useMotionValueEvent(clientX, 'change', (latest: number) => {\r
    if (sliderRef.current) {\r
      const { left, right } = sliderRef.current.getBoundingClientRect();\r
      let newValue: number;\r
      if (latest < left) {\r
        setRegion('left');\r
        newValue = left - latest;\r
      } else if (latest > right) {\r
        setRegion('right');\r
        newValue = latest - right;\r
      } else {\r
        setRegion('middle');\r
        newValue = 0;\r
      }\r
      overflow.jump(decay(newValue, MAX_OVERFLOW));\r
    }\r
  });\r
\r
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {\r
    if (e.buttons > 0 && sliderRef.current) {\r
      const { left, width } = sliderRef.current.getBoundingClientRect();\r
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);\r
      if (isStepped) {\r
        newValue = Math.round(newValue / stepSize) * stepSize;\r
      }\r
      newValue = Math.min(Math.max(newValue, startingValue), maxValue);\r
      setValue(newValue);\r
      clientX.jump(e.clientX);\r
    }\r
  };\r
\r
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {\r
    handlePointerMove(e);\r
    e.currentTarget.setPointerCapture(e.pointerId);\r
  };\r
\r
  const handlePointerUp = () => {\r
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });\r
  };\r
\r
  const getRangePercentage = (): number => {\r
    const totalRange = maxValue - startingValue;\r
    if (totalRange === 0) return 0;\r
    return ((value - startingValue) / totalRange) * 100;\r
  };\r
\r
  return (\r
    <>\r
      <motion.div\r
        onHoverStart={() => animate(scale, 1.2)}\r
        onHoverEnd={() => animate(scale, 1)}\r
        onTouchStart={() => animate(scale, 1.2)}\r
        onTouchEnd={() => animate(scale, 1)}\r
        style={{\r
          scale,\r
          opacity: useTransform(scale, [1, 1.2], [0.7, 1])\r
        }}\r
        className="flex w-full touch-none select-none items-center justify-center gap-4"\r
      >\r
        <motion.div\r
          animate={{\r
            scale: region === 'left' ? [1, 1.4, 1] : 1,\r
            transition: { duration: 0.25 }\r
          }}\r
          style={{\r
            x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))\r
          }}\r
        >\r
          {leftIcon}\r
        </motion.div>\r
\r
        <div\r
          ref={sliderRef}\r
          className="relative flex w-full max-w-xs flex-grow cursor-grab touch-none select-none items-center py-4"\r
          onPointerMove={handlePointerMove}\r
          onPointerDown={handlePointerDown}\r
          onPointerUp={handlePointerUp}\r
        >\r
          <motion.div\r
            style={{\r
              scaleX: useTransform(() => {\r
                if (sliderRef.current) {\r
                  const { width } = sliderRef.current.getBoundingClientRect();\r
                  return 1 + overflow.get() / width;\r
                }\r
                return 1;\r
              }),\r
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),\r
              transformOrigin: useTransform(() => {\r
                if (sliderRef.current) {\r
                  const { left, width } = sliderRef.current.getBoundingClientRect();\r
                  return clientX.get() < left + width / 2 ? 'right' : 'left';\r
                }\r
                return 'center';\r
              }),\r
              height: useTransform(scale, [1, 1.2], [6, 12]),\r
              marginTop: useTransform(scale, [1, 1.2], [0, -3]),\r
              marginBottom: useTransform(scale, [1, 1.2], [0, -3])\r
            }}\r
            className="flex flex-grow"\r
          >\r
            <div className="relative h-full flex-grow overflow-hidden rounded-full bg-gray-400">\r
              <div className="absolute h-full bg-gray-500 rounded-full" style={{ width: \`\${getRangePercentage()}%\` }} />\r
            </div>\r
          </motion.div>\r
        </div>\r
\r
        <motion.div\r
          animate={{\r
            scale: region === 'right' ? [1, 1.4, 1] : 1,\r
            transition: { duration: 0.25 }\r
          }}\r
          style={{\r
            x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))\r
          }}\r
        >\r
          {rightIcon}\r
        </motion.div>\r
      </motion.div>\r
      <p className="absolute text-gray-400 transform -translate-y-4 text-xs font-medium tracking-wide">\r
        {Math.round(value)}\r
      </p>\r
    </>\r
  );\r
};\r
\r
function decay(value: number, max: number): number {\r
  if (max === 0) {\r
    return 0;\r
  }\r
  const entry = value / max;\r
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);\r
  return sigmoid * max;\r
}\r
\r
export default ElasticSlider;\r
`,pr={dependencies:"motion",usage:`import ElasticSlider from './ElasticSlider'
  
<ElasticSlider
  leftIcon={<>...your icon...</>}
  rightIcon={<>...your icon...</>}
  startingValue={500}
  defaultValue={750}
  maxValue={1000}
  isStepped
  stepSize={10}
/>`,code:dr,css:fr,tailwind:mr,tsCode:gr,tsTailwind:hr},br=()=>{const e=[{name:"defaultValue",type:"number",default:50,description:"The initial value of the slider. It can be less than startingValue or greater than maxValue."},{name:"startingValue",type:"number",default:0,description:"The starting point for the slider's range, e.g., startingValue=100 allows the slider to start at 100."},{name:"maxValue",type:"number",default:100,description:"The maximum value the slider can reach."},{name:"className",type:"string",default:"",description:"Allows passing custom class names to style the component."},{name:"isStepped",type:"boolean",default:!1,description:"Enables or disables stepped increments on the slider."},{name:"stepSize",type:"number",default:1,description:"The size of the increments for the slider when isStepped is enabled."},{name:"leftIcon",type:"JSX.Element",default:"<>-</>",description:"Custom JSX or HTML code to display on the left side of the slider."},{name:"rightIcon",type:"JSX.Element",default:"<>+</>",description:"Custom JSX or HTML code to display on the right side of the slider."}];return a.jsxs(Ae,{children:[a.jsxs(Xe,{children:[a.jsx("h2",{className:"demo-title-extra",children:"Default"}),a.jsx(_,{position:"relative",className:"demo-container",minH:200,children:a.jsx(G,{})}),a.jsx("h2",{className:"demo-title-extra",children:"Steps"}),a.jsx(_,{position:"relative",className:"demo-container",minH:200,children:a.jsx(G,{isStepped:!0,stepSize:10})}),a.jsx("h2",{className:"demo-title-extra",children:"Custom Values & Icons"}),a.jsx(_,{position:"relative",className:"demo-container",minH:200,children:a.jsx(G,{leftIcon:a.jsx(H,{as:or}),rightIcon:a.jsx(H,{as:lr}),startingValue:500,defaultValue:750,maxValue:1e3})}),a.jsx(Ce,{data:e}),a.jsx(ze,{dependencyList:["motion"]})]}),a.jsx(De,{children:a.jsx(Oe,{codeObject:pr})})]})};export{br as default};
