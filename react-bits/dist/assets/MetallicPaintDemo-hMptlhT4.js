import{r as d,j as x,B}from"./index-wsKSLPNH.js";import{T as F,P as X,a as k,C as G,b as Z}from"./PropTable-C4uPWs8h.js";import{C as z}from"./Customize-1m_ZNqR9.js";import{P as L}from"./PreviewSlider-m1G_aiYP.js";import{l as q}from"./react-bits-logo-small-black-B4yUq05Y.js";import{u as O}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";const j={patternScale:2,refraction:.015,edge:1,patternBlur:.005,liquid:.07,speed:.3};function W(u){const p=document.createElement("canvas"),T=p.getContext("2d");return new Promise((r,A)=>{if(!u||!T){A(new Error("Invalid file or context"));return}const o=new Image;o.crossOrigin="anonymous",o.onload=function(){u.type==="image/svg+xml"&&(o.width=1e3,o.height=1e3);const y=1e3,b=500;let n=o.naturalWidth,i=o.naturalHeight;(n>y||i>y||n<b||i<b)&&(n>i?n>y?(i=Math.round(i*y/n),n=y):n<b&&(i=Math.round(i*b/n),n=b):i>y?(n=Math.round(n*y/i),i=y):i<b&&(n=Math.round(n*b/i),i=b)),p.width=n,p.height=i;const l=document.createElement("canvas");l.width=n,l.height=i;const g=l.getContext("2d");g.drawImage(o,0,0,n,i);const v=g.getImageData(0,0,n,i).data,h=new Array(n*i).fill(!1);for(let e=0;e<i;e++)for(let a=0;a<n;a++){const s=(e*n+a)*4,m=v[s],R=v[s+1],D=v[s+2],N=v[s+3];h[e*n+a]=!(m===255&&R===255&&D===255&&N===255||N===0)}function I(e,a){return e<0||e>=n||a<0||a>=i?!1:h[a*n+e]}const w=new Array(n*i).fill(!1);for(let e=0;e<i;e++)for(let a=0;a<n;a++){const s=e*n+a;if(!h[s])continue;let m=!1;for(let R=e-1;R<=e+1&&!m;R++)for(let D=a-1;D<=a+1&&!m;D++)I(D,R)||(m=!0);m&&(w[s]=!0)}const f=new Array(n*i).fill(!1);for(let e=1;e<i-1;e++)for(let a=1;a<n-1;a++){const s=e*n+a;h[s]&&h[s-1]&&h[s+1]&&h[s-n]&&h[s+n]&&(f[s]=!0)}const E=new Float32Array(n*i).fill(0),U=new Float32Array(n*i).fill(0),M=.01,P=300;function _(e,a,s){return e<0||e>=n||a<0||a>=i||!h[a*n+e]?0:s[a*n+e]}for(let e=0;e<P;e++){for(let a=0;a<i;a++)for(let s=0;s<n;s++){const m=a*n+s;if(!h[m]||w[m]){U[m]=0;continue}const R=_(s+1,a,E)+_(s-1,a,E)+_(s,a+1,E)+_(s,a-1,E);U[m]=(M+R)/4}E.set(U)}let S=0;for(let e=0;e<n*i;e++)E[e]>S&&(S=E[e]);const C=2,c=T.createImageData(n,i);for(let e=0;e<i;e++)for(let a=0;a<n;a++){const s=e*n+a,m=s*4;if(!h[s])c.data[m]=255,c.data[m+1]=255,c.data[m+2]=255,c.data[m+3]=255;else{const R=E[s]/S,N=255*(1-Math.pow(R,C));c.data[m]=N,c.data[m+1]=N,c.data[m+2]=N,c.data[m+3]=255}}T.putImageData(c,0,0),p.toBlob(e=>{if(!e){A(new Error("Failed to create PNG blob"));return}r({imageData:c,pngBlob:e})},"image/png")},o.onerror=()=>A(new Error("Failed to load image")),o.src=URL.createObjectURL(u)})}const V=`#version 300 es
precision mediump float;

in vec2 a_position;
out vec2 vUv;

void main() {
    vUv = .5 * (a_position + 1.);
    gl_Position = vec4(a_position, 0.0, 1.0);
}`,Y=`#version 300 es
precision mediump float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D u_image_texture;
uniform float u_time;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_patternScale;
uniform float u_refraction;
uniform float u_edge;
uniform float u_patternBlur;
uniform float u_liquid;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
    m = m*m;
    m = m*m;
    vec3 x = 2. * fract(p * C.www) - 1.;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130. * dot(m, g);
}

vec2 get_img_uv() {
    vec2 img_uv = vUv;
    img_uv -= .5;
    if (u_ratio > u_img_ratio) {
        img_uv.x = img_uv.x * u_ratio / u_img_ratio;
    } else {
        img_uv.y = img_uv.y * u_img_ratio / u_ratio;
    }
    float scale_factor = 1.;
    img_uv *= scale_factor;
    img_uv += .5;
    img_uv.y = 1. - img_uv.y;
    return img_uv;
}
vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
float get_color_channel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, float b) {
    float ch = c2;
    float border = 0.;
    float blur = u_patternBlur + extra_blur;
    ch = mix(ch, c1, smoothstep(.0, blur, stripe_p));
    border = w[0];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));
    b = smoothstep(.2, .8, b);
    border = w[0] + .4 * (1. - b) * w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));
    border = w[0] + .5 * (1. - b) * w[1];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));
    border = w[0] + w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));
    float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
    float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));
    return ch;
}
float get_img_frame_alpha(vec2 uv, float img_frame_width) {
    float img_frame_alpha = smoothstep(0., img_frame_width, uv.x) * smoothstep(1., 1. - img_frame_width, uv.x);
    img_frame_alpha *= smoothstep(0., img_frame_width, uv.y) * smoothstep(1., 1. - img_frame_width, uv.y);
    return img_frame_alpha;
}
void main() {
    vec2 uv = vUv;
    uv.y = 1. - uv.y;
    uv.x *= u_ratio;
    float diagonal = uv.x - uv.y;
    float t = .001 * u_time;
    vec2 img_uv = get_img_uv();
    vec4 img = texture(u_image_texture, img_uv);
    vec3 color = vec3(0.);
    float opacity = 1.;
    vec3 color1 = vec3(.98, 0.98, 1.);
    vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, uv.x + uv.y));
    float edge = img.r;
    vec2 grad_uv = uv;
    grad_uv -= .5;
    float dist = length(grad_uv + vec2(0., .2 * diagonal));
    grad_uv = rotate(grad_uv, (.25 - .2 * diagonal) * PI);
    float bulge = pow(1.8 * dist, 1.2);
    bulge = 1. - bulge;
    bulge *= pow(uv.y, .3);
    float cycle_width = u_patternScale;
    float thin_strip_1_ratio = .12 / cycle_width * (1. - .4 * bulge);
    float thin_strip_2_ratio = .07 / cycle_width * (1. + .4 * bulge);
    float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);
    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;
    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;
    opacity = 1. - smoothstep(.9 - .5 * u_edge, 1. - .5 * u_edge, edge);
    opacity *= get_img_frame_alpha(img_uv, 0.01);
    float noise = snoise(uv - t);
    edge += (1. - edge) * u_liquid * noise;
    float refr = 0.;
    refr += (1. - bulge);
    refr = clamp(refr, 0., 1.);
    float dir = grad_uv.x;
    dir += diagonal;
    dir -= 2. * noise * diagonal * (smoothstep(0., 1., edge) * smoothstep(1., 0., edge));
    bulge *= clamp(pow(uv.y, .1), .3, 1.);
    dir *= (.1 + (1.1 - edge) * bulge);
    dir *= smoothstep(1., .7, edge);
    dir += .18 * (smoothstep(.1, .2, uv.y) * smoothstep(.4, .2, uv.y));
    dir += .03 * (smoothstep(.1, .2, 1. - uv.y) * smoothstep(.4, .2, 1. - uv.y));
    dir *= (.5 + .5 * pow(uv.y, 2.));
    dir *= cycle_width;
    dir -= t;
    float refr_r = refr;
    refr_r += .03 * bulge * noise;
    float refr_b = 1.3 * refr;
    refr_r += 5. * (smoothstep(-.1, .2, uv.y) * smoothstep(.5, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(1., .4, bulge));
    refr_r -= diagonal;
    refr_b += (smoothstep(0., .4, uv.y) * smoothstep(.8, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(.8, .4, bulge));
    refr_b -= .2 * edge;
    refr_r *= u_refraction;
    refr_b *= u_refraction;
    vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
    w[1] -= .02 * smoothstep(.0, 1., edge + bulge);
    float stripe_r = mod(dir + refr_r, 1.);
    float r = get_color_channel(color1.r, color2.r, stripe_r, w, 0.02 + .03 * u_refraction * bulge, bulge);
    float stripe_g = mod(dir, 1.);
    float g = get_color_channel(color1.g, color2.g, stripe_g, w, 0.01 / (1. - diagonal), bulge);
    float stripe_b = mod(dir - refr_b, 1.);
    float b = get_color_channel(color1.b, color2.b, stripe_b, w, .01, bulge);
    color = vec3(r, g, b);
    color *= opacity;
    fragColor = vec4(color, opacity);
}
`;function H({imageData:u,params:p=j}){const T=d.useRef(null),[r,A]=d.useState(null),[o,y]=d.useState({}),b=d.useRef(0),n=d.useRef(0);function i(){!r||!o||(r.uniform1f(o.u_edge,p.edge),r.uniform1f(o.u_patternBlur,p.patternBlur),r.uniform1f(o.u_time,0),r.uniform1f(o.u_patternScale,p.patternScale),r.uniform1f(o.u_refraction,p.refraction),r.uniform1f(o.u_liquid,p.liquid))}return d.useEffect(()=>{function l(){const g=T.current,t=g==null?void 0:g.getContext("webgl2",{antialias:!0,alpha:!0});if(!g||!t)return;function v(_,S,C){const c=_.createShader(C);return c?(_.shaderSource(c,S),_.compileShader(c),_.getShaderParameter(c,_.COMPILE_STATUS)?c:(console.error("An error occurred compiling the shaders: "+_.getShaderInfoLog(c)),_.deleteShader(c),null)):null}const h=v(t,V,t.VERTEX_SHADER),I=v(t,Y,t.FRAGMENT_SHADER),w=t.createProgram();if(!w||!h||!I)return;if(t.attachShader(w,h),t.attachShader(w,I),t.linkProgram(w),!t.getProgramParameter(w,t.LINK_STATUS))return console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(w)),null;function f(_,S){var e;let C={},c=S.getProgramParameter(_,S.ACTIVE_UNIFORMS);for(let a=0;a<c;a++){let s=(e=S.getActiveUniform(_,a))==null?void 0:e.name;s&&(C[s]=S.getUniformLocation(_,s))}return C}const E=f(w,t);y(E);const U=new Float32Array([-1,-1,1,-1,-1,1,1,1]),M=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,M),t.bufferData(t.ARRAY_BUFFER,U,t.STATIC_DRAW),t.useProgram(w);const P=t.getAttribLocation(w,"a_position");t.enableVertexAttribArray(P),t.bindBuffer(t.ARRAY_BUFFER,M),t.vertexAttribPointer(P,2,t.FLOAT,!1,0,0),A(t)}l(),i()},[]),d.useEffect(()=>{!r||!o||i()},[r,p,o]),d.useEffect(()=>{if(!r||!o)return;let l;function g(t){const v=t-n.current;n.current=t,b.current+=v*p.speed,r.uniform1f(o.u_time,b.current),r.drawArrays(r.TRIANGLE_STRIP,0,4),l=requestAnimationFrame(g)}return n.current=performance.now(),l=requestAnimationFrame(g),()=>{cancelAnimationFrame(l)}},[r,p.speed]),d.useEffect(()=>{const l=T.current;if(!l||!r||!o)return;function g(){if(!l||!r||!o||!u)return;const t=u.width/u.height;r.uniform1f(o.u_img_ratio,t);const v=1e3;l.width=v*devicePixelRatio,l.height=v*devicePixelRatio,r.viewport(0,0,l.height,l.height),r.uniform1f(o.u_ratio,1),r.uniform1f(o.u_img_ratio,t)}return g(),window.addEventListener("resize",g),()=>{window.removeEventListener("resize",g)}},[r,o,u]),d.useEffect(()=>{if(!r||!o)return;const l=r.getParameter(r.TEXTURE_BINDING_2D);l&&r.deleteTexture(l);const g=r.createTexture();r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,g),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.pixelStorei(r.UNPACK_ALIGNMENT,1);try{r.texImage2D(r.TEXTURE_2D,0,r.RGBA,u==null?void 0:u.width,u==null?void 0:u.height,0,r.RGBA,r.UNSIGNED_BYTE,u==null?void 0:u.data),r.uniform1i(o.u_image_texture,0)}catch(t){console.error("Error uploading texture:",t)}return()=>{g&&r.deleteTexture(g)}},[r,o,u]),x.jsx("canvas",{ref:T,className:"paint-container"})}const K=`/* eslint-disable react-hooks/exhaustive-deps */\r
/* eslint-disable react-refresh/only-export-components */\r
'use client';\r
\r
import { useEffect, useRef, useState } from 'react';\r
import './MetallicPaint.css';\r
\r
const defaultParams = {\r
  patternScale: 2,\r
  refraction: 0.015,\r
  edge: 1,\r
  patternBlur: 0.005,\r
  liquid: 0.07,\r
  speed: 0.3\r
};\r
\r
export function parseLogoImage(file) {\r
  const canvas = document.createElement('canvas');\r
  const ctx = canvas.getContext('2d');\r
\r
  return new Promise((resolve, reject) => {\r
    if (!file || !ctx) {\r
      reject(new Error('Invalid file or context'));\r
      return;\r
    }\r
\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.onload = function () {\r
      if (file.type === 'image/svg+xml') {\r
        img.width = 1000;\r
        img.height = 1000;\r
      }\r
\r
      const MAX_SIZE = 1000;\r
      const MIN_SIZE = 500;\r
      let width = img.naturalWidth;\r
      let height = img.naturalHeight;\r
\r
      if (width > MAX_SIZE || height > MAX_SIZE || width < MIN_SIZE || height < MIN_SIZE) {\r
        if (width > height) {\r
          if (width > MAX_SIZE) {\r
            height = Math.round((height * MAX_SIZE) / width);\r
            width = MAX_SIZE;\r
          } else if (width < MIN_SIZE) {\r
            height = Math.round((height * MIN_SIZE) / width);\r
            width = MIN_SIZE;\r
          }\r
        } else {\r
          if (height > MAX_SIZE) {\r
            width = Math.round((width * MAX_SIZE) / height);\r
            height = MAX_SIZE;\r
          } else if (height < MIN_SIZE) {\r
            width = Math.round((width * MIN_SIZE) / height);\r
            height = MIN_SIZE;\r
          }\r
        }\r
      }\r
\r
      canvas.width = width;\r
      canvas.height = height;\r
\r
      const shapeCanvas = document.createElement('canvas');\r
      shapeCanvas.width = width;\r
      shapeCanvas.height = height;\r
      const shapeCtx = shapeCanvas.getContext('2d');\r
      shapeCtx.drawImage(img, 0, 0, width, height);\r
\r
      const shapeImageData = shapeCtx.getImageData(0, 0, width, height);\r
      const data = shapeImageData.data;\r
      const shapeMask = new Array(width * height).fill(false);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx4 = (y * width + x) * 4;\r
          const r = data[idx4];\r
          const g = data[idx4 + 1];\r
          const b = data[idx4 + 2];\r
          const a = data[idx4 + 3];\r
          shapeMask[y * width + x] = !((r === 255 && g === 255 && b === 255 && a === 255) || a === 0);\r
        }\r
      }\r
\r
      function inside(x, y) {\r
        if (x < 0 || x >= width || y < 0 || y >= height) return false;\r
        return shapeMask[y * width + x];\r
      }\r
\r
      const boundaryMask = new Array(width * height).fill(false);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx = y * width + x;\r
          if (!shapeMask[idx]) continue;\r
          let isBoundary = false;\r
          for (let ny = y - 1; ny <= y + 1 && !isBoundary; ny++) {\r
            for (let nx = x - 1; nx <= x + 1 && !isBoundary; nx++) {\r
              if (!inside(nx, ny)) {\r
                isBoundary = true;\r
              }\r
            }\r
          }\r
          if (isBoundary) {\r
            boundaryMask[idx] = true;\r
          }\r
        }\r
      }\r
\r
      const interiorMask = new Array(width * height).fill(false);\r
      for (let y = 1; y < height - 1; y++) {\r
        for (let x = 1; x < width - 1; x++) {\r
          const idx = y * width + x;\r
          if (\r
            shapeMask[idx] &&\r
            shapeMask[idx - 1] &&\r
            shapeMask[idx + 1] &&\r
            shapeMask[idx - width] &&\r
            shapeMask[idx + width]\r
          ) {\r
            interiorMask[idx] = true;\r
          }\r
        }\r
      }\r
\r
      const u = new Float32Array(width * height).fill(0);\r
      const newU = new Float32Array(width * height).fill(0);\r
      const C = 0.01;\r
      const ITERATIONS = 300;\r
\r
      function getU(x, y, arr) {\r
        if (x < 0 || x >= width || y < 0 || y >= height) return 0;\r
        if (!shapeMask[y * width + x]) return 0;\r
        return arr[y * width + x];\r
      }\r
\r
      for (let iter = 0; iter < ITERATIONS; iter++) {\r
        for (let y = 0; y < height; y++) {\r
          for (let x = 0; x < width; x++) {\r
            const idx = y * width + x;\r
            if (!shapeMask[idx] || boundaryMask[idx]) {\r
              newU[idx] = 0;\r
              continue;\r
            }\r
            const sumN = getU(x + 1, y, u) + getU(x - 1, y, u) + getU(x, y + 1, u) + getU(x, y - 1, u);\r
            newU[idx] = (C + sumN) / 4;\r
          }\r
        }\r
        u.set(newU);\r
      }\r
\r
      let maxVal = 0;\r
      for (let i = 0; i < width * height; i++) {\r
        if (u[i] > maxVal) maxVal = u[i];\r
      }\r
      const alpha = 2.0;\r
      const outImg = ctx.createImageData(width, height);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx = y * width + x;\r
          const px = idx * 4;\r
          if (!shapeMask[idx]) {\r
            outImg.data[px] = 255;\r
            outImg.data[px + 1] = 255;\r
            outImg.data[px + 2] = 255;\r
            outImg.data[px + 3] = 255;\r
          } else {\r
            const raw = u[idx] / maxVal;\r
            const remapped = Math.pow(raw, alpha);\r
            const gray = 255 * (1 - remapped);\r
            outImg.data[px] = gray;\r
            outImg.data[px + 1] = gray;\r
            outImg.data[px + 2] = gray;\r
            outImg.data[px + 3] = 255;\r
          }\r
        }\r
      }\r
\r
      ctx.putImageData(outImg, 0, 0);\r
\r
      canvas.toBlob(blob => {\r
        if (!blob) {\r
          reject(new Error('Failed to create PNG blob'));\r
          return;\r
        }\r
        resolve({\r
          imageData: outImg,\r
          pngBlob: blob\r
        });\r
      }, 'image/png');\r
    };\r
\r
    img.onerror = () => reject(new Error('Failed to load image'));\r
    img.src = URL.createObjectURL(file);\r
  });\r
}\r
\r
const vertexShaderSource = \`#version 300 es\r
precision mediump float;\r
\r
in vec2 a_position;\r
out vec2 vUv;\r
\r
void main() {\r
    vUv = .5 * (a_position + 1.);\r
    gl_Position = vec4(a_position, 0.0, 1.0);\r
}\`;\r
\r
const liquidFragSource = \`#version 300 es\r
precision mediump float;\r
\r
in vec2 vUv;\r
out vec4 fragColor;\r
\r
uniform sampler2D u_image_texture;\r
uniform float u_time;\r
uniform float u_ratio;\r
uniform float u_img_ratio;\r
uniform float u_patternScale;\r
uniform float u_refraction;\r
uniform float u_edge;\r
uniform float u_patternBlur;\r
uniform float u_liquid;\r
\r
#define TWO_PI 6.28318530718\r
#define PI 3.14159265358979323846\r
\r
vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }\r
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }\r
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }\r
float snoise(vec2 v) {\r
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);\r
    vec2 i = floor(v + dot(v, C.yy));\r
    vec2 x0 = v - i + dot(i, C.xx);\r
    vec2 i1;\r
    i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);\r
    vec4 x12 = x0.xyxy + C.xxzz;\r
    x12.xy -= i1;\r
    i = mod289(i);\r
    vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));\r
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);\r
    m = m*m;\r
    m = m*m;\r
    vec3 x = 2. * fract(p * C.www) - 1.;\r
    vec3 h = abs(x) - 0.5;\r
    vec3 ox = floor(x + 0.5);\r
    vec3 a0 = x - ox;\r
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
    vec3 g;\r
    g.x = a0.x * x0.x + h.x * x0.y;\r
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
    return 130. * dot(m, g);\r
}\r
\r
vec2 get_img_uv() {\r
    vec2 img_uv = vUv;\r
    img_uv -= .5;\r
    if (u_ratio > u_img_ratio) {\r
        img_uv.x = img_uv.x * u_ratio / u_img_ratio;\r
    } else {\r
        img_uv.y = img_uv.y * u_img_ratio / u_ratio;\r
    }\r
    float scale_factor = 1.;\r
    img_uv *= scale_factor;\r
    img_uv += .5;\r
    img_uv.y = 1. - img_uv.y;\r
    return img_uv;\r
}\r
vec2 rotate(vec2 uv, float th) {\r
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;\r
}\r
float get_color_channel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, float b) {\r
    float ch = c2;\r
    float border = 0.;\r
    float blur = u_patternBlur + extra_blur;\r
    ch = mix(ch, c1, smoothstep(.0, blur, stripe_p));\r
    border = w[0];\r
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\r
    b = smoothstep(.2, .8, b);\r
    border = w[0] + .4 * (1. - b) * w[1];\r
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\r
    border = w[0] + .5 * (1. - b) * w[1];\r
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\r
    border = w[0] + w[1];\r
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\r
    float gradient_t = (stripe_p - w[0] - w[1]) / w[2];\r
    float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));\r
    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));\r
    return ch;\r
}\r
float get_img_frame_alpha(vec2 uv, float img_frame_width) {\r
    float img_frame_alpha = smoothstep(0., img_frame_width, uv.x) * smoothstep(1., 1. - img_frame_width, uv.x);\r
    img_frame_alpha *= smoothstep(0., img_frame_width, uv.y) * smoothstep(1., 1. - img_frame_width, uv.y);\r
    return img_frame_alpha;\r
}\r
void main() {\r
    vec2 uv = vUv;\r
    uv.y = 1. - uv.y;\r
    uv.x *= u_ratio;\r
    float diagonal = uv.x - uv.y;\r
    float t = .001 * u_time;\r
    vec2 img_uv = get_img_uv();\r
    vec4 img = texture(u_image_texture, img_uv);\r
    vec3 color = vec3(0.);\r
    float opacity = 1.;\r
    vec3 color1 = vec3(.98, 0.98, 1.);\r
    vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, uv.x + uv.y));\r
    float edge = img.r;\r
    vec2 grad_uv = uv;\r
    grad_uv -= .5;\r
    float dist = length(grad_uv + vec2(0., .2 * diagonal));\r
    grad_uv = rotate(grad_uv, (.25 - .2 * diagonal) * PI);\r
    float bulge = pow(1.8 * dist, 1.2);\r
    bulge = 1. - bulge;\r
    bulge *= pow(uv.y, .3);\r
    float cycle_width = u_patternScale;\r
    float thin_strip_1_ratio = .12 / cycle_width * (1. - .4 * bulge);\r
    float thin_strip_2_ratio = .07 / cycle_width * (1. + .4 * bulge);\r
    float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);\r
    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;\r
    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;\r
    opacity = 1. - smoothstep(.9 - .5 * u_edge, 1. - .5 * u_edge, edge);\r
    opacity *= get_img_frame_alpha(img_uv, 0.01);\r
    float noise = snoise(uv - t);\r
    edge += (1. - edge) * u_liquid * noise;\r
    float refr = 0.;\r
    refr += (1. - bulge);\r
    refr = clamp(refr, 0., 1.);\r
    float dir = grad_uv.x;\r
    dir += diagonal;\r
    dir -= 2. * noise * diagonal * (smoothstep(0., 1., edge) * smoothstep(1., 0., edge));\r
    bulge *= clamp(pow(uv.y, .1), .3, 1.);\r
    dir *= (.1 + (1.1 - edge) * bulge);\r
    dir *= smoothstep(1., .7, edge);\r
    dir += .18 * (smoothstep(.1, .2, uv.y) * smoothstep(.4, .2, uv.y));\r
    dir += .03 * (smoothstep(.1, .2, 1. - uv.y) * smoothstep(.4, .2, 1. - uv.y));\r
    dir *= (.5 + .5 * pow(uv.y, 2.));\r
    dir *= cycle_width;\r
    dir -= t;\r
    float refr_r = refr;\r
    refr_r += .03 * bulge * noise;\r
    float refr_b = 1.3 * refr;\r
    refr_r += 5. * (smoothstep(-.1, .2, uv.y) * smoothstep(.5, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(1., .4, bulge));\r
    refr_r -= diagonal;\r
    refr_b += (smoothstep(0., .4, uv.y) * smoothstep(.8, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(.8, .4, bulge));\r
    refr_b -= .2 * edge;\r
    refr_r *= u_refraction;\r
    refr_b *= u_refraction;\r
    vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);\r
    w[1] -= .02 * smoothstep(.0, 1., edge + bulge);\r
    float stripe_r = mod(dir + refr_r, 1.);\r
    float r = get_color_channel(color1.r, color2.r, stripe_r, w, 0.02 + .03 * u_refraction * bulge, bulge);\r
    float stripe_g = mod(dir, 1.);\r
    float g = get_color_channel(color1.g, color2.g, stripe_g, w, 0.01 / (1. - diagonal), bulge);\r
    float stripe_b = mod(dir - refr_b, 1.);\r
    float b = get_color_channel(color1.b, color2.b, stripe_b, w, .01, bulge);\r
    color = vec3(r, g, b);\r
    color *= opacity;\r
    fragColor = vec4(color, opacity);\r
}\r
\`;\r
\r
export default function MetallicPaint({ imageData, params = defaultParams }) {\r
  const canvasRef = useRef(null);\r
  const [gl, setGl] = useState(null);\r
  const [uniforms, setUniforms] = useState({});\r
  const totalAnimationTime = useRef(0);\r
  const lastRenderTime = useRef(0);\r
\r
  function updateUniforms() {\r
    if (!gl || !uniforms) return;\r
    gl.uniform1f(uniforms.u_edge, params.edge);\r
    gl.uniform1f(uniforms.u_patternBlur, params.patternBlur);\r
    gl.uniform1f(uniforms.u_time, 0);\r
    gl.uniform1f(uniforms.u_patternScale, params.patternScale);\r
    gl.uniform1f(uniforms.u_refraction, params.refraction);\r
    gl.uniform1f(uniforms.u_liquid, params.liquid);\r
  }\r
\r
  useEffect(() => {\r
    function initShader() {\r
      const canvas = canvasRef.current;\r
      const gl = canvas?.getContext('webgl2', {\r
        antialias: true,\r
        alpha: true\r
      });\r
      if (!canvas || !gl) {\r
        return;\r
      }\r
\r
      function createShader(gl, sourceCode, type) {\r
        const shader = gl.createShader(type);\r
        if (!shader) {\r
          return null;\r
        }\r
\r
        gl.shaderSource(shader, sourceCode);\r
        gl.compileShader(shader);\r
\r
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
          console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));\r
          gl.deleteShader(shader);\r
          return null;\r
        }\r
\r
        return shader;\r
      }\r
\r
      const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);\r
      const fragmentShader = createShader(gl, liquidFragSource, gl.FRAGMENT_SHADER);\r
      const program = gl.createProgram();\r
      if (!program || !vertexShader || !fragmentShader) {\r
        return;\r
      }\r
\r
      gl.attachShader(program, vertexShader);\r
      gl.attachShader(program, fragmentShader);\r
      gl.linkProgram(program);\r
\r
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));\r
        return null;\r
      }\r
\r
      function getUniforms(program, gl) {\r
        let uniforms = {};\r
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);\r
        for (let i = 0; i < uniformCount; i++) {\r
          let uniformName = gl.getActiveUniform(program, i)?.name;\r
          if (!uniformName) continue;\r
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);\r
        }\r
        return uniforms;\r
      }\r
      const uniforms = getUniforms(program, gl);\r
      setUniforms(uniforms);\r
\r
      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);\r
      const vertexBuffer = gl.createBuffer();\r
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\r
\r
      gl.useProgram(program);\r
\r
      const positionLocation = gl.getAttribLocation(program, 'a_position');\r
      gl.enableVertexAttribArray(positionLocation);\r
\r
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);\r
\r
      setGl(gl);\r
    }\r
\r
    initShader();\r
    updateUniforms();\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
    updateUniforms();\r
  }, [gl, params, uniforms]);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
\r
    let renderId;\r
\r
    function render(currentTime) {\r
      const deltaTime = currentTime - lastRenderTime.current;\r
      lastRenderTime.current = currentTime;\r
\r
      totalAnimationTime.current += deltaTime * params.speed;\r
      gl.uniform1f(uniforms.u_time, totalAnimationTime.current);\r
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);\r
      renderId = requestAnimationFrame(render);\r
    }\r
\r
    lastRenderTime.current = performance.now();\r
    renderId = requestAnimationFrame(render);\r
\r
    return () => {\r
      cancelAnimationFrame(renderId);\r
    };\r
  }, [gl, params.speed]);\r
\r
  useEffect(() => {\r
    const canvasEl = canvasRef.current;\r
    if (!canvasEl || !gl || !uniforms) return;\r
\r
    function resizeCanvas() {\r
      if (!canvasEl || !gl || !uniforms || !imageData) return;\r
      const imgRatio = imageData.width / imageData.height;\r
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);\r
\r
      const side = 1000;\r
      canvasEl.width = side * devicePixelRatio;\r
      canvasEl.height = side * devicePixelRatio;\r
      gl.viewport(0, 0, canvasEl.height, canvasEl.height);\r
      gl.uniform1f(uniforms.u_ratio, 1);\r
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);\r
    }\r
\r
    resizeCanvas();\r
    window.addEventListener('resize', resizeCanvas);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
    };\r
  }, [gl, uniforms, imageData]);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
\r
    const existingTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);\r
    if (existingTexture) {\r
      gl.deleteTexture(existingTexture);\r
    }\r
\r
    const imageTexture = gl.createTexture();\r
    gl.activeTexture(gl.TEXTURE0);\r
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);\r
\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
\r
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);\r
\r
    try {\r
      gl.texImage2D(\r
        gl.TEXTURE_2D,\r
        0,\r
        gl.RGBA,\r
        imageData?.width,\r
        imageData?.height,\r
        0,\r
        gl.RGBA,\r
        gl.UNSIGNED_BYTE,\r
        imageData?.data\r
      );\r
\r
      gl.uniform1i(uniforms.u_image_texture, 0);\r
    } catch (e) {\r
      console.error('Error uploading texture:', e);\r
    }\r
\r
    return () => {\r
      if (imageTexture) {\r
        gl.deleteTexture(imageTexture);\r
      }\r
    };\r
  }, [gl, uniforms, imageData]);\r
\r
  return <canvas ref={canvasRef} className="paint-container" />;\r
}\r
`,J=`.paint-container {\r
  display: block;\r
  height: 100%;\r
  width: 100%;\r
  object-fit: contain;\r
}\r
`,Q=`/* eslint-disable react-hooks/exhaustive-deps */\r
/* eslint-disable react-refresh/only-export-components */\r
'use client';\r
\r
import { useEffect, useRef, useState } from 'react';\r
\r
const defaultParams = {\r
  patternScale: 2,\r
  refraction: 0.015,\r
  edge: 1,\r
  patternBlur: 0.005,\r
  liquid: 0.07,\r
  speed: 0.3\r
};\r
\r
export function parseLogoImage(file) {\r
  const canvas = document.createElement('canvas');\r
  const ctx = canvas.getContext('2d');\r
\r
  return new Promise((resolve, reject) => {\r
    if (!file || !ctx) {\r
      reject(new Error('Invalid file or context'));\r
      return;\r
    }\r
\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.onload = function () {\r
      if (file.type === 'image/svg+xml') {\r
        img.width = 1000;\r
        img.height = 1000;\r
      }\r
\r
      const MAX_SIZE = 1000;\r
      const MIN_SIZE = 500;\r
      let width = img.naturalWidth;\r
      let height = img.naturalHeight;\r
\r
      if (width > MAX_SIZE || height > MAX_SIZE || width < MIN_SIZE || height < MIN_SIZE) {\r
        if (width > height) {\r
          if (width > MAX_SIZE) {\r
            height = Math.round((height * MAX_SIZE) / width);\r
            width = MAX_SIZE;\r
          } else if (width < MIN_SIZE) {\r
            height = Math.round((height * MIN_SIZE) / width);\r
            width = MIN_SIZE;\r
          }\r
        } else {\r
          if (height > MAX_SIZE) {\r
            width = Math.round((width * MAX_SIZE) / height);\r
            height = MAX_SIZE;\r
          } else if (height < MIN_SIZE) {\r
            width = Math.round((width * MIN_SIZE) / height);\r
            height = MIN_SIZE;\r
          }\r
        }\r
      }\r
\r
      canvas.width = width;\r
      canvas.height = height;\r
\r
      const shapeCanvas = document.createElement('canvas');\r
      shapeCanvas.width = width;\r
      shapeCanvas.height = height;\r
      const shapeCtx = shapeCanvas.getContext('2d');\r
      shapeCtx.drawImage(img, 0, 0, width, height);\r
\r
      const shapeImageData = shapeCtx.getImageData(0, 0, width, height);\r
      const data = shapeImageData.data;\r
      const shapeMask = new Array(width * height).fill(false);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx4 = (y * width + x) * 4;\r
          const r = data[idx4];\r
          const g = data[idx4 + 1];\r
          const b = data[idx4 + 2];\r
          const a = data[idx4 + 3];\r
          shapeMask[y * width + x] = !((r === 255 && g === 255 && b === 255 && a === 255) || a === 0);\r
        }\r
      }\r
\r
      function inside(x, y) {\r
        if (x < 0 || x >= width || y < 0 || y >= height) return false;\r
        return shapeMask[y * width + x];\r
      }\r
\r
      const boundaryMask = new Array(width * height).fill(false);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx = y * width + x;\r
          if (!shapeMask[idx]) continue;\r
          let isBoundary = false;\r
          for (let ny = y - 1; ny <= y + 1 && !isBoundary; ny++) {\r
            for (let nx = x - 1; nx <= x + 1 && !isBoundary; nx++) {\r
              if (!inside(nx, ny)) {\r
                isBoundary = true;\r
              }\r
            }\r
          }\r
          if (isBoundary) {\r
            boundaryMask[idx] = true;\r
          }\r
        }\r
      }\r
\r
      const interiorMask = new Array(width * height).fill(false);\r
      for (let y = 1; y < height - 1; y++) {\r
        for (let x = 1; x < width - 1; x++) {\r
          const idx = y * width + x;\r
          if (\r
            shapeMask[idx] &&\r
            shapeMask[idx - 1] &&\r
            shapeMask[idx + 1] &&\r
            shapeMask[idx - width] &&\r
            shapeMask[idx + width]\r
          ) {\r
            interiorMask[idx] = true;\r
          }\r
        }\r
      }\r
\r
      const u = new Float32Array(width * height).fill(0);\r
      const newU = new Float32Array(width * height).fill(0);\r
      const C = 0.01;\r
      const ITERATIONS = 300;\r
\r
      function getU(x, y, arr) {\r
        if (x < 0 || x >= width || y < 0 || y >= height) return 0;\r
        if (!shapeMask[y * width + x]) return 0;\r
        return arr[y * width + x];\r
      }\r
\r
      for (let iter = 0; iter < ITERATIONS; iter++) {\r
        for (let y = 0; y < height; y++) {\r
          for (let x = 0; x < width; x++) {\r
            const idx = y * width + x;\r
            if (!shapeMask[idx] || boundaryMask[idx]) {\r
              newU[idx] = 0;\r
              continue;\r
            }\r
            const sumN = getU(x + 1, y, u) + getU(x - 1, y, u) + getU(x, y + 1, u) + getU(x, y - 1, u);\r
            newU[idx] = (C + sumN) / 4;\r
          }\r
        }\r
        u.set(newU);\r
      }\r
\r
      let maxVal = 0;\r
      for (let i = 0; i < width * height; i++) {\r
        if (u[i] > maxVal) maxVal = u[i];\r
      }\r
      const alpha = 2.0;\r
      const outImg = ctx.createImageData(width, height);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx = y * width + x;\r
          const px = idx * 4;\r
          if (!shapeMask[idx]) {\r
            outImg.data[px] = 255;\r
            outImg.data[px + 1] = 255;\r
            outImg.data[px + 2] = 255;\r
            outImg.data[px + 3] = 255;\r
          } else {\r
            const raw = u[idx] / maxVal;\r
            const remapped = Math.pow(raw, alpha);\r
            const gray = 255 * (1 - remapped);\r
            outImg.data[px] = gray;\r
            outImg.data[px + 1] = gray;\r
            outImg.data[px + 2] = gray;\r
            outImg.data[px + 3] = 255;\r
          }\r
        }\r
      }\r
\r
      ctx.putImageData(outImg, 0, 0);\r
\r
      canvas.toBlob(blob => {\r
        if (!blob) {\r
          reject(new Error('Failed to create PNG blob'));\r
          return;\r
        }\r
        resolve({\r
          imageData: outImg,\r
          pngBlob: blob\r
        });\r
      }, 'image/png');\r
    };\r
\r
    img.onerror = () => reject(new Error('Failed to load image'));\r
    img.src = URL.createObjectURL(file);\r
  });\r
}\r
\r
const vertexShaderSource = \`#version 300 es\r
precision mediump float;\r
\r
in vec2 a_position;\r
out vec2 vUv;\r
\r
void main() {\r
    vUv = .5 * (a_position + 1.);\r
    gl_Position = vec4(a_position, 0.0, 1.0);\r
}\`;\r
\r
const liquidFragSource = \`#version 300 es\r
precision mediump float;\r
\r
in vec2 vUv;\r
out vec4 fragColor;\r
\r
uniform sampler2D u_image_texture;\r
uniform float u_time;\r
uniform float u_ratio;\r
uniform float u_img_ratio;\r
uniform float u_patternScale;\r
uniform float u_refraction;\r
uniform float u_edge;\r
uniform float u_patternBlur;\r
uniform float u_liquid;\r
\r
#define TWO_PI 6.28318530718\r
#define PI 3.14159265358979323846\r
\r
vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }\r
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }\r
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }\r
float snoise(vec2 v) {\r
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);\r
    vec2 i = floor(v + dot(v, C.yy));\r
    vec2 x0 = v - i + dot(i, C.xx);\r
    vec2 i1;\r
    i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);\r
    vec4 x12 = x0.xyxy + C.xxzz;\r
    x12.xy -= i1;\r
    i = mod289(i);\r
    vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));\r
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);\r
    m = m*m;\r
    m = m*m;\r
    vec3 x = 2. * fract(p * C.www) - 1.;\r
    vec3 h = abs(x) - 0.5;\r
    vec3 ox = floor(x + 0.5);\r
    vec3 a0 = x - ox;\r
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
    vec3 g;\r
    g.x = a0.x * x0.x + h.x * x0.y;\r
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
    return 130. * dot(m, g);\r
}\r
\r
vec2 get_img_uv() {\r
    vec2 img_uv = vUv;\r
    img_uv -= .5;\r
    if (u_ratio > u_img_ratio) {\r
        img_uv.x = img_uv.x * u_ratio / u_img_ratio;\r
    } else {\r
        img_uv.y = img_uv.y * u_img_ratio / u_ratio;\r
    }\r
    float scale_factor = 1.;\r
    img_uv *= scale_factor;\r
    img_uv += .5;\r
    img_uv.y = 1. - img_uv.y;\r
    return img_uv;\r
}\r
vec2 rotate(vec2 uv, float th) {\r
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;\r
}\r
float get_color_channel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, float b) {\r
    float ch = c2;\r
    float border = 0.;\r
    float blur = u_patternBlur + extra_blur;\r
    ch = mix(ch, c1, smoothstep(.0, blur, stripe_p));\r
    border = w[0];\r
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\r
    b = smoothstep(.2, .8, b);\r
    border = w[0] + .4 * (1. - b) * w[1];\r
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\r
    border = w[0] + .5 * (1. - b) * w[1];\r
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\r
    border = w[0] + w[1];\r
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\r
    float gradient_t = (stripe_p - w[0] - w[1]) / w[2];\r
    float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));\r
    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));\r
    return ch;\r
}\r
float get_img_frame_alpha(vec2 uv, float img_frame_width) {\r
    float img_frame_alpha = smoothstep(0., img_frame_width, uv.x) * smoothstep(1., 1. - img_frame_width, uv.x);\r
    img_frame_alpha *= smoothstep(0., img_frame_width, uv.y) * smoothstep(1., 1. - img_frame_width, uv.y);\r
    return img_frame_alpha;\r
}\r
void main() {\r
    vec2 uv = vUv;\r
    uv.y = 1. - uv.y;\r
    uv.x *= u_ratio;\r
    float diagonal = uv.x - uv.y;\r
    float t = .001 * u_time;\r
    vec2 img_uv = get_img_uv();\r
    vec4 img = texture(u_image_texture, img_uv);\r
    vec3 color = vec3(0.);\r
    float opacity = 1.;\r
    vec3 color1 = vec3(.98, 0.98, 1.);\r
    vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, uv.x + uv.y));\r
    float edge = img.r;\r
    vec2 grad_uv = uv;\r
    grad_uv -= .5;\r
    float dist = length(grad_uv + vec2(0., .2 * diagonal));\r
    grad_uv = rotate(grad_uv, (.25 - .2 * diagonal) * PI);\r
    float bulge = pow(1.8 * dist, 1.2);\r
    bulge = 1. - bulge;\r
    bulge *= pow(uv.y, .3);\r
    float cycle_width = u_patternScale;\r
    float thin_strip_1_ratio = .12 / cycle_width * (1. - .4 * bulge);\r
    float thin_strip_2_ratio = .07 / cycle_width * (1. + .4 * bulge);\r
    float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);\r
    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;\r
    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;\r
    opacity = 1. - smoothstep(.9 - .5 * u_edge, 1. - .5 * u_edge, edge);\r
    opacity *= get_img_frame_alpha(img_uv, 0.01);\r
    float noise = snoise(uv - t);\r
    edge += (1. - edge) * u_liquid * noise;\r
    float refr = 0.;\r
    refr += (1. - bulge);\r
    refr = clamp(refr, 0., 1.);\r
    float dir = grad_uv.x;\r
    dir += diagonal;\r
    dir -= 2. * noise * diagonal * (smoothstep(0., 1., edge) * smoothstep(1., 0., edge));\r
    bulge *= clamp(pow(uv.y, .1), .3, 1.);\r
    dir *= (.1 + (1.1 - edge) * bulge);\r
    dir *= smoothstep(1., .7, edge);\r
    dir += .18 * (smoothstep(.1, .2, uv.y) * smoothstep(.4, .2, uv.y));\r
    dir += .03 * (smoothstep(.1, .2, 1. - uv.y) * smoothstep(.4, .2, 1. - uv.y));\r
    dir *= (.5 + .5 * pow(uv.y, 2.));\r
    dir *= cycle_width;\r
    dir -= t;\r
    float refr_r = refr;\r
    refr_r += .03 * bulge * noise;\r
    float refr_b = 1.3 * refr;\r
    refr_r += 5. * (smoothstep(-.1, .2, uv.y) * smoothstep(.5, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(1., .4, bulge));\r
    refr_r -= diagonal;\r
    refr_b += (smoothstep(0., .4, uv.y) * smoothstep(.8, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(.8, .4, bulge));\r
    refr_b -= .2 * edge;\r
    refr_r *= u_refraction;\r
    refr_b *= u_refraction;\r
    vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);\r
    w[1] -= .02 * smoothstep(.0, 1., edge + bulge);\r
    float stripe_r = mod(dir + refr_r, 1.);\r
    float r = get_color_channel(color1.r, color2.r, stripe_r, w, 0.02 + .03 * u_refraction * bulge, bulge);\r
    float stripe_g = mod(dir, 1.);\r
    float g = get_color_channel(color1.g, color2.g, stripe_g, w, 0.01 / (1. - diagonal), bulge);\r
    float stripe_b = mod(dir - refr_b, 1.);\r
    float b = get_color_channel(color1.b, color2.b, stripe_b, w, .01, bulge);\r
    color = vec3(r, g, b);\r
    color *= opacity;\r
    fragColor = vec4(color, opacity);\r
}\r
\`;\r
\r
export default function MetallicPaint({ imageData, params = defaultParams }) {\r
  const canvasRef = useRef(null);\r
  const [gl, setGl] = useState(null);\r
  const [uniforms, setUniforms] = useState({});\r
  const totalAnimationTime = useRef(0);\r
  const lastRenderTime = useRef(0);\r
\r
  function updateUniforms() {\r
    if (!gl || !uniforms) return;\r
    gl.uniform1f(uniforms.u_edge, params.edge);\r
    gl.uniform1f(uniforms.u_patternBlur, params.patternBlur);\r
    gl.uniform1f(uniforms.u_time, 0);\r
    gl.uniform1f(uniforms.u_patternScale, params.patternScale);\r
    gl.uniform1f(uniforms.u_refraction, params.refraction);\r
    gl.uniform1f(uniforms.u_liquid, params.liquid);\r
  }\r
\r
  useEffect(() => {\r
    function initShader() {\r
      const canvas = canvasRef.current;\r
      const gl = canvas?.getContext('webgl2', {\r
        antialias: true,\r
        alpha: true\r
      });\r
      if (!canvas || !gl) {\r
        return;\r
      }\r
\r
      function createShader(gl, sourceCode, type) {\r
        const shader = gl.createShader(type);\r
        if (!shader) {\r
          return null;\r
        }\r
\r
        gl.shaderSource(shader, sourceCode);\r
        gl.compileShader(shader);\r
\r
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
          console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));\r
          gl.deleteShader(shader);\r
          return null;\r
        }\r
\r
        return shader;\r
      }\r
\r
      const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);\r
      const fragmentShader = createShader(gl, liquidFragSource, gl.FRAGMENT_SHADER);\r
      const program = gl.createProgram();\r
      if (!program || !vertexShader || !fragmentShader) {\r
        return;\r
      }\r
\r
      gl.attachShader(program, vertexShader);\r
      gl.attachShader(program, fragmentShader);\r
      gl.linkProgram(program);\r
\r
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));\r
        return null;\r
      }\r
\r
      function getUniforms(program, gl) {\r
        let uniforms = {};\r
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);\r
        for (let i = 0; i < uniformCount; i++) {\r
          let uniformName = gl.getActiveUniform(program, i)?.name;\r
          if (!uniformName) continue;\r
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);\r
        }\r
        return uniforms;\r
      }\r
      const uniforms = getUniforms(program, gl);\r
      setUniforms(uniforms);\r
\r
      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);\r
      const vertexBuffer = gl.createBuffer();\r
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\r
\r
      gl.useProgram(program);\r
\r
      const positionLocation = gl.getAttribLocation(program, 'a_position');\r
      gl.enableVertexAttribArray(positionLocation);\r
\r
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);\r
\r
      setGl(gl);\r
    }\r
\r
    initShader();\r
    updateUniforms();\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
    updateUniforms();\r
  }, [gl, params, uniforms]);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
\r
    let renderId;\r
\r
    function render(currentTime) {\r
      const deltaTime = currentTime - lastRenderTime.current;\r
      lastRenderTime.current = currentTime;\r
\r
      totalAnimationTime.current += deltaTime * params.speed;\r
      gl.uniform1f(uniforms.u_time, totalAnimationTime.current);\r
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);\r
      renderId = requestAnimationFrame(render);\r
    }\r
\r
    lastRenderTime.current = performance.now();\r
    renderId = requestAnimationFrame(render);\r
\r
    return () => {\r
      cancelAnimationFrame(renderId);\r
    };\r
  }, [gl, params.speed]);\r
\r
  useEffect(() => {\r
    const canvasEl = canvasRef.current;\r
    if (!canvasEl || !gl || !uniforms) return;\r
\r
    function resizeCanvas() {\r
      if (!canvasEl || !gl || !uniforms || !imageData) return;\r
      const imgRatio = imageData.width / imageData.height;\r
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);\r
\r
      const side = 1000;\r
      canvasEl.width = side * devicePixelRatio;\r
      canvasEl.height = side * devicePixelRatio;\r
      gl.viewport(0, 0, canvasEl.height, canvasEl.height);\r
      gl.uniform1f(uniforms.u_ratio, 1);\r
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);\r
    }\r
\r
    resizeCanvas();\r
    window.addEventListener('resize', resizeCanvas);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
    };\r
  }, [gl, uniforms, imageData]);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
\r
    const existingTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);\r
    if (existingTexture) {\r
      gl.deleteTexture(existingTexture);\r
    }\r
\r
    const imageTexture = gl.createTexture();\r
    gl.activeTexture(gl.TEXTURE0);\r
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);\r
\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
\r
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);\r
\r
    try {\r
      gl.texImage2D(\r
        gl.TEXTURE_2D,\r
        0,\r
        gl.RGBA,\r
        imageData?.width,\r
        imageData?.height,\r
        0,\r
        gl.RGBA,\r
        gl.UNSIGNED_BYTE,\r
        imageData?.data\r
      );\r
\r
      gl.uniform1i(uniforms.u_image_texture, 0);\r
    } catch (e) {\r
      console.error('Error uploading texture:', e);\r
    }\r
\r
    return () => {\r
      if (imageTexture) {\r
        gl.deleteTexture(imageTexture);\r
      }\r
    };\r
  }, [gl, uniforms, imageData]);\r
\r
  return <canvas ref={canvasRef} className="block w-full h-full object-contain" />;\r
}\r
`,$=`'use client';\r
\r
import { useEffect, useRef, useState } from 'react';\r
import './MetallicPaint.css';\r
\r
type ShaderParams = {\r
  patternScale: number;\r
  refraction: number;\r
  edge: number;\r
  patternBlur: number;\r
  liquid: number;\r
  speed: number;\r
};\r
\r
const defaultParams: ShaderParams = {\r
  patternScale: 2,\r
  refraction: 0.015,\r
  edge: 1,\r
  patternBlur: 0.005,\r
  liquid: 0.07,\r
  speed: 0.3\r
};\r
\r
export function parseLogoImage(file: File): Promise<{ imageData: ImageData; pngBlob: Blob }> {\r
  const canvas = document.createElement('canvas');\r
  const ctx = canvas.getContext('2d');\r
\r
  return new Promise((resolve, reject) => {\r
    if (!file || !ctx) {\r
      reject(new Error('Invalid file or context'));\r
      return;\r
    }\r
\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.onload = function () {\r
      if (file.type === 'image/svg+xml') {\r
        img.width = 1000;\r
        img.height = 1000;\r
      }\r
\r
      const MAX_SIZE = 1000;\r
      const MIN_SIZE = 500;\r
      let width = img.naturalWidth;\r
      let height = img.naturalHeight;\r
\r
      if (width > MAX_SIZE || height > MAX_SIZE || width < MIN_SIZE || height < MIN_SIZE) {\r
        if (width > height) {\r
          if (width > MAX_SIZE) {\r
            height = Math.round((height * MAX_SIZE) / width);\r
            width = MAX_SIZE;\r
          } else if (width < MIN_SIZE) {\r
            height = Math.round((height * MIN_SIZE) / width);\r
            width = MIN_SIZE;\r
          }\r
        } else {\r
          if (height > MAX_SIZE) {\r
            width = Math.round((width * MAX_SIZE) / height);\r
            height = MAX_SIZE;\r
          } else if (height < MIN_SIZE) {\r
            width = Math.round((width * MIN_SIZE) / height);\r
            height = MIN_SIZE;\r
          }\r
        }\r
      }\r
\r
      canvas.width = width;\r
      canvas.height = height;\r
\r
      const shapeCanvas = document.createElement('canvas');\r
      shapeCanvas.width = width;\r
      shapeCanvas.height = height;\r
      const shapeCtx = shapeCanvas.getContext('2d')!;\r
      shapeCtx.drawImage(img, 0, 0, width, height);\r
\r
      const shapeImageData = shapeCtx.getImageData(0, 0, width, height);\r
      const data = shapeImageData.data;\r
      const shapeMask = new Array(width * height).fill(false);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx4 = (y * width + x) * 4;\r
          const r = data[idx4];\r
          const g = data[idx4 + 1];\r
          const b = data[idx4 + 2];\r
          const a = data[idx4 + 3];\r
          shapeMask[y * width + x] = !((r === 255 && g === 255 && b === 255 && a === 255) || a === 0);\r
        }\r
      }\r
\r
      function inside(x: number, y: number) {\r
        if (x < 0 || x >= width || y < 0 || y >= height) return false;\r
        return shapeMask[y * width + x];\r
      }\r
\r
      const boundaryMask = new Array(width * height).fill(false);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx = y * width + x;\r
          if (!shapeMask[idx]) continue;\r
          let isBoundary = false;\r
          for (let ny = y - 1; ny <= y + 1 && !isBoundary; ny++) {\r
            for (let nx = x - 1; nx <= x + 1 && !isBoundary; nx++) {\r
              if (!inside(nx, ny)) {\r
                isBoundary = true;\r
              }\r
            }\r
          }\r
          if (isBoundary) {\r
            boundaryMask[idx] = true;\r
          }\r
        }\r
      }\r
\r
      const interiorMask = new Array(width * height).fill(false);\r
      for (let y = 1; y < height - 1; y++) {\r
        for (let x = 1; x < width - 1; x++) {\r
          const idx = y * width + x;\r
          if (\r
            shapeMask[idx] &&\r
            shapeMask[idx - 1] &&\r
            shapeMask[idx + 1] &&\r
            shapeMask[idx - width] &&\r
            shapeMask[idx + width]\r
          ) {\r
            interiorMask[idx] = true;\r
          }\r
        }\r
      }\r
\r
      const u = new Float32Array(width * height).fill(0);\r
      const newU = new Float32Array(width * height).fill(0);\r
      const C = 0.01;\r
      const ITERATIONS = 300;\r
\r
      function getU(x: number, y: number, arr: Float32Array) {\r
        if (x < 0 || x >= width || y < 0 || y >= height) return 0;\r
        if (!shapeMask[y * width + x]) return 0;\r
        return arr[y * width + x];\r
      }\r
\r
      for (let iter = 0; iter < ITERATIONS; iter++) {\r
        for (let y = 0; y < height; y++) {\r
          for (let x = 0; x < width; x++) {\r
            const idx = y * width + x;\r
            if (!shapeMask[idx] || boundaryMask[idx]) {\r
              newU[idx] = 0;\r
              continue;\r
            }\r
            const sumN = getU(x + 1, y, u) + getU(x - 1, y, u) + getU(x, y + 1, u) + getU(x, y - 1, u);\r
            newU[idx] = (C + sumN) / 4;\r
          }\r
        }\r
        u.set(newU);\r
      }\r
\r
      let maxVal = 0;\r
      for (let i = 0; i < width * height; i++) {\r
        if (u[i] > maxVal) maxVal = u[i];\r
      }\r
      const alpha = 2.0;\r
      const outImg = ctx.createImageData(width, height);\r
\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx = y * width + x;\r
          const px = idx * 4;\r
          if (!shapeMask[idx]) {\r
            outImg.data[px] = 255;\r
            outImg.data[px + 1] = 255;\r
            outImg.data[px + 2] = 255;\r
            outImg.data[px + 3] = 255;\r
          } else {\r
            const raw = u[idx] / maxVal;\r
            const remapped = Math.pow(raw, alpha);\r
            const gray = 255 * (1 - remapped);\r
            outImg.data[px] = gray;\r
            outImg.data[px + 1] = gray;\r
            outImg.data[px + 2] = gray;\r
            outImg.data[px + 3] = 255;\r
          }\r
        }\r
      }\r
      ctx.putImageData(outImg, 0, 0);\r
\r
      canvas.toBlob(blob => {\r
        if (!blob) {\r
          reject(new Error('Failed to create PNG blob'));\r
          return;\r
        }\r
        resolve({\r
          imageData: outImg,\r
          pngBlob: blob\r
        });\r
      }, 'image/png');\r
    };\r
\r
    img.onerror = () => reject(new Error('Failed to load image'));\r
    img.src = URL.createObjectURL(file);\r
  });\r
}\r
\r
const vertexShaderSource = \`#version 300 es\r
precision mediump float;\r
\r
in vec2 a_position;\r
out vec2 vUv;\r
\r
void main() {\r
    vUv = .5 * (a_position + 1.);\r
    gl_Position = vec4(a_position, 0.0, 1.0);\r
}\`;\r
\r
const liquidFragSource = \`#version 300 es\r
precision mediump float;\r
\r
in vec2 vUv;\r
out vec4 fragColor;\r
\r
uniform sampler2D u_image_texture;\r
uniform float u_time;\r
uniform float u_ratio;\r
uniform float u_img_ratio;\r
uniform float u_patternScale;\r
uniform float u_refraction;\r
uniform float u_edge;\r
uniform float u_patternBlur;\r
uniform float u_liquid;\r
\r
#define TWO_PI 6.28318530718\r
#define PI 3.14159265358979323846\r
\r
vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }\r
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }\r
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }\r
float snoise(vec2 v) {\r
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);\r
    vec2 i = floor(v + dot(v, C.yy));\r
    vec2 x0 = v - i + dot(i, C.xx);\r
    vec2 i1;\r
    i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);\r
    vec4 x12 = x0.xyxy + C.xxzz;\r
    x12.xy -= i1;\r
    i = mod289(i);\r
    vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));\r
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);\r
    m = m*m;\r
    m = m*m;\r
    vec3 x = 2. * fract(p * C.www) - 1.;\r
    vec3 h = abs(x) - 0.5;\r
    vec3 ox = floor(x + 0.5);\r
    vec3 a0 = x - ox;\r
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
    vec3 g;\r
    g.x = a0.x * x0.x + h.x * x0.y;\r
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
    return 130. * dot(m, g);\r
}\r
\r
vec2 get_img_uv() {\r
    vec2 img_uv = vUv;\r
    img_uv -= .5;\r
    if (u_ratio > u_img_ratio) {\r
        img_uv.x = img_uv.x * u_ratio / u_img_ratio;\r
    } else {\r
        img_uv.y = img_uv.y * u_img_ratio / u_ratio;\r
    }\r
    float scale_factor = 1.;\r
    img_uv *= scale_factor;\r
    img_uv += .5;\r
    img_uv.y = 1. - img_uv.y;\r
    return img_uv;\r
}\r
vec2 rotate(vec2 uv, float th) {\r
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;\r
}\r
float get_color_channel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, float b) {\r
    float ch = c2;\r
    float border = 0.;\r
    float blur = u_patternBlur + extra_blur;\r
    ch = mix(ch, c1, smoothstep(.0, blur, stripe_p));\r
    border = w[0];\r
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\r
    b = smoothstep(.2, .8, b);\r
    border = w[0] + .4 * (1. - b) * w[1];\r
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\r
    border = w[0] + .5 * (1. - b) * w[1];\r
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\r
    border = w[0] + w[1];\r
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\r
    float gradient_t = (stripe_p - w[0] - w[1]) / w[2];\r
    float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));\r
    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));\r
    return ch;\r
}\r
float get_img_frame_alpha(vec2 uv, float img_frame_width) {\r
    float img_frame_alpha = smoothstep(0., img_frame_width, uv.x) * smoothstep(1., 1. - img_frame_width, uv.x);\r
    img_frame_alpha *= smoothstep(0., img_frame_width, uv.y) * smoothstep(1., 1. - img_frame_width, uv.y);\r
    return img_frame_alpha;\r
}\r
void main() {\r
    vec2 uv = vUv;\r
    uv.y = 1. - uv.y;\r
    uv.x *= u_ratio;\r
    float diagonal = uv.x - uv.y;\r
    float t = .001 * u_time;\r
    vec2 img_uv = get_img_uv();\r
    vec4 img = texture(u_image_texture, img_uv);\r
    vec3 color = vec3(0.);\r
    float opacity = 1.;\r
    vec3 color1 = vec3(.98, 0.98, 1.);\r
    vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, uv.x + uv.y));\r
    float edge = img.r;\r
    vec2 grad_uv = uv;\r
    grad_uv -= .5;\r
    float dist = length(grad_uv + vec2(0., .2 * diagonal));\r
    grad_uv = rotate(grad_uv, (.25 - .2 * diagonal) * PI);\r
    float bulge = pow(1.8 * dist, 1.2);\r
    bulge = 1. - bulge;\r
    bulge *= pow(uv.y, .3);\r
    float cycle_width = u_patternScale;\r
    float thin_strip_1_ratio = .12 / cycle_width * (1. - .4 * bulge);\r
    float thin_strip_2_ratio = .07 / cycle_width * (1. + .4 * bulge);\r
    float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);\r
    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;\r
    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;\r
    opacity = 1. - smoothstep(.9 - .5 * u_edge, 1. - .5 * u_edge, edge);\r
    opacity *= get_img_frame_alpha(img_uv, 0.01);\r
    float noise = snoise(uv - t);\r
    edge += (1. - edge) * u_liquid * noise;\r
    float refr = 0.;\r
    refr += (1. - bulge);\r
    refr = clamp(refr, 0., 1.);\r
    float dir = grad_uv.x;\r
    dir += diagonal;\r
    dir -= 2. * noise * diagonal * (smoothstep(0., 1., edge) * smoothstep(1., 0., edge));\r
    bulge *= clamp(pow(uv.y, .1), .3, 1.);\r
    dir *= (.1 + (1.1 - edge) * bulge);\r
    dir *= smoothstep(1., .7, edge);\r
    dir += .18 * (smoothstep(.1, .2, uv.y) * smoothstep(.4, .2, uv.y));\r
    dir += .03 * (smoothstep(.1, .2, 1. - uv.y) * smoothstep(.4, .2, 1. - uv.y));\r
    dir *= (.5 + .5 * pow(uv.y, 2.));\r
    dir *= cycle_width;\r
    dir -= t;\r
    float refr_r = refr;\r
    refr_r += .03 * bulge * noise;\r
    float refr_b = 1.3 * refr;\r
    refr_r += 5. * (smoothstep(-.1, .2, uv.y) * smoothstep(.5, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(1., .4, bulge));\r
    refr_r -= diagonal;\r
    refr_b += (smoothstep(0., .4, uv.y) * smoothstep(.8, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(.8, .4, bulge));\r
    refr_b -= .2 * edge;\r
    refr_r *= u_refraction;\r
    refr_b *= u_refraction;\r
    vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);\r
    w[1] -= .02 * smoothstep(.0, 1., edge + bulge);\r
    float stripe_r = mod(dir + refr_r, 1.);\r
    float r = get_color_channel(color1.r, color2.r, stripe_r, w, 0.02 + .03 * u_refraction * bulge, bulge);\r
    float stripe_g = mod(dir, 1.);\r
    float g = get_color_channel(color1.g, color2.g, stripe_g, w, 0.01 / (1. - diagonal), bulge);\r
    float stripe_b = mod(dir - refr_b, 1.);\r
    float b = get_color_channel(color1.b, color2.b, stripe_b, w, .01, bulge);\r
    color = vec3(r, g, b);\r
    color *= opacity;\r
    fragColor = vec4(color, opacity);\r
}\r
\`;\r
\r
export default function MetallicPaint({\r
  imageData,\r
  params = defaultParams\r
}: {\r
  imageData: ImageData;\r
  params: ShaderParams;\r
}) {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);\r
  const [uniforms, setUniforms] = useState<Record<string, WebGLUniformLocation>>({});\r
  const totalAnimationTime = useRef(0);\r
  const lastRenderTime = useRef(0);\r
\r
  function updateUniforms() {\r
    if (!gl || !uniforms) return;\r
    gl.uniform1f(uniforms.u_edge, params.edge);\r
    gl.uniform1f(uniforms.u_patternBlur, params.patternBlur);\r
    gl.uniform1f(uniforms.u_time, 0);\r
    gl.uniform1f(uniforms.u_patternScale, params.patternScale);\r
    gl.uniform1f(uniforms.u_refraction, params.refraction);\r
    gl.uniform1f(uniforms.u_liquid, params.liquid);\r
  }\r
\r
  useEffect(() => {\r
    function initShader() {\r
      const canvas = canvasRef.current;\r
      const gl = canvas?.getContext('webgl2', {\r
        antialias: true,\r
        alpha: true\r
      });\r
      if (!canvas || !gl) {\r
        return;\r
      }\r
\r
      function createShader(gl: WebGL2RenderingContext, sourceCode: string, type: number) {\r
        const shader = gl.createShader(type);\r
        if (!shader) {\r
          return null;\r
        }\r
\r
        gl.shaderSource(shader, sourceCode);\r
        gl.compileShader(shader);\r
\r
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
          console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));\r
          gl.deleteShader(shader);\r
          return null;\r
        }\r
\r
        return shader;\r
      }\r
\r
      const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);\r
      const fragmentShader = createShader(gl, liquidFragSource, gl.FRAGMENT_SHADER);\r
      const program = gl.createProgram();\r
      if (!program || !vertexShader || !fragmentShader) {\r
        return;\r
      }\r
\r
      gl.attachShader(program, vertexShader);\r
      gl.attachShader(program, fragmentShader);\r
      gl.linkProgram(program);\r
\r
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));\r
        return null;\r
      }\r
\r
      function getUniforms(program: WebGLProgram, gl: WebGL2RenderingContext) {\r
        let uniforms: Record<string, WebGLUniformLocation> = {};\r
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);\r
        for (let i = 0; i < uniformCount; i++) {\r
          let uniformName = gl.getActiveUniform(program, i)?.name;\r
          if (!uniformName) continue;\r
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName) as WebGLUniformLocation;\r
        }\r
        return uniforms;\r
      }\r
      const uniforms = getUniforms(program, gl);\r
      setUniforms(uniforms);\r
\r
      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);\r
      const vertexBuffer = gl.createBuffer();\r
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\r
\r
      gl.useProgram(program);\r
\r
      const positionLocation = gl.getAttribLocation(program, 'a_position');\r
      gl.enableVertexAttribArray(positionLocation);\r
\r
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);\r
\r
      setGl(gl);\r
    }\r
\r
    initShader();\r
    updateUniforms();\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
    updateUniforms();\r
  }, [gl, params, uniforms]);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
\r
    let renderId: number;\r
\r
    function render(currentTime: number) {\r
      const deltaTime = currentTime - lastRenderTime.current;\r
      lastRenderTime.current = currentTime;\r
\r
      totalAnimationTime.current += deltaTime * params.speed;\r
      gl!.uniform1f(uniforms.u_time, totalAnimationTime.current);\r
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);\r
      renderId = requestAnimationFrame(render);\r
    }\r
\r
    lastRenderTime.current = performance.now();\r
    renderId = requestAnimationFrame(render);\r
\r
    return () => {\r
      cancelAnimationFrame(renderId);\r
    };\r
  }, [gl, params.speed]);\r
\r
  useEffect(() => {\r
    const canvasEl = canvasRef.current;\r
    if (!canvasEl || !gl || !uniforms) return;\r
\r
    function resizeCanvas() {\r
      if (!canvasEl || !gl || !uniforms || !imageData) return;\r
      const imgRatio = imageData.width / imageData.height;\r
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);\r
\r
      const side = 1000;\r
      canvasEl.width = side * devicePixelRatio;\r
      canvasEl.height = side * devicePixelRatio;\r
      gl.viewport(0, 0, canvasEl.height, canvasEl.height);\r
      gl.uniform1f(uniforms.u_ratio, 1);\r
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);\r
    }\r
\r
    resizeCanvas();\r
    window.addEventListener('resize', resizeCanvas);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
    };\r
  }, [gl, uniforms, imageData]);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
\r
    const existingTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);\r
    if (existingTexture) {\r
      gl.deleteTexture(existingTexture);\r
    }\r
\r
    const imageTexture = gl.createTexture();\r
    gl.activeTexture(gl.TEXTURE0);\r
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);\r
\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
\r
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);\r
\r
    try {\r
      gl.texImage2D(\r
        gl.TEXTURE_2D,\r
        0,\r
        gl.RGBA,\r
        imageData?.width,\r
        imageData?.height,\r
        0,\r
        gl.RGBA,\r
        gl.UNSIGNED_BYTE,\r
        imageData?.data\r
      );\r
\r
      gl.uniform1i(uniforms.u_image_texture, 0);\r
    } catch (e) {\r
      console.error('Error uploading texture:', e);\r
    }\r
\r
    return () => {\r
      if (imageTexture) {\r
        gl.deleteTexture(imageTexture);\r
      }\r
    };\r
  }, [gl, uniforms, imageData]);\r
\r
  return <canvas ref={canvasRef} className="paint-container" />;\r
}\r
`,rr=`'use client';\r
\r
import { useEffect, useRef, useState } from 'react';\r
\r
type ShaderParams = {\r
  patternScale: number;\r
  refraction: number;\r
  edge: number;\r
  patternBlur: number;\r
  liquid: number;\r
  speed: number;\r
};\r
\r
const defaultParams: ShaderParams = {\r
  patternScale: 2,\r
  refraction: 0.015,\r
  edge: 1,\r
  patternBlur: 0.005,\r
  liquid: 0.07,\r
  speed: 0.3\r
};\r
\r
export function parseLogoImage(file: File): Promise<{ imageData: ImageData; pngBlob: Blob }> {\r
  const canvas = document.createElement('canvas');\r
  const ctx = canvas.getContext('2d');\r
\r
  return new Promise((resolve, reject) => {\r
    if (!file || !ctx) {\r
      reject(new Error('Invalid file or context'));\r
      return;\r
    }\r
\r
    const img = new Image();\r
    img.crossOrigin = 'anonymous';\r
    img.onload = function () {\r
      if (file.type === 'image/svg+xml') {\r
        img.width = 1000;\r
        img.height = 1000;\r
      }\r
\r
      const MAX_SIZE = 1000;\r
      const MIN_SIZE = 500;\r
      let width = img.naturalWidth;\r
      let height = img.naturalHeight;\r
\r
      if (width > MAX_SIZE || height > MAX_SIZE || width < MIN_SIZE || height < MIN_SIZE) {\r
        if (width > height) {\r
          if (width > MAX_SIZE) {\r
            height = Math.round((height * MAX_SIZE) / width);\r
            width = MAX_SIZE;\r
          } else if (width < MIN_SIZE) {\r
            height = Math.round((height * MIN_SIZE) / width);\r
            width = MIN_SIZE;\r
          }\r
        } else {\r
          if (height > MAX_SIZE) {\r
            width = Math.round((width * MAX_SIZE) / height);\r
            height = MAX_SIZE;\r
          } else if (height < MIN_SIZE) {\r
            width = Math.round((width * MIN_SIZE) / height);\r
            height = MIN_SIZE;\r
          }\r
        }\r
      }\r
\r
      canvas.width = width;\r
      canvas.height = height;\r
\r
      const shapeCanvas = document.createElement('canvas');\r
      shapeCanvas.width = width;\r
      shapeCanvas.height = height;\r
      const shapeCtx = shapeCanvas.getContext('2d')!;\r
      shapeCtx.drawImage(img, 0, 0, width, height);\r
\r
      const shapeImageData = shapeCtx.getImageData(0, 0, width, height);\r
      const data = shapeImageData.data;\r
      const shapeMask = new Array(width * height).fill(false);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx4 = (y * width + x) * 4;\r
          const r = data[idx4];\r
          const g = data[idx4 + 1];\r
          const b = data[idx4 + 2];\r
          const a = data[idx4 + 3];\r
          shapeMask[y * width + x] = !((r === 255 && g === 255 && b === 255 && a === 255) || a === 0);\r
        }\r
      }\r
\r
      function inside(x: number, y: number) {\r
        if (x < 0 || x >= width || y < 0 || y >= height) return false;\r
        return shapeMask[y * width + x];\r
      }\r
\r
      const boundaryMask = new Array(width * height).fill(false);\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx = y * width + x;\r
          if (!shapeMask[idx]) continue;\r
          let isBoundary = false;\r
          for (let ny = y - 1; ny <= y + 1 && !isBoundary; ny++) {\r
            for (let nx = x - 1; nx <= x + 1 && !isBoundary; nx++) {\r
              if (!inside(nx, ny)) {\r
                isBoundary = true;\r
              }\r
            }\r
          }\r
          if (isBoundary) {\r
            boundaryMask[idx] = true;\r
          }\r
        }\r
      }\r
\r
      const interiorMask = new Array(width * height).fill(false);\r
      for (let y = 1; y < height - 1; y++) {\r
        for (let x = 1; x < width - 1; x++) {\r
          const idx = y * width + x;\r
          if (\r
            shapeMask[idx] &&\r
            shapeMask[idx - 1] &&\r
            shapeMask[idx + 1] &&\r
            shapeMask[idx - width] &&\r
            shapeMask[idx + width]\r
          ) {\r
            interiorMask[idx] = true;\r
          }\r
        }\r
      }\r
\r
      const u = new Float32Array(width * height).fill(0);\r
      const newU = new Float32Array(width * height).fill(0);\r
      const C = 0.01;\r
      const ITERATIONS = 300;\r
\r
      function getU(x: number, y: number, arr: Float32Array) {\r
        if (x < 0 || x >= width || y < 0 || y >= height) return 0;\r
        if (!shapeMask[y * width + x]) return 0;\r
        return arr[y * width + x];\r
      }\r
\r
      for (let iter = 0; iter < ITERATIONS; iter++) {\r
        for (let y = 0; y < height; y++) {\r
          for (let x = 0; x < width; x++) {\r
            const idx = y * width + x;\r
            if (!shapeMask[idx] || boundaryMask[idx]) {\r
              newU[idx] = 0;\r
              continue;\r
            }\r
            const sumN = getU(x + 1, y, u) + getU(x - 1, y, u) + getU(x, y + 1, u) + getU(x, y - 1, u);\r
            newU[idx] = (C + sumN) / 4;\r
          }\r
        }\r
        u.set(newU);\r
      }\r
\r
      let maxVal = 0;\r
      for (let i = 0; i < width * height; i++) {\r
        if (u[i] > maxVal) maxVal = u[i];\r
      }\r
      const alpha = 2.0;\r
      const outImg = ctx.createImageData(width, height);\r
\r
      for (let y = 0; y < height; y++) {\r
        for (let x = 0; x < width; x++) {\r
          const idx = y * width + x;\r
          const px = idx * 4;\r
          if (!shapeMask[idx]) {\r
            outImg.data[px] = 255;\r
            outImg.data[px + 1] = 255;\r
            outImg.data[px + 2] = 255;\r
            outImg.data[px + 3] = 255;\r
          } else {\r
            const raw = u[idx] / maxVal;\r
            const remapped = Math.pow(raw, alpha);\r
            const gray = 255 * (1 - remapped);\r
            outImg.data[px] = gray;\r
            outImg.data[px + 1] = gray;\r
            outImg.data[px + 2] = gray;\r
            outImg.data[px + 3] = 255;\r
          }\r
        }\r
      }\r
      ctx.putImageData(outImg, 0, 0);\r
\r
      canvas.toBlob(blob => {\r
        if (!blob) {\r
          reject(new Error('Failed to create PNG blob'));\r
          return;\r
        }\r
        resolve({\r
          imageData: outImg,\r
          pngBlob: blob\r
        });\r
      }, 'image/png');\r
    };\r
\r
    img.onerror = () => reject(new Error('Failed to load image'));\r
    img.src = URL.createObjectURL(file);\r
  });\r
}\r
\r
const vertexShaderSource = \`#version 300 es\r
precision mediump float;\r
\r
in vec2 a_position;\r
out vec2 vUv;\r
\r
void main() {\r
    vUv = .5 * (a_position + 1.);\r
    gl_Position = vec4(a_position, 0.0, 1.0);\r
}\`;\r
\r
const liquidFragSource = \`#version 300 es\r
precision mediump float;\r
\r
in vec2 vUv;\r
out vec4 fragColor;\r
\r
uniform sampler2D u_image_texture;\r
uniform float u_time;\r
uniform float u_ratio;\r
uniform float u_img_ratio;\r
uniform float u_patternScale;\r
uniform float u_refraction;\r
uniform float u_edge;\r
uniform float u_patternBlur;\r
uniform float u_liquid;\r
\r
#define TWO_PI 6.28318530718\r
#define PI 3.14159265358979323846\r
\r
vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }\r
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }\r
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }\r
float snoise(vec2 v) {\r
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);\r
    vec2 i = floor(v + dot(v, C.yy));\r
    vec2 x0 = v - i + dot(i, C.xx);\r
    vec2 i1;\r
    i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);\r
    vec4 x12 = x0.xyxy + C.xxzz;\r
    x12.xy -= i1;\r
    i = mod289(i);\r
    vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));\r
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);\r
    m = m*m;\r
    m = m*m;\r
    vec3 x = 2. * fract(p * C.www) - 1.;\r
    vec3 h = abs(x) - 0.5;\r
    vec3 ox = floor(x + 0.5);\r
    vec3 a0 = x - ox;\r
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
    vec3 g;\r
    g.x = a0.x * x0.x + h.x * x0.y;\r
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
    return 130. * dot(m, g);\r
}\r
\r
vec2 get_img_uv() {\r
    vec2 img_uv = vUv;\r
    img_uv -= .5;\r
    if (u_ratio > u_img_ratio) {\r
        img_uv.x = img_uv.x * u_ratio / u_img_ratio;\r
    } else {\r
        img_uv.y = img_uv.y * u_img_ratio / u_ratio;\r
    }\r
    float scale_factor = 1.;\r
    img_uv *= scale_factor;\r
    img_uv += .5;\r
    img_uv.y = 1. - img_uv.y;\r
    return img_uv;\r
}\r
vec2 rotate(vec2 uv, float th) {\r
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;\r
}\r
float get_color_channel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, float b) {\r
    float ch = c2;\r
    float border = 0.;\r
    float blur = u_patternBlur + extra_blur;\r
    ch = mix(ch, c1, smoothstep(.0, blur, stripe_p));\r
    border = w[0];\r
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\r
    b = smoothstep(.2, .8, b);\r
    border = w[0] + .4 * (1. - b) * w[1];\r
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\r
    border = w[0] + .5 * (1. - b) * w[1];\r
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\r
    border = w[0] + w[1];\r
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\r
    float gradient_t = (stripe_p - w[0] - w[1]) / w[2];\r
    float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));\r
    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));\r
    return ch;\r
}\r
float get_img_frame_alpha(vec2 uv, float img_frame_width) {\r
    float img_frame_alpha = smoothstep(0., img_frame_width, uv.x) * smoothstep(1., 1. - img_frame_width, uv.x);\r
    img_frame_alpha *= smoothstep(0., img_frame_width, uv.y) * smoothstep(1., 1. - img_frame_width, uv.y);\r
    return img_frame_alpha;\r
}\r
void main() {\r
    vec2 uv = vUv;\r
    uv.y = 1. - uv.y;\r
    uv.x *= u_ratio;\r
    float diagonal = uv.x - uv.y;\r
    float t = .001 * u_time;\r
    vec2 img_uv = get_img_uv();\r
    vec4 img = texture(u_image_texture, img_uv);\r
    vec3 color = vec3(0.);\r
    float opacity = 1.;\r
    vec3 color1 = vec3(.98, 0.98, 1.);\r
    vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, uv.x + uv.y));\r
    float edge = img.r;\r
    vec2 grad_uv = uv;\r
    grad_uv -= .5;\r
    float dist = length(grad_uv + vec2(0., .2 * diagonal));\r
    grad_uv = rotate(grad_uv, (.25 - .2 * diagonal) * PI);\r
    float bulge = pow(1.8 * dist, 1.2);\r
    bulge = 1. - bulge;\r
    bulge *= pow(uv.y, .3);\r
    float cycle_width = u_patternScale;\r
    float thin_strip_1_ratio = .12 / cycle_width * (1. - .4 * bulge);\r
    float thin_strip_2_ratio = .07 / cycle_width * (1. + .4 * bulge);\r
    float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);\r
    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;\r
    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;\r
    opacity = 1. - smoothstep(.9 - .5 * u_edge, 1. - .5 * u_edge, edge);\r
    opacity *= get_img_frame_alpha(img_uv, 0.01);\r
    float noise = snoise(uv - t);\r
    edge += (1. - edge) * u_liquid * noise;\r
    float refr = 0.;\r
    refr += (1. - bulge);\r
    refr = clamp(refr, 0., 1.);\r
    float dir = grad_uv.x;\r
    dir += diagonal;\r
    dir -= 2. * noise * diagonal * (smoothstep(0., 1., edge) * smoothstep(1., 0., edge));\r
    bulge *= clamp(pow(uv.y, .1), .3, 1.);\r
    dir *= (.1 + (1.1 - edge) * bulge);\r
    dir *= smoothstep(1., .7, edge);\r
    dir += .18 * (smoothstep(.1, .2, uv.y) * smoothstep(.4, .2, uv.y));\r
    dir += .03 * (smoothstep(.1, .2, 1. - uv.y) * smoothstep(.4, .2, 1. - uv.y));\r
    dir *= (.5 + .5 * pow(uv.y, 2.));\r
    dir *= cycle_width;\r
    dir -= t;\r
    float refr_r = refr;\r
    refr_r += .03 * bulge * noise;\r
    float refr_b = 1.3 * refr;\r
    refr_r += 5. * (smoothstep(-.1, .2, uv.y) * smoothstep(.5, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(1., .4, bulge));\r
    refr_r -= diagonal;\r
    refr_b += (smoothstep(0., .4, uv.y) * smoothstep(.8, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(.8, .4, bulge));\r
    refr_b -= .2 * edge;\r
    refr_r *= u_refraction;\r
    refr_b *= u_refraction;\r
    vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);\r
    w[1] -= .02 * smoothstep(.0, 1., edge + bulge);\r
    float stripe_r = mod(dir + refr_r, 1.);\r
    float r = get_color_channel(color1.r, color2.r, stripe_r, w, 0.02 + .03 * u_refraction * bulge, bulge);\r
    float stripe_g = mod(dir, 1.);\r
    float g = get_color_channel(color1.g, color2.g, stripe_g, w, 0.01 / (1. - diagonal), bulge);\r
    float stripe_b = mod(dir - refr_b, 1.);\r
    float b = get_color_channel(color1.b, color2.b, stripe_b, w, .01, bulge);\r
    color = vec3(r, g, b);\r
    color *= opacity;\r
    fragColor = vec4(color, opacity);\r
}\r
\`;\r
\r
export default function MetallicPaint({\r
  imageData,\r
  params = defaultParams\r
}: {\r
  imageData: ImageData;\r
  params: ShaderParams;\r
}) {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);\r
  const [uniforms, setUniforms] = useState<Record<string, WebGLUniformLocation>>({});\r
  const totalAnimationTime = useRef(0);\r
  const lastRenderTime = useRef(0);\r
\r
  function updateUniforms() {\r
    if (!gl || !uniforms) return;\r
    gl.uniform1f(uniforms.u_edge, params.edge);\r
    gl.uniform1f(uniforms.u_patternBlur, params.patternBlur);\r
    gl.uniform1f(uniforms.u_time, 0);\r
    gl.uniform1f(uniforms.u_patternScale, params.patternScale);\r
    gl.uniform1f(uniforms.u_refraction, params.refraction);\r
    gl.uniform1f(uniforms.u_liquid, params.liquid);\r
  }\r
\r
  useEffect(() => {\r
    function initShader() {\r
      const canvas = canvasRef.current;\r
      const gl = canvas?.getContext('webgl2', {\r
        antialias: true,\r
        alpha: true\r
      });\r
      if (!canvas || !gl) {\r
        return;\r
      }\r
\r
      function createShader(gl: WebGL2RenderingContext, sourceCode: string, type: number) {\r
        const shader = gl.createShader(type);\r
        if (!shader) {\r
          return null;\r
        }\r
\r
        gl.shaderSource(shader, sourceCode);\r
        gl.compileShader(shader);\r
\r
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
          console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));\r
          gl.deleteShader(shader);\r
          return null;\r
        }\r
\r
        return shader;\r
      }\r
\r
      const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);\r
      const fragmentShader = createShader(gl, liquidFragSource, gl.FRAGMENT_SHADER);\r
      const program = gl.createProgram();\r
      if (!program || !vertexShader || !fragmentShader) {\r
        return;\r
      }\r
\r
      gl.attachShader(program, vertexShader);\r
      gl.attachShader(program, fragmentShader);\r
      gl.linkProgram(program);\r
\r
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));\r
        return null;\r
      }\r
\r
      function getUniforms(program: WebGLProgram, gl: WebGL2RenderingContext) {\r
        let uniforms: Record<string, WebGLUniformLocation> = {};\r
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);\r
        for (let i = 0; i < uniformCount; i++) {\r
          let uniformName = gl.getActiveUniform(program, i)?.name;\r
          if (!uniformName) continue;\r
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName) as WebGLUniformLocation;\r
        }\r
        return uniforms;\r
      }\r
      const uniforms = getUniforms(program, gl);\r
      setUniforms(uniforms);\r
\r
      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);\r
      const vertexBuffer = gl.createBuffer();\r
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\r
\r
      gl.useProgram(program);\r
\r
      const positionLocation = gl.getAttribLocation(program, 'a_position');\r
      gl.enableVertexAttribArray(positionLocation);\r
\r
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\r
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);\r
\r
      setGl(gl);\r
    }\r
\r
    initShader();\r
    updateUniforms();\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
    updateUniforms();\r
  }, [gl, params, uniforms]);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
\r
    let renderId: number;\r
\r
    function render(currentTime: number) {\r
      const deltaTime = currentTime - lastRenderTime.current;\r
      lastRenderTime.current = currentTime;\r
\r
      totalAnimationTime.current += deltaTime * params.speed;\r
      gl!.uniform1f(uniforms.u_time, totalAnimationTime.current);\r
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);\r
      renderId = requestAnimationFrame(render);\r
    }\r
\r
    lastRenderTime.current = performance.now();\r
    renderId = requestAnimationFrame(render);\r
\r
    return () => {\r
      cancelAnimationFrame(renderId);\r
    };\r
  }, [gl, params.speed]);\r
\r
  useEffect(() => {\r
    const canvasEl = canvasRef.current;\r
    if (!canvasEl || !gl || !uniforms) return;\r
\r
    function resizeCanvas() {\r
      if (!canvasEl || !gl || !uniforms || !imageData) return;\r
      const imgRatio = imageData.width / imageData.height;\r
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);\r
\r
      const side = 1000;\r
      canvasEl.width = side * devicePixelRatio;\r
      canvasEl.height = side * devicePixelRatio;\r
      gl.viewport(0, 0, canvasEl.height, canvasEl.height);\r
      gl.uniform1f(uniforms.u_ratio, 1);\r
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);\r
    }\r
\r
    resizeCanvas();\r
    window.addEventListener('resize', resizeCanvas);\r
\r
    return () => {\r
      window.removeEventListener('resize', resizeCanvas);\r
    };\r
  }, [gl, uniforms, imageData]);\r
\r
  useEffect(() => {\r
    if (!gl || !uniforms) return;\r
\r
    const existingTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);\r
    if (existingTexture) {\r
      gl.deleteTexture(existingTexture);\r
    }\r
\r
    const imageTexture = gl.createTexture();\r
    gl.activeTexture(gl.TEXTURE0);\r
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);\r
\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
\r
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);\r
\r
    try {\r
      gl.texImage2D(\r
        gl.TEXTURE_2D,\r
        0,\r
        gl.RGBA,\r
        imageData?.width,\r
        imageData?.height,\r
        0,\r
        gl.RGBA,\r
        gl.UNSIGNED_BYTE,\r
        imageData?.data\r
      );\r
\r
      gl.uniform1i(uniforms.u_image_texture, 0);\r
    } catch (e) {\r
      console.error('Error uploading texture:', e);\r
    }\r
\r
    return () => {\r
      if (imageTexture) {\r
        gl.deleteTexture(imageTexture);\r
      }\r
    };\r
  }, [gl, uniforms, imageData]);\r
\r
  return <canvas ref={canvasRef} className="block w-full h-full object-contain" />;\r
}\r
`,nr={usage:`import MetallicPaint, { parseLogoImage } from "./MetallicPaint";
import { useState, useEffect } from 'react';

// replace with your own SVG
// NOTE: your SVG should have a bit of padding around the shape, to keep it from being cut off
// it should also have black fill color, to allow the metallic effect to show through the mask
import logo from '../../assets/logos/react-bits-logo-small-black.svg';

const Component = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "default.png", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);

      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }

    loadDefaultImage();
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MetallicPaint 
        imageData={imageData ?? new ImageData(1, 1)} 
        params={{ edge: 2, patternBlur: 0.005, patternScale: 2, refraction: 0.015, speed: 0.3, liquid: 0.07 }} 
      />
    </div>
  );
}`,code:K,css:J,tailwind:Q,tsCode:$,tsTailwind:rr},ur=()=>{const[u,p]=d.useState(null),[T,r]=d.useState(0),[A,o]=d.useState(2),[y,b]=d.useState(.015),[n,i]=d.useState(.005),[l,g]=d.useState(.07),[t,v]=d.useState(.3),[h,I]=O();d.useEffect(()=>{async function f(){try{const U=await(await fetch(q)).blob(),M=new File([U],"default.png",{type:U.type}),{imageData:P}=await W(M);p(P)}catch(E){console.error("Error loading default image:",E)}}f()},[]);const w=[{name:"imageData",type:"ImageData",default:"none (required)",description:"The processed image data generated from parseLogoImage. This image data is used by the shader to create the liquid paper effect."},{name:"params",type:"ShaderParams",default:"",description:"An object to configure the shader effect. Properties include: patternScale, refraction, edge, patternBlur, liquid, speed"}];return x.jsxs(F,{children:[x.jsxs(X,{children:[x.jsx(B,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:x.jsx(H,{imageData:u,params:{edge:T,patternBlur:n,patternScale:A,refraction:y,speed:t,liquid:l}},h)}),x.jsxs(z,{children:[x.jsx(L,{title:"Edge",min:0,max:2,step:.1,value:T,onChange:f=>{r(f),I()}}),x.jsx(L,{title:"Pattern Scale",min:1,max:5,step:.1,value:A,onChange:f=>{o(f),I()}}),x.jsx(L,{title:"Pattern Blur",min:0,max:.1,step:.001,value:n,onChange:f=>{i(f),I()}}),x.jsx(L,{title:"Refraction",min:0,max:.1,step:.01,value:y,onChange:f=>{b(f),I()}}),x.jsx(L,{title:"Liquid",min:0,max:1,step:.01,value:l,onChange:f=>{g(f),I()}}),x.jsx(L,{title:"Speed",min:0,max:1,step:.01,value:t,onChange:f=>{v(f),I()}})]}),x.jsx(k,{data:w})]}),x.jsx(G,{children:x.jsx(Z,{codeObject:nr})})]})};export{ur as default};
