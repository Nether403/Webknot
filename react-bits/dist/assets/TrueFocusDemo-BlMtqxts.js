import{r as e,j as r,q as y,B as M,F,T}from"./index-wsKSLPNH.js";import{T as S,P as N,a as E,C as B,b as D}from"./PropTable-C4uPWs8h.js";import{D as j}from"./Dependencies-BHoMfJUj.js";import{P as g}from"./PreviewSlider-m1G_aiYP.js";import{P as L}from"./PreviewSwitch-DqnF708j.js";import{C as $}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";const P=({sentence:i="True Focus",manualMode:o=!1,blurAmount:l=5,borderColor:m="green",glowColor:d="rgba(0, 255, 0, 0.6)",animationDuration:c=.5,pauseBetweenAnimations:p=1})=>{const u=i.split(" "),[t,f]=e.useState(0),[b,h]=e.useState(null),a=e.useRef(null),v=e.useRef([]),[x,R]=e.useState({x:0,y:0,width:0,height:0});e.useEffect(()=>{if(!o){const s=setInterval(()=>{f(n=>(n+1)%u.length)},(c+p)*1e3);return()=>clearInterval(s)}},[o,c,p,u.length]),e.useEffect(()=>{if(t===null||t===-1||!v.current[t]||!a.current)return;const s=a.current.getBoundingClientRect(),n=v.current[t].getBoundingClientRect();R({x:n.left-s.left,y:n.top-s.top,width:n.width,height:n.height})},[t,u.length]);const C=s=>{o&&(h(s),f(s))},I=()=>{o&&f(b)};return r.jsxs("div",{className:"focus-container",ref:a,children:[u.map((s,n)=>{const w=n===t;return r.jsx("span",{ref:A=>v.current[n]=A,className:`focus-word ${o?"manual":""} ${w&&!o?"active":""}`,style:{filter:o?w?"blur(0px)":`blur(${l}px)`:w?"blur(0px)":`blur(${l}px)`,"--border-color":m,"--glow-color":d,transition:`filter ${c}s ease`},onMouseEnter:()=>C(n),onMouseLeave:I,children:s},n)}),r.jsxs(y.div,{className:"focus-frame",animate:{x:x.x,y:x.y,width:x.width,height:x.height,opacity:t>=0?1:0},transition:{duration:c},style:{"--border-color":m,"--glow-color":d},children:[r.jsx("span",{className:"corner top-left"}),r.jsx("span",{className:"corner top-right"}),r.jsx("span",{className:"corner bottom-left"}),r.jsx("span",{className:"corner bottom-right"})]})]})},k=`import { useEffect, useRef, useState } from 'react';\r
import { motion } from 'motion/react';\r
import './TrueFocus.css';\r
\r
const TrueFocus = ({\r
  sentence = 'True Focus',\r
  manualMode = false,\r
  blurAmount = 5,\r
  borderColor = 'green',\r
  glowColor = 'rgba(0, 255, 0, 0.6)',\r
  animationDuration = 0.5,\r
  pauseBetweenAnimations = 1\r
}) => {\r
  const words = sentence.split(' ');\r
  const [currentIndex, setCurrentIndex] = useState(0);\r
  const [lastActiveIndex, setLastActiveIndex] = useState(null);\r
  const containerRef = useRef(null);\r
  const wordRefs = useRef([]);\r
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });\r
\r
  useEffect(() => {\r
    if (!manualMode) {\r
      const interval = setInterval(\r
        () => {\r
          setCurrentIndex(prev => (prev + 1) % words.length);\r
        },\r
        (animationDuration + pauseBetweenAnimations) * 1000\r
      );\r
\r
      return () => clearInterval(interval);\r
    }\r
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);\r
\r
  useEffect(() => {\r
    if (currentIndex === null || currentIndex === -1) return;\r
\r
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;\r
\r
    const parentRect = containerRef.current.getBoundingClientRect();\r
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();\r
\r
    setFocusRect({\r
      x: activeRect.left - parentRect.left,\r
      y: activeRect.top - parentRect.top,\r
      width: activeRect.width,\r
      height: activeRect.height\r
    });\r
  }, [currentIndex, words.length]);\r
\r
  const handleMouseEnter = index => {\r
    if (manualMode) {\r
      setLastActiveIndex(index);\r
      setCurrentIndex(index);\r
    }\r
  };\r
\r
  const handleMouseLeave = () => {\r
    if (manualMode) {\r
      setCurrentIndex(lastActiveIndex);\r
    }\r
  };\r
\r
  return (\r
    <div className="focus-container" ref={containerRef}>\r
      {words.map((word, index) => {\r
        const isActive = index === currentIndex;\r
        return (\r
          <span\r
            key={index}\r
            ref={el => (wordRefs.current[index] = el)}\r
            className={\`focus-word \${manualMode ? 'manual' : ''} \${isActive && !manualMode ? 'active' : ''}\`}\r
            style={{\r
              filter: manualMode\r
                ? isActive\r
                  ? \`blur(0px)\`\r
                  : \`blur(\${blurAmount}px)\`\r
                : isActive\r
                  ? \`blur(0px)\`\r
                  : \`blur(\${blurAmount}px)\`,\r
              '--border-color': borderColor,\r
              '--glow-color': glowColor,\r
              transition: \`filter \${animationDuration}s ease\`\r
            }}\r
            onMouseEnter={() => handleMouseEnter(index)}\r
            onMouseLeave={handleMouseLeave}\r
          >\r
            {word}\r
          </span>\r
        );\r
      })}\r
\r
      <motion.div\r
        className="focus-frame"\r
        animate={{\r
          x: focusRect.x,\r
          y: focusRect.y,\r
          width: focusRect.width,\r
          height: focusRect.height,\r
          opacity: currentIndex >= 0 ? 1 : 0\r
        }}\r
        transition={{\r
          duration: animationDuration\r
        }}\r
        style={{\r
          '--border-color': borderColor,\r
          '--glow-color': glowColor\r
        }}\r
      >\r
        <span className="corner top-left"></span>\r
        <span className="corner top-right"></span>\r
        <span className="corner bottom-left"></span>\r
        <span className="corner bottom-right"></span>\r
      </motion.div>\r
    </div>\r
  );\r
};\r
\r
export default TrueFocus;\r
`,H=`.focus-container {\r
  position: relative;\r
  display: flex;\r
  gap: 1em;\r
  justify-content: center;\r
  align-items: center;\r
  flex-wrap: wrap;\r
}\r
\r
.focus-word {\r
  position: relative;\r
  font-size: 3rem;\r
  font-weight: 900;\r
  cursor: pointer;\r
  transition:\r
    filter 0.3s ease,\r
    color 0.3s ease;\r
}\r
\r
.focus-word.active {\r
  filter: blur(0);\r
}\r
\r
.focus-frame {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  pointer-events: none;\r
  box-sizing: content-box;\r
  border: none;\r
}\r
\r
.corner {\r
  position: absolute;\r
  width: 1rem;\r
  height: 1rem;\r
  border: 3px solid var(--border-color, #fff);\r
  filter: drop-shadow(0px 0px 4px var(--border-color, #fff));\r
  border-radius: 3px;\r
  transition: none;\r
}\r
\r
.top-left {\r
  top: -10px;\r
  left: -10px;\r
  border-right: none;\r
  border-bottom: none;\r
}\r
\r
.top-right {\r
  top: -10px;\r
  right: -10px;\r
  border-left: none;\r
  border-bottom: none;\r
}\r
\r
.bottom-left {\r
  bottom: -10px;\r
  left: -10px;\r
  border-right: none;\r
  border-top: none;\r
}\r
\r
.bottom-right {\r
  bottom: -10px;\r
  right: -10px;\r
  border-left: none;\r
  border-top: none;\r
}\r
`,z=`import { useEffect, useRef, useState } from 'react';\r
import { motion } from 'motion/react';\r
\r
const TrueFocus = ({\r
  sentence = 'True Focus',\r
  manualMode = false,\r
  blurAmount = 5,\r
  borderColor = 'green',\r
  glowColor = 'rgba(0, 255, 0, 0.6)',\r
  animationDuration = 0.5,\r
  pauseBetweenAnimations = 1\r
}) => {\r
  const words = sentence.split(' ');\r
  const [currentIndex, setCurrentIndex] = useState(0);\r
  const [lastActiveIndex, setLastActiveIndex] = useState(null);\r
  const containerRef = useRef(null);\r
  const wordRefs = useRef([]);\r
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });\r
\r
  useEffect(() => {\r
    if (!manualMode) {\r
      const interval = setInterval(\r
        () => {\r
          setCurrentIndex(prev => (prev + 1) % words.length);\r
        },\r
        (animationDuration + pauseBetweenAnimations) * 1000\r
      );\r
\r
      return () => clearInterval(interval);\r
    }\r
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);\r
\r
  useEffect(() => {\r
    if (currentIndex === null || currentIndex === -1) return;\r
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;\r
\r
    const parentRect = containerRef.current.getBoundingClientRect();\r
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();\r
\r
    setFocusRect({\r
      x: activeRect.left - parentRect.left,\r
      y: activeRect.top - parentRect.top,\r
      width: activeRect.width,\r
      height: activeRect.height\r
    });\r
  }, [currentIndex, words.length]);\r
\r
  const handleMouseEnter = index => {\r
    if (manualMode) {\r
      setLastActiveIndex(index);\r
      setCurrentIndex(index);\r
    }\r
  };\r
\r
  const handleMouseLeave = () => {\r
    if (manualMode) {\r
      setCurrentIndex(lastActiveIndex);\r
    }\r
  };\r
\r
  return (\r
    <div className="relative flex gap-4 justify-center items-center flex-wrap" ref={containerRef}>\r
      {words.map((word, index) => {\r
        const isActive = index === currentIndex;\r
        return (\r
          <span\r
            key={index}\r
            ref={el => (wordRefs.current[index] = el)}\r
            className="relative text-[3rem] font-black cursor-pointer"\r
            style={{\r
              filter: manualMode\r
                ? isActive\r
                  ? \`blur(0px)\`\r
                  : \`blur(\${blurAmount}px)\`\r
                : isActive\r
                  ? \`blur(0px)\`\r
                  : \`blur(\${blurAmount}px)\`,\r
              '--border-color': borderColor,\r
              '--glow-color': glowColor,\r
              transition: \`filter \${animationDuration}s ease\`\r
            }}\r
            onMouseEnter={() => handleMouseEnter(index)}\r
            onMouseLeave={handleMouseLeave}\r
          >\r
            {word}\r
          </span>\r
        );\r
      })}\r
\r
      <motion.div\r
        className="absolute top-0 left-0 pointer-events-none box-border border-0"\r
        animate={{\r
          x: focusRect.x,\r
          y: focusRect.y,\r
          width: focusRect.width,\r
          height: focusRect.height,\r
          opacity: currentIndex >= 0 ? 1 : 0\r
        }}\r
        transition={{\r
          duration: animationDuration\r
        }}\r
        style={{\r
          '--border-color': borderColor,\r
          '--glow-color': glowColor\r
        }}\r
      >\r
        <span\r
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"\r
          style={{\r
            borderColor: 'var(--border-color)',\r
            filter: 'drop-shadow(0 0 4px var(--border-color))'\r
          }}\r
        ></span>\r
        <span\r
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"\r
          style={{\r
            borderColor: 'var(--border-color)',\r
            filter: 'drop-shadow(0 0 4px var(--border-color))'\r
          }}\r
        ></span>\r
        <span\r
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"\r
          style={{\r
            borderColor: 'var(--border-color)',\r
            filter: 'drop-shadow(0 0 4px var(--border-color))'\r
          }}\r
        ></span>\r
        <span\r
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"\r
          style={{\r
            borderColor: 'var(--border-color)',\r
            filter: 'drop-shadow(0 0 4px var(--border-color))'\r
          }}\r
        ></span>\r
      </motion.div>\r
    </div>\r
  );\r
};\r
\r
export default TrueFocus;\r
`,O=`import { useEffect, useRef, useState, RefObject } from 'react';\r
import { motion } from 'motion/react';\r
import './TrueFocus.css';\r
\r
interface TrueFocusProps {\r
  sentence?: string;\r
  manualMode?: boolean;\r
  blurAmount?: number;\r
  borderColor?: string;\r
  glowColor?: string;\r
  animationDuration?: number;\r
  pauseBetweenAnimations?: number;\r
}\r
\r
interface FocusRect {\r
  x: number;\r
  y: number;\r
  width: number;\r
  height: number;\r
}\r
\r
const TrueFocus: React.FC<TrueFocusProps> = ({\r
  sentence = 'True Focus',\r
  manualMode = false,\r
  blurAmount = 5,\r
  borderColor = 'green',\r
  glowColor = 'rgba(0, 255, 0, 0.6)',\r
  animationDuration = 0.5,\r
  pauseBetweenAnimations = 1\r
}) => {\r
  const words = sentence.split(' ');\r
  const [currentIndex, setCurrentIndex] = useState<number>(0);\r
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const wordRefs: React.MutableRefObject<(HTMLSpanElement | null)[]> = useRef([]);\r
  const [focusRect, setFocusRect] = useState<FocusRect>({\r
    x: 0,\r
    y: 0,\r
    width: 0,\r
    height: 0\r
  });\r
\r
  useEffect(() => {\r
    if (!manualMode) {\r
      const interval = setInterval(\r
        () => {\r
          setCurrentIndex(prev => (prev + 1) % words.length);\r
        },\r
        (animationDuration + pauseBetweenAnimations) * 1000\r
      );\r
\r
      return () => clearInterval(interval);\r
    }\r
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);\r
\r
  useEffect(() => {\r
    if (currentIndex === null || currentIndex === -1) return;\r
\r
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;\r
\r
    const parentRect = containerRef.current.getBoundingClientRect();\r
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();\r
\r
    setFocusRect({\r
      x: activeRect.left - parentRect.left,\r
      y: activeRect.top - parentRect.top,\r
      width: activeRect.width,\r
      height: activeRect.height\r
    });\r
  }, [currentIndex, words.length]);\r
\r
  const handleMouseEnter = (index: number) => {\r
    if (manualMode) {\r
      setLastActiveIndex(index);\r
      setCurrentIndex(index);\r
    }\r
  };\r
\r
  const handleMouseLeave = () => {\r
    if (manualMode) {\r
      setCurrentIndex(lastActiveIndex ?? 0);\r
    }\r
  };\r
\r
  return (\r
    <div className="focus-container" ref={containerRef}>\r
      {words.map((word, index) => {\r
        const isActive = index === currentIndex;\r
        return (\r
          <span\r
            key={index}\r
            ref={el => {\r
              if (el) {\r
                wordRefs.current[index] = el;\r
              }\r
            }}\r
            className={\`focus-word \${manualMode ? 'manual' : ''} \${isActive && !manualMode ? 'active' : ''}\`}\r
            style={\r
              {\r
                filter: manualMode\r
                  ? isActive\r
                    ? \`blur(0px)\`\r
                    : \`blur(\${blurAmount}px)\`\r
                  : isActive\r
                    ? \`blur(0px)\`\r
                    : \`blur(\${blurAmount}px)\`,\r
                transition: \`filter \${animationDuration}s ease\`,\r
                '--border-color': borderColor,\r
                '--glow-color': glowColor\r
              } as React.CSSProperties\r
            }\r
            onMouseEnter={() => handleMouseEnter(index)}\r
            onMouseLeave={handleMouseLeave}\r
          >\r
            {word}\r
          </span>\r
        );\r
      })}\r
\r
      <motion.div\r
        className="focus-frame"\r
        animate={{\r
          x: focusRect.x,\r
          y: focusRect.y,\r
          width: focusRect.width,\r
          height: focusRect.height,\r
          opacity: currentIndex >= 0 ? 1 : 0\r
        }}\r
        transition={{\r
          duration: animationDuration\r
        }}\r
        style={\r
          {\r
            '--border-color': borderColor,\r
            '--glow-color': glowColor\r
          } as React.CSSProperties\r
        }\r
      >\r
        <span className="corner top-left"></span>\r
        <span className="corner top-right"></span>\r
        <span className="corner bottom-left"></span>\r
        <span className="corner bottom-right"></span>\r
      </motion.div>\r
    </div>\r
  );\r
};\r
\r
export default TrueFocus;\r
`,U=`import { useEffect, useRef, useState } from 'react';\r
import { motion } from 'motion/react';\r
\r
interface TrueFocusProps {\r
  sentence?: string;\r
  manualMode?: boolean;\r
  blurAmount?: number;\r
  borderColor?: string;\r
  glowColor?: string;\r
  animationDuration?: number;\r
  pauseBetweenAnimations?: number;\r
}\r
\r
interface FocusRect {\r
  x: number;\r
  y: number;\r
  width: number;\r
  height: number;\r
}\r
\r
const TrueFocus: React.FC<TrueFocusProps> = ({\r
  sentence = 'True Focus',\r
  manualMode = false,\r
  blurAmount = 5,\r
  borderColor = 'green',\r
  glowColor = 'rgba(0, 255, 0, 0.6)',\r
  animationDuration = 0.5,\r
  pauseBetweenAnimations = 1\r
}) => {\r
  const words = sentence.split(' ');\r
  const [currentIndex, setCurrentIndex] = useState<number>(0);\r
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);\r
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });\r
\r
  useEffect(() => {\r
    if (!manualMode) {\r
      const interval = setInterval(\r
        () => {\r
          setCurrentIndex(prev => (prev + 1) % words.length);\r
        },\r
        (animationDuration + pauseBetweenAnimations) * 1000\r
      );\r
\r
      return () => clearInterval(interval);\r
    }\r
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);\r
\r
  useEffect(() => {\r
    if (currentIndex === null || currentIndex === -1) return;\r
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;\r
\r
    const parentRect = containerRef.current.getBoundingClientRect();\r
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();\r
\r
    setFocusRect({\r
      x: activeRect.left - parentRect.left,\r
      y: activeRect.top - parentRect.top,\r
      width: activeRect.width,\r
      height: activeRect.height\r
    });\r
  }, [currentIndex, words.length]);\r
\r
  const handleMouseEnter = (index: number) => {\r
    if (manualMode) {\r
      setLastActiveIndex(index);\r
      setCurrentIndex(index);\r
    }\r
  };\r
\r
  const handleMouseLeave = () => {\r
    if (manualMode) {\r
      setCurrentIndex(lastActiveIndex!);\r
    }\r
  };\r
\r
  return (\r
    <div className="relative flex gap-4 justify-center items-center flex-wrap" ref={containerRef}>\r
      {words.map((word, index) => {\r
        const isActive = index === currentIndex;\r
        return (\r
          <span\r
            key={index}\r
            ref={el => {\r
              wordRefs.current[index] = el;\r
            }}\r
            className="relative text-[3rem] font-black cursor-pointer"\r
            style={\r
              {\r
                filter: manualMode\r
                  ? isActive\r
                    ? \`blur(0px)\`\r
                    : \`blur(\${blurAmount}px)\`\r
                  : isActive\r
                    ? \`blur(0px)\`\r
                    : \`blur(\${blurAmount}px)\`,\r
                transition: \`filter \${animationDuration}s ease\`\r
              } as React.CSSProperties\r
            }\r
            onMouseEnter={() => handleMouseEnter(index)}\r
            onMouseLeave={handleMouseLeave}\r
          >\r
            {word}\r
          </span>\r
        );\r
      })}\r
\r
      <motion.div\r
        className="absolute top-0 left-0 pointer-events-none box-border border-0"\r
        animate={{\r
          x: focusRect.x,\r
          y: focusRect.y,\r
          width: focusRect.width,\r
          height: focusRect.height,\r
          opacity: currentIndex >= 0 ? 1 : 0\r
        }}\r
        transition={{\r
          duration: animationDuration\r
        }}\r
        style={\r
          {\r
            '--border-color': borderColor,\r
            '--glow-color': glowColor\r
          } as React.CSSProperties\r
        }\r
      >\r
        <span\r
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"\r
          style={{\r
            borderColor: 'var(--border-color)',\r
            filter: 'drop-shadow(0 0 4px var(--border-color))'\r
          }}\r
        ></span>\r
        <span\r
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"\r
          style={{\r
            borderColor: 'var(--border-color)',\r
            filter: 'drop-shadow(0 0 4px var(--border-color))'\r
          }}\r
        ></span>\r
        <span\r
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"\r
          style={{\r
            borderColor: 'var(--border-color)',\r
            filter: 'drop-shadow(0 0 4px var(--border-color))'\r
          }}\r
        ></span>\r
        <span\r
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"\r
          style={{\r
            borderColor: 'var(--border-color)',\r
            filter: 'drop-shadow(0 0 4px var(--border-color))'\r
          }}\r
        ></span>\r
      </motion.div>\r
    </div>\r
  );\r
};\r
\r
export default TrueFocus;\r
`,q={dependencies:"motion",usage:`import TrueFocus from './TrueFocus';

<TrueFocus 
sentence="True Focus"
manualMode={false}
blurAmount={5}
borderColor="red"
animationDuration={2}
pauseBetweenAnimations={1}
/>`,code:k,css:H,tailwind:z,tsCode:O,tsTailwind:U},Y=()=>{const[i,o]=e.useState(!1),[l,m]=e.useState(5),[d,c]=e.useState(.5),[p,u]=e.useState(1),[t,f]=e.useState("#5227FF"),b={sentence:"True Focus",manualMode:i,blurAmount:l,borderColor:t,animationDuration:d,pauseBetweenAnimations:p},h=[{name:"sentence",type:"string",default:"'True Focus'",description:"The text to display with the focus animation."},{name:"manualMode",type:"boolean",default:"false",description:"Disables automatic animation when set to true."},{name:"blurAmount",type:"number",default:"5",description:"The amount of blur applied to non-active words."},{name:"borderColor",type:"string",default:"'green'",description:"The color of the focus borders."},{name:"glowColor",type:"string",default:"'rgba(0, 255, 0, 0.6)'",description:"The color of the glowing effect on the borders."},{name:"animationDuration",type:"number",default:"0.5",description:"The duration of the animation for each word."},{name:"pauseBetweenAnimations",type:"number",default:"1",description:"Time to pause between focusing on each word (in auto mode)."}];return r.jsxs(S,{children:[r.jsxs(N,{children:[r.jsx(M,{position:"relative",className:"demo-container",minH:200,children:r.jsx(P,{...b})}),r.jsxs($,{children:[r.jsxs(F,{align:"center",gap:2,mt:4,children:[r.jsx(T,{fontSize:"sm",children:"Border Color"}),r.jsx("input",{type:"color",value:t,onChange:a=>f(a.target.value),style:{width:"40px",border:"none",padding:"0",background:"none",cursor:"pointer"}})]}),r.jsx(L,{title:"Hover Mode",isChecked:i,onChange:a=>o(a)}),r.jsx(g,{title:"Blur Amount",min:0,max:15,step:.5,value:l,valueUnit:"px",onChange:m}),r.jsx(g,{title:"Animation Duration",min:.1,max:3,step:.1,value:d,valueUnit:"s",isDisabled:!i,onChange:c}),r.jsx(g,{title:"Pause Between Animations",min:0,max:5,step:.5,value:p,valueUnit:"s",isDisabled:i,onChange:u})]}),r.jsx(E,{data:h}),r.jsx(j,{dependencyList:["motion"]})]}),r.jsx(B,{children:r.jsx(D,{codeObject:q})})]})};export{Y as default};
