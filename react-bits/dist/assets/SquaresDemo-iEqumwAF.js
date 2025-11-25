import{r as i,j as r,B as L,T as w,a as m,F as Y,d as k}from"./index-wsKSLPNH.js";import{T as A,P as j,a as G,C as D,b as B}from"./PropTable-C4uPWs8h.js";import{C as P}from"./Customize-1m_ZNqR9.js";import{P as F}from"./PreviewSlider-m1G_aiYP.js";import{B as T}from"./BackgroundContent-CqU7Wlm2.js";import{B as H}from"./button-group-B9LcRyTY.js";import"./index-Bpz4cGEA.js";import"./PreviewSwitch-DqnF708j.js";const N=({direction:s="right",speed:c=1,borderColor:l="#999",squareSize:e=40,hoverFillColor:v="#222",className:R=""})=>{const h=i.useRef(null),S=i.useRef(null),x=i.useRef(),y=i.useRef(),a=i.useRef({x:0,y:0}),n=i.useRef(null);return i.useEffect(()=>{const t=h.current,u=t.getContext("2d"),C=()=>{t.width=t.offsetWidth,t.height=t.offsetHeight,x.current=Math.ceil(t.width/e)+1,y.current=Math.ceil(t.height/e)+1};window.addEventListener("resize",C),C();const E=()=>{u.clearRect(0,0,t.width,t.height);const o=Math.floor(a.current.x/e)*e,q=Math.floor(a.current.y/e)*e;for(let f=o;f<t.width+e;f+=e)for(let d=q;d<t.height+e;d+=e){const p=f-a.current.x%e,g=d-a.current.y%e;n.current&&Math.floor((f-o)/e)===n.current.x&&Math.floor((d-q)/e)===n.current.y&&(u.fillStyle=v,u.fillRect(p,g,e,e)),u.strokeStyle=l,u.strokeRect(p,g,e,e)}const z=u.createRadialGradient(t.width/2,t.height/2,0,t.width/2,t.height/2,Math.sqrt(t.width**2+t.height**2)/2);z.addColorStop(0,"rgba(0, 0, 0, 0)"),u.fillStyle=z,u.fillRect(0,0,t.width,t.height)},M=()=>{const o=Math.max(c,.1);switch(s){case"right":a.current.x=(a.current.x-o+e)%e;break;case"left":a.current.x=(a.current.x+o+e)%e;break;case"up":a.current.y=(a.current.y+o+e)%e;break;case"down":a.current.y=(a.current.y-o+e)%e;break;case"diagonal":a.current.x=(a.current.x-o+e)%e,a.current.y=(a.current.y-o+e)%e;break}E(),S.current=requestAnimationFrame(M)},O=o=>{const q=t.getBoundingClientRect(),z=o.clientX-q.left,f=o.clientY-q.top,d=Math.floor(a.current.x/e)*e,p=Math.floor(a.current.y/e)*e,g=Math.floor((z+a.current.x-d)/e),X=Math.floor((f+a.current.y-p)/e);(!n.current||n.current.x!==g||n.current.y!==X)&&(n.current={x:g,y:X})},b=()=>{n.current=null};return t.addEventListener("mousemove",O),t.addEventListener("mouseleave",b),S.current=requestAnimationFrame(M),()=>{window.removeEventListener("resize",C),cancelAnimationFrame(S.current),t.removeEventListener("mousemove",O),t.removeEventListener("mouseleave",b)}},[s,c,l,v,e]),r.jsx("canvas",{ref:h,className:`squares-canvas ${R}`})},$=`import { useRef, useEffect } from 'react';\r
import './Squares.css';\r
\r
const Squares = ({\r
  direction = 'right',\r
  speed = 1,\r
  borderColor = '#999',\r
  squareSize = 40,\r
  hoverFillColor = '#222',\r
  className = ''\r
}) => {\r
  const canvasRef = useRef(null);\r
  const requestRef = useRef(null);\r
  const numSquaresX = useRef();\r
  const numSquaresY = useRef();\r
  const gridOffset = useRef({ x: 0, y: 0 });\r
  const hoveredSquare = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    const ctx = canvas.getContext('2d');\r
\r
    const resizeCanvas = () => {\r
      canvas.width = canvas.offsetWidth;\r
      canvas.height = canvas.offsetHeight;\r
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;\r
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;\r
    };\r
\r
    window.addEventListener('resize', resizeCanvas);\r
    resizeCanvas();\r
\r
    const drawGrid = () => {\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;\r
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;\r
\r
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {\r
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {\r
          const squareX = x - (gridOffset.current.x % squareSize);\r
          const squareY = y - (gridOffset.current.y % squareSize);\r
\r
          if (\r
            hoveredSquare.current &&\r
            Math.floor((x - startX) / squareSize) === hoveredSquare.current.x &&\r
            Math.floor((y - startY) / squareSize) === hoveredSquare.current.y\r
          ) {\r
            ctx.fillStyle = hoverFillColor;\r
            ctx.fillRect(squareX, squareY, squareSize, squareSize);\r
          }\r
\r
          ctx.strokeStyle = borderColor;\r
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);\r
        }\r
      }\r
\r
      const gradient = ctx.createRadialGradient(\r
        canvas.width / 2,\r
        canvas.height / 2,\r
        0,\r
        canvas.width / 2,\r
        canvas.height / 2,\r
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2\r
      );\r
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');\r
\r
      ctx.fillStyle = gradient;\r
      ctx.fillRect(0, 0, canvas.width, canvas.height);\r
    };\r
\r
    const updateAnimation = () => {\r
      const effectiveSpeed = Math.max(speed, 0.1);\r
      switch (direction) {\r
        case 'right':\r
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'left':\r
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'up':\r
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'down':\r
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'diagonal':\r
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;\r
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        default:\r
          break;\r
      }\r
\r
      drawGrid();\r
      requestRef.current = requestAnimationFrame(updateAnimation);\r
    };\r
\r
    const handleMouseMove = event => {\r
      const rect = canvas.getBoundingClientRect();\r
      const mouseX = event.clientX - rect.left;\r
      const mouseY = event.clientY - rect.top;\r
\r
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;\r
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;\r
\r
      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);\r
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);\r
\r
      if (\r
        !hoveredSquare.current ||\r
        hoveredSquare.current.x !== hoveredSquareX ||\r
        hoveredSquare.current.y !== hoveredSquareY\r
      ) {\r
        hoveredSquare.current = { x: hoveredSquareX, y: hoveredSquareY };\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      hoveredSquare.current = null;\r
    };\r
\r
    canvas.addEventListener('mousemove', handleMouseMove);\r
    canvas.addEventListener('mouseleave', handleMouseLeave);\r
\r
    requestRef.current = requestAnimationFrame(updateAnimation);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
      cancelAnimationFrame(requestRef.current);\r
      canvas.removeEventListener('mousemove', handleMouseMove);\r
      canvas.removeEventListener('mouseleave', handleMouseLeave);\r
    };\r
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);\r
\r
  return <canvas ref={canvasRef} className={\`squares-canvas \${className}\`}></canvas>;\r
};\r
\r
export default Squares;\r
`,W=`.squares-canvas {\r
  width: 100%;\r
  height: 100%;\r
  border: none;\r
  display: block;\r
}\r
`,_=`import { useRef, useEffect } from 'react';\r
\r
const Squares = ({\r
  direction = 'right',\r
  speed = 1,\r
  borderColor = '#999',\r
  squareSize = 40,\r
  hoverFillColor = '#222'\r
}) => {\r
  const canvasRef = useRef(null);\r
  const requestRef = useRef(null);\r
  const numSquaresX = useRef(0);\r
  const numSquaresY = useRef(0);\r
  const gridOffset = useRef({ x: 0, y: 0 });\r
  const hoveredSquareRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const ctx = canvas.getContext('2d');\r
\r
    const resizeCanvas = () => {\r
      canvas.width = canvas.offsetWidth;\r
      canvas.height = canvas.offsetHeight;\r
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;\r
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;\r
    };\r
\r
    window.addEventListener('resize', resizeCanvas);\r
    resizeCanvas();\r
\r
    const drawGrid = () => {\r
      if (!ctx) return;\r
\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;\r
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;\r
\r
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {\r
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {\r
          const squareX = x - (gridOffset.current.x % squareSize);\r
          const squareY = y - (gridOffset.current.y % squareSize);\r
\r
          if (\r
            hoveredSquareRef.current &&\r
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&\r
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y\r
          ) {\r
            ctx.fillStyle = hoverFillColor;\r
            ctx.fillRect(squareX, squareY, squareSize, squareSize);\r
          }\r
\r
          ctx.strokeStyle = borderColor;\r
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);\r
        }\r
      }\r
\r
      const gradient = ctx.createRadialGradient(\r
        canvas.width / 2,\r
        canvas.height / 2,\r
        0,\r
        canvas.width / 2,\r
        canvas.height / 2,\r
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2\r
      );\r
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');\r
      gradient.addColorStop(1, '#060010');\r
\r
      ctx.fillStyle = gradient;\r
      ctx.fillRect(0, 0, canvas.width, canvas.height);\r
    };\r
\r
    const updateAnimation = () => {\r
      const effectiveSpeed = Math.max(speed, 0.1);\r
      switch (direction) {\r
        case 'right':\r
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'left':\r
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'up':\r
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'down':\r
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'diagonal':\r
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;\r
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        default:\r
          break;\r
      }\r
\r
      drawGrid();\r
      requestRef.current = requestAnimationFrame(updateAnimation);\r
    };\r
\r
    const handleMouseMove = event => {\r
      const rect = canvas.getBoundingClientRect();\r
      const mouseX = event.clientX - rect.left;\r
      const mouseY = event.clientY - rect.top;\r
\r
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;\r
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;\r
\r
      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);\r
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);\r
\r
      if (\r
        !hoveredSquareRef.current ||\r
        hoveredSquareRef.current.x !== hoveredSquareX ||\r
        hoveredSquareRef.current.y !== hoveredSquareY\r
      ) {\r
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      hoveredSquareRef.current = null;\r
    };\r
\r
    canvas.addEventListener('mousemove', handleMouseMove);\r
    canvas.addEventListener('mouseleave', handleMouseLeave);\r
    requestRef.current = requestAnimationFrame(updateAnimation);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
      if (requestRef.current) cancelAnimationFrame(requestRef.current);\r
      canvas.removeEventListener('mousemove', handleMouseMove);\r
      canvas.removeEventListener('mouseleave', handleMouseLeave);\r
    };\r
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);\r
\r
  return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;\r
};\r
\r
export default Squares;\r
`,I=`import React, { useRef, useEffect } from 'react';\r
import './Squares.css';\r
\r
type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;\r
\r
interface GridOffset {\r
  x: number;\r
  y: number;\r
}\r
\r
interface SquaresProps {\r
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';\r
  speed?: number;\r
  borderColor?: CanvasStrokeStyle;\r
  squareSize?: number;\r
  hoverFillColor?: CanvasStrokeStyle;\r
}\r
\r
const Squares: React.FC<SquaresProps> = ({\r
  direction = 'right',\r
  speed = 1,\r
  borderColor = '#999',\r
  squareSize = 40,\r
  hoverFillColor = '#222'\r
}) => {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const requestRef = useRef<number | null>(null);\r
  const numSquaresX = useRef<number>(0);\r
  const numSquaresY = useRef<number>(0);\r
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });\r
  const hoveredSquareRef = useRef<GridOffset | null>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const ctx = canvas.getContext('2d');\r
\r
    const resizeCanvas = () => {\r
      canvas.width = canvas.offsetWidth;\r
      canvas.height = canvas.offsetHeight;\r
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;\r
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;\r
    };\r
\r
    window.addEventListener('resize', resizeCanvas);\r
    resizeCanvas();\r
\r
    const drawGrid = () => {\r
      if (!ctx) return;\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;\r
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;\r
\r
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {\r
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {\r
          const squareX = x - (gridOffset.current.x % squareSize);\r
          const squareY = y - (gridOffset.current.y % squareSize);\r
\r
          if (\r
            hoveredSquareRef.current &&\r
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&\r
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y\r
          ) {\r
            ctx.fillStyle = hoverFillColor;\r
            ctx.fillRect(squareX, squareY, squareSize, squareSize);\r
          }\r
\r
          ctx.strokeStyle = borderColor;\r
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);\r
        }\r
      }\r
\r
      const gradient = ctx.createRadialGradient(\r
        canvas.width / 2,\r
        canvas.height / 2,\r
        0,\r
        canvas.width / 2,\r
        canvas.height / 2,\r
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2\r
      );\r
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');\r
      gradient.addColorStop(1, '#060010');\r
\r
      ctx.fillStyle = gradient;\r
      ctx.fillRect(0, 0, canvas.width, canvas.height);\r
    };\r
\r
    const updateAnimation = () => {\r
      const effectiveSpeed = Math.max(speed, 0.1);\r
      switch (direction) {\r
        case 'right':\r
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'left':\r
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'up':\r
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'down':\r
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'diagonal':\r
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;\r
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        default:\r
          break;\r
      }\r
\r
      drawGrid();\r
      requestRef.current = requestAnimationFrame(updateAnimation);\r
    };\r
\r
    const handleMouseMove = (event: MouseEvent) => {\r
      const rect = canvas.getBoundingClientRect();\r
      const mouseX = event.clientX - rect.left;\r
      const mouseY = event.clientY - rect.top;\r
\r
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;\r
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;\r
\r
      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);\r
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);\r
\r
      if (\r
        !hoveredSquareRef.current ||\r
        hoveredSquareRef.current.x !== hoveredSquareX ||\r
        hoveredSquareRef.current.y !== hoveredSquareY\r
      ) {\r
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      hoveredSquareRef.current = null;\r
    };\r
\r
    canvas.addEventListener('mousemove', handleMouseMove);\r
    canvas.addEventListener('mouseleave', handleMouseLeave);\r
    requestRef.current = requestAnimationFrame(updateAnimation);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
      if (requestRef.current) cancelAnimationFrame(requestRef.current);\r
      canvas.removeEventListener('mousemove', handleMouseMove);\r
      canvas.removeEventListener('mouseleave', handleMouseLeave);\r
    };\r
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);\r
\r
  return <canvas ref={canvasRef} className="squares-canvas"></canvas>;\r
};\r
\r
export default Squares;\r
`,U=`import React, { useRef, useEffect } from 'react';\r
\r
type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;\r
\r
interface GridOffset {\r
  x: number;\r
  y: number;\r
}\r
\r
interface SquaresProps {\r
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';\r
  speed?: number;\r
  borderColor?: CanvasStrokeStyle;\r
  squareSize?: number;\r
  hoverFillColor?: CanvasStrokeStyle;\r
}\r
\r
const Squares: React.FC<SquaresProps> = ({\r
  direction = 'right',\r
  speed = 1,\r
  borderColor = '#999',\r
  squareSize = 40,\r
  hoverFillColor = '#222'\r
}) => {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const requestRef = useRef<number | null>(null);\r
  const numSquaresX = useRef<number>(0);\r
  const numSquaresY = useRef<number>(0);\r
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });\r
  const hoveredSquareRef = useRef<GridOffset | null>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const ctx = canvas.getContext('2d');\r
\r
    const resizeCanvas = () => {\r
      canvas.width = canvas.offsetWidth;\r
      canvas.height = canvas.offsetHeight;\r
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;\r
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;\r
    };\r
\r
    window.addEventListener('resize', resizeCanvas);\r
    resizeCanvas();\r
\r
    const drawGrid = () => {\r
      if (!ctx) return;\r
\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;\r
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;\r
\r
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {\r
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {\r
          const squareX = x - (gridOffset.current.x % squareSize);\r
          const squareY = y - (gridOffset.current.y % squareSize);\r
\r
          if (\r
            hoveredSquareRef.current &&\r
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&\r
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y\r
          ) {\r
            ctx.fillStyle = hoverFillColor;\r
            ctx.fillRect(squareX, squareY, squareSize, squareSize);\r
          }\r
\r
          ctx.strokeStyle = borderColor;\r
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);\r
        }\r
      }\r
\r
      const gradient = ctx.createRadialGradient(\r
        canvas.width / 2,\r
        canvas.height / 2,\r
        0,\r
        canvas.width / 2,\r
        canvas.height / 2,\r
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2\r
      );\r
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');\r
      gradient.addColorStop(1, '#060010');\r
\r
      ctx.fillStyle = gradient;\r
      ctx.fillRect(0, 0, canvas.width, canvas.height);\r
    };\r
\r
    const updateAnimation = () => {\r
      const effectiveSpeed = Math.max(speed, 0.1);\r
      switch (direction) {\r
        case 'right':\r
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'left':\r
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'up':\r
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'down':\r
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        case 'diagonal':\r
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;\r
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;\r
          break;\r
        default:\r
          break;\r
      }\r
\r
      drawGrid();\r
      requestRef.current = requestAnimationFrame(updateAnimation);\r
    };\r
\r
    const handleMouseMove = (event: MouseEvent) => {\r
      const rect = canvas.getBoundingClientRect();\r
      const mouseX = event.clientX - rect.left;\r
      const mouseY = event.clientY - rect.top;\r
\r
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;\r
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;\r
\r
      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);\r
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);\r
\r
      if (\r
        !hoveredSquareRef.current ||\r
        hoveredSquareRef.current.x !== hoveredSquareX ||\r
        hoveredSquareRef.current.y !== hoveredSquareY\r
      ) {\r
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      hoveredSquareRef.current = null;\r
    };\r
\r
    canvas.addEventListener('mousemove', handleMouseMove);\r
    canvas.addEventListener('mouseleave', handleMouseLeave);\r
    requestRef.current = requestAnimationFrame(updateAnimation);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
      if (requestRef.current) cancelAnimationFrame(requestRef.current);\r
      canvas.removeEventListener('mousemove', handleMouseMove);\r
      canvas.removeEventListener('mouseleave', handleMouseLeave);\r
    };\r
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);\r
\r
  return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;\r
};\r
\r
export default Squares;\r
`,J={usage:`import Squares from './Squares';
  
<Squares 
speed={0.5} 
squareSize={40}
direction='diagonal' // up, down, left, right, diagonal
borderColor='#fff'
hoverFillColor='#222'
/>`,code:$,css:W,tailwind:_,tsCode:I,tsTailwind:U},ne=()=>{const[s,c]=i.useState("diagonal"),[l,e]=i.useState("#271E37"),[v,R]=i.useState("#222222"),[h,S]=i.useState(40),[x,y]=i.useState(.5),a=[{name:"direction",type:"string",default:"'right'",description:"Direction of square animation. Options: 'diagonal', 'up', 'right', 'down', 'left'."},{name:"speed",type:"number",default:"1",description:"Animation speed multiplier."},{name:"borderColor",type:"string",default:"'#999'",description:"Color of the square borders."},{name:"squareSize",type:"number",default:"40",description:"Size of individual squares in pixels."},{name:"hoverFillColor",type:"string",default:"'#222'",description:"Fill color when hovering over squares."}];return r.jsxs(A,{children:[r.jsxs(j,{children:[r.jsxs(L,{position:"relative",h:600,className:"demo-container",overflow:"hidden",p:0,children:[r.jsx(N,{squareSize:h,s:!0,speed:x,direction:s,borderColor:l,hoverFillColor:v}),r.jsx(T,{pillText:"New Background",headline:"Customizable squares moving around smoothly"})]}),r.jsxs(P,{children:[r.jsxs(H,{isAttached:!0,size:"sm",children:[r.jsx(w,{fontSize:"sm",mr:2,children:"Direction"}),r.jsx(m,{bg:s==="diagonal"?"#5227FF":"#170D27",_hover:{backgroundColor:`${s==="diagonal"?"#5227FF":"#170D27"}`},color:"white",fontSize:"xs",h:8,onClick:()=>{c("diagonal")},children:"Diagonal"}),r.jsx(m,{bg:s==="up"?"#5227FF":"#170D27",_hover:{backgroundColor:`${s==="up"?"#5227FF":"#170D27"}`},color:"white",fontSize:"xs",h:8,onClick:()=>{c("up")},children:"Up"}),r.jsx(m,{bg:s==="right"?"#5227FF":"#170D27",_hover:{backgroundColor:`${s==="right"?"#5227FF":"#170D27"}`},color:"white",fontSize:"xs",h:8,onClick:()=>{c("right")},children:"Right"}),r.jsx(m,{bg:s==="down"?"#5227FF":"#170D27",_hover:{backgroundColor:`${s==="down"?"#5227FF":"#170D27"}`},color:"white",fontSize:"xs",h:8,onClick:()=>{c("down")},children:"Down"}),r.jsx(m,{bg:s==="left"?"#5227FF":"#170D27",_hover:{backgroundColor:`${s==="left"?"#5227FF":"#170D27"}`},color:"white",fontSize:"xs",h:8,onClick:()=>{c("left")},children:"Left"})]}),r.jsx(F,{min:10,max:100,step:1,value:h,title:"Square Size",onChange:n=>{S(n)}}),r.jsx(F,{min:.1,max:2,step:.01,value:x,title:"Animation Speed",onChange:n=>{y(n)}}),r.jsxs(Y,{alignItems:"center",mb:6,children:[r.jsx(w,{mr:4,children:"Border Color"}),r.jsx(k,{type:"color",value:l,onChange:n=>{e(n.target.value)},width:"50px"})]}),r.jsxs(Y,{alignItems:"center",mb:6,children:[r.jsx(w,{mr:4,children:"Hover Color"}),r.jsx(k,{type:"color",value:v,onChange:n=>{R(n.target.value)},width:"50px"})]})]}),r.jsx(G,{data:a})]}),r.jsx(D,{children:r.jsx(B,{codeObject:J})})]})};export{ne as default};
