import{r as s,g as f,j as e,B as L,F as S,T as R,d as V,a as w}from"./index-wsKSLPNH.js";import{T as H,P as z,a as C,C as T,b as q}from"./PropTable-C4uPWs8h.js";import{D as A}from"./Dependencies-BHoMfJUj.js";import{C as X}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";const F=(i,r,u)=>(1-u)*i+u*r,Y=(i,r)=>{if(r){const u=r.getBoundingClientRect();return{x:i.clientX-u.left,y:i.clientY-u.top}}return{x:i.clientX,y:i.clientY}},j=({color:i="white",containerRef:r=null})=>{const u=s.useRef(null),l=s.useRef(null),o=s.useRef(null),m=s.useRef(null),v=s.useRef(null);let c={x:0,y:0};return s.useEffect(()=>{const d=n=>{if(c=Y(n,r==null?void 0:r.current),r!=null&&r.current){const b=r.current.getBoundingClientRect();n.clientX<b.left||n.clientX>b.right||n.clientY<b.top||n.clientY>b.bottom?f.to([l.current,o.current],{opacity:0}):f.to([l.current,o.current],{opacity:1})}},a=(r==null?void 0:r.current)||window;a.addEventListener("mousemove",d);const t={tx:{previous:0,current:0,amt:.15},ty:{previous:0,current:0,amt:.15}};f.set([l.current,o.current],{opacity:0});const p=()=>{t.tx.previous=t.tx.current=c.x,t.ty.previous=t.ty.current=c.y,f.to([l.current,o.current],{duration:.9,ease:"Power3.easeOut",opacity:1}),requestAnimationFrame(E),a.removeEventListener("mousemove",p)};a.addEventListener("mousemove",p);const y={turbulence:0},g=f.timeline({paused:!0,onStart:()=>{l.current.style.filter="url(#filter-noise-x)",o.current.style.filter="url(#filter-noise-y)"},onUpdate:()=>{m.current&&v.current&&(m.current.setAttribute("baseFrequency",y.turbulence),v.current.setAttribute("baseFrequency",y.turbulence))},onComplete:()=>{l.current&&o.current&&(l.current.style.filter=o.current.style.filter="none")}}).to(y,{duration:.5,ease:"power1",startAt:{turbulence:1},turbulence:0}),h=()=>g.restart(),x=()=>g.progress(1).kill(),E=()=>{t.tx.current=c.x,t.ty.current=c.y;for(const n in t)t[n].previous=F(t[n].previous,t[n].current,t[n].amt);l.current&&l.current&&(f.set(o.current,{x:t.tx.previous}),f.set(l.current,{y:t.ty.previous})),requestAnimationFrame(E)},M=r!=null&&r.current?r.current.querySelectorAll("a"):document.querySelectorAll("a");return M.forEach(n=>{n.addEventListener("mouseenter",h),n.addEventListener("mouseleave",x)}),()=>{a.removeEventListener("mousemove",d),a.removeEventListener("mousemove",p),M.forEach(n=>{n.removeEventListener("mouseenter",h),n.removeEventListener("mouseleave",x)})}},[r]),e.jsxs("div",{ref:u,className:"cursor",style:{position:r?"absolute":"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1e4},children:[e.jsx("svg",{style:{position:"absolute",left:0,top:0,width:"100%",height:"100%"},children:e.jsxs("defs",{children:[e.jsxs("filter",{id:"filter-noise-x",children:[e.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.000001",numOctaves:"1",ref:m}),e.jsx("feDisplacementMap",{in:"SourceGraphic",scale:"40"})]}),e.jsxs("filter",{id:"filter-noise-y",children:[e.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.000001",numOctaves:"1",ref:v}),e.jsx("feDisplacementMap",{in:"SourceGraphic",scale:"40"})]})]})}),e.jsx("div",{ref:l,style:{position:"absolute",width:"100%",height:"1px",background:i,pointerEvents:"none",transform:"translateY(50%)",opacity:0}}),e.jsx("div",{ref:o,style:{position:"absolute",height:"100%",width:"1px",background:i,pointerEvents:"none",transform:"translateX(50%)",opacity:0}})]})},D=`import { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
\r
const lerp = (a, b, n) => (1 - n) * a + n * b;\r
\r
const getMousePos = (e, container) => {\r
  if (container) {\r
    const bounds = container.getBoundingClientRect();\r
    return {\r
      x: e.clientX - bounds.left,\r
      y: e.clientY - bounds.top\r
    };\r
  }\r
  return { x: e.clientX, y: e.clientY };\r
};\r
\r
const Crosshair = ({ color = 'white', containerRef = null }) => {\r
  const cursorRef = useRef(null);\r
  const lineHorizontalRef = useRef(null);\r
  const lineVerticalRef = useRef(null);\r
  const filterXRef = useRef(null);\r
  const filterYRef = useRef(null);\r
\r
  let mouse = { x: 0, y: 0 };\r
\r
  useEffect(() => {\r
    const handleMouseMove = ev => {\r
      // eslint-disable-next-line react-hooks/exhaustive-deps\r
      mouse = getMousePos(ev, containerRef?.current);\r
\r
      if (containerRef?.current) {\r
        const bounds = containerRef.current.getBoundingClientRect();\r
        if (\r
          ev.clientX < bounds.left ||\r
          ev.clientX > bounds.right ||\r
          ev.clientY < bounds.top ||\r
          ev.clientY > bounds.bottom\r
        ) {\r
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0 });\r
        } else {\r
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 1 });\r
        }\r
      }\r
    };\r
\r
    const target = containerRef?.current || window;\r
    target.addEventListener('mousemove', handleMouseMove);\r
\r
    const renderedStyles = {\r
      tx: { previous: 0, current: 0, amt: 0.15 },\r
      ty: { previous: 0, current: 0, amt: 0.15 }\r
    };\r
\r
    gsap.set([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0 });\r
\r
    const onMouseMove = () => {\r
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;\r
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;\r
\r
      gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {\r
        duration: 0.9,\r
        ease: 'Power3.easeOut',\r
        opacity: 1\r
      });\r
\r
      requestAnimationFrame(render);\r
\r
      target.removeEventListener('mousemove', onMouseMove);\r
    };\r
\r
    target.addEventListener('mousemove', onMouseMove);\r
\r
    const primitiveValues = { turbulence: 0 };\r
\r
    const tl = gsap\r
      .timeline({\r
        paused: true,\r
        onStart: () => {\r
          lineHorizontalRef.current.style.filter = \`url(#filter-noise-x)\`;\r
          lineVerticalRef.current.style.filter = \`url(#filter-noise-y)\`;\r
        },\r
        onUpdate: () => {\r
          if (filterXRef.current && filterYRef.current) {\r
            filterXRef.current.setAttribute('baseFrequency', primitiveValues.turbulence);\r
            filterYRef.current.setAttribute('baseFrequency', primitiveValues.turbulence);\r
          }\r
        },\r
        onComplete: () => {\r
          if (lineHorizontalRef.current && lineVerticalRef.current) {\r
            lineHorizontalRef.current.style.filter = lineVerticalRef.current.style.filter = 'none';\r
          }\r
        }\r
      })\r
      .to(primitiveValues, {\r
        duration: 0.5,\r
        ease: 'power1',\r
        startAt: { turbulence: 1 },\r
        turbulence: 0\r
      });\r
\r
    const enter = () => tl.restart();\r
    const leave = () => tl.progress(1).kill();\r
\r
    const render = () => {\r
      renderedStyles.tx.current = mouse.x;\r
      renderedStyles.ty.current = mouse.y;\r
\r
      for (const key in renderedStyles) {\r
        renderedStyles[key].previous = lerp(\r
          renderedStyles[key].previous,\r
          renderedStyles[key].current,\r
          renderedStyles[key].amt\r
        );\r
      }\r
\r
      if (lineHorizontalRef.current && lineHorizontalRef.current) {\r
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });\r
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });\r
      }\r
\r
      requestAnimationFrame(render);\r
    };\r
\r
    const links = containerRef?.current ? containerRef.current.querySelectorAll('a') : document.querySelectorAll('a');\r
\r
    links.forEach(link => {\r
      link.addEventListener('mouseenter', enter);\r
      link.addEventListener('mouseleave', leave);\r
    });\r
\r
    return () => {\r
      target.removeEventListener('mousemove', handleMouseMove);\r
      target.removeEventListener('mousemove', onMouseMove);\r
      links.forEach(link => {\r
        link.removeEventListener('mouseenter', enter);\r
        link.removeEventListener('mouseleave', leave);\r
      });\r
    };\r
  }, [containerRef]);\r
\r
  return (\r
    <div\r
      ref={cursorRef}\r
      className="cursor"\r
      style={{\r
        position: containerRef ? 'absolute' : 'fixed',\r
        top: 0,\r
        left: 0,\r
        width: '100%',\r
        height: '100%',\r
        pointerEvents: 'none',\r
        zIndex: 10000\r
      }}\r
    >\r
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>\r
        <defs>\r
          <filter id="filter-noise-x">\r
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterXRef} />\r
            <feDisplacementMap in="SourceGraphic" scale="40" />\r
          </filter>\r
          <filter id="filter-noise-y">\r
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterYRef} />\r
            <feDisplacementMap in="SourceGraphic" scale="40" />\r
          </filter>\r
        </defs>\r
      </svg>\r
      <div\r
        ref={lineHorizontalRef}\r
        style={{\r
          position: 'absolute',\r
          width: '100%',\r
          height: '1px',\r
          background: color,\r
          pointerEvents: 'none',\r
          transform: 'translateY(50%)',\r
          opacity: 0\r
        }}\r
      ></div>\r
      <div\r
        ref={lineVerticalRef}\r
        style={{\r
          position: 'absolute',\r
          height: '100%',\r
          width: '1px',\r
          background: color,\r
          pointerEvents: 'none',\r
          transform: 'translateX(50%)',\r
          opacity: 0\r
        }}\r
      ></div>\r
    </div>\r
  );\r
};\r
\r
export default Crosshair;\r
`,N=`import { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
\r
const lerp = (a, b, n) => (1 - n) * a + n * b;\r
\r
const getMousePos = (e, container) => {\r
  if (container) {\r
    const bounds = container.getBoundingClientRect();\r
    return {\r
      x: e.clientX - bounds.left,\r
      y: e.clientY - bounds.top\r
    };\r
  }\r
  return { x: e.clientX, y: e.clientY };\r
};\r
\r
const Crosshair = ({ color = 'white', containerRef = null }) => {\r
  const cursorRef = useRef(null);\r
  const lineHorizontalRef = useRef(null);\r
  const lineVerticalRef = useRef(null);\r
  const filterXRef = useRef(null);\r
  const filterYRef = useRef(null);\r
\r
  let mouse = { x: 0, y: 0 };\r
\r
  useEffect(() => {\r
    const handleMouseMove = ev => {\r
      // eslint-disable-next-line react-hooks/exhaustive-deps\r
      mouse = getMousePos(ev, containerRef?.current);\r
\r
      if (containerRef?.current) {\r
        const bounds = containerRef.current.getBoundingClientRect();\r
        if (\r
          ev.clientX < bounds.left ||\r
          ev.clientX > bounds.right ||\r
          ev.clientY < bounds.top ||\r
          ev.clientY > bounds.bottom\r
        ) {\r
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {\r
            opacity: 0\r
          });\r
        } else {\r
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {\r
            opacity: 1\r
          });\r
        }\r
      }\r
    };\r
\r
    const target = containerRef?.current || window;\r
    target.addEventListener('mousemove', handleMouseMove);\r
\r
    const renderedStyles = {\r
      tx: { previous: 0, current: 0, amt: 0.15 },\r
      ty: { previous: 0, current: 0, amt: 0.15 }\r
    };\r
\r
    gsap.set([lineHorizontalRef.current, lineVerticalRef.current], {\r
      opacity: 0\r
    });\r
\r
    const onMouseMove = () => {\r
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;\r
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;\r
\r
      gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {\r
        duration: 0.9,\r
        ease: 'Power3.easeOut',\r
        opacity: 1\r
      });\r
\r
      requestAnimationFrame(render);\r
\r
      target.removeEventListener('mousemove', onMouseMove);\r
    };\r
\r
    target.addEventListener('mousemove', onMouseMove);\r
\r
    const primitiveValues = { turbulence: 0 };\r
\r
    const tl = gsap\r
      .timeline({\r
        paused: true,\r
        onStart: () => {\r
          lineHorizontalRef.current.style.filter = \`url(#filter-noise-x)\`;\r
          lineVerticalRef.current.style.filter = \`url(#filter-noise-y)\`;\r
        },\r
        onUpdate: () => {\r
          filterXRef.current.setAttribute('baseFrequency', primitiveValues.turbulence);\r
          filterYRef.current.setAttribute('baseFrequency', primitiveValues.turbulence);\r
        },\r
        onComplete: () => {\r
          lineHorizontalRef.current.style.filter = lineVerticalRef.current.style.filter = 'none';\r
        }\r
      })\r
      .to(primitiveValues, {\r
        duration: 0.5,\r
        ease: 'power1',\r
        startAt: { turbulence: 1 },\r
        turbulence: 0\r
      });\r
\r
    const enter = () => tl.restart();\r
    const leave = () => tl.progress(1).kill();\r
\r
    const render = () => {\r
      renderedStyles.tx.current = mouse.x;\r
      renderedStyles.ty.current = mouse.y;\r
\r
      for (const key in renderedStyles) {\r
        renderedStyles[key].previous = lerp(\r
          renderedStyles[key].previous,\r
          renderedStyles[key].current,\r
          renderedStyles[key].amt\r
        );\r
      }\r
\r
      gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });\r
      gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });\r
\r
      requestAnimationFrame(render);\r
    };\r
\r
    const links = containerRef?.current ? containerRef.current.querySelectorAll('a') : document.querySelectorAll('a');\r
\r
    links.forEach(link => {\r
      link.addEventListener('mouseenter', enter);\r
      link.addEventListener('mouseleave', leave);\r
    });\r
\r
    return () => {\r
      target.removeEventListener('mousemove', handleMouseMove);\r
      target.removeEventListener('mousemove', onMouseMove);\r
      links.forEach(link => {\r
        link.removeEventListener('mouseenter', enter);\r
        link.removeEventListener('mouseleave', leave);\r
      });\r
    };\r
  }, [containerRef]);\r
\r
  return (\r
    <div\r
      ref={cursorRef}\r
      className={\`\${containerRef ? 'absolute' : 'fixed'} top-0 left-0 w-full h-full pointer-events-none z-[10000]\`}\r
    >\r
      <svg className="absolute top-0 left-0 w-full h-full">\r
        <defs>\r
          <filter id="filter-noise-x">\r
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterXRef} />\r
            <feDisplacementMap in="SourceGraphic" scale="40" />\r
          </filter>\r
          <filter id="filter-noise-y">\r
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterYRef} />\r
            <feDisplacementMap in="SourceGraphic" scale="40" />\r
          </filter>\r
        </defs>\r
      </svg>\r
      <div\r
        ref={lineHorizontalRef}\r
        className={\`absolute w-full h-px pointer-events-none opacity-0 transform translate-y-1/2\`}\r
        style={{ background: color }}\r
      ></div>\r
      <div\r
        ref={lineVerticalRef}\r
        className={\`absolute h-full w-px pointer-events-none opacity-0 transform translate-x-1/2\`}\r
        style={{ background: color }}\r
      ></div>\r
    </div>\r
  );\r
};\r
\r
export default Crosshair;\r
`,O=`import React, { useEffect, useRef, RefObject } from 'react';\r
import { gsap } from 'gsap';\r
\r
const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;\r
\r
const getMousePos = (e: Event, container?: HTMLElement | null): { x: number; y: number } => {\r
  const mouseEvent = e as MouseEvent;\r
  if (container) {\r
    const bounds = container.getBoundingClientRect();\r
    return {\r
      x: mouseEvent.clientX - bounds.left,\r
      y: mouseEvent.clientY - bounds.top\r
    };\r
  }\r
  return { x: mouseEvent.clientX, y: mouseEvent.clientY };\r
};\r
\r
interface CrosshairProps {\r
  color?: string;\r
  containerRef?: RefObject<HTMLElement>;\r
}\r
\r
const Crosshair: React.FC<CrosshairProps> = ({ color = 'white', containerRef = null }) => {\r
  const cursorRef = useRef<HTMLDivElement>(null);\r
  const lineHorizontalRef = useRef<HTMLDivElement>(null);\r
  const lineVerticalRef = useRef<HTMLDivElement>(null);\r
  const filterXRef = useRef<SVGFETurbulenceElement>(null);\r
  const filterYRef = useRef<SVGFETurbulenceElement>(null);\r
\r
  let mouse = { x: 0, y: 0 };\r
\r
  useEffect(() => {\r
    const handleMouseMove = (ev: Event) => {\r
      const mouseEvent = ev as MouseEvent;\r
      mouse = getMousePos(mouseEvent, containerRef?.current);\r
      if (containerRef?.current) {\r
        const bounds = containerRef.current.getBoundingClientRect();\r
        if (\r
          mouseEvent.clientX < bounds.left ||\r
          mouseEvent.clientX > bounds.right ||\r
          mouseEvent.clientY < bounds.top ||\r
          mouseEvent.clientY > bounds.bottom\r
        ) {\r
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 0 });\r
        } else {\r
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 1 });\r
        }\r
      }\r
    };\r
\r
    const target: HTMLElement | Window = containerRef?.current || window;\r
    target.addEventListener('mousemove', handleMouseMove);\r
\r
    const renderedStyles: {\r
      [key: string]: { previous: number; current: number; amt: number };\r
    } = {\r
      tx: { previous: 0, current: 0, amt: 0.15 },\r
      ty: { previous: 0, current: 0, amt: 0.15 }\r
    };\r
\r
    gsap.set([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 0 });\r
\r
    const onMouseMove = (_ev: Event) => {\r
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;\r
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;\r
\r
      gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), {\r
        duration: 0.9,\r
        ease: 'Power3.easeOut',\r
        opacity: 1\r
      });\r
\r
      requestAnimationFrame(render);\r
\r
      target.removeEventListener('mousemove', onMouseMove);\r
    };\r
\r
    target.addEventListener('mousemove', onMouseMove);\r
\r
    const primitiveValues = { turbulence: 0 };\r
\r
    const tl = gsap\r
      .timeline({\r
        paused: true,\r
        onStart: () => {\r
          if (lineHorizontalRef.current) {\r
            lineHorizontalRef.current.style.filter = 'url(#filter-noise-x)';\r
          }\r
          if (lineVerticalRef.current) {\r
            lineVerticalRef.current.style.filter = 'url(#filter-noise-y)';\r
          }\r
        },\r
        onUpdate: () => {\r
          if (filterXRef.current && filterYRef.current) {\r
            filterXRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());\r
            filterYRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());\r
          }\r
        },\r
        onComplete: () => {\r
          if (lineHorizontalRef.current && lineVerticalRef.current) {\r
            lineHorizontalRef.current.style.filter = 'none';\r
            lineVerticalRef.current.style.filter = 'none';\r
          }\r
        }\r
      })\r
      .to(primitiveValues, {\r
        duration: 0.5,\r
        ease: 'power1',\r
        startAt: { turbulence: 1 },\r
        turbulence: 0\r
      });\r
\r
    const enter = () => tl.restart();\r
    const leave = () => {\r
      tl.progress(1).kill();\r
    };\r
\r
    const render = () => {\r
      renderedStyles.tx.current = mouse.x;\r
      renderedStyles.ty.current = mouse.y;\r
\r
      for (const key in renderedStyles) {\r
        const style = renderedStyles[key];\r
        style.previous = lerp(style.previous, style.current, style.amt);\r
      }\r
\r
      if (lineHorizontalRef.current && lineVerticalRef.current) {\r
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });\r
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });\r
      }\r
\r
      requestAnimationFrame(render);\r
    };\r
\r
    const links: NodeListOf<HTMLAnchorElement> = containerRef?.current\r
      ? containerRef.current.querySelectorAll('a')\r
      : document.querySelectorAll('a');\r
\r
    links.forEach(link => {\r
      link.addEventListener('mouseenter', enter);\r
      link.addEventListener('mouseleave', leave);\r
    });\r
\r
    return () => {\r
      target.removeEventListener('mousemove', handleMouseMove);\r
      target.removeEventListener('mousemove', onMouseMove);\r
      links.forEach(link => {\r
        link.removeEventListener('mouseenter', enter);\r
        link.removeEventListener('mouseleave', leave);\r
      });\r
    };\r
  }, [containerRef]);\r
\r
  return (\r
    <div\r
      ref={cursorRef}\r
      className="cursor"\r
      style={{\r
        position: containerRef ? 'absolute' : 'fixed',\r
        top: 0,\r
        left: 0,\r
        width: '100%',\r
        height: '100%',\r
        pointerEvents: 'none',\r
        zIndex: 10000\r
      }}\r
    >\r
      <svg\r
        style={{\r
          position: 'absolute',\r
          left: 0,\r
          top: 0,\r
          width: '100%',\r
          height: '100%'\r
        }}\r
      >\r
        <defs>\r
          <filter id="filter-noise-x">\r
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterXRef} />\r
            <feDisplacementMap in="SourceGraphic" scale="40" />\r
          </filter>\r
          <filter id="filter-noise-y">\r
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterYRef} />\r
            <feDisplacementMap in="SourceGraphic" scale="40" />\r
          </filter>\r
        </defs>\r
      </svg>\r
      <div\r
        ref={lineHorizontalRef}\r
        style={{\r
          position: 'absolute',\r
          width: '100%',\r
          height: '1px',\r
          background: color,\r
          pointerEvents: 'none',\r
          transform: 'translateY(50%)',\r
          opacity: 0\r
        }}\r
      />\r
      <div\r
        ref={lineVerticalRef}\r
        style={{\r
          position: 'absolute',\r
          height: '100%',\r
          width: '1px',\r
          background: color,\r
          pointerEvents: 'none',\r
          transform: 'translateX(50%)',\r
          opacity: 0\r
        }}\r
      />\r
    </div>\r
  );\r
};\r
\r
export default Crosshair;\r
`,B=`import React, { useEffect, useRef, RefObject } from 'react';\r
import { gsap } from 'gsap';\r
\r
const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;\r
\r
const getMousePos = (e: Event, container?: HTMLElement | null): { x: number; y: number } => {\r
  const mouseEvent = e as MouseEvent;\r
  if (container) {\r
    const bounds = container.getBoundingClientRect();\r
    return {\r
      x: mouseEvent.clientX - bounds.left,\r
      y: mouseEvent.clientY - bounds.top\r
    };\r
  }\r
  return { x: mouseEvent.clientX, y: mouseEvent.clientY };\r
};\r
\r
interface CrosshairProps {\r
  color?: string;\r
  containerRef?: RefObject<HTMLElement>;\r
}\r
\r
const Crosshair: React.FC<CrosshairProps> = ({ color = 'white', containerRef = null }) => {\r
  const cursorRef = useRef<HTMLDivElement>(null);\r
  const lineHorizontalRef = useRef<HTMLDivElement>(null);\r
  const lineVerticalRef = useRef<HTMLDivElement>(null);\r
  const filterXRef = useRef<SVGFETurbulenceElement>(null);\r
  const filterYRef = useRef<SVGFETurbulenceElement>(null);\r
\r
  let mouse = { x: 0, y: 0 };\r
\r
  useEffect(() => {\r
    const handleMouseMove = (ev: Event) => {\r
      const mouseEvent = ev as MouseEvent;\r
      mouse = getMousePos(mouseEvent, containerRef?.current);\r
      if (containerRef?.current) {\r
        const bounds = containerRef.current.getBoundingClientRect();\r
        if (\r
          mouseEvent.clientX < bounds.left ||\r
          mouseEvent.clientX > bounds.right ||\r
          mouseEvent.clientY < bounds.top ||\r
          mouseEvent.clientY > bounds.bottom\r
        ) {\r
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 0 });\r
        } else {\r
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 1 });\r
        }\r
      }\r
    };\r
\r
    const target: HTMLElement | Window = containerRef?.current || window;\r
    target.addEventListener('mousemove', handleMouseMove);\r
\r
    const renderedStyles: {\r
      [key: string]: { previous: number; current: number; amt: number };\r
    } = {\r
      tx: { previous: 0, current: 0, amt: 0.15 },\r
      ty: { previous: 0, current: 0, amt: 0.15 }\r
    };\r
\r
    gsap.set([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 0 });\r
\r
    const onMouseMove = (_ev: Event) => {\r
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;\r
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;\r
\r
      gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), {\r
        duration: 0.9,\r
        ease: 'Power3.easeOut',\r
        opacity: 1\r
      });\r
\r
      requestAnimationFrame(render);\r
\r
      target.removeEventListener('mousemove', onMouseMove);\r
    };\r
\r
    target.addEventListener('mousemove', onMouseMove);\r
\r
    const primitiveValues = { turbulence: 0 };\r
\r
    const tl = gsap\r
      .timeline({\r
        paused: true,\r
        onStart: () => {\r
          if (lineHorizontalRef.current) {\r
            lineHorizontalRef.current.style.filter = 'url(#filter-noise-x)';\r
          }\r
          if (lineVerticalRef.current) {\r
            lineVerticalRef.current.style.filter = 'url(#filter-noise-y)';\r
          }\r
        },\r
        onUpdate: () => {\r
          if (filterXRef.current && filterYRef.current) {\r
            filterXRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());\r
            filterYRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());\r
          }\r
        },\r
        onComplete: () => {\r
          if (lineHorizontalRef.current && lineVerticalRef.current) {\r
            lineHorizontalRef.current.style.filter = 'none';\r
            lineVerticalRef.current.style.filter = 'none';\r
          }\r
        }\r
      })\r
      .to(primitiveValues, {\r
        duration: 0.5,\r
        ease: 'power1',\r
        startAt: { turbulence: 1 },\r
        turbulence: 0\r
      });\r
\r
    const enter = () => tl.restart();\r
    const leave = () => {\r
      tl.progress(1).kill();\r
    };\r
\r
    const render = () => {\r
      renderedStyles.tx.current = mouse.x;\r
      renderedStyles.ty.current = mouse.y;\r
\r
      for (const key in renderedStyles) {\r
        const style = renderedStyles[key];\r
        style.previous = lerp(style.previous, style.current, style.amt);\r
      }\r
\r
      if (lineHorizontalRef.current && lineVerticalRef.current) {\r
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });\r
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });\r
      }\r
\r
      requestAnimationFrame(render);\r
    };\r
\r
    const links: NodeListOf<HTMLAnchorElement> = containerRef?.current\r
      ? containerRef.current.querySelectorAll('a')\r
      : document.querySelectorAll('a');\r
\r
    links.forEach(link => {\r
      link.addEventListener('mouseenter', enter);\r
      link.addEventListener('mouseleave', leave);\r
    });\r
\r
    return () => {\r
      target.removeEventListener('mousemove', handleMouseMove);\r
      target.removeEventListener('mousemove', onMouseMove);\r
      links.forEach(link => {\r
        link.removeEventListener('mouseenter', enter);\r
        link.removeEventListener('mouseleave', leave);\r
      });\r
    };\r
  }, [containerRef]);\r
\r
  return (\r
    <div\r
      ref={cursorRef}\r
      className={\`\${containerRef ? 'absolute' : 'fixed'} top-0 left-0 w-full h-full pointer-events-none z-[10000]\`}\r
    >\r
      <svg className="absolute top-0 left-0 w-full h-full">\r
        <defs>\r
          <filter id="filter-noise-x">\r
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterXRef} />\r
            <feDisplacementMap in="SourceGraphic" scale="40" />\r
          </filter>\r
          <filter id="filter-noise-y">\r
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterYRef} />\r
            <feDisplacementMap in="SourceGraphic" scale="40" />\r
          </filter>\r
        </defs>\r
      </svg>\r
      <div\r
        ref={lineHorizontalRef}\r
        className={\`absolute w-full h-px pointer-events-none opacity-0 transform translate-y-1/2\`}\r
        style={{ background: color }}\r
      ></div>\r
      <div\r
        ref={lineVerticalRef}\r
        className={\`absolute h-full w-px pointer-events-none opacity-0 transform translate-x-1/2\`}\r
        style={{ background: color }}\r
      ></div>\r
    </div>\r
  );\r
};\r
\r
export default Crosshair;\r
`,P={dependencies:"gsap",usage:`import { useRef } from 'react';
import Crosshair from './Crosshair';

const Component = () => {
const containerRef = useRef(null);

return (
  <div ref={containerRef} style={{ height: '300px', overflow: 'hidden' }}>
    <Crosshair containerRef={containerRef} color='#ffffff'/> // containerRef defaults to "window" if not provided
  </div>
)
};`,code:D,tailwind:N,tsCode:O,tsTailwind:B},k="Target",$=()=>{const[i,r]=s.useState(k),[u,l]=s.useState("#ffffff"),[o,m]=s.useState(!0),v=s.useRef(null),c=s.useRef(null),[d,a]=s.useState(0),t=s.useRef(null),p=[{name:"color",type:"string",default:"'white'",description:"Color of the crosshair lines."},{name:"containerRef",type:"RefObject<HTMLElement>",default:"null",description:"Optional container ref to limit crosshair to specific element. If null, crosshair will be active on entire viewport."}];return s.useEffect(()=>{t.current&&d<t.current.getBoundingClientRect().width&&a(t.current.getBoundingClientRect().width)},[i,d]),e.jsxs(H,{children:[e.jsxs(z,{children:[e.jsxs(L,{ref:c,position:"relative",className:"demo-container",minH:300,overflow:"hidden",children:[e.jsx(j,{containerRef:o?null:c,color:u}),e.jsxs(S,{direction:"column",justifyContent:"center",alignItems:"center",children:[e.jsx(R,{_hover:{color:"magenta"},transition:".3s ease",textAlign:"center",fontWeight:900,fontSize:{base:"2rem",md:"4rem"},as:"a",href:"https://github.com/DavidHDev/react-bits",ref:v,onMouseEnter:()=>{r("Locked")},onMouseLeave:()=>{r(k)},style:{minWidth:d},children:i}),e.jsx(R,{position:"relative",top:"-10px",color:"#444",children:"(hover the text)"})]}),e.jsx(R,{ref:t,style:{visibility:"hidden",position:"absolute",whiteSpace:"nowrap",pointerEvents:"none",overflow:"hidden"},"aria-hidden":"true",textAlign:"center",fontWeight:900,fontSize:{base:"2rem",md:"4rem"},children:i})]}),e.jsxs(X,{children:[e.jsxs(S,{gap:4,align:"center",mt:4,mb:4,children:[e.jsx(R,{fontSize:"sm",children:"Crosshair Color"}),e.jsx(V,{type:"color",value:u,onChange:y=>{l(y.target.value)},width:"60px",p:0})]}),e.jsxs(w,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:8,onClick:()=>{m(!o)},children:["Cursor Container"," ",e.jsxs(R,{color:o?"lightgreen":"coral",children:[" ",o?"Viewport":"Targeted"]})]})]}),e.jsx(C,{data:p}),e.jsx(A,{dependencyList:["gsap"]})]}),e.jsx(T,{children:e.jsx(q,{codeObject:P})})]})};export{$ as default};
