import{r as t,j as n,B as y}from"./index-wsKSLPNH.js";import{T as b,P as x,a as w,C as z,b as C}from"./PropTable-C4uPWs8h.js";import{R as P}from"./RefreshButton-CA3SFRlq.js";import{D as R}from"./Dependencies-BHoMfJUj.js";import{u as A}from"./useForceRerender-BCFU-k0M.js";import{P as i}from"./PreviewSlider-m1G_aiYP.js";import{P as M}from"./PreviewSwitch-DqnF708j.js";import{C as D}from"./Customize-1m_ZNqR9.js";import{B as S}from"./BackgroundContent-CqU7Wlm2.js";import{B as E}from"./Ballpit-CXIaXj3t.js";import"./index-Bpz4cGEA.js";import"./three.module-0PRdiASR.js";const L=`import { useRef, useEffect } from 'react';\r
import {\r
  Clock as e,\r
  PerspectiveCamera as t,\r
  Scene as i,\r
  WebGLRenderer as s,\r
  SRGBColorSpace as n,\r
  MathUtils as o,\r
  Vector2 as r,\r
  Vector3 as a,\r
  MeshPhysicalMaterial as c,\r
  ShaderChunk as h,\r
  Color as l,\r
  Object3D as m,\r
  InstancedMesh as d,\r
  PMREMGenerator as p,\r
  SphereGeometry as g,\r
  AmbientLight as f,\r
  PointLight as u,\r
  ACESFilmicToneMapping as v,\r
  Raycaster as y,\r
  Plane as w\r
} from 'three';\r
import { RoomEnvironment as z } from 'three/examples/jsm/environments/RoomEnvironment.js';\r
\r
class x {\r
  #e;\r
  canvas;\r
  camera;\r
  cameraMinAspect;\r
  cameraMaxAspect;\r
  cameraFov;\r
  maxPixelRatio;\r
  minPixelRatio;\r
  scene;\r
  renderer;\r
  #t;\r
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };\r
  render = this.#i;\r
  onBeforeRender = () => {};\r
  onAfterRender = () => {};\r
  onAfterResize = () => {};\r
  #s = false;\r
  #n = false;\r
  isDisposed = false;\r
  #o;\r
  #r;\r
  #a;\r
  #c = new e();\r
  #h = { elapsed: 0, delta: 0 };\r
  #l;\r
  constructor(e) {\r
    this.#e = { ...e };\r
    this.#m();\r
    this.#d();\r
    this.#p();\r
    this.resize();\r
    this.#g();\r
  }\r
  #m() {\r
    this.camera = new t();\r
    this.cameraFov = this.camera.fov;\r
  }\r
  #d() {\r
    this.scene = new i();\r
  }\r
  #p() {\r
    if (this.#e.canvas) {\r
      this.canvas = this.#e.canvas;\r
    } else if (this.#e.id) {\r
      this.canvas = document.getElementById(this.#e.id);\r
    } else {\r
      console.error('Three: Missing canvas or id parameter');\r
    }\r
    this.canvas.style.display = 'block';\r
    const e = {\r
      canvas: this.canvas,\r
      powerPreference: 'high-performance',\r
      ...(this.#e.rendererOptions ?? {})\r
    };\r
    this.renderer = new s(e);\r
    this.renderer.outputColorSpace = n;\r
  }\r
  #g() {\r
    if (!(this.#e.size instanceof Object)) {\r
      window.addEventListener('resize', this.#f.bind(this));\r
      if (this.#e.size === 'parent' && this.canvas.parentNode) {\r
        this.#r = new ResizeObserver(this.#f.bind(this));\r
        this.#r.observe(this.canvas.parentNode);\r
      }\r
    }\r
    this.#o = new IntersectionObserver(this.#u.bind(this), {\r
      root: null,\r
      rootMargin: '0px',\r
      threshold: 0\r
    });\r
    this.#o.observe(this.canvas);\r
    document.addEventListener('visibilitychange', this.#v.bind(this));\r
  }\r
  #y() {\r
    window.removeEventListener('resize', this.#f.bind(this));\r
    this.#r?.disconnect();\r
    this.#o?.disconnect();\r
    document.removeEventListener('visibilitychange', this.#v.bind(this));\r
  }\r
  #u(e) {\r
    this.#s = e[0].isIntersecting;\r
    this.#s ? this.#w() : this.#z();\r
  }\r
  #v() {\r
    if (this.#s) {\r
      document.hidden ? this.#z() : this.#w();\r
    }\r
  }\r
  #f() {\r
    if (this.#a) clearTimeout(this.#a);\r
    this.#a = setTimeout(this.resize.bind(this), 100);\r
  }\r
  resize() {\r
    let e, t;\r
    if (this.#e.size instanceof Object) {\r
      e = this.#e.size.width;\r
      t = this.#e.size.height;\r
    } else if (this.#e.size === 'parent' && this.canvas.parentNode) {\r
      e = this.canvas.parentNode.offsetWidth;\r
      t = this.canvas.parentNode.offsetHeight;\r
    } else {\r
      e = window.innerWidth;\r
      t = window.innerHeight;\r
    }\r
    this.size.width = e;\r
    this.size.height = t;\r
    this.size.ratio = e / t;\r
    this.#x();\r
    this.#b();\r
    this.onAfterResize(this.size);\r
  }\r
  #x() {\r
    this.camera.aspect = this.size.width / this.size.height;\r
    if (this.camera.isPerspectiveCamera && this.cameraFov) {\r
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {\r
        this.#A(this.cameraMinAspect);\r
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {\r
        this.#A(this.cameraMaxAspect);\r
      } else {\r
        this.camera.fov = this.cameraFov;\r
      }\r
    }\r
    this.camera.updateProjectionMatrix();\r
    this.updateWorldSize();\r
  }\r
  #A(e) {\r
    const t = Math.tan(o.degToRad(this.cameraFov / 2)) / (this.camera.aspect / e);\r
    this.camera.fov = 2 * o.radToDeg(Math.atan(t));\r
  }\r
  updateWorldSize() {\r
    if (this.camera.isPerspectiveCamera) {\r
      const e = (this.camera.fov * Math.PI) / 180;\r
      this.size.wHeight = 2 * Math.tan(e / 2) * this.camera.position.length();\r
      this.size.wWidth = this.size.wHeight * this.camera.aspect;\r
    } else if (this.camera.isOrthographicCamera) {\r
      this.size.wHeight = this.camera.top - this.camera.bottom;\r
      this.size.wWidth = this.camera.right - this.camera.left;\r
    }\r
  }\r
  #b() {\r
    this.renderer.setSize(this.size.width, this.size.height);\r
    this.#t?.setSize(this.size.width, this.size.height);\r
    let e = window.devicePixelRatio;\r
    if (this.maxPixelRatio && e > this.maxPixelRatio) {\r
      e = this.maxPixelRatio;\r
    } else if (this.minPixelRatio && e < this.minPixelRatio) {\r
      e = this.minPixelRatio;\r
    }\r
    this.renderer.setPixelRatio(e);\r
    this.size.pixelRatio = e;\r
  }\r
  get postprocessing() {\r
    return this.#t;\r
  }\r
  set postprocessing(e) {\r
    this.#t = e;\r
    this.render = e.render.bind(e);\r
  }\r
  #w() {\r
    if (this.#n) return;\r
    const animate = () => {\r
      this.#l = requestAnimationFrame(animate);\r
      this.#h.delta = this.#c.getDelta();\r
      this.#h.elapsed += this.#h.delta;\r
      this.onBeforeRender(this.#h);\r
      this.render();\r
      this.onAfterRender(this.#h);\r
    };\r
    this.#n = true;\r
    this.#c.start();\r
    animate();\r
  }\r
  #z() {\r
    if (this.#n) {\r
      cancelAnimationFrame(this.#l);\r
      this.#n = false;\r
      this.#c.stop();\r
    }\r
  }\r
  #i() {\r
    this.renderer.render(this.scene, this.camera);\r
  }\r
  clear() {\r
    this.scene.traverse(e => {\r
      if (e.isMesh && typeof e.material === 'object' && e.material !== null) {\r
        Object.keys(e.material).forEach(t => {\r
          const i = e.material[t];\r
          if (i !== null && typeof i === 'object' && typeof i.dispose === 'function') {\r
            i.dispose();\r
          }\r
        });\r
        e.material.dispose();\r
        e.geometry.dispose();\r
      }\r
    });\r
    this.scene.clear();\r
  }\r
  dispose() {\r
    this.#y();\r
    this.#z();\r
    this.clear();\r
    this.#t?.dispose();\r
    this.renderer.dispose();\r
    this.isDisposed = true;\r
  }\r
}\r
\r
const b = new Map(),\r
  A = new r();\r
let R = false;\r
function S(e) {\r
  const t = {\r
    position: new r(),\r
    nPosition: new r(),\r
    hover: false,\r
    touching: false,\r
    onEnter() {},\r
    onMove() {},\r
    onClick() {},\r
    onLeave() {},\r
    ...e\r
  };\r
  (function (e, t) {\r
    if (!b.has(e)) {\r
      b.set(e, t);\r
      if (!R) {\r
        document.body.addEventListener('pointermove', M);\r
        document.body.addEventListener('pointerleave', L);\r
        document.body.addEventListener('click', C);\r
\r
        document.body.addEventListener('touchstart', TouchStart, { passive: false });\r
        document.body.addEventListener('touchmove', TouchMove, { passive: false });\r
        document.body.addEventListener('touchend', TouchEnd, { passive: false });\r
        document.body.addEventListener('touchcancel', TouchEnd, { passive: false });\r
\r
        R = true;\r
      }\r
    }\r
  })(e.domElement, t);\r
  t.dispose = () => {\r
    const t = e.domElement;\r
    b.delete(t);\r
    if (b.size === 0) {\r
      document.body.removeEventListener('pointermove', M);\r
      document.body.removeEventListener('pointerleave', L);\r
      document.body.removeEventListener('click', C);\r
\r
      document.body.removeEventListener('touchstart', TouchStart);\r
      document.body.removeEventListener('touchmove', TouchMove);\r
      document.body.removeEventListener('touchend', TouchEnd);\r
      document.body.removeEventListener('touchcancel', TouchEnd);\r
\r
      R = false;\r
    }\r
  };\r
  return t;\r
}\r
\r
function M(e) {\r
  A.x = e.clientX;\r
  A.y = e.clientY;\r
  processInteraction();\r
}\r
\r
function processInteraction() {\r
  for (const [elem, t] of b) {\r
    const i = elem.getBoundingClientRect();\r
    if (D(i)) {\r
      P(t, i);\r
      if (!t.hover) {\r
        t.hover = true;\r
        t.onEnter(t);\r
      }\r
      t.onMove(t);\r
    } else if (t.hover && !t.touching) {\r
      t.hover = false;\r
      t.onLeave(t);\r
    }\r
  }\r
}\r
\r
function C(e) {\r
  A.x = e.clientX;\r
  A.y = e.clientY;\r
  for (const [elem, t] of b) {\r
    const i = elem.getBoundingClientRect();\r
    P(t, i);\r
    if (D(i)) t.onClick(t);\r
  }\r
}\r
\r
function L() {\r
  for (const t of b.values()) {\r
    if (t.hover) {\r
      t.hover = false;\r
      t.onLeave(t);\r
    }\r
  }\r
}\r
\r
function TouchStart(e) {\r
  if (e.touches.length > 0) {\r
    e.preventDefault();\r
    A.x = e.touches[0].clientX;\r
    A.y = e.touches[0].clientY;\r
\r
    for (const [elem, t] of b) {\r
      const rect = elem.getBoundingClientRect();\r
      if (D(rect)) {\r
        t.touching = true;\r
        P(t, rect);\r
        if (!t.hover) {\r
          t.hover = true;\r
          t.onEnter(t);\r
        }\r
        t.onMove(t);\r
      }\r
    }\r
  }\r
}\r
\r
function TouchMove(e) {\r
  if (e.touches.length > 0) {\r
    e.preventDefault();\r
    A.x = e.touches[0].clientX;\r
    A.y = e.touches[0].clientY;\r
\r
    for (const [elem, t] of b) {\r
      const rect = elem.getBoundingClientRect();\r
      P(t, rect);\r
\r
      if (D(rect)) {\r
        if (!t.hover) {\r
          t.hover = true;\r
          t.touching = true;\r
          t.onEnter(t);\r
        }\r
        t.onMove(t);\r
      } else if (t.hover && t.touching) {\r
        t.onMove(t);\r
      }\r
    }\r
  }\r
}\r
\r
function TouchEnd() {\r
  for (const [, t] of b) {\r
    if (t.touching) {\r
      t.touching = false;\r
      if (t.hover) {\r
        t.hover = false;\r
        t.onLeave(t);\r
      }\r
    }\r
  }\r
}\r
\r
function P(e, t) {\r
  const { position: i, nPosition: s } = e;\r
  i.x = A.x - t.left;\r
  i.y = A.y - t.top;\r
  s.x = (i.x / t.width) * 2 - 1;\r
  s.y = (-i.y / t.height) * 2 + 1;\r
}\r
function D(e) {\r
  const { x: t, y: i } = A;\r
  const { left: s, top: n, width: o, height: r } = e;\r
  return t >= s && t <= s + o && i >= n && i <= n + r;\r
}\r
\r
const { randFloat: k, randFloatSpread: E } = o;\r
const F = new a();\r
const I = new a();\r
const O = new a();\r
const V = new a();\r
const B = new a();\r
const N = new a();\r
const _ = new a();\r
const j = new a();\r
const H = new a();\r
const T = new a();\r
\r
class W {\r
  constructor(e) {\r
    this.config = e;\r
    this.positionData = new Float32Array(3 * e.count).fill(0);\r
    this.velocityData = new Float32Array(3 * e.count).fill(0);\r
    this.sizeData = new Float32Array(e.count).fill(1);\r
    this.center = new a();\r
    this.#R();\r
    this.setSizes();\r
  }\r
  #R() {\r
    const { config: e, positionData: t } = this;\r
    this.center.toArray(t, 0);\r
    for (let i = 1; i < e.count; i++) {\r
      const s = 3 * i;\r
      t[s] = E(2 * e.maxX);\r
      t[s + 1] = E(2 * e.maxY);\r
      t[s + 2] = E(2 * e.maxZ);\r
    }\r
  }\r
  setSizes() {\r
    const { config: e, sizeData: t } = this;\r
    t[0] = e.size0;\r
    for (let i = 1; i < e.count; i++) {\r
      t[i] = k(e.minSize, e.maxSize);\r
    }\r
  }\r
  update(e) {\r
    const { config: t, center: i, positionData: s, sizeData: n, velocityData: o } = this;\r
    let r = 0;\r
    if (t.controlSphere0) {\r
      r = 1;\r
      F.fromArray(s, 0);\r
      F.lerp(i, 0.1).toArray(s, 0);\r
      V.set(0, 0, 0).toArray(o, 0);\r
    }\r
    for (let idx = r; idx < t.count; idx++) {\r
      const base = 3 * idx;\r
      I.fromArray(s, base);\r
      B.fromArray(o, base);\r
      B.y -= e.delta * t.gravity * n[idx];\r
      B.multiplyScalar(t.friction);\r
      B.clampLength(0, t.maxVelocity);\r
      I.add(B);\r
      I.toArray(s, base);\r
      B.toArray(o, base);\r
    }\r
    for (let idx = r; idx < t.count; idx++) {\r
      const base = 3 * idx;\r
      I.fromArray(s, base);\r
      B.fromArray(o, base);\r
      const radius = n[idx];\r
      for (let jdx = idx + 1; jdx < t.count; jdx++) {\r
        const otherBase = 3 * jdx;\r
        O.fromArray(s, otherBase);\r
        N.fromArray(o, otherBase);\r
        const otherRadius = n[jdx];\r
        _.copy(O).sub(I);\r
        const dist = _.length();\r
        const sumRadius = radius + otherRadius;\r
        if (dist < sumRadius) {\r
          const overlap = sumRadius - dist;\r
          j.copy(_)\r
            .normalize()\r
            .multiplyScalar(0.5 * overlap);\r
          H.copy(j).multiplyScalar(Math.max(B.length(), 1));\r
          T.copy(j).multiplyScalar(Math.max(N.length(), 1));\r
          I.sub(j);\r
          B.sub(H);\r
          I.toArray(s, base);\r
          B.toArray(o, base);\r
          O.add(j);\r
          N.add(T);\r
          O.toArray(s, otherBase);\r
          N.toArray(o, otherBase);\r
        }\r
      }\r
      if (t.controlSphere0) {\r
        _.copy(F).sub(I);\r
        const dist = _.length();\r
        const sumRadius0 = radius + n[0];\r
        if (dist < sumRadius0) {\r
          const diff = sumRadius0 - dist;\r
          j.copy(_.normalize()).multiplyScalar(diff);\r
          H.copy(j).multiplyScalar(Math.max(B.length(), 2));\r
          I.sub(j);\r
          B.sub(H);\r
        }\r
      }\r
      if (Math.abs(I.x) + radius > t.maxX) {\r
        I.x = Math.sign(I.x) * (t.maxX - radius);\r
        B.x = -B.x * t.wallBounce;\r
      }\r
      if (t.gravity === 0) {\r
        if (Math.abs(I.y) + radius > t.maxY) {\r
          I.y = Math.sign(I.y) * (t.maxY - radius);\r
          B.y = -B.y * t.wallBounce;\r
        }\r
      } else if (I.y - radius < -t.maxY) {\r
        I.y = -t.maxY + radius;\r
        B.y = -B.y * t.wallBounce;\r
      }\r
      const maxBoundary = Math.max(t.maxZ, t.maxSize);\r
      if (Math.abs(I.z) + radius > maxBoundary) {\r
        I.z = Math.sign(I.z) * (t.maxZ - radius);\r
        B.z = -B.z * t.wallBounce;\r
      }\r
      I.toArray(s, base);\r
      B.toArray(o, base);\r
    }\r
  }\r
}\r
\r
class Y extends c {\r
  constructor(e) {\r
    super(e);\r
    this.uniforms = {\r
      thicknessDistortion: { value: 0.1 },\r
      thicknessAmbient: { value: 0 },\r
      thicknessAttenuation: { value: 0.1 },\r
      thicknessPower: { value: 2 },\r
      thicknessScale: { value: 10 }\r
    };\r
    this.defines.USE_UV = '';\r
    this.onBeforeCompile = e => {\r
      Object.assign(e.uniforms, this.uniforms);\r
      e.fragmentShader =\r
        '\\n        uniform float thicknessPower;\\n        uniform float thicknessScale;\\n        uniform float thicknessDistortion;\\n        uniform float thicknessAmbient;\\n        uniform float thicknessAttenuation;\\n      ' +\r
        e.fragmentShader;\r
      e.fragmentShader = e.fragmentShader.replace(\r
        'void main() {',\r
        '\\n        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\\n          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\\n          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\\n          #ifdef USE_COLOR\\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\\n          #else\\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;\\n          #endif\\n          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\\n        }\\n\\n        void main() {\\n      '\r
      );\r
      const t = h.lights_fragment_begin.replaceAll(\r
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',\r
        '\\n          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\\n          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\\n        '\r
      );\r
      e.fragmentShader = e.fragmentShader.replace('#include <lights_fragment_begin>', t);\r
      if (this.onBeforeCompile2) this.onBeforeCompile2(e);\r
    };\r
  }\r
}\r
\r
const X = {\r
  count: 200,\r
  colors: [0, 0, 0],\r
  ambientColor: 16777215,\r
  ambientIntensity: 1,\r
  lightIntensity: 200,\r
  materialParams: {\r
    metalness: 0.5,\r
    roughness: 0.5,\r
    clearcoat: 1,\r
    clearcoatRoughness: 0.15\r
  },\r
  minSize: 0.5,\r
  maxSize: 1,\r
  size0: 1,\r
  gravity: 0.5,\r
  friction: 0.9975,\r
  wallBounce: 0.95,\r
  maxVelocity: 0.15,\r
  maxX: 5,\r
  maxY: 5,\r
  maxZ: 2,\r
  controlSphere0: false,\r
  followCursor: true\r
};\r
\r
const U = new m();\r
\r
class Z extends d {\r
  constructor(e, t = {}) {\r
    const i = { ...X, ...t };\r
    const s = new z();\r
    const n = new p(e, 0.04).fromScene(s).texture;\r
    const o = new g();\r
    const r = new Y({ envMap: n, ...i.materialParams });\r
    r.envMapRotation.x = -Math.PI / 2;\r
    super(o, r, i.count);\r
    this.config = i;\r
    this.physics = new W(i);\r
    this.#S();\r
    this.setColors(i.colors);\r
  }\r
  #S() {\r
    this.ambientLight = new f(this.config.ambientColor, this.config.ambientIntensity);\r
    this.add(this.ambientLight);\r
    this.light = new u(this.config.colors[0], this.config.lightIntensity);\r
    this.add(this.light);\r
  }\r
  setColors(e) {\r
    if (Array.isArray(e) && e.length > 1) {\r
      const t = (function (e) {\r
        let t, i;\r
        function setColors(e) {\r
          t = e;\r
          i = [];\r
          t.forEach(col => {\r
            i.push(new l(col));\r
          });\r
        }\r
        setColors(e);\r
        return {\r
          setColors,\r
          getColorAt: function (ratio, out = new l()) {\r
            const scaled = Math.max(0, Math.min(1, ratio)) * (t.length - 1);\r
            const idx = Math.floor(scaled);\r
            const start = i[idx];\r
            if (idx >= t.length - 1) return start.clone();\r
            const alpha = scaled - idx;\r
            const end = i[idx + 1];\r
            out.r = start.r + alpha * (end.r - start.r);\r
            out.g = start.g + alpha * (end.g - start.g);\r
            out.b = start.b + alpha * (end.b - start.b);\r
            return out;\r
          }\r
        };\r
      })(e);\r
      for (let idx = 0; idx < this.count; idx++) {\r
        this.setColorAt(idx, t.getColorAt(idx / this.count));\r
        if (idx === 0) {\r
          this.light.color.copy(t.getColorAt(idx / this.count));\r
        }\r
      }\r
      this.instanceColor.needsUpdate = true;\r
    }\r
  }\r
  update(e) {\r
    this.physics.update(e);\r
    for (let idx = 0; idx < this.count; idx++) {\r
      U.position.fromArray(this.physics.positionData, 3 * idx);\r
      if (idx === 0 && this.config.followCursor === false) {\r
        U.scale.setScalar(0);\r
      } else {\r
        U.scale.setScalar(this.physics.sizeData[idx]);\r
      }\r
      U.updateMatrix();\r
      this.setMatrixAt(idx, U.matrix);\r
      if (idx === 0) this.light.position.copy(U.position);\r
    }\r
    this.instanceMatrix.needsUpdate = true;\r
  }\r
}\r
\r
function createBallpit(e, t = {}) {\r
  const i = new x({\r
    canvas: e,\r
    size: 'parent',\r
    rendererOptions: { antialias: true, alpha: true }\r
  });\r
  let s;\r
  i.renderer.toneMapping = v;\r
  i.camera.position.set(0, 0, 20);\r
  i.camera.lookAt(0, 0, 0);\r
  i.cameraMaxAspect = 1.5;\r
  i.resize();\r
  initialize(t);\r
  const n = new y();\r
  const o = new w(new a(0, 0, 1), 0);\r
  const r = new a();\r
  let c = false;\r
\r
  e.style.touchAction = 'none';\r
  e.style.userSelect = 'none';\r
  e.style.webkitUserSelect = 'none';\r
\r
  const h = S({\r
    domElement: e,\r
    onMove() {\r
      n.setFromCamera(h.nPosition, i.camera);\r
      i.camera.getWorldDirection(o.normal);\r
      n.ray.intersectPlane(o, r);\r
      s.physics.center.copy(r);\r
      s.config.controlSphere0 = true;\r
    },\r
    onLeave() {\r
      s.config.controlSphere0 = false;\r
    }\r
  });\r
  function initialize(e) {\r
    if (s) {\r
      i.clear();\r
      i.scene.remove(s);\r
    }\r
    s = new Z(i.renderer, e);\r
    i.scene.add(s);\r
  }\r
  i.onBeforeRender = e => {\r
    if (!c) s.update(e);\r
  };\r
  i.onAfterResize = e => {\r
    s.config.maxX = e.wWidth / 2;\r
    s.config.maxY = e.wHeight / 2;\r
  };\r
  return {\r
    three: i,\r
    get spheres() {\r
      return s;\r
    },\r
    setCount(e) {\r
      initialize({ ...s.config, count: e });\r
    },\r
    togglePause() {\r
      c = !c;\r
    },\r
    dispose() {\r
      h.dispose();\r
      i.dispose();\r
    }\r
  };\r
}\r
\r
const Ballpit = ({ className = '', followCursor = true, ...props }) => {\r
  const canvasRef = useRef(null);\r
  const spheresInstanceRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    spheresInstanceRef.current = createBallpit(canvas, { followCursor, ...props });\r
\r
    return () => {\r
      if (spheresInstanceRef.current) {\r
        spheresInstanceRef.current.dispose();\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  return <canvas className={className} ref={canvasRef} style={{ width: '100%', height: '100%' }} />;\r
};\r
\r
export default Ballpit;\r
`,I=`import { useRef, useEffect } from 'react';\r
import {\r
  Clock as e,\r
  PerspectiveCamera as t,\r
  Scene as i,\r
  WebGLRenderer as s,\r
  SRGBColorSpace as n,\r
  MathUtils as o,\r
  Vector2 as r,\r
  Vector3 as a,\r
  MeshPhysicalMaterial as c,\r
  ShaderChunk as h,\r
  Color as l,\r
  Object3D as m,\r
  InstancedMesh as d,\r
  PMREMGenerator as p,\r
  SphereGeometry as g,\r
  AmbientLight as f,\r
  PointLight as u,\r
  ACESFilmicToneMapping as v,\r
  Raycaster as y,\r
  Plane as w\r
} from 'three';\r
import { RoomEnvironment as z } from 'three/examples/jsm/environments/RoomEnvironment.js';\r
\r
class x {\r
  #e;\r
  canvas;\r
  camera;\r
  cameraMinAspect;\r
  cameraMaxAspect;\r
  cameraFov;\r
  maxPixelRatio;\r
  minPixelRatio;\r
  scene;\r
  renderer;\r
  #t;\r
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };\r
  render = this.#i;\r
  onBeforeRender = () => {};\r
  onAfterRender = () => {};\r
  onAfterResize = () => {};\r
  #s = false;\r
  #n = false;\r
  isDisposed = false;\r
  #o;\r
  #r;\r
  #a;\r
  #c = new e();\r
  #h = { elapsed: 0, delta: 0 };\r
  #l;\r
  constructor(e) {\r
    this.#e = { ...e };\r
    this.#m();\r
    this.#d();\r
    this.#p();\r
    this.resize();\r
    this.#g();\r
  }\r
  #m() {\r
    this.camera = new t();\r
    this.cameraFov = this.camera.fov;\r
  }\r
  #d() {\r
    this.scene = new i();\r
  }\r
  #p() {\r
    if (this.#e.canvas) {\r
      this.canvas = this.#e.canvas;\r
    } else if (this.#e.id) {\r
      this.canvas = document.getElementById(this.#e.id);\r
    } else {\r
      console.error('Three: Missing canvas or id parameter');\r
    }\r
    this.canvas.style.display = 'block';\r
    const e = {\r
      canvas: this.canvas,\r
      powerPreference: 'high-performance',\r
      ...(this.#e.rendererOptions ?? {})\r
    };\r
    this.renderer = new s(e);\r
    this.renderer.outputColorSpace = n;\r
  }\r
  #g() {\r
    if (!(this.#e.size instanceof Object)) {\r
      window.addEventListener('resize', this.#f.bind(this));\r
      if (this.#e.size === 'parent' && this.canvas.parentNode) {\r
        this.#r = new ResizeObserver(this.#f.bind(this));\r
        this.#r.observe(this.canvas.parentNode);\r
      }\r
    }\r
    this.#o = new IntersectionObserver(this.#u.bind(this), {\r
      root: null,\r
      rootMargin: '0px',\r
      threshold: 0\r
    });\r
    this.#o.observe(this.canvas);\r
    document.addEventListener('visibilitychange', this.#v.bind(this));\r
  }\r
  #y() {\r
    window.removeEventListener('resize', this.#f.bind(this));\r
    this.#r?.disconnect();\r
    this.#o?.disconnect();\r
    document.removeEventListener('visibilitychange', this.#v.bind(this));\r
  }\r
  #u(e) {\r
    this.#s = e[0].isIntersecting;\r
    this.#s ? this.#w() : this.#z();\r
  }\r
  #v() {\r
    if (this.#s) {\r
      document.hidden ? this.#z() : this.#w();\r
    }\r
  }\r
  #f() {\r
    if (this.#a) clearTimeout(this.#a);\r
    this.#a = setTimeout(this.resize.bind(this), 100);\r
  }\r
  resize() {\r
    let e, t;\r
    if (this.#e.size instanceof Object) {\r
      e = this.#e.size.width;\r
      t = this.#e.size.height;\r
    } else if (this.#e.size === 'parent' && this.canvas.parentNode) {\r
      e = this.canvas.parentNode.offsetWidth;\r
      t = this.canvas.parentNode.offsetHeight;\r
    } else {\r
      e = window.innerWidth;\r
      t = window.innerHeight;\r
    }\r
    this.size.width = e;\r
    this.size.height = t;\r
    this.size.ratio = e / t;\r
    this.#x();\r
    this.#b();\r
    this.onAfterResize(this.size);\r
  }\r
  #x() {\r
    this.camera.aspect = this.size.width / this.size.height;\r
    if (this.camera.isPerspectiveCamera && this.cameraFov) {\r
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {\r
        this.#A(this.cameraMinAspect);\r
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {\r
        this.#A(this.cameraMaxAspect);\r
      } else {\r
        this.camera.fov = this.cameraFov;\r
      }\r
    }\r
    this.camera.updateProjectionMatrix();\r
    this.updateWorldSize();\r
  }\r
  #A(e) {\r
    const t = Math.tan(o.degToRad(this.cameraFov / 2)) / (this.camera.aspect / e);\r
    this.camera.fov = 2 * o.radToDeg(Math.atan(t));\r
  }\r
  updateWorldSize() {\r
    if (this.camera.isPerspectiveCamera) {\r
      const e = (this.camera.fov * Math.PI) / 180;\r
      this.size.wHeight = 2 * Math.tan(e / 2) * this.camera.position.length();\r
      this.size.wWidth = this.size.wHeight * this.camera.aspect;\r
    } else if (this.camera.isOrthographicCamera) {\r
      this.size.wHeight = this.camera.top - this.camera.bottom;\r
      this.size.wWidth = this.camera.right - this.camera.left;\r
    }\r
  }\r
  #b() {\r
    this.renderer.setSize(this.size.width, this.size.height);\r
    this.#t?.setSize(this.size.width, this.size.height);\r
    let e = window.devicePixelRatio;\r
    if (this.maxPixelRatio && e > this.maxPixelRatio) {\r
      e = this.maxPixelRatio;\r
    } else if (this.minPixelRatio && e < this.minPixelRatio) {\r
      e = this.minPixelRatio;\r
    }\r
    this.renderer.setPixelRatio(e);\r
    this.size.pixelRatio = e;\r
  }\r
  get postprocessing() {\r
    return this.#t;\r
  }\r
  set postprocessing(e) {\r
    this.#t = e;\r
    this.render = e.render.bind(e);\r
  }\r
  #w() {\r
    if (this.#n) return;\r
    const animate = () => {\r
      this.#l = requestAnimationFrame(animate);\r
      this.#h.delta = this.#c.getDelta();\r
      this.#h.elapsed += this.#h.delta;\r
      this.onBeforeRender(this.#h);\r
      this.render();\r
      this.onAfterRender(this.#h);\r
    };\r
    this.#n = true;\r
    this.#c.start();\r
    animate();\r
  }\r
  #z() {\r
    if (this.#n) {\r
      cancelAnimationFrame(this.#l);\r
      this.#n = false;\r
      this.#c.stop();\r
    }\r
  }\r
  #i() {\r
    this.renderer.render(this.scene, this.camera);\r
  }\r
  clear() {\r
    this.scene.traverse(e => {\r
      if (e.isMesh && typeof e.material === 'object' && e.material !== null) {\r
        Object.keys(e.material).forEach(t => {\r
          const i = e.material[t];\r
          if (i !== null && typeof i === 'object' && typeof i.dispose === 'function') {\r
            i.dispose();\r
          }\r
        });\r
        e.material.dispose();\r
        e.geometry.dispose();\r
      }\r
    });\r
    this.scene.clear();\r
  }\r
  dispose() {\r
    this.#y();\r
    this.#z();\r
    this.clear();\r
    this.#t?.dispose();\r
    this.renderer.dispose();\r
    this.isDisposed = true;\r
  }\r
}\r
\r
const b = new Map(),\r
  A = new r();\r
let R = false;\r
function S(e) {\r
  const t = {\r
    position: new r(),\r
    nPosition: new r(),\r
    hover: false,\r
    touching: false,\r
    onEnter() {},\r
    onMove() {},\r
    onClick() {},\r
    onLeave() {},\r
    ...e\r
  };\r
  (function (e, t) {\r
    if (!b.has(e)) {\r
      b.set(e, t);\r
      if (!R) {\r
        document.body.addEventListener('pointermove', M);\r
        document.body.addEventListener('pointerleave', L);\r
        document.body.addEventListener('click', C);\r
\r
        document.body.addEventListener('touchstart', TouchStart, { passive: false });\r
        document.body.addEventListener('touchmove', TouchMove, { passive: false });\r
        document.body.addEventListener('touchend', TouchEnd, { passive: false });\r
        document.body.addEventListener('touchcancel', TouchEnd, { passive: false });\r
\r
        R = true;\r
      }\r
    }\r
  })(e.domElement, t);\r
  t.dispose = () => {\r
    const t = e.domElement;\r
    b.delete(t);\r
    if (b.size === 0) {\r
      document.body.removeEventListener('pointermove', M);\r
      document.body.removeEventListener('pointerleave', L);\r
      document.body.removeEventListener('click', C);\r
\r
      document.body.removeEventListener('touchstart', TouchStart);\r
      document.body.removeEventListener('touchmove', TouchMove);\r
      document.body.removeEventListener('touchend', TouchEnd);\r
      document.body.removeEventListener('touchcancel', TouchEnd);\r
\r
      R = false;\r
    }\r
  };\r
  return t;\r
}\r
\r
function M(e) {\r
  A.x = e.clientX;\r
  A.y = e.clientY;\r
  processInteraction();\r
}\r
\r
function processInteraction() {\r
  for (const [elem, t] of b) {\r
    const i = elem.getBoundingClientRect();\r
    if (D(i)) {\r
      P(t, i);\r
      if (!t.hover) {\r
        t.hover = true;\r
        t.onEnter(t);\r
      }\r
      t.onMove(t);\r
    } else if (t.hover && !t.touching) {\r
      t.hover = false;\r
      t.onLeave(t);\r
    }\r
  }\r
}\r
\r
function C(e) {\r
  A.x = e.clientX;\r
  A.y = e.clientY;\r
  for (const [elem, t] of b) {\r
    const i = elem.getBoundingClientRect();\r
    P(t, i);\r
    if (D(i)) t.onClick(t);\r
  }\r
}\r
\r
function L() {\r
  for (const t of b.values()) {\r
    if (t.hover) {\r
      t.hover = false;\r
      t.onLeave(t);\r
    }\r
  }\r
}\r
\r
function TouchStart(e) {\r
  if (e.touches.length > 0) {\r
    e.preventDefault();\r
    A.x = e.touches[0].clientX;\r
    A.y = e.touches[0].clientY;\r
\r
    for (const [elem, t] of b) {\r
      const rect = elem.getBoundingClientRect();\r
      if (D(rect)) {\r
        t.touching = true;\r
        P(t, rect);\r
        if (!t.hover) {\r
          t.hover = true;\r
          t.onEnter(t);\r
        }\r
        t.onMove(t);\r
      }\r
    }\r
  }\r
}\r
\r
function TouchMove(e) {\r
  if (e.touches.length > 0) {\r
    e.preventDefault();\r
    A.x = e.touches[0].clientX;\r
    A.y = e.touches[0].clientY;\r
\r
    for (const [elem, t] of b) {\r
      const rect = elem.getBoundingClientRect();\r
      P(t, rect);\r
\r
      if (D(rect)) {\r
        if (!t.hover) {\r
          t.hover = true;\r
          t.touching = true;\r
          t.onEnter(t);\r
        }\r
        t.onMove(t);\r
      } else if (t.hover && t.touching) {\r
        t.onMove(t);\r
      }\r
    }\r
  }\r
}\r
\r
function TouchEnd() {\r
  for (const [, t] of b) {\r
    if (t.touching) {\r
      t.touching = false;\r
      if (t.hover) {\r
        t.hover = false;\r
        t.onLeave(t);\r
      }\r
    }\r
  }\r
}\r
\r
function P(e, t) {\r
  const { position: i, nPosition: s } = e;\r
  i.x = A.x - t.left;\r
  i.y = A.y - t.top;\r
  s.x = (i.x / t.width) * 2 - 1;\r
  s.y = (-i.y / t.height) * 2 + 1;\r
}\r
function D(e) {\r
  const { x: t, y: i } = A;\r
  const { left: s, top: n, width: o, height: r } = e;\r
  return t >= s && t <= s + o && i >= n && i <= n + r;\r
}\r
\r
const { randFloat: k, randFloatSpread: E } = o;\r
const F = new a();\r
const I = new a();\r
const O = new a();\r
const V = new a();\r
const B = new a();\r
const N = new a();\r
const _ = new a();\r
const j = new a();\r
const H = new a();\r
const T = new a();\r
\r
class W {\r
  constructor(e) {\r
    this.config = e;\r
    this.positionData = new Float32Array(3 * e.count).fill(0);\r
    this.velocityData = new Float32Array(3 * e.count).fill(0);\r
    this.sizeData = new Float32Array(e.count).fill(1);\r
    this.center = new a();\r
    this.#R();\r
    this.setSizes();\r
  }\r
  #R() {\r
    const { config: e, positionData: t } = this;\r
    this.center.toArray(t, 0);\r
    for (let i = 1; i < e.count; i++) {\r
      const s = 3 * i;\r
      t[s] = E(2 * e.maxX);\r
      t[s + 1] = E(2 * e.maxY);\r
      t[s + 2] = E(2 * e.maxZ);\r
    }\r
  }\r
  setSizes() {\r
    const { config: e, sizeData: t } = this;\r
    t[0] = e.size0;\r
    for (let i = 1; i < e.count; i++) {\r
      t[i] = k(e.minSize, e.maxSize);\r
    }\r
  }\r
  update(e) {\r
    const { config: t, center: i, positionData: s, sizeData: n, velocityData: o } = this;\r
    let r = 0;\r
    if (t.controlSphere0) {\r
      r = 1;\r
      F.fromArray(s, 0);\r
      F.lerp(i, 0.1).toArray(s, 0);\r
      V.set(0, 0, 0).toArray(o, 0);\r
    }\r
    for (let idx = r; idx < t.count; idx++) {\r
      const base = 3 * idx;\r
      I.fromArray(s, base);\r
      B.fromArray(o, base);\r
      B.y -= e.delta * t.gravity * n[idx];\r
      B.multiplyScalar(t.friction);\r
      B.clampLength(0, t.maxVelocity);\r
      I.add(B);\r
      I.toArray(s, base);\r
      B.toArray(o, base);\r
    }\r
    for (let idx = r; idx < t.count; idx++) {\r
      const base = 3 * idx;\r
      I.fromArray(s, base);\r
      B.fromArray(o, base);\r
      const radius = n[idx];\r
      for (let jdx = idx + 1; jdx < t.count; jdx++) {\r
        const otherBase = 3 * jdx;\r
        O.fromArray(s, otherBase);\r
        N.fromArray(o, otherBase);\r
        const otherRadius = n[jdx];\r
        _.copy(O).sub(I);\r
        const dist = _.length();\r
        const sumRadius = radius + otherRadius;\r
        if (dist < sumRadius) {\r
          const overlap = sumRadius - dist;\r
          j.copy(_)\r
            .normalize()\r
            .multiplyScalar(0.5 * overlap);\r
          H.copy(j).multiplyScalar(Math.max(B.length(), 1));\r
          T.copy(j).multiplyScalar(Math.max(N.length(), 1));\r
          I.sub(j);\r
          B.sub(H);\r
          I.toArray(s, base);\r
          B.toArray(o, base);\r
          O.add(j);\r
          N.add(T);\r
          O.toArray(s, otherBase);\r
          N.toArray(o, otherBase);\r
        }\r
      }\r
      if (t.controlSphere0) {\r
        _.copy(F).sub(I);\r
        const dist = _.length();\r
        const sumRadius0 = radius + n[0];\r
        if (dist < sumRadius0) {\r
          const diff = sumRadius0 - dist;\r
          j.copy(_.normalize()).multiplyScalar(diff);\r
          H.copy(j).multiplyScalar(Math.max(B.length(), 2));\r
          I.sub(j);\r
          B.sub(H);\r
        }\r
      }\r
      if (Math.abs(I.x) + radius > t.maxX) {\r
        I.x = Math.sign(I.x) * (t.maxX - radius);\r
        B.x = -B.x * t.wallBounce;\r
      }\r
      if (t.gravity === 0) {\r
        if (Math.abs(I.y) + radius > t.maxY) {\r
          I.y = Math.sign(I.y) * (t.maxY - radius);\r
          B.y = -B.y * t.wallBounce;\r
        }\r
      } else if (I.y - radius < -t.maxY) {\r
        I.y = -t.maxY + radius;\r
        B.y = -B.y * t.wallBounce;\r
      }\r
      const maxBoundary = Math.max(t.maxZ, t.maxSize);\r
      if (Math.abs(I.z) + radius > maxBoundary) {\r
        I.z = Math.sign(I.z) * (t.maxZ - radius);\r
        B.z = -B.z * t.wallBounce;\r
      }\r
      I.toArray(s, base);\r
      B.toArray(o, base);\r
    }\r
  }\r
}\r
\r
class Y extends c {\r
  constructor(e) {\r
    super(e);\r
    this.uniforms = {\r
      thicknessDistortion: { value: 0.1 },\r
      thicknessAmbient: { value: 0 },\r
      thicknessAttenuation: { value: 0.1 },\r
      thicknessPower: { value: 2 },\r
      thicknessScale: { value: 10 }\r
    };\r
    this.defines.USE_UV = '';\r
    this.onBeforeCompile = e => {\r
      Object.assign(e.uniforms, this.uniforms);\r
      e.fragmentShader =\r
        '\\n        uniform float thicknessPower;\\n        uniform float thicknessScale;\\n        uniform float thicknessDistortion;\\n        uniform float thicknessAmbient;\\n        uniform float thicknessAttenuation;\\n      ' +\r
        e.fragmentShader;\r
      e.fragmentShader = e.fragmentShader.replace(\r
        'void main() {',\r
        '\\n        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\\n          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\\n          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\\n          #ifdef USE_COLOR\\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\\n          #else\\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;\\n          #endif\\n          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\\n        }\\n\\n        void main() {\\n      '\r
      );\r
      const t = h.lights_fragment_begin.replaceAll(\r
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',\r
        '\\n          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\\n          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\\n        '\r
      );\r
      e.fragmentShader = e.fragmentShader.replace('#include <lights_fragment_begin>', t);\r
      if (this.onBeforeCompile2) this.onBeforeCompile2(e);\r
    };\r
  }\r
}\r
\r
const X = {\r
  count: 200,\r
  colors: [0, 0, 0],\r
  ambientColor: 16777215,\r
  ambientIntensity: 1,\r
  lightIntensity: 200,\r
  materialParams: {\r
    metalness: 0.5,\r
    roughness: 0.5,\r
    clearcoat: 1,\r
    clearcoatRoughness: 0.15\r
  },\r
  minSize: 0.5,\r
  maxSize: 1,\r
  size0: 1,\r
  gravity: 0.5,\r
  friction: 0.9975,\r
  wallBounce: 0.95,\r
  maxVelocity: 0.15,\r
  maxX: 5,\r
  maxY: 5,\r
  maxZ: 2,\r
  controlSphere0: false,\r
  followCursor: true\r
};\r
\r
const U = new m();\r
\r
class Z extends d {\r
  constructor(e, t = {}) {\r
    const i = { ...X, ...t };\r
    const s = new z();\r
    const n = new p(e, 0.04).fromScene(s).texture;\r
    const o = new g();\r
    const r = new Y({ envMap: n, ...i.materialParams });\r
    r.envMapRotation.x = -Math.PI / 2;\r
    super(o, r, i.count);\r
    this.config = i;\r
    this.physics = new W(i);\r
    this.#S();\r
    this.setColors(i.colors);\r
  }\r
  #S() {\r
    this.ambientLight = new f(this.config.ambientColor, this.config.ambientIntensity);\r
    this.add(this.ambientLight);\r
    this.light = new u(this.config.colors[0], this.config.lightIntensity);\r
    this.add(this.light);\r
  }\r
  setColors(e) {\r
    if (Array.isArray(e) && e.length > 1) {\r
      const t = (function (e) {\r
        let t, i;\r
        function setColors(e) {\r
          t = e;\r
          i = [];\r
          t.forEach(col => {\r
            i.push(new l(col));\r
          });\r
        }\r
        setColors(e);\r
        return {\r
          setColors,\r
          getColorAt: function (ratio, out = new l()) {\r
            const scaled = Math.max(0, Math.min(1, ratio)) * (t.length - 1);\r
            const idx = Math.floor(scaled);\r
            const start = i[idx];\r
            if (idx >= t.length - 1) return start.clone();\r
            const alpha = scaled - idx;\r
            const end = i[idx + 1];\r
            out.r = start.r + alpha * (end.r - start.r);\r
            out.g = start.g + alpha * (end.g - start.g);\r
            out.b = start.b + alpha * (end.b - start.b);\r
            return out;\r
          }\r
        };\r
      })(e);\r
      for (let idx = 0; idx < this.count; idx++) {\r
        this.setColorAt(idx, t.getColorAt(idx / this.count));\r
        if (idx === 0) {\r
          this.light.color.copy(t.getColorAt(idx / this.count));\r
        }\r
      }\r
      this.instanceColor.needsUpdate = true;\r
    }\r
  }\r
  update(e) {\r
    this.physics.update(e);\r
    for (let idx = 0; idx < this.count; idx++) {\r
      U.position.fromArray(this.physics.positionData, 3 * idx);\r
      if (idx === 0 && this.config.followCursor === false) {\r
        U.scale.setScalar(0);\r
      } else {\r
        U.scale.setScalar(this.physics.sizeData[idx]);\r
      }\r
      U.updateMatrix();\r
      this.setMatrixAt(idx, U.matrix);\r
      if (idx === 0) this.light.position.copy(U.position);\r
    }\r
    this.instanceMatrix.needsUpdate = true;\r
  }\r
}\r
\r
function createBallpit(e, t = {}) {\r
  const i = new x({\r
    canvas: e,\r
    size: 'parent',\r
    rendererOptions: { antialias: true, alpha: true }\r
  });\r
  let s;\r
  i.renderer.toneMapping = v;\r
  i.camera.position.set(0, 0, 20);\r
  i.camera.lookAt(0, 0, 0);\r
  i.cameraMaxAspect = 1.5;\r
  i.resize();\r
  initialize(t);\r
  const n = new y();\r
  const o = new w(new a(0, 0, 1), 0);\r
  const r = new a();\r
  let c = false;\r
\r
  e.style.touchAction = 'none';\r
  e.style.userSelect = 'none';\r
  e.style.webkitUserSelect = 'none';\r
\r
  const h = S({\r
    domElement: e,\r
    onMove() {\r
      n.setFromCamera(h.nPosition, i.camera);\r
      i.camera.getWorldDirection(o.normal);\r
      n.ray.intersectPlane(o, r);\r
      s.physics.center.copy(r);\r
      s.config.controlSphere0 = true;\r
    },\r
    onLeave() {\r
      s.config.controlSphere0 = false;\r
    }\r
  });\r
  function initialize(e) {\r
    if (s) {\r
      i.clear();\r
      i.scene.remove(s);\r
    }\r
    s = new Z(i.renderer, e);\r
    i.scene.add(s);\r
  }\r
  i.onBeforeRender = e => {\r
    if (!c) s.update(e);\r
  };\r
  i.onAfterResize = e => {\r
    s.config.maxX = e.wWidth / 2;\r
    s.config.maxY = e.wHeight / 2;\r
  };\r
  return {\r
    three: i,\r
    get spheres() {\r
      return s;\r
    },\r
    setCount(e) {\r
      initialize({ ...s.config, count: e });\r
    },\r
    togglePause() {\r
      c = !c;\r
    },\r
    dispose() {\r
      h.dispose();\r
      i.dispose();\r
    }\r
  };\r
}\r
\r
const Ballpit = ({ className = '', followCursor = true, ...props }) => {\r
  const canvasRef = useRef(null);\r
  const spheresInstanceRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    spheresInstanceRef.current = createBallpit(canvas, { followCursor, ...props });\r
\r
    return () => {\r
      if (spheresInstanceRef.current) {\r
        spheresInstanceRef.current.dispose();\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  return <canvas className={\`\${className} w-full h-full\`} ref={canvasRef} />;\r
};\r
\r
export default Ballpit;\r
`,B=`import React, { useRef, useEffect } from 'react';\r
import {\r
  Clock,\r
  PerspectiveCamera,\r
  Scene,\r
  WebGLRenderer,\r
  WebGLRendererParameters,\r
  SRGBColorSpace,\r
  MathUtils,\r
  Vector2,\r
  Vector3,\r
  MeshPhysicalMaterial,\r
  ShaderChunk,\r
  Color,\r
  Object3D,\r
  InstancedMesh,\r
  PMREMGenerator,\r
  SphereGeometry,\r
  AmbientLight,\r
  PointLight,\r
  ACESFilmicToneMapping,\r
  Raycaster,\r
  Plane\r
} from 'three';\r
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';\r
import { Observer } from 'gsap/Observer';\r
import { gsap } from 'gsap';\r
\r
gsap.registerPlugin(Observer);\r
\r
interface XConfig {\r
  canvas?: HTMLCanvasElement;\r
  id?: string;\r
  rendererOptions?: Partial<WebGLRendererParameters>;\r
  size?: 'parent' | { width: number; height: number };\r
}\r
\r
interface SizeData {\r
  width: number;\r
  height: number;\r
  wWidth: number;\r
  wHeight: number;\r
  ratio: number;\r
  pixelRatio: number;\r
}\r
\r
class X {\r
  #config: XConfig;\r
  #postprocessing: any;\r
  #resizeObserver?: ResizeObserver;\r
  #intersectionObserver?: IntersectionObserver;\r
  #resizeTimer?: number;\r
  #animationFrameId: number = 0;\r
  #clock: Clock = new Clock();\r
  #animationState = { elapsed: 0, delta: 0 };\r
  #isAnimating: boolean = false;\r
  #isVisible: boolean = false;\r
\r
  canvas!: HTMLCanvasElement;\r
  camera!: PerspectiveCamera;\r
  cameraMinAspect?: number;\r
  cameraMaxAspect?: number;\r
  cameraFov!: number;\r
  maxPixelRatio?: number;\r
  minPixelRatio?: number;\r
  scene!: Scene;\r
  renderer!: WebGLRenderer;\r
  size: SizeData = {\r
    width: 0,\r
    height: 0,\r
    wWidth: 0,\r
    wHeight: 0,\r
    ratio: 0,\r
    pixelRatio: 0\r
  };\r
\r
  render: () => void = this.#render.bind(this);\r
  onBeforeRender: (state: { elapsed: number; delta: number }) => void = () => {};\r
  onAfterRender: (state: { elapsed: number; delta: number }) => void = () => {};\r
  onAfterResize: (size: SizeData) => void = () => {};\r
  isDisposed: boolean = false;\r
\r
  constructor(config: XConfig) {\r
    this.#config = { ...config };\r
    this.#initCamera();\r
    this.#initScene();\r
    this.#initRenderer();\r
    this.resize();\r
    this.#initObservers();\r
  }\r
\r
  #initCamera() {\r
    this.camera = new PerspectiveCamera();\r
    this.cameraFov = this.camera.fov;\r
  }\r
\r
  #initScene() {\r
    this.scene = new Scene();\r
  }\r
\r
  #initRenderer() {\r
    if (this.#config.canvas) {\r
      this.canvas = this.#config.canvas;\r
    } else if (this.#config.id) {\r
      const elem = document.getElementById(this.#config.id);\r
      if (elem instanceof HTMLCanvasElement) {\r
        this.canvas = elem;\r
      } else {\r
        console.error('Three: Missing canvas or id parameter');\r
      }\r
    } else {\r
      console.error('Three: Missing canvas or id parameter');\r
    }\r
    this.canvas!.style.display = 'block';\r
    const rendererOptions: WebGLRendererParameters = {\r
      canvas: this.canvas,\r
      powerPreference: 'high-performance',\r
      ...(this.#config.rendererOptions ?? {})\r
    };\r
    this.renderer = new WebGLRenderer(rendererOptions);\r
    this.renderer.outputColorSpace = SRGBColorSpace;\r
  }\r
\r
  #initObservers() {\r
    if (!(this.#config.size instanceof Object)) {\r
      window.addEventListener('resize', this.#onResize.bind(this));\r
      if (this.#config.size === 'parent' && this.canvas.parentNode) {\r
        this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this));\r
        this.#resizeObserver.observe(this.canvas.parentNode as Element);\r
      }\r
    }\r
    this.#intersectionObserver = new IntersectionObserver(this.#onIntersection.bind(this), {\r
      root: null,\r
      rootMargin: '0px',\r
      threshold: 0\r
    });\r
    this.#intersectionObserver.observe(this.canvas);\r
    document.addEventListener('visibilitychange', this.#onVisibilityChange.bind(this));\r
  }\r
\r
  #onResize() {\r
    if (this.#resizeTimer) clearTimeout(this.#resizeTimer);\r
    this.#resizeTimer = window.setTimeout(this.resize.bind(this), 100);\r
  }\r
\r
  resize() {\r
    let w: number, h: number;\r
    if (this.#config.size instanceof Object) {\r
      w = this.#config.size.width;\r
      h = this.#config.size.height;\r
    } else if (this.#config.size === 'parent' && this.canvas.parentNode) {\r
      w = (this.canvas.parentNode as HTMLElement).offsetWidth;\r
      h = (this.canvas.parentNode as HTMLElement).offsetHeight;\r
    } else {\r
      w = window.innerWidth;\r
      h = window.innerHeight;\r
    }\r
    this.size.width = w;\r
    this.size.height = h;\r
    this.size.ratio = w / h;\r
    this.#updateCamera();\r
    this.#updateRenderer();\r
    this.onAfterResize(this.size);\r
  }\r
\r
  #updateCamera() {\r
    this.camera.aspect = this.size.width / this.size.height;\r
    if (this.camera.isPerspectiveCamera && this.cameraFov) {\r
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {\r
        this.#adjustFov(this.cameraMinAspect);\r
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {\r
        this.#adjustFov(this.cameraMaxAspect);\r
      } else {\r
        this.camera.fov = this.cameraFov;\r
      }\r
    }\r
    this.camera.updateProjectionMatrix();\r
    this.updateWorldSize();\r
  }\r
\r
  #adjustFov(aspect: number) {\r
    const tanFov = Math.tan(MathUtils.degToRad(this.cameraFov / 2));\r
    const newTan = tanFov / (this.camera.aspect / aspect);\r
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(newTan));\r
  }\r
\r
  updateWorldSize() {\r
    if (this.camera.isPerspectiveCamera) {\r
      const fovRad = (this.camera.fov * Math.PI) / 180;\r
      this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length();\r
      this.size.wWidth = this.size.wHeight * this.camera.aspect;\r
    } else if ((this.camera as any).isOrthographicCamera) {\r
      const cam = this.camera as any;\r
      this.size.wHeight = cam.top - cam.bottom;\r
      this.size.wWidth = cam.right - cam.left;\r
    }\r
  }\r
\r
  #updateRenderer() {\r
    this.renderer.setSize(this.size.width, this.size.height);\r
    this.#postprocessing?.setSize(this.size.width, this.size.height);\r
    let pr = window.devicePixelRatio;\r
    if (this.maxPixelRatio && pr > this.maxPixelRatio) {\r
      pr = this.maxPixelRatio;\r
    } else if (this.minPixelRatio && pr < this.minPixelRatio) {\r
      pr = this.minPixelRatio;\r
    }\r
    this.renderer.setPixelRatio(pr);\r
    this.size.pixelRatio = pr;\r
  }\r
\r
  get postprocessing() {\r
    return this.#postprocessing;\r
  }\r
  set postprocessing(value: any) {\r
    this.#postprocessing = value;\r
    this.render = value.render.bind(value);\r
  }\r
\r
  #onIntersection(entries: IntersectionObserverEntry[]) {\r
    this.#isAnimating = entries[0].isIntersecting;\r
    this.#isAnimating ? this.#startAnimation() : this.#stopAnimation();\r
  }\r
\r
  #onVisibilityChange() {\r
    if (this.#isAnimating) {\r
      document.hidden ? this.#stopAnimation() : this.#startAnimation();\r
    }\r
  }\r
\r
  #startAnimation() {\r
    if (this.#isVisible) return;\r
    const animateFrame = () => {\r
      this.#animationFrameId = requestAnimationFrame(animateFrame);\r
      this.#animationState.delta = this.#clock.getDelta();\r
      this.#animationState.elapsed += this.#animationState.delta;\r
      this.onBeforeRender(this.#animationState);\r
      this.render();\r
      this.onAfterRender(this.#animationState);\r
    };\r
    this.#isVisible = true;\r
    this.#clock.start();\r
    animateFrame();\r
  }\r
\r
  #stopAnimation() {\r
    if (this.#isVisible) {\r
      cancelAnimationFrame(this.#animationFrameId);\r
      this.#isVisible = false;\r
      this.#clock.stop();\r
    }\r
  }\r
\r
  #render() {\r
    this.renderer.render(this.scene, this.camera);\r
  }\r
\r
  clear() {\r
    this.scene.traverse(obj => {\r
      if ((obj as any).isMesh && typeof (obj as any).material === 'object' && (obj as any).material !== null) {\r
        Object.keys((obj as any).material).forEach(key => {\r
          const matProp = (obj as any).material[key];\r
          if (matProp && typeof matProp === 'object' && typeof matProp.dispose === 'function') {\r
            matProp.dispose();\r
          }\r
        });\r
        (obj as any).material.dispose();\r
        (obj as any).geometry.dispose();\r
      }\r
    });\r
    this.scene.clear();\r
  }\r
\r
  dispose() {\r
    this.#onResizeCleanup();\r
    this.#stopAnimation();\r
    this.clear();\r
    this.#postprocessing?.dispose();\r
    this.renderer.dispose();\r
    this.isDisposed = true;\r
  }\r
\r
  #onResizeCleanup() {\r
    window.removeEventListener('resize', this.#onResize.bind(this));\r
    this.#resizeObserver?.disconnect();\r
    this.#intersectionObserver?.disconnect();\r
    document.removeEventListener('visibilitychange', this.#onVisibilityChange.bind(this));\r
  }\r
}\r
\r
interface WConfig {\r
  count: number;\r
  maxX: number;\r
  maxY: number;\r
  maxZ: number;\r
  maxSize: number;\r
  minSize: number;\r
  size0: number;\r
  gravity: number;\r
  friction: number;\r
  wallBounce: number;\r
  maxVelocity: number;\r
  controlSphere0?: boolean;\r
  followCursor?: boolean;\r
}\r
\r
class W {\r
  config: WConfig;\r
  positionData: Float32Array;\r
  velocityData: Float32Array;\r
  sizeData: Float32Array;\r
  center: Vector3 = new Vector3();\r
\r
  constructor(config: WConfig) {\r
    this.config = config;\r
    this.positionData = new Float32Array(3 * config.count).fill(0);\r
    this.velocityData = new Float32Array(3 * config.count).fill(0);\r
    this.sizeData = new Float32Array(config.count).fill(1);\r
    this.center = new Vector3();\r
    this.#initializePositions();\r
    this.setSizes();\r
  }\r
\r
  #initializePositions() {\r
    const { config, positionData } = this;\r
    this.center.toArray(positionData, 0);\r
    for (let i = 1; i < config.count; i++) {\r
      const idx = 3 * i;\r
      positionData[idx] = MathUtils.randFloatSpread(2 * config.maxX);\r
      positionData[idx + 1] = MathUtils.randFloatSpread(2 * config.maxY);\r
      positionData[idx + 2] = MathUtils.randFloatSpread(2 * config.maxZ);\r
    }\r
  }\r
\r
  setSizes() {\r
    const { config, sizeData } = this;\r
    sizeData[0] = config.size0;\r
    for (let i = 1; i < config.count; i++) {\r
      sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);\r
    }\r
  }\r
\r
  update(deltaInfo: { delta: number }) {\r
    const { config, center, positionData, sizeData, velocityData } = this;\r
    let startIdx = 0;\r
    if (config.controlSphere0) {\r
      startIdx = 1;\r
      const firstVec = new Vector3().fromArray(positionData, 0);\r
      firstVec.lerp(center, 0.1).toArray(positionData, 0);\r
      new Vector3(0, 0, 0).toArray(velocityData, 0);\r
    }\r
    for (let idx = startIdx; idx < config.count; idx++) {\r
      const base = 3 * idx;\r
      const pos = new Vector3().fromArray(positionData, base);\r
      const vel = new Vector3().fromArray(velocityData, base);\r
      vel.y -= deltaInfo.delta * config.gravity * sizeData[idx];\r
      vel.multiplyScalar(config.friction);\r
      vel.clampLength(0, config.maxVelocity);\r
      pos.add(vel);\r
      pos.toArray(positionData, base);\r
      vel.toArray(velocityData, base);\r
    }\r
    for (let idx = startIdx; idx < config.count; idx++) {\r
      const base = 3 * idx;\r
      const pos = new Vector3().fromArray(positionData, base);\r
      const vel = new Vector3().fromArray(velocityData, base);\r
      const radius = sizeData[idx];\r
      for (let jdx = idx + 1; jdx < config.count; jdx++) {\r
        const otherBase = 3 * jdx;\r
        const otherPos = new Vector3().fromArray(positionData, otherBase);\r
        const otherVel = new Vector3().fromArray(velocityData, otherBase);\r
        const diff = new Vector3().copy(otherPos).sub(pos);\r
        const dist = diff.length();\r
        const sumRadius = radius + sizeData[jdx];\r
        if (dist < sumRadius) {\r
          const overlap = sumRadius - dist;\r
          const correction = diff.normalize().multiplyScalar(0.5 * overlap);\r
          const velCorrection = correction.clone().multiplyScalar(Math.max(vel.length(), 1));\r
          pos.sub(correction);\r
          vel.sub(velCorrection);\r
          pos.toArray(positionData, base);\r
          vel.toArray(velocityData, base);\r
          otherPos.add(correction);\r
          otherVel.add(correction.clone().multiplyScalar(Math.max(otherVel.length(), 1)));\r
          otherPos.toArray(positionData, otherBase);\r
          otherVel.toArray(velocityData, otherBase);\r
        }\r
      }\r
      if (config.controlSphere0) {\r
        const diff = new Vector3().copy(new Vector3().fromArray(positionData, 0)).sub(pos);\r
        const d = diff.length();\r
        const sumRadius0 = radius + sizeData[0];\r
        if (d < sumRadius0) {\r
          const correction = diff.normalize().multiplyScalar(sumRadius0 - d);\r
          const velCorrection = correction.clone().multiplyScalar(Math.max(vel.length(), 2));\r
          pos.sub(correction);\r
          vel.sub(velCorrection);\r
        }\r
      }\r
      if (Math.abs(pos.x) + radius > config.maxX) {\r
        pos.x = Math.sign(pos.x) * (config.maxX - radius);\r
        vel.x = -vel.x * config.wallBounce;\r
      }\r
      if (config.gravity === 0) {\r
        if (Math.abs(pos.y) + radius > config.maxY) {\r
          pos.y = Math.sign(pos.y) * (config.maxY - radius);\r
          vel.y = -vel.y * config.wallBounce;\r
        }\r
      } else if (pos.y - radius < -config.maxY) {\r
        pos.y = -config.maxY + radius;\r
        vel.y = -vel.y * config.wallBounce;\r
      }\r
      const maxBoundary = Math.max(config.maxZ, config.maxSize);\r
      if (Math.abs(pos.z) + radius > maxBoundary) {\r
        pos.z = Math.sign(pos.z) * (config.maxZ - radius);\r
        vel.z = -vel.z * config.wallBounce;\r
      }\r
      pos.toArray(positionData, base);\r
      vel.toArray(velocityData, base);\r
    }\r
  }\r
}\r
\r
class Y extends MeshPhysicalMaterial {\r
  uniforms: { [key: string]: { value: any } } = {\r
    thicknessDistortion: { value: 0.1 },\r
    thicknessAmbient: { value: 0 },\r
    thicknessAttenuation: { value: 0.1 },\r
    thicknessPower: { value: 2 },\r
    thicknessScale: { value: 10 }\r
  };\r
\r
  constructor(params: any) {\r
    super(params);\r
    this.defines = { USE_UV: '' };\r
    this.onBeforeCompile = shader => {\r
      Object.assign(shader.uniforms, this.uniforms);\r
      shader.fragmentShader =\r
        \`\r
        uniform float thicknessPower;\r
        uniform float thicknessScale;\r
        uniform float thicknessDistortion;\r
        uniform float thicknessAmbient;\r
        uniform float thicknessAttenuation;\r
        \` + shader.fragmentShader;\r
      shader.fragmentShader = shader.fragmentShader.replace(\r
        'void main() {',\r
        \`\r
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\r
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\r
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\r
          #ifdef USE_COLOR\r
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\r
          #else\r
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;\r
          #endif\r
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\r
        }\r
\r
        void main() {\r
        \`\r
      );\r
      const lightsChunk = ShaderChunk.lights_fragment_begin.replaceAll(\r
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',\r
        \`\r
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\r
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\r
        \`\r
      );\r
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', lightsChunk);\r
      if (this.onBeforeCompile2) this.onBeforeCompile2(shader);\r
    };\r
  }\r
  onBeforeCompile2?: (shader: any) => void;\r
}\r
\r
const XConfig = {\r
  count: 200,\r
  colors: [0, 0, 0],\r
  ambientColor: 0xffffff,\r
  ambientIntensity: 1,\r
  lightIntensity: 200,\r
  materialParams: {\r
    metalness: 0.5,\r
    roughness: 0.5,\r
    clearcoat: 1,\r
    clearcoatRoughness: 0.15\r
  },\r
  minSize: 0.5,\r
  maxSize: 1,\r
  size0: 1,\r
  gravity: 0.5,\r
  friction: 0.9975,\r
  wallBounce: 0.95,\r
  maxVelocity: 0.15,\r
  maxX: 5,\r
  maxY: 5,\r
  maxZ: 2,\r
  controlSphere0: false,\r
  followCursor: true\r
};\r
\r
const U = new Object3D();\r
\r
let globalPointerActive = false;\r
const pointerPosition = new Vector2();\r
\r
interface PointerData {\r
  position: Vector2;\r
  nPosition: Vector2;\r
  hover: boolean;\r
  touching: boolean;\r
  onEnter: (data: PointerData) => void;\r
  onMove: (data: PointerData) => void;\r
  onClick: (data: PointerData) => void;\r
  onLeave: (data: PointerData) => void;\r
  dispose?: () => void;\r
}\r
\r
const pointerMap = new Map<HTMLElement, PointerData>();\r
\r
function createPointerData(options: Partial<PointerData> & { domElement: HTMLElement }): PointerData {\r
  const defaultData: PointerData = {\r
    position: new Vector2(),\r
    nPosition: new Vector2(),\r
    hover: false,\r
    touching: false,\r
    onEnter: () => {},\r
    onMove: () => {},\r
    onClick: () => {},\r
    onLeave: () => {},\r
    ...options\r
  };\r
  if (!pointerMap.has(options.domElement)) {\r
    pointerMap.set(options.domElement, defaultData);\r
    if (!globalPointerActive) {\r
      document.body.addEventListener('pointermove', onPointerMove as EventListener);\r
      document.body.addEventListener('pointerleave', onPointerLeave as EventListener);\r
      document.body.addEventListener('click', onPointerClick as EventListener);\r
\r
      document.body.addEventListener('touchstart', onTouchStart as EventListener, { passive: false });\r
      document.body.addEventListener('touchmove', onTouchMove as EventListener, { passive: false });\r
      document.body.addEventListener('touchend', onTouchEnd as EventListener, { passive: false });\r
      document.body.addEventListener('touchcancel', onTouchEnd as EventListener, { passive: false });\r
      globalPointerActive = true;\r
    }\r
  }\r
  defaultData.dispose = () => {\r
    pointerMap.delete(options.domElement);\r
    if (pointerMap.size === 0) {\r
      document.body.removeEventListener('pointermove', onPointerMove as EventListener);\r
      document.body.removeEventListener('pointerleave', onPointerLeave as EventListener);\r
      document.body.removeEventListener('click', onPointerClick as EventListener);\r
\r
      document.body.removeEventListener('touchstart', onTouchStart as EventListener);\r
      document.body.removeEventListener('touchmove', onTouchMove as EventListener);\r
      document.body.removeEventListener('touchend', onTouchEnd as EventListener);\r
      document.body.removeEventListener('touchcancel', onTouchEnd as EventListener);\r
      globalPointerActive = false;\r
    }\r
  };\r
  return defaultData;\r
}\r
\r
function onPointerMove(e: PointerEvent) {\r
  pointerPosition.set(e.clientX, e.clientY);\r
  processPointerInteraction();\r
}\r
\r
function processPointerInteraction() {\r
  for (const [elem, data] of pointerMap) {\r
    const rect = elem.getBoundingClientRect();\r
    if (isInside(rect)) {\r
      updatePointerData(data, rect);\r
      if (!data.hover) {\r
        data.hover = true;\r
        data.onEnter(data);\r
      }\r
      data.onMove(data);\r
    } else if (data.hover && !data.touching) {\r
      data.hover = false;\r
      data.onLeave(data);\r
    }\r
  }\r
}\r
\r
function onTouchStart(e: TouchEvent) {\r
  if (e.touches.length > 0) {\r
    e.preventDefault();\r
    pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);\r
    for (const [elem, data] of pointerMap) {\r
      const rect = elem.getBoundingClientRect();\r
      if (isInside(rect)) {\r
        data.touching = true;\r
        updatePointerData(data, rect);\r
        if (!data.hover) {\r
          data.hover = true;\r
          data.onEnter(data);\r
        }\r
        data.onMove(data);\r
      }\r
    }\r
  }\r
}\r
\r
function onTouchMove(e: TouchEvent) {\r
  if (e.touches.length > 0) {\r
    e.preventDefault();\r
    pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);\r
    for (const [elem, data] of pointerMap) {\r
      const rect = elem.getBoundingClientRect();\r
      updatePointerData(data, rect);\r
      if (isInside(rect)) {\r
        if (!data.hover) {\r
          data.hover = true;\r
          data.touching = true;\r
          data.onEnter(data);\r
        }\r
        data.onMove(data);\r
      } else if (data.hover && data.touching) {\r
        data.onMove(data);\r
      }\r
    }\r
  }\r
}\r
\r
function onTouchEnd() {\r
  for (const [, data] of pointerMap) {\r
    if (data.touching) {\r
      data.touching = false;\r
      if (data.hover) {\r
        data.hover = false;\r
        data.onLeave(data);\r
      }\r
    }\r
  }\r
}\r
\r
function onPointerClick(e: PointerEvent) {\r
  pointerPosition.set(e.clientX, e.clientY);\r
  for (const [elem, data] of pointerMap) {\r
    const rect = elem.getBoundingClientRect();\r
    updatePointerData(data, rect);\r
    if (isInside(rect)) data.onClick(data);\r
  }\r
}\r
\r
function onPointerLeave() {\r
  for (const data of pointerMap.values()) {\r
    if (data.hover) {\r
      data.hover = false;\r
      data.onLeave(data);\r
    }\r
  }\r
}\r
\r
function updatePointerData(data: PointerData, rect: DOMRect) {\r
  data.position.set(pointerPosition.x - rect.left, pointerPosition.y - rect.top);\r
  data.nPosition.set((data.position.x / rect.width) * 2 - 1, (-data.position.y / rect.height) * 2 + 1);\r
}\r
\r
function isInside(rect: DOMRect) {\r
  return (\r
    pointerPosition.x >= rect.left &&\r
    pointerPosition.x <= rect.left + rect.width &&\r
    pointerPosition.y >= rect.top &&\r
    pointerPosition.y <= rect.top + rect.height\r
  );\r
}\r
\r
const { randFloat, randFloatSpread } = MathUtils;\r
const F = new Vector3();\r
const I = new Vector3();\r
const O = new Vector3();\r
const V = new Vector3();\r
const B = new Vector3();\r
const N = new Vector3();\r
const _ = new Vector3();\r
const j = new Vector3();\r
const H = new Vector3();\r
const T = new Vector3();\r
\r
class Z extends InstancedMesh {\r
  config: typeof XConfig;\r
  physics: W;\r
  ambientLight: AmbientLight | undefined;\r
  light: PointLight | undefined;\r
\r
  constructor(renderer: WebGLRenderer, params: Partial<typeof XConfig> = {}) {\r
    const config = { ...XConfig, ...params };\r
    const roomEnv = new RoomEnvironment();\r
    const pmrem = new PMREMGenerator(renderer);\r
    const envTexture = pmrem.fromScene(roomEnv).texture;\r
    const geometry = new SphereGeometry();\r
    const material = new Y({ envMap: envTexture, ...config.materialParams });\r
    material.envMapRotation.x = -Math.PI / 2;\r
    super(geometry, material, config.count);\r
    this.config = config;\r
    this.physics = new W(config);\r
    this.#setupLights();\r
    this.setColors(config.colors);\r
  }\r
\r
  #setupLights() {\r
    this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity);\r
    this.add(this.ambientLight);\r
    this.light = new PointLight(this.config.colors[0], this.config.lightIntensity);\r
    this.add(this.light);\r
  }\r
\r
  setColors(colors: number[]) {\r
    if (Array.isArray(colors) && colors.length > 1) {\r
      const colorUtils = (function (colorsArr: number[]) {\r
        let baseColors: number[] = colorsArr;\r
        let colorObjects: Color[] = [];\r
        baseColors.forEach(col => {\r
          colorObjects.push(new Color(col));\r
        });\r
        return {\r
          setColors: (cols: number[]) => {\r
            baseColors = cols;\r
            colorObjects = [];\r
            baseColors.forEach(col => {\r
              colorObjects.push(new Color(col));\r
            });\r
          },\r
          getColorAt: (ratio: number, out: Color = new Color()) => {\r
            const clamped = Math.max(0, Math.min(1, ratio));\r
            const scaled = clamped * (baseColors.length - 1);\r
            const idx = Math.floor(scaled);\r
            const start = colorObjects[idx];\r
            if (idx >= baseColors.length - 1) return start.clone();\r
            const alpha = scaled - idx;\r
            const end = colorObjects[idx + 1];\r
            out.r = start.r + alpha * (end.r - start.r);\r
            out.g = start.g + alpha * (end.g - start.g);\r
            out.b = start.b + alpha * (end.b - start.b);\r
            return out;\r
          }\r
        };\r
      })(colors);\r
      for (let idx = 0; idx < this.count; idx++) {\r
        this.setColorAt(idx, colorUtils.getColorAt(idx / this.count));\r
        if (idx === 0) {\r
          this.light!.color.copy(colorUtils.getColorAt(idx / this.count));\r
        }\r
      }\r
\r
      if (!this.instanceColor) return;\r
      this.instanceColor.needsUpdate = true;\r
    }\r
  }\r
\r
  update(deltaInfo: { delta: number }) {\r
    this.physics.update(deltaInfo);\r
    for (let idx = 0; idx < this.count; idx++) {\r
      U.position.fromArray(this.physics.positionData, 3 * idx);\r
      if (idx === 0 && this.config.followCursor === false) {\r
        U.scale.setScalar(0);\r
      } else {\r
        U.scale.setScalar(this.physics.sizeData[idx]);\r
      }\r
      U.updateMatrix();\r
      this.setMatrixAt(idx, U.matrix);\r
      if (idx === 0) this.light!.position.copy(U.position);\r
    }\r
    this.instanceMatrix.needsUpdate = true;\r
  }\r
}\r
\r
interface CreateBallpitReturn {\r
  three: X;\r
  spheres: Z;\r
  setCount: (count: number) => void;\r
  togglePause: () => void;\r
  dispose: () => void;\r
}\r
\r
function createBallpit(canvas: HTMLCanvasElement, config: any = {}): CreateBallpitReturn {\r
  const threeInstance = new X({\r
    canvas,\r
    size: 'parent',\r
    rendererOptions: { antialias: true, alpha: true }\r
  });\r
  let spheres: Z;\r
  threeInstance.renderer.toneMapping = ACESFilmicToneMapping;\r
  threeInstance.camera.position.set(0, 0, 20);\r
  threeInstance.camera.lookAt(0, 0, 0);\r
  threeInstance.cameraMaxAspect = 1.5;\r
  threeInstance.resize();\r
  initialize(config);\r
  const raycaster = new Raycaster();\r
  const plane = new Plane(new Vector3(0, 0, 1), 0);\r
  const intersectionPoint = new Vector3();\r
  let isPaused = false;\r
\r
  canvas.style.touchAction = 'none';\r
  canvas.style.userSelect = 'none';\r
  (canvas.style as any).webkitUserSelect = 'none';\r
\r
  const pointerData = createPointerData({\r
    domElement: canvas,\r
    onMove() {\r
      raycaster.setFromCamera(pointerData.nPosition, threeInstance.camera);\r
      threeInstance.camera.getWorldDirection(plane.normal);\r
      raycaster.ray.intersectPlane(plane, intersectionPoint);\r
      spheres.physics.center.copy(intersectionPoint);\r
      spheres.config.controlSphere0 = true;\r
    },\r
    onLeave() {\r
      spheres.config.controlSphere0 = false;\r
    }\r
  });\r
  function initialize(cfg: any) {\r
    if (spheres) {\r
      threeInstance.clear();\r
      threeInstance.scene.remove(spheres);\r
    }\r
    spheres = new Z(threeInstance.renderer, cfg);\r
    threeInstance.scene.add(spheres);\r
  }\r
  threeInstance.onBeforeRender = deltaInfo => {\r
    if (!isPaused) spheres.update(deltaInfo);\r
  };\r
  threeInstance.onAfterResize = size => {\r
    spheres.config.maxX = size.wWidth / 2;\r
    spheres.config.maxY = size.wHeight / 2;\r
  };\r
  return {\r
    three: threeInstance,\r
    get spheres() {\r
      return spheres;\r
    },\r
    setCount(count: number) {\r
      initialize({ ...spheres.config, count });\r
    },\r
    togglePause() {\r
      isPaused = !isPaused;\r
    },\r
    dispose() {\r
      pointerData.dispose?.();\r
      threeInstance.dispose();\r
    }\r
  };\r
}\r
\r
interface BallpitProps {\r
  className?: string;\r
  followCursor?: boolean;\r
  [key: string]: any;\r
}\r
\r
const Ballpit: React.FC<BallpitProps> = ({ className = '', followCursor = true, ...props }) => {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const spheresInstanceRef = useRef<CreateBallpitReturn | null>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    spheresInstanceRef.current = createBallpit(canvas, {\r
      followCursor,\r
      ...props\r
    });\r
\r
    return () => {\r
      if (spheresInstanceRef.current) {\r
        spheresInstanceRef.current.dispose();\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  return <canvas className={className} ref={canvasRef} style={{ width: '100%', height: '100%' }} />;\r
};\r
\r
export default Ballpit;\r
`,k=`import React, { useRef, useEffect } from 'react';\r
import {\r
  Clock,\r
  PerspectiveCamera,\r
  Scene,\r
  WebGLRenderer,\r
  WebGLRendererParameters,\r
  SRGBColorSpace,\r
  MathUtils,\r
  Vector2,\r
  Vector3,\r
  MeshPhysicalMaterial,\r
  ShaderChunk,\r
  Color,\r
  Object3D,\r
  InstancedMesh,\r
  PMREMGenerator,\r
  SphereGeometry,\r
  AmbientLight,\r
  PointLight,\r
  ACESFilmicToneMapping,\r
  Raycaster,\r
  Plane\r
} from 'three';\r
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';\r
import { Observer } from 'gsap/Observer';\r
import { gsap } from 'gsap';\r
\r
gsap.registerPlugin(Observer);\r
\r
interface XConfig {\r
  canvas?: HTMLCanvasElement;\r
  id?: string;\r
  rendererOptions?: Partial<WebGLRendererParameters>;\r
  size?: 'parent' | { width: number; height: number };\r
}\r
\r
interface SizeData {\r
  width: number;\r
  height: number;\r
  wWidth: number;\r
  wHeight: number;\r
  ratio: number;\r
  pixelRatio: number;\r
}\r
\r
class X {\r
  #config: XConfig;\r
  #postprocessing: any;\r
  #resizeObserver?: ResizeObserver;\r
  #intersectionObserver?: IntersectionObserver;\r
  #resizeTimer?: number;\r
  #animationFrameId: number = 0;\r
  #clock: Clock = new Clock();\r
  #animationState = { elapsed: 0, delta: 0 };\r
  #isAnimating: boolean = false;\r
  #isVisible: boolean = false;\r
\r
  canvas!: HTMLCanvasElement;\r
  camera!: PerspectiveCamera;\r
  cameraMinAspect?: number;\r
  cameraMaxAspect?: number;\r
  cameraFov!: number;\r
  maxPixelRatio?: number;\r
  minPixelRatio?: number;\r
  scene!: Scene;\r
  renderer!: WebGLRenderer;\r
  size: SizeData = {\r
    width: 0,\r
    height: 0,\r
    wWidth: 0,\r
    wHeight: 0,\r
    ratio: 0,\r
    pixelRatio: 0\r
  };\r
\r
  render: () => void = this.#render.bind(this);\r
  onBeforeRender: (state: { elapsed: number; delta: number }) => void = () => {};\r
  onAfterRender: (state: { elapsed: number; delta: number }) => void = () => {};\r
  onAfterResize: (size: SizeData) => void = () => {};\r
  isDisposed: boolean = false;\r
\r
  constructor(config: XConfig) {\r
    this.#config = { ...config };\r
    this.#initCamera();\r
    this.#initScene();\r
    this.#initRenderer();\r
    this.resize();\r
    this.#initObservers();\r
  }\r
\r
  #initCamera() {\r
    this.camera = new PerspectiveCamera();\r
    this.cameraFov = this.camera.fov;\r
  }\r
\r
  #initScene() {\r
    this.scene = new Scene();\r
  }\r
\r
  #initRenderer() {\r
    if (this.#config.canvas) {\r
      this.canvas = this.#config.canvas;\r
    } else if (this.#config.id) {\r
      const elem = document.getElementById(this.#config.id);\r
      if (elem instanceof HTMLCanvasElement) {\r
        this.canvas = elem;\r
      } else {\r
        console.error('Three: Missing canvas or id parameter');\r
      }\r
    } else {\r
      console.error('Three: Missing canvas or id parameter');\r
    }\r
    this.canvas!.style.display = 'block';\r
    const rendererOptions: WebGLRendererParameters = {\r
      canvas: this.canvas,\r
      powerPreference: 'high-performance',\r
      ...(this.#config.rendererOptions ?? {})\r
    };\r
    this.renderer = new WebGLRenderer(rendererOptions);\r
    this.renderer.outputColorSpace = SRGBColorSpace;\r
  }\r
\r
  #initObservers() {\r
    if (!(this.#config.size instanceof Object)) {\r
      window.addEventListener('resize', this.#onResize.bind(this));\r
      if (this.#config.size === 'parent' && this.canvas.parentNode) {\r
        this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this));\r
        this.#resizeObserver.observe(this.canvas.parentNode as Element);\r
      }\r
    }\r
    this.#intersectionObserver = new IntersectionObserver(this.#onIntersection.bind(this), {\r
      root: null,\r
      rootMargin: '0px',\r
      threshold: 0\r
    });\r
    this.#intersectionObserver.observe(this.canvas);\r
    document.addEventListener('visibilitychange', this.#onVisibilityChange.bind(this));\r
  }\r
\r
  #onResize() {\r
    if (this.#resizeTimer) clearTimeout(this.#resizeTimer);\r
    this.#resizeTimer = window.setTimeout(this.resize.bind(this), 100);\r
  }\r
\r
  resize() {\r
    let w: number, h: number;\r
    if (this.#config.size instanceof Object) {\r
      w = this.#config.size.width;\r
      h = this.#config.size.height;\r
    } else if (this.#config.size === 'parent' && this.canvas.parentNode) {\r
      w = (this.canvas.parentNode as HTMLElement).offsetWidth;\r
      h = (this.canvas.parentNode as HTMLElement).offsetHeight;\r
    } else {\r
      w = window.innerWidth;\r
      h = window.innerHeight;\r
    }\r
    this.size.width = w;\r
    this.size.height = h;\r
    this.size.ratio = w / h;\r
    this.#updateCamera();\r
    this.#updateRenderer();\r
    this.onAfterResize(this.size);\r
  }\r
\r
  #updateCamera() {\r
    this.camera.aspect = this.size.width / this.size.height;\r
    if (this.camera.isPerspectiveCamera && this.cameraFov) {\r
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {\r
        this.#adjustFov(this.cameraMinAspect);\r
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {\r
        this.#adjustFov(this.cameraMaxAspect);\r
      } else {\r
        this.camera.fov = this.cameraFov;\r
      }\r
    }\r
    this.camera.updateProjectionMatrix();\r
    this.updateWorldSize();\r
  }\r
\r
  #adjustFov(aspect: number) {\r
    const tanFov = Math.tan(MathUtils.degToRad(this.cameraFov / 2));\r
    const newTan = tanFov / (this.camera.aspect / aspect);\r
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(newTan));\r
  }\r
\r
  updateWorldSize() {\r
    if (this.camera.isPerspectiveCamera) {\r
      const fovRad = (this.camera.fov * Math.PI) / 180;\r
      this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length();\r
      this.size.wWidth = this.size.wHeight * this.camera.aspect;\r
    } else if ((this.camera as any).isOrthographicCamera) {\r
      const cam = this.camera as any;\r
      this.size.wHeight = cam.top - cam.bottom;\r
      this.size.wWidth = cam.right - cam.left;\r
    }\r
  }\r
\r
  #updateRenderer() {\r
    this.renderer.setSize(this.size.width, this.size.height);\r
    this.#postprocessing?.setSize(this.size.width, this.size.height);\r
    let pr = window.devicePixelRatio;\r
    if (this.maxPixelRatio && pr > this.maxPixelRatio) {\r
      pr = this.maxPixelRatio;\r
    } else if (this.minPixelRatio && pr < this.minPixelRatio) {\r
      pr = this.minPixelRatio;\r
    }\r
    this.renderer.setPixelRatio(pr);\r
    this.size.pixelRatio = pr;\r
  }\r
\r
  get postprocessing() {\r
    return this.#postprocessing;\r
  }\r
  set postprocessing(value: any) {\r
    this.#postprocessing = value;\r
    this.render = value.render.bind(value);\r
  }\r
\r
  #onIntersection(entries: IntersectionObserverEntry[]) {\r
    this.#isAnimating = entries[0].isIntersecting;\r
    this.#isAnimating ? this.#startAnimation() : this.#stopAnimation();\r
  }\r
\r
  #onVisibilityChange() {\r
    if (this.#isAnimating) {\r
      document.hidden ? this.#stopAnimation() : this.#startAnimation();\r
    }\r
  }\r
\r
  #startAnimation() {\r
    if (this.#isVisible) return;\r
    const animateFrame = () => {\r
      this.#animationFrameId = requestAnimationFrame(animateFrame);\r
      this.#animationState.delta = this.#clock.getDelta();\r
      this.#animationState.elapsed += this.#animationState.delta;\r
      this.onBeforeRender(this.#animationState);\r
      this.render();\r
      this.onAfterRender(this.#animationState);\r
    };\r
    this.#isVisible = true;\r
    this.#clock.start();\r
    animateFrame();\r
  }\r
\r
  #stopAnimation() {\r
    if (this.#isVisible) {\r
      cancelAnimationFrame(this.#animationFrameId);\r
      this.#isVisible = false;\r
      this.#clock.stop();\r
    }\r
  }\r
\r
  #render() {\r
    this.renderer.render(this.scene, this.camera);\r
  }\r
\r
  clear() {\r
    this.scene.traverse(obj => {\r
      if ((obj as any).isMesh && typeof (obj as any).material === 'object' && (obj as any).material !== null) {\r
        Object.keys((obj as any).material).forEach(key => {\r
          const matProp = (obj as any).material[key];\r
          if (matProp && typeof matProp === 'object' && typeof matProp.dispose === 'function') {\r
            matProp.dispose();\r
          }\r
        });\r
        (obj as any).material.dispose();\r
        (obj as any).geometry.dispose();\r
      }\r
    });\r
    this.scene.clear();\r
  }\r
\r
  dispose() {\r
    this.#onResizeCleanup();\r
    this.#stopAnimation();\r
    this.clear();\r
    this.#postprocessing?.dispose();\r
    this.renderer.dispose();\r
    this.isDisposed = true;\r
  }\r
\r
  #onResizeCleanup() {\r
    window.removeEventListener('resize', this.#onResize.bind(this));\r
    this.#resizeObserver?.disconnect();\r
    this.#intersectionObserver?.disconnect();\r
    document.removeEventListener('visibilitychange', this.#onVisibilityChange.bind(this));\r
  }\r
}\r
\r
interface WConfig {\r
  count: number;\r
  maxX: number;\r
  maxY: number;\r
  maxZ: number;\r
  maxSize: number;\r
  minSize: number;\r
  size0: number;\r
  gravity: number;\r
  friction: number;\r
  wallBounce: number;\r
  maxVelocity: number;\r
  controlSphere0?: boolean;\r
  followCursor?: boolean;\r
}\r
\r
class W {\r
  config: WConfig;\r
  positionData: Float32Array;\r
  velocityData: Float32Array;\r
  sizeData: Float32Array;\r
  center: Vector3 = new Vector3();\r
\r
  constructor(config: WConfig) {\r
    this.config = config;\r
    this.positionData = new Float32Array(3 * config.count).fill(0);\r
    this.velocityData = new Float32Array(3 * config.count).fill(0);\r
    this.sizeData = new Float32Array(config.count).fill(1);\r
    this.center = new Vector3();\r
    this.#initializePositions();\r
    this.setSizes();\r
  }\r
\r
  #initializePositions() {\r
    const { config, positionData } = this;\r
    this.center.toArray(positionData, 0);\r
    for (let i = 1; i < config.count; i++) {\r
      const idx = 3 * i;\r
      positionData[idx] = MathUtils.randFloatSpread(2 * config.maxX);\r
      positionData[idx + 1] = MathUtils.randFloatSpread(2 * config.maxY);\r
      positionData[idx + 2] = MathUtils.randFloatSpread(2 * config.maxZ);\r
    }\r
  }\r
\r
  setSizes() {\r
    const { config, sizeData } = this;\r
    sizeData[0] = config.size0;\r
    for (let i = 1; i < config.count; i++) {\r
      sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);\r
    }\r
  }\r
\r
  update(deltaInfo: { delta: number }) {\r
    const { config, center, positionData, sizeData, velocityData } = this;\r
    let startIdx = 0;\r
    if (config.controlSphere0) {\r
      startIdx = 1;\r
      const firstVec = new Vector3().fromArray(positionData, 0);\r
      firstVec.lerp(center, 0.1).toArray(positionData, 0);\r
      new Vector3(0, 0, 0).toArray(velocityData, 0);\r
    }\r
    for (let idx = startIdx; idx < config.count; idx++) {\r
      const base = 3 * idx;\r
      const pos = new Vector3().fromArray(positionData, base);\r
      const vel = new Vector3().fromArray(velocityData, base);\r
      vel.y -= deltaInfo.delta * config.gravity * sizeData[idx];\r
      vel.multiplyScalar(config.friction);\r
      vel.clampLength(0, config.maxVelocity);\r
      pos.add(vel);\r
      pos.toArray(positionData, base);\r
      vel.toArray(velocityData, base);\r
    }\r
    for (let idx = startIdx; idx < config.count; idx++) {\r
      const base = 3 * idx;\r
      const pos = new Vector3().fromArray(positionData, base);\r
      const vel = new Vector3().fromArray(velocityData, base);\r
      const radius = sizeData[idx];\r
      for (let jdx = idx + 1; jdx < config.count; jdx++) {\r
        const otherBase = 3 * jdx;\r
        const otherPos = new Vector3().fromArray(positionData, otherBase);\r
        const otherVel = new Vector3().fromArray(velocityData, otherBase);\r
        const diff = new Vector3().copy(otherPos).sub(pos);\r
        const dist = diff.length();\r
        const sumRadius = radius + sizeData[jdx];\r
        if (dist < sumRadius) {\r
          const overlap = sumRadius - dist;\r
          const correction = diff.normalize().multiplyScalar(0.5 * overlap);\r
          const velCorrection = correction.clone().multiplyScalar(Math.max(vel.length(), 1));\r
          pos.sub(correction);\r
          vel.sub(velCorrection);\r
          pos.toArray(positionData, base);\r
          vel.toArray(velocityData, base);\r
          otherPos.add(correction);\r
          otherVel.add(correction.clone().multiplyScalar(Math.max(otherVel.length(), 1)));\r
          otherPos.toArray(positionData, otherBase);\r
          otherVel.toArray(velocityData, otherBase);\r
        }\r
      }\r
      if (config.controlSphere0) {\r
        const diff = new Vector3().copy(new Vector3().fromArray(positionData, 0)).sub(pos);\r
        const d = diff.length();\r
        const sumRadius0 = radius + sizeData[0];\r
        if (d < sumRadius0) {\r
          const correction = diff.normalize().multiplyScalar(sumRadius0 - d);\r
          const velCorrection = correction.clone().multiplyScalar(Math.max(vel.length(), 2));\r
          pos.sub(correction);\r
          vel.sub(velCorrection);\r
        }\r
      }\r
      if (Math.abs(pos.x) + radius > config.maxX) {\r
        pos.x = Math.sign(pos.x) * (config.maxX - radius);\r
        vel.x = -vel.x * config.wallBounce;\r
      }\r
      if (config.gravity === 0) {\r
        if (Math.abs(pos.y) + radius > config.maxY) {\r
          pos.y = Math.sign(pos.y) * (config.maxY - radius);\r
          vel.y = -vel.y * config.wallBounce;\r
        }\r
      } else if (pos.y - radius < -config.maxY) {\r
        pos.y = -config.maxY + radius;\r
        vel.y = -vel.y * config.wallBounce;\r
      }\r
      const maxBoundary = Math.max(config.maxZ, config.maxSize);\r
      if (Math.abs(pos.z) + radius > maxBoundary) {\r
        pos.z = Math.sign(pos.z) * (config.maxZ - radius);\r
        vel.z = -vel.z * config.wallBounce;\r
      }\r
      pos.toArray(positionData, base);\r
      vel.toArray(velocityData, base);\r
    }\r
  }\r
}\r
\r
class Y extends MeshPhysicalMaterial {\r
  uniforms: { [key: string]: { value: any } } = {\r
    thicknessDistortion: { value: 0.1 },\r
    thicknessAmbient: { value: 0 },\r
    thicknessAttenuation: { value: 0.1 },\r
    thicknessPower: { value: 2 },\r
    thicknessScale: { value: 10 }\r
  };\r
\r
  constructor(params: any) {\r
    super(params);\r
    this.defines = { USE_UV: '' };\r
    this.onBeforeCompile = shader => {\r
      Object.assign(shader.uniforms, this.uniforms);\r
      shader.fragmentShader =\r
        \`\r
        uniform float thicknessPower;\r
        uniform float thicknessScale;\r
        uniform float thicknessDistortion;\r
        uniform float thicknessAmbient;\r
        uniform float thicknessAttenuation;\r
        \` + shader.fragmentShader;\r
      shader.fragmentShader = shader.fragmentShader.replace(\r
        'void main() {',\r
        \`\r
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\r
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\r
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\r
          #ifdef USE_COLOR\r
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\r
          #else\r
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;\r
          #endif\r
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\r
        }\r
\r
        void main() {\r
        \`\r
      );\r
      const lightsChunk = ShaderChunk.lights_fragment_begin.replaceAll(\r
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',\r
        \`\r
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\r
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\r
        \`\r
      );\r
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', lightsChunk);\r
      if (this.onBeforeCompile2) this.onBeforeCompile2(shader);\r
    };\r
  }\r
  onBeforeCompile2?: (shader: any) => void;\r
}\r
\r
const XConfig = {\r
  count: 200,\r
  colors: [0, 0, 0],\r
  ambientColor: 0xffffff,\r
  ambientIntensity: 1,\r
  lightIntensity: 200,\r
  materialParams: {\r
    metalness: 0.5,\r
    roughness: 0.5,\r
    clearcoat: 1,\r
    clearcoatRoughness: 0.15\r
  },\r
  minSize: 0.5,\r
  maxSize: 1,\r
  size0: 1,\r
  gravity: 0.5,\r
  friction: 0.9975,\r
  wallBounce: 0.95,\r
  maxVelocity: 0.15,\r
  maxX: 5,\r
  maxY: 5,\r
  maxZ: 2,\r
  controlSphere0: false,\r
  followCursor: true\r
};\r
\r
const U = new Object3D();\r
\r
let globalPointerActive = false;\r
const pointerPosition = new Vector2();\r
\r
interface PointerData {\r
  position: Vector2;\r
  nPosition: Vector2;\r
  hover: boolean;\r
  touching: boolean;\r
  onEnter: (data: PointerData) => void;\r
  onMove: (data: PointerData) => void;\r
  onClick: (data: PointerData) => void;\r
  onLeave: (data: PointerData) => void;\r
  dispose?: () => void;\r
}\r
\r
const pointerMap = new Map<HTMLElement, PointerData>();\r
\r
function createPointerData(options: Partial<PointerData> & { domElement: HTMLElement }): PointerData {\r
  const defaultData: PointerData = {\r
    position: new Vector2(),\r
    nPosition: new Vector2(),\r
    hover: false,\r
    touching: false,\r
    onEnter: () => {},\r
    onMove: () => {},\r
    onClick: () => {},\r
    onLeave: () => {},\r
    ...options\r
  };\r
  if (!pointerMap.has(options.domElement)) {\r
    pointerMap.set(options.domElement, defaultData);\r
    if (!globalPointerActive) {\r
      document.body.addEventListener('pointermove', onPointerMove as EventListener);\r
      document.body.addEventListener('pointerleave', onPointerLeave as EventListener);\r
      document.body.addEventListener('click', onPointerClick as EventListener);\r
\r
      document.body.addEventListener('touchstart', onTouchStart as EventListener, {\r
        passive: false\r
      });\r
      document.body.addEventListener('touchmove', onTouchMove as EventListener, {\r
        passive: false\r
      });\r
      document.body.addEventListener('touchend', onTouchEnd as EventListener, {\r
        passive: false\r
      });\r
      document.body.addEventListener('touchcancel', onTouchEnd as EventListener, {\r
        passive: false\r
      });\r
      globalPointerActive = true;\r
    }\r
  }\r
  defaultData.dispose = () => {\r
    pointerMap.delete(options.domElement);\r
    if (pointerMap.size === 0) {\r
      document.body.removeEventListener('pointermove', onPointerMove as EventListener);\r
      document.body.removeEventListener('pointerleave', onPointerLeave as EventListener);\r
      document.body.removeEventListener('click', onPointerClick as EventListener);\r
\r
      document.body.removeEventListener('touchstart', onTouchStart as EventListener);\r
      document.body.removeEventListener('touchmove', onTouchMove as EventListener);\r
      document.body.removeEventListener('touchend', onTouchEnd as EventListener);\r
      document.body.removeEventListener('touchcancel', onTouchEnd as EventListener);\r
      globalPointerActive = false;\r
    }\r
  };\r
  return defaultData;\r
}\r
\r
function onPointerMove(e: PointerEvent) {\r
  pointerPosition.set(e.clientX, e.clientY);\r
  processPointerInteraction();\r
}\r
\r
function processPointerInteraction() {\r
  for (const [elem, data] of pointerMap) {\r
    const rect = elem.getBoundingClientRect();\r
    if (isInside(rect)) {\r
      updatePointerData(data, rect);\r
      if (!data.hover) {\r
        data.hover = true;\r
        data.onEnter(data);\r
      }\r
      data.onMove(data);\r
    } else if (data.hover && !data.touching) {\r
      data.hover = false;\r
      data.onLeave(data);\r
    }\r
  }\r
}\r
\r
function onTouchStart(e: TouchEvent) {\r
  if (e.touches.length > 0) {\r
    e.preventDefault();\r
    pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);\r
    for (const [elem, data] of pointerMap) {\r
      const rect = elem.getBoundingClientRect();\r
      if (isInside(rect)) {\r
        data.touching = true;\r
        updatePointerData(data, rect);\r
        if (!data.hover) {\r
          data.hover = true;\r
          data.onEnter(data);\r
        }\r
        data.onMove(data);\r
      }\r
    }\r
  }\r
}\r
\r
function onTouchMove(e: TouchEvent) {\r
  if (e.touches.length > 0) {\r
    e.preventDefault();\r
    pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);\r
    for (const [elem, data] of pointerMap) {\r
      const rect = elem.getBoundingClientRect();\r
      updatePointerData(data, rect);\r
      if (isInside(rect)) {\r
        if (!data.hover) {\r
          data.hover = true;\r
          data.touching = true;\r
          data.onEnter(data);\r
        }\r
        data.onMove(data);\r
      } else if (data.hover && data.touching) {\r
        data.onMove(data);\r
      }\r
    }\r
  }\r
}\r
\r
function onTouchEnd() {\r
  for (const [, data] of pointerMap) {\r
    if (data.touching) {\r
      data.touching = false;\r
      if (data.hover) {\r
        data.hover = false;\r
        data.onLeave(data);\r
      }\r
    }\r
  }\r
}\r
\r
function onPointerClick(e: PointerEvent) {\r
  pointerPosition.set(e.clientX, e.clientY);\r
  for (const [elem, data] of pointerMap) {\r
    const rect = elem.getBoundingClientRect();\r
    updatePointerData(data, rect);\r
    if (isInside(rect)) data.onClick(data);\r
  }\r
}\r
\r
function onPointerLeave() {\r
  for (const data of pointerMap.values()) {\r
    if (data.hover) {\r
      data.hover = false;\r
      data.onLeave(data);\r
    }\r
  }\r
}\r
\r
function updatePointerData(data: PointerData, rect: DOMRect) {\r
  data.position.set(pointerPosition.x - rect.left, pointerPosition.y - rect.top);\r
  data.nPosition.set((data.position.x / rect.width) * 2 - 1, (-data.position.y / rect.height) * 2 + 1);\r
}\r
\r
function isInside(rect: DOMRect) {\r
  return (\r
    pointerPosition.x >= rect.left &&\r
    pointerPosition.x <= rect.left + rect.width &&\r
    pointerPosition.y >= rect.top &&\r
    pointerPosition.y <= rect.top + rect.height\r
  );\r
}\r
\r
class Z extends InstancedMesh {\r
  config: typeof XConfig;\r
  physics: W;\r
  ambientLight: AmbientLight | undefined;\r
  light: PointLight | undefined;\r
\r
  constructor(renderer: WebGLRenderer, params: Partial<typeof XConfig> = {}) {\r
    const config = { ...XConfig, ...params };\r
    const roomEnv = new RoomEnvironment();\r
    const pmrem = new PMREMGenerator(renderer);\r
    const envTexture = pmrem.fromScene(roomEnv).texture;\r
    const geometry = new SphereGeometry();\r
    const material = new Y({ envMap: envTexture, ...config.materialParams });\r
    material.envMapRotation.x = -Math.PI / 2;\r
    super(geometry, material, config.count);\r
    this.config = config;\r
    this.physics = new W(config);\r
    this.#setupLights();\r
    this.setColors(config.colors);\r
  }\r
\r
  #setupLights() {\r
    this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity);\r
    this.add(this.ambientLight);\r
    this.light = new PointLight(this.config.colors[0], this.config.lightIntensity);\r
    this.add(this.light);\r
  }\r
\r
  setColors(colors: number[]) {\r
    if (Array.isArray(colors) && colors.length > 1) {\r
      const colorUtils = (function (colorsArr: number[]) {\r
        let baseColors: number[] = colorsArr;\r
        let colorObjects: Color[] = [];\r
        baseColors.forEach(col => {\r
          colorObjects.push(new Color(col));\r
        });\r
        return {\r
          setColors: (cols: number[]) => {\r
            baseColors = cols;\r
            colorObjects = [];\r
            baseColors.forEach(col => {\r
              colorObjects.push(new Color(col));\r
            });\r
          },\r
          getColorAt: (ratio: number, out: Color = new Color()) => {\r
            const clamped = Math.max(0, Math.min(1, ratio));\r
            const scaled = clamped * (baseColors.length - 1);\r
            const idx = Math.floor(scaled);\r
            const start = colorObjects[idx];\r
            if (idx >= baseColors.length - 1) return start.clone();\r
            const alpha = scaled - idx;\r
            const end = colorObjects[idx + 1];\r
            out.r = start.r + alpha * (end.r - start.r);\r
            out.g = start.g + alpha * (end.g - start.g);\r
            out.b = start.b + alpha * (end.b - start.b);\r
            return out;\r
          }\r
        };\r
      })(colors);\r
      for (let idx = 0; idx < this.count; idx++) {\r
        this.setColorAt(idx, colorUtils.getColorAt(idx / this.count));\r
        if (idx === 0) {\r
          this.light!.color.copy(colorUtils.getColorAt(idx / this.count));\r
        }\r
      }\r
\r
      if (!this.instanceColor) return;\r
      this.instanceColor.needsUpdate = true;\r
    }\r
  }\r
\r
  update(deltaInfo: { delta: number }) {\r
    this.physics.update(deltaInfo);\r
    for (let idx = 0; idx < this.count; idx++) {\r
      U.position.fromArray(this.physics.positionData, 3 * idx);\r
      if (idx === 0 && this.config.followCursor === false) {\r
        U.scale.setScalar(0);\r
      } else {\r
        U.scale.setScalar(this.physics.sizeData[idx]);\r
      }\r
      U.updateMatrix();\r
      this.setMatrixAt(idx, U.matrix);\r
      if (idx === 0) this.light!.position.copy(U.position);\r
    }\r
    this.instanceMatrix.needsUpdate = true;\r
  }\r
}\r
\r
interface CreateBallpitReturn {\r
  three: X;\r
  spheres: Z;\r
  setCount: (count: number) => void;\r
  togglePause: () => void;\r
  dispose: () => void;\r
}\r
\r
function createBallpit(canvas: HTMLCanvasElement, config: any = {}): CreateBallpitReturn {\r
  const threeInstance = new X({\r
    canvas,\r
    size: 'parent',\r
    rendererOptions: { antialias: true, alpha: true }\r
  });\r
  let spheres: Z;\r
  threeInstance.renderer.toneMapping = ACESFilmicToneMapping;\r
  threeInstance.camera.position.set(0, 0, 20);\r
  threeInstance.camera.lookAt(0, 0, 0);\r
  threeInstance.cameraMaxAspect = 1.5;\r
  threeInstance.resize();\r
  initialize(config);\r
  const raycaster = new Raycaster();\r
  const plane = new Plane(new Vector3(0, 0, 1), 0);\r
  const intersectionPoint = new Vector3();\r
  let isPaused = false;\r
\r
  canvas.style.touchAction = 'none';\r
  canvas.style.userSelect = 'none';\r
  (canvas.style as any).webkitUserSelect = 'none';\r
\r
  const pointerData = createPointerData({\r
    domElement: canvas,\r
    onMove() {\r
      raycaster.setFromCamera(pointerData.nPosition, threeInstance.camera);\r
      threeInstance.camera.getWorldDirection(plane.normal);\r
      raycaster.ray.intersectPlane(plane, intersectionPoint);\r
      spheres.physics.center.copy(intersectionPoint);\r
      spheres.config.controlSphere0 = true;\r
    },\r
    onLeave() {\r
      spheres.config.controlSphere0 = false;\r
    }\r
  });\r
  function initialize(cfg: any) {\r
    if (spheres) {\r
      threeInstance.clear();\r
      threeInstance.scene.remove(spheres);\r
    }\r
    spheres = new Z(threeInstance.renderer, cfg);\r
    threeInstance.scene.add(spheres);\r
  }\r
  threeInstance.onBeforeRender = deltaInfo => {\r
    if (!isPaused) spheres.update(deltaInfo);\r
  };\r
  threeInstance.onAfterResize = size => {\r
    spheres.config.maxX = size.wWidth / 2;\r
    spheres.config.maxY = size.wHeight / 2;\r
  };\r
  return {\r
    three: threeInstance,\r
    get spheres() {\r
      return spheres;\r
    },\r
    setCount(count: number) {\r
      initialize({ ...spheres.config, count });\r
    },\r
    togglePause() {\r
      isPaused = !isPaused;\r
    },\r
    dispose() {\r
      pointerData.dispose?.();\r
      threeInstance.dispose();\r
    }\r
  };\r
}\r
\r
interface BallpitProps {\r
  className?: string;\r
  followCursor?: boolean;\r
  [key: string]: any;\r
}\r
\r
const Ballpit: React.FC<BallpitProps> = ({ className = '', followCursor = true, ...props }) => {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const spheresInstanceRef = useRef<CreateBallpitReturn | null>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    spheresInstanceRef.current = createBallpit(canvas, {\r
      followCursor,\r
      ...props\r
    });\r
\r
    return () => {\r
      if (spheresInstanceRef.current) {\r
        spheresInstanceRef.current.dispose();\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  return <canvas className={\`\${className} w-full h-full\`} ref={canvasRef} />;\r
};\r
\r
export default Ballpit;\r
`,j={dependencies:"three",usage:`//Component inspired by Kevin Levron:
//https://x.com/soju22/status/1858925191671271801
  
import Ballpit from './Ballpit;'

<div style={{position: 'relative', overflow: 'hidden', minHeight: '500px', maxHeight: '500px', width: '100%'}}>
  <Ballpit
    count={200}
    gravity={0.7}
    friction={0.8}
    wallBounce={0.95}
    followCursor={true}
  />
</div>`,code:L,tailwind:I,tsCode:B,tsTailwind:k},Z=()=>{const[s,h]=t.useState(100),[o,d]=t.useState(.01),[a,m]=t.useState(.9975),[c,f]=t.useState(.95),[l,u]=t.useState(!1),p=[16777215,0,5384191],[g,e]=A(),v=[{name:"count",type:"number",default:"200",description:"Sets the number of balls in the ballpit."},{name:"gravity",type:"number",default:"0.5",description:"Controls the gravity affecting the balls."},{name:"friction",type:"number",default:"0.9975",description:"Sets the friction applied to the ball movement."},{name:"wallBounce",type:"number",default:"0.95",description:"Determines how much balls bounce off walls."},{name:"followCursor",type:"boolean",default:"true",description:"Enables or disables the sphere following the cursor."},{name:"colors",type:"array",default:"[0, 0, 0]",description:"Defines the colors of the balls."},{name:"ambientColor",type:"number",default:"16777215",description:"Sets the ambient light color."},{name:"ambientIntensity",type:"number",default:"1",description:"Controls the intensity of ambient light."},{name:"lightIntensity",type:"number",default:"200",description:"Sets the intensity of the main light source."},{name:"minSize",type:"number",default:"0.5",description:"Specifies the minimum size of the balls."},{name:"maxSize",type:"number",default:"1",description:"Specifies the maximum size of the balls."},{name:"size0",type:"number",default:"1",description:"Initial size value for the cursor ball."},{name:"maxVelocity",type:"number",default:"0.15",description:"Limits the maximum velocity of the balls."},{name:"maxX",type:"number",default:"5",description:"Defines the maximum X-coordinate boundary."},{name:"maxY",type:"number",default:"5",description:"Defines the maximum Y-coordinate boundary."},{name:"maxZ",type:"number",default:"2",description:"Defines the maximum Z-coordinate boundary."}];return n.jsxs(b,{children:[n.jsxs(x,{children:[n.jsxs(y,{position:"relative",className:"demo-container",minH:600,maxH:600,overflow:"hidden",children:[n.jsx(P,{onClick:e}),n.jsx(E,{className:"ballpit-demo",count:s,gravity:o,friction:a,wallBounce:c,followCursor:l,colors:p},g),n.jsx(S,{pillText:"New Background",headline:"Balls! What's not to like about them?"})]}),n.jsxs(D,{children:[n.jsx(M,{title:"Display Cursor",isChecked:l,onChange:r=>{u(r),e()}}),n.jsx(i,{title:"Ball Count",min:50,max:500,step:10,value:s,onChange:r=>{h(r),e()}}),n.jsx(i,{title:"Gravity",min:0,max:1,step:.1,value:o,onChange:r=>{d(r),e()}}),n.jsx(i,{title:"Friction",min:.9,max:1,step:.001,value:a,onChange:r=>{m(r),e()}}),n.jsx(i,{title:"Wall Bounce",min:.5,max:1,step:.05,value:c,onChange:r=>{f(r),e()}})]}),n.jsx(w,{data:v}),n.jsx(R,{dependencyList:["three"]})]}),n.jsx(z,{children:n.jsx(C,{codeObject:j})})]})};export{Z as default};
