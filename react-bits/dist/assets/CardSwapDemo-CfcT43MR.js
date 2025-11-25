import{r as n,e as T,g as j,j as r,B as u,T as b,ak as M,a as F}from"./index-wsKSLPNH.js";import{T as $,P as Y,a as X,C as V,b as B}from"./PropTable-C4uPWs8h.js";import{c as _,d as W,e as q}from"./index-Dgof5MVj.js";import{C as J}from"./Customize-1m_ZNqR9.js";import{D as Q}from"./Dependencies-BHoMfJUj.js";import{P as z}from"./PreviewSlider-m1G_aiYP.js";import{P as U}from"./PreviewSwitch-DqnF708j.js";import{u as G}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";const K="/assets/cs1-Chee3isR.webp",Z="/assets/cs2-D7NMRsmg.webp",rr="/assets/cs3-BURQntE8.webp",er=`import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';\r
import gsap from 'gsap';\r
import './CardSwap.css';\r
\r
export const Card = forwardRef(({ customClass, ...rest }, ref) => (\r
  <div ref={ref} {...rest} className={\`card \${customClass ?? ''} \${rest.className ?? ''}\`.trim()} />\r
));\r
Card.displayName = 'Card';\r
\r
const makeSlot = (i, distX, distY, total) => ({\r
  x: i * distX,\r
  y: -i * distY,\r
  z: -i * distX * 1.5,\r
  zIndex: total - i\r
});\r
const placeNow = (el, slot, skew) =>\r
  gsap.set(el, {\r
    x: slot.x,\r
    y: slot.y,\r
    z: slot.z,\r
    xPercent: -50,\r
    yPercent: -50,\r
    skewY: skew,\r
    transformOrigin: 'center center',\r
    zIndex: slot.zIndex,\r
    force3D: true\r
  });\r
\r
const CardSwap = ({\r
  width = 500,\r
  height = 400,\r
  cardDistance = 60,\r
  verticalDistance = 70,\r
  delay = 5000,\r
  pauseOnHover = false,\r
  onCardClick,\r
  skewAmount = 6,\r
  easing = 'elastic',\r
  children\r
}) => {\r
  const config =\r
    easing === 'elastic'\r
      ? {\r
          ease: 'elastic.out(0.6,0.9)',\r
          durDrop: 2,\r
          durMove: 2,\r
          durReturn: 2,\r
          promoteOverlap: 0.9,\r
          returnDelay: 0.05\r
        }\r
      : {\r
          ease: 'power1.inOut',\r
          durDrop: 0.8,\r
          durMove: 0.8,\r
          durReturn: 0.8,\r
          promoteOverlap: 0.45,\r
          returnDelay: 0.2\r
        };\r
\r
  const childArr = useMemo(() => Children.toArray(children), [children]);\r
  const refs = useMemo(\r
    () => childArr.map(() => React.createRef()),\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
    [childArr.length]\r
  );\r
\r
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));\r
\r
  const tlRef = useRef(null);\r
  const intervalRef = useRef();\r
  const container = useRef(null);\r
\r
  useEffect(() => {\r
    const total = refs.length;\r
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));\r
\r
    const swap = () => {\r
      if (order.current.length < 2) return;\r
\r
      const [front, ...rest] = order.current;\r
      const elFront = refs[front].current;\r
      const tl = gsap.timeline();\r
      tlRef.current = tl;\r
\r
      tl.to(elFront, {\r
        y: '+=500',\r
        duration: config.durDrop,\r
        ease: config.ease\r
      });\r
\r
      tl.addLabel('promote', \`-=\${config.durDrop * config.promoteOverlap}\`);\r
      rest.forEach((idx, i) => {\r
        const el = refs[idx].current;\r
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);\r
        tl.set(el, { zIndex: slot.zIndex }, 'promote');\r
        tl.to(\r
          el,\r
          {\r
            x: slot.x,\r
            y: slot.y,\r
            z: slot.z,\r
            duration: config.durMove,\r
            ease: config.ease\r
          },\r
          \`promote+=\${i * 0.15}\`\r
        );\r
      });\r
\r
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);\r
      tl.addLabel('return', \`promote+=\${config.durMove * config.returnDelay}\`);\r
      tl.call(\r
        () => {\r
          gsap.set(elFront, { zIndex: backSlot.zIndex });\r
        },\r
        undefined,\r
        'return'\r
      );\r
      tl.to(\r
        elFront,\r
        {\r
          x: backSlot.x,\r
          y: backSlot.y,\r
          z: backSlot.z,\r
          duration: config.durReturn,\r
          ease: config.ease\r
        },\r
        'return'\r
      );\r
\r
      tl.call(() => {\r
        order.current = [...rest, front];\r
      });\r
    };\r
\r
    swap();\r
    intervalRef.current = window.setInterval(swap, delay);\r
\r
    if (pauseOnHover) {\r
      const node = container.current;\r
      const pause = () => {\r
        tlRef.current?.pause();\r
        clearInterval(intervalRef.current);\r
      };\r
      const resume = () => {\r
        tlRef.current?.play();\r
        intervalRef.current = window.setInterval(swap, delay);\r
      };\r
      node.addEventListener('mouseenter', pause);\r
      node.addEventListener('mouseleave', resume);\r
      return () => {\r
        node.removeEventListener('mouseenter', pause);\r
        node.removeEventListener('mouseleave', resume);\r
        clearInterval(intervalRef.current);\r
      };\r
    }\r
    return () => clearInterval(intervalRef.current);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);\r
\r
  const rendered = childArr.map((child, i) =>\r
    isValidElement(child)\r
      ? cloneElement(child, {\r
          key: i,\r
          ref: refs[i],\r
          style: { width, height, ...(child.props.style ?? {}) },\r
          onClick: e => {\r
            child.props.onClick?.(e);\r
            onCardClick?.(i);\r
          }\r
        })\r
      : child\r
  );\r
\r
  return (\r
    <div ref={container} className="card-swap-container" style={{ width, height }}>\r
      {rendered}\r
    </div>\r
  );\r
};\r
\r
export default CardSwap;\r
`,nr=`.card-swap-container {\r
  position: absolute;\r
  bottom: 0;\r
  right: 0;\r
  transform: translate(5%, 20%);\r
  transform-origin: bottom right;\r
\r
  perspective: 900px;\r
  overflow: visible;\r
}\r
\r
.card {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  border-radius: 12px;\r
  border: 1px solid #fff;\r
  background: #000;\r
\r
  transform-style: preserve-3d;\r
  will-change: transform;\r
  backface-visibility: hidden;\r
  -webkit-backface-visibility: hidden;\r
}\r
\r
@media (max-width: 768px) {\r
  .card-swap-container {\r
    transform: scale(0.75) translate(25%, 25%);\r
  }\r
}\r
\r
@media (max-width: 480px) {\r
  .card-swap-container {\r
    transform: scale(0.55) translate(25%, 25%);\r
  }\r
}\r
`,tr=`import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';\r
import gsap from 'gsap';\r
\r
export const Card = forwardRef(({ customClass, ...rest }, ref) => (\r
  <div\r
    ref={ref}\r
    {...rest}\r
    className={\`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] \${customClass ?? ''} \${rest.className ?? ''}\`.trim()}\r
  />\r
));\r
Card.displayName = 'Card';\r
\r
const makeSlot = (i, distX, distY, total) => ({\r
  x: i * distX,\r
  y: -i * distY,\r
  z: -i * distX * 1.5,\r
  zIndex: total - i\r
});\r
\r
const placeNow = (el, slot, skew) =>\r
  gsap.set(el, {\r
    x: slot.x,\r
    y: slot.y,\r
    z: slot.z,\r
    xPercent: -50,\r
    yPercent: -50,\r
    skewY: skew,\r
    transformOrigin: 'center center',\r
    zIndex: slot.zIndex,\r
    force3D: true\r
  });\r
\r
const CardSwap = ({\r
  width = 500,\r
  height = 400,\r
  cardDistance = 60,\r
  verticalDistance = 70,\r
  delay = 5000,\r
  pauseOnHover = false,\r
  onCardClick,\r
  skewAmount = 6,\r
  easing = 'elastic',\r
  children\r
}) => {\r
  const config =\r
    easing === 'elastic'\r
      ? {\r
          ease: 'elastic.out(0.6,0.9)',\r
          durDrop: 2,\r
          durMove: 2,\r
          durReturn: 2,\r
          promoteOverlap: 0.9,\r
          returnDelay: 0.05\r
        }\r
      : {\r
          ease: 'power1.inOut',\r
          durDrop: 0.8,\r
          durMove: 0.8,\r
          durReturn: 0.8,\r
          promoteOverlap: 0.45,\r
          returnDelay: 0.2\r
        };\r
\r
  const childArr = useMemo(() => Children.toArray(children), [children]);\r
  const refs = useMemo(\r
    () => childArr.map(() => React.createRef()),\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
    [childArr.length]\r
  );\r
\r
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));\r
\r
  const tlRef = useRef(null);\r
  const intervalRef = useRef();\r
  const container = useRef(null);\r
\r
  useEffect(() => {\r
    const total = refs.length;\r
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));\r
\r
    const swap = () => {\r
      if (order.current.length < 2) return;\r
\r
      const [front, ...rest] = order.current;\r
      const elFront = refs[front].current;\r
      const tl = gsap.timeline();\r
      tlRef.current = tl;\r
\r
      tl.to(elFront, {\r
        y: '+=500',\r
        duration: config.durDrop,\r
        ease: config.ease\r
      });\r
\r
      tl.addLabel('promote', \`-=\${config.durDrop * config.promoteOverlap}\`);\r
      rest.forEach((idx, i) => {\r
        const el = refs[idx].current;\r
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);\r
        tl.set(el, { zIndex: slot.zIndex }, 'promote');\r
        tl.to(\r
          el,\r
          {\r
            x: slot.x,\r
            y: slot.y,\r
            z: slot.z,\r
            duration: config.durMove,\r
            ease: config.ease\r
          },\r
          \`promote+=\${i * 0.15}\`\r
        );\r
      });\r
\r
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);\r
      tl.addLabel('return', \`promote+=\${config.durMove * config.returnDelay}\`);\r
      tl.call(\r
        () => {\r
          gsap.set(elFront, { zIndex: backSlot.zIndex });\r
        },\r
        undefined,\r
        'return'\r
      );\r
      tl.to(\r
        elFront,\r
        {\r
          x: backSlot.x,\r
          y: backSlot.y,\r
          z: backSlot.z,\r
          duration: config.durReturn,\r
          ease: config.ease\r
        },\r
        'return'\r
      );\r
\r
      tl.call(() => {\r
        order.current = [...rest, front];\r
      });\r
    };\r
\r
    swap();\r
    intervalRef.current = window.setInterval(swap, delay);\r
\r
    if (pauseOnHover) {\r
      const node = container.current;\r
      const pause = () => {\r
        tlRef.current?.pause();\r
        clearInterval(intervalRef.current);\r
      };\r
      const resume = () => {\r
        tlRef.current?.play();\r
        intervalRef.current = window.setInterval(swap, delay);\r
      };\r
      node.addEventListener('mouseenter', pause);\r
      node.addEventListener('mouseleave', resume);\r
      return () => {\r
        node.removeEventListener('mouseenter', pause);\r
        node.removeEventListener('mouseleave', resume);\r
        clearInterval(intervalRef.current);\r
      };\r
    }\r
    return () => clearInterval(intervalRef.current);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);\r
\r
  const rendered = childArr.map((child, i) =>\r
    isValidElement(child)\r
      ? cloneElement(child, {\r
          key: i,\r
          ref: refs[i],\r
          style: { width, height, ...(child.props.style ?? {}) },\r
          onClick: e => {\r
            child.props.onClick?.(e);\r
            onCardClick?.(i);\r
          }\r
        })\r
      : child\r
  );\r
\r
  return (\r
    <div\r
      ref={container}\r
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"\r
      style={{ width, height }}\r
    >\r
      {rendered}\r
    </div>\r
  );\r
};\r
\r
export default CardSwap;\r
`,sr=`import React, {\r
  Children,\r
  cloneElement,\r
  forwardRef,\r
  isValidElement,\r
  ReactElement,\r
  ReactNode,\r
  RefObject,\r
  useEffect,\r
  useMemo,\r
  useRef\r
} from 'react';\r
import gsap from 'gsap';\r
import './CardSwap.css';\r
\r
export interface CardSwapProps {\r
  width?: number | string;\r
  height?: number | string;\r
  cardDistance?: number;\r
  verticalDistance?: number;\r
  delay?: number;\r
  pauseOnHover?: boolean;\r
  onCardClick?: (idx: number) => void;\r
  skewAmount?: number;\r
  easing?: 'linear' | 'elastic';\r
  children: ReactNode;\r
}\r
\r
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {\r
  customClass?: string;\r
}\r
\r
export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (\r
  <div ref={ref} {...rest} className={\`card \${customClass ?? ''} \${rest.className ?? ''}\`.trim()} />\r
));\r
Card.displayName = 'Card';\r
\r
type CardRef = RefObject<HTMLDivElement>;\r
interface Slot {\r
  x: number;\r
  y: number;\r
  z: number;\r
  zIndex: number;\r
}\r
\r
const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({\r
  x: i * distX,\r
  y: -i * distY,\r
  z: -i * distX * 1.5,\r
  zIndex: total - i\r
});\r
\r
const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>\r
  gsap.set(el, {\r
    x: slot.x,\r
    y: slot.y,\r
    z: slot.z,\r
    xPercent: -50,\r
    yPercent: -50,\r
    skewY: skew,\r
    transformOrigin: 'center center',\r
    zIndex: slot.zIndex,\r
    force3D: true\r
  });\r
\r
const CardSwap: React.FC<CardSwapProps> = ({\r
  width = 500,\r
  height = 400,\r
  cardDistance = 60,\r
  verticalDistance = 70,\r
  delay = 5000,\r
  pauseOnHover = false,\r
  onCardClick,\r
  skewAmount = 6,\r
  easing = 'elastic',\r
  children\r
}) => {\r
  const config =\r
    easing === 'elastic'\r
      ? {\r
          ease: 'elastic.out(0.6,0.9)',\r
          durDrop: 2,\r
          durMove: 2,\r
          durReturn: 2,\r
          promoteOverlap: 0.9,\r
          returnDelay: 0.05\r
        }\r
      : {\r
          ease: 'power1.inOut',\r
          durDrop: 0.8,\r
          durMove: 0.8,\r
          durReturn: 0.8,\r
          promoteOverlap: 0.45,\r
          returnDelay: 0.2\r
        };\r
\r
  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);\r
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);\r
\r
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));\r
\r
  const tlRef = useRef<gsap.core.Timeline | null>(null);\r
  const intervalRef = useRef<number>();\r
  const container = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const total = refs.length;\r
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));\r
\r
    const swap = () => {\r
      if (order.current.length < 2) return;\r
\r
      const [front, ...rest] = order.current;\r
      const elFront = refs[front].current!;\r
      const tl = gsap.timeline();\r
      tlRef.current = tl;\r
\r
      tl.to(elFront, {\r
        y: '+=500',\r
        duration: config.durDrop,\r
        ease: config.ease\r
      });\r
\r
      tl.addLabel('promote', \`-=\${config.durDrop * config.promoteOverlap}\`);\r
      rest.forEach((idx, i) => {\r
        const el = refs[idx].current!;\r
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);\r
        tl.set(el, { zIndex: slot.zIndex }, 'promote');\r
        tl.to(\r
          el,\r
          {\r
            x: slot.x,\r
            y: slot.y,\r
            z: slot.z,\r
            duration: config.durMove,\r
            ease: config.ease\r
          },\r
          \`promote+=\${i * 0.15}\`\r
        );\r
      });\r
\r
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);\r
      tl.addLabel('return', \`promote+=\${config.durMove * config.returnDelay}\`);\r
      tl.call(\r
        () => {\r
          gsap.set(elFront, { zIndex: backSlot.zIndex });\r
        },\r
        undefined,\r
        'return'\r
      );\r
      tl.to(\r
        elFront,\r
        {\r
          x: backSlot.x,\r
          y: backSlot.y,\r
          z: backSlot.z,\r
          duration: config.durReturn,\r
          ease: config.ease\r
        },\r
        'return'\r
      );\r
\r
      tl.call(() => {\r
        order.current = [...rest, front];\r
      });\r
    };\r
\r
    swap();\r
    intervalRef.current = window.setInterval(swap, delay);\r
\r
    if (pauseOnHover) {\r
      const node = container.current!;\r
      const pause = () => {\r
        tlRef.current?.pause();\r
        clearInterval(intervalRef.current);\r
      };\r
      const resume = () => {\r
        tlRef.current?.play();\r
        intervalRef.current = window.setInterval(swap, delay);\r
      };\r
      node.addEventListener('mouseenter', pause);\r
      node.addEventListener('mouseleave', resume);\r
      return () => {\r
        node.removeEventListener('mouseenter', pause);\r
        node.removeEventListener('mouseleave', resume);\r
        clearInterval(intervalRef.current);\r
      };\r
    }\r
    return () => clearInterval(intervalRef.current);\r
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);\r
\r
  const rendered = childArr.map((child, i) =>\r
    isValidElement<CardProps>(child)\r
      ? cloneElement(child, {\r
          key: i,\r
          ref: refs[i],\r
          style: { width, height, ...(child.props.style ?? {}) },\r
          onClick: e => {\r
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);\r
            onCardClick?.(i);\r
          }\r
        } as CardProps & React.RefAttributes<HTMLDivElement>)\r
      : child\r
  );\r
\r
  return (\r
    <div ref={container} className="card-swap-container" style={{ width, height }}>\r
      {rendered}\r
    </div>\r
  );\r
};\r
\r
export default CardSwap;\r
`,ar=`import React, {\r
  Children,\r
  cloneElement,\r
  forwardRef,\r
  isValidElement,\r
  ReactElement,\r
  ReactNode,\r
  RefObject,\r
  useEffect,\r
  useMemo,\r
  useRef\r
} from 'react';\r
import gsap from 'gsap';\r
\r
export interface CardSwapProps {\r
  width?: number | string;\r
  height?: number | string;\r
  cardDistance?: number;\r
  verticalDistance?: number;\r
  delay?: number;\r
  pauseOnHover?: boolean;\r
  onCardClick?: (idx: number) => void;\r
  skewAmount?: number;\r
  easing?: 'linear' | 'elastic';\r
  children: ReactNode;\r
}\r
\r
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {\r
  customClass?: string;\r
}\r
\r
export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (\r
  <div\r
    ref={ref}\r
    {...rest}\r
    className={\`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] \${customClass ?? ''} \${rest.className ?? ''}\`.trim()}\r
  />\r
));\r
Card.displayName = 'Card';\r
\r
type CardRef = RefObject<HTMLDivElement>;\r
interface Slot {\r
  x: number;\r
  y: number;\r
  z: number;\r
  zIndex: number;\r
}\r
\r
const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({\r
  x: i * distX,\r
  y: -i * distY,\r
  z: -i * distX * 1.5,\r
  zIndex: total - i\r
});\r
\r
const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>\r
  gsap.set(el, {\r
    x: slot.x,\r
    y: slot.y,\r
    z: slot.z,\r
    xPercent: -50,\r
    yPercent: -50,\r
    skewY: skew,\r
    transformOrigin: 'center center',\r
    zIndex: slot.zIndex,\r
    force3D: true\r
  });\r
\r
const CardSwap: React.FC<CardSwapProps> = ({\r
  width = 500,\r
  height = 400,\r
  cardDistance = 60,\r
  verticalDistance = 70,\r
  delay = 5000,\r
  pauseOnHover = false,\r
  onCardClick,\r
  skewAmount = 6,\r
  easing = 'elastic',\r
  children\r
}) => {\r
  const config =\r
    easing === 'elastic'\r
      ? {\r
          ease: 'elastic.out(0.6,0.9)',\r
          durDrop: 2,\r
          durMove: 2,\r
          durReturn: 2,\r
          promoteOverlap: 0.9,\r
          returnDelay: 0.05\r
        }\r
      : {\r
          ease: 'power1.inOut',\r
          durDrop: 0.8,\r
          durMove: 0.8,\r
          durReturn: 0.8,\r
          promoteOverlap: 0.45,\r
          returnDelay: 0.2\r
        };\r
\r
  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);\r
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);\r
\r
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));\r
\r
  const tlRef = useRef<gsap.core.Timeline | null>(null);\r
  const intervalRef = useRef<number>();\r
  const container = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const total = refs.length;\r
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));\r
\r
    const swap = () => {\r
      if (order.current.length < 2) return;\r
\r
      const [front, ...rest] = order.current;\r
      const elFront = refs[front].current!;\r
      const tl = gsap.timeline();\r
      tlRef.current = tl;\r
\r
      tl.to(elFront, {\r
        y: '+=500',\r
        duration: config.durDrop,\r
        ease: config.ease\r
      });\r
\r
      tl.addLabel('promote', \`-=\${config.durDrop * config.promoteOverlap}\`);\r
      rest.forEach((idx, i) => {\r
        const el = refs[idx].current!;\r
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);\r
        tl.set(el, { zIndex: slot.zIndex }, 'promote');\r
        tl.to(\r
          el,\r
          {\r
            x: slot.x,\r
            y: slot.y,\r
            z: slot.z,\r
            duration: config.durMove,\r
            ease: config.ease\r
          },\r
          \`promote+=\${i * 0.15}\`\r
        );\r
      });\r
\r
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);\r
      tl.addLabel('return', \`promote+=\${config.durMove * config.returnDelay}\`);\r
      tl.call(\r
        () => {\r
          gsap.set(elFront, { zIndex: backSlot.zIndex });\r
        },\r
        undefined,\r
        'return'\r
      );\r
      tl.to(\r
        elFront,\r
        {\r
          x: backSlot.x,\r
          y: backSlot.y,\r
          z: backSlot.z,\r
          duration: config.durReturn,\r
          ease: config.ease\r
        },\r
        'return'\r
      );\r
\r
      tl.call(() => {\r
        order.current = [...rest, front];\r
      });\r
    };\r
\r
    swap();\r
    intervalRef.current = window.setInterval(swap, delay);\r
\r
    if (pauseOnHover) {\r
      const node = container.current!;\r
      const pause = () => {\r
        tlRef.current?.pause();\r
        clearInterval(intervalRef.current);\r
      };\r
      const resume = () => {\r
        tlRef.current?.play();\r
        intervalRef.current = window.setInterval(swap, delay);\r
      };\r
      node.addEventListener('mouseenter', pause);\r
      node.addEventListener('mouseleave', resume);\r
      return () => {\r
        node.removeEventListener('mouseenter', pause);\r
        node.removeEventListener('mouseleave', resume);\r
        clearInterval(intervalRef.current);\r
      };\r
    }\r
    return () => clearInterval(intervalRef.current);\r
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);\r
\r
  const rendered = childArr.map((child, i) =>\r
    isValidElement<CardProps>(child)\r
      ? cloneElement(child, {\r
          key: i,\r
          ref: refs[i],\r
          style: { width, height, ...(child.props.style ?? {}) },\r
          onClick: e => {\r
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);\r
            onCardClick?.(i);\r
          }\r
        } as CardProps & React.RefAttributes<HTMLDivElement>)\r
      : child\r
  );\r
\r
  return (\r
    <div\r
      ref={container}\r
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"\r
      style={{ width, height }}\r
    >\r
      {rendered}\r
    </div>\r
  );\r
};\r
\r
export default CardSwap;\r
`,or={dependencies:"gsap",usage:`import CardSwap, { Card } from './CardSwap'

<div style={{ height: '600px', position: 'relative' }}>
  <CardSwap
    cardDistance={60}
    verticalDistance={70}
    delay={5000}
    pauseOnHover={false}
  >
    <Card>
      <h3>Card 1</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 2</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 3</h3>
      <p>Your content here</p>
    </Card>
  </CardSwap>
</div>`,code:er,css:nr,tailwind:tr,tsCode:sr,tsTailwind:ar},I=n.forwardRef(({customClass:o,...e},l)=>r.jsx("div",{ref:l,...e,className:`card ${o??""} ${e.className??""}`.trim()}));I.displayName="Card";const A=(o,e,l,f)=>({x:o*e,y:-o*l,z:-o*e*1.5,zIndex:f-o}),lr=(o,e,l)=>j.set(o,{x:e.x,y:e.y,z:e.z,xPercent:-50,yPercent:-50,skewY:l,transformOrigin:"center center",zIndex:e.zIndex,force3D:!0}),ir=({width:o=500,height:e=400,cardDistance:l=60,verticalDistance:f=70,delay:v=5e3,pauseOnHover:C=!1,onCardClick:x,skewAmount:D=6,easing:w="elastic",children:k})=>{const a=w==="elastic"?{ease:"elastic.out(0.6,0.9)",durDrop:2,durMove:2,durReturn:2,promoteOverlap:.9,returnDelay:.05}:{ease:"power1.inOut",durDrop:.8,durMove:.8,durReturn:.8,promoteOverlap:.45,returnDelay:.2},g=n.useMemo(()=>n.Children.toArray(k),[k]),i=n.useMemo(()=>g.map(()=>T.createRef()),[g.length]),y=n.useRef(Array.from({length:g.length},(h,p)=>p)),R=n.useRef(null),t=n.useRef(),L=n.useRef(null);n.useEffect(()=>{const h=i.length;i.forEach((c,d)=>lr(c.current,A(d,l,f,h),D));const p=()=>{if(y.current.length<2)return;const[c,...d]=y.current,m=i[c].current,s=j.timeline();R.current=s,s.to(m,{y:"+=500",duration:a.durDrop,ease:a.ease}),s.addLabel("promote",`-=${a.durDrop*a.promoteOverlap}`),d.forEach((P,O)=>{const H=i[P].current,E=A(O,l,f,i.length);s.set(H,{zIndex:E.zIndex},"promote"),s.to(H,{x:E.x,y:E.y,z:E.z,duration:a.durMove,ease:a.ease},`promote+=${O*.15}`)});const S=A(i.length-1,l,f,i.length);s.addLabel("return",`promote+=${a.durMove*a.returnDelay}`),s.call(()=>{j.set(m,{zIndex:S.zIndex})},void 0,"return"),s.to(m,{x:S.x,y:S.y,z:S.z,duration:a.durReturn,ease:a.ease},"return"),s.call(()=>{y.current=[...d,c]})};if(p(),t.current=window.setInterval(p,v),C){const c=L.current,d=()=>{var s;(s=R.current)==null||s.pause(),clearInterval(t.current)},m=()=>{var s;(s=R.current)==null||s.play(),t.current=window.setInterval(p,v)};return c.addEventListener("mouseenter",d),c.addEventListener("mouseleave",m),()=>{c.removeEventListener("mouseenter",d),c.removeEventListener("mouseleave",m),clearInterval(t.current)}}return()=>clearInterval(t.current)},[l,f,v,C,D,w]);const N=g.map((h,p)=>n.isValidElement(h)?n.cloneElement(h,{key:p,ref:i[p],style:{width:o,height:e,...h.props.style??{}},onClick:c=>{var d,m;(m=(d=h.props).onClick)==null||m.call(d,c),x==null||x(p)}}):h);return r.jsx("div",{ref:L,className:"card-swap-container",style:{width:o,height:e},children:N})},gr=()=>{const[o,e]=G(),[l,f]=n.useState(60),[v,C]=n.useState(70),[x,D]=n.useState(5e3),[w,k]=n.useState(6),[a,g]=n.useState("elastic"),[i,y]=n.useState(!1),R=[{name:"width",type:"number | string",default:"500",description:"Width of the card container"},{name:"height",type:"number | string",default:"400",description:"Height of the card container"},{name:"cardDistance",type:"number",default:"60",description:"X-axis spacing between cards"},{name:"verticalDistance",type:"number",default:"70",description:"Y-axis spacing between cards"},{name:"delay",type:"number",default:"5000",description:"Milliseconds between card swaps"},{name:"pauseOnHover",type:"boolean",default:"false",description:"Whether to pause animation on hover"},{name:"onCardClick",type:"(idx: number) => void",default:"undefined",description:"Callback function when a card is clicked"},{name:"skewAmount",type:"number",default:"6",description:"Degree of slope for top/bottom edges"},{name:"easing",type:"'linear' | 'elastic'",default:"'elastic'",description:"Animation easing type"},{name:"children",type:"ReactNode",default:"required",description:"Card components to display in the stack"}];return r.jsxs($,{children:[r.jsxs(Y,{children:[r.jsxs(u,{className:"demo-container",h:500,overflow:"hidden",display:"flex",flexDirection:{base:"column",lg:"row"},position:"relative",children:[r.jsxs(u,{pl:{base:0,lg:0},w:{base:"100%",lg:"50%"},h:{base:"auto",lg:"100%"},display:"flex",flexDirection:"column",justifyContent:{base:"flex-start",lg:"center"},alignItems:{base:"center",lg:"flex-start"},textAlign:{base:"center",lg:"left"},pt:{base:8,lg:0},pb:{base:4,lg:0},px:{base:4,lg:4},children:[r.jsxs(b,{fontSize:{base:"2xl",md:"3xl",lg:"4xl"},mb:4,fontWeight:500,lineHeight:1.1,pl:{base:0,lg:"6rem"},children:["Card stacks have never"," ",r.jsx(u,{as:"span",display:{base:"inline",lg:"block"},children:"looked so good"})]}),r.jsx(b,{fontSize:{base:"lg",lg:"xl"},mb:4,fontWeight:400,lineHeight:1.1,color:"#999",pl:{base:0,lg:"6rem"},children:"Just look at it go!"})]}),r.jsx(u,{w:{base:"100%",lg:"50%"},h:{base:"400px",lg:"100%"},position:"relative",children:r.jsxs(ir,{cardDistance:l,verticalDistance:v,delay:x,skewAmount:w,easing:a,pauseOnHover:i,children:[r.jsxs(I,{customClass:"one",style:{display:"flex",flexDirection:"column",overflow:"hidden"},children:[r.jsx(u,{borderBottom:"1px solid #fff",bg:"linear-gradient(to top, #0D0716, #060606)",flexShrink:0,children:r.jsxs(b,{m:2,children:[r.jsx(M,{as:_,mr:2}),"Smooth"]})}),r.jsx(u,{position:"relative",flex:1,children:r.jsx("img",{src:K,alt:"Card Swap Demo 1",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}})})]}),r.jsxs(I,{customClass:"two",style:{display:"flex",flexDirection:"column",overflow:"hidden"},children:[r.jsx(u,{borderBottom:"1px solid #fff",bg:"linear-gradient(to top, #0D0716, #060606)",flexShrink:0,children:r.jsxs(b,{m:2,children:[r.jsx(M,{as:W,mr:2}),"Reliable"]})}),r.jsx(u,{position:"relative",flex:1,children:r.jsx("img",{src:Z,alt:"Card Swap Demo 2",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}})})]}),r.jsxs(I,{customClass:"three",style:{display:"flex",flexDirection:"column",overflow:"hidden"},children:[r.jsx(u,{borderBottom:"1px solid #fff",bg:"linear-gradient(to top, #0D0716, #060606)",flexShrink:0,children:r.jsxs(b,{m:2,children:[r.jsx(M,{as:q,mr:2}),"Customizable"]})}),r.jsx(u,{position:"relative",flex:1,children:r.jsx("img",{src:rr,alt:"Card Swap Demo 3",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}})})]})]},o)})]}),r.jsxs(J,{children:[r.jsx(U,{title:"Pause On Hover",isChecked:i,onChange:t=>{y(t),e()}}),r.jsx(z,{title:"Card Distance",min:30,max:100,step:5,value:l,onChange:t=>{f(t),e()}}),r.jsx(z,{title:"Vertical Distance",min:40,max:120,step:5,value:v,onChange:t=>{C(t),e()}}),r.jsx(z,{title:"Delay (ms)",min:3e3,max:8e3,step:500,value:x,onChange:t=>{D(t),e()}}),r.jsx(z,{title:"Skew Amount",min:0,max:12,step:1,value:w,onChange:t=>{k(t),e()}}),r.jsxs(F,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:8,onClick:()=>{g(a==="elastic"?"linear":"elastic"),e()},children:["Easing: ",r.jsxs(b,{color:"#a1a1aa",children:[" ",a]})]})]}),r.jsx(X,{data:R}),r.jsx(Q,{dependencyList:["gsap"]})]}),r.jsx(V,{children:r.jsx(B,{codeObject:or})})]})};export{gr as default};
