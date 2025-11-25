import{r as o,bA as ir,S as cr,e as Rr,bz as fr,g as D,j as s,B as vr}from"./index-wsKSLPNH.js";import{T as Cr,P as Tr,a as Er,C as Mr,b as Hr}from"./PropTable-C4uPWs8h.js";import{C as Ar}from"./Customize-1m_ZNqR9.js";import{P as ar}from"./PreviewSwitch-DqnF708j.js";import{P as B}from"./PreviewSlider-m1G_aiYP.js";import{P as lr}from"./PreviewSelect-B8u33nUa.js";import{D as Lr}from"./Dependencies-BHoMfJUj.js";import{R as Dr}from"./RefreshButton-CA3SFRlq.js";import{u as kr}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const Or=`import React, { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
import { SplitText as GSAPSplitText } from 'gsap/SplitText';\r
import { useGSAP } from '@gsap/react';\r
import './Shuffle.css';\r
\r
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);\r
\r
const Shuffle = ({\r
  text,\r
  className = '',\r
  style = {},\r
  shuffleDirection = 'right',\r
  duration = 0.35,\r
  maxDelay = 0,\r
  ease = 'power3.out',\r
  threshold = 0.1,\r
  rootMargin = '-100px',\r
  tag = 'p',\r
  textAlign = 'center',\r
  onShuffleComplete,\r
  shuffleTimes = 1,\r
  animationMode = 'evenodd',\r
  loop = false,\r
  loopDelay = 0,\r
  stagger = 0.03,\r
  scrambleCharset = '',\r
  colorFrom,\r
  colorTo,\r
  triggerOnce = true,\r
  respectReducedMotion = true,\r
  triggerOnHover = true\r
}) => {\r
  const ref = useRef(null);\r
  const [fontsLoaded, setFontsLoaded] = useState(false);\r
  const [ready, setReady] = useState(false);\r
\r
  const splitRef = useRef(null);\r
  const wrappersRef = useRef([]);\r
  const tlRef = useRef(null);\r
  const playingRef = useRef(false);\r
  const hoverHandlerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if ('fonts' in document) {\r
      if (document.fonts.status === 'loaded') setFontsLoaded(true);\r
      else document.fonts.ready.then(() => setFontsLoaded(true));\r
    } else setFontsLoaded(true);\r
  }, []);\r
\r
  useGSAP(\r
    () => {\r
      if (!ref.current || !text || !fontsLoaded) return;\r
      if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\r
        setReady(true);\r
        onShuffleComplete?.();\r
        return;\r
      }\r
\r
      const el = ref.current;\r
\r
      const startPct = (1 - threshold) * 100;\r
      const mm = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');\r
      const mv = mm ? parseFloat(mm[1]) : 0;\r
      const mu = mm ? mm[2] || 'px' : 'px';\r
      const sign = mv === 0 ? '' : mv < 0 ? \`-=\${Math.abs(mv)}\${mu}\` : \`+=\${mv}\${mu}\`;\r
      const start = \`top \${startPct}%\${sign}\`;\r
\r
      const removeHover = () => {\r
        if (hoverHandlerRef.current && ref.current) {\r
          ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);\r
          hoverHandlerRef.current = null;\r
        }\r
      };\r
\r
      const teardown = () => {\r
        if (tlRef.current) {\r
          tlRef.current.kill();\r
          tlRef.current = null;\r
        }\r
        if (wrappersRef.current.length) {\r
          wrappersRef.current.forEach(wrap => {\r
            const inner = wrap.firstElementChild;\r
            const orig = inner?.querySelector('[data-orig="1"]');\r
            if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);\r
          });\r
          wrappersRef.current = [];\r
        }\r
        try {\r
          splitRef.current?.revert();\r
        } catch {\r
          /* noop */\r
        }\r
        splitRef.current = null;\r
        playingRef.current = false;\r
      };\r
\r
      const build = () => {\r
        teardown();\r
\r
        splitRef.current = new GSAPSplitText(el, {\r
          type: 'chars',\r
          charsClass: 'shuffle-char',\r
          wordsClass: 'shuffle-word',\r
          linesClass: 'shuffle-line',\r
          smartWrap: true,\r
          reduceWhiteSpace: false\r
        });\r
\r
        const chars = splitRef.current.chars || [];\r
        wrappersRef.current = [];\r
\r
        const rolls = Math.max(1, Math.floor(shuffleTimes));\r
        const rand = set => set.charAt(Math.floor(Math.random() * set.length)) || '';\r
\r
        chars.forEach(ch => {\r
          const parent = ch.parentElement;\r
          if (!parent) return;\r
\r
          const w = ch.getBoundingClientRect().width;\r
          if (!w) return;\r
\r
          const wrap = document.createElement('span');\r
          Object.assign(wrap.style, {\r
            display: 'inline-block',\r
            overflow: 'hidden',\r
            width: w + 'px',\r
            verticalAlign: 'baseline'\r
          });\r
\r
          const inner = document.createElement('span');\r
          Object.assign(inner.style, {\r
            display: 'inline-block',\r
            whiteSpace: 'nowrap',\r
            willChange: 'transform'\r
          });\r
\r
          parent.insertBefore(wrap, ch);\r
          wrap.appendChild(inner);\r
\r
          const firstOrig = ch.cloneNode(true);\r
          Object.assign(firstOrig.style, { display: 'inline-block', width: w + 'px', textAlign: 'center' });\r
\r
          ch.setAttribute('data-orig', '1');\r
          Object.assign(ch.style, { display: 'inline-block', width: w + 'px', textAlign: 'center' });\r
\r
          inner.appendChild(firstOrig);\r
          for (let k = 0; k < rolls; k++) {\r
            const c = ch.cloneNode(true);\r
            if (scrambleCharset) c.textContent = rand(scrambleCharset);\r
            Object.assign(c.style, { display: 'inline-block', width: w + 'px', textAlign: 'center' });\r
            inner.appendChild(c);\r
          }\r
          inner.appendChild(ch);\r
\r
          const steps = rolls + 1;\r
          let startX = 0;\r
          let finalX = -steps * w;\r
          if (shuffleDirection === 'right') {\r
            const firstCopy = inner.firstElementChild;\r
            const real = inner.lastElementChild;\r
            if (real) inner.insertBefore(real, inner.firstChild);\r
            if (firstCopy) inner.appendChild(firstCopy);\r
            startX = -steps * w;\r
            finalX = 0;\r
          }\r
\r
          gsap.set(inner, { x: startX, force3D: true });\r
          if (colorFrom) inner.style.color = colorFrom;\r
\r
          inner.setAttribute('data-final-x', String(finalX));\r
          inner.setAttribute('data-start-x', String(startX));\r
\r
          wrappersRef.current.push(wrap);\r
        });\r
      };\r
\r
      const inners = () => wrappersRef.current.map(w => w.firstElementChild);\r
\r
      const randomizeScrambles = () => {\r
        if (!scrambleCharset) return;\r
        wrappersRef.current.forEach(w => {\r
          const strip = w.firstElementChild;\r
          if (!strip) return;\r
          const kids = Array.from(strip.children);\r
          for (let i = 1; i < kids.length - 1; i++) {\r
            kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));\r
          }\r
        });\r
      };\r
\r
      const cleanupToStill = () => {\r
        wrappersRef.current.forEach(w => {\r
          const strip = w.firstElementChild;\r
          if (!strip) return;\r
          const real = strip.querySelector('[data-orig="1"]');\r
          if (!real) return;\r
          strip.replaceChildren(real);\r
          strip.style.transform = 'none';\r
          strip.style.willChange = 'auto';\r
        });\r
      };\r
\r
      const play = () => {\r
        const strips = inners();\r
        if (!strips.length) return;\r
\r
        playingRef.current = true;\r
\r
        const tl = gsap.timeline({\r
          smoothChildTiming: true,\r
          repeat: loop ? -1 : 0,\r
          repeatDelay: loop ? loopDelay : 0,\r
          onRepeat: () => {\r
            if (scrambleCharset) randomizeScrambles();\r
            gsap.set(strips, { x: (i, t) => parseFloat(t.getAttribute('data-start-x') || '0') });\r
            onShuffleComplete?.();\r
          },\r
          onComplete: () => {\r
            playingRef.current = false;\r
            if (!loop) {\r
              cleanupToStill();\r
              if (colorTo) gsap.set(strips, { color: colorTo });\r
              onShuffleComplete?.();\r
              armHover();\r
            }\r
          }\r
        });\r
\r
        const addTween = (targets, at) => {\r
          tl.to(\r
            targets,\r
            {\r
              x: (i, t) => parseFloat(t.getAttribute('data-final-x') || '0'),\r
              duration,\r
              ease,\r
              force3D: true,\r
              stagger: animationMode === 'evenodd' ? stagger : 0\r
            },\r
            at\r
          );\r
          if (colorFrom && colorTo) {\r
            tl.to(targets, { color: colorTo, duration, ease }, at);\r
          }\r
        };\r
\r
        if (animationMode === 'evenodd') {\r
          const odd = strips.filter((_, i) => i % 2 === 1);\r
          const even = strips.filter((_, i) => i % 2 === 0);\r
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;\r
          const evenStart = odd.length ? oddTotal * 0.7 : 0;\r
          if (odd.length) addTween(odd, 0);\r
          if (even.length) addTween(even, evenStart);\r
        } else {\r
          strips.forEach(strip => {\r
            const d = Math.random() * maxDelay;\r
            tl.to(\r
              strip,\r
              {\r
                x: parseFloat(strip.getAttribute('data-final-x') || '0'),\r
                duration,\r
                ease,\r
                force3D: true\r
              },\r
              d\r
            );\r
            if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);\r
          });\r
        }\r
\r
        tlRef.current = tl;\r
      };\r
\r
      const armHover = () => {\r
        if (!triggerOnHover || !ref.current) return;\r
        removeHover();\r
        const handler = () => {\r
          if (playingRef.current) return;\r
          build();\r
          if (scrambleCharset) randomizeScrambles();\r
          play();\r
        };\r
        hoverHandlerRef.current = handler;\r
        ref.current.addEventListener('mouseenter', handler);\r
      };\r
\r
      const create = () => {\r
        build();\r
        if (scrambleCharset) randomizeScrambles();\r
        play();\r
        armHover();\r
        setReady(true);\r
      };\r
\r
      const st = ScrollTrigger.create({\r
        trigger: el,\r
        start,\r
        once: triggerOnce,\r
        onEnter: create\r
      });\r
\r
      return () => {\r
        st.kill();\r
        removeHover();\r
        teardown();\r
        setReady(false);\r
      };\r
    },\r
    {\r
      dependencies: [\r
        text,\r
        duration,\r
        maxDelay,\r
        ease,\r
        threshold,\r
        rootMargin,\r
        fontsLoaded,\r
        shuffleDirection,\r
        shuffleTimes,\r
        animationMode,\r
        loop,\r
        loopDelay,\r
        stagger,\r
        scrambleCharset,\r
        colorFrom,\r
        colorTo,\r
        triggerOnce,\r
        respectReducedMotion,\r
        triggerOnHover\r
      ],\r
      scope: ref\r
    }\r
  );\r
\r
  const commonStyle = { textAlign, ...style };\r
  const classes = \`shuffle-parent \${ready ? 'is-ready' : ''} \${className}\`;\r
  const Tag = tag || 'p';\r
  return React.createElement(Tag, { ref, className: classes, style: commonStyle }, text);\r
};\r
\r
export default Shuffle;\r
`,Fr=`.shuffle-parent {\r
  display: inline-block;\r
  white-space: normal;\r
  word-wrap: break-word;\r
  will-change: transform;\r
  line-height: 1;\r
  font-size: 4rem;\r
  font-family: 'Press Start 2P', sans-serif;\r
  text-transform: uppercase;\r
  visibility: hidden;\r
}\r
\r
.shuffle-parent.is-ready {\r
  visibility: visible;\r
}\r
\r
.shuffle-char-wrapper {\r
  display: inline-block;\r
  overflow: hidden;\r
  vertical-align: baseline;\r
  position: relative;\r
}\r
\r
.shuffle-char-wrapper > span {\r
  display: inline-flex;\r
  will-change: transform;\r
}\r
\r
.shuffle-char {\r
  line-height: 1;\r
  display: inline-block;\r
  text-align: center;\r
}\r
`,Pr=`import React, { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
import { SplitText as GSAPSplitText } from 'gsap/SplitText';\r
import { useGSAP } from '@gsap/react';\r
\r
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);\r
\r
const Shuffle = ({\r
  text,\r
  className = '',\r
  style = {},\r
  shuffleDirection = 'right',\r
  duration = 0.35,\r
  maxDelay = 0,\r
  ease = 'power3.out',\r
  threshold = 0.1,\r
  rootMargin = '-100px',\r
  tag = 'p',\r
  textAlign = 'center',\r
  onShuffleComplete,\r
  shuffleTimes = 1,\r
  animationMode = 'evenodd',\r
  loop = false,\r
  loopDelay = 0,\r
  stagger = 0.03,\r
  scrambleCharset = '',\r
  colorFrom,\r
  colorTo,\r
  triggerOnce = true,\r
  respectReducedMotion = true,\r
  triggerOnHover = true\r
}) => {\r
  const ref = useRef(null);\r
  const [fontsLoaded, setFontsLoaded] = useState(false);\r
  const [ready, setReady] = useState(false);\r
\r
  const splitRef = useRef(null);\r
  const wrappersRef = useRef([]);\r
  const tlRef = useRef(null);\r
  const playingRef = useRef(false);\r
  const hoverHandlerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if ('fonts' in document) {\r
      if (document.fonts.status === 'loaded') setFontsLoaded(true);\r
      else document.fonts.ready.then(() => setFontsLoaded(true));\r
    } else setFontsLoaded(true);\r
  }, []);\r
\r
  useGSAP(\r
    () => {\r
      if (!ref.current || !text || !fontsLoaded) return;\r
      if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\r
        onShuffleComplete?.();\r
        return;\r
      }\r
\r
      const el = ref.current;\r
\r
      const startPct = (1 - threshold) * 100;\r
      const mm = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');\r
      const mv = mm ? parseFloat(mm[1]) : 0;\r
      const mu = mm ? mm[2] || 'px' : 'px';\r
      const sign = mv === 0 ? '' : mv < 0 ? \`-=\${Math.abs(mv)}\${mu}\` : \`+=\${mv}\${mu}\`;\r
      const start = \`top \${startPct}%\${sign}\`;\r
\r
      const removeHover = () => {\r
        if (hoverHandlerRef.current && ref.current) {\r
          ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);\r
          hoverHandlerRef.current = null;\r
        }\r
      };\r
\r
      const teardown = () => {\r
        if (tlRef.current) {\r
          tlRef.current.kill();\r
          tlRef.current = null;\r
        }\r
        if (wrappersRef.current.length) {\r
          wrappersRef.current.forEach(wrap => {\r
            const inner = wrap.firstElementChild;\r
            const orig = inner?.querySelector('[data-orig="1"]');\r
            if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);\r
          });\r
          wrappersRef.current = [];\r
        }\r
        try {\r
          splitRef.current?.revert();\r
        } catch {\r
          /* noop */\r
        }\r
        splitRef.current = null;\r
        playingRef.current = false;\r
      };\r
\r
      const build = () => {\r
        teardown();\r
\r
        splitRef.current = new GSAPSplitText(el, {\r
          type: 'chars',\r
          charsClass: 'shuffle-char',\r
          wordsClass: 'shuffle-word',\r
          linesClass: 'shuffle-line',\r
          smartWrap: true,\r
          reduceWhiteSpace: false\r
        });\r
\r
        const chars = splitRef.current.chars || [];\r
        wrappersRef.current = [];\r
\r
        const rolls = Math.max(1, Math.floor(shuffleTimes));\r
        const rand = set => set.charAt(Math.floor(Math.random() * set.length)) || '';\r
\r
        chars.forEach(ch => {\r
          const parent = ch.parentElement;\r
          if (!parent) return;\r
\r
          const w = ch.getBoundingClientRect().width;\r
          if (!w) return;\r
\r
          const wrap = document.createElement('span');\r
          wrap.className = 'inline-block overflow-hidden align-baseline text-left';\r
          Object.assign(wrap.style, { width: w + 'px' });\r
\r
          const inner = document.createElement('span');\r
          inner.className = 'inline-block whitespace-nowrap will-change-transform origin-left transform-gpu';\r
\r
          parent.insertBefore(wrap, ch);\r
          wrap.appendChild(inner);\r
\r
          const firstOrig = ch.cloneNode(true);\r
          firstOrig.className = 'inline-block text-left';\r
          Object.assign(firstOrig.style, { width: w + 'px' });\r
\r
          ch.setAttribute('data-orig', '1');\r
          ch.className = 'inline-block text-left';\r
          Object.assign(ch.style, { width: w + 'px' });\r
\r
          inner.appendChild(firstOrig);\r
          for (let k = 0; k < rolls; k++) {\r
            const c = ch.cloneNode(true);\r
            if (scrambleCharset) c.textContent = rand(scrambleCharset);\r
            c.className = 'inline-block text-left';\r
            Object.assign(c.style, { width: w + 'px' });\r
            inner.appendChild(c);\r
          }\r
          inner.appendChild(ch);\r
\r
          const steps = rolls + 1;\r
          let startX = 0;\r
          let finalX = -steps * w;\r
          if (shuffleDirection === 'right') {\r
            const firstCopy = inner.firstElementChild;\r
            const real = inner.lastElementChild;\r
            if (real) inner.insertBefore(real, inner.firstChild);\r
            if (firstCopy) inner.appendChild(firstCopy);\r
            startX = -steps * w;\r
            finalX = 0;\r
          }\r
\r
          gsap.set(inner, { x: startX, force3D: true });\r
          if (colorFrom) inner.style.color = colorFrom;\r
\r
          inner.setAttribute('data-final-x', String(finalX));\r
          inner.setAttribute('data-start-x', String(startX));\r
\r
          wrappersRef.current.push(wrap);\r
        });\r
      };\r
\r
      const inners = () => wrappersRef.current.map(w => w.firstElementChild);\r
\r
      const randomizeScrambles = () => {\r
        if (!scrambleCharset) return;\r
        wrappersRef.current.forEach(w => {\r
          const strip = w.firstElementChild;\r
          if (!strip) return;\r
          const kids = Array.from(strip.children);\r
          for (let i = 1; i < kids.length - 1; i++) {\r
            kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));\r
          }\r
        });\r
      };\r
\r
      const cleanupToStill = () => {\r
        wrappersRef.current.forEach(w => {\r
          const strip = w.firstElementChild;\r
          if (!strip) return;\r
          const real = strip.querySelector('[data-orig="1"]');\r
          if (!real) return;\r
          strip.replaceChildren(real);\r
          strip.style.transform = 'none';\r
          strip.style.willChange = 'auto';\r
        });\r
      };\r
\r
      const play = () => {\r
        const strips = inners();\r
        if (!strips.length) return;\r
\r
        playingRef.current = true;\r
\r
        const tl = gsap.timeline({\r
          smoothChildTiming: true,\r
          repeat: loop ? -1 : 0,\r
          repeatDelay: loop ? loopDelay : 0,\r
          onRepeat: () => {\r
            if (scrambleCharset) randomizeScrambles();\r
            gsap.set(strips, { x: (i, t) => parseFloat(t.getAttribute('data-start-x') || '0') });\r
            onShuffleComplete?.();\r
          },\r
          onComplete: () => {\r
            playingRef.current = false;\r
            if (!loop) {\r
              cleanupToStill();\r
              if (colorTo) gsap.set(strips, { color: colorTo });\r
              onShuffleComplete?.();\r
              armHover();\r
            }\r
          }\r
        });\r
\r
        const addTween = (targets, at) => {\r
          tl.to(\r
            targets,\r
            {\r
              x: (i, t) => parseFloat(t.getAttribute('data-final-x') || '0'),\r
              duration,\r
              ease,\r
              force3D: true,\r
              stagger: animationMode === 'evenodd' ? stagger : 0\r
            },\r
            at\r
          );\r
          if (colorFrom && colorTo) tl.to(targets, { color: colorTo, duration, ease }, at);\r
        };\r
\r
        if (animationMode === 'evenodd') {\r
          const odd = strips.filter((_, i) => i % 2 === 1);\r
          const even = strips.filter((_, i) => i % 2 === 0);\r
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;\r
          const evenStart = odd.length ? oddTotal * 0.7 : 0;\r
          if (odd.length) addTween(odd, 0);\r
          if (even.length) addTween(even, evenStart);\r
        } else {\r
          strips.forEach(strip => {\r
            const d = Math.random() * maxDelay;\r
            tl.to(\r
              strip,\r
              {\r
                x: parseFloat(strip.getAttribute('data-final-x') || '0'),\r
                duration,\r
                ease,\r
                force3D: true\r
              },\r
              d\r
            );\r
            if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);\r
          });\r
        }\r
\r
        tlRef.current = tl;\r
      };\r
\r
      const armHover = () => {\r
        if (!triggerOnHover || !ref.current) return;\r
        removeHover();\r
        const handler = () => {\r
          if (playingRef.current) return;\r
          build();\r
          if (scrambleCharset) randomizeScrambles();\r
          play();\r
        };\r
        hoverHandlerRef.current = handler;\r
        ref.current.addEventListener('mouseenter', handler);\r
      };\r
\r
      const create = () => {\r
        build();\r
        if (scrambleCharset) randomizeScrambles();\r
        play();\r
        armHover();\r
        setReady(true);\r
      };\r
\r
      const st = ScrollTrigger.create({\r
        trigger: el,\r
        start,\r
        once: triggerOnce,\r
        onEnter: create\r
      });\r
\r
      return () => {\r
        st.kill();\r
        removeHover();\r
        teardown();\r
        setReady(false);\r
      };\r
    },\r
    {\r
      dependencies: [\r
        text,\r
        duration,\r
        maxDelay,\r
        ease,\r
        threshold,\r
        rootMargin,\r
        fontsLoaded,\r
        shuffleDirection,\r
        shuffleTimes,\r
        animationMode,\r
        loop,\r
        loopDelay,\r
        stagger,\r
        scrambleCharset,\r
        colorFrom,\r
        colorTo,\r
        triggerOnce,\r
        respectReducedMotion,\r
        triggerOnHover\r
      ],\r
      scope: ref\r
    }\r
  );\r
\r
  const baseTw = 'inline-block whitespace-normal break-words will-change-transform uppercase text-[4rem] leading-none';\r
  const commonStyle = {\r
    textAlign,\r
    fontFamily: \`'Press Start 2P', sans-serif\`,\r
    ...style\r
  };\r
\r
  const classes = \`\${baseTw} \${ready ? 'visible' : 'invisible'} \${className}\`.trim();\r
  const Tag = tag || 'p';\r
\r
  return React.createElement(Tag, { ref: ref, className: classes, style: commonStyle }, text);\r
};\r
\r
export default Shuffle;\r
`,Nr=`import React, { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
import { SplitText as GSAPSplitText } from 'gsap/SplitText';\r
import { useGSAP } from '@gsap/react';\r
import './Shuffle.css';\r
\r
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);\r
\r
export interface ShuffleProps {\r
  text: string;\r
  className?: string;\r
  style?: React.CSSProperties;\r
  shuffleDirection?: 'left' | 'right';\r
  duration?: number;\r
  maxDelay?: number;\r
  ease?: string | ((t: number) => number);\r
  threshold?: number;\r
  rootMargin?: string;\r
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';\r
  textAlign?: React.CSSProperties['textAlign'];\r
  onShuffleComplete?: () => void;\r
  shuffleTimes?: number;\r
  animationMode?: 'random' | 'evenodd';\r
  loop?: boolean;\r
  loopDelay?: number;\r
  stagger?: number;\r
  scrambleCharset?: string;\r
  colorFrom?: string;\r
  colorTo?: string;\r
  triggerOnce?: boolean;\r
  respectReducedMotion?: boolean;\r
  triggerOnHover?: boolean;\r
}\r
\r
const Shuffle: React.FC<ShuffleProps> = ({\r
  text,\r
  className = '',\r
  style = {},\r
  shuffleDirection = 'right',\r
  duration = 0.35,\r
  maxDelay = 0,\r
  ease = 'power3.out',\r
  threshold = 0.1,\r
  rootMargin = '-100px',\r
  tag = 'p',\r
  textAlign = 'center',\r
  onShuffleComplete,\r
  shuffleTimes = 1,\r
  animationMode = 'evenodd',\r
  loop = false,\r
  loopDelay = 0,\r
  stagger = 0.03,\r
  scrambleCharset = '',\r
  colorFrom,\r
  colorTo,\r
  triggerOnce = true,\r
  respectReducedMotion = true,\r
  triggerOnHover = true\r
}) => {\r
  const ref = useRef<HTMLElement>(null);\r
  const [fontsLoaded, setFontsLoaded] = useState(false);\r
  const [ready, setReady] = useState(false);\r
\r
  const splitRef = useRef<GSAPSplitText | null>(null);\r
  const wrappersRef = useRef<HTMLElement[]>([]);\r
  const tlRef = useRef<gsap.core.Timeline | null>(null);\r
  const playingRef = useRef(false);\r
  const hoverHandlerRef = useRef<((e: Event) => void) | null>(null);\r
\r
  useEffect(() => {\r
    if ('fonts' in document) {\r
      if (document.fonts.status === 'loaded') setFontsLoaded(true);\r
      else document.fonts.ready.then(() => setFontsLoaded(true));\r
    } else setFontsLoaded(true);\r
  }, []);\r
\r
  useGSAP(\r
    () => {\r
      if (!ref.current || !text || !fontsLoaded) return;\r
      if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\r
        onShuffleComplete?.();\r
        return;\r
      }\r
\r
      const el = ref.current as HTMLElement;\r
\r
      const startPct = (1 - threshold) * 100;\r
      const mm = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');\r
      const mv = mm ? parseFloat(mm[1]) : 0;\r
      const mu = mm ? mm[2] || 'px' : 'px';\r
      const sign = mv === 0 ? '' : mv < 0 ? \`-=\${Math.abs(mv)}\${mu}\` : \`+=\${mv}\${mu}\`;\r
      const start = \`top \${startPct}%\${sign}\`;\r
\r
      const removeHover = () => {\r
        if (hoverHandlerRef.current && ref.current) {\r
          ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);\r
          hoverHandlerRef.current = null;\r
        }\r
      };\r
\r
      const teardown = () => {\r
        if (tlRef.current) {\r
          tlRef.current.kill();\r
          tlRef.current = null;\r
        }\r
        if (wrappersRef.current.length) {\r
          wrappersRef.current.forEach(wrap => {\r
            const inner = wrap.firstElementChild as HTMLElement | null;\r
            const orig = inner?.querySelector('[data-orig="1"]') as HTMLElement | null;\r
            if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);\r
          });\r
          wrappersRef.current = [];\r
        }\r
        try {\r
          splitRef.current?.revert();\r
        } catch {}\r
        splitRef.current = null;\r
        playingRef.current = false;\r
      };\r
\r
      const build = () => {\r
        teardown();\r
\r
        splitRef.current = new GSAPSplitText(el, {\r
          type: 'chars',\r
          charsClass: 'shuffle-char',\r
          wordsClass: 'shuffle-word',\r
          linesClass: 'shuffle-line',\r
          smartWrap: true,\r
          reduceWhiteSpace: false\r
        });\r
\r
        const chars = (splitRef.current.chars || []) as HTMLElement[];\r
        wrappersRef.current = [];\r
\r
        const rolls = Math.max(1, Math.floor(shuffleTimes));\r
        const rand = (set: string) => set.charAt(Math.floor(Math.random() * set.length)) || '';\r
\r
        chars.forEach(ch => {\r
          const parent = ch.parentElement;\r
          if (!parent) return;\r
\r
          const w = ch.getBoundingClientRect().width;\r
          if (!w) return;\r
\r
          const wrap = document.createElement('span');\r
          Object.assign(wrap.style, {\r
            display: 'inline-block',\r
            overflow: 'hidden',\r
            width: w + 'px',\r
            verticalAlign: 'baseline'\r
          });\r
\r
          const inner = document.createElement('span');\r
          Object.assign(inner.style, {\r
            display: 'inline-block',\r
            whiteSpace: 'nowrap',\r
            willChange: 'transform'\r
          });\r
\r
          parent.insertBefore(wrap, ch);\r
          wrap.appendChild(inner);\r
\r
          const firstOrig = ch.cloneNode(true) as HTMLElement;\r
          Object.assign(firstOrig.style, { display: 'inline-block', width: w + 'px', textAlign: 'center' });\r
\r
          ch.setAttribute('data-orig', '1');\r
          Object.assign(ch.style, { display: 'inline-block', width: w + 'px', textAlign: 'center' });\r
\r
          inner.appendChild(firstOrig);\r
          for (let k = 0; k < rolls; k++) {\r
            const c = ch.cloneNode(true) as HTMLElement;\r
            if (scrambleCharset) c.textContent = rand(scrambleCharset);\r
            Object.assign(c.style, { display: 'inline-block', width: w + 'px', textAlign: 'center' });\r
            inner.appendChild(c);\r
          }\r
          inner.appendChild(ch);\r
\r
          const steps = rolls + 1;\r
          let startX = 0;\r
          let finalX = -steps * w;\r
          if (shuffleDirection === 'right') {\r
            const firstCopy = inner.firstElementChild as HTMLElement | null;\r
            const real = inner.lastElementChild as HTMLElement | null;\r
            if (real) inner.insertBefore(real, inner.firstChild);\r
            if (firstCopy) inner.appendChild(firstCopy);\r
            startX = -steps * w;\r
            finalX = 0;\r
          }\r
\r
          gsap.set(inner, { x: startX, force3D: true });\r
          if (colorFrom) (inner.style as any).color = colorFrom;\r
\r
          inner.setAttribute('data-final-x', String(finalX));\r
          inner.setAttribute('data-start-x', String(startX));\r
\r
          wrappersRef.current.push(wrap);\r
        });\r
      };\r
\r
      const inners = () => wrappersRef.current.map(w => w.firstElementChild as HTMLElement);\r
\r
      const randomizeScrambles = () => {\r
        if (!scrambleCharset) return;\r
        wrappersRef.current.forEach(w => {\r
          const strip = w.firstElementChild as HTMLElement;\r
          if (!strip) return;\r
          const kids = Array.from(strip.children) as HTMLElement[];\r
          for (let i = 1; i < kids.length - 1; i++) {\r
            kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));\r
          }\r
        });\r
      };\r
\r
      const cleanupToStill = () => {\r
        wrappersRef.current.forEach(w => {\r
          const strip = w.firstElementChild as HTMLElement;\r
          if (!strip) return;\r
          const real = strip.querySelector('[data-orig="1"]') as HTMLElement | null;\r
          if (!real) return;\r
          strip.replaceChildren(real);\r
          strip.style.transform = 'none';\r
          strip.style.willChange = 'auto';\r
        });\r
      };\r
\r
      const play = () => {\r
        const strips = inners();\r
        if (!strips.length) return;\r
\r
        playingRef.current = true;\r
\r
        const tl = gsap.timeline({\r
          smoothChildTiming: true,\r
          repeat: loop ? -1 : 0,\r
          repeatDelay: loop ? loopDelay : 0,\r
          onRepeat: () => {\r
            if (scrambleCharset) randomizeScrambles();\r
            gsap.set(strips, { x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-start-x') || '0') });\r
            onShuffleComplete?.();\r
          },\r
          onComplete: () => {\r
            playingRef.current = false;\r
            if (!loop) {\r
              cleanupToStill();\r
              if (colorTo) gsap.set(strips, { color: colorTo });\r
              onShuffleComplete?.();\r
              armHover();\r
            }\r
          }\r
        });\r
\r
        const addTween = (targets: HTMLElement[], at: number) => {\r
          tl.to(\r
            targets,\r
            {\r
              x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-final-x') || '0'),\r
              duration,\r
              ease,\r
              force3D: true,\r
              stagger: animationMode === 'evenodd' ? stagger : 0\r
            },\r
            at\r
          );\r
          if (colorFrom && colorTo) {\r
            tl.to(targets, { color: colorTo, duration, ease }, at);\r
          }\r
        };\r
\r
        if (animationMode === 'evenodd') {\r
          const odd = strips.filter((_, i) => i % 2 === 1);\r
          const even = strips.filter((_, i) => i % 2 === 0);\r
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;\r
          const evenStart = odd.length ? oddTotal * 0.7 : 0;\r
          if (odd.length) addTween(odd, 0);\r
          if (even.length) addTween(even, evenStart);\r
        } else {\r
          strips.forEach(strip => {\r
            const d = Math.random() * maxDelay;\r
            tl.to(\r
              strip,\r
              {\r
                x: parseFloat(strip.getAttribute('data-final-x') || '0'),\r
                duration,\r
                ease,\r
                force3D: true\r
              },\r
              d\r
            );\r
            if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);\r
          });\r
        }\r
\r
        tlRef.current = tl;\r
      };\r
\r
      const armHover = () => {\r
        if (!triggerOnHover || !ref.current) return;\r
        removeHover();\r
        const handler = () => {\r
          if (playingRef.current) return;\r
          build();\r
          if (scrambleCharset) randomizeScrambles();\r
          play();\r
        };\r
        hoverHandlerRef.current = handler;\r
        ref.current.addEventListener('mouseenter', handler);\r
      };\r
\r
      const create = () => {\r
        build();\r
        if (scrambleCharset) randomizeScrambles();\r
        play();\r
        armHover();\r
        setReady(true);\r
      };\r
\r
      const st = ScrollTrigger.create({\r
        trigger: el,\r
        start,\r
        once: triggerOnce,\r
        onEnter: create\r
      });\r
\r
      return () => {\r
        st.kill();\r
        removeHover();\r
        teardown();\r
        setReady(false);\r
      };\r
    },\r
    {\r
      dependencies: [\r
        text,\r
        duration,\r
        maxDelay,\r
        ease,\r
        threshold,\r
        rootMargin,\r
        fontsLoaded,\r
        shuffleDirection,\r
        shuffleTimes,\r
        animationMode,\r
        loop,\r
        loopDelay,\r
        stagger,\r
        scrambleCharset,\r
        colorFrom,\r
        colorTo,\r
        triggerOnce,\r
        respectReducedMotion,\r
        triggerOnHover\r
      ],\r
      scope: ref\r
    }\r
  );\r
\r
  const commonStyle: React.CSSProperties = { textAlign, ...style };\r
  const classes = \`shuffle-parent \${ready ? 'is-ready' : ''} \${className}\`;\r
  const Tag = (tag || 'p') as keyof JSX.IntrinsicElements;\r
  return React.createElement(Tag, { ref: ref as any, className: classes, style: commonStyle }, text);\r
};\r
\r
export default Shuffle;\r
`,$r=`import React, { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
import { SplitText as GSAPSplitText } from 'gsap/SplitText';\r
import { useGSAP } from '@gsap/react';\r
\r
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);\r
\r
export interface ShuffleProps {\r
  text: string;\r
  className?: string;\r
  style?: React.CSSProperties;\r
  shuffleDirection?: 'left' | 'right';\r
  duration?: number;\r
  maxDelay?: number;\r
  ease?: string | ((t: number) => number);\r
  threshold?: number;\r
  rootMargin?: string;\r
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';\r
  textAlign?: React.CSSProperties['textAlign'];\r
  onShuffleComplete?: () => void;\r
  shuffleTimes?: number;\r
  animationMode?: 'random' | 'evenodd';\r
  loop?: boolean;\r
  loopDelay?: number;\r
  stagger?: number;\r
  scrambleCharset?: string;\r
  colorFrom?: string;\r
  colorTo?: string;\r
  triggerOnce?: boolean;\r
  respectReducedMotion?: boolean;\r
  triggerOnHover?: boolean;\r
}\r
\r
const Shuffle: React.FC<ShuffleProps> = ({\r
  text,\r
  className = '',\r
  style = {},\r
  shuffleDirection = 'right',\r
  duration = 0.35,\r
  maxDelay = 0,\r
  ease = 'power3.out',\r
  threshold = 0.1,\r
  rootMargin = '-100px',\r
  tag = 'p',\r
  textAlign = 'center',\r
  onShuffleComplete,\r
  shuffleTimes = 1,\r
  animationMode = 'evenodd',\r
  loop = false,\r
  loopDelay = 0,\r
  stagger = 0.03,\r
  scrambleCharset = '',\r
  colorFrom,\r
  colorTo,\r
  triggerOnce = true,\r
  respectReducedMotion = true,\r
  triggerOnHover = true\r
}) => {\r
  const ref = useRef<HTMLElement>(null);\r
  const [fontsLoaded, setFontsLoaded] = useState(false);\r
  const [ready, setReady] = useState(false);\r
\r
  const splitRef = useRef<GSAPSplitText | null>(null);\r
  const wrappersRef = useRef<HTMLElement[]>([]);\r
  const tlRef = useRef<gsap.core.Timeline | null>(null);\r
  const playingRef = useRef(false);\r
  const hoverHandlerRef = useRef<((e: Event) => void) | null>(null);\r
\r
  useEffect(() => {\r
    if ('fonts' in document) {\r
      if (document.fonts.status === 'loaded') setFontsLoaded(true);\r
      else document.fonts.ready.then(() => setFontsLoaded(true));\r
    } else setFontsLoaded(true);\r
  }, []);\r
\r
  useGSAP(\r
    () => {\r
      if (!ref.current || !text || !fontsLoaded) return;\r
      if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\r
        onShuffleComplete?.();\r
        return;\r
      }\r
\r
      const el = ref.current as HTMLElement;\r
\r
      const startPct = (1 - threshold) * 100;\r
      const mm = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');\r
      const mv = mm ? parseFloat(mm[1]) : 0;\r
      const mu = mm ? mm[2] || 'px' : 'px';\r
      const sign = mv === 0 ? '' : mv < 0 ? \`-=\${Math.abs(mv)}\${mu}\` : \`+=\${mv}\${mu}\`;\r
      const start = \`top \${startPct}%\${sign}\`;\r
\r
      const removeHover = () => {\r
        if (hoverHandlerRef.current && ref.current) {\r
          ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);\r
          hoverHandlerRef.current = null;\r
        }\r
      };\r
\r
      const teardown = () => {\r
        if (tlRef.current) {\r
          tlRef.current.kill();\r
          tlRef.current = null;\r
        }\r
        if (wrappersRef.current.length) {\r
          wrappersRef.current.forEach(wrap => {\r
            const inner = wrap.firstElementChild as HTMLElement | null;\r
            const orig = inner?.querySelector('[data-orig="1"]') as HTMLElement | null;\r
            if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);\r
          });\r
          wrappersRef.current = [];\r
        }\r
        try {\r
          splitRef.current?.revert();\r
        } catch {}\r
        splitRef.current = null;\r
        playingRef.current = false;\r
      };\r
\r
      const build = () => {\r
        teardown();\r
\r
        splitRef.current = new GSAPSplitText(el, {\r
          type: 'chars',\r
          charsClass: 'shuffle-char',\r
          wordsClass: 'shuffle-word',\r
          linesClass: 'shuffle-line',\r
          smartWrap: true,\r
          reduceWhiteSpace: false\r
        });\r
\r
        const chars = (splitRef.current.chars || []) as HTMLElement[];\r
        wrappersRef.current = [];\r
\r
        const rolls = Math.max(1, Math.floor(shuffleTimes));\r
        const rand = (set: string) => set.charAt(Math.floor(Math.random() * set.length)) || '';\r
\r
        chars.forEach(ch => {\r
          const parent = ch.parentElement;\r
          if (!parent) return;\r
\r
          const w = ch.getBoundingClientRect().width;\r
          if (!w) return;\r
\r
          const wrap = document.createElement('span');\r
          wrap.className = 'inline-block overflow-hidden align-baseline text-left';\r
          Object.assign(wrap.style, { width: w + 'px' });\r
\r
          const inner = document.createElement('span');\r
          inner.className = 'inline-block whitespace-nowrap will-change-transform origin-left transform-gpu';\r
\r
          parent.insertBefore(wrap, ch);\r
          wrap.appendChild(inner);\r
\r
          const firstOrig = ch.cloneNode(true) as HTMLElement;\r
          firstOrig.className = 'inline-block text-left';\r
          Object.assign(firstOrig.style, { width: w + 'px' });\r
\r
          ch.setAttribute('data-orig', '1');\r
          ch.className = 'inline-block text-left';\r
          Object.assign(ch.style, { width: w + 'px' });\r
\r
          inner.appendChild(firstOrig);\r
          for (let k = 0; k < rolls; k++) {\r
            const c = ch.cloneNode(true) as HTMLElement;\r
            if (scrambleCharset) c.textContent = rand(scrambleCharset);\r
            c.className = 'inline-block text-left';\r
            Object.assign(c.style, { width: w + 'px' });\r
            inner.appendChild(c);\r
          }\r
          inner.appendChild(ch);\r
\r
          const steps = rolls + 1;\r
          let startX = 0;\r
          let finalX = -steps * w;\r
          if (shuffleDirection === 'right') {\r
            const firstCopy = inner.firstElementChild as HTMLElement | null;\r
            const real = inner.lastElementChild as HTMLElement | null;\r
            if (real) inner.insertBefore(real, inner.firstChild);\r
            if (firstCopy) inner.appendChild(firstCopy);\r
            startX = -steps * w;\r
            finalX = 0;\r
          }\r
\r
          gsap.set(inner, { x: startX, force3D: true });\r
          if (colorFrom) (inner.style as any).color = colorFrom;\r
\r
          inner.setAttribute('data-final-x', String(finalX));\r
          inner.setAttribute('data-start-x', String(startX));\r
\r
          wrappersRef.current.push(wrap);\r
        });\r
      };\r
\r
      const inners = () => wrappersRef.current.map(w => w.firstElementChild as HTMLElement);\r
\r
      const randomizeScrambles = () => {\r
        if (!scrambleCharset) return;\r
        wrappersRef.current.forEach(w => {\r
          const strip = w.firstElementChild as HTMLElement;\r
          if (!strip) return;\r
          const kids = Array.from(strip.children) as HTMLElement[];\r
          for (let i = 1; i < kids.length - 1; i++) {\r
            kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));\r
          }\r
        });\r
      };\r
\r
      const cleanupToStill = () => {\r
        wrappersRef.current.forEach(w => {\r
          const strip = w.firstElementChild as HTMLElement;\r
          if (!strip) return;\r
          const real = strip.querySelector('[data-orig="1"]') as HTMLElement | null;\r
          if (!real) return;\r
          strip.replaceChildren(real);\r
          strip.style.transform = 'none';\r
          strip.style.willChange = 'auto';\r
        });\r
      };\r
\r
      const play = () => {\r
        const strips = inners();\r
        if (!strips.length) return;\r
\r
        playingRef.current = true;\r
\r
        const tl = gsap.timeline({\r
          smoothChildTiming: true,\r
          repeat: loop ? -1 : 0,\r
          repeatDelay: loop ? loopDelay : 0,\r
          onRepeat: () => {\r
            if (scrambleCharset) randomizeScrambles();\r
            gsap.set(strips, { x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-start-x') || '0') });\r
            onShuffleComplete?.();\r
          },\r
          onComplete: () => {\r
            playingRef.current = false;\r
            if (!loop) {\r
              cleanupToStill();\r
              if (colorTo) gsap.set(strips, { color: colorTo });\r
              onShuffleComplete?.();\r
              armHover();\r
            }\r
          }\r
        });\r
\r
        const addTween = (targets: HTMLElement[], at: number) => {\r
          tl.to(\r
            targets,\r
            {\r
              x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-final-x') || '0'),\r
              duration,\r
              ease,\r
              force3D: true,\r
              stagger: animationMode === 'evenodd' ? stagger : 0\r
            },\r
            at\r
          );\r
          if (colorFrom && colorTo) tl.to(targets, { color: colorTo, duration, ease }, at);\r
        };\r
\r
        if (animationMode === 'evenodd') {\r
          const odd = strips.filter((_, i) => i % 2 === 1);\r
          const even = strips.filter((_, i) => i % 2 === 0);\r
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;\r
          const evenStart = odd.length ? oddTotal * 0.7 : 0;\r
          if (odd.length) addTween(odd, 0);\r
          if (even.length) addTween(even, evenStart);\r
        } else {\r
          strips.forEach(strip => {\r
            const d = Math.random() * maxDelay;\r
            tl.to(\r
              strip,\r
              {\r
                x: parseFloat(strip.getAttribute('data-final-x') || '0'),\r
                duration,\r
                ease,\r
                force3D: true\r
              },\r
              d\r
            );\r
            if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);\r
          });\r
        }\r
\r
        tlRef.current = tl;\r
      };\r
\r
      const armHover = () => {\r
        if (!triggerOnHover || !ref.current) return;\r
        removeHover();\r
        const handler = () => {\r
          if (playingRef.current) return;\r
          build();\r
          if (scrambleCharset) randomizeScrambles();\r
          play();\r
        };\r
        hoverHandlerRef.current = handler;\r
        ref.current.addEventListener('mouseenter', handler);\r
      };\r
\r
      const create = () => {\r
        build();\r
        if (scrambleCharset) randomizeScrambles();\r
        play();\r
        armHover();\r
        setReady(true);\r
      };\r
\r
      const st = ScrollTrigger.create({\r
        trigger: el,\r
        start,\r
        once: triggerOnce,\r
        onEnter: create\r
      });\r
\r
      return () => {\r
        st.kill();\r
        removeHover();\r
        teardown();\r
        setReady(false);\r
      };\r
    },\r
    {\r
      dependencies: [\r
        text,\r
        duration,\r
        maxDelay,\r
        ease,\r
        threshold,\r
        rootMargin,\r
        fontsLoaded,\r
        shuffleDirection,\r
        shuffleTimes,\r
        animationMode,\r
        loop,\r
        loopDelay,\r
        stagger,\r
        scrambleCharset,\r
        colorFrom,\r
        colorTo,\r
        triggerOnce,\r
        respectReducedMotion,\r
        triggerOnHover\r
      ],\r
      scope: ref\r
    }\r
  );\r
\r
  const baseTw = 'inline-block whitespace-normal break-words will-change-transform uppercase text-[4rem] leading-none';\r
  const commonStyle: React.CSSProperties = {\r
    textAlign,\r
    fontFamily: \`'Press Start 2P', sans-serif\`,\r
    ...style\r
  };\r
\r
  const classes = \`\${baseTw} \${ready ? 'visible' : 'invisible'} \${className}\`.trim();\r
  const Tag = (tag || 'p') as keyof JSX.IntrinsicElements;\r
\r
  return React.createElement(Tag, { ref: ref as any, className: classes, style: commonStyle }, text);\r
};\r
\r
export default Shuffle;\r
`,jr={dependencies:"gsap @gsap/react",usage:`import Shuffle from './Shuffle';

<Shuffle
  text="Hello World"
  shuffleDirection="right"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover={true}
  respectReducedMotion={true}
/>`,code:Or,css:Fr,tailwind:Pr,tsCode:Nr,tsTailwind:$r};D.registerPlugin(cr,fr,ir);const Xr=({text:C,className:W="",style:d={},shuffleDirection:T="right",duration:m=.35,maxDelay:E=0,ease:x="power3.out",threshold:M=.1,rootMargin:k="-100px",tag:O="p",textAlign:q="center",onShuffleComplete:c,shuffleTimes:F=1,animationMode:b="evenodd",loop:S=!1,loopDelay:H=0,stagger:A=.03,scrambleCharset:f="",colorFrom:h,colorTo:u,triggerOnce:P=!0,respectReducedMotion:t=!0,triggerOnHover:K=!0})=>{const g=o.useRef(null),[Q,_]=o.useState(!1),[dr,I]=o.useState(!1),N=o.useRef(null),w=o.useRef([]),$=o.useRef(null),j=o.useRef(!1),X=o.useRef(null);o.useEffect(()=>{"fonts"in document?document.fonts.status==="loaded"?_(!0):document.fonts.ready.then(()=>_(!0)):_(!0)},[]),ir(()=>{if(!g.current||!C||!Q)return;if(t&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){I(!0),c==null||c();return}const V=g.current,hr=(1-M)*100,G=/^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(k||""),z=G?parseFloat(G[1]):0,Y=G&&G[2]||"px",gr=z===0?"":z<0?`-=${Math.abs(z)}${Y}`:`+=${z}${Y}`,wr=`top ${hr}%${gr}`,Z=()=>{X.current&&g.current&&(g.current.removeEventListener("mouseenter",X.current),X.current=null)},rr=()=>{var n;$.current&&($.current.kill(),$.current=null),w.current.length&&(w.current.forEach(e=>{const l=e.firstElementChild,r=l==null?void 0:l.querySelector('[data-orig="1"]');r&&e.parentNode&&e.parentNode.replaceChild(r,e)}),w.current=[]);try{(n=N.current)==null||n.revert()}catch{}N.current=null,j.current=!1},er=()=>{rr(),N.current=new fr(V,{type:"chars",charsClass:"shuffle-char",wordsClass:"shuffle-word",linesClass:"shuffle-line",smartWrap:!0,reduceWhiteSpace:!1});const n=N.current.chars||[];w.current=[];const e=Math.max(1,Math.floor(F)),l=r=>r.charAt(Math.floor(Math.random()*r.length))||"";n.forEach(r=>{const i=r.parentElement;if(!i)return;const p=r.getBoundingClientRect().width;if(!p)return;const y=document.createElement("span");Object.assign(y.style,{display:"inline-block",overflow:"hidden",width:p+"px",verticalAlign:"baseline"});const a=document.createElement("span");Object.assign(a.style,{display:"inline-block",whiteSpace:"nowrap",willChange:"transform"}),i.insertBefore(y,r),y.appendChild(a);const R=r.cloneNode(!0);Object.assign(R.style,{display:"inline-block",width:p+"px",textAlign:"center"}),r.setAttribute("data-orig","1"),Object.assign(r.style,{display:"inline-block",width:p+"px",textAlign:"center"}),a.appendChild(R);for(let L=0;L<e;L++){const v=r.cloneNode(!0);f&&(v.textContent=l(f)),Object.assign(v.style,{display:"inline-block",width:p+"px",textAlign:"center"}),a.appendChild(v)}a.appendChild(r);const sr=e+1;let J=0,or=-sr*p;if(T==="right"){const L=a.firstElementChild,v=a.lastElementChild;v&&a.insertBefore(v,a.firstChild),L&&a.appendChild(L),J=-sr*p,or=0}D.set(a,{x:J,force3D:!0}),h&&(a.style.color=h),a.setAttribute("data-final-x",String(or)),a.setAttribute("data-start-x",String(J)),w.current.push(y)})},yr=()=>w.current.map(n=>n.firstElementChild),U=()=>{f&&w.current.forEach(n=>{const e=n.firstElementChild;if(!e)return;const l=Array.from(e.children);for(let r=1;r<l.length-1;r++)l[r].textContent=f.charAt(Math.floor(Math.random()*f.length))})},xr=()=>{w.current.forEach(n=>{const e=n.firstElementChild;if(!e)return;const l=e.querySelector('[data-orig="1"]');l&&(e.replaceChildren(l),e.style.transform="none",e.style.willChange="auto")})},nr=()=>{const n=yr();if(!n.length)return;j.current=!0;const e=D.timeline({smoothChildTiming:!0,repeat:S?-1:0,repeatDelay:S?H:0,onRepeat:()=>{f&&U(),D.set(n,{x:(r,i)=>parseFloat(i.getAttribute("data-start-x")||"0")}),c==null||c()},onComplete:()=>{j.current=!1,S||(xr(),u&&D.set(n,{color:u}),c==null||c(),tr())}}),l=(r,i)=>{e.to(r,{x:(p,y)=>parseFloat(y.getAttribute("data-final-x")||"0"),duration:m,ease:x,force3D:!0,stagger:b==="evenodd"?A:0},i),h&&u&&e.to(r,{color:u,duration:m,ease:x},i)};if(b==="evenodd"){const r=n.filter((a,R)=>R%2===1),i=n.filter((a,R)=>R%2===0),p=m+Math.max(0,r.length-1)*A,y=r.length?p*.7:0;r.length&&l(r,0),i.length&&l(i,y)}else n.forEach(r=>{const i=Math.random()*E;e.to(r,{x:parseFloat(r.getAttribute("data-final-x")||"0"),duration:m,ease:x,force3D:!0},i),h&&u&&e.fromTo(r,{color:h},{color:u,duration:m,ease:x},i)});$.current=e},tr=()=>{if(!K||!g.current)return;Z();const n=()=>{j.current||(er(),f&&U(),nr())};X.current=n,g.current.addEventListener("mouseenter",n)},br=()=>{er(),f&&U(),nr(),tr(),I(!0)},Sr=cr.create({trigger:V,start:wr,once:P,onEnter:br});return()=>{Sr.kill(),Z(),rr(),I(!1)}},{dependencies:[C,m,E,x,M,k,Q,T,F,b,S,H,A,f,h,u,P,t,K],scope:g});const pr={textAlign:q,...d},ur=`shuffle-parent ${dr?"is-ready":""} ${W}`,mr=O||"p";return Rr.createElement(mr,{ref:g,className:ur,style:pr},C)},Vr=()=>{const C=[{name:"text",type:"string",default:'""',description:"The text content to shuffle."},{name:"className",type:"string",default:'""',description:"Optional CSS class for the wrapper element."},{name:"style",type:"object",default:"{}",description:"Inline styles applied to the wrapper element."},{name:"shuffleDirection",type:'"left" | "right"',default:'"right"',description:"Direction the per-letter strip slides to reveal the final character."},{name:"duration",type:"number",default:"0.35",description:"Duration (s) of the strip slide per letter."},{name:"maxDelay",type:"number",default:"0",description:'Max random delay per strip when animationMode = "random".'},{name:"ease",type:"string | Function",default:'"power3.out"',description:"GSAP ease for sliding and color tween."},{name:"threshold",type:"number",default:"0.1",description:"Portion of the element that must enter view before starting."},{name:"rootMargin",type:"string",default:'"-100px"',description:"ScrollTrigger start offset (px, %, etc.)."},{name:"tag",type:'"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"',default:'"p"',description:"HTML tag to render for the text container."},{name:"textAlign",type:"CSS text-align",default:'"center"',description:"Text alignment applied via inline style."},{name:"onShuffleComplete",type:"() => void",default:"undefined",description:"Called after a full run completes (and on each loop repeat)."},{name:"shuffleTimes",type:"number",default:"1",description:"How many interim scrambled glyphs to scroll past before the final char."},{name:"animationMode",type:'"evenodd" | "random"',default:'"evenodd"',description:"Odd/even staggered strips or random per-strip delays."},{name:"loop",type:"boolean",default:"false",description:"Repeat the shuffle indefinitely."},{name:"loopDelay",type:"number",default:"0",description:"Delay (s) between loop repeats."},{name:"stagger",type:"number",default:"0.03",description:'Stagger (s) for strips in "evenodd" mode.'},{name:"scrambleCharset",type:"string",default:'""',description:"Characters to use for interim scrambles; empty keeps original copies."},{name:"colorFrom",type:"string",default:"undefined",description:"Optional starting text color while shuffling."},{name:"colorTo",type:"string",default:"undefined",description:"Optional final text color to tween to."},{name:"triggerOnce",type:"boolean",default:"true",description:"Auto-run only on first scroll into view."},{name:"respectReducedMotion",type:"boolean",default:"true",description:"Skip animation if user prefers reduced motion."},{name:"triggerOnHover",type:"boolean",default:"true",description:"Allow re-playing the animation on hover after it completes."}],[W,d]=kr(),[T,m]=o.useState(.35),[E,x]=o.useState(1),[M,k]=o.useState(.03),[O,q]=o.useState("right"),[c,F]=o.useState("power3.out"),[b,S]=o.useState(!1),[H,A]=o.useState(0),[f,h]=o.useState(!0),u=[{label:"Right",value:"right"},{label:"Left",value:"left"}],P=[{label:"power2.out",value:"power2.out"},{label:"power3.out",value:"power3.out"},{label:"back.out(1.1)",value:"back.out(1.1)"},{label:"expo.out",value:"expo.out"}];return s.jsxs(Cr,{children:[s.jsxs(Tr,{children:[s.jsxs(vr,{position:"relative",className:"demo-container flex items-center justify-center",h:500,overflow:"hidden",children:[s.jsx(Xr,{text:"REACT BITS",ease:c,duration:T,shuffleTimes:E,stagger:M,shuffleDirection:O,loop:b,loopDelay:H,triggerOnHover:f},W),s.jsx(Dr,{onClick:d})]}),s.jsxs(Ar,{children:[s.jsx(lr,{title:"Direction",options:u,value:O,name:"shuffleDirection",width:130,onChange:t=>{q(t),d()}}),s.jsx(lr,{title:"Ease",options:P,value:c,name:"ease",width:150,onChange:t=>{F(t),d()}}),s.jsx(B,{title:"Duration",min:.1,max:1.5,step:.05,value:T,valueUnit:"s",onChange:t=>{m(Number(t)),d()}}),s.jsx(B,{title:"Shuffle Times",min:1,max:8,step:1,value:E,onChange:t=>{x(Number(t)),d()}}),s.jsx(B,{title:"Stagger",min:0,max:.2,step:.01,value:M,valueUnit:"s",onChange:t=>{k(Number(t)),d()}}),s.jsx(ar,{title:"Hover Replay",isChecked:f,onChange:t=>{h(t),d()}}),s.jsx(ar,{title:"Loop",isChecked:b,onChange:t=>{S(t),d()}}),s.jsx(B,{title:"Loop Delay",min:0,max:2,step:.1,value:H,isDisabled:!b,valueUnit:"s",onChange:t=>{A(Number(t)),d()}})]}),s.jsx(Er,{data:C}),s.jsx(Lr,{dependencyList:["gsap","@gsap/react"]})]}),s.jsx(Mr,{children:s.jsx(Hr,{codeObject:jr})})]})};export{Vr as default};
