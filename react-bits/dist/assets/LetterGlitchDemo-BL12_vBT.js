import{r as a,j as o,B as D,a as N,cd as M}from"./index-wsKSLPNH.js";import{T as O,P as J,a as K,C as Q,b as U}from"./PropTable-C4uPWs8h.js";import{C as X}from"./Customize-1m_ZNqR9.js";import{P as Y}from"./PreviewSlider-m1G_aiYP.js";import{P as L}from"./PreviewSwitch-DqnF708j.js";import{u as Z}from"./useForceRerender-BCFU-k0M.js";import{B as q}from"./BackgroundContent-CqU7Wlm2.js";import"./index-Bpz4cGEA.js";const rr=({glitchColors:g=["#2b4539","#61dca3","#61b3dc"],className:w="",glitchSpeed:f=50,centerVignette:v=!1,outerVignette:C=!0,smooth:m=!0,characters:b="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"})=>{const u=a.useRef(null),d=a.useRef(null),s=a.useRef([]),x=a.useRef({columns:0,rows:0}),c=a.useRef(null),p=a.useRef(Date.now()),i=Array.from(b),$=16,z=10,P=20,E=()=>i[Math.floor(Math.random()*i.length)],S=()=>g[Math.floor(Math.random()*g.length)],V=r=>{const e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;r=r.replace(e,(t,l,h,R)=>l+l+h+h+R+R);const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null},G=(r,e,n)=>{const t={r:Math.round(r.r+(e.r-r.r)*n),g:Math.round(r.g+(e.g-r.g)*n),b:Math.round(r.b+(e.b-r.b)*n)};return`rgb(${t.r}, ${t.g}, ${t.b})`},k=(r,e)=>{const n=Math.ceil(r/z),t=Math.ceil(e/P);return{columns:n,rows:t}},B=(r,e)=>{x.current={columns:r,rows:e};const n=r*e;s.current=Array.from({length:n},()=>({char:E(),color:S(),targetColor:S(),colorProgress:1}))},A=()=>{const r=u.current;if(!r)return;const e=r.parentElement;if(!e)return;const n=window.devicePixelRatio||1,t=e.getBoundingClientRect();r.width=t.width*n,r.height=t.height*n,r.style.width=`${t.width}px`,r.style.height=`${t.height}px`,c.current&&c.current.setTransform(n,0,0,n,0,0);const{columns:l,rows:h}=k(t.width,t.height);B(l,h),y()},y=()=>{if(!c.current||s.current.length===0)return;const r=c.current,{width:e,height:n}=u.current.getBoundingClientRect();r.clearRect(0,0,e,n),r.font=`${$}px monospace`,r.textBaseline="top",s.current.forEach((t,l)=>{const h=l%x.current.columns*z,R=Math.floor(l/x.current.columns)*P;r.fillStyle=t.color,r.fillText(t.char,h,R)})},_=()=>{if(!s.current||s.current.length===0)return;const r=Math.max(1,Math.floor(s.current.length*.05));for(let e=0;e<r;e++){const n=Math.floor(Math.random()*s.current.length);s.current[n]&&(s.current[n].char=E(),s.current[n].targetColor=S(),m?s.current[n].colorProgress=0:(s.current[n].color=s.current[n].targetColor,s.current[n].colorProgress=1))}},F=()=>{let r=!1;s.current.forEach(e=>{if(e.colorProgress<1){e.colorProgress+=.05,e.colorProgress>1&&(e.colorProgress=1);const n=V(e.color),t=V(e.targetColor);n&&t&&(e.color=G(n,t,e.colorProgress),r=!0)}}),r&&y()},T=()=>{const r=Date.now();r-p.current>=f&&(_(),y(),p.current=r),m&&F(),d.current=requestAnimationFrame(T)};a.useEffect(()=>{const r=u.current;if(!r)return;c.current=r.getContext("2d"),A(),T();let e;const n=()=>{clearTimeout(e),e=setTimeout(()=>{cancelAnimationFrame(d.current),A(),T()},100)};return window.addEventListener("resize",n),()=>{cancelAnimationFrame(d.current),window.removeEventListener("resize",n)}},[f,m]);const H={position:"relative",width:"100%",height:"100%",backgroundColor:"#000000",overflow:"hidden"},I={display:"block",width:"100%",height:"100%"},W={position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",background:"radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)"},j={position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",background:"radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)"};return o.jsxs("div",{style:H,className:w,children:[o.jsx("canvas",{ref:u,style:I}),C&&o.jsx("div",{style:W}),v&&o.jsx("div",{style:j})]})},nr=`import { useRef, useEffect } from 'react';\r
\r
const LetterGlitch = ({\r
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],\r
  className = '',\r
  glitchSpeed = 50,\r
  centerVignette = false,\r
  outerVignette = true,\r
  smooth = true,\r
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'\r
}) => {\r
  const canvasRef = useRef(null);\r
  const animationRef = useRef(null);\r
  const letters = useRef([]);\r
  const grid = useRef({ columns: 0, rows: 0 });\r
  const context = useRef(null);\r
  const lastGlitchTime = useRef(Date.now());\r
\r
  const lettersAndSymbols = Array.from(characters);\r
\r
  const fontSize = 16;\r
  const charWidth = 10;\r
  const charHeight = 20;\r
\r
  const getRandomChar = () => {\r
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];\r
  };\r
\r
  const getRandomColor = () => {\r
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];\r
  };\r
\r
  const hexToRgb = hex => {\r
    const shorthandRegex = /^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i;\r
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {\r
      return r + r + g + g + b + b;\r
    });\r
\r
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
    return result\r
      ? {\r
          r: parseInt(result[1], 16),\r
          g: parseInt(result[2], 16),\r
          b: parseInt(result[3], 16)\r
        }\r
      : null;\r
  };\r
\r
  const interpolateColor = (start, end, factor) => {\r
    const result = {\r
      r: Math.round(start.r + (end.r - start.r) * factor),\r
      g: Math.round(start.g + (end.g - start.g) * factor),\r
      b: Math.round(start.b + (end.b - start.b) * factor)\r
    };\r
    return \`rgb(\${result.r}, \${result.g}, \${result.b})\`;\r
  };\r
\r
  const calculateGrid = (width, height) => {\r
    const columns = Math.ceil(width / charWidth);\r
    const rows = Math.ceil(height / charHeight);\r
    return { columns, rows };\r
  };\r
\r
  const initializeLetters = (columns, rows) => {\r
    grid.current = { columns, rows };\r
    const totalLetters = columns * rows;\r
    letters.current = Array.from({ length: totalLetters }, () => ({\r
      char: getRandomChar(),\r
      color: getRandomColor(),\r
      targetColor: getRandomColor(),\r
      colorProgress: 1\r
    }));\r
  };\r
\r
  const resizeCanvas = () => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const parent = canvas.parentElement;\r
    if (!parent) return;\r
\r
    const dpr = window.devicePixelRatio || 1;\r
    const rect = parent.getBoundingClientRect();\r
\r
    canvas.width = rect.width * dpr;\r
    canvas.height = rect.height * dpr;\r
\r
    canvas.style.width = \`\${rect.width}px\`;\r
    canvas.style.height = \`\${rect.height}px\`;\r
\r
    if (context.current) {\r
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);\r
    }\r
\r
    const { columns, rows } = calculateGrid(rect.width, rect.height);\r
    initializeLetters(columns, rows);\r
\r
    drawLetters();\r
  };\r
\r
  const drawLetters = () => {\r
    if (!context.current || letters.current.length === 0) return;\r
    const ctx = context.current;\r
    const { width, height } = canvasRef.current.getBoundingClientRect();\r
    ctx.clearRect(0, 0, width, height);\r
    ctx.font = \`\${fontSize}px monospace\`;\r
    ctx.textBaseline = 'top';\r
\r
    letters.current.forEach((letter, index) => {\r
      const x = (index % grid.current.columns) * charWidth;\r
      const y = Math.floor(index / grid.current.columns) * charHeight;\r
      ctx.fillStyle = letter.color;\r
      ctx.fillText(letter.char, x, y);\r
    });\r
  };\r
\r
  const updateLetters = () => {\r
    if (!letters.current || letters.current.length === 0) return;\r
\r
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));\r
\r
    for (let i = 0; i < updateCount; i++) {\r
      const index = Math.floor(Math.random() * letters.current.length);\r
      if (!letters.current[index]) continue;\r
\r
      letters.current[index].char = getRandomChar();\r
      letters.current[index].targetColor = getRandomColor();\r
\r
      if (!smooth) {\r
        letters.current[index].color = letters.current[index].targetColor;\r
        letters.current[index].colorProgress = 1;\r
      } else {\r
        letters.current[index].colorProgress = 0;\r
      }\r
    }\r
  };\r
\r
  const handleSmoothTransitions = () => {\r
    let needsRedraw = false;\r
    letters.current.forEach(letter => {\r
      if (letter.colorProgress < 1) {\r
        letter.colorProgress += 0.05;\r
        if (letter.colorProgress > 1) letter.colorProgress = 1;\r
\r
        const startRgb = hexToRgb(letter.color);\r
        const endRgb = hexToRgb(letter.targetColor);\r
        if (startRgb && endRgb) {\r
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);\r
          needsRedraw = true;\r
        }\r
      }\r
    });\r
\r
    if (needsRedraw) {\r
      drawLetters();\r
    }\r
  };\r
\r
  const animate = () => {\r
    const now = Date.now();\r
    if (now - lastGlitchTime.current >= glitchSpeed) {\r
      updateLetters();\r
      drawLetters();\r
      lastGlitchTime.current = now;\r
    }\r
\r
    if (smooth) {\r
      handleSmoothTransitions();\r
    }\r
\r
    animationRef.current = requestAnimationFrame(animate);\r
  };\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    context.current = canvas.getContext('2d');\r
    resizeCanvas();\r
    animate();\r
\r
    let resizeTimeout;\r
\r
    const handleResize = () => {\r
      clearTimeout(resizeTimeout);\r
      resizeTimeout = setTimeout(() => {\r
        cancelAnimationFrame(animationRef.current);\r
        resizeCanvas();\r
        animate();\r
      }, 100);\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
\r
    return () => {\r
      cancelAnimationFrame(animationRef.current);\r
      window.removeEventListener('resize', handleResize);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [glitchSpeed, smooth]);\r
\r
  const containerStyle = {\r
    position: 'relative',\r
    width: '100%',\r
    height: '100%',\r
    backgroundColor: '#000000',\r
    overflow: 'hidden'\r
  };\r
\r
  const canvasStyle = {\r
    display: 'block',\r
    width: '100%',\r
    height: '100%'\r
  };\r
\r
  const outerVignetteStyle = {\r
    position: 'absolute',\r
    top: 0,\r
    left: 0,\r
    width: '100%',\r
    height: '100%',\r
    pointerEvents: 'none',\r
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)'\r
  };\r
\r
  const centerVignetteStyle = {\r
    position: 'absolute',\r
    top: 0,\r
    left: 0,\r
    width: '100%',\r
    height: '100%',\r
    pointerEvents: 'none',\r
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)'\r
  };\r
\r
  return (\r
    <div style={containerStyle} className={className}>\r
      <canvas ref={canvasRef} style={canvasStyle} />\r
      {outerVignette && <div style={outerVignetteStyle}></div>}\r
      {centerVignette && <div style={centerVignetteStyle}></div>}\r
    </div>\r
  );\r
};\r
\r
export default LetterGlitch;\r
`,er=`import { useRef, useEffect } from 'react';\r
\r
const LetterGlitch = ({\r
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],\r
  glitchSpeed = 50,\r
  centerVignette = false,\r
  outerVignette = true,\r
  smooth = true,\r
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'\r
}) => {\r
  const canvasRef = useRef(null);\r
  const animationRef = useRef(null);\r
  const letters = useRef([]);\r
  const grid = useRef({ columns: 0, rows: 0 });\r
  const context = useRef(null);\r
  const lastGlitchTime = useRef(Date.now());\r
\r
  const lettersAndSymbols = Array.from(characters);\r
\r
  const fontSize = 16;\r
  const charWidth = 10;\r
  const charHeight = 20;\r
\r
  const getRandomChar = () => {\r
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];\r
  };\r
\r
  const getRandomColor = () => {\r
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];\r
  };\r
\r
  const hexToRgb = hex => {\r
    const shorthandRegex = /^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i;\r
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {\r
      return r + r + g + g + b + b;\r
    });\r
\r
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
    return result\r
      ? {\r
          r: parseInt(result[1], 16),\r
          g: parseInt(result[2], 16),\r
          b: parseInt(result[3], 16)\r
        }\r
      : null;\r
  };\r
\r
  const interpolateColor = (start, end, factor) => {\r
    const result = {\r
      r: Math.round(start.r + (end.r - start.r) * factor),\r
      g: Math.round(start.g + (end.g - start.g) * factor),\r
      b: Math.round(start.b + (end.b - start.b) * factor)\r
    };\r
    return \`rgb(\${result.r}, \${result.g}, \${result.b})\`;\r
  };\r
\r
  const calculateGrid = (width, height) => {\r
    const columns = Math.ceil(width / charWidth);\r
    const rows = Math.ceil(height / charHeight);\r
    return { columns, rows };\r
  };\r
\r
  const initializeLetters = (columns, rows) => {\r
    grid.current = { columns, rows };\r
    const totalLetters = columns * rows;\r
    letters.current = Array.from({ length: totalLetters }, () => ({\r
      char: getRandomChar(),\r
      color: getRandomColor(),\r
      targetColor: getRandomColor(),\r
      colorProgress: 1\r
    }));\r
  };\r
\r
  const resizeCanvas = () => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const parent = canvas.parentElement;\r
    if (!parent) return;\r
\r
    const dpr = window.devicePixelRatio || 1;\r
    const rect = parent.getBoundingClientRect();\r
\r
    canvas.width = rect.width * dpr;\r
    canvas.height = rect.height * dpr;\r
\r
    canvas.style.width = \`\${rect.width}px\`;\r
    canvas.style.height = \`\${rect.height}px\`;\r
\r
    if (context.current) {\r
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);\r
    }\r
\r
    const { columns, rows } = calculateGrid(rect.width, rect.height);\r
    initializeLetters(columns, rows);\r
\r
    drawLetters();\r
  };\r
\r
  const drawLetters = () => {\r
    if (!context.current || letters.current.length === 0) return;\r
    const ctx = context.current;\r
    const { width, height } = canvasRef.current.getBoundingClientRect();\r
    ctx.clearRect(0, 0, width, height);\r
    ctx.font = \`\${fontSize}px monospace\`;\r
    ctx.textBaseline = 'top';\r
\r
    letters.current.forEach((letter, index) => {\r
      const x = (index % grid.current.columns) * charWidth;\r
      const y = Math.floor(index / grid.current.columns) * charHeight;\r
      ctx.fillStyle = letter.color;\r
      ctx.fillText(letter.char, x, y);\r
    });\r
  };\r
\r
  const updateLetters = () => {\r
    if (!letters.current || letters.current.length === 0) return;\r
\r
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));\r
\r
    for (let i = 0; i < updateCount; i++) {\r
      const index = Math.floor(Math.random() * letters.current.length);\r
      if (!letters.current[index]) continue;\r
\r
      letters.current[index].char = getRandomChar();\r
      letters.current[index].targetColor = getRandomColor();\r
\r
      if (!smooth) {\r
        letters.current[index].color = letters.current[index].targetColor;\r
        letters.current[index].colorProgress = 1;\r
      } else {\r
        letters.current[index].colorProgress = 0;\r
      }\r
    }\r
  };\r
\r
  const handleSmoothTransitions = () => {\r
    let needsRedraw = false;\r
    letters.current.forEach(letter => {\r
      if (letter.colorProgress < 1) {\r
        letter.colorProgress += 0.05;\r
        if (letter.colorProgress > 1) letter.colorProgress = 1;\r
\r
        const startRgb = hexToRgb(letter.color);\r
        const endRgb = hexToRgb(letter.targetColor);\r
        if (startRgb && endRgb) {\r
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);\r
          needsRedraw = true;\r
        }\r
      }\r
    });\r
\r
    if (needsRedraw) {\r
      drawLetters();\r
    }\r
  };\r
\r
  const animate = () => {\r
    const now = Date.now();\r
    if (now - lastGlitchTime.current >= glitchSpeed) {\r
      updateLetters();\r
      drawLetters();\r
      lastGlitchTime.current = now;\r
    }\r
\r
    if (smooth) {\r
      handleSmoothTransitions();\r
    }\r
\r
    animationRef.current = requestAnimationFrame(animate);\r
  };\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    context.current = canvas.getContext('2d');\r
    resizeCanvas();\r
    animate();\r
\r
    let resizeTimeout;\r
\r
    const handleResize = () => {\r
      clearTimeout(resizeTimeout);\r
      resizeTimeout = setTimeout(() => {\r
        cancelAnimationFrame(animationRef.current);\r
        resizeCanvas();\r
        animate();\r
      }, 100);\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
\r
    return () => {\r
      cancelAnimationFrame(animationRef.current);\r
      window.removeEventListener('resize', handleResize);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [glitchSpeed, smooth]);\r
\r
  return (\r
    <div className="relative w-full h-full bg-black overflow-hidden">\r
      <canvas ref={canvasRef} className="block w-full h-full" />\r
      {outerVignette && (\r
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"></div>\r
      )}\r
      {centerVignette && (\r
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"></div>\r
      )}\r
    </div>\r
  );\r
};\r
\r
export default LetterGlitch;\r
`,tr=`import { useRef, useEffect } from 'react';\r
\r
const LetterGlitch = ({\r
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],\r
  glitchSpeed = 50,\r
  centerVignette = false,\r
  outerVignette = true,\r
  smooth = true,\r
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'\r
}: {\r
  glitchColors: string[];\r
  glitchSpeed: number;\r
  centerVignette: boolean;\r
  outerVignette: boolean;\r
  smooth: boolean;\r
  characters: string;\r
}) => {\r
  const canvasRef = useRef<HTMLCanvasElement | null>(null);\r
  const animationRef = useRef<number | null>(null);\r
  const letters = useRef<\r
    {\r
      char: string;\r
      color: string;\r
      targetColor: string;\r
      colorProgress: number;\r
    }[]\r
  >([]);\r
  const grid = useRef({ columns: 0, rows: 0 });\r
  const context = useRef<CanvasRenderingContext2D | null>(null);\r
  const lastGlitchTime = useRef(Date.now());\r
\r
  const lettersAndSymbols = Array.from(characters);\r
\r
  const fontSize = 16;\r
  const charWidth = 10;\r
  const charHeight = 20;\r
\r
  const getRandomChar = () => {\r
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];\r
  };\r
\r
  const getRandomColor = () => {\r
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];\r
  };\r
\r
  const hexToRgb = (hex: string) => {\r
    const shorthandRegex = /^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i;\r
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => {\r
      return r + r + g + g + b + b;\r
    });\r
\r
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
    return result\r
      ? {\r
          r: parseInt(result[1], 16),\r
          g: parseInt(result[2], 16),\r
          b: parseInt(result[3], 16)\r
        }\r
      : null;\r
  };\r
\r
  const interpolateColor = (\r
    start: { r: number; g: number; b: number },\r
    end: { r: number; g: number; b: number },\r
    factor: number\r
  ) => {\r
    const result = {\r
      r: Math.round(start.r + (end.r - start.r) * factor),\r
      g: Math.round(start.g + (end.g - start.g) * factor),\r
      b: Math.round(start.b + (end.b - start.b) * factor)\r
    };\r
    return \`rgb(\${result.r}, \${result.g}, \${result.b})\`;\r
  };\r
\r
  const calculateGrid = (width: number, height: number) => {\r
    const columns = Math.ceil(width / charWidth);\r
    const rows = Math.ceil(height / charHeight);\r
    return { columns, rows };\r
  };\r
\r
  const initializeLetters = (columns: number, rows: number) => {\r
    grid.current = { columns, rows };\r
    const totalLetters = columns * rows;\r
    letters.current = Array.from({ length: totalLetters }, () => ({\r
      char: getRandomChar(),\r
      color: getRandomColor(),\r
      targetColor: getRandomColor(),\r
      colorProgress: 1\r
    }));\r
  };\r
\r
  const resizeCanvas = () => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const parent = canvas.parentElement;\r
    if (!parent) return;\r
\r
    const dpr = window.devicePixelRatio || 1;\r
    const rect = parent.getBoundingClientRect();\r
\r
    canvas.width = rect.width * dpr;\r
    canvas.height = rect.height * dpr;\r
\r
    canvas.style.width = \`\${rect.width}px\`;\r
    canvas.style.height = \`\${rect.height}px\`;\r
\r
    if (context.current) {\r
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);\r
    }\r
\r
    const { columns, rows } = calculateGrid(rect.width, rect.height);\r
    initializeLetters(columns, rows);\r
    drawLetters();\r
  };\r
\r
  const drawLetters = () => {\r
    if (!context.current || letters.current.length === 0) return;\r
    const ctx = context.current;\r
    const { width, height } = canvasRef.current!.getBoundingClientRect();\r
    ctx.clearRect(0, 0, width, height);\r
    ctx.font = \`\${fontSize}px monospace\`;\r
    ctx.textBaseline = 'top';\r
\r
    letters.current.forEach((letter, index) => {\r
      const x = (index % grid.current.columns) * charWidth;\r
      const y = Math.floor(index / grid.current.columns) * charHeight;\r
      ctx.fillStyle = letter.color;\r
      ctx.fillText(letter.char, x, y);\r
    });\r
  };\r
\r
  const updateLetters = () => {\r
    if (!letters.current || letters.current.length === 0) return;\r
\r
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));\r
\r
    for (let i = 0; i < updateCount; i++) {\r
      const index = Math.floor(Math.random() * letters.current.length);\r
      if (!letters.current[index]) continue;\r
\r
      letters.current[index].char = getRandomChar();\r
      letters.current[index].targetColor = getRandomColor();\r
\r
      if (!smooth) {\r
        letters.current[index].color = letters.current[index].targetColor;\r
        letters.current[index].colorProgress = 1;\r
      } else {\r
        letters.current[index].colorProgress = 0;\r
      }\r
    }\r
  };\r
\r
  const handleSmoothTransitions = () => {\r
    let needsRedraw = false;\r
    letters.current.forEach(letter => {\r
      if (letter.colorProgress < 1) {\r
        letter.colorProgress += 0.05;\r
        if (letter.colorProgress > 1) letter.colorProgress = 1;\r
\r
        const startRgb = hexToRgb(letter.color);\r
        const endRgb = hexToRgb(letter.targetColor);\r
        if (startRgb && endRgb) {\r
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);\r
          needsRedraw = true;\r
        }\r
      }\r
    });\r
\r
    if (needsRedraw) {\r
      drawLetters();\r
    }\r
  };\r
\r
  const animate = () => {\r
    const now = Date.now();\r
    if (now - lastGlitchTime.current >= glitchSpeed) {\r
      updateLetters();\r
      drawLetters();\r
      lastGlitchTime.current = now;\r
    }\r
\r
    if (smooth) {\r
      handleSmoothTransitions();\r
    }\r
\r
    animationRef.current = requestAnimationFrame(animate);\r
  };\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    context.current = canvas.getContext('2d');\r
    resizeCanvas();\r
    animate();\r
\r
    let resizeTimeout: NodeJS.Timeout;\r
\r
    const handleResize = () => {\r
      clearTimeout(resizeTimeout);\r
      resizeTimeout = setTimeout(() => {\r
        cancelAnimationFrame(animationRef.current as number);\r
        resizeCanvas();\r
        animate();\r
      }, 100);\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
\r
    return () => {\r
      cancelAnimationFrame(animationRef.current!);\r
      window.removeEventListener('resize', handleResize);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [glitchSpeed, smooth]);\r
\r
  const containerStyle = {\r
    position: 'relative',\r
    width: '100%',\r
    height: '100%',\r
    backgroundColor: '#000000',\r
    overflow: 'hidden'\r
  };\r
\r
  const canvasStyle = {\r
    display: 'block',\r
    width: '100%',\r
    height: '100%'\r
  };\r
\r
  const outerVignetteStyle = {\r
    position: 'absolute',\r
    top: 0,\r
    left: 0,\r
    width: '100%',\r
    height: '100%',\r
    pointerEvents: 'none',\r
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)'\r
  };\r
\r
  const centerVignetteStyle = {\r
    position: 'absolute',\r
    top: 0,\r
    left: 0,\r
    width: '100%',\r
    height: '100%',\r
    pointerEvents: 'none',\r
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)'\r
  };\r
\r
  return (\r
    <div style={containerStyle as React.CSSProperties}>\r
      <canvas ref={canvasRef} style={canvasStyle} />\r
      {outerVignette && <div style={outerVignetteStyle as React.CSSProperties}></div>}\r
      {centerVignette && <div style={centerVignetteStyle as React.CSSProperties}></div>}\r
    </div>\r
  );\r
};\r
\r
export default LetterGlitch;\r
`,or=`import { useRef, useEffect } from 'react';\r
\r
const LetterGlitch = ({\r
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],\r
  glitchSpeed = 50,\r
  centerVignette = false,\r
  outerVignette = true,\r
  smooth = true,\r
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'\r
}: {\r
  glitchColors: string[];\r
  glitchSpeed: number;\r
  centerVignette: boolean;\r
  outerVignette: boolean;\r
  smooth: boolean;\r
  characters: string;\r
}) => {\r
  const canvasRef = useRef<HTMLCanvasElement | null>(null);\r
  const animationRef = useRef<number | null>(null);\r
  const letters = useRef<\r
    {\r
      char: string;\r
      color: string;\r
      targetColor: string;\r
      colorProgress: number;\r
    }[]\r
  >([]);\r
  const grid = useRef({ columns: 0, rows: 0 });\r
  const context = useRef<CanvasRenderingContext2D | null>(null);\r
  const lastGlitchTime = useRef(Date.now());\r
\r
  const lettersAndSymbols = Array.from(characters);\r
\r
  const fontSize = 16;\r
  const charWidth = 10;\r
  const charHeight = 20;\r
\r
  const getRandomChar = () => {\r
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];\r
  };\r
\r
  const getRandomColor = () => {\r
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];\r
  };\r
\r
  const hexToRgb = (hex: string) => {\r
    const shorthandRegex = /^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i;\r
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => {\r
      return r + r + g + g + b + b;\r
    });\r
\r
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);\r
    return result\r
      ? {\r
          r: parseInt(result[1], 16),\r
          g: parseInt(result[2], 16),\r
          b: parseInt(result[3], 16)\r
        }\r
      : null;\r
  };\r
\r
  const interpolateColor = (\r
    start: { r: number; g: number; b: number },\r
    end: { r: number; g: number; b: number },\r
    factor: number\r
  ) => {\r
    const result = {\r
      r: Math.round(start.r + (end.r - start.r) * factor),\r
      g: Math.round(start.g + (end.g - start.g) * factor),\r
      b: Math.round(start.b + (end.b - start.b) * factor)\r
    };\r
    return \`rgb(\${result.r}, \${result.g}, \${result.b})\`;\r
  };\r
\r
  const calculateGrid = (width: number, height: number) => {\r
    const columns = Math.ceil(width / charWidth);\r
    const rows = Math.ceil(height / charHeight);\r
    return { columns, rows };\r
  };\r
\r
  const initializeLetters = (columns: number, rows: number) => {\r
    grid.current = { columns, rows };\r
    const totalLetters = columns * rows;\r
    letters.current = Array.from({ length: totalLetters }, () => ({\r
      char: getRandomChar(),\r
      color: getRandomColor(),\r
      targetColor: getRandomColor(),\r
      colorProgress: 1\r
    }));\r
  };\r
\r
  const resizeCanvas = () => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const parent = canvas.parentElement;\r
    if (!parent) return;\r
\r
    const dpr = window.devicePixelRatio || 1;\r
    const rect = parent.getBoundingClientRect();\r
\r
    canvas.width = rect.width * dpr;\r
    canvas.height = rect.height * dpr;\r
\r
    canvas.style.width = \`\${rect.width}px\`;\r
    canvas.style.height = \`\${rect.height}px\`;\r
\r
    if (context.current) {\r
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);\r
    }\r
\r
    const { columns, rows } = calculateGrid(rect.width, rect.height);\r
    initializeLetters(columns, rows);\r
    drawLetters();\r
  };\r
\r
  const drawLetters = () => {\r
    if (!context.current || letters.current.length === 0) return;\r
    const ctx = context.current;\r
    const { width, height } = canvasRef.current!.getBoundingClientRect();\r
    ctx.clearRect(0, 0, width, height);\r
    ctx.font = \`\${fontSize}px monospace\`;\r
    ctx.textBaseline = 'top';\r
\r
    letters.current.forEach((letter, index) => {\r
      const x = (index % grid.current.columns) * charWidth;\r
      const y = Math.floor(index / grid.current.columns) * charHeight;\r
      ctx.fillStyle = letter.color;\r
      ctx.fillText(letter.char, x, y);\r
    });\r
  };\r
\r
  const updateLetters = () => {\r
    if (!letters.current || letters.current.length === 0) return;\r
\r
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));\r
\r
    for (let i = 0; i < updateCount; i++) {\r
      const index = Math.floor(Math.random() * letters.current.length);\r
      if (!letters.current[index]) continue;\r
\r
      letters.current[index].char = getRandomChar();\r
      letters.current[index].targetColor = getRandomColor();\r
\r
      if (!smooth) {\r
        letters.current[index].color = letters.current[index].targetColor;\r
        letters.current[index].colorProgress = 1;\r
      } else {\r
        letters.current[index].colorProgress = 0;\r
      }\r
    }\r
  };\r
\r
  const handleSmoothTransitions = () => {\r
    let needsRedraw = false;\r
    letters.current.forEach(letter => {\r
      if (letter.colorProgress < 1) {\r
        letter.colorProgress += 0.05;\r
        if (letter.colorProgress > 1) letter.colorProgress = 1;\r
\r
        const startRgb = hexToRgb(letter.color);\r
        const endRgb = hexToRgb(letter.targetColor);\r
        if (startRgb && endRgb) {\r
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);\r
          needsRedraw = true;\r
        }\r
      }\r
    });\r
\r
    if (needsRedraw) {\r
      drawLetters();\r
    }\r
  };\r
\r
  const animate = () => {\r
    const now = Date.now();\r
    if (now - lastGlitchTime.current >= glitchSpeed) {\r
      updateLetters();\r
      drawLetters();\r
      lastGlitchTime.current = now;\r
    }\r
\r
    if (smooth) {\r
      handleSmoothTransitions();\r
    }\r
\r
    animationRef.current = requestAnimationFrame(animate);\r
  };\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    context.current = canvas.getContext('2d');\r
    resizeCanvas();\r
    animate();\r
\r
    let resizeTimeout: NodeJS.Timeout;\r
\r
    const handleResize = () => {\r
      clearTimeout(resizeTimeout);\r
      resizeTimeout = setTimeout(() => {\r
        cancelAnimationFrame(animationRef.current as number);\r
        resizeCanvas();\r
        animate();\r
      }, 100);\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
\r
    return () => {\r
      cancelAnimationFrame(animationRef.current!);\r
      window.removeEventListener('resize', handleResize);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [glitchSpeed, smooth]);\r
\r
  return (\r
    <div className="relative w-full h-full bg-black overflow-hidden">\r
      <canvas ref={canvasRef} className="block w-full h-full" />\r
      {outerVignette && (\r
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"></div>\r
      )}\r
      {centerVignette && (\r
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"></div>\r
      )}\r
    </div>\r
  );\r
};\r
\r
export default LetterGlitch;\r
`,sr={usage:`import LetterGlitch from './LetterGlitch';
  
<LetterGlitch
  glitchSpeed={50}
  centerVignette={true}
  outerVignette={false}
  smooth={true}
/>`,code:nr,tailwind:er,tsCode:tr,tsTailwind:or},fr=()=>{const[g,w]=a.useState(!0),[f,v]=a.useState(10),[C,m]=a.useState(["#2b4539","#61dca3","#61b3dc"]),[b,u]=a.useState(!0),[d,s]=a.useState(!1),[x,c]=Z(),p=[{name:"glitchColors",type:"string[]",default:"['#2b4539', '#61dca3', '#61b3dc']",description:"Controls the colors of the letters rendered in the canvas."},{name:"glitchSpeed",type:"number",default:"50",description:"Controls the speed at which letters scramble in the animation."},{name:"centerVignette",type:"boolean",default:"false",description:"When true, renders a radial gradient in the center of the container"},{name:"outerVignette",type:"boolean",default:"true",description:"When true, renders an inner radial gradient around the edges of the container."},{name:"smooth",type:"boolean",default:"true",description:"When true, smoothens the animation of the letters for a more subtle feel."},{name:"characters",type:"string",default:"ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",description:"String of characters to render in the canvas."}];return o.jsxs(O,{children:[o.jsxs(J,{children:[o.jsxs(D,{position:"relative",className:"demo-container",h:600,overflow:"hidden",p:0,children:[o.jsx(rr,{glitchColors:C,glitchSpeed:f,centerVignette:b,outerVignette:d,smooth:g},x),o.jsx(q,{pillText:"New Background",headline:"Am I finally a real hacker now, mom?"})]}),o.jsxs(X,{children:[o.jsx(N,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:8,onClick:()=>{m([M(),M(),M()]),c()},children:"Randomize Colors"}),o.jsx(Y,{min:0,max:100,title:"Glitch Speed",step:5,value:f,onChange:i=>{v(i)}}),o.jsx(L,{title:"Smooth Animation",isChecked:g,onChange:i=>{w(i),c()}}),o.jsx(L,{title:"Show Center Vignette",isChecked:b,onChange:i=>{u(i),c()}}),o.jsx(L,{title:"Show Outer Vignette",isChecked:d,onChange:i=>{s(i),c()}})]}),o.jsx(K,{data:p})]}),o.jsx(Q,{children:o.jsx(U,{codeObject:sr})})]})};export{fr as default};
