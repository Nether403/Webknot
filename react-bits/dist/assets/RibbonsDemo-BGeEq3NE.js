import{G as Y,P as q,M as $,V as C,r as h,R as J,f as K,j as t,B as Q,T as V,F as Z,i as I,k as ee,l as ne}from"./index-wsKSLPNH.js";import{T as re,P as te,a as oe,C as ie,b as ae}from"./PropTable-C4uPWs8h.js";import{D as se}from"./Dependencies-BHoMfJUj.js";import{P}from"./PreviewSlider-m1G_aiYP.js";import{P as _}from"./PreviewSwitch-DqnF708j.js";import{C as ce}from"./Customize-1m_ZNqR9.js";import{V as le}from"./Vec2-Cf1C3GIc.js";import{C as H}from"./Color-YRkaOI4u.js";import"./index-Bpz4cGEA.js";const T=new C;class ue{constructor(o,{points:e,vertex:g=fe,fragment:b=de,uniforms:i={},attributes:y={}}){this.gl=o,this.points=e,this.count=e.length,this.position=new Float32Array(this.count*3*2),this.prev=new Float32Array(this.count*3*2),this.next=new Float32Array(this.count*3*2);const x=new Float32Array(this.count*1*2),p=new Float32Array(this.count*2*2),m=new Uint16Array((this.count-1)*3*2);for(let c=0;c<this.count;c++){x.set([-1,1],c*2);const n=c/(this.count-1);if(p.set([0,n,1,n],c*4),c===this.count-1)continue;const l=c*2;m.set([l+0,l+1,l+2],(l+0)*3),m.set([l+2,l+1,l+3],(l+1)*3)}const E=this.geometry=new Y(o,Object.assign(y,{position:{size:3,data:this.position},prev:{size:3,data:this.prev},next:{size:3,data:this.next},side:{size:1,data:x},uv:{size:2,data:p},index:{size:1,data:m}}));this.updateGeometry(),i.uResolution||(this.resolution=i.uResolution={value:new le}),i.uDPR||(this.dpr=i.uDPR={value:1}),i.uThickness||(this.thickness=i.uThickness={value:1}),i.uColor||(this.color=i.uColor={value:new H("#000")}),i.uMiter||(this.miter=i.uMiter={value:1}),this.resize();const f=this.program=new q(o,{vertex:g,fragment:b,uniforms:i});this.mesh=new $(o,{geometry:E,program:f})}updateGeometry(){this.points.forEach((o,e)=>{o.toArray(this.position,e*3*2),o.toArray(this.position,e*3*2+3),e?(o.toArray(this.next,(e-1)*3*2),o.toArray(this.next,(e-1)*3*2+3)):(T.copy(o).sub(this.points[e+1]).add(o),T.toArray(this.prev,e*3*2),T.toArray(this.prev,e*3*2+3)),e===this.points.length-1?(T.copy(o).sub(this.points[e-1]).add(o),T.toArray(this.next,e*3*2),T.toArray(this.next,e*3*2+3)):(o.toArray(this.prev,(e+1)*3*2),o.toArray(this.prev,(e+1)*3*2+3))}),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.prev.needsUpdate=!0,this.geometry.attributes.next.needsUpdate=!0}resize(){this.resolution&&this.resolution.value.set(this.gl.canvas.width,this.gl.canvas.height),this.dpr&&(this.dpr.value=this.gl.renderer.dpr)}}const fe=`
    precision highp float;

    attribute vec3 position;
    attribute vec3 next;
    attribute vec3 prev;
    attribute vec2 uv;
    attribute float side;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec2 uResolution;
    uniform float uDPR;
    uniform float uThickness;
    uniform float uMiter;

    varying vec2 vUv;

    vec4 getPosition() {
        mat4 mvp = projectionMatrix * modelViewMatrix;
        vec4 current = mvp * vec4(position, 1);
        vec4 nextPos = mvp * vec4(next, 1);
        vec4 prevPos = mvp * vec4(prev, 1);

        vec2 aspect = vec2(uResolution.x / uResolution.y, 1);    
        vec2 currentScreen = current.xy / current.w * aspect;
        vec2 nextScreen = nextPos.xy / nextPos.w * aspect;
        vec2 prevScreen = prevPos.xy / prevPos.w * aspect;
    
        vec2 dir1 = normalize(currentScreen - prevScreen);
        vec2 dir2 = normalize(nextScreen - currentScreen);
        vec2 dir = normalize(dir1 + dir2);
    
        vec2 normal = vec2(-dir.y, dir.x);
        normal /= mix(1.0, max(0.3, dot(normal, vec2(-dir1.y, dir1.x))), uMiter);
        normal /= aspect;

        float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
        float pixelWidth = current.w * pixelWidthRatio;
        normal *= pixelWidth * uThickness;
        current.xy -= normal * side;
    
        return current;
    }

    void main() {
        vUv = uv;
        gl_Position = getPosition();
    }
`,de=`
    precision highp float;

    uniform vec3 uColor;
    
    varying vec2 vUv;

    void main() {
        gl_FragColor.rgb = uColor;
        gl_FragColor.a = 1.0;
    }
`,pe=({colors:v=["#FC8EAC"],baseSpring:o=.03,baseFriction:e=.9,baseThickness:g=30,offsetFactor:b=.05,maxAge:i=500,pointCount:y=50,speedMultiplier:x=.6,enableFade:p=!1,enableShaderEffect:m=!1,effectAmplitude:E=2,backgroundColor:f=[0,0,0,0]})=>{const c=h.useRef(null);return h.useEffect(()=>{const n=c.current;if(!n)return;const l=new J({dpr:window.devicePixelRatio||2,alpha:!0}),u=l.gl;Array.isArray(f)&&f.length===4?u.clearColor(f[0],f[1],f[2],f[3]):u.clearColor(0,0,0,0),u.canvas.style.position="absolute",u.canvas.style.top="0",u.canvas.style.left="0",u.canvas.style.width="100%",u.canvas.style.height="100%",n.appendChild(u.canvas);const z=new K,M=[],B=`
      precision highp float;
      
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      
      varying vec2 vUV;
      
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
          if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
          }
          return current;
      }
      
      void main() {
          vUV = uv;
          gl_Position = getPosition();
      }
    `,N=`
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
          float fadeFactor = 1.0;
          if(uEnableFade > 0.5) {
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          }
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `;function A(){const a=n.clientWidth,d=n.clientHeight;l.setSize(a,d),M.forEach(r=>r.polyline.resize())}window.addEventListener("resize",A);const G=(v.length-1)/2;v.forEach((a,d)=>{const r=o+(Math.random()-.5)*.05,s=e+(Math.random()-.5)*.05,F=g+(Math.random()-.5)*3,R=new C((d-G)*b+(Math.random()-.5)*.01,(Math.random()-.5)*.1,0),S={spring:r,friction:s,mouseVelocity:new C,mouseOffset:R},X=y,k=[];for(let U=0;U<X;U++)k.push(new C);S.points=k,S.polyline=new ue(u,{points:k,vertex:B,fragment:N,uniforms:{uColor:{value:new H(a)},uThickness:{value:F},uOpacity:{value:1},uTime:{value:0},uEnableShaderEffect:{value:m?1:0},uEffectAmplitude:{value:E},uEnableFade:{value:p?1:0}}}),S.polyline.mesh.setParent(z),M.push(S)}),A();const L=new C;function w(a){let d,r;const s=n.getBoundingClientRect();a.changedTouches&&a.changedTouches.length?(d=a.changedTouches[0].clientX-s.left,r=a.changedTouches[0].clientY-s.top):(d=a.clientX-s.left,r=a.clientY-s.top);const F=n.clientWidth,R=n.clientHeight;L.set(d/F*2-1,r/R*-2+1,0)}n.addEventListener("mousemove",w),n.addEventListener("touchstart",w),n.addEventListener("touchmove",w);const W=new C;let O,D=performance.now();function j(){O=requestAnimationFrame(j);const a=performance.now(),d=a-D;D=a,M.forEach(r=>{W.copy(L).add(r.mouseOffset).sub(r.points[0]).multiply(r.spring),r.mouseVelocity.add(W).multiply(r.friction),r.points[0].add(r.mouseVelocity);for(let s=1;s<r.points.length;s++)if(isFinite(i)&&i>0){const F=i/(r.points.length-1),R=Math.min(1,d*x/F);r.points[s].lerp(r.points[s-1],R)}else r.points[s].lerp(r.points[s-1],.9);r.polyline.mesh.program.uniforms.uTime&&(r.polyline.mesh.program.uniforms.uTime.value=a*.001),r.polyline.updateGeometry()}),l.render({scene:z})}return j(),()=>{window.removeEventListener("resize",A),n.removeEventListener("mousemove",w),n.removeEventListener("touchstart",w),n.removeEventListener("touchmove",w),cancelAnimationFrame(O),u.canvas&&u.canvas.parentNode===n&&n.removeChild(u.canvas)}},[v,o,e,g,b,i,y,x,p,m,E,f]),t.jsx("div",{ref:c,className:"ribbons-container"})},me=`import { useEffect, useRef } from 'react';\r
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';\r
\r
import './Ribbons.css';\r
\r
const Ribbons = ({\r
  colors = ['#FC8EAC'],\r
  baseSpring = 0.03,\r
  baseFriction = 0.9,\r
  baseThickness = 30,\r
  offsetFactor = 0.05,\r
  maxAge = 500,\r
  pointCount = 50,\r
  speedMultiplier = 0.6,\r
  enableFade = false,\r
  enableShaderEffect = false,\r
  effectAmplitude = 2,\r
  backgroundColor = [0, 0, 0, 0]\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });\r
    const gl = renderer.gl;\r
    if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {\r
      gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);\r
    } else {\r
      gl.clearColor(0, 0, 0, 0);\r
    }\r
\r
    gl.canvas.style.position = 'absolute';\r
    gl.canvas.style.top = '0';\r
    gl.canvas.style.left = '0';\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
    container.appendChild(gl.canvas);\r
\r
    const scene = new Transform();\r
    const lines = [];\r
\r
    const vertex = \`\r
      precision highp float;\r
      \r
      attribute vec3 position;\r
      attribute vec3 next;\r
      attribute vec3 prev;\r
      attribute vec2 uv;\r
      attribute float side;\r
      \r
      uniform vec2 uResolution;\r
      uniform float uDPR;\r
      uniform float uThickness;\r
      uniform float uTime;\r
      uniform float uEnableShaderEffect;\r
      uniform float uEffectAmplitude;\r
      \r
      varying vec2 vUV;\r
      \r
      vec4 getPosition() {\r
          vec4 current = vec4(position, 1.0);\r
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);\r
          vec2 nextScreen = next.xy * aspect;\r
          vec2 prevScreen = prev.xy * aspect;\r
          vec2 tangent = normalize(nextScreen - prevScreen);\r
          vec2 normal = vec2(-tangent.y, tangent.x);\r
          normal /= aspect;\r
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));\r
          float dist = length(nextScreen - prevScreen);\r
          normal *= smoothstep(0.0, 0.02, dist);\r
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);\r
          float pixelWidth = current.w * pixelWidthRatio;\r
          normal *= pixelWidth * uThickness;\r
          current.xy -= normal * side;\r
          if(uEnableShaderEffect > 0.5) {\r
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;\r
          }\r
          return current;\r
      }\r
      \r
      void main() {\r
          vUV = uv;\r
          gl_Position = getPosition();\r
      }\r
    \`;\r
\r
    const fragment = \`\r
      precision highp float;\r
      uniform vec3 uColor;\r
      uniform float uOpacity;\r
      uniform float uEnableFade;\r
      varying vec2 vUV;\r
      void main() {\r
          float fadeFactor = 1.0;\r
          if(uEnableFade > 0.5) {\r
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);\r
          }\r
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);\r
      }\r
    \`;\r
\r
    function resize() {\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width, height);\r
      lines.forEach(line => line.polyline.resize());\r
    }\r
    window.addEventListener('resize', resize);\r
\r
    const center = (colors.length - 1) / 2;\r
    colors.forEach((color, index) => {\r
      const spring = baseSpring + (Math.random() - 0.5) * 0.05;\r
      const friction = baseFriction + (Math.random() - 0.5) * 0.05;\r
      const thickness = baseThickness + (Math.random() - 0.5) * 3;\r
      const mouseOffset = new Vec3(\r
        (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,\r
        (Math.random() - 0.5) * 0.1,\r
        0\r
      );\r
\r
      const line = {\r
        spring,\r
        friction,\r
        mouseVelocity: new Vec3(),\r
        mouseOffset\r
      };\r
\r
      const count = pointCount;\r
      const points = [];\r
      for (let i = 0; i < count; i++) {\r
        points.push(new Vec3());\r
      }\r
      line.points = points;\r
\r
      line.polyline = new Polyline(gl, {\r
        points,\r
        vertex,\r
        fragment,\r
        uniforms: {\r
          uColor: { value: new Color(color) },\r
          uThickness: { value: thickness },\r
          uOpacity: { value: 1.0 },\r
          uTime: { value: 0.0 },\r
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },\r
          uEffectAmplitude: { value: effectAmplitude },\r
          uEnableFade: { value: enableFade ? 1.0 : 0.0 }\r
        }\r
      });\r
      line.polyline.mesh.setParent(scene);\r
      lines.push(line);\r
    });\r
\r
    resize();\r
\r
    const mouse = new Vec3();\r
    function updateMouse(e) {\r
      let x, y;\r
      const rect = container.getBoundingClientRect();\r
      if (e.changedTouches && e.changedTouches.length) {\r
        x = e.changedTouches[0].clientX - rect.left;\r
        y = e.changedTouches[0].clientY - rect.top;\r
      } else {\r
        x = e.clientX - rect.left;\r
        y = e.clientY - rect.top;\r
      }\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0);\r
    }\r
    container.addEventListener('mousemove', updateMouse);\r
    container.addEventListener('touchstart', updateMouse);\r
    container.addEventListener('touchmove', updateMouse);\r
\r
    const tmp = new Vec3();\r
    let frameId;\r
    let lastTime = performance.now();\r
    function update() {\r
      frameId = requestAnimationFrame(update);\r
      const currentTime = performance.now();\r
      const dt = currentTime - lastTime;\r
      lastTime = currentTime;\r
\r
      lines.forEach(line => {\r
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);\r
        line.mouseVelocity.add(tmp).multiply(line.friction);\r
        line.points[0].add(line.mouseVelocity);\r
\r
        for (let i = 1; i < line.points.length; i++) {\r
          if (isFinite(maxAge) && maxAge > 0) {\r
            const segmentDelay = maxAge / (line.points.length - 1);\r
            const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);\r
            line.points[i].lerp(line.points[i - 1], alpha);\r
          } else {\r
            line.points[i].lerp(line.points[i - 1], 0.9);\r
          }\r
        }\r
        if (line.polyline.mesh.program.uniforms.uTime) {\r
          line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;\r
        }\r
        line.polyline.updateGeometry();\r
      });\r
\r
      renderer.render({ scene });\r
    }\r
    update();\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', updateMouse);\r
      container.removeEventListener('touchstart', updateMouse);\r
      container.removeEventListener('touchmove', updateMouse);\r
      cancelAnimationFrame(frameId);\r
      if (gl.canvas && gl.canvas.parentNode === container) {\r
        container.removeChild(gl.canvas);\r
      }\r
    };\r
  }, [\r
    colors,\r
    baseSpring,\r
    baseFriction,\r
    baseThickness,\r
    offsetFactor,\r
    maxAge,\r
    pointCount,\r
    speedMultiplier,\r
    enableFade,\r
    enableShaderEffect,\r
    effectAmplitude,\r
    backgroundColor\r
  ]);\r
\r
  return <div ref={containerRef} className="ribbons-container" />;\r
};\r
\r
export default Ribbons;\r
`,he=`.ribbons-container {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
}\r
`,ve=`import { useEffect, useRef } from 'react';\r
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';\r
\r
const Ribbons = ({\r
  colors = ['#FC8EAC'],\r
  baseSpring = 0.03,\r
  baseFriction = 0.9,\r
  baseThickness = 30,\r
  offsetFactor = 0.05,\r
  maxAge = 500,\r
  pointCount = 50,\r
  speedMultiplier = 0.6,\r
  enableFade = false,\r
  enableShaderEffect = false,\r
  effectAmplitude = 2,\r
  backgroundColor = [0, 0, 0, 0]\r
}) => {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });\r
    const gl = renderer.gl;\r
    if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {\r
      gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);\r
    } else {\r
      gl.clearColor(0, 0, 0, 0);\r
    }\r
\r
    gl.canvas.style.position = 'absolute';\r
    gl.canvas.style.top = '0';\r
    gl.canvas.style.left = '0';\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
    container.appendChild(gl.canvas);\r
\r
    const scene = new Transform();\r
    const lines = [];\r
\r
    const vertex = \`\r
      precision highp float;\r
      \r
      attribute vec3 position;\r
      attribute vec3 next;\r
      attribute vec3 prev;\r
      attribute vec2 uv;\r
      attribute float side;\r
      \r
      uniform vec2 uResolution;\r
      uniform float uDPR;\r
      uniform float uThickness;\r
      uniform float uTime;\r
      uniform float uEnableShaderEffect;\r
      uniform float uEffectAmplitude;\r
      \r
      varying vec2 vUV;\r
      \r
      vec4 getPosition() {\r
          vec4 current = vec4(position, 1.0);\r
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);\r
          vec2 nextScreen = next.xy * aspect;\r
          vec2 prevScreen = prev.xy * aspect;\r
          vec2 tangent = normalize(nextScreen - prevScreen);\r
          vec2 normal = vec2(-tangent.y, tangent.x);\r
          normal /= aspect;\r
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));\r
          float dist = length(nextScreen - prevScreen);\r
          normal *= smoothstep(0.0, 0.02, dist);\r
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);\r
          float pixelWidth = current.w * pixelWidthRatio;\r
          normal *= pixelWidth * uThickness;\r
          current.xy -= normal * side;\r
          if(uEnableShaderEffect > 0.5) {\r
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;\r
          }\r
          return current;\r
      }\r
      \r
      void main() {\r
          vUV = uv;\r
          gl_Position = getPosition();\r
      }\r
    \`;\r
\r
    const fragment = \`\r
      precision highp float;\r
      uniform vec3 uColor;\r
      uniform float uOpacity;\r
      uniform float uEnableFade;\r
      varying vec2 vUV;\r
      void main() {\r
          float fadeFactor = 1.0;\r
          if(uEnableFade > 0.5) {\r
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);\r
          }\r
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);\r
      }\r
    \`;\r
\r
    function resize() {\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width, height);\r
      lines.forEach(line => line.polyline.resize());\r
    }\r
    window.addEventListener('resize', resize);\r
\r
    const center = (colors.length - 1) / 2;\r
    colors.forEach((color, index) => {\r
      const spring = baseSpring + (Math.random() - 0.5) * 0.05;\r
      const friction = baseFriction + (Math.random() - 0.5) * 0.05;\r
      const thickness = baseThickness + (Math.random() - 0.5) * 3;\r
      const mouseOffset = new Vec3(\r
        (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,\r
        (Math.random() - 0.5) * 0.1,\r
        0\r
      );\r
\r
      const line = {\r
        spring,\r
        friction,\r
        mouseVelocity: new Vec3(),\r
        mouseOffset\r
      };\r
\r
      const count = pointCount;\r
      const points = [];\r
      for (let i = 0; i < count; i++) {\r
        points.push(new Vec3());\r
      }\r
      line.points = points;\r
\r
      line.polyline = new Polyline(gl, {\r
        points,\r
        vertex,\r
        fragment,\r
        uniforms: {\r
          uColor: { value: new Color(color) },\r
          uThickness: { value: thickness },\r
          uOpacity: { value: 1.0 },\r
          uTime: { value: 0.0 },\r
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },\r
          uEffectAmplitude: { value: effectAmplitude },\r
          uEnableFade: { value: enableFade ? 1.0 : 0.0 }\r
        }\r
      });\r
      line.polyline.mesh.setParent(scene);\r
      lines.push(line);\r
    });\r
\r
    resize();\r
\r
    const mouse = new Vec3();\r
    function updateMouse(e) {\r
      let x, y;\r
      const rect = container.getBoundingClientRect();\r
      if (e.changedTouches && e.changedTouches.length) {\r
        x = e.changedTouches[0].clientX - rect.left;\r
        y = e.changedTouches[0].clientY - rect.top;\r
      } else {\r
        x = e.clientX - rect.left;\r
        y = e.clientY - rect.top;\r
      }\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0);\r
    }\r
    container.addEventListener('mousemove', updateMouse);\r
    container.addEventListener('touchstart', updateMouse);\r
    container.addEventListener('touchmove', updateMouse);\r
\r
    const tmp = new Vec3();\r
    let frameId;\r
    let lastTime = performance.now();\r
    function update() {\r
      frameId = requestAnimationFrame(update);\r
      const currentTime = performance.now();\r
      const dt = currentTime - lastTime;\r
      lastTime = currentTime;\r
\r
      lines.forEach(line => {\r
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);\r
        line.mouseVelocity.add(tmp).multiply(line.friction);\r
        line.points[0].add(line.mouseVelocity);\r
\r
        for (let i = 1; i < line.points.length; i++) {\r
          if (isFinite(maxAge) && maxAge > 0) {\r
            const segmentDelay = maxAge / (line.points.length - 1);\r
            const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);\r
            line.points[i].lerp(line.points[i - 1], alpha);\r
          } else {\r
            line.points[i].lerp(line.points[i - 1], 0.9);\r
          }\r
        }\r
        if (line.polyline.mesh.program.uniforms.uTime) {\r
          line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;\r
        }\r
        line.polyline.updateGeometry();\r
      });\r
\r
      renderer.render({ scene });\r
    }\r
    update();\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', updateMouse);\r
      container.removeEventListener('touchstart', updateMouse);\r
      container.removeEventListener('touchmove', updateMouse);\r
      cancelAnimationFrame(frameId);\r
      if (gl.canvas && gl.canvas.parentNode === container) {\r
        container.removeChild(gl.canvas);\r
      }\r
    };\r
  }, [\r
    colors,\r
    baseSpring,\r
    baseFriction,\r
    baseThickness,\r
    offsetFactor,\r
    maxAge,\r
    pointCount,\r
    speedMultiplier,\r
    enableFade,\r
    enableShaderEffect,\r
    effectAmplitude,\r
    backgroundColor\r
  ]);\r
\r
  return <div ref={containerRef} className="relative w-full h-full" />;\r
};\r
\r
export default Ribbons;\r
`,ge=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';\r
\r
import './Ribbons.css';\r
\r
interface RibbonsProps {\r
  colors?: string[];\r
  baseSpring?: number;\r
  baseFriction?: number;\r
  baseThickness?: number;\r
  offsetFactor?: number;\r
  maxAge?: number;\r
  pointCount?: number;\r
  speedMultiplier?: number;\r
  enableFade?: boolean;\r
  enableShaderEffect?: boolean;\r
  effectAmplitude?: number;\r
  backgroundColor?: number[];\r
}\r
\r
const Ribbons: React.FC<RibbonsProps> = ({\r
  colors = ['#ff9346', '#7cff67', '#ffee51', '#5227FF'],\r
  baseSpring = 0.03,\r
  baseFriction = 0.9,\r
  baseThickness = 30,\r
  offsetFactor = 0.05,\r
  maxAge = 500,\r
  pointCount = 50,\r
  speedMultiplier = 0.6,\r
  enableFade = false,\r
  enableShaderEffect = false,\r
  effectAmplitude = 2,\r
  backgroundColor = [0, 0, 0, 0]\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });\r
    const gl = renderer.gl;\r
    if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {\r
      gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);\r
    } else {\r
      gl.clearColor(0, 0, 0, 0);\r
    }\r
\r
    gl.canvas.style.position = 'absolute';\r
    gl.canvas.style.top = '0';\r
    gl.canvas.style.left = '0';\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
    container.appendChild(gl.canvas);\r
\r
    const scene = new Transform();\r
    const lines: {\r
      spring: number;\r
      friction: number;\r
      mouseVelocity: Vec3;\r
      mouseOffset: Vec3;\r
      points: Vec3[];\r
      polyline: Polyline;\r
    }[] = [];\r
\r
    const vertex = \`\r
      precision highp float;\r
      \r
      attribute vec3 position;\r
      attribute vec3 next;\r
      attribute vec3 prev;\r
      attribute vec2 uv;\r
      attribute float side;\r
      \r
      uniform vec2 uResolution;\r
      uniform float uDPR;\r
      uniform float uThickness;\r
      uniform float uTime;\r
      uniform float uEnableShaderEffect;\r
      uniform float uEffectAmplitude;\r
      \r
      varying vec2 vUV;\r
      \r
      vec4 getPosition() {\r
          vec4 current = vec4(position, 1.0);\r
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);\r
          vec2 nextScreen = next.xy * aspect;\r
          vec2 prevScreen = prev.xy * aspect;\r
          vec2 tangent = normalize(nextScreen - prevScreen);\r
          vec2 normal = vec2(-tangent.y, tangent.x);\r
          normal /= aspect;\r
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));\r
          float dist = length(nextScreen - prevScreen);\r
          normal *= smoothstep(0.0, 0.02, dist);\r
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);\r
          float pixelWidth = current.w * pixelWidthRatio;\r
          normal *= pixelWidth * uThickness;\r
          current.xy -= normal * side;\r
          if(uEnableShaderEffect > 0.5) {\r
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;\r
          }\r
          return current;\r
      }\r
      \r
      void main() {\r
          vUV = uv;\r
          gl_Position = getPosition();\r
      }\r
    \`;\r
\r
    const fragment = \`\r
      precision highp float;\r
      uniform vec3 uColor;\r
      uniform float uOpacity;\r
      uniform float uEnableFade;\r
      varying vec2 vUV;\r
      void main() {\r
          float fadeFactor = 1.0;\r
          if(uEnableFade > 0.5) {\r
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);\r
          }\r
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);\r
      }\r
    \`;\r
\r
    function resize() {\r
      if (!container) return;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width, height);\r
      lines.forEach(line => line.polyline.resize());\r
    }\r
    window.addEventListener('resize', resize);\r
\r
    const center = (colors.length - 1) / 2;\r
    colors.forEach((color, index) => {\r
      const spring = baseSpring + (Math.random() - 0.5) * 0.05;\r
      const friction = baseFriction + (Math.random() - 0.5) * 0.05;\r
      const thickness = baseThickness + (Math.random() - 0.5) * 3;\r
      const mouseOffset = new Vec3(\r
        (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,\r
        (Math.random() - 0.5) * 0.1,\r
        0\r
      );\r
\r
      const line = {\r
        spring,\r
        friction,\r
        mouseVelocity: new Vec3(),\r
        mouseOffset,\r
        points: [] as Vec3[],\r
        polyline: {} as Polyline\r
      };\r
\r
      const count = pointCount;\r
      const points: Vec3[] = [];\r
      for (let i = 0; i < count; i++) {\r
        points.push(new Vec3());\r
      }\r
      line.points = points;\r
\r
      line.polyline = new Polyline(gl, {\r
        points,\r
        vertex,\r
        fragment,\r
        uniforms: {\r
          uColor: { value: new Color(color) },\r
          uThickness: { value: thickness },\r
          uOpacity: { value: 1.0 },\r
          uTime: { value: 0.0 },\r
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },\r
          uEffectAmplitude: { value: effectAmplitude },\r
          uEnableFade: { value: enableFade ? 1.0 : 0.0 }\r
        }\r
      });\r
      line.polyline.mesh.setParent(scene);\r
      lines.push(line);\r
    });\r
\r
    resize();\r
\r
    const mouse = new Vec3();\r
    function updateMouse(e: MouseEvent | TouchEvent) {\r
      let x: number, y: number;\r
      if (!container) return;\r
      const rect = container.getBoundingClientRect();\r
      if ('changedTouches' in e && e.changedTouches.length) {\r
        x = e.changedTouches[0].clientX - rect.left;\r
        y = e.changedTouches[0].clientY - rect.top;\r
      } else if (e instanceof MouseEvent) {\r
        x = e.clientX - rect.left;\r
        y = e.clientY - rect.top;\r
      } else {\r
        x = 0;\r
        y = 0;\r
      }\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0);\r
    }\r
    container.addEventListener('mousemove', updateMouse);\r
    container.addEventListener('touchstart', updateMouse);\r
    container.addEventListener('touchmove', updateMouse);\r
\r
    const tmp = new Vec3();\r
    let frameId: number;\r
    let lastTime = performance.now();\r
    function update() {\r
      frameId = requestAnimationFrame(update);\r
      const currentTime = performance.now();\r
      const dt = currentTime - lastTime;\r
      lastTime = currentTime;\r
\r
      lines.forEach(line => {\r
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);\r
        line.mouseVelocity.add(tmp).multiply(line.friction);\r
        line.points[0].add(line.mouseVelocity);\r
\r
        for (let i = 1; i < line.points.length; i++) {\r
          if (isFinite(maxAge) && maxAge > 0) {\r
            const segmentDelay = maxAge / (line.points.length - 1);\r
            const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);\r
            line.points[i].lerp(line.points[i - 1], alpha);\r
          } else {\r
            line.points[i].lerp(line.points[i - 1], 0.9);\r
          }\r
        }\r
        if (line.polyline.mesh.program.uniforms.uTime) {\r
          line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;\r
        }\r
        line.polyline.updateGeometry();\r
      });\r
\r
      renderer.render({ scene });\r
    }\r
    update();\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', updateMouse);\r
      container.removeEventListener('touchstart', updateMouse);\r
      container.removeEventListener('touchmove', updateMouse);\r
      cancelAnimationFrame(frameId);\r
      if (gl.canvas && gl.canvas.parentNode === container) {\r
        container.removeChild(gl.canvas);\r
      }\r
    };\r
  }, [\r
    colors,\r
    baseSpring,\r
    baseFriction,\r
    baseThickness,\r
    offsetFactor,\r
    maxAge,\r
    pointCount,\r
    speedMultiplier,\r
    enableFade,\r
    enableShaderEffect,\r
    effectAmplitude,\r
    backgroundColor\r
  ]);\r
\r
  return <div ref={containerRef} className="ribbons-container" />;\r
};\r
\r
export default Ribbons;\r
`,be=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';\r
\r
interface RibbonsProps {\r
  colors?: string[];\r
  baseSpring?: number;\r
  baseFriction?: number;\r
  baseThickness?: number;\r
  offsetFactor?: number;\r
  maxAge?: number;\r
  pointCount?: number;\r
  speedMultiplier?: number;\r
  enableFade?: boolean;\r
  enableShaderEffect?: boolean;\r
  effectAmplitude?: number;\r
  backgroundColor?: number[];\r
}\r
\r
const Ribbons: React.FC<RibbonsProps> = ({\r
  colors = ['#ff9346', '#7cff67', '#ffee51', '#5227FF'],\r
  baseSpring = 0.03,\r
  baseFriction = 0.9,\r
  baseThickness = 30,\r
  offsetFactor = 0.05,\r
  maxAge = 500,\r
  pointCount = 50,\r
  speedMultiplier = 0.6,\r
  enableFade = false,\r
  enableShaderEffect = false,\r
  effectAmplitude = 2,\r
  backgroundColor = [0, 0, 0, 0]\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });\r
    const gl = renderer.gl;\r
    if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {\r
      gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);\r
    } else {\r
      gl.clearColor(0, 0, 0, 0);\r
    }\r
\r
    gl.canvas.style.position = 'absolute';\r
    gl.canvas.style.top = '0';\r
    gl.canvas.style.left = '0';\r
    gl.canvas.style.width = '100%';\r
    gl.canvas.style.height = '100%';\r
    container.appendChild(gl.canvas);\r
\r
    const scene = new Transform();\r
    const lines: {\r
      spring: number;\r
      friction: number;\r
      mouseVelocity: Vec3;\r
      mouseOffset: Vec3;\r
      points: Vec3[];\r
      polyline: Polyline;\r
    }[] = [];\r
\r
    const vertex = \`\r
      precision highp float;\r
      \r
      attribute vec3 position;\r
      attribute vec3 next;\r
      attribute vec3 prev;\r
      attribute vec2 uv;\r
      attribute float side;\r
      \r
      uniform vec2 uResolution;\r
      uniform float uDPR;\r
      uniform float uThickness;\r
      uniform float uTime;\r
      uniform float uEnableShaderEffect;\r
      uniform float uEffectAmplitude;\r
      \r
      varying vec2 vUV;\r
      \r
      vec4 getPosition() {\r
          vec4 current = vec4(position, 1.0);\r
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);\r
          vec2 nextScreen = next.xy * aspect;\r
          vec2 prevScreen = prev.xy * aspect;\r
          vec2 tangent = normalize(nextScreen - prevScreen);\r
          vec2 normal = vec2(-tangent.y, tangent.x);\r
          normal /= aspect;\r
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));\r
          float dist = length(nextScreen - prevScreen);\r
          normal *= smoothstep(0.0, 0.02, dist);\r
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);\r
          float pixelWidth = current.w * pixelWidthRatio;\r
          normal *= pixelWidth * uThickness;\r
          current.xy -= normal * side;\r
          if(uEnableShaderEffect > 0.5) {\r
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;\r
          }\r
          return current;\r
      }\r
      \r
      void main() {\r
          vUV = uv;\r
          gl_Position = getPosition();\r
      }\r
    \`;\r
\r
    const fragment = \`\r
      precision highp float;\r
      uniform vec3 uColor;\r
      uniform float uOpacity;\r
      uniform float uEnableFade;\r
      varying vec2 vUV;\r
      void main() {\r
          float fadeFactor = 1.0;\r
          if(uEnableFade > 0.5) {\r
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);\r
          }\r
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);\r
      }\r
    \`;\r
\r
    function resize() {\r
      if (!container) return;\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      renderer.setSize(width, height);\r
      lines.forEach(line => line.polyline.resize());\r
    }\r
    window.addEventListener('resize', resize);\r
\r
    const center = (colors.length - 1) / 2;\r
    colors.forEach((color, index) => {\r
      const spring = baseSpring + (Math.random() - 0.5) * 0.05;\r
      const friction = baseFriction + (Math.random() - 0.5) * 0.05;\r
      const thickness = baseThickness + (Math.random() - 0.5) * 3;\r
      const mouseOffset = new Vec3(\r
        (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,\r
        (Math.random() - 0.5) * 0.1,\r
        0\r
      );\r
\r
      const line = {\r
        spring,\r
        friction,\r
        mouseVelocity: new Vec3(),\r
        mouseOffset,\r
        points: [] as Vec3[],\r
        polyline: {} as Polyline\r
      };\r
\r
      const count = pointCount;\r
      const points: Vec3[] = [];\r
      for (let i = 0; i < count; i++) {\r
        points.push(new Vec3());\r
      }\r
      line.points = points;\r
\r
      line.polyline = new Polyline(gl, {\r
        points,\r
        vertex,\r
        fragment,\r
        uniforms: {\r
          uColor: { value: new Color(color) },\r
          uThickness: { value: thickness },\r
          uOpacity: { value: 1.0 },\r
          uTime: { value: 0.0 },\r
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },\r
          uEffectAmplitude: { value: effectAmplitude },\r
          uEnableFade: { value: enableFade ? 1.0 : 0.0 }\r
        }\r
      });\r
      line.polyline.mesh.setParent(scene);\r
      lines.push(line);\r
    });\r
\r
    resize();\r
\r
    const mouse = new Vec3();\r
    function updateMouse(e: MouseEvent | TouchEvent) {\r
      let x: number, y: number;\r
      if (!container) return;\r
      const rect = container.getBoundingClientRect();\r
      if ('changedTouches' in e && e.changedTouches.length) {\r
        x = e.changedTouches[0].clientX - rect.left;\r
        y = e.changedTouches[0].clientY - rect.top;\r
      } else if (e instanceof MouseEvent) {\r
        x = e.clientX - rect.left;\r
        y = e.clientY - rect.top;\r
      } else {\r
        x = 0;\r
        y = 0;\r
      }\r
      const width = container.clientWidth;\r
      const height = container.clientHeight;\r
      mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0);\r
    }\r
    container.addEventListener('mousemove', updateMouse);\r
    container.addEventListener('touchstart', updateMouse);\r
    container.addEventListener('touchmove', updateMouse);\r
\r
    const tmp = new Vec3();\r
    let frameId: number;\r
    let lastTime = performance.now();\r
    function update() {\r
      frameId = requestAnimationFrame(update);\r
      const currentTime = performance.now();\r
      const dt = currentTime - lastTime;\r
      lastTime = currentTime;\r
\r
      lines.forEach(line => {\r
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);\r
        line.mouseVelocity.add(tmp).multiply(line.friction);\r
        line.points[0].add(line.mouseVelocity);\r
\r
        for (let i = 1; i < line.points.length; i++) {\r
          if (isFinite(maxAge) && maxAge > 0) {\r
            const segmentDelay = maxAge / (line.points.length - 1);\r
            const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);\r
            line.points[i].lerp(line.points[i - 1], alpha);\r
          } else {\r
            line.points[i].lerp(line.points[i - 1], 0.9);\r
          }\r
        }\r
        if (line.polyline.mesh.program.uniforms.uTime) {\r
          line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;\r
        }\r
        line.polyline.updateGeometry();\r
      });\r
\r
      renderer.render({ scene });\r
    }\r
    update();\r
\r
    return () => {\r
      window.removeEventListener('resize', resize);\r
      container.removeEventListener('mousemove', updateMouse);\r
      container.removeEventListener('touchstart', updateMouse);\r
      container.removeEventListener('touchmove', updateMouse);\r
      cancelAnimationFrame(frameId);\r
      if (gl.canvas && gl.canvas.parentNode === container) {\r
        container.removeChild(gl.canvas);\r
      }\r
    };\r
  }, [\r
    colors,\r
    baseSpring,\r
    baseFriction,\r
    baseThickness,\r
    offsetFactor,\r
    maxAge,\r
    pointCount,\r
    speedMultiplier,\r
    enableFade,\r
    enableShaderEffect,\r
    effectAmplitude,\r
    backgroundColor\r
  ]);\r
\r
  return <div ref={containerRef} className="relative w-full h-full" />;\r
};\r
\r
export default Ribbons;\r
`,ye={dependencies:"ogl",usage:`import Ribbons from './Ribbons';

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <Ribbons
    baseThickness={30}
    colors={['#ffffff']}
    speedMultiplier={0.5}
    maxAge={500}
    enableFade={false}
    enableShaderEffect={true}
  />
</div>`,code:me,css:he,tailwind:ve,tsCode:ge,tsTailwind:be},Ae=()=>{const[v,o]=h.useState(30),[e,g]=h.useState(["#5227FF"]),[b,i]=h.useState(.5),[y,x]=h.useState(500),[p,m]=h.useState(!1),[E,f]=h.useState(!1),c=[{name:"colors",type:"string[]",default:"['#5227FF']",description:"An array of color strings to be used for the ribbons."},{name:"baseSpring",type:"number",default:"0.03",description:"Base spring factor for the physics controlling ribbon motion."},{name:"baseFriction",type:"number",default:"0.9",description:"Base friction factor that dampens the ribbon motion."},{name:"baseThickness",type:"number",default:"30",description:"The base thickness of the ribbons."},{name:"offsetFactor",type:"number",default:"0.02",description:"A factor to horizontally offset the starting positions of the ribbons."},{name:"maxAge",type:"number",default:"500",description:"Delay in milliseconds controlling how long the ribbon trails extend."},{name:"pointCount",type:"number",default:"50",description:"The number of points that make up each ribbon."},{name:"speedMultiplier",type:"number",default:"0.5",description:"Multiplier that adjusts how fast trailing points interpolate towards the head."},{name:"enableFade",type:"boolean",default:"true",description:"If true, a fade effect is applied along the length of the ribbon."},{name:"enableShaderEffect",type:"boolean",default:"true",description:"If true, an additional sine-wave shader effect is applied to the ribbons."},{name:"effectAmplitude",type:"number",default:"2",description:"The amplitude of the shader displacement effect."},{name:"backgroundColor",type:"number[]",default:"[0, 0, 0, 0]",description:"An RGBA array specifying the clear color for the renderer."}];return t.jsxs(re,{children:[t.jsxs(te,{children:[t.jsxs(Q,{position:"relative",className:"demo-container",h:500,p:0,overflow:"hidden",children:[t.jsx(V,{position:"absolute",fontSize:"clamp(2rem, 6vw, 6rem)",fontWeight:900,color:"#271E37",children:"Hover Me."}),t.jsx(pe,{baseThickness:v,colors:e,speedMultiplier:b,maxAge:y,enableFade:p,enableShaderEffect:E})]}),t.jsxs(ce,{children:[t.jsxs(Z,{gap:4,align:"center",mt:4,children:[t.jsx(V,{fontSize:"sm",children:"Count"}),t.jsx(I,{onClick:()=>e.length>1&&g(e.slice(0,-1)),fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:10,children:t.jsx(ee,{})}),t.jsx(V,{children:e.length}),t.jsx(I,{fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:10,onClick:()=>{if(e.length<10){const n=`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")}`;g([...e,n])}},children:t.jsx(ne,{})})]}),t.jsx(P,{title:"Thickness",min:1,max:60,step:1,value:v,onChange:o}),t.jsx(P,{title:"Speed",min:.3,max:.7,step:.01,value:b,onChange:i}),t.jsx(P,{title:"Max Age",min:300,max:1e3,step:100,value:y,onChange:x}),t.jsx(_,{title:"Enable Fade",isChecked:p,onChange:n=>m(n)}),t.jsx(_,{title:"Enable Waves",isChecked:E,onChange:n=>f(n)})]}),t.jsx(oe,{data:c}),t.jsx(se,{dependencyList:["ogl"]})]}),t.jsx(ie,{children:t.jsx(ae,{codeObject:ye})})]})};export{Ae as default};
