import{_ as wt,e as Hi,r as Ge,j as ye,B as Wi,F as Zi,T as $n,I as ji}from"./index-wsKSLPNH.js";import{L as Yi}from"./lenis-CYo8HTSz.js";import{T as Ji,P as Xi,a as Ki,C as Qi,b as eu}from"./PropTable-C4uPWs8h.js";import{C as ru}from"./Customize-1m_ZNqR9.js";import{P as Un}from"./PreviewSelect-B8u33nUa.js";import{P as nu}from"./PreviewSwitch-DqnF708j.js";import{D as tu}from"./Dependencies-BHoMfJUj.js";import{P as dn}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const iu=`import React, { useEffect, useRef, useState, useMemo } from 'react';\r
import * as math from 'mathjs';\r
\r
import './GradualBlur.css';\r
\r
const DEFAULT_CONFIG = {\r
  position: 'bottom',\r
  strength: 2,\r
  height: '6rem',\r
  divCount: 5,\r
  exponential: false,\r
  zIndex: 1000,\r
  animated: false,\r
  duration: '0.3s',\r
  easing: 'ease-out',\r
  opacity: 1,\r
  curve: 'linear',\r
  responsive: false,\r
  target: 'parent',\r
  className: '',\r
  style: {}\r
};\r
\r
const PRESETS = {\r
  top: { position: 'top', height: '6rem' },\r
  bottom: { position: 'bottom', height: '6rem' },\r
  left: { position: 'left', height: '6rem' },\r
  right: { position: 'right', height: '6rem' },\r
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },\r
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },\r
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },\r
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },\r
  header: { position: 'top', height: '8rem', curve: 'ease-out' },\r
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },\r
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },\r
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },\r
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }\r
};\r
\r
const CURVE_FUNCTIONS = {\r
  linear: p => p,\r
  bezier: p => p * p * (3 - 2 * p),\r
  'ease-in': p => p * p,\r
  'ease-out': p => 1 - Math.pow(1 - p, 2),\r
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)\r
};\r
\r
const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {});\r
const getGradientDirection = position =>\r
  ({\r
    top: 'to top',\r
    bottom: 'to bottom',\r
    left: 'to left',\r
    right: 'to right'\r
  })[position] || 'to bottom';\r
\r
const debounce = (fn, wait) => {\r
  let t;\r
  return (...a) => {\r
    clearTimeout(t);\r
    t = setTimeout(() => fn(...a), wait);\r
  };\r
};\r
\r
const useResponsiveDimension = (responsive, config, key) => {\r
  const [value, setValue] = useState(config[key]);\r
  useEffect(() => {\r
    if (!responsive) return;\r
    const calc = () => {\r
      const w = window.innerWidth;\r
      let v = config[key];\r
      if (w <= 480 && config[\`mobile\${key[0].toUpperCase() + key.slice(1)}\`])\r
        v = config[\`mobile\${key[0].toUpperCase() + key.slice(1)}\`];\r
      else if (w <= 768 && config[\`tablet\${key[0].toUpperCase() + key.slice(1)}\`])\r
        v = config[\`tablet\${key[0].toUpperCase() + key.slice(1)}\`];\r
      else if (w <= 1024 && config[\`desktop\${key[0].toUpperCase() + key.slice(1)}\`])\r
        v = config[\`desktop\${key[0].toUpperCase() + key.slice(1)}\`];\r
      setValue(v);\r
    };\r
    const debounced = debounce(calc, 100);\r
    calc();\r
    window.addEventListener('resize', debounced);\r
    return () => window.removeEventListener('resize', debounced);\r
  }, [responsive, config, key]);\r
  return responsive ? value : config[key];\r
};\r
\r
const useIntersectionObserver = (ref, shouldObserve = false) => {\r
  const [isVisible, setIsVisible] = useState(!shouldObserve);\r
\r
  useEffect(() => {\r
    if (!shouldObserve || !ref.current) return;\r
\r
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });\r
\r
    observer.observe(ref.current);\r
    return () => observer.disconnect();\r
  }, [ref, shouldObserve]);\r
\r
  return isVisible;\r
};\r
\r
function GradualBlur(props) {\r
  const containerRef = useRef(null);\r
  const [isHovered, setIsHovered] = useState(false);\r
\r
  const config = useMemo(() => {\r
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};\r
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props);\r
  }, [props]);\r
\r
  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');\r
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');\r
\r
  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');\r
\r
  const blurDivs = useMemo(() => {\r
    const divs = [];\r
    const increment = 100 / config.divCount;\r
    const currentStrength =\r
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;\r
\r
    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;\r
\r
    for (let i = 1; i <= config.divCount; i++) {\r
      let progress = i / config.divCount;\r
      progress = curveFunc(progress);\r
\r
      let blurValue;\r
      if (config.exponential) {\r
        blurValue = math.pow(2, progress * 4) * 0.0625 * currentStrength;\r
      } else {\r
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;\r
      }\r
\r
      const p1 = math.round((increment * i - increment) * 10) / 10;\r
      const p2 = math.round(increment * i * 10) / 10;\r
      const p3 = math.round((increment * i + increment) * 10) / 10;\r
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;\r
\r
      let gradient = \`transparent \${p1}%, black \${p2}%\`;\r
      if (p3 <= 100) gradient += \`, black \${p3}%\`;\r
      if (p4 <= 100) gradient += \`, transparent \${p4}%\`;\r
\r
      const direction = getGradientDirection(config.position);\r
\r
      const divStyle = {\r
        position: 'absolute',\r
        inset: '0',\r
        maskImage: \`linear-gradient(\${direction}, \${gradient})\`,\r
        WebkitMaskImage: \`linear-gradient(\${direction}, \${gradient})\`,\r
        backdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,\r
        WebkitBackdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,\r
        opacity: config.opacity,\r
        transition:\r
          config.animated && config.animated !== 'scroll'\r
            ? \`backdrop-filter \${config.duration} \${config.easing}\`\r
            : undefined\r
      };\r
\r
      divs.push(<div key={i} style={divStyle} />);\r
    }\r
\r
    return divs;\r
  }, [config, isHovered]);\r
\r
  const containerStyle = useMemo(() => {\r
    const isVertical = ['top', 'bottom'].includes(config.position);\r
    const isHorizontal = ['left', 'right'].includes(config.position);\r
    const isPageTarget = config.target === 'page';\r
\r
    const baseStyle = {\r
      position: isPageTarget ? 'fixed' : 'absolute',\r
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',\r
      opacity: isVisible ? 1 : 0,\r
      transition: config.animated ? \`opacity \${config.duration} \${config.easing}\` : undefined,\r
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,\r
      ...config.style\r
    };\r
\r
    if (isVertical) {\r
      baseStyle.height = responsiveHeight;\r
      baseStyle.width = responsiveWidth || '100%';\r
      baseStyle[config.position] = 0;\r
      baseStyle.left = 0;\r
      baseStyle.right = 0;\r
    } else if (isHorizontal) {\r
      baseStyle.width = responsiveWidth || responsiveHeight;\r
      baseStyle.height = '100%';\r
      baseStyle[config.position] = 0;\r
      baseStyle.top = 0;\r
      baseStyle.bottom = 0;\r
    }\r
\r
    return baseStyle;\r
  }, [config, responsiveHeight, responsiveWidth, isVisible]);\r
\r
  const { hoverIntensity, animated, onAnimationComplete, duration } = config;\r
\r
  useEffect(() => {\r
    if (isVisible && animated === 'scroll' && onAnimationComplete) {\r
      const ms = parseFloat(duration) * 1000;\r
      const t = setTimeout(() => onAnimationComplete(), ms);\r
      return () => clearTimeout(t);\r
    }\r
  }, [isVisible, animated, onAnimationComplete, duration]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`gradual-blur \${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} \${config.className}\`}\r
      style={containerStyle}\r
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}\r
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}\r
    >\r
      <div\r
        className="gradual-blur-inner"\r
        style={{\r
          position: 'relative',\r
          width: '100%',\r
          height: '100%'\r
        }}\r
      >\r
        {blurDivs}\r
      </div>\r
    </div>\r
  );\r
}\r
\r
const GradualBlurMemo = React.memo(GradualBlur);\r
GradualBlurMemo.displayName = 'GradualBlur';\r
GradualBlurMemo.PRESETS = PRESETS;\r
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;\r
export default GradualBlurMemo;\r
\r
const injectStyles = () => {\r
  if (typeof document === 'undefined') return;\r
\r
  const styleId = 'gradual-blur-styles';\r
  if (document.getElementById(styleId)) return;\r
\r
  const styleElement = document.createElement('style');\r
  styleElement.id = styleId;\r
  styleElement.textContent = \`\r
  .gradual-blur { pointer-events: none; transition: opacity 0.3s ease-out; }\r
  .gradual-blur-parent { overflow: hidden; }\r
  .gradual-blur-inner { pointer-events: none; }\`;\r
\r
  document.head.appendChild(styleElement);\r
};\r
\r
if (typeof document !== 'undefined') {\r
  injectStyles();\r
}\r
`,uu=`import React, { useEffect, useRef, useState, useMemo } from 'react';\r
import * as math from 'mathjs';\r
\r
const DEFAULT_CONFIG = {\r
  position: 'bottom',\r
  strength: 2,\r
  height: '6rem',\r
  divCount: 5,\r
  exponential: false,\r
  zIndex: 1000,\r
  animated: false,\r
  duration: '0.3s',\r
  easing: 'ease-out',\r
  opacity: 1,\r
  curve: 'linear',\r
  responsive: false,\r
  target: 'parent',\r
  className: '',\r
  style: {}\r
};\r
\r
const PRESETS = {\r
  top: { position: 'top', height: '6rem' },\r
  bottom: { position: 'bottom', height: '6rem' },\r
  left: { position: 'left', height: '6rem' },\r
  right: { position: 'right', height: '6rem' },\r
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },\r
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },\r
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },\r
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },\r
  header: { position: 'top', height: '8rem', curve: 'ease-out' },\r
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },\r
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },\r
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },\r
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }\r
};\r
\r
const CURVE_FUNCTIONS = {\r
  linear: p => p,\r
  bezier: p => p * p * (3 - 2 * p),\r
  'ease-in': p => p * p,\r
  'ease-out': p => 1 - Math.pow(1 - p, 2),\r
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)\r
};\r
\r
const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {});\r
\r
const getGradientDirection = position => {\r
  const directions = {\r
    top: 'to top',\r
    bottom: 'to bottom',\r
    left: 'to left',\r
    right: 'to right'\r
  };\r
  return directions[position] || 'to bottom';\r
};\r
\r
const debounce = (fn, wait) => {\r
  let t;\r
  return (...a) => {\r
    clearTimeout(t);\r
    t = setTimeout(() => fn(...a), wait);\r
  };\r
};\r
\r
const useResponsiveDimension = (responsive, config, key) => {\r
  const [val, setVal] = useState(config[key]);\r
  useEffect(() => {\r
    if (!responsive) return;\r
    const calc = () => {\r
      const w = window.innerWidth;\r
      let v = config[key];\r
      if (w <= 480 && config['mobile' + key[0].toUpperCase() + key.slice(1)])\r
        v = config['mobile' + key[0].toUpperCase() + key.slice(1)];\r
      else if (w <= 768 && config['tablet' + key[0].toUpperCase() + key.slice(1)])\r
        v = config['tablet' + key[0].toUpperCase() + key.slice(1)];\r
      else if (w <= 1024 && config['desktop' + key[0].toUpperCase() + key.slice(1)])\r
        v = config['desktop' + key[0].toUpperCase() + key.slice(1)];\r
      setVal(v);\r
    };\r
    const deb = debounce(calc, 100);\r
    calc();\r
    window.addEventListener('resize', deb);\r
    return () => window.removeEventListener('resize', deb);\r
  }, [responsive, config, key]);\r
  return responsive ? val : config[key];\r
};\r
\r
const useIntersectionObserver = (ref, shouldObserve = false) => {\r
  const [isVisible, setIsVisible] = useState(!shouldObserve);\r
\r
  useEffect(() => {\r
    if (!shouldObserve || !ref.current) return;\r
\r
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });\r
\r
    observer.observe(ref.current);\r
    return () => observer.disconnect();\r
  }, [ref, shouldObserve]);\r
\r
  return isVisible;\r
};\r
\r
const GradualBlur = props => {\r
  const containerRef = useRef(null);\r
  const [isHovered, setIsHovered] = useState(false);\r
\r
  const config = useMemo(() => {\r
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};\r
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props);\r
  }, [props]);\r
\r
  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');\r
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');\r
  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');\r
\r
  const blurDivs = useMemo(() => {\r
    const divs = [];\r
    const increment = 100 / config.divCount;\r
    const currentStrength =\r
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;\r
\r
    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;\r
\r
    for (let i = 1; i <= config.divCount; i++) {\r
      let progress = i / config.divCount;\r
      progress = curveFunc(progress);\r
\r
      let blurValue;\r
      if (config.exponential) {\r
        blurValue = math.pow(2, progress * 4) * 0.0625 * currentStrength;\r
      } else {\r
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;\r
      }\r
      const p1 = math.round((increment * i - increment) * 10) / 10;\r
      const p2 = math.round(increment * i * 10) / 10;\r
      const p3 = math.round((increment * i + increment) * 10) / 10;\r
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;\r
      let gradient = \`transparent \${p1}%, black \${p2}%\`;\r
      if (p3 <= 100) gradient += \`, black \${p3}%\`;\r
      if (p4 <= 100) gradient += \`, transparent \${p4}%\`;\r
\r
      const direction = getGradientDirection(config.position);\r
\r
      const divStyle = {\r
        position: 'absolute',\r
        inset: '0',\r
        maskImage: \`linear-gradient(\${direction}, \${gradient})\`,\r
        WebkitMaskImage: \`linear-gradient(\${direction}, \${gradient})\`,\r
        backdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,\r
        WebkitBackdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,\r
        opacity: config.opacity,\r
        transition:\r
          config.animated && config.animated !== 'scroll'\r
            ? \`backdrop-filter \${config.duration} \${config.easing}\`\r
            : undefined\r
      };\r
\r
      divs.push(<div key={i} style={divStyle} />);\r
    }\r
\r
    return divs;\r
  }, [config, isHovered]);\r
\r
  const containerStyle = useMemo(() => {\r
    const isVertical = ['top', 'bottom'].includes(config.position);\r
    const isHorizontal = ['left', 'right'].includes(config.position);\r
    const isPageTarget = config.target === 'page';\r
\r
    const baseStyle = {\r
      position: isPageTarget ? 'fixed' : 'absolute',\r
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',\r
      opacity: isVisible ? 1 : 0,\r
      transition: config.animated ? \`opacity \${config.duration} \${config.easing}\` : undefined,\r
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,\r
      ...config.style\r
    };\r
\r
    if (isVertical) {\r
      baseStyle.height = responsiveHeight;\r
      baseStyle.width = responsiveWidth || '100%';\r
      baseStyle[config.position] = 0;\r
      baseStyle.left = 0;\r
      baseStyle.right = 0;\r
    } else if (isHorizontal) {\r
      baseStyle.width = responsiveWidth || responsiveHeight;\r
      baseStyle.height = '100%';\r
      baseStyle[config.position] = 0;\r
      baseStyle.top = 0;\r
      baseStyle.bottom = 0;\r
    }\r
\r
    return baseStyle;\r
  }, [config, responsiveHeight, responsiveWidth, isVisible]);\r
\r
  const { hoverIntensity, animated, onAnimationComplete, duration } = config;\r
  useEffect(() => {\r
    if (isVisible && animated === 'scroll' && onAnimationComplete) {\r
      const t = setTimeout(() => onAnimationComplete(), parseFloat(duration) * 1000);\r
      return () => clearTimeout(t);\r
    }\r
  }, [isVisible, animated, onAnimationComplete, duration]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`gradual-blur \${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} \${config.className}\`}\r
      style={containerStyle}\r
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}\r
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}\r
    >\r
      <div className="gradual-blur-inner relative w-full h-full">{blurDivs}</div>\r
    </div>\r
  );\r
};\r
const GradualBlurMemo = React.memo(GradualBlur);\r
GradualBlurMemo.displayName = 'GradualBlur';\r
GradualBlurMemo.PRESETS = PRESETS;\r
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;\r
export default GradualBlurMemo;\r
`,ou=`.gradual-blur-inner {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
}\r
\r
.gradual-blur-inner > div {\r
  -webkit-backdrop-filter: inherit;\r
  backdrop-filter: inherit;\r
}\r
\r
.gradual-blur {\r
  isolation: isolate;\r
}\r
\r
@supports not (backdrop-filter: blur(1px)) {\r
  .gradual-blur-inner > div {\r
    background: rgba(0, 0, 0, 0.3);\r
    opacity: 0.5;\r
  }\r
}\r
\r
.gradual-blur-fixed {\r
  position: fixed !important;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  bottom: 0;\r
  pointer-events: none;\r
  z-index: 1000;\r
}\r
`,su=`import React, { CSSProperties, useEffect, useRef, useState, useMemo, PropsWithChildren } from 'react';\r
import * as math from 'mathjs';\r
\r
import './GradualBlur.css';\r
\r
type GradualBlurProps = {\r
  position?: 'top' | 'bottom' | 'left' | 'right';\r
  strength?: number;\r
  height?: string;\r
  width?: string;\r
  divCount?: number;\r
  exponential?: boolean;\r
  zIndex?: number;\r
  animated?: boolean | 'scroll';\r
  duration?: string;\r
  easing?: string;\r
  opacity?: number;\r
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';\r
  responsive?: boolean;\r
  mobileHeight?: string;\r
  tabletHeight?: string;\r
  desktopHeight?: string;\r
  mobileWidth?: string;\r
  tabletWidth?: string;\r
  desktopWidth?: string;\r
  preset?:\r
    | 'top'\r
    | 'bottom'\r
    | 'left'\r
    | 'right'\r
    | 'subtle'\r
    | 'intense'\r
    | 'smooth'\r
    | 'sharp'\r
    | 'header'\r
    | 'footer'\r
    | 'sidebar'\r
    | 'page-header'\r
    | 'page-footer';\r
  gpuOptimized?: boolean;\r
  hoverIntensity?: number;\r
  target?: 'parent' | 'page';\r
  onAnimationComplete?: () => void;\r
  className?: string;\r
  style?: CSSProperties;\r
};\r
\r
const DEFAULT_CONFIG: Partial<GradualBlurProps> = {\r
  position: 'bottom',\r
  strength: 2,\r
  height: '6rem',\r
  divCount: 5,\r
  exponential: false,\r
  zIndex: 1000,\r
  animated: false,\r
  duration: '0.3s',\r
  easing: 'ease-out',\r
  opacity: 1,\r
  curve: 'linear',\r
  responsive: false,\r
  target: 'parent',\r
  className: '',\r
  style: {}\r
};\r
\r
const PRESETS: Record<string, Partial<GradualBlurProps>> = {\r
  top: { position: 'top', height: '6rem' },\r
  bottom: { position: 'bottom', height: '6rem' },\r
  left: { position: 'left', height: '6rem' },\r
  right: { position: 'right', height: '6rem' },\r
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },\r
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },\r
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },\r
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },\r
  header: { position: 'top', height: '8rem', curve: 'ease-out' },\r
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },\r
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },\r
  'page-header': {\r
    position: 'top',\r
    height: '10rem',\r
    target: 'page',\r
    strength: 3\r
  },\r
  'page-footer': {\r
    position: 'bottom',\r
    height: '10rem',\r
    target: 'page',\r
    strength: 3\r
  }\r
};\r
\r
const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {\r
  linear: p => p,\r
  bezier: p => p * p * (3 - 2 * p),\r
  'ease-in': p => p * p,\r
  'ease-out': p => 1 - Math.pow(1 - p, 2),\r
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)\r
};\r
\r
const mergeConfigs = (...configs: Partial<GradualBlurProps>[]): Partial<GradualBlurProps> => {\r
  return configs.reduce((acc, config) => ({ ...acc, ...config }), {});\r
};\r
\r
const getGradientDirection = (position: string): string => {\r
  const directions: Record<string, string> = {\r
    top: 'to top',\r
    bottom: 'to bottom',\r
    left: 'to left',\r
    right: 'to right'\r
  };\r
  return directions[position] || 'to bottom';\r
};\r
\r
const debounce = <T extends (...a: any[]) => void>(fn: T, wait: number) => {\r
  let t: ReturnType<typeof setTimeout>;\r
  return (...a: Parameters<T>) => {\r
    clearTimeout(t);\r
    t = setTimeout(() => fn(...a), wait);\r
  };\r
};\r
\r
const useResponsiveDimension = (\r
  responsive: boolean | undefined,\r
  config: Partial<GradualBlurProps>,\r
  key: keyof GradualBlurProps\r
) => {\r
  const [val, setVal] = useState<any>(config[key]);\r
  useEffect(() => {\r
    if (!responsive) return;\r
    const calc = () => {\r
      const w = window.innerWidth;\r
      let v: any = config[key];\r
      const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);\r
      const k = cap(key as string);\r
      if (w <= 480 && (config as any)['mobile' + k]) v = (config as any)['mobile' + k];\r
      else if (w <= 768 && (config as any)['tablet' + k]) v = (config as any)['tablet' + k];\r
      else if (w <= 1024 && (config as any)['desktop' + k]) v = (config as any)['desktop' + k];\r
      setVal(v);\r
    };\r
    const deb = debounce(calc, 100);\r
    calc();\r
    window.addEventListener('resize', deb);\r
    return () => window.removeEventListener('resize', deb);\r
  }, [responsive, config, key]);\r
  return responsive ? val : (config as any)[key];\r
};\r
\r
const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement | null>, shouldObserve: boolean = false) => {\r
  const [isVisible, setIsVisible] = useState(!shouldObserve);\r
\r
  useEffect(() => {\r
    if (!shouldObserve || !ref.current) return;\r
\r
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });\r
\r
    observer.observe(ref.current);\r
    return () => observer.disconnect();\r
  }, [ref, shouldObserve]);\r
\r
  return isVisible;\r
};\r
\r
const GradualBlur: React.FC<PropsWithChildren<GradualBlurProps>> = props => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const [isHovered, setIsHovered] = useState(false);\r
\r
  const config = useMemo(() => {\r
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};\r
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props) as Required<GradualBlurProps>;\r
  }, [props]);\r
\r
  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');\r
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');\r
\r
  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');\r
\r
  const blurDivs = useMemo(() => {\r
    const divs: React.ReactNode[] = [];\r
    const increment = 100 / config.divCount;\r
    const currentStrength =\r
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;\r
\r
    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;\r
\r
    for (let i = 1; i <= config.divCount; i++) {\r
      let progress = i / config.divCount;\r
      progress = curveFunc(progress);\r
\r
      let blurValue: number;\r
      if (config.exponential) {\r
        blurValue = Number(math.pow(2, progress * 4)) * 0.0625 * currentStrength;\r
      } else {\r
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;\r
      }\r
\r
      const p1 = math.round((increment * i - increment) * 10) / 10;\r
      const p2 = math.round(increment * i * 10) / 10;\r
      const p3 = math.round((increment * i + increment) * 10) / 10;\r
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;\r
\r
      let gradient = \`transparent \${p1}%, black \${p2}%\`;\r
      if (p3 <= 100) gradient += \`, black \${p3}%\`;\r
      if (p4 <= 100) gradient += \`, transparent \${p4}%\`;\r
\r
      const direction = getGradientDirection(config.position);\r
\r
      const divStyle: CSSProperties = {\r
        position: 'absolute',\r
        inset: '0',\r
        maskImage: \`linear-gradient(\${direction}, \${gradient})\`,\r
        WebkitMaskImage: \`linear-gradient(\${direction}, \${gradient})\`,\r
        backdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,\r
        WebkitBackdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,\r
        opacity: config.opacity,\r
        transition:\r
          config.animated && config.animated !== 'scroll'\r
            ? \`backdrop-filter \${config.duration} \${config.easing}\`\r
            : undefined\r
      };\r
\r
      divs.push(<div key={i} style={divStyle} />);\r
    }\r
\r
    return divs;\r
  }, [config, isHovered]);\r
\r
  const containerStyle: CSSProperties = useMemo(() => {\r
    const isVertical = ['top', 'bottom'].includes(config.position);\r
    const isHorizontal = ['left', 'right'].includes(config.position);\r
    const isPageTarget = config.target === 'page';\r
\r
    const baseStyle: CSSProperties = {\r
      position: isPageTarget ? 'fixed' : 'absolute',\r
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',\r
      opacity: isVisible ? 1 : 0,\r
      transition: config.animated ? \`opacity \${config.duration} \${config.easing}\` : undefined,\r
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,\r
      ...config.style\r
    };\r
\r
    if (isVertical) {\r
      baseStyle.height = responsiveHeight;\r
      baseStyle.width = responsiveWidth || '100%';\r
      baseStyle[config.position] = 0;\r
      baseStyle.left = 0;\r
      baseStyle.right = 0;\r
    } else if (isHorizontal) {\r
      baseStyle.width = responsiveWidth || responsiveHeight;\r
      baseStyle.height = '100%';\r
      baseStyle[config.position] = 0;\r
      baseStyle.top = 0;\r
      baseStyle.bottom = 0;\r
    }\r
\r
    return baseStyle;\r
  }, [config, responsiveHeight, responsiveWidth, isVisible]);\r
\r
  const { hoverIntensity, animated, onAnimationComplete, duration } = config as any;\r
  useEffect(() => {\r
    if (isVisible && animated === 'scroll' && onAnimationComplete) {\r
      const t = setTimeout(() => onAnimationComplete(), parseFloat(duration) * 1000);\r
      return () => clearTimeout(t);\r
    }\r
  }, [isVisible, animated, onAnimationComplete, duration]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`gradual-blur \${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} \${config.className}\`}\r
      style={containerStyle}\r
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}\r
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}\r
    >\r
      <div\r
        className="gradual-blur-inner"\r
        style={{\r
          position: 'relative',\r
          width: '100%',\r
          height: '100%'\r
        }}\r
      >\r
        {blurDivs}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
const GradualBlurMemo = React.memo(GradualBlur);\r
GradualBlurMemo.displayName = 'GradualBlur';\r
(GradualBlurMemo as any).PRESETS = PRESETS;\r
(GradualBlurMemo as any).CURVE_FUNCTIONS = CURVE_FUNCTIONS;\r
export default GradualBlurMemo;\r
\r
const injectStyles = () => {\r
  if (typeof document === 'undefined') return;\r
  const styleId = 'gradual-blur-styles';\r
  if (document.getElementById(styleId)) return;\r
  const styleElement = document.createElement('style');\r
  styleElement.id = styleId;\r
  styleElement.textContent = \`.gradual-blur{pointer-events:none;transition:opacity 0.3s ease-out}.gradual-blur-inner{pointer-events:none}\`;\r
  document.head.appendChild(styleElement);\r
};\r
\r
if (typeof document !== 'undefined') {\r
  injectStyles();\r
}\r
`,au=`import React, { CSSProperties, useEffect, useRef, useState, useMemo, PropsWithChildren } from 'react';\r
import * as math from 'mathjs';\r
\r
type GradualBlurProps = PropsWithChildren<{\r
  position?: 'top' | 'bottom' | 'left' | 'right';\r
  strength?: number;\r
  height?: string;\r
  width?: string;\r
  divCount?: number;\r
  exponential?: boolean;\r
  zIndex?: number;\r
  animated?: boolean | 'scroll';\r
  duration?: string;\r
  easing?: string;\r
  opacity?: number;\r
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';\r
  responsive?: boolean;\r
  mobileHeight?: string;\r
  tabletHeight?: string;\r
  desktopHeight?: string;\r
  mobileWidth?: string;\r
  tabletWidth?: string;\r
  desktopWidth?: string;\r
\r
  preset?:\r
    | 'top'\r
    | 'bottom'\r
    | 'left'\r
    | 'right'\r
    | 'subtle'\r
    | 'intense'\r
    | 'smooth'\r
    | 'sharp'\r
    | 'header'\r
    | 'footer'\r
    | 'sidebar'\r
    | 'page-header'\r
    | 'page-footer';\r
  gpuOptimized?: boolean;\r
  hoverIntensity?: number;\r
  target?: 'parent' | 'page';\r
\r
  onAnimationComplete?: () => void;\r
  className?: string;\r
  style?: CSSProperties;\r
}>;\r
\r
const DEFAULT_CONFIG: Partial<GradualBlurProps> = {\r
  position: 'bottom',\r
  strength: 2,\r
  height: '6rem',\r
  divCount: 5,\r
  exponential: false,\r
  zIndex: 1000,\r
  animated: false,\r
  duration: '0.3s',\r
  easing: 'ease-out',\r
  opacity: 1,\r
  curve: 'linear',\r
  responsive: false,\r
  target: 'parent',\r
  className: '',\r
  style: {}\r
};\r
\r
const PRESETS: Record<string, Partial<GradualBlurProps>> = {\r
  top: { position: 'top', height: '6rem' },\r
  bottom: { position: 'bottom', height: '6rem' },\r
  left: { position: 'left', height: '6rem' },\r
  right: { position: 'right', height: '6rem' },\r
\r
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },\r
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },\r
\r
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },\r
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },\r
\r
  header: { position: 'top', height: '8rem', curve: 'ease-out' },\r
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },\r
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },\r
\r
  'page-header': {\r
    position: 'top',\r
    height: '10rem',\r
    target: 'page',\r
    strength: 3\r
  },\r
  'page-footer': {\r
    position: 'bottom',\r
    height: '10rem',\r
    target: 'page',\r
    strength: 3\r
  }\r
};\r
\r
const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {\r
  linear: p => p,\r
  bezier: p => p * p * (3 - 2 * p),\r
  'ease-in': p => p * p,\r
  'ease-out': p => 1 - Math.pow(1 - p, 2),\r
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)\r
};\r
\r
const mergeConfigs = (...configs: Partial<GradualBlurProps>[]): Partial<GradualBlurProps> => {\r
  return configs.reduce((acc, config) => ({ ...acc, ...config }), {});\r
};\r
\r
const getGradientDirection = (position: string): string => {\r
  const directions: Record<string, string> = {\r
    top: 'to top',\r
    bottom: 'to bottom',\r
    left: 'to left',\r
    right: 'to right'\r
  };\r
  return directions[position] || 'to bottom';\r
};\r
\r
const debounce = <T extends (...a: any[]) => void>(fn: T, wait: number) => {\r
  let t: ReturnType<typeof setTimeout>;\r
  return (...a: Parameters<T>) => {\r
    clearTimeout(t);\r
    t = setTimeout(() => fn(...a), wait);\r
  };\r
};\r
const useResponsiveDimension = (\r
  responsive: boolean | undefined,\r
  config: Partial<GradualBlurProps>,\r
  key: keyof GradualBlurProps\r
) => {\r
  const [val, setVal] = useState<any>(config[key]);\r
  useEffect(() => {\r
    if (!responsive) return;\r
    const calc = () => {\r
      const w = window.innerWidth;\r
      let v: any = config[key];\r
      const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);\r
      const k = cap(key as string);\r
      if (w <= 480 && (config as any)['mobile' + k]) v = (config as any)['mobile' + k];\r
      else if (w <= 768 && (config as any)['tablet' + k]) v = (config as any)['tablet' + k];\r
      else if (w <= 1024 && (config as any)['desktop' + k]) v = (config as any)['desktop' + k];\r
      setVal(v);\r
    };\r
    const deb = debounce(calc, 100);\r
    calc();\r
    window.addEventListener('resize', deb);\r
    return () => window.removeEventListener('resize', deb);\r
  }, [responsive, config, key]);\r
  return responsive ? val : (config as any)[key];\r
};\r
\r
const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>, shouldObserve: boolean = false) => {\r
  const [isVisible, setIsVisible] = useState(!shouldObserve);\r
\r
  useEffect(() => {\r
    if (!shouldObserve || !ref.current) return;\r
\r
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });\r
\r
    observer.observe(ref.current);\r
    return () => observer.disconnect();\r
  }, [ref, shouldObserve]);\r
\r
  return isVisible;\r
};\r
\r
const GradualBlur: React.FC<GradualBlurProps> = props => {\r
  const containerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;\r
  const [isHovered, setIsHovered] = useState(false);\r
\r
  const config = useMemo(() => {\r
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};\r
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props) as Required<GradualBlurProps>;\r
  }, [props]);\r
\r
  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');\r
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');\r
\r
  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');\r
\r
  const blurDivs = useMemo(() => {\r
    const divs: React.ReactNode[] = [];\r
    const increment = 100 / config.divCount;\r
    const currentStrength =\r
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;\r
\r
    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;\r
\r
    for (let i = 1; i <= config.divCount; i++) {\r
      let progress = i / config.divCount;\r
      progress = curveFunc(progress);\r
\r
      let blurValue: number;\r
      if (config.exponential) {\r
        blurValue = Number(math.pow(2, progress * 4)) * 0.0625 * currentStrength;\r
      } else {\r
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;\r
      }\r
\r
      const p1 = math.round((increment * i - increment) * 10) / 10;\r
      const p2 = math.round(increment * i * 10) / 10;\r
      const p3 = math.round((increment * i + increment) * 10) / 10;\r
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;\r
\r
      let gradient = \`transparent \${p1}%, black \${p2}%\`;\r
      if (p3 <= 100) gradient += \`, black \${p3}%\`;\r
      if (p4 <= 100) gradient += \`, transparent \${p4}%\`;\r
\r
      const direction = getGradientDirection(config.position);\r
\r
      const divStyle: CSSProperties = {\r
        maskImage: \`linear-gradient(\${direction}, \${gradient})\`,\r
        WebkitMaskImage: \`linear-gradient(\${direction}, \${gradient})\`,\r
        backdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,\r
        opacity: config.opacity,\r
        transition:\r
          config.animated && config.animated !== 'scroll'\r
            ? \`backdrop-filter \${config.duration} \${config.easing}\`\r
            : undefined\r
      };\r
\r
      divs.push(<div key={i} className="absolute inset-0" style={divStyle} />);\r
    }\r
\r
    return divs;\r
  }, [config, isHovered]);\r
\r
  const containerStyle: CSSProperties = useMemo(() => {\r
    const isVertical = ['top', 'bottom'].includes(config.position);\r
    const isHorizontal = ['left', 'right'].includes(config.position);\r
    const isPageTarget = config.target === 'page';\r
\r
    const baseStyle: CSSProperties = {\r
      position: isPageTarget ? 'fixed' : 'absolute',\r
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',\r
      opacity: isVisible ? 1 : 0,\r
      transition: config.animated ? \`opacity \${config.duration} \${config.easing}\` : undefined,\r
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,\r
      ...config.style\r
    };\r
\r
    if (isVertical) {\r
      baseStyle.height = responsiveHeight;\r
      baseStyle.width = responsiveWidth || '100%';\r
      baseStyle[config.position] = 0;\r
      baseStyle.left = 0;\r
      baseStyle.right = 0;\r
    } else if (isHorizontal) {\r
      baseStyle.width = responsiveWidth || responsiveHeight;\r
      baseStyle.height = '100%';\r
      baseStyle[config.position] = 0;\r
      baseStyle.top = 0;\r
      baseStyle.bottom = 0;\r
    }\r
\r
    return baseStyle;\r
  }, [config, responsiveHeight, responsiveWidth, isVisible]);\r
\r
  const { hoverIntensity, animated, onAnimationComplete, duration } = config as any;\r
  useEffect(() => {\r
    if (isVisible && animated === 'scroll' && onAnimationComplete) {\r
      const t = setTimeout(() => onAnimationComplete(), parseFloat(duration) * 1000);\r
      return () => clearTimeout(t);\r
    }\r
  }, [isVisible, animated, onAnimationComplete, duration]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`gradual-blur relative isolate \${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} \${config.className}\`}\r
      style={containerStyle}\r
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}\r
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}\r
    >\r
      <div className="relative w-full h-full">{blurDivs}</div>\r
      {props.children && <div className="relative">{props.children}</div>}\r
    </div>\r
  );\r
};\r
\r
const GradualBlurMemo = React.memo(GradualBlur);\r
GradualBlurMemo.displayName = 'GradualBlur';\r
(GradualBlurMemo as any).PRESETS = PRESETS;\r
(GradualBlurMemo as any).CURVE_FUNCTIONS = CURVE_FUNCTIONS;\r
export default GradualBlurMemo;\r
\r
const injectStyles = () => {\r
  if (typeof document === 'undefined') return;\r
  const id = 'gradual-blur-styles';\r
  if (document.getElementById(id)) return;\r
  const el = document.createElement('style');\r
  el.id = id;\r
  el.textContent = \`.gradual-blur{pointer-events:none;transition:opacity .3s ease-out}.gradual-blur-inner{pointer-events:none}\`;\r
  document.head.appendChild(el);\r
};\r
if (typeof document !== 'undefined') {\r
  injectStyles();\r
}\r
`,cu={dependencies:"mathjs",usage:`// Component added by Ansh - github.com/ansh-dhanani

import GradualBlur from './GradualBlur';

<section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
  <div style={{ height: '100%',overflowY: 'auto',padding: '6rem 2rem' }}>
    <!-- Content Here - such as an image or text -->
  </div>

  <GradualBlur
    target="parent"
    position="bottom"
    height="6rem"
    strength={2}
    divCount={5}
    curve="bezier"
    exponential={true}
    opacity={1}
  />
</section>`,code:iu,css:ou,tailwind:uu,tsCode:su,tsTailwind:au};var Ft={relTol:1e-12,absTol:1e-15,matrix:"Matrix",number:"number",numberFallback:"number",precision:64,predictable:!1,randomSeed:null};function fu(e,r){if(jr(e,r))return e[r];throw typeof e[r]=="function"&&hu(e,r)?new Error('Cannot access method "'+r+'" as a property'):new Error('No access to property "'+r+'"')}function lu(e,r,n){if(jr(e,r))return e[r]=n,n;throw new Error('No access to property "'+r+'"')}function jr(e,r){return!pu(e)&&!Array.isArray(e)?!1:Jr(du,r)?!0:!(r in Object.prototype||r in Function.prototype)}function hu(e,r){return e==null||typeof e[r]!="function"||Jr(e,r)&&Object.getPrototypeOf&&r in Object.getPrototypeOf(e)?!1:Jr(gu,r)?!0:!(r in Object.prototype||r in Function.prototype)}function pu(e){return typeof e=="object"&&e&&e.constructor===Object}var du={length:!0,name:!0},gu={toString:!0,valueOf:!0,toLocaleString:!0};class mu{constructor(r){this.wrappedObject=r,this[Symbol.iterator]=this.entries}keys(){return Object.keys(this.wrappedObject).filter(r=>this.has(r)).values()}get(r){return fu(this.wrappedObject,r)}set(r,n){return lu(this.wrappedObject,r,n),this}has(r){return jr(this.wrappedObject,r)&&r in this.wrappedObject}entries(){return Du(this.keys(),r=>[r,this.get(r)])}forEach(r){for(var n of this.keys())r(this.get(n),n,this)}delete(r){jr(this.wrappedObject,r)&&delete this.wrappedObject[r]}clear(){for(var r of this.keys())this.delete(r)}get size(){return Object.keys(this.wrappedObject).length}}function Du(e,r){return{next:()=>{var n=e.next();return n.done?n:{value:r(n.value),done:!1}}}}function pe(e){return typeof e=="number"}function be(e){return!e||typeof e!="object"||typeof e.constructor!="function"?!1:e.isBigNumber===!0&&typeof e.constructor.prototype=="object"&&e.constructor.prototype.isBigNumber===!0||typeof e.constructor.isDecimal=="function"&&e.constructor.isDecimal(e)===!0}function vu(e){return typeof e=="bigint"}function Et(e){return e&&typeof e=="object"&&Object.getPrototypeOf(e).isComplex===!0||!1}function Ct(e){return e&&typeof e=="object"&&Object.getPrototypeOf(e).isFraction===!0||!1}function bt(e){return e&&e.constructor.prototype.isUnit===!0||!1}function er(e){return typeof e=="string"}var _e=Array.isArray;function Ce(e){return e&&e.constructor.prototype.isMatrix===!0||!1}function Yr(e){return Array.isArray(e)||Ce(e)}function yu(e){return e&&e.isDenseMatrix&&e.constructor.prototype.isMatrix===!0||!1}function wu(e){return e&&e.isSparseMatrix&&e.constructor.prototype.isMatrix===!0||!1}function Fu(e){return e&&e.constructor.prototype.isRange===!0||!1}function _n(e){return e&&e.constructor.prototype.isIndex===!0||!1}function Eu(e){return typeof e=="boolean"}function Cu(e){return e&&e.constructor.prototype.isResultSet===!0||!1}function bu(e){return e&&e.constructor.prototype.isHelp===!0||!1}function Au(e){return typeof e=="function"}function Bu(e){return e instanceof Date}function Nu(e){return e instanceof RegExp}function Sn(e){return!!(e&&typeof e=="object"&&e.constructor===Object&&!Et(e)&&!Ct(e))}function _u(e){return e?e instanceof Map||e instanceof mu||typeof e.set=="function"&&typeof e.get=="function"&&typeof e.keys=="function"&&typeof e.has=="function":!1}function Su(e){return e===null}function Mu(e){return e===void 0}function Tu(e){return e&&e.isAccessorNode===!0&&e.constructor.prototype.isNode===!0||!1}function Iu(e){return e&&e.isArrayNode===!0&&e.constructor.prototype.isNode===!0||!1}function xu(e){return e&&e.isAssignmentNode===!0&&e.constructor.prototype.isNode===!0||!1}function Ou(e){return e&&e.isBlockNode===!0&&e.constructor.prototype.isNode===!0||!1}function Pu(e){return e&&e.isConditionalNode===!0&&e.constructor.prototype.isNode===!0||!1}function zu(e){return e&&e.isConstantNode===!0&&e.constructor.prototype.isNode===!0||!1}function Ru(e){return e&&e.isFunctionAssignmentNode===!0&&e.constructor.prototype.isNode===!0||!1}function $u(e){return e&&e.isFunctionNode===!0&&e.constructor.prototype.isNode===!0||!1}function Uu(e){return e&&e.isIndexNode===!0&&e.constructor.prototype.isNode===!0||!1}function Vu(e){return e&&e.isNode===!0&&e.constructor.prototype.isNode===!0||!1}function ku(e){return e&&e.isObjectNode===!0&&e.constructor.prototype.isNode===!0||!1}function qu(e){return e&&e.isOperatorNode===!0&&e.constructor.prototype.isNode===!0||!1}function Lu(e){return e&&e.isParenthesisNode===!0&&e.constructor.prototype.isNode===!0||!1}function Gu(e){return e&&e.isRangeNode===!0&&e.constructor.prototype.isNode===!0||!1}function Hu(e){return e&&e.isRelationalNode===!0&&e.constructor.prototype.isNode===!0||!1}function Wu(e){return e&&e.isSymbolNode===!0&&e.constructor.prototype.isNode===!0||!1}function Zu(e){return e&&e.constructor.prototype.isChain===!0||!1}function lr(e){var r=typeof e;return r==="object"?e===null?"null":be(e)?"BigNumber":e.constructor&&e.constructor.name?e.constructor.name:"Object":r}function Ee(e){var r=typeof e;if(r==="number"||r==="bigint"||r==="string"||r==="boolean"||e===null||e===void 0)return e;if(typeof e.clone=="function")return e.clone();if(Array.isArray(e))return e.map(function(n){return Ee(n)});if(e instanceof Date)return new Date(e.valueOf());if(be(e))return e;if(Sn(e))return ju(e,Ee);if(r==="function")return e;throw new TypeError("Cannot clone: unknown type of value (value: ".concat(e,")"))}function ju(e,r){var n={};for(var i in e)Jr(e,i)&&(n[i]=r(e[i]));return n}function _r(e,r){var n,i,t;if(Array.isArray(e)){if(!Array.isArray(r)||e.length!==r.length)return!1;for(i=0,t=e.length;i<t;i++)if(!_r(e[i],r[i]))return!1;return!0}else{if(typeof e=="function")return e===r;if(e instanceof Object){if(Array.isArray(r)||!(r instanceof Object))return!1;for(n in e)if(!(n in r)||!_r(e[n],r[n]))return!1;for(n in r)if(!(n in e))return!1;return!0}else return e===r}}function Jr(e,r){return e&&Object.hasOwnProperty.call(e,r)}function Yu(e,r){for(var n={},i=0;i<r.length;i++){var t=r[i],u=e[t];u!==void 0&&(n[t]=u)}return n}var Ju=["Matrix","Array"],Xu=["number","BigNumber","Fraction"],pr=function(r){if(r)throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);return Object.freeze(Ft)};wt(pr,Ft,{MATRIX_OPTIONS:Ju,NUMBER_OPTIONS:Xu});function Vn(){return!0}function Ze(){return!1}function Fr(){}const kn="Argument is not a typed-function.";function At(){function e(v){return typeof v=="object"&&v!==null&&v.constructor===Object}const r=[{name:"number",test:function(v){return typeof v=="number"}},{name:"string",test:function(v){return typeof v=="string"}},{name:"boolean",test:function(v){return typeof v=="boolean"}},{name:"Function",test:function(v){return typeof v=="function"}},{name:"Array",test:Array.isArray},{name:"Date",test:function(v){return v instanceof Date}},{name:"RegExp",test:function(v){return v instanceof RegExp}},{name:"Object",test:e},{name:"null",test:function(v){return v===null}},{name:"undefined",test:function(v){return v===void 0}}],n={name:"any",test:Vn,isAny:!0};let i,t,u=0,o={createCount:0};function s(v){const E=i.get(v);if(E)return E;let _='Unknown type "'+v+'"';const T=v.toLowerCase();let P;for(P of t)if(P.toLowerCase()===T){_+='. Did you mean "'+P+'" ?';break}throw new TypeError(_)}function f(v){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"any";const _=E?s(E).index:t.length,T=[];for(let x=0;x<v.length;++x){if(!v[x]||typeof v[x].name!="string"||typeof v[x].test!="function")throw new TypeError("Object with properties {name: string, test: function} expected");const V=v[x].name;if(i.has(V))throw new TypeError('Duplicate type name "'+V+'"');T.push(V),i.set(V,{name:V,test:v[x].test,isAny:v[x].isAny,index:_+x,conversionsTo:[]})}const P=t.slice(_);t=t.slice(0,_).concat(T).concat(P);for(let x=_+T.length;x<t.length;++x)i.get(t[x]).index=x}function l(){i=new Map,t=[],u=0,f([n],!1)}l(),f(r);function a(){let v;for(v of t)i.get(v).conversionsTo=[];u=0}function h(v){const E=t.filter(_=>{const T=i.get(_);return!T.isAny&&T.test(v)});return E.length?E:["any"]}function p(v){return v&&typeof v=="function"&&"_typedFunctionData"in v}function d(v,E,_){if(!p(v))throw new TypeError(kn);const T=_&&_.exact,P=Array.isArray(E)?E.join(","):E,x=A(P),V=m(x);if(!T||V in v.signatures){const oe=v._typedFunctionData.signatureMap.get(V);if(oe)return oe}const R=x.length;let k;if(T){k=[];let oe;for(oe in v.signatures)k.push(v._typedFunctionData.signatureMap.get(oe))}else k=v._typedFunctionData.signatures;for(let oe=0;oe<R;++oe){const le=x[oe],Be=[];let Ve;for(Ve of k){const $e=B(Ve.params,oe);if(!(!$e||le.restParam&&!$e.restParam)){if(!$e.hasAny){const Je=F($e);if(le.types.some(Xe=>!Je.has(Xe.name)))continue}Be.push(Ve)}}if(k=Be,k.length===0)break}let z;for(z of k)if(z.params.length<=R)return z;throw new TypeError("Signature not found (signature: "+(v.name||"unnamed")+"("+m(x,", ")+"))")}function g(v,E,_){return d(v,E,_).implementation}function c(v,E){const _=s(E);if(_.test(v))return v;const T=_.conversionsTo;if(T.length===0)throw new Error("There are no conversions to "+E+" defined.");for(let P=0;P<T.length;P++)if(s(T[P].from).test(v))return T[P].convert(v);throw new Error("Cannot convert "+v+" to "+E)}function m(v){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:",";return v.map(_=>_.name).join(E)}function w(v){const E=v.indexOf("...")===0,T=(E?v.length>3?v.slice(3):"any":v).split("|").map(R=>s(R.trim()));let P=!1,x=E?"...":"";return{types:T.map(function(R){return P=R.isAny||P,x+=R.name+"|",{name:R.name,typeIndex:R.index,test:R.test,isAny:R.isAny,conversion:null,conversionIndex:-1}}),name:x.slice(0,-1),hasAny:P,hasConversion:!1,restParam:E}}function C(v){const E=v.types.map(V=>V.name),_=X(E);let T=v.hasAny,P=v.name;const x=_.map(function(V){const R=s(V.from);return T=R.isAny||T,P+="|"+V.from,{name:V.from,typeIndex:R.index,test:R.test,isAny:R.isAny,conversion:V,conversionIndex:V.index}});return{types:v.types.concat(x),name:P,hasAny:T,hasConversion:x.length>0,restParam:v.restParam}}function F(v){return v.typeSet||(v.typeSet=new Set,v.types.forEach(E=>v.typeSet.add(E.name))),v.typeSet}function A(v){const E=[];if(typeof v!="string")throw new TypeError("Signatures must be strings");const _=v.trim();if(_==="")return E;const T=_.split(",");for(let P=0;P<T.length;++P){const x=w(T[P].trim());if(x.restParam&&P!==T.length-1)throw new SyntaxError('Unexpected rest parameter "'+T[P]+'": only allowed for the last parameter');if(x.types.length===0)return null;E.push(x)}return E}function y(v){const E=ae(v);return E?E.restParam:!1}function D(v){if(!v||v.types.length===0)return Vn;if(v.types.length===1)return s(v.types[0].name).test;if(v.types.length===2){const E=s(v.types[0].name).test,_=s(v.types[1].name).test;return function(P){return E(P)||_(P)}}else{const E=v.types.map(function(_){return s(_.name).test});return function(T){for(let P=0;P<E.length;P++)if(E[P](T))return!0;return!1}}}function b(v){let E,_,T;if(y(v)){E=Re(v).map(D);const P=E.length,x=D(ae(v)),V=function(R){for(let k=P;k<R.length;k++)if(!x(R[k]))return!1;return!0};return function(k){for(let z=0;z<E.length;z++)if(!E[z](k[z]))return!1;return V(k)&&k.length>=P+1}}else return v.length===0?function(x){return x.length===0}:v.length===1?(_=D(v[0]),function(x){return _(x[0])&&x.length===1}):v.length===2?(_=D(v[0]),T=D(v[1]),function(x){return _(x[0])&&T(x[1])&&x.length===2}):(E=v.map(D),function(x){for(let V=0;V<E.length;V++)if(!E[V](x[V]))return!1;return x.length===E.length})}function B(v,E){return E<v.length?v[E]:y(v)?ae(v):null}function N(v,E){const _=B(v,E);return _?F(_):new Set}function M(v){return v.conversion===null||v.conversion===void 0}function I(v,E){const _=new Set;return v.forEach(T=>{const P=N(T.params,E);let x;for(x of P)_.add(x)}),_.has("any")?["any"]:Array.from(_)}function q(v,E,_){let T,P;const x=v||"unnamed";let V=_,R;for(R=0;R<E.length;R++){const le=[];if(V.forEach(Be=>{const Ve=B(Be.params,R),$e=D(Ve);(R<Be.params.length||y(Be.params))&&$e(E[R])&&le.push(Be)}),le.length===0){if(P=I(V,R),P.length>0){const Be=h(E[R]);return T=new TypeError("Unexpected type of argument in function "+x+" (expected: "+P.join(" or ")+", actual: "+Be.join(" | ")+", index: "+R+")"),T.data={category:"wrongType",fn:x,index:R,actual:Be,expected:P},T}}else V=le}const k=V.map(function(le){return y(le.params)?1/0:le.params.length});if(E.length<Math.min.apply(null,k))return P=I(V,R),T=new TypeError("Too few arguments in function "+x+" (expected: "+P.join(" or ")+", index: "+E.length+")"),T.data={category:"tooFewArgs",fn:x,index:E.length,expected:P},T;const z=Math.max.apply(null,k);if(E.length>z)return T=new TypeError("Too many arguments in function "+x+" (expected: "+z+", actual: "+E.length+")"),T.data={category:"tooManyArgs",fn:x,index:E.length,expectedLength:z},T;const oe=[];for(let le=0;le<E.length;++le)oe.push(h(E[le]).join("|"));return T=new TypeError('Arguments of type "'+oe.join(", ")+'" do not match any of the defined signatures of function '+x+"."),T.data={category:"mismatch",actual:oe},T}function W(v){let E=t.length+1;for(let _=0;_<v.types.length;_++)M(v.types[_])&&(E=Math.min(E,v.types[_].typeIndex));return E}function Z(v){let E=u+1;for(let _=0;_<v.types.length;_++)M(v.types[_])||(E=Math.min(E,v.types[_].conversionIndex));return E}function L(v,E){if(v.hasAny){if(!E.hasAny)return 1}else if(E.hasAny)return-1;if(v.restParam){if(!E.restParam)return 1}else if(E.restParam)return-1;if(v.hasConversion){if(!E.hasConversion)return 1}else if(E.hasConversion)return-1;const _=W(v)-W(E);if(_<0)return-1;if(_>0)return 1;const T=Z(v)-Z(E);return T<0?-1:T>0?1:0}function $(v,E){const _=v.params,T=E.params,P=ae(_),x=ae(T),V=y(_),R=y(T);if(V&&P.hasAny){if(!R||!x.hasAny)return 1}else if(R&&x.hasAny)return-1;let k=0,z=0,oe;for(oe of _)oe.hasAny&&++k,oe.hasConversion&&++z;let le=0,Be=0;for(oe of T)oe.hasAny&&++le,oe.hasConversion&&++Be;if(k!==le)return k-le;if(V&&P.hasConversion){if(!R||!x.hasConversion)return 1}else if(R&&x.hasConversion)return-1;if(z!==Be)return z-Be;if(V){if(!R)return 1}else if(R)return-1;const Ve=(_.length-T.length)*(V?-1:1);if(Ve!==0)return Ve;const $e=[];let Je=0;for(let wr=0;wr<_.length;++wr){const Vr=L(_[wr],T[wr]);$e.push(Vr),Je+=Vr}if(Je!==0)return Je;let Xe;for(Xe of $e)if(Xe!==0)return Xe;return 0}function X(v){if(v.length===0)return[];const E=v.map(s);v.length>1&&E.sort((P,x)=>P.index-x.index);let _=E[0].conversionsTo;if(v.length===1)return _;_=_.concat([]);const T=new Set(v);for(let P=1;P<E.length;++P){let x;for(x of E[P].conversionsTo)T.has(x.from)||(_.push(x),T.add(x.from))}return _}function j(v,E){let _=E;if(v.some(P=>P.hasConversion)){const P=y(v),x=v.map(Y);_=function(){const R=[],k=P?arguments.length-1:arguments.length;for(let z=0;z<k;z++)R[z]=x[z](arguments[z]);return P&&(R[k]=arguments[k].map(x[k])),E.apply(this,R)}}let T=_;if(y(v)){const P=v.length-1;T=function(){return _.apply(this,ue(arguments,0,P).concat([ue(arguments,P)]))}}return T}function Y(v){let E,_,T,P;const x=[],V=[];switch(v.types.forEach(function(R){R.conversion&&(x.push(s(R.conversion.from).test),V.push(R.conversion.convert))}),V.length){case 0:return function(k){return k};case 1:return E=x[0],T=V[0],function(k){return E(k)?T(k):k};case 2:return E=x[0],_=x[1],T=V[0],P=V[1],function(k){return E(k)?T(k):_(k)?P(k):k};default:return function(k){for(let z=0;z<V.length;z++)if(x[z](k))return V[z](k);return k}}}function Q(v){function E(_,T,P){if(T<_.length){const x=_[T];let V=[];if(x.restParam){const R=x.types.filter(M);R.length<x.types.length&&V.push({types:R,name:"..."+R.map(k=>k.name).join("|"),hasAny:R.some(k=>k.isAny),hasConversion:!1,restParam:!0}),V.push(x)}else V=x.types.map(function(R){return{types:[R],name:R.name,hasAny:R.isAny,hasConversion:R.conversion,restParam:!1}});return xe(V,function(R){return E(_,T+1,P.concat([R]))})}else return[P]}return E(v,0,[])}function ie(v,E){const _=Math.max(v.length,E.length);for(let R=0;R<_;R++){const k=N(v,R),z=N(E,R);let oe=!1,le;for(le of z)if(k.has(le)){oe=!0;break}if(!oe)return!1}const T=v.length,P=E.length,x=y(v),V=y(E);return x?V?T===P:P>=T:V?T>=P:T===P}function ne(v){return v.map(E=>ir(E)?We(E.referToSelf.callback):tr(E)?Me(E.referTo.references,E.referTo.callback):E)}function se(v,E,_){const T=[];let P;for(P of v){let x=_[P];if(typeof x!="number")throw new TypeError('No definition for referenced signature "'+P+'"');if(x=E[x],typeof x!="function")return!1;T.push(x)}return T}function Ae(v,E,_){const T=ne(v),P=new Array(T.length).fill(!1);let x=!0;for(;x;){x=!1;let V=!0;for(let R=0;R<T.length;++R){if(P[R])continue;const k=T[R];if(ir(k))T[R]=k.referToSelf.callback(_),T[R].referToSelf=k.referToSelf,P[R]=!0,V=!1;else if(tr(k)){const z=se(k.referTo.references,T,E);z?(T[R]=k.referTo.callback.apply(this,z),T[R].referTo=k.referTo,P[R]=!0,V=!1):x=!0}}if(V&&x)throw new SyntaxError("Circular reference detected in resolving typed.referTo")}return T}function Fe(v){const E=/\bthis(\(|\.signatures\b)/;Object.keys(v).forEach(_=>{const T=v[_];if(E.test(T.toString()))throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.")})}function ve(v,E){if(o.createCount++,Object.keys(E).length===0)throw new SyntaxError("No signatures provided");o.warnAgainstDeprecatedThis&&Fe(E);const _=[],T=[],P={},x=[];let V;for(V in E){if(!Object.prototype.hasOwnProperty.call(E,V))continue;const te=A(V);if(!te)continue;_.forEach(function(Or){if(ie(Or,te))throw new TypeError('Conflicting signatures "'+m(Or)+'" and "'+m(te)+'".')}),_.push(te);const ke=T.length;T.push(E[V]);const Li=te.map(C);let kr;for(kr of Q(Li)){const Or=m(kr);x.push({params:kr,name:Or,fn:ke}),kr.every(Gi=>!Gi.hasConversion)&&(P[Or]=ke)}}x.sort($);const R=Ae(T,P,xr);let k;for(k in P)Object.prototype.hasOwnProperty.call(P,k)&&(P[k]=R[P[k]]);const z=[],oe=new Map;for(k of x)oe.has(k.name)||(k.fn=R[k.fn],z.push(k),oe.set(k.name,k));const le=z[0]&&z[0].params.length<=2&&!y(z[0].params),Be=z[1]&&z[1].params.length<=2&&!y(z[1].params),Ve=z[2]&&z[2].params.length<=2&&!y(z[2].params),$e=z[3]&&z[3].params.length<=2&&!y(z[3].params),Je=z[4]&&z[4].params.length<=2&&!y(z[4].params),Xe=z[5]&&z[5].params.length<=2&&!y(z[5].params),wr=le&&Be&&Ve&&$e&&Je&&Xe;for(let te=0;te<z.length;++te)z[te].test=b(z[te].params);const Vr=le?D(z[0].params[0]):Ze,gi=Be?D(z[1].params[0]):Ze,mi=Ve?D(z[2].params[0]):Ze,Di=$e?D(z[3].params[0]):Ze,vi=Je?D(z[4].params[0]):Ze,yi=Xe?D(z[5].params[0]):Ze,wi=le?D(z[0].params[1]):Ze,Fi=Be?D(z[1].params[1]):Ze,Ei=Ve?D(z[2].params[1]):Ze,Ci=$e?D(z[3].params[1]):Ze,bi=Je?D(z[4].params[1]):Ze,Ai=Xe?D(z[5].params[1]):Ze;for(let te=0;te<z.length;++te)z[te].implementation=j(z[te].params,z[te].fn);const Bi=le?z[0].implementation:Fr,Ni=Be?z[1].implementation:Fr,_i=Ve?z[2].implementation:Fr,Si=$e?z[3].implementation:Fr,Mi=Je?z[4].implementation:Fr,Ti=Xe?z[5].implementation:Fr,Ii=le?z[0].params.length:-1,xi=Be?z[1].params.length:-1,Oi=Ve?z[2].params.length:-1,Pi=$e?z[3].params.length:-1,zi=Je?z[4].params.length:-1,Ri=Xe?z[5].params.length:-1,$i=wr?6:0,Ui=z.length,Vi=z.map(te=>te.test),ki=z.map(te=>te.implementation),qi=function(){for(let ke=$i;ke<Ui;ke++)if(Vi[ke](arguments))return ki[ke].apply(this,arguments);return o.onMismatch(v,arguments,z)};function xr(te,ke){return arguments.length===Ii&&Vr(te)&&wi(ke)?Bi.apply(this,arguments):arguments.length===xi&&gi(te)&&Fi(ke)?Ni.apply(this,arguments):arguments.length===Oi&&mi(te)&&Ei(ke)?_i.apply(this,arguments):arguments.length===Pi&&Di(te)&&Ci(ke)?Si.apply(this,arguments):arguments.length===zi&&vi(te)&&bi(ke)?Mi.apply(this,arguments):arguments.length===Ri&&yi(te)&&Ai(ke)?Ti.apply(this,arguments):qi.apply(this,arguments)}try{Object.defineProperty(xr,"name",{value:v})}catch{}return xr.signatures=P,xr._typedFunctionData={signatures:z,signatureMap:oe},xr}function he(v,E,_){throw q(v,E,_)}function Re(v){return ue(v,0,v.length-1)}function ae(v){return v[v.length-1]}function ue(v,E,_){return Array.prototype.slice.call(v,E,_)}function He(v,E){for(let _=0;_<v.length;_++)if(E(v[_]))return v[_]}function xe(v,E){return Array.prototype.concat.apply([],v.map(E))}function ce(){const v=Re(arguments).map(_=>m(A(_))),E=ae(arguments);if(typeof E!="function")throw new TypeError("Callback function expected as last argument");return Me(v,E)}function Me(v,E){return{referTo:{references:v,callback:E}}}function We(v){if(typeof v!="function")throw new TypeError("Callback function expected as first argument");return{referToSelf:{callback:v}}}function tr(v){return v&&typeof v.referTo=="object"&&Array.isArray(v.referTo.references)&&typeof v.referTo.callback=="function"}function ir(v){return v&&typeof v.referToSelf=="object"&&typeof v.referToSelf.callback=="function"}function vr(v,E){if(!v)return E;if(E&&E!==v){const _=new Error("Function names do not match (expected: "+v+", actual: "+E+")");throw _.data={actual:E,expected:v},_}return v}function yr(v){let E;for(const _ in v)Object.prototype.hasOwnProperty.call(v,_)&&(p(v[_])||typeof v[_].signature=="string")&&(E=vr(E,v[_].name));return E}function pn(v,E){let _;for(_ in E)if(Object.prototype.hasOwnProperty.call(E,_)){if(_ in v&&E[_]!==v[_]){const T=new Error('Signature "'+_+'" is defined twice');throw T.data={signature:_,sourceFunction:E[_],destFunction:v[_]},T}v[_]=E[_]}}const di=o;o=function(v){const E=typeof v=="string",_=E?1:0;let T=E?v:"";const P={};for(let x=_;x<arguments.length;++x){const V=arguments[x];let R={},k;if(typeof V=="function"?(k=V.name,typeof V.signature=="string"?R[V.signature]=V:p(V)&&(R=V.signatures)):e(V)&&(R=V,E||(k=yr(V))),Object.keys(R).length===0){const z=new TypeError("Argument to 'typed' at index "+x+" is not a (typed) function, nor an object with signatures as keys and functions as values.");throw z.data={index:x,argument:V},z}E||(T=vr(T,k)),pn(P,R)}return ve(T||"",P)},o.create=At,o.createCount=di.createCount,o.onMismatch=he,o.throwMismatchError=he,o.createError=q,o.clear=l,o.clearConversions=a,o.addTypes=f,o._findType=s,o.referTo=ce,o.referToSelf=We,o.convert=c,o.findSignature=d,o.find=g,o.isTypedFunction=p,o.warnAgainstDeprecatedThis=!0,o.addType=function(v,E){let _="any";E!==!1&&i.has("Object")&&(_="Object"),o.addTypes([v],_)};function Rn(v){if(!v||typeof v.from!="string"||typeof v.to!="string"||typeof v.convert!="function")throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");if(v.to===v.from)throw new SyntaxError('Illegal to define conversion from "'+v.from+'" to itself.')}return o.addConversion=function(v){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{override:!1};Rn(v);const _=s(v.to),T=_.conversionsTo.find(P=>P.from===v.from);if(T)if(E&&E.override)o.removeConversion({from:T.from,to:v.to,convert:T.convert});else throw new Error('There is already a conversion from "'+v.from+'" to "'+_.name+'"');_.conversionsTo.push({from:v.from,convert:v.convert,index:u++})},o.addConversions=function(v,E){v.forEach(_=>o.addConversion(_,E))},o.removeConversion=function(v){Rn(v);const E=s(v.to),_=He(E.conversionsTo,P=>P.from===v.from);if(!_)throw new Error("Attempt to remove nonexistent conversion from "+v.from+" to "+v.to);if(_.convert!==v.convert)throw new Error("Conversion to remove does not match existing conversion");const T=E.conversionsTo.indexOf(_);E.conversionsTo.splice(T,1)},o.resolve=function(v,E){if(!p(v))throw new TypeError(kn);const _=v._typedFunctionData.signatures;for(let T=0;T<_.length;++T)if(_[T].test(E))return _[T];return null},o}const Xr=At();function re(e,r,n,i){function t(u){var o=Yu(u,r.map(eo));return Ku(e,r,u),n(o)}return t.isFactory=!0,t.fn=e,t.dependencies=r.slice().sort(),i&&(t.meta=i),t}function Ku(e,r,n){var i=r.filter(u=>!Qu(u)).every(u=>n[u]!==void 0);if(!i){var t=r.filter(u=>n[u]===void 0);throw new Error('Cannot create function "'.concat(e,'", ')+"some dependencies are missing: ".concat(t.map(u=>'"'.concat(u,'"')).join(", "),"."))}}function Qu(e){return e&&e[0]==="?"}function eo(e){return e&&e[0]==="?"?e.slice(1):e}function ge(e){return typeof e=="boolean"?!0:isFinite(e)?e===Math.round(e):!1}function gn(e,r,n){var i={2:"0b",8:"0o",16:"0x"},t=i[r],u="";if(n){if(n<1)throw new Error("size must be in greater than 0");if(!ge(n))throw new Error("size must be an integer");if(e>2**(n-1)-1||e<-(2**(n-1)))throw new Error("Value must be in range [-2^".concat(n-1,", 2^").concat(n-1,"-1]"));if(!ge(e))throw new Error("Value must be an integer");e<0&&(e=e+2**n),u="i".concat(n)}var o="";return e<0&&(e=-e,o="-"),"".concat(o).concat(t).concat(e.toString(r)).concat(u)}function yn(e,r){if(typeof r=="function")return r(e);if(e===1/0)return"Infinity";if(e===-1/0)return"-Infinity";if(isNaN(e))return"NaN";var{notation:n,precision:i,wordSize:t}=Bt(r);switch(n){case"fixed":return Nt(e,i);case"exponential":return _t(e,i);case"engineering":return ro(e,i);case"bin":return gn(e,2,t);case"oct":return gn(e,8,t);case"hex":return gn(e,16,t);case"auto":return no(e,i,r).replace(/((\.\d*?)(0+))($|e)/,function(){var u=arguments[2],o=arguments[4];return u!=="."?u+o:o});default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.')}}function Bt(e){var r="auto",n,i;if(e!==void 0)if(pe(e))n=e;else if(be(e))n=e.toNumber();else if(Sn(e))e.precision!==void 0&&(n=qn(e.precision,()=>{throw new Error('Option "precision" must be a number or BigNumber')})),e.wordSize!==void 0&&(i=qn(e.wordSize,()=>{throw new Error('Option "wordSize" must be a number or BigNumber')})),e.notation&&(r=e.notation);else throw new Error("Unsupported type of options, number, BigNumber, or object expected");return{notation:r,precision:n,wordSize:i}}function $r(e){var r=String(e).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);if(!r)throw new SyntaxError("Invalid number "+e);var n=r[1],i=r[2],t=parseFloat(r[4]||"0"),u=i.indexOf(".");t+=u!==-1?u-1:i.length-1;var o=i.replace(".","").replace(/^0*/,function(s){return t-=s.length,""}).replace(/0*$/,"").split("").map(function(s){return parseInt(s)});return o.length===0&&(o.push(0),t++),{sign:n,coefficients:o,exponent:t}}function ro(e,r){if(isNaN(e)||!isFinite(e))return String(e);var n=$r(e),i=un(n,r),t=i.exponent,u=i.coefficients,o=t%3===0?t:t<0?t-3-t%3:t-t%3;if(pe(r))for(;r>u.length||t-o+1>u.length;)u.push(0);else for(var s=Math.abs(t-o)-(u.length-1),f=0;f<s;f++)u.push(0);for(var l=Math.abs(t-o),a=1;l>0;)a++,l--;var h=u.slice(a).join(""),p=pe(r)&&h.length||h.match(/[1-9]/)?"."+h:"",d=u.slice(0,a).join("")+p+"e"+(t>=0?"+":"")+o.toString();return i.sign+d}function Nt(e,r){if(isNaN(e)||!isFinite(e))return String(e);var n=$r(e),i=typeof r=="number"?un(n,n.exponent+1+r):n,t=i.coefficients,u=i.exponent+1,o=u+(r||0);return t.length<o&&(t=t.concat(Nr(o-t.length))),u<0&&(t=Nr(-u+1).concat(t),u=1),u<t.length&&t.splice(u,0,u===0?"0.":"."),i.sign+t.join("")}function _t(e,r){if(isNaN(e)||!isFinite(e))return String(e);var n=$r(e),i=r?un(n,r):n,t=i.coefficients,u=i.exponent;t.length<r&&(t=t.concat(Nr(r-t.length)));var o=t.shift();return i.sign+o+(t.length>0?"."+t.join(""):"")+"e"+(u>=0?"+":"")+u}function no(e,r,n){if(isNaN(e)||!isFinite(e))return String(e);var i=Ln(n==null?void 0:n.lowerExp,-3),t=Ln(n==null?void 0:n.upperExp,5),u=$r(e),o=r?un(u,r):u;if(o.exponent<i||o.exponent>=t)return _t(e,r);var s=o.coefficients,f=o.exponent;s.length<r&&(s=s.concat(Nr(r-s.length))),s=s.concat(Nr(f-s.length+1+(s.length<r?r-s.length:0))),s=Nr(-f).concat(s);var l=f>0?f:0;return l<s.length-1&&s.splice(l+1,0,"."),o.sign+s.join("")}function un(e,r){for(var n={sign:e.sign,coefficients:e.coefficients,exponent:e.exponent},i=n.coefficients;r<=0;)i.unshift(0),n.exponent++,r++;if(i.length>r){var t=i.splice(r,i.length-r);if(t[0]>=5){var u=r-1;for(i[u]++;i[u]===10;)i.pop(),u===0&&(i.unshift(0),n.exponent++,u++),u--,i[u]++}}return n}function Nr(e){for(var r=[],n=0;n<e;n++)r.push(0);return r}function to(e){return e.toExponential().replace(/e.*$/,"").replace(/^0\.?0*|\./,"").length}function Sr(e,r){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1e-8,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;if(n<=0)throw new Error("Relative tolerance must be greater than 0");if(i<0)throw new Error("Absolute tolerance must be at least 0");return isNaN(e)||isNaN(r)?!1:!isFinite(e)||!isFinite(r)?e===r:e===r?!0:Math.abs(e-r)<=Math.max(n*Math.max(Math.abs(e),Math.abs(r)),i)}function qn(e,r){if(pe(e))return e;if(be(e))return e.toNumber();r()}function Ln(e,r){return pe(e)?e:be(e)?e.toNumber():r}var St=function(){return St=Xr.create,Xr},io=["?BigNumber","?Complex","?DenseMatrix","?Fraction"],uo=re("typed",io,function(r){var{BigNumber:n,Complex:i,DenseMatrix:t,Fraction:u}=r,o=St();return o.clear(),o.addTypes([{name:"number",test:pe},{name:"Complex",test:Et},{name:"BigNumber",test:be},{name:"bigint",test:vu},{name:"Fraction",test:Ct},{name:"Unit",test:bt},{name:"identifier",test:s=>er&&/^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(s)},{name:"string",test:er},{name:"Chain",test:Zu},{name:"Array",test:_e},{name:"Matrix",test:Ce},{name:"DenseMatrix",test:yu},{name:"SparseMatrix",test:wu},{name:"Range",test:Fu},{name:"Index",test:_n},{name:"boolean",test:Eu},{name:"ResultSet",test:Cu},{name:"Help",test:bu},{name:"function",test:Au},{name:"Date",test:Bu},{name:"RegExp",test:Nu},{name:"null",test:Su},{name:"undefined",test:Mu},{name:"AccessorNode",test:Tu},{name:"ArrayNode",test:Iu},{name:"AssignmentNode",test:xu},{name:"BlockNode",test:Ou},{name:"ConditionalNode",test:Pu},{name:"ConstantNode",test:zu},{name:"FunctionNode",test:$u},{name:"FunctionAssignmentNode",test:Ru},{name:"IndexNode",test:Uu},{name:"Node",test:Vu},{name:"ObjectNode",test:ku},{name:"OperatorNode",test:qu},{name:"ParenthesisNode",test:Lu},{name:"RangeNode",test:Gu},{name:"RelationalNode",test:Hu},{name:"SymbolNode",test:Wu},{name:"Map",test:_u},{name:"Object",test:Sn}]),o.addConversions([{from:"number",to:"BigNumber",convert:function(f){if(n||qr(f),to(f)>15)throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: "+f+"). Use function bignumber(x) to convert to BigNumber.");return new n(f)}},{from:"number",to:"Complex",convert:function(f){return i||Lr(f),new i(f,0)}},{from:"BigNumber",to:"Complex",convert:function(f){return i||Lr(f),new i(f.toNumber(),0)}},{from:"bigint",to:"number",convert:function(f){if(f>Number.MAX_SAFE_INTEGER)throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: "+f+")");return Number(f)}},{from:"bigint",to:"BigNumber",convert:function(f){return n||qr(f),new n(f.toString())}},{from:"bigint",to:"Fraction",convert:function(f){return u||Gr(f),new u(f)}},{from:"Fraction",to:"BigNumber",convert:function(f){throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.")}},{from:"Fraction",to:"Complex",convert:function(f){return i||Lr(f),new i(f.valueOf(),0)}},{from:"number",to:"Fraction",convert:function(f){u||Gr(f);var l=new u(f);if(l.valueOf()!==f)throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: "+f+"). Use function fraction(x) to convert to Fraction.");return l}},{from:"string",to:"number",convert:function(f){var l=Number(f);if(isNaN(l))throw new Error('Cannot convert "'+f+'" to a number');return l}},{from:"string",to:"BigNumber",convert:function(f){n||qr(f);try{return new n(f)}catch{throw new Error('Cannot convert "'+f+'" to BigNumber')}}},{from:"string",to:"bigint",convert:function(f){try{return BigInt(f)}catch{throw new Error('Cannot convert "'+f+'" to BigInt')}}},{from:"string",to:"Fraction",convert:function(f){u||Gr(f);try{return new u(f)}catch{throw new Error('Cannot convert "'+f+'" to Fraction')}}},{from:"string",to:"Complex",convert:function(f){i||Lr(f);try{return new i(f)}catch{throw new Error('Cannot convert "'+f+'" to Complex')}}},{from:"boolean",to:"number",convert:function(f){return+f}},{from:"boolean",to:"BigNumber",convert:function(f){return n||qr(f),new n(+f)}},{from:"boolean",to:"bigint",convert:function(f){return BigInt(+f)}},{from:"boolean",to:"Fraction",convert:function(f){return u||Gr(f),new u(+f)}},{from:"boolean",to:"string",convert:function(f){return String(f)}},{from:"Array",to:"Matrix",convert:function(f){return t||oo(),new t(f)}},{from:"Matrix",to:"Array",convert:function(f){return f.valueOf()}}]),o.onMismatch=(s,f,l)=>{var a=o.createError(s,f,l);if(["wrongType","mismatch"].includes(a.data.category)&&f.length===1&&Yr(f[0])&&l.some(p=>!p.params.includes(","))){var h=new TypeError("Function '".concat(s,"' doesn't apply to matrices. To call it ")+"elementwise on a matrix 'M', try 'map(M, ".concat(s,")'."));throw h.data=a.data,h}throw a},o.onMismatch=(s,f,l)=>{var a=o.createError(s,f,l);if(["wrongType","mismatch"].includes(a.data.category)&&f.length===1&&Yr(f[0])&&l.some(p=>!p.params.includes(","))){var h=new TypeError("Function '".concat(s,"' doesn't apply to matrices. To call it ")+"elementwise on a matrix 'M', try 'map(M, ".concat(s,")'."));throw h.data=a.data,h}throw a},o});function qr(e){throw new Error("Cannot convert value ".concat(e," into a BigNumber: no class 'BigNumber' provided"))}function Lr(e){throw new Error("Cannot convert value ".concat(e," into a Complex number: no class 'Complex' provided"))}function oo(){throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided")}function Gr(e){throw new Error("Cannot convert value ".concat(e," into a Fraction, no class 'Fraction' provided."))}/*!
 *  decimal.js v10.6.0
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */var Ar=9e15,dr=1e9,wn="0123456789abcdef",Kr="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",Qr="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",Fn={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-Ar,maxE:Ar,crypto:!1},Mt,or,K=!0,on="[DecimalError] ",hr=on+"Invalid argument: ",Tt=on+"Precision limit exceeded",It=on+"crypto unavailable",xt="[object Decimal]",ze=Math.floor,Se=Math.pow,so=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,ao=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,co=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,Ot=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,Qe=1e7,J=7,fo=9007199254740991,lo=Kr.length-1,En=Qr.length-1,O={toStringTag:xt};O.absoluteValue=O.abs=function(){var e=new this.constructor(this);return e.s<0&&(e.s=1),H(e)};O.ceil=function(){return H(new this.constructor(this),this.e+1,2)};O.clampedTo=O.clamp=function(e,r){var n,i=this,t=i.constructor;if(e=new t(e),r=new t(r),!e.s||!r.s)return new t(NaN);if(e.gt(r))throw Error(hr+r);return n=i.cmp(e),n<0?e:i.cmp(r)>0?r:new t(i)};O.comparedTo=O.cmp=function(e){var r,n,i,t,u=this,o=u.d,s=(e=new u.constructor(e)).d,f=u.s,l=e.s;if(!o||!s)return!f||!l?NaN:f!==l?f:o===s?0:!o^f<0?1:-1;if(!o[0]||!s[0])return o[0]?f:s[0]?-l:0;if(f!==l)return f;if(u.e!==e.e)return u.e>e.e^f<0?1:-1;for(i=o.length,t=s.length,r=0,n=i<t?i:t;r<n;++r)if(o[r]!==s[r])return o[r]>s[r]^f<0?1:-1;return i===t?0:i>t^f<0?1:-1};O.cosine=O.cos=function(){var e,r,n=this,i=n.constructor;return n.d?n.d[0]?(e=i.precision,r=i.rounding,i.precision=e+Math.max(n.e,n.sd())+J,i.rounding=1,n=ho(i,Ut(i,n)),i.precision=e,i.rounding=r,H(or==2||or==3?n.neg():n,e,r,!0)):new i(1):new i(NaN)};O.cubeRoot=O.cbrt=function(){var e,r,n,i,t,u,o,s,f,l,a=this,h=a.constructor;if(!a.isFinite()||a.isZero())return new h(a);for(K=!1,u=a.s*Se(a.s*a,1/3),!u||Math.abs(u)==1/0?(n=Oe(a.d),e=a.e,(u=(e-n.length+1)%3)&&(n+=u==1||u==-2?"0":"00"),u=Se(n,1/3),e=ze((e+1)/3)-(e%3==(e<0?-1:2)),u==1/0?n="5e"+e:(n=u.toExponential(),n=n.slice(0,n.indexOf("e")+1)+e),i=new h(n),i.s=a.s):i=new h(u.toString()),o=(e=h.precision)+3;;)if(s=i,f=s.times(s).times(s),l=f.plus(a),i=fe(l.plus(a).times(s),l.plus(f),o+2,1),Oe(s.d).slice(0,o)===(n=Oe(i.d)).slice(0,o))if(n=n.slice(o-3,o+1),n=="9999"||!t&&n=="4999"){if(!t&&(H(s,e+1,0),s.times(s).times(s).eq(a))){i=s;break}o+=4,t=1}else{(!+n||!+n.slice(1)&&n.charAt(0)=="5")&&(H(i,e+1,1),r=!i.times(i).times(i).eq(a));break}return K=!0,H(i,e,h.rounding,r)};O.decimalPlaces=O.dp=function(){var e,r=this.d,n=NaN;if(r){if(e=r.length-1,n=(e-ze(this.e/J))*J,e=r[e],e)for(;e%10==0;e/=10)n--;n<0&&(n=0)}return n};O.dividedBy=O.div=function(e){return fe(this,new this.constructor(e))};O.dividedToIntegerBy=O.divToInt=function(e){var r=this,n=r.constructor;return H(fe(r,new n(e),0,1,1),n.precision,n.rounding)};O.equals=O.eq=function(e){return this.cmp(e)===0};O.floor=function(){return H(new this.constructor(this),this.e+1,3)};O.greaterThan=O.gt=function(e){return this.cmp(e)>0};O.greaterThanOrEqualTo=O.gte=function(e){var r=this.cmp(e);return r==1||r===0};O.hyperbolicCosine=O.cosh=function(){var e,r,n,i,t,u=this,o=u.constructor,s=new o(1);if(!u.isFinite())return new o(u.s?1/0:NaN);if(u.isZero())return s;n=o.precision,i=o.rounding,o.precision=n+Math.max(u.e,u.sd())+4,o.rounding=1,t=u.d.length,t<32?(e=Math.ceil(t/3),r=(1/an(4,e)).toString()):(e=16,r="2.3283064365386962890625e-10"),u=Mr(o,1,u.times(r),new o(1),!0);for(var f,l=e,a=new o(8);l--;)f=u.times(u),u=s.minus(f.times(a.minus(f.times(a))));return H(u,o.precision=n,o.rounding=i,!0)};O.hyperbolicSine=O.sinh=function(){var e,r,n,i,t=this,u=t.constructor;if(!t.isFinite()||t.isZero())return new u(t);if(r=u.precision,n=u.rounding,u.precision=r+Math.max(t.e,t.sd())+4,u.rounding=1,i=t.d.length,i<3)t=Mr(u,2,t,t,!0);else{e=1.4*Math.sqrt(i),e=e>16?16:e|0,t=t.times(1/an(5,e)),t=Mr(u,2,t,t,!0);for(var o,s=new u(5),f=new u(16),l=new u(20);e--;)o=t.times(t),t=t.times(s.plus(o.times(f.times(o).plus(l))))}return u.precision=r,u.rounding=n,H(t,r,n,!0)};O.hyperbolicTangent=O.tanh=function(){var e,r,n=this,i=n.constructor;return n.isFinite()?n.isZero()?new i(n):(e=i.precision,r=i.rounding,i.precision=e+7,i.rounding=1,fe(n.sinh(),n.cosh(),i.precision=e,i.rounding=r)):new i(n.s)};O.inverseCosine=O.acos=function(){var e=this,r=e.constructor,n=e.abs().cmp(1),i=r.precision,t=r.rounding;return n!==-1?n===0?e.isNeg()?rr(r,i,t):new r(0):new r(NaN):e.isZero()?rr(r,i+4,t).times(.5):(r.precision=i+6,r.rounding=1,e=new r(1).minus(e).div(e.plus(1)).sqrt().atan(),r.precision=i,r.rounding=t,e.times(2))};O.inverseHyperbolicCosine=O.acosh=function(){var e,r,n=this,i=n.constructor;return n.lte(1)?new i(n.eq(1)?0:NaN):n.isFinite()?(e=i.precision,r=i.rounding,i.precision=e+Math.max(Math.abs(n.e),n.sd())+4,i.rounding=1,K=!1,n=n.times(n).minus(1).sqrt().plus(n),K=!0,i.precision=e,i.rounding=r,n.ln()):new i(n)};O.inverseHyperbolicSine=O.asinh=function(){var e,r,n=this,i=n.constructor;return!n.isFinite()||n.isZero()?new i(n):(e=i.precision,r=i.rounding,i.precision=e+2*Math.max(Math.abs(n.e),n.sd())+6,i.rounding=1,K=!1,n=n.times(n).plus(1).sqrt().plus(n),K=!0,i.precision=e,i.rounding=r,n.ln())};O.inverseHyperbolicTangent=O.atanh=function(){var e,r,n,i,t=this,u=t.constructor;return t.isFinite()?t.e>=0?new u(t.abs().eq(1)?t.s/0:t.isZero()?t:NaN):(e=u.precision,r=u.rounding,i=t.sd(),Math.max(i,e)<2*-t.e-1?H(new u(t),e,r,!0):(u.precision=n=i-t.e,t=fe(t.plus(1),new u(1).minus(t),n+e,1),u.precision=e+4,u.rounding=1,t=t.ln(),u.precision=e,u.rounding=r,t.times(.5))):new u(NaN)};O.inverseSine=O.asin=function(){var e,r,n,i,t=this,u=t.constructor;return t.isZero()?new u(t):(r=t.abs().cmp(1),n=u.precision,i=u.rounding,r!==-1?r===0?(e=rr(u,n+4,i).times(.5),e.s=t.s,e):new u(NaN):(u.precision=n+6,u.rounding=1,t=t.div(new u(1).minus(t.times(t)).sqrt().plus(1)).atan(),u.precision=n,u.rounding=i,t.times(2)))};O.inverseTangent=O.atan=function(){var e,r,n,i,t,u,o,s,f,l=this,a=l.constructor,h=a.precision,p=a.rounding;if(l.isFinite()){if(l.isZero())return new a(l);if(l.abs().eq(1)&&h+4<=En)return o=rr(a,h+4,p).times(.25),o.s=l.s,o}else{if(!l.s)return new a(NaN);if(h+4<=En)return o=rr(a,h+4,p).times(.5),o.s=l.s,o}for(a.precision=s=h+10,a.rounding=1,n=Math.min(28,s/J+2|0),e=n;e;--e)l=l.div(l.times(l).plus(1).sqrt().plus(1));for(K=!1,r=Math.ceil(s/J),i=1,f=l.times(l),o=new a(l),t=l;e!==-1;)if(t=t.times(f),u=o.minus(t.div(i+=2)),t=t.times(f),o=u.plus(t.div(i+=2)),o.d[r]!==void 0)for(e=r;o.d[e]===u.d[e]&&e--;);return n&&(o=o.times(2<<n-1)),K=!0,H(o,a.precision=h,a.rounding=p,!0)};O.isFinite=function(){return!!this.d};O.isInteger=O.isInt=function(){return!!this.d&&ze(this.e/J)>this.d.length-2};O.isNaN=function(){return!this.s};O.isNegative=O.isNeg=function(){return this.s<0};O.isPositive=O.isPos=function(){return this.s>0};O.isZero=function(){return!!this.d&&this.d[0]===0};O.lessThan=O.lt=function(e){return this.cmp(e)<0};O.lessThanOrEqualTo=O.lte=function(e){return this.cmp(e)<1};O.logarithm=O.log=function(e){var r,n,i,t,u,o,s,f,l=this,a=l.constructor,h=a.precision,p=a.rounding,d=5;if(e==null)e=new a(10),r=!0;else{if(e=new a(e),n=e.d,e.s<0||!n||!n[0]||e.eq(1))return new a(NaN);r=e.eq(10)}if(n=l.d,l.s<0||!n||!n[0]||l.eq(1))return new a(n&&!n[0]?-1/0:l.s!=1?NaN:n?0:1/0);if(r)if(n.length>1)u=!0;else{for(t=n[0];t%10===0;)t/=10;u=t!==1}if(K=!1,s=h+d,o=fr(l,s),i=r?en(a,s+10):fr(e,s),f=fe(o,i,s,1),Rr(f.d,t=h,p))do if(s+=10,o=fr(l,s),i=r?en(a,s+10):fr(e,s),f=fe(o,i,s,1),!u){+Oe(f.d).slice(t+1,t+15)+1==1e14&&(f=H(f,h+1,0));break}while(Rr(f.d,t+=10,p));return K=!0,H(f,h,p)};O.minus=O.sub=function(e){var r,n,i,t,u,o,s,f,l,a,h,p,d=this,g=d.constructor;if(e=new g(e),!d.d||!e.d)return!d.s||!e.s?e=new g(NaN):d.d?e.s=-e.s:e=new g(e.d||d.s!==e.s?d:NaN),e;if(d.s!=e.s)return e.s=-e.s,d.plus(e);if(l=d.d,p=e.d,s=g.precision,f=g.rounding,!l[0]||!p[0]){if(p[0])e.s=-e.s;else if(l[0])e=new g(d);else return new g(f===3?-0:0);return K?H(e,s,f):e}if(n=ze(e.e/J),a=ze(d.e/J),l=l.slice(),u=a-n,u){for(h=u<0,h?(r=l,u=-u,o=p.length):(r=p,n=a,o=l.length),i=Math.max(Math.ceil(s/J),o)+2,u>i&&(u=i,r.length=1),r.reverse(),i=u;i--;)r.push(0);r.reverse()}else{for(i=l.length,o=p.length,h=i<o,h&&(o=i),i=0;i<o;i++)if(l[i]!=p[i]){h=l[i]<p[i];break}u=0}for(h&&(r=l,l=p,p=r,e.s=-e.s),o=l.length,i=p.length-o;i>0;--i)l[o++]=0;for(i=p.length;i>u;){if(l[--i]<p[i]){for(t=i;t&&l[--t]===0;)l[t]=Qe-1;--l[t],l[i]+=Qe}l[i]-=p[i]}for(;l[--o]===0;)l.pop();for(;l[0]===0;l.shift())--n;return l[0]?(e.d=l,e.e=sn(l,n),K?H(e,s,f):e):new g(f===3?-0:0)};O.modulo=O.mod=function(e){var r,n=this,i=n.constructor;return e=new i(e),!n.d||!e.s||e.d&&!e.d[0]?new i(NaN):!e.d||n.d&&!n.d[0]?H(new i(n),i.precision,i.rounding):(K=!1,i.modulo==9?(r=fe(n,e.abs(),0,3,1),r.s*=e.s):r=fe(n,e,0,i.modulo,1),r=r.times(e),K=!0,n.minus(r))};O.naturalExponential=O.exp=function(){return Cn(this)};O.naturalLogarithm=O.ln=function(){return fr(this)};O.negated=O.neg=function(){var e=new this.constructor(this);return e.s=-e.s,H(e)};O.plus=O.add=function(e){var r,n,i,t,u,o,s,f,l,a,h=this,p=h.constructor;if(e=new p(e),!h.d||!e.d)return!h.s||!e.s?e=new p(NaN):h.d||(e=new p(e.d||h.s===e.s?h:NaN)),e;if(h.s!=e.s)return e.s=-e.s,h.minus(e);if(l=h.d,a=e.d,s=p.precision,f=p.rounding,!l[0]||!a[0])return a[0]||(e=new p(h)),K?H(e,s,f):e;if(u=ze(h.e/J),i=ze(e.e/J),l=l.slice(),t=u-i,t){for(t<0?(n=l,t=-t,o=a.length):(n=a,i=u,o=l.length),u=Math.ceil(s/J),o=u>o?u+1:o+1,t>o&&(t=o,n.length=1),n.reverse();t--;)n.push(0);n.reverse()}for(o=l.length,t=a.length,o-t<0&&(t=o,n=a,a=l,l=n),r=0;t;)r=(l[--t]=l[t]+a[t]+r)/Qe|0,l[t]%=Qe;for(r&&(l.unshift(r),++i),o=l.length;l[--o]==0;)l.pop();return e.d=l,e.e=sn(l,i),K?H(e,s,f):e};O.precision=O.sd=function(e){var r,n=this;if(e!==void 0&&e!==!!e&&e!==1&&e!==0)throw Error(hr+e);return n.d?(r=Pt(n.d),e&&n.e+1>r&&(r=n.e+1)):r=NaN,r};O.round=function(){var e=this,r=e.constructor;return H(new r(e),e.e+1,r.rounding)};O.sine=O.sin=function(){var e,r,n=this,i=n.constructor;return n.isFinite()?n.isZero()?new i(n):(e=i.precision,r=i.rounding,i.precision=e+Math.max(n.e,n.sd())+J,i.rounding=1,n=go(i,Ut(i,n)),i.precision=e,i.rounding=r,H(or>2?n.neg():n,e,r,!0)):new i(NaN)};O.squareRoot=O.sqrt=function(){var e,r,n,i,t,u,o=this,s=o.d,f=o.e,l=o.s,a=o.constructor;if(l!==1||!s||!s[0])return new a(!l||l<0&&(!s||s[0])?NaN:s?o:1/0);for(K=!1,l=Math.sqrt(+o),l==0||l==1/0?(r=Oe(s),(r.length+f)%2==0&&(r+="0"),l=Math.sqrt(r),f=ze((f+1)/2)-(f<0||f%2),l==1/0?r="5e"+f:(r=l.toExponential(),r=r.slice(0,r.indexOf("e")+1)+f),i=new a(r)):i=new a(l.toString()),n=(f=a.precision)+3;;)if(u=i,i=u.plus(fe(o,u,n+2,1)).times(.5),Oe(u.d).slice(0,n)===(r=Oe(i.d)).slice(0,n))if(r=r.slice(n-3,n+1),r=="9999"||!t&&r=="4999"){if(!t&&(H(u,f+1,0),u.times(u).eq(o))){i=u;break}n+=4,t=1}else{(!+r||!+r.slice(1)&&r.charAt(0)=="5")&&(H(i,f+1,1),e=!i.times(i).eq(o));break}return K=!0,H(i,f,a.rounding,e)};O.tangent=O.tan=function(){var e,r,n=this,i=n.constructor;return n.isFinite()?n.isZero()?new i(n):(e=i.precision,r=i.rounding,i.precision=e+10,i.rounding=1,n=n.sin(),n.s=1,n=fe(n,new i(1).minus(n.times(n)).sqrt(),e+10,0),i.precision=e,i.rounding=r,H(or==2||or==4?n.neg():n,e,r,!0)):new i(NaN)};O.times=O.mul=function(e){var r,n,i,t,u,o,s,f,l,a=this,h=a.constructor,p=a.d,d=(e=new h(e)).d;if(e.s*=a.s,!p||!p[0]||!d||!d[0])return new h(!e.s||p&&!p[0]&&!d||d&&!d[0]&&!p?NaN:!p||!d?e.s/0:e.s*0);for(n=ze(a.e/J)+ze(e.e/J),f=p.length,l=d.length,f<l&&(u=p,p=d,d=u,o=f,f=l,l=o),u=[],o=f+l,i=o;i--;)u.push(0);for(i=l;--i>=0;){for(r=0,t=f+i;t>i;)s=u[t]+d[i]*p[t-i-1]+r,u[t--]=s%Qe|0,r=s/Qe|0;u[t]=(u[t]+r)%Qe|0}for(;!u[--o];)u.pop();return r?++n:u.shift(),e.d=u,e.e=sn(u,n),K?H(e,h.precision,h.rounding):e};O.toBinary=function(e,r){return Mn(this,2,e,r)};O.toDecimalPlaces=O.toDP=function(e,r){var n=this,i=n.constructor;return n=new i(n),e===void 0?n:(Le(e,0,dr),r===void 0?r=i.rounding:Le(r,0,8),H(n,e+n.e+1,r))};O.toExponential=function(e,r){var n,i=this,t=i.constructor;return e===void 0?n=nr(i,!0):(Le(e,0,dr),r===void 0?r=t.rounding:Le(r,0,8),i=H(new t(i),e+1,r),n=nr(i,!0,e+1)),i.isNeg()&&!i.isZero()?"-"+n:n};O.toFixed=function(e,r){var n,i,t=this,u=t.constructor;return e===void 0?n=nr(t):(Le(e,0,dr),r===void 0?r=u.rounding:Le(r,0,8),i=H(new u(t),e+t.e+1,r),n=nr(i,!1,e+i.e+1)),t.isNeg()&&!t.isZero()?"-"+n:n};O.toFraction=function(e){var r,n,i,t,u,o,s,f,l,a,h,p,d=this,g=d.d,c=d.constructor;if(!g)return new c(d);if(l=n=new c(1),i=f=new c(0),r=new c(i),u=r.e=Pt(g)-d.e-1,o=u%J,r.d[0]=Se(10,o<0?J+o:o),e==null)e=u>0?r:l;else{if(s=new c(e),!s.isInt()||s.lt(l))throw Error(hr+s);e=s.gt(r)?u>0?r:l:s}for(K=!1,s=new c(Oe(g)),a=c.precision,c.precision=u=g.length*J*2;h=fe(s,r,0,1,1),t=n.plus(h.times(i)),t.cmp(e)!=1;)n=i,i=t,t=l,l=f.plus(h.times(t)),f=t,t=r,r=s.minus(h.times(t)),s=t;return t=fe(e.minus(n),i,0,1,1),f=f.plus(t.times(l)),n=n.plus(t.times(i)),f.s=l.s=d.s,p=fe(l,i,u,1).minus(d).abs().cmp(fe(f,n,u,1).minus(d).abs())<1?[l,i]:[f,n],c.precision=a,K=!0,p};O.toHexadecimal=O.toHex=function(e,r){return Mn(this,16,e,r)};O.toNearest=function(e,r){var n=this,i=n.constructor;if(n=new i(n),e==null){if(!n.d)return n;e=new i(1),r=i.rounding}else{if(e=new i(e),r===void 0?r=i.rounding:Le(r,0,8),!n.d)return e.s?n:e;if(!e.d)return e.s&&(e.s=n.s),e}return e.d[0]?(K=!1,n=fe(n,e,0,r,1).times(e),K=!0,H(n)):(e.s=n.s,n=e),n};O.toNumber=function(){return+this};O.toOctal=function(e,r){return Mn(this,8,e,r)};O.toPower=O.pow=function(e){var r,n,i,t,u,o,s=this,f=s.constructor,l=+(e=new f(e));if(!s.d||!e.d||!s.d[0]||!e.d[0])return new f(Se(+s,l));if(s=new f(s),s.eq(1))return s;if(i=f.precision,u=f.rounding,e.eq(1))return H(s,i,u);if(r=ze(e.e/J),r>=e.d.length-1&&(n=l<0?-l:l)<=fo)return t=zt(f,s,n,i),e.s<0?new f(1).div(t):H(t,i,u);if(o=s.s,o<0){if(r<e.d.length-1)return new f(NaN);if(e.d[r]&1||(o=1),s.e==0&&s.d[0]==1&&s.d.length==1)return s.s=o,s}return n=Se(+s,l),r=n==0||!isFinite(n)?ze(l*(Math.log("0."+Oe(s.d))/Math.LN10+s.e+1)):new f(n+"").e,r>f.maxE+1||r<f.minE-1?new f(r>0?o/0:0):(K=!1,f.rounding=s.s=1,n=Math.min(12,(r+"").length),t=Cn(e.times(fr(s,i+n)),i),t.d&&(t=H(t,i+5,1),Rr(t.d,i,u)&&(r=i+10,t=H(Cn(e.times(fr(s,r+n)),r),r+5,1),+Oe(t.d).slice(i+1,i+15)+1==1e14&&(t=H(t,i+1,0)))),t.s=o,K=!0,f.rounding=u,H(t,i,u))};O.toPrecision=function(e,r){var n,i=this,t=i.constructor;return e===void 0?n=nr(i,i.e<=t.toExpNeg||i.e>=t.toExpPos):(Le(e,1,dr),r===void 0?r=t.rounding:Le(r,0,8),i=H(new t(i),e,r),n=nr(i,e<=i.e||i.e<=t.toExpNeg,e)),i.isNeg()&&!i.isZero()?"-"+n:n};O.toSignificantDigits=O.toSD=function(e,r){var n=this,i=n.constructor;return e===void 0?(e=i.precision,r=i.rounding):(Le(e,1,dr),r===void 0?r=i.rounding:Le(r,0,8)),H(new i(n),e,r)};O.toString=function(){var e=this,r=e.constructor,n=nr(e,e.e<=r.toExpNeg||e.e>=r.toExpPos);return e.isNeg()&&!e.isZero()?"-"+n:n};O.truncated=O.trunc=function(){return H(new this.constructor(this),this.e+1,1)};O.valueOf=O.toJSON=function(){var e=this,r=e.constructor,n=nr(e,e.e<=r.toExpNeg||e.e>=r.toExpPos);return e.isNeg()?"-"+n:n};function Oe(e){var r,n,i,t=e.length-1,u="",o=e[0];if(t>0){for(u+=o,r=1;r<t;r++)i=e[r]+"",n=J-i.length,n&&(u+=cr(n)),u+=i;o=e[r],i=o+"",n=J-i.length,n&&(u+=cr(n))}else if(o===0)return"0";for(;o%10===0;)o/=10;return u+o}function Le(e,r,n){if(e!==~~e||e<r||e>n)throw Error(hr+e)}function Rr(e,r,n,i){var t,u,o,s;for(u=e[0];u>=10;u/=10)--r;return--r<0?(r+=J,t=0):(t=Math.ceil((r+1)/J),r%=J),u=Se(10,J-r),s=e[t]%u|0,i==null?r<3?(r==0?s=s/100|0:r==1&&(s=s/10|0),o=n<4&&s==99999||n>3&&s==49999||s==5e4||s==0):o=(n<4&&s+1==u||n>3&&s+1==u/2)&&(e[t+1]/u/100|0)==Se(10,r-2)-1||(s==u/2||s==0)&&(e[t+1]/u/100|0)==0:r<4?(r==0?s=s/1e3|0:r==1?s=s/100|0:r==2&&(s=s/10|0),o=(i||n<4)&&s==9999||!i&&n>3&&s==4999):o=((i||n<4)&&s+1==u||!i&&n>3&&s+1==u/2)&&(e[t+1]/u/1e3|0)==Se(10,r-3)-1,o}function Wr(e,r,n){for(var i,t=[0],u,o=0,s=e.length;o<s;){for(u=t.length;u--;)t[u]*=r;for(t[0]+=wn.indexOf(e.charAt(o++)),i=0;i<t.length;i++)t[i]>n-1&&(t[i+1]===void 0&&(t[i+1]=0),t[i+1]+=t[i]/n|0,t[i]%=n)}return t.reverse()}function ho(e,r){var n,i,t;if(r.isZero())return r;i=r.d.length,i<32?(n=Math.ceil(i/3),t=(1/an(4,n)).toString()):(n=16,t="2.3283064365386962890625e-10"),e.precision+=n,r=Mr(e,1,r.times(t),new e(1));for(var u=n;u--;){var o=r.times(r);r=o.times(o).minus(o).times(8).plus(1)}return e.precision-=n,r}var fe=function(){function e(i,t,u){var o,s=0,f=i.length;for(i=i.slice();f--;)o=i[f]*t+s,i[f]=o%u|0,s=o/u|0;return s&&i.unshift(s),i}function r(i,t,u,o){var s,f;if(u!=o)f=u>o?1:-1;else for(s=f=0;s<u;s++)if(i[s]!=t[s]){f=i[s]>t[s]?1:-1;break}return f}function n(i,t,u,o){for(var s=0;u--;)i[u]-=s,s=i[u]<t[u]?1:0,i[u]=s*o+i[u]-t[u];for(;!i[0]&&i.length>1;)i.shift()}return function(i,t,u,o,s,f){var l,a,h,p,d,g,c,m,w,C,F,A,y,D,b,B,N,M,I,q,W=i.constructor,Z=i.s==t.s?1:-1,L=i.d,$=t.d;if(!L||!L[0]||!$||!$[0])return new W(!i.s||!t.s||(L?$&&L[0]==$[0]:!$)?NaN:L&&L[0]==0||!$?Z*0:Z/0);for(f?(d=1,a=i.e-t.e):(f=Qe,d=J,a=ze(i.e/d)-ze(t.e/d)),I=$.length,N=L.length,w=new W(Z),C=w.d=[],h=0;$[h]==(L[h]||0);h++);if($[h]>(L[h]||0)&&a--,u==null?(D=u=W.precision,o=W.rounding):s?D=u+(i.e-t.e)+1:D=u,D<0)C.push(1),g=!0;else{if(D=D/d+2|0,h=0,I==1){for(p=0,$=$[0],D++;(h<N||p)&&D--;h++)b=p*f+(L[h]||0),C[h]=b/$|0,p=b%$|0;g=p||h<N}else{for(p=f/($[0]+1)|0,p>1&&($=e($,p,f),L=e(L,p,f),I=$.length,N=L.length),B=I,F=L.slice(0,I),A=F.length;A<I;)F[A++]=0;q=$.slice(),q.unshift(0),M=$[0],$[1]>=f/2&&++M;do p=0,l=r($,F,I,A),l<0?(y=F[0],I!=A&&(y=y*f+(F[1]||0)),p=y/M|0,p>1?(p>=f&&(p=f-1),c=e($,p,f),m=c.length,A=F.length,l=r(c,F,m,A),l==1&&(p--,n(c,I<m?q:$,m,f))):(p==0&&(l=p=1),c=$.slice()),m=c.length,m<A&&c.unshift(0),n(F,c,A,f),l==-1&&(A=F.length,l=r($,F,I,A),l<1&&(p++,n(F,I<A?q:$,A,f))),A=F.length):l===0&&(p++,F=[0]),C[h++]=p,l&&F[0]?F[A++]=L[B]||0:(F=[L[B]],A=1);while((B++<N||F[0]!==void 0)&&D--);g=F[0]!==void 0}C[0]||C.shift()}if(d==1)w.e=a,Mt=g;else{for(h=1,p=C[0];p>=10;p/=10)h++;w.e=h+a*d-1,H(w,s?u+w.e+1:u,o,g)}return w}}();function H(e,r,n,i){var t,u,o,s,f,l,a,h,p,d=e.constructor;e:if(r!=null){if(h=e.d,!h)return e;for(t=1,s=h[0];s>=10;s/=10)t++;if(u=r-t,u<0)u+=J,o=r,a=h[p=0],f=a/Se(10,t-o-1)%10|0;else if(p=Math.ceil((u+1)/J),s=h.length,p>=s)if(i){for(;s++<=p;)h.push(0);a=f=0,t=1,u%=J,o=u-J+1}else break e;else{for(a=s=h[p],t=1;s>=10;s/=10)t++;u%=J,o=u-J+t,f=o<0?0:a/Se(10,t-o-1)%10|0}if(i=i||r<0||h[p+1]!==void 0||(o<0?a:a%Se(10,t-o-1)),l=n<4?(f||i)&&(n==0||n==(e.s<0?3:2)):f>5||f==5&&(n==4||i||n==6&&(u>0?o>0?a/Se(10,t-o):0:h[p-1])%10&1||n==(e.s<0?8:7)),r<1||!h[0])return h.length=0,l?(r-=e.e+1,h[0]=Se(10,(J-r%J)%J),e.e=-r||0):h[0]=e.e=0,e;if(u==0?(h.length=p,s=1,p--):(h.length=p+1,s=Se(10,J-u),h[p]=o>0?(a/Se(10,t-o)%Se(10,o)|0)*s:0),l)for(;;)if(p==0){for(u=1,o=h[0];o>=10;o/=10)u++;for(o=h[0]+=s,s=1;o>=10;o/=10)s++;u!=s&&(e.e++,h[0]==Qe&&(h[0]=1));break}else{if(h[p]+=s,h[p]!=Qe)break;h[p--]=0,s=1}for(u=h.length;h[--u]===0;)h.pop()}return K&&(e.e>d.maxE?(e.d=null,e.e=NaN):e.e<d.minE&&(e.e=0,e.d=[0])),e}function nr(e,r,n){if(!e.isFinite())return $t(e);var i,t=e.e,u=Oe(e.d),o=u.length;return r?(n&&(i=n-o)>0?u=u.charAt(0)+"."+u.slice(1)+cr(i):o>1&&(u=u.charAt(0)+"."+u.slice(1)),u=u+(e.e<0?"e":"e+")+e.e):t<0?(u="0."+cr(-t-1)+u,n&&(i=n-o)>0&&(u+=cr(i))):t>=o?(u+=cr(t+1-o),n&&(i=n-t-1)>0&&(u=u+"."+cr(i))):((i=t+1)<o&&(u=u.slice(0,i)+"."+u.slice(i)),n&&(i=n-o)>0&&(t+1===o&&(u+="."),u+=cr(i))),u}function sn(e,r){var n=e[0];for(r*=J;n>=10;n/=10)r++;return r}function en(e,r,n){if(r>lo)throw K=!0,n&&(e.precision=n),Error(Tt);return H(new e(Kr),r,1,!0)}function rr(e,r,n){if(r>En)throw Error(Tt);return H(new e(Qr),r,n,!0)}function Pt(e){var r=e.length-1,n=r*J+1;if(r=e[r],r){for(;r%10==0;r/=10)n--;for(r=e[0];r>=10;r/=10)n++}return n}function cr(e){for(var r="";e--;)r+="0";return r}function zt(e,r,n,i){var t,u=new e(1),o=Math.ceil(i/J+4);for(K=!1;;){if(n%2&&(u=u.times(r),Hn(u.d,o)&&(t=!0)),n=ze(n/2),n===0){n=u.d.length-1,t&&u.d[n]===0&&++u.d[n];break}r=r.times(r),Hn(r.d,o)}return K=!0,u}function Gn(e){return e.d[e.d.length-1]&1}function Rt(e,r,n){for(var i,t,u=new e(r[0]),o=0;++o<r.length;){if(t=new e(r[o]),!t.s){u=t;break}i=u.cmp(t),(i===n||i===0&&u.s===n)&&(u=t)}return u}function Cn(e,r){var n,i,t,u,o,s,f,l=0,a=0,h=0,p=e.constructor,d=p.rounding,g=p.precision;if(!e.d||!e.d[0]||e.e>17)return new p(e.d?e.d[0]?e.s<0?0:1/0:1:e.s?e.s<0?0:e:NaN);for(r==null?(K=!1,f=g):f=r,s=new p(.03125);e.e>-2;)e=e.times(s),h+=5;for(i=Math.log(Se(2,h))/Math.LN10*2+5|0,f+=i,n=u=o=new p(1),p.precision=f;;){if(u=H(u.times(e),f,1),n=n.times(++a),s=o.plus(fe(u,n,f,1)),Oe(s.d).slice(0,f)===Oe(o.d).slice(0,f)){for(t=h;t--;)o=H(o.times(o),f,1);if(r==null)if(l<3&&Rr(o.d,f-i,d,l))p.precision=f+=10,n=u=s=new p(1),a=0,l++;else return H(o,p.precision=g,d,K=!0);else return p.precision=g,o}o=s}}function fr(e,r){var n,i,t,u,o,s,f,l,a,h,p,d=1,g=10,c=e,m=c.d,w=c.constructor,C=w.rounding,F=w.precision;if(c.s<0||!m||!m[0]||!c.e&&m[0]==1&&m.length==1)return new w(m&&!m[0]?-1/0:c.s!=1?NaN:m?0:c);if(r==null?(K=!1,a=F):a=r,w.precision=a+=g,n=Oe(m),i=n.charAt(0),Math.abs(u=c.e)<15e14){for(;i<7&&i!=1||i==1&&n.charAt(1)>3;)c=c.times(e),n=Oe(c.d),i=n.charAt(0),d++;u=c.e,i>1?(c=new w("0."+n),u++):c=new w(i+"."+n.slice(1))}else return l=en(w,a+2,F).times(u+""),c=fr(new w(i+"."+n.slice(1)),a-g).plus(l),w.precision=F,r==null?H(c,F,C,K=!0):c;for(h=c,f=o=c=fe(c.minus(1),c.plus(1),a,1),p=H(c.times(c),a,1),t=3;;){if(o=H(o.times(p),a,1),l=f.plus(fe(o,new w(t),a,1)),Oe(l.d).slice(0,a)===Oe(f.d).slice(0,a))if(f=f.times(2),u!==0&&(f=f.plus(en(w,a+2,F).times(u+""))),f=fe(f,new w(d),a,1),r==null)if(Rr(f.d,a-g,C,s))w.precision=a+=g,l=o=c=fe(h.minus(1),h.plus(1),a,1),p=H(c.times(c),a,1),t=s=1;else return H(f,w.precision=F,C,K=!0);else return w.precision=F,f;f=l,t+=2}}function $t(e){return String(e.s*e.s/0)}function Zr(e,r){var n,i,t;for((n=r.indexOf("."))>-1&&(r=r.replace(".","")),(i=r.search(/e/i))>0?(n<0&&(n=i),n+=+r.slice(i+1),r=r.substring(0,i)):n<0&&(n=r.length),i=0;r.charCodeAt(i)===48;i++);for(t=r.length;r.charCodeAt(t-1)===48;--t);if(r=r.slice(i,t),r){if(t-=i,e.e=n=n-i-1,e.d=[],i=(n+1)%J,n<0&&(i+=J),i<t){for(i&&e.d.push(+r.slice(0,i)),t-=J;i<t;)e.d.push(+r.slice(i,i+=J));r=r.slice(i),i=J-r.length}else i-=t;for(;i--;)r+="0";e.d.push(+r),K&&(e.e>e.constructor.maxE?(e.d=null,e.e=NaN):e.e<e.constructor.minE&&(e.e=0,e.d=[0]))}else e.e=0,e.d=[0];return e}function po(e,r){var n,i,t,u,o,s,f,l,a;if(r.indexOf("_")>-1){if(r=r.replace(/(\d)_(?=\d)/g,"$1"),Ot.test(r))return Zr(e,r)}else if(r==="Infinity"||r==="NaN")return+r||(e.s=NaN),e.e=NaN,e.d=null,e;if(ao.test(r))n=16,r=r.toLowerCase();else if(so.test(r))n=2;else if(co.test(r))n=8;else throw Error(hr+r);for(u=r.search(/p/i),u>0?(f=+r.slice(u+1),r=r.substring(2,u)):r=r.slice(2),u=r.indexOf("."),o=u>=0,i=e.constructor,o&&(r=r.replace(".",""),s=r.length,u=s-u,t=zt(i,new i(n),u,u*2)),l=Wr(r,n,Qe),a=l.length-1,u=a;l[u]===0;--u)l.pop();return u<0?new i(e.s*0):(e.e=sn(l,a),e.d=l,K=!1,o&&(e=fe(e,t,s*4)),f&&(e=e.times(Math.abs(f)<54?Se(2,f):Tr.pow(2,f))),K=!0,e)}function go(e,r){var n,i=r.d.length;if(i<3)return r.isZero()?r:Mr(e,2,r,r);n=1.4*Math.sqrt(i),n=n>16?16:n|0,r=r.times(1/an(5,n)),r=Mr(e,2,r,r);for(var t,u=new e(5),o=new e(16),s=new e(20);n--;)t=r.times(r),r=r.times(u.plus(t.times(o.times(t).minus(s))));return r}function Mr(e,r,n,i,t){var u,o,s,f,l=e.precision,a=Math.ceil(l/J);for(K=!1,f=n.times(n),s=new e(i);;){if(o=fe(s.times(f),new e(r++*r++),l,1),s=t?i.plus(o):i.minus(o),i=fe(o.times(f),new e(r++*r++),l,1),o=s.plus(i),o.d[a]!==void 0){for(u=a;o.d[u]===s.d[u]&&u--;);if(u==-1)break}u=s,s=i,i=o,o=u}return K=!0,o.d.length=a+1,o}function an(e,r){for(var n=e;--r;)n*=e;return n}function Ut(e,r){var n,i=r.s<0,t=rr(e,e.precision,1),u=t.times(.5);if(r=r.abs(),r.lte(u))return or=i?4:1,r;if(n=r.divToInt(t),n.isZero())or=i?3:2;else{if(r=r.minus(n.times(t)),r.lte(u))return or=Gn(n)?i?2:3:i?4:1,r;or=Gn(n)?i?1:4:i?3:2}return r.minus(t).abs()}function Mn(e,r,n,i){var t,u,o,s,f,l,a,h,p,d=e.constructor,g=n!==void 0;if(g?(Le(n,1,dr),i===void 0?i=d.rounding:Le(i,0,8)):(n=d.precision,i=d.rounding),!e.isFinite())a=$t(e);else{for(a=nr(e),o=a.indexOf("."),g?(t=2,r==16?n=n*4-3:r==8&&(n=n*3-2)):t=r,o>=0&&(a=a.replace(".",""),p=new d(1),p.e=a.length-o,p.d=Wr(nr(p),10,t),p.e=p.d.length),h=Wr(a,10,t),u=f=h.length;h[--f]==0;)h.pop();if(!h[0])a=g?"0p+0":"0";else{if(o<0?u--:(e=new d(e),e.d=h,e.e=u,e=fe(e,p,n,i,0,t),h=e.d,u=e.e,l=Mt),o=h[n],s=t/2,l=l||h[n+1]!==void 0,l=i<4?(o!==void 0||l)&&(i===0||i===(e.s<0?3:2)):o>s||o===s&&(i===4||l||i===6&&h[n-1]&1||i===(e.s<0?8:7)),h.length=n,l)for(;++h[--n]>t-1;)h[n]=0,n||(++u,h.unshift(1));for(f=h.length;!h[f-1];--f);for(o=0,a="";o<f;o++)a+=wn.charAt(h[o]);if(g){if(f>1)if(r==16||r==8){for(o=r==16?4:3,--f;f%o;f++)a+="0";for(h=Wr(a,t,r),f=h.length;!h[f-1];--f);for(o=1,a="1.";o<f;o++)a+=wn.charAt(h[o])}else a=a.charAt(0)+"."+a.slice(1);a=a+(u<0?"p":"p+")+u}else if(u<0){for(;++u;)a="0"+a;a="0."+a}else if(++u>f)for(u-=f;u--;)a+="0";else u<f&&(a=a.slice(0,u)+"."+a.slice(u))}a=(r==16?"0x":r==2?"0b":r==8?"0o":"")+a}return e.s<0?"-"+a:a}function Hn(e,r){if(e.length>r)return e.length=r,!0}function mo(e){return new this(e).abs()}function Do(e){return new this(e).acos()}function vo(e){return new this(e).acosh()}function yo(e,r){return new this(e).plus(r)}function wo(e){return new this(e).asin()}function Fo(e){return new this(e).asinh()}function Eo(e){return new this(e).atan()}function Co(e){return new this(e).atanh()}function bo(e,r){e=new this(e),r=new this(r);var n,i=this.precision,t=this.rounding,u=i+4;return!e.s||!r.s?n=new this(NaN):!e.d&&!r.d?(n=rr(this,u,1).times(r.s>0?.25:.75),n.s=e.s):!r.d||e.isZero()?(n=r.s<0?rr(this,i,t):new this(0),n.s=e.s):!e.d||r.isZero()?(n=rr(this,u,1).times(.5),n.s=e.s):r.s<0?(this.precision=u,this.rounding=1,n=this.atan(fe(e,r,u,1)),r=rr(this,u,1),this.precision=i,this.rounding=t,n=e.s<0?n.minus(r):n.plus(r)):n=this.atan(fe(e,r,u,1)),n}function Ao(e){return new this(e).cbrt()}function Bo(e){return H(e=new this(e),e.e+1,2)}function No(e,r,n){return new this(e).clamp(r,n)}function _o(e){if(!e||typeof e!="object")throw Error(on+"Object expected");var r,n,i,t=e.defaults===!0,u=["precision",1,dr,"rounding",0,8,"toExpNeg",-Ar,0,"toExpPos",0,Ar,"maxE",0,Ar,"minE",-Ar,0,"modulo",0,9];for(r=0;r<u.length;r+=3)if(n=u[r],t&&(this[n]=Fn[n]),(i=e[n])!==void 0)if(ze(i)===i&&i>=u[r+1]&&i<=u[r+2])this[n]=i;else throw Error(hr+n+": "+i);if(n="crypto",t&&(this[n]=Fn[n]),(i=e[n])!==void 0)if(i===!0||i===!1||i===0||i===1)if(i)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))this[n]=!0;else throw Error(It);else this[n]=!1;else throw Error(hr+n+": "+i);return this}function So(e){return new this(e).cos()}function Mo(e){return new this(e).cosh()}function Vt(e){var r,n,i;function t(u){var o,s,f,l=this;if(!(l instanceof t))return new t(u);if(l.constructor=t,Wn(u)){l.s=u.s,K?!u.d||u.e>t.maxE?(l.e=NaN,l.d=null):u.e<t.minE?(l.e=0,l.d=[0]):(l.e=u.e,l.d=u.d.slice()):(l.e=u.e,l.d=u.d?u.d.slice():u.d);return}if(f=typeof u,f==="number"){if(u===0){l.s=1/u<0?-1:1,l.e=0,l.d=[0];return}if(u<0?(u=-u,l.s=-1):l.s=1,u===~~u&&u<1e7){for(o=0,s=u;s>=10;s/=10)o++;K?o>t.maxE?(l.e=NaN,l.d=null):o<t.minE?(l.e=0,l.d=[0]):(l.e=o,l.d=[u]):(l.e=o,l.d=[u]);return}if(u*0!==0){u||(l.s=NaN),l.e=NaN,l.d=null;return}return Zr(l,u.toString())}if(f==="string")return(s=u.charCodeAt(0))===45?(u=u.slice(1),l.s=-1):(s===43&&(u=u.slice(1)),l.s=1),Ot.test(u)?Zr(l,u):po(l,u);if(f==="bigint")return u<0?(u=-u,l.s=-1):l.s=1,Zr(l,u.toString());throw Error(hr+u)}if(t.prototype=O,t.ROUND_UP=0,t.ROUND_DOWN=1,t.ROUND_CEIL=2,t.ROUND_FLOOR=3,t.ROUND_HALF_UP=4,t.ROUND_HALF_DOWN=5,t.ROUND_HALF_EVEN=6,t.ROUND_HALF_CEIL=7,t.ROUND_HALF_FLOOR=8,t.EUCLID=9,t.config=t.set=_o,t.clone=Vt,t.isDecimal=Wn,t.abs=mo,t.acos=Do,t.acosh=vo,t.add=yo,t.asin=wo,t.asinh=Fo,t.atan=Eo,t.atanh=Co,t.atan2=bo,t.cbrt=Ao,t.ceil=Bo,t.clamp=No,t.cos=So,t.cosh=Mo,t.div=To,t.exp=Io,t.floor=xo,t.hypot=Oo,t.ln=Po,t.log=zo,t.log10=$o,t.log2=Ro,t.max=Uo,t.min=Vo,t.mod=ko,t.mul=qo,t.pow=Lo,t.random=Go,t.round=Ho,t.sign=Wo,t.sin=Zo,t.sinh=jo,t.sqrt=Yo,t.sub=Jo,t.sum=Xo,t.tan=Ko,t.tanh=Qo,t.trunc=es,e===void 0&&(e={}),e&&e.defaults!==!0)for(i=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],r=0;r<i.length;)e.hasOwnProperty(n=i[r++])||(e[n]=this[n]);return t.config(e),t}function To(e,r){return new this(e).div(r)}function Io(e){return new this(e).exp()}function xo(e){return H(e=new this(e),e.e+1,3)}function Oo(){var e,r,n=new this(0);for(K=!1,e=0;e<arguments.length;)if(r=new this(arguments[e++]),r.d)n.d&&(n=n.plus(r.times(r)));else{if(r.s)return K=!0,new this(1/0);n=r}return K=!0,n.sqrt()}function Wn(e){return e instanceof Tr||e&&e.toStringTag===xt||!1}function Po(e){return new this(e).ln()}function zo(e,r){return new this(e).log(r)}function Ro(e){return new this(e).log(2)}function $o(e){return new this(e).log(10)}function Uo(){return Rt(this,arguments,-1)}function Vo(){return Rt(this,arguments,1)}function ko(e,r){return new this(e).mod(r)}function qo(e,r){return new this(e).mul(r)}function Lo(e,r){return new this(e).pow(r)}function Go(e){var r,n,i,t,u=0,o=new this(1),s=[];if(e===void 0?e=this.precision:Le(e,1,dr),i=Math.ceil(e/J),this.crypto)if(crypto.getRandomValues)for(r=crypto.getRandomValues(new Uint32Array(i));u<i;)t=r[u],t>=429e7?r[u]=crypto.getRandomValues(new Uint32Array(1))[0]:s[u++]=t%1e7;else if(crypto.randomBytes){for(r=crypto.randomBytes(i*=4);u<i;)t=r[u]+(r[u+1]<<8)+(r[u+2]<<16)+((r[u+3]&127)<<24),t>=214e7?crypto.randomBytes(4).copy(r,u):(s.push(t%1e7),u+=4);u=i/4}else throw Error(It);else for(;u<i;)s[u++]=Math.random()*1e7|0;for(i=s[--u],e%=J,i&&e&&(t=Se(10,J-e),s[u]=(i/t|0)*t);s[u]===0;u--)s.pop();if(u<0)n=0,s=[0];else{for(n=-1;s[0]===0;n-=J)s.shift();for(i=1,t=s[0];t>=10;t/=10)i++;i<J&&(n-=J-i)}return o.e=n,o.d=s,o}function Ho(e){return H(e=new this(e),e.e+1,this.rounding)}function Wo(e){return e=new this(e),e.d?e.d[0]?e.s:0*e.s:e.s||NaN}function Zo(e){return new this(e).sin()}function jo(e){return new this(e).sinh()}function Yo(e){return new this(e).sqrt()}function Jo(e,r){return new this(e).sub(r)}function Xo(){var e=0,r=arguments,n=new this(r[e]);for(K=!1;n.s&&++e<r.length;)n=n.plus(r[e]);return K=!0,H(n,this.precision,this.rounding)}function Ko(e){return new this(e).tan()}function Qo(e){return new this(e).tanh()}function es(e){return H(e=new this(e),e.e+1,1)}O[Symbol.for("nodejs.util.inspect.custom")]=O.toString;O[Symbol.toStringTag]="Decimal";var Tr=O.constructor=Vt(Fn);Kr=new Tr(Kr);Qr=new Tr(Qr);var rs="BigNumber",ns=["?on","config"],ts=re(rs,ns,e=>{var{on:r,config:n}=e,i=Tr.clone({precision:n.precision,modulo:Tr.EUCLID});return i.prototype=Object.create(i.prototype),i.prototype.type="BigNumber",i.prototype.isBigNumber=!0,i.prototype.toJSON=function(){return{mathjs:"BigNumber",value:this.toString()}},i.fromJSON=function(t){return new i(t.value)},r&&r("config",function(t,u){t.precision!==u.precision&&i.config({precision:t.precision})}),i},{isClass:!0});const Pe=Math.cosh||function(e){return Math.abs(e)<1e-9?1-e:(Math.exp(e)+Math.exp(-e))*.5},je=Math.sinh||function(e){return Math.abs(e)<1e-9?e:(Math.exp(e)-Math.exp(-e))*.5},is=function(e){const r=Math.PI/4;if(-r>e||e>r)return Math.cos(e)-1;const n=e*e;return n*(n*(n*(n*(n*(n*(n*(n/20922789888e3-1/87178291200)+1/479001600)-1/3628800)+1/40320)-1/720)+1/24)-1/2)},mn=function(e,r){return e=Math.abs(e),r=Math.abs(r),e<r&&([e,r]=[r,e]),e<1e8?Math.sqrt(e*e+r*r):(r/=e,e*Math.sqrt(1+r*r))},Er=function(){throw SyntaxError("Invalid Param")};function Dn(e,r){const n=Math.abs(e),i=Math.abs(r);return e===0?Math.log(i):r===0?Math.log(n):n<3e3&&i<3e3?Math.log(e*e+r*r)*.5:(e=e*.5,r=r*.5,.5*Math.log(e*e+r*r)+Math.LN2)}const us={re:0,im:0},mr=function(e,r){const n=us;if(e==null)n.re=n.im=0;else if(r!==void 0)n.re=e,n.im=r;else switch(typeof e){case"object":if("im"in e&&"re"in e)n.re=e.re,n.im=e.im;else if("abs"in e&&"arg"in e){if(!isFinite(e.abs)&&isFinite(e.arg))return S.INFINITY;n.re=e.abs*Math.cos(e.arg),n.im=e.abs*Math.sin(e.arg)}else if("r"in e&&"phi"in e){if(!isFinite(e.r)&&isFinite(e.phi))return S.INFINITY;n.re=e.r*Math.cos(e.phi),n.im=e.r*Math.sin(e.phi)}else e.length===2?(n.re=e[0],n.im=e[1]):Er();break;case"string":n.im=n.re=0;const i=e.replace(/_/g,"").match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);let t=1,u=0;i===null&&Er();for(let o=0;o<i.length;o++){const s=i[o];s===" "||s==="	"||s===`
`||(s==="+"?t++:s==="-"?u++:s==="i"||s==="I"?(t+u===0&&Er(),i[o+1]!==" "&&!isNaN(i[o+1])?(n.im+=parseFloat((u%2?"-":"")+i[o+1]),o++):n.im+=parseFloat((u%2?"-":"")+"1"),t=u=0):((t+u===0||isNaN(s))&&Er(),i[o+1]==="i"||i[o+1]==="I"?(n.im+=parseFloat((u%2?"-":"")+s),o++):n.re+=parseFloat((u%2?"-":"")+s),t=u=0))}t+u>0&&Er();break;case"number":n.im=0,n.re=e;break;default:Er()}return isNaN(n.re)||isNaN(n.im),n};function S(e,r){if(!(this instanceof S))return new S(e,r);const n=mr(e,r);this.re=n.re,this.im=n.im}S.prototype={re:0,im:0,sign:function(){const e=mn(this.re,this.im);return new S(this.re/e,this.im/e)},add:function(e,r){const n=mr(e,r),i=this.isInfinite(),t=!(isFinite(n.re)&&isFinite(n.im));return i||t?i&&t?S.NAN:S.INFINITY:new S(this.re+n.re,this.im+n.im)},sub:function(e,r){const n=mr(e,r),i=this.isInfinite(),t=!(isFinite(n.re)&&isFinite(n.im));return i||t?i&&t?S.NAN:S.INFINITY:new S(this.re-n.re,this.im-n.im)},mul:function(e,r){const n=mr(e,r),i=this.isInfinite(),t=!(isFinite(n.re)&&isFinite(n.im)),u=this.re===0&&this.im===0,o=n.re===0&&n.im===0;return i&&o||t&&u?S.NAN:i||t?S.INFINITY:n.im===0&&this.im===0?new S(this.re*n.re,0):new S(this.re*n.re-this.im*n.im,this.re*n.im+this.im*n.re)},div:function(e,r){const n=mr(e,r),i=this.isInfinite(),t=!(isFinite(n.re)&&isFinite(n.im)),u=this.re===0&&this.im===0,o=n.re===0&&n.im===0;if(u&&o||i&&t)return S.NAN;if(o||i)return S.INFINITY;if(u||t)return S.ZERO;if(n.im===0)return new S(this.re/n.re,this.im/n.re);if(Math.abs(n.re)<Math.abs(n.im)){const s=n.re/n.im,f=n.re*s+n.im;return new S((this.re*s+this.im)/f,(this.im*s-this.re)/f)}else{const s=n.im/n.re,f=n.im*s+n.re;return new S((this.re+this.im*s)/f,(this.im-this.re*s)/f)}},pow:function(e,r){const n=mr(e,r),i=this.re===0&&this.im===0;if(n.re===0&&n.im===0)return S.ONE;if(n.im===0){if(this.im===0&&this.re>0)return new S(Math.pow(this.re,n.re),0);if(this.re===0)switch((n.re%4+4)%4){case 0:return new S(Math.pow(this.im,n.re),0);case 1:return new S(0,Math.pow(this.im,n.re));case 2:return new S(-Math.pow(this.im,n.re),0);case 3:return new S(0,-Math.pow(this.im,n.re))}}if(i&&n.re>0)return S.ZERO;const u=Math.atan2(this.im,this.re),o=Dn(this.re,this.im);let s=Math.exp(n.re*o-n.im*u),f=n.im*o+n.re*u;return new S(s*Math.cos(f),s*Math.sin(f))},sqrt:function(){const e=this.re,r=this.im;if(r===0)return e>=0?new S(Math.sqrt(e),0):new S(0,Math.sqrt(-e));const n=mn(e,r);let i=Math.sqrt(.5*(n+Math.abs(e))),t=Math.abs(r)/(2*i);return e>=0?new S(i,r<0?-t:t):new S(t,r<0?-i:i)},exp:function(){const e=Math.exp(this.re);return this.im===0?new S(e,0):new S(e*Math.cos(this.im),e*Math.sin(this.im))},expm1:function(){const e=this.re,r=this.im;return new S(Math.expm1(e)*Math.cos(r)+is(r),Math.exp(e)*Math.sin(r))},log:function(){const e=this.re,r=this.im;return r===0&&e>0?new S(Math.log(e),0):new S(Dn(e,r),Math.atan2(r,e))},abs:function(){return mn(this.re,this.im)},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){const e=this.re,r=this.im;return new S(Math.sin(e)*Pe(r),Math.cos(e)*je(r))},cos:function(){const e=this.re,r=this.im;return new S(Math.cos(e)*Pe(r),-Math.sin(e)*je(r))},tan:function(){const e=2*this.re,r=2*this.im,n=Math.cos(e)+Pe(r);return new S(Math.sin(e)/n,je(r)/n)},cot:function(){const e=2*this.re,r=2*this.im,n=Math.cos(e)-Pe(r);return new S(-Math.sin(e)/n,je(r)/n)},sec:function(){const e=this.re,r=this.im,n=.5*Pe(2*r)+.5*Math.cos(2*e);return new S(Math.cos(e)*Pe(r)/n,Math.sin(e)*je(r)/n)},csc:function(){const e=this.re,r=this.im,n=.5*Pe(2*r)-.5*Math.cos(2*e);return new S(Math.sin(e)*Pe(r)/n,-Math.cos(e)*je(r)/n)},asin:function(){const e=this.re,r=this.im,n=new S(r*r-e*e+1,-2*e*r).sqrt(),i=new S(n.re-r,n.im+e).log();return new S(i.im,-i.re)},acos:function(){const e=this.re,r=this.im,n=new S(r*r-e*e+1,-2*e*r).sqrt(),i=new S(n.re-r,n.im+e).log();return new S(Math.PI/2-i.im,i.re)},atan:function(){const e=this.re,r=this.im;if(e===0){if(r===1)return new S(0,1/0);if(r===-1)return new S(0,-1/0)}const n=e*e+(1-r)*(1-r),i=new S((1-r*r-e*e)/n,-2*e/n).log();return new S(-.5*i.im,.5*i.re)},acot:function(){const e=this.re,r=this.im;if(r===0)return new S(Math.atan2(1,e),0);const n=e*e+r*r;return n!==0?new S(e/n,-r/n).atan():new S(e!==0?e/0:0,r!==0?-r/0:0).atan()},asec:function(){const e=this.re,r=this.im;if(e===0&&r===0)return new S(0,1/0);const n=e*e+r*r;return n!==0?new S(e/n,-r/n).acos():new S(e!==0?e/0:0,r!==0?-r/0:0).acos()},acsc:function(){const e=this.re,r=this.im;if(e===0&&r===0)return new S(Math.PI/2,1/0);const n=e*e+r*r;return n!==0?new S(e/n,-r/n).asin():new S(e!==0?e/0:0,r!==0?-r/0:0).asin()},sinh:function(){const e=this.re,r=this.im;return new S(je(e)*Math.cos(r),Pe(e)*Math.sin(r))},cosh:function(){const e=this.re,r=this.im;return new S(Pe(e)*Math.cos(r),je(e)*Math.sin(r))},tanh:function(){const e=2*this.re,r=2*this.im,n=Pe(e)+Math.cos(r);return new S(je(e)/n,Math.sin(r)/n)},coth:function(){const e=2*this.re,r=2*this.im,n=Pe(e)-Math.cos(r);return new S(je(e)/n,-Math.sin(r)/n)},csch:function(){const e=this.re,r=this.im,n=Math.cos(2*r)-Pe(2*e);return new S(-2*je(e)*Math.cos(r)/n,2*Pe(e)*Math.sin(r)/n)},sech:function(){const e=this.re,r=this.im,n=Math.cos(2*r)+Pe(2*e);return new S(2*Pe(e)*Math.cos(r)/n,-2*je(e)*Math.sin(r)/n)},asinh:function(){let e=this.im;this.im=-this.re,this.re=e;const r=this.asin();return this.re=-this.im,this.im=e,e=r.re,r.re=-r.im,r.im=e,r},acosh:function(){const e=this.acos();if(e.im<=0){const r=e.re;e.re=-e.im,e.im=r}else{const r=e.im;e.im=-e.re,e.re=r}return e},atanh:function(){const e=this.re,r=this.im,n=e>1&&r===0,i=1-e,t=1+e,u=i*i+r*r,o=u!==0?new S((t*i-r*r)/u,(r*i+t*r)/u):new S(e!==-1?e/0:0,r!==0?r/0:0),s=o.re;return o.re=Dn(o.re,o.im)/2,o.im=Math.atan2(o.im,s)/2,n&&(o.im=-o.im),o},acoth:function(){const e=this.re,r=this.im;if(e===0&&r===0)return new S(0,Math.PI/2);const n=e*e+r*r;return n!==0?new S(e/n,-r/n).atanh():new S(e!==0?e/0:0,r!==0?-r/0:0).atanh()},acsch:function(){const e=this.re,r=this.im;if(r===0)return new S(e!==0?Math.log(e+Math.sqrt(e*e+1)):1/0,0);const n=e*e+r*r;return n!==0?new S(e/n,-r/n).asinh():new S(e!==0?e/0:0,r!==0?-r/0:0).asinh()},asech:function(){const e=this.re,r=this.im;if(this.isZero())return S.INFINITY;const n=e*e+r*r;return n!==0?new S(e/n,-r/n).acosh():new S(e!==0?e/0:0,r!==0?-r/0:0).acosh()},inverse:function(){if(this.isZero())return S.INFINITY;if(this.isInfinite())return S.ZERO;const e=this.re,r=this.im,n=e*e+r*r;return new S(e/n,-r/n)},conjugate:function(){return new S(this.re,-this.im)},neg:function(){return new S(-this.re,-this.im)},ceil:function(e){return e=Math.pow(10,e||0),new S(Math.ceil(this.re*e)/e,Math.ceil(this.im*e)/e)},floor:function(e){return e=Math.pow(10,e||0),new S(Math.floor(this.re*e)/e,Math.floor(this.im*e)/e)},round:function(e){return e=Math.pow(10,e||0),new S(Math.round(this.re*e)/e,Math.round(this.im*e)/e)},equals:function(e,r){const n=mr(e,r);return Math.abs(n.re-this.re)<=S.EPSILON&&Math.abs(n.im-this.im)<=S.EPSILON},clone:function(){return new S(this.re,this.im)},toString:function(){let e=this.re,r=this.im,n="";return this.isNaN()?"NaN":this.isInfinite()?"Infinity":(Math.abs(e)<S.EPSILON&&(e=0),Math.abs(r)<S.EPSILON&&(r=0),r===0?n+e:(e!==0?(n+=e,n+=" ",r<0?(r=-r,n+="-"):n+="+",n+=" "):r<0&&(r=-r,n+="-"),r!==1&&(n+=r),n+"i"))},toVector:function(){return[this.re,this.im]},valueOf:function(){return this.im===0?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)},isZero:function(){return this.im===0&&this.re===0},isFinite:function(){return isFinite(this.re)&&isFinite(this.im)},isInfinite:function(){return!this.isFinite()}};S.ZERO=new S(0,0);S.ONE=new S(1,0);S.I=new S(0,1);S.PI=new S(Math.PI,0);S.E=new S(Math.E,0);S.INFINITY=new S(1/0,1/0);S.NAN=new S(NaN,NaN);S.EPSILON=1e-15;var os="Complex",ss=[],as=re(os,ss,()=>(Object.defineProperty(S,"name",{value:"Complex"}),S.prototype.constructor=S,S.prototype.type="Complex",S.prototype.isComplex=!0,S.prototype.toJSON=function(){return{mathjs:"Complex",re:this.re,im:this.im}},S.prototype.toPolar=function(){return{r:this.abs(),phi:this.arg()}},S.prototype.format=function(e){var r="",n=this.im,i=this.re,t=yn(this.re,e),u=yn(this.im,e),o=pe(e)?e:e?e.precision:null;if(o!==null){var s=Math.pow(10,-o);Math.abs(i/n)<s&&(i=0),Math.abs(n/i)<s&&(n=0)}return n===0?r=t:i===0?n===1?r="i":n===-1?r="-i":r=u+"i":n<0?n===-1?r=t+" - i":r=t+" - "+u.substring(1)+"i":n===1?r=t+" + i":r=t+" + "+u+"i",r},S.fromPolar=function(e){switch(arguments.length){case 1:{var r=arguments[0];if(typeof r=="object")return S(r);throw new TypeError("Input has to be an object with r and phi keys.")}case 2:{var n=arguments[0],i=arguments[1];if(pe(n)){if(bt(i)&&i.hasBase("ANGLE")&&(i=i.toNumber("rad")),pe(i))return new S({r:n,phi:i});throw new TypeError("Phi is not a number nor an angle unit.")}else throw new TypeError("Radius r is not a number.")}default:throw new SyntaxError("Wrong number of arguments in function fromPolar")}},S.prototype.valueOf=S.prototype.toString,S.fromJSON=function(e){return new S(e)},S.compare=function(e,r){return e.re>r.re?1:e.re<r.re?-1:e.im>r.im?1:e.im<r.im?-1:0},S),{isClass:!0});typeof BigInt>"u"&&(BigInt=function(e){if(isNaN(e))throw new Error("");return e});const G=BigInt(0),ee=BigInt(1),Ie=BigInt(2),zr=BigInt(3),Br=BigInt(5),qe=BigInt(10);BigInt(Number.MAX_SAFE_INTEGER);const cs=2e3,U={s:ee,n:G,d:ee};function ur(e,r){try{e=BigInt(e)}catch{throw ar()}return e*r}function Ke(e){return typeof e=="bigint"?e:Math.floor(e)}function de(e,r){if(r===G)throw Tn();const n=Object.create(Ye.prototype);n.s=e<G?-ee:ee,e=e<G?-e:e;const i=Dr(e,r);return n.n=e/i,n.d=r/i,n}const fs=[Ie*Ie,Ie,Ie*Ie,Ie,Ie*Ie,Ie*zr,Ie,Ie*zr];function Cr(e){const r=Object.create(null);if(e<=ee)return r[e]=ee,r;const n=i=>{r[i]=(r[i]||G)+ee};for(;e%Ie===G;)n(Ie),e/=Ie;for(;e%zr===G;)n(zr),e/=zr;for(;e%Br===G;)n(Br),e/=Br;for(let i=0,t=Ie+Br;t*t<=e;){for(;e%t===G;)n(t),e/=t;t+=fs[i],i=i+1&7}return e>ee&&n(e),r}const Te=function(e,r){let n=G,i=ee,t=ee;if(e!=null)if(r!==void 0){if(typeof e=="bigint")n=e;else{if(isNaN(e))throw ar();if(e%1!==0)throw Zn();n=BigInt(e)}if(typeof r=="bigint")i=r;else{if(isNaN(r))throw ar();if(r%1!==0)throw Zn();i=BigInt(r)}t=n*i}else if(typeof e=="object"){if("d"in e&&"n"in e)n=BigInt(e.n),i=BigInt(e.d),"s"in e&&(n*=BigInt(e.s));else if(0 in e)n=BigInt(e[0]),1 in e&&(i=BigInt(e[1]));else if(typeof e=="bigint")n=e;else throw ar();t=n*i}else if(typeof e=="number"){if(isNaN(e))throw ar();if(e<0&&(t=-ee,e=-e),e%1===0)n=BigInt(e);else{let u=1,o=0,s=1,f=1,l=1,a=1e7;for(e>=1&&(u=10**Math.floor(1+Math.log10(e)),e/=u);s<=a&&l<=a;){let h=(o+f)/(s+l);if(e===h){s+l<=a?(n=o+f,i=s+l):l>s?(n=f,i=l):(n=o,i=s);break}else e>h?(o+=f,s+=l):(f+=o,l+=s),s>a?(n=f,i=l):(n=o,i=s)}n=BigInt(n)*BigInt(u),i=BigInt(i)}}else if(typeof e=="string"){let u=0,o=G,s=G,f=G,l=ee,a=ee,h=e.replace(/_/g,"").match(/\d+|./g);if(h===null)throw ar();if(h[u]==="-"?(t=-ee,u++):h[u]==="+"&&u++,h.length===u+1?s=ur(h[u++],t):h[u+1]==="."||h[u]==="."?(h[u]!=="."&&(o=ur(h[u++],t)),u++,(u+1===h.length||h[u+1]==="("&&h[u+3]===")"||h[u+1]==="'"&&h[u+3]==="'")&&(s=ur(h[u],t),l=qe**BigInt(h[u].length),u++),(h[u]==="("&&h[u+2]===")"||h[u]==="'"&&h[u+2]==="'")&&(f=ur(h[u+1],t),a=qe**BigInt(h[u+1].length)-ee,u+=3)):h[u+1]==="/"||h[u+1]===":"?(s=ur(h[u],t),l=ur(h[u+2],ee),u+=3):h[u+3]==="/"&&h[u+1]===" "&&(o=ur(h[u],t),s=ur(h[u+2],t),l=ur(h[u+4],ee),u+=5),h.length<=u)i=l*a,t=n=f+i*o+a*s;else throw ar()}else if(typeof e=="bigint")n=e,t=e,i=ee;else throw ar();if(i===G)throw Tn();U.s=t<G?-ee:ee,U.n=n<G?-n:n,U.d=i<G?-i:i};function ls(e,r,n){let i=ee;for(;r>G;e=e*e%n,r>>=ee)r&ee&&(i=i*e%n);return i}function hs(e,r){for(;r%Ie===G;r/=Ie);for(;r%Br===G;r/=Br);if(r===ee)return G;let n=qe%r,i=1;for(;n!==ee;i++)if(n=n*qe%r,i>cs)return G;return BigInt(i)}function ps(e,r,n){let i=ee,t=ls(qe,n,r);for(let u=0;u<300;u++){if(i===t)return BigInt(u);i=i*qe%r,t=t*qe%r}return 0}function Dr(e,r){if(!e)return r;if(!r)return e;for(;;){if(e%=r,!e)return r;if(r%=e,!r)return e}}function Ye(e,r){if(Te(e,r),this instanceof Ye)e=Dr(U.d,U.n),this.s=U.s,this.n=U.n/e,this.d=U.d/e;else return de(U.s*U.n,U.d)}const Tn=function(){return new Error("Division by Zero")},ar=function(){return new Error("Invalid argument")},Zn=function(){return new Error("Parameters must be integer")};Ye.prototype={s:ee,n:G,d:ee,abs:function(){return de(this.n,this.d)},neg:function(){return de(-this.s*this.n,this.d)},add:function(e,r){return Te(e,r),de(this.s*this.n*U.d+U.s*this.d*U.n,this.d*U.d)},sub:function(e,r){return Te(e,r),de(this.s*this.n*U.d-U.s*this.d*U.n,this.d*U.d)},mul:function(e,r){return Te(e,r),de(this.s*U.s*this.n*U.n,this.d*U.d)},div:function(e,r){return Te(e,r),de(this.s*U.s*this.n*U.d,this.d*U.n)},clone:function(){return de(this.s*this.n,this.d)},mod:function(e,r){if(e===void 0)return de(this.s*this.n%this.d,ee);if(Te(e,r),G===U.n*this.d)throw Tn();return de(this.s*(U.d*this.n)%(U.n*this.d),U.d*this.d)},gcd:function(e,r){return Te(e,r),de(Dr(U.n,this.n)*Dr(U.d,this.d),U.d*this.d)},lcm:function(e,r){return Te(e,r),U.n===G&&this.n===G?de(G,ee):de(U.n*this.n,Dr(U.n,this.n)*Dr(U.d,this.d))},inverse:function(){return de(this.s*this.d,this.n)},pow:function(e,r){if(Te(e,r),U.d===ee)return U.s<G?de((this.s*this.d)**U.n,this.n**U.n):de((this.s*this.n)**U.n,this.d**U.n);if(this.s<G)return null;let n=Cr(this.n),i=Cr(this.d),t=ee,u=ee;for(let o in n)if(o!=="1"){if(o==="0"){t=G;break}if(n[o]*=U.n,n[o]%U.d===G)n[o]/=U.d;else return null;t*=BigInt(o)**n[o]}for(let o in i)if(o!=="1"){if(i[o]*=U.n,i[o]%U.d===G)i[o]/=U.d;else return null;u*=BigInt(o)**i[o]}return U.s<G?de(u,t):de(t,u)},log:function(e,r){if(Te(e,r),this.s<=G||U.s<=G)return null;const n=Object.create(null),i=Cr(U.n),t=Cr(U.d),u=Cr(this.n),o=Cr(this.d);for(const l in t)i[l]=(i[l]||G)-t[l];for(const l in o)u[l]=(u[l]||G)-o[l];for(const l in i)l!=="1"&&(n[l]=!0);for(const l in u)l!=="1"&&(n[l]=!0);let s=null,f=null;for(const l in n){const a=i[l]||G,h=u[l]||G;if(a===G){if(h!==G)return null;continue}let p=h,d=a;const g=Dr(p,d);if(p/=g,d/=g,s===null&&f===null)s=p,f=d;else if(p*f!==s*d)return null}return s!==null&&f!==null?de(s,f):null},equals:function(e,r){return Te(e,r),this.s*this.n*U.d===U.s*U.n*this.d},lt:function(e,r){return Te(e,r),this.s*this.n*U.d<U.s*U.n*this.d},lte:function(e,r){return Te(e,r),this.s*this.n*U.d<=U.s*U.n*this.d},gt:function(e,r){return Te(e,r),this.s*this.n*U.d>U.s*U.n*this.d},gte:function(e,r){return Te(e,r),this.s*this.n*U.d>=U.s*U.n*this.d},compare:function(e,r){Te(e,r);let n=this.s*this.n*U.d-U.s*U.n*this.d;return(G<n)-(n<G)},ceil:function(e){return e=qe**BigInt(e||0),de(Ke(this.s*e*this.n/this.d)+(e*this.n%this.d>G&&this.s>=G?ee:G),e)},floor:function(e){return e=qe**BigInt(e||0),de(Ke(this.s*e*this.n/this.d)-(e*this.n%this.d>G&&this.s<G?ee:G),e)},round:function(e){return e=qe**BigInt(e||0),de(Ke(this.s*e*this.n/this.d)+this.s*((this.s>=G?ee:G)+Ie*(e*this.n%this.d)>this.d?ee:G),e)},roundTo:function(e,r){Te(e,r);const n=this.n*U.d,i=this.d*U.n,t=n%i;let u=Ke(n/i);return t+t>=i&&u++,de(this.s*u*U.n,U.d)},divisible:function(e,r){return Te(e,r),U.n===G?!1:this.n*U.d%(U.n*this.d)===G},valueOf:function(){return Number(this.s*this.n)/Number(this.d)},toString:function(e=15){let r=this.n,n=this.d,i=hs(r,n),t=ps(r,n,i),u=this.s<G?"-":"";if(u+=Ke(r/n),r%=n,r*=qe,r&&(u+="."),i){for(let o=t;o--;)u+=Ke(r/n),r%=n,r*=qe;u+="(";for(let o=i;o--;)u+=Ke(r/n),r%=n,r*=qe;u+=")"}else for(let o=e;r&&o--;)u+=Ke(r/n),r%=n,r*=qe;return u},toFraction:function(e=!1){let r=this.n,n=this.d,i=this.s<G?"-":"";if(n===ee)i+=r;else{const t=Ke(r/n);e&&t>G&&(i+=t,i+=" ",r%=n),i+=r,i+="/",i+=n}return i},toLatex:function(e=!1){let r=this.n,n=this.d,i=this.s<G?"-":"";if(n===ee)i+=r;else{const t=Ke(r/n);e&&t>G&&(i+=t,r%=n),i+="\\frac{",i+=r,i+="}{",i+=n,i+="}"}return i},toContinued:function(){let e=this.n,r=this.d;const n=[];for(;r;){n.push(Ke(e/r));const i=e%r;e=r,r=i}return n},simplify:function(e=.001){const r=BigInt(Math.ceil(1/e)),n=this.abs(),i=n.toContinued();for(let t=1;t<i.length;t++){let u=de(i[t-1],ee);for(let s=t-2;s>=0;s--)u=u.inverse().add(i[s]);let o=u.sub(n);if(o.n*r<o.d)return u.mul(this.s)}return this}};var ds="Fraction",gs=[],ms=re(ds,gs,()=>(Object.defineProperty(Ye,"name",{value:"Fraction"}),Ye.prototype.constructor=Ye,Ye.prototype.type="Fraction",Ye.prototype.isFraction=!0,Ye.prototype.toJSON=function(){return{mathjs:"Fraction",n:String(this.s*this.n),d:String(this.d)}},Ye.fromJSON=function(e){return new Ye(e)},Ye),{isClass:!0}),Ds="Matrix",vs=[],ys=re(Ds,vs,()=>{function e(){if(!(this instanceof e))throw new SyntaxError("Constructor must be called with the new operator")}return e.prototype.type="Matrix",e.prototype.isMatrix=!0,e.prototype.storage=function(){throw new Error("Cannot invoke storage on a Matrix interface")},e.prototype.datatype=function(){throw new Error("Cannot invoke datatype on a Matrix interface")},e.prototype.create=function(r,n){throw new Error("Cannot invoke create on a Matrix interface")},e.prototype.subset=function(r,n,i){throw new Error("Cannot invoke subset on a Matrix interface")},e.prototype.get=function(r){throw new Error("Cannot invoke get on a Matrix interface")},e.prototype.set=function(r,n,i){throw new Error("Cannot invoke set on a Matrix interface")},e.prototype.resize=function(r,n){throw new Error("Cannot invoke resize on a Matrix interface")},e.prototype.reshape=function(r,n){throw new Error("Cannot invoke reshape on a Matrix interface")},e.prototype.clone=function(){throw new Error("Cannot invoke clone on a Matrix interface")},e.prototype.size=function(){throw new Error("Cannot invoke size on a Matrix interface")},e.prototype.map=function(r,n){throw new Error("Cannot invoke map on a Matrix interface")},e.prototype.forEach=function(r){throw new Error("Cannot invoke forEach on a Matrix interface")},e.prototype[Symbol.iterator]=function(){throw new Error("Cannot iterate a Matrix interface")},e.prototype.toArray=function(){throw new Error("Cannot invoke toArray on a Matrix interface")},e.prototype.valueOf=function(){throw new Error("Cannot invoke valueOf on a Matrix interface")},e.prototype.format=function(r){throw new Error("Cannot invoke format on a Matrix interface")},e.prototype.toString=function(){throw new Error("Cannot invoke toString on a Matrix interface")},e},{isClass:!0});function vn(e,r,n){var i=e.constructor,t=new i(2),u="";if(n){if(n<1)throw new Error("size must be in greater than 0");if(!ge(n))throw new Error("size must be an integer");if(e.greaterThan(t.pow(n-1).sub(1))||e.lessThan(t.pow(n-1).mul(-1)))throw new Error("Value must be in range [-2^".concat(n-1,", 2^").concat(n-1,"-1]"));if(!e.isInteger())throw new Error("Value must be an integer");e.lessThan(0)&&(e=e.add(t.pow(n))),u="i".concat(n)}switch(r){case 2:return"".concat(e.toBinary()).concat(u);case 8:return"".concat(e.toOctal()).concat(u);case 16:return"".concat(e.toHexadecimal()).concat(u);default:throw new Error("Base ".concat(r," not supported "))}}function ws(e,r){if(typeof r=="function")return r(e);if(!e.isFinite())return e.isNaN()?"NaN":e.gt(0)?"Infinity":"-Infinity";var{notation:n,precision:i,wordSize:t}=Bt(r);switch(n){case"fixed":return Es(e,i);case"exponential":return jn(e,i);case"engineering":return Fs(e,i);case"bin":return vn(e,2,t);case"oct":return vn(e,8,t);case"hex":return vn(e,16,t);case"auto":{var u=Yn(r==null?void 0:r.lowerExp,-3),o=Yn(r==null?void 0:r.upperExp,5);if(e.isZero())return"0";var s,f=e.toSignificantDigits(i),l=f.e;return l>=u&&l<o?s=f.toFixed():s=jn(e,i),s.replace(/((\.\d*?)(0+))($|e)/,function(){var a=arguments[2],h=arguments[4];return a!=="."?a+h:h})}default:throw new Error('Unknown notation "'+n+'". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.')}}function Fs(e,r){var n=e.e,i=n%3===0?n:n<0?n-3-n%3:n-n%3,t=e.mul(Math.pow(10,-i)),u=t.toPrecision(r);if(u.includes("e")){var o=e.constructor;u=new o(u).toFixed()}return u+"e"+(n>=0?"+":"")+i.toString()}function jn(e,r){return r!==void 0?e.toExponential(r-1):e.toExponential()}function Es(e,r){return e.toFixed(r)}function Yn(e,r){return pe(e)?e:be(e)?e.toNumber():r}function Ne(e,r){var n=Cs(e,r);return r&&typeof r=="object"&&"truncate"in r&&n.length>r.truncate?n.substring(0,r.truncate-3)+"...":n}function Cs(e,r){if(typeof e=="number")return yn(e,r);if(be(e))return ws(e,r);if(bs(e))return!r||r.fraction!=="decimal"?"".concat(e.s*e.n,"/").concat(e.d):e.toString();if(Array.isArray(e))return kt(e,r);if(er(e))return Jn(e);if(typeof e=="function")return e.syntax?String(e.syntax):"function";if(e&&typeof e=="object"){if(typeof e.format=="function")return e.format(r);if(e&&e.toString(r)!=={}.toString())return e.toString(r);var n=Object.keys(e).map(i=>Jn(i)+": "+Ne(e[i],r));return"{"+n.join(", ")+"}"}return String(e)}function Jn(e){for(var r=String(e),n="",i=0;i<r.length;){var t=r.charAt(i);n+=t in Xn?Xn[t]:t,i++}return'"'+n+'"'}var Xn={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t"};function kt(e,r){if(Array.isArray(e)){for(var n="[",i=e.length,t=0;t<i;t++)t!==0&&(n+=", "),n+=kt(e[t],r);return n+="]",n}else return Ne(e,r)}function bs(e){return e&&typeof e=="object"&&typeof e.s=="bigint"&&typeof e.n=="bigint"&&typeof e.d=="bigint"||!1}function me(e,r,n){if(!(this instanceof me))throw new SyntaxError("Constructor must be called with the new operator");this.actual=e,this.expected=r,this.relation=n,this.message="Dimension mismatch ("+(Array.isArray(e)?"["+e.join(", ")+"]":e)+" "+(this.relation||"!=")+" "+(Array.isArray(r)?"["+r.join(", ")+"]":r)+")",this.stack=new Error().stack}me.prototype=new RangeError;me.prototype.constructor=RangeError;me.prototype.name="DimensionError";me.prototype.isDimensionError=!0;function Ir(e,r,n){if(!(this instanceof Ir))throw new SyntaxError("Constructor must be called with the new operator");this.index=e,arguments.length<3?(this.min=0,this.max=r):(this.min=r,this.max=n),this.min!==void 0&&this.index<this.min?this.message="Index out of range ("+this.index+" < "+this.min+")":this.max!==void 0&&this.index>=this.max?this.message="Index out of range ("+this.index+" > "+(this.max-1)+")":this.message="Index out of range ("+this.index+")",this.stack=new Error().stack}Ir.prototype=new RangeError;Ir.prototype.constructor=RangeError;Ir.prototype.name="IndexError";Ir.prototype.isIndexError=!0;function Ue(e){for(var r=[];Array.isArray(e);)r.push(e.length),e=e[0];return r}function qt(e,r,n){var i,t=e.length;if(t!==r[n])throw new me(t,r[n]);if(n<r.length-1){var u=n+1;for(i=0;i<t;i++){var o=e[i];if(!Array.isArray(o))throw new me(r.length-1,r.length,"<");qt(e[i],r,u)}}else for(i=0;i<t;i++)if(Array.isArray(e[i]))throw new me(r.length+1,r.length,">")}function Kn(e,r){var n=r.length===0;if(n){if(Array.isArray(e))throw new me(e.length,0)}else qt(e,r,0)}function we(e,r){if(e!==void 0){if(!pe(e)||!ge(e))throw new TypeError("Index must be an integer (value: "+e+")");if(e<0||typeof r=="number"&&e>=r)throw new Ir(e,r)}}function rn(e,r,n){if(!Array.isArray(r))throw new TypeError("Array expected");if(r.length===0)throw new Error("Resizing to scalar is not supported");r.forEach(function(t){if(!pe(t)||!ge(t)||t<0)throw new TypeError("Invalid size, must contain positive integers (size: "+Ne(r)+")")}),(pe(e)||be(e))&&(e=[e]);var i=n!==void 0?n:0;return bn(e,r,0,i),e}function bn(e,r,n,i){var t,u,o=e.length,s=r[n],f=Math.min(o,s);if(e.length=s,n<r.length-1){var l=n+1;for(t=0;t<f;t++)u=e[t],Array.isArray(u)||(u=[u],e[t]=u),bn(u,r,l,i);for(t=f;t<s;t++)u=[],e[t]=u,bn(u,r,l,i)}else{for(t=0;t<f;t++)for(;Array.isArray(e[t]);)e[t]=e[t][0];for(t=f;t<s;t++)e[t]=i}}function Lt(e,r){var n=Bs(e,!0),i=n.length;if(!Array.isArray(e)||!Array.isArray(r))throw new TypeError("Array expected");if(r.length===0)throw new me(0,i,"!=");r=In(r,i);var t=Gt(r);if(i!==t)throw new me(t,i,"!=");try{return As(n,r)}catch(u){throw u instanceof me?new me(t,i,"!="):u}}function In(e,r){var n=Gt(e),i=e.slice(),t=-1,u=e.indexOf(t),o=e.indexOf(t,u+1)>=0;if(o)throw new Error("More than one wildcard in sizes");var s=u>=0,f=r%n===0;if(s)if(f)i[u]=-r/n;else throw new Error("Could not replace wildcard, since "+r+" is no multiple of "+-n);return i}function Gt(e){return e.reduce((r,n)=>r*n,1)}function As(e,r){for(var n=e,i,t=r.length-1;t>0;t--){var u=r[t];i=[];for(var o=n.length/u,s=0;s<o;s++)i.push(n.slice(s*u,(s+1)*u));n=i}return n}function Ht(e,r,n,i){var t=i||Ue(e);if(n)for(var u=0;u<n;u++)e=[e],t.unshift(1);for(e=Wt(e,r,0);t.length<r;)t.push(1);return e}function Wt(e,r,n){var i,t;if(Array.isArray(e)){var u=n+1;for(i=0,t=e.length;i<t;i++)e[i]=Wt(e[i],r,u)}else for(var o=n;o<r;o++)e=[e];return e}function Bs(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(!Array.isArray(e))return e;if(typeof r!="boolean")throw new TypeError("Boolean expected for second argument of flatten");var n=[];return r?t(e):i(e),n;function i(u){for(var o=0;o<u.length;o++){var s=u[o];Array.isArray(s)?i(s):n.push(s)}}function t(u){if(Array.isArray(u[0]))for(var o=0;o<u.length;o++)t(u[o]);else for(var s=0;s<u.length;s++)n.push(u[s])}}function xn(e,r){for(var n,i=0,t=0;t<e.length;t++){var u=e[t],o=Array.isArray(u);if(t===0&&o&&(i=u.length),o&&u.length!==i)return;var s=o?xn(u,r):r(u);if(n===void 0)n=s;else if(n!==s)return"mixed"}return n}function Zt(e,r,n,i){if(i<n){if(e.length!==r.length)throw new me(e.length,r.length);for(var t=[],u=0;u<e.length;u++)t[u]=Zt(e[u],r[u],n,i+1);return t}else return e.concat(r)}function Ns(){var e=Array.prototype.slice.call(arguments,0,-1),r=Array.prototype.slice.call(arguments,-1);if(e.length===1)return e[0];if(e.length>1)return e.slice(1).reduce(function(n,i){return Zt(n,i,r,0)},e[0]);throw new Error("Wrong number of arguments in function concat")}function _s(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];for(var i=r.map(p=>p.length),t=Math.max(...i),u=new Array(t).fill(null),o=0;o<r.length;o++)for(var s=r[o],f=i[o],l=0;l<f;l++){var a=t-f+l;s[l]>u[a]&&(u[a]=s[l])}for(var h=0;h<r.length;h++)jt(r[h],u);return u}function jt(e,r){for(var n=r.length,i=e.length,t=0;t<i;t++){var u=n-i+t;if(e[t]<r[u]&&e[t]>1||e[t]>r[u])throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(e,") not possible to broadcast dimension ").concat(i," with size ").concat(e[t]," to size ").concat(r[u]))}}function Qn(e,r){var n=Ue(e);if(_r(n,r))return e;jt(n,r);var i=_s(n,r),t=i.length,u=[...Array(t-n.length).fill(1),...n],o=Ms(e);n.length<t&&(o=Lt(o,u),n=Ue(o));for(var s=0;s<t;s++)n[s]<i[s]&&(o=Ss(o,i[s],s),n=Ue(o));return o}function Ss(e,r,n){return Ns(...Array(r).fill(e),n)}function Yt(e,r){if(!Array.isArray(e))throw new Error("Array expected");var n=Ue(e);if(r.length!==n.length)throw new me(r.length,n.length);for(var i=0;i<r.length;i++)we(r[i],n[i]);return r.reduce((t,u)=>t[u],e)}function et(e,r){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;if(e.length===0)return[];if(n)return u(e);var i=[];return t(e,0);function t(o,s){if(Array.isArray(o)){for(var f=o.length,l=Array(f),a=0;a<f;a++)i[s]=a,l[a]=t(o[a],s+1);return l}else return r(o,i.slice(0,s),e)}function u(o){if(Array.isArray(o)){for(var s=o.length,f=Array(s),l=0;l<s;l++)f[l]=u(o[l]);return f}else return r(o)}}function Ms(e){return wt([],e)}function nn(e,r,n){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(Xr.isTypedFunction(e)){var t;if(i)t=1;else{var u=(r.isMatrix?r.size():Ue(r)).map(()=>0),o=r.isMatrix?r.get(u):Yt(r,u);t=xs(e,o,u,r)}var s;if(r.isMatrix&&r.dataType!=="mixed"&&r.dataType!==void 0){var f=Ts(e,t);s=f!==void 0?f:e}else s=e;return t>=1&&t<=3?{isUnary:t===1,fn:function(){for(var a=arguments.length,h=new Array(a),p=0;p<a;p++)h[p]=arguments[p];return rt(s,h.slice(0,t),n,e.name)}}:{isUnary:!1,fn:function(){for(var a=arguments.length,h=new Array(a),p=0;p<a;p++)h[p]=arguments[p];return rt(s,h,n,e.name)}}}return i===void 0?{isUnary:Is(e),fn:e}:{isUnary:i,fn:e}}function Ts(e,r){var n=[];if(Object.entries(e.signatures).forEach(i=>{var[t,u]=i;t.split(",").length===r&&n.push(u)}),n.length===1)return n[0]}function Is(e){if(e.length!==1)return!1;var r=e.toString();if(/arguments/.test(r))return!1;var n=r.match(/\(.*?\)/);return!/\.\.\./.test(n)}function xs(e,r,n,i){for(var t=[r,n,i],u=3;u>0;u--){var o=t.slice(0,u);if(Xr.resolve(e,o)!==null)return u}}function rt(e,r,n,i){try{return e(...r)}catch(t){Os(t,r,n,i)}}function Os(e,r,n,i){var t;if(e instanceof TypeError&&((t=e.data)===null||t===void 0?void 0:t.category)==="wrongType"){var u=[];throw u.push("value: ".concat(lr(r[0]))),r.length>=2&&u.push("index: ".concat(lr(r[1]))),r.length>=3&&u.push("array: ".concat(lr(r[2]))),new TypeError("Function ".concat(n," cannot apply callback arguments ")+"".concat(i,"(").concat(u.join(", "),") at index ").concat(JSON.stringify(r[1])))}else throw new TypeError("Function ".concat(n," cannot apply callback arguments ")+"to function ".concat(i,": ").concat(e.message))}var Ps="DenseMatrix",zs=["Matrix"],Rs=re(Ps,zs,e=>{var{Matrix:r}=e;function n(a,h){if(!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");if(h&&!er(h))throw new Error("Invalid datatype: "+h);if(Ce(a))a.type==="DenseMatrix"?(this._data=Ee(a._data),this._size=Ee(a._size),this._datatype=h||a._datatype):(this._data=a.toArray(),this._size=a.size(),this._datatype=h||a._datatype);else if(a&&_e(a.data)&&_e(a.size))this._data=a.data,this._size=a.size,Kn(this._data,this._size),this._datatype=h||a.datatype;else if(_e(a))this._data=l(a),this._size=Ue(this._data),Kn(this._data,this._size),this._datatype=h;else{if(a)throw new TypeError("Unsupported type of data ("+lr(a)+")");this._data=[],this._size=[0],this._datatype=h}}n.prototype=new r,n.prototype.createDenseMatrix=function(a,h){return new n(a,h)},Object.defineProperty(n,"name",{value:"DenseMatrix"}),n.prototype.constructor=n,n.prototype.type="DenseMatrix",n.prototype.isDenseMatrix=!0,n.prototype.getDataType=function(){return xn(this._data,lr)},n.prototype.storage=function(){return"dense"},n.prototype.datatype=function(){return this._datatype},n.prototype.create=function(a,h){return new n(a,h)},n.prototype.subset=function(a,h,p){switch(arguments.length){case 1:return i(this,a);case 2:case 3:return u(this,a,h,p);default:throw new SyntaxError("Wrong number of arguments")}},n.prototype.get=function(a){return Yt(this._data,a)},n.prototype.set=function(a,h,p){if(!_e(a))throw new TypeError("Array expected");if(a.length<this._size.length)throw new me(a.length,this._size.length,"<");var d,g,c,m=a.map(function(C){return C+1});f(this,m,p);var w=this._data;for(d=0,g=a.length-1;d<g;d++)c=a[d],we(c,w.length),w=w[c];return c=a[a.length-1],we(c,w.length),w[c]=h,this};function i(a,h){if(!_n(h))throw new TypeError("Invalid index");var p=h.isScalar();if(p)return a.get(h.min());var d=h.size();if(d.length!==a._size.length)throw new me(d.length,a._size.length);for(var g=h.min(),c=h.max(),m=0,w=a._size.length;m<w;m++)we(g[m],a._size[m]),we(c[m],a._size[m]);var C=new n([]),F=t(a._data,h);return C._size=F.size,C._datatype=a._datatype,C._data=F.data,C}function t(a,h){var p=h.size().length-1,d=Array(p);return{data:g(a),size:d};function g(c){var m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,w=h.dimension(m);return d[m]=w.size()[0],m<p?w.map(C=>(we(C,c.length),g(c[C],m+1))).valueOf():w.map(C=>(we(C,c.length),c[C])).valueOf()}}function u(a,h,p,d){if(!h||h.isIndex!==!0)throw new TypeError("Invalid index");var g=h.size(),c=h.isScalar(),m;if(Ce(p)?(m=p.size(),p=p.valueOf()):m=Ue(p),c){if(m.length!==0)throw new TypeError("Scalar expected");a.set(h.min(),p,d)}else{if(!_r(m,g))try{m.length===0?p=Qn([p],g):p=Qn(p,g),m=Ue(p)}catch{}if(g.length<a._size.length)throw new me(g.length,a._size.length,"<");if(m.length<g.length){for(var w=0,C=0;g[w]===1&&m[w]===1;)w++;for(;g[w]===1;)C++,w++;p=Ht(p,g.length,C,m)}if(!_r(g,m))throw new me(g,m,">");var F=h.max().map(function(A){return A+1});f(a,F,d),o(a._data,h,p)}return a}function o(a,h,p){var d=h.size().length-1;g(a,p);function g(c,m){var w=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,C=h.dimension(w);w<d?C.forEach((F,A)=>{we(F,c.length),g(c[F],m[A[0]],w+1)}):C.forEach((F,A)=>{we(F,c.length),c[F]=m[A[0]]})}}n.prototype.resize=function(a,h,p){if(!Yr(a))throw new TypeError("Array or Matrix expected");var d=a.valueOf().map(c=>Array.isArray(c)&&c.length===1?c[0]:c),g=p?this.clone():this;return s(g,d,h)};function s(a,h,p){if(h.length===0){for(var d=a._data;_e(d);)d=d[0];return d}return a._size=h.slice(0),a._data=rn(a._data,a._size,p),a}n.prototype.reshape=function(a,h){var p=h?this.clone():this;p._data=Lt(p._data,a);var d=p._size.reduce((g,c)=>g*c);return p._size=In(a,d),p};function f(a,h,p){for(var d=a._size.slice(0),g=!1;d.length<h.length;)d.push(0),g=!0;for(var c=0,m=h.length;c<m;c++)h[c]>d[c]&&(d[c]=h[c],g=!0);g&&s(a,d,p)}n.prototype.clone=function(){var a=new n({data:Ee(this._data),size:Ee(this._size),datatype:this._datatype});return a},n.prototype.size=function(){return this._size.slice(0)},n.prototype.map=function(a){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,p=this,d=p._size.length-1;if(d<0)return p.clone();var g=nn(a,p,"map",h),c=g.fn,m=p.create(void 0,p._datatype);if(m._size=p._size,h||g.isUnary)return m._data=D(p._data),m;if(d===0){for(var w=p.valueOf(),C=Array(w.length),F=0;F<w.length;F++)C[F]=c(w[F],[F],p);return m._data=C,m}var A=[];return m._data=y(p._data),m;function y(b){var B=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,N=Array(b.length);if(B<d)for(var M=0;M<b.length;M++)A[B]=M,N[M]=y(b[M],B+1);else for(var I=0;I<b.length;I++)A[B]=I,N[I]=c(b[I],A.slice(),p);return N}function D(b){var B=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,N=Array(b.length);if(B<d)for(var M=0;M<b.length;M++)N[M]=D(b[M],B+1);else for(var I=0;I<b.length;I++)N[I]=c(b[I]);return N}},n.prototype.forEach=function(a){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,p=this,d=p._size.length-1;if(d<0)return;var g=nn(a,p,"map",h),c=g.fn;if(h||g.isUnary){F(p._data);return}if(d===0){for(var m=0;m<p._data.length;m++)c(p._data[m],[m],p);return}var w=[];C(p._data);function C(A){var y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;if(y<d)for(var D=0;D<A.length;D++)w[y]=D,C(A[D],y+1);else for(var b=0;b<A.length;b++)w[y]=b,c(A[b],w.slice(),p)}function F(A){var y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;if(y<d)for(var D=0;D<A.length;D++)F(A[D],y+1);else for(var b=0;b<A.length;b++)c(A[b])}},n.prototype[Symbol.iterator]=function*(){var a=this._size.length-1;if(!(a<0)){if(a===0){for(var h=0;h<this._data.length;h++)yield{value:this._data[h],index:[h]};return}for(var p=Array(a+1).fill(0),d=this._size.reduce((C,F)=>C*F,1),g=0;g<d;g++){for(var c=this._data,m=0;m<a;m++)c=c[p[m]];yield{value:c[p[a]],index:p.slice()};for(var w=a;w>=0&&(p[w]++,!(p[w]<this._size[w]));w--)p[w]=0}}},n.prototype.rows=function(){var a=[],h=this.size();if(h.length!==2)throw new TypeError("Rows can only be returned for a 2D matrix.");var p=this._data;for(var d of p)a.push(new n([d],this._datatype));return a},n.prototype.columns=function(){var a=this,h=[],p=this.size();if(p.length!==2)throw new TypeError("Rows can only be returned for a 2D matrix.");for(var d=this._data,g=function(w){var C=d.map(F=>[F[w]]);h.push(new n(C,a._datatype))},c=0;c<p[1];c++)g(c);return h},n.prototype.toArray=function(){return Ee(this._data)},n.prototype.valueOf=function(){return this._data},n.prototype.format=function(a){return Ne(this._data,a)},n.prototype.toString=function(){return Ne(this._data)},n.prototype.toJSON=function(){return{mathjs:"DenseMatrix",data:this._data,size:this._size,datatype:this._datatype}},n.prototype.diagonal=function(a){if(a){if(be(a)&&(a=a.toNumber()),!pe(a)||!ge(a))throw new TypeError("The parameter k must be an integer number")}else a=0;for(var h=a>0?a:0,p=a<0?-a:0,d=this._size[0],g=this._size[1],c=Math.min(d-p,g-h),m=[],w=0;w<c;w++)m[w]=this._data[w+p][w+h];return new n({data:m,size:[c],datatype:this._datatype})},n.diagonal=function(a,h,p,d){if(!_e(a))throw new TypeError("Array expected, size parameter");if(a.length!==2)throw new Error("Only two dimensions matrix are supported");if(a=a.map(function(b){if(be(b)&&(b=b.toNumber()),!pe(b)||!ge(b)||b<1)throw new Error("Size values must be positive integers");return b}),p){if(be(p)&&(p=p.toNumber()),!pe(p)||!ge(p))throw new TypeError("The parameter k must be an integer number")}else p=0;var g=p>0?p:0,c=p<0?-p:0,m=a[0],w=a[1],C=Math.min(m-c,w-g),F;if(_e(h)){if(h.length!==C)throw new Error("Invalid value array length");F=function(B){return h[B]}}else if(Ce(h)){var A=h.size();if(A.length!==1||A[0]!==C)throw new Error("Invalid matrix length");F=function(B){return h.get([B])}}else F=function(){return h};d||(d=be(F(0))?F(0).mul(0):0);var y=[];if(a.length>0){y=rn(y,a,d);for(var D=0;D<C;D++)y[D+c][D+g]=F(D)}return new n({data:y,size:[m,w]})},n.fromJSON=function(a){return new n(a)},n.prototype.swapRows=function(a,h){if(!pe(a)||!ge(a)||!pe(h)||!ge(h))throw new Error("Row index must be positive integers");if(this._size.length!==2)throw new Error("Only two dimensional matrix is supported");return we(a,this._size[0]),we(h,this._size[0]),n._swapRows(a,h,this._data),this},n._swapRows=function(a,h,p){var d=p[a];p[a]=p[h],p[h]=d};function l(a){return Ce(a)?l(a.valueOf()):_e(a)?a.map(l):a}return n},{isClass:!0});function sr(e,r,n){if(!n)return Ce(e)?e.map(t=>r(t),!1,!0):et(e,r,!0);var i=t=>t===0?t:r(t);return Ce(e)?e.map(t=>i(t),!1,!0):et(e,i,!0)}var Jt="number",cn="number, number";function Xt(e){return Math.abs(e)}Xt.signature=Jt;function Kt(e,r){return e+r}Kt.signature=cn;function Qt(e,r){return e-r}Qt.signature=cn;function ei(e,r){return e*r}ei.signature=cn;function ri(e){return-e}ri.signature=Jt;function ni(e,r){return e*e<1&&r===1/0||e*e>1&&r===-1/0?0:Math.pow(e,r)}ni.signature=cn;function Pr(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;if(!ge(r)||r<0||r>15)throw new Error("Number of decimals in function round must be an integer from 0 to 15 inclusive");return parseFloat(Nt(e,r))}function An(e,r){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1e-9,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;if(n<=0)throw new Error("Relative tolerance must be greater than 0");if(i<0)throw new Error("Absolute tolerance must be at least 0");return e.isNaN()||r.isNaN()?!1:!e.isFinite()||!r.isFinite()?e.eq(r):e.eq(r)?!0:e.minus(r).abs().lte(e.constructor.max(e.constructor.max(e.abs(),r.abs()).mul(n),i))}var nt="isZero",$s=["typed","equalScalar"],Us=re(nt,$s,e=>{var{typed:r,equalScalar:n}=e;return r(nt,{"number | BigNumber | Complex | Fraction":i=>n(i,0),bigint:i=>i===0n,Unit:r.referToSelf(i=>t=>r.find(i,t.valueType())(t.value)),"Array | Matrix":r.referToSelf(i=>t=>sr(t,i))})});function Vs(e,r,n,i){return Sr(e.re,r.re,n,i)&&Sr(e.im,r.im,n,i)}var ks=re("compareUnits",["typed"],e=>{var{typed:r}=e;return{"Unit, Unit":r.referToSelf(n=>(i,t)=>{if(!i.equalBase(t))throw new Error("Cannot compare units with different base");return r.find(n,[i.valueType(),t.valueType()])(i.value,t.value)})}}),tn="equalScalar",qs=["typed","config"],Ls=re(tn,qs,e=>{var{typed:r,config:n}=e,i=ks({typed:r});return r(tn,{"boolean, boolean":function(u,o){return u===o},"number, number":function(u,o){return Sr(u,o,n.relTol,n.absTol)},"BigNumber, BigNumber":function(u,o){return u.eq(o)||An(u,o,n.relTol,n.absTol)},"bigint, bigint":function(u,o){return u===o},"Fraction, Fraction":function(u,o){return u.equals(o)},"Complex, Complex":function(u,o){return Vs(u,o,n.relTol,n.absTol)}},i)});re(tn,["typed","config"],e=>{var{typed:r,config:n}=e;return r(tn,{"number, number":function(t,u){return Sr(t,u,n.relTol,n.absTol)}})});var Gs="SparseMatrix",Hs=["typed","equalScalar","Matrix"],Ws=re(Gs,Hs,e=>{var{typed:r,equalScalar:n,Matrix:i}=e;function t(c,m){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(m&&!er(m))throw new Error("Invalid datatype: "+m);if(Ce(c))u(this,c,m);else if(c&&_e(c.index)&&_e(c.ptr)&&_e(c.size))this._values=c.values,this._index=c.index,this._ptr=c.ptr,this._size=c.size,this._datatype=m||c.datatype;else if(_e(c))o(this,c,m);else{if(c)throw new TypeError("Unsupported type of data ("+lr(c)+")");this._values=[],this._index=[],this._ptr=[0],this._size=[0,0],this._datatype=m}}function u(c,m,w){m.type==="SparseMatrix"?(c._values=m._values?Ee(m._values):void 0,c._index=Ee(m._index),c._ptr=Ee(m._ptr),c._size=Ee(m._size),c._datatype=w||m._datatype):o(c,m.valueOf(),w||m._datatype)}function o(c,m,w){c._values=[],c._index=[],c._ptr=[],c._datatype=w;var C=m.length,F=0,A=n,y=0;if(er(w)&&(A=r.find(n,[w,w])||n,y=r.convert(0,w)),C>0){var D=0;do{c._ptr.push(c._index.length);for(var b=0;b<C;b++){var B=m[b];if(_e(B)){if(D===0&&F<B.length&&(F=B.length),D<B.length){var N=B[D];A(N,y)||(c._values.push(N),c._index.push(b))}}else D===0&&F<1&&(F=1),A(B,y)||(c._values.push(B),c._index.push(b))}D++}while(D<F)}c._ptr.push(c._index.length),c._size=[C,F]}t.prototype=new i,t.prototype.createSparseMatrix=function(c,m){return new t(c,m)},Object.defineProperty(t,"name",{value:"SparseMatrix"}),t.prototype.constructor=t,t.prototype.type="SparseMatrix",t.prototype.isSparseMatrix=!0,t.prototype.getDataType=function(){return xn(this._values,lr)},t.prototype.storage=function(){return"sparse"},t.prototype.datatype=function(){return this._datatype},t.prototype.create=function(c,m){return new t(c,m)},t.prototype.density=function(){var c=this._size[0],m=this._size[1];return c!==0&&m!==0?this._index.length/(c*m):0},t.prototype.subset=function(c,m,w){if(!this._values)throw new Error("Cannot invoke subset on a Pattern only matrix");switch(arguments.length){case 1:return s(this,c);case 2:case 3:return f(this,c,m,w);default:throw new SyntaxError("Wrong number of arguments")}};function s(c,m){if(!_n(m))throw new TypeError("Invalid index");var w=m.isScalar();if(w)return c.get(m.min());var C=m.size();if(C.length!==c._size.length)throw new me(C.length,c._size.length);var F,A,y,D,b=m.min(),B=m.max();for(F=0,A=c._size.length;F<A;F++)we(b[F],c._size[F]),we(B[F],c._size[F]);var N=c._values,M=c._index,I=c._ptr,q=m.dimension(0),W=m.dimension(1),Z=[],L=[];q.forEach(function(Y,Q){L[Y]=Q[0],Z[Y]=!0});var $=N?[]:void 0,X=[],j=[];return W.forEach(function(Y){for(j.push(X.length),y=I[Y],D=I[Y+1];y<D;y++)F=M[y],Z[F]===!0&&(X.push(L[F]),$&&$.push(N[y]))}),j.push(X.length),new t({values:$,index:X,ptr:j,size:C,datatype:c._datatype})}function f(c,m,w,C){if(!m||m.isIndex!==!0)throw new TypeError("Invalid index");var F=m.size(),A=m.isScalar(),y;if(Ce(w)?(y=w.size(),w=w.toArray()):y=Ue(w),A){if(y.length!==0)throw new TypeError("Scalar expected");c.set(m.min(),w,C)}else{if(F.length!==1&&F.length!==2)throw new me(F.length,c._size.length,"<");if(y.length<F.length){for(var D=0,b=0;F[D]===1&&y[D]===1;)D++;for(;F[D]===1;)b++,D++;w=Ht(w,F.length,b,y)}if(!_r(F,y))throw new me(F,y,">");if(F.length===1){var B=m.dimension(0);B.forEach(function(I,q){we(I),c.set([I,0],w[q[0]],C)})}else{var N=m.dimension(0),M=m.dimension(1);N.forEach(function(I,q){we(I),M.forEach(function(W,Z){we(W),c.set([I,W],w[q[0]][Z[0]],C)})})}}return c}t.prototype.get=function(c){if(!_e(c))throw new TypeError("Array expected");if(c.length!==this._size.length)throw new me(c.length,this._size.length);if(!this._values)throw new Error("Cannot invoke get on a Pattern only matrix");var m=c[0],w=c[1];we(m,this._size[0]),we(w,this._size[1]);var C=l(m,this._ptr[w],this._ptr[w+1],this._index);return C<this._ptr[w+1]&&this._index[C]===m?this._values[C]:0},t.prototype.set=function(c,m,w){if(!_e(c))throw new TypeError("Array expected");if(c.length!==this._size.length)throw new me(c.length,this._size.length);if(!this._values)throw new Error("Cannot invoke set on a Pattern only matrix");var C=c[0],F=c[1],A=this._size[0],y=this._size[1],D=n,b=0;er(this._datatype)&&(D=r.find(n,[this._datatype,this._datatype])||n,b=r.convert(0,this._datatype)),(C>A-1||F>y-1)&&(p(this,Math.max(C+1,A),Math.max(F+1,y),w),A=this._size[0],y=this._size[1]),we(C,A),we(F,y);var B=l(C,this._ptr[F],this._ptr[F+1],this._index);return B<this._ptr[F+1]&&this._index[B]===C?D(m,b)?a(B,F,this._values,this._index,this._ptr):this._values[B]=m:D(m,b)||h(B,C,F,m,this._values,this._index,this._ptr),this};function l(c,m,w,C){if(w-m===0)return w;for(var F=m;F<w;F++)if(C[F]===c)return F;return m}function a(c,m,w,C,F){w.splice(c,1),C.splice(c,1);for(var A=m+1;A<F.length;A++)F[A]--}function h(c,m,w,C,F,A,y){F.splice(c,0,C),A.splice(c,0,m);for(var D=w+1;D<y.length;D++)y[D]++}t.prototype.resize=function(c,m,w){if(!Yr(c))throw new TypeError("Array or Matrix expected");var C=c.valueOf().map(A=>Array.isArray(A)&&A.length===1?A[0]:A);if(C.length!==2)throw new Error("Only two dimensions matrix are supported");C.forEach(function(A){if(!pe(A)||!ge(A)||A<0)throw new TypeError("Invalid size, must contain positive integers (size: "+Ne(C)+")")});var F=w?this.clone():this;return p(F,C[0],C[1],m)};function p(c,m,w,C){var F=C||0,A=n,y=0;er(c._datatype)&&(A=r.find(n,[c._datatype,c._datatype])||n,y=r.convert(0,c._datatype),F=r.convert(F,c._datatype));var D=!A(F,y),b=c._size[0],B=c._size[1],N,M,I;if(w>B){for(M=B;M<w;M++)if(c._ptr[M]=c._values.length,D)for(N=0;N<b;N++)c._values.push(F),c._index.push(N);c._ptr[w]=c._values.length}else w<B&&(c._ptr.splice(w+1,B-w),c._values.splice(c._ptr[w],c._values.length),c._index.splice(c._ptr[w],c._index.length));if(B=w,m>b){if(D){var q=0;for(M=0;M<B;M++){c._ptr[M]=c._ptr[M]+q,I=c._ptr[M+1]+q;var W=0;for(N=b;N<m;N++,W++)c._values.splice(I+W,0,F),c._index.splice(I+W,0,N),q++}c._ptr[B]=c._values.length}}else if(m<b){var Z=0;for(M=0;M<B;M++){c._ptr[M]=c._ptr[M]-Z;var L=c._ptr[M],$=c._ptr[M+1]-Z;for(I=L;I<$;I++)N=c._index[I],N>m-1&&(c._values.splice(I,1),c._index.splice(I,1),Z++)}c._ptr[M]=c._values.length}return c._size[0]=m,c._size[1]=w,c}t.prototype.reshape=function(c,m){if(!_e(c))throw new TypeError("Array expected");if(c.length!==2)throw new Error("Sparse matrices can only be reshaped in two dimensions");c.forEach(function(Y){if(!pe(Y)||!ge(Y)||Y<=-2||Y===0)throw new TypeError("Invalid size, must contain positive integers or -1 (size: "+Ne(c)+")")});var w=this._size[0]*this._size[1];c=In(c,w);var C=c[0]*c[1];if(w!==C)throw new Error("Reshaping sparse matrix will result in the wrong number of elements");var F=m?this.clone():this;if(this._size[0]===c[0]&&this._size[1]===c[1])return F;for(var A=[],y=0;y<F._ptr.length;y++)for(var D=0;D<F._ptr[y+1]-F._ptr[y];D++)A.push(y);for(var b=F._values.slice(),B=F._index.slice(),N=0;N<F._index.length;N++){var M=B[N],I=A[N],q=M*F._size[1]+I;A[N]=q%c[1],B[N]=Math.floor(q/c[1])}F._values.length=0,F._index.length=0,F._ptr.length=c[1]+1,F._size=c.slice();for(var W=0;W<F._ptr.length;W++)F._ptr[W]=0;for(var Z=0;Z<b.length;Z++){var L=B[Z],$=A[Z],X=b[Z],j=l(L,F._ptr[$],F._ptr[$+1],F._index);h(j,L,$,X,F._values,F._index,F._ptr)}return F},t.prototype.clone=function(){var c=new t({values:this._values?Ee(this._values):void 0,index:Ee(this._index),ptr:Ee(this._ptr),size:Ee(this._size),datatype:this._datatype});return c},t.prototype.size=function(){return this._size.slice(0)},t.prototype.map=function(c,m){if(!this._values)throw new Error("Cannot invoke map on a Pattern only matrix");var w=this,C=this._size[0],F=this._size[1],A=nn(c,w,"map"),y=function(b,B,N){return A.fn(b,[B,N],w)};return d(this,0,C-1,0,F-1,y,m)};function d(c,m,w,C,F,A,y){var D=[],b=[],B=[],N=n,M=0;er(c._datatype)&&(N=r.find(n,[c._datatype,c._datatype])||n,M=r.convert(0,c._datatype));for(var I=function(se,Ae,Fe){var ve=A(se,Ae,Fe);N(ve,M)||(D.push(ve),b.push(Ae))},q=C;q<=F;q++){B.push(D.length);var W=c._ptr[q],Z=c._ptr[q+1];if(y)for(var L=W;L<Z;L++){var $=c._index[L];$>=m&&$<=w&&I(c._values[L],$-m,q-C)}else{for(var X={},j=W;j<Z;j++){var Y=c._index[j];X[Y]=c._values[j]}for(var Q=m;Q<=w;Q++){var ie=Q in X?X[Q]:0;I(ie,Q-m,q-C)}}}return B.push(D.length),new t({values:D,index:b,ptr:B,size:[w-m+1,F-C+1]})}t.prototype.forEach=function(c,m){if(!this._values)throw new Error("Cannot invoke forEach on a Pattern only matrix");for(var w=this,C=this._size[0],F=this._size[1],A=nn(c,w,"forEach"),y=0;y<F;y++){var D=this._ptr[y],b=this._ptr[y+1];if(m)for(var B=D;B<b;B++){var N=this._index[B];A.fn(this._values[B],[N,y],w)}else{for(var M={},I=D;I<b;I++){var q=this._index[I];M[q]=this._values[I]}for(var W=0;W<C;W++){var Z=W in M?M[W]:0;A.fn(Z,[W,y],w)}}}},t.prototype[Symbol.iterator]=function*(){if(!this._values)throw new Error("Cannot iterate a Pattern only matrix");for(var c=this._size[1],m=0;m<c;m++)for(var w=this._ptr[m],C=this._ptr[m+1],F=w;F<C;F++){var A=this._index[F];yield{value:this._values[F],index:[A,m]}}},t.prototype.toArray=function(){return g(this._values,this._index,this._ptr,this._size,!0)},t.prototype.valueOf=function(){return g(this._values,this._index,this._ptr,this._size,!1)};function g(c,m,w,C,F){var A=C[0],y=C[1],D=[],b,B;for(b=0;b<A;b++)for(D[b]=[],B=0;B<y;B++)D[b][B]=0;for(B=0;B<y;B++)for(var N=w[B],M=w[B+1],I=N;I<M;I++)b=m[I],D[b][B]=c?F?Ee(c[I]):c[I]:1;return D}return t.prototype.format=function(c){for(var m=this._size[0],w=this._size[1],C=this.density(),F="Sparse Matrix ["+Ne(m,c)+" x "+Ne(w,c)+"] density: "+Ne(C,c)+`
`,A=0;A<w;A++)for(var y=this._ptr[A],D=this._ptr[A+1],b=y;b<D;b++){var B=this._index[b];F+=`
    (`+Ne(B,c)+", "+Ne(A,c)+") ==> "+(this._values?Ne(this._values[b],c):"X")}return F},t.prototype.toString=function(){return Ne(this.toArray())},t.prototype.toJSON=function(){return{mathjs:"SparseMatrix",values:this._values,index:this._index,ptr:this._ptr,size:this._size,datatype:this._datatype}},t.prototype.diagonal=function(c){if(c){if(be(c)&&(c=c.toNumber()),!pe(c)||!ge(c))throw new TypeError("The parameter k must be an integer number")}else c=0;var m=c>0?c:0,w=c<0?-c:0,C=this._size[0],F=this._size[1],A=Math.min(C-w,F-m),y=[],D=[],b=[];b[0]=0;for(var B=m;B<F&&y.length<A;B++)for(var N=this._ptr[B],M=this._ptr[B+1],I=N;I<M;I++){var q=this._index[I];if(q===B-m+w){y.push(this._values[I]),D[y.length-1]=q-w;break}}return b.push(y.length),new t({values:y,index:D,ptr:b,size:[A,1]})},t.fromJSON=function(c){return new t(c)},t.diagonal=function(c,m,w,C,F){if(!_e(c))throw new TypeError("Array expected, size parameter");if(c.length!==2)throw new Error("Only two dimensions matrix are supported");if(c=c.map(function(Y){if(be(Y)&&(Y=Y.toNumber()),!pe(Y)||!ge(Y)||Y<1)throw new Error("Size values must be positive integers");return Y}),w){if(be(w)&&(w=w.toNumber()),!pe(w)||!ge(w))throw new TypeError("The parameter k must be an integer number")}else w=0;var A=n,y=0;er(F)&&(A=r.find(n,[F,F])||n,y=r.convert(0,F));var D=w>0?w:0,b=w<0?-w:0,B=c[0],N=c[1],M=Math.min(B-b,N-D),I;if(_e(m)){if(m.length!==M)throw new Error("Invalid value array length");I=function(Q){return m[Q]}}else if(Ce(m)){var q=m.size();if(q.length!==1||q[0]!==M)throw new Error("Invalid matrix length");I=function(Q){return m.get([Q])}}else I=function(){return m};for(var W=[],Z=[],L=[],$=0;$<N;$++){L.push(W.length);var X=$-D;if(X>=0&&X<M){var j=I(X);A(j,y)||(Z.push(X+b),W.push(j))}}return L.push(W.length),new t({values:W,index:Z,ptr:L,size:[B,N]})},t.prototype.swapRows=function(c,m){if(!pe(c)||!ge(c)||!pe(m)||!ge(m))throw new Error("Row index must be positive integers");if(this._size.length!==2)throw new Error("Only two dimensional matrix is supported");return we(c,this._size[0]),we(m,this._size[0]),t._swapRows(c,m,this._size[1],this._values,this._index,this._ptr),this},t._forEachRow=function(c,m,w,C,F){for(var A=C[c],y=C[c+1],D=A;D<y;D++)F(w[D],m[D])},t._swapRows=function(c,m,w,C,F,A){for(var y=0;y<w;y++){var D=A[y],b=A[y+1],B=l(c,D,b,F),N=l(m,D,b,F);if(B<b&&N<b&&F[B]===c&&F[N]===m){if(C){var M=C[B];C[B]=C[N],C[N]=M}continue}if(B<b&&F[B]===c&&(N>=b||F[N]!==m)){var I=C?C[B]:void 0;F.splice(N,0,m),C&&C.splice(N,0,I),F.splice(N<=B?B+1:B,1),C&&C.splice(N<=B?B+1:B,1);continue}if(N<b&&F[N]===m&&(B>=b||F[B]!==c)){var q=C?C[N]:void 0;F.splice(B,0,c),C&&C.splice(B,0,q),F.splice(B<=N?N+1:N,1),C&&C.splice(B<=N?N+1:N,1)}}},t},{isClass:!0}),Zs="number",js=["typed"];function Ys(e){var r=e.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);if(r){var n={"0b":2,"0o":8,"0x":16}[r[1]],i=r[2],t=r[3];return{input:e,radix:n,integerPart:i,fractionalPart:t}}else return null}function Js(e){for(var r=parseInt(e.integerPart,e.radix),n=0,i=0;i<e.fractionalPart.length;i++){var t=parseInt(e.fractionalPart[i],e.radix);n+=t/Math.pow(e.radix,i+1)}var u=r+n;if(isNaN(u))throw new SyntaxError('String "'+e.input+'" is not a valid number');return u}var Xs=re(Zs,js,e=>{var{typed:r}=e,n=r("number",{"":function(){return 0},number:function(t){return t},string:function(t){if(t==="NaN")return NaN;var u=Ys(t);if(u)return Js(u);var o=0,s=t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);s&&(o=Number(s[2]),t=s[1]);var f=Number(t);if(isNaN(f))throw new SyntaxError('String "'+t+'" is not a valid number');if(s){if(f>2**o-1)throw new SyntaxError('String "'.concat(t,'" is out of range'));f>=2**(o-1)&&(f=f-2**o)}return f},BigNumber:function(t){return t.toNumber()},bigint:function(t){return Number(t)},Fraction:function(t){return t.valueOf()},Unit:r.referToSelf(i=>t=>{var u=t.clone();return u.value=i(t.value),u}),null:function(t){return 0},"Unit, string | Unit":function(t,u){return t.toNumber(u)},"Array | Matrix":r.referToSelf(i=>t=>sr(t,i))});return n.fromJSON=function(i){return parseFloat(i.value)},n}),Ks="bignumber",Qs=["typed","BigNumber"],ea=re(Ks,Qs,e=>{var{typed:r,BigNumber:n}=e;return r("bignumber",{"":function(){return new n(0)},number:function(t){return new n(t+"")},string:function(t){var u=t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);if(u){var o=u[2],s=n(u[1]),f=new n(2).pow(Number(o));if(s.gt(f.sub(1)))throw new SyntaxError('String "'.concat(t,'" is out of range'));var l=new n(2).pow(Number(o)-1);return s.gte(l)?s.sub(f):s}return new n(t)},BigNumber:function(t){return t},bigint:function(t){return new n(t.toString())},Unit:r.referToSelf(i=>t=>{var u=t.clone();return u.value=i(t.value),u}),Fraction:function(t){return new n(String(t.n)).div(String(t.d)).times(String(t.s))},null:function(t){return new n(0)},"Array | Matrix":r.referToSelf(i=>t=>sr(t,i))})}),ra="fraction",na=["typed","Fraction"],ta=re(ra,na,e=>{var{typed:r,Fraction:n}=e;return r("fraction",{number:function(t){if(!isFinite(t)||isNaN(t))throw new Error(t+" cannot be represented as a fraction");return new n(t)},string:function(t){return new n(t)},"number, number":function(t,u){return new n(t,u)},"bigint, bigint":function(t,u){return new n(t,u)},null:function(t){return new n(0)},BigNumber:function(t){return new n(t.toString())},bigint:function(t){return new n(t.toString())},Fraction:function(t){return t},Unit:r.referToSelf(i=>t=>{var u=t.clone();return u.value=i(t.value),u}),Object:function(t){return new n(t)},"Array | Matrix":r.referToSelf(i=>t=>sr(t,i))})}),tt="matrix",ia=["typed","Matrix","DenseMatrix","SparseMatrix"],ua=re(tt,ia,e=>{var{typed:r,Matrix:n,DenseMatrix:i,SparseMatrix:t}=e;return r(tt,{"":function(){return u([])},string:function(s){return u([],s)},"string, string":function(s,f){return u([],s,f)},Array:function(s){return u(s)},Matrix:function(s){return u(s,s.storage())},"Array | Matrix, string":u,"Array | Matrix, string, string":u});function u(o,s,f){if(s==="dense"||s==="default"||s===void 0)return new i(o,f);if(s==="sparse")return new t(o,f);throw new TypeError("Unknown matrix type "+JSON.stringify(s)+".")}}),it="unaryMinus",oa=["typed"],sa=re(it,oa,e=>{var{typed:r}=e;return r(it,{number:ri,"Complex | BigNumber | Fraction":n=>n.neg(),bigint:n=>-n,Unit:r.referToSelf(n=>i=>{var t=i.clone();return t.value=r.find(n,t.valueType())(i.value),t}),"Array | Matrix":r.referToSelf(n=>i=>sr(i,n,!0))})}),ut="abs",aa=["typed"],ca=re(ut,aa,e=>{var{typed:r}=e;return r(ut,{number:Xt,"Complex | BigNumber | Fraction | Unit":n=>n.abs(),bigint:n=>n<0n?-n:n,"Array | Matrix":r.referToSelf(n=>i=>sr(i,n,!0))})}),ot="addScalar",fa=["typed"],la=re(ot,fa,e=>{var{typed:r}=e;return r(ot,{"number, number":Kt,"Complex, Complex":function(i,t){return i.add(t)},"BigNumber, BigNumber":function(i,t){return i.plus(t)},"bigint, bigint":function(i,t){return i+t},"Fraction, Fraction":function(i,t){return i.add(t)},"Unit, Unit":r.referToSelf(n=>(i,t)=>{if(i.value===null||i.value===void 0)throw new Error("Parameter x contains a unit with undefined value");if(t.value===null||t.value===void 0)throw new Error("Parameter y contains a unit with undefined value");if(!i.equalBase(t))throw new Error("Units do not match");var u=i.clone();return u.value=r.find(n,[u.valueType(),t.valueType()])(u.value,t.value),u.fixPrefix=!1,u})})}),st="subtractScalar",ha=["typed"],pa=re(st,ha,e=>{var{typed:r}=e;return r(st,{"number, number":Qt,"Complex, Complex":function(i,t){return i.sub(t)},"BigNumber, BigNumber":function(i,t){return i.minus(t)},"bigint, bigint":function(i,t){return i-t},"Fraction, Fraction":function(i,t){return i.sub(t)},"Unit, Unit":r.referToSelf(n=>(i,t)=>{if(i.value===null||i.value===void 0)throw new Error("Parameter x contains a unit with undefined value");if(t.value===null||t.value===void 0)throw new Error("Parameter y contains a unit with undefined value");if(!i.equalBase(t))throw new Error("Units do not match");var u=i.clone();return u.value=r.find(n,[u.valueType(),t.valueType()])(u.value,t.value),u.fixPrefix=!1,u})})}),da="matAlgo11xS0s",ga=["typed","equalScalar"],ti=re(da,ga,e=>{var{typed:r,equalScalar:n}=e;return function(t,u,o,s){var f=t._values,l=t._index,a=t._ptr,h=t._size,p=t._datatype;if(!f)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var d=h[0],g=h[1],c,m=n,w=0,C=o;typeof p=="string"&&(c=p,m=r.find(n,[c,c]),w=r.convert(0,c),u=r.convert(u,c),C=r.find(o,[c,c]));for(var F=[],A=[],y=[],D=0;D<g;D++){y[D]=A.length;for(var b=a[D],B=a[D+1],N=b;N<B;N++){var M=l[N],I=s?C(u,f[N]):C(f[N],u);m(I,w)||(A.push(M),F.push(I))}}return y[g]=A.length,t.createSparseMatrix({values:F,index:A,ptr:y,size:[d,g],datatype:c})}}),ma="matAlgo12xSfs",Da=["typed","DenseMatrix"],va=re(ma,Da,e=>{var{typed:r,DenseMatrix:n}=e;return function(t,u,o,s){var f=t._values,l=t._index,a=t._ptr,h=t._size,p=t._datatype;if(!f)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var d=h[0],g=h[1],c,m=o;typeof p=="string"&&(c=p,u=r.convert(u,c),m=r.find(o,[c,c]));for(var w=[],C=[],F=[],A=0;A<g;A++){for(var y=A+1,D=a[A],b=a[A+1],B=D;B<b;B++){var N=l[B];C[N]=f[B],F[N]=y}for(var M=0;M<d;M++)A===0&&(w[M]=[]),F[M]===y?w[M][A]=s?m(u,C[M]):m(C[M],u):w[M][A]=s?m(u,0):m(0,u)}return new n({data:w,size:[d,g],datatype:c})}}),ya="matAlgo14xDs",wa=["typed"],ii=re(ya,wa,e=>{var{typed:r}=e;return function(t,u,o,s){var f=t._data,l=t._size,a=t._datatype,h,p=o;typeof a=="string"&&(h=a,u=r.convert(u,h),p=r.find(o,[h,h]));var d=l.length>0?n(p,0,l,l[0],f,u,s):[];return t.createDenseMatrix({data:d,size:Ee(l),datatype:h})};function n(i,t,u,o,s,f,l){var a=[];if(t===u.length-1)for(var h=0;h<o;h++)a[h]=l?i(f,s[h]):i(s[h],f);else for(var p=0;p<o;p++)a[p]=n(i,t+1,u,u[t+1],s[p],f,l);return a}}),Fa="multiplyScalar",Ea=["typed"],Ca=re(Fa,Ea,e=>{var{typed:r}=e;return r("multiplyScalar",{"number, number":ei,"Complex, Complex":function(i,t){return i.mul(t)},"BigNumber, BigNumber":function(i,t){return i.times(t)},"bigint, bigint":function(i,t){return i*t},"Fraction, Fraction":function(i,t){return i.mul(t)},"number | Fraction | BigNumber | Complex, Unit":(n,i)=>i.multiply(n),"Unit, number | Fraction | BigNumber | Complex | Unit":(n,i)=>n.multiply(i)})}),at="multiply",ba=["typed","matrix","addScalar","multiplyScalar","equalScalar","dot"],Aa=re(at,ba,e=>{var{typed:r,matrix:n,addScalar:i,multiplyScalar:t,equalScalar:u,dot:o}=e,s=ti({typed:r,equalScalar:u}),f=ii({typed:r});function l(y,D){switch(y.length){case 1:switch(D.length){case 1:if(y[0]!==D[0])throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");break;case 2:if(y[0]!==D[0])throw new RangeError("Dimension mismatch in multiplication. Vector length ("+y[0]+") must match Matrix rows ("+D[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+D.length+" dimensions)")}break;case 2:switch(D.length){case 1:if(y[1]!==D[0])throw new RangeError("Dimension mismatch in multiplication. Matrix columns ("+y[1]+") must match Vector length ("+D[0]+")");break;case 2:if(y[1]!==D[0])throw new RangeError("Dimension mismatch in multiplication. Matrix A columns ("+y[1]+") must match Matrix B rows ("+D[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+D.length+" dimensions)")}break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has "+y.length+" dimensions)")}}function a(y,D,b){if(b===0)throw new Error("Cannot multiply two empty vectors");return o(y,D)}function h(y,D){if(D.storage()!=="dense")throw new Error("Support for SparseMatrix not implemented");return p(y,D)}function p(y,D){var b=y._data,B=y._size,N=y._datatype||y.getDataType(),M=D._data,I=D._size,q=D._datatype||D.getDataType(),W=B[0],Z=I[1],L,$=i,X=t;N&&q&&N===q&&typeof N=="string"&&N!=="mixed"&&(L=N,$=r.find(i,[L,L]),X=r.find(t,[L,L]));for(var j=[],Y=0;Y<Z;Y++){for(var Q=X(b[0],M[0][Y]),ie=1;ie<W;ie++)Q=$(Q,X(b[ie],M[ie][Y]));j[Y]=Q}return y.createDenseMatrix({data:j,size:[Z],datatype:N===y._datatype&&q===D._datatype?L:void 0})}var d=r("_multiplyMatrixVector",{"DenseMatrix, any":c,"SparseMatrix, any":C}),g=r("_multiplyMatrixMatrix",{"DenseMatrix, DenseMatrix":m,"DenseMatrix, SparseMatrix":w,"SparseMatrix, DenseMatrix":F,"SparseMatrix, SparseMatrix":A});function c(y,D){var b=y._data,B=y._size,N=y._datatype||y.getDataType(),M=D._data,I=D._datatype||D.getDataType(),q=B[0],W=B[1],Z,L=i,$=t;N&&I&&N===I&&typeof N=="string"&&N!=="mixed"&&(Z=N,L=r.find(i,[Z,Z]),$=r.find(t,[Z,Z]));for(var X=[],j=0;j<q;j++){for(var Y=b[j],Q=$(Y[0],M[0]),ie=1;ie<W;ie++)Q=L(Q,$(Y[ie],M[ie]));X[j]=Q}return y.createDenseMatrix({data:X,size:[q],datatype:N===y._datatype&&I===D._datatype?Z:void 0})}function m(y,D){var b=y._data,B=y._size,N=y._datatype||y.getDataType(),M=D._data,I=D._size,q=D._datatype||D.getDataType(),W=B[0],Z=B[1],L=I[1],$,X=i,j=t;N&&q&&N===q&&typeof N=="string"&&N!=="mixed"&&N!=="mixed"&&($=N,X=r.find(i,[$,$]),j=r.find(t,[$,$]));for(var Y=[],Q=0;Q<W;Q++){var ie=b[Q];Y[Q]=[];for(var ne=0;ne<L;ne++){for(var se=j(ie[0],M[0][ne]),Ae=1;Ae<Z;Ae++)se=X(se,j(ie[Ae],M[Ae][ne]));Y[Q][ne]=se}}return y.createDenseMatrix({data:Y,size:[W,L],datatype:N===y._datatype&&q===D._datatype?$:void 0})}function w(y,D){var b=y._data,B=y._size,N=y._datatype||y.getDataType(),M=D._values,I=D._index,q=D._ptr,W=D._size,Z=D._datatype||D._data===void 0?D._datatype:D.getDataType();if(!M)throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");var L=B[0],$=W[1],X,j=i,Y=t,Q=u,ie=0;N&&Z&&N===Z&&typeof N=="string"&&N!=="mixed"&&(X=N,j=r.find(i,[X,X]),Y=r.find(t,[X,X]),Q=r.find(u,[X,X]),ie=r.convert(0,X));for(var ne=[],se=[],Ae=[],Fe=D.createSparseMatrix({values:ne,index:se,ptr:Ae,size:[L,$],datatype:N===y._datatype&&Z===D._datatype?X:void 0}),ve=0;ve<$;ve++){Ae[ve]=se.length;var he=q[ve],Re=q[ve+1];if(Re>he)for(var ae=0,ue=0;ue<L;ue++){for(var He=ue+1,xe=void 0,ce=he;ce<Re;ce++){var Me=I[ce];ae!==He?(xe=Y(b[ue][Me],M[ce]),ae=He):xe=j(xe,Y(b[ue][Me],M[ce]))}ae===He&&!Q(xe,ie)&&(se.push(ue),ne.push(xe))}}return Ae[$]=se.length,Fe}function C(y,D){var b=y._values,B=y._index,N=y._ptr,M=y._datatype||y._data===void 0?y._datatype:y.getDataType();if(!b)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var I=D._data,q=D._datatype||D.getDataType(),W=y._size[0],Z=D._size[0],L=[],$=[],X=[],j,Y=i,Q=t,ie=u,ne=0;M&&q&&M===q&&typeof M=="string"&&M!=="mixed"&&(j=M,Y=r.find(i,[j,j]),Q=r.find(t,[j,j]),ie=r.find(u,[j,j]),ne=r.convert(0,j));var se=[],Ae=[];X[0]=0;for(var Fe=0;Fe<Z;Fe++){var ve=I[Fe];if(!ie(ve,ne))for(var he=N[Fe],Re=N[Fe+1],ae=he;ae<Re;ae++){var ue=B[ae];Ae[ue]?se[ue]=Y(se[ue],Q(ve,b[ae])):(Ae[ue]=!0,$.push(ue),se[ue]=Q(ve,b[ae]))}}for(var He=$.length,xe=0;xe<He;xe++){var ce=$[xe];L[xe]=se[ce]}return X[1]=$.length,y.createSparseMatrix({values:L,index:$,ptr:X,size:[W,1],datatype:M===y._datatype&&q===D._datatype?j:void 0})}function F(y,D){var b=y._values,B=y._index,N=y._ptr,M=y._datatype||y._data===void 0?y._datatype:y.getDataType();if(!b)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var I=D._data,q=D._datatype||D.getDataType(),W=y._size[0],Z=D._size[0],L=D._size[1],$,X=i,j=t,Y=u,Q=0;M&&q&&M===q&&typeof M=="string"&&M!=="mixed"&&($=M,X=r.find(i,[$,$]),j=r.find(t,[$,$]),Y=r.find(u,[$,$]),Q=r.convert(0,$));for(var ie=[],ne=[],se=[],Ae=y.createSparseMatrix({values:ie,index:ne,ptr:se,size:[W,L],datatype:M===y._datatype&&q===D._datatype?$:void 0}),Fe=[],ve=[],he=0;he<L;he++){se[he]=ne.length;for(var Re=he+1,ae=0;ae<Z;ae++){var ue=I[ae][he];if(!Y(ue,Q))for(var He=N[ae],xe=N[ae+1],ce=He;ce<xe;ce++){var Me=B[ce];ve[Me]!==Re?(ve[Me]=Re,ne.push(Me),Fe[Me]=j(ue,b[ce])):Fe[Me]=X(Fe[Me],j(ue,b[ce]))}}for(var We=se[he],tr=ne.length,ir=We;ir<tr;ir++){var vr=ne[ir];ie[ir]=Fe[vr]}}return se[L]=ne.length,Ae}function A(y,D){var b=y._values,B=y._index,N=y._ptr,M=y._datatype||y._data===void 0?y._datatype:y.getDataType(),I=D._values,q=D._index,W=D._ptr,Z=D._datatype||D._data===void 0?D._datatype:D.getDataType(),L=y._size[0],$=D._size[1],X=b&&I,j,Y=i,Q=t;M&&Z&&M===Z&&typeof M=="string"&&M!=="mixed"&&(j=M,Y=r.find(i,[j,j]),Q=r.find(t,[j,j]));for(var ie=X?[]:void 0,ne=[],se=[],Ae=y.createSparseMatrix({values:ie,index:ne,ptr:se,size:[L,$],datatype:M===y._datatype&&Z===D._datatype?j:void 0}),Fe=X?[]:void 0,ve=[],he,Re,ae,ue,He,xe,ce,Me,We=0;We<$;We++){se[We]=ne.length;var tr=We+1;for(He=W[We],xe=W[We+1],ue=He;ue<xe;ue++)if(Me=q[ue],X)for(Re=N[Me],ae=N[Me+1],he=Re;he<ae;he++)ce=B[he],ve[ce]!==tr?(ve[ce]=tr,ne.push(ce),Fe[ce]=Q(I[ue],b[he])):Fe[ce]=Y(Fe[ce],Q(I[ue],b[he]));else for(Re=N[Me],ae=N[Me+1],he=Re;he<ae;he++)ce=B[he],ve[ce]!==tr&&(ve[ce]=tr,ne.push(ce));if(X)for(var ir=se[We],vr=ne.length,yr=ir;yr<vr;yr++){var pn=ne[yr];ie[yr]=Fe[pn]}}return se[$]=ne.length,Ae}return r(at,t,{"Array, Array":r.referTo("Matrix, Matrix",y=>(D,b)=>{l(Ue(D),Ue(b));var B=y(n(D),n(b));return Ce(B)?B.valueOf():B}),"Matrix, Matrix":function(D,b){var B=D.size(),N=b.size();return l(B,N),B.length===1?N.length===1?a(D,b,B[0]):h(D,b):N.length===1?d(D,b):g(D,b)},"Matrix, Array":r.referTo("Matrix,Matrix",y=>(D,b)=>y(D,n(b))),"Array, Matrix":r.referToSelf(y=>(D,b)=>y(n(D,b.storage()),b)),"SparseMatrix, any":function(D,b){return s(D,b,t,!1)},"DenseMatrix, any":function(D,b){return f(D,b,t,!1)},"any, SparseMatrix":function(D,b){return s(b,D,t,!0)},"any, DenseMatrix":function(D,b){return f(b,D,t,!0)},"Array, any":function(D,b){return f(n(D),b,t,!1).valueOf()},"any, Array":function(D,b){return f(n(b),D,t,!0).valueOf()},"any, any":t,"any, any, ...any":r.referToSelf(y=>(D,b,B)=>{for(var N=y(D,b),M=0;M<B.length;M++)N=y(N,B[M]);return N})})}),ct="conj",Ba=["typed"],Na=re(ct,Ba,e=>{var{typed:r}=e;return r(ct,{"number | BigNumber | Fraction":n=>n,Complex:n=>n.conjugate(),Unit:r.referToSelf(n=>i=>new i.constructor(n(i.toNumeric()),i.formatUnits())),"Array | Matrix":r.referToSelf(n=>i=>sr(i,n))})}),ft="identity",_a=["typed","config","matrix","BigNumber","DenseMatrix","SparseMatrix"],Sa=re(ft,_a,e=>{var{typed:r,config:n,matrix:i,BigNumber:t,DenseMatrix:u,SparseMatrix:o}=e;return r(ft,{"":function(){return n.matrix==="Matrix"?i([]):[]},string:function(a){return i(a)},"number | BigNumber":function(a){return f(a,a,n.matrix==="Matrix"?"dense":void 0)},"number | BigNumber, string":function(a,h){return f(a,a,h)},"number | BigNumber, number | BigNumber":function(a,h){return f(a,h,n.matrix==="Matrix"?"dense":void 0)},"number | BigNumber, number | BigNumber, string":function(a,h,p){return f(a,h,p)},Array:function(a){return s(a)},"Array, string":function(a,h){return s(a,h)},Matrix:function(a){return s(a.valueOf(),a.storage())},"Matrix, string":function(a,h){return s(a.valueOf(),h)}});function s(l,a){switch(l.length){case 0:return a?i(a):[];case 1:return f(l[0],l[0],a);case 2:return f(l[0],l[1],a);default:throw new Error("Vector containing two values expected")}}function f(l,a,h){var p=be(l)||be(a)?t:null;if(be(l)&&(l=l.toNumber()),be(a)&&(a=a.toNumber()),!ge(l)||l<1)throw new Error("Parameters in function identity must be positive integers");if(!ge(a)||a<1)throw new Error("Parameters in function identity must be positive integers");var d=p?new t(1):1,g=p?new p(0):0,c=[l,a];if(h){if(h==="sparse")return o.diagonal(c,d,0,g);if(h==="dense")return u.diagonal(c,d,0,g);throw new TypeError('Unknown matrix type "'.concat(h,'"'))}for(var m=rn([],c,g),w=l<a?l:a,C=0;C<w;C++)m[C][C]=d;return m}});function Ma(){throw new Error('No "bignumber" implementation available')}function Ta(){throw new Error('No "fraction" implementation available')}function Ia(){throw new Error('No "matrix" implementation available')}var lt="size",xa=["typed","config","?matrix"],Oa=re(lt,xa,e=>{var{typed:r,config:n,matrix:i}=e;return r(lt,{Matrix:function(u){return u.create(u.size(),"number")},Array:Ue,string:function(u){return n.matrix==="Array"?[u.length]:i([u.length],"dense","number")},"number | Complex | BigNumber | Unit | boolean | null":function(u){return n.matrix==="Array"?[]:i?i([],"dense","number"):Ia()}})}),ht="zeros",Pa=["typed","config","matrix","BigNumber"],za=re(ht,Pa,e=>{var{typed:r,config:n,matrix:i,BigNumber:t}=e;return r(ht,{"":function(){return n.matrix==="Array"?u([]):u([],"default")},"...number | BigNumber | string":function(l){var a=l[l.length-1];if(typeof a=="string"){var h=l.pop();return u(l,h)}else return n.matrix==="Array"?u(l):u(l,"default")},Array:u,Matrix:function(l){var a=l.storage();return u(l.valueOf(),a)},"Array | Matrix, string":function(l,a){return u(l.valueOf(),a)}});function u(f,l){var a=o(f),h=a?new t(0):0;if(s(f),l){var p=i(l);return f.length>0?p.resize(f,h):p}else{var d=[];return f.length>0?rn(d,f,h):d}}function o(f){var l=!1;return f.forEach(function(a,h,p){be(a)&&(l=!0,p[h]=a.toNumber())}),l}function s(f){f.forEach(function(l){if(typeof l!="number"||!ge(l)||l<0)throw new Error("Parameters in function zeros must be positive integers")})}}),Ra="numeric",$a=["number","?bignumber","?fraction"],Ua=re(Ra,$a,e=>{var{number:r,bignumber:n,fraction:i}=e,t={string:!0,number:!0,BigNumber:!0,Fraction:!0},u={number:o=>r(o),BigNumber:n?o=>n(o):Ma,bigint:o=>BigInt(o),Fraction:i?o=>i(o):Ta};return function(s){var f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"number",l=arguments.length>2?arguments[2]:void 0;if(l!==void 0)throw new SyntaxError("numeric() takes one or two arguments");var a=lr(s);if(!(a in t))throw new TypeError("Cannot convert "+s+' of type "'+a+'"; valid input types are '+Object.keys(t).join(", "));if(!(f in u))throw new TypeError("Cannot convert "+s+' to type "'+f+'"; valid output types are '+Object.keys(u).join(", "));return f===a?s:u[f](s)}}),pt="divideScalar",Va=["typed","numeric"],ka=re(pt,Va,e=>{var{typed:r,numeric:n}=e;return r(pt,{"number, number":function(t,u){return t/u},"Complex, Complex":function(t,u){return t.div(u)},"BigNumber, BigNumber":function(t,u){return t.div(u)},"bigint, bigint":function(t,u){return t/u},"Fraction, Fraction":function(t,u){return t.div(u)},"Unit, number | Complex | Fraction | BigNumber | Unit":(i,t)=>i.divide(t),"number | Fraction | Complex | BigNumber, Unit":(i,t)=>t.divideInto(i)})}),dt="pow",qa=["typed","config","identity","multiply","matrix","inv","fraction","number","Complex"],La=re(dt,qa,e=>{var{typed:r,config:n,identity:i,multiply:t,matrix:u,inv:o,number:s,fraction:f,Complex:l}=e;return r(dt,{"number, number":a,"Complex, Complex":function(g,c){return g.pow(c)},"BigNumber, BigNumber":function(g,c){return c.isInteger()||g>=0||n.predictable?g.pow(c):new l(g.toNumber(),0).pow(c.toNumber(),0)},"bigint, bigint":(d,g)=>d**g,"Fraction, Fraction":function(g,c){var m=g.pow(c);if(m!=null)return m;if(n.predictable)throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");return a(g.valueOf(),c.valueOf())},"Array, number":h,"Array, BigNumber":function(g,c){return h(g,c.toNumber())},"Matrix, number":p,"Matrix, BigNumber":function(g,c){return p(g,c.toNumber())},"Unit, number | BigNumber":function(g,c){return g.pow(c)}});function a(d,g){if(n.predictable&&!ge(g)&&d<0)try{var c=f(g),m=s(c);if((g===m||Math.abs((g-m)/g)<1e-14)&&c.d%2n===1n)return(c.n%2n===0n?1:-1)*Math.pow(-d,g)}catch{}return n.predictable&&(d<-1&&g===1/0||d>-1&&d<0&&g===-1/0)?NaN:ge(g)||d>=0||n.predictable?ni(d,g):d*d<1&&g===1/0||d*d>1&&g===-1/0?0:new l(d,0).pow(g,0)}function h(d,g){if(!ge(g))throw new TypeError("For A^b, b must be an integer (value is "+g+")");var c=Ue(d);if(c.length!==2)throw new Error("For A^b, A must be 2 dimensional (A has "+c.length+" dimensions)");if(c[0]!==c[1])throw new Error("For A^b, A must be square (size is "+c[0]+"x"+c[1]+")");if(g<0)try{return h(o(d),-g)}catch(C){throw C.message==="Cannot calculate inverse, determinant is zero"?new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is "+g+")"):C}for(var m=i(c[0]).valueOf(),w=d;g>=1;)(g&1)===1&&(m=t(w,m)),g>>=1,w=t(w,w);return m}function p(d,g){return u(h(d.valueOf(),g))}}),br="Number of decimals in function round must be an integer",gt="round",Ga=["typed","config","matrix","equalScalar","zeros","BigNumber","DenseMatrix"],Ha=re(gt,Ga,e=>{var{typed:r,config:n,matrix:i,equalScalar:t,zeros:u,BigNumber:o,DenseMatrix:s}=e,f=ti({typed:r,equalScalar:t}),l=va({typed:r,DenseMatrix:s}),a=ii({typed:r});function h(p){return Math.abs($r(p).exponent)}return r(gt,{number:function(d){var g=Pr(d,h(n.relTol)),c=Sr(d,g,n.relTol,n.absTol)?g:d;return Pr(c)},"number, number":function(d,g){var c=h(n.relTol);if(g>=c)return Pr(d,g);var m=Pr(d,c),w=Sr(d,m,n.relTol,n.absTol)?m:d;return Pr(w,g)},"number, BigNumber":function(d,g){if(!g.isInteger())throw new TypeError(br);return new o(d).toDecimalPlaces(g.toNumber())},Complex:function(d){return d.round()},"Complex, number":function(d,g){if(g%1)throw new TypeError(br);return d.round(g)},"Complex, BigNumber":function(d,g){if(!g.isInteger())throw new TypeError(br);var c=g.toNumber();return d.round(c)},BigNumber:function(d){var g=new o(d).toDecimalPlaces(h(n.relTol)),c=An(d,g,n.relTol,n.absTol)?g:d;return c.toDecimalPlaces(0)},"BigNumber, BigNumber":function(d,g){if(!g.isInteger())throw new TypeError(br);var c=h(n.relTol);if(g>=c)return d.toDecimalPlaces(g.toNumber());var m=d.toDecimalPlaces(c),w=An(d,m,n.relTol,n.absTol)?m:d;return w.toDecimalPlaces(g.toNumber())},bigint:p=>p,"bigint, number":(p,d)=>p,"bigint, BigNumber":(p,d)=>p,Fraction:function(d){return d.round()},"Fraction, number":function(d,g){if(g%1)throw new TypeError(br);return d.round(g)},"Fraction, BigNumber":function(d,g){if(!g.isInteger())throw new TypeError(br);return d.round(g.toNumber())},"Unit, number, Unit":r.referToSelf(p=>function(d,g,c){var m=d.toNumeric(c);return c.multiply(p(m,g))}),"Unit, BigNumber, Unit":r.referToSelf(p=>(d,g,c)=>p(d,g.toNumber(),c)),"Array | Matrix, number | BigNumber, Unit":r.referToSelf(p=>(d,g,c)=>sr(d,m=>p(m,g,c),!0)),"Array | Matrix | Unit, Unit":r.referToSelf(p=>(d,g)=>p(d,0,g)),"Array | Matrix":r.referToSelf(p=>d=>sr(d,p,!0)),"SparseMatrix, number | BigNumber":r.referToSelf(p=>(d,g)=>f(d,g,p,!1)),"DenseMatrix, number | BigNumber":r.referToSelf(p=>(d,g)=>a(d,g,p,!1)),"Array, number | BigNumber":r.referToSelf(p=>(d,g)=>a(i(d),g,p,!1).valueOf()),"number | Complex | BigNumber | Fraction, SparseMatrix":r.referToSelf(p=>(d,g)=>t(d,0)?u(g.size(),g.storage()):l(g,d,p,!0)),"number | Complex | BigNumber | Fraction, DenseMatrix":r.referToSelf(p=>(d,g)=>t(d,0)?u(g.size(),g.storage()):a(g,d,p,!0)),"number | Complex | BigNumber | Fraction, Array":r.referToSelf(p=>(d,g)=>a(i(g),d,p,!0).valueOf())})}),mt="dot",Wa=["typed","addScalar","multiplyScalar","conj","size"],Za=re(mt,Wa,e=>{var{typed:r,addScalar:n,multiplyScalar:i,conj:t,size:u}=e;return r(mt,{"Array | DenseMatrix, Array | DenseMatrix":s,"SparseMatrix, SparseMatrix":f});function o(a,h){var p=l(a),d=l(h),g,c;if(p.length===1)g=p[0];else if(p.length===2&&p[1]===1)g=p[0];else throw new RangeError("Expected a column vector, instead got a matrix of size ("+p.join(", ")+")");if(d.length===1)c=d[0];else if(d.length===2&&d[1]===1)c=d[0];else throw new RangeError("Expected a column vector, instead got a matrix of size ("+d.join(", ")+")");if(g!==c)throw new RangeError("Vectors must have equal length ("+g+" != "+c+")");if(g===0)throw new RangeError("Cannot calculate the dot product of empty vectors");return g}function s(a,h){var p=o(a,h),d=Ce(a)?a._data:a,g=Ce(a)?a._datatype||a.getDataType():void 0,c=Ce(h)?h._data:h,m=Ce(h)?h._datatype||h.getDataType():void 0,w=l(a).length===2,C=l(h).length===2,F=n,A=i;if(g&&m&&g===m&&typeof g=="string"&&g!=="mixed"){var y=g;F=r.find(n,[y,y]),A=r.find(i,[y,y])}if(!w&&!C){for(var D=A(t(d[0]),c[0]),b=1;b<p;b++)D=F(D,A(t(d[b]),c[b]));return D}if(!w&&C){for(var B=A(t(d[0]),c[0][0]),N=1;N<p;N++)B=F(B,A(t(d[N]),c[N][0]));return B}if(w&&!C){for(var M=A(t(d[0][0]),c[0]),I=1;I<p;I++)M=F(M,A(t(d[I][0]),c[I]));return M}if(w&&C){for(var q=A(t(d[0][0]),c[0][0]),W=1;W<p;W++)q=F(q,A(t(d[W][0]),c[W][0]));return q}}function f(a,h){o(a,h);for(var p=a._index,d=a._values,g=h._index,c=h._values,m=0,w=n,C=i,F=0,A=0;F<p.length&&A<g.length;){var y=p[F],D=g[A];if(y<D){F++;continue}if(y>D){A++;continue}y===D&&(m=w(m,C(d[F],c[A])),F++,A++)}return m}function l(a){return Ce(a)?a.size():u(a)}}),Dt="det",ja=["typed","matrix","subtractScalar","multiply","divideScalar","isZero","unaryMinus"],Ya=re(Dt,ja,e=>{var{typed:r,matrix:n,subtractScalar:i,multiply:t,divideScalar:u,isZero:o,unaryMinus:s}=e;return r(Dt,{any:function(a){return Ee(a)},"Array | Matrix":function(a){var h;switch(Ce(a)?h=a.size():Array.isArray(a)?(a=n(a),h=a.size()):h=[],h.length){case 0:return Ee(a);case 1:if(h[0]===1)return Ee(a.valueOf()[0]);if(h[0]===0)return 1;throw new RangeError("Matrix must be square (size: "+Ne(h)+")");case 2:{var p=h[0],d=h[1];if(p===d)return f(a.clone().valueOf(),p);if(d===0)return 1;throw new RangeError("Matrix must be square (size: "+Ne(h)+")")}default:throw new RangeError("Matrix must be two dimensional (size: "+Ne(h)+")")}}});function f(l,a,h){if(a===1)return Ee(l[0][0]);if(a===2)return i(t(l[0][0],l[1][1]),t(l[1][0],l[0][1]));for(var p=!1,d=new Array(a).fill(0).map((b,B)=>B),g=0;g<a;g++){var c=d[g];if(o(l[c][g])){var m=void 0;for(m=g+1;m<a;m++)if(!o(l[d[m]][g])){c=d[m],d[m]=d[g],d[g]=c,p=!p;break}if(m===a)return l[c][g]}for(var w=l[c][g],C=g===0?1:l[d[g-1]][g-1],F=g+1;F<a;F++)for(var A=d[F],y=g+1;y<a;y++)l[A][y]=u(i(t(l[A][y],w),t(l[A][g],l[c][y])),C)}var D=l[d[a-1]][a-1];return p?s(D):D}}),vt="inv",Ja=["typed","matrix","divideScalar","addScalar","multiply","unaryMinus","det","identity","abs"],Xa=re(vt,Ja,e=>{var{typed:r,matrix:n,divideScalar:i,addScalar:t,multiply:u,unaryMinus:o,det:s,identity:f,abs:l}=e;return r(vt,{"Array | Matrix":function(p){var d=Ce(p)?p.size():Ue(p);switch(d.length){case 1:if(d[0]===1)return Ce(p)?n([i(1,p.valueOf()[0])]):[i(1,p[0])];throw new RangeError("Matrix must be square (size: "+Ne(d)+")");case 2:{var g=d[0],c=d[1];if(g===c)return Ce(p)?n(a(p.valueOf(),g,c),p.storage()):a(p,g,c);throw new RangeError("Matrix must be square (size: "+Ne(d)+")")}default:throw new RangeError("Matrix must be two dimensional (size: "+Ne(d)+")")}},any:function(p){return i(1,p)}});function a(h,p,d){var g,c,m,w,C;if(p===1){if(w=h[0][0],w===0)throw Error("Cannot calculate inverse, determinant is zero");return[[i(1,w)]]}else if(p===2){var F=s(h);if(F===0)throw Error("Cannot calculate inverse, determinant is zero");return[[i(h[1][1],F),i(o(h[0][1]),F)],[i(o(h[1][0]),F),i(h[0][0],F)]]}else{var A=h.concat();for(g=0;g<p;g++)A[g]=A[g].concat();for(var y=f(p).valueOf(),D=0;D<d;D++){var b=l(A[D][D]),B=D;for(g=D+1;g<p;)l(A[g][D])>b&&(b=l(A[g][D]),B=g),g++;if(b===0)throw Error("Cannot calculate inverse, determinant is zero");g=B,g!==D&&(C=A[D],A[D]=A[g],A[g]=C,C=y[D],y[D]=y[g],y[g]=C);var N=A[D],M=y[D];for(g=0;g<p;g++){var I=A[g],q=y[g];if(g!==D){if(I[D]!==0){for(m=i(o(I[D]),N[D]),c=D;c<d;c++)I[c]=t(I[c],u(m,N[c]));for(c=0;c<d;c++)q[c]=t(q[c],u(m,M[c]))}}else{for(m=N[D],c=D;c<d;c++)I[c]=i(I[c],m);for(c=0;c<d;c++)q[c]=i(q[c],m)}}}return y}}}),Ur=ts({config:pr}),ui=as({}),oi=ms({}),On=ys({}),fn=Rs({Matrix:On}),De=uo({BigNumber:Ur,Complex:ui,DenseMatrix:fn,Fraction:oi}),Ka=ca({typed:De}),Pn=la({typed:De}),Qa=Na({typed:De}),ln=Ls({config:pr,typed:De}),ec=Us({equalScalar:ln,typed:De}),si=Ca({typed:De}),ai=Xs({typed:De}),ci=Ws({Matrix:On,equalScalar:ln,typed:De}),rc=pa({typed:De}),nc=ea({BigNumber:Ur,typed:De}),gr=ua({DenseMatrix:fn,Matrix:On,SparseMatrix:ci,typed:De}),tc=za({BigNumber:Ur,config:pr,matrix:gr,typed:De}),fi=ta({Fraction:oi,typed:De}),li=Sa({BigNumber:Ur,DenseMatrix:fn,SparseMatrix:ci,config:pr,matrix:gr,typed:De}),ic=Ua({bignumber:nc,fraction:fi,number:ai}),Hr=Ha({BigNumber:Ur,DenseMatrix:fn,config:pr,equalScalar:ln,matrix:gr,typed:De,zeros:tc}),uc=Oa({matrix:gr,config:pr,typed:De}),hi=sa({typed:De}),pi=ka({numeric:ic,typed:De}),oc=Za({addScalar:Pn,conj:Qa,multiplyScalar:si,size:uc,typed:De}),zn=Aa({addScalar:Pn,dot:oc,equalScalar:ln,matrix:gr,multiplyScalar:si,typed:De}),sc=Ya({divideScalar:pi,isZero:ec,matrix:gr,multiply:zn,subtractScalar:rc,typed:De,unaryMinus:hi}),ac=Xa({abs:Ka,addScalar:Pn,det:sc,divideScalar:pi,identity:li,matrix:gr,multiply:zn,typed:De,unaryMinus:hi}),cc=La({Complex:ui,config:pr,fraction:fi,identity:li,inv:ac,matrix:gr,multiply:zn,number:ai,typed:De});const fc={position:"bottom",strength:2,height:"6rem",divCount:5,exponential:!1,zIndex:1e3,animated:!1,duration:"0.3s",easing:"ease-out",opacity:1,curve:"linear",responsive:!1,target:"parent",className:"",style:{}},Bn={top:{position:"top",height:"6rem"},bottom:{position:"bottom",height:"6rem"},left:{position:"left",height:"6rem"},right:{position:"right",height:"6rem"},subtle:{height:"4rem",strength:1,opacity:.8,divCount:3},intense:{height:"10rem",strength:4,divCount:8,exponential:!0},smooth:{height:"8rem",curve:"bezier",divCount:10},sharp:{height:"5rem",curve:"linear",divCount:4},header:{position:"top",height:"8rem",curve:"ease-out"},footer:{position:"bottom",height:"8rem",curve:"ease-out"},sidebar:{position:"left",height:"6rem",strength:2.5},"page-header":{position:"top",height:"10rem",target:"page",strength:3},"page-footer":{position:"bottom",height:"10rem",target:"page",strength:3}},Nn={linear:e=>e,bezier:e=>e*e*(3-2*e),"ease-in":e=>e*e,"ease-out":e=>1-Math.pow(1-e,2),"ease-in-out":e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2},lc=(...e)=>e.reduce((r,n)=>({...r,...n}),{}),hc=e=>({top:"to top",bottom:"to bottom",left:"to left",right:"to right"})[e]||"to bottom",pc=(e,r)=>{let n;return(...i)=>{clearTimeout(n),n=setTimeout(()=>e(...i),r)}},yt=(e,r,n)=>{const[i,t]=Ge.useState(r[n]);return Ge.useEffect(()=>{if(!e)return;const u=()=>{const s=window.innerWidth;let f=r[n];s<=480&&r[`mobile${n[0].toUpperCase()+n.slice(1)}`]?f=r[`mobile${n[0].toUpperCase()+n.slice(1)}`]:s<=768&&r[`tablet${n[0].toUpperCase()+n.slice(1)}`]?f=r[`tablet${n[0].toUpperCase()+n.slice(1)}`]:s<=1024&&r[`desktop${n[0].toUpperCase()+n.slice(1)}`]&&(f=r[`desktop${n[0].toUpperCase()+n.slice(1)}`]),t(f)},o=pc(u,100);return u(),window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)},[e,r,n]),e?i:r[n]},dc=(e,r=!1)=>{const[n,i]=Ge.useState(!r);return Ge.useEffect(()=>{if(!r||!e.current)return;const t=new IntersectionObserver(([u])=>i(u.isIntersecting),{threshold:.1});return t.observe(e.current),()=>t.disconnect()},[e,r]),n};function gc(e){const r=Ge.useRef(null),[n,i]=Ge.useState(!1),t=Ge.useMemo(()=>{const g=e.preset&&Bn[e.preset]?Bn[e.preset]:{};return lc(fc,g,e)},[e]),u=yt(t.responsive,t,"height"),o=yt(t.responsive,t,"width"),s=dc(r,t.animated==="scroll"),f=Ge.useMemo(()=>{const g=[],c=100/t.divCount,m=n&&t.hoverIntensity?t.strength*t.hoverIntensity:t.strength,w=Nn[t.curve]||Nn.linear;for(let C=1;C<=t.divCount;C++){let F=C/t.divCount;F=w(F);let A;t.exponential?A=cc(2,F*4)*.0625*m:A=.0625*(F*t.divCount+1)*m;const y=Hr((c*C-c)*10)/10,D=Hr(c*C*10)/10,b=Hr((c*C+c)*10)/10,B=Hr((c*C+c*2)*10)/10;let N=`transparent ${y}%, black ${D}%`;b<=100&&(N+=`, black ${b}%`),B<=100&&(N+=`, transparent ${B}%`);const M=hc(t.position),I={position:"absolute",inset:"0",maskImage:`linear-gradient(${M}, ${N})`,WebkitMaskImage:`linear-gradient(${M}, ${N})`,backdropFilter:`blur(${A.toFixed(3)}rem)`,WebkitBackdropFilter:`blur(${A.toFixed(3)}rem)`,opacity:t.opacity,transition:t.animated&&t.animated!=="scroll"?`backdrop-filter ${t.duration} ${t.easing}`:void 0};g.push(ye.jsx("div",{style:I},C))}return g},[t,n]),l=Ge.useMemo(()=>{const g=["top","bottom"].includes(t.position),c=["left","right"].includes(t.position),m=t.target==="page",w={position:m?"fixed":"absolute",pointerEvents:t.hoverIntensity?"auto":"none",opacity:s?1:0,transition:t.animated?`opacity ${t.duration} ${t.easing}`:void 0,zIndex:m?t.zIndex+100:t.zIndex,...t.style};return g?(w.height=u,w.width=o||"100%",w[t.position]=0,w.left=0,w.right=0):c&&(w.width=o||u,w.height="100%",w[t.position]=0,w.top=0,w.bottom=0),w},[t,u,o,s]),{hoverIntensity:a,animated:h,onAnimationComplete:p,duration:d}=t;return Ge.useEffect(()=>{if(s&&h==="scroll"&&p){const g=parseFloat(d)*1e3,c=setTimeout(()=>p(),g);return()=>clearTimeout(c)}},[s,h,p,d]),ye.jsx("div",{ref:r,className:`gradual-blur ${t.target==="page"?"gradual-blur-page":"gradual-blur-parent"} ${t.className}`,style:l,onMouseEnter:a?()=>i(!0):void 0,onMouseLeave:a?()=>i(!1):void 0,children:ye.jsx("div",{className:"gradual-blur-inner",style:{position:"relative",width:"100%",height:"100%"},children:f})})}const hn=Hi.memo(gc);hn.displayName="GradualBlur";hn.PRESETS=Bn;hn.CURVE_FUNCTIONS=Nn;const mc=()=>{if(typeof document>"u")return;const e="gradual-blur-styles";if(document.getElementById(e))return;const r=document.createElement("style");r.id=e,r.textContent=`
  .gradual-blur { pointer-events: none; transition: opacity 0.3s ease-out; }
  .gradual-blur-parent { overflow: hidden; }
  .gradual-blur-inner { pointer-events: none; }`,document.head.appendChild(r)};typeof document<"u"&&mc();const Nc=()=>{const e=[{name:"position",type:'"top" | "bottom" | "left" | "right"',default:'"bottom"',description:"Edge to attach the blur overlay."},{name:"strength",type:"number",default:"2",description:"Base blur strength multiplier (affects each layer)."},{name:"height",type:"string",default:'"6rem"',description:"Overlay height (for top / bottom positions)."},{name:"width",type:"string",default:"—",description:"Custom width (optional). Defaults to 100% for vertical positions or matches height for horizontal positions."},{name:"divCount",type:"number",default:"5",description:"Number of stacked blur layers (higher = smoother gradient)."},{name:"exponential",type:"boolean",default:"false",description:"Use exponential progression for stronger end blur."},{name:"curve",type:'"linear" | "bezier" | "ease-in"',default:'"linear"',description:"Distribution curve applied to layer progression."},{name:"opacity",type:"number",default:"1",description:"Opacity applied to each blur layer."},{name:"animated",type:'"boolean" | "scroll"',default:"false",description:'Fade in (true) or reveal on scroll ("scroll").'},{name:"duration",type:"string",default:'"0.3s"',description:"Animation duration (when animated)."},{name:"easing",type:"string",default:'"ease-out"',description:"Animation easing (opacity / backdrop-filter)."},{name:"hoverIntensity",type:"number",default:"—",description:"Multiplier applied to strength while hovered."},{name:"target",type:'"parent" | "page"',default:'"parent"',description:"Position relative to parent container or the entire page (fixed)."},{name:"preset",type:'"top" | "bottom" | "left" | "right"',default:"—",description:"Apply a predefined configuration bundle."},{name:"responsive",type:"boolean",default:"false",description:"Enable internal responsive recalculation (experimental)."},{name:"zIndex",type:"number",default:"1000",description:"Base z-index (page target adds +100)."},{name:"onAnimationComplete",type:"() => void",default:"—",description:"Callback fired after animated reveal completes."},{name:"className",type:"string",default:"—",description:"Additional class names appended to root element."},{name:"style",type:"React.CSSProperties",default:"—",description:"Inline style overrides merged into container style."}],[r,n]=Ge.useState({position:"bottom",strength:2,height:"7rem",divCount:5,curve:"bezier",target:"parent",exponential:!0,opacity:1}),i=Ge.useRef(null);return Ge.useEffect(()=>{const t=i.current;if(!t)return;const u=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if("ontouchstart"in window||navigator.maxTouchPoints>0||u)return;const s=new Yi({wrapper:t,content:t.firstElementChild,duration:2,smoothWheel:!0,smoothTouch:!1,touchMultiplier:1.2,wheelMultiplier:1,lerp:.1});let f;const l=a=>{s.raf(a),f=requestAnimationFrame(l)};return f=requestAnimationFrame(l),()=>{f&&cancelAnimationFrame(f),s.destroy()}},[]),ye.jsxs(Ji,{children:[ye.jsxs(Xi,{children:[ye.jsxs(Wi,{position:"relative",className:"demo-container demo-container-dots",h:500,p:0,overflow:"hidden",children:[ye.jsxs(Zi,{ref:i,flexDirection:"column",alignItems:"center",h:"100%",overflowY:"auto",overflowX:"hidden",px:6,py:"100px",position:"relative",w:"100%",css:{"&::-webkit-scrollbar":{display:"none"},scrollbarWidth:"none",msOverflowStyle:"none"},children:[ye.jsx($n,{fontSize:"clamp(2rem, 4vw, 5rem)",fontWeight:900,zIndex:0,color:"#B19EEF",children:"Scroll Down."}),ye.jsx(ji,{borderRadius:"50px",my:"100px",src:"https://images.unsplash.com/photo-1656536665219-da2b7deb314b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"Lighthouse in the distance with purple colors.",w:"100%",maxW:"600px",border:"1px solid #271E37",filter:"grayscale(0) brightness(2)"}),ye.jsx($n,{fontSize:"clamp(2rem, 4vw, 5rem)",fontWeight:900,zIndex:0,color:"#B19EEF",children:"Gradual Blur"})]}),ye.jsx(hn,{...r,zIndex:10,width:r.position==="left"||r.position==="right"?"8rem":"100%",height:r.position==="top"||r.position==="bottom"?r.height:"100%"})]}),ye.jsxs(ru,{children:[ye.jsx(Un,{title:"Position",name:"gradual-blur-position",value:r.position,options:[{label:"Top",value:"top"},{label:"Bottom",value:"bottom"}],onChange:t=>n(u=>({...u,position:t}))}),ye.jsx(Un,{title:"Target",name:"gradual-blur-target",value:r.target,options:[{label:"Page",value:"page"},{label:"Parent",value:"parent"}],onChange:t=>n(u=>({...u,target:t}))}),ye.jsx(nu,{title:"Exponential",isChecked:r.exponential,onChange:t=>n(u=>({...u,exponential:t}))}),ye.jsx(dn,{title:"Strength",min:1,max:5,step:.5,value:r.strength,onChange:t=>n(u=>({...u,strength:t}))}),ye.jsx(dn,{title:"Div Count",min:1,max:10,step:1,value:r.divCount,onChange:t=>n(u=>({...u,divCount:t}))}),ye.jsx(dn,{title:"Opacity",min:.1,max:1,step:.1,value:r.opacity,onChange:t=>n(u=>({...u,opacity:t}))})]}),ye.jsx(Ki,{data:e}),ye.jsx(tu,{dependencyList:["mathjs"]})]}),ye.jsx(Qi,{children:ye.jsx(eu,{codeObject:cu})})]})};export{Nc as default};
