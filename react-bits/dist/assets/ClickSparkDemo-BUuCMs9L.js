import{r as s,j as n,B as I,T as z,F as j}from"./index-wsKSLPNH.js";import{T as P,P as L,a as B,C as N,b as q}from"./PropTable-C4uPWs8h.js";import{u as D}from"./useForceRerender-BCFU-k0M.js";import{P as g}from"./PreviewSlider-m1G_aiYP.js";import{C as O}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";const W=`import { useRef, useEffect, useCallback } from 'react';\r
\r
const ClickSpark = ({\r
  sparkColor = '#fff',\r
  sparkSize = 10,\r
  sparkRadius = 15,\r
  sparkCount = 8,\r
  duration = 400,\r
  easing = 'ease-out',\r
  extraScale = 1.0,\r
  children\r
}) => {\r
  const canvasRef = useRef(null);\r
  const sparksRef = useRef([]);\r
  const startTimeRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const parent = canvas.parentElement;\r
    if (!parent) return;\r
\r
    let resizeTimeout;\r
\r
    const resizeCanvas = () => {\r
      const { width, height } = parent.getBoundingClientRect();\r
      if (canvas.width !== width || canvas.height !== height) {\r
        canvas.width = width;\r
        canvas.height = height;\r
      }\r
    };\r
\r
    const handleResize = () => {\r
      clearTimeout(resizeTimeout);\r
      resizeTimeout = setTimeout(resizeCanvas, 100);\r
    };\r
\r
    const ro = new ResizeObserver(handleResize);\r
    ro.observe(parent);\r
\r
    resizeCanvas();\r
\r
    return () => {\r
      ro.disconnect();\r
      clearTimeout(resizeTimeout);\r
    };\r
  }, []);\r
\r
  const easeFunc = useCallback(\r
    t => {\r
      switch (easing) {\r
        case 'linear':\r
          return t;\r
        case 'ease-in':\r
          return t * t;\r
        case 'ease-in-out':\r
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;\r
        default:\r
          return t * (2 - t);\r
      }\r
    },\r
    [easing]\r
  );\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const ctx = canvas.getContext('2d');\r
\r
    let animationId;\r
\r
    const draw = timestamp => {\r
      if (!startTimeRef.current) {\r
        startTimeRef.current = timestamp;\r
      }\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      sparksRef.current = sparksRef.current.filter(spark => {\r
        const elapsed = timestamp - spark.startTime;\r
        if (elapsed >= duration) {\r
          return false;\r
        }\r
\r
        const progress = elapsed / duration;\r
        const eased = easeFunc(progress);\r
\r
        const distance = eased * sparkRadius * extraScale;\r
        const lineLength = sparkSize * (1 - eased);\r
\r
        const x1 = spark.x + distance * Math.cos(spark.angle);\r
        const y1 = spark.y + distance * Math.sin(spark.angle);\r
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);\r
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);\r
\r
        ctx.strokeStyle = sparkColor;\r
        ctx.lineWidth = 2;\r
        ctx.beginPath();\r
        ctx.moveTo(x1, y1);\r
        ctx.lineTo(x2, y2);\r
        ctx.stroke();\r
\r
        return true;\r
      });\r
\r
      animationId = requestAnimationFrame(draw);\r
    };\r
\r
    animationId = requestAnimationFrame(draw);\r
\r
    return () => {\r
      cancelAnimationFrame(animationId);\r
    };\r
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);\r
\r
  const handleClick = e => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const rect = canvas.getBoundingClientRect();\r
    const x = e.clientX - rect.left;\r
    const y = e.clientY - rect.top;\r
\r
    const now = performance.now();\r
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({\r
      x,\r
      y,\r
      angle: (2 * Math.PI * i) / sparkCount,\r
      startTime: now\r
    }));\r
\r
    sparksRef.current.push(...newSparks);\r
  };\r
\r
  return (\r
    <div\r
      style={{\r
        position: 'relative',\r
        width: '100%',\r
        height: '100%'\r
      }}\r
      onClick={handleClick}\r
    >\r
      <canvas\r
        ref={canvasRef}\r
        style={{\r
          width: '100%',\r
          height: '100%',\r
          display: 'block',\r
          userSelect: 'none',\r
          position: 'absolute',\r
          top: 0,\r
          left: 0,\r
          pointerEvents: 'none'\r
        }}\r
      />\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default ClickSpark;\r
`,Y=`import { useRef, useEffect, useCallback } from 'react';\r
\r
const ClickSpark = ({\r
  sparkColor = '#fff',\r
  sparkSize = 10,\r
  sparkRadius = 15,\r
  sparkCount = 8,\r
  duration = 400,\r
  easing = 'ease-out',\r
  extraScale = 1.0,\r
  children\r
}) => {\r
  const canvasRef = useRef(null);\r
  const sparksRef = useRef([]);\r
  const startTimeRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const parent = canvas.parentElement;\r
    if (!parent) return;\r
\r
    let resizeTimeout;\r
\r
    const resizeCanvas = () => {\r
      const { width, height } = parent.getBoundingClientRect();\r
      if (canvas.width !== width || canvas.height !== height) {\r
        canvas.width = width;\r
        canvas.height = height;\r
      }\r
    };\r
\r
    const handleResize = () => {\r
      clearTimeout(resizeTimeout);\r
      resizeTimeout = setTimeout(resizeCanvas, 100);\r
    };\r
\r
    const ro = new ResizeObserver(handleResize);\r
    ro.observe(parent);\r
\r
    resizeCanvas();\r
\r
    return () => {\r
      ro.disconnect();\r
      clearTimeout(resizeTimeout);\r
    };\r
  }, []);\r
\r
  const easeFunc = useCallback(\r
    t => {\r
      switch (easing) {\r
        case 'linear':\r
          return t;\r
        case 'ease-in':\r
          return t * t;\r
        case 'ease-in-out':\r
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;\r
        default:\r
          return t * (2 - t);\r
      }\r
    },\r
    [easing]\r
  );\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const ctx = canvas.getContext('2d');\r
\r
    let animationId;\r
\r
    const draw = timestamp => {\r
      if (!startTimeRef.current) {\r
        startTimeRef.current = timestamp;\r
      }\r
      ctx.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      sparksRef.current = sparksRef.current.filter(spark => {\r
        const elapsed = timestamp - spark.startTime;\r
        if (elapsed >= duration) {\r
          return false;\r
        }\r
\r
        const progress = elapsed / duration;\r
        const eased = easeFunc(progress);\r
\r
        const distance = eased * sparkRadius * extraScale;\r
        const lineLength = sparkSize * (1 - eased);\r
\r
        const x1 = spark.x + distance * Math.cos(spark.angle);\r
        const y1 = spark.y + distance * Math.sin(spark.angle);\r
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);\r
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);\r
\r
        ctx.strokeStyle = sparkColor;\r
        ctx.lineWidth = 2;\r
        ctx.beginPath();\r
        ctx.moveTo(x1, y1);\r
        ctx.lineTo(x2, y2);\r
        ctx.stroke();\r
\r
        return true;\r
      });\r
\r
      animationId = requestAnimationFrame(draw);\r
    };\r
\r
    animationId = requestAnimationFrame(draw);\r
\r
    return () => {\r
      cancelAnimationFrame(animationId);\r
    };\r
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);\r
\r
  const handleClick = e => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const rect = canvas.getBoundingClientRect();\r
    const x = e.clientX - rect.left;\r
    const y = e.clientY - rect.top;\r
\r
    const now = performance.now();\r
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({\r
      x,\r
      y,\r
      angle: (2 * Math.PI * i) / sparkCount,\r
      startTime: now\r
    }));\r
\r
    sparksRef.current.push(...newSparks);\r
  };\r
\r
  return (\r
    <div className="relative w-full h-full" onClick={handleClick}>\r
      <canvas ref={canvasRef} className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none" />\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default ClickSpark;\r
`,H=`import React, { useRef, useEffect, useCallback } from 'react';\r
\r
interface ClickSparkProps {\r
  sparkColor?: string;\r
  sparkSize?: number;\r
  sparkRadius?: number;\r
  sparkCount?: number;\r
  duration?: number;\r
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';\r
  extraScale?: number;\r
  children?: React.ReactNode;\r
}\r
\r
interface Spark {\r
  x: number;\r
  y: number;\r
  angle: number;\r
  startTime: number;\r
}\r
\r
const ClickSpark: React.FC<ClickSparkProps> = ({\r
  sparkColor = '#fff',\r
  sparkSize = 10,\r
  sparkRadius = 15,\r
  sparkCount = 8,\r
  duration = 400,\r
  easing = 'ease-out',\r
  extraScale = 1.0,\r
  children\r
}) => {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const sparksRef = useRef<Spark[]>([]);\r
  const startTimeRef = useRef<number | null>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const parent = canvas.parentElement;\r
    if (!parent) return;\r
\r
    let resizeTimeout: NodeJS.Timeout;\r
\r
    const resizeCanvas = () => {\r
      const { width, height } = parent.getBoundingClientRect();\r
      if (canvas.width !== width || canvas.height !== height) {\r
        canvas.width = width;\r
        canvas.height = height;\r
      }\r
    };\r
\r
    const handleResize = () => {\r
      clearTimeout(resizeTimeout);\r
      resizeTimeout = setTimeout(resizeCanvas, 100);\r
    };\r
\r
    const ro = new ResizeObserver(handleResize);\r
    ro.observe(parent);\r
\r
    resizeCanvas();\r
\r
    return () => {\r
      ro.disconnect();\r
      clearTimeout(resizeTimeout);\r
    };\r
  }, []);\r
\r
  const easeFunc = useCallback(\r
    (t: number) => {\r
      switch (easing) {\r
        case 'linear':\r
          return t;\r
        case 'ease-in':\r
          return t * t;\r
        case 'ease-in-out':\r
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;\r
        default:\r
          return t * (2 - t);\r
      }\r
    },\r
    [easing]\r
  );\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const ctx = canvas.getContext('2d');\r
    if (!ctx) return;\r
\r
    let animationId: number;\r
\r
    const draw = (timestamp: number) => {\r
      if (!startTimeRef.current) {\r
        startTimeRef.current = timestamp;\r
      }\r
      ctx?.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      sparksRef.current = sparksRef.current.filter((spark: Spark) => {\r
        const elapsed = timestamp - spark.startTime;\r
        if (elapsed >= duration) {\r
          return false;\r
        }\r
\r
        const progress = elapsed / duration;\r
        const eased = easeFunc(progress);\r
\r
        const distance = eased * sparkRadius * extraScale;\r
        const lineLength = sparkSize * (1 - eased);\r
\r
        const x1 = spark.x + distance * Math.cos(spark.angle);\r
        const y1 = spark.y + distance * Math.sin(spark.angle);\r
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);\r
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);\r
\r
        ctx.strokeStyle = sparkColor;\r
        ctx.lineWidth = 2;\r
        ctx.beginPath();\r
        ctx.moveTo(x1, y1);\r
        ctx.lineTo(x2, y2);\r
        ctx.stroke();\r
\r
        return true;\r
      });\r
\r
      animationId = requestAnimationFrame(draw);\r
    };\r
\r
    animationId = requestAnimationFrame(draw);\r
\r
    return () => {\r
      cancelAnimationFrame(animationId);\r
    };\r
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);\r
\r
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const rect = canvas.getBoundingClientRect();\r
    const x = e.clientX - rect.left;\r
    const y = e.clientY - rect.top;\r
\r
    const now = performance.now();\r
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({\r
      x,\r
      y,\r
      angle: (2 * Math.PI * i) / sparkCount,\r
      startTime: now\r
    }));\r
\r
    sparksRef.current.push(...newSparks);\r
  };\r
\r
  return (\r
    <div\r
      style={{\r
        width: '100%',\r
        height: '100%',\r
        position: 'relative'\r
      }}\r
      onClick={handleClick}\r
    >\r
      <canvas\r
        ref={canvasRef}\r
        style={{\r
          position: 'absolute',\r
          inset: 0,\r
          pointerEvents: 'none'\r
        }}\r
      />\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default ClickSpark;\r
`,X=`import React, { useRef, useEffect, useCallback } from 'react';\r
\r
interface ClickSparkProps {\r
  sparkColor?: string;\r
  sparkSize?: number;\r
  sparkRadius?: number;\r
  sparkCount?: number;\r
  duration?: number;\r
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';\r
  extraScale?: number;\r
  children?: React.ReactNode;\r
}\r
\r
interface Spark {\r
  x: number;\r
  y: number;\r
  angle: number;\r
  startTime: number;\r
}\r
\r
const ClickSpark: React.FC<ClickSparkProps> = ({\r
  sparkColor = '#fff',\r
  sparkSize = 10,\r
  sparkRadius = 15,\r
  sparkCount = 8,\r
  duration = 400,\r
  easing = 'ease-out',\r
  extraScale = 1.0,\r
  children\r
}) => {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const sparksRef = useRef<Spark[]>([]);\r
  const startTimeRef = useRef<number | null>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const parent = canvas.parentElement;\r
    if (!parent) return;\r
\r
    let resizeTimeout: NodeJS.Timeout;\r
\r
    const resizeCanvas = () => {\r
      const { width, height } = parent.getBoundingClientRect();\r
      if (canvas.width !== width || canvas.height !== height) {\r
        canvas.width = width;\r
        canvas.height = height;\r
      }\r
    };\r
\r
    const handleResize = () => {\r
      clearTimeout(resizeTimeout);\r
      resizeTimeout = setTimeout(resizeCanvas, 100);\r
    };\r
\r
    const ro = new ResizeObserver(handleResize);\r
    ro.observe(parent);\r
\r
    resizeCanvas();\r
\r
    return () => {\r
      ro.disconnect();\r
      clearTimeout(resizeTimeout);\r
    };\r
  }, []);\r
\r
  const easeFunc = useCallback(\r
    (t: number) => {\r
      switch (easing) {\r
        case 'linear':\r
          return t;\r
        case 'ease-in':\r
          return t * t;\r
        case 'ease-in-out':\r
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;\r
        default:\r
          return t * (2 - t);\r
      }\r
    },\r
    [easing]\r
  );\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const ctx = canvas.getContext('2d');\r
    if (!ctx) return;\r
\r
    let animationId: number;\r
\r
    const draw = (timestamp: number) => {\r
      if (!startTimeRef.current) {\r
        startTimeRef.current = timestamp;\r
      }\r
      ctx?.clearRect(0, 0, canvas.width, canvas.height);\r
\r
      sparksRef.current = sparksRef.current.filter((spark: Spark) => {\r
        const elapsed = timestamp - spark.startTime;\r
        if (elapsed >= duration) {\r
          return false;\r
        }\r
\r
        const progress = elapsed / duration;\r
        const eased = easeFunc(progress);\r
\r
        const distance = eased * sparkRadius * extraScale;\r
        const lineLength = sparkSize * (1 - eased);\r
\r
        const x1 = spark.x + distance * Math.cos(spark.angle);\r
        const y1 = spark.y + distance * Math.sin(spark.angle);\r
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);\r
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);\r
\r
        ctx.strokeStyle = sparkColor;\r
        ctx.lineWidth = 2;\r
        ctx.beginPath();\r
        ctx.moveTo(x1, y1);\r
        ctx.lineTo(x2, y2);\r
        ctx.stroke();\r
\r
        return true;\r
      });\r
\r
      animationId = requestAnimationFrame(draw);\r
    };\r
\r
    animationId = requestAnimationFrame(draw);\r
\r
    return () => {\r
      cancelAnimationFrame(animationId);\r
    };\r
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);\r
\r
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
    const rect = canvas.getBoundingClientRect();\r
    const x = e.clientX - rect.left;\r
    const y = e.clientY - rect.top;\r
\r
    const now = performance.now();\r
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({\r
      x,\r
      y,\r
      angle: (2 * Math.PI * i) / sparkCount,\r
      startTime: now\r
    }));\r
\r
    sparksRef.current.push(...newSparks);\r
  };\r
\r
  return (\r
    <div className="relative w-full h-full" onClick={handleClick}>\r
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default ClickSpark;\r
`,_={usage:`import ClickSpark from './ClickSpark';

<ClickSpark
  sparkColor='#fff'
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
>
  {/* Your content here */}
</ClickSpark>`,code:W,tailwind:Y,tsCode:H,tsTailwind:X},J=({sparkColor:p="#fff",sparkSize:x=10,sparkRadius:d=15,sparkCount:f=8,duration:u=400,easing:R="ease-out",extraScale:m=1,children:T})=>{const i=s.useRef(null),k=s.useRef([]),h=s.useRef(null);s.useEffect(()=>{const r=i.current;if(!r)return;const t=r.parentElement;if(!t)return;let e;const c=()=>{const{width:o,height:v}=t.getBoundingClientRect();(r.width!==o||r.height!==v)&&(r.width=o,r.height=v)},l=()=>{clearTimeout(e),e=setTimeout(c,100)},a=new ResizeObserver(l);return a.observe(t),c(),()=>{a.disconnect(),clearTimeout(e)}},[]);const C=s.useCallback(r=>{switch(R){case"linear":return r;case"ease-in":return r*r;case"ease-in-out":return r<.5?2*r*r:-1+(4-2*r)*r;default:return r*(2-r)}},[R]);s.useEffect(()=>{const r=i.current;if(!r)return;const t=r.getContext("2d");let e;const c=l=>{h.current||(h.current=l),t.clearRect(0,0,r.width,r.height),k.current=k.current.filter(a=>{const o=l-a.startTime;if(o>=u)return!1;const v=o/u,S=C(v),w=S*d*m,y=x*(1-S),E=a.x+w*Math.cos(a.angle),F=a.y+w*Math.sin(a.angle),M=a.x+(w+y)*Math.cos(a.angle),A=a.y+(w+y)*Math.sin(a.angle);return t.strokeStyle=p,t.lineWidth=2,t.beginPath(),t.moveTo(E,F),t.lineTo(M,A),t.stroke(),!0}),e=requestAnimationFrame(c)};return e=requestAnimationFrame(c),()=>{cancelAnimationFrame(e)}},[p,x,d,f,u,C,m]);const b=r=>{const t=i.current;if(!t)return;const e=t.getBoundingClientRect(),c=r.clientX-e.left,l=r.clientY-e.top,a=performance.now(),o=Array.from({length:f},(v,S)=>({x:c,y:l,angle:2*Math.PI*S/f,startTime:a}));k.current.push(...o)};return n.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},onClick:b,children:[n.jsx("canvas",{ref:i,style:{width:"100%",height:"100%",display:"block",userSelect:"none",position:"absolute",top:0,left:0,pointerEvents:"none"}}),T]})},$=()=>{const[p,x]=s.useState("#ffffff"),[d,f]=s.useState(10),[u,R]=s.useState(15),[m,T]=s.useState(8),[i,k]=s.useState(400),[h,C]=s.useState(1),[b,r]=D(),t=[{name:"sparkColor",type:"string",default:"'#f00'",description:"Color of each spark line."},{name:"sparkSize",type:"number",default:30,description:"Initial length of each spark line."},{name:"sparkRadius",type:"number",default:30,description:"How far sparks travel from the click center."},{name:"sparkCount",type:"number",default:8,description:"Number of spark lines that appear on each click."},{name:"duration",type:"number",default:660,description:"Animation duration in milliseconds."},{name:"easing",type:"string",default:"'ease-out'",description:"Easing function used for the spark animation."},{name:"extraScale",type:"number",default:1,description:"Additional multiplier for spark distance."},{name:"children",type:"React.ReactNode",default:"",description:"React children to render."}];return n.jsxs(P,{children:[n.jsxs(L,{children:[n.jsxs(I,{position:"relative",className:"demo-container",h:300,p:0,overflow:"hidden",children:[n.jsx(J,{sparkColor:p,sparkSize:d,sparkRadius:u,sparkCount:m,duration:i,extraScale:h},b),n.jsx(z,{position:"absolute",fontWeight:900,fontSize:"2rem",textAlign:"center",color:"#271E37",userSelect:"none",children:"Click Around!"})]}),n.jsxs(O,{children:[n.jsxs(j,{gap:4,align:"center",mt:4,children:[n.jsx(z,{fontSize:"sm",children:"Spark Color:"}),n.jsx("input",{type:"color",value:p,onChange:e=>{x(e.target.value),r()}})]}),n.jsx(g,{title:"Spark Size",min:5,max:60,step:1,value:d,onChange:e=>{f(e),r()}}),n.jsx(g,{title:"Spark Radius",min:10,max:200,step:5,value:u,onChange:e=>{R(e),r()}}),n.jsx(g,{title:"Spark Count",min:1,max:20,step:1,value:m,onChange:e=>{T(e),r()}}),n.jsx(g,{title:"Duration",min:200,max:2e3,step:100,value:i,valueUnit:"ms",onChange:e=>{k(e),r()}}),n.jsx(g,{title:"Extra Scale",min:.5,max:2,step:.1,value:h,onChange:e=>{C(e),r()}})]}),n.jsx(B,{data:t})]}),n.jsx(N,{children:n.jsx(q,{codeObject:_})})]})};export{$ as default};
