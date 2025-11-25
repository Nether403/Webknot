import{r as s,j as e,B as x,T as R}from"./index-wsKSLPNH.js";import{T as I,P as y,a as b,C as A,b as D}from"./PropTable-C4uPWs8h.js";import{R as N}from"./RefreshButton-CA3SFRlq.js";import{u as E}from"./useForceRerender-BCFU-k0M.js";import{P as u}from"./PreviewSlider-m1G_aiYP.js";import{C}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";const j=({patternSize:p=250,patternScaleX:h=1,patternScaleY:m=1,patternRefreshInterval:d=2,patternAlpha:o=15})=>{const f=s.useRef(null);return s.useEffect(()=>{const a=f.current;if(!a)return;const c=a.getContext("2d",{alpha:!0});if(!c)return;let v=0,t;const n=1024,r=()=>{a&&(a.width=n,a.height=n,a.style.width="100vw",a.style.height="100vh")},z=()=>{const S=c.createImageData(n,n),l=S.data;for(let i=0;i<l.length;i+=4){const g=Math.random()*255;l[i]=g,l[i+1]=g,l[i+2]=g,l[i+3]=o}c.putImageData(S,0,0)},w=()=>{v%d===0&&z(),v++,t=window.requestAnimationFrame(w)};return window.addEventListener("resize",r),r(),w(),()=>{window.removeEventListener("resize",r),window.cancelAnimationFrame(t)}},[p,h,m,d,o]),e.jsx("canvas",{className:"noise-overlay",ref:f,style:{imageRendering:"pixelated"}})},X=`import { useRef, useEffect } from 'react';\r
import './Noise.css';\r
\r
const Noise = ({\r
  patternSize = 250,\r
  patternScaleX = 1,\r
  patternScaleY = 1,\r
  patternRefreshInterval = 2,\r
  patternAlpha = 15\r
}) => {\r
  const grainRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = grainRef.current;\r
    if (!canvas) return;\r
\r
    const ctx = canvas.getContext('2d', { alpha: true });\r
    if (!ctx) return;\r
\r
    let frame = 0;\r
    let animationId;\r
    const canvasSize = 1024;\r
\r
    const resize = () => {\r
      if (!canvas) return;\r
      canvas.width = canvasSize;\r
      canvas.height = canvasSize;\r
\r
      canvas.style.width = '100vw';\r
      canvas.style.height = '100vh';\r
    };\r
\r
    const drawGrain = () => {\r
      const imageData = ctx.createImageData(canvasSize, canvasSize);\r
      const data = imageData.data;\r
\r
      for (let i = 0; i < data.length; i += 4) {\r
        const value = Math.random() * 255;\r
        data[i] = value;\r
        data[i + 1] = value;\r
        data[i + 2] = value;\r
        data[i + 3] = patternAlpha;\r
      }\r
\r
      ctx.putImageData(imageData, 0, 0);\r
    };\r
\r
    const loop = () => {\r
      if (frame % patternRefreshInterval === 0) {\r
        drawGrain();\r
      }\r
      frame++;\r
      animationId = window.requestAnimationFrame(loop);\r
    };\r
\r
    window.addEventListener('resize', resize);\r
    resize();\r
    loop();\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      window.cancelAnimationFrame(animationId);\r
    };\r
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);\r
\r
  return <canvas className="noise-overlay" ref={grainRef} style={{ imageRendering: 'pixelated' }} />;\r
};\r
\r
export default Noise;\r
`,Y=`.noise-overlay {\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  width: 100vw;\r
  height: 100vh;\r
  pointer-events: none;\r
}\r
`,P=`import { useRef, useEffect } from 'react';\r
\r
const Noise = ({\r
  patternSize = 250,\r
  patternScaleX = 1,\r
  patternScaleY = 1,\r
  patternRefreshInterval = 2,\r
  patternAlpha = 15\r
}) => {\r
  const grainRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = grainRef.current;\r
    if (!canvas) return;\r
\r
    const ctx = canvas.getContext('2d', { alpha: true });\r
    if (!ctx) return;\r
\r
    let frame = 0;\r
    let animationId;\r
    const canvasSize = 1024;\r
\r
    const resize = () => {\r
      if (!canvas) return;\r
      canvas.width = canvasSize;\r
      canvas.height = canvasSize;\r
\r
      canvas.style.width = '100vw';\r
      canvas.style.height = '100vh';\r
    };\r
\r
    const drawGrain = () => {\r
      const imageData = ctx.createImageData(canvasSize, canvasSize);\r
      const data = imageData.data;\r
\r
      for (let i = 0; i < data.length; i += 4) {\r
        const value = Math.random() * 255;\r
        data[i] = value;\r
        data[i + 1] = value;\r
        data[i + 2] = value;\r
        data[i + 3] = patternAlpha;\r
      }\r
\r
      ctx.putImageData(imageData, 0, 0);\r
    };\r
\r
    const loop = () => {\r
      if (frame % patternRefreshInterval === 0) {\r
        drawGrain();\r
      }\r
      frame++;\r
      animationId = window.requestAnimationFrame(loop);\r
    };\r
\r
    window.addEventListener('resize', resize);\r
    resize();\r
    loop();\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      window.cancelAnimationFrame(animationId);\r
    };\r
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);\r
\r
  return (\r
    <canvas\r
      className="pointer-events-none absolute inset-0 w-full h-full"\r
      ref={grainRef}\r
      style={{ imageRendering: 'pixelated' }}\r
    />\r
  );\r
};\r
\r
export default Noise;\r
`,F=`import type React from 'react';\r
import { useRef, useEffect } from 'react';\r
import './Noise.css';\r
\r
interface NoiseProps {\r
  patternSize?: number;\r
  patternScaleX?: number;\r
  patternScaleY?: number;\r
  patternRefreshInterval?: number;\r
  patternAlpha?: number;\r
}\r
\r
const Noise: React.FC<NoiseProps> = ({\r
  patternSize = 250,\r
  patternScaleX = 1,\r
  patternScaleY = 1,\r
  patternRefreshInterval = 2,\r
  patternAlpha = 15\r
}) => {\r
  const grainRef = useRef<HTMLCanvasElement | null>(null);\r
\r
  useEffect(() => {\r
    const canvas = grainRef.current;\r
    if (!canvas) return;\r
\r
    const ctx = canvas.getContext('2d', { alpha: true });\r
    if (!ctx) return;\r
\r
    let frame = 0;\r
    let animationId: number;\r
    const canvasSize = 1024;\r
\r
    const resize = () => {\r
      if (!canvas) return;\r
      canvas.width = canvasSize;\r
      canvas.height = canvasSize;\r
\r
      canvas.style.width = '100vw';\r
      canvas.style.height = '100vh';\r
    };\r
\r
    const drawGrain = () => {\r
      const imageData = ctx.createImageData(canvasSize, canvasSize);\r
      const data = imageData.data;\r
\r
      for (let i = 0; i < data.length; i += 4) {\r
        const value = Math.random() * 255;\r
        data[i] = value;\r
        data[i + 1] = value;\r
        data[i + 2] = value;\r
        data[i + 3] = patternAlpha;\r
      }\r
\r
      ctx.putImageData(imageData, 0, 0);\r
    };\r
\r
    const loop = () => {\r
      if (frame % patternRefreshInterval === 0) {\r
        drawGrain();\r
      }\r
      frame++;\r
      animationId = window.requestAnimationFrame(loop);\r
    };\r
\r
    window.addEventListener('resize', resize);\r
    resize();\r
    loop();\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      window.cancelAnimationFrame(animationId);\r
    };\r
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);\r
\r
  return <canvas className="noise-overlay" ref={grainRef} style={{ imageRendering: 'pixelated' }} />;\r
};\r
\r
export default Noise;\r
`,L=`import React, { useRef, useEffect } from 'react';\r
\r
interface NoiseProps {\r
  patternSize?: number;\r
  patternScaleX?: number;\r
  patternScaleY?: number;\r
  patternRefreshInterval?: number;\r
  patternAlpha?: number;\r
}\r
\r
const Noise: React.FC<NoiseProps> = ({\r
  patternSize = 250,\r
  patternScaleX = 1,\r
  patternScaleY = 1,\r
  patternRefreshInterval = 2,\r
  patternAlpha = 15\r
}) => {\r
  const grainRef = useRef<HTMLCanvasElement | null>(null);\r
\r
  useEffect(() => {\r
    const canvas = grainRef.current;\r
    if (!canvas) return;\r
\r
    const ctx = canvas.getContext('2d', { alpha: true });\r
    if (!ctx) return;\r
\r
    let frame = 0;\r
    let animationId: number;\r
\r
    const canvasSize = 1024;\r
\r
    const resize = () => {\r
      if (!canvas) return;\r
      canvas.width = canvasSize;\r
      canvas.height = canvasSize;\r
\r
      canvas.style.width = '100vw';\r
      canvas.style.height = '100vh';\r
    };\r
\r
    const drawGrain = () => {\r
      const imageData = ctx.createImageData(canvasSize, canvasSize);\r
      const data = imageData.data;\r
\r
      for (let i = 0; i < data.length; i += 4) {\r
        const value = Math.random() * 255;\r
        data[i] = value;\r
        data[i + 1] = value;\r
        data[i + 2] = value;\r
        data[i + 3] = patternAlpha;\r
      }\r
\r
      ctx.putImageData(imageData, 0, 0);\r
    };\r
\r
    const loop = () => {\r
      if (frame % patternRefreshInterval === 0) {\r
        drawGrain();\r
      }\r
      frame++;\r
      animationId = window.requestAnimationFrame(loop);\r
    };\r
\r
    window.addEventListener('resize', resize);\r
    resize();\r
    loop();\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      window.cancelAnimationFrame(animationId);\r
    };\r
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);\r
\r
  return (\r
    <canvas\r
      className="pointer-events-none absolute top-0 left-0 h-screen w-screen"\r
      ref={grainRef}\r
      style={{\r
        imageRendering: 'pixelated'\r
      }}\r
    />\r
  );\r
};\r
\r
export default Noise;\r
`,T={usage:`import Noise from './Noise;'

<div style={{width: '600px', height: '400px', position: 'relative', overflow: 'hidden'}}>
  <Noise
    patternSize={250}
    patternScaleX={1}
    patternScaleY={1}
    patternRefreshInterval={2}
    patternAlpha={15}
  />
</div>`,code:X,css:Y,tailwind:P,tsCode:F,tsTailwind:L},U=()=>{const[p,h]=s.useState(250),[m,d]=s.useState(2),[o,f]=s.useState(2),[a,c]=s.useState(15),[v,t]=E(),n=[{name:"patternSize",type:"number",default:250,description:"Defines the size of the grain pattern."},{name:"patternScaleX",type:"number",default:1,description:"Scaling factor for the X-axis of the grain pattern."},{name:"patternScaleY",type:"number",default:1,description:"Scaling factor for the Y-axis of the grain pattern."},{name:"patternRefreshInterval",type:"number",default:2,description:"Number of frames before the grain pattern refreshes."},{name:"patternAlpha",type:"number",default:15,description:"Opacity of the grain pattern (0-255)."}];return e.jsxs(I,{children:[e.jsxs(y,{children:[e.jsxs(x,{position:"relative",className:"demo-container",background:"#060010",minH:400,overflow:"hidden",children:[e.jsx(R,{color:"#271E37",fontSize:"6rem",fontWeight:900,textAlign:"center",children:"Ooh, edgy!"}),e.jsx(j,{patternSize:p,patternScaleX:m,patternScaleY:o,patternAlpha:a},v),e.jsx(N,{onClick:t})]}),e.jsxs(C,{children:[e.jsx(u,{title:"Pattern Size",min:50,max:500,step:10,value:p,valueUnit:"px",onChange:r=>{h(r),t()}}),e.jsx(u,{title:"Scale X",min:.1,max:5,step:.1,value:m,onChange:r=>{d(r),t()}}),e.jsx(u,{title:"Scale Y",min:.1,max:5,step:.1,value:o,onChange:r=>{f(r),t()}}),e.jsx(u,{title:"Pattern Alpha",min:0,max:25,step:5,value:a,onChange:r=>{c(r),t()}})]}),e.jsx(b,{data:n})]}),e.jsx(A,{children:e.jsx(D,{codeObject:T})})]})};export{U as default};
