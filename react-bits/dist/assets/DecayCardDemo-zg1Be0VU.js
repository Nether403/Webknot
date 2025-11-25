import{r as c,j as r,g as b,B as z,T as C}from"./index-wsKSLPNH.js";import{T as V,P as Y,a as D,C as E,b as S}from"./PropTable-C4uPWs8h.js";import{D as X}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";const F=({width:m=300,height:v=400,image:y="https://picsum.photos/300/400?grayscale",children:R})=>{const g=c.useRef(null),h=c.useRef(null),i=c.useRef({x:window.innerWidth/2,y:window.innerHeight/2}),p=c.useRef({...i.current}),u=c.useRef({width:window.innerWidth,height:window.innerHeight});return c.useEffect(()=>{const d=(t,n,a)=>(1-a)*t+a*n,l=(t,n,a,e,o)=>(t-n)*(o-e)/(a-n)+e,M=(t,n,a,e)=>{const o=t-n,T=a-e;return Math.hypot(o,T)},f=()=>{u.current={width:window.innerWidth,height:window.innerHeight}},w=t=>{i.current={x:t.clientX,y:t.clientY}};window.addEventListener("resize",f),window.addEventListener("mousemove",w);const s={imgTransforms:{x:0,y:0,rz:0},displacementScale:0},x=()=>{let t=d(s.imgTransforms.x,l(i.current.x,0,u.current.width,-120,120),.1),n=d(s.imgTransforms.y,l(i.current.y,0,u.current.height,-120,120),.1),a=d(s.imgTransforms.rz,l(i.current.x,0,u.current.width,-10,10),.1);const e=50;t>e&&(t=e+(t-e)*.2),t<-e&&(t=-e+(t+e)*.2),n>e&&(n=e+(n-e)*.2),n<-e&&(n=-e+(n+e)*.2),s.imgTransforms.x=t,s.imgTransforms.y=n,s.imgTransforms.rz=a,g.current&&b.set(g.current,{x:s.imgTransforms.x,y:s.imgTransforms.y,rotateZ:s.imgTransforms.rz});const o=M(p.current.x,i.current.x,p.current.y,i.current.y);s.displacementScale=d(s.displacementScale,l(o,0,200,0,400),.06),h.current&&b.set(h.current,{attr:{scale:s.displacementScale}}),p.current={...i.current},requestAnimationFrame(x)};return x(),()=>{window.removeEventListener("resize",f),window.removeEventListener("mousemove",w)}},[]),r.jsxs("div",{className:"content",style:{width:`${m}px`,height:`${v}px`},ref:g,children:[r.jsxs("svg",{viewBox:"-60 -75 720 900",preserveAspectRatio:"xMidYMid slice",className:"svg",children:[r.jsxs("filter",{id:"imgFilter",children:[r.jsx("feTurbulence",{type:"turbulence",baseFrequency:"0.015",numOctaves:"5",seed:"4",stitchTiles:"stitch",x:"0%",y:"0%",width:"100%",height:"100%",result:"turbulence1"}),r.jsx("feDisplacementMap",{ref:h,in:"SourceGraphic",in2:"turbulence1",scale:"0",xChannelSelector:"R",yChannelSelector:"B",x:"0%",y:"0%",width:"100%",height:"100%",result:"displacementMap3"})]}),r.jsx("g",{children:r.jsx("image",{href:y,x:"0",y:"0",width:"600",height:"750",filter:"url(#imgFilter)",preserveAspectRatio:"xMidYMid slice"})})]}),r.jsx("div",{className:"card-text",children:R})]})},L=`import { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
\r
import './DecayCard.css';\r
\r
const DecayCard = ({ width = 300, height = 400, image = 'https://picsum.photos/300/400?grayscale', children }) => {\r
  const svgRef = useRef(null);\r
  const displacementMapRef = useRef(null);\r
  const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });\r
  const cachedCursor = useRef({ ...cursor.current });\r
  const winsize = useRef({ width: window.innerWidth, height: window.innerHeight });\r
\r
  useEffect(() => {\r
    const lerp = (a, b, n) => (1 - n) * a + n * b;\r
\r
    const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;\r
\r
    const distance = (x1, x2, y1, y2) => {\r
      const a = x1 - x2;\r
      const b = y1 - y2;\r
      return Math.hypot(a, b);\r
    };\r
\r
    const handleResize = () => {\r
      winsize.current = { width: window.innerWidth, height: window.innerHeight };\r
    };\r
\r
    const handleMouseMove = ev => {\r
      cursor.current = { x: ev.clientX, y: ev.clientY };\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    window.addEventListener('mousemove', handleMouseMove);\r
\r
    const imgValues = {\r
      imgTransforms: { x: 0, y: 0, rz: 0 },\r
      displacementScale: 0\r
    };\r
\r
    const render = () => {\r
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);\r
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);\r
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);\r
\r
      const bound = 50;\r
\r
      if (targetX > bound) targetX = bound + (targetX - bound) * 0.2;\r
      if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2;\r
      if (targetY > bound) targetY = bound + (targetY - bound) * 0.2;\r
      if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2;\r
\r
      imgValues.imgTransforms.x = targetX;\r
      imgValues.imgTransforms.y = targetY;\r
      imgValues.imgTransforms.rz = targetRz;\r
\r
      if (svgRef.current) {\r
        gsap.set(svgRef.current, {\r
          x: imgValues.imgTransforms.x,\r
          y: imgValues.imgTransforms.y,\r
          rotateZ: imgValues.imgTransforms.rz\r
        });\r
      }\r
\r
      const cursorTravelledDistance = distance(\r
        cachedCursor.current.x,\r
        cursor.current.x,\r
        cachedCursor.current.y,\r
        cursor.current.y\r
      );\r
      imgValues.displacementScale = lerp(\r
        imgValues.displacementScale,\r
        map(cursorTravelledDistance, 0, 200, 0, 400),\r
        0.06\r
      );\r
\r
      if (displacementMapRef.current) {\r
        gsap.set(displacementMapRef.current, { attr: { scale: imgValues.displacementScale } });\r
      }\r
\r
      cachedCursor.current = { ...cursor.current };\r
\r
      requestAnimationFrame(render);\r
    };\r
\r
    render();\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
      window.removeEventListener('mousemove', handleMouseMove);\r
    };\r
  }, []);\r
\r
  return (\r
    <div className="content" style={{ width: \`\${width}px\`, height: \`\${height}px\` }} ref={svgRef}>\r
      <svg viewBox="-60 -75 720 900" preserveAspectRatio="xMidYMid slice" className="svg">\r
        <filter id="imgFilter">\r
          <feTurbulence\r
            type="turbulence"\r
            baseFrequency="0.015"\r
            numOctaves="5"\r
            seed="4"\r
            stitchTiles="stitch"\r
            x="0%"\r
            y="0%"\r
            width="100%"\r
            height="100%"\r
            result="turbulence1"\r
          />\r
          <feDisplacementMap\r
            ref={displacementMapRef}\r
            in="SourceGraphic"\r
            in2="turbulence1"\r
            scale="0"\r
            xChannelSelector="R"\r
            yChannelSelector="B"\r
            x="0%"\r
            y="0%"\r
            width="100%"\r
            height="100%"\r
            result="displacementMap3"\r
          />\r
        </filter>\r
        <g>\r
          <image\r
            href={image}\r
            x="0"\r
            y="0"\r
            width="600"\r
            height="750"\r
            filter="url(#imgFilter)"\r
            preserveAspectRatio="xMidYMid slice"\r
          />\r
        </g>\r
      </svg>\r
      <div className="card-text">{children}</div>\r
    </div>\r
  );\r
};\r
\r
export default DecayCard;\r
`,j=`.content {\r
  position: relative;\r
}\r
\r
.svg {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  display: block;\r
  will-change: transform;\r
}\r
\r
.card-text {\r
  position: absolute;\r
  bottom: 1.2em;\r
  letter-spacing: -0.5px;\r
  font-weight: 900;\r
  left: 1em;\r
  font-size: 2.5rem;\r
  line-height: 1.5em;\r
}\r
\r
.card-text::first-line {\r
  font-size: 4rem;\r
}\r
`,N=`import { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
\r
const DecayCard = ({ width = 300, height = 400, image = 'https://picsum.photos/300/400?grayscale', children }) => {\r
  const svgRef = useRef(null);\r
  const displacementMapRef = useRef(null);\r
  const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });\r
  const cachedCursor = useRef({ ...cursor.current });\r
  const winsize = useRef({ width: window.innerWidth, height: window.innerHeight });\r
\r
  useEffect(() => {\r
    const lerp = (a, b, n) => (1 - n) * a + n * b;\r
    const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;\r
    const distance = (x1, x2, y1, y2) => Math.hypot(x1 - x2, y1 - y2);\r
\r
    const handleResize = () => {\r
      winsize.current = { width: window.innerWidth, height: window.innerHeight };\r
    };\r
\r
    const handleMouseMove = ev => {\r
      cursor.current = { x: ev.clientX, y: ev.clientY };\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    window.addEventListener('mousemove', handleMouseMove);\r
\r
    const imgValues = {\r
      imgTransforms: { x: 0, y: 0, rz: 0 },\r
      displacementScale: 0\r
    };\r
\r
    const render = () => {\r
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);\r
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);\r
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);\r
\r
      const bound = 50;\r
      if (targetX > bound) targetX = bound + (targetX - bound) * 0.2;\r
      if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2;\r
      if (targetY > bound) targetY = bound + (targetY - bound) * 0.2;\r
      if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2;\r
\r
      imgValues.imgTransforms.x = targetX;\r
      imgValues.imgTransforms.y = targetY;\r
      imgValues.imgTransforms.rz = targetRz;\r
\r
      if (svgRef.current) {\r
        gsap.set(svgRef.current, {\r
          x: imgValues.imgTransforms.x,\r
          y: imgValues.imgTransforms.y,\r
          rotateZ: imgValues.imgTransforms.rz\r
        });\r
      }\r
\r
      const cursorTravelledDistance = distance(\r
        cachedCursor.current.x,\r
        cursor.current.x,\r
        cachedCursor.current.y,\r
        cursor.current.y\r
      );\r
      imgValues.displacementScale = lerp(\r
        imgValues.displacementScale,\r
        map(cursorTravelledDistance, 0, 200, 0, 400),\r
        0.06\r
      );\r
\r
      if (displacementMapRef.current) {\r
        gsap.set(displacementMapRef.current, { attr: { scale: imgValues.displacementScale } });\r
      }\r
\r
      cachedCursor.current = { ...cursor.current };\r
\r
      requestAnimationFrame(render);\r
    };\r
\r
    render();\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
      window.removeEventListener('mousemove', handleMouseMove);\r
    };\r
  }, []);\r
\r
  return (\r
    <div ref={svgRef} className="relative" style={{ width: \`\${width}px\`, height: \`\${height}px\` }}>\r
      <svg\r
        viewBox="-60 -75 720 900"\r
        preserveAspectRatio="xMidYMid slice"\r
        className="relative w-full h-full block [will-change:transform]"\r
      >\r
        <filter id="imgFilter">\r
          <feTurbulence\r
            type="turbulence"\r
            baseFrequency="0.015"\r
            numOctaves="5"\r
            seed="4"\r
            stitchTiles="stitch"\r
            x="0%"\r
            y="0%"\r
            width="100%"\r
            height="100%"\r
            result="turbulence1"\r
          />\r
          <feDisplacementMap\r
            ref={displacementMapRef}\r
            in="SourceGraphic"\r
            in2="turbulence1"\r
            scale="0"\r
            xChannelSelector="R"\r
            yChannelSelector="B"\r
            x="0%"\r
            y="0%"\r
            width="100%"\r
            height="100%"\r
            result="displacementMap3"\r
          />\r
        </filter>\r
        <g>\r
          <image\r
            href={image}\r
            x="0"\r
            y="0"\r
            width="600"\r
            height="750"\r
            filter="url(#imgFilter)"\r
            preserveAspectRatio="xMidYMid slice"\r
          />\r
        </g>\r
      </svg>\r
      <div className="absolute bottom-[1.2em] left-[1em] tracking-[-0.5px] font-black text-[2.5rem] leading-[1.5em] first-line:text-[6rem]">\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default DecayCard;\r
`,H=`import React, { useEffect, useRef, ReactNode } from 'react';\r
import { gsap } from 'gsap';\r
import './DecayCard.css';\r
\r
interface DecayCardProps {\r
  width?: number;\r
  height?: number;\r
  image?: string;\r
  children?: ReactNode;\r
}\r
\r
const DecayCard: React.FC<DecayCardProps> = ({\r
  width = 300,\r
  height = 400,\r
  image = 'https://picsum.photos/300/400?grayscale',\r
  children\r
}) => {\r
  const svgRef = useRef<HTMLDivElement>(null);\r
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);\r
  const cursor = useRef<{ x: number; y: number }>({\r
    x: window.innerWidth / 2,\r
    y: window.innerHeight / 2\r
  });\r
  const cachedCursor = useRef<{ x: number; y: number }>({ ...cursor.current });\r
  const winsize = useRef<{ width: number; height: number }>({\r
    width: window.innerWidth,\r
    height: window.innerHeight\r
  });\r
\r
  useEffect(() => {\r
    const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;\r
\r
    const map = (x: number, a: number, b: number, c: number, d: number): number => ((x - a) * (d - c)) / (b - a) + c;\r
\r
    const distance = (x1: number, x2: number, y1: number, y2: number): number => {\r
      const a = x1 - x2;\r
      const b = y1 - y2;\r
      return Math.hypot(a, b);\r
    };\r
\r
    const handleResize = (): void => {\r
      winsize.current = {\r
        width: window.innerWidth,\r
        height: window.innerHeight\r
      };\r
    };\r
\r
    const handleMouseMove = (ev: MouseEvent): void => {\r
      cursor.current = { x: ev.clientX, y: ev.clientY };\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    window.addEventListener('mousemove', handleMouseMove);\r
\r
    const imgValues = {\r
      imgTransforms: { x: 0, y: 0, rz: 0 },\r
      displacementScale: 0\r
    };\r
\r
    const render = () => {\r
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);\r
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);\r
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);\r
\r
      const bound = 50;\r
      if (targetX > bound) targetX = bound + (targetX - bound) * 0.2;\r
      if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2;\r
      if (targetY > bound) targetY = bound + (targetY - bound) * 0.2;\r
      if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2;\r
\r
      imgValues.imgTransforms.x = targetX;\r
      imgValues.imgTransforms.y = targetY;\r
      imgValues.imgTransforms.rz = targetRz;\r
\r
      if (svgRef.current) {\r
        gsap.set(svgRef.current, {\r
          x: imgValues.imgTransforms.x,\r
          y: imgValues.imgTransforms.y,\r
          rotateZ: imgValues.imgTransforms.rz\r
        });\r
      }\r
\r
      const cursorTravelledDistance = distance(\r
        cachedCursor.current.x,\r
        cursor.current.x,\r
        cachedCursor.current.y,\r
        cursor.current.y\r
      );\r
      imgValues.displacementScale = lerp(\r
        imgValues.displacementScale,\r
        map(cursorTravelledDistance, 0, 200, 0, 400),\r
        0.06\r
      );\r
\r
      if (displacementMapRef.current) {\r
        gsap.set(displacementMapRef.current, {\r
          attr: { scale: imgValues.displacementScale }\r
        });\r
      }\r
\r
      cachedCursor.current = { ...cursor.current };\r
\r
      requestAnimationFrame(render);\r
    };\r
\r
    render();\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
      window.removeEventListener('mousemove', handleMouseMove);\r
    };\r
  }, []);\r
\r
  return (\r
    <div className="content" style={{ width: \`\${width}px\`, height: \`\${height}px\` }} ref={svgRef}>\r
      <svg viewBox="-60 -75 720 900" preserveAspectRatio="xMidYMid slice" className="svg">\r
        <filter id="imgFilter">\r
          <feTurbulence\r
            type="turbulence"\r
            baseFrequency="0.015"\r
            numOctaves="5"\r
            seed="4"\r
            stitchTiles="stitch"\r
            x="0%"\r
            y="0%"\r
            width="100%"\r
            height="100%"\r
            result="turbulence1"\r
          />\r
          <feDisplacementMap\r
            ref={displacementMapRef}\r
            in="SourceGraphic"\r
            in2="turbulence1"\r
            scale="0"\r
            xChannelSelector="R"\r
            yChannelSelector="B"\r
            x="0%"\r
            y="0%"\r
            width="100%"\r
            height="100%"\r
            result="displacementMap3"\r
          />\r
        </filter>\r
        <g>\r
          <image\r
            href={image}\r
            x="0"\r
            y="0"\r
            width="600"\r
            height="750"\r
            filter="url(#imgFilter)"\r
            preserveAspectRatio="xMidYMid slice"\r
          />\r
        </g>\r
      </svg>\r
      <div className="card-text">{children}</div>\r
    </div>\r
  );\r
};\r
\r
export default DecayCard;\r
`,A=`import React, { useEffect, useRef, ReactNode } from 'react';\r
import { gsap } from 'gsap';\r
\r
interface DecayCardProps {\r
  width?: number;\r
  height?: number;\r
  image?: string;\r
  children?: ReactNode;\r
}\r
\r
const DecayCard: React.FC<DecayCardProps> = ({\r
  width = 300,\r
  height = 400,\r
  image = 'https://picsum.photos/300/400?grayscale',\r
  children\r
}) => {\r
  const svgRef = useRef<HTMLDivElement | null>(null);\r
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);\r
  const cursor = useRef<{ x: number; y: number }>({\r
    x: window.innerWidth / 2,\r
    y: window.innerHeight / 2\r
  });\r
  const cachedCursor = useRef<{ x: number; y: number }>({ ...cursor.current });\r
  const winsize = useRef<{ width: number; height: number }>({\r
    width: window.innerWidth,\r
    height: window.innerHeight\r
  });\r
\r
  useEffect(() => {\r
    const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;\r
    const map = (x: number, a: number, b: number, c: number, d: number): number => ((x - a) * (d - c)) / (b - a) + c;\r
    const distance = (x1: number, x2: number, y1: number, y2: number): number => Math.hypot(x1 - x2, y1 - y2);\r
\r
    const handleResize = (): void => {\r
      winsize.current = {\r
        width: window.innerWidth,\r
        height: window.innerHeight\r
      };\r
    };\r
\r
    const handleMouseMove = (ev: MouseEvent): void => {\r
      cursor.current = { x: ev.clientX, y: ev.clientY };\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    window.addEventListener('mousemove', handleMouseMove);\r
\r
    const imgValues = {\r
      imgTransforms: { x: 0, y: 0, rz: 0 },\r
      displacementScale: 0\r
    };\r
\r
    const render = () => {\r
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);\r
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);\r
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);\r
\r
      const bound = 50;\r
      if (targetX > bound) targetX = bound + (targetX - bound) * 0.2;\r
      if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2;\r
      if (targetY > bound) targetY = bound + (targetY - bound) * 0.2;\r
      if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2;\r
\r
      imgValues.imgTransforms.x = targetX;\r
      imgValues.imgTransforms.y = targetY;\r
      imgValues.imgTransforms.rz = targetRz;\r
\r
      if (svgRef.current) {\r
        gsap.set(svgRef.current, {\r
          x: imgValues.imgTransforms.x,\r
          y: imgValues.imgTransforms.y,\r
          rotateZ: imgValues.imgTransforms.rz\r
        });\r
      }\r
\r
      const cursorTravelledDistance = distance(\r
        cachedCursor.current.x,\r
        cursor.current.x,\r
        cachedCursor.current.y,\r
        cursor.current.y\r
      );\r
      imgValues.displacementScale = lerp(\r
        imgValues.displacementScale,\r
        map(cursorTravelledDistance, 0, 200, 0, 400),\r
        0.06\r
      );\r
\r
      if (displacementMapRef.current) {\r
        gsap.set(displacementMapRef.current, {\r
          attr: { scale: imgValues.displacementScale }\r
        });\r
      }\r
\r
      cachedCursor.current = { ...cursor.current };\r
\r
      requestAnimationFrame(render);\r
    };\r
\r
    render();\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
      window.removeEventListener('mousemove', handleMouseMove);\r
    };\r
  }, []);\r
\r
  return (\r
    <div ref={svgRef} className="relative" style={{ width: \`\${width}px\`, height: \`\${height}px\` }}>\r
      <svg\r
        viewBox="-60 -75 720 900"\r
        preserveAspectRatio="xMidYMid slice"\r
        className="relative w-full h-full block [will-change:transform]"\r
      >\r
        <filter id="imgFilter">\r
          <feTurbulence\r
            type="turbulence"\r
            baseFrequency="0.015"\r
            numOctaves="5"\r
            seed="4"\r
            stitchTiles="stitch"\r
            x="0%"\r
            y="0%"\r
            width="100%"\r
            height="100%"\r
            result="turbulence1"\r
          />\r
          <feDisplacementMap\r
            ref={displacementMapRef}\r
            in="SourceGraphic"\r
            in2="turbulence1"\r
            scale="0"\r
            xChannelSelector="R"\r
            yChannelSelector="B"\r
            x="0%"\r
            y="0%"\r
            width="100%"\r
            height="100%"\r
            result="displacementMap3"\r
          />\r
        </filter>\r
        <g>\r
          <image\r
            href={image}\r
            x="0"\r
            y="0"\r
            width="600"\r
            height="750"\r
            filter="url(#imgFilter)"\r
            preserveAspectRatio="xMidYMid slice"\r
          />\r
        </g>\r
      </svg>\r
      <div className="absolute bottom-[1.2em] left-[1em] tracking-[-0.5px] font-black text-[2.5rem] leading-[1.5em] first-line:text-[6rem]">\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default DecayCard;\r
`,W={dependencies:"gsap",usage:`import DecayCard from './DecayCard';

<DecayCard width={200} height={300} image="https://picsum.photos/300/400?grayscale">
  <h2>Decay<br/>Card</h2>
</DecayCard>`,code:L,css:j,tailwind:N,tsCode:H,tsTailwind:A},G=()=>{const m=[{name:"children",type:"ReactNode",default:"",description:"The content (JSX) to be rendered inside the card."},{name:"width",type:"number",default:"200",description:"The width of the card in pixels."},{name:"height",type:"number",default:"300",description:"The height of the card in pixels."},{name:"image",type:"string",default:"",description:"Allows setting the background image of the card."}];return r.jsxs(V,{children:[r.jsxs(Y,{children:[r.jsx(z,{position:"relative",className:"demo-container",overflow:"hidden",children:r.jsx(F,{children:r.jsxs(C,{mixBlendMode:"overlay",children:["Decay",r.jsx("br",{}),"Card"]})})}),r.jsx(D,{data:m}),r.jsx(X,{dependencyList:["gsap"]})]}),r.jsx(E,{children:r.jsx(S,{codeObject:W})})]})};export{G as default};
