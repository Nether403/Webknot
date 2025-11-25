import{r as v,j as De}from"./index-wsKSLPNH.js";import{C as ee,ah as Me,m as ze,ae as I,c as O,g as Ce,V as n,W as Te,i as Ee,S as te,bk as se,M as j,P as $,R as U,H as Fe,ac as Ae,j as Re,B as ke,e as Le,aO as Be,A as Ie}from"./three.module-0PRdiASR.js";function Ge({mouseForce:_=20,cursorSize:w=100,isViscous:b=!1,viscous:S=30,iterationsViscous:D=32,iterationsPoisson:M=32,dt:z=.014,BFECC:C=!0,resolution:p=.5,isBounce:T=!1,colors:q=["#5227FF","#FF9FFC","#B19EEF"],style:ie={},className:re="",autoDemo:E=!0,autoSpeed:F=.5,autoIntensity:A=2.2,takeoverDuration:R=.25,autoResumeDelay:k=1e3,autoRampDuration:L=.6}){const V=v.useRef(null),c=v.useRef(null),G=v.useRef(null),f=v.useRef(null),H=v.useRef(null),J=v.useRef(!0),N=v.useRef(null);return v.useEffect(()=>{if(!V.current)return;function u(i){let e;Array.isArray(i)&&i.length>0?i.length===1?e=[i[0],i[0]]:e=i:e=["#ffffff","#ffffff"];const t=e.length,s=new Uint8Array(t*4);for(let o=0;o<t;o++){const l=new ee(e[o]);s[o*4+0]=Math.round(l.r*255),s[o*4+1]=Math.round(l.g*255),s[o*4+2]=Math.round(l.b*255),s[o*4+3]=255}const r=new Me(s,t,1,ze);return r.magFilter=I,r.minFilter=I,r.wrapS=O,r.wrapT=O,r.generateMipmaps=!1,r.needsUpdate=!0,r}const m=u(q),W=new Ce(0,0,0,0);class B{constructor(){this.width=0,this.height=0,this.aspect=1,this.pixelRatio=1,this.isMobile=!1,this.breakpoint=768,this.fboWidth=null,this.fboHeight=null,this.time=0,this.delta=0,this.container=null,this.renderer=null,this.clock=null}init(e){this.container=e,this.pixelRatio=Math.min(window.devicePixelRatio||1,2),this.resize(),this.renderer=new Te({antialias:!0,alpha:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(new ee(0),0),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height),this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.renderer.domElement.style.display="block",this.clock=new Ee,this.clock.start()}resize(){if(!this.container)return;const e=this.container.getBoundingClientRect();this.width=Math.max(1,Math.floor(e.width)),this.height=Math.max(1,Math.floor(e.height)),this.aspect=this.width/this.height,this.renderer&&this.renderer.setSize(this.width,this.height,!1)}update(){this.delta=this.clock.getDelta(),this.time+=this.delta}}const a=new B;class oe{constructor(){this.mouseMoved=!1,this.coords=new n,this.coords_old=new n,this.diff=new n,this.timer=null,this.container=null,this._onMouseMove=this.onDocumentMouseMove.bind(this),this._onTouchStart=this.onDocumentTouchStart.bind(this),this._onTouchMove=this.onDocumentTouchMove.bind(this),this._onMouseEnter=this.onMouseEnter.bind(this),this._onMouseLeave=this.onMouseLeave.bind(this),this._onTouchEnd=this.onTouchEnd.bind(this),this.isHoverInside=!1,this.hasUserControl=!1,this.isAutoActive=!1,this.autoIntensity=2,this.takeoverActive=!1,this.takeoverStartTime=0,this.takeoverDuration=.25,this.takeoverFrom=new n,this.takeoverTo=new n,this.onInteract=null}init(e){this.container=e,e.addEventListener("mousemove",this._onMouseMove,!1),e.addEventListener("touchstart",this._onTouchStart,!1),e.addEventListener("touchmove",this._onTouchMove,!1),e.addEventListener("mouseenter",this._onMouseEnter,!1),e.addEventListener("mouseleave",this._onMouseLeave,!1),e.addEventListener("touchend",this._onTouchEnd,!1)}dispose(){this.container&&(this.container.removeEventListener("mousemove",this._onMouseMove,!1),this.container.removeEventListener("touchstart",this._onTouchStart,!1),this.container.removeEventListener("touchmove",this._onTouchMove,!1),this.container.removeEventListener("mouseenter",this._onMouseEnter,!1),this.container.removeEventListener("mouseleave",this._onMouseLeave,!1),this.container.removeEventListener("touchend",this._onTouchEnd,!1))}setCoords(e,t){if(!this.container)return;this.timer&&clearTimeout(this.timer);const s=this.container.getBoundingClientRect(),r=(e-s.left)/s.width,o=(t-s.top)/s.height;this.coords.set(r*2-1,-(o*2-1)),this.mouseMoved=!0,this.timer=setTimeout(()=>{this.mouseMoved=!1},100)}setNormalized(e,t){this.coords.set(e,t),this.mouseMoved=!0}onDocumentMouseMove(e){if(this.onInteract&&this.onInteract(),this.isAutoActive&&!this.hasUserControl&&!this.takeoverActive){const t=this.container.getBoundingClientRect(),s=(e.clientX-t.left)/t.width,r=(e.clientY-t.top)/t.height;this.takeoverFrom.copy(this.coords),this.takeoverTo.set(s*2-1,-(r*2-1)),this.takeoverStartTime=performance.now(),this.takeoverActive=!0,this.hasUserControl=!0,this.isAutoActive=!1;return}this.setCoords(e.clientX,e.clientY),this.hasUserControl=!0}onDocumentTouchStart(e){if(e.touches.length===1){const t=e.touches[0];this.onInteract&&this.onInteract(),this.setCoords(t.pageX,t.pageY),this.hasUserControl=!0}}onDocumentTouchMove(e){if(e.touches.length===1){const t=e.touches[0];this.onInteract&&this.onInteract(),this.setCoords(t.pageX,t.pageY)}}onTouchEnd(){this.isHoverInside=!1}onMouseEnter(){this.isHoverInside=!0}onMouseLeave(){this.isHoverInside=!1}update(){if(this.takeoverActive){const e=(performance.now()-this.takeoverStartTime)/(this.takeoverDuration*1e3);if(e>=1)this.takeoverActive=!1,this.coords.copy(this.takeoverTo),this.coords_old.copy(this.coords),this.diff.set(0,0);else{const t=e*e*(3-2*e);this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo,t)}}this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),this.coords_old.x===0&&this.coords_old.y===0&&this.diff.set(0,0),this.isAutoActive&&!this.takeoverActive&&this.diff.multiplyScalar(this.autoIntensity)}}const h=new oe;class ne{constructor(e,t,s){this.mouse=e,this.manager=t,this.enabled=s.enabled,this.speed=s.speed,this.resumeDelay=s.resumeDelay||3e3,this.rampDurationMs=(s.rampDuration||0)*1e3,this.active=!1,this.current=new n(0,0),this.target=new n,this.lastTime=performance.now(),this.activationTime=0,this.margin=.2,this._tmpDir=new n,this.pickNewTarget()}pickNewTarget(){const e=Math.random;this.target.set((e()*2-1)*(1-this.margin),(e()*2-1)*(1-this.margin))}forceStop(){this.active=!1,this.mouse.isAutoActive=!1}update(){if(!this.enabled)return;const e=performance.now();if(e-this.manager.lastUserInteraction<this.resumeDelay){this.active&&this.forceStop();return}if(this.mouse.isHoverInside){this.active&&this.forceStop();return}if(this.active||(this.active=!0,this.current.copy(this.mouse.coords),this.lastTime=e,this.activationTime=e),!this.active)return;this.mouse.isAutoActive=!0;let s=(e-this.lastTime)/1e3;this.lastTime=e,s>.2&&(s=.016);const r=this._tmpDir.subVectors(this.target,this.current),o=r.length();if(o<.01){this.pickNewTarget();return}r.normalize();let l=1;if(this.rampDurationMs>0){const Y=Math.min(1,(e-this.activationTime)/this.rampDurationMs);l=Y*Y*(3-2*Y)}const X=this.speed*s*l,g=Math.min(X,o);this.current.addScaledVector(r,g),this.mouse.setNormalized(this.current.x,this.current.y)}}const y=`
  attribute vec3 position;
  uniform vec2 px;
  uniform vec2 boundarySpace;
  varying vec2 uv;
  precision highp float;
  void main(){
  vec3 pos = position;
  vec2 scale = 1.0 - boundarySpace * 2.0;
  pos.xy = pos.xy * scale;
  uv = vec2(0.5)+(pos.xy)*0.5;
  gl_Position = vec4(pos, 1.0);
}
`,ae=`
  attribute vec3 position;
  uniform vec2 px;
  precision highp float;
  varying vec2 uv;
  void main(){
  vec3 pos = position;
  uv = 0.5 + pos.xy * 0.5;
  vec2 n = sign(pos.xy);
  pos.xy = abs(pos.xy) - px * 1.0;
  pos.xy *= n;
  gl_Position = vec4(pos, 1.0);
}
`,ce=`
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
}
`,K=`
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform bool isBFECC;
    uniform vec2 fboSize;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    if(isBFECC == false){
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        vec2 error = spot_new2 - spot_new;
        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; 
        gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
}
`,ue=`
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D palette;
    uniform vec4 bgColor;
    varying vec2 uv;
    void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float lenv = clamp(length(vel), 0.0, 1.0);
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
    vec3 outRGB = mix(bgColor.rgb, c, lenv);
    float outA = mix(bgColor.a, 1.0, lenv);
    gl_FragColor = vec4(outRGB, outA);
}
`,le=`
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
    float divergence = (x1 - x0 + y1 - y0) / 2.0;
    gl_FragColor = vec4(divergence / dt);
}
`,he=`
    precision highp float;
    uniform vec2 force;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0.0, 1.0);
}
`,ve=`
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D divergence;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
    float div = texture2D(divergence, uv).r;
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
    gl_FragColor = vec4(newP);
}
`,de=`
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D velocity;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    float step = 1.0;
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
}
`,pe=`
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D velocity_new;
    uniform float v;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
    vec2 old = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
    newv /= 4.0 * (1.0 + v * dt);
    gl_FragColor = vec4(newv, 0.0, 0.0);
}
`;class x{constructor(e){var t;this.props=e||{},this.uniforms=(t=this.props.material)==null?void 0:t.uniforms,this.scene=null,this.camera=null,this.material=null,this.geometry=null,this.plane=null}init(){this.scene=new te,this.camera=new se,this.uniforms&&(this.material=new U(this.props.material),this.geometry=new $(2,2),this.plane=new j(this.geometry,this.material),this.scene.add(this.plane))}update(){a.renderer.setRenderTarget(this.props.output||null),a.renderer.render(this.scene,this.camera),a.renderer.setRenderTarget(null)}}class fe extends x{constructor(e){super({material:{vertexShader:y,fragmentShader:K,uniforms:{boundarySpace:{value:e.cellScale},px:{value:e.cellScale},fboSize:{value:e.fboSize},velocity:{value:e.src.texture},dt:{value:e.dt},isBFECC:{value:!0}}},output:e.dst}),this.uniforms=this.props.material.uniforms,this.init()}init(){super.init(),this.createBoundary()}createBoundary(){const e=new ke,t=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);e.setAttribute("position",new Le(t,3));const s=new U({vertexShader:ae,fragmentShader:K,uniforms:this.uniforms});this.line=new Be(e,s),this.scene.add(this.line)}update({dt:e,isBounce:t,BFECC:s}){this.uniforms.dt.value=e,this.line.visible=t,this.uniforms.isBFECC.value=s,super.update()}}class me extends x{constructor(e){super({output:e.dst}),this.init(e)}init(e){super.init();const t=new $(1,1),s=new U({vertexShader:ce,fragmentShader:he,blending:Ie,depthWrite:!1,uniforms:{px:{value:e.cellScale},force:{value:new n(0,0)},center:{value:new n(0,0)},scale:{value:new n(e.cursor_size,e.cursor_size)}}});this.mouse=new j(t,s),this.scene.add(this.mouse)}update(e){const t=h.diff.x/2*e.mouse_force,s=h.diff.y/2*e.mouse_force,r=e.cursor_size*e.cellScale.x,o=e.cursor_size*e.cellScale.y,l=Math.min(Math.max(h.coords.x,-1+r+e.cellScale.x*2),1-r-e.cellScale.x*2),X=Math.min(Math.max(h.coords.y,-1+o+e.cellScale.y*2),1-o-e.cellScale.y*2),g=this.mouse.material.uniforms;g.force.value.set(t,s),g.center.value.set(l,X),g.scale.value.set(e.cursor_size,e.cursor_size),super.update()}}class ye extends x{constructor(e){super({material:{vertexShader:y,fragmentShader:pe,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},velocity_new:{value:e.dst_.texture},v:{value:e.viscous},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update({viscous:e,iterations:t,dt:s}){let r,o;this.uniforms.v.value=e;for(let l=0;l<t;l++)l%2===0?(r=this.props.output0,o=this.props.output1):(r=this.props.output1,o=this.props.output0),this.uniforms.velocity_new.value=r.texture,this.props.output=o,this.uniforms.dt.value=s,super.update();return o}}class xe extends x{constructor(e){super({material:{vertexShader:y,fragmentShader:le,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e}){this.uniforms.velocity.value=e.texture,super.update()}}class ge extends x{constructor(e){super({material:{vertexShader:y,fragmentShader:ve,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.dst_.texture},divergence:{value:e.src.texture},px:{value:e.cellScale}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update({iterations:e}){let t,s;for(let r=0;r<e;r++)r%2===0?(t=this.props.output0,s=this.props.output1):(t=this.props.output1,s=this.props.output0),this.uniforms.pressure.value=t.texture,this.props.output=s,super.update();return s}}class _e extends x{constructor(e){super({material:{vertexShader:y,fragmentShader:de,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.src_p.texture},velocity:{value:e.src_v.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e,pressure:t}){this.uniforms.velocity.value=e.texture,this.uniforms.pressure.value=t.texture,super.update()}}class we{constructor(e){this.options={iterations_poisson:32,iterations_viscous:32,mouse_force:20,resolution:.5,cursor_size:100,viscous:30,isBounce:!1,dt:.014,isViscous:!1,BFECC:!0,...e},this.fbos={vel_0:null,vel_1:null,vel_viscous0:null,vel_viscous1:null,div:null,pressure_0:null,pressure_1:null},this.fboSize=new n,this.cellScale=new n,this.boundarySpace=new n,this.init()}init(){this.calcSize(),this.createAllFBO(),this.createShaderPass()}getFloatType(){return/(iPad|iPhone|iPod)/i.test(navigator.userAgent)?Fe:Ae}createAllFBO(){const t={type:this.getFloatType(),depthBuffer:!1,stencilBuffer:!1,minFilter:I,magFilter:I,wrapS:O,wrapT:O};for(let s in this.fbos)this.fbos[s]=new Re(this.fboSize.x,this.fboSize.y,t)}createShaderPass(){this.advection=new fe({cellScale:this.cellScale,fboSize:this.fboSize,dt:this.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1}),this.externalForce=new me({cellScale:this.cellScale,cursor_size:this.options.cursor_size,dst:this.fbos.vel_1}),this.viscous=new ye({cellScale:this.cellScale,boundarySpace:this.boundarySpace,viscous:this.options.viscous,src:this.fbos.vel_1,dst:this.fbos.vel_viscous1,dst_:this.fbos.vel_viscous0,dt:this.options.dt}),this.divergence=new xe({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.vel_viscous0,dst:this.fbos.div,dt:this.options.dt}),this.poisson=new ge({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0}),this.pressure=new _e({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_viscous0,dst:this.fbos.vel_0,dt:this.options.dt})}calcSize(){const e=Math.max(1,Math.round(this.options.resolution*a.width)),t=Math.max(1,Math.round(this.options.resolution*a.height)),s=1/e,r=1/t;this.cellScale.set(s,r),this.fboSize.set(e,t)}resize(){this.calcSize();for(let e in this.fbos)this.fbos[e].setSize(this.fboSize.x,this.fboSize.y)}update(){this.options.isBounce?this.boundarySpace.set(0,0):this.boundarySpace.copy(this.cellScale),this.advection.update({dt:this.options.dt,isBounce:this.options.isBounce,BFECC:this.options.BFECC}),this.externalForce.update({cursor_size:this.options.cursor_size,mouse_force:this.options.mouse_force,cellScale:this.cellScale});let e=this.fbos.vel_1;this.options.isViscous&&(e=this.viscous.update({viscous:this.options.viscous,iterations:this.options.iterations_viscous,dt:this.options.dt})),this.divergence.update({vel:e});const t=this.poisson.update({iterations:this.options.iterations_poisson});this.pressure.update({vel:e,pressure:t})}}class be{constructor(){this.init()}init(){this.simulation=new we,this.scene=new te,this.camera=new se,this.output=new j(new $(2,2),new U({vertexShader:y,fragmentShader:ue,transparent:!0,depthWrite:!1,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new n},palette:{value:m},bgColor:{value:W}}})),this.scene.add(this.output)}addScene(e){this.scene.add(e)}resize(){this.simulation.resize()}render(){a.renderer.setRenderTarget(null),a.renderer.render(this.scene,this.camera)}update(){this.simulation.update(),this.render()}}class Se{constructor(e){this.props=e,a.init(e.$wrapper),h.init(e.$wrapper),h.autoIntensity=e.autoIntensity,h.takeoverDuration=e.takeoverDuration,this.lastUserInteraction=performance.now(),h.onInteract=()=>{this.lastUserInteraction=performance.now(),this.autoDriver&&this.autoDriver.forceStop()},this.autoDriver=new ne(h,this,{enabled:e.autoDemo,speed:e.autoSpeed,resumeDelay:e.autoResumeDelay,rampDuration:e.autoRampDuration}),this.init(),this._loop=this.loop.bind(this),this._resize=this.resize.bind(this),window.addEventListener("resize",this._resize),this._onVisibility=()=>{document.hidden?this.pause():J.current&&this.start()},document.addEventListener("visibilitychange",this._onVisibility),this.running=!1}init(){this.props.$wrapper.prepend(a.renderer.domElement),this.output=new be}resize(){a.resize(),this.output.resize()}render(){this.autoDriver&&this.autoDriver.update(),h.update(),a.update(),this.output.update()}loop(){this.running&&(this.render(),f.current=requestAnimationFrame(this._loop))}start(){this.running||(this.running=!0,this._loop())}pause(){this.running=!1,f.current&&(cancelAnimationFrame(f.current),f.current=null)}dispose(){try{if(window.removeEventListener("resize",this._resize),document.removeEventListener("visibilitychange",this._onVisibility),h.dispose(),a.renderer){const e=a.renderer.domElement;e&&e.parentNode&&e.parentNode.removeChild(e),a.renderer.dispose()}}catch{}}}const d=V.current;d.style.position=d.style.position||"relative",d.style.overflow=d.style.overflow||"hidden";const Q=new Se({$wrapper:d,autoDemo:E,autoSpeed:F,autoIntensity:A,takeoverDuration:R,autoResumeDelay:k,autoRampDuration:L});c.current=Q,(()=>{var t;if(!c.current)return;const i=(t=c.current.output)==null?void 0:t.simulation;if(!i)return;const e=i.options.resolution;Object.assign(i.options,{mouse_force:_,cursor_size:w,isViscous:b,viscous:S,iterations_viscous:D,iterations_poisson:M,dt:z,BFECC:C,resolution:p,isBounce:T}),p!==e&&i.resize()})(),Q.start();const Z=new IntersectionObserver(i=>{const e=i[0],t=e.isIntersecting&&e.intersectionRatio>0;J.current=t,c.current&&(t&&!document.hidden?c.current.start():c.current.pause())},{threshold:[0,.01,.1]});Z.observe(d),H.current=Z;const P=new ResizeObserver(()=>{c.current&&(N.current&&cancelAnimationFrame(N.current),N.current=requestAnimationFrame(()=>{c.current&&c.current.resize()}))});return P.observe(d),G.current=P,()=>{if(f.current&&cancelAnimationFrame(f.current),G.current)try{G.current.disconnect()}catch{}if(H.current)try{H.current.disconnect()}catch{}c.current&&c.current.dispose(),c.current=null}},[C,w,z,T,b,M,D,_,p,S,q,E,F,A,R,k,L]),v.useEffect(()=>{var B;const u=c.current;if(!u)return;const m=(B=u.output)==null?void 0:B.simulation;if(!m)return;const W=m.options.resolution;Object.assign(m.options,{mouse_force:_,cursor_size:w,isViscous:b,viscous:S,iterations_viscous:D,iterations_poisson:M,dt:z,BFECC:C,resolution:p,isBounce:T}),u.autoDriver&&(u.autoDriver.enabled=E,u.autoDriver.speed=F,u.autoDriver.resumeDelay=k,u.autoDriver.rampDurationMs=L*1e3,u.autoDriver.mouse&&(u.autoDriver.mouse.autoIntensity=A,u.autoDriver.mouse.takeoverDuration=R)),p!==W&&m.resize()},[_,w,b,S,D,M,z,C,p,T,E,F,A,R,k,L]),De.jsx("div",{ref:V,className:`liquid-ether-container ${re||""}`,style:ie})}export{Ge as L};
