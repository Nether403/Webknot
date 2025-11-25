import{m as en,r as z,j as r,e as tn,B as rn,F as on}from"./index-wsKSLPNH.js";import{T as an,P as cn,a as sn,C as fn,b as ln}from"./PropTable-C4uPWs8h.js";import{P as G}from"./PreviewSlider-m1G_aiYP.js";import{P as un}from"./PreviewSwitch-DqnF708j.js";import{C as dn}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";const K=en("div",{base:{flex:1,justifySelf:"stretch",alignSelf:"stretch"}});K.displayName="Spacer";const J=({children:f,fontSize:o="clamp(2rem, 10vw, 10rem)",fontWeight:c=900,fontFamily:d="inherit",color:l="#fff",enableHover:s=!0,baseIntensity:y=.18,hoverIntensity:i=.5})=>{const B=z.useRef(null);return z.useEffect(()=>{let C,T=!1;const n=B.current;return n?((async()=>{var k;if((k=document.fonts)!=null&&k.ready&&await document.fonts.ready,T)return;const p=n.getContext("2d");if(!p)return;const w=d==="inherit"?window.getComputedStyle(n).fontFamily||"sans-serif":d,L=typeof o=="number"?`${o}px`:o;let F;if(typeof o=="number")F=o;else{const e=document.createElement("span");e.style.fontSize=o,document.body.appendChild(e);const t=window.getComputedStyle(e).fontSize;F=parseFloat(t),document.body.removeChild(e)}const E=tn.Children.toArray(f).join(""),S=document.createElement("canvas"),a=S.getContext("2d");if(!a)return;a.font=`${c} ${L} ${w}`,a.textBaseline="alphabetic";const h=a.measureText(E),H=h.actualBoundingBoxLeft??0,Q=h.actualBoundingBoxRight??h.width,I=h.actualBoundingBoxAscent??F,U=h.actualBoundingBoxDescent??F*.2,W=Math.ceil(H+Q),m=Math.ceil(I+U),A=10,v=W+A;S.width=v,S.height=m;const j=A/2;a.font=`${c} ${L} ${w}`,a.textBaseline="alphabetic",a.fillStyle=l,a.fillText(E,j-H,I);const M=50,b=0;n.width=v+M*2,n.height=m+b*2,p.translate(M,b);const $=M+j,D=b,V=$+W,Z=D+m;let x=!1;const g=30,O=()=>{if(T)return;p.clearRect(-g,-g,v+2*g,m+2*g);const e=x?i:y;for(let t=0;t<m;t++){const u=Math.floor(e*(Math.random()-.5)*g);p.drawImage(S,0,t,v,1,u,t,v,1)}C=window.requestAnimationFrame(O)};O();const P=(e,t)=>e>=$&&e<=V&&t>=D&&t<=Z,X=e=>{if(!s)return;const t=n.getBoundingClientRect(),u=e.clientX-t.left,R=e.clientY-t.top;x=P(u,R)},Y=()=>{x=!1},q=e=>{if(!s)return;e.preventDefault();const t=n.getBoundingClientRect(),u=e.touches[0],R=u.clientX-t.left,nn=u.clientY-t.top;x=P(R,nn)},N=()=>{x=!1};s&&(n.addEventListener("mousemove",X),n.addEventListener("mouseleave",Y),n.addEventListener("touchmove",q,{passive:!1}),n.addEventListener("touchend",N));const _=()=>{window.cancelAnimationFrame(C),s&&(n.removeEventListener("mousemove",X),n.removeEventListener("mouseleave",Y),n.removeEventListener("touchmove",q),n.removeEventListener("touchend",N))};n.cleanupFuzzyText=_})(),()=>{T=!0,window.cancelAnimationFrame(C),n&&n.cleanupFuzzyText&&n.cleanupFuzzyText()}):void 0},[f,o,c,d,l,s,y,i]),r.jsx("canvas",{ref:B})},hn=`import React, { useEffect, useRef } from 'react';\r
\r
const FuzzyText = ({\r
  children,\r
  fontSize = 'clamp(2rem, 10vw, 10rem)',\r
  fontWeight = 900,\r
  fontFamily = 'inherit',\r
  color = '#fff',\r
  enableHover = true,\r
  baseIntensity = 0.18,\r
  hoverIntensity = 0.5\r
}) => {\r
  const canvasRef = useRef(null);\r
\r
  useEffect(() => {\r
    let animationFrameId;\r
    let isCancelled = false;\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const init = async () => {\r
      if (document.fonts?.ready) {\r
        await document.fonts.ready;\r
      }\r
      if (isCancelled) return;\r
\r
      const ctx = canvas.getContext('2d');\r
      if (!ctx) return;\r
\r
      const computedFontFamily =\r
        fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;\r
\r
      const fontSizeStr = typeof fontSize === 'number' ? \`\${fontSize}px\` : fontSize;\r
      let numericFontSize;\r
      if (typeof fontSize === 'number') {\r
        numericFontSize = fontSize;\r
      } else {\r
        const temp = document.createElement('span');\r
        temp.style.fontSize = fontSize;\r
        document.body.appendChild(temp);\r
        const computedSize = window.getComputedStyle(temp).fontSize;\r
        numericFontSize = parseFloat(computedSize);\r
        document.body.removeChild(temp);\r
      }\r
\r
      const text = React.Children.toArray(children).join('');\r
\r
      const offscreen = document.createElement('canvas');\r
      const offCtx = offscreen.getContext('2d');\r
      if (!offCtx) return;\r
\r
      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`;\r
      offCtx.textBaseline = 'alphabetic';\r
      const metrics = offCtx.measureText(text);\r
\r
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;\r
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;\r
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;\r
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;\r
\r
      const textBoundingWidth = Math.ceil(actualLeft + actualRight);\r
      const tightHeight = Math.ceil(actualAscent + actualDescent);\r
\r
      const extraWidthBuffer = 10;\r
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;\r
\r
      offscreen.width = offscreenWidth;\r
      offscreen.height = tightHeight;\r
\r
      const xOffset = extraWidthBuffer / 2;\r
      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`;\r
      offCtx.textBaseline = 'alphabetic';\r
      offCtx.fillStyle = color;\r
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);\r
\r
      const horizontalMargin = 50;\r
      const verticalMargin = 0;\r
      canvas.width = offscreenWidth + horizontalMargin * 2;\r
      canvas.height = tightHeight + verticalMargin * 2;\r
      ctx.translate(horizontalMargin, verticalMargin);\r
\r
      const interactiveLeft = horizontalMargin + xOffset;\r
      const interactiveTop = verticalMargin;\r
      const interactiveRight = interactiveLeft + textBoundingWidth;\r
      const interactiveBottom = interactiveTop + tightHeight;\r
\r
      let isHovering = false;\r
      const fuzzRange = 30;\r
\r
      const run = () => {\r
        if (isCancelled) return;\r
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);\r
        const intensity = isHovering ? hoverIntensity : baseIntensity;\r
        for (let j = 0; j < tightHeight; j++) {\r
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);\r
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);\r
        }\r
        animationFrameId = window.requestAnimationFrame(run);\r
      };\r
\r
      run();\r
\r
      const isInsideTextArea = (x, y) => {\r
        return x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;\r
      };\r
\r
      const handleMouseMove = e => {\r
        if (!enableHover) return;\r
        const rect = canvas.getBoundingClientRect();\r
        const x = e.clientX - rect.left;\r
        const y = e.clientY - rect.top;\r
        isHovering = isInsideTextArea(x, y);\r
      };\r
\r
      const handleMouseLeave = () => {\r
        isHovering = false;\r
      };\r
\r
      const handleTouchMove = e => {\r
        if (!enableHover) return;\r
        e.preventDefault();\r
        const rect = canvas.getBoundingClientRect();\r
        const touch = e.touches[0];\r
        const x = touch.clientX - rect.left;\r
        const y = touch.clientY - rect.top;\r
        isHovering = isInsideTextArea(x, y);\r
      };\r
\r
      const handleTouchEnd = () => {\r
        isHovering = false;\r
      };\r
\r
      if (enableHover) {\r
        canvas.addEventListener('mousemove', handleMouseMove);\r
        canvas.addEventListener('mouseleave', handleMouseLeave);\r
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });\r
        canvas.addEventListener('touchend', handleTouchEnd);\r
      }\r
\r
      const cleanup = () => {\r
        window.cancelAnimationFrame(animationFrameId);\r
        if (enableHover) {\r
          canvas.removeEventListener('mousemove', handleMouseMove);\r
          canvas.removeEventListener('mouseleave', handleMouseLeave);\r
          canvas.removeEventListener('touchmove', handleTouchMove);\r
          canvas.removeEventListener('touchend', handleTouchEnd);\r
        }\r
      };\r
\r
      canvas.cleanupFuzzyText = cleanup;\r
    };\r
\r
    init();\r
\r
    return () => {\r
      isCancelled = true;\r
      window.cancelAnimationFrame(animationFrameId);\r
      if (canvas && canvas.cleanupFuzzyText) {\r
        canvas.cleanupFuzzyText();\r
      }\r
    };\r
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);\r
\r
  return <canvas ref={canvasRef} />;\r
};\r
\r
export default FuzzyText;\r
`,mn=`import React, { useEffect, useRef } from 'react';\r
\r
const FuzzyText = ({\r
  children,\r
  fontSize = 'clamp(2rem, 10vw, 10rem)',\r
  fontWeight = 900,\r
  fontFamily = 'inherit',\r
  color = '#fff',\r
  enableHover = true,\r
  baseIntensity = 0.18,\r
  hoverIntensity = 0.5\r
}) => {\r
  const canvasRef = useRef(null);\r
\r
  useEffect(() => {\r
    let animationFrameId;\r
    let isCancelled = false;\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const init = async () => {\r
      if (document.fonts?.ready) {\r
        await document.fonts.ready;\r
      }\r
      if (isCancelled) return;\r
\r
      const ctx = canvas.getContext('2d');\r
      if (!ctx) return;\r
\r
      const computedFontFamily =\r
        fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;\r
\r
      const fontSizeStr = typeof fontSize === 'number' ? \`\${fontSize}px\` : fontSize;\r
      let numericFontSize;\r
      if (typeof fontSize === 'number') {\r
        numericFontSize = fontSize;\r
      } else {\r
        const temp = document.createElement('span');\r
        temp.style.fontSize = fontSize;\r
        document.body.appendChild(temp);\r
        const computedSize = window.getComputedStyle(temp).fontSize;\r
        numericFontSize = parseFloat(computedSize);\r
        document.body.removeChild(temp);\r
      }\r
\r
      const text = React.Children.toArray(children).join('');\r
\r
      const offscreen = document.createElement('canvas');\r
      const offCtx = offscreen.getContext('2d');\r
      if (!offCtx) return;\r
\r
      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`;\r
      offCtx.textBaseline = 'alphabetic';\r
      const metrics = offCtx.measureText(text);\r
\r
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;\r
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;\r
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;\r
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;\r
\r
      const textBoundingWidth = Math.ceil(actualLeft + actualRight);\r
      const tightHeight = Math.ceil(actualAscent + actualDescent);\r
\r
      const extraWidthBuffer = 10;\r
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;\r
\r
      offscreen.width = offscreenWidth;\r
      offscreen.height = tightHeight;\r
\r
      const xOffset = extraWidthBuffer / 2;\r
      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`;\r
      offCtx.textBaseline = 'alphabetic';\r
      offCtx.fillStyle = color;\r
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);\r
\r
      const horizontalMargin = 50;\r
      const verticalMargin = 0;\r
      canvas.width = offscreenWidth + horizontalMargin * 2;\r
      canvas.height = tightHeight + verticalMargin * 2;\r
      ctx.translate(horizontalMargin, verticalMargin);\r
\r
      const interactiveLeft = horizontalMargin + xOffset;\r
      const interactiveTop = verticalMargin;\r
      const interactiveRight = interactiveLeft + textBoundingWidth;\r
      const interactiveBottom = interactiveTop + tightHeight;\r
\r
      let isHovering = false;\r
      const fuzzRange = 30;\r
\r
      const run = () => {\r
        if (isCancelled) return;\r
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);\r
        const intensity = isHovering ? hoverIntensity : baseIntensity;\r
        for (let j = 0; j < tightHeight; j++) {\r
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);\r
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);\r
        }\r
        animationFrameId = window.requestAnimationFrame(run);\r
      };\r
\r
      run();\r
\r
      const isInsideTextArea = (x, y) => {\r
        return x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;\r
      };\r
\r
      const handleMouseMove = e => {\r
        if (!enableHover) return;\r
        const rect = canvas.getBoundingClientRect();\r
        const x = e.clientX - rect.left;\r
        const y = e.clientY - rect.top;\r
        isHovering = isInsideTextArea(x, y);\r
      };\r
\r
      const handleMouseLeave = () => {\r
        isHovering = false;\r
      };\r
\r
      const handleTouchMove = e => {\r
        if (!enableHover) return;\r
        e.preventDefault();\r
        const rect = canvas.getBoundingClientRect();\r
        const touch = e.touches[0];\r
        const x = touch.clientX - rect.left;\r
        const y = touch.clientY - rect.top;\r
        isHovering = isInsideTextArea(x, y);\r
      };\r
\r
      const handleTouchEnd = () => {\r
        isHovering = false;\r
      };\r
\r
      if (enableHover) {\r
        canvas.addEventListener('mousemove', handleMouseMove);\r
        canvas.addEventListener('mouseleave', handleMouseLeave);\r
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });\r
        canvas.addEventListener('touchend', handleTouchEnd);\r
      }\r
\r
      const cleanup = () => {\r
        window.cancelAnimationFrame(animationFrameId);\r
        if (enableHover) {\r
          canvas.removeEventListener('mousemove', handleMouseMove);\r
          canvas.removeEventListener('mouseleave', handleMouseLeave);\r
          canvas.removeEventListener('touchmove', handleTouchMove);\r
          canvas.removeEventListener('touchend', handleTouchEnd);\r
        }\r
      };\r
\r
      canvas.cleanupFuzzyText = cleanup;\r
    };\r
\r
    init();\r
\r
    return () => {\r
      isCancelled = true;\r
      window.cancelAnimationFrame(animationFrameId);\r
      if (canvas && canvas.cleanupFuzzyText) {\r
        canvas.cleanupFuzzyText();\r
      }\r
    };\r
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);\r
\r
  return <canvas ref={canvasRef} />;\r
};\r
\r
export default FuzzyText;\r
`,vn=`import React, { useEffect, useRef } from 'react';\r
\r
interface FuzzyTextProps {\r
  children: React.ReactNode;\r
  fontSize?: number | string;\r
  fontWeight?: string | number;\r
  fontFamily?: string;\r
  color?: string;\r
  enableHover?: boolean;\r
  baseIntensity?: number;\r
  hoverIntensity?: number;\r
}\r
\r
const FuzzyText: React.FC<FuzzyTextProps> = ({\r
  children,\r
  fontSize = 'clamp(2rem, 8vw, 8rem)',\r
  fontWeight = 900,\r
  fontFamily = 'inherit',\r
  color = '#fff',\r
  enableHover = true,\r
  baseIntensity = 0.18,\r
  hoverIntensity = 0.5\r
}) => {\r
  const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null);\r
\r
  useEffect(() => {\r
    let animationFrameId: number;\r
    let isCancelled = false;\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const init = async () => {\r
      if (document.fonts?.ready) {\r
        await document.fonts.ready;\r
      }\r
      if (isCancelled) return;\r
\r
      const ctx = canvas.getContext('2d');\r
      if (!ctx) return;\r
\r
      const computedFontFamily =\r
        fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;\r
\r
      const fontSizeStr = typeof fontSize === 'number' ? \`\${fontSize}px\` : fontSize;\r
      let numericFontSize: number;\r
      if (typeof fontSize === 'number') {\r
        numericFontSize = fontSize;\r
      } else {\r
        const temp = document.createElement('span');\r
        temp.style.fontSize = fontSize;\r
        document.body.appendChild(temp);\r
        const computedSize = window.getComputedStyle(temp).fontSize;\r
        numericFontSize = parseFloat(computedSize);\r
        document.body.removeChild(temp);\r
      }\r
\r
      const text = React.Children.toArray(children).join('');\r
\r
      const offscreen = document.createElement('canvas');\r
      const offCtx = offscreen.getContext('2d');\r
      if (!offCtx) return;\r
\r
      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`;\r
      offCtx.textBaseline = 'alphabetic';\r
      const metrics = offCtx.measureText(text);\r
\r
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;\r
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;\r
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;\r
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;\r
\r
      const textBoundingWidth = Math.ceil(actualLeft + actualRight);\r
      const tightHeight = Math.ceil(actualAscent + actualDescent);\r
\r
      const extraWidthBuffer = 10;\r
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;\r
\r
      offscreen.width = offscreenWidth;\r
      offscreen.height = tightHeight;\r
\r
      const xOffset = extraWidthBuffer / 2;\r
      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`;\r
      offCtx.textBaseline = 'alphabetic';\r
      offCtx.fillStyle = color;\r
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);\r
\r
      const horizontalMargin = 50;\r
      const verticalMargin = 0;\r
      canvas.width = offscreenWidth + horizontalMargin * 2;\r
      canvas.height = tightHeight + verticalMargin * 2;\r
      ctx.translate(horizontalMargin, verticalMargin);\r
\r
      const interactiveLeft = horizontalMargin + xOffset;\r
      const interactiveTop = verticalMargin;\r
      const interactiveRight = interactiveLeft + textBoundingWidth;\r
      const interactiveBottom = interactiveTop + tightHeight;\r
\r
      let isHovering = false;\r
      const fuzzRange = 30;\r
\r
      const run = () => {\r
        if (isCancelled) return;\r
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);\r
        const intensity = isHovering ? hoverIntensity : baseIntensity;\r
        for (let j = 0; j < tightHeight; j++) {\r
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);\r
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);\r
        }\r
        animationFrameId = window.requestAnimationFrame(run);\r
      };\r
\r
      run();\r
\r
      const isInsideTextArea = (x: number, y: number) =>\r
        x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;\r
\r
      const handleMouseMove = (e: MouseEvent) => {\r
        if (!enableHover) return;\r
        const rect = canvas.getBoundingClientRect();\r
        const x = e.clientX - rect.left;\r
        const y = e.clientY - rect.top;\r
        isHovering = isInsideTextArea(x, y);\r
      };\r
\r
      const handleMouseLeave = () => {\r
        isHovering = false;\r
      };\r
\r
      const handleTouchMove = (e: TouchEvent) => {\r
        if (!enableHover) return;\r
        e.preventDefault();\r
        const rect = canvas.getBoundingClientRect();\r
        const touch = e.touches[0];\r
        const x = touch.clientX - rect.left;\r
        const y = touch.clientY - rect.top;\r
        isHovering = isInsideTextArea(x, y);\r
      };\r
\r
      const handleTouchEnd = () => {\r
        isHovering = false;\r
      };\r
\r
      if (enableHover) {\r
        canvas.addEventListener('mousemove', handleMouseMove);\r
        canvas.addEventListener('mouseleave', handleMouseLeave);\r
        canvas.addEventListener('touchmove', handleTouchMove, {\r
          passive: false\r
        });\r
        canvas.addEventListener('touchend', handleTouchEnd);\r
      }\r
\r
      const cleanup = () => {\r
        window.cancelAnimationFrame(animationFrameId);\r
        if (enableHover) {\r
          canvas.removeEventListener('mousemove', handleMouseMove);\r
          canvas.removeEventListener('mouseleave', handleMouseLeave);\r
          canvas.removeEventListener('touchmove', handleTouchMove);\r
          canvas.removeEventListener('touchend', handleTouchEnd);\r
        }\r
      };\r
\r
      canvas.cleanupFuzzyText = cleanup;\r
    };\r
\r
    init();\r
\r
    return () => {\r
      isCancelled = true;\r
      window.cancelAnimationFrame(animationFrameId);\r
      if (canvas && canvas.cleanupFuzzyText) {\r
        canvas.cleanupFuzzyText();\r
      }\r
    };\r
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);\r
\r
  return <canvas ref={canvasRef} />;\r
};\r
\r
export default FuzzyText;\r
`,xn=`import React, { useEffect, useRef } from 'react';\r
\r
interface FuzzyTextProps {\r
  children: React.ReactNode;\r
  fontSize?: number | string;\r
  fontWeight?: string | number;\r
  fontFamily?: string;\r
  color?: string;\r
  enableHover?: boolean;\r
  baseIntensity?: number;\r
  hoverIntensity?: number;\r
}\r
\r
const FuzzyText: React.FC<FuzzyTextProps> = ({\r
  children,\r
  fontSize = 'clamp(2rem, 8vw, 8rem)',\r
  fontWeight = 900,\r
  fontFamily = 'inherit',\r
  color = '#fff',\r
  enableHover = true,\r
  baseIntensity = 0.18,\r
  hoverIntensity = 0.5\r
}) => {\r
  const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null);\r
\r
  useEffect(() => {\r
    let animationFrameId: number;\r
    let isCancelled = false;\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const init = async () => {\r
      if (document.fonts?.ready) {\r
        await document.fonts.ready;\r
      }\r
      if (isCancelled) return;\r
\r
      const ctx = canvas.getContext('2d');\r
      if (!ctx) return;\r
\r
      const computedFontFamily =\r
        fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;\r
\r
      const fontSizeStr = typeof fontSize === 'number' ? \`\${fontSize}px\` : fontSize;\r
      let numericFontSize: number;\r
      if (typeof fontSize === 'number') {\r
        numericFontSize = fontSize;\r
      } else {\r
        const temp = document.createElement('span');\r
        temp.style.fontSize = fontSize;\r
        document.body.appendChild(temp);\r
        const computedSize = window.getComputedStyle(temp).fontSize;\r
        numericFontSize = parseFloat(computedSize);\r
        document.body.removeChild(temp);\r
      }\r
\r
      const text = React.Children.toArray(children).join('');\r
\r
      const offscreen = document.createElement('canvas');\r
      const offCtx = offscreen.getContext('2d');\r
      if (!offCtx) return;\r
\r
      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`;\r
      offCtx.textBaseline = 'alphabetic';\r
      const metrics = offCtx.measureText(text);\r
\r
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;\r
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;\r
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;\r
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;\r
\r
      const textBoundingWidth = Math.ceil(actualLeft + actualRight);\r
      const tightHeight = Math.ceil(actualAscent + actualDescent);\r
\r
      const extraWidthBuffer = 10;\r
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;\r
\r
      offscreen.width = offscreenWidth;\r
      offscreen.height = tightHeight;\r
\r
      const xOffset = extraWidthBuffer / 2;\r
      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`;\r
      offCtx.textBaseline = 'alphabetic';\r
      offCtx.fillStyle = color;\r
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);\r
\r
      const horizontalMargin = 50;\r
      const verticalMargin = 0;\r
      canvas.width = offscreenWidth + horizontalMargin * 2;\r
      canvas.height = tightHeight + verticalMargin * 2;\r
      ctx.translate(horizontalMargin, verticalMargin);\r
\r
      const interactiveLeft = horizontalMargin + xOffset;\r
      const interactiveTop = verticalMargin;\r
      const interactiveRight = interactiveLeft + textBoundingWidth;\r
      const interactiveBottom = interactiveTop + tightHeight;\r
\r
      let isHovering = false;\r
      const fuzzRange = 30;\r
\r
      const run = () => {\r
        if (isCancelled) return;\r
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);\r
        const intensity = isHovering ? hoverIntensity : baseIntensity;\r
        for (let j = 0; j < tightHeight; j++) {\r
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);\r
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);\r
        }\r
        animationFrameId = window.requestAnimationFrame(run);\r
      };\r
\r
      run();\r
\r
      const isInsideTextArea = (x: number, y: number) =>\r
        x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;\r
\r
      const handleMouseMove = (e: MouseEvent) => {\r
        if (!enableHover) return;\r
        const rect = canvas.getBoundingClientRect();\r
        const x = e.clientX - rect.left;\r
        const y = e.clientY - rect.top;\r
        isHovering = isInsideTextArea(x, y);\r
      };\r
\r
      const handleMouseLeave = () => {\r
        isHovering = false;\r
      };\r
\r
      const handleTouchMove = (e: TouchEvent) => {\r
        if (!enableHover) return;\r
        e.preventDefault();\r
        const rect = canvas.getBoundingClientRect();\r
        const touch = e.touches[0];\r
        const x = touch.clientX - rect.left;\r
        const y = touch.clientY - rect.top;\r
        isHovering = isInsideTextArea(x, y);\r
      };\r
\r
      const handleTouchEnd = () => {\r
        isHovering = false;\r
      };\r
\r
      if (enableHover) {\r
        canvas.addEventListener('mousemove', handleMouseMove);\r
        canvas.addEventListener('mouseleave', handleMouseLeave);\r
        canvas.addEventListener('touchmove', handleTouchMove, {\r
          passive: false\r
        });\r
        canvas.addEventListener('touchend', handleTouchEnd);\r
      }\r
\r
      const cleanup = () => {\r
        window.cancelAnimationFrame(animationFrameId);\r
        if (enableHover) {\r
          canvas.removeEventListener('mousemove', handleMouseMove);\r
          canvas.removeEventListener('mouseleave', handleMouseLeave);\r
          canvas.removeEventListener('touchmove', handleTouchMove);\r
          canvas.removeEventListener('touchend', handleTouchEnd);\r
        }\r
      };\r
\r
      canvas.cleanupFuzzyText = cleanup;\r
    };\r
\r
    init();\r
\r
    return () => {\r
      isCancelled = true;\r
      window.cancelAnimationFrame(animationFrameId);\r
      if (canvas && canvas.cleanupFuzzyText) {\r
        canvas.cleanupFuzzyText();\r
      }\r
    };\r
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);\r
\r
  return <canvas ref={canvasRef} />;\r
};\r
\r
export default FuzzyText;\r
`,gn={usage:`import FuzzyText from './FuzzyText';
  
<FuzzyText 
  baseIntensity={0.2} 
  hoverIntensity={hoverIntensity} 
  enableHover={enableHover}
>
  404
</FuzzyText>`,code:hn,tailwind:mn,tsCode:vn,tsTailwind:xn},Mn=()=>{const[f,o]=z.useState(.2),[c,d]=z.useState(.5),[l,s]=z.useState(!0),y=[{name:"children",type:"React.ReactNode",default:"",description:"The text content to display inside the fuzzy text component."},{name:"fontSize",type:"number | string",default:'"clamp(2rem, 8vw, 8rem)"',description:"Specifies the font size of the text. Accepts any valid CSS font-size value or a number (interpreted as pixels)."},{name:"fontWeight",type:"string | number",default:"900",description:"Specifies the font weight of the text."},{name:"fontFamily",type:"string",default:'"inherit"',description:"Specifies the font family of the text. 'inherit' uses the computed style from the parent."},{name:"color",type:"string",default:"#fff",description:"Specifies the text color."},{name:"enableHover",type:"boolean",default:"true",description:"Enables the hover effect for the fuzzy text."},{name:"baseIntensity",type:"number",default:"0.18",description:"The fuzz intensity when the text is not hovered."},{name:"hoverIntensity",type:"number",default:"0.5",description:"The fuzz intensity when the text is hovered."}];return r.jsxs(an,{children:[r.jsxs(cn,{children:[r.jsx(rn,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:r.jsxs(on,{direction:"column",children:[r.jsx(J,{baseIntensity:f,hoverIntensity:c,enableHover:l,fontSize:140,children:"404"}),r.jsx(K,{my:1}),r.jsx(J,{baseIntensity:f,hoverIntensity:c,enableHover:l,fontSize:70,fontFamily:"Gochi Hand",children:"not found"})]})}),r.jsxs(dn,{children:[r.jsx(G,{title:"Base Intensity",min:0,max:1,step:.01,value:f,onChange:i=>{o(i)}}),r.jsx(G,{title:"Hover Intensity",min:0,max:2,step:.01,value:c,onChange:i=>{d(i)}}),r.jsx(un,{title:"Enable Hover",isChecked:l,onChange:i=>{s(i)}})]}),r.jsx(sn,{data:y})]}),r.jsx(fn,{children:r.jsx(ln,{codeObject:gn})})]})};export{Mn as default};
