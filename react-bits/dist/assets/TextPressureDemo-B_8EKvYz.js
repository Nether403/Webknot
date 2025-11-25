import{r as n,j as e,B as N,F as T,T as H}from"./index-wsKSLPNH.js";import{T as Z,P as _,a as ee,C as ne,b as re}from"./PropTable-C4uPWs8h.js";import{P as p}from"./PreviewSwitch-DqnF708j.js";import{u as te}from"./useForceRerender-BCFU-k0M.js";import{R as oe}from"./RefreshButton-CA3SFRlq.js";import{C as se}from"./Customize-1m_ZNqR9.js";import{P as ie}from"./PreviewInput-C0y58bk9.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const ae=({text:x="Compressa",fontFamily:v="Compressa VF",fontUrl:F="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2",width:S=!0,weight:R=!0,italic:C=!0,alpha:g=!1,flex:$=!0,stroke:w=!1,scale:b=!1,textColor:d="#FFFFFF",strokeColor:L="#FF0000",className:k="",minFontSize:z=24})=>{const f=n.useRef(null),h=n.useRef(null),y=n.useRef([]),a=n.useRef({x:0,y:0}),l=n.useRef({x:0,y:0}),[c,r]=n.useState(z),[W,A]=n.useState(1),[I,P]=n.useState(1),V=x.split(""),X=(o,s)=>{const t=s.x-o.x,i=s.y-o.y;return Math.sqrt(t*t+i*i)};n.useEffect(()=>{const o=t=>{l.current.x=t.clientX,l.current.y=t.clientY},s=t=>{const i=t.touches[0];l.current.x=i.clientX,l.current.y=i.clientY};if(window.addEventListener("mousemove",o),window.addEventListener("touchmove",s,{passive:!1}),f.current){const{left:t,top:i,width:u,height:m}=f.current.getBoundingClientRect();a.current.x=t+u/2,a.current.y=i+m/2,l.current.x=a.current.x,l.current.y=a.current.y}return()=>{window.removeEventListener("mousemove",o),window.removeEventListener("touchmove",s)}},[]);const j=()=>{if(!f.current||!h.current)return;const{width:o,height:s}=f.current.getBoundingClientRect();let t=o/(V.length/2);t=Math.max(t,z),r(t),A(1),P(1),requestAnimationFrame(()=>{if(!h.current)return;const i=h.current.getBoundingClientRect();if(b&&i.height>0){const u=s/i.height;A(u),P(u)}})};n.useEffect(()=>(j(),window.addEventListener("resize",j),()=>window.removeEventListener("resize",j)),[b,x]),n.useEffect(()=>{let o;const s=()=>{if(a.current.x+=(l.current.x-a.current.x)/15,a.current.y+=(l.current.y-a.current.y)/15,h.current){const i=h.current.getBoundingClientRect().width/2;y.current.forEach(u=>{if(!u)return;const m=u.getBoundingClientRect(),D={x:m.x+m.width/2,y:m.y+m.height/2},M=X(a.current,D),E=(K,Y,B)=>{const Q=B-Math.abs(B*K/i);return Math.max(Y,Q+Y)},U=S?Math.floor(E(M,5,200)):100,O=R?Math.floor(E(M,100,900)):400,G=C?E(M,0,1).toFixed(2):0,J=g?E(M,0,1).toFixed(2):1;u.style.opacity=J,u.style.fontVariationSettings=`'wght' ${O}, 'wdth' ${U}, 'ital' ${G}`})}o=requestAnimationFrame(s)};return s(),()=>cancelAnimationFrame(o)},[S,R,C,g,V.length]);const q=[k,$?"flex":"",w?"stroke":""].filter(Boolean).join(" ");return e.jsxs("div",{ref:f,style:{position:"relative",width:"100%",height:"100%",background:"transparent"},children:[e.jsx("style",{children:`
        @font-face {
          font-family: '${v}';
          src: url('${F}');
          font-style: normal;
        }

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: ${d};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${L};
        }

        .text-pressure-title {
          color: ${d};
        }
      `}),e.jsx("h1",{ref:h,className:`text-pressure-title ${q}`,style:{fontFamily:v,textTransform:"uppercase",fontSize:c,lineHeight:I,transform:`scale(1, ${W})`,transformOrigin:"center top",margin:0,textAlign:"center",userSelect:"none",whiteSpace:"nowrap",fontWeight:100,width:"100%"},children:V.map((o,s)=>e.jsx("span",{ref:t=>y.current[s]=t,"data-char":o,style:{display:"inline-block",color:w?void 0:d},children:o},s))})]})},ce=`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ\r
\r
import { useEffect, useRef, useState } from 'react';\r
\r
const TextPressure = ({\r
  text = 'Compressa',\r
  fontFamily = 'Compressa VF',\r
  // This font is just an example, you should not use it in commercial projects.\r
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',\r
\r
  width = true,\r
  weight = true,\r
  italic = true,\r
  alpha = false,\r
\r
  flex = true,\r
  stroke = false,\r
  scale = false,\r
\r
  textColor = '#FFFFFF',\r
  strokeColor = '#FF0000',\r
  className = '',\r
\r
  minFontSize = 24\r
}) => {\r
  const containerRef = useRef(null);\r
  const titleRef = useRef(null);\r
  const spansRef = useRef([]);\r
\r
  const mouseRef = useRef({ x: 0, y: 0 });\r
  const cursorRef = useRef({ x: 0, y: 0 });\r
\r
  const [fontSize, setFontSize] = useState(minFontSize);\r
  const [scaleY, setScaleY] = useState(1);\r
  const [lineHeight, setLineHeight] = useState(1);\r
\r
  const chars = text.split('');\r
\r
  const dist = (a, b) => {\r
    const dx = b.x - a.x;\r
    const dy = b.y - a.y;\r
    return Math.sqrt(dx * dx + dy * dy);\r
  };\r
\r
  useEffect(() => {\r
    const handleMouseMove = e => {\r
      cursorRef.current.x = e.clientX;\r
      cursorRef.current.y = e.clientY;\r
    };\r
    const handleTouchMove = e => {\r
      const t = e.touches[0];\r
      cursorRef.current.x = t.clientX;\r
      cursorRef.current.y = t.clientY;\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    window.addEventListener('touchmove', handleTouchMove, { passive: false });\r
\r
    if (containerRef.current) {\r
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();\r
      mouseRef.current.x = left + width / 2;\r
      mouseRef.current.y = top + height / 2;\r
      cursorRef.current.x = mouseRef.current.x;\r
      cursorRef.current.y = mouseRef.current.y;\r
    }\r
\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      window.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, []);\r
\r
  const setSize = () => {\r
    if (!containerRef.current || !titleRef.current) return;\r
\r
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();\r
\r
    let newFontSize = containerW / (chars.length / 2);\r
    newFontSize = Math.max(newFontSize, minFontSize);\r
\r
    setFontSize(newFontSize);\r
    setScaleY(1);\r
    setLineHeight(1);\r
\r
    requestAnimationFrame(() => {\r
      if (!titleRef.current) return;\r
      const textRect = titleRef.current.getBoundingClientRect();\r
\r
      if (scale && textRect.height > 0) {\r
        const yRatio = containerH / textRect.height;\r
        setScaleY(yRatio);\r
        setLineHeight(yRatio);\r
      }\r
    });\r
  };\r
\r
  useEffect(() => {\r
    setSize();\r
    window.addEventListener('resize', setSize);\r
    return () => window.removeEventListener('resize', setSize);\r
    // eslint-disable-next-line\r
  }, [scale, text]);\r
\r
  useEffect(() => {\r
    let rafId;\r
    const animate = () => {\r
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;\r
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;\r
\r
      if (titleRef.current) {\r
        const titleRect = titleRef.current.getBoundingClientRect();\r
        const maxDist = titleRect.width / 2;\r
\r
        spansRef.current.forEach(span => {\r
          if (!span) return;\r
\r
          const rect = span.getBoundingClientRect();\r
          const charCenter = {\r
            x: rect.x + rect.width / 2,\r
            y: rect.y + rect.height / 2\r
          };\r
\r
          const d = dist(mouseRef.current, charCenter);\r
\r
          const getAttr = (distance, minVal, maxVal) => {\r
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);\r
            return Math.max(minVal, val + minVal);\r
          };\r
\r
          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;\r
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;\r
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;\r
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;\r
\r
          span.style.opacity = alphaVal;\r
          span.style.fontVariationSettings = \`'wght' \${wght}, 'wdth' \${wdth}, 'ital' \${italVal}\`;\r
        });\r
      }\r
\r
      rafId = requestAnimationFrame(animate);\r
    };\r
\r
    animate();\r
    return () => cancelAnimationFrame(rafId);\r
  }, [width, weight, italic, alpha, chars.length]);\r
\r
  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : ''].filter(Boolean).join(' ');\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      style={{\r
        position: 'relative',\r
        width: '100%',\r
        height: '100%',\r
        background: 'transparent'\r
      }}\r
    >\r
      <style>{\`\r
        @font-face {\r
          font-family: '\${fontFamily}';\r
          src: url('\${fontUrl}');\r
          font-style: normal;\r
        }\r
\r
        .flex {\r
          display: flex;\r
          justify-content: space-between;\r
        }\r
\r
        .stroke span {\r
          position: relative;\r
          color: \${textColor};\r
        }\r
        .stroke span::after {\r
          content: attr(data-char);\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          color: transparent;\r
          z-index: -1;\r
          -webkit-text-stroke-width: 3px;\r
          -webkit-text-stroke-color: \${strokeColor};\r
        }\r
\r
        .text-pressure-title {\r
          color: \${textColor};\r
        }\r
      \`}</style>\r
\r
      <h1\r
        ref={titleRef}\r
        className={\`text-pressure-title \${dynamicClassName}\`}\r
        style={{\r
          fontFamily,\r
          textTransform: 'uppercase',\r
          fontSize: fontSize,\r
          lineHeight,\r
          transform: \`scale(1, \${scaleY})\`,\r
          transformOrigin: 'center top',\r
          margin: 0,\r
          textAlign: 'center',\r
          userSelect: 'none',\r
          whiteSpace: 'nowrap',\r
          fontWeight: 100,\r
          width: '100%'\r
        }}\r
      >\r
        {chars.map((char, i) => (\r
          <span\r
            key={i}\r
            ref={el => (spansRef.current[i] = el)}\r
            data-char={char}\r
            style={{\r
              display: 'inline-block',\r
              color: stroke ? undefined : textColor\r
            }}\r
          >\r
            {char}\r
          </span>\r
        ))}\r
      </h1>\r
    </div>\r
  );\r
};\r
\r
export default TextPressure;\r
`,le=`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ\r
\r
import { useEffect, useRef, useState } from 'react';\r
\r
const TextPressure = ({\r
  text = 'Compressa',\r
  fontFamily = 'Compressa VF',\r
  // This font is just an example, you should not use it in commercial projects.\r
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',\r
\r
  width = true,\r
  weight = true,\r
  italic = true,\r
  alpha = false,\r
\r
  flex = true,\r
  stroke = false,\r
  scale = false,\r
\r
  textColor = '#FFFFFF',\r
  strokeColor = '#FF0000',\r
  strokeWidth = 2,\r
  className = '',\r
\r
  minFontSize = 24\r
}) => {\r
  const containerRef = useRef(null);\r
  const titleRef = useRef(null);\r
  const spansRef = useRef([]);\r
\r
  const mouseRef = useRef({ x: 0, y: 0 });\r
  const cursorRef = useRef({ x: 0, y: 0 });\r
\r
  const [fontSize, setFontSize] = useState(minFontSize);\r
  const [scaleY, setScaleY] = useState(1);\r
  const [lineHeight, setLineHeight] = useState(1);\r
\r
  const chars = text.split('');\r
\r
  const dist = (a, b) => {\r
    const dx = b.x - a.x;\r
    const dy = b.y - a.y;\r
    return Math.sqrt(dx * dx + dy * dy);\r
  };\r
\r
  useEffect(() => {\r
    const handleMouseMove = e => {\r
      cursorRef.current.x = e.clientX;\r
      cursorRef.current.y = e.clientY;\r
    };\r
    const handleTouchMove = e => {\r
      const t = e.touches[0];\r
      cursorRef.current.x = t.clientX;\r
      cursorRef.current.y = t.clientY;\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    window.addEventListener('touchmove', handleTouchMove, { passive: false });\r
\r
    if (containerRef.current) {\r
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();\r
      mouseRef.current.x = left + width / 2;\r
      mouseRef.current.y = top + height / 2;\r
      cursorRef.current.x = mouseRef.current.x;\r
      cursorRef.current.y = mouseRef.current.y;\r
    }\r
\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      window.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, []);\r
\r
  const setSize = () => {\r
    if (!containerRef.current || !titleRef.current) return;\r
\r
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();\r
\r
    let newFontSize = containerW / (chars.length / 2);\r
    newFontSize = Math.max(newFontSize, minFontSize);\r
\r
    setFontSize(newFontSize);\r
    setScaleY(1);\r
    setLineHeight(1);\r
\r
    requestAnimationFrame(() => {\r
      if (!titleRef.current) return;\r
      const textRect = titleRef.current.getBoundingClientRect();\r
\r
      if (scale && textRect.height > 0) {\r
        const yRatio = containerH / textRect.height;\r
        setScaleY(yRatio);\r
        setLineHeight(yRatio);\r
      }\r
    });\r
  };\r
\r
  useEffect(() => {\r
    setSize();\r
    window.addEventListener('resize', setSize);\r
    return () => window.removeEventListener('resize', setSize);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [scale, text]);\r
\r
  useEffect(() => {\r
    let rafId;\r
    const animate = () => {\r
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;\r
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;\r
\r
      if (titleRef.current) {\r
        const titleRect = titleRef.current.getBoundingClientRect();\r
        const maxDist = titleRect.width / 2;\r
\r
        spansRef.current.forEach(span => {\r
          if (!span) return;\r
\r
          const rect = span.getBoundingClientRect();\r
          const charCenter = {\r
            x: rect.x + rect.width / 2,\r
            y: rect.y + rect.height / 2\r
          };\r
\r
          const d = dist(mouseRef.current, charCenter);\r
\r
          const getAttr = (distance, minVal, maxVal) => {\r
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);\r
            return Math.max(minVal, val + minVal);\r
          };\r
\r
          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;\r
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;\r
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;\r
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;\r
\r
          span.style.opacity = alphaVal;\r
          span.style.fontVariationSettings = \`'wght' \${wght}, 'wdth' \${wdth}, 'ital' \${italVal}\`;\r
        });\r
      }\r
\r
      rafId = requestAnimationFrame(animate);\r
    };\r
\r
    animate();\r
    return () => cancelAnimationFrame(rafId);\r
  }, [width, weight, italic, alpha, chars.length]);\r
\r
  return (\r
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent">\r
      <style>{\`\r
        @font-face {\r
          font-family: '\${fontFamily}';\r
          src: url('\${fontUrl}');\r
          font-style: normal;\r
        }\r
        .stroke span {\r
          position: relative;\r
          color: \${textColor};\r
        }\r
        .stroke span::after {\r
          content: attr(data-char);\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          color: transparent;\r
          z-index: -1;\r
          -webkit-text-stroke-width: \${strokeWidth}px;\r
          -webkit-text-stroke-color: \${strokeColor};\r
        }\r
      \`}</style>\r
\r
      <h1\r
        ref={titleRef}\r
        className={\`text-pressure-title \${className} \${\r
          flex ? 'flex justify-between' : ''\r
        } \${stroke ? 'stroke' : ''} uppercase text-center\`}\r
        style={{\r
          fontFamily,\r
          fontSize: fontSize,\r
          lineHeight,\r
          transform: \`scale(1, \${scaleY})\`,\r
          transformOrigin: 'center top',\r
          margin: 0,\r
          fontWeight: 100,\r
          color: stroke ? undefined : textColor\r
        }}\r
      >\r
        {chars.map((char, i) => (\r
          <span key={i} ref={el => (spansRef.current[i] = el)} data-char={char} className="inline-block">\r
            {char}\r
          </span>\r
        ))}\r
      </h1>\r
    </div>\r
  );\r
};\r
\r
export default TextPressure;\r
`,ue=`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ\r
\r
import { useEffect, useRef, useState } from 'react';\r
\r
interface TextPressureProps {\r
  text?: string;\r
  fontFamily?: string;\r
  fontUrl?: string;\r
  width?: boolean;\r
  weight?: boolean;\r
  italic?: boolean;\r
  alpha?: boolean;\r
  flex?: boolean;\r
  stroke?: boolean;\r
  scale?: boolean;\r
  textColor?: string;\r
  strokeColor?: string;\r
  className?: string;\r
  minFontSize?: number;\r
}\r
\r
const TextPressure: React.FC<TextPressureProps> = ({\r
  text = 'Compressa',\r
  fontFamily = 'Compressa VF',\r
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',\r
  width = true,\r
  weight = true,\r
  italic = true,\r
  alpha = false,\r
  flex = true,\r
  stroke = false,\r
  scale = false,\r
  textColor = '#FFFFFF',\r
  strokeColor = '#FF0000',\r
  className = '',\r
  minFontSize = 24\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const titleRef = useRef<HTMLHeadingElement | null>(null);\r
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);\r
\r
  const mouseRef = useRef({ x: 0, y: 0 });\r
  const cursorRef = useRef({ x: 0, y: 0 });\r
\r
  const [fontSize, setFontSize] = useState(minFontSize);\r
  const [scaleY, setScaleY] = useState(1);\r
  const [lineHeight, setLineHeight] = useState(1);\r
\r
  const chars = text.split('');\r
\r
  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {\r
    const dx = b.x - a.x;\r
    const dy = b.y - a.y;\r
    return Math.sqrt(dx * dx + dy * dy);\r
  };\r
\r
  useEffect(() => {\r
    const handleMouseMove = (e: MouseEvent) => {\r
      cursorRef.current.x = e.clientX;\r
      cursorRef.current.y = e.clientY;\r
    };\r
    const handleTouchMove = (e: TouchEvent) => {\r
      const t = e.touches[0];\r
      cursorRef.current.x = t.clientX;\r
      cursorRef.current.y = t.clientY;\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    window.addEventListener('touchmove', handleTouchMove, { passive: false });\r
\r
    if (containerRef.current) {\r
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();\r
      mouseRef.current.x = left + width / 2;\r
      mouseRef.current.y = top + height / 2;\r
      cursorRef.current.x = mouseRef.current.x;\r
      cursorRef.current.y = mouseRef.current.y;\r
    }\r
\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      window.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, []);\r
\r
  const setSize = () => {\r
    if (!containerRef.current || !titleRef.current) return;\r
\r
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();\r
\r
    let newFontSize = containerW / (chars.length / 2);\r
    newFontSize = Math.max(newFontSize, minFontSize);\r
\r
    setFontSize(newFontSize);\r
    setScaleY(1);\r
    setLineHeight(1);\r
\r
    requestAnimationFrame(() => {\r
      if (!titleRef.current) return;\r
      const textRect = titleRef.current.getBoundingClientRect();\r
\r
      if (scale && textRect.height > 0) {\r
        const yRatio = containerH / textRect.height;\r
        setScaleY(yRatio);\r
        setLineHeight(yRatio);\r
      }\r
    });\r
  };\r
\r
  useEffect(() => {\r
    setSize();\r
    window.addEventListener('resize', setSize);\r
    return () => window.removeEventListener('resize', setSize);\r
  }, [scale, text]);\r
\r
  useEffect(() => {\r
    let rafId: number;\r
    const animate = () => {\r
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;\r
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;\r
\r
      if (titleRef.current) {\r
        const titleRect = titleRef.current.getBoundingClientRect();\r
        const maxDist = titleRect.width / 2;\r
\r
        spansRef.current.forEach(span => {\r
          if (!span) return;\r
\r
          const rect = span.getBoundingClientRect();\r
          const charCenter = {\r
            x: rect.x + rect.width / 2,\r
            y: rect.y + rect.height / 2\r
          };\r
\r
          const d = dist(mouseRef.current, charCenter);\r
\r
          const getAttr = (distance: number, minVal: number, maxVal: number) => {\r
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);\r
            return Math.max(minVal, val + minVal);\r
          };\r
\r
          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;\r
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;\r
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;\r
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;\r
\r
          span.style.opacity = alphaVal.toString();\r
          span.style.fontVariationSettings = \`'wght' \${wght}, 'wdth' \${wdth}, 'ital' \${italVal}\`;\r
        });\r
      }\r
\r
      rafId = requestAnimationFrame(animate);\r
    };\r
\r
    animate();\r
    return () => cancelAnimationFrame(rafId);\r
  }, [width, weight, italic, alpha, chars.length]);\r
\r
  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : ''].filter(Boolean).join(' ');\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      style={{\r
        position: 'relative',\r
        width: '100%',\r
        height: '100%',\r
        background: 'transparent'\r
      }}\r
    >\r
      <style>{\`\r
        @font-face {\r
          font-family: '\${fontFamily}';\r
          src: url('\${fontUrl}');\r
          font-style: normal;\r
        }\r
\r
        .flex {\r
          display: flex;\r
          justify-content: space-between;\r
        }\r
\r
        .stroke span {\r
          position: relative;\r
          color: \${textColor};\r
        }\r
        .stroke span::after {\r
          content: attr(data-char);\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          color: transparent;\r
          z-index: -1;\r
          -webkit-text-stroke-width: 3px;\r
          -webkit-text-stroke-color: \${strokeColor};\r
        }\r
\r
        .text-pressure-title {\r
          color: \${textColor};\r
        }\r
      \`}</style>\r
\r
      <h1\r
        ref={titleRef}\r
        className={\`text-pressure-title \${dynamicClassName}\`}\r
        style={{\r
          fontFamily,\r
          textTransform: 'uppercase',\r
          fontSize: fontSize,\r
          lineHeight,\r
          transform: \`scale(1, \${scaleY})\`,\r
          transformOrigin: 'center top',\r
          margin: 0,\r
          textAlign: 'center',\r
          userSelect: 'none',\r
          whiteSpace: 'nowrap',\r
          fontWeight: 100,\r
          width: '100%'\r
        }}\r
      >\r
        {chars.map((char, i) => (\r
          <span\r
            key={i}\r
            ref={el => {\r
              spansRef.current[i] = el;\r
            }}\r
            data-char={char}\r
            style={{\r
              display: 'inline-block',\r
              color: stroke ? undefined : textColor\r
            }}\r
          >\r
            {char}\r
          </span>\r
        ))}\r
      </h1>\r
    </div>\r
  );\r
};\r
\r
export default TextPressure;\r
`,fe=`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ\r
\r
import { useEffect, useRef, useState } from 'react';\r
\r
interface TextPressureProps {\r
  text?: string;\r
  fontFamily?: string;\r
  fontUrl?: string;\r
  width?: boolean;\r
  weight?: boolean;\r
  italic?: boolean;\r
  alpha?: boolean;\r
  flex?: boolean;\r
  stroke?: boolean;\r
  scale?: boolean;\r
  textColor?: string;\r
  strokeColor?: string;\r
  strokeWidth?: number;\r
  className?: string;\r
  minFontSize?: number;\r
}\r
\r
const TextPressure: React.FC<TextPressureProps> = ({\r
  text = 'Compressa',\r
  fontFamily = 'Compressa VF',\r
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',\r
  width = true,\r
  weight = true,\r
  italic = true,\r
  alpha = false,\r
  flex = true,\r
  stroke = false,\r
  scale = false,\r
  textColor = '#FFFFFF',\r
  strokeColor = '#FF0000',\r
  strokeWidth = 2,\r
  className = '',\r
  minFontSize = 24\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const titleRef = useRef<HTMLHeadingElement | null>(null);\r
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);\r
\r
  const mouseRef = useRef({ x: 0, y: 0 });\r
  const cursorRef = useRef({ x: 0, y: 0 });\r
\r
  const [fontSize, setFontSize] = useState(minFontSize);\r
  const [scaleY, setScaleY] = useState(1);\r
  const [lineHeight, setLineHeight] = useState(1);\r
\r
  const chars = text.split('');\r
\r
  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {\r
    const dx = b.x - a.x;\r
    const dy = b.y - a.y;\r
    return Math.sqrt(dx * dx + dy * dy);\r
  };\r
\r
  useEffect(() => {\r
    const handleMouseMove = (e: MouseEvent) => {\r
      cursorRef.current.x = e.clientX;\r
      cursorRef.current.y = e.clientY;\r
    };\r
    const handleTouchMove = (e: TouchEvent) => {\r
      const t = e.touches[0];\r
      cursorRef.current.x = t.clientX;\r
      cursorRef.current.y = t.clientY;\r
    };\r
\r
    window.addEventListener('mousemove', handleMouseMove);\r
    window.addEventListener('touchmove', handleTouchMove, { passive: false });\r
\r
    if (containerRef.current) {\r
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();\r
      mouseRef.current.x = left + width / 2;\r
      mouseRef.current.y = top + height / 2;\r
      cursorRef.current.x = mouseRef.current.x;\r
      cursorRef.current.y = mouseRef.current.y;\r
    }\r
\r
    return () => {\r
      window.removeEventListener('mousemove', handleMouseMove);\r
      window.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, []);\r
\r
  const setSize = () => {\r
    if (!containerRef.current || !titleRef.current) return;\r
\r
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();\r
\r
    let newFontSize = containerW / (chars.length / 2);\r
    newFontSize = Math.max(newFontSize, minFontSize);\r
\r
    setFontSize(newFontSize);\r
    setScaleY(1);\r
    setLineHeight(1);\r
\r
    requestAnimationFrame(() => {\r
      if (!titleRef.current) return;\r
      const textRect = titleRef.current.getBoundingClientRect();\r
\r
      if (scale && textRect.height > 0) {\r
        const yRatio = containerH / textRect.height;\r
        setScaleY(yRatio);\r
        setLineHeight(yRatio);\r
      }\r
    });\r
  };\r
\r
  useEffect(() => {\r
    setSize();\r
    window.addEventListener('resize', setSize);\r
    return () => window.removeEventListener('resize', setSize);\r
  }, [scale, text]);\r
\r
  useEffect(() => {\r
    let rafId: number;\r
    const animate = () => {\r
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;\r
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;\r
\r
      if (titleRef.current) {\r
        const titleRect = titleRef.current.getBoundingClientRect();\r
        const maxDist = titleRect.width / 2;\r
\r
        spansRef.current.forEach(span => {\r
          if (!span) return;\r
\r
          const rect = span.getBoundingClientRect();\r
          const charCenter = {\r
            x: rect.x + rect.width / 2,\r
            y: rect.y + rect.height / 2\r
          };\r
\r
          const d = dist(mouseRef.current, charCenter);\r
\r
          const getAttr = (distance: number, minVal: number, maxVal: number) => {\r
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);\r
            return Math.max(minVal, val + minVal);\r
          };\r
\r
          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;\r
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;\r
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : '0';\r
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : '1';\r
\r
          span.style.opacity = alphaVal;\r
          span.style.fontVariationSettings = \`'wght' \${wght}, 'wdth' \${wdth}, 'ital' \${italVal}\`;\r
        });\r
      }\r
\r
      rafId = requestAnimationFrame(animate);\r
    };\r
\r
    animate();\r
    return () => cancelAnimationFrame(rafId);\r
  }, [width, weight, italic, alpha, chars.length]);\r
\r
  return (\r
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent">\r
      <style>{\`\r
        @font-face {\r
          font-family: '\${fontFamily}';\r
          src: url('\${fontUrl}');\r
          font-style: normal;\r
        }\r
        .stroke span {\r
          position: relative;\r
          color: \${textColor};\r
        }\r
        .stroke span::after {\r
          content: attr(data-char);\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          color: transparent;\r
          z-index: -1;\r
          -webkit-text-stroke-width: \${strokeWidth}px;\r
          -webkit-text-stroke-color: \${strokeColor};\r
        }\r
      \`}</style>\r
\r
      <h1\r
        ref={titleRef}\r
        className={\`text-pressure-title \${className} \${\r
          flex ? 'flex justify-between' : ''\r
        } \${stroke ? 'stroke' : ''} uppercase text-center\`}\r
        style={{\r
          fontFamily,\r
          fontSize: fontSize,\r
          lineHeight,\r
          transform: \`scale(1, \${scaleY})\`,\r
          transformOrigin: 'center top',\r
          margin: 0,\r
          fontWeight: 100,\r
          color: stroke ? undefined : textColor\r
        }}\r
      >\r
        {chars.map((char, i) => (\r
          <span\r
            key={i}\r
            ref={el => {\r
              spansRef.current[i] = el;\r
            }}\r
            data-char={char}\r
            className="inline-block"\r
          >\r
            {char}\r
          </span>\r
        ))}\r
      </h1>\r
    </div>\r
  );\r
};\r
\r
export default TextPressure;\r
`,he={usage:`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// Font used - https://compressa.preusstype.com/
  
import TextPressure from './TextPressure';

// Note:
// Make sure the font you're using supports all the variable properties. 
// React Bits does not take responsibility for the fonts used

<div style={{position: 'relative', height: '300px'}}>
  <TextPressure
    text="Hello!"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={36}
  />
</div>`,code:ce,tailwind:le,tsCode:ue,tsTailwind:fe},de=[{name:"text",type:"string",default:'"Hello!"',description:"Text content that will be displayed and animated."},{name:"fontFamily",type:"string",default:"",description:"Name of the variable font family."},{name:"fontUrl",type:"string",default:"URL to a .woff2 or .ttf file",description:"URL for the variable font file (needed)"},{name:"flex",type:"boolean",default:"true",description:"Whether the characters are spaced using flex layout."},{name:"scale",type:"boolean",default:"false",description:"If true, vertically scales the text to fill its container height."},{name:"alpha",type:"boolean",default:"false",description:"If true, applies an opacity effect based on cursor distance."},{name:"stroke",type:"boolean",default:"false",description:"If true, adds a stroke effect around characters."},{name:"width",type:"boolean",default:"true",description:'If true, varies the variable-font "width" axis.'},{name:"weight",type:"boolean",default:"true",description:'If true, varies the variable-font "weight" axis.'},{name:"italic",type:"boolean",default:"true",description:'If true, varies the variable-font "italics" axis.'},{name:"textColor",type:"string",default:"true",description:"The fill color of the text"},{name:"strokeColor",type:"string",default:"#FFFFFF",description:'The stroke color that will be applied to the text when "stroke" is set to true'},{name:"className",type:"string",default:"#FF0000",description:"Additional class for styling the <h1> wrapper."},{name:"minFontSize",type:"number",default:"24",description:"Sets a minimum font-size to avoid overly tiny text on smaller screens."}],Se=()=>{const[x,v]=n.useState("Hello!"),[F,S]=n.useState(!0),[R,C]=n.useState(!1),[g,$]=n.useState(!1),[w,b]=n.useState(!0),[d,L]=n.useState(!0),[k,z]=n.useState(!0),[f,h]=n.useState("#ffffff"),[y,a]=n.useState("#5227FF"),[l,c]=te();return e.jsxs(Z,{children:[e.jsxs(_,{children:[e.jsxs(N,{position:"relative",className:"demo-container",bg:"#060010",minH:400,maxH:450,overflow:"hidden",mb:6,children:[e.jsx(oe,{onClick:c}),e.jsx(N,{w:"100%",h:"100%",children:e.jsx(ae,{text:x,flex:F,alpha:R,stroke:g,width:w,weight:d,italic:k,textColor:f,strokeColor:y,minFontSize:36},l)})]}),e.jsxs(se,{children:[e.jsx(ie,{title:"Text",value:x,placeholder:"Your text here...",width:200,maxLength:10,onChange:v}),e.jsxs(T,{alignItems:"center",gap:4,flexWrap:"wrap",mt:6,children:[e.jsxs(T,{gap:4,align:"center",children:[e.jsx(H,{fontSize:"sm",children:"Text Color"}),e.jsx("input",{type:"color",value:f,width:"60px",onChange:r=>{h(r.target.value),c()}})]}),e.jsxs(T,{gap:4,align:"center",children:[e.jsx(H,{fontSize:"sm",children:"Stroke Color"}),e.jsx("input",{type:"color",value:y,width:"60px",onChange:r=>{a(r.target.value),c()}})]})]}),e.jsx(H,{mt:6,color:"#999",children:"Animation Settings"}),e.jsxs(T,{gap:4,flexWrap:"wrap",children:[e.jsx(p,{title:"Flex",isChecked:F,onChange:r=>{S(r),c()}}),e.jsx(p,{title:"Alpha",isChecked:R,onChange:r=>{C(r),c()}}),e.jsx(p,{title:"Stroke",isChecked:g,onChange:r=>{$(r),c()}}),e.jsx(p,{title:"Width",isChecked:w,onChange:r=>{b(r),c()}}),e.jsx(p,{title:"Weight",isChecked:d,onChange:r=>{L(r),c()}}),e.jsx(p,{title:"Italic",isChecked:k,onChange:r=>{z(r),c()}})]})]}),e.jsx(ee,{data:de})]}),e.jsx(ne,{children:e.jsx(re,{codeObject:he})})]})};export{Se as default};
