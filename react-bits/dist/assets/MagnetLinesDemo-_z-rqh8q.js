import{r as h,j as n,F as L}from"./index-wsKSLPNH.js";import{T as S,P as E,a as $,C as A,b as N}from"./PropTable-C4uPWs8h.js";import"./index-Bpz4cGEA.js";function T({rows:i=9,columns:l=9,containerSize:m="80vmin",lineColor:p="#efefef",lineWidth:u="1vmin",lineHeight:y="6vmin",baseAngle:v=-10,className:w="",style:M={}}){const d=h.useRef(null);h.useEffect(()=>{const s=d.current;if(!s)return;const e=s.querySelectorAll("span"),a=r=>{e.forEach(t=>{const o=t.getBoundingClientRect(),C=o.x+o.width/2,g=o.y+o.height/2,c=r.x-C,f=r.y-g,P=Math.sqrt(f*f+c*c)||1,R=Math.acos(c/P)*180/Math.PI*(r.y>g?1:-1);t.style.setProperty("--rotate",`${R}deg`)})};if(window.addEventListener("pointermove",a),e.length){const r=Math.floor(e.length/2),t=e[r].getBoundingClientRect();a({x:t.x,y:t.y})}return()=>{window.removeEventListener("pointermove",a)}},[]);const b=i*l,x=Array.from({length:b},(s,e)=>n.jsx("span",{style:{"--rotate":`${v}deg`,backgroundColor:p,width:u,height:y}},e));return n.jsx("div",{ref:d,className:`magnetLines-container ${w}`,style:{display:"grid",gridTemplateColumns:`repeat(${l}, 1fr)`,gridTemplateRows:`repeat(${i}, 1fr)`,width:m,height:m,...M},children:x})}const H=`import { useRef, useEffect } from 'react';\r
import './MagnetLines.css';\r
\r
export default function MagnetLines({\r
  rows = 9,\r
  columns = 9,\r
  containerSize = '80vmin',\r
  lineColor = '#efefef',\r
  lineWidth = '1vmin',\r
  lineHeight = '6vmin',\r
  baseAngle = -10,\r
  className = '',\r
  style = {}\r
}) {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const items = container.querySelectorAll('span');\r
\r
    const onPointerMove = pointer => {\r
      items.forEach(item => {\r
        const rect = item.getBoundingClientRect();\r
        const centerX = rect.x + rect.width / 2;\r
        const centerY = rect.y + rect.height / 2;\r
\r
        const b = pointer.x - centerX;\r
        const a = pointer.y - centerY;\r
        const c = Math.sqrt(a * a + b * b) || 1;\r
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);\r
\r
        item.style.setProperty('--rotate', \`\${r}deg\`);\r
      });\r
    };\r
\r
    window.addEventListener('pointermove', onPointerMove);\r
\r
    if (items.length) {\r
      const middleIndex = Math.floor(items.length / 2);\r
      const rect = items[middleIndex].getBoundingClientRect();\r
      onPointerMove({ x: rect.x, y: rect.y });\r
    }\r
\r
    return () => {\r
      window.removeEventListener('pointermove', onPointerMove);\r
    };\r
  }, []);\r
\r
  const total = rows * columns;\r
  const spans = Array.from({ length: total }, (_, i) => (\r
    <span\r
      key={i}\r
      style={{\r
        '--rotate': \`\${baseAngle}deg\`,\r
        backgroundColor: lineColor,\r
        width: lineWidth,\r
        height: lineHeight\r
      }}\r
    />\r
  ));\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`magnetLines-container \${className}\`}\r
      style={{\r
        display: 'grid',\r
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,\r
        gridTemplateRows: \`repeat(\${rows}, 1fr)\`,\r
        width: containerSize,\r
        height: containerSize,\r
        ...style\r
      }}\r
    >\r
      {spans}\r
    </div>\r
  );\r
}\r
`,I=`.magnetLines-container {\r
  display: grid;\r
  grid-template-columns: repeat(var(--columns), 1fr);\r
  grid-template-rows: repeat(var(--rows), 1fr);\r
\r
  justify-items: center;\r
  align-items: center;\r
\r
  width: 80vmin;\r
  height: 80vmin;\r
}\r
\r
.magnetLines-container span {\r
  display: block;\r
  transform-origin: center;\r
  will-change: transform;\r
  transform: rotate(var(--rotate));\r
}\r
`,z=`import { useRef, useEffect } from 'react';\r
\r
export default function MagnetLines({\r
  rows = 9,\r
  columns = 9,\r
  containerSize = '80vmin',\r
  lineColor = '#efefef',\r
  lineWidth = '1vmin',\r
  lineHeight = '6vmin',\r
  baseAngle = -10,\r
  className = '',\r
  style = {}\r
}) {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const items = container.querySelectorAll('span');\r
\r
    const onPointerMove = pointer => {\r
      items.forEach(item => {\r
        const rect = item.getBoundingClientRect();\r
        const centerX = rect.x + rect.width / 2;\r
        const centerY = rect.y + rect.height / 2;\r
\r
        const b = pointer.x - centerX;\r
        const a = pointer.y - centerY;\r
        const c = Math.sqrt(a * a + b * b) || 1;\r
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);\r
\r
        item.style.setProperty('--rotate', \`\${r}deg\`);\r
      });\r
    };\r
\r
    window.addEventListener('pointermove', onPointerMove);\r
\r
    if (items.length) {\r
      const middleIndex = Math.floor(items.length / 2);\r
      const rect = items[middleIndex].getBoundingClientRect();\r
      onPointerMove({ x: rect.x, y: rect.y });\r
    }\r
\r
    return () => {\r
      window.removeEventListener('pointermove', onPointerMove);\r
    };\r
  }, []);\r
\r
  const total = rows * columns;\r
  const spans = Array.from({ length: total }, (_, i) => (\r
    <span\r
      key={i}\r
      className="block origin-center"\r
      style={{\r
        backgroundColor: lineColor,\r
        width: lineWidth,\r
        height: lineHeight,\r
        '--rotate': \`\${baseAngle}deg\`,\r
        transform: 'rotate(var(--rotate))',\r
        willChange: 'transform'\r
      }}\r
    />\r
  ));\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`grid place-items-center \${className}\`}\r
      style={{\r
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,\r
        gridTemplateRows: \`repeat(\${rows}, 1fr)\`,\r
        width: containerSize,\r
        height: containerSize,\r
        ...style\r
      }}\r
    >\r
      {spans}\r
    </div>\r
  );\r
}\r
`,j=`import React, { useRef, useEffect, CSSProperties } from 'react';\r
import './MagnetLines.css';\r
\r
interface MagnetLinesProps {\r
  rows?: number;\r
  columns?: number;\r
  containerSize?: string;\r
  lineColor?: string;\r
  lineWidth?: string;\r
  lineHeight?: string;\r
  baseAngle?: number;\r
  className?: string;\r
  style?: CSSProperties;\r
}\r
\r
const MagnetLines: React.FC<MagnetLinesProps> = ({\r
  rows = 9,\r
  columns = 9,\r
  containerSize = '80vmin',\r
  lineColor = '#efefef',\r
  lineWidth = '1vmin',\r
  lineHeight = '6vmin',\r
  baseAngle = -10,\r
  className = '',\r
  style = {}\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const items = container.querySelectorAll<HTMLSpanElement>('span');\r
\r
    const onPointerMove = (pointer: { x: number; y: number }) => {\r
      items.forEach(item => {\r
        const rect = item.getBoundingClientRect();\r
        const centerX = rect.x + rect.width / 2;\r
        const centerY = rect.y + rect.height / 2;\r
\r
        const b = pointer.x - centerX;\r
        const a = pointer.y - centerY;\r
        const c = Math.sqrt(a * a + b * b) || 1;\r
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);\r
\r
        item.style.setProperty('--rotate', \`\${r}deg\`);\r
      });\r
    };\r
\r
    const handlePointerMove = (e: PointerEvent) => {\r
      onPointerMove({ x: e.x, y: e.y });\r
    };\r
\r
    window.addEventListener('pointermove', handlePointerMove);\r
\r
    if (items.length) {\r
      const middleIndex = Math.floor(items.length / 2);\r
      const rect = items[middleIndex].getBoundingClientRect();\r
      onPointerMove({ x: rect.x, y: rect.y });\r
    }\r
\r
    return () => {\r
      window.removeEventListener('pointermove', handlePointerMove);\r
    };\r
  }, []);\r
\r
  const total = rows * columns;\r
  const spans = Array.from({ length: total }, (_, i) => (\r
    <span\r
      key={i}\r
      style={\r
        {\r
          '--rotate': \`\${baseAngle}deg\`,\r
          backgroundColor: lineColor,\r
          width: lineWidth,\r
          height: lineHeight\r
        } as CSSProperties\r
      }\r
    />\r
  ));\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`magnetLines-container \${className}\`}\r
      style={{\r
        display: 'grid',\r
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,\r
        gridTemplateRows: \`repeat(\${rows}, 1fr)\`,\r
        width: containerSize,\r
        height: containerSize,\r
        ...style\r
      }}\r
    >\r
      {spans}\r
    </div>\r
  );\r
};\r
\r
export default MagnetLines;\r
`,k=`import React, { useRef, useEffect, CSSProperties } from 'react';\r
\r
interface MagnetLinesProps {\r
  rows?: number;\r
  columns?: number;\r
  containerSize?: string;\r
  lineColor?: string;\r
  lineWidth?: string;\r
  lineHeight?: string;\r
  baseAngle?: number;\r
  className?: string;\r
  style?: CSSProperties;\r
}\r
\r
const MagnetLines: React.FC<MagnetLinesProps> = ({\r
  rows = 9,\r
  columns = 9,\r
  containerSize = '80vmin',\r
  lineColor = '#efefef',\r
  lineWidth = '1vmin',\r
  lineHeight = '6vmin',\r
  baseAngle = -10,\r
  className = '',\r
  style = {}\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const items = container.querySelectorAll<HTMLSpanElement>('span');\r
\r
    const onPointerMove = (pointer: { x: number; y: number }) => {\r
      items.forEach(item => {\r
        const rect = item.getBoundingClientRect();\r
        const centerX = rect.x + rect.width / 2;\r
        const centerY = rect.y + rect.height / 2;\r
\r
        const b = pointer.x - centerX;\r
        const a = pointer.y - centerY;\r
        const c = Math.sqrt(a * a + b * b) || 1;\r
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);\r
\r
        item.style.setProperty('--rotate', \`\${r}deg\`);\r
      });\r
    };\r
\r
    const handlePointerMove = (e: PointerEvent) => {\r
      onPointerMove({ x: e.x, y: e.y });\r
    };\r
\r
    window.addEventListener('pointermove', handlePointerMove);\r
\r
    if (items.length) {\r
      const middleIndex = Math.floor(items.length / 2);\r
      const rect = items[middleIndex].getBoundingClientRect();\r
      onPointerMove({ x: rect.x, y: rect.y });\r
    }\r
\r
    return () => {\r
      window.removeEventListener('pointermove', handlePointerMove);\r
    };\r
  }, []);\r
\r
  const total = rows * columns;\r
  const spans = Array.from({ length: total }, (_, i) => (\r
    <span\r
      key={i}\r
      className="block origin-center"\r
      style={{\r
        backgroundColor: lineColor,\r
        width: lineWidth,\r
        height: lineHeight,\r
        //@ts-ignore\r
        '--rotate': \`\${baseAngle}deg\`,\r
        transform: 'rotate(var(--rotate))',\r
        willChange: 'transform'\r
      }}\r
    />\r
  ));\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`grid place-items-center \${className}\`}\r
      style={{\r
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,\r
        gridTemplateRows: \`repeat(\${rows}, 1fr)\`,\r
        width: containerSize,\r
        height: containerSize,\r
        ...style\r
      }}\r
    >\r
      {spans}\r
    </div>\r
  );\r
};\r
\r
export default MagnetLines;\r
`,W={usage:`import MagnetLines from './MagnetLines';

<MagnetLines
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="tomato"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
  style={{ margin: "2rem auto" }}
/>`,code:H,css:I,tailwind:z,tsCode:j,tsTailwind:k},X=()=>{const i=[{name:"rows",type:"number",default:"9",description:"Number of grid rows."},{name:"columns",type:"number",default:"9",description:"Number of grid columns."},{name:"containerSize",type:"string",default:"80vmin",description:"Specifies the width and height of the entire grid container."},{name:"lineColor",type:"string",default:"#efefef",description:"Color for each line (the <span> elements)."},{name:"lineWidth",type:"string",default:"1vmin",description:"Specifies each line’s thickness."},{name:"lineHeight",type:"string",default:"6vmin",description:"Specifies each line’s length."},{name:"baseAngle",type:"number",default:"-10",description:"Initial rotation angle (in degrees) before pointer movement."},{name:"className",type:"string",default:"",description:"Additional class name(s) applied to the container."},{name:"style",type:"object",default:"{}",description:"Inline styles for the container."}];return n.jsxs(S,{children:[n.jsxs(E,{children:[n.jsx(L,{overflow:"hidden",justifyContent:"center",pb:"1em",alignItems:"center",className:"demo-container",children:n.jsx(T,{rows:10,columns:12,containerSize:"40vmin",lineWidth:"2px",lineHeight:"30px"})}),n.jsx($,{data:i})]}),n.jsx(A,{children:n.jsx(N,{codeObject:W})})]})};export{X as default};
