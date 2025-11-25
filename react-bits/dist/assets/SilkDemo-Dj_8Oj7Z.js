import{r as o,j as r,B as S,F as y,T as g,d as C}from"./index-wsKSLPNH.js";import{T as R,P as k,a as P,C as b,b as w}from"./PropTable-C4uPWs8h.js";import{C as I}from"./Customize-1m_ZNqR9.js";import{D as U}from"./Dependencies-BHoMfJUj.js";import{u as T}from"./useForceRerender-BCFU-k0M.js";import{P as f}from"./PreviewSlider-m1G_aiYP.js";import{B as M}from"./BackgroundContent-CqU7Wlm2.js";import{C as N,a as j,u as G}from"./react-three-fiber.esm-Dkk-fK7P.js";import{C as F}from"./three.module-0PRdiASR.js";import"./index-Bpz4cGEA.js";import"./PreviewSwitch-DqnF708j.js";const B=`/* eslint-disable react/no-unknown-property */\r
import { Canvas, useFrame, useThree } from '@react-three/fiber';\r
import { forwardRef, useRef, useMemo, useLayoutEffect } from 'react';\r
import { Color } from 'three';\r
\r
const hexToNormalizedRGB = hex => {\r
  hex = hex.replace('#', '');\r
  return [\r
    parseInt(hex.slice(0, 2), 16) / 255,\r
    parseInt(hex.slice(2, 4), 16) / 255,\r
    parseInt(hex.slice(4, 6), 16) / 255\r
  ];\r
};\r
\r
const vertexShader = \`\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
void main() {\r
  vPosition = position;\r
  vUv = uv;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
uniform float uTime;\r
uniform vec3  uColor;\r
uniform float uSpeed;\r
uniform float uScale;\r
uniform float uRotation;\r
uniform float uNoiseIntensity;\r
\r
const float e = 2.71828182845904523536;\r
\r
float noise(vec2 texCoord) {\r
  float G = e;\r
  vec2  r = (G * sin(G * texCoord));\r
  return fract(r.x * r.y * (1.0 + texCoord.x));\r
}\r
\r
vec2 rotateUvs(vec2 uv, float angle) {\r
  float c = cos(angle);\r
  float s = sin(angle);\r
  mat2  rot = mat2(c, -s, s, c);\r
  return rot * uv;\r
}\r
\r
void main() {\r
  float rnd        = noise(gl_FragCoord.xy);\r
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);\r
  vec2  tex        = uv * uScale;\r
  float tOffset    = uSpeed * uTime;\r
\r
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);\r
\r
  float pattern = 0.6 +\r
                  0.4 * sin(5.0 * (tex.x + tex.y +\r
                                   cos(3.0 * tex.x + 5.0 * tex.y) +\r
                                   0.02 * tOffset) +\r
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));\r
\r
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;\r
  col.a = 1.0;\r
  gl_FragColor = col;\r
}\r
\`;\r
\r
const SilkPlane = forwardRef(function SilkPlane({ uniforms }, ref) {\r
  const { viewport } = useThree();\r
\r
  useLayoutEffect(() => {\r
    if (ref.current) {\r
      ref.current.scale.set(viewport.width, viewport.height, 1);\r
    }\r
  }, [ref, viewport]);\r
\r
  useFrame((_, delta) => {\r
    ref.current.material.uniforms.uTime.value += 0.1 * delta;\r
  });\r
\r
  return (\r
    <mesh ref={ref}>\r
      <planeGeometry args={[1, 1, 1, 1]} />\r
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />\r
    </mesh>\r
  );\r
});\r
SilkPlane.displayName = 'SilkPlane';\r
\r
const Silk = ({ speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {\r
  const meshRef = useRef();\r
\r
  const uniforms = useMemo(\r
    () => ({\r
      uSpeed: { value: speed },\r
      uScale: { value: scale },\r
      uNoiseIntensity: { value: noiseIntensity },\r
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },\r
      uRotation: { value: rotation },\r
      uTime: { value: 0 }\r
    }),\r
    [speed, scale, noiseIntensity, color, rotation]\r
  );\r
\r
  return (\r
    <Canvas dpr={[1, 2]} frameloop="always">\r
      <SilkPlane ref={meshRef} uniforms={uniforms} />\r
    </Canvas>\r
  );\r
};\r
\r
export default Silk;\r
`,O=`/* eslint-disable react/no-unknown-property */\r
import { Canvas, useFrame, useThree } from '@react-three/fiber';\r
import { forwardRef, useRef, useMemo, useLayoutEffect } from 'react';\r
import { Color } from 'three';\r
\r
const hexToNormalizedRGB = hex => {\r
  hex = hex.replace('#', '');\r
  return [\r
    parseInt(hex.slice(0, 2), 16) / 255,\r
    parseInt(hex.slice(2, 4), 16) / 255,\r
    parseInt(hex.slice(4, 6), 16) / 255\r
  ];\r
};\r
\r
const vertexShader = \`\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
void main() {\r
  vPosition = position;\r
  vUv = uv;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
uniform float uTime;\r
uniform vec3  uColor;\r
uniform float uSpeed;\r
uniform float uScale;\r
uniform float uRotation;\r
uniform float uNoiseIntensity;\r
\r
const float e = 2.71828182845904523536;\r
\r
float noise(vec2 texCoord) {\r
  float G = e;\r
  vec2  r = (G * sin(G * texCoord));\r
  return fract(r.x * r.y * (1.0 + texCoord.x));\r
}\r
\r
vec2 rotateUvs(vec2 uv, float angle) {\r
  float c = cos(angle);\r
  float s = sin(angle);\r
  mat2  rot = mat2(c, -s, s, c);\r
  return rot * uv;\r
}\r
\r
void main() {\r
  float rnd        = noise(gl_FragCoord.xy);\r
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);\r
  vec2  tex        = uv * uScale;\r
  float tOffset    = uSpeed * uTime;\r
\r
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);\r
\r
  float pattern = 0.6 +\r
                  0.4 * sin(5.0 * (tex.x + tex.y +\r
                                   cos(3.0 * tex.x + 5.0 * tex.y) +\r
                                   0.02 * tOffset) +\r
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));\r
\r
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;\r
  col.a = 1.0;\r
  gl_FragColor = col;\r
}\r
\`;\r
\r
const SilkPlane = forwardRef(function SilkPlane({ uniforms }, ref) {\r
  const { viewport } = useThree();\r
\r
  useLayoutEffect(() => {\r
    if (ref.current) {\r
      ref.current.scale.set(viewport.width, viewport.height, 1);\r
    }\r
  }, [ref, viewport]);\r
\r
  useFrame((_, delta) => {\r
    ref.current.material.uniforms.uTime.value += 0.1 * delta;\r
  });\r
\r
  return (\r
    <mesh ref={ref}>\r
      <planeGeometry args={[1, 1, 1, 1]} />\r
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />\r
    </mesh>\r
  );\r
});\r
SilkPlane.displayName = 'SilkPlane';\r
\r
const Silk = ({ speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {\r
  const meshRef = useRef();\r
\r
  const uniforms = useMemo(\r
    () => ({\r
      uSpeed: { value: speed },\r
      uScale: { value: scale },\r
      uNoiseIntensity: { value: noiseIntensity },\r
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },\r
      uRotation: { value: rotation },\r
      uTime: { value: 0 }\r
    }),\r
    [speed, scale, noiseIntensity, color, rotation]\r
  );\r
\r
  return (\r
    <Canvas dpr={[1, 2]} frameloop="always">\r
      <SilkPlane ref={meshRef} uniforms={uniforms} />\r
    </Canvas>\r
  );\r
};\r
\r
export default Silk;\r
`,_=`/* eslint-disable react/no-unknown-property */\r
import React, { forwardRef, useMemo, useRef, useLayoutEffect } from 'react';\r
import { Canvas, useFrame, useThree, RootState } from '@react-three/fiber';\r
import { Color, Mesh, ShaderMaterial } from 'three';\r
import { IUniform } from 'three';\r
\r
type NormalizedRGB = [number, number, number];\r
\r
const hexToNormalizedRGB = (hex: string): NormalizedRGB => {\r
  const clean = hex.replace('#', '');\r
  const r = parseInt(clean.slice(0, 2), 16) / 255;\r
  const g = parseInt(clean.slice(2, 4), 16) / 255;\r
  const b = parseInt(clean.slice(4, 6), 16) / 255;\r
  return [r, g, b];\r
};\r
\r
interface UniformValue<T = number | Color> {\r
  value: T;\r
}\r
\r
interface SilkUniforms {\r
  uSpeed: UniformValue<number>;\r
  uScale: UniformValue<number>;\r
  uNoiseIntensity: UniformValue<number>;\r
  uColor: UniformValue<Color>;\r
  uRotation: UniformValue<number>;\r
  uTime: UniformValue<number>;\r
  [uniform: string]: IUniform;\r
}\r
\r
const vertexShader = \`\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
void main() {\r
  vPosition = position;\r
  vUv = uv;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
uniform float uTime;\r
uniform vec3  uColor;\r
uniform float uSpeed;\r
uniform float uScale;\r
uniform float uRotation;\r
uniform float uNoiseIntensity;\r
\r
const float e = 2.71828182845904523536;\r
\r
float noise(vec2 texCoord) {\r
  float G = e;\r
  vec2  r = (G * sin(G * texCoord));\r
  return fract(r.x * r.y * (1.0 + texCoord.x));\r
}\r
\r
vec2 rotateUvs(vec2 uv, float angle) {\r
  float c = cos(angle);\r
  float s = sin(angle);\r
  mat2  rot = mat2(c, -s, s, c);\r
  return rot * uv;\r
}\r
\r
void main() {\r
  float rnd        = noise(gl_FragCoord.xy);\r
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);\r
  vec2  tex        = uv * uScale;\r
  float tOffset    = uSpeed * uTime;\r
\r
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);\r
\r
  float pattern = 0.6 +\r
                  0.4 * sin(5.0 * (tex.x + tex.y +\r
                                   cos(3.0 * tex.x + 5.0 * tex.y) +\r
                                   0.02 * tOffset) +\r
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));\r
\r
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;\r
  col.a = 1.0;\r
  gl_FragColor = col;\r
}\r
\`;\r
\r
interface SilkPlaneProps {\r
  uniforms: SilkUniforms;\r
}\r
\r
const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {\r
  const { viewport } = useThree();\r
\r
  useLayoutEffect(() => {\r
    const mesh = ref as React.MutableRefObject<Mesh | null>;\r
    if (mesh.current) {\r
      mesh.current.scale.set(viewport.width, viewport.height, 1);\r
    }\r
  }, [ref, viewport]);\r
\r
  useFrame((_state: RootState, delta: number) => {\r
    const mesh = ref as React.MutableRefObject<Mesh | null>;\r
    if (mesh.current) {\r
      const material = mesh.current.material as ShaderMaterial & {\r
        uniforms: SilkUniforms;\r
      };\r
      material.uniforms.uTime.value += 0.1 * delta;\r
    }\r
  });\r
\r
  return (\r
    <mesh ref={ref}>\r
      <planeGeometry args={[1, 1, 1, 1]} />\r
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />\r
    </mesh>\r
  );\r
});\r
SilkPlane.displayName = 'SilkPlane';\r
\r
export interface SilkProps {\r
  speed?: number;\r
  scale?: number;\r
  color?: string;\r
  noiseIntensity?: number;\r
  rotation?: number;\r
}\r
\r
const Silk: React.FC<SilkProps> = ({ speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {\r
  const meshRef = useRef<Mesh>(null);\r
\r
  const uniforms = useMemo<SilkUniforms>(\r
    () => ({\r
      uSpeed: { value: speed },\r
      uScale: { value: scale },\r
      uNoiseIntensity: { value: noiseIntensity },\r
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },\r
      uRotation: { value: rotation },\r
      uTime: { value: 0 }\r
    }),\r
    [speed, scale, noiseIntensity, color, rotation]\r
  );\r
\r
  return (\r
    <Canvas dpr={[1, 2]} frameloop="always">\r
      <SilkPlane ref={meshRef} uniforms={uniforms} />\r
    </Canvas>\r
  );\r
};\r
\r
export default Silk;\r
`,V=`/* eslint-disable react/no-unknown-property */\r
import React, { forwardRef, useMemo, useRef, useLayoutEffect } from 'react';\r
import { Canvas, useFrame, useThree, RootState } from '@react-three/fiber';\r
import { Color, Mesh, ShaderMaterial } from 'three';\r
import { IUniform } from 'three';\r
\r
type NormalizedRGB = [number, number, number];\r
\r
const hexToNormalizedRGB = (hex: string): NormalizedRGB => {\r
  const clean = hex.replace('#', '');\r
  const r = parseInt(clean.slice(0, 2), 16) / 255;\r
  const g = parseInt(clean.slice(2, 4), 16) / 255;\r
  const b = parseInt(clean.slice(4, 6), 16) / 255;\r
  return [r, g, b];\r
};\r
\r
interface UniformValue<T = number | Color> {\r
  value: T;\r
}\r
\r
interface SilkUniforms {\r
  uSpeed: UniformValue<number>;\r
  uScale: UniformValue<number>;\r
  uNoiseIntensity: UniformValue<number>;\r
  uColor: UniformValue<Color>;\r
  uRotation: UniformValue<number>;\r
  uTime: UniformValue<number>;\r
  [uniform: string]: IUniform;\r
}\r
\r
const vertexShader = \`\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
void main() {\r
  vPosition = position;\r
  vUv = uv;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
varying vec2 vUv;\r
varying vec3 vPosition;\r
\r
uniform float uTime;\r
uniform vec3  uColor;\r
uniform float uSpeed;\r
uniform float uScale;\r
uniform float uRotation;\r
uniform float uNoiseIntensity;\r
\r
const float e = 2.71828182845904523536;\r
\r
float noise(vec2 texCoord) {\r
  float G = e;\r
  vec2  r = (G * sin(G * texCoord));\r
  return fract(r.x * r.y * (1.0 + texCoord.x));\r
}\r
\r
vec2 rotateUvs(vec2 uv, float angle) {\r
  float c = cos(angle);\r
  float s = sin(angle);\r
  mat2  rot = mat2(c, -s, s, c);\r
  return rot * uv;\r
}\r
\r
void main() {\r
  float rnd        = noise(gl_FragCoord.xy);\r
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);\r
  vec2  tex        = uv * uScale;\r
  float tOffset    = uSpeed * uTime;\r
\r
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);\r
\r
  float pattern = 0.6 +\r
                  0.4 * sin(5.0 * (tex.x + tex.y +\r
                                   cos(3.0 * tex.x + 5.0 * tex.y) +\r
                                   0.02 * tOffset) +\r
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));\r
\r
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;\r
  col.a = 1.0;\r
  gl_FragColor = col;\r
}\r
\`;\r
\r
interface SilkPlaneProps {\r
  uniforms: SilkUniforms;\r
}\r
\r
const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {\r
  const { viewport } = useThree();\r
\r
  useLayoutEffect(() => {\r
    const mesh = ref as React.MutableRefObject<Mesh | null>;\r
    if (mesh.current) {\r
      mesh.current.scale.set(viewport.width, viewport.height, 1);\r
    }\r
  }, [ref, viewport]);\r
\r
  useFrame((_state: RootState, delta: number) => {\r
    const mesh = ref as React.MutableRefObject<Mesh | null>;\r
    if (mesh.current) {\r
      const material = mesh.current.material as ShaderMaterial & {\r
        uniforms: SilkUniforms;\r
      };\r
      material.uniforms.uTime.value += 0.1 * delta;\r
    }\r
  });\r
\r
  return (\r
    <mesh ref={ref}>\r
      <planeGeometry args={[1, 1, 1, 1]} />\r
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />\r
    </mesh>\r
  );\r
});\r
SilkPlane.displayName = 'SilkPlane';\r
\r
export interface SilkProps {\r
  speed?: number;\r
  scale?: number;\r
  color?: string;\r
  noiseIntensity?: number;\r
  rotation?: number;\r
}\r
\r
const Silk: React.FC<SilkProps> = ({ speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {\r
  const meshRef = useRef<Mesh>(null);\r
\r
  const uniforms = useMemo<SilkUniforms>(\r
    () => ({\r
      uSpeed: { value: speed },\r
      uScale: { value: scale },\r
      uNoiseIntensity: { value: noiseIntensity },\r
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },\r
      uRotation: { value: rotation },\r
      uTime: { value: 0 }\r
    }),\r
    [speed, scale, noiseIntensity, color, rotation]\r
  );\r
\r
  return (\r
    <Canvas dpr={[1, 2]} frameloop="always">\r
      <SilkPlane ref={meshRef} uniforms={uniforms} />\r
    </Canvas>\r
  );\r
};\r
\r
export default Silk;\r
`,z={installation:"npm install three @react-three/fiber",usage:`import Silk from './Silk';

<Silk
  speed={5}
  scale={1}
  color="#7B7481"
  noiseIntensity={1.5}
  rotation={0}
/>`,code:B,tailwind:O,tsCode:_,tsTailwind:V},E=e=>(e=e.replace("#",""),[parseInt(e.slice(0,2),16)/255,parseInt(e.slice(2,4),16)/255,parseInt(e.slice(4,6),16)/255]),L=`
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,D=`
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`,v=o.forwardRef(function({uniforms:i},n){const{viewport:a}=j();return o.useLayoutEffect(()=>{n.current&&n.current.scale.set(a.width,a.height,1)},[n,a]),G((s,l)=>{n.current.material.uniforms.uTime.value+=.1*l}),r.jsxs("mesh",{ref:n,children:[r.jsx("planeGeometry",{args:[1,1,1,1]}),r.jsx("shaderMaterial",{uniforms:i,vertexShader:L,fragmentShader:D})]})});v.displayName="SilkPlane";const H=({speed:e=5,scale:i=1,color:n="#7B7481",noiseIntensity:a=1.5,rotation:s=0})=>{const l=o.useRef(),c=o.useMemo(()=>({uSpeed:{value:e},uScale:{value:i},uNoiseIntensity:{value:a},uColor:{value:new F(...E(n))},uRotation:{value:s},uTime:{value:0}}),[e,i,a,n,s]);return r.jsx(N,{dpr:[1,2],frameloop:"always",children:r.jsx(v,{ref:l,uniforms:c})})},er=()=>{const[e,i]=o.useState(5),[n,a]=o.useState(1),[s,l]=o.useState("#5227FF"),[c,d]=o.useState(1.5),[m,p]=o.useState(0),[x,u]=T(),h=[{name:"speed",type:"number",default:"5",description:"Controls the animation speed of the silk effect."},{name:"scale",type:"number",default:"1",description:"Controls the scale of the silk pattern."},{name:"color",type:"string",default:"'#7B7481'",description:"Hex color code for the silk pattern."},{name:"noiseIntensity",type:"number",default:"1.5",description:"Controls the intensity of the noise effect."},{name:"rotation",type:"number",default:"0",description:"Controls the rotation of the silk pattern (in radians)."}];return r.jsxs(R,{children:[r.jsxs(k,{children:[r.jsxs(S,{position:"relative",className:"demo-container",h:600,overflow:"hidden",p:0,children:[r.jsx(H,{speed:e,scale:n,color:s,noiseIntensity:c,rotation:m},x),r.jsx(M,{pillText:"New Background",headline:"Silk touch is a good enhancement, Steve!"})]}),r.jsxs(I,{children:[r.jsx(f,{title:"Speed",min:.1,max:20,step:.1,value:e,onChange:t=>{i(t),u()}}),r.jsx(f,{title:"Scale",min:.1,max:5,step:.1,value:n,onChange:t=>{a(t),u()}}),r.jsx(f,{title:"Noise Intensity",min:0,max:10,step:.1,value:c,onChange:t=>{d(t),u()}}),r.jsx(f,{title:"Rotation",min:0,max:Math.PI*2,step:.01,value:m,onChange:t=>{p(t),u()}}),r.jsxs(y,{align:"center",gap:2,mt:4,children:[r.jsx(g,{fontSize:"sm",children:"Color"}),r.jsx(C,{type:"color",value:s,onChange:t=>{l(t.target.value),u()},width:"100px"})]})]}),r.jsx(P,{data:h}),r.jsx(U,{dependencyList:["three","@react-three/fiber"]})]}),r.jsx(b,{children:r.jsx(w,{codeObject:z})})]})};export{er as default};
