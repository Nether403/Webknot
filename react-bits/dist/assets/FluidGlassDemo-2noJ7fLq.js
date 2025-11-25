import{r as Y,_ as $e,c6 as Xo,j as de,B as Yo}from"./index-wsKSLPNH.js";import{T as Ko,P as Jo,a as Zo,C as Qo,b as qo}from"./PropTable-C4uPWs8h.js";import{C as $o}from"./Customize-1m_ZNqR9.js";import{D as ea}from"./Dependencies-BHoMfJUj.js";import{u as ra}from"./useForceRerender-BCFU-k0M.js";import{P as ta}from"./PreviewSelect-B8u33nUa.js";import{P as cr}from"./PreviewSlider-m1G_aiYP.js";import{V as er,f as Je,a5 as Xr,a2 as Ht,b5 as na,g as Sr,C as ir,a6 as oa,bf as aa,be as ia,bg as sa,U as la,a0 as ca,M as Xt,l as ua,bh as fa,b3 as da,b2 as xo,aA as ha,T as pa,ae as xn,bd as ma,a4 as va,P as Yt,a3 as ga,w as ya,I as ba,b0 as wa,$ as xa,at as Sa,bi as ka,S as Ta}from"./three.module-0PRdiASR.js";import{a as Ye,u as hr,g as Sn,s as Ca,e as So,C as _a,d as Ma}from"./react-three-fiber.esm-Dkk-fK7P.js";import{s as ko}from"./shaderMaterial-Bv5cOCPN.js";import{u as Ea}from"./Texture-DM4y397v.js";import{u as Ua}from"./Gltf-SAcSsb_c.js";import{u as Ot}from"./Fbo-CRBkstwy.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";function jr(l,t,u){return t in l?Object.defineProperty(l,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):l[t]=u,l}function Lt(l,t){(t==null||t>l.length)&&(t=l.length);for(var u=0,c=new Array(t);u<t;u++)c[u]=l[u];return c}function Pa(l,t){if(l){if(typeof l=="string")return Lt(l,t);var u=Object.prototype.toString.call(l).slice(8,-1);if(u==="Object"&&l.constructor&&(u=l.constructor.name),u==="Map"||u==="Set")return Array.from(l);if(u==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u))return Lt(l,t)}}function Da(l){if(Array.isArray(l))return Lt(l)}function Fa(l){if(typeof Symbol<"u"&&l[Symbol.iterator]!=null||l["@@iterator"]!=null)return Array.from(l)}function Aa(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ra(l){return Da(l)||Fa(l)||Pa(l)||Aa()}new er;new er;function Ia(l,t,u){return Math.max(t,Math.min(u,l))}function Ba(l,t){return Ia(l-Math.floor(l/t)*t,0,t)}function Oa(l,t){var u=Ba(t-l,Math.PI*2);return u>Math.PI&&(u-=Math.PI*2),u}function To(l,t){if(!(l instanceof t))throw new TypeError("Cannot call a class as a function")}var Ne=function l(t,u,c){var r=this;To(this,l),jr(this,"dot2",function(e,n){return r.x*e+r.y*n}),jr(this,"dot3",function(e,n,a){return r.x*e+r.y*n+r.z*a}),this.x=t,this.y=u,this.z=c},La=[new Ne(1,1,0),new Ne(-1,1,0),new Ne(1,-1,0),new Ne(-1,-1,0),new Ne(1,0,1),new Ne(-1,0,1),new Ne(1,0,-1),new Ne(-1,0,-1),new Ne(0,1,1),new Ne(0,-1,1),new Ne(0,1,-1),new Ne(0,-1,-1)],kn=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],Tn=new Array(512),Cn=new Array(512),Ga=function(t){t>0&&t<1&&(t*=65536),t=Math.floor(t),t<256&&(t|=t<<8);for(var u=0;u<256;u++){var c;u&1?c=kn[u]^t&255:c=kn[u]^t>>8&255,Tn[u]=Tn[u+256]=c,Cn[u]=Cn[u+256]=La[c%12]}};Ga(0);function za(l){if(typeof l=="number")l=Math.abs(l);else if(typeof l=="string"){var t=l;l=0;for(var u=0;u<t.length;u++)l=(l+(u+1)*(t.charCodeAt(u)%96))%2147483647}return l===0&&(l=311),l}function _n(l){var t=za(l);return function(){var u=t*48271%2147483647;return t=u,u/2147483647}}var Wa=function l(t){var u=this;To(this,l),jr(this,"seed",0),jr(this,"init",function(c){u.seed=c,u.value=_n(c)}),jr(this,"value",_n(this.seed)),this.init(t)};new Wa(Math.random());var Na=function(t){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:.01,c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1/(2*Math.PI);return c/Math.atan(1/u)*Math.atan(Math.sin(2*Math.PI*t*r)/u)},Co=function(t){return 1/(1+t+.48*t*t+.235*t*t*t)},ja=function(t){return t},Va={in:function(t){return 1-Math.cos(t*Math.PI/2)},out:function(t){return Math.sin(t*Math.PI/2)},inOut:function(t){return-(Math.cos(Math.PI*t)-1)/2}},Ha={in:function(t){return t*t*t},out:function(t){return 1-Math.pow(1-t,3)},inOut:function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}},Xa={in:function(t){return t*t*t*t*t},out:function(t){return 1-Math.pow(1-t,5)},inOut:function(t){return t<.5?16*t*t*t*t*t:1-Math.pow(-2*t+2,5)/2}},Ya={in:function(t){return 1-Math.sqrt(1-Math.pow(t,2))},out:function(t){return Math.sqrt(1-Math.pow(t-1,2))},inOut:function(t){return t<.5?(1-Math.sqrt(1-Math.pow(2*t,2)))/2:(Math.sqrt(1-Math.pow(-2*t+2,2))+1)/2}},Ka={in:function(t){return t*t*t*t},out:function(t){return 1- --t*t*t*t},inOut:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t}},Ja={in:function(t){return t===0?0:Math.pow(2,10*t-10)},out:function(t){return t===1?1:1-Math.pow(2,-10*t)},inOut:function(t){return t===0?0:t===1?1:t<.5?Math.pow(2,20*t-10)/2:(2-Math.pow(2,-20*t+10))/2}};function Ae(l,t,u){var c=arguments.length>3&&arguments[3]!==void 0?arguments[3]:.25,r=arguments.length>4&&arguments[4]!==void 0?arguments[4]:.01,e=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,n=arguments.length>6&&arguments[6]!==void 0?arguments[6]:Co,a=arguments.length>7&&arguments[7]!==void 0?arguments[7]:.001,o="velocity_"+t;if(l.__damp===void 0&&(l.__damp={}),l.__damp[o]===void 0&&(l.__damp[o]=0),Math.abs(l[t]-u)<=a)return l[t]=u,!1;c=Math.max(1e-4,c);var i=2/c,s=n(i*r),f=l[t]-u,d=u,h=e*c;f=Math.min(Math.max(f,-h),h),u=l[t]-f;var p=(l.__damp[o]+i*f)*r;l.__damp[o]=(l.__damp[o]-i*p)*s;var g=u+(f+p)*s;return d-l[t]>0==g>d&&(g=d,l.__damp[o]=(g-d)/r),l[t]=g,!0}var Za=function(t){return t&&t.isCamera},Qa=function(t){return t&&t.isLight},Rr=new Je,Mn=new Xr,En=new Xr,Ir=new Ht,At=new Je;function qa(l,t,u,c,r,e,n){typeof t=="number"?Rr.setScalar(t):Array.isArray(t)?Rr.set(t[0],t[1],t[2]):Rr.copy(t);var a=l.parent;l.updateWorldMatrix(!0,!1),At.setFromMatrixPosition(l.matrixWorld),Za(l)||Qa(l)?Ir.lookAt(At,Rr,l.up):Ir.lookAt(Rr,At,l.up),ft(l.quaternion,En.setFromRotationMatrix(Ir),u,c,r,e,n),a&&(Ir.extractRotation(a.matrixWorld),Mn.setFromRotationMatrix(Ir),ft(l.quaternion,En.copy(l.quaternion).premultiply(Mn.invert()),u,c,r,e,n))}function xr(l,t,u,c,r,e,n,a){return Ae(l,t,l[t]+Oa(l[t],u),c,r,e,n,a)}var Br=new er,Un,Pn;function $a(l,t,u,c,r,e,n){return typeof t=="number"?Br.setScalar(t):Array.isArray(t)?Br.set(t[0],t[1]):Br.copy(t),Un=Ae(l,"x",Br.x,u,c,r,e,n),Pn=Ae(l,"y",Br.y,u,c,r,e,n),Un||Pn}var yr=new Je,Dn,Fn,An;function Gt(l,t,u,c,r,e,n){return typeof t=="number"?yr.setScalar(t):Array.isArray(t)?yr.set(t[0],t[1],t[2]):yr.copy(t),Dn=Ae(l,"x",yr.x,u,c,r,e,n),Fn=Ae(l,"y",yr.y,u,c,r,e,n),An=Ae(l,"z",yr.z,u,c,r,e,n),Dn||Fn||An}var ur=new Sr,Rn,In,Bn,On;function ei(l,t,u,c,r,e,n){return typeof t=="number"?ur.setScalar(t):Array.isArray(t)?ur.set(t[0],t[1],t[2],t[3]):ur.copy(t),Rn=Ae(l,"x",ur.x,u,c,r,e,n),In=Ae(l,"y",ur.y,u,c,r,e,n),Bn=Ae(l,"z",ur.z,u,c,r,e,n),On=Ae(l,"w",ur.w,u,c,r,e,n),Rn||In||Bn||On}var Or=new oa,Ln,Gn,zn;function ri(l,t,u,c,r,e,n){return Array.isArray(t)?Or.set(t[0],t[1],t[2],t[3]):Or.copy(t),Ln=xr(l,"x",Or.x,u,c,r,e,n),Gn=xr(l,"y",Or.y,u,c,r,e,n),zn=xr(l,"z",Or.z,u,c,r,e,n),Ln||Gn||zn}var br=new ir,Wn,Nn,jn;function ti(l,t,u,c,r,e,n){return t instanceof ir?br.copy(t):Array.isArray(t)?br.setRGB(t[0],t[1],t[2]):br.set(t),Wn=Ae(l,"r",br.r,u,c,r,e,n),Nn=Ae(l,"g",br.g,u,c,r,e,n),jn=Ae(l,"b",br.b,u,c,r,e,n),Wn||Nn||jn}var Xe=new Xr,qe=new Sr,Vn=new Sr,Lr=new Sr,Hn,Xn,Yn,Kn;function ft(l,t,u,c,r,e,n){var a=l;Array.isArray(t)?Xe.set(t[0],t[1],t[2],t[3]):Xe.copy(t);var o=l.dot(Xe)>0?1:-1;return Xe.x*=o,Xe.y*=o,Xe.z*=o,Xe.w*=o,Hn=Ae(l,"x",Xe.x,u,c,r,e,n),Xn=Ae(l,"y",Xe.y,u,c,r,e,n),Yn=Ae(l,"z",Xe.z,u,c,r,e,n),Kn=Ae(l,"w",Xe.w,u,c,r,e,n),qe.set(l.x,l.y,l.z,l.w).normalize(),Vn.set(a.__damp.velocity_x,a.__damp.velocity_y,a.__damp.velocity_z,a.__damp.velocity_w),Lr.copy(qe).multiplyScalar(Vn.dot(qe)/qe.dot(qe)),a.__damp.velocity_x-=Lr.x,a.__damp.velocity_y-=Lr.y,a.__damp.velocity_z-=Lr.z,a.__damp.velocity_w-=Lr.w,l.set(qe.x,qe.y,qe.z,qe.w),Hn||Xn||Yn||Kn}var Gr=new na,Jn,Zn,Qn;function ni(l,t,u,c,r,e,n){return Array.isArray(t)?Gr.set(t[0],t[1],t[2]):Gr.copy(t),Jn=Ae(l,"radius",Gr.radius,u,c,r,e,n),Zn=xr(l,"phi",Gr.phi,u,c,r,e,n),Qn=xr(l,"theta",Gr.theta,u,c,r,e,n),Jn||Zn||Qn}var it=new Ht,qn=new Je,$n=new Xr,eo=new Je,ro,to,no;function oi(l,t,u,c,r,e,n){var a=l;return a.__damp===void 0&&(a.__damp={position:new Je,rotation:new Xr,scale:new Je},l.decompose(a.__damp.position,a.__damp.rotation,a.__damp.scale)),Array.isArray(t)?it.set.apply(it,Ra(t)):it.copy(t),it.decompose(qn,$n,eo),ro=Gt(a.__damp.position,qn,u,c,r,e,n),to=ft(a.__damp.rotation,$n,u,c,r,e,n),no=Gt(a.__damp.scale,eo,u,c,r,e,n),l.compose(a.__damp.position,a.__damp.rotation,a.__damp.scale),ro||to||no}var zt=Object.freeze({__proto__:null,rsqw:Na,exp:Co,linear:ja,sine:Va,cubic:Ha,quint:Xa,circ:Ya,quart:Ka,expo:Ja,damp:Ae,dampLookAt:qa,dampAngle:xr,damp2:$a,damp3:Gt,damp4:ei,dampE:ri,dampC:ti,dampQ:ft,dampS:ni,dampM:oi});const Kt=Y.createContext(null);function Jt(){return Y.useContext(Kt)}function ai({eps:l=1e-5,enabled:t=!0,infinite:u,horizontal:c,pages:r=1,distance:e=1,damping:n=.25,maxSpeed:a=1/0,prepend:o=!1,style:i={},children:s}){const{get:f,setEvents:d,gl:h,size:p,invalidate:g,events:v}=Ye(),[_]=Y.useState(()=>document.createElement("div")),[k]=Y.useState(()=>document.createElement("div")),[T]=Y.useState(()=>document.createElement("div")),b=h.domElement.parentNode,C=Y.useRef(0),M=Y.useMemo(()=>({el:_,eps:l,fill:k,fixed:T,horizontal:c,damping:n,offset:0,delta:0,scroll:C,pages:r,range(R,P,j=0){const y=R-j,F=y+P+j*2;return this.offset<y?0:this.offset>F?1:(this.offset-y)/(F-y)},curve(R,P,j=0){return Math.sin(this.range(R,P,j)*Math.PI)},visible(R,P,j=0){const y=R-j,F=y+P+j*2;return this.offset>=y&&this.offset<=F}}),[l,n,c,r]);Y.useEffect(()=>{_.style.position="absolute",_.style.width="100%",_.style.height="100%",_.style[c?"overflowX":"overflowY"]="auto",_.style[c?"overflowY":"overflowX"]="hidden",_.style.top="0px",_.style.left="0px";for(const P in i)_.style[P]=i[P];T.style.position="sticky",T.style.top="0px",T.style.left="0px",T.style.width="100%",T.style.height="100%",T.style.overflow="hidden",_.appendChild(T),k.style.height=c?"100%":`${r*e*100}%`,k.style.width=c?`${r*e*100}%`:"100%",k.style.pointerEvents="none",_.appendChild(k),o?b.prepend(_):b.appendChild(_),_[c?"scrollLeft":"scrollTop"]=1;const x=v.connected||h.domElement;requestAnimationFrame(()=>v.connect==null?void 0:v.connect(_));const R=f().events.compute;return d({compute(P,j){const{left:y,top:F}=b.getBoundingClientRect(),E=P.clientX-y,V=P.clientY-F;j.pointer.set(E/j.size.width*2-1,-(V/j.size.height)*2+1),j.raycaster.setFromCamera(j.pointer,j.camera)}}),()=>{b.removeChild(_),d({compute:R}),v.connect==null||v.connect(x)}},[r,e,c,_,k,T,b]),Y.useEffect(()=>{if(v.connected===_){const x=p[c?"width":"height"],R=_[c?"scrollWidth":"scrollHeight"],P=R-x;let j=0,y=!0,F=!0;const E=()=>{if(!(!t||F)&&(g(),j=_[c?"scrollLeft":"scrollTop"],C.current=j/P,u)){if(!y){if(j>=P){const z=1-M.offset;_[c?"scrollLeft":"scrollTop"]=1,C.current=M.offset=-z,y=!0}else if(j<=0){const z=1+M.offset;_[c?"scrollLeft":"scrollTop"]=R,C.current=M.offset=z,y=!0}}y&&setTimeout(()=>y=!1,40)}};_.addEventListener("scroll",E,{passive:!0}),requestAnimationFrame(()=>F=!1);const V=z=>_.scrollLeft+=z.deltaY/2;return c&&_.addEventListener("wheel",V,{passive:!0}),()=>{_.removeEventListener("scroll",E),c&&_.removeEventListener("wheel",V)}}},[_,v,p,u,M,g,c,t]);let w=0;return hr((x,R)=>{w=M.offset,zt.damp(M,"offset",C.current,n,R,a,void 0,l),zt.damp(M,"delta",Math.abs(w-M.offset),n,R,a,void 0,l),M.delta>l&&g()}),Y.createElement(Kt.Provider,{value:M},s)}const ii=Y.forwardRef(({children:l},t)=>{const u=Y.useRef(null);Y.useImperativeHandle(t,()=>u.current,[]);const c=Jt(),{width:r,height:e}=Ye(n=>n.viewport);return hr(()=>{u.current.position.x=c.horizontal?-r*(c.pages-1)*c.offset:0,u.current.position.y=c.horizontal?0:e*(c.pages-1)*c.offset}),Y.createElement("group",{ref:u},l)}),si=Y.forwardRef(({children:l,style:t,...u},c)=>{const r=Jt(),e=Y.useRef(null);Y.useImperativeHandle(c,()=>e.current,[]);const{width:n,height:a}=Ye(s=>s.size),o=Y.useContext(Sn),i=Y.useMemo(()=>Xo.createRoot(r.fixed),[r.fixed]);return hr(()=>{r.delta>r.eps&&(e.current.style.transform=`translate3d(${r.horizontal?-n*(r.pages-1)*r.offset:0}px,${r.horizontal?0:a*(r.pages-1)*-r.offset}px,0)`)}),i.render(Y.createElement("div",$e({ref:e,style:{...t,position:"absolute",top:0,left:0,willChange:"transform"}},u),Y.createElement(Kt.Provider,{value:r},Y.createElement(Sn.Provider,{value:o},l)))),null}),oo=Y.forwardRef(({html:l,...t},u)=>{const c=l?si:ii;return Y.createElement(c,$e({ref:u},t))});function li(){var l=Object.create(null);function t(r,e){var n=r.id,a=r.name,o=r.dependencies;o===void 0&&(o=[]);var i=r.init;i===void 0&&(i=function(){});var s=r.getTransferables;if(s===void 0&&(s=null),!l[n])try{o=o.map(function(d){return d&&d.isWorkerModule&&(t(d,function(h){if(h instanceof Error)throw h}),d=l[d.id].value),d}),i=c("<"+a+">.init",i),s&&(s=c("<"+a+">.getTransferables",s));var f=null;typeof i=="function"?f=i.apply(void 0,o):console.error("worker module init function failed to rehydrate"),l[n]={id:n,value:f,getTransferables:s},e(f)}catch(d){d&&d.noLog||console.error(d),e(d)}}function u(r,e){var n,a=r.id,o=r.args;(!l[a]||typeof l[a].value!="function")&&e(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var i=(n=l[a]).value.apply(n,o);i&&typeof i.then=="function"?i.then(s,function(f){return e(f instanceof Error?f:new Error(""+f))}):s(i)}catch(f){e(f)}function s(f){try{var d=l[a].getTransferables&&l[a].getTransferables(f);(!d||!Array.isArray(d)||!d.length)&&(d=void 0),e(f,d)}catch(h){console.error(h),e(h)}}}function c(r,e){var n=void 0;self.troikaDefine=function(o){return n=o};var a=URL.createObjectURL(new Blob(["/** "+r.replace(/\*/g,"")+` **/

troikaDefine(
`+e+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch(o){console.error(o)}return URL.revokeObjectURL(a),delete self.troikaDefine,n}self.addEventListener("message",function(r){var e=r.data,n=e.messageId,a=e.action,o=e.data;try{a==="registerModule"&&t(o,function(i){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:{isCallable:typeof i=="function"}})}),a==="callModule"&&u(o,function(i,s){i instanceof Error?postMessage({messageId:n,success:!1,error:i.message}):postMessage({messageId:n,success:!0,result:i},s||void 0)})}catch(i){postMessage({messageId:n,success:!1,error:i.stack})}})}function ci(l){var t=function(){for(var u=[],c=arguments.length;c--;)u[c]=arguments[c];return t._getInitResult().then(function(r){if(typeof r=="function")return r.apply(void 0,u);throw new Error("Worker module function was called but `init` did not return a callable function")})};return t._getInitResult=function(){var u=l.dependencies,c=l.init;u=Array.isArray(u)?u.map(function(e){return e&&(e=e.onMainThread||e,e._getInitResult&&(e=e._getInitResult())),e}):[];var r=Promise.all(u).then(function(e){return c.apply(null,e)});return t._getInitResult=function(){return r},r},t}var _o=function(){var l=!1;if(typeof window<"u"&&typeof window.document<"u")try{var t=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));t.terminate(),l=!0}catch(u){console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+u.message+"]")}return _o=function(){return l},l},ui=0,fi=0,Rt=!1,Vr=Object.create(null),Hr=Object.create(null),Wt=Object.create(null);function kr(l){if((!l||typeof l.init!="function")&&!Rt)throw new Error("requires `options.init` function");var t=l.dependencies,u=l.init,c=l.getTransferables,r=l.workerId,e=ci(l);r==null&&(r="#default");var n="workerModule"+ ++ui,a=l.name||n,o=null;t=t&&t.map(function(s){return typeof s=="function"&&!s.workerModuleData&&(Rt=!0,s=kr({workerId:r,name:"<"+a+"> function dependency: "+s.name,init:`function(){return (
`+ct(s)+`
)}`}),Rt=!1),s&&s.workerModuleData&&(s=s.workerModuleData),s});function i(){for(var s=[],f=arguments.length;f--;)s[f]=arguments[f];if(!_o())return e.apply(void 0,s);if(!o){o=ao(r,"registerModule",i.workerModuleData);var d=function(){o=null,Hr[r].delete(d)};(Hr[r]||(Hr[r]=new Set)).add(d)}return o.then(function(h){var p=h.isCallable;if(p)return ao(r,"callModule",{id:n,args:s});throw new Error("Worker module function was called but `init` did not return a callable function")})}return i.workerModuleData={isWorkerModule:!0,id:n,name:a,dependencies:t,init:ct(u),getTransferables:c&&ct(c)},i.onMainThread=e,i}function di(l){Hr[l]&&Hr[l].forEach(function(t){t()}),Vr[l]&&(Vr[l].terminate(),delete Vr[l])}function ct(l){var t=l.toString();return!/^function/.test(t)&&/^\w+\s*\(/.test(t)&&(t="function "+t),t}function hi(l){var t=Vr[l];if(!t){var u=ct(li);t=Vr[l]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+l.replace(/\*/g,"")+` **/

;(`+u+")()"],{type:"application/javascript"}))),t.onmessage=function(c){var r=c.data,e=r.messageId,n=Wt[e];if(!n)throw new Error("WorkerModule response with empty or unknown messageId");delete Wt[e],n(r)}}return t}function ao(l,t,u){return new Promise(function(c,r){var e=++fi;Wt[e]=function(n){n.success?c(n.result):r(new Error("Error in worker "+t+" call: "+n.error))},hi(l).postMessage({messageId:e,action:t,data:u})})}function Mo(){var l=function(t){function u(L,B,m,S,D,A,U,W){var I=1-U;W.x=I*I*L+2*I*U*m+U*U*D,W.y=I*I*B+2*I*U*S+U*U*A}function c(L,B,m,S,D,A,U,W,I,G){var K=1-I;G.x=K*K*K*L+3*K*K*I*m+3*K*I*I*D+I*I*I*U,G.y=K*K*K*B+3*K*K*I*S+3*K*I*I*A+I*I*I*W}function r(L,B){for(var m=/([MLQCZ])([^MLQCZ]*)/g,S,D,A,U,W;S=m.exec(L);){var I=S[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(G){return parseFloat(G)});switch(S[1]){case"M":U=D=I[0],W=A=I[1];break;case"L":(I[0]!==U||I[1]!==W)&&B("L",U,W,U=I[0],W=I[1]);break;case"Q":{B("Q",U,W,U=I[2],W=I[3],I[0],I[1]);break}case"C":{B("C",U,W,U=I[4],W=I[5],I[0],I[1],I[2],I[3]);break}case"Z":(U!==D||W!==A)&&B("L",U,W,D,A);break}}}function e(L,B,m){m===void 0&&(m=16);var S={x:0,y:0};r(L,function(D,A,U,W,I,G,K,ee,X){switch(D){case"L":B(A,U,W,I);break;case"Q":{for(var N=A,ge=U,fe=1;fe<m;fe++)u(A,U,G,K,W,I,fe/(m-1),S),B(N,ge,S.x,S.y),N=S.x,ge=S.y;break}case"C":{for(var Q=A,re=U,le=1;le<m;le++)c(A,U,G,K,ee,X,W,I,le/(m-1),S),B(Q,re,S.x,S.y),Q=S.x,re=S.y;break}}})}var n="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",o=new WeakMap,i={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function s(L,B){var m=L.getContext?L.getContext("webgl",i):L,S=o.get(m);if(!S){let K=function(Q){var re=A[Q];if(!re&&(re=A[Q]=m.getExtension(Q),!re))throw new Error(Q+" not supported");return re},ee=function(Q,re){var le=m.createShader(re);return m.shaderSource(le,Q),m.compileShader(le),le},X=function(Q,re,le,H){if(!U[Q]){var te={},$={},O=m.createProgram();m.attachShader(O,ee(re,m.VERTEX_SHADER)),m.attachShader(O,ee(le,m.FRAGMENT_SHADER)),m.linkProgram(O),U[Q]={program:O,transaction:function(Z){m.useProgram(O),Z({setUniform:function(J,xe){for(var oe=[],ie=arguments.length-2;ie-- >0;)oe[ie]=arguments[ie+2];var ue=$[xe]||($[xe]=m.getUniformLocation(O,xe));m["uniform"+J].apply(m,[ue].concat(oe))},setAttribute:function(J,xe,oe,ie,ue){var me=te[J];me||(me=te[J]={buf:m.createBuffer(),loc:m.getAttribLocation(O,J),data:null}),m.bindBuffer(m.ARRAY_BUFFER,me.buf),m.vertexAttribPointer(me.loc,xe,m.FLOAT,!1,0,0),m.enableVertexAttribArray(me.loc),D?m.vertexAttribDivisor(me.loc,ie):K("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(me.loc,ie),ue!==me.data&&(m.bufferData(m.ARRAY_BUFFER,ue,oe),me.data=ue)}})}}}U[Q].transaction(H)},N=function(Q,re){I++;try{m.activeTexture(m.TEXTURE0+I);var le=W[Q];le||(le=W[Q]=m.createTexture(),m.bindTexture(m.TEXTURE_2D,le),m.texParameteri(m.TEXTURE_2D,m.TEXTURE_MIN_FILTER,m.NEAREST),m.texParameteri(m.TEXTURE_2D,m.TEXTURE_MAG_FILTER,m.NEAREST)),m.bindTexture(m.TEXTURE_2D,le),re(le,I)}finally{I--}},ge=function(Q,re,le){var H=m.createFramebuffer();G.push(H),m.bindFramebuffer(m.FRAMEBUFFER,H),m.activeTexture(m.TEXTURE0+re),m.bindTexture(m.TEXTURE_2D,Q),m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,Q,0);try{le(H)}finally{m.deleteFramebuffer(H),m.bindFramebuffer(m.FRAMEBUFFER,G[--G.length-1]||null)}},fe=function(){A={},U={},W={},I=-1,G.length=0};var D=typeof WebGL2RenderingContext<"u"&&m instanceof WebGL2RenderingContext,A={},U={},W={},I=-1,G=[];m.canvas.addEventListener("webglcontextlost",function(Q){fe(),Q.preventDefault()},!1),o.set(m,S={gl:m,isWebGL2:D,getExtension:K,withProgram:X,withTexture:N,withTextureFramebuffer:ge,handleContextLoss:fe})}B(S)}function f(L,B,m,S,D,A,U,W){U===void 0&&(U=15),W===void 0&&(W=null),s(L,function(I){var G=I.gl,K=I.withProgram,ee=I.withTexture;ee("copy",function(X,N){G.texImage2D(G.TEXTURE_2D,0,G.RGBA,D,A,0,G.RGBA,G.UNSIGNED_BYTE,B),K("copy",n,a,function(ge){var fe=ge.setUniform,Q=ge.setAttribute;Q("aUV",2,G.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),fe("1i","image",N),G.bindFramebuffer(G.FRAMEBUFFER,W||null),G.disable(G.BLEND),G.colorMask(U&8,U&4,U&2,U&1),G.viewport(m,S,D,A),G.scissor(m,S,D,A),G.drawArrays(G.TRIANGLES,0,3)})})})}function d(L,B,m){var S=L.width,D=L.height;s(L,function(A){var U=A.gl,W=new Uint8Array(S*D*4);U.readPixels(0,0,S,D,U.RGBA,U.UNSIGNED_BYTE,W),L.width=B,L.height=m,f(U,W,0,0,S,D)})}var h=Object.freeze({__proto__:null,withWebGLContext:s,renderImageData:f,resizeWebGLCanvasWithoutClearing:d});function p(L,B,m,S,D,A){A===void 0&&(A=1);var U=new Uint8Array(L*B),W=S[2]-S[0],I=S[3]-S[1],G=[];e(m,function(Q,re,le,H){G.push({x1:Q,y1:re,x2:le,y2:H,minX:Math.min(Q,le),minY:Math.min(re,H),maxX:Math.max(Q,le),maxY:Math.max(re,H)})}),G.sort(function(Q,re){return Q.maxX-re.maxX});for(var K=0;K<L;K++)for(var ee=0;ee<B;ee++){var X=ge(S[0]+W*(K+.5)/L,S[1]+I*(ee+.5)/B),N=Math.pow(1-Math.abs(X)/D,A)/2;X<0&&(N=1-N),N=Math.max(0,Math.min(255,Math.round(N*255))),U[ee*L+K]=N}return U;function ge(Q,re){for(var le=1/0,H=1/0,te=G.length;te--;){var $=G[te];if($.maxX+H<=Q)break;if(Q+H>$.minX&&re-H<$.maxY&&re+H>$.minY){var O=_(Q,re,$.x1,$.y1,$.x2,$.y2);O<le&&(le=O,H=Math.sqrt(le))}}return fe(Q,re)&&(H=-H),H}function fe(Q,re){for(var le=0,H=G.length;H--;){var te=G[H];if(te.maxX<=Q)break;var $=te.y1>re!=te.y2>re&&Q<(te.x2-te.x1)*(re-te.y1)/(te.y2-te.y1)+te.x1;$&&(le+=te.y1<te.y2?1:-1)}return le!==0}}function g(L,B,m,S,D,A,U,W,I,G){A===void 0&&(A=1),W===void 0&&(W=0),I===void 0&&(I=0),G===void 0&&(G=0),v(L,B,m,S,D,A,U,null,W,I,G)}function v(L,B,m,S,D,A,U,W,I,G,K){A===void 0&&(A=1),I===void 0&&(I=0),G===void 0&&(G=0),K===void 0&&(K=0);for(var ee=p(L,B,m,S,D,A),X=new Uint8Array(ee.length*4),N=0;N<ee.length;N++)X[N*4+K]=ee[N];f(U,X,I,G,L,B,1<<3-K,W)}function _(L,B,m,S,D,A){var U=D-m,W=A-S,I=U*U+W*W,G=I?Math.max(0,Math.min(1,((L-m)*U+(B-S)*W)/I)):0,K=L-(m+G*U),ee=B-(S+G*W);return K*K+ee*ee}var k=Object.freeze({__proto__:null,generate:p,generateIntoCanvas:g,generateIntoFramebuffer:v}),T="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",b="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",C="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",M=new Float32Array([0,0,2,0,0,2]),w=null,x=!1,R={},P=new WeakMap;function j(L){if(!x&&!V(L))throw new Error("WebGL generation not supported")}function y(L,B,m,S,D,A,U){if(A===void 0&&(A=1),U===void 0&&(U=null),!U&&(U=w,!U)){var W=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!W)throw new Error("OffscreenCanvas or DOM canvas not supported");U=w=W.getContext("webgl",{depth:!1})}j(U);var I=new Uint8Array(L*B*4);s(U,function(X){var N=X.gl,ge=X.withTexture,fe=X.withTextureFramebuffer;ge("readable",function(Q,re){N.texImage2D(N.TEXTURE_2D,0,N.RGBA,L,B,0,N.RGBA,N.UNSIGNED_BYTE,null),fe(Q,re,function(le){E(L,B,m,S,D,A,N,le,0,0,0),N.readPixels(0,0,L,B,N.RGBA,N.UNSIGNED_BYTE,I)})})});for(var G=new Uint8Array(L*B),K=0,ee=0;K<I.length;K+=4)G[ee++]=I[K];return G}function F(L,B,m,S,D,A,U,W,I,G){A===void 0&&(A=1),W===void 0&&(W=0),I===void 0&&(I=0),G===void 0&&(G=0),E(L,B,m,S,D,A,U,null,W,I,G)}function E(L,B,m,S,D,A,U,W,I,G,K){A===void 0&&(A=1),I===void 0&&(I=0),G===void 0&&(G=0),K===void 0&&(K=0),j(U);var ee=[];e(m,function(X,N,ge,fe){ee.push(X,N,ge,fe)}),ee=new Float32Array(ee),s(U,function(X){var N=X.gl,ge=X.isWebGL2,fe=X.getExtension,Q=X.withProgram,re=X.withTexture,le=X.withTextureFramebuffer,H=X.handleContextLoss;if(re("rawDistances",function(te,$){(L!==te._lastWidth||B!==te._lastHeight)&&N.texImage2D(N.TEXTURE_2D,0,N.RGBA,te._lastWidth=L,te._lastHeight=B,0,N.RGBA,N.UNSIGNED_BYTE,null),Q("main",T,b,function(O){var pe=O.setAttribute,Z=O.setUniform,ae=!ge&&fe("ANGLE_instanced_arrays"),J=!ge&&fe("EXT_blend_minmax");pe("aUV",2,N.STATIC_DRAW,0,M),pe("aLineSegment",4,N.DYNAMIC_DRAW,1,ee),Z.apply(void 0,["4f","uGlyphBounds"].concat(S)),Z("1f","uMaxDistance",D),Z("1f","uExponent",A),le(te,$,function(xe){N.enable(N.BLEND),N.colorMask(!0,!0,!0,!0),N.viewport(0,0,L,B),N.scissor(0,0,L,B),N.blendFunc(N.ONE,N.ONE),N.blendEquationSeparate(N.FUNC_ADD,ge?N.MAX:J.MAX_EXT),N.clear(N.COLOR_BUFFER_BIT),ge?N.drawArraysInstanced(N.TRIANGLES,0,3,ee.length/4):ae.drawArraysInstancedANGLE(N.TRIANGLES,0,3,ee.length/4)})}),Q("post",n,C,function(O){O.setAttribute("aUV",2,N.STATIC_DRAW,0,M),O.setUniform("1i","tex",$),N.bindFramebuffer(N.FRAMEBUFFER,W),N.disable(N.BLEND),N.colorMask(K===0,K===1,K===2,K===3),N.viewport(I,G,L,B),N.scissor(I,G,L,B),N.drawArrays(N.TRIANGLES,0,3)})}),N.isContextLost())throw H(),new Error("webgl context lost")})}function V(L){var B=!L||L===w?R:L.canvas||L,m=P.get(B);if(m===void 0){x=!0;var S=null;try{var D=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],A=y(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,L);m=A&&D.length===A.length&&A.every(function(U,W){return U===D[W]}),m||(S="bad trial run results",console.info(D,A))}catch(U){m=!1,S=U.message}S&&console.warn("WebGL SDF generation not supported:",S),x=!1,P.set(B,m)}return m}var z=Object.freeze({__proto__:null,generate:y,generateIntoCanvas:F,generateIntoFramebuffer:E,isSupported:V});function q(L,B,m,S,D,A){D===void 0&&(D=Math.max(S[2]-S[0],S[3]-S[1])/2),A===void 0&&(A=1);try{return y.apply(z,arguments)}catch(U){return console.info("WebGL SDF generation failed, falling back to JS",U),p.apply(k,arguments)}}function ne(L,B,m,S,D,A,U,W,I,G){D===void 0&&(D=Math.max(S[2]-S[0],S[3]-S[1])/2),A===void 0&&(A=1),W===void 0&&(W=0),I===void 0&&(I=0),G===void 0&&(G=0);try{return F.apply(z,arguments)}catch(K){return console.info("WebGL SDF generation failed, falling back to JS",K),g.apply(k,arguments)}}return t.forEachPathCommand=r,t.generate=q,t.generateIntoCanvas=ne,t.javascript=k,t.pathToLineSegments=e,t.webgl=z,t.webglUtils=h,Object.defineProperty(t,"__esModule",{value:!0}),t}({});return l}function pi(){var l=function(t){var u={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},c={},r={};c.L=1,r[1]="L",Object.keys(u).forEach(function(H,te){c[H]=1<<te+1,r[c[H]]=H}),Object.freeze(c);var e=c.LRI|c.RLI|c.FSI,n=c.L|c.R|c.AL,a=c.B|c.S|c.WS|c.ON|c.FSI|c.LRI|c.RLI|c.PDI,o=c.BN|c.RLE|c.LRE|c.RLO|c.LRO|c.PDF,i=c.S|c.WS|c.B|e|c.PDI|o,s=null;function f(){if(!s){s=new Map;var H=function($){if(u.hasOwnProperty($)){var O=0;u[$].split(",").forEach(function(pe){var Z=pe.split("+"),ae=Z[0],J=Z[1];ae=parseInt(ae,36),J=J?parseInt(J,36):0,s.set(O+=ae,c[$]);for(var xe=0;xe<J;xe++)s.set(++O,c[$])})}};for(var te in u)H(te)}}function d(H){return f(),s.get(H.codePointAt(0))||c.L}function h(H){return r[d(H)]}var p={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function g(H,te){var $=36,O=0,pe=new Map,Z=te&&new Map,ae;return H.split(",").forEach(function J(xe){if(xe.indexOf("+")!==-1)for(var oe=+xe;oe--;)J(ae);else{ae=xe;var ie=xe.split(">"),ue=ie[0],me=ie[1];ue=String.fromCodePoint(O+=parseInt(ue,$)),me=String.fromCodePoint(O+=parseInt(me,$)),pe.set(ue,me),te&&Z.set(me,ue)}}),{map:pe,reverseMap:Z}}var v,_,k;function T(){if(!v){var H=g(p.pairs,!0),te=H.map,$=H.reverseMap;v=te,_=$,k=g(p.canonical,!1).map}}function b(H){return T(),v.get(H)||null}function C(H){return T(),_.get(H)||null}function M(H){return T(),k.get(H)||null}var w=c.L,x=c.R,R=c.EN,P=c.ES,j=c.ET,y=c.AN,F=c.CS,E=c.B,V=c.S,z=c.ON,q=c.BN,ne=c.NSM,L=c.AL,B=c.LRO,m=c.RLO,S=c.LRE,D=c.RLE,A=c.PDF,U=c.LRI,W=c.RLI,I=c.FSI,G=c.PDI;function K(H,te){for(var $=125,O=new Uint32Array(H.length),pe=0;pe<H.length;pe++)O[pe]=d(H[pe]);var Z=new Map;function ae(Ge,He){var ze=O[Ge];O[Ge]=He,Z.set(ze,Z.get(ze)-1),ze&a&&Z.set(a,Z.get(a)-1),Z.set(He,(Z.get(He)||0)+1),He&a&&Z.set(a,(Z.get(a)||0)+1)}for(var J=new Uint8Array(H.length),xe=new Map,oe=[],ie=null,ue=0;ue<H.length;ue++)ie||oe.push(ie={start:ue,end:H.length-1,level:te==="rtl"?1:te==="ltr"?0:bn(ue,!1)}),O[ue]&E&&(ie.end=ue,ie=null);for(var me=D|S|m|B|e|G|A|E,Te=function(Ge){return Ge+(Ge&1?1:2)},Ue=function(Ge){return Ge+(Ge&1?2:1)},ye=0;ye<oe.length;ye++){ie=oe[ye];var be=[{_level:ie.level,_override:0,_isolate:0}],ce=void 0,Pe=0,_e=0,Le=0;Z.clear();for(var Ce=ie.start;Ce<=ie.end;Ce++){var he=O[Ce];if(ce=be[be.length-1],Z.set(he,(Z.get(he)||0)+1),he&a&&Z.set(a,(Z.get(a)||0)+1),he&me)if(he&(D|S)){J[Ce]=ce._level;var Se=(he===D?Ue:Te)(ce._level);Se<=$&&!Pe&&!_e?be.push({_level:Se,_override:0,_isolate:0}):Pe||_e++}else if(he&(m|B)){J[Ce]=ce._level;var rr=(he===m?Ue:Te)(ce._level);rr<=$&&!Pe&&!_e?be.push({_level:rr,_override:he&m?x:w,_isolate:0}):Pe||_e++}else if(he&e){he&I&&(he=bn(Ce+1,!0)===1?W:U),J[Ce]=ce._level,ce._override&&ae(Ce,ce._override);var ke=(he===W?Ue:Te)(ce._level);ke<=$&&Pe===0&&_e===0?(Le++,be.push({_level:ke,_override:0,_isolate:1,_isolInitIndex:Ce})):Pe++}else if(he&G){if(Pe>0)Pe--;else if(Le>0){for(_e=0;!be[be.length-1]._isolate;)be.pop();var we=be[be.length-1]._isolInitIndex;we!=null&&(xe.set(we,Ce),xe.set(Ce,we)),be.pop(),Le--}ce=be[be.length-1],J[Ce]=ce._level,ce._override&&ae(Ce,ce._override)}else he&A?(Pe===0&&(_e>0?_e--:!ce._isolate&&be.length>1&&(be.pop(),ce=be[be.length-1])),J[Ce]=ce._level):he&E&&(J[Ce]=ie.level);else J[Ce]=ce._level,ce._override&&he!==q&&ae(Ce,ce._override)}for(var De=[],Me=null,ve=ie.start;ve<=ie.end;ve++){var Ee=O[ve];if(!(Ee&o)){var Be=J[ve],Ie=Ee&e,Fe=Ee===G;Me&&Be===Me._level?(Me._end=ve,Me._endsWithIsolInit=Ie):De.push(Me={_start:ve,_end:ve,_level:Be,_startsWithPDI:Fe,_endsWithIsolInit:Ie})}}for(var je=[],tr=0;tr<De.length;tr++){var Ze=De[tr];if(!Ze._startsWithPDI||Ze._startsWithPDI&&!xe.has(Ze._start)){for(var nr=[Me=Ze],sr=void 0;Me&&Me._endsWithIsolInit&&(sr=xe.get(Me._end))!=null;)for(var Qe=tr+1;Qe<De.length;Qe++)if(De[Qe]._start===sr){nr.push(Me=De[Qe]);break}for(var Oe=[],lr=0;lr<nr.length;lr++)for(var qt=nr[lr],ht=qt._start;ht<=qt._end;ht++)Oe.push(ht);for(var zo=J[Oe[0]],$t=ie.level,Yr=Oe[0]-1;Yr>=0;Yr--)if(!(O[Yr]&o)){$t=J[Yr];break}var pt=Oe[Oe.length-1],Wo=J[pt],en=ie.level;if(!(O[pt]&e)){for(var Kr=pt+1;Kr<=ie.end;Kr++)if(!(O[Kr]&o)){en=J[Kr];break}}je.push({_seqIndices:Oe,_sosType:Math.max($t,zo)%2?x:w,_eosType:Math.max(en,Wo)%2?x:w})}}for(var mt=0;mt<je.length;mt++){var vt=je[mt],se=vt._seqIndices,Tr=vt._sosType,No=vt._eosType,pr=J[se[0]]&1?x:w;if(Z.get(ne))for(var Jr=0;Jr<se.length;Jr++){var rn=se[Jr];if(O[rn]&ne){for(var gt=Tr,Zr=Jr-1;Zr>=0;Zr--)if(!(O[se[Zr]]&o)){gt=O[se[Zr]];break}ae(rn,gt&(e|G)?z:gt)}}if(Z.get(R))for(var Qr=0;Qr<se.length;Qr++){var tn=se[Qr];if(O[tn]&R)for(var qr=Qr-1;qr>=-1;qr--){var nn=qr===-1?Tr:O[se[qr]];if(nn&n){nn===L&&ae(tn,y);break}}}if(Z.get(L))for(var yt=0;yt<se.length;yt++){var on=se[yt];O[on]&L&&ae(on,x)}if(Z.get(P)||Z.get(F))for(var Cr=1;Cr<se.length-1;Cr++){var bt=se[Cr];if(O[bt]&(P|F)){for(var mr=0,wt=0,xt=Cr-1;xt>=0&&(mr=O[se[xt]],!!(mr&o));xt--);for(var St=Cr+1;St<se.length&&(wt=O[se[St]],!!(wt&o));St++);mr===wt&&(O[bt]===P?mr===R:mr&(R|y))&&ae(bt,mr)}}if(Z.get(R))for(var Ke=0;Ke<se.length;Ke++){var jo=se[Ke];if(O[jo]&R){for(var $r=Ke-1;$r>=0&&O[se[$r]]&(j|o);$r--)ae(se[$r],R);for(Ke++;Ke<se.length&&O[se[Ke]]&(j|o|R);Ke++)O[se[Ke]]!==R&&ae(se[Ke],R)}}if(Z.get(j)||Z.get(P)||Z.get(F))for(var _r=0;_r<se.length;_r++){var an=se[_r];if(O[an]&(j|P|F)){ae(an,z);for(var et=_r-1;et>=0&&O[se[et]]&o;et--)ae(se[et],z);for(var rt=_r+1;rt<se.length&&O[se[rt]]&o;rt++)ae(se[rt],z)}}if(Z.get(R))for(var kt=0,sn=Tr;kt<se.length;kt++){var ln=se[kt],Tt=O[ln];Tt&R?sn===w&&ae(ln,w):Tt&n&&(sn=Tt)}if(Z.get(a)){var Mr=x|R|y,cn=Mr|w,tt=[];{for(var vr=[],gr=0;gr<se.length;gr++)if(O[se[gr]]&a){var Er=H[se[gr]],un=void 0;if(b(Er)!==null)if(vr.length<63)vr.push({char:Er,seqIndex:gr});else break;else if((un=C(Er))!==null)for(var Ur=vr.length-1;Ur>=0;Ur--){var Ct=vr[Ur].char;if(Ct===un||Ct===C(M(Er))||b(M(Ct))===Er){tt.push([vr[Ur].seqIndex,gr]),vr.length=Ur;break}}}tt.sort(function(Ge,He){return Ge[0]-He[0]})}for(var _t=0;_t<tt.length;_t++){for(var fn=tt[_t],nt=fn[0],Mt=fn[1],dn=!1,Ve=0,Et=nt+1;Et<Mt;Et++){var hn=se[Et];if(O[hn]&cn){dn=!0;var pn=O[hn]&Mr?x:w;if(pn===pr){Ve=pn;break}}}if(dn&&!Ve){Ve=Tr;for(var Ut=nt-1;Ut>=0;Ut--){var mn=se[Ut];if(O[mn]&cn){var vn=O[mn]&Mr?x:w;vn!==pr?Ve=vn:Ve=pr;break}}}if(Ve){if(O[se[nt]]=O[se[Mt]]=Ve,Ve!==pr){for(var Pr=nt+1;Pr<se.length;Pr++)if(!(O[se[Pr]]&o)){d(H[se[Pr]])&ne&&(O[se[Pr]]=Ve);break}}if(Ve!==pr){for(var Dr=Mt+1;Dr<se.length;Dr++)if(!(O[se[Dr]]&o)){d(H[se[Dr]])&ne&&(O[se[Dr]]=Ve);break}}}}for(var or=0;or<se.length;or++)if(O[se[or]]&a){for(var gn=or,Pt=or,Dt=Tr,Fr=or-1;Fr>=0;Fr--)if(O[se[Fr]]&o)gn=Fr;else{Dt=O[se[Fr]]&Mr?x:w;break}for(var yn=No,Ar=or+1;Ar<se.length;Ar++)if(O[se[Ar]]&(a|o))Pt=Ar;else{yn=O[se[Ar]]&Mr?x:w;break}for(var Ft=gn;Ft<=Pt;Ft++)O[se[Ft]]=Dt===yn?Dt:pr;or=Pt}}}for(var We=ie.start;We<=ie.end;We++){var Vo=J[We],ot=O[We];if(Vo&1?ot&(w|R|y)&&J[We]++:ot&x?J[We]++:ot&(y|R)&&(J[We]+=2),ot&o&&(J[We]=We===0?ie.level:J[We-1]),We===ie.end||d(H[We])&(V|E))for(var at=We;at>=0&&d(H[at])&i;at--)J[at]=ie.level}}return{levels:J,paragraphs:oe};function bn(Ge,He){for(var ze=Ge;ze<H.length;ze++){var ar=O[ze];if(ar&(x|L))return 1;if(ar&(E|w)||He&&ar===G)return 0;if(ar&e){var wn=Ho(ze);ze=wn===-1?H.length:wn}}return 0}function Ho(Ge){for(var He=1,ze=Ge+1;ze<H.length;ze++){var ar=O[ze];if(ar&E)break;if(ar&G){if(--He===0)return ze}else ar&e&&He++}return-1}}var ee="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",X;function N(){if(!X){var H=g(ee,!0),te=H.map,$=H.reverseMap;$.forEach(function(O,pe){te.set(pe,O)}),X=te}}function ge(H){return N(),X.get(H)||null}function fe(H,te,$,O){var pe=H.length;$=Math.max(0,$==null?0:+$),O=Math.min(pe-1,O==null?pe-1:+O);for(var Z=new Map,ae=$;ae<=O;ae++)if(te[ae]&1){var J=ge(H[ae]);J!==null&&Z.set(ae,J)}return Z}function Q(H,te,$,O){var pe=H.length;$=Math.max(0,$==null?0:+$),O=Math.min(pe-1,O==null?pe-1:+O);var Z=[];return te.paragraphs.forEach(function(ae){var J=Math.max($,ae.start),xe=Math.min(O,ae.end);if(J<xe){for(var oe=te.levels.slice(J,xe+1),ie=xe;ie>=J&&d(H[ie])&i;ie--)oe[ie]=ae.level;for(var ue=ae.level,me=1/0,Te=0;Te<oe.length;Te++){var Ue=oe[Te];Ue>ue&&(ue=Ue),Ue<me&&(me=Ue|1)}for(var ye=ue;ye>=me;ye--)for(var be=0;be<oe.length;be++)if(oe[be]>=ye){for(var ce=be;be+1<oe.length&&oe[be+1]>=ye;)be++;be>ce&&Z.push([ce+J,be+J])}}}),Z}function re(H,te,$,O){var pe=le(H,te,$,O),Z=[].concat(H);return pe.forEach(function(ae,J){Z[J]=(te.levels[ae]&1?ge(H[ae]):null)||H[ae]}),Z.join("")}function le(H,te,$,O){for(var pe=Q(H,te,$,O),Z=[],ae=0;ae<H.length;ae++)Z[ae]=ae;return pe.forEach(function(J){for(var xe=J[0],oe=J[1],ie=Z.slice(xe,oe+1),ue=ie.length;ue--;)Z[oe-ue]=ie[ue]}),Z}return t.closingToOpeningBracket=C,t.getBidiCharType=d,t.getBidiCharTypeName=h,t.getCanonicalBracket=M,t.getEmbeddingLevels=K,t.getMirroredCharacter=ge,t.getMirroredCharactersMap=fe,t.getReorderSegments=Q,t.getReorderedIndices=le,t.getReorderedString=re,t.openingToClosingBracket=b,Object.defineProperty(t,"__esModule",{value:!0}),t}({});return l}const Eo=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Nt(l){const t=/^[ \t]*#include +<([\w\d./]+)>/gm;function u(c,r){let e=ca[r];return e?Nt(e):c}return l.replace(t,u)}const Re=[];for(let l=0;l<256;l++)Re[l]=(l<16?"0":"")+l.toString(16);function mi(){const l=Math.random()*4294967295|0,t=Math.random()*4294967295|0,u=Math.random()*4294967295|0,c=Math.random()*4294967295|0;return(Re[l&255]+Re[l>>8&255]+Re[l>>16&255]+Re[l>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[u&63|128]+Re[u>>8&255]+"-"+Re[u>>16&255]+Re[u>>24&255]+Re[c&255]+Re[c>>8&255]+Re[c>>16&255]+Re[c>>24&255]).toUpperCase()}const fr=Object.assign||function(){let l=arguments[0];for(let t=1,u=arguments.length;t<u;t++){let c=arguments[t];if(c)for(let r in c)Object.prototype.hasOwnProperty.call(c,r)&&(l[r]=c[r])}return l},vi=Date.now(),io=new WeakMap,so=new Map;let gi=1e10;function jt(l,t){const u=xi(t);let c=io.get(l);if(c||io.set(l,c=Object.create(null)),c[u])return new c[u];const r=`_onBeforeCompile${u}`,e=function(i,s){l.onBeforeCompile.call(this,i,s);const f=this.customProgramCacheKey()+"|"+i.vertexShader+"|"+i.fragmentShader;let d=so[f];if(!d){const h=yi(this,i,t,u);d=so[f]=h}i.vertexShader=d.vertexShader,i.fragmentShader=d.fragmentShader,fr(i.uniforms,this.uniforms),t.timeUniform&&(i.uniforms[t.timeUniform]={get value(){return Date.now()-vi}}),this[r]&&this[r](i)},n=function(){return a(t.chained?l:l.clone())},a=function(i){const s=Object.create(i,o);return Object.defineProperty(s,"baseMaterial",{value:l}),Object.defineProperty(s,"id",{value:gi++}),s.uuid=mi(),s.uniforms=fr({},i.uniforms,t.uniforms),s.defines=fr({},i.defines,t.defines),s.defines[`TROIKA_DERIVED_MATERIAL_${u}`]="",s.extensions=fr({},i.extensions,t.extensions),s._listeners=void 0,s},o={constructor:{value:n},isDerivedMaterial:{value:!0},type:{get:()=>l.type,set:i=>{l.type=i}},isDerivedFrom:{writable:!0,configurable:!0,value:function(i){const s=this.baseMaterial;return i===s||s.isDerivedMaterial&&s.isDerivedFrom(i)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return l.customProgramCacheKey()+"|"+u}},onBeforeCompile:{get(){return e},set(i){this[r]=i}},copy:{writable:!0,configurable:!0,value:function(i){return l.copy.call(this,i),!l.isShaderMaterial&&!l.isDerivedMaterial&&(fr(this.extensions,i.extensions),fr(this.defines,i.defines),fr(this.uniforms,la.clone(i.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const i=new l.constructor;return a(i).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let i=this._depthMaterial;return i||(i=this._depthMaterial=jt(l.isDerivedMaterial?l.getDepthMaterial():new ia({depthPacking:sa}),t),i.defines.IS_DEPTH_MATERIAL="",i.uniforms=this.uniforms),i}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let i=this._distanceMaterial;return i||(i=this._distanceMaterial=jt(l.isDerivedMaterial?l.getDistanceMaterial():new aa,t),i.defines.IS_DISTANCE_MATERIAL="",i.uniforms=this.uniforms),i}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:i,_distanceMaterial:s}=this;i&&i.dispose(),s&&s.dispose(),l.dispose.call(this)}}};return c[u]=n,new n}function yi(l,{vertexShader:t,fragmentShader:u},c,r){let{vertexDefs:e,vertexMainIntro:n,vertexMainOutro:a,vertexTransform:o,fragmentDefs:i,fragmentMainIntro:s,fragmentMainOutro:f,fragmentColorTransform:d,customRewriter:h,timeUniform:p}=c;if(e=e||"",n=n||"",a=a||"",i=i||"",s=s||"",f=f||"",(o||h)&&(t=Nt(t)),(d||h)&&(u=u.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),u=Nt(u)),h){let g=h({vertexShader:t,fragmentShader:u});t=g.vertexShader,u=g.fragmentShader}if(d){let g=[];u=u.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,v=>(g.push(v),"")),f=`${d}
${g.join(`
`)}
${f}`}if(p){const g=`
uniform float ${p};
`;e=g+e,i=g+i}return o&&(t=`vec3 troika_position_${r};
vec3 troika_normal_${r};
vec2 troika_uv_${r};
${t}
`,e=`${e}
void troikaVertexTransform${r}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${o}
}
`,n=`
troika_position_${r} = vec3(position);
troika_normal_${r} = vec3(normal);
troika_uv_${r} = vec2(uv);
troikaVertexTransform${r}(troika_position_${r}, troika_normal_${r}, troika_uv_${r});
${n}
`,t=t.replace(/\b(position|normal|uv)\b/g,(g,v,_,k)=>/\battribute\s+vec[23]\s+$/.test(k.substr(0,_))?v:`troika_${v}_${r}`),l.map&&l.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${r}`))),t=lo(t,r,e,n,a),u=lo(u,r,i,s,f),{vertexShader:t,fragmentShader:u}}function lo(l,t,u,c,r){return(c||r||u)&&(l=l.replace(Eo,`
${u}
void troikaOrigMain${t}() {`),l+=`
void main() {
  ${c}
  troikaOrigMain${t}();
  ${r}
}`),l}function bi(l,t){return l==="uniforms"?void 0:typeof t=="function"?t.toString():t}let wi=0;const co=new Map;function xi(l){const t=JSON.stringify(l,bi);let u=co.get(t);return u==null&&co.set(t,u=++wi),u}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function Si(){return typeof window>"u"&&(self.window=self),function(l){var t={parse:function(r){var e=t._bin,n=new Uint8Array(r);if(e.readASCII(n,0,4)=="ttcf"){var a=4;e.readUshort(n,a),a+=2,e.readUshort(n,a),a+=2;var o=e.readUint(n,a);a+=4;for(var i=[],s=0;s<o;s++){var f=e.readUint(n,a);a+=4,i.push(t._readFont(n,f))}return i}return[t._readFont(n,0)]},_readFont:function(r,e){var n=t._bin,a=e;n.readFixed(r,e),e+=4;var o=n.readUshort(r,e);e+=2,n.readUshort(r,e),e+=2,n.readUshort(r,e),e+=2,n.readUshort(r,e),e+=2;for(var i=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],s={_data:r,_offset:a},f={},d=0;d<o;d++){var h=n.readASCII(r,e,4);e+=4,n.readUint(r,e),e+=4;var p=n.readUint(r,e);e+=4;var g=n.readUint(r,e);e+=4,f[h]={offset:p,length:g}}for(d=0;d<i.length;d++){var v=i[d];f[v]&&(s[v.trim()]=t[v.trim()].parse(r,f[v].offset,f[v].length,s))}return s},_tabOffset:function(r,e,n){for(var a=t._bin,o=a.readUshort(r,n+4),i=n+12,s=0;s<o;s++){var f=a.readASCII(r,i,4);i+=4,a.readUint(r,i),i+=4;var d=a.readUint(r,i);if(i+=4,a.readUint(r,i),i+=4,f==e)return d}return 0}};t._bin={readFixed:function(r,e){return(r[e]<<8|r[e+1])+(r[e+2]<<8|r[e+3])/65540},readF2dot14:function(r,e){return t._bin.readShort(r,e)/16384},readInt:function(r,e){return t._bin._view(r).getInt32(e)},readInt8:function(r,e){return t._bin._view(r).getInt8(e)},readShort:function(r,e){return t._bin._view(r).getInt16(e)},readUshort:function(r,e){return t._bin._view(r).getUint16(e)},readUshorts:function(r,e,n){for(var a=[],o=0;o<n;o++)a.push(t._bin.readUshort(r,e+2*o));return a},readUint:function(r,e){return t._bin._view(r).getUint32(e)},readUint64:function(r,e){return 4294967296*t._bin.readUint(r,e)+t._bin.readUint(r,e+4)},readASCII:function(r,e,n){for(var a="",o=0;o<n;o++)a+=String.fromCharCode(r[e+o]);return a},readUnicode:function(r,e,n){for(var a="",o=0;o<n;o++){var i=r[e++]<<8|r[e++];a+=String.fromCharCode(i)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(r,e,n){var a=t._bin._tdec;return a&&e==0&&n==r.length?a.decode(r):t._bin.readASCII(r,e,n)},readBytes:function(r,e,n){for(var a=[],o=0;o<n;o++)a.push(r[e+o]);return a},readASCIIArray:function(r,e,n){for(var a=[],o=0;o<n;o++)a.push(String.fromCharCode(r[e+o]));return a},_view:function(r){return r._dataView||(r._dataView=r.buffer?new DataView(r.buffer,r.byteOffset,r.byteLength):new DataView(new Uint8Array(r).buffer))}},t._lctf={},t._lctf.parse=function(r,e,n,a,o){var i=t._bin,s={},f=e;i.readFixed(r,e),e+=4;var d=i.readUshort(r,e);e+=2;var h=i.readUshort(r,e);e+=2;var p=i.readUshort(r,e);return e+=2,s.scriptList=t._lctf.readScriptList(r,f+d),s.featureList=t._lctf.readFeatureList(r,f+h),s.lookupList=t._lctf.readLookupList(r,f+p,o),s},t._lctf.readLookupList=function(r,e,n){var a=t._bin,o=e,i=[],s=a.readUshort(r,e);e+=2;for(var f=0;f<s;f++){var d=a.readUshort(r,e);e+=2;var h=t._lctf.readLookupTable(r,o+d,n);i.push(h)}return i},t._lctf.readLookupTable=function(r,e,n){var a=t._bin,o=e,i={tabs:[]};i.ltype=a.readUshort(r,e),e+=2,i.flag=a.readUshort(r,e),e+=2;var s=a.readUshort(r,e);e+=2;for(var f=i.ltype,d=0;d<s;d++){var h=a.readUshort(r,e);e+=2;var p=n(r,f,o+h,i);i.tabs.push(p)}return i},t._lctf.numOfOnes=function(r){for(var e=0,n=0;n<32;n++)r>>>n&1&&e++;return e},t._lctf.readClassDef=function(r,e){var n=t._bin,a=[],o=n.readUshort(r,e);if(e+=2,o==1){var i=n.readUshort(r,e);e+=2;var s=n.readUshort(r,e);e+=2;for(var f=0;f<s;f++)a.push(i+f),a.push(i+f),a.push(n.readUshort(r,e)),e+=2}if(o==2){var d=n.readUshort(r,e);for(e+=2,f=0;f<d;f++)a.push(n.readUshort(r,e)),e+=2,a.push(n.readUshort(r,e)),e+=2,a.push(n.readUshort(r,e)),e+=2}return a},t._lctf.getInterval=function(r,e){for(var n=0;n<r.length;n+=3){var a=r[n],o=r[n+1];if(r[n+2],a<=e&&e<=o)return n}return-1},t._lctf.readCoverage=function(r,e){var n=t._bin,a={};a.fmt=n.readUshort(r,e),e+=2;var o=n.readUshort(r,e);return e+=2,a.fmt==1&&(a.tab=n.readUshorts(r,e,o)),a.fmt==2&&(a.tab=n.readUshorts(r,e,3*o)),a},t._lctf.coverageIndex=function(r,e){var n=r.tab;if(r.fmt==1)return n.indexOf(e);if(r.fmt==2){var a=t._lctf.getInterval(n,e);if(a!=-1)return n[a+2]+(e-n[a])}return-1},t._lctf.readFeatureList=function(r,e){var n=t._bin,a=e,o=[],i=n.readUshort(r,e);e+=2;for(var s=0;s<i;s++){var f=n.readASCII(r,e,4);e+=4;var d=n.readUshort(r,e);e+=2;var h=t._lctf.readFeatureTable(r,a+d);h.tag=f.trim(),o.push(h)}return o},t._lctf.readFeatureTable=function(r,e){var n=t._bin,a=e,o={},i=n.readUshort(r,e);e+=2,i>0&&(o.featureParams=a+i);var s=n.readUshort(r,e);e+=2,o.tab=[];for(var f=0;f<s;f++)o.tab.push(n.readUshort(r,e+2*f));return o},t._lctf.readScriptList=function(r,e){var n=t._bin,a=e,o={},i=n.readUshort(r,e);e+=2;for(var s=0;s<i;s++){var f=n.readASCII(r,e,4);e+=4;var d=n.readUshort(r,e);e+=2,o[f.trim()]=t._lctf.readScriptTable(r,a+d)}return o},t._lctf.readScriptTable=function(r,e){var n=t._bin,a=e,o={},i=n.readUshort(r,e);e+=2,i>0&&(o.default=t._lctf.readLangSysTable(r,a+i));var s=n.readUshort(r,e);e+=2;for(var f=0;f<s;f++){var d=n.readASCII(r,e,4);e+=4;var h=n.readUshort(r,e);e+=2,o[d.trim()]=t._lctf.readLangSysTable(r,a+h)}return o},t._lctf.readLangSysTable=function(r,e){var n=t._bin,a={};n.readUshort(r,e),e+=2,a.reqFeature=n.readUshort(r,e),e+=2;var o=n.readUshort(r,e);return e+=2,a.features=n.readUshorts(r,e,o),a},t.CFF={},t.CFF.parse=function(r,e,n){var a=t._bin;(r=new Uint8Array(r.buffer,e,n))[e=0],r[++e],r[++e],r[++e],e++;var o=[];e=t.CFF.readIndex(r,e,o);for(var i=[],s=0;s<o.length-1;s++)i.push(a.readASCII(r,e+o[s],o[s+1]-o[s]));e+=o[o.length-1];var f=[];e=t.CFF.readIndex(r,e,f);var d=[];for(s=0;s<f.length-1;s++)d.push(t.CFF.readDict(r,e+f[s],e+f[s+1]));e+=f[f.length-1];var h=d[0],p=[];e=t.CFF.readIndex(r,e,p);var g=[];for(s=0;s<p.length-1;s++)g.push(a.readASCII(r,e+p[s],p[s+1]-p[s]));if(e+=p[p.length-1],t.CFF.readSubrs(r,e,h),h.CharStrings){e=h.CharStrings,p=[],e=t.CFF.readIndex(r,e,p);var v=[];for(s=0;s<p.length-1;s++)v.push(a.readBytes(r,e+p[s],p[s+1]-p[s]));h.CharStrings=v}if(h.ROS){e=h.FDArray;var _=[];for(e=t.CFF.readIndex(r,e,_),h.FDArray=[],s=0;s<_.length-1;s++){var k=t.CFF.readDict(r,e+_[s],e+_[s+1]);t.CFF._readFDict(r,k,g),h.FDArray.push(k)}e+=_[_.length-1],e=h.FDSelect,h.FDSelect=[];var T=r[e];if(e++,T!=3)throw T;var b=a.readUshort(r,e);for(e+=2,s=0;s<b+1;s++)h.FDSelect.push(a.readUshort(r,e),r[e+2]),e+=3}return h.Encoding&&(h.Encoding=t.CFF.readEncoding(r,h.Encoding,h.CharStrings.length)),h.charset&&(h.charset=t.CFF.readCharset(r,h.charset,h.CharStrings.length)),t.CFF._readFDict(r,h,g),h},t.CFF._readFDict=function(r,e,n){var a;for(var o in e.Private&&(a=e.Private[1],e.Private=t.CFF.readDict(r,a,a+e.Private[0]),e.Private.Subrs&&t.CFF.readSubrs(r,a+e.Private.Subrs,e.Private)),e)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)!=-1&&(e[o]=n[e[o]-426+35])},t.CFF.readSubrs=function(r,e,n){var a=t._bin,o=[];e=t.CFF.readIndex(r,e,o);var i,s=o.length;i=s<1240?107:s<33900?1131:32768,n.Bias=i,n.Subrs=[];for(var f=0;f<o.length-1;f++)n.Subrs.push(a.readBytes(r,e+o[f],o[f+1]-o[f]))},t.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],t.CFF.glyphByUnicode=function(r,e){for(var n=0;n<r.charset.length;n++)if(r.charset[n]==e)return n;return-1},t.CFF.glyphBySE=function(r,e){return e<0||e>255?-1:t.CFF.glyphByUnicode(r,t.CFF.tableSE[e])},t.CFF.readEncoding=function(r,e,n){t._bin;var a=[".notdef"],o=r[e];if(e++,o!=0)throw"error: unknown encoding format: "+o;var i=r[e];e++;for(var s=0;s<i;s++)a.push(r[e+s]);return a},t.CFF.readCharset=function(r,e,n){var a=t._bin,o=[".notdef"],i=r[e];if(e++,i==0)for(var s=0;s<n;s++){var f=a.readUshort(r,e);e+=2,o.push(f)}else{if(i!=1&&i!=2)throw"error: format: "+i;for(;o.length<n;){f=a.readUshort(r,e),e+=2;var d=0;for(i==1?(d=r[e],e++):(d=a.readUshort(r,e),e+=2),s=0;s<=d;s++)o.push(f),f++}}return o},t.CFF.readIndex=function(r,e,n){var a=t._bin,o=a.readUshort(r,e)+1,i=r[e+=2];if(e++,i==1)for(var s=0;s<o;s++)n.push(r[e+s]);else if(i==2)for(s=0;s<o;s++)n.push(a.readUshort(r,e+2*s));else if(i==3)for(s=0;s<o;s++)n.push(16777215&a.readUint(r,e+3*s-1));else if(o!=1)throw"unsupported offset size: "+i+", count: "+o;return(e+=o*i)-1},t.CFF.getCharString=function(r,e,n){var a=t._bin,o=r[e],i=r[e+1];r[e+2],r[e+3],r[e+4];var s=1,f=null,d=null;o<=20&&(f=o,s=1),o==12&&(f=100*o+i,s=2),21<=o&&o<=27&&(f=o,s=1),o==28&&(d=a.readShort(r,e+1),s=3),29<=o&&o<=31&&(f=o,s=1),32<=o&&o<=246&&(d=o-139,s=1),247<=o&&o<=250&&(d=256*(o-247)+i+108,s=2),251<=o&&o<=254&&(d=256*-(o-251)-i-108,s=2),o==255&&(d=a.readInt(r,e+1)/65535,s=5),n.val=d??"o"+f,n.size=s},t.CFF.readCharString=function(r,e,n){for(var a=e+n,o=t._bin,i=[];e<a;){var s=r[e],f=r[e+1];r[e+2],r[e+3],r[e+4];var d=1,h=null,p=null;s<=20&&(h=s,d=1),s==12&&(h=100*s+f,d=2),s!=19&&s!=20||(h=s,d=2),21<=s&&s<=27&&(h=s,d=1),s==28&&(p=o.readShort(r,e+1),d=3),29<=s&&s<=31&&(h=s,d=1),32<=s&&s<=246&&(p=s-139,d=1),247<=s&&s<=250&&(p=256*(s-247)+f+108,d=2),251<=s&&s<=254&&(p=256*-(s-251)-f-108,d=2),s==255&&(p=o.readInt(r,e+1)/65535,d=5),i.push(p??"o"+h),e+=d}return i},t.CFF.readDict=function(r,e,n){for(var a=t._bin,o={},i=[];e<n;){var s=r[e],f=r[e+1];r[e+2],r[e+3],r[e+4];var d=1,h=null,p=null;if(s==28&&(p=a.readShort(r,e+1),d=3),s==29&&(p=a.readInt(r,e+1),d=5),32<=s&&s<=246&&(p=s-139,d=1),247<=s&&s<=250&&(p=256*(s-247)+f+108,d=2),251<=s&&s<=254&&(p=256*-(s-251)-f-108,d=2),s==255)throw p=a.readInt(r,e+1)/65535,d=5,"unknown number";if(s==30){var g=[];for(d=1;;){var v=r[e+d];d++;var _=v>>4,k=15&v;if(_!=15&&g.push(_),k!=15&&g.push(k),k==15)break}for(var T="",b=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],C=0;C<g.length;C++)T+=b[g[C]];p=parseFloat(T)}s<=21&&(h=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][s],d=1,s==12&&(h=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][f],d=2)),h!=null?(o[h]=i.length==1?i[0]:i,i=[]):i.push(p),e+=d}return o},t.cmap={},t.cmap.parse=function(r,e,n){r=new Uint8Array(r.buffer,e,n),e=0;var a=t._bin,o={};a.readUshort(r,e),e+=2;var i=a.readUshort(r,e);e+=2;var s=[];o.tables=[];for(var f=0;f<i;f++){var d=a.readUshort(r,e);e+=2;var h=a.readUshort(r,e);e+=2;var p=a.readUint(r,e);e+=4;var g="p"+d+"e"+h,v=s.indexOf(p);if(v==-1){var _;v=o.tables.length,s.push(p);var k=a.readUshort(r,p);k==0?_=t.cmap.parse0(r,p):k==4?_=t.cmap.parse4(r,p):k==6?_=t.cmap.parse6(r,p):k==12?_=t.cmap.parse12(r,p):console.debug("unknown format: "+k,d,h,p),o.tables.push(_)}if(o[g]!=null)throw"multiple tables for one platform+encoding";o[g]=v}return o},t.cmap.parse0=function(r,e){var n=t._bin,a={};a.format=n.readUshort(r,e),e+=2;var o=n.readUshort(r,e);e+=2,n.readUshort(r,e),e+=2,a.map=[];for(var i=0;i<o-6;i++)a.map.push(r[e+i]);return a},t.cmap.parse4=function(r,e){var n=t._bin,a=e,o={};o.format=n.readUshort(r,e),e+=2;var i=n.readUshort(r,e);e+=2,n.readUshort(r,e),e+=2;var s=n.readUshort(r,e);e+=2;var f=s/2;o.searchRange=n.readUshort(r,e),e+=2,o.entrySelector=n.readUshort(r,e),e+=2,o.rangeShift=n.readUshort(r,e),e+=2,o.endCount=n.readUshorts(r,e,f),e+=2*f,e+=2,o.startCount=n.readUshorts(r,e,f),e+=2*f,o.idDelta=[];for(var d=0;d<f;d++)o.idDelta.push(n.readShort(r,e)),e+=2;for(o.idRangeOffset=n.readUshorts(r,e,f),e+=2*f,o.glyphIdArray=[];e<a+i;)o.glyphIdArray.push(n.readUshort(r,e)),e+=2;return o},t.cmap.parse6=function(r,e){var n=t._bin,a={};a.format=n.readUshort(r,e),e+=2,n.readUshort(r,e),e+=2,n.readUshort(r,e),e+=2,a.firstCode=n.readUshort(r,e),e+=2;var o=n.readUshort(r,e);e+=2,a.glyphIdArray=[];for(var i=0;i<o;i++)a.glyphIdArray.push(n.readUshort(r,e)),e+=2;return a},t.cmap.parse12=function(r,e){var n=t._bin,a={};a.format=n.readUshort(r,e),e+=2,e+=2,n.readUint(r,e),e+=4,n.readUint(r,e),e+=4;var o=n.readUint(r,e);e+=4,a.groups=[];for(var i=0;i<o;i++){var s=e+12*i,f=n.readUint(r,s+0),d=n.readUint(r,s+4),h=n.readUint(r,s+8);a.groups.push([f,d,h])}return a},t.glyf={},t.glyf.parse=function(r,e,n,a){for(var o=[],i=0;i<a.maxp.numGlyphs;i++)o.push(null);return o},t.glyf._parseGlyf=function(r,e){var n=t._bin,a=r._data,o=t._tabOffset(a,"glyf",r._offset)+r.loca[e];if(r.loca[e]==r.loca[e+1])return null;var i={};if(i.noc=n.readShort(a,o),o+=2,i.xMin=n.readShort(a,o),o+=2,i.yMin=n.readShort(a,o),o+=2,i.xMax=n.readShort(a,o),o+=2,i.yMax=n.readShort(a,o),o+=2,i.xMin>=i.xMax||i.yMin>=i.yMax)return null;if(i.noc>0){i.endPts=[];for(var s=0;s<i.noc;s++)i.endPts.push(n.readUshort(a,o)),o+=2;var f=n.readUshort(a,o);if(o+=2,a.length-o<f)return null;i.instructions=n.readBytes(a,o,f),o+=f;var d=i.endPts[i.noc-1]+1;for(i.flags=[],s=0;s<d;s++){var h=a[o];if(o++,i.flags.push(h),(8&h)!=0){var p=a[o];o++;for(var g=0;g<p;g++)i.flags.push(h),s++}}for(i.xs=[],s=0;s<d;s++){var v=(2&i.flags[s])!=0,_=(16&i.flags[s])!=0;v?(i.xs.push(_?a[o]:-a[o]),o++):_?i.xs.push(0):(i.xs.push(n.readShort(a,o)),o+=2)}for(i.ys=[],s=0;s<d;s++)v=(4&i.flags[s])!=0,_=(32&i.flags[s])!=0,v?(i.ys.push(_?a[o]:-a[o]),o++):_?i.ys.push(0):(i.ys.push(n.readShort(a,o)),o+=2);var k=0,T=0;for(s=0;s<d;s++)k+=i.xs[s],T+=i.ys[s],i.xs[s]=k,i.ys[s]=T}else{var b;i.parts=[];do{b=n.readUshort(a,o),o+=2;var C={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(i.parts.push(C),C.glyphIndex=n.readUshort(a,o),o+=2,1&b){var M=n.readShort(a,o);o+=2;var w=n.readShort(a,o);o+=2}else M=n.readInt8(a,o),o++,w=n.readInt8(a,o),o++;2&b?(C.m.tx=M,C.m.ty=w):(C.p1=M,C.p2=w),8&b?(C.m.a=C.m.d=n.readF2dot14(a,o),o+=2):64&b?(C.m.a=n.readF2dot14(a,o),o+=2,C.m.d=n.readF2dot14(a,o),o+=2):128&b&&(C.m.a=n.readF2dot14(a,o),o+=2,C.m.b=n.readF2dot14(a,o),o+=2,C.m.c=n.readF2dot14(a,o),o+=2,C.m.d=n.readF2dot14(a,o),o+=2)}while(32&b);if(256&b){var x=n.readUshort(a,o);for(o+=2,i.instr=[],s=0;s<x;s++)i.instr.push(a[o]),o++}}return i},t.GDEF={},t.GDEF.parse=function(r,e,n,a){var o=e;e+=4;var i=t._bin.readUshort(r,e);return{glyphClassDef:i===0?null:t._lctf.readClassDef(r,o+i)}},t.GPOS={},t.GPOS.parse=function(r,e,n,a){return t._lctf.parse(r,e,n,a,t.GPOS.subt)},t.GPOS.subt=function(r,e,n,a){var o=t._bin,i=n,s={};if(s.fmt=o.readUshort(r,n),n+=2,e==1||e==2||e==3||e==7||e==8&&s.fmt<=2){var f=o.readUshort(r,n);n+=2,s.coverage=t._lctf.readCoverage(r,f+i)}if(e==1&&s.fmt==1){var d=o.readUshort(r,n);n+=2,d!=0&&(s.pos=t.GPOS.readValueRecord(r,n,d))}else if(e==2&&s.fmt>=1&&s.fmt<=2){d=o.readUshort(r,n),n+=2;var h=o.readUshort(r,n);n+=2;var p=t._lctf.numOfOnes(d),g=t._lctf.numOfOnes(h);if(s.fmt==1){s.pairsets=[];var v=o.readUshort(r,n);n+=2;for(var _=0;_<v;_++){var k=i+o.readUshort(r,n);n+=2;var T=o.readUshort(r,k);k+=2;for(var b=[],C=0;C<T;C++){var M=o.readUshort(r,k);k+=2,d!=0&&(y=t.GPOS.readValueRecord(r,k,d),k+=2*p),h!=0&&(F=t.GPOS.readValueRecord(r,k,h),k+=2*g),b.push({gid2:M,val1:y,val2:F})}s.pairsets.push(b)}}if(s.fmt==2){var w=o.readUshort(r,n);n+=2;var x=o.readUshort(r,n);n+=2;var R=o.readUshort(r,n);n+=2;var P=o.readUshort(r,n);for(n+=2,s.classDef1=t._lctf.readClassDef(r,i+w),s.classDef2=t._lctf.readClassDef(r,i+x),s.matrix=[],_=0;_<R;_++){var j=[];for(C=0;C<P;C++){var y=null,F=null;d!=0&&(y=t.GPOS.readValueRecord(r,n,d),n+=2*p),h!=0&&(F=t.GPOS.readValueRecord(r,n,h),n+=2*g),j.push({val1:y,val2:F})}s.matrix.push(j)}}}else if(e==4&&s.fmt==1)s.markCoverage=t._lctf.readCoverage(r,o.readUshort(r,n)+i),s.baseCoverage=t._lctf.readCoverage(r,o.readUshort(r,n+2)+i),s.markClassCount=o.readUshort(r,n+4),s.markArray=t.GPOS.readMarkArray(r,o.readUshort(r,n+6)+i),s.baseArray=t.GPOS.readBaseArray(r,o.readUshort(r,n+8)+i,s.markClassCount);else if(e==6&&s.fmt==1)s.mark1Coverage=t._lctf.readCoverage(r,o.readUshort(r,n)+i),s.mark2Coverage=t._lctf.readCoverage(r,o.readUshort(r,n+2)+i),s.markClassCount=o.readUshort(r,n+4),s.mark1Array=t.GPOS.readMarkArray(r,o.readUshort(r,n+6)+i),s.mark2Array=t.GPOS.readBaseArray(r,o.readUshort(r,n+8)+i,s.markClassCount);else{if(e==9&&s.fmt==1){var E=o.readUshort(r,n);n+=2;var V=o.readUint(r,n);if(n+=4,a.ltype==9)a.ltype=E;else if(a.ltype!=E)throw"invalid extension substitution";return t.GPOS.subt(r,a.ltype,i+V)}console.debug("unsupported GPOS table LookupType",e,"format",s.fmt)}return s},t.GPOS.readValueRecord=function(r,e,n){var a=t._bin,o=[];return o.push(1&n?a.readShort(r,e):0),e+=1&n?2:0,o.push(2&n?a.readShort(r,e):0),e+=2&n?2:0,o.push(4&n?a.readShort(r,e):0),e+=4&n?2:0,o.push(8&n?a.readShort(r,e):0),e+=8&n?2:0,o},t.GPOS.readBaseArray=function(r,e,n){var a=t._bin,o=[],i=e,s=a.readUshort(r,e);e+=2;for(var f=0;f<s;f++){for(var d=[],h=0;h<n;h++)d.push(t.GPOS.readAnchorRecord(r,i+a.readUshort(r,e))),e+=2;o.push(d)}return o},t.GPOS.readMarkArray=function(r,e){var n=t._bin,a=[],o=e,i=n.readUshort(r,e);e+=2;for(var s=0;s<i;s++){var f=t.GPOS.readAnchorRecord(r,n.readUshort(r,e+2)+o);f.markClass=n.readUshort(r,e),a.push(f),e+=4}return a},t.GPOS.readAnchorRecord=function(r,e){var n=t._bin,a={};return a.fmt=n.readUshort(r,e),a.x=n.readShort(r,e+2),a.y=n.readShort(r,e+4),a},t.GSUB={},t.GSUB.parse=function(r,e,n,a){return t._lctf.parse(r,e,n,a,t.GSUB.subt)},t.GSUB.subt=function(r,e,n,a){var o=t._bin,i=n,s={};if(s.fmt=o.readUshort(r,n),n+=2,e!=1&&e!=2&&e!=4&&e!=5&&e!=6)return null;if(e==1||e==2||e==4||e==5&&s.fmt<=2||e==6&&s.fmt<=2){var f=o.readUshort(r,n);n+=2,s.coverage=t._lctf.readCoverage(r,i+f)}if(e==1&&s.fmt>=1&&s.fmt<=2){if(s.fmt==1)s.delta=o.readShort(r,n),n+=2;else if(s.fmt==2){var d=o.readUshort(r,n);n+=2,s.newg=o.readUshorts(r,n,d),n+=2*s.newg.length}}else if(e==2&&s.fmt==1){d=o.readUshort(r,n),n+=2,s.seqs=[];for(var h=0;h<d;h++){var p=o.readUshort(r,n)+i;n+=2;var g=o.readUshort(r,p);s.seqs.push(o.readUshorts(r,p+2,g))}}else if(e==4)for(s.vals=[],d=o.readUshort(r,n),n+=2,h=0;h<d;h++){var v=o.readUshort(r,n);n+=2,s.vals.push(t.GSUB.readLigatureSet(r,i+v))}else if(e==5&&s.fmt==2){if(s.fmt==2){var _=o.readUshort(r,n);n+=2,s.cDef=t._lctf.readClassDef(r,i+_),s.scset=[];var k=o.readUshort(r,n);for(n+=2,h=0;h<k;h++){var T=o.readUshort(r,n);n+=2,s.scset.push(T==0?null:t.GSUB.readSubClassSet(r,i+T))}}}else if(e==6&&s.fmt==3){if(s.fmt==3){for(h=0;h<3;h++){d=o.readUshort(r,n),n+=2;for(var b=[],C=0;C<d;C++)b.push(t._lctf.readCoverage(r,i+o.readUshort(r,n+2*C)));n+=2*d,h==0&&(s.backCvg=b),h==1&&(s.inptCvg=b),h==2&&(s.ahedCvg=b)}d=o.readUshort(r,n),n+=2,s.lookupRec=t.GSUB.readSubstLookupRecords(r,n,d)}}else{if(e==7&&s.fmt==1){var M=o.readUshort(r,n);n+=2;var w=o.readUint(r,n);if(n+=4,a.ltype==9)a.ltype=M;else if(a.ltype!=M)throw"invalid extension substitution";return t.GSUB.subt(r,a.ltype,i+w)}console.debug("unsupported GSUB table LookupType",e,"format",s.fmt)}return s},t.GSUB.readSubClassSet=function(r,e){var n=t._bin.readUshort,a=e,o=[],i=n(r,e);e+=2;for(var s=0;s<i;s++){var f=n(r,e);e+=2,o.push(t.GSUB.readSubClassRule(r,a+f))}return o},t.GSUB.readSubClassRule=function(r,e){var n=t._bin.readUshort,a={},o=n(r,e),i=n(r,e+=2);e+=2,a.input=[];for(var s=0;s<o-1;s++)a.input.push(n(r,e)),e+=2;return a.substLookupRecords=t.GSUB.readSubstLookupRecords(r,e,i),a},t.GSUB.readSubstLookupRecords=function(r,e,n){for(var a=t._bin.readUshort,o=[],i=0;i<n;i++)o.push(a(r,e),a(r,e+2)),e+=4;return o},t.GSUB.readChainSubClassSet=function(r,e){var n=t._bin,a=e,o=[],i=n.readUshort(r,e);e+=2;for(var s=0;s<i;s++){var f=n.readUshort(r,e);e+=2,o.push(t.GSUB.readChainSubClassRule(r,a+f))}return o},t.GSUB.readChainSubClassRule=function(r,e){for(var n=t._bin,a={},o=["backtrack","input","lookahead"],i=0;i<o.length;i++){var s=n.readUshort(r,e);e+=2,i==1&&s--,a[o[i]]=n.readUshorts(r,e,s),e+=2*a[o[i]].length}return s=n.readUshort(r,e),e+=2,a.subst=n.readUshorts(r,e,2*s),e+=2*a.subst.length,a},t.GSUB.readLigatureSet=function(r,e){var n=t._bin,a=e,o=[],i=n.readUshort(r,e);e+=2;for(var s=0;s<i;s++){var f=n.readUshort(r,e);e+=2,o.push(t.GSUB.readLigature(r,a+f))}return o},t.GSUB.readLigature=function(r,e){var n=t._bin,a={chain:[]};a.nglyph=n.readUshort(r,e),e+=2;var o=n.readUshort(r,e);e+=2;for(var i=0;i<o-1;i++)a.chain.push(n.readUshort(r,e)),e+=2;return a},t.head={},t.head.parse=function(r,e,n){var a=t._bin,o={};return a.readFixed(r,e),e+=4,o.fontRevision=a.readFixed(r,e),e+=4,a.readUint(r,e),e+=4,a.readUint(r,e),e+=4,o.flags=a.readUshort(r,e),e+=2,o.unitsPerEm=a.readUshort(r,e),e+=2,o.created=a.readUint64(r,e),e+=8,o.modified=a.readUint64(r,e),e+=8,o.xMin=a.readShort(r,e),e+=2,o.yMin=a.readShort(r,e),e+=2,o.xMax=a.readShort(r,e),e+=2,o.yMax=a.readShort(r,e),e+=2,o.macStyle=a.readUshort(r,e),e+=2,o.lowestRecPPEM=a.readUshort(r,e),e+=2,o.fontDirectionHint=a.readShort(r,e),e+=2,o.indexToLocFormat=a.readShort(r,e),e+=2,o.glyphDataFormat=a.readShort(r,e),e+=2,o},t.hhea={},t.hhea.parse=function(r,e,n){var a=t._bin,o={};return a.readFixed(r,e),e+=4,o.ascender=a.readShort(r,e),e+=2,o.descender=a.readShort(r,e),e+=2,o.lineGap=a.readShort(r,e),e+=2,o.advanceWidthMax=a.readUshort(r,e),e+=2,o.minLeftSideBearing=a.readShort(r,e),e+=2,o.minRightSideBearing=a.readShort(r,e),e+=2,o.xMaxExtent=a.readShort(r,e),e+=2,o.caretSlopeRise=a.readShort(r,e),e+=2,o.caretSlopeRun=a.readShort(r,e),e+=2,o.caretOffset=a.readShort(r,e),e+=2,e+=8,o.metricDataFormat=a.readShort(r,e),e+=2,o.numberOfHMetrics=a.readUshort(r,e),e+=2,o},t.hmtx={},t.hmtx.parse=function(r,e,n,a){for(var o=t._bin,i={aWidth:[],lsBearing:[]},s=0,f=0,d=0;d<a.maxp.numGlyphs;d++)d<a.hhea.numberOfHMetrics&&(s=o.readUshort(r,e),e+=2,f=o.readShort(r,e),e+=2),i.aWidth.push(s),i.lsBearing.push(f);return i},t.kern={},t.kern.parse=function(r,e,n,a){var o=t._bin,i=o.readUshort(r,e);if(e+=2,i==1)return t.kern.parseV1(r,e-2,n,a);var s=o.readUshort(r,e);e+=2;for(var f={glyph1:[],rval:[]},d=0;d<s;d++){e+=2,n=o.readUshort(r,e),e+=2;var h=o.readUshort(r,e);e+=2;var p=h>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;e=t.kern.readFormat0(r,e,f)}return f},t.kern.parseV1=function(r,e,n,a){var o=t._bin;o.readFixed(r,e),e+=4;var i=o.readUint(r,e);e+=4;for(var s={glyph1:[],rval:[]},f=0;f<i;f++){o.readUint(r,e),e+=4;var d=o.readUshort(r,e);e+=2,o.readUshort(r,e),e+=2;var h=d>>>8;if((h&=15)!=0)throw"unknown kern table format: "+h;e=t.kern.readFormat0(r,e,s)}return s},t.kern.readFormat0=function(r,e,n){var a=t._bin,o=-1,i=a.readUshort(r,e);e+=2,a.readUshort(r,e),e+=2,a.readUshort(r,e),e+=2,a.readUshort(r,e),e+=2;for(var s=0;s<i;s++){var f=a.readUshort(r,e);e+=2;var d=a.readUshort(r,e);e+=2;var h=a.readShort(r,e);e+=2,f!=o&&(n.glyph1.push(f),n.rval.push({glyph2:[],vals:[]}));var p=n.rval[n.rval.length-1];p.glyph2.push(d),p.vals.push(h),o=f}return e},t.loca={},t.loca.parse=function(r,e,n,a){var o=t._bin,i=[],s=a.head.indexToLocFormat,f=a.maxp.numGlyphs+1;if(s==0)for(var d=0;d<f;d++)i.push(o.readUshort(r,e+(d<<1))<<1);if(s==1)for(d=0;d<f;d++)i.push(o.readUint(r,e+(d<<2)));return i},t.maxp={},t.maxp.parse=function(r,e,n){var a=t._bin,o={},i=a.readUint(r,e);return e+=4,o.numGlyphs=a.readUshort(r,e),e+=2,i==65536&&(o.maxPoints=a.readUshort(r,e),e+=2,o.maxContours=a.readUshort(r,e),e+=2,o.maxCompositePoints=a.readUshort(r,e),e+=2,o.maxCompositeContours=a.readUshort(r,e),e+=2,o.maxZones=a.readUshort(r,e),e+=2,o.maxTwilightPoints=a.readUshort(r,e),e+=2,o.maxStorage=a.readUshort(r,e),e+=2,o.maxFunctionDefs=a.readUshort(r,e),e+=2,o.maxInstructionDefs=a.readUshort(r,e),e+=2,o.maxStackElements=a.readUshort(r,e),e+=2,o.maxSizeOfInstructions=a.readUshort(r,e),e+=2,o.maxComponentElements=a.readUshort(r,e),e+=2,o.maxComponentDepth=a.readUshort(r,e),e+=2),o},t.name={},t.name.parse=function(r,e,n){var a=t._bin,o={};a.readUshort(r,e),e+=2;var i=a.readUshort(r,e);e+=2,a.readUshort(r,e);for(var s,f=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],d=e+=2,h=0;h<i;h++){var p=a.readUshort(r,e);e+=2;var g=a.readUshort(r,e);e+=2;var v=a.readUshort(r,e);e+=2;var _=a.readUshort(r,e);e+=2;var k=a.readUshort(r,e);e+=2;var T=a.readUshort(r,e);e+=2;var b,C=f[_],M=d+12*i+T;if(p==0)b=a.readUnicode(r,M,k/2);else if(p==3&&g==0)b=a.readUnicode(r,M,k/2);else if(g==0)b=a.readASCII(r,M,k);else if(g==1)b=a.readUnicode(r,M,k/2);else if(g==3)b=a.readUnicode(r,M,k/2);else{if(p!=1)throw"unknown encoding "+g+", platformID: "+p;b=a.readASCII(r,M,k),console.debug("reading unknown MAC encoding "+g+" as ASCII")}var w="p"+p+","+v.toString(16);o[w]==null&&(o[w]={}),o[w][C!==void 0?C:_]=b,o[w]._lang=v}for(var x in o)if(o[x].postScriptName!=null&&o[x]._lang==1033)return o[x];for(var x in o)if(o[x].postScriptName!=null&&o[x]._lang==0)return o[x];for(var x in o)if(o[x].postScriptName!=null&&o[x]._lang==3084)return o[x];for(var x in o)if(o[x].postScriptName!=null)return o[x];for(var x in o){s=x;break}return console.debug("returning name table with languageID "+o[s]._lang),o[s]},t["OS/2"]={},t["OS/2"].parse=function(r,e,n){var a=t._bin.readUshort(r,e);e+=2;var o={};if(a==0)t["OS/2"].version0(r,e,o);else if(a==1)t["OS/2"].version1(r,e,o);else if(a==2||a==3||a==4)t["OS/2"].version2(r,e,o);else{if(a!=5)throw"unknown OS/2 table version: "+a;t["OS/2"].version5(r,e,o)}return o},t["OS/2"].version0=function(r,e,n){var a=t._bin;return n.xAvgCharWidth=a.readShort(r,e),e+=2,n.usWeightClass=a.readUshort(r,e),e+=2,n.usWidthClass=a.readUshort(r,e),e+=2,n.fsType=a.readUshort(r,e),e+=2,n.ySubscriptXSize=a.readShort(r,e),e+=2,n.ySubscriptYSize=a.readShort(r,e),e+=2,n.ySubscriptXOffset=a.readShort(r,e),e+=2,n.ySubscriptYOffset=a.readShort(r,e),e+=2,n.ySuperscriptXSize=a.readShort(r,e),e+=2,n.ySuperscriptYSize=a.readShort(r,e),e+=2,n.ySuperscriptXOffset=a.readShort(r,e),e+=2,n.ySuperscriptYOffset=a.readShort(r,e),e+=2,n.yStrikeoutSize=a.readShort(r,e),e+=2,n.yStrikeoutPosition=a.readShort(r,e),e+=2,n.sFamilyClass=a.readShort(r,e),e+=2,n.panose=a.readBytes(r,e,10),e+=10,n.ulUnicodeRange1=a.readUint(r,e),e+=4,n.ulUnicodeRange2=a.readUint(r,e),e+=4,n.ulUnicodeRange3=a.readUint(r,e),e+=4,n.ulUnicodeRange4=a.readUint(r,e),e+=4,n.achVendID=[a.readInt8(r,e),a.readInt8(r,e+1),a.readInt8(r,e+2),a.readInt8(r,e+3)],e+=4,n.fsSelection=a.readUshort(r,e),e+=2,n.usFirstCharIndex=a.readUshort(r,e),e+=2,n.usLastCharIndex=a.readUshort(r,e),e+=2,n.sTypoAscender=a.readShort(r,e),e+=2,n.sTypoDescender=a.readShort(r,e),e+=2,n.sTypoLineGap=a.readShort(r,e),e+=2,n.usWinAscent=a.readUshort(r,e),e+=2,n.usWinDescent=a.readUshort(r,e),e+=2},t["OS/2"].version1=function(r,e,n){var a=t._bin;return e=t["OS/2"].version0(r,e,n),n.ulCodePageRange1=a.readUint(r,e),e+=4,n.ulCodePageRange2=a.readUint(r,e),e+=4},t["OS/2"].version2=function(r,e,n){var a=t._bin;return e=t["OS/2"].version1(r,e,n),n.sxHeight=a.readShort(r,e),e+=2,n.sCapHeight=a.readShort(r,e),e+=2,n.usDefault=a.readUshort(r,e),e+=2,n.usBreak=a.readUshort(r,e),e+=2,n.usMaxContext=a.readUshort(r,e),e+=2},t["OS/2"].version5=function(r,e,n){var a=t._bin;return e=t["OS/2"].version2(r,e,n),n.usLowerOpticalPointSize=a.readUshort(r,e),e+=2,n.usUpperOpticalPointSize=a.readUshort(r,e),e+=2},t.post={},t.post.parse=function(r,e,n){var a=t._bin,o={};return o.version=a.readFixed(r,e),e+=4,o.italicAngle=a.readFixed(r,e),e+=4,o.underlinePosition=a.readShort(r,e),e+=2,o.underlineThickness=a.readShort(r,e),e+=2,o},t==null&&(t={}),t.U==null&&(t.U={}),t.U.codeToGlyph=function(r,e){var n=r.cmap,a=-1;if(n.p0e4!=null?a=n.p0e4:n.p3e1!=null?a=n.p3e1:n.p1e0!=null?a=n.p1e0:n.p0e3!=null&&(a=n.p0e3),a==-1)throw"no familiar platform and encoding!";var o=n.tables[a];if(o.format==0)return e>=o.map.length?0:o.map[e];if(o.format==4){for(var i=-1,s=0;s<o.endCount.length;s++)if(e<=o.endCount[s]){i=s;break}return i==-1||o.startCount[i]>e?0:65535&(o.idRangeOffset[i]!=0?o.glyphIdArray[e-o.startCount[i]+(o.idRangeOffset[i]>>1)-(o.idRangeOffset.length-i)]:e+o.idDelta[i])}if(o.format==12){if(e>o.groups[o.groups.length-1][1])return 0;for(s=0;s<o.groups.length;s++){var f=o.groups[s];if(f[0]<=e&&e<=f[1])return f[2]+(e-f[0])}return 0}throw"unknown cmap table format "+o.format},t.U.glyphToPath=function(r,e){var n={cmds:[],crds:[]};if(r.SVG&&r.SVG.entries[e]){var a=r.SVG.entries[e];return a==null?n:(typeof a=="string"&&(a=t.SVG.toPath(a),r.SVG.entries[e]=a),a)}if(r.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:r.CFF.Private?r.CFF.Private.defaultWidthX:0,open:!1},i=r.CFF,s=r.CFF.Private;if(i.ROS){for(var f=0;i.FDSelect[f+2]<=e;)f+=2;s=i.FDArray[i.FDSelect[f+1]].Private}t.U._drawCFF(r.CFF.CharStrings[e],o,i,s,n)}else r.glyf&&t.U._drawGlyf(e,r,n);return n},t.U._drawGlyf=function(r,e,n){var a=e.glyf[r];a==null&&(a=e.glyf[r]=t.glyf._parseGlyf(e,r)),a!=null&&(a.noc>-1?t.U._simpleGlyph(a,n):t.U._compoGlyph(a,e,n))},t.U._simpleGlyph=function(r,e){for(var n=0;n<r.noc;n++){for(var a=n==0?0:r.endPts[n-1]+1,o=r.endPts[n],i=a;i<=o;i++){var s=i==a?o:i-1,f=i==o?a:i+1,d=1&r.flags[i],h=1&r.flags[s],p=1&r.flags[f],g=r.xs[i],v=r.ys[i];if(i==a)if(d){if(!h){t.U.P.moveTo(e,g,v);continue}t.U.P.moveTo(e,r.xs[s],r.ys[s])}else h?t.U.P.moveTo(e,r.xs[s],r.ys[s]):t.U.P.moveTo(e,(r.xs[s]+g)/2,(r.ys[s]+v)/2);d?h&&t.U.P.lineTo(e,g,v):p?t.U.P.qcurveTo(e,g,v,r.xs[f],r.ys[f]):t.U.P.qcurveTo(e,g,v,(g+r.xs[f])/2,(v+r.ys[f])/2)}t.U.P.closePath(e)}},t.U._compoGlyph=function(r,e,n){for(var a=0;a<r.parts.length;a++){var o={cmds:[],crds:[]},i=r.parts[a];t.U._drawGlyf(i.glyphIndex,e,o);for(var s=i.m,f=0;f<o.crds.length;f+=2){var d=o.crds[f],h=o.crds[f+1];n.crds.push(d*s.a+h*s.b+s.tx),n.crds.push(d*s.c+h*s.d+s.ty)}for(f=0;f<o.cmds.length;f++)n.cmds.push(o.cmds[f])}},t.U._getGlyphClass=function(r,e){var n=t._lctf.getInterval(e,r);return n==-1?0:e[n+2]},t.U._applySubs=function(r,e,n,a){for(var o=r.length-e-1,i=0;i<n.tabs.length;i++)if(n.tabs[i]!=null){var s,f=n.tabs[i];if(!f.coverage||(s=t._lctf.coverageIndex(f.coverage,r[e]))!=-1){if(n.ltype==1)r[e],f.fmt==1?r[e]=r[e]+f.delta:r[e]=f.newg[s];else if(n.ltype==4)for(var d=f.vals[s],h=0;h<d.length;h++){var p=d[h],g=p.chain.length;if(!(g>o)){for(var v=!0,_=0,k=0;k<g;k++){for(;r[e+_+(1+k)]==-1;)_++;p.chain[k]!=r[e+_+(1+k)]&&(v=!1)}if(v){for(r[e]=p.nglyph,k=0;k<g+_;k++)r[e+k+1]=-1;break}}}else if(n.ltype==5&&f.fmt==2)for(var T=t._lctf.getInterval(f.cDef,r[e]),b=f.cDef[T+2],C=f.scset[b],M=0;M<C.length;M++){var w=C[M],x=w.input;if(!(x.length>o)){for(v=!0,k=0;k<x.length;k++){var R=t._lctf.getInterval(f.cDef,r[e+1+k]);if(T==-1&&f.cDef[R+2]!=x[k]){v=!1;break}}if(v){var P=w.substLookupRecords;for(h=0;h<P.length;h+=2)P[h],P[h+1]}}}else if(n.ltype==6&&f.fmt==3){if(!t.U._glsCovered(r,f.backCvg,e-f.backCvg.length)||!t.U._glsCovered(r,f.inptCvg,e)||!t.U._glsCovered(r,f.ahedCvg,e+f.inptCvg.length))continue;var j=f.lookupRec;for(M=0;M<j.length;M+=2){T=j[M];var y=a[j[M+1]];t.U._applySubs(r,e+T,y,a)}}}}},t.U._glsCovered=function(r,e,n){for(var a=0;a<e.length;a++)if(t._lctf.coverageIndex(e[a],r[n+a])==-1)return!1;return!0},t.U.glyphsToPath=function(r,e,n){for(var a={cmds:[],crds:[]},o=0,i=0;i<e.length;i++){var s=e[i];if(s!=-1){for(var f=i<e.length-1&&e[i+1]!=-1?e[i+1]:0,d=t.U.glyphToPath(r,s),h=0;h<d.crds.length;h+=2)a.crds.push(d.crds[h]+o),a.crds.push(d.crds[h+1]);for(n&&a.cmds.push(n),h=0;h<d.cmds.length;h++)a.cmds.push(d.cmds[h]);n&&a.cmds.push("X"),o+=r.hmtx.aWidth[s],i<e.length-1&&(o+=t.U.getPairAdjustment(r,s,f))}}return a},t.U.P={},t.U.P.moveTo=function(r,e,n){r.cmds.push("M"),r.crds.push(e,n)},t.U.P.lineTo=function(r,e,n){r.cmds.push("L"),r.crds.push(e,n)},t.U.P.curveTo=function(r,e,n,a,o,i,s){r.cmds.push("C"),r.crds.push(e,n,a,o,i,s)},t.U.P.qcurveTo=function(r,e,n,a,o){r.cmds.push("Q"),r.crds.push(e,n,a,o)},t.U.P.closePath=function(r){r.cmds.push("Z")},t.U._drawCFF=function(r,e,n,a,o){for(var i=e.stack,s=e.nStems,f=e.haveWidth,d=e.width,h=e.open,p=0,g=e.x,v=e.y,_=0,k=0,T=0,b=0,C=0,M=0,w=0,x=0,R=0,P=0,j={val:0,size:0};p<r.length;){t.CFF.getCharString(r,p,j);var y=j.val;if(p+=j.size,y=="o1"||y=="o18")i.length%2!=0&&!f&&(d=i.shift()+a.nominalWidthX),s+=i.length>>1,i.length=0,f=!0;else if(y=="o3"||y=="o23")i.length%2!=0&&!f&&(d=i.shift()+a.nominalWidthX),s+=i.length>>1,i.length=0,f=!0;else if(y=="o4")i.length>1&&!f&&(d=i.shift()+a.nominalWidthX,f=!0),h&&t.U.P.closePath(o),v+=i.pop(),t.U.P.moveTo(o,g,v),h=!0;else if(y=="o5")for(;i.length>0;)g+=i.shift(),v+=i.shift(),t.U.P.lineTo(o,g,v);else if(y=="o6"||y=="o7")for(var F=i.length,E=y=="o6",V=0;V<F;V++){var z=i.shift();E?g+=z:v+=z,E=!E,t.U.P.lineTo(o,g,v)}else if(y=="o8"||y=="o24"){F=i.length;for(var q=0;q+6<=F;)_=g+i.shift(),k=v+i.shift(),T=_+i.shift(),b=k+i.shift(),g=T+i.shift(),v=b+i.shift(),t.U.P.curveTo(o,_,k,T,b,g,v),q+=6;y=="o24"&&(g+=i.shift(),v+=i.shift(),t.U.P.lineTo(o,g,v))}else{if(y=="o11")break;if(y=="o1234"||y=="o1235"||y=="o1236"||y=="o1237")y=="o1234"&&(k=v,T=(_=g+i.shift())+i.shift(),P=b=k+i.shift(),M=b,x=v,g=(w=(C=(R=T+i.shift())+i.shift())+i.shift())+i.shift(),t.U.P.curveTo(o,_,k,T,b,R,P),t.U.P.curveTo(o,C,M,w,x,g,v)),y=="o1235"&&(_=g+i.shift(),k=v+i.shift(),T=_+i.shift(),b=k+i.shift(),R=T+i.shift(),P=b+i.shift(),C=R+i.shift(),M=P+i.shift(),w=C+i.shift(),x=M+i.shift(),g=w+i.shift(),v=x+i.shift(),i.shift(),t.U.P.curveTo(o,_,k,T,b,R,P),t.U.P.curveTo(o,C,M,w,x,g,v)),y=="o1236"&&(_=g+i.shift(),k=v+i.shift(),T=_+i.shift(),P=b=k+i.shift(),M=b,w=(C=(R=T+i.shift())+i.shift())+i.shift(),x=M+i.shift(),g=w+i.shift(),t.U.P.curveTo(o,_,k,T,b,R,P),t.U.P.curveTo(o,C,M,w,x,g,v)),y=="o1237"&&(_=g+i.shift(),k=v+i.shift(),T=_+i.shift(),b=k+i.shift(),R=T+i.shift(),P=b+i.shift(),C=R+i.shift(),M=P+i.shift(),w=C+i.shift(),x=M+i.shift(),Math.abs(w-g)>Math.abs(x-v)?g=w+i.shift():v=x+i.shift(),t.U.P.curveTo(o,_,k,T,b,R,P),t.U.P.curveTo(o,C,M,w,x,g,v));else if(y=="o14"){if(i.length>0&&!f&&(d=i.shift()+n.nominalWidthX,f=!0),i.length==4){var ne=i.shift(),L=i.shift(),B=i.shift(),m=i.shift(),S=t.CFF.glyphBySE(n,B),D=t.CFF.glyphBySE(n,m);t.U._drawCFF(n.CharStrings[S],e,n,a,o),e.x=ne,e.y=L,t.U._drawCFF(n.CharStrings[D],e,n,a,o)}h&&(t.U.P.closePath(o),h=!1)}else if(y=="o19"||y=="o20")i.length%2!=0&&!f&&(d=i.shift()+a.nominalWidthX),s+=i.length>>1,i.length=0,f=!0,p+=s+7>>3;else if(y=="o21")i.length>2&&!f&&(d=i.shift()+a.nominalWidthX,f=!0),v+=i.pop(),g+=i.pop(),h&&t.U.P.closePath(o),t.U.P.moveTo(o,g,v),h=!0;else if(y=="o22")i.length>1&&!f&&(d=i.shift()+a.nominalWidthX,f=!0),g+=i.pop(),h&&t.U.P.closePath(o),t.U.P.moveTo(o,g,v),h=!0;else if(y=="o25"){for(;i.length>6;)g+=i.shift(),v+=i.shift(),t.U.P.lineTo(o,g,v);_=g+i.shift(),k=v+i.shift(),T=_+i.shift(),b=k+i.shift(),g=T+i.shift(),v=b+i.shift(),t.U.P.curveTo(o,_,k,T,b,g,v)}else if(y=="o26")for(i.length%2&&(g+=i.shift());i.length>0;)_=g,k=v+i.shift(),g=T=_+i.shift(),v=(b=k+i.shift())+i.shift(),t.U.P.curveTo(o,_,k,T,b,g,v);else if(y=="o27")for(i.length%2&&(v+=i.shift());i.length>0;)k=v,T=(_=g+i.shift())+i.shift(),b=k+i.shift(),g=T+i.shift(),v=b,t.U.P.curveTo(o,_,k,T,b,g,v);else if(y=="o10"||y=="o29"){var A=y=="o10"?a:n;if(i.length==0)console.debug("error: empty stack");else{var U=i.pop(),W=A.Subrs[U+A.Bias];e.x=g,e.y=v,e.nStems=s,e.haveWidth=f,e.width=d,e.open=h,t.U._drawCFF(W,e,n,a,o),g=e.x,v=e.y,s=e.nStems,f=e.haveWidth,d=e.width,h=e.open}}else if(y=="o30"||y=="o31"){var I=i.length,G=(q=0,y=="o31");for(q+=I-(F=-3&I);q<F;)G?(k=v,T=(_=g+i.shift())+i.shift(),v=(b=k+i.shift())+i.shift(),F-q==5?(g=T+i.shift(),q++):g=T,G=!1):(_=g,k=v+i.shift(),T=_+i.shift(),b=k+i.shift(),g=T+i.shift(),F-q==5?(v=b+i.shift(),q++):v=b,G=!0),t.U.P.curveTo(o,_,k,T,b,g,v),q+=4}else{if((y+"").charAt(0)=="o")throw console.debug("Unknown operation: "+y,r),y;i.push(y)}}}e.x=g,e.y=v,e.nStems=s,e.haveWidth=f,e.width=d,e.open=h};var u=t,c={Typr:u};return l.Typr=u,l.default=c,Object.defineProperty(l,"__esModule",{value:!0}),l}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function ki(){return function(l){var t=Uint8Array,u=Uint16Array,c=Uint32Array,r=new t([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),e=new t([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),n=new t([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(y,F){for(var E=new u(31),V=0;V<31;++V)E[V]=F+=1<<y[V-1];var z=new c(E[30]);for(V=1;V<30;++V)for(var q=E[V];q<E[V+1];++q)z[q]=q-E[V]<<5|V;return[E,z]},o=a(r,2),i=o[0],s=o[1];i[28]=258,s[258]=28;for(var f=a(e,0)[0],d=new u(32768),h=0;h<32768;++h){var p=(43690&h)>>>1|(21845&h)<<1;p=(61680&(p=(52428&p)>>>2|(13107&p)<<2))>>>4|(3855&p)<<4,d[h]=((65280&p)>>>8|(255&p)<<8)>>>1}var g=function(y,F,E){for(var V=y.length,z=0,q=new u(F);z<V;++z)++q[y[z]-1];var ne,L=new u(F);for(z=0;z<F;++z)L[z]=L[z-1]+q[z-1]<<1;{ne=new u(1<<F);var B=15-F;for(z=0;z<V;++z)if(y[z])for(var m=z<<4|y[z],S=F-y[z],D=L[y[z]-1]++<<S,A=D|(1<<S)-1;D<=A;++D)ne[d[D]>>>B]=m}return ne},v=new t(288);for(h=0;h<144;++h)v[h]=8;for(h=144;h<256;++h)v[h]=9;for(h=256;h<280;++h)v[h]=7;for(h=280;h<288;++h)v[h]=8;var _=new t(32);for(h=0;h<32;++h)_[h]=5;var k=g(v,9),T=g(_,5),b=function(y){for(var F=y[0],E=1;E<y.length;++E)y[E]>F&&(F=y[E]);return F},C=function(y,F,E){var V=F/8|0;return(y[V]|y[V+1]<<8)>>(7&F)&E},M=function(y,F){var E=F/8|0;return(y[E]|y[E+1]<<8|y[E+2]<<16)>>(7&F)},w=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],x=function(y,F,E){var V=new Error(F||w[y]);if(V.code=y,Error.captureStackTrace&&Error.captureStackTrace(V,x),!E)throw V;return V},R=function(y,F,E){var V=y.length;if(!V||E&&!E.l&&V<5)return F||new t(0);var z=!F||E,q=!E||E.i;E||(E={}),F||(F=new t(3*V));var ne,L=function(ce){var Pe=F.length;if(ce>Pe){var _e=new t(Math.max(2*Pe,ce));_e.set(F),F=_e}},B=E.f||0,m=E.p||0,S=E.b||0,D=E.l,A=E.d,U=E.m,W=E.n,I=8*V;do{if(!D){E.f=B=C(y,m,1);var G=C(y,m+1,3);if(m+=3,!G){var K=y[($=((ne=m)/8|0)+(7&ne&&1)+4)-4]|y[$-3]<<8,ee=$+K;if(ee>V){q&&x(0);break}z&&L(S+K),F.set(y.subarray($,ee),S),E.b=S+=K,E.p=m=8*ee;continue}if(G==1)D=k,A=T,U=9,W=5;else if(G==2){var X=C(y,m,31)+257,N=C(y,m+10,15)+4,ge=X+C(y,m+5,31)+1;m+=14;for(var fe=new t(ge),Q=new t(19),re=0;re<N;++re)Q[n[re]]=C(y,m+3*re,7);m+=3*N;var le=b(Q),H=(1<<le)-1,te=g(Q,le);for(re=0;re<ge;){var $,O=te[C(y,m,H)];if(m+=15&O,($=O>>>4)<16)fe[re++]=$;else{var pe=0,Z=0;for($==16?(Z=3+C(y,m,3),m+=2,pe=fe[re-1]):$==17?(Z=3+C(y,m,7),m+=3):$==18&&(Z=11+C(y,m,127),m+=7);Z--;)fe[re++]=pe}}var ae=fe.subarray(0,X),J=fe.subarray(X);U=b(ae),W=b(J),D=g(ae,U),A=g(J,W)}else x(1);if(m>I){q&&x(0);break}}z&&L(S+131072);for(var xe=(1<<U)-1,oe=(1<<W)-1,ie=m;;ie=m){var ue=(pe=D[M(y,m)&xe])>>>4;if((m+=15&pe)>I){q&&x(0);break}if(pe||x(2),ue<256)F[S++]=ue;else{if(ue==256){ie=m,D=null;break}var me=ue-254;if(ue>264){var Te=r[re=ue-257];me=C(y,m,(1<<Te)-1)+i[re],m+=Te}var Ue=A[M(y,m)&oe],ye=Ue>>>4;if(Ue||x(3),m+=15&Ue,J=f[ye],ye>3&&(Te=e[ye],J+=M(y,m)&(1<<Te)-1,m+=Te),m>I){q&&x(0);break}z&&L(S+131072);for(var be=S+me;S<be;S+=4)F[S]=F[S-J],F[S+1]=F[S+1-J],F[S+2]=F[S+2-J],F[S+3]=F[S+3-J];S=be}}E.l=D,E.p=ie,E.b=S,D&&(B=1,E.m=U,E.d=A,E.n=W)}while(!B);return S==F.length?F:function(ce,Pe,_e){(_e==null||_e>ce.length)&&(_e=ce.length);var Le=new(ce instanceof u?u:ce instanceof c?c:t)(_e-Pe);return Le.set(ce.subarray(Pe,_e)),Le}(F,0,S)},P=new t(0),j=typeof TextDecoder<"u"&&new TextDecoder;try{j.decode(P,{stream:!0})}catch{}return l.convert_streams=function(y){var F=new DataView(y),E=0;function V(){var X=F.getUint16(E);return E+=2,X}function z(){var X=F.getUint32(E);return E+=4,X}function q(X){K.setUint16(ee,X),ee+=2}function ne(X){K.setUint32(ee,X),ee+=4}for(var L={signature:z(),flavor:z(),length:z(),numTables:V(),reserved:V(),totalSfntSize:z(),majorVersion:V(),minorVersion:V(),metaOffset:z(),metaLength:z(),metaOrigLength:z(),privOffset:z(),privLength:z()},B=0;Math.pow(2,B)<=L.numTables;)B++;B--;for(var m=16*Math.pow(2,B),S=16*L.numTables-m,D=12,A=[],U=0;U<L.numTables;U++)A.push({tag:z(),offset:z(),compLength:z(),origLength:z(),origChecksum:z()}),D+=16;var W,I=new Uint8Array(12+16*A.length+A.reduce(function(X,N){return X+N.origLength+4},0)),G=I.buffer,K=new DataView(G),ee=0;return ne(L.flavor),q(L.numTables),q(m),q(B),q(S),A.forEach(function(X){ne(X.tag),ne(X.origChecksum),ne(D),ne(X.origLength),X.outOffset=D,(D+=X.origLength)%4!=0&&(D+=4-D%4)}),A.forEach(function(X){var N,ge=y.slice(X.offset,X.offset+X.compLength);if(X.compLength!=X.origLength){var fe=new Uint8Array(X.origLength);N=new Uint8Array(ge,2),R(N,fe)}else fe=new Uint8Array(ge);I.set(fe,X.outOffset);var Q=0;(D=X.outOffset+X.origLength)%4!=0&&(Q=4-D%4),I.set(new Uint8Array(Q).buffer,X.outOffset+X.origLength),W=D+Q}),G.slice(0,W)},Object.defineProperty(l,"__esModule",{value:!0}),l}({}).convert_streams}function Ti(l,t){const u={M:2,L:2,Q:4,C:6,Z:0},c={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},r=1,e=2,n=4,a=8,o=16,i=32;let s;function f(w){if(!s){const x={R:e,L:r,D:n,C:o,U:i,T:a};s=new Map;for(let R in c){let P=0;c[R].split(",").forEach(j=>{let[y,F]=j.split("+");y=parseInt(y,36),F=F?parseInt(F,36):0,s.set(P+=y,x[R]);for(let E=F;E--;)s.set(++P,x[R])})}}return s.get(w)||i}const d=1,h=2,p=3,g=4,v=[null,"isol","init","fina","medi"];function _(w){const x=new Uint8Array(w.length);let R=i,P=d,j=-1;for(let y=0;y<w.length;y++){const F=w.codePointAt(y);let E=f(F)|0,V=d;E&a||(R&(r|n|o)?E&(e|n|o)?(V=p,(P===d||P===p)&&x[j]++):E&(r|i)&&(P===h||P===g)&&x[j]--:R&(e|i)&&(P===h||P===g)&&x[j]--,P=x[y]=V,R=E,j=y,F>65535&&y++)}return x}function k(w,x){const R=[];for(let j=0;j<x.length;j++){const y=x.codePointAt(j);y>65535&&j++,R.push(l.U.codeToGlyph(w,y))}const P=w.GSUB;if(P){const{lookupList:j,featureList:y}=P;let F;const E=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,V=[];y.forEach(z=>{if(E.test(z.tag))for(let q=0;q<z.tab.length;q++){if(V[z.tab[q]])continue;V[z.tab[q]]=!0;const ne=j[z.tab[q]],L=/^(isol|init|fina|medi)$/.test(z.tag);L&&!F&&(F=_(x));for(let B=0;B<R.length;B++)(!F||!L||v[F[B]]===z.tag)&&l.U._applySubs(R,B,ne,j)}})}return R}function T(w,x){const R=new Int16Array(x.length*3);let P=0;for(;P<x.length;P++){const E=x[P];if(E===-1)continue;R[P*3+2]=w.hmtx.aWidth[E];const V=w.GPOS;if(V){const z=V.lookupList;for(let q=0;q<z.length;q++){const ne=z[q];for(let L=0;L<ne.tabs.length;L++){const B=ne.tabs[L];if(ne.ltype===1){if(l._lctf.coverageIndex(B.coverage,E)!==-1&&B.pos){F(B.pos,P);break}}else if(ne.ltype===2){let m=null,S=j();if(S!==-1){const D=l._lctf.coverageIndex(B.coverage,x[S]);if(D!==-1){if(B.fmt===1){const A=B.pairsets[D];for(let U=0;U<A.length;U++)A[U].gid2===E&&(m=A[U])}else if(B.fmt===2){const A=l.U._getGlyphClass(x[S],B.classDef1),U=l.U._getGlyphClass(E,B.classDef2);m=B.matrix[A][U]}if(m){m.val1&&F(m.val1,S),m.val2&&F(m.val2,P);break}}}}else if(ne.ltype===4){const m=l._lctf.coverageIndex(B.markCoverage,E);if(m!==-1){const S=j(y),D=S===-1?-1:l._lctf.coverageIndex(B.baseCoverage,x[S]);if(D!==-1){const A=B.markArray[m],U=B.baseArray[D][A.markClass];R[P*3]=U.x-A.x+R[S*3]-R[S*3+2],R[P*3+1]=U.y-A.y+R[S*3+1];break}}}else if(ne.ltype===6){const m=l._lctf.coverageIndex(B.mark1Coverage,E);if(m!==-1){const S=j();if(S!==-1){const D=x[S];if(b(w,D)===3){const A=l._lctf.coverageIndex(B.mark2Coverage,D);if(A!==-1){const U=B.mark1Array[m],W=B.mark2Array[A][U.markClass];R[P*3]=W.x-U.x+R[S*3]-R[S*3+2],R[P*3+1]=W.y-U.y+R[S*3+1];break}}}}}}}}else if(w.kern&&!w.cff){const z=j();if(z!==-1){const q=w.kern.glyph1.indexOf(x[z]);if(q!==-1){const ne=w.kern.rval[q].glyph2.indexOf(E);ne!==-1&&(R[z*3+2]+=w.kern.rval[q].vals[ne])}}}}return R;function j(E){for(let V=P-1;V>=0;V--)if(x[V]!==-1&&(!E||E(x[V])))return V;return-1}function y(E){return b(w,E)===1}function F(E,V){for(let z=0;z<3;z++)R[V*3+z]+=E[z]||0}}function b(w,x){const R=w.GDEF&&w.GDEF.glyphClassDef;return R?l.U._getGlyphClass(x,R):0}function C(...w){for(let x=0;x<w.length;x++)if(typeof w[x]=="number")return w[x]}function M(w){const x=Object.create(null),R=w["OS/2"],P=w.hhea,j=w.head.unitsPerEm,y=C(R&&R.sTypoAscender,P&&P.ascender,j),F={unitsPerEm:j,ascender:y,descender:C(R&&R.sTypoDescender,P&&P.descender,0),capHeight:C(R&&R.sCapHeight,y),xHeight:C(R&&R.sxHeight,y),lineGap:C(R&&R.sTypoLineGap,P&&P.lineGap),supportsCodePoint(E){return l.U.codeToGlyph(w,E)>0},forEachGlyph(E,V,z,q){let ne=0;const L=1/F.unitsPerEm*V,B=k(w,E);let m=0;const S=T(w,B);return B.forEach((D,A)=>{if(D!==-1){let U=x[D];if(!U){const{cmds:W,crds:I}=l.U.glyphToPath(w,D);let G="",K=0;for(let fe=0,Q=W.length;fe<Q;fe++){const re=u[W[fe]];G+=W[fe];for(let le=1;le<=re;le++)G+=(le>1?",":"")+I[K++]}let ee,X,N,ge;if(I.length){ee=X=1/0,N=ge=-1/0;for(let fe=0,Q=I.length;fe<Q;fe+=2){let re=I[fe],le=I[fe+1];re<ee&&(ee=re),le<X&&(X=le),re>N&&(N=re),le>ge&&(ge=le)}}else ee=N=X=ge=0;U=x[D]={index:D,advanceWidth:w.hmtx.aWidth[D],xMin:ee,yMin:X,xMax:N,yMax:ge,path:G}}q.call(null,U,ne+S[A*3]*L,S[A*3+1]*L,m),ne+=S[A*3+2]*L,z&&(ne+=z*V)}m+=E.codePointAt(m)>65535?2:1}),ne}};return F}return function(x){const R=new Uint8Array(x,0,4),P=l._bin.readASCII(R,0,4);if(P==="wOFF")x=t(x);else if(P==="wOF2")throw new Error("woff2 fonts not supported");return M(l.parse(x)[0])}}const Ci=kr({name:"Typr Font Parser",dependencies:[Si,ki,Ti],init(l,t,u){const c=l(),r=t();return u(c,r)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function _i(){return function(l){var t=function(){this.buckets=new Map};t.prototype.add=function(T){var b=T>>5;this.buckets.set(b,(this.buckets.get(b)||0)|1<<(31&T))},t.prototype.has=function(T){var b=this.buckets.get(T>>5);return b!==void 0&&(b&1<<(31&T))!=0},t.prototype.serialize=function(){var T=[];return this.buckets.forEach(function(b,C){T.push((+C).toString(36)+":"+b.toString(36))}),T.join(",")},t.prototype.deserialize=function(T){var b=this;this.buckets.clear(),T.split(",").forEach(function(C){var M=C.split(":");b.buckets.set(parseInt(M[0],36),parseInt(M[1],36))})};var u=Math.pow(2,8),c=u-1,r=~c;function e(T){var b=function(M){return M&r}(T).toString(16),C=function(M){return(M&r)+u-1}(T).toString(16);return"codepoint-index/plane"+(T>>16)+"/"+b+"-"+C+".json"}function n(T,b){var C=T&c,M=b.codePointAt(C/6|0);return((M=(M||48)-48)&1<<C%6)!=0}function a(T,b){var C;(C=T,C.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(M){return M.split("-").map(function(w){return parseInt(w.trim(),16)})})).forEach(function(M){var w=M[0],x=M[1];x===void 0&&(x=w),b(w,x)})}function o(T,b){a(T,function(C,M){for(var w=C;w<=M;w++)b(w)})}var i={},s={},f=new WeakMap,d="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function h(T){var b=f.get(T);return b||(b=new t,o(T.ranges,function(C){return b.add(C)}),f.set(T,b)),b}var p,g=new Map;function v(T,b,C){return T[b]?b:T[C]?C:function(M){for(var w in M)return w}(T)}function _(T,b){var C=b;if(!T.includes(C)){C=1/0;for(var M=0;M<T.length;M++)Math.abs(T[M]-b)<Math.abs(C-b)&&(C=T[M])}return C}function k(T){return p||(p=new Set,o("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(b){p.add(b)})),p.has(T)}return l.CodePointSet=t,l.clearCache=function(){i={},s={}},l.getFontsForString=function(T,b){b===void 0&&(b={});var C,M=b.lang;M===void 0&&(M=new RegExp("\\p{Script=Hangul}","u").test(C=T)?"ko":new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}","u").test(C)?"ja":"en");var w=b.category;w===void 0&&(w="sans-serif");var x=b.style;x===void 0&&(x="normal");var R=b.weight;R===void 0&&(R=400);var P=(b.dataUrl||d).replace(/\/$/g,""),j=new Map,y=new Uint8Array(T.length),F={},E={},V=new Array(T.length),z=new Map,q=!1;function ne(m){var S=g.get(m);return S||(S=fetch(P+"/"+m).then(function(D){if(!D.ok)throw new Error(D.statusText);return D.json().then(function(A){if(!Array.isArray(A)||A[0]!==1)throw new Error("Incorrect schema version; need 1, got "+A[0]);return A[1]})}).catch(function(D){if(P!==d)return q||(console.error('unicode-font-resolver: Failed loading from dataUrl "'+P+'", trying default CDN. '+D.message),q=!0),P=d,g.delete(m),ne(m);throw D}),g.set(m,S)),S}for(var L=function(m){var S=T.codePointAt(m),D=e(S);V[m]=D,i[D]||z.has(D)||z.set(D,ne(D).then(function(A){i[D]=A})),S>65535&&(m++,B=m)},B=0;B<T.length;B++)L(B);return Promise.all(z.values()).then(function(){z.clear();for(var m=function(D){var A=T.codePointAt(D),U=null,W=i[V[D]],I=void 0;for(var G in W){var K=E[G];if(K===void 0&&(K=E[G]=new RegExp(G).test(M||"en")),K){for(var ee in I=G,W[G])if(n(A,W[G][ee])){U=ee;break}break}}if(!U){e:for(var X in W)if(X!==I){for(var N in W[X])if(n(A,W[X][N])){U=N;break e}}}U||(console.debug("No font coverage for U+"+A.toString(16)),U="latin"),V[D]=U,s[U]||z.has(U)||z.set(U,ne("font-meta/"+U+".json").then(function(ge){s[U]=ge})),A>65535&&(D++,S=D)},S=0;S<T.length;S++)m(S);return Promise.all(z.values())}).then(function(){for(var m,S=null,D=0;D<T.length;D++){var A=T.codePointAt(D);if(S&&(k(A)||h(S).has(A)))y[D]=y[D-1];else{S=s[V[D]];var U=F[S.id];if(!U){var W=S.typeforms,I=v(W,w,"sans-serif"),G=v(W[I],x,"normal"),K=_((m=W[I])===null||m===void 0?void 0:m[G],R);U=F[S.id]=P+"/font-files/"+S.id+"/"+I+"."+G+"."+K+".woff"}var ee=j.get(U);ee==null&&(ee=j.size,j.set(U,ee)),y[D]=ee}A>65535&&(D++,y[D]=y[D-1])}return{fontUrls:Array.from(j.keys()),chars:y}})},Object.defineProperty(l,"__esModule",{value:!0}),l}({})}function Mi(l,t){const u=Object.create(null),c=Object.create(null);function r(n,a){const o=i=>{console.error(`Failure loading font ${n}`,i)};try{const i=new XMLHttpRequest;i.open("get",n,!0),i.responseType="arraybuffer",i.onload=function(){if(i.status>=400)o(new Error(i.statusText));else if(i.status>0)try{const s=l(i.response);s.src=n,a(s)}catch(s){o(s)}},i.onerror=o,i.send()}catch(i){o(i)}}function e(n,a){let o=u[n];o?a(o):c[n]?c[n].push(a):(c[n]=[a],r(n,i=>{i.src=n,u[n]=i,c[n].forEach(s=>s(i)),delete c[n]}))}return function(n,a,{lang:o,fonts:i=[],style:s="normal",weight:f="normal",unicodeFontsURL:d}={}){const h=new Uint8Array(n.length),p=[];n.length||k();const g=new Map,v=[];if(s!=="italic"&&(s="normal"),typeof f!="number"&&(f=f==="bold"?700:400),i&&!Array.isArray(i)&&(i=[i]),i=i.slice().filter(b=>!b.lang||b.lang.test(o)).reverse(),i.length){let w=0;(function x(R=0){for(let P=R,j=n.length;P<j;P++){const y=n.codePointAt(P);if(w===1&&p[h[P-1]].supportsCodePoint(y)||P>0&&/\s/.test(n[P]))h[P]=h[P-1],w===2&&(v[v.length-1][1]=P);else for(let F=h[P],E=i.length;F<=E;F++)if(F===E){const V=w===2?v[v.length-1]:v[v.length]=[P,P];V[1]=P,w=2}else{h[P]=F;const{src:V,unicodeRange:z}=i[F];if(!z||T(y,z)){const q=u[V];if(!q){e(V,()=>{x(P)});return}if(q.supportsCodePoint(y)){let ne=g.get(q);typeof ne!="number"&&(ne=p.length,p.push(q),g.set(q,ne)),h[P]=ne,w=1;break}}}y>65535&&P+1<j&&(h[P+1]=h[P],P++,w===2&&(v[v.length-1][1]=P))}_()})()}else v.push([0,n.length-1]),_();function _(){if(v.length){const b=v.map(C=>n.substring(C[0],C[1]+1)).join(`
`);t.getFontsForString(b,{lang:o||void 0,style:s,weight:f,dataUrl:d}).then(({fontUrls:C,chars:M})=>{const w=p.length;let x=0;v.forEach(P=>{for(let j=0,y=P[1]-P[0];j<=y;j++)h[P[0]+j]=M[x++]+w;x++});let R=0;C.forEach((P,j)=>{e(P,y=>{p[j+w]=y,++R===C.length&&k()})})})}else k()}function k(){a({chars:h,fonts:p})}function T(b,C){for(let M=0;M<C.length;M++){const[w,x=w]=C[M];if(w<=b&&b<=x)return!0}return!1}}}const Ei=kr({name:"FontResolver",dependencies:[Mi,Ci,_i],init(l,t,u){return l(t,u())}});function Ui(l,t){const c=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,r="[^\\S\\u00A0]",e=new RegExp(`${r}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function n({text:p,lang:g,fonts:v,style:_,weight:k,preResolvedFonts:T,unicodeFontsURL:b},C){const M=({chars:w,fonts:x})=>{let R,P;const j=[];for(let y=0;y<w.length;y++)w[y]!==P?(P=w[y],j.push(R={start:y,end:y,fontObj:x[w[y]]})):R.end=y;C(j)};T?M(T):l(p,M,{lang:g,fonts:v,style:_,weight:k,unicodeFontsURL:b})}function a({text:p="",font:g,lang:v,sdfGlyphSize:_=64,fontSize:k=400,fontWeight:T=1,fontStyle:b="normal",letterSpacing:C=0,lineHeight:M="normal",maxWidth:w=1/0,direction:x,textAlign:R="left",textIndent:P=0,whiteSpace:j="normal",overflowWrap:y="normal",anchorX:F=0,anchorY:E=0,metricsOnly:V=!1,unicodeFontsURL:z,preResolvedFonts:q=null,includeCaretPositions:ne=!1,chunkedBoundsSize:L=8192,colorRanges:B=null},m){const S=f(),D={fontLoad:0,typesetting:0};p.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),p=p.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),k=+k,C=+C,w=+w,M=M||"normal",P=+P,n({text:p,lang:v,style:b,weight:T,fonts:typeof g=="string"?[{src:g}]:g,unicodeFontsURL:z,preResolvedFonts:q},A=>{D.fontLoad=f()-S;const U=isFinite(w);let W=null,I=null,G=null,K=null,ee=null,X=null,N=null,ge=null,fe=0,Q=0,re=j!=="nowrap";const le=new Map,H=f();let te=P,$=0,O=new d;const pe=[O];A.forEach(oe=>{const{fontObj:ie}=oe,{ascender:ue,descender:me,unitsPerEm:Te,lineGap:Ue,capHeight:ye,xHeight:be}=ie;let ce=le.get(ie);if(!ce){const he=k/Te,Se=M==="normal"?(ue-me+Ue)*he:M*k,rr=(Se-(ue-me)*he)/2,ke=Math.min(Se,(ue-me)*he),we=(ue+me)/2*he+ke/2;ce={index:le.size,src:ie.src,fontObj:ie,fontSizeMult:he,unitsPerEm:Te,ascender:ue*he,descender:me*he,capHeight:ye*he,xHeight:be*he,lineHeight:Se,baseline:-rr-ue*he,caretTop:we,caretBottom:we-ke},le.set(ie,ce)}const{fontSizeMult:Pe}=ce,_e=p.slice(oe.start,oe.end+1);let Le,Ce;ie.forEachGlyph(_e,k,C,(he,Se,rr,ke)=>{Se+=$,ke+=oe.start,Le=Se,Ce=he;const we=p.charAt(ke),De=he.advanceWidth*Pe,Me=O.count;let ve;if("isEmpty"in he||(he.isWhitespace=!!we&&new RegExp(r).test(we),he.canBreakAfter=!!we&&e.test(we),he.isEmpty=he.xMin===he.xMax||he.yMin===he.yMax||c.test(we)),!he.isWhitespace&&!he.isEmpty&&Q++,re&&U&&!he.isWhitespace&&Se+De+te>w&&Me){if(O.glyphAt(Me-1).glyphObj.canBreakAfter)ve=new d,te=-Se;else for(let Be=Me;Be--;)if(Be===0&&y==="break-word"){ve=new d,te=-Se;break}else if(O.glyphAt(Be).glyphObj.canBreakAfter){ve=O.splitAt(Be+1);const Ie=ve.glyphAt(0).x;te-=Ie;for(let Fe=ve.count;Fe--;)ve.glyphAt(Fe).x-=Ie;break}ve&&(O.isSoftWrapped=!0,O=ve,pe.push(O),fe=w)}let Ee=O.glyphAt(O.count);Ee.glyphObj=he,Ee.x=Se+te,Ee.y=rr,Ee.width=De,Ee.charIndex=ke,Ee.fontData=ce,we===`
`&&(O=new d,pe.push(O),te=-(Se+De+C*k)+P)}),$=Le+Ce.advanceWidth*Pe+C*k});let Z=0;pe.forEach(oe=>{let ie=!0;for(let ue=oe.count;ue--;){const me=oe.glyphAt(ue);ie&&!me.glyphObj.isWhitespace&&(oe.width=me.x+me.width,oe.width>fe&&(fe=oe.width),ie=!1);let{lineHeight:Te,capHeight:Ue,xHeight:ye,baseline:be}=me.fontData;Te>oe.lineHeight&&(oe.lineHeight=Te);const ce=be-oe.baseline;ce<0&&(oe.baseline+=ce,oe.cap+=ce,oe.ex+=ce),oe.cap=Math.max(oe.cap,oe.baseline+Ue),oe.ex=Math.max(oe.ex,oe.baseline+ye)}oe.baseline-=Z,oe.cap-=Z,oe.ex-=Z,Z+=oe.lineHeight});let ae=0,J=0;if(F&&(typeof F=="number"?ae=-F:typeof F=="string"&&(ae=-fe*(F==="left"?0:F==="center"?.5:F==="right"?1:i(F)))),E&&(typeof E=="number"?J=-E:typeof E=="string"&&(J=E==="top"?0:E==="top-baseline"?-pe[0].baseline:E==="top-cap"?-pe[0].cap:E==="top-ex"?-pe[0].ex:E==="middle"?Z/2:E==="bottom"?Z:E==="bottom-baseline"?-pe[pe.length-1].baseline:i(E)*Z)),!V){const oe=t.getEmbeddingLevels(p,x);W=new Uint16Array(Q),I=new Uint8Array(Q),G=new Float32Array(Q*2),K={},N=[1/0,1/0,-1/0,-1/0],ge=[],ne&&(X=new Float32Array(p.length*4)),B&&(ee=new Uint8Array(Q*3));let ie=0,ue=-1,me=-1,Te,Ue;if(pe.forEach((ye,be)=>{let{count:ce,width:Pe}=ye;if(ce>0){let _e=0;for(let ke=ce;ke--&&ye.glyphAt(ke).glyphObj.isWhitespace;)_e++;let Le=0,Ce=0;if(R==="center")Le=(fe-Pe)/2;else if(R==="right")Le=fe-Pe;else if(R==="justify"&&ye.isSoftWrapped){let ke=0;for(let we=ce-_e;we--;)ye.glyphAt(we).glyphObj.isWhitespace&&ke++;Ce=(fe-Pe)/ke}if(Ce||Le){let ke=0;for(let we=0;we<ce;we++){let De=ye.glyphAt(we);const Me=De.glyphObj;De.x+=Le+ke,Ce!==0&&Me.isWhitespace&&we<ce-_e&&(ke+=Ce,De.width+=Ce)}}const he=t.getReorderSegments(p,oe,ye.glyphAt(0).charIndex,ye.glyphAt(ye.count-1).charIndex);for(let ke=0;ke<he.length;ke++){const[we,De]=he[ke];let Me=1/0,ve=-1/0;for(let Ee=0;Ee<ce;Ee++)if(ye.glyphAt(Ee).charIndex>=we){let Be=Ee,Ie=Ee;for(;Ie<ce;Ie++){let Fe=ye.glyphAt(Ie);if(Fe.charIndex>De)break;Ie<ce-_e&&(Me=Math.min(Me,Fe.x),ve=Math.max(ve,Fe.x+Fe.width))}for(let Fe=Be;Fe<Ie;Fe++){const je=ye.glyphAt(Fe);je.x=ve-(je.x+je.width-Me)}break}}let Se;const rr=ke=>Se=ke;for(let ke=0;ke<ce;ke++){const we=ye.glyphAt(ke);Se=we.glyphObj;const De=Se.index,Me=oe.levels[we.charIndex]&1;if(Me){const ve=t.getMirroredCharacter(p[we.charIndex]);ve&&we.fontData.fontObj.forEachGlyph(ve,0,0,rr)}if(ne){const{charIndex:ve,fontData:Ee}=we,Be=we.x+ae,Ie=we.x+we.width+ae;X[ve*4]=Me?Ie:Be,X[ve*4+1]=Me?Be:Ie,X[ve*4+2]=ye.baseline+Ee.caretBottom+J,X[ve*4+3]=ye.baseline+Ee.caretTop+J;const Fe=ve-ue;Fe>1&&s(X,ue,Fe),ue=ve}if(B){const{charIndex:ve}=we;for(;ve>me;)me++,B.hasOwnProperty(me)&&(Ue=B[me])}if(!Se.isWhitespace&&!Se.isEmpty){const ve=ie++,{fontSizeMult:Ee,src:Be,index:Ie}=we.fontData,Fe=K[Be]||(K[Be]={});Fe[De]||(Fe[De]={path:Se.path,pathBounds:[Se.xMin,Se.yMin,Se.xMax,Se.yMax]});const je=we.x+ae,tr=we.y+ye.baseline+J;G[ve*2]=je,G[ve*2+1]=tr;const Ze=je+Se.xMin*Ee,nr=tr+Se.yMin*Ee,sr=je+Se.xMax*Ee,Qe=tr+Se.yMax*Ee;Ze<N[0]&&(N[0]=Ze),nr<N[1]&&(N[1]=nr),sr>N[2]&&(N[2]=sr),Qe>N[3]&&(N[3]=Qe),ve%L===0&&(Te={start:ve,end:ve,rect:[1/0,1/0,-1/0,-1/0]},ge.push(Te)),Te.end++;const Oe=Te.rect;if(Ze<Oe[0]&&(Oe[0]=Ze),nr<Oe[1]&&(Oe[1]=nr),sr>Oe[2]&&(Oe[2]=sr),Qe>Oe[3]&&(Oe[3]=Qe),W[ve]=De,I[ve]=Ie,B){const lr=ve*3;ee[lr]=Ue>>16&255,ee[lr+1]=Ue>>8&255,ee[lr+2]=Ue&255}}}}}),X){const ye=p.length-ue;ye>1&&s(X,ue,ye)}}const xe=[];le.forEach(({index:oe,src:ie,unitsPerEm:ue,ascender:me,descender:Te,lineHeight:Ue,capHeight:ye,xHeight:be})=>{xe[oe]={src:ie,unitsPerEm:ue,ascender:me,descender:Te,lineHeight:Ue,capHeight:ye,xHeight:be}}),D.typesetting=f()-H,m({glyphIds:W,glyphFontIndices:I,glyphPositions:G,glyphData:K,fontData:xe,caretPositions:X,glyphColors:ee,chunkedBounds:ge,fontSize:k,topBaseline:J+pe[0].baseline,blockBounds:[ae,J-Z,ae+fe,J],visibleBounds:N,timings:D})})}function o(p,g){a({...p,metricsOnly:!0},v=>{const[_,k,T,b]=v.blockBounds;g({width:T-_,height:b-k})})}function i(p){let g=p.match(/^([\d.]+)%$/),v=g?parseFloat(g[1]):NaN;return isNaN(v)?0:v/100}function s(p,g,v){const _=p[g*4],k=p[g*4+1],T=p[g*4+2],b=p[g*4+3],C=(k-_)/v;for(let M=0;M<v;M++){const w=(g+M)*4;p[w]=_+C*M,p[w+1]=_+C*(M+1),p[w+2]=T,p[w+3]=b}}function f(){return(self.performance||Date).now()}function d(){this.data=[]}const h=["glyphObj","x","y","width","charIndex","fontData"];return d.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/h.length)},glyphAt(p){let g=d.flyweight;return g.data=this.data,g.index=p,g},splitAt(p){let g=new d;return g.data=this.data.splice(p*h.length),g}},d.flyweight=h.reduce((p,g,v,_)=>(Object.defineProperty(p,g,{get(){return this.data[this.index*h.length+v]},set(k){this.data[this.index*h.length+v]=k}}),p),{data:null,index:0}),{typeset:a,measure:o}}const dr=()=>(self.performance||Date).now(),dt=Mo();let uo;function Pi(l,t,u,c,r,e,n,a,o,i,s=!0){return s?Fi(l,t,u,c,r,e,n,a,o,i).then(null,f=>(uo||(console.warn("WebGL SDF generation failed, falling back to JS",f),uo=!0),ho(l,t,u,c,r,e,n,a,o,i))):ho(l,t,u,c,r,e,n,a,o,i)}const ut=[],Di=5;let Vt=0;function Uo(){const l=dr();for(;ut.length&&dr()-l<Di;)ut.shift()();Vt=ut.length?setTimeout(Uo,0):0}const Fi=(...l)=>new Promise((t,u)=>{ut.push(()=>{const c=dr();try{dt.webgl.generateIntoCanvas(...l),t({timing:dr()-c})}catch(r){u(r)}}),Vt||(Vt=setTimeout(Uo,0))}),Ai=4,Ri=2e3,fo={};let Ii=0;function ho(l,t,u,c,r,e,n,a,o,i){const s="TroikaTextSDFGenerator_JS_"+Ii++%Ai;let f=fo[s];return f||(f=fo[s]={workerModule:kr({name:s,workerId:s,dependencies:[Mo,dr],init(d,h){const p=d().javascript.generate;return function(...g){const v=h();return{textureData:p(...g),timing:h()-v}}},getTransferables(d){return[d.textureData.buffer]}}),requests:0,idleTimer:null}),f.requests++,clearTimeout(f.idleTimer),f.workerModule(l,t,u,c,r,e).then(({textureData:d,timing:h})=>{const p=dr(),g=new Uint8Array(d.length*4);for(let v=0;v<d.length;v++)g[v*4+i]=d[v];return dt.webglUtils.renderImageData(n,g,a,o,l,t,1<<3-i),h+=dr()-p,--f.requests===0&&(f.idleTimer=setTimeout(()=>{di(s)},Ri)),{timing:h}})}function Bi(l){l._warm||(dt.webgl.isSupported(l),l._warm=!0)}const Oi=dt.webglUtils.resizeWebGLCanvasWithoutClearing,Nr={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},Li=new ir;function wr(){return(self.performance||Date).now()}const po=Object.create(null);function Po(l,t){l=Wi({},l);const u=wr(),c=[];if(l.font&&c.push({label:"user",src:Ni(l.font)}),l.font=c,l.text=""+l.text,l.sdfGlyphSize=l.sdfGlyphSize||Nr.sdfGlyphSize,l.unicodeFontsURL=l.unicodeFontsURL||Nr.unicodeFontsURL,l.colorRanges!=null){let d={};for(let h in l.colorRanges)if(l.colorRanges.hasOwnProperty(h)){let p=l.colorRanges[h];typeof p!="number"&&(p=Li.set(p).getHex()),d[h]=p}l.colorRanges=d}Object.freeze(l);const{textureWidth:r,sdfExponent:e}=Nr,{sdfGlyphSize:n}=l,a=r/n*4;let o=po[n];if(!o){const d=document.createElement("canvas");d.width=r,d.height=n*256/a,o=po[n]={glyphCount:0,sdfGlyphSize:n,sdfCanvas:d,sdfTexture:new pa(d,void 0,void 0,void 0,xn,xn),contextLost:!1,glyphsByFont:new Map},o.sdfTexture.generateMipmaps=!1,Gi(o)}const{sdfTexture:i,sdfCanvas:s}=o;Ao(l).then(d=>{const{glyphIds:h,glyphFontIndices:p,fontData:g,glyphPositions:v,fontSize:_,timings:k}=d,T=[],b=new Float32Array(h.length*4);let C=0,M=0;const w=wr(),x=g.map(F=>{let E=o.glyphsByFont.get(F.src);return E||o.glyphsByFont.set(F.src,E=new Map),E});h.forEach((F,E)=>{const V=p[E],{src:z,unitsPerEm:q}=g[V];let ne=x[V].get(F);if(!ne){const{path:D,pathBounds:A}=d.glyphData[z][F],U=Math.max(A[2]-A[0],A[3]-A[1])/n*(Nr.sdfMargin*n+.5),W=o.glyphCount++,I=[A[0]-U,A[1]-U,A[2]+U,A[3]+U];x[V].set(F,ne={path:D,atlasIndex:W,sdfViewBox:I}),T.push(ne)}const{sdfViewBox:L}=ne,B=v[M++],m=v[M++],S=_/q;b[C++]=B+L[0]*S,b[C++]=m+L[1]*S,b[C++]=B+L[2]*S,b[C++]=m+L[3]*S,h[E]=ne.atlasIndex}),k.quads=(k.quads||0)+(wr()-w);const R=wr();k.sdf={};const P=s.height,j=Math.ceil(o.glyphCount/a),y=Math.pow(2,Math.ceil(Math.log2(j*n)));y>P&&(console.info(`Increasing SDF texture size ${P}->${y}`),Oi(s,r,y),i.dispose()),Promise.all(T.map(F=>Do(F,o,l.gpuAccelerateSDF).then(({timing:E})=>{k.sdf[F.atlasIndex]=E}))).then(()=>{T.length&&!o.contextLost&&(Fo(o),i.needsUpdate=!0),k.sdfTotal=wr()-R,k.total=wr()-u,t(Object.freeze({parameters:l,sdfTexture:i,sdfGlyphSize:n,sdfExponent:e,glyphBounds:b,glyphAtlasIndices:h,glyphColors:d.glyphColors,caretPositions:d.caretPositions,chunkedBounds:d.chunkedBounds,ascender:d.ascender,descender:d.descender,lineHeight:d.lineHeight,capHeight:d.capHeight,xHeight:d.xHeight,topBaseline:d.topBaseline,blockBounds:d.blockBounds,visibleBounds:d.visibleBounds,timings:d.timings}))})}),Promise.resolve().then(()=>{o.contextLost||Bi(s)})}function Do({path:l,atlasIndex:t,sdfViewBox:u},{sdfGlyphSize:c,sdfCanvas:r,contextLost:e},n){if(e)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:o}=Nr,i=Math.max(u[2]-u[0],u[3]-u[1]),s=Math.floor(t/4),f=s%(a/c)*c,d=Math.floor(s/(a/c))*c,h=t%4;return Pi(c,c,l,u,i,o,r,f,d,h,n)}function Gi(l){const t=l.sdfCanvas;t.addEventListener("webglcontextlost",u=>{console.log("Context Lost",u),u.preventDefault(),l.contextLost=!0}),t.addEventListener("webglcontextrestored",u=>{console.log("Context Restored",u),l.contextLost=!1;const c=[];l.glyphsByFont.forEach(r=>{r.forEach(e=>{c.push(Do(e,l,!0))})}),Promise.all(c).then(()=>{Fo(l),l.sdfTexture.needsUpdate=!0})})}function zi({font:l,characters:t,sdfGlyphSize:u},c){let r=Array.isArray(t)?t.join(`
`):""+t;Po({font:l,sdfGlyphSize:u,text:r},c)}function Wi(l,t){for(let u in t)t.hasOwnProperty(u)&&(l[u]=t[u]);return l}let st;function Ni(l){return st||(st=typeof document>"u"?{}:document.createElement("a")),st.href=l,st.href}function Fo(l){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:t,sdfTexture:u}=l,{width:c,height:r}=t,e=l.sdfCanvas.getContext("webgl");let n=u.image.data;(!n||n.length!==c*r*4)&&(n=new Uint8Array(c*r*4),u.image={width:c,height:r,data:n},u.flipY=!1,u.isDataTexture=!0),e.readPixels(0,0,c,r,e.RGBA,e.UNSIGNED_BYTE,n)}}const ji=kr({name:"Typesetter",dependencies:[Ui,Ei,pi],init(l,t,u){return l(t,u())}}),Ao=kr({name:"Typesetter",dependencies:[ji],init(l){return function(t){return new Promise(u=>{l.typeset(t,u)})}},getTransferables(l){const t=[];for(let u in l)l[u]&&l[u].buffer&&t.push(l[u].buffer);return t}});Ao.onMainThread;const mo={};function Vi(l){let t=mo[l];return t||(t=mo[l]=new Yt(1,1,l,l).translate(.5,.5,0)),t}const Hi="aTroikaGlyphBounds",vo="aTroikaGlyphIndex",Xi="aTroikaGlyphColor";class Yi extends fa{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new da,this.boundingBox=new xo}computeBoundingSphere(){}computeBoundingBox(){}set detail(t){if(t!==this._detail){this._detail=t,(typeof t!="number"||t<1)&&(t=1);let u=Vi(t);["position","normal","uv"].forEach(c=>{this.attributes[c]=u.attributes[c].clone()}),this.setIndex(u.getIndex().clone())}}get detail(){return this._detail}set curveRadius(t){t!==this._curveRadius&&(this._curveRadius=t,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(t,u,c,r,e){this.updateAttributeData(Hi,t,4),this.updateAttributeData(vo,u,1),this.updateAttributeData(Xi,e,3),this._blockBounds=c,this._chunkedBounds=r,this.instanceCount=u.length,this._updateBounds()}_updateBounds(){const t=this._blockBounds;if(t){const{curveRadius:u,boundingBox:c}=this;if(u){const{PI:r,floor:e,min:n,max:a,sin:o,cos:i}=Math,s=r/2,f=r*2,d=Math.abs(u),h=t[0]/d,p=t[2]/d,g=e((h+s)/f)!==e((p+s)/f)?-d:n(o(h)*d,o(p)*d),v=e((h-s)/f)!==e((p-s)/f)?d:a(o(h)*d,o(p)*d),_=e((h+r)/f)!==e((p+r)/f)?d*2:a(d-i(h)*d,d-i(p)*d);c.min.set(g,t[1],u<0?-_:0),c.max.set(v,t[3],u<0?0:_)}else c.min.set(t[0],t[1],0),c.max.set(t[2],t[3],0);c.getBoundingSphere(this.boundingSphere)}}applyClipRect(t){let u=this.getAttribute(vo).count,c=this._chunkedBounds;if(c)for(let r=c.length;r--;){u=c[r].end;let e=c[r].rect;if(e[1]<t.w&&e[3]>t.y&&e[0]<t.z&&e[2]>t.x)break}this.instanceCount=u}updateAttributeData(t,u,c){const r=this.getAttribute(t);u?r&&r.array.length===u.length?(r.array.set(u),r.needsUpdate=!0):(this.setAttribute(t,new ha(u,c)),delete this._maxInstanceCount,this.dispose()):r&&this.deleteAttribute(t)}}const Ki=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,Ji=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,Zi=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,Qi=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function qi(l){const t=jt(l,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new er},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new Sr(0,0,0,0)},uTroikaClipRect:{value:new Sr(0,0,0,0)},uTroikaEdgeOffset:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new er},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new ir},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new ma},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:Ki,vertexTransform:Ji,fragmentDefs:Zi,fragmentColorTransform:Qi,customRewriter({vertexShader:u,fragmentShader:c}){let r=/\buniform\s+vec3\s+diffuse\b/;return r.test(c)&&(c=c.replace(r,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),r.test(u)||(u=u.replace(Eo,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:u,fragmentShader:c}}});return t.transparent=!0,t.forceSinglePass=!0,Object.defineProperties(t,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),t}const Zt=new ua({color:16777215,side:va,transparent:!0}),go=8421504,yo=new Ht,lt=new Je,It=new Je,zr=[],$i=new Je,Bt="+x+y";function bo(l){return Array.isArray(l)?l[0]:l}let Ro=()=>{const l=new Xt(new Yt(1,1),Zt);return Ro=()=>l,l},Io=()=>{const l=new Xt(new Yt(1,1,32,1),Zt);return Io=()=>l,l};const es={type:"syncstart"},rs={type:"synccomplete"},Bo=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],ts=Bo.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");let Oo=class extends Xt{constructor(){const t=new Yi;super(t,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=go,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=Bt,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(t){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(t):(this._isSyncing=!0,this.dispatchEvent(es),Po({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},u=>{this._isSyncing=!1,this._textRenderInfo=u,this.geometry.updateGlyphs(u.glyphBounds,u.glyphAtlasIndices,u.blockBounds,u.chunkedBounds,u.glyphColors);const c=this._queuedSyncs;c&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{c.forEach(r=>r&&r())})),this.dispatchEvent(rs),t&&t()})))}onBeforeRender(t,u,c,r,e,n){this.sync(),e.isTroikaTextMaterial&&this._prepareForRender(e)}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}createDerivedMaterial(t){return qi(t)}get material(){let t=this._derivedMaterial;const u=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Zt.clone());if((!t||!t.isDerivedFrom(u))&&(t=this._derivedMaterial=this.createDerivedMaterial(u),u.addEventListener("dispose",function c(){u.removeEventListener("dispose",c),t.dispose()})),this.hasOutline()){let c=t._outlineMtl;return c||(c=t._outlineMtl=Object.create(t,{id:{value:t.id+.1}}),c.isTextOutlineMaterial=!0,c.depthWrite=!1,c.map=null,t.addEventListener("dispose",function r(){t.removeEventListener("dispose",r),c.dispose()})),[c,t]}else return t}set material(t){t&&t.isTroikaTextMaterial?(this._derivedMaterial=t,this._baseMaterial=t.baseMaterial):this._baseMaterial=t}hasOutline(){return!!(this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY)}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(t){this.geometry.detail=t}get curveRadius(){return this.geometry.curveRadius}set curveRadius(t){this.geometry.curveRadius=t}get customDepthMaterial(){return bo(this.material).getDepthMaterial()}set customDepthMaterial(t){}get customDistanceMaterial(){return bo(this.material).getDistanceMaterial()}set customDistanceMaterial(t){}_prepareForRender(t){const u=t.isTextOutlineMaterial,c=t.uniforms,r=this.textRenderInfo;if(r){const{sdfTexture:a,blockBounds:o}=r;c.uTroikaSDFTexture.value=a,c.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),c.uTroikaSDFGlyphSize.value=r.sdfGlyphSize,c.uTroikaSDFExponent.value=r.sdfExponent,c.uTroikaTotalBounds.value.fromArray(o),c.uTroikaUseGlyphColors.value=!u&&!!r.glyphColors;let i=0,s=0,f=0,d,h,p,g=0,v=0;if(u){let{outlineWidth:k,outlineOffsetX:T,outlineOffsetY:b,outlineBlur:C,outlineOpacity:M}=this;i=this._parsePercent(k)||0,s=Math.max(0,this._parsePercent(C)||0),d=M,g=this._parsePercent(T)||0,v=this._parsePercent(b)||0}else f=Math.max(0,this._parsePercent(this.strokeWidth)||0),f&&(p=this.strokeColor,c.uTroikaStrokeColor.value.set(p??go),h=this.strokeOpacity,h==null&&(h=1)),d=this.fillOpacity;c.uTroikaEdgeOffset.value=i,c.uTroikaPositionOffset.value.set(g,v),c.uTroikaBlurRadius.value=s,c.uTroikaStrokeWidth.value=f,c.uTroikaStrokeOpacity.value=h,c.uTroikaFillOpacity.value=d??1,c.uTroikaCurveRadius.value=this.curveRadius||0;let _=this.clipRect;if(_&&Array.isArray(_)&&_.length===4)c.uTroikaClipRect.value.fromArray(_);else{const k=(this.fontSize||.1)*100;c.uTroikaClipRect.value.set(o[0]-k,o[1]-k,o[2]+k,o[3]+k)}this.geometry.applyClipRect(c.uTroikaClipRect.value)}c.uTroikaSDFDebug.value=!!this.debugSDF,t.polygonOffset=!!this.depthOffset,t.polygonOffsetFactor=t.polygonOffsetUnits=this.depthOffset||0;const e=u?this.outlineColor||0:this.color;if(e==null)delete t.color;else{const a=t.hasOwnProperty("color")?t.color:t.color=new ir;(e!==a._input||typeof e=="object")&&a.set(a._input=e)}let n=this.orientation||Bt;if(n!==t._orientation){let a=c.uTroikaOrient.value;n=n.replace(/[^-+xyz]/g,"");let o=n!==Bt&&n.match(/^([-+])([xyz])([-+])([xyz])$/);if(o){let[,i,s,f,d]=o;lt.set(0,0,0)[s]=i==="-"?1:-1,It.set(0,0,0)[d]=f==="-"?-1:1,yo.lookAt($i,lt.cross(It),It),a.setFromMatrix4(yo)}else a.identity();t._orientation=n}}_parsePercent(t){if(typeof t=="string"){let u=t.match(/^(-?[\d.]+)%$/),c=u?parseFloat(u[1]):NaN;t=(isNaN(c)?0:c/100)*this.fontSize}return t}localPositionToTextCoords(t,u=new er){u.copy(t);const c=this.curveRadius;return c&&(u.x=Math.atan2(t.x,Math.abs(c)-Math.abs(t.z))*Math.abs(c)),u}worldPositionToTextCoords(t,u=new er){return lt.copy(t),this.localPositionToTextCoords(this.worldToLocal(lt),u)}raycast(t,u){const{textRenderInfo:c,curveRadius:r}=this;if(c){const e=c.blockBounds,n=r?Io():Ro(),a=n.geometry,{position:o,uv:i}=a.attributes;for(let s=0;s<i.count;s++){let f=e[0]+i.getX(s)*(e[2]-e[0]);const d=e[1]+i.getY(s)*(e[3]-e[1]);let h=0;r&&(h=r-Math.cos(f/r)*r,f=Math.sin(f/r)*r),o.setXYZ(s,f,d,h)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,n.matrixWorld=this.matrixWorld,n.material.side=this.material.side,zr.length=0,n.raycast(t,zr);for(let s=0;s<zr.length;s++)zr[s].object=this,u.push(zr[s])}}copy(t){const u=this.geometry;return super.copy(t),this.geometry=u,ts.forEach(c=>{this[c]=t[c]}),this}clone(){return new this.constructor().copy(this)}};Bo.forEach(l=>{const t="_private_"+l;Object.defineProperty(Oo.prototype,l,{get(){return this[t]},set(u){u!==this[t]&&(this[t]=u,this._needsSync=!0)}})});new xo;new ir;const Lo=Y.forwardRef(({sdfGlyphSize:l=64,anchorX:t="center",anchorY:u="middle",font:c,fontSize:r=1,children:e,characters:n,onSync:a,...o},i)=>{const s=Ye(({invalidate:p})=>p),[f]=Y.useState(()=>new Oo),[d,h]=Y.useMemo(()=>{const p=[];let g="";return Y.Children.forEach(e,v=>{typeof v=="string"||typeof v=="number"?g+=v:p.push(v)}),[p,g]},[e]);return Ca(()=>new Promise(p=>zi({font:c,characters:n},p)),["troika-text",c,n]),Y.useLayoutEffect(()=>void f.sync(()=>{s(),a&&a(f)})),Y.useEffect(()=>()=>f.dispose(),[f]),Y.createElement("primitive",$e({object:f,ref:i,font:c,text:h,anchorX:t,anchorY:u,fontSize:r,sdfGlyphSize:l},o),d)}),ns=()=>parseInt(ga.replace(/\D+/g,"")),os=ns(),wo=ko({color:new ir("white"),scale:new er(1,1),imageBounds:new er(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`,`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${os>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`),Go=Y.forwardRef(({children:l,color:t,segments:u=1,scale:c=1,zoom:r=1,grayscale:e=0,opacity:n=1,radius:a=0,texture:o,toneMapped:i,transparent:s,side:f,...d},h)=>{So({ImageMaterial:wo});const p=Y.useRef(null),g=Ye(T=>T.size),v=Array.isArray(c)?[c[0],c[1]]:[c,c],_=[o.image.width,o.image.height],k=Math.max(g.width,g.height);return Y.useImperativeHandle(h,()=>p.current,[]),Y.useLayoutEffect(()=>{p.current.geometry.parameters&&p.current.material.scale.set(v[0]*p.current.geometry.parameters.width,v[1]*p.current.geometry.parameters.height)},[v[0],v[1]]),Y.createElement("mesh",$e({ref:p,scale:Array.isArray(c)?[...c,1]:c},d),Y.createElement("planeGeometry",{args:[1,1,u,u]}),Y.createElement("imageMaterial",{color:t,map:o,zoom:r,grayscale:e,opacity:n,scale:v,imageBounds:_,resolution:k,radius:a,toneMapped:i,transparent:s,side:f,key:wo.key}),l)}),as=Y.forwardRef(({url:l,...t},u)=>{const c=Ea(l);return Y.createElement(Go,$e({},t,{texture:c,ref:u}))}),is=Y.forwardRef(({url:l,...t},u)=>Y.createElement(Go,$e({},t,{ref:u}))),Wr=Y.forwardRef((l,t)=>{if(l.url)return Y.createElement(as,$e({},l,{ref:t}));if(l.texture)return Y.createElement(is,$e({},l,{ref:t}));throw new Error("<Image /> requires a url or texture")}),ss=ko({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class ls extends xa{constructor(t=6,u=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new ir("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=c=>{c.uniforms={...c.uniforms,...this.uniforms},this.anisotropy>0&&(c.defines.USE_ANISOTROPY=""),u?c.defines.USE_SAMPLER="":c.defines.USE_TRANSMISSION="",c.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+c.fragmentShader,c.fragmentShader=c.fragmentShader.replace("#include <transmission_pars_fragment>",`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),c.fragmentShader=c.fragmentShader.replace("#include <transmission_fragment>",`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${t}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${t}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${t})) , material.thickness + thickness_smear * (i + randomCoords) / float(${t}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${t})), material.thickness + thickness_smear * (i + randomCoords) / float(${t}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${t}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`)},Object.keys(this.uniforms).forEach(c=>Object.defineProperty(this,c,{get:()=>this.uniforms[c].value,set:r=>this.uniforms[c].value=r}))}}const cs=Y.forwardRef(({buffer:l,transmissionSampler:t=!1,backside:u=!1,side:c=wa,transmission:r=1,thickness:e=0,backsideThickness:n=0,backsideEnvMapIntensity:a=1,samples:o=10,resolution:i,backsideResolution:s,background:f,anisotropy:d,anisotropicBlur:h,...p},g)=>{So({MeshTransmissionMaterial:ls});const v=Y.useRef(null),[_]=Y.useState(()=>new ss),k=Ot(s||i),T=Ot(i);let b,C,M,w;return hr(x=>{if(v.current.time=x.clock.elapsedTime,v.current.buffer===T.texture&&!t){var R;w=(R=v.current.__r3f.parent)==null?void 0:R.object,w&&(M=x.gl.toneMapping,b=x.scene.background,C=v.current.envMapIntensity,x.gl.toneMapping=ya,f&&(x.scene.background=f),w.material=_,u&&(x.gl.setRenderTarget(k),x.gl.render(x.scene,x.camera),w.material=v.current,w.material.buffer=k.texture,w.material.thickness=n,w.material.side=ba,w.material.envMapIntensity=a),x.gl.setRenderTarget(T),x.gl.render(x.scene,x.camera),w.material=v.current,w.material.thickness=e,w.material.side=c,w.material.buffer=T.texture,w.material.envMapIntensity=C,x.scene.background=b,x.gl.setRenderTarget(null),x.gl.toneMapping=M)}}),Y.useImperativeHandle(g,()=>v.current,[]),Y.createElement("meshTransmissionMaterial",$e({args:[o,t],ref:v},p,{buffer:l||T.texture,_transmission:r,anisotropicBlur:h??d,transmission:t?r:0,thickness:e,side:c}))});function us({all:l,scene:t,camera:u}){const c=Ye(({gl:n})=>n),r=Ye(({camera:n})=>n),e=Ye(({scene:n})=>n);return Y.useLayoutEffect(()=>{const n=[];l&&(t||e).traverse(i=>{i.visible===!1&&(n.push(i),i.visible=!0)}),c.compile(t||e,u||r);const a=new Sa(128);new ka(.01,1e5,a).update(c,t||e),a.dispose(),n.forEach(i=>i.visible=!1)},[]),null}const fs=`/* eslint-disable react/no-unknown-property */\r
import * as THREE from 'three';\r
import { useRef, useState, useEffect, memo } from 'react';\r
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';\r
import {\r
  useFBO,\r
  useGLTF,\r
  useScroll,\r
  Image,\r
  Scroll,\r
  Preload,\r
  ScrollControls,\r
  MeshTransmissionMaterial,\r
  Text\r
} from '@react-three/drei';\r
import { easing } from 'maath';\r
\r
export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }) {\r
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;\r
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;\r
\r
  const {\r
    navItems = [\r
      { label: 'Home', link: '' },\r
      { label: 'About', link: '' },\r
      { label: 'Contact', link: '' }\r
    ],\r
    ...modeProps\r
  } = rawOverrides;\r
\r
  return (\r
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>\r
      <ScrollControls damping={0.2} pages={3} distance={0.4}>\r
        {mode === 'bar' && <NavItems items={navItems} />}\r
        <Wrapper modeProps={modeProps}>\r
          <Scroll>\r
            <Typography />\r
            <Images />\r
          </Scroll>\r
          <Scroll html />\r
          <Preload />\r
        </Wrapper>\r
      </ScrollControls>\r
    </Canvas>\r
  );\r
}\r
\r
const ModeWrapper = memo(function ModeWrapper({\r
  children,\r
  glb,\r
  geometryKey,\r
  lockToBottom = false,\r
  followPointer = true,\r
  modeProps = {},\r
  ...props\r
}) {\r
  const ref = useRef();\r
  const { nodes } = useGLTF(glb);\r
  const buffer = useFBO();\r
  const { viewport: vp } = useThree();\r
  const [scene] = useState(() => new THREE.Scene());\r
  const geoWidthRef = useRef(1);\r
\r
  useEffect(() => {\r
    const geo = nodes[geometryKey]?.geometry;\r
    geo.computeBoundingBox();\r
    geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;\r
  }, [nodes, geometryKey]);\r
\r
  useFrame((state, delta) => {\r
    const { gl, viewport, pointer, camera } = state;\r
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);\r
\r
    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;\r
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;\r
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);\r
\r
    if (modeProps.scale == null) {\r
      const maxWorld = v.width * 0.9;\r
      const desired = maxWorld / geoWidthRef.current;\r
      ref.current.scale.setScalar(Math.min(0.15, desired));\r
    }\r
\r
    gl.setRenderTarget(buffer);\r
    gl.render(scene, camera);\r
    gl.setRenderTarget(null);\r
\r
    // Background Color\r
    gl.setClearColor(0x5227ff, 1);\r
  });\r
\r
  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;\r
\r
  return (\r
    <>\r
      {createPortal(children, scene)}\r
      <mesh scale={[vp.width, vp.height, 1]}>\r
        <planeGeometry />\r
        <meshBasicMaterial map={buffer.texture} transparent />\r
      </mesh>\r
      <mesh ref={ref} scale={scale ?? 0.15} rotation-x={Math.PI / 2} geometry={nodes[geometryKey]?.geometry} {...props}>\r
        <MeshTransmissionMaterial\r
          buffer={buffer.texture}\r
          ior={ior ?? 1.15}\r
          thickness={thickness ?? 5}\r
          anisotropy={anisotropy ?? 0.01}\r
          chromaticAberration={chromaticAberration ?? 0.1}\r
          {...extraMat}\r
        />\r
      </mesh>\r
    </>\r
  );\r
});\r
\r
function Lens({ modeProps, ...p }) {\r
  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;\r
}\r
\r
function Cube({ modeProps, ...p }) {\r
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;\r
}\r
\r
function Bar({ modeProps = {}, ...p }) {\r
  const defaultMat = {\r
    transmission: 1,\r
    roughness: 0,\r
    thickness: 10,\r
    ior: 1.15,\r
    color: '#ffffff',\r
    attenuationColor: '#ffffff',\r
    attenuationDistance: 0.25\r
  };\r
\r
  return (\r
    <ModeWrapper\r
      glb="/assets/3d/bar.glb"\r
      geometryKey="Cube"\r
      lockToBottom\r
      followPointer={false}\r
      modeProps={{ ...defaultMat, ...modeProps }}\r
      {...p}\r
    />\r
  );\r
}\r
\r
function NavItems({ items }) {\r
  const group = useRef();\r
  const { viewport, camera } = useThree();\r
\r
  const DEVICE = {\r
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },\r
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.035 },\r
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.035 }\r
  };\r
  const getDevice = () => {\r
    const w = window.innerWidth;\r
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';\r
  };\r
\r
  const [device, setDevice] = useState(getDevice());\r
\r
  useEffect(() => {\r
    const onResize = () => setDevice(getDevice());\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  const { spacing, fontSize } = DEVICE[device];\r
\r
  useFrame(() => {\r
    if (!group.current) return;\r
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);\r
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);\r
\r
    group.current.children.forEach((child, i) => {\r
      child.position.x = (i - (items.length - 1) / 2) * spacing;\r
    });\r
  });\r
\r
  const handleNavigate = link => {\r
    if (!link) return;\r
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);\r
  };\r
\r
  return (\r
    <group ref={group} renderOrder={10}>\r
      {items.map(({ label, link }) => (\r
        <Text\r
          key={label}\r
          fontSize={fontSize}\r
          color="white"\r
          anchorX="center"\r
          anchorY="middle"\r
          depthWrite={false}\r
          outlineWidth={0}\r
          outlineBlur="20%"\r
          outlineColor="#000"\r
          outlineOpacity={0.5}\r
          depthTest={false}\r
          renderOrder={10}\r
          onClick={e => {\r
            e.stopPropagation();\r
            handleNavigate(link);\r
          }}\r
          onPointerOver={() => (document.body.style.cursor = 'pointer')}\r
          onPointerOut={() => (document.body.style.cursor = 'auto')}\r
        >\r
          {label}\r
        </Text>\r
      ))}\r
    </group>\r
  );\r
}\r
\r
function Images() {\r
  const group = useRef();\r
  const data = useScroll();\r
  const { height } = useThree(s => s.viewport);\r
\r
  useFrame(() => {\r
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;\r
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;\r
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
  });\r
\r
  return (\r
    <group ref={group}>\r
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1, 1]} url="/assets/demo/cs1.webp" />\r
      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />\r
      <Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url="/assets/demo/cs3.webp" />\r
      <Image position={[-0.6, -height, 9]} scale={[1, 2, 1]} url="/assets/demo/cs1.webp" />\r
      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/assets/demo/cs2.webp" />\r
    </group>\r
  );\r
}\r
\r
function Typography() {\r
  const DEVICE = {\r
    mobile: { fontSize: 0.2 },\r
    tablet: { fontSize: 0.4 },\r
    desktop: { fontSize: 0.6 }\r
  };\r
  const getDevice = () => {\r
    const w = window.innerWidth;\r
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';\r
  };\r
\r
  const [device, setDevice] = useState(getDevice());\r
\r
  useEffect(() => {\r
    const onResize = () => setDevice(getDevice());\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  const { fontSize } = DEVICE[device];\r
\r
  return (\r
    <Text\r
      position={[0, 0, 12]}\r
      fontSize={fontSize}\r
      letterSpacing={-0.05}\r
      outlineWidth={0}\r
      outlineBlur="20%"\r
      outlineColor="#000"\r
      outlineOpacity={0.5}\r
      color="white"\r
      anchorX="center"\r
      anchorY="middle"\r
    >\r
      React Bits\r
    </Text>\r
  );\r
}\r
`,ds=`/* eslint-disable react/no-unknown-property */\r
import * as THREE from 'three';\r
import { useRef, useState, useEffect, memo } from 'react';\r
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';\r
import {\r
  useFBO,\r
  useGLTF,\r
  useScroll,\r
  Image,\r
  Scroll,\r
  Preload,\r
  ScrollControls,\r
  MeshTransmissionMaterial,\r
  Text\r
} from '@react-three/drei';\r
import { easing } from 'maath';\r
\r
export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }) {\r
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;\r
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;\r
\r
  const {\r
    navItems = [\r
      { label: 'Home', link: '' },\r
      { label: 'About', link: '' },\r
      { label: 'Contact', link: '' }\r
    ],\r
    ...modeProps\r
  } = rawOverrides;\r
\r
  return (\r
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>\r
      <ScrollControls damping={0.2} pages={3} distance={0.4}>\r
        {mode === 'bar' && <NavItems items={navItems} />}\r
        <Wrapper modeProps={modeProps}>\r
          <Scroll>\r
            <Typography />\r
            <Images />\r
          </Scroll>\r
          <Scroll html />\r
          <Preload />\r
        </Wrapper>\r
      </ScrollControls>\r
    </Canvas>\r
  );\r
}\r
\r
const ModeWrapper = memo(function ModeWrapper({\r
  children,\r
  glb,\r
  geometryKey,\r
  lockToBottom = false,\r
  followPointer = true,\r
  modeProps = {},\r
  ...props\r
}) {\r
  const ref = useRef();\r
  const { nodes } = useGLTF(glb);\r
  const buffer = useFBO();\r
  const { viewport: vp } = useThree();\r
  const [scene] = useState(() => new THREE.Scene());\r
  const geoWidthRef = useRef(1);\r
\r
  useEffect(() => {\r
    const geo = nodes[geometryKey]?.geometry;\r
    geo.computeBoundingBox();\r
    geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;\r
  }, [nodes, geometryKey]);\r
\r
  useFrame((state, delta) => {\r
    const { gl, viewport, pointer, camera } = state;\r
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);\r
\r
    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;\r
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;\r
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);\r
\r
    if (modeProps.scale == null) {\r
      const maxWorld = v.width * 0.9;\r
      const desired = maxWorld / geoWidthRef.current;\r
      ref.current.scale.setScalar(Math.min(0.15, desired));\r
    }\r
\r
    gl.setRenderTarget(buffer);\r
    gl.render(scene, camera);\r
    gl.setRenderTarget(null);\r
\r
    // Background Color\r
    gl.setClearColor(0x5227ff, 1);\r
  });\r
\r
  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;\r
\r
  return (\r
    <>\r
      {createPortal(children, scene)}\r
      <mesh scale={[vp.width, vp.height, 1]}>\r
        <planeGeometry />\r
        <meshBasicMaterial map={buffer.texture} transparent />\r
      </mesh>\r
      <mesh ref={ref} scale={scale ?? 0.15} rotation-x={Math.PI / 2} geometry={nodes[geometryKey]?.geometry} {...props}>\r
        <MeshTransmissionMaterial\r
          buffer={buffer.texture}\r
          ior={ior ?? 1.15}\r
          thickness={thickness ?? 5}\r
          anisotropy={anisotropy ?? 0.01}\r
          chromaticAberration={chromaticAberration ?? 0.1}\r
          {...extraMat}\r
        />\r
      </mesh>\r
    </>\r
  );\r
});\r
\r
function Lens({ modeProps, ...p }) {\r
  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;\r
}\r
\r
function Cube({ modeProps, ...p }) {\r
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;\r
}\r
\r
function Bar({ modeProps = {}, ...p }) {\r
  const defaultMat = {\r
    transmission: 1,\r
    roughness: 0,\r
    thickness: 10,\r
    ior: 1.15,\r
    color: '#ffffff',\r
    attenuationColor: '#ffffff',\r
    attenuationDistance: 0.25\r
  };\r
\r
  return (\r
    <ModeWrapper\r
      glb="/assets/3d/bar.glb"\r
      geometryKey="Cube"\r
      lockToBottom\r
      followPointer={false}\r
      modeProps={{ ...defaultMat, ...modeProps }}\r
      {...p}\r
    />\r
  );\r
}\r
\r
function NavItems({ items }) {\r
  const group = useRef();\r
  const { viewport, camera } = useThree();\r
\r
  const DEVICE = {\r
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },\r
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },\r
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 }\r
  };\r
  const getDevice = () => {\r
    const w = window.innerWidth;\r
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';\r
  };\r
\r
  const [device, setDevice] = useState(getDevice());\r
\r
  useEffect(() => {\r
    const onResize = () => setDevice(getDevice());\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  const { spacing, fontSize } = DEVICE[device];\r
\r
  useFrame(() => {\r
    if (!group.current) return;\r
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);\r
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);\r
\r
    group.current.children.forEach((child, i) => {\r
      child.position.x = (i - (items.length - 1) / 2) * spacing;\r
    });\r
  });\r
\r
  const handleNavigate = link => {\r
    if (!link) return;\r
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);\r
  };\r
\r
  return (\r
    <group ref={group} renderOrder={10}>\r
      {items.map(({ label, link }) => (\r
        <Text\r
          key={label}\r
          fontSize={fontSize}\r
          color="white"\r
          anchorX="center"\r
          anchorY="middle"\r
          depthWrite={false}\r
          outlineWidth={0}\r
          outlineBlur="20%"\r
          outlineColor="#000"\r
          outlineOpacity={0.5}\r
          depthTest={false}\r
          renderOrder={10}\r
          onClick={e => {\r
            e.stopPropagation();\r
            handleNavigate(link);\r
          }}\r
          onPointerOver={() => (document.body.style.cursor = 'pointer')}\r
          onPointerOut={() => (document.body.style.cursor = 'auto')}\r
        >\r
          {label}\r
        </Text>\r
      ))}\r
    </group>\r
  );\r
}\r
\r
function Images() {\r
  const group = useRef();\r
  const data = useScroll();\r
  const { height } = useThree(s => s.viewport);\r
\r
  useFrame(() => {\r
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;\r
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;\r
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
  });\r
\r
  return (\r
    <group ref={group}>\r
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1, 1]} url="/assets/demo/cs1.webp" />\r
      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />\r
      <Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url="/assets/demo/cs3.webp" />\r
      <Image position={[-0.6, -height, 9]} scale={[1, 2, 1]} url="/assets/demo/cs1.webp" />\r
      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/assets/demo/cs2.webp" />\r
    </group>\r
  );\r
}\r
\r
function Typography() {\r
  const DEVICE = {\r
    mobile: { fontSize: 0.2 },\r
    tablet: { fontSize: 0.4 },\r
    desktop: { fontSize: 0.6 }\r
  };\r
  const getDevice = () => {\r
    const w = window.innerWidth;\r
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';\r
  };\r
\r
  const [device, setDevice] = useState(getDevice());\r
\r
  useEffect(() => {\r
    const onResize = () => setDevice(getDevice());\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
\r
  const { fontSize } = DEVICE[device];\r
\r
  return (\r
    <Text\r
      position={[0, 0, 12]}\r
      fontSize={fontSize}\r
      letterSpacing={-0.05}\r
      outlineWidth={0}\r
      outlineBlur="20%"\r
      outlineColor="#000"\r
      outlineOpacity={0.5}\r
      color="white"\r
      anchorX="center"\r
      anchorY="middle"\r
    >\r
      React Bits\r
    </Text>\r
  );\r
}\r
`,hs=`/* eslint-disable react/no-unknown-property */\r
import * as THREE from 'three';\r
import { useRef, useState, useEffect, memo, ReactNode } from 'react';\r
import { Canvas, createPortal, useFrame, useThree, ThreeElements } from '@react-three/fiber';\r
import {\r
  useFBO,\r
  useGLTF,\r
  useScroll,\r
  Image,\r
  Scroll,\r
  Preload,\r
  ScrollControls,\r
  MeshTransmissionMaterial,\r
  Text\r
} from '@react-three/drei';\r
import { easing } from 'maath';\r
\r
type Mode = 'lens' | 'bar' | 'cube';\r
\r
interface NavItem {\r
  label: string;\r
  link: string;\r
}\r
\r
type ModeProps = Record<string, unknown>;\r
\r
interface FluidGlassProps {\r
  mode?: Mode;\r
  lensProps?: ModeProps;\r
  barProps?: ModeProps;\r
  cubeProps?: ModeProps;\r
}\r
\r
export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }: FluidGlassProps) {\r
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;\r
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;\r
\r
  const {\r
    navItems = [\r
      { label: 'Home', link: '' },\r
      { label: 'About', link: '' },\r
      { label: 'Contact', link: '' }\r
    ],\r
    ...modeProps\r
  } = rawOverrides;\r
\r
  return (\r
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>\r
      <ScrollControls damping={0.2} pages={3} distance={0.4}>\r
        {mode === 'bar' && <NavItems items={navItems as NavItem[]} />}\r
        <Wrapper modeProps={modeProps}>\r
          <Scroll>\r
            <Typography />\r
            <Images />\r
          </Scroll>\r
          <Scroll html />\r
          <Preload />\r
        </Wrapper>\r
      </ScrollControls>\r
    </Canvas>\r
  );\r
}\r
\r
type MeshProps = ThreeElements['mesh'];\r
\r
interface ModeWrapperProps extends MeshProps {\r
  children?: ReactNode;\r
  glb: string;\r
  geometryKey: string;\r
  lockToBottom?: boolean;\r
  followPointer?: boolean;\r
  modeProps?: ModeProps;\r
}\r
\r
interface ZoomMaterial extends THREE.Material {\r
  zoom: number;\r
}\r
\r
interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> {}\r
\r
type ZoomGroup = THREE.Group & { children: ZoomMesh[] };\r
\r
const ModeWrapper = memo(function ModeWrapper({\r
  children,\r
  glb,\r
  geometryKey,\r
  lockToBottom = false,\r
  followPointer = true,\r
  modeProps = {},\r
  ...props\r
}: ModeWrapperProps) {\r
  const ref = useRef<THREE.Mesh>(null!);\r
  const { nodes } = useGLTF(glb);\r
  const buffer = useFBO();\r
  const { viewport: vp } = useThree();\r
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());\r
  const geoWidthRef = useRef<number>(1);\r
\r
  useEffect(() => {\r
    const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;\r
    geo.computeBoundingBox();\r
    geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;\r
  }, [nodes, geometryKey]);\r
\r
  useFrame((state, delta) => {\r
    const { gl, viewport, pointer, camera } = state;\r
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);\r
\r
    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;\r
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;\r
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);\r
\r
    if ((modeProps as { scale?: number }).scale == null) {\r
      const maxWorld = v.width * 0.9;\r
      const desired = maxWorld / geoWidthRef.current;\r
      ref.current.scale.setScalar(Math.min(0.15, desired));\r
    }\r
\r
    gl.setRenderTarget(buffer);\r
    gl.render(scene, camera);\r
    gl.setRenderTarget(null);\r
    gl.setClearColor(0x5227ff, 1);\r
  });\r
\r
  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps as {\r
    scale?: number;\r
    ior?: number;\r
    thickness?: number;\r
    anisotropy?: number;\r
    chromaticAberration?: number;\r
    [key: string]: unknown;\r
  };\r
\r
  return (\r
    <>\r
      {createPortal(children, scene)}\r
      <mesh scale={[vp.width, vp.height, 1]}>\r
        <planeGeometry />\r
        <meshBasicMaterial map={buffer.texture} transparent />\r
      </mesh>\r
      <mesh\r
        ref={ref}\r
        scale={scale ?? 0.15}\r
        rotation-x={Math.PI / 2}\r
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}\r
        {...props}\r
      >\r
        <MeshTransmissionMaterial\r
          buffer={buffer.texture}\r
          ior={ior ?? 1.15}\r
          thickness={thickness ?? 5}\r
          anisotropy={anisotropy ?? 0.01}\r
          chromaticAberration={chromaticAberration ?? 0.1}\r
          {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}\r
        />\r
      </mesh>\r
    </>\r
  );\r
});\r
\r
function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {\r
  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;\r
}\r
\r
function Cube({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {\r
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;\r
}\r
\r
function Bar({ modeProps = {}, ...p }: { modeProps?: ModeProps } & MeshProps) {\r
  const defaultMat = {\r
    transmission: 1,\r
    roughness: 0,\r
    thickness: 10,\r
    ior: 1.15,\r
    color: '#ffffff',\r
    attenuationColor: '#ffffff',\r
    attenuationDistance: 0.25\r
  };\r
\r
  return (\r
    <ModeWrapper\r
      glb="/assets/3d/bar.glb"\r
      geometryKey="Cube"\r
      lockToBottom\r
      followPointer={false}\r
      modeProps={{ ...defaultMat, ...modeProps }}\r
      {...p}\r
    />\r
  );\r
}\r
\r
function NavItems({ items }: { items: NavItem[] }) {\r
  const group = useRef<THREE.Group>(null!);\r
  const { viewport, camera } = useThree();\r
\r
  const DEVICE = {\r
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },\r
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },\r
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 }\r
  };\r
  const getDevice = () => {\r
    const w = window.innerWidth;\r
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';\r
  };\r
\r
  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());\r
\r
  useEffect(() => {\r
    const onResize = () => setDevice(getDevice());\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
  }, []);\r
\r
  const { spacing, fontSize } = DEVICE[device];\r
\r
  useFrame(() => {\r
    if (!group.current) return;\r
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);\r
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);\r
\r
    group.current.children.forEach((child, i) => {\r
      child.position.x = (i - (items.length - 1) / 2) * spacing;\r
    });\r
  });\r
\r
  const handleNavigate = (link: string) => {\r
    if (!link) return;\r
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);\r
  };\r
\r
  return (\r
    <group ref={group} renderOrder={10}>\r
      {items.map(({ label, link }) => (\r
        <Text\r
          key={label}\r
          fontSize={fontSize}\r
          color="white"\r
          anchorX="center"\r
          anchorY="middle"\r
          outlineWidth={0}\r
          outlineBlur="20%"\r
          outlineColor="#000"\r
          outlineOpacity={0.5}\r
          renderOrder={10}\r
          onClick={e => {\r
            e.stopPropagation();\r
            handleNavigate(link);\r
          }}\r
          onPointerOver={() => (document.body.style.cursor = 'pointer')}\r
          onPointerOut={() => (document.body.style.cursor = 'auto')}\r
        >\r
          {label}\r
        </Text>\r
      ))}\r
    </group>\r
  );\r
}\r
\r
function Images() {\r
  const group = useRef<ZoomGroup>(null!);\r
  const data = useScroll();\r
  const { height } = useThree(s => s.viewport);\r
\r
  useFrame(() => {\r
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;\r
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;\r
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
  });\r
\r
  return (\r
    <group ref={group}>\r
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1]} url="/assets/demo/cs1.webp" />\r
      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />\r
      <Image position={[-2.05, -height, 6]} scale={[1, 3]} url="/assets/demo/cs3.webp" />\r
      <Image position={[-0.6, -height, 9]} scale={[1, 2]} url="/assets/demo/cs1.webp" />\r
      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/assets/demo/cs2.webp" />\r
    </group>\r
  );\r
}\r
\r
function Typography() {\r
  const DEVICE = {\r
    mobile: { fontSize: 0.2 },\r
    tablet: { fontSize: 0.4 },\r
    desktop: { fontSize: 0.6 }\r
  };\r
  const getDevice = () => {\r
    const w = window.innerWidth;\r
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';\r
  };\r
\r
  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());\r
\r
  useEffect(() => {\r
    const onResize = () => setDevice(getDevice());\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
  }, []);\r
\r
  const { fontSize } = DEVICE[device];\r
\r
  return (\r
    <Text\r
      position={[0, 0, 12]}\r
      fontSize={fontSize}\r
      letterSpacing={-0.05}\r
      outlineWidth={0}\r
      outlineBlur="20%"\r
      outlineColor="#000"\r
      outlineOpacity={0.5}\r
      color="white"\r
      anchorX="center"\r
      anchorY="middle"\r
    >\r
      React Bits\r
    </Text>\r
  );\r
}\r
`,ps=`/* eslint-disable react/no-unknown-property */\r
import * as THREE from 'three';\r
import { useRef, useState, useEffect, memo, ReactNode } from 'react';\r
import { Canvas, createPortal, useFrame, useThree, ThreeElements } from '@react-three/fiber';\r
import {\r
  useFBO,\r
  useGLTF,\r
  useScroll,\r
  Image,\r
  Scroll,\r
  Preload,\r
  ScrollControls,\r
  MeshTransmissionMaterial,\r
  Text\r
} from '@react-three/drei';\r
import { easing } from 'maath';\r
\r
type Mode = 'lens' | 'bar' | 'cube';\r
\r
interface NavItem {\r
  label: string;\r
  link: string;\r
}\r
\r
type ModeProps = Record<string, unknown>;\r
\r
interface FluidGlassProps {\r
  mode?: Mode;\r
  lensProps?: ModeProps;\r
  barProps?: ModeProps;\r
  cubeProps?: ModeProps;\r
}\r
\r
export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }: FluidGlassProps) {\r
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;\r
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;\r
\r
  const {\r
    navItems = [\r
      { label: 'Home', link: '' },\r
      { label: 'About', link: '' },\r
      { label: 'Contact', link: '' }\r
    ],\r
    ...modeProps\r
  } = rawOverrides;\r
\r
  return (\r
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>\r
      <ScrollControls damping={0.2} pages={3} distance={0.4}>\r
        {mode === 'bar' && <NavItems items={navItems as NavItem[]} />}\r
        <Wrapper modeProps={modeProps}>\r
          <Scroll>\r
            <Typography />\r
            <Images />\r
          </Scroll>\r
          <Scroll html />\r
          <Preload />\r
        </Wrapper>\r
      </ScrollControls>\r
    </Canvas>\r
  );\r
}\r
\r
type MeshProps = ThreeElements['mesh'];\r
\r
interface ModeWrapperProps extends MeshProps {\r
  children?: ReactNode;\r
  glb: string;\r
  geometryKey: string;\r
  lockToBottom?: boolean;\r
  followPointer?: boolean;\r
  modeProps?: ModeProps;\r
}\r
\r
interface ZoomMaterial extends THREE.Material {\r
  zoom: number;\r
}\r
\r
interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> {}\r
\r
type ZoomGroup = THREE.Group & { children: ZoomMesh[] };\r
\r
const ModeWrapper = memo(function ModeWrapper({\r
  children,\r
  glb,\r
  geometryKey,\r
  lockToBottom = false,\r
  followPointer = true,\r
  modeProps = {},\r
  ...props\r
}: ModeWrapperProps) {\r
  const ref = useRef<THREE.Mesh>(null!);\r
  const { nodes } = useGLTF(glb);\r
  const buffer = useFBO();\r
  const { viewport: vp } = useThree();\r
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());\r
  const geoWidthRef = useRef<number>(1);\r
\r
  useEffect(() => {\r
    const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;\r
    geo.computeBoundingBox();\r
    geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;\r
  }, [nodes, geometryKey]);\r
\r
  useFrame((state, delta) => {\r
    const { gl, viewport, pointer, camera } = state;\r
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);\r
\r
    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;\r
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;\r
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);\r
\r
    if ((modeProps as { scale?: number }).scale == null) {\r
      const maxWorld = v.width * 0.9;\r
      const desired = maxWorld / geoWidthRef.current;\r
      ref.current.scale.setScalar(Math.min(0.15, desired));\r
    }\r
\r
    gl.setRenderTarget(buffer);\r
    gl.render(scene, camera);\r
    gl.setRenderTarget(null);\r
    gl.setClearColor(0x5227ff, 1);\r
  });\r
\r
  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps as {\r
    scale?: number;\r
    ior?: number;\r
    thickness?: number;\r
    anisotropy?: number;\r
    chromaticAberration?: number;\r
    [key: string]: unknown;\r
  };\r
\r
  return (\r
    <>\r
      {createPortal(children, scene)}\r
      <mesh scale={[vp.width, vp.height, 1]}>\r
        <planeGeometry />\r
        <meshBasicMaterial map={buffer.texture} transparent />\r
      </mesh>\r
      <mesh\r
        ref={ref}\r
        scale={scale ?? 0.15}\r
        rotation-x={Math.PI / 2}\r
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}\r
        {...props}\r
      >\r
        <MeshTransmissionMaterial\r
          buffer={buffer.texture}\r
          ior={ior ?? 1.15}\r
          thickness={thickness ?? 5}\r
          anisotropy={anisotropy ?? 0.01}\r
          chromaticAberration={chromaticAberration ?? 0.1}\r
          {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}\r
        />\r
      </mesh>\r
    </>\r
  );\r
});\r
\r
function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {\r
  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;\r
}\r
\r
function Cube({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {\r
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;\r
}\r
\r
function Bar({ modeProps = {}, ...p }: { modeProps?: ModeProps } & MeshProps) {\r
  const defaultMat = {\r
    transmission: 1,\r
    roughness: 0,\r
    thickness: 10,\r
    ior: 1.15,\r
    color: '#ffffff',\r
    attenuationColor: '#ffffff',\r
    attenuationDistance: 0.25\r
  };\r
\r
  return (\r
    <ModeWrapper\r
      glb="/assets/3d/bar.glb"\r
      geometryKey="Cube"\r
      lockToBottom\r
      followPointer={false}\r
      modeProps={{ ...defaultMat, ...modeProps }}\r
      {...p}\r
    />\r
  );\r
}\r
\r
function NavItems({ items }: { items: NavItem[] }) {\r
  const group = useRef<THREE.Group>(null!);\r
  const { viewport, camera } = useThree();\r
\r
  const DEVICE = {\r
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },\r
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },\r
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 }\r
  };\r
  const getDevice = () => {\r
    const w = window.innerWidth;\r
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';\r
  };\r
\r
  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());\r
\r
  useEffect(() => {\r
    const onResize = () => setDevice(getDevice());\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
  }, []);\r
\r
  const { spacing, fontSize } = DEVICE[device];\r
\r
  useFrame(() => {\r
    if (!group.current) return;\r
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);\r
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);\r
\r
    group.current.children.forEach((child, i) => {\r
      child.position.x = (i - (items.length - 1) / 2) * spacing;\r
    });\r
  });\r
\r
  const handleNavigate = (link: string) => {\r
    if (!link) return;\r
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);\r
  };\r
\r
  return (\r
    <group ref={group} renderOrder={10}>\r
      {items.map(({ label, link }) => (\r
        <Text\r
          key={label}\r
          fontSize={fontSize}\r
          color="white"\r
          anchorX="center"\r
          anchorY="middle"\r
          outlineWidth={0}\r
          outlineBlur="20%"\r
          outlineColor="#000"\r
          outlineOpacity={0.5}\r
          renderOrder={10}\r
          onClick={e => {\r
            e.stopPropagation();\r
            handleNavigate(link);\r
          }}\r
          onPointerOver={() => (document.body.style.cursor = 'pointer')}\r
          onPointerOut={() => (document.body.style.cursor = 'auto')}\r
        >\r
          {label}\r
        </Text>\r
      ))}\r
    </group>\r
  );\r
}\r
\r
function Images() {\r
  const group = useRef<ZoomGroup>(null!);\r
  const data = useScroll();\r
  const { height } = useThree(s => s.viewport);\r
\r
  useFrame(() => {\r
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;\r
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;\r
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;\r
  });\r
\r
  return (\r
    <group ref={group}>\r
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1]} url="/assets/demo/cs1.webp" />\r
      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />\r
      <Image position={[-2.05, -height, 6]} scale={[1, 3]} url="/assets/demo/cs3.webp" />\r
      <Image position={[-0.6, -height, 9]} scale={[1, 2]} url="/assets/demo/cs1.webp" />\r
      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/assets/demo/cs2.webp" />\r
    </group>\r
  );\r
}\r
\r
function Typography() {\r
  const DEVICE = {\r
    mobile: { fontSize: 0.2 },\r
    tablet: { fontSize: 0.4 },\r
    desktop: { fontSize: 0.6 }\r
  };\r
  const getDevice = () => {\r
    const w = window.innerWidth;\r
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';\r
  };\r
\r
  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());\r
\r
  useEffect(() => {\r
    const onResize = () => setDevice(getDevice());\r
    window.addEventListener('resize', onResize);\r
    return () => window.removeEventListener('resize', onResize);\r
  }, []);\r
\r
  const { fontSize } = DEVICE[device];\r
\r
  return (\r
    <Text\r
      position={[0, 0, 12]}\r
      fontSize={fontSize}\r
      letterSpacing={-0.05}\r
      outlineWidth={0}\r
      outlineBlur="20%"\r
      outlineColor="#000"\r
      outlineOpacity={0.5}\r
      color="white"\r
      anchorX="center"\r
      anchorY="middle"\r
    >\r
      React Bits\r
    </Text>\r
  );\r
}\r
`,ms={dependencies:"three @react-three/fiber @react-three/drei maath",usage:`// IMPORTANT INFO BELOW
// This component requires a 3D model to function correctly.
// You can find three example models in the 'public/assets/3d' directory of the repository:
// - 'lens.glb'
// - 'bar.glb'
// - 'cube.glb'
// Make sure to place these models in the correct directory or update the paths accordingly.

import FluidGlass from './FluidGlass'

<div style={{ height: '600px', position: 'relative' }}>
  <FluidGlass 
    mode="lens" // or "bar", "cube"
    lensProps={{
      scale: 0.25,
      ior: 1.15,
      thickness: 5,
      chromaticAberration: 0.1,
      anisotropy: 0.01  
    }}
    barProps={} // add specific props if using bar mode
    cubeProps={} // add specific props if using cube mode
  />
</div>`,code:fs,tailwind:ds,tsCode:hs,tsTailwind:ps};function vs({mode:l="lens",lensProps:t={},barProps:u={},cubeProps:c={}}){const r=l==="bar"?bs:l==="cube"?ys:gs,e=l==="bar"?u:l==="cube"?c:t,{navItems:n=[{label:"Home",link:""},{label:"About",link:""},{label:"Contact",link:""}],...a}=e;return de.jsx(_a,{camera:{position:[0,0,20],fov:15},gl:{alpha:!0},children:de.jsxs(ai,{damping:.2,pages:3,distance:.4,children:[l==="bar"&&de.jsx(ws,{items:n}),de.jsxs(r,{modeProps:a,children:[de.jsxs(oo,{children:[de.jsx(Ss,{}),de.jsx(xs,{})]}),de.jsx(oo,{html:!0}),de.jsx(us,{})]})]})})}const Qt=Y.memo(function({children:t,glb:u,geometryKey:c,lockToBottom:r=!1,followPointer:e=!0,modeProps:n={},...a}){var b;const o=Y.useRef(),{nodes:i}=Ua(u),s=Ot(),{viewport:f}=Ye(),[d]=Y.useState(()=>new Ta),h=Y.useRef(1);Y.useEffect(()=>{var M;const C=(M=i[c])==null?void 0:M.geometry;C.computeBoundingBox(),h.current=C.boundingBox.max.x-C.boundingBox.min.x||1},[i,c]),hr((C,M)=>{const{gl:w,viewport:x,pointer:R,camera:P}=C,j=x.getCurrentViewport(P,[0,0,15]),y=e?R.x*j.width/2:0,F=r?-j.height/2+.2:e?R.y*j.height/2:0;if(zt.damp3(o.current.position,[y,F,15],.15,M),n.scale==null){const V=j.width*.9/h.current;o.current.scale.setScalar(Math.min(.15,V))}w.setRenderTarget(s),w.render(d,P),w.setRenderTarget(null),w.setClearColor(5384191,1)});const{scale:p,ior:g,thickness:v,anisotropy:_,chromaticAberration:k,...T}=n;return de.jsxs(de.Fragment,{children:[Ma(t,d),de.jsxs("mesh",{scale:[f.width,f.height,1],children:[de.jsx("planeGeometry",{}),de.jsx("meshBasicMaterial",{map:s.texture,transparent:!0})]}),de.jsx("mesh",{ref:o,scale:p??.15,"rotation-x":Math.PI/2,geometry:(b=i[c])==null?void 0:b.geometry,...a,children:de.jsx(cs,{buffer:s.texture,ior:g??1.15,thickness:v??5,anisotropy:_??.01,chromaticAberration:k??.1,...T})})]})});function gs({modeProps:l,...t}){return de.jsx(Qt,{glb:"/assets/3d/lens.glb",geometryKey:"Cylinder",followPointer:!0,modeProps:l,...t})}function ys({modeProps:l,...t}){return de.jsx(Qt,{glb:"/assets/3d/cube.glb",geometryKey:"Cube",followPointer:!0,modeProps:l,...t})}function bs({modeProps:l={},...t}){const u={transmission:1,roughness:0,thickness:10,ior:1.15,color:"#ffffff",attenuationColor:"#ffffff",attenuationDistance:.25};return de.jsx(Qt,{glb:"/assets/3d/bar.glb",geometryKey:"Cube",lockToBottom:!0,followPointer:!1,modeProps:{...u,...l},...t})}function ws({items:l}){const t=Y.useRef(),{viewport:u,camera:c}=Ye(),r={mobile:{max:639,spacing:.2,fontSize:.035},tablet:{max:1023,spacing:.24,fontSize:.035},desktop:{max:1/0,spacing:.3,fontSize:.035}},e=()=>{const f=window.innerWidth;return f<=r.mobile.max?"mobile":f<=r.tablet.max?"tablet":"desktop"},[n,a]=Y.useState(e());Y.useEffect(()=>{const f=()=>a(e());return window.addEventListener("resize",f),()=>window.removeEventListener("resize",f)},[]);const{spacing:o,fontSize:i}=r[n];hr(()=>{if(!t.current)return;const f=u.getCurrentViewport(c,[0,0,15]);t.current.position.set(0,-f.height/2+.2,15.1),t.current.children.forEach((d,h)=>{d.position.x=(h-(l.length-1)/2)*o})});const s=f=>{f&&(f.startsWith("#")?window.location.hash=f:window.location.href=f)};return de.jsx("group",{ref:t,renderOrder:10,children:l.map(({label:f,link:d})=>de.jsx(Lo,{fontSize:i,color:"white",anchorX:"center",anchorY:"middle",depthWrite:!1,outlineWidth:0,outlineBlur:"20%",outlineColor:"#000",outlineOpacity:.5,depthTest:!1,renderOrder:10,onClick:h=>{h.stopPropagation(),s(d)},onPointerOver:()=>document.body.style.cursor="pointer",onPointerOut:()=>document.body.style.cursor="auto",children:f},f))})}function xs(){const l=Y.useRef(),t=Jt(),{height:u}=Ye(c=>c.viewport);return hr(()=>{l.current.children[0].material.zoom=1+t.range(0,1/3)/3,l.current.children[1].material.zoom=1+t.range(0,1/3)/3,l.current.children[2].material.zoom=1+t.range(1.15/3,1/3)/2,l.current.children[3].material.zoom=1+t.range(1.15/3,1/3)/2,l.current.children[4].material.zoom=1+t.range(1.15/3,1/3)/2}),de.jsxs("group",{ref:l,children:[de.jsx(Wr,{position:[-2,0,0],scale:[3,u/1.1,1],url:"/assets/demo/cs1.webp"}),de.jsx(Wr,{position:[2,0,3],scale:3,url:"/assets/demo/cs2.webp"}),de.jsx(Wr,{position:[-2.05,-u,6],scale:[1,3,1],url:"/assets/demo/cs3.webp"}),de.jsx(Wr,{position:[-.6,-u,9],scale:[1,2,1],url:"/assets/demo/cs1.webp"}),de.jsx(Wr,{position:[.75,-u,10.5],scale:1.5,url:"/assets/demo/cs2.webp"})]})}function Ss(){const l={mobile:{fontSize:.2},tablet:{fontSize:.4},desktop:{fontSize:.6}},t=()=>{const e=window.innerWidth;return e<=639?"mobile":e<=1023?"tablet":"desktop"},[u,c]=Y.useState(t());Y.useEffect(()=>{const e=()=>c(t());return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]);const{fontSize:r}=l[u];return de.jsx(Lo,{position:[0,0,12],fontSize:r,letterSpacing:-.05,outlineWidth:0,outlineBlur:"20%",outlineColor:"#000",outlineOpacity:.5,color:"white",anchorX:"center",anchorY:"middle",children:"React Bits"})}const Gs=()=>{const[l,t]=ra(),[u,c]=Y.useState("lens"),[r,e]=Y.useState(.25),[n,a]=Y.useState(1.15),[o,i]=Y.useState(2),[s,f]=Y.useState(1),[d,h]=Y.useState(0),[p,g]=Y.useState(.05),[v,_]=Y.useState(.01),k=[{value:"lens",label:"Lens"},{value:"bar",label:"Bar"},{value:"cube",label:"Cube"}],T=M=>{c(M),M==="bar"?(e(.15),f(1),h(0),i(10),a(1.15)):(M==="lens"||M==="cube")&&(e(.25),a(1.15),i(5),g(.1),_(.01)),t()},b=()=>{const M={scale:r,ior:n,thickness:o,chromaticAberration:p,anisotropy:v};return u==="bar"?{...M,transmission:s,roughness:d,color:"#ffffff",attenuationColor:"#ffffff",attenuationDistance:.25}:M},C=[{name:"mode",type:"string",default:"'lens'",description:"Display mode of the fluid glass effect. Options: 'lens', 'bar', 'cube'"},{name:"lensProps",type:"object",default:"{}",description:"Props specific to lens mode including material properties like ior, thickness, transmission"},{name:"barProps",type:"object",default:"{}",description:"Props specific to bar mode including navItems array and material properties"},{name:"cubeProps",type:"object",default:"{}",description:"Props specific to cube mode including material properties and interaction settings"}];return de.jsxs(Ko,{children:[de.jsxs(Jo,{children:[de.jsx(Yo,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:de.jsx(vs,{mode:u,lensProps:u==="lens"?b():{},barProps:u==="bar"?b():{},cubeProps:u==="cube"?b():{}},l)}),de.jsxs($o,{children:[de.jsx(ta,{title:"Mode:",options:k,value:u,onChange:T,width:120}),de.jsx(cr,{title:"Scale:",min:.05,max:.5,step:.05,value:r,onChange:e,width:150}),de.jsx(cr,{title:"IOR:",min:1,max:2,step:.05,value:n,onChange:a,width:150}),de.jsx(cr,{title:"Thickness:",min:1,max:20,step:1,value:o,onChange:i,width:150}),de.jsx(cr,{title:"Chromatic Aberration:",min:0,max:.5,step:.01,value:p,onChange:g,width:150}),de.jsx(cr,{title:"Anisotropy:",min:0,max:.1,step:.01,value:v,onChange:_,width:150}),u==="bar"&&de.jsxs(de.Fragment,{children:[de.jsx(cr,{title:"Transmission:",min:0,max:1,step:.1,value:s,onChange:f,width:150}),de.jsx(cr,{title:"Roughness:",min:0,max:1,step:.1,value:d,onChange:h,width:150})]})]}),de.jsx(Zo,{data:C}),de.jsx(ea,{dependencyList:["three","@react-three/fiber","@react-three/drei","maath"]})]}),de.jsx(Qo,{children:de.jsx(qo,{codeObject:ms})})]})};export{Gs as default};
