import{r as u,R as E,P as T,M as P,j as n,B as A,T as z,F as p}from"./index-wsKSLPNH.js";import{T as I,P as L,a as F,C as D,b as j}from"./PropTable-C4uPWs8h.js";import{D as U}from"./Dependencies-BHoMfJUj.js";import{u as _}from"./useForceRerender-BCFU-k0M.js";import{C as B}from"./Customize-1m_ZNqR9.js";import{P as h}from"./PreviewSlider-m1G_aiYP.js";import{P as W}from"./PreviewSwitch-DqnF708j.js";import{B as q}from"./BackgroundContent-CqU7Wlm2.js";import{T as k}from"./Triangle-66-Bqe-c.js";import{C as w}from"./Color-YRkaOI4u.js";import"./index-Bpz4cGEA.js";const N=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,G=`
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;function H({color:s=[1,1,1],speed:a=1,amplitude:c=.1,mouseReact:l=!0,...f}){const m=u.useRef(null),d=u.useRef({x:.5,y:.5});return u.useEffect(()=>{if(!m.current)return;const t=m.current,v=new E,e=v.gl;e.clearColor(1,1,1,1);let r;function o(){v.setSize(t.offsetWidth*1,t.offsetHeight*1),r&&(r.uniforms.uResolution.value=new w(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height))}window.addEventListener("resize",o,!1),o();const S=new k(e);r=new T(e,{vertex:N,fragment:G,uniforms:{uTime:{value:0},uColor:{value:new w(...s)},uResolution:{value:new w(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height)},uMouse:{value:new Float32Array([d.current.x,d.current.y])},uAmplitude:{value:c},uSpeed:{value:a}}});const b=new P(e,{geometry:S,program:r});let x;function R(i){x=requestAnimationFrame(R),r.uniforms.uTime.value=i*.001,v.render({scene:b})}x=requestAnimationFrame(R),t.appendChild(e.canvas);function C(i){const g=t.getBoundingClientRect(),y=(i.clientX-g.left)/g.width,M=1-(i.clientY-g.top)/g.height;d.current={x:y,y:M},r.uniforms.uMouse.value[0]=y,r.uniforms.uMouse.value[1]=M}return l&&t.addEventListener("mousemove",C),()=>{var i;cancelAnimationFrame(x),window.removeEventListener("resize",o),l&&t.removeEventListener("mousemove",C),t.removeChild(e.canvas),(i=e.getExtension("WEBGL_lose_context"))==null||i.loseContext()}},[s,a,c,l]),n.jsx("div",{ref:m,className:"iridescence-container",...f})}const X=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
import './Iridescence.css';\r
\r
const vertexShader = \`\r
attribute vec2 uv;\r
attribute vec2 position;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0, 1);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
uniform float uTime;\r
uniform vec3 uColor;\r
uniform vec3 uResolution;\r
uniform vec2 uMouse;\r
uniform float uAmplitude;\r
uniform float uSpeed;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  float mr = min(uResolution.x, uResolution.y);\r
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;\r
\r
  uv += (uMouse - vec2(0.5)) * uAmplitude;\r
\r
  float d = -uTime * 0.5 * uSpeed;\r
  float a = 0.0;\r
  for (float i = 0.0; i < 8.0; ++i) {\r
    a += cos(i - d - a * uv.x);\r
    d += sin(uv.y * i + a);\r
  }\r
  d += uTime * 0.5 * uSpeed;\r
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);\r
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;\r
  gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
export default function Iridescence({ color = [1, 1, 1], speed = 1.0, amplitude = 0.1, mouseReact = true, ...rest }) {\r
  const ctnDom = useRef(null);\r
  const mousePos = useRef({ x: 0.5, y: 0.5 });\r
\r
  useEffect(() => {\r
    if (!ctnDom.current) return;\r
    const ctn = ctnDom.current;\r
    const renderer = new Renderer();\r
    const gl = renderer.gl;\r
    gl.clearColor(1, 1, 1, 1);\r
\r
    let program;\r
\r
    function resize() {\r
      const scale = 1;\r
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);\r
      if (program) {\r
        program.uniforms.uResolution.value = new Color(\r
          gl.canvas.width,\r
          gl.canvas.height,\r
          gl.canvas.width / gl.canvas.height\r
        );\r
      }\r
    }\r
    window.addEventListener('resize', resize, false);\r
    resize();\r
\r
    const geometry = new Triangle(gl);\r
    program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uColor: { value: new Color(...color) },\r
        uResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },\r
        uAmplitude: { value: amplitude },\r
        uSpeed: { value: speed }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animateId;\r
\r
    function update(t) {\r
      animateId = requestAnimationFrame(update);\r
      program.uniforms.uTime.value = t * 0.001;\r
      renderer.render({ scene: mesh });\r
    }\r
    animateId = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e) {\r
      const rect = ctn.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      mousePos.current = { x, y };\r
      program.uniforms.uMouse.value[0] = x;\r
      program.uniforms.uMouse.value[1] = y;\r
    }\r
    if (mouseReact) {\r
      ctn.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (mouseReact) {\r
        ctn.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [color, speed, amplitude, mouseReact]);\r
\r
  return <div ref={ctnDom} className="iridescence-container" {...rest} />;\r
}\r
`,Y=`.iridescence-container {\r
  width: 100%;\r
  height: 100%;\r
}\r
`,O=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
const vertexShader = \`\r
attribute vec2 uv;\r
attribute vec2 position;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0, 1);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
uniform float uTime;\r
uniform vec3 uColor;\r
uniform vec3 uResolution;\r
uniform vec2 uMouse;\r
uniform float uAmplitude;\r
uniform float uSpeed;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  float mr = min(uResolution.x, uResolution.y);\r
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;\r
\r
  uv += (uMouse - vec2(0.5)) * uAmplitude;\r
\r
  float d = -uTime * 0.5 * uSpeed;\r
  float a = 0.0;\r
  for (float i = 0.0; i < 8.0; ++i) {\r
    a += cos(i - d - a * uv.x);\r
    d += sin(uv.y * i + a);\r
  }\r
  d += uTime * 0.5 * uSpeed;\r
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);\r
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;\r
  gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
export default function Iridescence({ color = [1, 1, 1], speed = 1.0, amplitude = 0.1, mouseReact = true, ...rest }) {\r
  const ctnDom = useRef(null);\r
  const mousePos = useRef({ x: 0.5, y: 0.5 });\r
\r
  useEffect(() => {\r
    if (!ctnDom.current) return;\r
    const ctn = ctnDom.current;\r
    const renderer = new Renderer();\r
    const gl = renderer.gl;\r
    gl.clearColor(1, 1, 1, 1);\r
\r
    let program;\r
\r
    function resize() {\r
      const scale = 1;\r
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);\r
      if (program) {\r
        program.uniforms.uResolution.value = new Color(\r
          gl.canvas.width,\r
          gl.canvas.height,\r
          gl.canvas.width / gl.canvas.height\r
        );\r
      }\r
    }\r
    window.addEventListener('resize', resize, false);\r
    resize();\r
\r
    const geometry = new Triangle(gl);\r
    program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uColor: { value: new Color(...color) },\r
        uResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },\r
        uAmplitude: { value: amplitude },\r
        uSpeed: { value: speed }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animateId;\r
\r
    function update(t) {\r
      animateId = requestAnimationFrame(update);\r
      program.uniforms.uTime.value = t * 0.001;\r
      renderer.render({ scene: mesh });\r
    }\r
    animateId = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e) {\r
      const rect = ctn.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      mousePos.current = { x, y };\r
      program.uniforms.uMouse.value[0] = x;\r
      program.uniforms.uMouse.value[1] = y;\r
    }\r
    if (mouseReact) {\r
      ctn.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (mouseReact) {\r
        ctn.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [color, speed, amplitude, mouseReact]);\r
\r
  return <div ref={ctnDom} className="w-full h-full" {...rest} />;\r
}\r
`,J=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
import './Iridescence.css';\r
\r
const vertexShader = \`\r
attribute vec2 uv;\r
attribute vec2 position;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0, 1);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
uniform float uTime;\r
uniform vec3 uColor;\r
uniform vec3 uResolution;\r
uniform vec2 uMouse;\r
uniform float uAmplitude;\r
uniform float uSpeed;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  float mr = min(uResolution.x, uResolution.y);\r
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;\r
\r
  uv += (uMouse - vec2(0.5)) * uAmplitude;\r
\r
  float d = -uTime * 0.5 * uSpeed;\r
  float a = 0.0;\r
  for (float i = 0.0; i < 8.0; ++i) {\r
    a += cos(i - d - a * uv.x);\r
    d += sin(uv.y * i + a);\r
  }\r
  d += uTime * 0.5 * uSpeed;\r
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);\r
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;\r
  gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
interface IridescenceProps {\r
  color?: [number, number, number];\r
  speed?: number;\r
  amplitude?: number;\r
  mouseReact?: boolean;\r
}\r
\r
export default function Iridescence({\r
  color = [1, 1, 1],\r
  speed = 1.0,\r
  amplitude = 0.1,\r
  mouseReact = true,\r
  ...rest\r
}: IridescenceProps) {\r
  const ctnDom = useRef<HTMLDivElement>(null);\r
  const mousePos = useRef({ x: 0.5, y: 0.5 });\r
\r
  useEffect(() => {\r
    if (!ctnDom.current) return;\r
    const ctn = ctnDom.current;\r
    const renderer = new Renderer();\r
    const gl = renderer.gl;\r
    gl.clearColor(1, 1, 1, 1);\r
\r
    let program: Program;\r
\r
    function resize() {\r
      const scale = 1;\r
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);\r
      if (program) {\r
        program.uniforms.uResolution.value = new Color(\r
          gl.canvas.width,\r
          gl.canvas.height,\r
          gl.canvas.width / gl.canvas.height\r
        );\r
      }\r
    }\r
    window.addEventListener('resize', resize, false);\r
    resize();\r
\r
    const geometry = new Triangle(gl);\r
    program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uColor: { value: new Color(...color) },\r
        uResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },\r
        uAmplitude: { value: amplitude },\r
        uSpeed: { value: speed }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animateId: number;\r
\r
    function update(t: number) {\r
      animateId = requestAnimationFrame(update);\r
      program.uniforms.uTime.value = t * 0.001;\r
      renderer.render({ scene: mesh });\r
    }\r
    animateId = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e: MouseEvent) {\r
      const rect = ctn.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      mousePos.current = { x, y };\r
      program.uniforms.uMouse.value[0] = x;\r
      program.uniforms.uMouse.value[1] = y;\r
    }\r
    if (mouseReact) {\r
      ctn.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (mouseReact) {\r
        ctn.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [color, speed, amplitude, mouseReact]);\r
\r
  return <div ref={ctnDom} className="iridescence-container" {...rest} />;\r
}\r
`,K=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
const vertexShader = \`\r
attribute vec2 uv;\r
attribute vec2 position;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position, 0, 1);\r
}\r
\`;\r
\r
const fragmentShader = \`\r
precision highp float;\r
\r
uniform float uTime;\r
uniform vec3 uColor;\r
uniform vec3 uResolution;\r
uniform vec2 uMouse;\r
uniform float uAmplitude;\r
uniform float uSpeed;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
  float mr = min(uResolution.x, uResolution.y);\r
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;\r
\r
  uv += (uMouse - vec2(0.5)) * uAmplitude;\r
\r
  float d = -uTime * 0.5 * uSpeed;\r
  float a = 0.0;\r
  for (float i = 0.0; i < 8.0; ++i) {\r
    a += cos(i - d - a * uv.x);\r
    d += sin(uv.y * i + a);\r
  }\r
  d += uTime * 0.5 * uSpeed;\r
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);\r
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;\r
  gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
interface IridescenceProps {\r
  color?: [number, number, number];\r
  speed?: number;\r
  amplitude?: number;\r
  mouseReact?: boolean;\r
}\r
\r
export default function Iridescence({\r
  color = [1, 1, 1],\r
  speed = 1.0,\r
  amplitude = 0.1,\r
  mouseReact = true,\r
  ...rest\r
}: IridescenceProps) {\r
  const ctnDom = useRef<HTMLDivElement>(null);\r
  const mousePos = useRef({ x: 0.5, y: 0.5 });\r
\r
  useEffect(() => {\r
    if (!ctnDom.current) return;\r
    const ctn = ctnDom.current;\r
    const renderer = new Renderer();\r
    const gl = renderer.gl;\r
    gl.clearColor(1, 1, 1, 1);\r
\r
    let program: Program;\r
\r
    function resize() {\r
      const scale = 1;\r
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);\r
      if (program) {\r
        program.uniforms.uResolution.value = new Color(\r
          gl.canvas.width,\r
          gl.canvas.height,\r
          gl.canvas.width / gl.canvas.height\r
        );\r
      }\r
    }\r
    window.addEventListener('resize', resize, false);\r
    resize();\r
\r
    const geometry = new Triangle(gl);\r
    program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uColor: { value: new Color(...color) },\r
        uResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },\r
        uAmplitude: { value: amplitude },\r
        uSpeed: { value: speed }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animateId: number;\r
\r
    function update(t: number) {\r
      animateId = requestAnimationFrame(update);\r
      program.uniforms.uTime.value = t * 0.001;\r
      renderer.render({ scene: mesh });\r
    }\r
    animateId = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e: MouseEvent) {\r
      const rect = ctn.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      mousePos.current = { x, y };\r
      program.uniforms.uMouse.value[0] = x;\r
      program.uniforms.uMouse.value[1] = y;\r
    }\r
    if (mouseReact) {\r
      ctn.addEventListener('mousemove', handleMouseMove);\r
    }\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (mouseReact) {\r
        ctn.removeEventListener('mousemove', handleMouseMove);\r
      }\r
      ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [color, speed, amplitude, mouseReact]);\r
\r
  return <div ref={ctnDom} className="w-full h-full" {...rest} />;\r
}\r
`,Q={dependencies:"ogl",usage:`import Iridescence from './Iridescence';
  
<Iridescence
  color={[1, 1, 1]}
  mouseReact={false}
  amplitude={0.1}
  speed={1.0}
/>`,code:X,css:Y,tailwind:O,tsCode:J,tsTailwind:K},ue=()=>{const[s,a]=u.useState([.5,.6,.8]),[c,l]=u.useState(1),[f,m]=u.useState(!0),[d,t]=_(),v=[{name:"color",type:"Array<number>",default:"[0.3, 0.2, 0.5]",description:"Base color as an array of RGB values (each between 0 and 1)."},{name:"speed",type:"number",default:"1.0",description:"Speed multiplier for the animation."},{name:"amplitude",type:"number",default:"0.1",description:"Amplitude for the mouse-driven effect."},{name:"mouseReact",type:"boolean",default:"false",description:"Enable or disable mouse interaction with the shader."}];return n.jsxs(I,{children:[n.jsxs(L,{children:[n.jsxs(A,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[n.jsx(H,{speed:c,color:s,mouseReact:f},d),n.jsx(q,{pillText:"New Background",headline:"Radiant iridescence with customizable colors"})]}),n.jsxs(B,{className:"preview-options",children:[n.jsx(z,{fontSize:"sm",children:"Colors"}),n.jsxs(p,{gap:4,wrap:"wrap",children:[n.jsx(p,{gap:4,align:"center",mt:2,background:"#170D27",px:4,borderRadius:16,position:"relative",children:n.jsx(h,{min:0,max:1,width:50,step:.1,value:s[0],title:"Red",onChange:e=>{a(r=>{const o=[...r];return o[0]=e,o})}})}),n.jsx(p,{gap:4,align:"center",mt:2,background:"#170D27",px:4,borderRadius:16,position:"relative",children:n.jsx(h,{min:0,max:1,width:50,step:.1,value:s[1],title:"Green",onChange:e=>{a(r=>{const o=[...r];return o[1]=e,o})}})}),n.jsx(p,{gap:4,align:"center",mt:2,background:"#170D27",px:4,borderRadius:16,position:"relative",children:n.jsx(h,{min:0,max:1,width:50,step:.1,value:s[2],title:"Blue",onChange:e=>{a(r=>{const o=[...r];return o[2]=e,o})},minWidth:"60px",maxWidth:"60px"})})]}),n.jsx(h,{min:0,max:2,title:"Speed",step:.1,value:c,onChange:e=>{l(e),t()}}),n.jsx(W,{title:"Enable Mouse Interaction",isChecked:f,onChange:e=>{m(e),t()}})]}),n.jsx(F,{data:v}),n.jsx(U,{dependencyList:["ogl"]})]}),n.jsx(D,{children:n.jsx(j,{codeObject:Q})})]})};export{ue as default};
