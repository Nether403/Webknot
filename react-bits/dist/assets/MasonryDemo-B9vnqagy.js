import{r as o,g as f,j as r,B as q}from"./index-wsKSLPNH.js";import{T as O,P as F,a as C,C as j,b as z}from"./PropTable-C4uPWs8h.js";import{C as W}from"./Customize-1m_ZNqR9.js";import{D as N}from"./Dependencies-BHoMfJUj.js";import{R as $}from"./RefreshButton-CA3SFRlq.js";import{P as I}from"./PreviewSelect-B8u33nUa.js";import{P}from"./PreviewSlider-m1G_aiYP.js";import{P as k}from"./PreviewSwitch-DqnF708j.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const V=`import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
\r
import './Masonry.css';\r
\r
const useMedia = (queries, values, defaultValue) => {\r
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;\r
\r
  const [value, setValue] = useState(get);\r
\r
  useEffect(() => {\r
    const handler = () => setValue(get);\r
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));\r
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [queries]);\r
\r
  return value;\r
};\r
\r
const useMeasure = () => {\r
  const ref = useRef(null);\r
  const [size, setSize] = useState({ width: 0, height: 0 });\r
\r
  useLayoutEffect(() => {\r
    if (!ref.current) return;\r
    const ro = new ResizeObserver(([entry]) => {\r
      const { width, height } = entry.contentRect;\r
      setSize({ width, height });\r
    });\r
    ro.observe(ref.current);\r
    return () => ro.disconnect();\r
  }, []);\r
\r
  return [ref, size];\r
};\r
\r
const preloadImages = async urls => {\r
  await Promise.all(\r
    urls.map(\r
      src =>\r
        new Promise(resolve => {\r
          const img = new Image();\r
          img.src = src;\r
          img.onload = img.onerror = () => resolve();\r
        })\r
    )\r
  );\r
};\r
\r
const Masonry = ({\r
  items,\r
  ease = 'power3.out',\r
  duration = 0.6,\r
  stagger = 0.05,\r
  animateFrom = 'bottom',\r
  scaleOnHover = true,\r
  hoverScale = 0.95,\r
  blurToFocus = true,\r
  colorShiftOnHover = false\r
}) => {\r
  const columns = useMedia(\r
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],\r
    [5, 4, 3, 2],\r
    1\r
  );\r
\r
  const [containerRef, { width }] = useMeasure();\r
  const [imagesReady, setImagesReady] = useState(false);\r
\r
  const getInitialPosition = item => {\r
    const containerRect = containerRef.current?.getBoundingClientRect();\r
    if (!containerRect) return { x: item.x, y: item.y };\r
\r
    let direction = animateFrom;\r
\r
    if (animateFrom === 'random') {\r
      const directions = ['top', 'bottom', 'left', 'right'];\r
      direction = directions[Math.floor(Math.random() * directions.length)];\r
    }\r
\r
    switch (direction) {\r
      case 'top':\r
        return { x: item.x, y: -200 };\r
      case 'bottom':\r
        return { x: item.x, y: window.innerHeight + 200 };\r
      case 'left':\r
        return { x: -200, y: item.y };\r
      case 'right':\r
        return { x: window.innerWidth + 200, y: item.y };\r
      case 'center':\r
        return {\r
          x: containerRect.width / 2 - item.w / 2,\r
          y: containerRect.height / 2 - item.h / 2\r
        };\r
      default:\r
        return { x: item.x, y: item.y + 100 };\r
    }\r
  };\r
\r
  useEffect(() => {\r
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));\r
  }, [items]);\r
\r
  const grid = useMemo(() => {\r
    if (!width) return [];\r
\r
    const colHeights = new Array(columns).fill(0);\r
    const columnWidth = width / columns;\r
\r
    return items.map(child => {\r
      const col = colHeights.indexOf(Math.min(...colHeights));\r
      const x = columnWidth * col;\r
      const height = child.height / 2;\r
      const y = colHeights[col];\r
\r
      colHeights[col] += height;\r
\r
      return { ...child, x, y, w: columnWidth, h: height };\r
    });\r
  }, [columns, items, width]);\r
\r
  const hasMounted = useRef(false);\r
\r
  useLayoutEffect(() => {\r
    if (!imagesReady) return;\r
\r
    grid.forEach((item, index) => {\r
      const selector = \`[data-key="\${item.id}"]\`;\r
      const animationProps = {\r
        x: item.x,\r
        y: item.y,\r
        width: item.w,\r
        height: item.h\r
      };\r
\r
      if (!hasMounted.current) {\r
        const initialPos = getInitialPosition(item, index);\r
        const initialState = {\r
          opacity: 0,\r
          x: initialPos.x,\r
          y: initialPos.y,\r
          width: item.w,\r
          height: item.h,\r
          ...(blurToFocus && { filter: 'blur(10px)' })\r
        };\r
\r
        gsap.fromTo(selector, initialState, {\r
          opacity: 1,\r
          ...animationProps,\r
          ...(blurToFocus && { filter: 'blur(0px)' }),\r
          duration: 0.8,\r
          ease: 'power3.out',\r
          delay: index * stagger\r
        });\r
      } else {\r
        gsap.to(selector, {\r
          ...animationProps,\r
          duration: duration,\r
          ease: ease,\r
          overwrite: 'auto'\r
        });\r
      }\r
    });\r
\r
    hasMounted.current = true;\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);\r
\r
  const handleMouseEnter = (e, item) => {\r
    const element = e.currentTarget;\r
    const selector = \`[data-key="\${item.id}"]\`;\r
\r
    if (scaleOnHover) {\r
      gsap.to(selector, {\r
        scale: hoverScale,\r
        duration: 0.3,\r
        ease: 'power2.out'\r
      });\r
    }\r
\r
    if (colorShiftOnHover) {\r
      const overlay = element.querySelector('.color-overlay');\r
      if (overlay) {\r
        gsap.to(overlay, {\r
          opacity: 0.3,\r
          duration: 0.3\r
        });\r
      }\r
    }\r
  };\r
\r
  const handleMouseLeave = (e, item) => {\r
    const element = e.currentTarget;\r
    const selector = \`[data-key="\${item.id}"]\`;\r
\r
    if (scaleOnHover) {\r
      gsap.to(selector, {\r
        scale: 1,\r
        duration: 0.3,\r
        ease: 'power2.out'\r
      });\r
    }\r
\r
    if (colorShiftOnHover) {\r
      const overlay = element.querySelector('.color-overlay');\r
      if (overlay) {\r
        gsap.to(overlay, {\r
          opacity: 0,\r
          duration: 0.3\r
        });\r
      }\r
    }\r
  };\r
\r
  return (\r
    <div ref={containerRef} className="list">\r
      {grid.map(item => {\r
        return (\r
          <div\r
            key={item.id}\r
            data-key={item.id}\r
            className="item-wrapper"\r
            onClick={() => window.open(item.url, '_blank', 'noopener')}\r
            onMouseEnter={e => handleMouseEnter(e, item)}\r
            onMouseLeave={e => handleMouseLeave(e, item)}\r
          >\r
            <div className="item-img" style={{ backgroundImage: \`url(\${item.img})\` }}>\r
              {colorShiftOnHover && (\r
                <div\r
                  className="color-overlay"\r
                  style={{\r
                    position: 'absolute',\r
                    top: 0,\r
                    left: 0,\r
                    width: '100%',\r
                    height: '100%',\r
                    background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',\r
                    opacity: 0,\r
                    pointerEvents: 'none',\r
                    borderRadius: '8px'\r
                  }}\r
                />\r
              )}\r
            </div>\r
          </div>\r
        );\r
      })}\r
    </div>\r
  );\r
};\r
\r
export default Masonry;\r
`,G=`import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
\r
const useMedia = (queries, values, defaultValue) => {\r
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;\r
\r
  const [value, setValue] = useState(get);\r
\r
  useEffect(() => {\r
    const handler = () => setValue(get);\r
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));\r
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [queries]);\r
\r
  return value;\r
};\r
\r
const useMeasure = () => {\r
  const ref = useRef(null);\r
  const [size, setSize] = useState({ width: 0, height: 0 });\r
\r
  useLayoutEffect(() => {\r
    if (!ref.current) return;\r
    const ro = new ResizeObserver(([entry]) => {\r
      const { width, height } = entry.contentRect;\r
      setSize({ width, height });\r
    });\r
    ro.observe(ref.current);\r
    return () => ro.disconnect();\r
  }, []);\r
\r
  return [ref, size];\r
};\r
\r
const preloadImages = async urls => {\r
  await Promise.all(\r
    urls.map(\r
      src =>\r
        new Promise(resolve => {\r
          const img = new Image();\r
          img.src = src;\r
          img.onload = img.onerror = () => resolve();\r
        })\r
    )\r
  );\r
};\r
\r
const Masonry = ({\r
  items,\r
  ease = 'power3.out',\r
  duration = 0.6,\r
  stagger = 0.05,\r
  animateFrom = 'bottom',\r
  scaleOnHover = true,\r
  hoverScale = 0.95,\r
  blurToFocus = true,\r
  colorShiftOnHover = false\r
}) => {\r
  const columns = useMedia(\r
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],\r
    [5, 4, 3, 2],\r
    1\r
  );\r
\r
  const [containerRef, { width }] = useMeasure();\r
  const [imagesReady, setImagesReady] = useState(false);\r
\r
  const getInitialPosition = item => {\r
    const containerRect = containerRef.current?.getBoundingClientRect();\r
    if (!containerRect) return { x: item.x, y: item.y };\r
\r
    let direction = animateFrom;\r
    if (animateFrom === 'random') {\r
      const dirs = ['top', 'bottom', 'left', 'right'];\r
      direction = dirs[Math.floor(Math.random() * dirs.length)];\r
    }\r
\r
    switch (direction) {\r
      case 'top':\r
        return { x: item.x, y: -200 };\r
      case 'bottom':\r
        return { x: item.x, y: window.innerHeight + 200 };\r
      case 'left':\r
        return { x: -200, y: item.y };\r
      case 'right':\r
        return { x: window.innerWidth + 200, y: item.y };\r
      case 'center':\r
        return {\r
          x: containerRect.width / 2 - item.w / 2,\r
          y: containerRect.height / 2 - item.h / 2\r
        };\r
      default:\r
        return { x: item.x, y: item.y + 100 };\r
    }\r
  };\r
\r
  useEffect(() => {\r
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));\r
  }, [items]);\r
\r
  const grid = useMemo(() => {\r
    if (!width) return [];\r
    const colHeights = new Array(columns).fill(0);\r
    const gap = 16;\r
    const totalGaps = (columns - 1) * gap;\r
    const columnWidth = (width - totalGaps) / columns;\r
\r
    return items.map(child => {\r
      const col = colHeights.indexOf(Math.min(...colHeights));\r
      const x = col * (columnWidth + gap);\r
      const height = child.height / 2;\r
      const y = colHeights[col];\r
\r
      colHeights[col] += height + gap;\r
      return { ...child, x, y, w: columnWidth, h: height };\r
    });\r
  }, [columns, items, width]);\r
\r
  const hasMounted = useRef(false);\r
\r
  useLayoutEffect(() => {\r
    if (!imagesReady) return;\r
\r
    grid.forEach((item, index) => {\r
      const selector = \`[data-key="\${item.id}"]\`;\r
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };\r
\r
      if (!hasMounted.current) {\r
        const start = getInitialPosition(item);\r
        gsap.fromTo(\r
          selector,\r
          {\r
            opacity: 0,\r
            x: start.x,\r
            y: start.y,\r
            width: item.w,\r
            height: item.h,\r
            ...(blurToFocus && { filter: 'blur(10px)' })\r
          },\r
          {\r
            opacity: 1,\r
            ...animProps,\r
            ...(blurToFocus && { filter: 'blur(0px)' }),\r
            duration: 0.8,\r
            ease: 'power3.out',\r
            delay: index * stagger\r
          }\r
        );\r
      } else {\r
        gsap.to(selector, {\r
          ...animProps,\r
          duration,\r
          ease,\r
          overwrite: 'auto'\r
        });\r
      }\r
    });\r
\r
    hasMounted.current = true;\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);\r
\r
  const handleMouseEnter = (id, element) => {\r
    if (scaleOnHover) {\r
      gsap.to(\`[data-key="\${id}"]\`, {\r
        scale: hoverScale,\r
        duration: 0.3,\r
        ease: 'power2.out'\r
      });\r
    }\r
    if (colorShiftOnHover) {\r
      const overlay = element.querySelector('.color-overlay');\r
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });\r
    }\r
  };\r
\r
  const handleMouseLeave = (id, element) => {\r
    if (scaleOnHover) {\r
      gsap.to(\`[data-key="\${id}"]\`, {\r
        scale: 1,\r
        duration: 0.3,\r
        ease: 'power2.out'\r
      });\r
    }\r
    if (colorShiftOnHover) {\r
      const overlay = element.querySelector('.color-overlay');\r
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });\r
    }\r
  };\r
\r
  return (\r
    <div ref={containerRef} className="relative w-full h-full">\r
      {grid.map(item => (\r
        <div\r
          key={item.id}\r
          data-key={item.id}\r
          className="absolute box-content"\r
          style={{ willChange: 'transform, width, height, opacity' }}\r
          onClick={() => window.open(item.url, '_blank', 'noopener')}\r
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}\r
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}\r
        >\r
          <div\r
            className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"\r
            style={{ backgroundImage: \`url(\${item.img})\` }}\r
          >\r
            {colorShiftOnHover && (\r
              <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />\r
            )}\r
          </div>\r
        </div>\r
      ))}\r
    </div>\r
  );\r
};\r
\r
export default Masonry;\r
`,_=`import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
\r
import './Masonry.css';\r
\r
const useMedia = (queries: string[], values: number[], defaultValue: number): number => {\r
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;\r
\r
  const [value, setValue] = useState<number>(get);\r
\r
  useEffect(() => {\r
    const handler = () => setValue(get);\r
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));\r
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));\r
  }, [queries]);\r
\r
  return value;\r
};\r
\r
const useMeasure = <T extends HTMLElement>() => {\r
  const ref = useRef<T | null>(null);\r
  const [size, setSize] = useState({ width: 0, height: 0 });\r
\r
  useLayoutEffect(() => {\r
    if (!ref.current) return;\r
    const ro = new ResizeObserver(([entry]) => {\r
      const { width, height } = entry.contentRect;\r
      setSize({ width, height });\r
    });\r
    ro.observe(ref.current);\r
    return () => ro.disconnect();\r
  }, []);\r
\r
  return [ref, size] as const;\r
};\r
\r
const preloadImages = async (urls: string[]): Promise<void> => {\r
  await Promise.all(\r
    urls.map(\r
      src =>\r
        new Promise<void>(resolve => {\r
          const img = new Image();\r
          img.src = src;\r
          img.onload = img.onerror = () => resolve();\r
        })\r
    )\r
  );\r
};\r
\r
interface Item {\r
  id: string;\r
  img: string;\r
  url: string;\r
  height: number;\r
}\r
\r
interface GridItem extends Item {\r
  x: number;\r
  y: number;\r
  w: number;\r
  h: number;\r
}\r
\r
interface MasonryProps {\r
  items: Item[];\r
  ease?: string;\r
  duration?: number;\r
  stagger?: number;\r
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';\r
  scaleOnHover?: boolean;\r
  hoverScale?: number;\r
  blurToFocus?: boolean;\r
  colorShiftOnHover?: boolean;\r
}\r
\r
const Masonry: React.FC<MasonryProps> = ({\r
  items,\r
  ease = 'power3.out',\r
  duration = 0.6,\r
  stagger = 0.05,\r
  animateFrom = 'bottom',\r
  scaleOnHover = true,\r
  hoverScale = 0.95,\r
  blurToFocus = true,\r
  colorShiftOnHover = false\r
}) => {\r
  const columns = useMedia(\r
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],\r
    [5, 4, 3, 2],\r
    1\r
  );\r
\r
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();\r
  const [imagesReady, setImagesReady] = useState(false);\r
\r
  const getInitialPosition = (item: GridItem) => {\r
    const containerRect = containerRef.current?.getBoundingClientRect();\r
    if (!containerRect) return { x: item.x, y: item.y };\r
\r
    let direction = animateFrom;\r
\r
    if (animateFrom === 'random') {\r
      const directions = ['top', 'bottom', 'left', 'right'];\r
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom;\r
    }\r
\r
    switch (direction) {\r
      case 'top':\r
        return { x: item.x, y: -200 };\r
      case 'bottom':\r
        return { x: item.x, y: window.innerHeight + 200 };\r
      case 'left':\r
        return { x: -200, y: item.y };\r
      case 'right':\r
        return { x: window.innerWidth + 200, y: item.y };\r
      case 'center':\r
        return {\r
          x: containerRect.width / 2 - item.w / 2,\r
          y: containerRect.height / 2 - item.h / 2\r
        };\r
      default:\r
        return { x: item.x, y: item.y + 100 };\r
    }\r
  };\r
\r
  useEffect(() => {\r
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));\r
  }, [items]);\r
\r
  const grid = useMemo<GridItem[]>(() => {\r
    if (!width) return [];\r
\r
    const colHeights = new Array(columns).fill(0);\r
    const columnWidth = width / columns;\r
\r
    return items.map(child => {\r
      const col = colHeights.indexOf(Math.min(...colHeights));\r
      const x = columnWidth * col;\r
      const height = child.height / 2;\r
      const y = colHeights[col];\r
\r
      colHeights[col] += height;\r
\r
      return { ...child, x, y, w: columnWidth, h: height };\r
    });\r
  }, [columns, items, width]);\r
\r
  const hasMounted = useRef(false);\r
\r
  useLayoutEffect(() => {\r
    if (!imagesReady) return;\r
\r
    grid.forEach((item, index) => {\r
      const selector = \`[data-key="\${item.id}"]\`;\r
      const animationProps = {\r
        x: item.x,\r
        y: item.y,\r
        width: item.w,\r
        height: item.h\r
      };\r
\r
      if (!hasMounted.current) {\r
        const initialPos = getInitialPosition(item);\r
        const initialState = {\r
          opacity: 0,\r
          x: initialPos.x,\r
          y: initialPos.y,\r
          width: item.w,\r
          height: item.h,\r
          ...(blurToFocus && { filter: 'blur(10px)' })\r
        };\r
\r
        gsap.fromTo(selector, initialState, {\r
          opacity: 1,\r
          ...animationProps,\r
          ...(blurToFocus && { filter: 'blur(0px)' }),\r
          duration: 0.8,\r
          ease: 'power3.out',\r
          delay: index * stagger\r
        });\r
      } else {\r
        gsap.to(selector, {\r
          ...animationProps,\r
          duration: duration,\r
          ease: ease,\r
          overwrite: 'auto'\r
        });\r
      }\r
    });\r
\r
    hasMounted.current = true;\r
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);\r
\r
  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {\r
    const element = e.currentTarget as HTMLElement;\r
    const selector = \`[data-key="\${item.id}"]\`;\r
\r
    if (scaleOnHover) {\r
      gsap.to(selector, {\r
        scale: hoverScale,\r
        duration: 0.3,\r
        ease: 'power2.out'\r
      });\r
    }\r
\r
    if (colorShiftOnHover) {\r
      const overlay = element.querySelector('.color-overlay') as HTMLElement;\r
      if (overlay) {\r
        gsap.to(overlay, {\r
          opacity: 0.3,\r
          duration: 0.3\r
        });\r
      }\r
    }\r
  };\r
\r
  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {\r
    const element = e.currentTarget as HTMLElement;\r
    const selector = \`[data-key="\${item.id}"]\`;\r
\r
    if (scaleOnHover) {\r
      gsap.to(selector, {\r
        scale: 1,\r
        duration: 0.3,\r
        ease: 'power2.out'\r
      });\r
    }\r
\r
    if (colorShiftOnHover) {\r
      const overlay = element.querySelector('.color-overlay') as HTMLElement;\r
      if (overlay) {\r
        gsap.to(overlay, {\r
          opacity: 0,\r
          duration: 0.3\r
        });\r
      }\r
    }\r
  };\r
\r
  return (\r
    <div ref={containerRef} className="list">\r
      {grid.map(item => {\r
        return (\r
          <div\r
            key={item.id}\r
            data-key={item.id}\r
            className="item-wrapper"\r
            onClick={() => window.open(item.url, '_blank', 'noopener')}\r
            onMouseEnter={e => handleMouseEnter(e, item)}\r
            onMouseLeave={e => handleMouseLeave(e, item)}\r
          >\r
            <div className="item-img" style={{ backgroundImage: \`url(\${item.img})\` }}>\r
              {colorShiftOnHover && (\r
                <div\r
                  className="color-overlay"\r
                  style={{\r
                    position: 'absolute',\r
                    top: 0,\r
                    left: 0,\r
                    width: '100%',\r
                    height: '100%',\r
                    background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',\r
                    opacity: 0,\r
                    pointerEvents: 'none',\r
                    borderRadius: '8px'\r
                  }}\r
                />\r
              )}\r
            </div>\r
          </div>\r
        );\r
      })}\r
    </div>\r
  );\r
};\r
\r
export default Masonry;\r
`,B=`import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
\r
const useMedia = (queries: string[], values: number[], defaultValue: number): number => {\r
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;\r
\r
  const [value, setValue] = useState<number>(get);\r
\r
  useEffect(() => {\r
    const handler = () => setValue(get);\r
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));\r
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));\r
  }, [queries]);\r
\r
  return value;\r
};\r
\r
const useMeasure = <T extends HTMLElement>() => {\r
  const ref = useRef<T | null>(null);\r
  const [size, setSize] = useState({ width: 0, height: 0 });\r
\r
  useLayoutEffect(() => {\r
    if (!ref.current) return;\r
    const ro = new ResizeObserver(([entry]) => {\r
      const { width, height } = entry.contentRect;\r
      setSize({ width, height });\r
    });\r
    ro.observe(ref.current);\r
    return () => ro.disconnect();\r
  }, []);\r
\r
  return [ref, size] as const;\r
};\r
\r
const preloadImages = async (urls: string[]): Promise<void> => {\r
  await Promise.all(\r
    urls.map(\r
      src =>\r
        new Promise<void>(resolve => {\r
          const img = new Image();\r
          img.src = src;\r
          img.onload = img.onerror = () => resolve();\r
        })\r
    )\r
  );\r
};\r
\r
interface Item {\r
  id: string;\r
  img: string;\r
  url: string;\r
  height: number;\r
}\r
\r
interface GridItem extends Item {\r
  x: number;\r
  y: number;\r
  w: number;\r
  h: number;\r
}\r
\r
interface MasonryProps {\r
  items: Item[];\r
  ease?: string;\r
  duration?: number;\r
  stagger?: number;\r
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';\r
  scaleOnHover?: boolean;\r
  hoverScale?: number;\r
  blurToFocus?: boolean;\r
  colorShiftOnHover?: boolean;\r
}\r
\r
const Masonry: React.FC<MasonryProps> = ({\r
  items,\r
  ease = 'power3.out',\r
  duration = 0.6,\r
  stagger = 0.05,\r
  animateFrom = 'bottom',\r
  scaleOnHover = true,\r
  hoverScale = 0.95,\r
  blurToFocus = true,\r
  colorShiftOnHover = false\r
}) => {\r
  const columns = useMedia(\r
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],\r
    [5, 4, 3, 2],\r
    1\r
  );\r
\r
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();\r
  const [imagesReady, setImagesReady] = useState(false);\r
\r
  const getInitialPosition = (item: GridItem) => {\r
    const containerRect = containerRef.current?.getBoundingClientRect();\r
    if (!containerRect) return { x: item.x, y: item.y };\r
\r
    let direction = animateFrom;\r
    if (animateFrom === 'random') {\r
      const dirs = ['top', 'bottom', 'left', 'right'];\r
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;\r
    }\r
\r
    switch (direction) {\r
      case 'top':\r
        return { x: item.x, y: -200 };\r
      case 'bottom':\r
        return { x: item.x, y: window.innerHeight + 200 };\r
      case 'left':\r
        return { x: -200, y: item.y };\r
      case 'right':\r
        return { x: window.innerWidth + 200, y: item.y };\r
      case 'center':\r
        return {\r
          x: containerRect.width / 2 - item.w / 2,\r
          y: containerRect.height / 2 - item.h / 2\r
        };\r
      default:\r
        return { x: item.x, y: item.y + 100 };\r
    }\r
  };\r
\r
  useEffect(() => {\r
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));\r
  }, [items]);\r
\r
  const grid = useMemo<GridItem[]>(() => {\r
    if (!width) return [];\r
    const colHeights = new Array(columns).fill(0);\r
    const gap = 16;\r
    const totalGaps = (columns - 1) * gap;\r
    const columnWidth = (width - totalGaps) / columns;\r
\r
    return items.map(child => {\r
      const col = colHeights.indexOf(Math.min(...colHeights));\r
      const x = col * (columnWidth + gap);\r
      const height = child.height / 2;\r
      const y = colHeights[col];\r
\r
      colHeights[col] += height + gap;\r
      return { ...child, x, y, w: columnWidth, h: height };\r
    });\r
  }, [columns, items, width]);\r
\r
  const hasMounted = useRef(false);\r
\r
  useLayoutEffect(() => {\r
    if (!imagesReady) return;\r
\r
    grid.forEach((item, index) => {\r
      const selector = \`[data-key="\${item.id}"]\`;\r
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };\r
\r
      if (!hasMounted.current) {\r
        const start = getInitialPosition(item);\r
        gsap.fromTo(\r
          selector,\r
          {\r
            opacity: 0,\r
            x: start.x,\r
            y: start.y,\r
            width: item.w,\r
            height: item.h,\r
            ...(blurToFocus && { filter: 'blur(10px)' })\r
          },\r
          {\r
            opacity: 1,\r
            ...animProps,\r
            ...(blurToFocus && { filter: 'blur(0px)' }),\r
            duration: 0.8,\r
            ease: 'power3.out',\r
            delay: index * stagger\r
          }\r
        );\r
      } else {\r
        gsap.to(selector, {\r
          ...animProps,\r
          duration,\r
          ease,\r
          overwrite: 'auto'\r
        });\r
      }\r
    });\r
\r
    hasMounted.current = true;\r
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);\r
\r
  const handleMouseEnter = (id: string, element: HTMLElement) => {\r
    if (scaleOnHover) {\r
      gsap.to(\`[data-key="\${id}"]\`, {\r
        scale: hoverScale,\r
        duration: 0.3,\r
        ease: 'power2.out'\r
      });\r
    }\r
    if (colorShiftOnHover) {\r
      const overlay = element.querySelector('.color-overlay') as HTMLElement;\r
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });\r
    }\r
  };\r
\r
  const handleMouseLeave = (id: string, element: HTMLElement) => {\r
    if (scaleOnHover) {\r
      gsap.to(\`[data-key="\${id}"]\`, {\r
        scale: 1,\r
        duration: 0.3,\r
        ease: 'power2.out'\r
      });\r
    }\r
    if (colorShiftOnHover) {\r
      const overlay = element.querySelector('.color-overlay') as HTMLElement;\r
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });\r
    }\r
  };\r
\r
  return (\r
    <div ref={containerRef} className="relative w-full h-full">\r
      {grid.map(item => (\r
        <div\r
          key={item.id}\r
          data-key={item.id}\r
          className="absolute box-content"\r
          style={{ willChange: 'transform, width, height, opacity' }}\r
          onClick={() => window.open(item.url, '_blank', 'noopener')}\r
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}\r
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}\r
        >\r
          <div\r
            className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"\r
            style={{ backgroundImage: \`url(\${item.img})\` }}\r
          >\r
            {colorShiftOnHover && (\r
              <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />\r
            )}\r
          </div>\r
        </div>\r
      ))}\r
    </div>\r
  );\r
};\r
\r
export default Masonry;\r
`,D={dependencies:"gsap",usage:`import Masonry from './Masonry';

const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    // ... more items
];

<Masonry
  items={items}
  ease="power3.out"
  duration={0.6}
  stagger={0.05}
  animateFrom="bottom"
  scaleOnHover={true}
  hoverScale={0.95}
  blurToFocus={true}
  colorShiftOnHover={false}
/>
`,code:V,tailwind:G,tsCode:_,tsTailwind:B},A=(i,m,l)=>{const a=()=>m[i.findIndex(u=>matchMedia(u).matches)]??l,[d,g]=o.useState(a);return o.useEffect(()=>{const u=()=>g(a);return i.forEach(h=>matchMedia(h).addEventListener("change",u)),()=>i.forEach(h=>matchMedia(h).removeEventListener("change",u))},[i]),d},U=()=>{const i=o.useRef(null),[m,l]=o.useState({width:0,height:0});return o.useLayoutEffect(()=>{if(!i.current)return;const a=new ResizeObserver(([d])=>{const{width:g,height:u}=d.contentRect;l({width:g,height:u})});return a.observe(i.current),()=>a.disconnect()},[]),[i,m]},K=async i=>{await Promise.all(i.map(m=>new Promise(l=>{const a=new Image;a.src=m,a.onload=a.onerror=()=>l()})))},J=({items:i,ease:m="power3.out",duration:l=.6,stagger:a=.05,animateFrom:d="bottom",scaleOnHover:g=!0,hoverScale:u=.95,blurToFocus:h=!0,colorShiftOnHover:p=!1})=>{const y=A(["(min-width:1500px)","(min-width:1000px)","(min-width:600px)","(min-width:400px)"],[5,4,3,2],1),[v,{width:x}]=U(),[w,E]=o.useState(!1),M=e=>{var s;const t=(s=v.current)==null?void 0:s.getBoundingClientRect();if(!t)return{x:e.x,y:e.y};let n=d;if(d==="random"){const c=["top","bottom","left","right"];n=c[Math.floor(Math.random()*c.length)]}switch(n){case"top":return{x:e.x,y:-200};case"bottom":return{x:e.x,y:window.innerHeight+200};case"left":return{x:-200,y:e.y};case"right":return{x:window.innerWidth+200,y:e.y};case"center":return{x:t.width/2-e.w/2,y:t.height/2-e.h/2};default:return{x:e.x,y:e.y+100}}};o.useEffect(()=>{K(i.map(e=>e.img)).then(()=>E(!0))},[i]);const b=o.useMemo(()=>{if(!x)return[];const e=new Array(y).fill(0),t=x/y;return i.map(n=>{const s=e.indexOf(Math.min(...e)),c=t*s,S=n.height/2,L=e[s];return e[s]+=S,{...n,x:c,y:L,w:t,h:S}})},[y,i,x]),R=o.useRef(!1);o.useLayoutEffect(()=>{w&&(b.forEach((e,t)=>{const n=`[data-key="${e.id}"]`,s={x:e.x,y:e.y,width:e.w,height:e.h};if(R.current)f.to(n,{...s,duration:l,ease:m,overwrite:"auto"});else{const c=M(e),S={opacity:0,x:c.x,y:c.y,width:e.w,height:e.h,...h&&{filter:"blur(10px)"}};f.fromTo(n,S,{opacity:1,...s,...h&&{filter:"blur(0px)"},duration:.8,ease:"power3.out",delay:t*a})}}),R.current=!0)},[b,w,a,d,h,l,m]);const H=(e,t)=>{const n=e.currentTarget,s=`[data-key="${t.id}"]`;if(g&&f.to(s,{scale:u,duration:.3,ease:"power2.out"}),p){const c=n.querySelector(".color-overlay");c&&f.to(c,{opacity:.3,duration:.3})}},T=(e,t)=>{const n=e.currentTarget,s=`[data-key="${t.id}"]`;if(g&&f.to(s,{scale:1,duration:.3,ease:"power2.out"}),p){const c=n.querySelector(".color-overlay");c&&f.to(c,{opacity:0,duration:.3})}};return r.jsx("div",{ref:v,className:"list",children:b.map(e=>r.jsx("div",{"data-key":e.id,className:"item-wrapper",onClick:()=>window.open(e.url,"_blank","noopener"),onMouseEnter:t=>H(t,e),onMouseLeave:t=>T(t,e),children:r.jsx("div",{className:"item-img",style:{backgroundImage:`url(${e.img})`},children:p&&r.jsx("div",{className:"color-overlay",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",opacity:0,pointerEvents:"none",borderRadius:"8px"}})})},e.id))})},ne=()=>{const[i,m]=o.useState(0),[l,a]=o.useState("power3.out"),[d,g]=o.useState("bottom"),[u,h]=o.useState(.6),[p,y]=o.useState(.05),[v,x]=o.useState(!0),[w,E]=o.useState(!0),[M,b]=o.useState(!1),R=[{value:"power1.out",label:"power1.out"},{value:"power2.out",label:"power2.out"},{value:"power3.out",label:"power3.out"},{value:"power4.out",label:"power4.out"},{value:"back.out",label:"back.out"},{value:"bounce.out",label:"bounce.out"},{value:"elastic.out",label:"elastic.out"},{value:"sine.out",label:"sine.out"}],H=[{value:"top",label:"Top"},{value:"bottom",label:"Bottom"},{value:"left",label:"Left"},{value:"right",label:"Right"},{value:"center",label:"Center"},{value:"random",label:"Random"}],T=()=>{m(n=>n+1)},e=[{name:"items",type:"array",default:"required",description:"Array of items to display in the masonry layout. Each item should have id, img, url, and height properties."},{name:"ease",type:"string",default:'"power3.out"',description:"GSAP easing function for animations."},{name:"duration",type:"number",default:"0.6",description:"Duration of the transition animations in seconds."},{name:"stagger",type:"number",default:"0.05",description:"Delay between each item's animation in seconds."},{name:"animateFrom",type:"string",default:'"bottom"',description:"Direction from which items animate in. Options: 'top', 'bottom', 'left', 'right', 'center', 'random'."},{name:"scaleOnHover",type:"boolean",default:"true",description:"Whether items should scale on hover."},{name:"hoverScale",type:"number",default:"0.95",description:"Scale value when hovering over items (only applies if scaleOnHover is true)."},{name:"blurToFocus",type:"boolean",default:"true",description:"Whether items should animate from blurred to focused on initial load."},{name:"colorShiftOnHover",type:"boolean",default:"false",description:"Whether to show a color overlay effect on hover."}],t=[{id:"1",img:"https://picsum.photos/id/1015/600/900?grayscale",url:"https://example.com/one",height:400},{id:"2",img:"https://picsum.photos/id/1011/600/750?grayscale",url:"https://example.com/two",height:250},{id:"3",img:"https://picsum.photos/id/1020/600/800?grayscale",url:"https://example.com/three",height:600},{id:"4",img:"https://picsum.photos/id/1018/600/660?grayscale",url:"https://example.com/four",height:260},{id:"5",img:"https://picsum.photos/id/1016/600/520?grayscale",url:"https://example.com/five",height:120},{id:"6",img:"https://picsum.photos/id/1025/600/850?grayscale",url:"https://example.com/six",height:850},{id:"7",img:"https://picsum.photos/id/1031/600/720?grayscale",url:"https://example.com/seven",height:720},{id:"8",img:"https://picsum.photos/id/1035/600/680?grayscale",url:"https://example.com/eight",height:200},{id:"9",img:"https://picsum.photos/id/1040/600/950?grayscale",url:"https://example.com/nine",height:350},{id:"10",img:"https://picsum.photos/id/1043/600/600?grayscale",url:"https://example.com/ten",height:300},{id:"11",img:"https://picsum.photos/id/1050/600/780?grayscale",url:"https://example.com/eleven",height:350},{id:"12",img:"https://picsum.photos/id/1055/600/640?grayscale",url:"https://example.com/twelve",height:240},{id:"13",img:"https://picsum.photos/id/1060/600/820?grayscale",url:"https://example.com/thirteen",height:320},{id:"14",img:"https://picsum.photos/id/1065/600/590?grayscale",url:"https://example.com/fourteen",height:290}];return r.jsxs(O,{children:[r.jsxs(F,{children:[r.jsxs(q,{position:"relative",className:"demo-container",h:700,overflow:"hidden",children:[r.jsx($,{onClick:T}),r.jsx(J,{items:t,ease:l,animateFrom:d,duration:u,stagger:p,scaleOnHover:v,blurToFocus:w,colorShiftOnHover:M},i)]}),r.jsxs(W,{children:[r.jsx(I,{title:"Ease",options:R,value:l,width:120,onChange:a}),r.jsx(I,{title:"Animate From",options:H,value:d,width:120,onChange:g}),r.jsx(P,{title:"Duration",min:.1,max:2,step:.1,value:u,valueUnit:"s",width:150,onChange:h}),r.jsx(P,{title:"Stagger",min:.01,max:.2,step:.01,value:p,valueUnit:"s",width:150,onChange:y}),r.jsx(k,{title:"Scale on Hover",isChecked:v,onChange:x}),r.jsx(k,{title:"Blur to Focus",isChecked:w,onChange:E}),r.jsx(k,{title:"Color Shift on Hover",isChecked:M,onChange:b})]}),r.jsx(C,{data:e}),r.jsx(N,{dependencyList:["gsap"]})]}),r.jsx(j,{children:r.jsx(z,{codeObject:D})})]})};export{ne as default};
