import{r as u,g as o,j as n,F as $}from"./index-wsKSLPNH.js";import{T as R,P as X,a as C,C as N,b as H}from"./PropTable-C4uPWs8h.js";import{C as k}from"./Customize-1m_ZNqR9.js";import{P as E}from"./PreviewSwitch-DqnF708j.js";import{P as S}from"./PreviewSlider-m1G_aiYP.js";import{R as j}from"./RefreshButton-CA3SFRlq.js";import{D}from"./Dependencies-BHoMfJUj.js";import{u as P}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";function B({className:h="",images:a=[],containerWidth:d=400,containerHeight:b=400,animationDelay:i=.5,animationStagger:f=.06,easeType:c="elastic.out(1, 0.8)",transformStyles:l=["rotate(10deg) translate(-170px)","rotate(5deg) translate(-85px)","rotate(-3deg)","rotate(-10deg) translate(85px)","rotate(2deg) translate(170px)"],enableHover:g=!0}){u.useEffect(()=>{o.fromTo(".card",{scale:0},{scale:1,stagger:f,ease:c,delay:i})},[f,c,i]);const x=r=>/rotate\([\s\S]*?\)/.test(r)?r.replace(/rotate\([\s\S]*?\)/,"rotate(0deg)"):r==="none"?"rotate(0deg)":`${r} rotate(0deg)`,y=(r,e)=>{const t=/translate\(([-0-9.]+)px\)/,m=r.match(t);if(m){const T=parseFloat(m[1])+e;return r.replace(t,`translate(${T}px)`)}else return r==="none"?`translate(${e}px)`:`${r} translate(${e}px)`},s=r=>{g&&a.forEach((e,t)=>{o.killTweensOf(`.card-${t}`);const m=l[t]||"none";if(t===r){const p=x(m);o.to(`.card-${t}`,{transform:p,duration:.4,ease:"back.out(1.4)",overwrite:"auto"})}else{const p=t<r?-160:160,T=y(m,p),w=Math.abs(r-t)*.05;o.to(`.card-${t}`,{transform:T,duration:.4,ease:"back.out(1.4)",delay:w,overwrite:"auto"})}})},v=()=>{g&&a.forEach((r,e)=>{o.killTweensOf(`.card-${e}`);const t=l[e]||"none";o.to(`.card-${e}`,{transform:t,duration:.4,ease:"back.out(1.4)",overwrite:"auto"})})};return n.jsx("div",{className:`bounceCardsContainer ${h}`,style:{position:"relative",width:d,height:b},children:a.map((r,e)=>n.jsx("div",{className:`card card-${e}`,style:{transform:l[e]??"none"},onMouseEnter:()=>s(e),onMouseLeave:v,children:n.jsx("img",{className:"image",src:r,alt:`card-${e}`})},e))})}const I=`import { useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import './BounceCards.css';\r
\r
export default function BounceCards({\r
  className = '',\r
  images = [],\r
  containerWidth = 400,\r
  containerHeight = 400,\r
  animationDelay = 0.5,\r
  animationStagger = 0.06,\r
  easeType = 'elastic.out(1, 0.8)',\r
  transformStyles = [\r
    'rotate(10deg) translate(-170px)',\r
    'rotate(5deg) translate(-85px)',\r
    'rotate(-3deg)',\r
    'rotate(-10deg) translate(85px)',\r
    'rotate(2deg) translate(170px)'\r
  ],\r
  enableHover = true\r
}) {\r
  useEffect(() => {\r
    gsap.fromTo(\r
      '.card',\r
      { scale: 0 },\r
      {\r
        scale: 1,\r
        stagger: animationStagger,\r
        ease: easeType,\r
        delay: animationDelay\r
      }\r
    );\r
  }, [animationStagger, easeType, animationDelay]);\r
\r
  const getNoRotationTransform = transformStr => {\r
    const hasRotate = /rotate\\([\\s\\S]*?\\)/.test(transformStr);\r
    if (hasRotate) {\r
      return transformStr.replace(/rotate\\([\\s\\S]*?\\)/, 'rotate(0deg)');\r
    } else if (transformStr === 'none') {\r
      return 'rotate(0deg)';\r
    } else {\r
      return \`\${transformStr} rotate(0deg)\`;\r
    }\r
  };\r
\r
  const getPushedTransform = (baseTransform, offsetX) => {\r
    const translateRegex = /translate\\(([-0-9.]+)px\\)/;\r
    const match = baseTransform.match(translateRegex);\r
    if (match) {\r
      const currentX = parseFloat(match[1]);\r
      const newX = currentX + offsetX;\r
      return baseTransform.replace(translateRegex, \`translate(\${newX}px)\`);\r
    } else {\r
      return baseTransform === 'none' ? \`translate(\${offsetX}px)\` : \`\${baseTransform} translate(\${offsetX}px)\`;\r
    }\r
  };\r
\r
  const pushSiblings = hoveredIdx => {\r
    if (!enableHover) return;\r
    images.forEach((_, i) => {\r
      gsap.killTweensOf(\`.card-\${i}\`);\r
\r
      const baseTransform = transformStyles[i] || 'none';\r
\r
      if (i === hoveredIdx) {\r
        const noRotationTransform = getNoRotationTransform(baseTransform);\r
        gsap.to(\`.card-\${i}\`, {\r
          transform: noRotationTransform,\r
          duration: 0.4,\r
          ease: 'back.out(1.4)',\r
          overwrite: 'auto'\r
        });\r
      } else {\r
        const offsetX = i < hoveredIdx ? -160 : 160;\r
        const pushedTransform = getPushedTransform(baseTransform, offsetX);\r
\r
        const distance = Math.abs(hoveredIdx - i);\r
        const delay = distance * 0.05;\r
\r
        gsap.to(\`.card-\${i}\`, {\r
          transform: pushedTransform,\r
          duration: 0.4,\r
          ease: 'back.out(1.4)',\r
          delay,\r
          overwrite: 'auto'\r
        });\r
      }\r
    });\r
  };\r
\r
  const resetSiblings = () => {\r
    if (!enableHover) return;\r
    images.forEach((_, i) => {\r
      gsap.killTweensOf(\`.card-\${i}\`);\r
      const baseTransform = transformStyles[i] || 'none';\r
      gsap.to(\`.card-\${i}\`, {\r
        transform: baseTransform,\r
        duration: 0.4,\r
        ease: 'back.out(1.4)',\r
        overwrite: 'auto'\r
      });\r
    });\r
  };\r
\r
  return (\r
    <div\r
      className={\`bounceCardsContainer \${className}\`}\r
      style={{\r
        position: 'relative',\r
        width: containerWidth,\r
        height: containerHeight\r
      }}\r
    >\r
      {images.map((src, idx) => (\r
        <div\r
          key={idx}\r
          className={\`card card-\${idx}\`}\r
          style={{\r
            transform: transformStyles[idx] ?? 'none'\r
          }}\r
          onMouseEnter={() => pushSiblings(idx)}\r
          onMouseLeave={resetSiblings}\r
        >\r
          <img className="image" src={src} alt={\`card-\${idx}\`} />\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
`,M=`.bounceCardsContainer {\r
  position: relative;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  width: 400px;\r
  height: 400px;\r
}\r
\r
.card {\r
  position: absolute;\r
  width: 200px;\r
  aspect-ratio: 1;\r
  border: 5px solid #fff;\r
  border-radius: 25px;\r
  overflow: hidden;\r
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\r
}\r
\r
.card .image {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
}\r
`,W=`import { useEffect } from 'react';\r
import { gsap } from 'gsap';\r
\r
export default function BounceCards({\r
  className = '',\r
  images = [],\r
  containerWidth = 400,\r
  containerHeight = 400,\r
  animationDelay = 0.5,\r
  animationStagger = 0.06,\r
  easeType = 'elastic.out(1, 0.8)',\r
  transformStyles = [\r
    'rotate(10deg) translate(-170px)',\r
    'rotate(5deg) translate(-85px)',\r
    'rotate(-3deg)',\r
    'rotate(-10deg) translate(85px)',\r
    'rotate(2deg) translate(170px)'\r
  ],\r
  enableHover = false\r
}) {\r
  useEffect(() => {\r
    gsap.fromTo(\r
      '.card',\r
      { scale: 0 },\r
      {\r
        scale: 1,\r
        stagger: animationStagger,\r
        ease: easeType,\r
        delay: animationDelay\r
      }\r
    );\r
  }, [animationDelay, animationStagger, easeType]);\r
\r
  const getNoRotationTransform = transformStr => {\r
    const hasRotate = /rotate\\([\\s\\S]*?\\)/.test(transformStr);\r
    if (hasRotate) {\r
      return transformStr.replace(/rotate\\([\\s\\S]*?\\)/, 'rotate(0deg)');\r
    } else if (transformStr === 'none') {\r
      return 'rotate(0deg)';\r
    } else {\r
      return \`\${transformStr} rotate(0deg)\`;\r
    }\r
  };\r
\r
  const getPushedTransform = (baseTransform, offsetX) => {\r
    const translateRegex = /translate\\(([-0-9.]+)px\\)/;\r
    const match = baseTransform.match(translateRegex);\r
    if (match) {\r
      const currentX = parseFloat(match[1]);\r
      const newX = currentX + offsetX;\r
      return baseTransform.replace(translateRegex, \`translate(\${newX}px)\`);\r
    } else {\r
      return baseTransform === 'none' ? \`translate(\${offsetX}px)\` : \`\${baseTransform} translate(\${offsetX}px)\`;\r
    }\r
  };\r
\r
  const pushSiblings = hoveredIdx => {\r
    if (!enableHover) return;\r
\r
    images.forEach((_, i) => {\r
      const selector = \`.card-\${i}\`;\r
      gsap.killTweensOf(selector);\r
\r
      const baseTransform = transformStyles[i] || 'none';\r
\r
      if (i === hoveredIdx) {\r
        const noRotation = getNoRotationTransform(baseTransform);\r
        gsap.to(selector, {\r
          transform: noRotation,\r
          duration: 0.4,\r
          ease: 'back.out(1.4)',\r
          overwrite: 'auto'\r
        });\r
      } else {\r
        const offsetX = i < hoveredIdx ? -160 : 160;\r
        const pushedTransform = getPushedTransform(baseTransform, offsetX);\r
\r
        const distance = Math.abs(hoveredIdx - i);\r
        const delay = distance * 0.05;\r
\r
        gsap.to(selector, {\r
          transform: pushedTransform,\r
          duration: 0.4,\r
          ease: 'back.out(1.4)',\r
          delay,\r
          overwrite: 'auto'\r
        });\r
      }\r
    });\r
  };\r
\r
  const resetSiblings = () => {\r
    if (!enableHover) return;\r
\r
    images.forEach((_, i) => {\r
      const selector = \`.card-\${i}\`;\r
      gsap.killTweensOf(selector);\r
\r
      const baseTransform = transformStyles[i] || 'none';\r
      gsap.to(selector, {\r
        transform: baseTransform,\r
        duration: 0.4,\r
        ease: 'back.out(1.4)',\r
        overwrite: 'auto'\r
      });\r
    });\r
  };\r
\r
  return (\r
    <div\r
      className={\`relative flex items-center justify-center \${className}\`}\r
      style={{\r
        width: containerWidth,\r
        height: containerHeight\r
      }}\r
    >\r
      {images.map((src, idx) => (\r
        <div\r
          key={idx}\r
          className={\`card card-\${idx} absolute w-[200px] aspect-square border-8 border-white rounded-[30px] overflow-hidden\`}\r
          style={{\r
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',\r
            transform: transformStyles[idx] || 'none'\r
          }}\r
          onMouseEnter={() => pushSiblings(idx)}\r
          onMouseLeave={resetSiblings}\r
        >\r
          <img className="w-full h-full object-cover" src={src} alt={\`card-\${idx}\`} />\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
`,O=`import { useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import './BounceCards.css';\r
\r
interface BounceCardsProps {\r
  className?: string;\r
  images?: string[];\r
  containerWidth?: number;\r
  containerHeight?: number;\r
  animationDelay?: number;\r
  animationStagger?: number;\r
  easeType?: string;\r
  transformStyles?: string[];\r
  enableHover?: boolean;\r
}\r
\r
export default function BounceCards({\r
  className = '',\r
  images = [],\r
  containerWidth = 400,\r
  containerHeight = 400,\r
  animationDelay = 0.5,\r
  animationStagger = 0.06,\r
  easeType = 'elastic.out(1, 0.8)',\r
  transformStyles = [\r
    'rotate(10deg) translate(-170px)',\r
    'rotate(5deg) translate(-85px)',\r
    'rotate(-3deg)',\r
    'rotate(-10deg) translate(85px)',\r
    'rotate(2deg) translate(170px)'\r
  ],\r
  enableHover = false\r
}: BounceCardsProps) {\r
  useEffect(() => {\r
    gsap.fromTo(\r
      '.card',\r
      { scale: 0 },\r
      {\r
        scale: 1,\r
        stagger: animationStagger,\r
        ease: easeType,\r
        delay: animationDelay\r
      }\r
    );\r
  }, [animationStagger, easeType, animationDelay]);\r
\r
  const getNoRotationTransform = (transformStr: string): string => {\r
    const hasRotate = /rotate\\([\\s\\S]*?\\)/.test(transformStr);\r
    if (hasRotate) {\r
      return transformStr.replace(/rotate\\([\\s\\S]*?\\)/, 'rotate(0deg)');\r
    } else if (transformStr === 'none') {\r
      return 'rotate(0deg)';\r
    } else {\r
      return \`\${transformStr} rotate(0deg)\`;\r
    }\r
  };\r
\r
  const getPushedTransform = (baseTransform: string, offsetX: number): string => {\r
    const translateRegex = /translate\\(([-0-9.]+)px\\)/;\r
    const match = baseTransform.match(translateRegex);\r
    if (match) {\r
      const currentX = parseFloat(match[1]);\r
      const newX = currentX + offsetX;\r
      return baseTransform.replace(translateRegex, \`translate(\${newX}px)\`);\r
    } else {\r
      return baseTransform === 'none' ? \`translate(\${offsetX}px)\` : \`\${baseTransform} translate(\${offsetX}px)\`;\r
    }\r
  };\r
\r
  const pushSiblings = (hoveredIdx: number) => {\r
    if (!enableHover) return;\r
\r
    images.forEach((_, i) => {\r
      gsap.killTweensOf(\`.card-\${i}\`);\r
\r
      const baseTransform = transformStyles[i] || 'none';\r
\r
      if (i === hoveredIdx) {\r
        const noRotation = getNoRotationTransform(baseTransform);\r
        gsap.to(\`.card-\${i}\`, {\r
          transform: noRotation,\r
          duration: 0.4,\r
          ease: 'back.out(1.4)',\r
          overwrite: 'auto'\r
        });\r
      } else {\r
        const offsetX = i < hoveredIdx ? -160 : 160;\r
        const pushedTransform = getPushedTransform(baseTransform, offsetX);\r
\r
        const distance = Math.abs(hoveredIdx - i);\r
        const delay = distance * 0.05;\r
\r
        gsap.to(\`.card-\${i}\`, {\r
          transform: pushedTransform,\r
          duration: 0.4,\r
          ease: 'back.out(1.4)',\r
          delay,\r
          overwrite: 'auto'\r
        });\r
      }\r
    });\r
  };\r
\r
  const resetSiblings = () => {\r
    if (!enableHover) return;\r
\r
    images.forEach((_, i) => {\r
      gsap.killTweensOf(\`.card-\${i}\`);\r
      const baseTransform = transformStyles[i] || 'none';\r
      gsap.to(\`.card-\${i}\`, {\r
        transform: baseTransform,\r
        duration: 0.4,\r
        ease: 'back.out(1.4)',\r
        overwrite: 'auto'\r
      });\r
    });\r
  };\r
\r
  return (\r
    <div\r
      className={\`bounceCardsContainer \${className}\`}\r
      style={{\r
        position: 'relative',\r
        width: containerWidth,\r
        height: containerHeight\r
      }}\r
    >\r
      {images.map((src, idx) => (\r
        <div\r
          key={idx}\r
          className={\`card card-\${idx}\`}\r
          style={{ transform: transformStyles[idx] ?? 'none' }}\r
          onMouseEnter={() => pushSiblings(idx)}\r
          onMouseLeave={resetSiblings}\r
        >\r
          <img className="image" src={src} alt={\`card-\${idx}\`} />\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
`,_=`import { useEffect } from 'react';\r
import { gsap } from 'gsap';\r
\r
interface BounceCardsProps {\r
  className?: string;\r
  images?: string[];\r
  containerWidth?: number;\r
  containerHeight?: number;\r
  animationDelay?: number;\r
  animationStagger?: number;\r
  easeType?: string;\r
  transformStyles?: string[];\r
  enableHover?: boolean;\r
}\r
\r
export default function BounceCards({\r
  className = '',\r
  images = [],\r
  containerWidth = 400,\r
  containerHeight = 400,\r
  animationDelay = 0.5,\r
  animationStagger = 0.06,\r
  easeType = 'elastic.out(1, 0.8)',\r
  transformStyles = [\r
    'rotate(10deg) translate(-170px)',\r
    'rotate(5deg) translate(-85px)',\r
    'rotate(-3deg)',\r
    'rotate(-10deg) translate(85px)',\r
    'rotate(2deg) translate(170px)'\r
  ],\r
  enableHover = false\r
}: BounceCardsProps) {\r
  useEffect(() => {\r
    gsap.fromTo(\r
      '.card',\r
      { scale: 0 },\r
      {\r
        scale: 1,\r
        stagger: animationStagger,\r
        ease: easeType,\r
        delay: animationDelay\r
      }\r
    );\r
  }, [animationDelay, animationStagger, easeType]);\r
\r
  const getNoRotationTransform = (transformStr: string): string => {\r
    const hasRotate = /rotate\\([\\s\\S]*?\\)/.test(transformStr);\r
    if (hasRotate) {\r
      return transformStr.replace(/rotate\\([\\s\\S]*?\\)/, 'rotate(0deg)');\r
    } else if (transformStr === 'none') {\r
      return 'rotate(0deg)';\r
    } else {\r
      return \`\${transformStr} rotate(0deg)\`;\r
    }\r
  };\r
\r
  const getPushedTransform = (baseTransform: string, offsetX: number): string => {\r
    const translateRegex = /translate\\(([-0-9.]+)px\\)/;\r
    const match = baseTransform.match(translateRegex);\r
    if (match) {\r
      const currentX = parseFloat(match[1]);\r
      const newX = currentX + offsetX;\r
      return baseTransform.replace(translateRegex, \`translate(\${newX}px)\`);\r
    } else {\r
      return baseTransform === 'none' ? \`translate(\${offsetX}px)\` : \`\${baseTransform} translate(\${offsetX}px)\`;\r
    }\r
  };\r
\r
  const pushSiblings = (hoveredIdx: number) => {\r
    if (!enableHover) return;\r
\r
    images.forEach((_, i) => {\r
      const selector = \`.card-\${i}\`;\r
      gsap.killTweensOf(selector);\r
\r
      const baseTransform = transformStyles[i] || 'none';\r
\r
      if (i === hoveredIdx) {\r
        const noRotation = getNoRotationTransform(baseTransform);\r
        gsap.to(selector, {\r
          transform: noRotation,\r
          duration: 0.4,\r
          ease: 'back.out(1.4)',\r
          overwrite: 'auto'\r
        });\r
      } else {\r
        const offsetX = i < hoveredIdx ? -160 : 160;\r
        const pushedTransform = getPushedTransform(baseTransform, offsetX);\r
\r
        const distance = Math.abs(hoveredIdx - i);\r
        const delay = distance * 0.05;\r
\r
        gsap.to(selector, {\r
          transform: pushedTransform,\r
          duration: 0.4,\r
          ease: 'back.out(1.4)',\r
          delay,\r
          overwrite: 'auto'\r
        });\r
      }\r
    });\r
  };\r
\r
  const resetSiblings = () => {\r
    if (!enableHover) return;\r
\r
    images.forEach((_, i) => {\r
      const selector = \`.card-\${i}\`;\r
      gsap.killTweensOf(selector);\r
\r
      const baseTransform = transformStyles[i] || 'none';\r
      gsap.to(selector, {\r
        transform: baseTransform,\r
        duration: 0.4,\r
        ease: 'back.out(1.4)',\r
        overwrite: 'auto'\r
      });\r
    });\r
  };\r
\r
  return (\r
    <div\r
      className={\`relative flex items-center justify-center \${className}\`}\r
      style={{\r
        width: containerWidth,\r
        height: containerHeight\r
      }}\r
    >\r
      {images.map((src, idx) => (\r
        <div\r
          key={idx}\r
          className={\`card card-\${idx} absolute w-[200px] aspect-square border-8 border-white rounded-[30px] overflow-hidden\`}\r
          style={{\r
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',\r
            transform: transformStyles[idx] || 'none'\r
          }}\r
          onMouseEnter={() => pushSiblings(idx)}\r
          onMouseLeave={resetSiblings}\r
        >\r
          <img className="w-full h-full object-cover" src={src} alt={\`card-\${idx}\`} />\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
`,F={dependencies:"gsap",usage:`import BounceCards from './BounceCards'

const images = [
  "https://picsum.photos/400/400?grayscale",
  "https://picsum.photos/500/500?grayscale",
  "https://picsum.photos/600/600?grayscale",
  "https://picsum.photos/700/700?grayscale",
  "https://picsum.photos/300/300?grayscale"
];

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)"
];

<BounceCards
  className="custom-bounceCards"
  images={images}
  containerWidth={500}
  containerHeight={250}
  animationDelay={1}
  animationStagger={0.08}
  easeType="elastic.out(1, 0.5)"
  transformStyles={transformStyles}
  enableHover={false}
/>`,code:I,css:M,tailwind:W,tsTailwind:_,tsCode:O},Y=()=>{const[h,a]=P(),[d,b]=u.useState(!1),[i,f]=u.useState(1),[c,l]=u.useState(.08),g=["https://picsum.photos/400/400?grayscale","https://picsum.photos/500/500?grayscale","https://picsum.photos/600/600?grayscale","https://picsum.photos/700/700?grayscale","https://picsum.photos/300/300?grayscale"],x=["rotate(5deg) translate(-150px)","rotate(0deg) translate(-70px)","rotate(-5deg)","rotate(5deg) translate(70px)","rotate(-5deg) translate(150px)"],y=[{name:"className",type:"string",default:"",description:"Additional CSS classes for the container."},{name:"images",type:"string[]",default:"[]",description:"Array of image URLs to display."},{name:"containerWidth",type:"number",default:400,description:"Width of the container (px)."},{name:"containerHeight",type:"number",default:400,description:"Height of the container (px)."},{name:"animationDelay",type:"number",default:.5,description:"Delay (in seconds) before the animation starts."},{name:"animationStagger",type:"number",default:.06,description:"Time (in seconds) between each card's animation."},{name:"easeType",type:"string",default:"elastic.out(1, 0.8)",description:"Easing function for the bounce."},{name:"transformStyles",type:"string[]",default:"various rotations/translations",description:"Custom transforms for each card position."},{name:"enableHover",type:"boolean",default:"false",description:"If true, hovering pushes siblings aside and flattens the hovered card's rotation."}];return n.jsxs(R,{children:[n.jsxs(X,{children:[n.jsxs($,{overflow:"hidden",justifyContent:"center",alignItems:"center",minH:"400px",position:"relative",pb:"4em",className:"demo-container",children:[n.jsx(B,{className:"custom-bounceCards",images:g,containerWidth:500,containerHeight:250,animationDelay:i,animationStagger:c,easeType:"elastic.out(1, 0.5)",transformStyles:x,enableHover:d},h),n.jsx(j,{onClick:a})]}),n.jsxs(k,{children:[n.jsx(E,{title:"Enable Hover Effect",isChecked:d,onChange:s=>{b(s),a()}}),n.jsx(S,{title:"Animation Delay",min:.1,max:2,step:.1,value:i,onChange:s=>{f(s),a()}}),n.jsx(S,{title:"Animation Stagger",min:0,max:.3,step:.01,value:c,onChange:s=>{l(s),a()}})]}),n.jsx(C,{data:y}),n.jsx(D,{dependencyList:["gsap"]})]}),n.jsx(N,{children:n.jsx(H,{codeObject:F})})]})};export{Y as default};
