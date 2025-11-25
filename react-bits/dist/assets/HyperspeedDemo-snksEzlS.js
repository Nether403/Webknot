import{r as C,j as m,B as lr}from"./index-wsKSLPNH.js";import{T as dr,P as pr,a as mr,C as fr,b as gr}from"./PropTable-C4uPWs8h.js";import{D as vr}from"./Dependencies-BHoMfJUj.js";import{P as Er}from"./PreviewSelect-B8u33nUa.js";import{C as Pr}from"./Customize-1m_ZNqR9.js";import{B as wr}from"./BackgroundContent-CqU7Wlm2.js";import{f as u,V as f,g as B,W as xr,p as br,S as Tr,bl as Sr,i as yr,ao as Ar,P as j,C as P,a as W,a4 as G,a0 as p,M as q,bm as Lr,bn as Fr,bh as $,aA as T}from"./three.module-0PRdiASR.js";import{E as Rr,R as kr,a as J,B as Mr,S as R,b as Cr}from"./index-cCvir2e6.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";import"./PreviewSwitch-DqnF708j.js";const Dr={one:{onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"turbulentDistortion",length:400,roadWidth:10,islandWidth:2,lanesPerRoad:3,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:20,lightPairsPerRoadWay:40,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[400*.03,400*.2],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.8,.8],carFloorSeparation:[0,5],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:1250072,brokenLines:1250072,leftCars:[14177983,6770850,12732332],rightCars:[242627,941733,3294549],sticks:242627}},two:{onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"mountainDistortion",length:400,roadWidth:9,islandWidth:2,lanesPerRoad:3,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:50,lightPairsPerRoadWay:50,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[400*.05,400*.15],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.2,.2],carFloorSeparation:[.05,1],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:1250072,brokenLines:1250072,leftCars:[16715818,15415358,16715818],rightCars:[14342906,12499683,9410532],sticks:14342906}},three:{onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"xyDistortion",length:400,roadWidth:9,islandWidth:2,lanesPerRoad:3,fov:90,fovSpeedUp:150,speedUp:3,carLightsFade:.4,totalSideLightSticks:50,lightPairsPerRoadWay:30,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.02,.05],lightStickHeight:[.3,.7],movingAwaySpeed:[20,50],movingCloserSpeed:[-150,-230],carLightsLength:[400*.05,400*.2],carLightsRadius:[.03,.08],carWidthPercentage:[.1,.5],carShiftX:[-.5,.5],carFloorSeparation:[0,.1],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:1250072,brokenLines:1250072,leftCars:[8195355,11076889,16715818],rightCars:[15855310,15131313,14670218],sticks:15855310}},four:{onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"LongRaceDistortion",length:400,roadWidth:10,islandWidth:5,lanesPerRoad:2,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:50,lightPairsPerRoadWay:70,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[400*.05,400*.15],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.2,.2],carFloorSeparation:[.05,1],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:1250072,brokenLines:1250072,leftCars:[16736115,15158624,16715818],rightCars:[10806246,8442324,5489350],sticks:10806246}},five:{onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"turbulentDistortion",length:400,roadWidth:9,islandWidth:2,lanesPerRoad:3,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:50,lightPairsPerRoadWay:50,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[400*.05,400*.15],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.2,.2],carFloorSeparation:[.05,1],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:1250072,brokenLines:1250072,leftCars:[14441248,14459680,14426144],rightCars:[3361783,15066861,12568307],sticks:12970219}},six:{onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"deepDistortion",length:400,roadWidth:18,islandWidth:2,lanesPerRoad:3,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:50,lightPairsPerRoadWay:50,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[400*.05,400*.15],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.2,.2],carFloorSeparation:[.05,1],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:1250072,brokenLines:1250072,leftCars:[16724527,10694672,11015432],rightCars:[16645616,15982240,14859144],sticks:16645616}}},Hr=({effectOptions:S={onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"turbulentDistortion",length:400,roadWidth:10,islandWidth:2,lanesPerRoad:4,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:20,lightPairsPerRoadWay:40,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[400*.03,400*.2],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.8,.8],carFloorSeparation:[0,5],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:16777215,brokenLines:16777215,leftCars:[14177983,6770850,12732332],rightCars:[242627,941733,3294549],sticks:242627}}})=>{const D=C.useRef(null),v=C.useRef(null);return C.useEffect(()=>{if(v.current){v.current.dispose();const o=document.getElementById("lights");if(o)for(;o.firstChild;)o.removeChild(o.firstChild)}const y={uFreq:{value:new u(3,6,10)},uAmp:{value:new u(30,30,20)}},A={uFreq:{value:new f(5,2)},uAmp:{value:new f(25,15)}},H={uFreq:{value:new f(2,3)},uAmp:{value:new f(35,10)}},k={uFreq:{value:new B(4,8,8,1)},uAmp:{value:new B(25,5,10,10)}},L={uFreq:{value:new f(4,8)},uAmp:{value:new f(10,20)},uPowY:{value:new f(20,2)}};let w=o=>Math.sin(o)*.5+.5;const Z={mountainDistortion:{uniforms:y,getDistortion:`
          uniform vec3 uAmp;
          uniform vec3 uFreq;
          #define PI 3.14159265358979
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
              nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
            );
          }
        `,getJS:(o,r)=>{let n=.02,t=y.uFreq.value,e=y.uAmp.value,s=new u(Math.cos(o*Math.PI*t.x+r)*e.x-Math.cos(n*Math.PI*t.x+r)*e.x,w(o*Math.PI*t.y+r)*e.y-w(n*Math.PI*t.y+r)*e.y,w(o*Math.PI*t.z+r)*e.z-w(n*Math.PI*t.z+r)*e.z),i=new u(2,2,2),h=new u(0,0,-5);return s.multiply(i).add(h)}},xyDistortion:{uniforms:A,getDistortion:`
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
              0.
            );
          }
        `,getJS:(o,r)=>{let n=.02,t=A.uFreq.value,e=A.uAmp.value,s=new u(Math.cos(o*Math.PI*t.x+r)*e.x-Math.cos(n*Math.PI*t.x+r)*e.x,Math.sin(o*Math.PI*t.y+r+Math.PI/2)*e.y-Math.sin(n*Math.PI*t.y+r+Math.PI/2)*e.y,0),i=new u(2,.4,1),h=new u(0,0,-3);return s.multiply(i).add(h)}},LongRaceDistortion:{uniforms:H,getDistortion:`
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float camProgress = 0.0125;
            return vec3( 
              sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,
              0.
            );
          }
        `,getJS:(o,r)=>{let n=.0125,t=H.uFreq.value,e=H.uAmp.value,s=new u(Math.sin(o*Math.PI*t.x+r)*e.x-Math.sin(n*Math.PI*t.x+r)*e.x,Math.sin(o*Math.PI*t.y+r)*e.y-Math.sin(n*Math.PI*t.y+r)*e.y,0),i=new u(1,1,0),h=new u(0,0,-5);return s.multiply(i).add(h)}},turbulentDistortion:{uniforms:k,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r + uTime) * uAmp.r +
              pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.0125),
              getDistortionY(progress) - getDistortionY(0.0125),
              0.
            );
          }
        `,getJS:(o,r)=>{const n=k.uFreq.value,t=k.uAmp.value,e=a=>Math.cos(Math.PI*a*n.x+r)*t.x+Math.pow(Math.cos(Math.PI*a*n.y+r*(n.y/n.x)),2)*t.y,s=a=>-w(Math.PI*a*n.z+r)*t.z-Math.pow(w(Math.PI*a*n.w+r/(n.z/n.w)),5)*t.w;let i=new u(e(o)-e(o+.007),s(o)-s(o+.007),0),h=new u(-2,-5,0),c=new u(0,0,-10);return i.multiply(h).add(c)}},turbulentDistortionStill:{uniforms:k,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r) * uAmp.r +
              pow(cos(PI * progress * uFreq.g * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.02),
              0.
            );
          }
        `},deepDistortionStill:{uniforms:L,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              sin(progress * PI * uFreq.x) * uAmp.x * 2.
            );
          }
          float getDistortionY(float progress){
            return (
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y) * uAmp.y
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.05),
              0.
            );
          }
        `},deepDistortion:{uniforms:L,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              sin(progress * PI * uFreq.x + uTime) * uAmp.x
            );
          }
          float getDistortionY(float progress){
            return (
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.02),
              0.
            );
          }
        `,getJS:(o,r)=>{const n=L.uFreq.value,t=L.uAmp.value,e=L.uPowY.value,s=d=>Math.sin(d*Math.PI*n.x+r)*t.x,i=d=>Math.pow(d*e.x,e.y)+Math.sin(d*Math.PI*n.y+r)*t.y;let h=new u(s(o)-s(o+.01),i(o)-i(o+.01),0),c=new u(-2,-4,0),a=new u(0,0,-10);return h.multiply(c).add(a)}}};class N{constructor(r,n={}){this.options=n,this.options.distortion==null&&(this.options.distortion={uniforms:K,getDistortion:Q}),this.container=r,this.renderer=new xr({antialias:!1,alpha:!0}),this.renderer.setSize(r.offsetWidth,r.offsetHeight,!1),this.renderer.setPixelRatio(window.devicePixelRatio),this.composer=new Rr(this.renderer),r.append(this.renderer.domElement),this.camera=new br(n.fov,r.offsetWidth/r.offsetHeight,.1,1e4),this.camera.position.z=-5,this.camera.position.y=8,this.camera.position.x=0,this.scene=new Tr,this.scene.background=null;let t=new Sr(n.colors.background,n.length*.2,n.length*500);this.scene.fog=t,this.fogUniforms={fogColor:{value:t.color},fogNear:{value:t.near},fogFar:{value:t.far}},this.clock=new yr,this.assets={},this.disposed=!1,this.road=new sr(this,n),this.leftCarLights=new z(this,n,n.colors.leftCars,n.movingAwaySpeed,new f(0,1-n.carLightsFade)),this.rightCarLights=new z(this,n,n.colors.rightCars,n.movingCloserSpeed,new f(1,0+n.carLightsFade)),this.leftSticks=new er(this,n),this.fovTarget=n.fov,this.speedUpTarget=0,this.speedUp=0,this.timeOffset=0,this.tick=this.tick.bind(this),this.init=this.init.bind(this),this.setSize=this.setSize.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onContextMenu=this.onContextMenu.bind(this),window.addEventListener("resize",this.onWindowResize.bind(this))}onWindowResize(){const r=this.container.offsetWidth,n=this.container.offsetHeight;this.renderer.setSize(r,n),this.camera.aspect=r/n,this.camera.updateProjectionMatrix(),this.composer.setSize(r,n)}initPasses(){this.renderPass=new kr(this.scene,this.camera),this.bloomPass=new J(this.camera,new Mr({luminanceThreshold:.2,luminanceSmoothing:0,resolutionScale:1}));const r=new J(this.camera,new R({preset:Cr.MEDIUM,searchImage:R.searchImageDataURL,areaImage:R.areaImageDataURL}));this.renderPass.renderToScreen=!1,this.bloomPass.renderToScreen=!1,r.renderToScreen=!0,this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(r)}loadAssets(){const r=this.assets;return new Promise(n=>{const t=new Ar(n),e=new Image,s=new Image;r.smaa={},e.addEventListener("load",function(){r.smaa.search=this,t.itemEnd("smaa-search")}),s.addEventListener("load",function(){r.smaa.area=this,t.itemEnd("smaa-area")}),t.itemStart("smaa-search"),t.itemStart("smaa-area"),e.src=R.searchImageDataURL,s.src=R.areaImageDataURL})}init(){this.initPasses();const r=this.options;this.road.init(),this.leftCarLights.init(),this.leftCarLights.mesh.position.setX(-r.roadWidth/2-r.islandWidth/2),this.rightCarLights.init(),this.rightCarLights.mesh.position.setX(r.roadWidth/2+r.islandWidth/2),this.leftSticks.init(),this.leftSticks.mesh.position.setX(-(r.roadWidth+r.islandWidth/2)),this.container.addEventListener("mousedown",this.onMouseDown),this.container.addEventListener("mouseup",this.onMouseUp),this.container.addEventListener("mouseout",this.onMouseUp),this.container.addEventListener("touchstart",this.onTouchStart,{passive:!0}),this.container.addEventListener("touchend",this.onTouchEnd,{passive:!0}),this.container.addEventListener("touchcancel",this.onTouchEnd,{passive:!0}),this.container.addEventListener("contextmenu",this.onContextMenu),this.tick()}onMouseDown(r){this.options.onSpeedUp&&this.options.onSpeedUp(r),this.fovTarget=this.options.fovSpeedUp,this.speedUpTarget=this.options.speedUp}onMouseUp(r){this.options.onSlowDown&&this.options.onSlowDown(r),this.fovTarget=this.options.fov,this.speedUpTarget=0}onTouchStart(r){this.options.onSpeedUp&&this.options.onSpeedUp(r),this.fovTarget=this.options.fovSpeedUp,this.speedUpTarget=this.options.speedUp}onTouchEnd(r){this.options.onSlowDown&&this.options.onSlowDown(r),this.fovTarget=this.options.fov,this.speedUpTarget=0}onContextMenu(r){r.preventDefault()}update(r){let n=Math.exp(-(-60*Math.log2(.9))*r);this.speedUp+=_(this.speedUp,this.speedUpTarget,n,1e-5),this.timeOffset+=this.speedUp*r;let t=this.clock.elapsedTime+this.timeOffset;this.rightCarLights.update(t),this.leftCarLights.update(t),this.leftSticks.update(t),this.road.update(t);let e=!1,s=_(this.camera.fov,this.fovTarget,n);if(s!==0&&(this.camera.fov+=s*r*6,e=!0),this.options.distortion.getJS){const i=this.options.distortion.getJS(.025,t);this.camera.lookAt(new u(this.camera.position.x+i.x,this.camera.position.y+i.y,this.camera.position.z+i.z)),e=!0}e&&this.camera.updateProjectionMatrix(),this.options.isHyper&&console.log(this.options.isHyper)}render(r){this.composer.render(r)}dispose(){this.disposed=!0,this.renderer&&this.renderer.dispose(),this.composer&&this.composer.dispose(),this.scene&&this.scene.clear(),window.removeEventListener("resize",this.onWindowResize.bind(this)),this.container&&(this.container.removeEventListener("mousedown",this.onMouseDown),this.container.removeEventListener("mouseup",this.onMouseUp),this.container.removeEventListener("mouseout",this.onMouseUp),this.container.removeEventListener("touchstart",this.onTouchStart),this.container.removeEventListener("touchend",this.onTouchEnd),this.container.removeEventListener("touchcancel",this.onTouchEnd),this.container.removeEventListener("contextmenu",this.onContextMenu))}setSize(r,n,t){this.composer.setSize(r,n,t)}tick(){if(this.disposed||!this)return;if(ur(this.renderer,this.setSize)){const n=this.renderer.domElement;this.camera.aspect=n.clientWidth/n.clientHeight,this.camera.updateProjectionMatrix()}const r=this.clock.getDelta();this.render(r),this.update(r),requestAnimationFrame(this.tick)}}const K={uDistortionX:{value:new f(80,3)},uDistortionY:{value:new f(-40,2.5)}},Q=`
      #define PI 3.14159265358979
      uniform vec2 uDistortionX;
      uniform vec2 uDistortionY;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      vec3 getDistortion(float progress){
        progress = clamp(progress, 0., 1.);
        float xAmp = uDistortionX.r;
        float xFreq = uDistortionX.g;
        float yAmp = uDistortionY.r;
        float yFreq = uDistortionY.g;
        return vec3( 
          xAmp * nsin(progress * PI * xFreq - PI / 2.),
          yAmp * nsin(progress * PI * yFreq - PI / 2.),
          0.
        );
      }
    `,g=o=>Array.isArray(o)?Math.random()*(o[1]-o[0])+o[0]:Math.random()*o,U=o=>Array.isArray(o)?o[Math.floor(Math.random()*o.length)]:o;function _(o,r,n=.1,t=.001){let e=(r-o)*n;return Math.abs(e)<t&&(e=r-o),e}class z{constructor(r,n,t,e,s){this.webgl=r,this.options=n,this.colors=t,this.speed=e,this.fade=s}init(){const r=this.options;let n=new Lr(new u(0,0,0),new u(0,0,-1)),t=new Fr(n,40,1,8,!1),e=new $().copy(t);e.instanceCount=r.lightPairsPerRoadWay*2;let s=r.roadWidth/r.lanesPerRoad,i=[],h=[],c=[],a=this.colors;Array.isArray(a)?a=a.map(l=>new P(l)):a=new P(a);for(let l=0;l<r.lightPairsPerRoadWay;l++){let F=g(r.carLightsRadius),M=g(r.carLightsLength),x=g(this.speed),I=l%r.lanesPerRoad*s-r.roadWidth/2+s/2,V=g(r.carWidthPercentage)*s,cr=g(r.carShiftX)*s;I+=cr;let Y=g(r.carFloorSeparation)+F*1.3,X=-g(r.length);i.push(I-V/2),i.push(Y),i.push(X),i.push(I+V/2),i.push(Y),i.push(X),h.push(F),h.push(M),h.push(x),h.push(F),h.push(M),h.push(x);let b=U(a);c.push(b.r),c.push(b.g),c.push(b.b),c.push(b.r),c.push(b.g),c.push(b.b)}e.setAttribute("aOffset",new T(new Float32Array(i),3,!1)),e.setAttribute("aMetrics",new T(new Float32Array(h),3,!1)),e.setAttribute("aColor",new T(new Float32Array(c),3,!1));let d=new W({fragmentShader:rr,vertexShader:nr,transparent:!0,uniforms:Object.assign({uTime:{value:0},uTravelLength:{value:r.length},uFade:{value:this.fade}},this.webgl.fogUniforms,r.distortion.uniforms)});d.onBeforeCompile=l=>{l.vertexShader=l.vertexShader.replace("#include <getDistortion_vertex>",r.distortion.getDistortion)};let E=new q(e,d);E.frustumCulled=!1,this.webgl.scene.add(E),this.mesh=E}update(r){this.mesh.material.uniforms.uTime.value=r}}const rr=`
      #define USE_FOG;
      ${p.fog_pars_fragment}
      varying vec3 vColor;
      varying vec2 vUv; 
      uniform vec2 uFade;
      void main() {
        vec3 color = vec3(vColor);
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(color, alpha);
        if (gl_FragColor.a < 0.0001) discard;
        ${p.fog_fragment}
      }
    `,nr=`
      #define USE_FOG;
      ${p.fog_pars_vertex}
      attribute vec3 aOffset;
      attribute vec3 aMetrics;
      attribute vec3 aColor;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec2 vUv; 
      varying vec3 vColor; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        float radius = aMetrics.r;
        float myLength = aMetrics.g;
        float speed = aMetrics.b;

        transformed.xy *= radius;
        transformed.z *= myLength;

        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
        transformed.xy += aOffset.xy;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        vColor = aColor;
        ${p.fog_vertex}
      }
    `;class er{constructor(r,n){this.webgl=r,this.options=n}init(){const r=this.options,n=new j(1,1);let t=new $().copy(n),e=r.totalSideLightSticks;t.instanceCount=e;let s=r.length/(e-1);const i=[],h=[],c=[];let a=r.colors.sticks;Array.isArray(a)?a=a.map(l=>new P(l)):a=new P(a);for(let l=0;l<e;l++){let F=g(r.lightStickWidth),M=g(r.lightStickHeight);i.push((l-1)*s*2+s*Math.random());let x=U(a);h.push(x.r),h.push(x.g),h.push(x.b),c.push(F),c.push(M)}t.setAttribute("aOffset",new T(new Float32Array(i),1,!1)),t.setAttribute("aColor",new T(new Float32Array(h),3,!1)),t.setAttribute("aMetrics",new T(new Float32Array(c),2,!1));const d=new W({fragmentShader:or,vertexShader:tr,side:G,uniforms:Object.assign({uTravelLength:{value:r.length},uTime:{value:0}},this.webgl.fogUniforms,r.distortion.uniforms)});d.onBeforeCompile=l=>{l.vertexShader=l.vertexShader.replace("#include <getDistortion_vertex>",r.distortion.getDistortion)};const E=new q(t,d);E.frustumCulled=!1,this.webgl.scene.add(E),this.mesh=E}update(r){this.mesh.material.uniforms.uTime.value=r}}const tr=`
      #define USE_FOG;
      ${p.fog_pars_vertex}
      attribute float aOffset;
      attribute vec3 aColor;
      attribute vec2 aMetrics;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec3 vColor;
      mat4 rotationY( in float angle ) {
        return mat4(	cos(angle),		0,		sin(angle),	0,
                     0,		1.0,			 0,	0,
                -sin(angle),	0,		cos(angle),	0,
                0, 		0,				0,	1);
      }
      #include <getDistortion_vertex>
      void main(){
        vec3 transformed = position.xyz;
        float width = aMetrics.x;
        float height = aMetrics.y;

        transformed.xy *= vec2(width, height);
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);

        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;

        transformed.z += - uTravelLength + time;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        transformed.y += height / 2.;
        transformed.x += -width / 2.;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${p.fog_vertex}
      }
    `,or=`
      #define USE_FOG;
      ${p.fog_pars_fragment}
      varying vec3 vColor;
      void main(){
        vec3 color = vec3(vColor);
        gl_FragColor = vec4(color,1.);
        ${p.fog_fragment}
      }
    `;class sr{constructor(r,n){this.webgl=r,this.options=n,this.uTime={value:0}}createPlane(r,n,t){const e=this.options;let s=100;const i=new j(t?e.roadWidth:e.islandWidth,e.length,20,s);let h={uTravelLength:{value:e.length},uColor:{value:new P(t?e.colors.roadColor:e.colors.islandColor)},uTime:this.uTime};t&&(h=Object.assign(h,{uLanes:{value:e.lanesPerRoad},uBrokenLinesColor:{value:new P(e.colors.brokenLines)},uShoulderLinesColor:{value:new P(e.colors.shoulderLines)},uShoulderLinesWidthPercentage:{value:e.shoulderLinesWidthPercentage},uBrokenLinesLengthPercentage:{value:e.brokenLinesLengthPercentage},uBrokenLinesWidthPercentage:{value:e.brokenLinesWidthPercentage}}));const c=new W({fragmentShader:t?ar:ir,vertexShader:hr,side:G,uniforms:Object.assign(h,this.webgl.fogUniforms,e.distortion.uniforms)});c.onBeforeCompile=d=>{d.vertexShader=d.vertexShader.replace("#include <getDistortion_vertex>",e.distortion.getDistortion)};const a=new q(i,c);return a.rotation.x=-Math.PI/2,a.position.z=-e.length/2,a.position.x+=(this.options.islandWidth/2+e.roadWidth/2)*r,this.webgl.scene.add(a),a}init(){this.leftRoadWay=this.createPlane(-1,this.options.roadWidth,!0),this.rightRoadWay=this.createPlane(1,this.options.roadWidth,!0),this.island=this.createPlane(0,this.options.islandWidth,!1)}update(r){this.uTime.value=r}}const O=`
      #define USE_FOG;
      varying vec2 vUv; 
      uniform vec3 uColor;
      uniform float uTime;
      #include <roadMarkings_vars>
      ${p.fog_pars_fragment}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        #include <roadMarkings_fragment>
        gl_FragColor = vec4(color, 1.);
        ${p.fog_fragment}
      }
    `,ir=O.replace("#include <roadMarkings_fragment>","").replace("#include <roadMarkings_vars>",""),ar=O.replace("#include <roadMarkings_fragment>",`
      uv.y = mod(uv.y + uTime * 0.05, 1.);
      float laneWidth = 1.0 / uLanes;
      float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
      float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;

      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);

      brokenLines = mix(brokenLines, sideLines, uv.x);
    `).replace("#include <roadMarkings_vars>",`
      uniform float uLanes;
      uniform vec3 uBrokenLinesColor;
      uniform vec3 uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
      highp float random(vec2 co) {
        highp float a = 12.9898;
        highp float b = 78.233;
        highp float c = 43758.5453;
        highp float dt = dot(co.xy, vec2(a, b));
        highp float sn = mod(dt, 3.14);
        return fract(sin(sn) * c);
      }
    `),hr=`
      #define USE_FOG;
      uniform float uTime;
      ${p.fog_pars_vertex}
      uniform float uTravelLength;
      varying vec2 vUv; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x;
        transformed.z += distortion.y;
        transformed.y += -1. * distortion.z;  
        
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${p.fog_vertex}
      }
    `;function ur(o,r){const n=o.domElement,t=n.clientWidth,e=n.clientHeight,s=n.width!==t||n.height!==e;return s&&r(t,e,!1),s}return function(){const o=document.getElementById("lights"),r={...S};r.distortion=Z[r.distortion];const n=new N(o,r);v.current=n,n.loadAssets().then(n.init)}(),()=>{v.current&&v.current.dispose()}},[S]),m.jsx("div",{id:"lights",ref:D})},Ir=`export const hyperspeedPresets = {\r
  one: {\r
    onSpeedUp: () => {},\r
    onSlowDown: () => {},\r
    distortion: 'turbulentDistortion',\r
    length: 400,\r
    roadWidth: 10,\r
    islandWidth: 2,\r
    lanesPerRoad: 3,\r
    fov: 90,\r
    fovSpeedUp: 150,\r
    speedUp: 2,\r
    carLightsFade: 0.4,\r
    totalSideLightSticks: 20,\r
    lightPairsPerRoadWay: 40,\r
    shoulderLinesWidthPercentage: 0.05,\r
    brokenLinesWidthPercentage: 0.1,\r
    brokenLinesLengthPercentage: 0.5,\r
    lightStickWidth: [0.12, 0.5],\r
    lightStickHeight: [1.3, 1.7],\r
    movingAwaySpeed: [60, 80],\r
    movingCloserSpeed: [-120, -160],\r
    carLightsLength: [400 * 0.03, 400 * 0.2],\r
    carLightsRadius: [0.05, 0.14],\r
    carWidthPercentage: [0.3, 0.5],\r
    carShiftX: [-0.8, 0.8],\r
    carFloorSeparation: [0, 5],\r
    colors: {\r
      roadColor: 0x080808,\r
      islandColor: 0x0a0a0a,\r
      background: 0x000000,\r
      shoulderLines: 0x131318,\r
      brokenLines: 0x131318,\r
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],\r
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],\r
      sticks: 0x03b3c3\r
    }\r
  },\r
  two: {\r
    onSpeedUp: () => {},\r
    onSlowDown: () => {},\r
    distortion: 'mountainDistortion',\r
    length: 400,\r
    roadWidth: 9,\r
    islandWidth: 2,\r
    lanesPerRoad: 3,\r
    fov: 90,\r
    fovSpeedUp: 150,\r
    speedUp: 2,\r
    carLightsFade: 0.4,\r
    totalSideLightSticks: 50,\r
    lightPairsPerRoadWay: 50,\r
    shoulderLinesWidthPercentage: 0.05,\r
    brokenLinesWidthPercentage: 0.1,\r
    brokenLinesLengthPercentage: 0.5,\r
    lightStickWidth: [0.12, 0.5],\r
    lightStickHeight: [1.3, 1.7],\r
\r
    movingAwaySpeed: [60, 80],\r
    movingCloserSpeed: [-120, -160],\r
    carLightsLength: [400 * 0.05, 400 * 0.15],\r
    carLightsRadius: [0.05, 0.14],\r
    carWidthPercentage: [0.3, 0.5],\r
    carShiftX: [-0.2, 0.2],\r
    carFloorSeparation: [0.05, 1],\r
    colors: {\r
      roadColor: 0x080808,\r
      islandColor: 0x0a0a0a,\r
      background: 0x000000,\r
      shoulderLines: 0x131318,\r
      brokenLines: 0x131318,\r
      leftCars: [0xff102a, 0xeb383e, 0xff102a],\r
      rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],\r
      sticks: 0xdadafa\r
    }\r
  },\r
  three: {\r
    onSpeedUp: () => {},\r
    onSlowDown: () => {},\r
    distortion: 'xyDistortion',\r
    length: 400,\r
    roadWidth: 9,\r
    islandWidth: 2,\r
    lanesPerRoad: 3,\r
    fov: 90,\r
    fovSpeedUp: 150,\r
    speedUp: 3,\r
    carLightsFade: 0.4,\r
    totalSideLightSticks: 50,\r
    lightPairsPerRoadWay: 30,\r
    shoulderLinesWidthPercentage: 0.05,\r
    brokenLinesWidthPercentage: 0.1,\r
    brokenLinesLengthPercentage: 0.5,\r
    lightStickWidth: [0.02, 0.05],\r
    lightStickHeight: [0.3, 0.7],\r
    movingAwaySpeed: [20, 50],\r
    movingCloserSpeed: [-150, -230],\r
    carLightsLength: [400 * 0.05, 400 * 0.2],\r
    carLightsRadius: [0.03, 0.08],\r
    carWidthPercentage: [0.1, 0.5],\r
    carShiftX: [-0.5, 0.5],\r
    carFloorSeparation: [0, 0.1],\r
    colors: {\r
      roadColor: 0x080808,\r
      islandColor: 0x0a0a0a,\r
      background: 0x000000,\r
      shoulderLines: 0x131318,\r
      brokenLines: 0x131318,\r
      leftCars: [0x7d0d1b, 0xa90519, 0xff102a],\r
      rightCars: [0xf1eece, 0xe6e2b1, 0xdfd98a],\r
      sticks: 0xf1eece\r
    }\r
  },\r
  four: {\r
    onSpeedUp: () => {},\r
    onSlowDown: () => {},\r
    distortion: 'LongRaceDistortion',\r
    length: 400,\r
    roadWidth: 10,\r
    islandWidth: 5,\r
    lanesPerRoad: 2,\r
    fov: 90,\r
    fovSpeedUp: 150,\r
    speedUp: 2,\r
    carLightsFade: 0.4,\r
    totalSideLightSticks: 50,\r
    lightPairsPerRoadWay: 70,\r
    shoulderLinesWidthPercentage: 0.05,\r
    brokenLinesWidthPercentage: 0.1,\r
    brokenLinesLengthPercentage: 0.5,\r
    lightStickWidth: [0.12, 0.5],\r
    lightStickHeight: [1.3, 1.7],\r
    movingAwaySpeed: [60, 80],\r
    movingCloserSpeed: [-120, -160],\r
    carLightsLength: [400 * 0.05, 400 * 0.15],\r
    carLightsRadius: [0.05, 0.14],\r
    carWidthPercentage: [0.3, 0.5],\r
    carShiftX: [-0.2, 0.2],\r
    carFloorSeparation: [0.05, 1],\r
    colors: {\r
      roadColor: 0x080808,\r
      islandColor: 0x0a0a0a,\r
      background: 0x000000,\r
      shoulderLines: 0x131318,\r
      brokenLines: 0x131318,\r
      leftCars: [0xff5f73, 0xe74d60, 0xff102a],\r
      rightCars: [0xa4e3e6, 0x80d1d4, 0x53c2c6],\r
      sticks: 0xa4e3e6\r
    }\r
  },\r
  five: {\r
    onSpeedUp: () => {},\r
    onSlowDown: () => {},\r
    distortion: 'turbulentDistortion',\r
    length: 400,\r
    roadWidth: 9,\r
    islandWidth: 2,\r
    lanesPerRoad: 3,\r
    fov: 90,\r
    fovSpeedUp: 150,\r
    speedUp: 2,\r
    carLightsFade: 0.4,\r
    totalSideLightSticks: 50,\r
    lightPairsPerRoadWay: 50,\r
    shoulderLinesWidthPercentage: 0.05,\r
    brokenLinesWidthPercentage: 0.1,\r
    brokenLinesLengthPercentage: 0.5,\r
    lightStickWidth: [0.12, 0.5],\r
    lightStickHeight: [1.3, 1.7],\r
    movingAwaySpeed: [60, 80],\r
    movingCloserSpeed: [-120, -160],\r
    carLightsLength: [400 * 0.05, 400 * 0.15],\r
    carLightsRadius: [0.05, 0.14],\r
    carWidthPercentage: [0.3, 0.5],\r
    carShiftX: [-0.2, 0.2],\r
    carFloorSeparation: [0.05, 1],\r
    colors: {\r
      roadColor: 0x080808,\r
      islandColor: 0x0a0a0a,\r
      background: 0x000000,\r
      shoulderLines: 0x131318,\r
      brokenLines: 0x131318,\r
      leftCars: [0xdc5b20, 0xdca320, 0xdc2020],\r
      rightCars: [0x334bf7, 0xe5e6ed, 0xbfc6f3],\r
      sticks: 0xc5e8eb\r
    }\r
  },\r
  six: {\r
    onSpeedUp: () => {},\r
    onSlowDown: () => {},\r
    distortion: 'deepDistortion',\r
    length: 400,\r
    roadWidth: 18,\r
    islandWidth: 2,\r
    lanesPerRoad: 3,\r
    fov: 90,\r
    fovSpeedUp: 150,\r
    speedUp: 2,\r
    carLightsFade: 0.4,\r
    totalSideLightSticks: 50,\r
    lightPairsPerRoadWay: 50,\r
    shoulderLinesWidthPercentage: 0.05,\r
    brokenLinesWidthPercentage: 0.1,\r
    brokenLinesLengthPercentage: 0.5,\r
    lightStickWidth: [0.12, 0.5],\r
    lightStickHeight: [1.3, 1.7],\r
    movingAwaySpeed: [60, 80],\r
    movingCloserSpeed: [-120, -160],\r
    carLightsLength: [400 * 0.05, 400 * 0.15],\r
    carLightsRadius: [0.05, 0.14],\r
    carWidthPercentage: [0.3, 0.5],\r
    carShiftX: [-0.2, 0.2],\r
    carFloorSeparation: [0.05, 1],\r
    colors: {\r
      roadColor: 0x080808,\r
      islandColor: 0x0a0a0a,\r
      background: 0x000000,\r
      shoulderLines: 0x131318,\r
      brokenLines: 0x131318,\r
      leftCars: [0xff322f, 0xa33010, 0xa81508],\r
      rightCars: [0xfdfdf0, 0xf3dea0, 0xe2bb88],\r
      sticks: 0xfdfdf0\r
    }\r
  }\r
};\r
`,Wr=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';\r
\r
import './Hyperspeed.css';\r
\r
const Hyperspeed = ({\r
  effectOptions = {\r
    onSpeedUp: () => {},\r
    onSlowDown: () => {},\r
    distortion: 'turbulentDistortion',\r
    length: 400,\r
    roadWidth: 10,\r
    islandWidth: 2,\r
    lanesPerRoad: 4,\r
    fov: 90,\r
    fovSpeedUp: 150,\r
    speedUp: 2,\r
    carLightsFade: 0.4,\r
    totalSideLightSticks: 20,\r
    lightPairsPerRoadWay: 40,\r
    shoulderLinesWidthPercentage: 0.05,\r
    brokenLinesWidthPercentage: 0.1,\r
    brokenLinesLengthPercentage: 0.5,\r
    lightStickWidth: [0.12, 0.5],\r
    lightStickHeight: [1.3, 1.7],\r
    movingAwaySpeed: [60, 80],\r
    movingCloserSpeed: [-120, -160],\r
    carLightsLength: [400 * 0.03, 400 * 0.2],\r
    carLightsRadius: [0.05, 0.14],\r
    carWidthPercentage: [0.3, 0.5],\r
    carShiftX: [-0.8, 0.8],\r
    carFloorSeparation: [0, 5],\r
    colors: {\r
      roadColor: 0x080808,\r
      islandColor: 0x0a0a0a,\r
      background: 0x000000,\r
      shoulderLines: 0xffffff,\r
      brokenLines: 0xffffff,\r
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],\r
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],\r
      sticks: 0x03b3c3\r
    }\r
  }\r
}) => {\r
  const hyperspeed = useRef(null);\r
  const appRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (appRef.current) {\r
      appRef.current.dispose();\r
      const container = document.getElementById('lights');\r
      if (container) {\r
        while (container.firstChild) {\r
          container.removeChild(container.firstChild);\r
        }\r
      }\r
    }\r
    const mountainUniforms = {\r
      uFreq: { value: new THREE.Vector3(3, 6, 10) },\r
      uAmp: { value: new THREE.Vector3(30, 30, 20) }\r
    };\r
\r
    const xyUniforms = {\r
      uFreq: { value: new THREE.Vector2(5, 2) },\r
      uAmp: { value: new THREE.Vector2(25, 15) }\r
    };\r
\r
    const LongRaceUniforms = {\r
      uFreq: { value: new THREE.Vector2(2, 3) },\r
      uAmp: { value: new THREE.Vector2(35, 10) }\r
    };\r
\r
    const turbulentUniforms = {\r
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },\r
      uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }\r
    };\r
\r
    const deepUniforms = {\r
      uFreq: { value: new THREE.Vector2(4, 8) },\r
      uAmp: { value: new THREE.Vector2(10, 20) },\r
      uPowY: { value: new THREE.Vector2(20, 2) }\r
    };\r
\r
    let nsin = val => Math.sin(val) * 0.5 + 0.5;\r
\r
    const distortions = {\r
      mountainDistortion: {\r
        uniforms: mountainUniforms,\r
        getDistortion: \`\r
          uniform vec3 uAmp;\r
          uniform vec3 uFreq;\r
          #define PI 3.14159265358979\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          vec3 getDistortion(float progress){\r
            float movementProgressFix = 0.02;\r
            return vec3( \r
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,\r
              nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,\r
              nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          let movementProgressFix = 0.02;\r
          let uFreq = mountainUniforms.uFreq.value;\r
          let uAmp = mountainUniforms.uAmp.value;\r
          let distortion = new THREE.Vector3(\r
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
              Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,\r
            nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -\r
              nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,\r
            nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -\r
              nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z\r
          );\r
          let lookAtAmp = new THREE.Vector3(2, 2, 2);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -5);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      },\r
      xyDistortion: {\r
        uniforms: xyUniforms,\r
        getDistortion: \`\r
          uniform vec2 uFreq;\r
          uniform vec2 uAmp;\r
          #define PI 3.14159265358979\r
          vec3 getDistortion(float progress){\r
            float movementProgressFix = 0.02;\r
            return vec3( \r
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,\r
              sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,\r
              0.\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          let movementProgressFix = 0.02;\r
          let uFreq = xyUniforms.uFreq.value;\r
          let uAmp = xyUniforms.uAmp.value;\r
          let distortion = new THREE.Vector3(\r
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
              Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,\r
            Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -\r
              Math.sin(movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y,\r
            0\r
          );\r
          let lookAtAmp = new THREE.Vector3(2, 0.4, 1);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -3);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      },\r
      LongRaceDistortion: {\r
        uniforms: LongRaceUniforms,\r
        getDistortion: \`\r
          uniform vec2 uFreq;\r
          uniform vec2 uAmp;\r
          #define PI 3.14159265358979\r
          vec3 getDistortion(float progress){\r
            float camProgress = 0.0125;\r
            return vec3( \r
              sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,\r
              sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,\r
              0.\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          let camProgress = 0.0125;\r
          let uFreq = LongRaceUniforms.uFreq.value;\r
          let uAmp = LongRaceUniforms.uAmp.value;\r
          let distortion = new THREE.Vector3(\r
            Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
              Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x,\r
            Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -\r
              Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y,\r
            0\r
          );\r
          let lookAtAmp = new THREE.Vector3(1, 1, 0);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -5);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      },\r
      turbulentDistortion: {\r
        uniforms: turbulentUniforms,\r
        getDistortion: \`\r
          uniform vec4 uFreq;\r
          uniform vec4 uAmp;\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          #define PI 3.14159265358979\r
          float getDistortionX(float progress){\r
            return (\r
              cos(PI * progress * uFreq.r + uTime) * uAmp.r +\r
              pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g\r
            );\r
          }\r
          float getDistortionY(float progress){\r
            return (\r
              -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +\r
              -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a\r
            );\r
          }\r
          vec3 getDistortion(float progress){\r
            return vec3(\r
              getDistortionX(progress) - getDistortionX(0.0125),\r
              getDistortionY(progress) - getDistortionY(0.0125),\r
              0.\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          const uFreq = turbulentUniforms.uFreq.value;\r
          const uAmp = turbulentUniforms.uAmp.value;\r
\r
          const getX = p =>\r
            Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +\r
            Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;\r
\r
          const getY = p =>\r
            -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -\r
            Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;\r
\r
          let distortion = new THREE.Vector3(\r
            getX(progress) - getX(progress + 0.007),\r
            getY(progress) - getY(progress + 0.007),\r
            0\r
          );\r
          let lookAtAmp = new THREE.Vector3(-2, -5, 0);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -10);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      },\r
      turbulentDistortionStill: {\r
        uniforms: turbulentUniforms,\r
        getDistortion: \`\r
          uniform vec4 uFreq;\r
          uniform vec4 uAmp;\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          #define PI 3.14159265358979\r
          float getDistortionX(float progress){\r
            return (\r
              cos(PI * progress * uFreq.r) * uAmp.r +\r
              pow(cos(PI * progress * uFreq.g * (uFreq.g / uFreq.r)), 2. ) * uAmp.g\r
            );\r
          }\r
          float getDistortionY(float progress){\r
            return (\r
              -nsin(PI * progress * uFreq.b) * uAmp.b +\r
              -pow(nsin(PI * progress * uFreq.a / (uFreq.b / uFreq.a)), 5.) * uAmp.a\r
            );\r
          }\r
          vec3 getDistortion(float progress){\r
            return vec3(\r
              getDistortionX(progress) - getDistortionX(0.02),\r
              getDistortionY(progress) - getDistortionY(0.02),\r
              0.\r
            );\r
          }\r
        \`\r
      },\r
      deepDistortionStill: {\r
        uniforms: deepUniforms,\r
        getDistortion: \`\r
          uniform vec4 uFreq;\r
          uniform vec4 uAmp;\r
          uniform vec2 uPowY;\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          #define PI 3.14159265358979\r
          float getDistortionX(float progress){\r
            return (\r
              sin(progress * PI * uFreq.x) * uAmp.x * 2.\r
            );\r
          }\r
          float getDistortionY(float progress){\r
            return (\r
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y) * uAmp.y\r
            );\r
          }\r
          vec3 getDistortion(float progress){\r
            return vec3(\r
              getDistortionX(progress) - getDistortionX(0.02),\r
              getDistortionY(progress) - getDistortionY(0.05),\r
              0.\r
            );\r
          }\r
        \`\r
      },\r
      deepDistortion: {\r
        uniforms: deepUniforms,\r
        getDistortion: \`\r
          uniform vec4 uFreq;\r
          uniform vec4 uAmp;\r
          uniform vec2 uPowY;\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          #define PI 3.14159265358979\r
          float getDistortionX(float progress){\r
            return (\r
              sin(progress * PI * uFreq.x + uTime) * uAmp.x\r
            );\r
          }\r
          float getDistortionY(float progress){\r
            return (\r
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y\r
            );\r
          }\r
          vec3 getDistortion(float progress){\r
            return vec3(\r
              getDistortionX(progress) - getDistortionX(0.02),\r
              getDistortionY(progress) - getDistortionY(0.02),\r
              0.\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          const uFreq = deepUniforms.uFreq.value;\r
          const uAmp = deepUniforms.uAmp.value;\r
          const uPowY = deepUniforms.uPowY.value;\r
\r
          const getX = p => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x;\r
          const getY = p => Math.pow(p * uPowY.x, uPowY.y) + Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y;\r
\r
          let distortion = new THREE.Vector3(\r
            getX(progress) - getX(progress + 0.01),\r
            getY(progress) - getY(progress + 0.01),\r
            0\r
          );\r
          let lookAtAmp = new THREE.Vector3(-2, -4, 0);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -10);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      }\r
    };\r
\r
    class App {\r
      constructor(container, options = {}) {\r
        this.options = options;\r
        if (this.options.distortion == null) {\r
          this.options.distortion = {\r
            uniforms: distortion_uniforms,\r
            getDistortion: distortion_vertex\r
          };\r
        }\r
        this.container = container;\r
        this.renderer = new THREE.WebGLRenderer({\r
          antialias: false,\r
          alpha: true\r
        });\r
        this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);\r
        this.renderer.setPixelRatio(window.devicePixelRatio);\r
        this.composer = new EffectComposer(this.renderer);\r
        container.append(this.renderer.domElement);\r
\r
        this.camera = new THREE.PerspectiveCamera(\r
          options.fov,\r
          container.offsetWidth / container.offsetHeight,\r
          0.1,\r
          10000\r
        );\r
        this.camera.position.z = -5;\r
        this.camera.position.y = 8;\r
        this.camera.position.x = 0;\r
        this.scene = new THREE.Scene();\r
        this.scene.background = null;\r
\r
        let fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);\r
        this.scene.fog = fog;\r
        this.fogUniforms = {\r
          fogColor: { value: fog.color },\r
          fogNear: { value: fog.near },\r
          fogFar: { value: fog.far }\r
        };\r
        this.clock = new THREE.Clock();\r
        this.assets = {};\r
        this.disposed = false;\r
\r
        this.road = new Road(this, options);\r
        this.leftCarLights = new CarLights(\r
          this,\r
          options,\r
          options.colors.leftCars,\r
          options.movingAwaySpeed,\r
          new THREE.Vector2(0, 1 - options.carLightsFade)\r
        );\r
        this.rightCarLights = new CarLights(\r
          this,\r
          options,\r
          options.colors.rightCars,\r
          options.movingCloserSpeed,\r
          new THREE.Vector2(1, 0 + options.carLightsFade)\r
        );\r
        this.leftSticks = new LightsSticks(this, options);\r
\r
        this.fovTarget = options.fov;\r
        this.speedUpTarget = 0;\r
        this.speedUp = 0;\r
        this.timeOffset = 0;\r
\r
        this.tick = this.tick.bind(this);\r
        this.init = this.init.bind(this);\r
        this.setSize = this.setSize.bind(this);\r
        this.onMouseDown = this.onMouseDown.bind(this);\r
        this.onMouseUp = this.onMouseUp.bind(this);\r
\r
        this.onTouchStart = this.onTouchStart.bind(this);\r
        this.onTouchEnd = this.onTouchEnd.bind(this);\r
        this.onContextMenu = this.onContextMenu.bind(this);\r
\r
        window.addEventListener('resize', this.onWindowResize.bind(this));\r
      }\r
\r
      onWindowResize() {\r
        const width = this.container.offsetWidth;\r
        const height = this.container.offsetHeight;\r
\r
        this.renderer.setSize(width, height);\r
        this.camera.aspect = width / height;\r
        this.camera.updateProjectionMatrix();\r
        this.composer.setSize(width, height);\r
      }\r
\r
      initPasses() {\r
        this.renderPass = new RenderPass(this.scene, this.camera);\r
        this.bloomPass = new EffectPass(\r
          this.camera,\r
          new BloomEffect({\r
            luminanceThreshold: 0.2,\r
            luminanceSmoothing: 0,\r
            resolutionScale: 1\r
          })\r
        );\r
\r
        const smaaPass = new EffectPass(\r
          this.camera,\r
          new SMAAEffect({\r
            preset: SMAAPreset.MEDIUM,\r
            searchImage: SMAAEffect.searchImageDataURL,\r
            areaImage: SMAAEffect.areaImageDataURL\r
          })\r
        );\r
        this.renderPass.renderToScreen = false;\r
        this.bloomPass.renderToScreen = false;\r
        smaaPass.renderToScreen = true;\r
        this.composer.addPass(this.renderPass);\r
        this.composer.addPass(this.bloomPass);\r
        this.composer.addPass(smaaPass);\r
      }\r
\r
      loadAssets() {\r
        const assets = this.assets;\r
        return new Promise(resolve => {\r
          const manager = new THREE.LoadingManager(resolve);\r
\r
          const searchImage = new Image();\r
          const areaImage = new Image();\r
          assets.smaa = {};\r
          searchImage.addEventListener('load', function () {\r
            assets.smaa.search = this;\r
            manager.itemEnd('smaa-search');\r
          });\r
\r
          areaImage.addEventListener('load', function () {\r
            assets.smaa.area = this;\r
            manager.itemEnd('smaa-area');\r
          });\r
          manager.itemStart('smaa-search');\r
          manager.itemStart('smaa-area');\r
\r
          searchImage.src = SMAAEffect.searchImageDataURL;\r
          areaImage.src = SMAAEffect.areaImageDataURL;\r
        });\r
      }\r
\r
      init() {\r
        this.initPasses();\r
        const options = this.options;\r
        this.road.init();\r
        this.leftCarLights.init();\r
\r
        this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);\r
        this.rightCarLights.init();\r
        this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);\r
        this.leftSticks.init();\r
        this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));\r
\r
        this.container.addEventListener('mousedown', this.onMouseDown);\r
        this.container.addEventListener('mouseup', this.onMouseUp);\r
        this.container.addEventListener('mouseout', this.onMouseUp);\r
\r
        this.container.addEventListener('touchstart', this.onTouchStart, { passive: true });\r
        this.container.addEventListener('touchend', this.onTouchEnd, { passive: true });\r
        this.container.addEventListener('touchcancel', this.onTouchEnd, { passive: true });\r
\r
        this.container.addEventListener('contextmenu', this.onContextMenu);\r
\r
        this.tick();\r
      }\r
\r
      onMouseDown(ev) {\r
        if (this.options.onSpeedUp) this.options.onSpeedUp(ev);\r
        this.fovTarget = this.options.fovSpeedUp;\r
        this.speedUpTarget = this.options.speedUp;\r
      }\r
\r
      onMouseUp(ev) {\r
        if (this.options.onSlowDown) this.options.onSlowDown(ev);\r
        this.fovTarget = this.options.fov;\r
        this.speedUpTarget = 0;\r
      }\r
\r
      onTouchStart(ev) {\r
        if (this.options.onSpeedUp) this.options.onSpeedUp(ev);\r
        this.fovTarget = this.options.fovSpeedUp;\r
        this.speedUpTarget = this.options.speedUp;\r
      }\r
\r
      onTouchEnd(ev) {\r
        if (this.options.onSlowDown) this.options.onSlowDown(ev);\r
        this.fovTarget = this.options.fov;\r
        this.speedUpTarget = 0;\r
      }\r
\r
      onContextMenu(ev) {\r
        ev.preventDefault();\r
      }\r
\r
      update(delta) {\r
        let lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);\r
        this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);\r
        this.timeOffset += this.speedUp * delta;\r
\r
        let time = this.clock.elapsedTime + this.timeOffset;\r
\r
        this.rightCarLights.update(time);\r
        this.leftCarLights.update(time);\r
        this.leftSticks.update(time);\r
        this.road.update(time);\r
\r
        let updateCamera = false;\r
        let fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage);\r
        if (fovChange !== 0) {\r
          this.camera.fov += fovChange * delta * 6;\r
          updateCamera = true;\r
        }\r
\r
        if (this.options.distortion.getJS) {\r
          const distortion = this.options.distortion.getJS(0.025, time);\r
\r
          this.camera.lookAt(\r
            new THREE.Vector3(\r
              this.camera.position.x + distortion.x,\r
              this.camera.position.y + distortion.y,\r
              this.camera.position.z + distortion.z\r
            )\r
          );\r
          updateCamera = true;\r
        }\r
        if (updateCamera) {\r
          this.camera.updateProjectionMatrix();\r
        }\r
\r
        if (this.options.isHyper) {\r
          console.log(this.options.isHyper);\r
        }\r
      }\r
\r
      render(delta) {\r
        this.composer.render(delta);\r
      }\r
\r
      dispose() {\r
        this.disposed = true;\r
\r
        if (this.renderer) {\r
          this.renderer.dispose();\r
        }\r
        if (this.composer) {\r
          this.composer.dispose();\r
        }\r
        if (this.scene) {\r
          this.scene.clear();\r
        }\r
\r
        window.removeEventListener('resize', this.onWindowResize.bind(this));\r
        if (this.container) {\r
          this.container.removeEventListener('mousedown', this.onMouseDown);\r
          this.container.removeEventListener('mouseup', this.onMouseUp);\r
          this.container.removeEventListener('mouseout', this.onMouseUp);\r
\r
          this.container.removeEventListener('touchstart', this.onTouchStart);\r
          this.container.removeEventListener('touchend', this.onTouchEnd);\r
          this.container.removeEventListener('touchcancel', this.onTouchEnd);\r
          this.container.removeEventListener('contextmenu', this.onContextMenu);\r
        }\r
      }\r
\r
      setSize(width, height, updateStyles) {\r
        this.composer.setSize(width, height, updateStyles);\r
      }\r
\r
      tick() {\r
        if (this.disposed || !this) return;\r
        if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {\r
          const canvas = this.renderer.domElement;\r
          this.camera.aspect = canvas.clientWidth / canvas.clientHeight;\r
          this.camera.updateProjectionMatrix();\r
        }\r
        const delta = this.clock.getDelta();\r
        this.render(delta);\r
        this.update(delta);\r
        requestAnimationFrame(this.tick);\r
      }\r
    }\r
\r
    const distortion_uniforms = {\r
      uDistortionX: { value: new THREE.Vector2(80, 3) },\r
      uDistortionY: { value: new THREE.Vector2(-40, 2.5) }\r
    };\r
\r
    const distortion_vertex = \`\r
      #define PI 3.14159265358979\r
      uniform vec2 uDistortionX;\r
      uniform vec2 uDistortionY;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      vec3 getDistortion(float progress){\r
        progress = clamp(progress, 0., 1.);\r
        float xAmp = uDistortionX.r;\r
        float xFreq = uDistortionX.g;\r
        float yAmp = uDistortionY.r;\r
        float yFreq = uDistortionY.g;\r
        return vec3( \r
          xAmp * nsin(progress * PI * xFreq - PI / 2.),\r
          yAmp * nsin(progress * PI * yFreq - PI / 2.),\r
          0.\r
        );\r
      }\r
    \`;\r
\r
    const random = base => {\r
      if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];\r
      return Math.random() * base;\r
    };\r
\r
    const pickRandom = arr => {\r
      if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];\r
      return arr;\r
    };\r
\r
    function lerp(current, target, speed = 0.1, limit = 0.001) {\r
      let change = (target - current) * speed;\r
      if (Math.abs(change) < limit) {\r
        change = target - current;\r
      }\r
      return change;\r
    }\r
\r
    class CarLights {\r
      constructor(webgl, options, colors, speed, fade) {\r
        this.webgl = webgl;\r
        this.options = options;\r
        this.colors = colors;\r
        this.speed = speed;\r
        this.fade = fade;\r
      }\r
\r
      init() {\r
        const options = this.options;\r
        let curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));\r
        let geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);\r
\r
        let instanced = new THREE.InstancedBufferGeometry().copy(geometry);\r
        instanced.instanceCount = options.lightPairsPerRoadWay * 2;\r
\r
        let laneWidth = options.roadWidth / options.lanesPerRoad;\r
\r
        let aOffset = [];\r
        let aMetrics = [];\r
        let aColor = [];\r
\r
        let colors = this.colors;\r
        if (Array.isArray(colors)) {\r
          colors = colors.map(c => new THREE.Color(c));\r
        } else {\r
          colors = new THREE.Color(colors);\r
        }\r
\r
        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {\r
          let radius = random(options.carLightsRadius);\r
          let length = random(options.carLightsLength);\r
          let speed = random(this.speed);\r
\r
          let carLane = i % options.lanesPerRoad;\r
          let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;\r
\r
          let carWidth = random(options.carWidthPercentage) * laneWidth;\r
          let carShiftX = random(options.carShiftX) * laneWidth;\r
          laneX += carShiftX;\r
\r
          let offsetY = random(options.carFloorSeparation) + radius * 1.3;\r
\r
          let offsetZ = -random(options.length);\r
\r
          aOffset.push(laneX - carWidth / 2);\r
          aOffset.push(offsetY);\r
          aOffset.push(offsetZ);\r
\r
          aOffset.push(laneX + carWidth / 2);\r
          aOffset.push(offsetY);\r
          aOffset.push(offsetZ);\r
\r
          aMetrics.push(radius);\r
          aMetrics.push(length);\r
          aMetrics.push(speed);\r
\r
          aMetrics.push(radius);\r
          aMetrics.push(length);\r
          aMetrics.push(speed);\r
\r
          let color = pickRandom(colors);\r
          aColor.push(color.r);\r
          aColor.push(color.g);\r
          aColor.push(color.b);\r
\r
          aColor.push(color.r);\r
          aColor.push(color.g);\r
          aColor.push(color.b);\r
        }\r
\r
        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));\r
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));\r
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));\r
\r
        let material = new THREE.ShaderMaterial({\r
          fragmentShader: carLightsFragment,\r
          vertexShader: carLightsVertex,\r
          transparent: true,\r
          uniforms: Object.assign(\r
            {\r
              uTime: { value: 0 },\r
              uTravelLength: { value: options.length },\r
              uFade: { value: this.fade }\r
            },\r
            this.webgl.fogUniforms,\r
            options.distortion.uniforms\r
          )\r
        });\r
\r
        material.onBeforeCompile = shader => {\r
          shader.vertexShader = shader.vertexShader.replace(\r
            '#include <getDistortion_vertex>',\r
            options.distortion.getDistortion\r
          );\r
        };\r
\r
        let mesh = new THREE.Mesh(instanced, material);\r
        mesh.frustumCulled = false;\r
        this.webgl.scene.add(mesh);\r
        this.mesh = mesh;\r
      }\r
\r
      update(time) {\r
        this.mesh.material.uniforms.uTime.value = time;\r
      }\r
    }\r
\r
    const carLightsFragment = \`\r
      #define USE_FOG;\r
      \${THREE.ShaderChunk['fog_pars_fragment']}\r
      varying vec3 vColor;\r
      varying vec2 vUv; \r
      uniform vec2 uFade;\r
      void main() {\r
        vec3 color = vec3(vColor);\r
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);\r
        gl_FragColor = vec4(color, alpha);\r
        if (gl_FragColor.a < 0.0001) discard;\r
        \${THREE.ShaderChunk['fog_fragment']}\r
      }\r
    \`;\r
\r
    const carLightsVertex = \`\r
      #define USE_FOG;\r
      \${THREE.ShaderChunk['fog_pars_vertex']}\r
      attribute vec3 aOffset;\r
      attribute vec3 aMetrics;\r
      attribute vec3 aColor;\r
      uniform float uTravelLength;\r
      uniform float uTime;\r
      varying vec2 vUv; \r
      varying vec3 vColor; \r
      #include <getDistortion_vertex>\r
      void main() {\r
        vec3 transformed = position.xyz;\r
        float radius = aMetrics.r;\r
        float myLength = aMetrics.g;\r
        float speed = aMetrics.b;\r
\r
        transformed.xy *= radius;\r
        transformed.z *= myLength;\r
\r
        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);\r
        transformed.xy += aOffset.xy;\r
\r
        float progress = abs(transformed.z / uTravelLength);\r
        transformed.xyz += getDistortion(progress);\r
\r
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
        gl_Position = projectionMatrix * mvPosition;\r
        vUv = uv;\r
        vColor = aColor;\r
        \${THREE.ShaderChunk['fog_vertex']}\r
      }\r
    \`;\r
\r
    class LightsSticks {\r
      constructor(webgl, options) {\r
        this.webgl = webgl;\r
        this.options = options;\r
      }\r
\r
      init() {\r
        const options = this.options;\r
        const geometry = new THREE.PlaneGeometry(1, 1);\r
        let instanced = new THREE.InstancedBufferGeometry().copy(geometry);\r
        let totalSticks = options.totalSideLightSticks;\r
        instanced.instanceCount = totalSticks;\r
\r
        let stickoffset = options.length / (totalSticks - 1);\r
        const aOffset = [];\r
        const aColor = [];\r
        const aMetrics = [];\r
\r
        let colors = options.colors.sticks;\r
        if (Array.isArray(colors)) {\r
          colors = colors.map(c => new THREE.Color(c));\r
        } else {\r
          colors = new THREE.Color(colors);\r
        }\r
\r
        for (let i = 0; i < totalSticks; i++) {\r
          let width = random(options.lightStickWidth);\r
          let height = random(options.lightStickHeight);\r
          aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());\r
\r
          let color = pickRandom(colors);\r
          aColor.push(color.r);\r
          aColor.push(color.g);\r
          aColor.push(color.b);\r
\r
          aMetrics.push(width);\r
          aMetrics.push(height);\r
        }\r
\r
        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));\r
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));\r
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));\r
\r
        const material = new THREE.ShaderMaterial({\r
          fragmentShader: sideSticksFragment,\r
          vertexShader: sideSticksVertex,\r
          side: THREE.DoubleSide,\r
          uniforms: Object.assign(\r
            {\r
              uTravelLength: { value: options.length },\r
              uTime: { value: 0 }\r
            },\r
            this.webgl.fogUniforms,\r
            options.distortion.uniforms\r
          )\r
        });\r
\r
        material.onBeforeCompile = shader => {\r
          shader.vertexShader = shader.vertexShader.replace(\r
            '#include <getDistortion_vertex>',\r
            options.distortion.getDistortion\r
          );\r
        };\r
\r
        const mesh = new THREE.Mesh(instanced, material);\r
        mesh.frustumCulled = false;\r
        this.webgl.scene.add(mesh);\r
        this.mesh = mesh;\r
      }\r
\r
      update(time) {\r
        this.mesh.material.uniforms.uTime.value = time;\r
      }\r
    }\r
\r
    const sideSticksVertex = \`\r
      #define USE_FOG;\r
      \${THREE.ShaderChunk['fog_pars_vertex']}\r
      attribute float aOffset;\r
      attribute vec3 aColor;\r
      attribute vec2 aMetrics;\r
      uniform float uTravelLength;\r
      uniform float uTime;\r
      varying vec3 vColor;\r
      mat4 rotationY( in float angle ) {\r
        return mat4(	cos(angle),		0,		sin(angle),	0,\r
                     0,		1.0,			 0,	0,\r
                -sin(angle),	0,		cos(angle),	0,\r
                0, 		0,				0,	1);\r
      }\r
      #include <getDistortion_vertex>\r
      void main(){\r
        vec3 transformed = position.xyz;\r
        float width = aMetrics.x;\r
        float height = aMetrics.y;\r
\r
        transformed.xy *= vec2(width, height);\r
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);\r
\r
        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;\r
\r
        transformed.z += - uTravelLength + time;\r
\r
        float progress = abs(transformed.z / uTravelLength);\r
        transformed.xyz += getDistortion(progress);\r
\r
        transformed.y += height / 2.;\r
        transformed.x += -width / 2.;\r
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
        gl_Position = projectionMatrix * mvPosition;\r
        vColor = aColor;\r
        \${THREE.ShaderChunk['fog_vertex']}\r
      }\r
    \`;\r
\r
    const sideSticksFragment = \`\r
      #define USE_FOG;\r
      \${THREE.ShaderChunk['fog_pars_fragment']}\r
      varying vec3 vColor;\r
      void main(){\r
        vec3 color = vec3(vColor);\r
        gl_FragColor = vec4(color,1.);\r
        \${THREE.ShaderChunk['fog_fragment']}\r
      }\r
    \`;\r
\r
    class Road {\r
      constructor(webgl, options) {\r
        this.webgl = webgl;\r
        this.options = options;\r
        this.uTime = { value: 0 };\r
      }\r
\r
      createPlane(side, width, isRoad) {\r
        const options = this.options;\r
        let segments = 100;\r
        const geometry = new THREE.PlaneGeometry(\r
          isRoad ? options.roadWidth : options.islandWidth,\r
          options.length,\r
          20,\r
          segments\r
        );\r
        let uniforms = {\r
          uTravelLength: { value: options.length },\r
          uColor: { value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor) },\r
          uTime: this.uTime\r
        };\r
\r
        if (isRoad) {\r
          uniforms = Object.assign(uniforms, {\r
            uLanes: { value: options.lanesPerRoad },\r
            uBrokenLinesColor: { value: new THREE.Color(options.colors.brokenLines) },\r
            uShoulderLinesColor: { value: new THREE.Color(options.colors.shoulderLines) },\r
            uShoulderLinesWidthPercentage: { value: options.shoulderLinesWidthPercentage },\r
            uBrokenLinesLengthPercentage: { value: options.brokenLinesLengthPercentage },\r
            uBrokenLinesWidthPercentage: { value: options.brokenLinesWidthPercentage }\r
          });\r
        }\r
\r
        const material = new THREE.ShaderMaterial({\r
          fragmentShader: isRoad ? roadFragment : islandFragment,\r
          vertexShader: roadVertex,\r
          side: THREE.DoubleSide,\r
          uniforms: Object.assign(uniforms, this.webgl.fogUniforms, options.distortion.uniforms)\r
        });\r
\r
        material.onBeforeCompile = shader => {\r
          shader.vertexShader = shader.vertexShader.replace(\r
            '#include <getDistortion_vertex>',\r
            options.distortion.getDistortion\r
          );\r
        };\r
\r
        const mesh = new THREE.Mesh(geometry, material);\r
        mesh.rotation.x = -Math.PI / 2;\r
        mesh.position.z = -options.length / 2;\r
        mesh.position.x += (this.options.islandWidth / 2 + options.roadWidth / 2) * side;\r
        this.webgl.scene.add(mesh);\r
\r
        return mesh;\r
      }\r
\r
      init() {\r
        this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);\r
        this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);\r
        this.island = this.createPlane(0, this.options.islandWidth, false);\r
      }\r
\r
      update(time) {\r
        this.uTime.value = time;\r
      }\r
    }\r
\r
    const roadBaseFragment = \`\r
      #define USE_FOG;\r
      varying vec2 vUv; \r
      uniform vec3 uColor;\r
      uniform float uTime;\r
      #include <roadMarkings_vars>\r
      \${THREE.ShaderChunk['fog_pars_fragment']}\r
      void main() {\r
        vec2 uv = vUv;\r
        vec3 color = vec3(uColor);\r
        #include <roadMarkings_fragment>\r
        gl_FragColor = vec4(color, 1.);\r
        \${THREE.ShaderChunk['fog_fragment']}\r
      }\r
    \`;\r
\r
    const islandFragment = roadBaseFragment\r
      .replace('#include <roadMarkings_fragment>', '')\r
      .replace('#include <roadMarkings_vars>', '');\r
\r
    const roadMarkings_vars = \`\r
      uniform float uLanes;\r
      uniform vec3 uBrokenLinesColor;\r
      uniform vec3 uShoulderLinesColor;\r
      uniform float uShoulderLinesWidthPercentage;\r
      uniform float uBrokenLinesWidthPercentage;\r
      uniform float uBrokenLinesLengthPercentage;\r
      highp float random(vec2 co) {\r
        highp float a = 12.9898;\r
        highp float b = 78.233;\r
        highp float c = 43758.5453;\r
        highp float dt = dot(co.xy, vec2(a, b));\r
        highp float sn = mod(dt, 3.14);\r
        return fract(sin(sn) * c);\r
      }\r
    \`;\r
\r
    const roadMarkings_fragment = \`\r
      uv.y = mod(uv.y + uTime * 0.05, 1.);\r
      float laneWidth = 1.0 / uLanes;\r
      float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;\r
      float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;\r
\r
      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));\r
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);\r
\r
      brokenLines = mix(brokenLines, sideLines, uv.x);\r
    \`;\r
\r
    const roadFragment = roadBaseFragment\r
      .replace('#include <roadMarkings_fragment>', roadMarkings_fragment)\r
      .replace('#include <roadMarkings_vars>', roadMarkings_vars);\r
\r
    const roadVertex = \`\r
      #define USE_FOG;\r
      uniform float uTime;\r
      \${THREE.ShaderChunk['fog_pars_vertex']}\r
      uniform float uTravelLength;\r
      varying vec2 vUv; \r
      #include <getDistortion_vertex>\r
      void main() {\r
        vec3 transformed = position.xyz;\r
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);\r
        transformed.x += distortion.x;\r
        transformed.z += distortion.y;\r
        transformed.y += -1. * distortion.z;  \r
        \r
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
        gl_Position = projectionMatrix * mvPosition;\r
        vUv = uv;\r
        \${THREE.ShaderChunk['fog_vertex']}\r
      }\r
    \`;\r
\r
    function resizeRendererToDisplaySize(renderer, setSize) {\r
      const canvas = renderer.domElement;\r
      const width = canvas.clientWidth;\r
      const height = canvas.clientHeight;\r
      const needResize = canvas.width !== width || canvas.height !== height;\r
      if (needResize) {\r
        setSize(width, height, false);\r
      }\r
      return needResize;\r
    }\r
\r
    (function () {\r
      const container = document.getElementById('lights');\r
      const options = { ...effectOptions };\r
      options.distortion = distortions[options.distortion];\r
\r
      const myApp = new App(container, options);\r
      appRef.current = myApp;\r
      myApp.loadAssets().then(myApp.init);\r
    })();\r
\r
    return () => {\r
      if (appRef.current) {\r
        appRef.current.dispose();\r
      }\r
    };\r
  }, [effectOptions]);\r
\r
  return <div id="lights" ref={hyperspeed}></div>;\r
};\r
\r
export default Hyperspeed;\r
`,qr=`#lights {\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  position: absolute;\r
}\r
\r
canvas {\r
  width: 100%;\r
  height: 100%;\r
}\r
`,Ur=`import { useEffect, useRef } from 'react';\r
import * as THREE from 'three';\r
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';\r
\r
const Hyperspeed = ({\r
  effectOptions = {\r
    onSpeedUp: () => {},\r
    onSlowDown: () => {},\r
    distortion: 'turbulentDistortion',\r
    length: 400,\r
    roadWidth: 10,\r
    islandWidth: 2,\r
    lanesPerRoad: 4,\r
    fov: 90,\r
    fovSpeedUp: 150,\r
    speedUp: 2,\r
    carLightsFade: 0.4,\r
    totalSideLightSticks: 20,\r
    lightPairsPerRoadWay: 40,\r
    shoulderLinesWidthPercentage: 0.05,\r
    brokenLinesWidthPercentage: 0.1,\r
    brokenLinesLengthPercentage: 0.5,\r
    lightStickWidth: [0.12, 0.5],\r
    lightStickHeight: [1.3, 1.7],\r
    movingAwaySpeed: [60, 80],\r
    movingCloserSpeed: [-120, -160],\r
    carLightsLength: [400 * 0.03, 400 * 0.2],\r
    carLightsRadius: [0.05, 0.14],\r
    carWidthPercentage: [0.3, 0.5],\r
    carShiftX: [-0.8, 0.8],\r
    carFloorSeparation: [0, 5],\r
    colors: {\r
      roadColor: 0x080808,\r
      islandColor: 0x0a0a0a,\r
      background: 0x000000,\r
      shoulderLines: 0xffffff,\r
      brokenLines: 0xffffff,\r
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],\r
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],\r
      sticks: 0x03b3c3\r
    }\r
  }\r
}) => {\r
  const hyperspeed = useRef(null);\r
  const appRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (appRef.current) {\r
      appRef.current.dispose();\r
      const container = document.getElementById('lights');\r
      if (container) {\r
        while (container.firstChild) {\r
          container.removeChild(container.firstChild);\r
        }\r
      }\r
    }\r
\r
    const mountainUniforms = {\r
      uFreq: { value: new THREE.Vector3(3, 6, 10) },\r
      uAmp: { value: new THREE.Vector3(30, 30, 20) }\r
    };\r
\r
    const xyUniforms = {\r
      uFreq: { value: new THREE.Vector2(5, 2) },\r
      uAmp: { value: new THREE.Vector2(25, 15) }\r
    };\r
\r
    const LongRaceUniforms = {\r
      uFreq: { value: new THREE.Vector2(2, 3) },\r
      uAmp: { value: new THREE.Vector2(35, 10) }\r
    };\r
\r
    const turbulentUniforms = {\r
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },\r
      uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }\r
    };\r
\r
    const deepUniforms = {\r
      uFreq: { value: new THREE.Vector2(4, 8) },\r
      uAmp: { value: new THREE.Vector2(10, 20) },\r
      uPowY: { value: new THREE.Vector2(20, 2) }\r
    };\r
\r
    let nsin = val => Math.sin(val) * 0.5 + 0.5;\r
\r
    const distortions = {\r
      mountainDistortion: {\r
        uniforms: mountainUniforms,\r
        getDistortion: \`\r
          uniform vec3 uAmp;\r
          uniform vec3 uFreq;\r
          #define PI 3.14159265358979\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          vec3 getDistortion(float progress){\r
            float movementProgressFix = 0.02;\r
            return vec3( \r
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,\r
              nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,\r
              nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          let movementProgressFix = 0.02;\r
          let uFreq = mountainUniforms.uFreq.value;\r
          let uAmp = mountainUniforms.uAmp.value;\r
          let distortion = new THREE.Vector3(\r
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
              Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,\r
            nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -\r
              nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,\r
            nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -\r
              nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z\r
          );\r
          let lookAtAmp = new THREE.Vector3(2, 2, 2);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -5);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      },\r
      xyDistortion: {\r
        uniforms: xyUniforms,\r
        getDistortion: \`\r
          uniform vec2 uFreq;\r
          uniform vec2 uAmp;\r
          #define PI 3.14159265358979\r
          vec3 getDistortion(float progress){\r
            float movementProgressFix = 0.02;\r
            return vec3( \r
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,\r
              sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,\r
              0.\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          let movementProgressFix = 0.02;\r
          let uFreq = xyUniforms.uFreq.value;\r
          let uAmp = xyUniforms.uAmp.value;\r
          let distortion = new THREE.Vector3(\r
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
              Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,\r
            Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -\r
              Math.sin(movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y,\r
            0\r
          );\r
          let lookAtAmp = new THREE.Vector3(2, 0.4, 1);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -3);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      },\r
      LongRaceDistortion: {\r
        uniforms: LongRaceUniforms,\r
        getDistortion: \`\r
          uniform vec2 uFreq;\r
          uniform vec2 uAmp;\r
          #define PI 3.14159265358979\r
          vec3 getDistortion(float progress){\r
            float camProgress = 0.0125;\r
            return vec3( \r
              sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,\r
              sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,\r
              0.\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          let camProgress = 0.0125;\r
          let uFreq = LongRaceUniforms.uFreq.value;\r
          let uAmp = LongRaceUniforms.uAmp.value;\r
          let distortion = new THREE.Vector3(\r
            Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
              Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x,\r
            Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -\r
              Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y,\r
            0\r
          );\r
          let lookAtAmp = new THREE.Vector3(1, 1, 0);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -5);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      },\r
      turbulentDistortion: {\r
        uniforms: turbulentUniforms,\r
        getDistortion: \`\r
          uniform vec4 uFreq;\r
          uniform vec4 uAmp;\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          #define PI 3.14159265358979\r
          float getDistortionX(float progress){\r
            return (\r
              cos(PI * progress * uFreq.r + uTime) * uAmp.r +\r
              pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g\r
            );\r
          }\r
          float getDistortionY(float progress){\r
            return (\r
              -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +\r
              -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a\r
            );\r
          }\r
          vec3 getDistortion(float progress){\r
            return vec3(\r
              getDistortionX(progress) - getDistortionX(0.0125),\r
              getDistortionY(progress) - getDistortionY(0.0125),\r
              0.\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          const uFreq = turbulentUniforms.uFreq.value;\r
          const uAmp = turbulentUniforms.uAmp.value;\r
\r
          const getX = p =>\r
            Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +\r
            Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;\r
\r
          const getY = p =>\r
            -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -\r
            Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;\r
\r
          let distortion = new THREE.Vector3(\r
            getX(progress) - getX(progress + 0.007),\r
            getY(progress) - getY(progress + 0.007),\r
            0\r
          );\r
          let lookAtAmp = new THREE.Vector3(-2, -5, 0);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -10);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      },\r
      turbulentDistortionStill: {\r
        uniforms: turbulentUniforms,\r
        getDistortion: \`\r
          uniform vec4 uFreq;\r
          uniform vec4 uAmp;\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          #define PI 3.14159265358979\r
          float getDistortionX(float progress){\r
            return (\r
              cos(PI * progress * uFreq.r) * uAmp.r +\r
              pow(cos(PI * progress * uFreq.g * (uFreq.g / uFreq.r)), 2. ) * uAmp.g\r
            );\r
          }\r
          float getDistortionY(float progress){\r
            return (\r
              -nsin(PI * progress * uFreq.b) * uAmp.b +\r
              -pow(nsin(PI * progress * uFreq.a / (uFreq.b / uFreq.a)), 5.) * uAmp.a\r
            );\r
          }\r
          vec3 getDistortion(float progress){\r
            return vec3(\r
              getDistortionX(progress) - getDistortionX(0.02),\r
              getDistortionY(progress) - getDistortionY(0.02),\r
              0.\r
            );\r
          }\r
        \`\r
      },\r
      deepDistortionStill: {\r
        uniforms: deepUniforms,\r
        getDistortion: \`\r
          uniform vec4 uFreq;\r
          uniform vec4 uAmp;\r
          uniform vec2 uPowY;\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          #define PI 3.14159265358979\r
          float getDistortionX(float progress){\r
            return (\r
              sin(progress * PI * uFreq.x) * uAmp.x * 2.\r
            );\r
          }\r
          float getDistortionY(float progress){\r
            return (\r
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y) * uAmp.y\r
            );\r
          }\r
          vec3 getDistortion(float progress){\r
            return vec3(\r
              getDistortionX(progress) - getDistortionX(0.02),\r
              getDistortionY(progress) - getDistortionY(0.05),\r
              0.\r
            );\r
          }\r
        \`\r
      },\r
      deepDistortion: {\r
        uniforms: deepUniforms,\r
        getDistortion: \`\r
          uniform vec4 uFreq;\r
          uniform vec4 uAmp;\r
          uniform vec2 uPowY;\r
          float nsin(float val){\r
            return sin(val) * 0.5 + 0.5;\r
          }\r
          #define PI 3.14159265358979\r
          float getDistortionX(float progress){\r
            return (\r
              sin(progress * PI * uFreq.x + uTime) * uAmp.x\r
            );\r
          }\r
          float getDistortionY(float progress){\r
            return (\r
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y\r
            );\r
          }\r
          vec3 getDistortion(float progress){\r
            return vec3(\r
              getDistortionX(progress) - getDistortionX(0.02),\r
              getDistortionY(progress) - getDistortionY(0.02),\r
              0.\r
            );\r
          }\r
        \`,\r
        getJS: (progress, time) => {\r
          const uFreq = deepUniforms.uFreq.value;\r
          const uAmp = deepUniforms.uAmp.value;\r
          const uPowY = deepUniforms.uPowY.value;\r
\r
          const getX = p => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x;\r
          const getY = p => Math.pow(p * uPowY.x, uPowY.y) + Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y;\r
\r
          let distortion = new THREE.Vector3(\r
            getX(progress) - getX(progress + 0.01),\r
            getY(progress) - getY(progress + 0.01),\r
            0\r
          );\r
          let lookAtAmp = new THREE.Vector3(-2, -4, 0);\r
          let lookAtOffset = new THREE.Vector3(0, 0, -10);\r
          return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
        }\r
      }\r
    };\r
\r
    class App {\r
      constructor(container, options = {}) {\r
        this.options = options;\r
        if (this.options.distortion == null) {\r
          this.options.distortion = {\r
            uniforms: distortion_uniforms,\r
            getDistortion: distortion_vertex\r
          };\r
        }\r
        this.container = container;\r
        this.renderer = new THREE.WebGLRenderer({\r
          antialias: false,\r
          alpha: true\r
        });\r
        this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);\r
        this.renderer.setPixelRatio(window.devicePixelRatio);\r
        this.composer = new EffectComposer(this.renderer);\r
        container.append(this.renderer.domElement);\r
\r
        this.camera = new THREE.PerspectiveCamera(\r
          options.fov,\r
          container.offsetWidth / container.offsetHeight,\r
          0.1,\r
          10000\r
        );\r
        this.camera.position.z = -5;\r
        this.camera.position.y = 8;\r
        this.camera.position.x = 0;\r
        this.scene = new THREE.Scene();\r
        this.scene.background = null;\r
\r
        let fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);\r
        this.scene.fog = fog;\r
        this.fogUniforms = {\r
          fogColor: { value: fog.color },\r
          fogNear: { value: fog.near },\r
          fogFar: { value: fog.far }\r
        };\r
        this.clock = new THREE.Clock();\r
        this.assets = {};\r
        this.disposed = false;\r
\r
        this.road = new Road(this, options);\r
        this.leftCarLights = new CarLights(\r
          this,\r
          options,\r
          options.colors.leftCars,\r
          options.movingAwaySpeed,\r
          new THREE.Vector2(0, 1 - options.carLightsFade)\r
        );\r
        this.rightCarLights = new CarLights(\r
          this,\r
          options,\r
          options.colors.rightCars,\r
          options.movingCloserSpeed,\r
          new THREE.Vector2(1, 0 + options.carLightsFade)\r
        );\r
        this.leftSticks = new LightsSticks(this, options);\r
\r
        this.fovTarget = options.fov;\r
        this.speedUpTarget = 0;\r
        this.speedUp = 0;\r
        this.timeOffset = 0;\r
\r
        this.tick = this.tick.bind(this);\r
        this.init = this.init.bind(this);\r
        this.setSize = this.setSize.bind(this);\r
        this.onMouseDown = this.onMouseDown.bind(this);\r
        this.onMouseUp = this.onMouseUp.bind(this);\r
\r
        this.onTouchStart = this.onTouchStart.bind(this);\r
        this.onTouchEnd = this.onTouchEnd.bind(this);\r
        this.onContextMenu = this.onContextMenu.bind(this);\r
\r
        window.addEventListener('resize', this.onWindowResize.bind(this));\r
      }\r
\r
      onWindowResize() {\r
        const width = this.container.offsetWidth;\r
        const height = this.container.offsetHeight;\r
\r
        this.renderer.setSize(width, height);\r
        this.camera.aspect = width / height;\r
        this.camera.updateProjectionMatrix();\r
        this.composer.setSize(width, height);\r
      }\r
\r
      initPasses() {\r
        this.renderPass = new RenderPass(this.scene, this.camera);\r
        this.bloomPass = new EffectPass(\r
          this.camera,\r
          new BloomEffect({\r
            luminanceThreshold: 0.2,\r
            luminanceSmoothing: 0,\r
            resolutionScale: 1\r
          })\r
        );\r
\r
        const smaaPass = new EffectPass(\r
          this.camera,\r
          new SMAAEffect({\r
            preset: SMAAPreset.MEDIUM,\r
            searchImage: SMAAEffect.searchImageDataURL,\r
            areaImage: SMAAEffect.areaImageDataURL\r
          })\r
        );\r
        this.renderPass.renderToScreen = false;\r
        this.bloomPass.renderToScreen = false;\r
        smaaPass.renderToScreen = true;\r
        this.composer.addPass(this.renderPass);\r
        this.composer.addPass(this.bloomPass);\r
        this.composer.addPass(smaaPass);\r
      }\r
\r
      loadAssets() {\r
        const assets = this.assets;\r
        return new Promise(resolve => {\r
          const manager = new THREE.LoadingManager(resolve);\r
\r
          const searchImage = new Image();\r
          const areaImage = new Image();\r
          assets.smaa = {};\r
          searchImage.addEventListener('load', function () {\r
            assets.smaa.search = this;\r
            manager.itemEnd('smaa-search');\r
          });\r
\r
          areaImage.addEventListener('load', function () {\r
            assets.smaa.area = this;\r
            manager.itemEnd('smaa-area');\r
          });\r
          manager.itemStart('smaa-search');\r
          manager.itemStart('smaa-area');\r
\r
          searchImage.src = SMAAEffect.searchImageDataURL;\r
          areaImage.src = SMAAEffect.areaImageDataURL;\r
        });\r
      }\r
\r
      init() {\r
        this.initPasses();\r
        const options = this.options;\r
        this.road.init();\r
        this.leftCarLights.init();\r
\r
        this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);\r
        this.rightCarLights.init();\r
        this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);\r
        this.leftSticks.init();\r
        this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));\r
\r
        this.container.addEventListener('mousedown', this.onMouseDown);\r
        this.container.addEventListener('mouseup', this.onMouseUp);\r
        this.container.addEventListener('mouseout', this.onMouseUp);\r
\r
        this.container.addEventListener('touchstart', this.onTouchStart, { passive: true });\r
        this.container.addEventListener('touchend', this.onTouchEnd, { passive: true });\r
        this.container.addEventListener('touchcancel', this.onTouchEnd, { passive: true });\r
        this.container.addEventListener('contextmenu', this.onContextMenu);\r
\r
        this.tick();\r
      }\r
\r
      onMouseDown(ev) {\r
        if (this.options.onSpeedUp) this.options.onSpeedUp(ev);\r
        this.fovTarget = this.options.fovSpeedUp;\r
        this.speedUpTarget = this.options.speedUp;\r
      }\r
\r
      onMouseUp(ev) {\r
        if (this.options.onSlowDown) this.options.onSlowDown(ev);\r
        this.fovTarget = this.options.fov;\r
        this.speedUpTarget = 0;\r
      }\r
\r
      onTouchStart(ev) {\r
        if (this.options.onSpeedUp) this.options.onSpeedUp(ev);\r
        this.fovTarget = this.options.fovSpeedUp;\r
        this.speedUpTarget = this.options.speedUp;\r
      }\r
\r
      onTouchEnd(ev) {\r
        if (this.options.onSlowDown) this.options.onSlowDown(ev);\r
        this.fovTarget = this.options.fov;\r
        this.speedUpTarget = 0;\r
      }\r
\r
      onContextMenu(ev) {\r
        ev.preventDefault();\r
      }\r
\r
      update(delta) {\r
        let lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);\r
        this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);\r
        this.timeOffset += this.speedUp * delta;\r
\r
        let time = this.clock.elapsedTime + this.timeOffset;\r
\r
        this.rightCarLights.update(time);\r
        this.leftCarLights.update(time);\r
        this.leftSticks.update(time);\r
        this.road.update(time);\r
\r
        let updateCamera = false;\r
        let fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage);\r
        if (fovChange !== 0) {\r
          this.camera.fov += fovChange * delta * 6;\r
          updateCamera = true;\r
        }\r
\r
        if (this.options.distortion.getJS) {\r
          const distortion = this.options.distortion.getJS(0.025, time);\r
\r
          this.camera.lookAt(\r
            new THREE.Vector3(\r
              this.camera.position.x + distortion.x,\r
              this.camera.position.y + distortion.y,\r
              this.camera.position.z + distortion.z\r
            )\r
          );\r
          updateCamera = true;\r
        }\r
        if (updateCamera) {\r
          this.camera.updateProjectionMatrix();\r
        }\r
\r
        if (this.options.isHyper) {\r
          console.log(this.options.isHyper);\r
        }\r
      }\r
\r
      render(delta) {\r
        this.composer.render(delta);\r
      }\r
\r
      dispose() {\r
        this.disposed = true;\r
\r
        if (this.renderer) {\r
          this.renderer.dispose();\r
        }\r
        if (this.composer) {\r
          this.composer.dispose();\r
        }\r
        if (this.scene) {\r
          this.scene.clear();\r
        }\r
\r
        window.removeEventListener('resize', this.onWindowResize.bind(this));\r
        if (this.container) {\r
          this.container.removeEventListener('mousedown', this.onMouseDown);\r
          this.container.removeEventListener('mouseup', this.onMouseUp);\r
          this.container.removeEventListener('mouseout', this.onMouseUp);\r
\r
          this.container.removeEventListener('touchstart', this.onTouchStart);\r
          this.container.removeEventListener('touchend', this.onTouchEnd);\r
          this.container.removeEventListener('touchcancel', this.onTouchEnd);\r
          this.container.removeEventListener('contextmenu', this.onContextMenu);\r
        }\r
      }\r
\r
      setSize(width, height, updateStyles) {\r
        this.composer.setSize(width, height, updateStyles);\r
      }\r
\r
      tick() {\r
        if (this.disposed || !this) return;\r
        if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {\r
          const canvas = this.renderer.domElement;\r
          this.camera.aspect = canvas.clientWidth / canvas.clientHeight;\r
          this.camera.updateProjectionMatrix();\r
        }\r
        const delta = this.clock.getDelta();\r
        this.render(delta);\r
        this.update(delta);\r
        requestAnimationFrame(this.tick);\r
      }\r
    }\r
\r
    const distortion_uniforms = {\r
      uDistortionX: { value: new THREE.Vector2(80, 3) },\r
      uDistortionY: { value: new THREE.Vector2(-40, 2.5) }\r
    };\r
\r
    const distortion_vertex = \`\r
      #define PI 3.14159265358979\r
      uniform vec2 uDistortionX;\r
      uniform vec2 uDistortionY;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      vec3 getDistortion(float progress){\r
        progress = clamp(progress, 0., 1.);\r
        float xAmp = uDistortionX.r;\r
        float xFreq = uDistortionX.g;\r
        float yAmp = uDistortionY.r;\r
        float yFreq = uDistortionY.g;\r
        return vec3( \r
          xAmp * nsin(progress * PI * xFreq - PI / 2.),\r
          yAmp * nsin(progress * PI * yFreq - PI / 2.),\r
          0.\r
        );\r
      }\r
    \`;\r
\r
    const random = base => {\r
      if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];\r
      return Math.random() * base;\r
    };\r
\r
    const pickRandom = arr => {\r
      if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];\r
      return arr;\r
    };\r
\r
    function lerp(current, target, speed = 0.1, limit = 0.001) {\r
      let change = (target - current) * speed;\r
      if (Math.abs(change) < limit) {\r
        change = target - current;\r
      }\r
      return change;\r
    }\r
\r
    class CarLights {\r
      constructor(webgl, options, colors, speed, fade) {\r
        this.webgl = webgl;\r
        this.options = options;\r
        this.colors = colors;\r
        this.speed = speed;\r
        this.fade = fade;\r
      }\r
\r
      init() {\r
        const options = this.options;\r
        let curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));\r
        let geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);\r
\r
        let instanced = new THREE.InstancedBufferGeometry().copy(geometry);\r
        instanced.instanceCount = options.lightPairsPerRoadWay * 2;\r
\r
        let laneWidth = options.roadWidth / options.lanesPerRoad;\r
\r
        let aOffset = [];\r
        let aMetrics = [];\r
        let aColor = [];\r
\r
        let colors = this.colors;\r
        if (Array.isArray(colors)) {\r
          colors = colors.map(c => new THREE.Color(c));\r
        } else {\r
          colors = new THREE.Color(colors);\r
        }\r
\r
        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {\r
          let radius = random(options.carLightsRadius);\r
          let length = random(options.carLightsLength);\r
          let speed = random(this.speed);\r
\r
          let carLane = i % options.lanesPerRoad;\r
          let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;\r
\r
          let carWidth = random(options.carWidthPercentage) * laneWidth;\r
          let carShiftX = random(options.carShiftX) * laneWidth;\r
          laneX += carShiftX;\r
\r
          let offsetY = random(options.carFloorSeparation) + radius * 1.3;\r
\r
          let offsetZ = -random(options.length);\r
\r
          aOffset.push(laneX - carWidth / 2);\r
          aOffset.push(offsetY);\r
          aOffset.push(offsetZ);\r
\r
          aOffset.push(laneX + carWidth / 2);\r
          aOffset.push(offsetY);\r
          aOffset.push(offsetZ);\r
\r
          aMetrics.push(radius);\r
          aMetrics.push(length);\r
          aMetrics.push(speed);\r
\r
          aMetrics.push(radius);\r
          aMetrics.push(length);\r
          aMetrics.push(speed);\r
\r
          let color = pickRandom(colors);\r
          aColor.push(color.r);\r
          aColor.push(color.g);\r
          aColor.push(color.b);\r
\r
          aColor.push(color.r);\r
          aColor.push(color.g);\r
          aColor.push(color.b);\r
        }\r
\r
        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));\r
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));\r
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));\r
\r
        let material = new THREE.ShaderMaterial({\r
          fragmentShader: carLightsFragment,\r
          vertexShader: carLightsVertex,\r
          transparent: true,\r
          uniforms: Object.assign(\r
            {\r
              uTime: { value: 0 },\r
              uTravelLength: { value: options.length },\r
              uFade: { value: this.fade }\r
            },\r
            this.webgl.fogUniforms,\r
            options.distortion.uniforms\r
          )\r
        });\r
\r
        material.onBeforeCompile = shader => {\r
          shader.vertexShader = shader.vertexShader.replace(\r
            '#include <getDistortion_vertex>',\r
            options.distortion.getDistortion\r
          );\r
        };\r
\r
        let mesh = new THREE.Mesh(instanced, material);\r
        mesh.frustumCulled = false;\r
        this.webgl.scene.add(mesh);\r
        this.mesh = mesh;\r
      }\r
\r
      update(time) {\r
        this.mesh.material.uniforms.uTime.value = time;\r
      }\r
    }\r
\r
    const carLightsFragment = \`\r
      #define USE_FOG;\r
      \${THREE.ShaderChunk['fog_pars_fragment']}\r
      varying vec3 vColor;\r
      varying vec2 vUv; \r
      uniform vec2 uFade;\r
      void main() {\r
        vec3 color = vec3(vColor);\r
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);\r
        gl_FragColor = vec4(color, alpha);\r
        if (gl_FragColor.a < 0.0001) discard;\r
        \${THREE.ShaderChunk['fog_fragment']}\r
      }\r
    \`;\r
\r
    const carLightsVertex = \`\r
      #define USE_FOG;\r
      \${THREE.ShaderChunk['fog_pars_vertex']}\r
      attribute vec3 aOffset;\r
      attribute vec3 aMetrics;\r
      attribute vec3 aColor;\r
      uniform float uTravelLength;\r
      uniform float uTime;\r
      varying vec2 vUv; \r
      varying vec3 vColor; \r
      #include <getDistortion_vertex>\r
      void main() {\r
        vec3 transformed = position.xyz;\r
        float radius = aMetrics.r;\r
        float myLength = aMetrics.g;\r
        float speed = aMetrics.b;\r
\r
        transformed.xy *= radius;\r
        transformed.z *= myLength;\r
\r
        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);\r
        transformed.xy += aOffset.xy;\r
\r
        float progress = abs(transformed.z / uTravelLength);\r
        transformed.xyz += getDistortion(progress);\r
\r
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
        gl_Position = projectionMatrix * mvPosition;\r
        vUv = uv;\r
        vColor = aColor;\r
        \${THREE.ShaderChunk['fog_vertex']}\r
      }\r
    \`;\r
\r
    class LightsSticks {\r
      constructor(webgl, options) {\r
        this.webgl = webgl;\r
        this.options = options;\r
      }\r
\r
      init() {\r
        const options = this.options;\r
        const geometry = new THREE.PlaneGeometry(1, 1);\r
        let instanced = new THREE.InstancedBufferGeometry().copy(geometry);\r
        let totalSticks = options.totalSideLightSticks;\r
        instanced.instanceCount = totalSticks;\r
\r
        let stickoffset = options.length / (totalSticks - 1);\r
        const aOffset = [];\r
        const aColor = [];\r
        const aMetrics = [];\r
\r
        let colors = options.colors.sticks;\r
        if (Array.isArray(colors)) {\r
          colors = colors.map(c => new THREE.Color(c));\r
        } else {\r
          colors = new THREE.Color(colors);\r
        }\r
\r
        for (let i = 0; i < totalSticks; i++) {\r
          let width = random(options.lightStickWidth);\r
          let height = random(options.lightStickHeight);\r
          aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());\r
\r
          let color = pickRandom(colors);\r
          aColor.push(color.r);\r
          aColor.push(color.g);\r
          aColor.push(color.b);\r
\r
          aMetrics.push(width);\r
          aMetrics.push(height);\r
        }\r
\r
        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));\r
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));\r
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));\r
\r
        const material = new THREE.ShaderMaterial({\r
          fragmentShader: sideSticksFragment,\r
          vertexShader: sideSticksVertex,\r
          side: THREE.DoubleSide,\r
          uniforms: Object.assign(\r
            {\r
              uTravelLength: { value: options.length },\r
              uTime: { value: 0 }\r
            },\r
            this.webgl.fogUniforms,\r
            options.distortion.uniforms\r
          )\r
        });\r
\r
        material.onBeforeCompile = shader => {\r
          shader.vertexShader = shader.vertexShader.replace(\r
            '#include <getDistortion_vertex>',\r
            options.distortion.getDistortion\r
          );\r
        };\r
\r
        const mesh = new THREE.Mesh(instanced, material);\r
        mesh.frustumCulled = false;\r
        this.webgl.scene.add(mesh);\r
        this.mesh = mesh;\r
      }\r
\r
      update(time) {\r
        this.mesh.material.uniforms.uTime.value = time;\r
      }\r
    }\r
\r
    const sideSticksVertex = \`\r
      #define USE_FOG;\r
      \${THREE.ShaderChunk['fog_pars_vertex']}\r
      attribute float aOffset;\r
      attribute vec3 aColor;\r
      attribute vec2 aMetrics;\r
      uniform float uTravelLength;\r
      uniform float uTime;\r
      varying vec3 vColor;\r
      mat4 rotationY( in float angle ) {\r
        return mat4(	cos(angle),		0,		sin(angle),	0,\r
                     0,		1.0,			 0,	0,\r
                -sin(angle),	0,		cos(angle),	0,\r
                0, 		0,				0,	1);\r
      }\r
      #include <getDistortion_vertex>\r
      void main(){\r
        vec3 transformed = position.xyz;\r
        float width = aMetrics.x;\r
        float height = aMetrics.y;\r
\r
        transformed.xy *= vec2(width, height);\r
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);\r
\r
        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;\r
\r
        transformed.z += - uTravelLength + time;\r
\r
        float progress = abs(transformed.z / uTravelLength);\r
        transformed.xyz += getDistortion(progress);\r
\r
        transformed.y += height / 2.;\r
        transformed.x += -width / 2.;\r
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
        gl_Position = projectionMatrix * mvPosition;\r
        vColor = aColor;\r
        \${THREE.ShaderChunk['fog_vertex']}\r
      }\r
    \`;\r
\r
    const sideSticksFragment = \`\r
      #define USE_FOG;\r
      \${THREE.ShaderChunk['fog_pars_fragment']}\r
      varying vec3 vColor;\r
      void main(){\r
        vec3 color = vec3(vColor);\r
        gl_FragColor = vec4(color,1.);\r
        \${THREE.ShaderChunk['fog_fragment']}\r
      }\r
    \`;\r
\r
    class Road {\r
      constructor(webgl, options) {\r
        this.webgl = webgl;\r
        this.options = options;\r
        this.uTime = { value: 0 };\r
      }\r
\r
      createPlane(side, width, isRoad) {\r
        const options = this.options;\r
        let segments = 100;\r
        const geometry = new THREE.PlaneGeometry(\r
          isRoad ? options.roadWidth : options.islandWidth,\r
          options.length,\r
          20,\r
          segments\r
        );\r
        let uniforms = {\r
          uTravelLength: { value: options.length },\r
          uColor: { value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor) },\r
          uTime: this.uTime\r
        };\r
\r
        if (isRoad) {\r
          uniforms = Object.assign(uniforms, {\r
            uLanes: { value: options.lanesPerRoad },\r
            uBrokenLinesColor: { value: new THREE.Color(options.colors.brokenLines) },\r
            uShoulderLinesColor: { value: new THREE.Color(options.colors.shoulderLines) },\r
            uShoulderLinesWidthPercentage: { value: options.shoulderLinesWidthPercentage },\r
            uBrokenLinesLengthPercentage: { value: options.brokenLinesLengthPercentage },\r
            uBrokenLinesWidthPercentage: { value: options.brokenLinesWidthPercentage }\r
          });\r
        }\r
\r
        const material = new THREE.ShaderMaterial({\r
          fragmentShader: isRoad ? roadFragment : islandFragment,\r
          vertexShader: roadVertex,\r
          side: THREE.DoubleSide,\r
          uniforms: Object.assign(uniforms, this.webgl.fogUniforms, options.distortion.uniforms)\r
        });\r
\r
        material.onBeforeCompile = shader => {\r
          shader.vertexShader = shader.vertexShader.replace(\r
            '#include <getDistortion_vertex>',\r
            options.distortion.getDistortion\r
          );\r
        };\r
\r
        const mesh = new THREE.Mesh(geometry, material);\r
        mesh.rotation.x = -Math.PI / 2;\r
        mesh.position.z = -options.length / 2;\r
        mesh.position.x += (this.options.islandWidth / 2 + options.roadWidth / 2) * side;\r
        this.webgl.scene.add(mesh);\r
\r
        return mesh;\r
      }\r
\r
      init() {\r
        this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);\r
        this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);\r
        this.island = this.createPlane(0, this.options.islandWidth, false);\r
      }\r
\r
      update(time) {\r
        this.uTime.value = time;\r
      }\r
    }\r
\r
    const roadBaseFragment = \`\r
      #define USE_FOG;\r
      varying vec2 vUv; \r
      uniform vec3 uColor;\r
      uniform float uTime;\r
      #include <roadMarkings_vars>\r
      \${THREE.ShaderChunk['fog_pars_fragment']}\r
      void main() {\r
        vec2 uv = vUv;\r
        vec3 color = vec3(uColor);\r
        #include <roadMarkings_fragment>\r
        gl_FragColor = vec4(color, 1.);\r
        \${THREE.ShaderChunk['fog_fragment']}\r
      }\r
    \`;\r
\r
    const islandFragment = roadBaseFragment\r
      .replace('#include <roadMarkings_fragment>', '')\r
      .replace('#include <roadMarkings_vars>', '');\r
\r
    const roadMarkings_vars = \`\r
      uniform float uLanes;\r
      uniform vec3 uBrokenLinesColor;\r
      uniform vec3 uShoulderLinesColor;\r
      uniform float uShoulderLinesWidthPercentage;\r
      uniform float uBrokenLinesWidthPercentage;\r
      uniform float uBrokenLinesLengthPercentage;\r
      highp float random(vec2 co) {\r
        highp float a = 12.9898;\r
        highp float b = 78.233;\r
        highp float c = 43758.5453;\r
        highp float dt = dot(co.xy, vec2(a, b));\r
        highp float sn = mod(dt, 3.14);\r
        return fract(sin(sn) * c);\r
      }\r
    \`;\r
\r
    const roadMarkings_fragment = \`\r
      uv.y = mod(uv.y + uTime * 0.05, 1.);\r
      float laneWidth = 1.0 / uLanes;\r
      float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;\r
      float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;\r
\r
      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));\r
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);\r
\r
      brokenLines = mix(brokenLines, sideLines, uv.x);\r
    \`;\r
\r
    const roadFragment = roadBaseFragment\r
      .replace('#include <roadMarkings_fragment>', roadMarkings_fragment)\r
      .replace('#include <roadMarkings_vars>', roadMarkings_vars);\r
\r
    const roadVertex = \`\r
      #define USE_FOG;\r
      uniform float uTime;\r
      \${THREE.ShaderChunk['fog_pars_vertex']}\r
      uniform float uTravelLength;\r
      varying vec2 vUv; \r
      #include <getDistortion_vertex>\r
      void main() {\r
        vec3 transformed = position.xyz;\r
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);\r
        transformed.x += distortion.x;\r
        transformed.z += distortion.y;\r
        transformed.y += -1. * distortion.z;  \r
        \r
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
        gl_Position = projectionMatrix * mvPosition;\r
        vUv = uv;\r
        \${THREE.ShaderChunk['fog_vertex']}\r
      }\r
    \`;\r
\r
    function resizeRendererToDisplaySize(renderer, setSize) {\r
      const canvas = renderer.domElement;\r
      const width = canvas.clientWidth;\r
      const height = canvas.clientHeight;\r
      const needResize = canvas.width !== width || canvas.height !== height;\r
      if (needResize) {\r
        setSize(width, height, false);\r
      }\r
      return needResize;\r
    }\r
\r
    (function () {\r
      const container = document.getElementById('lights');\r
      const options = { ...effectOptions };\r
      options.distortion = distortions[options.distortion];\r
\r
      const myApp = new App(container, options);\r
      appRef.current = myApp;\r
      myApp.loadAssets().then(myApp.init);\r
    })();\r
\r
    return () => {\r
      if (appRef.current) {\r
        appRef.current.dispose();\r
      }\r
    };\r
  }, [effectOptions]);\r
\r
  return <div id="lights" className="w-full h-full" ref={hyperspeed}></div>;\r
};\r
\r
export default Hyperspeed;\r
`,_r=`import { useEffect, useRef, FC } from 'react';\r
import * as THREE from 'three';\r
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';\r
\r
import './Hyperspeed.css';\r
\r
interface Distortion {\r
  uniforms: Record<string, { value: any }>;\r
  getDistortion: string;\r
  getJS?: (progress: number, time: number) => THREE.Vector3;\r
}\r
\r
interface Distortions {\r
  [key: string]: Distortion;\r
}\r
\r
interface Colors {\r
  roadColor: number;\r
  islandColor: number;\r
  background: number;\r
  shoulderLines: number;\r
  brokenLines: number;\r
  leftCars: number[];\r
  rightCars: number[];\r
  sticks: number;\r
}\r
\r
interface HyperspeedOptions {\r
  onSpeedUp?: (ev: MouseEvent | TouchEvent) => void;\r
  onSlowDown?: (ev: MouseEvent | TouchEvent) => void;\r
  distortion?: string | Distortion;\r
  length: number;\r
  roadWidth: number;\r
  islandWidth: number;\r
  lanesPerRoad: number;\r
  fov: number;\r
  fovSpeedUp: number;\r
  speedUp: number;\r
  carLightsFade: number;\r
  totalSideLightSticks: number;\r
  lightPairsPerRoadWay: number;\r
  shoulderLinesWidthPercentage: number;\r
  brokenLinesWidthPercentage: number;\r
  brokenLinesLengthPercentage: number;\r
  lightStickWidth: [number, number];\r
  lightStickHeight: [number, number];\r
  movingAwaySpeed: [number, number];\r
  movingCloserSpeed: [number, number];\r
  carLightsLength: [number, number];\r
  carLightsRadius: [number, number];\r
  carWidthPercentage: [number, number];\r
  carShiftX: [number, number];\r
  carFloorSeparation: [number, number];\r
  colors: Colors;\r
  isHyper?: boolean;\r
}\r
\r
interface HyperspeedProps {\r
  effectOptions?: Partial<HyperspeedOptions>;\r
}\r
\r
const defaultOptions: HyperspeedOptions = {\r
  onSpeedUp: () => {},\r
  onSlowDown: () => {},\r
  distortion: 'turbulentDistortion',\r
  length: 400,\r
  roadWidth: 10,\r
  islandWidth: 2,\r
  lanesPerRoad: 4,\r
  fov: 90,\r
  fovSpeedUp: 150,\r
  speedUp: 2,\r
  carLightsFade: 0.4,\r
  totalSideLightSticks: 20,\r
  lightPairsPerRoadWay: 40,\r
  shoulderLinesWidthPercentage: 0.05,\r
  brokenLinesWidthPercentage: 0.1,\r
  brokenLinesLengthPercentage: 0.5,\r
  lightStickWidth: [0.12, 0.5],\r
  lightStickHeight: [1.3, 1.7],\r
  movingAwaySpeed: [60, 80],\r
  movingCloserSpeed: [-120, -160],\r
  carLightsLength: [400 * 0.03, 400 * 0.2],\r
  carLightsRadius: [0.05, 0.14],\r
  carWidthPercentage: [0.3, 0.5],\r
  carShiftX: [-0.8, 0.8],\r
  carFloorSeparation: [0, 5],\r
  colors: {\r
    roadColor: 0x080808,\r
    islandColor: 0x0a0a0a,\r
    background: 0x000000,\r
    shoulderLines: 0xffffff,\r
    brokenLines: 0xffffff,\r
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],\r
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],\r
    sticks: 0x03b3c3\r
  }\r
};\r
\r
function nsin(val: number) {\r
  return Math.sin(val) * 0.5 + 0.5;\r
}\r
\r
const mountainUniforms = {\r
  uFreq: { value: new THREE.Vector3(3, 6, 10) },\r
  uAmp: { value: new THREE.Vector3(30, 30, 20) }\r
};\r
\r
const xyUniforms = {\r
  uFreq: { value: new THREE.Vector2(5, 2) },\r
  uAmp: { value: new THREE.Vector2(25, 15) }\r
};\r
\r
const LongRaceUniforms = {\r
  uFreq: { value: new THREE.Vector2(2, 3) },\r
  uAmp: { value: new THREE.Vector2(35, 10) }\r
};\r
\r
const turbulentUniforms = {\r
  uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },\r
  uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }\r
};\r
\r
const deepUniforms = {\r
  uFreq: { value: new THREE.Vector2(4, 8) },\r
  uAmp: { value: new THREE.Vector2(10, 20) },\r
  uPowY: { value: new THREE.Vector2(20, 2) }\r
};\r
\r
const distortions: Distortions = {\r
  mountainDistortion: {\r
    uniforms: mountainUniforms,\r
    getDistortion: \`\r
      uniform vec3 uAmp;\r
      uniform vec3 uFreq;\r
      #define PI 3.14159265358979\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      vec3 getDistortion(float progress){\r
        float movementProgressFix = 0.02;\r
        return vec3( \r
          cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,\r
          nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,\r
          nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const movementProgressFix = 0.02;\r
      const uFreq = mountainUniforms.uFreq.value;\r
      const uAmp = mountainUniforms.uAmp.value;\r
      const distortion = new THREE.Vector3(\r
        Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
          Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,\r
        nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -\r
          nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,\r
        nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -\r
          nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z\r
      );\r
      const lookAtAmp = new THREE.Vector3(2, 2, 2);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -5);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  },\r
  xyDistortion: {\r
    uniforms: xyUniforms,\r
    getDistortion: \`\r
      uniform vec2 uFreq;\r
      uniform vec2 uAmp;\r
      #define PI 3.14159265358979\r
      vec3 getDistortion(float progress){\r
        float movementProgressFix = 0.02;\r
        return vec3( \r
          cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,\r
          sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,\r
          0.\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const movementProgressFix = 0.02;\r
      const uFreq = xyUniforms.uFreq.value;\r
      const uAmp = xyUniforms.uAmp.value;\r
      const distortion = new THREE.Vector3(\r
        Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
          Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,\r
        Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -\r
          Math.sin(movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y,\r
        0\r
      );\r
      const lookAtAmp = new THREE.Vector3(2, 0.4, 1);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -3);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  },\r
  LongRaceDistortion: {\r
    uniforms: LongRaceUniforms,\r
    getDistortion: \`\r
      uniform vec2 uFreq;\r
      uniform vec2 uAmp;\r
      #define PI 3.14159265358979\r
      vec3 getDistortion(float progress){\r
        float camProgress = 0.0125;\r
        return vec3( \r
          sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,\r
          sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,\r
          0.\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const camProgress = 0.0125;\r
      const uFreq = LongRaceUniforms.uFreq.value;\r
      const uAmp = LongRaceUniforms.uAmp.value;\r
      const distortion = new THREE.Vector3(\r
        Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
          Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x,\r
        Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -\r
          Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y,\r
        0\r
      );\r
      const lookAtAmp = new THREE.Vector3(1, 1, 0);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -5);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  },\r
  turbulentDistortion: {\r
    uniforms: turbulentUniforms,\r
    getDistortion: \`\r
      uniform vec4 uFreq;\r
      uniform vec4 uAmp;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      #define PI 3.14159265358979\r
      float getDistortionX(float progress){\r
        return (\r
          cos(PI * progress * uFreq.r + uTime) * uAmp.r +\r
          pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g\r
        );\r
      }\r
      float getDistortionY(float progress){\r
        return (\r
          -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +\r
          -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a\r
        );\r
      }\r
      vec3 getDistortion(float progress){\r
        return vec3(\r
          getDistortionX(progress) - getDistortionX(0.0125),\r
          getDistortionY(progress) - getDistortionY(0.0125),\r
          0.\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const uFreq = turbulentUniforms.uFreq.value;\r
      const uAmp = turbulentUniforms.uAmp.value;\r
\r
      const getX = (p: number) =>\r
        Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +\r
        Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;\r
\r
      const getY = (p: number) =>\r
        -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -\r
        Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;\r
\r
      const distortion = new THREE.Vector3(\r
        getX(progress) - getX(progress + 0.007),\r
        getY(progress) - getY(progress + 0.007),\r
        0\r
      );\r
      const lookAtAmp = new THREE.Vector3(-2, -5, 0);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -10);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  },\r
  turbulentDistortionStill: {\r
    uniforms: turbulentUniforms,\r
    getDistortion: \`\r
      uniform vec4 uFreq;\r
      uniform vec4 uAmp;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      #define PI 3.14159265358979\r
      float getDistortionX(float progress){\r
        return (\r
          cos(PI * progress * uFreq.r) * uAmp.r +\r
          pow(cos(PI * progress * uFreq.g * (uFreq.g / uFreq.r)), 2. ) * uAmp.g\r
        );\r
      }\r
      float getDistortionY(float progress){\r
        return (\r
          -nsin(PI * progress * uFreq.b) * uAmp.b +\r
          -pow(nsin(PI * progress * uFreq.a / (uFreq.b / uFreq.a)), 5.) * uAmp.a\r
        );\r
      }\r
      vec3 getDistortion(float progress){\r
        return vec3(\r
          getDistortionX(progress) - getDistortionX(0.02),\r
          getDistortionY(progress) - getDistortionY(0.02),\r
          0.\r
        );\r
      }\r
    \`\r
  },\r
  deepDistortionStill: {\r
    uniforms: deepUniforms,\r
    getDistortion: \`\r
      uniform vec4 uFreq;\r
      uniform vec4 uAmp;\r
      uniform vec2 uPowY;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      #define PI 3.14159265358979\r
      float getDistortionX(float progress){\r
        return (\r
          sin(progress * PI * uFreq.x) * uAmp.x * 2.\r
        );\r
      }\r
      float getDistortionY(float progress){\r
        return (\r
          pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y) * uAmp.y\r
        );\r
      }\r
      vec3 getDistortion(float progress){\r
        return vec3(\r
          getDistortionX(progress) - getDistortionX(0.02),\r
          getDistortionY(progress) - getDistortionY(0.05),\r
          0.\r
        );\r
      }\r
    \`\r
  },\r
  deepDistortion: {\r
    uniforms: deepUniforms,\r
    getDistortion: \`\r
      uniform vec4 uFreq;\r
      uniform vec4 uAmp;\r
      uniform vec2 uPowY;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      #define PI 3.14159265358979\r
      float getDistortionX(float progress){\r
        return (\r
          sin(progress * PI * uFreq.x + uTime) * uAmp.x\r
        );\r
      }\r
      float getDistortionY(float progress){\r
        return (\r
          pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y\r
        );\r
      }\r
      vec3 getDistortion(float progress){\r
        return vec3(\r
          getDistortionX(progress) - getDistortionX(0.02),\r
          getDistortionY(progress) - getDistortionY(0.02),\r
          0.\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const uFreq = deepUniforms.uFreq.value;\r
      const uAmp = deepUniforms.uAmp.value;\r
      const uPowY = deepUniforms.uPowY.value;\r
\r
      const getX = (p: number) => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x;\r
      const getY = (p: number) => Math.pow(p * uPowY.x, uPowY.y) + Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y;\r
\r
      const distortion = new THREE.Vector3(\r
        getX(progress) - getX(progress + 0.01),\r
        getY(progress) - getY(progress + 0.01),\r
        0\r
      );\r
      const lookAtAmp = new THREE.Vector3(-2, -4, 0);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -10);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  }\r
};\r
\r
const distortion_uniforms = {\r
  uDistortionX: { value: new THREE.Vector2(80, 3) },\r
  uDistortionY: { value: new THREE.Vector2(-40, 2.5) }\r
};\r
\r
const distortion_vertex = \`\r
  #define PI 3.14159265358979\r
  uniform vec2 uDistortionX;\r
  uniform vec2 uDistortionY;\r
  float nsin(float val){\r
    return sin(val) * 0.5 + 0.5;\r
  }\r
  vec3 getDistortion(float progress){\r
    progress = clamp(progress, 0., 1.);\r
    float xAmp = uDistortionX.r;\r
    float xFreq = uDistortionX.g;\r
    float yAmp = uDistortionY.r;\r
    float yFreq = uDistortionY.g;\r
    return vec3( \r
      xAmp * nsin(progress * PI * xFreq - PI / 2.),\r
      yAmp * nsin(progress * PI * yFreq - PI / 2.),\r
      0.\r
    );\r
  }\r
\`;\r
\r
function random(base: number | [number, number]): number {\r
  if (Array.isArray(base)) {\r
    return Math.random() * (base[1] - base[0]) + base[0];\r
  }\r
  return Math.random() * base;\r
}\r
\r
function pickRandom<T>(arr: T | T[]): T {\r
  if (Array.isArray(arr)) {\r
    return arr[Math.floor(Math.random() * arr.length)];\r
  }\r
  return arr;\r
}\r
\r
function lerp(current: number, target: number, speed = 0.1, limit = 0.001): number {\r
  let change = (target - current) * speed;\r
  if (Math.abs(change) < limit) {\r
    change = target - current;\r
  }\r
  return change;\r
}\r
\r
class CarLights {\r
  webgl: App;\r
  options: HyperspeedOptions;\r
  colors: number[] | THREE.Color;\r
  speed: [number, number];\r
  fade: THREE.Vector2;\r
  mesh!: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;\r
\r
  constructor(\r
    webgl: App,\r
    options: HyperspeedOptions,\r
    colors: number[] | THREE.Color,\r
    speed: [number, number],\r
    fade: THREE.Vector2\r
  ) {\r
    this.webgl = webgl;\r
    this.options = options;\r
    this.colors = colors;\r
    this.speed = speed;\r
    this.fade = fade;\r
  }\r
\r
  init() {\r
    const options = this.options;\r
    const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));\r
    const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);\r
\r
    const instanced = new THREE.InstancedBufferGeometry().copy(geometry as any) as THREE.InstancedBufferGeometry;\r
    instanced.instanceCount = options.lightPairsPerRoadWay * 2;\r
\r
    const laneWidth = options.roadWidth / options.lanesPerRoad;\r
\r
    const aOffset: number[] = [];\r
    const aMetrics: number[] = [];\r
    const aColor: number[] = [];\r
\r
    let colorArray: THREE.Color[];\r
    if (Array.isArray(this.colors)) {\r
      colorArray = this.colors.map(c => new THREE.Color(c));\r
    } else {\r
      colorArray = [new THREE.Color(this.colors)];\r
    }\r
\r
    for (let i = 0; i < options.lightPairsPerRoadWay; i++) {\r
      const radius = random(options.carLightsRadius);\r
      const length = random(options.carLightsLength);\r
      const spd = random(this.speed);\r
\r
      const carLane = i % options.lanesPerRoad;\r
      let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;\r
\r
      const carWidth = random(options.carWidthPercentage) * laneWidth;\r
      const carShiftX = random(options.carShiftX) * laneWidth;\r
      laneX += carShiftX;\r
\r
      const offsetY = random(options.carFloorSeparation) + radius * 1.3;\r
      const offsetZ = -random(options.length);\r
\r
      aOffset.push(laneX - carWidth / 2);\r
      aOffset.push(offsetY);\r
      aOffset.push(offsetZ);\r
\r
      aOffset.push(laneX + carWidth / 2);\r
      aOffset.push(offsetY);\r
      aOffset.push(offsetZ);\r
\r
      aMetrics.push(radius);\r
      aMetrics.push(length);\r
      aMetrics.push(spd);\r
\r
      aMetrics.push(radius);\r
      aMetrics.push(length);\r
      aMetrics.push(spd);\r
\r
      const color = pickRandom<THREE.Color>(colorArray);\r
      aColor.push(color.r);\r
      aColor.push(color.g);\r
      aColor.push(color.b);\r
\r
      aColor.push(color.r);\r
      aColor.push(color.g);\r
      aColor.push(color.b);\r
    }\r
\r
    instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));\r
    instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));\r
    instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));\r
\r
    const material = new THREE.ShaderMaterial({\r
      fragmentShader: carLightsFragment,\r
      vertexShader: carLightsVertex,\r
      transparent: true,\r
      uniforms: Object.assign(\r
        {\r
          uTime: { value: 0 },\r
          uTravelLength: { value: options.length },\r
          uFade: { value: this.fade }\r
        },\r
        this.webgl.fogUniforms,\r
        (typeof this.options.distortion === 'object' ? this.options.distortion.uniforms : {}) || {}\r
      )\r
    });\r
\r
    material.onBeforeCompile = shader => {\r
      shader.vertexShader = shader.vertexShader.replace(\r
        '#include <getDistortion_vertex>',\r
        typeof this.options.distortion === 'object' ? this.options.distortion.getDistortion : ''\r
      );\r
    };\r
\r
    const mesh = new THREE.Mesh(instanced, material);\r
    mesh.frustumCulled = false;\r
    this.webgl.scene.add(mesh);\r
    this.mesh = mesh;\r
  }\r
\r
  update(time: number) {\r
    if (this.mesh.material.uniforms.uTime) {\r
      this.mesh.material.uniforms.uTime.value = time;\r
    }\r
  }\r
}\r
\r
const carLightsFragment = \`\r
  #define USE_FOG;\r
  \${THREE.ShaderChunk['fog_pars_fragment']}\r
  varying vec3 vColor;\r
  varying vec2 vUv; \r
  uniform vec2 uFade;\r
  void main() {\r
    vec3 color = vec3(vColor);\r
    float alpha = smoothstep(uFade.x, uFade.y, vUv.x);\r
    gl_FragColor = vec4(color, alpha);\r
    if (gl_FragColor.a < 0.0001) discard;\r
    \${THREE.ShaderChunk['fog_fragment']}\r
  }\r
\`;\r
\r
const carLightsVertex = \`\r
  #define USE_FOG;\r
  \${THREE.ShaderChunk['fog_pars_vertex']}\r
  attribute vec3 aOffset;\r
  attribute vec3 aMetrics;\r
  attribute vec3 aColor;\r
  uniform float uTravelLength;\r
  uniform float uTime;\r
  varying vec2 vUv; \r
  varying vec3 vColor; \r
  #include <getDistortion_vertex>\r
  void main() {\r
    vec3 transformed = position.xyz;\r
    float radius = aMetrics.r;\r
    float myLength = aMetrics.g;\r
    float speed = aMetrics.b;\r
\r
    transformed.xy *= radius;\r
    transformed.z *= myLength;\r
\r
    transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);\r
    transformed.xy += aOffset.xy;\r
\r
    float progress = abs(transformed.z / uTravelLength);\r
    transformed.xyz += getDistortion(progress);\r
\r
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
    gl_Position = projectionMatrix * mvPosition;\r
    vUv = uv;\r
    vColor = aColor;\r
    \${THREE.ShaderChunk['fog_vertex']}\r
  }\r
\`;\r
\r
class LightsSticks {\r
  webgl: App;\r
  options: HyperspeedOptions;\r
  mesh!: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;\r
\r
  constructor(webgl: App, options: HyperspeedOptions) {\r
    this.webgl = webgl;\r
    this.options = options;\r
  }\r
\r
  init() {\r
    const options = this.options;\r
    const geometry = new THREE.PlaneGeometry(1, 1);\r
    const instanced = new THREE.InstancedBufferGeometry().copy(geometry as any) as THREE.InstancedBufferGeometry;\r
    const totalSticks = options.totalSideLightSticks;\r
    instanced.instanceCount = totalSticks;\r
\r
    const stickoffset = options.length / (totalSticks - 1);\r
    const aOffset: number[] = [];\r
    const aColor: number[] = [];\r
    const aMetrics: number[] = [];\r
\r
    let colorArray: THREE.Color[];\r
    if (Array.isArray(options.colors.sticks)) {\r
      colorArray = options.colors.sticks.map(c => new THREE.Color(c));\r
    } else {\r
      colorArray = [new THREE.Color(options.colors.sticks)];\r
    }\r
\r
    for (let i = 0; i < totalSticks; i++) {\r
      const width = random(options.lightStickWidth);\r
      const height = random(options.lightStickHeight);\r
      aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());\r
\r
      const color = pickRandom<THREE.Color>(colorArray);\r
      aColor.push(color.r);\r
      aColor.push(color.g);\r
      aColor.push(color.b);\r
\r
      aMetrics.push(width);\r
      aMetrics.push(height);\r
    }\r
\r
    instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));\r
    instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));\r
    instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));\r
\r
    const material = new THREE.ShaderMaterial({\r
      fragmentShader: sideSticksFragment,\r
      vertexShader: sideSticksVertex,\r
      side: THREE.DoubleSide,\r
      uniforms: Object.assign(\r
        {\r
          uTravelLength: { value: options.length },\r
          uTime: { value: 0 }\r
        },\r
        this.webgl.fogUniforms,\r
        (typeof options.distortion === 'object' ? options.distortion.uniforms : {}) || {}\r
      )\r
    });\r
\r
    material.onBeforeCompile = shader => {\r
      shader.vertexShader = shader.vertexShader.replace(\r
        '#include <getDistortion_vertex>',\r
        typeof this.options.distortion === 'object' ? this.options.distortion.getDistortion : ''\r
      );\r
    };\r
\r
    const mesh = new THREE.Mesh(instanced, material);\r
    mesh.frustumCulled = false;\r
    this.webgl.scene.add(mesh);\r
    this.mesh = mesh;\r
  }\r
\r
  update(time: number) {\r
    if (this.mesh.material.uniforms.uTime) {\r
      this.mesh.material.uniforms.uTime.value = time;\r
    }\r
  }\r
}\r
\r
const sideSticksVertex = \`\r
  #define USE_FOG;\r
  \${THREE.ShaderChunk['fog_pars_vertex']}\r
  attribute float aOffset;\r
  attribute vec3 aColor;\r
  attribute vec2 aMetrics;\r
  uniform float uTravelLength;\r
  uniform float uTime;\r
  varying vec3 vColor;\r
  mat4 rotationY( in float angle ) {\r
    return mat4(\r
      cos(angle),		0,		sin(angle),	0,\r
      0,		        1.0,	0,			0,\r
      -sin(angle),	    0,		cos(angle),	0,\r
      0, 		        0,		0,			1\r
    );\r
  }\r
  #include <getDistortion_vertex>\r
  void main(){\r
    vec3 transformed = position.xyz;\r
    float width = aMetrics.x;\r
    float height = aMetrics.y;\r
\r
    transformed.xy *= vec2(width, height);\r
    float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);\r
\r
    transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;\r
    transformed.z += - uTravelLength + time;\r
\r
    float progress = abs(transformed.z / uTravelLength);\r
    transformed.xyz += getDistortion(progress);\r
\r
    transformed.y += height / 2.;\r
    transformed.x += -width / 2.;\r
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
    gl_Position = projectionMatrix * mvPosition;\r
    vColor = aColor;\r
    \${THREE.ShaderChunk['fog_vertex']}\r
  }\r
\`;\r
\r
const sideSticksFragment = \`\r
  #define USE_FOG;\r
  \${THREE.ShaderChunk['fog_pars_fragment']}\r
  varying vec3 vColor;\r
  void main(){\r
    vec3 color = vec3(vColor);\r
    gl_FragColor = vec4(color,1.);\r
    \${THREE.ShaderChunk['fog_fragment']}\r
  }\r
\`;\r
\r
class Road {\r
  webgl: App;\r
  options: HyperspeedOptions;\r
  uTime: { value: number };\r
  leftRoadWay!: THREE.Mesh;\r
  rightRoadWay!: THREE.Mesh;\r
  island!: THREE.Mesh;\r
\r
  constructor(webgl: App, options: HyperspeedOptions) {\r
    this.webgl = webgl;\r
    this.options = options;\r
    this.uTime = { value: 0 };\r
  }\r
\r
  createPlane(side: number, width: number, isRoad: boolean) {\r
    const options = this.options;\r
    const segments = 100;\r
    const geometry = new THREE.PlaneGeometry(\r
      isRoad ? options.roadWidth : options.islandWidth,\r
      options.length,\r
      20,\r
      segments\r
    );\r
\r
    let uniforms: Record<string, { value: any }> = {\r
      uTravelLength: { value: options.length },\r
      uColor: {\r
        value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor)\r
      },\r
      uTime: this.uTime\r
    };\r
\r
    if (isRoad) {\r
      uniforms = Object.assign(uniforms, {\r
        uLanes: { value: options.lanesPerRoad },\r
        uBrokenLinesColor: {\r
          value: new THREE.Color(options.colors.brokenLines)\r
        },\r
        uShoulderLinesColor: {\r
          value: new THREE.Color(options.colors.shoulderLines)\r
        },\r
        uShoulderLinesWidthPercentage: {\r
          value: options.shoulderLinesWidthPercentage\r
        },\r
        uBrokenLinesLengthPercentage: {\r
          value: options.brokenLinesLengthPercentage\r
        },\r
        uBrokenLinesWidthPercentage: {\r
          value: options.brokenLinesWidthPercentage\r
        }\r
      });\r
    }\r
\r
    const material = new THREE.ShaderMaterial({\r
      fragmentShader: isRoad ? roadFragment : islandFragment,\r
      vertexShader: roadVertex,\r
      side: THREE.DoubleSide,\r
      uniforms: Object.assign(\r
        uniforms,\r
        this.webgl.fogUniforms,\r
        (typeof options.distortion === 'object' ? options.distortion.uniforms : {}) || {}\r
      )\r
    });\r
\r
    material.onBeforeCompile = shader => {\r
      shader.vertexShader = shader.vertexShader.replace(\r
        '#include <getDistortion_vertex>',\r
        typeof this.options.distortion === 'object' ? this.options.distortion.getDistortion : ''\r
      );\r
    };\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    mesh.rotation.x = -Math.PI / 2;\r
    mesh.position.z = -options.length / 2;\r
    mesh.position.x += (this.options.islandWidth / 2 + options.roadWidth / 2) * side;\r
\r
    this.webgl.scene.add(mesh);\r
    return mesh;\r
  }\r
\r
  init() {\r
    this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);\r
    this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);\r
    this.island = this.createPlane(0, this.options.islandWidth, false);\r
  }\r
\r
  update(time: number) {\r
    this.uTime.value = time;\r
  }\r
}\r
\r
const roadBaseFragment = \`\r
  #define USE_FOG;\r
  varying vec2 vUv; \r
  uniform vec3 uColor;\r
  uniform float uTime;\r
  #include <roadMarkings_vars>\r
  \${THREE.ShaderChunk['fog_pars_fragment']}\r
  void main() {\r
    vec2 uv = vUv;\r
    vec3 color = vec3(uColor);\r
    #include <roadMarkings_fragment>\r
    gl_FragColor = vec4(color, 1.);\r
    \${THREE.ShaderChunk['fog_fragment']}\r
  }\r
\`;\r
\r
const islandFragment = roadBaseFragment\r
  .replace('#include <roadMarkings_fragment>', '')\r
  .replace('#include <roadMarkings_vars>', '');\r
\r
const roadMarkings_vars = \`\r
  uniform float uLanes;\r
  uniform vec3 uBrokenLinesColor;\r
  uniform vec3 uShoulderLinesColor;\r
  uniform float uShoulderLinesWidthPercentage;\r
  uniform float uBrokenLinesWidthPercentage;\r
  uniform float uBrokenLinesLengthPercentage;\r
  highp float random(vec2 co) {\r
    highp float a = 12.9898;\r
    highp float b = 78.233;\r
    highp float c = 43758.5453;\r
    highp float dt = dot(co.xy, vec2(a, b));\r
    highp float sn = mod(dt, 3.14);\r
    return fract(sin(sn) * c);\r
  }\r
\`;\r
\r
const roadMarkings_fragment = \`\r
  uv.y = mod(uv.y + uTime * 0.05, 1.);\r
  float laneWidth = 1.0 / uLanes;\r
  float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;\r
  float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;\r
\r
  float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));\r
  float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);\r
\r
  brokenLines = mix(brokenLines, sideLines, uv.x);\r
\`;\r
\r
const roadFragment = roadBaseFragment\r
  .replace('#include <roadMarkings_fragment>', roadMarkings_fragment)\r
  .replace('#include <roadMarkings_vars>', roadMarkings_vars);\r
\r
const roadVertex = \`\r
  #define USE_FOG;\r
  uniform float uTime;\r
  \${THREE.ShaderChunk['fog_pars_vertex']}\r
  uniform float uTravelLength;\r
  varying vec2 vUv; \r
  #include <getDistortion_vertex>\r
  void main() {\r
    vec3 transformed = position.xyz;\r
    vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);\r
    transformed.x += distortion.x;\r
    transformed.z += distortion.y;\r
    transformed.y += -1. * distortion.z;  \r
    \r
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
    gl_Position = projectionMatrix * mvPosition;\r
    vUv = uv;\r
    \${THREE.ShaderChunk['fog_vertex']}\r
  }\r
\`;\r
\r
function resizeRendererToDisplaySize(\r
  renderer: THREE.WebGLRenderer,\r
  setSize: (width: number, height: number, updateStyle: boolean) => void\r
) {\r
  const canvas = renderer.domElement;\r
  const width = canvas.clientWidth;\r
  const height = canvas.clientHeight;\r
  const needResize = canvas.width !== width || canvas.height !== height;\r
  if (needResize) {\r
    setSize(width, height, false);\r
  }\r
  return needResize;\r
}\r
\r
class App {\r
  container: HTMLElement;\r
  options: HyperspeedOptions;\r
  renderer: THREE.WebGLRenderer;\r
  composer: EffectComposer;\r
  camera: THREE.PerspectiveCamera;\r
  scene: THREE.Scene;\r
  renderPass!: RenderPass;\r
  bloomPass!: EffectPass;\r
  clock: THREE.Clock;\r
  assets: Record<string, any>;\r
  disposed: boolean;\r
  road: Road;\r
  leftCarLights: CarLights;\r
  rightCarLights: CarLights;\r
  leftSticks: LightsSticks;\r
  fogUniforms: Record<string, { value: any }>;\r
  fovTarget: number;\r
  speedUpTarget: number;\r
  speedUp: number;\r
  timeOffset: number;\r
\r
  constructor(container: HTMLElement, options: HyperspeedOptions) {\r
    this.options = options;\r
    if (!this.options.distortion) {\r
      this.options.distortion = {\r
        uniforms: distortion_uniforms,\r
        getDistortion: distortion_vertex\r
      };\r
    }\r
    this.container = container;\r
\r
    this.renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      alpha: true\r
    });\r
    this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);\r
    this.renderer.setPixelRatio(window.devicePixelRatio);\r
\r
    this.composer = new EffectComposer(this.renderer);\r
    container.appendChild(this.renderer.domElement);\r
\r
    this.camera = new THREE.PerspectiveCamera(options.fov, container.offsetWidth / container.offsetHeight, 0.1, 10000);\r
    this.camera.position.z = -5;\r
    this.camera.position.y = 8;\r
    this.camera.position.x = 0;\r
\r
    this.scene = new THREE.Scene();\r
    this.scene.background = null;\r
\r
    const fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);\r
    this.scene.fog = fog;\r
\r
    this.fogUniforms = {\r
      fogColor: { value: fog.color },\r
      fogNear: { value: fog.near },\r
      fogFar: { value: fog.far }\r
    };\r
\r
    this.clock = new THREE.Clock();\r
    this.assets = {};\r
    this.disposed = false;\r
\r
    this.road = new Road(this, options);\r
    this.leftCarLights = new CarLights(\r
      this,\r
      options,\r
      options.colors.leftCars,\r
      options.movingAwaySpeed,\r
      new THREE.Vector2(0, 1 - options.carLightsFade)\r
    );\r
    this.rightCarLights = new CarLights(\r
      this,\r
      options,\r
      options.colors.rightCars,\r
      options.movingCloserSpeed,\r
      new THREE.Vector2(1, 0 + options.carLightsFade)\r
    );\r
    this.leftSticks = new LightsSticks(this, options);\r
\r
    this.fovTarget = options.fov;\r
    this.speedUpTarget = 0;\r
    this.speedUp = 0;\r
    this.timeOffset = 0;\r
\r
    this.tick = this.tick.bind(this);\r
    this.init = this.init.bind(this);\r
    this.setSize = this.setSize.bind(this);\r
    this.onMouseDown = this.onMouseDown.bind(this);\r
    this.onMouseUp = this.onMouseUp.bind(this);\r
\r
    this.onTouchStart = this.onTouchStart.bind(this);\r
    this.onTouchEnd = this.onTouchEnd.bind(this);\r
    this.onContextMenu = this.onContextMenu.bind(this);\r
\r
    window.addEventListener('resize', this.onWindowResize.bind(this));\r
  }\r
\r
  onWindowResize() {\r
    const width = this.container.offsetWidth;\r
    const height = this.container.offsetHeight;\r
\r
    this.renderer.setSize(width, height);\r
    this.camera.aspect = width / height;\r
    this.camera.updateProjectionMatrix();\r
    this.composer.setSize(width, height);\r
  }\r
\r
  initPasses() {\r
    this.renderPass = new RenderPass(this.scene, this.camera);\r
    this.bloomPass = new EffectPass(\r
      this.camera,\r
      new BloomEffect({\r
        luminanceThreshold: 0.2,\r
        luminanceSmoothing: 0,\r
        resolutionScale: 1\r
      })\r
    );\r
\r
    const smaaPass = new EffectPass(\r
      this.camera,\r
      new SMAAEffect({\r
        preset: SMAAPreset.MEDIUM\r
      })\r
    );\r
    this.renderPass.renderToScreen = false;\r
    this.bloomPass.renderToScreen = false;\r
    smaaPass.renderToScreen = true;\r
\r
    this.composer.addPass(this.renderPass);\r
    this.composer.addPass(this.bloomPass);\r
    this.composer.addPass(smaaPass);\r
  }\r
\r
  loadAssets(): Promise<void> {\r
    const assets = this.assets;\r
    return new Promise(resolve => {\r
      const manager = new THREE.LoadingManager(resolve);\r
\r
      const searchImage = new Image();\r
      const areaImage = new Image();\r
      assets.smaa = {};\r
\r
      searchImage.addEventListener('load', function () {\r
        assets.smaa.search = this;\r
        manager.itemEnd('smaa-search');\r
      });\r
\r
      areaImage.addEventListener('load', function () {\r
        assets.smaa.area = this;\r
        manager.itemEnd('smaa-area');\r
      });\r
\r
      manager.itemStart('smaa-search');\r
      manager.itemStart('smaa-area');\r
\r
      searchImage.src = SMAAEffect.searchImageDataURL;\r
      areaImage.src = SMAAEffect.areaImageDataURL;\r
    });\r
  }\r
\r
  init() {\r
    this.initPasses();\r
    const options = this.options;\r
    this.road.init();\r
    this.leftCarLights.init();\r
    this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);\r
\r
    this.rightCarLights.init();\r
    this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);\r
\r
    this.leftSticks.init();\r
    this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));\r
\r
    this.container.addEventListener('mousedown', this.onMouseDown);\r
    this.container.addEventListener('mouseup', this.onMouseUp);\r
    this.container.addEventListener('mouseout', this.onMouseUp);\r
\r
    this.container.addEventListener('touchstart', this.onTouchStart, { passive: true });\r
    this.container.addEventListener('touchend', this.onTouchEnd, { passive: true });\r
    this.container.addEventListener('touchcancel', this.onTouchEnd, { passive: true });\r
    this.container.addEventListener('contextmenu', this.onContextMenu);\r
\r
    this.tick();\r
  }\r
\r
  onMouseDown(ev: MouseEvent) {\r
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev);\r
    this.fovTarget = this.options.fovSpeedUp;\r
    this.speedUpTarget = this.options.speedUp;\r
  }\r
\r
  onMouseUp(ev: MouseEvent) {\r
    if (this.options.onSlowDown) this.options.onSlowDown(ev);\r
    this.fovTarget = this.options.fov;\r
    this.speedUpTarget = 0;\r
  }\r
\r
  onTouchStart(ev: TouchEvent) {\r
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev);\r
    this.fovTarget = this.options.fovSpeedUp;\r
    this.speedUpTarget = this.options.speedUp;\r
  }\r
\r
  onTouchEnd(ev: TouchEvent) {\r
    if (this.options.onSlowDown) this.options.onSlowDown(ev);\r
    this.fovTarget = this.options.fov;\r
    this.speedUpTarget = 0;\r
  }\r
\r
  onContextMenu(ev: MouseEvent) {\r
    ev.preventDefault();\r
  }\r
\r
  update(delta: number) {\r
    const lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);\r
    this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);\r
    this.timeOffset += this.speedUp * delta;\r
    const time = this.clock.elapsedTime + this.timeOffset;\r
\r
    this.rightCarLights.update(time);\r
    this.leftCarLights.update(time);\r
    this.leftSticks.update(time);\r
    this.road.update(time);\r
\r
    let updateCamera = false;\r
    const fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage);\r
    if (fovChange !== 0) {\r
      this.camera.fov += fovChange * delta * 6;\r
      updateCamera = true;\r
    }\r
\r
    if (typeof this.options.distortion === 'object' && this.options.distortion.getJS) {\r
      const distortion = this.options.distortion.getJS(0.025, time);\r
      this.camera.lookAt(\r
        new THREE.Vector3(\r
          this.camera.position.x + distortion.x,\r
          this.camera.position.y + distortion.y,\r
          this.camera.position.z + distortion.z\r
        )\r
      );\r
      updateCamera = true;\r
    }\r
\r
    if (updateCamera) {\r
      this.camera.updateProjectionMatrix();\r
    }\r
  }\r
\r
  render(delta: number) {\r
    this.composer.render(delta);\r
  }\r
\r
  dispose() {\r
    this.disposed = true;\r
\r
    if (this.renderer) {\r
      this.renderer.dispose();\r
    }\r
    if (this.composer) {\r
      this.composer.dispose();\r
    }\r
    if (this.scene) {\r
      this.scene.clear();\r
    }\r
\r
    window.removeEventListener('resize', this.onWindowResize.bind(this));\r
    if (this.container) {\r
      this.container.removeEventListener('mousedown', this.onMouseDown);\r
      this.container.removeEventListener('mouseup', this.onMouseUp);\r
      this.container.removeEventListener('mouseout', this.onMouseUp);\r
\r
      this.container.removeEventListener('touchstart', this.onTouchStart);\r
      this.container.removeEventListener('touchend', this.onTouchEnd);\r
      this.container.removeEventListener('touchcancel', this.onTouchEnd);\r
      this.container.removeEventListener('contextmenu', this.onContextMenu);\r
    }\r
  }\r
\r
  setSize(width: number, height: number, updateStyles: boolean) {\r
    this.composer.setSize(width, height, updateStyles);\r
  }\r
\r
  tick() {\r
    if (this.disposed || !this) return;\r
    if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {\r
      const canvas = this.renderer.domElement;\r
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;\r
      this.camera.updateProjectionMatrix();\r
    }\r
    const delta = this.clock.getDelta();\r
    this.render(delta);\r
    this.update(delta);\r
    requestAnimationFrame(this.tick);\r
  }\r
}\r
\r
const Hyperspeed: FC<HyperspeedProps> = ({ effectOptions = {} }) => {\r
  const mergedOptions: HyperspeedOptions = {\r
    ...defaultOptions,\r
    ...effectOptions\r
  };\r
  const hyperspeed = useRef<HTMLDivElement>(null);\r
  const appRef = useRef<App | null>(null);\r
\r
  useEffect(() => {\r
    if (appRef.current) {\r
      appRef.current.dispose();\r
      const container = document.getElementById('lights');\r
      if (container) {\r
        while (container.firstChild) {\r
          container.removeChild(container.firstChild);\r
        }\r
      }\r
    }\r
\r
    const container = hyperspeed.current;\r
    if (!container) return;\r
\r
    const options = { ...mergedOptions };\r
    if (typeof options.distortion === 'string') {\r
      options.distortion = distortions[options.distortion];\r
    }\r
\r
    const myApp = new App(container, options);\r
    appRef.current = myApp;\r
    myApp.loadAssets().then(myApp.init);\r
\r
    return () => {\r
      if (appRef.current) {\r
        appRef.current.dispose();\r
      }\r
    };\r
  }, [mergedOptions]);\r
\r
  return <div id="lights" ref={hyperspeed}></div>;\r
};\r
\r
export default Hyperspeed;\r
`,zr=`import { useEffect, useRef, FC } from 'react';\r
import * as THREE from 'three';\r
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';\r
\r
interface Distortion {\r
  uniforms: Record<string, { value: any }>;\r
  getDistortion: string;\r
  getJS?: (progress: number, time: number) => THREE.Vector3;\r
}\r
\r
interface Distortions {\r
  [key: string]: Distortion;\r
}\r
\r
interface Colors {\r
  roadColor: number;\r
  islandColor: number;\r
  background: number;\r
  shoulderLines: number;\r
  brokenLines: number;\r
  leftCars: number[];\r
  rightCars: number[];\r
  sticks: number;\r
}\r
\r
interface HyperspeedOptions {\r
  onSpeedUp?: (ev: MouseEvent | TouchEvent) => void;\r
  onSlowDown?: (ev: MouseEvent | TouchEvent) => void;\r
  distortion?: string | Distortion;\r
  length: number;\r
  roadWidth: number;\r
  islandWidth: number;\r
  lanesPerRoad: number;\r
  fov: number;\r
  fovSpeedUp: number;\r
  speedUp: number;\r
  carLightsFade: number;\r
  totalSideLightSticks: number;\r
  lightPairsPerRoadWay: number;\r
  shoulderLinesWidthPercentage: number;\r
  brokenLinesWidthPercentage: number;\r
  brokenLinesLengthPercentage: number;\r
  lightStickWidth: [number, number];\r
  lightStickHeight: [number, number];\r
  movingAwaySpeed: [number, number];\r
  movingCloserSpeed: [number, number];\r
  carLightsLength: [number, number];\r
  carLightsRadius: [number, number];\r
  carWidthPercentage: [number, number];\r
  carShiftX: [number, number];\r
  carFloorSeparation: [number, number];\r
  colors: Colors;\r
  isHyper?: boolean;\r
}\r
\r
interface HyperspeedProps {\r
  effectOptions?: Partial<HyperspeedOptions>;\r
}\r
\r
const defaultOptions: HyperspeedOptions = {\r
  onSpeedUp: () => {},\r
  onSlowDown: () => {},\r
  distortion: 'turbulentDistortion',\r
  length: 400,\r
  roadWidth: 10,\r
  islandWidth: 2,\r
  lanesPerRoad: 4,\r
  fov: 90,\r
  fovSpeedUp: 150,\r
  speedUp: 2,\r
  carLightsFade: 0.4,\r
  totalSideLightSticks: 20,\r
  lightPairsPerRoadWay: 40,\r
  shoulderLinesWidthPercentage: 0.05,\r
  brokenLinesWidthPercentage: 0.1,\r
  brokenLinesLengthPercentage: 0.5,\r
  lightStickWidth: [0.12, 0.5],\r
  lightStickHeight: [1.3, 1.7],\r
  movingAwaySpeed: [60, 80],\r
  movingCloserSpeed: [-120, -160],\r
  carLightsLength: [400 * 0.03, 400 * 0.2],\r
  carLightsRadius: [0.05, 0.14],\r
  carWidthPercentage: [0.3, 0.5],\r
  carShiftX: [-0.8, 0.8],\r
  carFloorSeparation: [0, 5],\r
  colors: {\r
    roadColor: 0x080808,\r
    islandColor: 0x0a0a0a,\r
    background: 0x000000,\r
    shoulderLines: 0xffffff,\r
    brokenLines: 0xffffff,\r
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],\r
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],\r
    sticks: 0x03b3c3\r
  }\r
};\r
\r
function nsin(val: number) {\r
  return Math.sin(val) * 0.5 + 0.5;\r
}\r
\r
const mountainUniforms = {\r
  uFreq: { value: new THREE.Vector3(3, 6, 10) },\r
  uAmp: { value: new THREE.Vector3(30, 30, 20) }\r
};\r
\r
const xyUniforms = {\r
  uFreq: { value: new THREE.Vector2(5, 2) },\r
  uAmp: { value: new THREE.Vector2(25, 15) }\r
};\r
\r
const LongRaceUniforms = {\r
  uFreq: { value: new THREE.Vector2(2, 3) },\r
  uAmp: { value: new THREE.Vector2(35, 10) }\r
};\r
\r
const turbulentUniforms = {\r
  uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },\r
  uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }\r
};\r
\r
const deepUniforms = {\r
  uFreq: { value: new THREE.Vector2(4, 8) },\r
  uAmp: { value: new THREE.Vector2(10, 20) },\r
  uPowY: { value: new THREE.Vector2(20, 2) }\r
};\r
\r
const distortions: Distortions = {\r
  mountainDistortion: {\r
    uniforms: mountainUniforms,\r
    getDistortion: \`\r
      uniform vec3 uAmp;\r
      uniform vec3 uFreq;\r
      #define PI 3.14159265358979\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      vec3 getDistortion(float progress){\r
        float movementProgressFix = 0.02;\r
        return vec3( \r
          cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,\r
          nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,\r
          nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const movementProgressFix = 0.02;\r
      const uFreq = mountainUniforms.uFreq.value;\r
      const uAmp = mountainUniforms.uAmp.value;\r
      const distortion = new THREE.Vector3(\r
        Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
          Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,\r
        nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -\r
          nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,\r
        nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -\r
          nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z\r
      );\r
      const lookAtAmp = new THREE.Vector3(2, 2, 2);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -5);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  },\r
  xyDistortion: {\r
    uniforms: xyUniforms,\r
    getDistortion: \`\r
      uniform vec2 uFreq;\r
      uniform vec2 uAmp;\r
      #define PI 3.14159265358979\r
      vec3 getDistortion(float progress){\r
        float movementProgressFix = 0.02;\r
        return vec3( \r
          cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,\r
          sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,\r
          0.\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const movementProgressFix = 0.02;\r
      const uFreq = xyUniforms.uFreq.value;\r
      const uAmp = xyUniforms.uAmp.value;\r
      const distortion = new THREE.Vector3(\r
        Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
          Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,\r
        Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -\r
          Math.sin(movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y,\r
        0\r
      );\r
      const lookAtAmp = new THREE.Vector3(2, 0.4, 1);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -3);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  },\r
  LongRaceDistortion: {\r
    uniforms: LongRaceUniforms,\r
    getDistortion: \`\r
      uniform vec2 uFreq;\r
      uniform vec2 uAmp;\r
      #define PI 3.14159265358979\r
      vec3 getDistortion(float progress){\r
        float camProgress = 0.0125;\r
        return vec3( \r
          sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,\r
          sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,\r
          0.\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const camProgress = 0.0125;\r
      const uFreq = LongRaceUniforms.uFreq.value;\r
      const uAmp = LongRaceUniforms.uAmp.value;\r
      const distortion = new THREE.Vector3(\r
        Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -\r
          Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x,\r
        Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -\r
          Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y,\r
        0\r
      );\r
      const lookAtAmp = new THREE.Vector3(1, 1, 0);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -5);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  },\r
  turbulentDistortion: {\r
    uniforms: turbulentUniforms,\r
    getDistortion: \`\r
      uniform vec4 uFreq;\r
      uniform vec4 uAmp;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      #define PI 3.14159265358979\r
      float getDistortionX(float progress){\r
        return (\r
          cos(PI * progress * uFreq.r + uTime) * uAmp.r +\r
          pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g\r
        );\r
      }\r
      float getDistortionY(float progress){\r
        return (\r
          -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +\r
          -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a\r
        );\r
      }\r
      vec3 getDistortion(float progress){\r
        return vec3(\r
          getDistortionX(progress) - getDistortionX(0.0125),\r
          getDistortionY(progress) - getDistortionY(0.0125),\r
          0.\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const uFreq = turbulentUniforms.uFreq.value;\r
      const uAmp = turbulentUniforms.uAmp.value;\r
\r
      const getX = (p: number) =>\r
        Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +\r
        Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;\r
\r
      const getY = (p: number) =>\r
        -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -\r
        Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;\r
\r
      const distortion = new THREE.Vector3(\r
        getX(progress) - getX(progress + 0.007),\r
        getY(progress) - getY(progress + 0.007),\r
        0\r
      );\r
      const lookAtAmp = new THREE.Vector3(-2, -5, 0);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -10);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  },\r
  turbulentDistortionStill: {\r
    uniforms: turbulentUniforms,\r
    getDistortion: \`\r
      uniform vec4 uFreq;\r
      uniform vec4 uAmp;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      #define PI 3.14159265358979\r
      float getDistortionX(float progress){\r
        return (\r
          cos(PI * progress * uFreq.r) * uAmp.r +\r
          pow(cos(PI * progress * uFreq.g * (uFreq.g / uFreq.r)), 2. ) * uAmp.g\r
        );\r
      }\r
      float getDistortionY(float progress){\r
        return (\r
          -nsin(PI * progress * uFreq.b) * uAmp.b +\r
          -pow(nsin(PI * progress * uFreq.a / (uFreq.b / uFreq.a)), 5.) * uAmp.a\r
        );\r
      }\r
      vec3 getDistortion(float progress){\r
        return vec3(\r
          getDistortionX(progress) - getDistortionX(0.02),\r
          getDistortionY(progress) - getDistortionY(0.02),\r
          0.\r
        );\r
      }\r
    \`\r
  },\r
  deepDistortionStill: {\r
    uniforms: deepUniforms,\r
    getDistortion: \`\r
      uniform vec4 uFreq;\r
      uniform vec4 uAmp;\r
      uniform vec2 uPowY;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      #define PI 3.14159265358979\r
      float getDistortionX(float progress){\r
        return (\r
          sin(progress * PI * uFreq.x) * uAmp.x * 2.\r
        );\r
      }\r
      float getDistortionY(float progress){\r
        return (\r
          pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y) * uAmp.y\r
        );\r
      }\r
      vec3 getDistortion(float progress){\r
        return vec3(\r
          getDistortionX(progress) - getDistortionX(0.02),\r
          getDistortionY(progress) - getDistortionY(0.05),\r
          0.\r
        );\r
      }\r
    \`\r
  },\r
  deepDistortion: {\r
    uniforms: deepUniforms,\r
    getDistortion: \`\r
      uniform vec4 uFreq;\r
      uniform vec4 uAmp;\r
      uniform vec2 uPowY;\r
      float nsin(float val){\r
        return sin(val) * 0.5 + 0.5;\r
      }\r
      #define PI 3.14159265358979\r
      float getDistortionX(float progress){\r
        return (\r
          sin(progress * PI * uFreq.x + uTime) * uAmp.x\r
        );\r
      }\r
      float getDistortionY(float progress){\r
        return (\r
          pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y\r
        );\r
      }\r
      vec3 getDistortion(float progress){\r
        return vec3(\r
          getDistortionX(progress) - getDistortionX(0.02),\r
          getDistortionY(progress) - getDistortionY(0.02),\r
          0.\r
        );\r
      }\r
    \`,\r
    getJS: (progress: number, time: number) => {\r
      const uFreq = deepUniforms.uFreq.value;\r
      const uAmp = deepUniforms.uAmp.value;\r
      const uPowY = deepUniforms.uPowY.value;\r
\r
      const getX = (p: number) => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x;\r
      const getY = (p: number) => Math.pow(p * uPowY.x, uPowY.y) + Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y;\r
\r
      const distortion = new THREE.Vector3(\r
        getX(progress) - getX(progress + 0.01),\r
        getY(progress) - getY(progress + 0.01),\r
        0\r
      );\r
      const lookAtAmp = new THREE.Vector3(-2, -4, 0);\r
      const lookAtOffset = new THREE.Vector3(0, 0, -10);\r
      return distortion.multiply(lookAtAmp).add(lookAtOffset);\r
    }\r
  }\r
};\r
\r
const distortion_uniforms = {\r
  uDistortionX: { value: new THREE.Vector2(80, 3) },\r
  uDistortionY: { value: new THREE.Vector2(-40, 2.5) }\r
};\r
\r
const distortion_vertex = \`\r
  #define PI 3.14159265358979\r
  uniform vec2 uDistortionX;\r
  uniform vec2 uDistortionY;\r
  float nsin(float val){\r
    return sin(val) * 0.5 + 0.5;\r
  }\r
  vec3 getDistortion(float progress){\r
    progress = clamp(progress, 0., 1.);\r
    float xAmp = uDistortionX.r;\r
    float xFreq = uDistortionX.g;\r
    float yAmp = uDistortionY.r;\r
    float yFreq = uDistortionY.g;\r
    return vec3( \r
      xAmp * nsin(progress * PI * xFreq - PI / 2.),\r
      yAmp * nsin(progress * PI * yFreq - PI / 2.),\r
      0.\r
    );\r
  }\r
\`;\r
\r
function random(base: number | [number, number]): number {\r
  if (Array.isArray(base)) {\r
    return Math.random() * (base[1] - base[0]) + base[0];\r
  }\r
  return Math.random() * base;\r
}\r
\r
function pickRandom<T>(arr: T | T[]): T {\r
  if (Array.isArray(arr)) {\r
    return arr[Math.floor(Math.random() * arr.length)];\r
  }\r
  return arr;\r
}\r
\r
function lerp(current: number, target: number, speed = 0.1, limit = 0.001): number {\r
  let change = (target - current) * speed;\r
  if (Math.abs(change) < limit) {\r
    change = target - current;\r
  }\r
  return change;\r
}\r
\r
class CarLights {\r
  webgl: App;\r
  options: HyperspeedOptions;\r
  colors: number[] | THREE.Color;\r
  speed: [number, number];\r
  fade: THREE.Vector2;\r
  mesh!: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;\r
\r
  constructor(\r
    webgl: App,\r
    options: HyperspeedOptions,\r
    colors: number[] | THREE.Color,\r
    speed: [number, number],\r
    fade: THREE.Vector2\r
  ) {\r
    this.webgl = webgl;\r
    this.options = options;\r
    this.colors = colors;\r
    this.speed = speed;\r
    this.fade = fade;\r
  }\r
\r
  init() {\r
    const options = this.options;\r
    const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));\r
    const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);\r
\r
    const instanced = new THREE.InstancedBufferGeometry().copy(geometry as any) as THREE.InstancedBufferGeometry;\r
    instanced.instanceCount = options.lightPairsPerRoadWay * 2;\r
\r
    const laneWidth = options.roadWidth / options.lanesPerRoad;\r
\r
    const aOffset: number[] = [];\r
    const aMetrics: number[] = [];\r
    const aColor: number[] = [];\r
\r
    let colorArray: THREE.Color[];\r
    if (Array.isArray(this.colors)) {\r
      colorArray = this.colors.map(c => new THREE.Color(c));\r
    } else {\r
      colorArray = [new THREE.Color(this.colors)];\r
    }\r
\r
    for (let i = 0; i < options.lightPairsPerRoadWay; i++) {\r
      const radius = random(options.carLightsRadius);\r
      const length = random(options.carLightsLength);\r
      const spd = random(this.speed);\r
\r
      const carLane = i % options.lanesPerRoad;\r
      let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;\r
\r
      const carWidth = random(options.carWidthPercentage) * laneWidth;\r
      const carShiftX = random(options.carShiftX) * laneWidth;\r
      laneX += carShiftX;\r
\r
      const offsetY = random(options.carFloorSeparation) + radius * 1.3;\r
      const offsetZ = -random(options.length);\r
\r
      aOffset.push(laneX - carWidth / 2);\r
      aOffset.push(offsetY);\r
      aOffset.push(offsetZ);\r
\r
      aOffset.push(laneX + carWidth / 2);\r
      aOffset.push(offsetY);\r
      aOffset.push(offsetZ);\r
\r
      aMetrics.push(radius);\r
      aMetrics.push(length);\r
      aMetrics.push(spd);\r
\r
      aMetrics.push(radius);\r
      aMetrics.push(length);\r
      aMetrics.push(spd);\r
\r
      const color = pickRandom<THREE.Color>(colorArray);\r
      aColor.push(color.r);\r
      aColor.push(color.g);\r
      aColor.push(color.b);\r
\r
      aColor.push(color.r);\r
      aColor.push(color.g);\r
      aColor.push(color.b);\r
    }\r
\r
    instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));\r
    instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));\r
    instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));\r
\r
    const material = new THREE.ShaderMaterial({\r
      fragmentShader: carLightsFragment,\r
      vertexShader: carLightsVertex,\r
      transparent: true,\r
      uniforms: Object.assign(\r
        {\r
          uTime: { value: 0 },\r
          uTravelLength: { value: options.length },\r
          uFade: { value: this.fade }\r
        },\r
        this.webgl.fogUniforms,\r
        (typeof this.options.distortion === 'object' ? this.options.distortion.uniforms : {}) || {}\r
      )\r
    });\r
\r
    material.onBeforeCompile = shader => {\r
      shader.vertexShader = shader.vertexShader.replace(\r
        '#include <getDistortion_vertex>',\r
        typeof this.options.distortion === 'object' ? this.options.distortion.getDistortion : ''\r
      );\r
    };\r
\r
    const mesh = new THREE.Mesh(instanced, material);\r
    mesh.frustumCulled = false;\r
    this.webgl.scene.add(mesh);\r
    this.mesh = mesh;\r
  }\r
\r
  update(time: number) {\r
    if (this.mesh.material.uniforms.uTime) {\r
      this.mesh.material.uniforms.uTime.value = time;\r
    }\r
  }\r
}\r
\r
const carLightsFragment = \`\r
  #define USE_FOG;\r
  \${THREE.ShaderChunk['fog_pars_fragment']}\r
  varying vec3 vColor;\r
  varying vec2 vUv; \r
  uniform vec2 uFade;\r
  void main() {\r
    vec3 color = vec3(vColor);\r
    float alpha = smoothstep(uFade.x, uFade.y, vUv.x);\r
    gl_FragColor = vec4(color, alpha);\r
    if (gl_FragColor.a < 0.0001) discard;\r
    \${THREE.ShaderChunk['fog_fragment']}\r
  }\r
\`;\r
\r
const carLightsVertex = \`\r
  #define USE_FOG;\r
  \${THREE.ShaderChunk['fog_pars_vertex']}\r
  attribute vec3 aOffset;\r
  attribute vec3 aMetrics;\r
  attribute vec3 aColor;\r
  uniform float uTravelLength;\r
  uniform float uTime;\r
  varying vec2 vUv; \r
  varying vec3 vColor; \r
  #include <getDistortion_vertex>\r
  void main() {\r
    vec3 transformed = position.xyz;\r
    float radius = aMetrics.r;\r
    float myLength = aMetrics.g;\r
    float speed = aMetrics.b;\r
\r
    transformed.xy *= radius;\r
    transformed.z *= myLength;\r
\r
    transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);\r
    transformed.xy += aOffset.xy;\r
\r
    float progress = abs(transformed.z / uTravelLength);\r
    transformed.xyz += getDistortion(progress);\r
\r
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
    gl_Position = projectionMatrix * mvPosition;\r
    vUv = uv;\r
    vColor = aColor;\r
    \${THREE.ShaderChunk['fog_vertex']}\r
  }\r
\`;\r
\r
class LightsSticks {\r
  webgl: App;\r
  options: HyperspeedOptions;\r
  mesh!: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;\r
\r
  constructor(webgl: App, options: HyperspeedOptions) {\r
    this.webgl = webgl;\r
    this.options = options;\r
  }\r
\r
  init() {\r
    const options = this.options;\r
    const geometry = new THREE.PlaneGeometry(1, 1);\r
    const instanced = new THREE.InstancedBufferGeometry().copy(geometry as any) as THREE.InstancedBufferGeometry;\r
    const totalSticks = options.totalSideLightSticks;\r
    instanced.instanceCount = totalSticks;\r
\r
    const stickoffset = options.length / (totalSticks - 1);\r
    const aOffset: number[] = [];\r
    const aColor: number[] = [];\r
    const aMetrics: number[] = [];\r
\r
    let colorArray: THREE.Color[];\r
    if (Array.isArray(options.colors.sticks)) {\r
      colorArray = options.colors.sticks.map(c => new THREE.Color(c));\r
    } else {\r
      colorArray = [new THREE.Color(options.colors.sticks)];\r
    }\r
\r
    for (let i = 0; i < totalSticks; i++) {\r
      const width = random(options.lightStickWidth);\r
      const height = random(options.lightStickHeight);\r
      aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());\r
\r
      const color = pickRandom<THREE.Color>(colorArray);\r
      aColor.push(color.r);\r
      aColor.push(color.g);\r
      aColor.push(color.b);\r
\r
      aMetrics.push(width);\r
      aMetrics.push(height);\r
    }\r
\r
    instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));\r
    instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));\r
    instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));\r
\r
    const material = new THREE.ShaderMaterial({\r
      fragmentShader: sideSticksFragment,\r
      vertexShader: sideSticksVertex,\r
      side: THREE.DoubleSide,\r
      uniforms: Object.assign(\r
        {\r
          uTravelLength: { value: options.length },\r
          uTime: { value: 0 }\r
        },\r
        this.webgl.fogUniforms,\r
        (typeof options.distortion === 'object' ? options.distortion.uniforms : {}) || {}\r
      )\r
    });\r
\r
    material.onBeforeCompile = shader => {\r
      shader.vertexShader = shader.vertexShader.replace(\r
        '#include <getDistortion_vertex>',\r
        typeof this.options.distortion === 'object' ? this.options.distortion.getDistortion : ''\r
      );\r
    };\r
\r
    const mesh = new THREE.Mesh(instanced, material);\r
    mesh.frustumCulled = false;\r
    this.webgl.scene.add(mesh);\r
    this.mesh = mesh;\r
  }\r
\r
  update(time: number) {\r
    if (this.mesh.material.uniforms.uTime) {\r
      this.mesh.material.uniforms.uTime.value = time;\r
    }\r
  }\r
}\r
\r
const sideSticksVertex = \`\r
  #define USE_FOG;\r
  \${THREE.ShaderChunk['fog_pars_vertex']}\r
  attribute float aOffset;\r
  attribute vec3 aColor;\r
  attribute vec2 aMetrics;\r
  uniform float uTravelLength;\r
  uniform float uTime;\r
  varying vec3 vColor;\r
  mat4 rotationY( in float angle ) {\r
    return mat4(\r
      cos(angle),		0,		sin(angle),	0,\r
      0,		        1.0,	0,			0,\r
      -sin(angle),	    0,		cos(angle),	0,\r
      0, 		        0,		0,			1\r
    );\r
  }\r
  #include <getDistortion_vertex>\r
  void main(){\r
    vec3 transformed = position.xyz;\r
    float width = aMetrics.x;\r
    float height = aMetrics.y;\r
\r
    transformed.xy *= vec2(width, height);\r
    float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);\r
\r
    transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;\r
    transformed.z += - uTravelLength + time;\r
\r
    float progress = abs(transformed.z / uTravelLength);\r
    transformed.xyz += getDistortion(progress);\r
\r
    transformed.y += height / 2.;\r
    transformed.x += -width / 2.;\r
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
    gl_Position = projectionMatrix * mvPosition;\r
    vColor = aColor;\r
    \${THREE.ShaderChunk['fog_vertex']}\r
  }\r
\`;\r
\r
const sideSticksFragment = \`\r
  #define USE_FOG;\r
  \${THREE.ShaderChunk['fog_pars_fragment']}\r
  varying vec3 vColor;\r
  void main(){\r
    vec3 color = vec3(vColor);\r
    gl_FragColor = vec4(color,1.);\r
    \${THREE.ShaderChunk['fog_fragment']}\r
  }\r
\`;\r
\r
class Road {\r
  webgl: App;\r
  options: HyperspeedOptions;\r
  uTime: { value: number };\r
  leftRoadWay!: THREE.Mesh;\r
  rightRoadWay!: THREE.Mesh;\r
  island!: THREE.Mesh;\r
\r
  constructor(webgl: App, options: HyperspeedOptions) {\r
    this.webgl = webgl;\r
    this.options = options;\r
    this.uTime = { value: 0 };\r
  }\r
\r
  createPlane(side: number, width: number, isRoad: boolean) {\r
    const options = this.options;\r
    const segments = 100;\r
    const geometry = new THREE.PlaneGeometry(\r
      isRoad ? options.roadWidth : options.islandWidth,\r
      options.length,\r
      20,\r
      segments\r
    );\r
\r
    let uniforms: Record<string, { value: any }> = {\r
      uTravelLength: { value: options.length },\r
      uColor: {\r
        value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor)\r
      },\r
      uTime: this.uTime\r
    };\r
\r
    if (isRoad) {\r
      uniforms = Object.assign(uniforms, {\r
        uLanes: { value: options.lanesPerRoad },\r
        uBrokenLinesColor: {\r
          value: new THREE.Color(options.colors.brokenLines)\r
        },\r
        uShoulderLinesColor: {\r
          value: new THREE.Color(options.colors.shoulderLines)\r
        },\r
        uShoulderLinesWidthPercentage: {\r
          value: options.shoulderLinesWidthPercentage\r
        },\r
        uBrokenLinesLengthPercentage: {\r
          value: options.brokenLinesLengthPercentage\r
        },\r
        uBrokenLinesWidthPercentage: {\r
          value: options.brokenLinesWidthPercentage\r
        }\r
      });\r
    }\r
\r
    const material = new THREE.ShaderMaterial({\r
      fragmentShader: isRoad ? roadFragment : islandFragment,\r
      vertexShader: roadVertex,\r
      side: THREE.DoubleSide,\r
      uniforms: Object.assign(\r
        uniforms,\r
        this.webgl.fogUniforms,\r
        (typeof options.distortion === 'object' ? options.distortion.uniforms : {}) || {}\r
      )\r
    });\r
\r
    material.onBeforeCompile = shader => {\r
      shader.vertexShader = shader.vertexShader.replace(\r
        '#include <getDistortion_vertex>',\r
        typeof this.options.distortion === 'object' ? this.options.distortion.getDistortion : ''\r
      );\r
    };\r
\r
    const mesh = new THREE.Mesh(geometry, material);\r
    mesh.rotation.x = -Math.PI / 2;\r
    mesh.position.z = -options.length / 2;\r
    mesh.position.x += (this.options.islandWidth / 2 + options.roadWidth / 2) * side;\r
\r
    this.webgl.scene.add(mesh);\r
    return mesh;\r
  }\r
\r
  init() {\r
    this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);\r
    this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);\r
    this.island = this.createPlane(0, this.options.islandWidth, false);\r
  }\r
\r
  update(time: number) {\r
    this.uTime.value = time;\r
  }\r
}\r
\r
const roadBaseFragment = \`\r
  #define USE_FOG;\r
  varying vec2 vUv; \r
  uniform vec3 uColor;\r
  uniform float uTime;\r
  #include <roadMarkings_vars>\r
  \${THREE.ShaderChunk['fog_pars_fragment']}\r
  void main() {\r
    vec2 uv = vUv;\r
    vec3 color = vec3(uColor);\r
    #include <roadMarkings_fragment>\r
    gl_FragColor = vec4(color, 1.);\r
    \${THREE.ShaderChunk['fog_fragment']}\r
  }\r
\`;\r
\r
const islandFragment = roadBaseFragment\r
  .replace('#include <roadMarkings_fragment>', '')\r
  .replace('#include <roadMarkings_vars>', '');\r
\r
const roadMarkings_vars = \`\r
  uniform float uLanes;\r
  uniform vec3 uBrokenLinesColor;\r
  uniform vec3 uShoulderLinesColor;\r
  uniform float uShoulderLinesWidthPercentage;\r
  uniform float uBrokenLinesWidthPercentage;\r
  uniform float uBrokenLinesLengthPercentage;\r
  highp float random(vec2 co) {\r
    highp float a = 12.9898;\r
    highp float b = 78.233;\r
    highp float c = 43758.5453;\r
    highp float dt = dot(co.xy, vec2(a, b));\r
    highp float sn = mod(dt, 3.14);\r
    return fract(sin(sn) * c);\r
  }\r
\`;\r
\r
const roadMarkings_fragment = \`\r
  uv.y = mod(uv.y + uTime * 0.05, 1.);\r
  float laneWidth = 1.0 / uLanes;\r
  float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;\r
  float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;\r
\r
  float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));\r
  float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);\r
\r
  brokenLines = mix(brokenLines, sideLines, uv.x);\r
\`;\r
\r
const roadFragment = roadBaseFragment\r
  .replace('#include <roadMarkings_fragment>', roadMarkings_fragment)\r
  .replace('#include <roadMarkings_vars>', roadMarkings_vars);\r
\r
const roadVertex = \`\r
  #define USE_FOG;\r
  uniform float uTime;\r
  \${THREE.ShaderChunk['fog_pars_vertex']}\r
  uniform float uTravelLength;\r
  varying vec2 vUv; \r
  #include <getDistortion_vertex>\r
  void main() {\r
    vec3 transformed = position.xyz;\r
    vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);\r
    transformed.x += distortion.x;\r
    transformed.z += distortion.y;\r
    transformed.y += -1. * distortion.z;  \r
    \r
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\r
    gl_Position = projectionMatrix * mvPosition;\r
    vUv = uv;\r
    \${THREE.ShaderChunk['fog_vertex']}\r
  }\r
\`;\r
\r
function resizeRendererToDisplaySize(\r
  renderer: THREE.WebGLRenderer,\r
  setSize: (width: number, height: number, updateStyle: boolean) => void\r
) {\r
  const canvas = renderer.domElement;\r
  const width = canvas.clientWidth;\r
  const height = canvas.clientHeight;\r
  const needResize = canvas.width !== width || canvas.height !== height;\r
  if (needResize) {\r
    setSize(width, height, false);\r
  }\r
  return needResize;\r
}\r
\r
class App {\r
  container: HTMLElement;\r
  options: HyperspeedOptions;\r
  renderer: THREE.WebGLRenderer;\r
  composer: EffectComposer;\r
  camera: THREE.PerspectiveCamera;\r
  scene: THREE.Scene;\r
  renderPass!: RenderPass;\r
  bloomPass!: EffectPass;\r
  clock: THREE.Clock;\r
  assets: Record<string, any>;\r
  disposed: boolean;\r
  road: Road;\r
  leftCarLights: CarLights;\r
  rightCarLights: CarLights;\r
  leftSticks: LightsSticks;\r
  fogUniforms: Record<string, { value: any }>;\r
  fovTarget: number;\r
  speedUpTarget: number;\r
  speedUp: number;\r
  timeOffset: number;\r
\r
  constructor(container: HTMLElement, options: HyperspeedOptions) {\r
    this.options = options;\r
    if (!this.options.distortion) {\r
      this.options.distortion = {\r
        uniforms: distortion_uniforms,\r
        getDistortion: distortion_vertex\r
      };\r
    }\r
    this.container = container;\r
\r
    this.renderer = new THREE.WebGLRenderer({\r
      antialias: false,\r
      alpha: true\r
    });\r
    this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);\r
    this.renderer.setPixelRatio(window.devicePixelRatio);\r
\r
    this.composer = new EffectComposer(this.renderer);\r
    container.appendChild(this.renderer.domElement);\r
\r
    this.camera = new THREE.PerspectiveCamera(options.fov, container.offsetWidth / container.offsetHeight, 0.1, 10000);\r
    this.camera.position.z = -5;\r
    this.camera.position.y = 8;\r
    this.camera.position.x = 0;\r
\r
    this.scene = new THREE.Scene();\r
    this.scene.background = null;\r
\r
    const fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);\r
    this.scene.fog = fog;\r
\r
    this.fogUniforms = {\r
      fogColor: { value: fog.color },\r
      fogNear: { value: fog.near },\r
      fogFar: { value: fog.far }\r
    };\r
\r
    this.clock = new THREE.Clock();\r
    this.assets = {};\r
    this.disposed = false;\r
\r
    this.road = new Road(this, options);\r
    this.leftCarLights = new CarLights(\r
      this,\r
      options,\r
      options.colors.leftCars,\r
      options.movingAwaySpeed,\r
      new THREE.Vector2(0, 1 - options.carLightsFade)\r
    );\r
    this.rightCarLights = new CarLights(\r
      this,\r
      options,\r
      options.colors.rightCars,\r
      options.movingCloserSpeed,\r
      new THREE.Vector2(1, 0 + options.carLightsFade)\r
    );\r
    this.leftSticks = new LightsSticks(this, options);\r
\r
    this.fovTarget = options.fov;\r
    this.speedUpTarget = 0;\r
    this.speedUp = 0;\r
    this.timeOffset = 0;\r
\r
    this.tick = this.tick.bind(this);\r
    this.init = this.init.bind(this);\r
    this.setSize = this.setSize.bind(this);\r
    this.onMouseDown = this.onMouseDown.bind(this);\r
    this.onMouseUp = this.onMouseUp.bind(this);\r
\r
    this.onTouchStart = this.onTouchStart.bind(this);\r
    this.onTouchEnd = this.onTouchEnd.bind(this);\r
    this.onContextMenu = this.onContextMenu.bind(this);\r
\r
    window.addEventListener('resize', this.onWindowResize.bind(this));\r
  }\r
\r
  onWindowResize() {\r
    const width = this.container.offsetWidth;\r
    const height = this.container.offsetHeight;\r
\r
    this.renderer.setSize(width, height);\r
    this.camera.aspect = width / height;\r
    this.camera.updateProjectionMatrix();\r
    this.composer.setSize(width, height);\r
  }\r
\r
  initPasses() {\r
    this.renderPass = new RenderPass(this.scene, this.camera);\r
    this.bloomPass = new EffectPass(\r
      this.camera,\r
      new BloomEffect({\r
        luminanceThreshold: 0.2,\r
        luminanceSmoothing: 0,\r
        resolutionScale: 1\r
      })\r
    );\r
\r
    const smaaPass = new EffectPass(\r
      this.camera,\r
      new SMAAEffect({\r
        preset: SMAAPreset.MEDIUM\r
      })\r
    );\r
    this.renderPass.renderToScreen = false;\r
    this.bloomPass.renderToScreen = false;\r
    smaaPass.renderToScreen = true;\r
\r
    this.composer.addPass(this.renderPass);\r
    this.composer.addPass(this.bloomPass);\r
    this.composer.addPass(smaaPass);\r
  }\r
\r
  loadAssets(): Promise<void> {\r
    const assets = this.assets;\r
    return new Promise(resolve => {\r
      const manager = new THREE.LoadingManager(resolve);\r
\r
      const searchImage = new Image();\r
      const areaImage = new Image();\r
      assets.smaa = {};\r
\r
      searchImage.addEventListener('load', function () {\r
        assets.smaa.search = this;\r
        manager.itemEnd('smaa-search');\r
      });\r
\r
      areaImage.addEventListener('load', function () {\r
        assets.smaa.area = this;\r
        manager.itemEnd('smaa-area');\r
      });\r
\r
      manager.itemStart('smaa-search');\r
      manager.itemStart('smaa-area');\r
\r
      searchImage.src = SMAAEffect.searchImageDataURL;\r
      areaImage.src = SMAAEffect.areaImageDataURL;\r
    });\r
  }\r
\r
  init() {\r
    this.initPasses();\r
    const options = this.options;\r
    this.road.init();\r
    this.leftCarLights.init();\r
    this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);\r
\r
    this.rightCarLights.init();\r
    this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);\r
\r
    this.leftSticks.init();\r
    this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));\r
\r
    this.container.addEventListener('mousedown', this.onMouseDown);\r
    this.container.addEventListener('mouseup', this.onMouseUp);\r
    this.container.addEventListener('mouseout', this.onMouseUp);\r
\r
    this.container.addEventListener('touchstart', this.onTouchStart, {\r
      passive: true\r
    });\r
    this.container.addEventListener('touchend', this.onTouchEnd, {\r
      passive: true\r
    });\r
    this.container.addEventListener('touchcancel', this.onTouchEnd, {\r
      passive: true\r
    });\r
    this.container.addEventListener('contextmenu', this.onContextMenu);\r
\r
    this.tick();\r
  }\r
\r
  onMouseDown(ev: MouseEvent) {\r
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev);\r
    this.fovTarget = this.options.fovSpeedUp;\r
    this.speedUpTarget = this.options.speedUp;\r
  }\r
\r
  onMouseUp(ev: MouseEvent) {\r
    if (this.options.onSlowDown) this.options.onSlowDown(ev);\r
    this.fovTarget = this.options.fov;\r
    this.speedUpTarget = 0;\r
  }\r
\r
  onTouchStart(ev: TouchEvent) {\r
    if (this.options.onSpeedUp) this.options.onSpeedUp(ev);\r
    this.fovTarget = this.options.fovSpeedUp;\r
    this.speedUpTarget = this.options.speedUp;\r
  }\r
\r
  onTouchEnd(ev: TouchEvent) {\r
    if (this.options.onSlowDown) this.options.onSlowDown(ev);\r
    this.fovTarget = this.options.fov;\r
    this.speedUpTarget = 0;\r
  }\r
\r
  onContextMenu(ev: MouseEvent) {\r
    ev.preventDefault();\r
  }\r
\r
  update(delta: number) {\r
    const lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);\r
    this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);\r
    this.timeOffset += this.speedUp * delta;\r
    const time = this.clock.elapsedTime + this.timeOffset;\r
\r
    this.rightCarLights.update(time);\r
    this.leftCarLights.update(time);\r
    this.leftSticks.update(time);\r
    this.road.update(time);\r
\r
    let updateCamera = false;\r
    const fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage);\r
    if (fovChange !== 0) {\r
      this.camera.fov += fovChange * delta * 6;\r
      updateCamera = true;\r
    }\r
\r
    if (typeof this.options.distortion === 'object' && this.options.distortion.getJS) {\r
      const distortion = this.options.distortion.getJS(0.025, time);\r
      this.camera.lookAt(\r
        new THREE.Vector3(\r
          this.camera.position.x + distortion.x,\r
          this.camera.position.y + distortion.y,\r
          this.camera.position.z + distortion.z\r
        )\r
      );\r
      updateCamera = true;\r
    }\r
\r
    if (updateCamera) {\r
      this.camera.updateProjectionMatrix();\r
    }\r
  }\r
\r
  render(delta: number) {\r
    this.composer.render(delta);\r
  }\r
\r
  dispose() {\r
    this.disposed = true;\r
\r
    if (this.renderer) {\r
      this.renderer.dispose();\r
    }\r
    if (this.composer) {\r
      this.composer.dispose();\r
    }\r
    if (this.scene) {\r
      this.scene.clear();\r
    }\r
\r
    window.removeEventListener('resize', this.onWindowResize.bind(this));\r
    if (this.container) {\r
      this.container.removeEventListener('mousedown', this.onMouseDown);\r
      this.container.removeEventListener('mouseup', this.onMouseUp);\r
      this.container.removeEventListener('mouseout', this.onMouseUp);\r
\r
      this.container.removeEventListener('touchstart', this.onTouchStart);\r
      this.container.removeEventListener('touchend', this.onTouchEnd);\r
      this.container.removeEventListener('touchcancel', this.onTouchEnd);\r
      this.container.removeEventListener('contextmenu', this.onContextMenu);\r
    }\r
  }\r
\r
  setSize(width: number, height: number, updateStyles: boolean) {\r
    this.composer.setSize(width, height, updateStyles);\r
  }\r
\r
  tick() {\r
    if (this.disposed || !this) return;\r
    if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {\r
      const canvas = this.renderer.domElement;\r
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;\r
      this.camera.updateProjectionMatrix();\r
    }\r
    const delta = this.clock.getDelta();\r
    this.render(delta);\r
    this.update(delta);\r
    requestAnimationFrame(this.tick);\r
  }\r
}\r
\r
const Hyperspeed: FC<HyperspeedProps> = ({ effectOptions = {} }) => {\r
  const mergedOptions: HyperspeedOptions = {\r
    ...defaultOptions,\r
    ...effectOptions\r
  };\r
  const hyperspeed = useRef<HTMLDivElement>(null);\r
  const appRef = useRef<App | null>(null);\r
\r
  useEffect(() => {\r
    if (appRef.current) {\r
      appRef.current.dispose();\r
      const container = document.getElementById('lights');\r
      if (container) {\r
        while (container.firstChild) {\r
          container.removeChild(container.firstChild);\r
        }\r
      }\r
    }\r
\r
    const container = hyperspeed.current;\r
    if (!container) return;\r
\r
    const options = { ...mergedOptions };\r
    if (typeof options.distortion === 'string') {\r
      options.distortion = distortions[options.distortion];\r
    }\r
\r
    const myApp = new App(container, options);\r
    appRef.current = myApp;\r
    myApp.loadAssets().then(myApp.init);\r
\r
    return () => {\r
      if (appRef.current) {\r
        appRef.current.dispose();\r
      }\r
    };\r
  }, [mergedOptions]);\r
\r
  return <div id="lights" className="w-full h-full" ref={hyperspeed}></div>;\r
};\r
\r
export default Hyperspeed;\r
`,Or={dependencies:"three postprocessing",usage:`import Hyperspeed from './Hyperspeed';

// the component will fill the height/width of its parent container, edit the CSS to change this
// the options below are the default values

<Hyperspeed
  effectOptions={{
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xFFFFFF,
      brokenLines: 0xFFFFFF,
      leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
      rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
      sticks: 0x03B3C3,
    }
  }}
/>`,presets:Ir,code:Wr,css:qr,tailwind:Ur,tsCode:_r,tsTailwind:zr},en=()=>{const[S,D]=C.useState("one"),v=[{name:"effectOptions",type:"object",default:'See the "code" tab for default values and presets.',description:"The highly customizable configuration object for the effect, controls things like colors, distortion, line properties, etc."}],y=[{value:"one",label:"Cyberpunk"},{value:"two",label:"Akira"},{value:"three",label:"Golden"},{value:"four",label:"Split"},{value:"five",label:"Highway"}];return m.jsxs(dr,{children:[m.jsxs(pr,{children:[m.jsxs(lr,{position:"relative",className:"demo-container",overflow:"hidden",h:600,cursor:"pointer",p:0,mb:4,children:[m.jsx(Hr,{effectOptions:Dr[S]}),m.jsx(wr,{pillText:"New Background",headline:"Click & hold to see the real magic of hyperspeed!"})]}),m.jsx(Pr,{children:m.jsx(Er,{title:"Animation Preset",options:y,value:S,name:"tiltDirection",width:150,onChange:A=>{D(A)}})}),m.jsx(mr,{data:v}),m.jsx(vr,{dependencyList:["three","postprocessing"]})]}),m.jsx(fr,{children:m.jsx(gr,{codeObject:Or})})]})};export{en as default};
