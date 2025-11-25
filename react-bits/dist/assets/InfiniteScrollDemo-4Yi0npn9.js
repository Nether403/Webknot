import{r as s,g as o,bU as A,j as e,B as C,bV as $}from"./index-wsKSLPNH.js";import{T as N,P as X,a as z,C as q,b as Y}from"./PropTable-C4uPWs8h.js";import{C as Z}from"./Customize-1m_ZNqR9.js";import{P as F}from"./PreviewSwitch-DqnF708j.js";import{D as B}from"./Dependencies-BHoMfJUj.js";import{P}from"./PreviewSelect-B8u33nUa.js";import{B as W}from"./Ballpit-CXIaXj3t.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";import"./three.module-0PRdiASR.js";o.registerPlugin(A);function U({width:w="30rem",maxHeight:p="100%",negativeMargin:u="-0.5em",items:i=[],itemMinHeight:T=150,isTilted:l=!1,tiltDirection:h="left",autoplay:d=!1,autoplaySpeed:v=.5,autoplayDirection:f="down",pauseOnHover:y=!1}){const x=s.useRef(null),I=s.useRef(null),H=()=>l?h==="left"?"rotateX(20deg) rotateZ(-20deg) skewX(20deg)":"rotateX(20deg) rotateZ(20deg) skewX(-20deg)":"none";return s.useEffect(()=>{const r=I.current;if(!r||i.length===0)return;const c=o.utils.toArray(r.children);if(!c.length)return;const D=c[0],j=getComputedStyle(D),S=D.offsetHeight,E=parseFloat(j.marginTop)||0,O=S+E,R=S*i.length+E*(i.length-1),M=o.utils.wrap(-R,R);c.forEach((n,g)=>{const m=g*O;o.set(n,{y:m})});const k=A.create({target:r,type:"wheel,touch,pointer",preventDefault:!0,onPress:({target:n})=>{n.style.cursor="grabbing"},onRelease:({target:n})=>{n.style.cursor="grab"},onChange:({deltaY:n,isDragging:g,event:m})=>{const a=m.type==="wheel"?-n:n,b=g?a*5:a*10;c.forEach(L=>{o.to(L,{duration:.5,ease:"expo.out",y:`+=${b}`,modifiers:{y:o.utils.unitize(M)}})})}});let t;if(d){const g=v*(f==="down"?1:-1),m=()=>{c.forEach(a=>{o.set(a,{y:`+=${g}`,modifiers:{y:o.utils.unitize(M)}})}),t=requestAnimationFrame(m)};if(t=requestAnimationFrame(m),y){const a=()=>t&&cancelAnimationFrame(t),b=()=>t=requestAnimationFrame(m);return r.addEventListener("mouseenter",a),r.addEventListener("mouseleave",b),()=>{k.kill(),a(),r.removeEventListener("mouseenter",a),r.removeEventListener("mouseleave",b)}}else return()=>{k.kill(),t&&cancelAnimationFrame(t)}}return()=>{k.kill(),t&&cancelAnimationFrame(t)}},[i,d,v,f,y,l,h,u]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .infinite-scroll-wrapper {
          max-height: ${p};
        }

        .infinite-scroll-container {
          width: ${w};
        }

        .infinite-scroll-item {
          height: ${T}px;
          margin-top: ${u};
        }
        `}),e.jsx("div",{className:"infinite-scroll-wrapper",ref:x,children:e.jsx("div",{className:"infinite-scroll-container",ref:I,style:{transform:H()},children:i.map((r,c)=>e.jsx("div",{className:"infinite-scroll-item",children:r.content},c))})})]})}const V=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import { Observer } from 'gsap/Observer';\r
import './InfiniteScroll.css';\r
\r
gsap.registerPlugin(Observer);\r
\r
export default function InfiniteScroll({\r
  width = '30rem',\r
  maxHeight = '100%',\r
  negativeMargin = '-0.5em',\r
  items = [],\r
  itemMinHeight = 150,\r
  isTilted = false,\r
  tiltDirection = 'left',\r
  autoplay = false,\r
  autoplaySpeed = 0.5,\r
  autoplayDirection = 'down',\r
  pauseOnHover = false\r
}) {\r
  const wrapperRef = useRef(null);\r
  const containerRef = useRef(null);\r
\r
  const getTiltTransform = () => {\r
    if (!isTilted) return 'none';\r
    return tiltDirection === 'left'\r
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'\r
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';\r
  };\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    if (items.length === 0) return;\r
\r
    const divItems = gsap.utils.toArray(container.children);\r
    if (!divItems.length) return;\r
\r
    const firstItem = divItems[0];\r
    const itemStyle = getComputedStyle(firstItem);\r
    const itemHeight = firstItem.offsetHeight;\r
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;\r
    const totalItemHeight = itemHeight + itemMarginTop;\r
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);\r
\r
    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);\r
\r
    divItems.forEach((child, i) => {\r
      const y = i * totalItemHeight;\r
      gsap.set(child, { y });\r
    });\r
\r
    const observer = Observer.create({\r
      target: container,\r
      type: 'wheel,touch,pointer',\r
      preventDefault: true,\r
      onPress: ({ target }) => {\r
        target.style.cursor = 'grabbing';\r
      },\r
      onRelease: ({ target }) => {\r
        target.style.cursor = 'grab';\r
      },\r
      onChange: ({ deltaY, isDragging, event }) => {\r
        const d = event.type === 'wheel' ? -deltaY : deltaY;\r
        const distance = isDragging ? d * 5 : d * 10;\r
        divItems.forEach(child => {\r
          gsap.to(child, {\r
            duration: 0.5,\r
            ease: 'expo.out',\r
            y: \`+=\${distance}\`,\r
            modifiers: {\r
              y: gsap.utils.unitize(wrapFn)\r
            }\r
          });\r
        });\r
      }\r
    });\r
\r
    let rafId;\r
    if (autoplay) {\r
      const directionFactor = autoplayDirection === 'down' ? 1 : -1;\r
      const speedPerFrame = autoplaySpeed * directionFactor;\r
\r
      const tick = () => {\r
        divItems.forEach(child => {\r
          gsap.set(child, {\r
            y: \`+=\${speedPerFrame}\`,\r
            modifiers: {\r
              y: gsap.utils.unitize(wrapFn)\r
            }\r
          });\r
        });\r
        rafId = requestAnimationFrame(tick);\r
      };\r
\r
      rafId = requestAnimationFrame(tick);\r
\r
      if (pauseOnHover) {\r
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);\r
        const startTicker = () => (rafId = requestAnimationFrame(tick));\r
\r
        container.addEventListener('mouseenter', stopTicker);\r
        container.addEventListener('mouseleave', startTicker);\r
\r
        return () => {\r
          observer.kill();\r
          stopTicker();\r
          container.removeEventListener('mouseenter', stopTicker);\r
          container.removeEventListener('mouseleave', startTicker);\r
        };\r
      } else {\r
        return () => {\r
          observer.kill();\r
          rafId && cancelAnimationFrame(rafId);\r
        };\r
      }\r
    }\r
\r
    return () => {\r
      observer.kill();\r
      if (rafId) cancelAnimationFrame(rafId);\r
    };\r
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover, isTilted, tiltDirection, negativeMargin]);\r
\r
  return (\r
    <>\r
      <style>\r
        {\`\r
        .infinite-scroll-wrapper {\r
          max-height: \${maxHeight};\r
        }\r
\r
        .infinite-scroll-container {\r
          width: \${width};\r
        }\r
\r
        .infinite-scroll-item {\r
          height: \${itemMinHeight}px;\r
          margin-top: \${negativeMargin};\r
        }\r
        \`}\r
      </style>\r
\r
      <div className="infinite-scroll-wrapper" ref={wrapperRef}>\r
        <div\r
          className="infinite-scroll-container"\r
          ref={containerRef}\r
          style={{\r
            transform: getTiltTransform()\r
          }}\r
        >\r
          {items.map((item, i) => (\r
            <div className="infinite-scroll-item" key={i}>\r
              {item.content}\r
            </div>\r
          ))}\r
        </div>\r
      </div>\r
    </>\r
  );\r
}\r
`,G=`.infinite-scroll-wrapper {\r
  position: relative;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 100%;\r
  overflow: hidden;\r
  overscroll-behavior: none;\r
}\r
\r
.infinite-scroll-wrapper::before,\r
.infinite-scroll-wrapper::after {\r
  content: '';\r
  position: absolute;\r
  background: linear-gradient(var(--dir, to bottom), 060010, transparent);\r
  height: 25%;\r
  width: 100%;\r
  z-index: 1;\r
  pointer-events: none;\r
}\r
\r
.infinite-scroll-wrapper::before {\r
  top: 0;\r
}\r
\r
.infinite-scroll-wrapper::after {\r
  --dir: to top;\r
  bottom: 0;\r
}\r
\r
.infinite-scroll-container {\r
  display: flex;\r
  flex-direction: column;\r
  overscroll-behavior: contain;\r
  padding-inline: 1rem;\r
  cursor: grab;\r
  transform-origin: center center;\r
}\r
\r
.infinite-scroll-item {\r
  --accent-color: #ffffff;\r
  border-radius: 15px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 1rem;\r
  font-size: 1.25rem;\r
  font-weight: 600;\r
  text-align: center;\r
  border: 2px solid var(--accent-color);\r
  user-select: none;\r
  box-sizing: border-box;\r
  position: relative;\r
}\r
`,J=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import { Observer } from 'gsap/Observer';\r
\r
gsap.registerPlugin(Observer);\r
\r
export default function InfiniteScroll({\r
  width = '30rem',\r
  maxHeight = '100%',\r
  negativeMargin = '-0.5em',\r
  items = [],\r
  itemMinHeight = 150,\r
  isTilted = false,\r
  tiltDirection = 'left',\r
  autoplay = false,\r
  autoplaySpeed = 0.5,\r
  autoplayDirection = 'down',\r
  pauseOnHover = false\r
}) {\r
  const wrapperRef = useRef(null);\r
  const containerRef = useRef(null);\r
\r
  const getTiltTransform = () => {\r
    if (!isTilted) return 'none';\r
    return tiltDirection === 'left'\r
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'\r
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';\r
  };\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    if (items.length === 0) return;\r
\r
    const divItems = gsap.utils.toArray(container.children);\r
    if (!divItems.length) return;\r
\r
    const firstItem = divItems[0];\r
    const itemStyle = getComputedStyle(firstItem);\r
    const itemHeight = firstItem.offsetHeight;\r
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;\r
    const totalItemHeight = itemHeight + itemMarginTop;\r
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);\r
\r
    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);\r
\r
    divItems.forEach((child, i) => {\r
      const y = i * totalItemHeight;\r
      gsap.set(child, { y });\r
    });\r
\r
    const observer = Observer.create({\r
      target: container,\r
      type: 'wheel,touch,pointer',\r
      preventDefault: true,\r
      onPress: ({ target }) => {\r
        target.style.cursor = 'grabbing';\r
      },\r
      onRelease: ({ target }) => {\r
        target.style.cursor = 'grab';\r
      },\r
      onChange: ({ deltaY, isDragging, event }) => {\r
        const d = event.type === 'wheel' ? -deltaY : deltaY;\r
        const distance = isDragging ? d * 5 : d * 10;\r
        divItems.forEach(child => {\r
          gsap.to(child, {\r
            duration: 0.5,\r
            ease: 'expo.out',\r
            y: \`+=\${distance}\`,\r
            modifiers: {\r
              y: gsap.utils.unitize(wrapFn)\r
            }\r
          });\r
        });\r
      }\r
    });\r
\r
    let rafId;\r
    if (autoplay) {\r
      const directionFactor = autoplayDirection === 'down' ? 1 : -1;\r
      const speedPerFrame = autoplaySpeed * directionFactor;\r
\r
      const tick = () => {\r
        divItems.forEach(child => {\r
          gsap.set(child, {\r
            y: \`+=\${speedPerFrame}\`,\r
            modifiers: {\r
              y: gsap.utils.unitize(wrapFn)\r
            }\r
          });\r
        });\r
        rafId = requestAnimationFrame(tick);\r
      };\r
\r
      rafId = requestAnimationFrame(tick);\r
\r
      if (pauseOnHover) {\r
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);\r
        const startTicker = () => (rafId = requestAnimationFrame(tick));\r
\r
        container.addEventListener('mouseenter', stopTicker);\r
        container.addEventListener('mouseleave', startTicker);\r
\r
        return () => {\r
          observer.kill();\r
          stopTicker();\r
          container.removeEventListener('mouseenter', stopTicker);\r
          container.removeEventListener('mouseleave', startTicker);\r
        };\r
      } else {\r
        return () => {\r
          observer.kill();\r
          rafId && cancelAnimationFrame(rafId);\r
        };\r
      }\r
    }\r
\r
    return () => {\r
      observer.kill();\r
      if (rafId) cancelAnimationFrame(rafId);\r
    };\r
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover, isTilted, tiltDirection, negativeMargin]);\r
\r
  return (\r
    <div\r
      className="relative flex items-center justify-center w-full overflow-hidden overscroll-none border-t-2 border-b-2 border-t-dotted border-b-dotted border-transparent"\r
      ref={wrapperRef}\r
      style={{ maxHeight }}\r
    >\r
      <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>\r
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>\r
\r
      <div\r
        className="flex flex-col overscroll-contain px-4 cursor-grab origin-center"\r
        ref={containerRef}\r
        style={{\r
          width,\r
          transform: getTiltTransform()\r
        }}\r
      >\r
        {items.map((item, i) => (\r
          <div\r
            className="flex items-center justify-center p-4 text-xl font-semibold text-center border-2 border-white rounded-[15px] select-none box-border relative"\r
            key={i}\r
            style={{\r
              height: \`\${itemMinHeight}px\`,\r
              marginTop: negativeMargin\r
            }}\r
          >\r
            {item.content}\r
          </div>\r
        ))}\r
      </div>\r
    </div>\r
  );\r
}\r
`,K=`import React, { useRef, useEffect, ReactNode } from 'react';\r
import { gsap } from 'gsap';\r
import { Observer } from 'gsap/Observer';\r
import './InfiniteScroll.css';\r
\r
gsap.registerPlugin(Observer);\r
\r
interface InfiniteScrollItem {\r
  content: ReactNode;\r
}\r
\r
interface InfiniteScrollProps {\r
  width?: string;\r
  maxHeight?: string;\r
  negativeMargin?: string;\r
  items?: InfiniteScrollItem[];\r
  itemMinHeight?: number;\r
  isTilted?: boolean;\r
  tiltDirection?: 'left' | 'right';\r
  autoplay?: boolean;\r
  autoplaySpeed?: number;\r
  autoplayDirection?: 'down' | 'up';\r
  pauseOnHover?: boolean;\r
}\r
\r
const InfiniteScroll: React.FC<InfiniteScrollProps> = ({\r
  width = '30rem',\r
  maxHeight = '100%',\r
  negativeMargin = '-0.5em',\r
  items = [],\r
  itemMinHeight = 150,\r
  isTilted = false,\r
  tiltDirection = 'left',\r
  autoplay = false,\r
  autoplaySpeed = 0.5,\r
  autoplayDirection = 'down',\r
  pauseOnHover = false\r
}) => {\r
  const wrapperRef = useRef<HTMLDivElement>(null);\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  const getTiltTransform = (): string => {\r
    if (!isTilted) return 'none';\r
    return tiltDirection === 'left'\r
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'\r
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';\r
  };\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    if (items.length === 0) return;\r
\r
    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);\r
    if (!divItems.length) return;\r
\r
    const firstItem = divItems[0];\r
    const itemStyle = getComputedStyle(firstItem);\r
    const itemHeight = firstItem.offsetHeight;\r
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;\r
    const totalItemHeight = itemHeight + itemMarginTop;\r
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);\r
\r
    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);\r
\r
    divItems.forEach((child, i) => {\r
      const y = i * totalItemHeight;\r
      gsap.set(child, { y });\r
    });\r
\r
    const observer = Observer.create({\r
      target: container,\r
      type: 'wheel,touch,pointer',\r
      preventDefault: true,\r
      onPress: ({ target }) => {\r
        (target as HTMLElement).style.cursor = 'grabbing';\r
      },\r
      onRelease: ({ target }) => {\r
        (target as HTMLElement).style.cursor = 'grab';\r
      },\r
      onChange: ({ deltaY, isDragging, event }) => {\r
        const d = event.type === 'wheel' ? -deltaY : deltaY;\r
        const distance = isDragging ? d * 5 : d * 10;\r
        divItems.forEach(child => {\r
          gsap.to(child, {\r
            duration: 0.5,\r
            ease: 'expo.out',\r
            y: \`+=\${distance}\`,\r
            modifiers: {\r
              y: gsap.utils.unitize(wrapFn)\r
            }\r
          });\r
        });\r
      }\r
    });\r
\r
    let rafId: number;\r
    if (autoplay) {\r
      const directionFactor = autoplayDirection === 'down' ? 1 : -1;\r
      const speedPerFrame = autoplaySpeed * directionFactor;\r
\r
      const tick = () => {\r
        divItems.forEach(child => {\r
          gsap.set(child, {\r
            y: \`+=\${speedPerFrame}\`,\r
            modifiers: {\r
              y: gsap.utils.unitize(wrapFn)\r
            }\r
          });\r
        });\r
        rafId = requestAnimationFrame(tick);\r
      };\r
\r
      rafId = requestAnimationFrame(tick);\r
\r
      if (pauseOnHover) {\r
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);\r
        const startTicker = () => {\r
          rafId = requestAnimationFrame(tick);\r
        };\r
\r
        container.addEventListener('mouseenter', stopTicker);\r
        container.addEventListener('mouseleave', startTicker);\r
\r
        return () => {\r
          observer.kill();\r
          stopTicker();\r
          container.removeEventListener('mouseenter', stopTicker);\r
          container.removeEventListener('mouseleave', startTicker);\r
        };\r
      } else {\r
        return () => {\r
          observer.kill();\r
          rafId && cancelAnimationFrame(rafId);\r
        };\r
      }\r
    }\r
\r
    return () => {\r
      observer.kill();\r
      if (rafId) cancelAnimationFrame(rafId);\r
    };\r
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover, isTilted, tiltDirection, negativeMargin]);\r
\r
  return (\r
    <>\r
      <style>\r
        {\`\r
          .infinite-scroll-wrapper {\r
            max-height: \${maxHeight};\r
          }\r
  \r
          .infinite-scroll-container {\r
            width: \${width};\r
          }\r
  \r
          .infinite-scroll-item {\r
            height: \${itemMinHeight}px;\r
            margin-top: \${negativeMargin};\r
          }\r
        \`}\r
      </style>\r
      <div className="infinite-scroll-wrapper" ref={wrapperRef}>\r
        <div\r
          className="infinite-scroll-container"\r
          ref={containerRef}\r
          style={{\r
            transform: getTiltTransform()\r
          }}\r
        >\r
          {items.map((item, i) => (\r
            <div className="infinite-scroll-item" key={i}>\r
              {item.content}\r
            </div>\r
          ))}\r
        </div>\r
      </div>\r
    </>\r
  );\r
};\r
\r
export default InfiniteScroll;\r
`,Q=`import React, { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import { Observer } from 'gsap/Observer';\r
\r
gsap.registerPlugin(Observer);\r
\r
interface InfiniteScrollItem {\r
  content: React.ReactNode;\r
}\r
\r
interface InfiniteScrollProps {\r
  width?: string;\r
  maxHeight?: string;\r
  negativeMargin?: string;\r
  items?: InfiniteScrollItem[];\r
  itemMinHeight?: number;\r
  isTilted?: boolean;\r
  tiltDirection?: 'left' | 'right';\r
  autoplay?: boolean;\r
  autoplaySpeed?: number;\r
  autoplayDirection?: 'down' | 'up';\r
  pauseOnHover?: boolean;\r
}\r
\r
const InfiniteScroll: React.FC<InfiniteScrollProps> = ({\r
  width = '30rem',\r
  maxHeight = '100%',\r
  negativeMargin = '-0.5em',\r
  items = [],\r
  itemMinHeight = 150,\r
  isTilted = false,\r
  tiltDirection = 'left',\r
  autoplay = false,\r
  autoplaySpeed = 0.5,\r
  autoplayDirection = 'down',\r
  pauseOnHover = false\r
}) => {\r
  const wrapperRef = useRef<HTMLDivElement>(null);\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  const getTiltTransform = (): string => {\r
    if (!isTilted) return 'none';\r
    return tiltDirection === 'left'\r
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'\r
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';\r
  };\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    if (items.length === 0) return;\r
\r
    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);\r
    if (!divItems.length) return;\r
\r
    const firstItem = divItems[0];\r
    const itemStyle = getComputedStyle(firstItem);\r
    const itemHeight = firstItem.offsetHeight;\r
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;\r
    const totalItemHeight = itemHeight + itemMarginTop;\r
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);\r
\r
    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);\r
\r
    divItems.forEach((child, i) => {\r
      const y = i * totalItemHeight;\r
      gsap.set(child, { y });\r
    });\r
\r
    const observer = Observer.create({\r
      target: container,\r
      type: 'wheel,touch,pointer',\r
      preventDefault: true,\r
      onPress: ({ target }) => {\r
        (target as HTMLElement).style.cursor = 'grabbing';\r
      },\r
      onRelease: ({ target }) => {\r
        (target as HTMLElement).style.cursor = 'grab';\r
      },\r
      onChange: ({ deltaY, isDragging, event }) => {\r
        const d = event.type === 'wheel' ? -deltaY : deltaY;\r
        const distance = isDragging ? d * 5 : d * 10;\r
        divItems.forEach(child => {\r
          gsap.to(child, {\r
            duration: 0.5,\r
            ease: 'expo.out',\r
            y: \`+=\${distance}\`,\r
            modifiers: {\r
              y: gsap.utils.unitize(wrapFn)\r
            }\r
          });\r
        });\r
      }\r
    });\r
\r
    let rafId: number;\r
    if (autoplay) {\r
      const directionFactor = autoplayDirection === 'down' ? 1 : -1;\r
      const speedPerFrame = autoplaySpeed * directionFactor;\r
\r
      const tick = () => {\r
        divItems.forEach(child => {\r
          gsap.set(child, {\r
            y: \`+=\${speedPerFrame}\`,\r
            modifiers: {\r
              y: gsap.utils.unitize(wrapFn)\r
            }\r
          });\r
        });\r
        rafId = requestAnimationFrame(tick);\r
      };\r
\r
      rafId = requestAnimationFrame(tick);\r
\r
      if (pauseOnHover) {\r
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);\r
        const startTicker = () => {\r
          rafId = requestAnimationFrame(tick);\r
        };\r
\r
        container.addEventListener('mouseenter', stopTicker);\r
        container.addEventListener('mouseleave', startTicker);\r
\r
        return () => {\r
          observer.kill();\r
          stopTicker();\r
          container.removeEventListener('mouseenter', stopTicker);\r
          container.removeEventListener('mouseleave', startTicker);\r
        };\r
      } else {\r
        return () => {\r
          observer.kill();\r
          rafId && cancelAnimationFrame(rafId);\r
        };\r
      }\r
    }\r
\r
    return () => {\r
      observer.kill();\r
      if (rafId) cancelAnimationFrame(rafId);\r
    };\r
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover, isTilted, tiltDirection, negativeMargin]);\r
\r
  return (\r
    <>\r
      <style>\r
        {\`\r
          .infinite-scroll-wrapper {\r
            max-height: \${maxHeight};\r
          }\r
\r
          .infinite-scroll-container {\r
            width: \${width};\r
          }\r
\r
          .infinite-scroll-item {\r
            height: \${itemMinHeight}px;\r
            margin-top: \${negativeMargin};\r
          }\r
        \`}\r
      </style>\r
\r
      <div className="infinite-scroll-wrapper" ref={wrapperRef}>\r
        <div\r
          className="infinite-scroll-container"\r
          ref={containerRef}\r
          style={{\r
            transform: getTiltTransform()\r
          }}\r
        >\r
          {items.map((item, i) => (\r
            <div className="infinite-scroll-item" key={i}>\r
              {item.content}\r
            </div>\r
          ))}\r
        </div>\r
      </div>\r
    </>\r
  );\r
};\r
\r
export default InfiniteScroll;\r
`,_={dependencies:"gsap",usage:`import InfiniteScroll from './InfiniteScroll';
  
const items = [
  { content: "Text Item 1" },
  { content: <p>Paragraph Item 2</p> },
  { content: "Text Item 3" },
  { content: <p>Paragraph Item 4</p> },
  { content: "Text Item 5" },
  { content: <p>Paragraph Item 6</p> },
  { content: "Text Item 7" },
  { content: <p>Paragraph Item 8</p> },
  { content: "Text Item 9" },
  { content: <p>Paragraph Item 10</p> },
  { content: "Text Item 11" },
  { content: <p>Paragraph Item 12</p> },
  { content: "Text Item 13" },
  { content: <p>Paragraph Item 14</p> },
];
  
<div style={{height: '500px', position: 'relative'}}>
  <InfiniteScroll
    items={items}
    isTilted={true}
    tiltDirection='left'
    autoplay={true}
    autoplaySpeed={0.1}
    autoplayDirection="down"
    pauseOnHover={true}
  />
</div>`,code:V,css:G,tailwind:J,tsCode:K,tsTailwind:Q},me=()=>{const w=[{name:"width",type:"string",default:'"30rem"',description:"Width of the outer wrapper."},{name:"maxHeight",type:"string",default:'"100%"',description:"Maximum height of the outer wrapper."},{name:"items",type:"array",default:"[]",description:"Array of items with custom content. Each item should have a 'content' property containing a string or React node."},{name:"itemMinHeight",type:"number",default:"150",description:"Fixed height for each item in pixels."},{name:"isTilted",type:"boolean",default:"false",description:"Whether the container has a skewed perspective."},{name:"tiltDirection",type:'"left" | "right"',default:'"left"',description:"Direction of the tilt if 'isTilted' is true."},{name:"autoplay",type:"boolean",default:"false",description:"Whether the scroll should autoplay."},{name:"autoplaySpeed",type:"number",default:"20",description:"Speed of autoplay in pixels/frame."},{name:"autoplayDirection",type:'"up" | "down"',default:'"down"',description:"Direction of autoplay scrolling."},{name:"pauseOnHover",type:"boolean",default:"false",description:"Pause autoplay when hovering over the component."},{name:"negativeMargin",type:"string",default:'"-0.5em"',description:"Negative margin to reduce spacing between items."}],[p,u]=s.useState(!0),[i,T]=s.useState("left"),[l,h]=s.useState(!0),[d,v]=s.useState("up"),[f,y]=s.useState(!0),x=[{content:e.jsxs("div",{style:{width:"100%",height:"100%",borderRadius:"5px",border:"1px solid #fff",overflow:"hidden",position:"realtive"},children:[e.jsx("p",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:-1,fontSize:"3rem",fontWeight:900,color:"#271E37"},children:"Balls!"}),e.jsx(W,{count:50,followCursor:!1})]})},{content:e.jsx("p",{children:"Paragraph Item 2"})},{content:"Text Item 3"},{content:e.jsx("p",{children:"Paragraph Item 4"})},{content:"Text Item 5"},{content:e.jsx("p",{children:"Paragraph Item 6"})},{content:"Text Item 7"},{content:e.jsx("p",{children:"Paragraph Item 8"})},{content:"Text Item 9"},{content:e.jsx("p",{children:"Paragraph Item 10"})},{content:"Text Item 11"},{content:e.jsx("p",{children:"Paragraph Item 12"})},{content:"Text Item 13"},{content:e.jsx("p",{children:"Paragraph Item 14"})}],I=[{value:"up",label:"Up"},{value:"down",label:"Down"}],H=[{value:"left",label:"Left"},{value:"right",label:"Right"}];return e.jsxs(N,{children:[e.jsxs(X,{children:[e.jsx(C,{position:"relative",className:"demo-container",h:500,p:0,overflow:"hidden",display:"flex",bg:"#060010",justifyContent:"center",alignItems:"center",children:e.jsx(U,{items:x,isTilted:p,tiltDirection:i,autoplay:l,autoplaySpeed:1,autoplayDirection:d,pauseOnHover:f})}),e.jsxs(Z,{children:[e.jsx(F,{isChecked:p,title:"Tilt",onChange:()=>u(!p)}),p&&e.jsx(P,{title:"Tilt Direction",options:H,value:i,name:"tiltDirection",width:150,onChange:r=>{T(r)}}),e.jsx($,{my:4,borderColor:"#271E37"}),e.jsx(F,{isChecked:l,title:"Autoplay",onChange:()=>h(!l)}),l&&e.jsxs(e.Fragment,{children:[e.jsx(P,{title:"Autoplay Direction",options:I,value:d,name:"autoplayDirection",width:150,onChange:r=>{v(r)}}),e.jsx(F,{title:"Pause on Hover",isChecked:f,onChange:r=>y(r)})]})]}),e.jsx(z,{data:w}),e.jsx(B,{dependencyList:["gsap"]})]}),e.jsx(q,{children:e.jsx(Y,{codeObject:_})})]})};export{me as default};
