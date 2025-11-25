import{r as a,g as m,j as r,B as b}from"./index-wsKSLPNH.js";import{T as y,P as I,a as A,C as R,b as k}from"./PropTable-C4uPWs8h.js";import{D as _}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";const N=({items:n=[],gradientColor:d="black"})=>{const w=a.useRef(null),c=a.useRef([]),l=a.useRef(window.innerWidth/2),u=28,p=Array.from({length:u},(i,e)=>`Item ${e+1}`),x=n.length>0?n.slice(0,u):p;return a.useEffect(()=>{m.ticker.lagSmoothing(0);const i=t=>{l.current=t.clientX},e=()=>{const f=[.6,.4,.3,.2];c.current.forEach((v,g)=>{if(v){const h=g%2===0?1:-1,M=(l.current/window.innerWidth*300-300/2)*h;m.to(v,{x:M,duration:.8+f[g%f.length],ease:"power3.out",overwrite:"auto"})}})},s=m.ticker.add(e);return window.addEventListener("mousemove",i),()=>{window.removeEventListener("mousemove",i),s()}},[]),r.jsx("div",{className:"noscroll loading",ref:w,children:r.jsxs("section",{className:"intro",style:{background:`radial-gradient(circle, ${d} 0%, transparent 100%)`},children:[r.jsx("div",{className:"gridMotion-container",children:[...Array(4)].map((i,e)=>r.jsx("div",{className:"row",ref:s=>c.current[e]=s,children:[...Array(7)].map((s,t)=>{const o=x[e*7+t];return r.jsx("div",{className:"row__item",children:r.jsx("div",{className:"row__item-inner",style:{backgroundColor:"#111"},children:typeof o=="string"&&o.startsWith("http")?r.jsx("div",{className:"row__item-img",style:{backgroundImage:`url(${o})`}}):r.jsx("div",{className:"row__item-content",children:o})})},t)})},e))}),r.jsx("div",{className:"fullview"})]})})},C=`import { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
import './GridMotion.css';\r
\r
const GridMotion = ({ items = [], gradientColor = 'black' }) => {\r
  const gridRef = useRef(null);\r
  const rowRefs = useRef([]);\r
  const mouseXRef = useRef(window.innerWidth / 2);\r
\r
  const totalItems = 28;\r
  const defaultItems = Array.from({ length: totalItems }, (_, index) => \`Item \${index + 1}\`);\r
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;\r
\r
  useEffect(() => {\r
    gsap.ticker.lagSmoothing(0);\r
\r
    const handleMouseMove = e => {\r
      mouseXRef.current = e.clientX;\r
    };\r
\r
    const updateMotion = () => {\r
      const maxMoveAmount = 300;\r
      const baseDuration = 0.8;\r
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];\r
\r
      rowRefs.current.forEach((row, index) => {\r
        if (row) {\r
          const direction = index % 2 === 0 ? 1 : -1;\r
          const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;\r
\r
          gsap.to(row, {\r
            x: moveAmount,\r
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],\r
            ease: 'power3.out',\r
            overwrite: 'auto'\r
          });\r
        }\r
      });\r
    };\r
\r
    const removeAnimationLoop = gsap.ticker.add(updateMotion);\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      removeAnimationLoop();\r
    };\r
  }, []);\r
\r
  return (\r
    <div className="noscroll loading" ref={gridRef}>\r
      <section\r
        className="intro"\r
        style={{\r
          background: \`radial-gradient(circle, \${gradientColor} 0%, transparent 100%)\`\r
        }}\r
      >\r
        <div className="gridMotion-container">\r
          {[...Array(4)].map((_, rowIndex) => (\r
            <div key={rowIndex} className="row" ref={el => (rowRefs.current[rowIndex] = el)}>\r
              {[...Array(7)].map((_, itemIndex) => {\r
                const content = combinedItems[rowIndex * 7 + itemIndex];\r
                return (\r
                  <div key={itemIndex} className="row__item">\r
                    <div className="row__item-inner" style={{ backgroundColor: '#111' }}>\r
                      {typeof content === 'string' && content.startsWith('http') ? (\r
                        <div\r
                          className="row__item-img"\r
                          style={{\r
                            backgroundImage: \`url(\${content})\`\r
                          }}\r
                        ></div>\r
                      ) : (\r
                        <div className="row__item-content">{content}</div>\r
                      )}\r
                    </div>\r
                  </div>\r
                );\r
              })}\r
            </div>\r
          ))}\r
        </div>\r
        <div className="fullview"></div>\r
      </section>\r
    </div>\r
  );\r
};\r
\r
export default GridMotion;\r
`,D=`.noscroll {\r
  height: 100%;\r
  width: 100%;\r
  overflow: hidden;\r
}\r
\r
.intro {\r
  width: 100%;\r
  height: 100vh;\r
  overflow: hidden;\r
  position: relative;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.intro::after {\r
  content: '';\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background-size: 250px;\r
  pointer-events: none;\r
  z-index: 4;\r
}\r
\r
.gridMotion-container {\r
  gap: 1rem;\r
  flex: none;\r
  position: relative;\r
  width: 150vw;\r
  height: 150vh;\r
  display: grid;\r
  grid-template-rows: repeat(4, 1fr);\r
  grid-template-columns: 100%;\r
  transform: rotate(-15deg);\r
  transform-origin: center center;\r
  z-index: 2;\r
}\r
\r
.row {\r
  display: grid;\r
  gap: 1rem;\r
  grid-template-columns: repeat(7, 1fr);\r
  will-change: transform, filter;\r
}\r
\r
.row__item {\r
  position: relative;\r
}\r
\r
.row__item-inner {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  border-radius: 10px;\r
  background-color: #111;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  color: white;\r
  font-size: 1.5rem;\r
}\r
\r
.row__item-img {\r
  width: 100%;\r
  height: 100%;\r
  background-size: cover;\r
  background-position: 50% 50%;\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
}\r
\r
.row__item-content {\r
  padding: 1rem;\r
  text-align: center;\r
  z-index: 1;\r
}\r
\r
.fullview {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  top: 0;\r
  left: 0;\r
  pointer-events: none;\r
}\r
\r
.fullview .row__item-inner {\r
  border-radius: 0px;\r
}\r
`,j=`import { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
\r
const GridMotion = ({ items = [], gradientColor = 'black' }) => {\r
  const gridRef = useRef(null);\r
  const rowRefs = useRef([]);\r
  const mouseXRef = useRef(window.innerWidth / 2);\r
\r
  const totalItems = 28;\r
  const defaultItems = Array.from({ length: totalItems }, (_, index) => \`Item \${index + 1}\`);\r
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;\r
\r
  useEffect(() => {\r
    gsap.ticker.lagSmoothing(0);\r
\r
    const handleMouseMove = e => {\r
      mouseXRef.current = e.clientX;\r
    };\r
\r
    const updateMotion = () => {\r
      const maxMoveAmount = 300;\r
      const baseDuration = 0.8;\r
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];\r
\r
      rowRefs.current.forEach((row, index) => {\r
        if (row) {\r
          const direction = index % 2 === 0 ? 1 : -1;\r
          const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;\r
\r
          gsap.to(row, {\r
            x: moveAmount,\r
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],\r
            ease: 'power3.out',\r
            overwrite: 'auto'\r
          });\r
        }\r
      });\r
    };\r
\r
    const removeAnimationLoop = gsap.ticker.add(updateMotion);\r
    window.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      removeAnimationLoop();\r
    };\r
  }, []);\r
\r
  return (\r
    <div ref={gridRef} className="h-full w-full overflow-hidden">\r
      <section\r
        className="w-full h-screen overflow-hidden relative flex items-center justify-center"\r
        style={{\r
          background: \`radial-gradient(circle, \${gradientColor} 0%, transparent 100%)\`\r
        }}\r
      >\r
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>\r
        <div className="gap-4 flex-none relative w-[150vw] h-[150vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">\r
          {[...Array(4)].map((_, rowIndex) => (\r
            <div\r
              key={rowIndex}\r
              className="grid gap-4 grid-cols-7"\r
              style={{ willChange: 'transform, filter' }}\r
              ref={el => (rowRefs.current[rowIndex] = el)}\r
            >\r
              {[...Array(7)].map((_, itemIndex) => {\r
                const content = combinedItems[rowIndex * 7 + itemIndex];\r
                return (\r
                  <div key={itemIndex} className="relative">\r
                    <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111] flex items-center justify-center text-white text-[1.5rem]">\r
                      {typeof content === 'string' && content.startsWith('http') ? (\r
                        <div\r
                          className="w-full h-full bg-cover bg-center absolute top-0 left-0"\r
                          style={{ backgroundImage: \`url(\${content})\` }}\r
                        ></div>\r
                      ) : (\r
                        <div className="p-4 text-center z-[1]">{content}</div>\r
                      )}\r
                    </div>\r
                  </div>\r
                );\r
              })}\r
            </div>\r
          ))}\r
        </div>\r
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>\r
      </section>\r
    </div>\r
  );\r
};\r
\r
export default GridMotion;\r
`,E=`import React, { useEffect, useRef, FC } from 'react';\r
import { gsap } from 'gsap';\r
import './GridMotion.css';\r
\r
interface GridMotionProps {\r
  items?: string[];\r
  gradientColor?: string;\r
}\r
\r
const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {\r
  const gridRef = useRef<HTMLDivElement>(null);\r
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);\r
  const mouseXRef = useRef<number>(window.innerWidth / 2);\r
\r
  const totalItems = 28;\r
  const defaultItems = Array.from({ length: totalItems }, (_, index) => \`Item \${index + 1}\`);\r
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;\r
\r
  useEffect(() => {\r
    gsap.ticker.lagSmoothing(0);\r
\r
    const handleMouseMove = (e: MouseEvent): void => {\r
      mouseXRef.current = e.clientX;\r
    };\r
\r
    const updateMotion = (): void => {\r
      const maxMoveAmount = 300;\r
      const baseDuration = 0.8;\r
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];\r
\r
      rowRefs.current.forEach((row, index) => {\r
        if (row) {\r
          const direction = index % 2 === 0 ? 1 : -1;\r
          const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;\r
\r
          gsap.to(row, {\r
            x: moveAmount,\r
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],\r
            ease: 'power3.out',\r
            overwrite: 'auto'\r
          });\r
        }\r
      });\r
    };\r
\r
    const removeAnimationLoop = gsap.ticker.add(updateMotion);\r
    window.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      removeAnimationLoop();\r
    };\r
  }, []);\r
\r
  return (\r
    <div className="noscroll loading" ref={gridRef}>\r
      <section\r
        className="intro"\r
        style={{\r
          background: \`radial-gradient(circle, \${gradientColor} 0%, transparent 100%)\`\r
        }}\r
      >\r
        <div className="gridMotion-container">\r
          {Array.from({ length: 4 }, (_, rowIndex) => (\r
            <div\r
              key={rowIndex}\r
              className="row"\r
              ref={el => {\r
                rowRefs.current[rowIndex] = el;\r
              }}\r
            >\r
              {Array.from({ length: 7 }, (_, itemIndex) => {\r
                const content = combinedItems[rowIndex * 7 + itemIndex];\r
                return (\r
                  <div key={itemIndex} className="row__item">\r
                    <div className="row__item-inner" style={{ backgroundColor: '#111' }}>\r
                      {typeof content === 'string' && content.startsWith('http') ? (\r
                        <div\r
                          className="row__item-img"\r
                          style={{\r
                            backgroundImage: \`url(\${content})\`\r
                          }}\r
                        ></div>\r
                      ) : (\r
                        <div className="row__item-content">{content}</div>\r
                      )}\r
                    </div>\r
                  </div>\r
                );\r
              })}\r
            </div>\r
          ))}\r
        </div>\r
        <div className="fullview"></div>\r
      </section>\r
    </div>\r
  );\r
};\r
\r
export default GridMotion;\r
`,G=`import { useEffect, useRef, FC } from 'react';\r
import { gsap } from 'gsap';\r
\r
interface GridMotionProps {\r
  items?: string[];\r
  gradientColor?: string;\r
}\r
\r
const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {\r
  const gridRef = useRef<HTMLDivElement>(null);\r
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);\r
  const mouseXRef = useRef<number>(window.innerWidth / 2);\r
\r
  const totalItems = 28;\r
  const defaultItems = Array.from({ length: totalItems }, (_, index) => \`Item \${index + 1}\`);\r
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;\r
\r
  useEffect(() => {\r
    gsap.ticker.lagSmoothing(0);\r
\r
    const handleMouseMove = (e: MouseEvent): void => {\r
      mouseXRef.current = e.clientX;\r
    };\r
\r
    const updateMotion = (): void => {\r
      const maxMoveAmount = 300;\r
      const baseDuration = 0.8;\r
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];\r
\r
      rowRefs.current.forEach((row, index) => {\r
        if (row) {\r
          const direction = index % 2 === 0 ? 1 : -1;\r
          const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;\r
\r
          gsap.to(row, {\r
            x: moveAmount,\r
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],\r
            ease: 'power3.out',\r
            overwrite: 'auto'\r
          });\r
        }\r
      });\r
    };\r
\r
    const removeAnimationLoop = gsap.ticker.add(updateMotion);\r
    window.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      removeAnimationLoop();\r
    };\r
  }, []);\r
\r
  return (\r
    <div ref={gridRef} className="h-full w-full overflow-hidden">\r
      <section\r
        className="w-full h-screen overflow-hidden relative flex items-center justify-center"\r
        style={{\r
          background: \`radial-gradient(circle, \${gradientColor} 0%, transparent 100%)\`\r
        }}\r
      >\r
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>\r
        <div className="gap-4 flex-none relative w-[150vw] h-[150vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">\r
          {Array.from({ length: 4 }, (_, rowIndex) => (\r
            <div\r
              key={rowIndex}\r
              className="grid gap-4 grid-cols-7"\r
              style={{ willChange: 'transform, filter' }}\r
              ref={el => {\r
                if (el) rowRefs.current[rowIndex] = el;\r
              }}\r
            >\r
              {Array.from({ length: 7 }, (_, itemIndex) => {\r
                const content = combinedItems[rowIndex * 7 + itemIndex];\r
                return (\r
                  <div key={itemIndex} className="relative">\r
                    <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111] flex items-center justify-center text-white text-[1.5rem]">\r
                      {typeof content === 'string' && content.startsWith('http') ? (\r
                        <div\r
                          className="w-full h-full bg-cover bg-center absolute top-0 left-0"\r
                          style={{ backgroundImage: \`url(\${content})\` }}\r
                        ></div>\r
                      ) : (\r
                        <div className="p-4 text-center z-[1]">{content}</div>\r
                      )}\r
                    </div>\r
                  </div>\r
                );\r
              })}\r
            </div>\r
          ))}\r
        </div>\r
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>\r
      </section>\r
    </div>\r
  );\r
};\r
\r
export default GridMotion;\r
`,X={dependencies:"gsap",usage:`import GridMotion from './GridMotion';
  
// note: you'll need to make sure the parent container of this component is sized properly
const items = [
  'Item 1',
  <div key='jsx-item-1'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 2',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'Item 4',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 5',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'Item 7',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 8',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'Item 10',
  <div key='jsx-item-3'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 11',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'Item 13',
  <div key='jsx-item-4'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 14',
  // Add more items as needed
];

<GridMotion items={items} />`,code:C,css:D,tailwind:j,tsCode:E,tsTailwind:G},S=()=>{const n=[{name:"items",type:"array",default:"[]",description:"An array of items to display in the grid. Each item can be a string, JSX element, or an image URL."},{name:"gradientColor",type:"string",default:"black",description:"Controls the color of the radial gradient used as the background."}],d=Array.from({length:30},()=>"https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");return r.jsxs(y,{children:[r.jsxs(I,{children:[r.jsx(b,{position:"relative",className:"demo-container",h:600,p:0,rounded:"3xl",overflow:"hidden",children:r.jsx(N,{items:d})}),r.jsx(A,{data:n}),r.jsx(_,{dependencyList:["gsap"]})]}),r.jsx(R,{children:r.jsx(k,{codeObject:X})})]})};export{S as default};
