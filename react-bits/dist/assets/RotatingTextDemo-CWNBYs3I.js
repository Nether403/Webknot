import{r as n,ba as J,bb as K,bc as P,j as t,q as I,bd as Q,B as X}from"./index-wsKSLPNH.js";import{T as Y,P as Z,a as _,C as $,b as ee}from"./PropTable-C4uPWs8h.js";import{D as re}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";const te=n.createContext(null);function ne(){const r=n.useRef(!1);return J(()=>(r.current=!0,()=>{r.current=!1}),[]),r}function ae(){const r=ne(),[o,a]=n.useState(0),l=n.useCallback(()=>{r.current&&a(o+1)},[o]);return[n.useCallback(()=>K.postRender(l),[l]),o]}const se=r=>!r.isLayoutDirty&&r.willUpdate(!1);function L(){const r=new Set,o=new WeakMap,a=()=>r.forEach(se);return{add:l=>{r.add(l),o.set(l,l.addEventListener("willUpdate",a))},remove:l=>{r.delete(l);const u=o.get(l);u&&(u(),o.delete(l)),a()},dirty:a}}const B=r=>r===!0,ie=r=>B(r===!0)||r==="id",oe=({children:r,id:o,inherit:a=!0})=>{const l=n.useContext(P),u=n.useContext(te),[b,N]=ae(),h=n.useRef(null),f=l.id||u;h.current===null&&(ie(a)&&f&&(o=o?f+"-"+o:f),h.current={id:o,group:B(a)&&l.group||L()});const y=n.useMemo(()=>({...h.current,forceRender:b}),[N]);return t.jsx(P.Provider,{value:y,children:r})};function v(...r){return r.filter(Boolean).join(" ")}const F=n.forwardRef((r,o)=>{const{texts:a,transition:l={type:"spring",damping:25,stiffness:300},initial:u={y:"100%",opacity:0},animate:b={y:0,opacity:1},exit:N={y:"-120%",opacity:0},animatePresenceMode:h="wait",animatePresenceInitial:f=!1,rotationInterval:y=2e3,staggerDuration:m=0,staggerFrom:p="first",loop:T=!0,auto:j=!0,splitBy:g="characters",onNext:M,mainClassName:A,splitLevelClassName:E,elementLevelClassName:O,...H}=r,[s,V]=n.useState(0),G=e=>{if(typeof Intl<"u"&&Intl.Segmenter){const i=new Intl.Segmenter("en",{granularity:"grapheme"});return Array.from(i.segment(e),c=>c.segment)}return Array.from(e)},U=n.useMemo(()=>{const e=a[s];if(g==="characters"){const i=e.split(" ");return i.map((c,d)=>({characters:G(c),needsSpace:d!==i.length-1}))}return g==="words"?e.split(" ").map((i,c,d)=>({characters:[i],needsSpace:c!==d.length-1})):g==="lines"?e.split(`
`).map((i,c,d)=>({characters:[i],needsSpace:c!==d.length-1})):e.split(g).map((i,c,d)=>({characters:[i],needsSpace:c!==d.length-1}))},[a,s,g]),W=n.useCallback((e,i)=>{const c=i;if(p==="first")return e*m;if(p==="last")return(c-1-e)*m;if(p==="center"){const d=Math.floor(c/2);return Math.abs(d-e)*m}if(p==="random"){const d=Math.floor(Math.random()*c);return Math.abs(d-e)*m}return Math.abs(p-e)*m},[p,m]),x=n.useCallback(e=>{V(e),M&&M(e)},[M]),C=n.useCallback(()=>{const e=s===a.length-1?T?0:s:s+1;e!==s&&x(e)},[s,a.length,T,x]),k=n.useCallback(()=>{const e=s===0?T?a.length-1:s:s-1;e!==s&&x(e)},[s,a.length,T,x]),S=n.useCallback(e=>{const i=Math.max(0,Math.min(e,a.length-1));i!==s&&x(i)},[a.length,s,x]),D=n.useCallback(()=>{s!==0&&x(0)},[s,x]);return n.useImperativeHandle(o,()=>({next:C,previous:k,jumpTo:S,reset:D}),[C,k,S,D]),n.useEffect(()=>{if(!j)return;const e=setInterval(C,y);return()=>clearInterval(e)},[C,y,j]),t.jsxs(I.span,{className:v("text-rotate",A),...H,layout:!0,transition:l,children:[t.jsx("span",{className:"text-rotate-sr-only",children:a[s]}),t.jsx(Q,{mode:h,initial:f,children:t.jsx(I.span,{className:v(g==="lines"?"text-rotate-lines":"text-rotate"),layout:!0,"aria-hidden":"true",children:U.map((e,i,c)=>{const d=c.slice(0,i).reduce((R,w)=>R+w.characters.length,0);return t.jsxs("span",{className:v("text-rotate-word",E),children:[e.characters.map((R,w)=>t.jsx(I.span,{initial:u,animate:b,exit:N,transition:{...l,delay:W(d+w,c.reduce((q,z)=>q+z.characters.length,0))},className:v("text-rotate-element",O),children:R},w)),e.needsSpace&&t.jsx("span",{className:"text-rotate-space",children:" "})]},i)})},s)})]})});F.displayName="RotatingText";const le=`'use client';\r
\r
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';\r
import { motion, AnimatePresence } from 'motion/react';\r
\r
import './RotatingText.css';\r
\r
function cn(...classes) {\r
  return classes.filter(Boolean).join(' ');\r
}\r
\r
const RotatingText = forwardRef((props, ref) => {\r
  const {\r
    texts,\r
    transition = { type: 'spring', damping: 25, stiffness: 300 },\r
    initial = { y: '100%', opacity: 0 },\r
    animate = { y: 0, opacity: 1 },\r
    exit = { y: '-120%', opacity: 0 },\r
    animatePresenceMode = 'wait',\r
    animatePresenceInitial = false,\r
    rotationInterval = 2000,\r
    staggerDuration = 0,\r
    staggerFrom = 'first',\r
    loop = true,\r
    auto = true,\r
    splitBy = 'characters',\r
    onNext,\r
    mainClassName,\r
    splitLevelClassName,\r
    elementLevelClassName,\r
    ...rest\r
  } = props;\r
\r
  const [currentTextIndex, setCurrentTextIndex] = useState(0);\r
\r
  const splitIntoCharacters = text => {\r
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {\r
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });\r
      return Array.from(segmenter.segment(text), segment => segment.segment);\r
    }\r
    return Array.from(text);\r
  };\r
\r
  const elements = useMemo(() => {\r
    const currentText = texts[currentTextIndex];\r
    if (splitBy === 'characters') {\r
      const words = currentText.split(' ');\r
      return words.map((word, i) => ({\r
        characters: splitIntoCharacters(word),\r
        needsSpace: i !== words.length - 1\r
      }));\r
    }\r
    if (splitBy === 'words') {\r
      return currentText.split(' ').map((word, i, arr) => ({\r
        characters: [word],\r
        needsSpace: i !== arr.length - 1\r
      }));\r
    }\r
    if (splitBy === 'lines') {\r
      return currentText.split('\\n').map((line, i, arr) => ({\r
        characters: [line],\r
        needsSpace: i !== arr.length - 1\r
      }));\r
    }\r
\r
    return currentText.split(splitBy).map((part, i, arr) => ({\r
      characters: [part],\r
      needsSpace: i !== arr.length - 1\r
    }));\r
  }, [texts, currentTextIndex, splitBy]);\r
\r
  const getStaggerDelay = useCallback(\r
    (index, totalChars) => {\r
      const total = totalChars;\r
      if (staggerFrom === 'first') return index * staggerDuration;\r
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;\r
      if (staggerFrom === 'center') {\r
        const center = Math.floor(total / 2);\r
        return Math.abs(center - index) * staggerDuration;\r
      }\r
      if (staggerFrom === 'random') {\r
        const randomIndex = Math.floor(Math.random() * total);\r
        return Math.abs(randomIndex - index) * staggerDuration;\r
      }\r
      return Math.abs(staggerFrom - index) * staggerDuration;\r
    },\r
    [staggerFrom, staggerDuration]\r
  );\r
\r
  const handleIndexChange = useCallback(\r
    newIndex => {\r
      setCurrentTextIndex(newIndex);\r
      if (onNext) onNext(newIndex);\r
    },\r
    [onNext]\r
  );\r
\r
  const next = useCallback(() => {\r
    const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;\r
    if (nextIndex !== currentTextIndex) {\r
      handleIndexChange(nextIndex);\r
    }\r
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);\r
\r
  const previous = useCallback(() => {\r
    const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;\r
    if (prevIndex !== currentTextIndex) {\r
      handleIndexChange(prevIndex);\r
    }\r
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);\r
\r
  const jumpTo = useCallback(\r
    index => {\r
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));\r
      if (validIndex !== currentTextIndex) {\r
        handleIndexChange(validIndex);\r
      }\r
    },\r
    [texts.length, currentTextIndex, handleIndexChange]\r
  );\r
\r
  const reset = useCallback(() => {\r
    if (currentTextIndex !== 0) {\r
      handleIndexChange(0);\r
    }\r
  }, [currentTextIndex, handleIndexChange]);\r
\r
  useImperativeHandle(\r
    ref,\r
    () => ({\r
      next,\r
      previous,\r
      jumpTo,\r
      reset\r
    }),\r
    [next, previous, jumpTo, reset]\r
  );\r
\r
  useEffect(() => {\r
    if (!auto) return;\r
    const intervalId = setInterval(next, rotationInterval);\r
    return () => clearInterval(intervalId);\r
  }, [next, rotationInterval, auto]);\r
\r
  return (\r
    <motion.span className={cn('text-rotate', mainClassName)} {...rest} layout transition={transition}>\r
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>\r
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>\r
        <motion.span\r
          key={currentTextIndex}\r
          className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')}\r
          layout\r
          aria-hidden="true"\r
        >\r
          {elements.map((wordObj, wordIndex, array) => {\r
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);\r
            return (\r
              <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>\r
                {wordObj.characters.map((char, charIndex) => (\r
                  <motion.span\r
                    key={charIndex}\r
                    initial={initial}\r
                    animate={animate}\r
                    exit={exit}\r
                    transition={{\r
                      ...transition,\r
                      delay: getStaggerDelay(\r
                        previousCharsCount + charIndex,\r
                        array.reduce((sum, word) => sum + word.characters.length, 0)\r
                      )\r
                    }}\r
                    className={cn('text-rotate-element', elementLevelClassName)}\r
                  >\r
                    {char}\r
                  </motion.span>\r
                ))}\r
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}\r
              </span>\r
            );\r
          })}\r
        </motion.span>\r
      </AnimatePresence>\r
    </motion.span>\r
  );\r
});\r
\r
RotatingText.displayName = 'RotatingText';\r
export default RotatingText;\r
`,ce=`.text-rotate {\r
  display: flex;\r
  flex-wrap: wrap;\r
  white-space: pre-wrap;\r
  position: relative;\r
}\r
\r
.text-rotate-sr-only {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  padding: 0;\r
  margin: -1px;\r
  overflow: hidden;\r
  clip: rect(0, 0, 0, 0);\r
  white-space: nowrap;\r
  border: 0;\r
}\r
\r
.text-rotate-word {\r
  display: inline-flex;\r
}\r
\r
.text-rotate-lines {\r
  display: flex;\r
  flex-direction: column;\r
  width: 100%;\r
}\r
\r
.text-rotate-element {\r
  display: inline-block;\r
}\r
\r
.text-rotate-space {\r
  white-space: pre;\r
}\r
`,de=`'use client';\r
\r
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';\r
import { motion, AnimatePresence } from 'motion/react';\r
\r
function cn(...classes) {\r
  return classes.filter(Boolean).join(' ');\r
}\r
\r
const RotatingText = forwardRef((props, ref) => {\r
  const {\r
    texts,\r
    transition = { type: 'spring', damping: 25, stiffness: 300 },\r
    initial = { y: '100%', opacity: 0 },\r
    animate = { y: 0, opacity: 1 },\r
    exit = { y: '-120%', opacity: 0 },\r
    animatePresenceMode = 'wait',\r
    animatePresenceInitial = false,\r
    rotationInterval = 2000,\r
    staggerDuration = 0,\r
    staggerFrom = 'first',\r
    loop = true,\r
    auto = true,\r
    splitBy = 'characters',\r
    onNext,\r
    mainClassName,\r
    splitLevelClassName,\r
    elementLevelClassName,\r
    ...rest\r
  } = props;\r
\r
  const [currentTextIndex, setCurrentTextIndex] = useState(0);\r
\r
  const splitIntoCharacters = text => {\r
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {\r
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });\r
      return Array.from(segmenter.segment(text), segment => segment.segment);\r
    }\r
    return Array.from(text);\r
  };\r
\r
  const elements = useMemo(() => {\r
    const currentText = texts[currentTextIndex];\r
    if (splitBy === 'characters') {\r
      const words = currentText.split(' ');\r
      return words.map((word, i) => ({\r
        characters: splitIntoCharacters(word),\r
        needsSpace: i !== words.length - 1\r
      }));\r
    }\r
    if (splitBy === 'words') {\r
      return currentText.split(' ').map((word, i, arr) => ({\r
        characters: [word],\r
        needsSpace: i !== arr.length - 1\r
      }));\r
    }\r
    if (splitBy === 'lines') {\r
      return currentText.split('\\n').map((line, i, arr) => ({\r
        characters: [line],\r
        needsSpace: i !== arr.length - 1\r
      }));\r
    }\r
\r
    return currentText.split(splitBy).map((part, i, arr) => ({\r
      characters: [part],\r
      needsSpace: i !== arr.length - 1\r
    }));\r
  }, [texts, currentTextIndex, splitBy]);\r
\r
  const getStaggerDelay = useCallback(\r
    (index, totalChars) => {\r
      const total = totalChars;\r
      if (staggerFrom === 'first') return index * staggerDuration;\r
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;\r
      if (staggerFrom === 'center') {\r
        const center = Math.floor(total / 2);\r
        return Math.abs(center - index) * staggerDuration;\r
      }\r
      if (staggerFrom === 'random') {\r
        const randomIndex = Math.floor(Math.random() * total);\r
        return Math.abs(randomIndex - index) * staggerDuration;\r
      }\r
      return Math.abs(staggerFrom - index) * staggerDuration;\r
    },\r
    [staggerFrom, staggerDuration]\r
  );\r
\r
  const handleIndexChange = useCallback(\r
    newIndex => {\r
      setCurrentTextIndex(newIndex);\r
      if (onNext) onNext(newIndex);\r
    },\r
    [onNext]\r
  );\r
\r
  const next = useCallback(() => {\r
    const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;\r
    if (nextIndex !== currentTextIndex) {\r
      handleIndexChange(nextIndex);\r
    }\r
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);\r
\r
  const previous = useCallback(() => {\r
    const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;\r
    if (prevIndex !== currentTextIndex) {\r
      handleIndexChange(prevIndex);\r
    }\r
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);\r
\r
  const jumpTo = useCallback(\r
    index => {\r
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));\r
      if (validIndex !== currentTextIndex) {\r
        handleIndexChange(validIndex);\r
      }\r
    },\r
    [texts.length, currentTextIndex, handleIndexChange]\r
  );\r
\r
  const reset = useCallback(() => {\r
    if (currentTextIndex !== 0) {\r
      handleIndexChange(0);\r
    }\r
  }, [currentTextIndex, handleIndexChange]);\r
\r
  useImperativeHandle(\r
    ref,\r
    () => ({\r
      next,\r
      previous,\r
      jumpTo,\r
      reset\r
    }),\r
    [next, previous, jumpTo, reset]\r
  );\r
\r
  useEffect(() => {\r
    if (!auto) return;\r
    const intervalId = setInterval(next, rotationInterval);\r
    return () => clearInterval(intervalId);\r
  }, [next, rotationInterval, auto]);\r
\r
  return (\r
    <motion.span\r
      className={cn('flex flex-wrap whitespace-pre-wrap relative', mainClassName)}\r
      {...rest}\r
      layout\r
      transition={transition}\r
    >\r
      <span className="sr-only">{texts[currentTextIndex]}</span>\r
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>\r
        <motion.span\r
          key={currentTextIndex}\r
          className={cn(splitBy === 'lines' ? 'flex flex-col w-full' : 'flex flex-wrap whitespace-pre-wrap relative')}\r
          layout\r
          aria-hidden="true"\r
        >\r
          {elements.map((wordObj, wordIndex, array) => {\r
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);\r
            return (\r
              <span key={wordIndex} className={cn('inline-flex', splitLevelClassName)}>\r
                {wordObj.characters.map((char, charIndex) => (\r
                  <motion.span\r
                    key={charIndex}\r
                    initial={initial}\r
                    animate={animate}\r
                    exit={exit}\r
                    transition={{\r
                      ...transition,\r
                      delay: getStaggerDelay(\r
                        previousCharsCount + charIndex,\r
                        array.reduce((sum, word) => sum + word.characters.length, 0)\r
                      )\r
                    }}\r
                    className={cn('inline-block', elementLevelClassName)}\r
                  >\r
                    {char}\r
                  </motion.span>\r
                ))}\r
                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}\r
              </span>\r
            );\r
          })}\r
        </motion.span>\r
      </AnimatePresence>\r
    </motion.span>\r
  );\r
});\r
\r
RotatingText.displayName = 'RotatingText';\r
export default RotatingText;\r
`,xe=`'use client';\r
\r
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';\r
import {\r
  motion,\r
  AnimatePresence,\r
  Transition,\r
  type VariantLabels,\r
  type Target,\r
  type TargetAndTransition\r
} from 'motion/react';\r
\r
import './RotatingText.css';\r
\r
function cn(...classes: (string | undefined | null | boolean)[]): string {\r
  return classes.filter(Boolean).join(' ');\r
}\r
\r
export interface RotatingTextRef {\r
  next: () => void;\r
  previous: () => void;\r
  jumpTo: (index: number) => void;\r
  reset: () => void;\r
}\r
\r
export interface RotatingTextProps\r
  extends Omit<\r
    React.ComponentPropsWithoutRef<typeof motion.span>,\r
    'children' | 'transition' | 'initial' | 'animate' | 'exit'\r
  > {\r
  texts: string[];\r
  transition?: Transition;\r
  initial?: boolean | Target | VariantLabels;\r
  animate?: boolean | VariantLabels | TargetAndTransition;\r
  exit?: Target | VariantLabels;\r
  animatePresenceMode?: 'sync' | 'wait';\r
  animatePresenceInitial?: boolean;\r
  rotationInterval?: number;\r
  staggerDuration?: number;\r
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;\r
  loop?: boolean;\r
  auto?: boolean;\r
  splitBy?: string;\r
  onNext?: (index: number) => void;\r
  mainClassName?: string;\r
  splitLevelClassName?: string;\r
  elementLevelClassName?: string;\r
}\r
\r
const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>((props, ref) => {\r
  const {\r
    texts,\r
    transition = { type: 'spring', damping: 25, stiffness: 300 },\r
    initial = { y: '100%', opacity: 0 },\r
    animate = { y: 0, opacity: 1 },\r
    exit = { y: '-120%', opacity: 0 },\r
    animatePresenceMode = 'wait',\r
    animatePresenceInitial = false,\r
    rotationInterval = 2000,\r
    staggerDuration = 0,\r
    staggerFrom = 'first',\r
    loop = true,\r
    auto = true,\r
    splitBy = 'characters',\r
    onNext,\r
    mainClassName,\r
    splitLevelClassName,\r
    elementLevelClassName,\r
    ...rest\r
  } = props;\r
\r
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);\r
\r
  const splitIntoCharacters = (text: string): string[] => {\r
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {\r
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });\r
      return Array.from(segmenter.segment(text), segment => segment.segment);\r
    }\r
    return Array.from(text);\r
  };\r
\r
  const elements = useMemo(() => {\r
    const currentText: string = texts[currentTextIndex];\r
    if (splitBy === 'characters') {\r
      const words = currentText.split(' ');\r
      return words.map((word, i) => ({\r
        characters: splitIntoCharacters(word),\r
        needsSpace: i !== words.length - 1\r
      }));\r
    }\r
    if (splitBy === 'words') {\r
      return currentText.split(' ').map((word, i, arr) => ({\r
        characters: [word],\r
        needsSpace: i !== arr.length - 1\r
      }));\r
    }\r
    if (splitBy === 'lines') {\r
      return currentText.split('\\n').map((line, i, arr) => ({\r
        characters: [line],\r
        needsSpace: i !== arr.length - 1\r
      }));\r
    }\r
\r
    return currentText.split(splitBy).map((part, i, arr) => ({\r
      characters: [part],\r
      needsSpace: i !== arr.length - 1\r
    }));\r
  }, [texts, currentTextIndex, splitBy]);\r
\r
  const getStaggerDelay = useCallback(\r
    (index: number, totalChars: number): number => {\r
      const total = totalChars;\r
      if (staggerFrom === 'first') return index * staggerDuration;\r
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;\r
      if (staggerFrom === 'center') {\r
        const center = Math.floor(total / 2);\r
        return Math.abs(center - index) * staggerDuration;\r
      }\r
      if (staggerFrom === 'random') {\r
        const randomIndex = Math.floor(Math.random() * total);\r
        return Math.abs(randomIndex - index) * staggerDuration;\r
      }\r
      return Math.abs((staggerFrom as number) - index) * staggerDuration;\r
    },\r
    [staggerFrom, staggerDuration]\r
  );\r
\r
  const handleIndexChange = useCallback(\r
    (newIndex: number) => {\r
      setCurrentTextIndex(newIndex);\r
      if (onNext) onNext(newIndex);\r
    },\r
    [onNext]\r
  );\r
\r
  const next = useCallback(() => {\r
    const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;\r
    if (nextIndex !== currentTextIndex) {\r
      handleIndexChange(nextIndex);\r
    }\r
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);\r
\r
  const previous = useCallback(() => {\r
    const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;\r
    if (prevIndex !== currentTextIndex) {\r
      handleIndexChange(prevIndex);\r
    }\r
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);\r
\r
  const jumpTo = useCallback(\r
    (index: number) => {\r
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));\r
      if (validIndex !== currentTextIndex) {\r
        handleIndexChange(validIndex);\r
      }\r
    },\r
    [texts.length, currentTextIndex, handleIndexChange]\r
  );\r
\r
  const reset = useCallback(() => {\r
    if (currentTextIndex !== 0) {\r
      handleIndexChange(0);\r
    }\r
  }, [currentTextIndex, handleIndexChange]);\r
\r
  useImperativeHandle(\r
    ref,\r
    () => ({\r
      next,\r
      previous,\r
      jumpTo,\r
      reset\r
    }),\r
    [next, previous, jumpTo, reset]\r
  );\r
\r
  useEffect(() => {\r
    if (!auto) return;\r
    const intervalId = setInterval(next, rotationInterval);\r
    return () => clearInterval(intervalId);\r
  }, [next, rotationInterval, auto]);\r
\r
  return (\r
    <motion.span className={cn('text-rotate', mainClassName)} {...rest} layout transition={transition}>\r
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>\r
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>\r
        <motion.span\r
          key={currentTextIndex}\r
          className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')}\r
          layout\r
          aria-hidden="true"\r
        >\r
          {elements.map((wordObj, wordIndex, array) => {\r
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);\r
            return (\r
              <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>\r
                {wordObj.characters.map((char, charIndex) => (\r
                  <motion.span\r
                    key={charIndex}\r
                    initial={initial}\r
                    animate={animate}\r
                    exit={exit}\r
                    transition={{\r
                      ...transition,\r
                      delay: getStaggerDelay(\r
                        previousCharsCount + charIndex,\r
                        array.reduce((sum, word) => sum + word.characters.length, 0)\r
                      )\r
                    }}\r
                    className={cn('text-rotate-element', elementLevelClassName)}\r
                  >\r
                    {char}\r
                  </motion.span>\r
                ))}\r
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}\r
              </span>\r
            );\r
          })}\r
        </motion.span>\r
      </AnimatePresence>\r
    </motion.span>\r
  );\r
});\r
\r
RotatingText.displayName = 'RotatingText';\r
export default RotatingText;\r
`,ue=`import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';\r
import {\r
  motion,\r
  AnimatePresence,\r
  Transition,\r
  type VariantLabels,\r
  type Target,\r
  type TargetAndTransition\r
} from 'motion/react';\r
\r
function cn(...classes: (string | undefined | null | boolean)[]): string {\r
  return classes.filter(Boolean).join(' ');\r
}\r
\r
export interface RotatingTextRef {\r
  next: () => void;\r
  previous: () => void;\r
  jumpTo: (index: number) => void;\r
  reset: () => void;\r
}\r
\r
export interface RotatingTextProps\r
  extends Omit<\r
    React.ComponentPropsWithoutRef<typeof motion.span>,\r
    'children' | 'transition' | 'initial' | 'animate' | 'exit'\r
  > {\r
  texts: string[];\r
  transition?: Transition;\r
  initial?: boolean | Target | VariantLabels;\r
  animate?: boolean | VariantLabels | TargetAndTransition;\r
  exit?: Target | VariantLabels;\r
  animatePresenceMode?: 'sync' | 'wait';\r
  animatePresenceInitial?: boolean;\r
  rotationInterval?: number;\r
  staggerDuration?: number;\r
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;\r
  loop?: boolean;\r
  auto?: boolean;\r
  splitBy?: string;\r
  onNext?: (index: number) => void;\r
  mainClassName?: string;\r
  splitLevelClassName?: string;\r
  elementLevelClassName?: string;\r
}\r
\r
const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(\r
  (\r
    {\r
      texts,\r
      transition = { type: 'spring', damping: 25, stiffness: 300 },\r
      initial = { y: '100%', opacity: 0 },\r
      animate = { y: 0, opacity: 1 },\r
      exit = { y: '-120%', opacity: 0 },\r
      animatePresenceMode = 'wait',\r
      animatePresenceInitial = false,\r
      rotationInterval = 2000,\r
      staggerDuration = 0,\r
      staggerFrom = 'first',\r
      loop = true,\r
      auto = true,\r
      splitBy = 'characters',\r
      onNext,\r
      mainClassName,\r
      splitLevelClassName,\r
      elementLevelClassName,\r
      ...rest\r
    },\r
    ref\r
  ) => {\r
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);\r
\r
    const splitIntoCharacters = (text: string): string[] => {\r
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {\r
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });\r
        return Array.from(segmenter.segment(text), segment => segment.segment);\r
      }\r
      return Array.from(text);\r
    };\r
\r
    const elements = useMemo(() => {\r
      const currentText: string = texts[currentTextIndex];\r
      if (splitBy === 'characters') {\r
        const words = currentText.split(' ');\r
        return words.map((word, i) => ({\r
          characters: splitIntoCharacters(word),\r
          needsSpace: i !== words.length - 1\r
        }));\r
      }\r
      if (splitBy === 'words') {\r
        return currentText.split(' ').map((word, i, arr) => ({\r
          characters: [word],\r
          needsSpace: i !== arr.length - 1\r
        }));\r
      }\r
      if (splitBy === 'lines') {\r
        return currentText.split('\\n').map((line, i, arr) => ({\r
          characters: [line],\r
          needsSpace: i !== arr.length - 1\r
        }));\r
      }\r
\r
      return currentText.split(splitBy).map((part, i, arr) => ({\r
        characters: [part],\r
        needsSpace: i !== arr.length - 1\r
      }));\r
    }, [texts, currentTextIndex, splitBy]);\r
\r
    const getStaggerDelay = useCallback(\r
      (index: number, totalChars: number): number => {\r
        const total = totalChars;\r
        if (staggerFrom === 'first') return index * staggerDuration;\r
        if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;\r
        if (staggerFrom === 'center') {\r
          const center = Math.floor(total / 2);\r
          return Math.abs(center - index) * staggerDuration;\r
        }\r
        if (staggerFrom === 'random') {\r
          const randomIndex = Math.floor(Math.random() * total);\r
          return Math.abs(randomIndex - index) * staggerDuration;\r
        }\r
        return Math.abs((staggerFrom as number) - index) * staggerDuration;\r
      },\r
      [staggerFrom, staggerDuration]\r
    );\r
\r
    const handleIndexChange = useCallback(\r
      (newIndex: number) => {\r
        setCurrentTextIndex(newIndex);\r
        if (onNext) onNext(newIndex);\r
      },\r
      [onNext]\r
    );\r
\r
    const next = useCallback(() => {\r
      const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;\r
      if (nextIndex !== currentTextIndex) {\r
        handleIndexChange(nextIndex);\r
      }\r
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);\r
\r
    const previous = useCallback(() => {\r
      const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;\r
      if (prevIndex !== currentTextIndex) {\r
        handleIndexChange(prevIndex);\r
      }\r
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);\r
\r
    const jumpTo = useCallback(\r
      (index: number) => {\r
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));\r
        if (validIndex !== currentTextIndex) {\r
          handleIndexChange(validIndex);\r
        }\r
      },\r
      [texts.length, currentTextIndex, handleIndexChange]\r
    );\r
\r
    const reset = useCallback(() => {\r
      if (currentTextIndex !== 0) {\r
        handleIndexChange(0);\r
      }\r
    }, [currentTextIndex, handleIndexChange]);\r
\r
    useImperativeHandle(\r
      ref,\r
      () => ({\r
        next,\r
        previous,\r
        jumpTo,\r
        reset\r
      }),\r
      [next, previous, jumpTo, reset]\r
    );\r
\r
    useEffect(() => {\r
      if (!auto) return;\r
      const intervalId = setInterval(next, rotationInterval);\r
      return () => clearInterval(intervalId);\r
    }, [next, rotationInterval, auto]);\r
\r
    return (\r
      <motion.span\r
        className={cn('flex flex-wrap whitespace-pre-wrap relative', mainClassName)}\r
        {...rest}\r
        layout\r
        transition={transition}\r
      >\r
        <span className="sr-only">{texts[currentTextIndex]}</span>\r
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>\r
          <motion.span\r
            key={currentTextIndex}\r
            className={cn(splitBy === 'lines' ? 'flex flex-col w-full' : 'flex flex-wrap whitespace-pre-wrap relative')}\r
            layout\r
            aria-hidden="true"\r
          >\r
            {elements.map((wordObj, wordIndex, array) => {\r
              const previousCharsCount = array\r
                .slice(0, wordIndex)\r
                .reduce((sum, word) => sum + word.characters.length, 0);\r
              return (\r
                <span key={wordIndex} className={cn('inline-flex', splitLevelClassName)}>\r
                  {wordObj.characters.map((char, charIndex) => (\r
                    <motion.span\r
                      key={charIndex}\r
                      initial={initial}\r
                      animate={animate}\r
                      exit={exit}\r
                      transition={{\r
                        ...transition,\r
                        delay: getStaggerDelay(\r
                          previousCharsCount + charIndex,\r
                          array.reduce((sum, word) => sum + word.characters.length, 0)\r
                        )\r
                      }}\r
                      className={cn('inline-block', elementLevelClassName)}\r
                    >\r
                      {char}\r
                    </motion.span>\r
                  ))}\r
                  {wordObj.needsSpace && <span className="whitespace-pre"> </span>}\r
                </span>\r
              );\r
            })}\r
          </motion.span>\r
        </AnimatePresence>\r
      </motion.span>\r
    );\r
  }\r
);\r
\r
RotatingText.displayName = 'RotatingText';\r
export default RotatingText;\r
`,me={dependencies:"motion",usage:`import RotatingText from './RotatingText'
  
<RotatingText
  texts={['React', 'Bits', 'Is', 'Cool!']}
  mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
/>`,code:le,css:ce,tailwind:de,tsCode:xe,tsTailwind:ue},Ie=()=>{const r=[{name:"texts",type:"string[]",default:"[]",description:"An array of text strings to be rotated."},{name:"rotationInterval",type:"number",default:"2000",description:"The interval (in milliseconds) between text rotations."},{name:"initial",type:"object",default:'{ y: "100%", opacity: 0 }',description:"Initial animation state for each element."},{name:"animate",type:"object",default:"{ y: 0, opacity: 1 }",description:"Animation state when elements enter."},{name:"exit",type:"object",default:'{ y: "-120%", opacity: 0 }',description:"Exit animation state for elements."},{name:"animatePresenceMode",type:"string",default:'"wait"',description:"Mode for AnimatePresence; for example, 'wait' to finish exit animations before entering."},{name:"animatePresenceInitial",type:"boolean",default:"false",description:"Determines whether the AnimatePresence component should run its initial animation."},{name:"staggerDuration",type:"number",default:"0",description:"Delay between each character's animation."},{name:"staggerFrom",type:"string",default:'"first"',description:"Specifies the order from which the stagger starts."},{name:"transition",type:"object",default:"",description:"Transition settings for the animations."},{name:"loop",type:"boolean",default:"true",description:"Determines if the rotation should loop back to the first text after the last one."},{name:"auto",type:"boolean",default:"true",description:"If true, the text rotation starts automatically."},{name:"splitBy",type:"string",default:'"characters"',description:"Determines how the text is split into animatable elements (e.g., by characters, words, or lines)."},{name:"onNext",type:"function",default:"undefined",description:"Callback function invoked when the text rotates to the next item."},{name:"mainClassName",type:"string",default:"''",description:"Additional class names for the main container element."},{name:"splitLevelClassName",type:"string",default:"''",description:"Additional class names for the container wrapping each split group (e.g., a word)."},{name:"elementLevelClassName",type:"string",default:"''",description:"Additional class names for each individual animated element."}],o=["thinking","coding","components!"];return t.jsxs(Y,{children:[t.jsxs(Z,{children:[t.jsx(X,{position:"relative",className:"demo-container",minH:400,maxH:400,overflow:"hidden",children:t.jsx("div",{className:"rotating-text-demo",children:t.jsx(oe,{children:t.jsxs(I.p,{className:"rotating-text-ptag",layout:!0,children:[t.jsxs(I.span,{className:"pt-0.5 sm:pt-1 md:pt-2",layout:!0,transition:{type:"spring",damping:30,stiffness:400},children:["Creative"," "]}),t.jsx(F,{texts:o,mainClassName:"rotating-text-main",staggerFrom:"last",initial:{y:"100%"},animate:{y:0},exit:{y:"-120%"},staggerDuration:.025,splitLevelClassName:"rotating-text-split",transition:{type:"spring",damping:30,stiffness:400},rotationInterval:2e3})]})})})}),t.jsx(_,{data:r}),t.jsx(re,{dependencyList:["motion"]})]}),t.jsx($,{children:t.jsx(ee,{codeObject:me})})]})};export{Ie as default};
