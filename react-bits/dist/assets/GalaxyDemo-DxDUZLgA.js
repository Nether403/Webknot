import{r,R as V,P as j,M as K,j as n,B}from"./index-wsKSLPNH.js";import{T as Y,P as W,a as q,C as X,b as J}from"./PropTable-C4uPWs8h.js";import{C as Q}from"./Customize-1m_ZNqR9.js";import{B as Z}from"./BackgroundContent-CqU7Wlm2.js";import{D as $}from"./Dependencies-BHoMfJUj.js";import{P as D}from"./PreviewSwitch-DqnF708j.js";import{P as a}from"./PreviewSlider-m1G_aiYP.js";import{T as ee}from"./Triangle-66-Bqe-c.js";import{C as z}from"./Color-YRkaOI4u.js";import"./index-Bpz4cGEA.js";const ne=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,re=`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;function te({focal:m=[.5,.5],rotation:w=[1,0],starSpeed:l=.5,density:A=1,hueShift:p=140,disableAnimation:C=!1,speed:d=1,mouseInteraction:h=!0,glowIntensity:g=.3,saturation:F=0,mouseRepulsion:y=!0,repulsionStrength:T=2,twinkleIntensity:R=.3,rotationSpeed:P=.1,autoCenterRepulsion:x=0,transparent:c=!0,...I}){const S=r.useRef(null),f=r.useRef({x:.5,y:.5}),o=r.useRef({x:.5,y:.5}),v=r.useRef(0),b=r.useRef(0);return r.useEffect(()=>{if(!S.current)return;const t=S.current,M=new V({alpha:c,premultipliedAlpha:!1}),e=M.gl;c?(e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.clearColor(0,0,0,0)):e.clearColor(0,0,0,1);let s;function L(){M.setSize(t.offsetWidth*1,t.offsetHeight*1),s&&(s.uniforms.uResolution.value=new z(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height))}window.addEventListener("resize",L,!1),L();const k=new ee(e);s=new j(e,{vertex:ne,fragment:re,uniforms:{uTime:{value:0},uResolution:{value:new z(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height)},uFocal:{value:new Float32Array(m)},uRotation:{value:new Float32Array(w)},uStarSpeed:{value:l},uDensity:{value:A},uHueShift:{value:p},uSpeed:{value:d},uMouse:{value:new Float32Array([o.current.x,o.current.y])},uGlowIntensity:{value:g},uSaturation:{value:F},uMouseRepulsion:{value:y},uTwinkleIntensity:{value:R},uRotationSpeed:{value:P},uRepulsionStrength:{value:T},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:x},uTransparent:{value:c}}});const H=new K(e,{geometry:k,program:s});let _;function O(u){_=requestAnimationFrame(O),C||(s.uniforms.uTime.value=u*.001,s.uniforms.uStarSpeed.value=u*.001*l/10);const i=.05;o.current.x+=(f.current.x-o.current.x)*i,o.current.y+=(f.current.y-o.current.y)*i,b.current+=(v.current-b.current)*i,s.uniforms.uMouse.value[0]=o.current.x,s.uniforms.uMouse.value[1]=o.current.y,s.uniforms.uMouseActiveFactor.value=b.current,M.render({scene:H})}_=requestAnimationFrame(O),t.appendChild(e.canvas);function U(u){const i=t.getBoundingClientRect(),G=(u.clientX-i.left)/i.width,N=1-(u.clientY-i.top)/i.height;f.current={x:G,y:N},v.current=1}function E(){v.current=0}return h&&(t.addEventListener("mousemove",U),t.addEventListener("mouseleave",E)),()=>{var u;cancelAnimationFrame(_),window.removeEventListener("resize",L),h&&(t.removeEventListener("mousemove",U),t.removeEventListener("mouseleave",E)),t.removeChild(e.canvas),(u=e.getExtension("WEBGL_lose_context"))==null||u.loseContext()}},[m,w,l,A,p,C,d,h,g,F,y,R,P,T,x,c]),n.jsx("div",{ref:S,className:"galaxy-container",...I})}const oe=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
import './Galaxy.css';\r
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
uniform vec3 uResolution;\r
uniform vec2 uFocal;\r
uniform vec2 uRotation;\r
uniform float uStarSpeed;\r
uniform float uDensity;\r
uniform float uHueShift;\r
uniform float uSpeed;\r
uniform vec2 uMouse;\r
uniform float uGlowIntensity;\r
uniform float uSaturation;\r
uniform bool uMouseRepulsion;\r
uniform float uTwinkleIntensity;\r
uniform float uRotationSpeed;\r
uniform float uRepulsionStrength;\r
uniform float uMouseActiveFactor;\r
uniform float uAutoCenterRepulsion;\r
uniform bool uTransparent;\r
\r
varying vec2 vUv;\r
\r
#define NUM_LAYER 4.0\r
#define STAR_COLOR_CUTOFF 0.2\r
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)\r
#define PERIOD 3.0\r
\r
float Hash21(vec2 p) {\r
  p = fract(p * vec2(123.34, 456.21));\r
  p += dot(p, p + 45.32);\r
  return fract(p.x * p.y);\r
}\r
\r
float tri(float x) {\r
  return abs(fract(x) * 2.0 - 1.0);\r
}\r
\r
float tris(float x) {\r
  float t = fract(x);\r
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));\r
}\r
\r
float trisn(float x) {\r
  float t = fract(x);\r
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;\r
}\r
\r
vec3 hsv2rgb(vec3 c) {\r
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\r
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\r
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\r
}\r
\r
float Star(vec2 uv, float flare) {\r
  float d = length(uv);\r
  float m = (0.05 * uGlowIntensity) / d;\r
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\r
  m += rays * flare * uGlowIntensity;\r
  uv *= MAT45;\r
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\r
  m += rays * 0.3 * flare * uGlowIntensity;\r
  m *= smoothstep(1.0, 0.2, d);\r
  return m;\r
}\r
\r
vec3 StarLayer(vec2 uv) {\r
  vec3 col = vec3(0.0);\r
\r
  vec2 gv = fract(uv) - 0.5; \r
  vec2 id = floor(uv);\r
\r
  for (int y = -1; y <= 1; y++) {\r
    for (int x = -1; x <= 1; x++) {\r
      vec2 offset = vec2(float(x), float(y));\r
      vec2 si = id + vec2(float(x), float(y));\r
      float seed = Hash21(si);\r
      float size = fract(seed * 345.32);\r
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));\r
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;\r
\r
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;\r
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;\r
      float grn = min(red, blu) * seed;\r
      vec3 base = vec3(red, grn, blu);\r
      \r
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;\r
      hue = fract(hue + uHueShift / 360.0);\r
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;\r
      float val = max(max(base.r, base.g), base.b);\r
      base = hsv2rgb(vec3(hue, sat, val));\r
\r
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;\r
\r
      float star = Star(gv - offset - pad, flareSize);\r
      vec3 color = base;\r
\r
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;\r
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);\r
      star *= twinkle;\r
      \r
      col += star * size * color;\r
    }\r
  }\r
\r
  return col;\r
}\r
\r
void main() {\r
  vec2 focalPx = uFocal * uResolution.xy;\r
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;\r
\r
  vec2 mouseNorm = uMouse - vec2(0.5);\r
  \r
  if (uAutoCenterRepulsion > 0.0) {\r
    vec2 centerUV = vec2(0.0, 0.0);\r
    float centerDist = length(uv - centerUV);\r
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));\r
    uv += repulsion * 0.05;\r
  } else if (uMouseRepulsion) {\r
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;\r
    float mouseDist = length(uv - mousePosUV);\r
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));\r
    uv += repulsion * 0.05 * uMouseActiveFactor;\r
  } else {\r
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;\r
    uv += mouseOffset;\r
  }\r
\r
  float autoRotAngle = uTime * uRotationSpeed;\r
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));\r
  uv = autoRot * uv;\r
\r
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;\r
\r
  vec3 col = vec3(0.0);\r
\r
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {\r
    float depth = fract(i + uStarSpeed * uSpeed);\r
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);\r
    float fade = depth * smoothstep(1.0, 0.9, depth);\r
    col += StarLayer(uv * scale + i * 453.32) * fade;\r
  }\r
\r
  if (uTransparent) {\r
    float alpha = length(col);\r
    alpha = smoothstep(0.0, 0.3, alpha);\r
    alpha = min(alpha, 1.0);\r
    gl_FragColor = vec4(col, alpha);\r
  } else {\r
    gl_FragColor = vec4(col, 1.0);\r
  }\r
}\r
\`;\r
\r
export default function Galaxy({\r
  focal = [0.5, 0.5],\r
  rotation = [1.0, 0.0],\r
  starSpeed = 0.5,\r
  density = 1,\r
  hueShift = 140,\r
  disableAnimation = false,\r
  speed = 1.0,\r
  mouseInteraction = true,\r
  glowIntensity = 0.3,\r
  saturation = 0.0,\r
  mouseRepulsion = true,\r
  repulsionStrength = 2,\r
  twinkleIntensity = 0.3,\r
  rotationSpeed = 0.1,\r
  autoCenterRepulsion = 0,\r
  transparent = true,\r
  ...rest\r
}) {\r
  const ctnDom = useRef(null);\r
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });\r
  const targetMouseActive = useRef(0.0);\r
  const smoothMouseActive = useRef(0.0);\r
\r
  useEffect(() => {\r
    if (!ctnDom.current) return;\r
    const ctn = ctnDom.current;\r
    const renderer = new Renderer({\r
      alpha: transparent,\r
      premultipliedAlpha: false\r
    });\r
    const gl = renderer.gl;\r
\r
    if (transparent) {\r
      gl.enable(gl.BLEND);\r
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
      gl.clearColor(0, 0, 0, 0);\r
    } else {\r
      gl.clearColor(0, 0, 0, 1);\r
    }\r
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
        uResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uFocal: { value: new Float32Array(focal) },\r
        uRotation: { value: new Float32Array(rotation) },\r
        uStarSpeed: { value: starSpeed },\r
        uDensity: { value: density },\r
        uHueShift: { value: hueShift },\r
        uSpeed: { value: speed },\r
        uMouse: {\r
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y])\r
        },\r
        uGlowIntensity: { value: glowIntensity },\r
        uSaturation: { value: saturation },\r
        uMouseRepulsion: { value: mouseRepulsion },\r
        uTwinkleIntensity: { value: twinkleIntensity },\r
        uRotationSpeed: { value: rotationSpeed },\r
        uRepulsionStrength: { value: repulsionStrength },\r
        uMouseActiveFactor: { value: 0.0 },\r
        uAutoCenterRepulsion: { value: autoCenterRepulsion },\r
        uTransparent: { value: transparent }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animateId;\r
\r
    function update(t) {\r
      animateId = requestAnimationFrame(update);\r
      if (!disableAnimation) {\r
        program.uniforms.uTime.value = t * 0.001;\r
        program.uniforms.uStarSpeed.value = (t * 0.001 * starSpeed) / 10.0;\r
      }\r
\r
      const lerpFactor = 0.05;\r
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;\r
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;\r
\r
      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;\r
\r
      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;\r
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;\r
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;\r
\r
      renderer.render({ scene: mesh });\r
    }\r
    animateId = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e) {\r
      const rect = ctn.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMousePos.current = { x, y };\r
      targetMouseActive.current = 1.0;\r
    }\r
\r
    function handleMouseLeave() {\r
      targetMouseActive.current = 0.0;\r
    }\r
\r
    if (mouseInteraction) {\r
      ctn.addEventListener('mousemove', handleMouseMove);\r
      ctn.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (mouseInteraction) {\r
        ctn.removeEventListener('mousemove', handleMouseMove);\r
        ctn.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    focal,\r
    rotation,\r
    starSpeed,\r
    density,\r
    hueShift,\r
    disableAnimation,\r
    speed,\r
    mouseInteraction,\r
    glowIntensity,\r
    saturation,\r
    mouseRepulsion,\r
    twinkleIntensity,\r
    rotationSpeed,\r
    repulsionStrength,\r
    autoCenterRepulsion,\r
    transparent\r
  ]);\r
\r
  return <div ref={ctnDom} className="galaxy-container" {...rest} />;\r
}\r
`,ae=`.galaxy-container {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
}\r
`,se=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
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
uniform vec3 uResolution;\r
uniform vec2 uFocal;\r
uniform vec2 uRotation;\r
uniform float uStarSpeed;\r
uniform float uDensity;\r
uniform float uHueShift;\r
uniform float uSpeed;\r
uniform vec2 uMouse;\r
uniform float uGlowIntensity;\r
uniform float uSaturation;\r
uniform bool uMouseRepulsion;\r
uniform float uTwinkleIntensity;\r
uniform float uRotationSpeed;\r
uniform float uRepulsionStrength;\r
uniform float uMouseActiveFactor;\r
uniform float uAutoCenterRepulsion;\r
uniform bool uTransparent;\r
\r
varying vec2 vUv;\r
\r
#define NUM_LAYER 4.0\r
#define STAR_COLOR_CUTOFF 0.2\r
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)\r
#define PERIOD 3.0\r
\r
float Hash21(vec2 p) {\r
  p = fract(p * vec2(123.34, 456.21));\r
  p += dot(p, p + 45.32);\r
  return fract(p.x * p.y);\r
}\r
\r
float tri(float x) {\r
  return abs(fract(x) * 2.0 - 1.0);\r
}\r
\r
float tris(float x) {\r
  float t = fract(x);\r
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));\r
}\r
\r
float trisn(float x) {\r
  float t = fract(x);\r
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;\r
}\r
\r
vec3 hsv2rgb(vec3 c) {\r
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\r
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\r
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\r
}\r
\r
float Star(vec2 uv, float flare) {\r
  float d = length(uv);\r
  float m = (0.05 * uGlowIntensity) / d;\r
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\r
  m += rays * flare * uGlowIntensity;\r
  uv *= MAT45;\r
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\r
  m += rays * 0.3 * flare * uGlowIntensity;\r
  m *= smoothstep(1.0, 0.2, d);\r
  return m;\r
}\r
\r
vec3 StarLayer(vec2 uv) {\r
  vec3 col = vec3(0.0);\r
\r
  vec2 gv = fract(uv) - 0.5; \r
  vec2 id = floor(uv);\r
\r
  for (int y = -1; y <= 1; y++) {\r
    for (int x = -1; x <= 1; x++) {\r
      vec2 offset = vec2(float(x), float(y));\r
      vec2 si = id + vec2(float(x), float(y));\r
      float seed = Hash21(si);\r
      float size = fract(seed * 345.32);\r
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));\r
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;\r
\r
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;\r
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;\r
      float grn = min(red, blu) * seed;\r
      vec3 base = vec3(red, grn, blu);\r
      \r
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;\r
      hue = fract(hue + uHueShift / 360.0);\r
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;\r
      float val = max(max(base.r, base.g), base.b);\r
      base = hsv2rgb(vec3(hue, sat, val));\r
\r
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;\r
\r
      float star = Star(gv - offset - pad, flareSize);\r
      vec3 color = base;\r
\r
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;\r
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);\r
      star *= twinkle;\r
      \r
      col += star * size * color;\r
    }\r
  }\r
\r
  return col;\r
}\r
\r
void main() {\r
  vec2 focalPx = uFocal * uResolution.xy;\r
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;\r
\r
  vec2 mouseNorm = uMouse - vec2(0.5);\r
  \r
  if (uAutoCenterRepulsion > 0.0) {\r
    vec2 centerUV = vec2(0.0, 0.0);\r
    float centerDist = length(uv - centerUV);\r
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));\r
    uv += repulsion * 0.05;\r
  } else if (uMouseRepulsion) {\r
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;\r
    float mouseDist = length(uv - mousePosUV);\r
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));\r
    uv += repulsion * 0.05 * uMouseActiveFactor;\r
  } else {\r
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;\r
    uv += mouseOffset;\r
  }\r
\r
  float autoRotAngle = uTime * uRotationSpeed;\r
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));\r
  uv = autoRot * uv;\r
\r
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;\r
\r
  vec3 col = vec3(0.0);\r
\r
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {\r
    float depth = fract(i + uStarSpeed * uSpeed);\r
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);\r
    float fade = depth * smoothstep(1.0, 0.9, depth);\r
    col += StarLayer(uv * scale + i * 453.32) * fade;\r
  }\r
\r
  if (uTransparent) {\r
    float alpha = length(col);\r
    alpha = smoothstep(0.0, 0.3, alpha);\r
    alpha = min(alpha, 1.0);\r
    gl_FragColor = vec4(col, alpha);\r
  } else {\r
    gl_FragColor = vec4(col, 1.0);\r
  }\r
}\r
\`;\r
\r
export default function Galaxy({\r
  focal = [0.5, 0.5],\r
  rotation = [1.0, 0.0],\r
  starSpeed = 0.5,\r
  density = 1,\r
  hueShift = 140,\r
  disableAnimation = false,\r
  speed = 1.0,\r
  mouseInteraction = true,\r
  glowIntensity = 0.3,\r
  saturation = 0.0,\r
  mouseRepulsion = true,\r
  repulsionStrength = 2,\r
  twinkleIntensity = 0.3,\r
  rotationSpeed = 0.1,\r
  autoCenterRepulsion = 0,\r
  transparent = true,\r
  ...rest\r
}) {\r
  const ctnDom = useRef(null);\r
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });\r
  const targetMouseActive = useRef(0.0);\r
  const smoothMouseActive = useRef(0.0);\r
\r
  useEffect(() => {\r
    if (!ctnDom.current) return;\r
    const ctn = ctnDom.current;\r
    const renderer = new Renderer({\r
      alpha: transparent,\r
      premultipliedAlpha: false\r
    });\r
    const gl = renderer.gl;\r
\r
    if (transparent) {\r
      gl.enable(gl.BLEND);\r
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
      gl.clearColor(0, 0, 0, 0);\r
    } else {\r
      gl.clearColor(0, 0, 0, 1);\r
    }\r
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
        uResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uFocal: { value: new Float32Array(focal) },\r
        uRotation: { value: new Float32Array(rotation) },\r
        uStarSpeed: { value: starSpeed },\r
        uDensity: { value: density },\r
        uHueShift: { value: hueShift },\r
        uSpeed: { value: speed },\r
        uMouse: {\r
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y])\r
        },\r
        uGlowIntensity: { value: glowIntensity },\r
        uSaturation: { value: saturation },\r
        uMouseRepulsion: { value: mouseRepulsion },\r
        uTwinkleIntensity: { value: twinkleIntensity },\r
        uRotationSpeed: { value: rotationSpeed },\r
        uRepulsionStrength: { value: repulsionStrength },\r
        uMouseActiveFactor: { value: 0.0 },\r
        uAutoCenterRepulsion: { value: autoCenterRepulsion },\r
        uTransparent: { value: transparent }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animateId;\r
\r
    function update(t) {\r
      animateId = requestAnimationFrame(update);\r
      if (!disableAnimation) {\r
        program.uniforms.uTime.value = t * 0.001;\r
        program.uniforms.uStarSpeed.value = (t * 0.001 * starSpeed) / 10.0;\r
      }\r
\r
      const lerpFactor = 0.05;\r
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;\r
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;\r
\r
      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;\r
\r
      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;\r
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;\r
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;\r
\r
      renderer.render({ scene: mesh });\r
    }\r
    animateId = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e) {\r
      const rect = ctn.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMousePos.current = { x, y };\r
      targetMouseActive.current = 1.0;\r
    }\r
\r
    function handleMouseLeave() {\r
      targetMouseActive.current = 0.0;\r
    }\r
\r
    if (mouseInteraction) {\r
      ctn.addEventListener('mousemove', handleMouseMove);\r
      ctn.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (mouseInteraction) {\r
        ctn.removeEventListener('mousemove', handleMouseMove);\r
        ctn.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    focal,\r
    rotation,\r
    starSpeed,\r
    density,\r
    hueShift,\r
    disableAnimation,\r
    speed,\r
    mouseInteraction,\r
    glowIntensity,\r
    saturation,\r
    mouseRepulsion,\r
    twinkleIntensity,\r
    rotationSpeed,\r
    repulsionStrength,\r
    autoCenterRepulsion,\r
    transparent\r
  ]);\r
\r
  return <div ref={ctnDom} className="w-full h-full relative" {...rest} />;\r
}\r
`,ue=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
import './Galaxy.css';\r
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
uniform vec3 uResolution;\r
uniform vec2 uFocal;\r
uniform vec2 uRotation;\r
uniform float uStarSpeed;\r
uniform float uDensity;\r
uniform float uHueShift;\r
uniform float uSpeed;\r
uniform vec2 uMouse;\r
uniform float uGlowIntensity;\r
uniform float uSaturation;\r
uniform bool uMouseRepulsion;\r
uniform float uTwinkleIntensity;\r
uniform float uRotationSpeed;\r
uniform float uRepulsionStrength;\r
uniform float uMouseActiveFactor;\r
uniform float uAutoCenterRepulsion;\r
uniform bool uTransparent;\r
\r
varying vec2 vUv;\r
\r
#define NUM_LAYER 4.0\r
#define STAR_COLOR_CUTOFF 0.2\r
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)\r
#define PERIOD 3.0\r
\r
float Hash21(vec2 p) {\r
  p = fract(p * vec2(123.34, 456.21));\r
  p += dot(p, p + 45.32);\r
  return fract(p.x * p.y);\r
}\r
\r
float tri(float x) {\r
  return abs(fract(x) * 2.0 - 1.0);\r
}\r
\r
float tris(float x) {\r
  float t = fract(x);\r
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));\r
}\r
\r
float trisn(float x) {\r
  float t = fract(x);\r
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;\r
}\r
\r
vec3 hsv2rgb(vec3 c) {\r
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\r
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\r
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\r
}\r
\r
float Star(vec2 uv, float flare) {\r
  float d = length(uv);\r
  float m = (0.05 * uGlowIntensity) / d;\r
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\r
  m += rays * flare * uGlowIntensity;\r
  uv *= MAT45;\r
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\r
  m += rays * 0.3 * flare * uGlowIntensity;\r
  m *= smoothstep(1.0, 0.2, d);\r
  return m;\r
}\r
\r
vec3 StarLayer(vec2 uv) {\r
  vec3 col = vec3(0.0);\r
\r
  vec2 gv = fract(uv) - 0.5; \r
  vec2 id = floor(uv);\r
\r
  for (int y = -1; y <= 1; y++) {\r
    for (int x = -1; x <= 1; x++) {\r
      vec2 offset = vec2(float(x), float(y));\r
      vec2 si = id + vec2(float(x), float(y));\r
      float seed = Hash21(si);\r
      float size = fract(seed * 345.32);\r
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));\r
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;\r
\r
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;\r
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;\r
      float grn = min(red, blu) * seed;\r
      vec3 base = vec3(red, grn, blu);\r
      \r
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;\r
      hue = fract(hue + uHueShift / 360.0);\r
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;\r
      float val = max(max(base.r, base.g), base.b);\r
      base = hsv2rgb(vec3(hue, sat, val));\r
\r
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;\r
\r
      float star = Star(gv - offset - pad, flareSize);\r
      vec3 color = base;\r
\r
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;\r
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);\r
      star *= twinkle;\r
      \r
      col += star * size * color;\r
    }\r
  }\r
\r
  return col;\r
}\r
\r
void main() {\r
  vec2 focalPx = uFocal * uResolution.xy;\r
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;\r
\r
  vec2 mouseNorm = uMouse - vec2(0.5);\r
  \r
  if (uAutoCenterRepulsion > 0.0) {\r
    vec2 centerUV = vec2(0.0, 0.0);\r
    float centerDist = length(uv - centerUV);\r
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));\r
    uv += repulsion * 0.05;\r
  } else if (uMouseRepulsion) {\r
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;\r
    float mouseDist = length(uv - mousePosUV);\r
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));\r
    uv += repulsion * 0.05 * uMouseActiveFactor;\r
  } else {\r
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;\r
    uv += mouseOffset;\r
  }\r
\r
  float autoRotAngle = uTime * uRotationSpeed;\r
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));\r
  uv = autoRot * uv;\r
\r
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;\r
\r
  vec3 col = vec3(0.0);\r
\r
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {\r
    float depth = fract(i + uStarSpeed * uSpeed);\r
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);\r
    float fade = depth * smoothstep(1.0, 0.9, depth);\r
    col += StarLayer(uv * scale + i * 453.32) * fade;\r
  }\r
\r
  if (uTransparent) {\r
    float alpha = length(col);\r
    alpha = smoothstep(0.0, 0.3, alpha);\r
    alpha = min(alpha, 1.0);\r
    gl_FragColor = vec4(col, alpha);\r
  } else {\r
    gl_FragColor = vec4(col, 1.0);\r
  }\r
}\r
\`;\r
\r
interface GalaxyProps {\r
  focal?: [number, number];\r
  rotation?: [number, number];\r
  starSpeed?: number;\r
  density?: number;\r
  hueShift?: number;\r
  disableAnimation?: boolean;\r
  speed?: number;\r
  mouseInteraction?: boolean;\r
  glowIntensity?: number;\r
  saturation?: number;\r
  mouseRepulsion?: boolean;\r
  twinkleIntensity?: number;\r
  rotationSpeed?: number;\r
  repulsionStrength?: number;\r
  autoCenterRepulsion?: number;\r
  transparent?: boolean;\r
}\r
\r
export default function Galaxy({\r
  focal = [0.5, 0.5],\r
  rotation = [1.0, 0.0],\r
  starSpeed = 0.5,\r
  density = 1,\r
  hueShift = 140,\r
  disableAnimation = false,\r
  speed = 1.0,\r
  mouseInteraction = true,\r
  glowIntensity = 0.3,\r
  saturation = 0.0,\r
  mouseRepulsion = true,\r
  repulsionStrength = 2,\r
  twinkleIntensity = 0.3,\r
  rotationSpeed = 0.1,\r
  autoCenterRepulsion = 0,\r
  transparent = true,\r
  ...rest\r
}: GalaxyProps) {\r
  const ctnDom = useRef<HTMLDivElement>(null);\r
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });\r
  const targetMouseActive = useRef(0.0);\r
  const smoothMouseActive = useRef(0.0);\r
\r
  useEffect(() => {\r
    if (!ctnDom.current) return;\r
    const ctn = ctnDom.current;\r
    const renderer = new Renderer({\r
      alpha: transparent,\r
      premultipliedAlpha: false\r
    });\r
    const gl = renderer.gl;\r
\r
    if (transparent) {\r
      gl.enable(gl.BLEND);\r
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
      gl.clearColor(0, 0, 0, 0);\r
    } else {\r
      gl.clearColor(0, 0, 0, 1);\r
    }\r
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
        uResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uFocal: { value: new Float32Array(focal) },\r
        uRotation: { value: new Float32Array(rotation) },\r
        uStarSpeed: { value: starSpeed },\r
        uDensity: { value: density },\r
        uHueShift: { value: hueShift },\r
        uSpeed: { value: speed },\r
        uMouse: {\r
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y])\r
        },\r
        uGlowIntensity: { value: glowIntensity },\r
        uSaturation: { value: saturation },\r
        uMouseRepulsion: { value: mouseRepulsion },\r
        uTwinkleIntensity: { value: twinkleIntensity },\r
        uRotationSpeed: { value: rotationSpeed },\r
        uRepulsionStrength: { value: repulsionStrength },\r
        uMouseActiveFactor: { value: 0.0 },\r
        uAutoCenterRepulsion: { value: autoCenterRepulsion },\r
        uTransparent: { value: transparent }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animateId: number;\r
\r
    function update(t: number) {\r
      animateId = requestAnimationFrame(update);\r
      if (!disableAnimation) {\r
        program.uniforms.uTime.value = t * 0.001;\r
        program.uniforms.uStarSpeed.value = (t * 0.001 * starSpeed) / 10.0;\r
      }\r
\r
      const lerpFactor = 0.05;\r
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;\r
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;\r
\r
      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;\r
\r
      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;\r
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;\r
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;\r
\r
      renderer.render({ scene: mesh });\r
    }\r
    animateId = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e: MouseEvent) {\r
      const rect = ctn.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMousePos.current = { x, y };\r
      targetMouseActive.current = 1.0;\r
    }\r
\r
    function handleMouseLeave() {\r
      targetMouseActive.current = 0.0;\r
    }\r
\r
    if (mouseInteraction) {\r
      ctn.addEventListener('mousemove', handleMouseMove);\r
      ctn.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (mouseInteraction) {\r
        ctn.removeEventListener('mousemove', handleMouseMove);\r
        ctn.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    focal,\r
    rotation,\r
    starSpeed,\r
    density,\r
    hueShift,\r
    disableAnimation,\r
    speed,\r
    mouseInteraction,\r
    glowIntensity,\r
    saturation,\r
    mouseRepulsion,\r
    twinkleIntensity,\r
    rotationSpeed,\r
    repulsionStrength,\r
    autoCenterRepulsion,\r
    transparent\r
  ]);\r
\r
  return <div ref={ctnDom} className="galaxy-container" {...rest} />;\r
}\r
`,ie=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
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
uniform vec3 uResolution;\r
uniform vec2 uFocal;\r
uniform vec2 uRotation;\r
uniform float uStarSpeed;\r
uniform float uDensity;\r
uniform float uHueShift;\r
uniform float uSpeed;\r
uniform vec2 uMouse;\r
uniform float uGlowIntensity;\r
uniform float uSaturation;\r
uniform bool uMouseRepulsion;\r
uniform float uTwinkleIntensity;\r
uniform float uRotationSpeed;\r
uniform float uRepulsionStrength;\r
uniform float uMouseActiveFactor;\r
uniform float uAutoCenterRepulsion;\r
uniform bool uTransparent;\r
\r
varying vec2 vUv;\r
\r
#define NUM_LAYER 4.0\r
#define STAR_COLOR_CUTOFF 0.2\r
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)\r
#define PERIOD 3.0\r
\r
float Hash21(vec2 p) {\r
  p = fract(p * vec2(123.34, 456.21));\r
  p += dot(p, p + 45.32);\r
  return fract(p.x * p.y);\r
}\r
\r
float tri(float x) {\r
  return abs(fract(x) * 2.0 - 1.0);\r
}\r
\r
float tris(float x) {\r
  float t = fract(x);\r
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));\r
}\r
\r
float trisn(float x) {\r
  float t = fract(x);\r
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;\r
}\r
\r
vec3 hsv2rgb(vec3 c) {\r
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\r
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\r
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\r
}\r
\r
float Star(vec2 uv, float flare) {\r
  float d = length(uv);\r
  float m = (0.05 * uGlowIntensity) / d;\r
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\r
  m += rays * flare * uGlowIntensity;\r
  uv *= MAT45;\r
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\r
  m += rays * 0.3 * flare * uGlowIntensity;\r
  m *= smoothstep(1.0, 0.2, d);\r
  return m;\r
}\r
\r
vec3 StarLayer(vec2 uv) {\r
  vec3 col = vec3(0.0);\r
\r
  vec2 gv = fract(uv) - 0.5; \r
  vec2 id = floor(uv);\r
\r
  for (int y = -1; y <= 1; y++) {\r
    for (int x = -1; x <= 1; x++) {\r
      vec2 offset = vec2(float(x), float(y));\r
      vec2 si = id + vec2(float(x), float(y));\r
      float seed = Hash21(si);\r
      float size = fract(seed * 345.32);\r
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));\r
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;\r
\r
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;\r
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;\r
      float grn = min(red, blu) * seed;\r
      vec3 base = vec3(red, grn, blu);\r
      \r
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;\r
      hue = fract(hue + uHueShift / 360.0);\r
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;\r
      float val = max(max(base.r, base.g), base.b);\r
      base = hsv2rgb(vec3(hue, sat, val));\r
\r
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;\r
\r
      float star = Star(gv - offset - pad, flareSize);\r
      vec3 color = base;\r
\r
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;\r
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);\r
      star *= twinkle;\r
      \r
      col += star * size * color;\r
    }\r
  }\r
\r
  return col;\r
}\r
\r
void main() {\r
  vec2 focalPx = uFocal * uResolution.xy;\r
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;\r
\r
  vec2 mouseNorm = uMouse - vec2(0.5);\r
  \r
  if (uAutoCenterRepulsion > 0.0) {\r
    vec2 centerUV = vec2(0.0, 0.0);\r
    float centerDist = length(uv - centerUV);\r
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));\r
    uv += repulsion * 0.05;\r
  } else if (uMouseRepulsion) {\r
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;\r
    float mouseDist = length(uv - mousePosUV);\r
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));\r
    uv += repulsion * 0.05 * uMouseActiveFactor;\r
  } else {\r
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;\r
    uv += mouseOffset;\r
  }\r
\r
  float autoRotAngle = uTime * uRotationSpeed;\r
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));\r
  uv = autoRot * uv;\r
\r
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;\r
\r
  vec3 col = vec3(0.0);\r
\r
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {\r
    float depth = fract(i + uStarSpeed * uSpeed);\r
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);\r
    float fade = depth * smoothstep(1.0, 0.9, depth);\r
    col += StarLayer(uv * scale + i * 453.32) * fade;\r
  }\r
\r
  if (uTransparent) {\r
    float alpha = length(col);\r
    alpha = smoothstep(0.0, 0.3, alpha);\r
    alpha = min(alpha, 1.0);\r
    gl_FragColor = vec4(col, alpha);\r
  } else {\r
    gl_FragColor = vec4(col, 1.0);\r
  }\r
}\r
\`;\r
\r
interface GalaxyProps {\r
  focal?: [number, number];\r
  rotation?: [number, number];\r
  starSpeed?: number;\r
  density?: number;\r
  hueShift?: number;\r
  disableAnimation?: boolean;\r
  speed?: number;\r
  mouseInteraction?: boolean;\r
  glowIntensity?: number;\r
  saturation?: number;\r
  mouseRepulsion?: boolean;\r
  twinkleIntensity?: number;\r
  rotationSpeed?: number;\r
  repulsionStrength?: number;\r
  autoCenterRepulsion?: number;\r
  transparent?: boolean;\r
}\r
\r
export default function Galaxy({\r
  focal = [0.5, 0.5],\r
  rotation = [1.0, 0.0],\r
  starSpeed = 0.5,\r
  density = 1,\r
  hueShift = 140,\r
  disableAnimation = false,\r
  speed = 1.0,\r
  mouseInteraction = true,\r
  glowIntensity = 0.3,\r
  saturation = 0.0,\r
  mouseRepulsion = true,\r
  repulsionStrength = 2,\r
  twinkleIntensity = 0.3,\r
  rotationSpeed = 0.1,\r
  autoCenterRepulsion = 0,\r
  transparent = true,\r
  ...rest\r
}: GalaxyProps) {\r
  const ctnDom = useRef<HTMLDivElement>(null);\r
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });\r
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });\r
  const targetMouseActive = useRef(0.0);\r
  const smoothMouseActive = useRef(0.0);\r
\r
  useEffect(() => {\r
    if (!ctnDom.current) return;\r
    const ctn = ctnDom.current;\r
    const renderer = new Renderer({\r
      alpha: transparent,\r
      premultipliedAlpha: false\r
    });\r
    const gl = renderer.gl;\r
\r
    if (transparent) {\r
      gl.enable(gl.BLEND);\r
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
      gl.clearColor(0, 0, 0, 0);\r
    } else {\r
      gl.clearColor(0, 0, 0, 1);\r
    }\r
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
        uResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uFocal: { value: new Float32Array(focal) },\r
        uRotation: { value: new Float32Array(rotation) },\r
        uStarSpeed: { value: starSpeed },\r
        uDensity: { value: density },\r
        uHueShift: { value: hueShift },\r
        uSpeed: { value: speed },\r
        uMouse: {\r
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y])\r
        },\r
        uGlowIntensity: { value: glowIntensity },\r
        uSaturation: { value: saturation },\r
        uMouseRepulsion: { value: mouseRepulsion },\r
        uTwinkleIntensity: { value: twinkleIntensity },\r
        uRotationSpeed: { value: rotationSpeed },\r
        uRepulsionStrength: { value: repulsionStrength },\r
        uMouseActiveFactor: { value: 0.0 },\r
        uAutoCenterRepulsion: { value: autoCenterRepulsion },\r
        uTransparent: { value: transparent }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    let animateId: number;\r
\r
    function update(t: number) {\r
      animateId = requestAnimationFrame(update);\r
      if (!disableAnimation) {\r
        program.uniforms.uTime.value = t * 0.001;\r
        program.uniforms.uStarSpeed.value = (t * 0.001 * starSpeed) / 10.0;\r
      }\r
\r
      const lerpFactor = 0.05;\r
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;\r
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;\r
\r
      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;\r
\r
      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;\r
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;\r
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;\r
\r
      renderer.render({ scene: mesh });\r
    }\r
    animateId = requestAnimationFrame(update);\r
    ctn.appendChild(gl.canvas);\r
\r
    function handleMouseMove(e: MouseEvent) {\r
      const rect = ctn.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMousePos.current = { x, y };\r
      targetMouseActive.current = 1.0;\r
    }\r
\r
    function handleMouseLeave() {\r
      targetMouseActive.current = 0.0;\r
    }\r
\r
    if (mouseInteraction) {\r
      ctn.addEventListener('mousemove', handleMouseMove);\r
      ctn.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (mouseInteraction) {\r
        ctn.removeEventListener('mousemove', handleMouseMove);\r
        ctn.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      ctn.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [\r
    focal,\r
    rotation,\r
    starSpeed,\r
    density,\r
    hueShift,\r
    disableAnimation,\r
    speed,\r
    mouseInteraction,\r
    glowIntensity,\r
    saturation,\r
    mouseRepulsion,\r
    twinkleIntensity,\r
    rotationSpeed,\r
    repulsionStrength,\r
    autoCenterRepulsion,\r
    transparent\r
  ]);\r
\r
  return <div ref={ctnDom} className="w-full h-full relative" {...rest} />;\r
}\r
`,le={dependencies:"ogl",usage:`import Galaxy from './Galaxy';

// Basic usage
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Galaxy />
</div>

// With custom prop values
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Galaxy 
    mouseRepulsion={true}
    mouseInteraction={true}
    density={1.5}
    glowIntensity={0.5}
    saturation={0.8}
    hueShift={240}
  />
</div>`,code:oe,css:ae,tailwind:se,tsCode:ue,tsTailwind:ie},xe=()=>{const[m,w]=r.useState(1),[l,A]=r.useState(.3),[p,C]=r.useState(0),[d,h]=r.useState(140),[g,F]=r.useState(.3),[y,T]=r.useState(.1),[R,P]=r.useState(2),[x,c]=r.useState(0),[I,S]=r.useState(.5),[f,o]=r.useState(1),[v,b]=r.useState(!0),[t,M]=r.useState(!0),e=[{name:"focal",type:"[number, number]",default:"[0.5, 0.5]",description:"Sets the focal point of the galaxy effect as [x, y] coordinates from 0 to 1"},{name:"rotation",type:"[number, number]",default:"[1.0, 0.0]",description:"Controls the rotation matrix of the galaxy as [x, y] rotation values"},{name:"starSpeed",type:"number",default:"0.5",description:"Controls the speed of star movement and animation"},{name:"density",type:"number",default:"1",description:"Controls the density of stars in the galaxy"},{name:"hueShift",type:"number",default:"140",description:"Shifts the hue of all stars by the specified degrees (0-360)"},{name:"disableAnimation",type:"boolean",default:"false",description:"When true, stops all time-based animations"},{name:"speed",type:"number",default:"1.0",description:"Global speed multiplier for all animations"},{name:"mouseInteraction",type:"boolean",default:"true",description:"Enables or disables mouse interaction with the galaxy"},{name:"glowIntensity",type:"number",default:"0.3",description:"Controls the intensity of the star glow effect"},{name:"saturation",type:"number",default:"0.0",description:"Controls color saturation of stars (0 = grayscale, 1 = full color)"},{name:"mouseRepulsion",type:"boolean",default:"true",description:"When true, stars are repelled by the mouse cursor"},{name:"twinkleIntensity",type:"number",default:"0.3",description:"Controls how much stars twinkle (0 = no twinkle, 1 = maximum twinkle)"},{name:"rotationSpeed",type:"number",default:"0.1",description:"Speed of automatic galaxy rotation"},{name:"repulsionStrength",type:"number",default:"2",description:"Strength of mouse repulsion effect when mouseRepulsion is enabled"},{name:"autoCenterRepulsion",type:"number",default:"0",description:"Creates repulsion from center of canvas. Overrides mouse repulsion when > 0"},{name:"transparent",type:"boolean",default:"true",description:"Makes the black background transparent, showing only stars"}];return n.jsxs(Y,{children:[n.jsxs(W,{children:[n.jsxs(B,{position:"relative",className:"demo-container",h:600,overflow:"hidden",p:0,children:[n.jsx(te,{density:m,glowIntensity:l,saturation:p,hueShift:d,twinkleIntensity:g,rotationSpeed:y,repulsionStrength:R,autoCenterRepulsion:x,starSpeed:I,speed:f,mouseRepulsion:v,mouseInteraction:t}),n.jsx(Z,{headline:"Components you shall have, young padawan.",pillText:"New Background"})]}),n.jsxs(Q,{children:[n.jsx(D,{title:"Mouse Interaction",isChecked:t,onChange:M}),n.jsx(D,{title:"Mouse Repulsion",isChecked:v,onChange:b}),n.jsx(a,{title:"Density",min:.1,max:3,step:.1,value:m,onChange:w,width:200}),n.jsx(a,{title:"Glow Intensity",min:0,max:1,step:.1,value:l,onChange:A,width:200}),n.jsx(a,{title:"Saturation",min:0,max:1,step:.1,value:p,onChange:C,width:200}),n.jsx(a,{title:"Hue Shift",min:0,max:360,step:10,value:d,valueUnit:"°",onChange:h,width:200}),n.jsx(a,{title:"Twinkle Intensity",min:0,max:1,step:.1,value:g,onChange:F,width:200}),n.jsx(a,{title:"Rotation Speed",min:0,max:.5,step:.05,value:y,onChange:T,width:200}),n.jsx(a,{title:"Repulsion Strength",min:0,max:10,step:.5,value:R,onChange:P,width:200}),n.jsx(a,{title:"Auto Center Repulsion",min:0,max:20,step:1,value:x,onChange:c,width:200}),n.jsx(a,{title:"Star Speed",min:.1,max:2,step:.1,value:I,onChange:S,width:200}),n.jsx(a,{title:"Animation Speed",min:.1,max:3,step:.1,value:f,onChange:o,width:200})]}),n.jsx(q,{data:e}),n.jsx($,{dependencyList:["ogl"]})]}),n.jsx(X,{children:n.jsx(J,{codeObject:le})})]})};export{xe as default};
