import{r as d,j as r,B as F,T,F as b,d as P}from"./index-wsKSLPNH.js";import{T as M,P as U,a as R,C as j,b as A}from"./PropTable-C4uPWs8h.js";import{R as G}from"./RefreshButton-CA3SFRlq.js";import{D as H}from"./Dependencies-BHoMfJUj.js";import{u as D}from"./useForceRerender-BCFU-k0M.js";import{P as h}from"./PreviewSlider-m1G_aiYP.js";import{P as N}from"./PreviewSwitch-DqnF708j.js";import{C as _}from"./Customize-1m_ZNqR9.js";import{u as W,C as $,a as C}from"./react-three-fiber.esm-Dkk-fK7P.js";import{T as k,C as y,N as S,c as z,V as B}from"./three.module-0PRdiASR.js";import{s as V}from"./shaderMaterial-Bv5cOCPN.js";import"./index-Bpz4cGEA.js";function I(l,i,e=.9){return i*e+l*(1-e)}const L=l=>Math.sqrt(1-Math.pow(l-1,2));class O{constructor({size:i=256,maxAge:e=750,radius:o=.3,intensity:a=.2,interpolate:n=0,smoothing:c=0,minForce:t=.3,blend:s="screen",ease:u=L}={}){this.size=i,this.maxAge=e,this.radius=o,this.intensity=a,this.ease=u,this.interpolate=n,this.smoothing=c,this.minForce=t,this.blend=s,this.trail=[],this.force=0,this.initTexture()}initTexture(){this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=this.size;const i=this.canvas.getContext("2d");if(i===null)throw new Error("2D not available");this.ctx=i,this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.texture=new k(this.canvas),this.canvas.id="touchTexture",this.canvas.style.width=this.canvas.style.height=`${this.canvas.width}px`}update(i){this.clear(),this.trail.forEach((e,o)=>{e.age+=i*1e3,e.age>this.maxAge&&this.trail.splice(o,1)}),this.trail.length||(this.force=0),this.trail.forEach(e=>{this.drawTouch(e)}),this.texture.needsUpdate=!0}clear(){this.ctx.globalCompositeOperation="source-over",this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}addTouch(i){const e=this.trail[this.trail.length-1];if(e){const o=e.x-i.x,a=e.y-i.y,n=o*o+a*a,c=Math.max(this.minForce,Math.min(n*1e4,1));if(this.force=I(c,this.force,this.smoothing),this.interpolate){const t=Math.ceil(n/Math.pow(this.radius*.5/this.interpolate,2));if(t>1)for(let s=1;s<t;s++)this.trail.push({x:e.x-o/t*s,y:e.y-a/t*s,age:0,force:c})}}this.trail.push({x:i.x,y:i.y,age:0,force:this.force})}drawTouch(i){const e={x:i.x*this.size,y:(1-i.y)*this.size};let o=1;i.age<this.maxAge*.3?o=this.ease(i.age/(this.maxAge*.3)):o=this.ease(1-(i.age-this.maxAge*.3)/(this.maxAge*.7)),o*=i.force,this.ctx.globalCompositeOperation=this.blend;const a=this.size*this.radius*o,n=this.ctx.createRadialGradient(e.x,e.y,Math.max(0,a*.25),e.x,e.y,Math.max(0,a));n.addColorStop(0,`rgba(255, 255, 255, ${this.intensity})`),n.addColorStop(1,"rgba(0, 0, 0, 0.0)"),this.ctx.beginPath(),this.ctx.fillStyle=n,this.ctx.arc(e.x,e.y,Math.max(0,a),0,Math.PI*2),this.ctx.fill()}}function q(l={}){const{size:i,maxAge:e,radius:o,intensity:a,interpolate:n,smoothing:c,minForce:t,blend:s,ease:u}=l,p=d.useMemo(()=>new O(l),[i,e,o,a,n,c,t,s,u]);W((m,x)=>void p.update(x));const f=d.useCallback(m=>p.addTouch(m.uv),[p]);return[p.texture,f]}const J=({id:l="goo-filter",strength:i=10})=>r.jsx("svg",{className:"goo-filter-container",children:r.jsx("defs",{children:r.jsxs("filter",{id:l,children:[r.jsx("feGaussianBlur",{in:"SourceGraphic",stdDeviation:i,result:"blur"}),r.jsx("feColorMatrix",{in:"blur",type:"matrix",values:"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9",result:"goo"}),r.jsx("feComposite",{in:"SourceGraphic",in2:"goo",operator:"atop"})]})})}),K=V({resolution:new B,mouseTrail:null,gridSize:100,pixelColor:new y("#ffffff")},`
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,`
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  `);function Q({gridSize:l,trailSize:i,maxAge:e,interpolate:o,easingFunction:a,pixelColor:n}){const c=C(m=>m.size),t=C(m=>m.viewport),s=d.useMemo(()=>new K,[]);s.uniforms.pixelColor.value=new y(n);const[u,p]=q({size:512,radius:i,maxAge:e,interpolate:o||.1,ease:a||(m=>m)});u&&(u.minFilter=S,u.magFilter=S,u.wrapS=z,u.wrapT=z);const f=Math.max(t.width,t.height)/2;return r.jsxs("mesh",{scale:[f,f,1],onPointerMove:p,children:[r.jsx("planeGeometry",{args:[2,2]}),r.jsx("primitive",{object:s,gridSize:l,resolution:[c.width*t.dpr,c.height*t.dpr],mouseTrail:u})]})}function X({gridSize:l=40,trailSize:i=.1,maxAge:e=250,interpolate:o=5,easingFunction:a=p=>p,canvasProps:n={},glProps:c={antialias:!1,powerPreference:"high-performance",alpha:!0},gooeyFilter:t,color:s="#ffffff",className:u=""}){return r.jsxs(r.Fragment,{children:[t&&r.jsx(J,{id:t.id,strength:t.strength}),r.jsx($,{...n,gl:c,className:`pixel-canvas ${u}`,style:t&&{filter:`url(#${t.id})`},children:r.jsx(Q,{gridSize:l,trailSize:i,maxAge:e,interpolate:o,easingFunction:a,pixelColor:s})})]})}const Y=`/* eslint-disable react/no-unknown-property */\r
import { useMemo } from 'react';\r
import { Canvas, useThree } from '@react-three/fiber';\r
import { shaderMaterial, useTrailTexture } from '@react-three/drei';\r
import * as THREE from 'three';\r
\r
import './PixelTrail.css';\r
\r
const GooeyFilter = ({ id = 'goo-filter', strength = 10 }) => {\r
  return (\r
    <svg className="goo-filter-container">\r
      <defs>\r
        <filter id={id}>\r
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />\r
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />\r
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />\r
        </filter>\r
      </defs>\r
    </svg>\r
  );\r
};\r
\r
const DotMaterial = shaderMaterial(\r
  {\r
    resolution: new THREE.Vector2(),\r
    mouseTrail: null,\r
    gridSize: 100,\r
    pixelColor: new THREE.Color('#ffffff')\r
  },\r
  \`\r
    varying vec2 vUv;\r
    void main() {\r
      gl_Position = vec4(position.xy, 0.0, 1.0);\r
    }\r
  \`,\r
  \`\r
    uniform vec2 resolution;\r
    uniform sampler2D mouseTrail;\r
    uniform float gridSize;\r
    uniform vec3 pixelColor;\r
\r
    vec2 coverUv(vec2 uv) {\r
      vec2 s = resolution.xy / max(resolution.x, resolution.y);\r
      vec2 newUv = (uv - 0.5) * s + 0.5;\r
      return clamp(newUv, 0.0, 1.0);\r
    }\r
\r
    float sdfCircle(vec2 p, float r) {\r
        return length(p - 0.5) - r;\r
    }\r
\r
    void main() {\r
      vec2 screenUv = gl_FragCoord.xy / resolution;\r
      vec2 uv = coverUv(screenUv);\r
\r
      vec2 gridUv = fract(uv * gridSize);\r
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;\r
\r
      float trail = texture2D(mouseTrail, gridUvCenter).r;\r
\r
      gl_FragColor = vec4(pixelColor, trail);\r
    }\r
  \`\r
);\r
\r
function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }) {\r
  const size = useThree(s => s.size);\r
  const viewport = useThree(s => s.viewport);\r
\r
  const dotMaterial = useMemo(() => new DotMaterial(), []);\r
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);\r
\r
  const [trail, onMove] = useTrailTexture({\r
    size: 512,\r
    radius: trailSize,\r
    maxAge: maxAge,\r
    interpolate: interpolate || 0.1,\r
    ease: easingFunction || (x => x)\r
  });\r
\r
  if (trail) {\r
    trail.minFilter = THREE.NearestFilter;\r
    trail.magFilter = THREE.NearestFilter;\r
    trail.wrapS = THREE.ClampToEdgeWrapping;\r
    trail.wrapT = THREE.ClampToEdgeWrapping;\r
  }\r
\r
  const scale = Math.max(viewport.width, viewport.height) / 2;\r
\r
  return (\r
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>\r
      <planeGeometry args={[2, 2]} />\r
      <primitive\r
        object={dotMaterial}\r
        gridSize={gridSize}\r
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}\r
        mouseTrail={trail}\r
      />\r
    </mesh>\r
  );\r
}\r
\r
export default function PixelTrail({\r
  gridSize = 40,\r
  trailSize = 0.1,\r
  maxAge = 250,\r
  interpolate = 5,\r
  easingFunction = x => x,\r
  canvasProps = {},\r
  glProps = {\r
    antialias: false,\r
    powerPreference: 'high-performance',\r
    alpha: true\r
  },\r
  gooeyFilter,\r
  color = '#ffffff',\r
  className = ''\r
}) {\r
  return (\r
    <>\r
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}\r
      <Canvas\r
        {...canvasProps}\r
        gl={glProps}\r
        className={\`pixel-canvas \${className}\`}\r
        style={gooeyFilter && { filter: \`url(#\${gooeyFilter.id})\` }}\r
      >\r
        <Scene\r
          gridSize={gridSize}\r
          trailSize={trailSize}\r
          maxAge={maxAge}\r
          interpolate={interpolate}\r
          easingFunction={easingFunction}\r
          pixelColor={color}\r
        />\r
      </Canvas>\r
    </>\r
  );\r
}\r
`,Z=`.goo-filter-container {\r
  position: absolute;\r
  overflow: hidden;\r
  z-index: 1;\r
}\r
\r
.pixel-canvas {\r
  position: absolute;\r
  z-index: 1;\r
}\r
`,rr=`/* eslint-disable react/no-unknown-property */\r
import { useMemo } from 'react';\r
import { Canvas, useThree } from '@react-three/fiber';\r
import { shaderMaterial, useTrailTexture } from '@react-three/drei';\r
import * as THREE from 'three';\r
\r
const GooeyFilter = ({ id = 'goo-filter', strength = 10 }) => {\r
  return (\r
    <svg className="absolute overflow-hidden z-1">\r
      <defs>\r
        <filter id={id}>\r
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />\r
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />\r
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />\r
        </filter>\r
      </defs>\r
    </svg>\r
  );\r
};\r
\r
const DotMaterial = shaderMaterial(\r
  {\r
    resolution: new THREE.Vector2(),\r
    mouseTrail: null,\r
    gridSize: 100,\r
    pixelColor: new THREE.Color('#ffffff')\r
  },\r
  \`\r
    varying vec2 vUv;\r
    void main() {\r
      gl_Position = vec4(position.xy, 0.0, 1.0);\r
    }\r
  \`,\r
  \`\r
    uniform vec2 resolution;\r
    uniform sampler2D mouseTrail;\r
    uniform float gridSize;\r
    uniform vec3 pixelColor;\r
\r
    vec2 coverUv(vec2 uv) {\r
      vec2 s = resolution.xy / max(resolution.x, resolution.y);\r
      vec2 newUv = (uv - 0.5) * s + 0.5;\r
      return clamp(newUv, 0.0, 1.0);\r
    }\r
\r
    float sdfCircle(vec2 p, float r) {\r
        return length(p - 0.5) - r;\r
    }\r
\r
    void main() {\r
      vec2 screenUv = gl_FragCoord.xy / resolution;\r
      vec2 uv = coverUv(screenUv);\r
\r
      vec2 gridUv = fract(uv * gridSize);\r
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;\r
\r
      float trail = texture2D(mouseTrail, gridUvCenter).r;\r
\r
      gl_FragColor = vec4(pixelColor, trail);\r
    }\r
  \`\r
);\r
\r
function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }) {\r
  const size = useThree(s => s.size);\r
  const viewport = useThree(s => s.viewport);\r
\r
  const dotMaterial = useMemo(() => new DotMaterial(), []);\r
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);\r
\r
  const [trail, onMove] = useTrailTexture({\r
    size: 512,\r
    radius: trailSize,\r
    maxAge: maxAge,\r
    interpolate: interpolate || 0.1,\r
    ease: easingFunction || (x => x)\r
  });\r
\r
  if (trail) {\r
    trail.minFilter = THREE.NearestFilter;\r
    trail.magFilter = THREE.NearestFilter;\r
    trail.wrapS = THREE.ClampToEdgeWrapping;\r
    trail.wrapT = THREE.ClampToEdgeWrapping;\r
  }\r
\r
  const scale = Math.max(viewport.width, viewport.height) / 2;\r
\r
  return (\r
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>\r
      <planeGeometry args={[2, 2]} />\r
      <primitive\r
        object={dotMaterial}\r
        gridSize={gridSize}\r
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}\r
        mouseTrail={trail}\r
      />\r
    </mesh>\r
  );\r
}\r
\r
export default function PixelTrail({\r
  gridSize = 40,\r
  trailSize = 0.1,\r
  maxAge = 250,\r
  interpolate = 5,\r
  easingFunction = x => x,\r
  canvasProps = {},\r
  glProps = {\r
    antialias: false,\r
    powerPreference: 'high-performance',\r
    alpha: true\r
  },\r
  gooeyFilter,\r
  color = '#ffffff',\r
  className = ''\r
}) {\r
  return (\r
    <>\r
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}\r
      <Canvas\r
        {...canvasProps}\r
        gl={glProps}\r
        className={\`absolute z-1 \${className}\`}\r
        style={gooeyFilter && { filter: \`url(#\${gooeyFilter.id})\` }}\r
      >\r
        <Scene\r
          gridSize={gridSize}\r
          trailSize={trailSize}\r
          maxAge={maxAge}\r
          interpolate={interpolate}\r
          easingFunction={easingFunction}\r
          pixelColor={color}\r
        />\r
      </Canvas>\r
    </>\r
  );\r
}\r
`,er=`/* eslint-disable react/no-unknown-property */\r
import React, { useMemo } from 'react';\r
import { Canvas, useThree, CanvasProps, ThreeEvent } from '@react-three/fiber';\r
import { shaderMaterial, useTrailTexture } from '@react-three/drei';\r
import * as THREE from 'three';\r
\r
import './PixelTrail.css';\r
\r
interface GooeyFilterProps {\r
  id?: string;\r
  strength?: number;\r
}\r
\r
interface DotMaterialUniforms {\r
  resolution: THREE.Vector2;\r
  mouseTrail: THREE.Texture | null;\r
  gridSize: number;\r
  pixelColor: THREE.Color;\r
}\r
\r
interface SceneProps {\r
  gridSize: number;\r
  trailSize: number;\r
  maxAge: number;\r
  interpolate: number;\r
  easingFunction: (x: number) => number;\r
  pixelColor: string;\r
}\r
\r
interface PixelTrailProps {\r
  gridSize?: number;\r
  trailSize?: number;\r
  maxAge?: number;\r
  interpolate?: number;\r
  easingFunction?: (x: number) => number;\r
  canvasProps?: Partial<CanvasProps>;\r
  glProps?: WebGLContextAttributes & { powerPreference?: string };\r
  gooeyFilter?: { id: string; strength: number };\r
  color?: string;\r
  className?: string;\r
}\r
\r
const GooeyFilter: React.FC<GooeyFilterProps> = ({ id = 'goo-filter', strength = 10 }) => {\r
  return (\r
    <svg className="goo-filter-container">\r
      <defs>\r
        <filter id={id}>\r
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />\r
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />\r
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />\r
        </filter>\r
      </defs>\r
    </svg>\r
  );\r
};\r
\r
const DotMaterial = shaderMaterial(\r
  {\r
    resolution: new THREE.Vector2(),\r
    mouseTrail: null,\r
    gridSize: 100,\r
    pixelColor: new THREE.Color('#ffffff')\r
  },\r
  /* glsl vertex shader */ \`\r
    varying vec2 vUv;\r
    void main() {\r
      gl_Position = vec4(position.xy, 0.0, 1.0);\r
    }\r
  \`,\r
  /* glsl fragment shader */ \`\r
    uniform vec2 resolution;\r
    uniform sampler2D mouseTrail;\r
    uniform float gridSize;\r
    uniform vec3 pixelColor;\r
\r
    vec2 coverUv(vec2 uv) {\r
      vec2 s = resolution.xy / max(resolution.x, resolution.y);\r
      vec2 newUv = (uv - 0.5) * s + 0.5;\r
      return clamp(newUv, 0.0, 1.0);\r
    }\r
\r
    float sdfCircle(vec2 p, float r) {\r
        return length(p - 0.5) - r;\r
    }\r
\r
    void main() {\r
      vec2 screenUv = gl_FragCoord.xy / resolution;\r
      vec2 uv = coverUv(screenUv);\r
\r
      vec2 gridUv = fract(uv * gridSize);\r
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;\r
\r
      float trail = texture2D(mouseTrail, gridUvCenter).r;\r
\r
      gl_FragColor = vec4(pixelColor, trail);\r
    }\r
  \`\r
);\r
\r
function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {\r
  const size = useThree(s => s.size);\r
  const viewport = useThree(s => s.viewport);\r
\r
  const dotMaterial = useMemo(() => new DotMaterial(), []);\r
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);\r
\r
  const [trail, onMove] = useTrailTexture({\r
    size: 512,\r
    radius: trailSize,\r
    maxAge: maxAge,\r
    interpolate: interpolate || 0.1,\r
    ease: easingFunction || ((x: number) => x)\r
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];\r
\r
  if (trail) {\r
    trail.minFilter = THREE.NearestFilter;\r
    trail.magFilter = THREE.NearestFilter;\r
    trail.wrapS = THREE.ClampToEdgeWrapping;\r
    trail.wrapT = THREE.ClampToEdgeWrapping;\r
  }\r
\r
  const scale = Math.max(viewport.width, viewport.height) / 2;\r
\r
  return (\r
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>\r
      <planeGeometry args={[2, 2]} />\r
      <primitive\r
        object={dotMaterial}\r
        gridSize={gridSize}\r
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}\r
        mouseTrail={trail}\r
      />\r
    </mesh>\r
  );\r
}\r
\r
export default function PixelTrail({\r
  gridSize = 40,\r
  trailSize = 0.1,\r
  maxAge = 250,\r
  interpolate = 5,\r
  easingFunction = (x: number) => x,\r
  canvasProps = {},\r
  glProps = {\r
    antialias: false,\r
    powerPreference: 'high-performance',\r
    alpha: true\r
  },\r
  gooeyFilter,\r
  color = '#ffffff',\r
  className = ''\r
}: PixelTrailProps) {\r
  return (\r
    <>\r
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}\r
      <Canvas\r
        {...canvasProps}\r
        gl={glProps}\r
        className={\`pixel-canvas \${className}\`}\r
        style={gooeyFilter ? { filter: \`url(#\${gooeyFilter.id})\` } : undefined}\r
      >\r
        <Scene\r
          gridSize={gridSize}\r
          trailSize={trailSize}\r
          maxAge={maxAge}\r
          interpolate={interpolate}\r
          easingFunction={easingFunction}\r
          pixelColor={color}\r
        />\r
      </Canvas>\r
    </>\r
  );\r
}\r
`,ir=`/* eslint-disable react/no-unknown-property */\r
import React, { useMemo } from 'react';\r
import { Canvas, useThree, CanvasProps, ThreeEvent } from '@react-three/fiber';\r
import { shaderMaterial, useTrailTexture } from '@react-three/drei';\r
import * as THREE from 'three';\r
\r
interface GooeyFilterProps {\r
  id?: string;\r
  strength?: number;\r
}\r
\r
interface DotMaterialUniforms {\r
  resolution: THREE.Vector2;\r
  mouseTrail: THREE.Texture | null;\r
  gridSize: number;\r
  pixelColor: THREE.Color;\r
}\r
\r
interface SceneProps {\r
  gridSize: number;\r
  trailSize: number;\r
  maxAge: number;\r
  interpolate: number;\r
  easingFunction: (x: number) => number;\r
  pixelColor: string;\r
}\r
\r
interface PixelTrailProps {\r
  gridSize?: number;\r
  trailSize?: number;\r
  maxAge?: number;\r
  interpolate?: number;\r
  easingFunction?: (x: number) => number;\r
  canvasProps?: Partial<CanvasProps>;\r
  glProps?: WebGLContextAttributes & { powerPreference?: string };\r
  gooeyFilter?: { id: string; strength: number };\r
  color?: string;\r
  className?: string;\r
}\r
\r
const GooeyFilter: React.FC<GooeyFilterProps> = ({ id = 'goo-filter', strength = 10 }) => {\r
  return (\r
    <svg className="absolute overflow-hidden z-1">\r
      <defs>\r
        <filter id={id}>\r
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />\r
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />\r
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />\r
        </filter>\r
      </defs>\r
    </svg>\r
  );\r
};\r
\r
const DotMaterial = shaderMaterial(\r
  {\r
    resolution: new THREE.Vector2(),\r
    mouseTrail: null,\r
    gridSize: 100,\r
    pixelColor: new THREE.Color('#ffffff')\r
  },\r
  /* glsl vertex shader */ \`\r
    varying vec2 vUv;\r
    void main() {\r
      gl_Position = vec4(position.xy, 0.0, 1.0);\r
    }\r
  \`,\r
  /* glsl fragment shader */ \`\r
    uniform vec2 resolution;\r
    uniform sampler2D mouseTrail;\r
    uniform float gridSize;\r
    uniform vec3 pixelColor;\r
\r
    vec2 coverUv(vec2 uv) {\r
      vec2 s = resolution.xy / max(resolution.x, resolution.y);\r
      vec2 newUv = (uv - 0.5) * s + 0.5;\r
      return clamp(newUv, 0.0, 1.0);\r
    }\r
\r
    float sdfCircle(vec2 p, float r) {\r
        return length(p - 0.5) - r;\r
    }\r
\r
    void main() {\r
      vec2 screenUv = gl_FragCoord.xy / resolution;\r
      vec2 uv = coverUv(screenUv);\r
\r
      vec2 gridUv = fract(uv * gridSize);\r
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;\r
\r
      float trail = texture2D(mouseTrail, gridUvCenter).r;\r
\r
      gl_FragColor = vec4(pixelColor, trail);\r
    }\r
  \`\r
);\r
\r
function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {\r
  const size = useThree(s => s.size);\r
  const viewport = useThree(s => s.viewport);\r
\r
  const dotMaterial = useMemo(() => new DotMaterial(), []);\r
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);\r
\r
  const [trail, onMove] = useTrailTexture({\r
    size: 512,\r
    radius: trailSize,\r
    maxAge: maxAge,\r
    interpolate: interpolate || 0.1,\r
    ease: easingFunction || ((x: number) => x)\r
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];\r
\r
  if (trail) {\r
    trail.minFilter = THREE.NearestFilter;\r
    trail.magFilter = THREE.NearestFilter;\r
    trail.wrapS = THREE.ClampToEdgeWrapping;\r
    trail.wrapT = THREE.ClampToEdgeWrapping;\r
  }\r
\r
  const scale = Math.max(viewport.width, viewport.height) / 2;\r
\r
  return (\r
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>\r
      <planeGeometry args={[2, 2]} />\r
      <primitive\r
        object={dotMaterial}\r
        gridSize={gridSize}\r
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}\r
        mouseTrail={trail}\r
      />\r
    </mesh>\r
  );\r
}\r
\r
export default function PixelTrail({\r
  gridSize = 40,\r
  trailSize = 0.1,\r
  maxAge = 250,\r
  interpolate = 5,\r
  easingFunction = (x: number) => x,\r
  canvasProps = {},\r
  glProps = {\r
    antialias: false,\r
    powerPreference: 'high-performance',\r
    alpha: true\r
  },\r
  gooeyFilter,\r
  color = '#ffffff',\r
  className = ''\r
}: PixelTrailProps) {\r
  return (\r
    <>\r
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}\r
      <Canvas\r
        {...canvasProps}\r
        gl={glProps}\r
        className={\`absolute z-1 \${className}\`}\r
        style={gooeyFilter ? { filter: \`url(#\${gooeyFilter.id})\` } : undefined}\r
      >\r
        <Scene\r
          gridSize={gridSize}\r
          trailSize={trailSize}\r
          maxAge={maxAge}\r
          interpolate={interpolate}\r
          easingFunction={easingFunction}\r
          pixelColor={color}\r
        />\r
      </Canvas>\r
    </>\r
  );\r
}\r
`,tr={dependencies:"three @react-three/fiber @react-three/drei",usage:`import PixelTrail from './PixelTrail';

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <PixelTrail
    gridSize={50}
    trailSize={0.1}
    maxAge={250}
    interpolate={5}
    color="#fff"
    gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
  />
</div>`,code:Y,css:Z,tailwind:rr,tsCode:er,tsTailwind:ir},fr=()=>{const[l,i]=d.useState(50),[e,o]=d.useState(.1),[a,n]=d.useState(250),[c,t]=d.useState(5),[s,u]=d.useState("#5227FF"),[p,f]=d.useState(!0),[m,x]=d.useState(2),[w,v]=D(),E=[{name:"gridSize",type:"number",default:"40",description:"Number of pixels in grid."},{name:"trailSize",type:"number",default:"0.1",description:"Size of each trail dot."},{name:"maxAge",type:"number",default:"500",description:"Duration of the trail effect."},{name:"interpolate",type:"number",default:"5",description:"Interpolation factor for pointer movement."},{name:"color",type:"string",default:"#ffffff",description:"Pixel color."},{name:"gooeyFilter",type:"object",default:"{ id: 'custom-goo-filter', strength: 5 }",description:"Configuration for gooey filter."}];return r.jsxs(M,{children:[r.jsxs(U,{children:[r.jsxs(F,{position:"relative",className:"demo-container",h:500,p:0,overflow:"hidden",children:[r.jsx(G,{onClick:v}),r.jsx(X,{gridSize:l,trailSize:e,maxAge:a,interpolate:c,color:s,gooeyFilter:p?{id:"custom-goo-filter",strength:m}:void 0},w),r.jsx(T,{position:"absolute",zIndex:0,fontSize:"clamp(2rem, 6vw, 6rem)",color:"#271E37",fontWeight:900,children:"Move Cursor."})]}),r.jsxs(_,{children:[r.jsx(h,{title:"Grid Size",min:10,max:100,step:1,value:l,onChange:g=>{i(g),v()}}),r.jsx(h,{title:"Trail Size",min:.05,max:.5,step:.01,value:e,onChange:g=>{o(g),v()}}),r.jsx(h,{title:"Max Age",min:100,max:1e3,step:50,value:a,onChange:g=>{n(g),v()}}),r.jsx(h,{title:"Interpolate",min:0,max:10,step:.1,value:c,onChange:g=>{t(g),v()}}),r.jsxs(b,{gap:4,align:"center",mt:4,children:[r.jsx(T,{fontSize:"sm",children:"Color"}),r.jsx(P,{type:"color",value:s,onChange:g=>{u(g.target.value),v()},width:"50px"}),r.jsx(T,{fontSize:"sm",children:s})]}),r.jsx(N,{title:"Gooey Filter",isChecked:p,onChange:g=>{f(g),v()}}),p&&r.jsx(h,{title:"Gooey Strength",min:1,max:20,step:1,value:m,onChange:g=>{x(g),v()}})]}),r.jsx(R,{data:E}),r.jsx(H,{dependencyList:["@react-three/fiber","@react-three/drei","three"]})]}),r.jsx(j,{children:r.jsx(A,{codeObject:tr})})]})};export{fr as default};
