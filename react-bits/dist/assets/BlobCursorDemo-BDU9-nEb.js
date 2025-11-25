import{r as t,g as $,j as e,B as G,a as V,T as A,F as j,b as P}from"./index-wsKSLPNH.js";import{T as H,P as _,a as q,C as Z,b as W}from"./PropTable-C4uPWs8h.js";import{D as J}from"./Dependencies-BHoMfJUj.js";import{C as K}from"./Customize-1m_ZNqR9.js";import{P as n}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";const Q=`'use client';\r
\r
import { useRef, useEffect, useCallback } from 'react';\r
import gsap from 'gsap';\r
import './BlobCursor.css';\r
\r
export default function BlobCursor({\r
  blobType = 'circle',\r
  fillColor = '#5227FF',\r
  trailCount = 3,\r
  sizes = [60, 125, 75],\r
  innerSizes = [20, 35, 25],\r
  innerColor = 'rgba(255,255,255,0.8)',\r
  opacities = [0.6, 0.6, 0.6],\r
  shadowColor = 'rgba(0,0,0,0.75)',\r
  shadowBlur = 5,\r
  shadowOffsetX = 10,\r
  shadowOffsetY = 10,\r
  filterId = 'blob',\r
  filterStdDeviation = 30,\r
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',\r
  useFilter = true,\r
  fastDuration = 0.1,\r
  slowDuration = 0.5,\r
  fastEase = 'power3.out',\r
  slowEase = 'power1.out',\r
  zIndex = 100\r
}) {\r
  const containerRef = useRef(null);\r
  const blobsRef = useRef([]);\r
\r
  const updateOffset = useCallback(() => {\r
    if (!containerRef.current) return { left: 0, top: 0 };\r
    const rect = containerRef.current.getBoundingClientRect();\r
    return { left: rect.left, top: rect.top };\r
  }, []);\r
\r
  const handleMove = useCallback(\r
    e => {\r
      const { left, top } = updateOffset();\r
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;\r
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;\r
\r
      blobsRef.current.forEach((el, i) => {\r
        if (!el) return;\r
        const isLead = i === 0;\r
        gsap.to(el, {\r
          x: x - left,\r
          y: y - top,\r
          duration: isLead ? fastDuration : slowDuration,\r
          ease: isLead ? fastEase : slowEase\r
        });\r
      });\r
    },\r
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]\r
  );\r
\r
  useEffect(() => {\r
    const onResize = () => updateOffset();\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
  }, [updateOffset]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className="blob-container"\r
      style={{ zIndex }}\r
      onMouseMove={handleMove}\r
      onTouchMove={handleMove}\r
    >\r
      {useFilter && (\r
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>\r
          <filter id={filterId}>\r
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />\r
            <feColorMatrix in="blur" values={filterColorMatrixValues} />\r
          </filter>\r
        </svg>\r
      )}\r
\r
      <div className="blob-main" style={{ filter: useFilter ? \`url(#\${filterId})\` : undefined }}>\r
        {Array.from({ length: trailCount }).map((_, i) => (\r
          <div\r
            key={i}\r
            ref={el => (blobsRef.current[i] = el)}\r
            className="blob"\r
            style={{\r
              width: sizes[i],\r
              height: sizes[i],\r
              borderRadius: blobType === 'circle' ? '50%' : '0%',\r
              backgroundColor: fillColor,\r
              opacity: opacities[i],\r
              boxShadow: \`\${shadowOffsetX}px \${shadowOffsetY}px \${shadowBlur}px 0 \${shadowColor}\`\r
            }}\r
          >\r
            <div\r
              className="inner-dot"\r
              style={{\r
                width: innerSizes[i],\r
                height: innerSizes[i],\r
                top: (sizes[i] - innerSizes[i]) / 2,\r
                left: (sizes[i] - innerSizes[i]) / 2,\r
                backgroundColor: innerColor,\r
                borderRadius: blobType === 'circle' ? '50%' : '0%'\r
              }}\r
            />\r
          </div>\r
        ))}\r
      </div>\r
    </div>\r
  );\r
}\r
`,U=`.blob-container {\r
  position: relative;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
}\r
\r
.blob-main {\r
  pointer-events: none;\r
  position: absolute;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  background: transparent;\r
  user-select: none;\r
  cursor: default;\r
}\r
\r
.blob {\r
  position: absolute;\r
  will-change: transform;\r
  transform: translate(-50%, -50%);\r
}\r
\r
.inner-dot {\r
  position: absolute;\r
}\r
`,ee=`'use client';\r
\r
import { useRef, useEffect, useCallback } from 'react';\r
import gsap from 'gsap';\r
\r
export default function BlobCursor({\r
  blobType = 'circle',\r
  fillColor = '#5227FF',\r
  trailCount = 3,\r
  sizes = [60, 125, 75],\r
  innerSizes = [20, 35, 25],\r
  innerColor = 'rgba(255,255,255,0.8)',\r
  opacities = [0.6, 0.6, 0.6],\r
  shadowColor = 'rgba(0,0,0,0.75)',\r
  shadowBlur = 5,\r
  shadowOffsetX = 10,\r
  shadowOffsetY = 10,\r
  filterId = 'blob',\r
  filterStdDeviation = 30,\r
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',\r
  useFilter = true,\r
  fastDuration = 0.1,\r
  slowDuration = 0.5,\r
  fastEase = 'power3.out',\r
  slowEase = 'power1.out',\r
  zIndex = 100\r
}) {\r
  const containerRef = useRef(null);\r
  const blobsRef = useRef([]);\r
\r
  const updateOffset = useCallback(() => {\r
    if (!containerRef.current) return { left: 0, top: 0 };\r
    const rect = containerRef.current.getBoundingClientRect();\r
    return { left: rect.left, top: rect.top };\r
  }, []);\r
\r
  const handleMove = useCallback(\r
    e => {\r
      const { left, top } = updateOffset();\r
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;\r
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;\r
\r
      blobsRef.current.forEach((el, i) => {\r
        if (!el) return;\r
        const isLead = i === 0;\r
        gsap.to(el, {\r
          x: x - left,\r
          y: y - top,\r
          duration: isLead ? fastDuration : slowDuration,\r
          ease: isLead ? fastEase : slowEase\r
        });\r
      });\r
    },\r
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]\r
  );\r
\r
  useEffect(() => {\r
    const onResize = () => updateOffset();\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
  }, [updateOffset]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      onMouseMove={handleMove}\r
      onTouchMove={handleMove}\r
      className="relative top-0 left-0 w-full h-full"\r
      style={{ zIndex }}\r
    >\r
      {useFilter && (\r
        <svg className="absolute w-0 h-0">\r
          <filter id={filterId}>\r
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />\r
            <feColorMatrix in="blur" values={filterColorMatrixValues} />\r
          </filter>\r
        </svg>\r
      )}\r
\r
      <div\r
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"\r
        style={{ filter: useFilter ? \`url(#\${filterId})\` : undefined }}\r
      >\r
        {Array.from({ length: trailCount }).map((_, i) => (\r
          <div\r
            key={i}\r
            ref={el => (blobsRef.current[i] = el)}\r
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"\r
            style={{\r
              width: sizes[i],\r
              height: sizes[i],\r
              borderRadius: blobType === 'circle' ? '50%' : '0',\r
              backgroundColor: fillColor,\r
              opacity: opacities[i],\r
              boxShadow: \`\${shadowOffsetX}px \${shadowOffsetY}px \${shadowBlur}px 0 \${shadowColor}\`\r
            }}\r
          >\r
            <div\r
              className="absolute"\r
              style={{\r
                width: innerSizes[i],\r
                height: innerSizes[i],\r
                top: (sizes[i] - innerSizes[i]) / 2,\r
                left: (sizes[i] - innerSizes[i]) / 2,\r
                backgroundColor: innerColor,\r
                borderRadius: blobType === 'circle' ? '50%' : '0'\r
              }}\r
            />\r
          </div>\r
        ))}\r
      </div>\r
    </div>\r
  );\r
}\r
`,re=`'use client';\r
\r
import React, { useRef, useEffect, useCallback } from 'react';\r
import gsap from 'gsap';\r
import './BlobCursor.css';\r
\r
export interface BlobCursorProps {\r
  blobType?: 'circle' | 'square';\r
  fillColor?: string;\r
  trailCount?: number;\r
  sizes?: number[];\r
  innerSizes?: number[];\r
  innerColor?: string;\r
  opacities?: number[];\r
  shadowColor?: string;\r
  shadowBlur?: number;\r
  shadowOffsetX?: number;\r
  shadowOffsetY?: number;\r
  filterId?: string;\r
  filterStdDeviation?: number;\r
  filterColorMatrixValues?: string;\r
  useFilter?: boolean;\r
  fastDuration?: number;\r
  slowDuration?: number;\r
  fastEase?: string;\r
  slowEase?: string;\r
  zIndex?: number;\r
}\r
\r
export default function BlobCursor({\r
  blobType = 'circle',\r
  fillColor = '#5227FF',\r
  trailCount = 3,\r
  sizes = [60, 125, 75],\r
  innerSizes = [20, 35, 25],\r
  innerColor = 'rgba(255,255,255,0.8)',\r
  opacities = [0.6, 0.6, 0.6],\r
  shadowColor = 'rgba(0,0,0,0.75)',\r
  shadowBlur = 5,\r
  shadowOffsetX = 10,\r
  shadowOffsetY = 10,\r
  filterId = 'blob',\r
  filterStdDeviation = 30,\r
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',\r
  useFilter = true,\r
  fastDuration = 0.1,\r
  slowDuration = 0.5,\r
  fastEase = 'power3.out',\r
  slowEase = 'power1.out',\r
  zIndex = 100\r
}: BlobCursorProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);\r
\r
  const updateOffset = useCallback(() => {\r
    if (!containerRef.current) return { left: 0, top: 0 };\r
    const rect = containerRef.current.getBoundingClientRect();\r
    return { left: rect.left, top: rect.top };\r
  }, []);\r
\r
  const handleMove = useCallback(\r
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {\r
      const { left, top } = updateOffset();\r
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;\r
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;\r
\r
      blobsRef.current.forEach((el, i) => {\r
        if (!el) return;\r
        const isLead = i === 0;\r
        gsap.to(el, {\r
          x: x - left,\r
          y: y - top,\r
          duration: isLead ? fastDuration : slowDuration,\r
          ease: isLead ? fastEase : slowEase\r
        });\r
      });\r
    },\r
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]\r
  );\r
\r
  useEffect(() => {\r
    const onResize = () => updateOffset();\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
  }, [updateOffset]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className="blob-container"\r
      style={{ zIndex }}\r
      onMouseMove={handleMove}\r
      onTouchMove={handleMove}\r
    >\r
      {useFilter && (\r
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>\r
          <filter id={filterId}>\r
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />\r
            <feColorMatrix in="blur" values={filterColorMatrixValues} />\r
          </filter>\r
        </svg>\r
      )}\r
\r
      <div className="blob-main" style={{ filter: useFilter ? \`url(#\${filterId})\` : undefined }}>\r
        {Array.from({ length: trailCount }).map((_, i) => (\r
          <div\r
            key={i}\r
            ref={el => {\r
              blobsRef.current[i] = el;\r
            }}\r
            className="blob"\r
            style={{\r
              width: sizes[i],\r
              height: sizes[i],\r
              borderRadius: blobType === 'circle' ? '50%' : '0%',\r
              backgroundColor: fillColor,\r
              opacity: opacities[i],\r
              boxShadow: \`\${shadowOffsetX}px \${shadowOffsetY}px \${shadowBlur}px 0 \${shadowColor}\`\r
            }}\r
          >\r
            <div\r
              className="inner-dot"\r
              style={{\r
                width: innerSizes[i],\r
                height: innerSizes[i],\r
                top: (sizes[i] - innerSizes[i]) / 2,\r
                left: (sizes[i] - innerSizes[i]) / 2,\r
                backgroundColor: innerColor,\r
                borderRadius: blobType === 'circle' ? '50%' : '0%'\r
              }}\r
            />\r
          </div>\r
        ))}\r
      </div>\r
    </div>\r
  );\r
}\r
`,te=`'use client';\r
\r
import React, { useRef, useEffect, useCallback } from 'react';\r
import gsap from 'gsap';\r
\r
export interface BlobCursorProps {\r
  blobType?: 'circle' | 'square';\r
  fillColor?: string;\r
  trailCount?: number;\r
  sizes?: number[];\r
  innerSizes?: number[];\r
  innerColor?: string;\r
  opacities?: number[];\r
  shadowColor?: string;\r
  shadowBlur?: number;\r
  shadowOffsetX?: number;\r
  shadowOffsetY?: number;\r
  filterId?: string;\r
  filterStdDeviation?: number;\r
  filterColorMatrixValues?: string;\r
  useFilter?: boolean;\r
  fastDuration?: number;\r
  slowDuration?: number;\r
  fastEase?: string;\r
  slowEase?: string;\r
  zIndex?: number;\r
}\r
\r
export default function BlobCursor({\r
  blobType = 'circle',\r
  fillColor = '#5227FF',\r
  trailCount = 3,\r
  sizes = [60, 125, 75],\r
  innerSizes = [20, 35, 25],\r
  innerColor = 'rgba(255,255,255,0.8)',\r
  opacities = [0.6, 0.6, 0.6],\r
  shadowColor = 'rgba(0,0,0,0.75)',\r
  shadowBlur = 5,\r
  shadowOffsetX = 10,\r
  shadowOffsetY = 10,\r
  filterId = 'blob',\r
  filterStdDeviation = 30,\r
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',\r
  useFilter = true,\r
  fastDuration = 0.1,\r
  slowDuration = 0.5,\r
  fastEase = 'power3.out',\r
  slowEase = 'power1.out',\r
  zIndex = 100\r
}: BlobCursorProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);\r
\r
  const updateOffset = useCallback(() => {\r
    if (!containerRef.current) return { left: 0, top: 0 };\r
    const rect = containerRef.current.getBoundingClientRect();\r
    return { left: rect.left, top: rect.top };\r
  }, []);\r
\r
  const handleMove = useCallback(\r
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {\r
      const { left, top } = updateOffset();\r
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;\r
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;\r
\r
      blobsRef.current.forEach((el, i) => {\r
        if (!el) return;\r
        const isLead = i === 0;\r
        gsap.to(el, {\r
          x: x - left,\r
          y: y - top,\r
          duration: isLead ? fastDuration : slowDuration,\r
          ease: isLead ? fastEase : slowEase\r
        });\r
      });\r
    },\r
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]\r
  );\r
\r
  useEffect(() => {\r
    const onResize = () => updateOffset();\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
  }, [updateOffset]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      onMouseMove={handleMove}\r
      onTouchMove={handleMove}\r
      className="relative top-0 left-0 w-full h-full"\r
      style={{ zIndex }}\r
    >\r
      {useFilter && (\r
        <svg className="absolute w-0 h-0">\r
          <filter id={filterId}>\r
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />\r
            <feColorMatrix in="blur" values={filterColorMatrixValues} />\r
          </filter>\r
        </svg>\r
      )}\r
\r
      <div\r
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"\r
        style={{ filter: useFilter ? \`url(#\${filterId})\` : undefined }}\r
      >\r
        {Array.from({ length: trailCount }).map((_, i) => (\r
          <div\r
            key={i}\r
            ref={el => {\r
              blobsRef.current[i] = el;\r
            }}\r
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"\r
            style={{\r
              width: sizes[i],\r
              height: sizes[i],\r
              borderRadius: blobType === 'circle' ? '50%' : '0',\r
              backgroundColor: fillColor,\r
              opacity: opacities[i],\r
              boxShadow: \`\${shadowOffsetX}px \${shadowOffsetY}px \${shadowBlur}px 0 \${shadowColor}\`\r
            }}\r
          >\r
            <div\r
              className="absolute"\r
              style={{\r
                width: innerSizes[i],\r
                height: innerSizes[i],\r
                top: (sizes[i] - innerSizes[i]) / 2,\r
                left: (sizes[i] - innerSizes[i]) / 2,\r
                backgroundColor: innerColor,\r
                borderRadius: blobType === 'circle' ? '50%' : '0'\r
              }}\r
            />\r
          </div>\r
        ))}\r
      </div>\r
    </div>\r
  );\r
}\r
`,oe={dependencies:"gsap",usage:`import BlobCursor from './BlobCursor';

<BlobCursor
  blobType="circle"
  fillColor="#5227FF"
  trailCount={3}
  sizes={[60, 125, 75]}
  innerSizes={[20, 35, 25]}
  innerColor="rgba(255,255,255,0.8)"
  opacities={[0.6, 0.6, 0.6]}
  shadowColor="rgba(0,0,0,0.75)"
  shadowBlur={5}
  shadowOffsetX={10}
  shadowOffsetY={10}
  filterStdDeviation={30}
  useFilter={true}
  fastDuration={0.1}
  slowDuration={0.5}
  zIndex={100}
/>`,code:Q,css:U,tailwind:ee,tsCode:re,tsTailwind:te};function se({blobType:c="circle",fillColor:L="#5227FF",trailCount:y=3,sizes:d=[60,125,75],innerSizes:i=[20,35,25],innerColor:F="rgba(255,255,255,0.8)",opacities:l=[.6,.6,.6],shadowColor:S="rgba(0,0,0,0.75)",shadowBlur:a=5,shadowOffsetX:z=10,shadowOffsetY:R=10,filterId:D="blob",filterStdDeviation:u=30,filterColorMatrixValues:E="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",useFilter:w=!0,fastDuration:O=.1,slowDuration:x=.5,fastEase:M="power3.out",slowEase:g="power1.out",zIndex:I=100}){const p=t.useRef(null),B=t.useRef([]),f=t.useCallback(()=>{if(!p.current)return{left:0,top:0};const o=p.current.getBoundingClientRect();return{left:o.left,top:o.top}},[]),T=t.useCallback(o=>{const{left:s,top:b}=f(),k="clientX"in o?o.clientX:o.touches[0].clientX,X="clientY"in o?o.clientY:o.touches[0].clientY;B.current.forEach((h,r)=>{if(!h)return;const m=r===0;$.to(h,{x:k-s,y:X-b,duration:m?O:x,ease:m?M:g})})},[f,O,x,M,g]);return t.useEffect(()=>{const o=()=>f();return window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)},[f]),e.jsxs("div",{ref:p,onMouseMove:T,onTouchMove:T,className:"relative top-0 left-0 w-full h-full",style:{zIndex:I},children:[w&&e.jsx("svg",{className:"absolute w-0 h-0",children:e.jsxs("filter",{id:D,children:[e.jsx("feGaussianBlur",{in:"SourceGraphic",result:"blur",stdDeviation:u}),e.jsx("feColorMatrix",{in:"blur",values:E})]})}),e.jsx("div",{className:"pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default",style:{filter:w?`url(#${D})`:void 0},children:Array.from({length:y}).map((o,s)=>e.jsx("div",{ref:b=>{B.current[s]=b},className:"absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2",style:{width:d[s],height:d[s],borderRadius:c==="circle"?"50%":"0",backgroundColor:L,opacity:l[s],boxShadow:`${z}px ${R}px ${a}px 0 ${S}`},children:e.jsx("div",{className:"absolute",style:{width:i[s],height:i[s],top:(d[s]-i[s])/2,left:(d[s]-i[s])/2,backgroundColor:F,borderRadius:c==="circle"?"50%":"0"}})},s))})]})}const ce=()=>{const[c,L]=t.useState("circle"),[y,d]=t.useState("#5227FF"),[i,F]=t.useState(3),[l,S]=t.useState([60,125,75]),[a,z]=t.useState([20,35,25]),[R,D]=t.useState("rgba(255,255,255,0.8)"),[u,E]=t.useState([.6,.6,.6]),[w,O]=t.useState("rgba(0,0,0,0.75)"),[x,M]=t.useState(5),[g,I]=t.useState(10),[p,B]=t.useState(10),[f,T]=t.useState(.1),[o,s]=t.useState(.5),[b,k]=t.useState(100),X=[{name:"blobType",type:"'circle' | 'square'",default:"'circle'",description:"Shape of the blobs."},{name:"fillColor",type:"string",default:"'#5227FF'",description:"Background color of each blob."},{name:"trailCount",type:"number",default:"3",description:"How many trailing blobs."},{name:"sizes",type:"number[]",default:"[60, 125, 75]",description:"Sizes (px) of each blob. Length must be ≥ trailCount."},{name:"innerSizes",type:"number[]",default:"[20, 35, 25]",description:"Sizes (px) of inner dots. Length must be ≥ trailCount."},{name:"innerColor",type:"string",default:"'rgba(255,255,255,0.8)'",description:"Background color of the inner dot."},{name:"opacities",type:"number[]",default:"[0.6, 0.6, 0.6]",description:"Opacity of each blob. Length ≥ trailCount."},{name:"shadowColor",type:"string",default:"'rgba(0,0,0,0.75)'",description:"Box-shadow color."},{name:"shadowBlur",type:"number",default:"5",description:"Box-shadow blur radius (px)."},{name:"shadowOffsetX",type:"number",default:"10",description:"Box-shadow X offset (px)."},{name:"shadowOffsetY",type:"number",default:"10",description:"Box-shadow Y offset (px)."},{name:"filterId",type:"string",default:"'blob'",description:"Optional custom filter ID (for multiple instances)."},{name:"filterStdDeviation",type:"number",default:"30",description:"feGaussianBlur stdDeviation for SVG filter."},{name:"filterColorMatrixValues",type:"string",default:"'1 0 0 ...'",description:"feColorMatrix values for SVG filter."},{name:"useFilter",type:"boolean",default:"true",description:"Enable the SVG filter."},{name:"fastDuration",type:"number",default:"0.1",description:"GSAP duration for the lead blob."},{name:"slowDuration",type:"number",default:"0.5",description:"GSAP duration for the following blobs."},{name:"fastEase",type:"string",default:"'power3.out'",description:"GSAP ease for the lead blob."},{name:"slowEase",type:"string",default:"'power1.out'",description:"GSAP ease for the following blobs."},{name:"zIndex",type:"number",default:"100",description:"CSS z-index of the whole component."}],h=(r,m,Y,N)=>{const v=[...N];v[m]=r,Y(v)};return e.jsxs(H,{children:[e.jsxs(_,{children:[e.jsx(G,{height:600,position:"relative",className:"demo-container",overflow:"hidden",children:e.jsx(se,{blobType:c,fillColor:y,trailCount:i,sizes:l,innerSizes:a,innerColor:R,opacities:u,shadowColor:w,shadowBlur:x,shadowOffsetX:g,shadowOffsetY:p,fastDuration:f,slowDuration:o,zIndex:b})}),e.jsxs(K,{children:[e.jsxs(V,{mb:2,fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:8,onClick:()=>L(c==="circle"?"square":"circle"),children:["Blob Type: ",e.jsxs(A,{color:"#a1a1aa",children:[" ",c]})]}),e.jsxs(j,{direction:"column",mt:2,children:[e.jsxs(j,{alignItems:"center",fontSize:"xs",h:8,children:["Fill Color:  ",e.jsx("input",{type:"color",value:y,style:{height:"22px",outline:"none",border:"1px solid #999",width:"50px",background:"transparent"},onChange:r=>d(r.target.value)})]}),e.jsxs(j,{alignItems:"center",fontSize:"xs",h:8,children:["Inner Color:  ",e.jsx("input",{type:"color",value:R,style:{height:"22px",outline:"none",border:"1px solid #999",width:"50px",background:"transparent"},onChange:r=>D(r.target.value)})]}),e.jsxs(j,{alignItems:"center",fontSize:"xs",h:8,children:["Shadow Color:  ",e.jsx("input",{type:"color",value:w,style:{height:"22px",outline:"none",border:"1px solid #999",width:"50px",background:"transparent"},onChange:r=>O(r.target.value)})]})]}),e.jsx(n,{title:"Trail Count",min:1,max:5,step:1,value:i,onChange:r=>{F(r);const m=Array(r).fill(0).map((v,C)=>l[C]||l[l.length-1]||60),Y=Array(r).fill(0).map((v,C)=>a[C]||a[a.length-1]||20),N=Array(r).fill(0).map((v,C)=>u[C]||u[u.length-1]||.6);S(m),z(Y),E(N)}}),e.jsx(n,{title:"Lead Blob Size",min:10,max:200,step:1,value:l[0],onChange:r=>h(r,0,S,l),isDisabled:i<1}),e.jsx(n,{title:"Lead Inner Dot Size",min:1,max:100,step:1,value:a[0],onChange:r=>h(r,0,z,a),isDisabled:i<1}),e.jsx(n,{title:"Lead Blob Opacity",min:.1,max:1,step:.05,value:u[0],onChange:r=>h(r,0,E,u),isDisabled:i<1}),e.jsx(n,{title:"Shadow Blur",min:0,max:50,step:1,value:x,onChange:M}),e.jsx(n,{title:"Shadow Offset X",min:-50,max:50,step:1,value:g,onChange:I}),e.jsx(n,{title:"Shadow Offset Y",min:-50,max:50,step:1,value:p,onChange:B}),e.jsx(n,{title:"Fast Duration (Lead)",min:.01,max:2,step:.01,value:f,onChange:T}),e.jsx(n,{title:"Slow Duration (Trail)",min:.01,max:3,step:.01,value:o,onChange:s}),e.jsx(n,{title:"Z-Index",min:0,max:1e3,step:10,value:b,onChange:k})]}),e.jsxs("p",{className:"demo-extra-info",style:{marginTop:"20px"},children:[e.jsx(P,{position:"relative",top:"-1px",mr:"2"})," SVG filters are not fully supported on Safari. Performance may vary."]}),e.jsx(q,{data:X}),e.jsx(J,{dependencyList:["gsap"]})]}),e.jsx(Z,{children:e.jsx(W,{codeObject:oe})})]})};export{ce as default};
