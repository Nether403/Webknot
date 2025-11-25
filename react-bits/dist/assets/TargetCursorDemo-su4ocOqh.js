import{r as i,j as r,m as rr,n as ir,o as lr,g as t,B as dr,T as L}from"./index-wsKSLPNH.js";import{T as fr,P as mr,a as gr,C as pr,b as vr}from"./PropTable-C4uPWs8h.js";import{C as Tr}from"./Customize-1m_ZNqR9.js";import{D as hr}from"./Dependencies-BHoMfJUj.js";import{P as br}from"./PreviewSlider-m1G_aiYP.js";import{P as wr}from"./PreviewSwitch-DqnF708j.js";import"./index-Bpz4cGEA.js";const Rr=i.forwardRef(function(n,g){const{templateAreas:e,column:u,row:o,autoFlow:f,autoRows:v,templateRows:b,autoColumns:T,templateColumns:p,inline:a,...y}=n;return r.jsx(rr.div,{...y,ref:g,css:[{display:a?"inline-grid":"grid",gridTemplateAreas:e,gridAutoColumns:T,gridColumn:u,gridRow:o,gridAutoFlow:f,gridAutoRows:v,gridTemplateRows:b,gridTemplateColumns:p},n.css]})});function _(d){return lr(d,n=>n==="auto"?"auto":`span ${n}/span ${n}`)}const A=i.forwardRef(function(n,g){const{area:e,colSpan:u,colStart:o,colEnd:f,rowEnd:v,rowSpan:b,rowStart:T,...p}=n,a=i.useMemo(()=>ir({gridArea:e,gridColumn:_(u),gridRow:_(b),gridColumnStart:o,gridColumnEnd:f,gridRowStart:T,gridRowEnd:v}),[e,u,o,f,v,b,T]);return r.jsx(rr.div,{ref:g,css:[a,n.css],...p})}),xr=({targetSelector:d=".cursor-target",spinDuration:n=2,hideDefaultCursor:g=!0})=>{const e=i.useRef(null),u=i.useRef(null),o=i.useRef(null),f=i.useRef(null),v=i.useMemo(()=>({borderWidth:3,cornerSize:12,parallaxStrength:5e-5}),[]),b=i.useCallback((T,p)=>{e.current&&t.to(e.current,{x:T,y:p,duration:.1,ease:"power3.out"})},[]);return i.useEffect(()=>{if(!e.current)return;const T=document.body.style.cursor;g&&(document.body.style.cursor="none");const p=e.current;u.current=p.querySelectorAll(".target-cursor-corner");let a=null,y=null,C=null,z=!1,H=null;const W=l=>{y&&l.removeEventListener("mousemove",y),C&&l.removeEventListener("mouseleave",C),y=null,C=null};t.set(p,{xPercent:-50,yPercent:-50,x:window.innerWidth/2,y:window.innerHeight/2}),(()=>{o.current&&o.current.kill(),o.current=t.timeline({repeat:-1}).to(p,{rotation:"+=360",duration:n,ease:"none"})})();const k=l=>b(l.clientX,l.clientY);window.addEventListener("mousemove",k);const G=()=>{if(!a||!e.current)return;const l=t.getProperty(e.current,"x"),P=t.getProperty(e.current,"y"),E=document.elementFromPoint(l,P);E&&(E===a||E.closest(d)===a)||C&&C()};window.addEventListener("scroll",G,{passive:!0}),window.addEventListener("mousemove",k);const er=()=>{f.current&&(t.to(f.current,{scale:.7,duration:.3}),t.to(e.current,{scale:.9,duration:.2}))},tr=()=>{f.current&&(t.to(f.current,{scale:1,duration:.3}),t.to(e.current,{scale:1,duration:.2}))};window.addEventListener("mousedown",er),window.addEventListener("mouseup",tr);const I=l=>{var K;const P=l.target,E=[];let w=P;for(;w&&w!==document.body;)w.matches(d)&&E.push(w),w=w.parentElement;const R=E[0]||null;if(!R||!e.current||!u.current||a===R)return;a&&W(a),H&&(clearTimeout(H),H=null),a=R,Array.from(u.current).forEach(m=>{t.killTweensOf(m)}),t.killTweensOf(e.current,"rotation"),(K=o.current)==null||K.pause(),t.set(e.current,{rotation:0});const $=(m,c)=>{const s=R.getBoundingClientRect(),S=e.current.getBoundingClientRect(),O=S.left+S.width/2,x=S.top+S.height/2,[nr,or,sr,cr]=Array.from(u.current),{borderWidth:h,cornerSize:Y,parallaxStrength:V}=v;let j={x:s.left-O-h,y:s.top-x-h},U={x:s.right-O+h-Y,y:s.top-x-h},F={x:s.right-O+h-Y,y:s.bottom-x+h-Y},B={x:s.left-O-h,y:s.bottom-x+h-Y};if(m!==void 0&&c!==void 0){const q=s.left+s.width/2,X=s.top+s.height/2,M=(m-q)*V,D=(c-X)*V;j.x+=M,j.y+=D,U.x+=M,U.y+=D,F.x+=M,F.y+=D,B.x+=M,B.y+=D}const ar=t.timeline(),ur=[nr,or,sr,cr],Z=[j,U,F,B];ur.forEach((q,X)=>{ar.to(q,{x:Z[X].x,y:Z[X].y,duration:.2,ease:"power2.out"},0)})};z=!0,$(),setTimeout(()=>{z=!1},1);let N=null;const Q=m=>{N||z||(N=requestAnimationFrame(()=>{const c=m;$(c.clientX,c.clientY),N=null}))},J=()=>{if(a=null,z=!1,u.current){const m=Array.from(u.current);t.killTweensOf(m);const{cornerSize:c}=v,s=[{x:-c*1.5,y:-c*1.5},{x:c*.5,y:-c*1.5},{x:c*.5,y:c*.5},{x:-c*1.5,y:c*.5}],S=t.timeline();m.forEach((O,x)=>{S.to(O,{x:s[x].x,y:s[x].y,duration:.3,ease:"power3.out"},0)})}H=setTimeout(()=>{if(!a&&e.current&&o.current){const c=t.getProperty(e.current,"rotation")%360;o.current.kill(),o.current=t.timeline({repeat:-1}).to(e.current,{rotation:"+=360",duration:n,ease:"none"}),t.to(e.current,{rotation:c+360,duration:n*(1-c/360),ease:"none",onComplete:()=>{var s;(s=o.current)==null||s.restart()}})}H=null},50),W(R)};y=Q,C=J,R.addEventListener("mousemove",Q),R.addEventListener("mouseleave",J)};return window.addEventListener("mouseover",I,{passive:!0}),()=>{var l;window.removeEventListener("mousemove",k),window.removeEventListener("mouseover",I),window.removeEventListener("scroll",G),a&&W(a),console.log("Cleaning up TargetCursor"),(l=o.current)==null||l.kill(),document.body.style.cursor=T}},[d,n,b,v,g]),i.useEffect(()=>{!e.current||!o.current||o.current.isActive()&&(o.current.kill(),o.current=t.timeline({repeat:-1}).to(e.current,{rotation:"+=360",duration:n,ease:"none"}))},[n]),r.jsxs("div",{ref:e,className:"target-cursor-wrapper",children:[r.jsx("div",{ref:f,className:"target-cursor-dot"}),r.jsx("div",{className:"target-cursor-corner corner-tl"}),r.jsx("div",{className:"target-cursor-corner corner-tr"}),r.jsx("div",{className:"target-cursor-corner corner-br"}),r.jsx("div",{className:"target-cursor-corner corner-bl"})]})},yr=`import { useEffect, useRef, useCallback, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import './TargetCursor.css';\r
\r
const TargetCursor = ({ targetSelector = '.cursor-target', spinDuration = 2, hideDefaultCursor = true }) => {\r
  const cursorRef = useRef(null);\r
  const cornersRef = useRef(null);\r
  const spinTl = useRef(null);\r
  const dotRef = useRef(null);\r
  const constants = useMemo(\r
    () => ({\r
      borderWidth: 3,\r
      cornerSize: 12,\r
      parallaxStrength: 0.00005\r
    }),\r
    []\r
  );\r
\r
  const moveCursor = useCallback((x, y) => {\r
    if (!cursorRef.current) return;\r
    gsap.to(cursorRef.current, {\r
      x,\r
      y,\r
      duration: 0.1,\r
      ease: 'power3.out'\r
    });\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!cursorRef.current) return;\r
\r
    const originalCursor = document.body.style.cursor;\r
    if (hideDefaultCursor) {\r
      document.body.style.cursor = 'none';\r
    }\r
\r
    const cursor = cursorRef.current;\r
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');\r
\r
    let activeTarget = null;\r
    let currentTargetMove = null;\r
    let currentLeaveHandler = null;\r
    let isAnimatingToTarget = false;\r
    let resumeTimeout = null;\r
\r
    const cleanupTarget = target => {\r
      if (currentTargetMove) {\r
        target.removeEventListener('mousemove', currentTargetMove);\r
      }\r
      if (currentLeaveHandler) {\r
        target.removeEventListener('mouseleave', currentLeaveHandler);\r
      }\r
      currentTargetMove = null;\r
      currentLeaveHandler = null;\r
    };\r
\r
    gsap.set(cursor, {\r
      xPercent: -50,\r
      yPercent: -50,\r
      x: window.innerWidth / 2,\r
      y: window.innerHeight / 2\r
    });\r
\r
    const createSpinTimeline = () => {\r
      if (spinTl.current) {\r
        spinTl.current.kill();\r
      }\r
      spinTl.current = gsap\r
        .timeline({ repeat: -1 })\r
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
    };\r
\r
    createSpinTimeline();\r
\r
    const moveHandler = e => moveCursor(e.clientX, e.clientY);\r
    window.addEventListener('mousemove', moveHandler);\r
\r
    const scrollHandler = () => {\r
      if (!activeTarget || !cursorRef.current) return;\r
\r
      const mouseX = gsap.getProperty(cursorRef.current, 'x');\r
      const mouseY = gsap.getProperty(cursorRef.current, 'y');\r
\r
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);\r
      const isStillOverTarget =\r
        elementUnderMouse &&\r
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);\r
\r
      if (!isStillOverTarget) {\r
        if (currentLeaveHandler) {\r
          currentLeaveHandler();\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('scroll', scrollHandler, { passive: true });\r
\r
    //---------------------------------------------------------------\r
    // This code for onclick animation\r
\r
    window.addEventListener('mousemove', moveHandler);\r
    const mouseDownHandler = () => {\r
      if (!dotRef.current) return;\r
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });\r
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });\r
    };\r
\r
    // Animate it back to its original size\r
    const mouseUpHandler = () => {\r
      if (!dotRef.current) return;\r
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });\r
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });\r
    };\r
\r
    window.addEventListener('mousedown', mouseDownHandler);\r
    window.addEventListener('mouseup', mouseUpHandler);\r
\r
    //----------------------------------------------------------------\r
    const enterHandler = e => {\r
      const directTarget = e.target;\r
\r
      const allTargets = [];\r
      let current = directTarget;\r
      while (current && current !== document.body) {\r
        if (current.matches(targetSelector)) {\r
          allTargets.push(current);\r
        }\r
        current = current.parentElement;\r
      }\r
\r
      const target = allTargets[0] || null;\r
      if (!target || !cursorRef.current || !cornersRef.current) return;\r
\r
      if (activeTarget === target) return;\r
\r
      if (activeTarget) {\r
        cleanupTarget(activeTarget);\r
      }\r
\r
      if (resumeTimeout) {\r
        clearTimeout(resumeTimeout);\r
        resumeTimeout = null;\r
      }\r
\r
      activeTarget = target;\r
      const corners = Array.from(cornersRef.current);\r
      corners.forEach(corner => {\r
        gsap.killTweensOf(corner);\r
      });\r
\r
      gsap.killTweensOf(cursorRef.current, 'rotation');\r
      spinTl.current?.pause();\r
\r
      gsap.set(cursorRef.current, { rotation: 0 });\r
\r
      const updateCorners = (mouseX, mouseY) => {\r
        const rect = target.getBoundingClientRect();\r
        const cursorRect = cursorRef.current.getBoundingClientRect();\r
\r
        const cursorCenterX = cursorRect.left + cursorRect.width / 2;\r
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;\r
\r
        const [tlc, trc, brc, blc] = Array.from(cornersRef.current);\r
\r
        const { borderWidth, cornerSize, parallaxStrength } = constants;\r
\r
        let tlOffset = {\r
          x: rect.left - cursorCenterX - borderWidth,\r
          y: rect.top - cursorCenterY - borderWidth\r
        };\r
        let trOffset = {\r
          x: rect.right - cursorCenterX + borderWidth - cornerSize,\r
          y: rect.top - cursorCenterY - borderWidth\r
        };\r
        let brOffset = {\r
          x: rect.right - cursorCenterX + borderWidth - cornerSize,\r
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize\r
        };\r
        let blOffset = {\r
          x: rect.left - cursorCenterX - borderWidth,\r
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize\r
        };\r
\r
        if (mouseX !== undefined && mouseY !== undefined) {\r
          const targetCenterX = rect.left + rect.width / 2;\r
          const targetCenterY = rect.top + rect.height / 2;\r
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;\r
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;\r
\r
          tlOffset.x += mouseOffsetX;\r
          tlOffset.y += mouseOffsetY;\r
          trOffset.x += mouseOffsetX;\r
          trOffset.y += mouseOffsetY;\r
          brOffset.x += mouseOffsetX;\r
          brOffset.y += mouseOffsetY;\r
          blOffset.x += mouseOffsetX;\r
          blOffset.y += mouseOffsetY;\r
        }\r
\r
        const tl = gsap.timeline();\r
        const corners = [tlc, trc, brc, blc];\r
        const offsets = [tlOffset, trOffset, brOffset, blOffset];\r
\r
        corners.forEach((corner, index) => {\r
          tl.to(\r
            corner,\r
            {\r
              x: offsets[index].x,\r
              y: offsets[index].y,\r
              duration: 0.2,\r
              ease: 'power2.out'\r
            },\r
            0\r
          );\r
        });\r
      };\r
\r
      isAnimatingToTarget = true;\r
      updateCorners();\r
\r
      setTimeout(() => {\r
        isAnimatingToTarget = false;\r
      }, 1);\r
\r
      let moveThrottle = null;\r
      const targetMove = ev => {\r
        if (moveThrottle || isAnimatingToTarget) return;\r
        moveThrottle = requestAnimationFrame(() => {\r
          const mouseEvent = ev;\r
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);\r
          moveThrottle = null;\r
        });\r
      };\r
\r
      const leaveHandler = () => {\r
        activeTarget = null;\r
        isAnimatingToTarget = false;\r
\r
        if (cornersRef.current) {\r
          const corners = Array.from(cornersRef.current);\r
          gsap.killTweensOf(corners);\r
\r
          const { cornerSize } = constants;\r
          const positions = [\r
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },\r
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },\r
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },\r
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }\r
          ];\r
\r
          const tl = gsap.timeline();\r
          corners.forEach((corner, index) => {\r
            tl.to(\r
              corner,\r
              {\r
                x: positions[index].x,\r
                y: positions[index].y,\r
                duration: 0.3,\r
                ease: 'power3.out'\r
              },\r
              0\r
            );\r
          });\r
        }\r
\r
        resumeTimeout = setTimeout(() => {\r
          if (!activeTarget && cursorRef.current && spinTl.current) {\r
            const currentRotation = gsap.getProperty(cursorRef.current, 'rotation');\r
            const normalizedRotation = currentRotation % 360;\r
\r
            spinTl.current.kill();\r
            spinTl.current = gsap\r
              .timeline({ repeat: -1 })\r
              .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
\r
            gsap.to(cursorRef.current, {\r
              rotation: normalizedRotation + 360,\r
              duration: spinDuration * (1 - normalizedRotation / 360),\r
              ease: 'none',\r
              onComplete: () => {\r
                spinTl.current?.restart();\r
              }\r
            });\r
          }\r
          resumeTimeout = null;\r
        }, 50);\r
\r
        cleanupTarget(target);\r
      };\r
\r
      currentTargetMove = targetMove;\r
      currentLeaveHandler = leaveHandler;\r
\r
      target.addEventListener('mousemove', targetMove);\r
      target.addEventListener('mouseleave', leaveHandler);\r
    };\r
\r
    window.addEventListener('mouseover', enterHandler, { passive: true });\r
\r
    return () => {\r
      window.removeEventListener('mousemove', moveHandler);\r
      window.removeEventListener('mouseover', enterHandler);\r
      window.removeEventListener('scroll', scrollHandler);\r
\r
      if (activeTarget) {\r
        cleanupTarget(activeTarget);\r
      }\r
\r
      console.log('Cleaning up TargetCursor');\r
\r
      spinTl.current?.kill();\r
      document.body.style.cursor = originalCursor;\r
    };\r
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);\r
\r
  useEffect(() => {\r
    if (!cursorRef.current || !spinTl.current) return;\r
\r
    if (spinTl.current.isActive()) {\r
      spinTl.current.kill();\r
      spinTl.current = gsap\r
        .timeline({ repeat: -1 })\r
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
    }\r
  }, [spinDuration]);\r
\r
  return (\r
    <div ref={cursorRef} className="target-cursor-wrapper">\r
      <div ref={dotRef} className="target-cursor-dot" />\r
      <div className="target-cursor-corner corner-tl" />\r
      <div className="target-cursor-corner corner-tr" />\r
      <div className="target-cursor-corner corner-br" />\r
      <div className="target-cursor-corner corner-bl" />\r
    </div>\r
  );\r
};\r
\r
export default TargetCursor;\r
`,Cr=`.target-cursor-wrapper {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  width: 0;\r
  height: 0;\r
  pointer-events: none;\r
  z-index: 9999;\r
  mix-blend-mode: difference;\r
  transform: translate(-50%, -50%);\r
}\r
\r
.target-cursor-dot {\r
  position: absolute;\r
  left: 50%;\r
  top: 50%;\r
  width: 4px;\r
  height: 4px;\r
  background: #fff;\r
  border-radius: 50%;\r
  transform: translate(-50%, -50%);\r
  will-change: transform;\r
}\r
\r
.target-cursor-corner {\r
  position: absolute;\r
  left: 50%;\r
  top: 50%;\r
  width: 12px;\r
  height: 12px;\r
  border: 3px solid #fff;\r
  will-change: transform;\r
}\r
\r
.corner-tl {\r
  transform: translate(-150%, -150%);\r
  border-right: none;\r
  border-bottom: none;\r
}\r
\r
.corner-tr {\r
  transform: translate(50%, -150%);\r
  border-left: none;\r
  border-bottom: none;\r
}\r
\r
.corner-br {\r
  transform: translate(50%, 50%);\r
  border-left: none;\r
  border-top: none;\r
}\r
\r
.corner-bl {\r
  transform: translate(-150%, 50%);\r
  border-right: none;\r
  border-top: none;\r
}\r
`,Er=`import { useEffect, useRef, useCallback, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
\r
const TargetCursor = ({ targetSelector = '.cursor-target', spinDuration = 2, hideDefaultCursor = true }) => {\r
  const cursorRef = useRef(null);\r
  const cornersRef = useRef(null);\r
  const spinTl = useRef(null);\r
  const dotRef = useRef(null);\r
  const constants = useMemo(\r
    () => ({\r
      borderWidth: 3,\r
      cornerSize: 12,\r
      parallaxStrength: 0.00005\r
    }),\r
    []\r
  );\r
\r
  const moveCursor = useCallback((x, y) => {\r
    if (!cursorRef.current) return;\r
    gsap.to(cursorRef.current, {\r
      x,\r
      y,\r
      duration: 0.1,\r
      ease: 'power3.out'\r
    });\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!cursorRef.current) return;\r
\r
    const originalCursor = document.body.style.cursor;\r
    if (hideDefaultCursor) {\r
      document.body.style.cursor = 'none';\r
    }\r
\r
    const cursor = cursorRef.current;\r
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');\r
\r
    let activeTarget = null;\r
    let currentTargetMove = null;\r
    let currentLeaveHandler = null;\r
    let isAnimatingToTarget = false;\r
    let resumeTimeout = null;\r
\r
    const cleanupTarget = target => {\r
      if (currentTargetMove) {\r
        target.removeEventListener('mousemove', currentTargetMove);\r
      }\r
      if (currentLeaveHandler) {\r
        target.removeEventListener('mouseleave', currentLeaveHandler);\r
      }\r
      currentTargetMove = null;\r
      currentLeaveHandler = null;\r
    };\r
\r
    gsap.set(cursor, {\r
      xPercent: -50,\r
      yPercent: -50,\r
      x: window.innerWidth / 2,\r
      y: window.innerHeight / 2\r
    });\r
\r
    const createSpinTimeline = () => {\r
      if (spinTl.current) {\r
        spinTl.current.kill();\r
      }\r
      spinTl.current = gsap\r
        .timeline({ repeat: -1 })\r
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
    };\r
\r
    createSpinTimeline();\r
\r
    const moveHandler = e => moveCursor(e.clientX, e.clientY);\r
    window.addEventListener('mousemove', moveHandler);\r
\r
    const scrollHandler = () => {\r
      if (!activeTarget || !cursorRef.current) return;\r
\r
      const mouseX = gsap.getProperty(cursorRef.current, 'x');\r
      const mouseY = gsap.getProperty(cursorRef.current, 'y');\r
\r
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);\r
      const isStillOverTarget =\r
        elementUnderMouse &&\r
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);\r
\r
      if (!isStillOverTarget) {\r
        if (currentLeaveHandler) {\r
          currentLeaveHandler();\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('scroll', scrollHandler, { passive: true });\r
\r
    window.addEventListener('mousemove', moveHandler);\r
    const mouseDownHandler = () => {\r
      if (!dotRef.current) return;\r
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });\r
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });\r
    };\r
\r
    const mouseUpHandler = () => {\r
      if (!dotRef.current) return;\r
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });\r
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });\r
    };\r
\r
    window.addEventListener('mousedown', mouseDownHandler);\r
    window.addEventListener('mouseup', mouseUpHandler);\r
\r
    const enterHandler = e => {\r
      const directTarget = e.target;\r
\r
      const allTargets = [];\r
      let current = directTarget;\r
      while (current && current !== document.body) {\r
        if (current.matches(targetSelector)) {\r
          allTargets.push(current);\r
        }\r
        current = current.parentElement;\r
      }\r
\r
      const target = allTargets[0] || null;\r
      if (!target || !cursorRef.current || !cornersRef.current) return;\r
\r
      if (activeTarget === target) return;\r
\r
      if (activeTarget) {\r
        cleanupTarget(activeTarget);\r
      }\r
\r
      if (resumeTimeout) {\r
        clearTimeout(resumeTimeout);\r
        resumeTimeout = null;\r
      }\r
\r
      activeTarget = target;\r
      const corners = Array.from(cornersRef.current);\r
      corners.forEach(corner => {\r
        gsap.killTweensOf(corner);\r
      });\r
      gsap.killTweensOf(cursorRef.current, 'rotation');\r
      spinTl.current?.pause();\r
\r
      gsap.set(cursorRef.current, { rotation: 0 });\r
\r
      const updateCorners = (mouseX, mouseY) => {\r
        const rect = target.getBoundingClientRect();\r
        const cursorRect = cursorRef.current.getBoundingClientRect();\r
\r
        const cursorCenterX = cursorRect.left + cursorRect.width / 2;\r
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;\r
\r
        const [tlc, trc, brc, blc] = Array.from(cornersRef.current);\r
\r
        const { borderWidth, cornerSize, parallaxStrength } = constants;\r
\r
        let tlOffset = {\r
          x: rect.left - cursorCenterX - borderWidth,\r
          y: rect.top - cursorCenterY - borderWidth\r
        };\r
        let trOffset = {\r
          x: rect.right - cursorCenterX + borderWidth - cornerSize,\r
          y: rect.top - cursorCenterY - borderWidth\r
        };\r
        let brOffset = {\r
          x: rect.right - cursorCenterX + borderWidth - cornerSize,\r
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize\r
        };\r
        let blOffset = {\r
          x: rect.left - cursorCenterX - borderWidth,\r
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize\r
        };\r
\r
        if (mouseX !== undefined && mouseY !== undefined) {\r
          const targetCenterX = rect.left + rect.width / 2;\r
          const targetCenterY = rect.top + rect.height / 2;\r
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;\r
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;\r
\r
          tlOffset.x += mouseOffsetX;\r
          tlOffset.y += mouseOffsetY;\r
          trOffset.x += mouseOffsetX;\r
          trOffset.y += mouseOffsetY;\r
          brOffset.x += mouseOffsetX;\r
          brOffset.y += mouseOffsetY;\r
          blOffset.x += mouseOffsetX;\r
          blOffset.y += mouseOffsetY;\r
        }\r
\r
        const tl = gsap.timeline();\r
        const corners = [tlc, trc, brc, blc];\r
        const offsets = [tlOffset, trOffset, brOffset, blOffset];\r
\r
        corners.forEach((corner, index) => {\r
          tl.to(\r
            corner,\r
            {\r
              x: offsets[index].x,\r
              y: offsets[index].y,\r
              duration: 0.2,\r
              ease: 'power2.out'\r
            },\r
            0\r
          );\r
        });\r
      };\r
\r
      isAnimatingToTarget = true;\r
      updateCorners();\r
\r
      setTimeout(() => {\r
        isAnimatingToTarget = false;\r
      }, 1);\r
\r
      let moveThrottle = null;\r
      const targetMove = ev => {\r
        if (moveThrottle || isAnimatingToTarget) return;\r
        moveThrottle = requestAnimationFrame(() => {\r
          const mouseEvent = ev;\r
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);\r
          moveThrottle = null;\r
        });\r
      };\r
\r
      const leaveHandler = () => {\r
        activeTarget = null;\r
        isAnimatingToTarget = false;\r
\r
        if (cornersRef.current) {\r
          const corners = Array.from(cornersRef.current);\r
          gsap.killTweensOf(corners);\r
\r
          const { cornerSize } = constants;\r
          const positions = [\r
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },\r
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },\r
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },\r
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }\r
          ];\r
\r
          const tl = gsap.timeline();\r
          corners.forEach((corner, index) => {\r
            tl.to(\r
              corner,\r
              {\r
                x: positions[index].x,\r
                y: positions[index].y,\r
                duration: 0.3,\r
                ease: 'power3.out'\r
              },\r
              0\r
            );\r
          });\r
        }\r
\r
        resumeTimeout = setTimeout(() => {\r
          if (!activeTarget && cursorRef.current && spinTl.current) {\r
            const currentRotation = gsap.getProperty(cursorRef.current, 'rotation');\r
            const normalizedRotation = currentRotation % 360;\r
\r
            spinTl.current.kill();\r
            spinTl.current = gsap\r
              .timeline({ repeat: -1 })\r
              .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
\r
            gsap.to(cursorRef.current, {\r
              rotation: normalizedRotation + 360,\r
              duration: spinDuration * (1 - normalizedRotation / 360),\r
              ease: 'none',\r
              onComplete: () => {\r
                spinTl.current?.restart();\r
              }\r
            });\r
          }\r
          resumeTimeout = null;\r
        }, 50);\r
\r
        cleanupTarget(target);\r
      };\r
\r
      currentTargetMove = targetMove;\r
      currentLeaveHandler = leaveHandler;\r
\r
      target.addEventListener('mousemove', targetMove);\r
      target.addEventListener('mouseleave', leaveHandler);\r
    };\r
\r
    window.addEventListener('mouseover', enterHandler, { passive: true });\r
\r
    return () => {\r
      window.removeEventListener('mousemove', moveHandler);\r
      window.removeEventListener('mouseover', enterHandler);\r
      window.removeEventListener('scroll', scrollHandler);\r
\r
      if (activeTarget) {\r
        cleanupTarget(activeTarget);\r
      }\r
\r
      spinTl.current?.kill();\r
      document.body.style.cursor = originalCursor;\r
    };\r
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);\r
\r
  useEffect(() => {\r
    if (!cursorRef.current || !spinTl.current) return;\r
\r
    if (spinTl.current.isActive()) {\r
      spinTl.current.kill();\r
      spinTl.current = gsap\r
        .timeline({ repeat: -1 })\r
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
    }\r
  }, [spinDuration]);\r
\r
  return (\r
    <div\r
      ref={cursorRef}\r
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"\r
      style={{ willChange: 'transform' }}\r
    >\r
      <div\r
        ref={dotRef}\r
        className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"\r
        style={{ willChange: 'transform' }}\r
      />\r
      <div\r
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0"\r
        style={{ willChange: 'transform' }}\r
      />\r
      <div\r
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0"\r
        style={{ willChange: 'transform' }}\r
      />\r
      <div\r
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 translate-y-1/2 border-l-0 border-t-0"\r
        style={{ willChange: 'transform' }}\r
      />\r
      <div\r
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0"\r
        style={{ willChange: 'transform' }}\r
      />\r
    </div>\r
  );\r
};\r
\r
export default TargetCursor;\r
`,Sr=`import React, { useEffect, useRef, useCallback, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import './TargetCursor.css';\r
\r
export interface TargetCursorProps {\r
  targetSelector?: string;\r
  spinDuration?: number;\r
  hideDefaultCursor?: boolean;\r
}\r
\r
const TargetCursor: React.FC<TargetCursorProps> = ({\r
  targetSelector = '.cursor-target',\r
  spinDuration = 2,\r
  hideDefaultCursor = true\r
}) => {\r
  const cursorRef = useRef<HTMLDivElement>(null);\r
  const cornersRef = useRef<NodeListOf<HTMLDivElement>>(null);\r
  const spinTl = useRef<gsap.core.Timeline>(null);\r
  const dotRef = useRef<HTMLDivElement>(null);\r
  const constants = useMemo(\r
    () => ({\r
      borderWidth: 3,\r
      cornerSize: 12,\r
      parallaxStrength: 0.00005\r
    }),\r
    []\r
  );\r
\r
  const moveCursor = useCallback((x: number, y: number) => {\r
    if (!cursorRef.current) return;\r
    gsap.to(cursorRef.current, {\r
      x,\r
      y,\r
      duration: 0.1,\r
      ease: 'power3.out'\r
    });\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!cursorRef.current) return;\r
\r
    const originalCursor = document.body.style.cursor;\r
    if (hideDefaultCursor) {\r
      document.body.style.cursor = 'none';\r
    }\r
\r
    const cursor = cursorRef.current;\r
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>('.target-cursor-corner');\r
\r
    let activeTarget: Element | null = null;\r
    let currentTargetMove: ((ev: Event) => void) | null = null;\r
    let currentLeaveHandler: (() => void) | null = null;\r
    let isAnimatingToTarget = false;\r
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;\r
\r
    const cleanupTarget = (target: Element) => {\r
      if (currentTargetMove) {\r
        target.removeEventListener('mousemove', currentTargetMove);\r
      }\r
      if (currentLeaveHandler) {\r
        target.removeEventListener('mouseleave', currentLeaveHandler);\r
      }\r
      currentTargetMove = null;\r
      currentLeaveHandler = null;\r
    };\r
\r
    gsap.set(cursor, {\r
      xPercent: -50,\r
      yPercent: -50,\r
      x: window.innerWidth / 2,\r
      y: window.innerHeight / 2\r
    });\r
\r
    const createSpinTimeline = () => {\r
      if (spinTl.current) {\r
        spinTl.current.kill();\r
      }\r
      spinTl.current = gsap\r
        .timeline({ repeat: -1 })\r
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
    };\r
\r
    createSpinTimeline();\r
\r
    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);\r
    window.addEventListener('mousemove', moveHandler);\r
\r
    const scrollHandler = () => {\r
      if (!activeTarget || !cursorRef.current) return;\r
\r
      const mouseX = gsap.getProperty(cursorRef.current, 'x') as number;\r
      const mouseY = gsap.getProperty(cursorRef.current, 'y') as number;\r
\r
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);\r
      const isStillOverTarget =\r
        elementUnderMouse &&\r
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);\r
\r
      if (!isStillOverTarget) {\r
        if (currentLeaveHandler) {\r
          currentLeaveHandler();\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('scroll', scrollHandler, { passive: true });\r
    window.addEventListener('mousemove', moveHandler);\r
\r
    const mouseDownHandler = (): void => {\r
      if (!dotRef.current) return;\r
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });\r
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });\r
    };\r
\r
    const mouseUpHandler = (): void => {\r
      if (!dotRef.current) return;\r
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });\r
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });\r
    };\r
\r
    window.addEventListener('mousedown', mouseDownHandler);\r
    window.addEventListener('mouseup', mouseUpHandler);\r
\r
    const enterHandler = (e: MouseEvent) => {\r
      const directTarget = e.target as Element;\r
\r
      const allTargets: Element[] = [];\r
      let current = directTarget;\r
      while (current && current !== document.body) {\r
        if (current.matches(targetSelector)) {\r
          allTargets.push(current);\r
        }\r
        current = current.parentElement!;\r
      }\r
\r
      const target = allTargets[0] || null;\r
      if (!target || !cursorRef.current || !cornersRef.current) return;\r
\r
      if (activeTarget === target) return;\r
\r
      if (activeTarget) {\r
        cleanupTarget(activeTarget);\r
      }\r
\r
      if (resumeTimeout) {\r
        clearTimeout(resumeTimeout);\r
        resumeTimeout = null;\r
      }\r
\r
      activeTarget = target;\r
      const corners = Array.from(cornersRef.current);\r
      corners.forEach(corner => {\r
        gsap.killTweensOf(corner);\r
      });\r
      gsap.killTweensOf(cursorRef.current, 'rotation');\r
      spinTl.current?.pause();\r
\r
      gsap.set(cursorRef.current, { rotation: 0 });\r
\r
      const updateCorners = (mouseX?: number, mouseY?: number) => {\r
        const rect = target.getBoundingClientRect();\r
        const cursorRect = cursorRef.current!.getBoundingClientRect();\r
\r
        const cursorCenterX = cursorRect.left + cursorRect.width / 2;\r
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;\r
\r
        const [tlc, trc, brc, blc] = Array.from(cornersRef.current!);\r
\r
        const { borderWidth, cornerSize, parallaxStrength } = constants;\r
\r
        let tlOffset = {\r
          x: rect.left - cursorCenterX - borderWidth,\r
          y: rect.top - cursorCenterY - borderWidth\r
        };\r
        let trOffset = {\r
          x: rect.right - cursorCenterX + borderWidth - cornerSize,\r
          y: rect.top - cursorCenterY - borderWidth\r
        };\r
        let brOffset = {\r
          x: rect.right - cursorCenterX + borderWidth - cornerSize,\r
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize\r
        };\r
        let blOffset = {\r
          x: rect.left - cursorCenterX - borderWidth,\r
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize\r
        };\r
\r
        if (mouseX !== undefined && mouseY !== undefined) {\r
          const targetCenterX = rect.left + rect.width / 2;\r
          const targetCenterY = rect.top + rect.height / 2;\r
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;\r
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;\r
\r
          tlOffset.x += mouseOffsetX;\r
          tlOffset.y += mouseOffsetY;\r
          trOffset.x += mouseOffsetX;\r
          trOffset.y += mouseOffsetY;\r
          brOffset.x += mouseOffsetX;\r
          brOffset.y += mouseOffsetY;\r
          blOffset.x += mouseOffsetX;\r
          blOffset.y += mouseOffsetY;\r
        }\r
\r
        const tl = gsap.timeline();\r
        const corners = [tlc, trc, brc, blc];\r
        const offsets = [tlOffset, trOffset, brOffset, blOffset];\r
\r
        corners.forEach((corner, index) => {\r
          tl.to(\r
            corner,\r
            {\r
              x: offsets[index].x,\r
              y: offsets[index].y,\r
              duration: 0.2,\r
              ease: 'power2.out'\r
            },\r
            0\r
          );\r
        });\r
      };\r
\r
      isAnimatingToTarget = true;\r
      updateCorners();\r
\r
      setTimeout(() => {\r
        isAnimatingToTarget = false;\r
      }, 1);\r
\r
      let moveThrottle: number | null = null;\r
      const targetMove = (ev: Event) => {\r
        if (moveThrottle || isAnimatingToTarget) return;\r
        moveThrottle = requestAnimationFrame(() => {\r
          const mouseEvent = ev as MouseEvent;\r
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);\r
          moveThrottle = null;\r
        });\r
      };\r
\r
      const leaveHandler = () => {\r
        activeTarget = null;\r
        isAnimatingToTarget = false;\r
\r
        if (cornersRef.current) {\r
          const corners = Array.from(cornersRef.current);\r
          gsap.killTweensOf(corners);\r
\r
          const { cornerSize } = constants;\r
          const positions = [\r
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },\r
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },\r
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },\r
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }\r
          ];\r
\r
          const tl = gsap.timeline();\r
          corners.forEach((corner, index) => {\r
            tl.to(\r
              corner,\r
              {\r
                x: positions[index].x,\r
                y: positions[index].y,\r
                duration: 0.3,\r
                ease: 'power3.out'\r
              },\r
              0\r
            );\r
          });\r
        }\r
\r
        resumeTimeout = setTimeout(() => {\r
          if (!activeTarget && cursorRef.current && spinTl.current) {\r
            const currentRotation = gsap.getProperty(cursorRef.current, 'rotation') as number;\r
            const normalizedRotation = currentRotation % 360;\r
\r
            spinTl.current.kill();\r
            spinTl.current = gsap\r
              .timeline({ repeat: -1 })\r
              .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
\r
            gsap.to(cursorRef.current, {\r
              rotation: normalizedRotation + 360,\r
              duration: spinDuration * (1 - normalizedRotation / 360),\r
              ease: 'none',\r
              onComplete: () => {\r
                spinTl.current?.restart();\r
              }\r
            });\r
          }\r
          resumeTimeout = null;\r
        }, 50);\r
\r
        cleanupTarget(target);\r
      };\r
\r
      currentTargetMove = targetMove;\r
      currentLeaveHandler = leaveHandler;\r
\r
      target.addEventListener('mousemove', targetMove);\r
      target.addEventListener('mouseleave', leaveHandler);\r
    };\r
\r
    window.addEventListener('mouseover', enterHandler, { passive: true });\r
\r
    return () => {\r
      window.removeEventListener('mousemove', moveHandler);\r
      window.removeEventListener('mouseover', enterHandler);\r
      window.removeEventListener('scroll', scrollHandler);\r
\r
      if (activeTarget) {\r
        cleanupTarget(activeTarget);\r
      }\r
\r
      spinTl.current?.kill();\r
      document.body.style.cursor = originalCursor;\r
    };\r
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);\r
\r
  useEffect(() => {\r
    if (!cursorRef.current || !spinTl.current) return;\r
\r
    if (spinTl.current.isActive()) {\r
      spinTl.current.kill();\r
      spinTl.current = gsap\r
        .timeline({ repeat: -1 })\r
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
    }\r
  }, [spinDuration]);\r
\r
  return (\r
    <div ref={cursorRef} className="target-cursor-wrapper">\r
      <div ref={dotRef} className="target-cursor-dot" />\r
      <div className="target-cursor-corner corner-tl" />\r
      <div className="target-cursor-corner corner-tr" />\r
      <div className="target-cursor-corner corner-br" />\r
      <div className="target-cursor-corner corner-bl" />\r
    </div>\r
  );\r
};\r
\r
export default TargetCursor;\r
`,Or=`import React, { useEffect, useRef, useCallback, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
\r
export interface TargetCursorProps {\r
  targetSelector?: string;\r
  spinDuration?: number;\r
  hideDefaultCursor?: boolean;\r
}\r
\r
const TargetCursor: React.FC<TargetCursorProps> = ({\r
  targetSelector = '.cursor-target',\r
  spinDuration = 2,\r
  hideDefaultCursor = true\r
}) => {\r
  const cursorRef = useRef<HTMLDivElement>(null);\r
  const cornersRef = useRef<NodeListOf<HTMLDivElement>>(null);\r
  const spinTl = useRef<gsap.core.Timeline>(null);\r
  const dotRef = useRef<HTMLDivElement>(null);\r
  const constants = useMemo(\r
    () => ({\r
      borderWidth: 3,\r
      cornerSize: 12,\r
      parallaxStrength: 0.00005\r
    }),\r
    []\r
  );\r
\r
  const moveCursor = useCallback((x: number, y: number) => {\r
    if (!cursorRef.current) return;\r
    gsap.to(cursorRef.current, {\r
      x,\r
      y,\r
      duration: 0.1,\r
      ease: 'power3.out'\r
    });\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!cursorRef.current) return;\r
\r
    const originalCursor = document.body.style.cursor;\r
    if (hideDefaultCursor) {\r
      document.body.style.cursor = 'none';\r
    }\r
\r
    const cursor = cursorRef.current;\r
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>('.target-cursor-corner');\r
\r
    let activeTarget: Element | null = null;\r
    let currentTargetMove: ((ev: Event) => void) | null = null;\r
    let currentLeaveHandler: (() => void) | null = null;\r
    let isAnimatingToTarget = false;\r
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;\r
\r
    const cleanupTarget = (target: Element) => {\r
      if (currentTargetMove) {\r
        target.removeEventListener('mousemove', currentTargetMove);\r
      }\r
      if (currentLeaveHandler) {\r
        target.removeEventListener('mouseleave', currentLeaveHandler);\r
      }\r
      currentTargetMove = null;\r
      currentLeaveHandler = null;\r
    };\r
\r
    gsap.set(cursor, {\r
      xPercent: -50,\r
      yPercent: -50,\r
      x: window.innerWidth / 2,\r
      y: window.innerHeight / 2\r
    });\r
\r
    const createSpinTimeline = () => {\r
      if (spinTl.current) {\r
        spinTl.current.kill();\r
      }\r
      spinTl.current = gsap\r
        .timeline({ repeat: -1 })\r
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
    };\r
\r
    createSpinTimeline();\r
\r
    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);\r
    window.addEventListener('mousemove', moveHandler);\r
\r
    const scrollHandler = () => {\r
      if (!activeTarget || !cursorRef.current) return;\r
\r
      const mouseX = gsap.getProperty(cursorRef.current, 'x') as number;\r
      const mouseY = gsap.getProperty(cursorRef.current, 'y') as number;\r
\r
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);\r
      const isStillOverTarget =\r
        elementUnderMouse &&\r
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);\r
\r
      if (!isStillOverTarget) {\r
        if (currentLeaveHandler) {\r
          currentLeaveHandler();\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('scroll', scrollHandler, { passive: true });\r
    window.addEventListener('mousemove', moveHandler);\r
\r
    const mouseDownHandler = (): void => {\r
      if (!dotRef.current) return;\r
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });\r
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });\r
    };\r
\r
    const mouseUpHandler = (): void => {\r
      if (!dotRef.current) return;\r
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });\r
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });\r
    };\r
\r
    window.addEventListener('mousedown', mouseDownHandler);\r
    window.addEventListener('mouseup', mouseUpHandler);\r
\r
    const enterHandler = (e: MouseEvent) => {\r
      const directTarget = e.target as Element;\r
\r
      const allTargets: Element[] = [];\r
      let current = directTarget;\r
      while (current && current !== document.body) {\r
        if (current.matches(targetSelector)) {\r
          allTargets.push(current);\r
        }\r
        current = current.parentElement!;\r
      }\r
\r
      const target = allTargets[0] || null;\r
      if (!target || !cursorRef.current || !cornersRef.current) return;\r
\r
      if (activeTarget === target) return;\r
\r
      if (activeTarget) {\r
        cleanupTarget(activeTarget);\r
      }\r
\r
      if (resumeTimeout) {\r
        clearTimeout(resumeTimeout);\r
        resumeTimeout = null;\r
      }\r
\r
      activeTarget = target;\r
      const corners = Array.from(cornersRef.current);\r
      corners.forEach(corner => {\r
        gsap.killTweensOf(corner);\r
      });\r
      gsap.killTweensOf(cursorRef.current, 'rotation');\r
      spinTl.current?.pause();\r
\r
      gsap.set(cursorRef.current, { rotation: 0 });\r
\r
      const updateCorners = (mouseX?: number, mouseY?: number) => {\r
        const rect = target.getBoundingClientRect();\r
        const cursorRect = cursorRef.current!.getBoundingClientRect();\r
\r
        const cursorCenterX = cursorRect.left + cursorRect.width / 2;\r
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;\r
\r
        const [tlc, trc, brc, blc] = Array.from(cornersRef.current!);\r
\r
        const { borderWidth, cornerSize, parallaxStrength } = constants;\r
\r
        let tlOffset = {\r
          x: rect.left - cursorCenterX - borderWidth,\r
          y: rect.top - cursorCenterY - borderWidth\r
        };\r
        let trOffset = {\r
          x: rect.right - cursorCenterX + borderWidth - cornerSize,\r
          y: rect.top - cursorCenterY - borderWidth\r
        };\r
        let brOffset = {\r
          x: rect.right - cursorCenterX + borderWidth - cornerSize,\r
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize\r
        };\r
        let blOffset = {\r
          x: rect.left - cursorCenterX - borderWidth,\r
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize\r
        };\r
\r
        if (mouseX !== undefined && mouseY !== undefined) {\r
          const targetCenterX = rect.left + rect.width / 2;\r
          const targetCenterY = rect.top + rect.height / 2;\r
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;\r
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;\r
\r
          tlOffset.x += mouseOffsetX;\r
          tlOffset.y += mouseOffsetY;\r
          trOffset.x += mouseOffsetX;\r
          trOffset.y += mouseOffsetY;\r
          brOffset.x += mouseOffsetX;\r
          brOffset.y += mouseOffsetY;\r
          blOffset.x += mouseOffsetX;\r
          blOffset.y += mouseOffsetY;\r
        }\r
\r
        const tl = gsap.timeline();\r
        const corners = [tlc, trc, brc, blc];\r
        const offsets = [tlOffset, trOffset, brOffset, blOffset];\r
\r
        corners.forEach((corner, index) => {\r
          tl.to(\r
            corner,\r
            {\r
              x: offsets[index].x,\r
              y: offsets[index].y,\r
              duration: 0.2,\r
              ease: 'power2.out'\r
            },\r
            0\r
          );\r
        });\r
      };\r
\r
      isAnimatingToTarget = true;\r
      updateCorners();\r
\r
      setTimeout(() => {\r
        isAnimatingToTarget = false;\r
      }, 1);\r
\r
      let moveThrottle: number | null = null;\r
      const targetMove = (ev: Event) => {\r
        if (moveThrottle || isAnimatingToTarget) return;\r
        moveThrottle = requestAnimationFrame(() => {\r
          const mouseEvent = ev as MouseEvent;\r
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);\r
          moveThrottle = null;\r
        });\r
      };\r
\r
      const leaveHandler = () => {\r
        activeTarget = null;\r
        isAnimatingToTarget = false;\r
\r
        if (cornersRef.current) {\r
          const corners = Array.from(cornersRef.current);\r
          gsap.killTweensOf(corners);\r
\r
          const { cornerSize } = constants;\r
          const positions = [\r
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },\r
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },\r
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },\r
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }\r
          ];\r
\r
          const tl = gsap.timeline();\r
          corners.forEach((corner, index) => {\r
            tl.to(\r
              corner,\r
              {\r
                x: positions[index].x,\r
                y: positions[index].y,\r
                duration: 0.3,\r
                ease: 'power3.out'\r
              },\r
              0\r
            );\r
          });\r
        }\r
\r
        resumeTimeout = setTimeout(() => {\r
          if (!activeTarget && cursorRef.current && spinTl.current) {\r
            const currentRotation = gsap.getProperty(cursorRef.current, 'rotation') as number;\r
            const normalizedRotation = currentRotation % 360;\r
\r
            spinTl.current.kill();\r
            spinTl.current = gsap\r
              .timeline({ repeat: -1 })\r
              .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
\r
            gsap.to(cursorRef.current, {\r
              rotation: normalizedRotation + 360,\r
              duration: spinDuration * (1 - normalizedRotation / 360),\r
              ease: 'none',\r
              onComplete: () => {\r
                spinTl.current?.restart();\r
              }\r
            });\r
          }\r
          resumeTimeout = null;\r
        }, 50);\r
\r
        cleanupTarget(target);\r
      };\r
\r
      currentTargetMove = targetMove;\r
      currentLeaveHandler = leaveHandler;\r
\r
      target.addEventListener('mousemove', targetMove);\r
      target.addEventListener('mouseleave', leaveHandler);\r
    };\r
\r
    window.addEventListener('mouseover', enterHandler, { passive: true });\r
\r
    return () => {\r
      window.removeEventListener('mousemove', moveHandler);\r
      window.removeEventListener('mouseover', enterHandler);\r
      window.removeEventListener('scroll', scrollHandler);\r
\r
      if (activeTarget) {\r
        cleanupTarget(activeTarget);\r
      }\r
\r
      spinTl.current?.kill();\r
      document.body.style.cursor = originalCursor;\r
    };\r
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);\r
\r
  useEffect(() => {\r
    if (!cursorRef.current || !spinTl.current) return;\r
\r
    if (spinTl.current.isActive()) {\r
      spinTl.current.kill();\r
      spinTl.current = gsap\r
        .timeline({ repeat: -1 })\r
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });\r
    }\r
  }, [spinDuration]);\r
\r
  return (\r
    <div\r
      ref={cursorRef}\r
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"\r
      style={{ willChange: 'transform' }}\r
    >\r
      <div\r
        ref={dotRef}\r
        className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"\r
        style={{ willChange: 'transform' }}\r
      />\r
      <div\r
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0"\r
        style={{ willChange: 'transform' }}\r
      />\r
      <div\r
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0"\r
        style={{ willChange: 'transform' }}\r
      />\r
      <div\r
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform translate-x-1/2 translate-y-1/2 border-l-0 border-t-0"\r
        style={{ willChange: 'transform' }}\r
      />\r
      <div\r
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-white transform -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0"\r
        style={{ willChange: 'transform' }}\r
      />\r
    </div>\r
  );\r
};\r
\r
export default TargetCursor;\r
`,Hr={dependencies:"gsap",usage:`import TargetCursor from './TargetCursor';

export default function App() {
  return (
    <div>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div>
  );
}`,code:yr,css:Cr,tailwind:Er,tsCode:Sr,tsTailwind:Or},Pr=()=>{const[d,n]=i.useState(2),[g,e]=i.useState(!0),u=[{name:"targetSelector",type:"string",default:'".cursor-target"',description:"CSS selector for elements that should trigger the cursor targeting effect"},{name:"spinDuration",type:"number",default:"2",description:"Duration in seconds for the cursor's spinning animation when not targeting"},{name:"hideDefaultCursor",type:"boolean",default:"true",description:"Whether to hide the default browser cursor when the component is active"}];return r.jsxs(r.Fragment,{children:[r.jsxs(fr,{children:[r.jsxs(mr,{children:[r.jsxs(dr,{position:"relative",className:"demo-container",flexDirection:"column",h:500,overflow:"hidden",children:[r.jsx(L,{fontSize:"clamp(2rem, 6vw, 3rem)",fontWeight:900,mb:6,color:"#271E37",children:"Hover Below."}),r.jsxs(Rr,{templateColumns:"repeat(3, 1fr)",gap:4,mb:2,children:[r.jsx(A,{children:r.jsx(L,{borderRadius:"15px",color:"#B19EEF",border:"1px dashed #B19EEF",fontWeight:900,fontSize:"2rem",className:"cursor-target",py:2,px:6,textAlign:"center",children:"THIS"})}),r.jsx(A,{children:r.jsx(L,{borderRadius:"15px",color:"#B19EEF",border:"1px dashed #B19EEF",fontWeight:900,fontSize:"2rem",className:"cursor-target",py:2,px:6,textAlign:"center",children:"FEELS"})}),r.jsx(A,{children:r.jsx(L,{borderRadius:"15px",color:"#B19EEF",border:"1px dashed #B19EEF",fontWeight:900,fontSize:"2rem",className:"cursor-target",py:2,px:6,textAlign:"center",children:"QUITE"})}),r.jsx(A,{colSpan:3,children:r.jsx(L,{textAlign:"center",borderRadius:"15px",color:"#B19EEF",border:"1px dashed #B19EEF",fontWeight:900,fontSize:"2rem",className:"cursor-target",py:2,px:6,children:"SNAPPY!"})})]})]}),r.jsxs(Tr,{children:[r.jsx(br,{title:"Spin Duration",min:.5,max:5,step:.1,value:d,valueUnit:"s",width:200,onChange:n}),r.jsx(wr,{title:"Hide Default Cursor",isChecked:g,onChange:e})]}),r.jsx(gr,{data:u}),r.jsx(hr,{dependencyList:["gsap"]})]}),r.jsx(pr,{children:r.jsx(vr,{codeObject:Hr})})]}),r.jsx(xr,{spinDuration:d,hideDefaultCursor:g})]})};export{Pr as default};
