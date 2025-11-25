import{r as g,bz as Q,g as Y,j as o,B as eD}from"./index-wsKSLPNH.js";import{T as rD,P as nD,a as tD,C as sD,b as iD}from"./PropTable-C4uPWs8h.js";import{C as aD}from"./Customize-1m_ZNqR9.js";import{D as oD}from"./Dependencies-BHoMfJUj.js";import{P as q}from"./PreviewSlider-m1G_aiYP.js";import{P as cD}from"./PreviewInput-C0y58bk9.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const lD=`import { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
import { SplitText } from 'gsap/SplitText';\r
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';\r
\r
import './ScrambledText.css';\r
\r
gsap.registerPlugin(SplitText, ScrambleTextPlugin);\r
\r
const ScrambledText = ({\r
  radius = 100,\r
  duration = 1.2,\r
  speed = 0.5,\r
  scrambleChars = '.:',\r
  className = '',\r
  style = {},\r
  children\r
}) => {\r
  const rootRef = useRef(null);\r
  const charsRef = useRef([]);\r
\r
  useEffect(() => {\r
    if (!rootRef.current) return;\r
\r
    const split = SplitText.create(rootRef.current.querySelector('p'), {\r
      type: 'chars',\r
      charsClass: 'char'\r
    });\r
    charsRef.current = split.chars;\r
\r
    charsRef.current.forEach(c => {\r
      gsap.set(c, {\r
        display: 'inline-block',\r
        attr: { 'data-content': c.innerHTML }\r
      });\r
    });\r
\r
    const handleMove = e => {\r
      charsRef.current.forEach(c => {\r
        const { left, top, width, height } = c.getBoundingClientRect();\r
        const dx = e.clientX - (left + width / 2);\r
        const dy = e.clientY - (top + height / 2);\r
        const dist = Math.hypot(dx, dy);\r
\r
        if (dist < radius) {\r
          gsap.to(c, {\r
            overwrite: true,\r
            duration: duration * (1 - dist / radius),\r
            scrambleText: {\r
              text: c.dataset.content || '',\r
              chars: scrambleChars,\r
              speed\r
            },\r
            ease: 'none'\r
          });\r
        }\r
      });\r
    };\r
\r
    const el = rootRef.current;\r
    el.addEventListener('pointermove', handleMove);\r
\r
    return () => {\r
      el.removeEventListener('pointermove', handleMove);\r
      split.revert();\r
    };\r
  }, [radius, duration, speed, scrambleChars]);\r
\r
  return (\r
    <div ref={rootRef} className={\`text-block \${className}\`} style={style}>\r
      <p>{children}</p>\r
    </div>\r
  );\r
};\r
\r
export default ScrambledText;\r
`,CD=`.text-block {\r
  margin: 7vw;\r
  max-width: 800px;\r
  font-family: monospace;\r
  font-size: clamp(14px, 4vw, 32px);\r
  color: #fff;\r
}\r
\r
.char {\r
  will-change: transform;\r
  display: inline-block;\r
}\r
`,FD=`import { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
import { SplitText } from 'gsap/SplitText';\r
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';\r
\r
gsap.registerPlugin(SplitText, ScrambleTextPlugin);\r
\r
const ScrambledText = ({\r
  radius = 100,\r
  duration = 1.2,\r
  speed = 0.5,\r
  scrambleChars = '.:',\r
  className = '',\r
  style = {},\r
  children\r
}) => {\r
  const rootRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!rootRef.current) return;\r
\r
    const split = SplitText.create(rootRef.current.querySelector('p'), {\r
      type: 'chars',\r
      charsClass: 'inline-block will-change-transform'\r
    });\r
\r
    split.chars.forEach(el => {\r
      const c = el;\r
      gsap.set(c, { attr: { 'data-content': c.innerHTML } });\r
    });\r
\r
    const handleMove = e => {\r
      split.chars.forEach(el => {\r
        const c = el;\r
        const { left, top, width, height } = c.getBoundingClientRect();\r
        const dx = e.clientX - (left + width / 2);\r
        const dy = e.clientY - (top + height / 2);\r
        const dist = Math.hypot(dx, dy);\r
\r
        if (dist < radius) {\r
          gsap.to(c, {\r
            overwrite: true,\r
            duration: duration * (1 - dist / radius),\r
            scrambleText: {\r
              text: c.dataset.content || '',\r
              chars: scrambleChars,\r
              speed\r
            },\r
            ease: 'none'\r
          });\r
        }\r
      });\r
    };\r
\r
    const el = rootRef.current;\r
    el.addEventListener('pointermove', handleMove);\r
\r
    return () => {\r
      el.removeEventListener('pointermove', handleMove);\r
      split.revert();\r
    };\r
  }, [radius, duration, speed, scrambleChars]);\r
\r
  return (\r
    <div\r
      ref={rootRef}\r
      className={\`m-[7vw] max-w-[800px] font-mono text-[clamp(14px,4vw,32px)] text-white \${className}\`}\r
      style={style}\r
    >\r
      <p>{children}</p>\r
    </div>\r
  );\r
};\r
\r
export default ScrambledText;\r
`,ED=`import React, { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
import { SplitText } from 'gsap/SplitText';\r
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';\r
\r
import './ScrambledText.css';\r
\r
gsap.registerPlugin(SplitText, ScrambleTextPlugin);\r
\r
export interface ScrambledTextProps {\r
  radius?: number;\r
  duration?: number;\r
  speed?: number;\r
  scrambleChars?: string;\r
  className?: string;\r
  style?: React.CSSProperties;\r
  children: React.ReactNode;\r
}\r
\r
const ScrambledText: React.FC<ScrambledTextProps> = ({\r
  radius = 100,\r
  duration = 1.2,\r
  speed = 0.5,\r
  scrambleChars = '.:',\r
  className = '',\r
  style = {},\r
  children\r
}) => {\r
  const rootRef = useRef<HTMLDivElement | null>(null);\r
  const charsRef = useRef<HTMLElement[]>([]);\r
\r
  useEffect(() => {\r
    if (!rootRef.current) return;\r
\r
    const split = SplitText.create(rootRef.current.querySelector('p'), {\r
      type: 'chars',\r
      charsClass: 'char'\r
    });\r
    charsRef.current = split.chars as HTMLElement[];\r
\r
    charsRef.current.forEach(c => {\r
      gsap.set(c, {\r
        display: 'inline-block',\r
        attr: { 'data-content': c.innerHTML }\r
      });\r
    });\r
\r
    const handleMove = (e: PointerEvent) => {\r
      charsRef.current.forEach(c => {\r
        const { left, top, width, height } = c.getBoundingClientRect();\r
        const dx = e.clientX - (left + width / 2);\r
        const dy = e.clientY - (top + height / 2);\r
        const dist = Math.hypot(dx, dy);\r
\r
        if (dist < radius) {\r
          gsap.to(c, {\r
            overwrite: true,\r
            duration: duration * (1 - dist / radius),\r
            scrambleText: {\r
              text: (c as HTMLElement).dataset.content || '',\r
              chars: scrambleChars,\r
              speed\r
            },\r
            ease: 'none'\r
          });\r
        }\r
      });\r
    };\r
\r
    const el = rootRef.current;\r
    el.addEventListener('pointermove', handleMove);\r
\r
    return () => {\r
      el.removeEventListener('pointermove', handleMove);\r
      split.revert();\r
    };\r
  }, [radius, duration, speed, scrambleChars]);\r
\r
  return (\r
    <div ref={rootRef} className={\`text-block \${className}\`} style={style}>\r
      <p>{children}</p>\r
    </div>\r
  );\r
};\r
\r
export default ScrambledText;\r
`,pD=`import React, { useEffect, useRef } from 'react';\r
import { gsap } from 'gsap';\r
import { SplitText } from 'gsap/SplitText';\r
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';\r
\r
gsap.registerPlugin(SplitText, ScrambleTextPlugin);\r
\r
export interface ScrambledTextProps {\r
  radius?: number;\r
  duration?: number;\r
  speed?: number;\r
  scrambleChars?: string;\r
  className?: string;\r
  style?: React.CSSProperties;\r
  children: React.ReactNode;\r
}\r
\r
const ScrambledText: React.FC<ScrambledTextProps> = ({\r
  radius = 100,\r
  duration = 1.2,\r
  speed = 0.5,\r
  scrambleChars = '.:',\r
  className = '',\r
  style = {},\r
  children\r
}) => {\r
  const rootRef = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    if (!rootRef.current) return;\r
\r
    const split = SplitText.create(rootRef.current.querySelector('p'), {\r
      type: 'chars',\r
      charsClass: 'inline-block will-change-transform'\r
    });\r
\r
    split.chars.forEach(el => {\r
      const c = el as HTMLElement;\r
      gsap.set(c, { attr: { 'data-content': c.innerHTML } });\r
    });\r
\r
    const handleMove = (e: PointerEvent) => {\r
      split.chars.forEach(el => {\r
        const c = el as HTMLElement;\r
        const { left, top, width, height } = c.getBoundingClientRect();\r
        const dx = e.clientX - (left + width / 2);\r
        const dy = e.clientY - (top + height / 2);\r
        const dist = Math.hypot(dx, dy);\r
\r
        if (dist < radius) {\r
          gsap.to(c, {\r
            overwrite: true,\r
            duration: duration * (1 - dist / radius),\r
            scrambleText: {\r
              text: c.dataset.content || '',\r
              chars: scrambleChars,\r
              speed\r
            },\r
            ease: 'none'\r
          });\r
        }\r
      });\r
    };\r
\r
    const el = rootRef.current;\r
    el.addEventListener('pointermove', handleMove);\r
\r
    return () => {\r
      el.removeEventListener('pointermove', handleMove);\r
      split.revert();\r
    };\r
  }, [radius, duration, speed, scrambleChars]);\r
\r
  return (\r
    <div\r
      ref={rootRef}\r
      className={\`m-[7vw] max-w-[800px] font-mono text-[clamp(14px,4vw,32px)] text-white \${className}\`}\r
      style={style}\r
    >\r
      <p>{children}</p>\r
    </div>\r
  );\r
};\r
\r
export default ScrambledText;\r
`,dD={dependencies:"gsap",usage:`// Component inspired by Tom Miller from the GSAP community
// https://codepen.io/creativeocean/pen/NPWLwJM

import ScrambledText from './ScrambledText';
  
<ScrambledText
  className="scrambled-text-demo"
  radius={100}
  duration={1.2}
  speed={0.5}
  scrambleChars={.:}
>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Similique pariatur dignissimos porro eius quam doloremque 
  et enim velit nobis maxime.
</ScrambledText>`,code:lD,css:CD,tailwind:FD,tsCode:ED,tsTailwind:pD};/*!
 * strings: 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var mD=/(?:^\s+|\s+$)/g,hD=/([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2642\u2640]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDD27\uDCBC\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCC\uDFCB]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;function X(e){var r=e.nodeType,D="";if(r===1||r===9||r===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)D+=X(e)}else if(r===3||r===4)return e.nodeValue;return D}function p(e,r,D,s,a){if(e+="",D&&(e=e.trim?e.trim():e.replace(mD,"")),r&&r!=="")return e.replace(/>/g,"&gt;").replace(/</g,"&lt;").split(r);for(var c=[],i=e.length,n=0,u,t;n<i;n++)t=e.charAt(n),(t.charCodeAt(0)>=55296&&t.charCodeAt(0)<=56319||e.charCodeAt(n+1)>=65024&&e.charCodeAt(n+1)<=65039)&&(u=((e.substr(n,12).split(hD)||[])[1]||"").length||2,t=e.substr(n,u),c.emoji=1,n+=u-1),c.push(a?t:t===">"?"&gt;":t==="<"?"&lt;":s&&t===" "&&(e.charAt(n-1)===" "||e.charAt(n+1)===" ")?"&nbsp;":t);return c}/*!
 * ScrambleTextPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var j=function(){function e(D){this.chars=p(D),this.sets=[],this.length=50;for(var s=0;s<20;s++)this.sets[s]=W(80,this.chars)}var r=e.prototype;return r.grow=function(s){for(var a=0;a<20;a++)this.sets[a]+=W(s-this.length,this.chars);this.length=s},e}(),B,U,Z=function(){return B||typeof window<"u"&&(B=window.gsap)&&B.registerPlugin&&B},fD=1,V=/\s+/g,W=function(r,D){for(var s=D.length,a="";--r>-1;)a+=D[~~(Math.random()*s)];return a},O="ABCDEFGHIJKLMNOPQRSTUVWXYZ",J=O.toLowerCase(),xD={upperCase:new j(O),lowerCase:new j(J),upperAndLowerCase:new j(O+J)},K=function(){U=B=Z()},P={version:"3.13.0",name:"scrambleText",register:function(r,D,s){B=r,K()},init:function(r,D,s,a,c){if(U||K(),this.prop="innerHTML"in r?"innerHTML":"textContent"in r?"textContent":0,!!this.prop){this.target=r,typeof D!="object"&&(D={text:D});var i=D.text||D.value||"",n=D.trim!==!1,u=this,t,E,d,l;return u.delimiter=t=D.delimiter||"",u.original=p(X(r).replace(V," ").split("&nbsp;").join(""),t,n),(i==="{original}"||i===!0||i==null)&&(i=u.original.join(t)),u.text=p((i||"").replace(V," "),t,n),u.hasClass=!!(D.newClass||D.oldClass),u.newClass=D.newClass,u.oldClass=D.oldClass,l=t==="",u.textHasEmoji=l&&!!u.text.emoji,u.charsHaveEmoji=!!D.chars&&!!p(D.chars).emoji,u.length=l?u.original.length:u.original.join(t).length,u.lengthDif=(l?u.text.length:u.text.join(t).length)-u.length,u.fillChar=D.fillChar||D.chars&&~D.chars.indexOf(" ")?"&nbsp;":"",u.charSet=d=xD[D.chars||"upperCase"]||new j(D.chars),u.speed=.05/(D.speed||1),u.prevScrambleTime=0,u.setIndex=Math.random()*20|0,E=u.length+Math.max(u.lengthDif,0),E>d.length&&d.grow(E),u.chars=d.sets[u.setIndex],u.revealDelay=D.revealDelay||0,u.tweenLength=D.tweenLength!==!1,u.tween=s,u.rightToLeft=!!D.rightToLeft,u._props.push("scrambleText","text"),fD}},render:function(r,D){var s=D.target,a=D.prop,c=D.text,i=D.delimiter,n=D.tween,u=D.prevScrambleTime,t=D.revealDelay,E=D.setIndex,d=D.chars,l=D.charSet,b=D.length,A=D.textHasEmoji,v=D.charsHaveEmoji,L=D.lengthDif,M=D.tweenLength,y=D.oldClass,w=D.newClass,h=D.rightToLeft,DD=D.fillChar,$=D.speed,z=D.original,uD=D.hasClass,G=c.length,f=n._time,N=f-u,T,R,m,C,_,H,F,k,I,S,x;t&&(n._from&&(f=n._dur-f),r=f===0?0:f<t?1e-6:f===n._dur?1:n._ease((f-t)/(n._dur-t))),r<0?r=0:r>1&&(r=1),h&&(r=1-r),T=~~(r*G+.5),r?((N>$||N<-$)&&(D.setIndex=E=(E+(Math.random()*19|0))%20,D.chars=l.sets[E],D.prevScrambleTime+=N),C=d):C=z.join(i),x=n._from?r:1-r,S=b+(M?n._from?x*x*x:1-x*x*x:1)*L,h?r===1&&(n._from||n.data==="isFromStart")?(m="",C=z.join(i)):(F=c.slice(T).join(i),v?m=p(C).slice(0,S-(A?p(F):F).length+.5|0).join(""):m=C.substr(0,S-(A?p(F):F).length+.5|0),C=F):(m=c.slice(0,T).join(i),R=(A?p(m):m).length,v?C=p(C).slice(R,S+.5|0).join(""):C=C.substr(R,S-R+.5|0)),uD?(k=h?y:w,I=h?w:y,_=k&&T!==0,H=I&&T!==G,F=(_?"<span class='"+k+"'>":"")+m+(_?"</span>":"")+(H?"<span class='"+I+"'>":"")+i+C+(H?"</span>":"")):F=m+i+C,s[a]=DD==="&nbsp;"&&~F.indexOf("  ")?F.split("  ").join("&nbsp;&nbsp;"):F}};P.emojiSafeSplit=p;P.getText=X;Z()&&B.registerPlugin(P);Y.registerPlugin(Q,P);const gD=({radius:e=100,duration:r=1.2,speed:D=.5,scrambleChars:s=".:",className:a="",style:c={},children:i})=>{const n=g.useRef(null),u=g.useRef([]);return g.useEffect(()=>{if(!n.current)return;const t=Q.create(n.current.querySelector("p"),{type:"chars",charsClass:"char"});u.current=t.chars,u.current.forEach(l=>{Y.set(l,{display:"inline-block",attr:{"data-content":l.innerHTML}})});const E=l=>{u.current.forEach(b=>{const{left:A,top:v,width:L,height:M}=b.getBoundingClientRect(),y=l.clientX-(A+L/2),w=l.clientY-(v+M/2),h=Math.hypot(y,w);h<e&&Y.to(b,{overwrite:!0,duration:r*(1-h/e),scrambleText:{text:b.dataset.content||"",chars:s,speed:D},ease:"none"})})},d=n.current;return d.addEventListener("pointermove",E),()=>{d.removeEventListener("pointermove",E),t.revert()}},[e,r,D,s]),o.jsx("div",{ref:n,className:`text-block ${a}`,style:c,children:o.jsx("p",{children:i})})},RD=()=>{const[e,r]=g.useState(100),[D,s]=g.useState(1.2),[a,c]=g.useState(.5),[i,n]=g.useState(".:"),u=[{name:"radius",type:"number",default:"100",description:"The radius around the mouse pointer within which characters will scramble."},{name:"duration",type:"number",default:"1.2",description:"The duration of the scramble effect on a character."},{name:"speed",type:"number",default:"0.5",description:"The speed of the scramble animation."},{name:"scrambleChars",type:"string",default:"'.:'",description:"The characters used for scrambling."},{name:"children",type:"React.ReactNode",default:"",description:"The text content to be scrambled."},{name:"className",type:"string",default:'""',description:"Additional CSS classes for the component."},{name:"style",type:"React.CSSProperties",default:"{}",description:"Inline styles for the component."}];return o.jsxs(rD,{children:[o.jsxs(nD,{children:[o.jsx(eD,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:o.jsx(gD,{className:"scrambled-text-demo",radius:e,duration:D,speed:a,scrambleChars:i,children:"Once you hover over me, you will see the effect in action! You can customize the radius, duration, and speed of the scramble effect."})}),o.jsxs(aD,{children:[o.jsx(cD,{title:"Scramble Characters",value:i,placeholder:"Enter text...",maxLength:5,width:50,onChange:n}),o.jsx(q,{title:"Radius",min:10,max:300,step:10,value:e,onChange:t=>r(t)}),o.jsx(q,{title:"Duration",min:.1,max:5,step:.1,value:D,onChange:t=>s(t)}),o.jsx(q,{title:"Speed",min:.1,max:2,step:.1,value:a,onChange:t=>c(t)})]}),o.jsx(tD,{data:u}),o.jsx(oD,{dependencyList:["gsap"]})]}),o.jsx(sD,{children:o.jsx(iD,{codeObject:dD})})]})};export{RD as default};
