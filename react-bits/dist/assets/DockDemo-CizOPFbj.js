import{bh as v,r as m,by as x,bx as y,j as n,q as f,bd as I,B as S,T as D}from"./index-wsKSLPNH.js";import{V as N,a as z,b as M,c as C}from"./index-76PpzJQ4.js";import{T as V,P as R,a as X,C as w,b as P}from"./PropTable-C4uPWs8h.js";import{C as j}from"./Customize-1m_ZNqR9.js";import{P as k}from"./PreviewSlider-m1G_aiYP.js";import{D as E}from"./Dependencies-BHoMfJUj.js";import{u as T}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";function A({children:t,className:o="",onClick:a,mouseX:e,spring:d,distance:c,magnification:u,baseItemSize:r}){const p=m.useRef(null),i=v(0),l=x(e,s=>{var H;const b=((H=p.current)==null?void 0:H.getBoundingClientRect())??{x:0};return s-b.x-r/2}),h=x(l,[-c,0,c],[r,u,r]),g=y(h,d);return n.jsx(f.div,{ref:p,style:{width:g,height:g},onHoverStart:()=>i.set(1),onHoverEnd:()=>i.set(0),onFocus:()=>i.set(1),onBlur:()=>i.set(0),onClick:a,className:`dock-item ${o}`,tabIndex:0,role:"button","aria-haspopup":"true",children:m.Children.map(t,s=>m.cloneElement(s,{isHovered:i}))})}function L({children:t,className:o="",...a}){const{isHovered:e}=a,[d,c]=m.useState(!1);return m.useEffect(()=>{const u=e.on("change",r=>{c(r===1)});return()=>u()},[e]),n.jsx(I,{children:d&&n.jsx(f.div,{initial:{opacity:0,y:0},animate:{opacity:1,y:-10},exit:{opacity:0,y:0},transition:{duration:.2},className:`dock-label ${o}`,role:"tooltip",style:{x:"-50%"},children:t})})}function $({children:t,className:o=""}){return n.jsx("div",{className:`dock-icon ${o}`,children:t})}function B({items:t,className:o="",spring:a={mass:.1,stiffness:150,damping:12},magnification:e=70,distance:d=200,panelHeight:c=68,dockHeight:u=256,baseItemSize:r=50}){const p=v(1/0),i=v(0),l=m.useMemo(()=>Math.max(u,e+e/2+4),[e,u]),h=x(i,[0,1],[c,l]),g=y(h,a);return n.jsx(f.div,{style:{height:g,scrollbarWidth:"none"},className:"dock-outer",children:n.jsx(f.div,{onMouseMove:({pageX:s})=>{i.set(1),p.set(s)},onMouseLeave:()=>{i.set(0),p.set(1/0)},className:`dock-panel ${o}`,style:{height:c},role:"toolbar","aria-label":"Application dock",children:t.map((s,b)=>n.jsxs(A,{onClick:s.onClick,className:s.className,mouseX:p,spring:a,distance:d,magnification:e,baseItemSize:r,children:[n.jsx($,{children:s.icon}),n.jsx(L,{children:s.label})]},b))})})}const O=`'use client';\r
\r
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';\r
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';\r
\r
import './Dock.css';\r
\r
function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }) {\r
  const ref = useRef(null);\r
  const isHovered = useMotionValue(0);\r
\r
  const mouseDistance = useTransform(mouseX, val => {\r
    const rect = ref.current?.getBoundingClientRect() ?? {\r
      x: 0,\r
      width: baseItemSize\r
    };\r
    return val - rect.x - baseItemSize / 2;\r
  });\r
\r
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);\r
  const size = useSpring(targetSize, spring);\r
\r
  return (\r
    <motion.div\r
      ref={ref}\r
      style={{\r
        width: size,\r
        height: size\r
      }}\r
      onHoverStart={() => isHovered.set(1)}\r
      onHoverEnd={() => isHovered.set(0)}\r
      onFocus={() => isHovered.set(1)}\r
      onBlur={() => isHovered.set(0)}\r
      onClick={onClick}\r
      className={\`dock-item \${className}\`}\r
      tabIndex={0}\r
      role="button"\r
      aria-haspopup="true"\r
    >\r
      {Children.map(children, child => cloneElement(child, { isHovered }))}\r
    </motion.div>\r
  );\r
}\r
\r
function DockLabel({ children, className = '', ...rest }) {\r
  const { isHovered } = rest;\r
  const [isVisible, setIsVisible] = useState(false);\r
\r
  useEffect(() => {\r
    const unsubscribe = isHovered.on('change', latest => {\r
      setIsVisible(latest === 1);\r
    });\r
    return () => unsubscribe();\r
  }, [isHovered]);\r
\r
  return (\r
    <AnimatePresence>\r
      {isVisible && (\r
        <motion.div\r
          initial={{ opacity: 0, y: 0 }}\r
          animate={{ opacity: 1, y: -10 }}\r
          exit={{ opacity: 0, y: 0 }}\r
          transition={{ duration: 0.2 }}\r
          className={\`dock-label \${className}\`}\r
          role="tooltip"\r
          style={{ x: '-50%' }}\r
        >\r
          {children}\r
        </motion.div>\r
      )}\r
    </AnimatePresence>\r
  );\r
}\r
\r
function DockIcon({ children, className = '' }) {\r
  return <div className={\`dock-icon \${className}\`}>{children}</div>;\r
}\r
\r
export default function Dock({\r
  items,\r
  className = '',\r
  spring = { mass: 0.1, stiffness: 150, damping: 12 },\r
  magnification = 70,\r
  distance = 200,\r
  panelHeight = 68,\r
  dockHeight = 256,\r
  baseItemSize = 50\r
}) {\r
  const mouseX = useMotionValue(Infinity);\r
  const isHovered = useMotionValue(0);\r
\r
  const maxHeight = useMemo(\r
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),\r
    [magnification, dockHeight]\r
  );\r
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);\r
  const height = useSpring(heightRow, spring);\r
\r
  return (\r
    <motion.div style={{ height, scrollbarWidth: 'none' }} className="dock-outer">\r
      <motion.div\r
        onMouseMove={({ pageX }) => {\r
          isHovered.set(1);\r
          mouseX.set(pageX);\r
        }}\r
        onMouseLeave={() => {\r
          isHovered.set(0);\r
          mouseX.set(Infinity);\r
        }}\r
        className={\`dock-panel \${className}\`}\r
        style={{ height: panelHeight }}\r
        role="toolbar"\r
        aria-label="Application dock"\r
      >\r
        {items.map((item, index) => (\r
          <DockItem\r
            key={index}\r
            onClick={item.onClick}\r
            className={item.className}\r
            mouseX={mouseX}\r
            spring={spring}\r
            distance={distance}\r
            magnification={magnification}\r
            baseItemSize={baseItemSize}\r
          >\r
            <DockIcon>{item.icon}</DockIcon>\r
            <DockLabel>{item.label}</DockLabel>\r
          </DockItem>\r
        ))}\r
      </motion.div>\r
    </motion.div>\r
  );\r
}\r
`,F=`.dock-outer {\r
  margin: 0 0.5rem;\r
  display: flex;\r
  max-width: 100%;\r
  align-items: center;\r
}\r
\r
.dock-panel {\r
  position: absolute;\r
  bottom: 0.5rem;\r
  left: 50%;\r
  transform: translateX(-50%);\r
  display: flex;\r
  align-items: flex-end;\r
  width: fit-content;\r
  gap: 1rem;\r
  border-radius: 1rem;\r
  background-color: #060010;\r
  border: 1px solid #222;\r
  padding: 0 0.5rem 0.5rem;\r
}\r
\r
.dock-item {\r
  position: relative;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  border-radius: 10px;\r
  background-color: #060010;\r
  border: 1px solid #222;\r
  box-shadow:\r
    0 4px 6px -1px rgba(0, 0, 0, 0.1),\r
    0 2px 4px -1px rgba(0, 0, 0, 0.06);\r
  cursor: pointer;\r
  outline: none;\r
}\r
\r
.dock-icon {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.dock-label {\r
  position: absolute;\r
  top: -1.5rem;\r
  left: 50%;\r
  width: fit-content;\r
  white-space: pre;\r
  border-radius: 0.375rem;\r
  border: 1px solid #222;\r
  background-color: #060010;\r
  padding: 0.125rem 0.5rem;\r
  font-size: 0.75rem;\r
  color: #fff;\r
  transform: translateX(-50%);\r
}\r
`,W=`'use client';\r
\r
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';\r
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';\r
\r
function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }) {\r
  const ref = useRef(null);\r
  const isHovered = useMotionValue(0);\r
\r
  const mouseDistance = useTransform(mouseX, val => {\r
    const rect = ref.current?.getBoundingClientRect() ?? {\r
      x: 0,\r
      width: baseItemSize\r
    };\r
    return val - rect.x - baseItemSize / 2;\r
  });\r
\r
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);\r
  const size = useSpring(targetSize, spring);\r
\r
  return (\r
    <motion.div\r
      ref={ref}\r
      style={{\r
        width: size,\r
        height: size\r
      }}\r
      onHoverStart={() => isHovered.set(1)}\r
      onHoverEnd={() => isHovered.set(0)}\r
      onFocus={() => isHovered.set(1)}\r
      onBlur={() => isHovered.set(0)}\r
      onClick={onClick}\r
      className={\`relative inline-flex items-center justify-center rounded-full bg-[#060010] border-neutral-700 border-2 shadow-md \${className}\`}\r
      tabIndex={0}\r
      role="button"\r
      aria-haspopup="true"\r
    >\r
      {Children.map(children, child => cloneElement(child, { isHovered }))}\r
    </motion.div>\r
  );\r
}\r
\r
function DockLabel({ children, className = '', ...rest }) {\r
  const { isHovered } = rest;\r
  const [isVisible, setIsVisible] = useState(false);\r
\r
  useEffect(() => {\r
    const unsubscribe = isHovered.on('change', latest => {\r
      setIsVisible(latest === 1);\r
    });\r
    return () => unsubscribe();\r
  }, [isHovered]);\r
\r
  return (\r
    <AnimatePresence>\r
      {isVisible && (\r
        <motion.div\r
          initial={{ opacity: 0, y: 0 }}\r
          animate={{ opacity: 1, y: -10 }}\r
          exit={{ opacity: 0, y: 0 }}\r
          transition={{ duration: 0.2 }}\r
          className={\`\${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060010] px-2 py-0.5 text-xs text-white\`}\r
          role="tooltip"\r
          style={{ x: '-50%' }}\r
        >\r
          {children}\r
        </motion.div>\r
      )}\r
    </AnimatePresence>\r
  );\r
}\r
\r
function DockIcon({ children, className = '' }) {\r
  return <div className={\`flex items-center justify-center \${className}\`}>{children}</div>;\r
}\r
\r
export default function Dock({\r
  items,\r
  className = '',\r
  spring = { mass: 0.1, stiffness: 150, damping: 12 },\r
  magnification = 70,\r
  distance = 200,\r
  panelHeight = 64,\r
  dockHeight = 256,\r
  baseItemSize = 50\r
}) {\r
  const mouseX = useMotionValue(Infinity);\r
  const isHovered = useMotionValue(0);\r
\r
  const maxHeight = useMemo(\r
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),\r
    [magnification, dockHeight]\r
  );\r
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);\r
  const height = useSpring(heightRow, spring);\r
\r
  return (\r
    <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">\r
      <motion.div\r
        onMouseMove={({ pageX }) => {\r
          isHovered.set(1);\r
          mouseX.set(pageX);\r
        }}\r
        onMouseLeave={() => {\r
          isHovered.set(0);\r
          mouseX.set(Infinity);\r
        }}\r
        className={\`\${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl border-neutral-700 border-2 pb-2 px-4\`}\r
        style={{ height: panelHeight }}\r
        role="toolbar"\r
        aria-label="Application dock"\r
      >\r
        {items.map((item, index) => (\r
          <DockItem\r
            key={index}\r
            onClick={item.onClick}\r
            className={item.className}\r
            mouseX={mouseX}\r
            spring={spring}\r
            distance={distance}\r
            magnification={magnification}\r
            baseItemSize={baseItemSize}\r
          >\r
            <DockIcon>{item.icon}</DockIcon>\r
            <DockLabel>{item.label}</DockLabel>\r
          </DockItem>\r
        ))}\r
      </motion.div>\r
    </motion.div>\r
  );\r
}\r
`,G=`'use client';\r
\r
import {\r
  motion,\r
  MotionValue,\r
  useMotionValue,\r
  useSpring,\r
  useTransform,\r
  type SpringOptions,\r
  AnimatePresence\r
} from 'motion/react';\r
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';\r
\r
import './Dock.css';\r
\r
export type DockItemData = {\r
  icon: React.ReactNode;\r
  label: React.ReactNode;\r
  onClick: () => void;\r
  className?: string;\r
};\r
\r
export type DockProps = {\r
  items: DockItemData[];\r
  className?: string;\r
  distance?: number;\r
  panelHeight?: number;\r
  baseItemSize?: number;\r
  dockHeight?: number;\r
  magnification?: number;\r
  spring?: SpringOptions;\r
};\r
\r
type DockItemProps = {\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
  mouseX: MotionValue<number>;\r
  spring: SpringOptions;\r
  distance: number;\r
  baseItemSize: number;\r
  magnification: number;\r
};\r
\r
function DockItem({\r
  children,\r
  className = '',\r
  onClick,\r
  mouseX,\r
  spring,\r
  distance,\r
  magnification,\r
  baseItemSize\r
}: DockItemProps) {\r
  const ref = useRef<HTMLDivElement>(null);\r
  const isHovered = useMotionValue(0);\r
\r
  const mouseDistance = useTransform(mouseX, val => {\r
    const rect = ref.current?.getBoundingClientRect() ?? {\r
      x: 0,\r
      width: baseItemSize\r
    };\r
    return val - rect.x - baseItemSize / 2;\r
  });\r
\r
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);\r
  const size = useSpring(targetSize, spring);\r
\r
  return (\r
    <motion.div\r
      ref={ref}\r
      style={{\r
        width: size,\r
        height: size\r
      }}\r
      onHoverStart={() => isHovered.set(1)}\r
      onHoverEnd={() => isHovered.set(0)}\r
      onFocus={() => isHovered.set(1)}\r
      onBlur={() => isHovered.set(0)}\r
      onClick={onClick}\r
      className={\`dock-item \${className}\`}\r
      tabIndex={0}\r
      role="button"\r
      aria-haspopup="true"\r
    >\r
      {Children.map(children, child =>\r
        React.isValidElement(child)\r
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })\r
          : child\r
      )}\r
    </motion.div>\r
  );\r
}\r
\r
type DockLabelProps = {\r
  className?: string;\r
  children: React.ReactNode;\r
  isHovered?: MotionValue<number>;\r
};\r
\r
function DockLabel({ children, className = '', isHovered }: DockLabelProps) {\r
  const [isVisible, setIsVisible] = useState(false);\r
\r
  useEffect(() => {\r
    if (!isHovered) return;\r
    const unsubscribe = isHovered.on('change', latest => {\r
      setIsVisible(latest === 1);\r
    });\r
    return () => unsubscribe();\r
  }, [isHovered]);\r
\r
  return (\r
    <AnimatePresence>\r
      {isVisible && (\r
        <motion.div\r
          initial={{ opacity: 0, y: 0 }}\r
          animate={{ opacity: 1, y: -10 }}\r
          exit={{ opacity: 0, y: 0 }}\r
          transition={{ duration: 0.2 }}\r
          className={\`dock-label \${className}\`}\r
          role="tooltip"\r
          style={{ x: '-50%' }}\r
        >\r
          {children}\r
        </motion.div>\r
      )}\r
    </AnimatePresence>\r
  );\r
}\r
\r
type DockIconProps = {\r
  className?: string;\r
  children: React.ReactNode;\r
  isHovered?: MotionValue<number>;\r
};\r
\r
function DockIcon({ children, className = '' }: DockIconProps) {\r
  return <div className={\`dock-icon \${className}\`}>{children}</div>;\r
}\r
\r
export default function Dock({\r
  items,\r
  className = '',\r
  spring = { mass: 0.1, stiffness: 150, damping: 12 },\r
  magnification = 70,\r
  distance = 200,\r
  panelHeight = 68,\r
  dockHeight = 256,\r
  baseItemSize = 50\r
}: DockProps) {\r
  const mouseX = useMotionValue(Infinity);\r
  const isHovered = useMotionValue(0);\r
\r
  const maxHeight = useMemo(\r
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),\r
    [magnification, dockHeight]\r
  );\r
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);\r
  const height = useSpring(heightRow, spring);\r
\r
  return (\r
    <motion.div style={{ height, scrollbarWidth: 'none' }} className="dock-outer">\r
      <motion.div\r
        onMouseMove={({ pageX }) => {\r
          isHovered.set(1);\r
          mouseX.set(pageX);\r
        }}\r
        onMouseLeave={() => {\r
          isHovered.set(0);\r
          mouseX.set(Infinity);\r
        }}\r
        className={\`dock-panel \${className}\`}\r
        style={{ height: panelHeight }}\r
        role="toolbar"\r
        aria-label="Application dock"\r
      >\r
        {items.map((item, index) => (\r
          <DockItem\r
            key={index}\r
            onClick={item.onClick}\r
            className={item.className}\r
            mouseX={mouseX}\r
            spring={spring}\r
            distance={distance}\r
            magnification={magnification}\r
            baseItemSize={baseItemSize}\r
          >\r
            <DockIcon>{item.icon}</DockIcon>\r
            <DockLabel>{item.label}</DockLabel>\r
          </DockItem>\r
        ))}\r
      </motion.div>\r
    </motion.div>\r
  );\r
}\r
`,q=`'use client';\r
\r
import {\r
  motion,\r
  MotionValue,\r
  useMotionValue,\r
  useSpring,\r
  useTransform,\r
  type SpringOptions,\r
  AnimatePresence\r
} from 'motion/react';\r
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';\r
\r
export type DockItemData = {\r
  icon: React.ReactNode;\r
  label: React.ReactNode;\r
  onClick: () => void;\r
  className?: string;\r
};\r
\r
export type DockProps = {\r
  items: DockItemData[];\r
  className?: string;\r
  distance?: number;\r
  panelHeight?: number;\r
  baseItemSize?: number;\r
  dockHeight?: number;\r
  magnification?: number;\r
  spring?: SpringOptions;\r
};\r
\r
type DockItemProps = {\r
  className?: string;\r
  children: React.ReactNode;\r
  onClick?: () => void;\r
  mouseX: MotionValue<number>;\r
  spring: SpringOptions;\r
  distance: number;\r
  baseItemSize: number;\r
  magnification: number;\r
};\r
\r
function DockItem({\r
  children,\r
  className = '',\r
  onClick,\r
  mouseX,\r
  spring,\r
  distance,\r
  magnification,\r
  baseItemSize\r
}: DockItemProps) {\r
  const ref = useRef<HTMLDivElement>(null);\r
  const isHovered = useMotionValue(0);\r
\r
  const mouseDistance = useTransform(mouseX, val => {\r
    const rect = ref.current?.getBoundingClientRect() ?? {\r
      x: 0,\r
      width: baseItemSize\r
    };\r
    return val - rect.x - baseItemSize / 2;\r
  });\r
\r
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);\r
  const size = useSpring(targetSize, spring);\r
\r
  return (\r
    <motion.div\r
      ref={ref}\r
      style={{\r
        width: size,\r
        height: size\r
      }}\r
      onHoverStart={() => isHovered.set(1)}\r
      onHoverEnd={() => isHovered.set(0)}\r
      onFocus={() => isHovered.set(1)}\r
      onBlur={() => isHovered.set(0)}\r
      onClick={onClick}\r
      className={\`relative inline-flex items-center justify-center rounded-full bg-[#060010] border-neutral-700 border-2 shadow-md \${className}\`}\r
      tabIndex={0}\r
      role="button"\r
      aria-haspopup="true"\r
    >\r
      {Children.map(children, child =>\r
        React.isValidElement(child)\r
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })\r
          : child\r
      )}\r
    </motion.div>\r
  );\r
}\r
\r
type DockLabelProps = {\r
  className?: string;\r
  children: React.ReactNode;\r
  isHovered?: MotionValue<number>;\r
};\r
\r
function DockLabel({ children, className = '', isHovered }: DockLabelProps) {\r
  const [isVisible, setIsVisible] = useState(false);\r
\r
  useEffect(() => {\r
    if (!isHovered) return;\r
    const unsubscribe = isHovered.on('change', latest => {\r
      setIsVisible(latest === 1);\r
    });\r
    return () => unsubscribe();\r
  }, [isHovered]);\r
\r
  return (\r
    <AnimatePresence>\r
      {isVisible && (\r
        <motion.div\r
          initial={{ opacity: 0, y: 0 }}\r
          animate={{ opacity: 1, y: -10 }}\r
          exit={{ opacity: 0, y: 0 }}\r
          transition={{ duration: 0.2 }}\r
          className={\`\${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060010] px-2 py-0.5 text-xs text-white\`}\r
          role="tooltip"\r
          style={{ x: '-50%' }}\r
        >\r
          {children}\r
        </motion.div>\r
      )}\r
    </AnimatePresence>\r
  );\r
}\r
\r
type DockIconProps = {\r
  className?: string;\r
  children: React.ReactNode;\r
  isHovered?: MotionValue<number>;\r
};\r
\r
function DockIcon({ children, className = '' }: DockIconProps) {\r
  return <div className={\`flex items-center justify-center \${className}\`}>{children}</div>;\r
}\r
\r
export default function Dock({\r
  items,\r
  className = '',\r
  spring = { mass: 0.1, stiffness: 150, damping: 12 },\r
  magnification = 70,\r
  distance = 200,\r
  panelHeight = 64,\r
  dockHeight = 256,\r
  baseItemSize = 50\r
}: DockProps) {\r
  const mouseX = useMotionValue(Infinity);\r
  const isHovered = useMotionValue(0);\r
\r
  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification]);\r
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);\r
  const height = useSpring(heightRow, spring);\r
\r
  return (\r
    <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">\r
      <motion.div\r
        onMouseMove={({ pageX }) => {\r
          isHovered.set(1);\r
          mouseX.set(pageX);\r
        }}\r
        onMouseLeave={() => {\r
          isHovered.set(0);\r
          mouseX.set(Infinity);\r
        }}\r
        className={\`\${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl border-neutral-700 border-2 pb-2 px-4\`}\r
        style={{ height: panelHeight }}\r
        role="toolbar"\r
        aria-label="Application dock"\r
      >\r
        {items.map((item, index) => (\r
          <DockItem\r
            key={index}\r
            onClick={item.onClick}\r
            className={item.className}\r
            mouseX={mouseX}\r
            spring={spring}\r
            distance={distance}\r
            magnification={magnification}\r
            baseItemSize={baseItemSize}\r
          >\r
            <DockIcon>{item.icon}</DockIcon>\r
            <DockLabel>{item.label}</DockLabel>\r
          </DockItem>\r
        ))}\r
      </motion.div>\r
    </motion.div>\r
  );\r
}\r
`,J={dependencies:"motion",usage:`import Dock from './Dock';

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  <Dock 
    items={items}
    panelHeight={68}
    baseItemSize={50}
    magnification={70}
  />`,code:O,css:F,tailwind:W,tsCode:G,tsTailwind:q},rn=()=>{const[t,o]=m.useState(68),[a,e]=m.useState(50),[d,c]=m.useState(70),[u,r]=T(),p=[{icon:n.jsx(N,{size:18}),label:"Home",onClick:()=>alert("Home!")},{icon:n.jsx(z,{size:18}),label:"Archive",onClick:()=>alert("Archive!")},{icon:n.jsx(M,{size:18}),label:"Profile",onClick:()=>alert("Profile!")},{icon:n.jsx(C,{size:18}),label:"Settings",onClick:()=>alert("Settings!")}],i=[{name:"items",type:"DockItemData[]",default:"[]",description:"Array of dock items. Each item should include an icon, label, onClick handler, and an optional className."},{name:"className",type:"string",default:'""',description:"Additional CSS classes for the dock panel."},{name:"distance",type:"number",default:"200",description:"Pixel distance used to calculate the magnification effect based on mouse proximity."},{name:"panelHeight",type:"number",default:"68",description:"Height (in pixels) of the dock panel."},{name:"baseItemSize",type:"number",default:"50",description:"The base size (in pixels) for each dock item."},{name:"dockHeight",type:"number",default:"256",description:"Maximum height (in pixels) of the dock container."},{name:"magnification",type:"number",default:"70",description:"The magnified size (in pixels) applied to a dock item when hovered."},{name:"spring",type:"SpringOptions",default:"{ mass: 0.1, stiffness: 150, damping: 12 }",description:"Configuration options for the spring animation."}];return n.jsxs(V,{children:[n.jsxs(R,{children:[n.jsxs(S,{position:"relative",className:"demo-container",minH:400,children:[n.jsx(D,{fontSize:"2rem",fontWeight:900,color:"#271E37",children:"Try it out!"}),n.jsx(B,{items:p,panelHeight:t,baseItemSize:a,magnification:d},u)]}),n.jsxs(j,{children:[n.jsx(k,{title:"Background Height",min:30,max:200,step:10,value:t,onChange:l=>{o(l),r()}}),n.jsx(k,{title:"Item Size",min:20,max:60,step:10,value:a,onChange:l=>{e(l),r()}}),n.jsx(k,{title:"Magnification",min:50,max:100,step:10,value:d,onChange:l=>{c(l),r()}})]}),n.jsx(X,{data:i}),n.jsx(E,{dependencyList:["motion"]})]}),n.jsx(w,{children:n.jsx(P,{codeObject:J})})]})};export{rn as default};
