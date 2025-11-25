import{r as m,j as l,R as T,C as M,f as S,P as g,M as v,B as R}from"./index-wsKSLPNH.js";import{T as E,P as C,a as z,C as O,b as L}from"./PropTable-C4uPWs8h.js";import{D as P}from"./Dependencies-BHoMfJUj.js";import{C as D}from"./Customize-1m_ZNqR9.js";import{P as p}from"./PreviewSlider-m1G_aiYP.js";import{u as B}from"./useForceRerender-BCFU-k0M.js";import{P as f}from"./Plane-T6LxgJGA.js";import{T as w}from"./Texture-BkQWYNP2.js";import"./index-Bpz4cGEA.js";const I=`.circular-gallery {\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  cursor: grab;\r
}\r
\r
.circular-gallery:active {\r
  cursor: grabbing;\r
}\r
`,U=`import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
import './CircularGallery.css';\r
\r
function debounce(func, wait) {\r
  let timeout;\r
  return function (...args) {\r
    clearTimeout(timeout);\r
    timeout = setTimeout(() => func.apply(this, args), wait);\r
  };\r
}\r
\r
function lerp(p1, p2, t) {\r
  return p1 + (p2 - p1) * t;\r
}\r
\r
function autoBind(instance) {\r
  const proto = Object.getPrototypeOf(instance);\r
  Object.getOwnPropertyNames(proto).forEach(key => {\r
    if (key !== 'constructor' && typeof instance[key] === 'function') {\r
      instance[key] = instance[key].bind(instance);\r
    }\r
  });\r
}\r
\r
function createTextTexture(gl, text, font = 'bold 30px monospace', color = 'black') {\r
  const canvas = document.createElement('canvas');\r
  const context = canvas.getContext('2d');\r
  context.font = font;\r
  const metrics = context.measureText(text);\r
  const textWidth = Math.ceil(metrics.width);\r
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);\r
  canvas.width = textWidth + 20;\r
  canvas.height = textHeight + 20;\r
  context.font = font;\r
  context.fillStyle = color;\r
  context.textBaseline = 'middle';\r
  context.textAlign = 'center';\r
  context.clearRect(0, 0, canvas.width, canvas.height);\r
  context.fillText(text, canvas.width / 2, canvas.height / 2);\r
  const texture = new Texture(gl, { generateMipmaps: false });\r
  texture.image = canvas;\r
  return { texture, width: canvas.width, height: canvas.height };\r
}\r
\r
class Title {\r
  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }) {\r
    autoBind(this);\r
    this.gl = gl;\r
    this.plane = plane;\r
    this.renderer = renderer;\r
    this.text = text;\r
    this.textColor = textColor;\r
    this.font = font;\r
    this.createMesh();\r
  }\r
  createMesh() {\r
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);\r
    const geometry = new Plane(this.gl);\r
    const program = new Program(this.gl, {\r
      vertex: \`\r
        attribute vec3 position;\r
        attribute vec2 uv;\r
        uniform mat4 modelViewMatrix;\r
        uniform mat4 projectionMatrix;\r
        varying vec2 vUv;\r
        void main() {\r
          vUv = uv;\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
        }\r
      \`,\r
      fragment: \`\r
        precision highp float;\r
        uniform sampler2D tMap;\r
        varying vec2 vUv;\r
        void main() {\r
          vec4 color = texture2D(tMap, vUv);\r
          if (color.a < 0.1) discard;\r
          gl_FragColor = color;\r
        }\r
      \`,\r
      uniforms: { tMap: { value: texture } },\r
      transparent: true\r
    });\r
    this.mesh = new Mesh(this.gl, { geometry, program });\r
    const aspect = width / height;\r
    const textHeight = this.plane.scale.y * 0.15;\r
    const textWidth = textHeight * aspect;\r
    this.mesh.scale.set(textWidth, textHeight, 1);\r
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;\r
    this.mesh.setParent(this.plane);\r
  }\r
}\r
\r
class Media {\r
  constructor({\r
    geometry,\r
    gl,\r
    image,\r
    index,\r
    length,\r
    renderer,\r
    scene,\r
    screen,\r
    text,\r
    viewport,\r
    bend,\r
    textColor,\r
    borderRadius = 0,\r
    font\r
  }) {\r
    this.extra = 0;\r
    this.geometry = geometry;\r
    this.gl = gl;\r
    this.image = image;\r
    this.index = index;\r
    this.length = length;\r
    this.renderer = renderer;\r
    this.scene = scene;\r
    this.screen = screen;\r
    this.text = text;\r
    this.viewport = viewport;\r
    this.bend = bend;\r
    this.textColor = textColor;\r
    this.borderRadius = borderRadius;\r
    this.font = font;\r
    this.createShader();\r
    this.createMesh();\r
    this.createTitle();\r
    this.onResize();\r
  }\r
  createShader() {\r
    const texture = new Texture(this.gl, {\r
      generateMipmaps: true\r
    });\r
    this.program = new Program(this.gl, {\r
      depthTest: false,\r
      depthWrite: false,\r
      vertex: \`\r
        precision highp float;\r
        attribute vec3 position;\r
        attribute vec2 uv;\r
        uniform mat4 modelViewMatrix;\r
        uniform mat4 projectionMatrix;\r
        uniform float uTime;\r
        uniform float uSpeed;\r
        varying vec2 vUv;\r
        void main() {\r
          vUv = uv;\r
          vec3 p = position;\r
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);\r
        }\r
      \`,\r
      fragment: \`\r
        precision highp float;\r
        uniform vec2 uImageSizes;\r
        uniform vec2 uPlaneSizes;\r
        uniform sampler2D tMap;\r
        uniform float uBorderRadius;\r
        varying vec2 vUv;\r
        \r
        float roundedBoxSDF(vec2 p, vec2 b, float r) {\r
          vec2 d = abs(p) - b;\r
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;\r
        }\r
        \r
        void main() {\r
          vec2 ratio = vec2(\r
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),\r
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)\r
          );\r
          vec2 uv = vec2(\r
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\r
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\r
          );\r
          vec4 color = texture2D(tMap, uv);\r
          \r
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);\r
          \r
          // Smooth antialiasing for edges\r
          float edgeSmooth = 0.002;\r
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);\r
          \r
          gl_FragColor = vec4(color.rgb, alpha);\r
        }\r
      \`,\r
      uniforms: {\r
        tMap: { value: texture },\r
        uPlaneSizes: { value: [0, 0] },\r
        uImageSizes: { value: [0, 0] },\r
        uSpeed: { value: 0 },\r
        uTime: { value: 100 * Math.random() },\r
        uBorderRadius: { value: this.borderRadius }\r
      },\r
      transparent: true\r
    });\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.src = this.image;\r
    img.onload = () => {\r
      texture.image = img;\r
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];\r
    };\r
  }\r
  createMesh() {\r
    this.plane = new Mesh(this.gl, {\r
      geometry: this.geometry,\r
      program: this.program\r
    });\r
    this.plane.setParent(this.scene);\r
  }\r
  createTitle() {\r
    this.title = new Title({\r
      gl: this.gl,\r
      plane: this.plane,\r
      renderer: this.renderer,\r
      text: this.text,\r
      textColor: this.textColor,\r
      fontFamily: this.font\r
    });\r
  }\r
  update(scroll, direction) {\r
    this.plane.position.x = this.x - scroll.current - this.extra;\r
\r
    const x = this.plane.position.x;\r
    const H = this.viewport.width / 2;\r
\r
    if (this.bend === 0) {\r
      this.plane.position.y = 0;\r
      this.plane.rotation.z = 0;\r
    } else {\r
      const B_abs = Math.abs(this.bend);\r
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);\r
      const effectiveX = Math.min(Math.abs(x), H);\r
\r
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);\r
      if (this.bend > 0) {\r
        this.plane.position.y = -arc;\r
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);\r
      } else {\r
        this.plane.position.y = arc;\r
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);\r
      }\r
    }\r
\r
    this.speed = scroll.current - scroll.last;\r
    this.program.uniforms.uTime.value += 0.04;\r
    this.program.uniforms.uSpeed.value = this.speed;\r
\r
    const planeOffset = this.plane.scale.x / 2;\r
    const viewportOffset = this.viewport.width / 2;\r
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;\r
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;\r
    if (direction === 'right' && this.isBefore) {\r
      this.extra -= this.widthTotal;\r
      this.isBefore = this.isAfter = false;\r
    }\r
    if (direction === 'left' && this.isAfter) {\r
      this.extra += this.widthTotal;\r
      this.isBefore = this.isAfter = false;\r
    }\r
  }\r
  onResize({ screen, viewport } = {}) {\r
    if (screen) this.screen = screen;\r
    if (viewport) {\r
      this.viewport = viewport;\r
      if (this.plane.program.uniforms.uViewportSizes) {\r
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];\r
      }\r
    }\r
    this.scale = this.screen.height / 1500;\r
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;\r
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;\r
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];\r
    this.padding = 2;\r
    this.width = this.plane.scale.x + this.padding;\r
    this.widthTotal = this.width * this.length;\r
    this.x = this.width * this.index;\r
  }\r
}\r
\r
class App {\r
  constructor(\r
    container,\r
    {\r
      items,\r
      bend,\r
      textColor = '#ffffff',\r
      borderRadius = 0,\r
      font = 'bold 30px Figtree',\r
      scrollSpeed = 2,\r
      scrollEase = 0.05\r
    } = {}\r
  ) {\r
    document.documentElement.classList.remove('no-js');\r
    this.container = container;\r
    this.scrollSpeed = scrollSpeed;\r
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };\r
    this.onCheckDebounce = debounce(this.onCheck, 200);\r
    this.createRenderer();\r
    this.createCamera();\r
    this.createScene();\r
    this.onResize();\r
    this.createGeometry();\r
    this.createMedias(items, bend, textColor, borderRadius, font);\r
    this.update();\r
    this.addEventListeners();\r
  }\r
  createRenderer() {\r
    this.renderer = new Renderer({\r
      alpha: true,\r
      antialias: true,\r
      dpr: Math.min(window.devicePixelRatio || 1, 2)\r
    });\r
    this.gl = this.renderer.gl;\r
    this.gl.clearColor(0, 0, 0, 0);\r
    this.container.appendChild(this.gl.canvas);\r
  }\r
  createCamera() {\r
    this.camera = new Camera(this.gl);\r
    this.camera.fov = 45;\r
    this.camera.position.z = 20;\r
  }\r
  createScene() {\r
    this.scene = new Transform();\r
  }\r
  createGeometry() {\r
    this.planeGeometry = new Plane(this.gl, {\r
      heightSegments: 50,\r
      widthSegments: 100\r
    });\r
  }\r
  createMedias(items, bend = 1, textColor, borderRadius, font) {\r
    const defaultItems = [\r
      { image: \`https://picsum.photos/seed/1/800/600?grayscale\`, text: 'Bridge' },\r
      { image: \`https://picsum.photos/seed/2/800/600?grayscale\`, text: 'Desk Setup' },\r
      { image: \`https://picsum.photos/seed/3/800/600?grayscale\`, text: 'Waterfall' },\r
      { image: \`https://picsum.photos/seed/4/800/600?grayscale\`, text: 'Strawberries' },\r
      { image: \`https://picsum.photos/seed/5/800/600?grayscale\`, text: 'Deep Diving' },\r
      { image: \`https://picsum.photos/seed/16/800/600?grayscale\`, text: 'Train Track' },\r
      { image: \`https://picsum.photos/seed/17/800/600?grayscale\`, text: 'Santorini' },\r
      { image: \`https://picsum.photos/seed/8/800/600?grayscale\`, text: 'Blurry Lights' },\r
      { image: \`https://picsum.photos/seed/9/800/600?grayscale\`, text: 'New York' },\r
      { image: \`https://picsum.photos/seed/10/800/600?grayscale\`, text: 'Good Boy' },\r
      { image: \`https://picsum.photos/seed/21/800/600?grayscale\`, text: 'Coastline' },\r
      { image: \`https://picsum.photos/seed/12/800/600?grayscale\`, text: 'Palm Trees' }\r
    ];\r
    const galleryItems = items && items.length ? items : defaultItems;\r
    this.mediasImages = galleryItems.concat(galleryItems);\r
    this.medias = this.mediasImages.map((data, index) => {\r
      return new Media({\r
        geometry: this.planeGeometry,\r
        gl: this.gl,\r
        image: data.image,\r
        index,\r
        length: this.mediasImages.length,\r
        renderer: this.renderer,\r
        scene: this.scene,\r
        screen: this.screen,\r
        text: data.text,\r
        viewport: this.viewport,\r
        bend,\r
        textColor,\r
        borderRadius,\r
        font\r
      });\r
    });\r
  }\r
  onTouchDown(e) {\r
    this.isDown = true;\r
    this.scroll.position = this.scroll.current;\r
    this.start = e.touches ? e.touches[0].clientX : e.clientX;\r
  }\r
  onTouchMove(e) {\r
    if (!this.isDown) return;\r
    const x = e.touches ? e.touches[0].clientX : e.clientX;\r
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);\r
    this.scroll.target = this.scroll.position + distance;\r
  }\r
  onTouchUp() {\r
    this.isDown = false;\r
    this.onCheck();\r
  }\r
  onWheel(e) {\r
    const delta = e.deltaY || e.wheelDelta || e.detail;\r
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;\r
    this.onCheckDebounce();\r
  }\r
  onCheck() {\r
    if (!this.medias || !this.medias[0]) return;\r
    const width = this.medias[0].width;\r
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);\r
    const item = width * itemIndex;\r
    this.scroll.target = this.scroll.target < 0 ? -item : item;\r
  }\r
  onResize() {\r
    this.screen = {\r
      width: this.container.clientWidth,\r
      height: this.container.clientHeight\r
    };\r
    this.renderer.setSize(this.screen.width, this.screen.height);\r
    this.camera.perspective({\r
      aspect: this.screen.width / this.screen.height\r
    });\r
    const fov = (this.camera.fov * Math.PI) / 180;\r
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;\r
    const width = height * this.camera.aspect;\r
    this.viewport = { width, height };\r
    if (this.medias) {\r
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));\r
    }\r
  }\r
  update() {\r
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);\r
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';\r
    if (this.medias) {\r
      this.medias.forEach(media => media.update(this.scroll, direction));\r
    }\r
    this.renderer.render({ scene: this.scene, camera: this.camera });\r
    this.scroll.last = this.scroll.current;\r
    this.raf = window.requestAnimationFrame(this.update.bind(this));\r
  }\r
  addEventListeners() {\r
    this.boundOnResize = this.onResize.bind(this);\r
    this.boundOnWheel = this.onWheel.bind(this);\r
    this.boundOnTouchDown = this.onTouchDown.bind(this);\r
    this.boundOnTouchMove = this.onTouchMove.bind(this);\r
    this.boundOnTouchUp = this.onTouchUp.bind(this);\r
    window.addEventListener('resize', this.boundOnResize);\r
    window.addEventListener('mousewheel', this.boundOnWheel);\r
    window.addEventListener('wheel', this.boundOnWheel);\r
    window.addEventListener('mousedown', this.boundOnTouchDown);\r
    window.addEventListener('mousemove', this.boundOnTouchMove);\r
    window.addEventListener('mouseup', this.boundOnTouchUp);\r
    window.addEventListener('touchstart', this.boundOnTouchDown);\r
    window.addEventListener('touchmove', this.boundOnTouchMove);\r
    window.addEventListener('touchend', this.boundOnTouchUp);\r
  }\r
  destroy() {\r
    window.cancelAnimationFrame(this.raf);\r
    window.removeEventListener('resize', this.boundOnResize);\r
    window.removeEventListener('mousewheel', this.boundOnWheel);\r
    window.removeEventListener('wheel', this.boundOnWheel);\r
    window.removeEventListener('mousedown', this.boundOnTouchDown);\r
    window.removeEventListener('mousemove', this.boundOnTouchMove);\r
    window.removeEventListener('mouseup', this.boundOnTouchUp);\r
    window.removeEventListener('touchstart', this.boundOnTouchDown);\r
    window.removeEventListener('touchmove', this.boundOnTouchMove);\r
    window.removeEventListener('touchend', this.boundOnTouchUp);\r
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {\r
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);\r
    }\r
  }\r
}\r
\r
export default function CircularGallery({\r
  items,\r
  bend = 3,\r
  textColor = '#ffffff',\r
  borderRadius = 0.05,\r
  font = 'bold 30px Figtree',\r
  scrollSpeed = 2,\r
  scrollEase = 0.05\r
}) {\r
  const containerRef = useRef(null);\r
  useEffect(() => {\r
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase });\r
    return () => {\r
      app.destroy();\r
    };\r
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);\r
  return <div className="circular-gallery" ref={containerRef} />;\r
}\r
`,W=`import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
function debounce(func, wait) {\r
  let timeout;\r
  return function (...args) {\r
    clearTimeout(timeout);\r
    timeout = setTimeout(() => func.apply(this, args), wait);\r
  };\r
}\r
\r
function lerp(p1, p2, t) {\r
  return p1 + (p2 - p1) * t;\r
}\r
\r
function autoBind(instance) {\r
  const proto = Object.getPrototypeOf(instance);\r
  Object.getOwnPropertyNames(proto).forEach(key => {\r
    if (key !== 'constructor' && typeof instance[key] === 'function') {\r
      instance[key] = instance[key].bind(instance);\r
    }\r
  });\r
}\r
\r
function createTextTexture(gl, text, font = 'bold 30px monospace', color = 'black') {\r
  const canvas = document.createElement('canvas');\r
  const context = canvas.getContext('2d');\r
  context.font = font;\r
  const metrics = context.measureText(text);\r
  const textWidth = Math.ceil(metrics.width);\r
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);\r
  canvas.width = textWidth + 20;\r
  canvas.height = textHeight + 20;\r
  context.font = font;\r
  context.fillStyle = color;\r
  context.textBaseline = 'middle';\r
  context.textAlign = 'center';\r
  context.clearRect(0, 0, canvas.width, canvas.height);\r
  context.fillText(text, canvas.width / 2, canvas.height / 2);\r
  const texture = new Texture(gl, { generateMipmaps: false });\r
  texture.image = canvas;\r
  return { texture, width: canvas.width, height: canvas.height };\r
}\r
\r
class Title {\r
  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }) {\r
    autoBind(this);\r
    this.gl = gl;\r
    this.plane = plane;\r
    this.renderer = renderer;\r
    this.text = text;\r
    this.textColor = textColor;\r
    this.font = font;\r
    this.createMesh();\r
  }\r
  createMesh() {\r
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);\r
    const geometry = new Plane(this.gl);\r
    const program = new Program(this.gl, {\r
      vertex: \`\r
        attribute vec3 position;\r
        attribute vec2 uv;\r
        uniform mat4 modelViewMatrix;\r
        uniform mat4 projectionMatrix;\r
        varying vec2 vUv;\r
        void main() {\r
          vUv = uv;\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
        }\r
      \`,\r
      fragment: \`\r
        precision highp float;\r
        uniform sampler2D tMap;\r
        varying vec2 vUv;\r
        void main() {\r
          vec4 color = texture2D(tMap, vUv);\r
          if (color.a < 0.1) discard;\r
          gl_FragColor = color;\r
        }\r
      \`,\r
      uniforms: { tMap: { value: texture } },\r
      transparent: true\r
    });\r
    this.mesh = new Mesh(this.gl, { geometry, program });\r
    const aspect = width / height;\r
    const textHeight = this.plane.scale.y * 0.15;\r
    const textWidth = textHeight * aspect;\r
    this.mesh.scale.set(textWidth, textHeight, 1);\r
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;\r
    this.mesh.setParent(this.plane);\r
  }\r
}\r
\r
class Media {\r
  constructor({\r
    geometry,\r
    gl,\r
    image,\r
    index,\r
    length,\r
    renderer,\r
    scene,\r
    screen,\r
    text,\r
    viewport,\r
    bend,\r
    textColor,\r
    borderRadius = 0,\r
    font\r
  }) {\r
    this.extra = 0;\r
    this.geometry = geometry;\r
    this.gl = gl;\r
    this.image = image;\r
    this.index = index;\r
    this.length = length;\r
    this.renderer = renderer;\r
    this.scene = scene;\r
    this.screen = screen;\r
    this.text = text;\r
    this.viewport = viewport;\r
    this.bend = bend;\r
    this.textColor = textColor;\r
    this.borderRadius = borderRadius;\r
    this.font = font;\r
    this.createShader();\r
    this.createMesh();\r
    this.createTitle();\r
    this.onResize();\r
  }\r
  createShader() {\r
    const texture = new Texture(this.gl, {\r
      generateMipmaps: true\r
    });\r
    this.program = new Program(this.gl, {\r
      depthTest: false,\r
      depthWrite: false,\r
      vertex: \`\r
        precision highp float;\r
        attribute vec3 position;\r
        attribute vec2 uv;\r
        uniform mat4 modelViewMatrix;\r
        uniform mat4 projectionMatrix;\r
        uniform float uTime;\r
        uniform float uSpeed;\r
        varying vec2 vUv;\r
        void main() {\r
          vUv = uv;\r
          vec3 p = position;\r
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);\r
        }\r
      \`,\r
      fragment: \`\r
        precision highp float;\r
        uniform vec2 uImageSizes;\r
        uniform vec2 uPlaneSizes;\r
        uniform sampler2D tMap;\r
        uniform float uBorderRadius;\r
        varying vec2 vUv;\r
        \r
        float roundedBoxSDF(vec2 p, vec2 b, float r) {\r
          vec2 d = abs(p) - b;\r
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;\r
        }\r
        \r
        void main() {\r
          vec2 ratio = vec2(\r
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),\r
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)\r
          );\r
          vec2 uv = vec2(\r
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\r
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\r
          );\r
          vec4 color = texture2D(tMap, uv);\r
          \r
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);\r
          \r
          // Smooth antialiasing for edges\r
          float edgeSmooth = 0.002;\r
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);\r
          \r
          gl_FragColor = vec4(color.rgb, alpha);\r
        }\r
      \`,\r
      uniforms: {\r
        tMap: { value: texture },\r
        uPlaneSizes: { value: [0, 0] },\r
        uImageSizes: { value: [0, 0] },\r
        uSpeed: { value: 0 },\r
        uTime: { value: 100 * Math.random() },\r
        uBorderRadius: { value: this.borderRadius }\r
      },\r
      transparent: true\r
    });\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.src = this.image;\r
    img.onload = () => {\r
      texture.image = img;\r
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];\r
    };\r
  }\r
  createMesh() {\r
    this.plane = new Mesh(this.gl, {\r
      geometry: this.geometry,\r
      program: this.program\r
    });\r
    this.plane.setParent(this.scene);\r
  }\r
  createTitle() {\r
    this.title = new Title({\r
      gl: this.gl,\r
      plane: this.plane,\r
      renderer: this.renderer,\r
      text: this.text,\r
      textColor: this.textColor,\r
      fontFamily: this.font\r
    });\r
  }\r
  update(scroll, direction) {\r
    this.plane.position.x = this.x - scroll.current - this.extra;\r
\r
    const x = this.plane.position.x;\r
    const H = this.viewport.width / 2;\r
\r
    if (this.bend === 0) {\r
      this.plane.position.y = 0;\r
      this.plane.rotation.z = 0;\r
    } else {\r
      const B_abs = Math.abs(this.bend);\r
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);\r
      const effectiveX = Math.min(Math.abs(x), H);\r
\r
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);\r
      if (this.bend > 0) {\r
        this.plane.position.y = -arc;\r
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);\r
      } else {\r
        this.plane.position.y = arc;\r
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);\r
      }\r
    }\r
\r
    this.speed = scroll.current - scroll.last;\r
    this.program.uniforms.uTime.value += 0.04;\r
    this.program.uniforms.uSpeed.value = this.speed;\r
\r
    const planeOffset = this.plane.scale.x / 2;\r
    const viewportOffset = this.viewport.width / 2;\r
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;\r
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;\r
    if (direction === 'right' && this.isBefore) {\r
      this.extra -= this.widthTotal;\r
      this.isBefore = this.isAfter = false;\r
    }\r
    if (direction === 'left' && this.isAfter) {\r
      this.extra += this.widthTotal;\r
      this.isBefore = this.isAfter = false;\r
    }\r
  }\r
  onResize({ screen, viewport } = {}) {\r
    if (screen) this.screen = screen;\r
    if (viewport) {\r
      this.viewport = viewport;\r
      if (this.plane.program.uniforms.uViewportSizes) {\r
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];\r
      }\r
    }\r
    this.scale = this.screen.height / 1500;\r
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;\r
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;\r
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];\r
    this.padding = 2;\r
    this.width = this.plane.scale.x + this.padding;\r
    this.widthTotal = this.width * this.length;\r
    this.x = this.width * this.index;\r
  }\r
}\r
\r
class App {\r
  constructor(\r
    container,\r
    {\r
      items,\r
      bend,\r
      textColor = '#ffffff',\r
      borderRadius = 0,\r
      font = 'bold 30px Figtree',\r
      scrollSpeed = 2,\r
      scrollEase = 0.05\r
    } = {}\r
  ) {\r
    document.documentElement.classList.remove('no-js');\r
    this.container = container;\r
    this.scrollSpeed = scrollSpeed;\r
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };\r
    this.onCheckDebounce = debounce(this.onCheck, 200);\r
    this.createRenderer();\r
    this.createCamera();\r
    this.createScene();\r
    this.onResize();\r
    this.createGeometry();\r
    this.createMedias(items, bend, textColor, borderRadius, font);\r
    this.update();\r
    this.addEventListeners();\r
  }\r
  createRenderer() {\r
    this.renderer = new Renderer({\r
      alpha: true,\r
      antialias: true,\r
      dpr: Math.min(window.devicePixelRatio || 1, 2)\r
    });\r
    this.gl = this.renderer.gl;\r
    this.gl.clearColor(0, 0, 0, 0);\r
    this.container.appendChild(this.gl.canvas);\r
  }\r
  createCamera() {\r
    this.camera = new Camera(this.gl);\r
    this.camera.fov = 45;\r
    this.camera.position.z = 20;\r
  }\r
  createScene() {\r
    this.scene = new Transform();\r
  }\r
  createGeometry() {\r
    this.planeGeometry = new Plane(this.gl, {\r
      heightSegments: 50,\r
      widthSegments: 100\r
    });\r
  }\r
  createMedias(items, bend = 1, textColor, borderRadius, font) {\r
    const defaultItems = [\r
      { image: \`https://picsum.photos/seed/1/800/600?grayscale\`, text: 'Bridge' },\r
      { image: \`https://picsum.photos/seed/2/800/600?grayscale\`, text: 'Desk Setup' },\r
      { image: \`https://picsum.photos/seed/3/800/600?grayscale\`, text: 'Waterfall' },\r
      { image: \`https://picsum.photos/seed/4/800/600?grayscale\`, text: 'Strawberries' },\r
      { image: \`https://picsum.photos/seed/5/800/600?grayscale\`, text: 'Deep Diving' },\r
      { image: \`https://picsum.photos/seed/16/800/600?grayscale\`, text: 'Train Track' },\r
      { image: \`https://picsum.photos/seed/17/800/600?grayscale\`, text: 'Santorini' },\r
      { image: \`https://picsum.photos/seed/8/800/600?grayscale\`, text: 'Blurry Lights' },\r
      { image: \`https://picsum.photos/seed/9/800/600?grayscale\`, text: 'New York' },\r
      { image: \`https://picsum.photos/seed/10/800/600?grayscale\`, text: 'Good Boy' },\r
      { image: \`https://picsum.photos/seed/21/800/600?grayscale\`, text: 'Coastline' },\r
      { image: \`https://picsum.photos/seed/12/800/600?grayscale\`, text: 'Palm Trees' }\r
    ];\r
    const galleryItems = items && items.length ? items : defaultItems;\r
    this.mediasImages = galleryItems.concat(galleryItems);\r
    this.medias = this.mediasImages.map((data, index) => {\r
      return new Media({\r
        geometry: this.planeGeometry,\r
        gl: this.gl,\r
        image: data.image,\r
        index,\r
        length: this.mediasImages.length,\r
        renderer: this.renderer,\r
        scene: this.scene,\r
        screen: this.screen,\r
        text: data.text,\r
        viewport: this.viewport,\r
        bend,\r
        textColor,\r
        borderRadius,\r
        font\r
      });\r
    });\r
  }\r
  onTouchDown(e) {\r
    this.isDown = true;\r
    this.scroll.position = this.scroll.current;\r
    this.start = e.touches ? e.touches[0].clientX : e.clientX;\r
  }\r
  onTouchMove(e) {\r
    if (!this.isDown) return;\r
    const x = e.touches ? e.touches[0].clientX : e.clientX;\r
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);\r
    this.scroll.target = this.scroll.position + distance;\r
  }\r
  onTouchUp() {\r
    this.isDown = false;\r
    this.onCheck();\r
  }\r
  onWheel(e) {\r
    const delta = e.deltaY || e.wheelDelta || e.detail;\r
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;\r
    this.onCheckDebounce();\r
  }\r
  onCheck() {\r
    if (!this.medias || !this.medias[0]) return;\r
    const width = this.medias[0].width;\r
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);\r
    const item = width * itemIndex;\r
    this.scroll.target = this.scroll.target < 0 ? -item : item;\r
  }\r
  onResize() {\r
    this.screen = {\r
      width: this.container.clientWidth,\r
      height: this.container.clientHeight\r
    };\r
    this.renderer.setSize(this.screen.width, this.screen.height);\r
    this.camera.perspective({\r
      aspect: this.screen.width / this.screen.height\r
    });\r
    const fov = (this.camera.fov * Math.PI) / 180;\r
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;\r
    const width = height * this.camera.aspect;\r
    this.viewport = { width, height };\r
    if (this.medias) {\r
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));\r
    }\r
  }\r
  update() {\r
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);\r
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';\r
    if (this.medias) {\r
      this.medias.forEach(media => media.update(this.scroll, direction));\r
    }\r
    this.renderer.render({ scene: this.scene, camera: this.camera });\r
    this.scroll.last = this.scroll.current;\r
    this.raf = window.requestAnimationFrame(this.update.bind(this));\r
  }\r
  addEventListeners() {\r
    this.boundOnResize = this.onResize.bind(this);\r
    this.boundOnWheel = this.onWheel.bind(this);\r
    this.boundOnTouchDown = this.onTouchDown.bind(this);\r
    this.boundOnTouchMove = this.onTouchMove.bind(this);\r
    this.boundOnTouchUp = this.onTouchUp.bind(this);\r
    window.addEventListener('resize', this.boundOnResize);\r
    window.addEventListener('mousewheel', this.boundOnWheel);\r
    window.addEventListener('wheel', this.boundOnWheel);\r
    window.addEventListener('mousedown', this.boundOnTouchDown);\r
    window.addEventListener('mousemove', this.boundOnTouchMove);\r
    window.addEventListener('mouseup', this.boundOnTouchUp);\r
    window.addEventListener('touchstart', this.boundOnTouchDown);\r
    window.addEventListener('touchmove', this.boundOnTouchMove);\r
    window.addEventListener('touchend', this.boundOnTouchUp);\r
  }\r
  destroy() {\r
    window.cancelAnimationFrame(this.raf);\r
    window.removeEventListener('resize', this.boundOnResize);\r
    window.removeEventListener('mousewheel', this.boundOnWheel);\r
    window.removeEventListener('wheel', this.boundOnWheel);\r
    window.removeEventListener('mousedown', this.boundOnTouchDown);\r
    window.removeEventListener('mousemove', this.boundOnTouchMove);\r
    window.removeEventListener('mouseup', this.boundOnTouchUp);\r
    window.removeEventListener('touchstart', this.boundOnTouchDown);\r
    window.removeEventListener('touchmove', this.boundOnTouchMove);\r
    window.removeEventListener('touchend', this.boundOnTouchUp);\r
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {\r
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);\r
    }\r
  }\r
}\r
\r
export default function CircularGallery({\r
  items,\r
  bend = 3,\r
  textColor = '#ffffff',\r
  borderRadius = 0.05,\r
  font = 'bold 30px Figtree',\r
  scrollSpeed = 2,\r
  scrollEase = 0.05\r
}) {\r
  const containerRef = useRef(null);\r
  useEffect(() => {\r
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase });\r
    return () => {\r
      app.destroy();\r
    };\r
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);\r
  return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;\r
}\r
`,k=`import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
import './CircularGallery.css';\r
\r
type GL = Renderer['gl'];\r
\r
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {\r
  let timeout: number;\r
  return function (this: any, ...args: Parameters<T>) {\r
    window.clearTimeout(timeout);\r
    timeout = window.setTimeout(() => func.apply(this, args), wait);\r
  };\r
}\r
\r
function lerp(p1: number, p2: number, t: number): number {\r
  return p1 + (p2 - p1) * t;\r
}\r
\r
function autoBind(instance: any): void {\r
  const proto = Object.getPrototypeOf(instance);\r
  Object.getOwnPropertyNames(proto).forEach(key => {\r
    if (key !== 'constructor' && typeof instance[key] === 'function') {\r
      instance[key] = instance[key].bind(instance);\r
    }\r
  });\r
}\r
\r
function getFontSize(font: string): number {\r
  const match = font.match(/(\\d+)px/);\r
  return match ? parseInt(match[1], 10) : 30;\r
}\r
\r
function createTextTexture(\r
  gl: GL,\r
  text: string,\r
  font: string = 'bold 30px monospace',\r
  color: string = 'black'\r
): { texture: Texture; width: number; height: number } {\r
  const canvas = document.createElement('canvas');\r
  const context = canvas.getContext('2d');\r
  if (!context) throw new Error('Could not get 2d context');\r
\r
  context.font = font;\r
  const metrics = context.measureText(text);\r
  const textWidth = Math.ceil(metrics.width);\r
  const fontSize = getFontSize(font);\r
  const textHeight = Math.ceil(fontSize * 1.2);\r
\r
  canvas.width = textWidth + 20;\r
  canvas.height = textHeight + 20;\r
\r
  context.font = font;\r
  context.fillStyle = color;\r
  context.textBaseline = 'middle';\r
  context.textAlign = 'center';\r
  context.clearRect(0, 0, canvas.width, canvas.height);\r
  context.fillText(text, canvas.width / 2, canvas.height / 2);\r
\r
  const texture = new Texture(gl, { generateMipmaps: false });\r
  texture.image = canvas;\r
  return { texture, width: canvas.width, height: canvas.height };\r
}\r
\r
interface TitleProps {\r
  gl: GL;\r
  plane: Mesh;\r
  renderer: Renderer;\r
  text: string;\r
  textColor?: string;\r
  font?: string;\r
}\r
\r
class Title {\r
  gl: GL;\r
  plane: Mesh;\r
  renderer: Renderer;\r
  text: string;\r
  textColor: string;\r
  font: string;\r
  mesh!: Mesh;\r
\r
  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }: TitleProps) {\r
    autoBind(this);\r
    this.gl = gl;\r
    this.plane = plane;\r
    this.renderer = renderer;\r
    this.text = text;\r
    this.textColor = textColor;\r
    this.font = font;\r
    this.createMesh();\r
  }\r
\r
  createMesh() {\r
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);\r
    const geometry = new Plane(this.gl);\r
    const program = new Program(this.gl, {\r
      vertex: \`\r
        attribute vec3 position;\r
        attribute vec2 uv;\r
        uniform mat4 modelViewMatrix;\r
        uniform mat4 projectionMatrix;\r
        varying vec2 vUv;\r
        void main() {\r
          vUv = uv;\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
        }\r
      \`,\r
      fragment: \`\r
        precision highp float;\r
        uniform sampler2D tMap;\r
        varying vec2 vUv;\r
        void main() {\r
          vec4 color = texture2D(tMap, vUv);\r
          if (color.a < 0.1) discard;\r
          gl_FragColor = color;\r
        }\r
      \`,\r
      uniforms: { tMap: { value: texture } },\r
      transparent: true\r
    });\r
    this.mesh = new Mesh(this.gl, { geometry, program });\r
    const aspect = width / height;\r
    const textHeightScaled = this.plane.scale.y * 0.15;\r
    const textWidthScaled = textHeightScaled * aspect;\r
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);\r
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;\r
    this.mesh.setParent(this.plane);\r
  }\r
}\r
\r
interface ScreenSize {\r
  width: number;\r
  height: number;\r
}\r
\r
interface Viewport {\r
  width: number;\r
  height: number;\r
}\r
\r
interface MediaProps {\r
  geometry: Plane;\r
  gl: GL;\r
  image: string;\r
  index: number;\r
  length: number;\r
  renderer: Renderer;\r
  scene: Transform;\r
  screen: ScreenSize;\r
  text: string;\r
  viewport: Viewport;\r
  bend: number;\r
  textColor: string;\r
  borderRadius?: number;\r
  font?: string;\r
}\r
\r
class Media {\r
  extra: number = 0;\r
  geometry: Plane;\r
  gl: GL;\r
  image: string;\r
  index: number;\r
  length: number;\r
  renderer: Renderer;\r
  scene: Transform;\r
  screen: ScreenSize;\r
  text: string;\r
  viewport: Viewport;\r
  bend: number;\r
  textColor: string;\r
  borderRadius: number;\r
  font?: string;\r
  program!: Program;\r
  plane!: Mesh;\r
  title!: Title;\r
  scale!: number;\r
  padding!: number;\r
  width!: number;\r
  widthTotal!: number;\r
  x!: number;\r
  speed: number = 0;\r
  isBefore: boolean = false;\r
  isAfter: boolean = false;\r
\r
  constructor({\r
    geometry,\r
    gl,\r
    image,\r
    index,\r
    length,\r
    renderer,\r
    scene,\r
    screen,\r
    text,\r
    viewport,\r
    bend,\r
    textColor,\r
    borderRadius = 0,\r
    font\r
  }: MediaProps) {\r
    this.geometry = geometry;\r
    this.gl = gl;\r
    this.image = image;\r
    this.index = index;\r
    this.length = length;\r
    this.renderer = renderer;\r
    this.scene = scene;\r
    this.screen = screen;\r
    this.text = text;\r
    this.viewport = viewport;\r
    this.bend = bend;\r
    this.textColor = textColor;\r
    this.borderRadius = borderRadius;\r
    this.font = font;\r
    this.createShader();\r
    this.createMesh();\r
    this.createTitle();\r
    this.onResize();\r
  }\r
\r
  createShader() {\r
    const texture = new Texture(this.gl, {\r
      generateMipmaps: true\r
    });\r
    this.program = new Program(this.gl, {\r
      depthTest: false,\r
      depthWrite: false,\r
      vertex: \`\r
        precision highp float;\r
        attribute vec3 position;\r
        attribute vec2 uv;\r
        uniform mat4 modelViewMatrix;\r
        uniform mat4 projectionMatrix;\r
        uniform float uTime;\r
        uniform float uSpeed;\r
        varying vec2 vUv;\r
        void main() {\r
          vUv = uv;\r
          vec3 p = position;\r
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);\r
        }\r
      \`,\r
      fragment: \`\r
        precision highp float;\r
        uniform vec2 uImageSizes;\r
        uniform vec2 uPlaneSizes;\r
        uniform sampler2D tMap;\r
        uniform float uBorderRadius;\r
        varying vec2 vUv;\r
        \r
        float roundedBoxSDF(vec2 p, vec2 b, float r) {\r
          vec2 d = abs(p) - b;\r
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;\r
        }\r
        \r
        void main() {\r
          vec2 ratio = vec2(\r
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),\r
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)\r
          );\r
          vec2 uv = vec2(\r
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\r
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\r
          );\r
          vec4 color = texture2D(tMap, uv);\r
          \r
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);\r
          \r
          float edgeSmooth = 0.002;\r
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);\r
          \r
          gl_FragColor = vec4(color.rgb, alpha);\r
        }\r
      \`,\r
      uniforms: {\r
        tMap: { value: texture },\r
        uPlaneSizes: { value: [0, 0] },\r
        uImageSizes: { value: [0, 0] },\r
        uSpeed: { value: 0 },\r
        uTime: { value: 100 * Math.random() },\r
        uBorderRadius: { value: this.borderRadius }\r
      },\r
      transparent: true\r
    });\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.src = this.image;\r
    img.onload = () => {\r
      texture.image = img;\r
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];\r
    };\r
  }\r
\r
  createMesh() {\r
    this.plane = new Mesh(this.gl, {\r
      geometry: this.geometry,\r
      program: this.program\r
    });\r
    this.plane.setParent(this.scene);\r
  }\r
\r
  createTitle() {\r
    this.title = new Title({\r
      gl: this.gl,\r
      plane: this.plane,\r
      renderer: this.renderer,\r
      text: this.text,\r
      textColor: this.textColor,\r
      font: this.font\r
    });\r
  }\r
\r
  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {\r
    this.plane.position.x = this.x - scroll.current - this.extra;\r
\r
    const x = this.plane.position.x;\r
    const H = this.viewport.width / 2;\r
\r
    if (this.bend === 0) {\r
      this.plane.position.y = 0;\r
      this.plane.rotation.z = 0;\r
    } else {\r
      const B_abs = Math.abs(this.bend);\r
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);\r
      const effectiveX = Math.min(Math.abs(x), H);\r
\r
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);\r
      if (this.bend > 0) {\r
        this.plane.position.y = -arc;\r
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);\r
      } else {\r
        this.plane.position.y = arc;\r
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);\r
      }\r
    }\r
\r
    this.speed = scroll.current - scroll.last;\r
    this.program.uniforms.uTime.value += 0.04;\r
    this.program.uniforms.uSpeed.value = this.speed;\r
\r
    const planeOffset = this.plane.scale.x / 2;\r
    const viewportOffset = this.viewport.width / 2;\r
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;\r
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;\r
    if (direction === 'right' && this.isBefore) {\r
      this.extra -= this.widthTotal;\r
      this.isBefore = this.isAfter = false;\r
    }\r
    if (direction === 'left' && this.isAfter) {\r
      this.extra += this.widthTotal;\r
      this.isBefore = this.isAfter = false;\r
    }\r
  }\r
\r
  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {\r
    if (screen) this.screen = screen;\r
    if (viewport) {\r
      this.viewport = viewport;\r
      if (this.plane.program.uniforms.uViewportSizes) {\r
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];\r
      }\r
    }\r
    this.scale = this.screen.height / 1500;\r
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;\r
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;\r
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];\r
    this.padding = 2;\r
    this.width = this.plane.scale.x + this.padding;\r
    this.widthTotal = this.width * this.length;\r
    this.x = this.width * this.index;\r
  }\r
}\r
\r
interface AppConfig {\r
  items?: { image: string; text: string }[];\r
  bend?: number;\r
  textColor?: string;\r
  borderRadius?: number;\r
  font?: string;\r
  scrollSpeed?: number;\r
  scrollEase?: number;\r
}\r
\r
class App {\r
  container: HTMLElement;\r
  scrollSpeed: number;\r
  scroll: {\r
    ease: number;\r
    current: number;\r
    target: number;\r
    last: number;\r
    position?: number;\r
  };\r
  onCheckDebounce: (...args: any[]) => void;\r
  renderer!: Renderer;\r
  gl!: GL;\r
  camera!: Camera;\r
  scene!: Transform;\r
  planeGeometry!: Plane;\r
  medias: Media[] = [];\r
  mediasImages: { image: string; text: string }[] = [];\r
  screen!: { width: number; height: number };\r
  viewport!: { width: number; height: number };\r
  raf: number = 0;\r
\r
  boundOnResize!: () => void;\r
  boundOnWheel!: (e: Event) => void;\r
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;\r
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;\r
  boundOnTouchUp!: () => void;\r
\r
  isDown: boolean = false;\r
  start: number = 0;\r
\r
  constructor(\r
    container: HTMLElement,\r
    {\r
      items,\r
      bend = 1,\r
      textColor = '#ffffff',\r
      borderRadius = 0,\r
      font = 'bold 30px Figtree',\r
      scrollSpeed = 2,\r
      scrollEase = 0.05\r
    }: AppConfig\r
  ) {\r
    document.documentElement.classList.remove('no-js');\r
    this.container = container;\r
    this.scrollSpeed = scrollSpeed;\r
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };\r
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);\r
    this.createRenderer();\r
    this.createCamera();\r
    this.createScene();\r
    this.onResize();\r
    this.createGeometry();\r
    this.createMedias(items, bend, textColor, borderRadius, font);\r
    this.update();\r
    this.addEventListeners();\r
  }\r
\r
  createRenderer() {\r
    this.renderer = new Renderer({\r
      alpha: true,\r
      antialias: true,\r
      dpr: Math.min(window.devicePixelRatio || 1, 2)\r
    });\r
    this.gl = this.renderer.gl;\r
    this.gl.clearColor(0, 0, 0, 0);\r
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);\r
  }\r
\r
  createCamera() {\r
    this.camera = new Camera(this.gl);\r
    this.camera.fov = 45;\r
    this.camera.position.z = 20;\r
  }\r
\r
  createScene() {\r
    this.scene = new Transform();\r
  }\r
\r
  createGeometry() {\r
    this.planeGeometry = new Plane(this.gl, {\r
      heightSegments: 50,\r
      widthSegments: 100\r
    });\r
  }\r
\r
  createMedias(\r
    items: { image: string; text: string }[] | undefined,\r
    bend: number = 1,\r
    textColor: string,\r
    borderRadius: number,\r
    font: string\r
  ) {\r
    const defaultItems = [\r
      {\r
        image: \`https://picsum.photos/seed/1/800/600?grayscale\`,\r
        text: 'Bridge'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/2/800/600?grayscale\`,\r
        text: 'Desk Setup'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/3/800/600?grayscale\`,\r
        text: 'Waterfall'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/4/800/600?grayscale\`,\r
        text: 'Strawberries'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/5/800/600?grayscale\`,\r
        text: 'Deep Diving'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/16/800/600?grayscale\`,\r
        text: 'Train Track'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/17/800/600?grayscale\`,\r
        text: 'Santorini'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/8/800/600?grayscale\`,\r
        text: 'Blurry Lights'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/9/800/600?grayscale\`,\r
        text: 'New York'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/10/800/600?grayscale\`,\r
        text: 'Good Boy'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/21/800/600?grayscale\`,\r
        text: 'Coastline'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/12/800/600?grayscale\`,\r
        text: 'Palm Trees'\r
      }\r
    ];\r
    const galleryItems = items && items.length ? items : defaultItems;\r
    this.mediasImages = galleryItems.concat(galleryItems);\r
    this.medias = this.mediasImages.map((data, index) => {\r
      return new Media({\r
        geometry: this.planeGeometry,\r
        gl: this.gl,\r
        image: data.image,\r
        index,\r
        length: this.mediasImages.length,\r
        renderer: this.renderer,\r
        scene: this.scene,\r
        screen: this.screen,\r
        text: data.text,\r
        viewport: this.viewport,\r
        bend,\r
        textColor,\r
        borderRadius,\r
        font\r
      });\r
    });\r
  }\r
\r
  onTouchDown(e: MouseEvent | TouchEvent) {\r
    this.isDown = true;\r
    this.scroll.position = this.scroll.current;\r
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;\r
  }\r
\r
  onTouchMove(e: MouseEvent | TouchEvent) {\r
    if (!this.isDown) return;\r
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;\r
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);\r
    this.scroll.target = (this.scroll.position ?? 0) + distance;\r
  }\r
\r
  onTouchUp() {\r
    this.isDown = false;\r
    this.onCheck();\r
  }\r
\r
  onWheel(e: Event) {\r
    const wheelEvent = e as WheelEvent;\r
    const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;\r
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;\r
    this.onCheckDebounce();\r
  }\r
\r
  onCheck() {\r
    if (!this.medias || !this.medias[0]) return;\r
    const width = this.medias[0].width;\r
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);\r
    const item = width * itemIndex;\r
    this.scroll.target = this.scroll.target < 0 ? -item : item;\r
  }\r
\r
  onResize() {\r
    this.screen = {\r
      width: this.container.clientWidth,\r
      height: this.container.clientHeight\r
    };\r
    this.renderer.setSize(this.screen.width, this.screen.height);\r
    this.camera.perspective({\r
      aspect: this.screen.width / this.screen.height\r
    });\r
    const fov = (this.camera.fov * Math.PI) / 180;\r
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;\r
    const width = height * this.camera.aspect;\r
    this.viewport = { width, height };\r
    if (this.medias) {\r
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));\r
    }\r
  }\r
\r
  update() {\r
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);\r
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';\r
    if (this.medias) {\r
      this.medias.forEach(media => media.update(this.scroll, direction));\r
    }\r
    this.renderer.render({ scene: this.scene, camera: this.camera });\r
    this.scroll.last = this.scroll.current;\r
    this.raf = window.requestAnimationFrame(this.update.bind(this));\r
  }\r
\r
  addEventListeners() {\r
    this.boundOnResize = this.onResize.bind(this);\r
    this.boundOnWheel = this.onWheel.bind(this);\r
    this.boundOnTouchDown = this.onTouchDown.bind(this);\r
    this.boundOnTouchMove = this.onTouchMove.bind(this);\r
    this.boundOnTouchUp = this.onTouchUp.bind(this);\r
    window.addEventListener('resize', this.boundOnResize);\r
    window.addEventListener('mousewheel', this.boundOnWheel);\r
    window.addEventListener('wheel', this.boundOnWheel);\r
    window.addEventListener('mousedown', this.boundOnTouchDown);\r
    window.addEventListener('mousemove', this.boundOnTouchMove);\r
    window.addEventListener('mouseup', this.boundOnTouchUp);\r
    window.addEventListener('touchstart', this.boundOnTouchDown);\r
    window.addEventListener('touchmove', this.boundOnTouchMove);\r
    window.addEventListener('touchend', this.boundOnTouchUp);\r
  }\r
\r
  destroy() {\r
    window.cancelAnimationFrame(this.raf);\r
    window.removeEventListener('resize', this.boundOnResize);\r
    window.removeEventListener('mousewheel', this.boundOnWheel);\r
    window.removeEventListener('wheel', this.boundOnWheel);\r
    window.removeEventListener('mousedown', this.boundOnTouchDown);\r
    window.removeEventListener('mousemove', this.boundOnTouchMove);\r
    window.removeEventListener('mouseup', this.boundOnTouchUp);\r
    window.removeEventListener('touchstart', this.boundOnTouchDown);\r
    window.removeEventListener('touchmove', this.boundOnTouchMove);\r
    window.removeEventListener('touchend', this.boundOnTouchUp);\r
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {\r
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);\r
    }\r
  }\r
}\r
\r
interface CircularGalleryProps {\r
  items?: { image: string; text: string }[];\r
  bend?: number;\r
  textColor?: string;\r
  borderRadius?: number;\r
  font?: string;\r
  scrollSpeed?: number;\r
  scrollEase?: number;\r
}\r
\r
export default function CircularGallery({\r
  items,\r
  bend = 3,\r
  textColor = '#ffffff',\r
  borderRadius = 0.05,\r
  font = 'bold 30px Figtree',\r
  scrollSpeed = 2,\r
  scrollEase = 0.05\r
}: CircularGalleryProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const app = new App(containerRef.current, {\r
      items,\r
      bend,\r
      textColor,\r
      borderRadius,\r
      font,\r
      scrollSpeed,\r
      scrollEase\r
    });\r
    return () => {\r
      app.destroy();\r
    };\r
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);\r
  return <div className="circular-gallery" ref={containerRef} />;\r
}\r
`,H=`import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
type GL = Renderer['gl'];\r
\r
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {\r
  let timeout: number;\r
  return function (this: any, ...args: Parameters<T>) {\r
    window.clearTimeout(timeout);\r
    timeout = window.setTimeout(() => func.apply(this, args), wait);\r
  };\r
}\r
\r
function lerp(p1: number, p2: number, t: number): number {\r
  return p1 + (p2 - p1) * t;\r
}\r
\r
function autoBind(instance: any): void {\r
  const proto = Object.getPrototypeOf(instance);\r
  Object.getOwnPropertyNames(proto).forEach(key => {\r
    if (key !== 'constructor' && typeof instance[key] === 'function') {\r
      instance[key] = instance[key].bind(instance);\r
    }\r
  });\r
}\r
\r
function getFontSize(font: string): number {\r
  const match = font.match(/(\\d+)px/);\r
  return match ? parseInt(match[1], 10) : 30;\r
}\r
\r
function createTextTexture(\r
  gl: GL,\r
  text: string,\r
  font: string = 'bold 30px monospace',\r
  color: string = 'black'\r
): { texture: Texture; width: number; height: number } {\r
  const canvas = document.createElement('canvas');\r
  const context = canvas.getContext('2d');\r
  if (!context) throw new Error('Could not get 2d context');\r
\r
  context.font = font;\r
  const metrics = context.measureText(text);\r
  const textWidth = Math.ceil(metrics.width);\r
  const fontSize = getFontSize(font);\r
  const textHeight = Math.ceil(fontSize * 1.2);\r
\r
  canvas.width = textWidth + 20;\r
  canvas.height = textHeight + 20;\r
\r
  context.font = font;\r
  context.fillStyle = color;\r
  context.textBaseline = 'middle';\r
  context.textAlign = 'center';\r
  context.clearRect(0, 0, canvas.width, canvas.height);\r
  context.fillText(text, canvas.width / 2, canvas.height / 2);\r
\r
  const texture = new Texture(gl, { generateMipmaps: false });\r
  texture.image = canvas;\r
  return { texture, width: canvas.width, height: canvas.height };\r
}\r
\r
interface TitleProps {\r
  gl: GL;\r
  plane: Mesh;\r
  renderer: Renderer;\r
  text: string;\r
  textColor?: string;\r
  font?: string;\r
}\r
\r
class Title {\r
  gl: GL;\r
  plane: Mesh;\r
  renderer: Renderer;\r
  text: string;\r
  textColor: string;\r
  font: string;\r
  mesh!: Mesh;\r
\r
  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }: TitleProps) {\r
    autoBind(this);\r
    this.gl = gl;\r
    this.plane = plane;\r
    this.renderer = renderer;\r
    this.text = text;\r
    this.textColor = textColor;\r
    this.font = font;\r
    this.createMesh();\r
  }\r
\r
  createMesh() {\r
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);\r
    const geometry = new Plane(this.gl);\r
    const program = new Program(this.gl, {\r
      vertex: \`\r
        attribute vec3 position;\r
        attribute vec2 uv;\r
        uniform mat4 modelViewMatrix;\r
        uniform mat4 projectionMatrix;\r
        varying vec2 vUv;\r
        void main() {\r
          vUv = uv;\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
        }\r
      \`,\r
      fragment: \`\r
        precision highp float;\r
        uniform sampler2D tMap;\r
        varying vec2 vUv;\r
        void main() {\r
          vec4 color = texture2D(tMap, vUv);\r
          if (color.a < 0.1) discard;\r
          gl_FragColor = color;\r
        }\r
      \`,\r
      uniforms: { tMap: { value: texture } },\r
      transparent: true\r
    });\r
    this.mesh = new Mesh(this.gl, { geometry, program });\r
    const aspect = width / height;\r
    const textHeightScaled = this.plane.scale.y * 0.15;\r
    const textWidthScaled = textHeightScaled * aspect;\r
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);\r
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;\r
    this.mesh.setParent(this.plane);\r
  }\r
}\r
\r
interface ScreenSize {\r
  width: number;\r
  height: number;\r
}\r
\r
interface Viewport {\r
  width: number;\r
  height: number;\r
}\r
\r
interface MediaProps {\r
  geometry: Plane;\r
  gl: GL;\r
  image: string;\r
  index: number;\r
  length: number;\r
  renderer: Renderer;\r
  scene: Transform;\r
  screen: ScreenSize;\r
  text: string;\r
  viewport: Viewport;\r
  bend: number;\r
  textColor: string;\r
  borderRadius?: number;\r
  font?: string;\r
}\r
\r
class Media {\r
  extra: number = 0;\r
  geometry: Plane;\r
  gl: GL;\r
  image: string;\r
  index: number;\r
  length: number;\r
  renderer: Renderer;\r
  scene: Transform;\r
  screen: ScreenSize;\r
  text: string;\r
  viewport: Viewport;\r
  bend: number;\r
  textColor: string;\r
  borderRadius: number;\r
  font?: string;\r
  program!: Program;\r
  plane!: Mesh;\r
  title!: Title;\r
  scale!: number;\r
  padding!: number;\r
  width!: number;\r
  widthTotal!: number;\r
  x!: number;\r
  speed: number = 0;\r
  isBefore: boolean = false;\r
  isAfter: boolean = false;\r
\r
  constructor({\r
    geometry,\r
    gl,\r
    image,\r
    index,\r
    length,\r
    renderer,\r
    scene,\r
    screen,\r
    text,\r
    viewport,\r
    bend,\r
    textColor,\r
    borderRadius = 0,\r
    font\r
  }: MediaProps) {\r
    this.geometry = geometry;\r
    this.gl = gl;\r
    this.image = image;\r
    this.index = index;\r
    this.length = length;\r
    this.renderer = renderer;\r
    this.scene = scene;\r
    this.screen = screen;\r
    this.text = text;\r
    this.viewport = viewport;\r
    this.bend = bend;\r
    this.textColor = textColor;\r
    this.borderRadius = borderRadius;\r
    this.font = font;\r
    this.createShader();\r
    this.createMesh();\r
    this.createTitle();\r
    this.onResize();\r
  }\r
\r
  createShader() {\r
    const texture = new Texture(this.gl, {\r
      generateMipmaps: true\r
    });\r
    this.program = new Program(this.gl, {\r
      depthTest: false,\r
      depthWrite: false,\r
      vertex: \`\r
        precision highp float;\r
        attribute vec3 position;\r
        attribute vec2 uv;\r
        uniform mat4 modelViewMatrix;\r
        uniform mat4 projectionMatrix;\r
        uniform float uTime;\r
        uniform float uSpeed;\r
        varying vec2 vUv;\r
        void main() {\r
          vUv = uv;\r
          vec3 p = position;\r
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);\r
        }\r
      \`,\r
      fragment: \`\r
        precision highp float;\r
        uniform vec2 uImageSizes;\r
        uniform vec2 uPlaneSizes;\r
        uniform sampler2D tMap;\r
        uniform float uBorderRadius;\r
        varying vec2 vUv;\r
        \r
        float roundedBoxSDF(vec2 p, vec2 b, float r) {\r
          vec2 d = abs(p) - b;\r
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;\r
        }\r
        \r
        void main() {\r
          vec2 ratio = vec2(\r
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),\r
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)\r
          );\r
          vec2 uv = vec2(\r
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\r
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\r
          );\r
          vec4 color = texture2D(tMap, uv);\r
          \r
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);\r
          \r
          // Smooth antialiasing for edges\r
          float edgeSmooth = 0.002;\r
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);\r
          \r
          gl_FragColor = vec4(color.rgb, alpha);\r
        }\r
      \`,\r
      uniforms: {\r
        tMap: { value: texture },\r
        uPlaneSizes: { value: [0, 0] },\r
        uImageSizes: { value: [0, 0] },\r
        uSpeed: { value: 0 },\r
        uTime: { value: 100 * Math.random() },\r
        uBorderRadius: { value: this.borderRadius }\r
      },\r
      transparent: true\r
    });\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.src = this.image;\r
    img.onload = () => {\r
      texture.image = img;\r
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];\r
    };\r
  }\r
\r
  createMesh() {\r
    this.plane = new Mesh(this.gl, {\r
      geometry: this.geometry,\r
      program: this.program\r
    });\r
    this.plane.setParent(this.scene);\r
  }\r
\r
  createTitle() {\r
    this.title = new Title({\r
      gl: this.gl,\r
      plane: this.plane,\r
      renderer: this.renderer,\r
      text: this.text,\r
      textColor: this.textColor,\r
      font: this.font\r
    });\r
  }\r
\r
  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {\r
    this.plane.position.x = this.x - scroll.current - this.extra;\r
\r
    const x = this.plane.position.x;\r
    const H = this.viewport.width / 2;\r
\r
    if (this.bend === 0) {\r
      this.plane.position.y = 0;\r
      this.plane.rotation.z = 0;\r
    } else {\r
      const B_abs = Math.abs(this.bend);\r
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);\r
      const effectiveX = Math.min(Math.abs(x), H);\r
\r
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);\r
      if (this.bend > 0) {\r
        this.plane.position.y = -arc;\r
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);\r
      } else {\r
        this.plane.position.y = arc;\r
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);\r
      }\r
    }\r
\r
    this.speed = scroll.current - scroll.last;\r
    this.program.uniforms.uTime.value += 0.04;\r
    this.program.uniforms.uSpeed.value = this.speed;\r
\r
    const planeOffset = this.plane.scale.x / 2;\r
    const viewportOffset = this.viewport.width / 2;\r
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;\r
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;\r
    if (direction === 'right' && this.isBefore) {\r
      this.extra -= this.widthTotal;\r
      this.isBefore = this.isAfter = false;\r
    }\r
    if (direction === 'left' && this.isAfter) {\r
      this.extra += this.widthTotal;\r
      this.isBefore = this.isAfter = false;\r
    }\r
  }\r
\r
  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {\r
    if (screen) this.screen = screen;\r
    if (viewport) {\r
      this.viewport = viewport;\r
      if (this.plane.program.uniforms.uViewportSizes) {\r
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];\r
      }\r
    }\r
    this.scale = this.screen.height / 1500;\r
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;\r
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;\r
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];\r
    this.padding = 2;\r
    this.width = this.plane.scale.x + this.padding;\r
    this.widthTotal = this.width * this.length;\r
    this.x = this.width * this.index;\r
  }\r
}\r
\r
interface AppConfig {\r
  items?: { image: string; text: string }[];\r
  bend?: number;\r
  textColor?: string;\r
  borderRadius?: number;\r
  font?: string;\r
  scrollSpeed?: number;\r
  scrollEase?: number;\r
}\r
\r
class App {\r
  container: HTMLElement;\r
  scrollSpeed: number;\r
  scroll: {\r
    ease: number;\r
    current: number;\r
    target: number;\r
    last: number;\r
    position?: number;\r
  };\r
  onCheckDebounce: (...args: any[]) => void;\r
  renderer!: Renderer;\r
  gl!: GL;\r
  camera!: Camera;\r
  scene!: Transform;\r
  planeGeometry!: Plane;\r
  medias: Media[] = [];\r
  mediasImages: { image: string; text: string }[] = [];\r
  screen!: { width: number; height: number };\r
  viewport!: { width: number; height: number };\r
  raf: number = 0;\r
\r
  boundOnResize!: () => void;\r
  boundOnWheel!: (e: Event) => void;\r
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;\r
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;\r
  boundOnTouchUp!: () => void;\r
\r
  isDown: boolean = false;\r
  start: number = 0;\r
\r
  constructor(\r
    container: HTMLElement,\r
    {\r
      items,\r
      bend = 1,\r
      textColor = '#ffffff',\r
      borderRadius = 0,\r
      font = 'bold 30px Figtree',\r
      scrollSpeed = 2,\r
      scrollEase = 0.05\r
    }: AppConfig\r
  ) {\r
    document.documentElement.classList.remove('no-js');\r
    this.container = container;\r
    this.scrollSpeed = scrollSpeed;\r
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };\r
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);\r
    this.createRenderer();\r
    this.createCamera();\r
    this.createScene();\r
    this.onResize();\r
    this.createGeometry();\r
    this.createMedias(items, bend, textColor, borderRadius, font);\r
    this.update();\r
    this.addEventListeners();\r
  }\r
\r
  createRenderer() {\r
    this.renderer = new Renderer({\r
      alpha: true,\r
      antialias: true,\r
      dpr: Math.min(window.devicePixelRatio || 1, 2)\r
    });\r
    this.gl = this.renderer.gl;\r
    this.gl.clearColor(0, 0, 0, 0);\r
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);\r
  }\r
\r
  createCamera() {\r
    this.camera = new Camera(this.gl);\r
    this.camera.fov = 45;\r
    this.camera.position.z = 20;\r
  }\r
\r
  createScene() {\r
    this.scene = new Transform();\r
  }\r
\r
  createGeometry() {\r
    this.planeGeometry = new Plane(this.gl, {\r
      heightSegments: 50,\r
      widthSegments: 100\r
    });\r
  }\r
\r
  createMedias(\r
    items: { image: string; text: string }[] | undefined,\r
    bend: number = 1,\r
    textColor: string,\r
    borderRadius: number,\r
    font: string\r
  ) {\r
    const defaultItems = [\r
      {\r
        image: \`https://picsum.photos/seed/1/800/600?grayscale\`,\r
        text: 'Bridge'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/2/800/600?grayscale\`,\r
        text: 'Desk Setup'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/3/800/600?grayscale\`,\r
        text: 'Waterfall'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/4/800/600?grayscale\`,\r
        text: 'Strawberries'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/5/800/600?grayscale\`,\r
        text: 'Deep Diving'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/16/800/600?grayscale\`,\r
        text: 'Train Track'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/17/800/600?grayscale\`,\r
        text: 'Santorini'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/8/800/600?grayscale\`,\r
        text: 'Blurry Lights'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/9/800/600?grayscale\`,\r
        text: 'New York'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/10/800/600?grayscale\`,\r
        text: 'Good Boy'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/21/800/600?grayscale\`,\r
        text: 'Coastline'\r
      },\r
      {\r
        image: \`https://picsum.photos/seed/12/800/600?grayscale\`,\r
        text: 'Palm Trees'\r
      }\r
    ];\r
    const galleryItems = items && items.length ? items : defaultItems;\r
    this.mediasImages = galleryItems.concat(galleryItems);\r
    this.medias = this.mediasImages.map((data, index) => {\r
      return new Media({\r
        geometry: this.planeGeometry,\r
        gl: this.gl,\r
        image: data.image,\r
        index,\r
        length: this.mediasImages.length,\r
        renderer: this.renderer,\r
        scene: this.scene,\r
        screen: this.screen,\r
        text: data.text,\r
        viewport: this.viewport,\r
        bend,\r
        textColor,\r
        borderRadius,\r
        font\r
      });\r
    });\r
  }\r
\r
  onTouchDown(e: MouseEvent | TouchEvent) {\r
    this.isDown = true;\r
    this.scroll.position = this.scroll.current;\r
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;\r
  }\r
\r
  onTouchMove(e: MouseEvent | TouchEvent) {\r
    if (!this.isDown) return;\r
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;\r
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);\r
    this.scroll.target = (this.scroll.position ?? 0) + distance;\r
  }\r
\r
  onTouchUp() {\r
    this.isDown = false;\r
    this.onCheck();\r
  }\r
\r
  onWheel(e: Event) {\r
    const wheelEvent = e as WheelEvent;\r
    const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;\r
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;\r
    this.onCheckDebounce();\r
  }\r
\r
  onCheck() {\r
    if (!this.medias || !this.medias[0]) return;\r
    const width = this.medias[0].width;\r
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);\r
    const item = width * itemIndex;\r
    this.scroll.target = this.scroll.target < 0 ? -item : item;\r
  }\r
\r
  onResize() {\r
    this.screen = {\r
      width: this.container.clientWidth,\r
      height: this.container.clientHeight\r
    };\r
    this.renderer.setSize(this.screen.width, this.screen.height);\r
    this.camera.perspective({\r
      aspect: this.screen.width / this.screen.height\r
    });\r
    const fov = (this.camera.fov * Math.PI) / 180;\r
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;\r
    const width = height * this.camera.aspect;\r
    this.viewport = { width, height };\r
    if (this.medias) {\r
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));\r
    }\r
  }\r
\r
  update() {\r
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);\r
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';\r
    if (this.medias) {\r
      this.medias.forEach(media => media.update(this.scroll, direction));\r
    }\r
    this.renderer.render({ scene: this.scene, camera: this.camera });\r
    this.scroll.last = this.scroll.current;\r
    this.raf = window.requestAnimationFrame(this.update.bind(this));\r
  }\r
\r
  addEventListeners() {\r
    this.boundOnResize = this.onResize.bind(this);\r
    this.boundOnWheel = this.onWheel.bind(this);\r
    this.boundOnTouchDown = this.onTouchDown.bind(this);\r
    this.boundOnTouchMove = this.onTouchMove.bind(this);\r
    this.boundOnTouchUp = this.onTouchUp.bind(this);\r
    window.addEventListener('resize', this.boundOnResize);\r
    window.addEventListener('mousewheel', this.boundOnWheel);\r
    window.addEventListener('wheel', this.boundOnWheel);\r
    window.addEventListener('mousedown', this.boundOnTouchDown);\r
    window.addEventListener('mousemove', this.boundOnTouchMove);\r
    window.addEventListener('mouseup', this.boundOnTouchUp);\r
    window.addEventListener('touchstart', this.boundOnTouchDown);\r
    window.addEventListener('touchmove', this.boundOnTouchMove);\r
    window.addEventListener('touchend', this.boundOnTouchUp);\r
  }\r
\r
  destroy() {\r
    window.cancelAnimationFrame(this.raf);\r
    window.removeEventListener('resize', this.boundOnResize);\r
    window.removeEventListener('mousewheel', this.boundOnWheel);\r
    window.removeEventListener('wheel', this.boundOnWheel);\r
    window.removeEventListener('mousedown', this.boundOnTouchDown);\r
    window.removeEventListener('mousemove', this.boundOnTouchMove);\r
    window.removeEventListener('mouseup', this.boundOnTouchUp);\r
    window.removeEventListener('touchstart', this.boundOnTouchDown);\r
    window.removeEventListener('touchmove', this.boundOnTouchMove);\r
    window.removeEventListener('touchend', this.boundOnTouchUp);\r
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {\r
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);\r
    }\r
  }\r
}\r
\r
interface CircularGalleryProps {\r
  items?: { image: string; text: string }[];\r
  bend?: number;\r
  textColor?: string;\r
  borderRadius?: number;\r
  font?: string;\r
  scrollSpeed?: number;\r
  scrollEase?: number;\r
}\r
\r
export default function CircularGallery({\r
  items,\r
  bend = 3,\r
  textColor = '#ffffff',\r
  borderRadius = 0.05,\r
  font = 'bold 30px Figtree',\r
  scrollSpeed = 2,\r
  scrollEase = 0.05\r
}: CircularGalleryProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const app = new App(containerRef.current, {\r
      items,\r
      bend,\r
      textColor,\r
      borderRadius,\r
      font,\r
      scrollSpeed,\r
      scrollEase\r
    });\r
    return () => {\r
      app.destroy();\r
    };\r
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);\r
  return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;\r
}\r
`,G={dependencies:"ogl",usage:`import CircularGallery from './CircularGallery'

<div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
</div>`,code:U,css:I,tailwind:W,tsCode:k,tsTailwind:H};function j(s,e){let n;return function(...t){clearTimeout(n),n=setTimeout(()=>s.apply(this,t),e)}}function A(s,e,n){return s+(e-s)*n}function F(s){const e=Object.getPrototypeOf(s);Object.getOwnPropertyNames(e).forEach(n=>{n!=="constructor"&&typeof s[n]=="function"&&(s[n]=s[n].bind(s))})}function X(s,e,n="bold 30px monospace",t="black"){const r=document.createElement("canvas"),i=r.getContext("2d");i.font=n;const a=i.measureText(e),o=Math.ceil(a.width),h=Math.ceil(parseInt(n,10)*1.2);r.width=o+20,r.height=h+20,i.font=n,i.fillStyle=t,i.textBaseline="middle",i.textAlign="center",i.clearRect(0,0,r.width,r.height),i.fillText(e,r.width/2,r.height/2);const c=new w(s,{generateMipmaps:!1});return c.image=r,{texture:c,width:r.width,height:r.height}}class V{constructor({gl:e,plane:n,renderer:t,text:r,textColor:i="#545050",font:a="30px sans-serif"}){F(this),this.gl=e,this.plane=n,this.renderer=t,this.text=r,this.textColor=i,this.font=a,this.createMesh()}createMesh(){const{texture:e,width:n,height:t}=X(this.gl,this.text,this.font,this.textColor),r=new f(this.gl),i=new g(this.gl,{vertex:`
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragment:`
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,uniforms:{tMap:{value:e}},transparent:!0});this.mesh=new v(this.gl,{geometry:r,program:i});const a=n/t,o=this.plane.scale.y*.15,h=o*a;this.mesh.scale.set(h,o,1),this.mesh.position.y=-this.plane.scale.y*.5-o*.5-.05,this.mesh.setParent(this.plane)}}class _{constructor({geometry:e,gl:n,image:t,index:r,length:i,renderer:a,scene:o,screen:h,text:c,viewport:u,bend:d,textColor:x,borderRadius:b=0,font:y}){this.extra=0,this.geometry=e,this.gl=n,this.image=t,this.index=r,this.length=i,this.renderer=a,this.scene=o,this.screen=h,this.text=c,this.viewport=u,this.bend=d,this.textColor=x,this.borderRadius=b,this.font=y,this.createShader(),this.createMesh(),this.createTitle(),this.onResize()}createShader(){const e=new w(this.gl,{generateMipmaps:!0});this.program=new g(this.gl,{depthTest:!1,depthWrite:!1,vertex:`
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,fragment:`
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          // Smooth antialiasing for edges
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,uniforms:{tMap:{value:e},uPlaneSizes:{value:[0,0]},uImageSizes:{value:[0,0]},uSpeed:{value:0},uTime:{value:100*Math.random()},uBorderRadius:{value:this.borderRadius}},transparent:!0});const n=new Image;n.crossOrigin="anonymous",n.src=this.image,n.onload=()=>{e.image=n,this.program.uniforms.uImageSizes.value=[n.naturalWidth,n.naturalHeight]}}createMesh(){this.plane=new v(this.gl,{geometry:this.geometry,program:this.program}),this.plane.setParent(this.scene)}createTitle(){this.title=new V({gl:this.gl,plane:this.plane,renderer:this.renderer,text:this.text,textColor:this.textColor,fontFamily:this.font})}update(e,n){this.plane.position.x=this.x-e.current-this.extra;const t=this.plane.position.x,r=this.viewport.width/2;if(this.bend===0)this.plane.position.y=0,this.plane.rotation.z=0;else{const o=Math.abs(this.bend),h=(r*r+o*o)/(2*o),c=Math.min(Math.abs(t),r),u=h-Math.sqrt(h*h-c*c);this.bend>0?(this.plane.position.y=-u,this.plane.rotation.z=-Math.sign(t)*Math.asin(c/h)):(this.plane.position.y=u,this.plane.rotation.z=Math.sign(t)*Math.asin(c/h))}this.speed=e.current-e.last,this.program.uniforms.uTime.value+=.04,this.program.uniforms.uSpeed.value=this.speed;const i=this.plane.scale.x/2,a=this.viewport.width/2;this.isBefore=this.plane.position.x+i<-a,this.isAfter=this.plane.position.x-i>a,n==="right"&&this.isBefore&&(this.extra-=this.widthTotal,this.isBefore=this.isAfter=!1),n==="left"&&this.isAfter&&(this.extra+=this.widthTotal,this.isBefore=this.isAfter=!1)}onResize({screen:e,viewport:n}={}){e&&(this.screen=e),n&&(this.viewport=n,this.plane.program.uniforms.uViewportSizes&&(this.plane.program.uniforms.uViewportSizes.value=[this.viewport.width,this.viewport.height])),this.scale=this.screen.height/1500,this.plane.scale.y=this.viewport.height*(900*this.scale)/this.screen.height,this.plane.scale.x=this.viewport.width*(700*this.scale)/this.screen.width,this.plane.program.uniforms.uPlaneSizes.value=[this.plane.scale.x,this.plane.scale.y],this.padding=2,this.width=this.plane.scale.x+this.padding,this.widthTotal=this.width*this.length,this.x=this.width*this.index}}class N{constructor(e,{items:n,bend:t,textColor:r="#ffffff",borderRadius:i=0,font:a="bold 30px Figtree",scrollSpeed:o=2,scrollEase:h=.05}={}){document.documentElement.classList.remove("no-js"),this.container=e,this.scrollSpeed=o,this.scroll={ease:h,current:0,target:0,last:0},this.onCheckDebounce=j(this.onCheck,200),this.createRenderer(),this.createCamera(),this.createScene(),this.onResize(),this.createGeometry(),this.createMedias(n,t,r,i,a),this.update(),this.addEventListeners()}createRenderer(){this.renderer=new T({alpha:!0,antialias:!0,dpr:Math.min(window.devicePixelRatio||1,2)}),this.gl=this.renderer.gl,this.gl.clearColor(0,0,0,0),this.container.appendChild(this.gl.canvas)}createCamera(){this.camera=new M(this.gl),this.camera.fov=45,this.camera.position.z=20}createScene(){this.scene=new S}createGeometry(){this.planeGeometry=new f(this.gl,{heightSegments:50,widthSegments:100})}createMedias(e,n=1,t,r,i){const a=[{image:"https://picsum.photos/seed/1/800/600?grayscale",text:"Bridge"},{image:"https://picsum.photos/seed/2/800/600?grayscale",text:"Desk Setup"},{image:"https://picsum.photos/seed/3/800/600?grayscale",text:"Waterfall"},{image:"https://picsum.photos/seed/4/800/600?grayscale",text:"Strawberries"},{image:"https://picsum.photos/seed/5/800/600?grayscale",text:"Deep Diving"},{image:"https://picsum.photos/seed/16/800/600?grayscale",text:"Train Track"},{image:"https://picsum.photos/seed/17/800/600?grayscale",text:"Santorini"},{image:"https://picsum.photos/seed/8/800/600?grayscale",text:"Blurry Lights"},{image:"https://picsum.photos/seed/9/800/600?grayscale",text:"New York"},{image:"https://picsum.photos/seed/10/800/600?grayscale",text:"Good Boy"},{image:"https://picsum.photos/seed/21/800/600?grayscale",text:"Coastline"},{image:"https://picsum.photos/seed/12/800/600?grayscale",text:"Palm Trees"}],o=e&&e.length?e:a;this.mediasImages=o.concat(o),this.medias=this.mediasImages.map((h,c)=>new _({geometry:this.planeGeometry,gl:this.gl,image:h.image,index:c,length:this.mediasImages.length,renderer:this.renderer,scene:this.scene,screen:this.screen,text:h.text,viewport:this.viewport,bend:n,textColor:t,borderRadius:r,font:i}))}onTouchDown(e){this.isDown=!0,this.scroll.position=this.scroll.current,this.start=e.touches?e.touches[0].clientX:e.clientX}onTouchMove(e){if(!this.isDown)return;const n=e.touches?e.touches[0].clientX:e.clientX,t=(this.start-n)*(this.scrollSpeed*.025);this.scroll.target=this.scroll.position+t}onTouchUp(){this.isDown=!1,this.onCheck()}onWheel(e){const n=e.deltaY||e.wheelDelta||e.detail;this.scroll.target+=(n>0?this.scrollSpeed:-this.scrollSpeed)*.2,this.onCheckDebounce()}onCheck(){if(!this.medias||!this.medias[0])return;const e=this.medias[0].width,n=Math.round(Math.abs(this.scroll.target)/e),t=e*n;this.scroll.target=this.scroll.target<0?-t:t}onResize(){this.screen={width:this.container.clientWidth,height:this.container.clientHeight},this.renderer.setSize(this.screen.width,this.screen.height),this.camera.perspective({aspect:this.screen.width/this.screen.height});const e=this.camera.fov*Math.PI/180,n=2*Math.tan(e/2)*this.camera.position.z,t=n*this.camera.aspect;this.viewport={width:t,height:n},this.medias&&this.medias.forEach(r=>r.onResize({screen:this.screen,viewport:this.viewport}))}update(){this.scroll.current=A(this.scroll.current,this.scroll.target,this.scroll.ease);const e=this.scroll.current>this.scroll.last?"right":"left";this.medias&&this.medias.forEach(n=>n.update(this.scroll,e)),this.renderer.render({scene:this.scene,camera:this.camera}),this.scroll.last=this.scroll.current,this.raf=window.requestAnimationFrame(this.update.bind(this))}addEventListeners(){this.boundOnResize=this.onResize.bind(this),this.boundOnWheel=this.onWheel.bind(this),this.boundOnTouchDown=this.onTouchDown.bind(this),this.boundOnTouchMove=this.onTouchMove.bind(this),this.boundOnTouchUp=this.onTouchUp.bind(this),window.addEventListener("resize",this.boundOnResize),window.addEventListener("mousewheel",this.boundOnWheel),window.addEventListener("wheel",this.boundOnWheel),window.addEventListener("mousedown",this.boundOnTouchDown),window.addEventListener("mousemove",this.boundOnTouchMove),window.addEventListener("mouseup",this.boundOnTouchUp),window.addEventListener("touchstart",this.boundOnTouchDown),window.addEventListener("touchmove",this.boundOnTouchMove),window.addEventListener("touchend",this.boundOnTouchUp)}destroy(){window.cancelAnimationFrame(this.raf),window.removeEventListener("resize",this.boundOnResize),window.removeEventListener("mousewheel",this.boundOnWheel),window.removeEventListener("wheel",this.boundOnWheel),window.removeEventListener("mousedown",this.boundOnTouchDown),window.removeEventListener("mousemove",this.boundOnTouchMove),window.removeEventListener("mouseup",this.boundOnTouchUp),window.removeEventListener("touchstart",this.boundOnTouchDown),window.removeEventListener("touchmove",this.boundOnTouchMove),window.removeEventListener("touchend",this.boundOnTouchUp),this.renderer&&this.renderer.gl&&this.renderer.gl.canvas.parentNode&&this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)}}function q({items:s,bend:e=3,textColor:n="#ffffff",borderRadius:t=.05,font:r="bold 30px Figtree",scrollSpeed:i=2,scrollEase:a=.05}){const o=m.useRef(null);return m.useEffect(()=>{const h=new N(o.current,{items:s,bend:e,textColor:n,borderRadius:t,font:r,scrollSpeed:i,scrollEase:a});return()=>{h.destroy()}},[s,e,n,t,r,i,a]),l.jsx("div",{className:"circular-gallery",ref:o})}const te=()=>{const[s,e]=m.useState(1),[n,t]=m.useState(.05),[r,i]=m.useState(2),[a,o]=m.useState(.05),[h,c]=B(),u=[{name:"items",type:"Array<{ image: string; text: string }>",default:"undefined",description:"List of items to display in the gallery. Each item should have an image URL and a text label."},{name:"bend",type:"number",default:"3",description:"Determines the curvature of the gallery layout. A negative value bends in one direction, a positive value in the opposite."},{name:"textColor",type:"string",default:'"#ffffff"',description:"Specifies the color of the text labels."},{name:"borderRadius",type:"number",default:"0.05",description:"Sets the border radius for the media items to achieve rounded corners."},{name:"scrollSpeed",type:"number",default:"2",description:"Controls how much the gallery moves per scroll event. Lower values result in slower scrolling, higher values in faster scrolling."},{name:"scrollEase",type:"number",default:"0.05",description:"Controls the smoothness of scroll transitions. Lower values create smoother, more fluid motion, while higher values make it more responsive."}];return l.jsxs(E,{children:[l.jsxs(C,{children:[l.jsx(R,{position:"relative",className:"demo-container",h:500,p:0,overflow:"hidden",children:l.jsx(q,{bend:s,borderRadius:n,scrollSpeed:r,scrollEase:a},h)}),l.jsxs(D,{children:[l.jsx(p,{title:"Bend Level",min:-10,max:10,step:1,value:s,onChange:d=>{e(d),c()}}),l.jsx(p,{title:"Border Radius",min:0,max:.5,step:.01,value:n,onChange:d=>{t(d),c()}}),l.jsx(p,{title:"Scroll Speed",min:.5,max:5,step:.1,value:r,onChange:d=>{i(d),c()}}),l.jsx(p,{title:"Scroll Ease",min:.01,max:.15,step:.01,value:a,onChange:d=>{o(d),c()}})]}),l.jsx(z,{data:u}),l.jsx(P,{dependencyList:["ogl"]})]}),l.jsx(O,{children:l.jsx(L,{codeObject:G})})]})};export{te as default};
