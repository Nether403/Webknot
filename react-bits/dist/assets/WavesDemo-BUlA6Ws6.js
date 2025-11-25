import{r as m,j as c,B as tn,F as sn,T as on,d as an}from"./index-wsKSLPNH.js";import{T as un,P as cn,a as mn,C as dn,b as pn}from"./PropTable-C4uPWs8h.js";import{C as ln}from"./Customize-1m_ZNqR9.js";import{P as fn}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";class p{constructor(r,t,i){this.x=r,this.y=t,this.z=i}dot2(r,t){return this.x*r+this.y*t}}class vn{constructor(r=0){this.grad3=[new p(1,1,0),new p(-1,1,0),new p(1,-1,0),new p(-1,-1,0),new p(1,0,1),new p(-1,0,1),new p(1,0,-1),new p(-1,0,-1),new p(0,1,1),new p(0,-1,1),new p(0,1,-1),new p(0,-1,-1)],this.p=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],this.perm=new Array(512),this.gradP=new Array(512),this.seed(r)}seed(r){r>0&&r<1&&(r*=65536),r=Math.floor(r),r<256&&(r|=r<<8);for(let t=0;t<256;t++){let i=t&1?this.p[t]^r&255:this.p[t]^r>>8&255;this.perm[t]=this.perm[t+256]=i,this.gradP[t]=this.gradP[t+256]=this.grad3[i%12]}}fade(r){return r*r*r*(r*(r*6-15)+10)}lerp(r,t,i){return(1-i)*r+i*t}perlin2(r,t){let i=Math.floor(r),d=Math.floor(t);r-=i,t-=d,i&=255,d&=255;const l=this.gradP[i+this.perm[d]].dot2(r,t),R=this.gradP[i+this.perm[d+1]].dot2(r,t-1),M=this.gradP[i+1+this.perm[d]].dot2(r-1,t),G=this.gradP[i+1+this.perm[d+1]].dot2(r-1,t-1),b=this.fade(r);return this.lerp(this.lerp(l,M,b),this.lerp(R,G,b),this.fade(t))}}const hn=({lineColor:f="black",backgroundColor:r="transparent",waveSpeedX:t=.0125,waveSpeedY:i=.005,waveAmpX:d=32,waveAmpY:l=16,xGap:R=10,yGap:M=32,friction:G=.925,tension:b=.005,maxCursorMove:L=100,style:K={},className:Q=""})=>{const N=m.useRef(null),W=m.useRef(null),I=m.useRef(null),g=m.useRef({width:0,height:0,left:0,top:0}),U=m.useRef(new vn(Math.random())),C=m.useRef([]),A=m.useRef({x:-10,y:0,lx:0,ly:0,sx:0,sy:0,v:0,vs:0,a:0,set:!1}),S=m.useRef({lineColor:f,waveSpeedX:t,waveSpeedY:i,waveAmpX:d,waveAmpY:l,friction:G,tension:b,maxCursorMove:L,xGap:R,yGap:M}),E=m.useRef(null);return m.useEffect(()=>{S.current={lineColor:f,waveSpeedX:t,waveSpeedY:i,waveAmpX:d,waveAmpY:l,friction:G,tension:b,maxCursorMove:L,xGap:R,yGap:M}},[f,t,i,d,l,G,b,L,R,M]),m.useEffect(()=>{console.log("Waves mounted");const z=W.current,k=N.current;I.current=z.getContext("2d");function F(){g.current=k.getBoundingClientRect(),z.width=g.current.width,z.height=g.current.height}function H(){const{width:o,height:n}=g.current;C.current=[];const e=o+200,a=n+30,{xGap:u,yGap:x}=S.current,y=Math.ceil(e/u),v=Math.ceil(a/x),w=(o-u*y)/2,X=(n-x*v)/2;for(let h=0;h<=y;h++){const Y=[];for(let s=0;s<=v;s++)Y.push({x:w+u*h,y:X+x*s,wave:{x:0,y:0},cursor:{x:0,y:0,vx:0,vy:0}});C.current.push(Y)}}function Z(o){const n=C.current,e=A.current,a=U.current,{waveSpeedX:u,waveSpeedY:x,waveAmpX:y,waveAmpY:v,friction:w,tension:X,maxCursorMove:h}=S.current;n.forEach(Y=>{Y.forEach(s=>{const O=a.perlin2((s.x+o*u)*.002,(s.y+o*x)*.0015)*12;s.wave.x=Math.cos(O)*y,s.wave.y=Math.sin(O)*v;const nn=s.x-e.sx,rn=s.y-e.sy,j=Math.hypot(nn,rn),P=Math.max(175,e.vs);if(j<P){const en=1-j/P,J=Math.cos(j*.001)*en;s.cursor.vx+=Math.cos(e.a)*J*P*e.vs*65e-5,s.cursor.vy+=Math.sin(e.a)*J*P*e.vs*65e-5}s.cursor.vx+=(0-s.cursor.x)*X,s.cursor.vy+=(0-s.cursor.y)*X,s.cursor.vx*=w,s.cursor.vy*=w,s.cursor.x+=s.cursor.vx*2,s.cursor.y+=s.cursor.vy*2,s.cursor.x=Math.min(h,Math.max(-h,s.cursor.x)),s.cursor.y=Math.min(h,Math.max(-h,s.cursor.y))})})}function T(o,n=!0){const e=o.x+o.wave.x+(n?o.cursor.x:0),a=o.y+o.wave.y+(n?o.cursor.y:0);return{x:Math.round(e*10)/10,y:Math.round(a*10)/10}}function _(){const{width:o,height:n}=g.current,e=I.current;e.clearRect(0,0,o,n),e.beginPath(),e.strokeStyle=S.current.lineColor,C.current.forEach(a=>{let u=T(a[0],!1);e.moveTo(u.x,u.y),a.forEach((x,y)=>{const v=y===a.length-1;u=T(x,!v);const w=T(a[y+1]||a[a.length-1],!v);e.lineTo(u.x,u.y),v&&e.moveTo(w.x,w.y)})}),e.stroke()}function $(o){const n=A.current;n.sx+=(n.x-n.sx)*.1,n.sy+=(n.y-n.sy)*.1;const e=n.x-n.lx,a=n.y-n.ly,u=Math.hypot(e,a);n.v=u,n.vs+=(u-n.vs)*.1,n.vs=Math.min(100,n.vs),n.lx=n.x,n.ly=n.y,n.a=Math.atan2(a,e),k.style.setProperty("--x",`${n.sx}px`),k.style.setProperty("--y",`${n.sy}px`),Z(o),_(),E.current=requestAnimationFrame($)}function q(){F(),H()}function D(o){V(o.clientX,o.clientY)}function B(o){const n=o.touches[0];V(n.clientX,n.clientY)}function V(o,n){const e=A.current,a=g.current;e.x=o-a.left,e.y=n-a.top,e.set||(e.sx=e.x,e.sy=e.y,e.lx=e.x,e.ly=e.y,e.set=!0)}return F(),H(),E.current=requestAnimationFrame($),window.addEventListener("resize",q),window.addEventListener("mousemove",D),window.addEventListener("touchmove",B,{passive:!1}),()=>{window.removeEventListener("resize",q),window.removeEventListener("mousemove",D),window.removeEventListener("touchmove",B),cancelAnimationFrame(E.current)}},[]),c.jsx("div",{ref:N,className:`waves ${Q}`,style:{position:"absolute",top:0,left:0,margin:0,padding:0,width:"100%",height:"100%",overflow:"hidden",backgroundColor:r,...K},children:c.jsx("canvas",{ref:W,className:"waves-canvas"})})},xn=`import { useRef, useEffect } from 'react';\r
import './Waves.css';\r
\r
class Grad {\r
  constructor(x, y, z) {\r
    this.x = x;\r
    this.y = y;\r
    this.z = z;\r
  }\r
  dot2(x, y) {\r
    return this.x * x + this.y * y;\r
  }\r
}\r
\r
class Noise {\r
  constructor(seed = 0) {\r
    this.grad3 = [\r
      new Grad(1, 1, 0),\r
      new Grad(-1, 1, 0),\r
      new Grad(1, -1, 0),\r
      new Grad(-1, -1, 0),\r
      new Grad(1, 0, 1),\r
      new Grad(-1, 0, 1),\r
      new Grad(1, 0, -1),\r
      new Grad(-1, 0, -1),\r
      new Grad(0, 1, 1),\r
      new Grad(0, -1, 1),\r
      new Grad(0, 1, -1),\r
      new Grad(0, -1, -1)\r
    ];\r
    this.p = [\r
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240,\r
      21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88,\r
      237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83,\r
      111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216,\r
      80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,\r
      3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58,\r
      17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,\r
      129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193,\r
      238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,\r
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,\r
      195, 78, 66, 215, 61, 156, 180\r
    ];\r
    this.perm = new Array(512);\r
    this.gradP = new Array(512);\r
    this.seed(seed);\r
  }\r
  seed(seed) {\r
    if (seed > 0 && seed < 1) seed *= 65536;\r
    seed = Math.floor(seed);\r
    if (seed < 256) seed |= seed << 8;\r
    for (let i = 0; i < 256; i++) {\r
      let v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);\r
      this.perm[i] = this.perm[i + 256] = v;\r
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];\r
    }\r
  }\r
  fade(t) {\r
    return t * t * t * (t * (t * 6 - 15) + 10);\r
  }\r
  lerp(a, b, t) {\r
    return (1 - t) * a + t * b;\r
  }\r
  perlin2(x, y) {\r
    let X = Math.floor(x),\r
      Y = Math.floor(y);\r
    x -= X;\r
    y -= Y;\r
    X &= 255;\r
    Y &= 255;\r
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);\r
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);\r
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);\r
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);\r
    const u = this.fade(x);\r
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y));\r
  }\r
}\r
\r
const Waves = ({\r
  lineColor = 'black',\r
  backgroundColor = 'transparent',\r
  waveSpeedX = 0.0125,\r
  waveSpeedY = 0.005,\r
  waveAmpX = 32,\r
  waveAmpY = 16,\r
  xGap = 10,\r
  yGap = 32,\r
  friction = 0.925,\r
  tension = 0.005,\r
  maxCursorMove = 100,\r
  style = {},\r
  className = ''\r
}) => {\r
  const containerRef = useRef(null);\r
  const canvasRef = useRef(null);\r
  const ctxRef = useRef(null);\r
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 });\r
  const noiseRef = useRef(new Noise(Math.random()));\r
  const linesRef = useRef([]);\r
  const mouseRef = useRef({\r
    x: -10,\r
    y: 0,\r
    lx: 0,\r
    ly: 0,\r
    sx: 0,\r
    sy: 0,\r
    v: 0,\r
    vs: 0,\r
    a: 0,\r
    set: false\r
  });\r
  const configRef = useRef({\r
    lineColor,\r
    waveSpeedX,\r
    waveSpeedY,\r
    waveAmpX,\r
    waveAmpY,\r
    friction,\r
    tension,\r
    maxCursorMove,\r
    xGap,\r
    yGap\r
  });\r
  const frameIdRef = useRef(null);\r
\r
  useEffect(() => {\r
    configRef.current = {\r
      lineColor,\r
      waveSpeedX,\r
      waveSpeedY,\r
      waveAmpX,\r
      waveAmpY,\r
      friction,\r
      tension,\r
      maxCursorMove,\r
      xGap,\r
      yGap\r
    };\r
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);\r
\r
  useEffect(() => {\r
    console.log('Waves mounted');\r
    const canvas = canvasRef.current;\r
    const container = containerRef.current;\r
    ctxRef.current = canvas.getContext('2d');\r
\r
    function setSize() {\r
      boundingRef.current = container.getBoundingClientRect();\r
      canvas.width = boundingRef.current.width;\r
      canvas.height = boundingRef.current.height;\r
    }\r
\r
    function setLines() {\r
      const { width, height } = boundingRef.current;\r
      linesRef.current = [];\r
      const oWidth = width + 200,\r
        oHeight = height + 30;\r
      const { xGap, yGap } = configRef.current;\r
      const totalLines = Math.ceil(oWidth / xGap);\r
      const totalPoints = Math.ceil(oHeight / yGap);\r
      const xStart = (width - xGap * totalLines) / 2;\r
      const yStart = (height - yGap * totalPoints) / 2;\r
      for (let i = 0; i <= totalLines; i++) {\r
        const pts = [];\r
        for (let j = 0; j <= totalPoints; j++) {\r
          pts.push({\r
            x: xStart + xGap * i,\r
            y: yStart + yGap * j,\r
            wave: { x: 0, y: 0 },\r
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }\r
          });\r
        }\r
        linesRef.current.push(pts);\r
      }\r
    }\r
\r
    function movePoints(time) {\r
      const lines = linesRef.current,\r
        mouse = mouseRef.current,\r
        noise = noiseRef.current;\r
      const { waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove } = configRef.current;\r
      lines.forEach(pts => {\r
        pts.forEach(p => {\r
          const move = noise.perlin2((p.x + time * waveSpeedX) * 0.002, (p.y + time * waveSpeedY) * 0.0015) * 12;\r
          p.wave.x = Math.cos(move) * waveAmpX;\r
          p.wave.y = Math.sin(move) * waveAmpY;\r
\r
          const dx = p.x - mouse.sx,\r
            dy = p.y - mouse.sy;\r
          const dist = Math.hypot(dx, dy),\r
            l = Math.max(175, mouse.vs);\r
          if (dist < l) {\r
            const s = 1 - dist / l;\r
            const f = Math.cos(dist * 0.001) * s;\r
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;\r
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;\r
          }\r
\r
          p.cursor.vx += (0 - p.cursor.x) * tension;\r
          p.cursor.vy += (0 - p.cursor.y) * tension;\r
          p.cursor.vx *= friction;\r
          p.cursor.vy *= friction;\r
          p.cursor.x += p.cursor.vx * 2;\r
          p.cursor.y += p.cursor.vy * 2;\r
          p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x));\r
          p.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.y));\r
        });\r
      });\r
    }\r
\r
    function moved(point, withCursor = true) {\r
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);\r
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);\r
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };\r
    }\r
\r
    function drawLines() {\r
      const { width, height } = boundingRef.current;\r
      const ctx = ctxRef.current;\r
      ctx.clearRect(0, 0, width, height);\r
      ctx.beginPath();\r
      ctx.strokeStyle = configRef.current.lineColor;\r
      linesRef.current.forEach(points => {\r
        let p1 = moved(points[0], false);\r
        ctx.moveTo(p1.x, p1.y);\r
        points.forEach((p, idx) => {\r
          const isLast = idx === points.length - 1;\r
          p1 = moved(p, !isLast);\r
          const p2 = moved(points[idx + 1] || points[points.length - 1], !isLast);\r
          ctx.lineTo(p1.x, p1.y);\r
          if (isLast) ctx.moveTo(p2.x, p2.y);\r
        });\r
      });\r
      ctx.stroke();\r
    }\r
\r
    function tick(t) {\r
      const mouse = mouseRef.current;\r
      mouse.sx += (mouse.x - mouse.sx) * 0.1;\r
      mouse.sy += (mouse.y - mouse.sy) * 0.1;\r
      const dx = mouse.x - mouse.lx,\r
        dy = mouse.y - mouse.ly;\r
      const d = Math.hypot(dx, dy);\r
      mouse.v = d;\r
      mouse.vs += (d - mouse.vs) * 0.1;\r
      mouse.vs = Math.min(100, mouse.vs);\r
      mouse.lx = mouse.x;\r
      mouse.ly = mouse.y;\r
      mouse.a = Math.atan2(dy, dx);\r
      container.style.setProperty('--x', \`\${mouse.sx}px\`);\r
      container.style.setProperty('--y', \`\${mouse.sy}px\`);\r
\r
      movePoints(t);\r
      drawLines();\r
      frameIdRef.current = requestAnimationFrame(tick);\r
    }\r
\r
    function onResize() {\r
      setSize();\r
      setLines();\r
    }\r
    function onMouseMove(e) {\r
      updateMouse(e.clientX, e.clientY);\r
    }\r
    function onTouchMove(e) {\r
      const touch = e.touches[0];\r
      updateMouse(touch.clientX, touch.clientY);\r
    }\r
    function updateMouse(x, y) {\r
      const mouse = mouseRef.current,\r
        b = boundingRef.current;\r
      mouse.x = x - b.left;\r
      mouse.y = y - b.top;\r
      if (!mouse.set) {\r
        mouse.sx = mouse.x;\r
        mouse.sy = mouse.y;\r
        mouse.lx = mouse.x;\r
        mouse.ly = mouse.y;\r
        mouse.set = true;\r
      }\r
    }\r
\r
    setSize();\r
    setLines();\r
    frameIdRef.current = requestAnimationFrame(tick);\r
    window.addEventListener('resize', onResize);\r
    window.addEventListener('mousemove', onMouseMove);\r
    window.addEventListener('touchmove', onTouchMove, { passive: false });\r
\r
    return () => {\r
      window.removeEventListener('resize', onResize);\r
      window.removeEventListener('mousemove', onMouseMove);\r
      window.removeEventListener('touchmove', onTouchMove);\r
      cancelAnimationFrame(frameIdRef.current);\r
    };\r
  }, []);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`waves \${className}\`}\r
      style={{\r
        position: 'absolute',\r
        top: 0,\r
        left: 0,\r
        margin: 0,\r
        padding: 0,\r
        width: '100%',\r
        height: '100%',\r
        overflow: 'hidden',\r
        backgroundColor,\r
        ...style\r
      }}\r
    >\r
      <canvas ref={canvasRef} className="waves-canvas" />\r
    </div>\r
  );\r
};\r
\r
export default Waves;\r
`,yn=`.waves {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  margin: 0;\r
  padding: 0;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
}\r
\r
.waves::before {\r
  content: '';\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 0.5rem;\r
  height: 0.5rem;\r
  background: #160000;\r
  border-radius: 50%;\r
  transform: translate3d(calc(var(-0.5rem) - 50%), calc(var(50%) - 50%), 0);\r
  will-change: transform;\r
}\r
\r
.waves-canvas {\r
  display: block;\r
  width: 100%;\r
  height: 100%;\r
}\r
`,wn=`import { useRef, useEffect } from 'react';\r
\r
class Grad {\r
  constructor(x, y, z) {\r
    this.x = x;\r
    this.y = y;\r
    this.z = z;\r
  }\r
  dot2(x, y) {\r
    return this.x * x + this.y * y;\r
  }\r
}\r
\r
class Noise {\r
  constructor(seed = 0) {\r
    this.grad3 = [\r
      new Grad(1, 1, 0),\r
      new Grad(-1, 1, 0),\r
      new Grad(1, -1, 0),\r
      new Grad(-1, -1, 0),\r
      new Grad(1, 0, 1),\r
      new Grad(-1, 0, 1),\r
      new Grad(1, 0, -1),\r
      new Grad(-1, 0, -1),\r
      new Grad(0, 1, 1),\r
      new Grad(0, -1, 1),\r
      new Grad(0, 1, -1),\r
      new Grad(0, -1, -1)\r
    ];\r
    this.p = [\r
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240,\r
      21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88,\r
      237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83,\r
      111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216,\r
      80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,\r
      3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58,\r
      17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,\r
      129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193,\r
      238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,\r
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,\r
      195, 78, 66, 215, 61, 156, 180\r
    ];\r
    this.perm = new Array(512);\r
    this.gradP = new Array(512);\r
    this.seed(seed);\r
  }\r
  seed(seed) {\r
    if (seed > 0 && seed < 1) seed *= 65536;\r
    seed = Math.floor(seed);\r
    if (seed < 256) seed |= seed << 8;\r
    for (let i = 0; i < 256; i++) {\r
      let v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);\r
      this.perm[i] = this.perm[i + 256] = v;\r
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];\r
    }\r
  }\r
  fade(t) {\r
    return t * t * t * (t * (t * 6 - 15) + 10);\r
  }\r
  lerp(a, b, t) {\r
    return (1 - t) * a + t * b;\r
  }\r
  perlin2(x, y) {\r
    let X = Math.floor(x),\r
      Y = Math.floor(y);\r
    x -= X;\r
    y -= Y;\r
    X &= 255;\r
    Y &= 255;\r
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);\r
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);\r
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);\r
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);\r
    const u = this.fade(x);\r
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y));\r
  }\r
}\r
\r
const Waves = ({\r
  lineColor = 'black',\r
  backgroundColor = 'transparent',\r
  waveSpeedX = 0.0125,\r
  waveSpeedY = 0.005,\r
  waveAmpX = 32,\r
  waveAmpY = 16,\r
  xGap = 10,\r
  yGap = 32,\r
  friction = 0.925,\r
  tension = 0.005,\r
  maxCursorMove = 100,\r
  style = {},\r
  className = ''\r
}) => {\r
  const containerRef = useRef(null);\r
  const canvasRef = useRef(null);\r
  const ctxRef = useRef(null);\r
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 });\r
  const noiseRef = useRef(new Noise(Math.random()));\r
  const linesRef = useRef([]);\r
  const mouseRef = useRef({\r
    x: -10,\r
    y: 0,\r
    lx: 0,\r
    ly: 0,\r
    sx: 0,\r
    sy: 0,\r
    v: 0,\r
    vs: 0,\r
    a: 0,\r
    set: false\r
  });\r
\r
  const configRef = useRef({\r
    lineColor,\r
    waveSpeedX,\r
    waveSpeedY,\r
    waveAmpX,\r
    waveAmpY,\r
    friction,\r
    tension,\r
    maxCursorMove,\r
    xGap,\r
    yGap\r
  });\r
  const frameIdRef = useRef(null);\r
\r
  useEffect(() => {\r
    configRef.current = {\r
      lineColor,\r
      waveSpeedX,\r
      waveSpeedY,\r
      waveAmpX,\r
      waveAmpY,\r
      friction,\r
      tension,\r
      maxCursorMove,\r
      xGap,\r
      yGap\r
    };\r
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    const container = containerRef.current;\r
    ctxRef.current = canvas.getContext('2d');\r
\r
    function setSize() {\r
      boundingRef.current = container.getBoundingClientRect();\r
      canvas.width = boundingRef.current.width;\r
      canvas.height = boundingRef.current.height;\r
    }\r
\r
    function setLines() {\r
      const { width, height } = boundingRef.current;\r
      linesRef.current = [];\r
      const oWidth = width + 200,\r
        oHeight = height + 30;\r
      const { xGap, yGap } = configRef.current;\r
      const totalLines = Math.ceil(oWidth / xGap);\r
      const totalPoints = Math.ceil(oHeight / yGap);\r
      const xStart = (width - xGap * totalLines) / 2;\r
      const yStart = (height - yGap * totalPoints) / 2;\r
      for (let i = 0; i <= totalLines; i++) {\r
        const pts = [];\r
        for (let j = 0; j <= totalPoints; j++) {\r
          pts.push({\r
            x: xStart + xGap * i,\r
            y: yStart + yGap * j,\r
            wave: { x: 0, y: 0 },\r
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }\r
          });\r
        }\r
        linesRef.current.push(pts);\r
      }\r
    }\r
\r
    function movePoints(time) {\r
      const lines = linesRef.current,\r
        mouse = mouseRef.current,\r
        noise = noiseRef.current;\r
      const { waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove } = configRef.current;\r
      lines.forEach(pts => {\r
        pts.forEach(p => {\r
          const move = noise.perlin2((p.x + time * waveSpeedX) * 0.002, (p.y + time * waveSpeedY) * 0.0015) * 12;\r
          p.wave.x = Math.cos(move) * waveAmpX;\r
          p.wave.y = Math.sin(move) * waveAmpY;\r
\r
          const dx = p.x - mouse.sx,\r
            dy = p.y - mouse.sy;\r
          const dist = Math.hypot(dx, dy),\r
            l = Math.max(175, mouse.vs);\r
          if (dist < l) {\r
            const s = 1 - dist / l;\r
            const f = Math.cos(dist * 0.001) * s;\r
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;\r
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;\r
          }\r
\r
          p.cursor.vx += (0 - p.cursor.x) * tension;\r
          p.cursor.vy += (0 - p.cursor.y) * tension;\r
          p.cursor.vx *= friction;\r
          p.cursor.vy *= friction;\r
          p.cursor.x += p.cursor.vx * 2;\r
          p.cursor.y += p.cursor.vy * 2;\r
          p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x));\r
          p.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.y));\r
        });\r
      });\r
    }\r
\r
    function moved(point, withCursor = true) {\r
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);\r
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);\r
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };\r
    }\r
\r
    function drawLines() {\r
      const { width, height } = boundingRef.current;\r
      const ctx = ctxRef.current;\r
      ctx.clearRect(0, 0, width, height);\r
      ctx.beginPath();\r
      ctx.strokeStyle = configRef.current.lineColor;\r
      linesRef.current.forEach(points => {\r
        let p1 = moved(points[0], false);\r
        ctx.moveTo(p1.x, p1.y);\r
        points.forEach((p, idx) => {\r
          const isLast = idx === points.length - 1;\r
          p1 = moved(p, !isLast);\r
          const p2 = moved(points[idx + 1] || points[points.length - 1], !isLast);\r
          ctx.lineTo(p1.x, p1.y);\r
          if (isLast) ctx.moveTo(p2.x, p2.y);\r
        });\r
      });\r
      ctx.stroke();\r
    }\r
\r
    function tick(t) {\r
      const mouse = mouseRef.current;\r
      mouse.sx += (mouse.x - mouse.sx) * 0.1;\r
      mouse.sy += (mouse.y - mouse.sy) * 0.1;\r
      const dx = mouse.x - mouse.lx,\r
        dy = mouse.y - mouse.ly;\r
      const d = Math.hypot(dx, dy);\r
      mouse.v = d;\r
      mouse.vs += (d - mouse.vs) * 0.1;\r
      mouse.vs = Math.min(100, mouse.vs);\r
      mouse.lx = mouse.x;\r
      mouse.ly = mouse.y;\r
      mouse.a = Math.atan2(dy, dx);\r
      container.style.setProperty('--x', \`\${mouse.sx}px\`);\r
      container.style.setProperty('--y', \`\${mouse.sy}px\`);\r
\r
      movePoints(t);\r
      drawLines();\r
      frameIdRef.current = requestAnimationFrame(tick);\r
    }\r
\r
    function onResize() {\r
      setSize();\r
      setLines();\r
    }\r
    function onMouseMove(e) {\r
      updateMouse(e.clientX, e.clientY);\r
    }\r
    function onTouchMove(e) {\r
      const touch = e.touches[0];\r
      updateMouse(touch.clientX, touch.clientY);\r
    }\r
    function updateMouse(x, y) {\r
      const mouse = mouseRef.current,\r
        b = boundingRef.current;\r
      mouse.x = x - b.left;\r
      mouse.y = y - b.top;\r
      if (!mouse.set) {\r
        mouse.sx = mouse.x;\r
        mouse.sy = mouse.y;\r
        mouse.lx = mouse.x;\r
        mouse.ly = mouse.y;\r
        mouse.set = true;\r
      }\r
    }\r
\r
    setSize();\r
    setLines();\r
    frameIdRef.current = requestAnimationFrame(tick);\r
    window.addEventListener('resize', onResize);\r
    window.addEventListener('mousemove', onMouseMove);\r
    window.addEventListener('touchmove', onTouchMove, { passive: false });\r
\r
    return () => {\r
      window.removeEventListener('resize', onResize);\r
      window.removeEventListener('mousemove', onMouseMove);\r
      window.removeEventListener('touchmove', onTouchMove);\r
      cancelAnimationFrame(frameIdRef.current);\r
    };\r
  }, []);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      style={{\r
        backgroundColor,\r
        ...style\r
      }}\r
      className={\`absolute top-0 left-0 w-full h-full overflow-hidden \${className}\`}\r
    >\r
      <div\r
        className="absolute top-0 left-0 bg-[#160000] rounded-full w-[0.5rem] h-[0.5rem]"\r
        style={{\r
          transform: 'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)',\r
          willChange: 'transform'\r
        }}\r
      />\r
      <canvas ref={canvasRef} className="block w-full h-full" />\r
    </div>\r
  );\r
};\r
\r
export default Waves;\r
`,bn=`import React, { useRef, useEffect, CSSProperties } from 'react';\r
import './Waves.css';\r
\r
class Grad {\r
  x: number;\r
  y: number;\r
  z: number;\r
  constructor(x: number, y: number, z: number) {\r
    this.x = x;\r
    this.y = y;\r
    this.z = z;\r
  }\r
  dot2(x: number, y: number): number {\r
    return this.x * x + this.y * y;\r
  }\r
}\r
\r
class Noise {\r
  grad3: Grad[];\r
  p: number[];\r
  perm: number[];\r
  gradP: Grad[];\r
\r
  constructor(seed = 0) {\r
    this.grad3 = [\r
      new Grad(1, 1, 0),\r
      new Grad(-1, 1, 0),\r
      new Grad(1, -1, 0),\r
      new Grad(-1, -1, 0),\r
      new Grad(1, 0, 1),\r
      new Grad(-1, 0, 1),\r
      new Grad(1, 0, -1),\r
      new Grad(-1, 0, -1),\r
      new Grad(0, 1, 1),\r
      new Grad(0, -1, 1),\r
      new Grad(0, 1, -1),\r
      new Grad(0, -1, -1)\r
    ];\r
    this.p = [\r
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240,\r
      21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88,\r
      237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83,\r
      111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216,\r
      80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,\r
      3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58,\r
      17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,\r
      129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193,\r
      238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,\r
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,\r
      195, 78, 66, 215, 61, 156, 180\r
    ];\r
    this.perm = new Array(512);\r
    this.gradP = new Array(512);\r
    this.seed(seed);\r
  }\r
  seed(seed: number) {\r
    if (seed > 0 && seed < 1) seed *= 65536;\r
    seed = Math.floor(seed);\r
    if (seed < 256) seed |= seed << 8;\r
    for (let i = 0; i < 256; i++) {\r
      let v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);\r
      this.perm[i] = this.perm[i + 256] = v;\r
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];\r
    }\r
  }\r
  fade(t: number): number {\r
    return t * t * t * (t * (t * 6 - 15) + 10);\r
  }\r
  lerp(a: number, b: number, t: number): number {\r
    return (1 - t) * a + t * b;\r
  }\r
  perlin2(x: number, y: number): number {\r
    let X = Math.floor(x),\r
      Y = Math.floor(y);\r
    x -= X;\r
    y -= Y;\r
    X &= 255;\r
    Y &= 255;\r
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);\r
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);\r
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);\r
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);\r
    const u = this.fade(x);\r
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y));\r
  }\r
}\r
\r
interface Point {\r
  x: number;\r
  y: number;\r
  wave: { x: number; y: number };\r
  cursor: { x: number; y: number; vx: number; vy: number };\r
}\r
\r
interface Mouse {\r
  x: number;\r
  y: number;\r
  lx: number;\r
  ly: number;\r
  sx: number;\r
  sy: number;\r
  v: number;\r
  vs: number;\r
  a: number;\r
  set: boolean;\r
}\r
\r
interface Config {\r
  lineColor: string;\r
  waveSpeedX: number;\r
  waveSpeedY: number;\r
  waveAmpX: number;\r
  waveAmpY: number;\r
  friction: number;\r
  tension: number;\r
  maxCursorMove: number;\r
  xGap: number;\r
  yGap: number;\r
}\r
\r
interface WavesProps {\r
  lineColor?: string;\r
  backgroundColor?: string;\r
  waveSpeedX?: number;\r
  waveSpeedY?: number;\r
  waveAmpX?: number;\r
  waveAmpY?: number;\r
  xGap?: number;\r
  yGap?: number;\r
  friction?: number;\r
  tension?: number;\r
  maxCursorMove?: number;\r
  style?: CSSProperties;\r
  className?: string;\r
}\r
\r
const Waves: React.FC<WavesProps> = ({\r
  lineColor = 'black',\r
  backgroundColor = 'transparent',\r
  waveSpeedX = 0.0125,\r
  waveSpeedY = 0.005,\r
  waveAmpX = 32,\r
  waveAmpY = 16,\r
  xGap = 10,\r
  yGap = 32,\r
  friction = 0.925,\r
  tension = 0.005,\r
  maxCursorMove = 100,\r
  style = {},\r
  className = ''\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);\r
  const boundingRef = useRef<{\r
    width: number;\r
    height: number;\r
    left: number;\r
    top: number;\r
  }>({\r
    width: 0,\r
    height: 0,\r
    left: 0,\r
    top: 0\r
  });\r
  const noiseRef = useRef(new Noise(Math.random()));\r
  const linesRef = useRef<Point[][]>([]);\r
  const mouseRef = useRef<Mouse>({\r
    x: -10,\r
    y: 0,\r
    lx: 0,\r
    ly: 0,\r
    sx: 0,\r
    sy: 0,\r
    v: 0,\r
    vs: 0,\r
    a: 0,\r
    set: false\r
  });\r
  const configRef = useRef<Config>({\r
    lineColor,\r
    waveSpeedX,\r
    waveSpeedY,\r
    waveAmpX,\r
    waveAmpY,\r
    friction,\r
    tension,\r
    maxCursorMove,\r
    xGap,\r
    yGap\r
  });\r
  const frameIdRef = useRef<number | null>(null);\r
\r
  useEffect(() => {\r
    configRef.current = {\r
      lineColor,\r
      waveSpeedX,\r
      waveSpeedY,\r
      waveAmpX,\r
      waveAmpY,\r
      friction,\r
      tension,\r
      maxCursorMove,\r
      xGap,\r
      yGap\r
    };\r
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    const container = containerRef.current;\r
    if (!canvas || !container) return;\r
    ctxRef.current = canvas.getContext('2d');\r
\r
    function setSize() {\r
      if (!container || !canvas) return;\r
      const rect = container.getBoundingClientRect();\r
      boundingRef.current = {\r
        width: rect.width,\r
        height: rect.height,\r
        left: rect.left,\r
        top: rect.top\r
      };\r
      canvas.width = rect.width;\r
      canvas.height = rect.height;\r
    }\r
\r
    function setLines() {\r
      const { width, height } = boundingRef.current;\r
      linesRef.current = [];\r
      const oWidth = width + 200,\r
        oHeight = height + 30;\r
      const { xGap, yGap } = configRef.current;\r
      const totalLines = Math.ceil(oWidth / xGap);\r
      const totalPoints = Math.ceil(oHeight / yGap);\r
      const xStart = (width - xGap * totalLines) / 2;\r
      const yStart = (height - yGap * totalPoints) / 2;\r
      for (let i = 0; i <= totalLines; i++) {\r
        const pts: Point[] = [];\r
        for (let j = 0; j <= totalPoints; j++) {\r
          pts.push({\r
            x: xStart + xGap * i,\r
            y: yStart + yGap * j,\r
            wave: { x: 0, y: 0 },\r
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }\r
          });\r
        }\r
        linesRef.current.push(pts);\r
      }\r
    }\r
\r
    function movePoints(time: number) {\r
      const lines = linesRef.current;\r
      const mouse = mouseRef.current;\r
      const noise = noiseRef.current;\r
      const { waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove } = configRef.current;\r
      lines.forEach(pts => {\r
        pts.forEach(p => {\r
          const move = noise.perlin2((p.x + time * waveSpeedX) * 0.002, (p.y + time * waveSpeedY) * 0.0015) * 12;\r
          p.wave.x = Math.cos(move) * waveAmpX;\r
          p.wave.y = Math.sin(move) * waveAmpY;\r
\r
          const dx = p.x - mouse.sx,\r
            dy = p.y - mouse.sy;\r
          const dist = Math.hypot(dx, dy);\r
          const l = Math.max(175, mouse.vs);\r
          if (dist < l) {\r
            const s = 1 - dist / l;\r
            const f = Math.cos(dist * 0.001) * s;\r
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;\r
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;\r
          }\r
\r
          p.cursor.vx += (0 - p.cursor.x) * tension;\r
          p.cursor.vy += (0 - p.cursor.y) * tension;\r
          p.cursor.vx *= friction;\r
          p.cursor.vy *= friction;\r
          p.cursor.x += p.cursor.vx * 2;\r
          p.cursor.y += p.cursor.vy * 2;\r
          p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x));\r
          p.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.y));\r
        });\r
      });\r
    }\r
\r
    function moved(point: Point, withCursor = true): { x: number; y: number } {\r
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);\r
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);\r
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };\r
    }\r
\r
    function drawLines() {\r
      const { width, height } = boundingRef.current;\r
      const ctx = ctxRef.current;\r
      if (!ctx) return;\r
      ctx.clearRect(0, 0, width, height);\r
      ctx.beginPath();\r
      ctx.strokeStyle = configRef.current.lineColor;\r
      linesRef.current.forEach(points => {\r
        let p1 = moved(points[0], false);\r
        ctx.moveTo(p1.x, p1.y);\r
        points.forEach((p, idx) => {\r
          const isLast = idx === points.length - 1;\r
          p1 = moved(p, !isLast);\r
          const p2 = moved(points[idx + 1] || points[points.length - 1], !isLast);\r
          ctx.lineTo(p1.x, p1.y);\r
          if (isLast) ctx.moveTo(p2.x, p2.y);\r
        });\r
      });\r
      ctx.stroke();\r
    }\r
\r
    function tick(t: number) {\r
      if (!container) return;\r
      const mouse = mouseRef.current;\r
      mouse.sx += (mouse.x - mouse.sx) * 0.1;\r
      mouse.sy += (mouse.y - mouse.sy) * 0.1;\r
      const dx = mouse.x - mouse.lx,\r
        dy = mouse.y - mouse.ly;\r
      const d = Math.hypot(dx, dy);\r
      mouse.v = d;\r
      mouse.vs += (d - mouse.vs) * 0.1;\r
      mouse.vs = Math.min(100, mouse.vs);\r
      mouse.lx = mouse.x;\r
      mouse.ly = mouse.y;\r
      mouse.a = Math.atan2(dy, dx);\r
      container.style.setProperty('--x', \`\${mouse.sx}px\`);\r
      container.style.setProperty('--y', \`\${mouse.sy}px\`);\r
\r
      movePoints(t);\r
      drawLines();\r
      frameIdRef.current = requestAnimationFrame(tick);\r
    }\r
\r
    function onResize() {\r
      setSize();\r
      setLines();\r
    }\r
    function onMouseMove(e: MouseEvent) {\r
      updateMouse(e.clientX, e.clientY);\r
    }\r
    function onTouchMove(e: TouchEvent) {\r
      const touch = e.touches[0];\r
      updateMouse(touch.clientX, touch.clientY);\r
    }\r
    function updateMouse(x: number, y: number) {\r
      const mouse = mouseRef.current;\r
      const b = boundingRef.current;\r
      mouse.x = x - b.left;\r
      mouse.y = y - b.top;\r
      if (!mouse.set) {\r
        mouse.sx = mouse.x;\r
        mouse.sy = mouse.y;\r
        mouse.lx = mouse.x;\r
        mouse.ly = mouse.y;\r
        mouse.set = true;\r
      }\r
    }\r
\r
    setSize();\r
    setLines();\r
    frameIdRef.current = requestAnimationFrame(tick);\r
    window.addEventListener('resize', onResize);\r
    window.addEventListener('mousemove', onMouseMove);\r
    window.addEventListener('touchmove', onTouchMove, { passive: false });\r
\r
    return () => {\r
      window.removeEventListener('resize', onResize);\r
      window.removeEventListener('mousemove', onMouseMove);\r
      window.removeEventListener('touchmove', onTouchMove);\r
      if (frameIdRef.current !== null) {\r
        cancelAnimationFrame(frameIdRef.current);\r
      }\r
    };\r
  }, []);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      className={\`waves \${className}\`}\r
      style={{\r
        position: 'absolute',\r
        top: 0,\r
        left: 0,\r
        margin: 0,\r
        padding: 0,\r
        width: '100%',\r
        height: '100%',\r
        overflow: 'hidden',\r
        backgroundColor,\r
        ...style\r
      }}\r
    >\r
      <canvas ref={canvasRef} className="waves-canvas" />\r
    </div>\r
  );\r
};\r
\r
export default Waves;\r
`,gn=`import React, { useRef, useEffect, CSSProperties } from 'react';\r
\r
class Grad {\r
  x: number;\r
  y: number;\r
  z: number;\r
  constructor(x: number, y: number, z: number) {\r
    this.x = x;\r
    this.y = y;\r
    this.z = z;\r
  }\r
  dot2(x: number, y: number): number {\r
    return this.x * x + this.y * y;\r
  }\r
}\r
\r
class Noise {\r
  grad3: Grad[];\r
  p: number[];\r
  perm: number[];\r
  gradP: Grad[];\r
\r
  constructor(seed = 0) {\r
    this.grad3 = [\r
      new Grad(1, 1, 0),\r
      new Grad(-1, 1, 0),\r
      new Grad(1, -1, 0),\r
      new Grad(-1, -1, 0),\r
      new Grad(1, 0, 1),\r
      new Grad(-1, 0, 1),\r
      new Grad(1, 0, -1),\r
      new Grad(-1, 0, -1),\r
      new Grad(0, 1, 1),\r
      new Grad(0, -1, 1),\r
      new Grad(0, 1, -1),\r
      new Grad(0, -1, -1)\r
    ];\r
    this.p = [\r
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240,\r
      21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88,\r
      237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83,\r
      111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216,\r
      80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,\r
      3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58,\r
      17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,\r
      129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193,\r
      238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,\r
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,\r
      195, 78, 66, 215, 61, 156, 180\r
    ];\r
    this.perm = new Array(512);\r
    this.gradP = new Array(512);\r
    this.seed(seed);\r
  }\r
  seed(seed: number) {\r
    if (seed > 0 && seed < 1) seed *= 65536;\r
    seed = Math.floor(seed);\r
    if (seed < 256) seed |= seed << 8;\r
    for (let i = 0; i < 256; i++) {\r
      let v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);\r
      this.perm[i] = this.perm[i + 256] = v;\r
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];\r
    }\r
  }\r
  fade(t: number): number {\r
    return t * t * t * (t * (t * 6 - 15) + 10);\r
  }\r
  lerp(a: number, b: number, t: number): number {\r
    return (1 - t) * a + t * b;\r
  }\r
  perlin2(x: number, y: number): number {\r
    let X = Math.floor(x),\r
      Y = Math.floor(y);\r
    x -= X;\r
    y -= Y;\r
    X &= 255;\r
    Y &= 255;\r
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);\r
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);\r
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);\r
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);\r
    const u = this.fade(x);\r
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y));\r
  }\r
}\r
\r
interface Point {\r
  x: number;\r
  y: number;\r
  wave: { x: number; y: number };\r
  cursor: { x: number; y: number; vx: number; vy: number };\r
}\r
\r
interface Mouse {\r
  x: number;\r
  y: number;\r
  lx: number;\r
  ly: number;\r
  sx: number;\r
  sy: number;\r
  v: number;\r
  vs: number;\r
  a: number;\r
  set: boolean;\r
}\r
\r
interface Config {\r
  lineColor: string;\r
  waveSpeedX: number;\r
  waveSpeedY: number;\r
  waveAmpX: number;\r
  waveAmpY: number;\r
  friction: number;\r
  tension: number;\r
  maxCursorMove: number;\r
  xGap: number;\r
  yGap: number;\r
}\r
\r
interface WavesProps {\r
  lineColor?: string;\r
  backgroundColor?: string;\r
  waveSpeedX?: number;\r
  waveSpeedY?: number;\r
  waveAmpX?: number;\r
  waveAmpY?: number;\r
  xGap?: number;\r
  yGap?: number;\r
  friction?: number;\r
  tension?: number;\r
  maxCursorMove?: number;\r
  style?: CSSProperties;\r
  className?: string;\r
}\r
\r
const Waves: React.FC<WavesProps> = ({\r
  lineColor = 'black',\r
  backgroundColor = 'transparent',\r
  waveSpeedX = 0.0125,\r
  waveSpeedY = 0.005,\r
  waveAmpX = 32,\r
  waveAmpY = 16,\r
  xGap = 10,\r
  yGap = 32,\r
  friction = 0.925,\r
  tension = 0.005,\r
  maxCursorMove = 100,\r
  style = {},\r
  className = ''\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const canvasRef = useRef<HTMLCanvasElement>(null);\r
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);\r
  const boundingRef = useRef<{\r
    width: number;\r
    height: number;\r
    left: number;\r
    top: number;\r
  }>({\r
    width: 0,\r
    height: 0,\r
    left: 0,\r
    top: 0\r
  });\r
  const noiseRef = useRef(new Noise(Math.random()));\r
  const linesRef = useRef<Point[][]>([]);\r
  const mouseRef = useRef<Mouse>({\r
    x: -10,\r
    y: 0,\r
    lx: 0,\r
    ly: 0,\r
    sx: 0,\r
    sy: 0,\r
    v: 0,\r
    vs: 0,\r
    a: 0,\r
    set: false\r
  });\r
\r
  const configRef = useRef<Config>({\r
    lineColor,\r
    waveSpeedX,\r
    waveSpeedY,\r
    waveAmpX,\r
    waveAmpY,\r
    friction,\r
    tension,\r
    maxCursorMove,\r
    xGap,\r
    yGap\r
  });\r
\r
  const frameIdRef = useRef<number | null>(null);\r
\r
  useEffect(() => {\r
    configRef.current = {\r
      lineColor,\r
      waveSpeedX,\r
      waveSpeedY,\r
      waveAmpX,\r
      waveAmpY,\r
      friction,\r
      tension,\r
      maxCursorMove,\r
      xGap,\r
      yGap\r
    };\r
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);\r
\r
  useEffect(() => {\r
    const canvas = canvasRef.current;\r
    const container = containerRef.current;\r
    if (!canvas || !container) return;\r
    ctxRef.current = canvas.getContext('2d');\r
\r
    function setSize() {\r
      if (!container || !canvas) return;\r
      const rect = container.getBoundingClientRect();\r
      boundingRef.current = {\r
        width: rect.width,\r
        height: rect.height,\r
        left: rect.left,\r
        top: rect.top\r
      };\r
      canvas.width = rect.width;\r
      canvas.height = rect.height;\r
    }\r
\r
    function setLines() {\r
      const { width, height } = boundingRef.current;\r
      linesRef.current = [];\r
      const oWidth = width + 200,\r
        oHeight = height + 30;\r
      const { xGap, yGap } = configRef.current;\r
      const totalLines = Math.ceil(oWidth / xGap);\r
      const totalPoints = Math.ceil(oHeight / yGap);\r
      const xStart = (width - xGap * totalLines) / 2;\r
      const yStart = (height - yGap * totalPoints) / 2;\r
      for (let i = 0; i <= totalLines; i++) {\r
        const pts: Point[] = [];\r
        for (let j = 0; j <= totalPoints; j++) {\r
          pts.push({\r
            x: xStart + xGap * i,\r
            y: yStart + yGap * j,\r
            wave: { x: 0, y: 0 },\r
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }\r
          });\r
        }\r
        linesRef.current.push(pts);\r
      }\r
    }\r
\r
    function movePoints(time: number) {\r
      const lines = linesRef.current;\r
      const mouse = mouseRef.current;\r
      const noise = noiseRef.current;\r
      const { waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove } = configRef.current;\r
      lines.forEach(pts => {\r
        pts.forEach(p => {\r
          const move = noise.perlin2((p.x + time * waveSpeedX) * 0.002, (p.y + time * waveSpeedY) * 0.0015) * 12;\r
          p.wave.x = Math.cos(move) * waveAmpX;\r
          p.wave.y = Math.sin(move) * waveAmpY;\r
\r
          const dx = p.x - mouse.sx,\r
            dy = p.y - mouse.sy;\r
          const dist = Math.hypot(dx, dy);\r
          const l = Math.max(175, mouse.vs);\r
          if (dist < l) {\r
            const s = 1 - dist / l;\r
            const f = Math.cos(dist * 0.001) * s;\r
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;\r
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;\r
          }\r
\r
          p.cursor.vx += (0 - p.cursor.x) * tension;\r
          p.cursor.vy += (0 - p.cursor.y) * tension;\r
          p.cursor.vx *= friction;\r
          p.cursor.vy *= friction;\r
          p.cursor.x += p.cursor.vx * 2;\r
          p.cursor.y += p.cursor.vy * 2;\r
          p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x));\r
          p.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.y));\r
        });\r
      });\r
    }\r
\r
    function moved(point: Point, withCursor = true): { x: number; y: number } {\r
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);\r
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);\r
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };\r
    }\r
\r
    function drawLines() {\r
      const { width, height } = boundingRef.current;\r
      const ctx = ctxRef.current;\r
      if (!ctx) return;\r
      ctx.clearRect(0, 0, width, height);\r
      ctx.beginPath();\r
      ctx.strokeStyle = configRef.current.lineColor;\r
      linesRef.current.forEach(points => {\r
        let p1 = moved(points[0], false);\r
        ctx.moveTo(p1.x, p1.y);\r
        points.forEach((p, idx) => {\r
          const isLast = idx === points.length - 1;\r
          p1 = moved(p, !isLast);\r
          const p2 = moved(points[idx + 1] || points[points.length - 1], !isLast);\r
          ctx.lineTo(p1.x, p1.y);\r
          if (isLast) ctx.moveTo(p2.x, p2.y);\r
        });\r
      });\r
      ctx.stroke();\r
    }\r
\r
    function tick(t: number) {\r
      if (!container) return;\r
      const mouse = mouseRef.current;\r
      mouse.sx += (mouse.x - mouse.sx) * 0.1;\r
      mouse.sy += (mouse.y - mouse.sy) * 0.1;\r
      const dx = mouse.x - mouse.lx,\r
        dy = mouse.y - mouse.ly;\r
      const d = Math.hypot(dx, dy);\r
      mouse.v = d;\r
      mouse.vs += (d - mouse.vs) * 0.1;\r
      mouse.vs = Math.min(100, mouse.vs);\r
      mouse.lx = mouse.x;\r
      mouse.ly = mouse.y;\r
      mouse.a = Math.atan2(dy, dx);\r
      container.style.setProperty('--x', \`\${mouse.sx}px\`);\r
      container.style.setProperty('--y', \`\${mouse.sy}px\`);\r
\r
      movePoints(t);\r
      drawLines();\r
      frameIdRef.current = requestAnimationFrame(tick);\r
    }\r
\r
    function onResize() {\r
      setSize();\r
      setLines();\r
    }\r
    function onMouseMove(e: MouseEvent) {\r
      updateMouse(e.clientX, e.clientY);\r
    }\r
    function onTouchMove(e: TouchEvent) {\r
      const touch = e.touches[0];\r
      updateMouse(touch.clientX, touch.clientY);\r
    }\r
    function updateMouse(x: number, y: number) {\r
      const mouse = mouseRef.current;\r
      const b = boundingRef.current;\r
      mouse.x = x - b.left;\r
      mouse.y = y - b.top;\r
      if (!mouse.set) {\r
        mouse.sx = mouse.x;\r
        mouse.sy = mouse.y;\r
        mouse.lx = mouse.x;\r
        mouse.ly = mouse.y;\r
        mouse.set = true;\r
      }\r
    }\r
\r
    setSize();\r
    setLines();\r
    frameIdRef.current = requestAnimationFrame(tick);\r
    window.addEventListener('resize', onResize);\r
    window.addEventListener('mousemove', onMouseMove);\r
    window.addEventListener('touchmove', onTouchMove, { passive: false });\r
\r
    return () => {\r
      window.removeEventListener('resize', onResize);\r
      window.removeEventListener('mousemove', onMouseMove);\r
      window.removeEventListener('touchmove', onTouchMove);\r
      if (frameIdRef.current !== null) {\r
        cancelAnimationFrame(frameIdRef.current);\r
      }\r
    };\r
  }, []);\r
\r
  return (\r
    <div\r
      ref={containerRef}\r
      style={{\r
        backgroundColor,\r
        ...style\r
      }}\r
      className={\`absolute top-0 left-0 w-full h-full overflow-hidden \${className}\`}\r
    >\r
      <div\r
        className="absolute top-0 left-0 bg-[#160000] rounded-full w-[0.5rem] h-[0.5rem]"\r
        style={{\r
          transform: 'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)',\r
          willChange: 'transform'\r
        }}\r
      />\r
      <canvas ref={canvasRef} className="block w-full h-full" />\r
    </div>\r
  );\r
};\r
\r
export default Waves;\r
`,Rn={usage:`import Waves from './Waves';

<Waves
  lineColor="#fff"
  backgroundColor="rgba(255, 255, 255, 0.2)"
  waveSpeedX={0.02}
  waveSpeedY={0.01}
  waveAmpX={40}
  waveAmpY={20}
  friction={0.9}
  tension={0.01}
  maxCursorMove={120}
  xGap={12}
  yGap={36}
/>`,code:xn,css:yn,tailwind:wn,tsCode:bn,tsTailwind:gn},Yn=()=>{const[f,r]=m.useState("#ffffff"),[t,i]=m.useState(.0125),d=[{name:"lineColor",type:"string",default:"black",description:"Defines the color of the wave lines drawn on the canvas."},{name:"backgroundColor",type:"string",default:"transparent",description:"Sets the background color of the waves container."},{name:"waveSpeedX",type:"number",default:.0125,description:"Horizontal speed factor for the wave animation."},{name:"waveSpeedY",type:"number",default:.005,description:"Vertical speed factor for the wave animation."},{name:"waveAmpX",type:"number",default:32,description:"Horizontal amplitude of each wave."},{name:"waveAmpY",type:"number",default:16,description:"Vertical amplitude of each wave."},{name:"xGap",type:"number",default:10,description:"Horizontal gap between individual wave lines."},{name:"yGap",type:"number",default:32,description:"Vertical gap between points on each wave line."},{name:"friction",type:"number",default:.925,description:"Controls how quickly the cursor effect slows down."},{name:"tension",type:"number",default:.005,description:"Determines the 'springiness' of the cursor effect on points."},{name:"maxCursorMove",type:"number",default:100,description:"Limits how far each point can shift due to cursor movement."},{name:"style",type:"object",default:"{}",description:"Inline styles applied to the container element."},{name:"className",type:"string",default:"",description:"Custom class name(s) applied to the container element."}];return c.jsxs(un,{children:[c.jsxs(cn,{children:[c.jsx(tn,{position:"relative",h:600,className:"demo-container",overflow:"hidden",p:0,children:c.jsx(hn,{waveSpeedX:t,lineColor:f})}),c.jsxs(ln,{children:[c.jsx(fn,{min:0,max:.1,step:.01,value:t,title:"Wave Speed X",onChange:l=>{i(l)}}),c.jsxs(sn,{gap:4,align:"center",mt:4,children:[c.jsx(on,{fontSize:"sm",children:"Waves Color"}),c.jsx(an,{type:"color",value:f,onChange:l=>{r(l.target.value)},width:"50px"})]})]}),c.jsx(mn,{data:d})]}),c.jsx(dn,{children:c.jsx(pn,{codeObject:Rn})})]})};export{Yn as default};
