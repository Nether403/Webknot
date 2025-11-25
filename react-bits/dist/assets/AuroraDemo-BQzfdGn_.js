import{r as c,R as E,P,M as B,j as r,B as T,F as g,T as S}from"./index-wsKSLPNH.js";import{T as _,P as L,a as I,C as N,b as O}from"./PropTable-C4uPWs8h.js";import{D as M}from"./Dependencies-BHoMfJUj.js";import{u as j}from"./useForceRerender-BCFU-k0M.js";import{C as D}from"./Customize-1m_ZNqR9.js";import{P as w}from"./PreviewSlider-m1G_aiYP.js";import{B as H}from"./BackgroundContent-CqU7Wlm2.js";import{T as W}from"./Triangle-66-Bqe-c.js";import{C as A}from"./Color-YRkaOI4u.js";import"./index-Bpz4cGEA.js";import"./PreviewSwitch-DqnF708j.js";const G=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,k=`#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {                int index = 0;                                              for (int i = 0; i < 2; i++) {                                    ColorStop currentColor = colors[i];                         bool isInBetween = currentColor.position <= factor;         index = int(mix(float(index), float(i), float(isInBetween)));   }                                                           ColorStop currentColor = colors[index];                     ColorStop nextColor = colors[index + 1];                    float range = nextColor.position - currentColor.position;   float lerpFactor = (factor - currentColor.position) / range;   finalColor = mix(currentColor.color, nextColor.color, lerpFactor); }

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;function q(u){const{colorStops:f=["#5227FF","#7cff67","#5227FF"],amplitude:p=1,blend:x=.5}=u,s=c.useRef(u);s.current=u;const v=c.useRef(null);return c.useEffect(()=>{const o=v.current;if(!o)return;const m=new E({alpha:!0,premultipliedAlpha:!0,antialias:!0}),n=m.gl;n.clearColor(0,0,0,0),n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE_MINUS_SRC_ALPHA),n.canvas.style.backgroundColor="transparent";let t;function d(){if(!o)return;const l=o.offsetWidth,a=o.offsetHeight;m.setSize(l,a),t&&(t.uniforms.uResolution.value=[l,a])}window.addEventListener("resize",d);const i=new W(n);i.attributes.uv&&delete i.attributes.uv;const h=f.map(l=>{const a=new A(l);return[a.r,a.g,a.b]});t=new P(n,{vertex:G,fragment:k,uniforms:{uTime:{value:0},uAmplitude:{value:p},uColorStops:{value:h},uResolution:{value:[o.offsetWidth,o.offsetHeight]},uBlend:{value:x}}});const e=new B(n,{geometry:i,program:t});o.appendChild(n.canvas);let C=0;const R=l=>{C=requestAnimationFrame(R);const{time:a=l*.01,speed:b=1}=s.current;t.uniforms.uTime.value=a*b*.1,t.uniforms.uAmplitude.value=s.current.amplitude??1,t.uniforms.uBlend.value=s.current.blend??x;const F=s.current.colorStops??f;t.uniforms.uColorStops.value=F.map(z=>{const y=new A(z);return[y.r,y.g,y.b]}),m.render({scene:e})};return C=requestAnimationFrame(R),d(),()=>{var l;cancelAnimationFrame(C),window.removeEventListener("resize",d),o&&n.canvas.parentNode===o&&o.removeChild(n.canvas),(l=n.getExtension("WEBGL_lose_context"))==null||l.loseContext()}},[p]),r.jsx("div",{ref:v,className:"aurora-container"})}const V=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
import './Aurora.css';\r
\r
const VERT = \`#version 300 es\r
in vec2 position;\r
void main() {\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const FRAG = \`#version 300 es\r
precision highp float;\r
\r
uniform float uTime;\r
uniform float uAmplitude;\r
uniform vec3 uColorStops[3];\r
uniform vec2 uResolution;\r
uniform float uBlend;\r
\r
out vec4 fragColor;\r
\r
vec3 permute(vec3 x) {\r
  return mod(((x * 34.0) + 1.0) * x, 289.0);\r
}\r
\r
float snoise(vec2 v){\r
  const vec4 C = vec4(\r
      0.211324865405187, 0.366025403784439,\r
      -0.577350269189626, 0.024390243902439\r
  );\r
  vec2 i  = floor(v + dot(v, C.yy));\r
  vec2 x0 = v - i + dot(i, C.xx);\r
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\r
  vec4 x12 = x0.xyxy + C.xxzz;\r
  x12.xy -= i1;\r
  i = mod(i, 289.0);\r
\r
  vec3 p = permute(\r
      permute(i.y + vec3(0.0, i1.y, 1.0))\r
    + i.x + vec3(0.0, i1.x, 1.0)\r
  );\r
\r
  vec3 m = max(\r
      0.5 - vec3(\r
          dot(x0, x0),\r
          dot(x12.xy, x12.xy),\r
          dot(x12.zw, x12.zw)\r
      ), \r
      0.0\r
  );\r
  m = m * m;\r
  m = m * m;\r
\r
  vec3 x = 2.0 * fract(p * C.www) - 1.0;\r
  vec3 h = abs(x) - 0.5;\r
  vec3 ox = floor(x + 0.5);\r
  vec3 a0 = x - ox;\r
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
\r
  vec3 g;\r
  g.x  = a0.x  * x0.x  + h.x  * x0.y;\r
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
  return 130.0 * dot(m, g);\r
}\r
\r
struct ColorStop {\r
  vec3 color;\r
  float position;\r
};\r
\r
#define COLOR_RAMP(colors, factor, finalColor) {              \\\r
  int index = 0;                                            \\\r
  for (int i = 0; i < 2; i++) {                               \\\r
     ColorStop currentColor = colors[i];                    \\\r
     bool isInBetween = currentColor.position <= factor;    \\\r
     index = int(mix(float(index), float(i), float(isInBetween))); \\\r
  }                                                         \\\r
  ColorStop currentColor = colors[index];                   \\\r
  ColorStop nextColor = colors[index + 1];                  \\\r
  float range = nextColor.position - currentColor.position; \\\r
  float lerpFactor = (factor - currentColor.position) / range; \\\r
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\\r
}\r
\r
void main() {\r
  vec2 uv = gl_FragCoord.xy / uResolution;\r
  \r
  ColorStop colors[3];\r
  colors[0] = ColorStop(uColorStops[0], 0.0);\r
  colors[1] = ColorStop(uColorStops[1], 0.5);\r
  colors[2] = ColorStop(uColorStops[2], 1.0);\r
  \r
  vec3 rampColor;\r
  COLOR_RAMP(colors, uv.x, rampColor);\r
  \r
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;\r
  height = exp(height);\r
  height = (uv.y * 2.0 - height + 0.2);\r
  float intensity = 0.6 * height;\r
  \r
  float midPoint = 0.20;\r
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);\r
  \r
  vec3 auroraColor = intensity * rampColor;\r
  \r
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);\r
}\r
\`;\r
\r
export default function Aurora(props) {\r
  const { colorStops = ['#5227FF', '#7cff67', '#5227FF'], amplitude = 1.0, blend = 0.5 } = props;\r
  const propsRef = useRef(props);\r
  propsRef.current = props;\r
\r
  const ctnDom = useRef(null);\r
\r
  useEffect(() => {\r
    const ctn = ctnDom.current;\r
    if (!ctn) return;\r
\r
    const renderer = new Renderer({\r
      alpha: true,\r
      premultipliedAlpha: true,\r
      antialias: true\r
    });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);\r
    gl.canvas.style.backgroundColor = 'transparent';\r
\r
    let program;\r
\r
    function resize() {\r
      if (!ctn) return;\r
      const width = ctn.offsetWidth;\r
      const height = ctn.offsetHeight;\r
      renderer.setSize(width, height);\r
      if (program) {\r
        program.uniforms.uResolution.value = [width, height];\r
      }\r
    }\r
    window.addEventListener('resize', resize);\r
\r
    const geometry = new Triangle(gl);\r
    if (geometry.attributes.uv) {\r
      delete geometry.attributes.uv;\r
    }\r
\r
    const colorStopsArray = colorStops.map(hex => {\r
      const c = new Color(hex);\r
      return [c.r, c.g, c.b];\r
    });\r
\r
    program = new Program(gl, {\r
      vertex: VERT,\r
      fragment: FRAG,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uAmplitude: { value: amplitude },\r
        uColorStops: { value: colorStopsArray },\r
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },\r
        uBlend: { value: blend }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    ctn.appendChild(gl.canvas);\r
\r
    let animateId = 0;\r
    const update = t => {\r
      animateId = requestAnimationFrame(update);\r
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;\r
      program.uniforms.uTime.value = time * speed * 0.1;\r
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;\r
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;\r
      const stops = propsRef.current.colorStops ?? colorStops;\r
      program.uniforms.uColorStops.value = stops.map(hex => {\r
        const c = new Color(hex);\r
        return [c.r, c.g, c.b];\r
      });\r
      renderer.render({ scene: mesh });\r
    };\r
    animateId = requestAnimationFrame(update);\r
\r
    resize();\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (ctn && gl.canvas.parentNode === ctn) {\r
        ctn.removeChild(gl.canvas);\r
      }\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [amplitude]);\r
\r
  return <div ref={ctnDom} className="aurora-container" />;\r
}\r
`,U=`.aurora-container {\r
  width: 100%;\r
  height: 100%;\r
}\r
`,J=`import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
import { useEffect, useRef } from 'react';\r
\r
const VERT = \`#version 300 es\r
in vec2 position;\r
void main() {\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const FRAG = \`#version 300 es\r
precision highp float;\r
\r
uniform float uTime;\r
uniform float uAmplitude;\r
uniform vec3 uColorStops[3];\r
uniform vec2 uResolution;\r
uniform float uBlend;\r
\r
out vec4 fragColor;\r
\r
vec3 permute(vec3 x) {\r
  return mod(((x * 34.0) + 1.0) * x, 289.0);\r
}\r
\r
float snoise(vec2 v){\r
  const vec4 C = vec4(\r
      0.211324865405187, 0.366025403784439,\r
      -0.577350269189626, 0.024390243902439\r
  );\r
  vec2 i  = floor(v + dot(v, C.yy));\r
  vec2 x0 = v - i + dot(i, C.xx);\r
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\r
  vec4 x12 = x0.xyxy + C.xxzz;\r
  x12.xy -= i1;\r
  i = mod(i, 289.0);\r
\r
  vec3 p = permute(\r
      permute(i.y + vec3(0.0, i1.y, 1.0))\r
    + i.x + vec3(0.0, i1.x, 1.0)\r
  );\r
\r
  vec3 m = max(\r
      0.5 - vec3(\r
          dot(x0, x0),\r
          dot(x12.xy, x12.xy),\r
          dot(x12.zw, x12.zw)\r
      ), \r
      0.0\r
  );\r
  m = m * m;\r
  m = m * m;\r
\r
  vec3 x = 2.0 * fract(p * C.www) - 1.0;\r
  vec3 h = abs(x) - 0.5;\r
  vec3 ox = floor(x + 0.5);\r
  vec3 a0 = x - ox;\r
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
\r
  vec3 g;\r
  g.x  = a0.x  * x0.x  + h.x  * x0.y;\r
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
  return 130.0 * dot(m, g);\r
}\r
\r
struct ColorStop {\r
  vec3 color;\r
  float position;\r
};\r
\r
#define COLOR_RAMP(colors, factor, finalColor) {              \\\r
  int index = 0;                                            \\\r
  for (int i = 0; i < 2; i++) {                               \\\r
     ColorStop currentColor = colors[i];                    \\\r
     bool isInBetween = currentColor.position <= factor;    \\\r
     index = int(mix(float(index), float(i), float(isInBetween))); \\\r
  }                                                         \\\r
  ColorStop currentColor = colors[index];                   \\\r
  ColorStop nextColor = colors[index + 1];                  \\\r
  float range = nextColor.position - currentColor.position; \\\r
  float lerpFactor = (factor - currentColor.position) / range; \\\r
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\\r
}\r
\r
void main() {\r
  vec2 uv = gl_FragCoord.xy / uResolution;\r
  \r
  ColorStop colors[3];\r
  colors[0] = ColorStop(uColorStops[0], 0.0);\r
  colors[1] = ColorStop(uColorStops[1], 0.5);\r
  colors[2] = ColorStop(uColorStops[2], 1.0);\r
  \r
  vec3 rampColor;\r
  COLOR_RAMP(colors, uv.x, rampColor);\r
  \r
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;\r
  height = exp(height);\r
  height = (uv.y * 2.0 - height + 0.2);\r
  float intensity = 0.6 * height;\r
  \r
  float midPoint = 0.20;\r
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);\r
  \r
  vec3 auroraColor = intensity * rampColor;\r
  \r
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);\r
}\r
\`;\r
\r
export default function Aurora(props) {\r
  const { colorStops = ['#5227FF', '#7cff67', '#5227FF'], amplitude = 1.0, blend = 0.5 } = props;\r
  const propsRef = useRef(props);\r
  propsRef.current = props;\r
\r
  const ctnDom = useRef(null);\r
\r
  useEffect(() => {\r
    const ctn = ctnDom.current;\r
    if (!ctn) return;\r
\r
    const renderer = new Renderer({\r
      alpha: true,\r
      premultipliedAlpha: true,\r
      antialias: true\r
    });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);\r
    gl.canvas.style.backgroundColor = 'transparent';\r
\r
    let program;\r
\r
    function resize() {\r
      if (!ctn) return;\r
      const width = ctn.offsetWidth;\r
      const height = ctn.offsetHeight;\r
      renderer.setSize(width, height);\r
      if (program) {\r
        program.uniforms.uResolution.value = [width, height];\r
      }\r
    }\r
    window.addEventListener('resize', resize);\r
\r
    const geometry = new Triangle(gl);\r
    if (geometry.attributes.uv) {\r
      delete geometry.attributes.uv;\r
    }\r
\r
    const colorStopsArray = colorStops.map(hex => {\r
      const c = new Color(hex);\r
      return [c.r, c.g, c.b];\r
    });\r
\r
    program = new Program(gl, {\r
      vertex: VERT,\r
      fragment: FRAG,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uAmplitude: { value: amplitude },\r
        uColorStops: { value: colorStopsArray },\r
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },\r
        uBlend: { value: blend }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    ctn.appendChild(gl.canvas);\r
\r
    let animateId = 0;\r
    const update = t => {\r
      animateId = requestAnimationFrame(update);\r
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;\r
      program.uniforms.uTime.value = time * speed * 0.1;\r
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;\r
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;\r
      const stops = propsRef.current.colorStops ?? colorStops;\r
      program.uniforms.uColorStops.value = stops.map(hex => {\r
        const c = new Color(hex);\r
        return [c.r, c.g, c.b];\r
      });\r
      renderer.render({ scene: mesh });\r
    };\r
    animateId = requestAnimationFrame(update);\r
\r
    resize();\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (ctn && gl.canvas.parentNode === ctn) {\r
        ctn.removeChild(gl.canvas);\r
      }\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [amplitude]);\r
\r
  return <div ref={ctnDom} className="w-full h-full" />;\r
}\r
`,K=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
\r
import './Aurora.css';\r
\r
const VERT = \`#version 300 es\r
in vec2 position;\r
void main() {\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const FRAG = \`#version 300 es\r
precision highp float;\r
\r
uniform float uTime;\r
uniform float uAmplitude;\r
uniform vec3 uColorStops[3];\r
uniform vec2 uResolution;\r
uniform float uBlend;\r
\r
out vec4 fragColor;\r
\r
vec3 permute(vec3 x) {\r
  return mod(((x * 34.0) + 1.0) * x, 289.0);\r
}\r
\r
float snoise(vec2 v){\r
  const vec4 C = vec4(\r
      0.211324865405187, 0.366025403784439,\r
      -0.577350269189626, 0.024390243902439\r
  );\r
  vec2 i  = floor(v + dot(v, C.yy));\r
  vec2 x0 = v - i + dot(i, C.xx);\r
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\r
  vec4 x12 = x0.xyxy + C.xxzz;\r
  x12.xy -= i1;\r
  i = mod(i, 289.0);\r
\r
  vec3 p = permute(\r
      permute(i.y + vec3(0.0, i1.y, 1.0))\r
    + i.x + vec3(0.0, i1.x, 1.0)\r
  );\r
\r
  vec3 m = max(\r
      0.5 - vec3(\r
          dot(x0, x0),\r
          dot(x12.xy, x12.xy),\r
          dot(x12.zw, x12.zw)\r
      ), \r
      0.0\r
  );\r
  m = m * m;\r
  m = m * m;\r
\r
  vec3 x = 2.0 * fract(p * C.www) - 1.0;\r
  vec3 h = abs(x) - 0.5;\r
  vec3 ox = floor(x + 0.5);\r
  vec3 a0 = x - ox;\r
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
\r
  vec3 g;\r
  g.x  = a0.x  * x0.x  + h.x  * x0.y;\r
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
  return 130.0 * dot(m, g);\r
}\r
\r
struct ColorStop {\r
  vec3 color;\r
  float position;\r
};\r
\r
#define COLOR_RAMP(colors, factor, finalColor) {              \\\r
  int index = 0;                                            \\\r
  for (int i = 0; i < 2; i++) {                               \\\r
     ColorStop currentColor = colors[i];                    \\\r
     bool isInBetween = currentColor.position <= factor;    \\\r
     index = int(mix(float(index), float(i), float(isInBetween))); \\\r
  }                                                         \\\r
  ColorStop currentColor = colors[index];                   \\\r
  ColorStop nextColor = colors[index + 1];                  \\\r
  float range = nextColor.position - currentColor.position; \\\r
  float lerpFactor = (factor - currentColor.position) / range; \\\r
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\\r
}\r
\r
void main() {\r
  vec2 uv = gl_FragCoord.xy / uResolution;\r
  \r
  ColorStop colors[3];\r
  colors[0] = ColorStop(uColorStops[0], 0.0);\r
  colors[1] = ColorStop(uColorStops[1], 0.5);\r
  colors[2] = ColorStop(uColorStops[2], 1.0);\r
  \r
  vec3 rampColor;\r
  COLOR_RAMP(colors, uv.x, rampColor);\r
  \r
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;\r
  height = exp(height);\r
  height = (uv.y * 2.0 - height + 0.2);\r
  float intensity = 0.6 * height;\r
  \r
  float midPoint = 0.20;\r
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);\r
  \r
  vec3 auroraColor = intensity * rampColor;\r
  \r
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);\r
}\r
\`;\r
\r
interface AuroraProps {\r
  colorStops?: string[];\r
  amplitude?: number;\r
  blend?: number;\r
  time?: number;\r
  speed?: number;\r
}\r
\r
export default function Aurora(props: AuroraProps) {\r
  const { colorStops = ['#5227FF', '#7cff67', '#5227FF'], amplitude = 1.0, blend = 0.5 } = props;\r
  const propsRef = useRef<AuroraProps>(props);\r
  propsRef.current = props;\r
\r
  const ctnDom = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const ctn = ctnDom.current;\r
    if (!ctn) return;\r
\r
    const renderer = new Renderer({\r
      alpha: true,\r
      premultipliedAlpha: true,\r
      antialias: true\r
    });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);\r
    gl.canvas.style.backgroundColor = 'transparent';\r
\r
    let program: Program | undefined;\r
\r
    function resize() {\r
      if (!ctn) return;\r
      const width = ctn.offsetWidth;\r
      const height = ctn.offsetHeight;\r
      renderer.setSize(width, height);\r
      if (program) {\r
        program.uniforms.uResolution.value = [width, height];\r
      }\r
    }\r
    window.addEventListener('resize', resize);\r
\r
    const geometry = new Triangle(gl);\r
    if (geometry.attributes.uv) {\r
      delete geometry.attributes.uv;\r
    }\r
\r
    const colorStopsArray = colorStops.map(hex => {\r
      const c = new Color(hex);\r
      return [c.r, c.g, c.b];\r
    });\r
\r
    program = new Program(gl, {\r
      vertex: VERT,\r
      fragment: FRAG,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uAmplitude: { value: amplitude },\r
        uColorStops: { value: colorStopsArray },\r
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },\r
        uBlend: { value: blend }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    ctn.appendChild(gl.canvas);\r
\r
    let animateId = 0;\r
    const update = (t: number) => {\r
      animateId = requestAnimationFrame(update);\r
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;\r
      if (program) {\r
        program.uniforms.uTime.value = time * speed * 0.1;\r
        program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;\r
        program.uniforms.uBlend.value = propsRef.current.blend ?? blend;\r
        const stops = propsRef.current.colorStops ?? colorStops;\r
        program.uniforms.uColorStops.value = stops.map((hex: string) => {\r
          const c = new Color(hex);\r
          return [c.r, c.g, c.b];\r
        });\r
        renderer.render({ scene: mesh });\r
      }\r
    };\r
    animateId = requestAnimationFrame(update);\r
\r
    resize();\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (ctn && gl.canvas.parentNode === ctn) {\r
        ctn.removeChild(gl.canvas);\r
      }\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [amplitude]);\r
\r
  return <div ref={ctnDom} className="aurora-container" />;\r
}\r
`,Q=`import { useEffect, useRef } from 'react';\r
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\r
\r
const VERT = \`#version 300 es\r
in vec2 position;\r
void main() {\r
  gl_Position = vec4(position, 0.0, 1.0);\r
}\r
\`;\r
\r
const FRAG = \`#version 300 es\r
precision highp float;\r
\r
uniform float uTime;\r
uniform float uAmplitude;\r
uniform vec3 uColorStops[3];\r
uniform vec2 uResolution;\r
uniform float uBlend;\r
\r
out vec4 fragColor;\r
\r
vec3 permute(vec3 x) {\r
  return mod(((x * 34.0) + 1.0) * x, 289.0);\r
}\r
\r
float snoise(vec2 v){\r
  const vec4 C = vec4(\r
      0.211324865405187, 0.366025403784439,\r
      -0.577350269189626, 0.024390243902439\r
  );\r
  vec2 i  = floor(v + dot(v, C.yy));\r
  vec2 x0 = v - i + dot(i, C.xx);\r
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\r
  vec4 x12 = x0.xyxy + C.xxzz;\r
  x12.xy -= i1;\r
  i = mod(i, 289.0);\r
\r
  vec3 p = permute(\r
      permute(i.y + vec3(0.0, i1.y, 1.0))\r
    + i.x + vec3(0.0, i1.x, 1.0)\r
  );\r
\r
  vec3 m = max(\r
      0.5 - vec3(\r
          dot(x0, x0),\r
          dot(x12.xy, x12.xy),\r
          dot(x12.zw, x12.zw)\r
      ), \r
      0.0\r
  );\r
  m = m * m;\r
  m = m * m;\r
\r
  vec3 x = 2.0 * fract(p * C.www) - 1.0;\r
  vec3 h = abs(x) - 0.5;\r
  vec3 ox = floor(x + 0.5);\r
  vec3 a0 = x - ox;\r
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
\r
  vec3 g;\r
  g.x  = a0.x  * x0.x  + h.x  * x0.y;\r
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
  return 130.0 * dot(m, g);\r
}\r
\r
struct ColorStop {\r
  vec3 color;\r
  float position;\r
};\r
\r
#define COLOR_RAMP(colors, factor, finalColor) {              \\\r
  int index = 0;                                            \\\r
  for (int i = 0; i < 2; i++) {                               \\\r
     ColorStop currentColor = colors[i];                    \\\r
     bool isInBetween = currentColor.position <= factor;    \\\r
     index = int(mix(float(index), float(i), float(isInBetween))); \\\r
  }                                                         \\\r
  ColorStop currentColor = colors[index];                   \\\r
  ColorStop nextColor = colors[index + 1];                  \\\r
  float range = nextColor.position - currentColor.position; \\\r
  float lerpFactor = (factor - currentColor.position) / range; \\\r
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\\r
}\r
\r
void main() {\r
  vec2 uv = gl_FragCoord.xy / uResolution;\r
  \r
  ColorStop colors[3];\r
  colors[0] = ColorStop(uColorStops[0], 0.0);\r
  colors[1] = ColorStop(uColorStops[1], 0.5);\r
  colors[2] = ColorStop(uColorStops[2], 1.0);\r
  \r
  vec3 rampColor;\r
  COLOR_RAMP(colors, uv.x, rampColor);\r
  \r
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;\r
  height = exp(height);\r
  height = (uv.y * 2.0 - height + 0.2);\r
  float intensity = 0.6 * height;\r
  \r
  float midPoint = 0.20;\r
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);\r
  \r
  vec3 auroraColor = intensity * rampColor;\r
  \r
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);\r
}\r
\`;\r
\r
interface AuroraProps {\r
  colorStops?: string[];\r
  amplitude?: number;\r
  blend?: number;\r
  time?: number;\r
  speed?: number;\r
}\r
\r
export default function Aurora(props: AuroraProps) {\r
  const { colorStops = ['#5227FF', '#7cff67', '#5227FF'], amplitude = 1.0, blend = 0.5 } = props;\r
  const propsRef = useRef<AuroraProps>(props);\r
  propsRef.current = props;\r
\r
  const ctnDom = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    const ctn = ctnDom.current;\r
    if (!ctn) return;\r
\r
    const renderer = new Renderer({\r
      alpha: true,\r
      premultipliedAlpha: true,\r
      antialias: true\r
    });\r
    const gl = renderer.gl;\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.enable(gl.BLEND);\r
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);\r
    gl.canvas.style.backgroundColor = 'transparent';\r
\r
    let program: Program | undefined;\r
\r
    function resize() {\r
      if (!ctn) return;\r
      const width = ctn.offsetWidth;\r
      const height = ctn.offsetHeight;\r
      renderer.setSize(width, height);\r
      if (program) {\r
        program.uniforms.uResolution.value = [width, height];\r
      }\r
    }\r
    window.addEventListener('resize', resize);\r
\r
    const geometry = new Triangle(gl);\r
    if (geometry.attributes.uv) {\r
      delete geometry.attributes.uv;\r
    }\r
\r
    const colorStopsArray = colorStops.map(hex => {\r
      const c = new Color(hex);\r
      return [c.r, c.g, c.b];\r
    });\r
\r
    program = new Program(gl, {\r
      vertex: VERT,\r
      fragment: FRAG,\r
      uniforms: {\r
        uTime: { value: 0 },\r
        uAmplitude: { value: amplitude },\r
        uColorStops: { value: colorStopsArray },\r
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },\r
        uBlend: { value: blend }\r
      }\r
    });\r
\r
    const mesh = new Mesh(gl, { geometry, program });\r
    ctn.appendChild(gl.canvas);\r
\r
    let animateId = 0;\r
    const update = (t: number) => {\r
      animateId = requestAnimationFrame(update);\r
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;\r
      if (program) {\r
        program.uniforms.uTime.value = time * speed * 0.1;\r
        program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;\r
        program.uniforms.uBlend.value = propsRef.current.blend ?? blend;\r
        const stops = propsRef.current.colorStops ?? colorStops;\r
        program.uniforms.uColorStops.value = stops.map((hex: string) => {\r
          const c = new Color(hex);\r
          return [c.r, c.g, c.b];\r
        });\r
        renderer.render({ scene: mesh });\r
      }\r
    };\r
    animateId = requestAnimationFrame(update);\r
\r
    resize();\r
\r
    return () => {\r
      cancelAnimationFrame(animateId);\r
      window.removeEventListener('resize', resize);\r
      if (ctn && gl.canvas.parentNode === ctn) {\r
        ctn.removeChild(gl.canvas);\r
      }\r
      gl.getExtension('WEBGL_lose_context')?.loseContext();\r
    };\r
  }, [amplitude]);\r
\r
  return <div ref={ctnDom} className="w-full h-full" />;\r
}\r
`,X={dependencies:"ogl",usage:`import Aurora from './Aurora';
  
<Aurora
  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>`,code:V,css:U,tailwind:J,tsCode:K,tsTailwind:Q},ar=()=>{const[u,f]=c.useState("#7cff67"),[p,x]=c.useState("#B19EEF"),[s,v]=c.useState("#5227FF"),[o,m]=c.useState(1),[n,t]=c.useState(.5),[d,i]=j(),h=[{name:"colorStops",type:"[string, string, string]",default:'["#3A29FF", "#FF94B4", "#FF3232"]',description:"An array of three hex colors defining the aurora gradient."},{name:"speed",type:"number",default:"1.0",description:"Controls the animation speed. Higher values make the aurora move faster."},{name:"blend",type:"number",default:"0.5",description:"Controls the blending of the aurora effect with the background."},{name:"amplitude",type:"number",default:"1.0",description:"Controls the height intensity of the aurora effect."}];return r.jsxs(_,{children:[r.jsxs(L,{children:[r.jsxs(T,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[r.jsx(q,{blend:n,speed:o,colorStops:[u,p,s]},d),r.jsx(H,{pillText:"New Background",headline:"Bring the Arctic to you, with one line of code"})]}),r.jsxs(D,{children:[r.jsxs(g,{gap:4,mb:2,children:[r.jsxs(g,{alignItems:"center",children:[r.jsx(S,{mr:2,children:"Color 1"}),r.jsx("input",{type:"color",value:u,style:{height:"22px",outline:"none",border:"none"},onChange:e=>{f(e.target.value),i()}})]}),r.jsxs(g,{alignItems:"center",children:[r.jsx(S,{mr:2,children:"Color 2"}),r.jsx("input",{type:"color",value:p,style:{height:"22px",outline:"none",border:"none"},onChange:e=>{x(e.target.value),i()}})]}),r.jsxs(g,{alignItems:"center",children:[r.jsx(S,{mr:2,children:"Color 3"}),r.jsx("input",{type:"color",value:s,style:{height:"22px",outline:"none",border:"none"},onChange:e=>{v(e.target.value),i()}})]})]}),r.jsx(w,{title:"Speed",min:0,max:2,step:.1,value:o,onChange:e=>{m(e),i()}}),r.jsx(w,{title:"Blend",min:0,max:1,step:.01,value:n,onChange:e=>{t(e),i()}})]}),r.jsx(I,{data:h}),r.jsx(M,{dependencyList:["ogl"]})]}),r.jsx(N,{children:r.jsx(O,{codeObject:X})})]})};export{ar as default};
