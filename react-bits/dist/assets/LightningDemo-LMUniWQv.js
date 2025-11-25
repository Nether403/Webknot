import{r as s,j as e,B as U}from"./index-wsKSLPNH.js";import{T as _,P as F,a as H,C as B,b as N}from"./PropTable-C4uPWs8h.js";import{C as X}from"./Customize-1m_ZNqR9.js";import{P as g}from"./PreviewSlider-m1G_aiYP.js";import{u as D}from"./useForceRerender-BCFU-k0M.js";import{B as V}from"./BackgroundContent-CqU7Wlm2.js";import"./index-Bpz4cGEA.js";import"./PreviewSwitch-DqnF708j.js";const j=({hue:f=230,xOffset:m=0,speed:l=1,intensity:p=1,size:u=1})=>{const d=s.useRef(null);return s.useEffect(()=>{const t=d.current;if(!t)return;const c=()=>{t.width=t.clientWidth,t.height=t.clientHeight};c(),window.addEventListener("resize",c);const r=t.getContext("webgl");if(!r){console.error("WebGL not supported");return}const h=`
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `,S=`
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `,a=(x,I)=>{const i=r.createShader(I);return i?(r.shaderSource(i,x),r.compileShader(i),r.getShaderParameter(i,r.COMPILE_STATUS)?i:(console.error("Shader compile error:",r.getShaderInfoLog(i)),r.deleteShader(i),null)):null},v=a(h,r.VERTEX_SHADER),o=a(S,r.FRAGMENT_SHADER);if(!v||!o)return;const n=r.createProgram();if(!n)return;if(r.attachShader(n,v),r.attachShader(n,o),r.linkProgram(n),!r.getProgramParameter(n,r.LINK_STATUS)){console.error("Program linking error:",r.getProgramInfoLog(n));return}r.useProgram(n);const T=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),R=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,R),r.bufferData(r.ARRAY_BUFFER,T,r.STATIC_DRAW);const L=r.getAttribLocation(n,"aPosition");r.enableVertexAttribArray(L),r.vertexAttribPointer(L,2,r.FLOAT,!1,0,0);const A=r.getUniformLocation(n,"iResolution"),y=r.getUniformLocation(n,"iTime"),C=r.getUniformLocation(n,"uHue"),z=r.getUniformLocation(n,"uXOffset"),P=r.getUniformLocation(n,"uSpeed"),w=r.getUniformLocation(n,"uIntensity"),E=r.getUniformLocation(n,"uSize"),O=performance.now(),b=()=>{c(),r.viewport(0,0,t.width,t.height),r.uniform2f(A,t.width,t.height);const x=performance.now();r.uniform1f(y,(x-O)/1e3),r.uniform1f(C,f),r.uniform1f(z,m),r.uniform1f(P,l),r.uniform1f(w,p),r.uniform1f(E,u),r.drawArrays(r.TRIANGLES,0,6),requestAnimationFrame(b)};return requestAnimationFrame(b),()=>{window.removeEventListener("resize",c)}},[f,m,l,p,u]),e.jsx("canvas",{ref:d,className:"lightning-container"})},G=`import { useRef, useEffect } from 'react';\r
import './Lightning.css';\r
\r
const Lightning = ({ hue = 230, xOffset = 0, speed = 1, intensity = 1, size = 1 }) => {\r
  const canvasRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const resizeCanvas = () => {\r
      canvas.width = canvas.clientWidth;\r
      canvas.height = canvas.clientHeight;\r
    };\r
    resizeCanvas();\r
    window.addEventListener('resize', resizeCanvas);\r
\r
    const gl = canvas.getContext('webgl');\r
    if (!gl) {\r
      console.error('WebGL not supported');\r
      return;\r
    }\r
\r
    const vertexShaderSource = \`\r
      attribute vec2 aPosition;\r
      void main() {\r
        gl_Position = vec4(aPosition, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragmentShaderSource = \`\r
      precision mediump float;\r
      uniform vec2 iResolution;\r
      uniform float iTime;\r
      uniform float uHue;\r
      uniform float uXOffset;\r
      uniform float uSpeed;\r
      uniform float uIntensity;\r
      uniform float uSize;\r
      \r
      #define OCTAVE_COUNT 10\r
\r
      vec3 hsv2rgb(vec3 c) {\r
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);\r
          return c.z * mix(vec3(1.0), rgb, c.y);\r
      }\r
\r
      float hash11(float p) {\r
          p = fract(p * .1031);\r
          p *= p + 33.33;\r
          p *= p + p;\r
          return fract(p);\r
      }\r
\r
      float hash12(vec2 p) {\r
          vec3 p3 = fract(vec3(p.xyx) * .1031);\r
          p3 += dot(p3, p3.yzx + 33.33);\r
          return fract((p3.x + p3.y) * p3.z);\r
      }\r
\r
      mat2 rotate2d(float theta) {\r
          float c = cos(theta);\r
          float s = sin(theta);\r
          return mat2(c, -s, s, c);\r
      }\r
\r
      float noise(vec2 p) {\r
          vec2 ip = floor(p);\r
          vec2 fp = fract(p);\r
          float a = hash12(ip);\r
          float b = hash12(ip + vec2(1.0, 0.0));\r
          float c = hash12(ip + vec2(0.0, 1.0));\r
          float d = hash12(ip + vec2(1.0, 1.0));\r
          \r
          vec2 t = smoothstep(0.0, 1.0, fp);\r
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);\r
      }\r
\r
      float fbm(vec2 p) {\r
          float value = 0.0;\r
          float amplitude = 0.5;\r
          for (int i = 0; i < OCTAVE_COUNT; ++i) {\r
              value += amplitude * noise(p);\r
              p *= rotate2d(0.45);\r
              p *= 2.0;\r
              amplitude *= 0.5;\r
          }\r
          return value;\r
      }\r
\r
      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\r
          vec2 uv = fragCoord / iResolution.xy;\r
          uv = 2.0 * uv - 1.0;\r
          uv.x *= iResolution.x / iResolution.y;\r
          uv.x += uXOffset;\r
          \r
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;\r
          \r
          float dist = abs(uv.x);\r
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));\r
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;\r
          col = pow(col, vec3(1.0));\r
          fragColor = vec4(col, 1.0);\r
      }\r
\r
      void main() {\r
          mainImage(gl_FragColor, gl_FragCoord.xy);\r
      }\r
    \`;\r
\r
    const compileShader = (source, type) => {\r
      const shader = gl.createShader(type);\r
      if (!shader) return null;\r
      gl.shaderSource(shader, source);\r
      gl.compileShader(shader);\r
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));\r
        gl.deleteShader(shader);\r
        return null;\r
      }\r
      return shader;\r
    };\r
\r
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);\r
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);\r
    if (!vertexShader || !fragmentShader) return;\r
\r
    const program = gl.createProgram();\r
    if (!program) return;\r
    gl.attachShader(program, vertexShader);\r
    gl.attachShader(program, fragmentShader);\r
    gl.linkProgram(program);\r
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
      console.error('Program linking error:', gl.getProgramInfoLog(program));\r
      return;\r
    }\r
    gl.useProgram(program);\r
\r
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);\r
    const vertexBuffer = gl.createBuffer();\r
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\r
\r
    const aPosition = gl.getAttribLocation(program, 'aPosition');\r
    gl.enableVertexAttribArray(aPosition);\r
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);\r
\r
    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');\r
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');\r
    const uHueLocation = gl.getUniformLocation(program, 'uHue');\r
    const uXOffsetLocation = gl.getUniformLocation(program, 'uXOffset');\r
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');\r
    const uIntensityLocation = gl.getUniformLocation(program, 'uIntensity');\r
    const uSizeLocation = gl.getUniformLocation(program, 'uSize');\r
\r
    const startTime = performance.now();\r
    const render = () => {\r
      resizeCanvas();\r
      gl.viewport(0, 0, canvas.width, canvas.height);\r
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);\r
      const currentTime = performance.now();\r
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);\r
      gl.uniform1f(uHueLocation, hue);\r
      gl.uniform1f(uXOffsetLocation, xOffset);\r
      gl.uniform1f(uSpeedLocation, speed);\r
      gl.uniform1f(uIntensityLocation, intensity);\r
      gl.uniform1f(uSizeLocation, size);\r
      gl.drawArrays(gl.TRIANGLES, 0, 6);\r
      requestAnimationFrame(render);\r
    };\r
    requestAnimationFrame(render);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
    };\r
  }, [hue, xOffset, speed, intensity, size]);\r
\r
  return <canvas ref={canvasRef} className="lightning-container" />;\r
};\r
\r
export default Lightning;\r
`,W=`.lightning-container {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
}\r
`,k=`import { useRef, useEffect } from 'react';\r
\r
const Lightning = ({ hue = 230, xOffset = 0, speed = 1, intensity = 1, size = 1 }) => {\r
  const canvasRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const resizeCanvas = () => {\r
      canvas.width = canvas.clientWidth;\r
      canvas.height = canvas.clientHeight;\r
    };\r
    resizeCanvas();\r
    window.addEventListener('resize', resizeCanvas);\r
\r
    const gl = canvas.getContext('webgl');\r
    if (!gl) {\r
      console.error('WebGL not supported');\r
      return;\r
    }\r
\r
    const vertexShaderSource = \`\r
      attribute vec2 aPosition;\r
      void main() {\r
        gl_Position = vec4(aPosition, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragmentShaderSource = \`\r
      precision mediump float;\r
      uniform vec2 iResolution;\r
      uniform float iTime;\r
      uniform float uHue;\r
      uniform float uXOffset;\r
      uniform float uSpeed;\r
      uniform float uIntensity;\r
      uniform float uSize;\r
      \r
      #define OCTAVE_COUNT 10\r
\r
      vec3 hsv2rgb(vec3 c) {\r
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);\r
          return c.z * mix(vec3(1.0), rgb, c.y);\r
      }\r
\r
      float hash11(float p) {\r
          p = fract(p * .1031);\r
          p *= p + 33.33;\r
          p *= p + p;\r
          return fract(p);\r
      }\r
\r
      float hash12(vec2 p) {\r
          vec3 p3 = fract(vec3(p.xyx) * .1031);\r
          p3 += dot(p3, p3.yzx + 33.33);\r
          return fract((p3.x + p3.y) * p3.z);\r
      }\r
\r
      mat2 rotate2d(float theta) {\r
          float c = cos(theta);\r
          float s = sin(theta);\r
          return mat2(c, -s, s, c);\r
      }\r
\r
      float noise(vec2 p) {\r
          vec2 ip = floor(p);\r
          vec2 fp = fract(p);\r
          float a = hash12(ip);\r
          float b = hash12(ip + vec2(1.0, 0.0));\r
          float c = hash12(ip + vec2(0.0, 1.0));\r
          float d = hash12(ip + vec2(1.0, 1.0));\r
          \r
          vec2 t = smoothstep(0.0, 1.0, fp);\r
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);\r
      }\r
\r
      float fbm(vec2 p) {\r
          float value = 0.0;\r
          float amplitude = 0.5;\r
          for (int i = 0; i < OCTAVE_COUNT; ++i) {\r
              value += amplitude * noise(p);\r
              p *= rotate2d(0.45);\r
              p *= 2.0;\r
              amplitude *= 0.5;\r
          }\r
          return value;\r
      }\r
\r
      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\r
          vec2 uv = fragCoord / iResolution.xy;\r
          uv = 2.0 * uv - 1.0;\r
          uv.x *= iResolution.x / iResolution.y;\r
          uv.x += uXOffset;\r
          \r
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;\r
          \r
          float dist = abs(uv.x);\r
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));\r
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;\r
          col = pow(col, vec3(1.0));\r
          fragColor = vec4(col, 1.0);\r
      }\r
\r
      void main() {\r
          mainImage(gl_FragColor, gl_FragCoord.xy);\r
      }\r
    \`;\r
\r
    const compileShader = (source, type) => {\r
      const shader = gl.createShader(type);\r
      if (!shader) return null;\r
      gl.shaderSource(shader, source);\r
      gl.compileShader(shader);\r
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));\r
        gl.deleteShader(shader);\r
        return null;\r
      }\r
      return shader;\r
    };\r
\r
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);\r
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);\r
    if (!vertexShader || !fragmentShader) return;\r
\r
    const program = gl.createProgram();\r
    if (!program) return;\r
    gl.attachShader(program, vertexShader);\r
    gl.attachShader(program, fragmentShader);\r
    gl.linkProgram(program);\r
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
      console.error('Program linking error:', gl.getProgramInfoLog(program));\r
      return;\r
    }\r
    gl.useProgram(program);\r
\r
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);\r
    const vertexBuffer = gl.createBuffer();\r
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\r
\r
    const aPosition = gl.getAttribLocation(program, 'aPosition');\r
    gl.enableVertexAttribArray(aPosition);\r
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);\r
\r
    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');\r
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');\r
    const uHueLocation = gl.getUniformLocation(program, 'uHue');\r
    const uXOffsetLocation = gl.getUniformLocation(program, 'uXOffset');\r
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');\r
    const uIntensityLocation = gl.getUniformLocation(program, 'uIntensity');\r
    const uSizeLocation = gl.getUniformLocation(program, 'uSize');\r
\r
    const startTime = performance.now();\r
    const render = () => {\r
      resizeCanvas();\r
      gl.viewport(0, 0, canvas.width, canvas.height);\r
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);\r
      const currentTime = performance.now();\r
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);\r
      gl.uniform1f(uHueLocation, hue);\r
      gl.uniform1f(uXOffsetLocation, xOffset);\r
      gl.uniform1f(uSpeedLocation, speed);\r
      gl.uniform1f(uIntensityLocation, intensity);\r
      gl.uniform1f(uSizeLocation, size);\r
      gl.drawArrays(gl.TRIANGLES, 0, 6);\r
      requestAnimationFrame(render);\r
    };\r
    requestAnimationFrame(render);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
    };\r
  }, [hue, xOffset, speed, intensity, size]);\r
\r
  return <canvas ref={canvasRef} className="w-full h-full relative" />;\r
};\r
\r
export default Lightning;\r
`,M=`import React, { useRef, useEffect } from 'react';\r
import './Lightning.css';\r
\r
interface LightningProps {\r
  hue?: number;\r
  xOffset?: number;\r
  speed?: number;\r
  intensity?: number;\r
  size?: number;\r
}\r
\r
const Lightning: React.FC<LightningProps> = ({ hue = 230, xOffset = 0, speed = 1, intensity = 1, size = 1 }) => {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const resizeCanvas = () => {\r
      canvas.width = canvas.clientWidth;\r
      canvas.height = canvas.clientHeight;\r
    };\r
    resizeCanvas();\r
    window.addEventListener('resize', resizeCanvas);\r
\r
    const gl = canvas.getContext('webgl');\r
    if (!gl) {\r
      console.error('WebGL not supported');\r
      return;\r
    }\r
\r
    const vertexShaderSource = \`\r
      attribute vec2 aPosition;\r
      void main() {\r
        gl_Position = vec4(aPosition, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragmentShaderSource = \`\r
      precision mediump float;\r
      uniform vec2 iResolution;\r
      uniform float iTime;\r
      uniform float uHue;\r
      uniform float uXOffset;\r
      uniform float uSpeed;\r
      uniform float uIntensity;\r
      uniform float uSize;\r
      \r
      #define OCTAVE_COUNT 10\r
\r
      vec3 hsv2rgb(vec3 c) {\r
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);\r
          return c.z * mix(vec3(1.0), rgb, c.y);\r
      }\r
\r
      float hash11(float p) {\r
          p = fract(p * .1031);\r
          p *= p + 33.33;\r
          p *= p + p;\r
          return fract(p);\r
      }\r
\r
      float hash12(vec2 p) {\r
          vec3 p3 = fract(vec3(p.xyx) * .1031);\r
          p3 += dot(p3, p3.yzx + 33.33);\r
          return fract((p3.x + p3.y) * p3.z);\r
      }\r
\r
      mat2 rotate2d(float theta) {\r
          float c = cos(theta);\r
          float s = sin(theta);\r
          return mat2(c, -s, s, c);\r
      }\r
\r
      float noise(vec2 p) {\r
          vec2 ip = floor(p);\r
          vec2 fp = fract(p);\r
          float a = hash12(ip);\r
          float b = hash12(ip + vec2(1.0, 0.0));\r
          float c = hash12(ip + vec2(0.0, 1.0));\r
          float d = hash12(ip + vec2(1.0, 1.0));\r
          \r
          vec2 t = smoothstep(0.0, 1.0, fp);\r
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);\r
      }\r
\r
      float fbm(vec2 p) {\r
          float value = 0.0;\r
          float amplitude = 0.5;\r
          for (int i = 0; i < OCTAVE_COUNT; ++i) {\r
              value += amplitude * noise(p);\r
              p *= rotate2d(0.45);\r
              p *= 2.0;\r
              amplitude *= 0.5;\r
          }\r
          return value;\r
      }\r
\r
      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\r
          vec2 uv = fragCoord / iResolution.xy;\r
          uv = 2.0 * uv - 1.0;\r
          uv.x *= iResolution.x / iResolution.y;\r
          uv.x += uXOffset;\r
          \r
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;\r
          \r
          float dist = abs(uv.x);\r
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));\r
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;\r
          col = pow(col, vec3(1.0));\r
          fragColor = vec4(col, 1.0);\r
      }\r
\r
      void main() {\r
          mainImage(gl_FragColor, gl_FragCoord.xy);\r
      }\r
    \`;\r
\r
    const compileShader = (source: string, type: number): WebGLShader | null => {\r
      const shader = gl.createShader(type);\r
      if (!shader) return null;\r
      gl.shaderSource(shader, source);\r
      gl.compileShader(shader);\r
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));\r
        gl.deleteShader(shader);\r
        return null;\r
      }\r
      return shader;\r
    };\r
\r
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);\r
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);\r
    if (!vertexShader || !fragmentShader) return;\r
\r
    const program = gl.createProgram();\r
    if (!program) return;\r
    gl.attachShader(program, vertexShader);\r
    gl.attachShader(program, fragmentShader);\r
    gl.linkProgram(program);\r
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
      console.error('Program linking error:', gl.getProgramInfoLog(program));\r
      return;\r
    }\r
    gl.useProgram(program);\r
\r
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);\r
    const vertexBuffer = gl.createBuffer();\r
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\r
\r
    const aPosition = gl.getAttribLocation(program, 'aPosition');\r
    gl.enableVertexAttribArray(aPosition);\r
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);\r
\r
    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');\r
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');\r
    const uHueLocation = gl.getUniformLocation(program, 'uHue');\r
    const uXOffsetLocation = gl.getUniformLocation(program, 'uXOffset');\r
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');\r
    const uIntensityLocation = gl.getUniformLocation(program, 'uIntensity');\r
    const uSizeLocation = gl.getUniformLocation(program, 'uSize');\r
\r
    const startTime = performance.now();\r
    const render = () => {\r
      resizeCanvas();\r
      gl.viewport(0, 0, canvas.width, canvas.height);\r
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);\r
      const currentTime = performance.now();\r
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);\r
      gl.uniform1f(uHueLocation, hue);\r
      gl.uniform1f(uXOffsetLocation, xOffset);\r
      gl.uniform1f(uSpeedLocation, speed);\r
      gl.uniform1f(uIntensityLocation, intensity);\r
      gl.uniform1f(uSizeLocation, size);\r
      gl.drawArrays(gl.TRIANGLES, 0, 6);\r
      requestAnimationFrame(render);\r
    };\r
    requestAnimationFrame(render);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
    };\r
  }, [hue, xOffset, speed, intensity, size]);\r
\r
  return <canvas ref={canvasRef} className="lightning-container" />;\r
};\r
\r
export default Lightning;\r
`,q=`import React, { useRef, useEffect } from 'react';\r
\r
interface LightningProps {\r
  hue?: number;\r
  xOffset?: number;\r
  speed?: number;\r
  intensity?: number;\r
  size?: number;\r
}\r
\r
const Lightning: React.FC<LightningProps> = ({ hue = 230, xOffset = 0, speed = 1, intensity = 1, size = 1 }) => {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    const resizeCanvas = () => {\r
      canvas.width = canvas.clientWidth;\r
      canvas.height = canvas.clientHeight;\r
    };\r
    resizeCanvas();\r
    window.addEventListener('resize', resizeCanvas);\r
\r
    const gl = canvas.getContext('webgl');\r
    if (!gl) {\r
      console.error('WebGL not supported');\r
      return;\r
    }\r
\r
    const vertexShaderSource = \`\r
      attribute vec2 aPosition;\r
      void main() {\r
        gl_Position = vec4(aPosition, 0.0, 1.0);\r
      }\r
    \`;\r
\r
    const fragmentShaderSource = \`\r
      precision mediump float;\r
      uniform vec2 iResolution;\r
      uniform float iTime;\r
      uniform float uHue;\r
      uniform float uXOffset;\r
      uniform float uSpeed;\r
      uniform float uIntensity;\r
      uniform float uSize;\r
      \r
      #define OCTAVE_COUNT 10\r
\r
      vec3 hsv2rgb(vec3 c) {\r
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);\r
          return c.z * mix(vec3(1.0), rgb, c.y);\r
      }\r
\r
      float hash11(float p) {\r
          p = fract(p * .1031);\r
          p *= p + 33.33;\r
          p *= p + p;\r
          return fract(p);\r
      }\r
\r
      float hash12(vec2 p) {\r
          vec3 p3 = fract(vec3(p.xyx) * .1031);\r
          p3 += dot(p3, p3.yzx + 33.33);\r
          return fract((p3.x + p3.y) * p3.z);\r
      }\r
\r
      mat2 rotate2d(float theta) {\r
          float c = cos(theta);\r
          float s = sin(theta);\r
          return mat2(c, -s, s, c);\r
      }\r
\r
      float noise(vec2 p) {\r
          vec2 ip = floor(p);\r
          vec2 fp = fract(p);\r
          float a = hash12(ip);\r
          float b = hash12(ip + vec2(1.0, 0.0));\r
          float c = hash12(ip + vec2(0.0, 1.0));\r
          float d = hash12(ip + vec2(1.0, 1.0));\r
          \r
          vec2 t = smoothstep(0.0, 1.0, fp);\r
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);\r
      }\r
\r
      float fbm(vec2 p) {\r
          float value = 0.0;\r
          float amplitude = 0.5;\r
          for (int i = 0; i < OCTAVE_COUNT; ++i) {\r
              value += amplitude * noise(p);\r
              p *= rotate2d(0.45);\r
              p *= 2.0;\r
              amplitude *= 0.5;\r
          }\r
          return value;\r
      }\r
\r
      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\r
          vec2 uv = fragCoord / iResolution.xy;\r
          uv = 2.0 * uv - 1.0;\r
          uv.x *= iResolution.x / iResolution.y;\r
          uv.x += uXOffset;\r
          \r
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;\r
          \r
          float dist = abs(uv.x);\r
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));\r
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;\r
          col = pow(col, vec3(1.0));\r
          fragColor = vec4(col, 1.0);\r
      }\r
\r
      void main() {\r
          mainImage(gl_FragColor, gl_FragCoord.xy);\r
      }\r
    \`;\r
\r
    const compileShader = (source: string, type: number): WebGLShader | null => {\r
      const shader = gl.createShader(type);\r
      if (!shader) return null;\r
      gl.shaderSource(shader, source);\r
      gl.compileShader(shader);\r
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));\r
        gl.deleteShader(shader);\r
        return null;\r
      }\r
      return shader;\r
    };\r
\r
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);\r
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);\r
    if (!vertexShader || !fragmentShader) return;\r
\r
    const program = gl.createProgram();\r
    if (!program) return;\r
    gl.attachShader(program, vertexShader);\r
    gl.attachShader(program, fragmentShader);\r
    gl.linkProgram(program);\r
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
      console.error('Program linking error:', gl.getProgramInfoLog(program));\r
      return;\r
    }\r
    gl.useProgram(program);\r
\r
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);\r
    const vertexBuffer = gl.createBuffer();\r
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\r
\r
    const aPosition = gl.getAttribLocation(program, 'aPosition');\r
    gl.enableVertexAttribArray(aPosition);\r
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);\r
\r
    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');\r
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');\r
    const uHueLocation = gl.getUniformLocation(program, 'uHue');\r
    const uXOffsetLocation = gl.getUniformLocation(program, 'uXOffset');\r
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');\r
    const uIntensityLocation = gl.getUniformLocation(program, 'uIntensity');\r
    const uSizeLocation = gl.getUniformLocation(program, 'uSize');\r
\r
    const startTime = performance.now();\r
    const render = () => {\r
      resizeCanvas();\r
      gl.viewport(0, 0, canvas.width, canvas.height);\r
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);\r
      const currentTime = performance.now();\r
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);\r
      gl.uniform1f(uHueLocation, hue);\r
      gl.uniform1f(uXOffsetLocation, xOffset);\r
      gl.uniform1f(uSpeedLocation, speed);\r
      gl.uniform1f(uIntensityLocation, intensity);\r
      gl.uniform1f(uSizeLocation, size);\r
      gl.drawArrays(gl.TRIANGLES, 0, 6);\r
      requestAnimationFrame(render);\r
    };\r
    requestAnimationFrame(render);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
    };\r
  }, [hue, xOffset, speed, intensity, size]);\r
\r
  return <canvas ref={canvasRef} className="w-full h-full relative" />;\r
};\r
\r
export default Lightning;\r
`,Y={usage:`import Lightning from './Lightning';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Lightning
    hue={220}
    xOffset={0}
    speed={1}
    intensity={1}
    size={1}
  />
</div>`,code:G,css:W,tailwind:k,tsCode:M,tsTailwind:q},tr=()=>{const[f,m]=s.useState(260),[l,p]=s.useState(0),[u,d]=s.useState(1),[t,c]=s.useState(1),[r,h]=s.useState(1),[S,a]=D(),v=[{name:"hue",type:"number",default:"230",description:"Hue of the lightning in degrees (0 to 360)."},{name:"xOffset",type:"number",default:"0",description:"Horizontal offset of the lightning in normalized units."},{name:"speed",type:"number",default:"1",description:"Animation speed multiplier for the lightning."},{name:"intensity",type:"number",default:"1",description:"Brightness multiplier for the lightning."},{name:"size",type:"number",default:"1",description:"Scale factor for the bolt size."}];return e.jsxs(_,{children:[e.jsxs(F,{children:[e.jsxs(U,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[e.jsx(j,{hue:f,xOffset:l,speed:u,intensity:t,size:r},S),e.jsx(V,{pillText:"New Background",headline:"The power of nature's fury, with React Bits!"})]}),e.jsxs(X,{children:[e.jsx(g,{title:"Hue",min:0,max:360,step:1,value:f,onChange:o=>{m(o),a()}}),e.jsx(g,{title:"X Offset",min:-2,max:2,step:.1,value:l,onChange:o=>{p(o),a()}}),e.jsx(g,{title:"Speed",min:.5,max:2,step:.1,value:u,onChange:o=>{d(o),a()}}),e.jsx(g,{title:"Intensity",min:.1,max:2,step:.1,value:t,onChange:o=>{c(o),a()}}),e.jsx(g,{title:"Size",min:.1,max:3,step:.1,value:r,onChange:o=>{h(o),a()}})]}),e.jsx(H,{data:v})]}),e.jsx(B,{children:e.jsx(N,{codeObject:Y})})]})};export{tr as default};
