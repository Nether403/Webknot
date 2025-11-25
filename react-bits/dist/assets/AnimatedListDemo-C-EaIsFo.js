import{r as o,j as n,c5 as E,q as H,B as A}from"./index-wsKSLPNH.js";import{T as D,P as C,a as G,C as L,b as R}from"./PropTable-C4uPWs8h.js";import{u as K}from"./useForceRerender-BCFU-k0M.js";import{C as O}from"./Customize-1m_ZNqR9.js";import{P as v}from"./PreviewSwitch-DqnF708j.js";import{D as B}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";const $=({children:i,delay:a=0,index:l,onMouseEnter:c,onClick:d})=>{const m=o.useRef(null),p=E(m,{amount:.5});return n.jsx(H.div,{ref:m,"data-index":l,onMouseEnter:c,onClick:d,initial:{scale:.7,opacity:0},animate:p?{scale:1,opacity:1}:{scale:.7,opacity:0},transition:{duration:.2,delay:a},style:{marginBottom:"1rem",cursor:"pointer"},children:i})},j=({items:i=["Item 1","Item 2","Item 3","Item 4","Item 5","Item 6","Item 7","Item 8","Item 9","Item 10","Item 11","Item 12","Item 13","Item 14","Item 15"],onItemSelect:a,showGradients:l=!0,enableArrowNavigation:c=!0,className:d="",itemClassName:m="",displayScrollbar:p=!0,initialSelectedIndex:u=-1})=>{const f=o.useRef(null),[t,I]=o.useState(u),[g,h]=o.useState(!1),[S,N]=o.useState(0),[T,k]=o.useState(1),M=r=>{const{scrollTop:e,scrollHeight:s,clientHeight:y}=r.target;N(Math.min(e/50,1));const b=s-(e+y);k(s<=y?0:Math.min(b/50,1))};return o.useEffect(()=>{if(!c)return;const r=e=>{e.key==="ArrowDown"||e.key==="Tab"&&!e.shiftKey?(e.preventDefault(),h(!0),I(s=>Math.min(s+1,i.length-1))):e.key==="ArrowUp"||e.key==="Tab"&&e.shiftKey?(e.preventDefault(),h(!0),I(s=>Math.max(s-1,0))):e.key==="Enter"&&t>=0&&t<i.length&&(e.preventDefault(),a&&a(i[t],t))};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[i,t,a,c]),o.useEffect(()=>{if(!g||t<0||!f.current)return;const r=f.current,e=r.querySelector(`[data-index="${t}"]`);if(e){const y=r.scrollTop,b=r.clientHeight,x=e.offsetTop,w=x+e.offsetHeight;x<y+50?r.scrollTo({top:x-50,behavior:"smooth"}):w>y+b-50&&r.scrollTo({top:w-b+50,behavior:"smooth"})}h(!1)},[t,g]),n.jsxs("div",{className:`scroll-list-container ${d}`,children:[n.jsx("div",{ref:f,className:`scroll-list ${p?"":"no-scrollbar"}`,onScroll:M,children:i.map((r,e)=>n.jsx($,{delay:.1,index:e,onMouseEnter:()=>I(e),onClick:()=>{I(e),a&&a(r,e)},children:n.jsx("div",{className:`item ${t===e?"selected":""} ${m}`,children:n.jsx("p",{className:"item-text",children:r})})},e))}),l&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"top-gradient",style:{opacity:S}}),n.jsx("div",{className:"bottom-gradient",style:{opacity:T}})]})]})},V=`import { useRef, useState, useEffect } from 'react';\r
import { motion, useInView } from 'motion/react';\r
import './AnimatedList.css';\r
\r
const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {\r
  const ref = useRef(null);\r
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });\r
  return (\r
    <motion.div\r
      ref={ref}\r
      data-index={index}\r
      onMouseEnter={onMouseEnter}\r
      onClick={onClick}\r
      initial={{ scale: 0.7, opacity: 0 }}\r
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}\r
      transition={{ duration: 0.2, delay }}\r
      style={{ marginBottom: '1rem', cursor: 'pointer' }}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
};\r
\r
const AnimatedList = ({\r
  items = [\r
    'Item 1',\r
    'Item 2',\r
    'Item 3',\r
    'Item 4',\r
    'Item 5',\r
    'Item 6',\r
    'Item 7',\r
    'Item 8',\r
    'Item 9',\r
    'Item 10',\r
    'Item 11',\r
    'Item 12',\r
    'Item 13',\r
    'Item 14',\r
    'Item 15'\r
  ],\r
  onItemSelect,\r
  showGradients = true,\r
  enableArrowNavigation = true,\r
  className = '',\r
  itemClassName = '',\r
  displayScrollbar = true,\r
  initialSelectedIndex = -1\r
}) => {\r
  const listRef = useRef(null);\r
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);\r
  const [keyboardNav, setKeyboardNav] = useState(false);\r
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);\r
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);\r
\r
  const handleScroll = e => {\r
    const { scrollTop, scrollHeight, clientHeight } = e.target;\r
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));\r
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);\r
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));\r
  };\r
\r
  useEffect(() => {\r
    if (!enableArrowNavigation) return;\r
    const handleKeyDown = e => {\r
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {\r
        e.preventDefault();\r
        setKeyboardNav(true);\r
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));\r
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {\r
        e.preventDefault();\r
        setKeyboardNav(true);\r
        setSelectedIndex(prev => Math.max(prev - 1, 0));\r
      } else if (e.key === 'Enter') {\r
        if (selectedIndex >= 0 && selectedIndex < items.length) {\r
          e.preventDefault();\r
          if (onItemSelect) {\r
            onItemSelect(items[selectedIndex], selectedIndex);\r
          }\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('keydown', handleKeyDown);\r
    return () => window.removeEventListener('keydown', handleKeyDown);\r
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);\r
\r
  useEffect(() => {\r
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;\r
    const container = listRef.current;\r
    const selectedItem = container.querySelector(\`[data-index="\${selectedIndex}"]\`);\r
    if (selectedItem) {\r
      const extraMargin = 50;\r
      const containerScrollTop = container.scrollTop;\r
      const containerHeight = container.clientHeight;\r
      const itemTop = selectedItem.offsetTop;\r
      const itemBottom = itemTop + selectedItem.offsetHeight;\r
      if (itemTop < containerScrollTop + extraMargin) {\r
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });\r
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {\r
        container.scrollTo({\r
          top: itemBottom - containerHeight + extraMargin,\r
          behavior: 'smooth'\r
        });\r
      }\r
    }\r
    setKeyboardNav(false);\r
  }, [selectedIndex, keyboardNav]);\r
\r
  return (\r
    <div className={\`scroll-list-container \${className}\`}>\r
      <div ref={listRef} className={\`scroll-list \${!displayScrollbar ? 'no-scrollbar' : ''}\`} onScroll={handleScroll}>\r
        {items.map((item, index) => (\r
          <AnimatedItem\r
            key={index}\r
            delay={0.1}\r
            index={index}\r
            onMouseEnter={() => setSelectedIndex(index)}\r
            onClick={() => {\r
              setSelectedIndex(index);\r
              if (onItemSelect) {\r
                onItemSelect(item, index);\r
              }\r
            }}\r
          >\r
            <div className={\`item \${selectedIndex === index ? 'selected' : ''} \${itemClassName}\`}>\r
              <p className="item-text">{item}</p>\r
            </div>\r
          </AnimatedItem>\r
        ))}\r
      </div>\r
      {showGradients && (\r
        <>\r
          <div className="top-gradient" style={{ opacity: topGradientOpacity }}></div>\r
          <div className="bottom-gradient" style={{ opacity: bottomGradientOpacity }}></div>\r
        </>\r
      )}\r
    </div>\r
  );\r
};\r
\r
export default AnimatedList;\r
`,P=`.scroll-list-container {\r
  position: relative;\r
  width: 500px;\r
}\r
\r
.scroll-list {\r
  max-height: 400px;\r
  overflow-y: auto;\r
  padding: 16px;\r
}\r
\r
.scroll-list::-webkit-scrollbar {\r
  width: 8px;\r
}\r
\r
.scroll-list::-webkit-scrollbar-track {\r
  background: #060010;\r
}\r
\r
.scroll-list::-webkit-scrollbar-thumb {\r
  background: #271e37;\r
  border-radius: 4px;\r
}\r
\r
.no-scrollbar::-webkit-scrollbar {\r
  display: none;\r
}\r
\r
.no-scrollbar {\r
  -ms-overflow-style: none;\r
  scrollbar-width: none;\r
}\r
\r
.item {\r
  padding: 16px;\r
  background-color: #170d27;\r
  border-radius: 8px;\r
  margin-bottom: 1rem;\r
}\r
\r
.item.selected {\r
  background-color: #271e37;\r
}\r
\r
.item-text {\r
  color: white;\r
  margin: 0;\r
}\r
\r
.top-gradient {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  height: 50px;\r
  background: linear-gradient(to bottom, #060010, transparent);\r
  pointer-events: none;\r
  transition: opacity 0.3s ease;\r
}\r
\r
.bottom-gradient {\r
  position: absolute;\r
  bottom: 0;\r
  left: 0;\r
  right: 0;\r
  height: 100px;\r
  background: linear-gradient(to top, #060010, transparent);\r
  pointer-events: none;\r
  transition: opacity 0.3s ease;\r
}\r
`,U=`import { useRef, useState, useEffect } from 'react';\r
import { motion, useInView } from 'motion/react';\r
\r
const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {\r
  const ref = useRef(null);\r
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });\r
  return (\r
    <motion.div\r
      ref={ref}\r
      data-index={index}\r
      onMouseEnter={onMouseEnter}\r
      onClick={onClick}\r
      initial={{ scale: 0.7, opacity: 0 }}\r
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}\r
      transition={{ duration: 0.2, delay }}\r
      className="mb-4 cursor-pointer"\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
};\r
\r
const AnimatedList = ({\r
  items = [\r
    'Item 1',\r
    'Item 2',\r
    'Item 3',\r
    'Item 4',\r
    'Item 5',\r
    'Item 6',\r
    'Item 7',\r
    'Item 8',\r
    'Item 9',\r
    'Item 10',\r
    'Item 11',\r
    'Item 12',\r
    'Item 13',\r
    'Item 14',\r
    'Item 15'\r
  ],\r
  onItemSelect,\r
  showGradients = true,\r
  enableArrowNavigation = true,\r
  className = '',\r
  itemClassName = '',\r
  displayScrollbar = true,\r
  initialSelectedIndex = -1\r
}) => {\r
  const listRef = useRef(null);\r
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);\r
  const [keyboardNav, setKeyboardNav] = useState(false);\r
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);\r
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);\r
\r
  const handleScroll = e => {\r
    const { scrollTop, scrollHeight, clientHeight } = e.target;\r
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));\r
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);\r
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));\r
  };\r
\r
  useEffect(() => {\r
    if (!enableArrowNavigation) return;\r
    const handleKeyDown = e => {\r
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {\r
        e.preventDefault();\r
        setKeyboardNav(true);\r
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));\r
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {\r
        e.preventDefault();\r
        setKeyboardNav(true);\r
        setSelectedIndex(prev => Math.max(prev - 1, 0));\r
      } else if (e.key === 'Enter') {\r
        if (selectedIndex >= 0 && selectedIndex < items.length) {\r
          e.preventDefault();\r
          if (onItemSelect) {\r
            onItemSelect(items[selectedIndex], selectedIndex);\r
          }\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('keydown', handleKeyDown);\r
    return () => window.removeEventListener('keydown', handleKeyDown);\r
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);\r
\r
  useEffect(() => {\r
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;\r
    const container = listRef.current;\r
    const selectedItem = container.querySelector(\`[data-index="\${selectedIndex}"]\`);\r
    if (selectedItem) {\r
      const extraMargin = 50;\r
      const containerScrollTop = container.scrollTop;\r
      const containerHeight = container.clientHeight;\r
      const itemTop = selectedItem.offsetTop;\r
      const itemBottom = itemTop + selectedItem.offsetHeight;\r
      if (itemTop < containerScrollTop + extraMargin) {\r
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });\r
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {\r
        container.scrollTo({\r
          top: itemBottom - containerHeight + extraMargin,\r
          behavior: 'smooth'\r
        });\r
      }\r
    }\r
    setKeyboardNav(false);\r
  }, [selectedIndex, keyboardNav]);\r
\r
  return (\r
    <div className={\`relative w-[500px] \${className}\`}>\r
      <div\r
        ref={listRef}\r
        className={\`max-h-[400px] overflow-y-auto p-4 \${\r
          displayScrollbar\r
            ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060010] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]'\r
            : 'scrollbar-hide'\r
        }\`}\r
        onScroll={handleScroll}\r
        style={{\r
          scrollbarWidth: displayScrollbar ? 'thin' : 'none',\r
          scrollbarColor: '#222 #060010'\r
        }}\r
      >\r
        {items.map((item, index) => (\r
          <AnimatedItem\r
            key={index}\r
            delay={0.1}\r
            index={index}\r
            onMouseEnter={() => setSelectedIndex(index)}\r
            onClick={() => {\r
              setSelectedIndex(index);\r
              if (onItemSelect) {\r
                onItemSelect(item, index);\r
              }\r
            }}\r
          >\r
            <div className={\`p-4 bg-[#111] rounded-lg \${selectedIndex === index ? 'bg-[#222]' : ''} \${itemClassName}\`}>\r
              <p className="text-white m-0">{item}</p>\r
            </div>\r
          </AnimatedItem>\r
        ))}\r
      </div>\r
      {showGradients && (\r
        <>\r
          <div\r
            className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease"\r
            style={{ opacity: topGradientOpacity }}\r
          ></div>\r
          <div\r
            className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease"\r
            style={{ opacity: bottomGradientOpacity }}\r
          ></div>\r
        </>\r
      )}\r
    </div>\r
  );\r
};\r
\r
export default AnimatedList;\r
`,F=`import React, { useRef, useState, useEffect, ReactNode, MouseEventHandler, UIEvent } from 'react';\r
import { motion, useInView } from 'motion/react';\r
import './AnimatedList.css';\r
\r
interface AnimatedItemProps {\r
  children: ReactNode;\r
  delay?: number;\r
  index: number;\r
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;\r
  onClick?: MouseEventHandler<HTMLDivElement>;\r
}\r
\r
const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, delay = 0, index, onMouseEnter, onClick }) => {\r
  const ref = useRef<HTMLDivElement>(null);\r
  const inView = useInView(ref, { amount: 0.5, once: false });\r
  return (\r
    <motion.div\r
      ref={ref}\r
      data-index={index}\r
      onMouseEnter={onMouseEnter}\r
      onClick={onClick}\r
      initial={{ scale: 0.7, opacity: 0 }}\r
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}\r
      transition={{ duration: 0.2, delay }}\r
      style={{ marginBottom: '1rem', cursor: 'pointer' }}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
};\r
\r
interface AnimatedListProps {\r
  items?: string[];\r
  onItemSelect?: (item: string, index: number) => void;\r
  showGradients?: boolean;\r
  enableArrowNavigation?: boolean;\r
  className?: string;\r
  itemClassName?: string;\r
  displayScrollbar?: boolean;\r
  initialSelectedIndex?: number;\r
}\r
\r
const AnimatedList: React.FC<AnimatedListProps> = ({\r
  items = [\r
    'Item 1',\r
    'Item 2',\r
    'Item 3',\r
    'Item 4',\r
    'Item 5',\r
    'Item 6',\r
    'Item 7',\r
    'Item 8',\r
    'Item 9',\r
    'Item 10',\r
    'Item 11',\r
    'Item 12',\r
    'Item 13',\r
    'Item 14',\r
    'Item 15'\r
  ],\r
  onItemSelect,\r
  showGradients = true,\r
  enableArrowNavigation = true,\r
  className = '',\r
  itemClassName = '',\r
  displayScrollbar = true,\r
  initialSelectedIndex = -1\r
}) => {\r
  const listRef = useRef<HTMLDivElement>(null);\r
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);\r
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);\r
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);\r
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);\r
\r
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {\r
    const target = e.target as HTMLDivElement;\r
    const { scrollTop, scrollHeight, clientHeight } = target;\r
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));\r
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);\r
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));\r
  };\r
\r
  useEffect(() => {\r
    if (!enableArrowNavigation) return;\r
    const handleKeyDown = (e: KeyboardEvent) => {\r
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {\r
        e.preventDefault();\r
        setKeyboardNav(true);\r
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));\r
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {\r
        e.preventDefault();\r
        setKeyboardNav(true);\r
        setSelectedIndex(prev => Math.max(prev - 1, 0));\r
      } else if (e.key === 'Enter') {\r
        if (selectedIndex >= 0 && selectedIndex < items.length) {\r
          e.preventDefault();\r
          if (onItemSelect) {\r
            onItemSelect(items[selectedIndex], selectedIndex);\r
          }\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('keydown', handleKeyDown);\r
    return () => window.removeEventListener('keydown', handleKeyDown);\r
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);\r
\r
  useEffect(() => {\r
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;\r
    const container = listRef.current;\r
    const selectedItem = container.querySelector(\`[data-index="\${selectedIndex}"]\`) as HTMLElement | null;\r
    if (selectedItem) {\r
      const extraMargin = 50;\r
      const containerScrollTop = container.scrollTop;\r
      const containerHeight = container.clientHeight;\r
      const itemTop = selectedItem.offsetTop;\r
      const itemBottom = itemTop + selectedItem.offsetHeight;\r
      if (itemTop < containerScrollTop + extraMargin) {\r
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });\r
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {\r
        container.scrollTo({\r
          top: itemBottom - containerHeight + extraMargin,\r
          behavior: 'smooth'\r
        });\r
      }\r
    }\r
    setKeyboardNav(false);\r
  }, [selectedIndex, keyboardNav]);\r
\r
  return (\r
    <div className={\`scroll-list-container \${className}\`}>\r
      <div ref={listRef} className={\`scroll-list \${!displayScrollbar ? 'no-scrollbar' : ''}\`} onScroll={handleScroll}>\r
        {items.map((item, index) => (\r
          <AnimatedItem\r
            key={index}\r
            delay={0.1}\r
            index={index}\r
            onMouseEnter={() => setSelectedIndex(index)}\r
            onClick={() => {\r
              setSelectedIndex(index);\r
              if (onItemSelect) {\r
                onItemSelect(item, index);\r
              }\r
            }}\r
          >\r
            <div className={\`item \${selectedIndex === index ? 'selected' : ''} \${itemClassName}\`}>\r
              <p className="item-text">{item}</p>\r
            </div>\r
          </AnimatedItem>\r
        ))}\r
      </div>\r
      {showGradients && (\r
        <>\r
          <div className="top-gradient" style={{ opacity: topGradientOpacity }}></div>\r
          <div className="bottom-gradient" style={{ opacity: bottomGradientOpacity }}></div>\r
        </>\r
      )}\r
    </div>\r
  );\r
};\r
\r
export default AnimatedList;\r
`,q=`import React, { useRef, useState, useEffect, ReactNode, MouseEventHandler, UIEvent } from 'react';\r
import { motion, useInView } from 'motion/react';\r
\r
interface AnimatedItemProps {\r
  children: ReactNode;\r
  delay?: number;\r
  index: number;\r
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;\r
  onClick?: MouseEventHandler<HTMLDivElement>;\r
}\r
\r
const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, delay = 0, index, onMouseEnter, onClick }) => {\r
  const ref = useRef<HTMLDivElement>(null);\r
  const inView = useInView(ref, { amount: 0.5, once: false });\r
  return (\r
    <motion.div\r
      ref={ref}\r
      data-index={index}\r
      onMouseEnter={onMouseEnter}\r
      onClick={onClick}\r
      initial={{ scale: 0.7, opacity: 0 }}\r
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}\r
      transition={{ duration: 0.2, delay }}\r
      className="mb-4 cursor-pointer"\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
};\r
\r
interface AnimatedListProps {\r
  items?: string[];\r
  onItemSelect?: (item: string, index: number) => void;\r
  showGradients?: boolean;\r
  enableArrowNavigation?: boolean;\r
  className?: string;\r
  itemClassName?: string;\r
  displayScrollbar?: boolean;\r
  initialSelectedIndex?: number;\r
}\r
\r
const AnimatedList: React.FC<AnimatedListProps> = ({\r
  items = [\r
    'Item 1',\r
    'Item 2',\r
    'Item 3',\r
    'Item 4',\r
    'Item 5',\r
    'Item 6',\r
    'Item 7',\r
    'Item 8',\r
    'Item 9',\r
    'Item 10',\r
    'Item 11',\r
    'Item 12',\r
    'Item 13',\r
    'Item 14',\r
    'Item 15'\r
  ],\r
  onItemSelect,\r
  showGradients = true,\r
  enableArrowNavigation = true,\r
  className = '',\r
  itemClassName = '',\r
  displayScrollbar = true,\r
  initialSelectedIndex = -1\r
}) => {\r
  const listRef = useRef<HTMLDivElement>(null);\r
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);\r
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);\r
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);\r
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);\r
\r
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {\r
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;\r
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));\r
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);\r
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));\r
  };\r
\r
  useEffect(() => {\r
    if (!enableArrowNavigation) return;\r
    const handleKeyDown = (e: KeyboardEvent) => {\r
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {\r
        e.preventDefault();\r
        setKeyboardNav(true);\r
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));\r
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {\r
        e.preventDefault();\r
        setKeyboardNav(true);\r
        setSelectedIndex(prev => Math.max(prev - 1, 0));\r
      } else if (e.key === 'Enter') {\r
        if (selectedIndex >= 0 && selectedIndex < items.length) {\r
          e.preventDefault();\r
          if (onItemSelect) {\r
            onItemSelect(items[selectedIndex], selectedIndex);\r
          }\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('keydown', handleKeyDown);\r
    return () => window.removeEventListener('keydown', handleKeyDown);\r
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);\r
\r
  useEffect(() => {\r
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;\r
    const container = listRef.current;\r
    const selectedItem = container.querySelector(\`[data-index="\${selectedIndex}"]\`) as HTMLElement | null;\r
    if (selectedItem) {\r
      const extraMargin = 50;\r
      const containerScrollTop = container.scrollTop;\r
      const containerHeight = container.clientHeight;\r
      const itemTop = selectedItem.offsetTop;\r
      const itemBottom = itemTop + selectedItem.offsetHeight;\r
      if (itemTop < containerScrollTop + extraMargin) {\r
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });\r
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {\r
        container.scrollTo({\r
          top: itemBottom - containerHeight + extraMargin,\r
          behavior: 'smooth'\r
        });\r
      }\r
    }\r
    setKeyboardNav(false);\r
  }, [selectedIndex, keyboardNav]);\r
\r
  return (\r
    <div className={\`relative w-[500px] \${className}\`}>\r
      <div\r
        ref={listRef}\r
        className={\`max-h-[400px] overflow-y-auto p-4 \${\r
          displayScrollbar\r
            ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060010] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]'\r
            : 'scrollbar-hide'\r
        }\`}\r
        onScroll={handleScroll}\r
        style={{\r
          scrollbarWidth: displayScrollbar ? 'thin' : 'none',\r
          scrollbarColor: '#222 #060010'\r
        }}\r
      >\r
        {items.map((item, index) => (\r
          <AnimatedItem\r
            key={index}\r
            delay={0.1}\r
            index={index}\r
            onMouseEnter={() => setSelectedIndex(index)}\r
            onClick={() => {\r
              setSelectedIndex(index);\r
              if (onItemSelect) {\r
                onItemSelect(item, index);\r
              }\r
            }}\r
          >\r
            <div className={\`p-4 bg-[#111] rounded-lg \${selectedIndex === index ? 'bg-[#222]' : ''} \${itemClassName}\`}>\r
              <p className="text-white m-0">{item}</p>\r
            </div>\r
          </AnimatedItem>\r
        ))}\r
      </div>\r
      {showGradients && (\r
        <>\r
          <div\r
            className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease"\r
            style={{ opacity: topGradientOpacity }}\r
          ></div>\r
          <div\r
            className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease"\r
            style={{ opacity: bottomGradientOpacity }}\r
          ></div>\r
        </>\r
      )}\r
    </div>\r
  );\r
};\r
\r
export default AnimatedList;\r
`,W={dependencies:"motion",usage:`import AnimatedList from './AnimatedList'

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']; 
  
<AnimatedList
  items={items}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={true}
  enableArrowNavigation={true}
  displayScrollbar={true}
/>`,code:V,css:P,tailwind:U,tsCode:F,tsTailwind:q},ee=()=>{const[i,a]=o.useState(!0),[l,c]=o.useState(!0),[d,m]=o.useState(!0),[p,u]=K(),f=[{name:"items",type:"string[]",default:"['Item 1', 'Item 2', ...]",description:"An array of items to display in the scrollable list."},{name:"onItemSelect",type:"function",default:"undefined",description:"Callback function triggered when an item is selected. Receives the selected item and its index."},{name:"showGradients",type:"boolean",default:"true",description:"Toggle to display the top and bottom gradient overlays."},{name:"enableArrowNavigation",type:"boolean",default:"true",description:"Toggle to enable keyboard navigation via arrow and tab keys."},{name:"className",type:"string",default:"''",description:"Additional CSS class names for the main container."},{name:"itemClassName",type:"string",default:"''",description:"Additional CSS class names for each list item."},{name:"displayScrollbar",type:"boolean",default:"true",description:"Toggle to display or hide the custom scrollbar."},{name:"initialSelectedIndex",type:"number",default:"-1",description:"Initial index of the selected item. Set to -1 for no selection."}];return n.jsxs(D,{children:[n.jsxs(C,{children:[n.jsx(A,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:n.jsx(j,{showGradients:i,enableArrowNavigation:l,displayScrollbar:d},p)}),n.jsxs(O,{children:[n.jsx(v,{title:"Fade Items",isChecked:i,onChange:t=>{a(t),u()}}),n.jsx(v,{title:"Keyboard Navigation",isChecked:l,onChange:t=>{c(t),u()}}),n.jsx(v,{title:"Show Scrollbar",isChecked:d,onChange:t=>{m(t),u()}})]}),n.jsx(G,{data:f}),n.jsx(B,{dependencyList:["motion"]})]}),n.jsx(L,{children:n.jsx(R,{codeObject:W})})]})};export{ee as default};
