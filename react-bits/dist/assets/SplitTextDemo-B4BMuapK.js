import{r as t,j as r,B as S,p as T,u as w,F as A,a as c,T as p}from"./index-wsKSLPNH.js";import{T as C,P as b,a as P,C as N,b as L}from"./PropTable-C4uPWs8h.js";import{u as M}from"./useForceRerender-BCFU-k0M.js";import{R as G}from"./RefreshButton-CA3SFRlq.js";import{D as I}from"./Dependencies-BHoMfJUj.js";import{C as R}from"./Customize-1m_ZNqR9.js";import{P as f}from"./PreviewSlider-m1G_aiYP.js";import{P as _}from"./PreviewSwitch-DqnF708j.js";import"./index-Bpz4cGEA.js";const $=`import { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
import { SplitText as GSAPSplitText } from 'gsap/SplitText';\r
import { useGSAP } from '@gsap/react';\r
\r
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);\r
\r
const SplitText = ({\r
  text,\r
  className = '',\r
  delay = 100,\r
  duration = 0.6,\r
  ease = 'power3.out',\r
  splitType = 'chars',\r
  from = { opacity: 0, y: 40 },\r
  to = { opacity: 1, y: 0 },\r
  threshold = 0.1,\r
  rootMargin = '-100px',\r
  textAlign = 'center',\r
  tag = 'p',\r
  onLetterAnimationComplete\r
}) => {\r
  const ref = useRef(null);\r
  const animationCompletedRef = useRef(false);\r
  const [fontsLoaded, setFontsLoaded] = useState(false);\r
\r
  useEffect(() => {\r
    if (document.fonts.status === 'loaded') {\r
      setFontsLoaded(true);\r
    } else {\r
      document.fonts.ready.then(() => {\r
        setFontsLoaded(true);\r
      });\r
    }\r
  }, []);\r
\r
  useGSAP(\r
    () => {\r
      if (!ref.current || !text || !fontsLoaded) return;\r
      const el = ref.current;\r
\r
      if (el._rbsplitInstance) {\r
        try {\r
          el._rbsplitInstance.revert();\r
        } catch (_) {\r
          /* noop */\r
        }\r
        el._rbsplitInstance = null;\r
      }\r
\r
      const startPct = (1 - threshold) * 100;\r
      const marginMatch = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin);\r
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;\r
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';\r
      const sign =\r
        marginValue === 0\r
          ? ''\r
          : marginValue < 0\r
            ? \`-=\${Math.abs(marginValue)}\${marginUnit}\`\r
            : \`+=\${marginValue}\${marginUnit}\`;\r
      const start = \`top \${startPct}%\${sign}\`;\r
\r
      let targets;\r
      const assignTargets = self => {\r
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;\r
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;\r
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;\r
        if (!targets) targets = self.chars || self.words || self.lines;\r
      };\r
\r
      const splitInstance = new GSAPSplitText(el, {\r
        type: splitType,\r
        smartWrap: true,\r
        autoSplit: splitType === 'lines',\r
        linesClass: 'split-line',\r
        wordsClass: 'split-word',\r
        charsClass: 'split-char',\r
        reduceWhiteSpace: false,\r
        onSplit: self => {\r
          assignTargets(self);\r
          const tween = gsap.fromTo(\r
            targets,\r
            { ...from },\r
            {\r
              ...to,\r
              duration,\r
              ease,\r
              stagger: delay / 1000,\r
              scrollTrigger: {\r
                trigger: el,\r
                start,\r
                once: true,\r
                fastScrollEnd: true,\r
                anticipatePin: 0.4\r
              },\r
              onComplete: () => {\r
                animationCompletedRef.current = true;\r
                onLetterAnimationComplete?.();\r
              },\r
              willChange: 'transform, opacity',\r
              force3D: true\r
            }\r
          );\r
          return tween;\r
        }\r
      });\r
\r
      el._rbsplitInstance = splitInstance;\r
\r
      return () => {\r
        ScrollTrigger.getAll().forEach(st => {\r
          if (st.trigger === el) st.kill();\r
        });\r
        try {\r
          splitInstance.revert();\r
        } catch (_) {\r
          /* noop */\r
        }\r
        el._rbsplitInstance = null;\r
      };\r
    },\r
    {\r
      dependencies: [\r
        text,\r
        delay,\r
        duration,\r
        ease,\r
        splitType,\r
        JSON.stringify(from),\r
        JSON.stringify(to),\r
        threshold,\r
        rootMargin,\r
        fontsLoaded,\r
        onLetterAnimationComplete\r
      ],\r
      scope: ref\r
    }\r
  );\r
\r
  const renderTag = () => {\r
    const style = {\r
      textAlign,\r
      overflow: 'hidden',\r
      display: 'inline-block',\r
      whiteSpace: 'normal',\r
      wordWrap: 'break-word',\r
      willChange: 'transform, opacity'\r
    };\r
    const classes = \`split-parent \${className}\`;\r
    switch (tag) {\r
      case 'h1':\r
        return (\r
          <h1 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h1>\r
        );\r
      case 'h2':\r
        return (\r
          <h2 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h2>\r
        );\r
      case 'h3':\r
        return (\r
          <h3 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h3>\r
        );\r
      case 'h4':\r
        return (\r
          <h4 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h4>\r
        );\r
      case 'h5':\r
        return (\r
          <h5 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h5>\r
        );\r
      case 'h6':\r
        return (\r
          <h6 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h6>\r
        );\r
      default:\r
        return (\r
          <p ref={ref} style={style} className={classes}>\r
            {text}\r
          </p>\r
        );\r
    }\r
  };\r
  return renderTag();\r
};\r
\r
export default SplitText;\r
`,E=`import { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
import { SplitText as GSAPSplitText } from 'gsap/SplitText';\r
import { useGSAP } from '@gsap/react';\r
\r
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);\r
\r
const SplitText = ({\r
  text,\r
  className = '',\r
  delay = 100,\r
  duration = 0.6,\r
  ease = 'power3.out',\r
  splitType = 'chars',\r
  from = { opacity: 0, y: 40 },\r
  to = { opacity: 1, y: 0 },\r
  threshold = 0.1,\r
  rootMargin = '-100px',\r
  textAlign = 'center',\r
  tag = 'p',\r
  onLetterAnimationComplete\r
}) => {\r
  const ref = useRef(null);\r
  const animationCompletedRef = useRef(false);\r
  const [fontsLoaded, setFontsLoaded] = useState(false);\r
\r
  useEffect(() => {\r
    if (document.fonts.status === 'loaded') {\r
      setFontsLoaded(true);\r
    } else {\r
      document.fonts.ready.then(() => {\r
        setFontsLoaded(true);\r
      });\r
    }\r
  }, []);\r
\r
  useGSAP(\r
    () => {\r
      if (!ref.current || !text || !fontsLoaded) return;\r
      const el = ref.current;\r
\r
      if (el._rbsplitInstance) {\r
        try {\r
          el._rbsplitInstance.revert();\r
        } catch (_) {\r
          /* ignore */\r
        }\r
        el._rbsplitInstance = null;\r
      }\r
\r
      const startPct = (1 - threshold) * 100;\r
      const marginMatch = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin);\r
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;\r
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';\r
      const sign =\r
        marginValue === 0\r
          ? ''\r
          : marginValue < 0\r
            ? \`-=\${Math.abs(marginValue)}\${marginUnit}\`\r
            : \`+=\${marginValue}\${marginUnit}\`;\r
      const start = \`top \${startPct}%\${sign}\`;\r
\r
      let targets;\r
      const assignTargets = self => {\r
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;\r
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;\r
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;\r
        if (!targets) targets = self.chars || self.words || self.lines;\r
      };\r
\r
      const splitInstance = new GSAPSplitText(el, {\r
        type: splitType,\r
        smartWrap: true,\r
        autoSplit: splitType === 'lines',\r
        linesClass: 'split-line',\r
        wordsClass: 'split-word',\r
        charsClass: 'split-char',\r
        reduceWhiteSpace: false,\r
        onSplit: self => {\r
          assignTargets(self);\r
          return gsap.fromTo(\r
            targets,\r
            { ...from },\r
            {\r
              ...to,\r
              duration,\r
              ease,\r
              stagger: delay / 1000,\r
              scrollTrigger: {\r
                trigger: el,\r
                start,\r
                once: true,\r
                fastScrollEnd: true,\r
                anticipatePin: 0.4\r
              },\r
              onComplete: () => {\r
                animationCompletedRef.current = true;\r
                onLetterAnimationComplete?.();\r
              },\r
              willChange: 'transform, opacity',\r
              force3D: true\r
            }\r
          );\r
        }\r
      });\r
      el._rbsplitInstance = splitInstance;\r
\r
      return () => {\r
        ScrollTrigger.getAll().forEach(st => {\r
          if (st.trigger === el) st.kill();\r
        });\r
        try {\r
          splitInstance.revert();\r
        } catch (_) {\r
          /* ignore */\r
        }\r
        el._rbsplitInstance = null;\r
      };\r
    },\r
    {\r
      dependencies: [\r
        text,\r
        delay,\r
        duration,\r
        ease,\r
        splitType,\r
        JSON.stringify(from),\r
        JSON.stringify(to),\r
        threshold,\r
        rootMargin,\r
        fontsLoaded,\r
        onLetterAnimationComplete\r
      ],\r
      scope: ref\r
    }\r
  );\r
\r
  const renderTag = () => {\r
    const style = {\r
      textAlign,\r
      wordWrap: 'break-word',\r
      willChange: 'transform, opacity'\r
    };\r
    const classes = \`split-parent overflow-hidden inline-block whitespace-normal \${className}\`;\r
    switch (tag) {\r
      case 'h1':\r
        return (\r
          <h1 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h1>\r
        );\r
      case 'h2':\r
        return (\r
          <h2 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h2>\r
        );\r
      case 'h3':\r
        return (\r
          <h3 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h3>\r
        );\r
      case 'h4':\r
        return (\r
          <h4 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h4>\r
        );\r
      case 'h5':\r
        return (\r
          <h5 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h5>\r
        );\r
      case 'h6':\r
        return (\r
          <h6 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h6>\r
        );\r
      default:\r
        return (\r
          <p ref={ref} style={style} className={classes}>\r
            {text}\r
          </p>\r
        );\r
    }\r
  };\r
  return renderTag();\r
};\r
\r
export default SplitText;\r
`,v=`import React, { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
import { SplitText as GSAPSplitText } from 'gsap/SplitText';\r
import { useGSAP } from '@gsap/react';\r
\r
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);\r
\r
export interface SplitTextProps {\r
  text: string;\r
  className?: string;\r
  delay?: number;\r
  duration?: number;\r
  ease?: string | ((t: number) => number);\r
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';\r
  from?: gsap.TweenVars;\r
  to?: gsap.TweenVars;\r
  threshold?: number;\r
  rootMargin?: string;\r
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';\r
  textAlign?: React.CSSProperties['textAlign'];\r
  onLetterAnimationComplete?: () => void;\r
}\r
\r
const SplitText: React.FC<SplitTextProps> = ({\r
  text,\r
  className = '',\r
  delay = 100,\r
  duration = 0.6,\r
  ease = 'power3.out',\r
  splitType = 'chars',\r
  from = { opacity: 0, y: 40 },\r
  to = { opacity: 1, y: 0 },\r
  threshold = 0.1,\r
  rootMargin = '-100px',\r
  textAlign = 'center',\r
  tag = 'p',\r
  onLetterAnimationComplete\r
}) => {\r
  const ref = useRef<HTMLParagraphElement>(null);\r
  const animationCompletedRef = useRef(false);\r
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);\r
\r
  useEffect(() => {\r
    if (document.fonts.status === 'loaded') {\r
      setFontsLoaded(true);\r
    } else {\r
      document.fonts.ready.then(() => {\r
        setFontsLoaded(true);\r
      });\r
    }\r
  }, []);\r
\r
  useGSAP(\r
    () => {\r
      if (!ref.current || !text || !fontsLoaded) return;\r
\r
      const el = ref.current as HTMLElement & {\r
        _rbsplitInstance?: GSAPSplitText;\r
      };\r
\r
      if (el._rbsplitInstance) {\r
        try {\r
          el._rbsplitInstance.revert();\r
        } catch (_) {}\r
        el._rbsplitInstance = undefined;\r
      }\r
\r
      const startPct = (1 - threshold) * 100;\r
      const marginMatch = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin);\r
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;\r
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';\r
      const sign =\r
        marginValue === 0\r
          ? ''\r
          : marginValue < 0\r
            ? \`-=\${Math.abs(marginValue)}\${marginUnit}\`\r
            : \`+=\${marginValue}\${marginUnit}\`;\r
      const start = \`top \${startPct}%\${sign}\`;\r
      let targets: Element[] = [];\r
      const assignTargets = (self: GSAPSplitText) => {\r
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;\r
        if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words;\r
        if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines;\r
        if (!targets.length) targets = self.chars || self.words || self.lines;\r
      };\r
      const splitInstance = new GSAPSplitText(el, {\r
        type: splitType,\r
        smartWrap: true,\r
        autoSplit: splitType === 'lines',\r
        linesClass: 'split-line',\r
        wordsClass: 'split-word',\r
        charsClass: 'split-char',\r
        reduceWhiteSpace: false,\r
        onSplit: (self: GSAPSplitText) => {\r
          assignTargets(self);\r
          return gsap.fromTo(\r
            targets,\r
            { ...from },\r
            {\r
              ...to,\r
              duration,\r
              ease,\r
              stagger: delay / 1000,\r
              scrollTrigger: {\r
                trigger: el,\r
                start,\r
                once: true,\r
                fastScrollEnd: true,\r
                anticipatePin: 0.4\r
              },\r
              onComplete: () => {\r
                animationCompletedRef.current = true;\r
                onLetterAnimationComplete?.();\r
              },\r
              willChange: 'transform, opacity',\r
              force3D: true\r
            }\r
          );\r
        }\r
      });\r
      el._rbsplitInstance = splitInstance;\r
      return () => {\r
        ScrollTrigger.getAll().forEach(st => {\r
          if (st.trigger === el) st.kill();\r
        });\r
        try {\r
          splitInstance.revert();\r
        } catch (_) {}\r
        el._rbsplitInstance = undefined;\r
      };\r
    },\r
    {\r
      dependencies: [\r
        text,\r
        delay,\r
        duration,\r
        ease,\r
        splitType,\r
        JSON.stringify(from),\r
        JSON.stringify(to),\r
        threshold,\r
        rootMargin,\r
        fontsLoaded,\r
        onLetterAnimationComplete\r
      ],\r
      scope: ref\r
    }\r
  );\r
\r
  const renderTag = () => {\r
    const style: React.CSSProperties = {\r
      textAlign,\r
      overflow: 'hidden',\r
      display: 'inline-block',\r
      whiteSpace: 'normal',\r
      wordWrap: 'break-word',\r
      willChange: 'transform, opacity'\r
    };\r
    const classes = \`split-parent \${className}\`;\r
    switch (tag) {\r
      case 'h1':\r
        return (\r
          <h1 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h1>\r
        );\r
      case 'h2':\r
        return (\r
          <h2 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h2>\r
        );\r
      case 'h3':\r
        return (\r
          <h3 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h3>\r
        );\r
      case 'h4':\r
        return (\r
          <h4 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h4>\r
        );\r
      case 'h5':\r
        return (\r
          <h5 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h5>\r
        );\r
      case 'h6':\r
        return (\r
          <h6 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h6>\r
        );\r
      default:\r
        return (\r
          <p ref={ref} style={style} className={classes}>\r
            {text}\r
          </p>\r
        );\r
    }\r
  };\r
  return renderTag();\r
};\r
\r
export default SplitText;\r
`,V=`import React, { useRef, useEffect, useState } from 'react';\r
import { gsap } from 'gsap';\r
import { ScrollTrigger } from 'gsap/ScrollTrigger';\r
import { SplitText as GSAPSplitText } from 'gsap/SplitText';\r
import { useGSAP } from '@gsap/react';\r
\r
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);\r
\r
export interface SplitTextProps {\r
  text: string;\r
  className?: string;\r
  delay?: number;\r
  duration?: number;\r
  ease?: string | ((t: number) => number);\r
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';\r
  from?: gsap.TweenVars;\r
  to?: gsap.TweenVars;\r
  threshold?: number;\r
  rootMargin?: string;\r
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';\r
  textAlign?: React.CSSProperties['textAlign'];\r
  onLetterAnimationComplete?: () => void;\r
}\r
\r
const SplitText: React.FC<SplitTextProps> = ({\r
  text,\r
  className = '',\r
  delay = 100,\r
  duration = 0.6,\r
  ease = 'power3.out',\r
  splitType = 'chars',\r
  from = { opacity: 0, y: 40 },\r
  to = { opacity: 1, y: 0 },\r
  threshold = 0.1,\r
  rootMargin = '-100px',\r
  tag = 'p',\r
  textAlign = 'center',\r
  onLetterAnimationComplete\r
}) => {\r
  const ref = useRef<HTMLParagraphElement>(null);\r
  const animationCompletedRef = useRef(false);\r
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);\r
\r
  useEffect(() => {\r
    if (document.fonts.status === 'loaded') {\r
      setFontsLoaded(true);\r
    } else {\r
      document.fonts.ready.then(() => {\r
        setFontsLoaded(true);\r
      });\r
    }\r
  }, []);\r
\r
  useGSAP(\r
    () => {\r
      if (!ref.current || !text || !fontsLoaded) return;\r
      const el = ref.current as HTMLElement & {\r
        _rbsplitInstance?: GSAPSplitText;\r
      };\r
\r
      if (el._rbsplitInstance) {\r
        try {\r
          el._rbsplitInstance.revert();\r
        } catch (_) {}\r
        el._rbsplitInstance = undefined;\r
      }\r
\r
      const startPct = (1 - threshold) * 100;\r
      const marginMatch = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin);\r
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;\r
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';\r
      const sign =\r
        marginValue === 0\r
          ? ''\r
          : marginValue < 0\r
            ? \`-=\${Math.abs(marginValue)}\${marginUnit}\`\r
            : \`+=\${marginValue}\${marginUnit}\`;\r
      const start = \`top \${startPct}%\${sign}\`;\r
      let targets: Element[] = [];\r
      const assignTargets = (self: GSAPSplitText) => {\r
        if (splitType.includes('chars') && (self as GSAPSplitText).chars?.length)\r
          targets = (self as GSAPSplitText).chars;\r
        if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words;\r
        if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines;\r
        if (!targets.length) targets = self.chars || self.words || self.lines;\r
      };\r
      const splitInstance = new GSAPSplitText(el, {\r
        type: splitType,\r
        smartWrap: true,\r
        autoSplit: splitType === 'lines',\r
        linesClass: 'split-line',\r
        wordsClass: 'split-word',\r
        charsClass: 'split-char',\r
        reduceWhiteSpace: false,\r
        onSplit: (self: GSAPSplitText) => {\r
          assignTargets(self);\r
          return gsap.fromTo(\r
            targets,\r
            { ...from },\r
            {\r
              ...to,\r
              duration,\r
              ease,\r
              stagger: delay / 1000,\r
              scrollTrigger: {\r
                trigger: el,\r
                start,\r
                once: true,\r
                fastScrollEnd: true,\r
                anticipatePin: 0.4\r
              },\r
              onComplete: () => {\r
                animationCompletedRef.current = true;\r
                onLetterAnimationComplete?.();\r
              },\r
              willChange: 'transform, opacity',\r
              force3D: true\r
            }\r
          );\r
        }\r
      });\r
      el._rbsplitInstance = splitInstance;\r
      return () => {\r
        ScrollTrigger.getAll().forEach(st => {\r
          if (st.trigger === el) st.kill();\r
        });\r
        try {\r
          splitInstance.revert();\r
        } catch (_) {}\r
        el._rbsplitInstance = undefined;\r
      };\r
    },\r
    {\r
      dependencies: [\r
        text,\r
        delay,\r
        duration,\r
        ease,\r
        splitType,\r
        JSON.stringify(from),\r
        JSON.stringify(to),\r
        threshold,\r
        rootMargin,\r
        fontsLoaded,\r
        onLetterAnimationComplete\r
      ],\r
      scope: ref\r
    }\r
  );\r
\r
  const renderTag = () => {\r
    const style: React.CSSProperties = {\r
      textAlign,\r
      wordWrap: 'break-word',\r
      willChange: 'transform, opacity'\r
    };\r
    const classes = \`split-parent overflow-hidden inline-block whitespace-normal \${className}\`;\r
    switch (tag) {\r
      case 'h1':\r
        return (\r
          <h1 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h1>\r
        );\r
      case 'h2':\r
        return (\r
          <h2 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h2>\r
        );\r
      case 'h3':\r
        return (\r
          <h3 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h3>\r
        );\r
      case 'h4':\r
        return (\r
          <h4 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h4>\r
        );\r
      case 'h5':\r
        return (\r
          <h5 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h5>\r
        );\r
      case 'h6':\r
        return (\r
          <h6 ref={ref} style={style} className={classes}>\r
            {text}\r
          </h6>\r
        );\r
      default:\r
        return (\r
          <p ref={ref} style={style} className={classes}>\r
            {text}\r
          </p>\r
        );\r
    }\r
  };\r
\r
  return renderTag();\r
};\r
\r
export default SplitText;\r
`,j={dependencies:"gsap @gsap/react",usage:`import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

<SplitText
  text="Hello, GSAP!"
  className="text-2xl font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>`,code:$,tailwind:E,tsCode:v,tsTailwind:V},z=()=>{const[l,g]=t.useState(70),[i,m]=t.useState(2),[s,d]=t.useState("elastic.out(1, 0.3)"),[a,u]=t.useState("chars"),[o,h]=t.useState(!0),[y,n]=M(),x=[{name:"tag",type:"string",default:'"p"',description:'HTML tag to render: "h1", "h2", "h3", "h4", "h5", "h6", "p",'},{name:"text",type:"string",default:'""',description:"The text content to animate."},{name:"className",type:"string",default:'""',description:"Additional class names to style the component."},{name:"delay",type:"number",default:"100",description:"Delay between animations for each letter (in ms)."},{name:"duration",type:"number",default:"0.6",description:"Duration of each letter animation (in seconds)."},{name:"ease",type:"string",default:'"power3.out"',description:"GSAP easing function for the animation."},{name:"splitType",type:"string",default:'"chars"',description:'Split type: "chars", "words", "lines", or "words, chars".'},{name:"from",type:"object",default:"{ opacity: 0, y: 40 }",description:"Initial GSAP properties for each letter/word."},{name:"to",type:"object",default:"{ opacity: 1, y: 0 }",description:"Target GSAP properties for each letter/word."},{name:"threshold",type:"number",default:"0.1",description:"Intersection threshold to trigger the animation (0-1)."},{name:"rootMargin",type:"string",default:'"-100px"',description:"Root margin for the ScrollTrigger."},{name:"textAlign",type:"string",default:'"center"',description:"Text alignment: 'left', 'center', 'right', etc."},{name:"onLetterAnimationComplete",type:"function",default:"undefined",description:"Callback function when all animations complete."}];return r.jsxs(C,{children:[r.jsxs(b,{children:[r.jsxs(S,{position:"relative",className:"demo-container",minH:400,overflow:"hidden",children:[r.jsx(G,{onClick:n}),r.jsx(T,{text:"Hello, you!",delay:l,duration:i,ease:s,splitType:a,className:"split-text-demo",onLetterAnimationComplete:o?()=>w("✅ Animation Finished!"):void 0},y)]}),r.jsxs(R,{children:[r.jsxs(A,{gap:2,wrap:"wrap",children:[r.jsxs(c,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:10,onClick:()=>{u(a==="chars"?"words":a==="words"?"lines":"chars"),n()},children:["Split Type: ",r.jsxs(p,{color:"#a1a1aa",children:[" ",a]})]}),r.jsxs(c,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:10,onClick:()=>{d(s==="power3.out"?"bounce.out":s==="bounce.out"?"elastic.out(1, 0.3)":"power3.out"),n()},children:["Ease: ",r.jsxs(p,{color:"#a1a1aa",children:[" ",s]})]})]}),r.jsx(f,{title:"Stagger Delay (ms)",min:10,max:500,step:10,value:l,onChange:e=>{g(e),n()}}),r.jsx(f,{title:"Duration (s)",min:.1,max:2,step:.1,value:i,onChange:e=>{m(e),n()}}),r.jsx(_,{title:"Show Completion Toast",isChecked:o,onChange:e=>{h(e),n()}})]}),r.jsx(P,{data:x}),r.jsx(I,{dependencyList:["gsap","@gsap/react"]})]}),r.jsx(N,{children:r.jsx(L,{codeObject:j})})]})};export{z as default};
