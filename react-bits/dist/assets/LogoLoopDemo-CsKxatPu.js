import{r as n,j as r,s as p,B as G}from"./index-wsKSLPNH.js";import{T as B,P as U,a as Y,C as X,b as Z}from"./PropTable-C4uPWs8h.js";import{C as K}from"./Customize-1m_ZNqR9.js";import{P as w}from"./PreviewSlider-m1G_aiYP.js";import{P as H}from"./PreviewSwitch-DqnF708j.js";import{u as J}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";const Q=`import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';\r
import './LogoLoop.css';\r
\r
const ANIMATION_CONFIG = {\r
  SMOOTH_TAU: 0.25,\r
  MIN_COPIES: 2,\r
  COPY_HEADROOM: 2\r
};\r
\r
const toCssLength = value => (typeof value === 'number' ? \`\${value}px\` : (value ?? undefined));\r
\r
const useResizeObserver = (callback, elements, dependencies) => {\r
  useEffect(() => {\r
    if (!window.ResizeObserver) {\r
      const handleResize = () => callback();\r
      window.addEventListener('resize', handleResize);\r
      callback();\r
      return () => window.removeEventListener('resize', handleResize);\r
    }\r
\r
    const observers = elements.map(ref => {\r
      if (!ref.current) return null;\r
      const observer = new ResizeObserver(callback);\r
      observer.observe(ref.current);\r
      return observer;\r
    });\r
\r
    callback();\r
\r
    return () => {\r
      observers.forEach(observer => observer?.disconnect());\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, dependencies);\r
};\r
\r
const useImageLoader = (seqRef, onLoad, dependencies) => {\r
  useEffect(() => {\r
    const images = seqRef.current?.querySelectorAll('img') ?? [];\r
\r
    if (images.length === 0) {\r
      onLoad();\r
      return;\r
    }\r
\r
    let remainingImages = images.length;\r
    const handleImageLoad = () => {\r
      remainingImages -= 1;\r
      if (remainingImages === 0) {\r
        onLoad();\r
      }\r
    };\r
\r
    images.forEach(img => {\r
      const htmlImg = img;\r
      if (htmlImg.complete) {\r
        handleImageLoad();\r
      } else {\r
        htmlImg.addEventListener('load', handleImageLoad, { once: true });\r
        htmlImg.addEventListener('error', handleImageLoad, { once: true });\r
      }\r
    });\r
\r
    return () => {\r
      images.forEach(img => {\r
        img.removeEventListener('load', handleImageLoad);\r
        img.removeEventListener('error', handleImageLoad);\r
      });\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, dependencies);\r
};\r
\r
const useAnimationLoop = (trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover) => {\r
  const rafRef = useRef(null);\r
  const lastTimestampRef = useRef(null);\r
  const offsetRef = useRef(0);\r
  const velocityRef = useRef(0);\r
\r
  useEffect(() => {\r
    const track = trackRef.current;\r
    if (!track) return;\r
\r
    if (seqWidth > 0) {\r
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;\r
      track.style.transform = \`translate3d(\${-offsetRef.current}px, 0, 0)\`;\r
    }\r
\r
    const animate = timestamp => {\r
      if (lastTimestampRef.current === null) {\r
        lastTimestampRef.current = timestamp;\r
      }\r
\r
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;\r
      lastTimestampRef.current = timestamp;\r
\r
      const target = pauseOnHover && isHovered ? 0 : targetVelocity;\r
\r
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);\r
      velocityRef.current += (target - velocityRef.current) * easingFactor;\r
\r
      if (seqWidth > 0) {\r
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;\r
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;\r
        offsetRef.current = nextOffset;\r
\r
        const translateX = -offsetRef.current;\r
        track.style.transform = \`translate3d(\${translateX}px, 0, 0)\`;\r
      }\r
\r
      rafRef.current = requestAnimationFrame(animate);\r
    };\r
\r
    rafRef.current = requestAnimationFrame(animate);\r
\r
    return () => {\r
      if (rafRef.current !== null) {\r
        cancelAnimationFrame(rafRef.current);\r
        rafRef.current = null;\r
      }\r
      lastTimestampRef.current = null;\r
    };\r
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);\r
};\r
\r
export const LogoLoop = memo(\r
  ({\r
    logos,\r
    speed = 120,\r
    direction = 'left',\r
    width = '100%',\r
    logoHeight = 28,\r
    gap = 32,\r
    pauseOnHover = true,\r
    fadeOut = false,\r
    fadeOutColor,\r
    scaleOnHover = false,\r
    ariaLabel = 'Partner logos',\r
    className,\r
    style\r
  }) => {\r
    const containerRef = useRef(null);\r
    const trackRef = useRef(null);\r
    const seqRef = useRef(null);\r
\r
    const [seqWidth, setSeqWidth] = useState(0);\r
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);\r
    const [isHovered, setIsHovered] = useState(false);\r
\r
    const targetVelocity = useMemo(() => {\r
      const magnitude = Math.abs(speed);\r
      const directionMultiplier = direction === 'left' ? 1 : -1;\r
      const speedMultiplier = speed < 0 ? -1 : 1;\r
      return magnitude * directionMultiplier * speedMultiplier;\r
    }, [speed, direction]);\r
\r
    const updateDimensions = useCallback(() => {\r
      const containerWidth = containerRef.current?.clientWidth ?? 0;\r
      const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;\r
\r
      if (sequenceWidth > 0) {\r
        setSeqWidth(Math.ceil(sequenceWidth));\r
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;\r
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));\r
      }\r
    }, []);\r
\r
    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);\r
\r
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);\r
\r
    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);\r
\r
    const cssVariables = useMemo(\r
      () => ({\r
        '--logoloop-gap': \`\${gap}px\`,\r
        '--logoloop-logoHeight': \`\${logoHeight}px\`,\r
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })\r
      }),\r
      [gap, logoHeight, fadeOutColor]\r
    );\r
\r
    const rootClassName = useMemo(\r
      () =>\r
        ['logoloop', fadeOut && 'logoloop--fade', scaleOnHover && 'logoloop--scale-hover', className]\r
          .filter(Boolean)\r
          .join(' '),\r
      [fadeOut, scaleOnHover, className]\r
    );\r
\r
    const handleMouseEnter = useCallback(() => {\r
      if (pauseOnHover) setIsHovered(true);\r
    }, [pauseOnHover]);\r
\r
    const handleMouseLeave = useCallback(() => {\r
      if (pauseOnHover) setIsHovered(false);\r
    }, [pauseOnHover]);\r
\r
    const renderLogoItem = useCallback((item, key) => {\r
      const isNodeItem = 'node' in item;\r
\r
      const content = isNodeItem ? (\r
        <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>\r
          {item.node}\r
        </span>\r
      ) : (\r
        <img\r
          src={item.src}\r
          srcSet={item.srcSet}\r
          sizes={item.sizes}\r
          width={item.width}\r
          height={item.height}\r
          alt={item.alt ?? ''}\r
          title={item.title}\r
          loading="lazy"\r
          decoding="async"\r
          draggable={false}\r
        />\r
      );\r
\r
      const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);\r
\r
      const itemContent = item.href ? (\r
        <a\r
          className="logoloop__link"\r
          href={item.href}\r
          aria-label={itemAriaLabel || 'logo link'}\r
          target="_blank"\r
          rel="noreferrer noopener"\r
        >\r
          {content}\r
        </a>\r
      ) : (\r
        content\r
      );\r
\r
      return (\r
        <li className="logoloop__item" key={key} role="listitem">\r
          {itemContent}\r
        </li>\r
      );\r
    }, []);\r
\r
    const logoLists = useMemo(\r
      () =>\r
        Array.from({ length: copyCount }, (_, copyIndex) => (\r
          <ul\r
            className="logoloop__list"\r
            key={\`copy-\${copyIndex}\`}\r
            role="list"\r
            aria-hidden={copyIndex > 0}\r
            ref={copyIndex === 0 ? seqRef : undefined}\r
          >\r
            {logos.map((item, itemIndex) => renderLogoItem(item, \`\${copyIndex}-\${itemIndex}\`))}\r
          </ul>\r
        )),\r
      [copyCount, logos, renderLogoItem]\r
    );\r
\r
    const containerStyle = useMemo(\r
      () => ({\r
        width: toCssLength(width) ?? '100%',\r
        ...cssVariables,\r
        ...style\r
      }),\r
      [width, cssVariables, style]\r
    );\r
\r
    return (\r
      <div\r
        ref={containerRef}\r
        className={rootClassName}\r
        style={containerStyle}\r
        role="region"\r
        aria-label={ariaLabel}\r
        onMouseEnter={handleMouseEnter}\r
        onMouseLeave={handleMouseLeave}\r
      >\r
        <div className="logoloop__track" ref={trackRef}>\r
          {logoLists}\r
        </div>\r
      </div>\r
    );\r
  }\r
);\r
\r
LogoLoop.displayName = 'LogoLoop';\r
\r
export default LogoLoop;\r
`,ee=`.logoloop {\r
  position: relative;\r
  overflow-x: hidden;\r
\r
  --logoloop-gap: 32px;\r
  --logoloop-logoHeight: 28px;\r
  --logoloop-fadeColorAuto: #ffffff;\r
}\r
\r
.logoloop--scale-hover {\r
  padding-top: calc(var(--logoloop-logoHeight) * 0.1);\r
  padding-bottom: calc(var(--logoloop-logoHeight) * 0.1);\r
}\r
\r
@media (prefers-color-scheme: dark) {\r
  .logoloop {\r
    --logoloop-fadeColorAuto: #0b0b0b;\r
  }\r
}\r
\r
.logoloop__track {\r
  display: flex;\r
  width: max-content;\r
  will-change: transform;\r
  user-select: none;\r
}\r
\r
.logoloop__list {\r
  display: flex;\r
  align-items: center;\r
}\r
\r
.logoloop__item {\r
  flex: 0 0 auto;\r
  margin-right: var(--logoloop-gap);\r
  font-size: var(--logoloop-logoHeight);\r
  line-height: 1;\r
}\r
\r
.logoloop__item:last-child {\r
  margin-right: var(--logoloop-gap);\r
}\r
\r
.logoloop__node {\r
  display: inline-flex;\r
  align-items: center;\r
}\r
\r
.logoloop__item img {\r
  height: var(--logoloop-logoHeight);\r
  width: auto;\r
  display: block;\r
  object-fit: contain;\r
  image-rendering: -webkit-optimize-contrast;\r
  -webkit-user-drag: none;\r
  pointer-events: none;\r
  /* Links handle interaction */\r
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r
}\r
\r
.logoloop--scale-hover .logoloop__item {\r
  overflow: visible;\r
}\r
\r
.logoloop--scale-hover .logoloop__item:hover img,\r
.logoloop--scale-hover .logoloop__item:hover .logoloop__node {\r
  transform: scale(1.2);\r
  transform-origin: center center;\r
}\r
\r
.logoloop--scale-hover .logoloop__node {\r
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\r
}\r
\r
.logoloop__link {\r
  display: inline-flex;\r
  align-items: center;\r
  text-decoration: none;\r
  border-radius: 4px;\r
  transition: opacity 0.2s ease;\r
}\r
\r
.logoloop__link:hover {\r
  opacity: 0.8;\r
}\r
\r
.logoloop__link:focus-visible {\r
  outline: 2px solid currentColor;\r
  outline-offset: 2px;\r
}\r
\r
.logoloop--fade::before,\r
.logoloop--fade::after {\r
  content: '';\r
  position: absolute;\r
  top: 0;\r
  bottom: 0;\r
  width: clamp(24px, 8%, 120px);\r
  pointer-events: none;\r
  z-index: 1;\r
}\r
\r
.logoloop--fade::before {\r
  left: 0;\r
  background: linear-gradient(\r
    to right,\r
    var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,\r
    rgba(0, 0, 0, 0) 100%\r
  );\r
}\r
\r
.logoloop--fade::after {\r
  right: 0;\r
  background: linear-gradient(\r
    to left,\r
    var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,\r
    rgba(0, 0, 0, 0) 100%\r
  );\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .logoloop__track {\r
    transform: translate3d(0, 0, 0) !important;\r
  }\r
\r
  .logoloop__item img,\r
  .logoloop__node {\r
    transition: none !important;\r
  }\r
}\r
`,re=`import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';\r
\r
const ANIMATION_CONFIG = {\r
  SMOOTH_TAU: 0.25,\r
  MIN_COPIES: 2,\r
  COPY_HEADROOM: 2\r
};\r
\r
const toCssLength = value => (typeof value === 'number' ? \`\${value}px\` : (value ?? undefined));\r
\r
const cx = (...parts) => parts.filter(Boolean).join(' ');\r
\r
const useResizeObserver = (callback, elements, dependencies) => {\r
  useEffect(() => {\r
    if (!window.ResizeObserver) {\r
      const handleResize = () => callback();\r
      window.addEventListener('resize', handleResize);\r
      callback();\r
      return () => window.removeEventListener('resize', handleResize);\r
    }\r
\r
    const observers = elements.map(ref => {\r
      if (!ref.current) return null;\r
      const observer = new ResizeObserver(callback);\r
      observer.observe(ref.current);\r
      return observer;\r
    });\r
\r
    callback();\r
\r
    return () => {\r
      observers.forEach(observer => observer?.disconnect());\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, dependencies);\r
};\r
\r
const useImageLoader = (seqRef, onLoad, dependencies) => {\r
  useEffect(() => {\r
    const images = seqRef.current?.querySelectorAll('img') ?? [];\r
\r
    if (images.length === 0) {\r
      onLoad();\r
      return;\r
    }\r
\r
    let remainingImages = images.length;\r
    const handleImageLoad = () => {\r
      remainingImages -= 1;\r
      if (remainingImages === 0) {\r
        onLoad();\r
      }\r
    };\r
\r
    images.forEach(img => {\r
      const htmlImg = img;\r
      if (htmlImg.complete) {\r
        handleImageLoad();\r
      } else {\r
        htmlImg.addEventListener('load', handleImageLoad, { once: true });\r
        htmlImg.addEventListener('error', handleImageLoad, { once: true });\r
      }\r
    });\r
\r
    return () => {\r
      images.forEach(img => {\r
        img.removeEventListener('load', handleImageLoad);\r
        img.removeEventListener('error', handleImageLoad);\r
      });\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, dependencies);\r
};\r
\r
const useAnimationLoop = (trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover) => {\r
  const rafRef = useRef(null);\r
  const lastTimestampRef = useRef(null);\r
  const offsetRef = useRef(0);\r
  const velocityRef = useRef(0);\r
\r
  useEffect(() => {\r
    const track = trackRef.current;\r
    if (!track) return;\r
\r
    const prefersReduced =\r
      typeof window !== 'undefined' &&\r
      window.matchMedia &&\r
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;\r
\r
    if (seqWidth > 0) {\r
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;\r
      track.style.transform = \`translate3d(\${-offsetRef.current}px, 0, 0)\`;\r
    }\r
\r
    if (prefersReduced) {\r
      track.style.transform = 'translate3d(0, 0, 0)';\r
      return () => {\r
        lastTimestampRef.current = null;\r
      };\r
    }\r
\r
    const animate = timestamp => {\r
      if (lastTimestampRef.current === null) {\r
        lastTimestampRef.current = timestamp;\r
      }\r
\r
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;\r
      lastTimestampRef.current = timestamp;\r
\r
      const target = pauseOnHover && isHovered ? 0 : targetVelocity;\r
\r
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);\r
      velocityRef.current += (target - velocityRef.current) * easingFactor;\r
\r
      if (seqWidth > 0) {\r
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;\r
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;\r
        offsetRef.current = nextOffset;\r
\r
        const translateX = -offsetRef.current;\r
        track.style.transform = \`translate3d(\${translateX}px, 0, 0)\`;\r
      }\r
\r
      rafRef.current = requestAnimationFrame(animate);\r
    };\r
\r
    rafRef.current = requestAnimationFrame(animate);\r
\r
    return () => {\r
      if (rafRef.current !== null) {\r
        cancelAnimationFrame(rafRef.current);\r
        rafRef.current = null;\r
      }\r
      lastTimestampRef.current = null;\r
    };\r
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);\r
};\r
\r
export const LogoLoop = memo(\r
  ({\r
    logos,\r
    speed = 120,\r
    direction = 'left',\r
    width = '100%',\r
    logoHeight = 28,\r
    gap = 32,\r
    pauseOnHover = true,\r
    fadeOut = false,\r
    fadeOutColor,\r
    scaleOnHover = false,\r
    ariaLabel = 'Partner logos',\r
    className,\r
    style\r
  }) => {\r
    const containerRef = useRef(null);\r
    const trackRef = useRef(null);\r
    const seqRef = useRef(null);\r
\r
    const [seqWidth, setSeqWidth] = useState(0);\r
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);\r
    const [isHovered, setIsHovered] = useState(false);\r
\r
    const targetVelocity = useMemo(() => {\r
      const magnitude = Math.abs(speed);\r
      const directionMultiplier = direction === 'left' ? 1 : -1;\r
      const speedMultiplier = speed < 0 ? -1 : 1;\r
      return magnitude * directionMultiplier * speedMultiplier;\r
    }, [speed, direction]);\r
\r
    const updateDimensions = useCallback(() => {\r
      const containerWidth = containerRef.current?.clientWidth ?? 0;\r
      const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;\r
\r
      if (sequenceWidth > 0) {\r
        setSeqWidth(Math.ceil(sequenceWidth));\r
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;\r
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));\r
      }\r
    }, []);\r
\r
    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);\r
\r
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);\r
\r
    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);\r
\r
    const cssVariables = useMemo(\r
      () => ({\r
        '--logoloop-gap': \`\${gap}px\`,\r
        '--logoloop-logoHeight': \`\${logoHeight}px\`,\r
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })\r
      }),\r
      [gap, logoHeight, fadeOutColor]\r
    );\r
\r
    const rootClasses = useMemo(\r
      () =>\r
        cx(\r
          'relative overflow-x-hidden group',\r
          '[--logoloop-gap:32px]',\r
          '[--logoloop-logoHeight:28px]',\r
          '[--logoloop-fadeColorAuto:#ffffff]',\r
          'dark:[--logoloop-fadeColorAuto:#0b0b0b]',\r
          scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',\r
          className\r
        ),\r
      [scaleOnHover, className]\r
    );\r
\r
    const handleMouseEnter = useCallback(() => {\r
      if (pauseOnHover) setIsHovered(true);\r
    }, [pauseOnHover]);\r
\r
    const handleMouseLeave = useCallback(() => {\r
      if (pauseOnHover) setIsHovered(false);\r
    }, [pauseOnHover]);\r
\r
    const renderLogoItem = useCallback(\r
      (item, key) => {\r
        const isNodeItem = 'node' in item;\r
\r
        const content = isNodeItem ? (\r
          <span\r
            className={cx(\r
              'inline-flex items-center',\r
              'motion-reduce:transition-none',\r
              scaleOnHover &&\r
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'\r
            )}\r
            aria-hidden={!!item.href && !item.ariaLabel}\r
          >\r
            {item.node}\r
          </span>\r
        ) : (\r
          <img\r
            className={cx(\r
              'h-[var(--logoloop-logoHeight)] w-auto block object-contain',\r
              '[-webkit-user-drag:none] pointer-events-none',\r
              '[image-rendering:-webkit-optimize-contrast]',\r
              'motion-reduce:transition-none',\r
              scaleOnHover &&\r
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'\r
            )}\r
            src={item.src}\r
            srcSet={item.srcSet}\r
            sizes={item.sizes}\r
            width={item.width}\r
            height={item.height}\r
            alt={item.alt ?? ''}\r
            title={item.title}\r
            loading="lazy"\r
            decoding="async"\r
            draggable={false}\r
          />\r
        );\r
\r
        const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);\r
\r
        const inner = item.href ? (\r
          <a\r
            className={cx(\r
              'inline-flex items-center no-underline rounded',\r
              'transition-opacity duration-200 ease-linear',\r
              'hover:opacity-80',\r
              'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'\r
            )}\r
            href={item.href}\r
            aria-label={itemAriaLabel || 'logo link'}\r
            target="_blank"\r
            rel="noreferrer noopener"\r
          >\r
            {content}\r
          </a>\r
        ) : (\r
          content\r
        );\r
\r
        return (\r
          <li\r
            className={cx(\r
              'flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]',\r
              scaleOnHover && 'overflow-visible group/item'\r
            )}\r
            key={key}\r
            role="listitem"\r
          >\r
            {inner}\r
          </li>\r
        );\r
      },\r
      [scaleOnHover]\r
    );\r
\r
    const logoLists = useMemo(\r
      () =>\r
        Array.from({ length: copyCount }, (_, copyIndex) => (\r
          <ul\r
            className="flex items-center"\r
            key={\`copy-\${copyIndex}\`}\r
            role="list"\r
            aria-hidden={copyIndex > 0}\r
            ref={copyIndex === 0 ? seqRef : undefined}\r
          >\r
            {logos.map((item, itemIndex) => renderLogoItem(item, \`\${copyIndex}-\${itemIndex}\`))}\r
          </ul>\r
        )),\r
      [copyCount, logos, renderLogoItem]\r
    );\r
\r
    const containerStyle = useMemo(\r
      () => ({\r
        width: toCssLength(width) ?? '100%',\r
        ...cssVariables,\r
        ...style\r
      }),\r
      [width, cssVariables, style]\r
    );\r
\r
    return (\r
      <div\r
        ref={containerRef}\r
        className={rootClasses}\r
        style={containerStyle}\r
        role="region"\r
        aria-label={ariaLabel}\r
        onMouseEnter={handleMouseEnter}\r
        onMouseLeave={handleMouseLeave}\r
      >\r
        {fadeOut && (\r
          <>\r
            <div\r
              aria-hidden\r
              className={cx(\r
                'pointer-events-none absolute inset-y-0 left-0 z-[1]',\r
                'w-[clamp(24px,8%,120px)]',\r
                'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'\r
              )}\r
            />\r
            <div\r
              aria-hidden\r
              className={cx(\r
                'pointer-events-none absolute inset-y-0 right-0 z-[1]',\r
                'w-[clamp(24px,8%,120px)]',\r
                'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'\r
              )}\r
            />\r
          </>\r
        )}\r
\r
        <div\r
          className={cx('flex w-max will-change-transform select-none', 'motion-reduce:transform-none')}\r
          ref={trackRef}\r
        >\r
          {logoLists}\r
        </div>\r
      </div>\r
    );\r
  }\r
);\r
\r
LogoLoop.displayName = 'LogoLoop';\r
\r
export default LogoLoop;\r
`,ne=`import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';\r
import './LogoLoop.css';\r
\r
export type LogoItem =\r
  | {\r
      node: React.ReactNode;\r
      href?: string;\r
      title?: string;\r
      ariaLabel?: string;\r
    }\r
  | {\r
      src: string;\r
      alt?: string;\r
      href?: string;\r
      title?: string;\r
      srcSet?: string;\r
      sizes?: string;\r
      width?: number;\r
      height?: number;\r
    };\r
\r
export interface LogoLoopProps {\r
  logos: LogoItem[];\r
  speed?: number;\r
  direction?: 'left' | 'right';\r
  width?: number | string;\r
  logoHeight?: number;\r
  gap?: number;\r
  pauseOnHover?: boolean;\r
  fadeOut?: boolean;\r
  fadeOutColor?: string;\r
  scaleOnHover?: boolean;\r
  ariaLabel?: string;\r
  className?: string;\r
  style?: React.CSSProperties;\r
}\r
\r
const ANIMATION_CONFIG = {\r
  SMOOTH_TAU: 0.25,\r
  MIN_COPIES: 2,\r
  COPY_HEADROOM: 2\r
} as const;\r
\r
const toCssLength = (value?: number | string): string | undefined =>\r
  typeof value === 'number' ? \`\${value}px\` : (value ?? undefined);\r
\r
const useResizeObserver = (\r
  callback: () => void,\r
  elements: Array<React.RefObject<Element | null>>,\r
  dependencies: React.DependencyList\r
) => {\r
  useEffect(() => {\r
    if (!window.ResizeObserver) {\r
      const handleResize = () => callback();\r
      window.addEventListener('resize', handleResize);\r
      callback();\r
      return () => window.removeEventListener('resize', handleResize);\r
    }\r
\r
    const observers = elements.map(ref => {\r
      if (!ref.current) return null;\r
      const observer = new ResizeObserver(callback);\r
      observer.observe(ref.current);\r
      return observer;\r
    });\r
\r
    callback();\r
\r
    return () => {\r
      observers.forEach(observer => observer?.disconnect());\r
    };\r
  }, dependencies);\r
};\r
\r
const useImageLoader = (\r
  seqRef: React.RefObject<HTMLUListElement | null>,\r
  onLoad: () => void,\r
  dependencies: React.DependencyList\r
) => {\r
  useEffect(() => {\r
    const images = seqRef.current?.querySelectorAll('img') ?? [];\r
\r
    if (images.length === 0) {\r
      onLoad();\r
      return;\r
    }\r
\r
    let remainingImages = images.length;\r
    const handleImageLoad = () => {\r
      remainingImages -= 1;\r
      if (remainingImages === 0) {\r
        onLoad();\r
      }\r
    };\r
\r
    images.forEach(img => {\r
      const htmlImg = img as HTMLImageElement;\r
      if (htmlImg.complete) {\r
        handleImageLoad();\r
      } else {\r
        htmlImg.addEventListener('load', handleImageLoad, { once: true });\r
        htmlImg.addEventListener('error', handleImageLoad, { once: true });\r
      }\r
    });\r
\r
    return () => {\r
      images.forEach(img => {\r
        img.removeEventListener('load', handleImageLoad);\r
        img.removeEventListener('error', handleImageLoad);\r
      });\r
    };\r
  }, dependencies);\r
};\r
\r
const useAnimationLoop = (\r
  trackRef: React.RefObject<HTMLDivElement | null>,\r
  targetVelocity: number,\r
  seqWidth: number,\r
  isHovered: boolean,\r
  pauseOnHover: boolean\r
) => {\r
  const rafRef = useRef<number | null>(null);\r
  const lastTimestampRef = useRef<number | null>(null);\r
  const offsetRef = useRef(0);\r
  const velocityRef = useRef(0);\r
\r
  useEffect(() => {\r
    const track = trackRef.current;\r
    if (!track) return;\r
\r
    if (seqWidth > 0) {\r
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;\r
      track.style.transform = \`translate3d(\${-offsetRef.current}px, 0, 0)\`;\r
    }\r
\r
    const animate = (timestamp: number) => {\r
      if (lastTimestampRef.current === null) {\r
        lastTimestampRef.current = timestamp;\r
      }\r
\r
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;\r
      lastTimestampRef.current = timestamp;\r
\r
      const target = pauseOnHover && isHovered ? 0 : targetVelocity;\r
\r
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);\r
      velocityRef.current += (target - velocityRef.current) * easingFactor;\r
\r
      if (seqWidth > 0) {\r
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;\r
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;\r
        offsetRef.current = nextOffset;\r
\r
        const translateX = -offsetRef.current;\r
        track.style.transform = \`translate3d(\${translateX}px, 0, 0)\`;\r
      }\r
\r
      rafRef.current = requestAnimationFrame(animate);\r
    };\r
\r
    rafRef.current = requestAnimationFrame(animate);\r
\r
    return () => {\r
      if (rafRef.current !== null) {\r
        cancelAnimationFrame(rafRef.current);\r
        rafRef.current = null;\r
      }\r
      lastTimestampRef.current = null;\r
    };\r
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover]);\r
};\r
\r
export const LogoLoop = React.memo<LogoLoopProps>(\r
  ({\r
    logos,\r
    speed = 120,\r
    direction = 'left',\r
    width = '100%',\r
    logoHeight = 28,\r
    gap = 32,\r
    pauseOnHover = true,\r
    fadeOut = false,\r
    fadeOutColor,\r
    scaleOnHover = false,\r
    ariaLabel = 'Partner logos',\r
    className,\r
    style\r
  }) => {\r
    const containerRef = useRef<HTMLDivElement>(null);\r
    const trackRef = useRef<HTMLDivElement>(null);\r
    const seqRef = useRef<HTMLUListElement>(null);\r
\r
    const [seqWidth, setSeqWidth] = useState<number>(0);\r
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);\r
    const [isHovered, setIsHovered] = useState<boolean>(false);\r
\r
    const targetVelocity = useMemo(() => {\r
      const magnitude = Math.abs(speed);\r
      const directionMultiplier = direction === 'left' ? 1 : -1;\r
      const speedMultiplier = speed < 0 ? -1 : 1;\r
      return magnitude * directionMultiplier * speedMultiplier;\r
    }, [speed, direction]);\r
\r
    const updateDimensions = useCallback(() => {\r
      const containerWidth = containerRef.current?.clientWidth ?? 0;\r
      const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;\r
\r
      if (sequenceWidth > 0) {\r
        setSeqWidth(Math.ceil(sequenceWidth));\r
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;\r
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));\r
      }\r
    }, []);\r
\r
    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);\r
\r
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);\r
\r
    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);\r
\r
    const cssVariables = useMemo(\r
      () =>\r
        ({\r
          '--logoloop-gap': \`\${gap}px\`,\r
          '--logoloop-logoHeight': \`\${logoHeight}px\`,\r
          ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })\r
        }) as React.CSSProperties,\r
      [gap, logoHeight, fadeOutColor]\r
    );\r
\r
    const rootClassName = useMemo(\r
      () =>\r
        ['logoloop', fadeOut && 'logoloop--fade', scaleOnHover && 'logoloop--scale-hover', className]\r
          .filter(Boolean)\r
          .join(' '),\r
      [fadeOut, scaleOnHover, className]\r
    );\r
\r
    const handleMouseEnter = useCallback(() => {\r
      if (pauseOnHover) setIsHovered(true);\r
    }, [pauseOnHover]);\r
\r
    const handleMouseLeave = useCallback(() => {\r
      if (pauseOnHover) setIsHovered(false);\r
    }, [pauseOnHover]);\r
\r
    const renderLogoItem = useCallback((item: LogoItem, key: React.Key) => {\r
      const isNodeItem = 'node' in item;\r
\r
      const content = isNodeItem ? (\r
        <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>\r
          {item.node}\r
        </span>\r
      ) : (\r
        <img\r
          src={item.src}\r
          srcSet={item.srcSet}\r
          sizes={item.sizes}\r
          width={item.width}\r
          height={item.height}\r
          alt={item.alt ?? ''}\r
          title={item.title}\r
          loading="lazy"\r
          decoding="async"\r
          draggable={false}\r
        />\r
      );\r
\r
      const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);\r
\r
      const itemContent = item.href ? (\r
        <a\r
          className="logoloop__link"\r
          href={item.href}\r
          aria-label={itemAriaLabel || 'logo link'}\r
          target="_blank"\r
          rel="noreferrer noopener"\r
        >\r
          {content}\r
        </a>\r
      ) : (\r
        content\r
      );\r
\r
      return (\r
        <li className="logoloop__item" key={key} role="listitem">\r
          {itemContent}\r
        </li>\r
      );\r
    }, []);\r
\r
    const logoLists = useMemo(\r
      () =>\r
        Array.from({ length: copyCount }, (_, copyIndex) => (\r
          <ul\r
            className="logoloop__list"\r
            key={\`copy-\${copyIndex}\`}\r
            role="list"\r
            aria-hidden={copyIndex > 0}\r
            ref={copyIndex === 0 ? seqRef : undefined}\r
          >\r
            {logos.map((item, itemIndex) => renderLogoItem(item, \`\${copyIndex}-\${itemIndex}\`))}\r
          </ul>\r
        )),\r
      [copyCount, logos, renderLogoItem]\r
    );\r
\r
    const containerStyle = useMemo(\r
      (): React.CSSProperties => ({\r
        width: toCssLength(width) ?? '100%',\r
        ...cssVariables,\r
        ...style\r
      }),\r
      [width, cssVariables, style]\r
    );\r
\r
    return (\r
      <div\r
        ref={containerRef}\r
        className={rootClassName}\r
        style={containerStyle}\r
        role="region"\r
        aria-label={ariaLabel}\r
        onMouseEnter={handleMouseEnter}\r
        onMouseLeave={handleMouseLeave}\r
      >\r
        <div className="logoloop__track" ref={trackRef}>\r
          {logoLists}\r
        </div>\r
      </div>\r
    );\r
  }\r
);\r
\r
LogoLoop.displayName = 'LogoLoop';\r
\r
export default LogoLoop;\r
`,te=`import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';\r
\r
export type LogoItem =\r
  | {\r
      node: React.ReactNode;\r
      href?: string;\r
      title?: string;\r
      ariaLabel?: string;\r
    }\r
  | {\r
      src: string;\r
      alt?: string;\r
      href?: string;\r
      title?: string;\r
      srcSet?: string;\r
      sizes?: string;\r
      width?: number;\r
      height?: number;\r
    };\r
\r
export interface LogoLoopProps {\r
  logos: LogoItem[];\r
  speed?: number;\r
  direction?: 'left' | 'right';\r
  width?: number | string;\r
  logoHeight?: number;\r
  gap?: number;\r
  pauseOnHover?: boolean;\r
  fadeOut?: boolean;\r
  fadeOutColor?: string;\r
  scaleOnHover?: boolean;\r
  ariaLabel?: string;\r
  className?: string;\r
  style?: React.CSSProperties;\r
}\r
\r
const ANIMATION_CONFIG = {\r
  SMOOTH_TAU: 0.25,\r
  MIN_COPIES: 2,\r
  COPY_HEADROOM: 2\r
} as const;\r
\r
const toCssLength = (value?: number | string): string | undefined =>\r
  typeof value === 'number' ? \`\${value}px\` : (value ?? undefined);\r
\r
const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');\r
\r
const useResizeObserver = (\r
  callback: () => void,\r
  elements: Array<React.RefObject<Element | null>>,\r
  dependencies: React.DependencyList\r
) => {\r
  useEffect(() => {\r
    if (!window.ResizeObserver) {\r
      const handleResize = () => callback();\r
      window.addEventListener('resize', handleResize);\r
      callback();\r
      return () => window.removeEventListener('resize', handleResize);\r
    }\r
\r
    const observers = elements.map(ref => {\r
      if (!ref.current) return null;\r
      const observer = new ResizeObserver(callback);\r
      observer.observe(ref.current);\r
      return observer;\r
    });\r
\r
    callback();\r
\r
    return () => {\r
      observers.forEach(observer => observer?.disconnect());\r
    };\r
  }, dependencies);\r
};\r
\r
const useImageLoader = (\r
  seqRef: React.RefObject<HTMLUListElement | null>,\r
  onLoad: () => void,\r
  dependencies: React.DependencyList\r
) => {\r
  useEffect(() => {\r
    const images = seqRef.current?.querySelectorAll('img') ?? [];\r
\r
    if (images.length === 0) {\r
      onLoad();\r
      return;\r
    }\r
\r
    let remainingImages = images.length;\r
    const handleImageLoad = () => {\r
      remainingImages -= 1;\r
      if (remainingImages === 0) {\r
        onLoad();\r
      }\r
    };\r
\r
    images.forEach(img => {\r
      const htmlImg = img as HTMLImageElement;\r
      if (htmlImg.complete) {\r
        handleImageLoad();\r
      } else {\r
        htmlImg.addEventListener('load', handleImageLoad, { once: true });\r
        htmlImg.addEventListener('error', handleImageLoad, { once: true });\r
      }\r
    });\r
\r
    return () => {\r
      images.forEach(img => {\r
        img.removeEventListener('load', handleImageLoad);\r
        img.removeEventListener('error', handleImageLoad);\r
      });\r
    };\r
  }, dependencies);\r
};\r
\r
const useAnimationLoop = (\r
  trackRef: React.RefObject<HTMLDivElement | null>,\r
  targetVelocity: number,\r
  seqWidth: number,\r
  isHovered: boolean,\r
  pauseOnHover: boolean\r
) => {\r
  const rafRef = useRef<number | null>(null);\r
  const lastTimestampRef = useRef<number | null>(null);\r
  const offsetRef = useRef(0);\r
  const velocityRef = useRef(0);\r
\r
  useEffect(() => {\r
    const track = trackRef.current;\r
    if (!track) return;\r
\r
    const prefersReduced =\r
      typeof window !== 'undefined' &&\r
      window.matchMedia &&\r
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;\r
\r
    if (seqWidth > 0) {\r
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;\r
      track.style.transform = \`translate3d(\${-offsetRef.current}px, 0, 0)\`;\r
    }\r
\r
    if (prefersReduced) {\r
      track.style.transform = 'translate3d(0, 0, 0)';\r
      return () => {\r
        lastTimestampRef.current = null;\r
      };\r
    }\r
\r
    const animate = (timestamp: number) => {\r
      if (lastTimestampRef.current === null) {\r
        lastTimestampRef.current = timestamp;\r
      }\r
\r
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;\r
      lastTimestampRef.current = timestamp;\r
\r
      const target = pauseOnHover && isHovered ? 0 : targetVelocity;\r
\r
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);\r
      velocityRef.current += (target - velocityRef.current) * easingFactor;\r
\r
      if (seqWidth > 0) {\r
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;\r
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;\r
        offsetRef.current = nextOffset;\r
\r
        const translateX = -offsetRef.current;\r
        track.style.transform = \`translate3d(\${translateX}px, 0, 0)\`;\r
      }\r
\r
      rafRef.current = requestAnimationFrame(animate);\r
    };\r
\r
    rafRef.current = requestAnimationFrame(animate);\r
\r
    return () => {\r
      if (rafRef.current !== null) {\r
        cancelAnimationFrame(rafRef.current);\r
        rafRef.current = null;\r
      }\r
      lastTimestampRef.current = null;\r
    };\r
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover]);\r
};\r
\r
export const LogoLoop = React.memo<LogoLoopProps>(\r
  ({\r
    logos,\r
    speed = 120,\r
    direction = 'left',\r
    width = '100%',\r
    logoHeight = 28,\r
    gap = 32,\r
    pauseOnHover = true,\r
    fadeOut = false,\r
    fadeOutColor,\r
    scaleOnHover = false,\r
    ariaLabel = 'Partner logos',\r
    className,\r
    style\r
  }) => {\r
    const containerRef = useRef<HTMLDivElement>(null);\r
    const trackRef = useRef<HTMLDivElement>(null);\r
    const seqRef = useRef<HTMLUListElement>(null);\r
\r
    const [seqWidth, setSeqWidth] = useState<number>(0);\r
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);\r
    const [isHovered, setIsHovered] = useState<boolean>(false);\r
\r
    const targetVelocity = useMemo(() => {\r
      const magnitude = Math.abs(speed);\r
      const directionMultiplier = direction === 'left' ? 1 : -1;\r
      const speedMultiplier = speed < 0 ? -1 : 1;\r
      return magnitude * directionMultiplier * speedMultiplier;\r
    }, [speed, direction]);\r
\r
    const updateDimensions = useCallback(() => {\r
      const containerWidth = containerRef.current?.clientWidth ?? 0;\r
      const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;\r
\r
      if (sequenceWidth > 0) {\r
        setSeqWidth(Math.ceil(sequenceWidth));\r
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;\r
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));\r
      }\r
    }, []);\r
\r
    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);\r
\r
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);\r
\r
    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);\r
\r
    const cssVariables = useMemo(\r
      () =>\r
        ({\r
          '--logoloop-gap': \`\${gap}px\`,\r
          '--logoloop-logoHeight': \`\${logoHeight}px\`,\r
          ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })\r
        }) as React.CSSProperties,\r
      [gap, logoHeight, fadeOutColor]\r
    );\r
\r
    const rootClasses = useMemo(\r
      () =>\r
        cx(\r
          'relative overflow-x-hidden group',\r
          '[--logoloop-gap:32px]',\r
          '[--logoloop-logoHeight:28px]',\r
          '[--logoloop-fadeColorAuto:#ffffff]',\r
          'dark:[--logoloop-fadeColorAuto:#0b0b0b]',\r
          scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',\r
          className\r
        ),\r
      [scaleOnHover, className]\r
    );\r
\r
    const handleMouseEnter = useCallback(() => {\r
      if (pauseOnHover) setIsHovered(true);\r
    }, [pauseOnHover]);\r
\r
    const handleMouseLeave = useCallback(() => {\r
      if (pauseOnHover) setIsHovered(false);\r
    }, [pauseOnHover]);\r
\r
    const renderLogoItem = useCallback(\r
      (item: LogoItem, key: React.Key) => {\r
        const isNodeItem = 'node' in item;\r
\r
        const content = isNodeItem ? (\r
          <span\r
            className={cx(\r
              'inline-flex items-center',\r
              'motion-reduce:transition-none',\r
              scaleOnHover &&\r
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'\r
            )}\r
            aria-hidden={!!(item as any).href && !(item as any).ariaLabel}\r
          >\r
            {(item as any).node}\r
          </span>\r
        ) : (\r
          <img\r
            className={cx(\r
              'h-[var(--logoloop-logoHeight)] w-auto block object-contain',\r
              '[-webkit-user-drag:none] pointer-events-none',\r
              '[image-rendering:-webkit-optimize-contrast]',\r
              'motion-reduce:transition-none',\r
              scaleOnHover &&\r
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'\r
            )}\r
            src={(item as any).src}\r
            srcSet={(item as any).srcSet}\r
            sizes={(item as any).sizes}\r
            width={(item as any).width}\r
            height={(item as any).height}\r
            alt={(item as any).alt ?? ''}\r
            title={(item as any).title}\r
            loading="lazy"\r
            decoding="async"\r
            draggable={false}\r
          />\r
        );\r
\r
        const itemAriaLabel = isNodeItem\r
          ? ((item as any).ariaLabel ?? (item as any).title)\r
          : ((item as any).alt ?? (item as any).title);\r
\r
        const inner = (item as any).href ? (\r
          <a\r
            className={cx(\r
              'inline-flex items-center no-underline rounded',\r
              'transition-opacity duration-200 ease-linear',\r
              'hover:opacity-80',\r
              'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'\r
            )}\r
            href={(item as any).href}\r
            aria-label={itemAriaLabel || 'logo link'}\r
            target="_blank"\r
            rel="noreferrer noopener"\r
          >\r
            {content}\r
          </a>\r
        ) : (\r
          content\r
        );\r
\r
        return (\r
          <li\r
            className={cx(\r
              'flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]',\r
              scaleOnHover && 'overflow-visible group/item'\r
            )}\r
            key={key}\r
            role="listitem"\r
          >\r
            {inner}\r
          </li>\r
        );\r
      },\r
      [scaleOnHover]\r
    );\r
\r
    const logoLists = useMemo(\r
      () =>\r
        Array.from({ length: copyCount }, (_, copyIndex) => (\r
          <ul\r
            className="flex items-center"\r
            key={\`copy-\${copyIndex}\`}\r
            role="list"\r
            aria-hidden={copyIndex > 0}\r
            ref={copyIndex === 0 ? seqRef : undefined}\r
          >\r
            {logos.map((item, itemIndex) => renderLogoItem(item, \`\${copyIndex}-\${itemIndex}\`))}\r
          </ul>\r
        )),\r
      [copyCount, logos, renderLogoItem]\r
    );\r
\r
    const containerStyle = useMemo(\r
      (): React.CSSProperties => ({\r
        width: toCssLength(width) ?? '100%',\r
        ...cssVariables,\r
        ...style\r
      }),\r
      [width, cssVariables, style]\r
    );\r
\r
    return (\r
      <div\r
        ref={containerRef}\r
        className={rootClasses}\r
        style={containerStyle}\r
        role="region"\r
        aria-label={ariaLabel}\r
        onMouseEnter={handleMouseEnter}\r
        onMouseLeave={handleMouseLeave}\r
      >\r
        {fadeOut && (\r
          <>\r
            <div\r
              aria-hidden\r
              className={cx(\r
                'pointer-events-none absolute inset-y-0 left-0 z-[1]',\r
                'w-[clamp(24px,8%,120px)]',\r
                'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'\r
              )}\r
            />\r
            <div\r
              aria-hidden\r
              className={cx(\r
                'pointer-events-none absolute inset-y-0 right-0 z-[1]',\r
                'w-[clamp(24px,8%,120px)]',\r
                'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'\r
              )}\r
            />\r
          </>\r
        )}\r
\r
        <div\r
          className={cx('flex w-max will-change-transform select-none', 'motion-reduce:transform-none')}\r
          ref={trackRef}\r
        >\r
          {logoLists}\r
        </div>\r
      </div>\r
    );\r
  }\r
);\r
\r
LogoLoop.displayName = 'LogoLoop';\r
\r
export default LogoLoop;\r
`,oe={usage:`import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

function App() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}`,code:Q,css:ee,tailwind:re,tsCode:ne,tsTailwind:te},N={SMOOTH_TAU:.25,MIN_COPIES:2,COPY_HEADROOM:2},ae=e=>typeof e=="number"?`${e}px`:e??void 0,se=(e,s,i)=>{n.useEffect(()=>{if(!window.ResizeObserver){const t=()=>e();return window.addEventListener("resize",t),e(),()=>window.removeEventListener("resize",t)}const u=s.map(t=>{if(!t.current)return null;const a=new ResizeObserver(e);return a.observe(t.current),a});return e(),()=>{u.forEach(t=>t==null?void 0:t.disconnect())}},i)},ie=(e,s,i)=>{n.useEffect(()=>{var l;const u=((l=e.current)==null?void 0:l.querySelectorAll("img"))??[];if(u.length===0){s();return}let t=u.length;const a=()=>{t-=1,t===0&&s()};return u.forEach(c=>{const m=c;m.complete?a():(m.addEventListener("load",a,{once:!0}),m.addEventListener("error",a,{once:!0}))}),()=>{u.forEach(c=>{c.removeEventListener("load",a),c.removeEventListener("error",a)})}},i)},le=(e,s,i,u,t)=>{const a=n.useRef(null),l=n.useRef(null),c=n.useRef(0),m=n.useRef(0);n.useEffect(()=>{const b=e.current;if(!b)return;i>0&&(c.current=(c.current%i+i)%i,b.style.transform=`translate3d(${-c.current}px, 0, 0)`);const y=R=>{l.current===null&&(l.current=R);const L=Math.max(0,R-l.current)/1e3;l.current=R;const O=t&&u?0:s,I=1-Math.exp(-L/N.SMOOTH_TAU);if(m.current+=(O-m.current)*I,i>0){let g=c.current+m.current*L;g=(g%i+i)%i,c.current=g;const x=-c.current;b.style.transform=`translate3d(${x}px, 0, 0)`}a.current=requestAnimationFrame(y)};return a.current=requestAnimationFrame(y),()=>{a.current!==null&&(cancelAnimationFrame(a.current),a.current=null),l.current=null}},[s,i,u,t,e])},q=n.memo(({logos:e,speed:s=120,direction:i="left",width:u="100%",logoHeight:t=28,gap:a=32,pauseOnHover:l=!0,fadeOut:c=!1,fadeOutColor:m,scaleOnHover:b=!1,ariaLabel:y="Partner logos",className:R,style:L})=>{const O=n.useRef(null),I=n.useRef(null),g=n.useRef(null),[x,d]=n.useState(0),[k,T]=n.useState(N.MIN_COPIES),[z,_]=n.useState(!1),W=n.useMemo(()=>{const o=Math.abs(s),f=i==="left"?1:-1,h=s<0?-1:1;return o*f*h},[s,i]),S=n.useCallback(()=>{var h,v,C,M;const o=((h=O.current)==null?void 0:h.clientWidth)??0,f=((M=(C=(v=g.current)==null?void 0:v.getBoundingClientRect)==null?void 0:C.call(v))==null?void 0:M.width)??0;if(f>0){d(Math.ceil(f));const $=Math.ceil(o/f)+N.COPY_HEADROOM;T(Math.max(N.MIN_COPIES,$))}},[]);se(S,[O,g],[e,a,t]),ie(g,S,[e,a,t]),le(I,W,x,z,l);const A=n.useMemo(()=>({"--logoloop-gap":`${a}px`,"--logoloop-logoHeight":`${t}px`,...m&&{"--logoloop-fadeColor":m}}),[a,t,m]),j=n.useMemo(()=>["logoloop",c&&"logoloop--fade",b&&"logoloop--scale-hover",R].filter(Boolean).join(" "),[c,b,R]),P=n.useCallback(()=>{l&&_(!0)},[l]),F=n.useCallback(()=>{l&&_(!1)},[l]),E=n.useCallback((o,f)=>{const h="node"in o,v=h?r.jsx("span",{className:"logoloop__node","aria-hidden":!!o.href&&!o.ariaLabel,children:o.node}):r.jsx("img",{src:o.src,srcSet:o.srcSet,sizes:o.sizes,width:o.width,height:o.height,alt:o.alt??"",title:o.title,loading:"lazy",decoding:"async",draggable:!1}),C=h?o.ariaLabel??o.title:o.alt??o.title,M=o.href?r.jsx("a",{className:"logoloop__link",href:o.href,"aria-label":C||"logo link",target:"_blank",rel:"noreferrer noopener",children:v}):v;return r.jsx("li",{className:"logoloop__item",role:"listitem",children:M},f)},[]),V=n.useMemo(()=>Array.from({length:k},(o,f)=>r.jsx("ul",{className:"logoloop__list",role:"list","aria-hidden":f>0,ref:f===0?g:void 0,children:e.map((h,v)=>E(h,`${f}-${v}`))},`copy-${f}`)),[k,e,E]),D=n.useMemo(()=>({width:ae(u)??"100%",...A,...L}),[u,A,L]);return r.jsx("div",{ref:O,className:j,style:D,role:"region","aria-label":y,onMouseEnter:P,onMouseLeave:F,children:r.jsx("div",{className:"logoloop__track",ref:I,children:V})})});q.displayName="LogoLoop";function ce(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"},child:[]}]})(e)}function de(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"},child:[]}]})(e)}function ue(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"},child:[]}]})(e)}function me(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z"},child:[]}]})(e)}function fe(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"},child:[]}]})(e)}function ge(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"},child:[]}]})(e)}function pe(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"},child:[]}]})(e)}function he(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"},child:[]}]})(e)}function ve(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"},child:[]}]})(e)}function be(e){return p({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M24 22.525H0l12-21.05 12 21.05z"},child:[]}]})(e)}const Re=[{node:r.jsx(fe,{}),title:"React",href:"https://react.dev"},{node:r.jsx(ue,{}),title:"Next.js",href:"https://nextjs.org"},{node:r.jsx(ve,{}),title:"TypeScript",href:"https://www.typescriptlang.org"},{node:r.jsx(he,{}),title:"Tailwind CSS",href:"https://tailwindcss.com"},{node:r.jsx(be,{}),title:"Vercel",href:"https://vercel.com"},{node:r.jsx(de,{}),title:"GitHub",href:"https://github.com"},{node:r.jsx(ce,{}),title:"Docker",href:"https://www.docker.com"},{node:r.jsx(me,{}),title:"Prisma",href:"https://www.prisma.io"},{node:r.jsx(pe,{}),title:"Supabase",href:"https://supabase.com"},{node:r.jsx(ge,{}),title:"Stripe",href:"https://stripe.com"}],He=()=>{const[e,s]=J(),[i,u]=n.useState(100),[t,a]=n.useState(60),[l,c]=n.useState(60),[m,b]=n.useState(!0),[y,R]=n.useState(!0),[L,O]=n.useState(!0),[I,g]=n.useState("left"),x=[{name:"logos",type:"LogoItem[]",default:"required",description:"Array of logo items to display. Each item can be either a React node or an image src."},{name:"speed",type:"number",default:"120",description:"Animation speed in pixels per second. Positive values move based on direction, negative values reverse direction."},{name:"direction",type:"'left' | 'right'",default:"'left'",description:"Direction of the logo animation loop."},{name:"width",type:"number | string",default:"'100%'",description:"Width of the logo loop container."},{name:"logoHeight",type:"number",default:"28",description:"Height of the logos in pixels."},{name:"gap",type:"number",default:"32",description:"Gap between logos in pixels."},{name:"pauseOnHover",type:"boolean",default:"true",description:"Whether to pause the animation when hovering over the component."},{name:"fadeOut",type:"boolean",default:"false",description:"Whether to apply fade-out effect at the edges of the container."},{name:"fadeOutColor",type:"string",default:"undefined",description:"Color used for the fade-out effect. Only applies when fadeOut is true."},{name:"scaleOnHover",type:"boolean",default:"false",description:"Whether to scale logos on hover."},{name:"ariaLabel",type:"string",default:"'Partner logos'",description:"Accessibility label for the logo loop component."},{name:"className",type:"string",default:"undefined",description:"Additional CSS class names to apply to the root element."},{name:"style",type:"React.CSSProperties",default:"undefined",description:"Inline styles to apply to the root element."}];return r.jsxs(B,{children:[r.jsxs(U,{children:[r.jsx(G,{position:"relative",className:"demo-container",h:500,p:0,overflow:"hidden",children:r.jsx(q,{logos:Re,width:"100%",logoHeight:t,gap:l,speed:i,direction:I,scaleOnHover:L,pauseOnHover:m,fadeOut:y,fadeOutColor:"#060010",ariaLabel:"Our tech stack"},e)}),r.jsxs(K,{children:[r.jsx(w,{title:"Speed",min:0,max:300,step:10,value:i,valueUnit:"px/s",onChange:d=>{u(d),s()}}),r.jsx(w,{title:"Logo Height",min:20,max:120,step:5,value:t,valueUnit:"px",onChange:d=>{a(d),s()}}),r.jsx(w,{title:"Gap",min:10,max:120,step:5,value:l,valueUnit:"px",onChange:d=>{c(d),s()}}),r.jsx(H,{title:"Direction",isChecked:I==="right",onChange:d=>{g(d?"right":"left"),s()},checkedLabel:"Right",uncheckedLabel:"Left"}),r.jsx(H,{title:"Pause on Hover",isChecked:m,onChange:d=>{b(d),s()}}),r.jsx(H,{title:"Fade Out",isChecked:y,onChange:d=>{R(d),s()}}),r.jsx(H,{title:"Scale on Hover",isChecked:L,onChange:d=>{O(d),s()}})]}),r.jsx(Y,{data:x})]}),r.jsx(X,{children:r.jsx(Z,{codeObject:oe})})]})};export{He as default};
