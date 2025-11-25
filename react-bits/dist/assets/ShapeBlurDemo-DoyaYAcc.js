import{r as s,j as e,B as V,T as O}from"./index-wsKSLPNH.js";import{T as I,P as D,a as L,C as k,b as j}from"./PropTable-C4uPWs8h.js";import{D as W}from"./Dependencies-BHoMfJUj.js";import{P as m}from"./PreviewSlider-m1G_aiYP.js";import{C as B}from"./Customize-1m_ZNqR9.js";import{V as y,S as N,O as q,W as G,P as U,a as X,M as Y,b as $}from"./three.module-0PRdiASR.js";import"./index-Bpz4cGEA.js";const J=`
varying vec2 v_texcoord;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_texcoord = uv;
}
`,K=`
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;

#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif

#ifndef VAR
#define VAR 0
#endif

#ifndef FNC_COORD
#define FNC_COORD
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}
#endif

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse * u_pixelRatio)

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}
float sdPoly(in vec2 p, in float w, in int sides) {
    float a = atan(p.x, p.y) + PI;
    float r = TWO_PI / float(sides);
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));
    return d * 2.0 - w;
}

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}
float fill(in float x) { return 1.0 - aastep(0.0, x); }
float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}
float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }
float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

float strokeAA(float x, float size, float w, float edge) {
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st = st0 + 0.5;
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;

    float size = u_shapeSize;
    float roundness = u_roundness;
    float borderSize = u_borderSize;
    float circleSize = u_circleSize;
    float circleEdge = u_circleEdge;

    float sdfCircle = fill(
        sdCircle(st, posMouse),
        circleSize,
        circleEdge
    );

    float sdf;
    if (VAR == 0) {
        sdf = sdRoundRect(st, vec2(size), roundness);
        sdf = strokeAA(sdf, 0.0, borderSize, sdfCircle) * 4.0;
    } else if (VAR == 1) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;
    } else if (VAR == 2) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = strokeAA(sdf, 0.58, 0.02, sdfCircle) * 4.0;
    } else if (VAR == 3) {
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;
    }

    vec3 color = vec3(1.0);
    float alpha = sdf;
    gl_FragColor = vec4(color.rgb, alpha);
}
`,Q=({className:p="",variation:v=0,pixelRatioProp:d=2,shapeSize:h=1.2,roundness:c=.4,borderSize:x=.05,circleSize:u=.3,circleEdge:z=.5})=>{const n=s.useRef();return s.useEffect(()=>{const f=n.current;let _,w=0,C=0;const b=new y,E=new y,P=new y;let a=1,l=1;const M=new N,t=new q;t.position.z=1;const o=new G({alpha:!0});o.setClearColor(0,0),f.appendChild(o.domElement);const H=new U(1,1),T=new X({vertexShader:J,fragmentShader:K,uniforms:{u_mouse:{value:E},u_resolution:{value:P},u_pixelRatio:{value:d},u_shapeSize:{value:h},u_roundness:{value:c},u_borderSize:{value:x},u_circleSize:{value:u},u_circleEdge:{value:z}},defines:{VAR:v},transparent:!0}),A=new Y(H,T);M.add(A);const g=i=>{const r=f.getBoundingClientRect();b.set(i.clientX-r.left,i.clientY-r.top)};document.addEventListener("mousemove",g),document.addEventListener("pointermove",g);const R=()=>{const i=n.current;a=i.clientWidth,l=i.clientHeight;const r=Math.min(window.devicePixelRatio,2);o.setSize(a,l),o.setPixelRatio(r),t.left=-a/2,t.right=a/2,t.top=l/2,t.bottom=-l/2,t.updateProjectionMatrix(),A.scale.set(a,l,1),P.set(a,l).multiplyScalar(r),T.uniforms.u_pixelRatio.value=r};R(),window.addEventListener("resize",R);const S=new ResizeObserver(()=>R());n.current&&S.observe(n.current);const F=()=>{w=performance.now()*.001;const i=w-C;C=w,["x","y"].forEach(r=>{E[r]=$.damp(E[r],b[r],8,i)}),o.render(M,t),_=requestAnimationFrame(F)};return F(),()=>{cancelAnimationFrame(_),window.removeEventListener("resize",R),S&&S.disconnect(),document.removeEventListener("mousemove",g),document.removeEventListener("pointermove",g),f.removeChild(o.domElement),o.dispose()}},[v,d,h,c,x,u,z]),e.jsx("div",{className:p,ref:n,style:{width:"100%",height:"100%"}})},Z=`import { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
\r
const vertexShader = /* glsl */ \`\r
varying vec2 v_texcoord;\r
void main() {\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
    v_texcoord = uv;\r
}\r
\`;\r
\r
const fragmentShader = /* glsl */ \`\r
varying vec2 v_texcoord;\r
\r
uniform vec2 u_mouse;\r
uniform vec2 u_resolution;\r
uniform float u_pixelRatio;\r
\r
uniform float u_shapeSize;\r
uniform float u_roundness;\r
uniform float u_borderSize;\r
uniform float u_circleSize;\r
uniform float u_circleEdge;\r
\r
#ifndef PI\r
#define PI 3.1415926535897932384626433832795\r
#endif\r
#ifndef TWO_PI\r
#define TWO_PI 6.2831853071795864769252867665590\r
#endif\r
\r
#ifndef VAR\r
#define VAR 0\r
#endif\r
\r
#ifndef FNC_COORD\r
#define FNC_COORD\r
vec2 coord(in vec2 p) {\r
    p = p / u_resolution.xy;\r
    if (u_resolution.x > u_resolution.y) {\r
        p.x *= u_resolution.x / u_resolution.y;\r
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;\r
    } else {\r
        p.y *= u_resolution.y / u_resolution.x;\r
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;\r
    }\r
    p -= 0.5;\r
    p *= vec2(-1.0, 1.0);\r
    return p;\r
}\r
#endif\r
\r
#define st0 coord(gl_FragCoord.xy)\r
#define mx coord(u_mouse * u_pixelRatio)\r
\r
float sdRoundRect(vec2 p, vec2 b, float r) {\r
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);\r
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;\r
}\r
float sdCircle(in vec2 st, in vec2 center) {\r
    return length(st - center) * 2.0;\r
}\r
float sdPoly(in vec2 p, in float w, in int sides) {\r
    float a = atan(p.x, p.y) + PI;\r
    float r = TWO_PI / float(sides);\r
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));\r
    return d * 2.0 - w;\r
}\r
\r
float aastep(float threshold, float value) {\r
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;\r
    return smoothstep(threshold - afwidth, threshold + afwidth, value);\r
}\r
float fill(in float x) { return 1.0 - aastep(0.0, x); }\r
float fill(float x, float size, float edge) {\r
    return 1.0 - smoothstep(size - edge, size + edge, x);\r
}\r
float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }\r
float stroke(float x, float size, float w, float edge) {\r
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);\r
    return clamp(d, 0.0, 1.0);\r
}\r
\r
float strokeAA(float x, float size, float w, float edge) {\r
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;\r
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)\r
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);\r
    return clamp(d, 0.0, 1.0);\r
}\r
\r
void main() {\r
    vec2 st = st0 + 0.5;\r
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;\r
\r
    float size = u_shapeSize;\r
    float roundness = u_roundness;\r
    float borderSize = u_borderSize;\r
    float circleSize = u_circleSize;\r
    float circleEdge = u_circleEdge;\r
\r
    float sdfCircle = fill(\r
        sdCircle(st, posMouse),\r
        circleSize,\r
        circleEdge\r
    );\r
\r
    float sdf;\r
    if (VAR == 0) {\r
        sdf = sdRoundRect(st, vec2(size), roundness);\r
        sdf = strokeAA(sdf, 0.0, borderSize, sdfCircle) * 4.0;\r
    } else if (VAR == 1) {\r
        sdf = sdCircle(st, vec2(0.5));\r
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;\r
    } else if (VAR == 2) {\r
        sdf = sdCircle(st, vec2(0.5));\r
        sdf = strokeAA(sdf, 0.58, 0.02, sdfCircle) * 4.0;\r
    } else if (VAR == 3) {\r
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);\r
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;\r
    }\r
\r
    vec3 color = vec3(1.0);\r
    float alpha = sdf;\r
    gl_FragColor = vec4(color.rgb, alpha);\r
}\r
\`;\r
\r
const ShapeBlur = ({\r
  className = '',\r
  variation = 0,\r
  pixelRatioProp = 2,\r
  shapeSize = 1.2,\r
  roundness = 0.4,\r
  borderSize = 0.05,\r
  circleSize = 0.3,\r
  circleEdge = 0.5\r
}) => {\r
  const mountRef = useRef();\r
\r
  useEffect(() => {\r
    const mount = mountRef.current;\r
    let animationFrameId;\r
    let time = 0,\r
      lastTime = 0;\r
\r
    const vMouse = new THREE.Vector2();\r
    const vMouseDamp = new THREE.Vector2();\r
    const vResolution = new THREE.Vector2();\r
\r
    let w = 1,\r
      h = 1;\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera();\r
    camera.position.z = 1;\r
\r
    const renderer = new THREE.WebGLRenderer({ alpha: true });\r
    renderer.setClearColor(0x000000, 0);\r
    mount.appendChild(renderer.domElement);\r
\r
    const geo = new THREE.PlaneGeometry(1, 1);\r
    const material = new THREE.ShaderMaterial({\r
      vertexShader,\r
      fragmentShader,\r
      uniforms: {\r
        u_mouse: { value: vMouseDamp },\r
        u_resolution: { value: vResolution },\r
        u_pixelRatio: { value: pixelRatioProp },\r
        u_shapeSize: { value: shapeSize },\r
        u_roundness: { value: roundness },\r
        u_borderSize: { value: borderSize },\r
        u_circleSize: { value: circleSize },\r
        u_circleEdge: { value: circleEdge }\r
      },\r
      defines: { VAR: variation },\r
      transparent: true\r
    });\r
\r
    const quad = new THREE.Mesh(geo, material);\r
    scene.add(quad);\r
\r
    const onPointerMove = e => {\r
      const rect = mount.getBoundingClientRect();\r
      vMouse.set(e.clientX - rect.left, e.clientY - rect.top);\r
    };\r
\r
    document.addEventListener('mousemove', onPointerMove);\r
    document.addEventListener('pointermove', onPointerMove);\r
\r
    const resize = () => {\r
      const container = mountRef.current;\r
      w = container.clientWidth;\r
      h = container.clientHeight;\r
      const dpr = Math.min(window.devicePixelRatio, 2);\r
\r
      renderer.setSize(w, h);\r
      renderer.setPixelRatio(dpr);\r
\r
      camera.left = -w / 2;\r
      camera.right = w / 2;\r
      camera.top = h / 2;\r
      camera.bottom = -h / 2;\r
      camera.updateProjectionMatrix();\r
\r
      quad.scale.set(w, h, 1);\r
      vResolution.set(w, h).multiplyScalar(dpr);\r
      material.uniforms.u_pixelRatio.value = dpr;\r
    };\r
\r
    resize();\r
    window.addEventListener('resize', resize);\r
\r
    const ro = new ResizeObserver(() => resize());\r
    if (mountRef.current) ro.observe(mountRef.current);\r
\r
    const update = () => {\r
      time = performance.now() * 0.001;\r
      const dt = time - lastTime;\r
      lastTime = time;\r
\r
      ['x', 'y'].forEach(k => {\r
        vMouseDamp[k] = THREE.MathUtils.damp(vMouseDamp[k], vMouse[k], 8, dt);\r
      });\r
\r
      renderer.render(scene, camera);\r
      animationFrameId = requestAnimationFrame(update);\r
    };\r
    update();\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      if (ro) ro.disconnect();\r
      document.removeEventListener('mousemove', onPointerMove);\r
      document.removeEventListener('pointermove', onPointerMove);\r
      mount.removeChild(renderer.domElement);\r
      renderer.dispose();\r
    };\r
  }, [variation, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge]);\r
\r
  return <div className={className} ref={mountRef} style={{ width: '100%', height: '100%' }} />;\r
};\r
\r
export default ShapeBlur;\r
`,ee=`import { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
\r
const vertexShader = /* glsl */ \`\r
varying vec2 v_texcoord;\r
void main() {\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
    v_texcoord = uv;\r
}\r
\`;\r
\r
const fragmentShader = /* glsl */ \`\r
varying vec2 v_texcoord;\r
\r
uniform vec2 u_mouse;\r
uniform vec2 u_resolution;\r
uniform float u_pixelRatio;\r
\r
uniform float u_shapeSize;\r
uniform float u_roundness;\r
uniform float u_borderSize;\r
uniform float u_circleSize;\r
uniform float u_circleEdge;\r
\r
#ifndef PI\r
#define PI 3.1415926535897932384626433832795\r
#endif\r
#ifndef TWO_PI\r
#define TWO_PI 6.2831853071795864769252867665590\r
#endif\r
\r
#ifndef VAR\r
#define VAR 0\r
#endif\r
\r
#ifndef FNC_COORD\r
#define FNC_COORD\r
vec2 coord(in vec2 p) {\r
    p = p / u_resolution.xy;\r
    if (u_resolution.x > u_resolution.y) {\r
        p.x *= u_resolution.x / u_resolution.y;\r
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;\r
    } else {\r
        p.y *= u_resolution.y / u_resolution.x;\r
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;\r
    }\r
    p -= 0.5;\r
    p *= vec2(-1.0, 1.0);\r
    return p;\r
}\r
#endif\r
\r
#define st0 coord(gl_FragCoord.xy)\r
#define mx coord(u_mouse * u_pixelRatio)\r
\r
float sdRoundRect(vec2 p, vec2 b, float r) {\r
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);\r
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;\r
}\r
float sdCircle(in vec2 st, in vec2 center) {\r
    return length(st - center) * 2.0;\r
}\r
float sdPoly(in vec2 p, in float w, in int sides) {\r
    float a = atan(p.x, p.y) + PI;\r
    float r = TWO_PI / float(sides);\r
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));\r
    return d * 2.0 - w;\r
}\r
\r
float aastep(float threshold, float value) {\r
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;\r
    return smoothstep(threshold - afwidth, threshold + afwidth, value);\r
}\r
float fill(in float x) { return 1.0 - aastep(0.0, x); }\r
float fill(float x, float size, float edge) {\r
    return 1.0 - smoothstep(size - edge, size + edge, x);\r
}\r
float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }\r
float stroke(float x, float size, float w, float edge) {\r
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);\r
    return clamp(d, 0.0, 1.0);\r
}\r
\r
float strokeAA(float x, float size, float w, float edge) {\r
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;\r
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)\r
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);\r
    return clamp(d, 0.0, 1.0);\r
}\r
\r
void main() {\r
    vec2 st = st0 + 0.5;\r
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;\r
\r
    float size = u_shapeSize;\r
    float roundness = u_roundness;\r
    float borderSize = u_borderSize;\r
    float circleSize = u_circleSize;\r
    float circleEdge = u_circleEdge;\r
\r
    float sdfCircle = fill(\r
        sdCircle(st, posMouse),\r
        circleSize,\r
        circleEdge\r
    );\r
\r
    float sdf;\r
    if (VAR == 0) {\r
        sdf = sdRoundRect(st, vec2(size), roundness);\r
        sdf = strokeAA(sdf, 0.0, borderSize, sdfCircle) * 4.0;\r
    } else if (VAR == 1) {\r
        sdf = sdCircle(st, vec2(0.5));\r
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;\r
    } else if (VAR == 2) {\r
        sdf = sdCircle(st, vec2(0.5));\r
        sdf = strokeAA(sdf, 0.58, 0.02, sdfCircle) * 4.0;\r
    } else if (VAR == 3) {\r
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);\r
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;\r
    }\r
\r
    vec3 color = vec3(1.0);\r
    float alpha = sdf;\r
    gl_FragColor = vec4(color.rgb, alpha);\r
}\r
\`;\r
\r
const ShapeBlur = ({\r
  className = '',\r
  variation = 0,\r
  pixelRatioProp = 2,\r
  shapeSize = 1.2,\r
  roundness = 0.4,\r
  borderSize = 0.05,\r
  circleSize = 0.3,\r
  circleEdge = 0.5\r
}) => {\r
  const mountRef = useRef();\r
\r
  useEffect(() => {\r
    const mount = mountRef.current;\r
    let animationFrameId;\r
    let time = 0,\r
      lastTime = 0;\r
\r
    const vMouse = new THREE.Vector2();\r
    const vMouseDamp = new THREE.Vector2();\r
    const vResolution = new THREE.Vector2();\r
\r
    let w = 1,\r
      h = 1;\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera();\r
    camera.position.z = 1;\r
\r
    const renderer = new THREE.WebGLRenderer({ alpha: true });\r
    renderer.setClearColor(0x000000, 0);\r
    mount.appendChild(renderer.domElement);\r
\r
    const geo = new THREE.PlaneGeometry(1, 1);\r
    const material = new THREE.ShaderMaterial({\r
      vertexShader,\r
      fragmentShader,\r
      uniforms: {\r
        u_mouse: { value: vMouseDamp },\r
        u_resolution: { value: vResolution },\r
        u_pixelRatio: { value: pixelRatioProp },\r
        u_shapeSize: { value: shapeSize },\r
        u_roundness: { value: roundness },\r
        u_borderSize: { value: borderSize },\r
        u_circleSize: { value: circleSize },\r
        u_circleEdge: { value: circleEdge }\r
      },\r
      defines: { VAR: variation },\r
      transparent: true\r
    });\r
\r
    const quad = new THREE.Mesh(geo, material);\r
    scene.add(quad);\r
\r
    const onPointerMove = e => {\r
      const rect = mount.getBoundingClientRect();\r
      vMouse.set(e.clientX - rect.left, e.clientY - rect.top);\r
    };\r
\r
    document.addEventListener('mousemove', onPointerMove);\r
    document.addEventListener('pointermove', onPointerMove);\r
\r
    const resize = () => {\r
      const container = mountRef.current;\r
      w = container.clientWidth;\r
      h = container.clientHeight;\r
      const dpr = Math.min(window.devicePixelRatio, 2);\r
\r
      renderer.setSize(w, h);\r
      renderer.setPixelRatio(dpr);\r
\r
      camera.left = -w / 2;\r
      camera.right = w / 2;\r
      camera.top = h / 2;\r
      camera.bottom = -h / 2;\r
      camera.updateProjectionMatrix();\r
\r
      quad.scale.set(w, h, 1);\r
      vResolution.set(w, h).multiplyScalar(dpr);\r
      material.uniforms.u_pixelRatio.value = dpr;\r
    };\r
\r
    resize();\r
    window.addEventListener('resize', resize);\r
\r
    const ro = new ResizeObserver(() => resize());\r
    if (mountRef.current) ro.observe(mountRef.current);\r
\r
    const update = () => {\r
      time = performance.now() * 0.001;\r
      const dt = time - lastTime;\r
      lastTime = time;\r
\r
      ['x', 'y'].forEach(k => {\r
        vMouseDamp[k] = THREE.MathUtils.damp(vMouseDamp[k], vMouse[k], 8, dt);\r
      });\r
\r
      renderer.render(scene, camera);\r
      animationFrameId = requestAnimationFrame(update);\r
    };\r
    update();\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      if (ro) ro.disconnect();\r
      document.removeEventListener('mousemove', onPointerMove);\r
      document.removeEventListener('pointermove', onPointerMove);\r
      mount.removeChild(renderer.domElement);\r
      renderer.dispose();\r
    };\r
  }, [variation, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge]);\r
\r
  return <div ref={mountRef} className={\`w-full h-full \${className}\`} />;\r
};\r
\r
export default ShapeBlur;\r
`,re=`import { useRef, useEffect } from 'react';\r
import * as THREE from 'three';\r
\r
const vertexShader = /* glsl */ \`\r
varying vec2 v_texcoord;\r
void main() {\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
    v_texcoord = uv;\r
}\r
\`;\r
\r
const fragmentShader = /* glsl */ \`\r
varying vec2 v_texcoord;\r
\r
uniform vec2 u_mouse;\r
uniform vec2 u_resolution;\r
uniform float u_pixelRatio;\r
\r
uniform float u_shapeSize;\r
uniform float u_roundness;\r
uniform float u_borderSize;\r
uniform float u_circleSize;\r
uniform float u_circleEdge;\r
\r
#ifndef PI\r
#define PI 3.1415926535897932384626433832795\r
#endif\r
#ifndef TWO_PI\r
#define TWO_PI 6.2831853071795864769252867665590\r
#endif\r
\r
#ifndef VAR\r
#define VAR 0\r
#endif\r
\r
#ifndef FNC_COORD\r
#define FNC_COORD\r
vec2 coord(in vec2 p) {\r
    p = p / u_resolution.xy;\r
    if (u_resolution.x > u_resolution.y) {\r
        p.x *= u_resolution.x / u_resolution.y;\r
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;\r
    } else {\r
        p.y *= u_resolution.y / u_resolution.x;\r
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;\r
    }\r
    p -= 0.5;\r
    p *= vec2(-1.0, 1.0);\r
    return p;\r
}\r
#endif\r
\r
#define st0 coord(gl_FragCoord.xy)\r
#define mx coord(u_mouse * u_pixelRatio)\r
\r
float sdRoundRect(vec2 p, vec2 b, float r) {\r
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);\r
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;\r
}\r
float sdCircle(in vec2 st, in vec2 center) {\r
    return length(st - center) * 2.0;\r
}\r
float sdPoly(in vec2 p, in float w, in int sides) {\r
    float a = atan(p.x, p.y) + PI;\r
    float r = TWO_PI / float(sides);\r
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));\r
    return d * 2.0 - w;\r
}\r
\r
float aastep(float threshold, float value) {\r
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;\r
    return smoothstep(threshold - afwidth, threshold + afwidth, value);\r
}\r
float fill(in float x) { return 1.0 - aastep(0.0, x); }\r
float fill(float x, float size, float edge) {\r
    return 1.0 - smoothstep(size - edge, size + edge, x);\r
}\r
float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }\r
float stroke(float x, float size, float w, float edge) {\r
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);\r
    return clamp(d, 0.0, 1.0);\r
}\r
\r
float strokeAA(float x, float size, float w, float edge) {\r
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;\r
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)\r
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);\r
    return clamp(d, 0.0, 1.0);\r
}\r
\r
void main() {\r
    vec2 st = st0 + 0.5;\r
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;\r
\r
    float size = u_shapeSize;\r
    float roundness = u_roundness;\r
    float borderSize = u_borderSize;\r
    float circleSize = u_circleSize;\r
    float circleEdge = u_circleEdge;\r
\r
    float sdfCircle = fill(\r
        sdCircle(st, posMouse),\r
        circleSize,\r
        circleEdge\r
    );\r
\r
    float sdf;\r
    if (VAR == 0) {\r
        sdf = sdRoundRect(st, vec2(size), roundness);\r
        sdf = strokeAA(sdf, 0.0, borderSize, sdfCircle) * 4.0;\r
    } else if (VAR == 1) {\r
        sdf = sdCircle(st, vec2(0.5));\r
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;\r
    } else if (VAR == 2) {\r
        sdf = sdCircle(st, vec2(0.5));\r
        sdf = strokeAA(sdf, 0.58, 0.02, sdfCircle) * 4.0;\r
    } else if (VAR == 3) {\r
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);\r
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;\r
    }\r
\r
    vec3 color = vec3(1.0);\r
    float alpha = sdf;\r
    gl_FragColor = vec4(color.rgb, alpha);\r
}\r
\`;\r
\r
const ShapeBlur = ({\r
  className = '',\r
  variation = 0,\r
  pixelRatioProp = 2,\r
  shapeSize = 1.2,\r
  roundness = 0.4,\r
  borderSize = 0.05,\r
  circleSize = 0.3,\r
  circleEdge = 0.5\r
}) => {\r
  const mountRef = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    const mount = mountRef.current;\r
    let animationFrameId: number;\r
    let time = 0,\r
      lastTime = 0;\r
\r
    const vMouse = new THREE.Vector2();\r
    const vMouseDamp = new THREE.Vector2();\r
    const vResolution = new THREE.Vector2();\r
\r
    let w = 1,\r
      h = 1;\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera();\r
    camera.position.z = 1;\r
\r
    const renderer = new THREE.WebGLRenderer({ alpha: true });\r
    renderer.setClearColor(0x000000, 0);\r
    if (!mount) return;\r
    mount.appendChild(renderer.domElement);\r
\r
    const geo = new THREE.PlaneGeometry(1, 1);\r
    const material = new THREE.ShaderMaterial({\r
      vertexShader,\r
      fragmentShader,\r
      uniforms: {\r
        u_mouse: { value: vMouseDamp },\r
        u_resolution: { value: vResolution },\r
        u_pixelRatio: { value: pixelRatioProp },\r
        u_shapeSize: { value: shapeSize },\r
        u_roundness: { value: roundness },\r
        u_borderSize: { value: borderSize },\r
        u_circleSize: { value: circleSize },\r
        u_circleEdge: { value: circleEdge }\r
      },\r
      defines: { VAR: variation },\r
      transparent: true\r
    });\r
\r
    const quad = new THREE.Mesh(geo, material);\r
    scene.add(quad);\r
\r
    const onPointerMove = (e: PointerEvent | MouseEvent) => {\r
      if (!mount) return;\r
      const rect = mount.getBoundingClientRect();\r
      vMouse.set(e.clientX - rect.left, e.clientY - rect.top);\r
    };\r
\r
    document.addEventListener('mousemove', onPointerMove);\r
    document.addEventListener('pointermove', onPointerMove);\r
\r
    const resize = () => {\r
      const container = mountRef.current;\r
      if (!container) return;\r
      w = container.clientWidth;\r
      h = container.clientHeight;\r
      const dpr = Math.min(window.devicePixelRatio, 2);\r
\r
      renderer.setSize(w, h);\r
      renderer.setPixelRatio(dpr);\r
\r
      camera.left = -w / 2;\r
      camera.right = w / 2;\r
      camera.top = h / 2;\r
      camera.bottom = -h / 2;\r
      camera.updateProjectionMatrix();\r
\r
      quad.scale.set(w, h, 1);\r
      vResolution.set(w, h).multiplyScalar(dpr);\r
      material.uniforms.u_pixelRatio.value = dpr;\r
    };\r
\r
    resize();\r
    window.addEventListener('resize', resize);\r
\r
    const ro = new ResizeObserver(() => resize());\r
    if (mountRef.current) ro.observe(mountRef.current);\r
\r
    const update = () => {\r
      time = performance.now() * 0.001;\r
      const dt = time - lastTime;\r
      lastTime = time;\r
      vMouseDamp.x = THREE.MathUtils.damp(vMouseDamp.x, vMouse.x, 8, dt);\r
      vMouseDamp.y = THREE.MathUtils.damp(vMouseDamp.y, vMouse.y, 8, dt);\r
\r
      renderer.render(scene, camera);\r
      animationFrameId = requestAnimationFrame(update);\r
    };\r
    update();\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      if (ro) ro.disconnect();\r
      document.removeEventListener('mousemove', onPointerMove);\r
      document.removeEventListener('pointermove', onPointerMove);\r
      mount.removeChild(renderer.domElement);\r
      renderer.dispose();\r
    };\r
  }, [variation, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge]);\r
\r
  return <div className={className} ref={mountRef} style={{ width: '100%', height: '100%' }} />;\r
};\r
\r
export default ShapeBlur;\r
`,ne=`import React, { useRef, useEffect, FC } from 'react';\r
import * as THREE from 'three';\r
\r
const vertexShader = /* glsl */ \`\r
varying vec2 v_texcoord;\r
void main() {\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
    v_texcoord = uv;\r
}\r
\`;\r
\r
const fragmentShader = /* glsl */ \`\r
varying vec2 v_texcoord;\r
\r
uniform vec2 u_mouse;\r
uniform vec2 u_resolution;\r
uniform float u_pixelRatio;\r
\r
uniform float u_shapeSize;\r
uniform float u_roundness;\r
uniform float u_borderSize;\r
uniform float u_circleSize;\r
uniform float u_circleEdge;\r
\r
#ifndef PI\r
#define PI 3.1415926535897932384626433832795\r
#endif\r
#ifndef TWO_PI\r
#define TWO_PI 6.2831853071795864769252867665590\r
#endif\r
\r
#ifndef VAR\r
#define VAR 0\r
#endif\r
\r
#ifndef FNC_COORD\r
#define FNC_COORD\r
vec2 coord(in vec2 p) {\r
    p = p / u_resolution.xy;\r
    if (u_resolution.x > u_resolution.y) {\r
        p.x *= u_resolution.x / u_resolution.y;\r
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;\r
    } else {\r
        p.y *= u_resolution.y / u_resolution.x;\r
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;\r
    }\r
    p -= 0.5;\r
    p *= vec2(-1.0, 1.0);\r
    return p;\r
}\r
#endif\r
\r
#define st0 coord(gl_FragCoord.xy)\r
#define mx coord(u_mouse * u_pixelRatio)\r
\r
float sdRoundRect(vec2 p, vec2 b, float r) {\r
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);\r
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;\r
}\r
float sdCircle(in vec2 st, in vec2 center) {\r
    return length(st - center) * 2.0;\r
}\r
float sdPoly(in vec2 p, in float w, in int sides) {\r
    float a = atan(p.x, p.y) + PI;\r
    float r = TWO_PI / float(sides);\r
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));\r
    return d * 2.0 - w;\r
}\r
\r
float aastep(float threshold, float value) {\r
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;\r
    return smoothstep(threshold - afwidth, threshold + afwidth, value);\r
}\r
float fill(in float x) { return 1.0 - aastep(0.0, x); }\r
float fill(float x, float size, float edge) {\r
    return 1.0 - smoothstep(size - edge, size + edge, x);\r
}\r
float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }\r
float stroke(float x, float size, float w, float edge) {\r
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);\r
    return clamp(d, 0.0, 1.0);\r
}\r
\r
float strokeAA(float x, float size, float w, float edge) {\r
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;\r
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)\r
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);\r
    return clamp(d, 0.0, 1.0);\r
}\r
\r
void main() {\r
    vec2 st = st0 + 0.5;\r
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;\r
\r
    float size = u_shapeSize;\r
    float roundness = u_roundness;\r
    float borderSize = u_borderSize;\r
    float circleSize = u_circleSize;\r
    float circleEdge = u_circleEdge;\r
\r
    float sdfCircle = fill(\r
        sdCircle(st, posMouse),\r
        circleSize,\r
        circleEdge\r
    );\r
\r
    float sdf;\r
    if (VAR == 0) {\r
        sdf = sdRoundRect(st, vec2(size), roundness);\r
        sdf = strokeAA(sdf, 0.0, borderSize, sdfCircle) * 4.0;\r
    } else if (VAR == 1) {\r
        sdf = sdCircle(st, vec2(0.5));\r
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;\r
    } else if (VAR == 2) {\r
        sdf = sdCircle(st, vec2(0.5));\r
        sdf = strokeAA(sdf, 0.58, 0.02, sdfCircle) * 4.0;\r
    } else if (VAR == 3) {\r
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);\r
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;\r
    }\r
\r
    vec3 color = vec3(1.0);\r
    float alpha = sdf;\r
    gl_FragColor = vec4(color.rgb, alpha);\r
}\r
\`;\r
\r
interface ShapeBlurProps {\r
  className?: string;\r
  variation?: number;\r
  pixelRatioProp?: number;\r
  shapeSize?: number;\r
  roundness?: number;\r
  borderSize?: number;\r
  circleSize?: number;\r
  circleEdge?: number;\r
}\r
\r
const ShapeBlur: FC<ShapeBlurProps> = ({\r
  className = '',\r
  variation = 0,\r
  pixelRatioProp = 2,\r
  shapeSize = 1.2,\r
  roundness = 0.4,\r
  borderSize = 0.05,\r
  circleSize = 0.3,\r
  circleEdge = 0.5\r
}) => {\r
  const mountRef = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    const mount = mountRef.current;\r
    if (!mount) return;\r
\r
    let animationFrameId: number;\r
    let time = 0,\r
      lastTime = 0;\r
\r
    const vMouse = new THREE.Vector2();\r
    const vMouseDamp = new THREE.Vector2();\r
    const vResolution = new THREE.Vector2();\r
\r
    let w = 1,\r
      h = 1;\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera();\r
    camera.position.z = 1;\r
\r
    const renderer = new THREE.WebGLRenderer({ alpha: true });\r
    renderer.setClearColor(0x000000, 0);\r
    mount.appendChild(renderer.domElement);\r
\r
    const geo = new THREE.PlaneGeometry(1, 1);\r
    const material = new THREE.ShaderMaterial({\r
      vertexShader,\r
      fragmentShader,\r
      uniforms: {\r
        u_mouse: { value: vMouseDamp },\r
        u_resolution: { value: vResolution },\r
        u_pixelRatio: { value: pixelRatioProp },\r
        u_shapeSize: { value: shapeSize },\r
        u_roundness: { value: roundness },\r
        u_borderSize: { value: borderSize },\r
        u_circleSize: { value: circleSize },\r
        u_circleEdge: { value: circleEdge }\r
      },\r
      defines: { VAR: variation },\r
      transparent: true\r
    });\r
\r
    const quad = new THREE.Mesh(geo, material);\r
    scene.add(quad);\r
\r
    const onPointerMove = (e: PointerEvent | MouseEvent) => {\r
      if (!mount) return;\r
      const rect = mount.getBoundingClientRect();\r
      vMouse.set(e.clientX - rect.left, e.clientY - rect.top);\r
    };\r
\r
    document.addEventListener('mousemove', onPointerMove);\r
    document.addEventListener('pointermove', onPointerMove);\r
\r
    const resize = () => {\r
      if (!mountRef.current) return;\r
      const container = mountRef.current;\r
      w = container.clientWidth;\r
      h = container.clientHeight;\r
      const dpr = Math.min(window.devicePixelRatio || 1, 2);\r
\r
      renderer.setSize(w, h);\r
      renderer.setPixelRatio(dpr);\r
\r
      camera.left = -w / 2;\r
      camera.right = w / 2;\r
      camera.top = h / 2;\r
      camera.bottom = -h / 2;\r
      camera.updateProjectionMatrix();\r
\r
      quad.scale.set(w, h, 1);\r
      vResolution.set(w, h).multiplyScalar(dpr);\r
      material.uniforms.u_pixelRatio.value = dpr;\r
    };\r
\r
    resize();\r
    window.addEventListener('resize', resize);\r
\r
    const ro = new ResizeObserver(() => resize());\r
    ro.observe(mountRef.current as Element);\r
\r
    const update = () => {\r
      time = performance.now() * 0.001;\r
      const dt = time - lastTime;\r
      lastTime = time;\r
\r
      vMouseDamp.x = THREE.MathUtils.damp(vMouseDamp.x, vMouse.x, 8, dt);\r
      vMouseDamp.y = THREE.MathUtils.damp(vMouseDamp.y, vMouse.y, 8, dt);\r
\r
      renderer.render(scene, camera);\r
      animationFrameId = requestAnimationFrame(update);\r
    };\r
    update();\r
\r
    return () => {\r
      cancelAnimationFrame(animationFrameId);\r
      window.removeEventListener('resize', resize);\r
      ro.disconnect();\r
      document.removeEventListener('mousemove', onPointerMove);\r
      document.removeEventListener('pointermove', onPointerMove);\r
      mount.removeChild(renderer.domElement);\r
      renderer.dispose();\r
    };\r
  }, [variation, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge]);\r
\r
  return <div ref={mountRef} className={\`w-full h-full \${className}\`} />;\r
};\r
\r
export default ShapeBlur;\r
`,te={dependencies:"three",usage:`import ShapeBlur from './ShapeBlur';

<div style={{position: 'relative', height: '500px', overflow: 'hidden'}}>
  <ShapeBlur
    variation={0}
    pixelRatioProp={window.devicePixelRatio || 1}
    shapeSize={0.5}
    roundness={0.5}
    borderSize={0.05}
    circleSize={0.5}
    circleEdge={1}
  />
</div>`,code:Z,tailwind:ee,tsCode:re,tsTailwind:ne},ue=()=>{const[p,v]=s.useState(1),[d,h]=s.useState(.5),[c,x]=s.useState(.05),[u,z]=s.useState(.25),[n,f]=s.useState(1),_=[{name:"variation",type:"number",default:"0",description:"Selects the shape variation (0-3) used by the shader."},{name:"pixelRatioProp",type:"number",default:"2",description:"Overrides the pixel ratio, typically set to the device pixel ratio."},{name:"shapeSize",type:"number",default:"1.2",description:"Controls the size of the shape."},{name:"roundness",type:"number",default:"0.4",description:"Determines the roundness of the shape's corners."},{name:"borderSize",type:"number",default:"0.05",description:"Sets the thickness of the border."},{name:"circleSize",type:"number",default:"0.3",description:"Determines the size of the hover circle effect."},{name:"circleEdge",type:"number",default:"0.5",description:"Controls the edge softness of the hover circle."}];return e.jsxs(I,{children:[e.jsxs(D,{children:[e.jsxs(V,{position:"relative",className:"demo-container",background:"#060010",height:500,overflow:"hidden",p:0,children:[e.jsx(Q,{className:"shapeblur-demo",variation:0,pixelRatioProp:window.devicePixelRatio||1,shapeSize:p,roundness:d,borderSize:c,circleSize:u,circleEdge:n}),e.jsx(O,{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",fontSize:"6rem",fontWeight:900,zIndex:0,color:"#271E37",children:"Hover Me."})]}),e.jsxs(B,{children:[e.jsx(m,{title:"Shape Size",min:.1,max:2,step:.1,value:p,onChange:v}),e.jsx(m,{title:"Roundness",min:0,max:1,step:.05,value:d,onChange:h}),e.jsx(m,{title:"Border Size",min:.01,max:.2,step:.005,value:c,onChange:x}),e.jsx(m,{title:"Circle Size",min:.1,max:.5,step:.01,value:u,onChange:z}),e.jsx(m,{title:"Circle Edge",min:.1,max:2,step:.1,value:n,onChange:f})]}),e.jsx(L,{data:_}),e.jsx(W,{dependencyList:["three"]})]}),e.jsx(k,{children:e.jsx(j,{codeObject:te})})]})};export{ue as default};
