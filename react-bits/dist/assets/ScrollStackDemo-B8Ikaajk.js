import{j as r,r as t,B as sr,T as ar,c7 as lr,c8 as or,c9 as cr,ca as ir}from"./index-wsKSLPNH.js";import{T as ur,P as mr,a as fr,C as dr,b as pr}from"./PropTable-C4uPWs8h.js";import{C as hr}from"./Customize-1m_ZNqR9.js";import{D as gr}from"./Dependencies-BHoMfJUj.js";import{R as Sr}from"./RefreshButton-CA3SFRlq.js";import{P as kr}from"./PreviewSelect-B8u33nUa.js";import{P as I}from"./PreviewSlider-m1G_aiYP.js";import{u as Tr}from"./useForceRerender-BCFU-k0M.js";import{L as J}from"./lenis-CYo8HTSz.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const br=`import { useLayoutEffect, useRef, useCallback } from 'react';\r
import Lenis from 'lenis';\r
import './ScrollStack.css';\r
\r
export const ScrollStackItem = ({ children, itemClassName = '' }) => (\r
  <div className={\`scroll-stack-card \${itemClassName}\`.trim()}>{children}</div>\r
);\r
\r
const ScrollStack = ({\r
  children,\r
  className = '',\r
  itemDistance = 100,\r
  itemScale = 0.03,\r
  itemStackDistance = 30,\r
  stackPosition = '20%',\r
  scaleEndPosition = '10%',\r
  baseScale = 0.85,\r
  scaleDuration = 0.5,\r
  rotationAmount = 0,\r
  blurAmount = 0,\r
  useWindowScroll = false,\r
  onStackComplete\r
}) => {\r
  const scrollerRef = useRef(null);\r
  const stackCompletedRef = useRef(false);\r
  const animationFrameRef = useRef(null);\r
  const lenisRef = useRef(null);\r
  const cardsRef = useRef([]);\r
  const lastTransformsRef = useRef(new Map());\r
  const isUpdatingRef = useRef(false);\r
\r
  const calculateProgress = useCallback((scrollTop, start, end) => {\r
    if (scrollTop < start) return 0;\r
    if (scrollTop > end) return 1;\r
    return (scrollTop - start) / (end - start);\r
  }, []);\r
\r
  const parsePercentage = useCallback((value, containerHeight) => {\r
    if (typeof value === 'string' && value.includes('%')) {\r
      return (parseFloat(value) / 100) * containerHeight;\r
    }\r
    return parseFloat(value);\r
  }, []);\r
\r
  const getScrollData = useCallback(() => {\r
    if (useWindowScroll) {\r
      return {\r
        scrollTop: window.scrollY,\r
        containerHeight: window.innerHeight,\r
        scrollContainer: document.documentElement\r
      };\r
    } else {\r
      const scroller = scrollerRef.current;\r
      return {\r
        scrollTop: scroller.scrollTop,\r
        containerHeight: scroller.clientHeight,\r
        scrollContainer: scroller\r
      };\r
    }\r
  }, [useWindowScroll]);\r
\r
  const getElementOffset = useCallback(\r
    element => {\r
      if (useWindowScroll) {\r
        const rect = element.getBoundingClientRect();\r
        return rect.top + window.scrollY;\r
      } else {\r
        return element.offsetTop;\r
      }\r
    },\r
    [useWindowScroll]\r
  );\r
\r
  const updateCardTransforms = useCallback(() => {\r
    if (!cardsRef.current.length || isUpdatingRef.current) return;\r
\r
    isUpdatingRef.current = true;\r
\r
    const { scrollTop, containerHeight, scrollContainer } = getScrollData();\r
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);\r
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);\r
\r
    const endElement = useWindowScroll\r
      ? document.querySelector('.scroll-stack-end')\r
      : scrollerRef.current?.querySelector('.scroll-stack-end');\r
\r
    const endElementTop = endElement ? getElementOffset(endElement) : 0;\r
\r
    cardsRef.current.forEach((card, i) => {\r
      if (!card) return;\r
\r
      const cardTop = getElementOffset(card);\r
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;\r
      const triggerEnd = cardTop - scaleEndPositionPx;\r
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;\r
      const pinEnd = endElementTop - containerHeight / 2;\r
\r
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);\r
      const targetScale = baseScale + i * itemScale;\r
      const scale = 1 - scaleProgress * (1 - targetScale);\r
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;\r
\r
      let blur = 0;\r
      if (blurAmount) {\r
        let topCardIndex = 0;\r
        for (let j = 0; j < cardsRef.current.length; j++) {\r
          const jCardTop = getElementOffset(cardsRef.current[j]);\r
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;\r
          if (scrollTop >= jTriggerStart) {\r
            topCardIndex = j;\r
          }\r
        }\r
\r
        if (i < topCardIndex) {\r
          const depthInStack = topCardIndex - i;\r
          blur = Math.max(0, depthInStack * blurAmount);\r
        }\r
      }\r
\r
      let translateY = 0;\r
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;\r
\r
      if (isPinned) {\r
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;\r
      } else if (scrollTop > pinEnd) {\r
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;\r
      }\r
\r
      const newTransform = {\r
        translateY: Math.round(translateY * 100) / 100,\r
        scale: Math.round(scale * 1000) / 1000,\r
        rotation: Math.round(rotation * 100) / 100,\r
        blur: Math.round(blur * 100) / 100\r
      };\r
\r
      const lastTransform = lastTransformsRef.current.get(i);\r
      const hasChanged =\r
        !lastTransform ||\r
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||\r
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||\r
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||\r
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;\r
\r
      if (hasChanged) {\r
        const transform = \`translate3d(0, \${newTransform.translateY}px, 0) scale(\${newTransform.scale}) rotate(\${newTransform.rotation}deg)\`;\r
        const filter = newTransform.blur > 0 ? \`blur(\${newTransform.blur}px)\` : '';\r
\r
        card.style.transform = transform;\r
        card.style.filter = filter;\r
\r
        lastTransformsRef.current.set(i, newTransform);\r
      }\r
\r
      if (i === cardsRef.current.length - 1) {\r
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;\r
        if (isInView && !stackCompletedRef.current) {\r
          stackCompletedRef.current = true;\r
          onStackComplete?.();\r
        } else if (!isInView && stackCompletedRef.current) {\r
          stackCompletedRef.current = false;\r
        }\r
      }\r
    });\r
\r
    isUpdatingRef.current = false;\r
  }, [\r
    itemScale,\r
    itemStackDistance,\r
    stackPosition,\r
    scaleEndPosition,\r
    baseScale,\r
    rotationAmount,\r
    blurAmount,\r
    useWindowScroll,\r
    onStackComplete,\r
    calculateProgress,\r
    parsePercentage,\r
    getScrollData,\r
    getElementOffset\r
  ]);\r
\r
  const handleScroll = useCallback(() => {\r
    updateCardTransforms();\r
  }, [updateCardTransforms]);\r
\r
  const setupLenis = useCallback(() => {\r
    if (useWindowScroll) {\r
      const lenis = new Lenis({\r
        duration: 1.2,\r
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),\r
        smoothWheel: true,\r
        touchMultiplier: 2,\r
        infinite: false,\r
        wheelMultiplier: 1,\r
        lerp: 0.1,\r
        syncTouch: true,\r
        syncTouchLerp: 0.075\r
      });\r
\r
      lenis.on('scroll', handleScroll);\r
\r
      const raf = time => {\r
        lenis.raf(time);\r
        animationFrameRef.current = requestAnimationFrame(raf);\r
      };\r
      animationFrameRef.current = requestAnimationFrame(raf);\r
\r
      lenisRef.current = lenis;\r
      return lenis;\r
    } else {\r
      const scroller = scrollerRef.current;\r
      if (!scroller) return;\r
\r
      const lenis = new Lenis({\r
        wrapper: scroller,\r
        content: scroller.querySelector('.scroll-stack-inner'),\r
        duration: 1.2,\r
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),\r
        smoothWheel: true,\r
        touchMultiplier: 2,\r
        infinite: false,\r
        gestureOrientationHandler: true,\r
        normalizeWheel: true,\r
        wheelMultiplier: 1,\r
        touchInertiaMultiplier: 35,\r
        lerp: 0.1,\r
        syncTouch: true,\r
        syncTouchLerp: 0.075,\r
        touchInertia: 0.6\r
      });\r
\r
      lenis.on('scroll', handleScroll);\r
\r
      const raf = time => {\r
        lenis.raf(time);\r
        animationFrameRef.current = requestAnimationFrame(raf);\r
      };\r
      animationFrameRef.current = requestAnimationFrame(raf);\r
\r
      lenisRef.current = lenis;\r
      return lenis;\r
    }\r
  }, [handleScroll, useWindowScroll]);\r
\r
  useLayoutEffect(() => {\r
    const scroller = scrollerRef.current;\r
    if (!scroller) return;\r
\r
    const cards = Array.from(\r
      useWindowScroll\r
        ? document.querySelectorAll('.scroll-stack-card')\r
        : scroller.querySelectorAll('.scroll-stack-card')\r
    );\r
\r
    cardsRef.current = cards;\r
    const transformsCache = lastTransformsRef.current;\r
\r
    cards.forEach((card, i) => {\r
      if (i < cards.length - 1) {\r
        card.style.marginBottom = \`\${itemDistance}px\`;\r
      }\r
      card.style.willChange = 'transform, filter';\r
      card.style.transformOrigin = 'top center';\r
      card.style.backfaceVisibility = 'hidden';\r
      card.style.transform = 'translateZ(0)';\r
      card.style.webkitTransform = 'translateZ(0)';\r
      card.style.perspective = '1000px';\r
      card.style.webkitPerspective = '1000px';\r
    });\r
\r
    setupLenis();\r
\r
    updateCardTransforms();\r
\r
    return () => {\r
      if (animationFrameRef.current) {\r
        cancelAnimationFrame(animationFrameRef.current);\r
      }\r
      if (lenisRef.current) {\r
        lenisRef.current.destroy();\r
      }\r
      stackCompletedRef.current = false;\r
      cardsRef.current = [];\r
      transformsCache.clear();\r
      isUpdatingRef.current = false;\r
    };\r
  }, [\r
    itemDistance,\r
    itemScale,\r
    itemStackDistance,\r
    stackPosition,\r
    scaleEndPosition,\r
    baseScale,\r
    scaleDuration,\r
    rotationAmount,\r
    blurAmount,\r
    useWindowScroll,\r
    onStackComplete,\r
    setupLenis,\r
    updateCardTransforms\r
  ]);\r
\r
  return (\r
    <div className={\`scroll-stack-scroller \${className}\`.trim()} ref={scrollerRef}>\r
      <div className="scroll-stack-inner">\r
        {children}\r
        {/* Spacer so the last pin can release cleanly */}\r
        <div className="scroll-stack-end" />\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default ScrollStack;\r
`,Rr=`.scroll-stack-scroller {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  overflow-y: auto;\r
  overflow-x: visible;\r
  overscroll-behavior: contain;\r
  -webkit-overflow-scrolling: touch;\r
  scroll-behavior: smooth;\r
  -webkit-transform: translateZ(0);\r
  transform: translateZ(0);\r
  will-change: scroll-position;\r
}\r
\r
.scroll-stack-inner {\r
  padding: 20vh 5rem 50rem;\r
  min-height: 100vh;\r
}\r
\r
.scroll-stack-card-wrapper {\r
  position: relative;\r
}\r
\r
.scroll-stack-card {\r
  transform-origin: top center;\r
  will-change: transform, filter;\r
  backface-visibility: hidden;\r
  transform-style: preserve-3d;\r
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);\r
  height: 20rem;\r
  width: 100%;\r
  margin: 30px 0;\r
  padding: 3rem;\r
  border-radius: 40px;\r
  box-sizing: border-box;\r
  /* Improve mobile performance */\r
  -webkit-transform: translateZ(0);\r
  transform: translateZ(0);\r
  position: relative;\r
}\r
\r
.scroll-stack-end {\r
  width: 100%;\r
  height: 1px;\r
}\r
`,wr=`import { useLayoutEffect, useRef, useCallback } from 'react';\r
import Lenis from 'lenis';\r
\r
export const ScrollStackItem = ({ children, itemClassName = '' }) => (\r
  <div\r
    className={\`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform \${itemClassName}\`.trim()}\r
    style={{\r
      backfaceVisibility: 'hidden',\r
      transformStyle: 'preserve-3d'\r
    }}\r
  >\r
    {children}\r
  </div>\r
);\r
\r
const ScrollStack = ({\r
  children,\r
  className = '',\r
  itemDistance = 100,\r
  itemScale = 0.03,\r
  itemStackDistance = 30,\r
  stackPosition = '20%',\r
  scaleEndPosition = '10%',\r
  baseScale = 0.85,\r
  scaleDuration = 0.5,\r
  rotationAmount = 0,\r
  blurAmount = 0,\r
  useWindowScroll = false,\r
  onStackComplete\r
}) => {\r
  const scrollerRef = useRef(null);\r
  const stackCompletedRef = useRef(false);\r
  const animationFrameRef = useRef(null);\r
  const lenisRef = useRef(null);\r
  const cardsRef = useRef([]);\r
  const lastTransformsRef = useRef(new Map());\r
  const isUpdatingRef = useRef(false);\r
\r
  const calculateProgress = useCallback((scrollTop, start, end) => {\r
    if (scrollTop < start) return 0;\r
    if (scrollTop > end) return 1;\r
    return (scrollTop - start) / (end - start);\r
  }, []);\r
\r
  const parsePercentage = useCallback((value, containerHeight) => {\r
    if (typeof value === 'string' && value.includes('%')) {\r
      return (parseFloat(value) / 100) * containerHeight;\r
    }\r
    return parseFloat(value);\r
  }, []);\r
\r
  const getScrollData = useCallback(() => {\r
    if (useWindowScroll) {\r
      return {\r
        scrollTop: window.scrollY,\r
        containerHeight: window.innerHeight,\r
        scrollContainer: document.documentElement\r
      };\r
    } else {\r
      const scroller = scrollerRef.current;\r
      return {\r
        scrollTop: scroller.scrollTop,\r
        containerHeight: scroller.clientHeight,\r
        scrollContainer: scroller\r
      };\r
    }\r
  }, [useWindowScroll]);\r
\r
  const getElementOffset = useCallback(\r
    element => {\r
      if (useWindowScroll) {\r
        const rect = element.getBoundingClientRect();\r
        return rect.top + window.scrollY;\r
      } else {\r
        return element.offsetTop;\r
      }\r
    },\r
    [useWindowScroll]\r
  );\r
\r
  const updateCardTransforms = useCallback(() => {\r
    if (!cardsRef.current.length || isUpdatingRef.current) return;\r
\r
    isUpdatingRef.current = true;\r
\r
    const { scrollTop, containerHeight, scrollContainer } = getScrollData();\r
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);\r
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);\r
\r
    const endElement = useWindowScroll\r
      ? document.querySelector('.scroll-stack-end')\r
      : scrollerRef.current?.querySelector('.scroll-stack-end');\r
\r
    const endElementTop = endElement ? getElementOffset(endElement) : 0;\r
\r
    cardsRef.current.forEach((card, i) => {\r
      if (!card) return;\r
\r
      const cardTop = getElementOffset(card);\r
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;\r
      const triggerEnd = cardTop - scaleEndPositionPx;\r
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;\r
      const pinEnd = endElementTop - containerHeight / 2;\r
\r
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);\r
      const targetScale = baseScale + i * itemScale;\r
      const scale = 1 - scaleProgress * (1 - targetScale);\r
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;\r
\r
      let blur = 0;\r
      if (blurAmount) {\r
        let topCardIndex = 0;\r
        for (let j = 0; j < cardsRef.current.length; j++) {\r
          const jCardTop = getElementOffset(cardsRef.current[j]);\r
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;\r
          if (scrollTop >= jTriggerStart) {\r
            topCardIndex = j;\r
          }\r
        }\r
\r
        if (i < topCardIndex) {\r
          const depthInStack = topCardIndex - i;\r
          blur = Math.max(0, depthInStack * blurAmount);\r
        }\r
      }\r
\r
      let translateY = 0;\r
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;\r
\r
      if (isPinned) {\r
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;\r
      } else if (scrollTop > pinEnd) {\r
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;\r
      }\r
\r
      const newTransform = {\r
        translateY: Math.round(translateY * 100) / 100,\r
        scale: Math.round(scale * 1000) / 1000,\r
        rotation: Math.round(rotation * 100) / 100,\r
        blur: Math.round(blur * 100) / 100\r
      };\r
\r
      const lastTransform = lastTransformsRef.current.get(i);\r
      const hasChanged =\r
        !lastTransform ||\r
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||\r
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||\r
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||\r
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;\r
\r
      if (hasChanged) {\r
        const transform = \`translate3d(0, \${newTransform.translateY}px, 0) scale(\${newTransform.scale}) rotate(\${newTransform.rotation}deg)\`;\r
        const filter = newTransform.blur > 0 ? \`blur(\${newTransform.blur}px)\` : '';\r
\r
        card.style.transform = transform;\r
        card.style.filter = filter;\r
\r
        lastTransformsRef.current.set(i, newTransform);\r
      }\r
\r
      if (i === cardsRef.current.length - 1) {\r
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;\r
        if (isInView && !stackCompletedRef.current) {\r
          stackCompletedRef.current = true;\r
          onStackComplete?.();\r
        } else if (!isInView && stackCompletedRef.current) {\r
          stackCompletedRef.current = false;\r
        }\r
      }\r
    });\r
\r
    isUpdatingRef.current = false;\r
  }, [\r
    itemScale,\r
    itemStackDistance,\r
    stackPosition,\r
    scaleEndPosition,\r
    baseScale,\r
    rotationAmount,\r
    blurAmount,\r
    useWindowScroll,\r
    onStackComplete,\r
    calculateProgress,\r
    parsePercentage,\r
    getScrollData,\r
    getElementOffset\r
  ]);\r
\r
  const handleScroll = useCallback(() => {\r
    updateCardTransforms();\r
  }, [updateCardTransforms]);\r
\r
  const setupLenis = useCallback(() => {\r
    if (useWindowScroll) {\r
      const lenis = new Lenis({\r
        duration: 1.2,\r
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),\r
        smoothWheel: true,\r
        touchMultiplier: 2,\r
        infinite: false,\r
        wheelMultiplier: 1,\r
        lerp: 0.1,\r
        syncTouch: true,\r
        syncTouchLerp: 0.075\r
      });\r
\r
      lenis.on('scroll', handleScroll);\r
\r
      const raf = time => {\r
        lenis.raf(time);\r
        animationFrameRef.current = requestAnimationFrame(raf);\r
      };\r
      animationFrameRef.current = requestAnimationFrame(raf);\r
\r
      lenisRef.current = lenis;\r
      return lenis;\r
    } else {\r
      const scroller = scrollerRef.current;\r
      if (!scroller) return;\r
\r
      const lenis = new Lenis({\r
        wrapper: scroller,\r
        content: scroller.querySelector('.scroll-stack-inner'),\r
        duration: 1.2,\r
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),\r
        smoothWheel: true,\r
        touchMultiplier: 2,\r
        infinite: false,\r
        wheelMultiplier: 1,\r
        lerp: 0.1,\r
        syncTouch: true,\r
        syncTouchLerp: 0.075\r
      });\r
\r
      lenis.on('scroll', handleScroll);\r
\r
      const raf = time => {\r
        lenis.raf(time);\r
        animationFrameRef.current = requestAnimationFrame(raf);\r
      };\r
      animationFrameRef.current = requestAnimationFrame(raf);\r
\r
      lenisRef.current = lenis;\r
      return lenis;\r
    }\r
  }, [handleScroll, useWindowScroll]);\r
\r
  useLayoutEffect(() => {\r
    const scroller = scrollerRef.current;\r
    if (!scroller) return;\r
\r
    const cards = Array.from(\r
      useWindowScroll\r
        ? document.querySelectorAll('.scroll-stack-card')\r
        : scroller.querySelectorAll('.scroll-stack-card')\r
    );\r
\r
    cardsRef.current = cards;\r
    const transformsCache = lastTransformsRef.current;\r
\r
    cards.forEach((card, i) => {\r
      if (i < cards.length - 1) {\r
        card.style.marginBottom = \`\${itemDistance}px\`;\r
      }\r
      card.style.willChange = 'transform, filter';\r
      card.style.transformOrigin = 'top center';\r
      card.style.backfaceVisibility = 'hidden';\r
      card.style.transform = 'translateZ(0)';\r
      card.style.webkitTransform = 'translateZ(0)';\r
      card.style.perspective = '1000px';\r
      card.style.webkitPerspective = '1000px';\r
    });\r
\r
    setupLenis();\r
\r
    updateCardTransforms();\r
\r
    return () => {\r
      if (animationFrameRef.current) {\r
        cancelAnimationFrame(animationFrameRef.current);\r
      }\r
      if (lenisRef.current) {\r
        lenisRef.current.destroy();\r
      }\r
      stackCompletedRef.current = false;\r
      cardsRef.current = [];\r
      transformsCache.clear();\r
      isUpdatingRef.current = false;\r
    };\r
  }, [\r
    itemDistance,\r
    itemScale,\r
    itemStackDistance,\r
    stackPosition,\r
    scaleEndPosition,\r
    baseScale,\r
    scaleDuration,\r
    rotationAmount,\r
    blurAmount,\r
    useWindowScroll,\r
    onStackComplete,\r
    setupLenis,\r
    updateCardTransforms\r
  ]);\r
\r
  // Container styles based on scroll mode\r
  const containerStyles = useWindowScroll\r
    ? {\r
        // Global scroll mode - no overflow constraints\r
        overscrollBehavior: 'contain',\r
        WebkitOverflowScrolling: 'touch',\r
        WebkitTransform: 'translateZ(0)',\r
        transform: 'translateZ(0)'\r
      }\r
    : {\r
        // Container scroll mode - original behavior\r
        overscrollBehavior: 'contain',\r
        WebkitOverflowScrolling: 'touch',\r
        scrollBehavior: 'smooth',\r
        WebkitTransform: 'translateZ(0)',\r
        transform: 'translateZ(0)',\r
        willChange: 'scroll-position'\r
      };\r
\r
  const containerClassName = useWindowScroll\r
    ? \`relative w-full \${className}\`.trim()\r
    : \`relative w-full h-full overflow-y-auto overflow-x-visible \${className}\`.trim();\r
\r
  return (\r
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>\r
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">\r
        {children}\r
        {/* Spacer so the last pin can release cleanly */}\r
        <div className="scroll-stack-end w-full h-px" />\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default ScrollStack;\r
`,Cr=`import React, { ReactNode, useLayoutEffect, useRef, useCallback } from 'react';\r
import Lenis from 'lenis';\r
import './ScrollStack.css';\r
\r
export interface ScrollStackItemProps {\r
  itemClassName?: string;\r
  children: ReactNode;\r
}\r
\r
export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (\r
  <div className={\`scroll-stack-card \${itemClassName}\`.trim()}>{children}</div>\r
);\r
\r
interface ScrollStackProps {\r
  className?: string;\r
  children: ReactNode;\r
  itemDistance?: number;\r
  itemScale?: number;\r
  itemStackDistance?: number;\r
  stackPosition?: string;\r
  scaleEndPosition?: string;\r
  baseScale?: number;\r
  scaleDuration?: number;\r
  rotationAmount?: number;\r
  blurAmount?: number;\r
  useWindowScroll?: boolean;\r
  onStackComplete?: () => void;\r
}\r
\r
const ScrollStack: React.FC<ScrollStackProps> = ({\r
  children,\r
  className = '',\r
  itemDistance = 100,\r
  itemScale = 0.03,\r
  itemStackDistance = 30,\r
  stackPosition = '20%',\r
  scaleEndPosition = '10%',\r
  baseScale = 0.85,\r
  scaleDuration = 0.5,\r
  rotationAmount = 0,\r
  blurAmount = 0,\r
  useWindowScroll = false,\r
  onStackComplete\r
}) => {\r
  const scrollerRef = useRef<HTMLDivElement>(null);\r
  const stackCompletedRef = useRef(false);\r
  const animationFrameRef = useRef<number | null>(null);\r
  const lenisRef = useRef<Lenis | null>(null);\r
  const cardsRef = useRef<HTMLElement[]>([]);\r
  const lastTransformsRef = useRef(new Map<number, any>());\r
  const isUpdatingRef = useRef(false);\r
\r
  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {\r
    if (scrollTop < start) return 0;\r
    if (scrollTop > end) return 1;\r
    return (scrollTop - start) / (end - start);\r
  }, []);\r
\r
  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {\r
    if (typeof value === 'string' && value.includes('%')) {\r
      return (parseFloat(value) / 100) * containerHeight;\r
    }\r
    return parseFloat(value as string);\r
  }, []);\r
\r
  const getScrollData = useCallback(() => {\r
    if (useWindowScroll) {\r
      return {\r
        scrollTop: window.scrollY,\r
        containerHeight: window.innerHeight,\r
        scrollContainer: document.documentElement\r
      };\r
    } else {\r
      const scroller = scrollerRef.current;\r
      return {\r
        scrollTop: scroller!.scrollTop,\r
        containerHeight: scroller!.clientHeight,\r
        scrollContainer: scroller!\r
      };\r
    }\r
  }, [useWindowScroll]);\r
\r
  const getElementOffset = useCallback(\r
    (element: HTMLElement) => {\r
      if (useWindowScroll) {\r
        const rect = element.getBoundingClientRect();\r
        return rect.top + window.scrollY;\r
      } else {\r
        return element.offsetTop;\r
      }\r
    },\r
    [useWindowScroll]\r
  );\r
\r
  const updateCardTransforms = useCallback(() => {\r
    if (!cardsRef.current.length || isUpdatingRef.current) return;\r
\r
    isUpdatingRef.current = true;\r
\r
    const { scrollTop, containerHeight } = getScrollData();\r
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);\r
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);\r
\r
    const endElement = useWindowScroll\r
      ? (document.querySelector('.scroll-stack-end') as HTMLElement)\r
      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement);\r
\r
    const endElementTop = endElement ? getElementOffset(endElement) : 0;\r
\r
    cardsRef.current.forEach((card, i) => {\r
      if (!card) return;\r
\r
      const cardTop = getElementOffset(card);\r
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;\r
      const triggerEnd = cardTop - scaleEndPositionPx;\r
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;\r
      const pinEnd = endElementTop - containerHeight / 2;\r
\r
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);\r
      const targetScale = baseScale + i * itemScale;\r
      const scale = 1 - scaleProgress * (1 - targetScale);\r
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;\r
\r
      let blur = 0;\r
      if (blurAmount) {\r
        let topCardIndex = 0;\r
        for (let j = 0; j < cardsRef.current.length; j++) {\r
          const jCardTop = getElementOffset(cardsRef.current[j]);\r
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;\r
          if (scrollTop >= jTriggerStart) {\r
            topCardIndex = j;\r
          }\r
        }\r
\r
        if (i < topCardIndex) {\r
          const depthInStack = topCardIndex - i;\r
          blur = Math.max(0, depthInStack * blurAmount);\r
        }\r
      }\r
\r
      let translateY = 0;\r
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;\r
\r
      if (isPinned) {\r
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;\r
      } else if (scrollTop > pinEnd) {\r
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;\r
      }\r
\r
      const newTransform = {\r
        translateY: Math.round(translateY * 100) / 100,\r
        scale: Math.round(scale * 1000) / 1000,\r
        rotation: Math.round(rotation * 100) / 100,\r
        blur: Math.round(blur * 100) / 100\r
      };\r
\r
      const lastTransform = lastTransformsRef.current.get(i);\r
      const hasChanged =\r
        !lastTransform ||\r
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||\r
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||\r
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||\r
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;\r
\r
      if (hasChanged) {\r
        const transform = \`translate3d(0, \${newTransform.translateY}px, 0) scale(\${newTransform.scale}) rotate(\${newTransform.rotation}deg)\`;\r
        const filter = newTransform.blur > 0 ? \`blur(\${newTransform.blur}px)\` : '';\r
\r
        card.style.transform = transform;\r
        card.style.filter = filter;\r
\r
        lastTransformsRef.current.set(i, newTransform);\r
      }\r
\r
      if (i === cardsRef.current.length - 1) {\r
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;\r
        if (isInView && !stackCompletedRef.current) {\r
          stackCompletedRef.current = true;\r
          onStackComplete?.();\r
        } else if (!isInView && stackCompletedRef.current) {\r
          stackCompletedRef.current = false;\r
        }\r
      }\r
    });\r
\r
    isUpdatingRef.current = false;\r
  }, [\r
    itemScale,\r
    itemStackDistance,\r
    stackPosition,\r
    scaleEndPosition,\r
    baseScale,\r
    rotationAmount,\r
    blurAmount,\r
    useWindowScroll,\r
    onStackComplete,\r
    calculateProgress,\r
    parsePercentage,\r
    getScrollData,\r
    getElementOffset\r
  ]);\r
\r
  const handleScroll = useCallback(() => {\r
    updateCardTransforms();\r
  }, [updateCardTransforms]);\r
\r
  const setupLenis = useCallback(() => {\r
    if (useWindowScroll) {\r
      const lenis = new Lenis({\r
        duration: 1.2,\r
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),\r
        smoothWheel: true,\r
        touchMultiplier: 2,\r
        infinite: false,\r
        wheelMultiplier: 1,\r
        lerp: 0.1,\r
        syncTouch: true,\r
        syncTouchLerp: 0.075\r
      });\r
\r
      lenis.on('scroll', handleScroll);\r
\r
      const raf = (time: number) => {\r
        lenis.raf(time);\r
        animationFrameRef.current = requestAnimationFrame(raf);\r
      };\r
      animationFrameRef.current = requestAnimationFrame(raf);\r
\r
      lenisRef.current = lenis;\r
      return lenis;\r
    } else {\r
      const scroller = scrollerRef.current;\r
      if (!scroller) return;\r
\r
      const lenis = new Lenis({\r
        wrapper: scroller,\r
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,\r
        duration: 1.2,\r
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),\r
        smoothWheel: true,\r
        touchMultiplier: 2,\r
        infinite: false,\r
        gestureOrientation: 'vertical',\r
        wheelMultiplier: 1,\r
        lerp: 0.1,\r
        syncTouch: true,\r
        syncTouchLerp: 0.075\r
      });\r
\r
      lenis.on('scroll', handleScroll);\r
\r
      const raf = (time: number) => {\r
        lenis.raf(time);\r
        animationFrameRef.current = requestAnimationFrame(raf);\r
      };\r
      animationFrameRef.current = requestAnimationFrame(raf);\r
\r
      lenisRef.current = lenis;\r
      return lenis;\r
    }\r
  }, [handleScroll, useWindowScroll]);\r
\r
  useLayoutEffect(() => {\r
    const scroller = scrollerRef.current;\r
    if (!scroller) return;\r
\r
    const cards = Array.from(\r
      useWindowScroll\r
        ? document.querySelectorAll('.scroll-stack-card')\r
        : scroller.querySelectorAll('.scroll-stack-card')\r
    ) as HTMLElement[];\r
\r
    cardsRef.current = cards;\r
    const transformsCache = lastTransformsRef.current;\r
\r
    cards.forEach((card, i) => {\r
      if (i < cards.length - 1) {\r
        card.style.marginBottom = \`\${itemDistance}px\`;\r
      }\r
      card.style.willChange = 'transform, filter';\r
      card.style.transformOrigin = 'top center';\r
      card.style.backfaceVisibility = 'hidden';\r
      card.style.transform = 'translateZ(0)';\r
      card.style.webkitTransform = 'translateZ(0)';\r
      card.style.perspective = '1000px';\r
      card.style.webkitPerspective = '1000px';\r
    });\r
\r
    setupLenis();\r
\r
    updateCardTransforms();\r
\r
    return () => {\r
      if (animationFrameRef.current) {\r
        cancelAnimationFrame(animationFrameRef.current);\r
      }\r
      if (lenisRef.current) {\r
        lenisRef.current.destroy();\r
      }\r
      stackCompletedRef.current = false;\r
      cardsRef.current = [];\r
      transformsCache.clear();\r
      isUpdatingRef.current = false;\r
    };\r
  }, [\r
    itemDistance,\r
    itemScale,\r
    itemStackDistance,\r
    stackPosition,\r
    scaleEndPosition,\r
    baseScale,\r
    scaleDuration,\r
    rotationAmount,\r
    blurAmount,\r
    useWindowScroll,\r
    onStackComplete,\r
    setupLenis,\r
    updateCardTransforms\r
  ]);\r
\r
  return (\r
    <div className={\`scroll-stack-scroller \${className}\`.trim()} ref={scrollerRef}>\r
      <div className="scroll-stack-inner">\r
        {children}\r
        {/* Spacer so the last pin can release cleanly */}\r
        <div className="scroll-stack-end" />\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default ScrollStack;\r
`,Pr=`import React, { ReactNode, useLayoutEffect, useRef, useCallback } from 'react';\r
import Lenis from 'lenis';\r
\r
export interface ScrollStackItemProps {\r
  itemClassName?: string;\r
  children: ReactNode;\r
}\r
\r
export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (\r
  <div\r
    className={\`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform \${itemClassName}\`.trim()}\r
    style={{\r
      backfaceVisibility: 'hidden',\r
      transformStyle: 'preserve-3d'\r
    }}\r
  >\r
    {children}\r
  </div>\r
);\r
\r
interface ScrollStackProps {\r
  className?: string;\r
  children: ReactNode;\r
  itemDistance?: number;\r
  itemScale?: number;\r
  itemStackDistance?: number;\r
  stackPosition?: string;\r
  scaleEndPosition?: string;\r
  baseScale?: number;\r
  scaleDuration?: number;\r
  rotationAmount?: number;\r
  blurAmount?: number;\r
  useWindowScroll?: boolean;\r
  onStackComplete?: () => void;\r
}\r
\r
const ScrollStack: React.FC<ScrollStackProps> = ({\r
  children,\r
  className = '',\r
  itemDistance = 100,\r
  itemScale = 0.03,\r
  itemStackDistance = 30,\r
  stackPosition = '20%',\r
  scaleEndPosition = '10%',\r
  baseScale = 0.85,\r
  scaleDuration = 0.5,\r
  rotationAmount = 0,\r
  blurAmount = 0,\r
  useWindowScroll = false,\r
  onStackComplete\r
}) => {\r
  const scrollerRef = useRef<HTMLDivElement>(null);\r
  const stackCompletedRef = useRef(false);\r
  const animationFrameRef = useRef<number | null>(null);\r
  const lenisRef = useRef<Lenis | null>(null);\r
  const cardsRef = useRef<HTMLElement[]>([]);\r
  const lastTransformsRef = useRef(new Map<number, any>());\r
  const isUpdatingRef = useRef(false);\r
\r
  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {\r
    if (scrollTop < start) return 0;\r
    if (scrollTop > end) return 1;\r
    return (scrollTop - start) / (end - start);\r
  }, []);\r
\r
  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {\r
    if (typeof value === 'string' && value.includes('%')) {\r
      return (parseFloat(value) / 100) * containerHeight;\r
    }\r
    return parseFloat(value as string);\r
  }, []);\r
\r
  const getScrollData = useCallback(() => {\r
    if (useWindowScroll) {\r
      return {\r
        scrollTop: window.scrollY,\r
        containerHeight: window.innerHeight,\r
        scrollContainer: document.documentElement\r
      };\r
    } else {\r
      const scroller = scrollerRef.current;\r
      return {\r
        scrollTop: scroller ? scroller.scrollTop : 0,\r
        containerHeight: scroller ? scroller.clientHeight : 0,\r
        scrollContainer: scroller\r
      };\r
    }\r
  }, [useWindowScroll]);\r
\r
  const getElementOffset = useCallback(\r
    (element: HTMLElement) => {\r
      if (useWindowScroll) {\r
        const rect = element.getBoundingClientRect();\r
        return rect.top + window.scrollY;\r
      } else {\r
        return element.offsetTop;\r
      }\r
    },\r
    [useWindowScroll]\r
  );\r
\r
  const updateCardTransforms = useCallback(() => {\r
    if (!cardsRef.current.length || isUpdatingRef.current) return;\r
\r
    isUpdatingRef.current = true;\r
\r
    const { scrollTop, containerHeight, scrollContainer } = getScrollData();\r
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);\r
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);\r
\r
    const endElement = useWindowScroll\r
      ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)\r
      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);\r
\r
    const endElementTop = endElement ? getElementOffset(endElement) : 0;\r
\r
    cardsRef.current.forEach((card, i) => {\r
      if (!card) return;\r
\r
      const cardTop = getElementOffset(card);\r
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;\r
      const triggerEnd = cardTop - scaleEndPositionPx;\r
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;\r
      const pinEnd = endElementTop - containerHeight / 2;\r
\r
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);\r
      const targetScale = baseScale + i * itemScale;\r
      const scale = 1 - scaleProgress * (1 - targetScale);\r
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;\r
\r
      let blur = 0;\r
      if (blurAmount) {\r
        let topCardIndex = 0;\r
        for (let j = 0; j < cardsRef.current.length; j++) {\r
          const jCardTop = getElementOffset(cardsRef.current[j]);\r
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;\r
          if (scrollTop >= jTriggerStart) {\r
            topCardIndex = j;\r
          }\r
        }\r
\r
        if (i < topCardIndex) {\r
          const depthInStack = topCardIndex - i;\r
          blur = Math.max(0, depthInStack * blurAmount);\r
        }\r
      }\r
\r
      let translateY = 0;\r
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;\r
\r
      if (isPinned) {\r
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;\r
      } else if (scrollTop > pinEnd) {\r
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;\r
      }\r
\r
      const newTransform = {\r
        translateY: Math.round(translateY * 100) / 100,\r
        scale: Math.round(scale * 1000) / 1000,\r
        rotation: Math.round(rotation * 100) / 100,\r
        blur: Math.round(blur * 100) / 100\r
      };\r
\r
      const lastTransform = lastTransformsRef.current.get(i);\r
      const hasChanged =\r
        !lastTransform ||\r
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||\r
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||\r
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||\r
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;\r
\r
      if (hasChanged) {\r
        const transform = \`translate3d(0, \${newTransform.translateY}px, 0) scale(\${newTransform.scale}) rotate(\${newTransform.rotation}deg)\`;\r
        const filter = newTransform.blur > 0 ? \`blur(\${newTransform.blur}px)\` : '';\r
\r
        card.style.transform = transform;\r
        card.style.filter = filter;\r
\r
        lastTransformsRef.current.set(i, newTransform);\r
      }\r
\r
      if (i === cardsRef.current.length - 1) {\r
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;\r
        if (isInView && !stackCompletedRef.current) {\r
          stackCompletedRef.current = true;\r
          onStackComplete?.();\r
        } else if (!isInView && stackCompletedRef.current) {\r
          stackCompletedRef.current = false;\r
        }\r
      }\r
    });\r
\r
    isUpdatingRef.current = false;\r
  }, [\r
    itemScale,\r
    itemStackDistance,\r
    stackPosition,\r
    scaleEndPosition,\r
    baseScale,\r
    rotationAmount,\r
    blurAmount,\r
    useWindowScroll,\r
    onStackComplete,\r
    calculateProgress,\r
    parsePercentage,\r
    getScrollData,\r
    getElementOffset\r
  ]);\r
\r
  const handleScroll = useCallback(() => {\r
    updateCardTransforms();\r
  }, [updateCardTransforms]);\r
\r
  const setupLenis = useCallback(() => {\r
    if (useWindowScroll) {\r
      const lenis = new Lenis({\r
        duration: 1.2,\r
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),\r
        smoothWheel: true,\r
        touchMultiplier: 2,\r
        infinite: false,\r
        wheelMultiplier: 1,\r
        lerp: 0.1,\r
        syncTouch: true,\r
        syncTouchLerp: 0.075\r
      });\r
\r
      lenis.on('scroll', handleScroll);\r
\r
      const raf = (time: number) => {\r
        lenis.raf(time);\r
        animationFrameRef.current = requestAnimationFrame(raf);\r
      };\r
      animationFrameRef.current = requestAnimationFrame(raf);\r
\r
      lenisRef.current = lenis;\r
      return lenis;\r
    } else {\r
      const scroller = scrollerRef.current;\r
      if (!scroller) return;\r
\r
      const lenis = new Lenis({\r
        wrapper: scroller,\r
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,\r
        duration: 1.2,\r
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),\r
        smoothWheel: true,\r
        touchMultiplier: 2,\r
        infinite: false,\r
        gestureOrientation: 'vertical',\r
        wheelMultiplier: 1,\r
        lerp: 0.1,\r
        syncTouch: true,\r
        syncTouchLerp: 0.075\r
      });\r
\r
      lenis.on('scroll', handleScroll);\r
\r
      const raf = (time: number) => {\r
        lenis.raf(time);\r
        animationFrameRef.current = requestAnimationFrame(raf);\r
      };\r
      animationFrameRef.current = requestAnimationFrame(raf);\r
\r
      lenisRef.current = lenis;\r
      return lenis;\r
    }\r
  }, [handleScroll, useWindowScroll]);\r
\r
  useLayoutEffect(() => {\r
    if (!useWindowScroll && !scrollerRef.current) return;\r
\r
    const cards = Array.from(\r
      useWindowScroll\r
        ? document.querySelectorAll('.scroll-stack-card')\r
        : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])\r
    ) as HTMLElement[];\r
    cardsRef.current = cards;\r
    const transformsCache = lastTransformsRef.current;\r
\r
    cards.forEach((card, i) => {\r
      if (i < cards.length - 1) {\r
        card.style.marginBottom = \`\${itemDistance}px\`;\r
      }\r
      card.style.willChange = 'transform, filter';\r
      card.style.transformOrigin = 'top center';\r
      card.style.backfaceVisibility = 'hidden';\r
      card.style.transform = 'translateZ(0)';\r
      card.style.webkitTransform = 'translateZ(0)';\r
      card.style.perspective = '1000px';\r
      card.style.webkitPerspective = '1000px';\r
    });\r
\r
    setupLenis();\r
\r
    updateCardTransforms();\r
\r
    return () => {\r
      if (animationFrameRef.current) {\r
        cancelAnimationFrame(animationFrameRef.current);\r
      }\r
      if (lenisRef.current) {\r
        lenisRef.current.destroy();\r
      }\r
      stackCompletedRef.current = false;\r
      cardsRef.current = [];\r
      transformsCache.clear();\r
      isUpdatingRef.current = false;\r
    };\r
  }, [\r
    itemDistance,\r
    itemScale,\r
    itemStackDistance,\r
    stackPosition,\r
    scaleEndPosition,\r
    baseScale,\r
    scaleDuration,\r
    rotationAmount,\r
    blurAmount,\r
    useWindowScroll,\r
    onStackComplete,\r
    setupLenis,\r
    updateCardTransforms\r
  ]);\r
\r
  return (\r
    <div\r
      className={\`relative w-full h-full overflow-y-auto overflow-x-visible \${className}\`.trim()}\r
      ref={scrollerRef}\r
      style={{\r
        overscrollBehavior: 'contain',\r
        WebkitOverflowScrolling: 'touch',\r
        scrollBehavior: 'smooth',\r
        WebkitTransform: 'translateZ(0)',\r
        transform: 'translateZ(0)',\r
        willChange: 'scroll-position'\r
      }}\r
    >\r
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">\r
        {children}\r
        {/* Spacer so the last pin can release cleanly */}\r
        <div className="scroll-stack-end w-full h-px" />\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default ScrollStack;\r
`,xr={dependencies:"lenis",usage:`import ScrollStack, { ScrollStackItem } from './ScrollStack'

<ScrollStack>
  <ScrollStackItem>
    <h2>Card 1</h2>
    <p>This is the first card in the stack</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 2</h2>
    <p>This is the second card in the stack</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 3</h2>
    <p>This is the third card in the stack</p>
  </ScrollStackItem>
</ScrollStack>`,code:br,css:Rr,tailwind:wr,tsCode:Cr,tsTailwind:Pr},L=({children:y,itemClassName:k=""})=>r.jsx("div",{className:`scroll-stack-card ${k}`.trim(),children:y}),yr=({children:y,className:k="",itemDistance:N=100,itemScale:T=.03,itemStackDistance:i=30,stackPosition:E="20%",scaleEndPosition:b="10%",baseScale:v=.85,scaleDuration:H=.5,rotationAmount:R=0,blurAmount:g=0,useWindowScroll:l=!1,onStackComplete:f})=>{const S=t.useRef(null),d=t.useRef(!1),p=t.useRef(null),w=t.useRef(null),a=t.useRef([]),M=t.useRef(new Map),C=t.useRef(!1),W=t.useCallback((n,e,o)=>n<e?0:n>o?1:(n-e)/(o-e),[]),A=t.useCallback((n,e)=>typeof n=="string"&&n.includes("%")?parseFloat(n)/100*e:parseFloat(n),[]),Y=t.useCallback(()=>{if(l)return{scrollTop:window.scrollY,containerHeight:window.innerHeight,scrollContainer:document.documentElement};{const n=S.current;return{scrollTop:n.scrollTop,containerHeight:n.clientHeight,scrollContainer:n}}},[l]),P=t.useCallback(n=>l?n.getBoundingClientRect().top+window.scrollY:n.offsetTop,[l]),x=t.useCallback(()=>{var Z;if(!a.current.length||C.current)return;C.current=!0;const{scrollTop:n,containerHeight:e,scrollContainer:o}=Y(),s=A(E,e),B=A(b,e),V=l?document.querySelector(".scroll-stack-end"):(Z=S.current)==null?void 0:Z.querySelector(".scroll-stack-end"),K=V?P(V):0;a.current.forEach(($,c)=>{if(!$)return;const D=P($),Q=D-s-i*c,X=D-B,_=D-s-i*c,O=K-e/2,z=W(n,Q,X),rr=v+c*T,nr=1-z*(1-rr),er=R?c*R*z:0;let G=0;if(g){let h=0;for(let m=0;m<a.current.length;m++){const tr=P(a.current[m])-s-i*m;n>=tr&&(h=m)}if(c<h){const m=h-c;G=Math.max(0,m*g)}}let U=0;n>=_&&n<=O?U=n-D+s+i*c:n>O&&(U=O-D+s+i*c);const u={translateY:Math.round(U*100)/100,scale:Math.round(nr*1e3)/1e3,rotation:Math.round(er*100)/100,blur:Math.round(G*100)/100},F=M.current.get(c);if(!F||Math.abs(F.translateY-u.translateY)>.1||Math.abs(F.scale-u.scale)>.001||Math.abs(F.rotation-u.rotation)>.1||Math.abs(F.blur-u.blur)>.1){const h=`translate3d(0, ${u.translateY}px, 0) scale(${u.scale}) rotate(${u.rotation}deg)`,m=u.blur>0?`blur(${u.blur}px)`:"";$.style.transform=h,$.style.filter=m,M.current.set(c,u)}if(c===a.current.length-1){const h=n>=_&&n<=O;h&&!d.current?(d.current=!0,f==null||f()):!h&&d.current&&(d.current=!1)}}),C.current=!1},[T,i,E,b,v,R,g,l,f,W,A,Y,P]),j=t.useCallback(()=>{x()},[x]),q=t.useCallback(()=>{if(l){const n=new J({duration:1.2,easing:o=>Math.min(1,1.001-Math.pow(2,-10*o)),smoothWheel:!0,touchMultiplier:2,infinite:!1,wheelMultiplier:1,lerp:.1,syncTouch:!0,syncTouchLerp:.075});n.on("scroll",j);const e=o=>{n.raf(o),p.current=requestAnimationFrame(e)};return p.current=requestAnimationFrame(e),w.current=n,n}else{const n=S.current;if(!n)return;const e=new J({wrapper:n,content:n.querySelector(".scroll-stack-inner"),duration:1.2,easing:s=>Math.min(1,1.001-Math.pow(2,-10*s)),smoothWheel:!0,touchMultiplier:2,infinite:!1,gestureOrientationHandler:!0,normalizeWheel:!0,wheelMultiplier:1,touchInertiaMultiplier:35,lerp:.1,syncTouch:!0,syncTouchLerp:.075,touchInertia:.6});e.on("scroll",j);const o=s=>{e.raf(s),p.current=requestAnimationFrame(o)};return p.current=requestAnimationFrame(o),w.current=e,e}},[j,l]);return t.useLayoutEffect(()=>{const n=S.current;if(!n)return;const e=Array.from(l?document.querySelectorAll(".scroll-stack-card"):n.querySelectorAll(".scroll-stack-card"));a.current=e;const o=M.current;return e.forEach((s,B)=>{B<e.length-1&&(s.style.marginBottom=`${N}px`),s.style.willChange="transform, filter",s.style.transformOrigin="top center",s.style.backfaceVisibility="hidden",s.style.transform="translateZ(0)",s.style.webkitTransform="translateZ(0)",s.style.perspective="1000px",s.style.webkitPerspective="1000px"}),q(),x(),()=>{p.current&&cancelAnimationFrame(p.current),w.current&&w.current.destroy(),d.current=!1,a.current=[],o.clear(),C.current=!1}},[N,T,i,E,b,v,H,R,g,l,f,q,x]),r.jsx("div",{className:`scroll-stack-scroller ${k}`.trim(),ref:S,children:r.jsxs("div",{className:"scroll-stack-inner",children:[y,r.jsx("div",{className:"scroll-stack-end"})]})})},$r=()=>{const[y,k]=Tr(),[N,T]=t.useState(!1),[i,E]=t.useState(200),[b,v]=t.useState(30),[H,R]=t.useState(.85),[g,l]=t.useState(0),[f,S]=t.useState(0),[d,p]=t.useState("20%"),w=()=>{k(),T(!1)},a=n=>e=>{n(e),k()},M=a(E),C=a(v),W=a(R),A=a(l),Y=a(S),P=a(p),x=()=>{T(!0)},j=[{value:"10%",label:"10%"},{value:"15%",label:"15%"},{value:"20%",label:"20%"},{value:"25%",label:"25%"},{value:"30%",label:"30%"},{value:"35%",label:"35%"}],q=[{name:"children",type:"ReactNode",default:"required",description:"The content to be displayed in the scroll stack. Should contain ScrollStackItem components."},{name:"className",type:"string",default:'""',description:"Additional CSS classes to apply to the scroll stack container."},{name:"itemDistance",type:"number",default:"100",description:"Distance between stacked items in pixels."},{name:"itemScale",type:"number",default:"0.03",description:"Scale increment for each stacked item."},{name:"itemStackDistance",type:"number",default:"30",description:"Distance between items when they start stacking."},{name:"stackPosition",type:"string",default:'"20%"',description:"Position where the stacking effect begins as a percentage of viewport height."},{name:"scaleEndPosition",type:"string",default:'"10%"',description:"Position where the scaling effect ends as a percentage of viewport height."},{name:"baseScale",type:"number",default:"0.85",description:"Base scale value for the first item in the stack."},{name:"scaleDuration",type:"number",default:"0.5",description:"Duration of the scaling animation in seconds."},{name:"rotationAmount",type:"number",default:"0",description:"Rotation amount for each item in degrees."},{name:"blurAmount",type:"number",default:"0",description:"Blur amount for items that are further back in the stack."},{name:"useWindowScroll",type:"boolean",default:"false",description:"Whether to use window scroll for the stack."},{name:"onStackComplete",type:"function",default:"undefined",description:"Callback function called when the stack animation is complete."}];return r.jsxs(ur,{children:[r.jsxs(mr,{children:[r.jsxs(sr,{position:"relative",className:"demo-container",h:500,p:0,overflow:"hidden",children:[r.jsx(Sr,{onClick:w}),r.jsx(ar,{textAlign:"center",color:"#271E37",fontSize:"clamp(2rem, 4vw, 3rem)",fontWeight:900,position:"absolute",top:"25%",transform:"translate(-50%, -50%)",left:"50%",pointerEvents:"none",transition:"all 0.3s ease",children:N?"Stack Completed!":"Scroll Down"}),r.jsxs(yr,{itemDistance:i,className:"scroll-stack-demo-container",itemStackDistance:b,stackPosition:d,baseScale:H,rotationAmount:g,blurAmount:f,onStackComplete:x,children:[r.jsxs(L,{itemClassName:"scroll-stack-card-demo ssc-demo-1",children:[r.jsx("h3",{children:"Text Animations"}),r.jsx("div",{className:"stack-img-container",children:r.jsx(lr,{})})]}),r.jsxs(L,{itemClassName:"scroll-stack-card-demo ssc-demo-2",children:[r.jsx("h3",{children:"Animations"}),r.jsx("div",{className:"stack-img-container",children:r.jsx(or,{})})]}),r.jsxs(L,{itemClassName:"scroll-stack-card-demo ssc-demo-3",children:[r.jsx("h3",{children:"Components"}),r.jsx("div",{className:"stack-img-container",children:r.jsx(cr,{})})]}),r.jsxs(L,{itemClassName:"scroll-stack-card-demo ssc-demo-4",children:[r.jsx("h3",{children:"Backgrounds"}),r.jsx("div",{className:"stack-img-container",children:r.jsx(ir,{})})]}),r.jsx(L,{itemClassName:"scroll-stack-card-demo ssc-demo-5",children:r.jsx("h3",{children:"All on React Bits!"})})]},y)]}),r.jsxs(hr,{children:[r.jsx(I,{title:"Item Distance",min:0,max:1e3,step:10,value:i,valueUnit:"px",onChange:M}),r.jsx(I,{title:"Stack Distance",min:0,max:40,step:5,value:b,valueUnit:"px",onChange:C}),r.jsx(kr,{title:"Stack Position",options:j,value:d,width:100,onChange:P}),r.jsx(I,{title:"Base Scale",min:.5,max:1,step:.05,value:H,onChange:W}),r.jsx(I,{title:"Rotation Amount",min:0,max:1,step:.1,value:g,valueUnit:"°",onChange:A}),r.jsx(I,{title:"Blur Amount",min:0,max:10,step:.5,value:f,valueUnit:"px",onChange:Y})]}),r.jsx(fr,{data:q}),r.jsx(gr,{dependencyList:["lenis"]})]}),r.jsx(dr,{children:r.jsx(pr,{codeObject:xr})})]})};export{$r as default};
