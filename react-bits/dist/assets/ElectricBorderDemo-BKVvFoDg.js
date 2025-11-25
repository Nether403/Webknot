import{r as s,j as e,B as k,F as O,T as $,d as M}from"./index-wsKSLPNH.js";import{T as j,P as B,a as F,C as I,b as q}from"./PropTable-C4uPWs8h.js";import{C as T}from"./Customize-1m_ZNqR9.js";import{P}from"./PreviewSelect-B8u33nUa.js";import{P as A}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const D=`import { useEffect, useId, useLayoutEffect, useRef } from 'react';\r
\r
import './ElectricBorder.css';\r
\r
const ElectricBorder = ({ children, color = '#5227FF', speed = 1, chaos = 1, thickness = 2, className, style }) => {\r
  const rawId = useId().replace(/[:]/g, '');\r
  const filterId = \`turbulent-displace-\${rawId}\`;\r
  const svgRef = useRef(null);\r
  const rootRef = useRef(null);\r
  const strokeRef = useRef(null);\r
\r
  const updateAnim = () => {\r
    const svg = svgRef.current;\r
    const host = rootRef.current;\r
    if (!svg || !host) return;\r
\r
    if (strokeRef.current) {\r
      strokeRef.current.style.filter = \`url(#\${filterId})\`;\r
    }\r
\r
    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));\r
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));\r
\r
    const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]'));\r
    if (dyAnims.length >= 2) {\r
      dyAnims[0].setAttribute('values', \`\${height}; 0\`);\r
      dyAnims[1].setAttribute('values', \`0; -\${height}\`);\r
    }\r
\r
    const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]'));\r
    if (dxAnims.length >= 2) {\r
      dxAnims[0].setAttribute('values', \`\${width}; 0\`);\r
      dxAnims[1].setAttribute('values', \`0; -\${width}\`);\r
    }\r
\r
    const baseDur = 6;\r
    const dur = Math.max(0.001, baseDur / (speed || 1));\r
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', \`\${dur}s\`));\r
\r
    const disp = svg.querySelector('feDisplacementMap');\r
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));\r
\r
    const filterEl = svg.querySelector(\`#\${CSS.escape(filterId)}\`);\r
    if (filterEl) {\r
      filterEl.setAttribute('x', '-200%');\r
      filterEl.setAttribute('y', '-200%');\r
      filterEl.setAttribute('width', '500%');\r
      filterEl.setAttribute('height', '500%');\r
    }\r
\r
    requestAnimationFrame(() => {\r
      [...dyAnims, ...dxAnims].forEach(a => {\r
        if (typeof a.beginElement === 'function') {\r
          try {\r
            a.beginElement();\r
          } catch {\r
            console.warn('ElectricBorder: beginElement failed, this may be due to a browser limitation.');\r
          }\r
        }\r
      });\r
    });\r
  };\r
\r
  useEffect(() => {\r
    updateAnim();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [speed, chaos]);\r
\r
  useLayoutEffect(() => {\r
    if (!rootRef.current) return;\r
    const ro = new ResizeObserver(() => updateAnim());\r
    ro.observe(rootRef.current);\r
    updateAnim();\r
    return () => ro.disconnect();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  const vars = {\r
    ['--electric-border-color']: color,\r
    ['--eb-border-width']: \`\${thickness}px\`\r
  };\r
\r
  return (\r
    <div ref={rootRef} className={\`electric-border \${className ?? ''}\`} style={{ ...vars, ...style }}>\r
      <svg ref={svgRef} className="eb-svg" aria-hidden focusable="false">\r
        <defs>\r
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />\r
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">\r
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />\r
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">\r
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />\r
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">\r
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />\r
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">\r
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />\r
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />\r
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />\r
            <feDisplacementMap\r
              in="SourceGraphic"\r
              in2="combinedNoise"\r
              scale="30"\r
              xChannelSelector="R"\r
              yChannelSelector="B"\r
            />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="eb-layers">\r
        <div ref={strokeRef} className="eb-stroke" />\r
        <div className="eb-glow-1" />\r
        <div className="eb-glow-2" />\r
        <div className="eb-background-glow" />\r
      </div>\r
\r
      <div className="eb-content">{children}</div>\r
    </div>\r
  );\r
};\r
\r
export default ElectricBorder;\r
`,G=`.electric-border {\r
  --electric-light-color: oklch(from var(--electric-border-color) l c h);\r
  --eb-border-width: 2px;\r
  position: relative;\r
  border-radius: inherit;\r
  overflow: visible;\r
  isolation: isolate;\r
}\r
\r
.eb-svg {\r
  position: fixed;\r
  left: -10000px;\r
  top: -10000px;\r
  width: 10px;\r
  height: 10px;\r
  opacity: 0.001;\r
  pointer-events: none;\r
}\r
\r
.eb-content {\r
  position: relative;\r
  border-radius: inherit;\r
  z-index: 1;\r
}\r
\r
.eb-layers {\r
  position: absolute;\r
  inset: 0;\r
  border-radius: inherit;\r
  pointer-events: none;\r
  z-index: 2;\r
}\r
\r
.eb-stroke,\r
.eb-glow-1,\r
.eb-glow-2,\r
.eb-overlay-1,\r
.eb-overlay-2,\r
.eb-background-glow {\r
  position: absolute;\r
  inset: 0;\r
  border-radius: inherit;\r
  pointer-events: none;\r
  box-sizing: border-box;\r
}\r
\r
.eb-stroke {\r
  border: var(--eb-border-width) solid var(--electric-border-color);\r
}\r
\r
.eb-glow-1 {\r
  border: var(--eb-border-width) solid oklch(from var(--electric-border-color) l c h / 0.6);\r
  opacity: 0.5;\r
  filter: blur(calc(0.5px + (var(--eb-border-width) * 0.25)));\r
}\r
\r
.eb-glow-2 {\r
  border: var(--eb-border-width) solid var(--electric-light-color);\r
  opacity: 0.5;\r
  filter: blur(calc(2px + (var(--eb-border-width) * 0.5)));\r
}\r
\r
.eb-background-glow {\r
  z-index: -1;\r
  transform: scale(1.08);\r
  filter: blur(32px);\r
  opacity: 0.3;\r
  background: linear-gradient(-30deg, var(--electric-light-color), transparent, var(--electric-border-color));\r
}\r
`,L=`import { useEffect, useId, useLayoutEffect, useRef } from 'react';\r
\r
function hexToRgba(hex, alpha = 1) {\r
  if (!hex) return \`rgba(0,0,0,\${alpha})\`;\r
  let h = hex.replace('#', '');\r
  if (h.length === 3) {\r
    h = h\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const int = parseInt(h, 16);\r
  const r = (int >> 16) & 255;\r
  const g = (int >> 8) & 255;\r
  const b = int & 255;\r
  return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;\r
}\r
\r
const ElectricBorder = ({ children, color = '#5227FF', speed = 1, chaos = 1, thickness = 2, className, style }) => {\r
  const rawId = useId().replace(/[:]/g, '');\r
  const filterId = \`turbulent-displace-\${rawId}\`;\r
  const svgRef = useRef(null);\r
  const rootRef = useRef(null);\r
  const strokeRef = useRef(null);\r
\r
  const updateAnim = () => {\r
    const svg = svgRef.current;\r
    const host = rootRef.current;\r
    if (!svg || !host) return;\r
\r
    if (strokeRef.current) {\r
      strokeRef.current.style.filter = \`url(#\${filterId})\`;\r
    }\r
\r
    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));\r
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));\r
\r
    const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]'));\r
    if (dyAnims.length >= 2) {\r
      dyAnims[0].setAttribute('values', \`\${height}; 0\`);\r
      dyAnims[1].setAttribute('values', \`0; -\${height}\`);\r
    }\r
\r
    const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]'));\r
    if (dxAnims.length >= 2) {\r
      dxAnims[0].setAttribute('values', \`\${width}; 0\`);\r
      dxAnims[1].setAttribute('values', \`0; -\${width}\`);\r
    }\r
\r
    const baseDur = 6;\r
    const dur = Math.max(0.001, baseDur / (speed || 1));\r
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', \`\${dur}s\`));\r
\r
    const disp = svg.querySelector('feDisplacementMap');\r
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));\r
\r
    const filterEl = svg.querySelector(\`#\${CSS.escape(filterId)}\`);\r
    if (filterEl) {\r
      filterEl.setAttribute('x', '-200%');\r
      filterEl.setAttribute('y', '-200%');\r
      filterEl.setAttribute('width', '500%');\r
      filterEl.setAttribute('height', '500%');\r
    }\r
\r
    requestAnimationFrame(() => {\r
      [...dyAnims, ...dxAnims].forEach(a => {\r
        if (typeof a.beginElement === 'function') {\r
          try {\r
            a.beginElement();\r
          } catch {\r
            console.warn('ElectricBorder: beginElement failed');\r
          }\r
        }\r
      });\r
    });\r
  };\r
\r
  useEffect(() => {\r
    updateAnim();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [speed, chaos]);\r
\r
  useLayoutEffect(() => {\r
    if (!rootRef.current) return;\r
    const ro = new ResizeObserver(() => updateAnim());\r
    ro.observe(rootRef.current);\r
    updateAnim();\r
    return () => ro.disconnect();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  const inheritRadius = {\r
    borderRadius: style?.borderRadius ?? 'inherit'\r
  };\r
\r
  const strokeStyle = {\r
    ...inheritRadius,\r
    borderWidth: thickness,\r
    borderStyle: 'solid',\r
    borderColor: color\r
  };\r
\r
  const glow1Style = {\r
    ...inheritRadius,\r
    borderWidth: thickness,\r
    borderStyle: 'solid',\r
    borderColor: hexToRgba(color, 0.6),\r
    filter: \`blur(\${0.5 + thickness * 0.25}px)\`,\r
    opacity: 0.5\r
  };\r
\r
  const glow2Style = {\r
    ...inheritRadius,\r
    borderWidth: thickness,\r
    borderStyle: 'solid',\r
    borderColor: color,\r
    filter: \`blur(\${2 + thickness * 0.5}px)\`,\r
    opacity: 0.5\r
  };\r
\r
  const bgGlowStyle = {\r
    ...inheritRadius,\r
    transform: 'scale(1.08)',\r
    filter: 'blur(32px)',\r
    opacity: 0.3,\r
    zIndex: -1,\r
    background: \`linear-gradient(-30deg, \${hexToRgba(color, 0.8)}, transparent, \${color})\`\r
  };\r
\r
  return (\r
    <div ref={rootRef} className={'relative isolate ' + (className ?? '')} style={style}>\r
      <svg\r
        ref={svgRef}\r
        className="fixed -left-[10000px] -top-[10000px] w-[10px] h-[10px] opacity-[0.001] pointer-events-none"\r
        aria-hidden\r
        focusable="false"\r
      >\r
        <defs>\r
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />\r
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">\r
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />\r
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">\r
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />\r
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">\r
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />\r
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">\r
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />\r
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />\r
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />\r
            <feDisplacementMap\r
              in="SourceGraphic"\r
              in2="combinedNoise"\r
              scale="30"\r
              xChannelSelector="R"\r
              yChannelSelector="B"\r
            />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="absolute inset-0 pointer-events-none" style={inheritRadius}>\r
        <div ref={strokeRef} className="absolute inset-0 box-border" style={strokeStyle} />\r
        <div className="absolute inset-0 box-border" style={glow1Style} />\r
        <div className="absolute inset-0 box-border" style={glow2Style} />\r
        <div className="absolute inset-0" style={bgGlowStyle} />\r
      </div>\r
\r
      <div className="relative" style={inheritRadius}>\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default ElectricBorder;\r
`,z=`import React, { CSSProperties, PropsWithChildren, useEffect, useId, useLayoutEffect, useRef } from 'react';\r
\r
import './ElectricBorder.css';\r
\r
type ElectricBorderProps = PropsWithChildren<{\r
  color?: string;\r
  speed?: number;\r
  chaos?: number;\r
  thickness?: number;\r
  className?: string;\r
  style?: CSSProperties;\r
}>;\r
\r
const ElectricBorder: React.FC<ElectricBorderProps> = ({\r
  children,\r
  color = '#5227FF',\r
  speed = 1,\r
  chaos = 1,\r
  thickness = 2,\r
  className,\r
  style\r
}: ElectricBorderProps) => {\r
  const rawId = useId().replace(/[:]/g, '');\r
  const filterId = \`turbulent-displace-\${rawId}\`;\r
  const svgRef = useRef<SVGSVGElement | null>(null);\r
  const rootRef = useRef<HTMLDivElement | null>(null);\r
  const strokeRef = useRef<HTMLDivElement | null>(null);\r
\r
  const updateAnim = () => {\r
    const svg = svgRef.current;\r
    const host = rootRef.current;\r
    if (!svg || !host) return;\r
\r
    if (strokeRef.current) {\r
      strokeRef.current.style.filter = \`url(#\${filterId})\`;\r
    }\r
\r
    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));\r
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));\r
\r
    const dyAnims = Array.from(svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dy"]'));\r
    if (dyAnims.length >= 2) {\r
      dyAnims[0].setAttribute('values', \`\${height}; 0\`);\r
      dyAnims[1].setAttribute('values', \`0; -\${height}\`);\r
    }\r
\r
    const dxAnims = Array.from(svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dx"]'));\r
    if (dxAnims.length >= 2) {\r
      dxAnims[0].setAttribute('values', \`\${width}; 0\`);\r
      dxAnims[1].setAttribute('values', \`0; -\${width}\`);\r
    }\r
\r
    const baseDur = 6;\r
    const dur = Math.max(0.001, baseDur / (speed || 1));\r
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', \`\${dur}s\`));\r
\r
    const disp = svg.querySelector('feDisplacementMap');\r
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));\r
\r
    const filterEl = svg.querySelector<SVGFilterElement>(\`#\${CSS.escape(filterId)}\`);\r
    if (filterEl) {\r
      filterEl.setAttribute('x', '-200%');\r
      filterEl.setAttribute('y', '-200%');\r
      filterEl.setAttribute('width', '500%');\r
      filterEl.setAttribute('height', '500%');\r
    }\r
\r
    requestAnimationFrame(() => {\r
      [...dyAnims, ...dxAnims].forEach((a: any) => {\r
        if (typeof a.beginElement === 'function') {\r
          try {\r
            a.beginElement();\r
          } catch {}\r
        }\r
      });\r
    });\r
  };\r
\r
  useEffect(() => {\r
    updateAnim();\r
  }, [speed, chaos]);\r
\r
  useLayoutEffect(() => {\r
    if (!rootRef.current) return;\r
    const ro = new ResizeObserver(() => updateAnim());\r
    ro.observe(rootRef.current);\r
    updateAnim();\r
    return () => ro.disconnect();\r
  }, []);\r
\r
  const vars: CSSProperties = {\r
    ['--electric-border-color' as any]: color,\r
    ['--eb-border-width' as any]: \`\${thickness}px\`\r
  };\r
\r
  return (\r
    <div ref={rootRef} className={\`electric-border \${className ?? ''}\`} style={{ ...vars, ...style }}>\r
      <svg ref={svgRef} className="eb-svg" aria-hidden focusable="false">\r
        <defs>\r
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />\r
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">\r
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />\r
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">\r
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />\r
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">\r
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />\r
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">\r
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />\r
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />\r
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />\r
            <feDisplacementMap\r
              in="SourceGraphic"\r
              in2="combinedNoise"\r
              scale="30"\r
              xChannelSelector="R"\r
              yChannelSelector="B"\r
            />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="eb-layers">\r
        <div ref={strokeRef} className="eb-stroke" />\r
        <div className="eb-glow-1" />\r
        <div className="eb-glow-2" />\r
        <div className="eb-background-glow" />\r
      </div>\r
\r
      <div className="eb-content">{children}</div>\r
    </div>\r
  );\r
};\r
\r
export default ElectricBorder;\r
`,W=`import React, { CSSProperties, PropsWithChildren, useEffect, useId, useLayoutEffect, useRef } from 'react';\r
\r
type ElectricBorderProps = PropsWithChildren<{\r
  color?: string;\r
  speed?: number;\r
  chaos?: number;\r
  thickness?: number;\r
  className?: string;\r
  style?: CSSProperties;\r
}>;\r
\r
function hexToRgba(hex: string, alpha = 1): string {\r
  if (!hex) return \`rgba(0,0,0,\${alpha})\`;\r
  let h = hex.replace('#', '');\r
  if (h.length === 3) {\r
    h = h\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const int = parseInt(h, 16);\r
  const r = (int >> 16) & 255;\r
  const g = (int >> 8) & 255;\r
  const b = int & 255;\r
  return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;\r
}\r
\r
const ElectricBorder: React.FC<ElectricBorderProps> = ({\r
  children,\r
  color = '#5227FF',\r
  speed = 1,\r
  chaos = 1,\r
  thickness = 2,\r
  className,\r
  style\r
}) => {\r
  const rawId = useId().replace(/[:]/g, '');\r
  const filterId = \`turbulent-displace-\${rawId}\`;\r
  const svgRef = useRef<SVGSVGElement | null>(null);\r
  const rootRef = useRef<HTMLDivElement | null>(null);\r
  const strokeRef = useRef<HTMLDivElement | null>(null);\r
\r
  const updateAnim = () => {\r
    const svg = svgRef.current;\r
    const host = rootRef.current;\r
    if (!svg || !host) return;\r
\r
    if (strokeRef.current) {\r
      strokeRef.current.style.filter = \`url(#\${filterId})\`;\r
    }\r
\r
    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));\r
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));\r
\r
    const dyAnims = Array.from(svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dy"]'));\r
    if (dyAnims.length >= 2) {\r
      dyAnims[0].setAttribute('values', \`\${height}; 0\`);\r
      dyAnims[1].setAttribute('values', \`0; -\${height}\`);\r
    }\r
\r
    const dxAnims = Array.from(svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dx"]'));\r
    if (dxAnims.length >= 2) {\r
      dxAnims[0].setAttribute('values', \`\${width}; 0\`);\r
      dxAnims[1].setAttribute('values', \`0; -\${width}\`);\r
    }\r
\r
    const baseDur = 6;\r
    const dur = Math.max(0.001, baseDur / (speed || 1));\r
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', \`\${dur}s\`));\r
\r
    const disp = svg.querySelector('feDisplacementMap');\r
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));\r
\r
    const filterEl = svg.querySelector<SVGFilterElement>(\`#\${CSS.escape(filterId)}\`);\r
    if (filterEl) {\r
      filterEl.setAttribute('x', '-200%');\r
      filterEl.setAttribute('y', '-200%');\r
      filterEl.setAttribute('width', '500%');\r
      filterEl.setAttribute('height', '500%');\r
    }\r
\r
    requestAnimationFrame(() => {\r
      [...dyAnims, ...dxAnims].forEach((a: any) => {\r
        if (typeof a.beginElement === 'function') {\r
          try {\r
            a.beginElement();\r
          } catch {}\r
        }\r
      });\r
    });\r
  };\r
\r
  useEffect(() => {\r
    updateAnim();\r
  }, [speed, chaos]);\r
\r
  useLayoutEffect(() => {\r
    if (!rootRef.current) return;\r
    const ro = new ResizeObserver(() => updateAnim());\r
    ro.observe(rootRef.current);\r
    updateAnim();\r
    return () => ro.disconnect();\r
  }, []);\r
\r
  const inheritRadius: CSSProperties = {\r
    borderRadius: style?.borderRadius ?? 'inherit'\r
  };\r
\r
  const strokeStyle: CSSProperties = {\r
    ...inheritRadius,\r
    borderWidth: thickness,\r
    borderStyle: 'solid',\r
    borderColor: color\r
  };\r
\r
  const glow1Style: CSSProperties = {\r
    ...inheritRadius,\r
    borderWidth: thickness,\r
    borderStyle: 'solid',\r
    borderColor: hexToRgba(color, 0.6),\r
    filter: \`blur(\${0.5 + thickness * 0.25}px)\`,\r
    opacity: 0.5\r
  };\r
\r
  const glow2Style: CSSProperties = {\r
    ...inheritRadius,\r
    borderWidth: thickness,\r
    borderStyle: 'solid',\r
    borderColor: color,\r
    filter: \`blur(\${2 + thickness * 0.5}px)\`,\r
    opacity: 0.5\r
  };\r
\r
  const bgGlowStyle: CSSProperties = {\r
    ...inheritRadius,\r
    transform: 'scale(1.08)',\r
    filter: 'blur(32px)',\r
    opacity: 0.3,\r
    zIndex: -1,\r
    background: \`linear-gradient(-30deg, \${hexToRgba(color, 0.8)}, transparent, \${color})\`\r
  };\r
\r
  return (\r
    <div ref={rootRef} className={'relative isolate ' + (className ?? '')} style={style}>\r
      <svg\r
        ref={svgRef}\r
        className="fixed -left-[10000px] -top-[10000px] w-[10px] h-[10px] opacity-[0.001] pointer-events-none"\r
        aria-hidden\r
        focusable="false"\r
      >\r
        <defs>\r
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />\r
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">\r
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />\r
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">\r
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />\r
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">\r
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />\r
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">\r
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />\r
            </feOffset>\r
\r
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />\r
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />\r
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />\r
            <feDisplacementMap\r
              in="SourceGraphic"\r
              in2="combinedNoise"\r
              scale="30"\r
              xChannelSelector="R"\r
              yChannelSelector="B"\r
            />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="absolute inset-0 pointer-events-none" style={inheritRadius}>\r
        <div ref={strokeRef} className="absolute inset-0 box-border" style={strokeStyle} />\r
        <div className="absolute inset-0 box-border" style={glow1Style} />\r
        <div className="absolute inset-0 box-border" style={glow2Style} />\r
        <div className="absolute inset-0" style={bgGlowStyle} />\r
      </div>\r
\r
      <div className="relative" style={inheritRadius}>\r
        {children}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default ElectricBorder;\r
`,V={usage:`// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN
  
import ElectricBorder from './ElectricBorder'

<ElectricBorder
  color="#7df9ff"
  speed={1}
  chaos={0.5}
  thickness={2}
  style={{ borderRadius: 16 }}
>
  <div>
    <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
      A glowing, animated border wrapper.
    </p>
  </div>
</ElectricBorder>`,code:D,css:G,tailwind:L,tsCode:z,tsTailwind:W},N=({children:v,color:i="#5227FF",speed:p=1,chaos:n=1,thickness:x=2,className:a,style:g})=>{const u=`turbulent-displace-${s.useId().replace(/[:]/g,"")}`,d=s.useRef(null),o=s.useRef(null),r=s.useRef(null),t=()=>{const l=d.current,f=o.current;if(!l||!f)return;r.current&&(r.current.style.filter=`url(#${u})`);const R=Math.max(1,Math.round(f.clientWidth||f.getBoundingClientRect().width||0)),S=Math.max(1,Math.round(f.clientHeight||f.getBoundingClientRect().height||0)),h=Array.from(l.querySelectorAll('feOffset > animate[attributeName="dy"]'));h.length>=2&&(h[0].setAttribute("values",`${S}; 0`),h[1].setAttribute("values",`0; -${S}`));const b=Array.from(l.querySelectorAll('feOffset > animate[attributeName="dx"]'));b.length>=2&&(b[0].setAttribute("values",`${R}; 0`),b[1].setAttribute("values",`0; -${R}`));const C=Math.max(.001,6/(p||1));[...h,...b].forEach(y=>y.setAttribute("dur",`${C}s`));const E=l.querySelector("feDisplacementMap");E&&E.setAttribute("scale",String(30*(n||1)));const m=l.querySelector(`#${CSS.escape(u)}`);m&&(m.setAttribute("x","-200%"),m.setAttribute("y","-200%"),m.setAttribute("width","500%"),m.setAttribute("height","500%")),requestAnimationFrame(()=>{[...h,...b].forEach(y=>{if(typeof y.beginElement=="function")try{y.beginElement()}catch{console.warn("ElectricBorder: beginElement failed, this may be due to a browser limitation.")}})})};s.useEffect(()=>{t()},[p,n]),s.useLayoutEffect(()=>{if(!o.current)return;const l=new ResizeObserver(()=>t());return l.observe(o.current),t(),()=>l.disconnect()},[]);const w={"--electric-border-color":i,"--eb-border-width":`${x}px`};return e.jsxs("div",{ref:o,className:`electric-border ${a??""}`,style:{...w,...g},children:[e.jsx("svg",{ref:d,className:"eb-svg","aria-hidden":!0,focusable:"false",children:e.jsx("defs",{children:e.jsxs("filter",{id:u,colorInterpolationFilters:"sRGB",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e.jsx("feTurbulence",{type:"turbulence",baseFrequency:"0.02",numOctaves:"10",result:"noise1",seed:"1"}),e.jsx("feOffset",{in:"noise1",dx:"0",dy:"0",result:"offsetNoise1",children:e.jsx("animate",{attributeName:"dy",values:"700; 0",dur:"6s",repeatCount:"indefinite",calcMode:"linear"})}),e.jsx("feTurbulence",{type:"turbulence",baseFrequency:"0.02",numOctaves:"10",result:"noise2",seed:"1"}),e.jsx("feOffset",{in:"noise2",dx:"0",dy:"0",result:"offsetNoise2",children:e.jsx("animate",{attributeName:"dy",values:"0; -700",dur:"6s",repeatCount:"indefinite",calcMode:"linear"})}),e.jsx("feTurbulence",{type:"turbulence",baseFrequency:"0.02",numOctaves:"10",result:"noise1",seed:"2"}),e.jsx("feOffset",{in:"noise1",dx:"0",dy:"0",result:"offsetNoise3",children:e.jsx("animate",{attributeName:"dx",values:"490; 0",dur:"6s",repeatCount:"indefinite",calcMode:"linear"})}),e.jsx("feTurbulence",{type:"turbulence",baseFrequency:"0.02",numOctaves:"10",result:"noise2",seed:"2"}),e.jsx("feOffset",{in:"noise2",dx:"0",dy:"0",result:"offsetNoise4",children:e.jsx("animate",{attributeName:"dx",values:"0; -490",dur:"6s",repeatCount:"indefinite",calcMode:"linear"})}),e.jsx("feComposite",{in:"offsetNoise1",in2:"offsetNoise2",result:"part1"}),e.jsx("feComposite",{in:"offsetNoise3",in2:"offsetNoise4",result:"part2"}),e.jsx("feBlend",{in:"part1",in2:"part2",mode:"color-dodge",result:"combinedNoise"}),e.jsx("feDisplacementMap",{in:"SourceGraphic",in2:"combinedNoise",scale:"30",xChannelSelector:"R",yChannelSelector:"B"})]})})}),e.jsxs("div",{className:"eb-layers",children:[e.jsx("div",{ref:r,className:"eb-stroke"}),e.jsx("div",{className:"eb-glow-1"}),e.jsx("div",{className:"eb-glow-2"}),e.jsx("div",{className:"eb-background-glow"})]}),e.jsx("div",{className:"eb-content",children:v})]})},_=()=>{const v=[{name:"color",type:"string",default:'"#5227FF"',description:"Stroke/glow color. Any CSS color (hex, rgb, hsl)."},{name:"speed",type:"number",default:"1",description:"Animation speed multiplier (higher = faster)."},{name:"chaos",type:"number",default:"1",description:"Distortion intensity from the SVG displacement (0 disables warp)."},{name:"thickness",type:"number",default:"2",description:"Border width in pixels."},{name:"className",type:"string",default:"—",description:"Optional className applied to the root wrapper."},{name:"style",type:"React.CSSProperties",default:"—",description:"Inline styles for the wrapper. Set borderRadius here to round corners."},{name:"children",type:"ReactNode",default:"—",description:"Content rendered inside the bordered container."}],[i,p]=s.useState("card"),[n,x]=s.useState({color:"#7df9ff",speed:1,chaos:.5,thickness:2,radius:16}),[a,g]=s.useState({color:"#B19EEF",speed:1,chaos:.5,thickness:2,radius:999}),[c,u]=s.useState({color:"#7df9ff",speed:1,chaos:.5,thickness:2,radius:"50%"}),d=i==="card"?n:i==="button"?a:c,o=i==="card"?x:i==="button"?g:u;return e.jsxs(j,{children:[e.jsxs(B,{children:[e.jsx(k,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:i==="card"?e.jsx(N,{color:n.color,speed:n.speed,chaos:n.chaos,thickness:n.thickness,style:{borderRadius:n.radius},children:e.jsxs("div",{style:{width:"300px",height:"360px"},className:"eb-demo-card",children:[e.jsx("div",{className:"eb-demo-badge",children:"Featured"}),e.jsx("h3",{className:"eb-demo-title",children:"Electric Card"}),e.jsx("p",{className:"eb-demo-desc",children:"An electric border for shocking your users, the right way."}),e.jsxs("div",{className:"eb-demo-row",children:[e.jsx("span",{className:"eb-demo-chip",children:"Live"}),e.jsx("span",{className:"eb-demo-chip",children:"v1.0"})]}),e.jsx("button",{className:"eb-demo-cta",children:"Get Started"})]})}):i==="button"?e.jsx(N,{color:a.color,speed:a.speed,chaos:a.chaos,thickness:a.thickness,style:{borderRadius:a.radius},className:"eb-button-container",children:e.jsx("div",{className:"eb-demo-button-wrap",children:e.jsx("button",{className:"eb-demo-button",children:"Learn More"})})}):e.jsx(N,{color:c.color,speed:c.speed,chaos:c.chaos,thickness:c.thickness,style:{borderRadius:c.radius},children:e.jsx("div",{style:{width:"200px",height:"200px",borderRadius:"50%"}})})}),e.jsxs(T,{children:[e.jsx(P,{title:"Example",name:"electric-border-example",width:140,value:i,options:[{label:"Card",value:"card"},{label:"Button",value:"button"},{label:"Circle",value:"circle"}],onChange:p}),e.jsxs(O,{alignItems:"center",mb:4,mt:4,children:[e.jsx($,{fontSize:"sm",mr:2,children:"Color"}),e.jsx(M,{type:"color",value:d.color,onChange:r=>o(t=>({...t,color:r.target.value})),width:"50px",padding:"0",height:"28px"})]}),e.jsx(A,{title:"Speed",min:.1,max:3,step:.1,value:d.speed,onChange:r=>o(t=>({...t,speed:r}))}),e.jsx(A,{title:"Chaos",min:.1,max:1,step:.1,value:d.chaos,onChange:r=>o(t=>({...t,chaos:r}))}),e.jsx(A,{title:"Thickness",min:1,max:5,step:1,value:d.thickness,valueUnit:"px",onChange:r=>o(t=>({...t,thickness:r}))})]}),e.jsx(F,{data:v})]}),e.jsx(I,{children:e.jsx(q,{codeObject:V})})]})};export{_ as default};
