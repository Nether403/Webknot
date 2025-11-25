import{r,j as e,B as Ee,I as ye,F as be,T as Ge,d as Oe}from"./index-wsKSLPNH.js";import{T as Le,P as De,a as Me,C as Pe,b as Ie}from"./PropTable-C4uPWs8h.js";import{C as We}from"./Customize-1m_ZNqR9.js";import{P as Ce}from"./PreviewSelect-B8u33nUa.js";import{P as l}from"./PreviewSlider-m1G_aiYP.js";import{D as He}from"./Dependencies-BHoMfJUj.js";import{R as Be}from"./RefreshButton-CA3SFRlq.js";import{u as Xe}from"./useForceRerender-BCFU-k0M.js";import{W as Ne,d as Ve,S as ze,O as ke,B as Ue,e as Ye,f as he,g as je,R as qe,h as $e,M as Ke,V as Re,i as Ze}from"./three.module-0PRdiASR.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const Je=`
precision highp float;
attribute vec3 position;
void main(){
  gl_Position = vec4(position, 1.0);
}
`,Qe=`
#ifdef GL_ES
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float;
precision mediump int;

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform float uWispDensity;
uniform float uTiltScale;
uniform float uFlowTime;
uniform float uFogTime;
uniform float uBeamXFrac;
uniform float uBeamYFrac;
uniform float uFlowSpeed;
uniform float uVLenFactor;
uniform float uHLenFactor;
uniform float uFogIntensity;
uniform float uFogScale;
uniform float uWSpeed;
uniform float uWIntensity;
uniform float uFlowStrength;
uniform float uDecay;
uniform float uFalloffStart;
uniform float uFogFallSpeed;
uniform vec3 uColor;
uniform float uFade;

// Core beam/flare shaping and dynamics
#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define EPS 1e-6
#define EDGE_SOFT (DT_LOCAL*4.0)
#define DT_LOCAL 0.0038
#define TAP_RADIUS 6
#define R_H 150.0
#define R_V 150.0
#define FLARE_HEIGHT 16.0
#define FLARE_AMOUNT 8.0
#define FLARE_EXP 2.0
#define TOP_FADE_START 0.1
#define TOP_FADE_EXP 1.0
#define FLOW_PERIOD 0.5
#define FLOW_SHARPNESS 1.5

// Wisps (animated micro-streaks) that travel along the beam
#define W_BASE_X 1.5
#define W_LAYER_GAP 0.25
#define W_LANES 10
#define W_SIDE_DECAY 0.5
#define W_HALF 0.01
#define W_AA 0.15
#define W_CELL 20.0
#define W_SEG_MIN 0.01
#define W_SEG_MAX 0.55
#define W_CURVE_AMOUNT 15.0
#define W_CURVE_RANGE (FLARE_HEIGHT - 3.0)
#define W_BOTTOM_EXP 10.0

// Volumetric fog controls
#define FOG_ON 1
#define FOG_CONTRAST 1.2
#define FOG_SPEED_U 0.1
#define FOG_SPEED_V -0.1
#define FOG_OCTAVES 5
#define FOG_BOTTOM_BIAS 0.8
#define FOG_TILT_TO_MOUSE 0.05
#define FOG_TILT_DEADZONE 0.01
#define FOG_TILT_MAX_X 0.35
#define FOG_TILT_SHAPE 1.5
#define FOG_BEAM_MIN 0.0
#define FOG_BEAM_MAX 0.75
#define FOG_MASK_GAMMA 0.5
#define FOG_EXPAND_SHAPE 12.2
#define FOG_EDGE_MIX 0.5

// Horizontal vignette for the fog volume
#define HFOG_EDGE_START 0.20
#define HFOG_EDGE_END 0.98
#define HFOG_EDGE_GAMMA 1.4
#define HFOG_Y_RADIUS 25.0
#define HFOG_Y_SOFT 60.0

// Beam extents and edge masking
#define EDGE_X0 0.22
#define EDGE_X1 0.995
#define EDGE_X_GAMMA 1.25
#define EDGE_LUMA_T0 0.0
#define EDGE_LUMA_T1 2.0
#define DITHER_STRENGTH 1.0

    float g(float x){return x<=0.00031308?12.92*x:1.055*pow(x,1.0/2.4)-0.055;}
    float bs(vec2 p,vec2 q,float powr){
        float d=distance(p,q),f=powr*uFalloffStart,r=(f*f)/(d*d+EPS);
        return powr*min(1.0,r);
    }
    float bsa(vec2 p,vec2 q,float powr,vec2 s){
        vec2 d=p-q; float dd=(d.x*d.x)/(s.x*s.x)+(d.y*d.y)/(s.y*s.y),f=powr*uFalloffStart,r=(f*f)/(dd+EPS);
        return powr*min(1.0,r);
    }
    float tri01(float x){float f=fract(x);return 1.0-abs(f*2.0-1.0);}
    float tauWf(float t,float tmin,float tmax){float a=smoothstep(tmin,tmin+EDGE_SOFT,t),b=1.0-smoothstep(tmax-EDGE_SOFT,tmax,t);return max(0.0,a*b);} 
    float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.123);return fract(p.x*p.y);}
    float vnoise(vec2 p){
        vec2 i=floor(p),f=fract(p);
        float a=h21(i),b=h21(i+vec2(1,0)),c=h21(i+vec2(0,1)),d=h21(i+vec2(1,1));
        vec2 u=f*f*(3.0-2.0*f);
        return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
    }
    float fbm2(vec2 p){
        float v=0.0,amp=0.6; mat2 m=mat2(0.86,0.5,-0.5,0.86);
        for(int i=0;i<FOG_OCTAVES;++i){v+=amp*vnoise(p); p=m*p*2.03+17.1; amp*=0.52;}
        return v;
    }
    float rGate(float x,float l){float a=smoothstep(0.0,W_AA,x),b=1.0-smoothstep(l,l+W_AA,x);return max(0.0,a*b);}
    float flareY(float y){float t=clamp(1.0-(clamp(y,0.0,FLARE_HEIGHT)/max(FLARE_HEIGHT,EPS)),0.0,1.0);return pow(t,FLARE_EXP);}

    float vWisps(vec2 uv,float topF){
    float y=uv.y,yf=(y+uFlowTime*uWSpeed)/W_CELL;
    float dRaw=clamp(uWispDensity,0.0,2.0),d=dRaw<=0.0?1.0:dRaw;
    float lanesF=floor(float(W_LANES)*min(d,1.0)+0.5); // WebGL1-safe
    int lanes=int(max(1.0,lanesF));
    float sp=min(d,1.0),ep=max(d-1.0,0.0);
    float fm=flareY(max(y,0.0)),rm=clamp(1.0-(y/max(W_CURVE_RANGE,EPS)),0.0,1.0),cm=fm*rm;
    const float G=0.05; float xS=1.0+(FLARE_AMOUNT*W_CURVE_AMOUNT*G)*cm;
    float sPix=clamp(y/R_V,0.0,1.0),bGain=pow(1.0-sPix,W_BOTTOM_EXP),sum=0.0;
    for(int s=0;s<2;++s){
        float sgn=s==0?-1.0:1.0;
        for(int i=0;i<W_LANES;++i){
            if(i>=lanes) break;
            float off=W_BASE_X+float(i)*W_LAYER_GAP,xc=sgn*(off*xS);
            float dx=abs(uv.x-xc),lat=1.0-smoothstep(W_HALF,W_HALF+W_AA,dx),amp=exp(-off*W_SIDE_DECAY);
            float seed=h21(vec2(off,sgn*17.0)),yf2=yf+seed*7.0,ci=floor(yf2),fy=fract(yf2);
            float seg=mix(W_SEG_MIN,W_SEG_MAX,h21(vec2(ci,off*2.3)));
            float spR=h21(vec2(ci,off+sgn*31.0)),seg1=rGate(fy,seg)*step(spR,sp);
            if(ep>0.0){float spR2=h21(vec2(ci*3.1+7.0,off*5.3+sgn*13.0)); float f2=fract(fy+0.5); seg1+=rGate(f2,seg*0.9)*step(spR2,ep);}
            sum+=amp*lat*seg1;
        }
    }
    float span=smoothstep(-3.0,0.0,y)*(1.0-smoothstep(R_V-6.0,R_V,y));
    return uWIntensity*sum*topF*bGain*span;
}

void mainImage(out vec4 fc,in vec2 frag){
    vec2 C=iResolution.xy*.5; float invW=1.0/max(C.x,1.0);
    float sc=512.0/iResolution.x*.4;
    vec2 uv=(frag-C)*sc,off=vec2(uBeamXFrac*iResolution.x*sc,uBeamYFrac*iResolution.y*sc);
    vec2 uvc = uv - off;
    float a=0.0,b=0.0;
    float basePhase=1.5*PI+uDecay*.5; float tauMin=basePhase-uDecay; float tauMax=basePhase;
    float cx=clamp(uvc.x/(R_H*uHLenFactor),-1.0,1.0),tH=clamp(TWO_PI-acos(cx),tauMin,tauMax);
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){
        float tu=tH+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;
        float spd=max(abs(sin(tu)),0.02),u=clamp((basePhase-tu)/max(uDecay,EPS),0.0,1.0),env=pow(1.0-abs(u*2.0-1.0),0.8);
        vec2 p=vec2((R_H*uHLenFactor)*cos(tu),0.0);
        a+=wt*bs(uvc,p,env*spd);
    }
    float yPix=uvc.y,cy=clamp(-yPix/(R_V*uVLenFactor),-1.0,1.0),tV=clamp(TWO_PI-acos(cy),tauMin,tauMax);
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){
        float tu=tV+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;
        float yb=(-R_V)*cos(tu),s=clamp(yb/R_V,0.0,1.0),spd=max(abs(sin(tu)),0.02);
        float env=pow(1.0-s,0.6)*spd;
        float cap=1.0-smoothstep(TOP_FADE_START,1.0,s); cap=pow(cap,TOP_FADE_EXP); env*=cap;
        float ph=s/max(FLOW_PERIOD,EPS)+uFlowTime*uFlowSpeed;
        float fl=pow(tri01(ph),FLOW_SHARPNESS);
        env*=mix(1.0-uFlowStrength,1.0,fl);
        float yp=(-R_V*uVLenFactor)*cos(tu),m=pow(smoothstep(FLARE_HEIGHT,0.0,yp),FLARE_EXP),wx=1.0+FLARE_AMOUNT*m;
        vec2 sig=vec2(wx,1.0),p=vec2(0.0,yp);
        float mask=step(0.0,yp);
        b+=wt*bsa(uvc,p,mask*env,sig);
    }
    float sPix=clamp(yPix/R_V,0.0,1.0),topA=pow(1.0-smoothstep(TOP_FADE_START,1.0,sPix),TOP_FADE_EXP);
    float L=a+b*topA;
    float w=vWisps(vec2(uvc.x,yPix),topA);
    float fog=0.0;
#if FOG_ON
    vec2 fuv=uvc*uFogScale;
    float mAct=step(1.0,length(iMouse.xy)),nx=((iMouse.x-C.x)*invW)*mAct;
    float ax = abs(nx);
    float stMag = mix(ax, pow(ax, FOG_TILT_SHAPE), 0.35);
    float st = sign(nx) * stMag * uTiltScale;
    st = clamp(st, -FOG_TILT_MAX_X, FOG_TILT_MAX_X);
    vec2 dir=normalize(vec2(st,1.0));
    fuv+=uFogTime*uFogFallSpeed*dir;
    vec2 prp=vec2(-dir.y,dir.x);
    fuv+=prp*(0.08*sin(dot(uvc,prp)*0.08+uFogTime*0.9));
    float n=fbm2(fuv+vec2(fbm2(fuv+vec2(7.3,2.1)),fbm2(fuv+vec2(-3.7,5.9)))*0.6);
    n=pow(clamp(n,0.0,1.0),FOG_CONTRAST);
    float pixW = 1.0 / max(iResolution.y, 1.0);
#ifdef GL_OES_standard_derivatives
    float wL = max(fwidth(L), pixW);
#else
    float wL = pixW;
#endif
    float m0=pow(smoothstep(FOG_BEAM_MIN - wL, FOG_BEAM_MAX + wL, L),FOG_MASK_GAMMA);
    float bm=1.0-pow(1.0-m0,FOG_EXPAND_SHAPE); bm=mix(bm*m0,bm,FOG_EDGE_MIX);
    float yP=1.0-smoothstep(HFOG_Y_RADIUS,HFOG_Y_RADIUS+HFOG_Y_SOFT,abs(yPix));
    float nxF=abs((frag.x-C.x)*invW),hE=1.0-smoothstep(HFOG_EDGE_START,HFOG_EDGE_END,nxF); hE=pow(clamp(hE,0.0,1.0),HFOG_EDGE_GAMMA);
    float hW=mix(1.0,hE,clamp(yP,0.0,1.0));
    float bBias=mix(1.0,1.0-sPix,FOG_BOTTOM_BIAS);
    float browserFogIntensity = uFogIntensity;
    browserFogIntensity *= 1.8;
    float radialFade = 1.0 - smoothstep(0.0, 0.7, length(uvc) / 120.0);
    float safariFog = n * browserFogIntensity * bBias * bm * hW * radialFade;
    fog = safariFog;
#endif
    float LF=L+fog;
    float dith=(h21(frag)-0.5)*(DITHER_STRENGTH/255.0);
    float tone=g(LF+w);
    vec3 col=tone*uColor+dith;
    float alpha=clamp(g(L+w*0.6)+dith*0.6,0.0,1.0);
    float nxE=abs((frag.x-C.x)*invW),xF=pow(clamp(1.0-smoothstep(EDGE_X0,EDGE_X1,nxE),0.0,1.0),EDGE_X_GAMMA);
    float scene=LF+max(0.0,w)*0.5,hi=smoothstep(EDGE_LUMA_T0,EDGE_LUMA_T1,scene);
    float eM=mix(xF,1.0,hi);
    col*=eM; alpha*=eM;
    col*=uFade; alpha*=uFade;
    fc=vec4(col,alpha);
}

void main(){
  vec4 fc;
  mainImage(fc, gl_FragCoord.xy);
  gl_FragColor = fc;
}
`,en=({className:q,style:b,wispDensity:G=1,dpr:k,mouseSmoothTime:d=0,mouseTiltStrength:O=.01,horizontalBeamOffset:v=.1,verticalBeamOffset:L=0,flowSpeed:E=.35,verticalSizing:D=2,horizontalSizing:h=.5,fogIntensity:M=.45,fogScale:R=.3,wispSpeed:P=15,wispIntensity:x=5,flowStrength:I=.25,decay:g=1.1,falloffStart:W=1.2,fogFallSpeed:S=.6,color:U="#FF79C6"})=>{const C=r.useRef(null),$=r.useRef(null),H=r.useRef(null),T=r.useRef(!1),B=r.useRef(null),X=r.useRef(1),i=r.useRef(1),N=r.useRef([]),w=r.useRef(performance.now()),V=r.useRef(16.7),_=r.useRef(!1),Y=r.useRef(!0),K=t=>{let n=t.trim();n[0]==="#"&&(n=n.slice(1)),n.length===3&&(n=n.split("").map(c=>c+c).join(""));const a=parseInt(n,16)||16777215;return{r:(a>>16&255)/255,g:(a>>8&255)/255,b:(a&255)/255}};return r.useEffect(()=>{const t=C.current,n=new Ne({antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",premultipliedAlpha:!1,preserveDrawingBuffer:!1,failIfMajorPerformanceCaveat:!1,logarithmicDepthBuffer:!1});$.current=n,X.current=Math.min(k??(window.devicePixelRatio||1),2),i.current=X.current,n.setPixelRatio(i.current),n.shadowMap.enabled=!1,n.outputColorSpace=Ve,n.setClearColor(0,1);const a=n.domElement;a.style.width="100%",a.style.height="100%",a.style.display="block",t.appendChild(a);const c=new ze,Z=new ke(-1,1,1,-1,0,1),F=new Ue;F.setAttribute("position",new Ye(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));const p={iTime:{value:0},iResolution:{value:new he(1,1,1)},iMouse:{value:new je(0,0,0,0)},uWispDensity:{value:G},uTiltScale:{value:O},uFlowTime:{value:0},uFogTime:{value:0},uBeamXFrac:{value:v},uBeamYFrac:{value:L},uFlowSpeed:{value:E},uVLenFactor:{value:D},uHLenFactor:{value:h},uFogIntensity:{value:M},uFogScale:{value:R},uWSpeed:{value:P},uWIntensity:{value:x},uFlowStrength:{value:I},uDecay:{value:g},uFalloffStart:{value:W},uFogFallSpeed:{value:S},uColor:{value:new he(1,1,1)},uFade:{value:T.current?1:0}};H.current=p;const re=new qe({vertexShader:Je,fragmentShader:Qe,uniforms:p,transparent:!1,depthTest:!1,depthWrite:!1,blending:$e}),te=new Ke(F,re);te.frustumCulled=!1,c.add(te);const xe=new Ze;let ae=0,j=T.current?1:0;const J=new Re(0,0),Q=new Re(0,0),ee=()=>{const o=t.clientWidth||1,f=t.clientHeight||1,s=i.current;n.setPixelRatio(s),n.setSize(o,f,!1),p.iResolution.value.set(o*s,f*s,s),B.current=a.getBoundingClientRect()};let ne=0;const oe=()=>{ne&&cancelAnimationFrame(ne),ne=requestAnimationFrame(ee)};ee();const se=new ResizeObserver(oe);se.observe(t);const ie=new IntersectionObserver(o=>{var f;Y.current=((f=o[0])==null?void 0:f.isIntersecting)??!0},{root:null,threshold:0});ie.observe(t);const fe=()=>{_.current=document.hidden};document.addEventListener("visibilitychange",fe,{passive:!0});const ge=(o,f)=>{const s=B.current;if(!s)return;const y=o-s.left,u=f-s.top,m=i.current,z=s.height*m;J.set(y*m,z-u*m)},A=o=>ge(o.clientX,o.clientY),le=()=>J.set(0,0);a.addEventListener("pointermove",A,{passive:!0}),a.addEventListener("pointerdown",A,{passive:!0}),a.addEventListener("pointerenter",A,{passive:!0}),a.addEventListener("pointerleave",le,{passive:!0});const ue=o=>{o.preventDefault(),_.current=!0},ce=()=>{_.current=!1,oe()};a.addEventListener("webglcontextlost",ue,!1),a.addEventListener("webglcontextrestored",ce,!1);let me=0;const pe=(o,f,s)=>Math.max(f,Math.min(s,o)),de=.6,Se=50,Te=58;let ve=0;const we=2e3,Ae=o=>{if(o-w.current<750)return;const s=N.current;if(s.length===0){w.current=o;return}const y=s.reduce((z,Fe)=>z+Fe,0)/s.length;let u=i.current;const m=X.current;y<Se?u=pe(i.current*.85,de,m):y>Te&&i.current<m&&(u=pe(i.current*1.1,de,m)),Math.abs(u-i.current)>.01&&o-ve>we&&(i.current=u,ve=o,ee()),N.current=[],w.current=o},_e=()=>{if(me=requestAnimationFrame(_e),_.current||!Y.current)return;const o=xe.getElapsedTime(),f=Math.max(0,o-ae);ae=o;const s=f*1e3;V.current=V.current*.9+s*.1;const y=1e3/Math.max(1,V.current);N.current.push(y),p.iTime.value=o;const u=Math.min(.033,Math.max(.001,f));p.uFlowTime.value+=u,p.uFogTime.value+=u,T.current||(j=Math.min(1,j+u/1),p.uFade.value=j,j>=1&&(T.current=!0));const m=Math.max(.001,d),z=1-Math.exp(-u/m);Q.lerp(J,z),p.iMouse.value.set(Q.x,Q.y,0,0),n.render(c,Z),Ae(performance.now())};return _e(),()=>{cancelAnimationFrame(me),se.disconnect(),ie.disconnect(),document.removeEventListener("visibilitychange",fe),a.removeEventListener("pointermove",A),a.removeEventListener("pointerdown",A),a.removeEventListener("pointerenter",A),a.removeEventListener("pointerleave",le),a.removeEventListener("webglcontextlost",ue),a.removeEventListener("webglcontextrestored",ce),F.dispose(),re.dispose(),n.dispose(),t.contains(a)&&t.removeChild(a)}},[k]),r.useEffect(()=>{const t=H.current;if(!t)return;t.uWispDensity.value=G,t.uTiltScale.value=O,t.uBeamXFrac.value=v,t.uBeamYFrac.value=L,t.uFlowSpeed.value=E,t.uVLenFactor.value=D,t.uHLenFactor.value=h,t.uFogIntensity.value=M,t.uFogScale.value=R,t.uWSpeed.value=P,t.uWIntensity.value=x,t.uFlowStrength.value=I,t.uDecay.value=g,t.uFalloffStart.value=W,t.uFogFallSpeed.value=S;const{r:n,g:a,b:c}=K(U||"#FFFFFF");t.uColor.value.set(n,a,c)},[G,O,v,L,E,D,h,M,R,P,x,I,g,W,S,U]),e.jsx("div",{ref:C,className:`laser-flow-container ${q||""}`,style:b})},nn=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import './LaserFlow.css';\r
\r
const VERT = \`\r
precision highp float;\r
attribute vec3 position;\r
void main(){\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
const FRAG = \`\r
#ifdef GL_ES\r
#extension GL_OES_standard_derivatives : enable\r
#endif\r
precision highp float;\r
precision mediump int;\r
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform vec4 iMouse;\r
uniform float uWispDensity;\r
uniform float uTiltScale;\r
uniform float uFlowTime;\r
uniform float uFogTime;\r
uniform float uBeamXFrac;\r
uniform float uBeamYFrac;\r
uniform float uFlowSpeed;\r
uniform float uVLenFactor;\r
uniform float uHLenFactor;\r
uniform float uFogIntensity;\r
uniform float uFogScale;\r
uniform float uWSpeed;\r
uniform float uWIntensity;\r
uniform float uFlowStrength;\r
uniform float uDecay;\r
uniform float uFalloffStart;\r
uniform float uFogFallSpeed;\r
uniform vec3 uColor;\r
uniform float uFade;\r
\r
// Core beam/flare shaping and dynamics\r
#define PI 3.14159265359\r
#define TWO_PI 6.28318530718\r
#define EPS 1e-6\r
#define EDGE_SOFT (DT_LOCAL*4.0)\r
#define DT_LOCAL 0.0038\r
#define TAP_RADIUS 6\r
#define R_H 150.0\r
#define R_V 150.0\r
#define FLARE_HEIGHT 16.0\r
#define FLARE_AMOUNT 8.0\r
#define FLARE_EXP 2.0\r
#define TOP_FADE_START 0.1\r
#define TOP_FADE_EXP 1.0\r
#define FLOW_PERIOD 0.5\r
#define FLOW_SHARPNESS 1.5\r
\r
// Wisps (animated micro-streaks) that travel along the beam\r
#define W_BASE_X 1.5\r
#define W_LAYER_GAP 0.25\r
#define W_LANES 10\r
#define W_SIDE_DECAY 0.5\r
#define W_HALF 0.01\r
#define W_AA 0.15\r
#define W_CELL 20.0\r
#define W_SEG_MIN 0.01\r
#define W_SEG_MAX 0.55\r
#define W_CURVE_AMOUNT 15.0\r
#define W_CURVE_RANGE (FLARE_HEIGHT - 3.0)\r
#define W_BOTTOM_EXP 10.0\r
\r
// Volumetric fog controls\r
#define FOG_ON 1\r
#define FOG_CONTRAST 1.2\r
#define FOG_SPEED_U 0.1\r
#define FOG_SPEED_V -0.1\r
#define FOG_OCTAVES 5\r
#define FOG_BOTTOM_BIAS 0.8\r
#define FOG_TILT_TO_MOUSE 0.05\r
#define FOG_TILT_DEADZONE 0.01\r
#define FOG_TILT_MAX_X 0.35\r
#define FOG_TILT_SHAPE 1.5\r
#define FOG_BEAM_MIN 0.0\r
#define FOG_BEAM_MAX 0.75\r
#define FOG_MASK_GAMMA 0.5\r
#define FOG_EXPAND_SHAPE 12.2\r
#define FOG_EDGE_MIX 0.5\r
\r
// Horizontal vignette for the fog volume\r
#define HFOG_EDGE_START 0.20\r
#define HFOG_EDGE_END 0.98\r
#define HFOG_EDGE_GAMMA 1.4\r
#define HFOG_Y_RADIUS 25.0\r
#define HFOG_Y_SOFT 60.0\r
\r
// Beam extents and edge masking\r
#define EDGE_X0 0.22\r
#define EDGE_X1 0.995\r
#define EDGE_X_GAMMA 1.25\r
#define EDGE_LUMA_T0 0.0\r
#define EDGE_LUMA_T1 2.0\r
#define DITHER_STRENGTH 1.0\r
\r
    float g(float x){return x<=0.00031308?12.92*x:1.055*pow(x,1.0/2.4)-0.055;}\r
    float bs(vec2 p,vec2 q,float powr){\r
        float d=distance(p,q),f=powr*uFalloffStart,r=(f*f)/(d*d+EPS);\r
        return powr*min(1.0,r);\r
    }\r
    float bsa(vec2 p,vec2 q,float powr,vec2 s){\r
        vec2 d=p-q; float dd=(d.x*d.x)/(s.x*s.x)+(d.y*d.y)/(s.y*s.y),f=powr*uFalloffStart,r=(f*f)/(dd+EPS);\r
        return powr*min(1.0,r);\r
    }\r
    float tri01(float x){float f=fract(x);return 1.0-abs(f*2.0-1.0);}\r
    float tauWf(float t,float tmin,float tmax){float a=smoothstep(tmin,tmin+EDGE_SOFT,t),b=1.0-smoothstep(tmax-EDGE_SOFT,tmax,t);return max(0.0,a*b);} \r
    float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.123);return fract(p.x*p.y);}\r
    float vnoise(vec2 p){\r
        vec2 i=floor(p),f=fract(p);\r
        float a=h21(i),b=h21(i+vec2(1,0)),c=h21(i+vec2(0,1)),d=h21(i+vec2(1,1));\r
        vec2 u=f*f*(3.0-2.0*f);\r
        return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\r
    }\r
    float fbm2(vec2 p){\r
        float v=0.0,amp=0.6; mat2 m=mat2(0.86,0.5,-0.5,0.86);\r
        for(int i=0;i<FOG_OCTAVES;++i){v+=amp*vnoise(p); p=m*p*2.03+17.1; amp*=0.52;}\r
        return v;\r
    }\r
    float rGate(float x,float l){float a=smoothstep(0.0,W_AA,x),b=1.0-smoothstep(l,l+W_AA,x);return max(0.0,a*b);}\r
    float flareY(float y){float t=clamp(1.0-(clamp(y,0.0,FLARE_HEIGHT)/max(FLARE_HEIGHT,EPS)),0.0,1.0);return pow(t,FLARE_EXP);}\r
\r
    float vWisps(vec2 uv,float topF){\r
    float y=uv.y,yf=(y+uFlowTime*uWSpeed)/W_CELL;\r
    float dRaw=clamp(uWispDensity,0.0,2.0),d=dRaw<=0.0?1.0:dRaw;\r
    float lanesF=floor(float(W_LANES)*min(d,1.0)+0.5); // WebGL1-safe\r
    int lanes=int(max(1.0,lanesF));\r
    float sp=min(d,1.0),ep=max(d-1.0,0.0);\r
    float fm=flareY(max(y,0.0)),rm=clamp(1.0-(y/max(W_CURVE_RANGE,EPS)),0.0,1.0),cm=fm*rm;\r
    const float G=0.05; float xS=1.0+(FLARE_AMOUNT*W_CURVE_AMOUNT*G)*cm;\r
    float sPix=clamp(y/R_V,0.0,1.0),bGain=pow(1.0-sPix,W_BOTTOM_EXP),sum=0.0;\r
    for(int s=0;s<2;++s){\r
        float sgn=s==0?-1.0:1.0;\r
        for(int i=0;i<W_LANES;++i){\r
            if(i>=lanes) break;\r
            float off=W_BASE_X+float(i)*W_LAYER_GAP,xc=sgn*(off*xS);\r
            float dx=abs(uv.x-xc),lat=1.0-smoothstep(W_HALF,W_HALF+W_AA,dx),amp=exp(-off*W_SIDE_DECAY);\r
            float seed=h21(vec2(off,sgn*17.0)),yf2=yf+seed*7.0,ci=floor(yf2),fy=fract(yf2);\r
            float seg=mix(W_SEG_MIN,W_SEG_MAX,h21(vec2(ci,off*2.3)));\r
            float spR=h21(vec2(ci,off+sgn*31.0)),seg1=rGate(fy,seg)*step(spR,sp);\r
            if(ep>0.0){float spR2=h21(vec2(ci*3.1+7.0,off*5.3+sgn*13.0)); float f2=fract(fy+0.5); seg1+=rGate(f2,seg*0.9)*step(spR2,ep);}\r
            sum+=amp*lat*seg1;\r
        }\r
    }\r
    float span=smoothstep(-3.0,0.0,y)*(1.0-smoothstep(R_V-6.0,R_V,y));\r
    return uWIntensity*sum*topF*bGain*span;\r
}\r
\r
void mainImage(out vec4 fc,in vec2 frag){\r
    vec2 C=iResolution.xy*.5; float invW=1.0/max(C.x,1.0);\r
    float sc=512.0/iResolution.x*.4;\r
    vec2 uv=(frag-C)*sc,off=vec2(uBeamXFrac*iResolution.x*sc,uBeamYFrac*iResolution.y*sc);\r
    vec2 uvc = uv - off;\r
    float a=0.0,b=0.0;\r
    float basePhase=1.5*PI+uDecay*.5; float tauMin=basePhase-uDecay; float tauMax=basePhase;\r
    float cx=clamp(uvc.x/(R_H*uHLenFactor),-1.0,1.0),tH=clamp(TWO_PI-acos(cx),tauMin,tauMax);\r
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){\r
        float tu=tH+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;\r
        float spd=max(abs(sin(tu)),0.02),u=clamp((basePhase-tu)/max(uDecay,EPS),0.0,1.0),env=pow(1.0-abs(u*2.0-1.0),0.8);\r
        vec2 p=vec2((R_H*uHLenFactor)*cos(tu),0.0);\r
        a+=wt*bs(uvc,p,env*spd);\r
    }\r
    float yPix=uvc.y,cy=clamp(-yPix/(R_V*uVLenFactor),-1.0,1.0),tV=clamp(TWO_PI-acos(cy),tauMin,tauMax);\r
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){\r
        float tu=tV+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;\r
        float yb=(-R_V)*cos(tu),s=clamp(yb/R_V,0.0,1.0),spd=max(abs(sin(tu)),0.02);\r
        float env=pow(1.0-s,0.6)*spd;\r
        float cap=1.0-smoothstep(TOP_FADE_START,1.0,s); cap=pow(cap,TOP_FADE_EXP); env*=cap;\r
        float ph=s/max(FLOW_PERIOD,EPS)+uFlowTime*uFlowSpeed;\r
        float fl=pow(tri01(ph),FLOW_SHARPNESS);\r
        env*=mix(1.0-uFlowStrength,1.0,fl);\r
        float yp=(-R_V*uVLenFactor)*cos(tu),m=pow(smoothstep(FLARE_HEIGHT,0.0,yp),FLARE_EXP),wx=1.0+FLARE_AMOUNT*m;\r
        vec2 sig=vec2(wx,1.0),p=vec2(0.0,yp);\r
        float mask=step(0.0,yp);\r
        b+=wt*bsa(uvc,p,mask*env,sig);\r
    }\r
    float sPix=clamp(yPix/R_V,0.0,1.0),topA=pow(1.0-smoothstep(TOP_FADE_START,1.0,sPix),TOP_FADE_EXP);\r
    float L=a+b*topA;\r
    float w=vWisps(vec2(uvc.x,yPix),topA);\r
    float fog=0.0;\r
#if FOG_ON\r
    vec2 fuv=uvc*uFogScale;\r
    float mAct=step(1.0,length(iMouse.xy)),nx=((iMouse.x-C.x)*invW)*mAct;\r
    float ax = abs(nx);\r
    float stMag = mix(ax, pow(ax, FOG_TILT_SHAPE), 0.35);\r
    float st = sign(nx) * stMag * uTiltScale;\r
    st = clamp(st, -FOG_TILT_MAX_X, FOG_TILT_MAX_X);\r
    vec2 dir=normalize(vec2(st,1.0));\r
    fuv+=uFogTime*uFogFallSpeed*dir;\r
    vec2 prp=vec2(-dir.y,dir.x);\r
    fuv+=prp*(0.08*sin(dot(uvc,prp)*0.08+uFogTime*0.9));\r
    float n=fbm2(fuv+vec2(fbm2(fuv+vec2(7.3,2.1)),fbm2(fuv+vec2(-3.7,5.9)))*0.6);\r
    n=pow(clamp(n,0.0,1.0),FOG_CONTRAST);\r
    float pixW = 1.0 / max(iResolution.y, 1.0);\r
#ifdef GL_OES_standard_derivatives\r
    float wL = max(fwidth(L), pixW);\r
#else\r
    float wL = pixW;\r
#endif\r
    float m0=pow(smoothstep(FOG_BEAM_MIN - wL, FOG_BEAM_MAX + wL, L),FOG_MASK_GAMMA);\r
    float bm=1.0-pow(1.0-m0,FOG_EXPAND_SHAPE); bm=mix(bm*m0,bm,FOG_EDGE_MIX);\r
    float yP=1.0-smoothstep(HFOG_Y_RADIUS,HFOG_Y_RADIUS+HFOG_Y_SOFT,abs(yPix));\r
    float nxF=abs((frag.x-C.x)*invW),hE=1.0-smoothstep(HFOG_EDGE_START,HFOG_EDGE_END,nxF); hE=pow(clamp(hE,0.0,1.0),HFOG_EDGE_GAMMA);\r
    float hW=mix(1.0,hE,clamp(yP,0.0,1.0));\r
    float bBias=mix(1.0,1.0-sPix,FOG_BOTTOM_BIAS);\r
    float browserFogIntensity = uFogIntensity;\r
    browserFogIntensity *= 1.8;\r
    float radialFade = 1.0 - smoothstep(0.0, 0.7, length(uvc) / 120.0);\r
    float safariFog = n * browserFogIntensity * bBias * bm * hW * radialFade;\r
    fog = safariFog;\r
#endif\r
    float LF=L+fog;\r
    float dith=(h21(frag)-0.5)*(DITHER_STRENGTH/255.0);\r
    float tone=g(LF+w);\r
    vec3 col=tone*uColor+dith;\r
    float alpha=clamp(g(L+w*0.6)+dith*0.6,0.0,1.0);\r
    float nxE=abs((frag.x-C.x)*invW),xF=pow(clamp(1.0-smoothstep(EDGE_X0,EDGE_X1,nxE),0.0,1.0),EDGE_X_GAMMA);\r
    float scene=LF+max(0.0,w)*0.5,hi=smoothstep(EDGE_LUMA_T0,EDGE_LUMA_T1,scene);\r
    float eM=mix(xF,1.0,hi);\r
    col*=eM; alpha*=eM;\r
    col*=uFade; alpha*=uFade;\r
    fc=vec4(col,alpha);\r
}\r
\r
void main(){\r
  vec4 fc;\r
  mainImage(fc, gl_FragCoord.xy);\r
  gl_FragColor = fc;\r
}\r
\`;\r
\r
export const LaserFlow = ({\r
  className,\r
  style,\r
  wispDensity = 1,\r
  dpr,\r
  mouseSmoothTime = 0.0,\r
  mouseTiltStrength = 0.01,\r
  horizontalBeamOffset = 0.1,\r
  verticalBeamOffset = 0.0,\r
  flowSpeed = 0.35,\r
  verticalSizing = 2.0,\r
  horizontalSizing = 0.5,\r
  fogIntensity = 0.45,\r
  fogScale = 0.3,\r
  wispSpeed = 15.0,\r
  wispIntensity = 5.0,\r
  flowStrength = 0.25,\r
  decay = 1.1,\r
  falloffStart = 1.2,\r
  fogFallSpeed = 0.6,\r
  color = '#FF79C6'\r
}) => {\r
  const mountRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const uniformsRef = useRef(null);\r
  const hasFadedRef = useRef(false);\r
  const rectRef = useRef(null);\r
  const baseDprRef = useRef(1);\r
  const currentDprRef = useRef(1);\r
  const fpsSamplesRef = useRef([]);\r
  const lastFpsCheckRef = useRef(performance.now());\r
  const emaDtRef = useRef(16.7);\r
  const pausedRef = useRef(false);\r
  const inViewRef = useRef(true);\r
\r
  const hexToRGB = hex => {\r
    let c = hex.trim();\r
    if (c[0] === '#') c = c.slice(1);\r
    if (c.length === 3)\r
      c = c\r
        .split('')\r
        .map(x => x + x)\r
        .join('');\r
    const n = parseInt(c, 16) || 0xffffff;\r
    return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };\r
  };\r
\r
  useEffect(() => {\r
    const mount = mountRef.current;\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      alpha: false,\r
      depth: false,\r
      stencil: false,\r
      powerPreference: 'high-performance',\r
      premultipliedAlpha: false,\r
      preserveDrawingBuffer: false,\r
      failIfMajorPerformanceCaveat: false,\r
      logarithmicDepthBuffer: false\r
    });\r
    rendererRef.current = renderer;\r
\r
    baseDprRef.current = Math.min(dpr ?? (window.devicePixelRatio || 1), 2);\r
    currentDprRef.current = baseDprRef.current;\r
\r
    renderer.setPixelRatio(currentDprRef.current);\r
    renderer.shadowMap.enabled = false;\r
    renderer.outputColorSpace = THREE.SRGBColorSpace;\r
    renderer.setClearColor(0x000000, 1);\r
    const canvas = renderer.domElement;\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    canvas.style.display = 'block';\r
    mount.appendChild(canvas);\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geometry = new THREE.BufferGeometry();\r
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));\r
\r
    const uniforms = {\r
      iTime: { value: 0 },\r
      iResolution: { value: new THREE.Vector3(1, 1, 1) },\r
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },\r
      uWispDensity: { value: wispDensity },\r
      uTiltScale: { value: mouseTiltStrength },\r
      uFlowTime: { value: 0 },\r
      uFogTime: { value: 0 },\r
      uBeamXFrac: { value: horizontalBeamOffset },\r
      uBeamYFrac: { value: verticalBeamOffset },\r
      uFlowSpeed: { value: flowSpeed },\r
      uVLenFactor: { value: verticalSizing },\r
      uHLenFactor: { value: horizontalSizing },\r
      uFogIntensity: { value: fogIntensity },\r
      uFogScale: { value: fogScale },\r
      uWSpeed: { value: wispSpeed },\r
      uWIntensity: { value: wispIntensity },\r
      uFlowStrength: { value: flowStrength },\r
      uDecay: { value: decay },\r
      uFalloffStart: { value: falloffStart },\r
      uFogFallSpeed: { value: fogFallSpeed },\r
      uColor: { value: new THREE.Vector3(1, 1, 1) },\r
      uFade: { value: hasFadedRef.current ? 1 : 0 }\r
    };\r
    uniformsRef.current = uniforms;\r
\r
    const material = new THREE.RawShaderMaterial({\r
      vertexShader: VERT,\r
      fragmentShader: FRAG,\r
      uniforms,\r
      transparent: false,\r
      depthTest: false,\r
      depthWrite: false,\r
      blending: THREE.NormalBlending\r
    });\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    mesh.frustumCulled = false;\r
    scene.add(mesh);\r
\r
    const clock = new THREE.Clock();\r
    let prevTime = 0;\r
    let fade = hasFadedRef.current ? 1 : 0;\r
\r
    const mouseTarget = new THREE.Vector2(0, 0);\r
    const mouseSmooth = new THREE.Vector2(0, 0);\r
\r
    const setSizeNow = () => {\r
      const w = mount.clientWidth || 1;\r
      const h = mount.clientHeight || 1;\r
      const pr = currentDprRef.current;\r
      renderer.setPixelRatio(pr);\r
      renderer.setSize(w, h, false);\r
      uniforms.iResolution.value.set(w * pr, h * pr, pr);\r
      rectRef.current = canvas.getBoundingClientRect();\r
    };\r
\r
    let resizeRaf = 0;\r
    const scheduleResize = () => {\r
      if (resizeRaf) cancelAnimationFrame(resizeRaf);\r
      resizeRaf = requestAnimationFrame(setSizeNow);\r
    };\r
\r
    setSizeNow();\r
    const ro = new ResizeObserver(scheduleResize);\r
    ro.observe(mount);\r
\r
    const io = new IntersectionObserver(\r
      entries => {\r
        inViewRef.current = entries[0]?.isIntersecting ?? true;\r
      },\r
      { root: null, threshold: 0 }\r
    );\r
    io.observe(mount);\r
\r
    const onVis = () => {\r
      pausedRef.current = document.hidden;\r
    };\r
    document.addEventListener('visibilitychange', onVis, { passive: true });\r
\r
    const updateMouse = (clientX, clientY) => {\r
      const rect = rectRef.current;\r
      if (!rect) return;\r
      const x = clientX - rect.left;\r
      const y = clientY - rect.top;\r
      const ratio = currentDprRef.current;\r
      const hb = rect.height * ratio;\r
      mouseTarget.set(x * ratio, hb - y * ratio);\r
    };\r
    const onMove = ev => updateMouse(ev.clientX, ev.clientY);\r
    const onLeave = () => mouseTarget.set(0, 0);\r
    canvas.addEventListener('pointermove', onMove, { passive: true });\r
    canvas.addEventListener('pointerdown', onMove, { passive: true });\r
    canvas.addEventListener('pointerenter', onMove, { passive: true });\r
    canvas.addEventListener('pointerleave', onLeave, { passive: true });\r
\r
    const onCtxLost = e => {\r
      e.preventDefault();\r
      pausedRef.current = true;\r
    };\r
    const onCtxRestored = () => {\r
      pausedRef.current = false;\r
      scheduleResize();\r
    };\r
    canvas.addEventListener('webglcontextlost', onCtxLost, false);\r
    canvas.addEventListener('webglcontextrestored', onCtxRestored, false);\r
\r
    let raf = 0;\r
\r
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));\r
    const dprFloor = 0.6;\r
    const lowerThresh = 50;\r
    const upperThresh = 58;\r
    let lastDprChangeRef = 0;\r
    const dprChangeCooldown = 2000;\r
\r
    const adjustDprIfNeeded = now => {\r
      const elapsed = now - lastFpsCheckRef.current;\r
      if (elapsed < 750) return;\r
\r
      const samples = fpsSamplesRef.current;\r
      if (samples.length === 0) {\r
        lastFpsCheckRef.current = now;\r
        return;\r
      }\r
      const avgFps = samples.reduce((a, b) => a + b, 0) / samples.length;\r
\r
      let next = currentDprRef.current;\r
      const base = baseDprRef.current;\r
\r
      if (avgFps < lowerThresh) {\r
        next = clamp(currentDprRef.current * 0.85, dprFloor, base);\r
      } else if (avgFps > upperThresh && currentDprRef.current < base) {\r
        next = clamp(currentDprRef.current * 1.1, dprFloor, base);\r
      }\r
\r
      if (Math.abs(next - currentDprRef.current) > 0.01 && now - lastDprChangeRef > dprChangeCooldown) {\r
        currentDprRef.current = next;\r
        lastDprChangeRef = now;\r
        setSizeNow();\r
      }\r
\r
      fpsSamplesRef.current = [];\r
      lastFpsCheckRef.current = now;\r
    };\r
\r
    const animate = () => {\r
      raf = requestAnimationFrame(animate);\r
      if (pausedRef.current || !inViewRef.current) return;\r
\r
      const t = clock.getElapsedTime();\r
      const dt = Math.max(0, t - prevTime);\r
      prevTime = t;\r
\r
      const dtMs = dt * 1000;\r
      emaDtRef.current = emaDtRef.current * 0.9 + dtMs * 0.1;\r
      const instFps = 1000 / Math.max(1, emaDtRef.current);\r
      fpsSamplesRef.current.push(instFps);\r
\r
      uniforms.iTime.value = t;\r
\r
      const cdt = Math.min(0.033, Math.max(0.001, dt));\r
      uniforms.uFlowTime.value += cdt;\r
      uniforms.uFogTime.value += cdt;\r
\r
      if (!hasFadedRef.current) {\r
        const fadeDur = 1.0;\r
        fade = Math.min(1, fade + cdt / fadeDur);\r
        uniforms.uFade.value = fade;\r
        if (fade >= 1) hasFadedRef.current = true;\r
      }\r
\r
      const tau = Math.max(1e-3, mouseSmoothTime);\r
      const alpha = 1 - Math.exp(-cdt / tau);\r
      mouseSmooth.lerp(mouseTarget, alpha);\r
      uniforms.iMouse.value.set(mouseSmooth.x, mouseSmooth.y, 0, 0);\r
\r
      renderer.render(scene, camera);\r
\r
      adjustDprIfNeeded(performance.now());\r
    };\r
\r
    animate();\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      ro.disconnect();\r
      io.disconnect();\r
      document.removeEventListener('visibilitychange', onVis);\r
      canvas.removeEventListener('pointermove', onMove);\r
      canvas.removeEventListener('pointerdown', onMove);\r
      canvas.removeEventListener('pointerenter', onMove);\r
      canvas.removeEventListener('pointerleave', onLeave);\r
      canvas.removeEventListener('webglcontextlost', onCtxLost);\r
      canvas.removeEventListener('webglcontextrestored', onCtxRestored);\r
      geometry.dispose();\r
      material.dispose();\r
      renderer.dispose();\r
      if (mount.contains(canvas)) mount.removeChild(canvas);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [dpr]);\r
\r
  useEffect(() => {\r
    const uniforms = uniformsRef.current;\r
    if (!uniforms) return;\r
\r
    uniforms.uWispDensity.value = wispDensity;\r
    uniforms.uTiltScale.value = mouseTiltStrength;\r
    uniforms.uBeamXFrac.value = horizontalBeamOffset;\r
    uniforms.uBeamYFrac.value = verticalBeamOffset;\r
    uniforms.uFlowSpeed.value = flowSpeed;\r
    uniforms.uVLenFactor.value = verticalSizing;\r
    uniforms.uHLenFactor.value = horizontalSizing;\r
    uniforms.uFogIntensity.value = fogIntensity;\r
    uniforms.uFogScale.value = fogScale;\r
    uniforms.uWSpeed.value = wispSpeed;\r
    uniforms.uWIntensity.value = wispIntensity;\r
    uniforms.uFlowStrength.value = flowStrength;\r
    uniforms.uDecay.value = decay;\r
    uniforms.uFalloffStart.value = falloffStart;\r
    uniforms.uFogFallSpeed.value = fogFallSpeed;\r
\r
    const { r, g, b } = hexToRGB(color || '#FFFFFF');\r
    uniforms.uColor.value.set(r, g, b);\r
  }, [\r
    wispDensity,\r
    mouseTiltStrength,\r
    horizontalBeamOffset,\r
    verticalBeamOffset,\r
    flowSpeed,\r
    verticalSizing,\r
    horizontalSizing,\r
    fogIntensity,\r
    fogScale,\r
    wispSpeed,\r
    wispIntensity,\r
    flowStrength,\r
    decay,\r
    falloffStart,\r
    fogFallSpeed,\r
    color\r
  ]);\r
\r
  return <div ref={mountRef} className={\`laser-flow-container \${className || ''}\`} style={style} />;\r
};\r
\r
export default LaserFlow;\r
`,rn=`.laser-flow-container {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
  pointer-events: none;\r
}\r
`,tn=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
\r
const VERT = \`\r
precision highp float;\r
attribute vec3 position;\r
void main(){\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
const FRAG = \`\r
#ifdef GL_ES\r
#extension GL_OES_standard_derivatives : enable\r
#endif\r
precision highp float;\r
precision mediump int;\r
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform vec4 iMouse;\r
uniform float uWispDensity;\r
uniform float uTiltScale;\r
uniform float uFlowTime;\r
uniform float uFogTime;\r
uniform float uBeamXFrac;\r
uniform float uBeamYFrac;\r
uniform float uFlowSpeed;\r
uniform float uVLenFactor;\r
uniform float uHLenFactor;\r
uniform float uFogIntensity;\r
uniform float uFogScale;\r
uniform float uWSpeed;\r
uniform float uWIntensity;\r
uniform float uFlowStrength;\r
uniform float uDecay;\r
uniform float uFalloffStart;\r
uniform float uFogFallSpeed;\r
uniform vec3 uColor;\r
uniform float uFade;\r
\r
// Core beam/flare shaping and dynamics\r
#define PI 3.14159265359\r
#define TWO_PI 6.28318530718\r
#define EPS 1e-6\r
#define EDGE_SOFT (DT_LOCAL*4.0)\r
#define DT_LOCAL 0.0038\r
#define TAP_RADIUS 6\r
#define R_H 150.0\r
#define R_V 150.0\r
#define FLARE_HEIGHT 16.0\r
#define FLARE_AMOUNT 8.0\r
#define FLARE_EXP 2.0\r
#define TOP_FADE_START 0.1\r
#define TOP_FADE_EXP 1.0\r
#define FLOW_PERIOD 0.5\r
#define FLOW_SHARPNESS 1.5\r
\r
// Wisps (animated micro-streaks) that travel along the beam\r
#define W_BASE_X 1.5\r
#define W_LAYER_GAP 0.25\r
#define W_LANES 10\r
#define W_SIDE_DECAY 0.5\r
#define W_HALF 0.01\r
#define W_AA 0.15\r
#define W_CELL 20.0\r
#define W_SEG_MIN 0.01\r
#define W_SEG_MAX 0.55\r
#define W_CURVE_AMOUNT 15.0\r
#define W_CURVE_RANGE (FLARE_HEIGHT - 3.0)\r
#define W_BOTTOM_EXP 10.0\r
\r
// Volumetric fog controls\r
#define FOG_ON 1\r
#define FOG_CONTRAST 1.2\r
#define FOG_SPEED_U 0.1\r
#define FOG_SPEED_V -0.1\r
#define FOG_OCTAVES 5\r
#define FOG_BOTTOM_BIAS 0.8\r
#define FOG_TILT_TO_MOUSE 0.05\r
#define FOG_TILT_DEADZONE 0.01\r
#define FOG_TILT_MAX_X 0.35\r
#define FOG_TILT_SHAPE 1.5\r
#define FOG_BEAM_MIN 0.0\r
#define FOG_BEAM_MAX 0.75\r
#define FOG_MASK_GAMMA 0.5\r
#define FOG_EXPAND_SHAPE 12.2\r
#define FOG_EDGE_MIX 0.5\r
\r
// Horizontal vignette for the fog volume\r
#define HFOG_EDGE_START 0.20\r
#define HFOG_EDGE_END 0.98\r
#define HFOG_EDGE_GAMMA 1.4\r
#define HFOG_Y_RADIUS 25.0\r
#define HFOG_Y_SOFT 60.0\r
\r
// Beam extents and edge masking\r
#define EDGE_X0 0.22\r
#define EDGE_X1 0.995\r
#define EDGE_X_GAMMA 1.25\r
#define EDGE_LUMA_T0 0.0\r
#define EDGE_LUMA_T1 2.0\r
#define DITHER_STRENGTH 1.0\r
\r
    float g(float x){return x<=0.00031308?12.92*x:1.055*pow(x,1.0/2.4)-0.055;}\r
    float bs(vec2 p,vec2 q,float powr){\r
        float d=distance(p,q),f=powr*uFalloffStart,r=(f*f)/(d*d+EPS);\r
        return powr*min(1.0,r);\r
    }\r
    float bsa(vec2 p,vec2 q,float powr,vec2 s){\r
        vec2 d=p-q; float dd=(d.x*d.x)/(s.x*s.x)+(d.y*d.y)/(s.y*s.y),f=powr*uFalloffStart,r=(f*f)/(dd+EPS);\r
        return powr*min(1.0,r);\r
    }\r
    float tri01(float x){float f=fract(x);return 1.0-abs(f*2.0-1.0);}\r
    float tauWf(float t,float tmin,float tmax){float a=smoothstep(tmin,tmin+EDGE_SOFT,t),b=1.0-smoothstep(tmax-EDGE_SOFT,tmax,t);return max(0.0,a*b);} \r
    float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.123);return fract(p.x*p.y);}\r
    float vnoise(vec2 p){\r
        vec2 i=floor(p),f=fract(p);\r
        float a=h21(i),b=h21(i+vec2(1,0)),c=h21(i+vec2(0,1)),d=h21(i+vec2(1,1));\r
        vec2 u=f*f*(3.0-2.0*f);\r
        return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\r
    }\r
    float fbm2(vec2 p){\r
        float v=0.0,amp=0.6; mat2 m=mat2(0.86,0.5,-0.5,0.86);\r
        for(int i=0;i<FOG_OCTAVES;++i){v+=amp*vnoise(p); p=m*p*2.03+17.1; amp*=0.52;}\r
        return v;\r
    }\r
    float rGate(float x,float l){float a=smoothstep(0.0,W_AA,x),b=1.0-smoothstep(l,l+W_AA,x);return max(0.0,a*b);}\r
    float flareY(float y){float t=clamp(1.0-(clamp(y,0.0,FLARE_HEIGHT)/max(FLARE_HEIGHT,EPS)),0.0,1.0);return pow(t,FLARE_EXP);}\r
\r
    float vWisps(vec2 uv,float topF){\r
    float y=uv.y,yf=(y+uFlowTime*uWSpeed)/W_CELL;\r
    float dRaw=clamp(uWispDensity,0.0,2.0),d=dRaw<=0.0?1.0:dRaw;\r
    float lanesF=floor(float(W_LANES)*min(d,1.0)+0.5); // WebGL1-safe\r
    int lanes=int(max(1.0,lanesF));\r
    float sp=min(d,1.0),ep=max(d-1.0,0.0);\r
    float fm=flareY(max(y,0.0)),rm=clamp(1.0-(y/max(W_CURVE_RANGE,EPS)),0.0,1.0),cm=fm*rm;\r
    const float G=0.05; float xS=1.0+(FLARE_AMOUNT*W_CURVE_AMOUNT*G)*cm;\r
    float sPix=clamp(y/R_V,0.0,1.0),bGain=pow(1.0-sPix,W_BOTTOM_EXP),sum=0.0;\r
    for(int s=0;s<2;++s){\r
        float sgn=s==0?-1.0:1.0;\r
        for(int i=0;i<W_LANES;++i){\r
            if(i>=lanes) break;\r
            float off=W_BASE_X+float(i)*W_LAYER_GAP,xc=sgn*(off*xS);\r
            float dx=abs(uv.x-xc),lat=1.0-smoothstep(W_HALF,W_HALF+W_AA,dx),amp=exp(-off*W_SIDE_DECAY);\r
            float seed=h21(vec2(off,sgn*17.0)),yf2=yf+seed*7.0,ci=floor(yf2),fy=fract(yf2);\r
            float seg=mix(W_SEG_MIN,W_SEG_MAX,h21(vec2(ci,off*2.3)));\r
            float spR=h21(vec2(ci,off+sgn*31.0)),seg1=rGate(fy,seg)*step(spR,sp);\r
            if(ep>0.0){float spR2=h21(vec2(ci*3.1+7.0,off*5.3+sgn*13.0)); float f2=fract(fy+0.5); seg1+=rGate(f2,seg*0.9)*step(spR2,ep);}\r
            sum+=amp*lat*seg1;\r
        }\r
    }\r
    float span=smoothstep(-3.0,0.0,y)*(1.0-smoothstep(R_V-6.0,R_V,y));\r
    return uWIntensity*sum*topF*bGain*span;\r
}\r
\r
void mainImage(out vec4 fc,in vec2 frag){\r
    vec2 C=iResolution.xy*.5; float invW=1.0/max(C.x,1.0);\r
    float sc=512.0/iResolution.x*.4;\r
    vec2 uv=(frag-C)*sc,off=vec2(uBeamXFrac*iResolution.x*sc,uBeamYFrac*iResolution.y*sc);\r
    vec2 uvc = uv - off;\r
    float a=0.0,b=0.0;\r
    float basePhase=1.5*PI+uDecay*.5; float tauMin=basePhase-uDecay; float tauMax=basePhase;\r
    float cx=clamp(uvc.x/(R_H*uHLenFactor),-1.0,1.0),tH=clamp(TWO_PI-acos(cx),tauMin,tauMax);\r
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){\r
        float tu=tH+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;\r
        float spd=max(abs(sin(tu)),0.02),u=clamp((basePhase-tu)/max(uDecay,EPS),0.0,1.0),env=pow(1.0-abs(u*2.0-1.0),0.8);\r
        vec2 p=vec2((R_H*uHLenFactor)*cos(tu),0.0);\r
        a+=wt*bs(uvc,p,env*spd);\r
    }\r
    float yPix=uvc.y,cy=clamp(-yPix/(R_V*uVLenFactor),-1.0,1.0),tV=clamp(TWO_PI-acos(cy),tauMin,tauMax);\r
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){\r
        float tu=tV+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;\r
        float yb=(-R_V)*cos(tu),s=clamp(yb/R_V,0.0,1.0),spd=max(abs(sin(tu)),0.02);\r
        float env=pow(1.0-s,0.6)*spd;\r
        float cap=1.0-smoothstep(TOP_FADE_START,1.0,s); cap=pow(cap,TOP_FADE_EXP); env*=cap;\r
        float ph=s/max(FLOW_PERIOD,EPS)+uFlowTime*uFlowSpeed;\r
        float fl=pow(tri01(ph),FLOW_SHARPNESS);\r
        env*=mix(1.0-uFlowStrength,1.0,fl);\r
        float yp=(-R_V*uVLenFactor)*cos(tu),m=pow(smoothstep(FLARE_HEIGHT,0.0,yp),FLARE_EXP),wx=1.0+FLARE_AMOUNT*m;\r
        vec2 sig=vec2(wx,1.0),p=vec2(0.0,yp);\r
        float mask=step(0.0,yp);\r
        b+=wt*bsa(uvc,p,mask*env,sig);\r
    }\r
    float sPix=clamp(yPix/R_V,0.0,1.0),topA=pow(1.0-smoothstep(TOP_FADE_START,1.0,sPix),TOP_FADE_EXP);\r
    float L=a+b*topA;\r
    float w=vWisps(vec2(uvc.x,yPix),topA);\r
    float fog=0.0;\r
#if FOG_ON\r
    vec2 fuv=uvc*uFogScale;\r
    float mAct=step(1.0,length(iMouse.xy)),nx=((iMouse.x-C.x)*invW)*mAct;\r
    float ax = abs(nx);\r
    float stMag = mix(ax, pow(ax, FOG_TILT_SHAPE), 0.35);\r
    float st = sign(nx) * stMag * uTiltScale;\r
    st = clamp(st, -FOG_TILT_MAX_X, FOG_TILT_MAX_X);\r
    vec2 dir=normalize(vec2(st,1.0));\r
    fuv+=uFogTime*uFogFallSpeed*dir;\r
    vec2 prp=vec2(-dir.y,dir.x);\r
    fuv+=prp*(0.08*sin(dot(uvc,prp)*0.08+uFogTime*0.9));\r
    float n=fbm2(fuv+vec2(fbm2(fuv+vec2(7.3,2.1)),fbm2(fuv+vec2(-3.7,5.9)))*0.6);\r
    n=pow(clamp(n,0.0,1.0),FOG_CONTRAST);\r
    float pixW = 1.0 / max(iResolution.y, 1.0);\r
#ifdef GL_OES_standard_derivatives\r
    float wL = max(fwidth(L), pixW);\r
#else\r
    float wL = pixW;\r
#endif\r
    float m0=pow(smoothstep(FOG_BEAM_MIN - wL, FOG_BEAM_MAX + wL, L),FOG_MASK_GAMMA);\r
    float bm=1.0-pow(1.0-m0,FOG_EXPAND_SHAPE); bm=mix(bm*m0,bm,FOG_EDGE_MIX);\r
    float yP=1.0-smoothstep(HFOG_Y_RADIUS,HFOG_Y_RADIUS+HFOG_Y_SOFT,abs(yPix));\r
    float nxF=abs((frag.x-C.x)*invW),hE=1.0-smoothstep(HFOG_EDGE_START,HFOG_EDGE_END,nxF); hE=pow(clamp(hE,0.0,1.0),HFOG_EDGE_GAMMA);\r
    float hW=mix(1.0,hE,clamp(yP,0.0,1.0));\r
    float bBias=mix(1.0,1.0-sPix,FOG_BOTTOM_BIAS);\r
    float browserFogIntensity = uFogIntensity;\r
    browserFogIntensity *= 1.8;\r
    float radialFade = 1.0 - smoothstep(0.0, 0.7, length(uvc) / 120.0);\r
    float safariFog = n * browserFogIntensity * bBias * bm * hW * radialFade;\r
    fog = safariFog;\r
#endif\r
    float LF=L+fog;\r
    float dith=(h21(frag)-0.5)*(DITHER_STRENGTH/255.0);\r
    float tone=g(LF+w);\r
    vec3 col=tone*uColor+dith;\r
    float alpha=clamp(g(L+w*0.6)+dith*0.6,0.0,1.0);\r
    float nxE=abs((frag.x-C.x)*invW),xF=pow(clamp(1.0-smoothstep(EDGE_X0,EDGE_X1,nxE),0.0,1.0),EDGE_X_GAMMA);\r
    float scene=LF+max(0.0,w)*0.5,hi=smoothstep(EDGE_LUMA_T0,EDGE_LUMA_T1,scene);\r
    float eM=mix(xF,1.0,hi);\r
    col*=eM; alpha*=eM;\r
    col*=uFade; alpha*=uFade;\r
    fc=vec4(col,alpha);\r
}\r
\r
void main(){\r
  vec4 fc;\r
  mainImage(fc, gl_FragCoord.xy);\r
  gl_FragColor = fc;\r
}\r
\`;\r
\r
export const LaserFlow = ({\r
  className,\r
  style,\r
  wispDensity = 1,\r
  dpr,\r
  mouseSmoothTime = 0.0,\r
  mouseTiltStrength = 0.01,\r
  horizontalBeamOffset = 0.1,\r
  verticalBeamOffset = 0.0,\r
  flowSpeed = 0.35,\r
  verticalSizing = 2.0,\r
  horizontalSizing = 0.5,\r
  fogIntensity = 0.45,\r
  fogScale = 0.3,\r
  wispSpeed = 15.0,\r
  wispIntensity = 5.0,\r
  flowStrength = 0.25,\r
  decay = 1.1,\r
  falloffStart = 1.2,\r
  fogFallSpeed = 0.6,\r
  color = '#FF79C6'\r
}) => {\r
  const mountRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const uniformsRef = useRef(null);\r
  const hasFadedRef = useRef(false);\r
  const rectRef = useRef(null);\r
  const baseDprRef = useRef(1);\r
  const currentDprRef = useRef(1);\r
  const fpsSamplesRef = useRef([]);\r
  const lastFpsCheckRef = useRef(performance.now());\r
  const emaDtRef = useRef(16.7);\r
  const pausedRef = useRef(false);\r
  const inViewRef = useRef(true);\r
\r
  const hexToRGB = hex => {\r
    let c = hex.trim();\r
    if (c[0] === '#') c = c.slice(1);\r
    if (c.length === 3)\r
      c = c\r
        .split('')\r
        .map(x => x + x)\r
        .join('');\r
    const n = parseInt(c, 16) || 0xffffff;\r
    return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };\r
  };\r
\r
  useEffect(() => {\r
    const mount = mountRef.current;\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      alpha: false,\r
      depth: false,\r
      stencil: false,\r
      powerPreference: 'high-performance',\r
      premultipliedAlpha: false,\r
      preserveDrawingBuffer: false,\r
      failIfMajorPerformanceCaveat: false,\r
      logarithmicDepthBuffer: false\r
    });\r
    rendererRef.current = renderer;\r
\r
    baseDprRef.current = Math.min(dpr ?? (window.devicePixelRatio || 1), 2);\r
    currentDprRef.current = baseDprRef.current;\r
\r
    renderer.setPixelRatio(currentDprRef.current);\r
    renderer.shadowMap.enabled = false;\r
    renderer.outputColorSpace = THREE.SRGBColorSpace;\r
    renderer.setClearColor(0x000000, 1);\r
    const canvas = renderer.domElement;\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    canvas.style.display = 'block';\r
    mount.appendChild(canvas);\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geometry = new THREE.BufferGeometry();\r
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));\r
\r
    const uniforms = {\r
      iTime: { value: 0 },\r
      iResolution: { value: new THREE.Vector3(1, 1, 1) },\r
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },\r
      uWispDensity: { value: wispDensity },\r
      uTiltScale: { value: mouseTiltStrength },\r
      uFlowTime: { value: 0 },\r
      uFogTime: { value: 0 },\r
      uBeamXFrac: { value: horizontalBeamOffset },\r
      uBeamYFrac: { value: verticalBeamOffset },\r
      uFlowSpeed: { value: flowSpeed },\r
      uVLenFactor: { value: verticalSizing },\r
      uHLenFactor: { value: horizontalSizing },\r
      uFogIntensity: { value: fogIntensity },\r
      uFogScale: { value: fogScale },\r
      uWSpeed: { value: wispSpeed },\r
      uWIntensity: { value: wispIntensity },\r
      uFlowStrength: { value: flowStrength },\r
      uDecay: { value: decay },\r
      uFalloffStart: { value: falloffStart },\r
      uFogFallSpeed: { value: fogFallSpeed },\r
      uColor: { value: new THREE.Vector3(1, 1, 1) },\r
      uFade: { value: hasFadedRef.current ? 1 : 0 }\r
    };\r
    uniformsRef.current = uniforms;\r
\r
    const material = new THREE.RawShaderMaterial({\r
      vertexShader: VERT,\r
      fragmentShader: FRAG,\r
      uniforms,\r
      transparent: false,\r
      depthTest: false,\r
      depthWrite: false,\r
      blending: THREE.NormalBlending\r
    });\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    mesh.frustumCulled = false;\r
    scene.add(mesh);\r
\r
    const clock = new THREE.Clock();\r
    let prevTime = 0;\r
    let fade = hasFadedRef.current ? 1 : 0;\r
\r
    const mouseTarget = new THREE.Vector2(0, 0);\r
    const mouseSmooth = new THREE.Vector2(0, 0);\r
\r
    const setSizeNow = () => {\r
      const w = mount.clientWidth || 1;\r
      const h = mount.clientHeight || 1;\r
      const pr = currentDprRef.current;\r
      renderer.setPixelRatio(pr);\r
      renderer.setSize(w, h, false);\r
      uniforms.iResolution.value.set(w * pr, h * pr, pr);\r
      rectRef.current = canvas.getBoundingClientRect();\r
    };\r
\r
    let resizeRaf = 0;\r
    const scheduleResize = () => {\r
      if (resizeRaf) cancelAnimationFrame(resizeRaf);\r
      resizeRaf = requestAnimationFrame(setSizeNow);\r
    };\r
\r
    setSizeNow();\r
    const ro = new ResizeObserver(scheduleResize);\r
    ro.observe(mount);\r
\r
    const io = new IntersectionObserver(\r
      entries => {\r
        inViewRef.current = entries[0]?.isIntersecting ?? true;\r
      },\r
      { root: null, threshold: 0 }\r
    );\r
    io.observe(mount);\r
\r
    const onVis = () => {\r
      pausedRef.current = document.hidden;\r
    };\r
    document.addEventListener('visibilitychange', onVis, { passive: true });\r
\r
    const updateMouse = (clientX, clientY) => {\r
      const rect = rectRef.current;\r
      if (!rect) return;\r
      const x = clientX - rect.left;\r
      const y = clientY - rect.top;\r
      const ratio = currentDprRef.current;\r
      const hb = rect.height * ratio;\r
      mouseTarget.set(x * ratio, hb - y * ratio);\r
    };\r
    const onMove = ev => updateMouse(ev.clientX, ev.clientY);\r
    const onLeave = () => mouseTarget.set(0, 0);\r
    canvas.addEventListener('pointermove', onMove, { passive: true });\r
    canvas.addEventListener('pointerdown', onMove, { passive: true });\r
    canvas.addEventListener('pointerenter', onMove, { passive: true });\r
    canvas.addEventListener('pointerleave', onLeave, { passive: true });\r
\r
    const onCtxLost = e => {\r
      e.preventDefault();\r
      pausedRef.current = true;\r
    };\r
    const onCtxRestored = () => {\r
      pausedRef.current = false;\r
      scheduleResize();\r
    };\r
    canvas.addEventListener('webglcontextlost', onCtxLost, false);\r
    canvas.addEventListener('webglcontextrestored', onCtxRestored, false);\r
\r
    let raf = 0;\r
\r
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));\r
    const dprFloor = 0.6;\r
    const lowerThresh = 50;\r
    const upperThresh = 58;\r
    let lastDprChangeRef = 0;\r
    const dprChangeCooldown = 2000;\r
\r
    const adjustDprIfNeeded = now => {\r
      const elapsed = now - lastFpsCheckRef.current;\r
      if (elapsed < 750) return;\r
\r
      const samples = fpsSamplesRef.current;\r
      if (samples.length === 0) {\r
        lastFpsCheckRef.current = now;\r
        return;\r
      }\r
      const avgFps = samples.reduce((a, b) => a + b, 0) / samples.length;\r
\r
      let next = currentDprRef.current;\r
      const base = baseDprRef.current;\r
\r
      if (avgFps < lowerThresh) {\r
        next = clamp(currentDprRef.current * 0.85, dprFloor, base);\r
      } else if (avgFps > upperThresh && currentDprRef.current < base) {\r
        next = clamp(currentDprRef.current * 1.1, dprFloor, base);\r
      }\r
\r
      if (Math.abs(next - currentDprRef.current) > 0.01 && now - lastDprChangeRef > dprChangeCooldown) {\r
        currentDprRef.current = next;\r
        lastDprChangeRef = now;\r
        setSizeNow();\r
      }\r
\r
      fpsSamplesRef.current = [];\r
      lastFpsCheckRef.current = now;\r
    };\r
\r
    const animate = () => {\r
      raf = requestAnimationFrame(animate);\r
      if (pausedRef.current || !inViewRef.current) return;\r
\r
      const t = clock.getElapsedTime();\r
      const dt = Math.max(0, t - prevTime);\r
      prevTime = t;\r
\r
      const dtMs = dt * 1000;\r
      emaDtRef.current = emaDtRef.current * 0.9 + dtMs * 0.1;\r
      const instFps = 1000 / Math.max(1, emaDtRef.current);\r
      fpsSamplesRef.current.push(instFps);\r
\r
      uniforms.iTime.value = t;\r
\r
      const cdt = Math.min(0.033, Math.max(0.001, dt));\r
      uniforms.uFlowTime.value += cdt;\r
      uniforms.uFogTime.value += cdt;\r
\r
      if (!hasFadedRef.current) {\r
        const fadeDur = 1.0;\r
        fade = Math.min(1, fade + cdt / fadeDur);\r
        uniforms.uFade.value = fade;\r
        if (fade >= 1) hasFadedRef.current = true;\r
      }\r
\r
      const tau = Math.max(1e-3, mouseSmoothTime);\r
      const alpha = 1 - Math.exp(-cdt / tau);\r
      mouseSmooth.lerp(mouseTarget, alpha);\r
      uniforms.iMouse.value.set(mouseSmooth.x, mouseSmooth.y, 0, 0);\r
\r
      renderer.render(scene, camera);\r
\r
      adjustDprIfNeeded(performance.now());\r
    };\r
\r
    animate();\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      ro.disconnect();\r
      io.disconnect();\r
      document.removeEventListener('visibilitychange', onVis);\r
      canvas.removeEventListener('pointermove', onMove);\r
      canvas.removeEventListener('pointerdown', onMove);\r
      canvas.removeEventListener('pointerenter', onMove);\r
      canvas.removeEventListener('pointerleave', onLeave);\r
      canvas.removeEventListener('webglcontextlost', onCtxLost);\r
      canvas.removeEventListener('webglcontextrestored', onCtxRestored);\r
      geometry.dispose();\r
      material.dispose();\r
      renderer.dispose();\r
      if (mount.contains(canvas)) mount.removeChild(canvas);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [dpr]);\r
\r
  useEffect(() => {\r
    const uniforms = uniformsRef.current;\r
    if (!uniforms) return;\r
\r
    uniforms.uWispDensity.value = wispDensity;\r
    uniforms.uTiltScale.value = mouseTiltStrength;\r
    uniforms.uBeamXFrac.value = horizontalBeamOffset;\r
    uniforms.uBeamYFrac.value = verticalBeamOffset;\r
    uniforms.uFlowSpeed.value = flowSpeed;\r
    uniforms.uVLenFactor.value = verticalSizing;\r
    uniforms.uHLenFactor.value = horizontalSizing;\r
    uniforms.uFogIntensity.value = fogIntensity;\r
    uniforms.uFogScale.value = fogScale;\r
    uniforms.uWSpeed.value = wispSpeed;\r
    uniforms.uWIntensity.value = wispIntensity;\r
    uniforms.uFlowStrength.value = flowStrength;\r
    uniforms.uDecay.value = decay;\r
    uniforms.uFalloffStart.value = falloffStart;\r
    uniforms.uFogFallSpeed.value = fogFallSpeed;\r
\r
    const { r, g, b } = hexToRGB(color || '#FFFFFF');\r
    uniforms.uColor.value.set(r, g, b);\r
  }, [\r
    wispDensity,\r
    mouseTiltStrength,\r
    horizontalBeamOffset,\r
    verticalBeamOffset,\r
    flowSpeed,\r
    verticalSizing,\r
    horizontalSizing,\r
    fogIntensity,\r
    fogScale,\r
    wispSpeed,\r
    wispIntensity,\r
    flowStrength,\r
    decay,\r
    falloffStart,\r
    fogFallSpeed,\r
    color\r
  ]);\r
\r
  return <div ref={mountRef} className={\`w-full h-full relative \${className || ''}\`} style={style} />;\r
};\r
\r
export default LaserFlow;\r
`,an=`import React, { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import './LaserFlow.css';\r
\r
type Props = {\r
  className?: string;\r
  style?: React.CSSProperties;\r
  wispDensity?: number;\r
  dpr?: number;\r
  mouseSmoothTime?: number;\r
  mouseTiltStrength?: number;\r
  horizontalBeamOffset?: number;\r
  verticalBeamOffset?: number;\r
  flowSpeed?: number;\r
  verticalSizing?: number;\r
  horizontalSizing?: number;\r
  fogIntensity?: number;\r
  fogScale?: number;\r
  wispSpeed?: number;\r
  wispIntensity?: number;\r
  flowStrength?: number;\r
  decay?: number;\r
  falloffStart?: number;\r
  fogFallSpeed?: number;\r
  color?: string;\r
};\r
\r
const VERT = \`\r
precision highp float;\r
attribute vec3 position;\r
void main(){\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
const FRAG = \`\r
#ifdef GL_ES\r
#extension GL_OES_standard_derivatives : enable\r
#endif\r
precision highp float;\r
precision mediump int;\r
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform vec4 iMouse;\r
uniform float uWispDensity;\r
uniform float uTiltScale;\r
uniform float uFlowTime;\r
uniform float uFogTime;\r
uniform float uBeamXFrac;\r
uniform float uBeamYFrac;\r
uniform float uFlowSpeed;\r
uniform float uVLenFactor;\r
uniform float uHLenFactor;\r
uniform float uFogIntensity;\r
uniform float uFogScale;\r
uniform float uWSpeed;\r
uniform float uWIntensity;\r
uniform float uFlowStrength;\r
uniform float uDecay;\r
uniform float uFalloffStart;\r
uniform float uFogFallSpeed;\r
uniform vec3 uColor;\r
uniform float uFade;\r
\r
// Core beam/flare shaping and dynamics\r
#define PI 3.14159265359\r
#define TWO_PI 6.28318530718\r
#define EPS 1e-6\r
#define EDGE_SOFT (DT_LOCAL*4.0)\r
#define DT_LOCAL 0.0038\r
#define TAP_RADIUS 6\r
#define R_H 150.0\r
#define R_V 150.0\r
#define FLARE_HEIGHT 16.0\r
#define FLARE_AMOUNT 8.0\r
#define FLARE_EXP 2.0\r
#define TOP_FADE_START 0.1\r
#define TOP_FADE_EXP 1.0\r
#define FLOW_PERIOD 0.5\r
#define FLOW_SHARPNESS 1.5\r
\r
// Wisps (animated micro-streaks) that travel along the beam\r
#define W_BASE_X 1.5\r
#define W_LAYER_GAP 0.25\r
#define W_LANES 10\r
#define W_SIDE_DECAY 0.5\r
#define W_HALF 0.01\r
#define W_AA 0.15\r
#define W_CELL 20.0\r
#define W_SEG_MIN 0.01\r
#define W_SEG_MAX 0.55\r
#define W_CURVE_AMOUNT 15.0\r
#define W_CURVE_RANGE (FLARE_HEIGHT - 3.0)\r
#define W_BOTTOM_EXP 10.0\r
\r
// Volumetric fog controls\r
#define FOG_ON 1\r
#define FOG_CONTRAST 1.2\r
#define FOG_SPEED_U 0.1\r
#define FOG_SPEED_V -0.1\r
#define FOG_OCTAVES 5\r
#define FOG_BOTTOM_BIAS 0.8\r
#define FOG_TILT_TO_MOUSE 0.05\r
#define FOG_TILT_DEADZONE 0.01\r
#define FOG_TILT_MAX_X 0.35\r
#define FOG_TILT_SHAPE 1.5\r
#define FOG_BEAM_MIN 0.0\r
#define FOG_BEAM_MAX 0.75\r
#define FOG_MASK_GAMMA 0.5\r
#define FOG_EXPAND_SHAPE 12.2\r
#define FOG_EDGE_MIX 0.5\r
\r
// Horizontal vignette for the fog volume\r
#define HFOG_EDGE_START 0.20\r
#define HFOG_EDGE_END 0.98\r
#define HFOG_EDGE_GAMMA 1.4\r
#define HFOG_Y_RADIUS 25.0\r
#define HFOG_Y_SOFT 60.0\r
\r
// Beam extents and edge masking\r
#define EDGE_X0 0.22\r
#define EDGE_X1 0.995\r
#define EDGE_X_GAMMA 1.25\r
#define EDGE_LUMA_T0 0.0\r
#define EDGE_LUMA_T1 2.0\r
#define DITHER_STRENGTH 1.0\r
\r
    float g(float x){return x<=0.00031308?12.92*x:1.055*pow(x,1.0/2.4)-0.055;}\r
    float bs(vec2 p,vec2 q,float powr){\r
        float d=distance(p,q),f=powr*uFalloffStart,r=(f*f)/(d*d+EPS);\r
        return powr*min(1.0,r);\r
    }\r
    float bsa(vec2 p,vec2 q,float powr,vec2 s){\r
        vec2 d=p-q; float dd=(d.x*d.x)/(s.x*s.x)+(d.y*d.y)/(s.y*s.y),f=powr*uFalloffStart,r=(f*f)/(dd+EPS);\r
        return powr*min(1.0,r);\r
    }\r
    float tri01(float x){float f=fract(x);return 1.0-abs(f*2.0-1.0);}\r
    float tauWf(float t,float tmin,float tmax){float a=smoothstep(tmin,tmin+EDGE_SOFT,t),b=1.0-smoothstep(tmax-EDGE_SOFT,tmax,t);return max(0.0,a*b);} \r
    float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.123);return fract(p.x*p.y);}\r
    float vnoise(vec2 p){\r
        vec2 i=floor(p),f=fract(p);\r
        float a=h21(i),b=h21(i+vec2(1,0)),c=h21(i+vec2(0,1)),d=h21(i+vec2(1,1));\r
        vec2 u=f*f*(3.0-2.0*f);\r
        return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\r
    }\r
    float fbm2(vec2 p){\r
        float v=0.0,amp=0.6; mat2 m=mat2(0.86,0.5,-0.5,0.86);\r
        for(int i=0;i<FOG_OCTAVES;++i){v+=amp*vnoise(p); p=m*p*2.03+17.1; amp*=0.52;}\r
        return v;\r
    }\r
    float rGate(float x,float l){float a=smoothstep(0.0,W_AA,x),b=1.0-smoothstep(l,l+W_AA,x);return max(0.0,a*b);}\r
    float flareY(float y){float t=clamp(1.0-(clamp(y,0.0,FLARE_HEIGHT)/max(FLARE_HEIGHT,EPS)),0.0,1.0);return pow(t,FLARE_EXP);}\r
\r
    float vWisps(vec2 uv,float topF){\r
    float y=uv.y,yf=(y+uFlowTime*uWSpeed)/W_CELL;\r
    float dRaw=clamp(uWispDensity,0.0,2.0),d=dRaw<=0.0?1.0:dRaw;\r
    float lanesF=floor(float(W_LANES)*min(d,1.0)+0.5); // WebGL1-safe\r
    int lanes=int(max(1.0,lanesF));\r
    float sp=min(d,1.0),ep=max(d-1.0,0.0);\r
    float fm=flareY(max(y,0.0)),rm=clamp(1.0-(y/max(W_CURVE_RANGE,EPS)),0.0,1.0),cm=fm*rm;\r
    const float G=0.05; float xS=1.0+(FLARE_AMOUNT*W_CURVE_AMOUNT*G)*cm;\r
    float sPix=clamp(y/R_V,0.0,1.0),bGain=pow(1.0-sPix,W_BOTTOM_EXP),sum=0.0;\r
    for(int s=0;s<2;++s){\r
        float sgn=s==0?-1.0:1.0;\r
        for(int i=0;i<W_LANES;++i){\r
            if(i>=lanes) break;\r
            float off=W_BASE_X+float(i)*W_LAYER_GAP,xc=sgn*(off*xS);\r
            float dx=abs(uv.x-xc),lat=1.0-smoothstep(W_HALF,W_HALF+W_AA,dx),amp=exp(-off*W_SIDE_DECAY);\r
            float seed=h21(vec2(off,sgn*17.0)),yf2=yf+seed*7.0,ci=floor(yf2),fy=fract(yf2);\r
            float seg=mix(W_SEG_MIN,W_SEG_MAX,h21(vec2(ci,off*2.3)));\r
            float spR=h21(vec2(ci,off+sgn*31.0)),seg1=rGate(fy,seg)*step(spR,sp);\r
            if(ep>0.0){float spR2=h21(vec2(ci*3.1+7.0,off*5.3+sgn*13.0)); float f2=fract(fy+0.5); seg1+=rGate(f2,seg*0.9)*step(spR2,ep);}\r
            sum+=amp*lat*seg1;\r
        }\r
    }\r
    float span=smoothstep(-3.0,0.0,y)*(1.0-smoothstep(R_V-6.0,R_V,y));\r
    return uWIntensity*sum*topF*bGain*span;\r
}\r
\r
void mainImage(out vec4 fc,in vec2 frag){\r
    vec2 C=iResolution.xy*.5; float invW=1.0/max(C.x,1.0);\r
    float sc=512.0/iResolution.x*.4;\r
    vec2 uv=(frag-C)*sc,off=vec2(uBeamXFrac*iResolution.x*sc,uBeamYFrac*iResolution.y*sc);\r
    vec2 uvc = uv - off;\r
    float a=0.0,b=0.0;\r
    float basePhase=1.5*PI+uDecay*.5; float tauMin=basePhase-uDecay; float tauMax=basePhase;\r
    float cx=clamp(uvc.x/(R_H*uHLenFactor),-1.0,1.0),tH=clamp(TWO_PI-acos(cx),tauMin,tauMax);\r
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){\r
        float tu=tH+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;\r
        float spd=max(abs(sin(tu)),0.02),u=clamp((basePhase-tu)/max(uDecay,EPS),0.0,1.0),env=pow(1.0-abs(u*2.0-1.0),0.8);\r
        vec2 p=vec2((R_H*uHLenFactor)*cos(tu),0.0);\r
        a+=wt*bs(uvc,p,env*spd);\r
    }\r
    float yPix=uvc.y,cy=clamp(-yPix/(R_V*uVLenFactor),-1.0,1.0),tV=clamp(TWO_PI-acos(cy),tauMin,tauMax);\r
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){\r
        float tu=tV+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;\r
        float yb=(-R_V)*cos(tu),s=clamp(yb/R_V,0.0,1.0),spd=max(abs(sin(tu)),0.02);\r
        float env=pow(1.0-s,0.6)*spd;\r
        float cap=1.0-smoothstep(TOP_FADE_START,1.0,s); cap=pow(cap,TOP_FADE_EXP); env*=cap;\r
        float ph=s/max(FLOW_PERIOD,EPS)+uFlowTime*uFlowSpeed;\r
        float fl=pow(tri01(ph),FLOW_SHARPNESS);\r
        env*=mix(1.0-uFlowStrength,1.0,fl);\r
        float yp=(-R_V*uVLenFactor)*cos(tu),m=pow(smoothstep(FLARE_HEIGHT,0.0,yp),FLARE_EXP),wx=1.0+FLARE_AMOUNT*m;\r
        vec2 sig=vec2(wx,1.0),p=vec2(0.0,yp);\r
        float mask=step(0.0,yp);\r
        b+=wt*bsa(uvc,p,mask*env,sig);\r
    }\r
    float sPix=clamp(yPix/R_V,0.0,1.0),topA=pow(1.0-smoothstep(TOP_FADE_START,1.0,sPix),TOP_FADE_EXP);\r
    float L=a+b*topA;\r
    float w=vWisps(vec2(uvc.x,yPix),topA);\r
    float fog=0.0;\r
#if FOG_ON\r
    vec2 fuv=uvc*uFogScale;\r
    float mAct=step(1.0,length(iMouse.xy)),nx=((iMouse.x-C.x)*invW)*mAct;\r
    float ax = abs(nx);\r
    float stMag = mix(ax, pow(ax, FOG_TILT_SHAPE), 0.35);\r
    float st = sign(nx) * stMag * uTiltScale;\r
    st = clamp(st, -FOG_TILT_MAX_X, FOG_TILT_MAX_X);\r
    vec2 dir=normalize(vec2(st,1.0));\r
    fuv+=uFogTime*uFogFallSpeed*dir;\r
    vec2 prp=vec2(-dir.y,dir.x);\r
    fuv+=prp*(0.08*sin(dot(uvc,prp)*0.08+uFogTime*0.9));\r
    float n=fbm2(fuv+vec2(fbm2(fuv+vec2(7.3,2.1)),fbm2(fuv+vec2(-3.7,5.9)))*0.6);\r
    n=pow(clamp(n,0.0,1.0),FOG_CONTRAST);\r
    float pixW = 1.0 / max(iResolution.y, 1.0);\r
#ifdef GL_OES_standard_derivatives\r
    float wL = max(fwidth(L), pixW);\r
#else\r
    float wL = pixW;\r
#endif\r
    float m0=pow(smoothstep(FOG_BEAM_MIN - wL, FOG_BEAM_MAX + wL, L),FOG_MASK_GAMMA);\r
    float bm=1.0-pow(1.0-m0,FOG_EXPAND_SHAPE); bm=mix(bm*m0,bm,FOG_EDGE_MIX);\r
    float yP=1.0-smoothstep(HFOG_Y_RADIUS,HFOG_Y_RADIUS+HFOG_Y_SOFT,abs(yPix));\r
    float nxF=abs((frag.x-C.x)*invW),hE=1.0-smoothstep(HFOG_EDGE_START,HFOG_EDGE_END,nxF); hE=pow(clamp(hE,0.0,1.0),HFOG_EDGE_GAMMA);\r
    float hW=mix(1.0,hE,clamp(yP,0.0,1.0));\r
    float bBias=mix(1.0,1.0-sPix,FOG_BOTTOM_BIAS);\r
    float browserFogIntensity = uFogIntensity;\r
    browserFogIntensity *= 1.8;\r
    float radialFade = 1.0 - smoothstep(0.0, 0.7, length(uvc) / 120.0);\r
    float safariFog = n * browserFogIntensity * bBias * bm * hW * radialFade;\r
    fog = safariFog;\r
#endif\r
    float LF=L+fog;\r
    float dith=(h21(frag)-0.5)*(DITHER_STRENGTH/255.0);\r
    float tone=g(LF+w);\r
    vec3 col=tone*uColor+dith;\r
    float alpha=clamp(g(L+w*0.6)+dith*0.6,0.0,1.0);\r
    float nxE=abs((frag.x-C.x)*invW),xF=pow(clamp(1.0-smoothstep(EDGE_X0,EDGE_X1,nxE),0.0,1.0),EDGE_X_GAMMA);\r
    float scene=LF+max(0.0,w)*0.5,hi=smoothstep(EDGE_LUMA_T0,EDGE_LUMA_T1,scene);\r
    float eM=mix(xF,1.0,hi);\r
    col*=eM; alpha*=eM;\r
    col*=uFade; alpha*=uFade;\r
    fc=vec4(col,alpha);\r
}\r
\r
void main(){\r
  vec4 fc;\r
  mainImage(fc, gl_FragCoord.xy);\r
  gl_FragColor = fc;\r
}\r
\`;\r
\r
export const LaserFlow: React.FC<Props> = ({\r
  className,\r
  style,\r
  wispDensity = 1,\r
  dpr,\r
  mouseSmoothTime = 0.0,\r
  mouseTiltStrength = 0.01,\r
  horizontalBeamOffset = 0.1,\r
  verticalBeamOffset = 0.0,\r
  flowSpeed = 0.35,\r
  verticalSizing = 2.0,\r
  horizontalSizing = 0.5,\r
  fogIntensity = 0.45,\r
  fogScale = 0.3,\r
  wispSpeed = 15.0,\r
  wispIntensity = 5.0,\r
  flowStrength = 0.25,\r
  decay = 1.1,\r
  falloffStart = 1.2,\r
  fogFallSpeed = 0.6,\r
  color = '#FF79C6'\r
}) => {\r
  const mountRef = useRef<HTMLDivElement | null>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);\r
  const uniformsRef = useRef<any>(null);\r
  const hasFadedRef = useRef(false);\r
  const rectRef = useRef<DOMRect | null>(null);\r
  const baseDprRef = useRef<number>(1);\r
  const currentDprRef = useRef<number>(1);\r
  const fpsSamplesRef = useRef<number[]>([]);\r
  const lastFpsCheckRef = useRef<number>(performance.now());\r
  const emaDtRef = useRef<number>(16.7); // ms\r
  const pausedRef = useRef<boolean>(false);\r
  const inViewRef = useRef<boolean>(true);\r
\r
  const hexToRGB = (hex: string) => {\r
    let c = hex.trim();\r
    if (c[0] === '#') c = c.slice(1);\r
    if (c.length === 3)\r
      c = c\r
        .split('')\r
        .map(x => x + x)\r
        .join('');\r
    const n = parseInt(c, 16) || 0xffffff;\r
    return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };\r
  };\r
\r
  useEffect(() => {\r
    const mount = mountRef.current!;\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      alpha: false,\r
      depth: false,\r
      stencil: false,\r
      powerPreference: 'high-performance',\r
      premultipliedAlpha: false,\r
      preserveDrawingBuffer: false,\r
      failIfMajorPerformanceCaveat: false,\r
      logarithmicDepthBuffer: false\r
    });\r
    rendererRef.current = renderer;\r
\r
    baseDprRef.current = Math.min(dpr ?? (window.devicePixelRatio || 1), 2);\r
    currentDprRef.current = baseDprRef.current;\r
\r
    renderer.setPixelRatio(currentDprRef.current);\r
    renderer.shadowMap.enabled = false;\r
    renderer.outputColorSpace = THREE.SRGBColorSpace;\r
    renderer.setClearColor(0x000000, 1);\r
    const canvas = renderer.domElement;\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    canvas.style.display = 'block';\r
    mount.appendChild(canvas);\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geometry = new THREE.BufferGeometry();\r
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));\r
\r
    const uniforms = {\r
      iTime: { value: 0 },\r
      iResolution: { value: new THREE.Vector3(1, 1, 1) },\r
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },\r
      uWispDensity: { value: wispDensity },\r
      uTiltScale: { value: mouseTiltStrength },\r
      uFlowTime: { value: 0 },\r
      uFogTime: { value: 0 },\r
      uBeamXFrac: { value: horizontalBeamOffset },\r
      uBeamYFrac: { value: verticalBeamOffset },\r
      uFlowSpeed: { value: flowSpeed },\r
      uVLenFactor: { value: verticalSizing },\r
      uHLenFactor: { value: horizontalSizing },\r
      uFogIntensity: { value: fogIntensity },\r
      uFogScale: { value: fogScale },\r
      uWSpeed: { value: wispSpeed },\r
      uWIntensity: { value: wispIntensity },\r
      uFlowStrength: { value: flowStrength },\r
      uDecay: { value: decay },\r
      uFalloffStart: { value: falloffStart },\r
      uFogFallSpeed: { value: fogFallSpeed },\r
      uColor: { value: new THREE.Vector3(1, 1, 1) },\r
      uFade: { value: hasFadedRef.current ? 1 : 0 }\r
    };\r
    uniformsRef.current = uniforms;\r
\r
    const material = new THREE.RawShaderMaterial({\r
      vertexShader: VERT,\r
      fragmentShader: FRAG,\r
      uniforms,\r
      transparent: false,\r
      depthTest: false,\r
      depthWrite: false,\r
      blending: THREE.NormalBlending\r
    });\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    mesh.frustumCulled = false;\r
    scene.add(mesh);\r
\r
    const clock = new THREE.Clock();\r
    let prevTime = 0;\r
    let fade = hasFadedRef.current ? 1 : 0;\r
\r
    const mouseTarget = new THREE.Vector2(0, 0);\r
    const mouseSmooth = new THREE.Vector2(0, 0);\r
\r
    const setSizeNow = () => {\r
      const w = mount.clientWidth || 1;\r
      const h = mount.clientHeight || 1;\r
      const pr = currentDprRef.current;\r
      renderer.setPixelRatio(pr);\r
      renderer.setSize(w, h, false);\r
      uniforms.iResolution.value.set(w * pr, h * pr, pr);\r
      rectRef.current = canvas.getBoundingClientRect();\r
    };\r
\r
    let resizeRaf = 0;\r
    const scheduleResize = () => {\r
      if (resizeRaf) cancelAnimationFrame(resizeRaf);\r
      resizeRaf = requestAnimationFrame(setSizeNow);\r
    };\r
\r
    setSizeNow();\r
    const ro = new ResizeObserver(scheduleResize);\r
    ro.observe(mount);\r
\r
    const io = new IntersectionObserver(\r
      entries => {\r
        inViewRef.current = entries[0]?.isIntersecting ?? true;\r
      },\r
      { root: null, threshold: 0 }\r
    );\r
    io.observe(mount);\r
\r
    const onVis = () => {\r
      pausedRef.current = document.hidden;\r
    };\r
    document.addEventListener('visibilitychange', onVis, { passive: true });\r
\r
    const updateMouse = (clientX: number, clientY: number) => {\r
      const rect = rectRef.current;\r
      if (!rect) return;\r
      const x = clientX - rect.left;\r
      const y = clientY - rect.top;\r
      const ratio = currentDprRef.current;\r
      const hb = rect.height * ratio;\r
      mouseTarget.set(x * ratio, hb - y * ratio);\r
    };\r
    const onMove = (ev: PointerEvent | MouseEvent) => updateMouse(ev.clientX, ev.clientY);\r
    const onLeave = () => mouseTarget.set(0, 0);\r
    canvas.addEventListener('pointermove', onMove as any, { passive: true });\r
    canvas.addEventListener('pointerdown', onMove as any, { passive: true });\r
    canvas.addEventListener('pointerenter', onMove as any, { passive: true });\r
    canvas.addEventListener('pointerleave', onLeave as any, { passive: true });\r
\r
    const onCtxLost = (e: Event) => {\r
      e.preventDefault();\r
      pausedRef.current = true;\r
    };\r
    const onCtxRestored = () => {\r
      pausedRef.current = false;\r
      scheduleResize();\r
    };\r
    canvas.addEventListener('webglcontextlost', onCtxLost, false);\r
    canvas.addEventListener('webglcontextrestored', onCtxRestored, false);\r
\r
    let raf = 0;\r
\r
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));\r
    const dprFloor = 0.6;\r
    const lowerThresh = 50;\r
    const upperThresh = 58;\r
    let lastDprChangeRef = 0;\r
    const dprChangeCooldown = 2000;\r
\r
    const adjustDprIfNeeded = (now: number) => {\r
      const elapsed = now - lastFpsCheckRef.current;\r
      if (elapsed < 750) return;\r
\r
      const samples = fpsSamplesRef.current;\r
      if (samples.length === 0) {\r
        lastFpsCheckRef.current = now;\r
        return;\r
      }\r
      const avgFps = samples.reduce((a, b) => a + b, 0) / samples.length;\r
\r
      let next = currentDprRef.current;\r
      const base = baseDprRef.current;\r
\r
      if (avgFps < lowerThresh) {\r
        next = clamp(currentDprRef.current * 0.85, dprFloor, base);\r
      } else if (avgFps > upperThresh && currentDprRef.current < base) {\r
        next = clamp(currentDprRef.current * 1.1, dprFloor, base);\r
      }\r
\r
      if (Math.abs(next - currentDprRef.current) > 0.01 && now - lastDprChangeRef > dprChangeCooldown) {\r
        currentDprRef.current = next;\r
        lastDprChangeRef = now;\r
        setSizeNow();\r
      }\r
\r
      fpsSamplesRef.current = [];\r
      lastFpsCheckRef.current = now;\r
    };\r
\r
    const animate = () => {\r
      raf = requestAnimationFrame(animate);\r
      if (pausedRef.current || !inViewRef.current) return;\r
\r
      const t = clock.getElapsedTime();\r
      const dt = Math.max(0, t - prevTime);\r
      prevTime = t;\r
\r
      const dtMs = dt * 1000;\r
      emaDtRef.current = emaDtRef.current * 0.9 + dtMs * 0.1;\r
      const instFps = 1000 / Math.max(1, emaDtRef.current);\r
      fpsSamplesRef.current.push(instFps);\r
\r
      uniforms.iTime.value = t;\r
\r
      const cdt = Math.min(0.033, Math.max(0.001, dt));\r
      (uniforms.uFlowTime.value as number) += cdt;\r
      (uniforms.uFogTime.value as number) += cdt;\r
\r
      if (!hasFadedRef.current) {\r
        const fadeDur = 1.0;\r
        fade = Math.min(1, fade + cdt / fadeDur);\r
        uniforms.uFade.value = fade;\r
        if (fade >= 1) hasFadedRef.current = true;\r
      }\r
\r
      const tau = Math.max(1e-3, mouseSmoothTime);\r
      const alpha = 1 - Math.exp(-cdt / tau);\r
      mouseSmooth.lerp(mouseTarget, alpha);\r
      uniforms.iMouse.value.set(mouseSmooth.x, mouseSmooth.y, 0, 0);\r
\r
      renderer.render(scene, camera);\r
\r
      adjustDprIfNeeded(performance.now());\r
    };\r
\r
    animate();\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      ro.disconnect();\r
      io.disconnect();\r
      document.removeEventListener('visibilitychange', onVis);\r
      canvas.removeEventListener('pointermove', onMove as any);\r
      canvas.removeEventListener('pointerdown', onMove as any);\r
      canvas.removeEventListener('pointerenter', onMove as any);\r
      canvas.removeEventListener('pointerleave', onLeave as any);\r
      canvas.removeEventListener('webglcontextlost', onCtxLost);\r
      canvas.removeEventListener('webglcontextrestored', onCtxRestored);\r
      geometry.dispose();\r
      material.dispose();\r
      renderer.dispose();\r
      if (mount.contains(canvas)) mount.removeChild(canvas);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [dpr]);\r
\r
  useEffect(() => {\r
    const uniforms = uniformsRef.current;\r
    if (!uniforms) return;\r
\r
    uniforms.uWispDensity.value = wispDensity;\r
    uniforms.uTiltScale.value = mouseTiltStrength;\r
    uniforms.uBeamXFrac.value = horizontalBeamOffset;\r
    uniforms.uBeamYFrac.value = verticalBeamOffset;\r
    uniforms.uFlowSpeed.value = flowSpeed;\r
    uniforms.uVLenFactor.value = verticalSizing;\r
    uniforms.uHLenFactor.value = horizontalSizing;\r
    uniforms.uFogIntensity.value = fogIntensity;\r
    uniforms.uFogScale.value = fogScale;\r
    uniforms.uWSpeed.value = wispSpeed;\r
    uniforms.uWIntensity.value = wispIntensity;\r
    uniforms.uFlowStrength.value = flowStrength;\r
    uniforms.uDecay.value = decay;\r
    uniforms.uFalloffStart.value = falloffStart;\r
    uniforms.uFogFallSpeed.value = fogFallSpeed;\r
\r
    const { r, g, b } = hexToRGB(color || '#FFFFFF');\r
    uniforms.uColor.value.set(r, g, b);\r
  }, [\r
    wispDensity,\r
    mouseTiltStrength,\r
    horizontalBeamOffset,\r
    verticalBeamOffset,\r
    flowSpeed,\r
    verticalSizing,\r
    horizontalSizing,\r
    fogIntensity,\r
    fogScale,\r
    wispSpeed,\r
    wispIntensity,\r
    flowStrength,\r
    decay,\r
    falloffStart,\r
    fogFallSpeed,\r
    color\r
  ]);\r
\r
  return <div ref={mountRef} className={\`laser-flow-container \${className || ''}\`} style={style} />;\r
};\r
\r
export default LaserFlow;\r
`,on=`import React, { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
\r
type Props = {\r
  className?: string;\r
  style?: React.CSSProperties;\r
  wispDensity?: number;\r
  dpr?: number;\r
  mouseSmoothTime?: number;\r
  mouseTiltStrength?: number;\r
  horizontalBeamOffset?: number;\r
  verticalBeamOffset?: number;\r
  flowSpeed?: number;\r
  verticalSizing?: number;\r
  horizontalSizing?: number;\r
  fogIntensity?: number;\r
  fogScale?: number;\r
  wispSpeed?: number;\r
  wispIntensity?: number;\r
  flowStrength?: number;\r
  decay?: number;\r
  falloffStart?: number;\r
  fogFallSpeed?: number;\r
  color?: string;\r
};\r
\r
const VERT = \`\r
precision highp float;\r
attribute vec3 position;\r
void main(){\r
  gl_Position = vec4(position, 1.0);\r
}\r
\`;\r
\r
const FRAG = \`\r
#ifdef GL_ES\r
#extension GL_OES_standard_derivatives : enable\r
#endif\r
precision highp float;\r
precision mediump int;\r
\r
uniform float iTime;\r
uniform vec3 iResolution;\r
uniform vec4 iMouse;\r
uniform float uWispDensity;\r
uniform float uTiltScale;\r
uniform float uFlowTime;\r
uniform float uFogTime;\r
uniform float uBeamXFrac;\r
uniform float uBeamYFrac;\r
uniform float uFlowSpeed;\r
uniform float uVLenFactor;\r
uniform float uHLenFactor;\r
uniform float uFogIntensity;\r
uniform float uFogScale;\r
uniform float uWSpeed;\r
uniform float uWIntensity;\r
uniform float uFlowStrength;\r
uniform float uDecay;\r
uniform float uFalloffStart;\r
uniform float uFogFallSpeed;\r
uniform vec3 uColor;\r
uniform float uFade;\r
\r
// Core beam/flare shaping and dynamics\r
#define PI 3.14159265359\r
#define TWO_PI 6.28318530718\r
#define EPS 1e-6\r
#define EDGE_SOFT (DT_LOCAL*4.0)\r
#define DT_LOCAL 0.0038\r
#define TAP_RADIUS 6\r
#define R_H 150.0\r
#define R_V 150.0\r
#define FLARE_HEIGHT 16.0\r
#define FLARE_AMOUNT 8.0\r
#define FLARE_EXP 2.0\r
#define TOP_FADE_START 0.1\r
#define TOP_FADE_EXP 1.0\r
#define FLOW_PERIOD 0.5\r
#define FLOW_SHARPNESS 1.5\r
\r
// Wisps (animated micro-streaks) that travel along the beam\r
#define W_BASE_X 1.5\r
#define W_LAYER_GAP 0.25\r
#define W_LANES 10\r
#define W_SIDE_DECAY 0.5\r
#define W_HALF 0.01\r
#define W_AA 0.15\r
#define W_CELL 20.0\r
#define W_SEG_MIN 0.01\r
#define W_SEG_MAX 0.55\r
#define W_CURVE_AMOUNT 15.0\r
#define W_CURVE_RANGE (FLARE_HEIGHT - 3.0)\r
#define W_BOTTOM_EXP 10.0\r
\r
// Volumetric fog controls\r
#define FOG_ON 1\r
#define FOG_CONTRAST 1.2\r
#define FOG_SPEED_U 0.1\r
#define FOG_SPEED_V -0.1\r
#define FOG_OCTAVES 5\r
#define FOG_BOTTOM_BIAS 0.8\r
#define FOG_TILT_TO_MOUSE 0.05\r
#define FOG_TILT_DEADZONE 0.01\r
#define FOG_TILT_MAX_X 0.35\r
#define FOG_TILT_SHAPE 1.5\r
#define FOG_BEAM_MIN 0.0\r
#define FOG_BEAM_MAX 0.75\r
#define FOG_MASK_GAMMA 0.5\r
#define FOG_EXPAND_SHAPE 12.2\r
#define FOG_EDGE_MIX 0.5\r
\r
// Horizontal vignette for the fog volume\r
#define HFOG_EDGE_START 0.20\r
#define HFOG_EDGE_END 0.98\r
#define HFOG_EDGE_GAMMA 1.4\r
#define HFOG_Y_RADIUS 25.0\r
#define HFOG_Y_SOFT 60.0\r
\r
// Beam extents and edge masking\r
#define EDGE_X0 0.22\r
#define EDGE_X1 0.995\r
#define EDGE_X_GAMMA 1.25\r
#define EDGE_LUMA_T0 0.0\r
#define EDGE_LUMA_T1 2.0\r
#define DITHER_STRENGTH 1.0\r
\r
    float g(float x){return x<=0.00031308?12.92*x:1.055*pow(x,1.0/2.4)-0.055;}\r
    float bs(vec2 p,vec2 q,float powr){\r
        float d=distance(p,q),f=powr*uFalloffStart,r=(f*f)/(d*d+EPS);\r
        return powr*min(1.0,r);\r
    }\r
    float bsa(vec2 p,vec2 q,float powr,vec2 s){\r
        vec2 d=p-q; float dd=(d.x*d.x)/(s.x*s.x)+(d.y*d.y)/(s.y*s.y),f=powr*uFalloffStart,r=(f*f)/(dd+EPS);\r
        return powr*min(1.0,r);\r
    }\r
    float tri01(float x){float f=fract(x);return 1.0-abs(f*2.0-1.0);}\r
    float tauWf(float t,float tmin,float tmax){float a=smoothstep(tmin,tmin+EDGE_SOFT,t),b=1.0-smoothstep(tmax-EDGE_SOFT,tmax,t);return max(0.0,a*b);} \r
    float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.123);return fract(p.x*p.y);}\r
    float vnoise(vec2 p){\r
        vec2 i=floor(p),f=fract(p);\r
        float a=h21(i),b=h21(i+vec2(1,0)),c=h21(i+vec2(0,1)),d=h21(i+vec2(1,1));\r
        vec2 u=f*f*(3.0-2.0*f);\r
        return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\r
    }\r
    float fbm2(vec2 p){\r
        float v=0.0,amp=0.6; mat2 m=mat2(0.86,0.5,-0.5,0.86);\r
        for(int i=0;i<FOG_OCTAVES;++i){v+=amp*vnoise(p); p=m*p*2.03+17.1; amp*=0.52;}\r
        return v;\r
    }\r
    float rGate(float x,float l){float a=smoothstep(0.0,W_AA,x),b=1.0-smoothstep(l,l+W_AA,x);return max(0.0,a*b);}\r
    float flareY(float y){float t=clamp(1.0-(clamp(y,0.0,FLARE_HEIGHT)/max(FLARE_HEIGHT,EPS)),0.0,1.0);return pow(t,FLARE_EXP);}\r
\r
    float vWisps(vec2 uv,float topF){\r
    float y=uv.y,yf=(y+uFlowTime*uWSpeed)/W_CELL;\r
    float dRaw=clamp(uWispDensity,0.0,2.0),d=dRaw<=0.0?1.0:dRaw;\r
    float lanesF=floor(float(W_LANES)*min(d,1.0)+0.5); // WebGL1-safe\r
    int lanes=int(max(1.0,lanesF));\r
    float sp=min(d,1.0),ep=max(d-1.0,0.0);\r
    float fm=flareY(max(y,0.0)),rm=clamp(1.0-(y/max(W_CURVE_RANGE,EPS)),0.0,1.0),cm=fm*rm;\r
    const float G=0.05; float xS=1.0+(FLARE_AMOUNT*W_CURVE_AMOUNT*G)*cm;\r
    float sPix=clamp(y/R_V,0.0,1.0),bGain=pow(1.0-sPix,W_BOTTOM_EXP),sum=0.0;\r
    for(int s=0;s<2;++s){\r
        float sgn=s==0?-1.0:1.0;\r
        for(int i=0;i<W_LANES;++i){\r
            if(i>=lanes) break;\r
            float off=W_BASE_X+float(i)*W_LAYER_GAP,xc=sgn*(off*xS);\r
            float dx=abs(uv.x-xc),lat=1.0-smoothstep(W_HALF,W_HALF+W_AA,dx),amp=exp(-off*W_SIDE_DECAY);\r
            float seed=h21(vec2(off,sgn*17.0)),yf2=yf+seed*7.0,ci=floor(yf2),fy=fract(yf2);\r
            float seg=mix(W_SEG_MIN,W_SEG_MAX,h21(vec2(ci,off*2.3)));\r
            float spR=h21(vec2(ci,off+sgn*31.0)),seg1=rGate(fy,seg)*step(spR,sp);\r
            if(ep>0.0){float spR2=h21(vec2(ci*3.1+7.0,off*5.3+sgn*13.0)); float f2=fract(fy+0.5); seg1+=rGate(f2,seg*0.9)*step(spR2,ep);}\r
            sum+=amp*lat*seg1;\r
        }\r
    }\r
    float span=smoothstep(-3.0,0.0,y)*(1.0-smoothstep(R_V-6.0,R_V,y));\r
    return uWIntensity*sum*topF*bGain*span;\r
}\r
\r
void mainImage(out vec4 fc,in vec2 frag){\r
    vec2 C=iResolution.xy*.5; float invW=1.0/max(C.x,1.0);\r
    float sc=512.0/iResolution.x*.4;\r
    vec2 uv=(frag-C)*sc,off=vec2(uBeamXFrac*iResolution.x*sc,uBeamYFrac*iResolution.y*sc);\r
    vec2 uvc = uv - off;\r
    float a=0.0,b=0.0;\r
    float basePhase=1.5*PI+uDecay*.5; float tauMin=basePhase-uDecay; float tauMax=basePhase;\r
    float cx=clamp(uvc.x/(R_H*uHLenFactor),-1.0,1.0),tH=clamp(TWO_PI-acos(cx),tauMin,tauMax);\r
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){\r
        float tu=tH+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;\r
        float spd=max(abs(sin(tu)),0.02),u=clamp((basePhase-tu)/max(uDecay,EPS),0.0,1.0),env=pow(1.0-abs(u*2.0-1.0),0.8);\r
        vec2 p=vec2((R_H*uHLenFactor)*cos(tu),0.0);\r
        a+=wt*bs(uvc,p,env*spd);\r
    }\r
    float yPix=uvc.y,cy=clamp(-yPix/(R_V*uVLenFactor),-1.0,1.0),tV=clamp(TWO_PI-acos(cy),tauMin,tauMax);\r
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){\r
        float tu=tV+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;\r
        float yb=(-R_V)*cos(tu),s=clamp(yb/R_V,0.0,1.0),spd=max(abs(sin(tu)),0.02);\r
        float env=pow(1.0-s,0.6)*spd;\r
        float cap=1.0-smoothstep(TOP_FADE_START,1.0,s); cap=pow(cap,TOP_FADE_EXP); env*=cap;\r
        float ph=s/max(FLOW_PERIOD,EPS)+uFlowTime*uFlowSpeed;\r
        float fl=pow(tri01(ph),FLOW_SHARPNESS);\r
        env*=mix(1.0-uFlowStrength,1.0,fl);\r
        float yp=(-R_V*uVLenFactor)*cos(tu),m=pow(smoothstep(FLARE_HEIGHT,0.0,yp),FLARE_EXP),wx=1.0+FLARE_AMOUNT*m;\r
        vec2 sig=vec2(wx,1.0),p=vec2(0.0,yp);\r
        float mask=step(0.0,yp);\r
        b+=wt*bsa(uvc,p,mask*env,sig);\r
    }\r
    float sPix=clamp(yPix/R_V,0.0,1.0),topA=pow(1.0-smoothstep(TOP_FADE_START,1.0,sPix),TOP_FADE_EXP);\r
    float L=a+b*topA;\r
    float w=vWisps(vec2(uvc.x,yPix),topA);\r
    float fog=0.0;\r
#if FOG_ON\r
    vec2 fuv=uvc*uFogScale;\r
    float mAct=step(1.0,length(iMouse.xy)),nx=((iMouse.x-C.x)*invW)*mAct;\r
    float ax = abs(nx);\r
    float stMag = mix(ax, pow(ax, FOG_TILT_SHAPE), 0.35);\r
    float st = sign(nx) * stMag * uTiltScale;\r
    st = clamp(st, -FOG_TILT_MAX_X, FOG_TILT_MAX_X);\r
    vec2 dir=normalize(vec2(st,1.0));\r
    fuv+=uFogTime*uFogFallSpeed*dir;\r
    vec2 prp=vec2(-dir.y,dir.x);\r
    fuv+=prp*(0.08*sin(dot(uvc,prp)*0.08+uFogTime*0.9));\r
    float n=fbm2(fuv+vec2(fbm2(fuv+vec2(7.3,2.1)),fbm2(fuv+vec2(-3.7,5.9)))*0.6);\r
    n=pow(clamp(n,0.0,1.0),FOG_CONTRAST);\r
    float pixW = 1.0 / max(iResolution.y, 1.0);\r
#ifdef GL_OES_standard_derivatives\r
    float wL = max(fwidth(L), pixW);\r
#else\r
    float wL = pixW;\r
#endif\r
    float m0=pow(smoothstep(FOG_BEAM_MIN - wL, FOG_BEAM_MAX + wL, L),FOG_MASK_GAMMA);\r
    float bm=1.0-pow(1.0-m0,FOG_EXPAND_SHAPE); bm=mix(bm*m0,bm,FOG_EDGE_MIX);\r
    float yP=1.0-smoothstep(HFOG_Y_RADIUS,HFOG_Y_RADIUS+HFOG_Y_SOFT,abs(yPix));\r
    float nxF=abs((frag.x-C.x)*invW),hE=1.0-smoothstep(HFOG_EDGE_START,HFOG_EDGE_END,nxF); hE=pow(clamp(hE,0.0,1.0),HFOG_EDGE_GAMMA);\r
    float hW=mix(1.0,hE,clamp(yP,0.0,1.0));\r
    float bBias=mix(1.0,1.0-sPix,FOG_BOTTOM_BIAS);\r
    float browserFogIntensity = uFogIntensity;\r
    browserFogIntensity *= 1.8;\r
    float radialFade = 1.0 - smoothstep(0.0, 0.7, length(uvc) / 120.0);\r
    float safariFog = n * browserFogIntensity * bBias * bm * hW * radialFade;\r
    fog = safariFog;\r
#endif\r
    float LF=L+fog;\r
    float dith=(h21(frag)-0.5)*(DITHER_STRENGTH/255.0);\r
    float tone=g(LF+w);\r
    vec3 col=tone*uColor+dith;\r
    float alpha=clamp(g(L+w*0.6)+dith*0.6,0.0,1.0);\r
    float nxE=abs((frag.x-C.x)*invW),xF=pow(clamp(1.0-smoothstep(EDGE_X0,EDGE_X1,nxE),0.0,1.0),EDGE_X_GAMMA);\r
    float scene=LF+max(0.0,w)*0.5,hi=smoothstep(EDGE_LUMA_T0,EDGE_LUMA_T1,scene);\r
    float eM=mix(xF,1.0,hi);\r
    col*=eM; alpha*=eM;\r
    col*=uFade; alpha*=uFade;\r
    fc=vec4(col,alpha);\r
}\r
\r
void main(){\r
  vec4 fc;\r
  mainImage(fc, gl_FragCoord.xy);\r
  gl_FragColor = fc;\r
}\r
\`;\r
\r
export const LaserFlow: React.FC<Props> = ({\r
  className,\r
  style,\r
  wispDensity = 1,\r
  dpr,\r
  mouseSmoothTime = 0.0,\r
  mouseTiltStrength = 0.01,\r
  horizontalBeamOffset = 0.1,\r
  verticalBeamOffset = 0.0,\r
  flowSpeed = 0.35,\r
  verticalSizing = 2.0,\r
  horizontalSizing = 0.5,\r
  fogIntensity = 0.45,\r
  fogScale = 0.3,\r
  wispSpeed = 15.0,\r
  wispIntensity = 5.0,\r
  flowStrength = 0.25,\r
  decay = 1.1,\r
  falloffStart = 1.2,\r
  fogFallSpeed = 0.6,\r
  color = '#FF79C6'\r
}) => {\r
  const mountRef = useRef<HTMLDivElement | null>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);\r
  const uniformsRef = useRef<any>(null);\r
  const hasFadedRef = useRef(false);\r
  const rectRef = useRef<DOMRect | null>(null);\r
  const baseDprRef = useRef<number>(1);\r
  const currentDprRef = useRef<number>(1);\r
  const fpsSamplesRef = useRef<number[]>([]);\r
  const lastFpsCheckRef = useRef<number>(performance.now());\r
  const emaDtRef = useRef<number>(16.7); // ms\r
  const pausedRef = useRef<boolean>(false);\r
  const inViewRef = useRef<boolean>(true);\r
\r
  const hexToRGB = (hex: string) => {\r
    let c = hex.trim();\r
    if (c[0] === '#') c = c.slice(1);\r
    if (c.length === 3)\r
      c = c\r
        .split('')\r
        .map(x => x + x)\r
        .join('');\r
    const n = parseInt(c, 16) || 0xffffff;\r
    return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };\r
  };\r
\r
  useEffect(() => {\r
    const mount = mountRef.current!;\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      alpha: false,\r
      depth: false,\r
      stencil: false,\r
      powerPreference: 'high-performance',\r
      premultipliedAlpha: false,\r
      preserveDrawingBuffer: false,\r
      failIfMajorPerformanceCaveat: false,\r
      logarithmicDepthBuffer: false\r
    });\r
    rendererRef.current = renderer;\r
\r
    baseDprRef.current = Math.min(dpr ?? (window.devicePixelRatio || 1), 2);\r
    currentDprRef.current = baseDprRef.current;\r
\r
    renderer.setPixelRatio(currentDprRef.current);\r
    renderer.shadowMap.enabled = false;\r
    renderer.outputColorSpace = THREE.SRGBColorSpace;\r
    renderer.setClearColor(0x000000, 1);\r
    const canvas = renderer.domElement;\r
    canvas.style.width = '100%';\r
    canvas.style.height = '100%';\r
    canvas.style.display = 'block';\r
    mount.appendChild(canvas);\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geometry = new THREE.BufferGeometry();\r
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));\r
\r
    const uniforms = {\r
      iTime: { value: 0 },\r
      iResolution: { value: new THREE.Vector3(1, 1, 1) },\r
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },\r
      uWispDensity: { value: wispDensity },\r
      uTiltScale: { value: mouseTiltStrength },\r
      uFlowTime: { value: 0 },\r
      uFogTime: { value: 0 },\r
      uBeamXFrac: { value: horizontalBeamOffset },\r
      uBeamYFrac: { value: verticalBeamOffset },\r
      uFlowSpeed: { value: flowSpeed },\r
      uVLenFactor: { value: verticalSizing },\r
      uHLenFactor: { value: horizontalSizing },\r
      uFogIntensity: { value: fogIntensity },\r
      uFogScale: { value: fogScale },\r
      uWSpeed: { value: wispSpeed },\r
      uWIntensity: { value: wispIntensity },\r
      uFlowStrength: { value: flowStrength },\r
      uDecay: { value: decay },\r
      uFalloffStart: { value: falloffStart },\r
      uFogFallSpeed: { value: fogFallSpeed },\r
      uColor: { value: new THREE.Vector3(1, 1, 1) },\r
      uFade: { value: hasFadedRef.current ? 1 : 0 }\r
    };\r
    uniformsRef.current = uniforms;\r
\r
    const material = new THREE.RawShaderMaterial({\r
      vertexShader: VERT,\r
      fragmentShader: FRAG,\r
      uniforms,\r
      transparent: false,\r
      depthTest: false,\r
      depthWrite: false,\r
      blending: THREE.NormalBlending\r
    });\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    mesh.frustumCulled = false;\r
    scene.add(mesh);\r
\r
    const clock = new THREE.Clock();\r
    let prevTime = 0;\r
    let fade = hasFadedRef.current ? 1 : 0;\r
\r
    const mouseTarget = new THREE.Vector2(0, 0);\r
    const mouseSmooth = new THREE.Vector2(0, 0);\r
\r
    const setSizeNow = () => {\r
      const w = mount.clientWidth || 1;\r
      const h = mount.clientHeight || 1;\r
      const pr = currentDprRef.current;\r
      renderer.setPixelRatio(pr);\r
      renderer.setSize(w, h, false);\r
      uniforms.iResolution.value.set(w * pr, h * pr, pr);\r
      rectRef.current = canvas.getBoundingClientRect();\r
    };\r
\r
    let resizeRaf = 0;\r
    const scheduleResize = () => {\r
      if (resizeRaf) cancelAnimationFrame(resizeRaf);\r
      resizeRaf = requestAnimationFrame(setSizeNow);\r
    };\r
\r
    setSizeNow();\r
    const ro = new ResizeObserver(scheduleResize);\r
    ro.observe(mount);\r
\r
    const io = new IntersectionObserver(\r
      entries => {\r
        inViewRef.current = entries[0]?.isIntersecting ?? true;\r
      },\r
      { root: null, threshold: 0 }\r
    );\r
    io.observe(mount);\r
\r
    const onVis = () => {\r
      pausedRef.current = document.hidden;\r
    };\r
    document.addEventListener('visibilitychange', onVis, { passive: true });\r
\r
    const updateMouse = (clientX: number, clientY: number) => {\r
      const rect = rectRef.current;\r
      if (!rect) return;\r
      const x = clientX - rect.left;\r
      const y = clientY - rect.top;\r
      const ratio = currentDprRef.current;\r
      const hb = rect.height * ratio;\r
      mouseTarget.set(x * ratio, hb - y * ratio);\r
    };\r
    const onMove = (ev: PointerEvent | MouseEvent) => updateMouse(ev.clientX, ev.clientY);\r
    const onLeave = () => mouseTarget.set(0, 0);\r
    canvas.addEventListener('pointermove', onMove as any, { passive: true });\r
    canvas.addEventListener('pointerdown', onMove as any, { passive: true });\r
    canvas.addEventListener('pointerenter', onMove as any, { passive: true });\r
    canvas.addEventListener('pointerleave', onLeave as any, { passive: true });\r
\r
    const onCtxLost = (e: Event) => {\r
      e.preventDefault();\r
      pausedRef.current = true;\r
    };\r
    const onCtxRestored = () => {\r
      pausedRef.current = false;\r
      scheduleResize();\r
    };\r
    canvas.addEventListener('webglcontextlost', onCtxLost, false);\r
    canvas.addEventListener('webglcontextrestored', onCtxRestored, false);\r
\r
    let raf = 0;\r
\r
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));\r
    const dprFloor = 0.6;\r
    const lowerThresh = 50;\r
    const upperThresh = 58;\r
    let lastDprChangeRef = 0;\r
    const dprChangeCooldown = 2000;\r
\r
    const adjustDprIfNeeded = (now: number) => {\r
      const elapsed = now - lastFpsCheckRef.current;\r
      if (elapsed < 750) return;\r
\r
      const samples = fpsSamplesRef.current;\r
      if (samples.length === 0) {\r
        lastFpsCheckRef.current = now;\r
        return;\r
      }\r
      const avgFps = samples.reduce((a, b) => a + b, 0) / samples.length;\r
\r
      let next = currentDprRef.current;\r
      const base = baseDprRef.current;\r
\r
      if (avgFps < lowerThresh) {\r
        next = clamp(currentDprRef.current * 0.85, dprFloor, base);\r
      } else if (avgFps > upperThresh && currentDprRef.current < base) {\r
        next = clamp(currentDprRef.current * 1.1, dprFloor, base);\r
      }\r
\r
      if (Math.abs(next - currentDprRef.current) > 0.01 && now - lastDprChangeRef > dprChangeCooldown) {\r
        currentDprRef.current = next;\r
        lastDprChangeRef = now;\r
        setSizeNow();\r
      }\r
\r
      fpsSamplesRef.current = [];\r
      lastFpsCheckRef.current = now;\r
    };\r
\r
    const animate = () => {\r
      raf = requestAnimationFrame(animate);\r
      if (pausedRef.current || !inViewRef.current) return;\r
\r
      const t = clock.getElapsedTime();\r
      const dt = Math.max(0, t - prevTime);\r
      prevTime = t;\r
\r
      const dtMs = dt * 1000;\r
      emaDtRef.current = emaDtRef.current * 0.9 + dtMs * 0.1;\r
      const instFps = 1000 / Math.max(1, emaDtRef.current);\r
      fpsSamplesRef.current.push(instFps);\r
\r
      uniforms.iTime.value = t;\r
\r
      const cdt = Math.min(0.033, Math.max(0.001, dt));\r
      (uniforms.uFlowTime.value as number) += cdt;\r
      (uniforms.uFogTime.value as number) += cdt;\r
\r
      if (!hasFadedRef.current) {\r
        const fadeDur = 1.0;\r
        fade = Math.min(1, fade + cdt / fadeDur);\r
        uniforms.uFade.value = fade;\r
        if (fade >= 1) hasFadedRef.current = true;\r
      }\r
\r
      const tau = Math.max(1e-3, mouseSmoothTime);\r
      const alpha = 1 - Math.exp(-cdt / tau);\r
      mouseSmooth.lerp(mouseTarget, alpha);\r
      uniforms.iMouse.value.set(mouseSmooth.x, mouseSmooth.y, 0, 0);\r
\r
      renderer.render(scene, camera);\r
\r
      adjustDprIfNeeded(performance.now());\r
    };\r
\r
    animate();\r
\r
    return () => {\r
      cancelAnimationFrame(raf);\r
      ro.disconnect();\r
      io.disconnect();\r
      document.removeEventListener('visibilitychange', onVis);\r
      canvas.removeEventListener('pointermove', onMove as any);\r
      canvas.removeEventListener('pointerdown', onMove as any);\r
      canvas.removeEventListener('pointerenter', onMove as any);\r
      canvas.removeEventListener('pointerleave', onLeave as any);\r
      canvas.removeEventListener('webglcontextlost', onCtxLost);\r
      canvas.removeEventListener('webglcontextrestored', onCtxRestored);\r
      geometry.dispose();\r
      material.dispose();\r
      renderer.dispose();\r
      if (mount.contains(canvas)) mount.removeChild(canvas);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [dpr]);\r
\r
  useEffect(() => {\r
    const uniforms = uniformsRef.current;\r
    if (!uniforms) return;\r
\r
    uniforms.uWispDensity.value = wispDensity;\r
    uniforms.uTiltScale.value = mouseTiltStrength;\r
    uniforms.uBeamXFrac.value = horizontalBeamOffset;\r
    uniforms.uBeamYFrac.value = verticalBeamOffset;\r
    uniforms.uFlowSpeed.value = flowSpeed;\r
    uniforms.uVLenFactor.value = verticalSizing;\r
    uniforms.uHLenFactor.value = horizontalSizing;\r
    uniforms.uFogIntensity.value = fogIntensity;\r
    uniforms.uFogScale.value = fogScale;\r
    uniforms.uWSpeed.value = wispSpeed;\r
    uniforms.uWIntensity.value = wispIntensity;\r
    uniforms.uFlowStrength.value = flowStrength;\r
    uniforms.uDecay.value = decay;\r
    uniforms.uFalloffStart.value = falloffStart;\r
    uniforms.uFogFallSpeed.value = fogFallSpeed;\r
\r
    const { r, g, b } = hexToRGB(color || '#FFFFFF');\r
    uniforms.uColor.value.set(r, g, b);\r
  }, [\r
    wispDensity,\r
    mouseTiltStrength,\r
    horizontalBeamOffset,\r
    verticalBeamOffset,\r
    flowSpeed,\r
    verticalSizing,\r
    horizontalSizing,\r
    fogIntensity,\r
    fogScale,\r
    wispSpeed,\r
    wispIntensity,\r
    flowStrength,\r
    decay,\r
    falloffStart,\r
    fogFallSpeed,\r
    color\r
  ]);\r
\r
  return <div ref={mountRef} className={\`w-full h-full relative \${className || ''}\`} style={style} />;\r
};\r
\r
export default LaserFlow;\r
`,sn={dependencies:"three",usage:`import LaserFlow from './LaserFlow';
import { useRef } from 'react';

// NOTE: You can also adjust the variables in the shader for super detailed customization

// Basic Usage
<div style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
  <LaserFlow />
</div>

// Image Example Interactive Reveal Effect
function LaserFlowBoxExample() {
  const revealImgRef = useRef(null);

  return (
    <div 
      style={{ 
        height: '800px', 
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: '#060010'
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', \`\${x}px\`);
          el.style.setProperty('--my', \`\${y + rect.height * 0.5}px\`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', '-9999px');
          el.style.setProperty('--my', '-9999px');
        }
      }}
    >
      <LaserFlow
        horizontalBeamOffset={0.1}
        verticalBeamOffset={0.0}
        color="#FF79C6"
      />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '86%',
        height: '60%',
        backgroundColor: '#060010',
        borderRadius: '20px',
        border: '2px solid #FF79C6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        zIndex: 6
      }}>
        {/* Your content here */}
      </div>

      <img
        ref={revealImgRef}
        src="/path/to/image.jpg"
        alt="Reveal effect"
        style={{
          position: 'absolute',
          width: '100%',
          top: '-50%',
          zIndex: 5,
          mixBlendMode: 'lighten',
          opacity: 0.3,
          pointerEvents: 'none',
          '--mx': '-9999px',
          '--my': '-9999px',
          WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      />
    </div>
  );
}`,code:nn,css:rn,tailwind:tn,tsCode:an,tsTailwind:on},hn=()=>{const q=r.useRef(null),b=r.useRef(null),[G,k]=Xe(),[d,O]=r.useState("box"),[v,L]=r.useState("#CF9EFF"),[E,D]=r.useState(.5),[h,M]=r.useState(2),[R,P]=r.useState(1),[x,I]=r.useState(15),[g,W]=r.useState(5),[S,U]=r.useState(.35),[C,$]=r.useState(.25),[H,T]=r.useState(.45),[B,X]=r.useState(.3),[i,N]=r.useState(.6),[w,V]=r.useState(1.1),[_,Y]=r.useState(1.2),K=[{label:"Box",value:"box"},{label:"Basic",value:"basic"}],t=[{name:"horizontalBeamOffset",type:"number",default:"0.1",description:"Horizontal offset of the beam (0–1 of canvas width)."},{name:"verticalBeamOffset",type:"number",default:"0.0",description:"Vertical offset of the beam (0–1 of canvas height)."},{name:"horizontalSizing",type:"number",default:"0.5",description:"Horizontal sizing factor of the beam footprint."},{name:"verticalSizing",type:"number",default:"2.0",description:"Vertical sizing factor of the beam footprint."},{name:"wispDensity",type:"number",default:"1",description:"Density of micro-streak wisps."},{name:"wispSpeed",type:"number",default:"15.0",description:"Speed of wisp motion."},{name:"wispIntensity",type:"number",default:"5.0",description:"Brightness of wisps."},{name:"flowSpeed",type:"number",default:"0.35",description:"Speed of the beam’s flow modulation."},{name:"flowStrength",type:"number",default:"0.25",description:"Strength of the beam’s flow modulation."},{name:"fogIntensity",type:"number",default:"0.45",description:"Overall volumetric fog intensity."},{name:"fogScale",type:"number",default:"0.3",description:"Spatial scale for the fog noise."},{name:"fogFallSpeed",type:"number",default:"0.6",description:"Drift speed for the fog field."},{name:"mouseTiltStrength",type:"number",default:"0.01",description:"How much mouse x tilts the fog volume."},{name:"mouseSmoothTime",type:"number",default:"0.0",description:"Pointer smoothing time (seconds)."},{name:"decay",type:"number",default:"1.1",description:"Beam decay shaping for sampling envelope."},{name:"falloffStart",type:"number",default:"1.2",description:"Falloff start radius used in inverse-square blending."},{name:"dpr",type:"number",default:"auto",description:"Device pixel ratio override (defaults to window.devicePixelRatio)."},{name:"color",type:"string",default:"#FF79C6",description:"Beam color (hex)."}];return e.jsxs(Le,{children:[e.jsxs(De,{children:[e.jsxs(Ee,{ref:q,position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",onMouseMove:n=>{const a=n.currentTarget.getBoundingClientRect(),c=n.clientX-a.left,Z=n.clientY-a.top,F=b.current;F&&(F.style.setProperty("--mx",`${c}px`),F.style.setProperty("--my",`${Z+a.height*.5}px`))},onMouseLeave:()=>{const n=b.current;n&&(n.style.setProperty("--mx","-9999px"),n.style.setProperty("--my","-9999px"))},children:[e.jsx(en,{horizontalBeamOffset:d==="box"?.1:0,verticalBeamOffset:d==="box"?-.2:-.5,horizontalSizing:E,verticalSizing:h,wispDensity:R,wispSpeed:x,wispIntensity:g,flowSpeed:S,flowStrength:C,fogIntensity:H,fogScale:B,fogFallSpeed:i,decay:w,falloffStart:_,color:v,className:`laser-flow-demo-${d}`},G),d==="box"&&e.jsxs(e.Fragment,{children:[e.jsx(Ee,{className:"demo-container-dots",zIndex:6,position:"absolute",top:"70%",left:"50%",transform:"translateX(-50%)",width:"86%",height:"60%",backgroundColor:"#060010",borderRadius:"20px",border:`2px solid ${v}`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"2xl"}),e.jsx(ye,{ref:b,src:"https://cdn.dribbble.com/userupload/15325964/file/original-25ae735b5d9255a4a31d3471fd1c346a.png?resize=1024x768&vertical=center",position:"absolute",width:"100%",top:"-50%",zIndex:2,mixBlendMode:"lighten",opacity:.3,pointerEvents:"none",style:{"--mx":"-9999px","--my":"-9999px",WebkitMaskImage:"radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",maskImage:"radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat"}})]}),e.jsx(Be,{onClick:k})]}),e.jsxs(We,{children:[e.jsx(Ce,{title:"Example:",options:K,value:d,onChange:O,width:120}),e.jsxs(be,{alignItems:"center",mt:4,children:[e.jsx(Ge,{fontSize:"sm",mr:2,children:"Color"}),e.jsx(Oe,{type:"color",value:v,onChange:n=>{L(n.target.value)},width:"50px"})]}),e.jsx(l,{title:"Horizontal Sizing",min:.1,max:2,step:.01,value:E,onChange:D}),e.jsx(l,{title:"Vertical Sizing",min:.1,max:5,step:.1,value:h,onChange:M}),e.jsx(l,{title:"Wisp Density",min:0,max:5,step:.1,value:R,onChange:P}),e.jsx(l,{title:"Wisp Speed",min:1,max:50,step:.5,value:x,onChange:I}),e.jsx(l,{title:"Wisp Intensity",min:0,max:20,step:.1,value:g,onChange:W}),e.jsx(l,{title:"Flow Speed",min:0,max:2,step:.01,value:S,onChange:U}),e.jsx(l,{title:"Flow Strength",min:0,max:1,step:.01,value:C,onChange:$}),e.jsx(l,{title:"Fog Intensity",min:0,max:1,step:.01,value:H,onChange:T}),e.jsx(l,{title:"Fog Scale",min:.1,max:1,step:.01,value:B,onChange:X}),e.jsx(l,{title:"Fog Fall Speed",min:0,max:2,step:.01,value:i,onChange:N}),e.jsx(l,{title:"Decay",min:.5,max:3,step:.01,value:w,onChange:V}),e.jsx(l,{title:"Falloff Start",min:.5,max:3,step:.01,value:_,onChange:Y})]}),e.jsx(Me,{data:t}),e.jsx(He,{dependencyList:["three"]})]}),e.jsx(Pe,{children:e.jsx(Ie,{codeObject:sn})})]})};export{hn as default};
