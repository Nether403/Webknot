import{r as u,j as r,B as R,F as $,T as _}from"./index-wsKSLPNH.js";import{T as I,P as j,a as X,C as T,b as B}from"./PropTable-C4uPWs8h.js";import{C as L}from"./Customize-1m_ZNqR9.js";import{P as E}from"./PreviewSlider-m1G_aiYP.js";import{u as A}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";const x=(s,a)=>{let l=s.startsWith("#")?s.slice(1):s;l.length===3&&(l=l.split("").map(p=>p+p).join(""));const f=parseInt(l,16);let d=f>>16&255,t=f>>8&255,e=f&255;return d=Math.max(0,Math.min(255,Math.floor(d*(1-a)))),t=Math.max(0,Math.min(255,Math.floor(t*(1-a)))),e=Math.max(0,Math.min(255,Math.floor(e*(1-a)))),"#"+((1<<24)+(d<<16)+(t<<8)+e).toString(16).slice(1).toUpperCase()},D=({color:s="#5227FF",size:a=1,items:l=[],className:f=""})=>{const t=l.slice(0,3);for(;t.length<3;)t.push(null);const[e,p]=u.useState(!1),[v,h]=u.useState(Array.from({length:3},()=>({x:0,y:0}))),b=x(s,.08),y=x("#ffffff",.1),M=x("#ffffff",.05),C="#ffffff",k=()=>{p(c=>!c),e&&h(Array.from({length:3},()=>({x:0,y:0})))},w=(c,n)=>{if(!e)return;const o=c.currentTarget.getBoundingClientRect(),i=o.left+o.width/2,m=o.top+o.height/2,F=(c.clientX-i)*.15,z=(c.clientY-m)*.15;h(Y=>{const g=[...Y];return g[n]={x:F,y:z},g})},O=(c,n)=>{h(o=>{const i=[...o];return i[n]={x:0,y:0},i})},S={"--folder-color":s,"--folder-back-color":b,"--paper-1":y,"--paper-2":M,"--paper-3":C},N=`folder ${e?"open":""}`.trim(),P={transform:`scale(${a})`};return r.jsx("div",{style:P,className:f,children:r.jsx("div",{className:N,style:S,onClick:k,children:r.jsxs("div",{className:"folder__back",children:[t.map((c,n)=>{var o,i;return r.jsx("div",{className:`paper paper-${n+1}`,onMouseMove:m=>w(m,n),onMouseLeave:m=>O(m,n),style:e?{"--magnet-x":`${((o=v[n])==null?void 0:o.x)||0}px`,"--magnet-y":`${((i=v[n])==null?void 0:i.y)||0}px`}:{},children:c},n)}),r.jsx("div",{className:"folder__front"}),r.jsx("div",{className:"folder__front right"})]})})})},Z=`import { useState } from 'react';\r
import './Folder.css';\r
\r
const darkenColor = (hex, percent) => {\r
  let color = hex.startsWith('#') ? hex.slice(1) : hex;\r
  if (color.length === 3) {\r
    color = color\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const num = parseInt(color, 16);\r
  let r = (num >> 16) & 0xff;\r
  let g = (num >> 8) & 0xff;\r
  let b = num & 0xff;\r
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));\r
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));\r
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));\r
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();\r
};\r
\r
const Folder = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {\r
  const maxItems = 3;\r
  const papers = items.slice(0, maxItems);\r
  while (papers.length < maxItems) {\r
    papers.push(null);\r
  }\r
\r
  const [open, setOpen] = useState(false);\r
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));\r
\r
  const folderBackColor = darkenColor(color, 0.08);\r
  const paper1 = darkenColor('#ffffff', 0.1);\r
  const paper2 = darkenColor('#ffffff', 0.05);\r
  const paper3 = '#ffffff';\r
\r
  const handleClick = () => {\r
    setOpen(prev => !prev);\r
    if (open) {\r
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));\r
    }\r
  };\r
\r
  const handlePaperMouseMove = (e, index) => {\r
    if (!open) return;\r
    const rect = e.currentTarget.getBoundingClientRect();\r
    const centerX = rect.left + rect.width / 2;\r
    const centerY = rect.top + rect.height / 2;\r
    const offsetX = (e.clientX - centerX) * 0.15;\r
    const offsetY = (e.clientY - centerY) * 0.15;\r
    setPaperOffsets(prev => {\r
      const newOffsets = [...prev];\r
      newOffsets[index] = { x: offsetX, y: offsetY };\r
      return newOffsets;\r
    });\r
  };\r
\r
  const handlePaperMouseLeave = (e, index) => {\r
    setPaperOffsets(prev => {\r
      const newOffsets = [...prev];\r
      newOffsets[index] = { x: 0, y: 0 };\r
      return newOffsets;\r
    });\r
  };\r
\r
  const folderStyle = {\r
    '--folder-color': color,\r
    '--folder-back-color': folderBackColor,\r
    '--paper-1': paper1,\r
    '--paper-2': paper2,\r
    '--paper-3': paper3\r
  };\r
\r
  const folderClassName = \`folder \${open ? 'open' : ''}\`.trim();\r
  const scaleStyle = { transform: \`scale(\${size})\` };\r
\r
  return (\r
    <div style={scaleStyle} className={className}>\r
      <div className={folderClassName} style={folderStyle} onClick={handleClick}>\r
        <div className="folder__back">\r
          {papers.map((item, i) => (\r
            <div\r
              key={i}\r
              className={\`paper paper-\${i + 1}\`}\r
              onMouseMove={e => handlePaperMouseMove(e, i)}\r
              onMouseLeave={e => handlePaperMouseLeave(e, i)}\r
              style={\r
                open\r
                  ? {\r
                      '--magnet-x': \`\${paperOffsets[i]?.x || 0}px\`,\r
                      '--magnet-y': \`\${paperOffsets[i]?.y || 0}px\`\r
                    }\r
                  : {}\r
              }\r
            >\r
              {item}\r
            </div>\r
          ))}\r
          <div className="folder__front"></div>\r
          <div className="folder__front right"></div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Folder;\r
`,U=`:root {\r
  --folder-color: #70a1ff;\r
  --folder-back-color: #4785ff;\r
  --paper-1: #e6e6e6;\r
  --paper-2: #f2f2f2;\r
  --paper-3: #ffffff;\r
}\r
\r
.folder {\r
  transition: all 0.2s ease-in;\r
  cursor: pointer;\r
}\r
\r
.folder:not(.folder--click):hover {\r
  transform: translateY(-8px);\r
}\r
\r
.folder:not(.folder--click):hover .paper {\r
  transform: translate(-50%, 0%);\r
}\r
\r
.folder:not(.folder--click):hover .folder__front {\r
  transform: skew(15deg) scaleY(0.6);\r
}\r
\r
.folder:not(.folder--click):hover .right {\r
  transform: skew(-15deg) scaleY(0.6);\r
}\r
\r
.folder.open {\r
  transform: translateY(-8px);\r
}\r
\r
.folder.open .paper:nth-child(1) {\r
  transform: translate(-120%, -70%) rotateZ(-15deg);\r
}\r
\r
.folder.open .paper:nth-child(1):hover {\r
  transform: translate(-120%, -70%) rotateZ(-15deg) scale(1.1);\r
}\r
\r
.folder.open .paper:nth-child(2) {\r
  transform: translate(10%, -70%) rotateZ(15deg);\r
  height: 80%;\r
}\r
\r
.folder.open .paper:nth-child(2):hover {\r
  transform: translate(10%, -70%) rotateZ(15deg) scale(1.1);\r
}\r
\r
.folder.open .paper:nth-child(3) {\r
  transform: translate(-50%, -100%) rotateZ(5deg);\r
  height: 80%;\r
}\r
\r
.folder.open .paper:nth-child(3):hover {\r
  transform: translate(-50%, -100%) rotateZ(5deg) scale(1.1);\r
}\r
\r
.folder.open .folder__front {\r
  transform: skew(15deg) scaleY(0.6);\r
}\r
\r
.folder.open .right {\r
  transform: skew(-15deg) scaleY(0.6);\r
}\r
\r
.folder__back {\r
  position: relative;\r
  width: 100px;\r
  height: 80px;\r
  background: var(--folder-back-color);\r
  border-radius: 0px 10px 10px 10px;\r
}\r
\r
.folder__back::after {\r
  position: absolute;\r
  z-index: 0;\r
  bottom: 98%;\r
  left: 0;\r
  content: '';\r
  width: 30px;\r
  height: 10px;\r
  background: var(--folder-back-color);\r
  border-radius: 5px 5px 0 0;\r
}\r
\r
.paper {\r
  position: absolute;\r
  z-index: 2;\r
  bottom: 10%;\r
  left: 50%;\r
  transform: translate(-50%, 10%);\r
  width: 70%;\r
  height: 80%;\r
  background: var(--paper-1);\r
  border-radius: 10px;\r
  transition: all 0.3s ease-in-out;\r
}\r
\r
.paper:nth-child(2) {\r
  background: var(--paper-2);\r
  width: 80%;\r
  height: 70%;\r
}\r
\r
.paper:nth-child(3) {\r
  background: var(--paper-3);\r
  width: 90%;\r
  height: 60%;\r
}\r
\r
.folder__front {\r
  position: absolute;\r
  z-index: 3;\r
  width: 100%;\r
  height: 100%;\r
  background: var(--folder-color);\r
  border-radius: 5px 10px 10px 10px;\r
  transform-origin: bottom;\r
  transition: all 0.3s ease-in-out;\r
}\r
`,W=`import { useState } from 'react';\r
\r
const darkenColor = (hex, percent) => {\r
  let color = hex.startsWith('#') ? hex.slice(1) : hex;\r
  if (color.length === 3) {\r
    color = color\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const num = parseInt(color, 16);\r
  let r = (num >> 16) & 0xff;\r
  let g = (num >> 8) & 0xff;\r
  let b = num & 0xff;\r
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));\r
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));\r
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));\r
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();\r
};\r
\r
const Folder = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {\r
  const maxItems = 3;\r
  const papers = items.slice(0, maxItems);\r
  while (papers.length < maxItems) {\r
    papers.push(null);\r
  }\r
\r
  const [open, setOpen] = useState(false);\r
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));\r
\r
  const folderBackColor = darkenColor(color, 0.08);\r
  const paper1 = darkenColor('#ffffff', 0.1);\r
  const paper2 = darkenColor('#ffffff', 0.05);\r
  const paper3 = '#ffffff';\r
\r
  const handleClick = () => {\r
    setOpen(prev => !prev);\r
    if (open) {\r
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));\r
    }\r
  };\r
\r
  const handlePaperMouseMove = (e, index) => {\r
    if (!open) return;\r
    const rect = e.currentTarget.getBoundingClientRect();\r
    const centerX = rect.left + rect.width / 2;\r
    const centerY = rect.top + rect.height / 2;\r
    const offsetX = (e.clientX - centerX) * 0.15;\r
    const offsetY = (e.clientY - centerY) * 0.15;\r
    setPaperOffsets(prev => {\r
      const newOffsets = [...prev];\r
      newOffsets[index] = { x: offsetX, y: offsetY };\r
      return newOffsets;\r
    });\r
  };\r
\r
  const handlePaperMouseLeave = (e, index) => {\r
    setPaperOffsets(prev => {\r
      const newOffsets = [...prev];\r
      newOffsets[index] = { x: 0, y: 0 };\r
      return newOffsets;\r
    });\r
  };\r
\r
  const folderStyle = {\r
    '--folder-color': color,\r
    '--folder-back-color': folderBackColor,\r
    '--paper-1': paper1,\r
    '--paper-2': paper2,\r
    '--paper-3': paper3\r
  };\r
\r
  const scaleStyle = { transform: \`scale(\${size})\` };\r
\r
  const getOpenTransform = index => {\r
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';\r
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';\r
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';\r
    return '';\r
  };\r
\r
  return (\r
    <div style={scaleStyle} className={className}>\r
      <div\r
        className={\`group relative transition-all duration-200 ease-in cursor-pointer \${\r
          !open ? 'hover:-translate-y-2' : ''\r
        }\`}\r
        style={{\r
          ...folderStyle,\r
          transform: open ? 'translateY(-8px)' : undefined\r
        }}\r
        onClick={handleClick}\r
      >\r
        <div\r
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"\r
          style={{ backgroundColor: folderBackColor }}\r
        >\r
          <span\r
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"\r
            style={{ backgroundColor: folderBackColor }}\r
          ></span>\r
          {papers.map((item, i) => {\r
            let sizeClasses = '';\r
            if (i === 0) sizeClasses = open ? 'w-[70%] h-[80%]' : 'w-[70%] h-[80%]';\r
            if (i === 1) sizeClasses = open ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]';\r
            if (i === 2) sizeClasses = open ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]';\r
\r
            const transformStyle = open\r
              ? \`\${getOpenTransform(i)} translate(\${paperOffsets[i].x}px, \${paperOffsets[i].y}px)\`\r
              : undefined;\r
\r
            return (\r
              <div\r
                key={i}\r
                onMouseMove={e => handlePaperMouseMove(e, i)}\r
                onMouseLeave={e => handlePaperMouseLeave(e, i)}\r
                className={\`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out \${\r
                  !open ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0' : 'hover:scale-110'\r
                } \${sizeClasses}\`}\r
                style={{\r
                  ...(!open ? {} : { transform: transformStyle }),\r
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,\r
                  borderRadius: '10px'\r
                }}\r
              >\r
                {item}\r
              </div>\r
            );\r
          })}\r
          <div\r
            className={\`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out \${\r
              !open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''\r
            }\`}\r
            style={{\r
              backgroundColor: color,\r
              borderRadius: '5px 10px 10px 10px',\r
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' })\r
            }}\r
          ></div>\r
          <div\r
            className={\`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out \${\r
              !open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''\r
            }\`}\r
            style={{\r
              backgroundColor: color,\r
              borderRadius: '5px 10px 10px 10px',\r
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })\r
            }}\r
          ></div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Folder;\r
`,H=`import React, { useState } from 'react';\r
import './Folder.css';\r
\r
interface FolderProps {\r
  color?: string;\r
  size?: number;\r
  items?: React.ReactNode[];\r
  className?: string;\r
}\r
\r
const darkenColor = (hex: string, percent: number): string => {\r
  let color = hex.startsWith('#') ? hex.slice(1) : hex;\r
  if (color.length === 3) {\r
    color = color\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const num = parseInt(color, 16);\r
  let r = (num >> 16) & 0xff;\r
  let g = (num >> 8) & 0xff;\r
  let b = num & 0xff;\r
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));\r
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));\r
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));\r
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();\r
};\r
\r
const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {\r
  const maxItems = 3;\r
  const papers = items.slice(0, maxItems);\r
  while (papers.length < maxItems) {\r
    papers.push(null);\r
  }\r
\r
  const [open, setOpen] = useState(false);\r
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(\r
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))\r
  );\r
\r
  const folderBackColor = darkenColor(color, 0.08);\r
  const paper1 = darkenColor('#ffffff', 0.1);\r
  const paper2 = darkenColor('#ffffff', 0.05);\r
  const paper3 = '#ffffff';\r
\r
  const handleClick = () => {\r
    setOpen(prev => !prev);\r
    if (open) {\r
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));\r
    }\r
  };\r
\r
  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {\r
    if (!open) return;\r
    const rect = e.currentTarget.getBoundingClientRect();\r
    const centerX = rect.left + rect.width / 2;\r
    const centerY = rect.top + rect.height / 2;\r
    const offsetX = (e.clientX - centerX) * 0.15;\r
    const offsetY = (e.clientY - centerY) * 0.15;\r
    setPaperOffsets(prev => {\r
      const newOffsets = [...prev];\r
      newOffsets[index] = { x: offsetX, y: offsetY };\r
      return newOffsets;\r
    });\r
  };\r
\r
  const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {\r
    setPaperOffsets(prev => {\r
      const newOffsets = [...prev];\r
      newOffsets[index] = { x: 0, y: 0 };\r
      return newOffsets;\r
    });\r
  };\r
\r
  const folderStyle: React.CSSProperties = {\r
    '--folder-color': color,\r
    '--folder-back-color': folderBackColor,\r
    '--paper-1': paper1,\r
    '--paper-2': paper2,\r
    '--paper-3': paper3\r
  } as React.CSSProperties;\r
\r
  const folderClassName = \`folder \${open ? 'open' : ''}\`.trim();\r
  const scaleStyle = { transform: \`scale(\${size})\` };\r
\r
  return (\r
    <div style={scaleStyle} className={className}>\r
      <div className={folderClassName} style={folderStyle} onClick={handleClick}>\r
        <div className="folder__back">\r
          {papers.map((item, i) => (\r
            <div\r
              key={i}\r
              className={\`paper paper-\${i + 1}\`}\r
              onMouseMove={e => handlePaperMouseMove(e, i)}\r
              onMouseLeave={e => handlePaperMouseLeave(e, i)}\r
              style={\r
                open\r
                  ? ({\r
                      '--magnet-x': \`\${paperOffsets[i]?.x || 0}px\`,\r
                      '--magnet-y': \`\${paperOffsets[i]?.y || 0}px\`\r
                    } as React.CSSProperties)\r
                  : {}\r
              }\r
            >\r
              {item}\r
            </div>\r
          ))}\r
          <div className="folder__front"></div>\r
          <div className="folder__front right"></div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Folder;\r
`,q=`import React, { useState } from 'react';\r
\r
interface FolderProps {\r
  color?: string;\r
  size?: number;\r
  items?: React.ReactNode[];\r
  className?: string;\r
}\r
\r
const darkenColor = (hex: string, percent: number): string => {\r
  let color = hex.startsWith('#') ? hex.slice(1) : hex;\r
  if (color.length === 3) {\r
    color = color\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const num = parseInt(color, 16);\r
  let r = (num >> 16) & 0xff;\r
  let g = (num >> 8) & 0xff;\r
  let b = num & 0xff;\r
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));\r
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));\r
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));\r
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();\r
};\r
\r
const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {\r
  const maxItems = 3;\r
  const papers = items.slice(0, maxItems);\r
  while (papers.length < maxItems) {\r
    papers.push(null);\r
  }\r
\r
  const [open, setOpen] = useState(false);\r
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(\r
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))\r
  );\r
\r
  const folderBackColor = darkenColor(color, 0.08);\r
  const paper1 = darkenColor('#ffffff', 0.1);\r
  const paper2 = darkenColor('#ffffff', 0.05);\r
  const paper3 = '#ffffff';\r
\r
  const handleClick = () => {\r
    setOpen(prev => !prev);\r
    if (open) {\r
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));\r
    }\r
  };\r
\r
  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {\r
    if (!open) return;\r
    const rect = e.currentTarget.getBoundingClientRect();\r
    const centerX = rect.left + rect.width / 2;\r
    const centerY = rect.top + rect.height / 2;\r
    const offsetX = (e.clientX - centerX) * 0.15;\r
    const offsetY = (e.clientY - centerY) * 0.15;\r
    setPaperOffsets(prev => {\r
      const newOffsets = [...prev];\r
      newOffsets[index] = { x: offsetX, y: offsetY };\r
      return newOffsets;\r
    });\r
  };\r
\r
  const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {\r
    setPaperOffsets(prev => {\r
      const newOffsets = [...prev];\r
      newOffsets[index] = { x: 0, y: 0 };\r
      return newOffsets;\r
    });\r
  };\r
\r
  const folderStyle: React.CSSProperties = {\r
    '--folder-color': color,\r
    '--folder-back-color': folderBackColor,\r
    '--paper-1': paper1,\r
    '--paper-2': paper2,\r
    '--paper-3': paper3\r
  } as React.CSSProperties;\r
\r
  const scaleStyle = { transform: \`scale(\${size})\` };\r
\r
  const getOpenTransform = (index: number) => {\r
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';\r
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';\r
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';\r
    return '';\r
  };\r
\r
  return (\r
    <div style={scaleStyle} className={className}>\r
      <div\r
        className={\`group relative transition-all duration-200 ease-in cursor-pointer \${\r
          !open ? 'hover:-translate-y-2' : ''\r
        }\`}\r
        style={{\r
          ...folderStyle,\r
          transform: open ? 'translateY(-8px)' : undefined\r
        }}\r
        onClick={handleClick}\r
      >\r
        <div\r
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"\r
          style={{ backgroundColor: folderBackColor }}\r
        >\r
          <span\r
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"\r
            style={{ backgroundColor: folderBackColor }}\r
          ></span>\r
          {papers.map((item, i) => {\r
            let sizeClasses = '';\r
            if (i === 0) sizeClasses = open ? 'w-[70%] h-[80%]' : 'w-[70%] h-[80%]';\r
            if (i === 1) sizeClasses = open ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]';\r
            if (i === 2) sizeClasses = open ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]';\r
\r
            const transformStyle = open\r
              ? \`\${getOpenTransform(i)} translate(\${paperOffsets[i].x}px, \${paperOffsets[i].y}px)\`\r
              : undefined;\r
\r
            return (\r
              <div\r
                key={i}\r
                onMouseMove={e => handlePaperMouseMove(e, i)}\r
                onMouseLeave={e => handlePaperMouseLeave(e, i)}\r
                className={\`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out \${\r
                  !open ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0' : 'hover:scale-110'\r
                } \${sizeClasses}\`}\r
                style={{\r
                  ...(!open ? {} : { transform: transformStyle }),\r
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,\r
                  borderRadius: '10px'\r
                }}\r
              >\r
                {item}\r
              </div>\r
            );\r
          })}\r
          <div\r
            className={\`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out \${\r
              !open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''\r
            }\`}\r
            style={{\r
              backgroundColor: color,\r
              borderRadius: '5px 10px 10px 10px',\r
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' })\r
            }}\r
          ></div>\r
          <div\r
            className={\`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out \${\r
              !open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''\r
            }\`}\r
            style={{\r
              backgroundColor: color,\r
              borderRadius: '5px 10px 10px 10px',\r
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })\r
            }}\r
          ></div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Folder;\r
`,G={usage:`import Folder from './Folder'

<div style={{ height: '600px', position: 'relative' }}>
  <Folder size={2} color="#5227FF" className="custom-folder" />
</div>`,code:Z,css:U,tailwind:W,tsCode:H,tsTailwind:q},nr=()=>{const s=[{name:"color",type:"string",default:"#5227FF",description:"The primary color of the folder."},{name:"size",type:"number",default:"1",description:"Scale factor for the folder size."},{name:"items",type:"React.ReactNode[]",default:"[]",description:"An array of up to 3 items rendered as papers in the folder."},{name:"className",type:"string",default:"",description:"Additional CSS classes for the folder container."}],[a,l]=u.useState("#5227FF"),[f,d]=u.useState(2),[t,e]=A();return r.jsxs(I,{children:[r.jsxs(j,{children:[r.jsx(R,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:r.jsx(D,{size:f,color:a,className:"custom-folder"},t)}),r.jsxs(L,{children:[r.jsxs($,{gap:4,align:"center",mt:4,children:[r.jsx(_,{fontSize:"sm",children:"Color"}),r.jsx("input",{type:"color",value:a,onChange:p=>{l(p.target.value),e()}})]}),r.jsx(E,{title:"Size",min:.1,max:3,step:.1,value:f,onChange:p=>{d(p),e()}})]}),r.jsx(X,{data:s})]}),r.jsx(T,{children:r.jsx(B,{codeObject:G})})]})};export{nr as default};
