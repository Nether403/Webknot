import{r as l,R as Nn,P as Un,M as Xn,j as e,B as Zn}from"./index-wsKSLPNH.js";import{T as jn,P as Gn,a as Vn,C as Dn,b as kn}from"./PropTable-C4uPWs8h.js";import{C as Qn}from"./Customize-1m_ZNqR9.js";import{D as Jn}from"./Dependencies-BHoMfJUj.js";import{P as d}from"./PreviewSlider-m1G_aiYP.js";import{P as Kn}from"./PreviewSelect-B8u33nUa.js";import{B as $n}from"./BackgroundContent-CqU7Wlm2.js";import{T as nr}from"./Triangle-66-Bqe-c.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";import"./PreviewSwitch-DqnF708j.js";const rr=`import { useEffect, useRef } from 'react';\r
import { Renderer, Triangle, Program, Mesh } from 'ogl';\r
import './Prism.css';\r
\r
const Prism = ({\r
  height = 3.5,\r
  baseWidth = 5.5,\r
  animationType = 'rotate',\r
  glow = 1,\r
  offset = { x: 0, y: 0 },\r
  noise = 0.5,\r
  transparent = true,\r
  scale = 3.6,\r
  hueShift = 0,\r
  colorFrequency = 1,\r
  hoverStrength = 2,\r
  inertia = 0.05,\r
  bloom = 1,\r
  suspendWhenOffscreen = false,\r
  timeScale = 0.5\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const H = Math.max(0.001, height);\r
    const BW = Math.max(0.001, baseWidth);\r
    const BASE_HALF = BW * 0.5;\r
    const GLOW = Math.max(0.0, glow);\r
    const NOISE = Math.max(0.0, noise);\r
    const offX = offset?.x ?? 0;\r
    const offY = offset?.y ?? 0;\r
    const SAT = transparent ? 1.5 : 1;\r
    const SCALE = Math.max(0.001, scale);\r
    const HUE = hueShift || 0;\r
    const CFREQ = Math.max(0.0, colorFrequency || 1);\r
    const BLOOM = Math.max(0.0, bloom || 1);\r
    const RSX = 1;\r
    const RSY = 1;\r
    const RSZ = 1;\r
    const TS = Math.max(0, timeScale || 1);\r
    const HOVSTR = Math.max(0, hoverStrength || 1);\r
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));\r
\r
    const dpr = Math.min(2, window.devicePixelRatio || 1);\r
    const renderer = new Renderer({\r
      dpr,\r
      alpha: transparent,\r
      antialias: false\r
    });\r
    const gl = renderer.gl;\r
    gl.disable(gl.DEPTH_TEST);\r
    gl.disable(gl.CULL_FACE);\r
    gl.disable(gl.BLEND);\r
\r
    Object.assign(gl.canvas.style, {\r
      position: 'absolute',\r
      inset: '0',\r
      width: '100%',\r
      height: '100%',\r
      display: 'block'\r
    });\r
    container.appendChild(gl.canvas);\r
\r
    const vertex = /* glsl */ \`\r
      attribute vec2 position;\r
      void main() {\r
        gl_Position = vec4(position, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragment = /* glsl */ \`\r
      precision highp float;\r
\r
      uniform vec2  iResolution;\r
      uniform float iTime;\r
\r
      uniform float uHeight;\r
      uniform float uBaseHalf;\r
      uniform mat3  uRot;\r
      uniform int   uUseBaseWobble;\r
      uniform float uGlow;\r
      uniform vec2  uOffsetPx;\r
      uniform float uNoise;\r
      uniform float uSaturation;\r
      uniform float uScale;\r
      uniform float uHueShift;\r
      uniform float uColorFreq;\r
      uniform float uBloom;\r
      uniform float uCenterShift;\r
      uniform float uInvBaseHalf;\r
      uniform float uInvHeight;\r
      uniform float uMinAxis;\r
      uniform float uPxScale;\r
      uniform float uTimeScale;\r
\r
      vec4 tanh4(vec4 x){\r
        vec4 e2x = exp(2.0*x);\r
        return (e2x - 1.0) / (e2x + 1.0);\r
      }\r
\r
      float rand(vec2 co){\r
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);\r
      }\r
\r
      float sdOctaAnisoInv(vec3 p){\r
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);\r
        float m = q.x + q.y + q.z - 1.0;\r
        return m * uMinAxis * 0.5773502691896258;\r
      }\r
\r
      float sdPyramidUpInv(vec3 p){\r
        float oct = sdOctaAnisoInv(p);\r
        float halfSpace = -p.y;\r
        return max(oct, halfSpace);\r
      }\r
\r
      mat3 hueRotation(float a){\r
        float c = cos(a), s = sin(a);\r
        mat3 W = mat3(\r
          0.299, 0.587, 0.114,\r
          0.299, 0.587, 0.114,\r
          0.299, 0.587, 0.114\r
        );\r
        mat3 U = mat3(\r
           0.701, -0.587, -0.114,\r
          -0.299,  0.413, -0.114,\r
          -0.300, -0.588,  0.886\r
        );\r
        mat3 V = mat3(\r
           0.168, -0.331,  0.500,\r
           0.328,  0.035, -0.500,\r
          -0.497,  0.296,  0.201\r
        );\r
        return W + U * c + V * s;\r
      }\r
\r
      void main(){\r
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;\r
\r
        float z = 5.0;\r
        float d = 0.0;\r
\r
        vec3 p;\r
        vec4 o = vec4(0.0);\r
\r
        float centerShift = uCenterShift;\r
        float cf = uColorFreq;\r
\r
        mat2 wob = mat2(1.0);\r
        if (uUseBaseWobble == 1) {\r
          float t = iTime * uTimeScale;\r
          float c0 = cos(t + 0.0);\r
          float c1 = cos(t + 33.0);\r
          float c2 = cos(t + 11.0);\r
          wob = mat2(c0, c1, c2, c0);\r
        }\r
\r
        const int STEPS = 100;\r
        for (int i = 0; i < STEPS; i++) {\r
          p = vec3(f, z);\r
          p.xz = p.xz * wob;\r
          p = uRot * p;\r
          vec3 q = p;\r
          q.y += centerShift;\r
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));\r
          z -= d;\r
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;\r
        }\r
\r
        o = tanh4(o * o * (uGlow * uBloom) / 1e5);\r
\r
        vec3 col = o.rgb;\r
        float n = rand(gl_FragCoord.xy + vec2(iTime));\r
        col += (n - 0.5) * uNoise;\r
        col = clamp(col, 0.0, 1.0);\r
\r
        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));\r
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);\r
\r
        if(abs(uHueShift) > 0.0001){\r
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);\r
        }\r
\r
        gl_FragColor = vec4(col, o.a);\r
      }\r
    \`;\r
\r
    const geometry = new Triangle(gl);\r
    const iResBuf = new Float32Array(2);\r
    const offsetPxBuf = new Float32Array(2);\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        iResolution: { value: iResBuf },\r
        iTime: { value: 0 },\r
        uHeight: { value: H },\r
        uBaseHalf: { value: BASE_HALF },\r
        uUseBaseWobble: { value: 1 },\r
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },\r
        uGlow: { value: GLOW },\r
        uOffsetPx: { value: offsetPxBuf },\r
        uNoise: { value: NOISE },\r
        uSaturation: { value: SAT },\r
        uScale: { value: SCALE },\r
        uHueShift: { value: HUE },\r
        uColorFreq: { value: CFREQ },\r
        uBloom: { value: BLOOM },\r
        uCenterShift: { value: H * 0.25 },\r
        uInvBaseHalf: { value: 1 / BASE_HALF },\r
        uInvHeight: { value: 1 / H },\r
        uMinAxis: { value: Math.min(BASE_HALF, H) },\r
        uPxScale: {\r
          value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE)\r
        },\r
        uTimeScale: { value: TS }\r
      }\r
    });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const resize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h);\r
      iResBuf[0] = gl.drawingBufferWidth;\r
      iResBuf[1] = gl.drawingBufferHeight;\r
      offsetPxBuf[0] = offX * dpr;\r
      offsetPxBuf[1] = offY * dpr;\r
      program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);\r
    };\r
    const ro = new ResizeObserver(resize);\r
    ro.observe(container);\r
    resize();\r
\r
    const rotBuf = new Float32Array(9);\r
    const setMat3FromEuler = (yawY, pitchX, rollZ, out) => {\r
      const cy = Math.cos(yawY),\r
        sy = Math.sin(yawY);\r
      const cx = Math.cos(pitchX),\r
        sx = Math.sin(pitchX);\r
      const cz = Math.cos(rollZ),\r
        sz = Math.sin(rollZ);\r
      const r00 = cy * cz + sy * sx * sz;\r
      const r01 = -cy * sz + sy * sx * cz;\r
      const r02 = sy * cx;\r
\r
      const r10 = cx * sz;\r
      const r11 = cx * cz;\r
      const r12 = -sx;\r
\r
      const r20 = -sy * cz + cy * sx * sz;\r
      const r21 = sy * sz + cy * sx * cz;\r
      const r22 = cy * cx;\r
\r
      out[0] = r00;\r
      out[1] = r10;\r
      out[2] = r20;\r
      out[3] = r01;\r
      out[4] = r11;\r
      out[5] = r21;\r
      out[6] = r02;\r
      out[7] = r12;\r
      out[8] = r22;\r
      return out;\r
    };\r
\r
    const NOISE_IS_ZERO = NOISE < 1e-6;\r
    let raf = 0;\r
    const t0 = performance.now();\r
    const startRAF = () => {\r
      if (raf) return;\r
      raf = requestAnimationFrame(render);\r
    };\r
    const stopRAF = () => {\r
      if (!raf) return;\r
      cancelAnimationFrame(raf);\r
      raf = 0;\r
    };\r
\r
    const rnd = () => Math.random();\r
    const wX = (0.3 + rnd() * 0.6) * RSX;\r
    const wY = (0.2 + rnd() * 0.7) * RSY;\r
    const wZ = (0.1 + rnd() * 0.5) * RSZ;\r
    const phX = rnd() * Math.PI * 2;\r
    const phZ = rnd() * Math.PI * 2;\r
\r
    let yaw = 0,\r
      pitch = 0,\r
      roll = 0;\r
    let targetYaw = 0,\r
      targetPitch = 0;\r
    const lerp = (a, b, t) => a + (b - a) * t;\r
\r
    const pointer = { x: 0, y: 0, inside: true };\r
    const onMove = e => {\r
      const ww = Math.max(1, window.innerWidth);\r
      const wh = Math.max(1, window.innerHeight);\r
      const cx = ww * 0.5;\r
      const cy = wh * 0.5;\r
      const nx = (e.clientX - cx) / (ww * 0.5);\r
      const ny = (e.clientY - cy) / (wh * 0.5);\r
      pointer.x = Math.max(-1, Math.min(1, nx));\r
      pointer.y = Math.max(-1, Math.min(1, ny));\r
      pointer.inside = true;\r
    };\r
    const onLeave = () => {\r
      pointer.inside = false;\r
    };\r
    const onBlur = () => {\r
      pointer.inside = false;\r
    };\r
\r
    let onPointerMove = null;\r
    if (animationType === 'hover') {\r
      onPointerMove = e => {\r
        onMove(e);\r
        startRAF();\r
      };\r
      window.addEventListener('pointermove', onPointerMove, { passive: true });\r
      window.addEventListener('mouseleave', onLeave);\r
      window.addEventListener('blur', onBlur);\r
      program.uniforms.uUseBaseWobble.value = 0;\r
    } else if (animationType === '3drotate') {\r
      program.uniforms.uUseBaseWobble.value = 0;\r
    } else {\r
      program.uniforms.uUseBaseWobble.value = 1;\r
    }\r
\r
    const render = t => {\r
      const time = (t - t0) * 0.001;\r
      program.uniforms.iTime.value = time;\r
\r
      let continueRAF = true;\r
\r
      if (animationType === 'hover') {\r
        const maxPitch = 0.6 * HOVSTR;\r
        const maxYaw = 0.6 * HOVSTR;\r
        targetYaw = (pointer.inside ? -pointer.x : 0) * maxYaw;\r
        targetPitch = (pointer.inside ? pointer.y : 0) * maxPitch;\r
        const prevYaw = yaw;\r
        const prevPitch = pitch;\r
        const prevRoll = roll;\r
        yaw = lerp(prevYaw, targetYaw, INERT);\r
        pitch = lerp(prevPitch, targetPitch, INERT);\r
        roll = lerp(prevRoll, 0, 0.1);\r
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);\r
\r
        if (NOISE_IS_ZERO) {\r
          const settled =\r
            Math.abs(yaw - targetYaw) < 1e-4 && Math.abs(pitch - targetPitch) < 1e-4 && Math.abs(roll) < 1e-4;\r
          if (settled) continueRAF = false;\r
        }\r
      } else if (animationType === '3drotate') {\r
        const tScaled = time * TS;\r
        yaw = tScaled * wY;\r
        pitch = Math.sin(tScaled * wX + phX) * 0.6;\r
        roll = Math.sin(tScaled * wZ + phZ) * 0.5;\r
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);\r
        if (TS < 1e-6) continueRAF = false;\r
      } else {\r
        rotBuf[0] = 1;\r
        rotBuf[1] = 0;\r
        rotBuf[2] = 0;\r
        rotBuf[3] = 0;\r
        rotBuf[4] = 1;\r
        rotBuf[5] = 0;\r
        rotBuf[6] = 0;\r
        rotBuf[7] = 0;\r
        rotBuf[8] = 1;\r
        program.uniforms.uRot.value = rotBuf;\r
        if (TS < 1e-6) continueRAF = false;\r
      }\r
\r
      renderer.render({ scene: mesh });\r
      if (continueRAF) {\r
        raf = requestAnimationFrame(render);\r
      } else {\r
        raf = 0;\r
      }\r
    };\r
\r
    if (suspendWhenOffscreen) {\r
      const io = new IntersectionObserver(entries => {\r
        const vis = entries.some(e => e.isIntersecting);\r
        if (vis) startRAF();\r
        else stopRAF();\r
      });\r
      io.observe(container);\r
      startRAF();\r
      container.__prismIO = io;\r
    } else {\r
      startRAF();\r
    }\r
\r
    return () => {\r
      stopRAF();\r
      ro.disconnect();\r
      if (animationType === 'hover') {\r
        if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);\r
        window.removeEventListener('mouseleave', onLeave);\r
        window.removeEventListener('blur', onBlur);\r
      }\r
      if (suspendWhenOffscreen) {\r
        const io = container.__prismIO;\r
        if (io) io.disconnect();\r
        delete container.__prismIO;\r
      }\r
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);\r
    };\r
  }, [\r
    height,\r
    baseWidth,\r
    animationType,\r
    glow,\r
    noise,\r
    offset?.x,\r
    offset?.y,\r
    scale,\r
    transparent,\r
    hueShift,\r
    colorFrequency,\r
    timeScale,\r
    hoverStrength,\r
    inertia,\r
    bloom,\r
    suspendWhenOffscreen\r
  ]);\r
\r
  return <div className="prism-container" ref={containerRef} />;\r
};\r
\r
export default Prism;\r
`,er=`.prism-container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
}\r
`,tr=`import { useEffect, useRef } from 'react';\r
import { Renderer, Triangle, Program, Mesh } from 'ogl';\r
\r
const Prism = ({\r
  height = 3.5,\r
  baseWidth = 5.5,\r
  animationType = 'rotate',\r
  glow = 1,\r
  offset = { x: 0, y: 0 },\r
  noise = 0.5,\r
  transparent = true,\r
  scale = 3.6,\r
  hueShift = 0,\r
  colorFrequency = 1,\r
  hoverStrength = 2,\r
  inertia = 0.05,\r
  bloom = 1,\r
  suspendWhenOffscreen = false,\r
  timeScale = 0.5\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const H = Math.max(0.001, height);\r
    const BW = Math.max(0.001, baseWidth);\r
    const BASE_HALF = BW * 0.5;\r
    const GLOW = Math.max(0.0, glow);\r
    const NOISE = Math.max(0.0, noise);\r
    const offX = offset?.x ?? 0;\r
    const offY = offset?.y ?? 0;\r
    const SAT = transparent ? 1.5 : 1;\r
    const SCALE = Math.max(0.001, scale);\r
    const HUE = hueShift || 0;\r
    const CFREQ = Math.max(0.0, colorFrequency || 1);\r
    const BLOOM = Math.max(0.0, bloom || 1);\r
    const RSX = 1;\r
    const RSY = 1;\r
    const RSZ = 1;\r
    const TS = Math.max(0, timeScale || 1);\r
    const HOVSTR = Math.max(0, hoverStrength || 1);\r
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));\r
\r
    const dpr = Math.min(2, window.devicePixelRatio || 1);\r
    const renderer = new Renderer({\r
      dpr,\r
      alpha: transparent,\r
      antialias: false\r
    });\r
    const gl = renderer.gl;\r
    gl.disable(gl.DEPTH_TEST);\r
    gl.disable(gl.CULL_FACE);\r
    gl.disable(gl.BLEND);\r
\r
    Object.assign(gl.canvas.style, {\r
      position: 'absolute',\r
      inset: '0',\r
      width: '100%',\r
      height: '100%',\r
      display: 'block'\r
    });\r
    container.appendChild(gl.canvas);\r
\r
    const vertex = /* glsl */ \`\r
      attribute vec2 position;\r
      void main() {\r
        gl_Position = vec4(position, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragment = /* glsl */ \`\r
      precision highp float;\r
\r
      uniform vec2  iResolution;\r
      uniform float iTime;\r
\r
      uniform float uHeight;\r
      uniform float uBaseHalf;\r
      uniform mat3  uRot;\r
      uniform int   uUseBaseWobble;\r
      uniform float uGlow;\r
      uniform vec2  uOffsetPx;\r
      uniform float uNoise;\r
      uniform float uSaturation;\r
      uniform float uScale;\r
      uniform float uHueShift;\r
      uniform float uColorFreq;\r
      uniform float uBloom;\r
      uniform float uCenterShift;\r
      uniform float uInvBaseHalf;\r
      uniform float uInvHeight;\r
      uniform float uMinAxis;\r
      uniform float uPxScale;\r
      uniform float uTimeScale;\r
\r
      vec4 tanh4(vec4 x){\r
        vec4 e2x = exp(2.0*x);\r
        return (e2x - 1.0) / (e2x + 1.0);\r
      }\r
\r
      float rand(vec2 co){\r
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);\r
      }\r
\r
      float sdOctaAnisoInv(vec3 p){\r
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);\r
        float m = q.x + q.y + q.z - 1.0;\r
        return m * uMinAxis * 0.5773502691896258;\r
      }\r
\r
      float sdPyramidUpInv(vec3 p){\r
        float oct = sdOctaAnisoInv(p);\r
        float halfSpace = -p.y;\r
        return max(oct, halfSpace);\r
      }\r
\r
      mat3 hueRotation(float a){\r
        float c = cos(a), s = sin(a);\r
        mat3 W = mat3(\r
          0.299, 0.587, 0.114,\r
          0.299, 0.587, 0.114,\r
          0.299, 0.587, 0.114\r
        );\r
        mat3 U = mat3(\r
           0.701, -0.587, -0.114,\r
          -0.299,  0.413, -0.114,\r
          -0.300, -0.588,  0.886\r
        );\r
        mat3 V = mat3(\r
           0.168, -0.331,  0.500,\r
           0.328,  0.035, -0.500,\r
          -0.497,  0.296,  0.201\r
        );\r
        return W + U * c + V * s;\r
      }\r
\r
      void main(){\r
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;\r
\r
        float z = 5.0;\r
        float d = 0.0;\r
\r
        vec3 p;\r
        vec4 o = vec4(0.0);\r
\r
        float centerShift = uCenterShift;\r
        float cf = uColorFreq;\r
\r
        mat2 wob = mat2(1.0);\r
        if (uUseBaseWobble == 1) {\r
          float t = iTime * uTimeScale;\r
          float c0 = cos(t + 0.0);\r
          float c1 = cos(t + 33.0);\r
          float c2 = cos(t + 11.0);\r
          wob = mat2(c0, c1, c2, c0);\r
        }\r
\r
        const int STEPS = 100;\r
        for (int i = 0; i < STEPS; i++) {\r
          p = vec3(f, z);\r
          p.xz = p.xz * wob;\r
          p = uRot * p;\r
          vec3 q = p;\r
          q.y += centerShift;\r
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));\r
          z -= d;\r
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;\r
        }\r
\r
        o = tanh4(o * o * (uGlow * uBloom) / 1e5);\r
\r
        vec3 col = o.rgb;\r
        float n = rand(gl_FragCoord.xy + vec2(iTime));\r
        col += (n - 0.5) * uNoise;\r
        col = clamp(col, 0.0, 1.0);\r
\r
        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));\r
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);\r
\r
        if(abs(uHueShift) > 0.0001){\r
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);\r
        }\r
\r
        gl_FragColor = vec4(col, o.a);\r
      }\r
    \`;\r
\r
    const geometry = new Triangle(gl);\r
    const iResBuf = new Float32Array(2);\r
    const offsetPxBuf = new Float32Array(2);\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        iResolution: { value: iResBuf },\r
        iTime: { value: 0 },\r
        uHeight: { value: H },\r
        uBaseHalf: { value: BASE_HALF },\r
        uUseBaseWobble: { value: 1 },\r
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },\r
        uGlow: { value: GLOW },\r
        uOffsetPx: { value: offsetPxBuf },\r
        uNoise: { value: NOISE },\r
        uSaturation: { value: SAT },\r
        uScale: { value: SCALE },\r
        uHueShift: { value: HUE },\r
        uColorFreq: { value: CFREQ },\r
        uBloom: { value: BLOOM },\r
        uCenterShift: { value: H * 0.25 },\r
        uInvBaseHalf: { value: 1 / BASE_HALF },\r
        uInvHeight: { value: 1 / H },\r
        uMinAxis: { value: Math.min(BASE_HALF, H) },\r
        uPxScale: {\r
          value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE)\r
        },\r
        uTimeScale: { value: TS }\r
      }\r
    });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const resize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h);\r
      iResBuf[0] = gl.drawingBufferWidth;\r
      iResBuf[1] = gl.drawingBufferHeight;\r
      offsetPxBuf[0] = offX * dpr;\r
      offsetPxBuf[1] = offY * dpr;\r
      program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);\r
    };\r
    const ro = new ResizeObserver(resize);\r
    ro.observe(container);\r
    resize();\r
\r
    const rotBuf = new Float32Array(9);\r
    const setMat3FromEuler = (yawY, pitchX, rollZ, out) => {\r
      const cy = Math.cos(yawY),\r
        sy = Math.sin(yawY);\r
      const cx = Math.cos(pitchX),\r
        sx = Math.sin(pitchX);\r
      const cz = Math.cos(rollZ),\r
        sz = Math.sin(rollZ);\r
      const r00 = cy * cz + sy * sx * sz;\r
      const r01 = -cy * sz + sy * sx * cz;\r
      const r02 = sy * cx;\r
\r
      const r10 = cx * sz;\r
      const r11 = cx * cz;\r
      const r12 = -sx;\r
\r
      const r20 = -sy * cz + cy * sx * sz;\r
      const r21 = sy * sz + cy * sx * cz;\r
      const r22 = cy * cx;\r
\r
      out[0] = r00;\r
      out[1] = r10;\r
      out[2] = r20;\r
      out[3] = r01;\r
      out[4] = r11;\r
      out[5] = r21;\r
      out[6] = r02;\r
      out[7] = r12;\r
      out[8] = r22;\r
      return out;\r
    };\r
\r
    const NOISE_IS_ZERO = NOISE < 1e-6;\r
    let raf = 0;\r
    const t0 = performance.now();\r
    const startRAF = () => {\r
      if (raf) return;\r
      raf = requestAnimationFrame(render);\r
    };\r
    const stopRAF = () => {\r
      if (!raf) return;\r
      cancelAnimationFrame(raf);\r
      raf = 0;\r
    };\r
\r
    const rnd = () => Math.random();\r
    const wX = (0.3 + rnd() * 0.6) * RSX;\r
    const wY = (0.2 + rnd() * 0.7) * RSY;\r
    const wZ = (0.1 + rnd() * 0.5) * RSZ;\r
    const phX = rnd() * Math.PI * 2;\r
    const phZ = rnd() * Math.PI * 2;\r
\r
    let yaw = 0,\r
      pitch = 0,\r
      roll = 0;\r
    let targetYaw = 0,\r
      targetPitch = 0;\r
    const lerp = (a, b, t) => a + (b - a) * t;\r
\r
    const pointer = { x: 0, y: 0, inside: true };\r
    const onMove = e => {\r
      const ww = Math.max(1, window.innerWidth);\r
      const wh = Math.max(1, window.innerHeight);\r
      const cx = ww * 0.5;\r
      const cy = wh * 0.5;\r
      const nx = (e.clientX - cx) / (ww * 0.5);\r
      const ny = (e.clientY - cy) / (wh * 0.5);\r
      pointer.x = Math.max(-1, Math.min(1, nx));\r
      pointer.y = Math.max(-1, Math.min(1, ny));\r
      pointer.inside = true;\r
    };\r
    const onLeave = () => {\r
      pointer.inside = false;\r
    };\r
    const onBlur = () => {\r
      pointer.inside = false;\r
    };\r
\r
    let onPointerMove = null;\r
    if (animationType === 'hover') {\r
      onPointerMove = e => {\r
        onMove(e);\r
        startRAF();\r
      };\r
      window.addEventListener('pointermove', onPointerMove, { passive: true });\r
      window.addEventListener('mouseleave', onLeave);\r
      window.addEventListener('blur', onBlur);\r
      program.uniforms.uUseBaseWobble.value = 0;\r
    } else if (animationType === '3drotate') {\r
      program.uniforms.uUseBaseWobble.value = 0;\r
    } else {\r
      program.uniforms.uUseBaseWobble.value = 1;\r
    }\r
\r
    const render = t => {\r
      const time = (t - t0) * 0.001;\r
      program.uniforms.iTime.value = time;\r
\r
      let continueRAF = true;\r
\r
      if (animationType === 'hover') {\r
        const maxPitch = 0.6 * HOVSTR;\r
        const maxYaw = 0.6 * HOVSTR;\r
        targetYaw = (pointer.inside ? -pointer.x : 0) * maxYaw;\r
        targetPitch = (pointer.inside ? pointer.y : 0) * maxPitch;\r
        const prevYaw = yaw;\r
        const prevPitch = pitch;\r
        const prevRoll = roll;\r
        yaw = lerp(prevYaw, targetYaw, INERT);\r
        pitch = lerp(prevPitch, targetPitch, INERT);\r
        roll = lerp(prevRoll, 0, 0.1);\r
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);\r
\r
        if (NOISE_IS_ZERO) {\r
          const settled =\r
            Math.abs(yaw - targetYaw) < 1e-4 && Math.abs(pitch - targetPitch) < 1e-4 && Math.abs(roll) < 1e-4;\r
          if (settled) continueRAF = false;\r
        }\r
      } else if (animationType === '3drotate') {\r
        const tScaled = time * TS;\r
        yaw = tScaled * wY;\r
        pitch = Math.sin(tScaled * wX + phX) * 0.6;\r
        roll = Math.sin(tScaled * wZ + phZ) * 0.5;\r
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);\r
        if (TS < 1e-6) continueRAF = false;\r
      } else {\r
        rotBuf[0] = 1;\r
        rotBuf[1] = 0;\r
        rotBuf[2] = 0;\r
        rotBuf[3] = 0;\r
        rotBuf[4] = 1;\r
        rotBuf[5] = 0;\r
        rotBuf[6] = 0;\r
        rotBuf[7] = 0;\r
        rotBuf[8] = 1;\r
        program.uniforms.uRot.value = rotBuf;\r
        if (TS < 1e-6) continueRAF = false;\r
      }\r
\r
      renderer.render({ scene: mesh });\r
      if (continueRAF) {\r
        raf = requestAnimationFrame(render);\r
      } else {\r
        raf = 0;\r
      }\r
    };\r
\r
    if (suspendWhenOffscreen) {\r
      const io = new IntersectionObserver(entries => {\r
        const vis = entries.some(e => e.isIntersecting);\r
        if (vis) startRAF();\r
        else stopRAF();\r
      });\r
      io.observe(container);\r
      startRAF();\r
      container.__prismIO = io;\r
    } else {\r
      startRAF();\r
    }\r
\r
    return () => {\r
      stopRAF();\r
      ro.disconnect();\r
      if (animationType === 'hover') {\r
        if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);\r
        window.removeEventListener('mouseleave', onLeave);\r
        window.removeEventListener('blur', onBlur);\r
      }\r
      if (suspendWhenOffscreen) {\r
        const io = container.__prismIO;\r
        if (io) io.disconnect();\r
        delete container.__prismIO;\r
      }\r
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);\r
    };\r
  }, [\r
    height,\r
    baseWidth,\r
    animationType,\r
    glow,\r
    noise,\r
    offset?.x,\r
    offset?.y,\r
    scale,\r
    transparent,\r
    hueShift,\r
    colorFrequency,\r
    timeScale,\r
    hoverStrength,\r
    inertia,\r
    bloom,\r
    suspendWhenOffscreen\r
  ]);\r
\r
  return <div className="w-full h-full relative" ref={containerRef} />;\r
};\r
\r
export default Prism;\r
`,or=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Triangle, Program, Mesh } from 'ogl';\r
import './Prism.css';\r
\r
type PrismProps = {\r
  height?: number;\r
  baseWidth?: number;\r
  animationType?: 'rotate' | 'hover' | '3drotate';\r
  glow?: number;\r
  offset?: { x?: number; y?: number };\r
  noise?: number;\r
  transparent?: boolean;\r
  scale?: number;\r
  hueShift?: number;\r
  colorFrequency?: number;\r
  hoverStrength?: number;\r
  inertia?: number;\r
  bloom?: number;\r
  suspendWhenOffscreen?: boolean;\r
  timeScale?: number;\r
};\r
\r
const Prism: React.FC<PrismProps> = ({\r
  height = 3.5,\r
  baseWidth = 5.5,\r
  animationType = 'rotate',\r
  glow = 1,\r
  offset = { x: 0, y: 0 },\r
  noise = 0.5,\r
  transparent = true,\r
  scale = 3.6,\r
  hueShift = 0,\r
  colorFrequency = 1,\r
  hoverStrength = 2,\r
  inertia = 0.05,\r
  bloom = 1,\r
  suspendWhenOffscreen = false,\r
  timeScale = 0.5\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const H = Math.max(0.001, height);\r
    const BW = Math.max(0.001, baseWidth);\r
    const BASE_HALF = BW * 0.5;\r
    const GLOW = Math.max(0.0, glow);\r
    const NOISE = Math.max(0.0, noise);\r
    const offX = offset?.x ?? 0;\r
    const offY = offset?.y ?? 0;\r
    const SAT = transparent ? 1.5 : 1;\r
    const SCALE = Math.max(0.001, scale);\r
    const HUE = hueShift || 0;\r
    const CFREQ = Math.max(0.0, colorFrequency || 1);\r
    const BLOOM = Math.max(0.0, bloom || 1);\r
    const RSX = 1;\r
    const RSY = 1;\r
    const RSZ = 1;\r
    const TS = Math.max(0, timeScale || 1);\r
    const HOVSTR = Math.max(0, hoverStrength || 1);\r
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));\r
\r
    const dpr = Math.min(2, window.devicePixelRatio || 1);\r
    const renderer = new Renderer({\r
      dpr,\r
      alpha: transparent,\r
      antialias: false\r
    });\r
    const gl = renderer.gl;\r
    gl.disable(gl.DEPTH_TEST);\r
    gl.disable(gl.CULL_FACE);\r
    gl.disable(gl.BLEND);\r
\r
    Object.assign(gl.canvas.style, {\r
      position: 'absolute',\r
      inset: '0',\r
      width: '100%',\r
      height: '100%',\r
      display: 'block'\r
    } as Partial<CSSStyleDeclaration>);\r
    container.appendChild(gl.canvas);\r
\r
    const vertex = /* glsl */ \`\r
      attribute vec2 position;\r
      void main() {\r
        gl_Position = vec4(position, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragment = /* glsl */ \`\r
      precision highp float;\r
\r
      uniform vec2  iResolution;\r
      uniform float iTime;\r
\r
      uniform float uHeight;\r
      uniform float uBaseHalf;\r
      uniform mat3  uRot;\r
      uniform int   uUseBaseWobble;\r
      uniform float uGlow;\r
      uniform vec2  uOffsetPx;\r
      uniform float uNoise;\r
      uniform float uSaturation;\r
      uniform float uScale;\r
      uniform float uHueShift;\r
      uniform float uColorFreq;\r
      uniform float uBloom;\r
      uniform float uCenterShift;\r
      uniform float uInvBaseHalf;\r
      uniform float uInvHeight;\r
      uniform float uMinAxis;\r
      uniform float uPxScale;\r
      uniform float uTimeScale;\r
\r
      vec4 tanh4(vec4 x){\r
        vec4 e2x = exp(2.0*x);\r
        return (e2x - 1.0) / (e2x + 1.0);\r
      }\r
\r
      float rand(vec2 co){\r
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);\r
      }\r
\r
      float sdOctaAnisoInv(vec3 p){\r
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);\r
        float m = q.x + q.y + q.z - 1.0;\r
        return m * uMinAxis * 0.5773502691896258;\r
      }\r
\r
      float sdPyramidUpInv(vec3 p){\r
        float oct = sdOctaAnisoInv(p);\r
        float halfSpace = -p.y;\r
        return max(oct, halfSpace);\r
      }\r
\r
      mat3 hueRotation(float a){\r
        float c = cos(a), s = sin(a);\r
        mat3 W = mat3(\r
          0.299, 0.587, 0.114,\r
          0.299, 0.587, 0.114,\r
          0.299, 0.587, 0.114\r
        );\r
        mat3 U = mat3(\r
           0.701, -0.587, -0.114,\r
          -0.299,  0.413, -0.114,\r
          -0.300, -0.588,  0.886\r
        );\r
        mat3 V = mat3(\r
           0.168, -0.331,  0.500,\r
           0.328,  0.035, -0.500,\r
          -0.497,  0.296,  0.201\r
        );\r
        return W + U * c + V * s;\r
      }\r
\r
      void main(){\r
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;\r
\r
        float z = 5.0;\r
        float d = 0.0;\r
\r
        vec3 p;\r
        vec4 o = vec4(0.0);\r
\r
        float centerShift = uCenterShift;\r
        float cf = uColorFreq;\r
\r
        mat2 wob = mat2(1.0);\r
        if (uUseBaseWobble == 1) {\r
          float t = iTime * uTimeScale;\r
          float c0 = cos(t + 0.0);\r
          float c1 = cos(t + 33.0);\r
          float c2 = cos(t + 11.0);\r
          wob = mat2(c0, c1, c2, c0);\r
        }\r
\r
        const int STEPS = 100;\r
        for (int i = 0; i < STEPS; i++) {\r
          p = vec3(f, z);\r
          p.xz = p.xz * wob;\r
          p = uRot * p;\r
          vec3 q = p;\r
          q.y += centerShift;\r
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));\r
          z -= d;\r
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;\r
        }\r
\r
        o = tanh4(o * o * (uGlow * uBloom) / 1e5);\r
\r
        vec3 col = o.rgb;\r
        float n = rand(gl_FragCoord.xy + vec2(iTime));\r
        col += (n - 0.5) * uNoise;\r
        col = clamp(col, 0.0, 1.0);\r
\r
        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));\r
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);\r
\r
        if(abs(uHueShift) > 0.0001){\r
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);\r
        }\r
\r
        gl_FragColor = vec4(col, o.a);\r
      }\r
    \`;\r
\r
    const geometry = new Triangle(gl);\r
    const iResBuf = new Float32Array(2);\r
    const offsetPxBuf = new Float32Array(2);\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        iResolution: { value: iResBuf },\r
        iTime: { value: 0 },\r
        uHeight: { value: H },\r
        uBaseHalf: { value: BASE_HALF },\r
        uUseBaseWobble: { value: 1 },\r
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },\r
        uGlow: { value: GLOW },\r
        uOffsetPx: { value: offsetPxBuf },\r
        uNoise: { value: NOISE },\r
        uSaturation: { value: SAT },\r
        uScale: { value: SCALE },\r
        uHueShift: { value: HUE },\r
        uColorFreq: { value: CFREQ },\r
        uBloom: { value: BLOOM },\r
        uCenterShift: { value: H * 0.25 },\r
        uInvBaseHalf: { value: 1 / BASE_HALF },\r
        uInvHeight: { value: 1 / H },\r
        uMinAxis: { value: Math.min(BASE_HALF, H) },\r
        uPxScale: {\r
          value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE)\r
        },\r
        uTimeScale: { value: TS }\r
      }\r
    });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const resize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h);\r
      iResBuf[0] = gl.drawingBufferWidth;\r
      iResBuf[1] = gl.drawingBufferHeight;\r
      offsetPxBuf[0] = offX * dpr;\r
      offsetPxBuf[1] = offY * dpr;\r
      program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);\r
    };\r
    const ro = new ResizeObserver(resize);\r
    ro.observe(container);\r
    resize();\r
\r
    const rotBuf = new Float32Array(9);\r
    const setMat3FromEuler = (yawY: number, pitchX: number, rollZ: number, out: Float32Array) => {\r
      const cy = Math.cos(yawY),\r
        sy = Math.sin(yawY);\r
      const cx = Math.cos(pitchX),\r
        sx = Math.sin(pitchX);\r
      const cz = Math.cos(rollZ),\r
        sz = Math.sin(rollZ);\r
      const r00 = cy * cz + sy * sx * sz;\r
      const r01 = -cy * sz + sy * sx * cz;\r
      const r02 = sy * cx;\r
\r
      const r10 = cx * sz;\r
      const r11 = cx * cz;\r
      const r12 = -sx;\r
\r
      const r20 = -sy * cz + cy * sx * sz;\r
      const r21 = sy * sz + cy * sx * cz;\r
      const r22 = cy * cx;\r
\r
      out[0] = r00;\r
      out[1] = r10;\r
      out[2] = r20;\r
      out[3] = r01;\r
      out[4] = r11;\r
      out[5] = r21;\r
      out[6] = r02;\r
      out[7] = r12;\r
      out[8] = r22;\r
      return out;\r
    };\r
\r
    const NOISE_IS_ZERO = NOISE < 1e-6;\r
    let raf = 0;\r
    const t0 = performance.now();\r
    const startRAF = () => {\r
      if (raf) return;\r
      raf = requestAnimationFrame(render);\r
    };\r
    const stopRAF = () => {\r
      if (!raf) return;\r
      cancelAnimationFrame(raf);\r
      raf = 0;\r
    };\r
\r
    const rnd = () => Math.random();\r
    const wX = (0.3 + rnd() * 0.6) * RSX;\r
    const wY = (0.2 + rnd() * 0.7) * RSY;\r
    const wZ = (0.1 + rnd() * 0.5) * RSZ;\r
    const phX = rnd() * Math.PI * 2;\r
    const phZ = rnd() * Math.PI * 2;\r
\r
    let yaw = 0,\r
      pitch = 0,\r
      roll = 0;\r
    let targetYaw = 0,\r
      targetPitch = 0;\r
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;\r
\r
    const pointer = { x: 0, y: 0, inside: true };\r
    const onMove = (e: PointerEvent) => {\r
      const ww = Math.max(1, window.innerWidth);\r
      const wh = Math.max(1, window.innerHeight);\r
      const cx = ww * 0.5;\r
      const cy = wh * 0.5;\r
      const nx = (e.clientX - cx) / (ww * 0.5);\r
      const ny = (e.clientY - cy) / (wh * 0.5);\r
      pointer.x = Math.max(-1, Math.min(1, nx));\r
      pointer.y = Math.max(-1, Math.min(1, ny));\r
      pointer.inside = true;\r
    };\r
    const onLeave = () => {\r
      pointer.inside = false;\r
    };\r
    const onBlur = () => {\r
      pointer.inside = false;\r
    };\r
\r
    let onPointerMove: ((e: PointerEvent) => void) | null = null;\r
    if (animationType === 'hover') {\r
      onPointerMove = (e: PointerEvent) => {\r
        onMove(e);\r
        startRAF();\r
      };\r
      window.addEventListener('pointermove', onPointerMove, { passive: true });\r
      window.addEventListener('mouseleave', onLeave);\r
      window.addEventListener('blur', onBlur);\r
      program.uniforms.uUseBaseWobble.value = 0;\r
    } else if (animationType === '3drotate') {\r
      program.uniforms.uUseBaseWobble.value = 0;\r
    } else {\r
      program.uniforms.uUseBaseWobble.value = 1;\r
    }\r
\r
    const render = (t: number) => {\r
      const time = (t - t0) * 0.001;\r
      program.uniforms.iTime.value = time;\r
\r
      let continueRAF = true;\r
\r
      if (animationType === 'hover') {\r
        const maxPitch = 0.6 * HOVSTR;\r
        const maxYaw = 0.6 * HOVSTR;\r
        targetYaw = (pointer.inside ? -pointer.x : 0) * maxYaw;\r
        targetPitch = (pointer.inside ? pointer.y : 0) * maxPitch;\r
        const prevYaw = yaw;\r
        const prevPitch = pitch;\r
        const prevRoll = roll;\r
        yaw = lerp(prevYaw, targetYaw, INERT);\r
        pitch = lerp(prevPitch, targetPitch, INERT);\r
        roll = lerp(prevRoll, 0, 0.1);\r
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);\r
\r
        if (NOISE_IS_ZERO) {\r
          const settled =\r
            Math.abs(yaw - targetYaw) < 1e-4 && Math.abs(pitch - targetPitch) < 1e-4 && Math.abs(roll) < 1e-4;\r
          if (settled) continueRAF = false;\r
        }\r
      } else if (animationType === '3drotate') {\r
        const tScaled = time * TS;\r
        yaw = tScaled * wY;\r
        pitch = Math.sin(tScaled * wX + phX) * 0.6;\r
        roll = Math.sin(tScaled * wZ + phZ) * 0.5;\r
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);\r
        if (TS < 1e-6) continueRAF = false;\r
      } else {\r
        rotBuf[0] = 1;\r
        rotBuf[1] = 0;\r
        rotBuf[2] = 0;\r
        rotBuf[3] = 0;\r
        rotBuf[4] = 1;\r
        rotBuf[5] = 0;\r
        rotBuf[6] = 0;\r
        rotBuf[7] = 0;\r
        rotBuf[8] = 1;\r
        program.uniforms.uRot.value = rotBuf;\r
        if (TS < 1e-6) continueRAF = false;\r
      }\r
\r
      renderer.render({ scene: mesh });\r
      if (continueRAF) {\r
        raf = requestAnimationFrame(render);\r
      } else {\r
        raf = 0;\r
      }\r
    };\r
\r
    interface PrismContainer extends HTMLElement {\r
      __prismIO?: IntersectionObserver;\r
    }\r
\r
    if (suspendWhenOffscreen) {\r
      const io = new IntersectionObserver(entries => {\r
        const vis = entries.some(e => e.isIntersecting);\r
        if (vis) startRAF();\r
        else stopRAF();\r
      });\r
      io.observe(container);\r
      startRAF();\r
      (container as PrismContainer).__prismIO = io;\r
    } else {\r
      startRAF();\r
    }\r
\r
    return () => {\r
      stopRAF();\r
      ro.disconnect();\r
      if (animationType === 'hover') {\r
        if (onPointerMove) window.removeEventListener('pointermove', onPointerMove as EventListener);\r
        window.removeEventListener('mouseleave', onLeave);\r
        window.removeEventListener('blur', onBlur);\r
      }\r
      if (suspendWhenOffscreen) {\r
        const io = (container as PrismContainer).__prismIO as IntersectionObserver | undefined;\r
        if (io) io.disconnect();\r
        delete (container as PrismContainer).__prismIO;\r
      }\r
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);\r
    };\r
  }, [\r
    height,\r
    baseWidth,\r
    animationType,\r
    glow,\r
    noise,\r
    offset?.x,\r
    offset?.y,\r
    scale,\r
    transparent,\r
    hueShift,\r
    colorFrequency,\r
    timeScale,\r
    hoverStrength,\r
    inertia,\r
    bloom,\r
    suspendWhenOffscreen\r
  ]);\r
\r
  return <div className="prism-container" ref={containerRef} />;\r
};\r
\r
export default Prism;\r
`,ar=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Triangle, Program, Mesh } from 'ogl';\r
\r
type PrismProps = {\r
  height?: number;\r
  baseWidth?: number;\r
  animationType?: 'rotate' | 'hover' | '3drotate';\r
  glow?: number;\r
  offset?: { x?: number; y?: number };\r
  noise?: number;\r
  transparent?: boolean;\r
  scale?: number;\r
  hueShift?: number;\r
  colorFrequency?: number;\r
  hoverStrength?: number;\r
  inertia?: number;\r
  bloom?: number;\r
  suspendWhenOffscreen?: boolean;\r
  timeScale?: number;\r
};\r
\r
const Prism: React.FC<PrismProps> = ({\r
  height = 3.5,\r
  baseWidth = 5.5,\r
  animationType = 'rotate',\r
  glow = 1,\r
  offset = { x: 0, y: 0 },\r
  noise = 0.5,\r
  transparent = true,\r
  scale = 3.6,\r
  hueShift = 0,\r
  colorFrequency = 1,\r
  hoverStrength = 2,\r
  inertia = 0.05,\r
  bloom = 1,\r
  suspendWhenOffscreen = false,\r
  timeScale = 0.5\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const H = Math.max(0.001, height);\r
    const BW = Math.max(0.001, baseWidth);\r
    const BASE_HALF = BW * 0.5;\r
    const GLOW = Math.max(0.0, glow);\r
    const NOISE = Math.max(0.0, noise);\r
    const offX = offset?.x ?? 0;\r
    const offY = offset?.y ?? 0;\r
    const SAT = transparent ? 1.5 : 1;\r
    const SCALE = Math.max(0.001, scale);\r
    const HUE = hueShift || 0;\r
    const CFREQ = Math.max(0.0, colorFrequency || 1);\r
    const BLOOM = Math.max(0.0, bloom || 1);\r
    const RSX = 1;\r
    const RSY = 1;\r
    const RSZ = 1;\r
    const TS = Math.max(0, timeScale || 1);\r
    const HOVSTR = Math.max(0, hoverStrength || 1);\r
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));\r
\r
    const dpr = Math.min(2, window.devicePixelRatio || 1);\r
    const renderer = new Renderer({\r
      dpr,\r
      alpha: transparent,\r
      antialias: false\r
    });\r
    const gl = renderer.gl;\r
    gl.disable(gl.DEPTH_TEST);\r
    gl.disable(gl.CULL_FACE);\r
    gl.disable(gl.BLEND);\r
\r
    Object.assign(gl.canvas.style, {\r
      position: 'absolute',\r
      inset: '0',\r
      width: '100%',\r
      height: '100%',\r
      display: 'block'\r
    } as Partial<CSSStyleDeclaration>);\r
    container.appendChild(gl.canvas);\r
\r
    const vertex = /* glsl */ \`\r
      attribute vec2 position;\r
      void main() {\r
        gl_Position = vec4(position, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragment = /* glsl */ \`\r
      precision highp float;\r
\r
      uniform vec2  iResolution;\r
      uniform float iTime;\r
\r
      uniform float uHeight;\r
      uniform float uBaseHalf;\r
      uniform mat3  uRot;\r
      uniform int   uUseBaseWobble;\r
      uniform float uGlow;\r
      uniform vec2  uOffsetPx;\r
      uniform float uNoise;\r
      uniform float uSaturation;\r
      uniform float uScale;\r
      uniform float uHueShift;\r
      uniform float uColorFreq;\r
      uniform float uBloom;\r
      uniform float uCenterShift;\r
      uniform float uInvBaseHalf;\r
      uniform float uInvHeight;\r
      uniform float uMinAxis;\r
      uniform float uPxScale;\r
      uniform float uTimeScale;\r
\r
      vec4 tanh4(vec4 x){\r
        vec4 e2x = exp(2.0*x);\r
        return (e2x - 1.0) / (e2x + 1.0);\r
      }\r
\r
      float rand(vec2 co){\r
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);\r
      }\r
\r
      float sdOctaAnisoInv(vec3 p){\r
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);\r
        float m = q.x + q.y + q.z - 1.0;\r
        return m * uMinAxis * 0.5773502691896258;\r
      }\r
\r
      float sdPyramidUpInv(vec3 p){\r
        float oct = sdOctaAnisoInv(p);\r
        float halfSpace = -p.y;\r
        return max(oct, halfSpace);\r
      }\r
\r
      mat3 hueRotation(float a){\r
        float c = cos(a), s = sin(a);\r
        mat3 W = mat3(\r
          0.299, 0.587, 0.114,\r
          0.299, 0.587, 0.114,\r
          0.299, 0.587, 0.114\r
        );\r
        mat3 U = mat3(\r
           0.701, -0.587, -0.114,\r
          -0.299,  0.413, -0.114,\r
          -0.300, -0.588,  0.886\r
        );\r
        mat3 V = mat3(\r
           0.168, -0.331,  0.500,\r
           0.328,  0.035, -0.500,\r
          -0.497,  0.296,  0.201\r
        );\r
        return W + U * c + V * s;\r
      }\r
\r
      void main(){\r
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;\r
\r
        float z = 5.0;\r
        float d = 0.0;\r
\r
        vec3 p;\r
        vec4 o = vec4(0.0);\r
\r
        float centerShift = uCenterShift;\r
        float cf = uColorFreq;\r
\r
        mat2 wob = mat2(1.0);\r
        if (uUseBaseWobble == 1) {\r
          float t = iTime * uTimeScale;\r
          float c0 = cos(t + 0.0);\r
          float c1 = cos(t + 33.0);\r
          float c2 = cos(t + 11.0);\r
          wob = mat2(c0, c1, c2, c0);\r
        }\r
\r
        const int STEPS = 100;\r
        for (int i = 0; i < STEPS; i++) {\r
          p = vec3(f, z);\r
          p.xz = p.xz * wob;\r
          p = uRot * p;\r
          vec3 q = p;\r
          q.y += centerShift;\r
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));\r
          z -= d;\r
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;\r
        }\r
\r
        o = tanh4(o * o * (uGlow * uBloom) / 1e5);\r
\r
        vec3 col = o.rgb;\r
        float n = rand(gl_FragCoord.xy + vec2(iTime));\r
        col += (n - 0.5) * uNoise;\r
        col = clamp(col, 0.0, 1.0);\r
\r
        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));\r
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);\r
\r
        if(abs(uHueShift) > 0.0001){\r
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);\r
        }\r
\r
        gl_FragColor = vec4(col, o.a);\r
      }\r
    \`;\r
\r
    const geometry = new Triangle(gl);\r
    const iResBuf = new Float32Array(2);\r
    const offsetPxBuf = new Float32Array(2);\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        iResolution: { value: iResBuf },\r
        iTime: { value: 0 },\r
        uHeight: { value: H },\r
        uBaseHalf: { value: BASE_HALF },\r
        uUseBaseWobble: { value: 1 },\r
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },\r
        uGlow: { value: GLOW },\r
        uOffsetPx: { value: offsetPxBuf },\r
        uNoise: { value: NOISE },\r
        uSaturation: { value: SAT },\r
        uScale: { value: SCALE },\r
        uHueShift: { value: HUE },\r
        uColorFreq: { value: CFREQ },\r
        uBloom: { value: BLOOM },\r
        uCenterShift: { value: H * 0.25 },\r
        uInvBaseHalf: { value: 1 / BASE_HALF },\r
        uInvHeight: { value: 1 / H },\r
        uMinAxis: { value: Math.min(BASE_HALF, H) },\r
        uPxScale: {\r
          value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE)\r
        },\r
        uTimeScale: { value: TS }\r
      }\r
    });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    const resize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h);\r
      iResBuf[0] = gl.drawingBufferWidth;\r
      iResBuf[1] = gl.drawingBufferHeight;\r
      offsetPxBuf[0] = offX * dpr;\r
      offsetPxBuf[1] = offY * dpr;\r
      program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);\r
    };\r
    const ro = new ResizeObserver(resize);\r
    ro.observe(container);\r
    resize();\r
\r
    const rotBuf = new Float32Array(9);\r
    const setMat3FromEuler = (yawY: number, pitchX: number, rollZ: number, out: Float32Array) => {\r
      const cy = Math.cos(yawY),\r
        sy = Math.sin(yawY);\r
      const cx = Math.cos(pitchX),\r
        sx = Math.sin(pitchX);\r
      const cz = Math.cos(rollZ),\r
        sz = Math.sin(rollZ);\r
      const r00 = cy * cz + sy * sx * sz;\r
      const r01 = -cy * sz + sy * sx * cz;\r
      const r02 = sy * cx;\r
\r
      const r10 = cx * sz;\r
      const r11 = cx * cz;\r
      const r12 = -sx;\r
\r
      const r20 = -sy * cz + cy * sx * sz;\r
      const r21 = sy * sz + cy * sx * cz;\r
      const r22 = cy * cx;\r
\r
      out[0] = r00;\r
      out[1] = r10;\r
      out[2] = r20;\r
      out[3] = r01;\r
      out[4] = r11;\r
      out[5] = r21;\r
      out[6] = r02;\r
      out[7] = r12;\r
      out[8] = r22;\r
      return out;\r
    };\r
\r
    const NOISE_IS_ZERO = NOISE < 1e-6;\r
    let raf = 0;\r
    const t0 = performance.now();\r
    const startRAF = () => {\r
      if (raf) return;\r
      raf = requestAnimationFrame(render);\r
    };\r
    const stopRAF = () => {\r
      if (!raf) return;\r
      cancelAnimationFrame(raf);\r
      raf = 0;\r
    };\r
\r
    const rnd = () => Math.random();\r
    const wX = (0.3 + rnd() * 0.6) * RSX;\r
    const wY = (0.2 + rnd() * 0.7) * RSY;\r
    const wZ = (0.1 + rnd() * 0.5) * RSZ;\r
    const phX = rnd() * Math.PI * 2;\r
    const phZ = rnd() * Math.PI * 2;\r
\r
    let yaw = 0,\r
      pitch = 0,\r
      roll = 0;\r
    let targetYaw = 0,\r
      targetPitch = 0;\r
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;\r
\r
    const pointer = { x: 0, y: 0, inside: true };\r
    const onMove = (e: PointerEvent) => {\r
      const ww = Math.max(1, window.innerWidth);\r
      const wh = Math.max(1, window.innerHeight);\r
      const cx = ww * 0.5;\r
      const cy = wh * 0.5;\r
      const nx = (e.clientX - cx) / (ww * 0.5);\r
      const ny = (e.clientY - cy) / (wh * 0.5);\r
      pointer.x = Math.max(-1, Math.min(1, nx));\r
      pointer.y = Math.max(-1, Math.min(1, ny));\r
      pointer.inside = true;\r
    };\r
    const onLeave = () => {\r
      pointer.inside = false;\r
    };\r
    const onBlur = () => {\r
      pointer.inside = false;\r
    };\r
\r
    let onPointerMove: ((e: PointerEvent) => void) | null = null;\r
    if (animationType === 'hover') {\r
      onPointerMove = (e: PointerEvent) => {\r
        onMove(e);\r
        startRAF();\r
      };\r
      window.addEventListener('pointermove', onPointerMove, { passive: true });\r
      window.addEventListener('mouseleave', onLeave);\r
      window.addEventListener('blur', onBlur);\r
      program.uniforms.uUseBaseWobble.value = 0;\r
    } else if (animationType === '3drotate') {\r
      program.uniforms.uUseBaseWobble.value = 0;\r
    } else {\r
      program.uniforms.uUseBaseWobble.value = 1;\r
    }\r
\r
    const render = (t: number) => {\r
      const time = (t - t0) * 0.001;\r
      program.uniforms.iTime.value = time;\r
\r
      let continueRAF = true;\r
\r
      if (animationType === 'hover') {\r
        const maxPitch = 0.6 * HOVSTR;\r
        const maxYaw = 0.6 * HOVSTR;\r
        targetYaw = (pointer.inside ? -pointer.x : 0) * maxYaw;\r
        targetPitch = (pointer.inside ? pointer.y : 0) * maxPitch;\r
        const prevYaw = yaw;\r
        const prevPitch = pitch;\r
        const prevRoll = roll;\r
        yaw = lerp(prevYaw, targetYaw, INERT);\r
        pitch = lerp(prevPitch, targetPitch, INERT);\r
        roll = lerp(prevRoll, 0, 0.1);\r
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);\r
\r
        if (NOISE_IS_ZERO) {\r
          const settled =\r
            Math.abs(yaw - targetYaw) < 1e-4 && Math.abs(pitch - targetPitch) < 1e-4 && Math.abs(roll) < 1e-4;\r
          if (settled) continueRAF = false;\r
        }\r
      } else if (animationType === '3drotate') {\r
        const tScaled = time * TS;\r
        yaw = tScaled * wY;\r
        pitch = Math.sin(tScaled * wX + phX) * 0.6;\r
        roll = Math.sin(tScaled * wZ + phZ) * 0.5;\r
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);\r
        if (TS < 1e-6) continueRAF = false;\r
      } else {\r
        rotBuf[0] = 1;\r
        rotBuf[1] = 0;\r
        rotBuf[2] = 0;\r
        rotBuf[3] = 0;\r
        rotBuf[4] = 1;\r
        rotBuf[5] = 0;\r
        rotBuf[6] = 0;\r
        rotBuf[7] = 0;\r
        rotBuf[8] = 1;\r
        program.uniforms.uRot.value = rotBuf;\r
        if (TS < 1e-6) continueRAF = false;\r
      }\r
\r
      renderer.render({ scene: mesh });\r
      if (continueRAF) {\r
        raf = requestAnimationFrame(render);\r
      } else {\r
        raf = 0;\r
      }\r
    };\r
\r
    interface PrismContainer extends HTMLElement {\r
      __prismIO?: IntersectionObserver;\r
    }\r
\r
    if (suspendWhenOffscreen) {\r
      const io = new IntersectionObserver(entries => {\r
        const vis = entries.some(e => e.isIntersecting);\r
        if (vis) startRAF();\r
        else stopRAF();\r
      });\r
      io.observe(container);\r
      startRAF();\r
      (container as PrismContainer).__prismIO = io;\r
    } else {\r
      startRAF();\r
    }\r
\r
    return () => {\r
      stopRAF();\r
      ro.disconnect();\r
      if (animationType === 'hover') {\r
        if (onPointerMove) window.removeEventListener('pointermove', onPointerMove as EventListener);\r
        window.removeEventListener('mouseleave', onLeave);\r
        window.removeEventListener('blur', onBlur);\r
      }\r
      if (suspendWhenOffscreen) {\r
        const io = (container as PrismContainer).__prismIO as IntersectionObserver | undefined;\r
        if (io) io.disconnect();\r
        delete (container as PrismContainer).__prismIO;\r
      }\r
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);\r
    };\r
  }, [\r
    height,\r
    baseWidth,\r
    animationType,\r
    glow,\r
    noise,\r
    offset?.x,\r
    offset?.y,\r
    scale,\r
    transparent,\r
    hueShift,\r
    colorFrequency,\r
    timeScale,\r
    hoverStrength,\r
    inertia,\r
    bloom,\r
    suspendWhenOffscreen\r
  ]);\r
\r
  return <div className="w-full h-full relative" ref={containerRef} />;\r
};\r
\r
export default Prism;\r
`,ir={dependencies:"ogl",usage:`import Prism from './Prism';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Prism
    animationType="rotate"
    timeScale={0.5}
    height={3.5}
    baseWidth={5.5}
    scale={3.6}
    hueShift={0}
    colorFrequency={1}
    noise={0.5}
    glow={1}
  />
</div>`,code:rr,css:er,tailwind:tr,tsCode:or,tsTailwind:ar},sr=({height:B=3.5,baseWidth:I=5.5,animationType:u="rotate",glow:L=1,offset:o={x:0,y:0},noise:C=.5,transparent:x=!0,scale:z=3.6,hueShift:P=0,colorFrequency:W=1,hoverStrength:E=2,inertia:_=.05,bloom:F=1,suspendWhenOffscreen:A=!1,timeScale:H=.5})=>{const q=l.useRef(null);return l.useEffect(()=>{const a=q.current;if(!a)return;const S=Math.max(.001,B),X=Math.max(.001,I)*.5,un=Math.max(0,L),$=Math.max(0,C),fn=(o==null?void 0:o.x)??0,mn=(o==null?void 0:o.y)??0,hn=x?1.5:1,Z=Math.max(.001,z),vn=P||0,pn=Math.max(0,W||1),dn=Math.max(0,F||1),gn=1,wn=1,xn=1,Y=Math.max(0,H||1),nn=Math.max(0,E||1),rn=Math.max(0,Math.min(1,_||.12)),j=Math.min(2,window.devicePixelRatio||1),G=new Nn({dpr:j,alpha:x,antialias:!1}),t=G.gl;t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.BLEND),Object.assign(t.canvas.style,{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block"}),a.appendChild(t.canvas);const Sn=`
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,yn=`
      precision highp float;

      uniform vec2  iResolution;
      uniform float iTime;

      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x){
        vec4 e2x = exp(2.0*x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdOctaAnisoInv(vec3 p){
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p){
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

        float z = 5.0;
        float d = 0.0;

        vec3 p;
        vec4 o = vec4(0.0);

        float centerShift = uCenterShift;
        float cf = uColorFreq;

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        const int STEPS = 100;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += centerShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

        if(abs(uHueShift) > 0.0001){
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        gl_FragColor = vec4(col, o.a);
      }
    `,bn=new nr(t),V=new Float32Array(2),D=new Float32Array(2),f=new Un(t,{vertex:Sn,fragment:yn,uniforms:{iResolution:{value:V},iTime:{value:0},uHeight:{value:S},uBaseHalf:{value:X},uUseBaseWobble:{value:1},uRot:{value:new Float32Array([1,0,0,0,1,0,0,0,1])},uGlow:{value:un},uOffsetPx:{value:D},uNoise:{value:$},uSaturation:{value:hn},uScale:{value:Z},uHueShift:{value:vn},uColorFreq:{value:pn},uBloom:{value:dn},uCenterShift:{value:S*.25},uInvBaseHalf:{value:1/X},uInvHeight:{value:1/S},uMinAxis:{value:Math.min(X,S)},uPxScale:{value:1/((t.drawingBufferHeight||1)*.1*Z)},uTimeScale:{value:Y}}}),Rn=new Xn(t,{geometry:bn,program:f}),en=()=>{const n=a.clientWidth||1,i=a.clientHeight||1;G.setSize(n,i),V[0]=t.drawingBufferWidth,V[1]=t.drawingBufferHeight,D[0]=fn*j,D[1]=mn*j,f.uniforms.uPxScale.value=1/((t.drawingBufferHeight||1)*.1*Z)},tn=new ResizeObserver(en);tn.observe(a),en();const c=new Float32Array(9),on=(n,i,s,r)=>{const h=Math.cos(n),v=Math.sin(n),p=Math.cos(i),w=Math.sin(i),M=Math.cos(s),O=Math.sin(s),On=h*M+v*w*O,In=-h*O+v*w*M,Ln=v*p,Cn=p*O,zn=p*M,Wn=-w,_n=-v*M+h*w*O,qn=v*O+h*w*M,Yn=h*p;return r[0]=On,r[1]=Cn,r[2]=_n,r[3]=In,r[4]=zn,r[5]=qn,r[6]=Ln,r[7]=Wn,r[8]=Yn,r},Mn=$<1e-6;let g=0;const Bn=performance.now(),N=()=>{g||(g=requestAnimationFrame(ln))},an=()=>{g&&(cancelAnimationFrame(g),g=0)},T=()=>Math.random(),Pn=(.3+T()*.6)*gn,En=(.2+T()*.7)*wn,Fn=(.1+T()*.5)*xn,An=T()*Math.PI*2,Hn=T()*Math.PI*2;let y=0,b=0,R=0,k=0,Q=0;const J=(n,i,s)=>n+(i-n)*s,m={x:0,y:0,inside:!0},Tn=n=>{const i=Math.max(1,window.innerWidth),s=Math.max(1,window.innerHeight),r=i*.5,h=s*.5,v=(n.clientX-r)/(i*.5),p=(n.clientY-h)/(s*.5);m.x=Math.max(-1,Math.min(1,v)),m.y=Math.max(-1,Math.min(1,p)),m.inside=!0},sn=()=>{m.inside=!1},cn=()=>{m.inside=!1};let U=null;u==="hover"?(U=n=>{Tn(n),N()},window.addEventListener("pointermove",U,{passive:!0}),window.addEventListener("mouseleave",sn),window.addEventListener("blur",cn),f.uniforms.uUseBaseWobble.value=0):u==="3drotate"?f.uniforms.uUseBaseWobble.value=0:f.uniforms.uUseBaseWobble.value=1;const ln=n=>{const i=(n-Bn)*.001;f.uniforms.iTime.value=i;let s=!0;if(u==="hover"){const r=.6*nn,h=.6*nn;k=(m.inside?-m.x:0)*h,Q=(m.inside?m.y:0)*r;const v=y,p=b,w=R;y=J(v,k,rn),b=J(p,Q,rn),R=J(w,0,.1),f.uniforms.uRot.value=on(y,b,R,c),Mn&&Math.abs(y-k)<1e-4&&Math.abs(b-Q)<1e-4&&Math.abs(R)<1e-4&&(s=!1)}else if(u==="3drotate"){const r=i*Y;y=r*En,b=Math.sin(r*Pn+An)*.6,R=Math.sin(r*Fn+Hn)*.5,f.uniforms.uRot.value=on(y,b,R,c),Y<1e-6&&(s=!1)}else c[0]=1,c[1]=0,c[2]=0,c[3]=0,c[4]=1,c[5]=0,c[6]=0,c[7]=0,c[8]=1,f.uniforms.uRot.value=c,Y<1e-6&&(s=!1);G.render({scene:Rn}),s?g=requestAnimationFrame(ln):g=0};if(A){const n=new IntersectionObserver(i=>{i.some(r=>r.isIntersecting)?N():an()});n.observe(a),N(),a.__prismIO=n}else N();return()=>{if(an(),tn.disconnect(),u==="hover"&&(U&&window.removeEventListener("pointermove",U),window.removeEventListener("mouseleave",sn),window.removeEventListener("blur",cn)),A){const n=a.__prismIO;n&&n.disconnect(),delete a.__prismIO}t.canvas.parentElement===a&&a.removeChild(t.canvas)}},[B,I,u,L,C,o==null?void 0:o.x,o==null?void 0:o.y,z,x,P,W,H,E,_,F,A]),e.jsx("div",{className:"prism-container",ref:q})},xr=()=>{const[B,I]=l.useState("rotate"),[u,L]=l.useState(.5),[o,C]=l.useState(3.6),[x,z]=l.useState(0),[P,W]=l.useState(1),[E,_]=l.useState(3.5),[F,A]=l.useState(5.5),[H,q]=l.useState(0),[a,S]=l.useState(1),K=[{name:"height",type:"number",default:"3.5",description:"Apex height of the prism (world units)."},{name:"baseWidth",type:"number",default:"5.5",description:"Total base width across X/Z (world units)."},{name:"animationType",type:'"rotate" | "hover" | "3drotate"',default:'"rotate"',description:"Animation mode: shader wobble, pointer hover tilt, or full 3D rotation."},{name:"glow",type:"number",default:"1",description:"Glow/bleed intensity multiplier."},{name:"offset",type:"{ x?: number; y?: number }",default:"{ x: 0, y: 0 }",description:"Pixel offset within the canvas (x→right, y→down)."},{name:"noise",type:"number",default:"0.5",description:"Film-grain noise amount added to final color (0 disables)."},{name:"transparent",type:"boolean",default:"true",description:"Whether the canvas has an alpha channel (transparent background)."},{name:"scale",type:"number",default:"3.6",description:"Overall screen-space scale of the prism (bigger = larger)."},{name:"hueShift",type:"number",default:"0",description:"Hue rotation (radians) applied to final color."},{name:"colorFrequency",type:"number",default:"1",description:"Frequency of internal sine bands controlling color variation."},{name:"hoverStrength",type:"number",default:"2",description:"Sensitivity of hover tilt (pitch/yaw amplitude)."},{name:"inertia",type:"number",default:"0.05",description:"Easing factor for hover (0..1, higher = snappier)."},{name:"bloom",type:"number",default:"1",description:"Extra bloom factor layered on top of glow."},{name:"suspendWhenOffscreen",type:"boolean",default:"false",description:"Pause rendering when the element is not in the viewport."},{name:"timeScale",type:"number",default:"0.5",description:"Global time multiplier for animations (0=frozen, 1=normal)."}];return e.jsxs(jn,{children:[e.jsxs(Gn,{children:[e.jsxs(Zn,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[e.jsx(sr,{animationType:B,timeScale:u,scale:o,noise:x,glow:P,height:E,baseWidth:F,hueShift:H,colorFrequency:a}),e.jsx($n,{pillText:"New Background",headline:"A spectrum of colors that spark creativity"})]}),e.jsxs(Qn,{children:[e.jsx(Kn,{title:"Animation Type",options:[{value:"rotate",label:"Rotate"},{value:"hover",label:"Hover"},{value:"3drotate",label:"3D Rotate"}],value:B,onChange:I,width:160}),e.jsx(d,{title:"Time Scale",min:.1,max:2,step:.1,value:u,onChange:L}),e.jsx(d,{title:"Scale",min:1,max:5,step:.1,value:o,onChange:C}),e.jsx(d,{title:"Height",min:1,max:8,step:.1,value:E,onChange:_}),e.jsx(d,{title:"Base Width",min:1,max:10,step:.1,value:F,onChange:A}),e.jsx(d,{title:"Noise",min:0,max:1,step:.05,value:x,onChange:z}),e.jsx(d,{title:"Glow",min:0,max:3,step:.1,value:P,onChange:W}),e.jsx(d,{title:"Hue Shift",min:-3.1416,max:3.1416,step:.1,value:H,onChange:q}),e.jsx(d,{title:"Color Frequency",min:.25,max:4,step:.05,value:a,onChange:S})]}),e.jsx(Vn,{data:K}),e.jsx(Jn,{dependencyList:["ogl"]})]}),e.jsx(Dn,{children:e.jsx(kn,{codeObject:ir})})]})};export{xr as default};
