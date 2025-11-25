import{r as l,j as a,R as y,C as E,f as S,P as z,M as T,B as L,T as R}from"./index-wsKSLPNH.js";import{T as b,P as M,a as P,C as W,b as H}from"./PropTable-C4uPWs8h.js";import{C as A}from"./Customize-1m_ZNqR9.js";import{P as w}from"./PreviewSlider-m1G_aiYP.js";import{R as D}from"./RefreshButton-CA3SFRlq.js";import{D as C}from"./Dependencies-BHoMfJUj.js";import{u as F}from"./useForceRerender-BCFU-k0M.js";import{P as O}from"./Plane-T6LxgJGA.js";import{T as j}from"./Texture-BkQWYNP2.js";import"./index-Bpz4cGEA.js";const G=`import { useRef, useEffect } from 'react';\r
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from 'ogl';\r
\r
import './FlyingPosters.css';\r
\r
const vertexShader = \`\r
precision highp float;\r
\r
attribute vec3 position;\r
attribute vec2 uv;\r
attribute vec3 normal;\r
\r
uniform mat4 modelViewMatrix;\r
uniform mat4 projectionMatrix;\r
uniform mat3 normalMatrix;\r
\r
uniform float uPosition;\r
uniform float uTime;\r
uniform float uSpeed;\r
uniform vec3 distortionAxis;\r
uniform vec3 rotationAxis;\r
uniform float uDistortion;\r
\r
varying vec2 vUv;\r
varying vec3 vNormal;\r
\r
float PI = 3.141592653589793238;\r
mat4 rotationMatrix(vec3 axis, float angle) {\r
    axis = normalize(axis);\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    float oc = 1.0 - c;\r
    \r
    return mat4(\r
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\r
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\r
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\r
      0.0,                              0.0,                                0.0,                                1.0\r
    );\r
}\r
\r
vec3 rotate(vec3 v, vec3 axis, float angle) {\r
  mat4 m = rotationMatrix(axis, angle);\r
  return (m * vec4(v, 1.0)).xyz;\r
}\r
\r
float qinticInOut(float t) {\r
  return t < 0.5\r
    ? 16.0 * pow(t, 5.0)\r
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;\r
}\r
\r
void main() {\r
  vUv = uv;\r
  \r
  float norm = 0.5;\r
  vec3 newpos = position;\r
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;\r
  float localprogress = clamp(\r
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),\r
    0.,\r
    2.\r
  );\r
  localprogress = qinticInOut(localprogress) * PI;\r
  newpos = rotate(newpos, rotationAxis, localprogress);\r
\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
uniform vec2 uImageSize;\r
uniform vec2 uPlaneSize;\r
uniform sampler2D tMap;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  vec2 imageSize = uImageSize;\r
  vec2 planeSize = uPlaneSize;\r
\r
  float imageAspect = imageSize.x / imageSize.y;\r
  float planeAspect = planeSize.x / planeSize.y;\r
  vec2 scale = vec2(1.0, 1.0);\r
\r
  if (planeAspect > imageAspect) {\r
      scale.x = imageAspect / planeAspect;\r
  } else {\r
      scale.y = planeAspect / imageAspect;\r
  }\r
\r
  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;\r
\r
  gl_FragColor = texture2D(tMap, uv);\r
}\r
\`;\r
\r
function AutoBind(self, { include, exclude } = {}) {\r
  const getAllProperties = object => {\r
    const properties = new Set();\r
    do {\r
      for (const key of Reflect.ownKeys(object)) {\r
        properties.add([object, key]);\r
      }\r
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);\r
    return properties;\r
  };\r
\r
  const filter = key => {\r
    const match = pattern => (typeof pattern === 'string' ? key === pattern : pattern.test(key));\r
\r
    if (include) return include.some(match);\r
    if (exclude) return !exclude.some(match);\r
    return true;\r
  };\r
\r
  for (const [object, key] of getAllProperties(self.constructor.prototype)) {\r
    if (key === 'constructor' || !filter(key)) continue;\r
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);\r
    if (descriptor && typeof descriptor.value === 'function') {\r
      self[key] = self[key].bind(self);\r
    }\r
  }\r
  return self;\r
}\r
\r
function lerp(p1, p2, t) {\r
  return p1 + (p2 - p1) * t;\r
}\r
\r
function map(num, min1, max1, min2, max2, round = false) {\r
  const num1 = (num - min1) / (max1 - min1);\r
  const num2 = num1 * (max2 - min2) + min2;\r
  return round ? Math.round(num2) : num2;\r
}\r
\r
class Media {\r
  constructor({ gl, geometry, scene, screen, viewport, image, length, index, planeWidth, planeHeight, distortion }) {\r
    this.extra = 0;\r
    this.gl = gl;\r
    this.geometry = geometry;\r
    this.scene = scene;\r
    this.screen = screen;\r
    this.viewport = viewport;\r
    this.image = image;\r
    this.length = length;\r
    this.index = index;\r
    this.planeWidth = planeWidth;\r
    this.planeHeight = planeHeight;\r
    this.distortion = distortion;\r
\r
    this.createShader();\r
    this.createMesh();\r
    this.onResize();\r
  }\r
\r
  createShader() {\r
    const texture = new Texture(this.gl, {\r
      generateMipmaps: false\r
    });\r
\r
    this.program = new Program(this.gl, {\r
      depthTest: false,\r
      depthWrite: false,\r
      fragment: fragmentShader,\r
      vertex: vertexShader,\r
      uniforms: {\r
        tMap: { value: texture },\r
        uPosition: { value: 0 },\r
        uPlaneSize: { value: [0, 0] },\r
        uImageSize: { value: [0, 0] },\r
        uSpeed: { value: 0 },\r
        rotationAxis: { value: [0, 1, 0] },\r
        distortionAxis: { value: [1, 1, 0] },\r
        uDistortion: { value: this.distortion },\r
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },\r
        uTime: { value: 0 }\r
      },\r
      cullFace: false\r
    });\r
\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.src = this.image;\r
    img.onload = () => {\r
      texture.image = img;\r
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];\r
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
  setScale() {\r
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;\r
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;\r
\r
    this.plane.position.x = 0;\r
    this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];\r
  }\r
\r
  onResize({ screen, viewport } = {}) {\r
    if (screen) this.screen = screen;\r
    if (viewport) {\r
      this.viewport = viewport;\r
      this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height];\r
    }\r
    this.setScale();\r
\r
    this.padding = 5;\r
    this.height = this.plane.scale.y + this.padding;\r
    this.heightTotal = this.height * this.length;\r
\r
    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;\r
  }\r
\r
  update(scroll) {\r
    this.plane.position.y = this.y - scroll.current - this.extra;\r
\r
    const position = map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);\r
\r
    this.program.uniforms.uPosition.value = position;\r
    this.program.uniforms.uTime.value += 0.04;\r
    this.program.uniforms.uSpeed.value = scroll.current;\r
\r
    const planeHeight = this.plane.scale.y;\r
    const viewportHeight = this.viewport.height;\r
\r
    const topEdge = this.plane.position.y + planeHeight / 2;\r
    const bottomEdge = this.plane.position.y - planeHeight / 2;\r
\r
    if (topEdge < -viewportHeight / 2) {\r
      this.extra -= this.heightTotal;\r
    } else if (bottomEdge > viewportHeight / 2) {\r
      this.extra += this.heightTotal;\r
    }\r
  }\r
}\r
\r
class Canvas {\r
  constructor({ container, canvas, items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ }) {\r
    this.container = container;\r
    this.canvas = canvas;\r
    this.items = items;\r
    this.planeWidth = planeWidth;\r
    this.planeHeight = planeHeight;\r
    this.distortion = distortion;\r
    this.scroll = {\r
      ease: scrollEase,\r
      current: 0,\r
      target: 0,\r
      last: 0\r
    };\r
    this.cameraFov = cameraFov;\r
    this.cameraZ = cameraZ;\r
\r
    AutoBind(this);\r
\r
    this.createRenderer();\r
    this.createCamera();\r
    this.createScene();\r
    this.onResize();\r
\r
    this.createGeometry();\r
    this.createMedias();\r
    this.update();\r
    this.addEventListeners();\r
    this.createPreloader();\r
  }\r
\r
  createRenderer() {\r
    this.renderer = new Renderer({\r
      canvas: this.canvas,\r
      alpha: true,\r
      antialias: true,\r
      dpr: Math.min(window.devicePixelRatio, 2)\r
    });\r
    this.gl = this.renderer.gl;\r
  }\r
\r
  createCamera() {\r
    this.camera = new Camera(this.gl);\r
    this.camera.fov = this.cameraFov;\r
    this.camera.position.z = this.cameraZ;\r
  }\r
\r
  createScene() {\r
    this.scene = new Transform();\r
  }\r
\r
  createGeometry() {\r
    this.planeGeometry = new Plane(this.gl, {\r
      heightSegments: 1,\r
      widthSegments: 100\r
    });\r
  }\r
\r
  createMedias() {\r
    this.medias = this.items.map((image, index) => {\r
      return new Media({\r
        gl: this.gl,\r
        geometry: this.planeGeometry,\r
        scene: this.scene,\r
        screen: this.screen,\r
        viewport: this.viewport,\r
        image,\r
        length: this.items.length,\r
        index,\r
        planeWidth: this.planeWidth,\r
        planeHeight: this.planeHeight,\r
        distortion: this.distortion\r
      });\r
    });\r
  }\r
\r
  createPreloader() {\r
    this.loaded = 0;\r
    if (!this.items.length) return;\r
\r
    this.items.forEach(src => {\r
      const image = new Image();\r
      image.crossOrigin = 'anonymous';\r
      image.src = src;\r
      image.onload = () => {\r
        this.loaded += 1;\r
        if (this.loaded === this.items.length) {\r
          document.documentElement.classList.remove('loading');\r
          document.documentElement.classList.add('loaded');\r
        }\r
      };\r
    });\r
  }\r
\r
  onResize() {\r
    const rect = this.container.getBoundingClientRect();\r
    this.screen = {\r
      width: rect.width,\r
      height: rect.height\r
    };\r
\r
    this.renderer.setSize(this.screen.width, this.screen.height);\r
\r
    this.camera.perspective({\r
      aspect: this.gl.canvas.width / this.gl.canvas.height\r
    });\r
\r
    const fov = (this.camera.fov * Math.PI) / 180;\r
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;\r
    const width = height * this.camera.aspect;\r
\r
    this.viewport = { height, width };\r
\r
    if (this.medias) {\r
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));\r
    }\r
  }\r
\r
  onTouchDown(e) {\r
    this.isDown = true;\r
    this.scroll.position = this.scroll.current;\r
    this.start = e.touches ? e.touches[0].clientY : e.clientY;\r
  }\r
\r
  onTouchMove(e) {\r
    if (!this.isDown) return;\r
    const y = e.touches ? e.touches[0].clientY : e.clientY;\r
    const distance = (this.start - y) * 0.1;\r
    this.scroll.target = this.scroll.position + distance;\r
  }\r
\r
  onTouchUp() {\r
    this.isDown = false;\r
  }\r
\r
  onWheel(e) {\r
    const speed = e.deltaY;\r
    this.scroll.target += speed * 0.005;\r
  }\r
\r
  update() {\r
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);\r
\r
    if (this.medias) {\r
      this.medias.forEach(media => media.update(this.scroll));\r
    }\r
    this.renderer.render({ scene: this.scene, camera: this.camera });\r
    this.scroll.last = this.scroll.current;\r
    requestAnimationFrame(this.update);\r
  }\r
\r
  addEventListeners() {\r
    window.addEventListener('resize', this.onResize);\r
    window.addEventListener('wheel', this.onWheel);\r
    window.addEventListener('mousewheel', this.onWheel);\r
\r
    window.addEventListener('mousedown', this.onTouchDown);\r
    window.addEventListener('mousemove', this.onTouchMove);\r
    window.addEventListener('mouseup', this.onTouchUp);\r
\r
    window.addEventListener('touchstart', this.onTouchDown);\r
    window.addEventListener('touchmove', this.onTouchMove);\r
    window.addEventListener('touchend', this.onTouchUp);\r
  }\r
\r
  destroy() {\r
    window.removeEventListener('resize', this.onResize);\r
    window.removeEventListener('wheel', this.onWheel);\r
    window.removeEventListener('mousewheel', this.onWheel);\r
\r
    window.removeEventListener('mousedown', this.onTouchDown);\r
    window.removeEventListener('mousemove', this.onTouchMove);\r
    window.removeEventListener('mouseup', this.onTouchUp);\r
\r
    window.removeEventListener('touchstart', this.onTouchDown);\r
    window.removeEventListener('touchmove', this.onTouchMove);\r
    window.removeEventListener('touchend', this.onTouchUp);\r
  }\r
}\r
\r
export default function FlyingPosters({\r
  items = [],\r
  planeWidth = 320,\r
  planeHeight = 320,\r
  distortion = 3,\r
  scrollEase = 0.01,\r
  cameraFov = 45,\r
  cameraZ = 20,\r
  className,\r
  ...props\r
}) {\r
  const containerRef = useRef(null);\r
  const canvasRef = useRef(null);\r
  const instanceRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    instanceRef.current = new Canvas({\r
      container: containerRef.current,\r
      canvas: canvasRef.current,\r
      items,\r
      planeWidth,\r
      planeHeight,\r
      distortion,\r
      scrollEase,\r
      cameraFov,\r
      cameraZ\r
    });\r
\r
    return () => {\r
      if (instanceRef.current) {\r
        instanceRef.current.destroy();\r
        instanceRef.current = null;\r
      }\r
    };\r
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);\r
\r
  useEffect(() => {\r
    if (!canvasRef.current) return;\r
\r
    const canvasEl = canvasRef.current;\r
\r
    const handleWheel = e => {\r
      e.preventDefault();\r
      if (instanceRef.current) {\r
        instanceRef.current.onWheel(e);\r
      }\r
    };\r
\r
    const handleTouchMove = e => {\r
      e.preventDefault();\r
    };\r
\r
    canvasEl.addEventListener('wheel', handleWheel, { passive: false });\r
    canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });\r
\r
    return () => {\r
      canvasEl.removeEventListener('wheel', handleWheel);\r
      canvasEl.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, []);\r
\r
  return (\r
    <div ref={containerRef} className={\`posters-container \${className}\`} {...props}>\r
      <canvas ref={canvasRef} className="posters-canvas" />\r
    </div>\r
  );\r
}\r
`,I=`.posters-container {\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  position: relative;\r
  z-index: 2;\r
}\r
\r
.posters-canvas {\r
  display: block;\r
  width: 100%;\r
  height: 100%;\r
}\r
`,k=`import { useRef, useEffect } from 'react';\r
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from 'ogl';\r
\r
const vertexShader = \`\r
precision highp float;\r
\r
attribute vec3 position;\r
attribute vec2 uv;\r
attribute vec3 normal;\r
\r
uniform mat4 modelViewMatrix;\r
uniform mat4 projectionMatrix;\r
uniform mat3 normalMatrix;\r
\r
uniform float uPosition;\r
uniform float uTime;\r
uniform float uSpeed;\r
uniform vec3 distortionAxis;\r
uniform vec3 rotationAxis;\r
uniform float uDistortion;\r
\r
varying vec2 vUv;\r
varying vec3 vNormal;\r
\r
float PI = 3.141592653589793238;\r
mat4 rotationMatrix(vec3 axis, float angle) {\r
    axis = normalize(axis);\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    float oc = 1.0 - c;\r
    \r
    return mat4(\r
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\r
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\r
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\r
      0.0,                              0.0,                                0.0,                                1.0\r
    );\r
}\r
\r
vec3 rotate(vec3 v, vec3 axis, float angle) {\r
  mat4 m = rotationMatrix(axis, angle);\r
  return (m * vec4(v, 1.0)).xyz;\r
}\r
\r
float qinticInOut(float t) {\r
  return t < 0.5\r
    ? 16.0 * pow(t, 5.0)\r
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;\r
}\r
\r
void main() {\r
  vUv = uv;\r
  \r
  float norm = 0.5;\r
  vec3 newpos = position;\r
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;\r
  float localprogress = clamp(\r
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),\r
    0.,\r
    2.\r
  );\r
  localprogress = qinticInOut(localprogress) * PI;\r
  newpos = rotate(newpos, rotationAxis, localprogress);\r
\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
uniform vec2 uImageSize;\r
uniform vec2 uPlaneSize;\r
uniform sampler2D tMap;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  vec2 imageSize = uImageSize;\r
  vec2 planeSize = uPlaneSize;\r
\r
  float imageAspect = imageSize.x / imageSize.y;\r
  float planeAspect = planeSize.x / planeSize.y;\r
  vec2 scale = vec2(1.0, 1.0);\r
\r
  if (planeAspect > imageAspect) {\r
      scale.x = imageAspect / planeAspect;\r
  } else {\r
      scale.y = planeAspect / imageAspect;\r
  }\r
\r
  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;\r
\r
  gl_FragColor = texture2D(tMap, uv);\r
}\r
\`;\r
\r
function AutoBind(self, { include, exclude } = {}) {\r
  const getAllProperties = object => {\r
    const properties = new Set();\r
    do {\r
      for (const key of Reflect.ownKeys(object)) {\r
        properties.add([object, key]);\r
      }\r
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);\r
    return properties;\r
  };\r
\r
  const filter = key => {\r
    const match = pattern => (typeof pattern === 'string' ? key === pattern : pattern.test(key));\r
\r
    if (include) return include.some(match);\r
    if (exclude) return !exclude.some(match);\r
    return true;\r
  };\r
\r
  for (const [object, key] of getAllProperties(self.constructor.prototype)) {\r
    if (key === 'constructor' || !filter(key)) continue;\r
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);\r
    if (descriptor && typeof descriptor.value === 'function') {\r
      self[key] = self[key].bind(self);\r
    }\r
  }\r
  return self;\r
}\r
\r
function lerp(p1, p2, t) {\r
  return p1 + (p2 - p1) * t;\r
}\r
\r
function map(num, min1, max1, min2, max2, round = false) {\r
  const num1 = (num - min1) / (max1 - min1);\r
  const num2 = num1 * (max2 - min2) + min2;\r
  return round ? Math.round(num2) : num2;\r
}\r
\r
class Media {\r
  constructor({ gl, geometry, scene, screen, viewport, image, length, index, planeWidth, planeHeight, distortion }) {\r
    this.extra = 0;\r
    this.gl = gl;\r
    this.geometry = geometry;\r
    this.scene = scene;\r
    this.screen = screen;\r
    this.viewport = viewport;\r
    this.image = image;\r
    this.length = length;\r
    this.index = index;\r
    this.planeWidth = planeWidth;\r
    this.planeHeight = planeHeight;\r
    this.distortion = distortion;\r
\r
    this.createShader();\r
    this.createMesh();\r
    this.onResize();\r
  }\r
\r
  createShader() {\r
    const texture = new Texture(this.gl, {\r
      generateMipmaps: false\r
    });\r
\r
    this.program = new Program(this.gl, {\r
      depthTest: false,\r
      depthWrite: false,\r
      fragment: fragmentShader,\r
      vertex: vertexShader,\r
      uniforms: {\r
        tMap: { value: texture },\r
        uPosition: { value: 0 },\r
        uPlaneSize: { value: [0, 0] },\r
        uImageSize: { value: [0, 0] },\r
        uSpeed: { value: 0 },\r
        rotationAxis: { value: [0, 1, 0] },\r
        distortionAxis: { value: [1, 1, 0] },\r
        uDistortion: { value: this.distortion },\r
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },\r
        uTime: { value: 0 }\r
      },\r
      cullFace: false\r
    });\r
\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.src = this.image;\r
    img.onload = () => {\r
      texture.image = img;\r
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];\r
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
  setScale() {\r
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;\r
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;\r
\r
    this.plane.position.x = 0;\r
    this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];\r
  }\r
\r
  onResize({ screen, viewport } = {}) {\r
    if (screen) this.screen = screen;\r
    if (viewport) {\r
      this.viewport = viewport;\r
      this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height];\r
    }\r
    this.setScale();\r
\r
    this.padding = 5;\r
    this.height = this.plane.scale.y + this.padding;\r
    this.heightTotal = this.height * this.length;\r
\r
    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;\r
  }\r
\r
  update(scroll) {\r
    this.plane.position.y = this.y - scroll.current - this.extra;\r
\r
    const position = map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);\r
\r
    this.program.uniforms.uPosition.value = position;\r
    this.program.uniforms.uTime.value += 0.04;\r
    this.program.uniforms.uSpeed.value = scroll.current;\r
\r
    const planeHeight = this.plane.scale.y;\r
    const viewportHeight = this.viewport.height;\r
\r
    const topEdge = this.plane.position.y + planeHeight / 2;\r
    const bottomEdge = this.plane.position.y - planeHeight / 2;\r
\r
    if (topEdge < -viewportHeight / 2) {\r
      this.extra -= this.heightTotal;\r
    } else if (bottomEdge > viewportHeight / 2) {\r
      this.extra += this.heightTotal;\r
    }\r
  }\r
}\r
\r
class Canvas {\r
  constructor({ container, canvas, items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ }) {\r
    this.container = container;\r
    this.canvas = canvas;\r
    this.items = items;\r
    this.planeWidth = planeWidth;\r
    this.planeHeight = planeHeight;\r
    this.distortion = distortion;\r
    this.scroll = {\r
      ease: scrollEase,\r
      current: 0,\r
      target: 0,\r
      last: 0\r
    };\r
    this.cameraFov = cameraFov;\r
    this.cameraZ = cameraZ;\r
\r
    AutoBind(this);\r
\r
    this.createRenderer();\r
    this.createCamera();\r
    this.createScene();\r
    this.onResize();\r
\r
    this.createGeometry();\r
    this.createMedias();\r
    this.update();\r
    this.addEventListeners();\r
    this.createPreloader();\r
  }\r
\r
  createRenderer() {\r
    this.renderer = new Renderer({\r
      canvas: this.canvas,\r
      alpha: true,\r
      antialias: true,\r
      dpr: Math.min(window.devicePixelRatio, 2)\r
    });\r
    this.gl = this.renderer.gl;\r
  }\r
\r
  createCamera() {\r
    this.camera = new Camera(this.gl);\r
    this.camera.fov = this.cameraFov;\r
    this.camera.position.z = this.cameraZ;\r
  }\r
\r
  createScene() {\r
    this.scene = new Transform();\r
  }\r
\r
  createGeometry() {\r
    this.planeGeometry = new Plane(this.gl, {\r
      heightSegments: 1,\r
      widthSegments: 100\r
    });\r
  }\r
\r
  createMedias() {\r
    this.medias = this.items.map((image, index) => {\r
      return new Media({\r
        gl: this.gl,\r
        geometry: this.planeGeometry,\r
        scene: this.scene,\r
        screen: this.screen,\r
        viewport: this.viewport,\r
        image,\r
        length: this.items.length,\r
        index,\r
        planeWidth: this.planeWidth,\r
        planeHeight: this.planeHeight,\r
        distortion: this.distortion\r
      });\r
    });\r
  }\r
\r
  createPreloader() {\r
    this.loaded = 0;\r
    if (!this.items.length) return;\r
\r
    this.items.forEach(src => {\r
      const image = new Image();\r
      image.crossOrigin = 'anonymous';\r
      image.src = src;\r
      image.onload = () => {\r
        this.loaded += 1;\r
        if (this.loaded === this.items.length) {\r
          document.documentElement.classList.remove('loading');\r
          document.documentElement.classList.add('loaded');\r
        }\r
      };\r
    });\r
  }\r
\r
  onResize() {\r
    const rect = this.container.getBoundingClientRect();\r
    this.screen = {\r
      width: rect.width,\r
      height: rect.height\r
    };\r
\r
    this.renderer.setSize(this.screen.width, this.screen.height);\r
\r
    this.camera.perspective({\r
      aspect: this.gl.canvas.width / this.gl.canvas.height\r
    });\r
\r
    const fov = (this.camera.fov * Math.PI) / 180;\r
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;\r
    const width = height * this.camera.aspect;\r
\r
    this.viewport = { height, width };\r
\r
    if (this.medias) {\r
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));\r
    }\r
  }\r
\r
  onTouchDown(e) {\r
    this.isDown = true;\r
    this.scroll.position = this.scroll.current;\r
    this.start = e.touches ? e.touches[0].clientY : e.clientY;\r
  }\r
\r
  onTouchMove(e) {\r
    if (!this.isDown) return;\r
    const y = e.touches ? e.touches[0].clientY : e.clientY;\r
    const distance = (this.start - y) * 0.1;\r
    this.scroll.target = this.scroll.position + distance;\r
  }\r
\r
  onTouchUp() {\r
    this.isDown = false;\r
  }\r
\r
  onWheel(e) {\r
    const speed = e.deltaY;\r
    this.scroll.target += speed * 0.005;\r
  }\r
\r
  update() {\r
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);\r
\r
    if (this.medias) {\r
      this.medias.forEach(media => media.update(this.scroll));\r
    }\r
    this.renderer.render({ scene: this.scene, camera: this.camera });\r
    this.scroll.last = this.scroll.current;\r
    requestAnimationFrame(this.update);\r
  }\r
\r
  addEventListeners() {\r
    window.addEventListener('resize', this.onResize);\r
    window.addEventListener('wheel', this.onWheel);\r
    window.addEventListener('mousewheel', this.onWheel);\r
\r
    window.addEventListener('mousedown', this.onTouchDown);\r
    window.addEventListener('mousemove', this.onTouchMove);\r
    window.addEventListener('mouseup', this.onTouchUp);\r
\r
    window.addEventListener('touchstart', this.onTouchDown);\r
    window.addEventListener('touchmove', this.onTouchMove);\r
    window.addEventListener('touchend', this.onTouchUp);\r
  }\r
\r
  destroy() {\r
    window.removeEventListener('resize', this.onResize);\r
    window.removeEventListener('wheel', this.onWheel);\r
    window.removeEventListener('mousewheel', this.onWheel);\r
\r
    window.removeEventListener('mousedown', this.onTouchDown);\r
    window.removeEventListener('mousemove', this.onTouchMove);\r
    window.removeEventListener('mouseup', this.onTouchUp);\r
\r
    window.removeEventListener('touchstart', this.onTouchDown);\r
    window.removeEventListener('touchmove', this.onTouchMove);\r
    window.removeEventListener('touchend', this.onTouchUp);\r
  }\r
}\r
\r
export default function FlyingPosters({\r
  items = [],\r
  planeWidth = 320,\r
  planeHeight = 320,\r
  distortion = 3,\r
  scrollEase = 0.1,\r
  cameraFov = 45,\r
  cameraZ = 20,\r
  className,\r
  ...props\r
}) {\r
  const containerRef = useRef(null);\r
  const canvasRef = useRef(null);\r
  const instanceRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    instanceRef.current = new Canvas({\r
      container: containerRef.current,\r
      canvas: canvasRef.current,\r
      items,\r
      planeWidth,\r
      planeHeight,\r
      distortion,\r
      scrollEase,\r
      cameraFov,\r
      cameraZ\r
    });\r
\r
    return () => {\r
      if (instanceRef.current) {\r
        instanceRef.current.destroy();\r
        instanceRef.current = null;\r
      }\r
    };\r
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);\r
\r
  useEffect(() => {\r
    if (!canvasRef.current) return;\r
\r
    const canvasEl = canvasRef.current;\r
\r
    const handleWheel = e => {\r
      e.preventDefault();\r
      if (instanceRef.current) {\r
        instanceRef.current.onWheel(e);\r
      }\r
    };\r
\r
    const handleTouchMove = e => {\r
      e.preventDefault();\r
    };\r
\r
    canvasEl.addEventListener('wheel', handleWheel, { passive: false });\r
    canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });\r
\r
    return () => {\r
      canvasEl.removeEventListener('wheel', handleWheel);\r
      canvasEl.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, []);\r
\r
  return (\r
    <div ref={containerRef} className={\`w-full h-full overflow-hidden relative z-2 \${className}\`} {...props}>\r
      <canvas ref={canvasRef} className="block w-full h-full" />\r
    </div>\r
  );\r
}\r
`,U=`import { useRef, useEffect } from 'react';\r
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture, type OGLRenderingContext } from 'ogl';\r
\r
import './FlyingPosters.css';\r
\r
type GL = OGLRenderingContext;\r
type OGLProgram = Program;\r
type OGLMesh = Mesh;\r
type OGLTransform = Transform;\r
type OGLPlane = Plane;\r
\r
interface ScreenSize {\r
  width: number;\r
  height: number;\r
}\r
\r
interface ViewportSize {\r
  width: number;\r
  height: number;\r
}\r
\r
interface ScrollState {\r
  position?: number;\r
  ease: number;\r
  current: number;\r
  target: number;\r
  last: number;\r
}\r
\r
interface AutoBindOptions {\r
  include?: Array<string | RegExp>;\r
  exclude?: Array<string | RegExp>;\r
}\r
\r
interface MediaParams {\r
  gl: GL;\r
  geometry: OGLPlane;\r
  scene: OGLTransform;\r
  screen: ScreenSize;\r
  viewport: ViewportSize;\r
  image: string;\r
  length: number;\r
  index: number;\r
  planeWidth: number;\r
  planeHeight: number;\r
  distortion: number;\r
}\r
\r
interface CanvasParams {\r
  container: HTMLElement;\r
  canvas: HTMLCanvasElement;\r
  items: string[];\r
  planeWidth: number;\r
  planeHeight: number;\r
  distortion: number;\r
  scrollEase: number;\r
  cameraFov: number;\r
  cameraZ: number;\r
}\r
\r
const vertexShader = \`\r
precision highp float;\r
\r
attribute vec3 position;\r
attribute vec2 uv;\r
attribute vec3 normal;\r
\r
uniform mat4 modelViewMatrix;\r
uniform mat4 projectionMatrix;\r
uniform mat3 normalMatrix;\r
\r
uniform float uPosition;\r
uniform float uTime;\r
uniform float uSpeed;\r
uniform vec3 distortionAxis;\r
uniform vec3 rotationAxis;\r
uniform float uDistortion;\r
\r
varying vec2 vUv;\r
varying vec3 vNormal;\r
\r
float PI = 3.141592653589793238;\r
mat4 rotationMatrix(vec3 axis, float angle) {\r
    axis = normalize(axis);\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    float oc = 1.0 - c;\r
    \r
    return mat4(\r
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\r
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\r
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\r
      0.0,                              0.0,                                0.0,                                1.0\r
    );\r
}\r
\r
vec3 rotate(vec3 v, vec3 axis, float angle) {\r
  mat4 m = rotationMatrix(axis, angle);\r
  return (m * vec4(v, 1.0)).xyz;\r
}\r
\r
float qinticInOut(float t) {\r
  return t < 0.5\r
    ? 16.0 * pow(t, 5.0)\r
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;\r
}\r
\r
void main() {\r
  vUv = uv;\r
  \r
  float norm = 0.5;\r
  vec3 newpos = position;\r
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;\r
  float localprogress = clamp(\r
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),\r
    0.,\r
    2.\r
  );\r
  localprogress = qinticInOut(localprogress) * PI;\r
  newpos = rotate(newpos, rotationAxis, localprogress);\r
\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
uniform vec2 uImageSize;\r
uniform vec2 uPlaneSize;\r
uniform sampler2D tMap;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  vec2 imageSize = uImageSize;\r
  vec2 planeSize = uPlaneSize;\r
\r
  float imageAspect = imageSize.x / imageSize.y;\r
  float planeAspect = planeSize.x / planeSize.y;\r
  vec2 scale = vec2(1.0, 1.0);\r
\r
  if (planeAspect > imageAspect) {\r
      scale.x = imageAspect / planeAspect;\r
  } else {\r
      scale.y = planeAspect / imageAspect;\r
  }\r
\r
  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;\r
\r
  gl_FragColor = texture2D(tMap, uv);\r
}\r
\`;\r
\r
function AutoBind(self: any, { include, exclude }: AutoBindOptions = {}) {\r
  const getAllProperties = (object: any): Set<[any, string | symbol]> => {\r
    const properties = new Set<[any, string | symbol]>();\r
    do {\r
      for (const key of Reflect.ownKeys(object)) {\r
        properties.add([object, key]);\r
      }\r
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);\r
    return properties;\r
  };\r
\r
  const filter = (key: string | symbol) => {\r
    const match = (pattern: string | RegExp) =>\r
      typeof pattern === 'string' ? key === pattern : (pattern as RegExp).test(key.toString());\r
\r
    if (include) return include.some(match);\r
    if (exclude) return !exclude.some(match);\r
    return true;\r
  };\r
\r
  for (const [object, key] of getAllProperties(self.constructor.prototype)) {\r
    if (key === 'constructor' || !filter(key)) continue;\r
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);\r
    if (descriptor && typeof descriptor.value === 'function') {\r
      self[key] = self[key].bind(self);\r
    }\r
  }\r
  return self;\r
}\r
\r
function lerp(p1: number, p2: number, t: number): number {\r
  return p1 + (p2 - p1) * t;\r
}\r
\r
function map(num: number, min1: number, max1: number, min2: number, max2: number, round = false): number {\r
  const num1 = (num - min1) / (max1 - min1);\r
  const num2 = num1 * (max2 - min2) + min2;\r
  return round ? Math.round(num2) : num2;\r
}\r
\r
class Media {\r
  gl: GL;\r
  geometry: OGLPlane;\r
  scene: OGLTransform;\r
  screen: ScreenSize;\r
  viewport: ViewportSize;\r
  image: string;\r
  length: number;\r
  index: number;\r
  planeWidth: number;\r
  planeHeight: number;\r
  distortion: number;\r
\r
  program!: OGLProgram;\r
  plane!: OGLMesh;\r
  extra = 0;\r
  padding = 0;\r
  height = 0;\r
  heightTotal = 0;\r
  y = 0;\r
\r
  constructor({\r
    gl,\r
    geometry,\r
    scene,\r
    screen,\r
    viewport,\r
    image,\r
    length,\r
    index,\r
    planeWidth,\r
    planeHeight,\r
    distortion\r
  }: MediaParams) {\r
    this.gl = gl;\r
    this.geometry = geometry;\r
    this.scene = scene;\r
    this.screen = screen;\r
    this.viewport = viewport;\r
    this.image = image;\r
    this.length = length;\r
    this.index = index;\r
    this.planeWidth = planeWidth;\r
    this.planeHeight = planeHeight;\r
    this.distortion = distortion;\r
\r
    this.createShader();\r
    this.createMesh();\r
    this.onResize();\r
  }\r
\r
  createShader() {\r
    const texture = new Texture(this.gl, { generateMipmaps: false });\r
    this.program = new Program(this.gl, {\r
      depthTest: false,\r
      depthWrite: false,\r
      fragment: fragmentShader,\r
      vertex: vertexShader,\r
      uniforms: {\r
        tMap: { value: texture },\r
        uPosition: { value: 0 },\r
        uPlaneSize: { value: [0, 0] },\r
        uImageSize: { value: [0, 0] },\r
        uSpeed: { value: 0 },\r
        rotationAxis: { value: [0, 1, 0] },\r
        distortionAxis: { value: [1, 1, 0] },\r
        uDistortion: { value: this.distortion },\r
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },\r
        uTime: { value: 0 }\r
      },\r
      cullFace: false\r
    });\r
\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.src = this.image;\r
    img.onload = () => {\r
      texture.image = img;\r
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];\r
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
  setScale() {\r
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;\r
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;\r
    this.plane.position.x = 0;\r
    this.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];\r
  }\r
\r
  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: ViewportSize } = {}) {\r
    if (screen) this.screen = screen;\r
    if (viewport) {\r
      this.viewport = viewport;\r
      this.program.uniforms.uViewportSize.value = [viewport.width, viewport.height];\r
    }\r
    this.setScale();\r
\r
    this.padding = 5;\r
    this.height = this.plane.scale.y + this.padding;\r
    this.heightTotal = this.height * this.length;\r
    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;\r
  }\r
\r
  update(scroll: ScrollState) {\r
    this.plane.position.y = this.y - scroll.current - this.extra;\r
    const position = map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);\r
\r
    this.program.uniforms.uPosition.value = position;\r
    this.program.uniforms.uTime.value += 0.04;\r
    this.program.uniforms.uSpeed.value = scroll.current;\r
\r
    const planeHeight = this.plane.scale.y;\r
    const viewportHeight = this.viewport.height;\r
    const topEdge = this.plane.position.y + planeHeight / 2;\r
    const bottomEdge = this.plane.position.y - planeHeight / 2;\r
\r
    if (topEdge < -viewportHeight / 2) {\r
      this.extra -= this.heightTotal;\r
    } else if (bottomEdge > viewportHeight / 2) {\r
      this.extra += this.heightTotal;\r
    }\r
  }\r
}\r
\r
class Canvas {\r
  container: HTMLElement;\r
  canvas: HTMLCanvasElement;\r
  items: string[];\r
  planeWidth: number;\r
  planeHeight: number;\r
  distortion: number;\r
  scroll: ScrollState;\r
  cameraFov: number;\r
  cameraZ: number;\r
\r
  renderer!: Renderer;\r
  gl!: GL;\r
  camera!: Camera;\r
  scene!: OGLTransform;\r
  planeGeometry!: OGLPlane;\r
  medias!: Media[];\r
  screen!: ScreenSize;\r
  viewport!: ViewportSize;\r
  isDown = false;\r
  start = 0;\r
  loaded = 0;\r
\r
  constructor({\r
    container,\r
    canvas,\r
    items,\r
    planeWidth,\r
    planeHeight,\r
    distortion,\r
    scrollEase,\r
    cameraFov,\r
    cameraZ\r
  }: CanvasParams) {\r
    this.container = container;\r
    this.canvas = canvas;\r
    this.items = items;\r
    this.planeWidth = planeWidth;\r
    this.planeHeight = planeHeight;\r
    this.distortion = distortion;\r
    this.scroll = {\r
      ease: scrollEase,\r
      current: 0,\r
      target: 0,\r
      last: 0\r
    };\r
    this.cameraFov = cameraFov;\r
    this.cameraZ = cameraZ;\r
\r
    AutoBind(this);\r
    this.createRenderer();\r
    this.createCamera();\r
    this.createScene();\r
    this.onResize();\r
    this.createGeometry();\r
    this.createMedias();\r
    this.update();\r
    this.addEventListeners();\r
    this.createPreloader();\r
  }\r
\r
  createRenderer() {\r
    this.renderer = new Renderer({\r
      canvas: this.canvas,\r
      alpha: true,\r
      antialias: true,\r
      dpr: Math.min(window.devicePixelRatio, 2)\r
    });\r
    this.gl = this.renderer.gl;\r
  }\r
\r
  createCamera() {\r
    this.camera = new Camera(this.gl);\r
    this.camera.fov = this.cameraFov;\r
    this.camera.position.z = this.cameraZ;\r
  }\r
\r
  createScene() {\r
    this.scene = new Transform();\r
  }\r
\r
  createGeometry() {\r
    this.planeGeometry = new Plane(this.gl, {\r
      heightSegments: 1,\r
      widthSegments: 100\r
    });\r
  }\r
\r
  createMedias() {\r
    this.medias = this.items.map(\r
      (image, index) =>\r
        new Media({\r
          gl: this.gl,\r
          geometry: this.planeGeometry,\r
          scene: this.scene,\r
          screen: this.screen,\r
          viewport: this.viewport,\r
          image,\r
          length: this.items.length,\r
          index,\r
          planeWidth: this.planeWidth,\r
          planeHeight: this.planeHeight,\r
          distortion: this.distortion\r
        })\r
    );\r
  }\r
\r
  createPreloader() {\r
    this.loaded = 0;\r
    this.items.forEach(src => {\r
      const image = new Image();\r
      image.crossOrigin = 'anonymous';\r
      image.src = src;\r
      image.onload = () => {\r
        if (++this.loaded === this.items.length) {\r
          document.documentElement.classList.remove('loading');\r
          document.documentElement.classList.add('loaded');\r
        }\r
      };\r
    });\r
  }\r
\r
  onResize() {\r
    const rect = this.container.getBoundingClientRect();\r
    this.screen = { width: rect.width, height: rect.height };\r
    this.renderer.setSize(this.screen.width, this.screen.height);\r
\r
    this.camera.perspective({\r
      aspect: this.gl.canvas.width / this.gl.canvas.height\r
    });\r
\r
    const fov = (this.camera.fov * Math.PI) / 180;\r
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;\r
    const width = height * this.camera.aspect;\r
    this.viewport = { width, height };\r
\r
    this.medias?.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));\r
  }\r
\r
  onTouchDown(e: MouseEvent | TouchEvent) {\r
    this.isDown = true;\r
    this.scroll.position = this.scroll.current;\r
    this.start = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;\r
  }\r
\r
  onTouchMove(e: MouseEvent | TouchEvent) {\r
    if (!this.isDown || !this.scroll.position) return;\r
    const y = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;\r
    const distance = (this.start - y) * 0.1;\r
    this.scroll.target = this.scroll.position + distance;\r
  }\r
\r
  onTouchUp() {\r
    this.isDown = false;\r
  }\r
\r
  onWheel(e: WheelEvent) {\r
    this.scroll.target += e.deltaY * 0.005;\r
  }\r
\r
  update() {\r
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);\r
    this.medias?.forEach(media => media.update(this.scroll));\r
    this.renderer.render({ scene: this.scene, camera: this.camera });\r
    this.scroll.last = this.scroll.current;\r
    requestAnimationFrame(this.update);\r
  }\r
\r
  addEventListeners() {\r
    window.addEventListener('resize', this.onResize);\r
    window.addEventListener('wheel', this.onWheel);\r
    window.addEventListener('mousedown', this.onTouchDown);\r
    window.addEventListener('mousemove', this.onTouchMove);\r
    window.addEventListener('mouseup', this.onTouchUp);\r
    window.addEventListener('touchstart', this.onTouchDown as EventListener);\r
    window.addEventListener('touchmove', this.onTouchMove as EventListener);\r
    window.addEventListener('touchend', this.onTouchUp as EventListener);\r
  }\r
\r
  destroy() {\r
    window.removeEventListener('resize', this.onResize);\r
    window.removeEventListener('wheel', this.onWheel);\r
    window.removeEventListener('mousedown', this.onTouchDown);\r
    window.removeEventListener('mousemove', this.onTouchMove);\r
    window.removeEventListener('mouseup', this.onTouchUp);\r
    window.removeEventListener('touchstart', this.onTouchDown as EventListener);\r
    window.removeEventListener('touchmove', this.onTouchMove as EventListener);\r
    window.removeEventListener('touchend', this.onTouchUp as EventListener);\r
  }\r
}\r
\r
interface FlyingPostersProps extends React.HTMLAttributes<HTMLDivElement> {\r
  items?: string[];\r
  planeWidth?: number;\r
  planeHeight?: number;\r
  distortion?: number;\r
  scrollEase?: number;\r
  cameraFov?: number;\r
  cameraZ?: number;\r
}\r
\r
export default function FlyingPosters({\r
  items = [],\r
  planeWidth = 320,\r
  planeHeight = 320,\r
  distortion = 3,\r
  scrollEase = 0.01,\r
  cameraFov = 45,\r
  cameraZ = 20,\r
  className,\r
  ...props\r
}: FlyingPostersProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const instanceRef = useRef<Canvas | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current || !canvasRef.current) return;\r
\r
    instanceRef.current = new Canvas({\r
      container: containerRef.current,\r
      canvas: canvasRef.current,\r
      items,\r
      planeWidth,\r
      planeHeight,\r
      distortion,\r
      scrollEase,\r
      cameraFov,\r
      cameraZ\r
    });\r
\r
    return () => {\r
      instanceRef.current?.destroy();\r
      instanceRef.current = null;\r
    };\r
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);\r
\r
  useEffect(() => {\r
    if (!canvasRef.current) return;\r
\r
    const canvasEl = canvasRef.current;\r
\r
    const handleWheel = (e: WheelEvent) => {\r
      e.preventDefault();\r
      if (instanceRef.current) {\r
        instanceRef.current.onWheel(e);\r
      }\r
    };\r
\r
    const handleTouchMove = (e: TouchEvent) => {\r
      e.preventDefault();\r
    };\r
\r
    canvasEl.addEventListener('wheel', handleWheel, { passive: false });\r
    canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });\r
\r
    return () => {\r
      canvasEl.removeEventListener('wheel', handleWheel);\r
      canvasEl.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, []);\r
\r
  return (\r
    <div ref={containerRef} className={\`posters-container \${className ?? ''}\`} {...props}>\r
      <canvas ref={canvasRef} className="posters-canvas" />\r
    </div>\r
  );\r
}\r
`,Z=`import { useRef, useEffect } from 'react';\r
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture, type OGLRenderingContext } from 'ogl';\r
\r
type GL = OGLRenderingContext;\r
type OGLProgram = Program;\r
type OGLMesh = Mesh;\r
type OGLTransform = Transform;\r
type OGLPlane = Plane;\r
\r
interface ScreenSize {\r
  width: number;\r
  height: number;\r
}\r
\r
interface ViewportSize {\r
  width: number;\r
  height: number;\r
}\r
\r
interface ScrollState {\r
  position?: number;\r
  ease: number;\r
  current: number;\r
  target: number;\r
  last: number;\r
}\r
\r
interface AutoBindOptions {\r
  include?: Array<string | RegExp>;\r
  exclude?: Array<string | RegExp>;\r
}\r
\r
interface MediaParams {\r
  gl: GL;\r
  geometry: OGLPlane;\r
  scene: OGLTransform;\r
  screen: ScreenSize;\r
  viewport: ViewportSize;\r
  image: string;\r
  length: number;\r
  index: number;\r
  planeWidth: number;\r
  planeHeight: number;\r
  distortion: number;\r
}\r
\r
interface CanvasParams {\r
  container: HTMLElement;\r
  canvas: HTMLCanvasElement;\r
  items: string[];\r
  planeWidth: number;\r
  planeHeight: number;\r
  distortion: number;\r
  scrollEase: number;\r
  cameraFov: number;\r
  cameraZ: number;\r
}\r
\r
const vertexShader = \`\r
precision highp float;\r
\r
attribute vec3 position;\r
attribute vec2 uv;\r
attribute vec3 normal;\r
\r
uniform mat4 modelViewMatrix;\r
uniform mat4 projectionMatrix;\r
uniform mat3 normalMatrix;\r
\r
uniform float uPosition;\r
uniform float uTime;\r
uniform float uSpeed;\r
uniform vec3 distortionAxis;\r
uniform vec3 rotationAxis;\r
uniform float uDistortion;\r
\r
varying vec2 vUv;\r
varying vec3 vNormal;\r
\r
float PI = 3.141592653589793238;\r
mat4 rotationMatrix(vec3 axis, float angle) {\r
    axis = normalize(axis);\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    float oc = 1.0 - c;\r
    \r
    return mat4(\r
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\r
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\r
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\r
      0.0,                              0.0,                                0.0,                                1.0\r
    );\r
}\r
\r
vec3 rotate(vec3 v, vec3 axis, float angle) {\r
  mat4 m = rotationMatrix(axis, angle);\r
  return (m * vec4(v, 1.0)).xyz;\r
}\r
\r
float qinticInOut(float t) {\r
  return t < 0.5\r
    ? 16.0 * pow(t, 5.0)\r
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;\r
}\r
\r
void main() {\r
  vUv = uv;\r
  \r
  float norm = 0.5;\r
  vec3 newpos = position;\r
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;\r
  float localprogress = clamp(\r
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),\r
    0.,\r
    2.\r
  );\r
  localprogress = qinticInOut(localprogress) * PI;\r
  newpos = rotate(newpos, rotationAxis, localprogress);\r
\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
uniform vec2 uImageSize;\r
uniform vec2 uPlaneSize;\r
uniform sampler2D tMap;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  vec2 imageSize = uImageSize;\r
  vec2 planeSize = uPlaneSize;\r
\r
  float imageAspect = imageSize.x / imageSize.y;\r
  float planeAspect = planeSize.x / planeSize.y;\r
  vec2 scale = vec2(1.0, 1.0);\r
\r
  if (planeAspect > imageAspect) {\r
      scale.x = imageAspect / planeAspect;\r
  } else {\r
      scale.y = planeAspect / imageAspect;\r
  }\r
\r
  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;\r
\r
  gl_FragColor = texture2D(tMap, uv);\r
}\r
\`;\r
\r
function AutoBind(self: any, { include, exclude }: AutoBindOptions = {}) {\r
  const getAllProperties = (object: any): Set<[any, string | symbol]> => {\r
    const properties = new Set<[any, string | symbol]>();\r
    do {\r
      for (const key of Reflect.ownKeys(object)) {\r
        properties.add([object, key]);\r
      }\r
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);\r
    return properties;\r
  };\r
\r
  const filter = (key: string | symbol) => {\r
    const match = (pattern: string | RegExp) =>\r
      typeof pattern === 'string' ? key === pattern : (pattern as RegExp).test(key.toString());\r
\r
    if (include) return include.some(match);\r
    if (exclude) return !exclude.some(match);\r
    return true;\r
  };\r
\r
  for (const [object, key] of getAllProperties(self.constructor.prototype)) {\r
    if (key === 'constructor' || !filter(key)) continue;\r
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);\r
    if (descriptor && typeof descriptor.value === 'function') {\r
      self[key] = self[key].bind(self);\r
    }\r
  }\r
  return self;\r
}\r
\r
function lerp(p1: number, p2: number, t: number): number {\r
  return p1 + (p2 - p1) * t;\r
}\r
\r
function map(num: number, min1: number, max1: number, min2: number, max2: number, round = false): number {\r
  const num1 = (num - min1) / (max1 - min1);\r
  const num2 = num1 * (max2 - min2) + min2;\r
  return round ? Math.round(num2) : num2;\r
}\r
\r
class Media {\r
  gl: GL;\r
  geometry: OGLPlane;\r
  scene: OGLTransform;\r
  screen: ScreenSize;\r
  viewport: ViewportSize;\r
  image: string;\r
  length: number;\r
  index: number;\r
  planeWidth: number;\r
  planeHeight: number;\r
  distortion: number;\r
\r
  program!: OGLProgram;\r
  plane!: OGLMesh;\r
  extra = 0;\r
  padding = 0;\r
  height = 0;\r
  heightTotal = 0;\r
  y = 0;\r
\r
  constructor({\r
    gl,\r
    geometry,\r
    scene,\r
    screen,\r
    viewport,\r
    image,\r
    length,\r
    index,\r
    planeWidth,\r
    planeHeight,\r
    distortion\r
  }: MediaParams) {\r
    this.gl = gl;\r
    this.geometry = geometry;\r
    this.scene = scene;\r
    this.screen = screen;\r
    this.viewport = viewport;\r
    this.image = image;\r
    this.length = length;\r
    this.index = index;\r
    this.planeWidth = planeWidth;\r
    this.planeHeight = planeHeight;\r
    this.distortion = distortion;\r
\r
    this.createShader();\r
    this.createMesh();\r
    this.onResize();\r
  }\r
\r
  createShader() {\r
    const texture = new Texture(this.gl, { generateMipmaps: false });\r
    this.program = new Program(this.gl, {\r
      depthTest: false,\r
      depthWrite: false,\r
      fragment: fragmentShader,\r
      vertex: vertexShader,\r
      uniforms: {\r
        tMap: { value: texture },\r
        uPosition: { value: 0 },\r
        uPlaneSize: { value: [0, 0] },\r
        uImageSize: { value: [0, 0] },\r
        uSpeed: { value: 0 },\r
        rotationAxis: { value: [0, 1, 0] },\r
        distortionAxis: { value: [1, 1, 0] },\r
        uDistortion: { value: this.distortion },\r
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },\r
        uTime: { value: 0 }\r
      },\r
      cullFace: false\r
    });\r
\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.src = this.image;\r
    img.onload = () => {\r
      texture.image = img;\r
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];\r
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
  setScale() {\r
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;\r
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;\r
    this.plane.position.x = 0;\r
    this.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];\r
  }\r
\r
  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: ViewportSize } = {}) {\r
    if (screen) this.screen = screen;\r
    if (viewport) {\r
      this.viewport = viewport;\r
      this.program.uniforms.uViewportSize.value = [viewport.width, viewport.height];\r
    }\r
    this.setScale();\r
\r
    this.padding = 5;\r
    this.height = this.plane.scale.y + this.padding;\r
    this.heightTotal = this.height * this.length;\r
    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;\r
  }\r
\r
  update(scroll: ScrollState) {\r
    this.plane.position.y = this.y - scroll.current - this.extra;\r
    const position = map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);\r
\r
    this.program.uniforms.uPosition.value = position;\r
    this.program.uniforms.uTime.value += 0.04;\r
    this.program.uniforms.uSpeed.value = scroll.current;\r
\r
    const planeHeight = this.plane.scale.y;\r
    const viewportHeight = this.viewport.height;\r
    const topEdge = this.plane.position.y + planeHeight / 2;\r
    const bottomEdge = this.plane.position.y - planeHeight / 2;\r
\r
    if (topEdge < -viewportHeight / 2) {\r
      this.extra -= this.heightTotal;\r
    } else if (bottomEdge > viewportHeight / 2) {\r
      this.extra += this.heightTotal;\r
    }\r
  }\r
}\r
\r
class Canvas {\r
  container: HTMLElement;\r
  canvas: HTMLCanvasElement;\r
  items: string[];\r
  planeWidth: number;\r
  planeHeight: number;\r
  distortion: number;\r
  scroll: ScrollState;\r
  cameraFov: number;\r
  cameraZ: number;\r
\r
  renderer!: Renderer;\r
  gl!: GL;\r
  camera!: Camera;\r
  scene!: OGLTransform;\r
  planeGeometry!: OGLPlane;\r
  medias!: Media[];\r
  screen!: ScreenSize;\r
  viewport!: ViewportSize;\r
  isDown = false;\r
  start = 0;\r
  loaded = 0;\r
\r
  constructor({\r
    container,\r
    canvas,\r
    items,\r
    planeWidth,\r
    planeHeight,\r
    distortion,\r
    scrollEase,\r
    cameraFov,\r
    cameraZ\r
  }: CanvasParams) {\r
    this.container = container;\r
    this.canvas = canvas;\r
    this.items = items;\r
    this.planeWidth = planeWidth;\r
    this.planeHeight = planeHeight;\r
    this.distortion = distortion;\r
    this.scroll = {\r
      ease: scrollEase,\r
      current: 0,\r
      target: 0,\r
      last: 0\r
    };\r
    this.cameraFov = cameraFov;\r
    this.cameraZ = cameraZ;\r
\r
    AutoBind(this);\r
    this.createRenderer();\r
    this.createCamera();\r
    this.createScene();\r
    this.onResize();\r
    this.createGeometry();\r
    this.createMedias();\r
    this.update();\r
    this.addEventListeners();\r
    this.createPreloader();\r
  }\r
\r
  createRenderer() {\r
    this.renderer = new Renderer({\r
      canvas: this.canvas,\r
      alpha: true,\r
      antialias: true,\r
      dpr: Math.min(window.devicePixelRatio, 2)\r
    });\r
    this.gl = this.renderer.gl;\r
  }\r
\r
  createCamera() {\r
    this.camera = new Camera(this.gl);\r
    this.camera.fov = this.cameraFov;\r
    this.camera.position.z = this.cameraZ;\r
  }\r
\r
  createScene() {\r
    this.scene = new Transform();\r
  }\r
\r
  createGeometry() {\r
    this.planeGeometry = new Plane(this.gl, {\r
      heightSegments: 1,\r
      widthSegments: 100\r
    });\r
  }\r
\r
  createMedias() {\r
    this.medias = this.items.map(\r
      (image, index) =>\r
        new Media({\r
          gl: this.gl,\r
          geometry: this.planeGeometry,\r
          scene: this.scene,\r
          screen: this.screen,\r
          viewport: this.viewport,\r
          image,\r
          length: this.items.length,\r
          index,\r
          planeWidth: this.planeWidth,\r
          planeHeight: this.planeHeight,\r
          distortion: this.distortion\r
        })\r
    );\r
  }\r
\r
  createPreloader() {\r
    this.loaded = 0;\r
    this.items.forEach(src => {\r
      const image = new Image();\r
      image.crossOrigin = 'anonymous';\r
      image.src = src;\r
      image.onload = () => {\r
        if (++this.loaded === this.items.length) {\r
          document.documentElement.classList.remove('loading');\r
          document.documentElement.classList.add('loaded');\r
        }\r
      };\r
    });\r
  }\r
\r
  onResize() {\r
    const rect = this.container.getBoundingClientRect();\r
    this.screen = { width: rect.width, height: rect.height };\r
    this.renderer.setSize(this.screen.width, this.screen.height);\r
\r
    this.camera.perspective({\r
      aspect: this.gl.canvas.width / this.gl.canvas.height\r
    });\r
\r
    const fov = (this.camera.fov * Math.PI) / 180;\r
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;\r
    const width = height * this.camera.aspect;\r
    this.viewport = { width, height };\r
\r
    this.medias?.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));\r
  }\r
\r
  onTouchDown(e: MouseEvent | TouchEvent) {\r
    this.isDown = true;\r
    this.scroll.position = this.scroll.current;\r
    this.start = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;\r
  }\r
\r
  onTouchMove(e: MouseEvent | TouchEvent) {\r
    if (!this.isDown || !this.scroll.position) return;\r
    const y = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;\r
    const distance = (this.start - y) * 0.1;\r
    this.scroll.target = this.scroll.position + distance;\r
  }\r
\r
  onTouchUp() {\r
    this.isDown = false;\r
  }\r
\r
  onWheel(e: WheelEvent) {\r
    this.scroll.target += e.deltaY * 0.005;\r
  }\r
\r
  update() {\r
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);\r
    this.medias?.forEach(media => media.update(this.scroll));\r
    this.renderer.render({ scene: this.scene, camera: this.camera });\r
    this.scroll.last = this.scroll.current;\r
    requestAnimationFrame(this.update);\r
  }\r
\r
  addEventListeners() {\r
    window.addEventListener('resize', this.onResize);\r
    window.addEventListener('wheel', this.onWheel);\r
    window.addEventListener('mousedown', this.onTouchDown);\r
    window.addEventListener('mousemove', this.onTouchMove);\r
    window.addEventListener('mouseup', this.onTouchUp);\r
    window.addEventListener('touchstart', this.onTouchDown as EventListener);\r
    window.addEventListener('touchmove', this.onTouchMove as EventListener);\r
    window.addEventListener('touchend', this.onTouchUp as EventListener);\r
  }\r
\r
  destroy() {\r
    window.removeEventListener('resize', this.onResize);\r
    window.removeEventListener('wheel', this.onWheel);\r
    window.removeEventListener('mousedown', this.onTouchDown);\r
    window.removeEventListener('mousemove', this.onTouchMove);\r
    window.removeEventListener('mouseup', this.onTouchUp);\r
    window.removeEventListener('touchstart', this.onTouchDown as EventListener);\r
    window.removeEventListener('touchmove', this.onTouchMove as EventListener);\r
    window.removeEventListener('touchend', this.onTouchUp as EventListener);\r
  }\r
}\r
\r
interface FlyingPostersProps extends React.HTMLAttributes<HTMLDivElement> {\r
  items?: string[];\r
  planeWidth?: number;\r
  planeHeight?: number;\r
  distortion?: number;\r
  scrollEase?: number;\r
  cameraFov?: number;\r
  cameraZ?: number;\r
}\r
\r
export default function FlyingPosters({\r
  items = [],\r
  planeWidth = 320,\r
  planeHeight = 320,\r
  distortion = 3,\r
  scrollEase = 0.01,\r
  cameraFov = 45,\r
  cameraZ = 20,\r
  className,\r
  ...props\r
}: FlyingPostersProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const instanceRef = useRef<Canvas | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current || !canvasRef.current) return;\r
\r
    instanceRef.current = new Canvas({\r
      container: containerRef.current,\r
      canvas: canvasRef.current,\r
      items,\r
      planeWidth,\r
      planeHeight,\r
      distortion,\r
      scrollEase,\r
      cameraFov,\r
      cameraZ\r
    });\r
\r
    return () => {\r
      instanceRef.current?.destroy();\r
      instanceRef.current = null;\r
    };\r
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);\r
\r
  useEffect(() => {\r
    if (!canvasRef.current) return;\r
\r
    const canvasEl = canvasRef.current;\r
\r
    const handleWheel = (e: WheelEvent) => {\r
      e.preventDefault();\r
      if (instanceRef.current) {\r
        instanceRef.current.onWheel(e);\r
      }\r
    };\r
\r
    const handleTouchMove = (e: TouchEvent) => {\r
      e.preventDefault();\r
    };\r
\r
    canvasEl.addEventListener('wheel', handleWheel, { passive: false });\r
    canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });\r
\r
    return () => {\r
      canvasEl.removeEventListener('wheel', handleWheel);\r
      canvasEl.removeEventListener('touchmove', handleTouchMove);\r
    };\r
  }, []);\r
\r
  return (\r
    <div ref={containerRef} className={\`w-full h-full overflow-hidden relative z-2 \${className}\`} {...props}>\r
      <canvas ref={canvasRef} className="block w-full h-full" />\r
    </div>\r
  );\r
}\r
`,V={dependencies:"ogl",usage:`import FlyingPosters from './FlyingPosters'

const items = [
  'https://picsum.photos/500/500?grayscale', 
  'https://picsum.photos/600/600?grayscale', 
  'https://picsum.photos/400/400?grayscale'
];

<div style={{ height: '600px', position: 'relative' }}>
  <FlyingPosters items={items}/>
</div>`,code:G,css:I,tailwind:k,tsCode:U,tsTailwind:Z},Y=`
precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;

float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                              0.0,                                0.0,                                1.0
    );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float qinticInOut(float t) {
  return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;
  
  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
  float localprogress = clamp(
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion),
    0.,
    2.
  );
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`,N=`
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;

  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;

  gl_FragColor = texture2D(tMap, uv);
}
`;function B(c,{include:e,exclude:n}={}){const i=r=>{const t=new Set;do for(const o of Reflect.ownKeys(r))t.add([r,o]);while((r=Reflect.getPrototypeOf(r))&&r!==Object.prototype);return t},h=r=>{const t=o=>typeof o=="string"?r===o:o.test(r);return e?e.some(t):n?!n.some(t):!0};for(const[r,t]of i(c.constructor.prototype)){if(t==="constructor"||!h(t))continue;const o=Reflect.getOwnPropertyDescriptor(r,t);o&&typeof o.value=="function"&&(c[t]=c[t].bind(c))}return c}function q(c,e,n){return c+(e-c)*n}function _(c,e,n,i,h,r=!1){const o=(c-e)/(n-e)*(h-i)+i;return r?Math.round(o):o}class ${constructor({gl:e,geometry:n,scene:i,screen:h,viewport:r,image:t,length:o,index:v,planeWidth:u,planeHeight:d,distortion:m}){this.extra=0,this.gl=e,this.geometry=n,this.scene=i,this.screen=h,this.viewport=r,this.image=t,this.length=o,this.index=v,this.planeWidth=u,this.planeHeight=d,this.distortion=m,this.createShader(),this.createMesh(),this.onResize()}createShader(){const e=new j(this.gl,{generateMipmaps:!1});this.program=new z(this.gl,{depthTest:!1,depthWrite:!1,fragment:N,vertex:Y,uniforms:{tMap:{value:e},uPosition:{value:0},uPlaneSize:{value:[0,0]},uImageSize:{value:[0,0]},uSpeed:{value:0},rotationAxis:{value:[0,1,0]},distortionAxis:{value:[1,1,0]},uDistortion:{value:this.distortion},uViewportSize:{value:[this.viewport.width,this.viewport.height]},uTime:{value:0}},cullFace:!1});const n=new Image;n.crossOrigin="anonymous",n.src=this.image,n.onload=()=>{e.image=n,this.program.uniforms.uImageSize.value=[n.naturalWidth,n.naturalHeight]}}createMesh(){this.plane=new T(this.gl,{geometry:this.geometry,program:this.program}),this.plane.setParent(this.scene)}setScale(){this.plane.scale.x=this.viewport.width*this.planeWidth/this.screen.width,this.plane.scale.y=this.viewport.height*this.planeHeight/this.screen.height,this.plane.position.x=0,this.plane.program.uniforms.uPlaneSize.value=[this.plane.scale.x,this.plane.scale.y]}onResize({screen:e,viewport:n}={}){e&&(this.screen=e),n&&(this.viewport=n,this.plane.program.uniforms.uViewportSize.value=[this.viewport.width,this.viewport.height]),this.setScale(),this.padding=5,this.height=this.plane.scale.y+this.padding,this.heightTotal=this.height*this.length,this.y=-this.heightTotal/2+(this.index+.5)*this.height}update(e){this.plane.position.y=this.y-e.current-this.extra;const n=_(this.plane.position.y,-this.viewport.height,this.viewport.height,5,15);this.program.uniforms.uPosition.value=n,this.program.uniforms.uTime.value+=.04,this.program.uniforms.uSpeed.value=e.current;const i=this.plane.scale.y,h=this.viewport.height,r=this.plane.position.y+i/2,t=this.plane.position.y-i/2;r<-h/2?this.extra-=this.heightTotal:t>h/2&&(this.extra+=this.heightTotal)}}class K{constructor({container:e,canvas:n,items:i,planeWidth:h,planeHeight:r,distortion:t,scrollEase:o,cameraFov:v,cameraZ:u}){this.container=e,this.canvas=n,this.items=i,this.planeWidth=h,this.planeHeight=r,this.distortion=t,this.scroll={ease:o,current:0,target:0,last:0},this.cameraFov=v,this.cameraZ=u,B(this),this.createRenderer(),this.createCamera(),this.createScene(),this.onResize(),this.createGeometry(),this.createMedias(),this.update(),this.addEventListeners(),this.createPreloader()}createRenderer(){this.renderer=new y({canvas:this.canvas,alpha:!0,antialias:!0,dpr:Math.min(window.devicePixelRatio,2)}),this.gl=this.renderer.gl}createCamera(){this.camera=new E(this.gl),this.camera.fov=this.cameraFov,this.camera.position.z=this.cameraZ}createScene(){this.scene=new S}createGeometry(){this.planeGeometry=new O(this.gl,{heightSegments:1,widthSegments:100})}createMedias(){this.medias=this.items.map((e,n)=>new $({gl:this.gl,geometry:this.planeGeometry,scene:this.scene,screen:this.screen,viewport:this.viewport,image:e,length:this.items.length,index:n,planeWidth:this.planeWidth,planeHeight:this.planeHeight,distortion:this.distortion}))}createPreloader(){this.loaded=0,this.items.length&&this.items.forEach(e=>{const n=new Image;n.crossOrigin="anonymous",n.src=e,n.onload=()=>{this.loaded+=1,this.loaded===this.items.length&&(document.documentElement.classList.remove("loading"),document.documentElement.classList.add("loaded"))}})}onResize(){const e=this.container.getBoundingClientRect();this.screen={width:e.width,height:e.height},this.renderer.setSize(this.screen.width,this.screen.height),this.camera.perspective({aspect:this.gl.canvas.width/this.gl.canvas.height});const n=this.camera.fov*Math.PI/180,i=2*Math.tan(n/2)*this.camera.position.z,h=i*this.camera.aspect;this.viewport={height:i,width:h},this.medias&&this.medias.forEach(r=>r.onResize({screen:this.screen,viewport:this.viewport}))}onTouchDown(e){this.isDown=!0,this.scroll.position=this.scroll.current,this.start=e.touches?e.touches[0].clientY:e.clientY}onTouchMove(e){if(!this.isDown)return;const n=e.touches?e.touches[0].clientY:e.clientY,i=(this.start-n)*.1;this.scroll.target=this.scroll.position+i}onTouchUp(){this.isDown=!1}onWheel(e){const n=e.deltaY;this.scroll.target+=n*.005}update(){this.scroll.current=q(this.scroll.current,this.scroll.target,this.scroll.ease),this.medias&&this.medias.forEach(e=>e.update(this.scroll)),this.renderer.render({scene:this.scene,camera:this.camera}),this.scroll.last=this.scroll.current,requestAnimationFrame(this.update)}addEventListeners(){window.addEventListener("resize",this.onResize),window.addEventListener("wheel",this.onWheel),window.addEventListener("mousewheel",this.onWheel),window.addEventListener("mousedown",this.onTouchDown),window.addEventListener("mousemove",this.onTouchMove),window.addEventListener("mouseup",this.onTouchUp),window.addEventListener("touchstart",this.onTouchDown),window.addEventListener("touchmove",this.onTouchMove),window.addEventListener("touchend",this.onTouchUp)}destroy(){window.removeEventListener("resize",this.onResize),window.removeEventListener("wheel",this.onWheel),window.removeEventListener("mousewheel",this.onWheel),window.removeEventListener("mousedown",this.onTouchDown),window.removeEventListener("mousemove",this.onTouchMove),window.removeEventListener("mouseup",this.onTouchUp),window.removeEventListener("touchstart",this.onTouchDown),window.removeEventListener("touchmove",this.onTouchMove),window.removeEventListener("touchend",this.onTouchUp)}}function J({items:c=[],planeWidth:e=320,planeHeight:n=320,distortion:i=3,scrollEase:h=.01,cameraFov:r=45,cameraZ:t=20,className:o,...v}){const u=l.useRef(null),d=l.useRef(null),m=l.useRef(null);return l.useEffect(()=>{if(u.current)return m.current=new K({container:u.current,canvas:d.current,items:c,planeWidth:e,planeHeight:n,distortion:i,scrollEase:h,cameraFov:r,cameraZ:t}),()=>{m.current&&(m.current.destroy(),m.current=null)}},[c,e,n,i,h,r,t]),l.useEffect(()=>{if(!d.current)return;const g=d.current,x=f=>{f.preventDefault(),m.current&&m.current.onWheel(f)},p=f=>{f.preventDefault()};return g.addEventListener("wheel",x,{passive:!1}),g.addEventListener("touchmove",p,{passive:!1}),()=>{g.removeEventListener("wheel",x),g.removeEventListener("touchmove",p)}},[]),a.jsx("div",{ref:u,className:`posters-container ${o}`,...v,children:a.jsx("canvas",{ref:d,className:"posters-canvas"})})}const ce=()=>{const[c]=l.useState(["https://picsum.photos/500/500?grayscale","https://picsum.photos/600/600?grayscale","https://picsum.photos/400/400?grayscale"]),[e,n]=l.useState(320),[i,h]=l.useState(320),[r,t]=l.useState(3),[o,v]=l.useState(.01),[u,d]=l.useState(45),[m,g]=l.useState(20),[x,p]=F(),f=[{name:"items",type:"string[]",default:"[]",description:"An array of image URLs to be displayed as flying posters."},{name:"planeWidth",type:"number",default:"320",description:"The width of each poster plane in pixels."},{name:"planeHeight",type:"number",default:"320",description:"The height of each poster plane in pixels."},{name:"distortion",type:"number",default:"3",description:"The amount of distortion applied to the posters' movement."},{name:"scrollEase",type:"number",default:"0.01",description:"The easing factor for smooth scrolling interactions."},{name:"cameraFov",type:"number",default:"45",description:"The field of view for the camera in degrees."},{name:"cameraZ",type:"number",default:"20",description:"The Z position of the camera, affecting zoom and perspective."}];return a.jsxs(b,{children:[a.jsxs(M,{children:[a.jsxs(L,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[a.jsx(D,{onClick:p}),a.jsx(J,{items:c,planeWidth:e,planeHeight:i,distortion:r,scrollEase:o,cameraFov:u,cameraZ:m},x),a.jsx(R,{color:"#271E37",zIndex:0,fontSize:"clamp(2rem, 6vw, 6rem)",fontWeight:900,position:"absolute",children:"Scroll."})]}),a.jsxs(A,{children:[a.jsx(w,{title:"Plane Width",min:300,max:400,step:10,value:e,onChange:s=>{n(s),p()},displayValue:s=>`${s}px`}),a.jsx(w,{title:"Plane Height",min:200,max:350,step:10,value:i,onChange:s=>{h(s),p()},displayValue:s=>`${s}px`}),a.jsx(w,{title:"Distortion",min:0,max:10,step:.1,value:r,onChange:s=>{t(s),p()},displayValue:s=>s.toFixed(1)}),a.jsx(w,{title:"Scroll Ease",min:.001,max:.05,step:.001,value:o,onChange:s=>{v(s),p()},displayValue:s=>s.toFixed(3)}),a.jsx(w,{title:"Camera FOV",min:20,max:90,step:1,value:u,onChange:s=>{d(s),p()},displayValue:s=>`${s}°`}),a.jsx(w,{title:"Camera Z",min:5,max:50,step:1,value:m,onChange:s=>{g(s),p()}})]}),a.jsx(P,{data:f}),a.jsx(C,{dependencyList:["ogl"]})]}),a.jsx(W,{children:a.jsx(H,{codeObject:V})})]})};export{ce as default};
