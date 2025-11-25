import{r as e,g as H,j as n,B as F}from"./index-wsKSLPNH.js";import{T as J,P as q,a as G,C as K,b as Q}from"./PropTable-C4uPWs8h.js";import{C as X}from"./Customize-1m_ZNqR9.js";import{P}from"./PreviewSwitch-DqnF708j.js";import{P as Y}from"./PreviewSelect-B8u33nUa.js";import{P as y}from"./PreviewSlider-m1G_aiYP.js";import{D as Z}from"./Dependencies-BHoMfJUj.js";import{u as ee}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const re=({text:d,as:s="div",typingSpeed:x=50,initialDelay:g=0,pauseDuration:T=2e3,deletingSpeed:h=30,loop:v=!0,className:I="",showCursor:C=!0,hideCursorWhileTyping:D=!1,cursorCharacter:N="|",cursorClassName:R="",cursorBlinkDuration:w=.5,textColors:i=[],variableSpeed:o,onSentenceComplete:m,startOnVisible:b=!1,reverseMode:S=!1,...M})=>{const[a,A]=e.useState(""),[u,E]=e.useState(0),[r,j]=e.useState(!1),[l,W]=e.useState(0),[_,$]=e.useState(!b),k=e.useRef(null),O=e.useRef(null),c=e.useMemo(()=>Array.isArray(d)?d:[d],[d]),L=e.useCallback(()=>{if(!o)return x;const{min:t,max:f}=o;return Math.random()*(f-t)+t},[o,x]),U=()=>{if(i.length!==0)return i[l%i.length]};e.useEffect(()=>{if(!b||!O.current)return;const t=new IntersectionObserver(f=>{f.forEach(V=>{V.isIntersecting&&$(!0)})},{threshold:.1});return t.observe(O.current),()=>t.disconnect()},[b]),e.useEffect(()=>{C&&k.current&&(H.set(k.current,{opacity:1}),H.to(k.current,{opacity:0,duration:w,repeat:-1,yoyo:!0,ease:"power2.inOut"}))},[C,w]),e.useEffect(()=>{if(!_)return;let t;const f=c[l],V=S?f.split("").reverse().join(""):f,B=()=>{if(r)if(a===""){if(j(!1),l===c.length-1&&!v)return;m&&m(c[l],l),W(p=>(p+1)%c.length),E(0),t=setTimeout(()=>{},T)}else t=setTimeout(()=>{A(p=>p.slice(0,-1))},h);else u<V.length?t=setTimeout(()=>{A(p=>p+V[u]),E(p=>p+1)},o?L():x):c.length>1&&(t=setTimeout(()=>{j(!0)},T))};return u===0&&!r&&a===""?t=setTimeout(B,g):B(),()=>clearTimeout(t)},[u,a,r,x,h,T,c,l,v,g,_,S,o,m]);const z=D&&(u<c[l].length||r);return e.createElement(s,{ref:O,className:`text-type ${I}`,...M},n.jsx("span",{className:"text-type__content",style:{color:U()||"inherit"},children:a}),C&&n.jsx("span",{ref:k,className:`text-type__cursor ${R} ${z?"text-type__cursor--hidden":""}`,children:N}))},ne=`'use client';\r
\r
import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';\r
import { gsap } from 'gsap';\r
import './TextType.css';\r
\r
const TextType = ({\r
  text,\r
  as: Component = 'div',\r
  typingSpeed = 50,\r
  initialDelay = 0,\r
  pauseDuration = 2000,\r
  deletingSpeed = 30,\r
  loop = true,\r
  className = '',\r
  showCursor = true,\r
  hideCursorWhileTyping = false,\r
  cursorCharacter = '|',\r
  cursorClassName = '',\r
  cursorBlinkDuration = 0.5,\r
  textColors = [],\r
  variableSpeed,\r
  onSentenceComplete,\r
  startOnVisible = false,\r
  reverseMode = false,\r
  ...props\r
}) => {\r
  const [displayedText, setDisplayedText] = useState('');\r
  const [currentCharIndex, setCurrentCharIndex] = useState(0);\r
  const [isDeleting, setIsDeleting] = useState(false);\r
  const [currentTextIndex, setCurrentTextIndex] = useState(0);\r
  const [isVisible, setIsVisible] = useState(!startOnVisible);\r
  const cursorRef = useRef(null);\r
  const containerRef = useRef(null);\r
\r
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);\r
\r
  const getRandomSpeed = useCallback(() => {\r
    if (!variableSpeed) return typingSpeed;\r
    const { min, max } = variableSpeed;\r
    return Math.random() * (max - min) + min;\r
  }, [variableSpeed, typingSpeed]);\r
\r
  const getCurrentTextColor = () => {\r
    if (textColors.length === 0) return;\r
    return textColors[currentTextIndex % textColors.length];\r
  };\r
\r
  useEffect(() => {\r
    if (!startOnVisible || !containerRef.current) return;\r
\r
    const observer = new IntersectionObserver(\r
      entries => {\r
        entries.forEach(entry => {\r
          if (entry.isIntersecting) {\r
            setIsVisible(true);\r
          }\r
        });\r
      },\r
      { threshold: 0.1 }\r
    );\r
\r
    observer.observe(containerRef.current);\r
    return () => observer.disconnect();\r
  }, [startOnVisible]);\r
\r
  useEffect(() => {\r
    if (showCursor && cursorRef.current) {\r
      gsap.set(cursorRef.current, { opacity: 1 });\r
      gsap.to(cursorRef.current, {\r
        opacity: 0,\r
        duration: cursorBlinkDuration,\r
        repeat: -1,\r
        yoyo: true,\r
        ease: 'power2.inOut'\r
      });\r
    }\r
  }, [showCursor, cursorBlinkDuration]);\r
\r
  useEffect(() => {\r
    if (!isVisible) return;\r
\r
    let timeout;\r
    const currentText = textArray[currentTextIndex];\r
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;\r
\r
    const executeTypingAnimation = () => {\r
      if (isDeleting) {\r
        if (displayedText === '') {\r
          setIsDeleting(false);\r
          if (currentTextIndex === textArray.length - 1 && !loop) {\r
            return;\r
          }\r
\r
          if (onSentenceComplete) {\r
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);\r
          }\r
\r
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);\r
          setCurrentCharIndex(0);\r
          timeout = setTimeout(() => {}, pauseDuration);\r
        } else {\r
          timeout = setTimeout(() => {\r
            setDisplayedText(prev => prev.slice(0, -1));\r
          }, deletingSpeed);\r
        }\r
      } else {\r
        if (currentCharIndex < processedText.length) {\r
          timeout = setTimeout(\r
            () => {\r
              setDisplayedText(prev => prev + processedText[currentCharIndex]);\r
              setCurrentCharIndex(prev => prev + 1);\r
            },\r
            variableSpeed ? getRandomSpeed() : typingSpeed\r
          );\r
        } else if (textArray.length > 1) {\r
          timeout = setTimeout(() => {\r
            setIsDeleting(true);\r
          }, pauseDuration);\r
        }\r
      }\r
    };\r
\r
    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {\r
      timeout = setTimeout(executeTypingAnimation, initialDelay);\r
    } else {\r
      executeTypingAnimation();\r
    }\r
\r
    return () => clearTimeout(timeout);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    currentCharIndex,\r
    displayedText,\r
    isDeleting,\r
    typingSpeed,\r
    deletingSpeed,\r
    pauseDuration,\r
    textArray,\r
    currentTextIndex,\r
    loop,\r
    initialDelay,\r
    isVisible,\r
    reverseMode,\r
    variableSpeed,\r
    onSentenceComplete\r
  ]);\r
\r
  const shouldHideCursor =\r
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);\r
\r
  return createElement(\r
    Component,\r
    {\r
      ref: containerRef,\r
      className: \`text-type \${className}\`,\r
      ...props\r
    },\r
    <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit' }}>\r
      {displayedText}\r
    </span>,\r
    showCursor && (\r
      <span\r
        ref={cursorRef}\r
        className={\`text-type__cursor \${cursorClassName} \${shouldHideCursor ? 'text-type__cursor--hidden' : ''}\`}\r
      >\r
        {cursorCharacter}\r
      </span>\r
    )\r
  );\r
};\r
\r
export default TextType;\r
`,te=`.text-type {\r
  display: inline-block;\r
  white-space: pre-wrap;\r
}\r
\r
.text-type__cursor {\r
  margin-left: 0.25rem;\r
  display: inline-block;\r
  opacity: 1;\r
}\r
\r
.text-type__cursor--hidden {\r
  display: none;\r
}\r
`,se=`'use client';\r
\r
import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';\r
import { gsap } from 'gsap';\r
\r
const TextType = ({\r
  text,\r
  as: Component = 'div',\r
  typingSpeed = 50,\r
  initialDelay = 0,\r
  pauseDuration = 2000,\r
  deletingSpeed = 30,\r
  loop = true,\r
  className = '',\r
  showCursor = true,\r
  hideCursorWhileTyping = false,\r
  cursorCharacter = '|',\r
  cursorClassName = '',\r
  cursorBlinkDuration = 0.5,\r
  textColors = [],\r
  variableSpeed,\r
  onSentenceComplete,\r
  startOnVisible = false,\r
  reverseMode = false,\r
  ...props\r
}) => {\r
  const [displayedText, setDisplayedText] = useState('');\r
  const [currentCharIndex, setCurrentCharIndex] = useState(0);\r
  const [isDeleting, setIsDeleting] = useState(false);\r
  const [currentTextIndex, setCurrentTextIndex] = useState(0);\r
  const [isVisible, setIsVisible] = useState(!startOnVisible);\r
  const cursorRef = useRef(null);\r
  const containerRef = useRef(null);\r
\r
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);\r
\r
  const getRandomSpeed = useCallback(() => {\r
    if (!variableSpeed) return typingSpeed;\r
    const { min, max } = variableSpeed;\r
    return Math.random() * (max - min) + min;\r
  }, [variableSpeed, typingSpeed]);\r
\r
  const getCurrentTextColor = () => {\r
    if (textColors.length === 0) return;\r
    return textColors[currentTextIndex % textColors.length];\r
  };\r
\r
  useEffect(() => {\r
    if (!startOnVisible || !containerRef.current) return;\r
\r
    const observer = new IntersectionObserver(\r
      entries => {\r
        entries.forEach(entry => {\r
          if (entry.isIntersecting) {\r
            setIsVisible(true);\r
          }\r
        });\r
      },\r
      { threshold: 0.1 }\r
    );\r
\r
    observer.observe(containerRef.current);\r
    return () => observer.disconnect();\r
  }, [startOnVisible]);\r
\r
  useEffect(() => {\r
    if (showCursor && cursorRef.current) {\r
      gsap.set(cursorRef.current, { opacity: 1 });\r
      gsap.to(cursorRef.current, {\r
        opacity: 0,\r
        duration: cursorBlinkDuration,\r
        repeat: -1,\r
        yoyo: true,\r
        ease: 'power2.inOut'\r
      });\r
    }\r
  }, [showCursor, cursorBlinkDuration]);\r
\r
  useEffect(() => {\r
    if (!isVisible) return;\r
\r
    let timeout;\r
\r
    const currentText = textArray[currentTextIndex];\r
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;\r
\r
    const executeTypingAnimation = () => {\r
      if (isDeleting) {\r
        if (displayedText === '') {\r
          setIsDeleting(false);\r
          if (currentTextIndex === textArray.length - 1 && !loop) {\r
            return;\r
          }\r
\r
          if (onSentenceComplete) {\r
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);\r
          }\r
\r
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);\r
          setCurrentCharIndex(0);\r
          timeout = setTimeout(() => {}, pauseDuration);\r
        } else {\r
          timeout = setTimeout(() => {\r
            setDisplayedText(prev => prev.slice(0, -1));\r
          }, deletingSpeed);\r
        }\r
      } else {\r
        if (currentCharIndex < processedText.length) {\r
          timeout = setTimeout(\r
            () => {\r
              setDisplayedText(prev => prev + processedText[currentCharIndex]);\r
              setCurrentCharIndex(prev => prev + 1);\r
            },\r
            variableSpeed ? getRandomSpeed() : typingSpeed\r
          );\r
        } else if (textArray.length > 1) {\r
          timeout = setTimeout(() => {\r
            setIsDeleting(true);\r
          }, pauseDuration);\r
        }\r
      }\r
    };\r
\r
    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {\r
      timeout = setTimeout(executeTypingAnimation, initialDelay);\r
    } else {\r
      executeTypingAnimation();\r
    }\r
\r
    return () => clearTimeout(timeout);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    currentCharIndex,\r
    displayedText,\r
    isDeleting,\r
    typingSpeed,\r
    deletingSpeed,\r
    pauseDuration,\r
    textArray,\r
    currentTextIndex,\r
    loop,\r
    initialDelay,\r
    isVisible,\r
    reverseMode,\r
    variableSpeed,\r
    onSentenceComplete\r
  ]);\r
\r
  const shouldHideCursor =\r
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);\r
\r
  return createElement(\r
    Component,\r
    {\r
      ref: containerRef,\r
      className: \`inline-block whitespace-pre-wrap tracking-tight \${className}\`,\r
      ...props\r
    },\r
    <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>\r
      {displayedText}\r
    </span>,\r
    showCursor && (\r
      <span\r
        ref={cursorRef}\r
        className={\`ml-1 inline-block opacity-100 \${shouldHideCursor ? 'hidden' : ''} \${cursorClassName}\`}\r
      >\r
        {cursorCharacter}\r
      </span>\r
    )\r
  );\r
};\r
\r
export default TextType;\r
`,ie=`'use client';\r
\r
import { ElementType, useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';\r
import { gsap } from 'gsap';\r
import './TextType.css';\r
\r
interface TextTypeProps {\r
  className?: string;\r
  showCursor?: boolean;\r
  hideCursorWhileTyping?: boolean;\r
  cursorCharacter?: string | React.ReactNode;\r
  cursorBlinkDuration?: number;\r
  cursorClassName?: string;\r
  text: string | string[];\r
  as?: ElementType;\r
  typingSpeed?: number;\r
  initialDelay?: number;\r
  pauseDuration?: number;\r
  deletingSpeed?: number;\r
  loop?: boolean;\r
  textColors?: string[];\r
  variableSpeed?: { min: number; max: number };\r
  onSentenceComplete?: (sentence: string, index: number) => void;\r
  startOnVisible?: boolean;\r
  reverseMode?: boolean;\r
}\r
\r
const TextType = ({\r
  text,\r
  as: Component = 'div',\r
  typingSpeed = 50,\r
  initialDelay = 0,\r
  pauseDuration = 2000,\r
  deletingSpeed = 30,\r
  loop = true,\r
  className = '',\r
  showCursor = true,\r
  hideCursorWhileTyping = false,\r
  cursorCharacter = '|',\r
  cursorClassName = '',\r
  cursorBlinkDuration = 0.5,\r
  textColors = [],\r
  variableSpeed,\r
  onSentenceComplete,\r
  startOnVisible = false,\r
  reverseMode = false,\r
  ...props\r
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {\r
  const [displayedText, setDisplayedText] = useState('');\r
  const [currentCharIndex, setCurrentCharIndex] = useState(0);\r
  const [isDeleting, setIsDeleting] = useState(false);\r
  const [currentTextIndex, setCurrentTextIndex] = useState(0);\r
  const [isVisible, setIsVisible] = useState(!startOnVisible);\r
  const cursorRef = useRef<HTMLSpanElement>(null);\r
  const containerRef = useRef<HTMLElement>(null);\r
\r
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);\r
\r
  const getRandomSpeed = useCallback(() => {\r
    if (!variableSpeed) return typingSpeed;\r
    const { min, max } = variableSpeed;\r
    return Math.random() * (max - min) + min;\r
  }, [variableSpeed, typingSpeed]);\r
\r
  const getCurrentTextColor = () => {\r
    if (textColors.length === 0) return;\r
    return textColors[currentTextIndex % textColors.length];\r
  };\r
\r
  useEffect(() => {\r
    if (!startOnVisible || !containerRef.current) return;\r
\r
    const observer = new IntersectionObserver(\r
      entries => {\r
        entries.forEach(entry => {\r
          if (entry.isIntersecting) {\r
            setIsVisible(true);\r
          }\r
        });\r
      },\r
      { threshold: 0.1 }\r
    );\r
\r
    observer.observe(containerRef.current);\r
    return () => observer.disconnect();\r
  }, [startOnVisible]);\r
\r
  useEffect(() => {\r
    if (showCursor && cursorRef.current) {\r
      gsap.set(cursorRef.current, { opacity: 1 });\r
      gsap.to(cursorRef.current, {\r
        opacity: 0,\r
        duration: cursorBlinkDuration,\r
        repeat: -1,\r
        yoyo: true,\r
        ease: 'power2.inOut'\r
      });\r
    }\r
  }, [showCursor, cursorBlinkDuration]);\r
\r
  useEffect(() => {\r
    if (!isVisible) return;\r
\r
    let timeout: NodeJS.Timeout;\r
\r
    const currentText = textArray[currentTextIndex];\r
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;\r
\r
    const executeTypingAnimation = () => {\r
      if (isDeleting) {\r
        if (displayedText === '') {\r
          setIsDeleting(false);\r
          if (currentTextIndex === textArray.length - 1 && !loop) {\r
            return;\r
          }\r
\r
          if (onSentenceComplete) {\r
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);\r
          }\r
\r
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);\r
          setCurrentCharIndex(0);\r
          timeout = setTimeout(() => {}, pauseDuration);\r
        } else {\r
          timeout = setTimeout(() => {\r
            setDisplayedText(prev => prev.slice(0, -1));\r
          }, deletingSpeed);\r
        }\r
      } else {\r
        if (currentCharIndex < processedText.length) {\r
          timeout = setTimeout(\r
            () => {\r
              setDisplayedText(prev => prev + processedText[currentCharIndex]);\r
              setCurrentCharIndex(prev => prev + 1);\r
            },\r
            variableSpeed ? getRandomSpeed() : typingSpeed\r
          );\r
        } else if (textArray.length > 1) {\r
          timeout = setTimeout(() => {\r
            setIsDeleting(true);\r
          }, pauseDuration);\r
        }\r
      }\r
    };\r
\r
    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {\r
      timeout = setTimeout(executeTypingAnimation, initialDelay);\r
    } else {\r
      executeTypingAnimation();\r
    }\r
\r
    return () => clearTimeout(timeout);\r
  }, [\r
    currentCharIndex,\r
    displayedText,\r
    isDeleting,\r
    typingSpeed,\r
    deletingSpeed,\r
    pauseDuration,\r
    textArray,\r
    currentTextIndex,\r
    loop,\r
    initialDelay,\r
    isVisible,\r
    reverseMode,\r
    variableSpeed,\r
    onSentenceComplete\r
  ]);\r
\r
  const shouldHideCursor =\r
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);\r
\r
  return createElement(\r
    Component,\r
    {\r
      ref: containerRef,\r
      className: \`text-type \${className}\`,\r
      ...props\r
    },\r
    <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit' }}>\r
      {displayedText}\r
    </span>,\r
    showCursor && (\r
      <span\r
        ref={cursorRef}\r
        className={\`text-type__cursor \${cursorClassName} \${shouldHideCursor ? 'text-type__cursor--hidden' : ''}\`}\r
      >\r
        {cursorCharacter}\r
      </span>\r
    )\r
  );\r
};\r
\r
export default TextType;\r
`,oe=`'use client';\r
\r
import { ElementType, useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';\r
import { gsap } from 'gsap';\r
\r
interface TextTypeProps {\r
  className?: string;\r
  showCursor?: boolean;\r
  hideCursorWhileTyping?: boolean;\r
  cursorCharacter?: string | React.ReactNode;\r
  cursorBlinkDuration?: number;\r
  cursorClassName?: string;\r
  text: string | string[];\r
  as?: ElementType;\r
  typingSpeed?: number;\r
  initialDelay?: number;\r
  pauseDuration?: number;\r
  deletingSpeed?: number;\r
  loop?: boolean;\r
  textColors?: string[];\r
  variableSpeed?: { min: number; max: number };\r
  onSentenceComplete?: (sentence: string, index: number) => void;\r
  startOnVisible?: boolean;\r
  reverseMode?: boolean;\r
}\r
\r
const TextType = ({\r
  text,\r
  as: Component = 'div',\r
  typingSpeed = 50,\r
  initialDelay = 0,\r
  pauseDuration = 2000,\r
  deletingSpeed = 30,\r
  loop = true,\r
  className = '',\r
  showCursor = true,\r
  hideCursorWhileTyping = false,\r
  cursorCharacter = '|',\r
  cursorClassName = '',\r
  cursorBlinkDuration = 0.5,\r
  textColors = [],\r
  variableSpeed,\r
  onSentenceComplete,\r
  startOnVisible = false,\r
  reverseMode = false,\r
  ...props\r
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {\r
  const [displayedText, setDisplayedText] = useState('');\r
  const [currentCharIndex, setCurrentCharIndex] = useState(0);\r
  const [isDeleting, setIsDeleting] = useState(false);\r
  const [currentTextIndex, setCurrentTextIndex] = useState(0);\r
  const [isVisible, setIsVisible] = useState(!startOnVisible);\r
  const cursorRef = useRef<HTMLSpanElement>(null);\r
  const containerRef = useRef<HTMLElement>(null);\r
\r
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);\r
\r
  const getRandomSpeed = useCallback(() => {\r
    if (!variableSpeed) return typingSpeed;\r
    const { min, max } = variableSpeed;\r
    return Math.random() * (max - min) + min;\r
  }, [variableSpeed, typingSpeed]);\r
\r
  const getCurrentTextColor = () => {\r
    if (textColors.length === 0) return;\r
    return textColors[currentTextIndex % textColors.length];\r
  };\r
\r
  useEffect(() => {\r
    if (!startOnVisible || !containerRef.current) return;\r
\r
    const observer = new IntersectionObserver(\r
      entries => {\r
        entries.forEach(entry => {\r
          if (entry.isIntersecting) {\r
            setIsVisible(true);\r
          }\r
        });\r
      },\r
      { threshold: 0.1 }\r
    );\r
\r
    observer.observe(containerRef.current);\r
    return () => observer.disconnect();\r
  }, [startOnVisible]);\r
\r
  useEffect(() => {\r
    if (showCursor && cursorRef.current) {\r
      gsap.set(cursorRef.current, { opacity: 1 });\r
      gsap.to(cursorRef.current, {\r
        opacity: 0,\r
        duration: cursorBlinkDuration,\r
        repeat: -1,\r
        yoyo: true,\r
        ease: 'power2.inOut'\r
      });\r
    }\r
  }, [showCursor, cursorBlinkDuration]);\r
\r
  useEffect(() => {\r
    if (!isVisible) return;\r
\r
    let timeout: NodeJS.Timeout;\r
\r
    const currentText = textArray[currentTextIndex];\r
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;\r
\r
    const executeTypingAnimation = () => {\r
      if (isDeleting) {\r
        if (displayedText === '') {\r
          setIsDeleting(false);\r
          if (currentTextIndex === textArray.length - 1 && !loop) {\r
            return;\r
          }\r
\r
          if (onSentenceComplete) {\r
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);\r
          }\r
\r
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);\r
          setCurrentCharIndex(0);\r
          timeout = setTimeout(() => {}, pauseDuration);\r
        } else {\r
          timeout = setTimeout(() => {\r
            setDisplayedText(prev => prev.slice(0, -1));\r
          }, deletingSpeed);\r
        }\r
      } else {\r
        if (currentCharIndex < processedText.length) {\r
          timeout = setTimeout(\r
            () => {\r
              setDisplayedText(prev => prev + processedText[currentCharIndex]);\r
              setCurrentCharIndex(prev => prev + 1);\r
            },\r
            variableSpeed ? getRandomSpeed() : typingSpeed\r
          );\r
        } else if (textArray.length > 1) {\r
          timeout = setTimeout(() => {\r
            setIsDeleting(true);\r
          }, pauseDuration);\r
        }\r
      }\r
    };\r
\r
    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {\r
      timeout = setTimeout(executeTypingAnimation, initialDelay);\r
    } else {\r
      executeTypingAnimation();\r
    }\r
\r
    return () => clearTimeout(timeout);\r
  }, [\r
    currentCharIndex,\r
    displayedText,\r
    isDeleting,\r
    typingSpeed,\r
    deletingSpeed,\r
    pauseDuration,\r
    textArray,\r
    currentTextIndex,\r
    loop,\r
    initialDelay,\r
    isVisible,\r
    reverseMode,\r
    variableSpeed,\r
    onSentenceComplete\r
  ]);\r
\r
  const shouldHideCursor =\r
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);\r
\r
  return createElement(\r
    Component,\r
    {\r
      ref: containerRef,\r
      className: \`inline-block whitespace-pre-wrap tracking-tight \${className}\`,\r
      ...props\r
    },\r
    <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>\r
      {displayedText}\r
    </span>,\r
    showCursor && (\r
      <span\r
        ref={cursorRef}\r
        className={\`ml-1 inline-block opacity-100 \${shouldHideCursor ? 'hidden' : ''} \${cursorClassName}\`}\r
      >\r
        {cursorCharacter}\r
      </span>\r
    )\r
  );\r
};\r
\r
export default TextType;\r
`,ae={dependencies:"gsap",usage:`import TextType from './TextType';

<TextType 
  text={["Text typing effect", "for your websites", "Happy coding!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>`,code:ne,css:te,tailwind:se,tsCode:ie,tsTailwind:oe},Te=()=>{const[d,s]=ee(),[x]=e.useState(["Welcome to React Bits! It's great to have you here!","Build some amazing experiences!"]),[g,T]=e.useState(75),[h,v]=e.useState(1500),[I,C]=e.useState(50),[D,N]=e.useState(!0),[R,w]=e.useState("_"),[i,o]=e.useState(!1),[m,b]=e.useState(60),[S,M]=e.useState(120),[a,A]=e.useState(.5),u=[{value:"_",label:"Underscore (_)"},{value:"|",label:"Pipe (|)"},{value:"▎",label:"Block (▎)"},{value:"●",label:"Dot (●)"},{value:"█",label:"Full Block (█)"}],E=[{name:"text",type:"string | string[]",default:"-",description:"Text or array of texts to type out"},{name:"as",type:"ElementType",default:"div",description:"HTML tag to render the component as"},{name:"typingSpeed",type:"number",default:"50",description:"Speed of typing in milliseconds"},{name:"initialDelay",type:"number",default:"0",description:"Initial delay before typing starts"},{name:"pauseDuration",type:"number",default:"2000",description:"Time to wait between typing and deleting"},{name:"deletingSpeed",type:"number",default:"30",description:"Speed of deleting characters"},{name:"loop",type:"boolean",default:"true",description:"Whether to loop through texts array"},{name:"className",type:"string",default:"''",description:"Optional class name for styling"},{name:"showCursor",type:"boolean",default:"true",description:"Whether to show the cursor"},{name:"hideCursorWhileTyping",type:"boolean",default:"false",description:"Hide cursor while typing"},{name:"cursorCharacter",type:"string | React.ReactNode",default:"|",description:"Character or React node to use as cursor"},{name:"cursorBlinkDuration",type:"number",default:"0.5",description:"Animation duration for cursor blinking"},{name:"cursorClassName",type:"string",default:"''",description:"Optional class name for cursor styling"},{name:"textColors",type:"string[]",default:"[]",description:"Array of colors for each sentence"},{name:"variableSpeed",type:"{min: number, max: number}",default:"undefined",description:"Random typing speed within range for human-like feel"},{name:"onSentenceComplete",type:"(sentence: string, index: number) => void",default:"undefined",description:"Callback fired after each sentence is finished"},{name:"startOnVisible",type:"boolean",default:"false",description:"Start typing when component is visible in viewport"},{name:"reverseMode",type:"boolean",default:"false",description:"Type backwards (right to left)"}];return n.jsxs(J,{children:[n.jsxs(q,{children:[n.jsx(F,{position:"relative",className:"demo-container",h:350,p:16,overflow:"hidden",alignItems:"flex-start",justifyContent:"flex-start",children:n.jsx(re,{text:x,typingSpeed:g,pauseDuration:h,deletingSpeed:I,showCursor:D,cursorCharacter:R,cursorBlinkDuration:a,variableSpeed:i?{min:m,max:S}:void 0,className:"custom-text-type"},d)}),n.jsxs(X,{children:[n.jsx(Y,{title:"Cursor Character",options:u,value:R,width:150,onChange:r=>{w(r),s()}}),n.jsx(y,{title:"Typing Speed",min:10,max:200,step:5,value:g,valueUnit:"ms",width:200,onChange:r=>{T(r),s()}}),n.jsx(y,{title:"Pause Duration",min:500,max:5e3,step:100,value:h,valueUnit:"ms",width:200,onChange:r=>{v(r),s()}}),n.jsx(y,{title:"Deleting Speed",min:10,max:100,step:5,value:I,valueUnit:"ms",width:200,onChange:r=>{C(r),s()}}),n.jsx(y,{title:"Cursor Blink Duration",min:.1,max:2,step:.1,value:a,valueUnit:"s",width:200,onChange:r=>{A(r),s()}}),n.jsx(P,{title:"Show Cursor",isChecked:D,onChange:r=>{N(r),s()}}),n.jsx(P,{title:"Variable Speed",isChecked:i,onChange:r=>{o(r),s()}}),n.jsx(y,{title:"Variable Speed Min",isDisabled:!i,min:10,max:150,step:5,value:m,valueUnit:"ms",width:200,onChange:r=>{b(r),s()}}),n.jsx(y,{title:"Variable Speed Max",isDisabled:!i,min:50,max:300,step:5,value:S,valueUnit:"ms",width:200,onChange:r=>{M(r),s()}})]}),n.jsx(G,{data:E}),n.jsx(Z,{dependencyList:["gsap"]})]}),n.jsx(K,{children:n.jsx(Q,{codeObject:ae})})]})};export{Te as default};
