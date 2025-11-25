import{r as s,j as l,B as Ne,T as Te,F as Ge,d as We}from"./index-wsKSLPNH.js";import{T as qe,P as Xe,a as Qe,C as Ye,b as Ke}from"./PropTable-C4uPWs8h.js";import{C as $e}from"./Customize-1m_ZNqR9.js";import{D as Je}from"./Dependencies-BHoMfJUj.js";import{P as E}from"./PreviewSlider-m1G_aiYP.js";import{M as Be,O as De,B as Ze,F as we,a as L,U as de,V as v,j as re,H as ne,k as er,i as rr,C as I,f as A,A as nr,l as tr,W as or,S as sr,P as ir,b as Se}from"./three.module-0PRdiASR.js";import"./index-Bpz4cGEA.js";const Ae={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class q{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ar=new De(-1,1,1,-1,0,1);class lr extends Ze{constructor(){super(),this.setAttribute("position",new we([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new we([0,2,0,0,2,0],2))}}const cr=new lr;class Le{constructor(e){this._mesh=new Be(cr,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ar)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class he extends q{constructor(e,n){super(),this.textureID=n!==void 0?n:"tDiffuse",e instanceof L?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=de.clone(e.uniforms),this.material=new L({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Le(this.material)}render(e,n,t){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=t.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ce extends q{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,t){const o=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let i,f;this.inverse?(i=0,f=1):(i=1,f=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),r.buffers.stencil.setFunc(o.ALWAYS,i,4294967295),r.buffers.stencil.setClear(f),r.buffers.stencil.setLocked(!0),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(o.EQUAL,1,4294967295),r.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),r.buffers.stencil.setLocked(!0)}}class ur extends q{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class fr{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const t=e.getSize(new v);this._width=t.width,this._height=t.height,n=new re(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ne}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new he(Ae),this.copyPass.material.blending=er,this.clock=new rr}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const n=this.renderer.getRenderTarget();let t=!1;for(let o=0,r=this.passes.length;o<r;o++){const i=this.passes[o];if(i.enabled!==!1){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),i.render(this.renderer,this.writeBuffer,this.readBuffer,e,t),i.needsSwap){if(t){const f=this.renderer.getContext(),a=this.renderer.state.buffers.stencil;a.setFunc(f.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),a.setFunc(f.EQUAL,1,4294967295)}this.swapBuffers()}Ce!==void 0&&(i instanceof Ce?t=!0:i instanceof ur&&(t=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new v);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const t=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(t,o),this.renderTarget2.setSize(t,o);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(t,o)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class mr extends q{constructor(e,n,t=null,o=null,r=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=t,this.clearColor=o,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new I}render(e,n,t){const o=e.autoClear;e.autoClear=!1;let r,i;this.overrideMaterial!==null&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:t),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=i),e.autoClear=o}}const dr={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new I(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class F extends q{constructor(e,n,t,o){super(),this.strength=n!==void 0?n:1,this.radius=t,this.threshold=o,this.resolution=e!==void 0?new v(e.x,e.y):new v(256,256),this.clearColor=new I(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);this.renderTargetBright=new re(r,i,{type:ne}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let m=0;m<this.nMips;m++){const T=new re(r,i,{type:ne});T.texture.name="UnrealBloomPass.h"+m,T.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(T);const w=new re(r,i,{type:ne});w.texture.name="UnrealBloomPass.v"+m,w.texture.generateMipmaps=!1,this.renderTargetsVertical.push(w),r=Math.round(r/2),i=Math.round(i/2)}const f=dr;this.highPassUniforms=de.clone(f.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new L({uniforms:this.highPassUniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader}),this.separableBlurMaterials=[];const a=[3,5,7,9,11];r=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);for(let m=0;m<this.nMips;m++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(a[m])),this.separableBlurMaterials[m].uniforms.invSize.value=new v(1/r,1/i),r=Math.round(r/2),i=Math.round(i/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const P=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=P,this.bloomTintColors=[new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const p=Ae;this.copyUniforms=de.clone(p.uniforms),this.blendMaterial=new L({uniforms:this.copyUniforms,vertexShader:p.vertexShader,fragmentShader:p.fragmentShader,blending:nr,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new I,this.oldClearAlpha=1,this.basic=new tr,this.fsQuad=new Le(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,n){let t=Math.round(e/2),o=Math.round(n/2);this.renderTargetBright.setSize(t,o);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(t,o),this.renderTargetsVertical[r].setSize(t,o),this.separableBlurMaterials[r].uniforms.invSize.value=new v(1/t,1/o),t=Math.round(t/2),o=Math.round(o/2)}render(e,n,t,o,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const i=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=t.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=t.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let f=this.renderTargetBright;for(let a=0;a<this.nMips;a++)this.fsQuad.material=this.separableBlurMaterials[a],this.separableBlurMaterials[a].uniforms.colorTexture.value=f.texture,this.separableBlurMaterials[a].uniforms.direction.value=F.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[a]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[a].uniforms.colorTexture.value=this.renderTargetsHorizontal[a].texture,this.separableBlurMaterials[a].uniforms.direction.value=F.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[a]),e.clear(),this.fsQuad.render(e),f=this.renderTargetsVertical[a];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=i}getSeperableBlurMaterial(e){const n=[];for(let t=0;t<e;t++)n.push(.39894*Math.exp(-.5*t*t/(e*e))/e);return new L({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new v(.5,.5)},direction:{value:new v(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new L({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}F.BlurDirectionX=new v(1,0);F.BlurDirectionY=new v(0,1);const hr=({className:g,style:e,trailLength:n=50,inertia:t=.5,grainIntensity:o=.05,bloomStrength:r=.1,bloomRadius:i=1,bloomThreshold:f=.025,brightness:a=1,color:P="#B19EEF",mixBlendMode:p="screen",edgeIntensity:m=0,maxDevicePixelRatio:T=.5,targetPixels:w,fadeDelayMs:X,fadeDurationMs:te,zIndex:z=10})=>{const Q=s.useRef(null),O=s.useRef(null),Y=s.useRef(null),y=s.useRef(null),oe=s.useRef(null),V=s.useRef(null),j=s.useRef([]),k=s.useRef(0),U=s.useRef(null),ve=s.useRef(null),K=s.useRef(new v(.5,.5)),$=s.useRef(new v(0,0)),J=s.useRef(1),se=s.useRef(typeof performance<"u"?performance.now():Date.now()),N=s.useRef(!1),Z=s.useRef(!1),H=s.useMemo(()=>typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0),[]),ie=w??(H?9e5:13e5),ae=X??(H?500:1e3),pe=te??(H?1e3:1500),Ue=`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,He=`
    uniform float iTime;
    uniform vec3  iResolution;
    uniform vec2  iMouse;
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform float iScale;
    uniform vec3  iBaseColor;
    uniform float iBrightness;
    uniform float iEdgeIntensity;
    varying vec2  vUv;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f *= f * (3. - 2. * f);
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
    }
    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for(int i=0;i<5;i++){
        v += a * noise(p);
        p = m * p * 2.0;
        a *= 0.5;
      }
      return v;
    }
    vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }
    vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }

    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {
      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));

      float smoke = fbm(p * iScale + r * 0.8);
      float radius = 0.5 + 0.3 * (1.0 / iScale);
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));
      float alpha = pow(smoke, 2.5) * distFactor;

      vec3 c1 = tint1(iBaseColor);
      vec3 c2 = tint2(iBaseColor);
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);

      return vec4(color * alpha * intensity, alpha * intensity);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);

      vec3 colorAcc = vec3(0.0);
      float alphaAcc = 0.0;

      vec4 b = blob(uv, mouse, 1.0, iOpacity);
      colorAcc += b.rgb;
      alphaAcc += b.a;

      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
        t = pow(t, 2.0);
        if (t > 0.01) {
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);
          colorAcc += bt.rgb;
          alphaAcc += bt.a;
        }
      }

      colorAcc *= iBrightness;

      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
      float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);
      float k = clamp(iEdgeIntensity, 0.0, 1.0);
      float edgeMask = mix(1.0 - k, 1.0, distFromEdge);

      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);
      gl_FragColor = vec4(colorAcc, outAlpha);
    }
  `,_e=s.useMemo(()=>({uniforms:{tDiffuse:{value:null},iTime:{value:0},intensity:{value:o}},vertexShader:`
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform sampler2D tDiffuse;
        uniform float iTime;
        uniform float intensity;
        varying vec2 vUv;

        float hash1(float n){ return fract(sin(n)*43758.5453); }

        void main(){
          vec4 color = texture2D(tDiffuse, vUv);
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;
          color.rgb += n * intensity * color.rgb;
          gl_FragColor = color;
        }
      `}),[o]),Ie=s.useMemo(()=>new he({uniforms:{tDiffuse:{value:null}},vertexShader:`
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main(){
            vec4 c = texture2D(tDiffuse, vUv);
            float a = max(c.a, 1e-5);
            vec3 straight = c.rgb / a;
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);
          }
        `}),[]);function Fe(c){const u=c.getBoundingClientRect(),S=600,d=Math.min(Math.max(1,u.width),Math.max(1,u.height));return Math.max(.5,Math.min(2,d/S))}s.useEffect(()=>{const c=Q.current,u=c==null?void 0:c.parentElement;if(!c||!u)return;const S=u.style.position;(!S||S==="static")&&(u.style.position="relative");const d=new or({antialias:!H,alpha:!0,depth:!1,stencil:!1,powerPreference:H?"low-power":"high-performance",premultipliedAlpha:!1,preserveDrawingBuffer:!1});d.setClearColor(0,0),O.current=d,d.domElement.style.pointerEvents="none",p?d.domElement.style.mixBlendMode=String(p):d.domElement.style.removeProperty("mix-blend-mode"),c.appendChild(d.domElement);const le=new sr,Oe=new De(-1,1,1,-1,0,1),Re=new ir(2,2),ge=Math.max(1,Math.floor(n));j.current=Array.from({length:ge},()=>new v(.5,.5)),k.current=0;const ce=new I(P),G=new L({defines:{MAX_TRAIL_LENGTH:ge},uniforms:{iTime:{value:0},iResolution:{value:new A(1,1,1)},iMouse:{value:new v(.5,.5)},iPrevMouse:{value:j.current.map(R=>R.clone())},iOpacity:{value:1},iScale:{value:1},iBaseColor:{value:new A(ce.r,ce.g,ce.b)},iBrightness:{value:a},iEdgeIntensity:{value:m}},vertexShader:Ue,fragmentShader:He,transparent:!0,depthTest:!1,depthWrite:!1});y.current=G;const Ve=new Be(Re,G);le.add(Ve);const b=new fr(d);Y.current=b;const je=new mr(le,Oe);b.addPass(je);const ue=new F(new v(1,1),r,i,f);oe.current=ue,b.addPass(ue);const xe=new he(_e);V.current=xe,b.addPass(xe),b.addPass(Ie);const ye=()=>{var _;const R=c.getBoundingClientRect(),x=Math.max(1,Math.floor(R.width)),h=Math.max(1,Math.floor(R.height)),C=Math.min(typeof window<"u"&&window.devicePixelRatio||1,T),B=x*h*C*C,me=B<=ie?1:Math.max(.5,Math.min(1,Math.sqrt(ie/Math.max(1,B)))),D=C*me;d.setPixelRatio(D),d.setSize(x,h,!1),(_=b.setPixelRatio)==null||_.call(b,D),b.setSize(x,h);const W=Math.max(1,Math.floor(x*D)),M=Math.max(1,Math.floor(h*D));G.uniforms.iResolution.value.set(W,M,1),G.uniforms.iScale.value=Fe(c),ue.setSize(W,M)};ye();const fe=new ResizeObserver(ye);ve.current=fe,fe.observe(u),fe.observe(c);const ke=typeof performance<"u"?performance.now():Date.now(),be=()=>{var D,W;const R=performance.now(),x=(R-ke)/1e3,h=y.current,C=Y.current;if(N.current)$.current.set(K.current.x-h.uniforms.iMouse.value.x,K.current.y-h.uniforms.iMouse.value.y),h.uniforms.iMouse.value.copy(K.current),J.current=1;else{$.current.multiplyScalar(t),$.current.lengthSq()>1e-6&&h.uniforms.iMouse.value.add($.current);const M=R-se.current;if(M>ae){const _=Math.min(1,(M-ae)/pe);J.current=Math.max(0,1-_)}}const B=j.current.length;k.current=(k.current+1)%B,j.current[k.current].copy(h.uniforms.iMouse.value);const me=h.uniforms.iPrevMouse.value;for(let M=0;M<B;M++){const _=(k.current-M+B)%B;me[M].copy(j.current[_])}if(h.uniforms.iOpacity.value=J.current,h.uniforms.iTime.value=x,(W=(D=V.current)==null?void 0:D.uniforms)!=null&&W.iTime&&(V.current.uniforms.iTime.value=x),C.render(),!N.current&&J.current<=.001){Z.current=!1,U.current=null;return}U.current=requestAnimationFrame(be)},ee=()=>{Z.current||(Z.current=!0,U.current=requestAnimationFrame(be))},Me=R=>{const x=u.getBoundingClientRect(),h=Se.clamp((R.clientX-x.left)/Math.max(1,x.width),0,1),C=Se.clamp(1-(R.clientY-x.top)/Math.max(1,x.height),0,1);K.current.set(h,C),N.current=!0,se.current=performance.now(),ee()},Ee=()=>{N.current=!0,ee()},Pe=()=>{N.current=!1,se.current=performance.now(),ee()};return u.addEventListener("pointermove",Me,{passive:!0}),u.addEventListener("pointerenter",Ee,{passive:!0}),u.addEventListener("pointerleave",Pe,{passive:!0}),ee(),()=>{var R;U.current&&cancelAnimationFrame(U.current),Z.current=!1,U.current=null,u.removeEventListener("pointermove",Me),u.removeEventListener("pointerenter",Ee),u.removeEventListener("pointerleave",Pe),(R=ve.current)==null||R.disconnect(),le.clear(),Re.dispose(),G.dispose(),b.dispose(),d.dispose(),d.domElement&&d.domElement.parentElement&&d.domElement.parentElement.removeChild(d.domElement),(!S||S==="static")&&(u.style.position=S)}},[n,t,o,r,i,f,ie,ae,pe,H,P,a,p,m]),s.useEffect(()=>{if(y.current){const c=new I(P);y.current.uniforms.iBaseColor.value.set(c.r,c.g,c.b)}},[P]),s.useEffect(()=>{y.current&&(y.current.uniforms.iBrightness.value=a)},[a]),s.useEffect(()=>{y.current&&(y.current.uniforms.iEdgeIntensity.value=m)},[m]),s.useEffect(()=>{var c,u;(u=(c=V.current)==null?void 0:c.uniforms)!=null&&u.intensity&&(V.current.uniforms.intensity.value=o)},[o]),s.useEffect(()=>{var u;const c=(u=O.current)==null?void 0:u.domElement;c&&(p?c.style.mixBlendMode=String(p):c.style.removeProperty("mix-blend-mode"))},[p]);const ze=s.useMemo(()=>({zIndex:z,...e}),[z,e]);return l.jsx("div",{ref:Q,className:`ghost-cursor ${g??""}`,style:ze})},vr=`import { useEffect, useMemo, useRef } from 'react';\r
import * as THREE from 'three';\r
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';\r
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';\r
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';\r
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';\r
import './GhostCursor.css';\r
\r
const GhostCursor = ({\r
  className,\r
  style,\r
  trailLength = 50,\r
  inertia = 0.5,\r
  grainIntensity = 0.05,\r
  bloomStrength = 0.1,\r
  bloomRadius = 1.0,\r
  bloomThreshold = 0.025,\r
\r
  brightness = 1,\r
  color = '#B19EEF',\r
  mixBlendMode = 'screen',\r
  edgeIntensity = 0,\r
\r
  maxDevicePixelRatio = 0.5,\r
  targetPixels,\r
\r
  fadeDelayMs,\r
  fadeDurationMs,\r
  zIndex = 10\r
}) => {\r
  const containerRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const composerRef = useRef(null);\r
  const materialRef = useRef(null);\r
  const bloomPassRef = useRef(null);\r
  const filmPassRef = useRef(null);\r
\r
  const trailBufRef = useRef([]);\r
  const headRef = useRef(0);\r
\r
  const rafRef = useRef(null);\r
  const resizeObsRef = useRef(null);\r
  const currentMouseRef = useRef(new THREE.Vector2(0.5, 0.5));\r
  const velocityRef = useRef(new THREE.Vector2(0, 0));\r
  const fadeOpacityRef = useRef(1.0);\r
  const lastMoveTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now());\r
  const pointerActiveRef = useRef(false);\r
  const runningRef = useRef(false);\r
\r
  const isTouch = useMemo(\r
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),\r
    []\r
  );\r
\r
  const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.3e6);\r
  const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);\r
  const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);\r
\r
  const baseVertexShader = \`\r
    varying vec2 vUv;\r
    void main() {\r
      vUv = uv;\r
      gl_Position = vec4(position, 1.0);\r
    }\r
  \`;\r
\r
  const fragmentShader = \`\r
    uniform float iTime;\r
    uniform vec3  iResolution;\r
    uniform vec2  iMouse;\r
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];\r
    uniform float iOpacity;\r
    uniform float iScale;\r
    uniform vec3  iBaseColor;\r
    uniform float iBrightness;\r
    uniform float iEdgeIntensity;\r
    varying vec2  vUv;\r
\r
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }\r
    float noise(vec2 p){\r
      vec2 i = floor(p), f = fract(p);\r
      f *= f * (3. - 2. * f);\r
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),\r
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);\r
    }\r
    float fbm(vec2 p){\r
      float v = 0.0;\r
      float a = 0.5;\r
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));\r
      for(int i=0;i<5;i++){\r
        v += a * noise(p);\r
        p = m * p * 2.0;\r
        a *= 0.5;\r
      }\r
      return v;\r
    }\r
    vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }\r
    vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }\r
\r
    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {\r
      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));\r
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));\r
\r
      float smoke = fbm(p * iScale + r * 0.8);\r
      float radius = 0.5 + 0.3 * (1.0 / iScale);\r
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));\r
      float alpha = pow(smoke, 2.5) * distFactor;\r
\r
      vec3 c1 = tint1(iBaseColor);\r
      vec3 c2 = tint2(iBaseColor);\r
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);\r
\r
      return vec4(color * alpha * intensity, alpha * intensity);\r
    }\r
\r
    void main() {\r
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
\r
      vec3 colorAcc = vec3(0.0);\r
      float alphaAcc = 0.0;\r
\r
      vec4 b = blob(uv, mouse, 1.0, iOpacity);\r
      colorAcc += b.rgb;\r
      alphaAcc += b.a;\r
\r
      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {\r
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);\r
        t = pow(t, 2.0);\r
        if (t > 0.01) {\r
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);\r
          colorAcc += bt.rgb;\r
          alphaAcc += bt.a;\r
        }\r
      }\r
\r
      colorAcc *= iBrightness;\r
\r
      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;\r
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));\r
      float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);\r
      float k = clamp(iEdgeIntensity, 0.0, 1.0);\r
      float edgeMask = mix(1.0 - k, 1.0, distFromEdge);\r
\r
      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);\r
      gl_FragColor = vec4(colorAcc, outAlpha);\r
    }\r
  \`;\r
\r
  const FilmGrainShader = useMemo(() => {\r
    return {\r
      uniforms: {\r
        tDiffuse: { value: null },\r
        iTime: { value: 0 },\r
        intensity: { value: grainIntensity }\r
      },\r
      vertexShader: \`\r
        varying vec2 vUv;\r
        void main(){\r
          vUv = uv;\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
        }\r
      \`,\r
      fragmentShader: \`\r
        uniform sampler2D tDiffuse;\r
        uniform float iTime;\r
        uniform float intensity;\r
        varying vec2 vUv;\r
\r
        float hash1(float n){ return fract(sin(n)*43758.5453); }\r
\r
        void main(){\r
          vec4 color = texture2D(tDiffuse, vUv);\r
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;\r
          color.rgb += n * intensity * color.rgb;\r
          gl_FragColor = color;\r
        }\r
      \`\r
    };\r
  }, [grainIntensity]);\r
\r
  const UnpremultiplyPass = useMemo(\r
    () =>\r
      new ShaderPass({\r
        uniforms: { tDiffuse: { value: null } },\r
        vertexShader: \`\r
          varying vec2 vUv;\r
          void main(){\r
            vUv = uv;\r
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
          }\r
        \`,\r
        fragmentShader: \`\r
          uniform sampler2D tDiffuse;\r
          varying vec2 vUv;\r
          void main(){\r
            vec4 c = texture2D(tDiffuse, vUv);\r
            float a = max(c.a, 1e-5);\r
            vec3 straight = c.rgb / a;\r
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);\r
          }\r
        \`\r
      }),\r
    []\r
  );\r
\r
  function calculateScale(el) {\r
    const r = el.getBoundingClientRect();\r
    const base = 600;\r
    const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));\r
    return Math.max(0.5, Math.min(2.0, current / base));\r
  }\r
\r
  useEffect(() => {\r
    const host = containerRef.current;\r
    const parent = host?.parentElement;\r
    if (!host || !parent) return;\r
\r
    const prevParentPos = parent.style.position;\r
    if (!prevParentPos || prevParentPos === 'static') {\r
      parent.style.position = 'relative';\r
    }\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: !isTouch,\r
      alpha: true,\r
      depth: false,\r
      stencil: false,\r
      powerPreference: isTouch ? 'low-power' : 'high-performance',\r
      premultipliedAlpha: false,\r
      preserveDrawingBuffer: false\r
    });\r
    renderer.setClearColor(0x000000, 0);\r
    rendererRef.current = renderer;\r
\r
    renderer.domElement.style.pointerEvents = 'none';\r
    if (mixBlendMode) {\r
      renderer.domElement.style.mixBlendMode = String(mixBlendMode);\r
    } else {\r
      renderer.domElement.style.removeProperty('mix-blend-mode');\r
    }\r
\r
    host.appendChild(renderer.domElement);\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geom = new THREE.PlaneGeometry(2, 2);\r
\r
    const maxTrail = Math.max(1, Math.floor(trailLength));\r
    trailBufRef.current = Array.from({ length: maxTrail }, () => new THREE.Vector2(0.5, 0.5));\r
    headRef.current = 0;\r
\r
    const baseColor = new THREE.Color(color);\r
\r
    const material = new THREE.ShaderMaterial({\r
      defines: { MAX_TRAIL_LENGTH: maxTrail },\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new THREE.Vector3(1, 1, 1) },\r
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },\r
        iPrevMouse: { value: trailBufRef.current.map(v => v.clone()) },\r
        iOpacity: { value: 1.0 },\r
        iScale: { value: 1.0 },\r
        iBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },\r
        iBrightness: { value: brightness },\r
        iEdgeIntensity: { value: edgeIntensity }\r
      },\r
      vertexShader: baseVertexShader,\r
      fragmentShader,\r
      transparent: true,\r
      depthTest: false,\r
      depthWrite: false\r
    });\r
    materialRef.current = material;\r
\r
    const mesh = new THREE.Mesh(geom, material);\r
    scene.add(mesh);\r
\r
    const composer = new EffectComposer(renderer);\r
    composerRef.current = composer;\r
\r
    const renderPass = new RenderPass(scene, camera);\r
    composer.addPass(renderPass);\r
\r
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), bloomStrength, bloomRadius, bloomThreshold);\r
    bloomPassRef.current = bloomPass;\r
    composer.addPass(bloomPass);\r
\r
    const filmPass = new ShaderPass(FilmGrainShader);\r
    filmPassRef.current = filmPass;\r
    composer.addPass(filmPass);\r
\r
    composer.addPass(UnpremultiplyPass);\r
\r
    const resize = () => {\r
      const rect = host.getBoundingClientRect();\r
      const cssW = Math.max(1, Math.floor(rect.width));\r
      const cssH = Math.max(1, Math.floor(rect.height));\r
\r
      const currentDPR = Math.min(\r
        typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,\r
        maxDevicePixelRatio\r
      );\r
      const need = cssW * cssH * currentDPR * currentDPR;\r
      const scale = need <= pixelBudget ? 1 : Math.max(0.5, Math.min(1, Math.sqrt(pixelBudget / Math.max(1, need))));\r
      const pixelRatio = currentDPR * scale;\r
\r
      renderer.setPixelRatio(pixelRatio);\r
      renderer.setSize(cssW, cssH, false);\r
\r
      composer.setPixelRatio?.(pixelRatio);\r
      composer.setSize(cssW, cssH);\r
\r
      const wpx = Math.max(1, Math.floor(cssW * pixelRatio));\r
      const hpx = Math.max(1, Math.floor(cssH * pixelRatio));\r
      material.uniforms.iResolution.value.set(wpx, hpx, 1);\r
      material.uniforms.iScale.value = calculateScale(host);\r
      bloomPass.setSize(wpx, hpx);\r
    };\r
\r
    resize();\r
    const ro = new ResizeObserver(resize);\r
    resizeObsRef.current = ro;\r
    ro.observe(parent);\r
    ro.observe(host);\r
\r
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();\r
    const animate = () => {\r
      const now = performance.now();\r
      const t = (now - start) / 1000;\r
\r
      const mat = materialRef.current;\r
      const comp = composerRef.current;\r
\r
      if (pointerActiveRef.current) {\r
        velocityRef.current.set(\r
          currentMouseRef.current.x - mat.uniforms.iMouse.value.x,\r
          currentMouseRef.current.y - mat.uniforms.iMouse.value.y\r
        );\r
        mat.uniforms.iMouse.value.copy(currentMouseRef.current);\r
        fadeOpacityRef.current = 1.0;\r
      } else {\r
        velocityRef.current.multiplyScalar(inertia);\r
        if (velocityRef.current.lengthSq() > 1e-6) {\r
          mat.uniforms.iMouse.value.add(velocityRef.current);\r
        }\r
        const dt = now - lastMoveTimeRef.current;\r
        if (dt > fadeDelay) {\r
          const k = Math.min(1, (dt - fadeDelay) / fadeDuration);\r
          fadeOpacityRef.current = Math.max(0, 1 - k);\r
        }\r
      }\r
\r
      const N = trailBufRef.current.length;\r
      headRef.current = (headRef.current + 1) % N;\r
      trailBufRef.current[headRef.current].copy(mat.uniforms.iMouse.value);\r
      const arr = mat.uniforms.iPrevMouse.value;\r
      for (let i = 0; i < N; i++) {\r
        const srcIdx = (headRef.current - i + N) % N;\r
        arr[i].copy(trailBufRef.current[srcIdx]);\r
      }\r
\r
      mat.uniforms.iOpacity.value = fadeOpacityRef.current;\r
      mat.uniforms.iTime.value = t;\r
\r
      if (filmPassRef.current?.uniforms?.iTime) {\r
        filmPassRef.current.uniforms.iTime.value = t;\r
      }\r
\r
      comp.render();\r
\r
      if (!pointerActiveRef.current && fadeOpacityRef.current <= 0.001) {\r
        runningRef.current = false;\r
        rafRef.current = null;\r
        return;\r
      }\r
\r
      rafRef.current = requestAnimationFrame(animate);\r
    };\r
\r
    const ensureLoop = () => {\r
      if (!runningRef.current) {\r
        runningRef.current = true;\r
        rafRef.current = requestAnimationFrame(animate);\r
      }\r
    };\r
\r
    const onPointerMove = e => {\r
      const rect = parent.getBoundingClientRect();\r
      const x = THREE.MathUtils.clamp((e.clientX - rect.left) / Math.max(1, rect.width), 0, 1);\r
      const y = THREE.MathUtils.clamp(1 - (e.clientY - rect.top) / Math.max(1, rect.height), 0, 1);\r
      currentMouseRef.current.set(x, y);\r
      pointerActiveRef.current = true;\r
      lastMoveTimeRef.current = performance.now();\r
      ensureLoop();\r
    };\r
    const onPointerEnter = () => {\r
      pointerActiveRef.current = true;\r
      ensureLoop();\r
    };\r
    const onPointerLeave = () => {\r
      pointerActiveRef.current = false;\r
      lastMoveTimeRef.current = performance.now();\r
      ensureLoop();\r
    };\r
\r
    parent.addEventListener('pointermove', onPointerMove, { passive: true });\r
    parent.addEventListener('pointerenter', onPointerEnter, { passive: true });\r
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });\r
\r
    ensureLoop();\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      runningRef.current = false;\r
      rafRef.current = null;\r
\r
      parent.removeEventListener('pointermove', onPointerMove);\r
      parent.removeEventListener('pointerenter', onPointerEnter);\r
      parent.removeEventListener('pointerleave', onPointerLeave);\r
      resizeObsRef.current?.disconnect();\r
\r
      scene.clear();\r
      geom.dispose();\r
      material.dispose();\r
      composer.dispose();\r
      renderer.dispose();\r
\r
      if (renderer.domElement && renderer.domElement.parentElement) {\r
        renderer.domElement.parentElement.removeChild(renderer.domElement);\r
      }\r
      if (!prevParentPos || prevParentPos === 'static') {\r
        parent.style.position = prevParentPos;\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    trailLength,\r
    inertia,\r
    grainIntensity,\r
    bloomStrength,\r
    bloomRadius,\r
    bloomThreshold,\r
    pixelBudget,\r
    fadeDelay,\r
    fadeDuration,\r
    isTouch,\r
    color,\r
    brightness,\r
    mixBlendMode,\r
    edgeIntensity\r
  ]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      const c = new THREE.Color(color);\r
      materialRef.current.uniforms.iBaseColor.value.set(c.r, c.g, c.b);\r
    }\r
  }, [color]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      materialRef.current.uniforms.iBrightness.value = brightness;\r
    }\r
  }, [brightness]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      materialRef.current.uniforms.iEdgeIntensity.value = edgeIntensity;\r
    }\r
  }, [edgeIntensity]);\r
\r
  useEffect(() => {\r
    if (filmPassRef.current?.uniforms?.intensity) {\r
      filmPassRef.current.uniforms.intensity.value = grainIntensity;\r
    }\r
  }, [grainIntensity]);\r
\r
  useEffect(() => {\r
    const el = rendererRef.current?.domElement;\r
    if (!el) return;\r
    if (mixBlendMode) {\r
      el.style.mixBlendMode = String(mixBlendMode);\r
    } else {\r
      el.style.removeProperty('mix-blend-mode');\r
    }\r
  }, [mixBlendMode]);\r
\r
  const mergedStyle = useMemo(() => ({ zIndex, ...style }), [zIndex, style]);\r
\r
  return <div ref={containerRef} className={\`ghost-cursor \${className ?? ''}\`} style={mergedStyle} />;\r
};\r
\r
export default GhostCursor;\r
`,pr=`.ghost-cursor {\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
}\r
\r
.ghost-cursor > canvas {\r
  display: block;\r
  width: 100%;\r
  height: 100%;\r
  background: transparent;\r
}\r
`,Rr=`import { useEffect, useMemo, useRef } from 'react';\r
import * as THREE from 'three';\r
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';\r
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';\r
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';\r
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';\r
\r
const GhostCursor = ({\r
  className,\r
  style,\r
  trailLength = 50,\r
  inertia = 0.5,\r
  grainIntensity = 0.05,\r
  bloomStrength = 0.1,\r
  bloomRadius = 1.0,\r
  bloomThreshold = 0.025,\r
\r
  brightness = 1,\r
  color = '#B19EEF',\r
  mixBlendMode = 'screen',\r
  edgeIntensity = 0,\r
\r
  maxDevicePixelRatio = 0.5,\r
  targetPixels,\r
\r
  fadeDelayMs,\r
  fadeDurationMs,\r
  zIndex = 10\r
}) => {\r
  const containerRef = useRef(null);\r
  const rendererRef = useRef(null);\r
  const composerRef = useRef(null);\r
  const materialRef = useRef(null);\r
  const bloomPassRef = useRef(null);\r
  const filmPassRef = useRef(null);\r
\r
  const trailBufRef = useRef([]);\r
  const headRef = useRef(0);\r
\r
  const rafRef = useRef(null);\r
  const resizeObsRef = useRef(null);\r
  const currentMouseRef = useRef(new THREE.Vector2(0.5, 0.5));\r
  const velocityRef = useRef(new THREE.Vector2(0, 0));\r
  const fadeOpacityRef = useRef(1.0);\r
  const lastMoveTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now());\r
  const pointerActiveRef = useRef(false);\r
  const runningRef = useRef(false);\r
\r
  const isTouch = useMemo(\r
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),\r
    []\r
  );\r
\r
  const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.3e6);\r
  const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);\r
  const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);\r
\r
  const baseVertexShader = \`\r
    varying vec2 vUv;\r
    void main() {\r
      vUv = uv;\r
      gl_Position = vec4(position, 1.0);\r
    }\r
  \`;\r
\r
  const fragmentShader = \`\r
    uniform float iTime;\r
    uniform vec3  iResolution;\r
    uniform vec2  iMouse;\r
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];\r
    uniform float iOpacity;\r
    uniform float iScale;\r
    uniform vec3  iBaseColor;\r
    uniform float iBrightness;\r
    uniform float iEdgeIntensity;\r
    varying vec2  vUv;\r
\r
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }\r
    float noise(vec2 p){\r
      vec2 i = floor(p), f = fract(p);\r
      f *= f * (3. - 2. * f);\r
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),\r
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);\r
    }\r
    float fbm(vec2 p){\r
      float v = 0.0;\r
      float a = 0.5;\r
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));\r
      for(int i=0;i<5;i++){\r
        v += a * noise(p);\r
        p = m * p * 2.0;\r
        a *= 0.5;\r
      }\r
      return v;\r
    }\r
    vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }\r
    vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }\r
\r
    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {\r
      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));\r
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));\r
\r
      float smoke = fbm(p * iScale + r * 0.8);\r
      float radius = 0.5 + 0.3 * (1.0 / iScale);\r
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));\r
      float alpha = pow(smoke, 2.5) * distFactor;\r
\r
      vec3 c1 = tint1(iBaseColor);\r
      vec3 c2 = tint2(iBaseColor);\r
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);\r
\r
      return vec4(color * alpha * intensity, alpha * intensity);\r
    }\r
\r
    void main() {\r
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
\r
      vec3 colorAcc = vec3(0.0);\r
      float alphaAcc = 0.0;\r
\r
      vec4 b = blob(uv, mouse, 1.0, iOpacity);\r
      colorAcc += b.rgb;\r
      alphaAcc += b.a;\r
\r
      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {\r
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);\r
        t = pow(t, 2.0);\r
        if (t > 0.01) {\r
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);\r
          colorAcc += bt.rgb;\r
          alphaAcc += bt.a;\r
        }\r
      }\r
\r
      colorAcc *= iBrightness;\r
\r
      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;\r
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));\r
      float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);\r
      float k = clamp(iEdgeIntensity, 0.0, 1.0);\r
      float edgeMask = mix(1.0 - k, 1.0, distFromEdge);\r
\r
      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);\r
      gl_FragColor = vec4(colorAcc, outAlpha);\r
    }\r
  \`;\r
\r
  const FilmGrainShader = useMemo(() => {\r
    return {\r
      uniforms: {\r
        tDiffuse: { value: null },\r
        iTime: { value: 0 },\r
        intensity: { value: grainIntensity }\r
      },\r
      vertexShader: \`\r
        varying vec2 vUv;\r
        void main(){\r
          vUv = uv;\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
        }\r
      \`,\r
      fragmentShader: \`\r
        uniform sampler2D tDiffuse;\r
        uniform float iTime;\r
        uniform float intensity;\r
        varying vec2 vUv;\r
\r
        float hash1(float n){ return fract(sin(n)*43758.5453); }\r
\r
        void main(){\r
          vec4 color = texture2D(tDiffuse, vUv);\r
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;\r
          color.rgb += n * intensity * color.rgb;\r
          gl_FragColor = color;\r
        }\r
      \`\r
    };\r
  }, [grainIntensity]);\r
\r
  const UnpremultiplyPass = useMemo(\r
    () =>\r
      new ShaderPass({\r
        uniforms: { tDiffuse: { value: null } },\r
        vertexShader: \`\r
          varying vec2 vUv;\r
          void main(){\r
            vUv = uv;\r
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
          }\r
        \`,\r
        fragmentShader: \`\r
          uniform sampler2D tDiffuse;\r
          varying vec2 vUv;\r
          void main(){\r
            vec4 c = texture2D(tDiffuse, vUv);\r
            float a = max(c.a, 1e-5);\r
            vec3 straight = c.rgb / a;\r
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);\r
          }\r
        \`\r
      }),\r
    []\r
  );\r
\r
  function calculateScale(el) {\r
    const r = el.getBoundingClientRect();\r
    const base = 600;\r
    const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));\r
    return Math.max(0.5, Math.min(2.0, current / base));\r
  }\r
\r
  useEffect(() => {\r
    const host = containerRef.current;\r
    const parent = host?.parentElement;\r
    if (!host || !parent) return;\r
\r
    const prevParentPos = parent.style.position;\r
    if (!prevParentPos || prevParentPos === 'static') {\r
      parent.style.position = 'relative';\r
    }\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: !isTouch,\r
      alpha: true,\r
      depth: false,\r
      stencil: false,\r
      powerPreference: isTouch ? 'low-power' : 'high-performance',\r
      premultipliedAlpha: false,\r
      preserveDrawingBuffer: false\r
    });\r
    renderer.setClearColor(0x000000, 0);\r
    rendererRef.current = renderer;\r
\r
    renderer.domElement.style.pointerEvents = 'none';\r
    if (mixBlendMode) {\r
      renderer.domElement.style.mixBlendMode = String(mixBlendMode);\r
    } else {\r
      renderer.domElement.style.removeProperty('mix-blend-mode');\r
    }\r
\r
    renderer.domElement.style.display = 'block';\r
    renderer.domElement.style.width = '100%';\r
    renderer.domElement.style.height = '100%';\r
    renderer.domElement.style.background = 'transparent';\r
\r
    host.appendChild(renderer.domElement);\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geom = new THREE.PlaneGeometry(2, 2);\r
\r
    const maxTrail = Math.max(1, Math.floor(trailLength));\r
    trailBufRef.current = Array.from({ length: maxTrail }, () => new THREE.Vector2(0.5, 0.5));\r
    headRef.current = 0;\r
\r
    const baseColor = new THREE.Color(color);\r
\r
    const material = new THREE.ShaderMaterial({\r
      defines: { MAX_TRAIL_LENGTH: maxTrail },\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new THREE.Vector3(1, 1, 1) },\r
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },\r
        iPrevMouse: { value: trailBufRef.current.map(v => v.clone()) },\r
        iOpacity: { value: 1.0 },\r
        iScale: { value: 1.0 },\r
        iBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },\r
        iBrightness: { value: brightness },\r
        iEdgeIntensity: { value: edgeIntensity }\r
      },\r
      vertexShader: baseVertexShader,\r
      fragmentShader,\r
      transparent: true,\r
      depthTest: false,\r
      depthWrite: false\r
    });\r
    materialRef.current = material;\r
\r
    const mesh = new THREE.Mesh(geom, material);\r
    scene.add(mesh);\r
\r
    const composer = new EffectComposer(renderer);\r
    composerRef.current = composer;\r
\r
    const renderPass = new RenderPass(scene, camera);\r
    composer.addPass(renderPass);\r
\r
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), bloomStrength, bloomRadius, bloomThreshold);\r
    bloomPassRef.current = bloomPass;\r
    composer.addPass(bloomPass);\r
\r
    const filmPass = new ShaderPass(FilmGrainShader);\r
    filmPassRef.current = filmPass;\r
    composer.addPass(filmPass);\r
\r
    composer.addPass(UnpremultiplyPass);\r
\r
    const resize = () => {\r
      const rect = host.getBoundingClientRect();\r
      const cssW = Math.max(1, Math.floor(rect.width));\r
      const cssH = Math.max(1, Math.floor(rect.height));\r
\r
      const currentDPR = Math.min(\r
        typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,\r
        maxDevicePixelRatio\r
      );\r
      const need = cssW * cssH * currentDPR * currentDPR;\r
      const scale = need <= pixelBudget ? 1 : Math.max(0.5, Math.min(1, Math.sqrt(pixelBudget / Math.max(1, need))));\r
      const pixelRatio = currentDPR * scale;\r
\r
      renderer.setPixelRatio(pixelRatio);\r
      renderer.setSize(cssW, cssH, false);\r
\r
      composer.setPixelRatio?.(pixelRatio);\r
      composer.setSize(cssW, cssH);\r
\r
      const wpx = Math.max(1, Math.floor(cssW * pixelRatio));\r
      const hpx = Math.max(1, Math.floor(cssH * pixelRatio));\r
      material.uniforms.iResolution.value.set(wpx, hpx, 1);\r
      material.uniforms.iScale.value = calculateScale(host);\r
      bloomPass.setSize(wpx, hpx);\r
    };\r
\r
    resize();\r
    const ro = new ResizeObserver(resize);\r
    resizeObsRef.current = ro;\r
    ro.observe(parent);\r
    ro.observe(host);\r
\r
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();\r
    const animate = () => {\r
      const now = performance.now();\r
      const t = (now - start) / 1000;\r
\r
      const mat = materialRef.current;\r
      const comp = composerRef.current;\r
\r
      if (pointerActiveRef.current) {\r
        velocityRef.current.set(\r
          currentMouseRef.current.x - mat.uniforms.iMouse.value.x,\r
          currentMouseRef.current.y - mat.uniforms.iMouse.value.y\r
        );\r
        mat.uniforms.iMouse.value.copy(currentMouseRef.current);\r
        fadeOpacityRef.current = 1.0;\r
      } else {\r
        velocityRef.current.multiplyScalar(inertia);\r
        if (velocityRef.current.lengthSq() > 1e-6) {\r
          mat.uniforms.iMouse.value.add(velocityRef.current);\r
        }\r
        const dt = now - lastMoveTimeRef.current;\r
        if (dt > fadeDelay) {\r
          const k = Math.min(1, (dt - fadeDelay) / fadeDuration);\r
          fadeOpacityRef.current = Math.max(0, 1 - k);\r
        }\r
      }\r
\r
      const N = trailBufRef.current.length;\r
      headRef.current = (headRef.current + 1) % N;\r
      trailBufRef.current[headRef.current].copy(mat.uniforms.iMouse.value);\r
      const arr = mat.uniforms.iPrevMouse.value;\r
      for (let i = 0; i < N; i++) {\r
        const srcIdx = (headRef.current - i + N) % N;\r
        arr[i].copy(trailBufRef.current[srcIdx]);\r
      }\r
\r
      mat.uniforms.iOpacity.value = fadeOpacityRef.current;\r
      mat.uniforms.iTime.value = t;\r
\r
      if (filmPassRef.current?.uniforms?.iTime) {\r
        filmPassRef.current.uniforms.iTime.value = t;\r
      }\r
\r
      comp.render();\r
\r
      if (!pointerActiveRef.current && fadeOpacityRef.current <= 0.001) {\r
        runningRef.current = false;\r
        rafRef.current = null;\r
        return;\r
      }\r
\r
      rafRef.current = requestAnimationFrame(animate);\r
    };\r
\r
    const ensureLoop = () => {\r
      if (!runningRef.current) {\r
        runningRef.current = true;\r
        rafRef.current = requestAnimationFrame(animate);\r
      }\r
    };\r
\r
    const onPointerMove = e => {\r
      const rect = parent.getBoundingClientRect();\r
      const x = THREE.MathUtils.clamp((e.clientX - rect.left) / Math.max(1, rect.width), 0, 1);\r
      const y = THREE.MathUtils.clamp(1 - (e.clientY - rect.top) / Math.max(1, rect.height), 0, 1);\r
      currentMouseRef.current.set(x, y);\r
      pointerActiveRef.current = true;\r
      lastMoveTimeRef.current = performance.now();\r
      ensureLoop();\r
    };\r
    const onPointerEnter = () => {\r
      pointerActiveRef.current = true;\r
      ensureLoop();\r
    };\r
    const onPointerLeave = () => {\r
      pointerActiveRef.current = false;\r
      lastMoveTimeRef.current = performance.now();\r
      ensureLoop();\r
    };\r
\r
    parent.addEventListener('pointermove', onPointerMove, { passive: true });\r
    parent.addEventListener('pointerenter', onPointerEnter, { passive: true });\r
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });\r
\r
    ensureLoop();\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      runningRef.current = false;\r
      rafRef.current = null;\r
\r
      parent.removeEventListener('pointermove', onPointerMove);\r
      parent.removeEventListener('pointerenter', onPointerEnter);\r
      parent.removeEventListener('pointerleave', onPointerLeave);\r
      resizeObsRef.current?.disconnect();\r
\r
      scene.clear();\r
      geom.dispose();\r
      material.dispose();\r
      composer.dispose();\r
      renderer.dispose();\r
\r
      if (renderer.domElement && renderer.domElement.parentElement) {\r
        renderer.domElement.parentElement.removeChild(renderer.domElement);\r
      }\r
      if (!prevParentPos || prevParentPos === 'static') {\r
        parent.style.position = prevParentPos;\r
      }\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    trailLength,\r
    inertia,\r
    grainIntensity,\r
    bloomStrength,\r
    bloomRadius,\r
    bloomThreshold,\r
    pixelBudget,\r
    fadeDelay,\r
    fadeDuration,\r
    isTouch,\r
    color,\r
    brightness,\r
    mixBlendMode,\r
    edgeIntensity\r
  ]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      const c = new THREE.Color(color);\r
      materialRef.current.uniforms.iBaseColor.value.set(c.r, c.g, c.b);\r
    }\r
  }, [color]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      materialRef.current.uniforms.iBrightness.value = brightness;\r
    }\r
  }, [brightness]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      materialRef.current.uniforms.iEdgeIntensity.value = edgeIntensity;\r
    }\r
  }, [edgeIntensity]);\r
\r
  useEffect(() => {\r
    if (filmPassRef.current?.uniforms?.intensity) {\r
      filmPassRef.current.uniforms.intensity.value = grainIntensity;\r
    }\r
  }, [grainIntensity]);\r
\r
  useEffect(() => {\r
    const el = rendererRef.current?.domElement;\r
    if (!el) return;\r
    if (mixBlendMode) {\r
      el.style.mixBlendMode = String(mixBlendMode);\r
    } else {\r
      el.style.removeProperty('mix-blend-mode');\r
    }\r
  }, [mixBlendMode]);\r
\r
  const mergedStyle = useMemo(() => ({ zIndex, ...style }), [zIndex, style]);\r
\r
  return <div ref={containerRef} className={\`ghost-cursor \${className ?? ''}\`} style={mergedStyle} />;\r
};\r
\r
export default GhostCursor;\r
`,gr=`import React, { useEffect, useMemo, useRef } from 'react';\r
import * as THREE from 'three';\r
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';\r
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';\r
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';\r
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';\r
import './GhostCursor.css';\r
\r
type GhostCursorProps = {\r
  className?: string;\r
  style?: React.CSSProperties;\r
\r
  trailLength?: number;\r
  inertia?: number;\r
  grainIntensity?: number;\r
  bloomStrength?: number;\r
  bloomRadius?: number;\r
  bloomThreshold?: number;\r
\r
  brightness?: number;\r
  color?: string;\r
  mixBlendMode?: React.CSSProperties['mixBlendMode'];\r
  edgeIntensity?: number;\r
\r
  maxDevicePixelRatio?: number;\r
  targetPixels?: number;\r
  fadeDelayMs?: number;\r
  fadeDurationMs?: number;\r
  zIndex?: number;\r
};\r
\r
const GhostCursor: React.FC<GhostCursorProps> = ({\r
  className,\r
  style,\r
  trailLength = 50,\r
  inertia = 0.5,\r
  grainIntensity = 0.05,\r
  bloomStrength = 0.1,\r
  bloomRadius = 1.0,\r
  bloomThreshold = 0.025,\r
\r
  brightness = 1,\r
  color = '#B19EEF',\r
  mixBlendMode = 'screen',\r
  edgeIntensity = 0,\r
\r
  maxDevicePixelRatio = 0.5,\r
  targetPixels,\r
\r
  fadeDelayMs,\r
  fadeDurationMs,\r
  zIndex = 10\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);\r
  const composerRef = useRef<EffectComposer | null>(null);\r
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);\r
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);\r
  const filmPassRef = useRef<ShaderPass | null>(null);\r
\r
  // Trail circular buffer\r
  const trailBufRef = useRef<THREE.Vector2[]>([]);\r
  const headRef = useRef(0);\r
\r
  const rafRef = useRef<number | null>(null);\r
  const resizeObsRef = useRef<ResizeObserver | null>(null);\r
  const currentMouseRef = useRef(new THREE.Vector2(0.5, 0.5));\r
  const velocityRef = useRef(new THREE.Vector2(0, 0));\r
  const fadeOpacityRef = useRef(1.0);\r
  const lastMoveTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now());\r
  const pointerActiveRef = useRef(false);\r
  const runningRef = useRef(false);\r
\r
  const isTouch = useMemo(\r
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),\r
    []\r
  );\r
\r
  const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.3e6);\r
  const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);\r
  const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);\r
\r
  const baseVertexShader = \`\r
    varying vec2 vUv;\r
    void main() {\r
      vUv = uv;\r
      gl_Position = vec4(position, 1.0);\r
    }\r
  \`;\r
\r
  const fragmentShader = \`\r
    uniform float iTime;\r
    uniform vec3  iResolution;\r
    uniform vec2  iMouse;\r
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];\r
    uniform float iOpacity;\r
    uniform float iScale;\r
    uniform vec3  iBaseColor;\r
    uniform float iBrightness;\r
    uniform float iEdgeIntensity;\r
    varying vec2  vUv;\r
\r
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }\r
    float noise(vec2 p){\r
      vec2 i = floor(p), f = fract(p);\r
      f *= f * (3. - 2. * f);\r
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),\r
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);\r
    }\r
    float fbm(vec2 p){\r
      float v = 0.0;\r
      float a = 0.5;\r
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));\r
      for(int i=0;i<5;i++){\r
        v += a * noise(p);\r
        p = m * p * 2.0;\r
        a *= 0.5;\r
      }\r
      return v;\r
    }\r
    vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }\r
    vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }\r
\r
    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {\r
      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));\r
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));\r
\r
      float smoke = fbm(p * iScale + r * 0.8);\r
      float radius = 0.5 + 0.3 * (1.0 / iScale);\r
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));\r
      float alpha = pow(smoke, 2.5) * distFactor;\r
\r
      vec3 c1 = tint1(iBaseColor);\r
      vec3 c2 = tint2(iBaseColor);\r
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);\r
\r
      return vec4(color * alpha * intensity, alpha * intensity);\r
    }\r
\r
    void main() {\r
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
\r
      vec3 colorAcc = vec3(0.0);\r
      float alphaAcc = 0.0;\r
\r
      vec4 b = blob(uv, mouse, 1.0, iOpacity);\r
      colorAcc += b.rgb;\r
      alphaAcc += b.a;\r
\r
      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {\r
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);\r
        t = pow(t, 2.0);\r
        if (t > 0.01) {\r
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);\r
          colorAcc += bt.rgb;\r
          alphaAcc += bt.a;\r
        }\r
      }\r
\r
      colorAcc *= iBrightness;\r
\r
      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;\r
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));\r
      float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);\r
      float k = clamp(iEdgeIntensity, 0.0, 1.0);\r
      float edgeMask = mix(1.0 - k, 1.0, distFromEdge);\r
\r
      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);\r
      gl_FragColor = vec4(colorAcc, outAlpha);\r
    }\r
  \`;\r
\r
  const FilmGrainShader = useMemo(() => {\r
    return {\r
      uniforms: {\r
        tDiffuse: { value: null },\r
        iTime: { value: 0 },\r
        intensity: { value: grainIntensity }\r
      },\r
      vertexShader: \`\r
        varying vec2 vUv;\r
        void main(){\r
          vUv = uv;\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
        }\r
      \`,\r
      fragmentShader: \`\r
        uniform sampler2D tDiffuse;\r
        uniform float iTime;\r
        uniform float intensity;\r
        varying vec2 vUv;\r
\r
        float hash1(float n){ return fract(sin(n)*43758.5453); }\r
\r
        void main(){\r
          vec4 color = texture2D(tDiffuse, vUv);\r
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;\r
          color.rgb += n * intensity * color.rgb;\r
          gl_FragColor = color;\r
        }\r
      \`\r
    };\r
  }, [grainIntensity]);\r
\r
  const UnpremultiplyPass = useMemo(\r
    () =>\r
      new ShaderPass({\r
        uniforms: { tDiffuse: { value: null } },\r
        vertexShader: \`\r
          varying vec2 vUv;\r
          void main(){\r
            vUv = uv;\r
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
          }\r
        \`,\r
        fragmentShader: \`\r
          uniform sampler2D tDiffuse;\r
          varying vec2 vUv;\r
          void main(){\r
            vec4 c = texture2D(tDiffuse, vUv);\r
            float a = max(c.a, 1e-5);\r
            vec3 straight = c.rgb / a;\r
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);\r
          }\r
        \`\r
      }),\r
    []\r
  );\r
\r
  function calculateScale(el: HTMLElement) {\r
    const r = el.getBoundingClientRect();\r
    const base = 600;\r
    const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));\r
    return Math.max(0.5, Math.min(2.0, current / base));\r
  }\r
\r
  useEffect(() => {\r
    const host = containerRef.current;\r
    const parent = host?.parentElement;\r
    if (!host || !parent) return;\r
\r
    const prevParentPos = parent.style.position;\r
    if (!prevParentPos || prevParentPos === 'static') {\r
      parent.style.position = 'relative';\r
    }\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: !isTouch,\r
      alpha: true,\r
      depth: false,\r
      stencil: false,\r
      powerPreference: isTouch ? 'low-power' : 'high-performance',\r
      premultipliedAlpha: false,\r
      preserveDrawingBuffer: false\r
    });\r
    renderer.setClearColor(0x000000, 0);\r
    rendererRef.current = renderer;\r
\r
    renderer.domElement.style.pointerEvents = 'none';\r
    if (mixBlendMode) {\r
      renderer.domElement.style.mixBlendMode = String(mixBlendMode);\r
    } else {\r
      renderer.domElement.style.removeProperty('mix-blend-mode');\r
    }\r
\r
    host.appendChild(renderer.domElement);\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geom = new THREE.PlaneGeometry(2, 2);\r
\r
    const maxTrail = Math.max(1, Math.floor(trailLength));\r
    trailBufRef.current = Array.from({ length: maxTrail }, () => new THREE.Vector2(0.5, 0.5));\r
    headRef.current = 0;\r
\r
    const baseColor = new THREE.Color(color);\r
\r
    const material = new THREE.ShaderMaterial({\r
      defines: { MAX_TRAIL_LENGTH: maxTrail },\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new THREE.Vector3(1, 1, 1) },\r
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },\r
        iPrevMouse: { value: trailBufRef.current.map(v => v.clone()) },\r
        iOpacity: { value: 1.0 },\r
        iScale: { value: 1.0 },\r
        iBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },\r
        iBrightness: { value: brightness },\r
        iEdgeIntensity: { value: edgeIntensity }\r
      },\r
      vertexShader: baseVertexShader,\r
      fragmentShader,\r
      transparent: true,\r
      depthTest: false,\r
      depthWrite: false\r
    });\r
    materialRef.current = material;\r
\r
    const mesh = new THREE.Mesh(geom, material);\r
    scene.add(mesh);\r
\r
    const composer = new EffectComposer(renderer);\r
    composerRef.current = composer;\r
\r
    const renderPass = new RenderPass(scene, camera);\r
    composer.addPass(renderPass);\r
\r
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), bloomStrength, bloomRadius, bloomThreshold);\r
    bloomPassRef.current = bloomPass;\r
    composer.addPass(bloomPass);\r
\r
    const filmPass = new ShaderPass(FilmGrainShader as any);\r
    filmPassRef.current = filmPass;\r
    composer.addPass(filmPass);\r
\r
    composer.addPass(UnpremultiplyPass);\r
\r
    const resize = () => {\r
      const rect = host.getBoundingClientRect();\r
      const cssW = Math.max(1, Math.floor(rect.width));\r
      const cssH = Math.max(1, Math.floor(rect.height));\r
\r
      const currentDPR = Math.min(\r
        typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,\r
        maxDevicePixelRatio\r
      );\r
      const need = cssW * cssH * currentDPR * currentDPR;\r
      const scale = need <= pixelBudget ? 1 : Math.max(0.5, Math.min(1, Math.sqrt(pixelBudget / Math.max(1, need))));\r
      const pixelRatio = currentDPR * scale;\r
\r
      renderer.setPixelRatio(pixelRatio);\r
      renderer.setSize(cssW, cssH, false);\r
\r
      composer.setPixelRatio?.(pixelRatio);\r
      composer.setSize(cssW, cssH);\r
\r
      const wpx = Math.max(1, Math.floor(cssW * pixelRatio));\r
      const hpx = Math.max(1, Math.floor(cssH * pixelRatio));\r
      material.uniforms.iResolution.value.set(wpx, hpx, 1);\r
      material.uniforms.iScale.value = calculateScale(host);\r
      bloomPass.setSize(wpx, hpx);\r
    };\r
\r
    resize();\r
    const ro = new ResizeObserver(resize);\r
    resizeObsRef.current = ro;\r
    ro.observe(parent);\r
    ro.observe(host);\r
\r
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();\r
    const animate = () => {\r
      const now = performance.now();\r
      const t = (now - start) / 1000;\r
\r
      const mat = materialRef.current!;\r
      const comp = composerRef.current!;\r
\r
      if (pointerActiveRef.current) {\r
        velocityRef.current.set(\r
          currentMouseRef.current.x - mat.uniforms.iMouse.value.x,\r
          currentMouseRef.current.y - mat.uniforms.iMouse.value.y\r
        );\r
        mat.uniforms.iMouse.value.copy(currentMouseRef.current);\r
        fadeOpacityRef.current = 1.0;\r
      } else {\r
        velocityRef.current.multiplyScalar(inertia);\r
        if (velocityRef.current.lengthSq() > 1e-6) {\r
          mat.uniforms.iMouse.value.add(velocityRef.current);\r
        }\r
        const dt = now - lastMoveTimeRef.current;\r
        if (dt > fadeDelay) {\r
          const k = Math.min(1, (dt - fadeDelay) / fadeDuration);\r
          fadeOpacityRef.current = Math.max(0, 1 - k);\r
        }\r
      }\r
\r
      const N = trailBufRef.current.length;\r
      headRef.current = (headRef.current + 1) % N;\r
      trailBufRef.current[headRef.current].copy(mat.uniforms.iMouse.value);\r
      const arr = mat.uniforms.iPrevMouse.value as THREE.Vector2[];\r
      for (let i = 0; i < N; i++) {\r
        const srcIdx = (headRef.current - i + N) % N;\r
        arr[i].copy(trailBufRef.current[srcIdx]);\r
      }\r
\r
      mat.uniforms.iOpacity.value = fadeOpacityRef.current;\r
      mat.uniforms.iTime.value = t;\r
\r
      if (filmPassRef.current?.uniforms?.iTime) {\r
        filmPassRef.current.uniforms.iTime.value = t;\r
      }\r
\r
      comp.render();\r
\r
      if (!pointerActiveRef.current && fadeOpacityRef.current <= 0.001) {\r
        runningRef.current = false;\r
        rafRef.current = null;\r
        return;\r
      }\r
\r
      rafRef.current = requestAnimationFrame(animate);\r
    };\r
\r
    const ensureLoop = () => {\r
      if (!runningRef.current) {\r
        runningRef.current = true;\r
        rafRef.current = requestAnimationFrame(animate);\r
      }\r
    };\r
\r
    const onPointerMove = (e: PointerEvent) => {\r
      const rect = parent.getBoundingClientRect();\r
      const x = THREE.MathUtils.clamp((e.clientX - rect.left) / Math.max(1, rect.width), 0, 1);\r
      const y = THREE.MathUtils.clamp(1 - (e.clientY - rect.top) / Math.max(1, rect.height), 0, 1);\r
      currentMouseRef.current.set(x, y);\r
      pointerActiveRef.current = true;\r
      lastMoveTimeRef.current = performance.now();\r
      ensureLoop();\r
    };\r
    const onPointerEnter = () => {\r
      pointerActiveRef.current = true;\r
      ensureLoop();\r
    };\r
    const onPointerLeave = () => {\r
      pointerActiveRef.current = false;\r
      lastMoveTimeRef.current = performance.now();\r
      ensureLoop();\r
    };\r
\r
    parent.addEventListener('pointermove', onPointerMove, { passive: true });\r
    parent.addEventListener('pointerenter', onPointerEnter, { passive: true });\r
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });\r
\r
    ensureLoop();\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      runningRef.current = false;\r
      rafRef.current = null;\r
\r
      parent.removeEventListener('pointermove', onPointerMove);\r
      parent.removeEventListener('pointerenter', onPointerEnter);\r
      parent.removeEventListener('pointerleave', onPointerLeave);\r
      resizeObsRef.current?.disconnect();\r
\r
      scene.clear();\r
      geom.dispose();\r
      material.dispose();\r
      composer.dispose();\r
      renderer.dispose();\r
\r
      if (renderer.domElement && renderer.domElement.parentElement) {\r
        renderer.domElement.parentElement.removeChild(renderer.domElement);\r
      }\r
      if (!prevParentPos || prevParentPos === 'static') {\r
        parent.style.position = prevParentPos;\r
      }\r
    };\r
  }, [\r
    trailLength,\r
    inertia,\r
    grainIntensity,\r
    bloomStrength,\r
    bloomRadius,\r
    bloomThreshold,\r
    pixelBudget,\r
    fadeDelay,\r
    fadeDuration,\r
    isTouch,\r
    color,\r
    brightness,\r
    mixBlendMode,\r
    edgeIntensity\r
  ]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      const c = new THREE.Color(color);\r
      (materialRef.current.uniforms.iBaseColor.value as THREE.Vector3).set(c.r, c.g, c.b);\r
    }\r
  }, [color]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      materialRef.current.uniforms.iBrightness.value = brightness;\r
    }\r
  }, [brightness]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      materialRef.current.uniforms.iEdgeIntensity.value = edgeIntensity;\r
    }\r
  }, [edgeIntensity]);\r
\r
  useEffect(() => {\r
    if (filmPassRef.current?.uniforms?.intensity) {\r
      filmPassRef.current.uniforms.intensity.value = grainIntensity;\r
    }\r
  }, [grainIntensity]);\r
\r
  useEffect(() => {\r
    const el = rendererRef.current?.domElement;\r
    if (!el) return;\r
    if (mixBlendMode) {\r
      el.style.mixBlendMode = String(mixBlendMode);\r
    } else {\r
      el.style.removeProperty('mix-blend-mode');\r
    }\r
  }, [mixBlendMode]);\r
\r
  const mergedStyle = useMemo<React.CSSProperties>(() => ({ zIndex, ...style }), [zIndex, style]);\r
\r
  return <div ref={containerRef} className={\`ghost-cursor \${className ?? ''}\`} style={mergedStyle} />;\r
};\r
\r
export default GhostCursor;\r
`,xr=`import React, { useEffect, useMemo, useRef } from 'react';\r
import * as THREE from 'three';\r
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';\r
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';\r
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';\r
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';\r
\r
type GhostCursorProps = {\r
  className?: string;\r
  style?: React.CSSProperties;\r
\r
  trailLength?: number;\r
  inertia?: number;\r
  grainIntensity?: number;\r
  bloomStrength?: number;\r
  bloomRadius?: number;\r
  bloomThreshold?: number;\r
\r
  brightness?: number;\r
  color?: string;\r
  mixBlendMode?: React.CSSProperties['mixBlendMode'];\r
  edgeIntensity?: number;\r
\r
  maxDevicePixelRatio?: number;\r
  targetPixels?: number;\r
  fadeDelayMs?: number;\r
  fadeDurationMs?: number;\r
  zIndex?: number;\r
};\r
\r
const GhostCursor: React.FC<GhostCursorProps> = ({\r
  className,\r
  style,\r
  trailLength = 50,\r
  inertia = 0.5,\r
  grainIntensity = 0.05,\r
  bloomStrength = 0.1,\r
  bloomRadius = 1.0,\r
  bloomThreshold = 0.025,\r
\r
  brightness = 1,\r
  color = '#B19EEF',\r
  mixBlendMode = 'screen',\r
  edgeIntensity = 0,\r
\r
  maxDevicePixelRatio = 0.5,\r
  targetPixels,\r
\r
  fadeDelayMs,\r
  fadeDurationMs,\r
  zIndex = 10\r
}) => {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);\r
  const composerRef = useRef<EffectComposer | null>(null);\r
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);\r
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);\r
  const filmPassRef = useRef<ShaderPass | null>(null);\r
\r
  // Trail circular buffer\r
  const trailBufRef = useRef<THREE.Vector2[]>([]);\r
  const headRef = useRef(0);\r
\r
  const rafRef = useRef<number | null>(null);\r
  const resizeObsRef = useRef<ResizeObserver | null>(null);\r
  const currentMouseRef = useRef(new THREE.Vector2(0.5, 0.5));\r
  const velocityRef = useRef(new THREE.Vector2(0, 0));\r
  const fadeOpacityRef = useRef(1.0);\r
  const lastMoveTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now());\r
  const pointerActiveRef = useRef(false);\r
  const runningRef = useRef(false);\r
\r
  const isTouch = useMemo(\r
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),\r
    []\r
  );\r
\r
  const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.3e6);\r
  const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);\r
  const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);\r
\r
  const baseVertexShader = \`\r
    varying vec2 vUv;\r
    void main() {\r
      vUv = uv;\r
      gl_Position = vec4(position, 1.0);\r
    }\r
  \`;\r
\r
  const fragmentShader = \`\r
    uniform float iTime;\r
    uniform vec3  iResolution;\r
    uniform vec2  iMouse;\r
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];\r
    uniform float iOpacity;\r
    uniform float iScale;\r
    uniform vec3  iBaseColor;\r
    uniform float iBrightness;\r
    uniform float iEdgeIntensity;\r
    varying vec2  vUv;\r
\r
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }\r
    float noise(vec2 p){\r
      vec2 i = floor(p), f = fract(p);\r
      f *= f * (3. - 2. * f);\r
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),\r
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);\r
    }\r
    float fbm(vec2 p){\r
      float v = 0.0;\r
      float a = 0.5;\r
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));\r
      for(int i=0;i<5;i++){\r
        v += a * noise(p);\r
        p = m * p * 2.0;\r
        a *= 0.5;\r
      }\r
      return v;\r
    }\r
    vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }\r
    vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }\r
\r
    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {\r
      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));\r
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));\r
\r
      float smoke = fbm(p * iScale + r * 0.8);\r
      float radius = 0.5 + 0.3 * (1.0 / iScale);\r
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));\r
      float alpha = pow(smoke, 2.5) * distFactor;\r
\r
      vec3 c1 = tint1(iBaseColor);\r
      vec3 c2 = tint2(iBaseColor);\r
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);\r
\r
      return vec4(color * alpha * intensity, alpha * intensity);\r
    }\r
\r
    void main() {\r
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
\r
      vec3 colorAcc = vec3(0.0);\r
      float alphaAcc = 0.0;\r
\r
      vec4 b = blob(uv, mouse, 1.0, iOpacity);\r
      colorAcc += b.rgb;\r
      alphaAcc += b.a;\r
\r
      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {\r
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);\r
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);\r
        t = pow(t, 2.0);\r
        if (t > 0.01) {\r
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);\r
          colorAcc += bt.rgb;\r
          alphaAcc += bt.a;\r
        }\r
      }\r
\r
      colorAcc *= iBrightness;\r
\r
      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;\r
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));\r
      float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);\r
      float k = clamp(iEdgeIntensity, 0.0, 1.0);\r
      float edgeMask = mix(1.0 - k, 1.0, distFromEdge);\r
\r
      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);\r
      gl_FragColor = vec4(colorAcc, outAlpha);\r
    }\r
  \`;\r
\r
  const FilmGrainShader = useMemo(() => {\r
    return {\r
      uniforms: {\r
        tDiffuse: { value: null },\r
        iTime: { value: 0 },\r
        intensity: { value: grainIntensity }\r
      },\r
      vertexShader: \`\r
        varying vec2 vUv;\r
        void main(){\r
          vUv = uv;\r
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
        }\r
      \`,\r
      fragmentShader: \`\r
        uniform sampler2D tDiffuse;\r
        uniform float iTime;\r
        uniform float intensity;\r
        varying vec2 vUv;\r
\r
        float hash1(float n){ return fract(sin(n)*43758.5453); }\r
\r
        void main(){\r
          vec4 color = texture2D(tDiffuse, vUv);\r
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;\r
          color.rgb += n * intensity * color.rgb;\r
          gl_FragColor = color;\r
        }\r
      \`\r
    };\r
  }, [grainIntensity]);\r
\r
  const UnpremultiplyPass = useMemo(\r
    () =>\r
      new ShaderPass({\r
        uniforms: { tDiffuse: { value: null } },\r
        vertexShader: \`\r
          varying vec2 vUv;\r
          void main(){\r
            vUv = uv;\r
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
          }\r
        \`,\r
        fragmentShader: \`\r
          uniform sampler2D tDiffuse;\r
          varying vec2 vUv;\r
          void main(){\r
            vec4 c = texture2D(tDiffuse, vUv);\r
            float a = max(c.a, 1e-5);\r
            vec3 straight = c.rgb / a;\r
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);\r
          }\r
        \`\r
      }),\r
    []\r
  );\r
\r
  function calculateScale(el: HTMLElement) {\r
    const r = el.getBoundingClientRect();\r
    const base = 600;\r
    const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));\r
    return Math.max(0.5, Math.min(2.0, current / base));\r
  }\r
\r
  useEffect(() => {\r
    const host = containerRef.current;\r
    const parent = host?.parentElement;\r
    if (!host || !parent) return;\r
\r
    const prevParentPos = parent.style.position;\r
    if (!prevParentPos || prevParentPos === 'static') {\r
      parent.style.position = 'relative';\r
    }\r
\r
    const renderer = new THREE.WebGLRenderer({\r
      antialias: !isTouch,\r
      alpha: true,\r
      depth: false,\r
      stencil: false,\r
      powerPreference: isTouch ? 'low-power' : 'high-performance',\r
      premultipliedAlpha: false,\r
      preserveDrawingBuffer: false\r
    });\r
    renderer.setClearColor(0x000000, 0);\r
    rendererRef.current = renderer;\r
\r
    renderer.domElement.style.pointerEvents = 'none';\r
    if (mixBlendMode) {\r
      renderer.domElement.style.mixBlendMode = String(mixBlendMode);\r
    } else {\r
      renderer.domElement.style.removeProperty('mix-blend-mode');\r
    }\r
\r
    renderer.domElement.style.display = 'block';\r
    renderer.domElement.style.width = '100%';\r
    renderer.domElement.style.height = '100%';\r
    renderer.domElement.style.background = 'transparent';\r
\r
    host.appendChild(renderer.domElement);\r
\r
    const scene = new THREE.Scene();\r
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r
\r
    const geom = new THREE.PlaneGeometry(2, 2);\r
\r
    const maxTrail = Math.max(1, Math.floor(trailLength));\r
    trailBufRef.current = Array.from({ length: maxTrail }, () => new THREE.Vector2(0.5, 0.5));\r
    headRef.current = 0;\r
\r
    const baseColor = new THREE.Color(color);\r
\r
    const material = new THREE.ShaderMaterial({\r
      defines: { MAX_TRAIL_LENGTH: maxTrail },\r
      uniforms: {\r
        iTime: { value: 0 },\r
        iResolution: { value: new THREE.Vector3(1, 1, 1) },\r
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },\r
        iPrevMouse: { value: trailBufRef.current.map(v => v.clone()) },\r
        iOpacity: { value: 1.0 },\r
        iScale: { value: 1.0 },\r
        iBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },\r
        iBrightness: { value: brightness },\r
        iEdgeIntensity: { value: edgeIntensity }\r
      },\r
      vertexShader: baseVertexShader,\r
      fragmentShader,\r
      transparent: true,\r
      depthTest: false,\r
      depthWrite: false\r
    });\r
    materialRef.current = material;\r
\r
    const mesh = new THREE.Mesh(geom, material);\r
    scene.add(mesh);\r
\r
    const composer = new EffectComposer(renderer);\r
    composerRef.current = composer;\r
\r
    const renderPass = new RenderPass(scene, camera);\r
    composer.addPass(renderPass);\r
\r
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), bloomStrength, bloomRadius, bloomThreshold);\r
    bloomPassRef.current = bloomPass;\r
    composer.addPass(bloomPass);\r
\r
    const filmPass = new ShaderPass(FilmGrainShader as any);\r
    filmPassRef.current = filmPass;\r
    composer.addPass(filmPass);\r
\r
    composer.addPass(UnpremultiplyPass);\r
\r
    const resize = () => {\r
      const rect = host.getBoundingClientRect();\r
      const cssW = Math.max(1, Math.floor(rect.width));\r
      const cssH = Math.max(1, Math.floor(rect.height));\r
\r
      const currentDPR = Math.min(\r
        typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,\r
        maxDevicePixelRatio\r
      );\r
      const need = cssW * cssH * currentDPR * currentDPR;\r
      const scale = need <= pixelBudget ? 1 : Math.max(0.5, Math.min(1, Math.sqrt(pixelBudget / Math.max(1, need))));\r
      const pixelRatio = currentDPR * scale;\r
\r
      renderer.setPixelRatio(pixelRatio);\r
      renderer.setSize(cssW, cssH, false);\r
\r
      composer.setPixelRatio?.(pixelRatio);\r
      composer.setSize(cssW, cssH);\r
\r
      const wpx = Math.max(1, Math.floor(cssW * pixelRatio));\r
      const hpx = Math.max(1, Math.floor(cssH * pixelRatio));\r
      material.uniforms.iResolution.value.set(wpx, hpx, 1);\r
      material.uniforms.iScale.value = calculateScale(host);\r
      bloomPass.setSize(wpx, hpx);\r
    };\r
\r
    resize();\r
    const ro = new ResizeObserver(resize);\r
    resizeObsRef.current = ro;\r
    ro.observe(parent);\r
    ro.observe(host);\r
\r
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();\r
    const animate = () => {\r
      const now = performance.now();\r
      const t = (now - start) / 1000;\r
\r
      const mat = materialRef.current!;\r
      const comp = composerRef.current!;\r
\r
      if (pointerActiveRef.current) {\r
        velocityRef.current.set(\r
          currentMouseRef.current.x - mat.uniforms.iMouse.value.x,\r
          currentMouseRef.current.y - mat.uniforms.iMouse.value.y\r
        );\r
        mat.uniforms.iMouse.value.copy(currentMouseRef.current);\r
        fadeOpacityRef.current = 1.0;\r
      } else {\r
        velocityRef.current.multiplyScalar(inertia);\r
        if (velocityRef.current.lengthSq() > 1e-6) {\r
          mat.uniforms.iMouse.value.add(velocityRef.current);\r
        }\r
        const dt = now - lastMoveTimeRef.current;\r
        if (dt > fadeDelay) {\r
          const k = Math.min(1, (dt - fadeDelay) / fadeDuration);\r
          fadeOpacityRef.current = Math.max(0, 1 - k);\r
        }\r
      }\r
\r
      const N = trailBufRef.current.length;\r
      headRef.current = (headRef.current + 1) % N;\r
      trailBufRef.current[headRef.current].copy(mat.uniforms.iMouse.value);\r
      const arr = mat.uniforms.iPrevMouse.value as THREE.Vector2[];\r
      for (let i = 0; i < N; i++) {\r
        const srcIdx = (headRef.current - i + N) % N;\r
        arr[i].copy(trailBufRef.current[srcIdx]);\r
      }\r
\r
      mat.uniforms.iOpacity.value = fadeOpacityRef.current;\r
      mat.uniforms.iTime.value = t;\r
\r
      if (filmPassRef.current?.uniforms?.iTime) {\r
        filmPassRef.current.uniforms.iTime.value = t;\r
      }\r
\r
      comp.render();\r
\r
      if (!pointerActiveRef.current && fadeOpacityRef.current <= 0.001) {\r
        runningRef.current = false;\r
        rafRef.current = null;\r
        return;\r
      }\r
\r
      rafRef.current = requestAnimationFrame(animate);\r
    };\r
\r
    const ensureLoop = () => {\r
      if (!runningRef.current) {\r
        runningRef.current = true;\r
        rafRef.current = requestAnimationFrame(animate);\r
      }\r
    };\r
\r
    const onPointerMove = (e: PointerEvent) => {\r
      const rect = parent.getBoundingClientRect();\r
      const x = THREE.MathUtils.clamp((e.clientX - rect.left) / Math.max(1, rect.width), 0, 1);\r
      const y = THREE.MathUtils.clamp(1 - (e.clientY - rect.top) / Math.max(1, rect.height), 0, 1);\r
      currentMouseRef.current.set(x, y);\r
      pointerActiveRef.current = true;\r
      lastMoveTimeRef.current = performance.now();\r
      ensureLoop();\r
    };\r
    const onPointerEnter = () => {\r
      pointerActiveRef.current = true;\r
      ensureLoop();\r
    };\r
    const onPointerLeave = () => {\r
      pointerActiveRef.current = false;\r
      lastMoveTimeRef.current = performance.now();\r
      ensureLoop();\r
    };\r
\r
    parent.addEventListener('pointermove', onPointerMove, { passive: true });\r
    parent.addEventListener('pointerenter', onPointerEnter, { passive: true });\r
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });\r
\r
    ensureLoop();\r
\r
    return () => {\r
      if (rafRef.current) cancelAnimationFrame(rafRef.current);\r
      runningRef.current = false;\r
      rafRef.current = null;\r
\r
      parent.removeEventListener('pointermove', onPointerMove);\r
      parent.removeEventListener('pointerenter', onPointerEnter);\r
      parent.removeEventListener('pointerleave', onPointerLeave);\r
      resizeObsRef.current?.disconnect();\r
\r
      scene.clear();\r
      geom.dispose();\r
      material.dispose();\r
      composer.dispose();\r
      renderer.dispose();\r
\r
      if (renderer.domElement && renderer.domElement.parentElement) {\r
        renderer.domElement.parentElement.removeChild(renderer.domElement);\r
      }\r
      if (!prevParentPos || prevParentPos === 'static') {\r
        parent.style.position = prevParentPos;\r
      }\r
    };\r
  }, [\r
    trailLength,\r
    inertia,\r
    grainIntensity,\r
    bloomStrength,\r
    bloomRadius,\r
    bloomThreshold,\r
    pixelBudget,\r
    fadeDelay,\r
    fadeDuration,\r
    isTouch,\r
    color,\r
    brightness,\r
    mixBlendMode,\r
    edgeIntensity\r
  ]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      const c = new THREE.Color(color);\r
      (materialRef.current.uniforms.iBaseColor.value as THREE.Vector3).set(c.r, c.g, c.b);\r
    }\r
  }, [color]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      materialRef.current.uniforms.iBrightness.value = brightness;\r
    }\r
  }, [brightness]);\r
\r
  useEffect(() => {\r
    if (materialRef.current) {\r
      materialRef.current.uniforms.iEdgeIntensity.value = edgeIntensity;\r
    }\r
  }, [edgeIntensity]);\r
\r
  useEffect(() => {\r
    if (filmPassRef.current?.uniforms?.intensity) {\r
      filmPassRef.current.uniforms.intensity.value = grainIntensity;\r
    }\r
  }, [grainIntensity]);\r
\r
  useEffect(() => {\r
    const el = rendererRef.current?.domElement;\r
    if (!el) return;\r
    if (mixBlendMode) {\r
      el.style.mixBlendMode = String(mixBlendMode);\r
    } else {\r
      el.style.removeProperty('mix-blend-mode');\r
    }\r
  }, [mixBlendMode]);\r
\r
  const mergedStyle = useMemo<React.CSSProperties>(() => ({ zIndex, ...style }), [zIndex, style]);\r
\r
  return (\r
    <div ref={containerRef} className={\`pointer-events-none absolute inset-0 \${className ?? ''}\`} style={mergedStyle} />\r
  );\r
};\r
\r
export default GhostCursor;\r
`,yr={dependencies:"three",usage:`import GhostCursor from './GhostCursor'

<div style={{ height: 600, position: 'relative' }}>
  <GhostCursor
    // Visuals
    color="#B19EEF"
    brightness={1}
    edgeIntensity={0}

    // Trail and motion
    trailLength={50}
    inertia={0.5}

    // Post-processing
    grainIntensity={0.05}
    bloomStrength={0.1}
    bloomRadius={1.0}
    bloomThreshold={0.025}

    // Fade-out behavior
    fadeDelayMs={1000}
    fadeDurationMs={1500}
  />
</div>`,code:vr,css:pr,tailwind:Rr,tsCode:gr,tsTailwind:xr},Cr=()=>{const[g,e]=s.useState(50),[n,t]=s.useState(.5),[o,r]=s.useState(.05),[i,f]=s.useState(.1),[a,P]=s.useState(1),[p,m]=s.useState(.025),[T,w]=s.useState(2),[X,te]=s.useState("#B19EEF"),[z,Q]=s.useState(1e3),[O,Y]=s.useState(1500),y=[{name:"className",type:"string",default:"''",description:"Additional CSS class names for the container."},{name:"style",type:"React.CSSProperties",default:"{}",description:"Inline styles for the container element."},{name:"trailLength",type:"number",default:"50",description:"Number of points stored for the cursor trail (longer = longer smear)."},{name:"inertia",type:"number",default:"0.5",description:"Velocity retention when the pointer stops. Higher values make the cursor glide longer."},{name:"grainIntensity",type:"number",default:"0.05",description:"Strength of the film grain post-processing pass."},{name:"bloomStrength",type:"number",default:"0.1",description:"UnrealBloom effect strength."},{name:"bloomRadius",type:"number",default:"1.0",description:"UnrealBloom radius controlling spread of glow."},{name:"bloomThreshold",type:"number",default:"0.025",description:"UnrealBloom threshold; lower includes more pixels in bloom."},{name:"brightness",type:"number",default:"1",description:"Final brightness multiplier applied to the effect color."},{name:"color",type:"string",default:"'#B19EEF'",description:"Base color of the ghost cursor effect."},{name:"mixBlendMode",type:"CSS mix-blend-mode",default:"'screen'",description:"Blend mode used when compositing with page content."},{name:"edgeIntensity",type:"number",default:"0",description:"Darkening near edges of the canvas. 0 = none, 1 = strongest."},{name:"maxDevicePixelRatio",type:"number",default:"0.5",description:"Upper cap for devicePixelRatio to control render cost on high-DPR displays."},{name:"targetPixels",type:"number",default:"auto (~1.3e6 desktop, ~0.9e6 touch)",description:"Pixel budget. Resolution is dynamically scaled to keep total pixel count under this budget."},{name:"fadeDelayMs",type:"number",default:"auto (1000 desktop, 500 touch)",description:"Idle delay before the trail starts to fade after pointer leaves/stops."},{name:"fadeDurationMs",type:"number",default:"auto (1500 desktop, 1000 touch)",description:"Duration of the trail fade-out once the delay has elapsed."},{name:"zIndex",type:"number",default:"10",description:"z-index applied to the canvas for layering above/below content."}];return l.jsxs(qe,{children:[l.jsxs(Xe,{children:[l.jsxs(Ne,{position:"relative",className:"demo-container",h:600,overflow:"hidden",children:[l.jsx(hr,{trailLength:g,inertia:n,grainIntensity:o,bloomStrength:i,bloomRadius:a,bloomThreshold:p,brightness:T,color:X,fadeDelayMs:z,fadeDurationMs:O}),l.jsx(Te,{position:"absolute",userSelect:"none",fontSize:"clamp(3rem, 8vw, 8rem)",zIndex:11,fontWeight:900,color:"#060010",children:"Boo!"})]}),l.jsxs($e,{children:[l.jsxs(Ge,{alignItems:"center",mb:4,children:[l.jsx(Te,{fontSize:"sm",mr:2,children:"Color"}),l.jsx(We,{type:"color",value:X,onChange:oe=>te(oe.target.value),width:"50px"})]}),l.jsx(E,{title:"Trail Length",min:10,max:50,step:5,value:g,onChange:e}),l.jsx(E,{title:"Inertia",min:0,max:.99,step:.01,value:n,onChange:t}),l.jsx(E,{title:"Grain Intensity",min:0,max:.5,step:.01,value:o,onChange:r}),l.jsx(E,{title:"Bloom Strength",min:0,max:10,step:.05,value:i,onChange:f}),l.jsx(E,{title:"Bloom Radius",min:0,max:10,step:.05,value:a,onChange:P}),l.jsx(E,{title:"Bloom Threshold",min:0,max:1,step:.01,value:p,onChange:m}),l.jsx(E,{title:"Brightness",min:0,max:10,step:.1,value:T,onChange:w}),l.jsx(E,{title:"Fade Delay (ms)",min:0,max:3e3,step:100,value:z,onChange:Q}),l.jsx(E,{title:"Fade Duration (ms)",min:100,max:5e3,step:100,value:O,onChange:Y})]}),l.jsx(Qe,{data:y}),l.jsx(Je,{dependencyList:["three"]})]}),l.jsx(Ye,{children:l.jsx(Ke,{codeObject:yr})})]})};export{Cr as default};
