import{r as s,R as B,P as j,M as U,j as n,B as V,I as O,F,T,d as b}from"./index-wsKSLPNH.js";import{T as D,P as H,a as q,C as W,b as X}from"./PropTable-C4uPWs8h.js";import{D as N}from"./Dependencies-BHoMfJUj.js";import{C as k}from"./Customize-1m_ZNqR9.js";import{P as G}from"./PreviewSlider-m1G_aiYP.js";import{P as I}from"./PreviewSwitch-DqnF708j.js";import{T as Y}from"./Triangle-66-Bqe-c.js";import"./index-Bpz4cGEA.js";function w(l){let t=l.replace("#",""),o=0,u=0,i=0,c=1;return t.length===6?(o=parseInt(t.slice(0,2),16)/255,u=parseInt(t.slice(2,4),16)/255,i=parseInt(t.slice(4,6),16)/255):t.length===8&&(o=parseInt(t.slice(0,2),16)/255,u=parseInt(t.slice(2,4),16)/255,i=parseInt(t.slice(4,6),16)/255,c=parseInt(t.slice(6,8),16)/255),[o,u,i,c]}const J=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,K=`
precision highp float;

#define PI 3.14159265359

uniform float iTime;
uniform vec3 iResolution;
uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec2 uOffset;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;
uniform vec2 uMouse;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);
    
    float speed = (uSpinRotation * uSpinEase * 0.2);
    if(uIsRotate){
       speed = iTime * speed;
    }
    speed += 302.2;
    
    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;
    
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);
    
    uv *= 30.0;
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;
    
    vec2 uv2 = vec2(uv.x + uv.y);
    
    for(int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
            sin(uv2.x - 0.113 * speed)
        );
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }
    
    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);
    
    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}
`;function Q({spinRotation:l=-2,spinSpeed:t=7,offset:o=[0,0],color1:u="#DE443B",color2:i="#006BB4",color3:c="#162325",contrast:f=3.5,lighting:x=.4,spinAmount:g=.25,pixelFilter:S=745,spinEase:d=1,isRotate:C=!1,mouseInteraction:h=!0}){const v=s.useRef(null);return s.useEffect(()=>{if(!v.current)return;const a=v.current,e=new B,r=e.gl;r.clearColor(0,0,0,1);let p;function _(){e.setSize(a.offsetWidth,a.offsetHeight),p&&(p.uniforms.iResolution.value=[r.canvas.width,r.canvas.height,r.canvas.width/r.canvas.height])}window.addEventListener("resize",_),_();const M=new Y(r);p=new j(r,{vertex:J,fragment:K,uniforms:{iTime:{value:0},iResolution:{value:[r.canvas.width,r.canvas.height,r.canvas.width/r.canvas.height]},uSpinRotation:{value:l},uSpinSpeed:{value:t},uOffset:{value:o},uColor1:{value:w(u)},uColor2:{value:w(i)},uColor3:{value:w(c)},uContrast:{value:f},uLighting:{value:x},uSpinAmount:{value:g},uPixelFilter:{value:S},uSpinEase:{value:d},uIsRotate:{value:C},uMouse:{value:[.5,.5]}}});const A=new U(r,{geometry:M,program:p});let y;function E(m){y=requestAnimationFrame(E),p.uniforms.iTime.value=m*.001,e.render({scene:A})}y=requestAnimationFrame(E),a.appendChild(r.canvas);function z(m){if(!h)return;const R=a.getBoundingClientRect(),P=(m.clientX-R.left)/R.width,L=1-(m.clientY-R.top)/R.height;p.uniforms.uMouse.value=[P,L]}return a.addEventListener("mousemove",z),()=>{var m;cancelAnimationFrame(y),window.removeEventListener("resize",_),a.removeEventListener("mousemove",z),a.removeChild(r.canvas),(m=r.getExtension("WEBGL_lose_context"))==null||m.loseContext()}},[l,t,o,u,i,c,f,x,g,S,d,C,h,v]),n.jsx("div",{ref:v,className:"balatro-container"})}const Z=`import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
import './Balatro.css';\r
\r
function hexToVec4(hex) {\r
  let hexStr = hex.replace('#', '');\r
  let r = 0,\r
    g = 0,\r
    b = 0,\r
    a = 1;\r
  if (hexStr.length === 6) {\r
    r = parseInt(hexStr.slice(0, 2), 16) / 255;\r
    g = parseInt(hexStr.slice(2, 4), 16) / 255;\r
    b = parseInt(hexStr.slice(4, 6), 16) / 255;\r
  } else if (hexStr.length === 8) {\r
    r = parseInt(hexStr.slice(0, 2), 16) / 255;\r
    g = parseInt(hexStr.slice(2, 4), 16) / 255;\r
    b = parseInt(hexStr.slice(4, 6), 16) / 255;\r
    a = parseInt(hexStr.slice(6, 8), 16) / 255;\r
  }\r
  return [r, g, b, a];\r
}\r
\r
const vertexShader = \`\r
attribute vec2 uv;\r
attribute vec2 position;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0, 1);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
#define PI 3.14159265359\r
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform float uSpinRotation;\r
uniform float uSpinSpeed;\r
uniform vec2 uOffset;\r
uniform vec4 uColor1;\r
uniform vec4 uColor2;\r
uniform vec4 uColor3;\r
uniform float uContrast;\r
uniform float uLighting;\r
uniform float uSpinAmount;\r
uniform float uPixelFilter;\r
uniform float uSpinEase;\r
uniform bool uIsRotate;\r
uniform vec2 uMouse;\r
\r
varying vec2 vUv;\r
\r
vec4 effect(vec2 screenSize, vec2 screen_coords) {\r
    float pixel_size = length(screenSize.xy) / uPixelFilter;\r
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;\r
    float uv_len = length(uv);\r
    \r
    float speed = (uSpinRotation * uSpinEase * 0.2);\r
    if(uIsRotate){\r
       speed = iTime * speed;\r
    }\r
    speed += 302.2;\r
    \r
    float mouseInfluence = (uMouse.x * 2.0 - 1.0);\r
    speed += mouseInfluence * 0.1;\r
    \r
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));\r
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;\r
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);\r
    \r
    uv *= 30.0;\r
    float baseSpeed = iTime * uSpinSpeed;\r
    speed = baseSpeed + mouseInfluence * 2.0;\r
    \r
    vec2 uv2 = vec2(uv.x + uv.y);\r
    \r
    for(int i = 0; i < 5; i++) {\r
        uv2 += sin(max(uv.x, uv.y)) + uv;\r
        uv += 0.5 * vec2(\r
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),\r
            sin(uv2.x - 0.113 * speed)\r
        );\r
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);\r
    }\r
    \r
    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);\r
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));\r
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));\r
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));\r
    float c3p = 1.0 - min(1.0, c1p + c2p);\r
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);\r
    \r
    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;\r
}\r
\r
void main() {\r
    vec2 uv = vUv * iResolution.xy;\r
    gl_FragColor = effect(iResolution.xy, uv);\r
}\r
\`;\r
\r
export default function Balatro({\r
  spinRotation = -2.0,\r
  spinSpeed = 7.0,\r
  offset = [0.0, 0.0],\r
  color1 = '#DE443B',\r
  color2 = '#006BB4',\r
  color3 = '#162325',\r
  contrast = 3.5,\r
  lighting = 0.4,\r
  spinAmount = 0.25,\r
  pixelFilter = 745.0,\r
  spinEase = 1.0,\r
  isRotate = false,\r
  mouseInteraction = true\r
}) {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const container = containerRef.current;\r
    const renderer = new Renderer();\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 1);\r
\r
    let program;\r
\r
    function resize() {\r
      renderer.setSize(container.offsetWidth, container.offsetHeight);\r
      if (program) {\r
        program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];\r
      }\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    const geometry = new Triangle(gl);\r
    program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]\r
        },\r
        uSpinRotation: { value: spinRotation },\r
        uSpinSpeed: { value: spinSpeed },\r
        uOffset: { value: offset },\r
        uColor1: { value: hexToVec4(color1) },\r
        uColor2: { value: hexToVec4(color2) },\r
        uColor3: { value: hexToVec4(color3) },\r
        uContrast: { value: contrast },\r
        uLighting: { value: lighting },\r
        uSpinAmount: { value: spinAmount },\r
        uPixelFilter: { value: pixelFilter },\r
        uSpinEase: { value: spinEase },\r
        uIsRotate: { value: isRotate },\r
        uMouse: { value: [0.5, 0.5] }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animationFrameId;\r
\r
    function update(time) {\r
      animationFrameId = requestAnimationFrame(update);\r
      program.uniforms.iTime.value = time * 0.001;\r
      renderer.render({ scene: mesh });\r
    }\r
    animationFrameId = requestAnimationFrame(update);\r
    container.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e) {\r
      if (!mouseInteraction) return;\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      program.uniforms.uMouse.value = [x, y];\r
    }\r
    container.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    spinRotation,\r
    spinSpeed,\r
    offset,\r
    color1,\r
    color2,\r
    color3,\r
    contrast,\r
    lighting,\r
    spinAmount,\r
    pixelFilter,\r
    spinEase,\r
    isRotate,\r
    mouseInteraction,\r
    containerRef\r
  ]);\r
\r
  return <div ref={containerRef} className="balatro-container" />;\r
}\r
`,$=`.balatro-container {\r
  width: 100%;\r
  height: 100%;\r
}\r
`,nn=`import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
function hexToVec4(hex) {\r
  let hexStr = hex.replace('#', '');\r
  let r = 0,\r
    g = 0,\r
    b = 0,\r
    a = 1;\r
  if (hexStr.length === 6) {\r
    r = parseInt(hexStr.slice(0, 2), 16) / 255;\r
    g = parseInt(hexStr.slice(2, 4), 16) / 255;\r
    b = parseInt(hexStr.slice(4, 6), 16) / 255;\r
  } else if (hexStr.length === 8) {\r
    r = parseInt(hexStr.slice(0, 2), 16) / 255;\r
    g = parseInt(hexStr.slice(2, 4), 16) / 255;\r
    b = parseInt(hexStr.slice(4, 6), 16) / 255;\r
    a = parseInt(hexStr.slice(6, 8), 16) / 255;\r
  }\r
  return [r, g, b, a];\r
}\r
\r
const vertexShader = \`\r
attribute vec2 uv;\r
attribute vec2 position;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0, 1);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
#define PI 3.14159265359\r
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform float uSpinRotation;\r
uniform float uSpinSpeed;\r
uniform vec2 uOffset;\r
uniform vec4 uColor1;\r
uniform vec4 uColor2;\r
uniform vec4 uColor3;\r
uniform float uContrast;\r
uniform float uLighting;\r
uniform float uSpinAmount;\r
uniform float uPixelFilter;\r
uniform float uSpinEase;\r
uniform bool uIsRotate;\r
uniform vec2 uMouse;\r
\r
varying vec2 vUv;\r
\r
vec4 effect(vec2 screenSize, vec2 screen_coords) {\r
    float pixel_size = length(screenSize.xy) / uPixelFilter;\r
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;\r
    float uv_len = length(uv);\r
    \r
    float speed = (uSpinRotation * uSpinEase * 0.2);\r
    if(uIsRotate){\r
       speed = iTime * speed;\r
    }\r
    speed += 302.2;\r
    \r
    float mouseInfluence = (uMouse.x * 2.0 - 1.0);\r
    speed += mouseInfluence * 0.1;\r
    \r
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));\r
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;\r
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);\r
    \r
    uv *= 30.0;\r
    float baseSpeed = iTime * uSpinSpeed;\r
    speed = baseSpeed + mouseInfluence * 2.0;\r
    \r
    vec2 uv2 = vec2(uv.x + uv.y);\r
    \r
    for(int i = 0; i < 5; i++) {\r
        uv2 += sin(max(uv.x, uv.y)) + uv;\r
        uv += 0.5 * vec2(\r
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),\r
            sin(uv2.x - 0.113 * speed)\r
        );\r
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);\r
    }\r
    \r
    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);\r
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));\r
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));\r
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));\r
    float c3p = 1.0 - min(1.0, c1p + c2p);\r
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);\r
    \r
    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;\r
}\r
\r
void main() {\r
    vec2 uv = vUv * iResolution.xy;\r
    gl_FragColor = effect(iResolution.xy, uv);\r
}\r
\`;\r
\r
export default function Balatro({\r
  spinRotation = -2.0,\r
  spinSpeed = 7.0,\r
  offset = [0.0, 0.0],\r
  color1 = '#DE443B',\r
  color2 = '#006BB4',\r
  color3 = '#162325',\r
  contrast = 3.5,\r
  lighting = 0.4,\r
  spinAmount = 0.25,\r
  pixelFilter = 745.0,\r
  spinEase = 1.0,\r
  isRotate = false,\r
  mouseInteraction = true\r
}) {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const container = containerRef.current;\r
    const renderer = new Renderer();\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 1);\r
\r
    let program;\r
\r
    function resize() {\r
      renderer.setSize(container.offsetWidth, container.offsetHeight);\r
      if (program) {\r
        program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];\r
      }\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    const geometry = new Triangle(gl);\r
    program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]\r
        },\r
        uSpinRotation: { value: spinRotation },\r
        uSpinSpeed: { value: spinSpeed },\r
        uOffset: { value: offset },\r
        uColor1: { value: hexToVec4(color1) },\r
        uColor2: { value: hexToVec4(color2) },\r
        uColor3: { value: hexToVec4(color3) },\r
        uContrast: { value: contrast },\r
        uLighting: { value: lighting },\r
        uSpinAmount: { value: spinAmount },\r
        uPixelFilter: { value: pixelFilter },\r
        uSpinEase: { value: spinEase },\r
        uIsRotate: { value: isRotate },\r
        uMouse: { value: [0.5, 0.5] }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animationFrameId;\r
\r
    function update(time) {\r
      animationFrameId = requestAnimationFrame(update);\r
      program.uniforms.iTime.value = time * 0.001;\r
      renderer.render({ scene: mesh });\r
    }\r
    animationFrameId = requestAnimationFrame(update);\r
    container.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e) {\r
      if (!mouseInteraction) return;\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      program.uniforms.uMouse.value = [x, y];\r
    }\r
    container.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    spinRotation,\r
    spinSpeed,\r
    offset,\r
    color1,\r
    color2,\r
    color3,\r
    contrast,\r
    lighting,\r
    spinAmount,\r
    pixelFilter,\r
    spinEase,\r
    isRotate,\r
    mouseInteraction,\r
    containerRef\r
  ]);\r
\r
  return <div ref={containerRef} className="w-full h-full" />;\r
}\r
`,en=`import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
import './Balatro.css';\r
\r
interface BalatroProps {\r
  spinRotation?: number;\r
  spinSpeed?: number;\r
  offset?: [number, number];\r
  color1?: string;\r
  color2?: string;\r
  color3?: string;\r
  contrast?: number;\r
  lighting?: number;\r
  spinAmount?: number;\r
  pixelFilter?: number;\r
  spinEase?: number;\r
  isRotate?: boolean;\r
  mouseInteraction?: boolean;\r
}\r
\r
function hexToVec4(hex: string): [number, number, number, number] {\r
  let hexStr = hex.replace('#', '');\r
  let r = 0,\r
    g = 0,\r
    b = 0,\r
    a = 1;\r
  if (hexStr.length === 6) {\r
    r = parseInt(hexStr.slice(0, 2), 16) / 255;\r
    g = parseInt(hexStr.slice(2, 4), 16) / 255;\r
    b = parseInt(hexStr.slice(4, 6), 16) / 255;\r
  } else if (hexStr.length === 8) {\r
    r = parseInt(hexStr.slice(0, 2), 16) / 255;\r
    g = parseInt(hexStr.slice(2, 4), 16) / 255;\r
    b = parseInt(hexStr.slice(4, 6), 16) / 255;\r
    a = parseInt(hexStr.slice(6, 8), 16) / 255;\r
  }\r
  return [r, g, b, a];\r
}\r
\r
const vertexShader = \`\r
attribute vec2 uv;\r
attribute vec2 position;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0, 1);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
#define PI 3.14159265359\r
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform float uSpinRotation;\r
uniform float uSpinSpeed;\r
uniform vec2 uOffset;\r
uniform vec4 uColor1;\r
uniform vec4 uColor2;\r
uniform vec4 uColor3;\r
uniform float uContrast;\r
uniform float uLighting;\r
uniform float uSpinAmount;\r
uniform float uPixelFilter;\r
uniform float uSpinEase;\r
uniform bool uIsRotate;\r
uniform vec2 uMouse;\r
\r
varying vec2 vUv;\r
\r
vec4 effect(vec2 screenSize, vec2 screen_coords) {\r
    float pixel_size = length(screenSize.xy) / uPixelFilter;\r
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;\r
    float uv_len = length(uv);\r
    \r
    float speed = (uSpinRotation * uSpinEase * 0.2);\r
    if(uIsRotate){\r
       speed = iTime * speed;\r
    }\r
    speed += 302.2;\r
    \r
    float mouseInfluence = (uMouse.x * 2.0 - 1.0);\r
    speed += mouseInfluence * 0.1;\r
    \r
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));\r
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;\r
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);\r
    \r
    uv *= 30.0;\r
    float baseSpeed = iTime * uSpinSpeed;\r
    speed = baseSpeed + mouseInfluence * 2.0;\r
    \r
    vec2 uv2 = vec2(uv.x + uv.y);\r
    \r
    for(int i = 0; i < 5; i++) {\r
        uv2 += sin(max(uv.x, uv.y)) + uv;\r
        uv += 0.5 * vec2(\r
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),\r
            sin(uv2.x - 0.113 * speed)\r
        );\r
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);\r
    }\r
    \r
    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);\r
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));\r
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));\r
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));\r
    float c3p = 1.0 - min(1.0, c1p + c2p);\r
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);\r
    \r
    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;\r
}\r
\r
void main() {\r
    vec2 uv = vUv * iResolution.xy;\r
    gl_FragColor = effect(iResolution.xy, uv);\r
}\r
\`;\r
\r
export default function Balatro({\r
  spinRotation = -2.0,\r
  spinSpeed = 7.0,\r
  offset = [0.0, 0.0],\r
  color1 = '#DE443B',\r
  color2 = '#006BB4',\r
  color3 = '#162325',\r
  contrast = 3.5,\r
  lighting = 0.4,\r
  spinAmount = 0.25,\r
  pixelFilter = 745.0,\r
  spinEase = 1.0,\r
  isRotate = false,\r
  mouseInteraction = true\r
}: BalatroProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const container = containerRef.current;\r
    const renderer = new Renderer();\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 1);\r
\r
    let program: Program;\r
\r
    function resize() {\r
      renderer.setSize(container.offsetWidth, container.offsetHeight);\r
      if (program) {\r
        program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];\r
      }\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    const geometry = new Triangle(gl);\r
    program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]\r
        },\r
        uSpinRotation: { value: spinRotation },\r
        uSpinSpeed: { value: spinSpeed },\r
        uOffset: { value: offset },\r
        uColor1: { value: hexToVec4(color1) },\r
        uColor2: { value: hexToVec4(color2) },\r
        uColor3: { value: hexToVec4(color3) },\r
        uContrast: { value: contrast },\r
        uLighting: { value: lighting },\r
        uSpinAmount: { value: spinAmount },\r
        uPixelFilter: { value: pixelFilter },\r
        uSpinEase: { value: spinEase },\r
        uIsRotate: { value: isRotate },\r
        uMouse: { value: [0.5, 0.5] }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animationFrameId: number;\r
\r
    function update(time: number) {\r
      animationFrameId = requestAnimationFrame(update);\r
      program.uniforms.iTime.value = time * 0.001;\r
      renderer.render({ scene: mesh });\r
    }\r
    animationFrameId = requestAnimationFrame(update);\r
    container.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e: MouseEvent) {\r
      if (!mouseInteraction) return;\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      program.uniforms.uMouse.value = [x, y];\r
    }\r
    container.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    spinRotation,\r
    spinSpeed,\r
    offset,\r
    color1,\r
    color2,\r
    color3,\r
    contrast,\r
    lighting,\r
    spinAmount,\r
    pixelFilter,\r
    spinEase,\r
    isRotate,\r
    mouseInteraction\r
  ]);\r
\r
  return <div ref={containerRef} className="balatro-container" />;\r
}\r
`,rn=`import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
interface BalatroProps {\r
  spinRotation?: number;\r
  spinSpeed?: number;\r
  offset?: [number, number];\r
  color1?: string;\r
  color2?: string;\r
  color3?: string;\r
  contrast?: number;\r
  lighting?: number;\r
  spinAmount?: number;\r
  pixelFilter?: number;\r
  spinEase?: number;\r
  isRotate?: boolean;\r
  mouseInteraction?: boolean;\r
}\r
\r
function hexToVec4(hex: string): [number, number, number, number] {\r
  let hexStr = hex.replace('#', '');\r
  let r = 0,\r
    g = 0,\r
    b = 0,\r
    a = 1;\r
  if (hexStr.length === 6) {\r
    r = parseInt(hexStr.slice(0, 2), 16) / 255;\r
    g = parseInt(hexStr.slice(2, 4), 16) / 255;\r
    b = parseInt(hexStr.slice(4, 6), 16) / 255;\r
  } else if (hexStr.length === 8) {\r
    r = parseInt(hexStr.slice(0, 2), 16) / 255;\r
    g = parseInt(hexStr.slice(2, 4), 16) / 255;\r
    b = parseInt(hexStr.slice(4, 6), 16) / 255;\r
    a = parseInt(hexStr.slice(6, 8), 16) / 255;\r
  }\r
  return [r, g, b, a];\r
}\r
\r
const vertexShader = \`\r
attribute vec2 uv;\r
attribute vec2 position;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0, 1);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
#define PI 3.14159265359\r
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform float uSpinRotation;\r
uniform float uSpinSpeed;\r
uniform vec2 uOffset;\r
uniform vec4 uColor1;\r
uniform vec4 uColor2;\r
uniform vec4 uColor3;\r
uniform float uContrast;\r
uniform float uLighting;\r
uniform float uSpinAmount;\r
uniform float uPixelFilter;\r
uniform float uSpinEase;\r
uniform bool uIsRotate;\r
uniform vec2 uMouse;\r
\r
varying vec2 vUv;\r
\r
vec4 effect(vec2 screenSize, vec2 screen_coords) {\r
    float pixel_size = length(screenSize.xy) / uPixelFilter;\r
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;\r
    float uv_len = length(uv);\r
    \r
    float speed = (uSpinRotation * uSpinEase * 0.2);\r
    if(uIsRotate){\r
       speed = iTime * speed;\r
    }\r
    speed += 302.2;\r
    \r
    float mouseInfluence = (uMouse.x * 2.0 - 1.0);\r
    speed += mouseInfluence * 0.1;\r
    \r
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));\r
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;\r
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);\r
    \r
    uv *= 30.0;\r
    float baseSpeed = iTime * uSpinSpeed;\r
    speed = baseSpeed + mouseInfluence * 2.0;\r
    \r
    vec2 uv2 = vec2(uv.x + uv.y);\r
    \r
    for(int i = 0; i < 5; i++) {\r
        uv2 += sin(max(uv.x, uv.y)) + uv;\r
        uv += 0.5 * vec2(\r
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),\r
            sin(uv2.x - 0.113 * speed)\r
        );\r
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);\r
    }\r
    \r
    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);\r
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));\r
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));\r
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));\r
    float c3p = 1.0 - min(1.0, c1p + c2p);\r
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);\r
    \r
    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;\r
}\r
\r
void main() {\r
    vec2 uv = vUv * iResolution.xy;\r
    gl_FragColor = effect(iResolution.xy, uv);\r
}\r
\`;\r
\r
export default function Balatro({\r
  spinRotation = -2.0,\r
  spinSpeed = 7.0,\r
  offset = [0.0, 0.0],\r
  color1 = '#DE443B',\r
  color2 = '#006BB4',\r
  color3 = '#162325',\r
  contrast = 3.5,\r
  lighting = 0.4,\r
  spinAmount = 0.25,\r
  pixelFilter = 745.0,\r
  spinEase = 1.0,\r
  isRotate = false,\r
  mouseInteraction = true\r
}: BalatroProps) {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const container = containerRef.current;\r
    const renderer = new Renderer();\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 1);\r
\r
    let program: Program;\r
\r
    function resize() {\r
      renderer.setSize(container.offsetWidth, container.offsetHeight);\r
      if (program) {\r
        program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];\r
      }\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    const geometry = new Triangle(gl);\r
    program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]\r
        },\r
        uSpinRotation: { value: spinRotation },\r
        uSpinSpeed: { value: spinSpeed },\r
        uOffset: { value: offset },\r
        uColor1: { value: hexToVec4(color1) },\r
        uColor2: { value: hexToVec4(color2) },\r
        uColor3: { value: hexToVec4(color3) },\r
        uContrast: { value: contrast },\r
        uLighting: { value: lighting },\r
        uSpinAmount: { value: spinAmount },\r
        uPixelFilter: { value: pixelFilter },\r
        uSpinEase: { value: spinEase },\r
        uIsRotate: { value: isRotate },\r
        uMouse: { value: [0.5, 0.5] }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animationFrameId: number;\r
\r
    function update(time: number) {\r
      animationFrameId = requestAnimationFrame(update);\r
      program.uniforms.iTime.value = time * 0.001;\r
      renderer.render({ scene: mesh });\r
    }\r
    animationFrameId = requestAnimationFrame(update);\r
    container.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e: MouseEvent) {\r
      if (!mouseInteraction) return;\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      program.uniforms.uMouse.value = [x, y];\r
    }\r
    container.addEventListener('mousemove', handleMouseMove);\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    spinRotation,\r
    spinSpeed,\r
    offset,\r
    color1,\r
    color2,\r
    color3,\r
    contrast,\r
    lighting,\r
    spinAmount,\r
    pixelFilter,\r
    spinEase,\r
    isRotate,\r
    mouseInteraction\r
  ]);\r
\r
  return <div ref={containerRef} className="w-full h-full" />;\r
}\r
`,tn={dependencies:"ogl",usage:`import Balatro from './Balatro';
  
<Balatro
  isRotate={false}
  mouseInteraction={true}
  pixelFilter={700}
/>`,code:Z,css:$,tailwind:nn,tsCode:en,tsTailwind:rn},pn=()=>{const[l,t]=s.useState(!1),[o,u]=s.useState("#DE443B"),[i,c]=s.useState("#006BB4"),[f,x]=s.useState("#162325"),[g,S]=s.useState(!1),[d,C]=s.useState(!0),[h,v]=s.useState(745),a=[{name:"spinRotation",type:"number",default:"-2.0",description:"Base rotation amount affecting the shader effect."},{name:"spinSpeed",type:"number",default:"7.0",description:"Speed of the spin animation."},{name:"offset",type:"[number, number]",default:"[0.0, 0.0]",description:"Offset for the shader effect."},{name:"color1",type:"string",default:'"#DE443B"',description:"Primary color in HEX format."},{name:"color2",type:"string",default:'"#006BB4"',description:"Secondary color in HEX format."},{name:"color3",type:"string",default:'"#162325"',description:"Tertiary color in HEX format."},{name:"contrast",type:"number",default:"3.5",description:"Contrast value affecting color blending."},{name:"lighting",type:"number",default:"0.4",description:"Lighting factor affecting brightness."},{name:"spinAmount",type:"number",default:"0.25",description:"Amount of spin influence based on UV length."},{name:"pixelFilter",type:"number",default:"745.0",description:"Pixel filter factor determining pixelation."},{name:"spinEase",type:"number",default:"1.0",description:"Ease factor for spin."},{name:"isRotate",type:"boolean",default:"false",description:"Determines if the shader rotates continuously."},{name:"mouseInteraction",type:"boolean",default:"true",description:"Enables or disables mouse interaction for rotation."}];return n.jsxs(D,{children:[n.jsxs(H,{children:[n.jsxs(V,{position:"relative",className:"demo-container",h:600,overflow:"hidden",p:0,children:[n.jsx(Q,{color1:o,color2:i,color3:f,isRotate:g,mouseInteraction:d,pixelFilter:h}),!l&&n.jsx(O,{pointerEvents:"none",position:"absolute",w:200,src:"https://oyster.ignimgs.com/mediawiki/apis.ign.com/balatro/e/ef/Joker.png",borderRadius:"10px"})]}),n.jsxs(F,{gap:4,align:"center",mt:7,justifyContent:"flex-end",position:"absolute",right:0,children:[n.jsx(T,{fontSize:"sm",children:"Hide Image"}),n.jsx(I,{isChecked:l,onChange:e=>{t(e)}})]}),n.jsxs(k,{children:[n.jsxs(F,{gap:4,align:"center",mt:4,children:[n.jsx(T,{fontSize:"sm",children:"Colors"}),n.jsx(b,{type:"color",value:o,onChange:e=>{u(e.target.value)},width:"50px"}),n.jsx(b,{type:"color",value:f,onChange:e=>{x(e.target.value)},width:"50px"}),n.jsx(b,{type:"color",value:i,onChange:e=>{c(e.target.value)},width:"50px"})]}),n.jsx(G,{min:0,max:2e3,step:10,title:"Pixelation",value:h,onChange:e=>{v(e)}}),n.jsx(I,{title:"Enable Mouse Interaction",isChecked:d,onChange:e=>{C(e)}}),n.jsx(I,{title:"Rotate",isChecked:g,onChange:e=>{S(e)}})]}),n.jsx(q,{data:a}),n.jsx(N,{dependencyList:["ogl"]})]}),n.jsx(W,{children:n.jsx(X,{codeObject:tn})})]})};export{pn as default};
