import{r,j as e,B as o,F as _,T as b,I as U}from"./index-wsKSLPNH.js";import{T as Q,P as Y,a as X,C as J,b as K}from"./PropTable-C4uPWs8h.js";import{g as Z,h as ee}from"./index-Bpz4cGEA.js";import{L as re}from"./lenis-CYo8HTSz.js";import{C as te}from"./Customize-1m_ZNqR9.js";import{P as ne}from"./PreviewSelect-B8u33nUa.js";import{P as l}from"./PreviewSlider-m1G_aiYP.js";import{l as se}from"./react-bits-logo-small-CT1j6F_f.js";import{L as ie}from"./LiquidEther-Ds8mxeAV.js";import"./field-bd7p2HAb.js";import"./three.module-0PRdiASR.js";const ae=`import { useEffect, useRef, useId } from 'react';\r
import './GlassSurface.css';\r
\r
const GlassSurface = ({\r
  children,\r
  width = 200,\r
  height = 80,\r
  borderRadius = 20,\r
  borderWidth = 0.07,\r
  brightness = 50,\r
  opacity = 0.93,\r
  blur = 11,\r
  displace = 0,\r
  backgroundOpacity = 0,\r
  saturation = 1,\r
  distortionScale = -180,\r
  redOffset = 0,\r
  greenOffset = 10,\r
  blueOffset = 20,\r
  xChannel = 'R',\r
  yChannel = 'G',\r
  mixBlendMode = 'difference',\r
  className = '',\r
  style = {}\r
}) => {\r
  const uniqueId = useId().replace(/:/g, '-');\r
  const filterId = \`glass-filter-\${uniqueId}\`;\r
  const redGradId = \`red-grad-\${uniqueId}\`;\r
  const blueGradId = \`blue-grad-\${uniqueId}\`;\r
\r
  const containerRef = useRef(null);\r
  const feImageRef = useRef(null);\r
  const redChannelRef = useRef(null);\r
  const greenChannelRef = useRef(null);\r
  const blueChannelRef = useRef(null);\r
  const gaussianBlurRef = useRef(null);\r
\r
  const generateDisplacementMap = () => {\r
    const rect = containerRef.current?.getBoundingClientRect();\r
    const actualWidth = rect?.width || 400;\r
    const actualHeight = rect?.height || 200;\r
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);\r
\r
    const svgContent = \`\r
      <svg viewBox="0 0 \${actualWidth} \${actualHeight}" xmlns="http://www.w3.org/2000/svg">\r
        <defs>\r
          <linearGradient id="\${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">\r
            <stop offset="0%" stop-color="#0000"/>\r
            <stop offset="100%" stop-color="red"/>\r
          </linearGradient>\r
          <linearGradient id="\${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">\r
            <stop offset="0%" stop-color="#0000"/>\r
            <stop offset="100%" stop-color="blue"/>\r
          </linearGradient>\r
        </defs>\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" fill="black"></rect>\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" rx="\${borderRadius}" fill="url(#\${redGradId})" />\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" rx="\${borderRadius}" fill="url(#\${blueGradId})" style="mix-blend-mode: \${mixBlendMode}" />\r
        <rect x="\${edgeSize}" y="\${edgeSize}" width="\${actualWidth - edgeSize * 2}" height="\${actualHeight - edgeSize * 2}" rx="\${borderRadius}" fill="hsl(0 0% \${brightness}% / \${opacity})" style="filter:blur(\${blur}px)" />\r
      </svg>\r
    \`;\r
\r
    return \`data:image/svg+xml,\${encodeURIComponent(svgContent)}\`;\r
  };\r
\r
  const updateDisplacementMap = () => {\r
    feImageRef.current?.setAttribute('href', generateDisplacementMap());\r
  };\r
\r
  useEffect(() => {\r
    updateDisplacementMap();\r
    [\r
      { ref: redChannelRef, offset: redOffset },\r
      { ref: greenChannelRef, offset: greenOffset },\r
      { ref: blueChannelRef, offset: blueOffset }\r
    ].forEach(({ ref, offset }) => {\r
      if (ref.current) {\r
        ref.current.setAttribute('scale', (distortionScale + offset).toString());\r
        ref.current.setAttribute('xChannelSelector', xChannel);\r
        ref.current.setAttribute('yChannelSelector', yChannel);\r
      }\r
    });\r
\r
    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    width,\r
    height,\r
    borderRadius,\r
    borderWidth,\r
    brightness,\r
    opacity,\r
    blur,\r
    displace,\r
    distortionScale,\r
    redOffset,\r
    greenOffset,\r
    blueOffset,\r
    xChannel,\r
    yChannel,\r
    mixBlendMode\r
  ]);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      setTimeout(updateDisplacementMap, 0);\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
\r
    return () => {\r
      resizeObserver.disconnect();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      setTimeout(updateDisplacementMap, 0);\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
\r
    return () => {\r
      resizeObserver.disconnect();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  useEffect(() => {\r
    setTimeout(updateDisplacementMap, 0);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [width, height]);\r
\r
  const supportsSVGFilters = () => {\r
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);\r
    const isFirefox = /Firefox/.test(navigator.userAgent);\r
\r
    if (isWebkit || isFirefox) {\r
      return false;\r
    }\r
\r
    const div = document.createElement('div');\r
    div.style.backdropFilter = \`url(#\${filterId})\`;\r
    return div.style.backdropFilter !== '';\r
  };\r
\r
  const containerStyle = {\r
    ...style,\r
    width: typeof width === 'number' ? \`\${width}px\` : width,\r
    height: typeof height === 'number' ? \`\${height}px\` : height,\r
    borderRadius: \`\${borderRadius}px\`,\r
    '--glass-frost': backgroundOpacity,\r
    '--glass-saturation': saturation,\r
    '--filter-id': \`url(#\${filterId})\`\r
  };\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`glass-surface \${supportsSVGFilters() ? 'glass-surface--svg' : 'glass-surface--fallback'} \${className}\`}\r
      style={containerStyle}\r
    >\r
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">\r
        <defs>\r
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">\r
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />\r
\r
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />\r
            <feColorMatrix\r
              in="dispRed"\r
              type="matrix"\r
              values="1 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0"\r
              result="red"\r
            />\r
\r
            <feDisplacementMap\r
              ref={greenChannelRef}\r
              in="SourceGraphic"\r
              in2="map"\r
              id="greenchannel"\r
              result="dispGreen"\r
            />\r
            <feColorMatrix\r
              in="dispGreen"\r
              type="matrix"\r
              values="0 0 0 0 0\r
                      0 1 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0"\r
              result="green"\r
            />\r
\r
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />\r
            <feColorMatrix\r
              in="dispBlue"\r
              type="matrix"\r
              values="0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 1 0 0\r
                      0 0 0 1 0"\r
              result="blue"\r
            />\r
\r
            <feBlend in="red" in2="green" mode="screen" result="rg" />\r
            <feBlend in="rg" in2="blue" mode="screen" result="output" />\r
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="glass-surface__content">{children}</div>\r
    </div>\r
  );\r
};\r
\r
export default GlassSurface;\r
`,le=`.glass-surface {\r
  position: relative;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  overflow: hidden;\r
  transition: opacity 0.26s ease-out;\r
}\r
\r
.glass-surface__filter {\r
  width: 100%;\r
  height: 100%;\r
  pointer-events: none;\r
  position: absolute;\r
  inset: 0;\r
  opacity: 0;\r
  z-index: -1;\r
}\r
\r
.glass-surface__content {\r
  width: 100%;\r
  height: 100%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0.5rem;\r
  border-radius: inherit;\r
  position: relative;\r
  z-index: 1;\r
}\r
\r
.glass-surface--svg {\r
  background: light-dark(hsl(0 0% 100% / var(--glass-frost, 0)), hsl(0 0% 0% / var(--glass-frost, 0)));\r
  backdrop-filter: var(--filter-id, url(#glass-filter)) saturate(var(--glass-saturation, 1));\r
  box-shadow:\r
    0 0 2px 1px light-dark(color-mix(in oklch, black, transparent 85%), color-mix(in oklch, white, transparent 65%))\r
      inset,\r
    0 0 10px 4px light-dark(color-mix(in oklch, black, transparent 90%), color-mix(in oklch, white, transparent 85%))\r
      inset,\r
    0px 4px 16px rgba(17, 17, 26, 0.05),\r
    0px 8px 24px rgba(17, 17, 26, 0.05),\r
    0px 16px 56px rgba(17, 17, 26, 0.05),\r
    0px 4px 16px rgba(17, 17, 26, 0.05) inset,\r
    0px 8px 24px rgba(17, 17, 26, 0.05) inset,\r
    0px 16px 56px rgba(17, 17, 26, 0.05) inset;\r
}\r
\r
.glass-surface--fallback {\r
  background: rgba(255, 255, 255, 0.25);\r
  backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);\r
  -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);\r
  border: 1px solid rgba(255, 255, 255, 0.3);\r
  box-shadow:\r
    0 8px 32px 0 rgba(31, 38, 135, 0.2),\r
    0 2px 16px 0 rgba(31, 38, 135, 0.1),\r
    inset 0 1px 0 0 rgba(255, 255, 255, 0.4),\r
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.2);\r
}\r
\r
@media (prefers-color-scheme: dark) {\r
  .glass-surface--fallback {\r
    background: rgba(255, 255, 255, 0.1);\r
    backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);\r
    -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);\r
    border: 1px solid rgba(255, 255, 255, 0.2);\r
    box-shadow:\r
      inset 0 1px 0 0 rgba(255, 255, 255, 0.2),\r
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);\r
  }\r
}\r
\r
@supports not (backdrop-filter: blur(10px)) {\r
  .glass-surface--fallback {\r
    background: rgba(255, 255, 255, 0.4);\r
    box-shadow:\r
      inset 0 1px 0 0 rgba(255, 255, 255, 0.5),\r
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);\r
  }\r
\r
  .glass-surface--fallback::before {\r
    content: '';\r
    position: absolute;\r
    inset: 0;\r
    background: rgba(255, 255, 255, 0.15);\r
    border-radius: inherit;\r
    z-index: -1;\r
  }\r
}\r
\r
@supports not (backdrop-filter: blur(10px)) {\r
  @media (prefers-color-scheme: dark) {\r
    .glass-surface--fallback {\r
      background: rgba(0, 0, 0, 0.4);\r
    }\r
\r
    .glass-surface--fallback::before {\r
      background: rgba(255, 255, 255, 0.05);\r
    }\r
  }\r
}\r
\r
.glass-surface:focus-visible {\r
  outline: 2px solid light-dark(#007aff, #0a84ff);\r
  outline-offset: 2px;\r
}\r
`,oe=`import { useEffect, useRef, useState, useId } from 'react';\r
\r
const useDarkMode = () => {\r
  const [isDark, setIsDark] = useState(false);\r
\r
  useEffect(() => {\r
    if (typeof window === 'undefined') return;\r
\r
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');\r
    setIsDark(mediaQuery.matches);\r
\r
    const handler = e => setIsDark(e.matches);\r
    mediaQuery.addEventListener('change', handler);\r
    return () => mediaQuery.removeEventListener('change', handler);\r
  }, []);\r
\r
  return isDark;\r
};\r
\r
const GlassSurface = ({\r
  children,\r
  width = 200,\r
  height = 80,\r
  borderRadius = 20,\r
  borderWidth = 0.07,\r
  brightness = 50,\r
  opacity = 0.93,\r
  blur = 11,\r
  displace = 0,\r
  backgroundOpacity = 0,\r
  saturation = 1,\r
  distortionScale = -180,\r
  redOffset = 0,\r
  greenOffset = 10,\r
  blueOffset = 20,\r
  xChannel = 'R',\r
  yChannel = 'G',\r
  mixBlendMode = 'difference',\r
  className = '',\r
  style = {}\r
}) => {\r
  const uniqueId = useId().replace(/:/g, '-');\r
  const filterId = \`glass-filter-\${uniqueId}\`;\r
  const redGradId = \`red-grad-\${uniqueId}\`;\r
  const blueGradId = \`blue-grad-\${uniqueId}\`;\r
\r
  const containerRef = useRef < HTMLDivElement > null;\r
  const feImageRef = useRef < SVGFEImageElement > null;\r
  const redChannelRef = useRef < SVGFEDisplacementMapElement > null;\r
  const greenChannelRef = useRef < SVGFEDisplacementMapElement > null;\r
  const blueChannelRef = useRef < SVGFEDisplacementMapElement > null;\r
  const gaussianBlurRef = useRef < SVGFEGaussianBlurElement > null;\r
\r
  const isDarkMode = useDarkMode();\r
\r
  const generateDisplacementMap = () => {\r
    const rect = containerRef.current?.getBoundingClientRect();\r
    const actualWidth = rect?.width || 400;\r
    const actualHeight = rect?.height || 200;\r
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);\r
\r
    const svgContent = \`\r
      <svg viewBox="0 0 \${actualWidth} \${actualHeight}" xmlns="http://www.w3.org/2000/svg">\r
        <defs>\r
          <linearGradient id="\${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">\r
            <stop offset="0%" stop-color="#0000"/>\r
            <stop offset="100%" stop-color="red"/>\r
          </linearGradient>\r
          <linearGradient id="\${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">\r
            <stop offset="0%" stop-color="#0000"/>\r
            <stop offset="100%" stop-color="blue"/>\r
          </linearGradient>\r
        </defs>\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" fill="black"></rect>\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" rx="\${borderRadius}" fill="url(#\${redGradId})" />\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" rx="\${borderRadius}" fill="url(#\${blueGradId})" style="mix-blend-mode: \${mixBlendMode}" />\r
        <rect x="\${edgeSize}" y="\${edgeSize}" width="\${actualWidth - edgeSize * 2}" height="\${actualHeight - edgeSize * 2}" rx="\${borderRadius}" fill="hsl(0 0% \${brightness}% / \${opacity})" style="filter:blur(\${blur}px)" />\r
      </svg>\r
    \`;\r
\r
    return \`data:image/svg+xml,\${encodeURIComponent(svgContent)}\`;\r
  };\r
\r
  const updateDisplacementMap = () => {\r
    feImageRef.current?.setAttribute('href', generateDisplacementMap());\r
  };\r
\r
  useEffect(() => {\r
    updateDisplacementMap();\r
    [\r
      { ref: redChannelRef, offset: redOffset },\r
      { ref: greenChannelRef, offset: greenOffset },\r
      { ref: blueChannelRef, offset: blueOffset }\r
    ].forEach(({ ref, offset }) => {\r
      if (ref.current) {\r
        ref.current.setAttribute('scale', (distortionScale + offset).toString());\r
        ref.current.setAttribute('xChannelSelector', xChannel);\r
        ref.current.setAttribute('yChannelSelector', yChannel);\r
      }\r
    });\r
\r
    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    width,\r
    height,\r
    borderRadius,\r
    borderWidth,\r
    brightness,\r
    opacity,\r
    blur,\r
    displace,\r
    distortionScale,\r
    redOffset,\r
    greenOffset,\r
    blueOffset,\r
    xChannel,\r
    yChannel,\r
    mixBlendMode\r
  ]);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      setTimeout(updateDisplacementMap, 0);\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
\r
    return () => {\r
      resizeObserver.disconnect();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      setTimeout(updateDisplacementMap, 0);\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
\r
    return () => {\r
      resizeObserver.disconnect();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  useEffect(() => {\r
    setTimeout(updateDisplacementMap, 0);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [width, height]);\r
\r
  const supportsSVGFilters = () => {\r
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);\r
    const isFirefox = /Firefox/.test(navigator.userAgent);\r
\r
    if (isWebkit || isFirefox) {\r
      return false;\r
    }\r
\r
    const div = document.createElement('div');\r
    div.style.backdropFilter = \`url(#\${filterId})\`;\r
    return div.style.backdropFilter !== '';\r
  };\r
\r
  const supportsBackdropFilter = () => {\r
    if (typeof window === 'undefined') return false;\r
    return CSS.supports('backdrop-filter', 'blur(10px)');\r
  };\r
\r
  const getContainerStyles = () => {\r
    const baseStyles = {\r
      ...style,\r
      width: typeof width === 'number' ? \`\${width}px\` : width,\r
      height: typeof height === 'number' ? \`\${height}px\` : height,\r
      borderRadius: \`\${borderRadius}px\`,\r
      '--glass-frost': backgroundOpacity,\r
      '--glass-saturation': saturation\r
    };\r
\r
    const svgSupported = supportsSVGFilters();\r
    const backdropFilterSupported = supportsBackdropFilter();\r
\r
    if (svgSupported) {\r
      return {\r
        ...baseStyles,\r
        background: isDarkMode ? \`hsl(0 0% 0% / \${backgroundOpacity})\` : \`hsl(0 0% 100% / \${backgroundOpacity})\`,\r
        backdropFilter: \`url(#\${filterId}) saturate(\${saturation})\`,\r
        boxShadow: isDarkMode\r
          ? \`0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,\r
             0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,\r
             0px 4px 16px rgba(17, 17, 26, 0.05),\r
             0px 8px 24px rgba(17, 17, 26, 0.05),\r
             0px 16px 56px rgba(17, 17, 26, 0.05),\r
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,\r
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,\r
             0px 16px 56px rgba(17, 17, 26, 0.05) inset\`\r
          : \`0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,\r
             0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,\r
             0px 4px 16px rgba(17, 17, 26, 0.05),\r
             0px 8px 24px rgba(17, 17, 26, 0.05),\r
             0px 16px 56px rgba(17, 17, 26, 0.05),\r
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,\r
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,\r
             0px 16px 56px rgba(17, 17, 26, 0.05) inset\`\r
      };\r
    } else {\r
      if (isDarkMode) {\r
        if (!backdropFilterSupported) {\r
          return {\r
            ...baseStyles,\r
            background: 'rgba(0, 0, 0, 0.4)',\r
            border: '1px solid rgba(255, 255, 255, 0.2)',\r
            boxShadow: \`inset 0 1px 0 0 rgba(255, 255, 255, 0.2),\r
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)\`\r
          };\r
        } else {\r
          return {\r
            ...baseStyles,\r
            background: 'rgba(255, 255, 255, 0.1)',\r
            backdropFilter: 'blur(12px) saturate(1.8) brightness(1.2)',\r
            WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.2)',\r
            border: '1px solid rgba(255, 255, 255, 0.2)',\r
            boxShadow: \`inset 0 1px 0 0 rgba(255, 255, 255, 0.2),\r
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)\`\r
          };\r
        }\r
      } else {\r
        if (!backdropFilterSupported) {\r
          return {\r
            ...baseStyles,\r
            background: 'rgba(255, 255, 255, 0.4)',\r
            border: '1px solid rgba(255, 255, 255, 0.3)',\r
            boxShadow: \`inset 0 1px 0 0 rgba(255, 255, 255, 0.5),\r
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)\`\r
          };\r
        } else {\r
          return {\r
            ...baseStyles,\r
            background: 'rgba(255, 255, 255, 0.25)',\r
            backdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',\r
            WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',\r
            border: '1px solid rgba(255, 255, 255, 0.3)',\r
            boxShadow: \`0 8px 32px 0 rgba(31, 38, 135, 0.2),\r
                        0 2px 16px 0 rgba(31, 38, 135, 0.1),\r
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.4),\r
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)\`\r
          };\r
        }\r
      }\r
    }\r
  };\r
\r
  const glassSurfaceClasses =\r
    'relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out';\r
\r
  const focusVisibleClasses = isDarkMode\r
    ? 'focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2'\r
    : 'focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2';\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`\${glassSurfaceClasses} \${focusVisibleClasses} \${className}\`}\r
      style={getContainerStyles()}\r
    >\r
      <svg\r
        className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"\r
        xmlns="http://www.w3.org/2000/svg"\r
      >\r
        <defs>\r
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">\r
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />\r
\r
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />\r
            <feColorMatrix\r
              in="dispRed"\r
              type="matrix"\r
              values="1 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0"\r
              result="red"\r
            />\r
\r
            <feDisplacementMap\r
              ref={greenChannelRef}\r
              in="SourceGraphic"\r
              in2="map"\r
              id="greenchannel"\r
              result="dispGreen"\r
            />\r
            <feColorMatrix\r
              in="dispGreen"\r
              type="matrix"\r
              values="0 0 0 0 0\r
                      0 1 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0"\r
              result="green"\r
            />\r
\r
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />\r
            <feColorMatrix\r
              in="dispBlue"\r
              type="matrix"\r
              values="0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 1 0 0\r
                      0 0 0 1 0"\r
              result="blue"\r
            />\r
\r
            <feBlend in="red" in2="green" mode="screen" result="rg" />\r
            <feBlend in="rg" in2="blue" mode="screen" result="output" />\r
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default GlassSurface;\r
`,ce=`import React, { useEffect, useRef, useId } from 'react';\r
import './GlassSurface.css';\r
\r
export interface GlassSurfaceProps {\r
  children?: React.ReactNode;\r
  width?: number | string;\r
  height?: number | string;\r
  borderRadius?: number;\r
  borderWidth?: number;\r
  brightness?: number;\r
  opacity?: number;\r
  blur?: number;\r
  displace?: number;\r
  backgroundOpacity?: number;\r
  saturation?: number;\r
  distortionScale?: number;\r
  redOffset?: number;\r
  greenOffset?: number;\r
  blueOffset?: number;\r
  xChannel?: 'R' | 'G' | 'B';\r
  yChannel?: 'R' | 'G' | 'B';\r
  mixBlendMode?:\r
    | 'normal'\r
    | 'multiply'\r
    | 'screen'\r
    | 'overlay'\r
    | 'darken'\r
    | 'lighten'\r
    | 'color-dodge'\r
    | 'color-burn'\r
    | 'hard-light'\r
    | 'soft-light'\r
    | 'difference'\r
    | 'exclusion'\r
    | 'hue'\r
    | 'saturation'\r
    | 'color'\r
    | 'luminosity'\r
    | 'plus-darker'\r
    | 'plus-lighter';\r
  className?: string;\r
  style?: React.CSSProperties;\r
}\r
\r
const GlassSurface: React.FC<GlassSurfaceProps> = ({\r
  children,\r
  width = 200,\r
  height = 80,\r
  borderRadius = 20,\r
  borderWidth = 0.07,\r
  brightness = 50,\r
  opacity = 0.93,\r
  blur = 11,\r
  displace = 0,\r
  backgroundOpacity = 0,\r
  saturation = 1,\r
  distortionScale = -180,\r
  redOffset = 0,\r
  greenOffset = 10,\r
  blueOffset = 20,\r
  xChannel = 'R',\r
  yChannel = 'G',\r
  mixBlendMode = 'difference',\r
  className = '',\r
  style = {}\r
}) => {\r
  const id = useId();\r
  const filterId = \`glass-filter-\${id}\`;\r
  const redGradId = \`red-grad-\${id}\`;\r
  const blueGradId = \`blue-grad-\${id}\`;\r
\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const feImageRef = useRef<SVGFEImageElement>(null);\r
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);\r
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);\r
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);\r
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);\r
\r
  const generateDisplacementMap = () => {\r
    const rect = containerRef.current?.getBoundingClientRect();\r
    const actualWidth = rect?.width || 400;\r
    const actualHeight = rect?.height || 200;\r
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);\r
\r
    const svgContent = \`\r
      <svg viewBox="0 0 \${actualWidth} \${actualHeight}" xmlns="http://www.w3.org/2000/svg">\r
        <defs>\r
          <linearGradient id="\${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">\r
            <stop offset="0%" stop-color="#0000"/>\r
            <stop offset="100%" stop-color="red"/>\r
          </linearGradient>\r
          <linearGradient id="\${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">\r
            <stop offset="0%" stop-color="#0000"/>\r
            <stop offset="100%" stop-color="blue"/>\r
          </linearGradient>\r
        </defs>\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" fill="black"></rect>\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" rx="\${borderRadius}" fill="url(#\${redGradId})" />\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" rx="\${borderRadius}" fill="url(#\${blueGradId})" style="mix-blend-mode: \${mixBlendMode}" />\r
        <rect x="\${edgeSize}" y="\${edgeSize}" width="\${actualWidth - edgeSize * 2}" height="\${actualHeight - edgeSize * 2}" rx="\${borderRadius}" fill="hsl(0 0% \${brightness}% / \${opacity})" style="filter:blur(\${blur}px)" />\r
      </svg>\r
    \`;\r
\r
    return \`data:image/svg+xml,\${encodeURIComponent(svgContent)}\`;\r
  };\r
\r
  const updateDisplacementMap = () => {\r
    feImageRef.current?.setAttribute('href', generateDisplacementMap());\r
  };\r
\r
  useEffect(() => {\r
    updateDisplacementMap();\r
    [\r
      { ref: redChannelRef, offset: redOffset },\r
      { ref: greenChannelRef, offset: greenOffset },\r
      { ref: blueChannelRef, offset: blueOffset }\r
    ].forEach(({ ref, offset }) => {\r
      if (ref.current) {\r
        ref.current.setAttribute('scale', (distortionScale + offset).toString());\r
        ref.current.setAttribute('xChannelSelector', xChannel);\r
        ref.current.setAttribute('yChannelSelector', yChannel);\r
      }\r
    });\r
\r
    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());\r
  }, [\r
    width,\r
    height,\r
    borderRadius,\r
    borderWidth,\r
    brightness,\r
    opacity,\r
    blur,\r
    displace,\r
    distortionScale,\r
    redOffset,\r
    greenOffset,\r
    blueOffset,\r
    xChannel,\r
    yChannel,\r
    mixBlendMode\r
  ]);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      setTimeout(updateDisplacementMap, 0);\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
\r
    return () => {\r
      resizeObserver.disconnect();\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      setTimeout(updateDisplacementMap, 0);\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
\r
    return () => {\r
      resizeObserver.disconnect();\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    setTimeout(updateDisplacementMap, 0);\r
  }, [width, height]);\r
\r
  const supportsSVGFilters = () => {\r
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);\r
    const isFirefox = /Firefox/.test(navigator.userAgent);\r
\r
    if (isWebkit || isFirefox) {\r
      return false;\r
    }\r
\r
    const div = document.createElement('div');\r
    div.style.backdropFilter = \`url(#\${filterId})\`;\r
    return div.style.backdropFilter !== '';\r
  };\r
\r
  const containerStyle: React.CSSProperties = {\r
    ...style,\r
    width: typeof width === 'number' ? \`\${width}px\` : width,\r
    height: typeof height === 'number' ? \`\${height}px\` : height,\r
    borderRadius: \`\${borderRadius}px\`,\r
    '--glass-frost': backgroundOpacity,\r
    '--glass-saturation': saturation,\r
    '--filter-id': \`url(#\${filterId})\`\r
  } as React.CSSProperties;\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`glass-surface \${supportsSVGFilters() ? 'glass-surface--svg' : 'glass-surface--fallback'} \${className}\`}\r
      style={containerStyle}\r
    >\r
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">\r
        <defs>\r
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">\r
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />\r
\r
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />\r
            <feColorMatrix\r
              in="dispRed"\r
              type="matrix"\r
              values="1 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0"\r
              result="red"\r
            />\r
\r
            <feDisplacementMap\r
              ref={greenChannelRef}\r
              in="SourceGraphic"\r
              in2="map"\r
              id="greenchannel"\r
              result="dispGreen"\r
            />\r
            <feColorMatrix\r
              in="dispGreen"\r
              type="matrix"\r
              values="0 0 0 0 0\r
                      0 1 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0"\r
              result="green"\r
            />\r
\r
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />\r
            <feColorMatrix\r
              in="dispBlue"\r
              type="matrix"\r
              values="0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 1 0 0\r
                      0 0 0 1 0"\r
              result="blue"\r
            />\r
\r
            <feBlend in="red" in2="green" mode="screen" result="rg" />\r
            <feBlend in="rg" in2="blue" mode="screen" result="output" />\r
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="glass-surface__content">{children}</div>\r
    </div>\r
  );\r
};\r
\r
export default GlassSurface;\r
`,ue=`import React, { useEffect, useRef, useState, useId } from 'react';\r
\r
export interface GlassSurfaceProps {\r
  children?: React.ReactNode;\r
  width?: number | string;\r
  height?: number | string;\r
  borderRadius?: number;\r
  borderWidth?: number;\r
  brightness?: number;\r
  opacity?: number;\r
  blur?: number;\r
  displace?: number;\r
  backgroundOpacity?: number;\r
  saturation?: number;\r
  distortionScale?: number;\r
  redOffset?: number;\r
  greenOffset?: number;\r
  blueOffset?: number;\r
  xChannel?: 'R' | 'G' | 'B';\r
  yChannel?: 'R' | 'G' | 'B';\r
  mixBlendMode?:\r
    | 'normal'\r
    | 'multiply'\r
    | 'screen'\r
    | 'overlay'\r
    | 'darken'\r
    | 'lighten'\r
    | 'color-dodge'\r
    | 'color-burn'\r
    | 'hard-light'\r
    | 'soft-light'\r
    | 'difference'\r
    | 'exclusion'\r
    | 'hue'\r
    | 'saturation'\r
    | 'color'\r
    | 'luminosity'\r
    | 'plus-darker'\r
    | 'plus-lighter';\r
  className?: string;\r
  style?: React.CSSProperties;\r
}\r
\r
const useDarkMode = () => {\r
  const [isDark, setIsDark] = useState(false);\r
\r
  useEffect(() => {\r
    if (typeof window === 'undefined') return;\r
\r
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');\r
    setIsDark(mediaQuery.matches);\r
\r
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);\r
    mediaQuery.addEventListener('change', handler);\r
    return () => mediaQuery.removeEventListener('change', handler);\r
  }, []);\r
\r
  return isDark;\r
};\r
\r
const GlassSurface: React.FC<GlassSurfaceProps> = ({\r
  children,\r
  width = 200,\r
  height = 80,\r
  borderRadius = 20,\r
  borderWidth = 0.07,\r
  brightness = 50,\r
  opacity = 0.93,\r
  blur = 11,\r
  displace = 0,\r
  backgroundOpacity = 0,\r
  saturation = 1,\r
  distortionScale = -180,\r
  redOffset = 0,\r
  greenOffset = 10,\r
  blueOffset = 20,\r
  xChannel = 'R',\r
  yChannel = 'G',\r
  mixBlendMode = 'difference',\r
  className = '',\r
  style = {}\r
}) => {\r
  const uniqueId = useId().replace(/:/g, '-');\r
  const filterId = \`glass-filter-\${uniqueId}\`;\r
  const redGradId = \`red-grad-\${uniqueId}\`;\r
  const blueGradId = \`blue-grad-\${uniqueId}\`;\r
\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const feImageRef = useRef<SVGFEImageElement>(null);\r
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);\r
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);\r
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);\r
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);\r
\r
  const isDarkMode = useDarkMode();\r
\r
  const generateDisplacementMap = () => {\r
    const rect = containerRef.current?.getBoundingClientRect();\r
    const actualWidth = rect?.width || 400;\r
    const actualHeight = rect?.height || 200;\r
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);\r
\r
    const svgContent = \`\r
      <svg viewBox="0 0 \${actualWidth} \${actualHeight}" xmlns="http://www.w3.org/2000/svg">\r
        <defs>\r
          <linearGradient id="\${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">\r
            <stop offset="0%" stop-color="#0000"/>\r
            <stop offset="100%" stop-color="red"/>\r
          </linearGradient>\r
          <linearGradient id="\${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">\r
            <stop offset="0%" stop-color="#0000"/>\r
            <stop offset="100%" stop-color="blue"/>\r
          </linearGradient>\r
        </defs>\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" fill="black"></rect>\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" rx="\${borderRadius}" fill="url(#\${redGradId})" />\r
        <rect x="0" y="0" width="\${actualWidth}" height="\${actualHeight}" rx="\${borderRadius}" fill="url(#\${blueGradId})" style="mix-blend-mode: \${mixBlendMode}" />\r
        <rect x="\${edgeSize}" y="\${edgeSize}" width="\${actualWidth - edgeSize * 2}" height="\${actualHeight - edgeSize * 2}" rx="\${borderRadius}" fill="hsl(0 0% \${brightness}% / \${opacity})" style="filter:blur(\${blur}px)" />\r
      </svg>\r
    \`;\r
\r
    return \`data:image/svg+xml,\${encodeURIComponent(svgContent)}\`;\r
  };\r
\r
  const updateDisplacementMap = () => {\r
    feImageRef.current?.setAttribute('href', generateDisplacementMap());\r
  };\r
\r
  useEffect(() => {\r
    updateDisplacementMap();\r
    [\r
      { ref: redChannelRef, offset: redOffset },\r
      { ref: greenChannelRef, offset: greenOffset },\r
      { ref: blueChannelRef, offset: blueOffset }\r
    ].forEach(({ ref, offset }) => {\r
      if (ref.current) {\r
        ref.current.setAttribute('scale', (distortionScale + offset).toString());\r
        ref.current.setAttribute('xChannelSelector', xChannel);\r
        ref.current.setAttribute('yChannelSelector', yChannel);\r
      }\r
    });\r
\r
    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());\r
  }, [\r
    width,\r
    height,\r
    borderRadius,\r
    borderWidth,\r
    brightness,\r
    opacity,\r
    blur,\r
    displace,\r
    distortionScale,\r
    redOffset,\r
    greenOffset,\r
    blueOffset,\r
    xChannel,\r
    yChannel,\r
    mixBlendMode\r
  ]);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      setTimeout(updateDisplacementMap, 0);\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
\r
    return () => {\r
      resizeObserver.disconnect();\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      setTimeout(updateDisplacementMap, 0);\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
\r
    return () => {\r
      resizeObserver.disconnect();\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    setTimeout(updateDisplacementMap, 0);\r
  }, [width, height]);\r
\r
  const supportsSVGFilters = () => {\r
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);\r
    const isFirefox = /Firefox/.test(navigator.userAgent);\r
\r
    if (isWebkit || isFirefox) {\r
      return false;\r
    }\r
\r
    const div = document.createElement('div');\r
    div.style.backdropFilter = \`url(#\${filterId})\`;\r
    return div.style.backdropFilter !== '';\r
  };\r
\r
  const supportsBackdropFilter = () => {\r
    if (typeof window === 'undefined') return false;\r
    return CSS.supports('backdrop-filter', 'blur(10px)');\r
  };\r
\r
  const getContainerStyles = (): React.CSSProperties => {\r
    const baseStyles: React.CSSProperties = {\r
      ...style,\r
      width: typeof width === 'number' ? \`\${width}px\` : width,\r
      height: typeof height === 'number' ? \`\${height}px\` : height,\r
      borderRadius: \`\${borderRadius}px\`,\r
      '--glass-frost': backgroundOpacity,\r
      '--glass-saturation': saturation\r
    } as React.CSSProperties;\r
\r
    const svgSupported = supportsSVGFilters();\r
    const backdropFilterSupported = supportsBackdropFilter();\r
\r
    if (svgSupported) {\r
      return {\r
        ...baseStyles,\r
        background: isDarkMode ? \`hsl(0 0% 0% / \${backgroundOpacity})\` : \`hsl(0 0% 100% / \${backgroundOpacity})\`,\r
        backdropFilter: \`url(#\${filterId}) saturate(\${saturation})\`,\r
        boxShadow: isDarkMode\r
          ? \`0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,\r
             0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,\r
             0px 4px 16px rgba(17, 17, 26, 0.05),\r
             0px 8px 24px rgba(17, 17, 26, 0.05),\r
             0px 16px 56px rgba(17, 17, 26, 0.05),\r
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,\r
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,\r
             0px 16px 56px rgba(17, 17, 26, 0.05) inset\`\r
          : \`0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,\r
             0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,\r
             0px 4px 16px rgba(17, 17, 26, 0.05),\r
             0px 8px 24px rgba(17, 17, 26, 0.05),\r
             0px 16px 56px rgba(17, 17, 26, 0.05),\r
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,\r
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,\r
             0px 16px 56px rgba(17, 17, 26, 0.05) inset\`\r
      };\r
    } else {\r
      if (isDarkMode) {\r
        if (!backdropFilterSupported) {\r
          return {\r
            ...baseStyles,\r
            background: 'rgba(0, 0, 0, 0.4)',\r
            border: '1px solid rgba(255, 255, 255, 0.2)',\r
            boxShadow: \`inset 0 1px 0 0 rgba(255, 255, 255, 0.2),\r
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)\`\r
          };\r
        } else {\r
          return {\r
            ...baseStyles,\r
            background: 'rgba(255, 255, 255, 0.1)',\r
            backdropFilter: 'blur(12px) saturate(1.8) brightness(1.2)',\r
            WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.2)',\r
            border: '1px solid rgba(255, 255, 255, 0.2)',\r
            boxShadow: \`inset 0 1px 0 0 rgba(255, 255, 255, 0.2),\r
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)\`\r
          };\r
        }\r
      } else {\r
        if (!backdropFilterSupported) {\r
          return {\r
            ...baseStyles,\r
            background: 'rgba(255, 255, 255, 0.4)',\r
            border: '1px solid rgba(255, 255, 255, 0.3)',\r
            boxShadow: \`inset 0 1px 0 0 rgba(255, 255, 255, 0.5),\r
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)\`\r
          };\r
        } else {\r
          return {\r
            ...baseStyles,\r
            background: 'rgba(255, 255, 255, 0.25)',\r
            backdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',\r
            WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',\r
            border: '1px solid rgba(255, 255, 255, 0.3)',\r
            boxShadow: \`0 8px 32px 0 rgba(31, 38, 135, 0.2),\r
                        0 2px 16px 0 rgba(31, 38, 135, 0.1),\r
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.4),\r
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)\`\r
          };\r
        }\r
      }\r
    }\r
  };\r
\r
  const glassSurfaceClasses =\r
    'relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out';\r
\r
  const focusVisibleClasses = isDarkMode\r
    ? 'focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2'\r
    : 'focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2';\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`\${glassSurfaceClasses} \${focusVisibleClasses} \${className}\`}\r
      style={getContainerStyles()}\r
    >\r
      <svg\r
        className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"\r
        xmlns="http://www.w3.org/2000/svg"\r
      >\r
        <defs>\r
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">\r
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />\r
\r
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />\r
            <feColorMatrix\r
              in="dispRed"\r
              type="matrix"\r
              values="1 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0"\r
              result="red"\r
            />\r
\r
            <feDisplacementMap\r
              ref={greenChannelRef}\r
              in="SourceGraphic"\r
              in2="map"\r
              id="greenchannel"\r
              result="dispGreen"\r
            />\r
            <feColorMatrix\r
              in="dispGreen"\r
              type="matrix"\r
              values="0 0 0 0 0\r
                      0 1 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0"\r
              result="green"\r
            />\r
\r
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />\r
            <feColorMatrix\r
              in="dispBlue"\r
              type="matrix"\r
              values="0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 1 0 0\r
                      0 0 0 1 0"\r
              result="blue"\r
            />\r
\r
            <feBlend in="red" in2="green" mode="screen" result="rg" />\r
            <feBlend in="rg" in2="blue" mode="screen" result="output" />\r
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default GlassSurface;\r
`,de={usage:`import GlassSurface from './GlassSurface'

// Basic usage
<GlassSurface 
  width={300} 
  height={200}
  borderRadius={24}
  className="my-custom-class"
>
  <h2>Glass Surface Content</h2>
</GlassSurface>

// Custom displacement effects
<GlassSurface
  displace={15}
  distortionScale={-150}
  redOffset={5}
  greenOffset={15}
  blueOffset={25}
  brightness={60}
  opacity={0.8}
  mixBlendMode="screen"
>
  <span>Advanced Glass Distortion</span>
</GlassSurface>`,code:ae,css:le,tailwind:oe,tsCode:ce,tsTailwind:ue},N=({children:d,width:f=200,height:u=80,borderRadius:a=20,borderWidth:x=.07,brightness:M=50,opacity:m=.93,blur:I=11,displace:v=0,backgroundOpacity:T=0,saturation:B=1,distortionScale:O=-180,redOffset:y=0,greenOffset:D=10,blueOffset:R=20,xChannel:F="R",yChannel:S="G",mixBlendMode:E="difference",className:j="",style:V={}})=>{const g=r.useId().replace(/:/g,"-"),w=`glass-filter-${g}`,$=`red-grad-${g}`,z=`blue-grad-${g}`,c=r.useRef(null),W=r.useRef(null),k=r.useRef(null),A=r.useRef(null),H=r.useRef(null),p=r.useRef(null),P=()=>{var L;const t=(L=c.current)==null?void 0:L.getBoundingClientRect(),n=(t==null?void 0:t.width)||400,i=(t==null?void 0:t.height)||200,h=Math.min(n,i)*(x*.5),G=`
      <svg viewBox="0 0 ${n} ${i}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${$}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${z}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${n}" height="${i}" fill="black"></rect>
        <rect x="0" y="0" width="${n}" height="${i}" rx="${a}" fill="url(#${$})" />
        <rect x="0" y="0" width="${n}" height="${i}" rx="${a}" fill="url(#${z})" style="mix-blend-mode: ${E}" />
        <rect x="${h}" y="${h}" width="${n-h*2}" height="${i-h*2}" rx="${a}" fill="hsl(0 0% ${M}% / ${m})" style="filter:blur(${I}px)" />
      </svg>
    `;return`data:image/svg+xml,${encodeURIComponent(G)}`},s=()=>{var t;(t=W.current)==null||t.setAttribute("href",P())};r.useEffect(()=>{var t;s(),[{ref:k,offset:y},{ref:A,offset:D},{ref:H,offset:R}].forEach(({ref:n,offset:i})=>{n.current&&(n.current.setAttribute("scale",(O+i).toString()),n.current.setAttribute("xChannelSelector",F),n.current.setAttribute("yChannelSelector",S))}),(t=p.current)==null||t.setAttribute("stdDeviation",v.toString())},[f,u,a,x,M,m,I,v,O,y,D,R,F,S,E]),r.useEffect(()=>{if(!c.current)return;const t=new ResizeObserver(()=>{setTimeout(s,0)});return t.observe(c.current),()=>{t.disconnect()}},[]),r.useEffect(()=>{if(!c.current)return;const t=new ResizeObserver(()=>{setTimeout(s,0)});return t.observe(c.current),()=>{t.disconnect()}},[]),r.useEffect(()=>{setTimeout(s,0)},[f,u]);const C=()=>{const t=/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent),n=/Firefox/.test(navigator.userAgent);if(t||n)return!1;const i=document.createElement("div");return i.style.backdropFilter=`url(#${w})`,i.style.backdropFilter!==""},q={...V,width:typeof f=="number"?`${f}px`:f,height:typeof u=="number"?`${u}px`:u,borderRadius:`${a}px`,"--glass-frost":T,"--glass-saturation":B,"--filter-id":`url(#${w})`};return e.jsxs("div",{ref:c,className:`glass-surface ${C()?"glass-surface--svg":"glass-surface--fallback"} ${j}`,style:q,children:[e.jsx("svg",{className:"glass-surface__filter",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("defs",{children:e.jsxs("filter",{id:w,colorInterpolationFilters:"sRGB",x:"0%",y:"0%",width:"100%",height:"100%",children:[e.jsx("feImage",{ref:W,x:"0",y:"0",width:"100%",height:"100%",preserveAspectRatio:"none",result:"map"}),e.jsx("feDisplacementMap",{ref:k,in:"SourceGraphic",in2:"map",id:"redchannel",result:"dispRed"}),e.jsx("feColorMatrix",{in:"dispRed",type:"matrix",values:`1 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0`,result:"red"}),e.jsx("feDisplacementMap",{ref:A,in:"SourceGraphic",in2:"map",id:"greenchannel",result:"dispGreen"}),e.jsx("feColorMatrix",{in:"dispGreen",type:"matrix",values:`0 0 0 0 0\r
                      0 1 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0`,result:"green"}),e.jsx("feDisplacementMap",{ref:H,in:"SourceGraphic",in2:"map",id:"bluechannel",result:"dispBlue"}),e.jsx("feColorMatrix",{in:"dispBlue",type:"matrix",values:`0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 1 0 0\r
                      0 0 0 1 0`,result:"blue"}),e.jsx("feBlend",{in:"red",in2:"green",mode:"screen",result:"rg"}),e.jsx("feBlend",{in:"rg",in2:"blue",mode:"screen",result:"output"}),e.jsx("feGaussianBlur",{ref:p,in:"output",stdDeviation:"0.7"})]})})}),e.jsx("div",{className:"glass-surface__content",children:d})]})},we=()=>{const[d,f]=r.useState("scroll"),u=r.useRef(null),a=r.useRef(null),[x,M]=r.useState(50),[m,I]=r.useState(.07),[v,T]=r.useState(50),[B,O]=r.useState(.93),[y,D]=r.useState(11),[R,F]=r.useState(.5),[S,E]=r.useState(.1),[j,V]=r.useState(1),[g,w]=r.useState(-180),[$,z]=r.useState(0),[c,W]=r.useState(10),[k,A]=r.useState(20),H=[{value:"scroll",label:"Scroll"},{value:"landingPage",label:"Landing Page"}],p={borderRadius:x,borderWidth:m,brightness:v,opacity:B,blur:y,backgroundOpacity:S,saturation:j,distortionScale:g,redOffset:$,greenOffset:c,blueOffset:k,displace:R},P=[{name:"children",type:"React.ReactNode",default:"undefined",description:"Content to display inside the glass surface"},{name:"width",type:"number | string",default:"200",description:"Width of the glass surface (pixels or CSS value like '100%')"},{name:"height",type:"number | string",default:"80",description:"Height of the glass surface (pixels or CSS value like '100vh')"},{name:"borderRadius",type:"number",default:"20",description:"Border radius in pixels"},{name:"borderWidth",type:"number",default:"0.07",description:"Border width factor for displacement map"},{name:"brightness",type:"number",default:"50",description:"Brightness percentage for displacement map"},{name:"opacity",type:"number",default:"0.93",description:"Opacity of displacement map elements"},{name:"blur",type:"number",default:"11",description:"Input blur amount in pixels"},{name:"displace",type:"number",default:"0",description:"Output blur (stdDeviation)"},{name:"backgroundOpacity",type:"number",default:"0",description:"Background frost opacity (0-1)"},{name:"saturation",type:"number",default:"1",description:"Backdrop filter saturation factor"},{name:"distortionScale",type:"number",default:"-180",description:"Main displacement scale"},{name:"redOffset",type:"number",default:"0",description:"Red channel extra displacement offset"},{name:"greenOffset",type:"number",default:"10",description:"Green channel extra displacement offset"},{name:"blueOffset",type:"number",default:"20",description:"Blue channel extra displacement offset"},{name:"xChannel",type:"'R' | 'G' | 'B'",default:"'R'",description:"X displacement channel selector"},{name:"yChannel",type:"'R' | 'G' | 'B'",default:"'G'",description:"Y displacement channel selector"},{name:"mixBlendMode",type:"BlendMode",default:"'difference'",description:"Mix blend mode for displacement map"},{name:"className",type:"string",default:"''",description:"Additional CSS class names"},{name:"style",type:"React.CSSProperties",default:"{}",description:"Inline styles object"}];return r.useEffect(()=>{const s=u.current;if(!s)return;a.current&&(a.current.destroy(),a.current=null);const C=typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0),q=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(C||q){s.style.overflowY="auto",s.style.webkitOverflowScrolling="touch";return}else s.style.overflowY="hidden";if(d!=="scroll")return;let n;const i=new re({wrapper:s,content:s.firstElementChild,duration:2,easing:G=>Math.min(1,1.001-Math.pow(2,-10*G)),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!0,smoothTouch:!1,wheelMultiplier:1,touchMultiplier:1.5,infinite:!1,lerp:.1});a.current=i;const h=G=>{i.raf(G),n=requestAnimationFrame(h)};return n=requestAnimationFrame(h),()=>{n&&cancelAnimationFrame(n),a.current&&(a.current.destroy(),a.current=null)}},[d]),e.jsxs(Q,{children:[e.jsxs(Y,{children:[e.jsxs(o,{ref:u,position:"relative",className:"demo-container",h:600,p:0,css:{overflow:"hidden"},children:[d==="scroll"&&e.jsxs(e.Fragment,{children:[e.jsx(N,{width:360,height:100,...p,style:{position:"sticky",top:"50%",transform:"translateY(-50%)",zIndex:10}}),e.jsxs(_,{gap:16,alignItems:"center",direction:"column",position:"absolute",top:0,left:0,right:0,children:[e.jsx(b,{position:"absolute",left:"50%",textAlign:"center",whiteSpace:"nowrap",top:"3em",transform:"translate(-50%, -50%)",fontSize:"2.6rem",fontWeight:900,zIndex:0,color:"#271E37",children:"Try scrolling."}),e.jsx(o,{height:"240px",width:"100%"}),[{src:"https://images.unsplash.com/photo-1500673587002-1d2548cfba1b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",text:"The Summer Of Glass"},{src:"https://images.unsplash.com/photo-1594576547505-1be67997401e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",text:"Can Hold Any Content"},{src:"https://images.unsplash.com/photo-1543127172-4b33cb699e35?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",text:"Has Built-In Fallback"}].map((s,C)=>e.jsxs(o,{position:"relative",children:[e.jsx(U,{w:"500px",borderRadius:"20px",objectFit:"cover",src:s.src,filter:"grayscale(100%)"}),e.jsx(b,{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",color:"white",fontWeight:900,textAlign:"center",lineHeight:"100%",fontSize:"3rem",minW:"300px",zIndex:5,mixBlendMode:"overlay",children:s.text})]},C)),e.jsx(o,{height:"240px",width:"100%"})]})]}),d==="landingPage"&&e.jsxs(e.Fragment,{children:[e.jsx(o,{w:"100%",h:"100%",position:"absolute",top:0,left:0,zIndex:0,children:e.jsx(ie,{isBounce:!0})}),e.jsx(o,{position:"absolute",top:"2em",left:0,width:"100%",height:"60px",zIndex:0,pointerEvents:"none",children:e.jsxs(N,{className:"custom-glass-surface",width:"90%",height:60,...p,children:[e.jsx("img",{src:se,alt:"React Bits Logo",style:{height:"24px",borderRadius:"50px"}}),e.jsx(o,{display:{base:"flex",md:"none"},alignItems:"center",color:"white",children:e.jsx(Z,{size:20})}),e.jsxs(o,{display:{base:"none",md:"flex"},alignItems:"center",gap:6,fontWeight:600,children:[e.jsx(b,{color:"white",fontSize:"14px",display:"flex",alignItems:"center",children:"Home"}),e.jsx(b,{color:"white",fontSize:"14px",display:"flex",alignItems:"center",children:"Docs"})]})]})}),e.jsxs(o,{position:"absolute",top:0,left:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",width:"100%",height:"100%",zIndex:1,pointerEvents:"none",children:[e.jsxs(N,{height:40,width:160,...p,children:[e.jsx(ee,{}),e.jsx(b,{ml:1,children:"Super Shiny"})]}),e.jsx(b,{textShadow:"0 0 16px rgba(0, 0, 0, 0.5)",mt:4,color:"white",fontSize:"clamp(2rem, 4vw, 2.6rem)",lineHeight:"1.2",textAlign:"center",letterSpacing:"-2px",maxWidth:"18ch",fontWeight:"bold",children:"The summer of glass, thanks a lot Apple!"}),e.jsxs(o,{display:"flex",gap:4,mt:8,alignItems:"center",children:[e.jsx(o,{as:"button",px:10,py:3,bg:"white",color:"black",borderRadius:"50px",fontSize:"14px",fontWeight:"500",border:"none",cursor:"pointer",_hover:{bg:"gray.100",transform:"translateY(-1px)"},transition:"all 0.2s ease",children:"Get Started"}),e.jsx(N,{height:44.98,width:154.31,borderRadius:100,...p,children:"Learn More"})]})]})]})]}),e.jsxs(te,{children:[e.jsx(ne,{title:"Example",options:H,value:d,onChange:f,width:160}),e.jsx(l,{title:"Border Radius",min:0,max:50,step:1,value:x,valueUnit:"px",onChange:M}),e.jsx(l,{title:"Background Opacity",min:0,max:1,step:.01,value:S,onChange:E}),e.jsx(l,{title:"Saturation",min:0,max:3,step:.1,value:j,onChange:V}),e.jsx(l,{title:"Border Width",min:0,max:.2,step:.01,value:m,onChange:I}),e.jsx(l,{title:"Brightness",min:0,max:100,step:1,value:v,valueUnit:"%",onChange:T}),e.jsx(l,{title:"Opacity",min:0,max:1,step:.01,value:B,onChange:O}),e.jsx(l,{title:"Blur",min:0,max:30,step:1,value:y,valueUnit:"px",onChange:D}),e.jsx(l,{title:"Displace",min:0,max:5,step:.1,value:R,onChange:F}),e.jsx(l,{title:"Distortion Scale",min:-300,max:300,step:10,value:g,onChange:w}),e.jsx(l,{title:"Red Offset",min:-50,max:50,step:1,value:$,onChange:z}),e.jsx(l,{title:"Green Offset",min:-50,max:50,step:1,value:c,onChange:W}),e.jsx(l,{title:"Blue Offset",min:-50,max:50,step:1,value:k,onChange:A})]}),e.jsx(X,{data:P})]}),e.jsx(J,{children:e.jsx(K,{codeObject:de})})]})};export{we as default};
