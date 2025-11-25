import{r as n,R as nr,P as er,M as tr,j as r,B as ar,F as H,T as k,d as J}from"./index-wsKSLPNH.js";import{T as or,P as sr,a as ir,C as lr,b as cr}from"./PropTable-C4uPWs8h.js";import{C as ur}from"./Customize-1m_ZNqR9.js";import{D as mr}from"./Dependencies-BHoMfJUj.js";import{B as fr}from"./BackgroundContent-CqU7Wlm2.js";import{P as I}from"./PreviewSlider-m1G_aiYP.js";import{P as dr}from"./PreviewSelect-B8u33nUa.js";import{T as gr}from"./Texture-BkQWYNP2.js";import{T as pr}from"./Triangle-66-Bqe-c.js";import"./index-Bpz4cGEA.js";import"./PreviewSwitch-DqnF708j.js";import"./field-bd7p2HAb.js";const vr=`#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`,hr=`#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;

uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q);
    n += 0.25 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0);
    n += 0.10 * hash21(q * 8.0 + 113.0);
    n += 0.05 * hash21(q * 16.0 + 191.0);
    return n;
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.5;
    s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)
            + 0.7 * sin(q.y * 0.50 - t * 0.5)
            + 0.6 * sin(q.z * 0.60 + t * 0.7);
    return a;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){
      vec2 m = uMouse * 2.0 - 1.0;
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);
      hoverMat = rotY(ang.y) * rotX(ang.x);
    }

    for (int i = 0; i < 44; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));

        if(uAnimType == 0){
            Pl.xz *= M2;
        } else if(uAnimType == 1){
      Pl = rot3dMat * Pl;
        } else {
      Pl = hoverMat * Pl;
        }

        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;

        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

        float rayPattern = smoothstep(
            0.5, 0.7,
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))
        );

        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);
            comb = pow(comb, 3.0);
            rayPattern *= smoothstep(0.15, 0.95, comb);
        }

        vec3 spectralDefault = 1.0 + vec3(
            cos(marchT * 3.0 + 0.0),
            cos(marchT * 3.0 + 1.0),
            cos(marchT * 3.0 + 2.0)
        );

        float saw = fract(marchT * 0.25);
        float tRay = saw * saw * (3.0 - 2.0 * saw);
        vec3 userGradient = 2.0 * sampleGradient(tRay);
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;
        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        col += base * rayPattern;
        marchT += stepLen;
    }

    col *= edgeFade(frag, uResolution, uOffset);
    col *= uIntensity;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`,xr=l=>{let o=l.trim();if(o.startsWith("#")&&(o=o.slice(1)),o.length===3){const u=o[0],y=o[1],R=o[2];o=u+u+y+y+R+R}const c=parseInt(o,16);if(isNaN(c)||o.length!==6&&o.length!==8)return[1,1,1];const h=(c>>16&255)/255,x=(c>>8&255)/255,C=(c&255)/255;return[h,x,C]},rr=l=>{if(l==null)return 0;if(typeof l=="number")return l;const o=String(l).trim(),c=parseFloat(o.replace("px",""));return isNaN(c)?0:c},yr=({intensity:l=2,speed:o=.5,animationType:c="rotate3d",colors:h,distort:x=0,paused:C=!1,offset:u={x:0,y:0},hoverDampness:y=0,rayCount:R,mixBlendMode:g="lighten"})=>{const N=n.useRef(null),z=n.useRef(null),T=n.useRef(null),G=n.useRef([.5,.5]),F=n.useRef([.5,.5]),_=n.useRef(C),b=n.useRef(null),V=n.useRef(y),O=n.useRef(!0),S=n.useRef(null),p=n.useRef(null);return n.useEffect(()=>{_.current=C},[C]),n.useEffect(()=>{V.current=y},[y]),n.useEffect(()=>{const e=N.current;if(!e)return;const A=Math.min(window.devicePixelRatio||1,2),t=new nr({dpr:A,alpha:!1,antialias:!1});T.current=t;const a=t.gl;a.canvas.style.position="absolute",a.canvas.style.inset="0",a.canvas.style.width="100%",a.canvas.style.height="100%",a.canvas.style.mixBlendMode=g&&g!=="none"?g:"",e.appendChild(a.canvas);const W=new Uint8Array([255,255,255,255]),w=new gr(a,{image:W,width:1,height:1,generateMipmaps:!1,flipY:!1});w.minFilter=a.LINEAR,w.magFilter=a.LINEAR,w.wrapS=a.CLAMP_TO_EDGE,w.wrapT=a.CLAMP_TO_EDGE,b.current=w;const m=new er(a,{vertex:vr,fragment:hr,uniforms:{uResolution:{value:[1,1]},uTime:{value:0},uIntensity:{value:1},uSpeed:{value:1},uAnimType:{value:0},uMouse:{value:[.5,.5]},uColorCount:{value:0},uDistort:{value:0},uOffset:{value:[0,0]},uGradient:{value:w},uNoiseAmount:{value:.8},uRayCount:{value:0}}});z.current=m;const v=new pr(a),j=new tr(a,{geometry:v,program:m});p.current=v,S.current=j;const d=()=>{const s=e.clientWidth||1,f=e.clientHeight||1;t.setSize(s,f),m.uniforms.uResolution.value=[a.drawingBufferWidth,a.drawingBufferHeight]};let i=null;"ResizeObserver"in window?(i=new ResizeObserver(d),i.observe(e)):window.addEventListener("resize",d),d();const Y=s=>{const f=e.getBoundingClientRect(),P=(s.clientX-f.left)/Math.max(f.width,1),B=(s.clientY-f.top)/Math.max(f.height,1);G.current=[Math.min(Math.max(P,0),1),Math.min(Math.max(B,0),1)]};e.addEventListener("pointermove",Y,{passive:!0});let E=null;"IntersectionObserver"in window&&(E=new IntersectionObserver(s=>{s[0]&&(O.current=s[0].isIntersecting)},{root:null,threshold:.01}),E.observe(e));const U=()=>{};document.addEventListener("visibilitychange",U);let X=0,K=performance.now(),Q=0;const Z=s=>{const f=Math.max(0,s-K)*.001;K=s;const P=O.current&&!document.hidden;if(_.current||(Q+=f),!P){X=requestAnimationFrame(Z);return}const B=.02+Math.max(0,Math.min(1,V.current))*.5,D=1-Math.exp(-f/B),q=G.current,M=F.current;M[0]+=(q[0]-M[0])*D,M[1]+=(q[1]-M[1])*D,m.uniforms.uMouse.value=M,m.uniforms.uTime.value=Q,t.render({scene:S.current}),X=requestAnimationFrame(Z)};return X=requestAnimationFrame(Z),()=>{var s,f,P,B,D,q,M,$;cancelAnimationFrame(X),e.removeEventListener("pointermove",Y),i==null||i.disconnect(),i||window.removeEventListener("resize",d),E==null||E.disconnect(),document.removeEventListener("visibilitychange",U);try{e.removeChild(a.canvas)}catch{console.warn("Canvas already removed")}try{(f=(s=S.current)==null?void 0:s.remove)==null||f.call(s)}catch{}try{(B=(P=p.current)==null?void 0:P.remove)==null||B.call(P)}catch{}try{(q=(D=z.current)==null?void 0:D.remove)==null||q.call(D)}catch{}try{const L=(M=T.current)==null?void 0:M.gl;L&&(($=b.current)!=null&&$.texture)&&L.deleteTexture(b.current.texture)}catch{}z.current=null,T.current=null,b.current=null,S.current=null,p.current=null}},[]),n.useEffect(()=>{var A,t;const e=(t=(A=T.current)==null?void 0:A.gl)==null?void 0:t.canvas;e&&(e.style.mixBlendMode=g&&g!=="none"?g:"")},[g]),n.useEffect(()=>{const e=z.current,A=T.current,t=b.current;if(!e||!A||!t)return;e.uniforms.uIntensity.value=l??1,e.uniforms.uSpeed.value=o??1;const a={rotate:0,rotate3d:1,hover:2};e.uniforms.uAnimType.value=a[c??"rotate"],e.uniforms.uDistort.value=typeof x=="number"?x:0;const W=rr(u==null?void 0:u.x),w=rr(u==null?void 0:u.y);e.uniforms.uOffset.value=[W,w],e.uniforms.uRayCount.value=Math.max(0,Math.floor(R??0));let m=0;if(Array.isArray(h)&&h.length>0){const v=A.gl,j=h.slice(0,64);m=j.length;const d=new Uint8Array(m*4);for(let i=0;i<m;i++){const[Y,E,U]=xr(j[i]);d[i*4+0]=Math.round(Y*255),d[i*4+1]=Math.round(E*255),d[i*4+2]=Math.round(U*255),d[i*4+3]=255}t.image=d,t.width=m,t.height=1,t.minFilter=v.LINEAR,t.magFilter=v.LINEAR,t.wrapS=v.CLAMP_TO_EDGE,t.wrapT=v.CLAMP_TO_EDGE,t.flipY=!1,t.generateMipmaps=!1,t.format=v.RGBA,t.type=v.UNSIGNED_BYTE,t.needsUpdate=!0}else m=0;e.uniforms.uColorCount.value=m},[l,o,c,h,x,u,R]),r.jsx("div",{className:"prismatic-burst-container",ref:N})},Rr=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';\r
import './PrismaticBurst.css';\r
\r
const vertexShader = \`#version 300 es\r
in vec2 position;\r
in vec2 uv;\r
out vec2 vUv;\r
void main() {\r
    vUv = uv;\r
    gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`#version 300 es\r
precision highp float;\r
precision highp int;\r
\r
out vec4 fragColor;\r
\r
uniform vec2  uResolution;\r
uniform float uTime;\r
\r
uniform float uIntensity;\r
uniform float uSpeed;\r
uniform int   uAnimType;\r
uniform vec2  uMouse;\r
uniform int   uColorCount;\r
uniform float uDistort;\r
uniform vec2  uOffset;\r
uniform sampler2D uGradient;\r
uniform float uNoiseAmount;\r
uniform int   uRayCount;\r
\r
float hash21(vec2 p){\r
    p = floor(p);\r
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));\r
    return fract(f);\r
}\r
\r
mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }\r
\r
float layeredNoise(vec2 fragPx){\r
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);\r
    vec2 q = rot30() * p;\r
    float n = 0.0;\r
    n += 0.40 * hash21(q);\r
    n += 0.25 * hash21(q * 2.0 + 17.0);\r
    n += 0.20 * hash21(q * 4.0 + 47.0);\r
    n += 0.10 * hash21(q * 8.0 + 113.0);\r
    n += 0.05 * hash21(q * 16.0 + 191.0);\r
    return n;\r
}\r
\r
vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){\r
    float focal = res.y * max(dist, 1e-3);\r
    return normalize(vec3(2.0 * (frag - offset) - res, focal));\r
}\r
\r
float edgeFade(vec2 frag, vec2 res, vec2 offset){\r
    vec2 toC = frag - 0.5 * res - offset;\r
    float r = length(toC) / (0.5 * min(res.x, res.y));\r
    float x = clamp(r, 0.0, 1.0);\r
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);\r
    float s = q * 0.5;\r
    s = pow(s, 1.5);\r
    float tail = 1.0 - pow(1.0 - s, 2.0);\r
    s = mix(s, tail, 0.2);\r
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;\r
    return clamp(s + dn, 0.0, 1.0);\r
}\r
\r
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }\r
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }\r
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }\r
\r
vec3 sampleGradient(float t){\r
    t = clamp(t, 0.0, 1.0);\r
    return texture(uGradient, vec2(t, 0.5)).rgb;\r
}\r
\r
vec2 rot2(vec2 v, float a){\r
    float s = sin(a), c = cos(a);\r
    return mat2(c, -s, s, c) * v;\r
}\r
\r
float bendAngle(vec3 q, float t){\r
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)\r
            + 0.7 * sin(q.y * 0.50 - t * 0.5)\r
            + 0.6 * sin(q.z * 0.60 + t * 0.7);\r
    return a;\r
}\r
\r
void main(){\r
    vec2 frag = gl_FragCoord.xy;\r
    float t = uTime * uSpeed;\r
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);\r
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);\r
    float marchT = 0.0;\r
    vec3 col = vec3(0.0);\r
    float n = layeredNoise(frag);\r
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));\r
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);\r
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;\r
\r
    mat3 rot3dMat = mat3(1.0);\r
    if(uAnimType == 1){\r
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);\r
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);\r
    }\r
    mat3 hoverMat = mat3(1.0);\r
    if(uAnimType == 2){\r
      vec2 m = uMouse * 2.0 - 1.0;\r
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);\r
      hoverMat = rotY(ang.y) * rotX(ang.x);\r
    }\r
\r
    for (int i = 0; i < 44; ++i) {\r
        vec3 P = marchT * dir;\r
        P.z -= 2.0;\r
        float rad = length(P);\r
        vec3 Pl = P * (10.0 / max(rad, 1e-6));\r
\r
        if(uAnimType == 0){\r
            Pl.xz *= M2;\r
        } else if(uAnimType == 1){\r
      Pl = rot3dMat * Pl;\r
        } else {\r
      Pl = hoverMat * Pl;\r
        }\r
\r
        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;\r
\r
        float grow = smoothstep(0.35, 3.0, marchT);\r
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);\r
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);\r
        vec3 Pb = Pl;\r
        Pb.xz = rot2(Pb.xz, a1);\r
        Pb.xy = rot2(Pb.xy, a2);\r
\r
        float rayPattern = smoothstep(\r
            0.5, 0.7,\r
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *\r
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))\r
        );\r
\r
        if (uRayCount > 0) {\r
            float ang = atan(Pb.y, Pb.x);\r
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);\r
            comb = pow(comb, 3.0);\r
            rayPattern *= smoothstep(0.15, 0.95, comb);\r
        }\r
\r
        vec3 spectralDefault = 1.0 + vec3(\r
            cos(marchT * 3.0 + 0.0),\r
            cos(marchT * 3.0 + 1.0),\r
            cos(marchT * 3.0 + 2.0)\r
        );\r
\r
        float saw = fract(marchT * 0.25);\r
        float tRay = saw * saw * (3.0 - 2.0 * saw);\r
        vec3 userGradient = 2.0 * sampleGradient(tRay);\r
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;\r
        vec3 base = (0.05 / (0.4 + stepLen))\r
                  * smoothstep(5.0, 0.0, rad)\r
                  * spectral;\r
\r
        col += base * rayPattern;\r
        marchT += stepLen;\r
    }\r
\r
    col *= edgeFade(frag, uResolution, uOffset);\r
    col *= uIntensity;\r
\r
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\r
}\`;\r
\r
const hexToRgb01 = hex => {\r
  let h = hex.trim();\r
  if (h.startsWith('#')) h = h.slice(1);\r
  if (h.length === 3) {\r
    const r = h[0],\r
      g = h[1],\r
      b = h[2];\r
    h = r + r + g + g + b + b;\r
  }\r
  const intVal = parseInt(h, 16);\r
  if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];\r
  const r = ((intVal >> 16) & 255) / 255;\r
  const g = ((intVal >> 8) & 255) / 255;\r
  const b = (intVal & 255) / 255;\r
  return [r, g, b];\r
};\r
\r
const toPx = v => {\r
  if (v == null) return 0;\r
  if (typeof v === 'number') return v;\r
  const s = String(v).trim();\r
  const num = parseFloat(s.replace('px', ''));\r
  return isNaN(num) ? 0 : num;\r
};\r
\r
const PrismaticBurst = ({\r
  intensity = 2,\r
  speed = 0.5,\r
  animationType = 'rotate3d',\r
  colors,\r
  distort = 0,\r
  paused = false,\r
  offset = { x: 0, y: 0 },\r
  hoverDampness = 0,\r
  rayCount,\r
  mixBlendMode = 'lighten'\r
}) => {\r
  const containerRef = useRef(null);\r
  const programRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const mouseTargetRef = useRef([0.5, 0.5]);\r
  const mouseSmoothRef = useRef([0.5, 0.5]);\r
  const pausedRef = useRef(paused);\r
  const gradTexRef = useRef(null);\r
  const hoverDampRef = useRef(hoverDampness);\r
  const isVisibleRef = useRef(true);\r
  const meshRef = useRef(null);\r
  const triRef = useRef(null);\r
\r
  useEffect(() => {\r
    pausedRef.current = paused;\r
  }, [paused]);\r
  useEffect(() => {\r
    hoverDampRef.current = hoverDampness;\r
  }, [hoverDampness]);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const dpr = Math.min(window.devicePixelRatio || 1, 2);\r
    const renderer = new Renderer({\r
      dpr,\r
      alpha: false,\r
      antialias: false\r
    });\r
    rendererRef.current = renderer;\r
\r
    const gl = renderer.gl;\r
    gl.canvas.style.position = 'absolute';\r
    gl.canvas.style.inset = '0';\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
    gl.canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';\r
    container.appendChild(gl.canvas);\r
\r
    const white = new Uint8Array([255, 255, 255, 255]);\r
    const gradientTex = new Texture(gl, {\r
      image: white,\r
      width: 1,\r
      height: 1,\r
      generateMipmaps: false,\r
      flipY: false\r
    });\r
\r
    gradientTex.minFilter = gl.LINEAR;\r
    gradientTex.magFilter = gl.LINEAR;\r
    gradientTex.wrapS = gl.CLAMP_TO_EDGE;\r
    gradientTex.wrapT = gl.CLAMP_TO_EDGE;\r
    gradTexRef.current = gradientTex;\r
\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uResolution: { value: [1, 1] },\r
        uTime: { value: 0 },\r
\r
        uIntensity: { value: 1 },\r
        uSpeed: { value: 1 },\r
        uAnimType: { value: 0 },\r
        uMouse: { value: [0.5, 0.5] },\r
        uColorCount: { value: 0 },\r
        uDistort: { value: 0 },\r
        uOffset: { value: [0, 0] },\r
        uGradient: { value: gradientTex },\r
        uNoiseAmount: { value: 0.8 },\r
        uRayCount: { value: 0 }\r
      }\r
    });\r
\r
    programRef.current = program;\r
\r
    const triangle = new Triangle(gl);\r
    const mesh = new Mesh(gl, { geometry: triangle, program });\r
    triRef.current = triangle;\r
    meshRef.current = mesh;\r
\r
    const resize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h);\r
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];\r
    };\r
\r
    let ro = null;\r
    if ('ResizeObserver' in window) {\r
      ro = new ResizeObserver(resize);\r
      ro.observe(container);\r
    } else {\r
      window.addEventListener('resize', resize);\r
    }\r
    resize();\r
\r
    const onPointer = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / Math.max(rect.width, 1);\r
      const y = (e.clientY - rect.top) / Math.max(rect.height, 1);\r
      mouseTargetRef.current = [Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1)];\r
    };\r
    container.addEventListener('pointermove', onPointer, { passive: true });\r
\r
    let io = null;\r
    if ('IntersectionObserver' in window) {\r
      io = new IntersectionObserver(\r
        entries => {\r
          if (entries[0]) {\r
            isVisibleRef.current = entries[0].isIntersecting;\r
          }\r
        },\r
        { root: null, threshold: 0.01 }\r
      );\r
      io.observe(container);\r
    }\r
\r
    const onVis = () => {};\r
    document.addEventListener('visibilitychange', onVis);\r
\r
    let raf = 0;\r
    let last = performance.now();\r
    let accumTime = 0;\r
\r
    const update = now => {\r
      const dt = Math.max(0, now - last) * 0.001;\r
      last = now;\r
      const visible = isVisibleRef.current && !document.hidden;\r
      if (!pausedRef.current) accumTime += dt;\r
\r
      if (!visible) {\r
        raf = requestAnimationFrame(update);\r
        return;\r
      }\r
\r
      const tau = 0.02 + Math.max(0, Math.min(1, hoverDampRef.current)) * 0.5;\r
      const alpha = 1 - Math.exp(-dt / tau);\r
      const tgt = mouseTargetRef.current;\r
      const sm = mouseSmoothRef.current;\r
      sm[0] += (tgt[0] - sm[0]) * alpha;\r
      sm[1] += (tgt[1] - sm[1]) * alpha;\r
\r
      program.uniforms.uMouse.value = sm;\r
      program.uniforms.uTime.value = accumTime;\r
\r
      renderer.render({ scene: meshRef.current });\r
      raf = requestAnimationFrame(update);\r
    };\r
    raf = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      container.removeEventListener('pointermove', onPointer);\r
      ro?.disconnect();\r
      if (!ro) window.removeEventListener('resize', resize);\r
      io?.disconnect();\r
      document.removeEventListener('visibilitychange', onVis);\r
      try {\r
        container.removeChild(gl.canvas);\r
      } catch {\r
        console.warn('Canvas already removed');\r
      }\r
      try {\r
        meshRef.current?.remove?.();\r
      } catch (e) {\r
        /* ignore dispose errors */\r
      }\r
      try {\r
        triRef.current?.remove?.();\r
      } catch (e) {\r
        /* ignore dispose errors */\r
      }\r
      try {\r
        programRef.current?.remove?.();\r
      } catch (e) {\r
        /* ignore dispose errors */\r
      }\r
      try {\r
        const glCtx = rendererRef.current?.gl;\r
        if (glCtx && gradTexRef.current?.texture) {\r
          glCtx.deleteTexture(gradTexRef.current.texture);\r
        }\r
      } catch (e) {\r
        /* ignore texture delete errors */\r
      }\r
      programRef.current = null;\r
      rendererRef.current = null;\r
      gradTexRef.current = null;\r
      meshRef.current = null;\r
      triRef.current = null;\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  useEffect(() => {\r
    const canvas = rendererRef.current?.gl?.canvas;\r
\r
    if (canvas) {\r
      canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';\r
    }\r
  }, [mixBlendMode]);\r
\r
  useEffect(() => {\r
    const program = programRef.current;\r
    const renderer = rendererRef.current;\r
    const gradTex = gradTexRef.current;\r
    if (!program || !renderer || !gradTex) return;\r
\r
    program.uniforms.uIntensity.value = intensity ?? 1;\r
    program.uniforms.uSpeed.value = speed ?? 1;\r
\r
    const animTypeMap = {\r
      rotate: 0,\r
      rotate3d: 1,\r
      hover: 2\r
    };\r
    program.uniforms.uAnimType.value = animTypeMap[animationType ?? 'rotate'];\r
\r
    program.uniforms.uDistort.value = typeof distort === 'number' ? distort : 0;\r
\r
    const ox = toPx(offset?.x);\r
    const oy = toPx(offset?.y);\r
    program.uniforms.uOffset.value = [ox, oy];\r
    program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount ?? 0));\r
\r
    let count = 0;\r
    if (Array.isArray(colors) && colors.length > 0) {\r
      const gl = renderer.gl;\r
      const capped = colors.slice(0, 64);\r
      count = capped.length;\r
      const data = new Uint8Array(count * 4);\r
      for (let i = 0; i < count; i++) {\r
        const [r, g, b] = hexToRgb01(capped[i]);\r
        data[i * 4 + 0] = Math.round(r * 255);\r
        data[i * 4 + 1] = Math.round(g * 255);\r
        data[i * 4 + 2] = Math.round(b * 255);\r
        data[i * 4 + 3] = 255;\r
      }\r
      gradTex.image = data;\r
      gradTex.width = count;\r
      gradTex.height = 1;\r
      gradTex.minFilter = gl.LINEAR;\r
      gradTex.magFilter = gl.LINEAR;\r
      gradTex.wrapS = gl.CLAMP_TO_EDGE;\r
      gradTex.wrapT = gl.CLAMP_TO_EDGE;\r
      gradTex.flipY = false;\r
      gradTex.generateMipmaps = false;\r
      gradTex.format = gl.RGBA;\r
      gradTex.type = gl.UNSIGNED_BYTE;\r
      gradTex.needsUpdate = true;\r
    } else {\r
      count = 0;\r
    }\r
    program.uniforms.uColorCount.value = count;\r
  }, [intensity, speed, animationType, colors, distort, offset, rayCount]);\r
\r
  return <div className="prismatic-burst-container" ref={containerRef} />;\r
};\r
\r
export default PrismaticBurst;\r
`,Tr=`.prismatic-burst-container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
}\r
`,br=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';\r
\r
const vertexShader = \`#version 300 es\r
in vec2 position;\r
in vec2 uv;\r
out vec2 vUv;\r
void main() {\r
    vUv = uv;\r
    gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`#version 300 es\r
precision highp float;\r
precision highp int;\r
\r
out vec4 fragColor;\r
\r
uniform vec2  uResolution;\r
uniform float uTime;\r
\r
uniform float uIntensity;\r
uniform float uSpeed;\r
uniform int   uAnimType;\r
uniform vec2  uMouse;\r
uniform int   uColorCount;\r
uniform float uDistort;\r
uniform vec2  uOffset;\r
uniform sampler2D uGradient;\r
uniform float uNoiseAmount;\r
uniform int   uRayCount;\r
\r
float hash21(vec2 p){\r
    p = floor(p);\r
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));\r
    return fract(f);\r
}\r
\r
mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }\r
\r
float layeredNoise(vec2 fragPx){\r
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);\r
    vec2 q = rot30() * p;\r
    float n = 0.0;\r
    n += 0.40 * hash21(q);\r
    n += 0.25 * hash21(q * 2.0 + 17.0);\r
    n += 0.20 * hash21(q * 4.0 + 47.0);\r
    n += 0.10 * hash21(q * 8.0 + 113.0);\r
    n += 0.05 * hash21(q * 16.0 + 191.0);\r
    return n;\r
}\r
\r
vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){\r
    float focal = res.y * max(dist, 1e-3);\r
    return normalize(vec3(2.0 * (frag - offset) - res, focal));\r
}\r
\r
float edgeFade(vec2 frag, vec2 res, vec2 offset){\r
    vec2 toC = frag - 0.5 * res - offset;\r
    float r = length(toC) / (0.5 * min(res.x, res.y));\r
    float x = clamp(r, 0.0, 1.0);\r
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);\r
    float s = q * 0.5;\r
    s = pow(s, 1.5);\r
    float tail = 1.0 - pow(1.0 - s, 2.0);\r
    s = mix(s, tail, 0.2);\r
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;\r
    return clamp(s + dn, 0.0, 1.0);\r
}\r
\r
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }\r
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }\r
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }\r
\r
vec3 sampleGradient(float t){\r
    t = clamp(t, 0.0, 1.0);\r
    return texture(uGradient, vec2(t, 0.5)).rgb;\r
}\r
\r
vec2 rot2(vec2 v, float a){\r
    float s = sin(a), c = cos(a);\r
    return mat2(c, -s, s, c) * v;\r
}\r
\r
float bendAngle(vec3 q, float t){\r
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)\r
            + 0.7 * sin(q.y * 0.50 - t * 0.5)\r
            + 0.6 * sin(q.z * 0.60 + t * 0.7);\r
    return a;\r
}\r
\r
void main(){\r
    vec2 frag = gl_FragCoord.xy;\r
    float t = uTime * uSpeed;\r
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);\r
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);\r
    float marchT = 0.0;\r
    vec3 col = vec3(0.0);\r
    float n = layeredNoise(frag);\r
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));\r
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);\r
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;\r
\r
    mat3 rot3dMat = mat3(1.0);\r
    if(uAnimType == 1){\r
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);\r
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);\r
    }\r
    mat3 hoverMat = mat3(1.0);\r
    if(uAnimType == 2){\r
      vec2 m = uMouse * 2.0 - 1.0;\r
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);\r
      hoverMat = rotY(ang.y) * rotX(ang.x);\r
    }\r
\r
    for (int i = 0; i < 44; ++i) {\r
        vec3 P = marchT * dir;\r
        P.z -= 2.0;\r
        float rad = length(P);\r
        vec3 Pl = P * (10.0 / max(rad, 1e-6));\r
\r
        if(uAnimType == 0){\r
            Pl.xz *= M2;\r
        } else if(uAnimType == 1){\r
      Pl = rot3dMat * Pl;\r
        } else {\r
      Pl = hoverMat * Pl;\r
        }\r
\r
        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;\r
\r
        float grow = smoothstep(0.35, 3.0, marchT);\r
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);\r
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);\r
        vec3 Pb = Pl;\r
        Pb.xz = rot2(Pb.xz, a1);\r
        Pb.xy = rot2(Pb.xy, a2);\r
\r
        float rayPattern = smoothstep(\r
            0.5, 0.7,\r
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *\r
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))\r
        );\r
\r
        if (uRayCount > 0) {\r
            float ang = atan(Pb.y, Pb.x);\r
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);\r
            comb = pow(comb, 3.0);\r
            rayPattern *= smoothstep(0.15, 0.95, comb);\r
        }\r
\r
        vec3 spectralDefault = 1.0 + vec3(\r
            cos(marchT * 3.0 + 0.0),\r
            cos(marchT * 3.0 + 1.0),\r
            cos(marchT * 3.0 + 2.0)\r
        );\r
\r
        float saw = fract(marchT * 0.25);\r
        float tRay = saw * saw * (3.0 - 2.0 * saw);\r
        vec3 userGradient = 2.0 * sampleGradient(tRay);\r
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;\r
        vec3 base = (0.05 / (0.4 + stepLen))\r
                  * smoothstep(5.0, 0.0, rad)\r
                  * spectral;\r
\r
        col += base * rayPattern;\r
        marchT += stepLen;\r
    }\r
\r
    col *= edgeFade(frag, uResolution, uOffset);\r
    col *= uIntensity;\r
\r
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\r
}\`;\r
\r
const hexToRgb01 = hex => {\r
  let h = hex.trim();\r
  if (h.startsWith('#')) h = h.slice(1);\r
  if (h.length === 3) {\r
    const r = h[0],\r
      g = h[1],\r
      b = h[2];\r
    h = r + r + g + g + b + b;\r
  }\r
  const intVal = parseInt(h, 16);\r
  if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];\r
  const r = ((intVal >> 16) & 255) / 255;\r
  const g = ((intVal >> 8) & 255) / 255;\r
  const b = (intVal & 255) / 255;\r
  return [r, g, b];\r
};\r
\r
const toPx = v => {\r
  if (v == null) return 0;\r
  if (typeof v === 'number') return v;\r
  const s = String(v).trim();\r
  const num = parseFloat(s.replace('px', ''));\r
  return isNaN(num) ? 0 : num;\r
};\r
\r
const PrismaticBurst = ({\r
  intensity = 2,\r
  speed = 0.5,\r
  animationType = 'rotate3d',\r
  colors,\r
  distort = 0,\r
  paused = false,\r
  offset = { x: 0, y: 0 },\r
  hoverDampness = 0,\r
  rayCount,\r
  mixBlendMode = 'lighten'\r
}) => {\r
  const containerRef = useRef(null);\r
  const programRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const mouseTargetRef = useRef([0.5, 0.5]);\r
  const mouseSmoothRef = useRef([0.5, 0.5]);\r
  const pausedRef = useRef(paused);\r
  const gradTexRef = useRef(null);\r
  const hoverDampRef = useRef(hoverDampness);\r
  const isVisibleRef = useRef(true);\r
  const meshRef = useRef(null);\r
  const triRef = useRef(null);\r
\r
  useEffect(() => {\r
    pausedRef.current = paused;\r
  }, [paused]);\r
  useEffect(() => {\r
    hoverDampRef.current = hoverDampness;\r
  }, [hoverDampness]);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const dpr = Math.min(window.devicePixelRatio || 1, 2);\r
    const renderer = new Renderer({ dpr, alpha: false, antialias: false });\r
    rendererRef.current = renderer;\r
\r
    const gl = renderer.gl;\r
    gl.canvas.style.position = 'absolute';\r
    gl.canvas.style.inset = '0';\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
    gl.canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';\r
    container.appendChild(gl.canvas);\r
\r
    const white = new Uint8Array([255, 255, 255, 255]);\r
    const gradientTex = new Texture(gl, {\r
      image: white,\r
      width: 1,\r
      height: 1,\r
      generateMipmaps: false,\r
      flipY: false\r
    });\r
\r
    gradientTex.minFilter = gl.LINEAR;\r
    gradientTex.magFilter = gl.LINEAR;\r
    gradientTex.wrapS = gl.CLAMP_TO_EDGE;\r
    gradientTex.wrapT = gl.CLAMP_TO_EDGE;\r
    gradTexRef.current = gradientTex;\r
\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uResolution: { value: [1, 1] },\r
        uTime: { value: 0 },\r
\r
        uIntensity: { value: 1 },\r
        uSpeed: { value: 1 },\r
        uAnimType: { value: 0 },\r
        uMouse: { value: [0.5, 0.5] },\r
        uColorCount: { value: 0 },\r
        uDistort: { value: 0 },\r
        uOffset: { value: [0, 0] },\r
        uGradient: { value: gradientTex },\r
        uNoiseAmount: { value: 0.8 },\r
        uRayCount: { value: 0 }\r
      }\r
    });\r
\r
    programRef.current = program;\r
\r
    const triangle = new Triangle(gl);\r
    const mesh = new Mesh(gl, { geometry: triangle, program });\r
    triRef.current = triangle;\r
    meshRef.current = mesh;\r
\r
    const resize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h);\r
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];\r
    };\r
\r
    let ro = null;\r
    if ('ResizeObserver' in window) {\r
      ro = new ResizeObserver(resize);\r
      ro.observe(container);\r
    } else {\r
      window.addEventListener('resize', resize);\r
    }\r
    resize();\r
\r
    const onPointer = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / Math.max(rect.width, 1);\r
      const y = (e.clientY - rect.top) / Math.max(rect.height, 1);\r
      mouseTargetRef.current = [Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1)];\r
    };\r
    container.addEventListener('pointermove', onPointer, { passive: true });\r
\r
    let io = null;\r
    if ('IntersectionObserver' in window) {\r
      io = new IntersectionObserver(\r
        entries => {\r
          if (entries[0]) isVisibleRef.current = entries[0].isIntersecting;\r
        },\r
        { root: null, threshold: 0.01 }\r
      );\r
      io.observe(container);\r
    }\r
    const onVis = () => {};\r
    document.addEventListener('visibilitychange', onVis);\r
\r
    let raf = 0;\r
    let last = performance.now();\r
    let accumTime = 0;\r
\r
    const update = now => {\r
      const dt = Math.max(0, now - last) * 0.001;\r
      last = now;\r
      const visible = isVisibleRef.current && !document.hidden;\r
      if (!pausedRef.current) accumTime += dt;\r
      if (!visible) {\r
        raf = requestAnimationFrame(update);\r
        return;\r
      }\r
      const tau = 0.02 + Math.max(0, Math.min(1, hoverDampRef.current)) * 0.5;\r
      const alpha = 1 - Math.exp(-dt / tau);\r
      const tgt = mouseTargetRef.current;\r
      const sm = mouseSmoothRef.current;\r
      sm[0] += (tgt[0] - sm[0]) * alpha;\r
      sm[1] += (tgt[1] - sm[1]) * alpha;\r
      program.uniforms.uMouse.value = sm;\r
      program.uniforms.uTime.value = accumTime;\r
      renderer.render({ scene: meshRef.current });\r
      raf = requestAnimationFrame(update);\r
    };\r
    raf = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      container.removeEventListener('pointermove', onPointer);\r
      ro?.disconnect();\r
      if (!ro) window.removeEventListener('resize', resize);\r
      io?.disconnect();\r
      document.removeEventListener('visibilitychange', onVis);\r
      try {\r
        container.removeChild(gl.canvas);\r
      } catch (e) {\r
        void e;\r
      }\r
      try {\r
        meshRef.current?.remove?.();\r
      } catch (e) {\r
        void e;\r
      }\r
      try {\r
        triRef.current?.remove?.();\r
      } catch (e) {\r
        void e;\r
      }\r
      try {\r
        programRef.current?.remove?.();\r
      } catch (e) {\r
        void e;\r
      }\r
      try {\r
        const glCtx = rendererRef.current?.gl;\r
        if (glCtx && gradTexRef.current?.texture) glCtx.deleteTexture(gradTexRef.current.texture);\r
      } catch (e) {\r
        void e;\r
      }\r
      programRef.current = null;\r
      rendererRef.current = null;\r
      gradTexRef.current = null;\r
      meshRef.current = null;\r
      triRef.current = null;\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  useEffect(() => {\r
    const canvas = rendererRef.current?.gl?.canvas;\r
\r
    if (canvas) {\r
      canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';\r
    }\r
  }, [mixBlendMode]);\r
\r
  useEffect(() => {\r
    const program = programRef.current;\r
    const renderer = rendererRef.current;\r
    const gradTex = gradTexRef.current;\r
    if (!program || !renderer || !gradTex) return;\r
\r
    program.uniforms.uIntensity.value = intensity ?? 1;\r
    program.uniforms.uSpeed.value = speed ?? 1;\r
\r
    const animTypeMap = {\r
      rotate: 0,\r
      rotate3d: 1,\r
      hover: 2\r
    };\r
    program.uniforms.uAnimType.value = animTypeMap[animationType ?? 'rotate'];\r
\r
    program.uniforms.uDistort.value = typeof distort === 'number' ? distort : 0;\r
\r
    const ox = toPx(offset?.x);\r
    const oy = toPx(offset?.y);\r
    program.uniforms.uOffset.value = [ox, oy];\r
    program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount ?? 0));\r
\r
    let count = 0;\r
    if (Array.isArray(colors) && colors.length > 0) {\r
      const gl = renderer.gl;\r
      const capped = colors.slice(0, 64);\r
      count = capped.length;\r
      const data = new Uint8Array(count * 4);\r
      for (let i = 0; i < count; i++) {\r
        const [r, g, b] = hexToRgb01(capped[i]);\r
        data[i * 4 + 0] = Math.round(r * 255);\r
        data[i * 4 + 1] = Math.round(g * 255);\r
        data[i * 4 + 2] = Math.round(b * 255);\r
        data[i * 4 + 3] = 255;\r
      }\r
      gradTex.image = data;\r
      gradTex.width = count;\r
      gradTex.height = 1;\r
      gradTex.minFilter = gl.LINEAR;\r
      gradTex.magFilter = gl.LINEAR;\r
      gradTex.wrapS = gl.CLAMP_TO_EDGE;\r
      gradTex.wrapT = gl.CLAMP_TO_EDGE;\r
      gradTex.flipY = false;\r
      gradTex.generateMipmaps = false;\r
      gradTex.format = gl.RGBA;\r
      gradTex.type = gl.UNSIGNED_BYTE;\r
      gradTex.needsUpdate = true;\r
    } else {\r
      count = 0;\r
    }\r
    program.uniforms.uColorCount.value = count;\r
  }, [intensity, speed, animationType, colors, distort, offset, rayCount]);\r
\r
  return <div className="w-full h-full relative overflow-hidden" ref={containerRef} />;\r
};\r
\r
export default PrismaticBurst;\r
`,wr=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';\r
import './PrismaticBurst.css';\r
\r
type Offset = { x?: number | string; y?: number | string };\r
type AnimationType = 'rotate' | 'rotate3d' | 'hover';\r
\r
export type PrismaticBurstProps = {\r
  intensity?: number;\r
  speed?: number;\r
  animationType?: AnimationType;\r
  colors?: string[];\r
  distort?: number;\r
  paused?: boolean;\r
  offset?: Offset;\r
  hoverDampness?: number;\r
  rayCount?: number;\r
  mixBlendMode?: React.CSSProperties['mixBlendMode'] | 'none';\r
};\r
\r
const vertexShader = \`#version 300 es\r
in vec2 position;\r
in vec2 uv;\r
out vec2 vUv;\r
void main() {\r
    vUv = uv;\r
    gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`#version 300 es\r
precision highp float;\r
precision highp int;\r
\r
out vec4 fragColor;\r
\r
uniform vec2  uResolution;\r
uniform float uTime;\r
\r
uniform float uIntensity;\r
uniform float uSpeed;\r
uniform int   uAnimType;\r
uniform vec2  uMouse;\r
uniform int   uColorCount;\r
uniform float uDistort;\r
uniform vec2  uOffset;\r
uniform sampler2D uGradient;\r
uniform float uNoiseAmount;\r
uniform int   uRayCount;\r
\r
float hash21(vec2 p){\r
    p = floor(p);\r
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));\r
    return fract(f);\r
}\r
\r
mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }\r
\r
float layeredNoise(vec2 fragPx){\r
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);\r
    vec2 q = rot30() * p;\r
    float n = 0.0;\r
    n += 0.40 * hash21(q);\r
    n += 0.25 * hash21(q * 2.0 + 17.0);\r
    n += 0.20 * hash21(q * 4.0 + 47.0);\r
    n += 0.10 * hash21(q * 8.0 + 113.0);\r
    n += 0.05 * hash21(q * 16.0 + 191.0);\r
    return n;\r
}\r
\r
vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){\r
    float focal = res.y * max(dist, 1e-3);\r
    return normalize(vec3(2.0 * (frag - offset) - res, focal));\r
}\r
\r
float edgeFade(vec2 frag, vec2 res, vec2 offset){\r
    vec2 toC = frag - 0.5 * res - offset;\r
    float r = length(toC) / (0.5 * min(res.x, res.y));\r
    float x = clamp(r, 0.0, 1.0);\r
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);\r
    float s = q * 0.5;\r
    s = pow(s, 1.5);\r
    float tail = 1.0 - pow(1.0 - s, 2.0);\r
    s = mix(s, tail, 0.2);\r
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;\r
    return clamp(s + dn, 0.0, 1.0);\r
}\r
\r
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }\r
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }\r
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }\r
\r
vec3 sampleGradient(float t){\r
    t = clamp(t, 0.0, 1.0);\r
    return texture(uGradient, vec2(t, 0.5)).rgb;\r
}\r
\r
vec2 rot2(vec2 v, float a){\r
    float s = sin(a), c = cos(a);\r
    return mat2(c, -s, s, c) * v;\r
}\r
\r
float bendAngle(vec3 q, float t){\r
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)\r
            + 0.7 * sin(q.y * 0.50 - t * 0.5)\r
            + 0.6 * sin(q.z * 0.60 + t * 0.7);\r
    return a;\r
}\r
\r
void main(){\r
    vec2 frag = gl_FragCoord.xy;\r
    float t = uTime * uSpeed;\r
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);\r
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);\r
    float marchT = 0.0;\r
    vec3 col = vec3(0.0);\r
    float n = layeredNoise(frag);\r
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));\r
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);\r
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;\r
\r
    mat3 rot3dMat = mat3(1.0);\r
    if(uAnimType == 1){\r
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);\r
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);\r
    }\r
    mat3 hoverMat = mat3(1.0);\r
    if(uAnimType == 2){\r
      vec2 m = uMouse * 2.0 - 1.0;\r
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);\r
      hoverMat = rotY(ang.y) * rotX(ang.x);\r
    }\r
\r
    for (int i = 0; i < 44; ++i) {\r
        vec3 P = marchT * dir;\r
        P.z -= 2.0;\r
        float rad = length(P);\r
        vec3 Pl = P * (10.0 / max(rad, 1e-6));\r
\r
        if(uAnimType == 0){\r
            Pl.xz *= M2;\r
        } else if(uAnimType == 1){\r
      Pl = rot3dMat * Pl;\r
        } else {\r
      Pl = hoverMat * Pl;\r
        }\r
\r
        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;\r
\r
        float grow = smoothstep(0.35, 3.0, marchT);\r
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);\r
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);\r
        vec3 Pb = Pl;\r
        Pb.xz = rot2(Pb.xz, a1);\r
        Pb.xy = rot2(Pb.xy, a2);\r
\r
        float rayPattern = smoothstep(\r
            0.5, 0.7,\r
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *\r
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))\r
        );\r
\r
        if (uRayCount > 0) {\r
            float ang = atan(Pb.y, Pb.x);\r
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);\r
            comb = pow(comb, 3.0);\r
            rayPattern *= smoothstep(0.15, 0.95, comb);\r
        }\r
\r
        vec3 spectralDefault = 1.0 + vec3(\r
            cos(marchT * 3.0 + 0.0),\r
            cos(marchT * 3.0 + 1.0),\r
            cos(marchT * 3.0 + 2.0)\r
        );\r
\r
        float saw = fract(marchT * 0.25);\r
        float tRay = saw * saw * (3.0 - 2.0 * saw);\r
        vec3 userGradient = 2.0 * sampleGradient(tRay);\r
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;\r
        vec3 base = (0.05 / (0.4 + stepLen))\r
                  * smoothstep(5.0, 0.0, rad)\r
                  * spectral;\r
\r
        col += base * rayPattern;\r
        marchT += stepLen;\r
    }\r
\r
    col *= edgeFade(frag, uResolution, uOffset);\r
    col *= uIntensity;\r
\r
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\r
}\`;\r
\r
const hexToRgb01 = (hex: string): [number, number, number] => {\r
  let h = hex.trim();\r
  if (h.startsWith('#')) h = h.slice(1);\r
  if (h.length === 3) {\r
    const r = h[0],\r
      g = h[1],\r
      b = h[2];\r
    h = r + r + g + g + b + b;\r
  }\r
  const intVal = parseInt(h, 16);\r
  if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];\r
  const r = ((intVal >> 16) & 255) / 255;\r
  const g = ((intVal >> 8) & 255) / 255;\r
  const b = (intVal & 255) / 255;\r
  return [r, g, b];\r
};\r
\r
const toPx = (v: number | string | undefined): number => {\r
  if (v == null) return 0;\r
  if (typeof v === 'number') return v;\r
  const s = String(v).trim();\r
  const num = parseFloat(s.replace('px', ''));\r
  return isNaN(num) ? 0 : num;\r
};\r
\r
const PrismaticBurst = ({\r
  intensity = 2,\r
  speed = 0.5,\r
  animationType = 'rotate3d',\r
  colors,\r
  distort = 0,\r
  paused = false,\r
  offset = { x: 0, y: 0 },\r
  hoverDampness = 0,\r
  rayCount,\r
  mixBlendMode = 'lighten'\r
}: PrismaticBurstProps) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const programRef = useRef<Program | null>(null);\r
  const rendererRef = useRef<Renderer | null>(null);\r
  const mouseTargetRef = useRef<[number, number]>([0.5, 0.5]);\r
  const mouseSmoothRef = useRef<[number, number]>([0.5, 0.5]);\r
  const pausedRef = useRef<boolean>(paused);\r
  const gradTexRef = useRef<Texture | null>(null);\r
  const hoverDampRef = useRef<number>(hoverDampness);\r
  const isVisibleRef = useRef<boolean>(true);\r
  const meshRef = useRef<Mesh | null>(null);\r
  const triRef = useRef<Triangle | null>(null);\r
\r
  useEffect(() => {\r
    pausedRef.current = paused;\r
  }, [paused]);\r
  useEffect(() => {\r
    hoverDampRef.current = hoverDampness;\r
  }, [hoverDampness]);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const dpr = Math.min(window.devicePixelRatio || 1, 2);\r
    const renderer = new Renderer({ dpr, alpha: false, antialias: false });\r
    rendererRef.current = renderer;\r
\r
    const gl = renderer.gl;\r
    gl.canvas.style.position = 'absolute';\r
    gl.canvas.style.inset = '0';\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
    gl.canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';\r
    container.appendChild(gl.canvas);\r
\r
    const white = new Uint8Array([255, 255, 255, 255]);\r
    const gradientTex = new Texture(gl, {\r
      image: white,\r
      width: 1,\r
      height: 1,\r
      generateMipmaps: false,\r
      flipY: false\r
    });\r
\r
    gradientTex.minFilter = gl.LINEAR;\r
    gradientTex.magFilter = gl.LINEAR;\r
    gradientTex.wrapS = gl.CLAMP_TO_EDGE;\r
    gradientTex.wrapT = gl.CLAMP_TO_EDGE;\r
    gradTexRef.current = gradientTex;\r
\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uResolution: { value: [1, 1] as [number, number] },\r
        uTime: { value: 0 },\r
\r
        uIntensity: { value: 1 },\r
        uSpeed: { value: 1 },\r
        uAnimType: { value: 0 },\r
        uMouse: { value: [0.5, 0.5] as [number, number] },\r
        uColorCount: { value: 0 },\r
        uDistort: { value: 0 },\r
        uOffset: { value: [0, 0] as [number, number] },\r
        uGradient: { value: gradientTex },\r
        uNoiseAmount: { value: 0.8 },\r
        uRayCount: { value: 0 }\r
      }\r
    });\r
\r
    programRef.current = program;\r
\r
    const triangle = new Triangle(gl);\r
    const mesh = new Mesh(gl, { geometry: triangle, program });\r
    triRef.current = triangle;\r
    meshRef.current = mesh;\r
\r
    const resize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h);\r
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];\r
    };\r
\r
    let ro: ResizeObserver | null = null;\r
    if ('ResizeObserver' in window) {\r
      ro = new ResizeObserver(resize);\r
      ro.observe(container);\r
    } else {\r
      (window as Window).addEventListener('resize', resize);\r
    }\r
    resize();\r
\r
    const onPointer = (e: PointerEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / Math.max(rect.width, 1);\r
      const y = (e.clientY - rect.top) / Math.max(rect.height, 1);\r
      mouseTargetRef.current = [Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1)];\r
    };\r
    container.addEventListener('pointermove', onPointer, { passive: true });\r
\r
    let io: IntersectionObserver | null = null;\r
    if ('IntersectionObserver' in window) {\r
      io = new IntersectionObserver(\r
        entries => {\r
          if (entries[0]) isVisibleRef.current = entries[0].isIntersecting;\r
        },\r
        { root: null, threshold: 0.01 }\r
      );\r
      io.observe(container);\r
    }\r
    const onVis = () => {};\r
    document.addEventListener('visibilitychange', onVis);\r
\r
    let raf = 0;\r
    let last = performance.now();\r
    let accumTime = 0;\r
\r
    const update = (now: number) => {\r
      const dt = Math.max(0, now - last) * 0.001;\r
      last = now;\r
      const visible = isVisibleRef.current && !document.hidden;\r
      if (!pausedRef.current) accumTime += dt;\r
      if (!visible) {\r
        raf = requestAnimationFrame(update);\r
        return;\r
      }\r
      const tau = 0.02 + Math.max(0, Math.min(1, hoverDampRef.current)) * 0.5;\r
      const alpha = 1 - Math.exp(-dt / tau);\r
      const tgt = mouseTargetRef.current;\r
      const sm = mouseSmoothRef.current;\r
      sm[0] += (tgt[0] - sm[0]) * alpha;\r
      sm[1] += (tgt[1] - sm[1]) * alpha;\r
      program.uniforms.uMouse.value = sm as any;\r
      program.uniforms.uTime.value = accumTime;\r
      renderer.render({ scene: meshRef.current! });\r
      raf = requestAnimationFrame(update);\r
    };\r
    raf = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      container.removeEventListener('pointermove', onPointer);\r
      ro?.disconnect();\r
      if (!ro) window.removeEventListener('resize', resize);\r
      io?.disconnect();\r
      document.removeEventListener('visibilitychange', onVis);\r
      try {\r
        container.removeChild(gl.canvas);\r
      } catch (e) {\r
        void e;\r
      }\r
      meshRef.current = null;\r
      triRef.current = null;\r
      programRef.current = null;\r
      try {\r
        const glCtx = rendererRef.current?.gl;\r
        if (glCtx && gradTexRef.current?.texture) glCtx.deleteTexture(gradTexRef.current.texture);\r
      } catch (e) {\r
        void e;\r
      }\r
      programRef.current = null;\r
      rendererRef.current = null;\r
      gradTexRef.current = null;\r
      meshRef.current = null;\r
      triRef.current = null;\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    const canvas = rendererRef.current?.gl?.canvas as HTMLCanvasElement | undefined;\r
    if (canvas) {\r
      canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';\r
    }\r
  }, [mixBlendMode]);\r
\r
  useEffect(() => {\r
    const program = programRef.current;\r
    const renderer = rendererRef.current;\r
    const gradTex = gradTexRef.current;\r
    if (!program || !renderer || !gradTex) return;\r
\r
    program.uniforms.uIntensity.value = intensity ?? 1;\r
    program.uniforms.uSpeed.value = speed ?? 1;\r
\r
    const animTypeMap: Record<AnimationType, number> = {\r
      rotate: 0,\r
      rotate3d: 1,\r
      hover: 2\r
    };\r
    program.uniforms.uAnimType.value = animTypeMap[animationType ?? 'rotate'];\r
\r
    program.uniforms.uDistort.value = typeof distort === 'number' ? distort : 0;\r
\r
    const ox = toPx(offset?.x);\r
    const oy = toPx(offset?.y);\r
    program.uniforms.uOffset.value = [ox, oy];\r
    program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount ?? 0));\r
\r
    let count = 0;\r
    if (Array.isArray(colors) && colors.length > 0) {\r
      const gl = renderer.gl;\r
      const capped = colors.slice(0, 64);\r
      count = capped.length;\r
      const data = new Uint8Array(count * 4);\r
      for (let i = 0; i < count; i++) {\r
        const [r, g, b] = hexToRgb01(capped[i]);\r
        data[i * 4 + 0] = Math.round(r * 255);\r
        data[i * 4 + 1] = Math.round(g * 255);\r
        data[i * 4 + 2] = Math.round(b * 255);\r
        data[i * 4 + 3] = 255;\r
      }\r
      gradTex.image = data;\r
      gradTex.width = count;\r
      gradTex.height = 1;\r
      gradTex.minFilter = gl.LINEAR;\r
      gradTex.magFilter = gl.LINEAR;\r
      gradTex.wrapS = gl.CLAMP_TO_EDGE;\r
      gradTex.wrapT = gl.CLAMP_TO_EDGE;\r
      gradTex.flipY = false;\r
      gradTex.generateMipmaps = false;\r
      gradTex.format = gl.RGBA;\r
      gradTex.type = gl.UNSIGNED_BYTE;\r
      gradTex.needsUpdate = true;\r
    } else {\r
      count = 0;\r
    }\r
    program.uniforms.uColorCount.value = count;\r
  }, [intensity, speed, animationType, colors, distort, offset, rayCount]);\r
\r
  return <div className="prismatic-burst-container" ref={containerRef} />;\r
};\r
\r
export default PrismaticBurst;\r
`,Pr=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';\r
\r
type Offset = { x?: number | string; y?: number | string };\r
type AnimationType = 'rotate' | 'rotate3d' | 'hover';\r
\r
export type PrismaticBurstProps = {\r
  intensity?: number;\r
  speed?: number;\r
  animationType?: AnimationType;\r
  colors?: string[];\r
  distort?: number;\r
  paused?: boolean;\r
  offset?: Offset;\r
  hoverDampness?: number;\r
  rayCount?: number;\r
  mixBlendMode?: React.CSSProperties['mixBlendMode'] | 'none';\r
};\r
\r
const vertexShader = \`#version 300 es\r
in vec2 position;\r
in vec2 uv;\r
out vec2 vUv;\r
void main() {\r
    vUv = uv;\r
    gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const fragmentShader = \`#version 300 es\r
precision highp float;\r
precision highp int;\r
\r
out vec4 fragColor;\r
\r
uniform vec2  uResolution;\r
uniform float uTime;\r
\r
uniform float uIntensity;\r
uniform float uSpeed;\r
uniform int   uAnimType;\r
uniform vec2  uMouse;\r
uniform int   uColorCount;\r
uniform float uDistort;\r
uniform vec2  uOffset;\r
uniform sampler2D uGradient;\r
uniform float uNoiseAmount;\r
uniform int   uRayCount;\r
\r
float hash21(vec2 p){\r
    p = floor(p);\r
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));\r
    return fract(f);\r
}\r
\r
mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }\r
\r
float layeredNoise(vec2 fragPx){\r
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);\r
    vec2 q = rot30() * p;\r
    float n = 0.0;\r
    n += 0.40 * hash21(q);\r
    n += 0.25 * hash21(q * 2.0 + 17.0);\r
    n += 0.20 * hash21(q * 4.0 + 47.0);\r
    n += 0.10 * hash21(q * 8.0 + 113.0);\r
    n += 0.05 * hash21(q * 16.0 + 191.0);\r
    return n;\r
}\r
\r
vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){\r
    float focal = res.y * max(dist, 1e-3);\r
    return normalize(vec3(2.0 * (frag - offset) - res, focal));\r
}\r
\r
float edgeFade(vec2 frag, vec2 res, vec2 offset){\r
    vec2 toC = frag - 0.5 * res - offset;\r
    float r = length(toC) / (0.5 * min(res.x, res.y));\r
    float x = clamp(r, 0.0, 1.0);\r
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);\r
    float s = q * 0.5;\r
    s = pow(s, 1.5);\r
    float tail = 1.0 - pow(1.0 - s, 2.0);\r
    s = mix(s, tail, 0.2);\r
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;\r
    return clamp(s + dn, 0.0, 1.0);\r
}\r
\r
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }\r
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }\r
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }\r
\r
vec3 sampleGradient(float t){\r
    t = clamp(t, 0.0, 1.0);\r
    return texture(uGradient, vec2(t, 0.5)).rgb;\r
}\r
\r
vec2 rot2(vec2 v, float a){\r
    float s = sin(a), c = cos(a);\r
    return mat2(c, -s, s, c) * v;\r
}\r
\r
float bendAngle(vec3 q, float t){\r
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)\r
            + 0.7 * sin(q.y * 0.50 - t * 0.5)\r
            + 0.6 * sin(q.z * 0.60 + t * 0.7);\r
    return a;\r
}\r
\r
void main(){\r
    vec2 frag = gl_FragCoord.xy;\r
    float t = uTime * uSpeed;\r
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);\r
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);\r
    float marchT = 0.0;\r
    vec3 col = vec3(0.0);\r
    float n = layeredNoise(frag);\r
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));\r
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);\r
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;\r
\r
    mat3 rot3dMat = mat3(1.0);\r
    if(uAnimType == 1){\r
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);\r
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);\r
    }\r
    mat3 hoverMat = mat3(1.0);\r
    if(uAnimType == 2){\r
      vec2 m = uMouse * 2.0 - 1.0;\r
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);\r
      hoverMat = rotY(ang.y) * rotX(ang.x);\r
    }\r
\r
    for (int i = 0; i < 44; ++i) {\r
        vec3 P = marchT * dir;\r
        P.z -= 2.0;\r
        float rad = length(P);\r
        vec3 Pl = P * (10.0 / max(rad, 1e-6));\r
\r
        if(uAnimType == 0){\r
            Pl.xz *= M2;\r
        } else if(uAnimType == 1){\r
      Pl = rot3dMat * Pl;\r
        } else {\r
      Pl = hoverMat * Pl;\r
        }\r
\r
        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;\r
\r
        float grow = smoothstep(0.35, 3.0, marchT);\r
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);\r
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);\r
        vec3 Pb = Pl;\r
        Pb.xz = rot2(Pb.xz, a1);\r
        Pb.xy = rot2(Pb.xy, a2);\r
\r
        float rayPattern = smoothstep(\r
            0.5, 0.7,\r
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *\r
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))\r
        );\r
\r
        if (uRayCount > 0) {\r
            float ang = atan(Pb.y, Pb.x);\r
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);\r
            comb = pow(comb, 3.0);\r
            rayPattern *= smoothstep(0.15, 0.95, comb);\r
        }\r
\r
        vec3 spectralDefault = 1.0 + vec3(\r
            cos(marchT * 3.0 + 0.0),\r
            cos(marchT * 3.0 + 1.0),\r
            cos(marchT * 3.0 + 2.0)\r
        );\r
\r
        float saw = fract(marchT * 0.25);\r
        float tRay = saw * saw * (3.0 - 2.0 * saw);\r
        vec3 userGradient = 2.0 * sampleGradient(tRay);\r
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;\r
        vec3 base = (0.05 / (0.4 + stepLen))\r
                  * smoothstep(5.0, 0.0, rad)\r
                  * spectral;\r
\r
        col += base * rayPattern;\r
        marchT += stepLen;\r
    }\r
\r
    col *= edgeFade(frag, uResolution, uOffset);\r
    col *= uIntensity;\r
\r
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\r
}\`;\r
\r
const hexToRgb01 = (hex: string): [number, number, number] => {\r
  let h = hex.trim();\r
  if (h.startsWith('#')) h = h.slice(1);\r
  if (h.length === 3) {\r
    const r = h[0],\r
      g = h[1],\r
      b = h[2];\r
    h = r + r + g + g + b + b;\r
  }\r
  const intVal = parseInt(h, 16);\r
  if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];\r
  const r = ((intVal >> 16) & 255) / 255;\r
  const g = ((intVal >> 8) & 255) / 255;\r
  const b = (intVal & 255) / 255;\r
  return [r, g, b];\r
};\r
\r
const toPx = (v: number | string | undefined): number => {\r
  if (v == null) return 0;\r
  if (typeof v === 'number') return v;\r
  const s = String(v).trim();\r
  const num = parseFloat(s.replace('px', ''));\r
  return isNaN(num) ? 0 : num;\r
};\r
\r
const PrismaticBurst = ({\r
  intensity = 2,\r
  speed = 0.5,\r
  animationType = 'rotate3d',\r
  colors,\r
  distort = 0,\r
  paused = false,\r
  offset = { x: 0, y: 0 },\r
  hoverDampness = 0,\r
  rayCount,\r
  mixBlendMode = 'lighten'\r
}: PrismaticBurstProps) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const programRef = useRef<Program | null>(null);\r
  const rendererRef = useRef<Renderer | null>(null);\r
  const mouseTargetRef = useRef<[number, number]>([0.5, 0.5]);\r
  const mouseSmoothRef = useRef<[number, number]>([0.5, 0.5]);\r
  const pausedRef = useRef<boolean>(paused);\r
  const gradTexRef = useRef<Texture | null>(null);\r
  const hoverDampRef = useRef<number>(hoverDampness);\r
  const isVisibleRef = useRef<boolean>(true);\r
  const meshRef = useRef<Mesh | null>(null);\r
  const triRef = useRef<Triangle | null>(null);\r
\r
  useEffect(() => {\r
    pausedRef.current = paused;\r
  }, [paused]);\r
  useEffect(() => {\r
    hoverDampRef.current = hoverDampness;\r
  }, [hoverDampness]);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const dpr = Math.min(window.devicePixelRatio || 1, 2);\r
    const renderer = new Renderer({ dpr, alpha: false, antialias: false });\r
    rendererRef.current = renderer;\r
\r
    const gl = renderer.gl;\r
    gl.canvas.style.position = 'absolute';\r
    gl.canvas.style.inset = '0';\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
    gl.canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';\r
    container.appendChild(gl.canvas);\r
\r
    const white = new Uint8Array([255, 255, 255, 255]);\r
    const gradientTex = new Texture(gl, {\r
      image: white,\r
      width: 1,\r
      height: 1,\r
      generateMipmaps: false,\r
      flipY: false\r
    });\r
\r
    gradientTex.minFilter = gl.LINEAR;\r
    gradientTex.magFilter = gl.LINEAR;\r
    gradientTex.wrapS = gl.CLAMP_TO_EDGE;\r
    gradientTex.wrapT = gl.CLAMP_TO_EDGE;\r
    gradTexRef.current = gradientTex;\r
\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        uResolution: { value: [1, 1] as [number, number] },\r
        uTime: { value: 0 },\r
\r
        uIntensity: { value: 1 },\r
        uSpeed: { value: 1 },\r
        uAnimType: { value: 0 },\r
        uMouse: { value: [0.5, 0.5] as [number, number] },\r
        uColorCount: { value: 0 },\r
        uDistort: { value: 0 },\r
        uOffset: { value: [0, 0] as [number, number] },\r
        uGradient: { value: gradientTex },\r
        uNoiseAmount: { value: 0.8 },\r
        uRayCount: { value: 0 }\r
      }\r
    });\r
\r
    programRef.current = program;\r
\r
    const triangle = new Triangle(gl);\r
    const mesh = new Mesh(gl, { geometry: triangle, program });\r
    triRef.current = triangle;\r
    meshRef.current = mesh;\r
\r
    const resize = () => {\r
      const w = container.clientWidth || 1;\r
      const h = container.clientHeight || 1;\r
      renderer.setSize(w, h);\r
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];\r
    };\r
\r
    let ro: ResizeObserver | null = null;\r
    if ('ResizeObserver' in window) {\r
      ro = new ResizeObserver(resize);\r
      ro.observe(container);\r
    } else {\r
      (window as Window).addEventListener('resize', resize);\r
    }\r
    resize();\r
\r
    const onPointer = (e: PointerEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / Math.max(rect.width, 1);\r
      const y = (e.clientY - rect.top) / Math.max(rect.height, 1);\r
      mouseTargetRef.current = [Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1)];\r
    };\r
    container.addEventListener('pointermove', onPointer, { passive: true });\r
\r
    let io: IntersectionObserver | null = null;\r
    if ('IntersectionObserver' in window) {\r
      io = new IntersectionObserver(\r
        entries => {\r
          if (entries[0]) isVisibleRef.current = entries[0].isIntersecting;\r
        },\r
        { root: null, threshold: 0.01 }\r
      );\r
      io.observe(container);\r
    }\r
    const onVis = () => {};\r
    document.addEventListener('visibilitychange', onVis);\r
\r
    let raf = 0;\r
    let last = performance.now();\r
    let accumTime = 0;\r
\r
    const update = (now: number) => {\r
      const dt = Math.max(0, now - last) * 0.001;\r
      last = now;\r
      const visible = isVisibleRef.current && !document.hidden;\r
      if (!pausedRef.current) accumTime += dt;\r
      if (!visible) {\r
        raf = requestAnimationFrame(update);\r
        return;\r
      }\r
      const tau = 0.02 + Math.max(0, Math.min(1, hoverDampRef.current)) * 0.5;\r
      const alpha = 1 - Math.exp(-dt / tau);\r
      const tgt = mouseTargetRef.current;\r
      const sm = mouseSmoothRef.current;\r
      sm[0] += (tgt[0] - sm[0]) * alpha;\r
      sm[1] += (tgt[1] - sm[1]) * alpha;\r
      program.uniforms.uMouse.value = sm as any;\r
      program.uniforms.uTime.value = accumTime;\r
      renderer.render({ scene: meshRef.current! });\r
      raf = requestAnimationFrame(update);\r
    };\r
    raf = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      container.removeEventListener('pointermove', onPointer);\r
      ro?.disconnect();\r
      if (!ro) window.removeEventListener('resize', resize);\r
      io?.disconnect();\r
      document.removeEventListener('visibilitychange', onVis);\r
      try {\r
        container.removeChild(gl.canvas);\r
      } catch (e) {\r
        void e;\r
      }\r
      meshRef.current = null;\r
      triRef.current = null;\r
      programRef.current = null;\r
      try {\r
        const glCtx = rendererRef.current?.gl;\r
        if (glCtx && gradTexRef.current?.texture) glCtx.deleteTexture(gradTexRef.current.texture);\r
      } catch (e) {\r
        void e;\r
      }\r
      rendererRef.current = null;\r
      gradTexRef.current = null;\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    const canvas = rendererRef.current?.gl?.canvas as HTMLCanvasElement | undefined;\r
    if (canvas) {\r
      canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';\r
    }\r
  }, [mixBlendMode]);\r
\r
  useEffect(() => {\r
    const program = programRef.current;\r
    const renderer = rendererRef.current;\r
    const gradTex = gradTexRef.current;\r
    if (!program || !renderer || !gradTex) return;\r
\r
    program.uniforms.uIntensity.value = intensity ?? 1;\r
    program.uniforms.uSpeed.value = speed ?? 1;\r
\r
    const animTypeMap: Record<AnimationType, number> = {\r
      rotate: 0,\r
      rotate3d: 1,\r
      hover: 2\r
    };\r
    program.uniforms.uAnimType.value = animTypeMap[animationType ?? 'rotate'];\r
\r
    program.uniforms.uDistort.value = typeof distort === 'number' ? distort : 0;\r
\r
    const ox = toPx(offset?.x);\r
    const oy = toPx(offset?.y);\r
    program.uniforms.uOffset.value = [ox, oy];\r
    program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount ?? 0));\r
\r
    let count = 0;\r
    if (Array.isArray(colors) && colors.length > 0) {\r
      const gl = renderer.gl;\r
      const capped = colors.slice(0, 64);\r
      count = capped.length;\r
      const data = new Uint8Array(count * 4);\r
      for (let i = 0; i < count; i++) {\r
        const [r, g, b] = hexToRgb01(capped[i]);\r
        data[i * 4 + 0] = Math.round(r * 255);\r
        data[i * 4 + 1] = Math.round(g * 255);\r
        data[i * 4 + 2] = Math.round(b * 255);\r
        data[i * 4 + 3] = 255;\r
      }\r
      gradTex.image = data;\r
      gradTex.width = count;\r
      gradTex.height = 1;\r
      gradTex.minFilter = gl.LINEAR;\r
      gradTex.magFilter = gl.LINEAR;\r
      gradTex.wrapS = gl.CLAMP_TO_EDGE;\r
      gradTex.wrapT = gl.CLAMP_TO_EDGE;\r
      gradTex.flipY = false;\r
      gradTex.generateMipmaps = false;\r
      gradTex.format = gl.RGBA;\r
      gradTex.type = gl.UNSIGNED_BYTE;\r
      gradTex.needsUpdate = true;\r
    } else {\r
      count = 0;\r
    }\r
    program.uniforms.uColorCount.value = count;\r
  }, [intensity, speed, animationType, colors, distort, offset, rayCount]);\r
\r
  return <div className="w-full h-full relative overflow-hidden" ref={containerRef} />;\r
};\r
\r
export default PrismaticBurst;\r
`,Mr={dependencies:"ogl",usage:`import PrismaticBurst from './PrismaticBurst';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PrismaticBurst
    animationType="rotate3d"
    intensity={2}
    speed={0.5}
    distort={1.0}
    paused={false}
    offset={{ x: 0, y: 0 }}
    hoverDampness={0.25}
    rayCount={24}
    mixBlendMode="lighten"
    colors={['#ff007a', '#4d3dff', '#ffffff']}
  />
</div>`,code:Rr,css:Tr,tailwind:br,tsCode:wr,tsTailwind:Pr},Gr=()=>{const[l,o]=n.useState("rotate3d"),[c,h]=n.useState(2),[x,C]=n.useState(.5),[u,y]=n.useState(0),[R,g]=n.useState(.25),[N,z]=n.useState(0),[T,G]=n.useState(""),[F,_]=n.useState(""),[b,V]=n.useState(""),O=[T,F,b].filter(Boolean),S=[{name:"intensity",type:"number",default:"2",description:"Overall brightness multiplier applied after accumulation."},{name:"speed",type:"number",default:"0.5",description:"Global time multiplier controlling ray motion & distortion."},{name:"animationType",type:'"rotate" | "rotate3d" | "hover"',default:'"rotate3d"',description:"Core motion style: planar rotation, full 3D rotation, or pointer hover orbit"},{name:"colors",type:"string[]",default:"[]",description:"Optional array of hex colors used as a gradient (otherwise spectral)"},{name:"distort",type:"number",default:"0",description:"Amount of bend/distortion applied to marching space (adds organic wobble)"},{name:"paused",type:"boolean",default:"false",description:"Freeze time progression when true (animation stops)"},{name:"offset",type:"{ x?: number|string; y?: number|string }",default:"{ x: 0, y: 0 }",description:"Pixel (or CSS length) offset of focal origin from center"},{name:"hoverDampness",type:"number",default:"0",description:"Smoothing factor (0-1) for pointer tracking when animationType='hover'"},{name:"rayCount",type:"number",default:"undefined",description:"If > 0 applies an angular comb filter to produce discrete ray spokes"},{name:"mixBlendMode",type:"CSSProperties['mixBlendMode'] | 'none'",default:'"lighten"',description:"Canvas CSS mix-blend-mode (e.g. lighten, screen) or 'none' for normal"}];return r.jsxs(or,{children:[r.jsxs(sr,{children:[r.jsxs(ar,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[r.jsx(yr,{animationType:l,intensity:c,speed:x,distort:u,hoverDampness:R,rayCount:N||void 0,...O.length?{colors:O}:{}}),r.jsx(fr,{pillText:"New Background",headline:"A burst of dancing colors, beautifully unleashed"})]}),r.jsxs(ur,{children:[r.jsxs(H,{alignItems:"center",gap:4,mb:2,children:[r.jsxs(H,{alignItems:"center",children:[r.jsx(k,{fontSize:"sm",mr:2,children:"Color 1"}),r.jsx(J,{type:"color",value:T,onChange:p=>G(p.target.value),width:"50px",p:0})]}),r.jsxs(H,{alignItems:"center",children:[r.jsx(k,{fontSize:"sm",mr:2,children:"Color 2"}),r.jsx(J,{type:"color",value:F,onChange:p=>_(p.target.value),width:"50px",p:0})]}),r.jsxs(H,{alignItems:"center",children:[r.jsx(k,{fontSize:"sm",mr:2,children:"Color 3"}),r.jsx(J,{type:"color",value:b,onChange:p=>V(p.target.value),width:"50px",p:0})]})]}),r.jsx(dr,{title:"Animation Type",options:[{value:"rotate",label:"Rotate"},{value:"rotate3d",label:"Rotate 3D"},{value:"hover",label:"Hover"}],value:l,onChange:o,width:140}),r.jsx(I,{title:"Intensity",min:.1,max:5,step:.1,value:c,onChange:h}),r.jsx(I,{title:"Speed",min:0,max:2,step:.05,value:x,onChange:C}),r.jsx(I,{title:"Distort",min:0,max:10,step:.1,value:u,onChange:y}),r.jsx(I,{title:"Ray Count",min:0,max:64,step:1,value:N,onChange:z}),l==="hover"&&r.jsx(I,{title:"Hover Dampness",min:0,max:1,step:.01,value:R,onChange:g})]}),r.jsx(ir,{data:S}),r.jsx(mr,{dependencyList:["ogl"]})]}),r.jsx(lr,{children:r.jsx(cr,{codeObject:Mr})})]})};export{Gr as default};
