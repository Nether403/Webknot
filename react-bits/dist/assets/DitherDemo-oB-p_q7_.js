import{r as s,j as n,e as Z,B as ee,T as re,F as I}from"./index-wsKSLPNH.js";import{T as ne,P as oe,a as te,C as ie,b as ae}from"./PropTable-C4uPWs8h.js";import{C as le}from"./Customize-1m_ZNqR9.js";import{P as V}from"./PreviewSwitch-DqnF708j.js";import{P as C}from"./PreviewSlider-m1G_aiYP.js";import{D as se}from"./Dependencies-BHoMfJUj.js";import{B as ue}from"./BackgroundContent-CqU7Wlm2.js";import{a as j,u as L,e as ce,C as fe}from"./react-three-fiber.esm-Dkk-fK7P.js";import{V as H,H as ve,w as me,z as g,C as pe}from"./three.module-0PRdiASR.js";import{E as de,R as we,N as xe,D as ge,c as D,a as he,P as ye}from"./index-cCvir2e6.js";import"./index-Bpz4cGEA.js";function U(r,e,o){return e in r?Object.defineProperty(r,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[e]=o,r}new H;new H;function $(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}var x=function r(e,o,l){var u=this;$(this,r),U(this,"dot2",function(f,v){return u.x*f+u.y*v}),U(this,"dot3",function(f,v,m){return u.x*f+u.y*v+u.z*m}),this.x=e,this.y=o,this.z=l},Ee=[new x(1,1,0),new x(-1,1,0),new x(1,-1,0),new x(-1,-1,0),new x(1,0,1),new x(-1,0,1),new x(1,0,-1),new x(-1,0,-1),new x(0,1,1),new x(0,-1,1),new x(0,1,-1),new x(0,-1,-1)],B=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],k=new Array(512),G=new Array(512),Re=function(e){e>0&&e<1&&(e*=65536),e=Math.floor(e),e<256&&(e|=e<<8);for(var o=0;o<256;o++){var l;o&1?l=B[o]^e&255:l=B[o]^e>>8&255,k[o]=k[o+256]=l,G[o]=G[o+256]=Ee[l%12]}};Re(0);function be(r){if(typeof r=="number")r=Math.abs(r);else if(typeof r=="string"){var e=r;r=0;for(var o=0;o<e.length;o++)r=(r+(o+1)*(e.charCodeAt(o)%96))%2147483647}return r===0&&(r=311),r}function O(r){var e=be(r);return function(){var o=e*48271%2147483647;return e=o,o/2147483647}}var Se=function r(e){var o=this;$(this,r),U(this,"seed",0),U(this,"init",function(l){o.seed=l,o.value=O(l)}),U(this,"value",O(this.seed)),this.init(e)};new Se(Math.random());const Ce=s.createContext(null),X=r=>(r.getAttributes()&2)===2,Pe=s.memo(s.forwardRef(({children:r,camera:e,scene:o,resolutionScale:l,enabled:u=!0,renderPriority:f=1,autoClear:v=!0,depthBuffer:m,enableNormalPass:p,stencilBuffer:P,multisampling:S=8,frameBufferType:y=ve},E)=>{const{gl:c,scene:R,camera:N,size:z}=j(),i=o||R,a=e||N,[t,d,M]=s.useMemo(()=>{const w=new de(c,{depthBuffer:m,stencilBuffer:P,multisampling:S,frameBufferType:y});w.addPass(new we(i,a));let b=null,h=null;return p&&(h=new xe(i,a),h.enabled=!1,w.addPass(h),l!==void 0&&(b=new ge({normalBuffer:h.texture,resolutionScale:l}),b.enabled=!1,w.addPass(b))),[w,h,b]},[a,c,m,P,S,y,i,p,l]);s.useEffect(()=>t==null?void 0:t.setSize(z.width,z.height),[t,z]),L((w,b)=>{if(u){const h=c.autoClear;c.autoClear=v,P&&!v&&c.clearStencil(),t.render(b),c.autoClear=h}},u?f:0);const _=s.useRef(null);s.useLayoutEffect(()=>{var h;const w=[],b=_.current.__r3f;if(b&&t){const F=b.children;for(let T=0;T<F.length;T++){const A=F[T].object;if(A instanceof D){const W=[A];if(!X(A)){let q=null;for(;(q=(h=F[T+1])==null?void 0:h.object)instanceof D&&!X(q);)W.push(q),T++}const Q=new he(a,...W);w.push(Q)}else A instanceof ye&&w.push(A)}for(const T of w)t==null||t.addPass(T);d&&(d.enabled=!0),M&&(M.enabled=!0)}return()=>{for(const F of w)t==null||t.removePass(F);d&&(d.enabled=!1),M&&(M.enabled=!1)}},[t,r,a,d,M]),s.useEffect(()=>{const w=c.toneMapping;return c.toneMapping=me,()=>{c.toneMapping=w}},[c]);const K=s.useMemo(()=>({composer:t,normalPass:d,downSamplingPass:M,resolutionScale:l,camera:a,scene:i}),[t,d,M,l,a,i]);return s.useImperativeHandle(E,()=>t,[t]),n.jsx(Ce.Provider,{value:K,children:n.jsx("group",{ref:_,children:r})})}));let ze=0;const Y=new WeakMap,Me=(r,e)=>function({blendFunction:o=e==null?void 0:e.blendFunction,opacity:l=e==null?void 0:e.opacity,...u}){let f=Y.get(r);if(!f){const p=`@react-three/postprocessing/${r.name}-${ze++}`;ce({[p]:r}),Y.set(r,f=p)}const v=j(p=>p.camera),m=Z.useMemo(()=>[...(e==null?void 0:e.args)??[],...u.args??[{...e,...u}]],[JSON.stringify(u)]);return n.jsx(f,{camera:v,"blendMode-blendFunction":o,"blendMode-opacity-value":l,...u,args:m})},Te=`
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`,Ne=`
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2)); 
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(vec3(0.0), waveColor, f);
  gl_FragColor = vec4(col, 1.0);
}
`,Fe=`
precision highp float;
uniform float colorNum;
uniform float pixelSize;
const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  float bias = 0.2;
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
`;class Ae extends D{constructor(){const e=new Map([["colorNum",new g(4)],["pixelSize",new g(2)]]);super("RetroEffect",Fe,{uniforms:e}),this.uniforms=e}set colorNum(e){this.uniforms.get("colorNum").value=e}get colorNum(){return this.uniforms.get("colorNum").value}set pixelSize(e){this.uniforms.get("pixelSize").value=e}get pixelSize(){return this.uniforms.get("pixelSize").value}}const He=Me(Ae),J=s.forwardRef((r,e)=>{const{colorNum:o,pixelSize:l}=r;return n.jsx(He,{ref:e,colorNum:o,pixelSize:l})});J.displayName="RetroEffect";function Ue({waveSpeed:r,waveFrequency:e,waveAmplitude:o,waveColor:l,colorNum:u,pixelSize:f,disableAnimation:v,enableMouseInteraction:m,mouseRadius:p}){const P=s.useRef(null),S=s.useRef(new H),{viewport:y,size:E,gl:c}=j(),R=s.useRef({time:new g(0),resolution:new g(new H(0,0)),waveSpeed:new g(r),waveFrequency:new g(e),waveAmplitude:new g(o),waveColor:new g(new pe(...l)),mousePos:new g(new H(0,0)),enableMouseInteraction:new g(m?1:0),mouseRadius:new g(p)});s.useEffect(()=>{const i=c.getPixelRatio(),a=Math.floor(E.width*i),t=Math.floor(E.height*i),d=R.current.resolution.value;(d.x!==a||d.y!==t)&&d.set(a,t)},[E,c]);const N=s.useRef([...l]);L(({clock:i})=>{const a=R.current;v||(a.time.value=i.getElapsedTime()),a.waveSpeed.value!==r&&(a.waveSpeed.value=r),a.waveFrequency.value!==e&&(a.waveFrequency.value=e),a.waveAmplitude.value!==o&&(a.waveAmplitude.value=o),N.current.every((t,d)=>t===l[d])||(a.waveColor.value.set(...l),N.current=[...l]),a.enableMouseInteraction.value=m?1:0,a.mouseRadius.value=p,m&&a.mousePos.value.copy(S.current)});const z=i=>{if(!m)return;const a=c.domElement.getBoundingClientRect(),t=c.getPixelRatio();S.current.set((i.clientX-a.left)*t,(i.clientY-a.top)*t)};return n.jsxs(n.Fragment,{children:[n.jsxs("mesh",{ref:P,scale:[y.width,y.height,1],children:[n.jsx("planeGeometry",{args:[1,1]}),n.jsx("shaderMaterial",{vertexShader:Te,fragmentShader:Ne,uniforms:R.current})]}),n.jsx(Pe,{children:n.jsx(J,{colorNum:u,pixelSize:f})}),n.jsxs("mesh",{onPointerMove:z,position:[0,0,.01],scale:[y.width,y.height,1],visible:!1,children:[n.jsx("planeGeometry",{args:[1,1]}),n.jsx("meshBasicMaterial",{transparent:!0,opacity:0})]})]})}function Ie({waveSpeed:r=.05,waveFrequency:e=3,waveAmplitude:o=.3,waveColor:l=[.5,.5,.5],colorNum:u=4,pixelSize:f=2,disableAnimation:v=!1,enableMouseInteraction:m=!0,mouseRadius:p=1}){return n.jsx(fe,{className:"dither-container",camera:{position:[0,0,6]},dpr:1,gl:{antialias:!0,preserveDrawingBuffer:!0},children:n.jsx(Ue,{waveSpeed:r,waveFrequency:e,waveAmplitude:o,waveColor:l,colorNum:u,pixelSize:f,disableAnimation:v,enableMouseInteraction:m,mouseRadius:p})})}const qe=`/* eslint-disable react/no-unknown-property */\r
import { useRef, useEffect, forwardRef } from 'react';\r
import { Canvas, useFrame, useThree } from '@react-three/fiber';\r
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';\r
import { Effect } from 'postprocessing';\r
import * as THREE from 'three';\r
\r
import './Dither.css';\r
\r
const waveVertexShader = \`\r
precision highp float;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
  vec4 viewPosition = viewMatrix * modelPosition;\r
  gl_Position = projectionMatrix * viewPosition;\r
}\r
\`;\r
\r
const waveFragmentShader = \`\r
precision highp float;\r
uniform vec2 resolution;\r
uniform float time;\r
uniform float waveSpeed;\r
uniform float waveFrequency;\r
uniform float waveAmplitude;\r
uniform vec3 waveColor;\r
uniform vec2 mousePos;\r
uniform int enableMouseInteraction;\r
uniform float mouseRadius;\r
\r
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\r
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\r
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\r
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\r
\r
float cnoise(vec2 P) {\r
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\r
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\r
  Pi = mod289(Pi);\r
  vec4 ix = Pi.xzxz;\r
  vec4 iy = Pi.yyww;\r
  vec4 fx = Pf.xzxz;\r
  vec4 fy = Pf.yyww;\r
  vec4 i = permute(permute(ix) + iy);\r
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\r
  vec4 gy = abs(gx) - 0.5;\r
  vec4 tx = floor(gx + 0.5);\r
  gx = gx - tx;\r
  vec2 g00 = vec2(gx.x, gy.x);\r
  vec2 g10 = vec2(gx.y, gy.y);\r
  vec2 g01 = vec2(gx.z, gy.z);\r
  vec2 g11 = vec2(gx.w, gy.w);\r
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\r
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\r
  float n00 = dot(g00, vec2(fx.x, fy.x));\r
  float n10 = dot(g10, vec2(fx.y, fy.y));\r
  float n01 = dot(g01, vec2(fx.z, fy.z));\r
  float n11 = dot(g11, vec2(fx.w, fy.w));\r
  vec2 fade_xy = fade(Pf.xy);\r
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\r
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\r
}\r
\r
const int OCTAVES = 4;\r
float fbm(vec2 p) {\r
  float value = 0.0;\r
  float amp = 1.0;\r
  float freq = waveFrequency;\r
  for (int i = 0; i < OCTAVES; i++) {\r
    value += amp * abs(cnoise(p));\r
    p *= freq;\r
    amp *= waveAmplitude;\r
  }\r
  return value;\r
}\r
\r
float pattern(vec2 p) {\r
  vec2 p2 = p - time * waveSpeed;\r
  return fbm(p + fbm(p2)); \r
}\r
\r
void main() {\r
  vec2 uv = gl_FragCoord.xy / resolution.xy;\r
  uv -= 0.5;\r
  uv.x *= resolution.x / resolution.y;\r
  float f = pattern(uv);\r
  if (enableMouseInteraction == 1) {\r
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\r
    mouseNDC.x *= resolution.x / resolution.y;\r
    float dist = length(uv - mouseNDC);\r
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\r
    f -= 0.5 * effect;\r
  }\r
  vec3 col = mix(vec3(0.0), waveColor, f);\r
  gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
const ditherFragmentShader = \`\r
precision highp float;\r
uniform float colorNum;\r
uniform float pixelSize;\r
const float bayerMatrix8x8[64] = float[64](\r
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\r
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\r
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\r
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\r
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\r
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\r
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\r
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\r
);\r
\r
vec3 dither(vec2 uv, vec3 color) {\r
  vec2 scaledCoord = floor(uv * resolution / pixelSize);\r
  int x = int(mod(scaledCoord.x, 8.0));\r
  int y = int(mod(scaledCoord.y, 8.0));\r
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\r
  float step = 1.0 / (colorNum - 1.0);\r
  color += threshold * step;\r
  float bias = 0.2;\r
  color = clamp(color - bias, 0.0, 1.0);\r
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\r
}\r
\r
void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\r
  vec2 normalizedPixelSize = pixelSize / resolution;\r
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\r
  vec4 color = texture2D(inputBuffer, uvPixel);\r
  color.rgb = dither(uv, color.rgb);\r
  outputColor = color;\r
}\r
\`;\r
\r
class RetroEffectImpl extends Effect {\r
  constructor() {\r
    const uniforms = new Map([\r
      ['colorNum', new THREE.Uniform(4.0)],\r
      ['pixelSize', new THREE.Uniform(2.0)]\r
    ]);\r
    super('RetroEffect', ditherFragmentShader, { uniforms });\r
    this.uniforms = uniforms;\r
  }\r
  set colorNum(v) {\r
    this.uniforms.get('colorNum').value = v;\r
  }\r
  get colorNum() {\r
    return this.uniforms.get('colorNum').value;\r
  }\r
  set pixelSize(v) {\r
    this.uniforms.get('pixelSize').value = v;\r
  }\r
  get pixelSize() {\r
    return this.uniforms.get('pixelSize').value;\r
  }\r
}\r
\r
const WrappedRetro = wrapEffect(RetroEffectImpl);\r
\r
const RetroEffect = forwardRef((props, ref) => {\r
  const { colorNum, pixelSize } = props;\r
  return <WrappedRetro ref={ref} colorNum={colorNum} pixelSize={pixelSize} />;\r
});\r
RetroEffect.displayName = 'RetroEffect';\r
\r
function DitheredWaves({\r
  waveSpeed,\r
  waveFrequency,\r
  waveAmplitude,\r
  waveColor,\r
  colorNum,\r
  pixelSize,\r
  disableAnimation,\r
  enableMouseInteraction,\r
  mouseRadius\r
}) {\r
  const mesh = useRef(null);\r
  const mouseRef = useRef(new THREE.Vector2());\r
  const { viewport, size, gl } = useThree();\r
\r
  const waveUniformsRef = useRef({\r
    time: new THREE.Uniform(0),\r
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),\r
    waveSpeed: new THREE.Uniform(waveSpeed),\r
    waveFrequency: new THREE.Uniform(waveFrequency),\r
    waveAmplitude: new THREE.Uniform(waveAmplitude),\r
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),\r
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),\r
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),\r
    mouseRadius: new THREE.Uniform(mouseRadius)\r
  });\r
\r
  useEffect(() => {\r
    const dpr = gl.getPixelRatio();\r
    const w = Math.floor(size.width * dpr),\r
      h = Math.floor(size.height * dpr);\r
    const res = waveUniformsRef.current.resolution.value;\r
    if (res.x !== w || res.y !== h) {\r
      res.set(w, h);\r
    }\r
  }, [size, gl]);\r
\r
  const prevColor = useRef([...waveColor]);\r
  useFrame(({ clock }) => {\r
    const u = waveUniformsRef.current;\r
\r
    if (!disableAnimation) {\r
      u.time.value = clock.getElapsedTime();\r
    }\r
\r
    if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;\r
    if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;\r
    if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;\r
\r
    if (!prevColor.current.every((v, i) => v === waveColor[i])) {\r
      u.waveColor.value.set(...waveColor);\r
      prevColor.current = [...waveColor];\r
    }\r
\r
    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;\r
    u.mouseRadius.value = mouseRadius;\r
\r
    if (enableMouseInteraction) {\r
      u.mousePos.value.copy(mouseRef.current);\r
    }\r
  });\r
\r
  const handlePointerMove = e => {\r
    if (!enableMouseInteraction) return;\r
    const rect = gl.domElement.getBoundingClientRect();\r
    const dpr = gl.getPixelRatio();\r
    mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);\r
  };\r
\r
  return (\r
    <>\r
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>\r
        <planeGeometry args={[1, 1]} />\r
        <shaderMaterial\r
          vertexShader={waveVertexShader}\r
          fragmentShader={waveFragmentShader}\r
          uniforms={waveUniformsRef.current}\r
        />\r
      </mesh>\r
\r
      <EffectComposer>\r
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />\r
      </EffectComposer>\r
\r
      <mesh\r
        onPointerMove={handlePointerMove}\r
        position={[0, 0, 0.01]}\r
        scale={[viewport.width, viewport.height, 1]}\r
        visible={false}\r
      >\r
        <planeGeometry args={[1, 1]} />\r
        <meshBasicMaterial transparent opacity={0} />\r
      </mesh>\r
    </>\r
  );\r
}\r
\r
export default function Dither({\r
  waveSpeed = 0.05,\r
  waveFrequency = 3,\r
  waveAmplitude = 0.3,\r
  waveColor = [0.5, 0.5, 0.5],\r
  colorNum = 4,\r
  pixelSize = 2,\r
  disableAnimation = false,\r
  enableMouseInteraction = true,\r
  mouseRadius = 1\r
}) {\r
  return (\r
    <Canvas\r
      className="dither-container"\r
      camera={{ position: [0, 0, 6] }}\r
      dpr={1}\r
      gl={{ antialias: true, preserveDrawingBuffer: true }}\r
    >\r
      <DitheredWaves\r
        waveSpeed={waveSpeed}\r
        waveFrequency={waveFrequency}\r
        waveAmplitude={waveAmplitude}\r
        waveColor={waveColor}\r
        colorNum={colorNum}\r
        pixelSize={pixelSize}\r
        disableAnimation={disableAnimation}\r
        enableMouseInteraction={enableMouseInteraction}\r
        mouseRadius={mouseRadius}\r
      />\r
    </Canvas>\r
  );\r
}\r
`,De=`.dither-container {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
}\r
`,je=`/* eslint-disable react/no-unknown-property */\r
import { useRef, useEffect, forwardRef } from 'react';\r
import { Canvas, useFrame, useThree } from '@react-three/fiber';\r
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';\r
import { Effect } from 'postprocessing';\r
import * as THREE from 'three';\r
\r
const waveVertexShader = \`\r
precision highp float;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
  vec4 viewPosition = viewMatrix * modelPosition;\r
  gl_Position = projectionMatrix * viewPosition;\r
}\r
\`;\r
\r
const waveFragmentShader = \`\r
precision highp float;\r
uniform vec2 resolution;\r
uniform float time;\r
uniform float waveSpeed;\r
uniform float waveFrequency;\r
uniform float waveAmplitude;\r
uniform vec3 waveColor;\r
uniform vec2 mousePos;\r
uniform int enableMouseInteraction;\r
uniform float mouseRadius;\r
\r
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\r
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\r
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\r
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\r
\r
float cnoise(vec2 P) {\r
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\r
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\r
  Pi = mod289(Pi);\r
  vec4 ix = Pi.xzxz;\r
  vec4 iy = Pi.yyww;\r
  vec4 fx = Pf.xzxz;\r
  vec4 fy = Pf.yyww;\r
  vec4 i = permute(permute(ix) + iy);\r
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\r
  vec4 gy = abs(gx) - 0.5;\r
  vec4 tx = floor(gx + 0.5);\r
  gx = gx - tx;\r
  vec2 g00 = vec2(gx.x, gy.x);\r
  vec2 g10 = vec2(gx.y, gy.y);\r
  vec2 g01 = vec2(gx.z, gy.z);\r
  vec2 g11 = vec2(gx.w, gy.w);\r
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\r
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\r
  float n00 = dot(g00, vec2(fx.x, fy.x));\r
  float n10 = dot(g10, vec2(fx.y, fy.y));\r
  float n01 = dot(g01, vec2(fx.z, fy.z));\r
  float n11 = dot(g11, vec2(fx.w, fy.w));\r
  vec2 fade_xy = fade(Pf.xy);\r
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\r
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\r
}\r
\r
const int OCTAVES = 4;\r
float fbm(vec2 p) {\r
  float value = 0.0;\r
  float amp = 1.0;\r
  float freq = waveFrequency;\r
  for (int i = 0; i < OCTAVES; i++) {\r
    value += amp * abs(cnoise(p));\r
    p *= freq;\r
    amp *= waveAmplitude;\r
  }\r
  return value;\r
}\r
\r
float pattern(vec2 p) {\r
  vec2 p2 = p - time * waveSpeed;\r
  return fbm(p + fbm(p2)); \r
}\r
\r
void main() {\r
  vec2 uv = gl_FragCoord.xy / resolution.xy;\r
  uv -= 0.5;\r
  uv.x *= resolution.x / resolution.y;\r
  float f = pattern(uv);\r
  if (enableMouseInteraction == 1) {\r
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\r
    mouseNDC.x *= resolution.x / resolution.y;\r
    float dist = length(uv - mouseNDC);\r
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\r
    f -= 0.5 * effect;\r
  }\r
  vec3 col = mix(vec3(0.0), waveColor, f);\r
  gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
const ditherFragmentShader = \`\r
precision highp float;\r
uniform float colorNum;\r
uniform float pixelSize;\r
const float bayerMatrix8x8[64] = float[64](\r
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\r
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\r
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\r
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\r
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\r
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\r
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\r
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\r
);\r
\r
vec3 dither(vec2 uv, vec3 color) {\r
  vec2 scaledCoord = floor(uv * resolution / pixelSize);\r
  int x = int(mod(scaledCoord.x, 8.0));\r
  int y = int(mod(scaledCoord.y, 8.0));\r
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\r
  float step = 1.0 / (colorNum - 1.0);\r
  color += threshold * step;\r
  float bias = 0.2;\r
  color = clamp(color - bias, 0.0, 1.0);\r
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\r
}\r
\r
void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\r
  vec2 normalizedPixelSize = pixelSize / resolution;\r
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\r
  vec4 color = texture2D(inputBuffer, uvPixel);\r
  color.rgb = dither(uv, color.rgb);\r
  outputColor = color;\r
}\r
\`;\r
\r
class RetroEffectImpl extends Effect {\r
  constructor() {\r
    const uniforms = new Map([\r
      ['colorNum', new THREE.Uniform(4.0)],\r
      ['pixelSize', new THREE.Uniform(2.0)]\r
    ]);\r
    super('RetroEffect', ditherFragmentShader, { uniforms });\r
    this.uniforms = uniforms;\r
  }\r
  set colorNum(v) {\r
    this.uniforms.get('colorNum').value = v;\r
  }\r
  get colorNum() {\r
    return this.uniforms.get('colorNum').value;\r
  }\r
  set pixelSize(v) {\r
    this.uniforms.get('pixelSize').value = v;\r
  }\r
  get pixelSize() {\r
    return this.uniforms.get('pixelSize').value;\r
  }\r
}\r
\r
const WrappedRetro = wrapEffect(RetroEffectImpl);\r
\r
const RetroEffect = forwardRef((props, ref) => {\r
  const { colorNum, pixelSize } = props;\r
  return <WrappedRetro ref={ref} colorNum={colorNum} pixelSize={pixelSize} />;\r
});\r
RetroEffect.displayName = 'RetroEffect';\r
\r
function DitheredWaves({\r
  waveSpeed,\r
  waveFrequency,\r
  waveAmplitude,\r
  waveColor,\r
  colorNum,\r
  pixelSize,\r
  disableAnimation,\r
  enableMouseInteraction,\r
  mouseRadius\r
}) {\r
  const mesh = useRef(null);\r
  const mouseRef = useRef(new THREE.Vector2());\r
  const { viewport, size, gl } = useThree();\r
\r
  const waveUniformsRef = useRef({\r
    time: new THREE.Uniform(0),\r
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),\r
    waveSpeed: new THREE.Uniform(waveSpeed),\r
    waveFrequency: new THREE.Uniform(waveFrequency),\r
    waveAmplitude: new THREE.Uniform(waveAmplitude),\r
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),\r
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),\r
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),\r
    mouseRadius: new THREE.Uniform(mouseRadius)\r
  });\r
\r
  useEffect(() => {\r
    const dpr = gl.getPixelRatio();\r
    const w = Math.floor(size.width * dpr),\r
      h = Math.floor(size.height * dpr);\r
    const res = waveUniformsRef.current.resolution.value;\r
    if (res.x !== w || res.y !== h) {\r
      res.set(w, h);\r
    }\r
  }, [size, gl]);\r
\r
  const prevColor = useRef([...waveColor]);\r
  useFrame(({ clock }) => {\r
    const u = waveUniformsRef.current;\r
\r
    if (!disableAnimation) {\r
      u.time.value = clock.getElapsedTime();\r
    }\r
\r
    if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;\r
    if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;\r
    if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;\r
\r
    if (!prevColor.current.every((v, i) => v === waveColor[i])) {\r
      u.waveColor.value.set(...waveColor);\r
      prevColor.current = [...waveColor];\r
    }\r
\r
    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;\r
    u.mouseRadius.value = mouseRadius;\r
\r
    if (enableMouseInteraction) {\r
      u.mousePos.value.copy(mouseRef.current);\r
    }\r
  });\r
\r
  const handlePointerMove = e => {\r
    if (!enableMouseInteraction) return;\r
    const rect = gl.domElement.getBoundingClientRect();\r
    const dpr = gl.getPixelRatio();\r
    mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);\r
  };\r
\r
  return (\r
    <>\r
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>\r
        <planeGeometry args={[1, 1]} />\r
        <shaderMaterial\r
          vertexShader={waveVertexShader}\r
          fragmentShader={waveFragmentShader}\r
          uniforms={waveUniformsRef.current}\r
        />\r
      </mesh>\r
\r
      <EffectComposer>\r
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />\r
      </EffectComposer>\r
\r
      <mesh\r
        onPointerMove={handlePointerMove}\r
        position={[0, 0, 0.01]}\r
        scale={[viewport.width, viewport.height, 1]}\r
        visible={false}\r
      >\r
        <planeGeometry args={[1, 1]} />\r
        <meshBasicMaterial transparent opacity={0} />\r
      </mesh>\r
    </>\r
  );\r
}\r
\r
export default function Dither({\r
  waveSpeed = 0.05,\r
  waveFrequency = 3,\r
  waveAmplitude = 0.3,\r
  waveColor = [0.5, 0.5, 0.5],\r
  colorNum = 4,\r
  pixelSize = 2,\r
  disableAnimation = false,\r
  enableMouseInteraction = true,\r
  mouseRadius = 1\r
}) {\r
  return (\r
    <Canvas\r
      className="w-full h-full relative"\r
      camera={{ position: [0, 0, 6] }}\r
      dpr={1}\r
      gl={{ antialias: true, preserveDrawingBuffer: true }}\r
    >\r
      <DitheredWaves\r
        waveSpeed={waveSpeed}\r
        waveFrequency={waveFrequency}\r
        waveAmplitude={waveAmplitude}\r
        waveColor={waveColor}\r
        colorNum={colorNum}\r
        pixelSize={pixelSize}\r
        disableAnimation={disableAnimation}\r
        enableMouseInteraction={enableMouseInteraction}\r
        mouseRadius={mouseRadius}\r
      />\r
    </Canvas>\r
  );\r
}\r
`,_e=`/* eslint-disable react/no-unknown-property */\r
import { useRef, useEffect, forwardRef } from 'react';\r
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';\r
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';\r
import { Effect } from 'postprocessing';\r
import * as THREE from 'three';\r
\r
import './Dither.css';\r
\r
const waveVertexShader = \`\r
precision highp float;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
  vec4 viewPosition = viewMatrix * modelPosition;\r
  gl_Position = projectionMatrix * viewPosition;\r
}\r
\`;\r
\r
const waveFragmentShader = \`\r
precision highp float;\r
uniform vec2 resolution;\r
uniform float time;\r
uniform float waveSpeed;\r
uniform float waveFrequency;\r
uniform float waveAmplitude;\r
uniform vec3 waveColor;\r
uniform vec2 mousePos;\r
uniform int enableMouseInteraction;\r
uniform float mouseRadius;\r
\r
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\r
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\r
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\r
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\r
\r
float cnoise(vec2 P) {\r
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\r
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\r
  Pi = mod289(Pi);\r
  vec4 ix = Pi.xzxz;\r
  vec4 iy = Pi.yyww;\r
  vec4 fx = Pf.xzxz;\r
  vec4 fy = Pf.yyww;\r
  vec4 i = permute(permute(ix) + iy);\r
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\r
  vec4 gy = abs(gx) - 0.5;\r
  vec4 tx = floor(gx + 0.5);\r
  gx = gx - tx;\r
  vec2 g00 = vec2(gx.x, gy.x);\r
  vec2 g10 = vec2(gx.y, gy.y);\r
  vec2 g01 = vec2(gx.z, gy.z);\r
  vec2 g11 = vec2(gx.w, gy.w);\r
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\r
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\r
  float n00 = dot(g00, vec2(fx.x, fy.x));\r
  float n10 = dot(g10, vec2(fx.y, fy.y));\r
  float n01 = dot(g01, vec2(fx.z, fy.z));\r
  float n11 = dot(g11, vec2(fx.w, fy.w));\r
  vec2 fade_xy = fade(Pf.xy);\r
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\r
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\r
}\r
\r
const int OCTAVES = 4;\r
float fbm(vec2 p) {\r
  float value = 0.0;\r
  float amp = 1.0;\r
  float freq = waveFrequency;\r
  for (int i = 0; i < OCTAVES; i++) {\r
    value += amp * abs(cnoise(p));\r
    p *= freq;\r
    amp *= waveAmplitude;\r
  }\r
  return value;\r
}\r
\r
float pattern(vec2 p) {\r
  vec2 p2 = p - time * waveSpeed;\r
  return fbm(p + fbm(p2)); \r
}\r
\r
void main() {\r
  vec2 uv = gl_FragCoord.xy / resolution.xy;\r
  uv -= 0.5;\r
  uv.x *= resolution.x / resolution.y;\r
  float f = pattern(uv);\r
  if (enableMouseInteraction == 1) {\r
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\r
    mouseNDC.x *= resolution.x / resolution.y;\r
    float dist = length(uv - mouseNDC);\r
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\r
    f -= 0.5 * effect;\r
  }\r
  vec3 col = mix(vec3(0.0), waveColor, f);\r
  gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
const ditherFragmentShader = \`\r
precision highp float;\r
uniform float colorNum;\r
uniform float pixelSize;\r
const float bayerMatrix8x8[64] = float[64](\r
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\r
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\r
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\r
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\r
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\r
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\r
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\r
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\r
);\r
\r
vec3 dither(vec2 uv, vec3 color) {\r
  vec2 scaledCoord = floor(uv * resolution / pixelSize);\r
  int x = int(mod(scaledCoord.x, 8.0));\r
  int y = int(mod(scaledCoord.y, 8.0));\r
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\r
  float step = 1.0 / (colorNum - 1.0);\r
  color += threshold * step;\r
  float bias = 0.2;\r
  color = clamp(color - bias, 0.0, 1.0);\r
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\r
}\r
\r
void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\r
  vec2 normalizedPixelSize = pixelSize / resolution;\r
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\r
  vec4 color = texture2D(inputBuffer, uvPixel);\r
  color.rgb = dither(uv, color.rgb);\r
  outputColor = color;\r
}\r
\`;\r
\r
class RetroEffectImpl extends Effect {\r
  public uniforms: Map<string, THREE.Uniform<any>>;\r
  constructor() {\r
    const uniforms = new Map<string, THREE.Uniform<any>>([\r
      ['colorNum', new THREE.Uniform(4.0)],\r
      ['pixelSize', new THREE.Uniform(2.0)]\r
    ]);\r
    super('RetroEffect', ditherFragmentShader, { uniforms });\r
    this.uniforms = uniforms;\r
  }\r
  set colorNum(value: number) {\r
    this.uniforms.get('colorNum')!.value = value;\r
  }\r
  get colorNum(): number {\r
    return this.uniforms.get('colorNum')!.value;\r
  }\r
  set pixelSize(value: number) {\r
    this.uniforms.get('pixelSize')!.value = value;\r
  }\r
  get pixelSize(): number {\r
    return this.uniforms.get('pixelSize')!.value;\r
  }\r
}\r
\r
const RetroEffect = forwardRef<RetroEffectImpl, { colorNum: number; pixelSize: number }>((props, ref) => {\r
  const { colorNum, pixelSize } = props;\r
  const WrappedRetroEffect = wrapEffect(RetroEffectImpl);\r
  return <WrappedRetroEffect ref={ref} colorNum={colorNum} pixelSize={pixelSize} />;\r
});\r
\r
RetroEffect.displayName = 'RetroEffect';\r
\r
interface WaveUniforms {\r
  [key: string]: THREE.Uniform<any>;\r
  time: THREE.Uniform<number>;\r
  resolution: THREE.Uniform<THREE.Vector2>;\r
  waveSpeed: THREE.Uniform<number>;\r
  waveFrequency: THREE.Uniform<number>;\r
  waveAmplitude: THREE.Uniform<number>;\r
  waveColor: THREE.Uniform<THREE.Color>;\r
  mousePos: THREE.Uniform<THREE.Vector2>;\r
  enableMouseInteraction: THREE.Uniform<number>;\r
  mouseRadius: THREE.Uniform<number>;\r
}\r
\r
interface DitheredWavesProps {\r
  waveSpeed: number;\r
  waveFrequency: number;\r
  waveAmplitude: number;\r
  waveColor: [number, number, number];\r
  colorNum: number;\r
  pixelSize: number;\r
  disableAnimation: boolean;\r
  enableMouseInteraction: boolean;\r
  mouseRadius: number;\r
}\r
\r
function DitheredWaves({\r
  waveSpeed,\r
  waveFrequency,\r
  waveAmplitude,\r
  waveColor,\r
  colorNum,\r
  pixelSize,\r
  disableAnimation,\r
  enableMouseInteraction,\r
  mouseRadius\r
}: DitheredWavesProps) {\r
  const mesh = useRef<THREE.Mesh>(null);\r
  const mouseRef = useRef(new THREE.Vector2());\r
  const { viewport, size, gl } = useThree();\r
\r
  const waveUniformsRef = useRef<WaveUniforms>({\r
    time: new THREE.Uniform(0),\r
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),\r
    waveSpeed: new THREE.Uniform(waveSpeed),\r
    waveFrequency: new THREE.Uniform(waveFrequency),\r
    waveAmplitude: new THREE.Uniform(waveAmplitude),\r
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),\r
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),\r
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),\r
    mouseRadius: new THREE.Uniform(mouseRadius)\r
  });\r
\r
  useEffect(() => {\r
    const dpr = gl.getPixelRatio();\r
    const newWidth = Math.floor(size.width * dpr);\r
    const newHeight = Math.floor(size.height * dpr);\r
    const currentRes = waveUniformsRef.current.resolution.value;\r
    if (currentRes.x !== newWidth || currentRes.y !== newHeight) {\r
      currentRes.set(newWidth, newHeight);\r
    }\r
  }, [size, gl]);\r
\r
  const prevColor = useRef([...waveColor]);\r
  useFrame(({ clock }) => {\r
    const u = waveUniformsRef.current;\r
\r
    if (!disableAnimation) {\r
      u.time.value = clock.getElapsedTime();\r
    }\r
\r
    if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;\r
    if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;\r
    if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;\r
\r
    if (!prevColor.current.every((v, i) => v === waveColor[i])) {\r
      u.waveColor.value.set(...waveColor);\r
      prevColor.current = [...waveColor];\r
    }\r
\r
    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;\r
    u.mouseRadius.value = mouseRadius;\r
\r
    if (enableMouseInteraction) {\r
      u.mousePos.value.copy(mouseRef.current);\r
    }\r
  });\r
\r
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {\r
    if (!enableMouseInteraction) return;\r
    const rect = gl.domElement.getBoundingClientRect();\r
    const dpr = gl.getPixelRatio();\r
    mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);\r
  };\r
\r
  return (\r
    <>\r
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>\r
        <planeGeometry args={[1, 1]} />\r
        <shaderMaterial\r
          vertexShader={waveVertexShader}\r
          fragmentShader={waveFragmentShader}\r
          uniforms={waveUniformsRef.current}\r
        />\r
      </mesh>\r
\r
      <EffectComposer>\r
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />\r
      </EffectComposer>\r
\r
      <mesh\r
        onPointerMove={handlePointerMove}\r
        position={[0, 0, 0.01]}\r
        scale={[viewport.width, viewport.height, 1]}\r
        visible={false}\r
      >\r
        <planeGeometry args={[1, 1]} />\r
        <meshBasicMaterial transparent opacity={0} />\r
      </mesh>\r
    </>\r
  );\r
}\r
\r
interface DitherProps {\r
  waveSpeed?: number;\r
  waveFrequency?: number;\r
  waveAmplitude?: number;\r
  waveColor?: [number, number, number];\r
  colorNum?: number;\r
  pixelSize?: number;\r
  disableAnimation?: boolean;\r
  enableMouseInteraction?: boolean;\r
  mouseRadius?: number;\r
}\r
\r
export default function Dither({\r
  waveSpeed = 0.05,\r
  waveFrequency = 3,\r
  waveAmplitude = 0.3,\r
  waveColor = [0.5, 0.5, 0.5],\r
  colorNum = 4,\r
  pixelSize = 2,\r
  disableAnimation = false,\r
  enableMouseInteraction = true,\r
  mouseRadius = 1\r
}: DitherProps) {\r
  return (\r
    <Canvas\r
      className="dither-container"\r
      camera={{ position: [0, 0, 6] }}\r
      dpr={1}\r
      gl={{ antialias: true, preserveDrawingBuffer: true }}\r
    >\r
      <DitheredWaves\r
        waveSpeed={waveSpeed}\r
        waveFrequency={waveFrequency}\r
        waveAmplitude={waveAmplitude}\r
        waveColor={waveColor}\r
        colorNum={colorNum}\r
        pixelSize={pixelSize}\r
        disableAnimation={disableAnimation}\r
        enableMouseInteraction={enableMouseInteraction}\r
        mouseRadius={mouseRadius}\r
      />\r
    </Canvas>\r
  );\r
}\r
`,We=`/* eslint-disable react/no-unknown-property */\r
import { useRef, useState, useEffect, forwardRef } from 'react';\r
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';\r
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';\r
import { Effect } from 'postprocessing';\r
import * as THREE from 'three';\r
\r
const waveVertexShader = \`\r
precision highp float;\r
varying vec2 vUv;\r
void main() {\r
  vUv = uv;\r
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r
  vec4 viewPosition = viewMatrix * modelPosition;\r
  gl_Position = projectionMatrix * viewPosition;\r
}\r
\`;\r
\r
const waveFragmentShader = \`\r
precision highp float;\r
uniform vec2 resolution;\r
uniform float time;\r
uniform float waveSpeed;\r
uniform float waveFrequency;\r
uniform float waveAmplitude;\r
uniform vec3 waveColor;\r
uniform vec2 mousePos;\r
uniform int enableMouseInteraction;\r
uniform float mouseRadius;\r
\r
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\r
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\r
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\r
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\r
\r
float cnoise(vec2 P) {\r
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\r
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\r
  Pi = mod289(Pi);\r
  vec4 ix = Pi.xzxz;\r
  vec4 iy = Pi.yyww;\r
  vec4 fx = Pf.xzxz;\r
  vec4 fy = Pf.yyww;\r
  vec4 i = permute(permute(ix) + iy);\r
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\r
  vec4 gy = abs(gx) - 0.5;\r
  vec4 tx = floor(gx + 0.5);\r
  gx = gx - tx;\r
  vec2 g00 = vec2(gx.x, gy.x);\r
  vec2 g10 = vec2(gx.y, gy.y);\r
  vec2 g01 = vec2(gx.z, gy.z);\r
  vec2 g11 = vec2(gx.w, gy.w);\r
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\r
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\r
  float n00 = dot(g00, vec2(fx.x, fy.x));\r
  float n10 = dot(g10, vec2(fx.y, fy.y));\r
  float n01 = dot(g01, vec2(fx.z, fy.z));\r
  float n11 = dot(g11, vec2(fx.w, fy.w));\r
  vec2 fade_xy = fade(Pf.xy);\r
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\r
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\r
}\r
\r
const int OCTAVES = 4;\r
float fbm(vec2 p) {\r
  float value = 0.0;\r
  float amp = 1.0;\r
  float freq = waveFrequency;\r
  for (int i = 0; i < OCTAVES; i++) {\r
    value += amp * abs(cnoise(p));\r
    p *= freq;\r
    amp *= waveAmplitude;\r
  }\r
  return value;\r
}\r
\r
float pattern(vec2 p) {\r
  vec2 p2 = p - time * waveSpeed;\r
  return fbm(p + fbm(p2)); \r
}\r
\r
void main() {\r
  vec2 uv = gl_FragCoord.xy / resolution.xy;\r
  uv -= 0.5;\r
  uv.x *= resolution.x / resolution.y;\r
  float f = pattern(uv);\r
  if (enableMouseInteraction == 1) {\r
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\r
    mouseNDC.x *= resolution.x / resolution.y;\r
    float dist = length(uv - mouseNDC);\r
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\r
    f -= 0.5 * effect;\r
  }\r
  vec3 col = mix(vec3(0.0), waveColor, f);\r
  gl_FragColor = vec4(col, 1.0);\r
}\r
\`;\r
\r
const ditherFragmentShader = \`\r
precision highp float;\r
uniform float colorNum;\r
uniform float pixelSize;\r
const float bayerMatrix8x8[64] = float[64](\r
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\r
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\r
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\r
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\r
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\r
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\r
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\r
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\r
);\r
\r
vec3 dither(vec2 uv, vec3 color) {\r
  vec2 scaledCoord = floor(uv * resolution / pixelSize);\r
  int x = int(mod(scaledCoord.x, 8.0));\r
  int y = int(mod(scaledCoord.y, 8.0));\r
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\r
  float step = 1.0 / (colorNum - 1.0);\r
  color += threshold * step;\r
  float bias = 0.2;\r
  color = clamp(color - bias, 0.0, 1.0);\r
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\r
}\r
\r
void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\r
  vec2 normalizedPixelSize = pixelSize / resolution;\r
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\r
  vec4 color = texture2D(inputBuffer, uvPixel);\r
  color.rgb = dither(uv, color.rgb);\r
  outputColor = color;\r
}\r
\`;\r
\r
class RetroEffectImpl extends Effect {\r
  public uniforms: Map<string, THREE.Uniform<any>>;\r
  constructor() {\r
    const uniforms = new Map<string, THREE.Uniform<any>>([\r
      ['colorNum', new THREE.Uniform(4.0)],\r
      ['pixelSize', new THREE.Uniform(2.0)]\r
    ]);\r
    super('RetroEffect', ditherFragmentShader, { uniforms });\r
    this.uniforms = uniforms;\r
  }\r
  set colorNum(value: number) {\r
    this.uniforms.get('colorNum')!.value = value;\r
  }\r
  get colorNum(): number {\r
    return this.uniforms.get('colorNum')!.value;\r
  }\r
  set pixelSize(value: number) {\r
    this.uniforms.get('pixelSize')!.value = value;\r
  }\r
  get pixelSize(): number {\r
    return this.uniforms.get('pixelSize')!.value;\r
  }\r
}\r
\r
const RetroEffect = forwardRef<RetroEffectImpl, { colorNum: number; pixelSize: number }>((props, ref) => {\r
  const { colorNum, pixelSize } = props;\r
  const WrappedRetroEffect = wrapEffect(RetroEffectImpl);\r
  return <WrappedRetroEffect ref={ref} colorNum={colorNum} pixelSize={pixelSize} />;\r
});\r
\r
RetroEffect.displayName = 'RetroEffect';\r
\r
interface WaveUniforms {\r
  [key: string]: THREE.Uniform<any>;\r
  time: THREE.Uniform<number>;\r
  resolution: THREE.Uniform<THREE.Vector2>;\r
  waveSpeed: THREE.Uniform<number>;\r
  waveFrequency: THREE.Uniform<number>;\r
  waveAmplitude: THREE.Uniform<number>;\r
  waveColor: THREE.Uniform<THREE.Color>;\r
  mousePos: THREE.Uniform<THREE.Vector2>;\r
  enableMouseInteraction: THREE.Uniform<number>;\r
  mouseRadius: THREE.Uniform<number>;\r
}\r
\r
interface DitheredWavesProps {\r
  waveSpeed: number;\r
  waveFrequency: number;\r
  waveAmplitude: number;\r
  waveColor: [number, number, number];\r
  colorNum: number;\r
  pixelSize: number;\r
  disableAnimation: boolean;\r
  enableMouseInteraction: boolean;\r
  mouseRadius: number;\r
}\r
\r
function DitheredWaves({\r
  waveSpeed,\r
  waveFrequency,\r
  waveAmplitude,\r
  waveColor,\r
  colorNum,\r
  pixelSize,\r
  disableAnimation,\r
  enableMouseInteraction,\r
  mouseRadius\r
}: DitheredWavesProps) {\r
  const mesh = useRef<THREE.Mesh>(null);\r
  const mouseRef = useRef(new THREE.Vector2());\r
  const { viewport, size, gl } = useThree();\r
\r
  const waveUniformsRef = useRef<WaveUniforms>({\r
    time: new THREE.Uniform(0),\r
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),\r
    waveSpeed: new THREE.Uniform(waveSpeed),\r
    waveFrequency: new THREE.Uniform(waveFrequency),\r
    waveAmplitude: new THREE.Uniform(waveAmplitude),\r
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),\r
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),\r
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),\r
    mouseRadius: new THREE.Uniform(mouseRadius)\r
  });\r
\r
  useEffect(() => {\r
    const dpr = gl.getPixelRatio();\r
    const newWidth = Math.floor(size.width * dpr);\r
    const newHeight = Math.floor(size.height * dpr);\r
    const currentRes = waveUniformsRef.current.resolution.value;\r
    if (currentRes.x !== newWidth || currentRes.y !== newHeight) {\r
      currentRes.set(newWidth, newHeight);\r
    }\r
  }, [size, gl]);\r
\r
  const prevColor = useRef([...waveColor]);\r
  useFrame(({ clock }) => {\r
    const u = waveUniformsRef.current;\r
\r
    if (!disableAnimation) {\r
      u.time.value = clock.getElapsedTime();\r
    }\r
\r
    if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;\r
    if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;\r
    if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;\r
\r
    if (!prevColor.current.every((v, i) => v === waveColor[i])) {\r
      u.waveColor.value.set(...waveColor);\r
      prevColor.current = [...waveColor];\r
    }\r
\r
    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;\r
    u.mouseRadius.value = mouseRadius;\r
\r
    if (enableMouseInteraction) {\r
      u.mousePos.value.copy(mouseRef.current);\r
    }\r
  });\r
\r
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {\r
    if (!enableMouseInteraction) return;\r
    const rect = gl.domElement.getBoundingClientRect();\r
    const dpr = gl.getPixelRatio();\r
    mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);\r
  };\r
\r
  return (\r
    <>\r
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>\r
        <planeGeometry args={[1, 1]} />\r
        <shaderMaterial\r
          vertexShader={waveVertexShader}\r
          fragmentShader={waveFragmentShader}\r
          uniforms={waveUniformsRef.current}\r
        />\r
      </mesh>\r
\r
      <EffectComposer>\r
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />\r
      </EffectComposer>\r
\r
      <mesh\r
        onPointerMove={handlePointerMove}\r
        position={[0, 0, 0.01]}\r
        scale={[viewport.width, viewport.height, 1]}\r
        visible={false}\r
      >\r
        <planeGeometry args={[1, 1]} />\r
        <meshBasicMaterial transparent opacity={0} />\r
      </mesh>\r
    </>\r
  );\r
}\r
\r
interface DitherProps {\r
  waveSpeed?: number;\r
  waveFrequency?: number;\r
  waveAmplitude?: number;\r
  waveColor?: [number, number, number];\r
  colorNum?: number;\r
  pixelSize?: number;\r
  disableAnimation?: boolean;\r
  enableMouseInteraction?: boolean;\r
  mouseRadius?: number;\r
}\r
\r
export default function Dither({\r
  waveSpeed = 0.05,\r
  waveFrequency = 3,\r
  waveAmplitude = 0.3,\r
  waveColor = [0.5, 0.5, 0.5],\r
  colorNum = 4,\r
  pixelSize = 2,\r
  disableAnimation = false,\r
  enableMouseInteraction = true,\r
  mouseRadius = 1\r
}: DitherProps) {\r
  return (\r
    <Canvas\r
      className="w-full h-full relative"\r
      camera={{ position: [0, 0, 6] }}\r
      dpr={1}\r
      gl={{ antialias: true, preserveDrawingBuffer: true }}\r
    >\r
      <DitheredWaves\r
        waveSpeed={waveSpeed}\r
        waveFrequency={waveFrequency}\r
        waveAmplitude={waveAmplitude}\r
        waveColor={waveColor}\r
        colorNum={colorNum}\r
        pixelSize={pixelSize}\r
        disableAnimation={disableAnimation}\r
        enableMouseInteraction={enableMouseInteraction}\r
        mouseRadius={mouseRadius}\r
      />\r
    </Canvas>\r
  );\r
}\r
`,Ve={dependencies:"three postprocessing @react-three/fiber @react-three/postprocessing",usage:`import Dither from './Dither';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Dither
    waveColor={[0.5, 0.5, 0.5]}
    disableAnimation={false}
    enableMouseInteraction={true}
    mouseRadius={0.3}
    colorNum={4}
    waveAmplitude={0.3}
    waveFrequency={3}
    waveSpeed={0.05}
  />
</div>`,code:qe,css:De,tailwind:je,tsCode:_e,tsTailwind:We},Ze=()=>{const[r,e]=s.useState([.5,.5,.5]),[o,l]=s.useState(.3),[u,f]=s.useState(4),[v,m]=s.useState(.3),[p,P]=s.useState(3),[S,y]=s.useState(.05),[E,c]=s.useState(!0),[R,N]=s.useState(!1),z=[{name:"waveSpeed",type:"number",default:"0.05",description:"Speed of the wave animation."},{name:"waveFrequency",type:"number",default:"3",description:"Frequency of the wave pattern."},{name:"waveAmplitude",type:"number",default:"0.3",description:"Amplitude of the wave pattern."},{name:"waveColor",type:"[number, number, number]",default:"[0.5, 0.5, 0.5]",description:"Color of the wave, defined as an RGB array."},{name:"colorNum",type:"number",default:"4",description:"Number of colors to use in the dithering effect."},{name:"pixelSize",type:"number",default:"2",description:"Size of the pixels for the dithering effect."},{name:"disableAnimation",type:"boolean",default:"false",description:"Disable the wave animation when true."},{name:"enableMouseInteraction",type:"boolean",default:"true",description:"Enables mouse interaction to influence the wave effect."},{name:"mouseRadius",type:"number",default:"1",description:"Radius for the mouse interaction effect."}];return n.jsxs(ne,{children:[n.jsxs(oe,{children:[n.jsxs(ee,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[n.jsx(Ie,{waveColor:r,disableAnimation:R,enableMouseInteraction:E,mouseRadius:o,colorNum:u,waveAmplitude:v,waveFrequency:p,waveSpeed:S}),n.jsx(ue,{pillText:"New Background",headline:"Retro dithered waves to enhance your UI"})]}),n.jsxs(le,{children:[n.jsx(re,{fontSize:"sm",children:"Colors"}),n.jsxs(I,{gap:4,wrap:"wrap",children:[n.jsx(I,{gap:4,align:"center",mt:2,background:"#170D27",px:4,borderRadius:16,position:"relative",children:n.jsx(C,{min:0,max:1,width:50,step:.1,value:r[0],title:"Red",onChange:i=>{e(a=>{const t=[...a];return t[0]=i,t})}})}),n.jsx(I,{gap:4,align:"center",mt:2,background:"#170D27",px:4,borderRadius:16,position:"relative",children:n.jsx(C,{min:0,max:1,width:50,step:.1,value:r[1],title:"Green",onChange:i=>{e(a=>{const t=[...a];return t[1]=i,t})}})}),n.jsx(I,{gap:4,align:"center",mt:2,background:"#170D27",px:4,borderRadius:16,position:"relative",children:n.jsx(C,{min:0,max:1,width:50,step:.1,value:r[2],title:"Blue",onChange:i=>{e(a=>{const t=[...a];return t[2]=i,t})}})})]}),n.jsx(C,{title:"Color Intensity",min:2.5,max:40,step:.1,value:u,onChange:i=>{f(i)}}),n.jsx(C,{title:"Wave Amplitude",min:0,max:1,step:.01,value:v,onChange:i=>{m(i)}}),n.jsx(C,{title:"Wave Frequency",min:0,max:10,step:.1,value:p,onChange:i=>{P(i)}}),n.jsx(V,{title:"Disable Animation",isChecked:R,onChange:i=>{N(i)}}),n.jsx(C,{title:"Wave Speed",min:0,max:.1,isDisabled:R,step:.01,value:S,onChange:i=>{y(i)}}),n.jsx(V,{title:"Mouse Interaction",isChecked:E,onChange:i=>{c(i)}}),n.jsx(C,{title:"Mouse Radius",min:0,isDisabled:!E,max:2,step:.1,value:o,onChange:i=>{l(i)}})]}),n.jsx(te,{data:z}),n.jsx(se,{dependencyList:["three","postprocessing","@react-three/fiber","@react-three/postprocessing"]})]}),n.jsx(ie,{children:n.jsx(ae,{codeObject:Ve})})]})};export{Ze as default};
