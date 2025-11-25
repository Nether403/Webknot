import{r as ur,j as p,F as Kr,T as qr}from"./index-wsKSLPNH.js";import{T as jr,P as $r,a as Jr,C as Qr,b as Zr}from"./PropTable-C4uPWs8h.js";import"./index-Bpz4cGEA.js";function re({SIM_RESOLUTION:_=128,DYE_RESOLUTION:W=1440,CAPTURE_RESOLUTION:gr=512,DENSITY_DISSIPATION:k=3.5,VELOCITY_DISSIPATION:K=2,PRESSURE:q=.1,PRESSURE_ITERATIONS:j=20,CURL:$=3,SPLAT_RADIUS:J=.2,SPLAT_FORCE:Q=6e3,SHADING:Z=!0,COLOR_UPDATE_SPEED:rr=10,BACK_COLOR:mr={r:.5,g:0,b:0},TRANSPARENT:fr=!0}){const er=ur.useRef(null);return ur.useEffect(()=>{const s=er.current;if(!s)return;function dr(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[0,0,0]}let m={SIM_RESOLUTION:_,DYE_RESOLUTION:W,DENSITY_DISSIPATION:k,VELOCITY_DISSIPATION:K,PRESSURE:q,PRESSURE_ITERATIONS:j,CURL:$,SPLAT_RADIUS:J,SPLAT_FORCE:Q,SHADING:Z,COLOR_UPDATE_SPEED:rr},T=[new dr];const{gl:e,ext:y}=vr(s);y.supportLinearFiltering||(m.DYE_RESOLUTION=256,m.SHADING=!1);function vr(r){const n={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let t=r.getContext("webgl2",n);const o=!!t;o||(t=r.getContext("webgl",n)||r.getContext("experimental-webgl",n));let i,a;o?(t.getExtension("EXT_color_buffer_float"),a=t.getExtension("OES_texture_float_linear")):(i=t.getExtension("OES_texture_half_float"),a=t.getExtension("OES_texture_half_float_linear")),t.clearColor(0,0,0,1);const l=o?t.HALF_FLOAT:i&&i.HALF_FLOAT_OES;let g,u,S;return o?(g=b(t,t.RGBA16F,t.RGBA,l),u=b(t,t.RG16F,t.RG,l),S=b(t,t.R16F,t.RED,l)):(g=b(t,t.RGBA,t.RGBA,l),u=b(t,t.RGBA,t.RGBA,l),S=b(t,t.RGBA,t.RGBA,l)),{gl:t,ext:{formatRGBA:g,formatRG:u,formatR:S,halfFloatTexType:l,supportLinearFiltering:a}}}function b(r,n,t,o){if(!pr(r,n,t,o))switch(n){case r.R16F:return b(r,r.RG16F,r.RG,o);case r.RG16F:return b(r,r.RGBA16F,r.RGBA,o);default:return null}return{internalFormat:n,format:t}}function pr(r,n,t,o){const i=r.createTexture();r.bindTexture(r.TEXTURE_2D,i),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texImage2D(r.TEXTURE_2D,0,n,4,4,0,t,o,null);const a=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,a),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,i,0),r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE}class hr{constructor(n,t){this.vertexShader=n,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(n){let t=0;for(let i=0;i<n.length;i++)t+=kr(n[i]);let o=this.programs[t];if(o==null){let i=h(e.FRAGMENT_SHADER,this.fragmentShaderSource,n);o=nr(this.vertexShader,i),this.programs[t]=o}o!==this.activeProgram&&(this.uniforms=tr(o),this.activeProgram=o)}bind(){e.useProgram(this.activeProgram)}}class E{constructor(n,t){this.uniforms={},this.program=nr(n,t),this.uniforms=tr(this.program)}bind(){e.useProgram(this.program)}}function nr(r,n){let t=e.createProgram();return e.attachShader(t,r),e.attachShader(t,n),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)||console.trace(e.getProgramInfoLog(t)),t}function tr(r){let n=[],t=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let o=0;o<t;o++){let i=e.getActiveUniform(r,o).name;n[i]=e.getUniformLocation(r,i)}return n}function h(r,n,t){n=xr(n,t);const o=e.createShader(r);return e.shaderSource(o,n),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)||console.trace(e.getShaderInfoLog(o)),o}function xr(r,n){if(!n)return r;let t="";return n.forEach(o=>{t+="#define "+o+`
`}),t+r}const R=h(e.VERTEX_SHADER,`
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `),Rr=h(e.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `),Sr=h(e.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `),Tr=`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `,yr=h(e.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `),Er=h(e.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,y.supportLinearFiltering?null:["MANUAL_FILTERING"]),br=h(e.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `),Pr=h(e.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `),Dr=h(e.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),Fr=h(e.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `),Ar=h(e.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),v=(e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),e.STATIC_DRAW),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(0),(r,n=!1)=>{r==null?(e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.bindFramebuffer(e.FRAMEBUFFER,null)):(e.viewport(0,0,r.width,r.height),e.bindFramebuffer(e.FRAMEBUFFER,r.fbo)),n&&(e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT)),e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0)});let d,c,N,X,P;const or=new E(R,Rr),G=new E(R,Sr),D=new E(R,yr),x=new E(R,Er),Y=new E(R,br),z=new E(R,Pr),A=new E(R,Dr),L=new E(R,Fr),U=new E(R,Ar),B=new hr(R,Tr);function ir(){let r=sr(m.SIM_RESOLUTION),n=sr(m.DYE_RESOLUTION);const t=y.halfFloatTexType,o=y.formatRGBA,i=y.formatRG,a=y.formatR,l=y.supportLinearFiltering?e.LINEAR:e.NEAREST;e.disable(e.BLEND),d?d=ar(d,n.width,n.height,o.internalFormat,o.format,t,l):d=M(n.width,n.height,o.internalFormat,o.format,t,l),c?c=ar(c,r.width,r.height,i.internalFormat,i.format,t,l):c=M(r.width,r.height,i.internalFormat,i.format,t,l),N=w(r.width,r.height,a.internalFormat,a.format,t,e.NEAREST),X=w(r.width,r.height,a.internalFormat,a.format,t,e.NEAREST),P=M(r.width,r.height,a.internalFormat,a.format,t,e.NEAREST)}function w(r,n,t,o,i,a){e.activeTexture(e.TEXTURE0);let l=e.createTexture();e.bindTexture(e.TEXTURE_2D,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,r,n,0,o,i,null);let g=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,g),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,l,0),e.viewport(0,0,r,n),e.clear(e.COLOR_BUFFER_BIT);let u=1/r,S=1/n;return{texture:l,fbo:g,width:r,height:n,texelSizeX:u,texelSizeY:S,attach(F){return e.activeTexture(e.TEXTURE0+F),e.bindTexture(e.TEXTURE_2D,l),F}}}function M(r,n,t,o,i,a){let l=w(r,n,t,o,i,a),g=w(r,n,t,o,i,a);return{width:r,height:n,texelSizeX:l.texelSizeX,texelSizeY:l.texelSizeY,get read(){return l},set read(u){l=u},get write(){return g},set write(u){g=u},swap(){let u=l;l=g,g=u}}}function wr(r,n,t,o,i,a,l){let g=w(n,t,o,i,a,l);return or.bind(),e.uniform1i(or.uniforms.uTexture,r.attach(0)),v(g),g}function ar(r,n,t,o,i,a,l){return r.width===n&&r.height===t||(r.read=wr(r.read,n,t,o,i,a,l),r.write=w(n,t,o,i,a,l),r.width=n,r.height=t,r.texelSizeX=1/n,r.texelSizeY=1/t),r}function _r(){let r=[];m.SHADING&&r.push("SHADING"),B.setKeywords(r)}_r(),ir();let lr=Date.now(),O=0;function I(){const r=Lr();Ur()&&ir(),Br(r),Or(),Ir(r),Cr(null),requestAnimationFrame(I)}function Lr(){let r=Date.now(),n=(r-lr)/1e3;return n=Math.min(n,.016666),lr=r,n}function Ur(){let r=f(s.clientWidth),n=f(s.clientHeight);return s.width!==r||s.height!==n?(s.width=r,s.height=n,!0):!1}function Br(r){O+=r*m.COLOR_UPDATE_SPEED,O>=1&&(O=Wr(O,0,1),T.forEach(n=>{n.color=C()}))}function Or(){T.forEach(r=>{r.moved&&(r.moved=!1,Xr(r))})}function Ir(r){e.disable(e.BLEND),z.bind(),e.uniform2f(z.uniforms.texelSize,c.texelSizeX,c.texelSizeY),e.uniform1i(z.uniforms.uVelocity,c.read.attach(0)),v(X),A.bind(),e.uniform2f(A.uniforms.texelSize,c.texelSizeX,c.texelSizeY),e.uniform1i(A.uniforms.uVelocity,c.read.attach(0)),e.uniform1i(A.uniforms.uCurl,X.attach(1)),e.uniform1f(A.uniforms.curl,m.CURL),e.uniform1f(A.uniforms.dt,r),v(c.write),c.swap(),Y.bind(),e.uniform2f(Y.uniforms.texelSize,c.texelSizeX,c.texelSizeY),e.uniform1i(Y.uniforms.uVelocity,c.read.attach(0)),v(N),G.bind(),e.uniform1i(G.uniforms.uTexture,P.read.attach(0)),e.uniform1f(G.uniforms.value,m.PRESSURE),v(P.write),P.swap(),L.bind(),e.uniform2f(L.uniforms.texelSize,c.texelSizeX,c.texelSizeY),e.uniform1i(L.uniforms.uDivergence,N.attach(0));for(let t=0;t<m.PRESSURE_ITERATIONS;t++)e.uniform1i(L.uniforms.uPressure,P.read.attach(1)),v(P.write),P.swap();U.bind(),e.uniform2f(U.uniforms.texelSize,c.texelSizeX,c.texelSizeY),e.uniform1i(U.uniforms.uPressure,P.read.attach(0)),e.uniform1i(U.uniforms.uVelocity,c.read.attach(1)),v(c.write),c.swap(),x.bind(),e.uniform2f(x.uniforms.texelSize,c.texelSizeX,c.texelSizeY),y.supportLinearFiltering||e.uniform2f(x.uniforms.dyeTexelSize,c.texelSizeX,c.texelSizeY);let n=c.read.attach(0);e.uniform1i(x.uniforms.uVelocity,n),e.uniform1i(x.uniforms.uSource,n),e.uniform1f(x.uniforms.dt,r),e.uniform1f(x.uniforms.dissipation,m.VELOCITY_DISSIPATION),v(c.write),c.swap(),y.supportLinearFiltering||e.uniform2f(x.uniforms.dyeTexelSize,d.texelSizeX,d.texelSizeY),e.uniform1i(x.uniforms.uVelocity,c.read.attach(0)),e.uniform1i(x.uniforms.uSource,d.read.attach(1)),e.uniform1f(x.uniforms.dissipation,m.DENSITY_DISSIPATION),v(d.write),d.swap()}function Cr(r){e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.enable(e.BLEND),Nr(r)}function Nr(r){let n=e.drawingBufferWidth,t=e.drawingBufferHeight;B.bind(),m.SHADING&&e.uniform2f(B.uniforms.texelSize,1/n,1/t),e.uniform1i(B.uniforms.uTexture,d.read.attach(0)),v(r)}function Xr(r){let n=r.deltaX*m.SPLAT_FORCE,t=r.deltaY*m.SPLAT_FORCE;cr(r.texcoordX,r.texcoordY,n,t,r.color)}function Gr(r){const n=C();n.r*=10,n.g*=10,n.b*=10;let t=10*(Math.random()-.5),o=30*(Math.random()-.5);cr(r.texcoordX,r.texcoordY,t,o,n)}function cr(r,n,t,o,i){D.bind(),e.uniform1i(D.uniforms.uTarget,c.read.attach(0)),e.uniform1f(D.uniforms.aspectRatio,s.width/s.height),e.uniform2f(D.uniforms.point,r,n),e.uniform3f(D.uniforms.color,t,o,0),e.uniform1f(D.uniforms.radius,Yr(m.SPLAT_RADIUS/100)),v(c.write),c.swap(),e.uniform1i(D.uniforms.uTarget,d.read.attach(0)),e.uniform3f(D.uniforms.color,i.r,i.g,i.b),v(d.write),d.swap()}function Yr(r){let n=s.width/s.height;return n>1&&(r*=n),r}function V(r,n,t,o){r.id=n,r.down=!0,r.moved=!1,r.texcoordX=t/s.width,r.texcoordY=1-o/s.height,r.prevTexcoordX=r.texcoordX,r.prevTexcoordY=r.texcoordY,r.deltaX=0,r.deltaY=0,r.color=C()}function H(r,n,t,o){r.prevTexcoordX=r.texcoordX,r.prevTexcoordY=r.texcoordY,r.texcoordX=n/s.width,r.texcoordY=1-t/s.height,r.deltaX=Mr(r.texcoordX-r.prevTexcoordX),r.deltaY=Vr(r.texcoordY-r.prevTexcoordY),r.moved=Math.abs(r.deltaX)>0||Math.abs(r.deltaY)>0,r.color=o}function zr(r){r.down=!1}function Mr(r){let n=s.width/s.height;return n<1&&(r*=n),r}function Vr(r){let n=s.width/s.height;return n>1&&(r/=n),r}function C(){let r=Hr(Math.random(),1,1);return r.r*=.15,r.g*=.15,r.b*=.15,r}function Hr(r,n,t){let o,i,a,l,g,u,S,F;switch(l=Math.floor(r*6),g=r*6-l,u=t*(1-n),S=t*(1-g*n),F=t*(1-(1-g)*n),l%6){case 0:o=t,i=F,a=u;break;case 1:o=S,i=t,a=u;break;case 2:o=u,i=t,a=F;break;case 3:o=u,i=S,a=t;break;case 4:o=F,i=u,a=t;break;case 5:o=t,i=u,a=S;break}return{r:o,g:i,b:a}}function Wr(r,n,t){const o=t-n;return(r-n)%o+n}function sr(r){let n=e.drawingBufferWidth/e.drawingBufferHeight;n<1&&(n=1/n);const t=Math.round(r),o=Math.round(r*n);return e.drawingBufferWidth>e.drawingBufferHeight?{width:o,height:t}:{width:t,height:o}}function f(r){const n=window.devicePixelRatio||1;return Math.floor(r*n)}function kr(r){if(r.length===0)return 0;let n=0;for(let t=0;t<r.length;t++)n=(n<<5)-n+r.charCodeAt(t),n|=0;return n}window.addEventListener("mousedown",r=>{let n=T[0],t=f(r.clientX),o=f(r.clientY);V(n,-1,t,o),Gr(n)}),document.body.addEventListener("mousemove",function r(n){let t=T[0],o=f(n.clientX),i=f(n.clientY),a=C();I(),H(t,o,i,a),document.body.removeEventListener("mousemove",r)}),window.addEventListener("mousemove",r=>{let n=T[0],t=f(r.clientX),o=f(r.clientY),i=n.color;H(n,t,o,i)}),document.body.addEventListener("touchstart",function r(n){const t=n.targetTouches;let o=T[0];for(let i=0;i<t.length;i++){let a=f(t[i].clientX),l=f(t[i].clientY);I(),V(o,t[i].identifier,a,l)}document.body.removeEventListener("touchstart",r)}),window.addEventListener("touchstart",r=>{const n=r.targetTouches;let t=T[0];for(let o=0;o<n.length;o++){let i=f(n[o].clientX),a=f(n[o].clientY);V(t,n[o].identifier,i,a)}}),window.addEventListener("touchmove",r=>{const n=r.targetTouches;let t=T[0];for(let o=0;o<n.length;o++){let i=f(n[o].clientX),a=f(n[o].clientY);H(t,i,a,t.color)}},!1),window.addEventListener("touchend",r=>{const n=r.changedTouches;let t=T[0];for(let o=0;o<n.length;o++)zr(t)}),I()},[_,W,gr,k,K,q,j,$,J,Q,Z,rr,mr,fr]),p.jsx("div",{style:{position:"fixed",top:0,left:0,zIndex:50,pointerEvents:"none",width:"100%",height:"100%"},children:p.jsx("canvas",{ref:er,id:"fluid",style:{width:"100vw",height:"100vh",display:"block"}})})}const ee=`'use client';\r
import { useEffect, useRef } from 'react';\r
\r
function SplashCursor({\r
  SIM_RESOLUTION = 128,\r
  DYE_RESOLUTION = 1440,\r
  CAPTURE_RESOLUTION = 512,\r
  DENSITY_DISSIPATION = 3.5,\r
  VELOCITY_DISSIPATION = 2,\r
  PRESSURE = 0.1,\r
  PRESSURE_ITERATIONS = 20,\r
  CURL = 3,\r
  SPLAT_RADIUS = 0.2,\r
  SPLAT_FORCE = 6000,\r
  SHADING = true,\r
  COLOR_UPDATE_SPEED = 10,\r
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },\r
  TRANSPARENT = true\r
}) {\r
  const canvasRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    function pointerPrototype() {\r
      this.id = -1;\r
      this.texcoordX = 0;\r
      this.texcoordY = 0;\r
      this.prevTexcoordX = 0;\r
      this.prevTexcoordY = 0;\r
      this.deltaX = 0;\r
      this.deltaY = 0;\r
      this.down = false;\r
      this.moved = false;\r
      this.color = [0, 0, 0];\r
    }\r
\r
    let config = {\r
      SIM_RESOLUTION,\r
      DYE_RESOLUTION,\r
      CAPTURE_RESOLUTION,\r
      DENSITY_DISSIPATION,\r
      VELOCITY_DISSIPATION,\r
      PRESSURE,\r
      PRESSURE_ITERATIONS,\r
      CURL,\r
      SPLAT_RADIUS,\r
      SPLAT_FORCE,\r
      SHADING,\r
      COLOR_UPDATE_SPEED,\r
      PAUSED: false,\r
      BACK_COLOR,\r
      TRANSPARENT\r
    };\r
\r
    let pointers = [new pointerPrototype()];\r
\r
    const { gl, ext } = getWebGLContext(canvas);\r
    if (!ext.supportLinearFiltering) {\r
      config.DYE_RESOLUTION = 256;\r
      config.SHADING = false;\r
    }\r
\r
    function getWebGLContext(canvas) {\r
      const params = {\r
        alpha: true,\r
        depth: false,\r
        stencil: false,\r
        antialias: false,\r
        preserveDrawingBuffer: false\r
      };\r
      let gl = canvas.getContext('webgl2', params);\r
      const isWebGL2 = !!gl;\r
      if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);\r
\r
      let halfFloat;\r
      let supportLinearFiltering;\r
      if (isWebGL2) {\r
        gl.getExtension('EXT_color_buffer_float');\r
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');\r
      } else {\r
        halfFloat = gl.getExtension('OES_texture_half_float');\r
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');\r
      }\r
      gl.clearColor(0.0, 0.0, 0.0, 1.0);\r
\r
      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat && halfFloat.HALF_FLOAT_OES;\r
      let formatRGBA;\r
      let formatRG;\r
      let formatR;\r
\r
      if (isWebGL2) {\r
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);\r
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);\r
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);\r
      } else {\r
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
      }\r
\r
      return {\r
        gl,\r
        ext: {\r
          formatRGBA,\r
          formatRG,\r
          formatR,\r
          halfFloatTexType,\r
          supportLinearFiltering\r
        }\r
      };\r
    }\r
\r
    function getSupportedFormat(gl, internalFormat, format, type) {\r
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {\r
        switch (internalFormat) {\r
          case gl.R16F:\r
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);\r
          case gl.RG16F:\r
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);\r
          default:\r
            return null;\r
        }\r
      }\r
      return { internalFormat, format };\r
    }\r
\r
    function supportRenderTextureFormat(gl, internalFormat, format, type) {\r
      const texture = gl.createTexture();\r
      gl.bindTexture(gl.TEXTURE_2D, texture);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);\r
      const fbo = gl.createFramebuffer();\r
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);\r
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);\r
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);\r
      return status === gl.FRAMEBUFFER_COMPLETE;\r
    }\r
\r
    class Material {\r
      constructor(vertexShader, fragmentShaderSource) {\r
        this.vertexShader = vertexShader;\r
        this.fragmentShaderSource = fragmentShaderSource;\r
        this.programs = [];\r
        this.activeProgram = null;\r
        this.uniforms = [];\r
      }\r
      setKeywords(keywords) {\r
        let hash = 0;\r
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);\r
        let program = this.programs[hash];\r
        if (program == null) {\r
          let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);\r
          program = createProgram(this.vertexShader, fragmentShader);\r
          this.programs[hash] = program;\r
        }\r
        if (program === this.activeProgram) return;\r
        this.uniforms = getUniforms(program);\r
        this.activeProgram = program;\r
      }\r
      bind() {\r
        gl.useProgram(this.activeProgram);\r
      }\r
    }\r
\r
    class Program {\r
      constructor(vertexShader, fragmentShader) {\r
        this.uniforms = {};\r
        this.program = createProgram(vertexShader, fragmentShader);\r
        this.uniforms = getUniforms(this.program);\r
      }\r
      bind() {\r
        gl.useProgram(this.program);\r
      }\r
    }\r
\r
    function createProgram(vertexShader, fragmentShader) {\r
      let program = gl.createProgram();\r
      gl.attachShader(program, vertexShader);\r
      gl.attachShader(program, fragmentShader);\r
      gl.linkProgram(program);\r
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.trace(gl.getProgramInfoLog(program));\r
      return program;\r
    }\r
\r
    function getUniforms(program) {\r
      let uniforms = [];\r
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);\r
      for (let i = 0; i < uniformCount; i++) {\r
        let uniformName = gl.getActiveUniform(program, i).name;\r
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);\r
      }\r
      return uniforms;\r
    }\r
\r
    function compileShader(type, source, keywords) {\r
      source = addKeywords(source, keywords);\r
      const shader = gl.createShader(type);\r
      gl.shaderSource(shader, source);\r
      gl.compileShader(shader);\r
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.trace(gl.getShaderInfoLog(shader));\r
      return shader;\r
    }\r
\r
    function addKeywords(source, keywords) {\r
      if (!keywords) return source;\r
      let keywordsString = '';\r
      keywords.forEach(keyword => {\r
        keywordsString += '#define ' + keyword + '\\n';\r
      });\r
      return keywordsString + source;\r
    }\r
\r
    const baseVertexShader = compileShader(\r
      gl.VERTEX_SHADER,\r
      \`\r
        precision highp float;\r
        attribute vec2 aPosition;\r
        varying vec2 vUv;\r
        varying vec2 vL;\r
        varying vec2 vR;\r
        varying vec2 vT;\r
        varying vec2 vB;\r
        uniform vec2 texelSize;\r
\r
        void main () {\r
            vUv = aPosition * 0.5 + 0.5;\r
            vL = vUv - vec2(texelSize.x, 0.0);\r
            vR = vUv + vec2(texelSize.x, 0.0);\r
            vT = vUv + vec2(0.0, texelSize.y);\r
            vB = vUv - vec2(0.0, texelSize.y);\r
            gl_Position = vec4(aPosition, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const copyShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        uniform sampler2D uTexture;\r
\r
        void main () {\r
            gl_FragColor = texture2D(uTexture, vUv);\r
        }\r
      \`\r
    );\r
\r
    const clearShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        uniform sampler2D uTexture;\r
        uniform float value;\r
\r
        void main () {\r
            gl_FragColor = value * texture2D(uTexture, vUv);\r
        }\r
      \`\r
    );\r
\r
    const displayShaderSource = \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      varying vec2 vL;\r
      varying vec2 vR;\r
      varying vec2 vT;\r
      varying vec2 vB;\r
      uniform sampler2D uTexture;\r
      uniform sampler2D uDithering;\r
      uniform vec2 ditherScale;\r
      uniform vec2 texelSize;\r
\r
      vec3 linearToGamma (vec3 color) {\r
          color = max(color, vec3(0));\r
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\r
      }\r
\r
      void main () {\r
          vec3 c = texture2D(uTexture, vUv).rgb;\r
          #ifdef SHADING\r
              vec3 lc = texture2D(uTexture, vL).rgb;\r
              vec3 rc = texture2D(uTexture, vR).rgb;\r
              vec3 tc = texture2D(uTexture, vT).rgb;\r
              vec3 bc = texture2D(uTexture, vB).rgb;\r
\r
              float dx = length(rc) - length(lc);\r
              float dy = length(tc) - length(bc);\r
\r
              vec3 n = normalize(vec3(dx, dy, length(texelSize)));\r
              vec3 l = vec3(0.0, 0.0, 1.0);\r
\r
              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\r
              c *= diffuse;\r
          #endif\r
\r
          float a = max(c.r, max(c.g, c.b));\r
          gl_FragColor = vec4(c, a);\r
      }\r
    \`;\r
\r
    const splatShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision highp float;\r
        precision highp sampler2D;\r
        varying vec2 vUv;\r
        uniform sampler2D uTarget;\r
        uniform float aspectRatio;\r
        uniform vec3 color;\r
        uniform vec2 point;\r
        uniform float radius;\r
\r
        void main () {\r
            vec2 p = vUv - point.xy;\r
            p.x *= aspectRatio;\r
            vec3 splat = exp(-dot(p, p) / radius) * color;\r
            vec3 base = texture2D(uTarget, vUv).xyz;\r
            gl_FragColor = vec4(base + splat, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const advectionShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision highp float;\r
        precision highp sampler2D;\r
        varying vec2 vUv;\r
        uniform sampler2D uVelocity;\r
        uniform sampler2D uSource;\r
        uniform vec2 texelSize;\r
        uniform vec2 dyeTexelSize;\r
        uniform float dt;\r
        uniform float dissipation;\r
\r
        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\r
            vec2 st = uv / tsize - 0.5;\r
            vec2 iuv = floor(st);\r
            vec2 fuv = fract(st);\r
\r
            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\r
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\r
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\r
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\r
\r
            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\r
        }\r
\r
        void main () {\r
            #ifdef MANUAL_FILTERING\r
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\r
                vec4 result = bilerp(uSource, coord, dyeTexelSize);\r
            #else\r
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\r
                vec4 result = texture2D(uSource, coord);\r
            #endif\r
            float decay = 1.0 + dissipation * dt;\r
            gl_FragColor = result / decay;\r
        }\r
      \`,\r
      ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']\r
    );\r
\r
    const divergenceShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        varying highp vec2 vL;\r
        varying highp vec2 vR;\r
        varying highp vec2 vT;\r
        varying highp vec2 vB;\r
        uniform sampler2D uVelocity;\r
\r
        void main () {\r
            float L = texture2D(uVelocity, vL).x;\r
            float R = texture2D(uVelocity, vR).x;\r
            float T = texture2D(uVelocity, vT).y;\r
            float B = texture2D(uVelocity, vB).y;\r
\r
            vec2 C = texture2D(uVelocity, vUv).xy;\r
            if (vL.x < 0.0) { L = -C.x; }\r
            if (vR.x > 1.0) { R = -C.x; }\r
            if (vT.y > 1.0) { T = -C.y; }\r
            if (vB.y < 0.0) { B = -C.y; }\r
\r
            float div = 0.5 * (R - L + T - B);\r
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const curlShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        varying highp vec2 vL;\r
        varying highp vec2 vR;\r
        varying highp vec2 vT;\r
        varying highp vec2 vB;\r
        uniform sampler2D uVelocity;\r
\r
        void main () {\r
            float L = texture2D(uVelocity, vL).y;\r
            float R = texture2D(uVelocity, vR).y;\r
            float T = texture2D(uVelocity, vT).x;\r
            float B = texture2D(uVelocity, vB).x;\r
            float vorticity = R - L - T + B;\r
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const vorticityShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision highp float;\r
        precision highp sampler2D;\r
        varying vec2 vUv;\r
        varying vec2 vL;\r
        varying vec2 vR;\r
        varying vec2 vT;\r
        varying vec2 vB;\r
        uniform sampler2D uVelocity;\r
        uniform sampler2D uCurl;\r
        uniform float curl;\r
        uniform float dt;\r
\r
        void main () {\r
            float L = texture2D(uCurl, vL).x;\r
            float R = texture2D(uCurl, vR).x;\r
            float T = texture2D(uCurl, vT).x;\r
            float B = texture2D(uCurl, vB).x;\r
            float C = texture2D(uCurl, vUv).x;\r
\r
            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\r
            force /= length(force) + 0.0001;\r
            force *= curl * C;\r
            force.y *= -1.0;\r
\r
            vec2 velocity = texture2D(uVelocity, vUv).xy;\r
            velocity += force * dt;\r
            velocity = min(max(velocity, -1000.0), 1000.0);\r
            gl_FragColor = vec4(velocity, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const pressureShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        varying highp vec2 vL;\r
        varying highp vec2 vR;\r
        varying highp vec2 vT;\r
        varying highp vec2 vB;\r
        uniform sampler2D uPressure;\r
        uniform sampler2D uDivergence;\r
\r
        void main () {\r
            float L = texture2D(uPressure, vL).x;\r
            float R = texture2D(uPressure, vR).x;\r
            float T = texture2D(uPressure, vT).x;\r
            float B = texture2D(uPressure, vB).x;\r
            float C = texture2D(uPressure, vUv).x;\r
            float divergence = texture2D(uDivergence, vUv).x;\r
            float pressure = (L + R + B + T - divergence) * 0.25;\r
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const gradientSubtractShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        varying highp vec2 vL;\r
        varying highp vec2 vR;\r
        varying highp vec2 vT;\r
        varying highp vec2 vB;\r
        uniform sampler2D uPressure;\r
        uniform sampler2D uVelocity;\r
\r
        void main () {\r
            float L = texture2D(uPressure, vL).x;\r
            float R = texture2D(uPressure, vR).x;\r
            float T = texture2D(uPressure, vT).x;\r
            float B = texture2D(uPressure, vB).x;\r
            vec2 velocity = texture2D(uVelocity, vUv).xy;\r
            velocity.xy -= vec2(R - L, T - B);\r
            gl_FragColor = vec4(velocity, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const blit = (() => {\r
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());\r
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);\r
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());\r
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);\r
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);\r
      gl.enableVertexAttribArray(0);\r
      return (target, clear = false) => {\r
        if (target == null) {\r
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);\r
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);\r
        } else {\r
          gl.viewport(0, 0, target.width, target.height);\r
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);\r
        }\r
        if (clear) {\r
          gl.clearColor(0.0, 0.0, 0.0, 1.0);\r
          gl.clear(gl.COLOR_BUFFER_BIT);\r
        }\r
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);\r
      };\r
    })();\r
\r
    let dye, velocity, divergence, curl, pressure;\r
\r
    const copyProgram = new Program(baseVertexShader, copyShader);\r
    const clearProgram = new Program(baseVertexShader, clearShader);\r
    const splatProgram = new Program(baseVertexShader, splatShader);\r
    const advectionProgram = new Program(baseVertexShader, advectionShader);\r
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);\r
    const curlProgram = new Program(baseVertexShader, curlShader);\r
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);\r
    const pressureProgram = new Program(baseVertexShader, pressureShader);\r
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);\r
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);\r
\r
    function initFramebuffers() {\r
      let simRes = getResolution(config.SIM_RESOLUTION);\r
      let dyeRes = getResolution(config.DYE_RESOLUTION);\r
      const texType = ext.halfFloatTexType;\r
      const rgba = ext.formatRGBA;\r
      const rg = ext.formatRG;\r
      const r = ext.formatR;\r
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;\r
      gl.disable(gl.BLEND);\r
\r
      if (!dye)\r
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);\r
      else\r
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);\r
\r
      if (!velocity)\r
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);\r
      else\r
        velocity = resizeDoubleFBO(\r
          velocity,\r
          simRes.width,\r
          simRes.height,\r
          rg.internalFormat,\r
          rg.format,\r
          texType,\r
          filtering\r
        );\r
\r
      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
    }\r
\r
    function createFBO(w, h, internalFormat, format, type, param) {\r
      gl.activeTexture(gl.TEXTURE0);\r
      let texture = gl.createTexture();\r
      gl.bindTexture(gl.TEXTURE_2D, texture);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);\r
\r
      let fbo = gl.createFramebuffer();\r
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);\r
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);\r
      gl.viewport(0, 0, w, h);\r
      gl.clear(gl.COLOR_BUFFER_BIT);\r
\r
      let texelSizeX = 1.0 / w;\r
      let texelSizeY = 1.0 / h;\r
      return {\r
        texture,\r
        fbo,\r
        width: w,\r
        height: h,\r
        texelSizeX,\r
        texelSizeY,\r
        attach(id) {\r
          gl.activeTexture(gl.TEXTURE0 + id);\r
          gl.bindTexture(gl.TEXTURE_2D, texture);\r
          return id;\r
        }\r
      };\r
    }\r
\r
    function createDoubleFBO(w, h, internalFormat, format, type, param) {\r
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);\r
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);\r
      return {\r
        width: w,\r
        height: h,\r
        texelSizeX: fbo1.texelSizeX,\r
        texelSizeY: fbo1.texelSizeY,\r
        get read() {\r
          return fbo1;\r
        },\r
        set read(value) {\r
          fbo1 = value;\r
        },\r
        get write() {\r
          return fbo2;\r
        },\r
        set write(value) {\r
          fbo2 = value;\r
        },\r
        swap() {\r
          let temp = fbo1;\r
          fbo1 = fbo2;\r
          fbo2 = temp;\r
        }\r
      };\r
    }\r
\r
    function resizeFBO(target, w, h, internalFormat, format, type, param) {\r
      let newFBO = createFBO(w, h, internalFormat, format, type, param);\r
      copyProgram.bind();\r
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));\r
      blit(newFBO);\r
      return newFBO;\r
    }\r
\r
    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {\r
      if (target.width === w && target.height === h) return target;\r
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);\r
      target.write = createFBO(w, h, internalFormat, format, type, param);\r
      target.width = w;\r
      target.height = h;\r
      target.texelSizeX = 1.0 / w;\r
      target.texelSizeY = 1.0 / h;\r
      return target;\r
    }\r
\r
    function updateKeywords() {\r
      let displayKeywords = [];\r
      if (config.SHADING) displayKeywords.push('SHADING');\r
      displayMaterial.setKeywords(displayKeywords);\r
    }\r
\r
    updateKeywords();\r
    initFramebuffers();\r
    let lastUpdateTime = Date.now();\r
    let colorUpdateTimer = 0.0;\r
\r
    function updateFrame() {\r
      const dt = calcDeltaTime();\r
      if (resizeCanvas()) initFramebuffers();\r
      updateColors(dt);\r
      applyInputs();\r
      step(dt);\r
      render(null);\r
      requestAnimationFrame(updateFrame);\r
    }\r
\r
    function calcDeltaTime() {\r
      let now = Date.now();\r
      let dt = (now - lastUpdateTime) / 1000;\r
      dt = Math.min(dt, 0.016666);\r
      lastUpdateTime = now;\r
      return dt;\r
    }\r
\r
    function resizeCanvas() {\r
      let width = scaleByPixelRatio(canvas.clientWidth);\r
      let height = scaleByPixelRatio(canvas.clientHeight);\r
      if (canvas.width !== width || canvas.height !== height) {\r
        canvas.width = width;\r
        canvas.height = height;\r
        return true;\r
      }\r
      return false;\r
    }\r
\r
    function updateColors(dt) {\r
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;\r
      if (colorUpdateTimer >= 1) {\r
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);\r
        pointers.forEach(p => {\r
          p.color = generateColor();\r
        });\r
      }\r
    }\r
\r
    function applyInputs() {\r
      pointers.forEach(p => {\r
        if (p.moved) {\r
          p.moved = false;\r
          splatPointer(p);\r
        }\r
      });\r
    }\r
\r
    function step(dt) {\r
      gl.disable(gl.BLEND);\r
      curlProgram.bind();\r
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      blit(curl);\r
\r
      vorticityProgram.bind();\r
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));\r
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);\r
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      divergenceProgram.bind();\r
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      blit(divergence);\r
\r
      clearProgram.bind();\r
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));\r
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);\r
      blit(pressure.write);\r
      pressure.swap();\r
\r
      pressureProgram.bind();\r
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));\r
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {\r
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));\r
        blit(pressure.write);\r
        pressure.swap();\r
      }\r
\r
      gradienSubtractProgram.bind();\r
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));\r
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      advectionProgram.bind();\r
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      if (!ext.supportLinearFiltering)\r
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      let velocityId = velocity.read.attach(0);\r
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);\r
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);\r
      gl.uniform1f(advectionProgram.uniforms.dt, dt);\r
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      if (!ext.supportLinearFiltering)\r
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);\r
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));\r
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);\r
      blit(dye.write);\r
      dye.swap();\r
    }\r
\r
    function render(target) {\r
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);\r
      gl.enable(gl.BLEND);\r
      drawDisplay(target);\r
    }\r
\r
    function drawDisplay(target) {\r
      let width = target == null ? gl.drawingBufferWidth : target.width;\r
      let height = target == null ? gl.drawingBufferHeight : target.height;\r
      displayMaterial.bind();\r
      if (config.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);\r
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));\r
      blit(target);\r
    }\r
\r
    function splatPointer(pointer) {\r
      let dx = pointer.deltaX * config.SPLAT_FORCE;\r
      let dy = pointer.deltaY * config.SPLAT_FORCE;\r
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);\r
    }\r
\r
    function clickSplat(pointer) {\r
      const color = generateColor();\r
      color.r *= 10.0;\r
      color.g *= 10.0;\r
      color.b *= 10.0;\r
      let dx = 10 * (Math.random() - 0.5);\r
      let dy = 30 * (Math.random() - 0.5);\r
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);\r
    }\r
\r
    function splat(x, y, dx, dy, color) {\r
      splatProgram.bind();\r
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));\r
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);\r
      gl.uniform2f(splatProgram.uniforms.point, x, y);\r
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);\r
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));\r
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);\r
      blit(dye.write);\r
      dye.swap();\r
    }\r
\r
    function correctRadius(radius) {\r
      let aspectRatio = canvas.width / canvas.height;\r
      if (aspectRatio > 1) radius *= aspectRatio;\r
      return radius;\r
    }\r
\r
    function updatePointerDownData(pointer, id, posX, posY) {\r
      pointer.id = id;\r
      pointer.down = true;\r
      pointer.moved = false;\r
      pointer.texcoordX = posX / canvas.width;\r
      pointer.texcoordY = 1.0 - posY / canvas.height;\r
      pointer.prevTexcoordX = pointer.texcoordX;\r
      pointer.prevTexcoordY = pointer.texcoordY;\r
      pointer.deltaX = 0;\r
      pointer.deltaY = 0;\r
      pointer.color = generateColor();\r
    }\r
\r
    function updatePointerMoveData(pointer, posX, posY, color) {\r
      pointer.prevTexcoordX = pointer.texcoordX;\r
      pointer.prevTexcoordY = pointer.texcoordY;\r
      pointer.texcoordX = posX / canvas.width;\r
      pointer.texcoordY = 1.0 - posY / canvas.height;\r
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);\r
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);\r
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;\r
      pointer.color = color;\r
    }\r
\r
    function updatePointerUpData(pointer) {\r
      pointer.down = false;\r
    }\r
\r
    function correctDeltaX(delta) {\r
      let aspectRatio = canvas.width / canvas.height;\r
      if (aspectRatio < 1) delta *= aspectRatio;\r
      return delta;\r
    }\r
\r
    function correctDeltaY(delta) {\r
      let aspectRatio = canvas.width / canvas.height;\r
      if (aspectRatio > 1) delta /= aspectRatio;\r
      return delta;\r
    }\r
\r
    function generateColor() {\r
      let c = HSVtoRGB(Math.random(), 1.0, 1.0);\r
      c.r *= 0.15;\r
      c.g *= 0.15;\r
      c.b *= 0.15;\r
      return c;\r
    }\r
\r
    function HSVtoRGB(h, s, v) {\r
      let r, g, b, i, f, p, q, t;\r
      i = Math.floor(h * 6);\r
      f = h * 6 - i;\r
      p = v * (1 - s);\r
      q = v * (1 - f * s);\r
      t = v * (1 - (1 - f) * s);\r
      switch (i % 6) {\r
        case 0:\r
          r = v;\r
          g = t;\r
          b = p;\r
          break;\r
        case 1:\r
          r = q;\r
          g = v;\r
          b = p;\r
          break;\r
        case 2:\r
          r = p;\r
          g = v;\r
          b = t;\r
          break;\r
        case 3:\r
          r = p;\r
          g = q;\r
          b = v;\r
          break;\r
        case 4:\r
          r = t;\r
          g = p;\r
          b = v;\r
          break;\r
        case 5:\r
          r = v;\r
          g = p;\r
          b = q;\r
          break;\r
        default:\r
          break;\r
      }\r
      return { r, g, b };\r
    }\r
\r
    function wrap(value, min, max) {\r
      const range = max - min;\r
      if (range === 0) return min;\r
      return ((value - min) % range) + min;\r
    }\r
\r
    function getResolution(resolution) {\r
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;\r
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;\r
      const min = Math.round(resolution);\r
      const max = Math.round(resolution * aspectRatio);\r
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };\r
      else return { width: min, height: max };\r
    }\r
\r
    function scaleByPixelRatio(input) {\r
      const pixelRatio = window.devicePixelRatio || 1;\r
      return Math.floor(input * pixelRatio);\r
    }\r
\r
    function hashCode(s) {\r
      if (s.length === 0) return 0;\r
      let hash = 0;\r
      for (let i = 0; i < s.length; i++) {\r
        hash = (hash << 5) - hash + s.charCodeAt(i);\r
        hash |= 0;\r
      }\r
      return hash;\r
    }\r
\r
    window.addEventListener('mousedown', e => {\r
      let pointer = pointers[0];\r
      let posX = scaleByPixelRatio(e.clientX);\r
      let posY = scaleByPixelRatio(e.clientY);\r
      updatePointerDownData(pointer, -1, posX, posY);\r
      clickSplat(pointer);\r
    });\r
\r
    document.body.addEventListener('mousemove', function handleFirstMouseMove(e) {\r
      let pointer = pointers[0];\r
      let posX = scaleByPixelRatio(e.clientX);\r
      let posY = scaleByPixelRatio(e.clientY);\r
      let color = generateColor();\r
      updateFrame();\r
      updatePointerMoveData(pointer, posX, posY, color);\r
      document.body.removeEventListener('mousemove', handleFirstMouseMove);\r
    });\r
\r
    window.addEventListener('mousemove', e => {\r
      let pointer = pointers[0];\r
      let posX = scaleByPixelRatio(e.clientX);\r
      let posY = scaleByPixelRatio(e.clientY);\r
      let color = pointer.color;\r
      updatePointerMoveData(pointer, posX, posY, color);\r
    });\r
\r
    document.body.addEventListener('touchstart', function handleFirstTouchStart(e) {\r
      const touches = e.targetTouches;\r
      let pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        let posX = scaleByPixelRatio(touches[i].clientX);\r
        let posY = scaleByPixelRatio(touches[i].clientY);\r
        updateFrame();\r
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);\r
      }\r
      document.body.removeEventListener('touchstart', handleFirstTouchStart);\r
    });\r
\r
    window.addEventListener('touchstart', e => {\r
      const touches = e.targetTouches;\r
      let pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        let posX = scaleByPixelRatio(touches[i].clientX);\r
        let posY = scaleByPixelRatio(touches[i].clientY);\r
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);\r
      }\r
    });\r
\r
    window.addEventListener(\r
      'touchmove',\r
      e => {\r
        const touches = e.targetTouches;\r
        let pointer = pointers[0];\r
        for (let i = 0; i < touches.length; i++) {\r
          let posX = scaleByPixelRatio(touches[i].clientX);\r
          let posY = scaleByPixelRatio(touches[i].clientY);\r
          updatePointerMoveData(pointer, posX, posY, pointer.color);\r
        }\r
      },\r
      false\r
    );\r
\r
    window.addEventListener('touchend', e => {\r
      const touches = e.changedTouches;\r
      let pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        updatePointerUpData(pointer);\r
      }\r
    });\r
\r
    updateFrame();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    SIM_RESOLUTION,\r
    DYE_RESOLUTION,\r
    CAPTURE_RESOLUTION,\r
    DENSITY_DISSIPATION,\r
    VELOCITY_DISSIPATION,\r
    PRESSURE,\r
    PRESSURE_ITERATIONS,\r
    CURL,\r
    SPLAT_RADIUS,\r
    SPLAT_FORCE,\r
    SHADING,\r
    COLOR_UPDATE_SPEED,\r
    BACK_COLOR,\r
    TRANSPARENT\r
  ]);\r
\r
  return (\r
    <div\r
      style={{\r
        position: 'fixed',\r
        top: 0,\r
        left: 0,\r
        zIndex: 50,\r
        pointerEvents: 'none',\r
        width: '100%',\r
        height: '100%'\r
      }}\r
    >\r
      <canvas\r
        ref={canvasRef}\r
        id="fluid"\r
        style={{\r
          width: '100vw',\r
          height: '100vh',\r
          display: 'block'\r
        }}\r
      />\r
    </div>\r
  );\r
}\r
\r
export default SplashCursor;\r
`,ne=`'use client';\r
import { useEffect, useRef } from 'react';\r
\r
function SplashCursor({\r
  SIM_RESOLUTION = 128,\r
  DYE_RESOLUTION = 1440,\r
  CAPTURE_RESOLUTION = 512,\r
  DENSITY_DISSIPATION = 3.5,\r
  VELOCITY_DISSIPATION = 2,\r
  PRESSURE = 0.1,\r
  PRESSURE_ITERATIONS = 20,\r
  CURL = 3,\r
  SPLAT_RADIUS = 0.2,\r
  SPLAT_FORCE = 6000,\r
  SHADING = true,\r
  COLOR_UPDATE_SPEED = 10,\r
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },\r
  TRANSPARENT = true\r
}) {\r
  const canvasRef = useRef(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    function pointerPrototype() {\r
      this.id = -1;\r
      this.texcoordX = 0;\r
      this.texcoordY = 0;\r
      this.prevTexcoordX = 0;\r
      this.prevTexcoordY = 0;\r
      this.deltaX = 0;\r
      this.deltaY = 0;\r
      this.down = false;\r
      this.moved = false;\r
      this.color = [0, 0, 0];\r
    }\r
\r
    let config = {\r
      SIM_RESOLUTION,\r
      DYE_RESOLUTION,\r
      CAPTURE_RESOLUTION,\r
      DENSITY_DISSIPATION,\r
      VELOCITY_DISSIPATION,\r
      PRESSURE,\r
      PRESSURE_ITERATIONS,\r
      CURL,\r
      SPLAT_RADIUS,\r
      SPLAT_FORCE,\r
      SHADING,\r
      COLOR_UPDATE_SPEED,\r
      PAUSED: false,\r
      BACK_COLOR,\r
      TRANSPARENT\r
    };\r
\r
    let pointers = [new pointerPrototype()];\r
\r
    const { gl, ext } = getWebGLContext(canvas);\r
    if (!ext.supportLinearFiltering) {\r
      config.DYE_RESOLUTION = 256;\r
      config.SHADING = false;\r
    }\r
\r
    function getWebGLContext(canvas) {\r
      const params = {\r
        alpha: true,\r
        depth: false,\r
        stencil: false,\r
        antialias: false,\r
        preserveDrawingBuffer: false\r
      };\r
      let gl = canvas.getContext('webgl2', params);\r
      const isWebGL2 = !!gl;\r
      if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);\r
      let halfFloat;\r
      let supportLinearFiltering;\r
      if (isWebGL2) {\r
        gl.getExtension('EXT_color_buffer_float');\r
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');\r
      } else {\r
        halfFloat = gl.getExtension('OES_texture_half_float');\r
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');\r
      }\r
      gl.clearColor(0.0, 0.0, 0.0, 1.0);\r
      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat && halfFloat.HALF_FLOAT_OES;\r
      let formatRGBA;\r
      let formatRG;\r
      let formatR;\r
\r
      if (isWebGL2) {\r
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);\r
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);\r
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);\r
      } else {\r
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
      }\r
\r
      return {\r
        gl,\r
        ext: {\r
          formatRGBA,\r
          formatRG,\r
          formatR,\r
          halfFloatTexType,\r
          supportLinearFiltering\r
        }\r
      };\r
    }\r
\r
    function getSupportedFormat(gl, internalFormat, format, type) {\r
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {\r
        switch (internalFormat) {\r
          case gl.R16F:\r
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);\r
          case gl.RG16F:\r
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);\r
          default:\r
            return null;\r
        }\r
      }\r
      return {\r
        internalFormat,\r
        format\r
      };\r
    }\r
\r
    function supportRenderTextureFormat(gl, internalFormat, format, type) {\r
      const texture = gl.createTexture();\r
      gl.bindTexture(gl.TEXTURE_2D, texture);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);\r
      const fbo = gl.createFramebuffer();\r
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);\r
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);\r
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);\r
      return status === gl.FRAMEBUFFER_COMPLETE;\r
    }\r
\r
    class Material {\r
      constructor(vertexShader, fragmentShaderSource) {\r
        this.vertexShader = vertexShader;\r
        this.fragmentShaderSource = fragmentShaderSource;\r
        this.programs = [];\r
        this.activeProgram = null;\r
        this.uniforms = [];\r
      }\r
      setKeywords(keywords) {\r
        let hash = 0;\r
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);\r
        let program = this.programs[hash];\r
        if (program == null) {\r
          let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);\r
          program = createProgram(this.vertexShader, fragmentShader);\r
          this.programs[hash] = program;\r
        }\r
        if (program === this.activeProgram) return;\r
        this.uniforms = getUniforms(program);\r
        this.activeProgram = program;\r
      }\r
      bind() {\r
        gl.useProgram(this.activeProgram);\r
      }\r
    }\r
\r
    class Program {\r
      constructor(vertexShader, fragmentShader) {\r
        this.uniforms = {};\r
        this.program = createProgram(vertexShader, fragmentShader);\r
        this.uniforms = getUniforms(this.program);\r
      }\r
      bind() {\r
        gl.useProgram(this.program);\r
      }\r
    }\r
\r
    function createProgram(vertexShader, fragmentShader) {\r
      let program = gl.createProgram();\r
      gl.attachShader(program, vertexShader);\r
      gl.attachShader(program, fragmentShader);\r
      gl.linkProgram(program);\r
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.trace(gl.getProgramInfoLog(program));\r
      return program;\r
    }\r
\r
    function getUniforms(program) {\r
      let uniforms = [];\r
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);\r
      for (let i = 0; i < uniformCount; i++) {\r
        let uniformName = gl.getActiveUniform(program, i).name;\r
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);\r
      }\r
      return uniforms;\r
    }\r
\r
    function compileShader(type, source, keywords) {\r
      source = addKeywords(source, keywords);\r
      const shader = gl.createShader(type);\r
      gl.shaderSource(shader, source);\r
      gl.compileShader(shader);\r
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.trace(gl.getShaderInfoLog(shader));\r
      return shader;\r
    }\r
\r
    function addKeywords(source, keywords) {\r
      if (!keywords) return source;\r
      let keywordsString = '';\r
      keywords.forEach(keyword => {\r
        keywordsString += '#define ' + keyword + '\\n';\r
      });\r
      return keywordsString + source;\r
    }\r
\r
    const baseVertexShader = compileShader(\r
      gl.VERTEX_SHADER,\r
      \`\r
        precision highp float;\r
        attribute vec2 aPosition;\r
        varying vec2 vUv;\r
        varying vec2 vL;\r
        varying vec2 vR;\r
        varying vec2 vT;\r
        varying vec2 vB;\r
        uniform vec2 texelSize;\r
\r
        void main () {\r
            vUv = aPosition * 0.5 + 0.5;\r
            vL = vUv - vec2(texelSize.x, 0.0);\r
            vR = vUv + vec2(texelSize.x, 0.0);\r
            vT = vUv + vec2(0.0, texelSize.y);\r
            vB = vUv - vec2(0.0, texelSize.y);\r
            gl_Position = vec4(aPosition, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const copyShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        uniform sampler2D uTexture;\r
\r
        void main () {\r
            gl_FragColor = texture2D(uTexture, vUv);\r
        }\r
      \`\r
    );\r
\r
    const clearShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        uniform sampler2D uTexture;\r
        uniform float value;\r
\r
        void main () {\r
            gl_FragColor = value * texture2D(uTexture, vUv);\r
        }\r
     \`\r
    );\r
\r
    const displayShaderSource = \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      varying vec2 vL;\r
      varying vec2 vR;\r
      varying vec2 vT;\r
      varying vec2 vB;\r
      uniform sampler2D uTexture;\r
      uniform sampler2D uDithering;\r
      uniform vec2 ditherScale;\r
      uniform vec2 texelSize;\r
\r
      vec3 linearToGamma (vec3 color) {\r
          color = max(color, vec3(0));\r
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\r
      }\r
\r
      void main () {\r
          vec3 c = texture2D(uTexture, vUv).rgb;\r
          #ifdef SHADING\r
              vec3 lc = texture2D(uTexture, vL).rgb;\r
              vec3 rc = texture2D(uTexture, vR).rgb;\r
              vec3 tc = texture2D(uTexture, vT).rgb;\r
              vec3 bc = texture2D(uTexture, vB).rgb;\r
\r
              float dx = length(rc) - length(lc);\r
              float dy = length(tc) - length(bc);\r
\r
              vec3 n = normalize(vec3(dx, dy, length(texelSize)));\r
              vec3 l = vec3(0.0, 0.0, 1.0);\r
\r
              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\r
              c *= diffuse;\r
          #endif\r
\r
          float a = max(c.r, max(c.g, c.b));\r
          gl_FragColor = vec4(c, a);\r
      }\r
    \`;\r
\r
    const splatShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision highp float;\r
        precision highp sampler2D;\r
        varying vec2 vUv;\r
        uniform sampler2D uTarget;\r
        uniform float aspectRatio;\r
        uniform vec3 color;\r
        uniform vec2 point;\r
        uniform float radius;\r
\r
        void main () {\r
            vec2 p = vUv - point.xy;\r
            p.x *= aspectRatio;\r
            vec3 splat = exp(-dot(p, p) / radius) * color;\r
            vec3 base = texture2D(uTarget, vUv).xyz;\r
            gl_FragColor = vec4(base + splat, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const advectionShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision highp float;\r
        precision highp sampler2D;\r
        varying vec2 vUv;\r
        uniform sampler2D uVelocity;\r
        uniform sampler2D uSource;\r
        uniform vec2 texelSize;\r
        uniform vec2 dyeTexelSize;\r
        uniform float dt;\r
        uniform float dissipation;\r
\r
        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\r
            vec2 st = uv / tsize - 0.5;\r
            vec2 iuv = floor(st);\r
            vec2 fuv = fract(st);\r
\r
            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\r
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\r
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\r
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\r
\r
            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\r
        }\r
\r
        void main () {\r
            #ifdef MANUAL_FILTERING\r
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\r
                vec4 result = bilerp(uSource, coord, dyeTexelSize);\r
            #else\r
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\r
                vec4 result = texture2D(uSource, coord);\r
            #endif\r
            float decay = 1.0 + dissipation * dt;\r
            gl_FragColor = result / decay;\r
        }\r
      \`,\r
      ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']\r
    );\r
\r
    const divergenceShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        varying highp vec2 vL;\r
        varying highp vec2 vR;\r
        varying highp vec2 vT;\r
        varying highp vec2 vB;\r
        uniform sampler2D uVelocity;\r
\r
        void main () {\r
            float L = texture2D(uVelocity, vL).x;\r
            float R = texture2D(uVelocity, vR).x;\r
            float T = texture2D(uVelocity, vT).y;\r
            float B = texture2D(uVelocity, vB).y;\r
\r
            vec2 C = texture2D(uVelocity, vUv).xy;\r
            if (vL.x < 0.0) { L = -C.x; }\r
            if (vR.x > 1.0) { R = -C.x; }\r
            if (vT.y > 1.0) { T = -C.y; }\r
            if (vB.y < 0.0) { B = -C.y; }\r
\r
            float div = 0.5 * (R - L + T - B);\r
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const curlShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        varying highp vec2 vL;\r
        varying highp vec2 vR;\r
        varying highp vec2 vT;\r
        varying highp vec2 vB;\r
        uniform sampler2D uVelocity;\r
\r
        void main () {\r
            float L = texture2D(uVelocity, vL).y;\r
            float R = texture2D(uVelocity, vR).y;\r
            float T = texture2D(uVelocity, vT).x;\r
            float B = texture2D(uVelocity, vB).x;\r
            float vorticity = R - L - T + B;\r
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const vorticityShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision highp float;\r
        precision highp sampler2D;\r
        varying vec2 vUv;\r
        varying vec2 vL;\r
        varying vec2 vR;\r
        varying vec2 vT;\r
        varying vec2 vB;\r
        uniform sampler2D uVelocity;\r
        uniform sampler2D uCurl;\r
        uniform float curl;\r
        uniform float dt;\r
\r
        void main () {\r
            float L = texture2D(uCurl, vL).x;\r
            float R = texture2D(uCurl, vR).x;\r
            float T = texture2D(uCurl, vT).x;\r
            float B = texture2D(uCurl, vB).x;\r
            float C = texture2D(uCurl, vUv).x;\r
\r
            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\r
            force /= length(force) + 0.0001;\r
            force *= curl * C;\r
            force.y *= -1.0;\r
\r
            vec2 velocity = texture2D(uVelocity, vUv).xy;\r
            velocity += force * dt;\r
            velocity = min(max(velocity, -1000.0), 1000.0);\r
            gl_FragColor = vec4(velocity, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const pressureShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        varying highp vec2 vL;\r
        varying highp vec2 vR;\r
        varying highp vec2 vT;\r
        varying highp vec2 vB;\r
        uniform sampler2D uPressure;\r
        uniform sampler2D uDivergence;\r
\r
        void main () {\r
            float L = texture2D(uPressure, vL).x;\r
            float R = texture2D(uPressure, vR).x;\r
            float T = texture2D(uPressure, vT).x;\r
            float B = texture2D(uPressure, vB).x;\r
            float C = texture2D(uPressure, vUv).x;\r
            float divergence = texture2D(uDivergence, vUv).x;\r
            float pressure = (L + R + B + T - divergence) * 0.25;\r
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const gradientSubtractShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
        precision mediump float;\r
        precision mediump sampler2D;\r
        varying highp vec2 vUv;\r
        varying highp vec2 vL;\r
        varying highp vec2 vR;\r
        varying highp vec2 vT;\r
        varying highp vec2 vB;\r
        uniform sampler2D uPressure;\r
        uniform sampler2D uVelocity;\r
\r
        void main () {\r
            float L = texture2D(uPressure, vL).x;\r
            float R = texture2D(uPressure, vR).x;\r
            float T = texture2D(uPressure, vT).x;\r
            float B = texture2D(uPressure, vB).x;\r
            vec2 velocity = texture2D(uVelocity, vUv).xy;\r
            velocity.xy -= vec2(R - L, T - B);\r
            gl_FragColor = vec4(velocity, 0.0, 1.0);\r
        }\r
      \`\r
    );\r
\r
    const blit = (() => {\r
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());\r
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);\r
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());\r
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);\r
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);\r
      gl.enableVertexAttribArray(0);\r
      return (target, clear = false) => {\r
        if (target == null) {\r
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);\r
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);\r
        } else {\r
          gl.viewport(0, 0, target.width, target.height);\r
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);\r
        }\r
        if (clear) {\r
          gl.clearColor(0.0, 0.0, 0.0, 1.0);\r
          gl.clear(gl.COLOR_BUFFER_BIT);\r
        }\r
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);\r
      };\r
    })();\r
\r
    let dye, velocity, divergence, curl, pressure;\r
\r
    const copyProgram = new Program(baseVertexShader, copyShader);\r
    const clearProgram = new Program(baseVertexShader, clearShader);\r
    const splatProgram = new Program(baseVertexShader, splatShader);\r
    const advectionProgram = new Program(baseVertexShader, advectionShader);\r
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);\r
    const curlProgram = new Program(baseVertexShader, curlShader);\r
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);\r
    const pressureProgram = new Program(baseVertexShader, pressureShader);\r
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);\r
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);\r
\r
    function initFramebuffers() {\r
      let simRes = getResolution(config.SIM_RESOLUTION);\r
      let dyeRes = getResolution(config.DYE_RESOLUTION);\r
      const texType = ext.halfFloatTexType;\r
      const rgba = ext.formatRGBA;\r
      const rg = ext.formatRG;\r
      const r = ext.formatR;\r
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;\r
      gl.disable(gl.BLEND);\r
\r
      if (!dye)\r
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);\r
      else\r
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);\r
\r
      if (!velocity)\r
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);\r
      else\r
        velocity = resizeDoubleFBO(\r
          velocity,\r
          simRes.width,\r
          simRes.height,\r
          rg.internalFormat,\r
          rg.format,\r
          texType,\r
          filtering\r
        );\r
\r
      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
    }\r
\r
    function createFBO(w, h, internalFormat, format, type, param) {\r
      gl.activeTexture(gl.TEXTURE0);\r
      let texture = gl.createTexture();\r
      gl.bindTexture(gl.TEXTURE_2D, texture);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);\r
\r
      let fbo = gl.createFramebuffer();\r
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);\r
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);\r
      gl.viewport(0, 0, w, h);\r
      gl.clear(gl.COLOR_BUFFER_BIT);\r
\r
      let texelSizeX = 1.0 / w;\r
      let texelSizeY = 1.0 / h;\r
      return {\r
        texture,\r
        fbo,\r
        width: w,\r
        height: h,\r
        texelSizeX,\r
        texelSizeY,\r
        attach(id) {\r
          gl.activeTexture(gl.TEXTURE0 + id);\r
          gl.bindTexture(gl.TEXTURE_2D, texture);\r
          return id;\r
        }\r
      };\r
    }\r
\r
    function createDoubleFBO(w, h, internalFormat, format, type, param) {\r
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);\r
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);\r
      return {\r
        width: w,\r
        height: h,\r
        texelSizeX: fbo1.texelSizeX,\r
        texelSizeY: fbo1.texelSizeY,\r
        get read() {\r
          return fbo1;\r
        },\r
        set read(value) {\r
          fbo1 = value;\r
        },\r
        get write() {\r
          return fbo2;\r
        },\r
        set write(value) {\r
          fbo2 = value;\r
        },\r
        swap() {\r
          let temp = fbo1;\r
          fbo1 = fbo2;\r
          fbo2 = temp;\r
        }\r
      };\r
    }\r
\r
    function resizeFBO(target, w, h, internalFormat, format, type, param) {\r
      let newFBO = createFBO(w, h, internalFormat, format, type, param);\r
      copyProgram.bind();\r
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));\r
      blit(newFBO);\r
      return newFBO;\r
    }\r
\r
    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {\r
      if (target.width === w && target.height === h) return target;\r
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);\r
      target.write = createFBO(w, h, internalFormat, format, type, param);\r
      target.width = w;\r
      target.height = h;\r
      target.texelSizeX = 1.0 / w;\r
      target.texelSizeY = 1.0 / h;\r
      return target;\r
    }\r
\r
    function updateKeywords() {\r
      let displayKeywords = [];\r
      if (config.SHADING) displayKeywords.push('SHADING');\r
      displayMaterial.setKeywords(displayKeywords);\r
    }\r
\r
    updateKeywords();\r
    initFramebuffers();\r
    let lastUpdateTime = Date.now();\r
    let colorUpdateTimer = 0.0;\r
\r
    function updateFrame() {\r
      const dt = calcDeltaTime();\r
      if (resizeCanvas()) initFramebuffers();\r
      updateColors(dt);\r
      applyInputs();\r
      step(dt);\r
      render(null);\r
      requestAnimationFrame(updateFrame);\r
    }\r
\r
    function calcDeltaTime() {\r
      let now = Date.now();\r
      let dt = (now - lastUpdateTime) / 1000;\r
      dt = Math.min(dt, 0.016666);\r
      lastUpdateTime = now;\r
      return dt;\r
    }\r
\r
    function resizeCanvas() {\r
      let width = scaleByPixelRatio(canvas.clientWidth);\r
      let height = scaleByPixelRatio(canvas.clientHeight);\r
      if (canvas.width !== width || canvas.height !== height) {\r
        canvas.width = width;\r
        canvas.height = height;\r
        return true;\r
      }\r
      return false;\r
    }\r
\r
    function updateColors(dt) {\r
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;\r
      if (colorUpdateTimer >= 1) {\r
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);\r
        pointers.forEach(p => {\r
          p.color = generateColor();\r
        });\r
      }\r
    }\r
\r
    function applyInputs() {\r
      pointers.forEach(p => {\r
        if (p.moved) {\r
          p.moved = false;\r
          splatPointer(p);\r
        }\r
      });\r
    }\r
\r
    function step(dt) {\r
      gl.disable(gl.BLEND);\r
      curlProgram.bind();\r
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      blit(curl);\r
\r
      vorticityProgram.bind();\r
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));\r
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);\r
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      divergenceProgram.bind();\r
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      blit(divergence);\r
\r
      clearProgram.bind();\r
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));\r
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);\r
      blit(pressure.write);\r
      pressure.swap();\r
\r
      pressureProgram.bind();\r
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));\r
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {\r
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));\r
        blit(pressure.write);\r
        pressure.swap();\r
      }\r
\r
      gradienSubtractProgram.bind();\r
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));\r
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      advectionProgram.bind();\r
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      if (!ext.supportLinearFiltering)\r
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      let velocityId = velocity.read.attach(0);\r
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);\r
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);\r
      gl.uniform1f(advectionProgram.uniforms.dt, dt);\r
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      if (!ext.supportLinearFiltering)\r
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);\r
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));\r
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);\r
      blit(dye.write);\r
      dye.swap();\r
    }\r
\r
    function render(target) {\r
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);\r
      gl.enable(gl.BLEND);\r
      drawDisplay(target);\r
    }\r
\r
    function drawDisplay(target) {\r
      let width = target == null ? gl.drawingBufferWidth : target.width;\r
      let height = target == null ? gl.drawingBufferHeight : target.height;\r
      displayMaterial.bind();\r
      if (config.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);\r
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));\r
      blit(target);\r
    }\r
\r
    function splatPointer(pointer) {\r
      let dx = pointer.deltaX * config.SPLAT_FORCE;\r
      let dy = pointer.deltaY * config.SPLAT_FORCE;\r
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);\r
    }\r
\r
    function clickSplat(pointer) {\r
      const color = generateColor();\r
      color.r *= 10.0;\r
      color.g *= 10.0;\r
      color.b *= 10.0;\r
      let dx = 10 * (Math.random() - 0.5);\r
      let dy = 30 * (Math.random() - 0.5);\r
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);\r
    }\r
\r
    function splat(x, y, dx, dy, color) {\r
      splatProgram.bind();\r
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));\r
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);\r
      gl.uniform2f(splatProgram.uniforms.point, x, y);\r
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);\r
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));\r
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);\r
      blit(dye.write);\r
      dye.swap();\r
    }\r
\r
    function correctRadius(radius) {\r
      let aspectRatio = canvas.width / canvas.height;\r
      if (aspectRatio > 1) radius *= aspectRatio;\r
      return radius;\r
    }\r
\r
    function updatePointerDownData(pointer, id, posX, posY) {\r
      pointer.id = id;\r
      pointer.down = true;\r
      pointer.moved = false;\r
      pointer.texcoordX = posX / canvas.width;\r
      pointer.texcoordY = 1.0 - posY / canvas.height;\r
      pointer.prevTexcoordX = pointer.texcoordX;\r
      pointer.prevTexcoordY = pointer.texcoordY;\r
      pointer.deltaX = 0;\r
      pointer.deltaY = 0;\r
      pointer.color = generateColor();\r
    }\r
\r
    function updatePointerMoveData(pointer, posX, posY, color) {\r
      pointer.prevTexcoordX = pointer.texcoordX;\r
      pointer.prevTexcoordY = pointer.texcoordY;\r
      pointer.texcoordX = posX / canvas.width;\r
      pointer.texcoordY = 1.0 - posY / canvas.height;\r
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);\r
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);\r
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;\r
      pointer.color = color;\r
    }\r
\r
    function updatePointerUpData(pointer) {\r
      pointer.down = false;\r
    }\r
\r
    function correctDeltaX(delta) {\r
      let aspectRatio = canvas.width / canvas.height;\r
      if (aspectRatio < 1) delta *= aspectRatio;\r
      return delta;\r
    }\r
\r
    function correctDeltaY(delta) {\r
      let aspectRatio = canvas.width / canvas.height;\r
      if (aspectRatio > 1) delta /= aspectRatio;\r
      return delta;\r
    }\r
\r
    function generateColor() {\r
      let c = HSVtoRGB(Math.random(), 1.0, 1.0);\r
      c.r *= 0.15;\r
      c.g *= 0.15;\r
      c.b *= 0.15;\r
      return c;\r
    }\r
\r
    function HSVtoRGB(h, s, v) {\r
      let r, g, b, i, f, p, q, t;\r
      i = Math.floor(h * 6);\r
      f = h * 6 - i;\r
      p = v * (1 - s);\r
      q = v * (1 - f * s);\r
      t = v * (1 - (1 - f) * s);\r
      switch (i % 6) {\r
        case 0:\r
          r = v;\r
          g = t;\r
          b = p;\r
          break;\r
        case 1:\r
          r = q;\r
          g = v;\r
          b = p;\r
          break;\r
        case 2:\r
          r = p;\r
          g = v;\r
          b = t;\r
          break;\r
        case 3:\r
          r = p;\r
          g = q;\r
          b = v;\r
          break;\r
        case 4:\r
          r = t;\r
          g = p;\r
          b = v;\r
          break;\r
        case 5:\r
          r = v;\r
          g = p;\r
          b = q;\r
          break;\r
        default:\r
          break;\r
      }\r
      return { r, g, b };\r
    }\r
\r
    function wrap(value, min, max) {\r
      const range = max - min;\r
      if (range === 0) return min;\r
      return ((value - min) % range) + min;\r
    }\r
\r
    function getResolution(resolution) {\r
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;\r
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;\r
      const min = Math.round(resolution);\r
      const max = Math.round(resolution * aspectRatio);\r
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };\r
      else return { width: min, height: max };\r
    }\r
\r
    function scaleByPixelRatio(input) {\r
      const pixelRatio = window.devicePixelRatio || 1;\r
      return Math.floor(input * pixelRatio);\r
    }\r
\r
    function hashCode(s) {\r
      if (s.length === 0) return 0;\r
      let hash = 0;\r
      for (let i = 0; i < s.length; i++) {\r
        hash = (hash << 5) - hash + s.charCodeAt(i);\r
        hash |= 0;\r
      }\r
      return hash;\r
    }\r
\r
    window.addEventListener('mousedown', e => {\r
      let pointer = pointers[0];\r
      let posX = scaleByPixelRatio(e.clientX);\r
      let posY = scaleByPixelRatio(e.clientY);\r
      updatePointerDownData(pointer, -1, posX, posY);\r
      clickSplat(pointer);\r
    });\r
\r
    document.body.addEventListener('mousemove', function handleFirstMouseMove(e) {\r
      let pointer = pointers[0];\r
      let posX = scaleByPixelRatio(e.clientX);\r
      let posY = scaleByPixelRatio(e.clientY);\r
      let color = generateColor();\r
      updateFrame();\r
      updatePointerMoveData(pointer, posX, posY, color);\r
      document.body.removeEventListener('mousemove', handleFirstMouseMove);\r
    });\r
\r
    window.addEventListener('mousemove', e => {\r
      let pointer = pointers[0];\r
      let posX = scaleByPixelRatio(e.clientX);\r
      let posY = scaleByPixelRatio(e.clientY);\r
      let color = pointer.color;\r
      updatePointerMoveData(pointer, posX, posY, color);\r
    });\r
\r
    document.body.addEventListener('touchstart', function handleFirstTouchStart(e) {\r
      const touches = e.targetTouches;\r
      let pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        let posX = scaleByPixelRatio(touches[i].clientX);\r
        let posY = scaleByPixelRatio(touches[i].clientY);\r
        updateFrame();\r
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);\r
      }\r
      document.body.removeEventListener('touchstart', handleFirstTouchStart);\r
    });\r
\r
    window.addEventListener('touchstart', e => {\r
      const touches = e.targetTouches;\r
      let pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        let posX = scaleByPixelRatio(touches[i].clientX);\r
        let posY = scaleByPixelRatio(touches[i].clientY);\r
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);\r
      }\r
    });\r
\r
    window.addEventListener(\r
      'touchmove',\r
      e => {\r
        const touches = e.targetTouches;\r
        let pointer = pointers[0];\r
        for (let i = 0; i < touches.length; i++) {\r
          let posX = scaleByPixelRatio(touches[i].clientX);\r
          let posY = scaleByPixelRatio(touches[i].clientY);\r
          updatePointerMoveData(pointer, posX, posY, pointer.color);\r
        }\r
      },\r
      false\r
    );\r
\r
    window.addEventListener('touchend', e => {\r
      const touches = e.changedTouches;\r
      let pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        updatePointerUpData(pointer);\r
      }\r
    });\r
\r
    updateFrame();\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [\r
    SIM_RESOLUTION,\r
    DYE_RESOLUTION,\r
    CAPTURE_RESOLUTION,\r
    DENSITY_DISSIPATION,\r
    VELOCITY_DISSIPATION,\r
    PRESSURE,\r
    PRESSURE_ITERATIONS,\r
    CURL,\r
    SPLAT_RADIUS,\r
    SPLAT_FORCE,\r
    SHADING,\r
    COLOR_UPDATE_SPEED,\r
    BACK_COLOR,\r
    TRANSPARENT\r
  ]);\r
\r
  return (\r
    <div className="fixed top-0 left-0 z-50 pointer-events-none w-full h-full">\r
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen block"></canvas>\r
    </div>\r
  );\r
}\r
\r
export default SplashCursor;\r
`,te=`'use client';\r
import React, { useEffect, useRef } from 'react';\r
\r
interface ColorRGB {\r
  r: number;\r
  g: number;\r
  b: number;\r
}\r
\r
interface SplashCursorProps {\r
  SIM_RESOLUTION?: number;\r
  DYE_RESOLUTION?: number;\r
  CAPTURE_RESOLUTION?: number;\r
  DENSITY_DISSIPATION?: number;\r
  VELOCITY_DISSIPATION?: number;\r
  PRESSURE?: number;\r
  PRESSURE_ITERATIONS?: number;\r
  CURL?: number;\r
  SPLAT_RADIUS?: number;\r
  SPLAT_FORCE?: number;\r
  SHADING?: boolean;\r
  COLOR_UPDATE_SPEED?: number;\r
  BACK_COLOR?: ColorRGB;\r
  TRANSPARENT?: boolean;\r
}\r
\r
interface Pointer {\r
  id: number;\r
  texcoordX: number;\r
  texcoordY: number;\r
  prevTexcoordX: number;\r
  prevTexcoordY: number;\r
  deltaX: number;\r
  deltaY: number;\r
  down: boolean;\r
  moved: boolean;\r
  color: ColorRGB;\r
}\r
\r
function pointerPrototype(): Pointer {\r
  return {\r
    id: -1,\r
    texcoordX: 0,\r
    texcoordY: 0,\r
    prevTexcoordX: 0,\r
    prevTexcoordY: 0,\r
    deltaX: 0,\r
    deltaY: 0,\r
    down: false,\r
    moved: false,\r
    color: { r: 0, g: 0, b: 0 }\r
  };\r
}\r
\r
export default function SplashCursor({\r
  SIM_RESOLUTION = 128,\r
  DYE_RESOLUTION = 1440,\r
  CAPTURE_RESOLUTION = 512,\r
  DENSITY_DISSIPATION = 3.5,\r
  VELOCITY_DISSIPATION = 2,\r
  PRESSURE = 0.1,\r
  PRESSURE_ITERATIONS = 20,\r
  CURL = 3,\r
  SPLAT_RADIUS = 0.2,\r
  SPLAT_FORCE = 6000,\r
  SHADING = true,\r
  COLOR_UPDATE_SPEED = 10,\r
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },\r
  TRANSPARENT = true\r
}: SplashCursorProps) {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    let pointers: Pointer[] = [pointerPrototype()];\r
\r
    let config = {\r
      SIM_RESOLUTION: SIM_RESOLUTION!,\r
      DYE_RESOLUTION: DYE_RESOLUTION!,\r
      CAPTURE_RESOLUTION: CAPTURE_RESOLUTION!,\r
      DENSITY_DISSIPATION: DENSITY_DISSIPATION!,\r
      VELOCITY_DISSIPATION: VELOCITY_DISSIPATION!,\r
      PRESSURE: PRESSURE!,\r
      PRESSURE_ITERATIONS: PRESSURE_ITERATIONS!,\r
      CURL: CURL!,\r
      SPLAT_RADIUS: SPLAT_RADIUS!,\r
      SPLAT_FORCE: SPLAT_FORCE!,\r
      SHADING,\r
      COLOR_UPDATE_SPEED: COLOR_UPDATE_SPEED!,\r
      PAUSED: false,\r
      BACK_COLOR,\r
      TRANSPARENT\r
    };\r
\r
    const { gl, ext } = getWebGLContext(canvas);\r
    if (!gl || !ext) return;\r
\r
    if (!ext.supportLinearFiltering) {\r
      config.DYE_RESOLUTION = 256;\r
      config.SHADING = false;\r
    }\r
\r
    function getWebGLContext(canvas: HTMLCanvasElement) {\r
      const params = {\r
        alpha: true,\r
        depth: false,\r
        stencil: false,\r
        antialias: false,\r
        preserveDrawingBuffer: false\r
      };\r
\r
      let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;\r
\r
      if (!gl) {\r
        gl = (canvas.getContext('webgl', params) ||\r
          canvas.getContext('experimental-webgl', params)) as WebGL2RenderingContext | null;\r
      }\r
\r
      if (!gl) {\r
        throw new Error('Unable to initialize WebGL.');\r
      }\r
\r
      const isWebGL2 = 'drawBuffers' in gl;\r
\r
      let supportLinearFiltering = false;\r
      let halfFloat = null;\r
\r
      if (isWebGL2) {\r
        (gl as WebGL2RenderingContext).getExtension('EXT_color_buffer_float');\r
        supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension('OES_texture_float_linear');\r
      } else {\r
        halfFloat = gl.getExtension('OES_texture_half_float');\r
        supportLinearFiltering = !!gl.getExtension('OES_texture_half_float_linear');\r
      }\r
\r
      gl.clearColor(0, 0, 0, 1);\r
\r
      const halfFloatTexType = isWebGL2\r
        ? (gl as WebGL2RenderingContext).HALF_FLOAT\r
        : (halfFloat && (halfFloat as any).HALF_FLOAT_OES) || 0;\r
\r
      let formatRGBA: any;\r
      let formatRG: any;\r
      let formatR: any;\r
\r
      if (isWebGL2) {\r
        formatRGBA = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, halfFloatTexType);\r
        formatRG = getSupportedFormat(\r
          gl,\r
          (gl as WebGL2RenderingContext).RG16F,\r
          (gl as WebGL2RenderingContext).RG,\r
          halfFloatTexType\r
        );\r
        formatR = getSupportedFormat(\r
          gl,\r
          (gl as WebGL2RenderingContext).R16F,\r
          (gl as WebGL2RenderingContext).RED,\r
          halfFloatTexType\r
        );\r
      } else {\r
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
      }\r
\r
      return {\r
        gl,\r
        ext: {\r
          formatRGBA,\r
          formatRG,\r
          formatR,\r
          halfFloatTexType,\r
          supportLinearFiltering\r
        }\r
      };\r
    }\r
\r
    function getSupportedFormat(\r
      gl: WebGLRenderingContext | WebGL2RenderingContext,\r
      internalFormat: number,\r
      format: number,\r
      type: number\r
    ): { internalFormat: number; format: number } | null {\r
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {\r
        if ('drawBuffers' in gl) {\r
          const gl2 = gl as WebGL2RenderingContext;\r
          switch (internalFormat) {\r
            case gl2.R16F:\r
              return getSupportedFormat(gl2, gl2.RG16F, gl2.RG, type);\r
            case gl2.RG16F:\r
              return getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, type);\r
            default:\r
              return null;\r
          }\r
        }\r
        return null;\r
      }\r
      return { internalFormat, format };\r
    }\r
\r
    function supportRenderTextureFormat(\r
      gl: WebGLRenderingContext | WebGL2RenderingContext,\r
      internalFormat: number,\r
      format: number,\r
      type: number\r
    ) {\r
      const texture = gl.createTexture();\r
      if (!texture) return false;\r
\r
      gl.bindTexture(gl.TEXTURE_2D, texture);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);\r
\r
      const fbo = gl.createFramebuffer();\r
      if (!fbo) return false;\r
\r
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);\r
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);\r
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);\r
      return status === gl.FRAMEBUFFER_COMPLETE;\r
    }\r
\r
    function hashCode(s: string) {\r
      if (!s.length) return 0;\r
      let hash = 0;\r
      for (let i = 0; i < s.length; i++) {\r
        hash = (hash << 5) - hash + s.charCodeAt(i);\r
        hash |= 0;\r
      }\r
      return hash;\r
    }\r
\r
    function addKeywords(source: string, keywords: string[] | null) {\r
      if (!keywords) return source;\r
      let keywordsString = '';\r
      for (const keyword of keywords) {\r
        keywordsString += \`#define \${keyword}\\n\`;\r
      }\r
      return keywordsString + source;\r
    }\r
\r
    function compileShader(type: number, source: string, keywords: string[] | null = null): WebGLShader | null {\r
      const shaderSource = addKeywords(source, keywords);\r
      const shader = gl.createShader(type);\r
      if (!shader) return null;\r
      gl.shaderSource(shader, shaderSource);\r
      gl.compileShader(shader);\r
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
        console.trace(gl.getShaderInfoLog(shader));\r
      }\r
      return shader;\r
    }\r
\r
    function createProgram(vertexShader: WebGLShader | null, fragmentShader: WebGLShader | null): WebGLProgram | null {\r
      if (!vertexShader || !fragmentShader) return null;\r
      const program = gl.createProgram();\r
      if (!program) return null;\r
      gl.attachShader(program, vertexShader);\r
      gl.attachShader(program, fragmentShader);\r
      gl.linkProgram(program);\r
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
        console.trace(gl.getProgramInfoLog(program));\r
      }\r
      return program;\r
    }\r
\r
    function getUniforms(program: WebGLProgram) {\r
      let uniforms: Record<string, WebGLUniformLocation | null> = {};\r
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);\r
      for (let i = 0; i < uniformCount; i++) {\r
        const uniformInfo = gl.getActiveUniform(program, i);\r
        if (uniformInfo) {\r
          uniforms[uniformInfo.name] = gl.getUniformLocation(program, uniformInfo.name);\r
        }\r
      }\r
      return uniforms;\r
    }\r
\r
    class Program {\r
      program: WebGLProgram | null;\r
      uniforms: Record<string, WebGLUniformLocation | null>;\r
\r
      constructor(vertexShader: WebGLShader | null, fragmentShader: WebGLShader | null) {\r
        this.program = createProgram(vertexShader, fragmentShader);\r
        this.uniforms = this.program ? getUniforms(this.program) : {};\r
      }\r
\r
      bind() {\r
        if (this.program) gl.useProgram(this.program);\r
      }\r
    }\r
\r
    class Material {\r
      vertexShader: WebGLShader | null;\r
      fragmentShaderSource: string;\r
      programs: Record<number, WebGLProgram | null>;\r
      activeProgram: WebGLProgram | null;\r
      uniforms: Record<string, WebGLUniformLocation | null>;\r
\r
      constructor(vertexShader: WebGLShader | null, fragmentShaderSource: string) {\r
        this.vertexShader = vertexShader;\r
        this.fragmentShaderSource = fragmentShaderSource;\r
        this.programs = {};\r
        this.activeProgram = null;\r
        this.uniforms = {};\r
      }\r
\r
      setKeywords(keywords: string[]) {\r
        let hash = 0;\r
        for (const kw of keywords) {\r
          hash += hashCode(kw);\r
        }\r
        let program = this.programs[hash];\r
        if (program == null) {\r
          const fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);\r
          program = createProgram(this.vertexShader, fragmentShader);\r
          this.programs[hash] = program;\r
        }\r
        if (program === this.activeProgram) return;\r
        if (program) {\r
          this.uniforms = getUniforms(program);\r
        }\r
        this.activeProgram = program;\r
      }\r
\r
      bind() {\r
        if (this.activeProgram) {\r
          gl.useProgram(this.activeProgram);\r
        }\r
      }\r
    }\r
\r
    const baseVertexShader = compileShader(\r
      gl.VERTEX_SHADER,\r
      \`\r
      precision highp float;\r
      attribute vec2 aPosition;\r
      varying vec2 vUv;\r
      varying vec2 vL;\r
      varying vec2 vR;\r
      varying vec2 vT;\r
      varying vec2 vB;\r
      uniform vec2 texelSize;\r
\r
      void main () {\r
        vUv = aPosition * 0.5 + 0.5;\r
        vL = vUv - vec2(texelSize.x, 0.0);\r
        vR = vUv + vec2(texelSize.x, 0.0);\r
        vT = vUv + vec2(0.0, texelSize.y);\r
        vB = vUv - vec2(0.0, texelSize.y);\r
        gl_Position = vec4(aPosition, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const copyShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      uniform sampler2D uTexture;\r
\r
      void main () {\r
          gl_FragColor = texture2D(uTexture, vUv);\r
      }\r
    \`\r
    );\r
\r
    const clearShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      uniform sampler2D uTexture;\r
      uniform float value;\r
\r
      void main () {\r
          gl_FragColor = value * texture2D(uTexture, vUv);\r
      }\r
    \`\r
    );\r
\r
    const displayShaderSource = \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      varying vec2 vL;\r
      varying vec2 vR;\r
      varying vec2 vT;\r
      varying vec2 vB;\r
      uniform sampler2D uTexture;\r
      uniform sampler2D uDithering;\r
      uniform vec2 ditherScale;\r
      uniform vec2 texelSize;\r
\r
      vec3 linearToGamma (vec3 color) {\r
          color = max(color, vec3(0));\r
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\r
      }\r
\r
      void main () {\r
          vec3 c = texture2D(uTexture, vUv).rgb;\r
          #ifdef SHADING\r
              vec3 lc = texture2D(uTexture, vL).rgb;\r
              vec3 rc = texture2D(uTexture, vR).rgb;\r
              vec3 tc = texture2D(uTexture, vT).rgb;\r
              vec3 bc = texture2D(uTexture, vB).rgb;\r
\r
              float dx = length(rc) - length(lc);\r
              float dy = length(tc) - length(bc);\r
\r
              vec3 n = normalize(vec3(dx, dy, length(texelSize)));\r
              vec3 l = vec3(0.0, 0.0, 1.0);\r
\r
              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\r
              c *= diffuse;\r
          #endif\r
\r
          float a = max(c.r, max(c.g, c.b));\r
          gl_FragColor = vec4(c, a);\r
      }\r
    \`;\r
\r
    const splatShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      uniform sampler2D uTarget;\r
      uniform float aspectRatio;\r
      uniform vec3 color;\r
      uniform vec2 point;\r
      uniform float radius;\r
\r
      void main () {\r
          vec2 p = vUv - point.xy;\r
          p.x *= aspectRatio;\r
          vec3 splat = exp(-dot(p, p) / radius) * color;\r
          vec3 base = texture2D(uTarget, vUv).xyz;\r
          gl_FragColor = vec4(base + splat, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const advectionShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      uniform sampler2D uVelocity;\r
      uniform sampler2D uSource;\r
      uniform vec2 texelSize;\r
      uniform vec2 dyeTexelSize;\r
      uniform float dt;\r
      uniform float dissipation;\r
\r
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\r
          vec2 st = uv / tsize - 0.5;\r
          vec2 iuv = floor(st);\r
          vec2 fuv = fract(st);\r
\r
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\r
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\r
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\r
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\r
\r
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\r
      }\r
\r
      void main () {\r
          #ifdef MANUAL_FILTERING\r
              vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\r
              vec4 result = bilerp(uSource, coord, dyeTexelSize);\r
          #else\r
              vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\r
              vec4 result = texture2D(uSource, coord);\r
          #endif\r
          float decay = 1.0 + dissipation * dt;\r
          gl_FragColor = result / decay;\r
      }\r
    \`,\r
      ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']\r
    );\r
\r
    const divergenceShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      varying highp vec2 vL;\r
      varying highp vec2 vR;\r
      varying highp vec2 vT;\r
      varying highp vec2 vB;\r
      uniform sampler2D uVelocity;\r
\r
      void main () {\r
          float L = texture2D(uVelocity, vL).x;\r
          float R = texture2D(uVelocity, vR).x;\r
          float T = texture2D(uVelocity, vT).y;\r
          float B = texture2D(uVelocity, vB).y;\r
\r
          vec2 C = texture2D(uVelocity, vUv).xy;\r
          if (vL.x < 0.0) { L = -C.x; }\r
          if (vR.x > 1.0) { R = -C.x; }\r
          if (vT.y > 1.0) { T = -C.y; }\r
          if (vB.y < 0.0) { B = -C.y; }\r
\r
          float div = 0.5 * (R - L + T - B);\r
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const curlShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      varying highp vec2 vL;\r
      varying highp vec2 vR;\r
      varying highp vec2 vT;\r
      varying highp vec2 vB;\r
      uniform sampler2D uVelocity;\r
\r
      void main () {\r
          float L = texture2D(uVelocity, vL).y;\r
          float R = texture2D(uVelocity, vR).y;\r
          float T = texture2D(uVelocity, vT).x;\r
          float B = texture2D(uVelocity, vB).x;\r
          float vorticity = R - L - T + B;\r
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const vorticityShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      varying vec2 vL;\r
      varying vec2 vR;\r
      varying vec2 vT;\r
      varying vec2 vB;\r
      uniform sampler2D uVelocity;\r
      uniform sampler2D uCurl;\r
      uniform float curl;\r
      uniform float dt;\r
\r
      void main () {\r
          float L = texture2D(uCurl, vL).x;\r
          float R = texture2D(uCurl, vR).x;\r
          float T = texture2D(uCurl, vT).x;\r
          float B = texture2D(uCurl, vB).x;\r
          float C = texture2D(uCurl, vUv).x;\r
\r
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\r
          force /= length(force) + 0.0001;\r
          force *= curl * C;\r
          force.y *= -1.0;\r
\r
          vec2 velocity = texture2D(uVelocity, vUv).xy;\r
          velocity += force * dt;\r
          velocity = min(max(velocity, -1000.0), 1000.0);\r
          gl_FragColor = vec4(velocity, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const pressureShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      varying highp vec2 vL;\r
      varying highp vec2 vR;\r
      varying highp vec2 vT;\r
      varying highp vec2 vB;\r
      uniform sampler2D uPressure;\r
      uniform sampler2D uDivergence;\r
\r
      void main () {\r
          float L = texture2D(uPressure, vL).x;\r
          float R = texture2D(uPressure, vR).x;\r
          float T = texture2D(uPressure, vT).x;\r
          float B = texture2D(uPressure, vB).x;\r
          float C = texture2D(uPressure, vUv).x;\r
          float divergence = texture2D(uDivergence, vUv).x;\r
          float pressure = (L + R + B + T - divergence) * 0.25;\r
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const gradientSubtractShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      varying highp vec2 vL;\r
      varying highp vec2 vR;\r
      varying highp vec2 vT;\r
      varying highp vec2 vB;\r
      uniform sampler2D uPressure;\r
      uniform sampler2D uVelocity;\r
\r
      void main () {\r
          float L = texture2D(uPressure, vL).x;\r
          float R = texture2D(uPressure, vR).x;\r
          float T = texture2D(uPressure, vT).x;\r
          float B = texture2D(uPressure, vB).x;\r
          vec2 velocity = texture2D(uVelocity, vUv).xy;\r
          velocity.xy -= vec2(R - L, T - B);\r
          gl_FragColor = vec4(velocity, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const blit = (() => {\r
      const buffer = gl.createBuffer()!;\r
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\r
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);\r
      const elemBuffer = gl.createBuffer()!;\r
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemBuffer);\r
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);\r
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);\r
      gl.enableVertexAttribArray(0);\r
\r
      return (target: FBO | null, doClear = false) => {\r
        if (!gl) return;\r
        if (!target) {\r
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);\r
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);\r
        } else {\r
          gl.viewport(0, 0, target.width, target.height);\r
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);\r
        }\r
        if (doClear) {\r
          gl.clearColor(0, 0, 0, 1);\r
          gl.clear(gl.COLOR_BUFFER_BIT);\r
        }\r
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);\r
      };\r
    })();\r
\r
    interface FBO {\r
      texture: WebGLTexture;\r
      fbo: WebGLFramebuffer;\r
      width: number;\r
      height: number;\r
      texelSizeX: number;\r
      texelSizeY: number;\r
      attach: (id: number) => number;\r
    }\r
\r
    interface DoubleFBO {\r
      width: number;\r
      height: number;\r
      texelSizeX: number;\r
      texelSizeY: number;\r
      read: FBO;\r
      write: FBO;\r
      swap: () => void;\r
    }\r
\r
    let dye: DoubleFBO;\r
    let velocity: DoubleFBO;\r
    let divergence: FBO;\r
    let curl: FBO;\r
    let pressure: DoubleFBO;\r
\r
    const copyProgram = new Program(baseVertexShader, copyShader);\r
    const clearProgram = new Program(baseVertexShader, clearShader);\r
    const splatProgram = new Program(baseVertexShader, splatShader);\r
    const advectionProgram = new Program(baseVertexShader, advectionShader);\r
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);\r
    const curlProgram = new Program(baseVertexShader, curlShader);\r
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);\r
    const pressureProgram = new Program(baseVertexShader, pressureShader);\r
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);\r
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);\r
\r
    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {\r
      gl.activeTexture(gl.TEXTURE0);\r
      const texture = gl.createTexture()!;\r
      gl.bindTexture(gl.TEXTURE_2D, texture);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);\r
      const fbo = gl.createFramebuffer()!;\r
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);\r
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);\r
      gl.viewport(0, 0, w, h);\r
      gl.clear(gl.COLOR_BUFFER_BIT);\r
\r
      const texelSizeX = 1 / w;\r
      const texelSizeY = 1 / h;\r
\r
      return {\r
        texture,\r
        fbo,\r
        width: w,\r
        height: h,\r
        texelSizeX,\r
        texelSizeY,\r
        attach(id: number) {\r
          gl.activeTexture(gl.TEXTURE0 + id);\r
          gl.bindTexture(gl.TEXTURE_2D, texture);\r
          return id;\r
        }\r
      };\r
    }\r
\r
    function createDoubleFBO(\r
      w: number,\r
      h: number,\r
      internalFormat: number,\r
      format: number,\r
      type: number,\r
      param: number\r
    ): DoubleFBO {\r
      const fbo1 = createFBO(w, h, internalFormat, format, type, param);\r
      const fbo2 = createFBO(w, h, internalFormat, format, type, param);\r
      return {\r
        width: w,\r
        height: h,\r
        texelSizeX: fbo1.texelSizeX,\r
        texelSizeY: fbo1.texelSizeY,\r
        read: fbo1,\r
        write: fbo2,\r
        swap() {\r
          const tmp = this.read;\r
          this.read = this.write;\r
          this.write = tmp;\r
        }\r
      };\r
    }\r
\r
    function resizeFBO(\r
      target: FBO,\r
      w: number,\r
      h: number,\r
      internalFormat: number,\r
      format: number,\r
      type: number,\r
      param: number\r
    ) {\r
      const newFBO = createFBO(w, h, internalFormat, format, type, param);\r
      copyProgram.bind();\r
      if (copyProgram.uniforms.uTexture) gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));\r
      blit(newFBO, false);\r
      return newFBO;\r
    }\r
\r
    function resizeDoubleFBO(\r
      target: DoubleFBO,\r
      w: number,\r
      h: number,\r
      internalFormat: number,\r
      format: number,\r
      type: number,\r
      param: number\r
    ) {\r
      if (target.width === w && target.height === h) return target;\r
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);\r
      target.write = createFBO(w, h, internalFormat, format, type, param);\r
      target.width = w;\r
      target.height = h;\r
      target.texelSizeX = 1 / w;\r
      target.texelSizeY = 1 / h;\r
      return target;\r
    }\r
\r
    function initFramebuffers() {\r
      const simRes = getResolution(config.SIM_RESOLUTION!);\r
      const dyeRes = getResolution(config.DYE_RESOLUTION!);\r
\r
      const texType = ext.halfFloatTexType;\r
      const rgba = ext.formatRGBA;\r
      const rg = ext.formatRG;\r
      const r = ext.formatR;\r
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;\r
      gl.disable(gl.BLEND);\r
\r
      if (!dye) {\r
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);\r
      } else {\r
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);\r
      }\r
\r
      if (!velocity) {\r
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);\r
      } else {\r
        velocity = resizeDoubleFBO(\r
          velocity,\r
          simRes.width,\r
          simRes.height,\r
          rg.internalFormat,\r
          rg.format,\r
          texType,\r
          filtering\r
        );\r
      }\r
\r
      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
    }\r
\r
    function updateKeywords() {\r
      const displayKeywords: string[] = [];\r
      if (config.SHADING) displayKeywords.push('SHADING');\r
      displayMaterial.setKeywords(displayKeywords);\r
    }\r
\r
    function getResolution(resolution: number) {\r
      const w = gl.drawingBufferWidth;\r
      const h = gl.drawingBufferHeight;\r
      const aspectRatio = w / h;\r
      let aspect = aspectRatio < 1 ? 1 / aspectRatio : aspectRatio;\r
      const min = Math.round(resolution);\r
      const max = Math.round(resolution * aspect);\r
      if (w > h) {\r
        return { width: max, height: min };\r
      }\r
      return { width: min, height: max };\r
    }\r
\r
    function scaleByPixelRatio(input: number) {\r
      const pixelRatio = window.devicePixelRatio || 1;\r
      return Math.floor(input * pixelRatio);\r
    }\r
\r
    updateKeywords();\r
    initFramebuffers();\r
\r
    let lastUpdateTime = Date.now();\r
    let colorUpdateTimer = 0.0;\r
\r
    function updateFrame() {\r
      const dt = calcDeltaTime();\r
      if (resizeCanvas()) initFramebuffers();\r
      updateColors(dt);\r
      applyInputs();\r
      step(dt);\r
      render(null);\r
      requestAnimationFrame(updateFrame);\r
    }\r
\r
    function calcDeltaTime() {\r
      const now = Date.now();\r
      let dt = (now - lastUpdateTime) / 1000;\r
      dt = Math.min(dt, 0.016666);\r
      lastUpdateTime = now;\r
      return dt;\r
    }\r
\r
    function resizeCanvas() {\r
      const width = scaleByPixelRatio(canvas!.clientWidth);\r
      const height = scaleByPixelRatio(canvas!.clientHeight);\r
      if (canvas!.width !== width || canvas!.height !== height) {\r
        canvas!.width = width;\r
        canvas!.height = height;\r
        return true;\r
      }\r
      return false;\r
    }\r
\r
    function updateColors(dt: number) {\r
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;\r
      if (colorUpdateTimer >= 1) {\r
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);\r
        pointers.forEach(p => {\r
          p.color = generateColor();\r
        });\r
      }\r
    }\r
\r
    function applyInputs() {\r
      for (const p of pointers) {\r
        if (p.moved) {\r
          p.moved = false;\r
          splatPointer(p);\r
        }\r
      }\r
    }\r
\r
    function step(dt: number) {\r
      gl.disable(gl.BLEND);\r
\r
      curlProgram.bind();\r
      if (curlProgram.uniforms.texelSize) {\r
        gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (curlProgram.uniforms.uVelocity) {\r
        gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      }\r
      blit(curl);\r
\r
      vorticityProgram.bind();\r
      if (vorticityProgram.uniforms.texelSize) {\r
        gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (vorticityProgram.uniforms.uVelocity) {\r
        gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      }\r
      if (vorticityProgram.uniforms.uCurl) {\r
        gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));\r
      }\r
      if (vorticityProgram.uniforms.curl) {\r
        gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);\r
      }\r
      if (vorticityProgram.uniforms.dt) {\r
        gl.uniform1f(vorticityProgram.uniforms.dt, dt);\r
      }\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      divergenceProgram.bind();\r
      if (divergenceProgram.uniforms.texelSize) {\r
        gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (divergenceProgram.uniforms.uVelocity) {\r
        gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      }\r
      blit(divergence);\r
\r
      clearProgram.bind();\r
      if (clearProgram.uniforms.uTexture) {\r
        gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));\r
      }\r
      if (clearProgram.uniforms.value) {\r
        gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);\r
      }\r
      blit(pressure.write);\r
      pressure.swap();\r
\r
      pressureProgram.bind();\r
      if (pressureProgram.uniforms.texelSize) {\r
        gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (pressureProgram.uniforms.uDivergence) {\r
        gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));\r
      }\r
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {\r
        if (pressureProgram.uniforms.uPressure) {\r
          gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));\r
        }\r
        blit(pressure.write);\r
        pressure.swap();\r
      }\r
\r
      gradienSubtractProgram.bind();\r
      if (gradienSubtractProgram.uniforms.texelSize) {\r
        gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (gradienSubtractProgram.uniforms.uPressure) {\r
        gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));\r
      }\r
      if (gradienSubtractProgram.uniforms.uVelocity) {\r
        gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));\r
      }\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      advectionProgram.bind();\r
      if (advectionProgram.uniforms.texelSize) {\r
        gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {\r
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      const velocityId = velocity.read.attach(0);\r
      if (advectionProgram.uniforms.uVelocity) {\r
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);\r
      }\r
      if (advectionProgram.uniforms.uSource) {\r
        gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);\r
      }\r
      if (advectionProgram.uniforms.dt) {\r
        gl.uniform1f(advectionProgram.uniforms.dt, dt);\r
      }\r
      if (advectionProgram.uniforms.dissipation) {\r
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);\r
      }\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {\r
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);\r
      }\r
      if (advectionProgram.uniforms.uVelocity) {\r
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      }\r
      if (advectionProgram.uniforms.uSource) {\r
        gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));\r
      }\r
      if (advectionProgram.uniforms.dissipation) {\r
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);\r
      }\r
      blit(dye.write);\r
      dye.swap();\r
    }\r
\r
    function render(target: FBO | null) {\r
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);\r
      gl.enable(gl.BLEND);\r
      drawDisplay(target);\r
    }\r
\r
    function drawDisplay(target: FBO | null) {\r
      const width = target ? target.width : gl.drawingBufferWidth;\r
      const height = target ? target.height : gl.drawingBufferHeight;\r
      displayMaterial.bind();\r
      if (config.SHADING && displayMaterial.uniforms.texelSize) {\r
        gl.uniform2f(displayMaterial.uniforms.texelSize, 1 / width, 1 / height);\r
      }\r
      if (displayMaterial.uniforms.uTexture) {\r
        gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));\r
      }\r
      blit(target, false);\r
    }\r
\r
    function splatPointer(pointer: Pointer) {\r
      const dx = pointer.deltaX * config.SPLAT_FORCE;\r
      const dy = pointer.deltaY * config.SPLAT_FORCE;\r
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);\r
    }\r
\r
    function clickSplat(pointer: Pointer) {\r
      const color = generateColor();\r
      color.r *= 10;\r
      color.g *= 10;\r
      color.b *= 10;\r
      const dx = 10 * (Math.random() - 0.5);\r
      const dy = 30 * (Math.random() - 0.5);\r
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);\r
    }\r
\r
    function splat(x: number, y: number, dx: number, dy: number, color: ColorRGB) {\r
      splatProgram.bind();\r
      if (splatProgram.uniforms.uTarget) {\r
        gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));\r
      }\r
      if (splatProgram.uniforms.aspectRatio) {\r
        gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas!.width / canvas!.height);\r
      }\r
      if (splatProgram.uniforms.point) {\r
        gl.uniform2f(splatProgram.uniforms.point, x, y);\r
      }\r
      if (splatProgram.uniforms.color) {\r
        gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0);\r
      }\r
      if (splatProgram.uniforms.radius) {\r
        gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100)!);\r
      }\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      if (splatProgram.uniforms.uTarget) {\r
        gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));\r
      }\r
      if (splatProgram.uniforms.color) {\r
        gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);\r
      }\r
      blit(dye.write);\r
      dye.swap();\r
    }\r
\r
    function correctRadius(radius: number) {\r
      const aspectRatio = canvas!.width / canvas!.height;\r
      if (aspectRatio > 1) radius *= aspectRatio;\r
      return radius;\r
    }\r
\r
    function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {\r
      pointer.id = id;\r
      pointer.down = true;\r
      pointer.moved = false;\r
      pointer.texcoordX = posX / canvas!.width;\r
      pointer.texcoordY = 1 - posY / canvas!.height;\r
      pointer.prevTexcoordX = pointer.texcoordX;\r
      pointer.prevTexcoordY = pointer.texcoordY;\r
      pointer.deltaX = 0;\r
      pointer.deltaY = 0;\r
      pointer.color = generateColor();\r
    }\r
\r
    function updatePointerMoveData(pointer: Pointer, posX: number, posY: number, color: ColorRGB) {\r
      pointer.prevTexcoordX = pointer.texcoordX;\r
      pointer.prevTexcoordY = pointer.texcoordY;\r
      pointer.texcoordX = posX / canvas!.width;\r
      pointer.texcoordY = 1 - posY / canvas!.height;\r
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX)!;\r
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY)!;\r
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;\r
      pointer.color = color;\r
    }\r
\r
    function updatePointerUpData(pointer: Pointer) {\r
      pointer.down = false;\r
    }\r
\r
    function correctDeltaX(delta: number) {\r
      const aspectRatio = canvas!.width / canvas!.height;\r
      if (aspectRatio < 1) delta *= aspectRatio;\r
      return delta;\r
    }\r
\r
    function correctDeltaY(delta: number) {\r
      const aspectRatio = canvas!.width / canvas!.height;\r
      if (aspectRatio > 1) delta /= aspectRatio;\r
      return delta;\r
    }\r
\r
    function generateColor(): ColorRGB {\r
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);\r
      c.r *= 0.15;\r
      c.g *= 0.15;\r
      c.b *= 0.15;\r
      return c;\r
    }\r
\r
    function HSVtoRGB(h: number, s: number, v: number): ColorRGB {\r
      let r = 0,\r
        g = 0,\r
        b = 0;\r
      const i = Math.floor(h * 6);\r
      const f = h * 6 - i;\r
      const p = v * (1 - s);\r
      const q = v * (1 - f * s);\r
      const t = v * (1 - (1 - f) * s);\r
\r
      switch (i % 6) {\r
        case 0:\r
          r = v;\r
          g = t;\r
          b = p;\r
          break;\r
        case 1:\r
          r = q;\r
          g = v;\r
          b = p;\r
          break;\r
        case 2:\r
          r = p;\r
          g = v;\r
          b = t;\r
          break;\r
        case 3:\r
          r = p;\r
          g = q;\r
          b = v;\r
          break;\r
        case 4:\r
          r = t;\r
          g = p;\r
          b = v;\r
          break;\r
        case 5:\r
          r = v;\r
          g = p;\r
          b = q;\r
          break;\r
      }\r
      return { r, g, b };\r
    }\r
\r
    function wrap(value: number, min: number, max: number) {\r
      const range = max - min;\r
      if (range === 0) return min;\r
      return ((value - min) % range) + min;\r
    }\r
\r
    window.addEventListener('mousedown', e => {\r
      const pointer = pointers[0];\r
      const posX = scaleByPixelRatio(e.clientX);\r
      const posY = scaleByPixelRatio(e.clientY);\r
      updatePointerDownData(pointer, -1, posX, posY);\r
      clickSplat(pointer);\r
    });\r
\r
    function handleFirstMouseMove(e: MouseEvent) {\r
      const pointer = pointers[0];\r
      const posX = scaleByPixelRatio(e.clientX);\r
      const posY = scaleByPixelRatio(e.clientY);\r
      const color = generateColor();\r
      updateFrame();\r
      updatePointerMoveData(pointer, posX, posY, color);\r
      document.body.removeEventListener('mousemove', handleFirstMouseMove);\r
    }\r
    document.body.addEventListener('mousemove', handleFirstMouseMove);\r
\r
    window.addEventListener('mousemove', e => {\r
      const pointer = pointers[0];\r
      const posX = scaleByPixelRatio(e.clientX);\r
      const posY = scaleByPixelRatio(e.clientY);\r
      const color = pointer.color;\r
      updatePointerMoveData(pointer, posX, posY, color);\r
    });\r
\r
    function handleFirstTouchStart(e: TouchEvent) {\r
      const touches = e.targetTouches;\r
      const pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        const posX = scaleByPixelRatio(touches[i].clientX);\r
        const posY = scaleByPixelRatio(touches[i].clientY);\r
        updateFrame();\r
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);\r
      }\r
      document.body.removeEventListener('touchstart', handleFirstTouchStart);\r
    }\r
    document.body.addEventListener('touchstart', handleFirstTouchStart);\r
\r
    window.addEventListener(\r
      'touchstart',\r
      e => {\r
        const touches = e.targetTouches;\r
        const pointer = pointers[0];\r
        for (let i = 0; i < touches.length; i++) {\r
          const posX = scaleByPixelRatio(touches[i].clientX);\r
          const posY = scaleByPixelRatio(touches[i].clientY);\r
          updatePointerDownData(pointer, touches[i].identifier, posX, posY);\r
        }\r
      },\r
      false\r
    );\r
\r
    window.addEventListener(\r
      'touchmove',\r
      e => {\r
        const touches = e.targetTouches;\r
        const pointer = pointers[0];\r
        for (let i = 0; i < touches.length; i++) {\r
          const posX = scaleByPixelRatio(touches[i].clientX);\r
          const posY = scaleByPixelRatio(touches[i].clientY);\r
          updatePointerMoveData(pointer, posX, posY, pointer.color);\r
        }\r
      },\r
      false\r
    );\r
\r
    window.addEventListener('touchend', e => {\r
      const touches = e.changedTouches;\r
      const pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        updatePointerUpData(pointer);\r
      }\r
    });\r
  }, [\r
    SIM_RESOLUTION,\r
    DYE_RESOLUTION,\r
    CAPTURE_RESOLUTION,\r
    DENSITY_DISSIPATION,\r
    VELOCITY_DISSIPATION,\r
    PRESSURE,\r
    PRESSURE_ITERATIONS,\r
    CURL,\r
    SPLAT_RADIUS,\r
    SPLAT_FORCE,\r
    SHADING,\r
    COLOR_UPDATE_SPEED,\r
    BACK_COLOR,\r
    TRANSPARENT\r
  ]);\r
\r
  return (\r
    <div\r
      style={{\r
        position: 'fixed',\r
        top: 0,\r
        left: 0,\r
        zIndex: 50,\r
        pointerEvents: 'none',\r
        width: '100%',\r
        height: '100%'\r
      }}\r
    >\r
      <canvas\r
        ref={canvasRef}\r
        id="fluid"\r
        style={{\r
          width: '100vw',\r
          height: '100vh',\r
          display: 'block'\r
        }}\r
      />\r
    </div>\r
  );\r
}\r
`,oe=`'use client';\r
import React, { useEffect, useRef } from 'react';\r
\r
interface ColorRGB {\r
  r: number;\r
  g: number;\r
  b: number;\r
}\r
\r
interface SplashCursorProps {\r
  SIM_RESOLUTION?: number;\r
  DYE_RESOLUTION?: number;\r
  CAPTURE_RESOLUTION?: number;\r
  DENSITY_DISSIPATION?: number;\r
  VELOCITY_DISSIPATION?: number;\r
  PRESSURE?: number;\r
  PRESSURE_ITERATIONS?: number;\r
  CURL?: number;\r
  SPLAT_RADIUS?: number;\r
  SPLAT_FORCE?: number;\r
  SHADING?: boolean;\r
  COLOR_UPDATE_SPEED?: number;\r
  BACK_COLOR?: ColorRGB;\r
  TRANSPARENT?: boolean;\r
}\r
\r
interface Pointer {\r
  id: number;\r
  texcoordX: number;\r
  texcoordY: number;\r
  prevTexcoordX: number;\r
  prevTexcoordY: number;\r
  deltaX: number;\r
  deltaY: number;\r
  down: boolean;\r
  moved: boolean;\r
  color: ColorRGB;\r
}\r
\r
function pointerPrototype(): Pointer {\r
  return {\r
    id: -1,\r
    texcoordX: 0,\r
    texcoordY: 0,\r
    prevTexcoordX: 0,\r
    prevTexcoordY: 0,\r
    deltaX: 0,\r
    deltaY: 0,\r
    down: false,\r
    moved: false,\r
    color: { r: 0, g: 0, b: 0 }\r
  };\r
}\r
\r
export default function SplashCursor({\r
  SIM_RESOLUTION = 128,\r
  DYE_RESOLUTION = 1440,\r
  CAPTURE_RESOLUTION = 512,\r
  DENSITY_DISSIPATION = 3.5,\r
  VELOCITY_DISSIPATION = 2,\r
  PRESSURE = 0.1,\r
  PRESSURE_ITERATIONS = 20,\r
  CURL = 3,\r
  SPLAT_RADIUS = 0.2,\r
  SPLAT_FORCE = 6000,\r
  SHADING = true,\r
  COLOR_UPDATE_SPEED = 10,\r
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },\r
  TRANSPARENT = true\r
}: SplashCursorProps) {\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    if (!canvas) return;\r
\r
    let pointers: Pointer[] = [pointerPrototype()];\r
\r
    let config = {\r
      SIM_RESOLUTION: SIM_RESOLUTION!,\r
      DYE_RESOLUTION: DYE_RESOLUTION!,\r
      CAPTURE_RESOLUTION: CAPTURE_RESOLUTION!,\r
      DENSITY_DISSIPATION: DENSITY_DISSIPATION!,\r
      VELOCITY_DISSIPATION: VELOCITY_DISSIPATION!,\r
      PRESSURE: PRESSURE!,\r
      PRESSURE_ITERATIONS: PRESSURE_ITERATIONS!,\r
      CURL: CURL!,\r
      SPLAT_RADIUS: SPLAT_RADIUS!,\r
      SPLAT_FORCE: SPLAT_FORCE!,\r
      SHADING,\r
      COLOR_UPDATE_SPEED: COLOR_UPDATE_SPEED!,\r
      PAUSED: false,\r
      BACK_COLOR,\r
      TRANSPARENT\r
    };\r
\r
    const { gl, ext } = getWebGLContext(canvas);\r
    if (!gl || !ext) return;\r
\r
    if (!ext.supportLinearFiltering) {\r
      config.DYE_RESOLUTION = 256;\r
      config.SHADING = false;\r
    }\r
\r
    function getWebGLContext(canvas: HTMLCanvasElement) {\r
      const params = {\r
        alpha: true,\r
        depth: false,\r
        stencil: false,\r
        antialias: false,\r
        preserveDrawingBuffer: false\r
      };\r
\r
      let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;\r
\r
      if (!gl) {\r
        gl = (canvas.getContext('webgl', params) ||\r
          canvas.getContext('experimental-webgl', params)) as WebGL2RenderingContext | null;\r
      }\r
\r
      if (!gl) {\r
        throw new Error('Unable to initialize WebGL.');\r
      }\r
\r
      const isWebGL2 = 'drawBuffers' in gl;\r
\r
      let supportLinearFiltering = false;\r
      let halfFloat = null;\r
\r
      if (isWebGL2) {\r
        (gl as WebGL2RenderingContext).getExtension('EXT_color_buffer_float');\r
        supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension('OES_texture_float_linear');\r
      } else {\r
        halfFloat = gl.getExtension('OES_texture_half_float');\r
        supportLinearFiltering = !!gl.getExtension('OES_texture_half_float_linear');\r
      }\r
\r
      gl.clearColor(0, 0, 0, 1);\r
\r
      const halfFloatTexType = isWebGL2\r
        ? (gl as WebGL2RenderingContext).HALF_FLOAT\r
        : (halfFloat && (halfFloat as any).HALF_FLOAT_OES) || 0;\r
\r
      let formatRGBA: any;\r
      let formatRG: any;\r
      let formatR: any;\r
\r
      if (isWebGL2) {\r
        formatRGBA = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, halfFloatTexType);\r
        formatRG = getSupportedFormat(\r
          gl,\r
          (gl as WebGL2RenderingContext).RG16F,\r
          (gl as WebGL2RenderingContext).RG,\r
          halfFloatTexType\r
        );\r
        formatR = getSupportedFormat(\r
          gl,\r
          (gl as WebGL2RenderingContext).R16F,\r
          (gl as WebGL2RenderingContext).RED,\r
          halfFloatTexType\r
        );\r
      } else {\r
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);\r
      }\r
\r
      return {\r
        gl,\r
        ext: {\r
          formatRGBA,\r
          formatRG,\r
          formatR,\r
          halfFloatTexType,\r
          supportLinearFiltering\r
        }\r
      };\r
    }\r
\r
    function getSupportedFormat(\r
      gl: WebGLRenderingContext | WebGL2RenderingContext,\r
      internalFormat: number,\r
      format: number,\r
      type: number\r
    ): { internalFormat: number; format: number } | null {\r
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {\r
        if ('drawBuffers' in gl) {\r
          const gl2 = gl as WebGL2RenderingContext;\r
          switch (internalFormat) {\r
            case gl2.R16F:\r
              return getSupportedFormat(gl2, gl2.RG16F, gl2.RG, type);\r
            case gl2.RG16F:\r
              return getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, type);\r
            default:\r
              return null;\r
          }\r
        }\r
        return null;\r
      }\r
      return { internalFormat, format };\r
    }\r
\r
    function supportRenderTextureFormat(\r
      gl: WebGLRenderingContext | WebGL2RenderingContext,\r
      internalFormat: number,\r
      format: number,\r
      type: number\r
    ) {\r
      const texture = gl.createTexture();\r
      if (!texture) return false;\r
\r
      gl.bindTexture(gl.TEXTURE_2D, texture);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);\r
\r
      const fbo = gl.createFramebuffer();\r
      if (!fbo) return false;\r
\r
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);\r
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);\r
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);\r
      return status === gl.FRAMEBUFFER_COMPLETE;\r
    }\r
\r
    function hashCode(s: string) {\r
      if (!s.length) return 0;\r
      let hash = 0;\r
      for (let i = 0; i < s.length; i++) {\r
        hash = (hash << 5) - hash + s.charCodeAt(i);\r
        hash |= 0;\r
      }\r
      return hash;\r
    }\r
\r
    function addKeywords(source: string, keywords: string[] | null) {\r
      if (!keywords) return source;\r
      let keywordsString = '';\r
      for (const keyword of keywords) {\r
        keywordsString += \`#define \${keyword}\\n\`;\r
      }\r
      return keywordsString + source;\r
    }\r
\r
    function compileShader(type: number, source: string, keywords: string[] | null = null): WebGLShader | null {\r
      const shaderSource = addKeywords(source, keywords);\r
      const shader = gl.createShader(type);\r
      if (!shader) return null;\r
      gl.shaderSource(shader, shaderSource);\r
      gl.compileShader(shader);\r
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r
        console.trace(gl.getShaderInfoLog(shader));\r
      }\r
      return shader;\r
    }\r
\r
    function createProgram(vertexShader: WebGLShader | null, fragmentShader: WebGLShader | null): WebGLProgram | null {\r
      if (!vertexShader || !fragmentShader) return null;\r
      const program = gl.createProgram();\r
      if (!program) return null;\r
      gl.attachShader(program, vertexShader);\r
      gl.attachShader(program, fragmentShader);\r
      gl.linkProgram(program);\r
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r
        console.trace(gl.getProgramInfoLog(program));\r
      }\r
      return program;\r
    }\r
\r
    function getUniforms(program: WebGLProgram) {\r
      let uniforms: Record<string, WebGLUniformLocation | null> = {};\r
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);\r
      for (let i = 0; i < uniformCount; i++) {\r
        const uniformInfo = gl.getActiveUniform(program, i);\r
        if (uniformInfo) {\r
          uniforms[uniformInfo.name] = gl.getUniformLocation(program, uniformInfo.name);\r
        }\r
      }\r
      return uniforms;\r
    }\r
\r
    class Program {\r
      program: WebGLProgram | null;\r
      uniforms: Record<string, WebGLUniformLocation | null>;\r
\r
      constructor(vertexShader: WebGLShader | null, fragmentShader: WebGLShader | null) {\r
        this.program = createProgram(vertexShader, fragmentShader);\r
        this.uniforms = this.program ? getUniforms(this.program) : {};\r
      }\r
\r
      bind() {\r
        if (this.program) gl.useProgram(this.program);\r
      }\r
    }\r
\r
    class Material {\r
      vertexShader: WebGLShader | null;\r
      fragmentShaderSource: string;\r
      programs: Record<number, WebGLProgram | null>;\r
      activeProgram: WebGLProgram | null;\r
      uniforms: Record<string, WebGLUniformLocation | null>;\r
\r
      constructor(vertexShader: WebGLShader | null, fragmentShaderSource: string) {\r
        this.vertexShader = vertexShader;\r
        this.fragmentShaderSource = fragmentShaderSource;\r
        this.programs = {};\r
        this.activeProgram = null;\r
        this.uniforms = {};\r
      }\r
\r
      setKeywords(keywords: string[]) {\r
        let hash = 0;\r
        for (const kw of keywords) {\r
          hash += hashCode(kw);\r
        }\r
        let program = this.programs[hash];\r
        if (program == null) {\r
          const fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);\r
          program = createProgram(this.vertexShader, fragmentShader);\r
          this.programs[hash] = program;\r
        }\r
        if (program === this.activeProgram) return;\r
        if (program) {\r
          this.uniforms = getUniforms(program);\r
        }\r
        this.activeProgram = program;\r
      }\r
\r
      bind() {\r
        if (this.activeProgram) {\r
          gl.useProgram(this.activeProgram);\r
        }\r
      }\r
    }\r
\r
    const baseVertexShader = compileShader(\r
      gl.VERTEX_SHADER,\r
      \`\r
      precision highp float;\r
      attribute vec2 aPosition;\r
      varying vec2 vUv;\r
      varying vec2 vL;\r
      varying vec2 vR;\r
      varying vec2 vT;\r
      varying vec2 vB;\r
      uniform vec2 texelSize;\r
\r
      void main () {\r
        vUv = aPosition * 0.5 + 0.5;\r
        vL = vUv - vec2(texelSize.x, 0.0);\r
        vR = vUv + vec2(texelSize.x, 0.0);\r
        vT = vUv + vec2(0.0, texelSize.y);\r
        vB = vUv - vec2(0.0, texelSize.y);\r
        gl_Position = vec4(aPosition, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const copyShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      uniform sampler2D uTexture;\r
\r
      void main () {\r
          gl_FragColor = texture2D(uTexture, vUv);\r
      }\r
    \`\r
    );\r
\r
    const clearShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      uniform sampler2D uTexture;\r
      uniform float value;\r
\r
      void main () {\r
          gl_FragColor = value * texture2D(uTexture, vUv);\r
      }\r
    \`\r
    );\r
\r
    const displayShaderSource = \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      varying vec2 vL;\r
      varying vec2 vR;\r
      varying vec2 vT;\r
      varying vec2 vB;\r
      uniform sampler2D uTexture;\r
      uniform sampler2D uDithering;\r
      uniform vec2 ditherScale;\r
      uniform vec2 texelSize;\r
\r
      vec3 linearToGamma (vec3 color) {\r
          color = max(color, vec3(0));\r
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\r
      }\r
\r
      void main () {\r
          vec3 c = texture2D(uTexture, vUv).rgb;\r
          #ifdef SHADING\r
              vec3 lc = texture2D(uTexture, vL).rgb;\r
              vec3 rc = texture2D(uTexture, vR).rgb;\r
              vec3 tc = texture2D(uTexture, vT).rgb;\r
              vec3 bc = texture2D(uTexture, vB).rgb;\r
\r
              float dx = length(rc) - length(lc);\r
              float dy = length(tc) - length(bc);\r
\r
              vec3 n = normalize(vec3(dx, dy, length(texelSize)));\r
              vec3 l = vec3(0.0, 0.0, 1.0);\r
\r
              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\r
              c *= diffuse;\r
          #endif\r
\r
          float a = max(c.r, max(c.g, c.b));\r
          gl_FragColor = vec4(c, a);\r
      }\r
    \`;\r
\r
    const splatShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      uniform sampler2D uTarget;\r
      uniform float aspectRatio;\r
      uniform vec3 color;\r
      uniform vec2 point;\r
      uniform float radius;\r
\r
      void main () {\r
          vec2 p = vUv - point.xy;\r
          p.x *= aspectRatio;\r
          vec3 splat = exp(-dot(p, p) / radius) * color;\r
          vec3 base = texture2D(uTarget, vUv).xyz;\r
          gl_FragColor = vec4(base + splat, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const advectionShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      uniform sampler2D uVelocity;\r
      uniform sampler2D uSource;\r
      uniform vec2 texelSize;\r
      uniform vec2 dyeTexelSize;\r
      uniform float dt;\r
      uniform float dissipation;\r
\r
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\r
          vec2 st = uv / tsize - 0.5;\r
          vec2 iuv = floor(st);\r
          vec2 fuv = fract(st);\r
\r
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\r
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\r
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\r
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\r
\r
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\r
      }\r
\r
      void main () {\r
          #ifdef MANUAL_FILTERING\r
              vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\r
              vec4 result = bilerp(uSource, coord, dyeTexelSize);\r
          #else\r
              vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\r
              vec4 result = texture2D(uSource, coord);\r
          #endif\r
          float decay = 1.0 + dissipation * dt;\r
          gl_FragColor = result / decay;\r
      }\r
    \`,\r
      ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']\r
    );\r
\r
    const divergenceShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      varying highp vec2 vL;\r
      varying highp vec2 vR;\r
      varying highp vec2 vT;\r
      varying highp vec2 vB;\r
      uniform sampler2D uVelocity;\r
\r
      void main () {\r
          float L = texture2D(uVelocity, vL).x;\r
          float R = texture2D(uVelocity, vR).x;\r
          float T = texture2D(uVelocity, vT).y;\r
          float B = texture2D(uVelocity, vB).y;\r
\r
          vec2 C = texture2D(uVelocity, vUv).xy;\r
          if (vL.x < 0.0) { L = -C.x; }\r
          if (vR.x > 1.0) { R = -C.x; }\r
          if (vT.y > 1.0) { T = -C.y; }\r
          if (vB.y < 0.0) { B = -C.y; }\r
\r
          float div = 0.5 * (R - L + T - B);\r
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const curlShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      varying highp vec2 vL;\r
      varying highp vec2 vR;\r
      varying highp vec2 vT;\r
      varying highp vec2 vB;\r
      uniform sampler2D uVelocity;\r
\r
      void main () {\r
          float L = texture2D(uVelocity, vL).y;\r
          float R = texture2D(uVelocity, vR).y;\r
          float T = texture2D(uVelocity, vT).x;\r
          float B = texture2D(uVelocity, vB).x;\r
          float vorticity = R - L - T + B;\r
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const vorticityShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision highp float;\r
      precision highp sampler2D;\r
      varying vec2 vUv;\r
      varying vec2 vL;\r
      varying vec2 vR;\r
      varying vec2 vT;\r
      varying vec2 vB;\r
      uniform sampler2D uVelocity;\r
      uniform sampler2D uCurl;\r
      uniform float curl;\r
      uniform float dt;\r
\r
      void main () {\r
          float L = texture2D(uCurl, vL).x;\r
          float R = texture2D(uCurl, vR).x;\r
          float T = texture2D(uCurl, vT).x;\r
          float B = texture2D(uCurl, vB).x;\r
          float C = texture2D(uCurl, vUv).x;\r
\r
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\r
          force /= length(force) + 0.0001;\r
          force *= curl * C;\r
          force.y *= -1.0;\r
\r
          vec2 velocity = texture2D(uVelocity, vUv).xy;\r
          velocity += force * dt;\r
          velocity = min(max(velocity, -1000.0), 1000.0);\r
          gl_FragColor = vec4(velocity, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const pressureShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      varying highp vec2 vL;\r
      varying highp vec2 vR;\r
      varying highp vec2 vT;\r
      varying highp vec2 vB;\r
      uniform sampler2D uPressure;\r
      uniform sampler2D uDivergence;\r
\r
      void main () {\r
          float L = texture2D(uPressure, vL).x;\r
          float R = texture2D(uPressure, vR).x;\r
          float T = texture2D(uPressure, vT).x;\r
          float B = texture2D(uPressure, vB).x;\r
          float C = texture2D(uPressure, vUv).x;\r
          float divergence = texture2D(uDivergence, vUv).x;\r
          float pressure = (L + R + B + T - divergence) * 0.25;\r
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const gradientSubtractShader = compileShader(\r
      gl.FRAGMENT_SHADER,\r
      \`\r
      precision mediump float;\r
      precision mediump sampler2D;\r
      varying highp vec2 vUv;\r
      varying highp vec2 vL;\r
      varying highp vec2 vR;\r
      varying highp vec2 vT;\r
      varying highp vec2 vB;\r
      uniform sampler2D uPressure;\r
      uniform sampler2D uVelocity;\r
\r
      void main () {\r
          float L = texture2D(uPressure, vL).x;\r
          float R = texture2D(uPressure, vR).x;\r
          float T = texture2D(uPressure, vT).x;\r
          float B = texture2D(uPressure, vB).x;\r
          vec2 velocity = texture2D(uVelocity, vUv).xy;\r
          velocity.xy -= vec2(R - L, T - B);\r
          gl_FragColor = vec4(velocity, 0.0, 1.0);\r
      }\r
    \`\r
    );\r
\r
    const blit = (() => {\r
      const buffer = gl.createBuffer()!;\r
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\r
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);\r
      const elemBuffer = gl.createBuffer()!;\r
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemBuffer);\r
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);\r
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);\r
      gl.enableVertexAttribArray(0);\r
\r
      return (target: FBO | null, doClear = false) => {\r
        if (!gl) return;\r
        if (!target) {\r
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);\r
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);\r
        } else {\r
          gl.viewport(0, 0, target.width, target.height);\r
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);\r
        }\r
        if (doClear) {\r
          gl.clearColor(0, 0, 0, 1);\r
          gl.clear(gl.COLOR_BUFFER_BIT);\r
        }\r
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);\r
      };\r
    })();\r
\r
    interface FBO {\r
      texture: WebGLTexture;\r
      fbo: WebGLFramebuffer;\r
      width: number;\r
      height: number;\r
      texelSizeX: number;\r
      texelSizeY: number;\r
      attach: (id: number) => number;\r
    }\r
\r
    interface DoubleFBO {\r
      width: number;\r
      height: number;\r
      texelSizeX: number;\r
      texelSizeY: number;\r
      read: FBO;\r
      write: FBO;\r
      swap: () => void;\r
    }\r
\r
    let dye: DoubleFBO;\r
    let velocity: DoubleFBO;\r
    let divergence: FBO;\r
    let curl: FBO;\r
    let pressure: DoubleFBO;\r
\r
    const copyProgram = new Program(baseVertexShader, copyShader);\r
    const clearProgram = new Program(baseVertexShader, clearShader);\r
    const splatProgram = new Program(baseVertexShader, splatShader);\r
    const advectionProgram = new Program(baseVertexShader, advectionShader);\r
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);\r
    const curlProgram = new Program(baseVertexShader, curlShader);\r
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);\r
    const pressureProgram = new Program(baseVertexShader, pressureShader);\r
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);\r
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);\r
\r
    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {\r
      gl.activeTexture(gl.TEXTURE0);\r
      const texture = gl.createTexture()!;\r
      gl.bindTexture(gl.TEXTURE_2D, texture);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\r
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);\r
      const fbo = gl.createFramebuffer()!;\r
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);\r
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);\r
      gl.viewport(0, 0, w, h);\r
      gl.clear(gl.COLOR_BUFFER_BIT);\r
\r
      const texelSizeX = 1 / w;\r
      const texelSizeY = 1 / h;\r
\r
      return {\r
        texture,\r
        fbo,\r
        width: w,\r
        height: h,\r
        texelSizeX,\r
        texelSizeY,\r
        attach(id: number) {\r
          gl.activeTexture(gl.TEXTURE0 + id);\r
          gl.bindTexture(gl.TEXTURE_2D, texture);\r
          return id;\r
        }\r
      };\r
    }\r
\r
    function createDoubleFBO(\r
      w: number,\r
      h: number,\r
      internalFormat: number,\r
      format: number,\r
      type: number,\r
      param: number\r
    ): DoubleFBO {\r
      const fbo1 = createFBO(w, h, internalFormat, format, type, param);\r
      const fbo2 = createFBO(w, h, internalFormat, format, type, param);\r
      return {\r
        width: w,\r
        height: h,\r
        texelSizeX: fbo1.texelSizeX,\r
        texelSizeY: fbo1.texelSizeY,\r
        read: fbo1,\r
        write: fbo2,\r
        swap() {\r
          const tmp = this.read;\r
          this.read = this.write;\r
          this.write = tmp;\r
        }\r
      };\r
    }\r
\r
    function resizeFBO(\r
      target: FBO,\r
      w: number,\r
      h: number,\r
      internalFormat: number,\r
      format: number,\r
      type: number,\r
      param: number\r
    ) {\r
      const newFBO = createFBO(w, h, internalFormat, format, type, param);\r
      copyProgram.bind();\r
      if (copyProgram.uniforms.uTexture) gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));\r
      blit(newFBO, false);\r
      return newFBO;\r
    }\r
\r
    function resizeDoubleFBO(\r
      target: DoubleFBO,\r
      w: number,\r
      h: number,\r
      internalFormat: number,\r
      format: number,\r
      type: number,\r
      param: number\r
    ) {\r
      if (target.width === w && target.height === h) return target;\r
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);\r
      target.write = createFBO(w, h, internalFormat, format, type, param);\r
      target.width = w;\r
      target.height = h;\r
      target.texelSizeX = 1 / w;\r
      target.texelSizeY = 1 / h;\r
      return target;\r
    }\r
\r
    function initFramebuffers() {\r
      const simRes = getResolution(config.SIM_RESOLUTION!);\r
      const dyeRes = getResolution(config.DYE_RESOLUTION!);\r
\r
      const texType = ext.halfFloatTexType;\r
      const rgba = ext.formatRGBA;\r
      const rg = ext.formatRG;\r
      const r = ext.formatR;\r
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;\r
      gl.disable(gl.BLEND);\r
\r
      if (!dye) {\r
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);\r
      } else {\r
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);\r
      }\r
\r
      if (!velocity) {\r
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);\r
      } else {\r
        velocity = resizeDoubleFBO(\r
          velocity,\r
          simRes.width,\r
          simRes.height,\r
          rg.internalFormat,\r
          rg.format,\r
          texType,\r
          filtering\r
        );\r
      }\r
\r
      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);\r
    }\r
\r
    function updateKeywords() {\r
      const displayKeywords: string[] = [];\r
      if (config.SHADING) displayKeywords.push('SHADING');\r
      displayMaterial.setKeywords(displayKeywords);\r
    }\r
\r
    function getResolution(resolution: number) {\r
      const w = gl.drawingBufferWidth;\r
      const h = gl.drawingBufferHeight;\r
      const aspectRatio = w / h;\r
      let aspect = aspectRatio < 1 ? 1 / aspectRatio : aspectRatio;\r
      const min = Math.round(resolution);\r
      const max = Math.round(resolution * aspect);\r
      if (w > h) {\r
        return { width: max, height: min };\r
      }\r
      return { width: min, height: max };\r
    }\r
\r
    function scaleByPixelRatio(input: number) {\r
      const pixelRatio = window.devicePixelRatio || 1;\r
      return Math.floor(input * pixelRatio);\r
    }\r
\r
    updateKeywords();\r
    initFramebuffers();\r
\r
    let lastUpdateTime = Date.now();\r
    let colorUpdateTimer = 0.0;\r
\r
    function updateFrame() {\r
      const dt = calcDeltaTime();\r
      if (resizeCanvas()) initFramebuffers();\r
      updateColors(dt);\r
      applyInputs();\r
      step(dt);\r
      render(null);\r
      requestAnimationFrame(updateFrame);\r
    }\r
\r
    function calcDeltaTime() {\r
      const now = Date.now();\r
      let dt = (now - lastUpdateTime) / 1000;\r
      dt = Math.min(dt, 0.016666);\r
      lastUpdateTime = now;\r
      return dt;\r
    }\r
\r
    function resizeCanvas() {\r
      const width = scaleByPixelRatio(canvas!.clientWidth);\r
      const height = scaleByPixelRatio(canvas!.clientHeight);\r
      if (canvas!.width !== width || canvas!.height !== height) {\r
        canvas!.width = width;\r
        canvas!.height = height;\r
        return true;\r
      }\r
      return false;\r
    }\r
\r
    function updateColors(dt: number) {\r
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;\r
      if (colorUpdateTimer >= 1) {\r
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);\r
        pointers.forEach(p => {\r
          p.color = generateColor();\r
        });\r
      }\r
    }\r
\r
    function applyInputs() {\r
      for (const p of pointers) {\r
        if (p.moved) {\r
          p.moved = false;\r
          splatPointer(p);\r
        }\r
      }\r
    }\r
\r
    function step(dt: number) {\r
      gl.disable(gl.BLEND);\r
\r
      curlProgram.bind();\r
      if (curlProgram.uniforms.texelSize) {\r
        gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (curlProgram.uniforms.uVelocity) {\r
        gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      }\r
      blit(curl);\r
\r
      vorticityProgram.bind();\r
      if (vorticityProgram.uniforms.texelSize) {\r
        gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (vorticityProgram.uniforms.uVelocity) {\r
        gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      }\r
      if (vorticityProgram.uniforms.uCurl) {\r
        gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));\r
      }\r
      if (vorticityProgram.uniforms.curl) {\r
        gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);\r
      }\r
      if (vorticityProgram.uniforms.dt) {\r
        gl.uniform1f(vorticityProgram.uniforms.dt, dt);\r
      }\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      divergenceProgram.bind();\r
      if (divergenceProgram.uniforms.texelSize) {\r
        gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (divergenceProgram.uniforms.uVelocity) {\r
        gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      }\r
      blit(divergence);\r
\r
      clearProgram.bind();\r
      if (clearProgram.uniforms.uTexture) {\r
        gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));\r
      }\r
      if (clearProgram.uniforms.value) {\r
        gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);\r
      }\r
      blit(pressure.write);\r
      pressure.swap();\r
\r
      pressureProgram.bind();\r
      if (pressureProgram.uniforms.texelSize) {\r
        gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (pressureProgram.uniforms.uDivergence) {\r
        gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));\r
      }\r
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {\r
        if (pressureProgram.uniforms.uPressure) {\r
          gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));\r
        }\r
        blit(pressure.write);\r
        pressure.swap();\r
      }\r
\r
      gradienSubtractProgram.bind();\r
      if (gradienSubtractProgram.uniforms.texelSize) {\r
        gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (gradienSubtractProgram.uniforms.uPressure) {\r
        gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));\r
      }\r
      if (gradienSubtractProgram.uniforms.uVelocity) {\r
        gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));\r
      }\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      advectionProgram.bind();\r
      if (advectionProgram.uniforms.texelSize) {\r
        gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {\r
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);\r
      }\r
      const velocityId = velocity.read.attach(0);\r
      if (advectionProgram.uniforms.uVelocity) {\r
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);\r
      }\r
      if (advectionProgram.uniforms.uSource) {\r
        gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);\r
      }\r
      if (advectionProgram.uniforms.dt) {\r
        gl.uniform1f(advectionProgram.uniforms.dt, dt);\r
      }\r
      if (advectionProgram.uniforms.dissipation) {\r
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);\r
      }\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {\r
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);\r
      }\r
      if (advectionProgram.uniforms.uVelocity) {\r
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));\r
      }\r
      if (advectionProgram.uniforms.uSource) {\r
        gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));\r
      }\r
      if (advectionProgram.uniforms.dissipation) {\r
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);\r
      }\r
      blit(dye.write);\r
      dye.swap();\r
    }\r
\r
    function render(target: FBO | null) {\r
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);\r
      gl.enable(gl.BLEND);\r
      drawDisplay(target);\r
    }\r
\r
    function drawDisplay(target: FBO | null) {\r
      const width = target ? target.width : gl.drawingBufferWidth;\r
      const height = target ? target.height : gl.drawingBufferHeight;\r
      displayMaterial.bind();\r
      if (config.SHADING && displayMaterial.uniforms.texelSize) {\r
        gl.uniform2f(displayMaterial.uniforms.texelSize, 1 / width, 1 / height);\r
      }\r
      if (displayMaterial.uniforms.uTexture) {\r
        gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));\r
      }\r
      blit(target, false);\r
    }\r
\r
    function splatPointer(pointer: Pointer) {\r
      const dx = pointer.deltaX * config.SPLAT_FORCE;\r
      const dy = pointer.deltaY * config.SPLAT_FORCE;\r
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);\r
    }\r
\r
    function clickSplat(pointer: Pointer) {\r
      const color = generateColor();\r
      color.r *= 10;\r
      color.g *= 10;\r
      color.b *= 10;\r
      const dx = 10 * (Math.random() - 0.5);\r
      const dy = 30 * (Math.random() - 0.5);\r
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);\r
    }\r
\r
    function splat(x: number, y: number, dx: number, dy: number, color: ColorRGB) {\r
      splatProgram.bind();\r
      if (splatProgram.uniforms.uTarget) {\r
        gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));\r
      }\r
      if (splatProgram.uniforms.aspectRatio) {\r
        gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas!.width / canvas!.height);\r
      }\r
      if (splatProgram.uniforms.point) {\r
        gl.uniform2f(splatProgram.uniforms.point, x, y);\r
      }\r
      if (splatProgram.uniforms.color) {\r
        gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0);\r
      }\r
      if (splatProgram.uniforms.radius) {\r
        gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100)!);\r
      }\r
      blit(velocity.write);\r
      velocity.swap();\r
\r
      if (splatProgram.uniforms.uTarget) {\r
        gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));\r
      }\r
      if (splatProgram.uniforms.color) {\r
        gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);\r
      }\r
      blit(dye.write);\r
      dye.swap();\r
    }\r
\r
    function correctRadius(radius: number) {\r
      const aspectRatio = canvas!.width / canvas!.height;\r
      if (aspectRatio > 1) radius *= aspectRatio;\r
      return radius;\r
    }\r
\r
    function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {\r
      pointer.id = id;\r
      pointer.down = true;\r
      pointer.moved = false;\r
      pointer.texcoordX = posX / canvas!.width;\r
      pointer.texcoordY = 1 - posY / canvas!.height;\r
      pointer.prevTexcoordX = pointer.texcoordX;\r
      pointer.prevTexcoordY = pointer.texcoordY;\r
      pointer.deltaX = 0;\r
      pointer.deltaY = 0;\r
      pointer.color = generateColor();\r
    }\r
\r
    function updatePointerMoveData(pointer: Pointer, posX: number, posY: number, color: ColorRGB) {\r
      pointer.prevTexcoordX = pointer.texcoordX;\r
      pointer.prevTexcoordY = pointer.texcoordY;\r
      pointer.texcoordX = posX / canvas!.width;\r
      pointer.texcoordY = 1 - posY / canvas!.height;\r
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX)!;\r
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY)!;\r
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;\r
      pointer.color = color;\r
    }\r
\r
    function updatePointerUpData(pointer: Pointer) {\r
      pointer.down = false;\r
    }\r
\r
    function correctDeltaX(delta: number) {\r
      const aspectRatio = canvas!.width / canvas!.height;\r
      if (aspectRatio < 1) delta *= aspectRatio;\r
      return delta;\r
    }\r
\r
    function correctDeltaY(delta: number) {\r
      const aspectRatio = canvas!.width / canvas!.height;\r
      if (aspectRatio > 1) delta /= aspectRatio;\r
      return delta;\r
    }\r
\r
    function generateColor(): ColorRGB {\r
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);\r
      c.r *= 0.15;\r
      c.g *= 0.15;\r
      c.b *= 0.15;\r
      return c;\r
    }\r
\r
    function HSVtoRGB(h: number, s: number, v: number): ColorRGB {\r
      let r = 0,\r
        g = 0,\r
        b = 0;\r
      const i = Math.floor(h * 6);\r
      const f = h * 6 - i;\r
      const p = v * (1 - s);\r
      const q = v * (1 - f * s);\r
      const t = v * (1 - (1 - f) * s);\r
\r
      switch (i % 6) {\r
        case 0:\r
          r = v;\r
          g = t;\r
          b = p;\r
          break;\r
        case 1:\r
          r = q;\r
          g = v;\r
          b = p;\r
          break;\r
        case 2:\r
          r = p;\r
          g = v;\r
          b = t;\r
          break;\r
        case 3:\r
          r = p;\r
          g = q;\r
          b = v;\r
          break;\r
        case 4:\r
          r = t;\r
          g = p;\r
          b = v;\r
          break;\r
        case 5:\r
          r = v;\r
          g = p;\r
          b = q;\r
          break;\r
      }\r
      return { r, g, b };\r
    }\r
\r
    function wrap(value: number, min: number, max: number) {\r
      const range = max - min;\r
      if (range === 0) return min;\r
      return ((value - min) % range) + min;\r
    }\r
\r
    window.addEventListener('mousedown', e => {\r
      const pointer = pointers[0];\r
      const posX = scaleByPixelRatio(e.clientX);\r
      const posY = scaleByPixelRatio(e.clientY);\r
      updatePointerDownData(pointer, -1, posX, posY);\r
      clickSplat(pointer);\r
    });\r
\r
    function handleFirstMouseMove(e: MouseEvent) {\r
      const pointer = pointers[0];\r
      const posX = scaleByPixelRatio(e.clientX);\r
      const posY = scaleByPixelRatio(e.clientY);\r
      const color = generateColor();\r
      updateFrame();\r
      updatePointerMoveData(pointer, posX, posY, color);\r
      document.body.removeEventListener('mousemove', handleFirstMouseMove);\r
    }\r
    document.body.addEventListener('mousemove', handleFirstMouseMove);\r
\r
    window.addEventListener('mousemove', e => {\r
      const pointer = pointers[0];\r
      const posX = scaleByPixelRatio(e.clientX);\r
      const posY = scaleByPixelRatio(e.clientY);\r
      const color = pointer.color;\r
      updatePointerMoveData(pointer, posX, posY, color);\r
    });\r
\r
    function handleFirstTouchStart(e: TouchEvent) {\r
      const touches = e.targetTouches;\r
      const pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        const posX = scaleByPixelRatio(touches[i].clientX);\r
        const posY = scaleByPixelRatio(touches[i].clientY);\r
        updateFrame();\r
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);\r
      }\r
      document.body.removeEventListener('touchstart', handleFirstTouchStart);\r
    }\r
    document.body.addEventListener('touchstart', handleFirstTouchStart);\r
\r
    window.addEventListener(\r
      'touchstart',\r
      e => {\r
        const touches = e.targetTouches;\r
        const pointer = pointers[0];\r
        for (let i = 0; i < touches.length; i++) {\r
          const posX = scaleByPixelRatio(touches[i].clientX);\r
          const posY = scaleByPixelRatio(touches[i].clientY);\r
          updatePointerDownData(pointer, touches[i].identifier, posX, posY);\r
        }\r
      },\r
      false\r
    );\r
\r
    window.addEventListener(\r
      'touchmove',\r
      e => {\r
        const touches = e.targetTouches;\r
        const pointer = pointers[0];\r
        for (let i = 0; i < touches.length; i++) {\r
          const posX = scaleByPixelRatio(touches[i].clientX);\r
          const posY = scaleByPixelRatio(touches[i].clientY);\r
          updatePointerMoveData(pointer, posX, posY, pointer.color);\r
        }\r
      },\r
      false\r
    );\r
\r
    window.addEventListener('touchend', e => {\r
      const touches = e.changedTouches;\r
      const pointer = pointers[0];\r
      for (let i = 0; i < touches.length; i++) {\r
        updatePointerUpData(pointer);\r
      }\r
    });\r
  }, [\r
    SIM_RESOLUTION,\r
    DYE_RESOLUTION,\r
    CAPTURE_RESOLUTION,\r
    DENSITY_DISSIPATION,\r
    VELOCITY_DISSIPATION,\r
    PRESSURE,\r
    PRESSURE_ITERATIONS,\r
    CURL,\r
    SPLAT_RADIUS,\r
    SPLAT_FORCE,\r
    SHADING,\r
    COLOR_UPDATE_SPEED,\r
    BACK_COLOR,\r
    TRANSPARENT\r
  ]);\r
\r
  return (\r
    <div className="fixed top-0 left-0 z-50 pointer-events-none w-full h-full">\r
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen block"></canvas>\r
    </div>\r
  );\r
}\r
`,ie={usage:`import SplashCursor from './SplashCursor'

<SplashCursor />`,code:ee,tailwind:ne,tsCode:te,tsTailwind:oe},se=()=>{const _=[{name:"SIM_RESOLUTION",type:"number",default:128,description:"Fluid simulation resolution for velocity fields."},{name:"DYE_RESOLUTION",type:"number",default:1440,description:"Resolution of the color/dye texture."},{name:"CAPTURE_RESOLUTION",type:"number",default:512,description:"Resolution used for certain capture operations (rarely changed)."},{name:"DENSITY_DISSIPATION",type:"number",default:3.5,description:"Rate at which color/density dissipates over time."},{name:"VELOCITY_DISSIPATION",type:"number",default:2,description:"Rate at which velocity dissipates over time."},{name:"PRESSURE",type:"number",default:.1,description:"Base pressure for the fluid simulation."},{name:"PRESSURE_ITERATIONS",type:"number",default:20,description:"Number of Jacobi iterations used for the pressure solver."},{name:"CURL",type:"number",default:3,description:"Amount of vorticity/curl to apply for swirling effects."},{name:"SPLAT_RADIUS",type:"number",default:.2,description:"Radius of the 'splat' effect when user interacts."},{name:"SPLAT_FORCE",type:"number",default:6e3,description:"Force of the fluid 'splat' on each interaction."},{name:"SHADING",type:"boolean",default:!0,description:"Toggles simple lighting/shading on the fluid."},{name:"COLOR_UPDATE_SPEED",type:"number",default:10,description:"Frequency at which pointer colors are re-randomized."},{name:"BACK_COLOR",type:"object",default:"{ r: 0.5, g: 0, b: 0 }",description:"Base background color for the fluid. Not always used if TRANSPARENT is true."},{name:"TRANSPARENT",type:"boolean",default:!0,description:"Determines if the canvas background should be rendered with alpha."}];return p.jsxs(p.Fragment,{children:[p.jsxs(jr,{children:[p.jsxs($r,{children:[p.jsx(Kr,{overflow:"hidden",justifyContent:"center",flexDirection:"column",minH:300,p:0,alignItems:"center",className:"demo-container",position:"relative",zIndex:10,children:p.jsx(qr,{fontSize:"3rem",textAlign:"center",color:"#271E37",fontWeight:900,userSelect:"none",children:"Move Your Cursor"})}),p.jsx(Jr,{data:_})]}),p.jsx(Qr,{children:p.jsx(Zr,{codeObject:ie})})]}),p.jsx(re,{})]})};export{se as default};
