import{r as s,R as K,P as X,V as Y,M as F,j as e,B as U}from"./index-wsKSLPNH.js";import{T as _,P as B,a as V,C as W,b as N}from"./PropTable-C4uPWs8h.js";import{D as k}from"./Dependencies-BHoMfJUj.js";import{P as L}from"./PreviewSlider-m1G_aiYP.js";import{P as A}from"./PreviewSwitch-DqnF708j.js";import{C as G}from"./Customize-1m_ZNqR9.js";import{B as J}from"./BackgroundContent-CqU7Wlm2.js";import{T as Q}from"./Triangle-66-Bqe-c.js";import"./index-Bpz4cGEA.js";function E(i,c=500){const[l,d]=s.useState(i);return s.useEffect(()=>{const v=setTimeout(()=>d(i),c);return()=>clearTimeout(v)},[i,c]),l}function Z({hue:i=0,hoverIntensity:c=.2,rotateOnHover:l=!0,forceHoverState:d=!1}){const v=s.useRef(null),g=`
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `,f=`
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    varying vec2 vUv;

    vec3 rgb2yiq(vec3 c) {
      float y = dot(c, vec3(0.299, 0.587, 0.114));
      float i = dot(c, vec3(0.596, -0.274, -0.322));
      float q = dot(c, vec3(0.211, -0.523, 0.312));
      return vec3(y, i, q);
    }
    
    vec3 yiq2rgb(vec3 c) {
      float r = c.x + 0.956 * c.y + 0.621 * c.z;
      float g = c.x - 0.272 * c.y - 0.647 * c.z;
      float b = c.x - 1.106 * c.y + 1.703 * c.z;
      return vec3(r, g, b);
    }
    
    vec3 adjustHue(vec3 color, float hueDeg) {
      float hueRad = hueDeg * 3.14159265 / 180.0;
      vec3 yiq = rgb2yiq(color);
      float cosA = cos(hueRad);
      float sinA = sin(hueRad);
      float i = yiq.y * cosA - yiq.z * sinA;
      float q = yiq.y * sinA + yiq.z * cosA;
      yiq.y = i;
      yiq.z = q;
      return yiq2rgb(yiq);
    }

    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
      p3 += dot(p3, p3.yxz + 19.19);
      return -1.0 + 2.0 * fract(vec3(
        p3.x + p3.y,
        p3.x + p3.z,
        p3.y + p3.z
      ) * p3.zyx);
    }

    float snoise3(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K1);
      vec3 d3 = d0 - 0.5;
      vec4 h = max(0.6 - vec4(
        dot(d0, d0),
        dot(d1, d1),
        dot(d2, d2),
        dot(d3, d3)
      ), 0.0);
      vec4 n = h * h * h * h * vec4(
        dot(d0, hash33(i)),
        dot(d1, hash33(i + i1)),
        dot(d2, hash33(i + i2)),
        dot(d3, hash33(i + 1.0))
      );
      return dot(vec4(31.316), n);
    }

    vec4 extractAlpha(vec3 colorIn) {
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);
      return vec4(colorIn.rgb / (a + 1e-5), a);
    }

    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
    const float innerRadius = 0.6;
    const float noiseScale = 0.65;

    float light1(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * attenuation);
    }
    float light2(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * dist * attenuation);
    }

    vec4 draw(vec2 uv) {
      vec3 color1 = adjustHue(baseColor1, hue);
      vec3 color2 = adjustHue(baseColor2, hue);
      vec3 color3 = adjustHue(baseColor3, hue);
      
      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float invLen = len > 0.0 ? 1.0 / len : 0.0;
      
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = light1(1.0, 10.0, d0);
      v0 *= smoothstep(r0 * 1.05, r0, len);
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
      
      float a = iTime * -1.0;
      vec2 pos = vec2(cos(a), sin(a)) * r0;
      float d = distance(uv, pos);
      float v1 = light2(1.5, 5.0, d);
      v1 *= light1(1.0, 50.0, d0);
      
      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
      
      vec3 col = mix(color1, color2, cl);
      col = mix(color3, col, v0);
      col = (col + v1) * v2 * v3;
      col = clamp(col, 0.0, 1.0);
      
      return extractAlpha(col);
    }

    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;
      
      float angle = rot;
      float s = sin(angle);
      float c = cos(angle);
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
      
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
      
      return draw(uv);
    }

    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;return s.useEffect(()=>{const r=v.current;if(!r)return;const h=new K({alpha:!0,premultipliedAlpha:!1}),n=h.gl;n.clearColor(0,0,0,0),r.appendChild(n.canvas);const p=new Q(n),t=new X(n,{vertex:g,fragment:f,uniforms:{iTime:{value:0},iResolution:{value:new Y(n.canvas.width,n.canvas.height,n.canvas.width/n.canvas.height)},hue:{value:i},hover:{value:0},rot:{value:0},hoverIntensity:{value:c}}}),S=new F(n,{geometry:p,program:t});function y(){if(!r)return;const o=window.devicePixelRatio||1,a=r.clientWidth,u=r.clientHeight;h.setSize(a*o,u*o),n.canvas.style.width=a+"px",n.canvas.style.height=u+"px",t.uniforms.iResolution.value.set(n.canvas.width,n.canvas.height,n.canvas.width/n.canvas.height)}window.addEventListener("resize",y),y();let m=0,b=0,w=0;const j=.3,z=o=>{const a=r.getBoundingClientRect(),u=o.clientX-a.left,O=o.clientY-a.top,I=a.width,q=a.height,C=Math.min(I,q),D=I/2,P=q/2,T=(u-D)/C*2,M=(O-P)/C*2;Math.sqrt(T*T+M*M)<.8?m=1:m=0},R=()=>{m=0};r.addEventListener("mousemove",z),r.addEventListener("mouseleave",R);let x;const H=o=>{x=requestAnimationFrame(H);const a=(o-b)*.001;b=o,t.uniforms.iTime.value=o*.001,t.uniforms.hue.value=i,t.uniforms.hoverIntensity.value=c;const u=d?1:m;t.uniforms.hover.value+=(u-t.uniforms.hover.value)*.1,l&&u>.5&&(w+=a*j),t.uniforms.rot.value=w,h.render({scene:S})};return x=requestAnimationFrame(H),()=>{var o;cancelAnimationFrame(x),window.removeEventListener("resize",y),r.removeEventListener("mousemove",z),r.removeEventListener("mouseleave",R),r.removeChild(n.canvas),(o=n.getExtension("WEBGL_lose_context"))==null||o.loseContext()}},[i,c,l,d]),e.jsx("div",{ref:v,className:"orb-container"})}const $=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';\r
import './Orb.css';\r
\r
export default function Orb({ hue = 0, hoverIntensity = 0.2, rotateOnHover = true, forceHoverState = false }) {\r
  const ctnDom = useRef(null);\r
\r
  const vert = /* glsl */ \`\r
    precision highp float;\r
    attribute vec2 position;\r
    attribute vec2 uv;\r
    varying vec2 vUv;\r
    void main() {\r
      vUv = uv;\r
      gl_Position = vec4(position, 0.0, 1.0);\r
    }\r
  \`;\r
\r
  const frag = /* glsl */ \`\r
    precision highp float;\r
\r
    uniform float iTime;\r
    uniform vec3 iResolution;\r
    uniform float hue;\r
    uniform float hover;\r
    uniform float rot;\r
    uniform float hoverIntensity;\r
    varying vec2 vUv;\r
\r
    vec3 rgb2yiq(vec3 c) {\r
      float y = dot(c, vec3(0.299, 0.587, 0.114));\r
      float i = dot(c, vec3(0.596, -0.274, -0.322));\r
      float q = dot(c, vec3(0.211, -0.523, 0.312));\r
      return vec3(y, i, q);\r
    }\r
    \r
    vec3 yiq2rgb(vec3 c) {\r
      float r = c.x + 0.956 * c.y + 0.621 * c.z;\r
      float g = c.x - 0.272 * c.y - 0.647 * c.z;\r
      float b = c.x - 1.106 * c.y + 1.703 * c.z;\r
      return vec3(r, g, b);\r
    }\r
    \r
    vec3 adjustHue(vec3 color, float hueDeg) {\r
      float hueRad = hueDeg * 3.14159265 / 180.0;\r
      vec3 yiq = rgb2yiq(color);\r
      float cosA = cos(hueRad);\r
      float sinA = sin(hueRad);\r
      float i = yiq.y * cosA - yiq.z * sinA;\r
      float q = yiq.y * sinA + yiq.z * cosA;\r
      yiq.y = i;\r
      yiq.z = q;\r
      return yiq2rgb(yiq);\r
    }\r
\r
    vec3 hash33(vec3 p3) {\r
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));\r
      p3 += dot(p3, p3.yxz + 19.19);\r
      return -1.0 + 2.0 * fract(vec3(\r
        p3.x + p3.y,\r
        p3.x + p3.z,\r
        p3.y + p3.z\r
      ) * p3.zyx);\r
    }\r
\r
    float snoise3(vec3 p) {\r
      const float K1 = 0.333333333;\r
      const float K2 = 0.166666667;\r
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);\r
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);\r
      vec3 e = step(vec3(0.0), d0 - d0.yzx);\r
      vec3 i1 = e * (1.0 - e.zxy);\r
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);\r
      vec3 d1 = d0 - (i1 - K2);\r
      vec3 d2 = d0 - (i2 - K1);\r
      vec3 d3 = d0 - 0.5;\r
      vec4 h = max(0.6 - vec4(\r
        dot(d0, d0),\r
        dot(d1, d1),\r
        dot(d2, d2),\r
        dot(d3, d3)\r
      ), 0.0);\r
      vec4 n = h * h * h * h * vec4(\r
        dot(d0, hash33(i)),\r
        dot(d1, hash33(i + i1)),\r
        dot(d2, hash33(i + i2)),\r
        dot(d3, hash33(i + 1.0))\r
      );\r
      return dot(vec4(31.316), n);\r
    }\r
\r
    vec4 extractAlpha(vec3 colorIn) {\r
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);\r
      return vec4(colorIn.rgb / (a + 1e-5), a);\r
    }\r
\r
    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);\r
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);\r
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);\r
    const float innerRadius = 0.6;\r
    const float noiseScale = 0.65;\r
\r
    float light1(float intensity, float attenuation, float dist) {\r
      return intensity / (1.0 + dist * attenuation);\r
    }\r
    float light2(float intensity, float attenuation, float dist) {\r
      return intensity / (1.0 + dist * dist * attenuation);\r
    }\r
\r
    vec4 draw(vec2 uv) {\r
      vec3 color1 = adjustHue(baseColor1, hue);\r
      vec3 color2 = adjustHue(baseColor2, hue);\r
      vec3 color3 = adjustHue(baseColor3, hue);\r
      \r
      float ang = atan(uv.y, uv.x);\r
      float len = length(uv);\r
      float invLen = len > 0.0 ? 1.0 / len : 0.0;\r
      \r
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;\r
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);\r
      float d0 = distance(uv, (r0 * invLen) * uv);\r
      float v0 = light1(1.0, 10.0, d0);\r
      v0 *= smoothstep(r0 * 1.05, r0, len);\r
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;\r
      \r
      float a = iTime * -1.0;\r
      vec2 pos = vec2(cos(a), sin(a)) * r0;\r
      float d = distance(uv, pos);\r
      float v1 = light2(1.5, 5.0, d);\r
      v1 *= light1(1.0, 50.0, d0);\r
      \r
      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);\r
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);\r
      \r
      vec3 col = mix(color1, color2, cl);\r
      col = mix(color3, col, v0);\r
      col = (col + v1) * v2 * v3;\r
      col = clamp(col, 0.0, 1.0);\r
      \r
      return extractAlpha(col);\r
    }\r
\r
    vec4 mainImage(vec2 fragCoord) {\r
      vec2 center = iResolution.xy * 0.5;\r
      float size = min(iResolution.x, iResolution.y);\r
      vec2 uv = (fragCoord - center) / size * 2.0;\r
      \r
      float angle = rot;\r
      float s = sin(angle);\r
      float c = cos(angle);\r
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);\r
      \r
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);\r
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);\r
      \r
      return draw(uv);\r
    }\r
\r
    void main() {\r
      vec2 fragCoord = vUv * iResolution.xy;\r
      vec4 col = mainImage(fragCoord);\r
      gl_FragColor = vec4(col.rgb * col.a, col.a);\r
    }\r
  \`;\r
\r
  useEffect(() => {\r
    const container = ctnDom.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    container.appendChild(gl.canvas);\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vert,\r
      fragment: frag,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        hue: { value: hue },\r
        hover: { value: 0 },\r
        rot: { value: 0 },\r
        hoverIntensity: { value: hoverIntensity }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      if (!container) return;\r
      const dpr = window.devicePixelRatio || 1;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width * dpr, height * dpr);\r
      gl.canvas.style.width = width + 'px';\r
      gl.canvas.style.height = height + 'px';\r
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    let targetHover = 0;\r
    let lastTime = 0;\r
    let currentRot = 0;\r
    const rotationSpeed = 0.3;\r
\r
    const handleMouseMove = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
      const width = rect.width;\r
      const height = rect.height;\r
      const size = Math.min(width, height);\r
      const centerX = width / 2;\r
      const centerY = height / 2;\r
      const uvX = ((x - centerX) / size) * 2.0;\r
      const uvY = ((y - centerY) / size) * 2.0;\r
\r
      if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {\r
        targetHover = 1;\r
      } else {\r
        targetHover = 0;\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      targetHover = 0;\r
    };\r
\r
    container.addEventListener('mousemove', handleMouseMove);\r
    container.addEventListener('mouseleave', handleMouseLeave);\r
\r
    let rafId;\r
    const update = t => {\r
      rafId = requestAnimationFrame(update);\r
      const dt = (t - lastTime) * 0.001;\r
      lastTime = t;\r
      program.uniforms.iTime.value = t * 0.001;\r
      program.uniforms.hue.value = hue;\r
      program.uniforms.hoverIntensity.value = hoverIntensity;\r
\r
      const effectiveHover = forceHoverState ? 1 : targetHover;\r
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;\r
\r
      if (rotateOnHover && effectiveHover > 0.5) {\r
        currentRot += dt * rotationSpeed;\r
      }\r
      program.uniforms.rot.value = currentRot;\r
\r
      renderer.render({ scene: mesh });\r
    };\r
    rafId = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(rafId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeEventListener('mouseleave', handleMouseLeave);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);\r
\r
  return <div ref={ctnDom} className="orb-container" />;\r
}\r
`,nn=`.orb-container {\r
  position: relative;\r
  z-index: 0;\r
  width: 100%;\r
  height: 100%;\r
}\r
`,en=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';\r
\r
export default function Orb({ hue = 0, hoverIntensity = 0.2, rotateOnHover = true, forceHoverState = false }) {\r
  const ctnDom = useRef(null);\r
\r
  const vert = /* glsl */ \`\r
    precision highp float;\r
    attribute vec2 position;\r
    attribute vec2 uv;\r
    varying vec2 vUv;\r
    void main() {\r
      vUv = uv;\r
      gl_Position = vec4(position, 0.0, 1.0);\r
    }\r
  \`;\r
\r
  const frag = /* glsl */ \`\r
    precision highp float;\r
\r
    uniform float iTime;\r
    uniform vec3 iResolution;\r
    uniform float hue;\r
    uniform float hover;\r
    uniform float rot;\r
    uniform float hoverIntensity;\r
    varying vec2 vUv;\r
\r
    vec3 rgb2yiq(vec3 c) {\r
      float y = dot(c, vec3(0.299, 0.587, 0.114));\r
      float i = dot(c, vec3(0.596, -0.274, -0.322));\r
      float q = dot(c, vec3(0.211, -0.523, 0.312));\r
      return vec3(y, i, q);\r
    }\r
    \r
    vec3 yiq2rgb(vec3 c) {\r
      float r = c.x + 0.956 * c.y + 0.621 * c.z;\r
      float g = c.x - 0.272 * c.y - 0.647 * c.z;\r
      float b = c.x - 1.106 * c.y + 1.703 * c.z;\r
      return vec3(r, g, b);\r
    }\r
    \r
    vec3 adjustHue(vec3 color, float hueDeg) {\r
      float hueRad = hueDeg * 3.14159265 / 180.0;\r
      vec3 yiq = rgb2yiq(color);\r
      float cosA = cos(hueRad);\r
      float sinA = sin(hueRad);\r
      float i = yiq.y * cosA - yiq.z * sinA;\r
      float q = yiq.y * sinA + yiq.z * cosA;\r
      yiq.y = i;\r
      yiq.z = q;\r
      return yiq2rgb(yiq);\r
    }\r
\r
    vec3 hash33(vec3 p3) {\r
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));\r
      p3 += dot(p3, p3.yxz + 19.19);\r
      return -1.0 + 2.0 * fract(vec3(\r
        p3.x + p3.y,\r
        p3.x + p3.z,\r
        p3.y + p3.z\r
      ) * p3.zyx);\r
    }\r
\r
    float snoise3(vec3 p) {\r
      const float K1 = 0.333333333;\r
      const float K2 = 0.166666667;\r
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);\r
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);\r
      vec3 e = step(vec3(0.0), d0 - d0.yzx);\r
      vec3 i1 = e * (1.0 - e.zxy);\r
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);\r
      vec3 d1 = d0 - (i1 - K2);\r
      vec3 d2 = d0 - (i2 - K1);\r
      vec3 d3 = d0 - 0.5;\r
      vec4 h = max(0.6 - vec4(\r
        dot(d0, d0),\r
        dot(d1, d1),\r
        dot(d2, d2),\r
        dot(d3, d3)\r
      ), 0.0);\r
      vec4 n = h * h * h * h * vec4(\r
        dot(d0, hash33(i)),\r
        dot(d1, hash33(i + i1)),\r
        dot(d2, hash33(i + i2)),\r
        dot(d3, hash33(i + 1.0))\r
      );\r
      return dot(vec4(31.316), n);\r
    }\r
\r
    vec4 extractAlpha(vec3 colorIn) {\r
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);\r
      return vec4(colorIn.rgb / (a + 1e-5), a);\r
    }\r
\r
    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);\r
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);\r
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);\r
    const float innerRadius = 0.6;\r
    const float noiseScale = 0.65;\r
\r
    float light1(float intensity, float attenuation, float dist) {\r
      return intensity / (1.0 + dist * attenuation);\r
    }\r
    float light2(float intensity, float attenuation, float dist) {\r
      return intensity / (1.0 + dist * dist * attenuation);\r
    }\r
\r
    vec4 draw(vec2 uv) {\r
      vec3 color1 = adjustHue(baseColor1, hue);\r
      vec3 color2 = adjustHue(baseColor2, hue);\r
      vec3 color3 = adjustHue(baseColor3, hue);\r
      \r
      float ang = atan(uv.y, uv.x);\r
      float len = length(uv);\r
      float invLen = len > 0.0 ? 1.0 / len : 0.0;\r
      \r
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;\r
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);\r
      float d0 = distance(uv, (r0 * invLen) * uv);\r
      float v0 = light1(1.0, 10.0, d0);\r
      v0 *= smoothstep(r0 * 1.05, r0, len);\r
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;\r
      \r
      float a = iTime * -1.0;\r
      vec2 pos = vec2(cos(a), sin(a)) * r0;\r
      float d = distance(uv, pos);\r
      float v1 = light2(1.5, 5.0, d);\r
      v1 *= light1(1.0, 50.0, d0);\r
      \r
      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);\r
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);\r
      \r
      vec3 col = mix(color1, color2, cl);\r
      col = mix(color3, col, v0);\r
      col = (col + v1) * v2 * v3;\r
      col = clamp(col, 0.0, 1.0);\r
      \r
      return extractAlpha(col);\r
    }\r
\r
    vec4 mainImage(vec2 fragCoord) {\r
      vec2 center = iResolution.xy * 0.5;\r
      float size = min(iResolution.x, iResolution.y);\r
      vec2 uv = (fragCoord - center) / size * 2.0;\r
      \r
      float angle = rot;\r
      float s = sin(angle);\r
      float c = cos(angle);\r
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);\r
      \r
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);\r
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);\r
      \r
      return draw(uv);\r
    }\r
\r
    void main() {\r
      vec2 fragCoord = vUv * iResolution.xy;\r
      vec4 col = mainImage(fragCoord);\r
      gl_FragColor = vec4(col.rgb * col.a, col.a);\r
    }\r
  \`;\r
\r
  useEffect(() => {\r
    const container = ctnDom.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    container.appendChild(gl.canvas);\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vert,\r
      fragment: frag,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        hue: { value: hue },\r
        hover: { value: 0 },\r
        rot: { value: 0 },\r
        hoverIntensity: { value: hoverIntensity }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      if (!container) return;\r
      const dpr = window.devicePixelRatio || 1;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width * dpr, height * dpr);\r
      gl.canvas.style.width = width + 'px';\r
      gl.canvas.style.height = height + 'px';\r
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    let targetHover = 0;\r
    let lastTime = 0;\r
    let currentRot = 0;\r
    const rotationSpeed = 0.3;\r
\r
    const handleMouseMove = e => {\r
      const rect = container.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
      const width = rect.width;\r
      const height = rect.height;\r
      const size = Math.min(width, height);\r
      const centerX = width / 2;\r
      const centerY = height / 2;\r
      const uvX = ((x - centerX) / size) * 2.0;\r
      const uvY = ((y - centerY) / size) * 2.0;\r
\r
      if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {\r
        targetHover = 1;\r
      } else {\r
        targetHover = 0;\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      targetHover = 0;\r
    };\r
\r
    container.addEventListener('mousemove', handleMouseMove);\r
    container.addEventListener('mouseleave', handleMouseLeave);\r
\r
    let rafId;\r
    const update = t => {\r
      rafId = requestAnimationFrame(update);\r
      const dt = (t - lastTime) * 0.001;\r
      lastTime = t;\r
      program.uniforms.iTime.value = t * 0.001;\r
      program.uniforms.hue.value = hue;\r
      program.uniforms.hoverIntensity.value = hoverIntensity;\r
\r
      const effectiveHover = forceHoverState ? 1 : targetHover;\r
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;\r
\r
      if (rotateOnHover && effectiveHover > 0.5) {\r
        currentRot += dt * rotationSpeed;\r
      }\r
      program.uniforms.rot.value = currentRot;\r
\r
      renderer.render({ scene: mesh });\r
    };\r
    rafId = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(rafId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeEventListener('mouseleave', handleMouseLeave);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);\r
\r
  return <div ref={ctnDom} className="w-full h-full" />;\r
}\r
`,rn=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';\r
\r
import './Orb.css';\r
\r
interface OrbProps {\r
  hue?: number;\r
  hoverIntensity?: number;\r
  rotateOnHover?: boolean;\r
  forceHoverState?: boolean;\r
}\r
\r
export default function Orb({\r
  hue = 0,\r
  hoverIntensity = 0.2,\r
  rotateOnHover = true,\r
  forceHoverState = false\r
}: OrbProps) {\r
  const ctnDom = useRef<HTMLDivElement>(null);\r
\r
  const vert = /* glsl */ \`\r
    precision highp float;\r
    attribute vec2 position;\r
    attribute vec2 uv;\r
    varying vec2 vUv;\r
    void main() {\r
      vUv = uv;\r
      gl_Position = vec4(position, 0.0, 1.0);\r
    }\r
  \`;\r
\r
  const frag = /* glsl */ \`\r
    precision highp float;\r
\r
    uniform float iTime;\r
    uniform vec3 iResolution;\r
    uniform float hue;\r
    uniform float hover;\r
    uniform float rot;\r
    uniform float hoverIntensity;\r
    varying vec2 vUv;\r
\r
    vec3 rgb2yiq(vec3 c) {\r
      float y = dot(c, vec3(0.299, 0.587, 0.114));\r
      float i = dot(c, vec3(0.596, -0.274, -0.322));\r
      float q = dot(c, vec3(0.211, -0.523, 0.312));\r
      return vec3(y, i, q);\r
    }\r
    \r
    vec3 yiq2rgb(vec3 c) {\r
      float r = c.x + 0.956 * c.y + 0.621 * c.z;\r
      float g = c.x - 0.272 * c.y - 0.647 * c.z;\r
      float b = c.x - 1.106 * c.y + 1.703 * c.z;\r
      return vec3(r, g, b);\r
    }\r
    \r
    vec3 adjustHue(vec3 color, float hueDeg) {\r
      float hueRad = hueDeg * 3.14159265 / 180.0;\r
      vec3 yiq = rgb2yiq(color);\r
      float cosA = cos(hueRad);\r
      float sinA = sin(hueRad);\r
      float i = yiq.y * cosA - yiq.z * sinA;\r
      float q = yiq.y * sinA + yiq.z * cosA;\r
      yiq.y = i;\r
      yiq.z = q;\r
      return yiq2rgb(yiq);\r
    }\r
    \r
    vec3 hash33(vec3 p3) {\r
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));\r
      p3 += dot(p3, p3.yxz + 19.19);\r
      return -1.0 + 2.0 * fract(vec3(\r
        p3.x + p3.y,\r
        p3.x + p3.z,\r
        p3.y + p3.z\r
      ) * p3.zyx);\r
    }\r
    \r
    float snoise3(vec3 p) {\r
      const float K1 = 0.333333333;\r
      const float K2 = 0.166666667;\r
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);\r
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);\r
      vec3 e = step(vec3(0.0), d0 - d0.yzx);\r
      vec3 i1 = e * (1.0 - e.zxy);\r
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);\r
      vec3 d1 = d0 - (i1 - K2);\r
      vec3 d2 = d0 - (i2 - K1);\r
      vec3 d3 = d0 - 0.5;\r
      vec4 h = max(0.6 - vec4(\r
        dot(d0, d0),\r
        dot(d1, d1),\r
        dot(d2, d2),\r
        dot(d3, d3)\r
      ), 0.0);\r
      vec4 n = h * h * h * h * vec4(\r
        dot(d0, hash33(i)),\r
        dot(d1, hash33(i + i1)),\r
        dot(d2, hash33(i + i2)),\r
        dot(d3, hash33(i + 1.0))\r
      );\r
      return dot(vec4(31.316), n);\r
    }\r
    \r
    vec4 extractAlpha(vec3 colorIn) {\r
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);\r
      return vec4(colorIn.rgb / (a + 1e-5), a);\r
    }\r
    \r
    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);\r
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);\r
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);\r
    const float innerRadius = 0.6;\r
    const float noiseScale = 0.65;\r
    \r
    float light1(float intensity, float attenuation, float dist) {\r
      return intensity / (1.0 + dist * attenuation);\r
    }\r
    \r
    float light2(float intensity, float attenuation, float dist) {\r
      return intensity / (1.0 + dist * dist * attenuation);\r
    }\r
    \r
    vec4 draw(vec2 uv) {\r
      vec3 color1 = adjustHue(baseColor1, hue);\r
      vec3 color2 = adjustHue(baseColor2, hue);\r
      vec3 color3 = adjustHue(baseColor3, hue);\r
      \r
      float ang = atan(uv.y, uv.x);\r
      float len = length(uv);\r
      float invLen = len > 0.0 ? 1.0 / len : 0.0;\r
      \r
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;\r
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);\r
      float d0 = distance(uv, (r0 * invLen) * uv);\r
      float v0 = light1(1.0, 10.0, d0);\r
      v0 *= smoothstep(r0 * 1.05, r0, len);\r
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;\r
      \r
      float a = iTime * -1.0;\r
      vec2 pos = vec2(cos(a), sin(a)) * r0;\r
      float d = distance(uv, pos);\r
      float v1 = light2(1.5, 5.0, d);\r
      v1 *= light1(1.0, 50.0, d0);\r
      \r
      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);\r
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);\r
      \r
      vec3 col = mix(color1, color2, cl);\r
      col = mix(color3, col, v0);\r
      col = (col + v1) * v2 * v3;\r
      col = clamp(col, 0.0, 1.0);\r
      \r
      return extractAlpha(col);\r
    }\r
    \r
    vec4 mainImage(vec2 fragCoord) {\r
      vec2 center = iResolution.xy * 0.5;\r
      float size = min(iResolution.x, iResolution.y);\r
      vec2 uv = (fragCoord - center) / size * 2.0;\r
      \r
      float angle = rot;\r
      float s = sin(angle);\r
      float c = cos(angle);\r
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);\r
      \r
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);\r
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);\r
      \r
      return draw(uv);\r
    }\r
    \r
    void main() {\r
      vec2 fragCoord = vUv * iResolution.xy;\r
      vec4 col = mainImage(fragCoord);\r
      gl_FragColor = vec4(col.rgb * col.a, col.a);\r
    }\r
  \`;\r
\r
  useEffect(() => {\r
    const container = ctnDom.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    container.appendChild(gl.canvas);\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vert,\r
      fragment: frag,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        hue: { value: hue },\r
        hover: { value: 0 },\r
        rot: { value: 0 },\r
        hoverIntensity: { value: hoverIntensity }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      if (!container) return;\r
      const dpr = window.devicePixelRatio || 1;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width * dpr, height * dpr);\r
      gl.canvas.style.width = width + 'px';\r
      gl.canvas.style.height = height + 'px';\r
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    let targetHover = 0;\r
    let lastTime = 0;\r
    let currentRot = 0;\r
    const rotationSpeed = 0.3;\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
      const width = rect.width;\r
      const height = rect.height;\r
      const size = Math.min(width, height);\r
      const centerX = width / 2;\r
      const centerY = height / 2;\r
      const uvX = ((x - centerX) / size) * 2.0;\r
      const uvY = ((y - centerY) / size) * 2.0;\r
\r
      if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {\r
        targetHover = 1;\r
      } else {\r
        targetHover = 0;\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      targetHover = 0;\r
    };\r
\r
    container.addEventListener('mousemove', handleMouseMove);\r
    container.addEventListener('mouseleave', handleMouseLeave);\r
\r
    let rafId: number;\r
    const update = (t: number) => {\r
      rafId = requestAnimationFrame(update);\r
      const dt = (t - lastTime) * 0.001;\r
      lastTime = t;\r
      program.uniforms.iTime.value = t * 0.001;\r
      program.uniforms.hue.value = hue;\r
      program.uniforms.hoverIntensity.value = hoverIntensity;\r
\r
      const effectiveHover = forceHoverState ? 1 : targetHover;\r
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;\r
\r
      if (rotateOnHover && effectiveHover > 0.5) {\r
        currentRot += dt * rotationSpeed;\r
      }\r
      program.uniforms.rot.value = currentRot;\r
\r
      renderer.render({ scene: mesh });\r
    };\r
    rafId = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(rafId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeEventListener('mouseleave', handleMouseLeave);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);\r
\r
  return <div ref={ctnDom} className="orb-container" />;\r
}\r
`,tn=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';\r
\r
interface OrbProps {\r
  hue?: number;\r
  hoverIntensity?: number;\r
  rotateOnHover?: boolean;\r
  forceHoverState?: boolean;\r
}\r
\r
export default function Orb({\r
  hue = 0,\r
  hoverIntensity = 0.2,\r
  rotateOnHover = true,\r
  forceHoverState = false\r
}: OrbProps) {\r
  const ctnDom = useRef<HTMLDivElement>(null);\r
\r
  const vert = /* glsl */ \`\r
    precision highp float;\r
    attribute vec2 position;\r
    attribute vec2 uv;\r
    varying vec2 vUv;\r
    void main() {\r
      vUv = uv;\r
      gl_Position = vec4(position, 0.0, 1.0);\r
    }\r
  \`;\r
\r
  const frag = /* glsl */ \`\r
    precision highp float;\r
\r
    uniform float iTime;\r
    uniform vec3 iResolution;\r
    uniform float hue;\r
    uniform float hover;\r
    uniform float rot;\r
    uniform float hoverIntensity;\r
    varying vec2 vUv;\r
\r
    vec3 rgb2yiq(vec3 c) {\r
      float y = dot(c, vec3(0.299, 0.587, 0.114));\r
      float i = dot(c, vec3(0.596, -0.274, -0.322));\r
      float q = dot(c, vec3(0.211, -0.523, 0.312));\r
      return vec3(y, i, q);\r
    }\r
    \r
    vec3 yiq2rgb(vec3 c) {\r
      float r = c.x + 0.956 * c.y + 0.621 * c.z;\r
      float g = c.x - 0.272 * c.y - 0.647 * c.z;\r
      float b = c.x - 1.106 * c.y + 1.703 * c.z;\r
      return vec3(r, g, b);\r
    }\r
    \r
    vec3 adjustHue(vec3 color, float hueDeg) {\r
      float hueRad = hueDeg * 3.14159265 / 180.0;\r
      vec3 yiq = rgb2yiq(color);\r
      float cosA = cos(hueRad);\r
      float sinA = sin(hueRad);\r
      float i = yiq.y * cosA - yiq.z * sinA;\r
      float q = yiq.y * sinA + yiq.z * cosA;\r
      yiq.y = i;\r
      yiq.z = q;\r
      return yiq2rgb(yiq);\r
    }\r
    \r
    vec3 hash33(vec3 p3) {\r
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));\r
      p3 += dot(p3, p3.yxz + 19.19);\r
      return -1.0 + 2.0 * fract(vec3(\r
        p3.x + p3.y,\r
        p3.x + p3.z,\r
        p3.y + p3.z\r
      ) * p3.zyx);\r
    }\r
    \r
    float snoise3(vec3 p) {\r
      const float K1 = 0.333333333;\r
      const float K2 = 0.166666667;\r
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);\r
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);\r
      vec3 e = step(vec3(0.0), d0 - d0.yzx);\r
      vec3 i1 = e * (1.0 - e.zxy);\r
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);\r
      vec3 d1 = d0 - (i1 - K2);\r
      vec3 d2 = d0 - (i2 - K1);\r
      vec3 d3 = d0 - 0.5;\r
      vec4 h = max(0.6 - vec4(\r
        dot(d0, d0),\r
        dot(d1, d1),\r
        dot(d2, d2),\r
        dot(d3, d3)\r
      ), 0.0);\r
      vec4 n = h * h * h * h * vec4(\r
        dot(d0, hash33(i)),\r
        dot(d1, hash33(i + i1)),\r
        dot(d2, hash33(i + i2)),\r
        dot(d3, hash33(i + 1.0))\r
      );\r
      return dot(vec4(31.316), n);\r
    }\r
    \r
    vec4 extractAlpha(vec3 colorIn) {\r
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);\r
      return vec4(colorIn.rgb / (a + 1e-5), a);\r
    }\r
    \r
    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);\r
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);\r
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);\r
    const float innerRadius = 0.6;\r
    const float noiseScale = 0.65;\r
    \r
    float light1(float intensity, float attenuation, float dist) {\r
      return intensity / (1.0 + dist * attenuation);\r
    }\r
    \r
    float light2(float intensity, float attenuation, float dist) {\r
      return intensity / (1.0 + dist * dist * attenuation);\r
    }\r
    \r
    vec4 draw(vec2 uv) {\r
      vec3 color1 = adjustHue(baseColor1, hue);\r
      vec3 color2 = adjustHue(baseColor2, hue);\r
      vec3 color3 = adjustHue(baseColor3, hue);\r
      \r
      float ang = atan(uv.y, uv.x);\r
      float len = length(uv);\r
      float invLen = len > 0.0 ? 1.0 / len : 0.0;\r
      \r
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;\r
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);\r
      float d0 = distance(uv, (r0 * invLen) * uv);\r
      float v0 = light1(1.0, 10.0, d0);\r
      v0 *= smoothstep(r0 * 1.05, r0, len);\r
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;\r
      \r
      float a = iTime * -1.0;\r
      vec2 pos = vec2(cos(a), sin(a)) * r0;\r
      float d = distance(uv, pos);\r
      float v1 = light2(1.5, 5.0, d);\r
      v1 *= light1(1.0, 50.0, d0);\r
      \r
      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);\r
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);\r
      \r
      vec3 col = mix(color1, color2, cl);\r
      col = mix(color3, col, v0);\r
      col = (col + v1) * v2 * v3;\r
      col = clamp(col, 0.0, 1.0);\r
      \r
      return extractAlpha(col);\r
    }\r
    \r
    vec4 mainImage(vec2 fragCoord) {\r
      vec2 center = iResolution.xy * 0.5;\r
      float size = min(iResolution.x, iResolution.y);\r
      vec2 uv = (fragCoord - center) / size * 2.0;\r
      \r
      float angle = rot;\r
      float s = sin(angle);\r
      float c = cos(angle);\r
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);\r
      \r
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);\r
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);\r
      \r
      return draw(uv);\r
    }\r
    \r
    void main() {\r
      vec2 fragCoord = vUv * iResolution.xy;\r
      vec4 col = mainImage(fragCoord);\r
      gl_FragColor = vec4(col.rgb * col.a, col.a);\r
    }\r
  \`;\r
\r
  useEffect(() => {\r
    const container = ctnDom.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    container.appendChild(gl.canvas);\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vert,\r
      fragment: frag,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        hue: { value: hue },\r
        hover: { value: 0 },\r
        rot: { value: 0 },\r
        hoverIntensity: { value: hoverIntensity }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      if (!container) return;\r
      const dpr = window.devicePixelRatio || 1;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width * dpr, height * dpr);\r
      gl.canvas.style.width = width + 'px';\r
      gl.canvas.style.height = height + 'px';\r
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    let targetHover = 0;\r
    let lastTime = 0;\r
    let currentRot = 0;\r
    const rotationSpeed = 0.3;\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
      const width = rect.width;\r
      const height = rect.height;\r
      const size = Math.min(width, height);\r
      const centerX = width / 2;\r
      const centerY = height / 2;\r
      const uvX = ((x - centerX) / size) * 2.0;\r
      const uvY = ((y - centerY) / size) * 2.0;\r
\r
      if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {\r
        targetHover = 1;\r
      } else {\r
        targetHover = 0;\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      targetHover = 0;\r
    };\r
\r
    container.addEventListener('mousemove', handleMouseMove);\r
    container.addEventListener('mouseleave', handleMouseLeave);\r
\r
    let rafId: number;\r
    const update = (t: number) => {\r
      rafId = requestAnimationFrame(update);\r
      const dt = (t - lastTime) * 0.001;\r
      lastTime = t;\r
      program.uniforms.iTime.value = t * 0.001;\r
      program.uniforms.hue.value = hue;\r
      program.uniforms.hoverIntensity.value = hoverIntensity;\r
\r
      const effectiveHover = forceHoverState ? 1 : targetHover;\r
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;\r
\r
      if (rotateOnHover && effectiveHover > 0.5) {\r
        currentRot += dt * rotationSpeed;\r
      }\r
      program.uniforms.rot.value = currentRot;\r
\r
      renderer.render({ scene: mesh });\r
    };\r
    rafId = requestAnimationFrame(update);\r
\r
    return () => {\r
      cancelAnimationFrame(rafId);\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', handleMouseMove);\r
      container.removeEventListener('mouseleave', handleMouseLeave);\r
      container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);\r
\r
  return <div ref={ctnDom} className="w-full h-full" />;\r
}\r
`,on={dependencies:"ogl",usage:`import Orb from './Orb';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Orb
    hoverIntensity={0.5}
    rotateOnHover={true}
    hue={0}
    forceHoverState={false}
  />
</div>`,code:$,css:nn,tailwind:en,tsCode:rn,tsTailwind:tn},mn=()=>{const[i,c]=s.useState(0),[l,d]=s.useState(2),[v,g]=s.useState(!0),[f,r]=s.useState(!1),h=E(i,300),n=E(l,300),p=[{name:"hue",type:"number",default:"0",description:"The base hue for the orb (in degrees)."},{name:"hoverIntensity",type:"number",default:"0.2",description:"Controls the intensity of the hover distortion effect."},{name:"rotateOnHover",type:"boolean",default:"true",description:"Toggle to enable or disable continuous rotation on hover."},{name:"forceHoverState",type:"boolean",default:"false",description:"Force hover animations even when the orb is not actually hovered."}];return e.jsxs(_,{children:[e.jsxs(B,{children:[e.jsxs(U,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[e.jsx(Z,{hoverIntensity:n,rotateOnHover:v,hue:h,forceHoverState:f}),e.jsx(J,{pillText:"New Background",headline:"This orb is hiding something, try hovering!"})]}),e.jsxs(G,{children:[e.jsx(L,{title:"Hue Shift",min:0,max:360,step:1,value:i,onChange:c}),e.jsx(L,{title:"Hover Intensity",min:0,max:5,step:.01,value:l,onChange:d}),e.jsx(A,{title:"Rotate On Hover",isChecked:v,onChange:t=>g(t)}),e.jsx(A,{title:"Force Hover State",isChecked:f,onChange:t=>r(t)})]}),e.jsx(V,{data:p}),e.jsx(k,{dependencyList:["ogl"]})]}),e.jsx(W,{children:e.jsx(N,{codeObject:on})})]})};export{mn as default};
