import{r as i,R as G,C as W,G as X,P as Y,M as $,j as r,B as J,F as K,T as Q,d as U}from"./index-wsKSLPNH.js";import{T as V,P as Z,a as rr,C as nr,b as er}from"./PropTable-C4uPWs8h.js";import{D as tr}from"./Dependencies-BHoMfJUj.js";import{P as T}from"./PreviewSlider-m1G_aiYP.js";import{P as j}from"./PreviewSwitch-DqnF708j.js";import{C as ar}from"./Customize-1m_ZNqR9.js";import{u as or}from"./useForceRerender-BCFU-k0M.js";import{B as ir}from"./BackgroundContent-CqU7Wlm2.js";import"./index-Bpz4cGEA.js";const sr=["#ffffff","#ffffff","#ffffff"],lr=a=>{a=a.replace(/^#/,""),a.length===3&&(a=a.split("").map(d=>d+d).join(""));const c=parseInt(a,16),m=(c>>16&255)/255,u=(c>>8&255)/255,l=(c&255)/255;return[m,u,l]},cr=`
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`,mr=`
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`,dr=({particleCount:a=200,particleSpread:c=10,speed:m=.1,particleColors:u,moveParticlesOnHover:l=!1,particleHoverFactor:d=1,alphaParticles:h=!1,particleBaseSize:M=100,sizeRandomness:g=1,cameraDistance:w=20,disableRotation:x=!1,className:F})=>{const z=i.useRef(null),y=i.useRef({x:0,y:0});return i.useEffect(()=>{const o=z.current;if(!o)return;const P=new G({depth:!1,alpha:!0}),n=P.gl;o.appendChild(n.canvas),n.clearColor(0,0,0,0);const R=new W(n,{fov:15});R.position.set(0,0,w);const C=()=>{const e=o.clientWidth,t=o.clientHeight;P.setSize(e,t),R.perspective({aspect:n.canvas.width/n.canvas.height})};window.addEventListener("resize",C,!1),C();const s=e=>{const t=o.getBoundingClientRect(),f=(e.clientX-t.left)/t.width*2-1,v=-((e.clientY-t.top)/t.height*2-1);y.current={x:f,y:v}};l&&o.addEventListener("mousemove",s);const S=a,E=new Float32Array(S*3),I=new Float32Array(S*4),_=new Float32Array(S*3),O=u&&u.length>0?u:sr;for(let e=0;e<S;e++){let t,f,v,A;do t=Math.random()*2-1,f=Math.random()*2-1,v=Math.random()*2-1,A=t*t+f*f+v*v;while(A>1||A===0);const H=Math.cbrt(Math.random());E.set([t*H,f*H,v*H],e*3),I.set([Math.random(),Math.random(),Math.random(),Math.random()],e*4);const q=lr(O[Math.floor(Math.random()*O.length)]);_.set(q,e*3)}const k=new X(n,{position:{size:3,data:E},random:{size:4,data:I},color:{size:3,data:_}}),D=new Y(n,{vertex:cr,fragment:mr,uniforms:{uTime:{value:0},uSpread:{value:c},uBaseSize:{value:M},uSizeRandomness:{value:g},uAlphaParticles:{value:h?1:0}},transparent:!0,depthTest:!1}),p=new $(n,{mode:n.POINTS,geometry:k,program:D});let B,L=performance.now(),b=0;const N=e=>{B=requestAnimationFrame(N);const t=e-L;L=e,b+=t*m,D.uniforms.uTime.value=b*.001,l?(p.position.x=-y.current.x*d,p.position.y=-y.current.y*d):(p.position.x=0,p.position.y=0),x||(p.rotation.x=Math.sin(b*2e-4)*.1,p.rotation.y=Math.cos(b*5e-4)*.15,p.rotation.z+=.01*m),P.render({scene:p,camera:R})};return B=requestAnimationFrame(N),()=>{window.removeEventListener("resize",C),l&&o.removeEventListener("mousemove",s),cancelAnimationFrame(B),o.contains(n.canvas)&&o.removeChild(n.canvas)}},[a,c,m,l,d,h,M,g,w,x]),r.jsx("div",{ref:z,className:`particles-container ${F}`})},pr=`import { useEffect, useRef } from 'react';\r
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';\r
\r
import './Particles.css';\r
\r
const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];\r
\r
const hexToRgb = hex => {\r
  hex = hex.replace(/^#/, '');\r
  if (hex.length === 3) {\r
    hex = hex\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const int = parseInt(hex, 16);\r
  const r = ((int >> 16) & 255) / 255;\r
  const g = ((int >> 8) & 255) / 255;\r
  const b = (int & 255) / 255;\r
  return [r, g, b];\r
};\r
\r
const vertex = /* glsl */ \`\r
  attribute vec3 position;\r
  attribute vec4 random;\r
  attribute vec3 color;\r
  \r
  uniform mat4 modelMatrix;\r
  uniform mat4 viewMatrix;\r
  uniform mat4 projectionMatrix;\r
  uniform float uTime;\r
  uniform float uSpread;\r
  uniform float uBaseSize;\r
  uniform float uSizeRandomness;\r
  \r
  varying vec4 vRandom;\r
  varying vec3 vColor;\r
  \r
  void main() {\r
    vRandom = random;\r
    vColor = color;\r
    \r
    vec3 pos = position * uSpread;\r
    pos.z *= 10.0;\r
    \r
    vec4 mPos = modelMatrix * vec4(pos, 1.0);\r
    float t = uTime;\r
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);\r
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);\r
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);\r
    \r
    vec4 mvPos = viewMatrix * mPos;\r
\r
    if (uSizeRandomness == 0.0) {\r
      gl_PointSize = uBaseSize;\r
    } else {\r
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);\r
    }\r
\r
    gl_Position = projectionMatrix * mvPos;\r
  }\r
\`;\r
\r
const fragment = /* glsl */ \`\r
  precision highp float;\r
  \r
  uniform float uTime;\r
  uniform float uAlphaParticles;\r
  varying vec4 vRandom;\r
  varying vec3 vColor;\r
  \r
  void main() {\r
    vec2 uv = gl_PointCoord.xy;\r
    float d = length(uv - vec2(0.5));\r
    \r
    if(uAlphaParticles < 0.5) {\r
      if(d > 0.5) {\r
        discard;\r
      }\r
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);\r
    } else {\r
      float circle = smoothstep(0.5, 0.4, d) * 0.8;\r
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);\r
    }\r
  }\r
\`;\r
\r
const Particles = ({\r
  particleCount = 200,\r
  particleSpread = 10,\r
  speed = 0.1,\r
  particleColors,\r
  moveParticlesOnHover = false,\r
  particleHoverFactor = 1,\r
  alphaParticles = false,\r
  particleBaseSize = 100,\r
  sizeRandomness = 1,\r
  cameraDistance = 20,\r
  disableRotation = false,\r
  className\r
}) => {\r
  const containerRef = useRef(null);\r
  const mouseRef = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ depth: false, alpha: true });\r
    const gl = renderer.gl;\r
    container.appendChild(gl.canvas);\r
    gl.clearColor(0, 0, 0, 0);\r
\r
    const camera = new Camera(gl, { fov: 15 });\r
    camera.position.set(0, 0, cameraDistance);\r
\r
    const resize = () => {\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width, height);\r
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });\r
    };\r
    window.addEventListener('resize', resize, false);\r
    resize();\r
\r
    const handleMouseMove = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;\r
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);\r
      mouseRef.current = { x, y };\r
    };\r
\r
    if (moveParticlesOnHover) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    const count = particleCount;\r
    const positions = new Float32Array(count * 3);\r
    const randoms = new Float32Array(count * 4);\r
    const colors = new Float32Array(count * 3);\r
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;\r
\r
    for (let i = 0; i < count; i++) {\r
      let x, y, z, len;\r
      do {\r
        x = Math.random() * 2 - 1;\r
        y = Math.random() * 2 - 1;\r
        z = Math.random() * 2 - 1;\r
        len = x * x + y * y + z * z;\r
      } while (len > 1 || len === 0);\r
      const r = Math.cbrt(Math.random());\r
      positions.set([x * r, y * r, z * r], i * 3);\r
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);\r
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);\r
      colors.set(col, i * 3);\r
    }\r
\r
    const geometry = new Geometry(gl, {\r
      position: { size: 3, data: positions },\r
      random: { size: 4, data: randoms },\r
      color: { size: 3, data: colors }\r
    });\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uSpread: { value: particleSpread },\r
        uBaseSize: { value: particleBaseSize },\r
        uSizeRandomness: { value: sizeRandomness },\r
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }\r
      },\r
      transparent: true,\r
      depthTest: false\r
    });\r
\r
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });\r
\r
    let animationFrameId;\r
    let lastTime = performance.now();\r
    let elapsed = 0;\r
\r
    const update = t => {\r
      animationFrameId = requestAnimationFrame(update);\r
      const delta = t - lastTime;\r
      lastTime = t;\r
      elapsed += delta * speed;\r
\r
      program.uniforms.uTime.value = elapsed * 0.001;\r
\r
      if (moveParticlesOnHover) {\r
        particles.position.x = -mouseRef.current.x * particleHoverFactor;\r
        particles.position.y = -mouseRef.current.y * particleHoverFactor;\r
      } else {\r
        particles.position.x = 0;\r
        particles.position.y = 0;\r
      }\r
\r
      if (!disableRotation) {\r
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;\r
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;\r
        particles.rotation.z += 0.01 * speed;\r
      }\r
\r
      renderer.render({ scene: particles, camera });\r
    };\r
\r
    animationFrameId = requestAnimationFrame(update);\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      if (moveParticlesOnHover) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      cancelAnimationFrame(animationFrameId);\r
      if (container.contains(gl.canvas)) {\r
        container.removeChild(gl.canvas);\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    particleCount,\r
    particleSpread,\r
    speed,\r
    moveParticlesOnHover,\r
    particleHoverFactor,\r
    alphaParticles,\r
    particleBaseSize,\r
    sizeRandomness,\r
    cameraDistance,\r
    disableRotation\r
  ]);\r
\r
  return <div ref={containerRef} className={\`particles-container \${className}\`} />;\r
};\r
\r
export default Particles;\r
`,ur=`.particles-container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
}\r
`,fr=`import { useEffect, useRef } from 'react';\r
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';\r
\r
const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];\r
\r
const hexToRgb = hex => {\r
  hex = hex.replace(/^#/, '');\r
  if (hex.length === 3) {\r
    hex = hex\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const int = parseInt(hex, 16);\r
  const r = ((int >> 16) & 255) / 255;\r
  const g = ((int >> 8) & 255) / 255;\r
  const b = (int & 255) / 255;\r
  return [r, g, b];\r
};\r
\r
const vertex = /* glsl */ \`\r
  attribute vec3 position;\r
  attribute vec4 random;\r
  attribute vec3 color;\r
  \r
  uniform mat4 modelMatrix;\r
  uniform mat4 viewMatrix;\r
  uniform mat4 projectionMatrix;\r
  uniform float uTime;\r
  uniform float uSpread;\r
  uniform float uBaseSize;\r
  uniform float uSizeRandomness;\r
  \r
  varying vec4 vRandom;\r
  varying vec3 vColor;\r
  \r
  void main() {\r
    vRandom = random;\r
    vColor = color;\r
    \r
    vec3 pos = position * uSpread;\r
    pos.z *= 10.0;\r
    \r
    vec4 mPos = modelMatrix * vec4(pos, 1.0);\r
    float t = uTime;\r
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);\r
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);\r
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);\r
    \r
    vec4 mvPos = viewMatrix * mPos;\r
\r
    if (uSizeRandomness == 0.0) {\r
      gl_PointSize = uBaseSize;\r
    } else {\r
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);\r
    }\r
\r
    gl_Position = projectionMatrix * mvPos;\r
  }\r
\`;\r
\r
const fragment = /* glsl */ \`\r
  precision highp float;\r
  \r
  uniform float uTime;\r
  uniform float uAlphaParticles;\r
  varying vec4 vRandom;\r
  varying vec3 vColor;\r
  \r
  void main() {\r
    vec2 uv = gl_PointCoord.xy;\r
    float d = length(uv - vec2(0.5));\r
    \r
    if(uAlphaParticles < 0.5) {\r
      if(d > 0.5) {\r
        discard;\r
      }\r
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);\r
    } else {\r
      float circle = smoothstep(0.5, 0.4, d) * 0.8;\r
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);\r
    }\r
  }\r
\`;\r
\r
const Particles = ({\r
  particleCount = 200,\r
  particleSpread = 10,\r
  speed = 0.1,\r
  particleColors,\r
  moveParticlesOnHover = false,\r
  particleHoverFactor = 1,\r
  alphaParticles = false,\r
  particleBaseSize = 100,\r
  sizeRandomness = 1,\r
  cameraDistance = 20,\r
  disableRotation = false,\r
  className\r
}) => {\r
  const containerRef = useRef(null);\r
  const mouseRef = useRef({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ depth: false, alpha: true });\r
    const gl = renderer.gl;\r
    container.appendChild(gl.canvas);\r
    gl.clearColor(0, 0, 0, 0);\r
\r
    const camera = new Camera(gl, { fov: 15 });\r
    camera.position.set(0, 0, cameraDistance);\r
\r
    const resize = () => {\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width, height);\r
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });\r
    };\r
    window.addEventListener('resize', resize, false);\r
    resize();\r
\r
    const handleMouseMove = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;\r
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);\r
      mouseRef.current = { x, y };\r
    };\r
\r
    if (moveParticlesOnHover) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    const count = particleCount;\r
    const positions = new Float32Array(count * 3);\r
    const randoms = new Float32Array(count * 4);\r
    const colors = new Float32Array(count * 3);\r
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;\r
\r
    for (let i = 0; i < count; i++) {\r
      let x, y, z, len;\r
      do {\r
        x = Math.random() * 2 - 1;\r
        y = Math.random() * 2 - 1;\r
        z = Math.random() * 2 - 1;\r
        len = x * x + y * y + z * z;\r
      } while (len > 1 || len === 0);\r
      const r = Math.cbrt(Math.random());\r
      positions.set([x * r, y * r, z * r], i * 3);\r
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);\r
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);\r
      colors.set(col, i * 3);\r
    }\r
\r
    const geometry = new Geometry(gl, {\r
      position: { size: 3, data: positions },\r
      random: { size: 4, data: randoms },\r
      color: { size: 3, data: colors }\r
    });\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uSpread: { value: particleSpread },\r
        uBaseSize: { value: particleBaseSize },\r
        uSizeRandomness: { value: sizeRandomness },\r
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }\r
      },\r
      transparent: true,\r
      depthTest: false\r
    });\r
\r
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });\r
\r
    let animationFrameId;\r
    let lastTime = performance.now();\r
    let elapsed = 0;\r
\r
    const update = t => {\r
      animationFrameId = requestAnimationFrame(update);\r
      const delta = t - lastTime;\r
      lastTime = t;\r
      elapsed += delta * speed;\r
\r
      program.uniforms.uTime.value = elapsed * 0.001;\r
\r
      if (moveParticlesOnHover) {\r
        particles.position.x = -mouseRef.current.x * particleHoverFactor;\r
        particles.position.y = -mouseRef.current.y * particleHoverFactor;\r
      } else {\r
        particles.position.x = 0;\r
        particles.position.y = 0;\r
      }\r
\r
      if (!disableRotation) {\r
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;\r
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;\r
        particles.rotation.z += 0.01 * speed;\r
      }\r
\r
      renderer.render({ scene: particles, camera });\r
    };\r
\r
    animationFrameId = requestAnimationFrame(update);\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      if (moveParticlesOnHover) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      cancelAnimationFrame(animationFrameId);\r
      if (container.contains(gl.canvas)) {\r
        container.removeChild(gl.canvas);\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    particleCount,\r
    particleSpread,\r
    speed,\r
    moveParticlesOnHover,\r
    particleHoverFactor,\r
    alphaParticles,\r
    particleBaseSize,\r
    sizeRandomness,\r
    cameraDistance,\r
    disableRotation\r
  ]);\r
\r
  return <div ref={containerRef} className={\`relative w-full h-full \${className}\`} />;\r
};\r
\r
export default Particles;\r
`,vr=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';\r
\r
import './Particles.css';\r
\r
interface ParticlesProps {\r
  particleCount?: number;\r
  particleSpread?: number;\r
  speed?: number;\r
  particleColors?: string[];\r
  moveParticlesOnHover?: boolean;\r
  particleHoverFactor?: number;\r
  alphaParticles?: boolean;\r
  particleBaseSize?: number;\r
  sizeRandomness?: number;\r
  cameraDistance?: number;\r
  disableRotation?: boolean;\r
  className?: string;\r
}\r
\r
const defaultColors: string[] = ['#ffffff', '#ffffff', '#ffffff'];\r
\r
const hexToRgb = (hex: string): [number, number, number] => {\r
  hex = hex.replace(/^#/, '');\r
  if (hex.length === 3) {\r
    hex = hex\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const int = parseInt(hex, 16);\r
  const r = ((int >> 16) & 255) / 255;\r
  const g = ((int >> 8) & 255) / 255;\r
  const b = (int & 255) / 255;\r
  return [r, g, b];\r
};\r
\r
const vertex = /* glsl */ \`\r
  attribute vec3 position;\r
  attribute vec4 random;\r
  attribute vec3 color;\r
  \r
  uniform mat4 modelMatrix;\r
  uniform mat4 viewMatrix;\r
  uniform mat4 projectionMatrix;\r
  uniform float uTime;\r
  uniform float uSpread;\r
  uniform float uBaseSize;\r
  uniform float uSizeRandomness;\r
  \r
  varying vec4 vRandom;\r
  varying vec3 vColor;\r
  \r
  void main() {\r
    vRandom = random;\r
    vColor = color;\r
    \r
    vec3 pos = position * uSpread;\r
    pos.z *= 10.0;\r
    \r
    vec4 mPos = modelMatrix * vec4(pos, 1.0);\r
    float t = uTime;\r
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);\r
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);\r
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);\r
    \r
    vec4 mvPos = viewMatrix * mPos;\r
    if (uSizeRandomness == 0.0) {\r
      gl_PointSize = uBaseSize;\r
    } else {\r
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);\r
    }\r
    \r
    gl_Position = projectionMatrix * mvPos;\r
  }\r
\`;\r
\r
const fragment = /* glsl */ \`\r
  precision highp float;\r
  \r
  uniform float uTime;\r
  uniform float uAlphaParticles;\r
  varying vec4 vRandom;\r
  varying vec3 vColor;\r
  \r
  void main() {\r
    vec2 uv = gl_PointCoord.xy;\r
    float d = length(uv - vec2(0.5));\r
    \r
    if(uAlphaParticles < 0.5) {\r
      if(d > 0.5) {\r
        discard;\r
      }\r
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);\r
    } else {\r
      float circle = smoothstep(0.5, 0.4, d) * 0.8;\r
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);\r
    }\r
  }\r
\`;\r
\r
const Particles: React.FC<ParticlesProps> = ({\r
  particleCount = 200,\r
  particleSpread = 10,\r
  speed = 0.1,\r
  particleColors,\r
  moveParticlesOnHover = false,\r
  particleHoverFactor = 1,\r
  alphaParticles = false,\r
  particleBaseSize = 100,\r
  sizeRandomness = 1,\r
  cameraDistance = 20,\r
  disableRotation = false,\r
  className\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ depth: false, alpha: true });\r
    const gl = renderer.gl;\r
    container.appendChild(gl.canvas);\r
    gl.clearColor(0, 0, 0, 0);\r
\r
    const camera = new Camera(gl, { fov: 15 });\r
    camera.position.set(0, 0, cameraDistance);\r
\r
    const resize = () => {\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width, height);\r
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });\r
    };\r
    window.addEventListener('resize', resize, false);\r
    resize();\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;\r
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);\r
      mouseRef.current = { x, y };\r
    };\r
\r
    if (moveParticlesOnHover) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    const count = particleCount;\r
    const positions = new Float32Array(count * 3);\r
    const randoms = new Float32Array(count * 4);\r
    const colors = new Float32Array(count * 3);\r
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;\r
\r
    for (let i = 0; i < count; i++) {\r
      let x: number, y: number, z: number, len: number;\r
      do {\r
        x = Math.random() * 2 - 1;\r
        y = Math.random() * 2 - 1;\r
        z = Math.random() * 2 - 1;\r
        len = x * x + y * y + z * z;\r
      } while (len > 1 || len === 0);\r
      const r = Math.cbrt(Math.random());\r
      positions.set([x * r, y * r, z * r], i * 3);\r
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);\r
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);\r
      colors.set(col, i * 3);\r
    }\r
\r
    const geometry = new Geometry(gl, {\r
      position: { size: 3, data: positions },\r
      random: { size: 4, data: randoms },\r
      color: { size: 3, data: colors }\r
    });\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uSpread: { value: particleSpread },\r
        uBaseSize: { value: particleBaseSize },\r
        uSizeRandomness: { value: sizeRandomness },\r
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }\r
      },\r
      transparent: true,\r
      depthTest: false\r
    });\r
\r
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });\r
\r
    let animationFrameId: number;\r
    let lastTime = performance.now();\r
    let elapsed = 0;\r
\r
    const update = (t: number) => {\r
      animationFrameId = requestAnimationFrame(update);\r
      const delta = t - lastTime;\r
      lastTime = t;\r
      elapsed += delta * speed;\r
\r
      program.uniforms.uTime.value = elapsed * 0.001;\r
\r
      if (moveParticlesOnHover) {\r
        particles.position.x = -mouseRef.current.x * particleHoverFactor;\r
        particles.position.y = -mouseRef.current.y * particleHoverFactor;\r
      } else {\r
        particles.position.x = 0;\r
        particles.position.y = 0;\r
      }\r
\r
      if (!disableRotation) {\r
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;\r
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;\r
        particles.rotation.z += 0.01 * speed;\r
      }\r
\r
      renderer.render({ scene: particles, camera });\r
    };\r
\r
    animationFrameId = requestAnimationFrame(update);\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      if (moveParticlesOnHover) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      cancelAnimationFrame(animationFrameId);\r
      if (container.contains(gl.canvas)) {\r
        container.removeChild(gl.canvas);\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    particleCount,\r
    particleSpread,\r
    speed,\r
    moveParticlesOnHover,\r
    particleHoverFactor,\r
    alphaParticles,\r
    particleBaseSize,\r
    sizeRandomness,\r
    cameraDistance,\r
    disableRotation\r
  ]);\r
\r
  return <div ref={containerRef} className={\`particles-container \${className}\`} />;\r
};\r
\r
export default Particles;\r
`,hr=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';\r
\r
interface ParticlesProps {\r
  particleCount?: number;\r
  particleSpread?: number;\r
  speed?: number;\r
  particleColors?: string[];\r
  moveParticlesOnHover?: boolean;\r
  particleHoverFactor?: number;\r
  alphaParticles?: boolean;\r
  particleBaseSize?: number;\r
  sizeRandomness?: number;\r
  cameraDistance?: number;\r
  disableRotation?: boolean;\r
  className?: string;\r
}\r
\r
const defaultColors: string[] = ['#ffffff', '#ffffff', '#ffffff'];\r
\r
const hexToRgb = (hex: string): [number, number, number] => {\r
  hex = hex.replace(/^#/, '');\r
  if (hex.length === 3) {\r
    hex = hex\r
      .split('')\r
      .map(c => c + c)\r
      .join('');\r
  }\r
  const int = parseInt(hex, 16);\r
  const r = ((int >> 16) & 255) / 255;\r
  const g = ((int >> 8) & 255) / 255;\r
  const b = (int & 255) / 255;\r
  return [r, g, b];\r
};\r
\r
const vertex = /* glsl */ \`\r
  attribute vec3 position;\r
  attribute vec4 random;\r
  attribute vec3 color;\r
  \r
  uniform mat4 modelMatrix;\r
  uniform mat4 viewMatrix;\r
  uniform mat4 projectionMatrix;\r
  uniform float uTime;\r
  uniform float uSpread;\r
  uniform float uBaseSize;\r
  uniform float uSizeRandomness;\r
  \r
  varying vec4 vRandom;\r
  varying vec3 vColor;\r
  \r
  void main() {\r
    vRandom = random;\r
    vColor = color;\r
    \r
    vec3 pos = position * uSpread;\r
    pos.z *= 10.0;\r
    \r
    vec4 mPos = modelMatrix * vec4(pos, 1.0);\r
    float t = uTime;\r
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);\r
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);\r
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);\r
    \r
    vec4 mvPos = viewMatrix * mPos;\r
\r
    if (uSizeRandomness == 0.0) {\r
      gl_PointSize = uBaseSize;\r
    } else {\r
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);\r
    }\r
    \r
    gl_Position = projectionMatrix * mvPos;\r
    gl_Position = projectionMatrix * mvPos;\r
  }\r
\`;\r
\r
const fragment = /* glsl */ \`\r
  precision highp float;\r
  \r
  uniform float uTime;\r
  uniform float uAlphaParticles;\r
  varying vec4 vRandom;\r
  varying vec3 vColor;\r
  \r
  void main() {\r
    vec2 uv = gl_PointCoord.xy;\r
    float d = length(uv - vec2(0.5));\r
    \r
    if(uAlphaParticles < 0.5) {\r
      if(d > 0.5) {\r
        discard;\r
      }\r
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);\r
    } else {\r
      float circle = smoothstep(0.5, 0.4, d) * 0.8;\r
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);\r
    }\r
  }\r
\`;\r
\r
const Particles: React.FC<ParticlesProps> = ({\r
  particleCount = 200,\r
  particleSpread = 10,\r
  speed = 0.1,\r
  particleColors,\r
  moveParticlesOnHover = false,\r
  particleHoverFactor = 1,\r
  alphaParticles = false,\r
  particleBaseSize = 100,\r
  sizeRandomness = 1,\r
  cameraDistance = 20,\r
  disableRotation = false,\r
  className\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ depth: false, alpha: true });\r
    const gl = renderer.gl;\r
    container.appendChild(gl.canvas);\r
    gl.clearColor(0, 0, 0, 0);\r
\r
    const camera = new Camera(gl, { fov: 15 });\r
    camera.position.set(0, 0, cameraDistance);\r
\r
    const resize = () => {\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width, height);\r
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });\r
    };\r
    window.addEventListener('resize', resize, false);\r
    resize();\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;\r
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);\r
      mouseRef.current = { x, y };\r
    };\r
\r
    if (moveParticlesOnHover) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    const count = particleCount;\r
    const positions = new Float32Array(count * 3);\r
    const randoms = new Float32Array(count * 4);\r
    const colors = new Float32Array(count * 3);\r
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;\r
\r
    for (let i = 0; i < count; i++) {\r
      let x: number, y: number, z: number, len: number;\r
      do {\r
        x = Math.random() * 2 - 1;\r
        y = Math.random() * 2 - 1;\r
        z = Math.random() * 2 - 1;\r
        len = x * x + y * y + z * z;\r
      } while (len > 1 || len === 0);\r
      const r = Math.cbrt(Math.random());\r
      positions.set([x * r, y * r, z * r], i * 3);\r
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);\r
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);\r
      colors.set(col, i * 3);\r
    }\r
\r
    const geometry = new Geometry(gl, {\r
      position: { size: 3, data: positions },\r
      random: { size: 4, data: randoms },\r
      color: { size: 3, data: colors }\r
    });\r
\r
    const program = new Program(gl, {\r
      vertex,\r
      fragment,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uSpread: { value: particleSpread },\r
        uBaseSize: { value: particleBaseSize },\r
        uSizeRandomness: { value: sizeRandomness },\r
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }\r
      },\r
      transparent: true,\r
      depthTest: false\r
    });\r
\r
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });\r
\r
    let animationFrameId: number;\r
    let lastTime = performance.now();\r
    let elapsed = 0;\r
\r
    const update = (t: number) => {\r
      animationFrameId = requestAnimationFrame(update);\r
      const delta = t - lastTime;\r
      lastTime = t;\r
      elapsed += delta * speed;\r
\r
      program.uniforms.uTime.value = elapsed * 0.001;\r
\r
      if (moveParticlesOnHover) {\r
        particles.position.x = -mouseRef.current.x * particleHoverFactor;\r
        particles.position.y = -mouseRef.current.y * particleHoverFactor;\r
      } else {\r
        particles.position.x = 0;\r
        particles.position.y = 0;\r
      }\r
\r
      if (!disableRotation) {\r
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;\r
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;\r
        particles.rotation.z += 0.01 * speed;\r
      }\r
\r
      renderer.render({ scene: particles, camera });\r
    };\r
\r
    animationFrameId = requestAnimationFrame(update);\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      if (moveParticlesOnHover) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      cancelAnimationFrame(animationFrameId);\r
      if (container.contains(gl.canvas)) {\r
        container.removeChild(gl.canvas);\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    particleCount,\r
    particleSpread,\r
    speed,\r
    moveParticlesOnHover,\r
    particleHoverFactor,\r
    alphaParticles,\r
    particleBaseSize,\r
    sizeRandomness,\r
    cameraDistance,\r
    disableRotation\r
  ]);\r
\r
  return <div ref={containerRef} className={\`relative w-full h-full \${className}\`} />;\r
};\r
\r
export default Particles;\r
`,gr={dependencies:"ogl",usage:`import Particles from './Particles';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>`,code:pr,css:ur,tailwind:fr,tsCode:vr,tsTailwind:hr},br=()=>{const[a,c]=i.useState("#ffffff"),[m,u]=i.useState(200),[l,d]=i.useState(10),[h,M]=i.useState(.1),[g,w]=i.useState(100),[x,F]=i.useState(!0),[z,y]=i.useState(!1),[o,P]=i.useState(!1),[n,R]=or(),C=[{name:"particleCount",type:"number",default:"200",description:"The number of particles to generate."},{name:"particleSpread",type:"number",default:"10",description:"Controls how far particles are spread from the center."},{name:"speed",type:"number",default:"0.1",description:"Speed factor controlling the animation pace."},{name:"particleColors",type:"string[]",default:"['#ffffff']",description:"An array of hex color strings used to color the particles."},{name:"moveParticlesOnHover",type:"boolean",default:"false",description:"Determines if particles should move in response to mouse hover."},{name:"particleHoverFactor",type:"number",default:"1",description:"Multiplier for the particle movement when hovering."},{name:"alphaParticles",type:"boolean",default:"false",description:"If true, particles are rendered with varying transparency; otherwise, as solid circles."},{name:"particleBaseSize",type:"number",default:"100",description:"The base size of the particles."},{name:"sizeRandomness",type:"number",default:"1",description:"Controls the variation in particle sizes (0 means all particles have the same size)."},{name:"cameraDistance",type:"number",default:"20",description:"Distance from the camera to the particle system."},{name:"disableRotation",type:"boolean",default:"false",description:"If true, stops the particle system from rotating."}];return r.jsxs(V,{children:[r.jsxs(Z,{children:[r.jsxs(J,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[r.jsx(dr,{particleColors:[a],particleCount:m,particleSpread:l,speed:h,particleBaseSize:g,moveParticlesOnHover:x,alphaParticles:z,disableRotation:o},n),r.jsx(ir,{pillText:"New Background",headline:"Particles that mimick the dance of the cosmos"})]}),r.jsxs(ar,{children:[r.jsxs(K,{gap:4,align:"center",mt:4,children:[r.jsx(Q,{fontSize:"sm",children:"Color"}),r.jsx(U,{type:"color",value:a,onChange:s=>{c(s.target.value),R()},width:"50px"})]}),r.jsx(T,{title:"Count",min:100,max:1e3,step:100,value:m,onChange:u}),r.jsx(T,{title:"Spread",min:10,max:100,step:10,value:l,onChange:d}),r.jsx(T,{title:"Speed",min:0,max:2,step:.1,value:h,onChange:M}),r.jsx(T,{title:"Base Size",min:100,max:1e3,step:100,value:g,onChange:w}),r.jsx(j,{title:"Mouse Interaction",isChecked:x,onChange:s=>F(s)}),r.jsx(j,{title:"Particle Transparency",isChecked:z,onChange:s=>y(s)}),r.jsx(j,{title:"Disable Rotation",isChecked:o,onChange:s=>P(s)})]}),r.jsx(rr,{data:C}),r.jsx(tr,{dependencyList:["ogl"]})]}),r.jsx(nr,{children:r.jsx(er,{codeObject:gr})})]})};export{br as default};
