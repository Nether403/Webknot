import{r as c,g as T,j as n,B as ae}from"./index-wsKSLPNH.js";import{T as se,P as ie,a as le,C as ue,b as fe}from"./PropTable-C4uPWs8h.js";import{C as de}from"./Customize-1m_ZNqR9.js";import{P as pe}from"./PreviewSelect-B8u33nUa.js";import{P as _}from"./PreviewSlider-m1G_aiYP.js";import{P as K}from"./PreviewSwitch-DqnF708j.js";import{D as me}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const be=`import { useCallback, useEffect, useRef } from 'react';\r
import gsap from 'gsap';\r
import './Cubes.css';\r
\r
const Cubes = ({\r
  gridSize = 10,\r
  cubeSize,\r
  maxAngle = 45,\r
  radius = 3,\r
  easing = 'power3.out',\r
  duration = { enter: 0.3, leave: 0.6 },\r
  cellGap,\r
  borderStyle = '1px solid #fff',\r
  faceColor = '#060010',\r
  shadow = false,\r
  autoAnimate = true,\r
  rippleOnClick = true,\r
  rippleColor = '#fff',\r
  rippleSpeed = 2\r
}) => {\r
  const sceneRef = useRef(null);\r
  const rafRef = useRef(null);\r
  const idleTimerRef = useRef(null);\r
  const userActiveRef = useRef(false);\r
  const simPosRef = useRef({ x: 0, y: 0 });\r
  const simTargetRef = useRef({ x: 0, y: 0 });\r
  const simRAFRef = useRef(null);\r
\r
  const colGap = typeof cellGap === 'number' ? \`\${cellGap}px\` : cellGap?.col !== undefined ? \`\${cellGap.col}px\` : '5%';\r
  const rowGap = typeof cellGap === 'number' ? \`\${cellGap}px\` : cellGap?.row !== undefined ? \`\${cellGap.row}px\` : '5%';\r
\r
  const enterDur = duration.enter;\r
  const leaveDur = duration.leave;\r
\r
  const tiltAt = useCallback(\r
    (rowCenter, colCenter) => {\r
      if (!sceneRef.current) return;\r
      sceneRef.current.querySelectorAll('.cube').forEach(cube => {\r
        const r = +cube.dataset.row;\r
        const c = +cube.dataset.col;\r
        const dist = Math.hypot(r - rowCenter, c - colCenter);\r
        if (dist <= radius) {\r
          const pct = 1 - dist / radius;\r
          const angle = pct * maxAngle;\r
          gsap.to(cube, {\r
            duration: enterDur,\r
            ease: easing,\r
            overwrite: true,\r
            rotateX: -angle,\r
            rotateY: angle\r
          });\r
        } else {\r
          gsap.to(cube, {\r
            duration: leaveDur,\r
            ease: 'power3.out',\r
            overwrite: true,\r
            rotateX: 0,\r
            rotateY: 0\r
          });\r
        }\r
      });\r
    },\r
    [radius, maxAngle, enterDur, leaveDur, easing]\r
  );\r
\r
  const onPointerMove = useCallback(\r
    e => {\r
      userActiveRef.current = true;\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
\r
      const rect = sceneRef.current.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
      const colCenter = (e.clientX - rect.left) / cellW;\r
      const rowCenter = (e.clientY - rect.top) / cellH;\r
\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));\r
\r
      idleTimerRef.current = setTimeout(() => {\r
        userActiveRef.current = false;\r
      }, 3000);\r
    },\r
    [gridSize, tiltAt]\r
  );\r
\r
  const resetAll = useCallback(() => {\r
    if (!sceneRef.current) return;\r
    sceneRef.current.querySelectorAll('.cube').forEach(cube =>\r
      gsap.to(cube, {\r
        duration: leaveDur,\r
        rotateX: 0,\r
        rotateY: 0,\r
        ease: 'power3.out'\r
      })\r
    );\r
  }, [leaveDur]);\r
\r
  const onTouchMove = useCallback(\r
    e => {\r
      e.preventDefault();\r
      userActiveRef.current = true;\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
\r
      const rect = sceneRef.current.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
\r
      const touch = e.touches[0];\r
      const colCenter = (touch.clientX - rect.left) / cellW;\r
      const rowCenter = (touch.clientY - rect.top) / cellH;\r
\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));\r
\r
      idleTimerRef.current = setTimeout(() => {\r
        userActiveRef.current = false;\r
      }, 3000);\r
    },\r
    [gridSize, tiltAt]\r
  );\r
\r
  const onTouchStart = useCallback(() => {\r
    userActiveRef.current = true;\r
  }, []);\r
\r
  const onTouchEnd = useCallback(() => {\r
    if (!sceneRef.current) return;\r
    resetAll();\r
  }, [resetAll]);\r
\r
  const onClick = useCallback(\r
    e => {\r
      if (!rippleOnClick || !sceneRef.current) return;\r
      const rect = sceneRef.current.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
\r
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);\r
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);\r
\r
      const colHit = Math.floor((clientX - rect.left) / cellW);\r
      const rowHit = Math.floor((clientY - rect.top) / cellH);\r
\r
      const baseRingDelay = 0.15;\r
      const baseAnimDur = 0.3;\r
      const baseHold = 0.6;\r
\r
      const spreadDelay = baseRingDelay / rippleSpeed;\r
      const animDuration = baseAnimDur / rippleSpeed;\r
      const holdTime = baseHold / rippleSpeed;\r
\r
      const rings = {};\r
      sceneRef.current.querySelectorAll('.cube').forEach(cube => {\r
        const r = +cube.dataset.row;\r
        const c = +cube.dataset.col;\r
        const dist = Math.hypot(r - rowHit, c - colHit);\r
        const ring = Math.round(dist);\r
        if (!rings[ring]) rings[ring] = [];\r
        rings[ring].push(cube);\r
      });\r
\r
      Object.keys(rings)\r
        .map(Number)\r
        .sort((a, b) => a - b)\r
        .forEach(ring => {\r
          const delay = ring * spreadDelay;\r
          const faces = rings[ring].flatMap(cube => Array.from(cube.querySelectorAll('.cube-face')));\r
\r
          gsap.to(faces, {\r
            backgroundColor: rippleColor,\r
            duration: animDuration,\r
            delay,\r
            ease: 'power3.out'\r
          });\r
          gsap.to(faces, {\r
            backgroundColor: faceColor,\r
            duration: animDuration,\r
            delay: delay + animDuration + holdTime,\r
            ease: 'power3.out'\r
          });\r
        });\r
    },\r
    [rippleOnClick, gridSize, faceColor, rippleColor, rippleSpeed]\r
  );\r
\r
  useEffect(() => {\r
    if (!autoAnimate || !sceneRef.current) return;\r
    simPosRef.current = {\r
      x: Math.random() * gridSize,\r
      y: Math.random() * gridSize\r
    };\r
    simTargetRef.current = {\r
      x: Math.random() * gridSize,\r
      y: Math.random() * gridSize\r
    };\r
    const speed = 0.02;\r
    const loop = () => {\r
      if (!userActiveRef.current) {\r
        const pos = simPosRef.current;\r
        const tgt = simTargetRef.current;\r
        pos.x += (tgt.x - pos.x) * speed;\r
        pos.y += (tgt.y - pos.y) * speed;\r
        tiltAt(pos.y, pos.x);\r
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {\r
          simTargetRef.current = {\r
            x: Math.random() * gridSize,\r
            y: Math.random() * gridSize\r
          };\r
        }\r
      }\r
      simRAFRef.current = requestAnimationFrame(loop);\r
    };\r
    simRAFRef.current = requestAnimationFrame(loop);\r
    return () => {\r
      if (simRAFRef.current != null) {\r
        cancelAnimationFrame(simRAFRef.current);\r
      }\r
    };\r
  }, [autoAnimate, gridSize, tiltAt]);\r
\r
  useEffect(() => {\r
    const el = sceneRef.current;\r
    if (!el) return;\r
\r
    el.addEventListener('pointermove', onPointerMove);\r
    el.addEventListener('pointerleave', resetAll);\r
    el.addEventListener('click', onClick);\r
\r
    el.addEventListener('touchmove', onTouchMove, { passive: false });\r
    el.addEventListener('touchstart', onTouchStart, { passive: true });\r
    el.addEventListener('touchend', onTouchEnd, { passive: true });\r
\r
    return () => {\r
      el.removeEventListener('pointermove', onPointerMove);\r
      el.removeEventListener('pointerleave', resetAll);\r
      el.removeEventListener('click', onClick);\r
\r
      el.removeEventListener('touchmove', onTouchMove);\r
      el.removeEventListener('touchstart', onTouchStart);\r
      el.removeEventListener('touchend', onTouchEnd);\r
\r
      rafRef.current != null && cancelAnimationFrame(rafRef.current);\r
      idleTimerRef.current && clearTimeout(idleTimerRef.current);\r
    };\r
  }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);\r
\r
  const cells = Array.from({ length: gridSize });\r
  const sceneStyle = {\r
    gridTemplateColumns: cubeSize ? \`repeat(\${gridSize}, \${cubeSize}px)\` : \`repeat(\${gridSize}, 1fr)\`,\r
    gridTemplateRows: cubeSize ? \`repeat(\${gridSize}, \${cubeSize}px)\` : \`repeat(\${gridSize}, 1fr)\`,\r
    columnGap: colGap,\r
    rowGap: rowGap\r
  };\r
  const wrapperStyle = {\r
    '--cube-face-border': borderStyle,\r
    '--cube-face-bg': faceColor,\r
    '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none',\r
    ...(cubeSize\r
      ? {\r
          width: \`\${gridSize * cubeSize}px\`,\r
          height: \`\${gridSize * cubeSize}px\`\r
        }\r
      : {})\r
  };\r
\r
  return (\r
    <div className="default-animation" style={wrapperStyle}>\r
      <div ref={sceneRef} className="default-animation--scene" style={sceneStyle}>\r
        {cells.map((_, r) =>\r
          cells.map((__, c) => (\r
            <div key={\`\${r}-\${c}\`} className="cube" data-row={r} data-col={c}>\r
              <div className="cube-face cube-face--top" />\r
              <div className="cube-face cube-face--bottom" />\r
              <div className="cube-face cube-face--left" />\r
              <div className="cube-face cube-face--right" />\r
              <div className="cube-face cube-face--front" />\r
              <div className="cube-face cube-face--back" />\r
            </div>\r
          ))\r
        )}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Cubes;\r
`,ge=`:root {\r
  --col-gap: 5%;\r
  --row-gap: 5%;\r
  --cube-perspective: 99999999px;\r
  --cube-face-border: 1px solid #fff;\r
  --cube-face-bg: #060010;\r
}\r
\r
.default-animation {\r
  position: relative;\r
  width: 50%;\r
  aspect-ratio: 1 / 1;\r
  height: auto;\r
}\r
\r
.default-animation--scene {\r
  display: grid;\r
  width: 100%;\r
  height: 100%;\r
  column-gap: var(--col-gap);\r
  row-gap: var(--row-gap);\r
  perspective: var(--cube-perspective);\r
  grid-auto-rows: 1fr;\r
}\r
\r
.cube {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  aspect-ratio: 1 / 1;\r
  transform-style: preserve-3d;\r
}\r
\r
.cube::before {\r
  content: '';\r
  position: absolute;\r
  top: -36px;\r
  right: -36px;\r
  bottom: -36px;\r
  left: -36px;\r
}\r
\r
.default-animation .cube-face {\r
  position: absolute;\r
  width: 100%;\r
  height: 100%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  background: var(--cube-face-bg);\r
  border: var(--cube-face-border);\r
  opacity: 1;\r
}\r
\r
.default-animation .cube-face--top {\r
  transform: translateY(-50%) rotateX(90deg);\r
}\r
\r
.default-animation .cube-face--bottom {\r
  transform: translateY(50%) rotateX(-90deg);\r
}\r
\r
.default-animation .cube-face--left {\r
  transform: translateX(-50%) rotateY(-90deg);\r
}\r
\r
.default-animation .cube-face--right {\r
  transform: translateX(50%) rotateY(90deg);\r
}\r
\r
.default-animation .cube-face--back,\r
.default-animation .cube-face--front {\r
  transform: rotateY(-90deg) translateX(50%) rotateY(90deg);\r
}\r
\r
@media (max-width: 768px) {\r
  .default-animation {\r
    width: 90%;\r
  }\r
}\r
`,he=`import { useCallback, useEffect, useRef } from 'react';\r
import gsap from 'gsap';\r
\r
const Cubes = ({\r
  gridSize = 10,\r
  cubeSize,\r
  maxAngle = 45,\r
  radius = 3,\r
  easing = 'power3.out',\r
  duration = { enter: 0.3, leave: 0.6 },\r
  cellGap,\r
  borderStyle = '1px solid #fff',\r
  faceColor = '#060010',\r
  shadow = false,\r
  autoAnimate = true,\r
  rippleOnClick = true,\r
  rippleColor = '#fff',\r
  rippleSpeed = 2\r
}) => {\r
  const sceneRef = useRef(null);\r
  const rafRef = useRef(null);\r
  const idleTimerRef = useRef(null);\r
  const userActiveRef = useRef(false);\r
  const simPosRef = useRef({ x: 0, y: 0 });\r
  const simTargetRef = useRef({ x: 0, y: 0 });\r
  const simRAFRef = useRef(null);\r
\r
  const colGap = typeof cellGap === 'number' ? \`\${cellGap}px\` : cellGap?.col !== undefined ? \`\${cellGap.col}px\` : '5%';\r
  const rowGap = typeof cellGap === 'number' ? \`\${cellGap}px\` : cellGap?.row !== undefined ? \`\${cellGap.row}px\` : '5%';\r
\r
  const enterDur = duration.enter;\r
  const leaveDur = duration.leave;\r
\r
  const tiltAt = useCallback(\r
    (rowCenter, colCenter) => {\r
      if (!sceneRef.current) return;\r
      sceneRef.current.querySelectorAll('.cube').forEach(cube => {\r
        const r = +cube.dataset.row;\r
        const c = +cube.dataset.col;\r
        const dist = Math.hypot(r - rowCenter, c - colCenter);\r
        if (dist <= radius) {\r
          const pct = 1 - dist / radius;\r
          const angle = pct * maxAngle;\r
          gsap.to(cube, {\r
            duration: enterDur,\r
            ease: easing,\r
            overwrite: true,\r
            rotateX: -angle,\r
            rotateY: angle\r
          });\r
        } else {\r
          gsap.to(cube, {\r
            duration: leaveDur,\r
            ease: 'power3.out',\r
            overwrite: true,\r
            rotateX: 0,\r
            rotateY: 0\r
          });\r
        }\r
      });\r
    },\r
    [radius, maxAngle, enterDur, leaveDur, easing]\r
  );\r
\r
  const onPointerMove = useCallback(\r
    e => {\r
      userActiveRef.current = true;\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
\r
      const rect = sceneRef.current.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
      const colCenter = (e.clientX - rect.left) / cellW;\r
      const rowCenter = (e.clientY - rect.top) / cellH;\r
\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));\r
\r
      idleTimerRef.current = setTimeout(() => {\r
        userActiveRef.current = false;\r
      }, 3000);\r
    },\r
    [gridSize, tiltAt]\r
  );\r
\r
  const resetAll = useCallback(() => {\r
    if (!sceneRef.current) return;\r
    sceneRef.current.querySelectorAll('.cube').forEach(cube =>\r
      gsap.to(cube, {\r
        duration: leaveDur,\r
        rotateX: 0,\r
        rotateY: 0,\r
        ease: 'power3.out'\r
      })\r
    );\r
  }, [leaveDur]);\r
\r
  const onTouchMove = useCallback(\r
    e => {\r
      e.preventDefault();\r
      userActiveRef.current = true;\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
\r
      const rect = sceneRef.current.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
\r
      const touch = e.touches[0];\r
      const colCenter = (touch.clientX - rect.left) / cellW;\r
      const rowCenter = (touch.clientY - rect.top) / cellH;\r
\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));\r
\r
      idleTimerRef.current = setTimeout(() => {\r
        userActiveRef.current = false;\r
      }, 3000);\r
    },\r
    [gridSize, tiltAt]\r
  );\r
\r
  const onTouchStart = useCallback(() => {\r
    userActiveRef.current = true;\r
  }, []);\r
\r
  const onTouchEnd = useCallback(() => {\r
    if (!sceneRef.current) return;\r
    resetAll();\r
  }, [resetAll]);\r
\r
  const onClick = useCallback(\r
    e => {\r
      if (!rippleOnClick || !sceneRef.current) return;\r
      const rect = sceneRef.current.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
\r
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);\r
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);\r
\r
      const colHit = Math.floor((clientX - rect.left) / cellW);\r
      const rowHit = Math.floor((clientY - rect.top) / cellH);\r
\r
      const baseRingDelay = 0.15;\r
      const baseAnimDur = 0.3;\r
      const baseHold = 0.6;\r
\r
      const spreadDelay = baseRingDelay / rippleSpeed;\r
      const animDuration = baseAnimDur / rippleSpeed;\r
      const holdTime = baseHold / rippleSpeed;\r
\r
      const rings = {};\r
      sceneRef.current.querySelectorAll('.cube').forEach(cube => {\r
        const r = +cube.dataset.row;\r
        const c = +cube.dataset.col;\r
        const dist = Math.hypot(r - rowHit, c - colHit);\r
        const ring = Math.round(dist);\r
        if (!rings[ring]) rings[ring] = [];\r
        rings[ring].push(cube);\r
      });\r
\r
      Object.keys(rings)\r
        .map(Number)\r
        .sort((a, b) => a - b)\r
        .forEach(ring => {\r
          const delay = ring * spreadDelay;\r
          const faces = rings[ring].flatMap(cube => Array.from(cube.querySelectorAll('.cube-face')));\r
\r
          gsap.to(faces, {\r
            backgroundColor: rippleColor,\r
            duration: animDuration,\r
            delay,\r
            ease: 'power3.out'\r
          });\r
          gsap.to(faces, {\r
            backgroundColor: faceColor,\r
            duration: animDuration,\r
            delay: delay + animDuration + holdTime,\r
            ease: 'power3.out'\r
          });\r
        });\r
    },\r
    [rippleOnClick, gridSize, faceColor, rippleColor, rippleSpeed]\r
  );\r
\r
  useEffect(() => {\r
    if (!autoAnimate || !sceneRef.current) return;\r
    simPosRef.current = {\r
      x: Math.random() * gridSize,\r
      y: Math.random() * gridSize\r
    };\r
    simTargetRef.current = {\r
      x: Math.random() * gridSize,\r
      y: Math.random() * gridSize\r
    };\r
    const speed = 0.02;\r
    const loop = () => {\r
      if (!userActiveRef.current) {\r
        const pos = simPosRef.current;\r
        const tgt = simTargetRef.current;\r
        pos.x += (tgt.x - pos.x) * speed;\r
        pos.y += (tgt.y - pos.y) * speed;\r
        tiltAt(pos.y, pos.x);\r
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {\r
          simTargetRef.current = {\r
            x: Math.random() * gridSize,\r
            y: Math.random() * gridSize\r
          };\r
        }\r
      }\r
      simRAFRef.current = requestAnimationFrame(loop);\r
    };\r
    simRAFRef.current = requestAnimationFrame(loop);\r
    return () => {\r
      if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current);\r
    };\r
  }, [autoAnimate, gridSize, tiltAt]);\r
\r
  useEffect(() => {\r
    const el = sceneRef.current;\r
    if (!el) return;\r
\r
    el.addEventListener('pointermove', onPointerMove);\r
    el.addEventListener('pointerleave', resetAll);\r
    el.addEventListener('click', onClick);\r
\r
    el.addEventListener('touchmove', onTouchMove, { passive: false });\r
    el.addEventListener('touchstart', onTouchStart, { passive: true });\r
    el.addEventListener('touchend', onTouchEnd, { passive: true });\r
\r
    return () => {\r
      el.removeEventListener('pointermove', onPointerMove);\r
      el.removeEventListener('pointerleave', resetAll);\r
      el.removeEventListener('click', onClick);\r
\r
      el.removeEventListener('touchmove', onTouchMove);\r
      el.removeEventListener('touchstart', onTouchStart);\r
      el.removeEventListener('touchend', onTouchEnd);\r
\r
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
    };\r
  }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);\r
\r
  const cells = Array.from({ length: gridSize });\r
  const sceneStyle = {\r
    gridTemplateColumns: cubeSize ? \`repeat(\${gridSize}, \${cubeSize}px)\` : \`repeat(\${gridSize}, 1fr)\`,\r
    gridTemplateRows: cubeSize ? \`repeat(\${gridSize}, \${cubeSize}px)\` : \`repeat(\${gridSize}, 1fr)\`,\r
    columnGap: colGap,\r
    rowGap: rowGap,\r
    perspective: '99999999px',\r
    gridAutoRows: '1fr'\r
  };\r
  const wrapperStyle = {\r
    '--cube-face-border': borderStyle,\r
    '--cube-face-bg': faceColor,\r
    '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none',\r
    ...(cubeSize\r
      ? {\r
          width: \`\${gridSize * cubeSize}px\`,\r
          height: \`\${gridSize * cubeSize}px\`\r
        }\r
      : {})\r
  };\r
\r
  return (\r
    <div className="relative w-1/2 max-md:w-11/12 aspect-square" style={wrapperStyle}>\r
      <div ref={sceneRef} className="grid w-full h-full" style={sceneStyle}>\r
        {cells.map((_, r) =>\r
          cells.map((__, c) => (\r
            <div\r
              key={\`\${r}-\${c}\`}\r
              className="cube relative w-full h-full aspect-square [transform-style:preserve-3d]"\r
              data-row={r}\r
              data-col={c}\r
            >\r
              <span className="absolute pointer-events-none -inset-9" />\r
\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'translateY(-50%) rotateX(90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'translateY(50%) rotateX(-90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'translateX(-50%) rotateY(-90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'translateX(50%) rotateY(90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'rotateY(-90deg) translateX(50%) rotateY(90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'rotateY(90deg) translateX(-50%) rotateY(-90deg)'\r
                }}\r
              />\r
            </div>\r
          ))\r
        )}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Cubes;\r
`,ve=`import React, { useCallback, useEffect, useRef } from 'react';\r
import gsap from 'gsap';\r
import './Cubes.css';\r
\r
interface Gap {\r
  row: number;\r
  col: number;\r
}\r
interface Duration {\r
  enter: number;\r
  leave: number;\r
}\r
\r
export interface CubesProps {\r
  gridSize?: number;\r
  cubeSize?: number;\r
  maxAngle?: number;\r
  radius?: number;\r
  easing?: gsap.EaseString;\r
  duration?: Duration;\r
  cellGap?: number | Gap;\r
  borderStyle?: string;\r
  faceColor?: string;\r
  shadow?: boolean | string;\r
  autoAnimate?: boolean;\r
  rippleOnClick?: boolean;\r
  rippleColor?: string;\r
  rippleSpeed?: number;\r
}\r
\r
const Cubes: React.FC<CubesProps> = ({\r
  gridSize = 10,\r
  cubeSize,\r
  maxAngle = 45,\r
  radius = 3,\r
  easing = 'power3.out',\r
  duration = { enter: 0.3, leave: 0.6 },\r
  cellGap,\r
  borderStyle = '1px solid #fff',\r
  faceColor = '#060010',\r
  shadow = false,\r
  autoAnimate = true,\r
  rippleOnClick = true,\r
  rippleColor = '#fff',\r
  rippleSpeed = 2\r
}) => {\r
  const sceneRef = useRef<HTMLDivElement | null>(null);\r
  const rafRef = useRef<number | null>(null);\r
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);\r
  const userActiveRef = useRef(false);\r
  const simPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });\r
  const simTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });\r
  const simRAFRef = useRef<number | null>(null);\r
\r
  const colGap =\r
    typeof cellGap === 'number'\r
      ? \`\${cellGap}px\`\r
      : (cellGap as Gap)?.col !== undefined\r
        ? \`\${(cellGap as Gap).col}px\`\r
        : '5%';\r
  const rowGap =\r
    typeof cellGap === 'number'\r
      ? \`\${cellGap}px\`\r
      : (cellGap as Gap)?.row !== undefined\r
        ? \`\${(cellGap as Gap).row}px\`\r
        : '5%';\r
\r
  const enterDur = duration.enter;\r
  const leaveDur = duration.leave;\r
\r
  const tiltAt = useCallback(\r
    (rowCenter: number, colCenter: number) => {\r
      if (!sceneRef.current) return;\r
      sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach(cube => {\r
        const r = +cube.dataset.row!;\r
        const c = +cube.dataset.col!;\r
        const dist = Math.hypot(r - rowCenter, c - colCenter);\r
        if (dist <= radius) {\r
          const pct = 1 - dist / radius;\r
          const angle = pct * maxAngle;\r
          gsap.to(cube, {\r
            duration: enterDur,\r
            ease: easing,\r
            overwrite: true,\r
            rotateX: -angle,\r
            rotateY: angle\r
          });\r
        } else {\r
          gsap.to(cube, {\r
            duration: leaveDur,\r
            ease: 'power3.out',\r
            overwrite: true,\r
            rotateX: 0,\r
            rotateY: 0\r
          });\r
        }\r
      });\r
    },\r
    [radius, maxAngle, enterDur, leaveDur, easing]\r
  );\r
\r
  const onPointerMove = useCallback(\r
    (e: PointerEvent) => {\r
      userActiveRef.current = true;\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
\r
      const rect = sceneRef.current!.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
      const colCenter = (e.clientX - rect.left) / cellW;\r
      const rowCenter = (e.clientY - rect.top) / cellH;\r
\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));\r
\r
      idleTimerRef.current = setTimeout(() => {\r
        userActiveRef.current = false;\r
      }, 3000);\r
    },\r
    [gridSize, tiltAt]\r
  );\r
\r
  const resetAll = useCallback(() => {\r
    if (!sceneRef.current) return;\r
    sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach(cube =>\r
      gsap.to(cube, {\r
        duration: leaveDur,\r
        rotateX: 0,\r
        rotateY: 0,\r
        ease: 'power3.out'\r
      })\r
    );\r
  }, [leaveDur]);\r
\r
  const onTouchMove = useCallback(\r
    (e: TouchEvent) => {\r
      e.preventDefault();\r
      userActiveRef.current = true;\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
\r
      const rect = sceneRef.current!.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
\r
      const touch = e.touches[0];\r
      const colCenter = (touch.clientX - rect.left) / cellW;\r
      const rowCenter = (touch.clientY - rect.top) / cellH;\r
\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));\r
\r
      idleTimerRef.current = setTimeout(() => {\r
        userActiveRef.current = false;\r
      }, 3000);\r
    },\r
    [gridSize, tiltAt]\r
  );\r
\r
  const onTouchStart = useCallback(() => {\r
    userActiveRef.current = true;\r
  }, []);\r
\r
  const onTouchEnd = useCallback(() => {\r
    if (!sceneRef.current) return;\r
    resetAll();\r
  }, [resetAll]);\r
\r
  const onClick = useCallback(\r
    (e: MouseEvent | TouchEvent) => {\r
      if (!rippleOnClick || !sceneRef.current) return;\r
      const rect = sceneRef.current.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
\r
      const clientX = (e as MouseEvent).clientX || ((e as TouchEvent).touches && (e as TouchEvent).touches[0].clientX);\r
      const clientY = (e as MouseEvent).clientY || ((e as TouchEvent).touches && (e as TouchEvent).touches[0].clientY);\r
\r
      const colHit = Math.floor((clientX - rect.left) / cellW);\r
      const rowHit = Math.floor((clientY - rect.top) / cellH);\r
\r
      const baseRingDelay = 0.15;\r
      const baseAnimDur = 0.3;\r
      const baseHold = 0.6;\r
\r
      const spreadDelay = baseRingDelay / rippleSpeed;\r
      const animDuration = baseAnimDur / rippleSpeed;\r
      const holdTime = baseHold / rippleSpeed;\r
\r
      const rings: Record<number, HTMLDivElement[]> = {};\r
      sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach(cube => {\r
        const r = +cube.dataset.row!;\r
        const c = +cube.dataset.col!;\r
        const dist = Math.hypot(r - rowHit, c - colHit);\r
        const ring = Math.round(dist);\r
        if (!rings[ring]) rings[ring] = [];\r
        rings[ring].push(cube);\r
      });\r
\r
      Object.keys(rings)\r
        .map(Number)\r
        .sort((a, b) => a - b)\r
        .forEach(ring => {\r
          const delay = ring * spreadDelay;\r
          const faces = rings[ring].flatMap(cube => Array.from(cube.querySelectorAll<HTMLElement>('.cube-face')));\r
\r
          gsap.to(faces, {\r
            backgroundColor: rippleColor,\r
            duration: animDuration,\r
            delay,\r
            ease: 'power3.out'\r
          });\r
          gsap.to(faces, {\r
            backgroundColor: faceColor,\r
            duration: animDuration,\r
            delay: delay + animDuration + holdTime,\r
            ease: 'power3.out'\r
          });\r
        });\r
    },\r
    [rippleOnClick, gridSize, faceColor, rippleColor, rippleSpeed]\r
  );\r
\r
  useEffect(() => {\r
    if (!autoAnimate || !sceneRef.current) return;\r
    simPosRef.current = {\r
      x: Math.random() * gridSize,\r
      y: Math.random() * gridSize\r
    };\r
    simTargetRef.current = {\r
      x: Math.random() * gridSize,\r
      y: Math.random() * gridSize\r
    };\r
    const speed = 0.02;\r
    const loop = () => {\r
      if (!userActiveRef.current) {\r
        const pos = simPosRef.current;\r
        const tgt = simTargetRef.current;\r
        pos.x += (tgt.x - pos.x) * speed;\r
        pos.y += (tgt.y - pos.y) * speed;\r
        tiltAt(pos.y, pos.x);\r
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {\r
          simTargetRef.current = {\r
            x: Math.random() * gridSize,\r
            y: Math.random() * gridSize\r
          };\r
        }\r
      }\r
      simRAFRef.current = requestAnimationFrame(loop);\r
    };\r
    simRAFRef.current = requestAnimationFrame(loop);\r
    return () => {\r
      if (simRAFRef.current != null) {\r
        cancelAnimationFrame(simRAFRef.current);\r
      }\r
    };\r
  }, [autoAnimate, gridSize, tiltAt]);\r
\r
  useEffect(() => {\r
    const el = sceneRef.current;\r
    if (!el) return;\r
    el.addEventListener('pointermove', onPointerMove);\r
    el.addEventListener('pointerleave', resetAll);\r
    el.addEventListener('click', onClick);\r
\r
    el.addEventListener('touchmove', onTouchMove, { passive: false });\r
    el.addEventListener('touchstart', onTouchStart, { passive: true });\r
    el.addEventListener('touchend', onTouchEnd, { passive: true });\r
\r
    return () => {\r
      el.removeEventListener('pointermove', onPointerMove);\r
      el.removeEventListener('pointerleave', resetAll);\r
      el.removeEventListener('click', onClick);\r
\r
      el.removeEventListener('touchmove', onTouchMove);\r
      el.removeEventListener('touchstart', onTouchStart);\r
      el.removeEventListener('touchend', onTouchEnd);\r
\r
      rafRef.current != null && cancelAnimationFrame(rafRef.current);\r
      idleTimerRef.current && clearTimeout(idleTimerRef.current);\r
    };\r
  }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);\r
\r
  const cells = Array.from({ length: gridSize });\r
  const sceneStyle: React.CSSProperties = {\r
    gridTemplateColumns: cubeSize ? \`repeat(\${gridSize}, \${cubeSize}px)\` : \`repeat(\${gridSize}, 1fr)\`,\r
    gridTemplateRows: cubeSize ? \`repeat(\${gridSize}, \${cubeSize}px)\` : \`repeat(\${gridSize}, 1fr)\`,\r
    columnGap: colGap,\r
    rowGap: rowGap\r
  };\r
  const wrapperStyle = {\r
    '--cube-face-border': borderStyle,\r
    '--cube-face-bg': faceColor,\r
    '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none',\r
    ...(cubeSize\r
      ? {\r
          width: \`\${gridSize * cubeSize}px\`,\r
          height: \`\${gridSize * cubeSize}px\`\r
        }\r
      : {})\r
  } as React.CSSProperties;\r
\r
  return (\r
    <div className="default-animation" style={wrapperStyle}>\r
      <div ref={sceneRef} className="default-animation--scene" style={sceneStyle}>\r
        {cells.map((_, r) =>\r
          cells.map((__, c) => (\r
            <div key={\`\${r}-\${c}\`} className="cube" data-row={r} data-col={c}>\r
              <div className="cube-face cube-face--top" />\r
              <div className="cube-face cube-face--bottom" />\r
              <div className="cube-face cube-face--left" />\r
              <div className="cube-face cube-face--right" />\r
              <div className="cube-face cube-face--front" />\r
              <div className="cube-face cube-face--back" />\r
            </div>\r
          ))\r
        )}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Cubes;\r
`,Re=`import React, { useCallback, useEffect, useRef } from 'react';\r
import gsap from 'gsap';\r
\r
interface Gap {\r
  row: number;\r
  col: number;\r
}\r
interface Duration {\r
  enter: number;\r
  leave: number;\r
}\r
\r
export interface CubesProps {\r
  gridSize?: number;\r
  cubeSize?: number;\r
  maxAngle?: number;\r
  radius?: number;\r
  easing?: gsap.EaseString;\r
  duration?: Duration;\r
  cellGap?: number | Gap;\r
  borderStyle?: string;\r
  faceColor?: string;\r
  shadow?: boolean | string;\r
  autoAnimate?: boolean;\r
  rippleOnClick?: boolean;\r
  rippleColor?: string;\r
  rippleSpeed?: number;\r
}\r
\r
const Cubes: React.FC<CubesProps> = ({\r
  gridSize = 10,\r
  cubeSize,\r
  maxAngle = 45,\r
  radius = 3,\r
  easing = 'power3.out',\r
  duration = { enter: 0.3, leave: 0.6 },\r
  cellGap,\r
  borderStyle = '1px solid #fff',\r
  faceColor = '#060010',\r
  shadow = false,\r
  autoAnimate = true,\r
  rippleOnClick = true,\r
  rippleColor = '#fff',\r
  rippleSpeed = 2\r
}) => {\r
  const sceneRef = useRef<HTMLDivElement | null>(null);\r
  const rafRef = useRef<number | null>(null);\r
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);\r
  const userActiveRef = useRef(false);\r
  const simPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });\r
  const simTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });\r
  const simRAFRef = useRef<number | null>(null);\r
\r
  const colGap =\r
    typeof cellGap === 'number'\r
      ? \`\${cellGap}px\`\r
      : (cellGap as Gap)?.col !== undefined\r
        ? \`\${(cellGap as Gap).col}px\`\r
        : '5%';\r
  const rowGap =\r
    typeof cellGap === 'number'\r
      ? \`\${cellGap}px\`\r
      : (cellGap as Gap)?.row !== undefined\r
        ? \`\${(cellGap as Gap).row}px\`\r
        : '5%';\r
\r
  const enterDur = duration.enter;\r
  const leaveDur = duration.leave;\r
\r
  const tiltAt = useCallback(\r
    (rowCenter: number, colCenter: number) => {\r
      if (!sceneRef.current) return;\r
      sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach(cube => {\r
        const r = +cube.dataset.row!;\r
        const c = +cube.dataset.col!;\r
        const dist = Math.hypot(r - rowCenter, c - colCenter);\r
        if (dist <= radius) {\r
          const pct = 1 - dist / radius;\r
          const angle = pct * maxAngle;\r
          gsap.to(cube, {\r
            duration: enterDur,\r
            ease: easing,\r
            overwrite: true,\r
            rotateX: -angle,\r
            rotateY: angle\r
          });\r
        } else {\r
          gsap.to(cube, {\r
            duration: leaveDur,\r
            ease: 'power3.out',\r
            overwrite: true,\r
            rotateX: 0,\r
            rotateY: 0\r
          });\r
        }\r
      });\r
    },\r
    [radius, maxAngle, enterDur, leaveDur, easing]\r
  );\r
\r
  const onPointerMove = useCallback(\r
    (e: PointerEvent) => {\r
      userActiveRef.current = true;\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
\r
      const rect = sceneRef.current!.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
      const colCenter = (e.clientX - rect.left) / cellW;\r
      const rowCenter = (e.clientY - rect.top) / cellH;\r
\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));\r
\r
      idleTimerRef.current = setTimeout(() => {\r
        userActiveRef.current = false;\r
      }, 3000);\r
    },\r
    [gridSize, tiltAt]\r
  );\r
\r
  const resetAll = useCallback(() => {\r
    if (!sceneRef.current) return;\r
    sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach(cube =>\r
      gsap.to(cube, {\r
        duration: leaveDur,\r
        rotateX: 0,\r
        rotateY: 0,\r
        ease: 'power3.out'\r
      })\r
    );\r
  }, [leaveDur]);\r
\r
  const onTouchMove = useCallback(\r
    (e: TouchEvent) => {\r
      e.preventDefault();\r
      userActiveRef.current = true;\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
\r
      const rect = sceneRef.current!.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
\r
      const touch = e.touches[0];\r
      const colCenter = (touch.clientX - rect.left) / cellW;\r
      const rowCenter = (touch.clientY - rect.top) / cellH;\r
\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));\r
\r
      idleTimerRef.current = setTimeout(() => {\r
        userActiveRef.current = false;\r
      }, 3000);\r
    },\r
    [gridSize, tiltAt]\r
  );\r
\r
  const onTouchStart = useCallback(() => {\r
    userActiveRef.current = true;\r
  }, []);\r
\r
  const onTouchEnd = useCallback(() => {\r
    if (!sceneRef.current) return;\r
    resetAll();\r
  }, [resetAll]);\r
\r
  const onClick = useCallback(\r
    (e: MouseEvent | TouchEvent) => {\r
      if (!rippleOnClick || !sceneRef.current) return;\r
      const rect = sceneRef.current.getBoundingClientRect();\r
      const cellW = rect.width / gridSize;\r
      const cellH = rect.height / gridSize;\r
\r
      const clientX = (e as MouseEvent).clientX || ((e as TouchEvent).touches && (e as TouchEvent).touches[0].clientX);\r
      const clientY = (e as MouseEvent).clientY || ((e as TouchEvent).touches && (e as TouchEvent).touches[0].clientY);\r
\r
      const colHit = Math.floor((clientX - rect.left) / cellW);\r
      const rowHit = Math.floor((clientY - rect.top) / cellH);\r
\r
      const baseRingDelay = 0.15;\r
      const baseAnimDur = 0.3;\r
      const baseHold = 0.6;\r
\r
      const spreadDelay = baseRingDelay / rippleSpeed;\r
      const animDuration = baseAnimDur / rippleSpeed;\r
      const holdTime = baseHold / rippleSpeed;\r
\r
      const rings: Record<number, HTMLDivElement[]> = {};\r
      sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach(cube => {\r
        const r = +cube.dataset.row!;\r
        const c = +cube.dataset.col!;\r
        const dist = Math.hypot(r - rowHit, c - colHit);\r
        const ring = Math.round(dist);\r
        if (!rings[ring]) rings[ring] = [];\r
        rings[ring].push(cube);\r
      });\r
\r
      Object.keys(rings)\r
        .map(Number)\r
        .sort((a, b) => a - b)\r
        .forEach(ring => {\r
          const delay = ring * spreadDelay;\r
          const faces = rings[ring].flatMap(cube => Array.from(cube.querySelectorAll<HTMLElement>('.cube-face')));\r
\r
          gsap.to(faces, {\r
            backgroundColor: rippleColor,\r
            duration: animDuration,\r
            delay,\r
            ease: 'power3.out'\r
          });\r
          gsap.to(faces, {\r
            backgroundColor: faceColor,\r
            duration: animDuration,\r
            delay: delay + animDuration + holdTime,\r
            ease: 'power3.out'\r
          });\r
        });\r
    },\r
    [rippleOnClick, gridSize, faceColor, rippleColor, rippleSpeed]\r
  );\r
\r
  useEffect(() => {\r
    if (!autoAnimate || !sceneRef.current) return;\r
    simPosRef.current = {\r
      x: Math.random() * gridSize,\r
      y: Math.random() * gridSize\r
    };\r
    simTargetRef.current = {\r
      x: Math.random() * gridSize,\r
      y: Math.random() * gridSize\r
    };\r
    const speed = 0.02;\r
    const loop = () => {\r
      if (!userActiveRef.current) {\r
        const pos = simPosRef.current;\r
        const tgt = simTargetRef.current;\r
        pos.x += (tgt.x - pos.x) * speed;\r
        pos.y += (tgt.y - pos.y) * speed;\r
        tiltAt(pos.y, pos.x);\r
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {\r
          simTargetRef.current = {\r
            x: Math.random() * gridSize,\r
            y: Math.random() * gridSize\r
          };\r
        }\r
      }\r
      simRAFRef.current = requestAnimationFrame(loop);\r
    };\r
    simRAFRef.current = requestAnimationFrame(loop);\r
    return () => {\r
      if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current);\r
    };\r
  }, [autoAnimate, gridSize, tiltAt]);\r
\r
  useEffect(() => {\r
    const el = sceneRef.current;\r
    if (!el) return;\r
    el.addEventListener('pointermove', onPointerMove);\r
    el.addEventListener('pointerleave', resetAll);\r
    el.addEventListener('click', onClick);\r
\r
    el.addEventListener('touchmove', onTouchMove, { passive: false });\r
    el.addEventListener('touchstart', onTouchStart, { passive: true });\r
    el.addEventListener('touchend', onTouchEnd, { passive: true });\r
\r
    return () => {\r
      el.removeEventListener('pointermove', onPointerMove);\r
      el.removeEventListener('pointerleave', resetAll);\r
      el.removeEventListener('click', onClick);\r
\r
      el.removeEventListener('touchmove', onTouchMove);\r
      el.removeEventListener('touchstart', onTouchStart);\r
      el.removeEventListener('touchend', onTouchEnd);\r
\r
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);\r
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);\r
    };\r
  }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);\r
\r
  const cells = Array.from({ length: gridSize });\r
  const sceneStyle: React.CSSProperties = {\r
    gridTemplateColumns: cubeSize ? \`repeat(\${gridSize}, \${cubeSize}px)\` : \`repeat(\${gridSize}, 1fr)\`,\r
    gridTemplateRows: cubeSize ? \`repeat(\${gridSize}, \${cubeSize}px)\` : \`repeat(\${gridSize}, 1fr)\`,\r
    columnGap: colGap,\r
    rowGap: rowGap,\r
    perspective: '99999999px',\r
    gridAutoRows: '1fr'\r
  };\r
  const wrapperStyle = {\r
    '--cube-face-border': borderStyle,\r
    '--cube-face-bg': faceColor,\r
    '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none',\r
    ...(cubeSize\r
      ? {\r
          width: \`\${gridSize * cubeSize}px\`,\r
          height: \`\${gridSize * cubeSize}px\`\r
        }\r
      : {})\r
  } as React.CSSProperties;\r
\r
  return (\r
    <div className="relative w-1/2 max-md:w-11/12 aspect-square" style={wrapperStyle}>\r
      <div ref={sceneRef} className="grid w-full h-full" style={sceneStyle}>\r
        {cells.map((_, r) =>\r
          cells.map((__, c) => (\r
            <div\r
              key={\`\${r}-\${c}\`}\r
              className="cube relative w-full h-full aspect-square [transform-style:preserve-3d]"\r
              data-row={r}\r
              data-col={c}\r
            >\r
              <span className="absolute pointer-events-none -inset-9" />\r
\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'translateY(-50%) rotateX(90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'translateY(50%) rotateX(-90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'translateX(-50%) rotateY(-90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'translateX(50%) rotateY(90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'rotateY(-90deg) translateX(50%) rotateY(90deg)'\r
                }}\r
              />\r
              <div\r
                className="cube-face absolute inset-0 flex items-center justify-center"\r
                style={{\r
                  background: 'var(--cube-face-bg)',\r
                  border: 'var(--cube-face-border)',\r
                  boxShadow: 'var(--cube-face-shadow)',\r
                  transform: 'rotateY(90deg) translateX(-50%) rotateY(-90deg)'\r
                }}\r
              />\r
            </div>\r
          ))\r
        )}\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default Cubes;\r
`,ye={dependencies:"gsap",usage:`// CREDIT
// Component inspired from Can Tastemel's original work for the lambda.ai landing page
// https://cantastemel.com
  
import Cubes from './Cubes'

<div style={{ height: '600px', position: 'relative' }}>
  <Cubes 
    gridSize={8}
    maxAngle={60}
    radius={4}
    borderStyle="2px dashed #5227FF"
    faceColor="#1a1a2e"
    rippleColor="#ff6b6b"
    rippleSpeed={1.5}
    autoAnimate={true}
    rippleOnClick={true}
  />
</div>`,code:be,css:ge,tailwind:he,tsCode:ve,tsTailwind:Re},Se=({gridSize:r=10,cubeSize:l,maxAngle:y=45,radius:S=3,easing:C="power3.out",duration:E={enter:.3,leave:.6},cellGap:a,borderStyle:H="1px solid #fff",faceColor:b="#060010",shadow:k=!1,autoAnimate:w=!0,rippleOnClick:M=!0,rippleColor:z="#fff",rippleSpeed:g=2})=>{const i=c.useRef(null),u=c.useRef(null),f=c.useRef(null),h=c.useRef(!1),I=c.useRef({x:0,y:0}),Y=c.useRef({x:0,y:0}),D=c.useRef(null),Q=typeof a=="number"?`${a}px`:(a==null?void 0:a.col)!==void 0?`${a.col}px`:"5%",V=typeof a=="number"?`${a}px`:(a==null?void 0:a.row)!==void 0?`${a.row}px`:"5%",J=E.enter,L=E.leave,v=c.useCallback((e,t)=>{i.current&&i.current.querySelectorAll(".cube").forEach(o=>{const s=+o.dataset.row,d=+o.dataset.col,p=Math.hypot(s-e,d-t);if(p<=S){const F=(1-p/S)*y;T.to(o,{duration:J,ease:C,overwrite:!0,rotateX:-F,rotateY:F})}else T.to(o,{duration:L,ease:"power3.out",overwrite:!0,rotateX:0,rotateY:0})})},[S,y,J,L,C]),X=c.useCallback(e=>{h.current=!0,f.current&&clearTimeout(f.current);const t=i.current.getBoundingClientRect(),o=t.width/r,s=t.height/r,d=(e.clientX-t.left)/o,p=(e.clientY-t.top)/s;u.current&&cancelAnimationFrame(u.current),u.current=requestAnimationFrame(()=>v(p,d)),f.current=setTimeout(()=>{h.current=!1},3e3)},[r,v]),A=c.useCallback(()=>{i.current&&i.current.querySelectorAll(".cube").forEach(e=>T.to(e,{duration:L,rotateX:0,rotateY:0,ease:"power3.out"}))},[L]),N=c.useCallback(e=>{e.preventDefault(),h.current=!0,f.current&&clearTimeout(f.current);const t=i.current.getBoundingClientRect(),o=t.width/r,s=t.height/r,d=e.touches[0],p=(d.clientX-t.left)/o,$=(d.clientY-t.top)/s;u.current&&cancelAnimationFrame(u.current),u.current=requestAnimationFrame(()=>v($,p)),f.current=setTimeout(()=>{h.current=!1},3e3)},[r,v]),P=c.useCallback(()=>{h.current=!0},[]),j=c.useCallback(()=>{i.current&&A()},[A]),q=c.useCallback(e=>{if(!M||!i.current)return;const t=i.current.getBoundingClientRect(),o=t.width/r,s=t.height/r,d=e.clientX||e.touches&&e.touches[0].clientX,p=e.clientY||e.touches&&e.touches[0].clientY,$=Math.floor((d-t.left)/o),F=Math.floor((p-t.top)/s),re=.15,ne=.3,te=.6,ce=re/g,W=ne/g,oe=te/g,x={};i.current.querySelectorAll(".cube").forEach(m=>{const R=+m.dataset.row,G=+m.dataset.col,O=Math.hypot(R-F,G-$),B=Math.round(O);x[B]||(x[B]=[]),x[B].push(m)}),Object.keys(x).map(Number).sort((m,R)=>m-R).forEach(m=>{const R=m*ce,G=x[m].flatMap(O=>Array.from(O.querySelectorAll(".cube-face")));T.to(G,{backgroundColor:z,duration:W,delay:R,ease:"power3.out"}),T.to(G,{backgroundColor:b,duration:W,delay:R+W+oe,ease:"power3.out"})})},[M,r,b,z,g]);c.useEffect(()=>{if(!w||!i.current)return;I.current={x:Math.random()*r,y:Math.random()*r},Y.current={x:Math.random()*r,y:Math.random()*r};const e=.02,t=()=>{if(!h.current){const o=I.current,s=Y.current;o.x+=(s.x-o.x)*e,o.y+=(s.y-o.y)*e,v(o.y,o.x),Math.hypot(o.x-s.x,o.y-s.y)<.1&&(Y.current={x:Math.random()*r,y:Math.random()*r})}D.current=requestAnimationFrame(t)};return D.current=requestAnimationFrame(t),()=>{D.current!=null&&cancelAnimationFrame(D.current)}},[w,r,v]),c.useEffect(()=>{const e=i.current;if(e)return e.addEventListener("pointermove",X),e.addEventListener("pointerleave",A),e.addEventListener("click",q),e.addEventListener("touchmove",N,{passive:!1}),e.addEventListener("touchstart",P,{passive:!0}),e.addEventListener("touchend",j,{passive:!0}),()=>{e.removeEventListener("pointermove",X),e.removeEventListener("pointerleave",A),e.removeEventListener("click",q),e.removeEventListener("touchmove",N),e.removeEventListener("touchstart",P),e.removeEventListener("touchend",j),u.current!=null&&cancelAnimationFrame(u.current),f.current&&clearTimeout(f.current)}},[X,A,q,N,P,j]);const U=Array.from({length:r}),Z={gridTemplateColumns:l?`repeat(${r}, ${l}px)`:`repeat(${r}, 1fr)`,gridTemplateRows:l?`repeat(${r}, ${l}px)`:`repeat(${r}, 1fr)`,columnGap:Q,rowGap:V},ee={"--cube-face-border":H,"--cube-face-bg":b,"--cube-face-shadow":k===!0?"0 0 6px rgba(0,0,0,.5)":k||"none",...l?{width:`${r*l}px`,height:`${r*l}px`}:{}};return n.jsx("div",{className:"default-animation",style:ee,children:n.jsx("div",{ref:i,className:"default-animation--scene",style:Z,children:U.map((e,t)=>U.map((o,s)=>n.jsxs("div",{className:"cube","data-row":t,"data-col":s,children:[n.jsx("div",{className:"cube-face cube-face--top"}),n.jsx("div",{className:"cube-face cube-face--bottom"}),n.jsx("div",{className:"cube-face cube-face--left"}),n.jsx("div",{className:"cube-face cube-face--right"}),n.jsx("div",{className:"cube-face cube-face--front"}),n.jsx("div",{className:"cube-face cube-face--back"})]},`${t}-${s}`)))})})},De=()=>{const[r,l]=c.useState("2px dashed #B19EEF"),[y,S]=c.useState(10),[C,E]=c.useState(45),[a,H]=c.useState(3),[b,k]=c.useState(!0),[w,M]=c.useState(!0),z=[{value:"2px dotted #fff",label:"Dotted White"},{value:"2px dashed #B19EEF",label:"Dashed Purple"},{value:"3px solid #fff",label:"Solid White"}],g=[{name:"gridSize",type:"number",default:"10",description:"The size of the grid (number of cubes per row/column)"},{name:"cubeSize",type:"number",default:"undefined",description:"Fixed size of each cube in pixels. If not provided, cubes will be responsive"},{name:"maxAngle",type:"number",default:"45",description:"Maximum rotation angle for the tilt effect in degrees"},{name:"radius",type:"number",default:"3",description:"Radius of the tilt effect (how many cubes around the cursor are affected)"},{name:"easing",type:"string",default:"'power3.out'",description:"GSAP easing function for the tilt animation"},{name:"duration",type:"object",default:"{ enter: 0.3, leave: 0.6 }",description:"Animation duration for enter and leave effects"},{name:"cellGap",type:"number | object",default:"undefined",description:"Gap between cubes. Can be a number or object with row/col properties"},{name:"borderStyle",type:"string",default:"'1px solid #fff'",description:"CSS border style for cube faces"},{name:"faceColor",type:"string",default:"'#060010'",description:"Background color for cube faces"},{name:"shadow",type:"boolean | string",default:"false",description:"Shadow effect for cubes. Can be boolean or custom CSS shadow"},{name:"autoAnimate",type:"boolean",default:"true",description:"Whether to automatically animate when user is idle"},{name:"rippleOnClick",type:"boolean",default:"true",description:"Whether to show ripple effect on click"},{name:"rippleColor",type:"string",default:"'#fff'",description:"Color of the ripple effect"},{name:"rippleSpeed",type:"number",default:"2",description:"Speed multiplier for the ripple animation"}];return n.jsxs(se,{children:[n.jsxs(ie,{children:[n.jsx(ae,{position:"relative",className:"demo-container",h:650,overflow:"hidden",children:n.jsx(Se,{borderStyle:r,gridSize:y,maxAngle:C,radius:a,autoAnimate:b,rippleOnClick:w})}),n.jsxs(de,{children:[n.jsx(pe,{title:"Border Style",options:z,value:r,onChange:l,width:150}),n.jsx(_,{title:"Grid Size",min:6,max:12,step:1,value:y,onChange:S,width:150}),n.jsx(_,{title:"Max Angle",min:15,max:180,step:5,value:C,valueUnit:"°",onChange:E,width:150}),n.jsx(_,{title:"Radius",min:1,max:5,step:1,value:a,onChange:H,width:150}),n.jsx(K,{title:"Auto Animate",isChecked:b,onChange:k}),n.jsx(K,{title:"Ripple On Click",isChecked:w,onChange:M})]}),n.jsx(le,{data:g}),n.jsx(me,{dependencyList:["gsap"]})]}),n.jsx(ue,{children:n.jsx(fe,{codeObject:ye})})]})};export{De as default};
