import{r as s,j as t,B as N}from"./index-wsKSLPNH.js";import{T as I,P as V,a as _,C as $,b as k}from"./PropTable-C4uPWs8h.js";import{D as J}from"./Dependencies-BHoMfJUj.js";import{u as K}from"./useForceRerender-BCFU-k0M.js";import{C as Q}from"./Customize-1m_ZNqR9.js";import{P as U}from"./PreviewSlider-m1G_aiYP.js";import{B as Z}from"./BackgroundContent-CqU7Wlm2.js";import{S as ee,W as re,O as ne,g as te,aB as ie,ae as W,c as q,ah as ae,m as se,ac as oe,a as ue,a4 as ce,P as de,M as le}from"./three.module-0PRdiASR.js";import"./index-Bpz4cGEA.js";import"./PreviewSwitch-DqnF708j.js";const me=`
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,fe=`
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}`,ve=({grid:R=15,mouse:T=.1,strength:h=.15,relaxation:x=.9,imageSrc:w,className:H=""})=>{const p=s.useRef(null),z=s.useRef(null),g=s.useRef(null),O=s.useRef(null),j=s.useRef(null),B=s.useRef(1),y=s.useRef(null),b=s.useRef(null);return s.useEffect(()=>{if(!p.current)return;const i=p.current,M=new ee;z.current=M;const a=new re({antialias:!0,alpha:!0,powerPreference:"high-performance"});a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.setClearColor(0,0),g.current=a,i.innerHTML="",i.appendChild(a.domElement);const u=new ne(0,0,0,0,-1e3,1e3);u.position.z=2,O.current=u;const f={time:{value:0},resolution:{value:new te},uTexture:{value:null},uDataTexture:{value:null}};new ie().load(w,e=>{e.minFilter=W,e.magFilter=W,e.wrapS=q,e.wrapT=q,B.current=e.image.width/e.image.height,f.uTexture.value=e,E()});const r=R,D=new Float32Array(4*r*r);for(let e=0;e<r*r;e++)D[e*4]=Math.random()*255-125,D[e*4+1]=Math.random()*255-125;const m=new ae(D,r,r,se,oe);m.needsUpdate=!0,f.uDataTexture.value=m;const L=new ue({side:ce,uniforms:f,vertexShader:me,fragmentShader:fe,transparent:!0}),C=new de(1,1,r-1,r-1),S=new le(C,L);j.current=S,M.add(S);const E=()=>{if(!i||!a||!u)return;const e=i.getBoundingClientRect(),o=e.width,d=e.height;if(o===0||d===0)return;const l=o/d;a.setSize(o,d),S&&S.scale.set(l,1,1);const n=1,v=n*l;u.left=-v/2,u.right=v/2,u.top=n/2,u.bottom=-n/2,u.updateProjectionMatrix(),f.resolution.value.set(o,d,1,1)};if(window.ResizeObserver){const e=new ResizeObserver(()=>{E()});e.observe(i),b.current=e}else window.addEventListener("resize",E);const c={x:0,y:0,prevX:0,prevY:0,vX:0,vY:0},F=e=>{const o=i.getBoundingClientRect(),d=(e.clientX-o.left)/o.width,l=1-(e.clientY-o.top)/o.height;c.vX=d-c.prevX,c.vY=l-c.prevY,Object.assign(c,{x:d,y:l,prevX:d,prevY:l})},Y=()=>{m&&(m.needsUpdate=!0),Object.assign(c,{x:0,y:0,prevX:0,prevY:0,vX:0,vY:0})};i.addEventListener("mousemove",F),i.addEventListener("mouseleave",Y),E();const X=()=>{if(y.current=requestAnimationFrame(X),!a||!M||!u)return;f.time.value+=.05;const e=m.image.data;for(let n=0;n<r*r;n++)e[n*4]*=x,e[n*4+1]*=x;const o=r*c.x,d=r*c.y,l=r*T;for(let n=0;n<r;n++)for(let v=0;v<r;v++){const A=Math.pow(o-n,2)+Math.pow(d-v,2);if(A<l*l){const P=4*(n+r*v),G=Math.min(l/Math.sqrt(A),10);e[P]+=h*100*c.vX*G,e[P+1]-=h*100*c.vY*G}}m.needsUpdate=!0,a.render(M,u)};return X(),()=>{y.current&&cancelAnimationFrame(y.current),b.current?b.current.disconnect():window.removeEventListener("resize",E),i.removeEventListener("mousemove",F),i.removeEventListener("mouseleave",Y),a&&(a.dispose(),i.contains(a.domElement)&&i.removeChild(a.domElement)),C&&C.dispose(),L&&L.dispose(),m&&m.dispose(),f.uTexture.value&&f.uTexture.value.dispose(),z.current=null,g.current=null,O.current=null,j.current=null}},[R,T,h,x,w]),t.jsx("div",{ref:p,className:`distortion-container ${H}`,style:{width:"100%",height:"100%",minWidth:"0",minHeight:"0"}})},he=`import { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
import './GridDistortion.css';\r
\r
const vertexShader = \`\r
uniform float time;\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
void main() {\r
  vUv = uv;\r
  vPosition = position;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\`;\r
\r
const fragmentShader = \`\r
uniform sampler2D uDataTexture;\r
uniform sampler2D uTexture;\r
uniform vec4 resolution;\r
varying vec2 vUv;\r
\r
void main() {\r
  vec2 uv = vUv;\r
  vec4 offset = texture2D(uDataTexture, vUv);\r
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);\r
}\`;\r
\r
const GridDistortion = ({ grid = 15, mouse = 0.1, strength = 0.15, relaxation = 0.9, imageSrc, className = '' }) => {\r
  const containerRef = useRef(null);\r
  const sceneRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const cameraRef = useRef(null);\r
  const planeRef = useRef(null);\r
  const imageAspectRef = useRef(1);\r
  const animationIdRef = useRef(null);\r
  const resizeObserverRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const container = containerRef.current;\r
\r
    const scene = new THREE.Scene();\r
    sceneRef.current = scene;\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: true,\r
      alpha: true,\r
      powerPreference: 'high-performance'\r
    });\r
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\r
    renderer.setClearColor(0x000000, 0);\r
    rendererRef.current = renderer;\r
\r
    container.innerHTML = '';\r
    container.appendChild(renderer.domElement);\r
\r
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);\r
    camera.position.z = 2;\r
    cameraRef.current = camera;\r
\r
    const uniforms = {\r
      time: { value: 0 },\r
      resolution: { value: new THREE.Vector4() },\r
      uTexture: { value: null },\r
      uDataTexture: { value: null }\r
    };\r
\r
    const textureLoader = new THREE.TextureLoader();\r
    textureLoader.load(imageSrc, texture => {\r
      texture.minFilter = THREE.LinearFilter;\r
      texture.magFilter = THREE.LinearFilter;\r
      texture.wrapS = THREE.ClampToEdgeWrapping;\r
      texture.wrapT = THREE.ClampToEdgeWrapping;\r
      imageAspectRef.current = texture.image.width / texture.image.height;\r
      uniforms.uTexture.value = texture;\r
      handleResize();\r
    });\r
\r
    const size = grid;\r
    const data = new Float32Array(4 * size * size);\r
    for (let i = 0; i < size * size; i++) {\r
      data[i * 4] = Math.random() * 255 - 125;\r
      data[i * 4 + 1] = Math.random() * 255 - 125;\r
    }\r
\r
    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);\r
    dataTexture.needsUpdate = true;\r
    uniforms.uDataTexture.value = dataTexture;\r
\r
    const material = new THREE.ShaderMaterial({\r
      side: THREE.DoubleSide,\r
      uniforms,\r
      vertexShader,\r
      fragmentShader,\r
      transparent: true\r
    });\r
\r
    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);\r
    const plane = new THREE.Mesh(geometry, material);\r
    planeRef.current = plane;\r
    scene.add(plane);\r
\r
    const handleResize = () => {\r
      if (!container || !renderer || !camera) return;\r
\r
      const rect = container.getBoundingClientRect();\r
      const width = rect.width;\r
      const height = rect.height;\r
\r
      if (width === 0 || height === 0) return;\r
\r
      const containerAspect = width / height;\r
\r
      renderer.setSize(width, height);\r
\r
      if (plane) {\r
        plane.scale.set(containerAspect, 1, 1);\r
      }\r
\r
      const frustumHeight = 1;\r
      const frustumWidth = frustumHeight * containerAspect;\r
      camera.left = -frustumWidth / 2;\r
      camera.right = frustumWidth / 2;\r
      camera.top = frustumHeight / 2;\r
      camera.bottom = -frustumHeight / 2;\r
      camera.updateProjectionMatrix();\r
\r
      uniforms.resolution.value.set(width, height, 1, 1);\r
    };\r
\r
    if (window.ResizeObserver) {\r
      const resizeObserver = new ResizeObserver(() => {\r
        handleResize();\r
      });\r
      resizeObserver.observe(container);\r
      resizeObserverRef.current = resizeObserver;\r
    } else {\r
      window.addEventListener('resize', handleResize);\r
    }\r
\r
    const mouseState = {\r
      x: 0,\r
      y: 0,\r
      prevX: 0,\r
      prevY: 0,\r
      vX: 0,\r
      vY: 0\r
    };\r
\r
    const handleMouseMove = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1 - (e.clientY - rect.top) / rect.height;\r
      mouseState.vX = x - mouseState.prevX;\r
      mouseState.vY = y - mouseState.prevY;\r
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });\r
    };\r
\r
    const handleMouseLeave = () => {\r
      if (dataTexture) {\r
        dataTexture.needsUpdate = true;\r
      }\r
      Object.assign(mouseState, {\r
        x: 0,\r
        y: 0,\r
        prevX: 0,\r
        prevY: 0,\r
        vX: 0,\r
        vY: 0\r
      });\r
    };\r
\r
    container.addEventListener('mousemove', handleMouseMove);\r
    container.addEventListener('mouseleave', handleMouseLeave);\r
\r
    handleResize();\r
\r
    const animate = () => {\r
      animationIdRef.current = requestAnimationFrame(animate);\r
\r
      if (!renderer || !scene || !camera) return;\r
\r
      uniforms.time.value += 0.05;\r
\r
      const data = dataTexture.image.data;\r
      for (let i = 0; i < size * size; i++) {\r
        data[i * 4] *= relaxation;\r
        data[i * 4 + 1] *= relaxation;\r
      }\r
\r
      const gridMouseX = size * mouseState.x;\r
      const gridMouseY = size * mouseState.y;\r
      const maxDist = size * mouse;\r
\r
      for (let i = 0; i < size; i++) {\r
        for (let j = 0; j < size; j++) {\r
          const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);\r
          if (distSq < maxDist * maxDist) {\r
            const index = 4 * (i + size * j);\r
            const power = Math.min(maxDist / Math.sqrt(distSq), 10);\r
            data[index] += strength * 100 * mouseState.vX * power;\r
            data[index + 1] -= strength * 100 * mouseState.vY * power;\r
          }\r
        }\r
      }\r
\r
      dataTexture.needsUpdate = true;\r
      renderer.render(scene, camera);\r
    };\r
\r
    animate();\r
\r
    return () => {\r
      if (animationIdRef.current) {\r
        cancelAnimationFrame(animationIdRef.current);\r
      }\r
\r
      if (resizeObserverRef.current) {\r
        resizeObserverRef.current.disconnect();\r
      } else {\r
        window.removeEventListener('resize', handleResize);\r
      }\r
\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeEventListener('mouseleave', handleMouseLeave);\r
\r
      if (renderer) {\r
        renderer.dispose();\r
        if (container.contains(renderer.domElement)) {\r
          container.removeChild(renderer.domElement);\r
        }\r
      }\r
\r
      if (geometry) geometry.dispose();\r
      if (material) material.dispose();\r
      if (dataTexture) dataTexture.dispose();\r
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();\r
\r
      sceneRef.current = null;\r
      rendererRef.current = null;\r
      cameraRef.current = null;\r
      planeRef.current = null;\r
    };\r
  }, [grid, mouse, strength, relaxation, imageSrc]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`distortion-container \${className}\`}\r
      style={{\r
        width: '100%',\r
        height: '100%',\r
        minWidth: '0',\r
        minHeight: '0'\r
      }}\r
    />\r
  );\r
};\r
\r
export default GridDistortion;\r
`,pe=`.distortion-container {\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
}\r
`,ge=`import { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
\r
const vertexShader = \`\r
uniform float time;\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
void main() {\r
  vUv = uv;\r
  vPosition = position;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\`;\r
\r
const fragmentShader = \`\r
uniform sampler2D uDataTexture;\r
uniform sampler2D uTexture;\r
uniform vec4 resolution;\r
varying vec2 vUv;\r
\r
void main() {\r
  vec2 uv = vUv;\r
  vec4 offset = texture2D(uDataTexture, vUv);\r
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);\r
}\`;\r
\r
const GridDistortion = ({ grid = 15, mouse = 0.1, strength = 0.15, relaxation = 0.9, imageSrc, className = '' }) => {\r
  const containerRef = useRef(null);\r
  const sceneRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const cameraRef = useRef(null);\r
  const planeRef = useRef(null);\r
  const imageAspectRef = useRef(1);\r
  const animationIdRef = useRef(null);\r
  const resizeObserverRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const container = containerRef.current;\r
\r
    const scene = new THREE.Scene();\r
    sceneRef.current = scene;\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: true,\r
      alpha: true,\r
      powerPreference: 'high-performance'\r
    });\r
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\r
    renderer.setClearColor(0x000000, 0);\r
    rendererRef.current = renderer;\r
\r
    container.innerHTML = '';\r
    container.appendChild(renderer.domElement);\r
\r
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);\r
    camera.position.z = 2;\r
    cameraRef.current = camera;\r
\r
    const uniforms = {\r
      time: { value: 0 },\r
      resolution: { value: new THREE.Vector4() },\r
      uTexture: { value: null },\r
      uDataTexture: { value: null }\r
    };\r
\r
    const textureLoader = new THREE.TextureLoader();\r
    textureLoader.load(imageSrc, texture => {\r
      texture.minFilter = THREE.LinearFilter;\r
      texture.magFilter = THREE.LinearFilter;\r
      texture.wrapS = THREE.ClampToEdgeWrapping;\r
      texture.wrapT = THREE.ClampToEdgeWrapping;\r
      imageAspectRef.current = texture.image.width / texture.image.height;\r
      uniforms.uTexture.value = texture;\r
      handleResize();\r
    });\r
\r
    const size = grid;\r
    const data = new Float32Array(4 * size * size);\r
    for (let i = 0; i < size * size; i++) {\r
      data[i * 4] = Math.random() * 255 - 125;\r
      data[i * 4 + 1] = Math.random() * 255 - 125;\r
    }\r
\r
    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);\r
    dataTexture.needsUpdate = true;\r
    uniforms.uDataTexture.value = dataTexture;\r
\r
    const material = new THREE.ShaderMaterial({\r
      side: THREE.DoubleSide,\r
      uniforms,\r
      vertexShader,\r
      fragmentShader,\r
      transparent: true\r
    });\r
\r
    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);\r
    const plane = new THREE.Mesh(geometry, material);\r
    planeRef.current = plane;\r
    scene.add(plane);\r
\r
    const handleResize = () => {\r
      if (!container || !renderer || !camera) return;\r
\r
      const rect = container.getBoundingClientRect();\r
      const width = rect.width;\r
      const height = rect.height;\r
\r
      if (width === 0 || height === 0) return;\r
\r
      const containerAspect = width / height;\r
\r
      renderer.setSize(width, height);\r
\r
      if (plane) {\r
        plane.scale.set(containerAspect, 1, 1);\r
      }\r
\r
      const frustumHeight = 1;\r
      const frustumWidth = frustumHeight * containerAspect;\r
      camera.left = -frustumWidth / 2;\r
      camera.right = frustumWidth / 2;\r
      camera.top = frustumHeight / 2;\r
      camera.bottom = -frustumHeight / 2;\r
      camera.updateProjectionMatrix();\r
\r
      uniforms.resolution.value.set(width, height, 1, 1);\r
    };\r
\r
    if (window.ResizeObserver) {\r
      const resizeObserver = new ResizeObserver(() => {\r
        handleResize();\r
      });\r
      resizeObserver.observe(container);\r
      resizeObserverRef.current = resizeObserver;\r
    } else {\r
      window.addEventListener('resize', handleResize);\r
    }\r
\r
    const mouseState = {\r
      x: 0,\r
      y: 0,\r
      prevX: 0,\r
      prevY: 0,\r
      vX: 0,\r
      vY: 0\r
    };\r
\r
    const handleMouseMove = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1 - (e.clientY - rect.top) / rect.height;\r
      mouseState.vX = x - mouseState.prevX;\r
      mouseState.vY = y - mouseState.prevY;\r
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });\r
    };\r
\r
    const handleMouseLeave = () => {\r
      if (dataTexture) {\r
        dataTexture.needsUpdate = true;\r
      }\r
      Object.assign(mouseState, {\r
        x: 0,\r
        y: 0,\r
        prevX: 0,\r
        prevY: 0,\r
        vX: 0,\r
        vY: 0\r
      });\r
    };\r
\r
    container.addEventListener('mousemove', handleMouseMove);\r
    container.addEventListener('mouseleave', handleMouseLeave);\r
\r
    handleResize();\r
\r
    const animate = () => {\r
      animationIdRef.current = requestAnimationFrame(animate);\r
\r
      if (!renderer || !scene || !camera) return;\r
\r
      uniforms.time.value += 0.05;\r
\r
      const data = dataTexture.image.data;\r
      for (let i = 0; i < size * size; i++) {\r
        data[i * 4] *= relaxation;\r
        data[i * 4 + 1] *= relaxation;\r
      }\r
\r
      const gridMouseX = size * mouseState.x;\r
      const gridMouseY = size * mouseState.y;\r
      const maxDist = size * mouse;\r
\r
      for (let i = 0; i < size; i++) {\r
        for (let j = 0; j < size; j++) {\r
          const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);\r
          if (distSq < maxDist * maxDist) {\r
            const index = 4 * (i + size * j);\r
            const power = Math.min(maxDist / Math.sqrt(distSq), 10);\r
            data[index] += strength * 100 * mouseState.vX * power;\r
            data[index + 1] -= strength * 100 * mouseState.vY * power;\r
          }\r
        }\r
      }\r
\r
      dataTexture.needsUpdate = true;\r
      renderer.render(scene, camera);\r
    };\r
\r
    animate();\r
\r
    return () => {\r
      if (animationIdRef.current) {\r
        cancelAnimationFrame(animationIdRef.current);\r
      }\r
\r
      if (resizeObserverRef.current) {\r
        resizeObserverRef.current.disconnect();\r
      } else {\r
        window.removeEventListener('resize', handleResize);\r
      }\r
\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeEventListener('mouseleave', handleMouseLeave);\r
\r
      if (renderer) {\r
        renderer.dispose();\r
        if (container.contains(renderer.domElement)) {\r
          container.removeChild(renderer.domElement);\r
        }\r
      }\r
\r
      if (geometry) geometry.dispose();\r
      if (material) material.dispose();\r
      if (dataTexture) dataTexture.dispose();\r
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();\r
\r
      sceneRef.current = null;\r
      rendererRef.current = null;\r
      cameraRef.current = null;\r
      planeRef.current = null;\r
    };\r
  }, [grid, mouse, strength, relaxation, imageSrc]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`relative overflow-hidden \${className}\`}\r
      style={{\r
        width: '100%',\r
        height: '100%',\r
        minWidth: '0',\r
        minHeight: '0'\r
      }}\r
    />\r
  );\r
};\r
\r
export default GridDistortion;\r
`,Re=`import React, { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
import './GridDistortion.css';\r
\r
interface GridDistortionProps {\r
  grid?: number;\r
  mouse?: number;\r
  strength?: number;\r
  relaxation?: number;\r
  imageSrc: string;\r
  className?: string;\r
}\r
\r
const vertexShader = \`\r
uniform float time;\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
void main() {\r
  vUv = uv;\r
  vPosition = position;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
uniform sampler2D uDataTexture;\r
uniform sampler2D uTexture;\r
uniform vec4 resolution;\r
varying vec2 vUv;\r
\r
void main() {\r
  vec2 uv = vUv;\r
  vec4 offset = texture2D(uDataTexture, vUv);\r
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);\r
}\r
\`;\r
\r
const GridDistortion: React.FC<GridDistortionProps> = ({\r
  grid = 15,\r
  mouse = 0.1,\r
  strength = 0.15,\r
  relaxation = 0.9,\r
  imageSrc,\r
  className = ''\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const sceneRef = useRef<THREE.Scene | null>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);\r
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);\r
  const planeRef = useRef<THREE.Mesh | null>(null);\r
  const imageAspectRef = useRef<number>(1);\r
  const animationIdRef = useRef<number | null>(null);\r
  const resizeObserverRef = useRef<ResizeObserver | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const container = containerRef.current;\r
\r
    const scene = new THREE.Scene();\r
    sceneRef.current = scene;\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: true,\r
      alpha: true,\r
      powerPreference: 'high-performance'\r
    });\r
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\r
    renderer.setClearColor(0x000000, 0);\r
    rendererRef.current = renderer;\r
\r
    container.innerHTML = '';\r
    container.appendChild(renderer.domElement);\r
\r
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);\r
    camera.position.z = 2;\r
    cameraRef.current = camera;\r
\r
    const uniforms = {\r
      time: { value: 0 },\r
      resolution: { value: new THREE.Vector4() },\r
      uTexture: { value: null as THREE.Texture | null },\r
      uDataTexture: { value: null as THREE.DataTexture | null }\r
    };\r
\r
    const textureLoader = new THREE.TextureLoader();\r
    textureLoader.load(imageSrc, texture => {\r
      texture.minFilter = THREE.LinearFilter;\r
      texture.magFilter = THREE.LinearFilter;\r
      texture.wrapS = THREE.ClampToEdgeWrapping;\r
      texture.wrapT = THREE.ClampToEdgeWrapping;\r
      imageAspectRef.current = texture.image.width / texture.image.height;\r
      uniforms.uTexture.value = texture;\r
      handleResize();\r
    });\r
\r
    const size = grid;\r
    const data = new Float32Array(4 * size * size);\r
    for (let i = 0; i < size * size; i++) {\r
      data[i * 4] = Math.random() * 255 - 125;\r
      data[i * 4 + 1] = Math.random() * 255 - 125;\r
    }\r
\r
    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);\r
    dataTexture.needsUpdate = true;\r
    uniforms.uDataTexture.value = dataTexture;\r
\r
    const material = new THREE.ShaderMaterial({\r
      side: THREE.DoubleSide,\r
      uniforms,\r
      vertexShader,\r
      fragmentShader,\r
      transparent: true\r
    });\r
\r
    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);\r
    const plane = new THREE.Mesh(geometry, material);\r
    planeRef.current = plane;\r
    scene.add(plane);\r
\r
    const handleResize = () => {\r
      if (!container || !renderer || !camera) return;\r
\r
      const rect = container.getBoundingClientRect();\r
      const width = rect.width;\r
      const height = rect.height;\r
\r
      if (width === 0 || height === 0) return;\r
\r
      const containerAspect = width / height;\r
\r
      renderer.setSize(width, height);\r
\r
      if (plane) {\r
        plane.scale.set(containerAspect, 1, 1);\r
      }\r
\r
      const frustumHeight = 1;\r
      const frustumWidth = frustumHeight * containerAspect;\r
      camera.left = -frustumWidth / 2;\r
      camera.right = frustumWidth / 2;\r
      camera.top = frustumHeight / 2;\r
      camera.bottom = -frustumHeight / 2;\r
      camera.updateProjectionMatrix();\r
\r
      uniforms.resolution.value.set(width, height, 1, 1);\r
    };\r
\r
    if (window.ResizeObserver) {\r
      const resizeObserver = new ResizeObserver(() => {\r
        handleResize();\r
      });\r
      resizeObserver.observe(container);\r
      resizeObserverRef.current = resizeObserver;\r
    } else {\r
      window.addEventListener('resize', handleResize);\r
    }\r
\r
    const mouseState = {\r
      x: 0,\r
      y: 0,\r
      prevX: 0,\r
      prevY: 0,\r
      vX: 0,\r
      vY: 0\r
    };\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1 - (e.clientY - rect.top) / rect.height;\r
      mouseState.vX = x - mouseState.prevX;\r
      mouseState.vY = y - mouseState.prevY;\r
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });\r
    };\r
\r
    const handleMouseLeave = () => {\r
      if (dataTexture) {\r
        dataTexture.needsUpdate = true;\r
      }\r
      Object.assign(mouseState, {\r
        x: 0,\r
        y: 0,\r
        prevX: 0,\r
        prevY: 0,\r
        vX: 0,\r
        vY: 0\r
      });\r
    };\r
\r
    container.addEventListener('mousemove', handleMouseMove);\r
    container.addEventListener('mouseleave', handleMouseLeave);\r
\r
    handleResize();\r
\r
    const animate = () => {\r
      animationIdRef.current = requestAnimationFrame(animate);\r
\r
      if (!renderer || !scene || !camera) return;\r
\r
      uniforms.time.value += 0.05;\r
\r
      if (!(dataTexture.image.data instanceof Float32Array)) {\r
        console.error('dataTexture.image.data is not a Float32Array');\r
        return;\r
      }\r
      const data: Float32Array = dataTexture.image.data;\r
      for (let i = 0; i < size * size; i++) {\r
        data[i * 4] *= relaxation;\r
        data[i * 4 + 1] *= relaxation;\r
      }\r
\r
      const gridMouseX = size * mouseState.x;\r
      const gridMouseY = size * mouseState.y;\r
      const maxDist = size * mouse;\r
\r
      for (let i = 0; i < size; i++) {\r
        for (let j = 0; j < size; j++) {\r
          const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);\r
          if (distSq < maxDist * maxDist) {\r
            const index = 4 * (i + size * j);\r
            const power = Math.min(maxDist / Math.sqrt(distSq), 10);\r
            data[index] += strength * 100 * mouseState.vX * power;\r
            data[index + 1] -= strength * 100 * mouseState.vY * power;\r
          }\r
        }\r
      }\r
\r
      dataTexture.needsUpdate = true;\r
      renderer.render(scene, camera);\r
    };\r
\r
    animate();\r
\r
    return () => {\r
      if (animationIdRef.current) {\r
        cancelAnimationFrame(animationIdRef.current);\r
      }\r
\r
      if (resizeObserverRef.current) {\r
        resizeObserverRef.current.disconnect();\r
      } else {\r
        window.removeEventListener('resize', handleResize);\r
      }\r
\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeEventListener('mouseleave', handleMouseLeave);\r
\r
      if (renderer) {\r
        renderer.dispose();\r
        if (container.contains(renderer.domElement)) {\r
          container.removeChild(renderer.domElement);\r
        }\r
      }\r
\r
      if (geometry) geometry.dispose();\r
      if (material) material.dispose();\r
      if (dataTexture) dataTexture.dispose();\r
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();\r
\r
      sceneRef.current = null;\r
      rendererRef.current = null;\r
      cameraRef.current = null;\r
      planeRef.current = null;\r
    };\r
  }, [grid, mouse, strength, relaxation, imageSrc]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`distortion-container \${className}\`}\r
      style={{\r
        width: '100%',\r
        height: '100%',\r
        minWidth: '0',\r
        minHeight: '0'\r
      }}\r
    />\r
  );\r
};\r
\r
export default GridDistortion;\r
`,xe=`import React, { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
\r
interface GridDistortionProps {\r
  grid?: number;\r
  mouse?: number;\r
  strength?: number;\r
  relaxation?: number;\r
  imageSrc: string;\r
  className?: string;\r
}\r
\r
const vertexShader = \`\r
uniform float time;\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
void main() {\r
  vUv = uv;\r
  vPosition = position;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
uniform sampler2D uDataTexture;\r
uniform sampler2D uTexture;\r
uniform vec4 resolution;\r
varying vec2 vUv;\r
\r
void main() {\r
  vec2 uv = vUv;\r
  vec4 offset = texture2D(uDataTexture, vUv);\r
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);\r
}\r
\`;\r
\r
const GridDistortion: React.FC<GridDistortionProps> = ({\r
  grid = 15,\r
  mouse = 0.1,\r
  strength = 0.15,\r
  relaxation = 0.9,\r
  imageSrc,\r
  className = ''\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const sceneRef = useRef<THREE.Scene | null>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);\r
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);\r
  const planeRef = useRef<THREE.Mesh | null>(null);\r
  const imageAspectRef = useRef<number>(1);\r
  const animationIdRef = useRef<number | null>(null);\r
  const resizeObserverRef = useRef<ResizeObserver | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const container = containerRef.current;\r
\r
    const scene = new THREE.Scene();\r
    sceneRef.current = scene;\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: true,\r
      alpha: true,\r
      powerPreference: 'high-performance'\r
    });\r
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\r
    renderer.setClearColor(0x000000, 0);\r
    rendererRef.current = renderer;\r
\r
    container.innerHTML = '';\r
    container.appendChild(renderer.domElement);\r
\r
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);\r
    camera.position.z = 2;\r
    cameraRef.current = camera;\r
\r
    const uniforms = {\r
      time: { value: 0 },\r
      resolution: { value: new THREE.Vector4() },\r
      uTexture: { value: null as THREE.Texture | null },\r
      uDataTexture: { value: null as THREE.DataTexture | null }\r
    };\r
\r
    const textureLoader = new THREE.TextureLoader();\r
    textureLoader.load(imageSrc, texture => {\r
      texture.minFilter = THREE.LinearFilter;\r
      texture.magFilter = THREE.LinearFilter;\r
      texture.wrapS = THREE.ClampToEdgeWrapping;\r
      texture.wrapT = THREE.ClampToEdgeWrapping;\r
      imageAspectRef.current = texture.image.width / texture.image.height;\r
      uniforms.uTexture.value = texture;\r
      handleResize();\r
    });\r
\r
    const size = grid;\r
    const data = new Float32Array(4 * size * size);\r
    for (let i = 0; i < size * size; i++) {\r
      data[i * 4] = Math.random() * 255 - 125;\r
      data[i * 4 + 1] = Math.random() * 255 - 125;\r
    }\r
\r
    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);\r
    dataTexture.needsUpdate = true;\r
    uniforms.uDataTexture.value = dataTexture;\r
\r
    const material = new THREE.ShaderMaterial({\r
      side: THREE.DoubleSide,\r
      uniforms,\r
      vertexShader,\r
      fragmentShader,\r
      transparent: true\r
    });\r
\r
    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);\r
    const plane = new THREE.Mesh(geometry, material);\r
    planeRef.current = plane;\r
    scene.add(plane);\r
\r
    const handleResize = () => {\r
      if (!container || !renderer || !camera) return;\r
\r
      const rect = container.getBoundingClientRect();\r
      const width = rect.width;\r
      const height = rect.height;\r
\r
      if (width === 0 || height === 0) return;\r
\r
      const containerAspect = width / height;\r
\r
      renderer.setSize(width, height);\r
\r
      if (plane) {\r
        plane.scale.set(containerAspect, 1, 1);\r
      }\r
\r
      const frustumHeight = 1;\r
      const frustumWidth = frustumHeight * containerAspect;\r
      camera.left = -frustumWidth / 2;\r
      camera.right = frustumWidth / 2;\r
      camera.top = frustumHeight / 2;\r
      camera.bottom = -frustumHeight / 2;\r
      camera.updateProjectionMatrix();\r
\r
      uniforms.resolution.value.set(width, height, 1, 1);\r
    };\r
\r
    if (window.ResizeObserver) {\r
      const resizeObserver = new ResizeObserver(() => {\r
        handleResize();\r
      });\r
      resizeObserver.observe(container);\r
      resizeObserverRef.current = resizeObserver;\r
    } else {\r
      window.addEventListener('resize', handleResize);\r
    }\r
\r
    const mouseState = {\r
      x: 0,\r
      y: 0,\r
      prevX: 0,\r
      prevY: 0,\r
      vX: 0,\r
      vY: 0\r
    };\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1 - (e.clientY - rect.top) / rect.height;\r
      mouseState.vX = x - mouseState.prevX;\r
      mouseState.vY = y - mouseState.prevY;\r
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });\r
    };\r
\r
    const handleMouseLeave = () => {\r
      if (dataTexture) {\r
        dataTexture.needsUpdate = true;\r
      }\r
      Object.assign(mouseState, {\r
        x: 0,\r
        y: 0,\r
        prevX: 0,\r
        prevY: 0,\r
        vX: 0,\r
        vY: 0\r
      });\r
    };\r
\r
    container.addEventListener('mousemove', handleMouseMove);\r
    container.addEventListener('mouseleave', handleMouseLeave);\r
\r
    handleResize();\r
\r
    const animate = () => {\r
      animationIdRef.current = requestAnimationFrame(animate);\r
\r
      if (!renderer || !scene || !camera) return;\r
\r
      uniforms.time.value += 0.05;\r
\r
      if (!(dataTexture.image.data instanceof Float32Array)) {\r
        console.error('dataTexture.image.data is not a Float32Array');\r
        return;\r
      }\r
      const data: Float32Array = dataTexture.image.data;\r
      for (let i = 0; i < size * size; i++) {\r
        data[i * 4] *= relaxation;\r
        data[i * 4 + 1] *= relaxation;\r
      }\r
\r
      const gridMouseX = size * mouseState.x;\r
      const gridMouseY = size * mouseState.y;\r
      const maxDist = size * mouse;\r
\r
      for (let i = 0; i < size; i++) {\r
        for (let j = 0; j < size; j++) {\r
          const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);\r
          if (distSq < maxDist * maxDist) {\r
            const index = 4 * (i + size * j);\r
            const power = Math.min(maxDist / Math.sqrt(distSq), 10);\r
            data[index] += strength * 100 * mouseState.vX * power;\r
            data[index + 1] -= strength * 100 * mouseState.vY * power;\r
          }\r
        }\r
      }\r
\r
      dataTexture.needsUpdate = true;\r
      renderer.render(scene, camera);\r
    };\r
\r
    animate();\r
\r
    return () => {\r
      if (animationIdRef.current) {\r
        cancelAnimationFrame(animationIdRef.current);\r
      }\r
\r
      if (resizeObserverRef.current) {\r
        resizeObserverRef.current.disconnect();\r
      } else {\r
        window.removeEventListener('resize', handleResize);\r
      }\r
\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeEventListener('mouseleave', handleMouseLeave);\r
\r
      if (renderer) {\r
        renderer.dispose();\r
        if (container.contains(renderer.domElement)) {\r
          container.removeChild(renderer.domElement);\r
        }\r
      }\r
\r
      if (geometry) geometry.dispose();\r
      if (material) material.dispose();\r
      if (dataTexture) dataTexture.dispose();\r
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();\r
\r
      sceneRef.current = null;\r
      rendererRef.current = null;\r
      cameraRef.current = null;\r
      planeRef.current = null;\r
    };\r
  }, [grid, mouse, strength, relaxation, imageSrc]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`relative overflow-hidden \${className}\`}\r
      style={{\r
        width: '100%',\r
        height: '100%',\r
        minWidth: '0',\r
        minHeight: '0'\r
      }}\r
    />\r
  );\r
};\r
\r
export default GridDistortion;\r
`,Ee={dependencies:"three",usage:`import GridDistortion from './GridDistortion';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <GridDistortion
    imageSrc="https://picsum.photos/1920/1080?grayscale"
    grid={10}
    mouse={0.1}
    strength={0.15}
    relaxation={0.9}
    className="custom-class"
  />
</div>`,code:he,css:pe,tailwind:ge,tsCode:Re,tsTailwind:xe},Oe=()=>{const[R,T]=s.useState(10),[h,x]=s.useState(.25),w=s.useRef(null),[H,p]=K(),z=[{name:"imgageSrc",type:"string",default:"",description:"The image you want to render inside the container."},{name:"grid",type:"number",default:"15",description:"The number of cells present in the distortion grid"},{name:"mouse",type:"number",default:"0.1",description:"The size of the distortion effect that follows the cursor."},{name:"relaxation",type:"number",default:"0.9",description:"The speed at which grid cells return to their initial state."},{name:"strength",type:"number",default:"0.15",description:"The overall strength of the distortion effect."},{name:"className",type:"string",default:"",description:"Any custom class(es) you want to apply to the container."}];return t.jsxs(I,{children:[t.jsxs(V,{children:[t.jsxs(N,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",ref:w,children:[t.jsx(ve,{imageSrc:"https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",grid:R,mouse:h,strength:.15,relaxation:.9,className:"grid-distortion"},H),t.jsx(Z,{pillText:"New Background",headline:"Don't just sit there, move your cursor!"})]}),t.jsxs(Q,{children:[t.jsx(U,{title:"Grid Size",min:6,max:200,step:1,value:R,onChange:g=>{T(g),p()},width:200}),t.jsx(U,{title:"Mouse Size",min:.1,max:.5,step:.01,value:h,onChange:g=>{x(g),p()},width:200})]}),t.jsx(_,{data:z}),t.jsx(J,{dependencyList:["three"]})]}),t.jsx($,{children:t.jsx(k,{codeObject:Ee})})]})};export{Oe as default};
