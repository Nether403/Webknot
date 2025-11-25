import{r as u,j as a,B as y}from"./index-wsKSLPNH.js";import{T as b,P as w,a as E,C as S,b as M}from"./PropTable-C4uPWs8h.js";import{D as z}from"./Dependencies-BHoMfJUj.js";import{C as R}from"./Customize-1m_ZNqR9.js";import{P as C}from"./PreviewSwitch-DqnF708j.js";import{P as F}from"./PreviewInput-C0y58bk9.js";import{P as T}from"./PreviewSlider-m1G_aiYP.js";import{u as H}from"./useForceRerender-BCFU-k0M.js";import{p as I,S as P,D as A,N as B,P as W,a as D,M as L,W as j}from"./three.module-0PRdiASR.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const k=`
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    float time = uTime * 5.;

    float waveFactor = uEnableWaves;

    vec3 transformed = position;

    transformed.x += sin(time + position.y) * 0.5 * waveFactor;
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;
    transformed.z += sin(time + position.x) * waveFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`,O=`
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime;
    vec2 pos = vUv;
    
    float move = sin(time + mouse) * 0.01;
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`;Math.map=function(h,e,t,n,r){return(h-e)/(t-e)*(r-n)+n};const p=typeof window<"u"?window.devicePixelRatio:1;class ${constructor(e,{fontSize:t,fontFamily:n,charset:r,invert:s}={}){this.renderer=e,this.domElement=document.createElement("div"),this.domElement.style.position="absolute",this.domElement.style.top="0",this.domElement.style.left="0",this.domElement.style.width="100%",this.domElement.style.height="100%",this.pre=document.createElement("pre"),this.domElement.appendChild(this.pre),this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.domElement.appendChild(this.canvas),this.deg=0,this.invert=s??!0,this.fontSize=t??12,this.fontFamily=n??"'Courier New', monospace",this.charset=r??" .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",this.context.webkitImageSmoothingEnabled=!1,this.context.mozImageSmoothingEnabled=!1,this.context.msImageSmoothingEnabled=!1,this.context.imageSmoothingEnabled=!1,this.onMouseMove=this.onMouseMove.bind(this),document.addEventListener("mousemove",this.onMouseMove)}setSize(e,t){this.width=e,this.height=t,this.renderer.setSize(e,t),this.reset(),this.center={x:e/2,y:t/2},this.mouse={x:this.center.x,y:this.center.y}}reset(){this.context.font=`${this.fontSize}px ${this.fontFamily}`;const e=this.context.measureText("A").width;this.cols=Math.floor(this.width/(this.fontSize*(e/this.fontSize))),this.rows=Math.floor(this.height/this.fontSize),this.canvas.width=this.cols,this.canvas.height=this.rows,this.pre.style.fontFamily=this.fontFamily,this.pre.style.fontSize=`${this.fontSize}px`,this.pre.style.margin="0",this.pre.style.padding="0",this.pre.style.lineHeight="1em",this.pre.style.position="absolute",this.pre.style.left="50%",this.pre.style.top="50%",this.pre.style.transform="translate(-50%, -50%)",this.pre.style.zIndex="9",this.pre.style.backgroundAttachment="fixed",this.pre.style.mixBlendMode="difference"}render(e,t){this.renderer.render(e,t);const n=this.canvas.width,r=this.canvas.height;this.context.clearRect(0,0,n,r),this.context&&n&&r&&this.context.drawImage(this.renderer.domElement,0,0,n,r),this.asciify(this.context,n,r),this.hue()}onMouseMove(e){this.mouse={x:e.clientX*p,y:e.clientY*p}}get dx(){return this.mouse.x-this.center.x}get dy(){return this.mouse.y-this.center.y}hue(){const e=Math.atan2(this.dy,this.dx)*180/Math.PI;this.deg+=(e-this.deg)*.075,this.domElement.style.filter=`hue-rotate(${this.deg.toFixed(1)}deg)`}asciify(e,t,n){if(t&&n){const r=e.getImageData(0,0,t,n).data;let s="";for(let o=0;o<n;o++){for(let i=0;i<t;i++){const c=i*4+o*4*t,[l,g,d,m]=[r[c],r[c+1],r[c+2],r[c+3]];if(m===0){s+=" ";continue}let f=(.3*l+.6*g+.1*d)/255,x=Math.floor((1-f)*(this.charset.length-1));this.invert&&(x=this.charset.length-x-1),s+=this.charset[x]}s+=`
`}this.pre.innerHTML=s}}dispose(){document.removeEventListener("mousemove",this.onMouseMove)}}class U{constructor(e,{fontSize:t=200,fontFamily:n="Arial",color:r="#fdf9f3"}={}){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.txt=e,this.fontSize=t,this.fontFamily=n,this.color=r,this.font=`600 ${this.fontSize}px ${this.fontFamily}`}resize(){this.context.font=this.font;const e=this.context.measureText(this.txt),t=Math.ceil(e.width)+20,n=Math.ceil(e.actualBoundingBoxAscent+e.actualBoundingBoxDescent)+20;this.canvas.width=t,this.canvas.height=n}render(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.fillStyle=this.color,this.context.font=this.font;const t=10+this.context.measureText(this.txt).actualBoundingBoxAscent;this.context.fillText(this.txt,10,t)}get width(){return this.canvas.width}get height(){return this.canvas.height}get texture(){return this.canvas}}class v{constructor({text:e,asciiFontSize:t,textFontSize:n,textColor:r,planeBaseHeight:s,enableWaves:o},i,c,l){this.textString=e,this.asciiFontSize=t,this.textFontSize=n,this.textColor=r,this.planeBaseHeight=s,this.container=i,this.width=c,this.height=l,this.enableWaves=o,this.camera=new I(45,this.width/this.height,1,1e3),this.camera.position.z=30,this.scene=new P,this.mouse={x:0,y:0},this.onMouseMove=this.onMouseMove.bind(this),this.setMesh(),this.setRenderer()}setMesh(){this.textCanvas=new U(this.textString,{fontSize:this.textFontSize,fontFamily:"IBM Plex Mono",color:this.textColor}),this.textCanvas.resize(),this.textCanvas.render(),this.texture=new A(this.textCanvas.texture),this.texture.minFilter=B;const e=this.textCanvas.width/this.textCanvas.height,t=this.planeBaseHeight,n=t*e,r=t;this.geometry=new W(n,r,36,36),this.material=new D({vertexShader:k,fragmentShader:O,transparent:!0,uniforms:{uTime:{value:0},mouse:{value:1},uTexture:{value:this.texture},uEnableWaves:{value:this.enableWaves?1:0}}}),this.mesh=new L(this.geometry,this.material),this.scene.add(this.mesh)}setRenderer(){this.renderer=new j({antialias:!1,alpha:!0}),this.renderer.setPixelRatio(1),this.renderer.setClearColor(0,0),this.filter=new $(this.renderer,{fontFamily:"IBM Plex Mono",fontSize:this.asciiFontSize,invert:!0}),this.container.appendChild(this.filter.domElement),this.setSize(this.width,this.height),this.container.addEventListener("mousemove",this.onMouseMove),this.container.addEventListener("touchmove",this.onMouseMove)}setSize(e,t){this.width=e,this.height=t,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.filter.setSize(e,t),this.center={x:e/2,y:t/2}}load(){this.animate()}onMouseMove(e){const t=e.touches?e.touches[0]:e,n=this.container.getBoundingClientRect(),r=t.clientX-n.left,s=t.clientY-n.top;this.mouse={x:r,y:s}}animate(){const e=()=>{this.animationFrameId=requestAnimationFrame(e),this.render()};e()}render(){const e=new Date().getTime()*.001;this.textCanvas.render(),this.texture.needsUpdate=!0,this.mesh.material.uniforms.uTime.value=Math.sin(e),this.updateRotation(),this.filter.render(this.scene,this.camera)}updateRotation(){const e=Math.map(this.mouse.y,0,this.height,.5,-.5),t=Math.map(this.mouse.x,0,this.width,-.5,.5);this.mesh.rotation.x+=(e-this.mesh.rotation.x)*.05,this.mesh.rotation.y+=(t-this.mesh.rotation.y)*.05}clear(){this.scene.traverse(e=>{e.isMesh&&typeof e.material=="object"&&e.material!==null&&(Object.keys(e.material).forEach(t=>{const n=e.material[t];n!==null&&typeof n=="object"&&typeof n.dispose=="function"&&n.dispose()}),e.material.dispose(),e.geometry.dispose())}),this.scene.clear()}dispose(){cancelAnimationFrame(this.animationFrameId),this.filter.dispose(),this.container.removeChild(this.filter.domElement),this.container.removeEventListener("mousemove",this.onMouseMove),this.container.removeEventListener("touchmove",this.onMouseMove),this.clear(),this.renderer.dispose()}}function _({text:h="David!",asciiFontSize:e=8,textFontSize:t=200,textColor:n="#fdf9f3",planeBaseHeight:r=8,enableWaves:s=!0}){const o=u.useRef(null),i=u.useRef(null);return u.useEffect(()=>{if(!o.current)return;const{width:c,height:l}=o.current.getBoundingClientRect();if(c===0||l===0){const d=new IntersectionObserver(([m])=>{if(m.isIntersecting&&m.boundingClientRect.width>0&&m.boundingClientRect.height>0){const{width:f,height:x}=m.boundingClientRect;i.current=new v({text:h,asciiFontSize:e,textFontSize:t,textColor:n,planeBaseHeight:r,enableWaves:s},o.current,f,x),i.current.load(),d.disconnect()}},{threshold:.1});return d.observe(o.current),()=>{d.disconnect(),i.current&&i.current.dispose()}}i.current=new v({text:h,asciiFontSize:e,textFontSize:t,textColor:n,planeBaseHeight:r,enableWaves:s},o.current,c,l),i.current.load();const g=new ResizeObserver(d=>{if(!d[0]||!i.current)return;const{width:m,height:f}=d[0].contentRect;m>0&&f>0&&i.current.setSize(m,f)});return g.observe(o.current),()=>{g.disconnect(),i.current&&i.current.dispose()}},[h,e,t,n,r,s]),a.jsx("div",{ref:o,className:"ascii-text-container",style:{position:"absolute",width:"100%",height:"100%"},children:a.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap');

        .ascii-text-container canvas {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          image-rendering: optimizeSpeed;
          image-rendering: -moz-crisp-edges;
          image-rendering: -o-crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
        }

        .ascii-text-container pre {
          margin: 0;
          user-select: none;
          padding: 0;
          line-height: 1em;
          text-align: left;
          position: absolute;
          left: 0;
          top: 0;
          background-image: radial-gradient(circle, #ff6188 0%, #fc9867 50%, #ffd866 100%);
          background-attachment: fixed;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          z-index: 9;
          mix-blend-mode: difference;
        }
      `})})}const X=`// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE\r
\r
import { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
\r
const vertexShader = \`\r
varying vec2 vUv;\r
uniform float uTime;\r
uniform float mouse;\r
uniform float uEnableWaves;\r
\r
void main() {\r
    vUv = uv;\r
    float time = uTime * 5.;\r
\r
    float waveFactor = uEnableWaves;\r
\r
    vec3 transformed = position;\r
\r
    transformed.x += sin(time + position.y) * 0.5 * waveFactor;\r
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;\r
    transformed.z += sin(time + position.x) * waveFactor;\r
\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
varying vec2 vUv;\r
uniform float mouse;\r
uniform float uTime;\r
uniform sampler2D uTexture;\r
\r
void main() {\r
    float time = uTime;\r
    vec2 pos = vUv;\r
    \r
    float move = sin(time + mouse) * 0.01;\r
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;\r
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;\r
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;\r
    float a = texture2D(uTexture, pos).a;\r
    gl_FragColor = vec4(r, g, b, a);\r
}\r
\`;\r
\r
Math.map = function (n, start, stop, start2, stop2) {\r
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;\r
};\r
\r
const PX_RATIO = typeof window !== 'undefined' ? window.devicePixelRatio : 1;\r
\r
class AsciiFilter {\r
  constructor(renderer, { fontSize, fontFamily, charset, invert } = {}) {\r
    this.renderer = renderer;\r
    this.domElement = document.createElement('div');\r
    this.domElement.style.position = 'absolute';\r
    this.domElement.style.top = '0';\r
    this.domElement.style.left = '0';\r
    this.domElement.style.width = '100%';\r
    this.domElement.style.height = '100%';\r
\r
    this.pre = document.createElement('pre');\r
    this.domElement.appendChild(this.pre);\r
\r
    this.canvas = document.createElement('canvas');\r
    this.context = this.canvas.getContext('2d');\r
    this.domElement.appendChild(this.canvas);\r
\r
    this.deg = 0;\r
    this.invert = invert ?? true;\r
    this.fontSize = fontSize ?? 12;\r
    this.fontFamily = fontFamily ?? "'Courier New', monospace";\r
    this.charset = charset ?? ' .\\'\`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';\r
\r
    this.context.webkitImageSmoothingEnabled = false;\r
    this.context.mozImageSmoothingEnabled = false;\r
    this.context.msImageSmoothingEnabled = false;\r
    this.context.imageSmoothingEnabled = false;\r
\r
    this.onMouseMove = this.onMouseMove.bind(this);\r
    document.addEventListener('mousemove', this.onMouseMove);\r
  }\r
\r
  setSize(width, height) {\r
    this.width = width;\r
    this.height = height;\r
    this.renderer.setSize(width, height);\r
    this.reset();\r
\r
    this.center = { x: width / 2, y: height / 2 };\r
    this.mouse = { x: this.center.x, y: this.center.y };\r
  }\r
\r
  reset() {\r
    this.context.font = \`\${this.fontSize}px \${this.fontFamily}\`;\r
    const charWidth = this.context.measureText('A').width;\r
\r
    this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)));\r
    this.rows = Math.floor(this.height / this.fontSize);\r
\r
    this.canvas.width = this.cols;\r
    this.canvas.height = this.rows;\r
    this.pre.style.fontFamily = this.fontFamily;\r
    this.pre.style.fontSize = \`\${this.fontSize}px\`;\r
    this.pre.style.margin = '0';\r
    this.pre.style.padding = '0';\r
    this.pre.style.lineHeight = '1em';\r
    this.pre.style.position = 'absolute';\r
    this.pre.style.left = '50%';\r
    this.pre.style.top = '50%';\r
    this.pre.style.transform = 'translate(-50%, -50%)';\r
    this.pre.style.zIndex = '9';\r
    this.pre.style.backgroundAttachment = 'fixed';\r
    this.pre.style.mixBlendMode = 'difference';\r
  }\r
\r
  render(scene, camera) {\r
    this.renderer.render(scene, camera);\r
\r
    const w = this.canvas.width;\r
    const h = this.canvas.height;\r
    this.context.clearRect(0, 0, w, h);\r
    if (this.context && w && h) {\r
      this.context.drawImage(this.renderer.domElement, 0, 0, w, h);\r
    }\r
\r
    this.asciify(this.context, w, h);\r
    this.hue();\r
  }\r
\r
  onMouseMove(e) {\r
    this.mouse = { x: e.clientX * PX_RATIO, y: e.clientY * PX_RATIO };\r
  }\r
\r
  get dx() {\r
    return this.mouse.x - this.center.x;\r
  }\r
\r
  get dy() {\r
    return this.mouse.y - this.center.y;\r
  }\r
\r
  hue() {\r
    const deg = (Math.atan2(this.dy, this.dx) * 180) / Math.PI;\r
    this.deg += (deg - this.deg) * 0.075;\r
    this.domElement.style.filter = \`hue-rotate(\${this.deg.toFixed(1)}deg)\`;\r
  }\r
\r
  asciify(ctx, w, h) {\r
    if (w && h) {\r
      const imgData = ctx.getImageData(0, 0, w, h).data;\r
      let str = '';\r
      for (let y = 0; y < h; y++) {\r
        for (let x = 0; x < w; x++) {\r
          const i = x * 4 + y * 4 * w;\r
          const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];\r
\r
          if (a === 0) {\r
            str += ' ';\r
            continue;\r
          }\r
\r
          let gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;\r
          let idx = Math.floor((1 - gray) * (this.charset.length - 1));\r
          if (this.invert) idx = this.charset.length - idx - 1;\r
          str += this.charset[idx];\r
        }\r
        str += '\\n';\r
      }\r
      this.pre.innerHTML = str;\r
    }\r
  }\r
\r
  dispose() {\r
    document.removeEventListener('mousemove', this.onMouseMove);\r
  }\r
}\r
\r
class CanvasTxt {\r
  constructor(txt, { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' } = {}) {\r
    this.canvas = document.createElement('canvas');\r
    this.context = this.canvas.getContext('2d');\r
    this.txt = txt;\r
    this.fontSize = fontSize;\r
    this.fontFamily = fontFamily;\r
    this.color = color;\r
\r
    this.font = \`600 \${this.fontSize}px \${this.fontFamily}\`;\r
  }\r
\r
  resize() {\r
    this.context.font = this.font;\r
    const metrics = this.context.measureText(this.txt);\r
\r
    const textWidth = Math.ceil(metrics.width) + 20;\r
    const textHeight = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20;\r
\r
    this.canvas.width = textWidth;\r
    this.canvas.height = textHeight;\r
  }\r
\r
  render() {\r
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\r
    this.context.fillStyle = this.color;\r
    this.context.font = this.font;\r
\r
    const metrics = this.context.measureText(this.txt);\r
    const yPos = 10 + metrics.actualBoundingBoxAscent;\r
\r
    this.context.fillText(this.txt, 10, yPos);\r
  }\r
\r
  get width() {\r
    return this.canvas.width;\r
  }\r
\r
  get height() {\r
    return this.canvas.height;\r
  }\r
\r
  get texture() {\r
    return this.canvas;\r
  }\r
}\r
\r
class CanvAscii {\r
  constructor(\r
    { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },\r
    containerElem,\r
    width,\r
    height\r
  ) {\r
    this.textString = text;\r
    this.asciiFontSize = asciiFontSize;\r
    this.textFontSize = textFontSize;\r
    this.textColor = textColor;\r
    this.planeBaseHeight = planeBaseHeight;\r
    this.container = containerElem;\r
    this.width = width;\r
    this.height = height;\r
    this.enableWaves = enableWaves;\r
\r
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);\r
    this.camera.position.z = 30;\r
\r
    this.scene = new THREE.Scene();\r
    this.mouse = { x: 0, y: 0 };\r
\r
    this.onMouseMove = this.onMouseMove.bind(this);\r
\r
    this.setMesh();\r
    this.setRenderer();\r
  }\r
\r
  setMesh() {\r
    this.textCanvas = new CanvasTxt(this.textString, {\r
      fontSize: this.textFontSize,\r
      fontFamily: 'IBM Plex Mono',\r
      color: this.textColor\r
    });\r
    this.textCanvas.resize();\r
    this.textCanvas.render();\r
\r
    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);\r
    this.texture.minFilter = THREE.NearestFilter;\r
\r
    const textAspect = this.textCanvas.width / this.textCanvas.height;\r
    const baseH = this.planeBaseHeight;\r
    const planeW = baseH * textAspect;\r
    const planeH = baseH;\r
\r
    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);\r
    this.material = new THREE.ShaderMaterial({\r
      vertexShader,\r
      fragmentShader,\r
      transparent: true,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        mouse: { value: 1.0 },\r
        uTexture: { value: this.texture },\r
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 }\r
      }\r
    });\r
\r
    this.mesh = new THREE.Mesh(this.geometry, this.material);\r
    this.scene.add(this.mesh);\r
  }\r
\r
  setRenderer() {\r
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });\r
    this.renderer.setPixelRatio(1);\r
    this.renderer.setClearColor(0x000000, 0);\r
\r
    this.filter = new AsciiFilter(this.renderer, {\r
      fontFamily: 'IBM Plex Mono',\r
      fontSize: this.asciiFontSize,\r
      invert: true\r
    });\r
\r
    this.container.appendChild(this.filter.domElement);\r
    this.setSize(this.width, this.height);\r
\r
    this.container.addEventListener('mousemove', this.onMouseMove);\r
    this.container.addEventListener('touchmove', this.onMouseMove);\r
  }\r
\r
  setSize(w, h) {\r
    this.width = w;\r
    this.height = h;\r
\r
    this.camera.aspect = w / h;\r
    this.camera.updateProjectionMatrix();\r
\r
    this.filter.setSize(w, h);\r
\r
    this.center = { x: w / 2, y: h / 2 };\r
  }\r
\r
  load() {\r
    this.animate();\r
  }\r
\r
  onMouseMove(evt) {\r
    const e = evt.touches ? evt.touches[0] : evt;\r
    const bounds = this.container.getBoundingClientRect();\r
    const x = e.clientX - bounds.left;\r
    const y = e.clientY - bounds.top;\r
    this.mouse = { x, y };\r
  }\r
\r
  animate() {\r
    const animateFrame = () => {\r
      this.animationFrameId = requestAnimationFrame(animateFrame);\r
      this.render();\r
    };\r
    animateFrame();\r
  }\r
\r
  render() {\r
    const time = new Date().getTime() * 0.001;\r
\r
    this.textCanvas.render();\r
    this.texture.needsUpdate = true;\r
\r
    this.mesh.material.uniforms.uTime.value = Math.sin(time);\r
\r
    this.updateRotation();\r
    this.filter.render(this.scene, this.camera);\r
  }\r
\r
  updateRotation() {\r
    const x = Math.map(this.mouse.y, 0, this.height, 0.5, -0.5);\r
    const y = Math.map(this.mouse.x, 0, this.width, -0.5, 0.5);\r
\r
    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;\r
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;\r
  }\r
\r
  clear() {\r
    this.scene.traverse(obj => {\r
      if (obj.isMesh && typeof obj.material === 'object' && obj.material !== null) {\r
        Object.keys(obj.material).forEach(key => {\r
          const matProp = obj.material[key];\r
          if (matProp !== null && typeof matProp === 'object' && typeof matProp.dispose === 'function') {\r
            matProp.dispose();\r
          }\r
        });\r
        obj.material.dispose();\r
        obj.geometry.dispose();\r
      }\r
    });\r
    this.scene.clear();\r
  }\r
\r
  dispose() {\r
    cancelAnimationFrame(this.animationFrameId);\r
    this.filter.dispose();\r
    this.container.removeChild(this.filter.domElement);\r
    this.container.removeEventListener('mousemove', this.onMouseMove);\r
    this.container.removeEventListener('touchmove', this.onMouseMove);\r
    this.clear();\r
    this.renderer.dispose();\r
  }\r
}\r
\r
export default function ASCIIText({\r
  text = 'David!',\r
  asciiFontSize = 8,\r
  textFontSize = 200,\r
  textColor = '#fdf9f3',\r
  planeBaseHeight = 8,\r
  enableWaves = true\r
}) {\r
  const containerRef = useRef(null);\r
  const asciiRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const { width, height } = containerRef.current.getBoundingClientRect();\r
\r
    if (width === 0 || height === 0) {\r
      const observer = new IntersectionObserver(\r
        ([entry]) => {\r
          if (entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0) {\r
            const { width: w, height: h } = entry.boundingClientRect;\r
\r
            asciiRef.current = new CanvAscii(\r
              { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },\r
              containerRef.current,\r
              w,\r
              h\r
            );\r
            asciiRef.current.load();\r
\r
            observer.disconnect();\r
          }\r
        },\r
        { threshold: 0.1 }\r
      );\r
\r
      observer.observe(containerRef.current);\r
\r
      return () => {\r
        observer.disconnect();\r
        if (asciiRef.current) {\r
          asciiRef.current.dispose();\r
        }\r
      };\r
    }\r
\r
    asciiRef.current = new CanvAscii(\r
      { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },\r
      containerRef.current,\r
      width,\r
      height\r
    );\r
    asciiRef.current.load();\r
\r
    const ro = new ResizeObserver(entries => {\r
      if (!entries[0] || !asciiRef.current) return;\r
      const { width: w, height: h } = entries[0].contentRect;\r
      if (w > 0 && h > 0) {\r
        asciiRef.current.setSize(w, h);\r
      }\r
    });\r
    ro.observe(containerRef.current);\r
\r
    return () => {\r
      ro.disconnect();\r
      if (asciiRef.current) {\r
        asciiRef.current.dispose();\r
      }\r
    };\r
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className="ascii-text-container"\r
      style={{\r
        position: 'absolute',\r
        width: '100%',\r
        height: '100%'\r
      }}\r
    >\r
      <style>{\`\r
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap');\r
\r
        .ascii-text-container canvas {\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          width: 100%;\r
          height: 100%;\r
          image-rendering: optimizeSpeed;\r
          image-rendering: -moz-crisp-edges;\r
          image-rendering: -o-crisp-edges;\r
          image-rendering: -webkit-optimize-contrast;\r
          image-rendering: optimize-contrast;\r
          image-rendering: crisp-edges;\r
          image-rendering: pixelated;\r
        }\r
\r
        .ascii-text-container pre {\r
          margin: 0;\r
          user-select: none;\r
          padding: 0;\r
          line-height: 1em;\r
          text-align: left;\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          background-image: radial-gradient(circle, #ff6188 0%, #fc9867 50%, #ffd866 100%);\r
          background-attachment: fixed;\r
          -webkit-text-fill-color: transparent;\r
          -webkit-background-clip: text;\r
          z-index: 9;\r
          mix-blend-mode: difference;\r
        }\r
      \`}</style>\r
    </div>\r
  );\r
}\r
`,N=`// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE\r
\r
import { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
\r
const vertexShader = \`\r
varying vec2 vUv;\r
uniform float uTime;\r
uniform float mouse;\r
uniform float uEnableWaves;\r
\r
void main() {\r
    vUv = uv;\r
    float time = uTime * 5.;\r
\r
    float waveFactor = uEnableWaves;\r
\r
    vec3 transformed = position;\r
\r
    transformed.x += sin(time + position.y) * 0.5 * waveFactor;\r
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;\r
    transformed.z += sin(time + position.x) * waveFactor;\r
\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
varying vec2 vUv;\r
uniform float mouse;\r
uniform float uTime;\r
uniform sampler2D uTexture;\r
\r
void main() {\r
    float time = uTime;\r
    vec2 pos = vUv;\r
    \r
    float move = sin(time + mouse) * 0.01;\r
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;\r
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;\r
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;\r
    float a = texture2D(uTexture, pos).a;\r
    gl_FragColor = vec4(r, g, b, a);\r
}\r
\`;\r
\r
Math.map = function (n, start, stop, start2, stop2) {\r
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;\r
};\r
\r
const PX_RATIO = typeof window !== 'undefined' ? window.devicePixelRatio : 1;\r
\r
class AsciiFilter {\r
  constructor(renderer, { fontSize, fontFamily, charset, invert } = {}) {\r
    this.renderer = renderer;\r
    this.domElement = document.createElement('div');\r
    this.domElement.style.position = 'absolute';\r
    this.domElement.style.top = '0';\r
    this.domElement.style.left = '0';\r
    this.domElement.style.width = '100%';\r
    this.domElement.style.height = '100%';\r
\r
    this.pre = document.createElement('pre');\r
    this.domElement.appendChild(this.pre);\r
\r
    this.canvas = document.createElement('canvas');\r
    this.context = this.canvas.getContext('2d');\r
    this.domElement.appendChild(this.canvas);\r
\r
    this.deg = 0;\r
    this.invert = invert ?? true;\r
    this.fontSize = fontSize ?? 12;\r
    this.fontFamily = fontFamily ?? "'Courier New', monospace";\r
    this.charset = charset ?? ' .\\'\`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';\r
\r
    this.context.webkitImageSmoothingEnabled = false;\r
    this.context.mozImageSmoothingEnabled = false;\r
    this.context.msImageSmoothingEnabled = false;\r
    this.context.imageSmoothingEnabled = false;\r
\r
    this.onMouseMove = this.onMouseMove.bind(this);\r
    document.addEventListener('mousemove', this.onMouseMove);\r
  }\r
\r
  setSize(width, height) {\r
    this.width = width;\r
    this.height = height;\r
    this.renderer.setSize(width, height);\r
    this.reset();\r
\r
    this.center = { x: width / 2, y: height / 2 };\r
    this.mouse = { x: this.center.x, y: this.center.y };\r
  }\r
\r
  reset() {\r
    this.context.font = \`\${this.fontSize}px \${this.fontFamily}\`;\r
    const charWidth = this.context.measureText('A').width;\r
\r
    this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)));\r
    this.rows = Math.floor(this.height / this.fontSize);\r
\r
    this.canvas.width = this.cols;\r
    this.canvas.height = this.rows;\r
    this.pre.style.fontFamily = this.fontFamily;\r
    this.pre.style.fontSize = \`\${this.fontSize}px\`;\r
    this.pre.style.margin = '0';\r
    this.pre.style.padding = '0';\r
    this.pre.style.lineHeight = '1em';\r
    this.pre.style.position = 'absolute';\r
    this.pre.style.left = '0';\r
    this.pre.style.top = '0';\r
    this.pre.style.zIndex = '9';\r
    this.pre.style.backgroundAttachment = 'fixed';\r
    this.pre.style.mixBlendMode = 'difference';\r
  }\r
\r
  render(scene, camera) {\r
    this.renderer.render(scene, camera);\r
\r
    const w = this.canvas.width;\r
    const h = this.canvas.height;\r
    this.context.clearRect(0, 0, w, h);\r
    if (this.context && w && h) {\r
      this.context.drawImage(this.renderer.domElement, 0, 0, w, h);\r
    }\r
\r
    this.asciify(this.context, w, h);\r
    this.hue();\r
  }\r
\r
  onMouseMove(e) {\r
    this.mouse = { x: e.clientX * PX_RATIO, y: e.clientY * PX_RATIO };\r
  }\r
\r
  get dx() {\r
    return this.mouse.x - this.center.x;\r
  }\r
\r
  get dy() {\r
    return this.mouse.y - this.center.y;\r
  }\r
\r
  hue() {\r
    const deg = (Math.atan2(this.dy, this.dx) * 180) / Math.PI;\r
    this.deg += (deg - this.deg) * 0.075;\r
    this.domElement.style.filter = \`hue-rotate(\${this.deg.toFixed(1)}deg)\`;\r
  }\r
\r
  asciify(ctx, w, h) {\r
    if (w && h) {\r
      const imgData = ctx.getImageData(0, 0, w, h).data;\r
      let str = '';\r
      for (let y = 0; y < h; y++) {\r
        for (let x = 0; x < w; x++) {\r
          const i = x * 4 + y * 4 * w;\r
          const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];\r
\r
          if (a === 0) {\r
            str += ' ';\r
            continue;\r
          }\r
\r
          let gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;\r
          let idx = Math.floor((1 - gray) * (this.charset.length - 1));\r
          if (this.invert) idx = this.charset.length - idx - 1;\r
          str += this.charset[idx];\r
        }\r
        str += '\\n';\r
      }\r
      this.pre.innerHTML = str;\r
    }\r
  }\r
\r
  dispose() {\r
    document.removeEventListener('mousemove', this.onMouseMove);\r
  }\r
}\r
\r
class CanvasTxt {\r
  constructor(txt, { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' } = {}) {\r
    this.canvas = document.createElement('canvas');\r
    this.context = this.canvas.getContext('2d');\r
    this.txt = txt;\r
    this.fontSize = fontSize;\r
    this.fontFamily = fontFamily;\r
    this.color = color;\r
\r
    this.font = \`600 \${this.fontSize}px \${this.fontFamily}\`;\r
  }\r
\r
  resize() {\r
    this.context.font = this.font;\r
    const metrics = this.context.measureText(this.txt);\r
\r
    const textWidth = Math.ceil(metrics.width) + 20;\r
    const textHeight = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20;\r
\r
    this.canvas.width = textWidth;\r
    this.canvas.height = textHeight;\r
  }\r
\r
  render() {\r
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\r
    this.context.fillStyle = this.color;\r
    this.context.font = this.font;\r
\r
    const metrics = this.context.measureText(this.txt);\r
    const yPos = 10 + metrics.actualBoundingBoxAscent;\r
\r
    this.context.fillText(this.txt, 10, yPos);\r
  }\r
\r
  get width() {\r
    return this.canvas.width;\r
  }\r
\r
  get height() {\r
    return this.canvas.height;\r
  }\r
\r
  get texture() {\r
    return this.canvas;\r
  }\r
}\r
\r
class CanvAscii {\r
  constructor(\r
    { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },\r
    containerElem,\r
    width,\r
    height\r
  ) {\r
    this.textString = text;\r
    this.asciiFontSize = asciiFontSize;\r
    this.textFontSize = textFontSize;\r
    this.textColor = textColor;\r
    this.planeBaseHeight = planeBaseHeight;\r
    this.container = containerElem;\r
    this.width = width;\r
    this.height = height;\r
    this.enableWaves = enableWaves;\r
\r
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);\r
    this.camera.position.z = 30;\r
\r
    this.scene = new THREE.Scene();\r
    this.mouse = { x: 0, y: 0 };\r
\r
    this.onMouseMove = this.onMouseMove.bind(this);\r
\r
    this.setMesh();\r
    this.setRenderer();\r
  }\r
\r
  setMesh() {\r
    this.textCanvas = new CanvasTxt(this.textString, {\r
      fontSize: this.textFontSize,\r
      fontFamily: 'IBM Plex Mono',\r
      color: this.textColor\r
    });\r
    this.textCanvas.resize();\r
    this.textCanvas.render();\r
\r
    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);\r
    this.texture.minFilter = THREE.NearestFilter;\r
\r
    const textAspect = this.textCanvas.width / this.textCanvas.height;\r
    const baseH = this.planeBaseHeight;\r
    const planeW = baseH * textAspect;\r
    const planeH = baseH;\r
\r
    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);\r
    this.material = new THREE.ShaderMaterial({\r
      vertexShader,\r
      fragmentShader,\r
      transparent: true,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        mouse: { value: 1.0 },\r
        uTexture: { value: this.texture },\r
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 }\r
      }\r
    });\r
\r
    this.mesh = new THREE.Mesh(this.geometry, this.material);\r
    this.scene.add(this.mesh);\r
  }\r
\r
  setRenderer() {\r
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });\r
    this.renderer.setPixelRatio(1);\r
    this.renderer.setClearColor(0x000000, 0);\r
\r
    this.filter = new AsciiFilter(this.renderer, {\r
      fontFamily: 'IBM Plex Mono',\r
      fontSize: this.asciiFontSize,\r
      invert: true\r
    });\r
\r
    this.container.appendChild(this.filter.domElement);\r
    this.setSize(this.width, this.height);\r
\r
    this.container.addEventListener('mousemove', this.onMouseMove);\r
    this.container.addEventListener('touchmove', this.onMouseMove);\r
  }\r
\r
  setSize(w, h) {\r
    this.width = w;\r
    this.height = h;\r
\r
    this.camera.aspect = w / h;\r
    this.camera.updateProjectionMatrix();\r
\r
    this.filter.setSize(w, h);\r
\r
    this.center = { x: w / 2, y: h / 2 };\r
  }\r
\r
  load() {\r
    this.animate();\r
  }\r
\r
  onMouseMove(evt) {\r
    const e = evt.touches ? evt.touches[0] : evt;\r
    const bounds = this.container.getBoundingClientRect();\r
    const x = e.clientX - bounds.left;\r
    const y = e.clientY - bounds.top;\r
    this.mouse = { x, y };\r
  }\r
\r
  animate() {\r
    const animateFrame = () => {\r
      this.animationFrameId = requestAnimationFrame(animateFrame);\r
      this.render();\r
    };\r
    animateFrame();\r
  }\r
\r
  render() {\r
    const time = new Date().getTime() * 0.001;\r
\r
    this.textCanvas.render();\r
    this.texture.needsUpdate = true;\r
\r
    this.mesh.material.uniforms.uTime.value = Math.sin(time);\r
\r
    this.updateRotation();\r
    this.filter.render(this.scene, this.camera);\r
  }\r
\r
  updateRotation() {\r
    const x = Math.map(this.mouse.y, 0, this.height, 0.5, -0.5);\r
    const y = Math.map(this.mouse.x, 0, this.width, -0.5, 0.5);\r
\r
    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;\r
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;\r
  }\r
\r
  clear() {\r
    this.scene.traverse(obj => {\r
      if (obj.isMesh && typeof obj.material === 'object' && obj.material !== null) {\r
        Object.keys(obj.material).forEach(key => {\r
          const matProp = obj.material[key];\r
          if (matProp !== null && typeof matProp === 'object' && typeof matProp.dispose === 'function') {\r
            matProp.dispose();\r
          }\r
        });\r
        obj.material.dispose();\r
        obj.geometry.dispose();\r
      }\r
    });\r
    this.scene.clear();\r
  }\r
\r
  dispose() {\r
    cancelAnimationFrame(this.animationFrameId);\r
    this.filter.dispose();\r
    this.container.removeChild(this.filter.domElement);\r
    this.container.removeEventListener('mousemove', this.onMouseMove);\r
    this.container.removeEventListener('touchmove', this.onMouseMove);\r
    this.clear();\r
    this.renderer.dispose();\r
  }\r
}\r
\r
export default function ASCIIText({\r
  text = 'David!',\r
  asciiFontSize = 8,\r
  textFontSize = 200,\r
  textColor = '#fdf9f3',\r
  planeBaseHeight = 8,\r
  enableWaves = true\r
}) {\r
  const containerRef = useRef(null);\r
  const asciiRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const { width, height } = containerRef.current.getBoundingClientRect();\r
\r
    if (width === 0 || height === 0) {\r
      const observer = new IntersectionObserver(\r
        ([entry]) => {\r
          if (entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0) {\r
            const { width: w, height: h } = entry.boundingClientRect;\r
\r
            asciiRef.current = new CanvAscii(\r
              { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },\r
              containerRef.current,\r
              w,\r
              h\r
            );\r
            asciiRef.current.load();\r
\r
            observer.disconnect();\r
          }\r
        },\r
        { threshold: 0.1 }\r
      );\r
\r
      observer.observe(containerRef.current);\r
\r
      return () => {\r
        observer.disconnect();\r
        if (asciiRef.current) {\r
          asciiRef.current.dispose();\r
        }\r
      };\r
    }\r
\r
    asciiRef.current = new CanvAscii(\r
      { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },\r
      containerRef.current,\r
      width,\r
      height\r
    );\r
    asciiRef.current.load();\r
\r
    const ro = new ResizeObserver(entries => {\r
      if (!entries[0] || !asciiRef.current) return;\r
      const { width: w, height: h } = entries[0].contentRect;\r
      if (w > 0 && h > 0) {\r
        asciiRef.current.setSize(w, h);\r
      }\r
    });\r
    ro.observe(containerRef.current);\r
\r
    return () => {\r
      ro.disconnect();\r
      if (asciiRef.current) {\r
        asciiRef.current.dispose();\r
      }\r
    };\r
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className="ascii-text-container"\r
      style={{\r
        position: 'absolute',\r
        width: '100%',\r
        height: '100%'\r
      }}\r
    >\r
      <style>{\`\r
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap');\r
\r
        body {\r
          margin: 0;\r
          padding: 0;\r
        }\r
\r
        .ascii-text-container canvas {\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          width: 100%;\r
          height: 100%;\r
          image-rendering: optimizeSpeed;\r
          image-rendering: -moz-crisp-edges;\r
          image-rendering: -o-crisp-edges;\r
          image-rendering: -webkit-optimize-contrast;\r
          image-rendering: optimize-contrast;\r
          image-rendering: crisp-edges;\r
          image-rendering: pixelated;\r
        }\r
\r
        .ascii-text-container pre {\r
          margin: 0;\r
          user-select: none;\r
          padding: 0;\r
          line-height: 1em;\r
          text-align: left;\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          background-image: radial-gradient(circle, #ff6188 0%, #fc9867 50%, #ffd866 100%);\r
          background-attachment: fixed;\r
          -webkit-text-fill-color: transparent;\r
          -webkit-background-clip: text;\r
          z-index: 9;\r
          mix-blend-mode: difference;\r
        }\r
      \`}</style>\r
    </div>\r
  );\r
}\r
`,Y=`// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE\r
\r
import { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
\r
const vertexShader = \`\r
varying vec2 vUv;\r
uniform float uTime;\r
uniform float mouse;\r
uniform float uEnableWaves;\r
\r
void main() {\r
    vUv = uv;\r
    float time = uTime * 5.;\r
\r
    float waveFactor = uEnableWaves;\r
\r
    vec3 transformed = position;\r
\r
    transformed.x += sin(time + position.y) * 0.5 * waveFactor;\r
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;\r
    transformed.z += sin(time + position.x) * waveFactor;\r
\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
varying vec2 vUv;\r
uniform float mouse;\r
uniform float uTime;\r
uniform sampler2D uTexture;\r
\r
void main() {\r
    float time = uTime;\r
    vec2 pos = vUv;\r
    \r
    float move = sin(time + mouse) * 0.01;\r
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;\r
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;\r
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;\r
    float a = texture2D(uTexture, pos).a;\r
    gl_FragColor = vec4(r, g, b, a);\r
}\r
\`;\r
\r
function map(n: number, start: number, stop: number, start2: number, stop2: number) {\r
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;\r
}\r
\r
const PX_RATIO = typeof window !== 'undefined' ? window.devicePixelRatio : 1;\r
\r
interface AsciiFilterOptions {\r
  fontSize?: number;\r
  fontFamily?: string;\r
  charset?: string;\r
  invert?: boolean;\r
}\r
\r
class AsciiFilter {\r
  renderer!: THREE.WebGLRenderer;\r
  domElement: HTMLDivElement;\r
  pre: HTMLPreElement;\r
  canvas: HTMLCanvasElement;\r
  context: CanvasRenderingContext2D | null;\r
  deg: number;\r
  invert: boolean;\r
  fontSize: number;\r
  fontFamily: string;\r
  charset: string;\r
  width: number = 0;\r
  height: number = 0;\r
  center: { x: number; y: number } = { x: 0, y: 0 };\r
  mouse: { x: number; y: number } = { x: 0, y: 0 };\r
  cols: number = 0;\r
  rows: number = 0;\r
\r
  constructor(renderer: THREE.WebGLRenderer, { fontSize, fontFamily, charset, invert }: AsciiFilterOptions = {}) {\r
    this.renderer = renderer;\r
    this.domElement = document.createElement('div');\r
    this.domElement.style.position = 'absolute';\r
    this.domElement.style.top = '0';\r
    this.domElement.style.left = '0';\r
    this.domElement.style.width = '100%';\r
    this.domElement.style.height = '100%';\r
\r
    this.pre = document.createElement('pre');\r
    this.domElement.appendChild(this.pre);\r
\r
    this.canvas = document.createElement('canvas');\r
    this.context = this.canvas.getContext('2d');\r
    this.domElement.appendChild(this.canvas);\r
\r
    this.deg = 0;\r
    this.invert = invert ?? true;\r
    this.fontSize = fontSize ?? 12;\r
    this.fontFamily = fontFamily ?? "'Courier New', monospace";\r
    this.charset = charset ?? ' .\\'\`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';\r
\r
    if (this.context) {\r
      this.context.imageSmoothingEnabled = false;\r
      this.context.imageSmoothingEnabled = false;\r
    }\r
\r
    this.onMouseMove = this.onMouseMove.bind(this);\r
    document.addEventListener('mousemove', this.onMouseMove);\r
  }\r
\r
  setSize(width: number, height: number) {\r
    this.width = width;\r
    this.height = height;\r
    this.renderer.setSize(width, height);\r
    this.reset();\r
\r
    this.center = { x: width / 2, y: height / 2 };\r
    this.mouse = { x: this.center.x, y: this.center.y };\r
  }\r
\r
  reset() {\r
    if (this.context) {\r
      this.context.font = \`\${this.fontSize}px \${this.fontFamily}\`;\r
      const charWidth = this.context.measureText('A').width;\r
\r
      this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)));\r
      this.rows = Math.floor(this.height / this.fontSize);\r
\r
      this.canvas.width = this.cols;\r
      this.canvas.height = this.rows;\r
      this.pre.style.fontFamily = this.fontFamily;\r
      this.pre.style.fontSize = \`\${this.fontSize}px\`;\r
      this.pre.style.margin = '0';\r
      this.pre.style.padding = '0';\r
      this.pre.style.lineHeight = '1em';\r
      this.pre.style.position = 'absolute';\r
      this.pre.style.left = '50%';\r
      this.pre.style.top = '50%';\r
      this.pre.style.transform = 'translate(-50%, -50%)';\r
      this.pre.style.zIndex = '9';\r
      this.pre.style.backgroundAttachment = 'fixed';\r
      this.pre.style.mixBlendMode = 'difference';\r
    }\r
  }\r
\r
  render(scene: THREE.Scene, camera: THREE.Camera) {\r
    this.renderer.render(scene, camera);\r
\r
    const w = this.canvas.width;\r
    const h = this.canvas.height;\r
    if (this.context) {\r
      this.context.clearRect(0, 0, w, h);\r
      this.context.drawImage(this.renderer.domElement, 0, 0, w, h);\r
      this.asciify(this.context, w, h);\r
      this.hue();\r
    }\r
  }\r
\r
  onMouseMove(e: MouseEvent) {\r
    this.mouse = { x: e.clientX * PX_RATIO, y: e.clientY * PX_RATIO };\r
  }\r
\r
  get dx() {\r
    return this.mouse.x - this.center.x;\r
  }\r
\r
  get dy() {\r
    return this.mouse.y - this.center.y;\r
  }\r
\r
  hue() {\r
    const deg = (Math.atan2(this.dy, this.dx) * 180) / Math.PI;\r
    this.deg += (deg - this.deg) * 0.075;\r
    this.domElement.style.filter = \`hue-rotate(\${this.deg.toFixed(1)}deg)\`;\r
  }\r
\r
  asciify(ctx: CanvasRenderingContext2D, w: number, h: number) {\r
    const imgData = ctx.getImageData(0, 0, w, h).data;\r
    let str = '';\r
    for (let y = 0; y < h; y++) {\r
      for (let x = 0; x < w; x++) {\r
        const i = x * 4 + y * 4 * w;\r
        const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];\r
\r
        if (a === 0) {\r
          str += ' ';\r
          continue;\r
        }\r
\r
        let gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;\r
        let idx = Math.floor((1 - gray) * (this.charset.length - 1));\r
        if (this.invert) idx = this.charset.length - idx - 1;\r
        str += this.charset[idx];\r
      }\r
      str += '\\n';\r
    }\r
    this.pre.innerHTML = str;\r
  }\r
\r
  dispose() {\r
    document.removeEventListener('mousemove', this.onMouseMove);\r
  }\r
}\r
\r
interface CanvasTxtOptions {\r
  fontSize?: number;\r
  fontFamily?: string;\r
  color?: string;\r
}\r
\r
class CanvasTxt {\r
  canvas: HTMLCanvasElement;\r
  context: CanvasRenderingContext2D | null;\r
  txt: string;\r
  fontSize: number;\r
  fontFamily: string;\r
  color: string;\r
  font: string;\r
\r
  constructor(txt: string, { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' }: CanvasTxtOptions = {}) {\r
    this.canvas = document.createElement('canvas');\r
    this.context = this.canvas.getContext('2d');\r
    this.txt = txt;\r
    this.fontSize = fontSize;\r
    this.fontFamily = fontFamily;\r
    this.color = color;\r
\r
    this.font = \`600 \${this.fontSize}px \${this.fontFamily}\`;\r
  }\r
\r
  resize() {\r
    if (this.context) {\r
      this.context.font = this.font;\r
      const metrics = this.context.measureText(this.txt);\r
\r
      const textWidth = Math.ceil(metrics.width) + 20;\r
      const textHeight = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20;\r
\r
      this.canvas.width = textWidth;\r
      this.canvas.height = textHeight;\r
    }\r
  }\r
\r
  render() {\r
    if (this.context) {\r
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\r
      this.context.fillStyle = this.color;\r
      this.context.font = this.font;\r
\r
      const metrics = this.context.measureText(this.txt);\r
      const yPos = 10 + metrics.actualBoundingBoxAscent;\r
\r
      this.context.fillText(this.txt, 10, yPos);\r
    }\r
  }\r
\r
  get width() {\r
    return this.canvas.width;\r
  }\r
\r
  get height() {\r
    return this.canvas.height;\r
  }\r
\r
  get texture() {\r
    return this.canvas;\r
  }\r
}\r
\r
interface CanvAsciiOptions {\r
  text: string;\r
  asciiFontSize: number;\r
  textFontSize: number;\r
  textColor: string;\r
  planeBaseHeight: number;\r
  enableWaves: boolean;\r
}\r
\r
class CanvAscii {\r
  textString: string;\r
  asciiFontSize: number;\r
  textFontSize: number;\r
  textColor: string;\r
  planeBaseHeight: number;\r
  container: HTMLElement;\r
  width: number;\r
  height: number;\r
  enableWaves: boolean;\r
  camera: THREE.PerspectiveCamera;\r
  scene: THREE.Scene;\r
  mouse: { x: number; y: number };\r
  textCanvas!: CanvasTxt;\r
  texture!: THREE.CanvasTexture;\r
  geometry: THREE.PlaneGeometry | undefined;\r
  material: THREE.ShaderMaterial | undefined;\r
  mesh!: THREE.Mesh;\r
  renderer!: THREE.WebGLRenderer;\r
  filter!: AsciiFilter;\r
  center: { x: number; y: number } = { x: 0, y: 0 };\r
  animationFrameId: number = 0;\r
\r
  constructor(\r
    { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves }: CanvAsciiOptions,\r
    containerElem: HTMLElement,\r
    width: number,\r
    height: number\r
  ) {\r
    this.textString = text;\r
    this.asciiFontSize = asciiFontSize;\r
    this.textFontSize = textFontSize;\r
    this.textColor = textColor;\r
    this.planeBaseHeight = planeBaseHeight;\r
    this.container = containerElem;\r
    this.width = width;\r
    this.height = height;\r
    this.enableWaves = enableWaves;\r
\r
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);\r
    this.camera.position.z = 30;\r
\r
    this.scene = new THREE.Scene();\r
    this.mouse = { x: 0, y: 0 };\r
\r
    this.onMouseMove = this.onMouseMove.bind(this);\r
\r
    this.setMesh();\r
    this.setRenderer();\r
  }\r
\r
  setMesh() {\r
    this.textCanvas = new CanvasTxt(this.textString, {\r
      fontSize: this.textFontSize,\r
      fontFamily: 'IBM Plex Mono',\r
      color: this.textColor\r
    });\r
    this.textCanvas.resize();\r
    this.textCanvas.render();\r
\r
    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);\r
    this.texture.minFilter = THREE.NearestFilter;\r
\r
    const textAspect = this.textCanvas.width / this.textCanvas.height;\r
    const baseH = this.planeBaseHeight;\r
    const planeW = baseH * textAspect;\r
    const planeH = baseH;\r
\r
    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);\r
    this.material = new THREE.ShaderMaterial({\r
      vertexShader,\r
      fragmentShader,\r
      transparent: true,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        mouse: { value: 1.0 },\r
        uTexture: { value: this.texture },\r
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 }\r
      }\r
    });\r
\r
    this.mesh = new THREE.Mesh(this.geometry, this.material);\r
    this.scene.add(this.mesh);\r
  }\r
\r
  setRenderer() {\r
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });\r
    this.renderer.setPixelRatio(1);\r
    this.renderer.setClearColor(0x000000, 0);\r
\r
    this.filter = new AsciiFilter(this.renderer, {\r
      fontFamily: 'IBM Plex Mono',\r
      fontSize: this.asciiFontSize,\r
      invert: true\r
    });\r
\r
    this.container.appendChild(this.filter.domElement);\r
    this.setSize(this.width, this.height);\r
\r
    this.container.addEventListener('mousemove', this.onMouseMove);\r
    this.container.addEventListener('touchmove', this.onMouseMove);\r
  }\r
\r
  setSize(w: number, h: number) {\r
    this.width = w;\r
    this.height = h;\r
\r
    this.camera.aspect = w / h;\r
    this.camera.updateProjectionMatrix();\r
\r
    this.filter.setSize(w, h);\r
\r
    this.center = { x: w / 2, y: h / 2 };\r
  }\r
\r
  load() {\r
    this.animate();\r
  }\r
\r
  onMouseMove(evt: MouseEvent | TouchEvent) {\r
    const e = (evt as TouchEvent).touches ? (evt as TouchEvent).touches[0] : (evt as MouseEvent);\r
    const bounds = this.container.getBoundingClientRect();\r
    const x = e.clientX - bounds.left;\r
    const y = e.clientY - bounds.top;\r
    this.mouse = { x, y };\r
  }\r
\r
  animate() {\r
    const animateFrame = () => {\r
      this.animationFrameId = requestAnimationFrame(animateFrame);\r
      this.render();\r
    };\r
    animateFrame();\r
  }\r
\r
  render() {\r
    const time = new Date().getTime() * 0.001;\r
\r
    this.textCanvas.render();\r
    this.texture.needsUpdate = true;\r
\r
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = Math.sin(time);\r
\r
    this.updateRotation();\r
    this.filter.render(this.scene, this.camera);\r
  }\r
\r
  updateRotation() {\r
    const x = map(this.mouse.y, 0, this.height, 0.5, -0.5);\r
    const y = map(this.mouse.x, 0, this.width, -0.5, 0.5);\r
\r
    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;\r
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;\r
  }\r
\r
  clear() {\r
    this.scene.traverse(object => {\r
      const obj = object as unknown as THREE.Mesh;\r
      if (!obj.isMesh) return;\r
      [obj.material].flat().forEach(material => {\r
        material.dispose();\r
        Object.keys(material).forEach(key => {\r
          const matProp = material[key as keyof typeof material];\r
          if (matProp && typeof matProp === 'object' && 'dispose' in matProp && typeof matProp.dispose === 'function') {\r
            matProp.dispose();\r
          }\r
        });\r
      });\r
      obj.geometry.dispose();\r
    });\r
    this.scene.clear();\r
  }\r
\r
  dispose() {\r
    cancelAnimationFrame(this.animationFrameId);\r
    this.filter.dispose();\r
    this.container.removeChild(this.filter.domElement);\r
    this.container.removeEventListener('mousemove', this.onMouseMove);\r
    this.container.removeEventListener('touchmove', this.onMouseMove);\r
    this.clear();\r
    this.renderer.dispose();\r
  }\r
}\r
\r
interface ASCIITextProps {\r
  text?: string;\r
  asciiFontSize?: number;\r
  textFontSize?: number;\r
  textColor?: string;\r
  planeBaseHeight?: number;\r
  enableWaves?: boolean;\r
}\r
\r
export default function ASCIIText({\r
  text = 'David!',\r
  asciiFontSize = 8,\r
  textFontSize = 200,\r
  textColor = '#fdf9f3',\r
  planeBaseHeight = 8,\r
  enableWaves = true\r
}: ASCIITextProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const asciiRef = useRef<CanvAscii | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const { width, height } = containerRef.current.getBoundingClientRect();\r
\r
    if (width === 0 || height === 0) {\r
      const observer = new IntersectionObserver(\r
        ([entry]) => {\r
          if (entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0) {\r
            const { width: w, height: h } = entry.boundingClientRect;\r
\r
            asciiRef.current = new CanvAscii(\r
              {\r
                text,\r
                asciiFontSize,\r
                textFontSize,\r
                textColor,\r
                planeBaseHeight,\r
                enableWaves\r
              },\r
              containerRef.current!,\r
              w,\r
              h\r
            );\r
            asciiRef.current.load();\r
\r
            observer.disconnect();\r
          }\r
        },\r
        { threshold: 0.1 }\r
      );\r
\r
      observer.observe(containerRef.current);\r
\r
      return () => {\r
        observer.disconnect();\r
        if (asciiRef.current) {\r
          asciiRef.current.dispose();\r
        }\r
      };\r
    }\r
\r
    asciiRef.current = new CanvAscii(\r
      {\r
        text,\r
        asciiFontSize,\r
        textFontSize,\r
        textColor,\r
        planeBaseHeight,\r
        enableWaves\r
      },\r
      containerRef.current,\r
      width,\r
      height\r
    );\r
    asciiRef.current.load();\r
\r
    const ro = new ResizeObserver(entries => {\r
      if (!entries[0] || !asciiRef.current) return;\r
      const { width: w, height: h } = entries[0].contentRect;\r
      if (w > 0 && h > 0) {\r
        asciiRef.current.setSize(w, h);\r
      }\r
    });\r
    ro.observe(containerRef.current);\r
\r
    return () => {\r
      ro.disconnect();\r
      asciiRef.current?.dispose();\r
    };\r
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className="ascii-text-container"\r
      style={{\r
        position: 'absolute',\r
        width: '100%',\r
        height: '100%'\r
      }}\r
    >\r
      <style>{\`\r
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap');\r
\r
        body {\r
          margin: 0;\r
          padding: 0;\r
        }\r
\r
        .ascii-text-container canvas {\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          width: 100%;\r
          height: 100%;\r
          image-rendering: optimizeSpeed;\r
          image-rendering: -moz-crisp-edges;\r
          image-rendering: -o-crisp-edges;\r
          image-rendering: -webkit-optimize-contrast;\r
          image-rendering: optimize-contrast;\r
          image-rendering: crisp-edges;\r
          image-rendering: pixelated;\r
        }\r
\r
        .ascii-text-container pre {\r
          margin: 0;\r
          user-select: none;\r
          padding: 0;\r
          line-height: 1em;\r
          text-align: left;\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          background-image: radial-gradient(circle, #ff6188 0%, #fc9867 50%, #ffd866 100%);\r
          background-attachment: fixed;\r
          -webkit-text-fill-color: transparent;\r
          -webkit-background-clip: text;\r
          z-index: 9;\r
          mix-blend-mode: difference;\r
        }\r
      \`}</style>\r
    </div>\r
  );\r
}\r
`,G=`// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE\r
\r
import { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
\r
const vertexShader = \`\r
varying vec2 vUv;\r
uniform float uTime;\r
uniform float mouse;\r
uniform float uEnableWaves;\r
\r
void main() {\r
    vUv = uv;\r
    float time = uTime * 5.;\r
\r
    float waveFactor = uEnableWaves;\r
\r
    vec3 transformed = position;\r
\r
    transformed.x += sin(time + position.y) * 0.5 * waveFactor;\r
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;\r
    transformed.z += sin(time + position.x) * waveFactor;\r
\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
varying vec2 vUv;\r
uniform float mouse;\r
uniform float uTime;\r
uniform sampler2D uTexture;\r
\r
void main() {\r
    float time = uTime;\r
    vec2 pos = vUv;\r
    \r
    float move = sin(time + mouse) * 0.01;\r
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;\r
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;\r
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;\r
    float a = texture2D(uTexture, pos).a;\r
    gl_FragColor = vec4(r, g, b, a);\r
}\r
\`;\r
\r
function map(n: number, start: number, stop: number, start2: number, stop2: number) {\r
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;\r
}\r
\r
const PX_RATIO = typeof window !== 'undefined' ? window.devicePixelRatio : 1;\r
\r
interface AsciiFilterOptions {\r
  fontSize?: number;\r
  fontFamily?: string;\r
  charset?: string;\r
  invert?: boolean;\r
}\r
\r
class AsciiFilter {\r
  renderer: THREE.WebGLRenderer;\r
  domElement: HTMLDivElement;\r
  pre: HTMLPreElement;\r
  canvas: HTMLCanvasElement;\r
  context: CanvasRenderingContext2D | null;\r
  deg: number;\r
  invert: boolean;\r
  fontSize: number;\r
  fontFamily: string;\r
  charset: string;\r
  width: number = 0;\r
  height: number = 0;\r
  center: { x: number; y: number } = { x: 0, y: 0 };\r
  mouse: { x: number; y: number } = { x: 0, y: 0 };\r
  cols: number = 0;\r
  rows: number = 0;\r
\r
  constructor(renderer: THREE.WebGLRenderer, { fontSize, fontFamily, charset, invert }: AsciiFilterOptions = {}) {\r
    this.renderer = renderer;\r
    this.domElement = document.createElement('div');\r
    this.domElement.style.position = 'absolute';\r
    this.domElement.style.top = '0';\r
    this.domElement.style.left = '0';\r
    this.domElement.style.width = '100%';\r
    this.domElement.style.height = '100%';\r
\r
    this.pre = document.createElement('pre');\r
    this.domElement.appendChild(this.pre);\r
\r
    this.canvas = document.createElement('canvas');\r
    this.context = this.canvas.getContext('2d');\r
    this.domElement.appendChild(this.canvas);\r
\r
    this.deg = 0;\r
    this.invert = invert ?? true;\r
    this.fontSize = fontSize ?? 12;\r
    this.fontFamily = fontFamily ?? "'Courier New', monospace";\r
    this.charset = charset ?? ' .\\'\`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';\r
\r
    if (this.context) {\r
      this.context.imageSmoothingEnabled = false;\r
      this.context.imageSmoothingEnabled = false;\r
    }\r
\r
    this.onMouseMove = this.onMouseMove.bind(this);\r
    document.addEventListener('mousemove', this.onMouseMove);\r
  }\r
\r
  setSize(width: number, height: number) {\r
    this.width = width;\r
    this.height = height;\r
    this.renderer.setSize(width, height);\r
    this.reset();\r
\r
    this.center = { x: width / 2, y: height / 2 };\r
    this.mouse = { x: this.center.x, y: this.center.y };\r
  }\r
\r
  reset() {\r
    if (this.context) {\r
      this.context.font = \`\${this.fontSize}px \${this.fontFamily}\`;\r
      const charWidth = this.context.measureText('A').width;\r
\r
      this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)));\r
      this.rows = Math.floor(this.height / this.fontSize);\r
\r
      this.canvas.width = this.cols;\r
      this.canvas.height = this.rows;\r
      this.pre.style.fontFamily = this.fontFamily;\r
      this.pre.style.fontSize = \`\${this.fontSize}px\`;\r
      this.pre.style.margin = '0';\r
      this.pre.style.padding = '0';\r
      this.pre.style.lineHeight = '1em';\r
      this.pre.style.position = 'absolute';\r
      this.pre.style.left = '50%';\r
      this.pre.style.top = '50%';\r
      this.pre.style.transform = 'translate(-50%, -50%)';\r
      this.pre.style.zIndex = '9';\r
      this.pre.style.backgroundAttachment = 'fixed';\r
      this.pre.style.mixBlendMode = 'difference';\r
    }\r
  }\r
\r
  render(scene: THREE.Scene, camera: THREE.Camera) {\r
    this.renderer.render(scene, camera);\r
\r
    const w = this.canvas.width;\r
    const h = this.canvas.height;\r
    if (this.context) {\r
      this.context.clearRect(0, 0, w, h);\r
      if (this.context && w && h) {\r
        this.context.drawImage(this.renderer.domElement, 0, 0, w, h);\r
      }\r
\r
      this.asciify(this.context, w, h);\r
      this.hue();\r
    }\r
  }\r
\r
  onMouseMove(e: MouseEvent) {\r
    this.mouse = { x: e.clientX * PX_RATIO, y: e.clientY * PX_RATIO };\r
  }\r
\r
  get dx() {\r
    return this.mouse.x - this.center.x;\r
  }\r
\r
  get dy() {\r
    return this.mouse.y - this.center.y;\r
  }\r
\r
  hue() {\r
    const deg = (Math.atan2(this.dy, this.dx) * 180) / Math.PI;\r
    this.deg += (deg - this.deg) * 0.075;\r
    this.domElement.style.filter = \`hue-rotate(\${this.deg.toFixed(1)}deg)\`;\r
  }\r
\r
  asciify(ctx: CanvasRenderingContext2D, w: number, h: number) {\r
    if (w && h) {\r
      const imgData = ctx.getImageData(0, 0, w, h).data;\r
      let str = '';\r
      for (let y = 0; y < h; y++) {\r
        for (let x = 0; x < w; x++) {\r
          const i = x * 4 + y * 4 * w;\r
          const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];\r
\r
          if (a === 0) {\r
            str += ' ';\r
            continue;\r
          }\r
\r
          let gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;\r
          let idx = Math.floor((1 - gray) * (this.charset.length - 1));\r
          if (this.invert) idx = this.charset.length - idx - 1;\r
          str += this.charset[idx];\r
        }\r
        str += '\\n';\r
      }\r
      this.pre.innerHTML = str;\r
    }\r
  }\r
\r
  dispose() {\r
    document.removeEventListener('mousemove', this.onMouseMove);\r
  }\r
}\r
\r
interface CanvasTxtOptions {\r
  fontSize?: number;\r
  fontFamily?: string;\r
  color?: string;\r
}\r
\r
class CanvasTxt {\r
  canvas: HTMLCanvasElement;\r
  context: CanvasRenderingContext2D | null;\r
  txt: string;\r
  fontSize: number;\r
  fontFamily: string;\r
  color: string;\r
  font: string;\r
\r
  constructor(txt: string, { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' }: CanvasTxtOptions = {}) {\r
    this.canvas = document.createElement('canvas');\r
    this.context = this.canvas.getContext('2d');\r
    this.txt = txt;\r
    this.fontSize = fontSize;\r
    this.fontFamily = fontFamily;\r
    this.color = color;\r
\r
    this.font = \`600 \${this.fontSize}px \${this.fontFamily}\`;\r
  }\r
\r
  resize() {\r
    if (this.context) {\r
      this.context.font = this.font;\r
      const metrics = this.context.measureText(this.txt);\r
\r
      const textWidth = Math.ceil(metrics.width) + 20;\r
      const textHeight = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20;\r
\r
      this.canvas.width = textWidth;\r
      this.canvas.height = textHeight;\r
    }\r
  }\r
\r
  render() {\r
    if (this.context) {\r
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\r
      this.context.fillStyle = this.color;\r
      this.context.font = this.font;\r
\r
      const metrics = this.context.measureText(this.txt);\r
      const yPos = 10 + metrics.actualBoundingBoxAscent;\r
\r
      this.context.fillText(this.txt, 10, yPos);\r
    }\r
  }\r
\r
  get width() {\r
    return this.canvas.width;\r
  }\r
\r
  get height() {\r
    return this.canvas.height;\r
  }\r
\r
  get texture() {\r
    return this.canvas;\r
  }\r
}\r
\r
interface CanvAsciiOptions {\r
  text: string;\r
  asciiFontSize: number;\r
  textFontSize: number;\r
  textColor: string;\r
  planeBaseHeight: number;\r
  enableWaves: boolean;\r
}\r
\r
class CanvAscii {\r
  textString: string;\r
  asciiFontSize: number;\r
  textFontSize: number;\r
  textColor: string;\r
  planeBaseHeight: number;\r
  container: HTMLElement;\r
  width: number;\r
  height: number;\r
  enableWaves: boolean;\r
  camera: THREE.PerspectiveCamera;\r
  scene: THREE.Scene;\r
  mouse: { x: number; y: number };\r
  textCanvas!: CanvasTxt;\r
  texture!: THREE.CanvasTexture;\r
  geometry!: THREE.PlaneGeometry;\r
  material!: THREE.ShaderMaterial;\r
  mesh!: THREE.Mesh;\r
  renderer!: THREE.WebGLRenderer;\r
  filter!: AsciiFilter;\r
  center!: { x: number; y: number };\r
  animationFrameId: number = 0;\r
\r
  constructor(\r
    { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves }: CanvAsciiOptions,\r
    containerElem: HTMLElement,\r
    width: number,\r
    height: number\r
  ) {\r
    this.textString = text;\r
    this.asciiFontSize = asciiFontSize;\r
    this.textFontSize = textFontSize;\r
    this.textColor = textColor;\r
    this.planeBaseHeight = planeBaseHeight;\r
    this.container = containerElem;\r
    this.width = width;\r
    this.height = height;\r
    this.enableWaves = enableWaves;\r
\r
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);\r
    this.camera.position.z = 30;\r
\r
    this.scene = new THREE.Scene();\r
    this.mouse = { x: 0, y: 0 };\r
\r
    this.onMouseMove = this.onMouseMove.bind(this);\r
\r
    this.setMesh();\r
    this.setRenderer();\r
  }\r
\r
  setMesh() {\r
    this.textCanvas = new CanvasTxt(this.textString, {\r
      fontSize: this.textFontSize,\r
      fontFamily: 'IBM Plex Mono',\r
      color: this.textColor\r
    });\r
    this.textCanvas.resize();\r
    this.textCanvas.render();\r
\r
    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);\r
    this.texture.minFilter = THREE.NearestFilter;\r
\r
    const textAspect = this.textCanvas.width / this.textCanvas.height;\r
    const baseH = this.planeBaseHeight;\r
    const planeW = baseH * textAspect;\r
    const planeH = baseH;\r
\r
    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);\r
    this.material = new THREE.ShaderMaterial({\r
      vertexShader,\r
      fragmentShader,\r
      transparent: true,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        mouse: { value: 1.0 },\r
        uTexture: { value: this.texture },\r
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 }\r
      }\r
    });\r
\r
    this.mesh = new THREE.Mesh(this.geometry, this.material);\r
    this.scene.add(this.mesh);\r
  }\r
\r
  setRenderer() {\r
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });\r
    this.renderer.setPixelRatio(1);\r
    this.renderer.setClearColor(0x000000, 0);\r
\r
    this.filter = new AsciiFilter(this.renderer, {\r
      fontFamily: 'IBM Plex Mono',\r
      fontSize: this.asciiFontSize,\r
      invert: true\r
    });\r
\r
    this.container.appendChild(this.filter.domElement);\r
    this.setSize(this.width, this.height);\r
\r
    this.container.addEventListener('mousemove', this.onMouseMove);\r
    this.container.addEventListener('touchmove', this.onMouseMove);\r
  }\r
\r
  setSize(w: number, h: number) {\r
    this.width = w;\r
    this.height = h;\r
\r
    this.camera.aspect = w / h;\r
    this.camera.updateProjectionMatrix();\r
\r
    this.filter.setSize(w, h);\r
\r
    this.center = { x: w / 2, y: h / 2 };\r
  }\r
\r
  load() {\r
    this.animate();\r
  }\r
\r
  onMouseMove(evt: MouseEvent | TouchEvent) {\r
    const e = (evt as TouchEvent).touches ? (evt as TouchEvent).touches[0] : (evt as MouseEvent);\r
    const bounds = this.container.getBoundingClientRect();\r
    const x = e.clientX - bounds.left;\r
    const y = e.clientY - bounds.top;\r
    this.mouse = { x, y };\r
  }\r
\r
  animate() {\r
    const animateFrame = () => {\r
      this.animationFrameId = requestAnimationFrame(animateFrame);\r
      this.render();\r
    };\r
    animateFrame();\r
  }\r
\r
  render() {\r
    const time = new Date().getTime() * 0.001;\r
\r
    this.textCanvas.render();\r
    this.texture.needsUpdate = true;\r
\r
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = Math.sin(time);\r
\r
    this.updateRotation();\r
    this.filter.render(this.scene, this.camera);\r
  }\r
\r
  updateRotation() {\r
    const x = map(this.mouse.y, 0, this.height, 0.5, -0.5);\r
    const y = map(this.mouse.x, 0, this.width, -0.5, 0.5);\r
\r
    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;\r
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;\r
  }\r
\r
  clear() {\r
    this.scene.traverse(object => {\r
      const obj = object as unknown as THREE.Mesh;\r
      if (!obj.isMesh) return;\r
      [obj.material].flat().forEach(material => {\r
        material.dispose();\r
        Object.keys(material).forEach(key => {\r
          const matProp = material[key as keyof typeof material];\r
          if (matProp && typeof matProp === 'object' && 'dispose' in matProp && typeof matProp.dispose === 'function') {\r
            matProp.dispose();\r
          }\r
        });\r
      });\r
      obj.geometry.dispose();\r
    });\r
    this.scene.clear();\r
  }\r
\r
  dispose() {\r
    cancelAnimationFrame(this.animationFrameId);\r
    this.filter.dispose();\r
    this.container.removeChild(this.filter.domElement);\r
    this.container.removeEventListener('mousemove', this.onMouseMove);\r
    this.container.removeEventListener('touchmove', this.onMouseMove);\r
    this.clear();\r
    this.renderer.dispose();\r
  }\r
}\r
\r
interface ASCIITextProps {\r
  text?: string;\r
  asciiFontSize?: number;\r
  textFontSize?: number;\r
  textColor?: string;\r
  planeBaseHeight?: number;\r
  enableWaves?: boolean;\r
}\r
\r
export default function ASCIIText({\r
  text = 'David!',\r
  asciiFontSize = 8,\r
  textFontSize = 200,\r
  textColor = '#fdf9f3',\r
  planeBaseHeight = 8,\r
  enableWaves = true\r
}: ASCIITextProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const asciiRef = useRef<CanvAscii | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const { width, height } = containerRef.current.getBoundingClientRect();\r
\r
    if (width === 0 || height === 0) {\r
      const observer = new IntersectionObserver(\r
        ([entry]) => {\r
          if (entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0) {\r
            const { width: w, height: h } = entry.boundingClientRect;\r
\r
            asciiRef.current = new CanvAscii(\r
              {\r
                text,\r
                asciiFontSize,\r
                textFontSize,\r
                textColor,\r
                planeBaseHeight,\r
                enableWaves\r
              },\r
              containerRef.current!,\r
              w,\r
              h\r
            );\r
            asciiRef.current.load();\r
\r
            observer.disconnect();\r
          }\r
        },\r
        { threshold: 0.1 }\r
      );\r
\r
      observer.observe(containerRef.current);\r
\r
      return () => {\r
        observer.disconnect();\r
        if (asciiRef.current) {\r
          asciiRef.current.dispose();\r
        }\r
      };\r
    }\r
\r
    asciiRef.current = new CanvAscii(\r
      {\r
        text,\r
        asciiFontSize,\r
        textFontSize,\r
        textColor,\r
        planeBaseHeight,\r
        enableWaves\r
      },\r
      containerRef.current,\r
      width,\r
      height\r
    );\r
    asciiRef.current.load();\r
\r
    const ro = new ResizeObserver(entries => {\r
      if (!entries[0] || !asciiRef.current) return;\r
      const { width: w, height: h } = entries[0].contentRect;\r
      if (w > 0 && h > 0) {\r
        asciiRef.current.setSize(w, h);\r
      }\r
    });\r
    ro.observe(containerRef.current);\r
\r
    return () => {\r
      ro.disconnect();\r
      if (asciiRef.current) {\r
        asciiRef.current.dispose();\r
      }\r
    };\r
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className="ascii-text-container"\r
      style={{\r
        position: 'absolute',\r
        width: '100%',\r
        height: '100%'\r
      }}\r
    >\r
      <style>{\`\r
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap');\r
\r
        body {\r
          margin: 0;\r
          padding: 0;\r
        }\r
\r
        .ascii-text-container canvas {\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          width: 100%;\r
          height: 100%;\r
          image-rendering: optimizeSpeed;\r
          image-rendering: -moz-crisp-edges;\r
          image-rendering: -o-crisp-edges;\r
          image-rendering: -webkit-optimize-contrast;\r
          image-rendering: optimize-contrast;\r
          image-rendering: crisp-edges;\r
          image-rendering: pixelated;\r
        }\r
\r
        .ascii-text-container pre {\r
          margin: 0;\r
          user-select: none;\r
          padding: 0;\r
          line-height: 1em;\r
          text-align: left;\r
          position: absolute;\r
          left: 0;\r
          top: 0;\r
          background-image: radial-gradient(circle, #ff6188 0%, #fc9867 50%, #ffd866 100%);\r
          background-attachment: fixed;\r
          -webkit-text-fill-color: transparent;\r
          -webkit-background-clip: text;\r
          z-index: 9;\r
          mix-blend-mode: difference;\r
        }\r
      \`}</style>\r
    </div>\r
  );\r
}\r
`,q={dependencies:"three",usage:`// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE
  
import ASCIIText from './ASCIIText';

<ASCIIText
  text='hello_world'
  enableWaves={true}
  asciiFontSize={8}
/>`,code:X,tailwind:N,tsCode:Y,tsTailwind:G},J=[{name:"text",type:"string",default:'"Hello World!"',description:"The text displayed on the plane in the ASCII scene."},{name:"enableWaves",type:"boolean",default:"true",description:"If false, disables the wavy text animation."},{name:"asciiFontSize",type:"number",default:"12",description:"Size of the ASCII glyphs in the overlay."},{name:"textFontSize",type:"number",default:"200",description:"Pixel size for the text that's drawn onto the plane texture."},{name:"planeBaseHeight",type:"number",default:"8",description:"How tall the plane is in 3D. The plane width is auto-based on text aspect."},{name:"textColor",type:"string",default:"#fdf9f3",description:"The color of the text drawn onto the plane texture."},{name:"strokeColor",type:"string",default:"N/A",description:"Not used here, but you could add it if you want an outline effect."}],ae=()=>{const[h,e]=u.useState("Hey!"),[t,n]=u.useState(!0),[r,s]=u.useState(8),[o,i]=H(),c=["three"];return u.useEffect(()=>{i()},[i]),a.jsxs(b,{children:[a.jsxs(w,{children:[a.jsx(y,{position:"relative",className:"demo-container",minH:400,maxH:400,overflow:"hidden",mb:6,children:a.jsx(_,{text:h,enableWaves:t,asciiFontSize:r,textFontSize:250,planeBaseHeight:12},o)}),a.jsxs(R,{children:[a.jsx(F,{title:"Text",value:h,placeholder:"Enter text...",width:200,maxLength:10,onChange:e}),a.jsx(T,{title:"Size",min:1,max:64,step:1,value:r,onChange:l=>{s(Number(l)||1),i()}}),a.jsx(C,{title:"Waves",isChecked:t,onChange:l=>{n(l),i()}})]}),a.jsx(E,{data:J}),a.jsx(z,{dependencyList:c})]}),a.jsx(S,{children:a.jsx(M,{codeObject:q})})]})};export{ae as default};
