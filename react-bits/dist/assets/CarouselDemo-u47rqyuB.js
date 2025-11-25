import{j as n,r as s,bh as j,q as R,by as A,bX as M,bY as _,bZ as W,b_ as $,ao as G,B as U}from"./index-wsKSLPNH.js";import{T as Y,P as B,a as V,C as z,b as X}from"./PropTable-C4uPWs8h.js";import{C as J}from"./Customize-1m_ZNqR9.js";import{P as b}from"./PreviewSwitch-DqnF708j.js";import{D as q}from"./Dependencies-BHoMfJUj.js";import{u as Z}from"./useForceRerender-BCFU-k0M.js";import{P as L}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";const K=[{title:"Text Animations",description:"Cool text animations for your projects.",id:1,icon:n.jsx(M,{className:"carousel-icon"})},{title:"Animations",description:"Smooth animations for your projects.",id:2,icon:n.jsx(_,{className:"carousel-icon"})},{title:"Components",description:"Reusable components for your projects.",id:3,icon:n.jsx(W,{className:"carousel-icon"})},{title:"Backgrounds",description:"Beautiful backgrounds and patterns for your projects.",id:4,icon:n.jsx($,{className:"carousel-icon"})},{title:"Common UI",description:"Common UI components are coming soon!",id:5,icon:n.jsx(G,{className:"carousel-icon"})}],w=0,F=500,k=16,Q={type:"spring",stiffness:300,damping:30};function nn({items:t=K,baseWidth:v=300,autoplay:f=!1,autoplayDelay:I=3e3,pauseOnHover:x=!1,loop:i=!1,round:a=!1}){const m=v-32,p=m+k,d=i?[...t,t[0]]:t,[c,u]=s.useState(0),l=j(0),[y,r]=s.useState(!1),[H,O]=s.useState(!1),C=s.useRef(null);s.useEffect(()=>{if(x&&C.current){const o=C.current,e=()=>r(!0),h=()=>r(!1);return o.addEventListener("mouseenter",e),o.addEventListener("mouseleave",h),()=>{o.removeEventListener("mouseenter",e),o.removeEventListener("mouseleave",h)}}},[x]),s.useEffect(()=>{if(f&&(!x||!y)){const o=setInterval(()=>{u(e=>e===t.length-1&&i?e+1:e===d.length-1?i?0:e:e+1)},I);return()=>clearInterval(o)}},[f,I,y,i,t.length,d.length,x]);const N=H?{duration:0}:Q,D=()=>{i&&c===d.length-1&&(O(!0),l.set(0),u(0),setTimeout(()=>O(!1),50))},S=(o,e)=>{const h=e.offset.x,E=e.velocity.x;h<-w||E<-F?i&&c===t.length-1?u(c+1):u(g=>Math.min(g+1,d.length-1)):(h>w||E>F)&&u(i&&c===0?t.length-1:g=>Math.max(g-1,0))},P=i?{}:{dragConstraints:{left:-p*(d.length-1),right:0}};return n.jsxs("div",{ref:C,className:`carousel-container ${a?"round":""}`,style:{width:`${v}px`,...a&&{height:`${v}px`,borderRadius:"50%"}},children:[n.jsx(R.div,{className:"carousel-track",drag:"x",...P,style:{width:m,gap:`${k}px`,perspective:1e3,perspectiveOrigin:`${c*p+m/2}px 50%`,x:l},onDragEnd:S,animate:{x:-(c*p)},transition:N,onAnimationComplete:D,children:d.map((o,e)=>{const h=[-(e+1)*p,-e*p,-(e-1)*p],g=A(l,h,[90,0,-90],{clamp:!1});return n.jsxs(R.div,{className:`carousel-item ${a?"round":""}`,style:{width:m,height:a?m:"100%",rotateY:g,...a&&{borderRadius:"50%"}},transition:N,children:[n.jsx("div",{className:`carousel-item-header ${a?"round":""}`,children:n.jsx("span",{className:"carousel-icon-container",children:o.icon})}),n.jsxs("div",{className:"carousel-item-content",children:[n.jsx("div",{className:"carousel-item-title",children:o.title}),n.jsx("p",{className:"carousel-item-description",children:o.description})]})]},e)})}),n.jsx("div",{className:`carousel-indicators-container ${a?"round":""}`,children:n.jsx("div",{className:"carousel-indicators",children:t.map((o,e)=>n.jsx(R.div,{className:`carousel-indicator ${c%t.length===e?"active":"inactive"}`,animate:{scale:c%t.length===e?1.2:1},onClick:()=>u(e),transition:{duration:.15}},e))})})]})}const en=`import { useEffect, useState, useRef } from 'react';\r
import { motion, useMotionValue, useTransform } from 'motion/react';\r
// replace icons with your own if needed\r
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';\r
\r
import './Carousel.css';\r
\r
const DEFAULT_ITEMS = [\r
  {\r
    title: 'Text Animations',\r
    description: 'Cool text animations for your projects.',\r
    id: 1,\r
    icon: <FiFileText className="carousel-icon" />\r
  },\r
  {\r
    title: 'Animations',\r
    description: 'Smooth animations for your projects.',\r
    id: 2,\r
    icon: <FiCircle className="carousel-icon" />\r
  },\r
  {\r
    title: 'Components',\r
    description: 'Reusable components for your projects.',\r
    id: 3,\r
    icon: <FiLayers className="carousel-icon" />\r
  },\r
  {\r
    title: 'Backgrounds',\r
    description: 'Beautiful backgrounds and patterns for your projects.',\r
    id: 4,\r
    icon: <FiLayout className="carousel-icon" />\r
  },\r
  {\r
    title: 'Common UI',\r
    description: 'Common UI components are coming soon!',\r
    id: 5,\r
    icon: <FiCode className="carousel-icon" />\r
  }\r
];\r
\r
const DRAG_BUFFER = 0;\r
const VELOCITY_THRESHOLD = 500;\r
const GAP = 16;\r
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };\r
\r
export default function Carousel({\r
  items = DEFAULT_ITEMS,\r
  baseWidth = 300,\r
  autoplay = false,\r
  autoplayDelay = 3000,\r
  pauseOnHover = false,\r
  loop = false,\r
  round = false\r
}) {\r
  const containerPadding = 16;\r
  const itemWidth = baseWidth - containerPadding * 2;\r
  const trackItemOffset = itemWidth + GAP;\r
\r
  const carouselItems = loop ? [...items, items[0]] : items;\r
  const [currentIndex, setCurrentIndex] = useState(0);\r
  const x = useMotionValue(0);\r
  const [isHovered, setIsHovered] = useState(false);\r
  const [isResetting, setIsResetting] = useState(false);\r
\r
  const containerRef = useRef(null);\r
  useEffect(() => {\r
    if (pauseOnHover && containerRef.current) {\r
      const container = containerRef.current;\r
      const handleMouseEnter = () => setIsHovered(true);\r
      const handleMouseLeave = () => setIsHovered(false);\r
      container.addEventListener('mouseenter', handleMouseEnter);\r
      container.addEventListener('mouseleave', handleMouseLeave);\r
      return () => {\r
        container.removeEventListener('mouseenter', handleMouseEnter);\r
        container.removeEventListener('mouseleave', handleMouseLeave);\r
      };\r
    }\r
  }, [pauseOnHover]);\r
\r
  useEffect(() => {\r
    if (autoplay && (!pauseOnHover || !isHovered)) {\r
      const timer = setInterval(() => {\r
        setCurrentIndex(prev => {\r
          if (prev === items.length - 1 && loop) {\r
            return prev + 1;\r
          }\r
          if (prev === carouselItems.length - 1) {\r
            return loop ? 0 : prev;\r
          }\r
          return prev + 1;\r
        });\r
      }, autoplayDelay);\r
      return () => clearInterval(timer);\r
    }\r
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);\r
\r
  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;\r
\r
  const handleAnimationComplete = () => {\r
    if (loop && currentIndex === carouselItems.length - 1) {\r
      setIsResetting(true);\r
      x.set(0);\r
      setCurrentIndex(0);\r
      setTimeout(() => setIsResetting(false), 50);\r
    }\r
  };\r
\r
  const handleDragEnd = (_, info) => {\r
    const offset = info.offset.x;\r
    const velocity = info.velocity.x;\r
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {\r
      if (loop && currentIndex === items.length - 1) {\r
        setCurrentIndex(currentIndex + 1);\r
      } else {\r
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));\r
      }\r
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {\r
      if (loop && currentIndex === 0) {\r
        setCurrentIndex(items.length - 1);\r
      } else {\r
        setCurrentIndex(prev => Math.max(prev - 1, 0));\r
      }\r
    }\r
  };\r
\r
  const dragProps = loop\r
    ? {}\r
    : {\r
        dragConstraints: {\r
          left: -trackItemOffset * (carouselItems.length - 1),\r
          right: 0\r
        }\r
      };\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`carousel-container \${round ? 'round' : ''}\`}\r
      style={{\r
        width: \`\${baseWidth}px\`,\r
        ...(round && { height: \`\${baseWidth}px\`, borderRadius: '50%' })\r
      }}\r
    >\r
      <motion.div\r
        className="carousel-track"\r
        drag="x"\r
        {...dragProps}\r
        style={{\r
          width: itemWidth,\r
          gap: \`\${GAP}px\`,\r
          perspective: 1000,\r
          perspectiveOrigin: \`\${currentIndex * trackItemOffset + itemWidth / 2}px 50%\`,\r
          x\r
        }}\r
        onDragEnd={handleDragEnd}\r
        animate={{ x: -(currentIndex * trackItemOffset) }}\r
        transition={effectiveTransition}\r
        onAnimationComplete={handleAnimationComplete}\r
      >\r
        {carouselItems.map((item, index) => {\r
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];\r
          const outputRange = [90, 0, -90];\r
          // eslint-disable-next-line react-hooks/rules-of-hooks\r
          const rotateY = useTransform(x, range, outputRange, { clamp: false });\r
          return (\r
            <motion.div\r
              key={index}\r
              className={\`carousel-item \${round ? 'round' : ''}\`}\r
              style={{\r
                width: itemWidth,\r
                height: round ? itemWidth : '100%',\r
                rotateY: rotateY,\r
                ...(round && { borderRadius: '50%' })\r
              }}\r
              transition={effectiveTransition}\r
            >\r
              <div className={\`carousel-item-header \${round ? 'round' : ''}\`}>\r
                <span className="carousel-icon-container">{item.icon}</span>\r
              </div>\r
              <div className="carousel-item-content">\r
                <div className="carousel-item-title">{item.title}</div>\r
                <p className="carousel-item-description">{item.description}</p>\r
              </div>\r
            </motion.div>\r
          );\r
        })}\r
      </motion.div>\r
      <div className={\`carousel-indicators-container \${round ? 'round' : ''}\`}>\r
        <div className="carousel-indicators">\r
          {items.map((_, index) => (\r
            <motion.div\r
              key={index}\r
              className={\`carousel-indicator \${currentIndex % items.length === index ? 'active' : 'inactive'}\`}\r
              animate={{\r
                scale: currentIndex % items.length === index ? 1.2 : 1\r
              }}\r
              onClick={() => setCurrentIndex(index)}\r
              transition={{ duration: 0.15 }}\r
            />\r
          ))}\r
        </div>\r
      </div>\r
    </div>\r
  );\r
}\r
`,rn=`.carousel-container {\r
  position: relative;\r
  overflow: hidden;\r
  border: 1px solid #555;\r
  border-radius: 24px;\r
  padding: 16px;\r
  --outer-r: 24px;\r
  --p-distance: 12px;\r
}\r
\r
.carousel-track {\r
  display: flex;\r
}\r
\r
.carousel-item {\r
  position: relative;\r
  display: flex;\r
  flex-shrink: 0;\r
  flex-direction: column;\r
  align-items: flex-start;\r
  justify-content: space-between;\r
  border: 1px solid #555;\r
  border-radius: calc(var(--outer-r) - var(--p-distance));\r
  background-color: #0d0716;\r
  overflow: hidden;\r
  cursor: grab;\r
}\r
\r
.carousel-item:active {\r
  cursor: grabbing;\r
}\r
\r
.carousel-container.round {\r
  border: 1px solid #555;\r
}\r
\r
.carousel-item.round {\r
  background-color: #0d0716;\r
  position: relative;\r
  bottom: 0.1em;\r
  border: 1px solid #555;\r
  justify-content: center;\r
  align-items: center;\r
  text-align: center;\r
}\r
\r
.carousel-item-header.round {\r
  padding: 0;\r
  margin: 0;\r
}\r
\r
.carousel-indicators-container.round {\r
  position: absolute;\r
  z-index: 2;\r
  bottom: 3em;\r
  left: 50%;\r
  transform: translateX(-50%);\r
}\r
\r
.carousel-indicator.active {\r
  background-color: #333333;\r
}\r
\r
.carousel-indicator.inactive {\r
  background-color: rgba(51, 51, 51, 0.4);\r
}\r
\r
.carousel-item-header {\r
  margin-bottom: 16px;\r
  padding: 20px;\r
  padding-top: 20px;\r
}\r
\r
.carousel-icon-container {\r
  display: flex;\r
  height: 28px;\r
  width: 28px;\r
  align-items: center;\r
  justify-content: center;\r
  border-radius: 50%;\r
  background-color: #fff;\r
}\r
\r
.carousel-icon {\r
  height: 16px;\r
  width: 16px;\r
  color: #060010;\r
}\r
\r
.carousel-item-content {\r
  padding: 20px;\r
  padding-bottom: 20px;\r
}\r
\r
.carousel-item-title {\r
  margin-bottom: 4px;\r
  font-weight: 900;\r
  font-size: 18px;\r
  color: #fff;\r
}\r
\r
.carousel-item-description {\r
  font-size: 14px;\r
  color: #fff;\r
}\r
\r
.carousel-indicators-container {\r
  display: flex;\r
  width: 100%;\r
  justify-content: center;\r
}\r
\r
.carousel-indicators {\r
  margin-top: 16px;\r
  display: flex;\r
  width: 150px;\r
  justify-content: space-between;\r
  padding: 0 32px;\r
}\r
\r
.carousel-indicator {\r
  height: 8px;\r
  width: 8px;\r
  border-radius: 50%;\r
  cursor: pointer;\r
  transition: background-color 150ms;\r
}\r
\r
.carousel-indicator.active {\r
  background-color: #fff;\r
}\r
\r
.carousel-indicator.inactive {\r
  background-color: #555;\r
}\r
`,tn=`import { useEffect, useState, useRef } from 'react';\r
import { motion, useMotionValue, useTransform } from 'motion/react';\r
// replace icons with your own if needed\r
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';\r
\r
const DEFAULT_ITEMS = [\r
  {\r
    title: 'Text Animations',\r
    description: 'Cool text animations for your projects.',\r
    id: 1,\r
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />\r
  },\r
  {\r
    title: 'Animations',\r
    description: 'Smooth animations for your projects.',\r
    id: 2,\r
    icon: <FiCircle className="h-[16px] w-[16px] text-white" />\r
  },\r
  {\r
    title: 'Components',\r
    description: 'Reusable components for your projects.',\r
    id: 3,\r
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />\r
  },\r
  {\r
    title: 'Backgrounds',\r
    description: 'Beautiful backgrounds and patterns for your projects.',\r
    id: 4,\r
    icon: <FiLayout className="h-[16px] w-[16px] text-white" />\r
  },\r
  {\r
    title: 'Common UI',\r
    description: 'Common UI components are coming soon!',\r
    id: 5,\r
    icon: <FiCode className="h-[16px] w-[16px] text-white" />\r
  }\r
];\r
\r
const DRAG_BUFFER = 0;\r
const VELOCITY_THRESHOLD = 500;\r
const GAP = 16;\r
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };\r
\r
export default function Carousel({\r
  items = DEFAULT_ITEMS,\r
  baseWidth = 300,\r
  autoplay = false,\r
  autoplayDelay = 3000,\r
  pauseOnHover = false,\r
  loop = false,\r
  round = false\r
}) {\r
  const containerPadding = 16;\r
  const itemWidth = baseWidth - containerPadding * 2;\r
  const trackItemOffset = itemWidth + GAP;\r
\r
  const carouselItems = loop ? [...items, items[0]] : items;\r
  const [currentIndex, setCurrentIndex] = useState(0);\r
  const x = useMotionValue(0);\r
  const [isHovered, setIsHovered] = useState(false);\r
  const [isResetting, setIsResetting] = useState(false);\r
\r
  const containerRef = useRef(null);\r
  useEffect(() => {\r
    if (pauseOnHover && containerRef.current) {\r
      const container = containerRef.current;\r
      const handleMouseEnter = () => setIsHovered(true);\r
      const handleMouseLeave = () => setIsHovered(false);\r
      container.addEventListener('mouseenter', handleMouseEnter);\r
      container.addEventListener('mouseleave', handleMouseLeave);\r
      return () => {\r
        container.removeEventListener('mouseenter', handleMouseEnter);\r
        container.removeEventListener('mouseleave', handleMouseLeave);\r
      };\r
    }\r
  }, [pauseOnHover]);\r
\r
  useEffect(() => {\r
    if (autoplay && (!pauseOnHover || !isHovered)) {\r
      const timer = setInterval(() => {\r
        setCurrentIndex(prev => {\r
          if (prev === items.length - 1 && loop) {\r
            return prev + 1;\r
          }\r
          if (prev === carouselItems.length - 1) {\r
            return loop ? 0 : prev;\r
          }\r
          return prev + 1;\r
        });\r
      }, autoplayDelay);\r
      return () => clearInterval(timer);\r
    }\r
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);\r
\r
  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;\r
\r
  const handleAnimationComplete = () => {\r
    if (loop && currentIndex === carouselItems.length - 1) {\r
      setIsResetting(true);\r
      x.set(0);\r
      setCurrentIndex(0);\r
      setTimeout(() => setIsResetting(false), 50);\r
    }\r
  };\r
\r
  const handleDragEnd = (_, info) => {\r
    const offset = info.offset.x;\r
    const velocity = info.velocity.x;\r
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {\r
      if (loop && currentIndex === items.length - 1) {\r
        setCurrentIndex(currentIndex + 1);\r
      } else {\r
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));\r
      }\r
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {\r
      if (loop && currentIndex === 0) {\r
        setCurrentIndex(items.length - 1);\r
      } else {\r
        setCurrentIndex(prev => Math.max(prev - 1, 0));\r
      }\r
    }\r
  };\r
\r
  const dragProps = loop\r
    ? {}\r
    : {\r
        dragConstraints: {\r
          left: -trackItemOffset * (carouselItems.length - 1),\r
          right: 0\r
        }\r
      };\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`relative overflow-hidden p-4 \${\r
        round ? 'rounded-full border border-white' : 'rounded-[24px] border border-[#222]'\r
      }\`}\r
      style={{\r
        width: \`\${baseWidth}px\`,\r
        ...(round && { height: \`\${baseWidth}px\` })\r
      }}\r
    >\r
      <motion.div\r
        className="flex"\r
        drag="x"\r
        {...dragProps}\r
        style={{\r
          width: itemWidth,\r
          gap: \`\${GAP}px\`,\r
          perspective: 1000,\r
          perspectiveOrigin: \`\${currentIndex * trackItemOffset + itemWidth / 2}px 50%\`,\r
          x\r
        }}\r
        onDragEnd={handleDragEnd}\r
        animate={{ x: -(currentIndex * trackItemOffset) }}\r
        transition={effectiveTransition}\r
        onAnimationComplete={handleAnimationComplete}\r
      >\r
        {carouselItems.map((item, index) => {\r
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];\r
          const outputRange = [90, 0, -90];\r
          // eslint-disable-next-line react-hooks/rules-of-hooks\r
          const rotateY = useTransform(x, range, outputRange, { clamp: false });\r
          return (\r
            <motion.div\r
              key={index}\r
              className={\`relative shrink-0 flex flex-col \${\r
                round\r
                  ? 'items-center justify-center text-center bg-[#060010] border-0'\r
                  : 'items-start justify-between bg-[#222] border border-[#222] rounded-[12px]'\r
              } overflow-hidden cursor-grab active:cursor-grabbing\`}\r
              style={{\r
                width: itemWidth,\r
                height: round ? itemWidth : '100%',\r
                rotateY: rotateY,\r
                ...(round && { borderRadius: '50%' })\r
              }}\r
              transition={effectiveTransition}\r
            >\r
              <div className={\`\${round ? 'p-0 m-0' : 'mb-4 p-5'}\`}>\r
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#060010]">\r
                  {item.icon}\r
                </span>\r
              </div>\r
              <div className="p-5">\r
                <div className="mb-1 font-black text-lg text-white">{item.title}</div>\r
                <p className="text-sm text-white">{item.description}</p>\r
              </div>\r
            </motion.div>\r
          );\r
        })}\r
      </motion.div>\r
      <div className={\`flex w-full justify-center \${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}\`}>\r
        <div className="mt-4 flex w-[150px] justify-between px-8">\r
          {items.map((_, index) => (\r
            <motion.div\r
              key={index}\r
              className={\`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 \${\r
                currentIndex % items.length === index\r
                  ? round\r
                    ? 'bg-white'\r
                    : 'bg-[#333333]'\r
                  : round\r
                    ? 'bg-[#555]'\r
                    : 'bg-[rgba(51,51,51,0.4)]'\r
              }\`}\r
              animate={{\r
                scale: currentIndex % items.length === index ? 1.2 : 1\r
              }}\r
              onClick={() => setCurrentIndex(index)}\r
              transition={{ duration: 0.15 }}\r
            />\r
          ))}\r
        </div>\r
      </div>\r
    </div>\r
  );\r
}\r
`,on=`import { useEffect, useState, useRef } from 'react';\r
import { motion, PanInfo, useMotionValue, useTransform } from 'motion/react';\r
// replace icons with your own if needed\r
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';\r
import './Carousel.css';\r
\r
export interface CarouselItem {\r
  title: string;\r
  description: string;\r
  id: number;\r
  icon: React.ReactElement;\r
}\r
\r
export interface CarouselProps {\r
  items?: CarouselItem[];\r
  baseWidth?: number;\r
  autoplay?: boolean;\r
  autoplayDelay?: number;\r
  pauseOnHover?: boolean;\r
  loop?: boolean;\r
  round?: boolean;\r
}\r
\r
const DEFAULT_ITEMS: CarouselItem[] = [\r
  {\r
    title: 'Text Animations',\r
    description: 'Cool text animations for your projects.',\r
    id: 1,\r
    icon: <FiFileText className="carousel-icon" />\r
  },\r
  {\r
    title: 'Animations',\r
    description: 'Smooth animations for your projects.',\r
    id: 2,\r
    icon: <FiCircle className="carousel-icon" />\r
  },\r
  {\r
    title: 'Components',\r
    description: 'Reusable components for your projects.',\r
    id: 3,\r
    icon: <FiLayers className="carousel-icon" />\r
  },\r
  {\r
    title: 'Backgrounds',\r
    description: 'Beautiful backgrounds and patterns for your projects.',\r
    id: 4,\r
    icon: <FiLayout className="carousel-icon" />\r
  },\r
  {\r
    title: 'Common UI',\r
    description: 'Common UI components are coming soon!',\r
    id: 5,\r
    icon: <FiCode className="carousel-icon" />\r
  }\r
];\r
\r
const DRAG_BUFFER = 0;\r
const VELOCITY_THRESHOLD = 500;\r
const GAP = 16;\r
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };\r
\r
export default function Carousel({\r
  items = DEFAULT_ITEMS,\r
  baseWidth = 300,\r
  autoplay = false,\r
  autoplayDelay = 3000,\r
  pauseOnHover = false,\r
  loop = false,\r
  round = false\r
}: CarouselProps): React.JSX.Element {\r
  const containerPadding = 16;\r
  const itemWidth = baseWidth - containerPadding * 2;\r
  const trackItemOffset = itemWidth + GAP;\r
\r
  const carouselItems = loop ? [...items, items[0]] : items;\r
  const [currentIndex, setCurrentIndex] = useState<number>(0);\r
  const x = useMotionValue(0);\r
  const [isHovered, setIsHovered] = useState<boolean>(false);\r
  const [isResetting, setIsResetting] = useState<boolean>(false);\r
\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  useEffect(() => {\r
    if (pauseOnHover && containerRef.current) {\r
      const container = containerRef.current;\r
      const handleMouseEnter = () => setIsHovered(true);\r
      const handleMouseLeave = () => setIsHovered(false);\r
      container.addEventListener('mouseenter', handleMouseEnter);\r
      container.addEventListener('mouseleave', handleMouseLeave);\r
      return () => {\r
        container.removeEventListener('mouseenter', handleMouseEnter);\r
        container.removeEventListener('mouseleave', handleMouseLeave);\r
      };\r
    }\r
  }, [pauseOnHover]);\r
\r
  useEffect(() => {\r
    if (autoplay && (!pauseOnHover || !isHovered)) {\r
      const timer = setInterval(() => {\r
        setCurrentIndex(prev => {\r
          if (prev === items.length - 1 && loop) {\r
            return prev + 1;\r
          }\r
          if (prev === carouselItems.length - 1) {\r
            return loop ? 0 : prev;\r
          }\r
          return prev + 1;\r
        });\r
      }, autoplayDelay);\r
      return () => clearInterval(timer);\r
    }\r
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);\r
\r
  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;\r
\r
  const handleAnimationComplete = () => {\r
    if (loop && currentIndex === carouselItems.length - 1) {\r
      setIsResetting(true);\r
      x.set(0);\r
      setCurrentIndex(0);\r
      setTimeout(() => setIsResetting(false), 50);\r
    }\r
  };\r
\r
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {\r
    const offset = info.offset.x;\r
    const velocity = info.velocity.x;\r
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {\r
      if (loop && currentIndex === items.length - 1) {\r
        setCurrentIndex(currentIndex + 1);\r
      } else {\r
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));\r
      }\r
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {\r
      if (loop && currentIndex === 0) {\r
        setCurrentIndex(items.length - 1);\r
      } else {\r
        setCurrentIndex(prev => Math.max(prev - 1, 0));\r
      }\r
    }\r
  };\r
\r
  const dragProps = loop\r
    ? {}\r
    : {\r
        dragConstraints: {\r
          left: -trackItemOffset * (carouselItems.length - 1),\r
          right: 0\r
        }\r
      };\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`carousel-container \${round ? 'round' : ''}\`}\r
      style={{\r
        width: \`\${baseWidth}px\`,\r
        ...(round && { height: \`\${baseWidth}px\`, borderRadius: '50%' })\r
      }}\r
    >\r
      <motion.div\r
        className="carousel-track"\r
        drag="x"\r
        {...dragProps}\r
        style={{\r
          width: itemWidth,\r
          gap: \`\${GAP}px\`,\r
          perspective: 1000,\r
          perspectiveOrigin: \`\${currentIndex * trackItemOffset + itemWidth / 2}px 50%\`,\r
          x\r
        }}\r
        onDragEnd={handleDragEnd}\r
        animate={{ x: -(currentIndex * trackItemOffset) }}\r
        transition={effectiveTransition}\r
        onAnimationComplete={handleAnimationComplete}\r
      >\r
        {carouselItems.map((item, index) => {\r
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];\r
          const outputRange = [90, 0, -90];\r
          const rotateY = useTransform(x, range, outputRange, { clamp: false });\r
          return (\r
            <motion.div\r
              key={index}\r
              className={\`carousel-item \${round ? 'round' : ''}\`}\r
              style={{\r
                width: itemWidth,\r
                height: round ? itemWidth : '100%',\r
                rotateY: rotateY,\r
                ...(round && { borderRadius: '50%' })\r
              }}\r
              transition={effectiveTransition}\r
            >\r
              <div className={\`carousel-item-header \${round ? 'round' : ''}\`}>\r
                <span className="carousel-icon-container">{item.icon}</span>\r
              </div>\r
              <div className="carousel-item-content">\r
                <div className="carousel-item-title">{item.title}</div>\r
                <p className="carousel-item-description">{item.description}</p>\r
              </div>\r
            </motion.div>\r
          );\r
        })}\r
      </motion.div>\r
      <div className={\`carousel-indicators-container \${round ? 'round' : ''}\`}>\r
        <div className="carousel-indicators">\r
          {items.map((_, index) => (\r
            <motion.div\r
              key={index}\r
              className={\`carousel-indicator \${currentIndex % items.length === index ? 'active' : 'inactive'}\`}\r
              animate={{\r
                scale: currentIndex % items.length === index ? 1.2 : 1\r
              }}\r
              onClick={() => setCurrentIndex(index)}\r
              transition={{ duration: 0.15 }}\r
            />\r
          ))}\r
        </div>\r
      </div>\r
    </div>\r
  );\r
}\r
`,sn=`import { useEffect, useState, useRef } from 'react';\r
import { motion, PanInfo, useMotionValue, useTransform } from 'motion/react';\r
import React, { JSX } from 'react';\r
\r
// replace icons with your own if needed\r
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';\r
export interface CarouselItem {\r
  title: string;\r
  description: string;\r
  id: number;\r
  icon: React.ReactNode;\r
}\r
\r
export interface CarouselProps {\r
  items?: CarouselItem[];\r
  baseWidth?: number;\r
  autoplay?: boolean;\r
  autoplayDelay?: number;\r
  pauseOnHover?: boolean;\r
  loop?: boolean;\r
  round?: boolean;\r
}\r
\r
const DEFAULT_ITEMS: CarouselItem[] = [\r
  {\r
    title: 'Text Animations',\r
    description: 'Cool text animations for your projects.',\r
    id: 1,\r
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />\r
  },\r
  {\r
    title: 'Animations',\r
    description: 'Smooth animations for your projects.',\r
    id: 2,\r
    icon: <FiCircle className="h-[16px] w-[16px] text-white" />\r
  },\r
  {\r
    title: 'Components',\r
    description: 'Reusable components for your projects.',\r
    id: 3,\r
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />\r
  },\r
  {\r
    title: 'Backgrounds',\r
    description: 'Beautiful backgrounds and patterns for your projects.',\r
    id: 4,\r
    icon: <FiLayout className="h-[16px] w-[16px] text-white" />\r
  },\r
  {\r
    title: 'Common UI',\r
    description: 'Common UI components are coming soon!',\r
    id: 5,\r
    icon: <FiCode className="h-[16px] w-[16px] text-white" />\r
  }\r
];\r
\r
const DRAG_BUFFER = 0;\r
const VELOCITY_THRESHOLD = 500;\r
const GAP = 16;\r
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };\r
\r
export default function Carousel({\r
  items = DEFAULT_ITEMS,\r
  baseWidth = 300,\r
  autoplay = false,\r
  autoplayDelay = 3000,\r
  pauseOnHover = false,\r
  loop = false,\r
  round = false\r
}: CarouselProps): JSX.Element {\r
  const containerPadding = 16;\r
  const itemWidth = baseWidth - containerPadding * 2;\r
  const trackItemOffset = itemWidth + GAP;\r
\r
  const carouselItems = loop ? [...items, items[0]] : items;\r
  const [currentIndex, setCurrentIndex] = useState<number>(0);\r
  const x = useMotionValue(0);\r
  const [isHovered, setIsHovered] = useState<boolean>(false);\r
  const [isResetting, setIsResetting] = useState<boolean>(false);\r
\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  useEffect(() => {\r
    if (pauseOnHover && containerRef.current) {\r
      const container = containerRef.current;\r
      const handleMouseEnter = () => setIsHovered(true);\r
      const handleMouseLeave = () => setIsHovered(false);\r
      container.addEventListener('mouseenter', handleMouseEnter);\r
      container.addEventListener('mouseleave', handleMouseLeave);\r
      return () => {\r
        container.removeEventListener('mouseenter', handleMouseEnter);\r
        container.removeEventListener('mouseleave', handleMouseLeave);\r
      };\r
    }\r
  }, [pauseOnHover]);\r
\r
  useEffect(() => {\r
    if (autoplay && (!pauseOnHover || !isHovered)) {\r
      const timer = setInterval(() => {\r
        setCurrentIndex(prev => {\r
          if (prev === items.length - 1 && loop) {\r
            return prev + 1;\r
          }\r
          if (prev === carouselItems.length - 1) {\r
            return loop ? 0 : prev;\r
          }\r
          return prev + 1;\r
        });\r
      }, autoplayDelay);\r
      return () => clearInterval(timer);\r
    }\r
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);\r
\r
  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;\r
\r
  const handleAnimationComplete = () => {\r
    if (loop && currentIndex === carouselItems.length - 1) {\r
      setIsResetting(true);\r
      x.set(0);\r
      setCurrentIndex(0);\r
      setTimeout(() => setIsResetting(false), 50);\r
    }\r
  };\r
\r
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {\r
    const offset = info.offset.x;\r
    const velocity = info.velocity.x;\r
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {\r
      if (loop && currentIndex === items.length - 1) {\r
        setCurrentIndex(currentIndex + 1);\r
      } else {\r
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));\r
      }\r
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {\r
      if (loop && currentIndex === 0) {\r
        setCurrentIndex(items.length - 1);\r
      } else {\r
        setCurrentIndex(prev => Math.max(prev - 1, 0));\r
      }\r
    }\r
  };\r
\r
  const dragProps = loop\r
    ? {}\r
    : {\r
        dragConstraints: {\r
          left: -trackItemOffset * (carouselItems.length - 1),\r
          right: 0\r
        }\r
      };\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`relative overflow-hidden p-4 \${\r
        round ? 'rounded-full border border-white' : 'rounded-[24px] border border-[#222]'\r
      }\`}\r
      style={{\r
        width: \`\${baseWidth}px\`,\r
        ...(round && { height: \`\${baseWidth}px\` })\r
      }}\r
    >\r
      <motion.div\r
        className="flex"\r
        drag="x"\r
        {...dragProps}\r
        style={{\r
          width: itemWidth,\r
          gap: \`\${GAP}px\`,\r
          perspective: 1000,\r
          perspectiveOrigin: \`\${currentIndex * trackItemOffset + itemWidth / 2}px 50%\`,\r
          x\r
        }}\r
        onDragEnd={handleDragEnd}\r
        animate={{ x: -(currentIndex * trackItemOffset) }}\r
        transition={effectiveTransition}\r
        onAnimationComplete={handleAnimationComplete}\r
      >\r
        {carouselItems.map((item, index) => {\r
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];\r
          const outputRange = [90, 0, -90];\r
          const rotateY = useTransform(x, range, outputRange, { clamp: false });\r
          return (\r
            <motion.div\r
              key={index}\r
              className={\`relative shrink-0 flex flex-col \${\r
                round\r
                  ? 'items-center justify-center text-center bg-[#060010] border-0'\r
                  : 'items-start justify-between bg-[#222] border border-[#222] rounded-[12px]'\r
              } overflow-hidden cursor-grab active:cursor-grabbing\`}\r
              style={{\r
                width: itemWidth,\r
                height: round ? itemWidth : '100%',\r
                rotateY: rotateY,\r
                ...(round && { borderRadius: '50%' })\r
              }}\r
              transition={effectiveTransition}\r
            >\r
              <div className={\`\${round ? 'p-0 m-0' : 'mb-4 p-5'}\`}>\r
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#060010]">\r
                  {item.icon}\r
                </span>\r
              </div>\r
              <div className="p-5">\r
                <div className="mb-1 font-black text-lg text-white">{item.title}</div>\r
                <p className="text-sm text-white">{item.description}</p>\r
              </div>\r
            </motion.div>\r
          );\r
        })}\r
      </motion.div>\r
      <div className={\`flex w-full justify-center \${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}\`}>\r
        <div className="mt-4 flex w-[150px] justify-between px-8">\r
          {items.map((_, index) => (\r
            <motion.div\r
              key={index}\r
              className={\`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 \${\r
                currentIndex % items.length === index\r
                  ? round\r
                    ? 'bg-white'\r
                    : 'bg-[#333333]'\r
                  : round\r
                    ? 'bg-[#555]'\r
                    : 'bg-[rgba(51,51,51,0.4)]'\r
              }\`}\r
              animate={{\r
                scale: currentIndex % items.length === index ? 1.2 : 1\r
              }}\r
              onClick={() => setCurrentIndex(index)}\r
              transition={{ duration: 0.15 }}\r
            />\r
          ))}\r
        </div>\r
      </div>\r
    </div>\r
  );\r
}\r
`,an={dependencies:"motion",usage:`import Carousel from './Carousel'

<div style={{ height: '600px', position: 'relative' }}>
  <Carousel
    baseWidth={300}
    autoplay={true}
    autoplayDelay={3000}
    pauseOnHover={true}
    loop={true}
    round={false}
  />
</div>`,code:en,css:rn,tailwind:tn,tsCode:on,tsTailwind:sn},hn=()=>{const[t,v]=s.useState(300),[f,I]=s.useState(!1),[x,i]=s.useState(3e3),[a,T]=s.useState(!1),[m,p]=s.useState(!1),[d,c]=s.useState(!1),[u,l]=Z(),y=[{name:"items",type:"CarouselItem[]",default:"DEFAULT_ITEMS",description:"An array of carousel items. Each item must include title, description, id, and icon."},{name:"baseWidth",type:"number",default:"300",description:"Total width (in px) of the carousel container. Effective item width is baseWidth minus padding."},{name:"autoplay",type:"boolean",default:"false",description:"Enables automatic scrolling to the next item at a fixed interval."},{name:"autoplayDelay",type:"number",default:"3000",description:"Delay in milliseconds between automatic scrolls when autoplay is enabled."},{name:"pauseOnHover",type:"boolean",default:"false",description:"Pauses the autoplay functionality when the carousel is hovered."},{name:"loop",type:"boolean",default:"false",description:"When true, the carousel loops seamlessly from the last item back to the first."},{name:"round",type:"boolean",default:"true",description:"When true, the carousel is rendered with a 1:1 aspect ratio and circular container/items."}];return n.jsxs(Y,{children:[n.jsxs(B,{children:[n.jsx(U,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:n.jsx(nn,{baseWidth:t,autoplay:f,autoplayDelay:x,pauseOnHover:a,loop:m,round:d},u)}),n.jsxs(J,{children:[n.jsx(L,{title:"Width",min:250,max:330,step:10,value:t,onChange:r=>{v(r),l()}}),n.jsx(b,{title:"Round Variant",isChecked:d,onChange:r=>{c(r),l()}}),n.jsx(b,{title:"Loop",isChecked:m,onChange:r=>{p(r),l()}}),n.jsx(b,{title:"Autoplay",isChecked:f,onChange:r=>{I(r),l()}}),n.jsx(L,{title:"Delay",min:1e3,max:4e3,step:1e3,value:x,isDisabled:!f,onChange:r=>{i(r),l()}}),n.jsx(b,{title:"Pause On Hover",sChecked:a,isDisabled:!f,onChange:r=>{T(r),l()}})]}),n.jsx(V,{data:y}),n.jsx(q,{dependencyList:["motion"]})]}),n.jsx(z,{children:n.jsx(X,{codeObject:an})})]})};export{hn as default};
