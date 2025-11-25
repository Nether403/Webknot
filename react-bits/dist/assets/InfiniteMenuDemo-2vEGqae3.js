var yr=Object.defineProperty;var lr=r=>{throw TypeError(r)};var Mr=(r,n,t)=>n in r?yr(r,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[n]=t;var R=(r,n,t)=>Mr(r,typeof n!="symbol"?n+"":n,t),tr=(r,n,t)=>n.has(r)||lr("Cannot "+t);var L=(r,n,t)=>(tr(r,n,"read from private field"),t?t.call(r):n.get(r)),C=(r,n,t)=>n.has(r)?lr("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(r):n.set(r,t),H=(r,n,t,e)=>(tr(r,n,"write to private field"),e?e.call(r,t):n.set(r,t),t),S=(r,n,t)=>(tr(r,n,"access private method"),t);import{r as V,j as P,B as hr,bW as _r}from"./index-wsKSLPNH.js";import{T as Fr,P as wr,a as Dr,C as Lr,b as Cr}from"./PropTable-C4uPWs8h.js";import{D as Vr}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";var zr=1e-6,y=typeof Float32Array<"u"?Float32Array:Array;function Ur(){var r=new y(9);return y!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[5]=0,r[6]=0,r[7]=0),r[0]=1,r[4]=1,r[8]=1,r}function _(){var r=new y(16);return y!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=0,r[12]=0,r[13]=0,r[14]=0),r[0]=1,r[5]=1,r[10]=1,r[15]=1,r}function Nr(r,n){return r[0]=n[0],r[1]=n[1],r[2]=n[2],r[3]=n[3],r[4]=n[4],r[5]=n[5],r[6]=n[6],r[7]=n[7],r[8]=n[8],r[9]=n[9],r[10]=n[10],r[11]=n[11],r[12]=n[12],r[13]=n[13],r[14]=n[14],r[15]=n[15],r}function mr(r,n){var t=n[0],e=n[1],i=n[2],a=n[3],s=n[4],o=n[5],c=n[6],h=n[7],l=n[8],m=n[9],u=n[10],d=n[11],g=n[12],v=n[13],f=n[14],E=n[15],M=t*o-e*s,p=t*c-i*s,x=t*h-a*s,A=e*c-i*o,b=e*h-a*o,G=i*h-a*c,q=l*v-m*g,W=l*f-u*g,O=l*E-d*g,k=m*f-u*v,Y=m*E-d*v,j=u*E-d*f,T=M*j-p*Y+x*k+A*O-b*W+G*q;return T?(T=1/T,r[0]=(o*j-c*Y+h*k)*T,r[1]=(i*Y-e*j-a*k)*T,r[2]=(v*G-f*b+E*A)*T,r[3]=(u*b-m*G-d*A)*T,r[4]=(c*O-s*j-h*W)*T,r[5]=(t*j-i*O+a*W)*T,r[6]=(f*x-g*G-E*p)*T,r[7]=(l*G-u*x+d*p)*T,r[8]=(s*Y-o*O+h*q)*T,r[9]=(e*O-t*Y-a*q)*T,r[10]=(g*b-v*x+E*M)*T,r[11]=(m*x-l*b-d*M)*T,r[12]=(o*W-s*k-c*q)*T,r[13]=(t*k-e*W+i*q)*T,r[14]=(v*p-g*A-f*M)*T,r[15]=(l*A-m*p+u*M)*T,r):null}function J(r,n,t){var e=n[0],i=n[1],a=n[2],s=n[3],o=n[4],c=n[5],h=n[6],l=n[7],m=n[8],u=n[9],d=n[10],g=n[11],v=n[12],f=n[13],E=n[14],M=n[15],p=t[0],x=t[1],A=t[2],b=t[3];return r[0]=p*e+x*o+A*m+b*v,r[1]=p*i+x*c+A*u+b*f,r[2]=p*a+x*h+A*d+b*E,r[3]=p*s+x*l+A*g+b*M,p=t[4],x=t[5],A=t[6],b=t[7],r[4]=p*e+x*o+A*m+b*v,r[5]=p*i+x*c+A*u+b*f,r[6]=p*a+x*h+A*d+b*E,r[7]=p*s+x*l+A*g+b*M,p=t[8],x=t[9],A=t[10],b=t[11],r[8]=p*e+x*o+A*m+b*v,r[9]=p*i+x*c+A*u+b*f,r[10]=p*a+x*h+A*d+b*E,r[11]=p*s+x*l+A*g+b*M,p=t[12],x=t[13],A=t[14],b=t[15],r[12]=p*e+x*o+A*m+b*v,r[13]=p*i+x*c+A*u+b*f,r[14]=p*a+x*h+A*d+b*E,r[15]=p*s+x*l+A*g+b*M,r}function ur(r,n){return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=n[0],r[13]=n[1],r[14]=n[2],r[15]=1,r}function Br(r,n){return r[0]=n[0],r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=n[1],r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=n[2],r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function Gr(r,n,t,e,i){var a=1/Math.tan(n/2);if(r[0]=a/t,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=a,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=-1,r[12]=0,r[13]=0,r[15]=0,i!=null&&i!==1/0){var s=1/(e-i);r[10]=(i+e)*s,r[14]=2*i*e*s}else r[10]=-1,r[14]=-2*e;return r}var qr=Gr;function dr(r,n,t,e){var i=n[0],a=n[1],s=n[2],o=e[0],c=e[1],h=e[2],l=i-t[0],m=a-t[1],u=s-t[2],d=l*l+m*m+u*u;d>0&&(d=1/Math.sqrt(d),l*=d,m*=d,u*=d);var g=c*u-h*m,v=h*l-o*u,f=o*m-c*l;return d=g*g+v*v+f*f,d>0&&(d=1/Math.sqrt(d),g*=d,v*=d,f*=d),r[0]=g,r[1]=v,r[2]=f,r[3]=0,r[4]=m*f-u*v,r[5]=u*g-l*f,r[6]=l*v-m*g,r[7]=0,r[8]=l,r[9]=m,r[10]=u,r[11]=0,r[12]=i,r[13]=a,r[14]=s,r[15]=1,r}function F(){var r=new y(3);return y!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0),r}function Wr(r){var n=r[0],t=r[1],e=r[2];return Math.sqrt(n*n+t*t+e*e)}function D(r,n,t){var e=new y(3);return e[0]=r,e[1]=n,e[2]=t,e}function Or(r,n,t){return r[0]=n[0]*t,r[1]=n[1]*t,r[2]=n[2]*t,r}function kr(r,n){var t=n[0]-r[0],e=n[1]-r[1],i=n[2]-r[2];return t*t+e*e+i*i}function Yr(r,n){return r[0]=-n[0],r[1]=-n[1],r[2]=-n[2],r}function z(r,n){var t=n[0],e=n[1],i=n[2],a=t*t+e*e+i*i;return a>0&&(a=1/Math.sqrt(a)),r[0]=n[0]*a,r[1]=n[1]*a,r[2]=n[2]*a,r}function cr(r,n){return r[0]*n[0]+r[1]*n[1]+r[2]*n[2]}function rr(r,n,t){var e=n[0],i=n[1],a=n[2],s=t[0],o=t[1],c=t[2];return r[0]=i*c-a*o,r[1]=a*s-e*c,r[2]=e*o-i*s,r}function er(r,n,t){var e=t[0],i=t[1],a=t[2],s=t[3],o=n[0],c=n[1],h=n[2],l=i*h-a*c,m=a*o-e*h,u=e*c-i*o;return l=l+l,m=m+m,u=u+u,r[0]=o+s*l+i*u-a*m,r[1]=c+s*m+a*l-e*u,r[2]=h+s*u+e*m-i*l,r}var jr=Wr;(function(){var r=F();return function(n,t,e,i,a,s){var o,c;for(t||(t=3),e||(e=0),i?c=Math.min(i*t+e,n.length):c=n.length,o=e;o<c;o+=t)r[0]=n[o],r[1]=n[o+1],r[2]=n[o+2],a(r,r,s),n[o]=r[0],n[o+1]=r[1],n[o+2]=r[2];return n}})();function Hr(){var r=new y(4);return y!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0,r[3]=0),r}function Xr(r,n){var t=n[0],e=n[1],i=n[2],a=n[3],s=t*t+e*e+i*i+a*a;return s>0&&(s=1/Math.sqrt(s)),r[0]=t*s,r[1]=e*s,r[2]=i*s,r[3]=a*s,r}(function(){var r=Hr();return function(n,t,e,i,a,s){var o,c;for(t||(t=4),e||(e=0),i?c=Math.min(i*t+e,n.length):c=n.length,o=e;o<c;o+=t)r[0]=n[o],r[1]=n[o+1],r[2]=n[o+2],r[3]=n[o+3],a(r,r,s),n[o]=r[0],n[o+1]=r[1],n[o+2]=r[2],n[o+3]=r[3];return n}})();function w(){var r=new y(4);return y!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0),r[3]=1,r}function pr(r,n,t){t=t*.5;var e=Math.sin(t);return r[0]=e*n[0],r[1]=e*n[1],r[2]=e*n[2],r[3]=Math.cos(t),r}function gr(r,n,t){var e=n[0],i=n[1],a=n[2],s=n[3],o=t[0],c=t[1],h=t[2],l=t[3];return r[0]=e*l+s*o+i*h-a*c,r[1]=i*l+s*c+a*o-e*h,r[2]=a*l+s*h+e*c-i*o,r[3]=s*l-e*o-i*c-a*h,r}function U(r,n,t,e){var i=n[0],a=n[1],s=n[2],o=n[3],c=t[0],h=t[1],l=t[2],m=t[3],u,d,g,v,f;return d=i*c+a*h+s*l+o*m,d<0&&(d=-d,c=-c,h=-h,l=-l,m=-m),1-d>zr?(u=Math.acos(d),g=Math.sin(u),v=Math.sin((1-e)*u)/g,f=Math.sin(e*u)/g):(v=1-e,f=e),r[0]=v*i+f*c,r[1]=v*a+f*h,r[2]=v*s+f*l,r[3]=v*o+f*m,r}function Qr(r,n){return r[0]=-n[0],r[1]=-n[1],r[2]=-n[2],r[3]=n[3],r}function $r(r,n){var t=n[0]+n[4]+n[8],e;if(t>0)e=Math.sqrt(t+1),r[3]=.5*e,e=.5/e,r[0]=(n[5]-n[7])*e,r[1]=(n[6]-n[2])*e,r[2]=(n[1]-n[3])*e;else{var i=0;n[4]>n[0]&&(i=1),n[8]>n[i*3+i]&&(i=2);var a=(i+1)%3,s=(i+2)%3;e=Math.sqrt(n[i*3+i]-n[a*3+a]-n[s*3+s]+1),r[i]=.5*e,e=.5/e,r[3]=(n[a*3+s]-n[s*3+a])*e,r[a]=(n[a*3+i]+n[i*3+a])*e,r[s]=(n[s*3+i]+n[i*3+s])*e}return r}var nr=Xr;(function(){var r=F(),n=D(1,0,0),t=D(0,1,0);return function(e,i,a){var s=cr(i,a);return s<-.999999?(rr(r,n,i),jr(r)<1e-6&&rr(r,t,i),z(r,r),pr(e,r,Math.PI),e):s>.999999?(e[0]=0,e[1]=0,e[2]=0,e[3]=1,e):(rr(r,i,a),e[0]=r[0],e[1]=r[1],e[2]=r[2],e[3]=1+s,nr(e,e))}})();(function(){var r=w(),n=w();return function(t,e,i,a,s,o){return U(r,e,s,o),U(n,i,a,o),U(t,r,n,2*o*(1-o)),t}})();(function(){var r=Ur();return function(n,t,e,i){return r[0]=e[0],r[3]=e[1],r[6]=e[2],r[1]=i[0],r[4]=i[1],r[7]=i[2],r[2]=-t[0],r[5]=-t[1],r[8]=-t[2],nr(n,$r(n,r))}})();function N(){var r=new y(2);return y!=Float32Array&&(r[0]=0,r[1]=0),r}function Kr(r){var n=new y(2);return n[0]=r[0],n[1]=r[1],n}function Zr(r,n){var t=new y(2);return t[0]=r,t[1]=n,t}function vr(r,n){return r[0]=n[0],r[1]=n[1],r}function ir(r,n,t){return r[0]=n,r[1]=t,r}function Jr(r,n,t){return r[0]=n[0]+t[0],r[1]=n[1]+t[1],r}function rn(r,n,t){return r[0]=n[0]-t[0],r[1]=n[1]-t[1],r}function nn(r,n,t){return r[0]=n[0]*t,r[1]=n[1]*t,r}function tn(r){var n=r[0],t=r[1];return n*n+t*t}var en=rn,an=tn;(function(){var r=N();return function(n,t,e,i,a,s){var o,c;for(t||(t=2),e||(e=0),i?c=Math.min(i*t+e,n.length):c=n.length,o=e;o<c;o+=t)r[0]=n[o],r[1]=n[o+1],a(r,r,s),n[o]=r[0],n[o+1]=r[1];return n}})();const sn=`#version 300 es

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);

    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);

    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`,on=`#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellsPerRow = uAtlasSize;
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;
    
    float scale = max(imageAspect / containerAspect, 
                     containerAspect / imageAspect);
    
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    
    st = clamp(st, 0.0, 1.0);
    
    st = st * cellSize + cellOffset;
    
    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}
`;class X{constructor(n,t,e){this.a=n,this.b=t,this.c=e}}class cn{constructor(n,t,e){this.position=D(n,t,e),this.normal=F(),this.uv=N()}}class xr{constructor(){this.vertices=[],this.faces=[]}addVertex(...n){for(let t=0;t<n.length;t+=3)this.vertices.push(new cn(n[t],n[t+1],n[t+2]));return this}addFace(...n){for(let t=0;t<n.length;t+=3)this.faces.push(new X(n[t],n[t+1],n[t+2]));return this}get lastVertex(){return this.vertices[this.vertices.length-1]}subdivide(n=1){const t={};let e=this.faces;for(let i=0;i<n;++i){const a=new Array(e.length*4);e.forEach((s,o)=>{const c=this.getMidPoint(s.a,s.b,t),h=this.getMidPoint(s.b,s.c,t),l=this.getMidPoint(s.c,s.a,t),m=o*4;a[m+0]=new X(s.a,c,l),a[m+1]=new X(s.b,h,c),a[m+2]=new X(s.c,l,h),a[m+3]=new X(c,h,l)}),e=a}return this.faces=e,this}spherize(n=1){return this.vertices.forEach(t=>{z(t.normal,t.position),Or(t.position,t.normal,n)}),this}get data(){return{vertices:this.vertexData,indices:this.indexData,normals:this.normalData,uvs:this.uvData}}get vertexData(){return new Float32Array(this.vertices.flatMap(n=>Array.from(n.position)))}get normalData(){return new Float32Array(this.vertices.flatMap(n=>Array.from(n.normal)))}get uvData(){return new Float32Array(this.vertices.flatMap(n=>Array.from(n.uv)))}get indexData(){return new Uint16Array(this.faces.flatMap(n=>[n.a,n.b,n.c]))}getMidPoint(n,t,e){const i=n<t?`k_${t}_${n}`:`k_${n}_${t}`;if(Object.prototype.hasOwnProperty.call(e,i))return e[i];const a=this.vertices[n].position,s=this.vertices[t].position,o=this.vertices.length;return e[i]=o,this.addVertex((a[0]+s[0])*.5,(a[1]+s[1])*.5,(a[2]+s[2])*.5),o}}class ln extends xr{constructor(){super();const n=Math.sqrt(5)*.5+.5;this.addVertex(-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1).addFace(0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1)}}class hn extends xr{constructor(n=4,t=1){super(),n=Math.max(4,n);const e=2*Math.PI/n;this.addVertex(0,0,0),this.lastVertex.uv[0]=.5,this.lastVertex.uv[1]=.5;for(let i=0;i<n;++i){const a=Math.cos(e*i),s=Math.sin(e*i);this.addVertex(t*a,t*s,0),this.lastVertex.uv[0]=a*.5+.5,this.lastVertex.uv[1]=s*.5+.5,i>0&&this.addFace(0,i,i+1)}this.addFace(0,n,1)}}function mn(r,n,t){const e=r.createShader(n);return r.shaderSource(e,t),r.compileShader(e),r.getShaderParameter(e,r.COMPILE_STATUS)?e:(console.error(r.getShaderInfoLog(e)),r.deleteShader(e),null)}function un(r,n,t,e){const i=r.createProgram();if([r.VERTEX_SHADER,r.FRAGMENT_SHADER].forEach((s,o)=>{const c=mn(r,s,n[o]);c&&r.attachShader(i,c)}),e)for(const s in e)r.bindAttribLocation(i,e[s],s);return r.linkProgram(i),r.getProgramParameter(i,r.LINK_STATUS)?i:(console.error(r.getProgramInfoLog(i)),r.deleteProgram(i),null)}function dn(r,n,t){const e=r.createVertexArray();r.bindVertexArray(e);for(const[i,a,s]of n)a!==-1&&(r.bindBuffer(r.ARRAY_BUFFER,i),r.enableVertexAttribArray(a),r.vertexAttribPointer(a,s,r.FLOAT,!1,0,0));if(t){const i=r.createBuffer();r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,i),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Uint16Array(t),r.STATIC_DRAW)}return r.bindVertexArray(null),e}function gn(r){const n=Math.min(2,window.devicePixelRatio),t=Math.round(r.clientWidth*n),e=Math.round(r.clientHeight*n),i=r.width!==t||r.height!==e;return i&&(r.width=t,r.height=e),i}function fr(r,n,t){const e=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,e),r.bufferData(r.ARRAY_BUFFER,n,t),r.bindBuffer(r.ARRAY_BUFFER,null),e}function vn(r,n,t,e,i){const a=r.createTexture();return r.bindTexture(r.TEXTURE_2D,a),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,e),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,i),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,t),a}var Q,ar;class fn{constructor(n,t){C(this,Q);R(this,"isPointerDown",!1);R(this,"orientation",w());R(this,"pointerRotation",w());R(this,"rotationVelocity",0);R(this,"rotationAxis",D(1,0,0));R(this,"snapDirection",D(0,0,-1));R(this,"snapTargetDirection");R(this,"EPSILON",.1);R(this,"IDENTITY_QUAT",w());this.canvas=n,this.updateCallback=t||(()=>null),this.pointerPos=N(),this.previousPointerPos=N(),this._rotationVelocity=0,this._combinedQuat=w(),n.addEventListener("pointerdown",e=>{ir(this.pointerPos,e.clientX,e.clientY),vr(this.previousPointerPos,this.pointerPos),this.isPointerDown=!0}),n.addEventListener("pointerup",()=>{this.isPointerDown=!1}),n.addEventListener("pointerleave",()=>{this.isPointerDown=!1}),n.addEventListener("pointermove",e=>{this.isPointerDown&&ir(this.pointerPos,e.clientX,e.clientY)}),n.style.touchAction="none"}update(n,t=16){const e=n/t+1e-5;let i=e,a=w();if(this.isPointerDown){const u=.3*e,d=5/e,g=en(N(),this.pointerPos,this.previousPointerPos);if(nn(g,g,u),an(g)>this.EPSILON){Jr(g,this.previousPointerPos,g);const v=S(this,Q,ar).call(this,g),f=S(this,Q,ar).call(this,this.previousPointerPos),E=z(F(),v),M=z(F(),f);vr(this.previousPointerPos,g),i*=d,this.quatFromVectors(E,M,this.pointerRotation,i)}else U(this.pointerRotation,this.pointerRotation,this.IDENTITY_QUAT,u)}else{const u=.1*e;if(U(this.pointerRotation,this.pointerRotation,this.IDENTITY_QUAT,u),this.snapTargetDirection){const g=this.snapTargetDirection,v=this.snapDirection,f=kr(g,v),E=Math.max(.1,1-f*10);i*=.2*E,this.quatFromVectors(g,v,a,i)}}const s=gr(w(),a,this.pointerRotation);this.orientation=gr(w(),s,this.orientation),nr(this.orientation,this.orientation);const o=.8*e;U(this._combinedQuat,this._combinedQuat,s,o),nr(this._combinedQuat,this._combinedQuat);const c=Math.acos(this._combinedQuat[3])*2,h=Math.sin(c/2);let l=0;h>1e-6&&(l=c/(2*Math.PI),this.rotationAxis[0]=this._combinedQuat[0]/h,this.rotationAxis[1]=this._combinedQuat[1]/h,this.rotationAxis[2]=this._combinedQuat[2]/h);const m=.5*e;this._rotationVelocity+=(l-this._rotationVelocity)*m,this.rotationVelocity=this._rotationVelocity/e,this.updateCallback(n)}quatFromVectors(n,t,e,i=1){const a=rr(F(),n,t);z(a,a);const s=Math.max(-1,Math.min(1,cr(n,t))),o=Math.acos(s)*i;return pr(e,a,o),{q:e,axis:a,angle:o}}}Q=new WeakSet,ar=function(n){const e=this.canvas.clientWidth,i=this.canvas.clientHeight,a=Math.max(e,i)-1,s=(2*n[0]-e-1)/a,o=(2*n[1]-i-1)/a;let c=0;const h=s*s+o*o,l=2*2;return h<=l/2?c=Math.sqrt(l-h):c=l/Math.sqrt(h),D(-s,o,c)};var $,B,K,Z,I,Ar,br,Ir,Tr,Pr,sr,or,Rr,Er,Sr;class pn{constructor(n,t,e,i,a=null){C(this,I);R(this,"TARGET_FRAME_DURATION",1e3/60);R(this,"SPHERE_RADIUS",2);C(this,$,0);C(this,B,0);C(this,K,0);C(this,Z,0);R(this,"camera",{matrix:_(),near:.1,far:40,fov:Math.PI/4,aspect:1,position:D(0,0,3),up:D(0,1,0),matrices:{view:_(),projection:_(),inversProjection:_()}});R(this,"nearestVertexIndex",null);R(this,"smoothRotationVelocity",0);R(this,"scaleFactor",1);R(this,"movementActive",!1);this.canvas=n,this.items=t||[],this.onActiveItemChange=e||(()=>{}),this.onMovementChange=i||(()=>{}),S(this,I,Ar).call(this,a)}resize(){this.viewportSize=ir(this.viewportSize||N(),this.canvas.clientWidth,this.canvas.clientHeight);const n=this.gl;gn(n.canvas)&&n.viewport(0,0,n.drawingBufferWidth,n.drawingBufferHeight),S(this,I,or).call(this,n)}run(n=0){H(this,B,Math.min(32,n-L(this,$))),H(this,$,n),H(this,K,L(this,B)/this.TARGET_FRAME_DURATION),H(this,Z,L(this,Z)+L(this,K)),S(this,I,Tr).call(this,L(this,B)),S(this,I,Pr).call(this),requestAnimationFrame(t=>this.run(t))}}$=new WeakMap,B=new WeakMap,K=new WeakMap,Z=new WeakMap,I=new WeakSet,Ar=function(n){this.gl=this.canvas.getContext("webgl2",{antialias:!0,alpha:!1});const t=this.gl;if(!t)throw new Error("No WebGL 2 context!");this.viewportSize=Zr(this.canvas.clientWidth,this.canvas.clientHeight),this.drawBufferSize=Kr(this.viewportSize),this.discProgram=un(t,[sn,on],null,{aModelPosition:0,aModelNormal:1,aModelUvs:2,aInstanceMatrix:3}),this.discLocations={aModelPosition:t.getAttribLocation(this.discProgram,"aModelPosition"),aModelUvs:t.getAttribLocation(this.discProgram,"aModelUvs"),aInstanceMatrix:t.getAttribLocation(this.discProgram,"aInstanceMatrix"),uWorldMatrix:t.getUniformLocation(this.discProgram,"uWorldMatrix"),uViewMatrix:t.getUniformLocation(this.discProgram,"uViewMatrix"),uProjectionMatrix:t.getUniformLocation(this.discProgram,"uProjectionMatrix"),uCameraPosition:t.getUniformLocation(this.discProgram,"uCameraPosition"),uScaleFactor:t.getUniformLocation(this.discProgram,"uScaleFactor"),uRotationAxisVelocity:t.getUniformLocation(this.discProgram,"uRotationAxisVelocity"),uTex:t.getUniformLocation(this.discProgram,"uTex"),uFrames:t.getUniformLocation(this.discProgram,"uFrames"),uItemCount:t.getUniformLocation(this.discProgram,"uItemCount"),uAtlasSize:t.getUniformLocation(this.discProgram,"uAtlasSize")},this.discGeo=new hn(56,1),this.discBuffers=this.discGeo.data,this.discVAO=dn(t,[[fr(t,this.discBuffers.vertices,t.STATIC_DRAW),this.discLocations.aModelPosition,3],[fr(t,this.discBuffers.uvs,t.STATIC_DRAW),this.discLocations.aModelUvs,2]],this.discBuffers.indices),this.icoGeo=new ln,this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS),this.instancePositions=this.icoGeo.vertices.map(e=>e.position),this.DISC_INSTANCE_COUNT=this.icoGeo.vertices.length,S(this,I,Ir).call(this,this.DISC_INSTANCE_COUNT),this.worldMatrix=_(),S(this,I,br).call(this),this.control=new fn(this.canvas,e=>S(this,I,Rr).call(this,e)),S(this,I,sr).call(this),S(this,I,or).call(this,t),this.resize(),n&&n(this)},br=function(){const n=this.gl;this.tex=vn(n,n.LINEAR,n.LINEAR,n.CLAMP_TO_EDGE,n.CLAMP_TO_EDGE);const t=Math.max(1,this.items.length);this.atlasSize=Math.ceil(Math.sqrt(t));const e=document.createElement("canvas"),i=e.getContext("2d"),a=512;e.width=this.atlasSize*a,e.height=this.atlasSize*a,Promise.all(this.items.map(s=>new Promise(o=>{const c=new Image;c.crossOrigin="anonymous",c.onload=()=>o(c),c.src=s.image}))).then(s=>{s.forEach((o,c)=>{const h=c%this.atlasSize*a,l=Math.floor(c/this.atlasSize)*a;i.drawImage(o,h,l,a,a)}),n.bindTexture(n.TEXTURE_2D,this.tex),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,e),n.generateMipmap(n.TEXTURE_2D)})},Ir=function(n){const t=this.gl;this.discInstances={matricesArray:new Float32Array(n*16),matrices:[],buffer:t.createBuffer()};for(let a=0;a<n;++a){const s=new Float32Array(this.discInstances.matricesArray.buffer,a*16*4,16);s.set(_()),this.discInstances.matrices.push(s)}t.bindVertexArray(this.discVAO),t.bindBuffer(t.ARRAY_BUFFER,this.discInstances.buffer),t.bufferData(t.ARRAY_BUFFER,this.discInstances.matricesArray.byteLength,t.DYNAMIC_DRAW);const e=4,i=16*4;for(let a=0;a<e;++a){const s=this.discLocations.aInstanceMatrix+a;t.enableVertexAttribArray(s),t.vertexAttribPointer(s,4,t.FLOAT,!1,i,a*4*4),t.vertexAttribDivisor(s,1)}t.bindBuffer(t.ARRAY_BUFFER,null),t.bindVertexArray(null)},Tr=function(n){const t=this.gl;this.control.update(n,this.TARGET_FRAME_DURATION);let e=this.instancePositions.map(s=>er(F(),s,this.control.orientation));const i=.25,a=.6;e.forEach((s,o)=>{const h=(Math.abs(s[2])/this.SPHERE_RADIUS*a+(1-a))*i,l=_();J(l,l,ur(_(),Yr(F(),s))),J(l,l,dr(_(),[0,0,0],s,[0,1,0])),J(l,l,Br(_(),[h,h,h])),J(l,l,ur(_(),[0,0,-this.SPHERE_RADIUS])),Nr(this.discInstances.matrices[o],l)}),t.bindBuffer(t.ARRAY_BUFFER,this.discInstances.buffer),t.bufferSubData(t.ARRAY_BUFFER,0,this.discInstances.matricesArray),t.bindBuffer(t.ARRAY_BUFFER,null),this.smoothRotationVelocity=this.control.rotationVelocity},Pr=function(){const n=this.gl;n.useProgram(this.discProgram),n.enable(n.CULL_FACE),n.enable(n.DEPTH_TEST),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.uniformMatrix4fv(this.discLocations.uWorldMatrix,!1,this.worldMatrix),n.uniformMatrix4fv(this.discLocations.uViewMatrix,!1,this.camera.matrices.view),n.uniformMatrix4fv(this.discLocations.uProjectionMatrix,!1,this.camera.matrices.projection),n.uniform3f(this.discLocations.uCameraPosition,this.camera.position[0],this.camera.position[1],this.camera.position[2]),n.uniform4f(this.discLocations.uRotationAxisVelocity,this.control.rotationAxis[0],this.control.rotationAxis[1],this.control.rotationAxis[2],this.smoothRotationVelocity*1.1),n.uniform1i(this.discLocations.uItemCount,this.items.length),n.uniform1i(this.discLocations.uAtlasSize,this.atlasSize),n.uniform1f(this.discLocations.uFrames,L(this,Z)),n.uniform1f(this.discLocations.uScaleFactor,this.scaleFactor),n.uniform1i(this.discLocations.uTex,0),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this.tex),n.bindVertexArray(this.discVAO),n.drawElementsInstanced(n.TRIANGLES,this.discBuffers.indices.length,n.UNSIGNED_SHORT,0,this.DISC_INSTANCE_COUNT)},sr=function(){dr(this.camera.matrix,this.camera.position,[0,0,0],this.camera.up),mr(this.camera.matrices.view,this.camera.matrix)},or=function(n){this.camera.aspect=n.canvas.clientWidth/n.canvas.clientHeight;const t=this.SPHERE_RADIUS*.35,e=this.camera.position[2];this.camera.aspect>1?this.camera.fov=2*Math.atan(t/e):this.camera.fov=2*Math.atan(t/this.camera.aspect/e),qr(this.camera.matrices.projection,this.camera.fov,this.camera.aspect,this.camera.near,this.camera.far),mr(this.camera.matrices.inversProjection,this.camera.matrices.projection)},Rr=function(n){const t=n/this.TARGET_FRAME_DURATION+1e-4;let e=5/t,i=3;const a=this.control.isPointerDown||Math.abs(this.smoothRotationVelocity)>.01;if(a!==this.movementActive&&(this.movementActive=a,this.onMovementChange(a)),this.control.isPointerDown)i+=this.control.rotationVelocity*80+2.5,e=7/t;else{const s=S(this,I,Er).call(this),o=s%Math.max(1,this.items.length);this.onActiveItemChange(o);const c=z(F(),S(this,I,Sr).call(this,s));this.control.snapTargetDirection=c}this.camera.position[2]+=(i-this.camera.position[2])/e,S(this,I,sr).call(this)},Er=function(){const n=this.control.snapDirection,t=Qr(w(),this.control.orientation),e=er(F(),n,t);let i=-1,a;for(let s=0;s<this.instancePositions.length;++s){const o=cr(e,this.instancePositions[s]);o>i&&(i=o,a=s)}return a},Sr=function(n){const t=this.instancePositions[n];return er(F(),t,this.control.orientation)};const xn=[{image:"https://picsum.photos/900/900?grayscale",link:"https://google.com/",title:"",description:""}];function An({items:r=[]}){const n=V.useRef(null),[t,e]=V.useState(null),[i,a]=V.useState(!1);V.useEffect(()=>{const o=n.current;let c;const h=m=>{const u=m%r.length;e(r[u])};o&&(c=new pn(o,r.length?r:xn,h,a,m=>m.run()));const l=()=>{c&&c.resize()};return window.addEventListener("resize",l),l(),()=>{window.removeEventListener("resize",l)}},[r]);const s=()=>{t!=null&&t.link&&(t.link.startsWith("http")?window.open(t.link,"_blank"):console.log("Internal route:",t.link))};return P.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[P.jsx("canvas",{id:"infinite-grid-menu-canvas",ref:n}),t&&P.jsxs(P.Fragment,{children:[P.jsx("h2",{className:`face-title ${i?"inactive":"active"}`,children:t.title}),P.jsxs("p",{className:`face-description ${i?"inactive":"active"}`,children:[" ",t.description]}),P.jsx("div",{onClick:s,className:`action-button ${i?"inactive":"active"}`,children:P.jsx("p",{className:"action-button-icon",children:"↗"})})]})]})}const bn=`import { useEffect, useRef, useState } from 'react';\r
import { mat4, quat, vec2, vec3 } from 'gl-matrix';\r
import './InfiniteMenu.css';\r
\r
const discVertShaderSource = \`#version 300 es\r
\r
uniform mat4 uWorldMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec4 uRotationAxisVelocity;\r
\r
in vec3 aModelPosition;\r
in vec3 aModelNormal;\r
in vec2 aModelUvs;\r
in mat4 aInstanceMatrix;\r
\r
out vec2 vUvs;\r
out float vAlpha;\r
flat out int vInstanceId;\r
\r
#define PI 3.141593\r
\r
void main() {\r
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);\r
\r
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;\r
    float radius = length(centerPos.xyz);\r
\r
    if (gl_VertexID > 0) {\r
        vec3 rotationAxis = uRotationAxisVelocity.xyz;\r
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);\r
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));\r
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);\r
        float strength = dot(stretchDir, relativeVertexPos);\r
        float invAbsStrength = min(0., abs(strength) - 1.);\r
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);\r
        worldPosition.xyz += stretchDir * strength;\r
    }\r
\r
    worldPosition.xyz = radius * normalize(worldPosition.xyz);\r
\r
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;\r
\r
    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;\r
    vUvs = aModelUvs;\r
    vInstanceId = gl_InstanceID;\r
}\r
\`;\r
\r
const discFragShaderSource = \`#version 300 es\r
precision highp float;\r
\r
uniform sampler2D uTex;\r
uniform int uItemCount;\r
uniform int uAtlasSize;\r
\r
out vec4 outColor;\r
\r
in vec2 vUvs;\r
in float vAlpha;\r
flat in int vInstanceId;\r
\r
void main() {\r
    int itemIndex = vInstanceId % uItemCount;\r
    int cellsPerRow = uAtlasSize;\r
    int cellX = itemIndex % cellsPerRow;\r
    int cellY = itemIndex / cellsPerRow;\r
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));\r
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;\r
\r
    ivec2 texSize = textureSize(uTex, 0);\r
    float imageAspect = float(texSize.x) / float(texSize.y);\r
    float containerAspect = 1.0;\r
    \r
    float scale = max(imageAspect / containerAspect, \r
                     containerAspect / imageAspect);\r
    \r
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);\r
    st = (st - 0.5) * scale + 0.5;\r
    \r
    st = clamp(st, 0.0, 1.0);\r
    \r
    st = st * cellSize + cellOffset;\r
    \r
    outColor = texture(uTex, st);\r
    outColor.a *= vAlpha;\r
}\r
\`;\r
\r
class Face {\r
  constructor(a, b, c) {\r
    this.a = a;\r
    this.b = b;\r
    this.c = c;\r
  }\r
}\r
\r
class Vertex {\r
  constructor(x, y, z) {\r
    this.position = vec3.fromValues(x, y, z);\r
    this.normal = vec3.create();\r
    this.uv = vec2.create();\r
  }\r
}\r
\r
class Geometry {\r
  constructor() {\r
    this.vertices = [];\r
    this.faces = [];\r
  }\r
\r
  addVertex(...args) {\r
    for (let i = 0; i < args.length; i += 3) {\r
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));\r
    }\r
    return this;\r
  }\r
\r
  addFace(...args) {\r
    for (let i = 0; i < args.length; i += 3) {\r
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));\r
    }\r
    return this;\r
  }\r
\r
  get lastVertex() {\r
    return this.vertices[this.vertices.length - 1];\r
  }\r
\r
  subdivide(divisions = 1) {\r
    const midPointCache = {};\r
    let f = this.faces;\r
\r
    for (let div = 0; div < divisions; ++div) {\r
      const newFaces = new Array(f.length * 4);\r
\r
      f.forEach((face, ndx) => {\r
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);\r
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);\r
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);\r
\r
        const i = ndx * 4;\r
        newFaces[i + 0] = new Face(face.a, mAB, mCA);\r
        newFaces[i + 1] = new Face(face.b, mBC, mAB);\r
        newFaces[i + 2] = new Face(face.c, mCA, mBC);\r
        newFaces[i + 3] = new Face(mAB, mBC, mCA);\r
      });\r
\r
      f = newFaces;\r
    }\r
\r
    this.faces = f;\r
    return this;\r
  }\r
\r
  spherize(radius = 1) {\r
    this.vertices.forEach(vertex => {\r
      vec3.normalize(vertex.normal, vertex.position);\r
      vec3.scale(vertex.position, vertex.normal, radius);\r
    });\r
    return this;\r
  }\r
\r
  get data() {\r
    return {\r
      vertices: this.vertexData,\r
      indices: this.indexData,\r
      normals: this.normalData,\r
      uvs: this.uvData\r
    };\r
  }\r
\r
  get vertexData() {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.position)));\r
  }\r
\r
  get normalData() {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.normal)));\r
  }\r
\r
  get uvData() {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.uv)));\r
  }\r
\r
  get indexData() {\r
    return new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c]));\r
  }\r
\r
  getMidPoint(ndxA, ndxB, cache) {\r
    const cacheKey = ndxA < ndxB ? \`k_\${ndxB}_\${ndxA}\` : \`k_\${ndxA}_\${ndxB}\`;\r
    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {\r
      return cache[cacheKey];\r
    }\r
    const a = this.vertices[ndxA].position;\r
    const b = this.vertices[ndxB].position;\r
    const ndx = this.vertices.length;\r
    cache[cacheKey] = ndx;\r
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);\r
    return ndx;\r
  }\r
}\r
\r
class IcosahedronGeometry extends Geometry {\r
  constructor() {\r
    super();\r
    const t = Math.sqrt(5) * 0.5 + 0.5;\r
    this.addVertex(\r
      -1,\r
      t,\r
      0,\r
      1,\r
      t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1,\r
      -t,\r
      0,\r
      0,\r
      -1,\r
      t,\r
      0,\r
      1,\r
      t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1,\r
      -t,\r
      t,\r
      0,\r
      -1,\r
      t,\r
      0,\r
      1,\r
      -t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1\r
    ).addFace(\r
      0,\r
      11,\r
      5,\r
      0,\r
      5,\r
      1,\r
      0,\r
      1,\r
      7,\r
      0,\r
      7,\r
      10,\r
      0,\r
      10,\r
      11,\r
      1,\r
      5,\r
      9,\r
      5,\r
      11,\r
      4,\r
      11,\r
      10,\r
      2,\r
      10,\r
      7,\r
      6,\r
      7,\r
      1,\r
      8,\r
      3,\r
      9,\r
      4,\r
      3,\r
      4,\r
      2,\r
      3,\r
      2,\r
      6,\r
      3,\r
      6,\r
      8,\r
      3,\r
      8,\r
      9,\r
      4,\r
      9,\r
      5,\r
      2,\r
      4,\r
      11,\r
      6,\r
      2,\r
      10,\r
      8,\r
      6,\r
      7,\r
      9,\r
      8,\r
      1\r
    );\r
  }\r
}\r
\r
class DiscGeometry extends Geometry {\r
  constructor(steps = 4, radius = 1) {\r
    super();\r
    steps = Math.max(4, steps);\r
\r
    const alpha = (2 * Math.PI) / steps;\r
\r
    this.addVertex(0, 0, 0);\r
    this.lastVertex.uv[0] = 0.5;\r
    this.lastVertex.uv[1] = 0.5;\r
\r
    for (let i = 0; i < steps; ++i) {\r
      const x = Math.cos(alpha * i);\r
      const y = Math.sin(alpha * i);\r
      this.addVertex(radius * x, radius * y, 0);\r
      this.lastVertex.uv[0] = x * 0.5 + 0.5;\r
      this.lastVertex.uv[1] = y * 0.5 + 0.5;\r
\r
      if (i > 0) {\r
        this.addFace(0, i, i + 1);\r
      }\r
    }\r
    this.addFace(0, steps, 1);\r
  }\r
}\r
\r
function createShader(gl, type, source) {\r
  const shader = gl.createShader(type);\r
  gl.shaderSource(shader, source);\r
  gl.compileShader(shader);\r
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\r
\r
  if (success) {\r
    return shader;\r
  }\r
\r
  console.error(gl.getShaderInfoLog(shader));\r
  gl.deleteShader(shader);\r
  return null;\r
}\r
\r
function createProgram(gl, shaderSources, transformFeedbackVaryings, attribLocations) {\r
  const program = gl.createProgram();\r
\r
  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {\r
    const shader = createShader(gl, type, shaderSources[ndx]);\r
    if (shader) gl.attachShader(program, shader);\r
  });\r
\r
  if (transformFeedbackVaryings) {\r
    gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);\r
  }\r
\r
  if (attribLocations) {\r
    for (const attrib in attribLocations) {\r
      gl.bindAttribLocation(program, attribLocations[attrib], attrib);\r
    }\r
  }\r
\r
  gl.linkProgram(program);\r
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);\r
\r
  if (success) {\r
    return program;\r
  }\r
\r
  console.error(gl.getProgramInfoLog(program));\r
  gl.deleteProgram(program);\r
  return null;\r
}\r
\r
function makeVertexArray(gl, bufLocNumElmPairs, indices) {\r
  const va = gl.createVertexArray();\r
  gl.bindVertexArray(va);\r
\r
  for (const [buffer, loc, numElem] of bufLocNumElmPairs) {\r
    if (loc === -1) continue;\r
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\r
    gl.enableVertexAttribArray(loc);\r
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);\r
  }\r
\r
  if (indices) {\r
    const indexBuffer = gl.createBuffer();\r
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);\r
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);\r
  }\r
\r
  gl.bindVertexArray(null);\r
  return va;\r
}\r
\r
function resizeCanvasToDisplaySize(canvas) {\r
  const dpr = Math.min(2, window.devicePixelRatio);\r
  const displayWidth = Math.round(canvas.clientWidth * dpr);\r
  const displayHeight = Math.round(canvas.clientHeight * dpr);\r
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;\r
  if (needResize) {\r
    canvas.width = displayWidth;\r
    canvas.height = displayHeight;\r
  }\r
  return needResize;\r
}\r
\r
function makeBuffer(gl, sizeOrData, usage) {\r
  const buf = gl.createBuffer();\r
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);\r
  gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);\r
  gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
  return buf;\r
}\r
\r
function createAndSetupTexture(gl, minFilter, magFilter, wrapS, wrapT) {\r
  const texture = gl.createTexture();\r
  gl.bindTexture(gl.TEXTURE_2D, texture);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);\r
  return texture;\r
}\r
\r
class ArcballControl {\r
  isPointerDown = false;\r
  orientation = quat.create();\r
  pointerRotation = quat.create();\r
  rotationVelocity = 0;\r
  rotationAxis = vec3.fromValues(1, 0, 0);\r
  snapDirection = vec3.fromValues(0, 0, -1);\r
  snapTargetDirection;\r
  EPSILON = 0.1;\r
  IDENTITY_QUAT = quat.create();\r
\r
  constructor(canvas, updateCallback) {\r
    this.canvas = canvas;\r
    this.updateCallback = updateCallback || (() => null);\r
\r
    this.pointerPos = vec2.create();\r
    this.previousPointerPos = vec2.create();\r
    this._rotationVelocity = 0;\r
    this._combinedQuat = quat.create();\r
\r
    canvas.addEventListener('pointerdown', e => {\r
      vec2.set(this.pointerPos, e.clientX, e.clientY);\r
      vec2.copy(this.previousPointerPos, this.pointerPos);\r
      this.isPointerDown = true;\r
    });\r
    canvas.addEventListener('pointerup', () => {\r
      this.isPointerDown = false;\r
    });\r
    canvas.addEventListener('pointerleave', () => {\r
      this.isPointerDown = false;\r
    });\r
    canvas.addEventListener('pointermove', e => {\r
      if (this.isPointerDown) {\r
        vec2.set(this.pointerPos, e.clientX, e.clientY);\r
      }\r
    });\r
\r
    canvas.style.touchAction = 'none';\r
  }\r
\r
  update(deltaTime, targetFrameDuration = 16) {\r
    const timeScale = deltaTime / targetFrameDuration + 0.00001;\r
    let angleFactor = timeScale;\r
    let snapRotation = quat.create();\r
\r
    if (this.isPointerDown) {\r
      const INTENSITY = 0.3 * timeScale;\r
      const ANGLE_AMPLIFICATION = 5 / timeScale;\r
\r
      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);\r
      vec2.scale(midPointerPos, midPointerPos, INTENSITY);\r
\r
      if (vec2.sqrLen(midPointerPos) > this.EPSILON) {\r
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);\r
\r
        const p = this.#project(midPointerPos);\r
        const q = this.#project(this.previousPointerPos);\r
        const a = vec3.normalize(vec3.create(), p);\r
        const b = vec3.normalize(vec3.create(), q);\r
\r
        vec2.copy(this.previousPointerPos, midPointerPos);\r
\r
        angleFactor *= ANGLE_AMPLIFICATION;\r
\r
        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);\r
      } else {\r
        quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);\r
      }\r
    } else {\r
      const INTENSITY = 0.1 * timeScale;\r
      quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);\r
\r
      if (this.snapTargetDirection) {\r
        const SNAPPING_INTENSITY = 0.2;\r
        const a = this.snapTargetDirection;\r
        const b = this.snapDirection;\r
        const sqrDist = vec3.squaredDistance(a, b);\r
        const distanceFactor = Math.max(0.1, 1 - sqrDist * 10);\r
        angleFactor *= SNAPPING_INTENSITY * distanceFactor;\r
        this.quatFromVectors(a, b, snapRotation, angleFactor);\r
      }\r
    }\r
\r
    const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);\r
    this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation);\r
    quat.normalize(this.orientation, this.orientation);\r
\r
    const RA_INTENSITY = 0.8 * timeScale;\r
    quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, RA_INTENSITY);\r
    quat.normalize(this._combinedQuat, this._combinedQuat);\r
\r
    const rad = Math.acos(this._combinedQuat[3]) * 2.0;\r
    const s = Math.sin(rad / 2.0);\r
    let rv = 0;\r
    if (s > 0.000001) {\r
      rv = rad / (2 * Math.PI);\r
      this.rotationAxis[0] = this._combinedQuat[0] / s;\r
      this.rotationAxis[1] = this._combinedQuat[1] / s;\r
      this.rotationAxis[2] = this._combinedQuat[2] / s;\r
    }\r
\r
    const RV_INTENSITY = 0.5 * timeScale;\r
    this._rotationVelocity += (rv - this._rotationVelocity) * RV_INTENSITY;\r
    this.rotationVelocity = this._rotationVelocity / timeScale;\r
\r
    this.updateCallback(deltaTime);\r
  }\r
\r
  quatFromVectors(a, b, out, angleFactor = 1) {\r
    const axis = vec3.cross(vec3.create(), a, b);\r
    vec3.normalize(axis, axis);\r
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b)));\r
    const angle = Math.acos(d) * angleFactor;\r
    quat.setAxisAngle(out, axis, angle);\r
    return { q: out, axis, angle };\r
  }\r
\r
  #project(pos) {\r
    const r = 2;\r
    const w = this.canvas.clientWidth;\r
    const h = this.canvas.clientHeight;\r
    const s = Math.max(w, h) - 1;\r
\r
    const x = (2 * pos[0] - w - 1) / s;\r
    const y = (2 * pos[1] - h - 1) / s;\r
    let z = 0;\r
    const xySq = x * x + y * y;\r
    const rSq = r * r;\r
\r
    if (xySq <= rSq / 2.0) {\r
      z = Math.sqrt(rSq - xySq);\r
    } else {\r
      z = rSq / Math.sqrt(xySq);\r
    }\r
    return vec3.fromValues(-x, y, z);\r
  }\r
}\r
\r
class InfiniteGridMenu {\r
  TARGET_FRAME_DURATION = 1000 / 60;\r
  SPHERE_RADIUS = 2;\r
\r
  #time = 0;\r
  #deltaTime = 0;\r
  #deltaFrames = 0;\r
  #frames = 0;\r
\r
  camera = {\r
    matrix: mat4.create(),\r
    near: 0.1,\r
    far: 40,\r
    fov: Math.PI / 4,\r
    aspect: 1,\r
    position: vec3.fromValues(0, 0, 3),\r
    up: vec3.fromValues(0, 1, 0),\r
    matrices: {\r
      view: mat4.create(),\r
      projection: mat4.create(),\r
      inversProjection: mat4.create()\r
    }\r
  };\r
\r
  nearestVertexIndex = null;\r
  smoothRotationVelocity = 0;\r
  scaleFactor = 1.0;\r
  movementActive = false;\r
\r
  constructor(canvas, items, onActiveItemChange, onMovementChange, onInit = null) {\r
    this.canvas = canvas;\r
    this.items = items || [];\r
    this.onActiveItemChange = onActiveItemChange || (() => {});\r
    this.onMovementChange = onMovementChange || (() => {});\r
    this.#init(onInit);\r
  }\r
\r
  resize() {\r
    this.viewportSize = vec2.set(this.viewportSize || vec2.create(), this.canvas.clientWidth, this.canvas.clientHeight);\r
\r
    const gl = this.gl;\r
    const needsResize = resizeCanvasToDisplaySize(gl.canvas);\r
    if (needsResize) {\r
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);\r
    }\r
\r
    this.#updateProjectionMatrix(gl);\r
  }\r
\r
  run(time = 0) {\r
    this.#deltaTime = Math.min(32, time - this.#time);\r
    this.#time = time;\r
    this.#deltaFrames = this.#deltaTime / this.TARGET_FRAME_DURATION;\r
    this.#frames += this.#deltaFrames;\r
\r
    this.#animate(this.#deltaTime);\r
    this.#render();\r
\r
    requestAnimationFrame(t => this.run(t));\r
  }\r
\r
  #init(onInit) {\r
    this.gl = this.canvas.getContext('webgl2', { antialias: true, alpha: false });\r
    const gl = this.gl;\r
    if (!gl) {\r
      throw new Error('No WebGL 2 context!');\r
    }\r
\r
    this.viewportSize = vec2.fromValues(this.canvas.clientWidth, this.canvas.clientHeight);\r
    this.drawBufferSize = vec2.clone(this.viewportSize);\r
\r
    this.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {\r
      aModelPosition: 0,\r
      aModelNormal: 1,\r
      aModelUvs: 2,\r
      aInstanceMatrix: 3\r
    });\r
\r
    this.discLocations = {\r
      aModelPosition: gl.getAttribLocation(this.discProgram, 'aModelPosition'),\r
      aModelUvs: gl.getAttribLocation(this.discProgram, 'aModelUvs'),\r
      aInstanceMatrix: gl.getAttribLocation(this.discProgram, 'aInstanceMatrix'),\r
      uWorldMatrix: gl.getUniformLocation(this.discProgram, 'uWorldMatrix'),\r
      uViewMatrix: gl.getUniformLocation(this.discProgram, 'uViewMatrix'),\r
      uProjectionMatrix: gl.getUniformLocation(this.discProgram, 'uProjectionMatrix'),\r
      uCameraPosition: gl.getUniformLocation(this.discProgram, 'uCameraPosition'),\r
      uScaleFactor: gl.getUniformLocation(this.discProgram, 'uScaleFactor'),\r
      uRotationAxisVelocity: gl.getUniformLocation(this.discProgram, 'uRotationAxisVelocity'),\r
      uTex: gl.getUniformLocation(this.discProgram, 'uTex'),\r
      uFrames: gl.getUniformLocation(this.discProgram, 'uFrames'),\r
      uItemCount: gl.getUniformLocation(this.discProgram, 'uItemCount'),\r
      uAtlasSize: gl.getUniformLocation(this.discProgram, 'uAtlasSize')\r
    };\r
\r
    this.discGeo = new DiscGeometry(56, 1);\r
    this.discBuffers = this.discGeo.data;\r
    this.discVAO = makeVertexArray(\r
      gl,\r
      [\r
        [makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW), this.discLocations.aModelPosition, 3],\r
        [makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW), this.discLocations.aModelUvs, 2]\r
      ],\r
      this.discBuffers.indices\r
    );\r
\r
    this.icoGeo = new IcosahedronGeometry();\r
    this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);\r
    this.instancePositions = this.icoGeo.vertices.map(v => v.position);\r
    this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;\r
    this.#initDiscInstances(this.DISC_INSTANCE_COUNT);\r
\r
    this.worldMatrix = mat4.create();\r
    this.#initTexture();\r
\r
    this.control = new ArcballControl(this.canvas, deltaTime => this.#onControlUpdate(deltaTime));\r
\r
    this.#updateCameraMatrix();\r
    this.#updateProjectionMatrix(gl);\r
    this.resize();\r
\r
    if (onInit) onInit(this);\r
  }\r
\r
  #initTexture() {\r
    const gl = this.gl;\r
    this.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);\r
\r
    const itemCount = Math.max(1, this.items.length);\r
    this.atlasSize = Math.ceil(Math.sqrt(itemCount));\r
    const canvas = document.createElement('canvas');\r
    const ctx = canvas.getContext('2d');\r
    const cellSize = 512;\r
\r
    canvas.width = this.atlasSize * cellSize;\r
    canvas.height = this.atlasSize * cellSize;\r
\r
    Promise.all(\r
      this.items.map(\r
        item =>\r
          new Promise(resolve => {\r
            const img = new Image();\r
            img.crossOrigin = 'anonymous';\r
            img.onload = () => resolve(img);\r
            img.src = item.image;\r
          })\r
      )\r
    ).then(images => {\r
      images.forEach((img, i) => {\r
        const x = (i % this.atlasSize) * cellSize;\r
        const y = Math.floor(i / this.atlasSize) * cellSize;\r
        ctx.drawImage(img, x, y, cellSize, cellSize);\r
      });\r
\r
      gl.bindTexture(gl.TEXTURE_2D, this.tex);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);\r
      gl.generateMipmap(gl.TEXTURE_2D);\r
    });\r
  }\r
\r
  #initDiscInstances(count) {\r
    const gl = this.gl;\r
    this.discInstances = {\r
      matricesArray: new Float32Array(count * 16),\r
      matrices: [],\r
      buffer: gl.createBuffer()\r
    };\r
    for (let i = 0; i < count; ++i) {\r
      const instanceMatrixArray = new Float32Array(this.discInstances.matricesArray.buffer, i * 16 * 4, 16);\r
      instanceMatrixArray.set(mat4.create());\r
      this.discInstances.matrices.push(instanceMatrixArray);\r
    }\r
    gl.bindVertexArray(this.discVAO);\r
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);\r
    gl.bufferData(gl.ARRAY_BUFFER, this.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);\r
    const mat4AttribSlotCount = 4;\r
    const bytesPerMatrix = 16 * 4;\r
    for (let j = 0; j < mat4AttribSlotCount; ++j) {\r
      const loc = this.discLocations.aInstanceMatrix + j;\r
      gl.enableVertexAttribArray(loc);\r
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, bytesPerMatrix, j * 4 * 4);\r
      gl.vertexAttribDivisor(loc, 1);\r
    }\r
    gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
    gl.bindVertexArray(null);\r
  }\r
\r
  #animate(deltaTime) {\r
    const gl = this.gl;\r
    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);\r
\r
    let positions = this.instancePositions.map(p => vec3.transformQuat(vec3.create(), p, this.control.orientation));\r
    const scale = 0.25;\r
    const SCALE_INTENSITY = 0.6;\r
    positions.forEach((p, ndx) => {\r
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);\r
      const finalScale = s * scale;\r
      const matrix = mat4.create();\r
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));\r
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));\r
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));\r
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));\r
\r
      mat4.copy(this.discInstances.matrices[ndx], matrix);\r
    });\r
\r
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);\r
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);\r
    gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
\r
    this.smoothRotationVelocity = this.control.rotationVelocity;\r
  }\r
\r
  #render() {\r
    const gl = this.gl;\r
    gl.useProgram(this.discProgram);\r
\r
    gl.enable(gl.CULL_FACE);\r
    gl.enable(gl.DEPTH_TEST);\r
\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\r
\r
    gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);\r
    gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);\r
    gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);\r
    gl.uniform3f(\r
      this.discLocations.uCameraPosition,\r
      this.camera.position[0],\r
      this.camera.position[1],\r
      this.camera.position[2]\r
    );\r
    gl.uniform4f(\r
      this.discLocations.uRotationAxisVelocity,\r
      this.control.rotationAxis[0],\r
      this.control.rotationAxis[1],\r
      this.control.rotationAxis[2],\r
      this.smoothRotationVelocity * 1.1\r
    );\r
\r
    gl.uniform1i(this.discLocations.uItemCount, this.items.length);\r
    gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);\r
\r
    gl.uniform1f(this.discLocations.uFrames, this.#frames);\r
    gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);\r
    gl.uniform1i(this.discLocations.uTex, 0);\r
    gl.activeTexture(gl.TEXTURE0);\r
    gl.bindTexture(gl.TEXTURE_2D, this.tex);\r
\r
    gl.bindVertexArray(this.discVAO);\r
    gl.drawElementsInstanced(\r
      gl.TRIANGLES,\r
      this.discBuffers.indices.length,\r
      gl.UNSIGNED_SHORT,\r
      0,\r
      this.DISC_INSTANCE_COUNT\r
    );\r
  }\r
\r
  #updateCameraMatrix() {\r
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);\r
    mat4.invert(this.camera.matrices.view, this.camera.matrix);\r
  }\r
\r
  #updateProjectionMatrix(gl) {\r
    this.camera.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;\r
    const height = this.SPHERE_RADIUS * 0.35;\r
    const distance = this.camera.position[2];\r
    if (this.camera.aspect > 1) {\r
      this.camera.fov = 2 * Math.atan(height / distance);\r
    } else {\r
      this.camera.fov = 2 * Math.atan(height / this.camera.aspect / distance);\r
    }\r
    mat4.perspective(\r
      this.camera.matrices.projection,\r
      this.camera.fov,\r
      this.camera.aspect,\r
      this.camera.near,\r
      this.camera.far\r
    );\r
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);\r
  }\r
\r
  #onControlUpdate(deltaTime) {\r
    const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;\r
    let damping = 5 / timeScale;\r
    let cameraTargetZ = 3;\r
\r
    const isMoving = this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;\r
\r
    if (isMoving !== this.movementActive) {\r
      this.movementActive = isMoving;\r
      this.onMovementChange(isMoving);\r
    }\r
\r
    if (!this.control.isPointerDown) {\r
      const nearestVertexIndex = this.#findNearestVertexIndex();\r
      const itemIndex = nearestVertexIndex % Math.max(1, this.items.length);\r
      this.onActiveItemChange(itemIndex);\r
      const snapDirection = vec3.normalize(vec3.create(), this.#getVertexWorldPosition(nearestVertexIndex));\r
      this.control.snapTargetDirection = snapDirection;\r
    } else {\r
      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;\r
      damping = 7 / timeScale;\r
    }\r
\r
    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;\r
    this.#updateCameraMatrix();\r
  }\r
\r
  #findNearestVertexIndex() {\r
    const n = this.control.snapDirection;\r
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);\r
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);\r
\r
    let maxD = -1;\r
    let nearestVertexIndex;\r
    for (let i = 0; i < this.instancePositions.length; ++i) {\r
      const d = vec3.dot(nt, this.instancePositions[i]);\r
      if (d > maxD) {\r
        maxD = d;\r
        nearestVertexIndex = i;\r
      }\r
    }\r
    return nearestVertexIndex;\r
  }\r
\r
  #getVertexWorldPosition(index) {\r
    const nearestVertexPos = this.instancePositions[index];\r
    return vec3.transformQuat(vec3.create(), nearestVertexPos, this.control.orientation);\r
  }\r
}\r
\r
const defaultItems = [\r
  {\r
    image: 'https://picsum.photos/900/900?grayscale',\r
    link: 'https://google.com/',\r
    title: '',\r
    description: ''\r
  }\r
];\r
\r
export default function InfiniteMenu({ items = [] }) {\r
  const canvasRef = useRef(null);\r
  const [activeItem, setActiveItem] = useState(null);\r
  const [isMoving, setIsMoving] = useState(false);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    let sketch;\r
\r
    const handleActiveItem = index => {\r
      const itemIndex = index % items.length;\r
      setActiveItem(items[itemIndex]);\r
    };\r
\r
    if (canvas) {\r
      sketch = new InfiniteGridMenu(canvas, items.length ? items : defaultItems, handleActiveItem, setIsMoving, sk =>\r
        sk.run()\r
      );\r
    }\r
\r
    const handleResize = () => {\r
      if (sketch) {\r
        sketch.resize();\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    handleResize();\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
    };\r
  }, [items]);\r
\r
  const handleButtonClick = () => {\r
    if (!activeItem?.link) return;\r
    if (activeItem.link.startsWith('http')) {\r
      window.open(activeItem.link, '_blank');\r
    } else {\r
      console.log('Internal route:', activeItem.link);\r
    }\r
  };\r
\r
  return (\r
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>\r
      <canvas id="infinite-grid-menu-canvas" ref={canvasRef} />\r
\r
      {activeItem && (\r
        <>\r
          <h2 className={\`face-title \${isMoving ? 'inactive' : 'active'}\`}>{activeItem.title}</h2>\r
\r
          <p className={\`face-description \${isMoving ? 'inactive' : 'active'}\`}> {activeItem.description}</p>\r
\r
          <div onClick={handleButtonClick} className={\`action-button \${isMoving ? 'inactive' : 'active'}\`}>\r
            <p className="action-button-icon">&#x2197;</p>\r
          </div>\r
        </>\r
      )}\r
    </div>\r
  );\r
}\r
`,In=`/* Note: this CSS is only an example, you can overlay whatever you want using the activeItem logic */\r
\r
#infinite-grid-menu-canvas {\r
  cursor: grab;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  position: relative;\r
  outline: none;\r
}\r
\r
#infinite-grid-menu-canvas:active {\r
  cursor: grabbing;\r
}\r
\r
.action-button {\r
  position: absolute;\r
  left: 50%;\r
  z-index: 10;\r
  width: 60px;\r
  height: 60px;\r
  display: grid;\r
  place-items: center;\r
  background: #5227ff;\r
  border: none;\r
  border-radius: 50%;\r
  cursor: pointer;\r
  border: 5px solid #000;\r
}\r
\r
.face-title {\r
  user-select: none;\r
  position: absolute;\r
  font-weight: 900;\r
  font-size: 4rem;\r
  left: 1.6em;\r
  top: 50%;\r
}\r
\r
.action-button-icon {\r
  user-select: none;\r
  position: relative;\r
  color: #fff;\r
  top: 2px;\r
  font-size: 26px;\r
}\r
\r
.face-title {\r
  position: absolute;\r
  top: 50%;\r
  transform: translate(20%, -50%);\r
}\r
\r
.face-title.active {\r
  opacity: 1;\r
  transform: translate(20%, -50%);\r
  pointer-events: auto;\r
  transition: 0.5s ease;\r
}\r
\r
.face-title.inactive {\r
  pointer-events: none;\r
  opacity: 0;\r
  transition: 0.1s ease;\r
}\r
\r
.face-description {\r
  user-select: none;\r
  position: absolute;\r
  max-width: 10ch;\r
  top: 50%;\r
  font-size: 1.5rem;\r
  right: 1%;\r
  transform: translate(0, -50%);\r
}\r
\r
.face-description.active {\r
  opacity: 1;\r
  transform: translate(-90%, -50%);\r
  pointer-events: auto;\r
  transition: 0.5s ease;\r
}\r
\r
.face-description.inactive {\r
  pointer-events: none;\r
  transform: translate(-60%, -50%);\r
  opacity: 0;\r
  transition: 0.1s ease;\r
}\r
\r
.action-button {\r
  position: absolute;\r
  left: 50%;\r
}\r
\r
.action-button.active {\r
  bottom: 3.8em;\r
  transform: translateX(-50%) scale(1);\r
  opacity: 1;\r
  pointer-events: auto;\r
  transition: 0.5s ease;\r
}\r
\r
.action-button.inactive {\r
  bottom: -80px;\r
  transform: translateX(-50%) scale(0);\r
  opacity: 0;\r
  pointer-events: none;\r
  transition: 0.1s ease;\r
}\r
\r
@media (max-width: 1500px) {\r
  .face-title,\r
  .face-description {\r
    display: none;\r
  }\r
}\r
`,Tn=`import { useEffect, useRef, useState } from 'react';\r
import { mat4, quat, vec2, vec3 } from 'gl-matrix';\r
\r
const discVertShaderSource = \`#version 300 es\r
\r
uniform mat4 uWorldMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec4 uRotationAxisVelocity;\r
\r
in vec3 aModelPosition;\r
in vec3 aModelNormal;\r
in vec2 aModelUvs;\r
in mat4 aInstanceMatrix;\r
\r
out vec2 vUvs;\r
out float vAlpha;\r
flat out int vInstanceId;\r
\r
#define PI 3.141593\r
\r
void main() {\r
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);\r
\r
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;\r
    float radius = length(centerPos.xyz);\r
\r
    if (gl_VertexID > 0) {\r
        vec3 rotationAxis = uRotationAxisVelocity.xyz;\r
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);\r
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));\r
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);\r
        float strength = dot(stretchDir, relativeVertexPos);\r
        float invAbsStrength = min(0., abs(strength) - 1.);\r
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);\r
        worldPosition.xyz += stretchDir * strength;\r
    }\r
\r
    worldPosition.xyz = radius * normalize(worldPosition.xyz);\r
\r
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;\r
\r
    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;\r
    vUvs = aModelUvs;\r
    vInstanceId = gl_InstanceID;\r
}\r
\`;\r
\r
const discFragShaderSource = \`#version 300 es\r
precision highp float;\r
\r
uniform sampler2D uTex;\r
uniform int uItemCount;\r
uniform int uAtlasSize;\r
\r
out vec4 outColor;\r
\r
in vec2 vUvs;\r
in float vAlpha;\r
flat in int vInstanceId;\r
\r
void main() {\r
    int itemIndex = vInstanceId % uItemCount;\r
    int cellsPerRow = uAtlasSize;\r
    int cellX = itemIndex % cellsPerRow;\r
    int cellY = itemIndex / cellsPerRow;\r
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));\r
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;\r
\r
    ivec2 texSize = textureSize(uTex, 0);\r
    float imageAspect = float(texSize.x) / float(texSize.y);\r
    float containerAspect = 1.0;\r
    \r
    float scale = max(imageAspect / containerAspect, \r
                     containerAspect / imageAspect);\r
    \r
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);\r
    st = (st - 0.5) * scale + 0.5;\r
    \r
    st = clamp(st, 0.0, 1.0);\r
    \r
    st = st * cellSize + cellOffset;\r
    \r
    outColor = texture(uTex, st);\r
    outColor.a *= vAlpha;\r
}\r
\`;\r
\r
class Face {\r
  constructor(a, b, c) {\r
    this.a = a;\r
    this.b = b;\r
    this.c = c;\r
  }\r
}\r
\r
class Vertex {\r
  constructor(x, y, z) {\r
    this.position = vec3.fromValues(x, y, z);\r
    this.normal = vec3.create();\r
    this.uv = vec2.create();\r
  }\r
}\r
\r
class Geometry {\r
  constructor() {\r
    this.vertices = [];\r
    this.faces = [];\r
  }\r
\r
  addVertex(...args) {\r
    for (let i = 0; i < args.length; i += 3) {\r
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));\r
    }\r
    return this;\r
  }\r
\r
  addFace(...args) {\r
    for (let i = 0; i < args.length; i += 3) {\r
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));\r
    }\r
    return this;\r
  }\r
\r
  get lastVertex() {\r
    return this.vertices[this.vertices.length - 1];\r
  }\r
\r
  subdivide(divisions = 1) {\r
    const midPointCache = {};\r
    let f = this.faces;\r
\r
    for (let div = 0; div < divisions; ++div) {\r
      const newFaces = new Array(f.length * 4);\r
\r
      f.forEach((face, ndx) => {\r
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);\r
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);\r
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);\r
\r
        const i = ndx * 4;\r
        newFaces[i + 0] = new Face(face.a, mAB, mCA);\r
        newFaces[i + 1] = new Face(face.b, mBC, mAB);\r
        newFaces[i + 2] = new Face(face.c, mCA, mBC);\r
        newFaces[i + 3] = new Face(mAB, mBC, mCA);\r
      });\r
\r
      f = newFaces;\r
    }\r
\r
    this.faces = f;\r
    return this;\r
  }\r
\r
  spherize(radius = 1) {\r
    this.vertices.forEach(vertex => {\r
      vec3.normalize(vertex.normal, vertex.position);\r
      vec3.scale(vertex.position, vertex.normal, radius);\r
    });\r
    return this;\r
  }\r
\r
  get data() {\r
    return {\r
      vertices: this.vertexData,\r
      indices: this.indexData,\r
      normals: this.normalData,\r
      uvs: this.uvData\r
    };\r
  }\r
\r
  get vertexData() {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.position)));\r
  }\r
\r
  get normalData() {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.normal)));\r
  }\r
\r
  get uvData() {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.uv)));\r
  }\r
\r
  get indexData() {\r
    return new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c]));\r
  }\r
\r
  getMidPoint(ndxA, ndxB, cache) {\r
    const cacheKey = ndxA < ndxB ? \`k_\${ndxB}_\${ndxA}\` : \`k_\${ndxA}_\${ndxB}\`;\r
    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {\r
      return cache[cacheKey];\r
    }\r
    const a = this.vertices[ndxA].position;\r
    const b = this.vertices[ndxB].position;\r
    const ndx = this.vertices.length;\r
    cache[cacheKey] = ndx;\r
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);\r
    return ndx;\r
  }\r
}\r
\r
class IcosahedronGeometry extends Geometry {\r
  constructor() {\r
    super();\r
    const t = Math.sqrt(5) * 0.5 + 0.5;\r
    this.addVertex(\r
      -1,\r
      t,\r
      0,\r
      1,\r
      t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1,\r
      -t,\r
      0,\r
      0,\r
      -1,\r
      t,\r
      0,\r
      1,\r
      t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1,\r
      -t,\r
      t,\r
      0,\r
      -1,\r
      t,\r
      0,\r
      1,\r
      -t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1\r
    ).addFace(\r
      0,\r
      11,\r
      5,\r
      0,\r
      5,\r
      1,\r
      0,\r
      1,\r
      7,\r
      0,\r
      7,\r
      10,\r
      0,\r
      10,\r
      11,\r
      1,\r
      5,\r
      9,\r
      5,\r
      11,\r
      4,\r
      11,\r
      10,\r
      2,\r
      10,\r
      7,\r
      6,\r
      7,\r
      1,\r
      8,\r
      3,\r
      9,\r
      4,\r
      3,\r
      4,\r
      2,\r
      3,\r
      2,\r
      6,\r
      3,\r
      6,\r
      8,\r
      3,\r
      8,\r
      9,\r
      4,\r
      9,\r
      5,\r
      2,\r
      4,\r
      11,\r
      6,\r
      2,\r
      10,\r
      8,\r
      6,\r
      7,\r
      9,\r
      8,\r
      1\r
    );\r
  }\r
}\r
\r
class DiscGeometry extends Geometry {\r
  constructor(steps = 4, radius = 1) {\r
    super();\r
    steps = Math.max(4, steps);\r
\r
    const alpha = (2 * Math.PI) / steps;\r
\r
    this.addVertex(0, 0, 0);\r
    this.lastVertex.uv[0] = 0.5;\r
    this.lastVertex.uv[1] = 0.5;\r
\r
    for (let i = 0; i < steps; ++i) {\r
      const x = Math.cos(alpha * i);\r
      const y = Math.sin(alpha * i);\r
      this.addVertex(radius * x, radius * y, 0);\r
      this.lastVertex.uv[0] = x * 0.5 + 0.5;\r
      this.lastVertex.uv[1] = y * 0.5 + 0.5;\r
\r
      if (i > 0) {\r
        this.addFace(0, i, i + 1);\r
      }\r
    }\r
    this.addFace(0, steps, 1);\r
  }\r
}\r
\r
function createShader(gl, type, source) {\r
  const shader = gl.createShader(type);\r
  gl.shaderSource(shader, source);\r
  gl.compileShader(shader);\r
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\r
\r
  if (success) {\r
    return shader;\r
  }\r
\r
  console.error(gl.getShaderInfoLog(shader));\r
  gl.deleteShader(shader);\r
  return null;\r
}\r
\r
function createProgram(gl, shaderSources, transformFeedbackVaryings, attribLocations) {\r
  const program = gl.createProgram();\r
\r
  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {\r
    const shader = createShader(gl, type, shaderSources[ndx]);\r
    if (shader) gl.attachShader(program, shader);\r
  });\r
\r
  if (transformFeedbackVaryings) {\r
    gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);\r
  }\r
\r
  if (attribLocations) {\r
    for (const attrib in attribLocations) {\r
      gl.bindAttribLocation(program, attribLocations[attrib], attrib);\r
    }\r
  }\r
\r
  gl.linkProgram(program);\r
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);\r
\r
  if (success) {\r
    return program;\r
  }\r
\r
  console.error(gl.getProgramInfoLog(program));\r
  gl.deleteProgram(program);\r
  return null;\r
}\r
\r
function makeVertexArray(gl, bufLocNumElmPairs, indices) {\r
  const va = gl.createVertexArray();\r
  gl.bindVertexArray(va);\r
\r
  for (const [buffer, loc, numElem] of bufLocNumElmPairs) {\r
    if (loc === -1) continue;\r
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\r
    gl.enableVertexAttribArray(loc);\r
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);\r
  }\r
\r
  if (indices) {\r
    const indexBuffer = gl.createBuffer();\r
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);\r
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);\r
  }\r
\r
  gl.bindVertexArray(null);\r
  return va;\r
}\r
\r
function resizeCanvasToDisplaySize(canvas) {\r
  const dpr = Math.min(2, window.devicePixelRatio);\r
  const displayWidth = Math.round(canvas.clientWidth * dpr);\r
  const displayHeight = Math.round(canvas.clientHeight * dpr);\r
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;\r
  if (needResize) {\r
    canvas.width = displayWidth;\r
    canvas.height = displayHeight;\r
  }\r
  return needResize;\r
}\r
\r
function makeBuffer(gl, sizeOrData, usage) {\r
  const buf = gl.createBuffer();\r
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);\r
  gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);\r
  gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
  return buf;\r
}\r
\r
function createAndSetupTexture(gl, minFilter, magFilter, wrapS, wrapT) {\r
  const texture = gl.createTexture();\r
  gl.bindTexture(gl.TEXTURE_2D, texture);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);\r
  return texture;\r
}\r
\r
class ArcballControl {\r
  isPointerDown = false;\r
  orientation = quat.create();\r
  pointerRotation = quat.create();\r
  rotationVelocity = 0;\r
  rotationAxis = vec3.fromValues(1, 0, 0);\r
  snapDirection = vec3.fromValues(0, 0, -1);\r
  snapTargetDirection;\r
  EPSILON = 0.1;\r
  IDENTITY_QUAT = quat.create();\r
\r
  constructor(canvas, updateCallback) {\r
    this.canvas = canvas;\r
    this.updateCallback = updateCallback || (() => null);\r
\r
    this.pointerPos = vec2.create();\r
    this.previousPointerPos = vec2.create();\r
    this._rotationVelocity = 0;\r
    this._combinedQuat = quat.create();\r
\r
    canvas.addEventListener('pointerdown', e => {\r
      vec2.set(this.pointerPos, e.clientX, e.clientY);\r
      vec2.copy(this.previousPointerPos, this.pointerPos);\r
      this.isPointerDown = true;\r
    });\r
    canvas.addEventListener('pointerup', () => {\r
      this.isPointerDown = false;\r
    });\r
    canvas.addEventListener('pointerleave', () => {\r
      this.isPointerDown = false;\r
    });\r
    canvas.addEventListener('pointermove', e => {\r
      if (this.isPointerDown) {\r
        vec2.set(this.pointerPos, e.clientX, e.clientY);\r
      }\r
    });\r
\r
    canvas.style.touchAction = 'none';\r
  }\r
\r
  update(deltaTime, targetFrameDuration = 16) {\r
    const timeScale = deltaTime / targetFrameDuration + 0.00001;\r
    let angleFactor = timeScale;\r
    let snapRotation = quat.create();\r
\r
    if (this.isPointerDown) {\r
      const INTENSITY = 0.3 * timeScale;\r
      const ANGLE_AMPLIFICATION = 5 / timeScale;\r
\r
      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);\r
      vec2.scale(midPointerPos, midPointerPos, INTENSITY);\r
\r
      if (vec2.sqrLen(midPointerPos) > this.EPSILON) {\r
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);\r
\r
        const p = this.#project(midPointerPos);\r
        const q = this.#project(this.previousPointerPos);\r
        const a = vec3.normalize(vec3.create(), p);\r
        const b = vec3.normalize(vec3.create(), q);\r
\r
        vec2.copy(this.previousPointerPos, midPointerPos);\r
\r
        angleFactor *= ANGLE_AMPLIFICATION;\r
\r
        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);\r
      } else {\r
        quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);\r
      }\r
    } else {\r
      const INTENSITY = 0.1 * timeScale;\r
      quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);\r
\r
      if (this.snapTargetDirection) {\r
        const SNAPPING_INTENSITY = 0.2;\r
        const a = this.snapTargetDirection;\r
        const b = this.snapDirection;\r
        const sqrDist = vec3.squaredDistance(a, b);\r
        const distanceFactor = Math.max(0.1, 1 - sqrDist * 10);\r
        angleFactor *= SNAPPING_INTENSITY * distanceFactor;\r
        this.quatFromVectors(a, b, snapRotation, angleFactor);\r
      }\r
    }\r
\r
    const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);\r
    this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation);\r
    quat.normalize(this.orientation, this.orientation);\r
\r
    const RA_INTENSITY = 0.8 * timeScale;\r
    quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, RA_INTENSITY);\r
    quat.normalize(this._combinedQuat, this._combinedQuat);\r
\r
    const rad = Math.acos(this._combinedQuat[3]) * 2.0;\r
    const s = Math.sin(rad / 2.0);\r
    let rv = 0;\r
    if (s > 0.000001) {\r
      rv = rad / (2 * Math.PI);\r
      this.rotationAxis[0] = this._combinedQuat[0] / s;\r
      this.rotationAxis[1] = this._combinedQuat[1] / s;\r
      this.rotationAxis[2] = this._combinedQuat[2] / s;\r
    }\r
\r
    const RV_INTENSITY = 0.5 * timeScale;\r
    this._rotationVelocity += (rv - this._rotationVelocity) * RV_INTENSITY;\r
    this.rotationVelocity = this._rotationVelocity / timeScale;\r
\r
    this.updateCallback(deltaTime);\r
  }\r
\r
  quatFromVectors(a, b, out, angleFactor = 1) {\r
    const axis = vec3.cross(vec3.create(), a, b);\r
    vec3.normalize(axis, axis);\r
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b)));\r
    const angle = Math.acos(d) * angleFactor;\r
    quat.setAxisAngle(out, axis, angle);\r
    return { q: out, axis, angle };\r
  }\r
\r
  #project(pos) {\r
    const r = 2;\r
    const w = this.canvas.clientWidth;\r
    const h = this.canvas.clientHeight;\r
    const s = Math.max(w, h) - 1;\r
\r
    const x = (2 * pos[0] - w - 1) / s;\r
    const y = (2 * pos[1] - h - 1) / s;\r
    let z = 0;\r
    const xySq = x * x + y * y;\r
    const rSq = r * r;\r
\r
    if (xySq <= rSq / 2.0) {\r
      z = Math.sqrt(rSq - xySq);\r
    } else {\r
      z = rSq / Math.sqrt(xySq);\r
    }\r
    return vec3.fromValues(-x, y, z);\r
  }\r
}\r
\r
class InfiniteGridMenu {\r
  TARGET_FRAME_DURATION = 1000 / 60;\r
  SPHERE_RADIUS = 2;\r
\r
  #time = 0;\r
  #deltaTime = 0;\r
  #deltaFrames = 0;\r
  #frames = 0;\r
\r
  camera = {\r
    matrix: mat4.create(),\r
    near: 0.1,\r
    far: 40,\r
    fov: Math.PI / 4,\r
    aspect: 1,\r
    position: vec3.fromValues(0, 0, 3),\r
    up: vec3.fromValues(0, 1, 0),\r
    matrices: {\r
      view: mat4.create(),\r
      projection: mat4.create(),\r
      inversProjection: mat4.create()\r
    }\r
  };\r
\r
  nearestVertexIndex = null;\r
  smoothRotationVelocity = 0;\r
  scaleFactor = 1.0;\r
  movementActive = false;\r
\r
  constructor(canvas, items, onActiveItemChange, onMovementChange, onInit = null) {\r
    this.canvas = canvas;\r
    this.items = items || [];\r
    this.onActiveItemChange = onActiveItemChange || (() => {});\r
    this.onMovementChange = onMovementChange || (() => {});\r
    this.#init(onInit);\r
  }\r
\r
  resize() {\r
    this.viewportSize = vec2.set(this.viewportSize || vec2.create(), this.canvas.clientWidth, this.canvas.clientHeight);\r
\r
    const gl = this.gl;\r
    const needsResize = resizeCanvasToDisplaySize(gl.canvas);\r
    if (needsResize) {\r
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);\r
    }\r
\r
    this.#updateProjectionMatrix(gl);\r
  }\r
\r
  run(time = 0) {\r
    this.#deltaTime = Math.min(32, time - this.#time);\r
    this.#time = time;\r
    this.#deltaFrames = this.#deltaTime / this.TARGET_FRAME_DURATION;\r
    this.#frames += this.#deltaFrames;\r
\r
    this.#animate(this.#deltaTime);\r
    this.#render();\r
\r
    requestAnimationFrame(t => this.run(t));\r
  }\r
\r
  #init(onInit) {\r
    this.gl = this.canvas.getContext('webgl2', { antialias: true, alpha: false });\r
    const gl = this.gl;\r
    if (!gl) {\r
      throw new Error('No WebGL 2 context!');\r
    }\r
\r
    this.viewportSize = vec2.fromValues(this.canvas.clientWidth, this.canvas.clientHeight);\r
    this.drawBufferSize = vec2.clone(this.viewportSize);\r
\r
    this.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {\r
      aModelPosition: 0,\r
      aModelNormal: 1,\r
      aModelUvs: 2,\r
      aInstanceMatrix: 3\r
    });\r
\r
    this.discLocations = {\r
      aModelPosition: gl.getAttribLocation(this.discProgram, 'aModelPosition'),\r
      aModelUvs: gl.getAttribLocation(this.discProgram, 'aModelUvs'),\r
      aInstanceMatrix: gl.getAttribLocation(this.discProgram, 'aInstanceMatrix'),\r
      uWorldMatrix: gl.getUniformLocation(this.discProgram, 'uWorldMatrix'),\r
      uViewMatrix: gl.getUniformLocation(this.discProgram, 'uViewMatrix'),\r
      uProjectionMatrix: gl.getUniformLocation(this.discProgram, 'uProjectionMatrix'),\r
      uCameraPosition: gl.getUniformLocation(this.discProgram, 'uCameraPosition'),\r
      uScaleFactor: gl.getUniformLocation(this.discProgram, 'uScaleFactor'),\r
      uRotationAxisVelocity: gl.getUniformLocation(this.discProgram, 'uRotationAxisVelocity'),\r
      uTex: gl.getUniformLocation(this.discProgram, 'uTex'),\r
      uFrames: gl.getUniformLocation(this.discProgram, 'uFrames'),\r
      uItemCount: gl.getUniformLocation(this.discProgram, 'uItemCount'),\r
      uAtlasSize: gl.getUniformLocation(this.discProgram, 'uAtlasSize')\r
    };\r
\r
    this.discGeo = new DiscGeometry(56, 1);\r
    this.discBuffers = this.discGeo.data;\r
    this.discVAO = makeVertexArray(\r
      gl,\r
      [\r
        [makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW), this.discLocations.aModelPosition, 3],\r
        [makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW), this.discLocations.aModelUvs, 2]\r
      ],\r
      this.discBuffers.indices\r
    );\r
\r
    this.icoGeo = new IcosahedronGeometry();\r
    this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);\r
    this.instancePositions = this.icoGeo.vertices.map(v => v.position);\r
    this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;\r
    this.#initDiscInstances(this.DISC_INSTANCE_COUNT);\r
\r
    this.worldMatrix = mat4.create();\r
    this.#initTexture();\r
\r
    this.control = new ArcballControl(this.canvas, deltaTime => this.#onControlUpdate(deltaTime));\r
\r
    this.#updateCameraMatrix();\r
    this.#updateProjectionMatrix(gl);\r
    this.resize();\r
\r
    if (onInit) onInit(this);\r
  }\r
\r
  #initTexture() {\r
    const gl = this.gl;\r
    this.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);\r
\r
    const itemCount = Math.max(1, this.items.length);\r
    this.atlasSize = Math.ceil(Math.sqrt(itemCount));\r
    const canvas = document.createElement('canvas');\r
    const ctx = canvas.getContext('2d');\r
    const cellSize = 512;\r
\r
    canvas.width = this.atlasSize * cellSize;\r
    canvas.height = this.atlasSize * cellSize;\r
\r
    Promise.all(\r
      this.items.map(\r
        item =>\r
          new Promise(resolve => {\r
            const img = new Image();\r
            img.crossOrigin = 'anonymous';\r
            img.onload = () => resolve(img);\r
            img.src = item.image;\r
          })\r
      )\r
    ).then(images => {\r
      images.forEach((img, i) => {\r
        const x = (i % this.atlasSize) * cellSize;\r
        const y = Math.floor(i / this.atlasSize) * cellSize;\r
        ctx.drawImage(img, x, y, cellSize, cellSize);\r
      });\r
\r
      gl.bindTexture(gl.TEXTURE_2D, this.tex);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);\r
      gl.generateMipmap(gl.TEXTURE_2D);\r
    });\r
  }\r
\r
  #initDiscInstances(count) {\r
    const gl = this.gl;\r
    this.discInstances = {\r
      matricesArray: new Float32Array(count * 16),\r
      matrices: [],\r
      buffer: gl.createBuffer()\r
    };\r
    for (let i = 0; i < count; ++i) {\r
      const instanceMatrixArray = new Float32Array(this.discInstances.matricesArray.buffer, i * 16 * 4, 16);\r
      instanceMatrixArray.set(mat4.create());\r
      this.discInstances.matrices.push(instanceMatrixArray);\r
    }\r
    gl.bindVertexArray(this.discVAO);\r
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);\r
    gl.bufferData(gl.ARRAY_BUFFER, this.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);\r
    const mat4AttribSlotCount = 4;\r
    const bytesPerMatrix = 16 * 4;\r
    for (let j = 0; j < mat4AttribSlotCount; ++j) {\r
      const loc = this.discLocations.aInstanceMatrix + j;\r
      gl.enableVertexAttribArray(loc);\r
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, bytesPerMatrix, j * 4 * 4);\r
      gl.vertexAttribDivisor(loc, 1);\r
    }\r
    gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
    gl.bindVertexArray(null);\r
  }\r
\r
  #animate(deltaTime) {\r
    const gl = this.gl;\r
    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);\r
\r
    let positions = this.instancePositions.map(p => vec3.transformQuat(vec3.create(), p, this.control.orientation));\r
    const scale = 0.25;\r
    const SCALE_INTENSITY = 0.6;\r
    positions.forEach((p, ndx) => {\r
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);\r
      const finalScale = s * scale;\r
      const matrix = mat4.create();\r
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));\r
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));\r
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));\r
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));\r
\r
      mat4.copy(this.discInstances.matrices[ndx], matrix);\r
    });\r
\r
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);\r
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);\r
    gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
\r
    this.smoothRotationVelocity = this.control.rotationVelocity;\r
  }\r
\r
  #render() {\r
    const gl = this.gl;\r
    gl.useProgram(this.discProgram);\r
\r
    gl.enable(gl.CULL_FACE);\r
    gl.enable(gl.DEPTH_TEST);\r
\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\r
\r
    gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);\r
    gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);\r
    gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);\r
    gl.uniform3f(\r
      this.discLocations.uCameraPosition,\r
      this.camera.position[0],\r
      this.camera.position[1],\r
      this.camera.position[2]\r
    );\r
    gl.uniform4f(\r
      this.discLocations.uRotationAxisVelocity,\r
      this.control.rotationAxis[0],\r
      this.control.rotationAxis[1],\r
      this.control.rotationAxis[2],\r
      this.smoothRotationVelocity * 1.1\r
    );\r
\r
    gl.uniform1i(this.discLocations.uItemCount, this.items.length);\r
    gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);\r
\r
    gl.uniform1f(this.discLocations.uFrames, this.#frames);\r
    gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);\r
    gl.uniform1i(this.discLocations.uTex, 0);\r
    gl.activeTexture(gl.TEXTURE0);\r
    gl.bindTexture(gl.TEXTURE_2D, this.tex);\r
\r
    gl.bindVertexArray(this.discVAO);\r
    gl.drawElementsInstanced(\r
      gl.TRIANGLES,\r
      this.discBuffers.indices.length,\r
      gl.UNSIGNED_SHORT,\r
      0,\r
      this.DISC_INSTANCE_COUNT\r
    );\r
  }\r
\r
  #updateCameraMatrix() {\r
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);\r
    mat4.invert(this.camera.matrices.view, this.camera.matrix);\r
  }\r
\r
  #updateProjectionMatrix(gl) {\r
    this.camera.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;\r
    const height = this.SPHERE_RADIUS * 0.35;\r
    const distance = this.camera.position[2];\r
    if (this.camera.aspect > 1) {\r
      this.camera.fov = 2 * Math.atan(height / distance);\r
    } else {\r
      this.camera.fov = 2 * Math.atan(height / this.camera.aspect / distance);\r
    }\r
    mat4.perspective(\r
      this.camera.matrices.projection,\r
      this.camera.fov,\r
      this.camera.aspect,\r
      this.camera.near,\r
      this.camera.far\r
    );\r
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);\r
  }\r
\r
  #onControlUpdate(deltaTime) {\r
    const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;\r
    let damping = 5 / timeScale;\r
    let cameraTargetZ = 3;\r
\r
    const isMoving = this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;\r
\r
    if (isMoving !== this.movementActive) {\r
      this.movementActive = isMoving;\r
      this.onMovementChange(isMoving);\r
    }\r
\r
    if (!this.control.isPointerDown) {\r
      const nearestVertexIndex = this.#findNearestVertexIndex();\r
      const itemIndex = nearestVertexIndex % Math.max(1, this.items.length);\r
      this.onActiveItemChange(itemIndex);\r
      const snapDirection = vec3.normalize(vec3.create(), this.#getVertexWorldPosition(nearestVertexIndex));\r
      this.control.snapTargetDirection = snapDirection;\r
    } else {\r
      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;\r
      damping = 7 / timeScale;\r
    }\r
\r
    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;\r
    this.#updateCameraMatrix();\r
  }\r
\r
  #findNearestVertexIndex() {\r
    const n = this.control.snapDirection;\r
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);\r
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);\r
\r
    let maxD = -1;\r
    let nearestVertexIndex;\r
    for (let i = 0; i < this.instancePositions.length; ++i) {\r
      const d = vec3.dot(nt, this.instancePositions[i]);\r
      if (d > maxD) {\r
        maxD = d;\r
        nearestVertexIndex = i;\r
      }\r
    }\r
    return nearestVertexIndex;\r
  }\r
\r
  #getVertexWorldPosition(index) {\r
    const nearestVertexPos = this.instancePositions[index];\r
    return vec3.transformQuat(vec3.create(), nearestVertexPos, this.control.orientation);\r
  }\r
}\r
\r
const defaultItems = [\r
  {\r
    image: 'https://picsum.photos/900/900?grayscale',\r
    link: 'https://google.com/',\r
    title: '',\r
    description: ''\r
  }\r
];\r
\r
export default function InfiniteMenu({ items = [] }) {\r
  const canvasRef = useRef(null);\r
  const [activeItem, setActiveItem] = useState(null);\r
  const [isMoving, setIsMoving] = useState(false);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    let sketch;\r
\r
    const handleActiveItem = index => {\r
      const itemIndex = index % items.length;\r
      setActiveItem(items[itemIndex]);\r
    };\r
\r
    if (canvas) {\r
      sketch = new InfiniteGridMenu(canvas, items.length ? items : defaultItems, handleActiveItem, setIsMoving, sk =>\r
        sk.run()\r
      );\r
    }\r
\r
    const handleResize = () => {\r
      if (sketch) {\r
        sketch.resize();\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    handleResize();\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
    };\r
  }, [items]);\r
\r
  const handleButtonClick = () => {\r
    if (!activeItem?.link) return;\r
    if (activeItem.link.startsWith('http')) {\r
      window.open(activeItem.link, '_blank');\r
    } else {\r
      console.log('Internal route:', activeItem.link);\r
    }\r
  };\r
\r
  return (\r
    <div className="relative w-full h-full">\r
      <canvas\r
        id="infinite-grid-menu-canvas"\r
        ref={canvasRef}\r
        className="cursor-grab w-full h-full overflow-hidden relative outline-none active:cursor-grabbing"\r
      />\r
\r
      {activeItem && (\r
        <>\r
          <h2\r
            className={\`\r
          select-none\r
          absolute\r
          font-black\r
          [font-size:4rem]\r
          left-[1.6em]\r
          top-1/2\r
          transform\r
          translate-x-[20%]\r
          -translate-y-1/2\r
          transition-all\r
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]\r
          \${\r
            isMoving\r
              ? 'opacity-0 pointer-events-none duration-[100ms]'\r
              : 'opacity-100 pointer-events-auto duration-[500ms]'\r
          }\r
        \`}\r
          >\r
            {activeItem.title}\r
          </h2>\r
\r
          <p\r
            className={\`\r
          select-none\r
          absolute\r
          max-w-[10ch]\r
          text-[1.5rem]\r
          top-1/2\r
          right-[1%]\r
          transition-all\r
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]\r
          \${\r
            isMoving\r
              ? 'opacity-0 pointer-events-none duration-[100ms] translate-x-[-60%] -translate-y-1/2'\r
              : 'opacity-100 pointer-events-auto duration-[500ms] translate-x-[-90%] -translate-y-1/2'\r
          }\r
        \`}\r
          >\r
            {activeItem.description}\r
          </p>\r
\r
          <div\r
            onClick={handleButtonClick}\r
            className={\`\r
          absolute\r
          left-1/2\r
          z-10\r
          w-[60px]\r
          h-[60px]\r
          grid\r
          place-items-center\r
          bg-[#00ffff]\r
          border-[5px]\r
          border-black\r
          rounded-full\r
          cursor-pointer\r
          transition-all\r
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]\r
          \${\r
            isMoving\r
              ? 'bottom-[-80px] opacity-0 pointer-events-none duration-[100ms] scale-0 -translate-x-1/2'\r
              : 'bottom-[3.8em] opacity-100 pointer-events-auto duration-[500ms] scale-100 -translate-x-1/2'\r
          }\r
        \`}\r
          >\r
            <p className="select-none relative text-[#060010] top-[2px] text-[26px]">&#x2197;</p>\r
          </div>\r
        </>\r
      )}\r
    </div>\r
  );\r
}\r
`,Pn=`import { FC, useRef, useState, useEffect, MutableRefObject } from 'react';\r
import { mat4, quat, vec2, vec3 } from 'gl-matrix';\r
import './InfiniteMenu.css';\r
\r
const discVertShaderSource = \`#version 300 es\r
\r
uniform mat4 uWorldMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec4 uRotationAxisVelocity;\r
\r
in vec3 aModelPosition;\r
in vec3 aModelNormal;\r
in vec2 aModelUvs;\r
in mat4 aInstanceMatrix;\r
\r
out vec2 vUvs;\r
out float vAlpha;\r
flat out int vInstanceId;\r
\r
#define PI 3.141593\r
\r
void main() {\r
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);\r
\r
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;\r
    float radius = length(centerPos.xyz);\r
\r
    if (gl_VertexID > 0) {\r
        vec3 rotationAxis = uRotationAxisVelocity.xyz;\r
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);\r
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));\r
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);\r
        float strength = dot(stretchDir, relativeVertexPos);\r
        float invAbsStrength = min(0., abs(strength) - 1.);\r
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);\r
        worldPosition.xyz += stretchDir * strength;\r
    }\r
\r
    worldPosition.xyz = radius * normalize(worldPosition.xyz);\r
\r
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;\r
\r
    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;\r
    vUvs = aModelUvs;\r
    vInstanceId = gl_InstanceID;\r
}\r
\`;\r
\r
const discFragShaderSource = \`#version 300 es\r
precision highp float;\r
\r
uniform sampler2D uTex;\r
uniform int uItemCount;\r
uniform int uAtlasSize;\r
\r
out vec4 outColor;\r
\r
in vec2 vUvs;\r
in float vAlpha;\r
flat in int vInstanceId;\r
\r
void main() {\r
    int itemIndex = vInstanceId % uItemCount;\r
    int cellsPerRow = uAtlasSize;\r
    int cellX = itemIndex % cellsPerRow;\r
    int cellY = itemIndex / cellsPerRow;\r
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));\r
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;\r
\r
    ivec2 texSize = textureSize(uTex, 0);\r
    float imageAspect = float(texSize.x) / float(texSize.y);\r
    float containerAspect = 1.0;\r
    \r
    float scale = max(imageAspect / containerAspect, \r
                     containerAspect / imageAspect);\r
    \r
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);\r
    st = (st - 0.5) * scale + 0.5;\r
    \r
    st = clamp(st, 0.0, 1.0);\r
    \r
    st = st * cellSize + cellOffset;\r
    \r
    outColor = texture(uTex, st);\r
    outColor.a *= vAlpha;\r
}\r
\`;\r
\r
class Face {\r
  public a: number;\r
  public b: number;\r
  public c: number;\r
\r
  constructor(a: number, b: number, c: number) {\r
    this.a = a;\r
    this.b = b;\r
    this.c = c;\r
  }\r
}\r
\r
class Vertex {\r
  public position: vec3;\r
  public normal: vec3;\r
  public uv: vec2;\r
\r
  constructor(x: number, y: number, z: number) {\r
    this.position = vec3.fromValues(x, y, z);\r
    this.normal = vec3.create();\r
    this.uv = vec2.create();\r
  }\r
}\r
\r
class Geometry {\r
  public vertices: Vertex[];\r
  public faces: Face[];\r
\r
  constructor() {\r
    this.vertices = [];\r
    this.faces = [];\r
  }\r
\r
  public addVertex(...args: number[]): this {\r
    for (let i = 0; i < args.length; i += 3) {\r
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));\r
    }\r
    return this;\r
  }\r
\r
  public addFace(...args: number[]): this {\r
    for (let i = 0; i < args.length; i += 3) {\r
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));\r
    }\r
    return this;\r
  }\r
\r
  public get lastVertex(): Vertex {\r
    return this.vertices[this.vertices.length - 1];\r
  }\r
\r
  public subdivide(divisions = 1): this {\r
    const midPointCache: Record<string, number> = {};\r
    let f = this.faces;\r
\r
    for (let div = 0; div < divisions; ++div) {\r
      const newFaces = new Array<Face>(f.length * 4);\r
\r
      f.forEach((face, ndx) => {\r
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);\r
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);\r
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);\r
\r
        const i = ndx * 4;\r
        newFaces[i + 0] = new Face(face.a, mAB, mCA);\r
        newFaces[i + 1] = new Face(face.b, mBC, mAB);\r
        newFaces[i + 2] = new Face(face.c, mCA, mBC);\r
        newFaces[i + 3] = new Face(mAB, mBC, mCA);\r
      });\r
\r
      f = newFaces;\r
    }\r
\r
    this.faces = f;\r
    return this;\r
  }\r
\r
  public spherize(radius = 1): this {\r
    this.vertices.forEach(vertex => {\r
      vec3.normalize(vertex.normal, vertex.position);\r
      vec3.scale(vertex.position, vertex.normal, radius);\r
    });\r
    return this;\r
  }\r
\r
  public get data(): {\r
    vertices: Float32Array;\r
    indices: Uint16Array;\r
    normals: Float32Array;\r
    uvs: Float32Array;\r
  } {\r
    return {\r
      vertices: this.vertexData,\r
      indices: this.indexData,\r
      normals: this.normalData,\r
      uvs: this.uvData\r
    };\r
  }\r
\r
  public get vertexData(): Float32Array {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.position)));\r
  }\r
\r
  public get normalData(): Float32Array {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.normal)));\r
  }\r
\r
  public get uvData(): Float32Array {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.uv)));\r
  }\r
\r
  public get indexData(): Uint16Array {\r
    return new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c]));\r
  }\r
\r
  public getMidPoint(ndxA: number, ndxB: number, cache: Record<string, number>): number {\r
    const cacheKey = ndxA < ndxB ? \`k_\${ndxB}_\${ndxA}\` : \`k_\${ndxA}_\${ndxB}\`;\r
    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {\r
      return cache[cacheKey];\r
    }\r
    const a = this.vertices[ndxA].position;\r
    const b = this.vertices[ndxB].position;\r
    const ndx = this.vertices.length;\r
    cache[cacheKey] = ndx;\r
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);\r
    return ndx;\r
  }\r
}\r
\r
class IcosahedronGeometry extends Geometry {\r
  constructor() {\r
    super();\r
    const t = Math.sqrt(5) * 0.5 + 0.5;\r
    this.addVertex(\r
      -1,\r
      t,\r
      0,\r
      1,\r
      t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1,\r
      -t,\r
      0,\r
      0,\r
      -1,\r
      t,\r
      0,\r
      1,\r
      t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1,\r
      -t,\r
      t,\r
      0,\r
      -1,\r
      t,\r
      0,\r
      1,\r
      -t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1\r
    ).addFace(\r
      0,\r
      11,\r
      5,\r
      0,\r
      5,\r
      1,\r
      0,\r
      1,\r
      7,\r
      0,\r
      7,\r
      10,\r
      0,\r
      10,\r
      11,\r
      1,\r
      5,\r
      9,\r
      5,\r
      11,\r
      4,\r
      11,\r
      10,\r
      2,\r
      10,\r
      7,\r
      6,\r
      7,\r
      1,\r
      8,\r
      3,\r
      9,\r
      4,\r
      3,\r
      4,\r
      2,\r
      3,\r
      2,\r
      6,\r
      3,\r
      6,\r
      8,\r
      3,\r
      8,\r
      9,\r
      4,\r
      9,\r
      5,\r
      2,\r
      4,\r
      11,\r
      6,\r
      2,\r
      10,\r
      8,\r
      6,\r
      7,\r
      9,\r
      8,\r
      1\r
    );\r
  }\r
}\r
\r
class DiscGeometry extends Geometry {\r
  constructor(steps = 4, radius = 1) {\r
    super();\r
    const safeSteps = Math.max(4, steps);\r
    const alpha = (2 * Math.PI) / safeSteps;\r
\r
    this.addVertex(0, 0, 0);\r
    this.lastVertex.uv[0] = 0.5;\r
    this.lastVertex.uv[1] = 0.5;\r
\r
    for (let i = 0; i < safeSteps; ++i) {\r
      const x = Math.cos(alpha * i);\r
      const y = Math.sin(alpha * i);\r
      this.addVertex(radius * x, radius * y, 0);\r
      this.lastVertex.uv[0] = x * 0.5 + 0.5;\r
      this.lastVertex.uv[1] = y * 0.5 + 0.5;\r
\r
      if (i > 0) {\r
        this.addFace(0, i, i + 1);\r
      }\r
    }\r
    this.addFace(0, safeSteps, 1);\r
  }\r
}\r
\r
function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {\r
  const shader = gl.createShader(type);\r
  if (!shader) return null;\r
  gl.shaderSource(shader, source);\r
  gl.compileShader(shader);\r
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\r
\r
  if (success) {\r
    return shader;\r
  }\r
\r
  console.error(gl.getShaderInfoLog(shader));\r
  gl.deleteShader(shader);\r
  return null;\r
}\r
\r
function createProgram(\r
  gl: WebGL2RenderingContext,\r
  shaderSources: [string, string],\r
  transformFeedbackVaryings?: string[] | null,\r
  attribLocations?: Record<string, number>\r
): WebGLProgram | null {\r
  const program = gl.createProgram();\r
  if (!program) return null;\r
\r
  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {\r
    const shader = createShader(gl, type, shaderSources[ndx]);\r
    if (shader) {\r
      gl.attachShader(program, shader);\r
    }\r
  });\r
\r
  if (transformFeedbackVaryings) {\r
    gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);\r
  }\r
\r
  if (attribLocations) {\r
    for (const attrib in attribLocations) {\r
      if (Object.prototype.hasOwnProperty.call(attribLocations, attrib)) {\r
        gl.bindAttribLocation(program, attribLocations[attrib], attrib);\r
      }\r
    }\r
  }\r
\r
  gl.linkProgram(program);\r
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);\r
\r
  if (success) {\r
    return program;\r
  }\r
\r
  console.error(gl.getProgramInfoLog(program));\r
  gl.deleteProgram(program);\r
  return null;\r
}\r
\r
function makeVertexArray(\r
  gl: WebGL2RenderingContext,\r
  bufLocNumElmPairs: Array<[WebGLBuffer, number, number]>,\r
  indices?: Uint16Array\r
): WebGLVertexArrayObject | null {\r
  const va = gl.createVertexArray();\r
  if (!va) return null;\r
\r
  gl.bindVertexArray(va);\r
\r
  for (const [buffer, loc, numElem] of bufLocNumElmPairs) {\r
    if (loc === -1) continue;\r
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\r
    gl.enableVertexAttribArray(loc);\r
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);\r
  }\r
\r
  if (indices) {\r
    const indexBuffer = gl.createBuffer();\r
    if (indexBuffer) {\r
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);\r
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);\r
    }\r
  }\r
\r
  gl.bindVertexArray(null);\r
  return va;\r
}\r
\r
function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {\r
  const dpr = Math.min(2, window.devicePixelRatio || 1);\r
  const displayWidth = Math.round(canvas.clientWidth * dpr);\r
  const displayHeight = Math.round(canvas.clientHeight * dpr);\r
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;\r
  if (needResize) {\r
    canvas.width = displayWidth;\r
    canvas.height = displayHeight;\r
  }\r
  return needResize;\r
}\r
\r
function makeBuffer(gl: WebGL2RenderingContext, sizeOrData: number | ArrayBufferView, usage: number): WebGLBuffer {\r
  const buf = gl.createBuffer();\r
  if (!buf) {\r
    throw new Error('Failed to create WebGL buffer.');\r
  }\r
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);\r
\r
  if (typeof sizeOrData === 'number') {\r
    gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);\r
  } else {\r
    gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);\r
  }\r
\r
  gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
  return buf;\r
}\r
\r
function createAndSetupTexture(\r
  gl: WebGL2RenderingContext,\r
  minFilter: number,\r
  magFilter: number,\r
  wrapS: number,\r
  wrapT: number\r
): WebGLTexture {\r
  const texture = gl.createTexture();\r
  if (!texture) {\r
    throw new Error('Failed to create WebGL texture.');\r
  }\r
  gl.bindTexture(gl.TEXTURE_2D, texture);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);\r
  return texture;\r
}\r
\r
type UpdateCallback = (deltaTime: number) => void;\r
\r
class ArcballControl {\r
  private canvas: HTMLCanvasElement;\r
  private updateCallback: UpdateCallback;\r
\r
  public isPointerDown = false;\r
  public orientation = quat.create();\r
  public pointerRotation = quat.create();\r
  public rotationVelocity = 0;\r
  public rotationAxis = vec3.fromValues(1, 0, 0);\r
\r
  public snapDirection = vec3.fromValues(0, 0, -1);\r
  public snapTargetDirection: vec3 | null = null;\r
\r
  private pointerPos = vec2.create();\r
  private previousPointerPos = vec2.create();\r
  private _rotationVelocity = 0;\r
  private _combinedQuat = quat.create();\r
\r
  private readonly EPSILON = 0.1;\r
  private readonly IDENTITY_QUAT = quat.create();\r
\r
  constructor(canvas: HTMLCanvasElement, updateCallback?: UpdateCallback) {\r
    this.canvas = canvas;\r
    this.updateCallback = updateCallback || (() => undefined);\r
\r
    canvas.addEventListener('pointerdown', (e: PointerEvent) => {\r
      vec2.set(this.pointerPos, e.clientX, e.clientY);\r
      vec2.copy(this.previousPointerPos, this.pointerPos);\r
      this.isPointerDown = true;\r
    });\r
    canvas.addEventListener('pointerup', () => {\r
      this.isPointerDown = false;\r
    });\r
    canvas.addEventListener('pointerleave', () => {\r
      this.isPointerDown = false;\r
    });\r
    canvas.addEventListener('pointermove', (e: PointerEvent) => {\r
      if (this.isPointerDown) {\r
        vec2.set(this.pointerPos, e.clientX, e.clientY);\r
      }\r
    });\r
\r
    canvas.style.touchAction = 'none';\r
  }\r
\r
  public update(deltaTime: number, targetFrameDuration = 16): void {\r
    const timeScale = deltaTime / targetFrameDuration + 0.00001;\r
    let angleFactor = timeScale;\r
    const snapRotation = quat.create();\r
\r
    if (this.isPointerDown) {\r
      const INTENSITY = 0.3 * timeScale;\r
      const ANGLE_AMPLIFICATION = 5 / timeScale;\r
\r
      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);\r
      vec2.scale(midPointerPos, midPointerPos, INTENSITY);\r
\r
      if (vec2.sqrLen(midPointerPos) > this.EPSILON) {\r
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);\r
\r
        const p = this.project(midPointerPos);\r
        const q = this.project(this.previousPointerPos);\r
        const a = vec3.normalize(vec3.create(), p);\r
        const b = vec3.normalize(vec3.create(), q);\r
\r
        vec2.copy(this.previousPointerPos, midPointerPos);\r
\r
        angleFactor *= ANGLE_AMPLIFICATION;\r
\r
        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);\r
      } else {\r
        quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);\r
      }\r
    } else {\r
      const INTENSITY = 0.1 * timeScale;\r
      quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);\r
\r
      if (this.snapTargetDirection) {\r
        const SNAPPING_INTENSITY = 0.2;\r
        const a = this.snapTargetDirection;\r
        const b = this.snapDirection;\r
        const sqrDist = vec3.squaredDistance(a, b);\r
        const distanceFactor = Math.max(0.1, 1 - sqrDist * 10);\r
        angleFactor *= SNAPPING_INTENSITY * distanceFactor;\r
        this.quatFromVectors(a, b, snapRotation, angleFactor);\r
      }\r
    }\r
\r
    const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);\r
    this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation);\r
    quat.normalize(this.orientation, this.orientation);\r
\r
    const RA_INTENSITY = 0.8 * timeScale;\r
    quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, RA_INTENSITY);\r
    quat.normalize(this._combinedQuat, this._combinedQuat);\r
\r
    const rad = Math.acos(this._combinedQuat[3]) * 2.0;\r
    const s = Math.sin(rad / 2.0);\r
    let rv = 0;\r
    if (s > 0.000001) {\r
      rv = rad / (2 * Math.PI);\r
      this.rotationAxis[0] = this._combinedQuat[0] / s;\r
      this.rotationAxis[1] = this._combinedQuat[1] / s;\r
      this.rotationAxis[2] = this._combinedQuat[2] / s;\r
    }\r
\r
    const RV_INTENSITY = 0.5 * timeScale;\r
    this._rotationVelocity += (rv - this._rotationVelocity) * RV_INTENSITY;\r
    this.rotationVelocity = this._rotationVelocity / timeScale;\r
\r
    this.updateCallback(deltaTime);\r
  }\r
\r
  private quatFromVectors(a: vec3, b: vec3, out: quat, angleFactor = 1): { q: quat; axis: vec3; angle: number } {\r
    const axis = vec3.cross(vec3.create(), a, b);\r
    vec3.normalize(axis, axis);\r
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b)));\r
    const angle = Math.acos(d) * angleFactor;\r
    quat.setAxisAngle(out, axis, angle);\r
    return { q: out, axis, angle };\r
  }\r
\r
  private project(pos: vec2): vec3 {\r
    const r = 2;\r
    const w = this.canvas.clientWidth;\r
    const h = this.canvas.clientHeight;\r
    const s = Math.max(w, h) - 1;\r
\r
    const x = (2 * pos[0] - w - 1) / s;\r
    const y = (2 * pos[1] - h - 1) / s;\r
    let z = 0;\r
    const xySq = x * x + y * y;\r
    const rSq = r * r;\r
\r
    if (xySq <= rSq / 2.0) {\r
      z = Math.sqrt(rSq - xySq);\r
    } else {\r
      z = rSq / Math.sqrt(xySq);\r
    }\r
    return vec3.fromValues(-x, y, z);\r
  }\r
}\r
\r
interface MenuItem {\r
  image: string;\r
  link: string;\r
  title: string;\r
  description: string;\r
}\r
\r
type ActiveItemCallback = (index: number) => void;\r
type MovementChangeCallback = (isMoving: boolean) => void;\r
type InitCallback = (instance: InfiniteGridMenu) => void;\r
\r
interface Camera {\r
  matrix: mat4;\r
  near: number;\r
  far: number;\r
  fov: number;\r
  aspect: number;\r
  position: vec3;\r
  up: vec3;\r
  matrices: {\r
    view: mat4;\r
    projection: mat4;\r
    inversProjection: mat4;\r
  };\r
}\r
\r
class InfiniteGridMenu {\r
  private gl: WebGL2RenderingContext | null = null;\r
  private discProgram: WebGLProgram | null = null;\r
  private discVAO: WebGLVertexArrayObject | null = null;\r
  private discBuffers!: {\r
    vertices: Float32Array;\r
    indices: Uint16Array;\r
    normals: Float32Array;\r
    uvs: Float32Array;\r
  };\r
  private icoGeo!: IcosahedronGeometry;\r
  private discGeo!: DiscGeometry;\r
  private worldMatrix = mat4.create();\r
  private tex: WebGLTexture | null = null;\r
  private control!: ArcballControl;\r
\r
  private discLocations!: {\r
    aModelPosition: number;\r
    aModelUvs: number;\r
    aInstanceMatrix: number;\r
    uWorldMatrix: WebGLUniformLocation | null;\r
    uViewMatrix: WebGLUniformLocation | null;\r
    uProjectionMatrix: WebGLUniformLocation | null;\r
    uCameraPosition: WebGLUniformLocation | null;\r
    uScaleFactor: WebGLUniformLocation | null;\r
    uRotationAxisVelocity: WebGLUniformLocation | null;\r
    uTex: WebGLUniformLocation | null;\r
    uFrames: WebGLUniformLocation | null;\r
    uItemCount: WebGLUniformLocation | null;\r
    uAtlasSize: WebGLUniformLocation | null;\r
  };\r
\r
  private viewportSize = vec2.create();\r
  private drawBufferSize = vec2.create();\r
\r
  private discInstances!: {\r
    matricesArray: Float32Array;\r
    matrices: Float32Array[];\r
    buffer: WebGLBuffer | null;\r
  };\r
\r
  private instancePositions: vec3[] = [];\r
  private DISC_INSTANCE_COUNT = 0;\r
  private atlasSize = 1;\r
\r
  private _time = 0;\r
  private _deltaTime = 0;\r
  private _deltaFrames = 0;\r
  private _frames = 0;\r
\r
  private movementActive = false;\r
\r
  private TARGET_FRAME_DURATION = 1000 / 60;\r
  private SPHERE_RADIUS = 2;\r
\r
  public camera: Camera = {\r
    matrix: mat4.create(),\r
    near: 0.1,\r
    far: 40,\r
    fov: Math.PI / 4,\r
    aspect: 1,\r
    position: vec3.fromValues(0, 0, 3),\r
    up: vec3.fromValues(0, 1, 0),\r
    matrices: {\r
      view: mat4.create(),\r
      projection: mat4.create(),\r
      inversProjection: mat4.create()\r
    }\r
  };\r
\r
  public smoothRotationVelocity = 0;\r
  public scaleFactor = 1.0;\r
\r
  constructor(\r
    private canvas: HTMLCanvasElement,\r
    private items: MenuItem[],\r
    private onActiveItemChange: ActiveItemCallback,\r
    private onMovementChange: MovementChangeCallback,\r
    onInit?: InitCallback\r
  ) {\r
    this.init(onInit);\r
  }\r
\r
  public resize(): void {\r
    const needsResize = resizeCanvasToDisplaySize(this.canvas);\r
    if (!this.gl) return;\r
    if (needsResize) {\r
      this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);\r
    }\r
    this.updateProjectionMatrix();\r
  }\r
\r
  public run(time = 0): void {\r
    this._deltaTime = Math.min(32, time - this._time);\r
    this._time = time;\r
    this._deltaFrames = this._deltaTime / this.TARGET_FRAME_DURATION;\r
    this._frames += this._deltaFrames;\r
\r
    this.animate(this._deltaTime);\r
    this.render();\r
\r
    requestAnimationFrame(t => this.run(t));\r
  }\r
\r
  private init(onInit?: InitCallback): void {\r
    const gl = this.canvas.getContext('webgl2', {\r
      antialias: true,\r
      alpha: false\r
    });\r
    if (!gl) {\r
      throw new Error('No WebGL 2 context!');\r
    }\r
    this.gl = gl;\r
\r
    vec2.set(this.viewportSize, this.canvas.clientWidth, this.canvas.clientHeight);\r
    vec2.clone(this.drawBufferSize);\r
\r
    this.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {\r
      aModelPosition: 0,\r
      aModelNormal: 1,\r
      aModelUvs: 2,\r
      aInstanceMatrix: 3\r
    });\r
\r
    this.discLocations = {\r
      aModelPosition: gl.getAttribLocation(this.discProgram!, 'aModelPosition'),\r
      aModelUvs: gl.getAttribLocation(this.discProgram!, 'aModelUvs'),\r
      aInstanceMatrix: gl.getAttribLocation(this.discProgram!, 'aInstanceMatrix'),\r
      uWorldMatrix: gl.getUniformLocation(this.discProgram!, 'uWorldMatrix'),\r
      uViewMatrix: gl.getUniformLocation(this.discProgram!, 'uViewMatrix'),\r
      uProjectionMatrix: gl.getUniformLocation(this.discProgram!, 'uProjectionMatrix'),\r
      uCameraPosition: gl.getUniformLocation(this.discProgram!, 'uCameraPosition'),\r
      uScaleFactor: gl.getUniformLocation(this.discProgram!, 'uScaleFactor'),\r
      uRotationAxisVelocity: gl.getUniformLocation(this.discProgram!, 'uRotationAxisVelocity'),\r
      uTex: gl.getUniformLocation(this.discProgram!, 'uTex'),\r
      uFrames: gl.getUniformLocation(this.discProgram!, 'uFrames'),\r
      uItemCount: gl.getUniformLocation(this.discProgram!, 'uItemCount'),\r
      uAtlasSize: gl.getUniformLocation(this.discProgram!, 'uAtlasSize')\r
    };\r
\r
    this.discGeo = new DiscGeometry(56, 1);\r
    this.discBuffers = this.discGeo.data;\r
    this.discVAO = makeVertexArray(\r
      gl,\r
      [\r
        [makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW), this.discLocations.aModelPosition, 3],\r
        [makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW), this.discLocations.aModelUvs, 2]\r
      ],\r
      this.discBuffers.indices\r
    );\r
\r
    this.icoGeo = new IcosahedronGeometry();\r
    this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);\r
    this.instancePositions = this.icoGeo.vertices.map(v => v.position);\r
    this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;\r
    this.initDiscInstances(this.DISC_INSTANCE_COUNT);\r
    this.initTexture();\r
\r
    this.control = new ArcballControl(this.canvas, deltaTime => this.onControlUpdate(deltaTime));\r
\r
    this.updateCameraMatrix();\r
    this.updateProjectionMatrix();\r
\r
    this.resize();\r
\r
    if (onInit) {\r
      onInit(this);\r
    }\r
  }\r
\r
  private initTexture(): void {\r
    if (!this.gl) return;\r
    const gl = this.gl;\r
    this.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);\r
\r
    const itemCount = Math.max(1, this.items.length);\r
    this.atlasSize = Math.ceil(Math.sqrt(itemCount));\r
    const cellSize = 512;\r
    const canvas = document.createElement('canvas');\r
    const ctx = canvas.getContext('2d')!;\r
    canvas.width = this.atlasSize * cellSize;\r
    canvas.height = this.atlasSize * cellSize;\r
\r
    Promise.all(\r
      this.items.map(\r
        item =>\r
          new Promise<HTMLImageElement>(resolve => {\r
            const img = new Image();\r
            img.crossOrigin = 'anonymous';\r
            img.onload = () => resolve(img);\r
            img.src = item.image;\r
          })\r
      )\r
    ).then(images => {\r
      images.forEach((img, i) => {\r
        const x = (i % this.atlasSize) * cellSize;\r
        const y = Math.floor(i / this.atlasSize) * cellSize;\r
        ctx.drawImage(img, x, y, cellSize, cellSize);\r
      });\r
\r
      gl.bindTexture(gl.TEXTURE_2D, this.tex);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);\r
      gl.generateMipmap(gl.TEXTURE_2D);\r
    });\r
  }\r
\r
  private initDiscInstances(count: number): void {\r
    if (!this.gl || !this.discVAO) return;\r
    const gl = this.gl;\r
\r
    const matricesArray = new Float32Array(count * 16);\r
    const matrices: Float32Array[] = [];\r
    for (let i = 0; i < count; ++i) {\r
      const instanceMatrixArray = new Float32Array(matricesArray.buffer, i * 16 * 4, 16);\r
      mat4.identity(instanceMatrixArray as unknown as mat4);\r
      matrices.push(instanceMatrixArray);\r
    }\r
\r
    this.discInstances = {\r
      matricesArray,\r
      matrices,\r
      buffer: gl.createBuffer()\r
    };\r
\r
    gl.bindVertexArray(this.discVAO);\r
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);\r
    gl.bufferData(gl.ARRAY_BUFFER, this.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);\r
\r
    const mat4AttribSlotCount = 4;\r
    const bytesPerMatrix = 16 * 4;\r
    for (let j = 0; j < mat4AttribSlotCount; ++j) {\r
      const loc = this.discLocations.aInstanceMatrix + j;\r
      gl.enableVertexAttribArray(loc);\r
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, bytesPerMatrix, j * 4 * 4);\r
      gl.vertexAttribDivisor(loc, 1);\r
    }\r
    gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
    gl.bindVertexArray(null);\r
  }\r
\r
  private animate(deltaTime: number): void {\r
    if (!this.gl) return;\r
    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);\r
\r
    const positions = this.instancePositions.map(p => vec3.transformQuat(vec3.create(), p, this.control.orientation));\r
    const scale = 0.25;\r
    const SCALE_INTENSITY = 0.6;\r
\r
    positions.forEach((p, ndx) => {\r
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);\r
      const finalScale = s * scale;\r
      const matrix = mat4.create();\r
\r
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));\r
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));\r
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));\r
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));\r
\r
      mat4.copy(this.discInstances.matrices[ndx], matrix);\r
    });\r
\r
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.discInstances.buffer);\r
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);\r
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);\r
\r
    this.smoothRotationVelocity = this.control.rotationVelocity;\r
  }\r
\r
  private render(): void {\r
    if (!this.gl || !this.discProgram) return;\r
    const gl = this.gl;\r
\r
    gl.useProgram(this.discProgram);\r
    gl.enable(gl.CULL_FACE);\r
    gl.enable(gl.DEPTH_TEST);\r
\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\r
\r
    gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);\r
    gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);\r
    gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);\r
    gl.uniform3f(\r
      this.discLocations.uCameraPosition,\r
      this.camera.position[0],\r
      this.camera.position[1],\r
      this.camera.position[2]\r
    );\r
    gl.uniform4f(\r
      this.discLocations.uRotationAxisVelocity,\r
      this.control.rotationAxis[0],\r
      this.control.rotationAxis[1],\r
      this.control.rotationAxis[2],\r
      this.smoothRotationVelocity * 1.1\r
    );\r
\r
    gl.uniform1i(this.discLocations.uItemCount, this.items.length);\r
    gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);\r
\r
    gl.uniform1f(this.discLocations.uFrames, this._frames);\r
    gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);\r
\r
    gl.uniform1i(this.discLocations.uTex, 0);\r
    gl.activeTexture(gl.TEXTURE0);\r
    gl.bindTexture(gl.TEXTURE_2D, this.tex);\r
\r
    gl.bindVertexArray(this.discVAO);\r
    gl.drawElementsInstanced(\r
      gl.TRIANGLES,\r
      this.discBuffers.indices.length,\r
      gl.UNSIGNED_SHORT,\r
      0,\r
      this.DISC_INSTANCE_COUNT\r
    );\r
    gl.bindVertexArray(null);\r
  }\r
\r
  private updateCameraMatrix(): void {\r
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);\r
    mat4.invert(this.camera.matrices.view, this.camera.matrix);\r
  }\r
\r
  private updateProjectionMatrix(): void {\r
    if (!this.gl) return;\r
    const canvasEl = this.gl.canvas as HTMLCanvasElement;\r
    this.camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;\r
    const height = this.SPHERE_RADIUS * 0.35;\r
    const distance = this.camera.position[2];\r
    if (this.camera.aspect > 1) {\r
      this.camera.fov = 2 * Math.atan(height / distance);\r
    } else {\r
      this.camera.fov = 2 * Math.atan(height / this.camera.aspect / distance);\r
    }\r
    mat4.perspective(\r
      this.camera.matrices.projection,\r
      this.camera.fov,\r
      this.camera.aspect,\r
      this.camera.near,\r
      this.camera.far\r
    );\r
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);\r
  }\r
\r
  private onControlUpdate(deltaTime: number): void {\r
    const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;\r
    let damping = 5 / timeScale;\r
    let cameraTargetZ = 3;\r
\r
    const isMoving = this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;\r
\r
    if (isMoving !== this.movementActive) {\r
      this.movementActive = isMoving;\r
      this.onMovementChange(isMoving);\r
    }\r
\r
    if (!this.control.isPointerDown) {\r
      const nearestVertexIndex = this.findNearestVertexIndex();\r
      const itemIndex = nearestVertexIndex % Math.max(1, this.items.length);\r
      this.onActiveItemChange(itemIndex);\r
      const snapDirection = vec3.normalize(vec3.create(), this.getVertexWorldPosition(nearestVertexIndex));\r
      this.control.snapTargetDirection = snapDirection;\r
    } else {\r
      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;\r
      damping = 7 / timeScale;\r
    }\r
\r
    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;\r
    this.updateCameraMatrix();\r
  }\r
\r
  private findNearestVertexIndex(): number {\r
    const n = this.control.snapDirection;\r
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);\r
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);\r
\r
    let maxD = -1;\r
    let nearestVertexIndex = 0;\r
    for (let i = 0; i < this.instancePositions.length; ++i) {\r
      const d = vec3.dot(nt, this.instancePositions[i]);\r
      if (d > maxD) {\r
        maxD = d;\r
        nearestVertexIndex = i;\r
      }\r
    }\r
    return nearestVertexIndex;\r
  }\r
\r
  private getVertexWorldPosition(index: number): vec3 {\r
    const nearestVertexPos = this.instancePositions[index];\r
    return vec3.transformQuat(vec3.create(), nearestVertexPos, this.control.orientation);\r
  }\r
}\r
\r
const defaultItems: MenuItem[] = [\r
  {\r
    image: 'https://picsum.photos/900/900?grayscale',\r
    link: 'https://google.com/',\r
    title: '',\r
    description: ''\r
  }\r
];\r
\r
interface InfiniteMenuProps {\r
  items?: MenuItem[];\r
}\r
\r
const InfiniteMenu: FC<InfiniteMenuProps> = ({ items = [] }) => {\r
  const canvasRef = useRef<HTMLCanvasElement | null>(null) as MutableRefObject<HTMLCanvasElement | null>;\r
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);\r
  const [isMoving, setIsMoving] = useState<boolean>(false);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    let sketch: InfiniteGridMenu | null = null;\r
\r
    const handleActiveItem = (index: number) => {\r
      if (!items.length) return;\r
      const itemIndex = index % items.length;\r
      setActiveItem(items[itemIndex]);\r
    };\r
\r
    if (canvas) {\r
      sketch = new InfiniteGridMenu(canvas, items.length ? items : defaultItems, handleActiveItem, setIsMoving, sk =>\r
        sk.run()\r
      );\r
    }\r
\r
    const handleResize = () => {\r
      if (sketch) {\r
        sketch.resize();\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    handleResize();\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
    };\r
  }, [items]);\r
\r
  const handleButtonClick = () => {\r
    if (!activeItem?.link) return;\r
    if (activeItem.link.startsWith('http')) {\r
      window.open(activeItem.link, '_blank');\r
    } else {\r
      console.log('Internal route:', activeItem.link);\r
    }\r
  };\r
\r
  return (\r
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>\r
      <canvas id="infinite-grid-menu-canvas" ref={canvasRef} />\r
\r
      {activeItem && (\r
        <>\r
          <h2 className={\`face-title \${isMoving ? 'inactive' : 'active'}\`}>{activeItem.title}</h2>\r
\r
          <p className={\`face-description \${isMoving ? 'inactive' : 'active'}\`}>{activeItem.description}</p>\r
\r
          <div onClick={handleButtonClick} className={\`action-button \${isMoving ? 'inactive' : 'active'}\`}>\r
            <p className="action-button-icon">&#x2197;</p>\r
          </div>\r
        </>\r
      )}\r
    </div>\r
  );\r
};\r
\r
export default InfiniteMenu;\r
`,Rn=`import { FC, useRef, useState, useEffect, MutableRefObject } from 'react';\r
import { mat4, quat, vec2, vec3 } from 'gl-matrix';\r
\r
const discVertShaderSource = \`#version 300 es\r
\r
uniform mat4 uWorldMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec4 uRotationAxisVelocity;\r
\r
in vec3 aModelPosition;\r
in vec3 aModelNormal;\r
in vec2 aModelUvs;\r
in mat4 aInstanceMatrix;\r
\r
out vec2 vUvs;\r
out float vAlpha;\r
flat out int vInstanceId;\r
\r
#define PI 3.141593\r
\r
void main() {\r
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);\r
\r
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;\r
    float radius = length(centerPos.xyz);\r
\r
    if (gl_VertexID > 0) {\r
        vec3 rotationAxis = uRotationAxisVelocity.xyz;\r
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);\r
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));\r
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);\r
        float strength = dot(stretchDir, relativeVertexPos);\r
        float invAbsStrength = min(0., abs(strength) - 1.);\r
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);\r
        worldPosition.xyz += stretchDir * strength;\r
    }\r
\r
    worldPosition.xyz = radius * normalize(worldPosition.xyz);\r
\r
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;\r
\r
    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;\r
    vUvs = aModelUvs;\r
    vInstanceId = gl_InstanceID;\r
}\r
\`;\r
\r
const discFragShaderSource = \`#version 300 es\r
precision highp float;\r
\r
uniform sampler2D uTex;\r
uniform int uItemCount;\r
uniform int uAtlasSize;\r
\r
out vec4 outColor;\r
\r
in vec2 vUvs;\r
in float vAlpha;\r
flat in int vInstanceId;\r
\r
void main() {\r
    int itemIndex = vInstanceId % uItemCount;\r
    int cellsPerRow = uAtlasSize;\r
    int cellX = itemIndex % cellsPerRow;\r
    int cellY = itemIndex / cellsPerRow;\r
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));\r
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;\r
\r
    ivec2 texSize = textureSize(uTex, 0);\r
    float imageAspect = float(texSize.x) / float(texSize.y);\r
    float containerAspect = 1.0;\r
    \r
    float scale = max(imageAspect / containerAspect, \r
                     containerAspect / imageAspect);\r
    \r
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);\r
    st = (st - 0.5) * scale + 0.5;\r
    \r
    st = clamp(st, 0.0, 1.0);\r
    st = st * cellSize + cellOffset;\r
    \r
    outColor = texture(uTex, st);\r
    outColor.a *= vAlpha;\r
}\r
\`;\r
\r
class Face {\r
  public a: number;\r
  public b: number;\r
  public c: number;\r
\r
  constructor(a: number, b: number, c: number) {\r
    this.a = a;\r
    this.b = b;\r
    this.c = c;\r
  }\r
}\r
\r
class Vertex {\r
  public position: vec3;\r
  public normal: vec3;\r
  public uv: vec2;\r
\r
  constructor(x: number, y: number, z: number) {\r
    this.position = vec3.fromValues(x, y, z);\r
    this.normal = vec3.create();\r
    this.uv = vec2.create();\r
  }\r
}\r
\r
class Geometry {\r
  public vertices: Vertex[];\r
  public faces: Face[];\r
\r
  constructor() {\r
    this.vertices = [];\r
    this.faces = [];\r
  }\r
\r
  public addVertex(...args: number[]): this {\r
    for (let i = 0; i < args.length; i += 3) {\r
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));\r
    }\r
    return this;\r
  }\r
\r
  public addFace(...args: number[]): this {\r
    for (let i = 0; i < args.length; i += 3) {\r
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));\r
    }\r
    return this;\r
  }\r
\r
  public get lastVertex(): Vertex {\r
    return this.vertices[this.vertices.length - 1];\r
  }\r
\r
  public subdivide(divisions = 1): this {\r
    const midPointCache: Record<string, number> = {};\r
    let f = this.faces;\r
\r
    for (let div = 0; div < divisions; ++div) {\r
      const newFaces = new Array<Face>(f.length * 4);\r
\r
      f.forEach((face, ndx) => {\r
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);\r
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);\r
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);\r
\r
        const i = ndx * 4;\r
        newFaces[i + 0] = new Face(face.a, mAB, mCA);\r
        newFaces[i + 1] = new Face(face.b, mBC, mAB);\r
        newFaces[i + 2] = new Face(face.c, mCA, mBC);\r
        newFaces[i + 3] = new Face(mAB, mBC, mCA);\r
      });\r
\r
      f = newFaces;\r
    }\r
\r
    this.faces = f;\r
    return this;\r
  }\r
\r
  public spherize(radius = 1): this {\r
    this.vertices.forEach(vertex => {\r
      vec3.normalize(vertex.normal, vertex.position);\r
      vec3.scale(vertex.position, vertex.normal, radius);\r
    });\r
    return this;\r
  }\r
\r
  public get data(): {\r
    vertices: Float32Array;\r
    indices: Uint16Array;\r
    normals: Float32Array;\r
    uvs: Float32Array;\r
  } {\r
    return {\r
      vertices: this.vertexData,\r
      indices: this.indexData,\r
      normals: this.normalData,\r
      uvs: this.uvData\r
    };\r
  }\r
\r
  public get vertexData(): Float32Array {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.position)));\r
  }\r
\r
  public get normalData(): Float32Array {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.normal)));\r
  }\r
\r
  public get uvData(): Float32Array {\r
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.uv)));\r
  }\r
\r
  public get indexData(): Uint16Array {\r
    return new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c]));\r
  }\r
\r
  public getMidPoint(ndxA: number, ndxB: number, cache: Record<string, number>): number {\r
    const cacheKey = ndxA < ndxB ? \`k_\${ndxB}_\${ndxA}\` : \`k_\${ndxA}_\${ndxB}\`;\r
    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {\r
      return cache[cacheKey];\r
    }\r
    const a = this.vertices[ndxA].position;\r
    const b = this.vertices[ndxB].position;\r
    const ndx = this.vertices.length;\r
    cache[cacheKey] = ndx;\r
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);\r
    return ndx;\r
  }\r
}\r
\r
class IcosahedronGeometry extends Geometry {\r
  constructor() {\r
    super();\r
    const t = Math.sqrt(5) * 0.5 + 0.5;\r
    this.addVertex(\r
      -1,\r
      t,\r
      0,\r
      1,\r
      t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1,\r
      -t,\r
      0,\r
      0,\r
      -1,\r
      t,\r
      0,\r
      1,\r
      t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1,\r
      -t,\r
      t,\r
      0,\r
      -1,\r
      t,\r
      0,\r
      1,\r
      -t,\r
      0,\r
      -1,\r
      -t,\r
      0,\r
      1\r
    ).addFace(\r
      0,\r
      11,\r
      5,\r
      0,\r
      5,\r
      1,\r
      0,\r
      1,\r
      7,\r
      0,\r
      7,\r
      10,\r
      0,\r
      10,\r
      11,\r
      1,\r
      5,\r
      9,\r
      5,\r
      11,\r
      4,\r
      11,\r
      10,\r
      2,\r
      10,\r
      7,\r
      6,\r
      7,\r
      1,\r
      8,\r
      3,\r
      9,\r
      4,\r
      3,\r
      4,\r
      2,\r
      3,\r
      2,\r
      6,\r
      3,\r
      6,\r
      8,\r
      3,\r
      8,\r
      9,\r
      4,\r
      9,\r
      5,\r
      2,\r
      4,\r
      11,\r
      6,\r
      2,\r
      10,\r
      8,\r
      6,\r
      7,\r
      9,\r
      8,\r
      1\r
    );\r
  }\r
}\r
\r
class DiscGeometry extends Geometry {\r
  constructor(steps = 4, radius = 1) {\r
    super();\r
    const safeSteps = Math.max(4, steps);\r
    const alpha = (2 * Math.PI) / safeSteps;\r
\r
    this.addVertex(0, 0, 0);\r
    this.lastVertex.uv[0] = 0.5;\r
    this.lastVertex.uv[1] = 0.5;\r
\r
    for (let i = 0; i < safeSteps; ++i) {\r
      const x = Math.cos(alpha * i);\r
      const y = Math.sin(alpha * i);\r
      this.addVertex(radius * x, radius * y, 0);\r
      this.lastVertex.uv[0] = x * 0.5 + 0.5;\r
      this.lastVertex.uv[1] = y * 0.5 + 0.5;\r
\r
      if (i > 0) {\r
        this.addFace(0, i, i + 1);\r
      }\r
    }\r
    this.addFace(0, safeSteps, 1);\r
  }\r
}\r
\r
function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {\r
  const shader = gl.createShader(type);\r
  if (!shader) return null;\r
  gl.shaderSource(shader, source);\r
  gl.compileShader(shader);\r
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\r
\r
  if (success) {\r
    return shader;\r
  }\r
\r
  console.error(gl.getShaderInfoLog(shader));\r
  gl.deleteShader(shader);\r
  return null;\r
}\r
\r
function createProgram(\r
  gl: WebGL2RenderingContext,\r
  shaderSources: [string, string],\r
  transformFeedbackVaryings?: string[] | null,\r
  attribLocations?: Record<string, number>\r
): WebGLProgram | null {\r
  const program = gl.createProgram();\r
  if (!program) return null;\r
\r
  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {\r
    const shader = createShader(gl, type, shaderSources[ndx]);\r
    if (shader) {\r
      gl.attachShader(program, shader);\r
    }\r
  });\r
\r
  if (transformFeedbackVaryings) {\r
    gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);\r
  }\r
\r
  if (attribLocations) {\r
    for (const attrib in attribLocations) {\r
      if (Object.prototype.hasOwnProperty.call(attribLocations, attrib)) {\r
        gl.bindAttribLocation(program, attribLocations[attrib], attrib);\r
      }\r
    }\r
  }\r
\r
  gl.linkProgram(program);\r
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);\r
\r
  if (success) {\r
    return program;\r
  }\r
\r
  console.error(gl.getProgramInfoLog(program));\r
  gl.deleteProgram(program);\r
  return null;\r
}\r
\r
function makeVertexArray(\r
  gl: WebGL2RenderingContext,\r
  bufLocNumElmPairs: Array<[WebGLBuffer, number, number]>,\r
  indices?: Uint16Array\r
): WebGLVertexArrayObject | null {\r
  const va = gl.createVertexArray();\r
  if (!va) return null;\r
\r
  gl.bindVertexArray(va);\r
\r
  for (const [buffer, loc, numElem] of bufLocNumElmPairs) {\r
    if (loc === -1) continue;\r
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\r
    gl.enableVertexAttribArray(loc);\r
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);\r
  }\r
\r
  if (indices) {\r
    const indexBuffer = gl.createBuffer();\r
    if (indexBuffer) {\r
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);\r
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);\r
    }\r
  }\r
\r
  gl.bindVertexArray(null);\r
  return va;\r
}\r
\r
function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {\r
  const dpr = Math.min(2, window.devicePixelRatio || 1);\r
  const displayWidth = Math.round(canvas.clientWidth * dpr);\r
  const displayHeight = Math.round(canvas.clientHeight * dpr);\r
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;\r
  if (needResize) {\r
    canvas.width = displayWidth;\r
    canvas.height = displayHeight;\r
  }\r
  return needResize;\r
}\r
\r
function makeBuffer(gl: WebGL2RenderingContext, sizeOrData: number | ArrayBufferView, usage: number): WebGLBuffer {\r
  const buf = gl.createBuffer();\r
  if (!buf) {\r
    throw new Error('Failed to create WebGL buffer.');\r
  }\r
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);\r
\r
  if (typeof sizeOrData === 'number') {\r
    gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);\r
  } else {\r
    gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);\r
  }\r
\r
  gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
  return buf;\r
}\r
\r
function createAndSetupTexture(\r
  gl: WebGL2RenderingContext,\r
  minFilter: number,\r
  magFilter: number,\r
  wrapS: number,\r
  wrapT: number\r
): WebGLTexture {\r
  const texture = gl.createTexture();\r
  if (!texture) {\r
    throw new Error('Failed to create WebGL texture.');\r
  }\r
  gl.bindTexture(gl.TEXTURE_2D, texture);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);\r
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);\r
  return texture;\r
}\r
\r
type UpdateCallback = (deltaTime: number) => void;\r
\r
class ArcballControl {\r
  private canvas: HTMLCanvasElement;\r
  private updateCallback: UpdateCallback;\r
\r
  public isPointerDown = false;\r
  public orientation = quat.create();\r
  public pointerRotation = quat.create();\r
  public rotationVelocity = 0;\r
  public rotationAxis = vec3.fromValues(1, 0, 0);\r
\r
  public snapDirection = vec3.fromValues(0, 0, -1);\r
  public snapTargetDirection: vec3 | null = null;\r
\r
  private pointerPos = vec2.create();\r
  private previousPointerPos = vec2.create();\r
  private _rotationVelocity = 0;\r
  private _combinedQuat = quat.create();\r
\r
  private readonly EPSILON = 0.1;\r
  private readonly IDENTITY_QUAT = quat.create();\r
\r
  constructor(canvas: HTMLCanvasElement, updateCallback?: UpdateCallback) {\r
    this.canvas = canvas;\r
    this.updateCallback = updateCallback || (() => undefined);\r
\r
    canvas.addEventListener('pointerdown', (e: PointerEvent) => {\r
      vec2.set(this.pointerPos, e.clientX, e.clientY);\r
      vec2.copy(this.previousPointerPos, this.pointerPos);\r
      this.isPointerDown = true;\r
    });\r
    canvas.addEventListener('pointerup', () => {\r
      this.isPointerDown = false;\r
    });\r
    canvas.addEventListener('pointerleave', () => {\r
      this.isPointerDown = false;\r
    });\r
    canvas.addEventListener('pointermove', (e: PointerEvent) => {\r
      if (this.isPointerDown) {\r
        vec2.set(this.pointerPos, e.clientX, e.clientY);\r
      }\r
    });\r
    canvas.style.touchAction = 'none';\r
  }\r
\r
  public update(deltaTime: number, targetFrameDuration = 16): void {\r
    const timeScale = deltaTime / targetFrameDuration + 0.00001;\r
    let angleFactor = timeScale;\r
    const snapRotation = quat.create();\r
\r
    if (this.isPointerDown) {\r
      const INTENSITY = 0.3 * timeScale;\r
      const ANGLE_AMPLIFICATION = 5 / timeScale;\r
      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);\r
      vec2.scale(midPointerPos, midPointerPos, INTENSITY);\r
\r
      if (vec2.sqrLen(midPointerPos) > this.EPSILON) {\r
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);\r
\r
        const p = this.project(midPointerPos);\r
        const q = this.project(this.previousPointerPos);\r
        const a = vec3.normalize(vec3.create(), p);\r
        const b = vec3.normalize(vec3.create(), q);\r
\r
        vec2.copy(this.previousPointerPos, midPointerPos);\r
\r
        angleFactor *= ANGLE_AMPLIFICATION;\r
\r
        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);\r
      } else {\r
        quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);\r
      }\r
    } else {\r
      const INTENSITY = 0.1 * timeScale;\r
      quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);\r
\r
      if (this.snapTargetDirection) {\r
        const SNAPPING_INTENSITY = 0.2;\r
        const a = this.snapTargetDirection;\r
        const b = this.snapDirection;\r
        const sqrDist = vec3.squaredDistance(a, b);\r
        const distanceFactor = Math.max(0.1, 1 - sqrDist * 10);\r
        angleFactor *= SNAPPING_INTENSITY * distanceFactor;\r
        this.quatFromVectors(a, b, snapRotation, angleFactor);\r
      }\r
    }\r
\r
    const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);\r
    this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation);\r
    quat.normalize(this.orientation, this.orientation);\r
\r
    const RA_INTENSITY = 0.8 * timeScale;\r
    quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, RA_INTENSITY);\r
    quat.normalize(this._combinedQuat, this._combinedQuat);\r
\r
    const rad = Math.acos(this._combinedQuat[3]) * 2.0;\r
    const s = Math.sin(rad / 2.0);\r
    let rv = 0;\r
    if (s > 0.000001) {\r
      rv = rad / (2 * Math.PI);\r
      this.rotationAxis[0] = this._combinedQuat[0] / s;\r
      this.rotationAxis[1] = this._combinedQuat[1] / s;\r
      this.rotationAxis[2] = this._combinedQuat[2] / s;\r
    }\r
\r
    const RV_INTENSITY = 0.5 * timeScale;\r
    this._rotationVelocity += (rv - this._rotationVelocity) * RV_INTENSITY;\r
    this.rotationVelocity = this._rotationVelocity / timeScale;\r
\r
    this.updateCallback(deltaTime);\r
  }\r
\r
  private quatFromVectors(a: vec3, b: vec3, out: quat, angleFactor = 1): { q: quat; axis: vec3; angle: number } {\r
    const axis = vec3.cross(vec3.create(), a, b);\r
    vec3.normalize(axis, axis);\r
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b)));\r
    const angle = Math.acos(d) * angleFactor;\r
    quat.setAxisAngle(out, axis, angle);\r
    return { q: out, axis, angle };\r
  }\r
\r
  private project(pos: vec2): vec3 {\r
    const r = 2;\r
    const w = this.canvas.clientWidth;\r
    const h = this.canvas.clientHeight;\r
    const s = Math.max(w, h) - 1;\r
\r
    const x = (2 * pos[0] - w - 1) / s;\r
    const y = (2 * pos[1] - h - 1) / s;\r
    let z = 0;\r
    const xySq = x * x + y * y;\r
    const rSq = r * r;\r
\r
    if (xySq <= rSq / 2.0) {\r
      z = Math.sqrt(rSq - xySq);\r
    } else {\r
      z = rSq / Math.sqrt(xySq);\r
    }\r
    return vec3.fromValues(-x, y, z);\r
  }\r
}\r
\r
interface MenuItem {\r
  image: string;\r
  link: string;\r
  title: string;\r
  description: string;\r
}\r
\r
type ActiveItemCallback = (index: number) => void;\r
type MovementChangeCallback = (isMoving: boolean) => void;\r
type InitCallback = (instance: InfiniteGridMenu) => void;\r
\r
interface Camera {\r
  matrix: mat4;\r
  near: number;\r
  far: number;\r
  fov: number;\r
  aspect: number;\r
  position: vec3;\r
  up: vec3;\r
  matrices: {\r
    view: mat4;\r
    projection: mat4;\r
    inversProjection: mat4;\r
  };\r
}\r
\r
class InfiniteGridMenu {\r
  private gl: WebGL2RenderingContext | null = null;\r
  private discProgram: WebGLProgram | null = null;\r
  private discVAO: WebGLVertexArrayObject | null = null;\r
  private discBuffers!: {\r
    vertices: Float32Array;\r
    indices: Uint16Array;\r
    normals: Float32Array;\r
    uvs: Float32Array;\r
  };\r
  private icoGeo!: IcosahedronGeometry;\r
  private discGeo!: DiscGeometry;\r
  private worldMatrix = mat4.create();\r
  private tex: WebGLTexture | null = null;\r
  private control!: ArcballControl;\r
\r
  private discLocations!: {\r
    aModelPosition: number;\r
    aModelUvs: number;\r
    aInstanceMatrix: number;\r
    uWorldMatrix: WebGLUniformLocation | null;\r
    uViewMatrix: WebGLUniformLocation | null;\r
    uProjectionMatrix: WebGLUniformLocation | null;\r
    uCameraPosition: WebGLUniformLocation | null;\r
    uScaleFactor: WebGLUniformLocation | null;\r
    uRotationAxisVelocity: WebGLUniformLocation | null;\r
    uTex: WebGLUniformLocation | null;\r
    uFrames: WebGLUniformLocation | null;\r
    uItemCount: WebGLUniformLocation | null;\r
    uAtlasSize: WebGLUniformLocation | null;\r
  };\r
\r
  private viewportSize = vec2.create();\r
  private drawBufferSize = vec2.create();\r
\r
  private discInstances!: {\r
    matricesArray: Float32Array;\r
    matrices: Float32Array[];\r
    buffer: WebGLBuffer | null;\r
  };\r
\r
  private instancePositions: vec3[] = [];\r
  private DISC_INSTANCE_COUNT = 0;\r
  private atlasSize = 1;\r
\r
  private _time = 0;\r
  private _deltaTime = 0;\r
  private _deltaFrames = 0;\r
  private _frames = 0;\r
\r
  private movementActive = false;\r
\r
  private TARGET_FRAME_DURATION = 1000 / 60;\r
  private SPHERE_RADIUS = 2;\r
\r
  public camera: Camera = {\r
    matrix: mat4.create(),\r
    near: 0.1,\r
    far: 40,\r
    fov: Math.PI / 4,\r
    aspect: 1,\r
    position: vec3.fromValues(0, 0, 3),\r
    up: vec3.fromValues(0, 1, 0),\r
    matrices: {\r
      view: mat4.create(),\r
      projection: mat4.create(),\r
      inversProjection: mat4.create()\r
    }\r
  };\r
\r
  public smoothRotationVelocity = 0;\r
  public scaleFactor = 1.0;\r
\r
  constructor(\r
    private canvas: HTMLCanvasElement,\r
    private items: MenuItem[],\r
    private onActiveItemChange: ActiveItemCallback,\r
    private onMovementChange: MovementChangeCallback,\r
    onInit?: InitCallback\r
  ) {\r
    this.init(onInit);\r
  }\r
\r
  public resize(): void {\r
    const needsResize = resizeCanvasToDisplaySize(this.canvas);\r
    if (!this.gl) return;\r
    if (needsResize) {\r
      this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);\r
    }\r
    this.updateProjectionMatrix();\r
  }\r
\r
  public run(time = 0): void {\r
    this._deltaTime = Math.min(32, time - this._time);\r
    this._time = time;\r
    this._deltaFrames = this._deltaTime / this.TARGET_FRAME_DURATION;\r
    this._frames += this._deltaFrames;\r
\r
    this.animate(this._deltaTime);\r
    this.render();\r
\r
    requestAnimationFrame(t => this.run(t));\r
  }\r
\r
  private init(onInit?: InitCallback): void {\r
    const gl = this.canvas.getContext('webgl2', {\r
      antialias: true,\r
      alpha: false\r
    });\r
    if (!gl) {\r
      throw new Error('No WebGL 2 context!');\r
    }\r
    this.gl = gl;\r
\r
    vec2.set(this.viewportSize, this.canvas.clientWidth, this.canvas.clientHeight);\r
    vec2.clone(this.drawBufferSize);\r
\r
    this.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {\r
      aModelPosition: 0,\r
      aModelNormal: 1,\r
      aModelUvs: 2,\r
      aInstanceMatrix: 3\r
    });\r
\r
    this.discLocations = {\r
      aModelPosition: gl.getAttribLocation(this.discProgram!, 'aModelPosition'),\r
      aModelUvs: gl.getAttribLocation(this.discProgram!, 'aModelUvs'),\r
      aInstanceMatrix: gl.getAttribLocation(this.discProgram!, 'aInstanceMatrix'),\r
      uWorldMatrix: gl.getUniformLocation(this.discProgram!, 'uWorldMatrix'),\r
      uViewMatrix: gl.getUniformLocation(this.discProgram!, 'uViewMatrix'),\r
      uProjectionMatrix: gl.getUniformLocation(this.discProgram!, 'uProjectionMatrix'),\r
      uCameraPosition: gl.getUniformLocation(this.discProgram!, 'uCameraPosition'),\r
      uScaleFactor: gl.getUniformLocation(this.discProgram!, 'uScaleFactor'),\r
      uRotationAxisVelocity: gl.getUniformLocation(this.discProgram!, 'uRotationAxisVelocity'),\r
      uTex: gl.getUniformLocation(this.discProgram!, 'uTex'),\r
      uFrames: gl.getUniformLocation(this.discProgram!, 'uFrames'),\r
      uItemCount: gl.getUniformLocation(this.discProgram!, 'uItemCount'),\r
      uAtlasSize: gl.getUniformLocation(this.discProgram!, 'uAtlasSize')\r
    };\r
\r
    this.discGeo = new DiscGeometry(56, 1);\r
    this.discBuffers = this.discGeo.data;\r
    this.discVAO = makeVertexArray(\r
      gl,\r
      [\r
        [makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW), this.discLocations.aModelPosition, 3],\r
        [makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW), this.discLocations.aModelUvs, 2]\r
      ],\r
      this.discBuffers.indices\r
    );\r
\r
    this.icoGeo = new IcosahedronGeometry();\r
    this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);\r
    this.instancePositions = this.icoGeo.vertices.map(v => v.position);\r
    this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;\r
    this.initDiscInstances(this.DISC_INSTANCE_COUNT);\r
    this.initTexture();\r
    this.control = new ArcballControl(this.canvas, deltaTime => this.onControlUpdate(deltaTime));\r
\r
    this.updateCameraMatrix();\r
    this.updateProjectionMatrix();\r
\r
    this.resize();\r
\r
    if (onInit) {\r
      onInit(this);\r
    }\r
  }\r
\r
  private initTexture(): void {\r
    if (!this.gl) return;\r
    const gl = this.gl;\r
    this.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);\r
\r
    const itemCount = Math.max(1, this.items.length);\r
    this.atlasSize = Math.ceil(Math.sqrt(itemCount));\r
    const cellSize = 512;\r
    const canvas = document.createElement('canvas');\r
    const ctx = canvas.getContext('2d')!;\r
    canvas.width = this.atlasSize * cellSize;\r
    canvas.height = this.atlasSize * cellSize;\r
\r
    Promise.all(\r
      this.items.map(\r
        item =>\r
          new Promise<HTMLImageElement>(resolve => {\r
            const img = new Image();\r
            img.crossOrigin = 'anonymous';\r
            img.onload = () => resolve(img);\r
            img.src = item.image;\r
          })\r
      )\r
    ).then(images => {\r
      images.forEach((img, i) => {\r
        const x = (i % this.atlasSize) * cellSize;\r
        const y = Math.floor(i / this.atlasSize) * cellSize;\r
        ctx.drawImage(img, x, y, cellSize, cellSize);\r
      });\r
\r
      gl.bindTexture(gl.TEXTURE_2D, this.tex);\r
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);\r
      gl.generateMipmap(gl.TEXTURE_2D);\r
    });\r
  }\r
\r
  private initDiscInstances(count: number): void {\r
    if (!this.gl || !this.discVAO) return;\r
    const gl = this.gl;\r
\r
    const matricesArray = new Float32Array(count * 16);\r
    const matrices: Float32Array[] = [];\r
    for (let i = 0; i < count; ++i) {\r
      const instanceMatrixArray = new Float32Array(matricesArray.buffer, i * 16 * 4, 16);\r
      mat4.identity(instanceMatrixArray as unknown as mat4);\r
      matrices.push(instanceMatrixArray);\r
    }\r
\r
    this.discInstances = {\r
      matricesArray,\r
      matrices,\r
      buffer: gl.createBuffer()\r
    };\r
\r
    gl.bindVertexArray(this.discVAO);\r
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);\r
    gl.bufferData(gl.ARRAY_BUFFER, this.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);\r
\r
    const mat4AttribSlotCount = 4;\r
    const bytesPerMatrix = 16 * 4;\r
    for (let j = 0; j < mat4AttribSlotCount; ++j) {\r
      const loc = this.discLocations.aInstanceMatrix + j;\r
      gl.enableVertexAttribArray(loc);\r
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, bytesPerMatrix, j * 4 * 4);\r
      gl.vertexAttribDivisor(loc, 1);\r
    }\r
    gl.bindBuffer(gl.ARRAY_BUFFER, null);\r
    gl.bindVertexArray(null);\r
  }\r
\r
  private animate(deltaTime: number): void {\r
    if (!this.gl) return;\r
    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);\r
\r
    const positions = this.instancePositions.map(p => vec3.transformQuat(vec3.create(), p, this.control.orientation));\r
    const scale = 0.25;\r
    const SCALE_INTENSITY = 0.6;\r
\r
    positions.forEach((p, ndx) => {\r
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);\r
      const finalScale = s * scale;\r
      const matrix = mat4.create();\r
\r
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));\r
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));\r
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));\r
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));\r
\r
      mat4.copy(this.discInstances.matrices[ndx], matrix);\r
    });\r
\r
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.discInstances.buffer);\r
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);\r
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);\r
\r
    this.smoothRotationVelocity = this.control.rotationVelocity;\r
  }\r
\r
  private render(): void {\r
    if (!this.gl || !this.discProgram) return;\r
    const gl = this.gl;\r
\r
    gl.useProgram(this.discProgram);\r
    gl.enable(gl.CULL_FACE);\r
    gl.enable(gl.DEPTH_TEST);\r
\r
    gl.clearColor(0, 0, 0, 0);\r
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\r
\r
    gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);\r
    gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);\r
    gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);\r
    gl.uniform3f(\r
      this.discLocations.uCameraPosition,\r
      this.camera.position[0],\r
      this.camera.position[1],\r
      this.camera.position[2]\r
    );\r
    gl.uniform4f(\r
      this.discLocations.uRotationAxisVelocity,\r
      this.control.rotationAxis[0],\r
      this.control.rotationAxis[1],\r
      this.control.rotationAxis[2],\r
      this.smoothRotationVelocity * 1.1\r
    );\r
\r
    gl.uniform1i(this.discLocations.uItemCount, this.items.length);\r
    gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);\r
\r
    gl.uniform1f(this.discLocations.uFrames, this._frames);\r
    gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);\r
\r
    gl.uniform1i(this.discLocations.uTex, 0);\r
    gl.activeTexture(gl.TEXTURE0);\r
    gl.bindTexture(gl.TEXTURE_2D, this.tex);\r
\r
    gl.bindVertexArray(this.discVAO);\r
    gl.drawElementsInstanced(\r
      gl.TRIANGLES,\r
      this.discBuffers.indices.length,\r
      gl.UNSIGNED_SHORT,\r
      0,\r
      this.DISC_INSTANCE_COUNT\r
    );\r
    gl.bindVertexArray(null);\r
  }\r
\r
  private updateCameraMatrix(): void {\r
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);\r
    mat4.invert(this.camera.matrices.view, this.camera.matrix);\r
  }\r
\r
  private updateProjectionMatrix(): void {\r
    if (!this.gl) return;\r
    const canvasEl = this.gl.canvas as HTMLCanvasElement;\r
    this.camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;\r
    const height = this.SPHERE_RADIUS * 0.35;\r
    const distance = this.camera.position[2];\r
    if (this.camera.aspect > 1) {\r
      this.camera.fov = 2 * Math.atan(height / distance);\r
    } else {\r
      this.camera.fov = 2 * Math.atan(height / this.camera.aspect / distance);\r
    }\r
    mat4.perspective(\r
      this.camera.matrices.projection,\r
      this.camera.fov,\r
      this.camera.aspect,\r
      this.camera.near,\r
      this.camera.far\r
    );\r
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);\r
  }\r
\r
  private onControlUpdate(deltaTime: number): void {\r
    const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;\r
    let damping = 5 / timeScale;\r
    let cameraTargetZ = 3;\r
\r
    const isMoving = this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;\r
\r
    if (isMoving !== this.movementActive) {\r
      this.movementActive = isMoving;\r
      this.onMovementChange(isMoving);\r
    }\r
\r
    if (!this.control.isPointerDown) {\r
      const nearestVertexIndex = this.findNearestVertexIndex();\r
      const itemIndex = nearestVertexIndex % Math.max(1, this.items.length);\r
      this.onActiveItemChange(itemIndex);\r
      const snapDirection = vec3.normalize(vec3.create(), this.getVertexWorldPosition(nearestVertexIndex));\r
      this.control.snapTargetDirection = snapDirection;\r
    } else {\r
      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;\r
      damping = 7 / timeScale;\r
    }\r
\r
    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;\r
    this.updateCameraMatrix();\r
  }\r
\r
  private findNearestVertexIndex(): number {\r
    const n = this.control.snapDirection;\r
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);\r
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);\r
\r
    let maxD = -1;\r
    let nearestVertexIndex = 0;\r
    for (let i = 0; i < this.instancePositions.length; ++i) {\r
      const d = vec3.dot(nt, this.instancePositions[i]);\r
      if (d > maxD) {\r
        maxD = d;\r
        nearestVertexIndex = i;\r
      }\r
    }\r
    return nearestVertexIndex;\r
  }\r
\r
  private getVertexWorldPosition(index: number): vec3 {\r
    const nearestVertexPos = this.instancePositions[index];\r
    return vec3.transformQuat(vec3.create(), nearestVertexPos, this.control.orientation);\r
  }\r
}\r
\r
const defaultItems: MenuItem[] = [\r
  {\r
    image: 'https://picsum.photos/900/900?grayscale',\r
    link: 'https://google.com/',\r
    title: '',\r
    description: ''\r
  }\r
];\r
\r
interface InfiniteMenuProps {\r
  items?: MenuItem[];\r
}\r
\r
const InfiniteMenu: FC<InfiniteMenuProps> = ({ items = [] }) => {\r
  const canvasRef = useRef<HTMLCanvasElement | null>(null) as MutableRefObject<HTMLCanvasElement | null>;\r
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);\r
  const [isMoving, setIsMoving] = useState<boolean>(false);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    let sketch: InfiniteGridMenu | null = null;\r
\r
    const handleActiveItem = (index: number) => {\r
      if (!items.length) return;\r
      const itemIndex = index % items.length;\r
      setActiveItem(items[itemIndex]);\r
    };\r
\r
    if (canvas) {\r
      sketch = new InfiniteGridMenu(canvas, items.length ? items : defaultItems, handleActiveItem, setIsMoving, sk =>\r
        sk.run()\r
      );\r
    }\r
\r
    const handleResize = () => {\r
      if (sketch) {\r
        sketch.resize();\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    handleResize();\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
    };\r
  }, [items]);\r
\r
  const handleButtonClick = () => {\r
    if (!activeItem?.link) return;\r
    if (activeItem.link.startsWith('http')) {\r
      window.open(activeItem.link, '_blank');\r
    } else {\r
      console.log('Internal route:', activeItem.link);\r
    }\r
  };\r
\r
  return (\r
    <div className="relative w-full h-full">\r
      <canvas\r
        id="infinite-grid-menu-canvas"\r
        ref={canvasRef}\r
        className="cursor-grab w-full h-full overflow-hidden relative outline-none active:cursor-grabbing"\r
      />\r
\r
      {activeItem && (\r
        <>\r
          <h2\r
            className={\`\r
          select-none\r
          absolute\r
          font-black\r
          [font-size:4rem]\r
          left-[1.6em]\r
          top-1/2\r
          transform\r
          translate-x-[20%]\r
          -translate-y-1/2\r
          transition-all\r
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]\r
          \${\r
            isMoving\r
              ? 'opacity-0 pointer-events-none duration-[100ms]'\r
              : 'opacity-100 pointer-events-auto duration-[500ms]'\r
          }\r
        \`}\r
          >\r
            {activeItem.title}\r
          </h2>\r
\r
          <p\r
            className={\`\r
          select-none\r
          absolute\r
          max-w-[10ch]\r
          text-[1.5rem]\r
          top-1/2\r
          right-[1%]\r
          transition-all\r
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]\r
          \${\r
            isMoving\r
              ? 'opacity-0 pointer-events-none duration-[100ms] translate-x-[-60%] -translate-y-1/2'\r
              : 'opacity-100 pointer-events-auto duration-[500ms] translate-x-[-90%] -translate-y-1/2'\r
          }\r
        \`}\r
          >\r
            {activeItem.description}\r
          </p>\r
\r
          <div\r
            onClick={handleButtonClick}\r
            className={\`\r
          absolute\r
          left-1/2\r
          z-10\r
          w-[60px]\r
          h-[60px]\r
          grid\r
          place-items-center\r
          bg-[#00ffff]\r
          border-[5px]\r
          border-black\r
          rounded-full\r
          cursor-pointer\r
          transition-all\r
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]\r
          \${\r
            isMoving\r
              ? 'bottom-[-80px] opacity-0 pointer-events-none duration-[100ms] scale-0 -translate-x-1/2'\r
              : 'bottom-[3.8em] opacity-100 pointer-events-auto duration-[500ms] scale-100 -translate-x-1/2'\r
          }\r
        \`}\r
          >\r
            <p className="select-none relative text-[#060010] top-[2px] text-[26px]">&#x2197;</p>\r
          </div>\r
        </>\r
      )}\r
    </div>\r
  );\r
};\r
\r
export default InfiniteMenu;\r
`,En={dependencies:"gl-matrix",usage:`import InfiniteMenu from './InfiniteMenu'

const items = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];

<div style={{ height: '600px', position: 'relative' }}>
  <InfiniteMenu items={items}/>
</div>`,code:bn,css:In,tailwind:Tn,tsCode:Pn,tsTailwind:Rn},wn=()=>{const[r,n]=V.useState(!0),t=[{name:"items",type:"object[]",default:"[{...}]",description:"List of items containing an image, link, title, and description - or just add what you need."}],e=[{image:"https://picsum.photos/300/300?grayscale",link:"https://google.com/",title:"Item 1",description:"This is pretty cool, right?"},{image:"https://picsum.photos/400/400?grayscale",link:"https://google.com/",title:"Item 2",description:"This is pretty cool, right?"},{image:"https://picsum.photos/500/500?grayscale",link:"https://google.com/",title:"Item 3",description:"This is pretty cool, right?"},{image:"https://picsum.photos/600/600?grayscale",link:"https://google.com/",title:"Item 4",description:"This is pretty cool, right?"}];return V.useEffect(()=>{setTimeout(()=>{n(!1)},1e3)},[]),P.jsxs(Fr,{children:[P.jsxs(wr,{children:[P.jsxs(hr,{position:"relative",className:"demo-container",h:600,overflow:"hidden",p:0,children:[r&&P.jsx(_r,{size:"lg",position:"absolute"}),P.jsx(hr,{h:600,overflow:"hidden",w:"100%",p:0,opacity:r?0:1,transform:r?"scale(5)":"scale(1)",transition:"1s ease",children:P.jsx(An,{items:e})})]}),P.jsx(Dr,{data:t}),P.jsx(Vr,{dependencyList:["gl-matrix"]})]}),P.jsx(Lr,{children:P.jsx(Cr,{codeObject:En})})]})};export{wn as default};
