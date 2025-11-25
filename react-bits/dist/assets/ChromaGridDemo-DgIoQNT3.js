import{r as i,g as c,j as e,B as E}from"./index-wsKSLPNH.js";import{T as M,P as S,a as D,C as P,b as j}from"./PropTable-C4uPWs8h.js";import{D as z}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";const T=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import './ChromaGrid.css';\r
\r
export const ChromaGrid = ({\r
  items,\r
  className = '',\r
  radius = 300,\r
  columns = 3,\r
  rows = 2,\r
  damping = 0.45,\r
  fadeOut = 0.6,\r
  ease = 'power3.out'\r
}) => {\r
  const rootRef = useRef(null);\r
  const fadeRef = useRef(null);\r
  const setX = useRef(null);\r
  const setY = useRef(null);\r
  const pos = useRef({ x: 0, y: 0 });\r
\r
  const demo = [\r
    {\r
      image: 'https://i.pravatar.cc/300?img=8',\r
      title: 'Alex Rivera',\r
      subtitle: 'Full Stack Developer',\r
      handle: '@alexrivera',\r
      borderColor: '#4F46E5',\r
      gradient: 'linear-gradient(145deg, #4F46E5, #000)',\r
      url: 'https://github.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=11',\r
      title: 'Jordan Chen',\r
      subtitle: 'DevOps Engineer',\r
      handle: '@jordanchen',\r
      borderColor: '#10B981',\r
      gradient: 'linear-gradient(210deg, #10B981, #000)',\r
      url: 'https://linkedin.com/in/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=3',\r
      title: 'Morgan Blake',\r
      subtitle: 'UI/UX Designer',\r
      handle: '@morganblake',\r
      borderColor: '#F59E0B',\r
      gradient: 'linear-gradient(165deg, #F59E0B, #000)',\r
      url: 'https://dribbble.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=16',\r
      title: 'Casey Park',\r
      subtitle: 'Data Scientist',\r
      handle: '@caseypark',\r
      borderColor: '#EF4444',\r
      gradient: 'linear-gradient(195deg, #EF4444, #000)',\r
      url: 'https://kaggle.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=25',\r
      title: 'Sam Kim',\r
      subtitle: 'Mobile Developer',\r
      handle: '@thesamkim',\r
      borderColor: '#8B5CF6',\r
      gradient: 'linear-gradient(225deg, #8B5CF6, #000)',\r
      url: 'https://github.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=60',\r
      title: 'Tyler Rodriguez',\r
      subtitle: 'Cloud Architect',\r
      handle: '@tylerrod',\r
      borderColor: '#06B6D4',\r
      gradient: 'linear-gradient(135deg, #06B6D4, #000)',\r
      url: 'https://aws.amazon.com/'\r
    }\r
  ];\r
  const data = items?.length ? items : demo;\r
\r
  useEffect(() => {\r
    const el = rootRef.current;\r
    if (!el) return;\r
    setX.current = gsap.quickSetter(el, '--x', 'px');\r
    setY.current = gsap.quickSetter(el, '--y', 'px');\r
    const { width, height } = el.getBoundingClientRect();\r
    pos.current = { x: width / 2, y: height / 2 };\r
    setX.current(pos.current.x);\r
    setY.current(pos.current.y);\r
  }, []);\r
\r
  const moveTo = (x, y) => {\r
    gsap.to(pos.current, {\r
      x,\r
      y,\r
      duration: damping,\r
      ease,\r
      onUpdate: () => {\r
        setX.current?.(pos.current.x);\r
        setY.current?.(pos.current.y);\r
      },\r
      overwrite: true\r
    });\r
  };\r
\r
  const handleMove = e => {\r
    const r = rootRef.current.getBoundingClientRect();\r
    moveTo(e.clientX - r.left, e.clientY - r.top);\r
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });\r
  };\r
\r
  const handleLeave = () => {\r
    gsap.to(fadeRef.current, {\r
      opacity: 1,\r
      duration: fadeOut,\r
      overwrite: true\r
    });\r
  };\r
\r
  const handleCardClick = url => {\r
    if (url) {\r
      window.open(url, '_blank', 'noopener,noreferrer');\r
    }\r
  };\r
\r
  const handleCardMove = e => {\r
    const card = e.currentTarget;\r
    const rect = card.getBoundingClientRect();\r
    const x = e.clientX - rect.left;\r
    const y = e.clientY - rect.top;\r
    card.style.setProperty('--mouse-x', \`\${x}px\`);\r
    card.style.setProperty('--mouse-y', \`\${y}px\`);\r
  };\r
\r
  return (\r
    <div\r
      ref={rootRef}\r
      className={\`chroma-grid \${className}\`}\r
      style={{\r
        '--r': \`\${radius}px\`,\r
        '--cols': columns,\r
        '--rows': rows\r
      }}\r
      onPointerMove={handleMove}\r
      onPointerLeave={handleLeave}\r
    >\r
      {data.map((c, i) => (\r
        <article\r
          key={i}\r
          className="chroma-card"\r
          onMouseMove={handleCardMove}\r
          onClick={() => handleCardClick(c.url)}\r
          style={{\r
            '--card-border': c.borderColor || 'transparent',\r
            '--card-gradient': c.gradient,\r
            cursor: c.url ? 'pointer' : 'default'\r
          }}\r
        >\r
          <div className="chroma-img-wrapper">\r
            <img src={c.image} alt={c.title} loading="lazy" />\r
          </div>\r
          <footer className="chroma-info">\r
            <h3 className="name">{c.title}</h3>\r
            {c.handle && <span className="handle">{c.handle}</span>}\r
            <p className="role">{c.subtitle}</p>\r
            {c.location && <span className="location">{c.location}</span>}\r
          </footer>\r
        </article>\r
      ))}\r
      <div className="chroma-overlay" />\r
      <div ref={fadeRef} className="chroma-fade" />\r
    </div>\r
  );\r
};\r
\r
export default ChromaGrid;\r
`,X=`.chroma-grid {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  display: grid;\r
  grid-template-columns: repeat(var(--cols, 3), 320px);\r
  grid-auto-rows: auto;\r
  justify-content: center;\r
  gap: 0.75rem;\r
  max-width: 1200px;\r
  margin: 0 auto;\r
  padding: 1rem;\r
  box-sizing: border-box;\r
\r
  --x: 50%;\r
  --y: 50%;\r
  --r: 220px;\r
}\r
\r
@media (max-width: 1124px) {\r
  .chroma-grid {\r
    grid-template-columns: repeat(auto-fit, minmax(320px, 320px));\r
    gap: 0.5rem;\r
    padding: 0.5rem;\r
  }\r
}\r
\r
@media (max-width: 480px) {\r
  .chroma-grid {\r
    grid-template-columns: 320px;\r
    gap: 0.75rem;\r
    padding: 1rem;\r
  }\r
}\r
\r
.chroma-card {\r
  position: relative;\r
  display: flex;\r
  flex-direction: column;\r
  width: 320px;\r
  height: auto;\r
  border-radius: 20px;\r
  overflow: hidden;\r
  border: 1px solid #333;\r
  transition: border-color 0.3s ease;\r
  background: var(--card-gradient);\r
\r
  --mouse-x: 50%;\r
  --mouse-y: 50%;\r
  --spotlight-color: rgba(255, 255, 255, 0.3);\r
}\r
\r
.chroma-card:hover {\r
  border-color: var(--card-border);\r
}\r
\r
.chroma-card::before {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%);\r
  pointer-events: none;\r
  opacity: 0;\r
  transition: opacity 0.5s ease;\r
  z-index: 2;\r
}\r
\r
.chroma-card:hover::before {\r
  opacity: 1;\r
}\r
\r
.chroma-img-wrapper {\r
  position: relative;\r
  z-index: 1;\r
  flex: 1;\r
  padding: 10px;\r
  box-sizing: border-box;\r
  background: transparent;\r
  transition: background 0.3s ease;\r
}\r
\r
.chroma-img-wrapper img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
  border-radius: 10px;\r
  display: block;\r
}\r
\r
.chroma-info {\r
  position: relative;\r
  z-index: 1;\r
  padding: 0.75rem 1rem;\r
  color: #fff;\r
  font-family: system-ui, sans-serif;\r
  display: grid;\r
  grid-template-columns: 1fr auto;\r
  row-gap: 0.25rem;\r
  column-gap: 0.75rem;\r
}\r
\r
.chroma-info .role,\r
.chroma-info .handle {\r
  color: #aaa;\r
}\r
\r
.chroma-overlay {\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  z-index: 3;\r
  backdrop-filter: grayscale(1) brightness(0.78);\r
  -webkit-backdrop-filter: grayscale(1) brightness(0.78);\r
  background: rgba(0, 0, 0, 0.001);\r
\r
  mask-image: radial-gradient(\r
    circle var(--r) at var(--x) var(--y),\r
    transparent 0%,\r
    transparent 15%,\r
    rgba(0, 0, 0, 0.1) 30%,\r
    rgba(0, 0, 0, 0.22) 45%,\r
    rgba(0, 0, 0, 0.35) 60%,\r
    rgba(0, 0, 0, 0.5) 75%,\r
    rgba(0, 0, 0, 0.68) 88%,\r
    white 100%\r
  );\r
  -webkit-mask-image: radial-gradient(\r
    circle var(--r) at var(--x) var(--y),\r
    transparent 0%,\r
    transparent 15%,\r
    rgba(0, 0, 0, 0.1) 30%,\r
    rgba(0, 0, 0, 0.22) 45%,\r
    rgba(0, 0, 0, 0.35) 60%,\r
    rgba(0, 0, 0, 0.5) 75%,\r
    rgba(0, 0, 0, 0.68) 88%,\r
    white 100%\r
  );\r
}\r
\r
.chroma-fade {\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  z-index: 4;\r
  backdrop-filter: grayscale(1) brightness(0.78);\r
  -webkit-backdrop-filter: grayscale(1) brightness(0.78);\r
  background: rgba(0, 0, 0, 0.001);\r
\r
  mask-image: radial-gradient(\r
    circle var(--r) at var(--x) var(--y),\r
    white 0%,\r
    white 15%,\r
    rgba(255, 255, 255, 0.9) 30%,\r
    rgba(255, 255, 255, 0.78) 45%,\r
    rgba(255, 255, 255, 0.65) 60%,\r
    rgba(255, 255, 255, 0.5) 75%,\r
    rgba(255, 255, 255, 0.32) 88%,\r
    transparent 100%\r
  );\r
  -webkit-mask-image: radial-gradient(\r
    circle var(--r) at var(--x) var(--y),\r
    white 0%,\r
    white 15%,\r
    rgba(255, 255, 255, 0.9) 30%,\r
    rgba(255, 255, 255, 0.78) 45%,\r
    rgba(255, 255, 255, 0.65) 60%,\r
    rgba(255, 255, 255, 0.5) 75%,\r
    rgba(255, 255, 255, 0.32) 88%,\r
    transparent 100%\r
  );\r
\r
  opacity: 1;\r
  transition: opacity 0.25s ease;\r
}\r
`,Y=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
\r
const ChromaGrid = ({ items, className = '', radius = 300, damping = 0.45, fadeOut = 0.6, ease = 'power3.out' }) => {\r
  const rootRef = useRef(null);\r
  const fadeRef = useRef(null);\r
  const setX = useRef(null);\r
  const setY = useRef(null);\r
  const pos = useRef({ x: 0, y: 0 });\r
\r
  const demo = [\r
    {\r
      image: 'https://i.pravatar.cc/300?img=8',\r
      title: 'Alex Rivera',\r
      subtitle: 'Full Stack Developer',\r
      handle: '@alexrivera',\r
      borderColor: '#4F46E5',\r
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',\r
      url: 'https://github.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=11',\r
      title: 'Jordan Chen',\r
      subtitle: 'DevOps Engineer',\r
      handle: '@jordanchen',\r
      borderColor: '#10B981',\r
      gradient: 'linear-gradient(210deg,#10B981,#000)',\r
      url: 'https://linkedin.com/in/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=3',\r
      title: 'Morgan Blake',\r
      subtitle: 'UI/UX Designer',\r
      handle: '@morganblake',\r
      borderColor: '#F59E0B',\r
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',\r
      url: 'https://dribbble.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=16',\r
      title: 'Casey Park',\r
      subtitle: 'Data Scientist',\r
      handle: '@caseypark',\r
      borderColor: '#EF4444',\r
      gradient: 'linear-gradient(195deg,#EF4444,#000)',\r
      url: 'https://kaggle.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=25',\r
      title: 'Sam Kim',\r
      subtitle: 'Mobile Developer',\r
      handle: '@thesamkim',\r
      borderColor: '#8B5CF6',\r
      gradient: 'linear-gradient(225deg,#8B5CF6,#000)',\r
      url: 'https://github.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=60',\r
      title: 'Tyler Rodriguez',\r
      subtitle: 'Cloud Architect',\r
      handle: '@tylerrod',\r
      borderColor: '#06B6D4',\r
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',\r
      url: 'https://aws.amazon.com/'\r
    }\r
  ];\r
\r
  const data = items?.length ? items : demo;\r
\r
  useEffect(() => {\r
    const el = rootRef.current;\r
    if (!el) return;\r
    setX.current = gsap.quickSetter(el, '--x', 'px');\r
    setY.current = gsap.quickSetter(el, '--y', 'px');\r
    const { width, height } = el.getBoundingClientRect();\r
    pos.current = { x: width / 2, y: height / 2 };\r
    setX.current(pos.current.x);\r
    setY.current(pos.current.y);\r
  }, []);\r
\r
  const moveTo = (x, y) => {\r
    gsap.to(pos.current, {\r
      x,\r
      y,\r
      duration: damping,\r
      ease,\r
      onUpdate: () => {\r
        setX.current?.(pos.current.x);\r
        setY.current?.(pos.current.y);\r
      },\r
      overwrite: true\r
    });\r
  };\r
\r
  const handleMove = e => {\r
    const r = rootRef.current.getBoundingClientRect();\r
    moveTo(e.clientX - r.left, e.clientY - r.top);\r
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });\r
  };\r
\r
  const handleLeave = () => {\r
    gsap.to(fadeRef.current, {\r
      opacity: 1,\r
      duration: fadeOut,\r
      overwrite: true\r
    });\r
  };\r
\r
  const handleCardClick = url => {\r
    if (url) window.open(url, '_blank', 'noopener,noreferrer');\r
  };\r
\r
  const handleCardMove = e => {\r
    const c = e.currentTarget;\r
    const rect = c.getBoundingClientRect();\r
    c.style.setProperty('--mouse-x', \`\${e.clientX - rect.left}px\`);\r
    c.style.setProperty('--mouse-y', \`\${e.clientY - rect.top}px\`);\r
  };\r
\r
  return (\r
    <div\r
      ref={rootRef}\r
      onPointerMove={handleMove}\r
      onPointerLeave={handleLeave}\r
      className={\`relative w-full h-full flex flex-wrap justify-center items-start gap-3 \${className}\`}\r
      style={{\r
        '--r': \`\${radius}px\`,\r
        '--x': '50%',\r
        '--y': '50%'\r
      }}\r
    >\r
      {data.map((c, i) => (\r
        <article\r
          key={i}\r
          onMouseMove={handleCardMove}\r
          onClick={() => handleCardClick(c.url)}\r
          className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"\r
          style={{\r
            '--card-border': c.borderColor || 'transparent',\r
            background: c.gradient,\r
            '--spotlight-color': 'rgba(255,255,255,0.3)'\r
          }}\r
        >\r
          <div\r
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"\r
            style={{\r
              background:\r
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'\r
            }}\r
          />\r
          <div className="relative z-10 flex-1 p-[10px] box-border">\r
            <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover rounded-[10px]" />\r
          </div>\r
          <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">\r
            <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>\r
            {c.handle && <span className="text-[0.95rem] opacity-80 text-right">{c.handle}</span>}\r
            <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>\r
            {c.location && <span className="text-[0.85rem] opacity-85 text-right">{c.location}</span>}\r
          </footer>\r
        </article>\r
      ))}\r
      <div\r
        className="absolute inset-0 pointer-events-none z-30"\r
        style={{\r
          backdropFilter: 'grayscale(1) brightness(0.78)',\r
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',\r
          background: 'rgba(0,0,0,0.001)',\r
          maskImage:\r
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',\r
          WebkitMaskImage:\r
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'\r
        }}\r
      />\r
      <div\r
        ref={fadeRef}\r
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"\r
        style={{\r
          backdropFilter: 'grayscale(1) brightness(0.78)',\r
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',\r
          background: 'rgba(0,0,0,0.001)',\r
          maskImage:\r
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',\r
          WebkitMaskImage:\r
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',\r
          opacity: 1\r
        }}\r
      />\r
    </div>\r
  );\r
};\r
\r
export default ChromaGrid;\r
`,L=`import React, { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import './ChromaGrid.css';\r
\r
export interface ChromaItem {\r
  image: string;\r
  title: string;\r
  subtitle: string;\r
  handle?: string;\r
  location?: string;\r
  borderColor?: string;\r
  gradient?: string;\r
  url?: string;\r
}\r
\r
export interface ChromaGridProps {\r
  items?: ChromaItem[];\r
  className?: string;\r
  radius?: number;\r
  columns?: number;\r
  rows?: number;\r
  damping?: number;\r
  fadeOut?: number;\r
  ease?: string;\r
}\r
\r
type SetterFn = (v: number | string) => void;\r
\r
export const ChromaGrid: React.FC<ChromaGridProps> = ({\r
  items,\r
  className = '',\r
  radius = 300,\r
  columns = 3,\r
  rows = 2,\r
  damping = 0.45,\r
  fadeOut = 0.6,\r
  ease = 'power3.out'\r
}) => {\r
  const rootRef = useRef<HTMLDivElement>(null);\r
  const fadeRef = useRef<HTMLDivElement>(null);\r
  const setX = useRef<SetterFn | null>(null);\r
  const setY = useRef<SetterFn | null>(null);\r
  const pos = useRef({ x: 0, y: 0 });\r
\r
  const demo: ChromaItem[] = [\r
    {\r
      image: 'https://i.pravatar.cc/300?img=8',\r
      title: 'Alex Rivera',\r
      subtitle: 'Full Stack Developer',\r
      handle: '@alexrivera',\r
      borderColor: '#4F46E5',\r
      gradient: 'linear-gradient(145deg, #4F46E5, #000)',\r
      url: 'https://github.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=11',\r
      title: 'Jordan Chen',\r
      subtitle: 'DevOps Engineer',\r
      handle: '@jordanchen',\r
      borderColor: '#10B981',\r
      gradient: 'linear-gradient(210deg, #10B981, #000)',\r
      url: 'https://linkedin.com/in/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=3',\r
      title: 'Morgan Blake',\r
      subtitle: 'UI/UX Designer',\r
      handle: '@morganblake',\r
      borderColor: '#F59E0B',\r
      gradient: 'linear-gradient(165deg, #F59E0B, #000)',\r
      url: 'https://dribbble.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=16',\r
      title: 'Casey Park',\r
      subtitle: 'Data Scientist',\r
      handle: '@caseypark',\r
      borderColor: '#EF4444',\r
      gradient: 'linear-gradient(195deg, #EF4444, #000)',\r
      url: 'https://kaggle.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=25',\r
      title: 'Sam Kim',\r
      subtitle: 'Mobile Developer',\r
      handle: '@thesamkim',\r
      borderColor: '#8B5CF6',\r
      gradient: 'linear-gradient(225deg, #8B5CF6, #000)',\r
      url: 'https://github.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=60',\r
      title: 'Tyler Rodriguez',\r
      subtitle: 'Cloud Architect',\r
      handle: '@tylerrod',\r
      borderColor: '#06B6D4',\r
      gradient: 'linear-gradient(135deg, #06B6D4, #000)',\r
      url: 'https://aws.amazon.com/'\r
    }\r
  ];\r
  const data = items?.length ? items : demo;\r
\r
  useEffect(() => {\r
    const el = rootRef.current;\r
    if (!el) return;\r
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;\r
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;\r
    const { width, height } = el.getBoundingClientRect();\r
    pos.current = { x: width / 2, y: height / 2 };\r
    setX.current(pos.current.x);\r
    setY.current(pos.current.y);\r
  }, []);\r
\r
  const moveTo = (x: number, y: number) => {\r
    gsap.to(pos.current, {\r
      x,\r
      y,\r
      duration: damping,\r
      ease,\r
      onUpdate: () => {\r
        setX.current?.(pos.current.x);\r
        setY.current?.(pos.current.y);\r
      },\r
      overwrite: true\r
    });\r
  };\r
\r
  const handleMove = (e: React.PointerEvent) => {\r
    const r = rootRef.current!.getBoundingClientRect();\r
    moveTo(e.clientX - r.left, e.clientY - r.top);\r
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });\r
  };\r
\r
  const handleLeave = () => {\r
    gsap.to(fadeRef.current, {\r
      opacity: 1,\r
      duration: fadeOut,\r
      overwrite: true\r
    });\r
  };\r
\r
  const handleCardClick = (url?: string) => {\r
    if (url) {\r
      window.open(url, '_blank', 'noopener,noreferrer');\r
    }\r
  };\r
\r
  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {\r
    const card = e.currentTarget as HTMLElement;\r
    const rect = card.getBoundingClientRect();\r
    const x = e.clientX - rect.left;\r
    const y = e.clientY - rect.top;\r
    card.style.setProperty('--mouse-x', \`\${x}px\`);\r
    card.style.setProperty('--mouse-y', \`\${y}px\`);\r
  };\r
\r
  return (\r
    <div\r
      ref={rootRef}\r
      className={\`chroma-grid \${className}\`}\r
      style={\r
        {\r
          '--r': \`\${radius}px\`,\r
          '--cols': columns,\r
          '--rows': rows\r
        } as React.CSSProperties\r
      }\r
      onPointerMove={handleMove}\r
      onPointerLeave={handleLeave}\r
    >\r
      {data.map((c, i) => (\r
        <article\r
          key={i}\r
          className="chroma-card"\r
          onMouseMove={handleCardMove}\r
          onClick={() => handleCardClick(c.url)}\r
          style={\r
            {\r
              '--card-border': c.borderColor || 'transparent',\r
              '--card-gradient': c.gradient,\r
              cursor: c.url ? 'pointer' : 'default'\r
            } as React.CSSProperties\r
          }\r
        >\r
          <div className="chroma-img-wrapper">\r
            <img src={c.image} alt={c.title} loading="lazy" />\r
          </div>\r
          <footer className="chroma-info">\r
            <h3 className="name">{c.title}</h3>\r
            {c.handle && <span className="handle">{c.handle}</span>}\r
            <p className="role">{c.subtitle}</p>\r
            {c.location && <span className="location">{c.location}</span>}\r
          </footer>\r
        </article>\r
      ))}\r
      <div className="chroma-overlay" />\r
      <div ref={fadeRef} className="chroma-fade" />\r
    </div>\r
  );\r
};\r
\r
export default ChromaGrid;\r
`,G=`import React, { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
\r
export interface ChromaItem {\r
  image: string;\r
  title: string;\r
  subtitle: string;\r
  handle?: string;\r
  location?: string;\r
  borderColor?: string;\r
  gradient?: string;\r
  url?: string;\r
}\r
\r
export interface ChromaGridProps {\r
  items?: ChromaItem[];\r
  className?: string;\r
  radius?: number;\r
  damping?: number;\r
  fadeOut?: number;\r
  ease?: string;\r
}\r
\r
type SetterFn = (v: number | string) => void;\r
\r
const ChromaGrid: React.FC<ChromaGridProps> = ({\r
  items,\r
  className = '',\r
  radius = 300,\r
  damping = 0.45,\r
  fadeOut = 0.6,\r
  ease = 'power3.out'\r
}) => {\r
  const rootRef = useRef<HTMLDivElement>(null);\r
  const fadeRef = useRef<HTMLDivElement>(null);\r
  const setX = useRef<SetterFn | null>(null);\r
  const setY = useRef<SetterFn | null>(null);\r
  const pos = useRef({ x: 0, y: 0 });\r
\r
  const demo: ChromaItem[] = [\r
    {\r
      image: 'https://i.pravatar.cc/300?img=8',\r
      title: 'Alex Rivera',\r
      subtitle: 'Full Stack Developer',\r
      handle: '@alexrivera',\r
      borderColor: '#4F46E5',\r
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',\r
      url: 'https://github.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=11',\r
      title: 'Jordan Chen',\r
      subtitle: 'DevOps Engineer',\r
      handle: '@jordanchen',\r
      borderColor: '#10B981',\r
      gradient: 'linear-gradient(210deg,#10B981,#000)',\r
      url: 'https://linkedin.com/in/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=3',\r
      title: 'Morgan Blake',\r
      subtitle: 'UI/UX Designer',\r
      handle: '@morganblake',\r
      borderColor: '#F59E0B',\r
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',\r
      url: 'https://dribbble.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=16',\r
      title: 'Casey Park',\r
      subtitle: 'Data Scientist',\r
      handle: '@caseypark',\r
      borderColor: '#EF4444',\r
      gradient: 'linear-gradient(195deg,#EF4444,#000)',\r
      url: 'https://kaggle.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=25',\r
      title: 'Sam Kim',\r
      subtitle: 'Mobile Developer',\r
      handle: '@thesamkim',\r
      borderColor: '#8B5CF6',\r
      gradient: 'linear-gradient(225deg,#8B5CF6,#000)',\r
      url: 'https://github.com/'\r
    },\r
    {\r
      image: 'https://i.pravatar.cc/300?img=60',\r
      title: 'Tyler Rodriguez',\r
      subtitle: 'Cloud Architect',\r
      handle: '@tylerrod',\r
      borderColor: '#06B6D4',\r
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',\r
      url: 'https://aws.amazon.com/'\r
    }\r
  ];\r
\r
  const data = items?.length ? items : demo;\r
\r
  useEffect(() => {\r
    const el = rootRef.current;\r
    if (!el) return;\r
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;\r
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;\r
    const { width, height } = el.getBoundingClientRect();\r
    pos.current = { x: width / 2, y: height / 2 };\r
    setX.current(pos.current.x);\r
    setY.current(pos.current.y);\r
  }, []);\r
\r
  const moveTo = (x: number, y: number) => {\r
    gsap.to(pos.current, {\r
      x,\r
      y,\r
      duration: damping,\r
      ease,\r
      onUpdate: () => {\r
        setX.current?.(pos.current.x);\r
        setY.current?.(pos.current.y);\r
      },\r
      overwrite: true\r
    });\r
  };\r
\r
  const handleMove = (e: React.PointerEvent) => {\r
    const r = rootRef.current!.getBoundingClientRect();\r
    moveTo(e.clientX - r.left, e.clientY - r.top);\r
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });\r
  };\r
\r
  const handleLeave = () => {\r
    gsap.to(fadeRef.current, {\r
      opacity: 1,\r
      duration: fadeOut,\r
      overwrite: true\r
    });\r
  };\r
\r
  const handleCardClick = (url?: string) => {\r
    if (url) window.open(url, '_blank', 'noopener,noreferrer');\r
  };\r
\r
  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {\r
    const c = e.currentTarget as HTMLElement;\r
    const rect = c.getBoundingClientRect();\r
    c.style.setProperty('--mouse-x', \`\${e.clientX - rect.left}px\`);\r
    c.style.setProperty('--mouse-y', \`\${e.clientY - rect.top}px\`);\r
  };\r
\r
  return (\r
    <div\r
      ref={rootRef}\r
      onPointerMove={handleMove}\r
      onPointerLeave={handleLeave}\r
      className={\`relative w-full h-full flex flex-wrap justify-center items-start gap-3 \${className}\`}\r
      style={\r
        {\r
          '--r': \`\${radius}px\`,\r
          '--x': '50%',\r
          '--y': '50%'\r
        } as React.CSSProperties\r
      }\r
    >\r
      {data.map((c, i) => (\r
        <article\r
          key={i}\r
          onMouseMove={handleCardMove}\r
          onClick={() => handleCardClick(c.url)}\r
          className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"\r
          style={\r
            {\r
              '--card-border': c.borderColor || 'transparent',\r
              background: c.gradient,\r
              '--spotlight-color': 'rgba(255,255,255,0.3)'\r
            } as React.CSSProperties\r
          }\r
        >\r
          <div\r
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"\r
            style={{\r
              background:\r
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'\r
            }}\r
          />\r
          <div className="relative z-10 flex-1 p-[10px] box-border">\r
            <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover rounded-[10px]" />\r
          </div>\r
          <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">\r
            <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>\r
            {c.handle && <span className="text-[0.95rem] opacity-80 text-right">{c.handle}</span>}\r
            <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>\r
            {c.location && <span className="text-[0.85rem] opacity-85 text-right">{c.location}</span>}\r
          </footer>\r
        </article>\r
      ))}\r
      <div\r
        className="absolute inset-0 pointer-events-none z-30"\r
        style={{\r
          backdropFilter: 'grayscale(1) brightness(0.78)',\r
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',\r
          background: 'rgba(0,0,0,0.001)',\r
          maskImage:\r
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',\r
          WebkitMaskImage:\r
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'\r
        }}\r
      />\r
      <div\r
        ref={fadeRef}\r
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"\r
        style={{\r
          backdropFilter: 'grayscale(1) brightness(0.78)',\r
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',\r
          background: 'rgba(0,0,0,0.001)',\r
          maskImage:\r
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',\r
          WebkitMaskImage:\r
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',\r
          opacity: 1\r
        }}\r
      />\r
    </div>\r
  );\r
};\r
\r
export default ChromaGrid;\r
`,I={dependencies:"gsap",usage:`import ChromaGrid from './ChromaGrid'

const items = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  }
];

<div style={{ height: '600px', position: 'relative' }}>
  <ChromaGrid 
    items={items}
    radius={300}
    damping={0.45}
    fadeOut={0.6}
    ease="power3.out"
  />
</div>`,code:T,css:X,tailwind:Y,tsCode:L,tsTailwind:G},$=({items:n,className:u="",radius:m=300,columns:h=3,rows:b=2,damping:v=.45,fadeOut:f=.6,ease:y="power3.out"})=>{const g=i.useRef(null),p=i.useRef(null),s=i.useRef(null),l=i.useRef(null),o=i.useRef({x:0,y:0}),x=[{image:"https://i.pravatar.cc/300?img=8",title:"Alex Rivera",subtitle:"Full Stack Developer",handle:"@alexrivera",borderColor:"#4F46E5",gradient:"linear-gradient(145deg, #4F46E5, #000)",url:"https://github.com/"},{image:"https://i.pravatar.cc/300?img=11",title:"Jordan Chen",subtitle:"DevOps Engineer",handle:"@jordanchen",borderColor:"#10B981",gradient:"linear-gradient(210deg, #10B981, #000)",url:"https://linkedin.com/in/"},{image:"https://i.pravatar.cc/300?img=3",title:"Morgan Blake",subtitle:"UI/UX Designer",handle:"@morganblake",borderColor:"#F59E0B",gradient:"linear-gradient(165deg, #F59E0B, #000)",url:"https://dribbble.com/"},{image:"https://i.pravatar.cc/300?img=16",title:"Casey Park",subtitle:"Data Scientist",handle:"@caseypark",borderColor:"#EF4444",gradient:"linear-gradient(195deg, #EF4444, #000)",url:"https://kaggle.com/"},{image:"https://i.pravatar.cc/300?img=25",title:"Sam Kim",subtitle:"Mobile Developer",handle:"@thesamkim",borderColor:"#8B5CF6",gradient:"linear-gradient(225deg, #8B5CF6, #000)",url:"https://github.com/"},{image:"https://i.pravatar.cc/300?img=60",title:"Tyler Rodriguez",subtitle:"Cloud Architect",handle:"@tylerrod",borderColor:"#06B6D4",gradient:"linear-gradient(135deg, #06B6D4, #000)",url:"https://aws.amazon.com/"}],C=n!=null&&n.length?n:x;i.useEffect(()=>{const r=g.current;if(!r)return;s.current=c.quickSetter(r,"--x","px"),l.current=c.quickSetter(r,"--y","px");const{width:t,height:a}=r.getBoundingClientRect();o.current={x:t/2,y:a/2},s.current(o.current.x),l.current(o.current.y)},[]);const k=(r,t)=>{c.to(o.current,{x:r,y:t,duration:v,ease:y,onUpdate:()=>{var a,d;(a=s.current)==null||a.call(s,o.current.x),(d=l.current)==null||d.call(l,o.current.y)},overwrite:!0})},w=r=>{const t=g.current.getBoundingClientRect();k(r.clientX-t.left,r.clientY-t.top),c.to(p.current,{opacity:0,duration:.25,overwrite:!0})},R=()=>{c.to(p.current,{opacity:1,duration:f,overwrite:!0})},B=r=>{r&&window.open(r,"_blank","noopener,noreferrer")},F=r=>{const t=r.currentTarget,a=t.getBoundingClientRect(),d=r.clientX-a.left,N=r.clientY-a.top;t.style.setProperty("--mouse-x",`${d}px`),t.style.setProperty("--mouse-y",`${N}px`)};return e.jsxs("div",{ref:g,className:`chroma-grid ${u}`,style:{"--r":`${m}px`,"--cols":h,"--rows":b},onPointerMove:w,onPointerLeave:R,children:[C.map((r,t)=>e.jsxs("article",{className:"chroma-card",onMouseMove:F,onClick:()=>B(r.url),style:{"--card-border":r.borderColor||"transparent","--card-gradient":r.gradient,cursor:r.url?"pointer":"default"},children:[e.jsx("div",{className:"chroma-img-wrapper",children:e.jsx("img",{src:r.image,alt:r.title,loading:"lazy"})}),e.jsxs("footer",{className:"chroma-info",children:[e.jsx("h3",{className:"name",children:r.title}),r.handle&&e.jsx("span",{className:"handle",children:r.handle}),e.jsx("p",{className:"role",children:r.subtitle}),r.location&&e.jsx("span",{className:"location",children:r.location})]})]},t)),e.jsx("div",{className:"chroma-overlay"}),e.jsx("div",{ref:p,className:"chroma-fade"})]})},H=()=>{const n=[{name:"items",type:"Array",default:"Demo []",description:"Array of ChromaItem objects to display in the grid"},{name:"className",type:"string",default:"''",description:"Additional CSS classes to apply to the grid container"},{name:"radius",type:"number",default:"300",description:"Size of the spotlight effect in pixels"},{name:"damping",type:"number",default:"0.45",description:"Cursor follow animation duration in seconds"},{name:"fadeOut",type:"number",default:"0.6",description:"Fade-out animation duration in seconds when mouse leaves"},{name:"ease",type:"string",default:"'power3.out'",description:"GSAP easing function for animations"}];return e.jsxs(M,{children:[e.jsxs(S,{children:[e.jsx(E,{position:"relative",className:"demo-container",h:"auto",overflow:"hidden",p:0,py:6,children:e.jsx($,{})}),e.jsx(D,{data:n}),e.jsx(z,{dependencyList:["gsap"]})]}),e.jsx(P,{children:e.jsx(j,{codeObject:I})})]})};export{H as default};
