import{r as x,c6 as yr,_ as Et,e as We,j,B as gr,T as xr}from"./index-wsKSLPNH.js";import{T as br,P as Er,a as wr,C as Rr,b as Mr}from"./PropTable-C4uPWs8h.js";import{C as Pr}from"./Customize-1m_ZNqR9.js";import{P as St}from"./PreviewSelect-B8u33nUa.js";import{P as ze}from"./PreviewSwitch-DqnF708j.js";import{P as dt}from"./PreviewSlider-m1G_aiYP.js";import{D as Tr}from"./Dependencies-BHoMfJUj.js";import{u as Lr}from"./useForceRerender-BCFU-k0M.js";import{a as le,u as Xe,f as Sr,c as ot,C as Ar,i as we}from"./react-three-fiber.esm-Dkk-fK7P.js";import{f as G,a4 as Ir,V as ce,p as Oe,O as Ce,b4 as Ne,b5 as At,a5 as Ie,b6 as Le,b7 as Se,b8 as Dr,K as Or,g as at,b9 as Cr,an as nr,ax as jr,am as or,aB as Hr,a9 as It,c as Dt,T as Ot,ba as Qe,bb as Fr,C as he,ar as kr,a2 as K,aS as gt,aV as Ct,aM as rt,_ as ft,J as jt,b as pe,ay as _r,az as zr,aN as Br,M as nt,aL as et,aP as Zr,aT as Xr,Z as Vr,B as De,F as ue,bc as Yr,bd as Ur,a6 as Ze,aU as Gr,aZ as Wr,a$ as Nr,a_ as Kr,j as Ht,P as $r,be as Jr,a as Ft,aK as kt,aJ as Ke,aO as _t,aR as mt,x as qr,d as Qr,b2 as en,b3 as tn}from"./three.module-0PRdiASR.js";import{v as rn,d as ar,u as ir}from"./Gltf-SAcSsb_c.js";import{u as nn,E as on}from"./Environment-B0UbMoFW.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const Ve=new G,wt=new G,an=new G,zt=new ce;function sn(l,t,r){const e=Ve.setFromMatrixPosition(l.matrixWorld);e.project(t);const n=r.width/2,o=r.height/2;return[e.x*n+n,-(e.y*o)+o]}function cn(l,t){const r=Ve.setFromMatrixPosition(l.matrixWorld),e=wt.setFromMatrixPosition(t.matrixWorld),n=r.sub(e),o=t.getWorldDirection(an);return n.angleTo(o)>Math.PI/2}function ln(l,t,r,e){const n=Ve.setFromMatrixPosition(l.matrixWorld),o=n.clone();o.project(t),zt.set(o.x,o.y),r.setFromCamera(zt,t);const a=r.intersectObjects(e,!0);if(a.length){const i=a[0].distance;return n.distanceTo(r.ray.origin)<i}return!0}function un(l,t){if(t instanceof Ce)return t.zoom;if(t instanceof Oe){const r=Ve.setFromMatrixPosition(l.matrixWorld),e=wt.setFromMatrixPosition(t.matrixWorld),n=t.fov*Math.PI/180,o=r.distanceTo(e);return 1/(2*Math.tan(n/2)*o)}else return 1}function pn(l,t,r){if(t instanceof Oe||t instanceof Ce){const e=Ve.setFromMatrixPosition(l.matrixWorld),n=wt.setFromMatrixPosition(t.matrixWorld),o=e.distanceTo(n),a=(r[1]-r[0])/(t.far-t.near),i=r[1]-a*t.far;return Math.round(a*o+i)}}const xt=l=>Math.abs(l)<1e-10?0:l;function sr(l,t,r=""){let e="matrix3d(";for(let n=0;n!==16;n++)e+=xt(t[n]*l.elements[n])+(n!==15?",":")");return r+e}const dn=(l=>t=>sr(t,l))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),fn=(l=>(t,r)=>sr(t,l(r),"translate(-50%,-50%)"))(l=>[1/l,1/l,1/l,1,-1/l,-1/l,-1/l,-1,1/l,1/l,1/l,1,1,1,1,1]);function mn(l){return l&&typeof l=="object"&&"current"in l}const hn=x.forwardRef(({children:l,eps:t=.001,style:r,className:e,prepend:n,center:o,fullscreen:a,portal:i,distanceFactor:c,sprite:d=!1,transform:u=!1,occlude:s,onOcclude:f,castShadow:m,receiveShadow:v,material:y,geometry:E,zIndexRange:b=[16777271,0],calculatePosition:w=sn,as:M="div",wrapperClass:L,pointerEvents:P="auto",...h},O)=>{const{gl:Z,camera:A,scene:R,size:H,raycaster:C,events:z,viewport:I}=le(),[S]=x.useState(()=>document.createElement(M)),F=x.useRef(null),V=x.useRef(null),B=x.useRef(0),Y=x.useRef([0,0]),X=x.useRef(null),N=x.useRef(null),J=(i==null?void 0:i.current)||z.connected||Z.domElement.parentNode,Q=x.useRef(null),re=x.useRef(!1),k=x.useMemo(()=>s&&s!=="blending"||Array.isArray(s)&&s.length&&mn(s[0]),[s]);x.useLayoutEffect(()=>{const te=Z.domElement;s&&s==="blending"?(te.style.zIndex=`${Math.floor(b[0]/2)}`,te.style.position="absolute",te.style.pointerEvents="none"):(te.style.zIndex=null,te.style.position=null,te.style.pointerEvents=null)},[s]),x.useLayoutEffect(()=>{if(V.current){const te=F.current=yr.createRoot(S);if(R.updateMatrixWorld(),u)S.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const W=w(V.current,A,H);S.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${W[0]}px,${W[1]}px,0);transform-origin:0 0;`}return J&&(n?J.prepend(S):J.appendChild(S)),()=>{J&&J.removeChild(S),te.unmount()}}},[J,u]),x.useLayoutEffect(()=>{L&&(S.className=L)},[L]);const oe=x.useMemo(()=>u?{position:"absolute",top:0,left:0,width:H.width,height:H.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:o?"translate3d(-50%,-50%,0)":"none",...a&&{top:-H.height/2,left:-H.width/2,width:H.width,height:H.height},...r},[r,o,a,H,u]),ne=x.useMemo(()=>({position:"absolute",pointerEvents:P}),[P]);x.useLayoutEffect(()=>{if(re.current=!1,u){var te;(te=F.current)==null||te.render(x.createElement("div",{ref:X,style:oe},x.createElement("div",{ref:N,style:ne},x.createElement("div",{ref:O,className:e,style:r,children:l}))))}else{var W;(W=F.current)==null||W.render(x.createElement("div",{ref:O,style:oe,className:e,children:l}))}});const ee=x.useRef(!0);Xe(te=>{if(V.current){A.updateMatrixWorld(),V.current.updateWorldMatrix(!0,!1);const W=u?Y.current:w(V.current,A,H);if(u||Math.abs(B.current-A.zoom)>t||Math.abs(Y.current[0]-W[0])>t||Math.abs(Y.current[1]-W[1])>t){const de=cn(V.current,A);let ie=!1;k&&(Array.isArray(s)?ie=s.map(fe=>fe.current):s!=="blending"&&(ie=[R]));const xe=ee.current;if(ie){const fe=ln(V.current,A,C,ie);ee.current=fe&&!de}else ee.current=!de;xe!==ee.current&&(f?f(!ee.current):S.style.display=ee.current?"block":"none");const Pe=Math.floor(b[0]/2),it=s?k?[b[0],Pe]:[Pe-1,0]:b;if(S.style.zIndex=`${pn(V.current,A,it)}`,u){const[fe,je]=[H.width/2,H.height/2],Te=A.projectionMatrix.elements[5]*je,{isOrthographicCamera:Ye,top:st,left:Ue,bottom:He,right:Re}=A,ct=dn(A.matrixWorldInverse),lt=Ye?`scale(${Te})translate(${xt(-(Re+Ue)/2)}px,${xt((st+He)/2)}px)`:`translateZ(${Te}px)`;let me=V.current.matrixWorld;d&&(me=A.matrixWorldInverse.clone().transpose().copyPosition(me).scale(V.current.scale),me.elements[3]=me.elements[7]=me.elements[11]=0,me.elements[15]=1),S.style.width=H.width+"px",S.style.height=H.height+"px",S.style.perspective=Ye?"":`${Te}px`,X.current&&N.current&&(X.current.style.transform=`${lt}${ct}translate(${fe}px,${je}px)`,N.current.style.transform=fn(me,1/((c||10)/400)))}else{const fe=c===void 0?1:un(V.current,A)*c;S.style.transform=`translate3d(${W[0]}px,${W[1]}px,0) scale(${fe})`}Y.current=W,B.current=A.zoom}}if(!k&&Q.current&&!re.current)if(u){if(X.current){const W=X.current.children[0];if(W!=null&&W.clientWidth&&W!=null&&W.clientHeight){const{isOrthographicCamera:de}=A;if(de||E)h.scale&&(Array.isArray(h.scale)?h.scale instanceof G?Q.current.scale.copy(h.scale.clone().divideScalar(1)):Q.current.scale.set(1/h.scale[0],1/h.scale[1],1/h.scale[2]):Q.current.scale.setScalar(1/h.scale));else{const ie=(c||10)/400,xe=W.clientWidth*ie,Pe=W.clientHeight*ie;Q.current.scale.set(xe,Pe,1)}re.current=!0}}}else{const W=S.children[0];if(W!=null&&W.clientWidth&&W!=null&&W.clientHeight){const de=1/I.factor,ie=W.clientWidth*de,xe=W.clientHeight*de;Q.current.scale.set(ie,xe,1),re.current=!0}Q.current.lookAt(te.camera.position)}});const Me=x.useMemo(()=>({vertexShader:u?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[u]);return x.createElement("group",Et({},h,{ref:V}),s&&!k&&x.createElement("mesh",{castShadow:m,receiveShadow:v,ref:Q},E||x.createElement("planeGeometry",null),y||x.createElement("shaderMaterial",{side:Ir,vertexShader:Me.vertexShader,fragmentShader:Me.fragmentShader})))}),vn=l=>l;function yn(l,t=vn){const r=We.useSyncExternalStore(l.subscribe,We.useCallback(()=>t(l.getState()),[l,t]),We.useCallback(()=>t(l.getInitialState()),[l,t]));return We.useDebugValue(r),r}const Bt=l=>{const t=Sr(l),r=e=>yn(t,e);return Object.assign(r,t),r},gn=l=>l?Bt(l):Bt;let Be=0;const xn=gn(l=>(Ne.onStart=(t,r,e)=>{l({active:!0,item:t,loaded:r,total:e,progress:(r-Be)/(e-Be)*100})},Ne.onLoad=()=>{l({active:!1})},Ne.onError=t=>l(r=>({errors:[...r.errors,t]})),Ne.onProgress=(t,r,e)=>{r===e&&(Be=e),l({active:!0,item:t,loaded:r,total:e,progress:(r-Be)/(e-Be)*100||100})},{errors:[],active:!1,progress:0,item:"",loaded:0,total:0})),bn=rn>=125?"uv1":"uv2";var En=Object.defineProperty,wn=(l,t,r)=>t in l?En(l,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):l[t]=r,Rn=(l,t,r)=>(wn(l,t+"",r),r);class Mn{constructor(){Rn(this,"_listeners")}addEventListener(t,r){this._listeners===void 0&&(this._listeners={});const e=this._listeners;e[t]===void 0&&(e[t]=[]),e[t].indexOf(r)===-1&&e[t].push(r)}hasEventListener(t,r){if(this._listeners===void 0)return!1;const e=this._listeners;return e[t]!==void 0&&e[t].indexOf(r)!==-1}removeEventListener(t,r){if(this._listeners===void 0)return;const n=this._listeners[t];if(n!==void 0){const o=n.indexOf(r);o!==-1&&n.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const e=this._listeners[t.type];if(e!==void 0){t.target=this;const n=e.slice(0);for(let o=0,a=n.length;o<a;o++)n[o].call(this,t);t.target=null}}}var Pn=Object.defineProperty,Tn=(l,t,r)=>t in l?Pn(l,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):l[t]=r,T=(l,t,r)=>(Tn(l,typeof t!="symbol"?t+"":t,r),r);const $e=new Dr,Zt=new Or,Ln=Math.cos(70*(Math.PI/180)),Xt=(l,t)=>(l%t+t)%t;let Sn=class extends Mn{constructor(t,r){super(),T(this,"object"),T(this,"domElement"),T(this,"enabled",!0),T(this,"target",new G),T(this,"minDistance",0),T(this,"maxDistance",1/0),T(this,"minZoom",0),T(this,"maxZoom",1/0),T(this,"minPolarAngle",0),T(this,"maxPolarAngle",Math.PI),T(this,"minAzimuthAngle",-1/0),T(this,"maxAzimuthAngle",1/0),T(this,"enableDamping",!1),T(this,"dampingFactor",.05),T(this,"enableZoom",!0),T(this,"zoomSpeed",1),T(this,"enableRotate",!0),T(this,"rotateSpeed",1),T(this,"enablePan",!0),T(this,"panSpeed",1),T(this,"screenSpacePanning",!0),T(this,"keyPanSpeed",7),T(this,"zoomToCursor",!1),T(this,"autoRotate",!1),T(this,"autoRotateSpeed",2),T(this,"reverseOrbit",!1),T(this,"reverseHorizontalOrbit",!1),T(this,"reverseVerticalOrbit",!1),T(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),T(this,"mouseButtons",{LEFT:Le.ROTATE,MIDDLE:Le.DOLLY,RIGHT:Le.PAN}),T(this,"touches",{ONE:Se.ROTATE,TWO:Se.DOLLY_PAN}),T(this,"target0"),T(this,"position0"),T(this,"zoom0"),T(this,"_domElementKeyEvents",null),T(this,"getPolarAngle"),T(this,"getAzimuthalAngle"),T(this,"setPolarAngle"),T(this,"setAzimuthalAngle"),T(this,"getDistance"),T(this,"getZoomScale"),T(this,"listenToKeyEvents"),T(this,"stopListenToKeyEvents"),T(this,"saveState"),T(this,"reset"),T(this,"update"),T(this,"connect"),T(this,"dispose"),T(this,"dollyIn"),T(this,"dollyOut"),T(this,"getScale"),T(this,"setScale"),this.object=t,this.domElement=r,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>u.phi,this.getAzimuthalAngle=()=>u.theta,this.setPolarAngle=p=>{let g=Xt(p,2*Math.PI),D=u.phi;D<0&&(D+=2*Math.PI),g<0&&(g+=2*Math.PI);let U=Math.abs(g-D);2*Math.PI-U<U&&(g<D?g+=2*Math.PI:D+=2*Math.PI),s.phi=g-D,e.update()},this.setAzimuthalAngle=p=>{let g=Xt(p,2*Math.PI),D=u.theta;D<0&&(D+=2*Math.PI),g<0&&(g+=2*Math.PI);let U=Math.abs(g-D);2*Math.PI-U<U&&(g<D?g+=2*Math.PI:D+=2*Math.PI),s.theta=g-D,e.update()},this.getDistance=()=>e.object.position.distanceTo(e.target),this.listenToKeyEvents=p=>{p.addEventListener("keydown",ut),this._domElementKeyEvents=p},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ut),this._domElementKeyEvents=null},this.saveState=()=>{e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=()=>{e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(n),e.update(),c=i.NONE},this.update=(()=>{const p=new G,g=new G(0,1,0),D=new Ie().setFromUnitVectors(t.up,g),U=D.clone().invert(),q=new G,ve=new Ie,be=2*Math.PI;return function(){const Lt=e.object.position;D.setFromUnitVectors(t.up,g),U.copy(D).invert(),p.copy(Lt).sub(e.target),p.applyQuaternion(D),u.setFromVector3(p),e.autoRotate&&c===i.NONE&&I(C()),e.enableDamping?(u.theta+=s.theta*e.dampingFactor,u.phi+=s.phi*e.dampingFactor):(u.theta+=s.theta,u.phi+=s.phi);let ye=e.minAzimuthAngle,ge=e.maxAzimuthAngle;isFinite(ye)&&isFinite(ge)&&(ye<-Math.PI?ye+=be:ye>Math.PI&&(ye-=be),ge<-Math.PI?ge+=be:ge>Math.PI&&(ge-=be),ye<=ge?u.theta=Math.max(ye,Math.min(ge,u.theta)):u.theta=u.theta>(ye+ge)/2?Math.max(ye,u.theta):Math.min(ge,u.theta)),u.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,u.phi)),u.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(m,e.dampingFactor):e.target.add(m),e.zoomToCursor&&A||e.object.isOrthographicCamera?u.radius=Q(u.radius):u.radius=Q(u.radius*f),p.setFromSpherical(u),p.applyQuaternion(U),Lt.copy(e.target).add(p),e.object.matrixAutoUpdate||e.object.updateMatrix(),e.object.lookAt(e.target),e.enableDamping===!0?(s.theta*=1-e.dampingFactor,s.phi*=1-e.dampingFactor,m.multiplyScalar(1-e.dampingFactor)):(s.set(0,0,0),m.set(0,0,0));let Fe=!1;if(e.zoomToCursor&&A){let ke=null;if(e.object instanceof Oe&&e.object.isPerspectiveCamera){const _e=p.length();ke=Q(_e*f);const Ge=_e-ke;e.object.position.addScaledVector(O,Ge),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const _e=new G(Z.x,Z.y,0);_e.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/f)),e.object.updateProjectionMatrix(),Fe=!0;const Ge=new G(Z.x,Z.y,0);Ge.unproject(e.object),e.object.position.sub(Ge).add(_e),e.object.updateMatrixWorld(),ke=p.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;ke!==null&&(e.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(ke).add(e.object.position):($e.origin.copy(e.object.position),$e.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot($e.direction))<Ln?t.lookAt(e.target):(Zt.setFromNormalAndCoplanarPoint(e.object.up,e.target),$e.intersectPlane(Zt,e.target))))}else e.object instanceof Ce&&e.object.isOrthographicCamera&&(Fe=f!==1,Fe&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/f)),e.object.updateProjectionMatrix()));return f=1,A=!1,Fe||q.distanceToSquared(e.object.position)>d||8*(1-ve.dot(e.object.quaternion))>d?(e.dispatchEvent(n),q.copy(e.object.position),ve.copy(e.object.quaternion),Fe=!1,!0):!1}})(),this.connect=p=>{e.domElement=p,e.domElement.style.touchAction="none",e.domElement.addEventListener("contextmenu",Pt),e.domElement.addEventListener("pointerdown",Ue),e.domElement.addEventListener("pointercancel",Re),e.domElement.addEventListener("wheel",me)},this.dispose=()=>{var p,g,D,U,q,ve;e.domElement&&(e.domElement.style.touchAction="auto"),(p=e.domElement)==null||p.removeEventListener("contextmenu",Pt),(g=e.domElement)==null||g.removeEventListener("pointerdown",Ue),(D=e.domElement)==null||D.removeEventListener("pointercancel",Re),(U=e.domElement)==null||U.removeEventListener("wheel",me),(q=e.domElement)==null||q.ownerDocument.removeEventListener("pointermove",He),(ve=e.domElement)==null||ve.ownerDocument.removeEventListener("pointerup",Re),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",ut)};const e=this,n={type:"change"},o={type:"start"},a={type:"end"},i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let c=i.NONE;const d=1e-6,u=new At,s=new At;let f=1;const m=new G,v=new ce,y=new ce,E=new ce,b=new ce,w=new ce,M=new ce,L=new ce,P=new ce,h=new ce,O=new G,Z=new ce;let A=!1;const R=[],H={};function C(){return 2*Math.PI/60/60*e.autoRotateSpeed}function z(){return Math.pow(.95,e.zoomSpeed)}function I(p){e.reverseOrbit||e.reverseHorizontalOrbit?s.theta+=p:s.theta-=p}function S(p){e.reverseOrbit||e.reverseVerticalOrbit?s.phi+=p:s.phi-=p}const F=(()=>{const p=new G;return function(D,U){p.setFromMatrixColumn(U,0),p.multiplyScalar(-D),m.add(p)}})(),V=(()=>{const p=new G;return function(D,U){e.screenSpacePanning===!0?p.setFromMatrixColumn(U,1):(p.setFromMatrixColumn(U,0),p.crossVectors(e.object.up,p)),p.multiplyScalar(D),m.add(p)}})(),B=(()=>{const p=new G;return function(D,U){const q=e.domElement;if(q&&e.object instanceof Oe&&e.object.isPerspectiveCamera){const ve=e.object.position;p.copy(ve).sub(e.target);let be=p.length();be*=Math.tan(e.object.fov/2*Math.PI/180),F(2*D*be/q.clientHeight,e.object.matrix),V(2*U*be/q.clientHeight,e.object.matrix)}else q&&e.object instanceof Ce&&e.object.isOrthographicCamera?(F(D*(e.object.right-e.object.left)/e.object.zoom/q.clientWidth,e.object.matrix),V(U*(e.object.top-e.object.bottom)/e.object.zoom/q.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}})();function Y(p){e.object instanceof Oe&&e.object.isPerspectiveCamera||e.object instanceof Ce&&e.object.isOrthographicCamera?f=p:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function X(p){Y(f/p)}function N(p){Y(f*p)}function J(p){if(!e.zoomToCursor||!e.domElement)return;A=!0;const g=e.domElement.getBoundingClientRect(),D=p.clientX-g.left,U=p.clientY-g.top,q=g.width,ve=g.height;Z.x=D/q*2-1,Z.y=-(U/ve)*2+1,O.set(Z.x,Z.y,1).unproject(e.object).sub(e.object.position).normalize()}function Q(p){return Math.max(e.minDistance,Math.min(e.maxDistance,p))}function re(p){v.set(p.clientX,p.clientY)}function k(p){J(p),L.set(p.clientX,p.clientY)}function oe(p){b.set(p.clientX,p.clientY)}function ne(p){y.set(p.clientX,p.clientY),E.subVectors(y,v).multiplyScalar(e.rotateSpeed);const g=e.domElement;g&&(I(2*Math.PI*E.x/g.clientHeight),S(2*Math.PI*E.y/g.clientHeight)),v.copy(y),e.update()}function ee(p){P.set(p.clientX,p.clientY),h.subVectors(P,L),h.y>0?X(z()):h.y<0&&N(z()),L.copy(P),e.update()}function Me(p){w.set(p.clientX,p.clientY),M.subVectors(w,b).multiplyScalar(e.panSpeed),B(M.x,M.y),b.copy(w),e.update()}function te(p){J(p),p.deltaY<0?N(z()):p.deltaY>0&&X(z()),e.update()}function W(p){let g=!1;switch(p.code){case e.keys.UP:B(0,e.keyPanSpeed),g=!0;break;case e.keys.BOTTOM:B(0,-e.keyPanSpeed),g=!0;break;case e.keys.LEFT:B(e.keyPanSpeed,0),g=!0;break;case e.keys.RIGHT:B(-e.keyPanSpeed,0),g=!0;break}g&&(p.preventDefault(),e.update())}function de(){if(R.length==1)v.set(R[0].pageX,R[0].pageY);else{const p=.5*(R[0].pageX+R[1].pageX),g=.5*(R[0].pageY+R[1].pageY);v.set(p,g)}}function ie(){if(R.length==1)b.set(R[0].pageX,R[0].pageY);else{const p=.5*(R[0].pageX+R[1].pageX),g=.5*(R[0].pageY+R[1].pageY);b.set(p,g)}}function xe(){const p=R[0].pageX-R[1].pageX,g=R[0].pageY-R[1].pageY,D=Math.sqrt(p*p+g*g);L.set(0,D)}function Pe(){e.enableZoom&&xe(),e.enablePan&&ie()}function it(){e.enableZoom&&xe(),e.enableRotate&&de()}function fe(p){if(R.length==1)y.set(p.pageX,p.pageY);else{const D=pt(p),U=.5*(p.pageX+D.x),q=.5*(p.pageY+D.y);y.set(U,q)}E.subVectors(y,v).multiplyScalar(e.rotateSpeed);const g=e.domElement;g&&(I(2*Math.PI*E.x/g.clientHeight),S(2*Math.PI*E.y/g.clientHeight)),v.copy(y)}function je(p){if(R.length==1)w.set(p.pageX,p.pageY);else{const g=pt(p),D=.5*(p.pageX+g.x),U=.5*(p.pageY+g.y);w.set(D,U)}M.subVectors(w,b).multiplyScalar(e.panSpeed),B(M.x,M.y),b.copy(w)}function Te(p){const g=pt(p),D=p.pageX-g.x,U=p.pageY-g.y,q=Math.sqrt(D*D+U*U);P.set(0,q),h.set(0,Math.pow(P.y/L.y,e.zoomSpeed)),X(h.y),L.copy(P)}function Ye(p){e.enableZoom&&Te(p),e.enablePan&&je(p)}function st(p){e.enableZoom&&Te(p),e.enableRotate&&fe(p)}function Ue(p){var g,D;e.enabled!==!1&&(R.length===0&&((g=e.domElement)==null||g.ownerDocument.addEventListener("pointermove",He),(D=e.domElement)==null||D.ownerDocument.addEventListener("pointerup",Re)),hr(p),p.pointerType==="touch"?fr(p):ct(p))}function He(p){e.enabled!==!1&&(p.pointerType==="touch"?mr(p):lt(p))}function Re(p){var g,D,U;vr(p),R.length===0&&((g=e.domElement)==null||g.releasePointerCapture(p.pointerId),(D=e.domElement)==null||D.ownerDocument.removeEventListener("pointermove",He),(U=e.domElement)==null||U.ownerDocument.removeEventListener("pointerup",Re)),e.dispatchEvent(a),c=i.NONE}function ct(p){let g;switch(p.button){case 0:g=e.mouseButtons.LEFT;break;case 1:g=e.mouseButtons.MIDDLE;break;case 2:g=e.mouseButtons.RIGHT;break;default:g=-1}switch(g){case Le.DOLLY:if(e.enableZoom===!1)return;k(p),c=i.DOLLY;break;case Le.ROTATE:if(p.ctrlKey||p.metaKey||p.shiftKey){if(e.enablePan===!1)return;oe(p),c=i.PAN}else{if(e.enableRotate===!1)return;re(p),c=i.ROTATE}break;case Le.PAN:if(p.ctrlKey||p.metaKey||p.shiftKey){if(e.enableRotate===!1)return;re(p),c=i.ROTATE}else{if(e.enablePan===!1)return;oe(p),c=i.PAN}break;default:c=i.NONE}c!==i.NONE&&e.dispatchEvent(o)}function lt(p){if(e.enabled!==!1)switch(c){case i.ROTATE:if(e.enableRotate===!1)return;ne(p);break;case i.DOLLY:if(e.enableZoom===!1)return;ee(p);break;case i.PAN:if(e.enablePan===!1)return;Me(p);break}}function me(p){e.enabled===!1||e.enableZoom===!1||c!==i.NONE&&c!==i.ROTATE||(p.preventDefault(),e.dispatchEvent(o),te(p),e.dispatchEvent(a))}function ut(p){e.enabled===!1||e.enablePan===!1||W(p)}function fr(p){switch(Tt(p),R.length){case 1:switch(e.touches.ONE){case Se.ROTATE:if(e.enableRotate===!1)return;de(),c=i.TOUCH_ROTATE;break;case Se.PAN:if(e.enablePan===!1)return;ie(),c=i.TOUCH_PAN;break;default:c=i.NONE}break;case 2:switch(e.touches.TWO){case Se.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Pe(),c=i.TOUCH_DOLLY_PAN;break;case Se.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;it(),c=i.TOUCH_DOLLY_ROTATE;break;default:c=i.NONE}break;default:c=i.NONE}c!==i.NONE&&e.dispatchEvent(o)}function mr(p){switch(Tt(p),c){case i.TOUCH_ROTATE:if(e.enableRotate===!1)return;fe(p),e.update();break;case i.TOUCH_PAN:if(e.enablePan===!1)return;je(p),e.update();break;case i.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ye(p),e.update();break;case i.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;st(p),e.update();break;default:c=i.NONE}}function Pt(p){e.enabled!==!1&&p.preventDefault()}function hr(p){R.push(p)}function vr(p){delete H[p.pointerId];for(let g=0;g<R.length;g++)if(R[g].pointerId==p.pointerId){R.splice(g,1);return}}function Tt(p){let g=H[p.pointerId];g===void 0&&(g=new ce,H[p.pointerId]=g),g.set(p.pageX,p.pageY)}function pt(p){const g=p.pointerId===R[0].pointerId?R[1]:R[0];return H[g.pointerId]}this.dollyIn=(p=z())=>{N(p),e.update()},this.dollyOut=(p=z())=>{X(p),e.update()},this.getScale=()=>f,this.setScale=p=>{Y(p),e.update()},this.getZoomScale=()=>z(),r!==void 0&&this.connect(r),this.update()}};const An={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},In={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `};function cr(l,t,r){const e=r.length-l-1;if(t>=r[e])return e-1;if(t<=r[l])return l;let n=l,o=e,a=Math.floor((n+o)/2);for(;t<r[a]||t>=r[a+1];)t<r[a]?o=a:n=a,a=Math.floor((n+o)/2);return a}function Dn(l,t,r,e){const n=[],o=[],a=[];n[0]=1;for(let i=1;i<=r;++i){o[i]=t-e[l+1-i],a[i]=e[l+i]-t;let c=0;for(let d=0;d<i;++d){const u=a[d+1],s=o[i-d],f=n[d]/(u+s);n[d]=c+u*f,c=s*f}n[i]=c}return n}function On(l,t,r,e){const n=cr(l,e,t),o=Dn(n,e,l,t),a=new at(0,0,0,0);for(let i=0;i<=l;++i){const c=r[n-l+i],d=o[i],u=c.w*d;a.x+=c.x*u,a.y+=c.y*u,a.z+=c.z*u,a.w+=c.w*d}return a}function Cn(l,t,r,e,n){const o=[];for(let s=0;s<=r;++s)o[s]=0;const a=[];for(let s=0;s<=e;++s)a[s]=o.slice(0);const i=[];for(let s=0;s<=r;++s)i[s]=o.slice(0);i[0][0]=1;const c=o.slice(0),d=o.slice(0);for(let s=1;s<=r;++s){c[s]=t-n[l+1-s],d[s]=n[l+s]-t;let f=0;for(let m=0;m<s;++m){const v=d[m+1],y=c[s-m];i[s][m]=v+y;const E=i[m][s-1]/i[s][m];i[m][s]=f+v*E,f=y*E}i[s][s]=f}for(let s=0;s<=r;++s)a[0][s]=i[s][r];for(let s=0;s<=r;++s){let f=0,m=1;const v=[];for(let y=0;y<=r;++y)v[y]=o.slice(0);v[0][0]=1;for(let y=1;y<=e;++y){let E=0;const b=s-y,w=r-y;s>=y&&(v[m][0]=v[f][0]/i[w+1][b],E=v[m][0]*i[b][w]);const M=b>=-1?1:-b,L=s-1<=w?y-1:r-s;for(let h=M;h<=L;++h)v[m][h]=(v[f][h]-v[f][h-1])/i[w+1][b+h],E+=v[m][h]*i[b+h][w];s<=w&&(v[m][y]=-v[f][y-1]/i[w+1][s],E+=v[m][y]*i[s][w]),a[y][s]=E;const P=f;f=m,m=P}}let u=r;for(let s=1;s<=e;++s){for(let f=0;f<=r;++f)a[s][f]*=u;u*=r-s}return a}function jn(l,t,r,e,n){const o=n<l?n:l,a=[],i=cr(l,e,t),c=Cn(i,e,l,o,t),d=[];for(let u=0;u<r.length;++u){const s=r[u].clone(),f=s.w;s.x*=f,s.y*=f,s.z*=f,d[u]=s}for(let u=0;u<=o;++u){const s=d[i-l].clone().multiplyScalar(c[u][0]);for(let f=1;f<=l;++f)s.add(d[i-l+f].clone().multiplyScalar(c[u][f]));a[u]=s}for(let u=o+1;u<=n+1;++u)a[u]=new at(0,0,0);return a}function Hn(l,t){let r=1;for(let n=2;n<=l;++n)r*=n;let e=1;for(let n=2;n<=t;++n)e*=n;for(let n=2;n<=l-t;++n)e*=n;return r/e}function Fn(l){const t=l.length,r=[],e=[];for(let o=0;o<t;++o){const a=l[o];r[o]=new G(a.x,a.y,a.z),e[o]=a.w}const n=[];for(let o=0;o<t;++o){const a=r[o].clone();for(let i=1;i<=o;++i)a.sub(n[o-i].clone().multiplyScalar(Hn(o,i)*e[i]));n[o]=a.divideScalar(e[0])}return n}function kn(l,t,r,e,n){const o=jn(l,t,r,e,n);return Fn(o)}class Vt extends Cr{constructor(t,r,e,n,o){super(),this.degree=t,this.knots=r,this.controlPoints=[],this.startKnot=n||0,this.endKnot=o||this.knots.length-1;for(let a=0;a<e.length;++a){const i=e[a];this.controlPoints[a]=new at(i.x,i.y,i.z,i.w)}}getPoint(t,r){const e=r||new G,n=this.knots[this.startKnot]+t*(this.knots[this.endKnot]-this.knots[this.startKnot]),o=On(this.degree,this.knots,this.controlPoints,n);return o.w!=1&&o.divideScalar(o.w),e.set(o.x,o.y,o.z)}getTangent(t,r){const e=r||new G,n=this.knots[0]+t*(this.knots[this.knots.length-1]-this.knots[0]),o=kn(this.degree,this.knots,this.controlPoints,n,1);return e.copy(o[1]).normalize(),e}}let _,$,ae;class Rt extends nr{constructor(t){super(t)}load(t,r,e,n){const o=this,a=o.path===""?jr.extractUrlBase(t):o.path,i=new or(this.manager);i.setPath(o.path),i.setResponseType("arraybuffer"),i.setRequestHeader(o.requestHeader),i.setWithCredentials(o.withCredentials),i.load(t,function(c){try{r(o.parse(c,a))}catch(d){n?n(d):console.error(d),o.manager.itemError(t)}},e,n)}parse(t,r){if(Vn(t))_=new Xn().parse(t);else{const n=dr(t);if(!Yn(n))throw new Error("THREE.FBXLoader: Unknown format.");if(Ut(n)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Ut(n));_=new Zn().parse(n)}const e=new Hr(this.manager).setPath(this.resourcePath||r).setCrossOrigin(this.crossOrigin);return new _n(e,this.manager).parse(_)}}class _n{constructor(t,r){this.textureLoader=t,this.manager=r}parse(){$=this.parseConnections();const t=this.parseImages(),r=this.parseTextures(t),e=this.parseMaterials(r),n=this.parseDeformers(),o=new zn().parse(n);return this.parseScene(n,o,e),ae}parseConnections(){const t=new Map;return"Connections"in _&&_.Connections.connections.forEach(function(e){const n=e[0],o=e[1],a=e[2];t.has(n)||t.set(n,{parents:[],children:[]});const i={ID:o,relationship:a};t.get(n).parents.push(i),t.has(o)||t.set(o,{parents:[],children:[]});const c={ID:n,relationship:a};t.get(o).children.push(c)}),t}parseImages(){const t={},r={};if("Video"in _.Objects){const e=_.Objects.Video;for(const n in e){const o=e[n],a=parseInt(n);if(t[a]=o.RelativeFilename||o.Filename,"Content"in o){const i=o.Content instanceof ArrayBuffer&&o.Content.byteLength>0,c=typeof o.Content=="string"&&o.Content!=="";if(i||c){const d=this.parseImage(e[n]);r[o.RelativeFilename||o.Filename]=d}}}}for(const e in t){const n=t[e];r[n]!==void 0?t[e]=r[n]:t[e]=t[e].split("\\").pop()}return t}parseImage(t){const r=t.Content,e=t.RelativeFilename||t.Filename,n=e.slice(e.lastIndexOf(".")+1).toLowerCase();let o;switch(n){case"bmp":o="image/bmp";break;case"jpg":case"jpeg":o="image/jpeg";break;case"png":o="image/png";break;case"tif":o="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",e),o="image/tga";break;default:console.warn('FBXLoader: Image type "'+n+'" is not supported.');return}if(typeof r=="string")return"data:"+o+";base64,"+r;{const a=new Uint8Array(r);return window.URL.createObjectURL(new Blob([a],{type:o}))}}parseTextures(t){const r=new Map;if("Texture"in _.Objects){const e=_.Objects.Texture;for(const n in e){const o=this.parseTexture(e[n],t);r.set(parseInt(n),o)}}return r}parseTexture(t,r){const e=this.loadTexture(t,r);e.ID=t.id,e.name=t.attrName;const n=t.WrapModeU,o=t.WrapModeV,a=n!==void 0?n.value:0,i=o!==void 0?o.value:0;if(e.wrapS=a===0?It:Dt,e.wrapT=i===0?It:Dt,"Scaling"in t){const c=t.Scaling.value;e.repeat.x=c[0],e.repeat.y=c[1]}return e}loadTexture(t,r){let e;const n=this.textureLoader.path,o=$.get(t.id).children;o!==void 0&&o.length>0&&r[o[0].ID]!==void 0&&(e=r[o[0].ID],(e.indexOf("blob:")===0||e.indexOf("data:")===0)&&this.textureLoader.setPath(void 0));let a;const i=t.FileName.slice(-3).toLowerCase();if(i==="tga"){const c=this.manager.getHandler(".tga");c===null?(console.warn("FBXLoader: TGA loader not found, creating placeholder texture for",t.RelativeFilename),a=new Ot):(c.setPath(this.textureLoader.path),a=c.load(e))}else i==="psd"?(console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for",t.RelativeFilename),a=new Ot):a=this.textureLoader.load(e);return this.textureLoader.setPath(n),a}parseMaterials(t){const r=new Map;if("Material"in _.Objects){const e=_.Objects.Material;for(const n in e){const o=this.parseMaterial(e[n],t);o!==null&&r.set(parseInt(n),o)}}return r}parseMaterial(t,r){const e=t.id,n=t.attrName;let o=t.ShadingModel;if(typeof o=="object"&&(o=o.value),!$.has(e))return null;const a=this.parseParameters(t,r,e);let i;switch(o.toLowerCase()){case"phong":i=new Qe;break;case"lambert":i=new Fr;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',o),i=new Qe;break}return i.setValues(a),i.name=n,i}parseParameters(t,r,e){const n={};t.BumpFactor&&(n.bumpScale=t.BumpFactor.value),t.Diffuse?n.color=new he().fromArray(t.Diffuse.value):t.DiffuseColor&&(t.DiffuseColor.type==="Color"||t.DiffuseColor.type==="ColorRGB")&&(n.color=new he().fromArray(t.DiffuseColor.value)),t.DisplacementFactor&&(n.displacementScale=t.DisplacementFactor.value),t.Emissive?n.emissive=new he().fromArray(t.Emissive.value):t.EmissiveColor&&(t.EmissiveColor.type==="Color"||t.EmissiveColor.type==="ColorRGB")&&(n.emissive=new he().fromArray(t.EmissiveColor.value)),t.EmissiveFactor&&(n.emissiveIntensity=parseFloat(t.EmissiveFactor.value)),t.Opacity&&(n.opacity=parseFloat(t.Opacity.value)),n.opacity<1&&(n.transparent=!0),t.ReflectionFactor&&(n.reflectivity=t.ReflectionFactor.value),t.Shininess&&(n.shininess=t.Shininess.value),t.Specular?n.specular=new he().fromArray(t.Specular.value):t.SpecularColor&&t.SpecularColor.type==="Color"&&(n.specular=new he().fromArray(t.SpecularColor.value));const o=this;return $.get(e).children.forEach(function(a){const i=a.relationship;switch(i){case"Bump":n.bumpMap=o.getTexture(r,a.ID);break;case"Maya|TEX_ao_map":n.aoMap=o.getTexture(r,a.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":n.map=o.getTexture(r,a.ID),n.map!==void 0&&("colorSpace"in n.map?n.map.colorSpace="srgb":n.map.encoding=3001);break;case"DisplacementColor":n.displacementMap=o.getTexture(r,a.ID);break;case"EmissiveColor":n.emissiveMap=o.getTexture(r,a.ID),n.emissiveMap!==void 0&&("colorSpace"in n.emissiveMap?n.emissiveMap.colorSpace="srgb":n.emissiveMap.encoding=3001);break;case"NormalMap":case"Maya|TEX_normal_map":n.normalMap=o.getTexture(r,a.ID);break;case"ReflectionColor":n.envMap=o.getTexture(r,a.ID),n.envMap!==void 0&&(n.envMap.mapping=kr,"colorSpace"in n.envMap?n.envMap.colorSpace="srgb":n.envMap.encoding=3001);break;case"SpecularColor":n.specularMap=o.getTexture(r,a.ID),n.specularMap!==void 0&&("colorSpace"in n.specularMap?n.specularMap.colorSpace="srgb":n.specularMap.encoding=3001);break;case"TransparentColor":case"TransparencyFactor":n.alphaMap=o.getTexture(r,a.ID),n.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",i);break}}),n}getTexture(t,r){return"LayeredTexture"in _.Objects&&r in _.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),r=$.get(r).children[0].ID),t.get(r)}parseDeformers(){const t={},r={};if("Deformer"in _.Objects){const e=_.Objects.Deformer;for(const n in e){const o=e[n],a=$.get(parseInt(n));if(o.attrType==="Skin"){const i=this.parseSkeleton(a,e);i.ID=n,a.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),i.geometryID=a.parents[0].ID,t[n]=i}else if(o.attrType==="BlendShape"){const i={id:n};i.rawTargets=this.parseMorphTargets(a,e),i.id=n,a.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),r[n]=i}}}return{skeletons:t,morphTargets:r}}parseSkeleton(t,r){const e=[];return t.children.forEach(function(n){const o=r[n.ID];if(o.attrType!=="Cluster")return;const a={ID:n.ID,indices:[],weights:[],transformLink:new K().fromArray(o.TransformLink.a)};"Indexes"in o&&(a.indices=o.Indexes.a,a.weights=o.Weights.a),e.push(a)}),{rawBones:e,bones:[]}}parseMorphTargets(t,r){const e=[];for(let n=0;n<t.children.length;n++){const o=t.children[n],a=r[o.ID],i={name:a.attrName,initialWeight:a.DeformPercent,id:a.id,fullWeights:a.FullWeights.a};if(a.attrType!=="BlendShapeChannel")return;i.geoID=$.get(parseInt(o.ID)).children.filter(function(c){return c.relationship===void 0})[0].ID,e.push(i)}return e}parseScene(t,r,e){ae=new gt;const n=this.parseModels(t.skeletons,r,e),o=_.Objects.Model,a=this;n.forEach(function(c){const d=o[c.ID];a.setLookAtProperties(c,d),$.get(c.ID).parents.forEach(function(s){const f=n.get(s.ID);f!==void 0&&f.add(c)}),c.parent===null&&ae.add(c)}),this.bindSkeleton(t.skeletons,r,n),this.createAmbientLight(),ae.traverse(function(c){if(c.userData.transformData){c.parent&&(c.userData.transformData.parentMatrix=c.parent.matrix,c.userData.transformData.parentMatrixWorld=c.parent.matrixWorld);const d=ur(c.userData.transformData);c.applyMatrix4(d),c.updateWorldMatrix()}});const i=new Bn().parse();ae.children.length===1&&ae.children[0].isGroup&&(ae.children[0].animations=i,ae=ae.children[0]),ae.animations=i}parseModels(t,r,e){const n=new Map,o=_.Objects.Model;for(const a in o){const i=parseInt(a),c=o[a],d=$.get(i);let u=this.buildSkeleton(d,t,i,c.attrName);if(!u){switch(c.attrType){case"Camera":u=this.createCamera(d);break;case"Light":u=this.createLight(d);break;case"Mesh":u=this.createMesh(d,r,e);break;case"NurbsCurve":u=this.createCurve(d,r);break;case"LimbNode":case"Root":u=new Ct;break;case"Null":default:u=new gt;break}u.name=c.attrName?rt.sanitizeNodeName(c.attrName):"",u.ID=i}this.getTransformData(u,c),n.set(i,u)}return n}buildSkeleton(t,r,e,n){let o=null;return t.parents.forEach(function(a){for(const i in r){const c=r[i];c.rawBones.forEach(function(d,u){if(d.ID===a.ID){const s=o;o=new Ct,o.matrixWorld.copy(d.transformLink),o.name=n?rt.sanitizeNodeName(n):"",o.ID=e,c.bones[u]=o,s!==null&&o.add(s)}})}}),o}createCamera(t){let r,e;if(t.children.forEach(function(n){const o=_.Objects.NodeAttribute[n.ID];o!==void 0&&(e=o)}),e===void 0)r=new ft;else{let n=0;e.CameraProjectionType!==void 0&&e.CameraProjectionType.value===1&&(n=1);let o=1;e.NearPlane!==void 0&&(o=e.NearPlane.value/1e3);let a=1e3;e.FarPlane!==void 0&&(a=e.FarPlane.value/1e3);let i=window.innerWidth,c=window.innerHeight;e.AspectWidth!==void 0&&e.AspectHeight!==void 0&&(i=e.AspectWidth.value,c=e.AspectHeight.value);const d=i/c;let u=45;e.FieldOfView!==void 0&&(u=e.FieldOfView.value);const s=e.FocalLength?e.FocalLength.value:null;switch(n){case 0:r=new Oe(u,d,o,a),s!==null&&r.setFocalLength(s);break;case 1:r=new Ce(-i/2,i/2,c/2,-c/2,o,a);break;default:console.warn("THREE.FBXLoader: Unknown camera type "+n+"."),r=new ft;break}}return r}createLight(t){let r,e;if(t.children.forEach(function(n){const o=_.Objects.NodeAttribute[n.ID];o!==void 0&&(e=o)}),e===void 0)r=new ft;else{let n;e.LightType===void 0?n=0:n=e.LightType.value;let o=16777215;e.Color!==void 0&&(o=new he().fromArray(e.Color.value));let a=e.Intensity===void 0?1:e.Intensity.value/100;e.CastLightOnObject!==void 0&&e.CastLightOnObject.value===0&&(a=0);let i=0;e.FarAttenuationEnd!==void 0&&(e.EnableFarAttenuation!==void 0&&e.EnableFarAttenuation.value===0?i=0:i=e.FarAttenuationEnd.value);const c=1;switch(n){case 0:r=new jt(o,a,i,c);break;case 1:r=new zr(o,a);break;case 2:let d=Math.PI/3;e.InnerAngle!==void 0&&(d=pe.degToRad(e.InnerAngle.value));let u=0;e.OuterAngle!==void 0&&(u=pe.degToRad(e.OuterAngle.value),u=Math.max(u,1)),r=new _r(o,a,i,d,u,c);break;default:console.warn("THREE.FBXLoader: Unknown light type "+e.LightType.value+", defaulting to a PointLight."),r=new jt(o,a);break}e.CastShadows!==void 0&&e.CastShadows.value===1&&(r.castShadow=!0)}return r}createMesh(t,r,e){let n,o=null,a=null;const i=[];return t.children.forEach(function(c){r.has(c.ID)&&(o=r.get(c.ID)),e.has(c.ID)&&i.push(e.get(c.ID))}),i.length>1?a=i:i.length>0?a=i[0]:(a=new Qe({color:13421772}),i.push(a)),"color"in o.attributes&&i.forEach(function(c){c.vertexColors=!0}),o.FBX_Deformer?(n=new Br(o,a),n.normalizeSkinWeights()):n=new nt(o,a),n}createCurve(t,r){const e=t.children.reduce(function(o,a){return r.has(a.ID)&&(o=r.get(a.ID)),o},null),n=new et({color:3342591,linewidth:1});return new Zr(e,n)}getTransformData(t,r){const e={};"InheritType"in r&&(e.inheritType=parseInt(r.InheritType.value)),"RotationOrder"in r?e.eulerOrder=pr(r.RotationOrder.value):e.eulerOrder="ZYX","Lcl_Translation"in r&&(e.translation=r.Lcl_Translation.value),"PreRotation"in r&&(e.preRotation=r.PreRotation.value),"Lcl_Rotation"in r&&(e.rotation=r.Lcl_Rotation.value),"PostRotation"in r&&(e.postRotation=r.PostRotation.value),"Lcl_Scaling"in r&&(e.scale=r.Lcl_Scaling.value),"ScalingOffset"in r&&(e.scalingOffset=r.ScalingOffset.value),"ScalingPivot"in r&&(e.scalingPivot=r.ScalingPivot.value),"RotationOffset"in r&&(e.rotationOffset=r.RotationOffset.value),"RotationPivot"in r&&(e.rotationPivot=r.RotationPivot.value),t.userData.transformData=e}setLookAtProperties(t,r){"LookAtProperty"in r&&$.get(t.ID).children.forEach(function(n){if(n.relationship==="LookAtProperty"){const o=_.Objects.Model[n.ID];if("Lcl_Translation"in o){const a=o.Lcl_Translation.value;t.target!==void 0?(t.target.position.fromArray(a),ae.add(t.target)):t.lookAt(new G().fromArray(a))}}})}bindSkeleton(t,r,e){const n=this.parsePoseNodes();for(const o in t){const a=t[o];$.get(parseInt(a.ID)).parents.forEach(function(c){if(r.has(c.ID)){const d=c.ID;$.get(d).parents.forEach(function(s){e.has(s.ID)&&e.get(s.ID).bind(new Xr(a.bones),n[s.ID])})}})}}parsePoseNodes(){const t={};if("Pose"in _.Objects){const r=_.Objects.Pose;for(const e in r)if(r[e].attrType==="BindPose"&&r[e].NbPoseNodes>0){const n=r[e].PoseNode;Array.isArray(n)?n.forEach(function(o){t[o.Node]=new K().fromArray(o.Matrix.a)}):t[n.Node]=new K().fromArray(n.Matrix.a)}}return t}createAmbientLight(){if("GlobalSettings"in _&&"AmbientColor"in _.GlobalSettings){const t=_.GlobalSettings.AmbientColor.value,r=t[0],e=t[1],n=t[2];if(r!==0||e!==0||n!==0){const o=new he(r,e,n);ae.add(new Vr(o,1))}}}}class zn{parse(t){const r=new Map;if("Geometry"in _.Objects){const e=_.Objects.Geometry;for(const n in e){const o=$.get(parseInt(n)),a=this.parseGeometry(o,e[n],t);r.set(parseInt(n),a)}}return r}parseGeometry(t,r,e){switch(r.attrType){case"Mesh":return this.parseMeshGeometry(t,r,e);case"NurbsCurve":return this.parseNurbsGeometry(r)}}parseMeshGeometry(t,r,e){const n=e.skeletons,o=[],a=t.parents.map(function(s){return _.Objects.Model[s.ID]});if(a.length===0)return;const i=t.children.reduce(function(s,f){return n[f.ID]!==void 0&&(s=n[f.ID]),s},null);t.children.forEach(function(s){e.morphTargets[s.ID]!==void 0&&o.push(e.morphTargets[s.ID])});const c=a[0],d={};"RotationOrder"in c&&(d.eulerOrder=pr(c.RotationOrder.value)),"InheritType"in c&&(d.inheritType=parseInt(c.InheritType.value)),"GeometricTranslation"in c&&(d.translation=c.GeometricTranslation.value),"GeometricRotation"in c&&(d.rotation=c.GeometricRotation.value),"GeometricScaling"in c&&(d.scale=c.GeometricScaling.value);const u=ur(d);return this.genGeometry(r,i,o,u)}genGeometry(t,r,e,n){const o=new De;t.attrName&&(o.name=t.attrName);const a=this.parseGeoNode(t,r),i=this.genBuffers(a),c=new ue(i.vertex,3);if(c.applyMatrix4(n),o.setAttribute("position",c),i.colors.length>0&&o.setAttribute("color",new ue(i.colors,3)),r&&(o.setAttribute("skinIndex",new Yr(i.weightsIndices,4)),o.setAttribute("skinWeight",new ue(i.vertexWeights,4)),o.FBX_Deformer=r),i.normal.length>0){const d=new Ur().getNormalMatrix(n),u=new ue(i.normal,3);u.applyNormalMatrix(d),o.setAttribute("normal",u)}if(i.uvs.forEach(function(d,u){bn==="uv2"&&u++;const s=u===0?"uv":`uv${u}`;o.setAttribute(s,new ue(i.uvs[u],2))}),a.material&&a.material.mappingType!=="AllSame"){let d=i.materialIndex[0],u=0;if(i.materialIndex.forEach(function(s,f){s!==d&&(o.addGroup(u,f-u,d),d=s,u=f)}),o.groups.length>0){const s=o.groups[o.groups.length-1],f=s.start+s.count;f!==i.materialIndex.length&&o.addGroup(f,i.materialIndex.length-f,d)}o.groups.length===0&&o.addGroup(0,i.materialIndex.length,i.materialIndex[0])}return this.addMorphTargets(o,t,e,n),o}parseGeoNode(t,r){const e={};if(e.vertexPositions=t.Vertices!==void 0?t.Vertices.a:[],e.vertexIndices=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],t.LayerElementColor&&(e.color=this.parseVertexColors(t.LayerElementColor[0])),t.LayerElementMaterial&&(e.material=this.parseMaterialIndices(t.LayerElementMaterial[0])),t.LayerElementNormal&&(e.normal=this.parseNormals(t.LayerElementNormal[0])),t.LayerElementUV){e.uv=[];let n=0;for(;t.LayerElementUV[n];)t.LayerElementUV[n].UV&&e.uv.push(this.parseUVs(t.LayerElementUV[n])),n++}return e.weightTable={},r!==null&&(e.skeleton=r,r.rawBones.forEach(function(n,o){n.indices.forEach(function(a,i){e.weightTable[a]===void 0&&(e.weightTable[a]=[]),e.weightTable[a].push({id:o,weight:n.weights[i]})})})),e}genBuffers(t){const r={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let e=0,n=0,o=!1,a=[],i=[],c=[],d=[],u=[],s=[];const f=this;return t.vertexIndices.forEach(function(m,v){let y,E=!1;m<0&&(m=m^-1,E=!0);let b=[],w=[];if(a.push(m*3,m*3+1,m*3+2),t.color){const M=Je(v,e,m,t.color);c.push(M[0],M[1],M[2])}if(t.skeleton){if(t.weightTable[m]!==void 0&&t.weightTable[m].forEach(function(M){w.push(M.weight),b.push(M.id)}),w.length>4){o||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),o=!0);const M=[0,0,0,0],L=[0,0,0,0];w.forEach(function(P,h){let O=P,Z=b[h];L.forEach(function(A,R,H){if(O>A){H[R]=O,O=A;const C=M[R];M[R]=Z,Z=C}})}),b=M,w=L}for(;w.length<4;)w.push(0),b.push(0);for(let M=0;M<4;++M)u.push(w[M]),s.push(b[M])}if(t.normal){const M=Je(v,e,m,t.normal);i.push(M[0],M[1],M[2])}t.material&&t.material.mappingType!=="AllSame"&&(y=Je(v,e,m,t.material)[0]),t.uv&&t.uv.forEach(function(M,L){const P=Je(v,e,m,M);d[L]===void 0&&(d[L]=[]),d[L].push(P[0]),d[L].push(P[1])}),n++,E&&(f.genFace(r,t,a,y,i,c,d,u,s,n),e++,n=0,a=[],i=[],c=[],d=[],u=[],s=[])}),r}genFace(t,r,e,n,o,a,i,c,d,u){for(let s=2;s<u;s++)t.vertex.push(r.vertexPositions[e[0]]),t.vertex.push(r.vertexPositions[e[1]]),t.vertex.push(r.vertexPositions[e[2]]),t.vertex.push(r.vertexPositions[e[(s-1)*3]]),t.vertex.push(r.vertexPositions[e[(s-1)*3+1]]),t.vertex.push(r.vertexPositions[e[(s-1)*3+2]]),t.vertex.push(r.vertexPositions[e[s*3]]),t.vertex.push(r.vertexPositions[e[s*3+1]]),t.vertex.push(r.vertexPositions[e[s*3+2]]),r.skeleton&&(t.vertexWeights.push(c[0]),t.vertexWeights.push(c[1]),t.vertexWeights.push(c[2]),t.vertexWeights.push(c[3]),t.vertexWeights.push(c[(s-1)*4]),t.vertexWeights.push(c[(s-1)*4+1]),t.vertexWeights.push(c[(s-1)*4+2]),t.vertexWeights.push(c[(s-1)*4+3]),t.vertexWeights.push(c[s*4]),t.vertexWeights.push(c[s*4+1]),t.vertexWeights.push(c[s*4+2]),t.vertexWeights.push(c[s*4+3]),t.weightsIndices.push(d[0]),t.weightsIndices.push(d[1]),t.weightsIndices.push(d[2]),t.weightsIndices.push(d[3]),t.weightsIndices.push(d[(s-1)*4]),t.weightsIndices.push(d[(s-1)*4+1]),t.weightsIndices.push(d[(s-1)*4+2]),t.weightsIndices.push(d[(s-1)*4+3]),t.weightsIndices.push(d[s*4]),t.weightsIndices.push(d[s*4+1]),t.weightsIndices.push(d[s*4+2]),t.weightsIndices.push(d[s*4+3])),r.color&&(t.colors.push(a[0]),t.colors.push(a[1]),t.colors.push(a[2]),t.colors.push(a[(s-1)*3]),t.colors.push(a[(s-1)*3+1]),t.colors.push(a[(s-1)*3+2]),t.colors.push(a[s*3]),t.colors.push(a[s*3+1]),t.colors.push(a[s*3+2])),r.material&&r.material.mappingType!=="AllSame"&&(t.materialIndex.push(n),t.materialIndex.push(n),t.materialIndex.push(n)),r.normal&&(t.normal.push(o[0]),t.normal.push(o[1]),t.normal.push(o[2]),t.normal.push(o[(s-1)*3]),t.normal.push(o[(s-1)*3+1]),t.normal.push(o[(s-1)*3+2]),t.normal.push(o[s*3]),t.normal.push(o[s*3+1]),t.normal.push(o[s*3+2])),r.uv&&r.uv.forEach(function(f,m){t.uvs[m]===void 0&&(t.uvs[m]=[]),t.uvs[m].push(i[m][0]),t.uvs[m].push(i[m][1]),t.uvs[m].push(i[m][(s-1)*2]),t.uvs[m].push(i[m][(s-1)*2+1]),t.uvs[m].push(i[m][s*2]),t.uvs[m].push(i[m][s*2+1])})}addMorphTargets(t,r,e,n){if(e.length===0)return;t.morphTargetsRelative=!0,t.morphAttributes.position=[];const o=this;e.forEach(function(a){a.rawTargets.forEach(function(i){const c=_.Objects.Geometry[i.geoID];c!==void 0&&o.genMorphGeometry(t,r,c,n,i.name)})})}genMorphGeometry(t,r,e,n,o){const a=r.PolygonVertexIndex!==void 0?r.PolygonVertexIndex.a:[],i=e.Vertices!==void 0?e.Vertices.a:[],c=e.Indexes!==void 0?e.Indexes.a:[],d=t.attributes.position.count*3,u=new Float32Array(d);for(let v=0;v<c.length;v++){const y=c[v]*3;u[y]=i[v*3],u[y+1]=i[v*3+1],u[y+2]=i[v*3+2]}const s={vertexIndices:a,vertexPositions:u},f=this.genBuffers(s),m=new ue(f.vertex,3);m.name=o||e.attrName,m.applyMatrix4(n),t.morphAttributes.position.push(m)}parseNormals(t){const r=t.MappingInformationType,e=t.ReferenceInformationType,n=t.Normals.a;let o=[];return e==="IndexToDirect"&&("NormalIndex"in t?o=t.NormalIndex.a:"NormalsIndex"in t&&(o=t.NormalsIndex.a)),{dataSize:3,buffer:n,indices:o,mappingType:r,referenceType:e}}parseUVs(t){const r=t.MappingInformationType,e=t.ReferenceInformationType,n=t.UV.a;let o=[];return e==="IndexToDirect"&&(o=t.UVIndex.a),{dataSize:2,buffer:n,indices:o,mappingType:r,referenceType:e}}parseVertexColors(t){const r=t.MappingInformationType,e=t.ReferenceInformationType,n=t.Colors.a;let o=[];return e==="IndexToDirect"&&(o=t.ColorIndex.a),{dataSize:4,buffer:n,indices:o,mappingType:r,referenceType:e}}parseMaterialIndices(t){const r=t.MappingInformationType,e=t.ReferenceInformationType;if(r==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:e};const n=t.Materials.a,o=[];for(let a=0;a<n.length;++a)o.push(a);return{dataSize:1,buffer:n,indices:o,mappingType:r,referenceType:e}}parseNurbsGeometry(t){if(Vt===void 0)return console.error("THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."),new De;const r=parseInt(t.Order);if(isNaN(r))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",t.Order,t.id),new De;const e=r-1,n=t.KnotVector.a,o=[],a=t.Points.a;for(let s=0,f=a.length;s<f;s+=4)o.push(new at().fromArray(a,s));let i,c;if(t.Form==="Closed")o.push(o[0]);else if(t.Form==="Periodic"){i=e,c=n.length-1-i;for(let s=0;s<e;++s)o.push(o[s])}const u=new Vt(e,n,o,i,c).getPoints(o.length*12);return new De().setFromPoints(u)}}class Bn{parse(){const t=[],r=this.parseClips();if(r!==void 0)for(const e in r){const n=r[e],o=this.addClip(n);t.push(o)}return t}parseClips(){if(_.Objects.AnimationCurve===void 0)return;const t=this.parseAnimationCurveNodes();this.parseAnimationCurves(t);const r=this.parseAnimationLayers(t);return this.parseAnimStacks(r)}parseAnimationCurveNodes(){const t=_.Objects.AnimationCurveNode,r=new Map;for(const e in t){const n=t[e];if(n.attrName.match(/S|R|T|DeformPercent/)!==null){const o={id:n.id,attr:n.attrName,curves:{}};r.set(o.id,o)}}return r}parseAnimationCurves(t){const r=_.Objects.AnimationCurve;for(const e in r){const n={id:r[e].id,times:r[e].KeyTime.a.map(Un),values:r[e].KeyValueFloat.a},o=$.get(n.id);if(o!==void 0){const a=o.parents[0].ID,i=o.parents[0].relationship;i.match(/X/)?t.get(a).curves.x=n:i.match(/Y/)?t.get(a).curves.y=n:i.match(/Z/)?t.get(a).curves.z=n:i.match(/d|DeformPercent/)&&t.has(a)&&(t.get(a).curves.morph=n)}}}parseAnimationLayers(t){const r=_.Objects.AnimationLayer,e=new Map;for(const n in r){const o=[],a=$.get(parseInt(n));a!==void 0&&(a.children.forEach(function(c,d){if(t.has(c.ID)){const u=t.get(c.ID);if(u.curves.x!==void 0||u.curves.y!==void 0||u.curves.z!==void 0){if(o[d]===void 0){const s=$.get(c.ID).parents.filter(function(f){return f.relationship!==void 0})[0].ID;if(s!==void 0){const f=_.Objects.Model[s.toString()];if(f===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",c);return}const m={modelName:f.attrName?rt.sanitizeNodeName(f.attrName):"",ID:f.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};ae.traverse(function(v){v.ID===f.id&&(m.transform=v.matrix,v.userData.transformData&&(m.eulerOrder=v.userData.transformData.eulerOrder))}),m.transform||(m.transform=new K),"PreRotation"in f&&(m.preRotation=f.PreRotation.value),"PostRotation"in f&&(m.postRotation=f.PostRotation.value),o[d]=m}}o[d]&&(o[d][u.attr]=u)}else if(u.curves.morph!==void 0){if(o[d]===void 0){const s=$.get(c.ID).parents.filter(function(b){return b.relationship!==void 0})[0].ID,f=$.get(s).parents[0].ID,m=$.get(f).parents[0].ID,v=$.get(m).parents[0].ID,y=_.Objects.Model[v],E={modelName:y.attrName?rt.sanitizeNodeName(y.attrName):"",morphName:_.Objects.Deformer[s].attrName};o[d]=E}o[d][u.attr]=u}}}),e.set(parseInt(n),o))}return e}parseAnimStacks(t){const r=_.Objects.AnimationStack,e={};for(const n in r){const o=$.get(parseInt(n)).children;o.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const a=t.get(o[0].ID);e[n]={name:r[n].attrName,layer:a}}return e}addClip(t){let r=[];const e=this;return t.layer.forEach(function(n){r=r.concat(e.generateTracks(n))}),new Gr(t.name,-1,r)}generateTracks(t){const r=[];let e=new G,n=new Ie,o=new G;if(t.transform&&t.transform.decompose(e,n,o),e=e.toArray(),n=new Ze().setFromQuaternion(n,t.eulerOrder).toArray(),o=o.toArray(),t.T!==void 0&&Object.keys(t.T.curves).length>0){const a=this.generateVectorTrack(t.modelName,t.T.curves,e,"position");a!==void 0&&r.push(a)}if(t.R!==void 0&&Object.keys(t.R.curves).length>0){const a=this.generateRotationTrack(t.modelName,t.R.curves,n,t.preRotation,t.postRotation,t.eulerOrder);a!==void 0&&r.push(a)}if(t.S!==void 0&&Object.keys(t.S.curves).length>0){const a=this.generateVectorTrack(t.modelName,t.S.curves,o,"scale");a!==void 0&&r.push(a)}if(t.DeformPercent!==void 0){const a=this.generateMorphTrack(t);a!==void 0&&r.push(a)}return r}generateVectorTrack(t,r,e,n){const o=this.getTimesForAllAxes(r),a=this.getKeyframeTrackValues(o,r,e);return new Wr(t+"."+n,o,a)}generateRotationTrack(t,r,e,n,o,a){r.x!==void 0&&(this.interpolateRotations(r.x),r.x.values=r.x.values.map(pe.degToRad)),r.y!==void 0&&(this.interpolateRotations(r.y),r.y.values=r.y.values.map(pe.degToRad)),r.z!==void 0&&(this.interpolateRotations(r.z),r.z.values=r.z.values.map(pe.degToRad));const i=this.getTimesForAllAxes(r),c=this.getKeyframeTrackValues(i,r,e);n!==void 0&&(n=n.map(pe.degToRad),n.push(a),n=new Ze().fromArray(n),n=new Ie().setFromEuler(n)),o!==void 0&&(o=o.map(pe.degToRad),o.push(a),o=new Ze().fromArray(o),o=new Ie().setFromEuler(o).invert());const d=new Ie,u=new Ze,s=[];for(let f=0;f<c.length;f+=3)u.set(c[f],c[f+1],c[f+2],a),d.setFromEuler(u),n!==void 0&&d.premultiply(n),o!==void 0&&d.multiply(o),d.toArray(s,f/3*4);return new Nr(t+".quaternion",i,s)}generateMorphTrack(t){const r=t.DeformPercent.curves.morph,e=r.values.map(function(o){return o/100}),n=ae.getObjectByName(t.modelName).morphTargetDictionary[t.morphName];return new Kr(t.modelName+".morphTargetInfluences["+n+"]",r.times,e)}getTimesForAllAxes(t){let r=[];if(t.x!==void 0&&(r=r.concat(t.x.times)),t.y!==void 0&&(r=r.concat(t.y.times)),t.z!==void 0&&(r=r.concat(t.z.times)),r=r.sort(function(e,n){return e-n}),r.length>1){let e=1,n=r[0];for(let o=1;o<r.length;o++){const a=r[o];a!==n&&(r[e]=a,n=a,e++)}r=r.slice(0,e)}return r}getKeyframeTrackValues(t,r,e){const n=e,o=[];let a=-1,i=-1,c=-1;return t.forEach(function(d){if(r.x&&(a=r.x.times.indexOf(d)),r.y&&(i=r.y.times.indexOf(d)),r.z&&(c=r.z.times.indexOf(d)),a!==-1){const u=r.x.values[a];o.push(u),n[0]=u}else o.push(n[0]);if(i!==-1){const u=r.y.values[i];o.push(u),n[1]=u}else o.push(n[1]);if(c!==-1){const u=r.z.values[c];o.push(u),n[2]=u}else o.push(n[2])}),o}interpolateRotations(t){for(let r=1;r<t.values.length;r++){const e=t.values[r-1],n=t.values[r]-e,o=Math.abs(n);if(o>=180){const a=o/180,i=n/a;let c=e+i;const d=t.times[r-1],s=(t.times[r]-d)/a;let f=d+s;const m=[],v=[];for(;f<t.times[r];)m.push(f),f+=s,v.push(c),c+=i;t.times=Gt(t.times,r,m),t.values=Gt(t.values,r,v)}}}}class Zn{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(t){this.nodeStack.push(t),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(t,r){this.currentProp=t,this.currentPropName=r}parse(t){this.currentIndent=0,this.allNodes=new lr,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const r=this,e=t.split(/[\r\n]+/);return e.forEach(function(n,o){const a=n.match(/^[\s\t]*;/),i=n.match(/^[\s\t]*$/);if(a||i)return;const c=n.match("^\\t{"+r.currentIndent+"}(\\w+):(.*){",""),d=n.match("^\\t{"+r.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),u=n.match("^\\t{"+(r.currentIndent-1)+"}}");c?r.parseNodeBegin(n,c):d?r.parseNodeProperty(n,d,e[++o]):u?r.popStack():n.match(/^[^\s\t}]/)&&r.parseNodePropertyContinued(n)}),this.allNodes}parseNodeBegin(t,r){const e=r[1].trim().replace(/^"/,"").replace(/"$/,""),n=r[2].split(",").map(function(c){return c.trim().replace(/^"/,"").replace(/"$/,"")}),o={name:e},a=this.parseNodeAttr(n),i=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(e,o):e in i?(e==="PoseNode"?i.PoseNode.push(o):i[e].id!==void 0&&(i[e]={},i[e][i[e].id]=i[e]),a.id!==""&&(i[e][a.id]=o)):typeof a.id=="number"?(i[e]={},i[e][a.id]=o):e!=="Properties70"&&(e==="PoseNode"?i[e]=[o]:i[e]=o),typeof a.id=="number"&&(o.id=a.id),a.name!==""&&(o.attrName=a.name),a.type!==""&&(o.attrType=a.type),this.pushStack(o)}parseNodeAttr(t){let r=t[0];t[0]!==""&&(r=parseInt(t[0]),isNaN(r)&&(r=t[0]));let e="",n="";return t.length>1&&(e=t[1].replace(/^(\w+)::/,""),n=t[2]),{id:r,name:e,type:n}}parseNodeProperty(t,r,e){let n=r[1].replace(/^"/,"").replace(/"$/,"").trim(),o=r[2].replace(/^"/,"").replace(/"$/,"").trim();n==="Content"&&o===","&&(o=e.replace(/"/g,"").replace(/,$/,"").trim());const a=this.getCurrentNode();if(a.name==="Properties70"){this.parseNodeSpecialProperty(t,n,o);return}if(n==="C"){const c=o.split(",").slice(1),d=parseInt(c[0]),u=parseInt(c[1]);let s=o.split(",").slice(3);s=s.map(function(f){return f.trim().replace(/^"/,"")}),n="connections",o=[d,u],Wn(o,s),a[n]===void 0&&(a[n]=[])}n==="Node"&&(a.id=o),n in a&&Array.isArray(a[n])?a[n].push(o):n!=="a"?a[n]=o:a.a=o,this.setCurrentProp(a,n),n==="a"&&o.slice(-1)!==","&&(a.a=vt(o))}parseNodePropertyContinued(t){const r=this.getCurrentNode();r.a+=t,t.slice(-1)!==","&&(r.a=vt(r.a))}parseNodeSpecialProperty(t,r,e){const n=e.split('",').map(function(u){return u.trim().replace(/^\"/,"").replace(/\s/,"_")}),o=n[0],a=n[1],i=n[2],c=n[3];let d=n[4];switch(a){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":d=parseFloat(d);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":d=vt(d);break}this.getPrevNode()[o]={type:a,type2:i,flag:c,value:d},this.setCurrentProp(this.getPrevNode(),o)}}class Xn{parse(t){const r=new Yt(t);r.skip(23);const e=r.getUint32();if(e<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+e);const n=new lr;for(;!this.endOfContent(r);){const o=this.parseNode(r,e);o!==null&&n.add(o.name,o)}return n}endOfContent(t){return t.size()%16===0?(t.getOffset()+160+16&-16)>=t.size():t.getOffset()+160+16>=t.size()}parseNode(t,r){const e={},n=r>=7500?t.getUint64():t.getUint32(),o=r>=7500?t.getUint64():t.getUint32();r>=7500?t.getUint64():t.getUint32();const a=t.getUint8(),i=t.getString(a);if(n===0)return null;const c=[];for(let f=0;f<o;f++)c.push(this.parseProperty(t));const d=c.length>0?c[0]:"",u=c.length>1?c[1]:"",s=c.length>2?c[2]:"";for(e.singleProperty=o===1&&t.getOffset()===n;n>t.getOffset();){const f=this.parseNode(t,r);f!==null&&this.parseSubNode(i,e,f)}return e.propertyList=c,typeof d=="number"&&(e.id=d),u!==""&&(e.attrName=u),s!==""&&(e.attrType=s),i!==""&&(e.name=i),e}parseSubNode(t,r,e){if(e.singleProperty===!0){const n=e.propertyList[0];Array.isArray(n)?(r[e.name]=e,e.a=n):r[e.name]=n}else if(t==="Connections"&&e.name==="C"){const n=[];e.propertyList.forEach(function(o,a){a!==0&&n.push(o)}),r.connections===void 0&&(r.connections=[]),r.connections.push(n)}else if(e.name==="Properties70")Object.keys(e).forEach(function(o){r[o]=e[o]});else if(t==="Properties70"&&e.name==="P"){let n=e.propertyList[0],o=e.propertyList[1];const a=e.propertyList[2],i=e.propertyList[3];let c;n.indexOf("Lcl ")===0&&(n=n.replace("Lcl ","Lcl_")),o.indexOf("Lcl ")===0&&(o=o.replace("Lcl ","Lcl_")),o==="Color"||o==="ColorRGB"||o==="Vector"||o==="Vector3D"||o.indexOf("Lcl_")===0?c=[e.propertyList[4],e.propertyList[5],e.propertyList[6]]:c=e.propertyList[4],r[n]={type:o,type2:a,flag:i,value:c}}else r[e.name]===void 0?typeof e.id=="number"?(r[e.name]={},r[e.name][e.id]=e):r[e.name]=e:e.name==="PoseNode"?(Array.isArray(r[e.name])||(r[e.name]=[r[e.name]]),r[e.name].push(e)):r[e.name][e.id]===void 0&&(r[e.name][e.id]=e)}parseProperty(t){const r=t.getString(1);let e;switch(r){case"C":return t.getBoolean();case"D":return t.getFloat64();case"F":return t.getFloat32();case"I":return t.getInt32();case"L":return t.getInt64();case"R":return e=t.getUint32(),t.getArrayBuffer(e);case"S":return e=t.getUint32(),t.getString(e);case"Y":return t.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const n=t.getUint32(),o=t.getUint32(),a=t.getUint32();if(o===0)switch(r){case"b":case"c":return t.getBooleanArray(n);case"d":return t.getFloat64Array(n);case"f":return t.getFloat32Array(n);case"i":return t.getInt32Array(n);case"l":return t.getInt64Array(n)}const i=nn(new Uint8Array(t.getArrayBuffer(a))),c=new Yt(i.buffer);switch(r){case"b":case"c":return c.getBooleanArray(n);case"d":return c.getFloat64Array(n);case"f":return c.getFloat32Array(n);case"i":return c.getInt32Array(n);case"l":return c.getInt64Array(n)}default:throw new Error("THREE.FBXLoader: Unknown property type "+r)}}}class Yt{constructor(t,r){this.dv=new DataView(t),this.offset=0,this.littleEndian=r!==void 0?r:!0}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(t){this.offset+=t}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(t){const r=[];for(let e=0;e<t;e++)r.push(this.getBoolean());return r}getUint8(){const t=this.dv.getUint8(this.offset);return this.offset+=1,t}getInt16(){const t=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,t}getInt32(){const t=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,t}getInt32Array(t){const r=[];for(let e=0;e<t;e++)r.push(this.getInt32());return r}getUint32(){const t=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,t}getInt64(){let t,r;return this.littleEndian?(t=this.getUint32(),r=this.getUint32()):(r=this.getUint32(),t=this.getUint32()),r&2147483648?(r=~r&4294967295,t=~t&4294967295,t===4294967295&&(r=r+1&4294967295),t=t+1&4294967295,-(r*4294967296+t)):r*4294967296+t}getInt64Array(t){const r=[];for(let e=0;e<t;e++)r.push(this.getInt64());return r}getUint64(){let t,r;return this.littleEndian?(t=this.getUint32(),r=this.getUint32()):(r=this.getUint32(),t=this.getUint32()),r*4294967296+t}getFloat32(){const t=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,t}getFloat32Array(t){const r=[];for(let e=0;e<t;e++)r.push(this.getFloat32());return r}getFloat64(){const t=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,t}getFloat64Array(t){const r=[];for(let e=0;e<t;e++)r.push(this.getFloat64());return r}getArrayBuffer(t){const r=this.dv.buffer.slice(this.offset,this.offset+t);return this.offset+=t,r}getString(t){let r=[];for(let n=0;n<t;n++)r[n]=this.getUint8();const e=r.indexOf(0);return e>=0&&(r=r.slice(0,e)),ar(new Uint8Array(r))}}class lr{add(t,r){this[t]=r}}function Vn(l){const t="Kaydara FBX Binary  \0";return l.byteLength>=t.length&&t===dr(l,0,t.length)}function Yn(l){const t=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let r=0;function e(n){const o=l[n-1];return l=l.slice(r+n),r++,o}for(let n=0;n<t.length;++n)if(e(1)===t[n])return!1;return!0}function Ut(l){const t=/FBXVersion: (\d+)/,r=l.match(t);if(r)return parseInt(r[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function Un(l){return l/46186158e3}const Gn=[];function Je(l,t,r,e){let n;switch(e.mappingType){case"ByPolygonVertex":n=l;break;case"ByPolygon":n=t;break;case"ByVertice":n=r;break;case"AllSame":n=e.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+e.mappingType)}e.referenceType==="IndexToDirect"&&(n=e.indices[n]);const o=n*e.dataSize,a=o+e.dataSize;return Nn(Gn,e.buffer,o,a)}const ht=new Ze,Ae=new G;function ur(l){const t=new K,r=new K,e=new K,n=new K,o=new K,a=new K,i=new K,c=new K,d=new K,u=new K,s=new K,f=new K,m=l.inheritType?l.inheritType:0;if(l.translation&&t.setPosition(Ae.fromArray(l.translation)),l.preRotation){const R=l.preRotation.map(pe.degToRad);R.push(l.eulerOrder),r.makeRotationFromEuler(ht.fromArray(R))}if(l.rotation){const R=l.rotation.map(pe.degToRad);R.push(l.eulerOrder),e.makeRotationFromEuler(ht.fromArray(R))}if(l.postRotation){const R=l.postRotation.map(pe.degToRad);R.push(l.eulerOrder),n.makeRotationFromEuler(ht.fromArray(R)),n.invert()}l.scale&&o.scale(Ae.fromArray(l.scale)),l.scalingOffset&&i.setPosition(Ae.fromArray(l.scalingOffset)),l.scalingPivot&&a.setPosition(Ae.fromArray(l.scalingPivot)),l.rotationOffset&&c.setPosition(Ae.fromArray(l.rotationOffset)),l.rotationPivot&&d.setPosition(Ae.fromArray(l.rotationPivot)),l.parentMatrixWorld&&(s.copy(l.parentMatrix),u.copy(l.parentMatrixWorld));const v=r.clone().multiply(e).multiply(n),y=new K;y.extractRotation(u);const E=new K;E.copyPosition(u);const b=E.clone().invert().multiply(u),w=y.clone().invert().multiply(b),M=o,L=new K;if(m===0)L.copy(y).multiply(v).multiply(w).multiply(M);else if(m===1)L.copy(y).multiply(w).multiply(v).multiply(M);else{const H=new K().scale(new G().setFromMatrixScale(s)).clone().invert(),C=w.clone().multiply(H);L.copy(y).multiply(v).multiply(C).multiply(M)}const P=d.clone().invert(),h=a.clone().invert();let O=t.clone().multiply(c).multiply(d).multiply(r).multiply(e).multiply(n).multiply(P).multiply(i).multiply(a).multiply(o).multiply(h);const Z=new K().copyPosition(O),A=u.clone().multiply(Z);return f.copyPosition(A),O=f.clone().multiply(L),O.premultiply(u.invert()),O}function pr(l){l=l||0;const t=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return l===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),t[0]):t[l]}function vt(l){return l.split(",").map(function(r){return parseFloat(r)})}function dr(l,t,r){return t===void 0&&(t=0),r===void 0&&(r=l.byteLength),ar(new Uint8Array(l,t,r))}function Wn(l,t){for(let r=0,e=l.length,n=t.length;r<n;r++,e++)l[e]=t[r]}function Nn(l,t,r,e){for(let n=r,o=0;n<e;n++,o++)l[o]=t[n];return l}function Gt(l,t,r){return l.slice(0,t).concat(r).concat(l.slice(t))}const Kn=x.forwardRef(({makeDefault:l,camera:t,regress:r,domElement:e,enableDamping:n=!0,keyEvents:o=!1,onChange:a,onStart:i,onEnd:c,...d},u)=>{const s=le(h=>h.invalidate),f=le(h=>h.camera),m=le(h=>h.gl),v=le(h=>h.events),y=le(h=>h.setEvents),E=le(h=>h.set),b=le(h=>h.get),w=le(h=>h.performance),M=t||f,L=e||v.connected||m.domElement,P=x.useMemo(()=>new Sn(M),[M]);return Xe(()=>{P.enabled&&P.update()},-1),x.useEffect(()=>(o&&P.connect(o===!0?L:o),P.connect(L),()=>void P.dispose()),[o,L,r,P,s]),x.useEffect(()=>{const h=A=>{s(),r&&w.regress(),a&&a(A)},O=A=>{i&&i(A)},Z=A=>{c&&c(A)};return P.addEventListener("change",h),P.addEventListener("start",O),P.addEventListener("end",Z),()=>{P.removeEventListener("start",O),P.removeEventListener("end",Z),P.removeEventListener("change",h)}},[a,i,c,P,s,y]),x.useEffect(()=>{if(l){const h=b().controls;return E({controls:P}),()=>E({controls:h})}},[l,P]),x.createElement("primitive",Et({ref:u,object:P,enableDamping:n},d))});function Mt(l){return ot(Rt,l)}Mt.preload=l=>ot.preload(Rt,l);Mt.clear=l=>ot.clear(Rt,l);const $n=x.forwardRef(({scale:l=10,frames:t=1/0,opacity:r=1,width:e=1,height:n=1,blur:o=1,near:a=0,far:i=10,resolution:c=512,smooth:d=!0,color:u="#000000",depthWrite:s=!1,renderOrder:f,...m},v)=>{const y=x.useRef(null),E=le(I=>I.scene),b=le(I=>I.gl),w=x.useRef(null);e=e*(Array.isArray(l)?l[0]:l||1),n=n*(Array.isArray(l)?l[1]:l||1);const[M,L,P,h,O,Z,A]=x.useMemo(()=>{const I=new Ht(c,c),S=new Ht(c,c);S.texture.generateMipmaps=I.texture.generateMipmaps=!1;const F=new $r(e,n).rotateX(Math.PI/2),V=new nt(F),B=new Jr;B.depthTest=B.depthWrite=!1,B.onBeforeCompile=N=>{N.uniforms={...N.uniforms,ucolor:{value:new he(u)}},N.fragmentShader=N.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),N.fragmentShader=N.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};const Y=new Ft(An),X=new Ft(In);return X.depthTest=Y.depthTest=!1,[I,F,B,V,Y,X,S]},[c,e,n,l,u]),R=I=>{h.visible=!0,h.material=O,O.uniforms.tDiffuse.value=M.texture,O.uniforms.h.value=I*1/256,b.setRenderTarget(A),b.render(h,w.current),h.material=Z,Z.uniforms.tDiffuse.value=A.texture,Z.uniforms.v.value=I*1/256,b.setRenderTarget(M),b.render(h,w.current),h.visible=!1};let H=0,C,z;return Xe(()=>{w.current&&(t===1/0||H<t)&&(H++,C=E.background,z=E.overrideMaterial,y.current.visible=!1,E.background=null,E.overrideMaterial=P,b.setRenderTarget(M),b.render(E,w.current),R(o),d&&R(o*.4),b.setRenderTarget(null),y.current.visible=!0,E.overrideMaterial=z,E.background=C)}),x.useImperativeHandle(v,()=>y.current,[]),x.createElement("group",Et({"rotation-x":Math.PI/2},m,{ref:y}),x.createElement("mesh",{renderOrder:f,geometry:L,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},x.createElement("meshBasicMaterial",{transparent:!0,map:M.texture,opacity:r,depthWrite:s})),x.createElement("orthographicCamera",{ref:w,args:[-e/2,e/2,n/2,-n/2,a,i]}))}),Jn=/^[og]\s*(.+)?/,qn=/^mtllib /,Qn=/^usemtl /,eo=/^usemap /,Wt=/\s+/,Nt=new G,yt=new G,Kt=new G,$t=new G,se=new G,qe=new he;function to(){const l={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(t,r){if(this.object&&this.object.fromDeclaration===!1){this.object.name=t,this.object.fromDeclaration=r!==!1;return}const e=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:t||"",fromDeclaration:r!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(n,o){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const i={index:this.materials.length,name:n||"",mtllib:Array.isArray(o)&&o.length>0?o[o.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const d={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return d.clone=this.clone.bind(d),d}};return this.materials.push(i),i},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(n){const o=this.currentMaterial();if(o&&o.groupEnd===-1&&(o.groupEnd=this.geometry.vertices.length/3,o.groupCount=o.groupEnd-o.groupStart,o.inherited=!1),n&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return n&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),o}},e&&e.name&&typeof e.clone=="function"){const n=e.clone(0);n.inherited=!0,this.object.materials.push(n)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(t,r){const e=parseInt(t,10);return(e>=0?e-1:e+r/3)*3},parseNormalIndex:function(t,r){const e=parseInt(t,10);return(e>=0?e-1:e+r/3)*3},parseUVIndex:function(t,r){const e=parseInt(t,10);return(e>=0?e-1:e+r/2)*2},addVertex:function(t,r,e){const n=this.vertices,o=this.object.geometry.vertices;o.push(n[t+0],n[t+1],n[t+2]),o.push(n[r+0],n[r+1],n[r+2]),o.push(n[e+0],n[e+1],n[e+2])},addVertexPoint:function(t){const r=this.vertices;this.object.geometry.vertices.push(r[t+0],r[t+1],r[t+2])},addVertexLine:function(t){const r=this.vertices;this.object.geometry.vertices.push(r[t+0],r[t+1],r[t+2])},addNormal:function(t,r,e){const n=this.normals,o=this.object.geometry.normals;o.push(n[t+0],n[t+1],n[t+2]),o.push(n[r+0],n[r+1],n[r+2]),o.push(n[e+0],n[e+1],n[e+2])},addFaceNormal:function(t,r,e){const n=this.vertices,o=this.object.geometry.normals;Nt.fromArray(n,t),yt.fromArray(n,r),Kt.fromArray(n,e),se.subVectors(Kt,yt),$t.subVectors(Nt,yt),se.cross($t),se.normalize(),o.push(se.x,se.y,se.z),o.push(se.x,se.y,se.z),o.push(se.x,se.y,se.z)},addColor:function(t,r,e){const n=this.colors,o=this.object.geometry.colors;n[t]!==void 0&&o.push(n[t+0],n[t+1],n[t+2]),n[r]!==void 0&&o.push(n[r+0],n[r+1],n[r+2]),n[e]!==void 0&&o.push(n[e+0],n[e+1],n[e+2])},addUV:function(t,r,e){const n=this.uvs,o=this.object.geometry.uvs;o.push(n[t+0],n[t+1]),o.push(n[r+0],n[r+1]),o.push(n[e+0],n[e+1])},addDefaultUV:function(){const t=this.object.geometry.uvs;t.push(0,0),t.push(0,0),t.push(0,0)},addUVLine:function(t){const r=this.uvs;this.object.geometry.uvs.push(r[t+0],r[t+1])},addFace:function(t,r,e,n,o,a,i,c,d){const u=this.vertices.length;let s=this.parseVertexIndex(t,u),f=this.parseVertexIndex(r,u),m=this.parseVertexIndex(e,u);if(this.addVertex(s,f,m),this.addColor(s,f,m),i!==void 0&&i!==""){const v=this.normals.length;s=this.parseNormalIndex(i,v),f=this.parseNormalIndex(c,v),m=this.parseNormalIndex(d,v),this.addNormal(s,f,m)}else this.addFaceNormal(s,f,m);if(n!==void 0&&n!==""){const v=this.uvs.length;s=this.parseUVIndex(n,v),f=this.parseUVIndex(o,v),m=this.parseUVIndex(a,v),this.addUV(s,f,m),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(t){this.object.geometry.type="Points";const r=this.vertices.length;for(let e=0,n=t.length;e<n;e++){const o=this.parseVertexIndex(t[e],r);this.addVertexPoint(o),this.addColor(o)}},addLineGeometry:function(t,r){this.object.geometry.type="Line";const e=this.vertices.length,n=this.uvs.length;for(let o=0,a=t.length;o<a;o++)this.addVertexLine(this.parseVertexIndex(t[o],e));for(let o=0,a=r.length;o<a;o++)this.addUVLine(this.parseUVIndex(r[o],n))}};return l.startObject("",!1),l}class ro extends nr{constructor(t){super(t),this.materials=null}load(t,r,e,n){const o=this,a=new or(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(i){try{r(o.parse(i))}catch(c){n?n(c):console.error(c),o.manager.itemError(t)}},e,n)}setMaterials(t){return this.materials=t,this}parse(t){const r=new to;t.indexOf(`\r
`)!==-1&&(t=t.replace(/\r\n/g,`
`)),t.indexOf(`\\
`)!==-1&&(t=t.replace(/\\\n/g,""));const e=t.split(`
`);let n=[];for(let i=0,c=e.length;i<c;i++){const d=e[i].trimStart();if(d.length===0)continue;const u=d.charAt(0);if(u!=="#")if(u==="v"){const s=d.split(Wt);switch(s[0]){case"v":r.vertices.push(parseFloat(s[1]),parseFloat(s[2]),parseFloat(s[3])),s.length>=7?(qe.setRGB(parseFloat(s[4]),parseFloat(s[5]),parseFloat(s[6])).convertSRGBToLinear(),r.colors.push(qe.r,qe.g,qe.b)):r.colors.push(void 0,void 0,void 0);break;case"vn":r.normals.push(parseFloat(s[1]),parseFloat(s[2]),parseFloat(s[3]));break;case"vt":r.uvs.push(parseFloat(s[1]),parseFloat(s[2]));break}}else if(u==="f"){const f=d.slice(1).trim().split(Wt),m=[];for(let y=0,E=f.length;y<E;y++){const b=f[y];if(b.length>0){const w=b.split("/");m.push(w)}}const v=m[0];for(let y=1,E=m.length-1;y<E;y++){const b=m[y],w=m[y+1];r.addFace(v[0],b[0],w[0],v[1],b[1],w[1],v[2],b[2],w[2])}}else if(u==="l"){const s=d.substring(1).trim().split(" ");let f=[];const m=[];if(d.indexOf("/")===-1)f=s;else for(let v=0,y=s.length;v<y;v++){const E=s[v].split("/");E[0]!==""&&f.push(E[0]),E[1]!==""&&m.push(E[1])}r.addLineGeometry(f,m)}else if(u==="p"){const f=d.slice(1).trim().split(" ");r.addPointGeometry(f)}else if((n=Jn.exec(d))!==null){const s=(" "+n[0].slice(1).trim()).slice(1);r.startObject(s)}else if(Qn.test(d))r.object.startMaterial(d.substring(7).trim(),r.materialLibraries);else if(qn.test(d))r.materialLibraries.push(d.substring(7).trim());else if(eo.test(d))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(u==="s"){if(n=d.split(" "),n.length>1){const f=n[1].trim().toLowerCase();r.object.smooth=f!=="0"&&f!=="off"}else r.object.smooth=!0;const s=r.object.currentMaterial();s&&(s.smooth=r.object.smooth)}else{if(d==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+d+'"')}}r.finalize();const o=new gt;if(o.materialLibraries=[].concat(r.materialLibraries),!(r.objects.length===1&&r.objects[0].geometry.vertices.length===0)===!0)for(let i=0,c=r.objects.length;i<c;i++){const d=r.objects[i],u=d.geometry,s=d.materials,f=u.type==="Line",m=u.type==="Points";let v=!1;if(u.vertices.length===0)continue;const y=new De;y.setAttribute("position",new ue(u.vertices,3)),u.normals.length>0&&y.setAttribute("normal",new ue(u.normals,3)),u.colors.length>0&&(v=!0,y.setAttribute("color",new ue(u.colors,3))),u.hasUVIndices===!0&&y.setAttribute("uv",new ue(u.uvs,2));const E=[];for(let w=0,M=s.length;w<M;w++){const L=s[w],P=L.name+"_"+L.smooth+"_"+v;let h=r.materials[P];if(this.materials!==null){if(h=this.materials.create(L.name),f&&h&&!(h instanceof et)){const O=new et;kt.prototype.copy.call(O,h),O.color.copy(h.color),h=O}else if(m&&h&&!(h instanceof Ke)){const O=new Ke({size:10,sizeAttenuation:!1});kt.prototype.copy.call(O,h),O.color.copy(h.color),O.map=h.map,h=O}}h===void 0&&(f?h=new et:m?h=new Ke({size:1,sizeAttenuation:!1}):h=new Qe,h.name=L.name,h.flatShading=!L.smooth,h.vertexColors=v,r.materials[P]=h),E.push(h)}let b;if(E.length>1){for(let w=0,M=s.length;w<M;w++){const L=s[w];y.addGroup(L.groupStart,L.groupCount,w)}f?b=new _t(y,E):m?b=new mt(y,E):b=new nt(y,E)}else f?b=new _t(y,E[0]):m?b=new mt(y,E[0]):b=new nt(y,E[0]);b.name=d.name,o.add(b)}else if(r.vertices.length>0){const i=new Ke({size:1,sizeAttenuation:!1}),c=new De;c.setAttribute("position",new ue(r.vertices,3)),r.colors.length>0&&r.colors[0]!==void 0&&(c.setAttribute("color",new ue(r.colors,3)),i.vertexColors=!0);const d=new mt(c,i);o.add(d)}return o}}const tt=typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0),bt=l=>l*Math.PI/180,Jt=8,Ee=.005,qt=.925,Qt=.05,er=.12,tr=bt(6),rr=.15,no=({placeholderSrc:l})=>{const{progress:t,active:r}=xn();return!r&&l?null:j.jsx(hn,{center:!0,children:l?j.jsx("img",{src:l,width:128,height:128,style:{filter:"blur(8px)",borderRadius:8}}):`${Math.round(t)} %`})},oo=({pivot:l,min:t,max:r,zoomEnabled:e})=>{const n=x.useRef(null);return Xe(()=>{var o;return(o=n.current)==null?void 0:o.target.copy(l)}),j.jsx(Kn,{ref:n,makeDefault:!0,enablePan:!1,enableRotate:!1,enableZoom:e,minDistance:t,maxDistance:r})},ao=({url:l,xOff:t,yOff:r,pivot:e,initYaw:n,initPitch:o,minZoom:a,maxZoom:i,enableMouseParallax:c,enableManualRotation:d,enableHoverRotation:u,enableManualZoom:s,autoFrame:f,fadeIn:m,autoRotate:v,autoRotateSpeed:y,onLoaded:E})=>{const b=x.useRef(null),w=x.useRef(null),{camera:M,gl:L}=le(),P=x.useRef({x:0,y:0}),h=x.useRef({x:0,y:0}),O=x.useRef({x:0,y:0}),Z=x.useRef({x:0,y:0}),A=x.useRef({x:0,y:0}),R=x.useMemo(()=>l.split(".").pop().toLowerCase(),[l]),H=x.useMemo(()=>R==="glb"||R==="gltf"?ir(l).scene.clone():R==="fbx"?Mt(l).clone():R==="obj"?ot(ro,l).clone():(console.error("Unsupported format:",R),null),[l,R]),C=x.useRef(new G);return x.useLayoutEffect(()=>{if(!H)return;const z=w.current;z.updateWorldMatrix(!0,!0);const I=new en().setFromObject(z).getBoundingSphere(new tn),S=1/(I.radius*2);if(z.position.set(-I.center.x,-I.center.y,-I.center.z),z.scale.setScalar(S),z.traverse(F=>{F.isMesh&&(F.castShadow=!0,F.receiveShadow=!0,m&&(F.material.transparent=!0,F.material.opacity=0))}),z.getWorldPosition(C.current),e.copy(C.current),b.current.rotation.set(o,n,0),f&&M.isPerspectiveCamera){const F=M,B=I.radius*S*1.2/Math.sin(F.fov*Math.PI/180/2);F.position.set(C.current.x,C.current.y,C.current.z+B),F.near=B/10,F.far=B*10,F.updateProjectionMatrix()}if(m){let F=0;const V=setInterval(()=>{F+=.05;const B=Math.min(F,1);z.traverse(Y=>{Y.isMesh&&(Y.material.opacity=B)}),we(),B===1&&(clearInterval(V),E==null||E())},16);return()=>clearInterval(V)}else E==null||E()},[H]),x.useEffect(()=>{if(!d||tt)return;const z=L.domElement;let I=!1,S=0,F=0;const V=X=>{X.pointerType!=="mouse"&&X.pointerType!=="pen"||(I=!0,S=X.clientX,F=X.clientY,window.addEventListener("pointerup",Y))},B=X=>{if(!I)return;const N=X.clientX-S,J=X.clientY-F;S=X.clientX,F=X.clientY,b.current.rotation.y+=N*Ee,b.current.rotation.x+=J*Ee,P.current={x:N*Ee,y:J*Ee},we()},Y=()=>I=!1;return z.addEventListener("pointerdown",V),z.addEventListener("pointermove",B),()=>{z.removeEventListener("pointerdown",V),z.removeEventListener("pointermove",B),window.removeEventListener("pointerup",Y)}},[L,d]),x.useEffect(()=>{if(!tt)return;const z=L.domElement,I=new Map;let S="idle",F=0,V=0,B=0,Y=0,X=0,N=0;const J=k=>{if(k.pointerType==="touch"){if(I.set(k.pointerId,{x:k.clientX,y:k.clientY}),I.size===1)S="decide",F=B=k.clientX,V=Y=k.clientY;else if(I.size===2&&s){S="pinch";const[oe,ne]=[...I.values()];X=Math.hypot(oe.x-ne.x,oe.y-ne.y),N=M.position.z,k.preventDefault()}we()}},Q=k=>{const oe=I.get(k.pointerId);if(oe){if(oe.x=k.clientX,oe.y=k.clientY,S==="decide"){const ne=k.clientX-F,ee=k.clientY-V;(Math.abs(ne)>Jt||Math.abs(ee)>Jt)&&(d&&Math.abs(ne)>Math.abs(ee)?(S="rotate",z.setPointerCapture(k.pointerId)):(S="idle",I.clear()))}if(S==="rotate"){k.preventDefault();const ne=k.clientX-B,ee=k.clientY-Y;B=k.clientX,Y=k.clientY,b.current.rotation.y+=ne*Ee,b.current.rotation.x+=ee*Ee,P.current={x:ne*Ee,y:ee*Ee},we()}else if(S==="pinch"&&I.size===2){k.preventDefault();const[ne,ee]=[...I.values()],Me=Math.hypot(ne.x-ee.x,ne.y-ee.y),te=X/Me;M.position.z=pe.clamp(N*te,a,i),we()}}},re=k=>{I.delete(k.pointerId),S==="rotate"&&I.size===0&&(S="idle"),S==="pinch"&&I.size<2&&(S="idle")};return z.addEventListener("pointerdown",J,{passive:!0}),window.addEventListener("pointermove",Q,{passive:!1}),window.addEventListener("pointerup",re,{passive:!0}),window.addEventListener("pointercancel",re,{passive:!0}),()=>{z.removeEventListener("pointerdown",J),window.removeEventListener("pointermove",Q),window.removeEventListener("pointerup",re),window.removeEventListener("pointercancel",re)}},[L,d,s,a,i]),x.useEffect(()=>{if(tt)return;const z=I=>{if(I.pointerType!=="mouse")return;const S=I.clientX/window.innerWidth*2-1,F=I.clientY/window.innerHeight*2-1;c&&(h.current={x:-S*Qt,y:-F*Qt}),u&&(Z.current={x:F*tr,y:S*tr}),we()};return window.addEventListener("pointermove",z),()=>window.removeEventListener("pointermove",z)},[c,u]),Xe((z,I)=>{let S=!1;O.current.x+=(h.current.x-O.current.x)*er,O.current.y+=(h.current.y-O.current.y)*er;const F=A.current.x,V=A.current.y;A.current.x+=(Z.current.x-A.current.x)*rr,A.current.y+=(Z.current.y-A.current.y)*rr;const B=C.current.clone().project(M);B.x+=t+O.current.x,B.y+=r+O.current.y,b.current.position.copy(B.unproject(M)),b.current.rotation.x+=A.current.x-F,b.current.rotation.y+=A.current.y-V,v&&(b.current.rotation.y+=y*I,S=!0),b.current.rotation.y+=P.current.x,b.current.rotation.x+=P.current.y,P.current.x*=qt,P.current.y*=qt,(Math.abs(P.current.x)>1e-4||Math.abs(P.current.y)>1e-4)&&(S=!0),(Math.abs(O.current.x-h.current.x)>1e-4||Math.abs(O.current.y-h.current.y)>1e-4||Math.abs(A.current.x-Z.current.x)>1e-4||Math.abs(A.current.y-Z.current.y)>1e-4)&&(S=!0),S&&we()}),H?j.jsx("group",{ref:b,children:j.jsx("group",{ref:w,children:j.jsx("primitive",{object:H})})}):null},io=({url:l,width:t=400,height:r=400,modelXOffset:e=0,modelYOffset:n=0,defaultRotationX:o=-50,defaultRotationY:a=20,defaultZoom:i=.5,minZoomDistance:c=.5,maxZoomDistance:d=10,enableMouseParallax:u=!0,enableManualRotation:s=!0,enableHoverRotation:f=!0,enableManualZoom:m=!0,ambientIntensity:v=.3,keyLightIntensity:y=1,fillLightIntensity:E=.5,rimLightIntensity:b=.8,environmentPreset:w="forest",autoFrame:M=!1,placeholderSrc:L,showScreenshotButton:P=!0,fadeIn:h=!1,autoRotate:O=!1,autoRotateSpeed:Z=.35,onModelLoaded:A})=>{x.useEffect(()=>void ir.preload(l),[l]);const R=x.useRef(new G).current,H=x.useRef(null),C=x.useRef(null),z=x.useRef(null),I=x.useRef(null),S=bt(o),F=bt(a),V=Math.min(Math.max(i,c),d),B=()=>{const Y=C.current,X=z.current,N=I.current;if(!Y||!X||!N)return;Y.shadowMap.enabled=!1;const J=[];X.traverse(k=>{k.isLight&&"castShadow"in k&&(J.push({l:k,cast:k.castShadow}),k.castShadow=!1)}),H.current&&(H.current.visible=!1),Y.render(X,N);const Q=Y.domElement.toDataURL("image/png"),re=document.createElement("a");re.download="model.png",re.href=Q,re.click(),Y.shadowMap.enabled=!0,J.forEach(({l:k,cast:oe})=>k.castShadow=oe),H.current&&(H.current.visible=!0),we()};return j.jsxs("div",{style:{width:t,height:r,touchAction:"pan-y pinch-zoom",position:"relative"},children:[P&&j.jsx("button",{onClick:B,style:{position:"absolute",border:"1px solid #fff",right:16,top:16,zIndex:10,cursor:"pointer",padding:"8px 16px",borderRadius:10},children:"Take Screenshot"}),j.jsxs(Ar,{shadows:!0,frameloop:"demand",gl:{preserveDrawingBuffer:!0},onCreated:({gl:Y,scene:X,camera:N})=>{C.current=Y,z.current=X,I.current=N,Y.toneMapping=qr,Y.outputColorSpace=Qr},camera:{fov:50,position:[0,0,V],near:.01,far:100},style:{touchAction:"pan-y pinch-zoom"},children:[w!=="none"&&j.jsx(on,{preset:w,background:!1}),j.jsx("ambientLight",{intensity:v}),j.jsx("directionalLight",{position:[5,5,5],intensity:y,castShadow:!0}),j.jsx("directionalLight",{position:[-5,2,5],intensity:E}),j.jsx("directionalLight",{position:[0,4,-5],intensity:b}),j.jsx($n,{ref:H,position:[0,-.5,0],opacity:.35,scale:10,blur:2}),j.jsx(x.Suspense,{fallback:j.jsx(no,{placeholderSrc:L}),children:j.jsx(ao,{url:l,xOff:e,yOff:n,pivot:R,initYaw:S,initPitch:F,minZoom:c,maxZoom:d,enableMouseParallax:u,enableManualRotation:s,enableHoverRotation:f,enableManualZoom:m,autoFrame:M,fadeIn:h,autoRotate:O,autoRotateSpeed:Z,onLoaded:A})}),!tt&&j.jsx(oo,{pivot:R,min:c,max:d,zoomEnabled:m})]})]})},so=`/* eslint-disable react-hooks/rules-of-hooks */\r
/* eslint-disable react/no-unknown-property */\r
import { Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';\r
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';\r
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';\r
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';\r
import * as THREE from 'three';\r
\r
const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);\r
const deg2rad = d => (d * Math.PI) / 180;\r
const DECIDE = 8;\r
const ROTATE_SPEED = 0.005;\r
const INERTIA = 0.925;\r
const PARALLAX_MAG = 0.05;\r
const PARALLAX_EASE = 0.12;\r
const HOVER_MAG = deg2rad(6);\r
const HOVER_EASE = 0.15;\r
\r
const Loader = ({ placeholderSrc }) => {\r
  const { progress, active } = useProgress();\r
  if (!active && placeholderSrc) return null;\r
  return (\r
    <Html center>\r
      {placeholderSrc ? (\r
        <img src={placeholderSrc} width={128} height={128} style={{ filter: 'blur(8px)', borderRadius: 8 }} />\r
      ) : (\r
        \`\${Math.round(progress)} %\`\r
      )}\r
    </Html>\r
  );\r
};\r
\r
const DesktopControls = ({ pivot, min, max, zoomEnabled }) => {\r
  const ref = useRef(null);\r
  useFrame(() => ref.current?.target.copy(pivot));\r
  return (\r
    <OrbitControls\r
      ref={ref}\r
      makeDefault\r
      enablePan={false}\r
      enableRotate={false}\r
      enableZoom={zoomEnabled}\r
      minDistance={min}\r
      maxDistance={max}\r
    />\r
  );\r
};\r
\r
const ModelInner = ({\r
  url,\r
  xOff,\r
  yOff,\r
  pivot,\r
  initYaw,\r
  initPitch,\r
  minZoom,\r
  maxZoom,\r
  enableMouseParallax,\r
  enableManualRotation,\r
  enableHoverRotation,\r
  enableManualZoom,\r
  autoFrame,\r
  fadeIn,\r
  autoRotate,\r
  autoRotateSpeed,\r
  onLoaded\r
}) => {\r
  const outer = useRef(null);\r
  const inner = useRef(null);\r
  const { camera, gl } = useThree();\r
\r
  const vel = useRef({ x: 0, y: 0 });\r
  const tPar = useRef({ x: 0, y: 0 });\r
  const cPar = useRef({ x: 0, y: 0 });\r
  const tHov = useRef({ x: 0, y: 0 });\r
  const cHov = useRef({ x: 0, y: 0 });\r
\r
  const ext = useMemo(() => url.split('.').pop().toLowerCase(), [url]);\r
  const content = useMemo(() => {\r
    if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();\r
    if (ext === 'fbx') return useFBX(url).clone();\r
    if (ext === 'obj') return useLoader(OBJLoader, url).clone();\r
    console.error('Unsupported format:', ext);\r
    return null;\r
  }, [url, ext]);\r
\r
  const pivotW = useRef(new THREE.Vector3());\r
  useLayoutEffect(() => {\r
    if (!content) return;\r
    const g = inner.current;\r
    g.updateWorldMatrix(true, true);\r
\r
    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());\r
    const s = 1 / (sphere.radius * 2);\r
    g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);\r
    g.scale.setScalar(s);\r
\r
    g.traverse(o => {\r
      if (o.isMesh) {\r
        o.castShadow = true;\r
        o.receiveShadow = true;\r
        if (fadeIn) {\r
          o.material.transparent = true;\r
          o.material.opacity = 0;\r
        }\r
      }\r
    });\r
\r
    g.getWorldPosition(pivotW.current);\r
    pivot.copy(pivotW.current);\r
    outer.current.rotation.set(initPitch, initYaw, 0);\r
\r
    if (autoFrame && camera.isPerspectiveCamera) {\r
      const persp = camera;\r
      const fitR = sphere.radius * s;\r
      const d = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);\r
      persp.position.set(pivotW.current.x, pivotW.current.y, pivotW.current.z + d);\r
      persp.near = d / 10;\r
      persp.far = d * 10;\r
      persp.updateProjectionMatrix();\r
    }\r
\r
    if (fadeIn) {\r
      let t = 0;\r
      const id = setInterval(() => {\r
        t += 0.05;\r
        const v = Math.min(t, 1);\r
        g.traverse(o => {\r
          if (o.isMesh) o.material.opacity = v;\r
        });\r
        invalidate();\r
        if (v === 1) {\r
          clearInterval(id);\r
          onLoaded?.();\r
        }\r
      }, 16);\r
      return () => clearInterval(id);\r
    } else onLoaded?.();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [content]);\r
\r
  useEffect(() => {\r
    if (!enableManualRotation || isTouch) return;\r
    const el = gl.domElement;\r
    let drag = false;\r
    let lx = 0,\r
      ly = 0;\r
    const down = e => {\r
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;\r
      drag = true;\r
      lx = e.clientX;\r
      ly = e.clientY;\r
      window.addEventListener('pointerup', up);\r
    };\r
    const move = e => {\r
      if (!drag) return;\r
      const dx = e.clientX - lx;\r
      const dy = e.clientY - ly;\r
      lx = e.clientX;\r
      ly = e.clientY;\r
      outer.current.rotation.y += dx * ROTATE_SPEED;\r
      outer.current.rotation.x += dy * ROTATE_SPEED;\r
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };\r
      invalidate();\r
    };\r
    const up = () => (drag = false);\r
    el.addEventListener('pointerdown', down);\r
    el.addEventListener('pointermove', move);\r
    return () => {\r
      el.removeEventListener('pointerdown', down);\r
      el.removeEventListener('pointermove', move);\r
      window.removeEventListener('pointerup', up);\r
    };\r
  }, [gl, enableManualRotation]);\r
\r
  useEffect(() => {\r
    if (!isTouch) return;\r
    const el = gl.domElement;\r
    const pts = new Map();\r
\r
    let mode = 'idle';\r
    let sx = 0,\r
      sy = 0,\r
      lx = 0,\r
      ly = 0,\r
      startDist = 0,\r
      startZ = 0;\r
\r
    const down = e => {\r
      if (e.pointerType !== 'touch') return;\r
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });\r
      if (pts.size === 1) {\r
        mode = 'decide';\r
        sx = lx = e.clientX;\r
        sy = ly = e.clientY;\r
      } else if (pts.size === 2 && enableManualZoom) {\r
        mode = 'pinch';\r
        const [p1, p2] = [...pts.values()];\r
        startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);\r
        startZ = camera.position.z;\r
        e.preventDefault();\r
      }\r
      invalidate();\r
    };\r
\r
    const move = e => {\r
      const p = pts.get(e.pointerId);\r
      if (!p) return;\r
      p.x = e.clientX;\r
      p.y = e.clientY;\r
\r
      if (mode === 'decide') {\r
        const dx = e.clientX - sx;\r
        const dy = e.clientY - sy;\r
        if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {\r
          if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {\r
            mode = 'rotate';\r
            el.setPointerCapture(e.pointerId);\r
          } else {\r
            mode = 'idle';\r
            pts.clear();\r
          }\r
        }\r
      }\r
\r
      if (mode === 'rotate') {\r
        e.preventDefault();\r
        const dx = e.clientX - lx;\r
        const dy = e.clientY - ly;\r
        lx = e.clientX;\r
        ly = e.clientY;\r
        outer.current.rotation.y += dx * ROTATE_SPEED;\r
        outer.current.rotation.x += dy * ROTATE_SPEED;\r
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };\r
        invalidate();\r
      } else if (mode === 'pinch' && pts.size === 2) {\r
        e.preventDefault();\r
        const [p1, p2] = [...pts.values()];\r
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);\r
        const ratio = startDist / d;\r
        camera.position.z = THREE.MathUtils.clamp(startZ * ratio, minZoom, maxZoom);\r
        invalidate();\r
      }\r
    };\r
\r
    const up = e => {\r
      pts.delete(e.pointerId);\r
      if (mode === 'rotate' && pts.size === 0) mode = 'idle';\r
      if (mode === 'pinch' && pts.size < 2) mode = 'idle';\r
    };\r
\r
    el.addEventListener('pointerdown', down, { passive: true });\r
    window.addEventListener('pointermove', move, { passive: false });\r
    window.addEventListener('pointerup', up, { passive: true });\r
    window.addEventListener('pointercancel', up, { passive: true });\r
    return () => {\r
      el.removeEventListener('pointerdown', down);\r
      window.removeEventListener('pointermove', move);\r
      window.removeEventListener('pointerup', up);\r
      window.removeEventListener('pointercancel', up);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [gl, enableManualRotation, enableManualZoom, minZoom, maxZoom]);\r
\r
  useEffect(() => {\r
    if (isTouch) return;\r
    const mm = e => {\r
      if (e.pointerType !== 'mouse') return;\r
      const nx = (e.clientX / window.innerWidth) * 2 - 1;\r
      const ny = (e.clientY / window.innerHeight) * 2 - 1;\r
      if (enableMouseParallax) tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };\r
      if (enableHoverRotation) tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };\r
      invalidate();\r
    };\r
    window.addEventListener('pointermove', mm);\r
    return () => window.removeEventListener('pointermove', mm);\r
  }, [enableMouseParallax, enableHoverRotation]);\r
\r
  useFrame((_, dt) => {\r
    let need = false;\r
    cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;\r
    cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;\r
    const phx = cHov.current.x,\r
      phy = cHov.current.y;\r
    cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;\r
    cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;\r
\r
    const ndc = pivotW.current.clone().project(camera);\r
    ndc.x += xOff + cPar.current.x;\r
    ndc.y += yOff + cPar.current.y;\r
    outer.current.position.copy(ndc.unproject(camera));\r
\r
    outer.current.rotation.x += cHov.current.x - phx;\r
    outer.current.rotation.y += cHov.current.y - phy;\r
\r
    if (autoRotate) {\r
      outer.current.rotation.y += autoRotateSpeed * dt;\r
      need = true;\r
    }\r
\r
    outer.current.rotation.y += vel.current.x;\r
    outer.current.rotation.x += vel.current.y;\r
    vel.current.x *= INERTIA;\r
    vel.current.y *= INERTIA;\r
    if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4) need = true;\r
\r
    if (\r
      Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||\r
      Math.abs(cPar.current.y - tPar.current.y) > 1e-4 ||\r
      Math.abs(cHov.current.x - tHov.current.x) > 1e-4 ||\r
      Math.abs(cHov.current.y - tHov.current.y) > 1e-4\r
    )\r
      need = true;\r
\r
    if (need) invalidate();\r
  });\r
\r
  if (!content) return null;\r
  return (\r
    <group ref={outer}>\r
      <group ref={inner}>\r
        <primitive object={content} />\r
      </group>\r
    </group>\r
  );\r
};\r
\r
const ModelViewer = ({\r
  url,\r
  width = 400,\r
  height = 400,\r
  modelXOffset = 0,\r
  modelYOffset = 0,\r
  defaultRotationX = -50,\r
  defaultRotationY = 20,\r
  defaultZoom = 0.5,\r
  minZoomDistance = 0.5,\r
  maxZoomDistance = 10,\r
  enableMouseParallax = true,\r
  enableManualRotation = true,\r
  enableHoverRotation = true,\r
  enableManualZoom = true,\r
  ambientIntensity = 0.3,\r
  keyLightIntensity = 1,\r
  fillLightIntensity = 0.5,\r
  rimLightIntensity = 0.8,\r
  environmentPreset = 'forest',\r
  autoFrame = false,\r
  placeholderSrc,\r
  showScreenshotButton = true,\r
  fadeIn = false,\r
  autoRotate = false,\r
  autoRotateSpeed = 0.35,\r
  onModelLoaded\r
}) => {\r
  useEffect(() => void useGLTF.preload(url), [url]);\r
  const pivot = useRef(new THREE.Vector3()).current;\r
  const contactRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const sceneRef = useRef(null);\r
  const cameraRef = useRef(null);\r
\r
  const initYaw = deg2rad(defaultRotationX);\r
  const initPitch = deg2rad(defaultRotationY);\r
  const camZ = Math.min(Math.max(defaultZoom, minZoomDistance), maxZoomDistance);\r
\r
  const capture = () => {\r
    const g = rendererRef.current,\r
      s = sceneRef.current,\r
      c = cameraRef.current;\r
    if (!g || !s || !c) return;\r
    g.shadowMap.enabled = false;\r
    const tmp = [];\r
    s.traverse(o => {\r
      if (o.isLight && 'castShadow' in o) {\r
        tmp.push({ l: o, cast: o.castShadow });\r
        o.castShadow = false;\r
      }\r
    });\r
    if (contactRef.current) contactRef.current.visible = false;\r
    g.render(s, c);\r
    const urlPNG = g.domElement.toDataURL('image/png');\r
    const a = document.createElement('a');\r
    a.download = 'model.png';\r
    a.href = urlPNG;\r
    a.click();\r
    g.shadowMap.enabled = true;\r
    tmp.forEach(({ l, cast }) => (l.castShadow = cast));\r
    if (contactRef.current) contactRef.current.visible = true;\r
    invalidate();\r
  };\r
\r
  return (\r
    <div\r
      style={{\r
        width,\r
        height,\r
        touchAction: 'pan-y pinch-zoom',\r
        position: 'relative'\r
      }}\r
    >\r
      {showScreenshotButton && (\r
        <button\r
          onClick={capture}\r
          style={{\r
            position: 'absolute',\r
            border: '1px solid #fff',\r
            right: 16,\r
            top: 16,\r
            zIndex: 10,\r
            cursor: 'pointer',\r
            padding: '8px 16px',\r
            borderRadius: 10\r
          }}\r
        >\r
          Take Screenshot\r
        </button>\r
      )}\r
\r
      <Canvas\r
        shadows\r
        frameloop="demand"\r
        gl={{ preserveDrawingBuffer: true }}\r
        onCreated={({ gl, scene, camera }) => {\r
          rendererRef.current = gl;\r
          sceneRef.current = scene;\r
          cameraRef.current = camera;\r
          gl.toneMapping = THREE.ACESFilmicToneMapping;\r
          gl.outputColorSpace = THREE.SRGBColorSpace;\r
        }}\r
        camera={{ fov: 50, position: [0, 0, camZ], near: 0.01, far: 100 }}\r
        style={{ touchAction: 'pan-y pinch-zoom' }}\r
      >\r
        {environmentPreset !== 'none' && <Environment preset={environmentPreset} background={false} />}\r
\r
        <ambientLight intensity={ambientIntensity} />\r
        <directionalLight position={[5, 5, 5]} intensity={keyLightIntensity} castShadow />\r
        <directionalLight position={[-5, 2, 5]} intensity={fillLightIntensity} />\r
        <directionalLight position={[0, 4, -5]} intensity={rimLightIntensity} />\r
\r
        <ContactShadows ref={contactRef} position={[0, -0.5, 0]} opacity={0.35} scale={10} blur={2} />\r
\r
        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>\r
          <ModelInner\r
            url={url}\r
            xOff={modelXOffset}\r
            yOff={modelYOffset}\r
            pivot={pivot}\r
            initYaw={initYaw}\r
            initPitch={initPitch}\r
            minZoom={minZoomDistance}\r
            maxZoom={maxZoomDistance}\r
            enableMouseParallax={enableMouseParallax}\r
            enableManualRotation={enableManualRotation}\r
            enableHoverRotation={enableHoverRotation}\r
            enableManualZoom={enableManualZoom}\r
            autoFrame={autoFrame}\r
            fadeIn={fadeIn}\r
            autoRotate={autoRotate}\r
            autoRotateSpeed={autoRotateSpeed}\r
            onLoaded={onModelLoaded}\r
          />\r
        </Suspense>\r
\r
        {!isTouch && (\r
          <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} />\r
        )}\r
      </Canvas>\r
    </div>\r
  );\r
};\r
\r
export default ModelViewer;\r
`,co=`/* eslint-disable react-hooks/rules-of-hooks */\r
/* eslint-disable react/no-unknown-property */\r
import { Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';\r
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';\r
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';\r
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';\r
import * as THREE from 'three';\r
\r
const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);\r
const deg2rad = d => (d * Math.PI) / 180;\r
const DECIDE = 8;\r
const ROTATE_SPEED = 0.005;\r
const INERTIA = 0.925;\r
const PARALLAX_MAG = 0.05;\r
const PARALLAX_EASE = 0.12;\r
const HOVER_MAG = deg2rad(6);\r
const HOVER_EASE = 0.15;\r
\r
const Loader = ({ placeholderSrc }) => {\r
  const { progress, active } = useProgress();\r
  if (!active && placeholderSrc) return null;\r
  return (\r
    <Html center>\r
      {placeholderSrc ? (\r
        <img src={placeholderSrc} width={128} height={128} className="blur-lg rounded-lg" />\r
      ) : (\r
        \`\${Math.round(progress)} %\`\r
      )}\r
    </Html>\r
  );\r
};\r
\r
const DesktopControls = ({ pivot, min, max, zoomEnabled }) => {\r
  const ref = useRef(null);\r
  useFrame(() => ref.current?.target.copy(pivot));\r
  return (\r
    <OrbitControls\r
      ref={ref}\r
      makeDefault\r
      enablePan={false}\r
      enableRotate={false}\r
      enableZoom={zoomEnabled}\r
      minDistance={min}\r
      maxDistance={max}\r
    />\r
  );\r
};\r
\r
const ModelInner = ({\r
  url,\r
  xOff,\r
  yOff,\r
  pivot,\r
  initYaw,\r
  initPitch,\r
  minZoom,\r
  maxZoom,\r
  enableMouseParallax,\r
  enableManualRotation,\r
  enableHoverRotation,\r
  enableManualZoom,\r
  autoFrame,\r
  fadeIn,\r
  autoRotate,\r
  autoRotateSpeed,\r
  onLoaded\r
}) => {\r
  const outer = useRef(null);\r
  const inner = useRef(null);\r
  const { camera, gl } = useThree();\r
\r
  const vel = useRef({ x: 0, y: 0 });\r
  const tPar = useRef({ x: 0, y: 0 });\r
  const cPar = useRef({ x: 0, y: 0 });\r
  const tHov = useRef({ x: 0, y: 0 });\r
  const cHov = useRef({ x: 0, y: 0 });\r
\r
  const ext = useMemo(() => url.split('.').pop().toLowerCase(), [url]);\r
  const content = useMemo(() => {\r
    if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();\r
    if (ext === 'fbx') return useFBX(url).clone();\r
    if (ext === 'obj') return useLoader(OBJLoader, url).clone();\r
    console.error('Unsupported format:', ext);\r
    return null;\r
  }, [url, ext]);\r
\r
  const pivotW = useRef(new THREE.Vector3());\r
  useLayoutEffect(() => {\r
    if (!content) return;\r
    const g = inner.current;\r
    g.updateWorldMatrix(true, true);\r
\r
    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());\r
    const s = 1 / (sphere.radius * 2);\r
    g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);\r
    g.scale.setScalar(s);\r
\r
    g.traverse(o => {\r
      if (o.isMesh) {\r
        o.castShadow = true;\r
        o.receiveShadow = true;\r
        if (fadeIn) {\r
          o.material.transparent = true;\r
          o.material.opacity = 0;\r
        }\r
      }\r
    });\r
\r
    g.getWorldPosition(pivotW.current);\r
    pivot.copy(pivotW.current);\r
    outer.current.rotation.set(initPitch, initYaw, 0);\r
\r
    if (autoFrame && camera.isPerspectiveCamera) {\r
      const persp = camera;\r
      const fitR = sphere.radius * s;\r
      const d = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);\r
      persp.position.set(pivotW.current.x, pivotW.current.y, pivotW.current.z + d);\r
      persp.near = d / 10;\r
      persp.far = d * 10;\r
      persp.updateProjectionMatrix();\r
    }\r
\r
    if (fadeIn) {\r
      let t = 0;\r
      const id = setInterval(() => {\r
        t += 0.05;\r
        const v = Math.min(t, 1);\r
        g.traverse(o => {\r
          if (o.isMesh) o.material.opacity = v;\r
        });\r
        invalidate();\r
        if (v === 1) {\r
          clearInterval(id);\r
          onLoaded?.();\r
        }\r
      }, 16);\r
      return () => clearInterval(id);\r
    } else onLoaded?.();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [content]);\r
\r
  useEffect(() => {\r
    if (!enableManualRotation || isTouch) return;\r
    const el = gl.domElement;\r
    let drag = false;\r
    let lx = 0,\r
      ly = 0;\r
    const down = e => {\r
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;\r
      drag = true;\r
      lx = e.clientX;\r
      ly = e.clientY;\r
      window.addEventListener('pointerup', up);\r
    };\r
    const move = e => {\r
      if (!drag) return;\r
      const dx = e.clientX - lx;\r
      const dy = e.clientY - ly;\r
      lx = e.clientX;\r
      ly = e.clientY;\r
      outer.current.rotation.y += dx * ROTATE_SPEED;\r
      outer.current.rotation.x += dy * ROTATE_SPEED;\r
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };\r
      invalidate();\r
    };\r
    const up = () => (drag = false);\r
    el.addEventListener('pointerdown', down);\r
    el.addEventListener('pointermove', move);\r
    return () => {\r
      el.removeEventListener('pointerdown', down);\r
      el.removeEventListener('pointermove', move);\r
      window.removeEventListener('pointerup', up);\r
    };\r
  }, [gl, enableManualRotation]);\r
\r
  useEffect(() => {\r
    if (!isTouch) return;\r
    const el = gl.domElement;\r
    const pts = new Map();\r
\r
    let mode = 'idle';\r
    let sx = 0,\r
      sy = 0,\r
      lx = 0,\r
      ly = 0,\r
      startDist = 0,\r
      startZ = 0;\r
\r
    const down = e => {\r
      if (e.pointerType !== 'touch') return;\r
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });\r
      if (pts.size === 1) {\r
        mode = 'decide';\r
        sx = lx = e.clientX;\r
        sy = ly = e.clientY;\r
      } else if (pts.size === 2 && enableManualZoom) {\r
        mode = 'pinch';\r
        const [p1, p2] = [...pts.values()];\r
        startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);\r
        startZ = camera.position.z;\r
        e.preventDefault();\r
      }\r
      invalidate();\r
    };\r
\r
    const move = e => {\r
      const p = pts.get(e.pointerId);\r
      if (!p) return;\r
      p.x = e.clientX;\r
      p.y = e.clientY;\r
\r
      if (mode === 'decide') {\r
        const dx = e.clientX - sx;\r
        const dy = e.clientY - sy;\r
        if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {\r
          if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {\r
            mode = 'rotate';\r
            el.setPointerCapture(e.pointerId);\r
          } else {\r
            mode = 'idle';\r
            pts.clear();\r
          }\r
        }\r
      }\r
\r
      if (mode === 'rotate') {\r
        e.preventDefault();\r
        const dx = e.clientX - lx;\r
        const dy = e.clientY - ly;\r
        lx = e.clientX;\r
        ly = e.clientY;\r
        outer.current.rotation.y += dx * ROTATE_SPEED;\r
        outer.current.rotation.x += dy * ROTATE_SPEED;\r
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };\r
        invalidate();\r
      } else if (mode === 'pinch' && pts.size === 2) {\r
        e.preventDefault();\r
        const [p1, p2] = [...pts.values()];\r
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);\r
        const ratio = startDist / d;\r
        camera.position.z = THREE.MathUtils.clamp(startZ * ratio, minZoom, maxZoom);\r
        invalidate();\r
      }\r
    };\r
\r
    const up = e => {\r
      pts.delete(e.pointerId);\r
      if (mode === 'rotate' && pts.size === 0) mode = 'idle';\r
      if (mode === 'pinch' && pts.size < 2) mode = 'idle';\r
    };\r
\r
    el.addEventListener('pointerdown', down, { passive: true });\r
    window.addEventListener('pointermove', move, { passive: false });\r
    window.addEventListener('pointerup', up, { passive: true });\r
    window.addEventListener('pointercancel', up, { passive: true });\r
    return () => {\r
      el.removeEventListener('pointerdown', down);\r
      window.removeEventListener('pointermove', move);\r
      window.removeEventListener('pointerup', up);\r
      window.removeEventListener('pointercancel', up);\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [gl, enableManualRotation, enableManualZoom, minZoom, maxZoom]);\r
\r
  useEffect(() => {\r
    if (isTouch) return;\r
    const mm = e => {\r
      if (e.pointerType !== 'mouse') return;\r
      const nx = (e.clientX / window.innerWidth) * 2 - 1;\r
      const ny = (e.clientY / window.innerHeight) * 2 - 1;\r
      if (enableMouseParallax) tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };\r
      if (enableHoverRotation) tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };\r
      invalidate();\r
    };\r
    window.addEventListener('pointermove', mm);\r
    return () => window.removeEventListener('pointermove', mm);\r
  }, [enableMouseParallax, enableHoverRotation]);\r
\r
  useFrame((_, dt) => {\r
    let need = false;\r
    cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;\r
    cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;\r
    const phx = cHov.current.x,\r
      phy = cHov.current.y;\r
    cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;\r
    cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;\r
\r
    const ndc = pivotW.current.clone().project(camera);\r
    ndc.x += xOff + cPar.current.x;\r
    ndc.y += yOff + cPar.current.y;\r
    outer.current.position.copy(ndc.unproject(camera));\r
\r
    outer.current.rotation.x += cHov.current.x - phx;\r
    outer.current.rotation.y += cHov.current.y - phy;\r
\r
    if (autoRotate) {\r
      outer.current.rotation.y += autoRotateSpeed * dt;\r
      need = true;\r
    }\r
\r
    outer.current.rotation.y += vel.current.x;\r
    outer.current.rotation.x += vel.current.y;\r
    vel.current.x *= INERTIA;\r
    vel.current.y *= INERTIA;\r
    if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4) need = true;\r
\r
    if (\r
      Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||\r
      Math.abs(cPar.current.y - tPar.current.y) > 1e-4 ||\r
      Math.abs(cHov.current.x - tHov.current.x) > 1e-4 ||\r
      Math.abs(cHov.current.y - tHov.current.y) > 1e-4\r
    )\r
      need = true;\r
\r
    if (need) invalidate();\r
  });\r
\r
  if (!content) return null;\r
  return (\r
    <group ref={outer}>\r
      <group ref={inner}>\r
        <primitive object={content} />\r
      </group>\r
    </group>\r
  );\r
};\r
\r
const ModelViewer = ({\r
  url,\r
  width = 400,\r
  height = 400,\r
  modelXOffset = 0,\r
  modelYOffset = 0,\r
  defaultRotationX = -50,\r
  defaultRotationY = 20,\r
  defaultZoom = 0.5,\r
  minZoomDistance = 0.5,\r
  maxZoomDistance = 10,\r
  enableMouseParallax = true,\r
  enableManualRotation = true,\r
  enableHoverRotation = true,\r
  enableManualZoom = true,\r
  ambientIntensity = 0.3,\r
  keyLightIntensity = 1,\r
  fillLightIntensity = 0.5,\r
  rimLightIntensity = 0.8,\r
  environmentPreset = 'forest',\r
  autoFrame = false,\r
  placeholderSrc,\r
  showScreenshotButton = true,\r
  fadeIn = false,\r
  autoRotate = false,\r
  autoRotateSpeed = 0.35,\r
  onModelLoaded\r
}) => {\r
  useEffect(() => void useGLTF.preload(url), [url]);\r
  const pivot = useRef(new THREE.Vector3()).current;\r
  const contactRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const sceneRef = useRef(null);\r
  const cameraRef = useRef(null);\r
\r
  const initYaw = deg2rad(defaultRotationX);\r
  const initPitch = deg2rad(defaultRotationY);\r
  const camZ = Math.min(Math.max(defaultZoom, minZoomDistance), maxZoomDistance);\r
\r
  const capture = () => {\r
    const g = rendererRef.current,\r
      s = sceneRef.current,\r
      c = cameraRef.current;\r
    if (!g || !s || !c) return;\r
    g.shadowMap.enabled = false;\r
    const tmp = [];\r
    s.traverse(o => {\r
      if (o.isLight && 'castShadow' in o) {\r
        tmp.push({ l: o, cast: o.castShadow });\r
        o.castShadow = false;\r
      }\r
    });\r
    if (contactRef.current) contactRef.current.visible = false;\r
    g.render(s, c);\r
    const urlPNG = g.domElement.toDataURL('image/png');\r
    const a = document.createElement('a');\r
    a.download = 'model.png';\r
    a.href = urlPNG;\r
    a.click();\r
    g.shadowMap.enabled = true;\r
    tmp.forEach(({ l, cast }) => (l.castShadow = cast));\r
    if (contactRef.current) contactRef.current.visible = true;\r
    invalidate();\r
  };\r
\r
  return (\r
    <div\r
      style={{\r
        width,\r
        height,\r
        touchAction: 'pan-y pinch-zoom'\r
      }}\r
      className="relative"\r
    >\r
      {showScreenshotButton && (\r
        <button\r
          onClick={capture}\r
          className="absolute top-4 right-4 z-10 cursor-pointer px-4 py-2 border border-white rounded-xl bg-transparent text-white hover:bg-white hover:text-black transition-colors"\r
        >\r
          Take Screenshot\r
        </button>\r
      )}\r
\r
      <Canvas\r
        shadows\r
        frameloop="demand"\r
        gl={{ preserveDrawingBuffer: true }}\r
        onCreated={({ gl, scene, camera }) => {\r
          rendererRef.current = gl;\r
          sceneRef.current = scene;\r
          cameraRef.current = camera;\r
          gl.toneMapping = THREE.ACESFilmicToneMapping;\r
          gl.outputColorSpace = THREE.SRGBColorSpace;\r
        }}\r
        camera={{ fov: 50, position: [0, 0, camZ], near: 0.01, far: 100 }}\r
        style={{ touchAction: 'pan-y pinch-zoom' }}\r
      >\r
        {environmentPreset !== 'none' && <Environment preset={environmentPreset} background={false} />}\r
\r
        <ambientLight intensity={ambientIntensity} />\r
        <directionalLight position={[5, 5, 5]} intensity={keyLightIntensity} castShadow />\r
        <directionalLight position={[-5, 2, 5]} intensity={fillLightIntensity} />\r
        <directionalLight position={[0, 4, -5]} intensity={rimLightIntensity} />\r
\r
        <ContactShadows ref={contactRef} position={[0, -0.5, 0]} opacity={0.35} scale={10} blur={2} />\r
\r
        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>\r
          <ModelInner\r
            url={url}\r
            xOff={modelXOffset}\r
            yOff={modelYOffset}\r
            pivot={pivot}\r
            initYaw={initYaw}\r
            initPitch={initPitch}\r
            minZoom={minZoomDistance}\r
            maxZoom={maxZoomDistance}\r
            enableMouseParallax={enableMouseParallax}\r
            enableManualRotation={enableManualRotation}\r
            enableHoverRotation={enableHoverRotation}\r
            enableManualZoom={enableManualZoom}\r
            autoFrame={autoFrame}\r
            fadeIn={fadeIn}\r
            autoRotate={autoRotate}\r
            autoRotateSpeed={autoRotateSpeed}\r
            onLoaded={onModelLoaded}\r
          />\r
        </Suspense>\r
\r
        {!isTouch && (\r
          <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} />\r
        )}\r
      </Canvas>\r
    </div>\r
  );\r
};\r
\r
export default ModelViewer;\r
`,lo=`import { FC, Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';\r
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';\r
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';\r
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';\r
import * as THREE from 'three';\r
\r
const isMeshObject = (object: THREE.Object3D): object is THREE.Mesh => {\r
  return 'isMesh' in object && object.isMesh === true;\r
};\r
\r
const isLightObject = (object: THREE.Object3D): object is THREE.Light => {\r
  return 'isLight' in object && object.isLight === true;\r
};\r
\r
export interface ViewerProps {\r
  url: string;\r
  width?: number | string;\r
  height?: number | string;\r
  modelXOffset?: number;\r
  modelYOffset?: number;\r
  defaultRotationX?: number;\r
  defaultRotationY?: number;\r
  defaultZoom?: number;\r
  minZoomDistance?: number;\r
  maxZoomDistance?: number;\r
  enableMouseParallax?: boolean;\r
  enableManualRotation?: boolean;\r
  enableHoverRotation?: boolean;\r
  enableManualZoom?: boolean;\r
  ambientIntensity?: number;\r
  keyLightIntensity?: number;\r
  fillLightIntensity?: number;\r
  rimLightIntensity?: number;\r
  environmentPreset?: 'city' | 'sunset' | 'night' | 'dawn' | 'studio' | 'apartment' | 'forest' | 'park' | 'none';\r
  autoFrame?: boolean;\r
  placeholderSrc?: string;\r
  showScreenshotButton?: boolean;\r
  fadeIn?: boolean;\r
  autoRotate?: boolean;\r
  autoRotateSpeed?: number;\r
  onModelLoaded?: () => void;\r
}\r
\r
const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);\r
const deg2rad = (d: number) => (d * Math.PI) / 180;\r
const DECIDE = 8; // px before we decide horizontal vs vertical\r
const ROTATE_SPEED = 0.005;\r
const INERTIA = 0.925;\r
const PARALLAX_MAG = 0.05;\r
const PARALLAX_EASE = 0.12;\r
const HOVER_MAG = deg2rad(6);\r
const HOVER_EASE = 0.15;\r
\r
const Loader: FC<{ placeholderSrc?: string }> = ({ placeholderSrc }) => {\r
  const { progress, active } = useProgress();\r
  if (!active && placeholderSrc) return null;\r
  return (\r
    <Html center>\r
      {placeholderSrc ? (\r
        <img src={placeholderSrc} width={128} height={128} style={{ filter: 'blur(8px)', borderRadius: 8 }} />\r
      ) : (\r
        \`\${Math.round(progress)} %\`\r
      )}\r
    </Html>\r
  );\r
};\r
\r
const DesktopControls: FC<{\r
  pivot: THREE.Vector3;\r
  min: number;\r
  max: number;\r
  zoomEnabled: boolean;\r
}> = ({ pivot, min, max, zoomEnabled }) => {\r
  const ref = useRef<any>(null);\r
  useFrame(() => ref.current?.target.copy(pivot));\r
  return (\r
    <OrbitControls\r
      ref={ref}\r
      makeDefault\r
      enablePan={false}\r
      enableRotate={false}\r
      enableZoom={zoomEnabled}\r
      minDistance={min}\r
      maxDistance={max}\r
    />\r
  );\r
};\r
\r
interface ModelInnerProps {\r
  url: string;\r
  xOff: number;\r
  yOff: number;\r
  pivot: THREE.Vector3;\r
  initYaw: number;\r
  initPitch: number;\r
  minZoom: number;\r
  maxZoom: number;\r
  enableMouseParallax: boolean;\r
  enableManualRotation: boolean;\r
  enableHoverRotation: boolean;\r
  enableManualZoom: boolean;\r
  autoFrame: boolean;\r
  fadeIn: boolean;\r
  autoRotate: boolean;\r
  autoRotateSpeed: number;\r
  onLoaded?: () => void;\r
}\r
\r
const ModelInner: FC<ModelInnerProps> = ({\r
  url,\r
  xOff,\r
  yOff,\r
  pivot,\r
  initYaw,\r
  initPitch,\r
  minZoom,\r
  maxZoom,\r
  enableMouseParallax,\r
  enableManualRotation,\r
  enableHoverRotation,\r
  enableManualZoom,\r
  autoFrame,\r
  fadeIn,\r
  autoRotate,\r
  autoRotateSpeed,\r
  onLoaded\r
}) => {\r
  const outer = useRef<THREE.Group>(null!);\r
  const inner = useRef<THREE.Group>(null!);\r
  const { camera, gl } = useThree();\r
\r
  const vel = useRef({ x: 0, y: 0 });\r
  const tPar = useRef({ x: 0, y: 0 });\r
  const cPar = useRef({ x: 0, y: 0 });\r
  const tHov = useRef({ x: 0, y: 0 });\r
  const cHov = useRef({ x: 0, y: 0 });\r
\r
  const ext = useMemo(() => url.split('.').pop()!.toLowerCase(), [url]);\r
  const content = useMemo<THREE.Object3D | null>(() => {\r
    if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();\r
    if (ext === 'fbx') return useFBX(url).clone();\r
    if (ext === 'obj') return useLoader(OBJLoader, url).clone();\r
    console.error('Unsupported format:', ext);\r
    return null;\r
  }, [url, ext]);\r
\r
  const pivotW = useRef(new THREE.Vector3());\r
  useLayoutEffect(() => {\r
    if (!content) return;\r
    const g = inner.current;\r
    g.updateWorldMatrix(true, true);\r
\r
    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());\r
    const s = 1 / (sphere.radius * 2);\r
    g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);\r
    g.scale.setScalar(s);\r
\r
    g.traverse((o: THREE.Object3D) => {\r
      if (isMeshObject(o)) {\r
        o.castShadow = true;\r
        o.receiveShadow = true;\r
        if (fadeIn) {\r
          const materials = Array.isArray(o.material) ? o.material : [o.material];\r
          materials.forEach(material => {\r
            material.transparent = true;\r
            material.opacity = 0;\r
          });\r
        }\r
      }\r
    });\r
\r
    g.getWorldPosition(pivotW.current);\r
    pivot.copy(pivotW.current);\r
    outer.current.rotation.set(initPitch, initYaw, 0);\r
\r
    if (autoFrame && (camera as THREE.PerspectiveCamera).isPerspectiveCamera) {\r
      const persp = camera as THREE.PerspectiveCamera;\r
      const fitR = sphere.radius * s;\r
      const d = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);\r
      persp.position.set(pivotW.current.x, pivotW.current.y, pivotW.current.z + d);\r
      persp.near = d / 10;\r
      persp.far = d * 10;\r
      persp.updateProjectionMatrix();\r
    }\r
\r
    /* optional fade-in */\r
    if (fadeIn) {\r
      let t = 0;\r
      const id = setInterval(() => {\r
        t += 0.05;\r
        const v = Math.min(t, 1);\r
        g.traverse((o: THREE.Object3D) => {\r
          if (isMeshObject(o)) {\r
            const materials = Array.isArray(o.material) ? o.material : [o.material];\r
            materials.forEach(material => {\r
              material.opacity = v;\r
            });\r
          }\r
        });\r
        invalidate();\r
        if (v === 1) {\r
          clearInterval(id);\r
          onLoaded?.();\r
        }\r
      }, 16);\r
      return () => clearInterval(id);\r
    } else onLoaded?.();\r
  }, [content]);\r
\r
  useEffect(() => {\r
    if (!enableManualRotation || isTouch) return;\r
    const el = gl.domElement;\r
    let drag = false;\r
    let lx = 0,\r
      ly = 0;\r
    const down = (e: PointerEvent) => {\r
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;\r
      drag = true;\r
      lx = e.clientX;\r
      ly = e.clientY;\r
      window.addEventListener('pointerup', up);\r
    };\r
    const move = (e: PointerEvent) => {\r
      if (!drag) return;\r
      const dx = e.clientX - lx;\r
      const dy = e.clientY - ly;\r
      lx = e.clientX;\r
      ly = e.clientY;\r
      outer.current.rotation.y += dx * ROTATE_SPEED;\r
      outer.current.rotation.x += dy * ROTATE_SPEED;\r
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };\r
      invalidate();\r
    };\r
    const up = () => (drag = false);\r
    el.addEventListener('pointerdown', down);\r
    el.addEventListener('pointermove', move);\r
    return () => {\r
      el.removeEventListener('pointerdown', down);\r
      el.removeEventListener('pointermove', move);\r
      window.removeEventListener('pointerup', up);\r
    };\r
  }, [gl, enableManualRotation]);\r
\r
  useEffect(() => {\r
    if (!isTouch) return;\r
    const el = gl.domElement;\r
    const pts = new Map<number, { x: number; y: number }>();\r
    type Mode = 'idle' | 'decide' | 'rotate' | 'pinch';\r
    let mode: Mode = 'idle';\r
    let sx = 0,\r
      sy = 0,\r
      lx = 0,\r
      ly = 0,\r
      startDist = 0,\r
      startZ = 0;\r
\r
    const down = (e: PointerEvent) => {\r
      if (e.pointerType !== 'touch') return;\r
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });\r
      if (pts.size === 1) {\r
        mode = 'decide';\r
        sx = lx = e.clientX;\r
        sy = ly = e.clientY;\r
      } else if (pts.size === 2 && enableManualZoom) {\r
        mode = 'pinch';\r
        const [p1, p2] = [...pts.values()];\r
        startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);\r
        startZ = camera.position.z;\r
        e.preventDefault();\r
      }\r
      invalidate();\r
    };\r
\r
    const move = (e: PointerEvent) => {\r
      const p = pts.get(e.pointerId);\r
      if (!p) return;\r
      p.x = e.clientX;\r
      p.y = e.clientY;\r
\r
      if (mode === 'decide') {\r
        const dx = e.clientX - sx;\r
        const dy = e.clientY - sy;\r
        if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {\r
          if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {\r
            mode = 'rotate';\r
            el.setPointerCapture(e.pointerId);\r
          } else {\r
            mode = 'idle';\r
            pts.clear();\r
          }\r
        }\r
      }\r
\r
      if (mode === 'rotate') {\r
        e.preventDefault();\r
        const dx = e.clientX - lx;\r
        const dy = e.clientY - ly;\r
        lx = e.clientX;\r
        ly = e.clientY;\r
        outer.current.rotation.y += dx * ROTATE_SPEED;\r
        outer.current.rotation.x += dy * ROTATE_SPEED;\r
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };\r
        invalidate();\r
      } else if (mode === 'pinch' && pts.size === 2) {\r
        e.preventDefault();\r
        const [p1, p2] = [...pts.values()];\r
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);\r
        const ratio = startDist / d;\r
        camera.position.z = THREE.MathUtils.clamp(startZ * ratio, minZoom, maxZoom);\r
        invalidate();\r
      }\r
    };\r
\r
    const up = (e: PointerEvent) => {\r
      pts.delete(e.pointerId);\r
      if (mode === 'rotate' && pts.size === 0) mode = 'idle';\r
      if (mode === 'pinch' && pts.size < 2) mode = 'idle';\r
    };\r
\r
    el.addEventListener('pointerdown', down, { passive: true });\r
    window.addEventListener('pointermove', move, { passive: false });\r
    window.addEventListener('pointerup', up, { passive: true });\r
    window.addEventListener('pointercancel', up, { passive: true });\r
    return () => {\r
      el.removeEventListener('pointerdown', down);\r
      window.removeEventListener('pointermove', move);\r
      window.removeEventListener('pointerup', up);\r
      window.removeEventListener('pointercancel', up);\r
    };\r
  }, [gl, enableManualRotation, enableManualZoom, minZoom, maxZoom]);\r
\r
  useEffect(() => {\r
    if (isTouch) return;\r
    const mm = (e: PointerEvent) => {\r
      if (e.pointerType !== 'mouse') return;\r
      const nx = (e.clientX / window.innerWidth) * 2 - 1;\r
      const ny = (e.clientY / window.innerHeight) * 2 - 1;\r
      if (enableMouseParallax) tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };\r
      if (enableHoverRotation) tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };\r
      invalidate();\r
    };\r
    window.addEventListener('pointermove', mm);\r
    return () => window.removeEventListener('pointermove', mm);\r
  }, [enableMouseParallax, enableHoverRotation]);\r
\r
  useFrame((_, dt) => {\r
    let need = false;\r
    cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;\r
    cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;\r
    const phx = cHov.current.x,\r
      phy = cHov.current.y;\r
    cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;\r
    cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;\r
\r
    const ndc = pivotW.current.clone().project(camera);\r
    ndc.x += xOff + cPar.current.x;\r
    ndc.y += yOff + cPar.current.y;\r
    outer.current.position.copy(ndc.unproject(camera));\r
\r
    outer.current.rotation.x += cHov.current.x - phx;\r
    outer.current.rotation.y += cHov.current.y - phy;\r
\r
    if (autoRotate) {\r
      outer.current.rotation.y += autoRotateSpeed * dt;\r
      need = true;\r
    }\r
\r
    outer.current.rotation.y += vel.current.x;\r
    outer.current.rotation.x += vel.current.y;\r
    vel.current.x *= INERTIA;\r
    vel.current.y *= INERTIA;\r
    if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4) need = true;\r
\r
    if (\r
      Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||\r
      Math.abs(cPar.current.y - tPar.current.y) > 1e-4 ||\r
      Math.abs(cHov.current.x - tHov.current.x) > 1e-4 ||\r
      Math.abs(cHov.current.y - tHov.current.y) > 1e-4\r
    )\r
      need = true;\r
\r
    if (need) invalidate();\r
  });\r
\r
  if (!content) return null;\r
  return (\r
    <group ref={outer}>\r
      <group ref={inner}>\r
        <primitive object={content} />\r
      </group>\r
    </group>\r
  );\r
};\r
\r
const ModelViewer: FC<ViewerProps> = ({\r
  url,\r
  width = 400,\r
  height = 400,\r
  modelXOffset = 0,\r
  modelYOffset = 0,\r
  defaultRotationX = -50,\r
  defaultRotationY = 20,\r
  defaultZoom = 0.5,\r
  minZoomDistance = 0.5,\r
  maxZoomDistance = 10,\r
  enableMouseParallax = true,\r
  enableManualRotation = true,\r
  enableHoverRotation = true,\r
  enableManualZoom = true,\r
  ambientIntensity = 0.3,\r
  keyLightIntensity = 1,\r
  fillLightIntensity = 0.5,\r
  rimLightIntensity = 0.8,\r
  environmentPreset = 'forest',\r
  autoFrame = false,\r
  placeholderSrc,\r
  showScreenshotButton = true,\r
  fadeIn = false,\r
  autoRotate = false,\r
  autoRotateSpeed = 0.35,\r
  onModelLoaded\r
}) => {\r
  useEffect(() => void useGLTF.preload(url), [url]);\r
  const pivot = useRef(new THREE.Vector3()).current;\r
  const contactRef = useRef<THREE.Mesh>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer>(null);\r
  const sceneRef = useRef<THREE.Scene>(null);\r
  const cameraRef = useRef<THREE.Camera>(null);\r
\r
  const initYaw = deg2rad(defaultRotationX);\r
  const initPitch = deg2rad(defaultRotationY);\r
  const camZ = Math.min(Math.max(defaultZoom, minZoomDistance), maxZoomDistance);\r
\r
  const capture = () => {\r
    const g = rendererRef.current,\r
      s = sceneRef.current,\r
      c = cameraRef.current;\r
    if (!g || !s || !c) return;\r
    g.shadowMap.enabled = false;\r
    const tmp: { l: THREE.Light; cast: boolean }[] = [];\r
    s.traverse((o: THREE.Object3D) => {\r
      if (isLightObject(o)) {\r
        tmp.push({ l: o, cast: o.castShadow });\r
        o.castShadow = false;\r
      }\r
    });\r
    if (contactRef.current) contactRef.current.visible = false;\r
    g.render(s, c);\r
    const urlPNG = g.domElement.toDataURL('image/png');\r
    const a = document.createElement('a');\r
    a.download = 'model.png';\r
    a.href = urlPNG;\r
    a.click();\r
    g.shadowMap.enabled = true;\r
    tmp.forEach(({ l, cast }) => (l.castShadow = cast));\r
    if (contactRef.current) contactRef.current.visible = true;\r
    invalidate();\r
  };\r
\r
  return (\r
    <div\r
      style={{\r
        width,\r
        height,\r
        position: 'relative',\r
        touchAction: 'pan-y pinch-zoom'\r
      }}\r
    >\r
      {showScreenshotButton && (\r
        <button\r
          onClick={capture}\r
          style={{\r
            position: 'absolute',\r
            border: '1px solid #fff',\r
            right: 16,\r
            top: 16,\r
            zIndex: 10,\r
            cursor: 'pointer',\r
            padding: '8px 16px',\r
            borderRadius: 10\r
          }}\r
        >\r
          Take Screenshot\r
        </button>\r
      )}\r
\r
      <Canvas\r
        shadows\r
        frameloop="demand"\r
        gl={{ preserveDrawingBuffer: true }}\r
        onCreated={({ gl, scene, camera }) => {\r
          rendererRef.current = gl;\r
          sceneRef.current = scene;\r
          cameraRef.current = camera;\r
          gl.toneMapping = THREE.ACESFilmicToneMapping;\r
          gl.outputColorSpace = THREE.SRGBColorSpace;\r
        }}\r
        camera={{ fov: 50, position: [0, 0, camZ], near: 0.01, far: 100 }}\r
        style={{ touchAction: 'pan-y pinch-zoom' }}\r
      >\r
        {environmentPreset !== 'none' && <Environment preset={environmentPreset as any} background={false} />}\r
\r
        <ambientLight intensity={ambientIntensity} />\r
        <directionalLight position={[5, 5, 5]} intensity={keyLightIntensity} castShadow />\r
        <directionalLight position={[-5, 2, 5]} intensity={fillLightIntensity} />\r
        <directionalLight position={[0, 4, -5]} intensity={rimLightIntensity} />\r
\r
        <ContactShadows ref={contactRef as any} position={[0, -0.5, 0]} opacity={0.35} scale={10} blur={2} />\r
\r
        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>\r
          <ModelInner\r
            url={url}\r
            xOff={modelXOffset}\r
            yOff={modelYOffset}\r
            pivot={pivot}\r
            initYaw={initYaw}\r
            initPitch={initPitch}\r
            minZoom={minZoomDistance}\r
            maxZoom={maxZoomDistance}\r
            enableMouseParallax={enableMouseParallax}\r
            enableManualRotation={enableManualRotation}\r
            enableHoverRotation={enableHoverRotation}\r
            enableManualZoom={enableManualZoom}\r
            autoFrame={autoFrame}\r
            fadeIn={fadeIn}\r
            autoRotate={autoRotate}\r
            autoRotateSpeed={autoRotateSpeed}\r
            onLoaded={onModelLoaded}\r
          />\r
        </Suspense>\r
\r
        {!isTouch && (\r
          <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} />\r
        )}\r
      </Canvas>\r
    </div>\r
  );\r
};\r
\r
export default ModelViewer;\r
`,uo=`import { FC, Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';\r
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';\r
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';\r
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';\r
import * as THREE from 'three';\r
\r
export interface ViewerProps {\r
  url: string;\r
  width?: number | string;\r
  height?: number | string;\r
  modelXOffset?: number;\r
  modelYOffset?: number;\r
  defaultRotationX?: number;\r
  defaultRotationY?: number;\r
  defaultZoom?: number;\r
  minZoomDistance?: number;\r
  maxZoomDistance?: number;\r
  enableMouseParallax?: boolean;\r
  enableManualRotation?: boolean;\r
  enableHoverRotation?: boolean;\r
  enableManualZoom?: boolean;\r
  ambientIntensity?: number;\r
  keyLightIntensity?: number;\r
  fillLightIntensity?: number;\r
  rimLightIntensity?: number;\r
  environmentPreset?: 'city' | 'sunset' | 'night' | 'dawn' | 'studio' | 'apartment' | 'forest' | 'park' | 'none';\r
  autoFrame?: boolean;\r
  placeholderSrc?: string;\r
  showScreenshotButton?: boolean;\r
  fadeIn?: boolean;\r
  autoRotate?: boolean;\r
  autoRotateSpeed?: number;\r
  onModelLoaded?: () => void;\r
}\r
\r
const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);\r
const deg2rad = (d: number) => (d * Math.PI) / 180;\r
const DECIDE = 8; // px before we decide horizontal vs vertical\r
const ROTATE_SPEED = 0.005;\r
const INERTIA = 0.925;\r
const PARALLAX_MAG = 0.05;\r
const PARALLAX_EASE = 0.12;\r
const HOVER_MAG = deg2rad(6);\r
const HOVER_EASE = 0.15;\r
\r
const Loader: FC<{ placeholderSrc?: string }> = ({ placeholderSrc }) => {\r
  const { progress, active } = useProgress();\r
  if (!active && placeholderSrc) return null;\r
  return (\r
    <Html center>\r
      {placeholderSrc ? (\r
        <img src={placeholderSrc} width={128} height={128} className="blur-lg rounded-lg" />\r
      ) : (\r
        \`\${Math.round(progress)} %\`\r
      )}\r
    </Html>\r
  );\r
};\r
\r
const DesktopControls: FC<{\r
  pivot: THREE.Vector3;\r
  min: number;\r
  max: number;\r
  zoomEnabled: boolean;\r
}> = ({ pivot, min, max, zoomEnabled }) => {\r
  const ref = useRef<any>(null);\r
  useFrame(() => ref.current?.target.copy(pivot));\r
  return (\r
    <OrbitControls\r
      ref={ref}\r
      makeDefault\r
      enablePan={false}\r
      enableRotate={false}\r
      enableZoom={zoomEnabled}\r
      minDistance={min}\r
      maxDistance={max}\r
    />\r
  );\r
};\r
\r
interface ModelInnerProps {\r
  url: string;\r
  xOff: number;\r
  yOff: number;\r
  pivot: THREE.Vector3;\r
  initYaw: number;\r
  initPitch: number;\r
  minZoom: number;\r
  maxZoom: number;\r
  enableMouseParallax: boolean;\r
  enableManualRotation: boolean;\r
  enableHoverRotation: boolean;\r
  enableManualZoom: boolean;\r
  autoFrame: boolean;\r
  fadeIn: boolean;\r
  autoRotate: boolean;\r
  autoRotateSpeed: number;\r
  onLoaded?: () => void;\r
}\r
\r
const ModelInner: FC<ModelInnerProps> = ({\r
  url,\r
  xOff,\r
  yOff,\r
  pivot,\r
  initYaw,\r
  initPitch,\r
  minZoom,\r
  maxZoom,\r
  enableMouseParallax,\r
  enableManualRotation,\r
  enableHoverRotation,\r
  enableManualZoom,\r
  autoFrame,\r
  fadeIn,\r
  autoRotate,\r
  autoRotateSpeed,\r
  onLoaded\r
}) => {\r
  const outer = useRef<THREE.Group>(null!);\r
  const inner = useRef<THREE.Group>(null!);\r
  const { camera, gl } = useThree();\r
\r
  const vel = useRef({ x: 0, y: 0 });\r
  const tPar = useRef({ x: 0, y: 0 });\r
  const cPar = useRef({ x: 0, y: 0 });\r
  const tHov = useRef({ x: 0, y: 0 });\r
  const cHov = useRef({ x: 0, y: 0 });\r
\r
  const ext = useMemo(() => url.split('.').pop()!.toLowerCase(), [url]);\r
  const content = useMemo<THREE.Object3D | null>(() => {\r
    if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();\r
    if (ext === 'fbx') return useFBX(url).clone();\r
    if (ext === 'obj') return useLoader(OBJLoader, url).clone();\r
    console.error('Unsupported format:', ext);\r
    return null;\r
  }, [url, ext]);\r
\r
  const pivotW = useRef(new THREE.Vector3());\r
  useLayoutEffect(() => {\r
    if (!content) return;\r
    const g = inner.current;\r
    g.updateWorldMatrix(true, true);\r
\r
    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());\r
    const s = 1 / (sphere.radius * 2);\r
    g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);\r
    g.scale.setScalar(s);\r
\r
    g.traverse((o: any) => {\r
      if (o.isMesh) {\r
        o.castShadow = true;\r
        o.receiveShadow = true;\r
        if (fadeIn) {\r
          o.material.transparent = true;\r
          o.material.opacity = 0;\r
        }\r
      }\r
    });\r
\r
    g.getWorldPosition(pivotW.current);\r
    pivot.copy(pivotW.current);\r
    outer.current.rotation.set(initPitch, initYaw, 0);\r
\r
    if (autoFrame && (camera as THREE.PerspectiveCamera).isPerspectiveCamera) {\r
      const persp = camera as THREE.PerspectiveCamera;\r
      const fitR = sphere.radius * s;\r
      const d = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);\r
      persp.position.set(pivotW.current.x, pivotW.current.y, pivotW.current.z + d);\r
      persp.near = d / 10;\r
      persp.far = d * 10;\r
      persp.updateProjectionMatrix();\r
    }\r
\r
    /* optional fade-in */\r
    if (fadeIn) {\r
      let t = 0;\r
      const id = setInterval(() => {\r
        t += 0.05;\r
        const v = Math.min(t, 1);\r
        g.traverse((o: any) => {\r
          if (o.isMesh) o.material.opacity = v;\r
        });\r
        invalidate();\r
        if (v === 1) {\r
          clearInterval(id);\r
          onLoaded?.();\r
        }\r
      }, 16);\r
      return () => clearInterval(id);\r
    } else onLoaded?.();\r
  }, [content]);\r
\r
  useEffect(() => {\r
    if (!enableManualRotation || isTouch) return;\r
    const el = gl.domElement;\r
    let drag = false;\r
    let lx = 0,\r
      ly = 0;\r
    const down = (e: PointerEvent) => {\r
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;\r
      drag = true;\r
      lx = e.clientX;\r
      ly = e.clientY;\r
      window.addEventListener('pointerup', up);\r
    };\r
    const move = (e: PointerEvent) => {\r
      if (!drag) return;\r
      const dx = e.clientX - lx;\r
      const dy = e.clientY - ly;\r
      lx = e.clientX;\r
      ly = e.clientY;\r
      outer.current.rotation.y += dx * ROTATE_SPEED;\r
      outer.current.rotation.x += dy * ROTATE_SPEED;\r
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };\r
      invalidate();\r
    };\r
    const up = () => (drag = false);\r
    el.addEventListener('pointerdown', down);\r
    el.addEventListener('pointermove', move);\r
    return () => {\r
      el.removeEventListener('pointerdown', down);\r
      el.removeEventListener('pointermove', move);\r
      window.removeEventListener('pointerup', up);\r
    };\r
  }, [gl, enableManualRotation]);\r
\r
  useEffect(() => {\r
    if (!isTouch) return;\r
    const el = gl.domElement;\r
    const pts = new Map<number, { x: number; y: number }>();\r
    type Mode = 'idle' | 'decide' | 'rotate' | 'pinch';\r
    let mode: Mode = 'idle';\r
    let sx = 0,\r
      sy = 0,\r
      lx = 0,\r
      ly = 0,\r
      startDist = 0,\r
      startZ = 0;\r
\r
    const down = (e: PointerEvent) => {\r
      if (e.pointerType !== 'touch') return;\r
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });\r
      if (pts.size === 1) {\r
        mode = 'decide';\r
        sx = lx = e.clientX;\r
        sy = ly = e.clientY;\r
      } else if (pts.size === 2 && enableManualZoom) {\r
        mode = 'pinch';\r
        const [p1, p2] = [...pts.values()];\r
        startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);\r
        startZ = camera.position.z;\r
        e.preventDefault();\r
      }\r
      invalidate();\r
    };\r
\r
    const move = (e: PointerEvent) => {\r
      const p = pts.get(e.pointerId);\r
      if (!p) return;\r
      p.x = e.clientX;\r
      p.y = e.clientY;\r
\r
      if (mode === 'decide') {\r
        const dx = e.clientX - sx;\r
        const dy = e.clientY - sy;\r
        if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {\r
          if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {\r
            mode = 'rotate';\r
            el.setPointerCapture(e.pointerId);\r
          } else {\r
            mode = 'idle';\r
            pts.clear();\r
          }\r
        }\r
      }\r
\r
      if (mode === 'rotate') {\r
        e.preventDefault();\r
        const dx = e.clientX - lx;\r
        const dy = e.clientY - ly;\r
        lx = e.clientX;\r
        ly = e.clientY;\r
        outer.current.rotation.y += dx * ROTATE_SPEED;\r
        outer.current.rotation.x += dy * ROTATE_SPEED;\r
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };\r
        invalidate();\r
      } else if (mode === 'pinch' && pts.size === 2) {\r
        e.preventDefault();\r
        const [p1, p2] = [...pts.values()];\r
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);\r
        const ratio = startDist / d;\r
        camera.position.z = THREE.MathUtils.clamp(startZ * ratio, minZoom, maxZoom);\r
        invalidate();\r
      }\r
    };\r
\r
    const up = (e: PointerEvent) => {\r
      pts.delete(e.pointerId);\r
      if (mode === 'rotate' && pts.size === 0) mode = 'idle';\r
      if (mode === 'pinch' && pts.size < 2) mode = 'idle';\r
    };\r
\r
    el.addEventListener('pointerdown', down, { passive: true });\r
    window.addEventListener('pointermove', move, { passive: false });\r
    window.addEventListener('pointerup', up, { passive: true });\r
    window.addEventListener('pointercancel', up, { passive: true });\r
    return () => {\r
      el.removeEventListener('pointerdown', down);\r
      window.removeEventListener('pointermove', move);\r
      window.removeEventListener('pointerup', up);\r
      window.removeEventListener('pointercancel', up);\r
    };\r
  }, [gl, enableManualRotation, enableManualZoom, minZoom, maxZoom]);\r
\r
  useEffect(() => {\r
    if (isTouch) return;\r
    const mm = (e: PointerEvent) => {\r
      if (e.pointerType !== 'mouse') return;\r
      const nx = (e.clientX / window.innerWidth) * 2 - 1;\r
      const ny = (e.clientY / window.innerHeight) * 2 - 1;\r
      if (enableMouseParallax) tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };\r
      if (enableHoverRotation) tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };\r
      invalidate();\r
    };\r
    window.addEventListener('pointermove', mm);\r
    return () => window.removeEventListener('pointermove', mm);\r
  }, [enableMouseParallax, enableHoverRotation]);\r
\r
  useFrame((_, dt) => {\r
    let need = false;\r
    cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;\r
    cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;\r
    const phx = cHov.current.x,\r
      phy = cHov.current.y;\r
    cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;\r
    cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;\r
\r
    const ndc = pivotW.current.clone().project(camera);\r
    ndc.x += xOff + cPar.current.x;\r
    ndc.y += yOff + cPar.current.y;\r
    outer.current.position.copy(ndc.unproject(camera));\r
\r
    outer.current.rotation.x += cHov.current.x - phx;\r
    outer.current.rotation.y += cHov.current.y - phy;\r
\r
    if (autoRotate) {\r
      outer.current.rotation.y += autoRotateSpeed * dt;\r
      need = true;\r
    }\r
\r
    outer.current.rotation.y += vel.current.x;\r
    outer.current.rotation.x += vel.current.y;\r
    vel.current.x *= INERTIA;\r
    vel.current.y *= INERTIA;\r
    if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4) need = true;\r
\r
    if (\r
      Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||\r
      Math.abs(cPar.current.y - tPar.current.y) > 1e-4 ||\r
      Math.abs(cHov.current.x - tHov.current.x) > 1e-4 ||\r
      Math.abs(cHov.current.y - tHov.current.y) > 1e-4\r
    )\r
      need = true;\r
\r
    if (need) invalidate();\r
  });\r
\r
  if (!content) return null;\r
  return (\r
    <group ref={outer}>\r
      <group ref={inner}>\r
        <primitive object={content} />\r
      </group>\r
    </group>\r
  );\r
};\r
\r
const ModelViewer: FC<ViewerProps> = ({\r
  url,\r
  width = 400,\r
  height = 400,\r
  modelXOffset = 0,\r
  modelYOffset = 0,\r
  defaultRotationX = -50,\r
  defaultRotationY = 20,\r
  defaultZoom = 0.5,\r
  minZoomDistance = 0.5,\r
  maxZoomDistance = 10,\r
  enableMouseParallax = true,\r
  enableManualRotation = true,\r
  enableHoverRotation = true,\r
  enableManualZoom = true,\r
  ambientIntensity = 0.3,\r
  keyLightIntensity = 1,\r
  fillLightIntensity = 0.5,\r
  rimLightIntensity = 0.8,\r
  environmentPreset = 'forest',\r
  autoFrame = false,\r
  placeholderSrc,\r
  showScreenshotButton = true,\r
  fadeIn = false,\r
  autoRotate = false,\r
  autoRotateSpeed = 0.35,\r
  onModelLoaded\r
}) => {\r
  useEffect(() => void useGLTF.preload(url), [url]);\r
  const pivot = useRef(new THREE.Vector3()).current;\r
  const contactRef = useRef<THREE.Mesh>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer>(null);\r
  const sceneRef = useRef<THREE.Scene>(null);\r
  const cameraRef = useRef<THREE.Camera>(null);\r
\r
  const initYaw = deg2rad(defaultRotationX);\r
  const initPitch = deg2rad(defaultRotationY);\r
  const camZ = Math.min(Math.max(defaultZoom, minZoomDistance), maxZoomDistance);\r
\r
  const capture = () => {\r
    const g = rendererRef.current,\r
      s = sceneRef.current,\r
      c = cameraRef.current;\r
    if (!g || !s || !c) return;\r
    g.shadowMap.enabled = false;\r
    const tmp: { l: THREE.Light; cast: boolean }[] = [];\r
    s.traverse((o: any) => {\r
      if (o.isLight && 'castShadow' in o) {\r
        tmp.push({ l: o, cast: o.castShadow });\r
        o.castShadow = false;\r
      }\r
    });\r
    if (contactRef.current) contactRef.current.visible = false;\r
    g.render(s, c);\r
    const urlPNG = g.domElement.toDataURL('image/png');\r
    const a = document.createElement('a');\r
    a.download = 'model.png';\r
    a.href = urlPNG;\r
    a.click();\r
    g.shadowMap.enabled = true;\r
    tmp.forEach(({ l, cast }) => (l.castShadow = cast));\r
    if (contactRef.current) contactRef.current.visible = true;\r
    invalidate();\r
  };\r
\r
  return (\r
    <div\r
      style={{\r
        width,\r
        height,\r
        touchAction: 'pan-y pinch-zoom'\r
      }}\r
      className="relative"\r
    >\r
      {showScreenshotButton && (\r
        <button\r
          onClick={capture}\r
          className="absolute top-4 right-4 z-10 cursor-pointer px-4 py-2 border border-white rounded-xl bg-transparent text-white hover:bg-white hover:text-black transition-colors"\r
        >\r
          Take Screenshot\r
        </button>\r
      )}\r
\r
      <Canvas\r
        shadows\r
        frameloop="demand"\r
        gl={{ preserveDrawingBuffer: true }}\r
        onCreated={({ gl, scene, camera }) => {\r
          rendererRef.current = gl;\r
          sceneRef.current = scene;\r
          cameraRef.current = camera;\r
          gl.toneMapping = THREE.ACESFilmicToneMapping;\r
          gl.outputColorSpace = THREE.SRGBColorSpace;\r
        }}\r
        camera={{ fov: 50, position: [0, 0, camZ], near: 0.01, far: 100 }}\r
        style={{ touchAction: 'pan-y pinch-zoom' }}\r
      >\r
        {environmentPreset !== 'none' && <Environment preset={environmentPreset as any} background={false} />}\r
\r
        <ambientLight intensity={ambientIntensity} />\r
        <directionalLight position={[5, 5, 5]} intensity={keyLightIntensity} castShadow />\r
        <directionalLight position={[-5, 2, 5]} intensity={fillLightIntensity} />\r
        <directionalLight position={[0, 4, -5]} intensity={rimLightIntensity} />\r
\r
        <ContactShadows ref={contactRef as any} position={[0, -0.5, 0]} opacity={0.35} scale={10} blur={2} />\r
\r
        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>\r
          <ModelInner\r
            url={url}\r
            xOff={modelXOffset}\r
            yOff={modelYOffset}\r
            pivot={pivot}\r
            initYaw={initYaw}\r
            initPitch={initPitch}\r
            minZoom={minZoomDistance}\r
            maxZoom={maxZoomDistance}\r
            enableMouseParallax={enableMouseParallax}\r
            enableManualRotation={enableManualRotation}\r
            enableHoverRotation={enableHoverRotation}\r
            enableManualZoom={enableManualZoom}\r
            autoFrame={autoFrame}\r
            fadeIn={fadeIn}\r
            autoRotate={autoRotate}\r
            autoRotateSpeed={autoRotateSpeed}\r
            onLoaded={onModelLoaded}\r
          />\r
        </Suspense>\r
\r
        {!isTouch && (\r
          <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} />\r
        )}\r
      </Canvas>\r
    </div>\r
  );\r
};\r
\r
export default ModelViewer;\r
`,po={dependencies:"three @react-three/fiber @react-three/drei",usage:`import ModelViewer from './ModelViewer';

<ModelViewer
  url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
  width={400}
  height={400}
/>
`,code:so,tailwind:co,tsCode:lo,tsTailwind:uo},Ao=()=>{const[l,t]=x.useState(!1),[r,e]=Lr(),[n,o]=x.useState("toyCar"),[a,i]=x.useState(.5),[c,d]=x.useState(0),[u,s]=x.useState(!0),[f,m]=x.useState(!0),[v,y]=x.useState("forest"),[E,b]=x.useState(!1),[w,M]=x.useState(!1),[L,P]=x.useState(.35),[h,O]=x.useState(!0),Z={toyCar:"https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb",sheenChair:"https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/SheenChair/glTF-Binary/SheenChair.glb"},A={toyCar:"Fast as lightning.",sheenChair:"Ultra comfortable."},R=C=>{t(!1),o(C),e()},H=[{name:"url",type:"string",default:"-",description:"URL of the 3D model file (glb/gltf/fbx/obj)"},{name:"width",type:"number | string",default:"400",description:"Width of the canvas container"},{name:"height",type:"number | string",default:"400",description:"Height of the canvas container"},{name:"modelXOffset",type:"number",default:"0",description:"Horizontal offset of the model"},{name:"modelYOffset",type:"number",default:"0",description:"Vertical offset of the model"},{name:"defaultRotationX",type:"number",default:"-50",description:"Initial rotation on the X axis in degrees"},{name:"defaultRotationY",type:"number",default:"20",description:"Initial rotation on the Y axis in degrees"},{name:"defaultZoom",type:"number",default:"0.5",description:"Initial zoom distance factor"},{name:"minZoomDistance",type:"number",default:"0.5",description:"Minimum zoom distance"},{name:"maxZoomDistance",type:"number",default:"10",description:"Maximum zoom distance"},{name:"enableMouseParallax",type:"boolean",default:"true",description:"Enable mouse-based parallax effect"},{name:"enableManualRotation",type:"boolean",default:"true",description:"Enable manual rotation via drag"},{name:"enableHoverRotation",type:"boolean",default:"true",description:"Enable rotation on hover based on cursor"},{name:"enableManualZoom",type:"boolean",default:"true",description:"Enable manual zoom via mouse wheel or gestures"},{name:"ambientIntensity",type:"number",default:"0.3",description:"Intensity of ambient light"},{name:"keyLightIntensity",type:"number",default:"1",description:"Intensity of key light"},{name:"fillLightIntensity",type:"number",default:"0.5",description:"Intensity of fill light"},{name:"rimLightIntensity",type:"number",default:"0.8",description:"Intensity of rim light"},{name:"environmentPreset",type:"string",default:'"forest"',description:"Environment preset for scene lighting"},{name:"autoFrame",type:"boolean",default:"false",description:"Automatically frame the model in view"},{name:"fadeIn",type:"boolean",default:"false",description:"Enable fade-in transition on load"},{name:"autoRotate",type:"boolean",default:"false",description:"Enable automatic rotation animation"},{name:"autoRotateSpeed",type:"number",default:"0.35",description:"Speed of automatic rotation"},{name:"showScreenshotButton",type:"boolean",default:"true",description:"Show the screenshot button overlay"},{name:"placeholderSrc",type:"string",default:"-",description:"Placeholder image source while loading"},{name:"onModelLoaded",type:"function",default:"-",description:"Callback when model finishes loading"}];return j.jsxs(br,{children:[j.jsxs(Er,{children:[j.jsxs(gr,{position:"relative",className:"demo-container",h:500,overflow:"hidden",p:0,display:"flex",justifyContent:"center",alignItems:"center",children:[l&&j.jsx(xr,{userSelect:"none",position:"absolute",top:"50%",left:"6em",transform:"translate(-50%, -50%)",fontSize:"3rem",whiteSpace:"nowrap",fontWeight:"900",color:"white",textAlign:"center",textShadow:"0 0 10px rgba(255, 255, 255, 0.8)",zIndex:1,display:{base:"none",md:"block"},children:A[n]}),j.jsx(io,{url:Z[n],width:"100%",height:"100%",modelXOffset:a,modelYOffset:c,maxZoomDistance:.7,enableMouseParallax:u,enableHoverRotation:f,environmentPreset:v,fadeIn:E,autoRotate:w,autoRotateSpeed:L,showScreenshotButton:h,onModelLoaded:()=>t(!0)},r)]}),j.jsxs(Pr,{children:[j.jsx(St,{title:"Model",width:150,options:[{label:"Car",value:"toyCar"},{label:"Chair",value:"sheenChair"}],value:n,onChange:R}),j.jsx(St,{title:"Environment",width:150,options:[{label:"City",value:"city"},{label:"Sunset",value:"sunset"},{label:"Night",value:"night"},{label:"Dawn",value:"dawn"},{label:"Studio",value:"studio"},{label:"Apartment",value:"apartment"},{label:"Forest",value:"forest"},{label:"Park",value:"park"},{label:"None",value:"none"}],value:v,onChange:C=>{y(C),e()}}),j.jsx(dt,{title:"Horizontal Offset",min:-1,max:1,step:.1,value:a,onChange:C=>{i(C),e()}}),j.jsx(dt,{title:"Vertical Offset",min:-1,max:1,step:.1,value:c,onChange:C=>{d(C),e()}}),j.jsx(ze,{title:"Mouse Parallax",isChecked:u,onChange:C=>{s(C),e()}}),j.jsx(ze,{title:"Hover Rotation",isChecked:f,onChange:C=>{m(C),e()}}),j.jsx(ze,{title:"Screenshot Button",isChecked:h,onChange:C=>{O(C),e()}}),j.jsx(ze,{title:"Fade In On Load",isChecked:E,onChange:C=>{b(C),e()}}),j.jsx(ze,{title:"Auto Rotate",isChecked:w,onChange:C=>{M(C),e()}}),j.jsx(dt,{title:"Rotate Speed",min:.1,max:2,step:.1,value:L,isDisabled:!w,onChange:C=>{P(C),e()}})]}),j.jsx(wr,{data:H}),j.jsx(Tr,{dependencyList:["three","@react-three/fiber","@react-three/drei"]})]}),j.jsx(Rr,{children:j.jsx(Mr,{codeObject:po})})]})};export{Ao as default};
