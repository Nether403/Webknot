import{r as p,j as a,B as Ee,F as ge,T as ye,d as Ce}from"./index-wsKSLPNH.js";import{T as Te,P as Pe,a as be,C as we,b as Ae}from"./PropTable-C4uPWs8h.js";import{C as ze}from"./Customize-1m_ZNqR9.js";import{D as qe}from"./Dependencies-BHoMfJUj.js";import{P as B}from"./PreviewSlider-m1G_aiYP.js";import{P as Me}from"./PreviewSelect-B8u33nUa.js";import{P as ae}from"./PreviewSwitch-DqnF708j.js";import{B as Ie}from"./BackgroundContent-CqU7Wlm2.js";import{W as _e,V as le,C as ke,S as Fe,O as Le,a as He,bv as Be,P as De,M as Oe,z as D,i as Ne,T as Ue,ae as se}from"./three.module-0PRdiASR.js";import{E as ce,R as fe,a as ue,c as de}from"./index-cCvir2e6.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const Ge=()=>{const i=document.createElement("canvas");i.width=64,i.height=64;const l=i.getContext("2d");if(!l)throw new Error("2D context not available");l.fillStyle="black",l.fillRect(0,0,i.width,i.height);const w=new Ue(i);w.minFilter=se,w.magFilter=se,w.generateMipmaps=!1;const S=[];let y=null;const m=64;let C=.1*64;const q=1/m,k=()=>{l.fillStyle="black",l.fillRect(0,0,i.width,i.height)},M=n=>{const s={x:n.x*64,y:(1-n.y)*64};let c=1;const E=h=>Math.sin(h*Math.PI/2),g=h=>-h*(h-2);n.age<m*.3?c=E(n.age/(m*.3)):c=g(1-(n.age-m*.3)/(m*.7))||0,c*=n.force;const v=`${(n.vx+1)/2*255}, ${(n.vy+1)/2*255}, ${c*255}`,x=64*5;l.shadowOffsetX=x,l.shadowOffsetY=x,l.shadowBlur=C,l.shadowColor=`rgba(${v},${.22*c})`,l.beginPath(),l.fillStyle="rgba(255,0,0,1)",l.arc(s.x-x,s.y-x,C,0,Math.PI*2),l.fill()};return{canvas:i,texture:w,addTouch:n=>{let s=0,c=0,E=0;if(y){const g=n.x-y.x,v=n.y-y.y;if(g===0&&v===0)return;const x=g*g+v*v,h=Math.sqrt(x);c=g/(h||1),E=v/(h||1),s=Math.min(x*1e4,1)}y={x:n.x,y:n.y},S.push({x:n.x,y:n.y,age:0,force:s,vx:c,vy:E})},update:()=>{k();for(let n=S.length-1;n>=0;n--){const s=S[n],c=s.force*q*(1-s.age/m);s.x+=s.vx*c,s.y+=s.vy*c,s.age++,s.age>m&&S.splice(n,1)}for(let n=0;n<S.length;n++)M(S[n]);w.needsUpdate=!0},set radiusScale(n){C=.1*64*n},get radiusScale(){return C/(.1*64)},size:64}},Ve=(b,i)=>{const l=`
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);

      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
    `;return new de("LiquidEffect",l,{uniforms:new Map([["uTexture",new D(b)],["uStrength",new D((i==null?void 0:i.strength)??.025)],["uTime",new D(0)],["uFreq",new D((i==null?void 0:i.freq)??4.5)]])})},pe={square:0,circle:1,triangle:2,diamond:3},Xe=`
void main() {
  gl_Position = vec4(position, 1.0);
}
`,Ke=`
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;
  fragColor = vec4(color, M);
}
`,We=`
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;
  gl_FragColor = vec4(color, M);
}
`,X=10,Je=({variant:b="square",pixelSize:i=3,color:l="#B19EEF",className:w,style:S,antialias:y=!0,patternScale:m=2,patternDensity:C=1,liquid:q=!1,liquidStrength:k=.1,liquidRadius:M=1,pixelSizeJitter:L=0,enableRipples:F=!0,rippleIntensityScale:n=1,rippleThickness:s=.1,rippleSpeed:c=.3,liquidWobbleSpeed:E=4.5,autoPauseOffscreen:g=!0,speed:v=.5,transparent:x=!0,edgeFade:h=.5,noiseAmount:T=0})=>{const K=p.useRef(null),me=p.useRef({visible:!0}),W=p.useRef(v),d=p.useRef(null),G=p.useRef(null);return p.useEffect(()=>{var j,Y,$;const A=K.current;if(!A)return;W.current=v;const ve=["antialias","liquid","noiseAmount"],J={antialias:y,liquid:q,noiseAmount:T};let N=!1;if(!d.current)N=!0;else if(G.current){for(const e of ve)if(G.current[e]!==J[e]){N=!0;break}}if(N){if(d.current){const t=d.current;(j=t.resizeObserver)==null||j.disconnect(),cancelAnimationFrame(t.raf),(Y=t.quad)==null||Y.geometry.dispose(),t.material.dispose(),($=t.composer)==null||$.dispose(),t.renderer.dispose(),t.renderer.domElement.parentElement===A&&A.removeChild(t.renderer.domElement),d.current=null}const e=document.createElement("canvas"),r=new _e({canvas:e,antialias:y,alpha:!0,powerPreference:"high-performance"});r.domElement.style.width="100%",r.domElement.style.height="100%",r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),A.appendChild(r.domElement),x?r.setClearAlpha(0):r.setClearColor(0,1);const f={uResolution:{value:new le(0,0)},uTime:{value:0},uColor:{value:new ke(l)},uClickPos:{value:Array.from({length:X},()=>new le(-1,-1))},uClickTimes:{value:new Float32Array(X)},uShapeType:{value:pe[b]??0},uPixelSize:{value:i*r.getPixelRatio()},uScale:{value:m},uDensity:{value:C},uPixelJitter:{value:L},uEnableRipples:{value:F?1:0},uRippleSpeed:{value:c},uRippleThickness:{value:s},uRippleIntensity:{value:n},uEdgeFade:{value:h}},I=new Fe,H=new Le(-1,1,1,-1,0,1),Q=r.capabilities.isWebGL2,Z=new He({vertexShader:Xe,fragmentShader:Q?Ke:We,uniforms:f,transparent:!0,depthTest:!1,depthWrite:!1,glslVersion:Q?Be:void 0}),xe=new De(2,2),ee=new Oe(xe,Z);I.add(ee);const re=new Ne,ne=()=>{var R;const t=A.clientWidth||1,o=A.clientHeight||1;r.setSize(t,o,!1),f.uResolution.value.set(r.domElement.width,r.domElement.height),(R=d.current)!=null&&R.composer&&d.current.composer.setSize(r.domElement.width,r.domElement.height),f.uPixelSize.value=i*r.getPixelRatio()};ne();const te=new ResizeObserver(ne);te.observe(A);const ie=(()=>{var t;if(typeof window<"u"&&((t=window.crypto)!=null&&t.getRandomValues)){const o=new Uint32Array(1);return window.crypto.getRandomValues(o),o[0]/4294967295}return Math.random()})()*1e3;let u,_,O;if(q){_=Ge(),_.radiusScale=M,u=new ce(r);const t=new fe(I,H);O=Ve(_.texture,{strength:k,freq:E});const o=new ue(H,O);o.renderToScreen=!0,u.addPass(t),u.addPass(o)}if(T>0){u||(u=new ce(r),u.addPass(new fe(I,H)));const t=new de("NoiseEffect","uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} ",{uniforms:new Map([["uTime",new D(0)],["uAmount",new D(T)]])}),o=new ue(H,t);o.renderToScreen=!0,u&&u.passes.length>0&&u.passes.forEach(R=>R.renderToScreen=!1),u.addPass(o)}u&&u.setSize(r.domElement.width,r.domElement.height);const oe=t=>{const o=r.domElement.getBoundingClientRect(),R=r.domElement.width/o.width,P=r.domElement.height/o.height,z=(t.clientX-o.left)*R,Se=(o.height-(t.clientY-o.top))*P;return{fx:z,fy:Se,w:r.domElement.width,h:r.domElement.height}},he=t=>{var z;const{fx:o,fy:R}=oe(t),P=((z=d.current)==null?void 0:z.clickIx)??0;f.uClickPos.value[P].set(o,R),f.uClickTimes.value[P]=f.uTime.value,d.current&&(d.current.clickIx=(P+1)%X)},Re=t=>{if(!_)return;const{fx:o,fy:R,w:P,h:z}=oe(t);_.addTouch({x:o/P,y:R/z})};r.domElement.addEventListener("pointerdown",he,{passive:!0}),r.domElement.addEventListener("pointermove",Re,{passive:!0});let U=0;const V=()=>{if(g&&!me.current.visible){U=requestAnimationFrame(V);return}f.uTime.value=ie+re.getElapsedTime()*W.current,O&&(O.uniforms.get("uTime").value=f.uTime.value),u?(_&&_.update(),u.passes.forEach(t=>{const o=t.effects;o&&o.forEach(R=>{var z;const P=(z=R.uniforms)==null?void 0:z.get("uTime");P&&(P.value=f.uTime.value)})}),u.render()):r.render(I,H),U=requestAnimationFrame(V)};U=requestAnimationFrame(V),d.current={renderer:r,scene:I,camera:H,material:Z,clock:re,clickIx:0,uniforms:f,resizeObserver:te,raf:U,quad:ee,timeOffset:ie,composer:u,touch:_,liquidEffect:O}}else{const e=d.current;if(e.uniforms.uShapeType.value=pe[b]??0,e.uniforms.uPixelSize.value=i*e.renderer.getPixelRatio(),e.uniforms.uColor.value.set(l),e.uniforms.uScale.value=m,e.uniforms.uDensity.value=C,e.uniforms.uPixelJitter.value=L,e.uniforms.uEnableRipples.value=F?1:0,e.uniforms.uRippleIntensity.value=n,e.uniforms.uRippleThickness.value=s,e.uniforms.uRippleSpeed.value=c,e.uniforms.uEdgeFade.value=h,x?e.renderer.setClearAlpha(0):e.renderer.setClearColor(0,1),e.liquidEffect){const r=e.liquidEffect;r&&(r.value=k);const f=e.liquidEffect.uniforms.get("uFreq");f&&(f.value=E)}e.touch&&(e.touch.radiusScale=M)}return G.current=J,()=>{var r,f,I;if(d.current&&N||!d.current)return;const e=d.current;(r=e.resizeObserver)==null||r.disconnect(),cancelAnimationFrame(e.raf),(f=e.quad)==null||f.geometry.dispose(),e.material.dispose(),(I=e.composer)==null||I.dispose(),e.renderer.dispose(),e.renderer.domElement.parentElement===A&&A.removeChild(e.renderer.domElement),d.current=null}},[y,q,T,i,m,C,F,n,s,c,L,h,x,k,M,E,g,b,l,v]),a.jsx("div",{ref:K,className:`pixel-blast-container ${w??""}`,style:S,"aria-label":"PixelBlast interactive background"})},je=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import { EffectComposer, EffectPass, RenderPass, Effect } from 'postprocessing';\r
import './PixelBlast.css';\r
\r
const createTouchTexture = () => {\r
  const size = 64;\r
  const canvas = document.createElement('canvas');\r
  canvas.width = size;\r
  canvas.height = size;\r
  const ctx = canvas.getContext('2d');\r
  if (!ctx) throw new Error('2D context not available');\r
  ctx.fillStyle = 'black';\r
  ctx.fillRect(0, 0, canvas.width, canvas.height);\r
  const texture = new THREE.Texture(canvas);\r
  texture.minFilter = THREE.LinearFilter;\r
  texture.magFilter = THREE.LinearFilter;\r
  texture.generateMipmaps = false;\r
  const trail = [];\r
  let last = null;\r
  const maxAge = 64;\r
  let radius = 0.1 * size;\r
  const speed = 1 / maxAge;\r
  const clear = () => {\r
    ctx.fillStyle = 'black';\r
    ctx.fillRect(0, 0, canvas.width, canvas.height);\r
  };\r
  const drawPoint = p => {\r
    const pos = { x: p.x * size, y: (1 - p.y) * size };\r
    let intensity = 1;\r
    const easeOutSine = t => Math.sin((t * Math.PI) / 2);\r
    const easeOutQuad = t => -t * (t - 2);\r
    if (p.age < maxAge * 0.3) intensity = easeOutSine(p.age / (maxAge * 0.3));\r
    else intensity = easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;\r
    intensity *= p.force;\r
    const color = \`\${((p.vx + 1) / 2) * 255}, \${((p.vy + 1) / 2) * 255}, \${intensity * 255}\`;\r
    const offset = size * 5;\r
    ctx.shadowOffsetX = offset;\r
    ctx.shadowOffsetY = offset;\r
    ctx.shadowBlur = radius;\r
    ctx.shadowColor = \`rgba(\${color},\${0.22 * intensity})\`;\r
    ctx.beginPath();\r
    ctx.fillStyle = 'rgba(255,0,0,1)';\r
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);\r
    ctx.fill();\r
  };\r
  const addTouch = norm => {\r
    let force = 0;\r
    let vx = 0;\r
    let vy = 0;\r
    if (last) {\r
      const dx = norm.x - last.x;\r
      const dy = norm.y - last.y;\r
      if (dx === 0 && dy === 0) return;\r
      const dd = dx * dx + dy * dy;\r
      const d = Math.sqrt(dd);\r
      vx = dx / (d || 1);\r
      vy = dy / (d || 1);\r
      force = Math.min(dd * 10000, 1);\r
    }\r
    last = { x: norm.x, y: norm.y };\r
    trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });\r
  };\r
  const update = () => {\r
    clear();\r
    for (let i = trail.length - 1; i >= 0; i--) {\r
      const point = trail[i];\r
      const f = point.force * speed * (1 - point.age / maxAge);\r
      point.x += point.vx * f;\r
      point.y += point.vy * f;\r
      point.age++;\r
      if (point.age > maxAge) trail.splice(i, 1);\r
    }\r
    for (let i = 0; i < trail.length; i++) drawPoint(trail[i]);\r
    texture.needsUpdate = true;\r
  };\r
  return {\r
    canvas,\r
    texture,\r
    addTouch,\r
    update,\r
    set radiusScale(v) {\r
      radius = 0.1 * size * v;\r
    },\r
    get radiusScale() {\r
      return radius / (0.1 * size);\r
    },\r
    size\r
  };\r
};\r
\r
const createLiquidEffect = (texture, opts) => {\r
  const fragment = \`\r
    uniform sampler2D uTexture;\r
    uniform float uStrength;\r
    uniform float uTime;\r
    uniform float uFreq;\r
\r
    void mainUv(inout vec2 uv) {\r
      vec4 tex = texture2D(uTexture, uv);\r
      float vx = tex.r * 2.0 - 1.0;\r
      float vy = tex.g * 2.0 - 1.0;\r
      float intensity = tex.b;\r
\r
      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);\r
\r
      float amt = uStrength * intensity * wave;\r
\r
      uv += vec2(vx, vy) * amt;\r
    }\r
    \`;\r
  return new Effect('LiquidEffect', fragment, {\r
    uniforms: new Map([\r
      ['uTexture', new THREE.Uniform(texture)],\r
      ['uStrength', new THREE.Uniform(opts?.strength ?? 0.025)],\r
      ['uTime', new THREE.Uniform(0)],\r
      ['uFreq', new THREE.Uniform(opts?.freq ?? 4.5)]\r
    ])\r
  });\r
};\r
\r
const SHAPE_MAP = {\r
  square: 0,\r
  circle: 1,\r
  triangle: 2,\r
  diamond: 3\r
};\r
\r
const VERTEX_SRC = \`\r
void main() {\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
const FRAGMENT_SRC = \`\r
precision highp float;\r
\r
uniform vec3  uColor;\r
uniform vec2  uResolution;\r
uniform float uTime;\r
uniform float uPixelSize;\r
uniform float uScale;\r
uniform float uDensity;\r
uniform float uPixelJitter;\r
uniform int   uEnableRipples;\r
uniform float uRippleSpeed;\r
uniform float uRippleThickness;\r
uniform float uRippleIntensity;\r
uniform float uEdgeFade;\r
\r
uniform int   uShapeType;\r
const int SHAPE_SQUARE   = 0;\r
const int SHAPE_CIRCLE   = 1;\r
const int SHAPE_TRIANGLE = 2;\r
const int SHAPE_DIAMOND  = 3;\r
\r
const int   MAX_CLICKS = 10;\r
\r
uniform vec2  uClickPos  [MAX_CLICKS];\r
uniform float uClickTimes[MAX_CLICKS];\r
\r
out vec4 fragColor;\r
\r
float Bayer2(vec2 a) {\r
  a = floor(a);\r
  return fract(a.x / 2. + a.y * a.y * .75);\r
}\r
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))\r
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))\r
\r
#define FBM_OCTAVES     5\r
#define FBM_LACUNARITY  1.25\r
#define FBM_GAIN        1.0\r
\r
float hash11(float n){ return fract(sin(n)*43758.5453); }\r
\r
float vnoise(vec3 p){\r
  vec3 ip = floor(p);\r
  vec3 fp = fract(p);\r
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);\r
  float x00 = mix(n000, n100, w.x);\r
  float x10 = mix(n010, n110, w.x);\r
  float x01 = mix(n001, n101, w.x);\r
  float x11 = mix(n011, n111, w.x);\r
  float y0  = mix(x00, x10, w.y);\r
  float y1  = mix(x01, x11, w.y);\r
  return mix(y0, y1, w.z) * 2.0 - 1.0;\r
}\r
\r
float fbm2(vec2 uv, float t){\r
  vec3 p = vec3(uv * uScale, t);\r
  float amp = 1.0;\r
  float freq = 1.0;\r
  float sum = 1.0;\r
  for (int i = 0; i < FBM_OCTAVES; ++i){\r
    sum  += amp * vnoise(p * freq);\r
    freq *= FBM_LACUNARITY;\r
    amp  *= FBM_GAIN;\r
  }\r
  return sum * 0.5 + 0.5;\r
}\r
\r
float maskCircle(vec2 p, float cov){\r
  float r = sqrt(cov) * .25;\r
  float d = length(p - 0.5) - r;\r
  float aa = 0.5 * fwidth(d);\r
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));\r
}\r
\r
float maskTriangle(vec2 p, vec2 id, float cov){\r
  bool flip = mod(id.x + id.y, 2.0) > 0.5;\r
  if (flip) p.x = 1.0 - p.x;\r
  float r = sqrt(cov);\r
  float d  = p.y - r*(1.0 - p.x);\r
  float aa = fwidth(d);\r
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);\r
}\r
\r
float maskDiamond(vec2 p, float cov){\r
  float r = sqrt(cov) * 0.564;\r
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);\r
}\r
\r
void main(){\r
  float pixelSize = uPixelSize;\r
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;\r
  float aspectRatio = uResolution.x / uResolution.y;\r
\r
  vec2 pixelId = floor(fragCoord / pixelSize);\r
  vec2 pixelUV = fract(fragCoord / pixelSize);\r
\r
  float cellPixelSize = 8.0 * pixelSize;\r
  vec2 cellId = floor(fragCoord / cellPixelSize);\r
  vec2 cellCoord = cellId * cellPixelSize;\r
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);\r
\r
  float base = fbm2(uv, uTime * 0.05);\r
  base = base * 0.5 - 0.65;\r
\r
  float feed = base + (uDensity - 0.5) * 0.3;\r
\r
  float speed     = uRippleSpeed;\r
  float thickness = uRippleThickness;\r
  const float dampT     = 1.0;\r
  const float dampR     = 10.0;\r
\r
  if (uEnableRipples == 1) {\r
    for (int i = 0; i < MAX_CLICKS; ++i){\r
      vec2 pos = uClickPos[i];\r
      if (pos.x < 0.0) continue;\r
      float cellPixelSize = 8.0 * pixelSize;\r
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);\r
      float t = max(uTime - uClickTimes[i], 0.0);\r
      float r = distance(uv, cuv);\r
      float waveR = speed * t;\r
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));\r
      float atten = exp(-dampT * t) * exp(-dampR * r);\r
      feed = max(feed, ring * atten * uRippleIntensity);\r
    }\r
  }\r
\r
  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;\r
  float bw = step(0.5, feed + bayer);\r
\r
  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);\r
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;\r
  float coverage = bw * jitterScale;\r
  float M;\r
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);\r
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);\r
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);\r
  else                                   M = coverage;\r
\r
  if (uEdgeFade > 0.0) {\r
    vec2 norm = gl_FragCoord.xy / uResolution;\r
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));\r
    float fade = smoothstep(0.0, uEdgeFade, edge);\r
    M *= fade;\r
  }\r
\r
  vec3 color = uColor;\r
  fragColor = vec4(color, M);\r
}\r
\`;\r
\r
const FRAGMENT_SRC_GLSL1 = \`\r
#extension GL_OES_standard_derivatives : enable\r
precision highp float;\r
\r
uniform vec3  uColor;\r
uniform vec2  uResolution;\r
uniform float uTime;\r
uniform float uPixelSize;\r
uniform float uScale;\r
uniform float uDensity;\r
uniform float uPixelJitter;\r
uniform int   uEnableRipples;\r
uniform float uRippleSpeed;\r
uniform float uRippleThickness;\r
uniform float uRippleIntensity;\r
uniform float uEdgeFade;\r
\r
uniform int   uShapeType;\r
const int SHAPE_SQUARE   = 0;\r
const int SHAPE_CIRCLE   = 1;\r
const int SHAPE_TRIANGLE = 2;\r
const int SHAPE_DIAMOND  = 3;\r
\r
const int   MAX_CLICKS = 10;\r
\r
uniform vec2  uClickPos  [MAX_CLICKS];\r
uniform float uClickTimes[MAX_CLICKS];\r
\r
float Bayer2(vec2 a) {\r
  a = floor(a);\r
  return fract(a.x / 2. + a.y * a.y * .75);\r
}\r
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))\r
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))\r
\r
#define FBM_OCTAVES     5\r
#define FBM_LACUNARITY  1.25\r
#define FBM_GAIN        1.0\r
\r
float hash11(float n){ return fract(sin(n)*43758.5453); }\r
\r
float vnoise(vec3 p){\r
  vec3 ip = floor(p);\r
  vec3 fp = fract(p);\r
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);\r
  float x00 = mix(n000, n100, w.x);\r
  float x10 = mix(n010, n110, w.x);\r
  float x01 = mix(n001, n101, w.x);\r
  float x11 = mix(n011, n111, w.x);\r
  float y0  = mix(x00, x10, w.y);\r
  float y1  = mix(x01, x11, w.y);\r
  return mix(y0, y1, w.z) * 2.0 - 1.0;\r
}\r
\r
float fbm2(vec2 uv, float t){\r
  vec3 p = vec3(uv * uScale, t);\r
  float amp = 1.0;\r
  float freq = 1.0;\r
  float sum = 1.0;\r
  for (int i = 0; i < FBM_OCTAVES; ++i){\r
    sum  += amp * vnoise(p * freq);\r
    freq *= FBM_LACUNARITY;\r
    amp  *= FBM_GAIN;\r
  }\r
  return sum * 0.5 + 0.5;\r
}\r
\r
float maskCircle(vec2 p, float cov){\r
  float r = sqrt(cov) * .25;\r
  float d = length(p - 0.5) - r;\r
  float aa = 0.5 * fwidth(d);\r
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));\r
}\r
\r
float maskTriangle(vec2 p, vec2 id, float cov){\r
  bool flip = mod(id.x + id.y, 2.0) > 0.5;\r
  if (flip) p.x = 1.0 - p.x;\r
  float r = sqrt(cov);\r
  float d  = p.y - r*(1.0 - p.x);\r
  float aa = fwidth(d);\r
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);\r
}\r
\r
float maskDiamond(vec2 p, float cov){\r
  float r = sqrt(cov) * 0.564;\r
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);\r
}\r
\r
void main(){\r
  float pixelSize = uPixelSize;\r
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;\r
  float aspectRatio = uResolution.x / uResolution.y;\r
\r
  vec2 pixelId = floor(fragCoord / pixelSize);\r
  vec2 pixelUV = fract(fragCoord / pixelSize);\r
\r
  float cellPixelSize = 8.0 * pixelSize;\r
  vec2 cellId = floor(fragCoord / cellPixelSize);\r
  vec2 cellCoord = cellId * cellPixelSize;\r
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);\r
\r
  float base = fbm2(uv, uTime * 0.05);\r
  base = base * 0.5 - 0.65;\r
\r
  float feed = base + (uDensity - 0.5) * 0.3;\r
\r
  float speed     = uRippleSpeed;\r
  float thickness = uRippleThickness;\r
  const float dampT     = 1.0;\r
  const float dampR     = 10.0;\r
\r
  if (uEnableRipples == 1) {\r
    for (int i = 0; i < MAX_CLICKS; ++i){\r
      vec2 pos = uClickPos[i];\r
      if (pos.x < 0.0) continue;\r
      float cellPixelSize = 8.0 * pixelSize;\r
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);\r
      float t = max(uTime - uClickTimes[i], 0.0);\r
      float r = distance(uv, cuv);\r
      float waveR = speed * t;\r
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));\r
      float atten = exp(-dampT * t) * exp(-dampR * r);\r
      feed = max(feed, ring * atten * uRippleIntensity);\r
    }\r
  }\r
\r
  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;\r
  float bw = step(0.5, feed + bayer);\r
\r
  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);\r
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;\r
  float coverage = bw * jitterScale;\r
  float M;\r
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);\r
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);\r
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);\r
  else                                   M = coverage;\r
\r
  if (uEdgeFade > 0.0) {\r
    vec2 norm = gl_FragCoord.xy / uResolution;\r
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));\r
    float fade = smoothstep(0.0, uEdgeFade, edge);\r
    M *= fade;\r
  }\r
\r
  vec3 color = uColor;\r
  gl_FragColor = vec4(color, M);\r
}\r
\`;\r
\r
const MAX_CLICKS = 10;\r
\r
const PixelBlast = ({\r
  variant = 'square',\r
  pixelSize = 3,\r
  color = '#B19EEF',\r
  className,\r
  style,\r
  antialias = true,\r
  patternScale = 2,\r
  patternDensity = 1,\r
  liquid = false,\r
  liquidStrength = 0.1,\r
  liquidRadius = 1,\r
  pixelSizeJitter = 0,\r
  enableRipples = true,\r
  rippleIntensityScale = 1,\r
  rippleThickness = 0.1,\r
  rippleSpeed = 0.3,\r
  liquidWobbleSpeed = 4.5,\r
  autoPauseOffscreen = true,\r
  speed = 0.5,\r
  transparent = true,\r
  edgeFade = 0.5,\r
  noiseAmount = 0\r
}) => {\r
  const containerRef = useRef(null);\r
  const visibilityRef = useRef({ visible: true });\r
  const speedRef = useRef(speed);\r
\r
  const threeRef = useRef(null);\r
  const prevConfigRef = useRef(null);\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    speedRef.current = speed;\r
    const needsReinitKeys = ['antialias', 'liquid', 'noiseAmount'];\r
    const cfg = { antialias, liquid, noiseAmount };\r
    let mustReinit = false;\r
    if (!threeRef.current) mustReinit = true;\r
    else if (prevConfigRef.current) {\r
      for (const k of needsReinitKeys)\r
        if (prevConfigRef.current[k] !== cfg[k]) {\r
          mustReinit = true;\r
          break;\r
        }\r
    }\r
    if (mustReinit) {\r
      if (threeRef.current) {\r
        const t = threeRef.current;\r
        t.resizeObserver?.disconnect();\r
        cancelAnimationFrame(t.raf);\r
        t.quad?.geometry.dispose();\r
        t.material.dispose();\r
        t.composer?.dispose();\r
        t.renderer.dispose();\r
        if (t.renderer.domElement.parentElement === container) container.removeChild(t.renderer.domElement);\r
        threeRef.current = null;\r
      }\r
      const canvas = document.createElement('canvas');\r
      const renderer = new THREE.WebGLRenderer({\r
        canvas,\r
        antialias,\r
        alpha: true,\r
        powerPreference: 'high-performance'\r
      });\r
      renderer.domElement.style.width = '100%';\r
      renderer.domElement.style.height = '100%';\r
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r
      container.appendChild(renderer.domElement);\r
      if (transparent) renderer.setClearAlpha(0);\r
      else renderer.setClearColor(0x000000, 1);\r
      const uniforms = {\r
        uResolution: { value: new THREE.Vector2(0, 0) },\r
        uTime: { value: 0 },\r
        uColor: { value: new THREE.Color(color) },\r
        uClickPos: {\r
          value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1))\r
        },\r
        uClickTimes: { value: new Float32Array(MAX_CLICKS) },\r
        uShapeType: { value: SHAPE_MAP[variant] ?? 0 },\r
        uPixelSize: { value: pixelSize * renderer.getPixelRatio() },\r
        uScale: { value: patternScale },\r
        uDensity: { value: patternDensity },\r
        uPixelJitter: { value: pixelSizeJitter },\r
        uEnableRipples: { value: enableRipples ? 1 : 0 },\r
        uRippleSpeed: { value: rippleSpeed },\r
        uRippleThickness: { value: rippleThickness },\r
        uRippleIntensity: { value: rippleIntensityScale },\r
        uEdgeFade: { value: edgeFade }\r
      };\r
      const scene = new THREE.Scene();\r
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
      const isWebGL2 = renderer.capabilities.isWebGL2;\r
      const material = new THREE.ShaderMaterial({\r
        vertexShader: VERTEX_SRC,\r
        fragmentShader: isWebGL2 ? FRAGMENT_SRC : FRAGMENT_SRC_GLSL1,\r
        uniforms,\r
        transparent: true,\r
        depthTest: false,\r
        depthWrite: false,\r
        glslVersion: isWebGL2 ? THREE.GLSL3 : undefined\r
      });\r
      const quadGeom = new THREE.PlaneGeometry(2, 2);\r
      const quad = new THREE.Mesh(quadGeom, material);\r
      scene.add(quad);\r
      const clock = new THREE.Clock();\r
      const setSize = () => {\r
        const w = container.clientWidth || 1;\r
        const h = container.clientHeight || 1;\r
        renderer.setSize(w, h, false);\r
        uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);\r
        if (threeRef.current?.composer)\r
          threeRef.current.composer.setSize(renderer.domElement.width, renderer.domElement.height);\r
        uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();\r
      };\r
      setSize();\r
      const ro = new ResizeObserver(setSize);\r
      ro.observe(container);\r
      const randomFloat = () => {\r
        if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {\r
          const u32 = new Uint32Array(1);\r
          window.crypto.getRandomValues(u32);\r
          return u32[0] / 0xffffffff;\r
        }\r
        return Math.random();\r
      };\r
      const timeOffset = randomFloat() * 1000;\r
      let composer;\r
      let touch;\r
      let liquidEffect;\r
      if (liquid) {\r
        touch = createTouchTexture();\r
        touch.radiusScale = liquidRadius;\r
        composer = new EffectComposer(renderer);\r
        const renderPass = new RenderPass(scene, camera);\r
        liquidEffect = createLiquidEffect(touch.texture, {\r
          strength: liquidStrength,\r
          freq: liquidWobbleSpeed\r
        });\r
        const effectPass = new EffectPass(camera, liquidEffect);\r
        effectPass.renderToScreen = true;\r
        composer.addPass(renderPass);\r
        composer.addPass(effectPass);\r
      }\r
      if (noiseAmount > 0) {\r
        if (!composer) {\r
          composer = new EffectComposer(renderer);\r
          composer.addPass(new RenderPass(scene, camera));\r
        }\r
        const noiseEffect = new Effect(\r
          'NoiseEffect',\r
          \`uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} \`,\r
          {\r
            uniforms: new Map([\r
              ['uTime', new THREE.Uniform(0)],\r
              ['uAmount', new THREE.Uniform(noiseAmount)]\r
            ])\r
          }\r
        );\r
        const noisePass = new EffectPass(camera, noiseEffect);\r
        noisePass.renderToScreen = true;\r
        if (composer && composer.passes.length > 0) composer.passes.forEach(p => (p.renderToScreen = false));\r
        composer.addPass(noisePass);\r
      }\r
      if (composer) composer.setSize(renderer.domElement.width, renderer.domElement.height);\r
      const mapToPixels = e => {\r
        const rect = renderer.domElement.getBoundingClientRect();\r
        const scaleX = renderer.domElement.width / rect.width;\r
        const scaleY = renderer.domElement.height / rect.height;\r
        const fx = (e.clientX - rect.left) * scaleX;\r
        const fy = (rect.height - (e.clientY - rect.top)) * scaleY;\r
        return {\r
          fx,\r
          fy,\r
          w: renderer.domElement.width,\r
          h: renderer.domElement.height\r
        };\r
      };\r
      const onPointerDown = e => {\r
        const { fx, fy } = mapToPixels(e);\r
        const ix = threeRef.current?.clickIx ?? 0;\r
        uniforms.uClickPos.value[ix].set(fx, fy);\r
        uniforms.uClickTimes.value[ix] = uniforms.uTime.value;\r
        if (threeRef.current) threeRef.current.clickIx = (ix + 1) % MAX_CLICKS;\r
      };\r
      const onPointerMove = e => {\r
        if (!touch) return;\r
        const { fx, fy, w, h } = mapToPixels(e);\r
        touch.addTouch({ x: fx / w, y: fy / h });\r
      };\r
      renderer.domElement.addEventListener('pointerdown', onPointerDown, {\r
        passive: true\r
      });\r
      renderer.domElement.addEventListener('pointermove', onPointerMove, {\r
        passive: true\r
      });\r
      let raf = 0;\r
      const animate = () => {\r
        if (autoPauseOffscreen && !visibilityRef.current.visible) {\r
          raf = requestAnimationFrame(animate);\r
          return;\r
        }\r
        uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speedRef.current;\r
        if (liquidEffect) liquidEffect.uniforms.get('uTime').value = uniforms.uTime.value;\r
        if (composer) {\r
          if (touch) touch.update();\r
          composer.passes.forEach(p => {\r
            const effs = p.effects;\r
            if (effs)\r
              effs.forEach(eff => {\r
                const u = eff.uniforms?.get('uTime');\r
                if (u) u.value = uniforms.uTime.value;\r
              });\r
          });\r
          composer.render();\r
        } else renderer.render(scene, camera);\r
        raf = requestAnimationFrame(animate);\r
      };\r
      raf = requestAnimationFrame(animate);\r
      threeRef.current = {\r
        renderer,\r
        scene,\r
        camera,\r
        material,\r
        clock,\r
        clickIx: 0,\r
        uniforms,\r
        resizeObserver: ro,\r
        raf,\r
        quad,\r
        timeOffset,\r
        composer,\r
        touch,\r
        liquidEffect\r
      };\r
    } else {\r
      const t = threeRef.current;\r
      t.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0;\r
      t.uniforms.uPixelSize.value = pixelSize * t.renderer.getPixelRatio();\r
      t.uniforms.uColor.value.set(color);\r
      t.uniforms.uScale.value = patternScale;\r
      t.uniforms.uDensity.value = patternDensity;\r
      t.uniforms.uPixelJitter.value = pixelSizeJitter;\r
      t.uniforms.uEnableRipples.value = enableRipples ? 1 : 0;\r
      t.uniforms.uRippleIntensity.value = rippleIntensityScale;\r
      t.uniforms.uRippleThickness.value = rippleThickness;\r
      t.uniforms.uRippleSpeed.value = rippleSpeed;\r
      t.uniforms.uEdgeFade.value = edgeFade;\r
      if (transparent) t.renderer.setClearAlpha(0);\r
      else t.renderer.setClearColor(0x000000, 1);\r
      if (t.liquidEffect) {\r
        const uStrength = t.liquidEffect;\r
        if (uStrength) uStrength.value = liquidStrength;\r
        const uFreq = t.liquidEffect.uniforms.get('uFreq');\r
        if (uFreq) uFreq.value = liquidWobbleSpeed;\r
      }\r
      if (t.touch) t.touch.radiusScale = liquidRadius;\r
    }\r
    prevConfigRef.current = cfg;\r
    return () => {\r
      if (threeRef.current && mustReinit) return;\r
      if (!threeRef.current) return;\r
      const t = threeRef.current;\r
      t.resizeObserver?.disconnect();\r
      cancelAnimationFrame(t.raf);\r
      t.quad?.geometry.dispose();\r
      t.material.dispose();\r
      t.composer?.dispose();\r
      t.renderer.dispose();\r
      if (t.renderer.domElement.parentElement === container) container.removeChild(t.renderer.domElement);\r
      threeRef.current = null;\r
    };\r
  }, [\r
    antialias,\r
    liquid,\r
    noiseAmount,\r
    pixelSize,\r
    patternScale,\r
    patternDensity,\r
    enableRipples,\r
    rippleIntensityScale,\r
    rippleThickness,\r
    rippleSpeed,\r
    pixelSizeJitter,\r
    edgeFade,\r
    transparent,\r
    liquidStrength,\r
    liquidRadius,\r
    liquidWobbleSpeed,\r
    autoPauseOffscreen,\r
    variant,\r
    color,\r
    speed\r
  ]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`pixel-blast-container \${className ?? ''}\`}\r
      style={style}\r
      aria-label="PixelBlast interactive background"\r
    />\r
  );\r
};\r
\r
export default PixelBlast;\r
`,Ye=`.pixel-blast-container {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
  overflow: hidden;\r
}\r
`,$e=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import { EffectComposer, EffectPass, RenderPass, Effect } from 'postprocessing';\r
\r
const createTouchTexture = () => {\r
  const size = 64;\r
  const canvas = document.createElement('canvas');\r
  canvas.width = size;\r
  canvas.height = size;\r
  const ctx = canvas.getContext('2d');\r
  if (!ctx) throw new Error('2D context not available');\r
  ctx.fillStyle = 'black';\r
  ctx.fillRect(0, 0, canvas.width, canvas.height);\r
  const texture = new THREE.Texture(canvas);\r
  texture.minFilter = THREE.LinearFilter;\r
  texture.magFilter = THREE.LinearFilter;\r
  texture.generateMipmaps = false;\r
  const trail = [];\r
  let last = null;\r
  const maxAge = 64;\r
  let radius = 0.1 * size;\r
  const speed = 1 / maxAge;\r
  const clear = () => {\r
    ctx.fillStyle = 'black';\r
    ctx.fillRect(0, 0, canvas.width, canvas.height);\r
  };\r
  const drawPoint = p => {\r
    const pos = { x: p.x * size, y: (1 - p.y) * size };\r
    let intensity = 1;\r
    const easeOutSine = t => Math.sin((t * Math.PI) / 2);\r
    const easeOutQuad = t => -t * (t - 2);\r
    if (p.age < maxAge * 0.3) intensity = easeOutSine(p.age / (maxAge * 0.3));\r
    else intensity = easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;\r
    intensity *= p.force;\r
    const color = \`\${((p.vx + 1) / 2) * 255}, \${((p.vy + 1) / 2) * 255}, \${intensity * 255}\`;\r
    const offset = size * 5;\r
    ctx.shadowOffsetX = offset;\r
    ctx.shadowOffsetY = offset;\r
    ctx.shadowBlur = radius;\r
    ctx.shadowColor = \`rgba(\${color},\${0.22 * intensity})\`;\r
    ctx.beginPath();\r
    ctx.fillStyle = 'rgba(255,0,0,1)';\r
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);\r
    ctx.fill();\r
  };\r
  const addTouch = norm => {\r
    let force = 0;\r
    let vx = 0;\r
    let vy = 0;\r
    if (last) {\r
      const dx = norm.x - last.x;\r
      const dy = norm.y - last.y;\r
      if (dx === 0 && dy === 0) return;\r
      const dd = dx * dx + dy * dy;\r
      const d = Math.sqrt(dd);\r
      vx = dx / (d || 1);\r
      vy = dy / (d || 1);\r
      force = Math.min(dd * 10000, 1);\r
    }\r
    last = { x: norm.x, y: norm.y };\r
    trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });\r
  };\r
  const update = () => {\r
    clear();\r
    for (let i = trail.length - 1; i >= 0; i--) {\r
      const point = trail[i];\r
      const f = point.force * speed * (1 - point.age / maxAge);\r
      point.x += point.vx * f;\r
      point.y += point.vy * f;\r
      point.age++;\r
      if (point.age > maxAge) trail.splice(i, 1);\r
    }\r
    for (let i = 0; i < trail.length; i++) drawPoint(trail[i]);\r
    texture.needsUpdate = true;\r
  };\r
  return {\r
    canvas,\r
    texture,\r
    addTouch,\r
    update,\r
    set radiusScale(v) {\r
      radius = 0.1 * size * v;\r
    },\r
    get radiusScale() {\r
      return radius / (0.1 * size);\r
    },\r
    size\r
  };\r
};\r
\r
const createLiquidEffect = (texture, opts) => {\r
  const fragment = \`\r
    uniform sampler2D uTexture;\r
    uniform float uStrength;\r
    uniform float uTime;\r
    uniform float uFreq;\r
\r
    void mainUv(inout vec2 uv) {\r
      vec4 tex = texture2D(uTexture, uv);\r
      float vx = tex.r * 2.0 - 1.0;\r
      float vy = tex.g * 2.0 - 1.0;\r
      float intensity = tex.b;\r
\r
      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);\r
\r
      float amt = uStrength * intensity * wave;\r
\r
      uv += vec2(vx, vy) * amt;\r
    }\r
    \`;\r
  return new Effect('LiquidEffect', fragment, {\r
    uniforms: new Map([\r
      ['uTexture', new THREE.Uniform(texture)],\r
      ['uStrength', new THREE.Uniform(opts?.strength ?? 0.025)],\r
      ['uTime', new THREE.Uniform(0)],\r
      ['uFreq', new THREE.Uniform(opts?.freq ?? 4.5)]\r
    ])\r
  });\r
};\r
\r
const SHAPE_MAP = {\r
  square: 0,\r
  circle: 1,\r
  triangle: 2,\r
  diamond: 3\r
};\r
\r
const VERTEX_SRC = \`\r
void main() {\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
const FRAGMENT_SRC = \`\r
precision highp float;\r
\r
uniform vec3  uColor;\r
uniform vec2  uResolution;\r
uniform float uTime;\r
uniform float uPixelSize;\r
uniform float uScale;\r
uniform float uDensity;\r
uniform float uPixelJitter;\r
uniform int   uEnableRipples;\r
uniform float uRippleSpeed;\r
uniform float uRippleThickness;\r
uniform float uRippleIntensity;\r
uniform float uEdgeFade;\r
\r
uniform int   uShapeType;\r
const int SHAPE_SQUARE   = 0;\r
const int SHAPE_CIRCLE   = 1;\r
const int SHAPE_TRIANGLE = 2;\r
const int SHAPE_DIAMOND  = 3;\r
\r
const int   MAX_CLICKS = 10;\r
\r
uniform vec2  uClickPos  [MAX_CLICKS];\r
uniform float uClickTimes[MAX_CLICKS];\r
\r
out vec4 fragColor;\r
\r
float Bayer2(vec2 a) {\r
  a = floor(a);\r
  return fract(a.x / 2. + a.y * a.y * .75);\r
}\r
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))\r
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))\r
\r
#define FBM_OCTAVES     5\r
#define FBM_LACUNARITY  1.25\r
#define FBM_GAIN        1.0\r
\r
float hash11(float n){ return fract(sin(n)*43758.5453); }\r
\r
float vnoise(vec3 p){\r
  vec3 ip = floor(p);\r
  vec3 fp = fract(p);\r
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);\r
  float x00 = mix(n000, n100, w.x);\r
  float x10 = mix(n010, n110, w.x);\r
  float x01 = mix(n001, n101, w.x);\r
  float x11 = mix(n011, n111, w.x);\r
  float y0  = mix(x00, x10, w.y);\r
  float y1  = mix(x01, x11, w.y);\r
  return mix(y0, y1, w.z) * 2.0 - 1.0;\r
}\r
\r
float fbm2(vec2 uv, float t){\r
  vec3 p = vec3(uv * uScale, t);\r
  float amp = 1.0;\r
  float freq = 1.0;\r
  float sum = 1.0;\r
  for (int i = 0; i < FBM_OCTAVES; ++i){\r
    sum  += amp * vnoise(p * freq);\r
    freq *= FBM_LACUNARITY;\r
    amp  *= FBM_GAIN;\r
  }\r
  return sum * 0.5 + 0.5;\r
}\r
\r
float maskCircle(vec2 p, float cov){\r
  float r = sqrt(cov) * .25;\r
  float d = length(p - 0.5) - r;\r
  float aa = 0.5 * fwidth(d);\r
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));\r
}\r
\r
float maskTriangle(vec2 p, vec2 id, float cov){\r
  bool flip = mod(id.x + id.y, 2.0) > 0.5;\r
  if (flip) p.x = 1.0 - p.x;\r
  float r = sqrt(cov);\r
  float d  = p.y - r*(1.0 - p.x);\r
  float aa = fwidth(d);\r
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);\r
}\r
\r
float maskDiamond(vec2 p, float cov){\r
  float r = sqrt(cov) * 0.564;\r
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);\r
}\r
\r
void main(){\r
  float pixelSize = uPixelSize;\r
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;\r
  float aspectRatio = uResolution.x / uResolution.y;\r
\r
  vec2 pixelId = floor(fragCoord / pixelSize);\r
  vec2 pixelUV = fract(fragCoord / pixelSize);\r
\r
  float cellPixelSize = 8.0 * pixelSize;\r
  vec2 cellId = floor(fragCoord / cellPixelSize);\r
  vec2 cellCoord = cellId * cellPixelSize;\r
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);\r
\r
  float base = fbm2(uv, uTime * 0.05);\r
  base = base * 0.5 - 0.65;\r
\r
  float feed = base + (uDensity - 0.5) * 0.3;\r
\r
  float speed     = uRippleSpeed;\r
  float thickness = uRippleThickness;\r
  const float dampT     = 1.0;\r
  const float dampR     = 10.0;\r
\r
  if (uEnableRipples == 1) {\r
    for (int i = 0; i < MAX_CLICKS; ++i){\r
      vec2 pos = uClickPos[i];\r
      if (pos.x < 0.0) continue;\r
      float cellPixelSize = 8.0 * pixelSize;\r
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);\r
      float t = max(uTime - uClickTimes[i], 0.0);\r
      float r = distance(uv, cuv);\r
      float waveR = speed * t;\r
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));\r
      float atten = exp(-dampT * t) * exp(-dampR * r);\r
      feed = max(feed, ring * atten * uRippleIntensity);\r
    }\r
  }\r
\r
  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;\r
  float bw = step(0.5, feed + bayer);\r
\r
  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);\r
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;\r
  float coverage = bw * jitterScale;\r
  float M;\r
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);\r
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);\r
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);\r
  else                                   M = coverage;\r
\r
  if (uEdgeFade > 0.0) {\r
    vec2 norm = gl_FragCoord.xy / uResolution;\r
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));\r
    float fade = smoothstep(0.0, uEdgeFade, edge);\r
    M *= fade;\r
  }\r
\r
  vec3 color = uColor;\r
  fragColor = vec4(color, M);\r
}\r
\`;\r
\r
const FRAGMENT_SRC_GLSL1 = \`\r
#extension GL_OES_standard_derivatives : enable\r
precision highp float;\r
\r
uniform vec3  uColor;\r
uniform vec2  uResolution;\r
uniform float uTime;\r
uniform float uPixelSize;\r
uniform float uScale;\r
uniform float uDensity;\r
uniform float uPixelJitter;\r
uniform int   uEnableRipples;\r
uniform float uRippleSpeed;\r
uniform float uRippleThickness;\r
uniform float uRippleIntensity;\r
uniform float uEdgeFade;\r
\r
uniform int   uShapeType;\r
const int SHAPE_SQUARE   = 0;\r
const int SHAPE_CIRCLE   = 1;\r
const int SHAPE_TRIANGLE = 2;\r
const int SHAPE_DIAMOND  = 3;\r
\r
const int   MAX_CLICKS = 10;\r
\r
uniform vec2  uClickPos  [MAX_CLICKS];\r
uniform float uClickTimes[MAX_CLICKS];\r
\r
float Bayer2(vec2 a) {\r
  a = floor(a);\r
  return fract(a.x / 2. + a.y * a.y * .75);\r
}\r
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))\r
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))\r
\r
#define FBM_OCTAVES     5\r
#define FBM_LACUNARITY  1.25\r
#define FBM_GAIN        1.0\r
\r
float hash11(float n){ return fract(sin(n)*43758.5453); }\r
\r
float vnoise(vec3 p){\r
  vec3 ip = floor(p);\r
  vec3 fp = fract(p);\r
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);\r
  float x00 = mix(n000, n100, w.x);\r
  float x10 = mix(n010, n110, w.x);\r
  float x01 = mix(n001, n101, w.x);\r
  float x11 = mix(n011, n111, w.x);\r
  float y0  = mix(x00, x10, w.y);\r
  float y1  = mix(x01, x11, w.y);\r
  return mix(y0, y1, w.z) * 2.0 - 1.0;\r
}\r
\r
float fbm2(vec2 uv, float t){\r
  vec3 p = vec3(uv * uScale, t);\r
  float amp = 1.0;\r
  float freq = 1.0;\r
  float sum = 1.0;\r
  for (int i = 0; i < FBM_OCTAVES; ++i){\r
    sum  += amp * vnoise(p * freq);\r
    freq *= FBM_LACUNARITY;\r
    amp  *= FBM_GAIN;\r
  }\r
  return sum * 0.5 + 0.5;\r
}\r
\r
float maskCircle(vec2 p, float cov){\r
  float r = sqrt(cov) * .25;\r
  float d = length(p - 0.5) - r;\r
  float aa = 0.5 * fwidth(d);\r
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));\r
}\r
\r
float maskTriangle(vec2 p, vec2 id, float cov){\r
  bool flip = mod(id.x + id.y, 2.0) > 0.5;\r
  if (flip) p.x = 1.0 - p.x;\r
  float r = sqrt(cov);\r
  float d  = p.y - r*(1.0 - p.x);\r
  float aa = fwidth(d);\r
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);\r
}\r
\r
float maskDiamond(vec2 p, float cov){\r
  float r = sqrt(cov) * 0.564;\r
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);\r
}\r
\r
void main(){\r
  float pixelSize = uPixelSize;\r
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;\r
  float aspectRatio = uResolution.x / uResolution.y;\r
\r
  vec2 pixelId = floor(fragCoord / pixelSize);\r
  vec2 pixelUV = fract(fragCoord / pixelSize);\r
\r
  float cellPixelSize = 8.0 * pixelSize;\r
  vec2 cellId = floor(fragCoord / cellPixelSize);\r
  vec2 cellCoord = cellId * cellPixelSize;\r
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);\r
\r
  float base = fbm2(uv, uTime * 0.05);\r
  base = base * 0.5 - 0.65;\r
\r
  float feed = base + (uDensity - 0.5) * 0.3;\r
\r
  float speed     = uRippleSpeed;\r
  float thickness = uRippleThickness;\r
  const float dampT     = 1.0;\r
  const float dampR     = 10.0;\r
\r
  if (uEnableRipples == 1) {\r
    for (int i = 0; i < MAX_CLICKS; ++i){\r
      vec2 pos = uClickPos[i];\r
      if (pos.x < 0.0) continue;\r
      float cellPixelSize = 8.0 * pixelSize;\r
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);\r
      float t = max(uTime - uClickTimes[i], 0.0);\r
      float r = distance(uv, cuv);\r
      float waveR = speed * t;\r
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));\r
      float atten = exp(-dampT * t) * exp(-dampR * r);\r
      feed = max(feed, ring * atten * uRippleIntensity);\r
    }\r
  }\r
\r
  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;\r
  float bw = step(0.5, feed + bayer);\r
\r
  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);\r
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;\r
  float coverage = bw * jitterScale;\r
  float M;\r
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);\r
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);\r
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);\r
  else                                   M = coverage;\r
\r
  if (uEdgeFade > 0.0) {\r
    vec2 norm = gl_FragCoord.xy / uResolution;\r
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));\r
    float fade = smoothstep(0.0, uEdgeFade, edge);\r
    M *= fade;\r
  }\r
\r
  vec3 color = uColor;\r
  gl_FragColor = vec4(color, M);\r
}\r
\`;\r
\r
const MAX_CLICKS = 10;\r
\r
const PixelBlast = ({\r
  variant = 'square',\r
  pixelSize = 3,\r
  color = '#B19EEF',\r
  className,\r
  style,\r
  antialias = true,\r
  patternScale = 2,\r
  patternDensity = 1,\r
  liquid = false,\r
  liquidStrength = 0.1,\r
  liquidRadius = 1,\r
  pixelSizeJitter = 0,\r
  enableRipples = true,\r
  rippleIntensityScale = 1,\r
  rippleThickness = 0.1,\r
  rippleSpeed = 0.3,\r
  liquidWobbleSpeed = 4.5,\r
  autoPauseOffscreen = true,\r
  speed = 0.5,\r
  transparent = true,\r
  edgeFade = 0.5,\r
  noiseAmount = 0\r
}) => {\r
  const containerRef = useRef(null);\r
  const visibilityRef = useRef({ visible: true });\r
  const speedRef = useRef(speed);\r
\r
  const threeRef = useRef(null);\r
  const prevConfigRef = useRef(null);\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    speedRef.current = speed;\r
    const needsReinitKeys = ['antialias', 'liquid', 'noiseAmount'];\r
    const cfg = { antialias, liquid, noiseAmount };\r
    let mustReinit = false;\r
    if (!threeRef.current) mustReinit = true;\r
    else if (prevConfigRef.current) {\r
      for (const k of needsReinitKeys)\r
        if (prevConfigRef.current[k] !== cfg[k]) {\r
          mustReinit = true;\r
          break;\r
        }\r
    }\r
    if (mustReinit) {\r
      if (threeRef.current) {\r
        const t = threeRef.current;\r
        t.resizeObserver?.disconnect();\r
        cancelAnimationFrame(t.raf);\r
        t.quad?.geometry.dispose();\r
        t.material.dispose();\r
        t.composer?.dispose();\r
        t.renderer.dispose();\r
        if (t.renderer.domElement.parentElement === container) container.removeChild(t.renderer.domElement);\r
        threeRef.current = null;\r
      }\r
      const canvas = document.createElement('canvas');\r
      const renderer = new THREE.WebGLRenderer({\r
        canvas,\r
        antialias,\r
        alpha: true,\r
        powerPreference: 'high-performance'\r
      });\r
      renderer.domElement.style.width = '100%';\r
      renderer.domElement.style.height = '100%';\r
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r
      container.appendChild(renderer.domElement);\r
      if (transparent) renderer.setClearAlpha(0);\r
      else renderer.setClearColor(0x000000, 1);\r
      const uniforms = {\r
        uResolution: { value: new THREE.Vector2(0, 0) },\r
        uTime: { value: 0 },\r
        uColor: { value: new THREE.Color(color) },\r
        uClickPos: {\r
          value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1))\r
        },\r
        uClickTimes: { value: new Float32Array(MAX_CLICKS) },\r
        uShapeType: { value: SHAPE_MAP[variant] ?? 0 },\r
        uPixelSize: { value: pixelSize * renderer.getPixelRatio() },\r
        uScale: { value: patternScale },\r
        uDensity: { value: patternDensity },\r
        uPixelJitter: { value: pixelSizeJitter },\r
        uEnableRipples: { value: enableRipples ? 1 : 0 },\r
        uRippleSpeed: { value: rippleSpeed },\r
        uRippleThickness: { value: rippleThickness },\r
        uRippleIntensity: { value: rippleIntensityScale },\r
        uEdgeFade: { value: edgeFade }\r
      };\r
      const scene = new THREE.Scene();\r
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
      const isWebGL2 = renderer.capabilities.isWebGL2;\r
      const material = new THREE.ShaderMaterial({\r
        vertexShader: VERTEX_SRC,\r
        fragmentShader: isWebGL2 ? FRAGMENT_SRC : FRAGMENT_SRC_GLSL1,\r
        uniforms,\r
        transparent: true,\r
        depthTest: false,\r
        depthWrite: false,\r
        glslVersion: isWebGL2 ? THREE.GLSL3 : undefined\r
      });\r
      const quadGeom = new THREE.PlaneGeometry(2, 2);\r
      const quad = new THREE.Mesh(quadGeom, material);\r
      scene.add(quad);\r
      const clock = new THREE.Clock();\r
      const setSize = () => {\r
        const w = container.clientWidth || 1;\r
        const h = container.clientHeight || 1;\r
        renderer.setSize(w, h, false);\r
        uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);\r
        if (threeRef.current?.composer)\r
          threeRef.current.composer.setSize(renderer.domElement.width, renderer.domElement.height);\r
        uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();\r
      };\r
      setSize();\r
      const ro = new ResizeObserver(setSize);\r
      ro.observe(container);\r
      const randomFloat = () => {\r
        if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {\r
          const u32 = new Uint32Array(1);\r
          window.crypto.getRandomValues(u32);\r
          return u32[0] / 0xffffffff;\r
        }\r
        return Math.random();\r
      };\r
      const timeOffset = randomFloat() * 1000;\r
      let composer;\r
      let touch;\r
      let liquidEffect;\r
      if (liquid) {\r
        touch = createTouchTexture();\r
        touch.radiusScale = liquidRadius;\r
        composer = new EffectComposer(renderer);\r
        const renderPass = new RenderPass(scene, camera);\r
        liquidEffect = createLiquidEffect(touch.texture, {\r
          strength: liquidStrength,\r
          freq: liquidWobbleSpeed\r
        });\r
        const effectPass = new EffectPass(camera, liquidEffect);\r
        effectPass.renderToScreen = true;\r
        composer.addPass(renderPass);\r
        composer.addPass(effectPass);\r
      }\r
      if (noiseAmount > 0) {\r
        if (!composer) {\r
          composer = new EffectComposer(renderer);\r
          composer.addPass(new RenderPass(scene, camera));\r
        }\r
        const noiseEffect = new Effect(\r
          'NoiseEffect',\r
          \`uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} \`,\r
          {\r
            uniforms: new Map([\r
              ['uTime', new THREE.Uniform(0)],\r
              ['uAmount', new THREE.Uniform(noiseAmount)]\r
            ])\r
          }\r
        );\r
        const noisePass = new EffectPass(camera, noiseEffect);\r
        noisePass.renderToScreen = true;\r
        if (composer && composer.passes.length > 0) composer.passes.forEach(p => (p.renderToScreen = false));\r
        composer.addPass(noisePass);\r
      }\r
      if (composer) composer.setSize(renderer.domElement.width, renderer.domElement.height);\r
      const mapToPixels = e => {\r
        const rect = renderer.domElement.getBoundingClientRect();\r
        const scaleX = renderer.domElement.width / rect.width;\r
        const scaleY = renderer.domElement.height / rect.height;\r
        const fx = (e.clientX - rect.left) * scaleX;\r
        const fy = (rect.height - (e.clientY - rect.top)) * scaleY;\r
        return {\r
          fx,\r
          fy,\r
          w: renderer.domElement.width,\r
          h: renderer.domElement.height\r
        };\r
      };\r
      const onPointerDown = e => {\r
        const { fx, fy } = mapToPixels(e);\r
        const ix = threeRef.current?.clickIx ?? 0;\r
        uniforms.uClickPos.value[ix].set(fx, fy);\r
        uniforms.uClickTimes.value[ix] = uniforms.uTime.value;\r
        if (threeRef.current) threeRef.current.clickIx = (ix + 1) % MAX_CLICKS;\r
      };\r
      const onPointerMove = e => {\r
        if (!touch) return;\r
        const { fx, fy, w, h } = mapToPixels(e);\r
        touch.addTouch({ x: fx / w, y: fy / h });\r
      };\r
      renderer.domElement.addEventListener('pointerdown', onPointerDown, {\r
        passive: true\r
      });\r
      renderer.domElement.addEventListener('pointermove', onPointerMove, {\r
        passive: true\r
      });\r
      let raf = 0;\r
      const animate = () => {\r
        if (autoPauseOffscreen && !visibilityRef.current.visible) {\r
          raf = requestAnimationFrame(animate);\r
          return;\r
        }\r
        uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speedRef.current;\r
        if (liquidEffect) liquidEffect.uniforms.get('uTime').value = uniforms.uTime.value;\r
        if (composer) {\r
          if (touch) touch.update();\r
          composer.passes.forEach(p => {\r
            const effs = p.effects;\r
            if (effs)\r
              effs.forEach(eff => {\r
                const u = eff.uniforms?.get('uTime');\r
                if (u) u.value = uniforms.uTime.value;\r
              });\r
          });\r
          composer.render();\r
        } else renderer.render(scene, camera);\r
        raf = requestAnimationFrame(animate);\r
      };\r
      raf = requestAnimationFrame(animate);\r
      threeRef.current = {\r
        renderer,\r
        scene,\r
        camera,\r
        material,\r
        clock,\r
        clickIx: 0,\r
        uniforms,\r
        resizeObserver: ro,\r
        raf,\r
        quad,\r
        timeOffset,\r
        composer,\r
        touch,\r
        liquidEffect\r
      };\r
    } else {\r
      const t = threeRef.current;\r
      t.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0;\r
      t.uniforms.uPixelSize.value = pixelSize * t.renderer.getPixelRatio();\r
      t.uniforms.uColor.value.set(color);\r
      t.uniforms.uScale.value = patternScale;\r
      t.uniforms.uDensity.value = patternDensity;\r
      t.uniforms.uPixelJitter.value = pixelSizeJitter;\r
      t.uniforms.uEnableRipples.value = enableRipples ? 1 : 0;\r
      t.uniforms.uRippleIntensity.value = rippleIntensityScale;\r
      t.uniforms.uRippleThickness.value = rippleThickness;\r
      t.uniforms.uRippleSpeed.value = rippleSpeed;\r
      t.uniforms.uEdgeFade.value = edgeFade;\r
      if (transparent) t.renderer.setClearAlpha(0);\r
      else t.renderer.setClearColor(0x000000, 1);\r
      if (t.liquidEffect) {\r
        const uStrength = t.liquidEffect;\r
        if (uStrength) uStrength.value = liquidStrength;\r
        const uFreq = t.liquidEffect.uniforms.get('uFreq');\r
        if (uFreq) uFreq.value = liquidWobbleSpeed;\r
      }\r
      if (t.touch) t.touch.radiusScale = liquidRadius;\r
    }\r
    prevConfigRef.current = cfg;\r
    return () => {\r
      if (threeRef.current && mustReinit) return;\r
      if (!threeRef.current) return;\r
      const t = threeRef.current;\r
      t.resizeObserver?.disconnect();\r
      cancelAnimationFrame(t.raf);\r
      t.quad?.geometry.dispose();\r
      t.material.dispose();\r
      t.composer?.dispose();\r
      t.renderer.dispose();\r
      if (t.renderer.domElement.parentElement === container) container.removeChild(t.renderer.domElement);\r
      threeRef.current = null;\r
    };\r
  }, [\r
    antialias,\r
    liquid,\r
    noiseAmount,\r
    pixelSize,\r
    patternScale,\r
    patternDensity,\r
    enableRipples,\r
    rippleIntensityScale,\r
    rippleThickness,\r
    rippleSpeed,\r
    pixelSizeJitter,\r
    edgeFade,\r
    transparent,\r
    liquidStrength,\r
    liquidRadius,\r
    liquidWobbleSpeed,\r
    autoPauseOffscreen,\r
    variant,\r
    color,\r
    speed\r
  ]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`w-full h-full relative overflow-hidden \${className ?? ''}\`}\r
      style={style}\r
      aria-label="PixelBlast interactive background"\r
    />\r
  );\r
};\r
\r
export default PixelBlast;\r
`,Qe=`import React, { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import { EffectComposer, EffectPass, RenderPass, Effect } from 'postprocessing';\r
import './PixelBlast.css';\r
\r
type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';\r
\r
type PixelBlastProps = {\r
  variant?: PixelBlastVariant;\r
  pixelSize?: number;\r
  color?: string;\r
  className?: string;\r
  style?: React.CSSProperties;\r
  antialias?: boolean;\r
  patternScale?: number;\r
  patternDensity?: number;\r
  liquid?: boolean;\r
  liquidStrength?: number;\r
  liquidRadius?: number;\r
  pixelSizeJitter?: number;\r
  enableRipples?: boolean;\r
  rippleIntensityScale?: number;\r
  rippleThickness?: number;\r
  rippleSpeed?: number;\r
  liquidWobbleSpeed?: number;\r
  autoPauseOffscreen?: boolean;\r
  speed?: number;\r
  transparent?: boolean;\r
  edgeFade?: number;\r
  noiseAmount?: number;\r
};\r
\r
const createTouchTexture = () => {\r
  const size = 64;\r
  const canvas = document.createElement('canvas');\r
  canvas.width = size;\r
  canvas.height = size;\r
  const ctx = canvas.getContext('2d');\r
  if (!ctx) throw new Error('2D context not available');\r
  ctx.fillStyle = 'black';\r
  ctx.fillRect(0, 0, canvas.width, canvas.height);\r
  const texture = new THREE.Texture(canvas);\r
  texture.minFilter = THREE.LinearFilter;\r
  texture.magFilter = THREE.LinearFilter;\r
  texture.generateMipmaps = false;\r
  const trail: {\r
    x: number;\r
    y: number;\r
    vx: number;\r
    vy: number;\r
    force: number;\r
    age: number;\r
  }[] = [];\r
  let last: { x: number; y: number } | null = null;\r
  const maxAge = 64;\r
  let radius = 0.1 * size;\r
  const speed = 1 / maxAge;\r
  const clear = () => {\r
    ctx.fillStyle = 'black';\r
    ctx.fillRect(0, 0, canvas.width, canvas.height);\r
  };\r
  const drawPoint = (p: { x: number; y: number; vx: number; vy: number; force: number; age: number }) => {\r
    const pos = { x: p.x * size, y: (1 - p.y) * size };\r
    let intensity = 1;\r
    const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);\r
    const easeOutQuad = (t: number) => -t * (t - 2);\r
    if (p.age < maxAge * 0.3) intensity = easeOutSine(p.age / (maxAge * 0.3));\r
    else intensity = easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;\r
    intensity *= p.force;\r
    const color = \`\${((p.vx + 1) / 2) * 255}, \${((p.vy + 1) / 2) * 255}, \${intensity * 255}\`;\r
    const offset = size * 5;\r
    ctx.shadowOffsetX = offset;\r
    ctx.shadowOffsetY = offset;\r
    ctx.shadowBlur = radius;\r
    ctx.shadowColor = \`rgba(\${color},\${0.22 * intensity})\`;\r
    ctx.beginPath();\r
    ctx.fillStyle = 'rgba(255,0,0,1)';\r
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);\r
    ctx.fill();\r
  };\r
  const addTouch = (norm: { x: number; y: number }) => {\r
    let force = 0;\r
    let vx = 0;\r
    let vy = 0;\r
    if (last) {\r
      const dx = norm.x - last.x;\r
      const dy = norm.y - last.y;\r
      if (dx === 0 && dy === 0) return;\r
      const dd = dx * dx + dy * dy;\r
      const d = Math.sqrt(dd);\r
      vx = dx / (d || 1);\r
      vy = dy / (d || 1);\r
      force = Math.min(dd * 10000, 1);\r
    }\r
    last = { x: norm.x, y: norm.y };\r
    trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });\r
  };\r
  const update = () => {\r
    clear();\r
    for (let i = trail.length - 1; i >= 0; i--) {\r
      const point = trail[i];\r
      const f = point.force * speed * (1 - point.age / maxAge);\r
      point.x += point.vx * f;\r
      point.y += point.vy * f;\r
      point.age++;\r
      if (point.age > maxAge) trail.splice(i, 1);\r
    }\r
    for (let i = 0; i < trail.length; i++) drawPoint(trail[i]);\r
    texture.needsUpdate = true;\r
  };\r
  return {\r
    canvas,\r
    texture,\r
    addTouch,\r
    update,\r
    set radiusScale(v: number) {\r
      radius = 0.1 * size * v;\r
    },\r
    get radiusScale() {\r
      return radius / (0.1 * size);\r
    },\r
    size\r
  };\r
};\r
\r
const createLiquidEffect = (texture: THREE.Texture, opts?: { strength?: number; freq?: number }) => {\r
  const fragment = \`\r
    uniform sampler2D uTexture;\r
    uniform float uStrength;\r
    uniform float uTime;\r
    uniform float uFreq;\r
\r
    void mainUv(inout vec2 uv) {\r
      vec4 tex = texture2D(uTexture, uv);\r
      float vx = tex.r * 2.0 - 1.0;\r
      float vy = tex.g * 2.0 - 1.0;\r
      float intensity = tex.b;\r
\r
      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);\r
\r
      float amt = uStrength * intensity * wave;\r
\r
      uv += vec2(vx, vy) * amt;\r
    }\r
    \`;\r
  return new Effect('LiquidEffect', fragment, {\r
    uniforms: new Map<string, THREE.Uniform>([\r
      ['uTexture', new THREE.Uniform(texture)],\r
      ['uStrength', new THREE.Uniform(opts?.strength ?? 0.025)],\r
      ['uTime', new THREE.Uniform(0)],\r
      ['uFreq', new THREE.Uniform(opts?.freq ?? 4.5)]\r
    ])\r
  });\r
};\r
\r
const SHAPE_MAP: Record<PixelBlastVariant, number> = {\r
  square: 0,\r
  circle: 1,\r
  triangle: 2,\r
  diamond: 3\r
};\r
\r
const VERTEX_SRC = \`\r
void main() {\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
const FRAGMENT_SRC = \`\r
precision highp float;\r
\r
uniform vec3  uColor;\r
uniform vec2  uResolution;\r
uniform float uTime;\r
uniform float uPixelSize;\r
uniform float uScale;\r
uniform float uDensity;\r
uniform float uPixelJitter;\r
uniform int   uEnableRipples;\r
uniform float uRippleSpeed;\r
uniform float uRippleThickness;\r
uniform float uRippleIntensity;\r
uniform float uEdgeFade;\r
\r
uniform int   uShapeType;\r
const int SHAPE_SQUARE   = 0;\r
const int SHAPE_CIRCLE   = 1;\r
const int SHAPE_TRIANGLE = 2;\r
const int SHAPE_DIAMOND  = 3;\r
\r
const int   MAX_CLICKS = 10;\r
\r
uniform vec2  uClickPos  [MAX_CLICKS];\r
uniform float uClickTimes[MAX_CLICKS];\r
\r
out vec4 fragColor;\r
\r
float Bayer2(vec2 a) {\r
  a = floor(a);\r
  return fract(a.x / 2. + a.y * a.y * .75);\r
}\r
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))\r
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))\r
\r
#define FBM_OCTAVES     5\r
#define FBM_LACUNARITY  1.25\r
#define FBM_GAIN        1.0\r
\r
float hash11(float n){ return fract(sin(n)*43758.5453); }\r
\r
float vnoise(vec3 p){\r
  vec3 ip = floor(p);\r
  vec3 fp = fract(p);\r
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);\r
  float x00 = mix(n000, n100, w.x);\r
  float x10 = mix(n010, n110, w.x);\r
  float x01 = mix(n001, n101, w.x);\r
  float x11 = mix(n011, n111, w.x);\r
  float y0  = mix(x00, x10, w.y);\r
  float y1  = mix(x01, x11, w.y);\r
  return mix(y0, y1, w.z) * 2.0 - 1.0;\r
}\r
\r
float fbm2(vec2 uv, float t){\r
  vec3 p = vec3(uv * uScale, t);\r
  float amp = 1.0;\r
  float freq = 1.0;\r
  float sum = 1.0;\r
  for (int i = 0; i < FBM_OCTAVES; ++i){\r
    sum  += amp * vnoise(p * freq);\r
    freq *= FBM_LACUNARITY;\r
    amp  *= FBM_GAIN;\r
  }\r
  return sum * 0.5 + 0.5;\r
}\r
\r
float maskCircle(vec2 p, float cov){\r
  float r = sqrt(cov) * .25;\r
  float d = length(p - 0.5) - r;\r
  float aa = 0.5 * fwidth(d);\r
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));\r
}\r
\r
float maskTriangle(vec2 p, vec2 id, float cov){\r
  bool flip = mod(id.x + id.y, 2.0) > 0.5;\r
  if (flip) p.x = 1.0 - p.x;\r
  float r = sqrt(cov);\r
  float d  = p.y - r*(1.0 - p.x);\r
  float aa = fwidth(d);\r
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);\r
}\r
\r
float maskDiamond(vec2 p, float cov){\r
  float r = sqrt(cov) * 0.564;\r
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);\r
}\r
\r
void main(){\r
  float pixelSize = uPixelSize;\r
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;\r
  float aspectRatio = uResolution.x / uResolution.y;\r
\r
  vec2 pixelId = floor(fragCoord / pixelSize);\r
  vec2 pixelUV = fract(fragCoord / pixelSize);\r
\r
  float cellPixelSize = 8.0 * pixelSize;\r
  vec2 cellId = floor(fragCoord / cellPixelSize);\r
  vec2 cellCoord = cellId * cellPixelSize;\r
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);\r
\r
  float base = fbm2(uv, uTime * 0.05);\r
  base = base * 0.5 - 0.65;\r
\r
  float feed = base + (uDensity - 0.5) * 0.3;\r
\r
  float speed     = uRippleSpeed;\r
  float thickness = uRippleThickness;\r
  const float dampT     = 1.0;\r
  const float dampR     = 10.0;\r
\r
  if (uEnableRipples == 1) {\r
    for (int i = 0; i < MAX_CLICKS; ++i){\r
      vec2 pos = uClickPos[i];\r
      if (pos.x < 0.0) continue;\r
      float cellPixelSize = 8.0 * pixelSize;\r
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);\r
      float t = max(uTime - uClickTimes[i], 0.0);\r
      float r = distance(uv, cuv);\r
      float waveR = speed * t;\r
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));\r
      float atten = exp(-dampT * t) * exp(-dampR * r);\r
      feed = max(feed, ring * atten * uRippleIntensity);\r
    }\r
  }\r
\r
  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;\r
  float bw = step(0.5, feed + bayer);\r
\r
  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);\r
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;\r
  float coverage = bw * jitterScale;\r
  float M;\r
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);\r
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);\r
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);\r
  else                                   M = coverage;\r
\r
  if (uEdgeFade > 0.0) {\r
    vec2 norm = gl_FragCoord.xy / uResolution;\r
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));\r
    float fade = smoothstep(0.0, uEdgeFade, edge);\r
    M *= fade;\r
  }\r
\r
  vec3 color = uColor;\r
  fragColor = vec4(color, M);\r
}\r
\`;\r
\r
const FRAGMENT_SRC_GLSL1 = \`\r
#extension GL_OES_standard_derivatives : enable\r
precision highp float;\r
\r
uniform vec3  uColor;\r
uniform vec2  uResolution;\r
uniform float uTime;\r
uniform float uPixelSize;\r
uniform float uScale;\r
uniform float uDensity;\r
uniform float uPixelJitter;\r
uniform int   uEnableRipples;\r
uniform float uRippleSpeed;\r
uniform float uRippleThickness;\r
uniform float uRippleIntensity;\r
uniform float uEdgeFade;\r
\r
uniform int   uShapeType;\r
const int SHAPE_SQUARE   = 0;\r
const int SHAPE_CIRCLE   = 1;\r
const int SHAPE_TRIANGLE = 2;\r
const int SHAPE_DIAMOND  = 3;\r
\r
const int   MAX_CLICKS = 10;\r
\r
uniform vec2  uClickPos  [MAX_CLICKS];\r
uniform float uClickTimes[MAX_CLICKS];\r
\r
float Bayer2(vec2 a) {\r
  a = floor(a);\r
  return fract(a.x / 2. + a.y * a.y * .75);\r
}\r
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))\r
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))\r
\r
#define FBM_OCTAVES     5\r
#define FBM_LACUNARITY  1.25\r
#define FBM_GAIN        1.0\r
\r
float hash11(float n){ return fract(sin(n)*43758.5453); }\r
\r
float vnoise(vec3 p){\r
  vec3 ip = floor(p);\r
  vec3 fp = fract(p);\r
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);\r
  float x00 = mix(n000, n100, w.x);\r
  float x10 = mix(n010, n110, w.x);\r
  float x01 = mix(n001, n101, w.x);\r
  float x11 = mix(n011, n111, w.x);\r
  float y0  = mix(x00, x10, w.y);\r
  float y1  = mix(x01, x11, w.y);\r
  return mix(y0, y1, w.z) * 2.0 - 1.0;\r
}\r
\r
float fbm2(vec2 uv, float t){\r
  vec3 p = vec3(uv * uScale, t);\r
  float amp = 1.0;\r
  float freq = 1.0;\r
  float sum = 1.0;\r
  for (int i = 0; i < FBM_OCTAVES; ++i){\r
    sum  += amp * vnoise(p * freq);\r
    freq *= FBM_LACUNARITY;\r
    amp  *= FBM_GAIN;\r
  }\r
  return sum * 0.5 + 0.5;\r
}\r
\r
float maskCircle(vec2 p, float cov){\r
  float r = sqrt(cov) * .25;\r
  float d = length(p - 0.5) - r;\r
  float aa = 0.5 * fwidth(d);\r
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));\r
}\r
\r
float maskTriangle(vec2 p, vec2 id, float cov){\r
  bool flip = mod(id.x + id.y, 2.0) > 0.5;\r
  if (flip) p.x = 1.0 - p.x;\r
  float r = sqrt(cov);\r
  float d  = p.y - r*(1.0 - p.x);\r
  float aa = fwidth(d);\r
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);\r
}\r
\r
float maskDiamond(vec2 p, float cov){\r
  float r = sqrt(cov) * 0.564;\r
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);\r
}\r
\r
void main(){\r
  float pixelSize = uPixelSize;\r
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;\r
  float aspectRatio = uResolution.x / uResolution.y;\r
\r
  vec2 pixelId = floor(fragCoord / pixelSize);\r
  vec2 pixelUV = fract(fragCoord / pixelSize);\r
\r
  float cellPixelSize = 8.0 * pixelSize;\r
  vec2 cellId = floor(fragCoord / cellPixelSize);\r
  vec2 cellCoord = cellId * cellPixelSize;\r
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);\r
\r
  float base = fbm2(uv, uTime * 0.05);\r
  base = base * 0.5 - 0.65;\r
\r
  float feed = base + (uDensity - 0.5) * 0.3;\r
\r
  float speed     = uRippleSpeed;\r
  float thickness = uRippleThickness;\r
  const float dampT     = 1.0;\r
  const float dampR     = 10.0;\r
\r
  if (uEnableRipples == 1) {\r
    for (int i = 0; i < MAX_CLICKS; ++i){\r
      vec2 pos = uClickPos[i];\r
      if (pos.x < 0.0) continue;\r
      float cellPixelSize = 8.0 * pixelSize;\r
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);\r
      float t = max(uTime - uClickTimes[i], 0.0);\r
      float r = distance(uv, cuv);\r
      float waveR = speed * t;\r
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));\r
      float atten = exp(-dampT * t) * exp(-dampR * r);\r
      feed = max(feed, ring * atten * uRippleIntensity);\r
    }\r
  }\r
\r
  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;\r
  float bw = step(0.5, feed + bayer);\r
\r
  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);\r
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;\r
  float coverage = bw * jitterScale;\r
  float M;\r
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);\r
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);\r
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);\r
  else                                   M = coverage;\r
\r
  if (uEdgeFade > 0.0) {\r
    vec2 norm = gl_FragCoord.xy / uResolution;\r
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));\r
    float fade = smoothstep(0.0, uEdgeFade, edge);\r
    M *= fade;\r
  }\r
\r
  vec3 color = uColor;\r
  gl_FragColor = vec4(color, M);\r
}\r
\`;\r
\r
const MAX_CLICKS = 10;\r
\r
const PixelBlast: React.FC<PixelBlastProps> = ({\r
  variant = 'square',\r
  pixelSize = 3,\r
  color = '#B19EEF',\r
  className,\r
  style,\r
  antialias = true,\r
  patternScale = 2,\r
  patternDensity = 1,\r
  liquid = false,\r
  liquidStrength = 0.1,\r
  liquidRadius = 1,\r
  pixelSizeJitter = 0,\r
  enableRipples = true,\r
  rippleIntensityScale = 1,\r
  rippleThickness = 0.1,\r
  rippleSpeed = 0.3,\r
  liquidWobbleSpeed = 4.5,\r
  autoPauseOffscreen = true,\r
  speed = 0.5,\r
  transparent = true,\r
  edgeFade = 0.5,\r
  noiseAmount = 0\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const visibilityRef = useRef({ visible: true });\r
  const speedRef = useRef(speed);\r
\r
  const threeRef = useRef<{\r
    renderer: THREE.WebGLRenderer;\r
    scene: THREE.Scene;\r
    camera: THREE.OrthographicCamera;\r
    material: THREE.ShaderMaterial;\r
    clock: THREE.Clock;\r
    clickIx: number;\r
    uniforms: {\r
      uResolution: { value: THREE.Vector2 };\r
      uTime: { value: number };\r
      uColor: { value: THREE.Color };\r
      uClickPos: { value: THREE.Vector2[] };\r
      uClickTimes: { value: Float32Array };\r
      uShapeType: { value: number };\r
      uPixelSize: { value: number };\r
      uScale: { value: number };\r
      uDensity: { value: number };\r
      uPixelJitter: { value: number };\r
      uEnableRipples: { value: number };\r
      uRippleSpeed: { value: number };\r
      uRippleThickness: { value: number };\r
      uRippleIntensity: { value: number };\r
      uEdgeFade: { value: number };\r
    };\r
    resizeObserver?: ResizeObserver;\r
    raf?: number;\r
    quad?: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;\r
    timeOffset?: number;\r
    composer?: EffectComposer;\r
    touch?: ReturnType<typeof createTouchTexture>;\r
    liquidEffect?: Effect;\r
  } | null>(null);\r
  const prevConfigRef = useRef<any>(null);\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    speedRef.current = speed;\r
    const needsReinitKeys = ['antialias', 'liquid', 'noiseAmount'];\r
    const cfg = { antialias, liquid, noiseAmount };\r
    let mustReinit = false;\r
    if (!threeRef.current) mustReinit = true;\r
    else if (prevConfigRef.current) {\r
      for (const k of needsReinitKeys)\r
        if (prevConfigRef.current[k] !== (cfg as any)[k]) {\r
          mustReinit = true;\r
          break;\r
        }\r
    }\r
    if (mustReinit) {\r
      if (threeRef.current) {\r
        const t = threeRef.current;\r
        t.resizeObserver?.disconnect();\r
        cancelAnimationFrame(t.raf!);\r
        t.quad?.geometry.dispose();\r
        t.material.dispose();\r
        t.composer?.dispose();\r
        t.renderer.dispose();\r
        if (t.renderer.domElement.parentElement === container) container.removeChild(t.renderer.domElement);\r
        threeRef.current = null;\r
      }\r
      const canvas = document.createElement('canvas');\r
      const renderer = new THREE.WebGLRenderer({\r
        canvas,\r
        antialias,\r
        alpha: true,\r
        powerPreference: 'high-performance'\r
      });\r
      renderer.domElement.style.width = '100%';\r
      renderer.domElement.style.height = '100%';\r
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r
      container.appendChild(renderer.domElement);\r
      if (transparent) renderer.setClearAlpha(0);\r
      else renderer.setClearColor(0x000000, 1);\r
      const uniforms = {\r
        uResolution: { value: new THREE.Vector2(0, 0) },\r
        uTime: { value: 0 },\r
        uColor: { value: new THREE.Color(color) },\r
        uClickPos: {\r
          value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1))\r
        },\r
        uClickTimes: { value: new Float32Array(MAX_CLICKS) },\r
        uShapeType: { value: SHAPE_MAP[variant] ?? 0 },\r
        uPixelSize: { value: pixelSize * renderer.getPixelRatio() },\r
        uScale: { value: patternScale },\r
        uDensity: { value: patternDensity },\r
        uPixelJitter: { value: pixelSizeJitter },\r
        uEnableRipples: { value: enableRipples ? 1 : 0 },\r
        uRippleSpeed: { value: rippleSpeed },\r
        uRippleThickness: { value: rippleThickness },\r
        uRippleIntensity: { value: rippleIntensityScale },\r
        uEdgeFade: { value: edgeFade }\r
      };\r
      const scene = new THREE.Scene();\r
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
      const isWebGL2 = renderer.capabilities.isWebGL2;\r
      const material = new THREE.ShaderMaterial({\r
        vertexShader: VERTEX_SRC,\r
        fragmentShader: isWebGL2 ? FRAGMENT_SRC : FRAGMENT_SRC_GLSL1,\r
        uniforms,\r
        transparent: true,\r
        depthTest: false,\r
        depthWrite: false,\r
        glslVersion: isWebGL2 ? THREE.GLSL3 : undefined\r
      });\r
\r
      const quadGeom = new THREE.PlaneGeometry(2, 2);\r
      const quad = new THREE.Mesh(quadGeom, material);\r
      scene.add(quad);\r
      const clock = new THREE.Clock();\r
      const setSize = () => {\r
        const w = container.clientWidth || 1;\r
        const h = container.clientHeight || 1;\r
        renderer.setSize(w, h, false);\r
        uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);\r
        if (threeRef.current?.composer)\r
          threeRef.current.composer.setSize(renderer.domElement.width, renderer.domElement.height);\r
        uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();\r
      };\r
      setSize();\r
      const ro = new ResizeObserver(setSize);\r
      ro.observe(container);\r
      const randomFloat = () => {\r
        if (typeof window !== 'undefined' && (window as any).crypto?.getRandomValues) {\r
          const u32 = new Uint32Array(1);\r
          window.crypto.getRandomValues(u32);\r
          return u32[0] / 0xffffffff;\r
        }\r
        return Math.random();\r
      };\r
      const timeOffset = randomFloat() * 1000;\r
      let composer: EffectComposer | undefined;\r
      let touch: ReturnType<typeof createTouchTexture> | undefined;\r
      let liquidEffect: Effect | undefined;\r
      if (liquid) {\r
        touch = createTouchTexture();\r
        touch.radiusScale = liquidRadius;\r
        composer = new EffectComposer(renderer);\r
        const renderPass = new RenderPass(scene, camera);\r
        liquidEffect = createLiquidEffect(touch.texture, {\r
          strength: liquidStrength,\r
          freq: liquidWobbleSpeed\r
        });\r
        const effectPass = new EffectPass(camera, liquidEffect);\r
        effectPass.renderToScreen = true;\r
        composer.addPass(renderPass);\r
        composer.addPass(effectPass);\r
      }\r
      if (noiseAmount > 0) {\r
        if (!composer) {\r
          composer = new EffectComposer(renderer);\r
          composer.addPass(new RenderPass(scene, camera));\r
        }\r
        const noiseEffect = new Effect(\r
          'NoiseEffect',\r
          \`uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} \`,\r
          {\r
            uniforms: new Map<string, THREE.Uniform>([\r
              ['uTime', new THREE.Uniform(0)],\r
              ['uAmount', new THREE.Uniform(noiseAmount)]\r
            ])\r
          }\r
        );\r
        const noisePass = new EffectPass(camera, noiseEffect);\r
        noisePass.renderToScreen = true;\r
        if (composer && composer.passes.length > 0) composer.passes.forEach(p => ((p as any).renderToScreen = false));\r
        composer.addPass(noisePass);\r
      }\r
      if (composer) composer.setSize(renderer.domElement.width, renderer.domElement.height);\r
      const mapToPixels = (e: PointerEvent) => {\r
        const rect = renderer.domElement.getBoundingClientRect();\r
        const scaleX = renderer.domElement.width / rect.width;\r
        const scaleY = renderer.domElement.height / rect.height;\r
        const fx = (e.clientX - rect.left) * scaleX;\r
        const fy = (rect.height - (e.clientY - rect.top)) * scaleY;\r
        return {\r
          fx,\r
          fy,\r
          w: renderer.domElement.width,\r
          h: renderer.domElement.height\r
        };\r
      };\r
      const onPointerDown = (e: PointerEvent) => {\r
        const { fx, fy } = mapToPixels(e);\r
        const ix = threeRef.current?.clickIx ?? 0;\r
        uniforms.uClickPos.value[ix].set(fx, fy);\r
        uniforms.uClickTimes.value[ix] = uniforms.uTime.value;\r
        if (threeRef.current) threeRef.current.clickIx = (ix + 1) % MAX_CLICKS;\r
      };\r
      const onPointerMove = (e: PointerEvent) => {\r
        if (!touch) return;\r
        const { fx, fy, w, h } = mapToPixels(e);\r
        touch.addTouch({ x: fx / w, y: fy / h });\r
      };\r
      renderer.domElement.addEventListener('pointerdown', onPointerDown, {\r
        passive: true\r
      });\r
      renderer.domElement.addEventListener('pointermove', onPointerMove, {\r
        passive: true\r
      });\r
      let raf = 0;\r
      const animate = () => {\r
        if (autoPauseOffscreen && !visibilityRef.current.visible) {\r
          raf = requestAnimationFrame(animate);\r
          return;\r
        }\r
        uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speedRef.current;\r
        if (liquidEffect) (liquidEffect as any).uniforms.get('uTime').value = uniforms.uTime.value;\r
        if (composer) {\r
          if (touch) touch.update();\r
          composer.passes.forEach(p => {\r
            const effs = (p as any).effects;\r
            if (effs)\r
              effs.forEach((eff: any) => {\r
                const u = eff.uniforms?.get('uTime');\r
                if (u) u.value = uniforms.uTime.value;\r
              });\r
          });\r
          composer.render();\r
        } else renderer.render(scene, camera);\r
        raf = requestAnimationFrame(animate);\r
      };\r
      raf = requestAnimationFrame(animate);\r
      threeRef.current = {\r
        renderer,\r
        scene,\r
        camera,\r
        material,\r
        clock,\r
        clickIx: 0,\r
        uniforms,\r
        resizeObserver: ro,\r
        raf,\r
        quad,\r
        timeOffset,\r
        composer,\r
        touch,\r
        liquidEffect\r
      };\r
    } else {\r
      const t = threeRef.current!;\r
      t.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0;\r
      t.uniforms.uPixelSize.value = pixelSize * t.renderer.getPixelRatio();\r
      t.uniforms.uColor.value.set(color);\r
      t.uniforms.uScale.value = patternScale;\r
      t.uniforms.uDensity.value = patternDensity;\r
      t.uniforms.uPixelJitter.value = pixelSizeJitter;\r
      t.uniforms.uEnableRipples.value = enableRipples ? 1 : 0;\r
      t.uniforms.uRippleIntensity.value = rippleIntensityScale;\r
      t.uniforms.uRippleThickness.value = rippleThickness;\r
      t.uniforms.uRippleSpeed.value = rippleSpeed;\r
      t.uniforms.uEdgeFade.value = edgeFade;\r
      if (transparent) t.renderer.setClearAlpha(0);\r
      else t.renderer.setClearColor(0x000000, 1);\r
      if (t.liquidEffect) {\r
        const uStrength = (t.liquidEffect as any).uniforms.get('uStrength');\r
        if (uStrength) uStrength.value = liquidStrength;\r
        const uFreq = (t.liquidEffect as any).uniforms.get('uFreq');\r
        if (uFreq) uFreq.value = liquidWobbleSpeed;\r
      }\r
      if (t.touch) t.touch.radiusScale = liquidRadius;\r
    }\r
    prevConfigRef.current = cfg;\r
    return () => {\r
      if (threeRef.current && mustReinit) return;\r
      if (!threeRef.current) return;\r
      const t = threeRef.current;\r
      t.resizeObserver?.disconnect();\r
      cancelAnimationFrame(t.raf!);\r
      t.quad?.geometry.dispose();\r
      t.material.dispose();\r
      t.composer?.dispose();\r
      t.renderer.dispose();\r
      if (t.renderer.domElement.parentElement === container) container.removeChild(t.renderer.domElement);\r
      threeRef.current = null;\r
    };\r
  }, [\r
    antialias,\r
    liquid,\r
    noiseAmount,\r
    pixelSize,\r
    patternScale,\r
    patternDensity,\r
    enableRipples,\r
    rippleIntensityScale,\r
    rippleThickness,\r
    rippleSpeed,\r
    pixelSizeJitter,\r
    edgeFade,\r
    transparent,\r
    liquidStrength,\r
    liquidRadius,\r
    liquidWobbleSpeed,\r
    autoPauseOffscreen,\r
    variant,\r
    color,\r
    speed\r
  ]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`pixel-blast-container \${className ?? ''}\`}\r
      style={style}\r
      aria-label="PixelBlast interactive background"\r
    />\r
  );\r
};\r
\r
export default PixelBlast;\r
`,Ze=`import React, { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import { EffectComposer, EffectPass, RenderPass, Effect } from 'postprocessing';\r
\r
type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';\r
\r
type PixelBlastProps = {\r
  variant?: PixelBlastVariant;\r
  pixelSize?: number;\r
  color?: string;\r
  className?: string;\r
  style?: React.CSSProperties;\r
  antialias?: boolean;\r
  patternScale?: number;\r
  patternDensity?: number;\r
  liquid?: boolean;\r
  liquidStrength?: number;\r
  liquidRadius?: number;\r
  pixelSizeJitter?: number;\r
  enableRipples?: boolean;\r
  rippleIntensityScale?: number;\r
  rippleThickness?: number;\r
  rippleSpeed?: number;\r
  liquidWobbleSpeed?: number;\r
  autoPauseOffscreen?: boolean;\r
  speed?: number;\r
  transparent?: boolean;\r
  edgeFade?: number;\r
  noiseAmount?: number;\r
};\r
\r
const createTouchTexture = () => {\r
  const size = 64;\r
  const canvas = document.createElement('canvas');\r
  canvas.width = size;\r
  canvas.height = size;\r
  const ctx = canvas.getContext('2d');\r
  if (!ctx) throw new Error('2D context not available');\r
  ctx.fillStyle = 'black';\r
  ctx.fillRect(0, 0, canvas.width, canvas.height);\r
  const texture = new THREE.Texture(canvas);\r
  texture.minFilter = THREE.LinearFilter;\r
  texture.magFilter = THREE.LinearFilter;\r
  texture.generateMipmaps = false;\r
  const trail: {\r
    x: number;\r
    y: number;\r
    vx: number;\r
    vy: number;\r
    force: number;\r
    age: number;\r
  }[] = [];\r
  let last: { x: number; y: number } | null = null;\r
  const maxAge = 64;\r
  let radius = 0.1 * size;\r
  const speed = 1 / maxAge;\r
  const clear = () => {\r
    ctx.fillStyle = 'black';\r
    ctx.fillRect(0, 0, canvas.width, canvas.height);\r
  };\r
  const drawPoint = (p: { x: number; y: number; vx: number; vy: number; force: number; age: number }) => {\r
    const pos = { x: p.x * size, y: (1 - p.y) * size };\r
    let intensity = 1;\r
    const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);\r
    const easeOutQuad = (t: number) => -t * (t - 2);\r
    if (p.age < maxAge * 0.3) intensity = easeOutSine(p.age / (maxAge * 0.3));\r
    else intensity = easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;\r
    intensity *= p.force;\r
    const color = \`\${((p.vx + 1) / 2) * 255}, \${((p.vy + 1) / 2) * 255}, \${intensity * 255}\`;\r
    const offset = size * 5;\r
    ctx.shadowOffsetX = offset;\r
    ctx.shadowOffsetY = offset;\r
    ctx.shadowBlur = radius;\r
    ctx.shadowColor = \`rgba(\${color},\${0.22 * intensity})\`;\r
    ctx.beginPath();\r
    ctx.fillStyle = 'rgba(255,0,0,1)';\r
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);\r
    ctx.fill();\r
  };\r
  const addTouch = (norm: { x: number; y: number }) => {\r
    let force = 0;\r
    let vx = 0;\r
    let vy = 0;\r
    if (last) {\r
      const dx = norm.x - last.x;\r
      const dy = norm.y - last.y;\r
      if (dx === 0 && dy === 0) return;\r
      const dd = dx * dx + dy * dy;\r
      const d = Math.sqrt(dd);\r
      vx = dx / (d || 1);\r
      vy = dy / (d || 1);\r
      force = Math.min(dd * 10000, 1);\r
    }\r
    last = { x: norm.x, y: norm.y };\r
    trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });\r
  };\r
  const update = () => {\r
    clear();\r
    for (let i = trail.length - 1; i >= 0; i--) {\r
      const point = trail[i];\r
      const f = point.force * speed * (1 - point.age / maxAge);\r
      point.x += point.vx * f;\r
      point.y += point.vy * f;\r
      point.age++;\r
      if (point.age > maxAge) trail.splice(i, 1);\r
    }\r
    for (let i = 0; i < trail.length; i++) drawPoint(trail[i]);\r
    texture.needsUpdate = true;\r
  };\r
  return {\r
    canvas,\r
    texture,\r
    addTouch,\r
    update,\r
    set radiusScale(v: number) {\r
      radius = 0.1 * size * v;\r
    },\r
    get radiusScale() {\r
      return radius / (0.1 * size);\r
    },\r
    size\r
  };\r
};\r
\r
const createLiquidEffect = (texture: THREE.Texture, opts?: { strength?: number; freq?: number }) => {\r
  const fragment = \`\r
    uniform sampler2D uTexture;\r
    uniform float uStrength;\r
    uniform float uTime;\r
    uniform float uFreq;\r
\r
    void mainUv(inout vec2 uv) {\r
      vec4 tex = texture2D(uTexture, uv);\r
      float vx = tex.r * 2.0 - 1.0;\r
      float vy = tex.g * 2.0 - 1.0;\r
      float intensity = tex.b;\r
\r
      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);\r
\r
      float amt = uStrength * intensity * wave;\r
\r
      uv += vec2(vx, vy) * amt;\r
    }\r
    \`;\r
  return new Effect('LiquidEffect', fragment, {\r
    uniforms: new Map<string, THREE.Uniform>([\r
      ['uTexture', new THREE.Uniform(texture)],\r
      ['uStrength', new THREE.Uniform(opts?.strength ?? 0.025)],\r
      ['uTime', new THREE.Uniform(0)],\r
      ['uFreq', new THREE.Uniform(opts?.freq ?? 4.5)]\r
    ])\r
  });\r
};\r
\r
const SHAPE_MAP: Record<PixelBlastVariant, number> = {\r
  square: 0,\r
  circle: 1,\r
  triangle: 2,\r
  diamond: 3\r
};\r
\r
const VERTEX_SRC = \`\r
void main() {\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
const FRAGMENT_SRC = \`\r
precision highp float;\r
\r
uniform vec3  uColor;\r
uniform vec2  uResolution;\r
uniform float uTime;\r
uniform float uPixelSize;\r
uniform float uScale;\r
uniform float uDensity;\r
uniform float uPixelJitter;\r
uniform int   uEnableRipples;\r
uniform float uRippleSpeed;\r
uniform float uRippleThickness;\r
uniform float uRippleIntensity;\r
uniform float uEdgeFade;\r
\r
uniform int   uShapeType;\r
const int SHAPE_SQUARE   = 0;\r
const int SHAPE_CIRCLE   = 1;\r
const int SHAPE_TRIANGLE = 2;\r
const int SHAPE_DIAMOND  = 3;\r
\r
const int   MAX_CLICKS = 10;\r
\r
uniform vec2  uClickPos  [MAX_CLICKS];\r
uniform float uClickTimes[MAX_CLICKS];\r
\r
out vec4 fragColor;\r
\r
float Bayer2(vec2 a) {\r
  a = floor(a);\r
  return fract(a.x / 2. + a.y * a.y * .75);\r
}\r
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))\r
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))\r
\r
#define FBM_OCTAVES     5\r
#define FBM_LACUNARITY  1.25\r
#define FBM_GAIN        1.0\r
\r
float hash11(float n){ return fract(sin(n)*43758.5453); }\r
\r
float vnoise(vec3 p){\r
  vec3 ip = floor(p);\r
  vec3 fp = fract(p);\r
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);\r
  float x00 = mix(n000, n100, w.x);\r
  float x10 = mix(n010, n110, w.x);\r
  float x01 = mix(n001, n101, w.x);\r
  float x11 = mix(n011, n111, w.x);\r
  float y0  = mix(x00, x10, w.y);\r
  float y1  = mix(x01, x11, w.y);\r
  return mix(y0, y1, w.z) * 2.0 - 1.0;\r
}\r
\r
float fbm2(vec2 uv, float t){\r
  vec3 p = vec3(uv * uScale, t);\r
  float amp = 1.0;\r
  float freq = 1.0;\r
  float sum = 1.0;\r
  for (int i = 0; i < FBM_OCTAVES; ++i){\r
    sum  += amp * vnoise(p * freq);\r
    freq *= FBM_LACUNARITY;\r
    amp  *= FBM_GAIN;\r
  }\r
  return sum * 0.5 + 0.5;\r
}\r
\r
float maskCircle(vec2 p, float cov){\r
  float r = sqrt(cov) * .25;\r
  float d = length(p - 0.5) - r;\r
  float aa = 0.5 * fwidth(d);\r
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));\r
}\r
\r
float maskTriangle(vec2 p, vec2 id, float cov){\r
  bool flip = mod(id.x + id.y, 2.0) > 0.5;\r
  if (flip) p.x = 1.0 - p.x;\r
  float r = sqrt(cov);\r
  float d  = p.y - r*(1.0 - p.x);\r
  float aa = fwidth(d);\r
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);\r
}\r
\r
float maskDiamond(vec2 p, float cov){\r
  float r = sqrt(cov) * 0.564;\r
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);\r
}\r
\r
void main(){\r
  float pixelSize = uPixelSize;\r
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;\r
  float aspectRatio = uResolution.x / uResolution.y;\r
\r
  vec2 pixelId = floor(fragCoord / pixelSize);\r
  vec2 pixelUV = fract(fragCoord / pixelSize);\r
\r
  float cellPixelSize = 8.0 * pixelSize;\r
  vec2 cellId = floor(fragCoord / cellPixelSize);\r
  vec2 cellCoord = cellId * cellPixelSize;\r
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);\r
\r
  float base = fbm2(uv, uTime * 0.05);\r
  base = base * 0.5 - 0.65;\r
\r
  float feed = base + (uDensity - 0.5) * 0.3;\r
\r
  float speed     = uRippleSpeed;\r
  float thickness = uRippleThickness;\r
  const float dampT     = 1.0;\r
  const float dampR     = 10.0;\r
\r
  if (uEnableRipples == 1) {\r
    for (int i = 0; i < MAX_CLICKS; ++i){\r
      vec2 pos = uClickPos[i];\r
      if (pos.x < 0.0) continue;\r
      float cellPixelSize = 8.0 * pixelSize;\r
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);\r
      float t = max(uTime - uClickTimes[i], 0.0);\r
      float r = distance(uv, cuv);\r
      float waveR = speed * t;\r
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));\r
      float atten = exp(-dampT * t) * exp(-dampR * r);\r
      feed = max(feed, ring * atten * uRippleIntensity);\r
    }\r
  }\r
\r
  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;\r
  float bw = step(0.5, feed + bayer);\r
\r
  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);\r
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;\r
  float coverage = bw * jitterScale;\r
  float M;\r
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);\r
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);\r
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);\r
  else                                   M = coverage;\r
\r
  if (uEdgeFade > 0.0) {\r
    vec2 norm = gl_FragCoord.xy / uResolution;\r
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));\r
    float fade = smoothstep(0.0, uEdgeFade, edge);\r
    M *= fade;\r
  }\r
\r
  vec3 color = uColor;\r
  fragColor = vec4(color, M);\r
}\r
\`;\r
\r
const FRAGMENT_SRC_GLSL1 = \`\r
#extension GL_OES_standard_derivatives : enable\r
precision highp float;\r
\r
uniform vec3  uColor;\r
uniform vec2  uResolution;\r
uniform float uTime;\r
uniform float uPixelSize;\r
uniform float uScale;\r
uniform float uDensity;\r
uniform float uPixelJitter;\r
uniform int   uEnableRipples;\r
uniform float uRippleSpeed;\r
uniform float uRippleThickness;\r
uniform float uRippleIntensity;\r
uniform float uEdgeFade;\r
\r
uniform int   uShapeType;\r
const int SHAPE_SQUARE   = 0;\r
const int SHAPE_CIRCLE   = 1;\r
const int SHAPE_TRIANGLE = 2;\r
const int SHAPE_DIAMOND  = 3;\r
\r
const int   MAX_CLICKS = 10;\r
\r
uniform vec2  uClickPos  [MAX_CLICKS];\r
uniform float uClickTimes[MAX_CLICKS];\r
\r
float Bayer2(vec2 a) {\r
  a = floor(a);\r
  return fract(a.x / 2. + a.y * a.y * .75);\r
}\r
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))\r
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))\r
\r
#define FBM_OCTAVES     5\r
#define FBM_LACUNARITY  1.25\r
#define FBM_GAIN        1.0\r
\r
float hash11(float n){ return fract(sin(n)*43758.5453); }\r
\r
float vnoise(vec3 p){\r
  vec3 ip = floor(p);\r
  vec3 fp = fract(p);\r
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));\r
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));\r
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);\r
  float x00 = mix(n000, n100, w.x);\r
  float x10 = mix(n010, n110, w.x);\r
  float x01 = mix(n001, n101, w.x);\r
  float x11 = mix(n011, n111, w.x);\r
  float y0  = mix(x00, x10, w.y);\r
  float y1  = mix(x01, x11, w.y);\r
  return mix(y0, y1, w.z) * 2.0 - 1.0;\r
}\r
\r
float fbm2(vec2 uv, float t){\r
  vec3 p = vec3(uv * uScale, t);\r
  float amp = 1.0;\r
  float freq = 1.0;\r
  float sum = 1.0;\r
  for (int i = 0; i < FBM_OCTAVES; ++i){\r
    sum  += amp * vnoise(p * freq);\r
    freq *= FBM_LACUNARITY;\r
    amp  *= FBM_GAIN;\r
  }\r
  return sum * 0.5 + 0.5;\r
}\r
\r
float maskCircle(vec2 p, float cov){\r
  float r = sqrt(cov) * .25;\r
  float d = length(p - 0.5) - r;\r
  float aa = 0.5 * fwidth(d);\r
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));\r
}\r
\r
float maskTriangle(vec2 p, vec2 id, float cov){\r
  bool flip = mod(id.x + id.y, 2.0) > 0.5;\r
  if (flip) p.x = 1.0 - p.x;\r
  float r = sqrt(cov);\r
  float d  = p.y - r*(1.0 - p.x);\r
  float aa = fwidth(d);\r
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);\r
}\r
\r
float maskDiamond(vec2 p, float cov){\r
  float r = sqrt(cov) * 0.564;\r
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);\r
}\r
\r
void main(){\r
  float pixelSize = uPixelSize;\r
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;\r
  float aspectRatio = uResolution.x / uResolution.y;\r
\r
  vec2 pixelId = floor(fragCoord / pixelSize);\r
  vec2 pixelUV = fract(fragCoord / pixelSize);\r
\r
  float cellPixelSize = 8.0 * pixelSize;\r
  vec2 cellId = floor(fragCoord / cellPixelSize);\r
  vec2 cellCoord = cellId * cellPixelSize;\r
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);\r
\r
  float base = fbm2(uv, uTime * 0.05);\r
  base = base * 0.5 - 0.65;\r
\r
  float feed = base + (uDensity - 0.5) * 0.3;\r
\r
  float speed     = uRippleSpeed;\r
  float thickness = uRippleThickness;\r
  const float dampT     = 1.0;\r
  const float dampR     = 10.0;\r
\r
  if (uEnableRipples == 1) {\r
    for (int i = 0; i < MAX_CLICKS; ++i){\r
      vec2 pos = uClickPos[i];\r
      if (pos.x < 0.0) continue;\r
      float cellPixelSize = 8.0 * pixelSize;\r
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);\r
      float t = max(uTime - uClickTimes[i], 0.0);\r
      float r = distance(uv, cuv);\r
      float waveR = speed * t;\r
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));\r
      float atten = exp(-dampT * t) * exp(-dampR * r);\r
      feed = max(feed, ring * atten * uRippleIntensity);\r
    }\r
  }\r
\r
  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;\r
  float bw = step(0.5, feed + bayer);\r
\r
  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);\r
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;\r
  float coverage = bw * jitterScale;\r
  float M;\r
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);\r
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);\r
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);\r
  else                                   M = coverage;\r
\r
  if (uEdgeFade > 0.0) {\r
    vec2 norm = gl_FragCoord.xy / uResolution;\r
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));\r
    float fade = smoothstep(0.0, uEdgeFade, edge);\r
    M *= fade;\r
  }\r
\r
  vec3 color = uColor;\r
  gl_FragColor = vec4(color, M);\r
}\r
\`;\r
\r
const MAX_CLICKS = 10;\r
\r
const PixelBlast: React.FC<PixelBlastProps> = ({\r
  variant = 'square',\r
  pixelSize = 3,\r
  color = '#B19EEF',\r
  className,\r
  style,\r
  antialias = true,\r
  patternScale = 2,\r
  patternDensity = 1,\r
  liquid = false,\r
  liquidStrength = 0.1,\r
  liquidRadius = 1,\r
  pixelSizeJitter = 0,\r
  enableRipples = true,\r
  rippleIntensityScale = 1,\r
  rippleThickness = 0.1,\r
  rippleSpeed = 0.3,\r
  liquidWobbleSpeed = 4.5,\r
  autoPauseOffscreen = true,\r
  speed = 0.5,\r
  transparent = true,\r
  edgeFade = 0.5,\r
  noiseAmount = 0\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const visibilityRef = useRef({ visible: true });\r
  const speedRef = useRef(speed);\r
\r
  const threeRef = useRef<{\r
    renderer: THREE.WebGLRenderer;\r
    scene: THREE.Scene;\r
    camera: THREE.OrthographicCamera;\r
    material: THREE.ShaderMaterial;\r
    clock: THREE.Clock;\r
    clickIx: number;\r
    uniforms: {\r
      uResolution: { value: THREE.Vector2 };\r
      uTime: { value: number };\r
      uColor: { value: THREE.Color };\r
      uClickPos: { value: THREE.Vector2[] };\r
      uClickTimes: { value: Float32Array };\r
      uShapeType: { value: number };\r
      uPixelSize: { value: number };\r
      uScale: { value: number };\r
      uDensity: { value: number };\r
      uPixelJitter: { value: number };\r
      uEnableRipples: { value: number };\r
      uRippleSpeed: { value: number };\r
      uRippleThickness: { value: number };\r
      uRippleIntensity: { value: number };\r
      uEdgeFade: { value: number };\r
    };\r
    resizeObserver?: ResizeObserver;\r
    raf?: number;\r
    quad?: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;\r
    timeOffset?: number;\r
    composer?: EffectComposer;\r
    touch?: ReturnType<typeof createTouchTexture>;\r
    liquidEffect?: Effect;\r
  } | null>(null);\r
  const prevConfigRef = useRef<any>(null);\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
    speedRef.current = speed;\r
    const needsReinitKeys = ['antialias', 'liquid', 'noiseAmount'];\r
    const cfg = { antialias, liquid, noiseAmount };\r
    let mustReinit = false;\r
    if (!threeRef.current) mustReinit = true;\r
    else if (prevConfigRef.current) {\r
      for (const k of needsReinitKeys)\r
        if (prevConfigRef.current[k] !== (cfg as any)[k]) {\r
          mustReinit = true;\r
          break;\r
        }\r
    }\r
    if (mustReinit) {\r
      if (threeRef.current) {\r
        const t = threeRef.current;\r
        t.resizeObserver?.disconnect();\r
        cancelAnimationFrame(t.raf!);\r
        t.quad?.geometry.dispose();\r
        t.material.dispose();\r
        t.composer?.dispose();\r
        t.renderer.dispose();\r
        if (t.renderer.domElement.parentElement === container) container.removeChild(t.renderer.domElement);\r
        threeRef.current = null;\r
      }\r
      const canvas = document.createElement('canvas');\r
      const renderer = new THREE.WebGLRenderer({\r
        canvas,\r
        antialias,\r
        alpha: true,\r
        powerPreference: 'high-performance'\r
      });\r
      renderer.domElement.style.width = '100%';\r
      renderer.domElement.style.height = '100%';\r
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r
      container.appendChild(renderer.domElement);\r
      if (transparent) renderer.setClearAlpha(0);\r
      else renderer.setClearColor(0x000000, 1);\r
      const uniforms = {\r
        uResolution: { value: new THREE.Vector2(0, 0) },\r
        uTime: { value: 0 },\r
        uColor: { value: new THREE.Color(color) },\r
        uClickPos: {\r
          value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1))\r
        },\r
        uClickTimes: { value: new Float32Array(MAX_CLICKS) },\r
        uShapeType: { value: SHAPE_MAP[variant] ?? 0 },\r
        uPixelSize: { value: pixelSize * renderer.getPixelRatio() },\r
        uScale: { value: patternScale },\r
        uDensity: { value: patternDensity },\r
        uPixelJitter: { value: pixelSizeJitter },\r
        uEnableRipples: { value: enableRipples ? 1 : 0 },\r
        uRippleSpeed: { value: rippleSpeed },\r
        uRippleThickness: { value: rippleThickness },\r
        uRippleIntensity: { value: rippleIntensityScale },\r
        uEdgeFade: { value: edgeFade }\r
      };\r
      const scene = new THREE.Scene();\r
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
      const isWebGL2 = renderer.capabilities.isWebGL2;\r
      const material = new THREE.ShaderMaterial({\r
        vertexShader: VERTEX_SRC,\r
        fragmentShader: isWebGL2 ? FRAGMENT_SRC : FRAGMENT_SRC_GLSL1,\r
        uniforms,\r
        transparent: true,\r
        depthTest: false,\r
        depthWrite: false,\r
        glslVersion: isWebGL2 ? THREE.GLSL3 : undefined\r
      });\r
      const quadGeom = new THREE.PlaneGeometry(2, 2);\r
      const quad = new THREE.Mesh(quadGeom, material);\r
      scene.add(quad);\r
      const clock = new THREE.Clock();\r
      const setSize = () => {\r
        const w = container.clientWidth || 1;\r
        const h = container.clientHeight || 1;\r
        renderer.setSize(w, h, false);\r
        uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);\r
        if (threeRef.current?.composer)\r
          threeRef.current.composer.setSize(renderer.domElement.width, renderer.domElement.height);\r
        uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();\r
      };\r
      setSize();\r
      const ro = new ResizeObserver(setSize);\r
      ro.observe(container);\r
      const randomFloat = () => {\r
        if (typeof window !== 'undefined' && (window as any).crypto?.getRandomValues) {\r
          const u32 = new Uint32Array(1);\r
          window.crypto.getRandomValues(u32);\r
          return u32[0] / 0xffffffff;\r
        }\r
        return Math.random();\r
      };\r
      const timeOffset = randomFloat() * 1000;\r
      let composer: EffectComposer | undefined;\r
      let touch: ReturnType<typeof createTouchTexture> | undefined;\r
      let liquidEffect: Effect | undefined;\r
      if (liquid) {\r
        touch = createTouchTexture();\r
        touch.radiusScale = liquidRadius;\r
        composer = new EffectComposer(renderer);\r
        const renderPass = new RenderPass(scene, camera);\r
        liquidEffect = createLiquidEffect(touch.texture, {\r
          strength: liquidStrength,\r
          freq: liquidWobbleSpeed\r
        });\r
        const effectPass = new EffectPass(camera, liquidEffect);\r
        effectPass.renderToScreen = true;\r
        composer.addPass(renderPass);\r
        composer.addPass(effectPass);\r
      }\r
      if (noiseAmount > 0) {\r
        if (!composer) {\r
          composer = new EffectComposer(renderer);\r
          composer.addPass(new RenderPass(scene, camera));\r
        }\r
        const noiseEffect = new Effect(\r
          'NoiseEffect',\r
          \`uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} \`,\r
          {\r
            uniforms: new Map<string, THREE.Uniform>([\r
              ['uTime', new THREE.Uniform(0)],\r
              ['uAmount', new THREE.Uniform(noiseAmount)]\r
            ])\r
          }\r
        );\r
        const noisePass = new EffectPass(camera, noiseEffect);\r
        noisePass.renderToScreen = true;\r
        if (composer && composer.passes.length > 0) composer.passes.forEach(p => ((p as any).renderToScreen = false));\r
        composer.addPass(noisePass);\r
      }\r
      if (composer) composer.setSize(renderer.domElement.width, renderer.domElement.height);\r
      const mapToPixels = (e: PointerEvent) => {\r
        const rect = renderer.domElement.getBoundingClientRect();\r
        const scaleX = renderer.domElement.width / rect.width;\r
        const scaleY = renderer.domElement.height / rect.height;\r
        const fx = (e.clientX - rect.left) * scaleX;\r
        const fy = (rect.height - (e.clientY - rect.top)) * scaleY;\r
        return {\r
          fx,\r
          fy,\r
          w: renderer.domElement.width,\r
          h: renderer.domElement.height\r
        };\r
      };\r
      const onPointerDown = (e: PointerEvent) => {\r
        const { fx, fy } = mapToPixels(e);\r
        const ix = threeRef.current?.clickIx ?? 0;\r
        uniforms.uClickPos.value[ix].set(fx, fy);\r
        uniforms.uClickTimes.value[ix] = uniforms.uTime.value;\r
        if (threeRef.current) threeRef.current.clickIx = (ix + 1) % MAX_CLICKS;\r
      };\r
      const onPointerMove = (e: PointerEvent) => {\r
        if (!touch) return;\r
        const { fx, fy, w, h } = mapToPixels(e);\r
        touch.addTouch({ x: fx / w, y: fy / h });\r
      };\r
      renderer.domElement.addEventListener('pointerdown', onPointerDown, {\r
        passive: true\r
      });\r
      renderer.domElement.addEventListener('pointermove', onPointerMove, {\r
        passive: true\r
      });\r
      let raf = 0;\r
      const animate = () => {\r
        if (autoPauseOffscreen && !visibilityRef.current.visible) {\r
          raf = requestAnimationFrame(animate);\r
          return;\r
        }\r
        uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speedRef.current;\r
        if (liquidEffect) (liquidEffect as any).uniforms.get('uTime').value = uniforms.uTime.value;\r
        if (composer) {\r
          if (touch) touch.update();\r
          composer.passes.forEach(p => {\r
            const effs = (p as any).effects;\r
            if (effs)\r
              effs.forEach((eff: any) => {\r
                const u = eff.uniforms?.get('uTime');\r
                if (u) u.value = uniforms.uTime.value;\r
              });\r
          });\r
          composer.render();\r
        } else renderer.render(scene, camera);\r
        raf = requestAnimationFrame(animate);\r
      };\r
      raf = requestAnimationFrame(animate);\r
      threeRef.current = {\r
        renderer,\r
        scene,\r
        camera,\r
        material,\r
        clock,\r
        clickIx: 0,\r
        uniforms,\r
        resizeObserver: ro,\r
        raf,\r
        quad,\r
        timeOffset,\r
        composer,\r
        touch,\r
        liquidEffect\r
      };\r
    } else {\r
      const t = threeRef.current!;\r
      t.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0;\r
      t.uniforms.uPixelSize.value = pixelSize * t.renderer.getPixelRatio();\r
      t.uniforms.uColor.value.set(color);\r
      t.uniforms.uScale.value = patternScale;\r
      t.uniforms.uDensity.value = patternDensity;\r
      t.uniforms.uPixelJitter.value = pixelSizeJitter;\r
      t.uniforms.uEnableRipples.value = enableRipples ? 1 : 0;\r
      t.uniforms.uRippleIntensity.value = rippleIntensityScale;\r
      t.uniforms.uRippleThickness.value = rippleThickness;\r
      t.uniforms.uRippleSpeed.value = rippleSpeed;\r
      t.uniforms.uEdgeFade.value = edgeFade;\r
      if (transparent) t.renderer.setClearAlpha(0);\r
      else t.renderer.setClearColor(0x000000, 1);\r
      if (t.liquidEffect) {\r
        const uStrength = (t.liquidEffect as any).uniforms.get('uStrength');\r
        if (uStrength) uStrength.value = liquidStrength;\r
        const uFreq = (t.liquidEffect as any).uniforms.get('uFreq');\r
        if (uFreq) uFreq.value = liquidWobbleSpeed;\r
      }\r
      if (t.touch) t.touch.radiusScale = liquidRadius;\r
    }\r
    prevConfigRef.current = cfg;\r
    return () => {\r
      if (threeRef.current && mustReinit) return;\r
      if (!threeRef.current) return;\r
      const t = threeRef.current;\r
      t.resizeObserver?.disconnect();\r
      cancelAnimationFrame(t.raf!);\r
      t.quad?.geometry.dispose();\r
      t.material.dispose();\r
      t.composer?.dispose();\r
      t.renderer.dispose();\r
      if (t.renderer.domElement.parentElement === container) container.removeChild(t.renderer.domElement);\r
      threeRef.current = null;\r
    };\r
  }, [\r
    antialias,\r
    liquid,\r
    noiseAmount,\r
    pixelSize,\r
    patternScale,\r
    patternDensity,\r
    enableRipples,\r
    rippleIntensityScale,\r
    rippleThickness,\r
    rippleSpeed,\r
    pixelSizeJitter,\r
    edgeFade,\r
    transparent,\r
    liquidStrength,\r
    liquidRadius,\r
    liquidWobbleSpeed,\r
    autoPauseOffscreen,\r
    variant,\r
    color,\r
    speed\r
  ]);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`w-full h-full relative overflow-hidden \${className ?? ''}\`}\r
      style={style}\r
      aria-label="PixelBlast interactive background"\r
    />\r
  );\r
};\r
\r
export default PixelBlast;\r
`,er={dependencies:"three postprocessing",usage:`// Component inspired by github.com/zavalit/bayer-dithering-webgl-demo
  
import PixelBlast from './PixelBlast';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PixelBlast
    variant="circle"
    pixelSize={6}
    color="#B19EEF"
    patternScale={3}
    patternDensity={1.2}
    pixelSizeJitter={0.5}
    enableRipples
    rippleSpeed={0.4}
    rippleThickness={0.12}
    rippleIntensityScale={1.5}
    liquid
    liquidStrength={0.12}
    liquidRadius={1.2}
    liquidWobbleSpeed={5}
    speed={0.6}
    edgeFade={0.25}
    transparent
  />
</div>`,code:je,css:Ye,tailwind:$e,tsCode:Qe,tsTailwind:Ze},mr=()=>{const[b,i]=p.useState("square"),[l,w]=p.useState(4),[S,y]=p.useState(2),[m,C]=p.useState(1),[q,k]=p.useState(0),[M,L]=p.useState(!0),[F,n]=p.useState(!1),[s,c]=p.useState(.5),[E,g]=p.useState(.25),[v,x]=p.useState("#B19EEF"),h=[{name:"variant",type:"'square'|'circle'|'triangle'|'diamond'",default:"'square'",description:"Pixel shape variant."},{name:"pixelSize",type:"number",default:"4",description:"Base pixel size (auto scaled for DPI)."},{name:"color",type:"string",default:"'#B19EEF'",description:"Pixel color."},{name:"patternScale",type:"number",default:"2",description:"Noise/pattern scale."},{name:"patternDensity",type:"number",default:"1",description:"Pattern density adjustment."},{name:"pixelSizeJitter",type:"number",default:"0",description:"Random jitter applied to coverage."},{name:"enableRipples",type:"boolean",default:"true",description:"Enable click ripple waves."},{name:"rippleSpeed",type:"number",default:"0.3",description:"Ripple propagation speed."},{name:"rippleThickness",type:"number",default:"0.1",description:"Ripple ring thickness."},{name:"rippleIntensityScale",type:"number",default:"1",description:"Ripple intensity multiplier."},{name:"liquid",type:"boolean",default:"false",description:"Enable liquid distortion effect."},{name:"liquidStrength",type:"number",default:"0.1",description:"Liquid distortion strength."},{name:"liquidRadius",type:"number",default:"1",description:"Liquid touch brush radius scale."},{name:"liquidWobbleSpeed",type:"number",default:"4.5",description:"Liquid wobble frequency."},{name:"speed",type:"number",default:"0.5",description:"Animation time scale."},{name:"edgeFade",type:"number",default:"0.25",description:"Edge fade distance (0-1)."},{name:"noiseAmount",type:"number",default:"0",description:"Post noise amount."},{name:"transparent",type:"boolean",default:"true",description:"Transparent background."}];return a.jsxs(Te,{children:[a.jsxs(Pe,{children:[a.jsxs(Ee,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:[a.jsx(Je,{variant:b,pixelSize:l,color:v,patternScale:S,patternDensity:m,pixelSizeJitter:q,enableRipples:M,liquid:F,speed:s,edgeFade:E}),a.jsx(Ie,{pillText:"New Background",headline:"It's dangerous to go alone! Take this."})]}),a.jsxs(ze,{children:[a.jsxs(ge,{alignItems:"center",mb:4,children:[a.jsx(ye,{fontSize:"sm",mr:2,children:"Color"}),a.jsx(Ce,{type:"color",value:v,onChange:T=>x(T.target.value),w:"50px",p:0})]}),a.jsx(Me,{title:"Variant",value:b,onChange:i,options:[{label:"Square",value:"square"},{label:"Circle",value:"circle"},{label:"Triangle",value:"triangle"},{label:"Diamond",value:"diamond"}]}),a.jsx(B,{title:"Pixel Size",min:1,max:5,step:1,value:l,onChange:w}),a.jsx(B,{title:"Pattern Scale",min:.25,max:8,step:.25,value:S,onChange:y}),a.jsx(B,{title:"Pattern Density",min:0,max:2,step:.05,value:m,onChange:C}),a.jsx(B,{title:"Pixel Jitter",min:0,max:2,step:.05,value:q,onChange:k}),a.jsx(B,{title:"Speed",min:0,max:3,step:.05,value:s,onChange:c}),a.jsx(B,{title:"Edge Fade",min:0,max:.5,step:.01,value:E,onChange:g}),a.jsx(ae,{title:"Ripples",isChecked:M,onChange:()=>L(T=>!T)}),a.jsx(ae,{title:"Liquid",isChecked:F,onChange:()=>n(T=>!T)})]}),a.jsx(be,{data:h}),a.jsx(qe,{dependencyList:["three","postprocessing"]})]}),a.jsx(we,{children:a.jsx(Ae,{codeObject:er})})]})};export{mr as default};
