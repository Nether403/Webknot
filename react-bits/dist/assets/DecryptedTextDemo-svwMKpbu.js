import{r as s,j as e,q as U,B as $,F as V,u as W}from"./index-wsKSLPNH.js";import{T as G,P as K,a as Q,C as X,b as Y}from"./PropTable-C4uPWs8h.js";import{D as Z}from"./Dependencies-BHoMfJUj.js";import{R as _}from"./RefreshButton-CA3SFRlq.js";import{u as ee}from"./useForceRerender-BCFU-k0M.js";import{P as z}from"./PreviewSlider-m1G_aiYP.js";import{P}from"./PreviewSwitch-DqnF708j.js";import{P as k}from"./PreviewSelect-B8u33nUa.js";import{C as re}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const q={wrapper:{display:"inline-block",whiteSpace:"pre-wrap"},srOnly:{position:"absolute",width:"1px",height:"1px",padding:0,margin:"-1px",overflow:"hidden",clip:"rect(0,0,0,0)",border:0}};function D({text:a,speed:C=50,maxIterations:u=10,sequential:O=!1,revealDirection:h="start",useOriginalCharsOnly:I=!1,characters:v="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",className:N="",parentClassName:f="",encryptedClassName:M="",animateOn:l="hover",...j}){const[w,i]=s.useState(a),[b,y]=s.useState(!1),[H,n]=s.useState(!1),[B,A]=s.useState(new Set),[E,F]=s.useState(!1),L=s.useRef(null);s.useEffect(()=>{let d,m=0;const g=r=>{const p=a.length;switch(h){case"start":return r.size;case"end":return p-1-r.size;case"center":{const c=Math.floor(p/2),o=Math.floor(r.size/2),S=r.size%2===0?c+o:c-o-1;if(S>=0&&S<p&&!r.has(S))return S;for(let t=0;t<p;t++)if(!r.has(t))return t;return 0}default:return r.size}},x=I?Array.from(new Set(a.split(""))).filter(r=>r!==" "):v.split(""),T=(r,p)=>{if(I){const c=r.split("").map((t,R)=>({char:t,isSpace:t===" ",index:R,isRevealed:p.has(R)})),o=c.filter(t=>!t.isSpace&&!t.isRevealed).map(t=>t.char);for(let t=o.length-1;t>0;t--){const R=Math.floor(Math.random()*(t+1));[o[t],o[R]]=[o[R],o[t]]}let S=0;return c.map(t=>t.isSpace?" ":t.isRevealed?r[t.index]:o[S++]).join("")}else return r.split("").map((c,o)=>c===" "?" ":p.has(o)?r[o]:x[Math.floor(Math.random()*x.length)]).join("")};return b?(n(!0),d=setInterval(()=>{A(r=>{if(O)if(r.size<a.length){const p=g(r),c=new Set(r);return c.add(p),i(T(a,c)),c}else return clearInterval(d),n(!1),r;else return i(T(a,r)),m++,m>=u&&(clearInterval(d),n(!1),i(a)),r})},C)):(i(a),A(new Set),n(!1)),()=>{d&&clearInterval(d)}},[b,a,C,u,O,h,v,I]),s.useEffect(()=>{if(l!=="view"&&l!=="both")return;const d=T=>{T.forEach(r=>{r.isIntersecting&&!E&&(y(!0),F(!0))})},m={root:null,rootMargin:"0px",threshold:.1},g=new IntersectionObserver(d,m),x=L.current;return x&&g.observe(x),()=>{x&&g.unobserve(x)}},[l,E]);const J=l==="hover"||l==="both"?{onMouseEnter:()=>y(!0),onMouseLeave:()=>y(!1)}:{};return e.jsxs(U.span,{className:f,ref:L,style:q.wrapper,...J,...j,children:[e.jsx("span",{style:q.srOnly,children:w}),e.jsx("span",{"aria-hidden":"true",children:w.split("").map((d,m)=>{const g=B.has(m)||!H||!b;return e.jsx("span",{className:g?N:M,children:d},m)})})]})}const te=`import { useEffect, useState, useRef } from 'react';\r
import { motion } from 'motion/react';\r
\r
const styles = {\r
  wrapper: {\r
    display: 'inline-block',\r
    whiteSpace: 'pre-wrap'\r
  },\r
  srOnly: {\r
    position: 'absolute',\r
    width: '1px',\r
    height: '1px',\r
    padding: 0,\r
    margin: '-1px',\r
    overflow: 'hidden',\r
    clip: 'rect(0,0,0,0)',\r
    border: 0\r
  }\r
};\r
\r
export default function DecryptedText({\r
  text,\r
  speed = 50,\r
  maxIterations = 10,\r
  sequential = false,\r
  revealDirection = 'start',\r
  useOriginalCharsOnly = false,\r
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',\r
  className = '',\r
  parentClassName = '',\r
  encryptedClassName = '',\r
  animateOn = 'hover',\r
  ...props\r
}) {\r
  const [displayText, setDisplayText] = useState(text);\r
  const [isHovering, setIsHovering] = useState(false);\r
  const [isScrambling, setIsScrambling] = useState(false);\r
  const [revealedIndices, setRevealedIndices] = useState(new Set());\r
  const [hasAnimated, setHasAnimated] = useState(false);\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    let interval;\r
    let currentIteration = 0;\r
\r
    const getNextIndex = revealedSet => {\r
      const textLength = text.length;\r
      switch (revealDirection) {\r
        case 'start':\r
          return revealedSet.size;\r
        case 'end':\r
          return textLength - 1 - revealedSet.size;\r
        case 'center': {\r
          const middle = Math.floor(textLength / 2);\r
          const offset = Math.floor(revealedSet.size / 2);\r
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;\r
\r
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {\r
            return nextIndex;\r
          }\r
\r
          for (let i = 0; i < textLength; i++) {\r
            if (!revealedSet.has(i)) return i;\r
          }\r
          return 0;\r
        }\r
        default:\r
          return revealedSet.size;\r
      }\r
    };\r
\r
    const availableChars = useOriginalCharsOnly\r
      ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')\r
      : characters.split('');\r
\r
    const shuffleText = (originalText, currentRevealed) => {\r
      if (useOriginalCharsOnly) {\r
        const positions = originalText.split('').map((char, i) => ({\r
          char,\r
          isSpace: char === ' ',\r
          index: i,\r
          isRevealed: currentRevealed.has(i)\r
        }));\r
\r
        const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);\r
\r
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {\r
          const j = Math.floor(Math.random() * (i + 1));\r
          [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];\r
        }\r
\r
        let charIndex = 0;\r
        return positions\r
          .map(p => {\r
            if (p.isSpace) return ' ';\r
            if (p.isRevealed) return originalText[p.index];\r
            return nonSpaceChars[charIndex++];\r
          })\r
          .join('');\r
      } else {\r
        return originalText\r
          .split('')\r
          .map((char, i) => {\r
            if (char === ' ') return ' ';\r
            if (currentRevealed.has(i)) return originalText[i];\r
            return availableChars[Math.floor(Math.random() * availableChars.length)];\r
          })\r
          .join('');\r
      }\r
    };\r
\r
    if (isHovering) {\r
      setIsScrambling(true);\r
      interval = setInterval(() => {\r
        setRevealedIndices(prevRevealed => {\r
          if (sequential) {\r
            if (prevRevealed.size < text.length) {\r
              const nextIndex = getNextIndex(prevRevealed);\r
              const newRevealed = new Set(prevRevealed);\r
              newRevealed.add(nextIndex);\r
              setDisplayText(shuffleText(text, newRevealed));\r
              return newRevealed;\r
            } else {\r
              clearInterval(interval);\r
              setIsScrambling(false);\r
              return prevRevealed;\r
            }\r
          } else {\r
            setDisplayText(shuffleText(text, prevRevealed));\r
            currentIteration++;\r
            if (currentIteration >= maxIterations) {\r
              clearInterval(interval);\r
              setIsScrambling(false);\r
              setDisplayText(text);\r
            }\r
            return prevRevealed;\r
          }\r
        });\r
      }, speed);\r
    } else {\r
      setDisplayText(text);\r
      setRevealedIndices(new Set());\r
      setIsScrambling(false);\r
    }\r
\r
    return () => {\r
      if (interval) clearInterval(interval);\r
    };\r
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);\r
\r
  useEffect(() => {\r
    if (animateOn !== 'view' && animateOn !== 'both') return;\r
\r
    const observerCallback = entries => {\r
      entries.forEach(entry => {\r
        if (entry.isIntersecting && !hasAnimated) {\r
          setIsHovering(true);\r
          setHasAnimated(true);\r
        }\r
      });\r
    };\r
\r
    const observerOptions = {\r
      root: null,\r
      rootMargin: '0px',\r
      threshold: 0.1\r
    };\r
\r
    const observer = new IntersectionObserver(observerCallback, observerOptions);\r
    const currentRef = containerRef.current;\r
    if (currentRef) {\r
      observer.observe(currentRef);\r
    }\r
\r
    return () => {\r
      if (currentRef) {\r
        observer.unobserve(currentRef);\r
      }\r
    };\r
  }, [animateOn, hasAnimated]);\r
\r
  const hoverProps =\r
    animateOn === 'hover' || animateOn === 'both'\r
      ? {\r
          onMouseEnter: () => setIsHovering(true),\r
          onMouseLeave: () => setIsHovering(false)\r
        }\r
      : {};\r
\r
  return (\r
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...hoverProps} {...props}>\r
      <span style={styles.srOnly}>{displayText}</span>\r
\r
      <span aria-hidden="true">\r
        {displayText.split('').map((char, index) => {\r
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;\r
\r
          return (\r
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>\r
              {char}\r
            </span>\r
          );\r
        })}\r
      </span>\r
    </motion.span>\r
  );\r
}\r
`,ne=`import { useEffect, useState, useRef } from 'react';\r
import { motion } from 'motion/react';\r
\r
export default function DecryptedText({\r
  text,\r
  speed = 50,\r
  maxIterations = 10,\r
  sequential = false,\r
  revealDirection = 'start',\r
  useOriginalCharsOnly = false,\r
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',\r
  className = '',\r
  parentClassName = '',\r
  encryptedClassName = '',\r
  animateOn = 'hover',\r
  ...props\r
}) {\r
  const [displayText, setDisplayText] = useState(text);\r
  const [isHovering, setIsHovering] = useState(false);\r
  const [isScrambling, setIsScrambling] = useState(false);\r
  const [revealedIndices, setRevealedIndices] = useState(new Set());\r
  const [hasAnimated, setHasAnimated] = useState(false);\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    let interval;\r
    let currentIteration = 0;\r
\r
    const getNextIndex = revealedSet => {\r
      const textLength = text.length;\r
      switch (revealDirection) {\r
        case 'start':\r
          return revealedSet.size;\r
        case 'end':\r
          return textLength - 1 - revealedSet.size;\r
        case 'center': {\r
          const middle = Math.floor(textLength / 2);\r
          const offset = Math.floor(revealedSet.size / 2);\r
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;\r
\r
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {\r
            return nextIndex;\r
          }\r
          for (let i = 0; i < textLength; i++) {\r
            if (!revealedSet.has(i)) return i;\r
          }\r
          return 0;\r
        }\r
        default:\r
          return revealedSet.size;\r
      }\r
    };\r
\r
    const availableChars = useOriginalCharsOnly\r
      ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')\r
      : characters.split('');\r
\r
    const shuffleText = (originalText, currentRevealed) => {\r
      if (useOriginalCharsOnly) {\r
        const positions = originalText.split('').map((char, i) => ({\r
          char,\r
          isSpace: char === ' ',\r
          index: i,\r
          isRevealed: currentRevealed.has(i)\r
        }));\r
\r
        const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);\r
\r
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {\r
          const j = Math.floor(Math.random() * (i + 1));\r
          [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];\r
        }\r
\r
        let charIndex = 0;\r
        return positions\r
          .map(p => {\r
            if (p.isSpace) return ' ';\r
            if (p.isRevealed) return originalText[p.index];\r
            return nonSpaceChars[charIndex++];\r
          })\r
          .join('');\r
      } else {\r
        return originalText\r
          .split('')\r
          .map((char, i) => {\r
            if (char === ' ') return ' ';\r
            if (currentRevealed.has(i)) return originalText[i];\r
            return availableChars[Math.floor(Math.random() * availableChars.length)];\r
          })\r
          .join('');\r
      }\r
    };\r
\r
    if (isHovering) {\r
      setIsScrambling(true);\r
      interval = setInterval(() => {\r
        setRevealedIndices(prevRevealed => {\r
          if (sequential) {\r
            if (prevRevealed.size < text.length) {\r
              const nextIndex = getNextIndex(prevRevealed);\r
              const newRevealed = new Set(prevRevealed);\r
              newRevealed.add(nextIndex);\r
              setDisplayText(shuffleText(text, newRevealed));\r
              return newRevealed;\r
            } else {\r
              clearInterval(interval);\r
              setIsScrambling(false);\r
              return prevRevealed;\r
            }\r
          } else {\r
            setDisplayText(shuffleText(text, prevRevealed));\r
            currentIteration++;\r
            if (currentIteration >= maxIterations) {\r
              clearInterval(interval);\r
              setIsScrambling(false);\r
              setDisplayText(text);\r
            }\r
            return prevRevealed;\r
          }\r
        });\r
      }, speed);\r
    } else {\r
      setDisplayText(text);\r
      setRevealedIndices(new Set());\r
      setIsScrambling(false);\r
    }\r
\r
    return () => {\r
      if (interval) clearInterval(interval);\r
    };\r
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);\r
\r
  useEffect(() => {\r
    if (animateOn !== 'view' && animateOn !== 'both') return;\r
\r
    const observerCallback = entries => {\r
      entries.forEach(entry => {\r
        if (entry.isIntersecting && !hasAnimated) {\r
          setIsHovering(true);\r
          setHasAnimated(true);\r
        }\r
      });\r
    };\r
\r
    const observerOptions = {\r
      root: null,\r
      rootMargin: '0px',\r
      threshold: 0.1\r
    };\r
\r
    const observer = new IntersectionObserver(observerCallback, observerOptions);\r
    const currentRef = containerRef.current;\r
    if (currentRef) {\r
      observer.observe(currentRef);\r
    }\r
\r
    return () => {\r
      if (currentRef) observer.unobserve(currentRef);\r
    };\r
  }, [animateOn, hasAnimated]);\r
\r
  const hoverProps =\r
    animateOn === 'hover' || animateOn === 'both'\r
      ? {\r
          onMouseEnter: () => setIsHovering(true),\r
          onMouseLeave: () => setIsHovering(false)\r
        }\r
      : {};\r
\r
  return (\r
    <motion.span\r
      ref={containerRef}\r
      className={\`inline-block whitespace-pre-wrap \${parentClassName}\`}\r
      {...hoverProps}\r
      {...props}\r
    >\r
      <span className="sr-only">{displayText}</span>\r
\r
      <span aria-hidden="true">\r
        {displayText.split('').map((char, index) => {\r
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;\r
\r
          return (\r
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>\r
              {char}\r
            </span>\r
          );\r
        })}\r
      </span>\r
    </motion.span>\r
  );\r
}\r
`,ae=`import { useEffect, useState, useRef, ReactNode } from 'react';\r
import { motion, HTMLMotionProps } from 'motion/react';\r
\r
const styles = {\r
  wrapper: {\r
    display: 'inline-block',\r
    whiteSpace: 'pre-wrap'\r
  },\r
  srOnly: {\r
    position: 'absolute' as 'absolute',\r
    width: '1px',\r
    height: '1px',\r
    padding: 0,\r
    margin: '-1px',\r
    overflow: 'hidden',\r
    clip: 'rect(0,0,0,0)',\r
    border: 0\r
  }\r
};\r
\r
interface DecryptedTextProps extends HTMLMotionProps<'span'> {\r
  text: string;\r
  speed?: number;\r
  maxIterations?: number;\r
  sequential?: boolean;\r
  revealDirection?: 'start' | 'end' | 'center';\r
  useOriginalCharsOnly?: boolean;\r
  characters?: string;\r
  className?: string;\r
  parentClassName?: string;\r
  encryptedClassName?: string;\r
  animateOn?: 'view' | 'hover' | 'both';\r
}\r
\r
export default function DecryptedText({\r
  text,\r
  speed = 50,\r
  maxIterations = 10,\r
  sequential = false,\r
  revealDirection = 'start',\r
  useOriginalCharsOnly = false,\r
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',\r
  className = '',\r
  parentClassName = '',\r
  encryptedClassName = '',\r
  animateOn = 'hover',\r
  ...props\r
}: DecryptedTextProps) {\r
  const [displayText, setDisplayText] = useState<string>(text);\r
  const [isHovering, setIsHovering] = useState<boolean>(false);\r
  const [isScrambling, setIsScrambling] = useState<boolean>(false);\r
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());\r
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);\r
  const containerRef = useRef<HTMLSpanElement>(null);\r
\r
  useEffect(() => {\r
    let interval: NodeJS.Timeout;\r
    let currentIteration = 0;\r
\r
    const getNextIndex = (revealedSet: Set<number>): number => {\r
      const textLength = text.length;\r
      switch (revealDirection) {\r
        case 'start':\r
          return revealedSet.size;\r
        case 'end':\r
          return textLength - 1 - revealedSet.size;\r
        case 'center': {\r
          const middle = Math.floor(textLength / 2);\r
          const offset = Math.floor(revealedSet.size / 2);\r
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;\r
\r
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {\r
            return nextIndex;\r
          }\r
\r
          for (let i = 0; i < textLength; i++) {\r
            if (!revealedSet.has(i)) return i;\r
          }\r
          return 0;\r
        }\r
        default:\r
          return revealedSet.size;\r
      }\r
    };\r
\r
    const availableChars = useOriginalCharsOnly\r
      ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')\r
      : characters.split('');\r
\r
    const shuffleText = (originalText: string, currentRevealed: Set<number>): string => {\r
      if (useOriginalCharsOnly) {\r
        const positions = originalText.split('').map((char, i) => ({\r
          char,\r
          isSpace: char === ' ',\r
          index: i,\r
          isRevealed: currentRevealed.has(i)\r
        }));\r
\r
        const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);\r
\r
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {\r
          const j = Math.floor(Math.random() * (i + 1));\r
          [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];\r
        }\r
\r
        let charIndex = 0;\r
        return positions\r
          .map(p => {\r
            if (p.isSpace) return ' ';\r
            if (p.isRevealed) return originalText[p.index];\r
            return nonSpaceChars[charIndex++];\r
          })\r
          .join('');\r
      } else {\r
        return originalText\r
          .split('')\r
          .map((char, i) => {\r
            if (char === ' ') return ' ';\r
            if (currentRevealed.has(i)) return originalText[i];\r
            return availableChars[Math.floor(Math.random() * availableChars.length)];\r
          })\r
          .join('');\r
      }\r
    };\r
\r
    if (isHovering) {\r
      setIsScrambling(true);\r
      interval = setInterval(() => {\r
        setRevealedIndices(prevRevealed => {\r
          if (sequential) {\r
            if (prevRevealed.size < text.length) {\r
              const nextIndex = getNextIndex(prevRevealed);\r
              const newRevealed = new Set(prevRevealed);\r
              newRevealed.add(nextIndex);\r
              setDisplayText(shuffleText(text, newRevealed));\r
              return newRevealed;\r
            } else {\r
              clearInterval(interval);\r
              setIsScrambling(false);\r
              return prevRevealed;\r
            }\r
          } else {\r
            setDisplayText(shuffleText(text, prevRevealed));\r
            currentIteration++;\r
            if (currentIteration >= maxIterations) {\r
              clearInterval(interval);\r
              setIsScrambling(false);\r
              setDisplayText(text);\r
            }\r
            return prevRevealed;\r
          }\r
        });\r
      }, speed);\r
    } else {\r
      setDisplayText(text);\r
      setRevealedIndices(new Set());\r
      setIsScrambling(false);\r
    }\r
\r
    return () => {\r
      if (interval) clearInterval(interval);\r
    };\r
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);\r
\r
  useEffect(() => {\r
    if (animateOn !== 'view' && animateOn !== 'both') return;\r
\r
    const observerCallback = (entries: IntersectionObserverEntry[]) => {\r
      entries.forEach(entry => {\r
        if (entry.isIntersecting && !hasAnimated) {\r
          setIsHovering(true);\r
          setHasAnimated(true);\r
        }\r
      });\r
    };\r
\r
    const observerOptions = {\r
      root: null,\r
      rootMargin: '0px',\r
      threshold: 0.1\r
    };\r
\r
    const observer = new IntersectionObserver(observerCallback, observerOptions);\r
    const currentRef = containerRef.current;\r
    if (currentRef) {\r
      observer.observe(currentRef);\r
    }\r
\r
    return () => {\r
      if (currentRef) {\r
        observer.unobserve(currentRef);\r
      }\r
    };\r
  }, [animateOn, hasAnimated]);\r
\r
  const hoverProps =\r
    animateOn === 'hover' || animateOn === 'both'\r
      ? {\r
          onMouseEnter: () => setIsHovering(true),\r
          onMouseLeave: () => setIsHovering(false)\r
        }\r
      : {};\r
\r
  return (\r
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...hoverProps} {...props}>\r
      <span style={styles.srOnly}>{displayText}</span>\r
\r
      <span aria-hidden="true">\r
        {displayText.split('').map((char, index) => {\r
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;\r
\r
          return (\r
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>\r
              {char}\r
            </span>\r
          );\r
        })}\r
      </span>\r
    </motion.span>\r
  );\r
}\r
`,se=`import { useEffect, useState, useRef } from 'react';\r
import { motion, HTMLMotionProps } from 'motion/react';\r
\r
interface DecryptedTextProps extends HTMLMotionProps<'span'> {\r
  text: string;\r
  speed?: number;\r
  maxIterations?: number;\r
  sequential?: boolean;\r
  revealDirection?: 'start' | 'end' | 'center';\r
  useOriginalCharsOnly?: boolean;\r
  characters?: string;\r
  className?: string;\r
  encryptedClassName?: string;\r
  parentClassName?: string;\r
  animateOn?: 'view' | 'hover' | 'both';\r
}\r
\r
export default function DecryptedText({\r
  text,\r
  speed = 50,\r
  maxIterations = 10,\r
  sequential = false,\r
  revealDirection = 'start',\r
  useOriginalCharsOnly = false,\r
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',\r
  className = '',\r
  parentClassName = '',\r
  encryptedClassName = '',\r
  animateOn = 'hover',\r
  ...props\r
}: DecryptedTextProps) {\r
  const [displayText, setDisplayText] = useState<string>(text);\r
  const [isHovering, setIsHovering] = useState<boolean>(false);\r
  const [isScrambling, setIsScrambling] = useState<boolean>(false);\r
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());\r
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);\r
  const containerRef = useRef<HTMLSpanElement>(null);\r
\r
  useEffect(() => {\r
    let interval: NodeJS.Timeout;\r
    let currentIteration = 0;\r
\r
    const getNextIndex = (revealedSet: Set<number>): number => {\r
      const textLength = text.length;\r
      switch (revealDirection) {\r
        case 'start':\r
          return revealedSet.size;\r
        case 'end':\r
          return textLength - 1 - revealedSet.size;\r
        case 'center': {\r
          const middle = Math.floor(textLength / 2);\r
          const offset = Math.floor(revealedSet.size / 2);\r
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;\r
\r
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {\r
            return nextIndex;\r
          }\r
          for (let i = 0; i < textLength; i++) {\r
            if (!revealedSet.has(i)) return i;\r
          }\r
          return 0;\r
        }\r
        default:\r
          return revealedSet.size;\r
      }\r
    };\r
\r
    const availableChars = useOriginalCharsOnly\r
      ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')\r
      : characters.split('');\r
\r
    const shuffleText = (originalText: string, currentRevealed: Set<number>): string => {\r
      if (useOriginalCharsOnly) {\r
        const positions = originalText.split('').map((char, i) => ({\r
          char,\r
          isSpace: char === ' ',\r
          index: i,\r
          isRevealed: currentRevealed.has(i)\r
        }));\r
\r
        const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);\r
\r
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {\r
          const j = Math.floor(Math.random() * (i + 1));\r
          [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];\r
        }\r
\r
        let charIndex = 0;\r
        return positions\r
          .map(p => {\r
            if (p.isSpace) return ' ';\r
            if (p.isRevealed) return originalText[p.index];\r
            return nonSpaceChars[charIndex++];\r
          })\r
          .join('');\r
      } else {\r
        return originalText\r
          .split('')\r
          .map((char, i) => {\r
            if (char === ' ') return ' ';\r
            if (currentRevealed.has(i)) return originalText[i];\r
            return availableChars[Math.floor(Math.random() * availableChars.length)];\r
          })\r
          .join('');\r
      }\r
    };\r
\r
    if (isHovering) {\r
      setIsScrambling(true);\r
      interval = setInterval(() => {\r
        setRevealedIndices(prevRevealed => {\r
          if (sequential) {\r
            if (prevRevealed.size < text.length) {\r
              const nextIndex = getNextIndex(prevRevealed);\r
              const newRevealed = new Set(prevRevealed);\r
              newRevealed.add(nextIndex);\r
              setDisplayText(shuffleText(text, newRevealed));\r
              return newRevealed;\r
            } else {\r
              clearInterval(interval);\r
              setIsScrambling(false);\r
              return prevRevealed;\r
            }\r
          } else {\r
            setDisplayText(shuffleText(text, prevRevealed));\r
            currentIteration++;\r
            if (currentIteration >= maxIterations) {\r
              clearInterval(interval);\r
              setIsScrambling(false);\r
              setDisplayText(text);\r
            }\r
            return prevRevealed;\r
          }\r
        });\r
      }, speed);\r
    } else {\r
      setDisplayText(text);\r
      setRevealedIndices(new Set());\r
      setIsScrambling(false);\r
    }\r
\r
    return () => {\r
      if (interval) clearInterval(interval);\r
    };\r
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);\r
\r
  useEffect(() => {\r
    if (animateOn !== 'view' && animateOn !== 'both') return;\r
\r
    const observerCallback = (entries: IntersectionObserverEntry[]) => {\r
      entries.forEach(entry => {\r
        if (entry.isIntersecting && !hasAnimated) {\r
          setIsHovering(true);\r
          setHasAnimated(true);\r
        }\r
      });\r
    };\r
\r
    const observerOptions = {\r
      root: null,\r
      rootMargin: '0px',\r
      threshold: 0.1\r
    };\r
\r
    const observer = new IntersectionObserver(observerCallback, observerOptions);\r
    const currentRef = containerRef.current;\r
    if (currentRef) {\r
      observer.observe(currentRef);\r
    }\r
\r
    return () => {\r
      if (currentRef) observer.unobserve(currentRef);\r
    };\r
  }, [animateOn, hasAnimated]);\r
\r
  const hoverProps =\r
    animateOn === 'hover' || animateOn === 'both'\r
      ? {\r
          onMouseEnter: () => setIsHovering(true),\r
          onMouseLeave: () => setIsHovering(false)\r
        }\r
      : {};\r
\r
  return (\r
    <motion.span\r
      ref={containerRef}\r
      className={\`inline-block whitespace-pre-wrap \${parentClassName}\`}\r
      {...hoverProps}\r
      {...props}\r
    >\r
      <span className="sr-only">{displayText}</span>\r
\r
      <span aria-hidden="true">\r
        {displayText.split('').map((char, index) => {\r
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;\r
\r
          return (\r
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>\r
              {char}\r
            </span>\r
          );\r
        })}\r
      </span>\r
    </motion.span>\r
  );\r
}\r
`,ie={dependencies:"motion",usage:`import DecryptedText from './DecryptedText';

{/* Example 1: Defaults (hover to decrypt) */}
<DecryptedText text="Hover me!" />

{/* Example 2: Customized speed and characters */}
<DecryptedText
text="Customize me"
speed={100}
maxIterations={20}
characters="ABCD1234!?"
className="revealed"
parentClassName="all-letters"
encryptedClassName="encrypted"
/>

{/* Example 3: Animate on view (runs once) */}
<div style={{ marginTop: '4rem' }}>
<DecryptedText
  text="This text animates when in view"
  animateOn="view"
  revealDirection="center"
/>
</div>`,code:te,tailwind:ne,tsCode:ae,tsTailwind:se},ge=()=>{const[a,C]=s.useState(60),[u,O]=s.useState(10),[h,I]=s.useState(!0),[v,N]=s.useState(!1),[f,M]=s.useState("start"),[l,j]=s.useState("view"),[w,i]=ee(),b=[{name:"text",type:"string",default:'""',description:"The text content to decrypt."},{name:"speed",type:"number",default:"50",description:"Time in ms between each iteration."},{name:"maxIterations",type:"number",default:"10",description:"Max # of random iterations (non-sequential mode)."},{name:"sequential",type:"boolean",default:"false",description:"Whether to reveal one character at a time in sequence."},{name:"revealDirection",type:'"start" | "end" | "center"',default:'"start"',description:"From which position characters begin to reveal in sequential mode."},{name:"useOriginalCharsOnly",type:"boolean",default:"false",description:"Restrict scrambling to only the characters already in the text."},{name:"className",type:"string",default:'""',description:"CSS class for revealed characters."},{name:"parentClassName",type:"string",default:'""',description:"CSS class for the main characters container."},{name:"encryptedClassName",type:"string",default:'""',description:"CSS class for encrypted characters."},{name:"animateOn",type:'"view" | "hover"',default:'"hover"',description:"Trigger scrambling on hover or scroll-into-view."}],y=[{label:"View",value:"view"},{label:"Hover",value:"hover"},{label:"Both",value:"both"}],H=[{label:"Start",value:"start"},{label:"End",value:"end"},{label:"Center",value:"center"}];return e.jsxs(G,{children:[e.jsxs(K,{children:[e.jsxs($,{position:"relative",py:{md:6,sm:4},className:"demo-container",overflow:"hidden",children:[e.jsx(_,{onClick:i}),e.jsxs(V,{pl:{md:6,sm:3},m:{md:8,sm:2},w:"100%",direction:"column",justifyContent:"flex-start",alignItems:"flex-start",children:[e.jsx(D,{speed:a,text:"Ahoy, matey!",maxIterations:u,sequential:h,revealDirection:f,parentClassName:"decrypted-text",useOriginalCharsOnly:v,animateOn:l}),e.jsx(D,{speed:a,text:"Set yer eyes on this",maxIterations:u,sequential:h,revealDirection:f,parentClassName:"decrypted-text",useOriginalCharsOnly:v,animateOn:l}),e.jsx(D,{speed:a,text:"And try tinkerin' round'",maxIterations:u,sequential:h,revealDirection:f,parentClassName:"decrypted-text",useOriginalCharsOnly:v,animateOn:l}),e.jsx(D,{speed:a,text:"with these here props, arr!",maxIterations:u,sequential:h,revealDirection:f,parentClassName:"decrypted-text",useOriginalCharsOnly:v,animateOn:l,onAnimationComplete:()=>W("✅ Animation Finished!")})]},w)]}),e.jsxs(re,{children:[e.jsx(k,{title:"Animate On",options:y,value:l,name:"animateOn",width:100,onChange:n=>{j(n),i()}}),e.jsx(k,{title:"Direction",options:H,value:f,name:"direction",width:100,onChange:n=>{M(n),i()}}),e.jsx(z,{title:"Speed",min:10,max:200,step:10,value:a,valueUnit:"ms",onChange:n=>{C(n),i()}}),e.jsx(z,{title:"Iterations",min:1,max:50,step:1,value:u,onChange:n=>{O(n),i()}}),e.jsx(P,{title:"Sequential",isChecked:h,onChange:n=>{I(n),i()}}),e.jsx(P,{title:"Original Chars",isChecked:v,onChange:n=>{N(n),i()}})]}),e.jsx(Q,{data:b}),e.jsx(Z,{dependencyList:["motion"]})]}),e.jsx(X,{children:e.jsx(Y,{codeObject:ie})})]})};export{ge as default};
