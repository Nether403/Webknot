import{r as l,R as L,P as j,M as B,j as n,B as X,T as Y,F as C}from"./index-wsKSLPNH.js";import{T as z,P as S,a as I,C as P,b as _}from"./PropTable-C4uPWs8h.js";import{D}from"./Dependencies-BHoMfJUj.js";import{C as H}from"./Customize-1m_ZNqR9.js";import{P as g}from"./PreviewSlider-m1G_aiYP.js";import{P as W}from"./PreviewSwitch-DqnF708j.js";import{B as G}from"./BackgroundContent-CqU7Wlm2.js";import{T as N}from"./Triangle-66-Bqe-c.js";import"./index-Bpz4cGEA.js";const k=({baseColor:m=[.1,.1,.1],speed:p=.2,amplitude:u=.3,frequencyX:s=3,frequencyY:v=3,interactive:f=!0,...y})=>{const d=l.useRef(null);return l.useEffect(()=>{if(!d.current)return;const o=d.current,r=new L({antialias:!0}),e=r.gl;e.clearColor(1,1,1,1);const a=`
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,E=`
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 10.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
          return vec4(color, 1.0);
      }

      void main() {
          vec4 col = vec4(0.0);
          int samples = 0;
          for (int i = -1; i <= 1; i++){
              for (int j = -1; j <= 1; j++){
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
                  col += renderImage(vUv + offset);
                  samples++;
              }
          }
          gl_FragColor = col / float(samples);
      }
    `,U=new N(e),h=new j(e,{vertex:a,fragment:E,uniforms:{uTime:{value:0},uResolution:{value:new Float32Array([e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height])},uBaseColor:{value:new Float32Array(m)},uAmplitude:{value:u},uFrequencyX:{value:s},uFrequencyY:{value:v},uMouse:{value:new Float32Array([0,0])}}}),A=new B(e,{geometry:U,program:h});function w(){r.setSize(o.offsetWidth*1,o.offsetHeight*1);const i=h.uniforms.uResolution.value;i[0]=e.canvas.width,i[1]=e.canvas.height,i[2]=e.canvas.width/e.canvas.height}window.addEventListener("resize",w),w();function M(t){const i=o.getBoundingClientRect(),c=(t.clientX-i.left)/i.width,q=1-(t.clientY-i.top)/i.height,x=h.uniforms.uMouse.value;x[0]=c,x[1]=q}function F(t){if(t.touches.length>0){const i=t.touches[0],c=o.getBoundingClientRect(),q=(i.clientX-c.left)/c.width,x=1-(i.clientY-c.top)/c.height,b=h.uniforms.uMouse.value;b[0]=q,b[1]=x}}f&&(o.addEventListener("mousemove",M),o.addEventListener("touchmove",F));let R;function T(t){R=requestAnimationFrame(T),h.uniforms.uTime.value=t*.001*p,r.render({scene:A})}return R=requestAnimationFrame(T),o.appendChild(e.canvas),()=>{var t;cancelAnimationFrame(R),window.removeEventListener("resize",w),f&&(o.removeEventListener("mousemove",M),o.removeEventListener("touchmove",F)),e.canvas.parentElement&&e.canvas.parentElement.removeChild(e.canvas),(t=e.getExtension("WEBGL_lose_context"))==null||t.loseContext()}},[m,p,u,s,v,f]),n.jsx("div",{ref:d,className:"liquidChrome-container",...y})},O=`import { useRef, useEffect } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
\r
import './LiquidChrome.css';\r
\r
export const LiquidChrome = ({\r
  baseColor = [0.1, 0.1, 0.1],\r
  speed = 0.2,\r
  amplitude = 0.3,\r
  frequencyX = 3,\r
  frequencyY = 3,\r
  interactive = true,\r
  ...props\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const container = containerRef.current;\r
    const renderer = new Renderer({ antialias: true });\r
    const gl = renderer.gl;\r
    gl.clearColor(1, 1, 1, 1);\r
\r
    const vertexShader = \`\r
      attribute vec2 position;\r
      attribute vec2 uv;\r
      varying vec2 vUv;\r
      void main() {\r
        vUv = uv;\r
        gl_Position = vec4(position, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragmentShader = \`\r
      precision highp float;\r
      uniform float uTime;\r
      uniform vec3 uResolution;\r
      uniform vec3 uBaseColor;\r
      uniform float uAmplitude;\r
      uniform float uFrequencyX;\r
      uniform float uFrequencyY;\r
      uniform vec2 uMouse;\r
      varying vec2 vUv;\r
\r
      vec4 renderImage(vec2 uvCoord) {\r
          vec2 fragCoord = uvCoord * uResolution.xy;\r
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);\r
\r
          for (float i = 1.0; i < 10.0; i++){\r
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);\r
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);\r
          }\r
\r
          vec2 diff = (uvCoord - uMouse);\r
          float dist = length(diff);\r
          float falloff = exp(-dist * 20.0);\r
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;\r
          uv += (diff / (dist + 0.0001)) * ripple * falloff;\r
\r
          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));\r
          return vec4(color, 1.0);\r
      }\r
\r
      void main() {\r
          vec4 col = vec4(0.0);\r
          int samples = 0;\r
          for (int i = -1; i <= 1; i++){\r
              for (int j = -1; j <= 1; j++){\r
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));\r
                  col += renderImage(vUv + offset);\r
                  samples++;\r
              }\r
          }\r
          gl_FragColor = col / float(samples);\r
      }\r
    \`;\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uResolution: {\r
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])\r
        },\r
        uBaseColor: { value: new Float32Array(baseColor) },\r
        uAmplitude: { value: amplitude },\r
        uFrequencyX: { value: frequencyX },\r
        uFrequencyY: { value: frequencyY },\r
        uMouse: { value: new Float32Array([0, 0]) }\r
      }\r
    });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      const scale = 1;\r
      renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);\r
      const resUniform = program.uniforms.uResolution.value;\r
      resUniform[0] = gl.canvas.width;\r
      resUniform[1] = gl.canvas.height;\r
      resUniform[2] = gl.canvas.width / gl.canvas.height;\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    function handleMouseMove(event) {\r
      const rect = container.getBoundingClientRect();\r
      const x = (event.clientX - rect.left) / rect.width;\r
      const y = 1 - (event.clientY - rect.top) / rect.height;\r
      const mouseUniform = program.uniforms.uMouse.value;\r
      mouseUniform[0] = x;\r
      mouseUniform[1] = y;\r
    }\r
\r
    function handleTouchMove(event) {\r
      if (event.touches.length > 0) {\r
        const touch = event.touches[0];\r
        const rect = container.getBoundingClientRect();\r
        const x = (touch.clientX - rect.left) / rect.width;\r
        const y = 1 - (touch.clientY - rect.top) / rect.height;\r
        const mouseUniform = program.uniforms.uMouse.value;\r
        mouseUniform[0] = x;\r
        mouseUniform[1] = y;\r
      }\r
    }\r
\r
    if (interactive) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
      container.addEventListener('touchmove', handleTouchMove);\r
    }\r
\r
    let animationId;\r
    function update(t) {\r
      animationId = requestAnimationFrame(update);\r
      program.uniforms.uTime.value = t * 0.001 * speed;\r
      renderer.render({ scene: mesh });\r
    }\r
    animationId = requestAnimationFrame(update);\r
\r
    container.appendChild(gl.canvas);\r
\r
    return () => {\r
      cancelAnimationFrame(animationId);\r
      window.removeEventListener('resize', resize);\r
      if (interactive) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
        container.removeEventListener('touchmove', handleTouchMove);\r
      }\r
      if (gl.canvas.parentElement) {\r
        gl.canvas.parentElement.removeChild(gl.canvas);\r
      }\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);\r
\r
  return <div ref={containerRef} className="liquidChrome-container" {...props} />;\r
};\r
\r
export default LiquidChrome;\r
`,J=`.liquidChrome-container {\r
  width: 100%;\r
  height: 100%;\r
}\r
`,K=`import { useRef, useEffect } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
\r
export const LiquidChrome = ({\r
  baseColor = [0.1, 0.1, 0.1],\r
  speed = 0.2,\r
  amplitude = 0.5,\r
  frequencyX = 3,\r
  frequencyY = 2,\r
  interactive = true,\r
  ...props\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const container = containerRef.current;\r
    const renderer = new Renderer({ antialias: true });\r
    const gl = renderer.gl;\r
    gl.clearColor(1, 1, 1, 1);\r
\r
    const vertexShader = \`\r
      attribute vec2 position;\r
      attribute vec2 uv;\r
      varying vec2 vUv;\r
      void main() {\r
        vUv = uv;\r
        gl_Position = vec4(position, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragmentShader = \`\r
      precision highp float;\r
      uniform float uTime;\r
      uniform vec3 uResolution;\r
      uniform vec3 uBaseColor;\r
      uniform float uAmplitude;\r
      uniform float uFrequencyX;\r
      uniform float uFrequencyY;\r
      uniform vec2 uMouse;\r
      varying vec2 vUv;\r
\r
      vec4 renderImage(vec2 uvCoord) {\r
          vec2 fragCoord = uvCoord * uResolution.xy;\r
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);\r
\r
          for (float i = 1.0; i < 10.0; i++){\r
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);\r
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);\r
          }\r
\r
          vec2 diff = (uvCoord - uMouse);\r
          float dist = length(diff);\r
          float falloff = exp(-dist * 20.0);\r
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;\r
          uv += (diff / (dist + 0.0001)) * ripple * falloff;\r
\r
          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));\r
          return vec4(color, 1.0);\r
      }\r
\r
      void main() {\r
          vec4 col = vec4(0.0);\r
          int samples = 0;\r
          for (int i = -1; i <= 1; i++){\r
              for (int j = -1; j <= 1; j++){\r
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));\r
                  col += renderImage(vUv + offset);\r
                  samples++;\r
              }\r
          }\r
          gl_FragColor = col / float(samples);\r
      }\r
    \`;\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uResolution: {\r
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])\r
        },\r
        uBaseColor: { value: new Float32Array(baseColor) },\r
        uAmplitude: { value: amplitude },\r
        uFrequencyX: { value: frequencyX },\r
        uFrequencyY: { value: frequencyY },\r
        uMouse: { value: new Float32Array([0, 0]) }\r
      }\r
    });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      const scale = 1;\r
      renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);\r
      const resUniform = program.uniforms.uResolution.value;\r
      resUniform[0] = gl.canvas.width;\r
      resUniform[1] = gl.canvas.height;\r
      resUniform[2] = gl.canvas.width / gl.canvas.height;\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    function handleMouseMove(event) {\r
      const rect = container.getBoundingClientRect();\r
      const x = (event.clientX - rect.left) / rect.width;\r
      const y = 1 - (event.clientY - rect.top) / rect.height;\r
      const mouseUniform = program.uniforms.uMouse.value;\r
      mouseUniform[0] = x;\r
      mouseUniform[1] = y;\r
    }\r
\r
    function handleTouchMove(event) {\r
      if (event.touches.length > 0) {\r
        const touch = event.touches[0];\r
        const rect = container.getBoundingClientRect();\r
        const x = (touch.clientX - rect.left) / rect.width;\r
        const y = 1 - (touch.clientY - rect.top) / rect.height;\r
        const mouseUniform = program.uniforms.uMouse.value;\r
        mouseUniform[0] = x;\r
        mouseUniform[1] = y;\r
      }\r
    }\r
\r
    if (interactive) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
      container.addEventListener('touchmove', handleTouchMove);\r
    }\r
\r
    let animationId;\r
    function update(t) {\r
      animationId = requestAnimationFrame(update);\r
      program.uniforms.uTime.value = t * 0.001 * speed;\r
      renderer.render({ scene: mesh });\r
    }\r
    animationId = requestAnimationFrame(update);\r
\r
    container.appendChild(gl.canvas);\r
\r
    return () => {\r
      cancelAnimationFrame(animationId);\r
      window.removeEventListener('resize', resize);\r
      if (interactive) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
        container.removeEventListener('touchmove', handleTouchMove);\r
      }\r
      if (gl.canvas.parentElement) {\r
        gl.canvas.parentElement.removeChild(gl.canvas);\r
      }\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);\r
\r
  return <div ref={containerRef} className="w-full h-full" {...props} />;\r
};\r
\r
export default LiquidChrome;\r
`,Q=`import React, { useRef, useEffect } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
\r
import './LiquidChrome.css';\r
\r
interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {\r
  baseColor?: [number, number, number];\r
  speed?: number;\r
  amplitude?: number;\r
  frequencyX?: number;\r
  frequencyY?: number;\r
  interactive?: boolean;\r
}\r
\r
export const LiquidChrome: React.FC<LiquidChromeProps> = ({\r
  baseColor = [0.1, 0.1, 0.1],\r
  speed = 0.2,\r
  amplitude = 0.5,\r
  frequencyX = 3,\r
  frequencyY = 2,\r
  interactive = true,\r
  ...props\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const container = containerRef.current;\r
    const renderer = new Renderer({ antialias: true });\r
    const gl = renderer.gl;\r
    gl.clearColor(1, 1, 1, 1);\r
\r
    const vertexShader = \`\r
      attribute vec2 position;\r
      attribute vec2 uv;\r
      varying vec2 vUv;\r
      void main() {\r
        vUv = uv;\r
        gl_Position = vec4(position, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragmentShader = \`\r
      precision highp float;\r
      uniform float uTime;\r
      uniform vec3 uResolution;\r
      uniform vec3 uBaseColor;\r
      uniform float uAmplitude;\r
      uniform float uFrequencyX;\r
      uniform float uFrequencyY;\r
      uniform vec2 uMouse;\r
      varying vec2 vUv;\r
\r
      vec4 renderImage(vec2 uvCoord) {\r
          vec2 fragCoord = uvCoord * uResolution.xy;\r
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);\r
\r
          for (float i = 1.0; i < 10.0; i++){\r
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);\r
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);\r
          }\r
\r
          vec2 diff = (uvCoord - uMouse);\r
          float dist = length(diff);\r
          float falloff = exp(-dist * 20.0);\r
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;\r
          uv += (diff / (dist + 0.0001)) * ripple * falloff;\r
\r
          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));\r
          return vec4(color, 1.0);\r
      }\r
\r
      void main() {\r
          vec4 col = vec4(0.0);\r
          int samples = 0;\r
          for (int i = -1; i <= 1; i++){\r
              for (int j = -1; j <= 1; j++){\r
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));\r
                  col += renderImage(vUv + offset);\r
                  samples++;\r
              }\r
          }\r
          gl_FragColor = col / float(samples);\r
      }\r
    \`;\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uResolution: {\r
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])\r
        },\r
        uBaseColor: { value: new Float32Array(baseColor) },\r
        uAmplitude: { value: amplitude },\r
        uFrequencyX: { value: frequencyX },\r
        uFrequencyY: { value: frequencyY },\r
        uMouse: { value: new Float32Array([0, 0]) }\r
      }\r
    });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      const scale = 1;\r
      renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);\r
      const resUniform = program.uniforms.uResolution.value as Float32Array;\r
      resUniform[0] = gl.canvas.width;\r
      resUniform[1] = gl.canvas.height;\r
      resUniform[2] = gl.canvas.width / gl.canvas.height;\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    function handleMouseMove(event: MouseEvent) {\r
      const rect = container.getBoundingClientRect();\r
      const x = (event.clientX - rect.left) / rect.width;\r
      const y = 1 - (event.clientY - rect.top) / rect.height;\r
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;\r
      mouseUniform[0] = x;\r
      mouseUniform[1] = y;\r
    }\r
\r
    function handleTouchMove(event: TouchEvent) {\r
      if (event.touches.length > 0) {\r
        const touch = event.touches[0];\r
        const rect = container.getBoundingClientRect();\r
        const x = (touch.clientX - rect.left) / rect.width;\r
        const y = 1 - (touch.clientY - rect.top) / rect.height;\r
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;\r
        mouseUniform[0] = x;\r
        mouseUniform[1] = y;\r
      }\r
    }\r
\r
    if (interactive) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
      container.addEventListener('touchmove', handleTouchMove);\r
    }\r
\r
    let animationId: number;\r
    function update(t: number) {\r
      animationId = requestAnimationFrame(update);\r
      program.uniforms.uTime.value = t * 0.001 * speed;\r
      renderer.render({ scene: mesh });\r
    }\r
    animationId = requestAnimationFrame(update);\r
\r
    container.appendChild(gl.canvas);\r
\r
    return () => {\r
      cancelAnimationFrame(animationId);\r
      window.removeEventListener('resize', resize);\r
      if (interactive) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
        container.removeEventListener('touchmove', handleTouchMove);\r
      }\r
      if (gl.canvas.parentElement) {\r
        gl.canvas.parentElement.removeChild(gl.canvas);\r
      }\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);\r
\r
  return <div ref={containerRef} className="liquidChrome-container" {...props} />;\r
};\r
\r
export default LiquidChrome;\r
`,V=`import React, { useRef, useEffect } from 'react';\r
import { Renderer, Program, Mesh, Triangle } from 'ogl';\r
\r
interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {\r
  baseColor?: [number, number, number];\r
  speed?: number;\r
  amplitude?: number;\r
  frequencyX?: number;\r
  frequencyY?: number;\r
  interactive?: boolean;\r
}\r
\r
export const LiquidChrome: React.FC<LiquidChromeProps> = ({\r
  baseColor = [0.1, 0.1, 0.1],\r
  speed = 0.2,\r
  amplitude = 0.5,\r
  frequencyX = 3,\r
  frequencyY = 2,\r
  interactive = true,\r
  ...props\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const container = containerRef.current;\r
    const renderer = new Renderer({ antialias: true });\r
    const gl = renderer.gl;\r
    gl.clearColor(1, 1, 1, 1);\r
\r
    const vertexShader = \`\r
      attribute vec2 position;\r
      attribute vec2 uv;\r
      varying vec2 vUv;\r
      void main() {\r
        vUv = uv;\r
        gl_Position = vec4(position, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragmentShader = \`\r
      precision highp float;\r
      uniform float uTime;\r
      uniform vec3 uResolution;\r
      uniform vec3 uBaseColor;\r
      uniform float uAmplitude;\r
      uniform float uFrequencyX;\r
      uniform float uFrequencyY;\r
      uniform vec2 uMouse;\r
      varying vec2 vUv;\r
\r
      vec4 renderImage(vec2 uvCoord) {\r
          vec2 fragCoord = uvCoord * uResolution.xy;\r
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);\r
\r
          for (float i = 1.0; i < 10.0; i++){\r
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);\r
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);\r
          }\r
\r
          vec2 diff = (uvCoord - uMouse);\r
          float dist = length(diff);\r
          float falloff = exp(-dist * 20.0);\r
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;\r
          uv += (diff / (dist + 0.0001)) * ripple * falloff;\r
\r
          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));\r
          return vec4(color, 1.0);\r
      }\r
\r
      void main() {\r
          vec4 col = vec4(0.0);\r
          int samples = 0;\r
          for (int i = -1; i <= 1; i++){\r
              for (int j = -1; j <= 1; j++){\r
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));\r
                  col += renderImage(vUv + offset);\r
                  samples++;\r
              }\r
          }\r
          gl_FragColor = col / float(samples);\r
      }\r
    \`;\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uResolution: {\r
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])\r
        },\r
        uBaseColor: { value: new Float32Array(baseColor) },\r
        uAmplitude: { value: amplitude },\r
        uFrequencyX: { value: frequencyX },\r
        uFrequencyY: { value: frequencyY },\r
        uMouse: { value: new Float32Array([0, 0]) }\r
      }\r
    });\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      const scale = 1;\r
      renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);\r
      const resUniform = program.uniforms.uResolution.value as Float32Array;\r
      resUniform[0] = gl.canvas.width;\r
      resUniform[1] = gl.canvas.height;\r
      resUniform[2] = gl.canvas.width / gl.canvas.height;\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    function handleMouseMove(event: MouseEvent) {\r
      const rect = container.getBoundingClientRect();\r
      const x = (event.clientX - rect.left) / rect.width;\r
      const y = 1 - (event.clientY - rect.top) / rect.height;\r
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;\r
      mouseUniform[0] = x;\r
      mouseUniform[1] = y;\r
    }\r
\r
    function handleTouchMove(event: TouchEvent) {\r
      if (event.touches.length > 0) {\r
        const touch = event.touches[0];\r
        const rect = container.getBoundingClientRect();\r
        const x = (touch.clientX - rect.left) / rect.width;\r
        const y = 1 - (touch.clientY - rect.top) / rect.height;\r
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;\r
        mouseUniform[0] = x;\r
        mouseUniform[1] = y;\r
      }\r
    }\r
\r
    if (interactive) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
      container.addEventListener('touchmove', handleTouchMove);\r
    }\r
\r
    let animationId: number;\r
    function update(t: number) {\r
      animationId = requestAnimationFrame(update);\r
      program.uniforms.uTime.value = t * 0.001 * speed;\r
      renderer.render({ scene: mesh });\r
    }\r
    animationId = requestAnimationFrame(update);\r
\r
    container.appendChild(gl.canvas);\r
\r
    return () => {\r
      cancelAnimationFrame(animationId);\r
      window.removeEventListener('resize', resize);\r
      if (interactive) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
        container.removeEventListener('touchmove', handleTouchMove);\r
      }\r
      if (gl.canvas.parentElement) {\r
        gl.canvas.parentElement.removeChild(gl.canvas);\r
      }\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);\r
\r
  return <div ref={containerRef} className="w-full h-full" {...props} />;\r
};\r
\r
export default LiquidChrome;\r
`,Z={dependencies:"ogl",usage:`import LiquidChrome from './LiquidChrome';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <LiquidChrome
    baseColor={[0.1, 0.1, 0.1]}
    speed={1}
    amplitude={0.6}
    interactive={true}
  />
</div>`,code:O,css:J,tailwind:K,tsCode:Q,tsTailwind:V},se=()=>{const[m,p]=l.useState(.3),[u,s]=l.useState([.1,.1,.1]),[v,f]=l.useState(!0),[y,d]=l.useState(.3),o=[{name:"baseColor",type:"RGB array (number[3])",default:"[0.1, 0.1, 0.1]",description:"Base color of the component. Specify as an RGB array."},{name:"speed",type:"number",default:"1.0",description:"Animation speed multiplier."},{name:"amplitude",type:"number",default:"0.6",description:"Amplitude of the distortion."},{name:"frequencyX",type:"number",default:"2.5",description:"Frequency modifier for the x distortion."},{name:"frequencyY",type:"number",default:"1.5",description:"Frequency modifier for the y distortion."},{name:"interactive",type:"boolean",default:"true",description:"Enable mouse/touch interaction."}];return n.jsxs(z,{children:[n.jsxs(S,{children:[n.jsxs(X,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[n.jsx(k,{baseColor:u,amplitude:y,speed:m,interactive:v}),n.jsx(G,{pillText:"New Background",headline:"Swirl around in the deep sea of liquid chrome!"})]}),n.jsxs(H,{children:[n.jsx(Y,{fontSize:"sm",children:"Colors"}),n.jsxs(C,{gap:4,wrap:"wrap",children:[n.jsx(C,{gap:4,align:"center",mt:2,background:"#170D27",px:4,borderRadius:16,position:"relative",children:n.jsx(g,{min:0,max:1,width:50,step:.1,value:u[0],title:"Red",onChange:r=>{s(e=>{const a=[...e];return a[0]=r,a})}})}),n.jsx(C,{gap:4,align:"center",mt:2,background:"#170D27",px:4,borderRadius:16,position:"relative",children:n.jsx(g,{min:0,max:1,width:50,step:.1,value:u[1],title:"Green",onChange:r=>{s(e=>{const a=[...e];return a[1]=r,a})}})}),n.jsx(C,{gap:4,align:"center",mt:2,background:"#170D27",px:4,borderRadius:16,position:"relative",children:n.jsx(g,{min:0,max:1,width:50,step:.1,value:u[2],title:"Blue",onChange:r=>{s(e=>{const a=[...e];return a[2]=r,a})}})})]}),n.jsx(g,{min:0,title:"Speed",max:5,step:.01,value:m,onChange:r=>{p(r)}}),n.jsx(g,{min:.1,title:"Amplitude",max:1,step:.01,value:y,onChange:r=>{d(r)}}),n.jsx(W,{title:"Enable Interaction",isChecked:v,onChange:r=>{f(r)}})]}),n.jsx(I,{data:o}),n.jsx(D,{dependencyList:["ogl"]})]}),n.jsx(P,{children:n.jsx(_,{codeObject:Z})})]})};export{se as default};
