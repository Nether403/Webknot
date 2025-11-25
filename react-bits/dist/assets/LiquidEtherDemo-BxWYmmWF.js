import{r as e,j as r,B as k,F as A,T as L,d as o}from"./index-wsKSLPNH.js";import{T as I,P as O,a as G,C as U,b as W}from"./PropTable-C4uPWs8h.js";import{C as N}from"./Customize-1m_ZNqR9.js";import{P as n}from"./PreviewSlider-m1G_aiYP.js";import{P as i}from"./PreviewSwitch-DqnF708j.js";import{D as X}from"./Dependencies-BHoMfJUj.js";import{L as Y}from"./LiquidEther-Ds8mxeAV.js";import{B as j}from"./BackgroundContent-CqU7Wlm2.js";import"./index-Bpz4cGEA.js";import"./three.module-0PRdiASR.js";const q=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import './LiquidEther.css';\r
\r
export default function LiquidEther({\r
  mouseForce = 20,\r
  cursorSize = 100,\r
  isViscous = false,\r
  viscous = 30,\r
  iterationsViscous = 32,\r
  iterationsPoisson = 32,\r
  dt = 0.014,\r
  BFECC = true,\r
  resolution = 0.5,\r
  isBounce = false,\r
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],\r
  style = {},\r
  className = '',\r
  autoDemo = true,\r
  autoSpeed = 0.5,\r
  autoIntensity = 2.2,\r
  takeoverDuration = 0.25,\r
  autoResumeDelay = 1000,\r
  autoRampDuration = 0.6\r
}) {\r
  const mountRef = useRef(null);\r
  const webglRef = useRef(null);\r
  const resizeObserverRef = useRef(null);\r
  const rafRef = useRef(null);\r
  const intersectionObserverRef = useRef(null);\r
  const isVisibleRef = useRef(true);\r
  const resizeRafRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!mountRef.current) return;\r
\r
    function makePaletteTexture(stops) {\r
      let arr;\r
      if (Array.isArray(stops) && stops.length > 0) {\r
        if (stops.length === 1) {\r
          arr = [stops[0], stops[0]];\r
        } else {\r
          arr = stops;\r
        }\r
      } else {\r
        arr = ['#ffffff', '#ffffff'];\r
      }\r
      const w = arr.length;\r
      const data = new Uint8Array(w * 4);\r
      for (let i = 0; i < w; i++) {\r
        const c = new THREE.Color(arr[i]);\r
        data[i * 4 + 0] = Math.round(c.r * 255);\r
        data[i * 4 + 1] = Math.round(c.g * 255);\r
        data[i * 4 + 2] = Math.round(c.b * 255);\r
        data[i * 4 + 3] = 255;\r
      }\r
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);\r
      tex.magFilter = THREE.LinearFilter;\r
      tex.minFilter = THREE.LinearFilter;\r
      tex.wrapS = THREE.ClampToEdgeWrapping;\r
      tex.wrapT = THREE.ClampToEdgeWrapping;\r
      tex.generateMipmaps = false;\r
      tex.needsUpdate = true;\r
      return tex;\r
    }\r
\r
    const paletteTex = makePaletteTexture(colors);\r
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0); // always transparent\r
\r
    class CommonClass {\r
      constructor() {\r
        this.width = 0;\r
        this.height = 0;\r
        this.aspect = 1;\r
        this.pixelRatio = 1;\r
        this.isMobile = false;\r
        this.breakpoint = 768;\r
        this.fboWidth = null;\r
        this.fboHeight = null;\r
        this.time = 0;\r
        this.delta = 0;\r
        this.container = null;\r
        this.renderer = null;\r
        this.clock = null;\r
      }\r
      init(container) {\r
        this.container = container;\r
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);\r
        this.resize();\r
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });\r
        this.renderer.autoClear = false;\r
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);\r
        this.renderer.setPixelRatio(this.pixelRatio);\r
        this.renderer.setSize(this.width, this.height);\r
        this.renderer.domElement.style.width = '100%';\r
        this.renderer.domElement.style.height = '100%';\r
        this.renderer.domElement.style.display = 'block';\r
        this.clock = new THREE.Clock();\r
        this.clock.start();\r
      }\r
      resize() {\r
        if (!this.container) return;\r
        const rect = this.container.getBoundingClientRect();\r
        this.width = Math.max(1, Math.floor(rect.width));\r
        this.height = Math.max(1, Math.floor(rect.height));\r
        this.aspect = this.width / this.height;\r
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);\r
      }\r
      update() {\r
        this.delta = this.clock.getDelta();\r
        this.time += this.delta;\r
      }\r
    }\r
    const Common = new CommonClass();\r
\r
    class MouseClass {\r
      constructor() {\r
        this.mouseMoved = false;\r
        this.coords = new THREE.Vector2();\r
        this.coords_old = new THREE.Vector2();\r
        this.diff = new THREE.Vector2();\r
        this.timer = null;\r
        this.container = null;\r
        this._onMouseMove = this.onDocumentMouseMove.bind(this);\r
        this._onTouchStart = this.onDocumentTouchStart.bind(this);\r
        this._onTouchMove = this.onDocumentTouchMove.bind(this);\r
        this._onMouseEnter = this.onMouseEnter.bind(this);\r
        this._onMouseLeave = this.onMouseLeave.bind(this);\r
        this._onTouchEnd = this.onTouchEnd.bind(this);\r
        this.isHoverInside = false;\r
        this.hasUserControl = false;\r
        this.isAutoActive = false;\r
        this.autoIntensity = 2.0;\r
        this.takeoverActive = false;\r
        this.takeoverStartTime = 0;\r
        this.takeoverDuration = 0.25;\r
        this.takeoverFrom = new THREE.Vector2();\r
        this.takeoverTo = new THREE.Vector2();\r
        this.onInteract = null;\r
      }\r
      init(container) {\r
        this.container = container;\r
        container.addEventListener('mousemove', this._onMouseMove, false);\r
        container.addEventListener('touchstart', this._onTouchStart, false);\r
        container.addEventListener('touchmove', this._onTouchMove, false);\r
        container.addEventListener('mouseenter', this._onMouseEnter, false);\r
        container.addEventListener('mouseleave', this._onMouseLeave, false);\r
        container.addEventListener('touchend', this._onTouchEnd, false);\r
      }\r
      dispose() {\r
        if (!this.container) return;\r
        this.container.removeEventListener('mousemove', this._onMouseMove, false);\r
        this.container.removeEventListener('touchstart', this._onTouchStart, false);\r
        this.container.removeEventListener('touchmove', this._onTouchMove, false);\r
        this.container.removeEventListener('mouseenter', this._onMouseEnter, false);\r
        this.container.removeEventListener('mouseleave', this._onMouseLeave, false);\r
        this.container.removeEventListener('touchend', this._onTouchEnd, false);\r
      }\r
      setCoords(x, y) {\r
        if (!this.container) return;\r
        if (this.timer) clearTimeout(this.timer);\r
        const rect = this.container.getBoundingClientRect();\r
        const nx = (x - rect.left) / rect.width;\r
        const ny = (y - rect.top) / rect.height;\r
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));\r
        this.mouseMoved = true;\r
        this.timer = setTimeout(() => {\r
          this.mouseMoved = false;\r
        }, 100);\r
      }\r
      setNormalized(nx, ny) {\r
        this.coords.set(nx, ny);\r
        this.mouseMoved = true;\r
      }\r
      onDocumentMouseMove(event) {\r
        if (this.onInteract) this.onInteract();\r
        if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {\r
          const rect = this.container.getBoundingClientRect();\r
          const nx = (event.clientX - rect.left) / rect.width;\r
          const ny = (event.clientY - rect.top) / rect.height;\r
          this.takeoverFrom.copy(this.coords);\r
          this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));\r
          this.takeoverStartTime = performance.now();\r
          this.takeoverActive = true;\r
          this.hasUserControl = true;\r
          this.isAutoActive = false;\r
          return;\r
        }\r
        this.setCoords(event.clientX, event.clientY);\r
        this.hasUserControl = true;\r
      }\r
      onDocumentTouchStart(event) {\r
        if (event.touches.length === 1) {\r
          const t = event.touches[0];\r
          if (this.onInteract) this.onInteract();\r
          this.setCoords(t.pageX, t.pageY);\r
          this.hasUserControl = true;\r
        }\r
      }\r
      onDocumentTouchMove(event) {\r
        if (event.touches.length === 1) {\r
          const t = event.touches[0];\r
          if (this.onInteract) this.onInteract();\r
          this.setCoords(t.pageX, t.pageY);\r
        }\r
      }\r
      onTouchEnd() {\r
        this.isHoverInside = false;\r
      }\r
      onMouseEnter() {\r
        this.isHoverInside = true;\r
      }\r
      onMouseLeave() {\r
        this.isHoverInside = false;\r
      }\r
      update() {\r
        if (this.takeoverActive) {\r
          const t = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000);\r
          if (t >= 1) {\r
            this.takeoverActive = false;\r
            this.coords.copy(this.takeoverTo);\r
            this.coords_old.copy(this.coords);\r
            this.diff.set(0, 0);\r
          } else {\r
            const k = t * t * (3 - 2 * t);\r
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);\r
          }\r
        }\r
        this.diff.subVectors(this.coords, this.coords_old);\r
        this.coords_old.copy(this.coords);\r
        if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);\r
        if (this.isAutoActive && !this.takeoverActive) this.diff.multiplyScalar(this.autoIntensity);\r
      }\r
    }\r
    const Mouse = new MouseClass();\r
\r
    class AutoDriver {\r
      constructor(mouse, manager, opts) {\r
        this.mouse = mouse;\r
        this.manager = manager;\r
        this.enabled = opts.enabled;\r
        this.speed = opts.speed; // normalized units/sec\r
        this.resumeDelay = opts.resumeDelay || 3000; // ms\r
        this.rampDurationMs = (opts.rampDuration || 0) * 1000;\r
        this.active = false;\r
        this.current = new THREE.Vector2(0, 0);\r
        this.target = new THREE.Vector2();\r
        this.lastTime = performance.now();\r
        this.activationTime = 0;\r
        this.margin = 0.2;\r
        this._tmpDir = new THREE.Vector2(); // reuse temp vector to avoid per-frame alloc\r
        this.pickNewTarget();\r
      }\r
      pickNewTarget() {\r
        const r = Math.random;\r
        this.target.set((r() * 2 - 1) * (1 - this.margin), (r() * 2 - 1) * (1 - this.margin));\r
      }\r
      forceStop() {\r
        this.active = false;\r
        this.mouse.isAutoActive = false;\r
      }\r
      update() {\r
        if (!this.enabled) return;\r
        const now = performance.now();\r
        const idle = now - this.manager.lastUserInteraction;\r
        if (idle < this.resumeDelay) {\r
          if (this.active) this.forceStop();\r
          return;\r
        }\r
        if (this.mouse.isHoverInside) {\r
          if (this.active) this.forceStop();\r
          return;\r
        }\r
        if (!this.active) {\r
          this.active = true;\r
          this.current.copy(this.mouse.coords);\r
          this.lastTime = now;\r
          this.activationTime = now;\r
        }\r
        if (!this.active) return;\r
        this.mouse.isAutoActive = true;\r
        let dtSec = (now - this.lastTime) / 1000;\r
        this.lastTime = now;\r
        if (dtSec > 0.2) dtSec = 0.016;\r
        const dir = this._tmpDir.subVectors(this.target, this.current);\r
        const dist = dir.length();\r
        if (dist < 0.01) {\r
          this.pickNewTarget();\r
          return;\r
        }\r
        dir.normalize();\r
        let ramp = 1;\r
        if (this.rampDurationMs > 0) {\r
          const t = Math.min(1, (now - this.activationTime) / this.rampDurationMs);\r
          ramp = t * t * (3 - 2 * t);\r
        }\r
        const step = this.speed * dtSec * ramp;\r
        const move = Math.min(step, dist);\r
        this.current.addScaledVector(dir, move);\r
        this.mouse.setNormalized(this.current.x, this.current.y);\r
      }\r
    }\r
\r
    const face_vert = \`\r
  attribute vec3 position;\r
  uniform vec2 px;\r
  uniform vec2 boundarySpace;\r
  varying vec2 uv;\r
  precision highp float;\r
  void main(){\r
  vec3 pos = position;\r
  vec2 scale = 1.0 - boundarySpace * 2.0;\r
  pos.xy = pos.xy * scale;\r
  uv = vec2(0.5)+(pos.xy)*0.5;\r
  gl_Position = vec4(pos, 1.0);\r
}\r
\`;\r
    const line_vert = \`\r
  attribute vec3 position;\r
  uniform vec2 px;\r
  precision highp float;\r
  varying vec2 uv;\r
  void main(){\r
  vec3 pos = position;\r
  uv = 0.5 + pos.xy * 0.5;\r
  vec2 n = sign(pos.xy);\r
  pos.xy = abs(pos.xy) - px * 1.0;\r
  pos.xy *= n;\r
  gl_Position = vec4(pos, 1.0);\r
}\r
\`;\r
    const mouse_vert = \`\r
    precision highp float;\r
    attribute vec3 position;\r
    attribute vec2 uv;\r
    uniform vec2 center;\r
    uniform vec2 scale;\r
    uniform vec2 px;\r
    varying vec2 vUv;\r
    void main(){\r
    vec2 pos = position.xy * scale * 2.0 * px + center;\r
    vUv = uv;\r
    gl_Position = vec4(pos, 0.0, 1.0);\r
}\r
\`;\r
    const advection_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform float dt;\r
    uniform bool isBFECC;\r
    uniform vec2 fboSize;\r
    uniform vec2 px;\r
    varying vec2 uv;\r
    void main(){\r
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;\r
    if(isBFECC == false){\r
        vec2 vel = texture2D(velocity, uv).xy;\r
        vec2 uv2 = uv - vel * dt * ratio;\r
        vec2 newVel = texture2D(velocity, uv2).xy;\r
        gl_FragColor = vec4(newVel, 0.0, 0.0);\r
    } else {\r
        vec2 spot_new = uv;\r
        vec2 vel_old = texture2D(velocity, uv).xy;\r
        vec2 spot_old = spot_new - vel_old * dt * ratio;\r
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;\r
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;\r
        vec2 error = spot_new2 - spot_new;\r
        vec2 spot_new3 = spot_new - error / 2.0;\r
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;\r
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;\r
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; \r
        gl_FragColor = vec4(newVel2, 0.0, 0.0);\r
    }\r
}\r
\`;\r
    const color_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform sampler2D palette;\r
    uniform vec4 bgColor;\r
    varying vec2 uv;\r
    void main(){\r
    vec2 vel = texture2D(velocity, uv).xy;\r
    float lenv = clamp(length(vel), 0.0, 1.0);\r
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;\r
    vec3 outRGB = mix(bgColor.rgb, c, lenv);\r
    float outA = mix(bgColor.a, 1.0, lenv);\r
    gl_FragColor = vec4(outRGB, outA);\r
}\r
\`;\r
    const divergence_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform float dt;\r
    uniform vec2 px;\r
    varying vec2 uv;\r
    void main(){\r
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;\r
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;\r
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;\r
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;\r
    float divergence = (x1 - x0 + y1 - y0) / 2.0;\r
    gl_FragColor = vec4(divergence / dt);\r
}\r
\`;\r
    const externalForce_frag = \`\r
    precision highp float;\r
    uniform vec2 force;\r
    uniform vec2 center;\r
    uniform vec2 scale;\r
    uniform vec2 px;\r
    varying vec2 vUv;\r
    void main(){\r
    vec2 circle = (vUv - 0.5) * 2.0;\r
    float d = 1.0 - min(length(circle), 1.0);\r
    d *= d;\r
    gl_FragColor = vec4(force * d, 0.0, 1.0);\r
}\r
\`;\r
    const poisson_frag = \`\r
    precision highp float;\r
    uniform sampler2D pressure;\r
    uniform sampler2D divergence;\r
    uniform vec2 px;\r
    varying vec2 uv;\r
    void main(){\r
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;\r
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;\r
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;\r
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;\r
    float div = texture2D(divergence, uv).r;\r
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;\r
    gl_FragColor = vec4(newP);\r
}\r
\`;\r
    const pressure_frag = \`\r
    precision highp float;\r
    uniform sampler2D pressure;\r
    uniform sampler2D velocity;\r
    uniform vec2 px;\r
    uniform float dt;\r
    varying vec2 uv;\r
    void main(){\r
    float step = 1.0;\r
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;\r
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;\r
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;\r
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;\r
    vec2 v = texture2D(velocity, uv).xy;\r
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;\r
    v = v - gradP * dt;\r
    gl_FragColor = vec4(v, 0.0, 1.0);\r
}\r
\`;\r
    const viscous_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform sampler2D velocity_new;\r
    uniform float v;\r
    uniform vec2 px;\r
    uniform float dt;\r
    varying vec2 uv;\r
    void main(){\r
    vec2 old = texture2D(velocity, uv).xy;\r
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;\r
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;\r
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;\r
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;\r
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);\r
    newv /= 4.0 * (1.0 + v * dt);\r
    gl_FragColor = vec4(newv, 0.0, 0.0);\r
}\r
\`;\r
\r
    class ShaderPass {\r
      constructor(props) {\r
        this.props = props || {};\r
        this.uniforms = this.props.material?.uniforms;\r
        this.scene = null;\r
        this.camera = null;\r
        this.material = null;\r
        this.geometry = null;\r
        this.plane = null;\r
      }\r
      init() {\r
        this.scene = new THREE.Scene();\r
        this.camera = new THREE.Camera();\r
        if (this.uniforms) {\r
          this.material = new THREE.RawShaderMaterial(this.props.material);\r
          this.geometry = new THREE.PlaneGeometry(2.0, 2.0);\r
          this.plane = new THREE.Mesh(this.geometry, this.material);\r
          this.scene.add(this.plane);\r
        }\r
      }\r
      update() {\r
        Common.renderer.setRenderTarget(this.props.output || null);\r
        Common.renderer.render(this.scene, this.camera);\r
        Common.renderer.setRenderTarget(null);\r
      }\r
    }\r
\r
    class Advection extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: advection_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.cellScale },\r
              px: { value: simProps.cellScale },\r
              fboSize: { value: simProps.fboSize },\r
              velocity: { value: simProps.src.texture },\r
              dt: { value: simProps.dt },\r
              isBFECC: { value: true }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.uniforms = this.props.material.uniforms;\r
        this.init();\r
      }\r
      init() {\r
        super.init();\r
        this.createBoundary();\r
      }\r
      createBoundary() {\r
        const boundaryG = new THREE.BufferGeometry();\r
        const vertices_boundary = new Float32Array([\r
          -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 0\r
        ]);\r
        boundaryG.setAttribute('position', new THREE.BufferAttribute(vertices_boundary, 3));\r
        const boundaryM = new THREE.RawShaderMaterial({\r
          vertexShader: line_vert,\r
          fragmentShader: advection_frag,\r
          uniforms: this.uniforms\r
        });\r
        this.line = new THREE.LineSegments(boundaryG, boundaryM);\r
        this.scene.add(this.line);\r
      }\r
      update({ dt, isBounce, BFECC }) {\r
        this.uniforms.dt.value = dt;\r
        this.line.visible = isBounce;\r
        this.uniforms.isBFECC.value = BFECC;\r
        super.update();\r
      }\r
    }\r
\r
    class ExternalForce extends ShaderPass {\r
      constructor(simProps) {\r
        super({ output: simProps.dst });\r
        this.init(simProps);\r
      }\r
      init(simProps) {\r
        super.init();\r
        const mouseG = new THREE.PlaneGeometry(1, 1);\r
        const mouseM = new THREE.RawShaderMaterial({\r
          vertexShader: mouse_vert,\r
          fragmentShader: externalForce_frag,\r
          blending: THREE.AdditiveBlending,\r
          depthWrite: false,\r
          uniforms: {\r
            px: { value: simProps.cellScale },\r
            force: { value: new THREE.Vector2(0.0, 0.0) },\r
            center: { value: new THREE.Vector2(0.0, 0.0) },\r
            scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) }\r
          }\r
        });\r
        this.mouse = new THREE.Mesh(mouseG, mouseM);\r
        this.scene.add(this.mouse);\r
      }\r
      update(props) {\r
        const forceX = (Mouse.diff.x / 2) * props.mouse_force;\r
        const forceY = (Mouse.diff.y / 2) * props.mouse_force;\r
        const cursorSizeX = props.cursor_size * props.cellScale.x;\r
        const cursorSizeY = props.cursor_size * props.cellScale.y;\r
        const centerX = Math.min(\r
          Math.max(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2),\r
          1 - cursorSizeX - props.cellScale.x * 2\r
        );\r
        const centerY = Math.min(\r
          Math.max(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2),\r
          1 - cursorSizeY - props.cellScale.y * 2\r
        );\r
        const uniforms = this.mouse.material.uniforms;\r
        uniforms.force.value.set(forceX, forceY);\r
        uniforms.center.value.set(centerX, centerY);\r
        uniforms.scale.value.set(props.cursor_size, props.cursor_size);\r
        super.update();\r
      }\r
    }\r
\r
    class Viscous extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: viscous_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              velocity: { value: simProps.src.texture },\r
              velocity_new: { value: simProps.dst_.texture },\r
              v: { value: simProps.viscous },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst,\r
          output0: simProps.dst_,\r
          output1: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update({ viscous, iterations, dt }) {\r
        let fbo_in, fbo_out;\r
        this.uniforms.v.value = viscous;\r
        for (let i = 0; i < iterations; i++) {\r
          if (i % 2 === 0) {\r
            fbo_in = this.props.output0;\r
            fbo_out = this.props.output1;\r
          } else {\r
            fbo_in = this.props.output1;\r
            fbo_out = this.props.output0;\r
          }\r
          this.uniforms.velocity_new.value = fbo_in.texture;\r
          this.props.output = fbo_out;\r
          this.uniforms.dt.value = dt;\r
          super.update();\r
        }\r
        return fbo_out;\r
      }\r
    }\r
\r
    class Divergence extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: divergence_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              velocity: { value: simProps.src.texture },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update({ vel }) {\r
        this.uniforms.velocity.value = vel.texture;\r
        super.update();\r
      }\r
    }\r
\r
    class Poisson extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: poisson_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              pressure: { value: simProps.dst_.texture },\r
              divergence: { value: simProps.src.texture },\r
              px: { value: simProps.cellScale }\r
            }\r
          },\r
          output: simProps.dst,\r
          output0: simProps.dst_,\r
          output1: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update({ iterations }) {\r
        let p_in, p_out;\r
        for (let i = 0; i < iterations; i++) {\r
          if (i % 2 === 0) {\r
            p_in = this.props.output0;\r
            p_out = this.props.output1;\r
          } else {\r
            p_in = this.props.output1;\r
            p_out = this.props.output0;\r
          }\r
          this.uniforms.pressure.value = p_in.texture;\r
          this.props.output = p_out;\r
          super.update();\r
        }\r
        return p_out;\r
      }\r
    }\r
\r
    class Pressure extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: pressure_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              pressure: { value: simProps.src_p.texture },\r
              velocity: { value: simProps.src_v.texture },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update({ vel, pressure }) {\r
        this.uniforms.velocity.value = vel.texture;\r
        this.uniforms.pressure.value = pressure.texture;\r
        super.update();\r
      }\r
    }\r
\r
    class Simulation {\r
      constructor(options) {\r
        this.options = {\r
          iterations_poisson: 32,\r
          iterations_viscous: 32,\r
          mouse_force: 20,\r
          resolution: 0.5,\r
          cursor_size: 100,\r
          viscous: 30,\r
          isBounce: false,\r
          dt: 0.014,\r
          isViscous: false,\r
          BFECC: true,\r
          ...options\r
        };\r
        this.fbos = {\r
          vel_0: null,\r
          vel_1: null,\r
          vel_viscous0: null,\r
          vel_viscous1: null,\r
          div: null,\r
          pressure_0: null,\r
          pressure_1: null\r
        };\r
        this.fboSize = new THREE.Vector2();\r
        this.cellScale = new THREE.Vector2();\r
        this.boundarySpace = new THREE.Vector2();\r
        this.init();\r
      }\r
      init() {\r
        this.calcSize();\r
        this.createAllFBO();\r
        this.createShaderPass();\r
      }\r
      getFloatType() {\r
        const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);\r
        return isIOS ? THREE.HalfFloatType : THREE.FloatType;\r
      }\r
      createAllFBO() {\r
        const type = this.getFloatType();\r
        const opts = {\r
          type,\r
          depthBuffer: false,\r
          stencilBuffer: false,\r
          minFilter: THREE.LinearFilter,\r
          magFilter: THREE.LinearFilter,\r
          wrapS: THREE.ClampToEdgeWrapping,\r
          wrapT: THREE.ClampToEdgeWrapping\r
        };\r
        for (let key in this.fbos) {\r
          this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts);\r
        }\r
      }\r
      createShaderPass() {\r
        this.advection = new Advection({\r
          cellScale: this.cellScale,\r
          fboSize: this.fboSize,\r
          dt: this.options.dt,\r
          src: this.fbos.vel_0,\r
          dst: this.fbos.vel_1\r
        });\r
        this.externalForce = new ExternalForce({\r
          cellScale: this.cellScale,\r
          cursor_size: this.options.cursor_size,\r
          dst: this.fbos.vel_1\r
        });\r
        this.viscous = new Viscous({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          viscous: this.options.viscous,\r
          src: this.fbos.vel_1,\r
          dst: this.fbos.vel_viscous1,\r
          dst_: this.fbos.vel_viscous0,\r
          dt: this.options.dt\r
        });\r
        this.divergence = new Divergence({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src: this.fbos.vel_viscous0,\r
          dst: this.fbos.div,\r
          dt: this.options.dt\r
        });\r
        this.poisson = new Poisson({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src: this.fbos.div,\r
          dst: this.fbos.pressure_1,\r
          dst_: this.fbos.pressure_0\r
        });\r
        this.pressure = new Pressure({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src_p: this.fbos.pressure_0,\r
          src_v: this.fbos.vel_viscous0,\r
          dst: this.fbos.vel_0,\r
          dt: this.options.dt\r
        });\r
      }\r
      calcSize() {\r
        const width = Math.max(1, Math.round(this.options.resolution * Common.width));\r
        const height = Math.max(1, Math.round(this.options.resolution * Common.height));\r
        const px_x = 1.0 / width;\r
        const px_y = 1.0 / height;\r
        this.cellScale.set(px_x, px_y);\r
        this.fboSize.set(width, height);\r
      }\r
      resize() {\r
        this.calcSize();\r
        for (let key in this.fbos) {\r
          this.fbos[key].setSize(this.fboSize.x, this.fboSize.y);\r
        }\r
      }\r
      update() {\r
        if (this.options.isBounce) {\r
          this.boundarySpace.set(0, 0);\r
        } else {\r
          this.boundarySpace.copy(this.cellScale);\r
        }\r
        this.advection.update({\r
          dt: this.options.dt,\r
          isBounce: this.options.isBounce,\r
          BFECC: this.options.BFECC\r
        });\r
        this.externalForce.update({\r
          cursor_size: this.options.cursor_size,\r
          mouse_force: this.options.mouse_force,\r
          cellScale: this.cellScale\r
        });\r
        let vel = this.fbos.vel_1;\r
        if (this.options.isViscous) {\r
          vel = this.viscous.update({\r
            viscous: this.options.viscous,\r
            iterations: this.options.iterations_viscous,\r
            dt: this.options.dt\r
          });\r
        }\r
        this.divergence.update({ vel });\r
        const pressure = this.poisson.update({\r
          iterations: this.options.iterations_poisson\r
        });\r
        this.pressure.update({ vel, pressure });\r
      }\r
    }\r
\r
    class Output {\r
      constructor() {\r
        this.init();\r
      }\r
      init() {\r
        this.simulation = new Simulation();\r
        this.scene = new THREE.Scene();\r
        this.camera = new THREE.Camera();\r
        this.output = new THREE.Mesh(\r
          new THREE.PlaneGeometry(2, 2),\r
          new THREE.RawShaderMaterial({\r
            vertexShader: face_vert,\r
            fragmentShader: color_frag,\r
            transparent: true,\r
            depthWrite: false,\r
            uniforms: {\r
              velocity: { value: this.simulation.fbos.vel_0.texture },\r
              boundarySpace: { value: new THREE.Vector2() },\r
              palette: { value: paletteTex },\r
              bgColor: { value: bgVec4 }\r
            }\r
          })\r
        );\r
        this.scene.add(this.output);\r
      }\r
      addScene(mesh) {\r
        this.scene.add(mesh);\r
      }\r
      resize() {\r
        this.simulation.resize();\r
      }\r
      render() {\r
        Common.renderer.setRenderTarget(null);\r
        Common.renderer.render(this.scene, this.camera);\r
      }\r
      update() {\r
        this.simulation.update();\r
        this.render();\r
      }\r
    }\r
\r
    class WebGLManager {\r
      constructor(props) {\r
        this.props = props;\r
        Common.init(props.$wrapper);\r
        Mouse.init(props.$wrapper);\r
        Mouse.autoIntensity = props.autoIntensity;\r
        Mouse.takeoverDuration = props.takeoverDuration;\r
        this.lastUserInteraction = performance.now();\r
        Mouse.onInteract = () => {\r
          this.lastUserInteraction = performance.now();\r
          if (this.autoDriver) this.autoDriver.forceStop();\r
        };\r
        this.autoDriver = new AutoDriver(Mouse, this, {\r
          enabled: props.autoDemo,\r
          speed: props.autoSpeed,\r
          resumeDelay: props.autoResumeDelay,\r
          rampDuration: props.autoRampDuration\r
        });\r
        this.init();\r
        this._loop = this.loop.bind(this);\r
        this._resize = this.resize.bind(this);\r
        window.addEventListener('resize', this._resize);\r
        this._onVisibility = () => {\r
          const hidden = document.hidden;\r
          if (hidden) {\r
            this.pause();\r
          } else if (isVisibleRef.current) {\r
            this.start();\r
          }\r
        };\r
        document.addEventListener('visibilitychange', this._onVisibility);\r
        this.running = false;\r
      }\r
      init() {\r
        this.props.$wrapper.prepend(Common.renderer.domElement);\r
        this.output = new Output();\r
      }\r
      resize() {\r
        Common.resize();\r
        this.output.resize();\r
      }\r
      render() {\r
        if (this.autoDriver) this.autoDriver.update();\r
        Mouse.update();\r
        Common.update();\r
        this.output.update();\r
      }\r
      loop() {\r
        if (!this.running) return; // safety\r
        this.render();\r
        rafRef.current = requestAnimationFrame(this._loop);\r
      }\r
      start() {\r
        if (this.running) return;\r
        this.running = true;\r
        this._loop();\r
      }\r
      pause() {\r
        this.running = false;\r
        if (rafRef.current) {\r
          cancelAnimationFrame(rafRef.current);\r
          rafRef.current = null;\r
        }\r
      }\r
      dispose() {\r
        try {\r
          window.removeEventListener('resize', this._resize);\r
          document.removeEventListener('visibilitychange', this._onVisibility);\r
          Mouse.dispose();\r
          if (Common.renderer) {\r
            const canvas = Common.renderer.domElement;\r
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);\r
            Common.renderer.dispose();\r
          }\r
        } catch (e) {\r
          void 0;\r
        }\r
      }\r
    }\r
\r
    const container = mountRef.current;\r
    container.style.position = container.style.position || 'relative';\r
    container.style.overflow = container.style.overflow || 'hidden';\r
\r
    const webgl = new WebGLManager({\r
      $wrapper: container,\r
      autoDemo,\r
      autoSpeed,\r
      autoIntensity,\r
      takeoverDuration,\r
      autoResumeDelay,\r
      autoRampDuration\r
    });\r
    webglRef.current = webgl;\r
\r
    const applyOptionsFromProps = () => {\r
      if (!webglRef.current) return;\r
      const sim = webglRef.current.output?.simulation;\r
      if (!sim) return;\r
      const prevRes = sim.options.resolution;\r
      Object.assign(sim.options, {\r
        mouse_force: mouseForce,\r
        cursor_size: cursorSize,\r
        isViscous,\r
        viscous,\r
        iterations_viscous: iterationsViscous,\r
        iterations_poisson: iterationsPoisson,\r
        dt,\r
        BFECC,\r
        resolution,\r
        isBounce\r
      });\r
      if (resolution !== prevRes) {\r
        sim.resize();\r
      }\r
    };\r
    applyOptionsFromProps();\r
\r
    webgl.start();\r
\r
    // IntersectionObserver to pause rendering when not visible\r
    const io = new IntersectionObserver(\r
      entries => {\r
        const entry = entries[0];\r
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;\r
        isVisibleRef.current = isVisible;\r
        if (!webglRef.current) return;\r
        if (isVisible && !document.hidden) {\r
          webglRef.current.start();\r
        } else {\r
          webglRef.current.pause();\r
        }\r
      },\r
      { threshold: [0, 0.01, 0.1] }\r
    );\r
    io.observe(container);\r
    intersectionObserverRef.current = io;\r
\r
    const ro = new ResizeObserver(() => {\r
      if (!webglRef.current) return;\r
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);\r
      resizeRafRef.current = requestAnimationFrame(() => {\r
        if (!webglRef.current) return;\r
        webglRef.current.resize();\r
      });\r
    });\r
    ro.observe(container);\r
    resizeObserverRef.current = ro;\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      if (resizeObserverRef.current) {\r
        try {\r
          resizeObserverRef.current.disconnect();\r
        } catch (e) {\r
          void 0;\r
        }\r
      }\r
      if (intersectionObserverRef.current) {\r
        try {\r
          intersectionObserverRef.current.disconnect();\r
        } catch (e) {\r
          void 0;\r
        }\r
      }\r
      if (webglRef.current) {\r
        webglRef.current.dispose();\r
      }\r
      webglRef.current = null;\r
    };\r
  }, [\r
    BFECC,\r
    cursorSize,\r
    dt,\r
    isBounce,\r
    isViscous,\r
    iterationsPoisson,\r
    iterationsViscous,\r
    mouseForce,\r
    resolution,\r
    viscous,\r
    colors,\r
    autoDemo,\r
    autoSpeed,\r
    autoIntensity,\r
    takeoverDuration,\r
    autoResumeDelay,\r
    autoRampDuration\r
  ]);\r
\r
  useEffect(() => {\r
    const webgl = webglRef.current;\r
    if (!webgl) return;\r
    const sim = webgl.output?.simulation;\r
    if (!sim) return;\r
    const prevRes = sim.options.resolution;\r
    Object.assign(sim.options, {\r
      mouse_force: mouseForce,\r
      cursor_size: cursorSize,\r
      isViscous,\r
      viscous,\r
      iterations_viscous: iterationsViscous,\r
      iterations_poisson: iterationsPoisson,\r
      dt,\r
      BFECC,\r
      resolution,\r
      isBounce\r
    });\r
    if (webgl.autoDriver) {\r
      webgl.autoDriver.enabled = autoDemo;\r
      webgl.autoDriver.speed = autoSpeed;\r
      webgl.autoDriver.resumeDelay = autoResumeDelay;\r
      webgl.autoDriver.rampDurationMs = autoRampDuration * 1000;\r
      if (webgl.autoDriver.mouse) {\r
        webgl.autoDriver.mouse.autoIntensity = autoIntensity;\r
        webgl.autoDriver.mouse.takeoverDuration = takeoverDuration;\r
      }\r
    }\r
    if (resolution !== prevRes) {\r
      sim.resize();\r
    }\r
  }, [\r
    mouseForce,\r
    cursorSize,\r
    isViscous,\r
    viscous,\r
    iterationsViscous,\r
    iterationsPoisson,\r
    dt,\r
    BFECC,\r
    resolution,\r
    isBounce,\r
    autoDemo,\r
    autoSpeed,\r
    autoIntensity,\r
    takeoverDuration,\r
    autoResumeDelay,\r
    autoRampDuration\r
  ]);\r
\r
  return <div ref={mountRef} className={\`liquid-ether-container \${className || ''}\`} style={style} />;\r
}\r
`,$=`.liquid-ether-container {\r
  position: relative;\r
  overflow: hidden;\r
  width: 100%;\r
  height: 100%;\r
  touch-action: none;\r
}\r
`,J=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
\r
export default function LiquidEther({\r
  mouseForce = 20,\r
  cursorSize = 100,\r
  isViscous = false,\r
  viscous = 30,\r
  iterationsViscous = 32,\r
  iterationsPoisson = 32,\r
  dt = 0.014,\r
  BFECC = true,\r
  resolution = 0.5,\r
  isBounce = false,\r
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],\r
  style = {},\r
  className = '',\r
  autoDemo = true,\r
  autoSpeed = 0.5,\r
  autoIntensity = 2.2,\r
  takeoverDuration = 0.25,\r
  autoResumeDelay = 1000,\r
  autoRampDuration = 0.6\r
}) {\r
  const mountRef = useRef(null);\r
  const webglRef = useRef(null);\r
  const resizeObserverRef = useRef(null);\r
  const rafRef = useRef(null);\r
  const intersectionObserverRef = useRef(null);\r
  const isVisibleRef = useRef(true);\r
  const resizeRafRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!mountRef.current) return;\r
\r
    function makePaletteTexture(stops) {\r
      let arr;\r
      if (Array.isArray(stops) && stops.length > 0) {\r
        if (stops.length === 1) {\r
          arr = [stops[0], stops[0]];\r
        } else {\r
          arr = stops;\r
        }\r
      } else {\r
        arr = ['#ffffff', '#ffffff'];\r
      }\r
      const w = arr.length;\r
      const data = new Uint8Array(w * 4);\r
      for (let i = 0; i < w; i++) {\r
        const c = new THREE.Color(arr[i]);\r
        data[i * 4 + 0] = Math.round(c.r * 255);\r
        data[i * 4 + 1] = Math.round(c.g * 255);\r
        data[i * 4 + 2] = Math.round(c.b * 255);\r
        data[i * 4 + 3] = 255;\r
      }\r
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);\r
      tex.magFilter = THREE.LinearFilter;\r
      tex.minFilter = THREE.LinearFilter;\r
      tex.wrapS = THREE.ClampToEdgeWrapping;\r
      tex.wrapT = THREE.ClampToEdgeWrapping;\r
      tex.generateMipmaps = false;\r
      tex.needsUpdate = true;\r
      return tex;\r
    }\r
\r
    const paletteTex = makePaletteTexture(colors);\r
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0); // always transparent\r
\r
    class CommonClass {\r
      constructor() {\r
        this.width = 0;\r
        this.height = 0;\r
        this.aspect = 1;\r
        this.pixelRatio = 1;\r
        this.isMobile = false;\r
        this.breakpoint = 768;\r
        this.fboWidth = null;\r
        this.fboHeight = null;\r
        this.time = 0;\r
        this.delta = 0;\r
        this.container = null;\r
        this.renderer = null;\r
        this.clock = null;\r
      }\r
      init(container) {\r
        this.container = container;\r
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);\r
        this.resize();\r
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });\r
        this.renderer.autoClear = false;\r
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);\r
        this.renderer.setPixelRatio(this.pixelRatio);\r
        this.renderer.setSize(this.width, this.height);\r
        this.renderer.domElement.style.width = '100%';\r
        this.renderer.domElement.style.height = '100%';\r
        this.renderer.domElement.style.display = 'block';\r
        this.clock = new THREE.Clock();\r
        this.clock.start();\r
      }\r
      resize() {\r
        if (!this.container) return;\r
        const rect = this.container.getBoundingClientRect();\r
        this.width = Math.max(1, Math.floor(rect.width));\r
        this.height = Math.max(1, Math.floor(rect.height));\r
        this.aspect = this.width / this.height;\r
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);\r
      }\r
      update() {\r
        this.delta = this.clock.getDelta();\r
        this.time += this.delta;\r
      }\r
    }\r
    const Common = new CommonClass();\r
\r
    class MouseClass {\r
      constructor() {\r
        this.mouseMoved = false;\r
        this.coords = new THREE.Vector2();\r
        this.coords_old = new THREE.Vector2();\r
        this.diff = new THREE.Vector2();\r
        this.timer = null;\r
        this.container = null;\r
        this._onMouseMove = this.onDocumentMouseMove.bind(this);\r
        this._onTouchStart = this.onDocumentTouchStart.bind(this);\r
        this._onTouchMove = this.onDocumentTouchMove.bind(this);\r
        this._onMouseEnter = this.onMouseEnter.bind(this);\r
        this._onMouseLeave = this.onMouseLeave.bind(this);\r
        this._onTouchEnd = this.onTouchEnd.bind(this);\r
        this.isHoverInside = false;\r
        this.hasUserControl = false;\r
        this.isAutoActive = false;\r
        this.autoIntensity = 2.0;\r
        this.takeoverActive = false;\r
        this.takeoverStartTime = 0;\r
        this.takeoverDuration = 0.25;\r
        this.takeoverFrom = new THREE.Vector2();\r
        this.takeoverTo = new THREE.Vector2();\r
        this.onInteract = null;\r
      }\r
      init(container) {\r
        this.container = container;\r
        container.addEventListener('mousemove', this._onMouseMove, false);\r
        container.addEventListener('touchstart', this._onTouchStart, false);\r
        container.addEventListener('touchmove', this._onTouchMove, false);\r
        container.addEventListener('mouseenter', this._onMouseEnter, false);\r
        container.addEventListener('mouseleave', this._onMouseLeave, false);\r
        container.addEventListener('touchend', this._onTouchEnd, false);\r
      }\r
      dispose() {\r
        if (!this.container) return;\r
        this.container.removeEventListener('mousemove', this._onMouseMove, false);\r
        this.container.removeEventListener('touchstart', this._onTouchStart, false);\r
        this.container.removeEventListener('touchmove', this._onTouchMove, false);\r
        this.container.removeEventListener('mouseenter', this._onMouseEnter, false);\r
        this.container.removeEventListener('mouseleave', this._onMouseLeave, false);\r
        this.container.removeEventListener('touchend', this._onTouchEnd, false);\r
      }\r
      setCoords(x, y) {\r
        if (!this.container) return;\r
        if (this.timer) clearTimeout(this.timer);\r
        const rect = this.container.getBoundingClientRect();\r
        const nx = (x - rect.left) / rect.width;\r
        const ny = (y - rect.top) / rect.height;\r
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));\r
        this.mouseMoved = true;\r
        this.timer = setTimeout(() => {\r
          this.mouseMoved = false;\r
        }, 100);\r
      }\r
      setNormalized(nx, ny) {\r
        this.coords.set(nx, ny);\r
        this.mouseMoved = true;\r
      }\r
      onDocumentMouseMove(event) {\r
        if (this.onInteract) this.onInteract();\r
        if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {\r
          const rect = this.container.getBoundingClientRect();\r
          const nx = (event.clientX - rect.left) / rect.width;\r
          const ny = (event.clientY - rect.top) / rect.height;\r
          this.takeoverFrom.copy(this.coords);\r
          this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));\r
          this.takeoverStartTime = performance.now();\r
          this.takeoverActive = true;\r
          this.hasUserControl = true;\r
          this.isAutoActive = false;\r
          return;\r
        }\r
        this.setCoords(event.clientX, event.clientY);\r
        this.hasUserControl = true;\r
      }\r
      onDocumentTouchStart(event) {\r
        if (event.touches.length === 1) {\r
          const t = event.touches[0];\r
          if (this.onInteract) this.onInteract();\r
          this.setCoords(t.pageX, t.pageY);\r
          this.hasUserControl = true;\r
        }\r
      }\r
      onDocumentTouchMove(event) {\r
        if (event.touches.length === 1) {\r
          const t = event.touches[0];\r
          if (this.onInteract) this.onInteract();\r
          this.setCoords(t.pageX, t.pageY);\r
        }\r
      }\r
      onTouchEnd() {\r
        this.isHoverInside = false;\r
      }\r
      onMouseEnter() {\r
        this.isHoverInside = true;\r
      }\r
      onMouseLeave() {\r
        this.isHoverInside = false;\r
      }\r
      update() {\r
        if (this.takeoverActive) {\r
          const t = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000);\r
          if (t >= 1) {\r
            this.takeoverActive = false;\r
            this.coords.copy(this.takeoverTo);\r
            this.coords_old.copy(this.coords);\r
            this.diff.set(0, 0);\r
          } else {\r
            const k = t * t * (3 - 2 * t);\r
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);\r
          }\r
        }\r
        this.diff.subVectors(this.coords, this.coords_old);\r
        this.coords_old.copy(this.coords);\r
        if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);\r
        if (this.isAutoActive && !this.takeoverActive) this.diff.multiplyScalar(this.autoIntensity);\r
      }\r
    }\r
    const Mouse = new MouseClass();\r
\r
    class AutoDriver {\r
      constructor(mouse, manager, opts) {\r
        this.mouse = mouse;\r
        this.manager = manager;\r
        this.enabled = opts.enabled;\r
        this.speed = opts.speed; // normalized units/sec\r
        this.resumeDelay = opts.resumeDelay || 3000; // ms\r
        this.rampDurationMs = (opts.rampDuration || 0) * 1000;\r
        this.active = false;\r
        this.current = new THREE.Vector2(0, 0);\r
        this.target = new THREE.Vector2();\r
        this.lastTime = performance.now();\r
        this.activationTime = 0;\r
        this.margin = 0.2;\r
        this._tmpDir = new THREE.Vector2(); // reuse temp vector to avoid per-frame alloc\r
        this.pickNewTarget();\r
      }\r
      pickNewTarget() {\r
        const r = Math.random;\r
        this.target.set((r() * 2 - 1) * (1 - this.margin), (r() * 2 - 1) * (1 - this.margin));\r
      }\r
      forceStop() {\r
        this.active = false;\r
        this.mouse.isAutoActive = false;\r
      }\r
      update() {\r
        if (!this.enabled) return;\r
        const now = performance.now();\r
        const idle = now - this.manager.lastUserInteraction;\r
        if (idle < this.resumeDelay) {\r
          if (this.active) this.forceStop();\r
          return;\r
        }\r
        if (this.mouse.isHoverInside) {\r
          if (this.active) this.forceStop();\r
          return;\r
        }\r
        if (!this.active) {\r
          this.active = true;\r
          this.current.copy(this.mouse.coords);\r
          this.lastTime = now;\r
          this.activationTime = now;\r
        }\r
        if (!this.active) return;\r
        this.mouse.isAutoActive = true;\r
        let dtSec = (now - this.lastTime) / 1000;\r
        this.lastTime = now;\r
        if (dtSec > 0.2) dtSec = 0.016;\r
        const dir = this._tmpDir.subVectors(this.target, this.current);\r
        const dist = dir.length();\r
        if (dist < 0.01) {\r
          this.pickNewTarget();\r
          return;\r
        }\r
        dir.normalize();\r
        let ramp = 1;\r
        if (this.rampDurationMs > 0) {\r
          const t = Math.min(1, (now - this.activationTime) / this.rampDurationMs);\r
          ramp = t * t * (3 - 2 * t);\r
        }\r
        const step = this.speed * dtSec * ramp;\r
        const move = Math.min(step, dist);\r
        this.current.addScaledVector(dir, move);\r
        this.mouse.setNormalized(this.current.x, this.current.y);\r
      }\r
    }\r
\r
    const face_vert = \`\r
  attribute vec3 position;\r
  uniform vec2 px;\r
  uniform vec2 boundarySpace;\r
  varying vec2 uv;\r
  precision highp float;\r
  void main(){\r
  vec3 pos = position;\r
  vec2 scale = 1.0 - boundarySpace * 2.0;\r
  pos.xy = pos.xy * scale;\r
  uv = vec2(0.5)+(pos.xy)*0.5;\r
  gl_Position = vec4(pos, 1.0);\r
}\r
\`;\r
    const line_vert = \`\r
  attribute vec3 position;\r
  uniform vec2 px;\r
  precision highp float;\r
  varying vec2 uv;\r
  void main(){\r
  vec3 pos = position;\r
  uv = 0.5 + pos.xy * 0.5;\r
  vec2 n = sign(pos.xy);\r
  pos.xy = abs(pos.xy) - px * 1.0;\r
  pos.xy *= n;\r
  gl_Position = vec4(pos, 1.0);\r
}\r
\`;\r
    const mouse_vert = \`\r
    precision highp float;\r
    attribute vec3 position;\r
    attribute vec2 uv;\r
    uniform vec2 center;\r
    uniform vec2 scale;\r
    uniform vec2 px;\r
    varying vec2 vUv;\r
    void main(){\r
    vec2 pos = position.xy * scale * 2.0 * px + center;\r
    vUv = uv;\r
    gl_Position = vec4(pos, 0.0, 1.0);\r
}\r
\`;\r
    const advection_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform float dt;\r
    uniform bool isBFECC;\r
    uniform vec2 fboSize;\r
    uniform vec2 px;\r
    varying vec2 uv;\r
    void main(){\r
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;\r
    if(isBFECC == false){\r
        vec2 vel = texture2D(velocity, uv).xy;\r
        vec2 uv2 = uv - vel * dt * ratio;\r
        vec2 newVel = texture2D(velocity, uv2).xy;\r
        gl_FragColor = vec4(newVel, 0.0, 0.0);\r
    } else {\r
        vec2 spot_new = uv;\r
        vec2 vel_old = texture2D(velocity, uv).xy;\r
        vec2 spot_old = spot_new - vel_old * dt * ratio;\r
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;\r
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;\r
        vec2 error = spot_new2 - spot_new;\r
        vec2 spot_new3 = spot_new - error / 2.0;\r
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;\r
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;\r
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; \r
        gl_FragColor = vec4(newVel2, 0.0, 0.0);\r
    }\r
}\r
\`;\r
    const color_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform sampler2D palette;\r
    uniform vec4 bgColor;\r
    varying vec2 uv;\r
    void main(){\r
    vec2 vel = texture2D(velocity, uv).xy;\r
    float lenv = clamp(length(vel), 0.0, 1.0);\r
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;\r
    vec3 outRGB = mix(bgColor.rgb, c, lenv);\r
    float outA = mix(bgColor.a, 1.0, lenv);\r
    gl_FragColor = vec4(outRGB, outA);\r
}\r
\`;\r
    const divergence_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform float dt;\r
    uniform vec2 px;\r
    varying vec2 uv;\r
    void main(){\r
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;\r
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;\r
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;\r
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;\r
    float divergence = (x1 - x0 + y1 - y0) / 2.0;\r
    gl_FragColor = vec4(divergence / dt);\r
}\r
\`;\r
    const externalForce_frag = \`\r
    precision highp float;\r
    uniform vec2 force;\r
    uniform vec2 center;\r
    uniform vec2 scale;\r
    uniform vec2 px;\r
    varying vec2 vUv;\r
    void main(){\r
    vec2 circle = (vUv - 0.5) * 2.0;\r
    float d = 1.0 - min(length(circle), 1.0);\r
    d *= d;\r
    gl_FragColor = vec4(force * d, 0.0, 1.0);\r
}\r
\`;\r
    const poisson_frag = \`\r
    precision highp float;\r
    uniform sampler2D pressure;\r
    uniform sampler2D divergence;\r
    uniform vec2 px;\r
    varying vec2 uv;\r
    void main(){\r
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;\r
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;\r
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;\r
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;\r
    float div = texture2D(divergence, uv).r;\r
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;\r
    gl_FragColor = vec4(newP);\r
}\r
\`;\r
    const pressure_frag = \`\r
    precision highp float;\r
    uniform sampler2D pressure;\r
    uniform sampler2D velocity;\r
    uniform vec2 px;\r
    uniform float dt;\r
    varying vec2 uv;\r
    void main(){\r
    float step = 1.0;\r
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;\r
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;\r
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;\r
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;\r
    vec2 v = texture2D(velocity, uv).xy;\r
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;\r
    v = v - gradP * dt;\r
    gl_FragColor = vec4(v, 0.0, 1.0);\r
}\r
\`;\r
    const viscous_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform sampler2D velocity_new;\r
    uniform float v;\r
    uniform vec2 px;\r
    uniform float dt;\r
    varying vec2 uv;\r
    void main(){\r
    vec2 old = texture2D(velocity, uv).xy;\r
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;\r
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;\r
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;\r
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;\r
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);\r
    newv /= 4.0 * (1.0 + v * dt);\r
    gl_FragColor = vec4(newv, 0.0, 0.0);\r
}\r
\`;\r
\r
    class ShaderPass {\r
      constructor(props) {\r
        this.props = props || {};\r
        this.uniforms = this.props.material?.uniforms;\r
        this.scene = null;\r
        this.camera = null;\r
        this.material = null;\r
        this.geometry = null;\r
        this.plane = null;\r
      }\r
      init() {\r
        this.scene = new THREE.Scene();\r
        this.camera = new THREE.Camera();\r
        if (this.uniforms) {\r
          this.material = new THREE.RawShaderMaterial(this.props.material);\r
          this.geometry = new THREE.PlaneGeometry(2.0, 2.0);\r
          this.plane = new THREE.Mesh(this.geometry, this.material);\r
          this.scene.add(this.plane);\r
        }\r
      }\r
      update() {\r
        Common.renderer.setRenderTarget(this.props.output || null);\r
        Common.renderer.render(this.scene, this.camera);\r
        Common.renderer.setRenderTarget(null);\r
      }\r
    }\r
\r
    class Advection extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: advection_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.cellScale },\r
              px: { value: simProps.cellScale },\r
              fboSize: { value: simProps.fboSize },\r
              velocity: { value: simProps.src.texture },\r
              dt: { value: simProps.dt },\r
              isBFECC: { value: true }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.uniforms = this.props.material.uniforms;\r
        this.init();\r
      }\r
      init() {\r
        super.init();\r
        this.createBoundary();\r
      }\r
      createBoundary() {\r
        const boundaryG = new THREE.BufferGeometry();\r
        const vertices_boundary = new Float32Array([\r
          -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 0\r
        ]);\r
        boundaryG.setAttribute('position', new THREE.BufferAttribute(vertices_boundary, 3));\r
        const boundaryM = new THREE.RawShaderMaterial({\r
          vertexShader: line_vert,\r
          fragmentShader: advection_frag,\r
          uniforms: this.uniforms\r
        });\r
        this.line = new THREE.LineSegments(boundaryG, boundaryM);\r
        this.scene.add(this.line);\r
      }\r
      update({ dt, isBounce, BFECC }) {\r
        this.uniforms.dt.value = dt;\r
        this.line.visible = isBounce;\r
        this.uniforms.isBFECC.value = BFECC;\r
        super.update();\r
      }\r
    }\r
\r
    class ExternalForce extends ShaderPass {\r
      constructor(simProps) {\r
        super({ output: simProps.dst });\r
        this.init(simProps);\r
      }\r
      init(simProps) {\r
        super.init();\r
        const mouseG = new THREE.PlaneGeometry(1, 1);\r
        const mouseM = new THREE.RawShaderMaterial({\r
          vertexShader: mouse_vert,\r
          fragmentShader: externalForce_frag,\r
          blending: THREE.AdditiveBlending,\r
          depthWrite: false,\r
          uniforms: {\r
            px: { value: simProps.cellScale },\r
            force: { value: new THREE.Vector2(0.0, 0.0) },\r
            center: { value: new THREE.Vector2(0.0, 0.0) },\r
            scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) }\r
          }\r
        });\r
        this.mouse = new THREE.Mesh(mouseG, mouseM);\r
        this.scene.add(this.mouse);\r
      }\r
      update(props) {\r
        const forceX = (Mouse.diff.x / 2) * props.mouse_force;\r
        const forceY = (Mouse.diff.y / 2) * props.mouse_force;\r
        const cursorSizeX = props.cursor_size * props.cellScale.x;\r
        const cursorSizeY = props.cursor_size * props.cellScale.y;\r
        const centerX = Math.min(\r
          Math.max(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2),\r
          1 - cursorSizeX - props.cellScale.x * 2\r
        );\r
        const centerY = Math.min(\r
          Math.max(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2),\r
          1 - cursorSizeY - props.cellScale.y * 2\r
        );\r
        const uniforms = this.mouse.material.uniforms;\r
        uniforms.force.value.set(forceX, forceY);\r
        uniforms.center.value.set(centerX, centerY);\r
        uniforms.scale.value.set(props.cursor_size, props.cursor_size);\r
        super.update();\r
      }\r
    }\r
\r
    class Viscous extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: viscous_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              velocity: { value: simProps.src.texture },\r
              velocity_new: { value: simProps.dst_.texture },\r
              v: { value: simProps.viscous },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst,\r
          output0: simProps.dst_,\r
          output1: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update({ viscous, iterations, dt }) {\r
        let fbo_in, fbo_out;\r
        this.uniforms.v.value = viscous;\r
        for (let i = 0; i < iterations; i++) {\r
          if (i % 2 === 0) {\r
            fbo_in = this.props.output0;\r
            fbo_out = this.props.output1;\r
          } else {\r
            fbo_in = this.props.output1;\r
            fbo_out = this.props.output0;\r
          }\r
          this.uniforms.velocity_new.value = fbo_in.texture;\r
          this.props.output = fbo_out;\r
          this.uniforms.dt.value = dt;\r
          super.update();\r
        }\r
        return fbo_out;\r
      }\r
    }\r
\r
    class Divergence extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: divergence_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              velocity: { value: simProps.src.texture },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update({ vel }) {\r
        this.uniforms.velocity.value = vel.texture;\r
        super.update();\r
      }\r
    }\r
\r
    class Poisson extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: poisson_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              pressure: { value: simProps.dst_.texture },\r
              divergence: { value: simProps.src.texture },\r
              px: { value: simProps.cellScale }\r
            }\r
          },\r
          output: simProps.dst,\r
          output0: simProps.dst_,\r
          output1: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update({ iterations }) {\r
        let p_in, p_out;\r
        for (let i = 0; i < iterations; i++) {\r
          if (i % 2 === 0) {\r
            p_in = this.props.output0;\r
            p_out = this.props.output1;\r
          } else {\r
            p_in = this.props.output1;\r
            p_out = this.props.output0;\r
          }\r
          this.uniforms.pressure.value = p_in.texture;\r
          this.props.output = p_out;\r
          super.update();\r
        }\r
        return p_out;\r
      }\r
    }\r
\r
    class Pressure extends ShaderPass {\r
      constructor(simProps) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: pressure_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              pressure: { value: simProps.src_p.texture },\r
              velocity: { value: simProps.src_v.texture },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update({ vel, pressure }) {\r
        this.uniforms.velocity.value = vel.texture;\r
        this.uniforms.pressure.value = pressure.texture;\r
        super.update();\r
      }\r
    }\r
\r
    class Simulation {\r
      constructor(options) {\r
        this.options = {\r
          iterations_poisson: 32,\r
          iterations_viscous: 32,\r
          mouse_force: 20,\r
          resolution: 0.5,\r
          cursor_size: 100,\r
          viscous: 30,\r
          isBounce: false,\r
          dt: 0.014,\r
          isViscous: false,\r
          BFECC: true,\r
          ...options\r
        };\r
        this.fbos = {\r
          vel_0: null,\r
          vel_1: null,\r
          vel_viscous0: null,\r
          vel_viscous1: null,\r
          div: null,\r
          pressure_0: null,\r
          pressure_1: null\r
        };\r
        this.fboSize = new THREE.Vector2();\r
        this.cellScale = new THREE.Vector2();\r
        this.boundarySpace = new THREE.Vector2();\r
        this.init();\r
      }\r
      init() {\r
        this.calcSize();\r
        this.createAllFBO();\r
        this.createShaderPass();\r
      }\r
      getFloatType() {\r
        const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);\r
        return isIOS ? THREE.HalfFloatType : THREE.FloatType;\r
      }\r
      createAllFBO() {\r
        const type = this.getFloatType();\r
        const opts = {\r
          type,\r
          depthBuffer: false,\r
          stencilBuffer: false,\r
          minFilter: THREE.LinearFilter,\r
          magFilter: THREE.LinearFilter,\r
          wrapS: THREE.ClampToEdgeWrapping,\r
          wrapT: THREE.ClampToEdgeWrapping\r
        };\r
        for (let key in this.fbos) {\r
          this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts);\r
        }\r
      }\r
      createShaderPass() {\r
        this.advection = new Advection({\r
          cellScale: this.cellScale,\r
          fboSize: this.fboSize,\r
          dt: this.options.dt,\r
          src: this.fbos.vel_0,\r
          dst: this.fbos.vel_1\r
        });\r
        this.externalForce = new ExternalForce({\r
          cellScale: this.cellScale,\r
          cursor_size: this.options.cursor_size,\r
          dst: this.fbos.vel_1\r
        });\r
        this.viscous = new Viscous({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          viscous: this.options.viscous,\r
          src: this.fbos.vel_1,\r
          dst: this.fbos.vel_viscous1,\r
          dst_: this.fbos.vel_viscous0,\r
          dt: this.options.dt\r
        });\r
        this.divergence = new Divergence({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src: this.fbos.vel_viscous0,\r
          dst: this.fbos.div,\r
          dt: this.options.dt\r
        });\r
        this.poisson = new Poisson({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src: this.fbos.div,\r
          dst: this.fbos.pressure_1,\r
          dst_: this.fbos.pressure_0\r
        });\r
        this.pressure = new Pressure({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src_p: this.fbos.pressure_0,\r
          src_v: this.fbos.vel_viscous0,\r
          dst: this.fbos.vel_0,\r
          dt: this.options.dt\r
        });\r
      }\r
      calcSize() {\r
        const width = Math.max(1, Math.round(this.options.resolution * Common.width));\r
        const height = Math.max(1, Math.round(this.options.resolution * Common.height));\r
        const px_x = 1.0 / width;\r
        const px_y = 1.0 / height;\r
        this.cellScale.set(px_x, px_y);\r
        this.fboSize.set(width, height);\r
      }\r
      resize() {\r
        this.calcSize();\r
        for (let key in this.fbos) {\r
          this.fbos[key].setSize(this.fboSize.x, this.fboSize.y);\r
        }\r
      }\r
      update() {\r
        if (this.options.isBounce) {\r
          this.boundarySpace.set(0, 0);\r
        } else {\r
          this.boundarySpace.copy(this.cellScale);\r
        }\r
        this.advection.update({\r
          dt: this.options.dt,\r
          isBounce: this.options.isBounce,\r
          BFECC: this.options.BFECC\r
        });\r
        this.externalForce.update({\r
          cursor_size: this.options.cursor_size,\r
          mouse_force: this.options.mouse_force,\r
          cellScale: this.cellScale\r
        });\r
        let vel = this.fbos.vel_1;\r
        if (this.options.isViscous) {\r
          vel = this.viscous.update({\r
            viscous: this.options.viscous,\r
            iterations: this.options.iterations_viscous,\r
            dt: this.options.dt\r
          });\r
        }\r
        this.divergence.update({ vel });\r
        const pressure = this.poisson.update({\r
          iterations: this.options.iterations_poisson\r
        });\r
        this.pressure.update({ vel, pressure });\r
      }\r
    }\r
\r
    class Output {\r
      constructor() {\r
        this.init();\r
      }\r
      init() {\r
        this.simulation = new Simulation();\r
        this.scene = new THREE.Scene();\r
        this.camera = new THREE.Camera();\r
        this.output = new THREE.Mesh(\r
          new THREE.PlaneGeometry(2, 2),\r
          new THREE.RawShaderMaterial({\r
            vertexShader: face_vert,\r
            fragmentShader: color_frag,\r
            transparent: true,\r
            depthWrite: false,\r
            uniforms: {\r
              velocity: { value: this.simulation.fbos.vel_0.texture },\r
              boundarySpace: { value: new THREE.Vector2() },\r
              palette: { value: paletteTex },\r
              bgColor: { value: bgVec4 }\r
            }\r
          })\r
        );\r
        this.scene.add(this.output);\r
      }\r
      addScene(mesh) {\r
        this.scene.add(mesh);\r
      }\r
      resize() {\r
        this.simulation.resize();\r
      }\r
      render() {\r
        Common.renderer.setRenderTarget(null);\r
        Common.renderer.render(this.scene, this.camera);\r
      }\r
      update() {\r
        this.simulation.update();\r
        this.render();\r
      }\r
    }\r
\r
    class WebGLManager {\r
      constructor(props) {\r
        this.props = props;\r
        Common.init(props.$wrapper);\r
        Mouse.init(props.$wrapper);\r
        Mouse.autoIntensity = props.autoIntensity;\r
        Mouse.takeoverDuration = props.takeoverDuration;\r
        this.lastUserInteraction = performance.now();\r
        Mouse.onInteract = () => {\r
          this.lastUserInteraction = performance.now();\r
          if (this.autoDriver) this.autoDriver.forceStop();\r
        };\r
        this.autoDriver = new AutoDriver(Mouse, this, {\r
          enabled: props.autoDemo,\r
          speed: props.autoSpeed,\r
          resumeDelay: props.autoResumeDelay,\r
          rampDuration: props.autoRampDuration\r
        });\r
        this.init();\r
        this._loop = this.loop.bind(this);\r
        this._resize = this.resize.bind(this);\r
        window.addEventListener('resize', this._resize);\r
        this._onVisibility = () => {\r
          const hidden = document.hidden;\r
          if (hidden) {\r
            this.pause();\r
          } else if (isVisibleRef.current) {\r
            this.start();\r
          }\r
        };\r
        document.addEventListener('visibilitychange', this._onVisibility);\r
        this.running = false;\r
      }\r
      init() {\r
        this.props.$wrapper.prepend(Common.renderer.domElement);\r
        this.output = new Output();\r
      }\r
      resize() {\r
        Common.resize();\r
        this.output.resize();\r
      }\r
      render() {\r
        if (this.autoDriver) this.autoDriver.update();\r
        Mouse.update();\r
        Common.update();\r
        this.output.update();\r
      }\r
      loop() {\r
        if (!this.running) return; // safety\r
        this.render();\r
        rafRef.current = requestAnimationFrame(this._loop);\r
      }\r
      start() {\r
        if (this.running) return;\r
        this.running = true;\r
        this._loop();\r
      }\r
      pause() {\r
        this.running = false;\r
        if (rafRef.current) {\r
          cancelAnimationFrame(rafRef.current);\r
          rafRef.current = null;\r
        }\r
      }\r
      dispose() {\r
        try {\r
          window.removeEventListener('resize', this._resize);\r
          document.removeEventListener('visibilitychange', this._onVisibility);\r
          Mouse.dispose();\r
          if (Common.renderer) {\r
            const canvas = Common.renderer.domElement;\r
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);\r
            Common.renderer.dispose();\r
          }\r
        } catch (e) {\r
          void 0;\r
        }\r
      }\r
    }\r
\r
    const container = mountRef.current;\r
    container.style.position = container.style.position || 'relative';\r
    container.style.overflow = container.style.overflow || 'hidden';\r
\r
    const webgl = new WebGLManager({\r
      $wrapper: container,\r
      autoDemo,\r
      autoSpeed,\r
      autoIntensity,\r
      takeoverDuration,\r
      autoResumeDelay,\r
      autoRampDuration\r
    });\r
    webglRef.current = webgl;\r
\r
    const applyOptionsFromProps = () => {\r
      if (!webglRef.current) return;\r
      const sim = webglRef.current.output?.simulation;\r
      if (!sim) return;\r
      const prevRes = sim.options.resolution;\r
      Object.assign(sim.options, {\r
        mouse_force: mouseForce,\r
        cursor_size: cursorSize,\r
        isViscous,\r
        viscous,\r
        iterations_viscous: iterationsViscous,\r
        iterations_poisson: iterationsPoisson,\r
        dt,\r
        BFECC,\r
        resolution,\r
        isBounce\r
      });\r
      if (resolution !== prevRes) {\r
        sim.resize();\r
      }\r
    };\r
    applyOptionsFromProps();\r
\r
    webgl.start();\r
\r
    // IntersectionObserver to pause rendering when not visible\r
    const io = new IntersectionObserver(\r
      entries => {\r
        const entry = entries[0];\r
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;\r
        isVisibleRef.current = isVisible;\r
        if (!webglRef.current) return;\r
        if (isVisible && !document.hidden) {\r
          webglRef.current.start();\r
        } else {\r
          webglRef.current.pause();\r
        }\r
      },\r
      { threshold: [0, 0.01, 0.1] }\r
    );\r
    io.observe(container);\r
    intersectionObserverRef.current = io;\r
\r
    const ro = new ResizeObserver(() => {\r
      if (!webglRef.current) return;\r
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);\r
      resizeRafRef.current = requestAnimationFrame(() => {\r
        if (!webglRef.current) return;\r
        webglRef.current.resize();\r
      });\r
    });\r
    ro.observe(container);\r
    resizeObserverRef.current = ro;\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      if (resizeObserverRef.current) {\r
        try {\r
          resizeObserverRef.current.disconnect();\r
        } catch (e) {\r
          void 0;\r
        }\r
      }\r
      if (intersectionObserverRef.current) {\r
        try {\r
          intersectionObserverRef.current.disconnect();\r
        } catch (e) {\r
          void 0;\r
        }\r
      }\r
      if (webglRef.current) {\r
        webglRef.current.dispose();\r
      }\r
      webglRef.current = null;\r
    };\r
  }, [\r
    BFECC,\r
    cursorSize,\r
    dt,\r
    isBounce,\r
    isViscous,\r
    iterationsPoisson,\r
    iterationsViscous,\r
    mouseForce,\r
    resolution,\r
    viscous,\r
    colors,\r
    autoDemo,\r
    autoSpeed,\r
    autoIntensity,\r
    takeoverDuration,\r
    autoResumeDelay,\r
    autoRampDuration\r
  ]);\r
\r
  useEffect(() => {\r
    const webgl = webglRef.current;\r
    if (!webgl) return;\r
    const sim = webgl.output?.simulation;\r
    if (!sim) return;\r
    const prevRes = sim.options.resolution;\r
    Object.assign(sim.options, {\r
      mouse_force: mouseForce,\r
      cursor_size: cursorSize,\r
      isViscous,\r
      viscous,\r
      iterations_viscous: iterationsViscous,\r
      iterations_poisson: iterationsPoisson,\r
      dt,\r
      BFECC,\r
      resolution,\r
      isBounce\r
    });\r
    if (webgl.autoDriver) {\r
      webgl.autoDriver.enabled = autoDemo;\r
      webgl.autoDriver.speed = autoSpeed;\r
      webgl.autoDriver.resumeDelay = autoResumeDelay;\r
      webgl.autoDriver.rampDurationMs = autoRampDuration * 1000;\r
      if (webgl.autoDriver.mouse) {\r
        webgl.autoDriver.mouse.autoIntensity = autoIntensity;\r
        webgl.autoDriver.mouse.takeoverDuration = takeoverDuration;\r
      }\r
    }\r
    if (resolution !== prevRes) {\r
      sim.resize();\r
    }\r
  }, [\r
    mouseForce,\r
    cursorSize,\r
    isViscous,\r
    viscous,\r
    iterationsViscous,\r
    iterationsPoisson,\r
    dt,\r
    BFECC,\r
    resolution,\r
    isBounce,\r
    autoDemo,\r
    autoSpeed,\r
    autoIntensity,\r
    takeoverDuration,\r
    autoResumeDelay,\r
    autoRampDuration\r
  ]);\r
\r
  return (\r
    <div\r
      ref={mountRef}\r
      className={\`w-full h-full relative overflow-hidden pointer-events-none touch-none \${className || ''}\`}\r
      style={style}\r
    />\r
  );\r
}\r
`,K=`import React, { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import './LiquidEther.css';\r
\r
export interface LiquidEtherProps {\r
  mouseForce?: number;\r
  cursorSize?: number;\r
  isViscous?: boolean;\r
  viscous?: number;\r
  iterationsViscous?: number;\r
  iterationsPoisson?: number;\r
  dt?: number;\r
  BFECC?: boolean;\r
  resolution?: number;\r
  isBounce?: boolean;\r
  colors?: string[];\r
  style?: React.CSSProperties;\r
  className?: string;\r
  autoDemo?: boolean;\r
  autoSpeed?: number;\r
  autoIntensity?: number;\r
  takeoverDuration?: number;\r
  autoResumeDelay?: number;\r
  autoRampDuration?: number;\r
}\r
\r
interface SimOptions {\r
  iterations_poisson: number;\r
  iterations_viscous: number;\r
  mouse_force: number;\r
  resolution: number;\r
  cursor_size: number;\r
  viscous: number;\r
  isBounce: boolean;\r
  dt: number;\r
  isViscous: boolean;\r
  BFECC: boolean;\r
}\r
\r
interface LiquidEtherWebGL {\r
  output?: { simulation?: { options: SimOptions; resize: () => void } };\r
  autoDriver?: {\r
    enabled: boolean;\r
    speed: number;\r
    resumeDelay: number;\r
    rampDurationMs: number;\r
    mouse?: { autoIntensity: number; takeoverDuration: number };\r
    forceStop: () => void;\r
  };\r
  resize: () => void;\r
  start: () => void;\r
  pause: () => void;\r
  dispose: () => void;\r
}\r
\r
const defaultColors = ['#5227FF', '#FF9FFC', '#B19EEF'];\r
\r
export default function LiquidEther({\r
  mouseForce = 20,\r
  cursorSize = 100,\r
  isViscous = false,\r
  viscous = 30,\r
  iterationsViscous = 32,\r
  iterationsPoisson = 32,\r
  dt = 0.014,\r
  BFECC = true,\r
  resolution = 0.5,\r
  isBounce = false,\r
  colors = defaultColors,\r
  style = {},\r
  className = '',\r
  autoDemo = true,\r
  autoSpeed = 0.5,\r
  autoIntensity = 2.2,\r
  takeoverDuration = 0.25,\r
  autoResumeDelay = 1000,\r
  autoRampDuration = 0.6\r
}: LiquidEtherProps): React.ReactElement {\r
  const mountRef = useRef<HTMLDivElement | null>(null);\r
  const webglRef = useRef<LiquidEtherWebGL | null>(null);\r
  const resizeObserverRef = useRef<ResizeObserver | null>(null);\r
  const rafRef = useRef<number | null>(null);\r
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);\r
  const isVisibleRef = useRef<boolean>(true);\r
  const resizeRafRef = useRef<number | null>(null);\r
\r
  useEffect(() => {\r
    if (!mountRef.current) return;\r
\r
    function makePaletteTexture(stops: string[]): THREE.DataTexture {\r
      let arr: string[];\r
      if (Array.isArray(stops) && stops.length > 0) {\r
        arr = stops.length === 1 ? [stops[0], stops[0]] : stops;\r
      } else {\r
        arr = ['#ffffff', '#ffffff'];\r
      }\r
      const w = arr.length;\r
      const data = new Uint8Array(w * 4);\r
      for (let i = 0; i < w; i++) {\r
        const c = new THREE.Color(arr[i]);\r
        data[i * 4 + 0] = Math.round(c.r * 255);\r
        data[i * 4 + 1] = Math.round(c.g * 255);\r
        data[i * 4 + 2] = Math.round(c.b * 255);\r
        data[i * 4 + 3] = 255;\r
      }\r
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);\r
      tex.magFilter = THREE.LinearFilter;\r
      tex.minFilter = THREE.LinearFilter;\r
      tex.wrapS = THREE.ClampToEdgeWrapping;\r
      tex.wrapT = THREE.ClampToEdgeWrapping;\r
      tex.generateMipmaps = false;\r
      tex.needsUpdate = true;\r
      return tex;\r
    }\r
\r
    const paletteTex = makePaletteTexture(colors);\r
    // Hard-code transparent background vector (alpha 0)\r
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);\r
\r
    class CommonClass {\r
      width = 0;\r
      height = 0;\r
      aspect = 1;\r
      pixelRatio = 1;\r
      isMobile = false;\r
      breakpoint = 768;\r
      fboWidth: number | null = null;\r
      fboHeight: number | null = null;\r
      time = 0;\r
      delta = 0;\r
      container: HTMLElement | null = null;\r
      renderer: THREE.WebGLRenderer | null = null;\r
      clock: THREE.Clock | null = null;\r
      init(container: HTMLElement) {\r
        this.container = container;\r
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);\r
        this.resize();\r
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });\r
        // Always transparent\r
        this.renderer.autoClear = false;\r
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);\r
        this.renderer.setPixelRatio(this.pixelRatio);\r
        this.renderer.setSize(this.width, this.height);\r
        const el = this.renderer.domElement;\r
        el.style.width = '100%';\r
        el.style.height = '100%';\r
        el.style.display = 'block';\r
        this.clock = new THREE.Clock();\r
        this.clock.start();\r
      }\r
      resize() {\r
        if (!this.container) return;\r
        const rect = this.container.getBoundingClientRect();\r
        this.width = Math.max(1, Math.floor(rect.width));\r
        this.height = Math.max(1, Math.floor(rect.height));\r
        this.aspect = this.width / this.height;\r
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);\r
      }\r
      update() {\r
        if (!this.clock) return;\r
        this.delta = this.clock.getDelta();\r
        this.time += this.delta;\r
      }\r
    }\r
    const Common = new CommonClass();\r
\r
    class MouseClass {\r
      mouseMoved = false;\r
      coords = new THREE.Vector2();\r
      coords_old = new THREE.Vector2();\r
      diff = new THREE.Vector2();\r
      timer: number | null = null;\r
      container: HTMLElement | null = null;\r
      isHoverInside = false;\r
      hasUserControl = false;\r
      isAutoActive = false;\r
      autoIntensity = 2.0;\r
      takeoverActive = false;\r
      takeoverStartTime = 0;\r
      takeoverDuration = 0.25;\r
      takeoverFrom = new THREE.Vector2();\r
      takeoverTo = new THREE.Vector2();\r
      onInteract: (() => void) | null = null;\r
      private _onMouseMove = this.onDocumentMouseMove.bind(this);\r
      private _onTouchStart = this.onDocumentTouchStart.bind(this);\r
      private _onTouchMove = this.onDocumentTouchMove.bind(this);\r
      private _onMouseEnter = this.onMouseEnter.bind(this);\r
      private _onMouseLeave = this.onMouseLeave.bind(this);\r
      private _onTouchEnd = this.onTouchEnd.bind(this);\r
      init(container: HTMLElement) {\r
        this.container = container;\r
        container.addEventListener('mousemove', this._onMouseMove);\r
        container.addEventListener('touchstart', this._onTouchStart, { passive: true });\r
        container.addEventListener('touchmove', this._onTouchMove, { passive: true });\r
        container.addEventListener('mouseenter', this._onMouseEnter);\r
        container.addEventListener('mouseleave', this._onMouseLeave);\r
        container.addEventListener('touchend', this._onTouchEnd);\r
      }\r
      dispose() {\r
        const c = this.container;\r
        if (!c) return;\r
        c.removeEventListener('mousemove', this._onMouseMove);\r
        c.removeEventListener('touchstart', this._onTouchStart);\r
        c.removeEventListener('touchmove', this._onTouchMove);\r
        c.removeEventListener('mouseenter', this._onMouseEnter);\r
        c.removeEventListener('mouseleave', this._onMouseLeave);\r
        c.removeEventListener('touchend', this._onTouchEnd);\r
      }\r
      setCoords(x: number, y: number) {\r
        if (!this.container) return;\r
        if (this.timer) window.clearTimeout(this.timer);\r
        const rect = this.container.getBoundingClientRect();\r
        const nx = (x - rect.left) / rect.width;\r
        const ny = (y - rect.top) / rect.height;\r
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));\r
        this.mouseMoved = true;\r
        this.timer = window.setTimeout(() => {\r
          this.mouseMoved = false;\r
        }, 100);\r
      }\r
      setNormalized(nx: number, ny: number) {\r
        this.coords.set(nx, ny);\r
        this.mouseMoved = true;\r
      }\r
      onDocumentMouseMove(event: MouseEvent) {\r
        if (this.onInteract) this.onInteract();\r
        if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {\r
          if (!this.container) return;\r
          const rect = this.container.getBoundingClientRect();\r
          const nx = (event.clientX - rect.left) / rect.width;\r
          const ny = (event.clientY - rect.top) / rect.height;\r
          this.takeoverFrom.copy(this.coords);\r
          this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));\r
          this.takeoverStartTime = performance.now();\r
          this.takeoverActive = true;\r
          this.hasUserControl = true;\r
          this.isAutoActive = false;\r
          return;\r
        }\r
        this.setCoords(event.clientX, event.clientY);\r
        this.hasUserControl = true;\r
      }\r
      onDocumentTouchStart(event: TouchEvent) {\r
        if (event.touches.length === 1) {\r
          const t = event.touches[0];\r
          if (this.onInteract) this.onInteract();\r
          this.setCoords(t.pageX, t.pageY);\r
          this.hasUserControl = true;\r
        }\r
      }\r
      onDocumentTouchMove(event: TouchEvent) {\r
        if (event.touches.length === 1) {\r
          const t = event.touches[0];\r
          if (this.onInteract) this.onInteract();\r
          this.setCoords(t.pageX, t.pageY);\r
        }\r
      }\r
      onTouchEnd() {\r
        this.isHoverInside = false;\r
      }\r
      onMouseEnter() {\r
        this.isHoverInside = true;\r
      }\r
      onMouseLeave() {\r
        this.isHoverInside = false;\r
      }\r
      update() {\r
        if (this.takeoverActive) {\r
          const t = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000);\r
          if (t >= 1) {\r
            this.takeoverActive = false;\r
            this.coords.copy(this.takeoverTo);\r
            this.coords_old.copy(this.coords);\r
            this.diff.set(0, 0);\r
          } else {\r
            const k = t * t * (3 - 2 * t);\r
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);\r
          }\r
        }\r
        this.diff.subVectors(this.coords, this.coords_old);\r
        this.coords_old.copy(this.coords);\r
        if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);\r
        if (this.isAutoActive && !this.takeoverActive) this.diff.multiplyScalar(this.autoIntensity);\r
      }\r
    }\r
    const Mouse = new MouseClass();\r
\r
    class AutoDriver {\r
      mouse: MouseClass;\r
      manager: WebGLManager;\r
      enabled: boolean;\r
      speed: number;\r
      resumeDelay: number;\r
      rampDurationMs: number;\r
      active = false;\r
      current = new THREE.Vector2(0, 0);\r
      target = new THREE.Vector2();\r
      lastTime = performance.now();\r
      activationTime = 0;\r
      margin = 0.2;\r
      private _tmpDir = new THREE.Vector2();\r
      constructor(\r
        mouse: MouseClass,\r
        manager: WebGLManager,\r
        opts: { enabled: boolean; speed: number; resumeDelay: number; rampDuration: number }\r
      ) {\r
        this.mouse = mouse;\r
        this.manager = manager;\r
        this.enabled = opts.enabled;\r
        this.speed = opts.speed;\r
        this.resumeDelay = opts.resumeDelay || 3000;\r
        this.rampDurationMs = (opts.rampDuration || 0) * 1000;\r
        this.pickNewTarget();\r
      }\r
      pickNewTarget() {\r
        const r = Math.random;\r
        this.target.set((r() * 2 - 1) * (1 - this.margin), (r() * 2 - 1) * (1 - this.margin));\r
      }\r
      forceStop() {\r
        this.active = false;\r
        this.mouse.isAutoActive = false;\r
      }\r
      update() {\r
        if (!this.enabled) return;\r
        const now = performance.now();\r
        const idle = now - this.manager.lastUserInteraction;\r
        if (idle < this.resumeDelay) {\r
          if (this.active) this.forceStop();\r
          return;\r
        }\r
        if (this.mouse.isHoverInside) {\r
          if (this.active) this.forceStop();\r
          return;\r
        }\r
        if (!this.active) {\r
          this.active = true;\r
          this.current.copy(this.mouse.coords);\r
          this.lastTime = now;\r
          this.activationTime = now;\r
        }\r
        if (!this.active) return;\r
        this.mouse.isAutoActive = true;\r
        let dtSec = (now - this.lastTime) / 1000;\r
        this.lastTime = now;\r
        if (dtSec > 0.2) dtSec = 0.016;\r
        const dir = this._tmpDir.subVectors(this.target, this.current);\r
        const dist = dir.length();\r
        if (dist < 0.01) {\r
          this.pickNewTarget();\r
          return;\r
        }\r
        dir.normalize();\r
        let ramp = 1;\r
        if (this.rampDurationMs > 0) {\r
          const t = Math.min(1, (now - this.activationTime) / this.rampDurationMs);\r
          ramp = t * t * (3 - 2 * t);\r
        }\r
        const step = this.speed * dtSec * ramp;\r
        const move = Math.min(step, dist);\r
        this.current.addScaledVector(dir, move);\r
        this.mouse.setNormalized(this.current.x, this.current.y);\r
      }\r
    }\r
\r
    const face_vert = \`\r
	attribute vec3 position;\r
	uniform vec2 px;\r
	uniform vec2 boundarySpace;\r
	varying vec2 uv;\r
	precision highp float;\r
	void main(){\r
	vec3 pos = position;\r
	vec2 scale = 1.0 - boundarySpace * 2.0;\r
	pos.xy = pos.xy * scale;\r
	uv = vec2(0.5)+(pos.xy)*0.5;\r
	gl_Position = vec4(pos, 1.0);\r
}\r
\`;\r
    const line_vert = \`\r
	attribute vec3 position;\r
	uniform vec2 px;\r
	precision highp float;\r
	varying vec2 uv;\r
	void main(){\r
	vec3 pos = position;\r
	uv = 0.5 + pos.xy * 0.5;\r
	vec2 n = sign(pos.xy);\r
	pos.xy = abs(pos.xy) - px * 1.0;\r
	pos.xy *= n;\r
	gl_Position = vec4(pos, 1.0);\r
}\r
\`;\r
    const mouse_vert = \`\r
		precision highp float;\r
		attribute vec3 position;\r
		attribute vec2 uv;\r
		uniform vec2 center;\r
		uniform vec2 scale;\r
		uniform vec2 px;\r
		varying vec2 vUv;\r
		void main(){\r
		vec2 pos = position.xy * scale * 2.0 * px + center;\r
		vUv = uv;\r
		gl_Position = vec4(pos, 0.0, 1.0);\r
}\r
\`;\r
    const advection_frag = \`\r
		precision highp float;\r
		uniform sampler2D velocity;\r
		uniform float dt;\r
		uniform bool isBFECC;\r
		uniform vec2 fboSize;\r
		uniform vec2 px;\r
		varying vec2 uv;\r
		void main(){\r
		vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;\r
		if(isBFECC == false){\r
				vec2 vel = texture2D(velocity, uv).xy;\r
				vec2 uv2 = uv - vel * dt * ratio;\r
				vec2 newVel = texture2D(velocity, uv2).xy;\r
				gl_FragColor = vec4(newVel, 0.0, 0.0);\r
		} else {\r
				vec2 spot_new = uv;\r
				vec2 vel_old = texture2D(velocity, uv).xy;\r
				vec2 spot_old = spot_new - vel_old * dt * ratio;\r
				vec2 vel_new1 = texture2D(velocity, spot_old).xy;\r
				vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;\r
				vec2 error = spot_new2 - spot_new;\r
				vec2 spot_new3 = spot_new - error / 2.0;\r
				vec2 vel_2 = texture2D(velocity, spot_new3).xy;\r
				vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;\r
				vec2 newVel2 = texture2D(velocity, spot_old2).xy; \r
				gl_FragColor = vec4(newVel2, 0.0, 0.0);\r
		}\r
}\r
\`;\r
    const color_frag = \`\r
		precision highp float;\r
		uniform sampler2D velocity;\r
		uniform sampler2D palette;\r
		uniform vec4 bgColor;\r
		varying vec2 uv;\r
		void main(){\r
		vec2 vel = texture2D(velocity, uv).xy;\r
		float lenv = clamp(length(vel), 0.0, 1.0);\r
		vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;\r
		vec3 outRGB = mix(bgColor.rgb, c, lenv);\r
		float outA = mix(bgColor.a, 1.0, lenv);\r
		gl_FragColor = vec4(outRGB, outA);\r
}\r
\`;\r
    const divergence_frag = \`\r
		precision highp float;\r
		uniform sampler2D velocity;\r
		uniform float dt;\r
		uniform vec2 px;\r
		varying vec2 uv;\r
		void main(){\r
		float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;\r
		float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;\r
		float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;\r
		float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;\r
		float divergence = (x1 - x0 + y1 - y0) / 2.0;\r
		gl_FragColor = vec4(divergence / dt);\r
}\r
\`;\r
    const externalForce_frag = \`\r
		precision highp float;\r
		uniform vec2 force;\r
		uniform vec2 center;\r
		uniform vec2 scale;\r
		uniform vec2 px;\r
		varying vec2 vUv;\r
		void main(){\r
		vec2 circle = (vUv - 0.5) * 2.0;\r
		float d = 1.0 - min(length(circle), 1.0);\r
		d *= d;\r
		gl_FragColor = vec4(force * d, 0.0, 1.0);\r
}\r
\`;\r
    const poisson_frag = \`\r
		precision highp float;\r
		uniform sampler2D pressure;\r
		uniform sampler2D divergence;\r
		uniform vec2 px;\r
		varying vec2 uv;\r
		void main(){\r
		float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;\r
		float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;\r
		float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;\r
		float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;\r
		float div = texture2D(divergence, uv).r;\r
		float newP = (p0 + p1 + p2 + p3) / 4.0 - div;\r
		gl_FragColor = vec4(newP);\r
}\r
\`;\r
    const pressure_frag = \`\r
		precision highp float;\r
		uniform sampler2D pressure;\r
		uniform sampler2D velocity;\r
		uniform vec2 px;\r
		uniform float dt;\r
		varying vec2 uv;\r
		void main(){\r
		float step = 1.0;\r
		float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;\r
		float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;\r
		float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;\r
		float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;\r
		vec2 v = texture2D(velocity, uv).xy;\r
		vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;\r
		v = v - gradP * dt;\r
		gl_FragColor = vec4(v, 0.0, 1.0);\r
}\r
\`;\r
    const viscous_frag = \`\r
		precision highp float;\r
		uniform sampler2D velocity;\r
		uniform sampler2D velocity_new;\r
		uniform float v;\r
		uniform vec2 px;\r
		uniform float dt;\r
		varying vec2 uv;\r
		void main(){\r
		vec2 old = texture2D(velocity, uv).xy;\r
		vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;\r
		vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;\r
		vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;\r
		vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;\r
		vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);\r
		newv /= 4.0 * (1.0 + v * dt);\r
		gl_FragColor = vec4(newv, 0.0, 0.0);\r
}\r
\`;\r
\r
    type Uniforms = Record<string, { value: any }>;\r
\r
    class ShaderPass {\r
      props: any;\r
      uniforms?: Uniforms;\r
      scene: THREE.Scene | null = null;\r
      camera: THREE.Camera | null = null;\r
      material: THREE.RawShaderMaterial | null = null;\r
      geometry: THREE.BufferGeometry | null = null;\r
      plane: THREE.Mesh | null = null;\r
      constructor(props: any) {\r
        this.props = props || {};\r
        this.uniforms = this.props.material?.uniforms;\r
      }\r
      init(..._args: any[]) {\r
        this.scene = new THREE.Scene();\r
        this.camera = new THREE.Camera();\r
        if (this.uniforms) {\r
          this.material = new THREE.RawShaderMaterial(this.props.material);\r
          this.geometry = new THREE.PlaneGeometry(2, 2);\r
          this.plane = new THREE.Mesh(this.geometry, this.material);\r
          this.scene.add(this.plane);\r
        }\r
      }\r
      update(..._args: any[]) {\r
        if (!Common.renderer || !this.scene || !this.camera) return;\r
        Common.renderer.setRenderTarget(this.props.output || null);\r
        Common.renderer.render(this.scene, this.camera);\r
        Common.renderer.setRenderTarget(null);\r
      }\r
    }\r
\r
    class Advection extends ShaderPass {\r
      line!: THREE.LineSegments;\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: advection_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.cellScale },\r
              px: { value: simProps.cellScale },\r
              fboSize: { value: simProps.fboSize },\r
              velocity: { value: simProps.src.texture },\r
              dt: { value: simProps.dt },\r
              isBFECC: { value: true }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.uniforms = this.props.material.uniforms;\r
        this.init();\r
      }\r
      init() {\r
        super.init();\r
        this.createBoundary();\r
      }\r
      createBoundary() {\r
        const boundaryG = new THREE.BufferGeometry();\r
        const vertices_boundary = new Float32Array([\r
          -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 0\r
        ]);\r
        boundaryG.setAttribute('position', new THREE.BufferAttribute(vertices_boundary, 3));\r
        const boundaryM = new THREE.RawShaderMaterial({\r
          vertexShader: line_vert,\r
          fragmentShader: advection_frag,\r
          uniforms: this.uniforms!\r
        });\r
        this.line = new THREE.LineSegments(boundaryG, boundaryM);\r
        this.scene!.add(this.line);\r
      }\r
      update(...args: any[]) {\r
        const { dt, isBounce, BFECC } = (args[0] || {}) as { dt?: number; isBounce?: boolean; BFECC?: boolean };\r
        if (!this.uniforms) return;\r
        if (typeof dt === 'number') this.uniforms.dt.value = dt;\r
        if (typeof isBounce === 'boolean') this.line.visible = isBounce;\r
        if (typeof BFECC === 'boolean') this.uniforms.isBFECC.value = BFECC;\r
        super.update();\r
      }\r
    }\r
\r
    class ExternalForce extends ShaderPass {\r
      mouse!: THREE.Mesh;\r
      constructor(simProps: any) {\r
        super({ output: simProps.dst });\r
        this.init(simProps);\r
      }\r
      init(simProps: any) {\r
        super.init();\r
        const mouseG = new THREE.PlaneGeometry(1, 1);\r
        const mouseM = new THREE.RawShaderMaterial({\r
          vertexShader: mouse_vert,\r
          fragmentShader: externalForce_frag,\r
          blending: THREE.AdditiveBlending,\r
          depthWrite: false,\r
          uniforms: {\r
            px: { value: simProps.cellScale },\r
            force: { value: new THREE.Vector2(0, 0) },\r
            center: { value: new THREE.Vector2(0, 0) },\r
            scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) }\r
          }\r
        });\r
        this.mouse = new THREE.Mesh(mouseG, mouseM);\r
        this.scene!.add(this.mouse);\r
      }\r
      update(...args: any[]) {\r
        const props = args[0] || {};\r
        const forceX = (Mouse.diff.x / 2) * (props.mouse_force || 0);\r
        const forceY = (Mouse.diff.y / 2) * (props.mouse_force || 0);\r
        const cellScale = props.cellScale || { x: 1, y: 1 };\r
        const cursorSize = props.cursor_size || 0;\r
        const cursorSizeX = cursorSize * cellScale.x;\r
        const cursorSizeY = cursorSize * cellScale.y;\r
        const centerX = Math.min(\r
          Math.max(Mouse.coords.x, -1 + cursorSizeX + cellScale.x * 2),\r
          1 - cursorSizeX - cellScale.x * 2\r
        );\r
        const centerY = Math.min(\r
          Math.max(Mouse.coords.y, -1 + cursorSizeY + cellScale.y * 2),\r
          1 - cursorSizeY - cellScale.y * 2\r
        );\r
        const uniforms = (this.mouse.material as THREE.RawShaderMaterial).uniforms;\r
        uniforms.force.value.set(forceX, forceY);\r
        uniforms.center.value.set(centerX, centerY);\r
        uniforms.scale.value.set(cursorSize, cursorSize);\r
        super.update();\r
      }\r
    }\r
\r
    class Viscous extends ShaderPass {\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: viscous_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              velocity: { value: simProps.src.texture },\r
              velocity_new: { value: simProps.dst_.texture },\r
              v: { value: simProps.viscous },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst,\r
          output0: simProps.dst_,\r
          output1: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update(...args: any[]) {\r
        const { viscous, iterations, dt } = (args[0] || {}) as { viscous?: number; iterations?: number; dt?: number };\r
        if (!this.uniforms) return;\r
        let fbo_in: any, fbo_out: any;\r
        if (typeof viscous === 'number') this.uniforms.v.value = viscous;\r
        const iter = iterations ?? 0;\r
        for (let i = 0; i < iter; i++) {\r
          if (i % 2 === 0) {\r
            fbo_in = this.props.output0;\r
            fbo_out = this.props.output1;\r
          } else {\r
            fbo_in = this.props.output1;\r
            fbo_out = this.props.output0;\r
          }\r
          this.uniforms.velocity_new.value = fbo_in.texture;\r
          this.props.output = fbo_out;\r
          if (typeof dt === 'number') this.uniforms.dt.value = dt;\r
          super.update();\r
        }\r
        return fbo_out;\r
      }\r
    }\r
\r
    class Divergence extends ShaderPass {\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: divergence_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              velocity: { value: simProps.src.texture },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update(...args: any[]) {\r
        const { vel } = (args[0] || {}) as { vel?: any };\r
        if (this.uniforms && vel) {\r
          this.uniforms.velocity.value = vel.texture;\r
        }\r
        super.update();\r
      }\r
    }\r
\r
    class Poisson extends ShaderPass {\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: poisson_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              pressure: { value: simProps.dst_.texture },\r
              divergence: { value: simProps.src.texture },\r
              px: { value: simProps.cellScale }\r
            }\r
          },\r
          output: simProps.dst,\r
          output0: simProps.dst_,\r
          output1: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update(...args: any[]) {\r
        const { iterations } = (args[0] || {}) as { iterations?: number };\r
        let p_in: any, p_out: any;\r
        const iter = iterations ?? 0;\r
        for (let i = 0; i < iter; i++) {\r
          if (i % 2 === 0) {\r
            p_in = this.props.output0;\r
            p_out = this.props.output1;\r
          } else {\r
            p_in = this.props.output1;\r
            p_out = this.props.output0;\r
          }\r
          if (this.uniforms) this.uniforms.pressure.value = p_in.texture;\r
          this.props.output = p_out;\r
          super.update();\r
        }\r
        return p_out;\r
      }\r
    }\r
\r
    class Pressure extends ShaderPass {\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: pressure_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              pressure: { value: simProps.src_p.texture },\r
              velocity: { value: simProps.src_v.texture },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update(...args: any[]) {\r
        const { vel, pressure } = (args[0] || {}) as { vel?: any; pressure?: any };\r
        if (this.uniforms && vel && pressure) {\r
          this.uniforms.velocity.value = vel.texture;\r
          this.uniforms.pressure.value = pressure.texture;\r
        }\r
        super.update();\r
      }\r
    }\r
\r
    class Simulation {\r
      options: SimOptions;\r
      fbos: Record<string, THREE.WebGLRenderTarget | null> = {\r
        vel_0: null,\r
        vel_1: null,\r
        vel_viscous0: null,\r
        vel_viscous1: null,\r
        div: null,\r
        pressure_0: null,\r
        pressure_1: null\r
      };\r
      fboSize = new THREE.Vector2();\r
      cellScale = new THREE.Vector2();\r
      boundarySpace = new THREE.Vector2();\r
      advection!: Advection;\r
      externalForce!: ExternalForce;\r
      viscous!: Viscous;\r
      divergence!: Divergence;\r
      poisson!: Poisson;\r
      pressure!: Pressure;\r
      constructor(options?: Partial<SimOptions>) {\r
        this.options = {\r
          iterations_poisson: 32,\r
          iterations_viscous: 32,\r
          mouse_force: 20,\r
          resolution: 0.5,\r
          cursor_size: 100,\r
          viscous: 30,\r
          isBounce: false,\r
          dt: 0.014,\r
          isViscous: false,\r
          BFECC: true,\r
          ...options\r
        };\r
        this.init();\r
      }\r
      init() {\r
        this.calcSize();\r
        this.createAllFBO();\r
        this.createShaderPass();\r
      }\r
      getFloatType() {\r
        const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);\r
        return isIOS ? THREE.HalfFloatType : THREE.FloatType;\r
      }\r
      createAllFBO() {\r
        const type = this.getFloatType();\r
        const opts = {\r
          type,\r
          depthBuffer: false,\r
          stencilBuffer: false,\r
          minFilter: THREE.LinearFilter,\r
          magFilter: THREE.LinearFilter,\r
          wrapS: THREE.ClampToEdgeWrapping,\r
          wrapT: THREE.ClampToEdgeWrapping\r
        } as const;\r
        for (const key in this.fbos) {\r
          this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts);\r
        }\r
      }\r
      createShaderPass() {\r
        this.advection = new Advection({\r
          cellScale: this.cellScale,\r
          fboSize: this.fboSize,\r
          dt: this.options.dt,\r
          src: this.fbos.vel_0,\r
          dst: this.fbos.vel_1\r
        });\r
        this.externalForce = new ExternalForce({\r
          cellScale: this.cellScale,\r
          cursor_size: this.options.cursor_size,\r
          dst: this.fbos.vel_1\r
        });\r
        this.viscous = new Viscous({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          viscous: this.options.viscous,\r
          src: this.fbos.vel_1,\r
          dst: this.fbos.vel_viscous1,\r
          dst_: this.fbos.vel_viscous0,\r
          dt: this.options.dt\r
        });\r
        this.divergence = new Divergence({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src: this.fbos.vel_viscous0,\r
          dst: this.fbos.div,\r
          dt: this.options.dt\r
        });\r
        this.poisson = new Poisson({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src: this.fbos.div,\r
          dst: this.fbos.pressure_1,\r
          dst_: this.fbos.pressure_0\r
        });\r
        this.pressure = new Pressure({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src_p: this.fbos.pressure_0,\r
          src_v: this.fbos.vel_viscous0,\r
          dst: this.fbos.vel_0,\r
          dt: this.options.dt\r
        });\r
      }\r
      calcSize() {\r
        const width = Math.max(1, Math.round(this.options.resolution * Common.width));\r
        const height = Math.max(1, Math.round(this.options.resolution * Common.height));\r
        this.cellScale.set(1 / width, 1 / height);\r
        this.fboSize.set(width, height);\r
      }\r
      resize() {\r
        this.calcSize();\r
        for (const key in this.fbos) {\r
          this.fbos[key]!.setSize(this.fboSize.x, this.fboSize.y);\r
        }\r
      }\r
      update() {\r
        if (this.options.isBounce) this.boundarySpace.set(0, 0);\r
        else this.boundarySpace.copy(this.cellScale);\r
        this.advection.update({ dt: this.options.dt, isBounce: this.options.isBounce, BFECC: this.options.BFECC });\r
        this.externalForce.update({\r
          cursor_size: this.options.cursor_size,\r
          mouse_force: this.options.mouse_force,\r
          cellScale: this.cellScale\r
        });\r
        let vel: any = this.fbos.vel_1;\r
        if (this.options.isViscous) {\r
          vel = this.viscous.update({\r
            viscous: this.options.viscous,\r
            iterations: this.options.iterations_viscous,\r
            dt: this.options.dt\r
          });\r
        }\r
        this.divergence.update({ vel });\r
        const pressure = this.poisson.update({ iterations: this.options.iterations_poisson });\r
        this.pressure.update({ vel, pressure });\r
      }\r
    }\r
\r
    class Output {\r
      simulation: Simulation;\r
      scene: THREE.Scene;\r
      camera: THREE.Camera;\r
      output: THREE.Mesh;\r
      constructor() {\r
        this.simulation = new Simulation();\r
        this.scene = new THREE.Scene();\r
        this.camera = new THREE.Camera();\r
        this.output = new THREE.Mesh(\r
          new THREE.PlaneGeometry(2, 2),\r
          new THREE.RawShaderMaterial({\r
            vertexShader: face_vert,\r
            fragmentShader: color_frag,\r
            transparent: true,\r
            depthWrite: false,\r
            uniforms: {\r
              velocity: { value: this.simulation.fbos.vel_0!.texture },\r
              boundarySpace: { value: new THREE.Vector2() },\r
              palette: { value: paletteTex },\r
              bgColor: { value: bgVec4 }\r
            }\r
          })\r
        );\r
        this.scene.add(this.output);\r
      }\r
      resize() {\r
        this.simulation.resize();\r
      }\r
      render() {\r
        if (!Common.renderer) return;\r
        Common.renderer.setRenderTarget(null);\r
        Common.renderer.render(this.scene, this.camera);\r
      }\r
      update() {\r
        this.simulation.update();\r
        this.render();\r
      }\r
    }\r
\r
    class WebGLManager implements LiquidEtherWebGL {\r
      props: any;\r
      output!: Output;\r
      autoDriver?: AutoDriver;\r
      lastUserInteraction = performance.now();\r
      running = false;\r
      private _loop = this.loop.bind(this);\r
      private _resize = this.resize.bind(this);\r
      private _onVisibility?: () => void;\r
      constructor(props: any) {\r
        this.props = props;\r
        Common.init(props.$wrapper);\r
        Mouse.init(props.$wrapper);\r
        Mouse.autoIntensity = props.autoIntensity;\r
        Mouse.takeoverDuration = props.takeoverDuration;\r
        Mouse.onInteract = () => {\r
          this.lastUserInteraction = performance.now();\r
          if (this.autoDriver) this.autoDriver.forceStop();\r
        };\r
        this.autoDriver = new AutoDriver(Mouse, this as any, {\r
          enabled: props.autoDemo,\r
          speed: props.autoSpeed,\r
          resumeDelay: props.autoResumeDelay,\r
          rampDuration: props.autoRampDuration\r
        });\r
        this.init();\r
        window.addEventListener('resize', this._resize);\r
        this._onVisibility = () => {\r
          const hidden = document.hidden;\r
          if (hidden) {\r
            this.pause();\r
          } else if (isVisibleRef.current) {\r
            this.start();\r
          }\r
        };\r
        document.addEventListener('visibilitychange', this._onVisibility);\r
      }\r
      init() {\r
        if (!Common.renderer) return;\r
        this.props.$wrapper.prepend(Common.renderer.domElement);\r
        this.output = new Output();\r
      }\r
      resize() {\r
        Common.resize();\r
        this.output.resize();\r
      }\r
      render() {\r
        if (this.autoDriver) this.autoDriver.update();\r
        Mouse.update();\r
        Common.update();\r
        this.output.update();\r
      }\r
      loop() {\r
        if (!this.running) return;\r
        this.render();\r
        rafRef.current = requestAnimationFrame(this._loop);\r
      }\r
      start() {\r
        if (this.running) return;\r
        this.running = true;\r
        this._loop();\r
      }\r
      pause() {\r
        this.running = false;\r
        if (rafRef.current) {\r
          cancelAnimationFrame(rafRef.current);\r
          rafRef.current = null;\r
        }\r
      }\r
      dispose() {\r
        try {\r
          window.removeEventListener('resize', this._resize);\r
          if (this._onVisibility) document.removeEventListener('visibilitychange', this._onVisibility);\r
          Mouse.dispose();\r
          if (Common.renderer) {\r
            const canvas = Common.renderer.domElement;\r
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);\r
            Common.renderer.dispose();\r
          }\r
        } catch {\r
          /* noop */\r
        }\r
      }\r
    }\r
\r
    const container = mountRef.current;\r
    container.style.position = container.style.position || 'relative';\r
    container.style.overflow = container.style.overflow || 'hidden';\r
\r
    const webgl = new WebGLManager({\r
      $wrapper: container,\r
      autoDemo,\r
      autoSpeed,\r
      autoIntensity,\r
      takeoverDuration,\r
      autoResumeDelay,\r
      autoRampDuration\r
    });\r
    webglRef.current = webgl;\r
\r
    const applyOptionsFromProps = () => {\r
      if (!webglRef.current) return;\r
      const sim = webglRef.current.output?.simulation;\r
      if (!sim) return;\r
      const prevRes = sim.options.resolution;\r
      Object.assign(sim.options, {\r
        mouse_force: mouseForce,\r
        cursor_size: cursorSize,\r
        isViscous,\r
        viscous,\r
        iterations_viscous: iterationsViscous,\r
        iterations_poisson: iterationsPoisson,\r
        dt,\r
        BFECC,\r
        resolution,\r
        isBounce\r
      });\r
      if (resolution !== prevRes) sim.resize();\r
    };\r
    applyOptionsFromProps();\r
    webgl.start();\r
\r
    const io = new IntersectionObserver(\r
      entries => {\r
        const entry = entries[0];\r
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;\r
        isVisibleRef.current = isVisible;\r
        if (!webglRef.current) return;\r
        if (isVisible && !document.hidden) {\r
          webglRef.current.start();\r
        } else {\r
          webglRef.current.pause();\r
        }\r
      },\r
      { threshold: [0, 0.01, 0.1] }\r
    );\r
    io.observe(container);\r
    intersectionObserverRef.current = io;\r
\r
    const ro = new ResizeObserver(() => {\r
      if (!webglRef.current) return;\r
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);\r
      resizeRafRef.current = requestAnimationFrame(() => {\r
        if (!webglRef.current) return;\r
        webglRef.current.resize();\r
      });\r
    });\r
    ro.observe(container);\r
    resizeObserverRef.current = ro;\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      if (resizeObserverRef.current) {\r
        try {\r
          resizeObserverRef.current.disconnect();\r
        } catch {\r
          /* noop */\r
        }\r
      }\r
      if (intersectionObserverRef.current) {\r
        try {\r
          intersectionObserverRef.current.disconnect();\r
        } catch {\r
          /* noop */\r
        }\r
      }\r
      if (webglRef.current) {\r
        webglRef.current.dispose();\r
      }\r
      webglRef.current = null;\r
    };\r
  }, [\r
    BFECC,\r
    cursorSize,\r
    dt,\r
    isBounce,\r
    isViscous,\r
    iterationsPoisson,\r
    iterationsViscous,\r
    mouseForce,\r
    resolution,\r
    viscous,\r
    colors,\r
    autoDemo,\r
    autoSpeed,\r
    autoIntensity,\r
    takeoverDuration,\r
    autoResumeDelay,\r
    autoRampDuration\r
  ]);\r
\r
  useEffect(() => {\r
    const webgl = webglRef.current;\r
    if (!webgl) return;\r
    const sim = webgl.output?.simulation;\r
    if (!sim) return;\r
    const prevRes = sim.options.resolution;\r
    Object.assign(sim.options, {\r
      mouse_force: mouseForce,\r
      cursor_size: cursorSize,\r
      isViscous,\r
      viscous,\r
      iterations_viscous: iterationsViscous,\r
      iterations_poisson: iterationsPoisson,\r
      dt,\r
      BFECC,\r
      resolution,\r
      isBounce\r
    });\r
    if (webgl.autoDriver) {\r
      webgl.autoDriver.enabled = autoDemo;\r
      webgl.autoDriver.speed = autoSpeed;\r
      webgl.autoDriver.resumeDelay = autoResumeDelay;\r
      webgl.autoDriver.rampDurationMs = autoRampDuration * 1000;\r
      if (webgl.autoDriver.mouse) {\r
        webgl.autoDriver.mouse.autoIntensity = autoIntensity;\r
        webgl.autoDriver.mouse.takeoverDuration = takeoverDuration;\r
      }\r
    }\r
    if (resolution !== prevRes) sim.resize();\r
  }, [\r
    mouseForce,\r
    cursorSize,\r
    isViscous,\r
    viscous,\r
    iterationsViscous,\r
    iterationsPoisson,\r
    dt,\r
    BFECC,\r
    resolution,\r
    isBounce,\r
    autoDemo,\r
    autoSpeed,\r
    autoIntensity,\r
    takeoverDuration,\r
    autoResumeDelay,\r
    autoRampDuration\r
  ]);\r
\r
  return <div ref={mountRef} className={\`liquid-ether-container \${className || ''}\`} style={style} />;\r
}\r
`,Q=`import React, { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
\r
export interface LiquidEtherProps {\r
  mouseForce?: number;\r
  cursorSize?: number;\r
  isViscous?: boolean;\r
  viscous?: number;\r
  iterationsViscous?: number;\r
  iterationsPoisson?: number;\r
  dt?: number;\r
  BFECC?: boolean;\r
  resolution?: number;\r
  isBounce?: boolean;\r
  colors?: string[];\r
  style?: React.CSSProperties;\r
  className?: string;\r
  autoDemo?: boolean;\r
  autoSpeed?: number;\r
  autoIntensity?: number;\r
  takeoverDuration?: number;\r
  autoResumeDelay?: number;\r
  autoRampDuration?: number;\r
}\r
\r
interface SimOptions {\r
  iterations_poisson: number;\r
  iterations_viscous: number;\r
  mouse_force: number;\r
  resolution: number;\r
  cursor_size: number;\r
  viscous: number;\r
  isBounce: boolean;\r
  dt: number;\r
  isViscous: boolean;\r
  BFECC: boolean;\r
}\r
\r
interface LiquidEtherWebGL {\r
  output?: { simulation?: { options: SimOptions; resize: () => void } };\r
  autoDriver?: {\r
    enabled: boolean;\r
    speed: number;\r
    resumeDelay: number;\r
    rampDurationMs: number;\r
    mouse?: { autoIntensity: number; takeoverDuration: number };\r
    forceStop: () => void;\r
  };\r
  resize: () => void;\r
  start: () => void;\r
  pause: () => void;\r
  dispose: () => void;\r
}\r
\r
const defaultColors = ['#5227FF', '#FF9FFC', '#B19EEF'];\r
\r
export default function LiquidEther({\r
  mouseForce = 20,\r
  cursorSize = 100,\r
  isViscous = false,\r
  viscous = 30,\r
  iterationsViscous = 32,\r
  iterationsPoisson = 32,\r
  dt = 0.014,\r
  BFECC = true,\r
  resolution = 0.5,\r
  isBounce = false,\r
  colors = defaultColors,\r
  style = {},\r
  className = '',\r
  autoDemo = true,\r
  autoSpeed = 0.5,\r
  autoIntensity = 2.2,\r
  takeoverDuration = 0.25,\r
  autoResumeDelay = 1000,\r
  autoRampDuration = 0.6\r
}: LiquidEtherProps): React.ReactElement {\r
  const mountRef = useRef<HTMLDivElement | null>(null);\r
  const webglRef = useRef<LiquidEtherWebGL | null>(null);\r
  const resizeObserverRef = useRef<ResizeObserver | null>(null);\r
  const rafRef = useRef<number | null>(null);\r
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);\r
  const isVisibleRef = useRef<boolean>(true);\r
  const resizeRafRef = useRef<number | null>(null);\r
\r
  useEffect(() => {\r
    if (!mountRef.current) return;\r
\r
    function makePaletteTexture(stops: string[]): THREE.DataTexture {\r
      let arr: string[];\r
      if (Array.isArray(stops) && stops.length > 0) {\r
        arr = stops.length === 1 ? [stops[0], stops[0]] : stops;\r
      } else {\r
        arr = ['#ffffff', '#ffffff'];\r
      }\r
      const w = arr.length;\r
      const data = new Uint8Array(w * 4);\r
      for (let i = 0; i < w; i++) {\r
        const c = new THREE.Color(arr[i]);\r
        data[i * 4 + 0] = Math.round(c.r * 255);\r
        data[i * 4 + 1] = Math.round(c.g * 255);\r
        data[i * 4 + 2] = Math.round(c.b * 255);\r
        data[i * 4 + 3] = 255;\r
      }\r
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);\r
      tex.magFilter = THREE.LinearFilter;\r
      tex.minFilter = THREE.LinearFilter;\r
      tex.wrapS = THREE.ClampToEdgeWrapping;\r
      tex.wrapT = THREE.ClampToEdgeWrapping;\r
      tex.generateMipmaps = false;\r
      tex.needsUpdate = true;\r
      return tex;\r
    }\r
\r
    const paletteTex = makePaletteTexture(colors);\r
    // Hard-code transparent background vector (alpha 0)\r
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);\r
\r
    class CommonClass {\r
      width = 0;\r
      height = 0;\r
      aspect = 1;\r
      pixelRatio = 1;\r
      isMobile = false;\r
      breakpoint = 768;\r
      fboWidth: number | null = null;\r
      fboHeight: number | null = null;\r
      time = 0;\r
      delta = 0;\r
      container: HTMLElement | null = null;\r
      renderer: THREE.WebGLRenderer | null = null;\r
      clock: THREE.Clock | null = null;\r
      init(container: HTMLElement) {\r
        this.container = container;\r
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);\r
        this.resize();\r
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });\r
        // Always transparent\r
        this.renderer.autoClear = false;\r
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);\r
        this.renderer.setPixelRatio(this.pixelRatio);\r
        this.renderer.setSize(this.width, this.height);\r
        const el = this.renderer.domElement;\r
        el.style.width = '100%';\r
        el.style.height = '100%';\r
        el.style.display = 'block';\r
        this.clock = new THREE.Clock();\r
        this.clock.start();\r
      }\r
      resize() {\r
        if (!this.container) return;\r
        const rect = this.container.getBoundingClientRect();\r
        this.width = Math.max(1, Math.floor(rect.width));\r
        this.height = Math.max(1, Math.floor(rect.height));\r
        this.aspect = this.width / this.height;\r
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);\r
      }\r
      update() {\r
        if (!this.clock) return;\r
        this.delta = this.clock.getDelta();\r
        this.time += this.delta;\r
      }\r
    }\r
    const Common = new CommonClass();\r
\r
    class MouseClass {\r
      mouseMoved = false;\r
      coords = new THREE.Vector2();\r
      coords_old = new THREE.Vector2();\r
      diff = new THREE.Vector2();\r
      timer: number | null = null;\r
      container: HTMLElement | null = null;\r
      isHoverInside = false;\r
      hasUserControl = false;\r
      isAutoActive = false;\r
      autoIntensity = 2.0;\r
      takeoverActive = false;\r
      takeoverStartTime = 0;\r
      takeoverDuration = 0.25;\r
      takeoverFrom = new THREE.Vector2();\r
      takeoverTo = new THREE.Vector2();\r
      onInteract: (() => void) | null = null;\r
      private _onMouseMove = this.onDocumentMouseMove.bind(this);\r
      private _onTouchStart = this.onDocumentTouchStart.bind(this);\r
      private _onTouchMove = this.onDocumentTouchMove.bind(this);\r
      private _onMouseEnter = this.onMouseEnter.bind(this);\r
      private _onMouseLeave = this.onMouseLeave.bind(this);\r
      private _onTouchEnd = this.onTouchEnd.bind(this);\r
      init(container: HTMLElement) {\r
        this.container = container;\r
        container.addEventListener('mousemove', this._onMouseMove);\r
        container.addEventListener('touchstart', this._onTouchStart, { passive: true });\r
        container.addEventListener('touchmove', this._onTouchMove, { passive: true });\r
        container.addEventListener('mouseenter', this._onMouseEnter);\r
        container.addEventListener('mouseleave', this._onMouseLeave);\r
        container.addEventListener('touchend', this._onTouchEnd);\r
      }\r
      dispose() {\r
        const c = this.container;\r
        if (!c) return;\r
        c.removeEventListener('mousemove', this._onMouseMove);\r
        c.removeEventListener('touchstart', this._onTouchStart);\r
        c.removeEventListener('touchmove', this._onTouchMove);\r
        c.removeEventListener('mouseenter', this._onMouseEnter);\r
        c.removeEventListener('mouseleave', this._onMouseLeave);\r
        c.removeEventListener('touchend', this._onTouchEnd);\r
      }\r
      setCoords(x: number, y: number) {\r
        if (!this.container) return;\r
        if (this.timer) window.clearTimeout(this.timer);\r
        const rect = this.container.getBoundingClientRect();\r
        const nx = (x - rect.left) / rect.width;\r
        const ny = (y - rect.top) / rect.height;\r
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));\r
        this.mouseMoved = true;\r
        this.timer = window.setTimeout(() => {\r
          this.mouseMoved = false;\r
        }, 100);\r
      }\r
      setNormalized(nx: number, ny: number) {\r
        this.coords.set(nx, ny);\r
        this.mouseMoved = true;\r
      }\r
      onDocumentMouseMove(event: MouseEvent) {\r
        if (this.onInteract) this.onInteract();\r
        if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {\r
          if (!this.container) return;\r
          const rect = this.container.getBoundingClientRect();\r
          const nx = (event.clientX - rect.left) / rect.width;\r
          const ny = (event.clientY - rect.top) / rect.height;\r
          this.takeoverFrom.copy(this.coords);\r
          this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));\r
          this.takeoverStartTime = performance.now();\r
          this.takeoverActive = true;\r
          this.hasUserControl = true;\r
          this.isAutoActive = false;\r
          return;\r
        }\r
        this.setCoords(event.clientX, event.clientY);\r
        this.hasUserControl = true;\r
      }\r
      onDocumentTouchStart(event: TouchEvent) {\r
        if (event.touches.length === 1) {\r
          const t = event.touches[0];\r
          if (this.onInteract) this.onInteract();\r
          this.setCoords(t.pageX, t.pageY);\r
          this.hasUserControl = true;\r
        }\r
      }\r
      onDocumentTouchMove(event: TouchEvent) {\r
        if (event.touches.length === 1) {\r
          const t = event.touches[0];\r
          if (this.onInteract) this.onInteract();\r
          this.setCoords(t.pageX, t.pageY);\r
        }\r
      }\r
      onTouchEnd() {\r
        this.isHoverInside = false;\r
      }\r
      onMouseEnter() {\r
        this.isHoverInside = true;\r
      }\r
      onMouseLeave() {\r
        this.isHoverInside = false;\r
      }\r
      update() {\r
        if (this.takeoverActive) {\r
          const t = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000);\r
          if (t >= 1) {\r
            this.takeoverActive = false;\r
            this.coords.copy(this.takeoverTo);\r
            this.coords_old.copy(this.coords);\r
            this.diff.set(0, 0);\r
          } else {\r
            const k = t * t * (3 - 2 * t);\r
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);\r
          }\r
        }\r
        this.diff.subVectors(this.coords, this.coords_old);\r
        this.coords_old.copy(this.coords);\r
        if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);\r
        if (this.isAutoActive && !this.takeoverActive) this.diff.multiplyScalar(this.autoIntensity);\r
      }\r
    }\r
    const Mouse = new MouseClass();\r
\r
    class AutoDriver {\r
      mouse: MouseClass;\r
      manager: WebGLManager;\r
      enabled: boolean;\r
      speed: number;\r
      resumeDelay: number;\r
      rampDurationMs: number;\r
      active = false;\r
      current = new THREE.Vector2(0, 0);\r
      target = new THREE.Vector2();\r
      lastTime = performance.now();\r
      activationTime = 0;\r
      margin = 0.2;\r
      private _tmpDir = new THREE.Vector2();\r
      constructor(\r
        mouse: MouseClass,\r
        manager: WebGLManager,\r
        opts: { enabled: boolean; speed: number; resumeDelay: number; rampDuration: number }\r
      ) {\r
        this.mouse = mouse;\r
        this.manager = manager;\r
        this.enabled = opts.enabled;\r
        this.speed = opts.speed;\r
        this.resumeDelay = opts.resumeDelay || 3000;\r
        this.rampDurationMs = (opts.rampDuration || 0) * 1000;\r
        this.pickNewTarget();\r
      }\r
      pickNewTarget() {\r
        const r = Math.random;\r
        this.target.set((r() * 2 - 1) * (1 - this.margin), (r() * 2 - 1) * (1 - this.margin));\r
      }\r
      forceStop() {\r
        this.active = false;\r
        this.mouse.isAutoActive = false;\r
      }\r
      update() {\r
        if (!this.enabled) return;\r
        const now = performance.now();\r
        const idle = now - this.manager.lastUserInteraction;\r
        if (idle < this.resumeDelay) {\r
          if (this.active) this.forceStop();\r
          return;\r
        }\r
        if (this.mouse.isHoverInside) {\r
          if (this.active) this.forceStop();\r
          return;\r
        }\r
        if (!this.active) {\r
          this.active = true;\r
          this.current.copy(this.mouse.coords);\r
          this.lastTime = now;\r
          this.activationTime = now;\r
        }\r
        if (!this.active) return;\r
        this.mouse.isAutoActive = true;\r
        let dtSec = (now - this.lastTime) / 1000;\r
        this.lastTime = now;\r
        if (dtSec > 0.2) dtSec = 0.016;\r
        const dir = this._tmpDir.subVectors(this.target, this.current);\r
        const dist = dir.length();\r
        if (dist < 0.01) {\r
          this.pickNewTarget();\r
          return;\r
        }\r
        dir.normalize();\r
        let ramp = 1;\r
        if (this.rampDurationMs > 0) {\r
          const t = Math.min(1, (now - this.activationTime) / this.rampDurationMs);\r
          ramp = t * t * (3 - 2 * t);\r
        }\r
        const step = this.speed * dtSec * ramp;\r
        const move = Math.min(step, dist);\r
        this.current.addScaledVector(dir, move);\r
        this.mouse.setNormalized(this.current.x, this.current.y);\r
      }\r
    }\r
\r
    const face_vert = \`\r
  attribute vec3 position;\r
  uniform vec2 px;\r
  uniform vec2 boundarySpace;\r
  varying vec2 uv;\r
  precision highp float;\r
  void main(){\r
  vec3 pos = position;\r
  vec2 scale = 1.0 - boundarySpace * 2.0;\r
  pos.xy = pos.xy * scale;\r
  uv = vec2(0.5)+(pos.xy)*0.5;\r
  gl_Position = vec4(pos, 1.0);\r
}\r
\`;\r
    const line_vert = \`\r
  attribute vec3 position;\r
  uniform vec2 px;\r
  precision highp float;\r
  varying vec2 uv;\r
  void main(){\r
  vec3 pos = position;\r
  uv = 0.5 + pos.xy * 0.5;\r
  vec2 n = sign(pos.xy);\r
  pos.xy = abs(pos.xy) - px * 1.0;\r
  pos.xy *= n;\r
  gl_Position = vec4(pos, 1.0);\r
}\r
\`;\r
    const mouse_vert = \`\r
    precision highp float;\r
    attribute vec3 position;\r
    attribute vec2 uv;\r
    uniform vec2 center;\r
    uniform vec2 scale;\r
    uniform vec2 px;\r
    varying vec2 vUv;\r
    void main(){\r
    vec2 pos = position.xy * scale * 2.0 * px + center;\r
    vUv = uv;\r
    gl_Position = vec4(pos, 0.0, 1.0);\r
}\r
\`;\r
    const advection_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform float dt;\r
    uniform bool isBFECC;\r
    uniform vec2 fboSize;\r
    uniform vec2 px;\r
    varying vec2 uv;\r
    void main(){\r
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;\r
    if(isBFECC == false){\r
        vec2 vel = texture2D(velocity, uv).xy;\r
        vec2 uv2 = uv - vel * dt * ratio;\r
        vec2 newVel = texture2D(velocity, uv2).xy;\r
        gl_FragColor = vec4(newVel, 0.0, 0.0);\r
    } else {\r
        vec2 spot_new = uv;\r
        vec2 vel_old = texture2D(velocity, uv).xy;\r
        vec2 spot_old = spot_new - vel_old * dt * ratio;\r
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;\r
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;\r
        vec2 error = spot_new2 - spot_new;\r
        vec2 spot_new3 = spot_new - error / 2.0;\r
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;\r
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;\r
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; \r
        gl_FragColor = vec4(newVel2, 0.0, 0.0);\r
    }\r
}\r
\`;\r
    const color_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform sampler2D palette;\r
    uniform vec4 bgColor;\r
    varying vec2 uv;\r
    void main(){\r
    vec2 vel = texture2D(velocity, uv).xy;\r
    float lenv = clamp(length(vel), 0.0, 1.0);\r
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;\r
    vec3 outRGB = mix(bgColor.rgb, c, lenv);\r
    float outA = mix(bgColor.a, 1.0, lenv);\r
    gl_FragColor = vec4(outRGB, outA);\r
}\r
\`;\r
    const divergence_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform float dt;\r
    uniform vec2 px;\r
    varying vec2 uv;\r
    void main(){\r
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;\r
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;\r
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;\r
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;\r
    float divergence = (x1 - x0 + y1 - y0) / 2.0;\r
    gl_FragColor = vec4(divergence / dt);\r
}\r
\`;\r
    const externalForce_frag = \`\r
    precision highp float;\r
    uniform vec2 force;\r
    uniform vec2 center;\r
    uniform vec2 scale;\r
    uniform vec2 px;\r
    varying vec2 vUv;\r
    void main(){\r
    vec2 circle = (vUv - 0.5) * 2.0;\r
    float d = 1.0 - min(length(circle), 1.0);\r
    d *= d;\r
    gl_FragColor = vec4(force * d, 0.0, 1.0);\r
}\r
\`;\r
    const poisson_frag = \`\r
    precision highp float;\r
    uniform sampler2D pressure;\r
    uniform sampler2D divergence;\r
    uniform vec2 px;\r
    varying vec2 uv;\r
    void main(){\r
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;\r
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;\r
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;\r
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;\r
    float div = texture2D(divergence, uv).r;\r
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;\r
    gl_FragColor = vec4(newP);\r
}\r
\`;\r
    const pressure_frag = \`\r
    precision highp float;\r
    uniform sampler2D pressure;\r
    uniform sampler2D velocity;\r
    uniform vec2 px;\r
    uniform float dt;\r
    varying vec2 uv;\r
    void main(){\r
    float step = 1.0;\r
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;\r
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;\r
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;\r
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;\r
    vec2 v = texture2D(velocity, uv).xy;\r
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;\r
    v = v - gradP * dt;\r
    gl_FragColor = vec4(v, 0.0, 1.0);\r
}\r
\`;\r
    const viscous_frag = \`\r
    precision highp float;\r
    uniform sampler2D velocity;\r
    uniform sampler2D velocity_new;\r
    uniform float v;\r
    uniform vec2 px;\r
    uniform float dt;\r
    varying vec2 uv;\r
    void main(){\r
    vec2 old = texture2D(velocity, uv).xy;\r
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;\r
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;\r
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;\r
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;\r
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);\r
    newv /= 4.0 * (1.0 + v * dt);\r
    gl_FragColor = vec4(newv, 0.0, 0.0);\r
}\r
\`;\r
\r
    type Uniforms = Record<string, { value: any }>;\r
\r
    class ShaderPass {\r
      props: any;\r
      uniforms?: Uniforms;\r
      scene: THREE.Scene | null = null;\r
      camera: THREE.Camera | null = null;\r
      material: THREE.RawShaderMaterial | null = null;\r
      geometry: THREE.BufferGeometry | null = null;\r
      plane: THREE.Mesh | null = null;\r
      constructor(props: any) {\r
        this.props = props || {};\r
        this.uniforms = this.props.material?.uniforms;\r
      }\r
      init(..._args: any[]) {\r
        this.scene = new THREE.Scene();\r
        this.camera = new THREE.Camera();\r
        if (this.uniforms) {\r
          this.material = new THREE.RawShaderMaterial(this.props.material);\r
          this.geometry = new THREE.PlaneGeometry(2, 2);\r
          this.plane = new THREE.Mesh(this.geometry, this.material);\r
          this.scene.add(this.plane);\r
        }\r
      }\r
      update(..._args: any[]) {\r
        if (!Common.renderer || !this.scene || !this.camera) return;\r
        Common.renderer.setRenderTarget(this.props.output || null);\r
        Common.renderer.render(this.scene, this.camera);\r
        Common.renderer.setRenderTarget(null);\r
      }\r
    }\r
\r
    class Advection extends ShaderPass {\r
      line!: THREE.LineSegments;\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: advection_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.cellScale },\r
              px: { value: simProps.cellScale },\r
              fboSize: { value: simProps.fboSize },\r
              velocity: { value: simProps.src.texture },\r
              dt: { value: simProps.dt },\r
              isBFECC: { value: true }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.uniforms = this.props.material.uniforms;\r
        this.init();\r
      }\r
      init() {\r
        super.init();\r
        this.createBoundary();\r
      }\r
      createBoundary() {\r
        const boundaryG = new THREE.BufferGeometry();\r
        const vertices_boundary = new Float32Array([\r
          -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 0\r
        ]);\r
        boundaryG.setAttribute('position', new THREE.BufferAttribute(vertices_boundary, 3));\r
        const boundaryM = new THREE.RawShaderMaterial({\r
          vertexShader: line_vert,\r
          fragmentShader: advection_frag,\r
          uniforms: this.uniforms!\r
        });\r
        this.line = new THREE.LineSegments(boundaryG, boundaryM);\r
        this.scene!.add(this.line);\r
      }\r
      update(...args: any[]) {\r
        const { dt, isBounce, BFECC } = (args[0] || {}) as { dt?: number; isBounce?: boolean; BFECC?: boolean };\r
        if (!this.uniforms) return;\r
        if (typeof dt === 'number') this.uniforms.dt.value = dt;\r
        if (typeof isBounce === 'boolean') this.line.visible = isBounce;\r
        if (typeof BFECC === 'boolean') this.uniforms.isBFECC.value = BFECC;\r
        super.update();\r
      }\r
    }\r
\r
    class ExternalForce extends ShaderPass {\r
      mouse!: THREE.Mesh;\r
      constructor(simProps: any) {\r
        super({ output: simProps.dst });\r
        this.init(simProps);\r
      }\r
      init(simProps: any) {\r
        super.init();\r
        const mouseG = new THREE.PlaneGeometry(1, 1);\r
        const mouseM = new THREE.RawShaderMaterial({\r
          vertexShader: mouse_vert,\r
          fragmentShader: externalForce_frag,\r
          blending: THREE.AdditiveBlending,\r
          depthWrite: false,\r
          uniforms: {\r
            px: { value: simProps.cellScale },\r
            force: { value: new THREE.Vector2(0, 0) },\r
            center: { value: new THREE.Vector2(0, 0) },\r
            scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) }\r
          }\r
        });\r
        this.mouse = new THREE.Mesh(mouseG, mouseM);\r
        this.scene!.add(this.mouse);\r
      }\r
      update(...args: any[]) {\r
        const props = args[0] || {};\r
        const forceX = (Mouse.diff.x / 2) * (props.mouse_force || 0);\r
        const forceY = (Mouse.diff.y / 2) * (props.mouse_force || 0);\r
        const cellScale = props.cellScale || { x: 1, y: 1 };\r
        const cursorSize = props.cursor_size || 0;\r
        const cursorSizeX = cursorSize * cellScale.x;\r
        const cursorSizeY = cursorSize * cellScale.y;\r
        const centerX = Math.min(\r
          Math.max(Mouse.coords.x, -1 + cursorSizeX + cellScale.x * 2),\r
          1 - cursorSizeX - cellScale.x * 2\r
        );\r
        const centerY = Math.min(\r
          Math.max(Mouse.coords.y, -1 + cursorSizeY + cellScale.y * 2),\r
          1 - cursorSizeY - cellScale.y * 2\r
        );\r
        const uniforms = (this.mouse.material as THREE.RawShaderMaterial).uniforms;\r
        uniforms.force.value.set(forceX, forceY);\r
        uniforms.center.value.set(centerX, centerY);\r
        uniforms.scale.value.set(cursorSize, cursorSize);\r
        super.update();\r
      }\r
    }\r
\r
    class Viscous extends ShaderPass {\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: viscous_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              velocity: { value: simProps.src.texture },\r
              velocity_new: { value: simProps.dst_.texture },\r
              v: { value: simProps.viscous },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst,\r
          output0: simProps.dst_,\r
          output1: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update(...args: any[]) {\r
        const { viscous, iterations, dt } = (args[0] || {}) as { viscous?: number; iterations?: number; dt?: number };\r
        if (!this.uniforms) return;\r
        let fbo_in: any, fbo_out: any;\r
        if (typeof viscous === 'number') this.uniforms.v.value = viscous;\r
        const iter = iterations ?? 0;\r
        for (let i = 0; i < iter; i++) {\r
          if (i % 2 === 0) {\r
            fbo_in = this.props.output0;\r
            fbo_out = this.props.output1;\r
          } else {\r
            fbo_in = this.props.output1;\r
            fbo_out = this.props.output0;\r
          }\r
          this.uniforms.velocity_new.value = fbo_in.texture;\r
          this.props.output = fbo_out;\r
          if (typeof dt === 'number') this.uniforms.dt.value = dt;\r
          super.update();\r
        }\r
        return fbo_out;\r
      }\r
    }\r
\r
    class Divergence extends ShaderPass {\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: divergence_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              velocity: { value: simProps.src.texture },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update(...args: any[]) {\r
        const { vel } = (args[0] || {}) as { vel?: any };\r
        if (this.uniforms && vel) {\r
          this.uniforms.velocity.value = vel.texture;\r
        }\r
        super.update();\r
      }\r
    }\r
\r
    class Poisson extends ShaderPass {\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: poisson_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              pressure: { value: simProps.dst_.texture },\r
              divergence: { value: simProps.src.texture },\r
              px: { value: simProps.cellScale }\r
            }\r
          },\r
          output: simProps.dst,\r
          output0: simProps.dst_,\r
          output1: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update(...args: any[]) {\r
        const { iterations } = (args[0] || {}) as { iterations?: number };\r
        let p_in: any, p_out: any;\r
        const iter = iterations ?? 0;\r
        for (let i = 0; i < iter; i++) {\r
          if (i % 2 === 0) {\r
            p_in = this.props.output0;\r
            p_out = this.props.output1;\r
          } else {\r
            p_in = this.props.output1;\r
            p_out = this.props.output0;\r
          }\r
          if (this.uniforms) this.uniforms.pressure.value = p_in.texture;\r
          this.props.output = p_out;\r
          super.update();\r
        }\r
        return p_out;\r
      }\r
    }\r
\r
    class Pressure extends ShaderPass {\r
      constructor(simProps: any) {\r
        super({\r
          material: {\r
            vertexShader: face_vert,\r
            fragmentShader: pressure_frag,\r
            uniforms: {\r
              boundarySpace: { value: simProps.boundarySpace },\r
              pressure: { value: simProps.src_p.texture },\r
              velocity: { value: simProps.src_v.texture },\r
              px: { value: simProps.cellScale },\r
              dt: { value: simProps.dt }\r
            }\r
          },\r
          output: simProps.dst\r
        });\r
        this.init();\r
      }\r
      update(...args: any[]) {\r
        const { vel, pressure } = (args[0] || {}) as { vel?: any; pressure?: any };\r
        if (this.uniforms && vel && pressure) {\r
          this.uniforms.velocity.value = vel.texture;\r
          this.uniforms.pressure.value = pressure.texture;\r
        }\r
        super.update();\r
      }\r
    }\r
\r
    class Simulation {\r
      options: SimOptions;\r
      fbos: Record<string, THREE.WebGLRenderTarget | null> = {\r
        vel_0: null,\r
        vel_1: null,\r
        vel_viscous0: null,\r
        vel_viscous1: null,\r
        div: null,\r
        pressure_0: null,\r
        pressure_1: null\r
      };\r
      fboSize = new THREE.Vector2();\r
      cellScale = new THREE.Vector2();\r
      boundarySpace = new THREE.Vector2();\r
      advection!: Advection;\r
      externalForce!: ExternalForce;\r
      viscous!: Viscous;\r
      divergence!: Divergence;\r
      poisson!: Poisson;\r
      pressure!: Pressure;\r
      constructor(options?: Partial<SimOptions>) {\r
        this.options = {\r
          iterations_poisson: 32,\r
          iterations_viscous: 32,\r
          mouse_force: 20,\r
          resolution: 0.5,\r
          cursor_size: 100,\r
          viscous: 30,\r
          isBounce: false,\r
          dt: 0.014,\r
          isViscous: false,\r
          BFECC: true,\r
          ...options\r
        };\r
        this.init();\r
      }\r
      init() {\r
        this.calcSize();\r
        this.createAllFBO();\r
        this.createShaderPass();\r
      }\r
      getFloatType() {\r
        const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);\r
        return isIOS ? THREE.HalfFloatType : THREE.FloatType;\r
      }\r
      createAllFBO() {\r
        const type = this.getFloatType();\r
        const opts = {\r
          type,\r
          depthBuffer: false,\r
          stencilBuffer: false,\r
          minFilter: THREE.LinearFilter,\r
          magFilter: THREE.LinearFilter,\r
          wrapS: THREE.ClampToEdgeWrapping,\r
          wrapT: THREE.ClampToEdgeWrapping\r
        } as const;\r
        for (const key in this.fbos) {\r
          this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts);\r
        }\r
      }\r
      createShaderPass() {\r
        this.advection = new Advection({\r
          cellScale: this.cellScale,\r
          fboSize: this.fboSize,\r
          dt: this.options.dt,\r
          src: this.fbos.vel_0,\r
          dst: this.fbos.vel_1\r
        });\r
        this.externalForce = new ExternalForce({\r
          cellScale: this.cellScale,\r
          cursor_size: this.options.cursor_size,\r
          dst: this.fbos.vel_1\r
        });\r
        this.viscous = new Viscous({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          viscous: this.options.viscous,\r
          src: this.fbos.vel_1,\r
          dst: this.fbos.vel_viscous1,\r
          dst_: this.fbos.vel_viscous0,\r
          dt: this.options.dt\r
        });\r
        this.divergence = new Divergence({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src: this.fbos.vel_viscous0,\r
          dst: this.fbos.div,\r
          dt: this.options.dt\r
        });\r
        this.poisson = new Poisson({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src: this.fbos.div,\r
          dst: this.fbos.pressure_1,\r
          dst_: this.fbos.pressure_0\r
        });\r
        this.pressure = new Pressure({\r
          cellScale: this.cellScale,\r
          boundarySpace: this.boundarySpace,\r
          src_p: this.fbos.pressure_0,\r
          src_v: this.fbos.vel_viscous0,\r
          dst: this.fbos.vel_0,\r
          dt: this.options.dt\r
        });\r
      }\r
      calcSize() {\r
        const width = Math.max(1, Math.round(this.options.resolution * Common.width));\r
        const height = Math.max(1, Math.round(this.options.resolution * Common.height));\r
        this.cellScale.set(1 / width, 1 / height);\r
        this.fboSize.set(width, height);\r
      }\r
      resize() {\r
        this.calcSize();\r
        for (const key in this.fbos) {\r
          this.fbos[key]!.setSize(this.fboSize.x, this.fboSize.y);\r
        }\r
      }\r
      update() {\r
        if (this.options.isBounce) this.boundarySpace.set(0, 0);\r
        else this.boundarySpace.copy(this.cellScale);\r
        this.advection.update({ dt: this.options.dt, isBounce: this.options.isBounce, BFECC: this.options.BFECC });\r
        this.externalForce.update({\r
          cursor_size: this.options.cursor_size,\r
          mouse_force: this.options.mouse_force,\r
          cellScale: this.cellScale\r
        });\r
        let vel: any = this.fbos.vel_1;\r
        if (this.options.isViscous) {\r
          vel = this.viscous.update({\r
            viscous: this.options.viscous,\r
            iterations: this.options.iterations_viscous,\r
            dt: this.options.dt\r
          });\r
        }\r
        this.divergence.update({ vel });\r
        const pressure = this.poisson.update({ iterations: this.options.iterations_poisson });\r
        this.pressure.update({ vel, pressure });\r
      }\r
    }\r
\r
    class Output {\r
      simulation: Simulation;\r
      scene: THREE.Scene;\r
      camera: THREE.Camera;\r
      output: THREE.Mesh;\r
      constructor() {\r
        this.simulation = new Simulation();\r
        this.scene = new THREE.Scene();\r
        this.camera = new THREE.Camera();\r
        this.output = new THREE.Mesh(\r
          new THREE.PlaneGeometry(2, 2),\r
          new THREE.RawShaderMaterial({\r
            vertexShader: face_vert,\r
            fragmentShader: color_frag,\r
            transparent: true,\r
            depthWrite: false,\r
            uniforms: {\r
              velocity: { value: this.simulation.fbos.vel_0!.texture },\r
              boundarySpace: { value: new THREE.Vector2() },\r
              palette: { value: paletteTex },\r
              bgColor: { value: bgVec4 }\r
            }\r
          })\r
        );\r
        this.scene.add(this.output);\r
      }\r
      resize() {\r
        this.simulation.resize();\r
      }\r
      render() {\r
        if (!Common.renderer) return;\r
        Common.renderer.setRenderTarget(null);\r
        Common.renderer.render(this.scene, this.camera);\r
      }\r
      update() {\r
        this.simulation.update();\r
        this.render();\r
      }\r
    }\r
\r
    class WebGLManager implements LiquidEtherWebGL {\r
      props: any;\r
      output!: Output;\r
      autoDriver?: AutoDriver;\r
      lastUserInteraction = performance.now();\r
      running = false;\r
      private _loop = this.loop.bind(this);\r
      private _resize = this.resize.bind(this);\r
      private _onVisibility?: () => void;\r
      constructor(props: any) {\r
        this.props = props;\r
        Common.init(props.$wrapper);\r
        Mouse.init(props.$wrapper);\r
        Mouse.autoIntensity = props.autoIntensity;\r
        Mouse.takeoverDuration = props.takeoverDuration;\r
        Mouse.onInteract = () => {\r
          this.lastUserInteraction = performance.now();\r
          if (this.autoDriver) this.autoDriver.forceStop();\r
        };\r
        this.autoDriver = new AutoDriver(Mouse, this as any, {\r
          enabled: props.autoDemo,\r
          speed: props.autoSpeed,\r
          resumeDelay: props.autoResumeDelay,\r
          rampDuration: props.autoRampDuration\r
        });\r
        this.init();\r
        window.addEventListener('resize', this._resize);\r
        this._onVisibility = () => {\r
          const hidden = document.hidden;\r
          if (hidden) {\r
            this.pause();\r
          } else if (isVisibleRef.current) {\r
            this.start();\r
          }\r
        };\r
        document.addEventListener('visibilitychange', this._onVisibility);\r
      }\r
      init() {\r
        if (!Common.renderer) return;\r
        this.props.$wrapper.prepend(Common.renderer.domElement);\r
        this.output = new Output();\r
      }\r
      resize() {\r
        Common.resize();\r
        this.output.resize();\r
      }\r
      render() {\r
        if (this.autoDriver) this.autoDriver.update();\r
        Mouse.update();\r
        Common.update();\r
        this.output.update();\r
      }\r
      loop() {\r
        if (!this.running) return;\r
        this.render();\r
        rafRef.current = requestAnimationFrame(this._loop);\r
      }\r
      start() {\r
        if (this.running) return;\r
        this.running = true;\r
        this._loop();\r
      }\r
      pause() {\r
        this.running = false;\r
        if (rafRef.current) {\r
          cancelAnimationFrame(rafRef.current);\r
          rafRef.current = null;\r
        }\r
      }\r
      dispose() {\r
        try {\r
          window.removeEventListener('resize', this._resize);\r
          if (this._onVisibility) document.removeEventListener('visibilitychange', this._onVisibility);\r
          Mouse.dispose();\r
          if (Common.renderer) {\r
            const canvas = Common.renderer.domElement;\r
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);\r
            Common.renderer.dispose();\r
          }\r
        } catch {\r
          /* noop */\r
        }\r
      }\r
    }\r
\r
    const container = mountRef.current;\r
    container.style.position = container.style.position || 'relative';\r
    container.style.overflow = container.style.overflow || 'hidden';\r
\r
    const webgl = new WebGLManager({\r
      $wrapper: container,\r
      autoDemo,\r
      autoSpeed,\r
      autoIntensity,\r
      takeoverDuration,\r
      autoResumeDelay,\r
      autoRampDuration\r
    });\r
    webglRef.current = webgl;\r
\r
    const applyOptionsFromProps = () => {\r
      if (!webglRef.current) return;\r
      const sim = webglRef.current.output?.simulation;\r
      if (!sim) return;\r
      const prevRes = sim.options.resolution;\r
      Object.assign(sim.options, {\r
        mouse_force: mouseForce,\r
        cursor_size: cursorSize,\r
        isViscous,\r
        viscous,\r
        iterations_viscous: iterationsViscous,\r
        iterations_poisson: iterationsPoisson,\r
        dt,\r
        BFECC,\r
        resolution,\r
        isBounce\r
      });\r
      if (resolution !== prevRes) sim.resize();\r
    };\r
    applyOptionsFromProps();\r
    webgl.start();\r
\r
    const io = new IntersectionObserver(\r
      entries => {\r
        const entry = entries[0];\r
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;\r
        isVisibleRef.current = isVisible;\r
        if (!webglRef.current) return;\r
        if (isVisible && !document.hidden) {\r
          webglRef.current.start();\r
        } else {\r
          webglRef.current.pause();\r
        }\r
      },\r
      { threshold: [0, 0.01, 0.1] }\r
    );\r
    io.observe(container);\r
    intersectionObserverRef.current = io;\r
\r
    const ro = new ResizeObserver(() => {\r
      if (!webglRef.current) return;\r
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);\r
      resizeRafRef.current = requestAnimationFrame(() => {\r
        if (!webglRef.current) return;\r
        webglRef.current.resize();\r
      });\r
    });\r
    ro.observe(container);\r
    resizeObserverRef.current = ro;\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      if (resizeObserverRef.current) {\r
        try {\r
          resizeObserverRef.current.disconnect();\r
        } catch {\r
          /* noop */\r
        }\r
      }\r
      if (intersectionObserverRef.current) {\r
        try {\r
          intersectionObserverRef.current.disconnect();\r
        } catch {\r
          /* noop */\r
        }\r
      }\r
      if (webglRef.current) {\r
        webglRef.current.dispose();\r
      }\r
      webglRef.current = null;\r
    };\r
  }, [\r
    BFECC,\r
    cursorSize,\r
    dt,\r
    isBounce,\r
    isViscous,\r
    iterationsPoisson,\r
    iterationsViscous,\r
    mouseForce,\r
    resolution,\r
    viscous,\r
    colors,\r
    autoDemo,\r
    autoSpeed,\r
    autoIntensity,\r
    takeoverDuration,\r
    autoResumeDelay,\r
    autoRampDuration\r
  ]);\r
\r
  useEffect(() => {\r
    const webgl = webglRef.current;\r
    if (!webgl) return;\r
    const sim = webgl.output?.simulation;\r
    if (!sim) return;\r
    const prevRes = sim.options.resolution;\r
    Object.assign(sim.options, {\r
      mouse_force: mouseForce,\r
      cursor_size: cursorSize,\r
      isViscous,\r
      viscous,\r
      iterations_viscous: iterationsViscous,\r
      iterations_poisson: iterationsPoisson,\r
      dt,\r
      BFECC,\r
      resolution,\r
      isBounce\r
    });\r
    if (webgl.autoDriver) {\r
      webgl.autoDriver.enabled = autoDemo;\r
      webgl.autoDriver.speed = autoSpeed;\r
      webgl.autoDriver.resumeDelay = autoResumeDelay;\r
      webgl.autoDriver.rampDurationMs = autoRampDuration * 1000;\r
      if (webgl.autoDriver.mouse) {\r
        webgl.autoDriver.mouse.autoIntensity = autoIntensity;\r
        webgl.autoDriver.mouse.takeoverDuration = takeoverDuration;\r
      }\r
    }\r
    if (resolution !== prevRes) sim.resize();\r
  }, [\r
    mouseForce,\r
    cursorSize,\r
    isViscous,\r
    viscous,\r
    iterationsViscous,\r
    iterationsPoisson,\r
    dt,\r
    BFECC,\r
    resolution,\r
    isBounce,\r
    autoDemo,\r
    autoSpeed,\r
    autoIntensity,\r
    takeoverDuration,\r
    autoResumeDelay,\r
    autoRampDuration\r
  ]);\r
\r
  return (\r
    <div\r
      ref={mountRef}\r
      className={\`w-full h-full relative overflow-hidden pointer-events-none touch-none \${className || ''}\`}\r
      style={style}\r
    />\r
  );\r
}\r
`,Z={dependencies:"three",usage:`import LiquidEther from './LiquidEther';

<div style={{ width: '100%', height: 600, position: 'relative' }}>
  <LiquidEther
    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
  />
</div>`,code:q,css:$,tailwind:J,tsCode:K,tsTailwind:Q},lr=()=>{const[a,x]=e.useState("#5227FF"),[u,E]=e.useState("#FF9FFC"),[c,w]=e.useState("#B19EEF"),_=[a,u,c].filter(Boolean),[l,S]=e.useState(20),[p,R]=e.useState(100),[h,T]=e.useState(.5),[s,D]=e.useState(!0),[v,C]=e.useState(30),[d,M]=e.useState(32),[m,P]=e.useState(32),[f,z]=e.useState(!1),[y,F]=e.useState(!0),[g,H]=e.useState(.5),[b,V]=e.useState(2.2),B=[{name:"colors",type:"string[]",default:'["#5227FF", "#FF9FFC", "#B19EEF"]',description:"Array of hex color stops used to build the velocity-to-color palette."},{name:"mouseForce",type:"number",default:"20",description:"Strength multiplier applied to mouse / touch movement when injecting velocity."},{name:"cursorSize",type:"number",default:"100",description:"Radius (in pixels at base resolution) of the force brush."},{name:"resolution",type:"number",default:"0.5",description:"Simulation texture scale relative to canvas size (lower = better performance, more blur)."},{name:"dt",type:"number",default:"0.014",description:"Fixed simulation timestep used inside the advection / diffusion passes."},{name:"BFECC",type:"boolean",default:"true",description:"Enable BFECC advection (error-compensated) for crisper flow; disable for slight performance gain."},{name:"isViscous",type:"boolean",default:"false",description:"Toggle iterative viscosity solve (smoother, thicker motion when enabled)."},{name:"viscous",type:"number",default:"30",description:"Viscosity coefficient used when isViscous is true."},{name:"iterationsViscous",type:"number",default:"32",description:"Number of Gauss-Seidel iterations for viscosity (higher = smoother, slower)."},{name:"iterationsPoisson",type:"number",default:"32",description:"Number of pressure Poisson iterations to enforce incompressibility."},{name:"isBounce",type:"boolean",default:"false",description:"If true, shows bounce boundaries (velocity clamped at edges)."},{name:"autoDemo",type:"boolean",default:"true",description:"Enable idle auto-driving of the pointer when no user interaction."},{name:"autoSpeed",type:"number",default:"0.5",description:"Speed (normalized units/sec) for auto pointer motion."},{name:"autoIntensity",type:"number",default:"2.2",description:"Multiplier applied to velocity delta while in auto mode."},{name:"takeoverDuration",type:"number",default:"0.25",description:"Seconds to interpolate from auto pointer to real cursor when user moves mouse."},{name:"autoResumeDelay",type:"number",default:"1000",description:"Milliseconds of inactivity before auto mode resumes."},{name:"autoRampDuration",type:"number",default:"0.6",description:"Seconds to ramp auto movement speed from 0 to full after activation."},{name:"className",type:"string",default:"''",description:"Optional class for the root container."},{name:"style",type:"React.CSSProperties",default:"{}",description:"Inline styles applied to the root container."}];return r.jsxs(I,{children:[r.jsxs(O,{children:[r.jsxs(k,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[r.jsx(Y,{colors:_,mouseForce:l,cursorSize:p,resolution:h,isViscous:s,viscous:v,iterationsViscous:d,iterationsPoisson:m,isBounce:f,autoDemo:y,autoSpeed:g,autoIntensity:b,autoResumeDelay:500}),r.jsx(j,{pillText:"New Background",headline:"The web, made fluid at your fingertips."})]}),r.jsxs(N,{className:"preview-options",children:[r.jsxs(A,{alignItems:"center",gap:4,mb:2,wrap:"wrap",children:[r.jsx(L,{fontSize:"sm",mt:2,mb:1,children:"Colors"}),r.jsx(o,{type:"color",value:a,onChange:t=>x(t.target.value),width:"50px",p:0}),r.jsx(o,{type:"color",value:u,onChange:t=>E(t.target.value),width:"50px",p:0}),r.jsx(o,{type:"color",value:c,onChange:t=>w(t.target.value),width:"50px",p:0})]}),r.jsx(n,{title:"Mouse Force",min:0,max:60,step:1,value:l,onChange:S}),r.jsx(n,{title:"Cursor Size",min:10,max:300,step:5,value:p,onChange:R}),r.jsx(n,{title:"Resolution",min:.2,max:.5,step:.05,value:h,onChange:T}),r.jsx(n,{title:"Auto Speed",min:0,max:1,step:.05,value:g,onChange:H}),r.jsx(n,{title:"Auto Intensity",min:0,max:4,step:.1,value:b,onChange:V}),r.jsx(n,{title:"Pressure",min:1,max:64,step:1,value:m,onChange:P}),r.jsx(i,{title:"Bounce Edges",isChecked:f,onChange:z}),r.jsx(i,{title:"Auto Animate",isChecked:y,onChange:F}),r.jsx(i,{title:"Viscous",isChecked:s,onChange:D}),s&&r.jsxs(r.Fragment,{children:[r.jsx(n,{title:"Viscous Coef",min:1,max:100,step:1,value:v,onChange:C}),r.jsx(n,{title:"Viscous Iterations",min:1,max:64,step:1,value:d,onChange:M})]})]}),r.jsx(G,{data:B}),r.jsx(X,{dependencyList:["three"]})]}),r.jsx(U,{children:r.jsx(W,{codeObject:Z})})]})};export{lr as default};
