import{r as a,j as r,bd as O,q as j,B as N,T as L}from"./index-wsKSLPNH.js";import{T as S,P as k,a as B,C as q,b as H}from"./PropTable-C4uPWs8h.js";import{C as z}from"./Customize-1m_ZNqR9.js";import{P as D}from"./PreviewSwitch-DqnF708j.js";import{D as W}from"./Dependencies-BHoMfJUj.js";import{u as G}from"./useForceRerender-BCFU-k0M.js";import{P as J}from"./PreviewInput-C0y58bk9.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const K=({text:m="⚛️",delay:v=.01,spacing:o=100,followMouseDirection:y=!0,randomFloat:n=!0,exitDuration:h=.5,removalInterval:u=30,maxPoints:l=5})=>{const[g,i]=a.useState([]),d=a.useRef(null),M=a.useRef(Date.now()),R=a.useRef(0),I=e=>{if(!d.current)return;const s=d.current.getBoundingClientRect(),b=e.clientX-s.left,C=e.clientY-s.top;i(P=>{let t=[...P];if(t.length===0)t.push({id:R.current++,x:b,y:C,angle:0,...n&&{randomX:Math.random()*10-5,randomY:Math.random()*10-5,randomRotate:Math.random()*10-5}});else{const f=t[t.length-1],p=b-f.x,x=C-f.y,w=Math.sqrt(p*p+x*x);if(w>=o){let c=Math.atan2(x,p)*180/Math.PI;c>90?c-=180:c<-90&&(c+=180);const X=y?c:0,Y=Math.floor(w/o);for(let T=1;T<=Y;T++){const A=o*T/w,E=f.x+p*A,F=f.y+x*A;t.push({id:R.current++,x:E,y:F,angle:X,...n&&{randomX:Math.random()*10-5,randomY:Math.random()*10-5,randomRotate:Math.random()*10-5}})}}}return t.length>l&&(t=t.slice(t.length-l)),t}),M.current=Date.now()};return a.useEffect(()=>{const e=d.current;if(e)return e.addEventListener("mousemove",I),()=>e.removeEventListener("mousemove",I)},[]),a.useEffect(()=>{const e=setInterval(()=>{Date.now()-M.current>100&&i(s=>s.length>0?s.slice(1):s)},u);return()=>clearInterval(e)},[u]),r.jsx("div",{ref:d,className:"text-cursor-container",children:r.jsx("div",{className:"text-cursor-inner",children:r.jsx(O,{children:g.map(e=>r.jsx(j.div,{initial:{opacity:0,scale:1,x:0,y:0,rotate:e.angle},animate:{opacity:1,scale:1,x:n?[0,e.randomX||0,0]:0,y:n?[0,e.randomY||0,0]:0,rotate:n?[e.angle,e.angle+(e.randomRotate||0),e.angle]:e.angle},exit:{opacity:0,scale:0},transition:{opacity:{duration:h,ease:"easeOut",delay:v},...n&&{x:{duration:2,ease:"easeInOut",repeat:1/0,repeatType:"mirror"},y:{duration:2,ease:"easeInOut",repeat:1/0,repeatType:"mirror"},rotate:{duration:2,ease:"easeInOut",repeat:1/0,repeatType:"mirror"}}},className:"text-cursor-item",style:{left:e.x,top:e.y},children:m},e.id))})})})},Q=`import { useState, useEffect, useRef } from 'react';\r
import { motion, AnimatePresence } from 'motion/react';\r
import './TextCursor.css';\r
\r
const TextCursor = ({\r
  text = '⚛️',\r
  delay = 0.01,\r
  spacing = 100,\r
  followMouseDirection = true,\r
  randomFloat = true,\r
  exitDuration = 0.5,\r
  removalInterval = 30,\r
  maxPoints = 5\r
}) => {\r
  const [trail, setTrail] = useState([]);\r
  const containerRef = useRef(null);\r
  const lastMoveTimeRef = useRef(Date.now());\r
  const idCounter = useRef(0);\r
\r
  const handleMouseMove = e => {\r
    if (!containerRef.current) return;\r
    const rect = containerRef.current.getBoundingClientRect();\r
    const mouseX = e.clientX - rect.left;\r
    const mouseY = e.clientY - rect.top;\r
\r
    setTrail(prev => {\r
      let newTrail = [...prev];\r
      if (newTrail.length === 0) {\r
        newTrail.push({\r
          id: idCounter.current++,\r
          x: mouseX,\r
          y: mouseY,\r
          angle: 0,\r
          ...(randomFloat && {\r
            randomX: Math.random() * 10 - 5,\r
            randomY: Math.random() * 10 - 5,\r
            randomRotate: Math.random() * 10 - 5\r
          })\r
        });\r
      } else {\r
        const last = newTrail[newTrail.length - 1];\r
        const dx = mouseX - last.x;\r
        const dy = mouseY - last.y;\r
        const distance = Math.sqrt(dx * dx + dy * dy);\r
        if (distance >= spacing) {\r
          let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;\r
          if (rawAngle > 90) rawAngle -= 180;\r
          else if (rawAngle < -90) rawAngle += 180;\r
          const computedAngle = followMouseDirection ? rawAngle : 0;\r
          const steps = Math.floor(distance / spacing);\r
          for (let i = 1; i <= steps; i++) {\r
            const t = (spacing * i) / distance;\r
            const newX = last.x + dx * t;\r
            const newY = last.y + dy * t;\r
            newTrail.push({\r
              id: idCounter.current++,\r
              x: newX,\r
              y: newY,\r
              angle: computedAngle,\r
              ...(randomFloat && {\r
                randomX: Math.random() * 10 - 5,\r
                randomY: Math.random() * 10 - 5,\r
                randomRotate: Math.random() * 10 - 5\r
              })\r
            });\r
          }\r
        }\r
      }\r
      if (newTrail.length > maxPoints) {\r
        newTrail = newTrail.slice(newTrail.length - maxPoints);\r
      }\r
      return newTrail;\r
    });\r
    lastMoveTimeRef.current = Date.now();\r
  };\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    container.addEventListener('mousemove', handleMouseMove);\r
    return () => container.removeEventListener('mousemove', handleMouseMove);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  useEffect(() => {\r
    const interval = setInterval(() => {\r
      if (Date.now() - lastMoveTimeRef.current > 100) {\r
        setTrail(prev => (prev.length > 0 ? prev.slice(1) : prev));\r
      }\r
    }, removalInterval);\r
    return () => clearInterval(interval);\r
  }, [removalInterval]);\r
\r
  return (\r
    <div ref={containerRef} className="text-cursor-container">\r
      <div className="text-cursor-inner">\r
        <AnimatePresence>\r
          {trail.map(item => (\r
            <motion.div\r
              key={item.id}\r
              initial={{ opacity: 0, scale: 1, x: 0, y: 0, rotate: item.angle }}\r
              animate={{\r
                opacity: 1,\r
                scale: 1,\r
                x: randomFloat ? [0, item.randomX || 0, 0] : 0,\r
                y: randomFloat ? [0, item.randomY || 0, 0] : 0,\r
                rotate: randomFloat ? [item.angle, item.angle + (item.randomRotate || 0), item.angle] : item.angle\r
              }}\r
              exit={{ opacity: 0, scale: 0 }}\r
              transition={{\r
                opacity: { duration: exitDuration, ease: 'easeOut', delay },\r
                ...(randomFloat && {\r
                  x: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  },\r
                  y: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  },\r
                  rotate: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  }\r
                })\r
              }}\r
              className="text-cursor-item"\r
              style={{ left: item.x, top: item.y }}\r
            >\r
              {text}\r
            </motion.div>\r
          ))}\r
        </AnimatePresence>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default TextCursor;\r
`,U=`.text-cursor-container {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
}\r
\r
.text-cursor-inner {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  bottom: 0;\r
  pointer-events: none;\r
}\r
\r
.text-cursor-item {\r
  position: absolute;\r
  user-select: none;\r
  white-space: nowrap;\r
  font-size: 1.875rem;\r
}\r
`,V=`import { useState, useEffect, useRef } from 'react';\r
import { motion, AnimatePresence } from 'motion/react';\r
\r
const TextCursor = ({\r
  text = '⚛️',\r
  delay = 0.01,\r
  spacing = 100,\r
  followMouseDirection = true,\r
  randomFloat = true,\r
  exitDuration = 0.5,\r
  removalInterval = 30,\r
  maxPoints = 5\r
}) => {\r
  const [trail, setTrail] = useState([]);\r
  const containerRef = useRef(null);\r
  const lastMoveTimeRef = useRef(Date.now());\r
  const idCounter = useRef(0);\r
\r
  const handleMouseMove = e => {\r
    if (!containerRef.current) return;\r
    const rect = containerRef.current.getBoundingClientRect();\r
    const mouseX = e.clientX - rect.left;\r
    const mouseY = e.clientY - rect.top;\r
\r
    setTrail(prev => {\r
      let newTrail = [...prev];\r
      if (newTrail.length === 0) {\r
        newTrail.push({\r
          id: idCounter.current++,\r
          x: mouseX,\r
          y: mouseY,\r
          angle: 0,\r
          ...(randomFloat && {\r
            randomX: Math.random() * 10 - 5,\r
            randomY: Math.random() * 10 - 5,\r
            randomRotate: Math.random() * 10 - 5\r
          })\r
        });\r
      } else {\r
        const last = newTrail[newTrail.length - 1];\r
        const dx = mouseX - last.x;\r
        const dy = mouseY - last.y;\r
        const distance = Math.sqrt(dx * dx + dy * dy);\r
        if (distance >= spacing) {\r
          let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;\r
          if (rawAngle > 90) rawAngle -= 180;\r
          else if (rawAngle < -90) rawAngle += 180;\r
          const computedAngle = followMouseDirection ? rawAngle : 0;\r
          const steps = Math.floor(distance / spacing);\r
          for (let i = 1; i <= steps; i++) {\r
            const t = (spacing * i) / distance;\r
            const newX = last.x + dx * t;\r
            const newY = last.y + dy * t;\r
            newTrail.push({\r
              id: idCounter.current++,\r
              x: newX,\r
              y: newY,\r
              angle: computedAngle,\r
              ...(randomFloat && {\r
                randomX: Math.random() * 10 - 5,\r
                randomY: Math.random() * 10 - 5,\r
                randomRotate: Math.random() * 10 - 5\r
              })\r
            });\r
          }\r
        }\r
      }\r
      if (newTrail.length > maxPoints) {\r
        newTrail = newTrail.slice(newTrail.length - maxPoints);\r
      }\r
      return newTrail;\r
    });\r
    lastMoveTimeRef.current = Date.now();\r
  };\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    container.addEventListener('mousemove', handleMouseMove);\r
    return () => container.removeEventListener('mousemove', handleMouseMove);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  useEffect(() => {\r
    const interval = setInterval(() => {\r
      if (Date.now() - lastMoveTimeRef.current > 100) {\r
        setTrail(prev => (prev.length > 0 ? prev.slice(1) : prev));\r
      }\r
    }, removalInterval);\r
    return () => clearInterval(interval);\r
  }, [removalInterval]);\r
\r
  return (\r
    <div ref={containerRef} className="w-full h-full relative">\r
      <div className="absolute inset-0 pointer-events-none">\r
        <AnimatePresence>\r
          {trail.map(item => (\r
            <motion.div\r
              key={item.id}\r
              initial={{ opacity: 0, scale: 1, x: 0, y: 0, rotate: item.angle }}\r
              animate={{\r
                opacity: 1,\r
                scale: 1,\r
                x: randomFloat ? [0, item.randomX || 0, 0] : 0,\r
                y: randomFloat ? [0, item.randomY || 0, 0] : 0,\r
                rotate: randomFloat ? [item.angle, item.angle + (item.randomRotate || 0), item.angle] : item.angle\r
              }}\r
              exit={{ opacity: 0, scale: 0 }}\r
              transition={{\r
                opacity: { duration: exitDuration, ease: 'easeOut', delay },\r
                ...(randomFloat && {\r
                  x: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  },\r
                  y: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  },\r
                  rotate: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  }\r
                })\r
              }}\r
              className="absolute select-none whitespace-nowrap text-3xl"\r
              style={{ left: item.x, top: item.y }}\r
            >\r
              {text}\r
            </motion.div>\r
          ))}\r
        </AnimatePresence>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default TextCursor;\r
`,Z=`import React, { useState, useEffect, useRef } from 'react';\r
import { motion, AnimatePresence } from 'motion/react';\r
import './TextCursor.css';\r
\r
interface TextCursorProps {\r
  text: string;\r
  delay?: number;\r
  spacing?: number;\r
  followMouseDirection?: boolean;\r
  randomFloat?: boolean;\r
  exitDuration?: number;\r
  removalInterval?: number;\r
  maxPoints?: number;\r
}\r
\r
interface TrailItem {\r
  id: number;\r
  x: number;\r
  y: number;\r
  angle: number;\r
  randomX?: number;\r
  randomY?: number;\r
  randomRotate?: number;\r
}\r
\r
const TextCursor: React.FC<TextCursorProps> = ({\r
  text = '⚛️',\r
  delay = 0.01,\r
  spacing = 100,\r
  followMouseDirection = true,\r
  randomFloat = true,\r
  exitDuration = 0.5,\r
  removalInterval = 30,\r
  maxPoints = 5\r
}) => {\r
  const [trail, setTrail] = useState<TrailItem[]>([]);\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const lastMoveTimeRef = useRef<number>(Date.now());\r
  const idCounter = useRef<number>(0);\r
\r
  const handleMouseMove = (e: MouseEvent) => {\r
    if (!containerRef.current) return;\r
    const rect = containerRef.current.getBoundingClientRect();\r
    const mouseX = e.clientX - rect.left;\r
    const mouseY = e.clientY - rect.top;\r
\r
    setTrail(prev => {\r
      let newTrail = [...prev];\r
      if (newTrail.length === 0) {\r
        newTrail.push({\r
          id: idCounter.current++,\r
          x: mouseX,\r
          y: mouseY,\r
          angle: 0,\r
          ...(randomFloat && {\r
            randomX: Math.random() * 10 - 5,\r
            randomY: Math.random() * 10 - 5,\r
            randomRotate: Math.random() * 10 - 5\r
          })\r
        });\r
      } else {\r
        const last = newTrail[newTrail.length - 1];\r
        const dx = mouseX - last.x;\r
        const dy = mouseY - last.y;\r
        const distance = Math.sqrt(dx * dx + dy * dy);\r
        if (distance >= spacing) {\r
          let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;\r
          if (rawAngle > 90) rawAngle -= 180;\r
          else if (rawAngle < -90) rawAngle += 180;\r
          const computedAngle = followMouseDirection ? rawAngle : 0;\r
          const steps = Math.floor(distance / spacing);\r
          for (let i = 1; i <= steps; i++) {\r
            const t = (spacing * i) / distance;\r
            const newX = last.x + dx * t;\r
            const newY = last.y + dy * t;\r
            newTrail.push({\r
              id: idCounter.current++,\r
              x: newX,\r
              y: newY,\r
              angle: computedAngle,\r
              ...(randomFloat && {\r
                randomX: Math.random() * 10 - 5,\r
                randomY: Math.random() * 10 - 5,\r
                randomRotate: Math.random() * 10 - 5\r
              })\r
            });\r
          }\r
        }\r
      }\r
      if (newTrail.length > maxPoints) {\r
        newTrail = newTrail.slice(newTrail.length - maxPoints);\r
      }\r
      return newTrail;\r
    });\r
    lastMoveTimeRef.current = Date.now();\r
  };\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    container.addEventListener('mousemove', handleMouseMove);\r
    return () => container.removeEventListener('mousemove', handleMouseMove);\r
  }, []);\r
\r
  useEffect(() => {\r
    const interval = setInterval(() => {\r
      if (Date.now() - lastMoveTimeRef.current > 100) {\r
        setTrail(prev => (prev.length > 0 ? prev.slice(1) : prev));\r
      }\r
    }, removalInterval);\r
    return () => clearInterval(interval);\r
  }, [removalInterval]);\r
\r
  return (\r
    <div ref={containerRef} className="text-cursor-container">\r
      <div className="text-cursor-inner">\r
        <AnimatePresence>\r
          {trail.map(item => (\r
            <motion.div\r
              key={item.id}\r
              initial={{ opacity: 0, scale: 1, x: 0, y: 0, rotate: item.angle }}\r
              animate={{\r
                opacity: 1,\r
                scale: 1,\r
                x: randomFloat ? [0, item.randomX || 0, 0] : 0,\r
                y: randomFloat ? [0, item.randomY || 0, 0] : 0,\r
                rotate: randomFloat ? [item.angle, item.angle + (item.randomRotate || 0), item.angle] : item.angle\r
              }}\r
              exit={{ opacity: 0, scale: 0 }}\r
              transition={{\r
                opacity: { duration: exitDuration, ease: 'easeOut', delay },\r
                ...(randomFloat && {\r
                  x: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  },\r
                  y: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  },\r
                  rotate: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  }\r
                })\r
              }}\r
              className="text-cursor-item"\r
              style={{ left: item.x, top: item.y }}\r
            >\r
              {text}\r
            </motion.div>\r
          ))}\r
        </AnimatePresence>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default TextCursor;\r
`,_=`import React, { useState, useEffect, useRef } from 'react';\r
import { motion, AnimatePresence } from 'motion/react';\r
\r
interface TextCursorProps {\r
  text: string;\r
  delay?: number;\r
  spacing?: number;\r
  followMouseDirection?: boolean;\r
  randomFloat?: boolean;\r
  exitDuration?: number;\r
  removalInterval?: number;\r
  maxPoints?: number;\r
}\r
\r
interface TrailItem {\r
  id: number;\r
  x: number;\r
  y: number;\r
  angle: number;\r
  randomX?: number;\r
  randomY?: number;\r
  randomRotate?: number;\r
}\r
\r
const TextCursor: React.FC<TextCursorProps> = ({\r
  text = '⚛️',\r
  delay = 0.01,\r
  spacing = 100,\r
  followMouseDirection = true,\r
  randomFloat = true,\r
  exitDuration = 0.5,\r
  removalInterval = 30,\r
  maxPoints = 5\r
}) => {\r
  const [trail, setTrail] = useState<TrailItem[]>([]);\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const lastMoveTimeRef = useRef<number>(Date.now());\r
  const idCounter = useRef<number>(0);\r
\r
  const handleMouseMove = (e: MouseEvent) => {\r
    if (!containerRef.current) return;\r
    const rect = containerRef.current.getBoundingClientRect();\r
    const mouseX = e.clientX - rect.left;\r
    const mouseY = e.clientY - rect.top;\r
\r
    setTrail(prev => {\r
      let newTrail = [...prev];\r
      if (newTrail.length === 0) {\r
        newTrail.push({\r
          id: idCounter.current++,\r
          x: mouseX,\r
          y: mouseY,\r
          angle: 0,\r
          ...(randomFloat && {\r
            randomX: Math.random() * 10 - 5,\r
            randomY: Math.random() * 10 - 5,\r
            randomRotate: Math.random() * 10 - 5\r
          })\r
        });\r
      } else {\r
        const last = newTrail[newTrail.length - 1];\r
        const dx = mouseX - last.x;\r
        const dy = mouseY - last.y;\r
        const distance = Math.sqrt(dx * dx + dy * dy);\r
        if (distance >= spacing) {\r
          let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;\r
          if (rawAngle > 90) rawAngle -= 180;\r
          else if (rawAngle < -90) rawAngle += 180;\r
          const computedAngle = followMouseDirection ? rawAngle : 0;\r
          const steps = Math.floor(distance / spacing);\r
          for (let i = 1; i <= steps; i++) {\r
            const t = (spacing * i) / distance;\r
            const newX = last.x + dx * t;\r
            const newY = last.y + dy * t;\r
            newTrail.push({\r
              id: idCounter.current++,\r
              x: newX,\r
              y: newY,\r
              angle: computedAngle,\r
              ...(randomFloat && {\r
                randomX: Math.random() * 10 - 5,\r
                randomY: Math.random() * 10 - 5,\r
                randomRotate: Math.random() * 10 - 5\r
              })\r
            });\r
          }\r
        }\r
      }\r
      if (newTrail.length > maxPoints) {\r
        newTrail = newTrail.slice(newTrail.length - maxPoints);\r
      }\r
      return newTrail;\r
    });\r
    lastMoveTimeRef.current = Date.now();\r
  };\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    container.addEventListener('mousemove', handleMouseMove);\r
    return () => container.removeEventListener('mousemove', handleMouseMove);\r
  }, []);\r
\r
  useEffect(() => {\r
    const interval = setInterval(() => {\r
      if (Date.now() - lastMoveTimeRef.current > 100) {\r
        setTrail(prev => (prev.length > 0 ? prev.slice(1) : prev));\r
      }\r
    }, removalInterval);\r
    return () => clearInterval(interval);\r
  }, [removalInterval]);\r
\r
  return (\r
    <div ref={containerRef} className="w-full h-full relative">\r
      <div className="absolute inset-0 pointer-events-none">\r
        <AnimatePresence>\r
          {trail.map(item => (\r
            <motion.div\r
              key={item.id}\r
              initial={{ opacity: 0, scale: 1, x: 0, y: 0, rotate: item.angle }}\r
              animate={{\r
                opacity: 1,\r
                scale: 1,\r
                x: randomFloat ? [0, item.randomX || 0, 0] : 0,\r
                y: randomFloat ? [0, item.randomY || 0, 0] : 0,\r
                rotate: randomFloat ? [item.angle, item.angle + (item.randomRotate || 0), item.angle] : item.angle\r
              }}\r
              exit={{ opacity: 0, scale: 0 }}\r
              transition={{\r
                opacity: { duration: exitDuration, ease: 'easeOut', delay },\r
                ...(randomFloat && {\r
                  x: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  },\r
                  y: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  },\r
                  rotate: {\r
                    duration: 2,\r
                    ease: 'easeInOut',\r
                    repeat: Infinity,\r
                    repeatType: 'mirror'\r
                  }\r
                })\r
              }}\r
              className="absolute select-none whitespace-nowrap text-3xl"\r
              style={{ left: item.x, top: item.y }}\r
            >\r
              {text}\r
            </motion.div>\r
          ))}\r
        </AnimatePresence>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default TextCursor;\r
`,$={dependencies:"motion",usage:`import TextCursor from './TextCursor';

<TextCursor
  text="Hello!"
  delay={0.01}
  spacing={80}
  followMouseDirection={true}
  randomFloat={true}
  exitDuration={0.3}
  removalInterval={20}
  maxPoints={10}
/>`,code:Q,css:U,tailwind:V,tsCode:Z,tsTailwind:_},ce=()=>{const[m,v]=a.useState("⚛️"),[o,y]=a.useState(!0),[n,h]=a.useState(!0),[u,l]=G(),g=[{name:"text",type:"string",default:"⚛️",description:"The text string to display as the trail."},{name:"delay",type:"number",default:"0.01",description:"The entry stagger delay in seconds for the fade-out animation."},{name:"spacing",type:"number",default:"100",description:"The spacing in pixels between each trail point."},{name:"followMouseDirection",type:"boolean",default:"true",description:"If true, each text rotates to follow the mouse direction."},{name:"randomFloat",type:"boolean",default:"true",description:"If true, enables random floating offsets in position and rotation for a dynamic effect."},{name:"exitDuration",type:"number",default:"0.5",description:"The duration in seconds for the exit animation of each trail item."},{name:"removalInterval",type:"number",default:"30",description:"The interval in milliseconds between removing trail items when the mouse stops moving."},{name:"maxPoints",type:"number",default:"5",description:"The maximum number of trail points to display."}];return r.jsxs(S,{children:[r.jsxs(k,{children:[r.jsxs(N,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:[r.jsx(K,{text:m,followMouseDirection:o,randomFloat:n},u),r.jsx(L,{pointerEvents:"none",position:"absolute",textAlign:"center",fontSize:"4rem",fontWeight:900,userSelect:"none",color:"#271E37",children:"Hover Around!"})]}),r.jsxs(z,{children:[r.jsx(J,{title:"Text",value:m,placeholder:"Enter text...",width:160,maxLength:10,onChange:v}),r.jsx(D,{title:"Follow Mouse Direction",isChecked:o,onChange:i=>{y(i),l()}}),r.jsx(D,{title:"Enable Random Floating",isChecked:n,onChange:i=>{h(i),l()}})]}),r.jsx(B,{data:g}),r.jsx(W,{dependencyList:["motion"]})]}),r.jsx(q,{children:r.jsx(H,{codeObject:$})})]})};export{ce as default};
