import{r as u,R as I,P as A,M as E,j as r,B as F}from"./index-wsKSLPNH.js";import{T as L,P as z,a as T,C as D,b as S}from"./PropTable-C4uPWs8h.js";import{C as H}from"./Customize-1m_ZNqR9.js";import{P as y}from"./PreviewSlider-m1G_aiYP.js";import{P as N}from"./PreviewSwitch-DqnF708j.js";import{D as W}from"./Dependencies-BHoMfJUj.js";import{B}from"./BackgroundContent-CqU7Wlm2.js";import{T as j}from"./Triangle-66-Bqe-c.js";import{C as M}from"./Color-YRkaOI4u.js";import"./index-Bpz4cGEA.js";const q=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,U=`
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`,V=({color:c=[1,1,1],amplitude:d=1,distance:m=0,enableMouseInteraction:a=!1,...v})=>{const f=u.useRef(null),l=u.useRef();return u.useEffect(()=>{if(!f.current)return;const e=f.current,p=new I({alpha:!0}),n=p.gl;n.clearColor(0,0,0,0),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),e.appendChild(n.canvas);const w=new j(n),o=new A(n,{vertex:q,fragment:U,uniforms:{iTime:{value:0},iResolution:{value:new M(n.canvas.width,n.canvas.height,n.canvas.width/n.canvas.height)},uColor:{value:new M(...c)},uAmplitude:{value:d},uDistance:{value:m},uMouse:{value:new Float32Array([.5,.5])}}}),b=new E(n,{geometry:w,program:o});function h(){const{clientWidth:t,clientHeight:i}=e;p.setSize(t,i),o.uniforms.iResolution.value.r=t,o.uniforms.iResolution.value.g=i,o.uniforms.iResolution.value.b=t/i}window.addEventListener("resize",h),h();let s=[.5,.5],g=[.5,.5];function _(t){const i=e.getBoundingClientRect(),C=(t.clientX-i.left)/i.width,R=1-(t.clientY-i.top)/i.height;g=[C,R]}function x(){g=[.5,.5]}a&&(e.addEventListener("mousemove",_),e.addEventListener("mouseleave",x));function P(t){a?(s[0]+=.05*(g[0]-s[0]),s[1]+=.05*(g[1]-s[1]),o.uniforms.uMouse.value[0]=s[0],o.uniforms.uMouse.value[1]=s[1]):(o.uniforms.uMouse.value[0]=.5,o.uniforms.uMouse.value[1]=.5),o.uniforms.iTime.value=t*.001,p.render({scene:b}),l.current=requestAnimationFrame(P)}return l.current=requestAnimationFrame(P),()=>{var t;l.current&&cancelAnimationFrame(l.current),window.removeEventListener("resize",h),a&&(e.removeEventListener("mousemove",_),e.removeEventListener("mouseleave",x)),e.contains(n.canvas)&&e.removeChild(n.canvas),(t=n.getExtension("WEBGL_lose_context"))==null||t.loseContext()}},[c,d,m,a]),r.jsx("div",{ref:f,className:"threads-container",...v})},G=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';\r
\r
import './Threads.css';\r
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
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform vec3 uColor;\r
uniform float uAmplitude;\r
uniform float uDistance;\r
uniform vec2 uMouse;\r
\r
#define PI 3.1415926538\r
\r
const int u_line_count = 40;\r
const float u_line_width = 7.0;\r
const float u_line_blur = 10.0;\r
\r
float Perlin2D(vec2 P) {\r
    vec2 Pi = floor(P);\r
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);\r
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);\r
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;\r
    Pt += vec2(26.0, 161.0).xyxy;\r
    Pt *= Pt;\r
    Pt = Pt.xzxz * Pt.yyww;\r
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));\r
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));\r
    vec4 grad_x = hash_x - 0.49999;\r
    vec4 grad_y = hash_y - 0.49999;\r
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)\r
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);\r
    grad_results *= 1.4142135623730950;\r
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy\r
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);\r
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));\r
    return dot(grad_results, blend2.zxzx * blend2.wwyy);\r
}\r
\r
float pixel(float count, vec2 resolution) {\r
    return (1.0 / max(resolution.x, resolution.y)) * count;\r
}\r
\r
float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {\r
    float split_offset = (perc * 0.4);\r
    float split_point = 0.1 + split_offset;\r
\r
    float amplitude_normal = smoothstep(split_point, 0.7, st.x);\r
    float amplitude_strength = 0.5;\r
    float finalAmplitude = amplitude_normal * amplitude_strength\r
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);\r
\r
    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;\r
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;\r
\r
    float xnoise = mix(\r
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),\r
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,\r
        st.x * 0.3\r
    );\r
\r
    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;\r
\r
    float line_start = smoothstep(\r
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),\r
        y,\r
        st.y\r
    );\r
\r
    float line_end = smoothstep(\r
        y,\r
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),\r
        st.y\r
    );\r
\r
    return clamp(\r
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),\r
        0.0,\r
        1.0\r
    );\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = fragCoord / iResolution.xy;\r
\r
    float line_strength = 1.0;\r
    for (int i = 0; i < u_line_count; i++) {\r
        float p = float(i) / float(u_line_count);\r
        line_strength *= (1.0 - lineFn(\r
            uv,\r
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),\r
            p,\r
            (PI * 1.0) * p,\r
            uMouse,\r
            iTime,\r
            uAmplitude,\r
            uDistance\r
        ));\r
    }\r
\r
    float colorVal = 1.0 - line_strength;\r
    fragColor = vec4(uColor * colorVal, colorVal);\r
}\r
\r
void main() {\r
    mainImage(gl_FragColor, gl_FragCoord.xy);\r
}\r
\`;\r
\r
const Threads = ({ color = [1, 1, 1], amplitude = 1, distance = 0, enableMouseInteraction = false, ...rest }) => {\r
  const containerRef = useRef(null);\r
  const animationFrameId = useRef();\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const container = containerRef.current;\r
\r
    const renderer = new Renderer({ alpha: true });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
    container.appendChild(gl.canvas);\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uColor: { value: new Color(...color) },\r
        uAmplitude: { value: amplitude },\r
        uDistance: { value: distance },\r
        uMouse: { value: new Float32Array([0.5, 0.5]) }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      const { clientWidth, clientHeight } = container;\r
      renderer.setSize(clientWidth, clientHeight);\r
      program.uniforms.iResolution.value.r = clientWidth;\r
      program.uniforms.iResolution.value.g = clientHeight;\r
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    let currentMouse = [0.5, 0.5];\r
    let targetMouse = [0.5, 0.5];\r
\r
    function handleMouseMove(e) {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMouse = [x, y];\r
    }\r
    function handleMouseLeave() {\r
      targetMouse = [0.5, 0.5];\r
    }\r
    if (enableMouseInteraction) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
      container.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
\r
    function update(t) {\r
      if (enableMouseInteraction) {\r
        const smoothing = 0.05;\r
        currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);\r
        currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);\r
        program.uniforms.uMouse.value[0] = currentMouse[0];\r
        program.uniforms.uMouse.value[1] = currentMouse[1];\r
      } else {\r
        program.uniforms.uMouse.value[0] = 0.5;\r
        program.uniforms.uMouse.value[1] = 0.5;\r
      }\r
      program.uniforms.iTime.value = t * 0.001;\r
\r
      renderer.render({ scene: mesh });\r
      animationFrameId.current = requestAnimationFrame(update);\r
    }\r
    animationFrameId.current = requestAnimationFrame(update);\r
\r
    return () => {\r
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);\r
      window.removeEventListener('resize', resize);\r
\r
      if (enableMouseInteraction) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
        container.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [color, amplitude, distance, enableMouseInteraction]);\r
\r
  return <div ref={containerRef} className="threads-container" {...rest} />;\r
};\r
\r
export default Threads;\r
`,O=`.threads-container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
}\r
`,X=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';\r
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
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform vec3 uColor;\r
uniform float uAmplitude;\r
uniform float uDistance;\r
uniform vec2 uMouse;\r
\r
#define PI 3.1415926538\r
\r
const int u_line_count = 40;\r
const float u_line_width = 7.0;\r
const float u_line_blur = 10.0;\r
\r
float Perlin2D(vec2 P) {\r
    vec2 Pi = floor(P);\r
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);\r
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);\r
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;\r
    Pt += vec2(26.0, 161.0).xyxy;\r
    Pt *= Pt;\r
    Pt = Pt.xzxz * Pt.yyww;\r
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));\r
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));\r
    vec4 grad_x = hash_x - 0.49999;\r
    vec4 grad_y = hash_y - 0.49999;\r
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)\r
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);\r
    grad_results *= 1.4142135623730950;\r
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy\r
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);\r
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));\r
    return dot(grad_results, blend2.zxzx * blend2.wwyy);\r
}\r
\r
float pixel(float count, vec2 resolution) {\r
    return (1.0 / max(resolution.x, resolution.y)) * count;\r
}\r
\r
float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {\r
    float split_offset = (perc * 0.4);\r
    float split_point = 0.1 + split_offset;\r
\r
    float amplitude_normal = smoothstep(split_point, 0.7, st.x);\r
    float amplitude_strength = 0.5;\r
    float finalAmplitude = amplitude_normal * amplitude_strength\r
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);\r
\r
    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;\r
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;\r
\r
    float xnoise = mix(\r
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),\r
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,\r
        st.x * 0.3\r
    );\r
\r
    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;\r
\r
    float line_start = smoothstep(\r
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),\r
        y,\r
        st.y\r
    );\r
\r
    float line_end = smoothstep(\r
        y,\r
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),\r
        st.y\r
    );\r
\r
    return clamp(\r
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),\r
        0.0,\r
        1.0\r
    );\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = fragCoord / iResolution.xy;\r
\r
    float line_strength = 1.0;\r
    for (int i = 0; i < u_line_count; i++) {\r
        float p = float(i) / float(u_line_count);\r
        line_strength *= (1.0 - lineFn(\r
            uv,\r
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),\r
            p,\r
            (PI * 1.0) * p,\r
            uMouse,\r
            iTime,\r
            uAmplitude,\r
            uDistance\r
        ));\r
    }\r
\r
    float colorVal = 1.0 - line_strength;\r
    fragColor = vec4(uColor * colorVal, colorVal);\r
}\r
\r
void main() {\r
    mainImage(gl_FragColor, gl_FragCoord.xy);\r
}\r
\`;\r
\r
const Threads = ({ color = [1, 1, 1], amplitude = 1, distance = 0, enableMouseInteraction = false, ...rest }) => {\r
  const containerRef = useRef(null);\r
  const animationFrameId = useRef();\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const container = containerRef.current;\r
\r
    const renderer = new Renderer({ alpha: true });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
    container.appendChild(gl.canvas);\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uColor: { value: new Color(...color) },\r
        uAmplitude: { value: amplitude },\r
        uDistance: { value: distance },\r
        uMouse: { value: new Float32Array([0.5, 0.5]) }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      const { clientWidth, clientHeight } = container;\r
      renderer.setSize(clientWidth, clientHeight);\r
      program.uniforms.iResolution.value.r = clientWidth;\r
      program.uniforms.iResolution.value.g = clientHeight;\r
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    let currentMouse = [0.5, 0.5];\r
    let targetMouse = [0.5, 0.5];\r
\r
    function handleMouseMove(e) {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMouse = [x, y];\r
    }\r
    function handleMouseLeave() {\r
      targetMouse = [0.5, 0.5];\r
    }\r
    if (enableMouseInteraction) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
      container.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
\r
    function update(t) {\r
      if (enableMouseInteraction) {\r
        const smoothing = 0.05;\r
        currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);\r
        currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);\r
        program.uniforms.uMouse.value[0] = currentMouse[0];\r
        program.uniforms.uMouse.value[1] = currentMouse[1];\r
      } else {\r
        program.uniforms.uMouse.value[0] = 0.5;\r
        program.uniforms.uMouse.value[1] = 0.5;\r
      }\r
      program.uniforms.iTime.value = t * 0.001;\r
\r
      renderer.render({ scene: mesh });\r
      animationFrameId.current = requestAnimationFrame(update);\r
    }\r
    animationFrameId.current = requestAnimationFrame(update);\r
\r
    return () => {\r
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);\r
      window.removeEventListener('resize', resize);\r
\r
      if (enableMouseInteraction) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
        container.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [color, amplitude, distance, enableMouseInteraction]);\r
\r
  return <div ref={containerRef} className="w-full h-full relative" {...rest} />;\r
};\r
\r
export default Threads;\r
`,Y=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';\r
\r
import './Threads.css';\r
\r
interface ThreadsProps {\r
  color?: [number, number, number];\r
  amplitude?: number;\r
  distance?: number;\r
  enableMouseInteraction?: boolean;\r
}\r
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
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform vec3 uColor;\r
uniform float uAmplitude;\r
uniform float uDistance;\r
uniform vec2 uMouse;\r
\r
#define PI 3.1415926538\r
\r
const int u_line_count = 40;\r
const float u_line_width = 7.0;\r
const float u_line_blur = 10.0;\r
\r
float Perlin2D(vec2 P) {\r
    vec2 Pi = floor(P);\r
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);\r
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);\r
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;\r
    Pt += vec2(26.0, 161.0).xyxy;\r
    Pt *= Pt;\r
    Pt = Pt.xzxz * Pt.yyww;\r
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));\r
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));\r
    vec4 grad_x = hash_x - 0.49999;\r
    vec4 grad_y = hash_y - 0.49999;\r
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)\r
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);\r
    grad_results *= 1.4142135623730950;\r
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy\r
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);\r
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));\r
    return dot(grad_results, blend2.zxzx * blend2.wwyy);\r
}\r
\r
float pixel(float count, vec2 resolution) {\r
    return (1.0 / max(resolution.x, resolution.y)) * count;\r
}\r
\r
float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {\r
    float split_offset = (perc * 0.4);\r
    float split_point = 0.1 + split_offset;\r
\r
    float amplitude_normal = smoothstep(split_point, 0.7, st.x);\r
    float amplitude_strength = 0.5;\r
    float finalAmplitude = amplitude_normal * amplitude_strength\r
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);\r
\r
    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;\r
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;\r
\r
    float xnoise = mix(\r
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),\r
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,\r
        st.x * 0.3\r
    );\r
\r
    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;\r
\r
    float line_start = smoothstep(\r
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),\r
        y,\r
        st.y\r
    );\r
\r
    float line_end = smoothstep(\r
        y,\r
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),\r
        st.y\r
    );\r
\r
    return clamp(\r
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),\r
        0.0,\r
        1.0\r
    );\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = fragCoord / iResolution.xy;\r
\r
    float line_strength = 1.0;\r
    for (int i = 0; i < u_line_count; i++) {\r
        float p = float(i) / float(u_line_count);\r
        line_strength *= (1.0 - lineFn(\r
            uv,\r
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),\r
            p,\r
            (PI * 1.0) * p,\r
            uMouse,\r
            iTime,\r
            uAmplitude,\r
            uDistance\r
        ));\r
    }\r
\r
    float colorVal = 1.0 - line_strength;\r
    fragColor = vec4(uColor * colorVal, colorVal);\r
}\r
\r
void main() {\r
    mainImage(gl_FragColor, gl_FragCoord.xy);\r
}\r
\`;\r
\r
const Threads: React.FC<ThreadsProps> = ({\r
  color = [1, 1, 1],\r
  amplitude = 1,\r
  distance = 0,\r
  enableMouseInteraction = false,\r
  ...rest\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const animationFrameId = useRef<number>();\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const container = containerRef.current;\r
\r
    const renderer = new Renderer({ alpha: true });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
    container.appendChild(gl.canvas);\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uColor: { value: new Color(...color) },\r
        uAmplitude: { value: amplitude },\r
        uDistance: { value: distance },\r
        uMouse: { value: new Float32Array([0.5, 0.5]) }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      const { clientWidth, clientHeight } = container;\r
      renderer.setSize(clientWidth, clientHeight);\r
      program.uniforms.iResolution.value.r = clientWidth;\r
      program.uniforms.iResolution.value.g = clientHeight;\r
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    let currentMouse = [0.5, 0.5];\r
    let targetMouse = [0.5, 0.5];\r
\r
    function handleMouseMove(e: MouseEvent) {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMouse = [x, y];\r
    }\r
    function handleMouseLeave() {\r
      targetMouse = [0.5, 0.5];\r
    }\r
    if (enableMouseInteraction) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
      container.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
\r
    function update(t: number) {\r
      if (enableMouseInteraction) {\r
        const smoothing = 0.05;\r
        currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);\r
        currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);\r
        program.uniforms.uMouse.value[0] = currentMouse[0];\r
        program.uniforms.uMouse.value[1] = currentMouse[1];\r
      } else {\r
        program.uniforms.uMouse.value[0] = 0.5;\r
        program.uniforms.uMouse.value[1] = 0.5;\r
      }\r
      program.uniforms.iTime.value = t * 0.001;\r
\r
      renderer.render({ scene: mesh });\r
      animationFrameId.current = requestAnimationFrame(update);\r
    }\r
    animationFrameId.current = requestAnimationFrame(update);\r
\r
    return () => {\r
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);\r
      window.removeEventListener('resize', resize);\r
\r
      if (enableMouseInteraction) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
        container.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [color, amplitude, distance, enableMouseInteraction]);\r
\r
  return <div ref={containerRef} className="threads-container" {...rest} />;\r
};\r
\r
export default Threads;\r
`,k=`import React, { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';\r
\r
interface ThreadsProps {\r
  color?: [number, number, number];\r
  amplitude?: number;\r
  distance?: number;\r
  enableMouseInteraction?: boolean;\r
}\r
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
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform vec3 uColor;\r
uniform float uAmplitude;\r
uniform float uDistance;\r
uniform vec2 uMouse;\r
\r
#define PI 3.1415926538\r
\r
const int u_line_count = 40;\r
const float u_line_width = 7.0;\r
const float u_line_blur = 10.0;\r
\r
float Perlin2D(vec2 P) {\r
    vec2 Pi = floor(P);\r
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);\r
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);\r
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;\r
    Pt += vec2(26.0, 161.0).xyxy;\r
    Pt *= Pt;\r
    Pt = Pt.xzxz * Pt.yyww;\r
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));\r
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));\r
    vec4 grad_x = hash_x - 0.49999;\r
    vec4 grad_y = hash_y - 0.49999;\r
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)\r
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);\r
    grad_results *= 1.4142135623730950;\r
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy\r
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);\r
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));\r
    return dot(grad_results, blend2.zxzx * blend2.wwyy);\r
}\r
\r
float pixel(float count, vec2 resolution) {\r
    return (1.0 / max(resolution.x, resolution.y)) * count;\r
}\r
\r
float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {\r
    float split_offset = (perc * 0.4);\r
    float split_point = 0.1 + split_offset;\r
\r
    float amplitude_normal = smoothstep(split_point, 0.7, st.x);\r
    float amplitude_strength = 0.5;\r
    float finalAmplitude = amplitude_normal * amplitude_strength\r
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);\r
\r
    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;\r
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;\r
\r
    float xnoise = mix(\r
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),\r
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,\r
        st.x * 0.3\r
    );\r
\r
    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;\r
\r
    float line_start = smoothstep(\r
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),\r
        y,\r
        st.y\r
    );\r
\r
    float line_end = smoothstep(\r
        y,\r
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),\r
        st.y\r
    );\r
\r
    return clamp(\r
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),\r
        0.0,\r
        1.0\r
    );\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = fragCoord / iResolution.xy;\r
\r
    float line_strength = 1.0;\r
    for (int i = 0; i < u_line_count; i++) {\r
        float p = float(i) / float(u_line_count);\r
        line_strength *= (1.0 - lineFn(\r
            uv,\r
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),\r
            p,\r
            (PI * 1.0) * p,\r
            uMouse,\r
            iTime,\r
            uAmplitude,\r
            uDistance\r
        ));\r
    }\r
\r
    float colorVal = 1.0 - line_strength;\r
    fragColor = vec4(uColor * colorVal, colorVal);\r
}\r
\r
void main() {\r
    mainImage(gl_FragColor, gl_FragCoord.xy);\r
}\r
\`;\r
\r
const Threads: React.FC<ThreadsProps> = ({\r
  color = [1, 1, 1],\r
  amplitude = 1,\r
  distance = 0,\r
  enableMouseInteraction = false,\r
  ...rest\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const animationFrameId = useRef<number>();\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const container = containerRef.current;\r
\r
    const renderer = new Renderer({ alpha: true });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\r
    container.appendChild(gl.canvas);\r
\r
    const geometry = new Triangle(gl);\r
    const program = new Program(gl, {\r
      vertex: vertexShader,\r
      fragment: fragmentShader,\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: {\r
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)\r
        },\r
        uColor: { value: new Color(...color) },\r
        uAmplitude: { value: amplitude },\r
        uDistance: { value: distance },\r
        uMouse: { value: new Float32Array([0.5, 0.5]) }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
\r
    function resize() {\r
      const { clientWidth, clientHeight } = container;\r
      renderer.setSize(clientWidth, clientHeight);\r
      program.uniforms.iResolution.value.r = clientWidth;\r
      program.uniforms.iResolution.value.g = clientHeight;\r
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;\r
    }\r
    window.addEventListener('resize', resize);\r
    resize();\r
\r
    let currentMouse = [0.5, 0.5];\r
    let targetMouse = [0.5, 0.5];\r
\r
    function handleMouseMove(e: MouseEvent) {\r
      const rect = container.getBoundingClientRect();\r
      const x = (e.clientX - rect.left) / rect.width;\r
      const y = 1.0 - (e.clientY - rect.top) / rect.height;\r
      targetMouse = [x, y];\r
    }\r
    function handleMouseLeave() {\r
      targetMouse = [0.5, 0.5];\r
    }\r
    if (enableMouseInteraction) {\r
      container.addEventListener('mousemove', handleMouseMove);\r
      container.addEventListener('mouseleave', handleMouseLeave);\r
    }\r
\r
    function update(t: number) {\r
      if (enableMouseInteraction) {\r
        const smoothing = 0.05;\r
        currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);\r
        currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);\r
        program.uniforms.uMouse.value[0] = currentMouse[0];\r
        program.uniforms.uMouse.value[1] = currentMouse[1];\r
      } else {\r
        program.uniforms.uMouse.value[0] = 0.5;\r
        program.uniforms.uMouse.value[1] = 0.5;\r
      }\r
      program.uniforms.iTime.value = t * 0.001;\r
\r
      renderer.render({ scene: mesh });\r
      animationFrameId.current = requestAnimationFrame(update);\r
    }\r
    animationFrameId.current = requestAnimationFrame(update);\r
\r
    return () => {\r
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);\r
      window.removeEventListener('resize', resize);\r
\r
      if (enableMouseInteraction) {\r
        container.removeEventListener('mousemove', handleMouseMove);\r
        container.removeEventListener('mouseleave', handleMouseLeave);\r
      }\r
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [color, amplitude, distance, enableMouseInteraction]);\r
\r
  return <div ref={containerRef} className="w-full h-full relative" {...rest} />;\r
};\r
\r
export default Threads;\r
`,J={dependencies:"ogl",usage:`import Threads from './Threads';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Threads
    amplitude={1}
    distance={0}
    enableMouseInteraction={true}
  />
</div>`,code:G,css:O,tailwind:X,tsCode:Y,tsTailwind:k},ln=()=>{const[c,d]=u.useState(1),[m,a]=u.useState(0),[v,f]=u.useState(!0),l=[{name:"color",type:"[number, number, number]",default:"[1, 1, 1]",description:"Customizes the color of the lines (RGB)."},{name:"amplitude",type:"number",default:"1",description:"Adjusts the intensity of the wave effect on the lines."},{name:"distance",type:"number",default:"0",description:"Controls the spacing between the lines. A value of 0 means no offset."},{name:"enableMouseInteraction",type:"boolean",default:"false",description:"Enables smooth mouse hover effects that modulate the line's movement and amplitude."}];return r.jsxs(L,{children:[r.jsxs(z,{children:[r.jsxs(F,{position:"relative",className:"demo-container",h:600,overflow:"hidden",p:0,children:[r.jsx(V,{amplitude:c,distance:m,enableMouseInteraction:v}),r.jsx(B,{pillText:"New Background",headline:"Not to be confused with the Threads app by Meta!"})]}),r.jsxs(H,{children:[r.jsx(y,{title:"Amplitude",min:0,max:5,step:.1,value:c,onChange:e=>{d(e)}}),r.jsx(y,{title:"Distance",min:0,max:2,step:.1,value:m,onChange:e=>{a(e)}}),r.jsx(N,{title:"Enable Mouse Interaction",isChecked:v,onChange:e=>{f(e)}})]}),r.jsx(T,{data:l}),r.jsx(W,{dependencyList:["ogl"]})]}),r.jsx(D,{children:r.jsx(S,{codeObject:J})})]})};export{ln as default};
