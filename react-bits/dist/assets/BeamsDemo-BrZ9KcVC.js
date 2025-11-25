import{r as t,_ as F,j as r,B as $,F as k,T as U,d as W}from"./index-wsKSLPNH.js";import{T as A,P as G,a as D,C as L,b as X}from"./PropTable-C4uPWs8h.js";import{C as V}from"./Customize-1m_ZNqR9.js";import{P as h}from"./PreviewSlider-m1G_aiYP.js";import{D as Y}from"./Dependencies-BHoMfJUj.js";import{B as Z}from"./BackgroundContent-CqU7Wlm2.js";import{C as q,G as J,bu as K,U as Q,a as ee,B as re,e as P}from"./three.module-0PRdiASR.js";import{a as E,u as C,C as ne}from"./react-three-fiber.esm-Dkk-fK7P.js";import{u as te}from"./Fbo-CRBkstwy.js";import"./index-Bpz4cGEA.js";import"./PreviewSwitch-DqnF708j.js";const ae=e=>typeof e=="function",se=t.forwardRef(({envMap:e,resolution:n=256,frames:s=1/0,makeDefault:a,children:o,...f},v)=>{const g=E(({set:c})=>c),i=E(({camera:c})=>c),d=E(({size:c})=>c),u=t.useRef(null);t.useImperativeHandle(v,()=>u.current,[]);const x=t.useRef(null),y=te(n);t.useLayoutEffect(()=>{f.manual||(u.current.aspect=d.width/d.height)},[d,f]),t.useLayoutEffect(()=>{u.current.updateProjectionMatrix()});let l=0,m=null;const p=ae(o);return C(c=>{p&&(s===1/0||l<s)&&(x.current.visible=!1,c.gl.setRenderTarget(y),m=c.scene.background,e&&(c.scene.background=e),c.gl.render(c.scene,u.current),c.scene.background=m,c.gl.setRenderTarget(null),x.current.visible=!0,l++)}),t.useLayoutEffect(()=>{if(a){const c=i;return g(()=>({camera:u.current})),()=>g(()=>({camera:c}))}},[u,a,g]),t.createElement(t.Fragment,null,t.createElement("perspectiveCamera",F({ref:u},f),!p&&o),t.createElement("group",{ref:x},p&&o(y.texture)))}),oe=`/* eslint-disable react/no-unknown-property */\r
import { forwardRef, useImperativeHandle, useEffect, useRef, useMemo } from 'react';\r
\r
import * as THREE from 'three';\r
\r
import { Canvas, useFrame } from '@react-three/fiber';\r
import { PerspectiveCamera } from '@react-three/drei';\r
import { degToRad } from 'three/src/math/MathUtils.js';\r
\r
import './Beams.css';\r
\r
function extendMaterial(BaseMaterial, cfg) {\r
  const physical = THREE.ShaderLib.physical;\r
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;\r
  const baseDefines = physical.defines ?? {};\r
\r
  const uniforms = THREE.UniformsUtils.clone(baseUniforms);\r
\r
  const defaults = new BaseMaterial(cfg.material || {});\r
\r
  if (defaults.color) uniforms.diffuse.value = defaults.color;\r
  if ('roughness' in defaults) uniforms.roughness.value = defaults.roughness;\r
  if ('metalness' in defaults) uniforms.metalness.value = defaults.metalness;\r
  if ('envMap' in defaults) uniforms.envMap.value = defaults.envMap;\r
  if ('envMapIntensity' in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;\r
\r
  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {\r
    uniforms[key] = u !== null && typeof u === 'object' && 'value' in u ? u : { value: u };\r
  });\r
\r
  let vert = \`\${cfg.header}\\n\${cfg.vertexHeader ?? ''}\\n\${baseVert}\`;\r
  let frag = \`\${cfg.header}\\n\${cfg.fragmentHeader ?? ''}\\n\${baseFrag}\`;\r
\r
  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {\r
    vert = vert.replace(inc, \`\${inc}\\n\${code}\`);\r
  }\r
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {\r
    frag = frag.replace(inc, \`\${inc}\\n\${code}\`);\r
  }\r
\r
  const mat = new THREE.ShaderMaterial({\r
    defines: { ...baseDefines },\r
    uniforms,\r
    vertexShader: vert,\r
    fragmentShader: frag,\r
    lights: true,\r
    fog: !!cfg.material?.fog\r
  });\r
\r
  return mat;\r
}\r
\r
const CanvasWrapper = ({ children }) => (\r
  <Canvas dpr={[1, 2]} frameloop="always" className="beams-container">\r
    {children}\r
  </Canvas>\r
);\r
\r
const hexToNormalizedRGB = hex => {\r
  const clean = hex.replace('#', '');\r
  const r = parseInt(clean.substring(0, 2), 16);\r
  const g = parseInt(clean.substring(2, 4), 16);\r
  const b = parseInt(clean.substring(4, 6), 16);\r
  return [r / 255, g / 255, b / 255];\r
};\r
\r
const noise = \`\r
float random (in vec2 st) {\r
    return fract(sin(dot(st.xy,\r
                         vec2(12.9898,78.233)))*\r
        43758.5453123);\r
}\r
float noise (in vec2 st) {\r
    vec2 i = floor(st);\r
    vec2 f = fract(st);\r
    float a = random(i);\r
    float b = random(i + vec2(1.0, 0.0));\r
    float c = random(i + vec2(0.0, 1.0));\r
    float d = random(i + vec2(1.0, 1.0));\r
    vec2 u = f * f * (3.0 - 2.0 * f);\r
    return mix(a, b, u.x) +\r
           (c - a)* u.y * (1.0 - u.x) +\r
           (d - b) * u.x * u.y;\r
}\r
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\r
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\r
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}\r
float cnoise(vec3 P){\r
  vec3 Pi0 = floor(P);\r
  vec3 Pi1 = Pi0 + vec3(1.0);\r
  Pi0 = mod(Pi0, 289.0);\r
  Pi1 = mod(Pi1, 289.0);\r
  vec3 Pf0 = fract(P);\r
  vec3 Pf1 = Pf0 - vec3(1.0);\r
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\r
  vec4 iy = vec4(Pi0.yy, Pi1.yy);\r
  vec4 iz0 = Pi0.zzzz;\r
  vec4 iz1 = Pi1.zzzz;\r
  vec4 ixy = permute(permute(ix) + iy);\r
  vec4 ixy0 = permute(ixy + iz0);\r
  vec4 ixy1 = permute(ixy + iz1);\r
  vec4 gx0 = ixy0 / 7.0;\r
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\r
  gx0 = fract(gx0);\r
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\r
  vec4 sz0 = step(gz0, vec4(0.0));\r
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\r
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\r
  vec4 gx1 = ixy1 / 7.0;\r
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\r
  gx1 = fract(gx1);\r
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\r
  vec4 sz1 = step(gz1, vec4(0.0));\r
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\r
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\r
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\r
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\r
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\r
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\r
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\r
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\r
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\r
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\r
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));\r
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;\r
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));\r
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;\r
  float n000 = dot(g000, Pf0);\r
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));\r
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));\r
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));\r
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));\r
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));\r
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));\r
  float n111 = dot(g111, Pf1);\r
  vec3 fade_xyz = fade(Pf0);\r
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);\r
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);\r
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);\r
  return 2.2 * n_xyz;\r
}\r
\`;\r
\r
const Beams = ({\r
  beamWidth = 2,\r
  beamHeight = 15,\r
  beamNumber = 12,\r
  lightColor = '#ffffff',\r
  speed = 2,\r
  noiseIntensity = 1.75,\r
  scale = 0.2,\r
  rotation = 0\r
}) => {\r
  const meshRef = useRef(null);\r
  const beamMaterial = useMemo(\r
    () =>\r
      extendMaterial(THREE.MeshStandardMaterial, {\r
        header: \`\r
  varying vec3 vEye;\r
  varying float vNoise;\r
  varying vec2 vUv;\r
  varying vec3 vPosition;\r
  uniform float time;\r
  uniform float uSpeed;\r
  uniform float uNoiseIntensity;\r
  uniform float uScale;\r
  \${noise}\`,\r
        vertexHeader: \`\r
  float getPos(vec3 pos) {\r
    vec3 noisePos =\r
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;\r
    return cnoise(noisePos);\r
  }\r
  vec3 getCurrentPos(vec3 pos) {\r
    vec3 newpos = pos;\r
    newpos.z += getPos(pos);\r
    return newpos;\r
  }\r
  vec3 getNormal(vec3 pos) {\r
    vec3 curpos = getCurrentPos(pos);\r
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));\r
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));\r
    vec3 tangentX = normalize(nextposX - curpos);\r
    vec3 tangentZ = normalize(nextposZ - curpos);\r
    return normalize(cross(tangentZ, tangentX));\r
  }\`,\r
        fragmentHeader: '',\r
        vertex: {\r
          '#include <begin_vertex>': \`transformed.z += getPos(transformed.xyz);\`,\r
          '#include <beginnormal_vertex>': \`objectNormal = getNormal(position.xyz);\`\r
        },\r
        fragment: {\r
          '#include <dithering_fragment>': \`\r
    float randomNoise = noise(gl_FragCoord.xy);\r
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;\`\r
        },\r
        material: { fog: true },\r
        uniforms: {\r
          diffuse: new THREE.Color(...hexToNormalizedRGB('#000000')),\r
          time: { shared: true, mixed: true, linked: true, value: 0 },\r
          roughness: 0.3,\r
          metalness: 0.3,\r
          uSpeed: { shared: true, mixed: true, linked: true, value: speed },\r
          envMapIntensity: 10,\r
          uNoiseIntensity: noiseIntensity,\r
          uScale: scale\r
        }\r
      }),\r
    [speed, noiseIntensity, scale]\r
  );\r
\r
  return (\r
    <CanvasWrapper>\r
      <group rotation={[0, 0, degToRad(rotation)]}>\r
        <PlaneNoise ref={meshRef} material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />\r
        <DirLight color={lightColor} position={[0, 3, 10]} />\r
      </group>\r
      <ambientLight intensity={1} />\r
      <color attach="background" args={['#000000']} />\r
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />\r
    </CanvasWrapper>\r
  );\r
};\r
\r
function createStackedPlanesBufferGeometry(n, width, height, spacing, heightSegments) {\r
  const geometry = new THREE.BufferGeometry();\r
  const numVertices = n * (heightSegments + 1) * 2;\r
  const numFaces = n * heightSegments * 2;\r
  const positions = new Float32Array(numVertices * 3);\r
  const indices = new Uint32Array(numFaces * 3);\r
  const uvs = new Float32Array(numVertices * 2);\r
\r
  let vertexOffset = 0;\r
  let indexOffset = 0;\r
  let uvOffset = 0;\r
  const totalWidth = n * width + (n - 1) * spacing;\r
  const xOffsetBase = -totalWidth / 2;\r
\r
  for (let i = 0; i < n; i++) {\r
    const xOffset = xOffsetBase + i * (width + spacing);\r
    const uvXOffset = Math.random() * 300;\r
    const uvYOffset = Math.random() * 300;\r
\r
    for (let j = 0; j <= heightSegments; j++) {\r
      const y = height * (j / heightSegments - 0.5);\r
      const v0 = [xOffset, y, 0];\r
      const v1 = [xOffset + width, y, 0];\r
      positions.set([...v0, ...v1], vertexOffset * 3);\r
\r
      const uvY = j / heightSegments;\r
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);\r
\r
      if (j < heightSegments) {\r
        const a = vertexOffset,\r
          b = vertexOffset + 1,\r
          c = vertexOffset + 2,\r
          d = vertexOffset + 3;\r
        indices.set([a, b, c, c, b, d], indexOffset);\r
        indexOffset += 6;\r
      }\r
      vertexOffset += 2;\r
      uvOffset += 4;\r
    }\r
  }\r
\r
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));\r
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));\r
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));\r
  geometry.computeVertexNormals();\r
  return geometry;\r
}\r
\r
const MergedPlanes = forwardRef(({ material, width, count, height }, ref) => {\r
  const mesh = useRef(null);\r
  useImperativeHandle(ref, () => mesh.current);\r
  const geometry = useMemo(\r
    () => createStackedPlanesBufferGeometry(count, width, height, 0, 100),\r
    [count, width, height]\r
  );\r
  useFrame((_, delta) => {\r
    mesh.current.material.uniforms.time.value += 0.1 * delta;\r
  });\r
  return <mesh ref={mesh} geometry={geometry} material={material} />;\r
});\r
MergedPlanes.displayName = 'MergedPlanes';\r
\r
const PlaneNoise = forwardRef((props, ref) => (\r
  <MergedPlanes ref={ref} material={props.material} width={props.width} count={props.count} height={props.height} />\r
));\r
PlaneNoise.displayName = 'PlaneNoise';\r
\r
const DirLight = ({ position, color }) => {\r
  const dir = useRef(null);\r
  useEffect(() => {\r
    if (!dir.current) return;\r
    const cam = dir.current.shadow.camera;\r
    if (!cam) return;\r
    cam.top = 24;\r
    cam.bottom = -24;\r
    cam.left = -24;\r
    cam.right = 24;\r
    cam.far = 64;\r
    dir.current.shadow.bias = -0.004;\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
  return <directionalLight ref={dir} color={color} intensity={1} position={position} />;\r
};\r
\r
export default Beams;\r
`,ie=`.beams-container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
}\r
`,ce=`/* eslint-disable react/no-unknown-property */\r
import { forwardRef, useImperativeHandle, useEffect, useRef, useMemo } from 'react';\r
\r
import * as THREE from 'three';\r
\r
import { Canvas, useFrame } from '@react-three/fiber';\r
import { PerspectiveCamera } from '@react-three/drei';\r
import { degToRad } from 'three/src/math/MathUtils.js';\r
\r
function extendMaterial(BaseMaterial, cfg) {\r
  const physical = THREE.ShaderLib.physical;\r
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;\r
  const baseDefines = physical.defines ?? {};\r
\r
  const uniforms = THREE.UniformsUtils.clone(baseUniforms);\r
\r
  const defaults = new BaseMaterial(cfg.material || {});\r
\r
  if (defaults.color) uniforms.diffuse.value = defaults.color;\r
  if ('roughness' in defaults) uniforms.roughness.value = defaults.roughness;\r
  if ('metalness' in defaults) uniforms.metalness.value = defaults.metalness;\r
  if ('envMap' in defaults) uniforms.envMap.value = defaults.envMap;\r
  if ('envMapIntensity' in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;\r
\r
  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {\r
    uniforms[key] = u !== null && typeof u === 'object' && 'value' in u ? u : { value: u };\r
  });\r
\r
  let vert = \`\${cfg.header}\\n\${cfg.vertexHeader ?? ''}\\n\${baseVert}\`;\r
  let frag = \`\${cfg.header}\\n\${cfg.fragmentHeader ?? ''}\\n\${baseFrag}\`;\r
\r
  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {\r
    vert = vert.replace(inc, \`\${inc}\\n\${code}\`);\r
  }\r
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {\r
    frag = frag.replace(inc, \`\${inc}\\n\${code}\`);\r
  }\r
\r
  const mat = new THREE.ShaderMaterial({\r
    defines: { ...baseDefines },\r
    uniforms,\r
    vertexShader: vert,\r
    fragmentShader: frag,\r
    lights: true,\r
    fog: !!cfg.material?.fog\r
  });\r
\r
  return mat;\r
}\r
\r
const CanvasWrapper = ({ children }) => (\r
  <Canvas dpr={[1, 2]} frameloop="always" className="w-full h-full relative">\r
    {children}\r
  </Canvas>\r
);\r
\r
const hexToNormalizedRGB = hex => {\r
  const clean = hex.replace('#', '');\r
  const r = parseInt(clean.substring(0, 2), 16);\r
  const g = parseInt(clean.substring(2, 4), 16);\r
  const b = parseInt(clean.substring(4, 6), 16);\r
  return [r / 255, g / 255, b / 255];\r
};\r
\r
const noise = \`\r
float random (in vec2 st) {\r
    return fract(sin(dot(st.xy,\r
                         vec2(12.9898,78.233)))*\r
        43758.5453123);\r
}\r
float noise (in vec2 st) {\r
    vec2 i = floor(st);\r
    vec2 f = fract(st);\r
    float a = random(i);\r
    float b = random(i + vec2(1.0, 0.0));\r
    float c = random(i + vec2(0.0, 1.0));\r
    float d = random(i + vec2(1.0, 1.0));\r
    vec2 u = f * f * (3.0 - 2.0 * f);\r
    return mix(a, b, u.x) +\r
           (c - a)* u.y * (1.0 - u.x) +\r
           (d - b) * u.x * u.y;\r
}\r
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\r
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\r
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}\r
float cnoise(vec3 P){\r
  vec3 Pi0 = floor(P);\r
  vec3 Pi1 = Pi0 + vec3(1.0);\r
  Pi0 = mod(Pi0, 289.0);\r
  Pi1 = mod(Pi1, 289.0);\r
  vec3 Pf0 = fract(P);\r
  vec3 Pf1 = Pf0 - vec3(1.0);\r
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\r
  vec4 iy = vec4(Pi0.yy, Pi1.yy);\r
  vec4 iz0 = Pi0.zzzz;\r
  vec4 iz1 = Pi1.zzzz;\r
  vec4 ixy = permute(permute(ix) + iy);\r
  vec4 ixy0 = permute(ixy + iz0);\r
  vec4 ixy1 = permute(ixy + iz1);\r
  vec4 gx0 = ixy0 / 7.0;\r
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\r
  gx0 = fract(gx0);\r
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\r
  vec4 sz0 = step(gz0, vec4(0.0));\r
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\r
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\r
  vec4 gx1 = ixy1 / 7.0;\r
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\r
  gx1 = fract(gx1);\r
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\r
  vec4 sz1 = step(gz1, vec4(0.0));\r
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\r
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\r
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\r
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\r
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\r
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\r
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\r
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\r
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\r
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\r
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));\r
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;\r
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));\r
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;\r
  float n000 = dot(g000, Pf0);\r
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));\r
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));\r
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));\r
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));\r
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));\r
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));\r
  float n111 = dot(g111, Pf1);\r
  vec3 fade_xyz = fade(Pf0);\r
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);\r
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);\r
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);\r
  return 2.2 * n_xyz;\r
}\r
\`;\r
\r
const Beams = ({\r
  beamWidth = 2,\r
  beamHeight = 15,\r
  beamNumber = 12,\r
  lightColor = '#ffffff',\r
  speed = 2,\r
  noiseIntensity = 1.75,\r
  scale = 0.2,\r
  rotation = 0\r
}) => {\r
  const meshRef = useRef(null);\r
  const beamMaterial = useMemo(\r
    () =>\r
      extendMaterial(THREE.MeshStandardMaterial, {\r
        header: \`\r
  varying vec3 vEye;\r
  varying float vNoise;\r
  varying vec2 vUv;\r
  varying vec3 vPosition;\r
  uniform float time;\r
  uniform float uSpeed;\r
  uniform float uNoiseIntensity;\r
  uniform float uScale;\r
  \${noise}\`,\r
        vertexHeader: \`\r
  float getPos(vec3 pos) {\r
    vec3 noisePos =\r
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;\r
    return cnoise(noisePos);\r
  }\r
  vec3 getCurrentPos(vec3 pos) {\r
    vec3 newpos = pos;\r
    newpos.z += getPos(pos);\r
    return newpos;\r
  }\r
  vec3 getNormal(vec3 pos) {\r
    vec3 curpos = getCurrentPos(pos);\r
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));\r
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));\r
    vec3 tangentX = normalize(nextposX - curpos);\r
    vec3 tangentZ = normalize(nextposZ - curpos);\r
    return normalize(cross(tangentZ, tangentX));\r
  }\`,\r
        fragmentHeader: '',\r
        vertex: {\r
          '#include <begin_vertex>': \`transformed.z += getPos(transformed.xyz);\`,\r
          '#include <beginnormal_vertex>': \`objectNormal = getNormal(position.xyz);\`\r
        },\r
        fragment: {\r
          '#include <dithering_fragment>': \`\r
    float randomNoise = noise(gl_FragCoord.xy);\r
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;\`\r
        },\r
        material: { fog: true },\r
        uniforms: {\r
          diffuse: new THREE.Color(...hexToNormalizedRGB('#000000')),\r
          time: { shared: true, mixed: true, linked: true, value: 0 },\r
          roughness: 0.3,\r
          metalness: 0.3,\r
          uSpeed: { shared: true, mixed: true, linked: true, value: speed },\r
          envMapIntensity: 10,\r
          uNoiseIntensity: noiseIntensity,\r
          uScale: scale\r
        }\r
      }),\r
    [speed, noiseIntensity, scale]\r
  );\r
\r
  return (\r
    <CanvasWrapper>\r
      <group rotation={[0, 0, degToRad(rotation)]}>\r
        <PlaneNoise ref={meshRef} material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />\r
        <DirLight color={lightColor} position={[0, 3, 10]} />\r
      </group>\r
      <ambientLight intensity={1} />\r
      <color attach="background" args={['#000000']} />\r
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />\r
    </CanvasWrapper>\r
  );\r
};\r
\r
function createStackedPlanesBufferGeometry(n, width, height, spacing, heightSegments) {\r
  const geometry = new THREE.BufferGeometry();\r
  const numVertices = n * (heightSegments + 1) * 2;\r
  const numFaces = n * heightSegments * 2;\r
  const positions = new Float32Array(numVertices * 3);\r
  const indices = new Uint32Array(numFaces * 3);\r
  const uvs = new Float32Array(numVertices * 2);\r
\r
  let vertexOffset = 0;\r
  let indexOffset = 0;\r
  let uvOffset = 0;\r
  const totalWidth = n * width + (n - 1) * spacing;\r
  const xOffsetBase = -totalWidth / 2;\r
\r
  for (let i = 0; i < n; i++) {\r
    const xOffset = xOffsetBase + i * (width + spacing);\r
    const uvXOffset = Math.random() * 300;\r
    const uvYOffset = Math.random() * 300;\r
\r
    for (let j = 0; j <= heightSegments; j++) {\r
      const y = height * (j / heightSegments - 0.5);\r
      const v0 = [xOffset, y, 0];\r
      const v1 = [xOffset + width, y, 0];\r
      positions.set([...v0, ...v1], vertexOffset * 3);\r
\r
      const uvY = j / heightSegments;\r
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);\r
\r
      if (j < heightSegments) {\r
        const a = vertexOffset,\r
          b = vertexOffset + 1,\r
          c = vertexOffset + 2,\r
          d = vertexOffset + 3;\r
        indices.set([a, b, c, c, b, d], indexOffset);\r
        indexOffset += 6;\r
      }\r
      vertexOffset += 2;\r
      uvOffset += 4;\r
    }\r
  }\r
\r
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));\r
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));\r
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));\r
  geometry.computeVertexNormals();\r
  return geometry;\r
}\r
\r
const MergedPlanes = forwardRef(({ material, width, count, height }, ref) => {\r
  const mesh = useRef(null);\r
  useImperativeHandle(ref, () => mesh.current);\r
  const geometry = useMemo(\r
    () => createStackedPlanesBufferGeometry(count, width, height, 0, 100),\r
    [count, width, height]\r
  );\r
  useFrame((_, delta) => {\r
    mesh.current.material.uniforms.time.value += 0.1 * delta;\r
  });\r
  return <mesh ref={mesh} geometry={geometry} material={material} />;\r
});\r
MergedPlanes.displayName = 'MergedPlanes';\r
\r
const PlaneNoise = forwardRef((props, ref) => (\r
  <MergedPlanes ref={ref} material={props.material} width={props.width} count={props.count} height={props.height} />\r
));\r
PlaneNoise.displayName = 'PlaneNoise';\r
\r
const DirLight = ({ position, color }) => {\r
  const dir = useRef(null);\r
  useEffect(() => {\r
    if (!dir.current) return;\r
    const cam = dir.current.shadow.camera;\r
    if (!cam) return;\r
    cam.top = 24;\r
    cam.bottom = -24;\r
    cam.left = -24;\r
    cam.right = 24;\r
    cam.far = 64;\r
    dir.current.shadow.bias = -0.004;\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, []);\r
  return <directionalLight ref={dir} color={color} intensity={1} position={position} />;\r
};\r
\r
export default Beams;\r
`,fe=`import { forwardRef, useImperativeHandle, useEffect, useRef, useMemo, FC, ReactNode } from 'react';\r
\r
import * as THREE from 'three';\r
\r
import { Canvas, useFrame } from '@react-three/fiber';\r
import { PerspectiveCamera } from '@react-three/drei';\r
import { degToRad } from 'three/src/math/MathUtils.js';\r
\r
import './Beams.css';\r
\r
type UniformValue = THREE.IUniform<unknown> | unknown;\r
\r
interface ExtendMaterialConfig {\r
  header: string;\r
  vertexHeader?: string;\r
  fragmentHeader?: string;\r
  material?: THREE.MeshPhysicalMaterialParameters & { fog?: boolean };\r
  uniforms?: Record<string, UniformValue>;\r
  vertex?: Record<string, string>;\r
  fragment?: Record<string, string>;\r
}\r
\r
type ShaderWithDefines = THREE.ShaderLibShader & {\r
  defines?: Record<string, string | number | boolean>;\r
};\r
\r
function extendMaterial<T extends THREE.Material = THREE.Material>(\r
  BaseMaterial: new (params?: THREE.MaterialParameters) => T,\r
  cfg: ExtendMaterialConfig\r
): THREE.ShaderMaterial {\r
  const physical = THREE.ShaderLib.physical as ShaderWithDefines;\r
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;\r
  const baseDefines = physical.defines ?? {};\r
\r
  const uniforms: Record<string, THREE.IUniform> = THREE.UniformsUtils.clone(baseUniforms);\r
\r
  const defaults = new BaseMaterial(cfg.material || {}) as T & {\r
    color?: THREE.Color;\r
    roughness?: number;\r
    metalness?: number;\r
    envMap?: THREE.Texture;\r
    envMapIntensity?: number;\r
  };\r
\r
  if (defaults.color) uniforms.diffuse.value = defaults.color;\r
  if ('roughness' in defaults) uniforms.roughness.value = defaults.roughness;\r
  if ('metalness' in defaults) uniforms.metalness.value = defaults.metalness;\r
  if ('envMap' in defaults) uniforms.envMap.value = defaults.envMap;\r
  if ('envMapIntensity' in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;\r
\r
  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {\r
    uniforms[key] =\r
      u !== null && typeof u === 'object' && 'value' in u\r
        ? (u as THREE.IUniform<unknown>)\r
        : ({ value: u } as THREE.IUniform<unknown>);\r
  });\r
\r
  let vert = \`\${cfg.header}\\n\${cfg.vertexHeader ?? ''}\\n\${baseVert}\`;\r
  let frag = \`\${cfg.header}\\n\${cfg.fragmentHeader ?? ''}\\n\${baseFrag}\`;\r
\r
  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {\r
    vert = vert.replace(inc, \`\${inc}\\n\${code}\`);\r
  }\r
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {\r
    frag = frag.replace(inc, \`\${inc}\\n\${code}\`);\r
  }\r
\r
  const mat = new THREE.ShaderMaterial({\r
    defines: { ...baseDefines },\r
    uniforms,\r
    vertexShader: vert,\r
    fragmentShader: frag,\r
    lights: true,\r
    fog: !!cfg.material?.fog\r
  });\r
\r
  return mat;\r
}\r
\r
const CanvasWrapper: FC<{ children: ReactNode }> = ({ children }) => (\r
  <Canvas dpr={[1, 2]} frameloop="always" className="beams-container">\r
    {children}\r
  </Canvas>\r
);\r
\r
const hexToNormalizedRGB = (hex: string): [number, number, number] => {\r
  const clean = hex.replace('#', '');\r
  const r = parseInt(clean.substring(0, 2), 16);\r
  const g = parseInt(clean.substring(2, 4), 16);\r
  const b = parseInt(clean.substring(4, 6), 16);\r
  return [r / 255, g / 255, b / 255];\r
};\r
\r
const noise = \`\r
float random (in vec2 st) {\r
    return fract(sin(dot(st.xy,\r
                         vec2(12.9898,78.233)))*\r
        43758.5453123);\r
}\r
float noise (in vec2 st) {\r
    vec2 i = floor(st);\r
    vec2 f = fract(st);\r
    float a = random(i);\r
    float b = random(i + vec2(1.0, 0.0));\r
    float c = random(i + vec2(0.0, 1.0));\r
    float d = random(i + vec2(1.0, 1.0));\r
    vec2 u = f * f * (3.0 - 2.0 * f);\r
    return mix(a, b, u.x) +\r
           (c - a)* u.y * (1.0 - u.x) +\r
           (d - b) * u.x * u.y;\r
}\r
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\r
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\r
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}\r
float cnoise(vec3 P){\r
  vec3 Pi0 = floor(P);\r
  vec3 Pi1 = Pi0 + vec3(1.0);\r
  Pi0 = mod(Pi0, 289.0);\r
  Pi1 = mod(Pi1, 289.0);\r
  vec3 Pf0 = fract(P);\r
  vec3 Pf1 = Pf0 - vec3(1.0);\r
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\r
  vec4 iy = vec4(Pi0.yy, Pi1.yy);\r
  vec4 iz0 = Pi0.zzzz;\r
  vec4 iz1 = Pi1.zzzz;\r
  vec4 ixy = permute(permute(ix) + iy);\r
  vec4 ixy0 = permute(ixy + iz0);\r
  vec4 ixy1 = permute(ixy + iz1);\r
  vec4 gx0 = ixy0 / 7.0;\r
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\r
  gx0 = fract(gx0);\r
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\r
  vec4 sz0 = step(gz0, vec4(0.0));\r
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\r
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\r
  vec4 gx1 = ixy1 / 7.0;\r
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\r
  gx1 = fract(gx1);\r
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\r
  vec4 sz1 = step(gz1, vec4(0.0));\r
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\r
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\r
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\r
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\r
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\r
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\r
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\r
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\r
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\r
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\r
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));\r
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;\r
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));\r
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;\r
  float n000 = dot(g000, Pf0);\r
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));\r
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));\r
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));\r
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));\r
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));\r
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));\r
  float n111 = dot(g111, Pf1);\r
  vec3 fade_xyz = fade(Pf0);\r
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);\r
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);\r
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);\r
  return 2.2 * n_xyz;\r
}\r
\`;\r
\r
interface BeamsProps {\r
  beamWidth?: number;\r
  beamHeight?: number;\r
  beamNumber?: number;\r
  lightColor?: string;\r
  speed?: number;\r
  noiseIntensity?: number;\r
  scale?: number;\r
  rotation?: number;\r
}\r
\r
const Beams: FC<BeamsProps> = ({\r
  beamWidth = 2,\r
  beamHeight = 15,\r
  beamNumber = 12,\r
  lightColor = '#ffffff',\r
  speed = 2,\r
  noiseIntensity = 1.75,\r
  scale = 0.2,\r
  rotation = 0\r
}) => {\r
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);\r
\r
  const beamMaterial = useMemo(\r
    () =>\r
      extendMaterial(THREE.MeshStandardMaterial, {\r
        header: \`\r
  varying vec3 vEye;\r
  varying float vNoise;\r
  varying vec2 vUv;\r
  varying vec3 vPosition;\r
  uniform float time;\r
  uniform float uSpeed;\r
  uniform float uNoiseIntensity;\r
  uniform float uScale;\r
  \${noise}\`,\r
        vertexHeader: \`\r
  float getPos(vec3 pos) {\r
    vec3 noisePos =\r
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;\r
    return cnoise(noisePos);\r
  }\r
  vec3 getCurrentPos(vec3 pos) {\r
    vec3 newpos = pos;\r
    newpos.z += getPos(pos);\r
    return newpos;\r
  }\r
  vec3 getNormal(vec3 pos) {\r
    vec3 curpos = getCurrentPos(pos);\r
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));\r
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));\r
    vec3 tangentX = normalize(nextposX - curpos);\r
    vec3 tangentZ = normalize(nextposZ - curpos);\r
    return normalize(cross(tangentZ, tangentX));\r
  }\`,\r
        fragmentHeader: '',\r
        vertex: {\r
          '#include <begin_vertex>': \`transformed.z += getPos(transformed.xyz);\`,\r
          '#include <beginnormal_vertex>': \`objectNormal = getNormal(position.xyz);\`\r
        },\r
        fragment: {\r
          '#include <dithering_fragment>': \`\r
    float randomNoise = noise(gl_FragCoord.xy);\r
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;\`\r
        },\r
        material: { fog: true },\r
        uniforms: {\r
          diffuse: new THREE.Color(...hexToNormalizedRGB('#000000')),\r
          time: { shared: true, mixed: true, linked: true, value: 0 },\r
          roughness: 0.3,\r
          metalness: 0.3,\r
          uSpeed: { shared: true, mixed: true, linked: true, value: speed },\r
          envMapIntensity: 10,\r
          uNoiseIntensity: noiseIntensity,\r
          uScale: scale\r
        }\r
      }),\r
    [speed, noiseIntensity, scale]\r
  );\r
\r
  return (\r
    <CanvasWrapper>\r
      <group rotation={[0, 0, degToRad(rotation)]}>\r
        <PlaneNoise ref={meshRef} material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />\r
        <DirLight color={lightColor} position={[0, 3, 10]} />\r
      </group>\r
      <ambientLight intensity={1} />\r
      <color attach="background" args={['#000000']} />\r
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />\r
    </CanvasWrapper>\r
  );\r
};\r
\r
function createStackedPlanesBufferGeometry(\r
  n: number,\r
  width: number,\r
  height: number,\r
  spacing: number,\r
  heightSegments: number\r
): THREE.BufferGeometry {\r
  const geometry = new THREE.BufferGeometry();\r
  const numVertices = n * (heightSegments + 1) * 2;\r
  const numFaces = n * heightSegments * 2;\r
  const positions = new Float32Array(numVertices * 3);\r
  const indices = new Uint32Array(numFaces * 3);\r
  const uvs = new Float32Array(numVertices * 2);\r
\r
  let vertexOffset = 0;\r
  let indexOffset = 0;\r
  let uvOffset = 0;\r
  const totalWidth = n * width + (n - 1) * spacing;\r
  const xOffsetBase = -totalWidth / 2;\r
\r
  for (let i = 0; i < n; i++) {\r
    const xOffset = xOffsetBase + i * (width + spacing);\r
    const uvXOffset = Math.random() * 300;\r
    const uvYOffset = Math.random() * 300;\r
\r
    for (let j = 0; j <= heightSegments; j++) {\r
      const y = height * (j / heightSegments - 0.5);\r
      const v0 = [xOffset, y, 0];\r
      const v1 = [xOffset + width, y, 0];\r
      positions.set([...v0, ...v1], vertexOffset * 3);\r
\r
      const uvY = j / heightSegments;\r
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);\r
\r
      if (j < heightSegments) {\r
        const a = vertexOffset,\r
          b = vertexOffset + 1,\r
          c = vertexOffset + 2,\r
          d = vertexOffset + 3;\r
        indices.set([a, b, c, c, b, d], indexOffset);\r
        indexOffset += 6;\r
      }\r
      vertexOffset += 2;\r
      uvOffset += 4;\r
    }\r
  }\r
\r
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));\r
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));\r
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));\r
  geometry.computeVertexNormals();\r
  return geometry;\r
}\r
\r
const MergedPlanes = forwardRef<\r
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,\r
  {\r
    material: THREE.ShaderMaterial;\r
    width: number;\r
    count: number;\r
    height: number;\r
  }\r
>(({ material, width, count, height }, ref) => {\r
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);\r
  useImperativeHandle(ref, () => mesh.current);\r
  const geometry = useMemo(\r
    () => createStackedPlanesBufferGeometry(count, width, height, 0, 100),\r
    [count, width, height]\r
  );\r
  useFrame((_, delta) => {\r
    mesh.current.material.uniforms.time.value += 0.1 * delta;\r
  });\r
  return <mesh ref={mesh} geometry={geometry} material={material} />;\r
});\r
MergedPlanes.displayName = 'MergedPlanes';\r
\r
const PlaneNoise = forwardRef<\r
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,\r
  {\r
    material: THREE.ShaderMaterial;\r
    width: number;\r
    count: number;\r
    height: number;\r
  }\r
>((props, ref) => (\r
  <MergedPlanes ref={ref} material={props.material} width={props.width} count={props.count} height={props.height} />\r
));\r
PlaneNoise.displayName = 'PlaneNoise';\r
\r
const DirLight: FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {\r
  const dir = useRef<THREE.DirectionalLight>(null!);\r
  useEffect(() => {\r
    if (!dir.current) return;\r
    const cam = dir.current.shadow.camera as THREE.Camera & {\r
      top: number;\r
      bottom: number;\r
      left: number;\r
      right: number;\r
      far: number;\r
    };\r
    cam.top = 24;\r
    cam.bottom = -24;\r
    cam.left = -24;\r
    cam.right = 24;\r
    cam.far = 64;\r
    dir.current.shadow.bias = -0.004;\r
  }, []);\r
  return <directionalLight ref={dir} color={color} intensity={1} position={position} />;\r
};\r
\r
export default Beams;\r
`,ge=`import { forwardRef, useImperativeHandle, useEffect, useRef, useMemo, FC, ReactNode } from 'react';\r
\r
import * as THREE from 'three';\r
\r
import { Canvas, useFrame } from '@react-three/fiber';\r
import { PerspectiveCamera } from '@react-three/drei';\r
import { degToRad } from 'three/src/math/MathUtils.js';\r
\r
type UniformValue = THREE.IUniform<unknown> | unknown;\r
\r
interface ExtendMaterialConfig {\r
  header: string;\r
  vertexHeader?: string;\r
  fragmentHeader?: string;\r
  material?: THREE.MeshPhysicalMaterialParameters & { fog?: boolean };\r
  uniforms?: Record<string, UniformValue>;\r
  vertex?: Record<string, string>;\r
  fragment?: Record<string, string>;\r
}\r
\r
type ShaderWithDefines = THREE.ShaderLibShader & {\r
  defines?: Record<string, string | number | boolean>;\r
};\r
\r
function extendMaterial<T extends THREE.Material = THREE.Material>(\r
  BaseMaterial: new (params?: THREE.MaterialParameters) => T,\r
  cfg: ExtendMaterialConfig\r
): THREE.ShaderMaterial {\r
  const physical = THREE.ShaderLib.physical as ShaderWithDefines;\r
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;\r
  const baseDefines = physical.defines ?? {};\r
\r
  const uniforms: Record<string, THREE.IUniform> = THREE.UniformsUtils.clone(baseUniforms);\r
\r
  const defaults = new BaseMaterial(cfg.material || {}) as T & {\r
    color?: THREE.Color;\r
    roughness?: number;\r
    metalness?: number;\r
    envMap?: THREE.Texture;\r
    envMapIntensity?: number;\r
  };\r
\r
  if (defaults.color) uniforms.diffuse.value = defaults.color;\r
  if ('roughness' in defaults) uniforms.roughness.value = defaults.roughness;\r
  if ('metalness' in defaults) uniforms.metalness.value = defaults.metalness;\r
  if ('envMap' in defaults) uniforms.envMap.value = defaults.envMap;\r
  if ('envMapIntensity' in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;\r
\r
  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {\r
    uniforms[key] =\r
      u !== null && typeof u === 'object' && 'value' in u\r
        ? (u as THREE.IUniform<unknown>)\r
        : ({ value: u } as THREE.IUniform<unknown>);\r
  });\r
\r
  let vert = \`\${cfg.header}\\n\${cfg.vertexHeader ?? ''}\\n\${baseVert}\`;\r
  let frag = \`\${cfg.header}\\n\${cfg.fragmentHeader ?? ''}\\n\${baseFrag}\`;\r
\r
  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {\r
    vert = vert.replace(inc, \`\${inc}\\n\${code}\`);\r
  }\r
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {\r
    frag = frag.replace(inc, \`\${inc}\\n\${code}\`);\r
  }\r
\r
  const mat = new THREE.ShaderMaterial({\r
    defines: { ...baseDefines },\r
    uniforms,\r
    vertexShader: vert,\r
    fragmentShader: frag,\r
    lights: true,\r
    fog: !!cfg.material?.fog\r
  });\r
\r
  return mat;\r
}\r
\r
const CanvasWrapper: FC<{ children: ReactNode }> = ({ children }) => (\r
  <Canvas dpr={[1, 2]} frameloop="always" className="w-full h-full relative">\r
    {children}\r
  </Canvas>\r
);\r
\r
const hexToNormalizedRGB = (hex: string): [number, number, number] => {\r
  const clean = hex.replace('#', '');\r
  const r = parseInt(clean.substring(0, 2), 16);\r
  const g = parseInt(clean.substring(2, 4), 16);\r
  const b = parseInt(clean.substring(4, 6), 16);\r
  return [r / 255, g / 255, b / 255];\r
};\r
\r
const noise = \`\r
float random (in vec2 st) {\r
    return fract(sin(dot(st.xy,\r
                         vec2(12.9898,78.233)))*\r
        43758.5453123);\r
}\r
float noise (in vec2 st) {\r
    vec2 i = floor(st);\r
    vec2 f = fract(st);\r
    float a = random(i);\r
    float b = random(i + vec2(1.0, 0.0));\r
    float c = random(i + vec2(0.0, 1.0));\r
    float d = random(i + vec2(1.0, 1.0));\r
    vec2 u = f * f * (3.0 - 2.0 * f);\r
    return mix(a, b, u.x) +\r
           (c - a)* u.y * (1.0 - u.x) +\r
           (d - b) * u.x * u.y;\r
}\r
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\r
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\r
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}\r
float cnoise(vec3 P){\r
  vec3 Pi0 = floor(P);\r
  vec3 Pi1 = Pi0 + vec3(1.0);\r
  Pi0 = mod(Pi0, 289.0);\r
  Pi1 = mod(Pi1, 289.0);\r
  vec3 Pf0 = fract(P);\r
  vec3 Pf1 = Pf0 - vec3(1.0);\r
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\r
  vec4 iy = vec4(Pi0.yy, Pi1.yy);\r
  vec4 iz0 = Pi0.zzzz;\r
  vec4 iz1 = Pi1.zzzz;\r
  vec4 ixy = permute(permute(ix) + iy);\r
  vec4 ixy0 = permute(ixy + iz0);\r
  vec4 ixy1 = permute(ixy + iz1);\r
  vec4 gx0 = ixy0 / 7.0;\r
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\r
  gx0 = fract(gx0);\r
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\r
  vec4 sz0 = step(gz0, vec4(0.0));\r
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\r
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\r
  vec4 gx1 = ixy1 / 7.0;\r
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\r
  gx1 = fract(gx1);\r
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\r
  vec4 sz1 = step(gz1, vec4(0.0));\r
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\r
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\r
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\r
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\r
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\r
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\r
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\r
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\r
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\r
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\r
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));\r
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;\r
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));\r
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;\r
  float n000 = dot(g000, Pf0);\r
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));\r
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));\r
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));\r
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));\r
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));\r
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));\r
  float n111 = dot(g111, Pf1);\r
  vec3 fade_xyz = fade(Pf0);\r
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);\r
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);\r
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);\r
  return 2.2 * n_xyz;\r
}\r
\`;\r
\r
interface BeamsProps {\r
  beamWidth?: number;\r
  beamHeight?: number;\r
  beamNumber?: number;\r
  lightColor?: string;\r
  speed?: number;\r
  noiseIntensity?: number;\r
  scale?: number;\r
  rotation?: number;\r
}\r
\r
const Beams: FC<BeamsProps> = ({\r
  beamWidth = 2,\r
  beamHeight = 15,\r
  beamNumber = 12,\r
  lightColor = '#ffffff',\r
  speed = 2,\r
  noiseIntensity = 1.75,\r
  scale = 0.2,\r
  rotation = 0\r
}) => {\r
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);\r
\r
  const beamMaterial = useMemo(\r
    () =>\r
      extendMaterial(THREE.MeshStandardMaterial, {\r
        header: \`\r
  varying vec3 vEye;\r
  varying float vNoise;\r
  varying vec2 vUv;\r
  varying vec3 vPosition;\r
  uniform float time;\r
  uniform float uSpeed;\r
  uniform float uNoiseIntensity;\r
  uniform float uScale;\r
  \${noise}\`,\r
        vertexHeader: \`\r
  float getPos(vec3 pos) {\r
    vec3 noisePos =\r
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;\r
    return cnoise(noisePos);\r
  }\r
  vec3 getCurrentPos(vec3 pos) {\r
    vec3 newpos = pos;\r
    newpos.z += getPos(pos);\r
    return newpos;\r
  }\r
  vec3 getNormal(vec3 pos) {\r
    vec3 curpos = getCurrentPos(pos);\r
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));\r
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));\r
    vec3 tangentX = normalize(nextposX - curpos);\r
    vec3 tangentZ = normalize(nextposZ - curpos);\r
    return normalize(cross(tangentZ, tangentX));\r
  }\`,\r
        fragmentHeader: '',\r
        vertex: {\r
          '#include <begin_vertex>': \`transformed.z += getPos(transformed.xyz);\`,\r
          '#include <beginnormal_vertex>': \`objectNormal = getNormal(position.xyz);\`\r
        },\r
        fragment: {\r
          '#include <dithering_fragment>': \`\r
    float randomNoise = noise(gl_FragCoord.xy);\r
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;\`\r
        },\r
        material: { fog: true },\r
        uniforms: {\r
          diffuse: new THREE.Color(...hexToNormalizedRGB('#000000')),\r
          time: { shared: true, mixed: true, linked: true, value: 0 },\r
          roughness: 0.3,\r
          metalness: 0.3,\r
          uSpeed: { shared: true, mixed: true, linked: true, value: speed },\r
          envMapIntensity: 10,\r
          uNoiseIntensity: noiseIntensity,\r
          uScale: scale\r
        }\r
      }),\r
    [speed, noiseIntensity, scale]\r
  );\r
\r
  return (\r
    <CanvasWrapper>\r
      <group rotation={[0, 0, degToRad(rotation)]}>\r
        <PlaneNoise ref={meshRef} material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />\r
        <DirLight color={lightColor} position={[0, 3, 10]} />\r
      </group>\r
      <ambientLight intensity={1} />\r
      <color attach="background" args={['#000000']} />\r
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />\r
    </CanvasWrapper>\r
  );\r
};\r
\r
function createStackedPlanesBufferGeometry(\r
  n: number,\r
  width: number,\r
  height: number,\r
  spacing: number,\r
  heightSegments: number\r
): THREE.BufferGeometry {\r
  const geometry = new THREE.BufferGeometry();\r
  const numVertices = n * (heightSegments + 1) * 2;\r
  const numFaces = n * heightSegments * 2;\r
  const positions = new Float32Array(numVertices * 3);\r
  const indices = new Uint32Array(numFaces * 3);\r
  const uvs = new Float32Array(numVertices * 2);\r
\r
  let vertexOffset = 0;\r
  let indexOffset = 0;\r
  let uvOffset = 0;\r
  const totalWidth = n * width + (n - 1) * spacing;\r
  const xOffsetBase = -totalWidth / 2;\r
\r
  for (let i = 0; i < n; i++) {\r
    const xOffset = xOffsetBase + i * (width + spacing);\r
    const uvXOffset = Math.random() * 300;\r
    const uvYOffset = Math.random() * 300;\r
\r
    for (let j = 0; j <= heightSegments; j++) {\r
      const y = height * (j / heightSegments - 0.5);\r
      const v0 = [xOffset, y, 0];\r
      const v1 = [xOffset + width, y, 0];\r
      positions.set([...v0, ...v1], vertexOffset * 3);\r
\r
      const uvY = j / heightSegments;\r
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);\r
\r
      if (j < heightSegments) {\r
        const a = vertexOffset,\r
          b = vertexOffset + 1,\r
          c = vertexOffset + 2,\r
          d = vertexOffset + 3;\r
        indices.set([a, b, c, c, b, d], indexOffset);\r
        indexOffset += 6;\r
      }\r
      vertexOffset += 2;\r
      uvOffset += 4;\r
    }\r
  }\r
\r
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));\r
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));\r
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));\r
  geometry.computeVertexNormals();\r
  return geometry;\r
}\r
\r
const MergedPlanes = forwardRef<\r
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,\r
  {\r
    material: THREE.ShaderMaterial;\r
    width: number;\r
    count: number;\r
    height: number;\r
  }\r
>(({ material, width, count, height }, ref) => {\r
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);\r
  useImperativeHandle(ref, () => mesh.current);\r
  const geometry = useMemo(\r
    () => createStackedPlanesBufferGeometry(count, width, height, 0, 100),\r
    [count, width, height]\r
  );\r
  useFrame((_, delta) => {\r
    mesh.current.material.uniforms.time.value += 0.1 * delta;\r
  });\r
  return <mesh ref={mesh} geometry={geometry} material={material} />;\r
});\r
MergedPlanes.displayName = 'MergedPlanes';\r
\r
const PlaneNoise = forwardRef<\r
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,\r
  {\r
    material: THREE.ShaderMaterial;\r
    width: number;\r
    count: number;\r
    height: number;\r
  }\r
>((props, ref) => (\r
  <MergedPlanes ref={ref} material={props.material} width={props.width} count={props.count} height={props.height} />\r
));\r
PlaneNoise.displayName = 'PlaneNoise';\r
\r
const DirLight: FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {\r
  const dir = useRef<THREE.DirectionalLight>(null!);\r
  useEffect(() => {\r
    if (!dir.current) return;\r
    const cam = dir.current.shadow.camera as THREE.Camera & {\r
      top: number;\r
      bottom: number;\r
      left: number;\r
      right: number;\r
      far: number;\r
    };\r
    cam.top = 24;\r
    cam.bottom = -24;\r
    cam.left = -24;\r
    cam.right = 24;\r
    cam.far = 64;\r
    dir.current.shadow.bias = -0.004;\r
  }, []);\r
  return <directionalLight ref={dir} color={color} intensity={1} position={position} />;\r
};\r
\r
export default Beams;\r
`,ue={dependencies:"three @react-three/fiber @react-three/drei",usage:`import Beams from './Beams';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Beams
    beamWidth={2}
    beamHeight={15}
    beamNumber={12}
    lightColor="#ffffff"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={0}
  />
</div>`,code:oe,css:ie,tailwind:ce,tsCode:fe,tsTailwind:ge},me=Math.PI/180;function le(e){return e*me}function ve(e,n){var y;const s=K.physical,{vertexShader:a,fragmentShader:o,uniforms:f}=s,v=s.defines??{},g=Q.clone(f),i=new e(n.material||{});i.color&&(g.diffuse.value=i.color),"roughness"in i&&(g.roughness.value=i.roughness),"metalness"in i&&(g.metalness.value=i.metalness),"envMap"in i&&(g.envMap.value=i.envMap),"envMapIntensity"in i&&(g.envMapIntensity.value=i.envMapIntensity),Object.entries(n.uniforms??{}).forEach(([l,m])=>{g[l]=m!==null&&typeof m=="object"&&"value"in m?m:{value:m}});let d=`${n.header}
${n.vertexHeader??""}
${a}`,u=`${n.header}
${n.fragmentHeader??""}
${o}`;for(const[l,m]of Object.entries(n.vertex??{}))d=d.replace(l,`${l}
${m}`);for(const[l,m]of Object.entries(n.fragment??{}))u=u.replace(l,`${l}
${m}`);return new ee({defines:{...v},uniforms:g,vertexShader:d,fragmentShader:u,lights:!0,fog:!!((y=n.material)!=null&&y.fog)})}const de=({children:e})=>r.jsx(ne,{dpr:[1,2],frameloop:"always",className:"beams-container",children:e}),xe=e=>{const n=e.replace("#",""),s=parseInt(n.substring(0,2),16),a=parseInt(n.substring(2,4),16),o=parseInt(n.substring(4,6),16);return[s/255,a/255,o/255]},ye=`
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`,pe=({beamWidth:e=2,beamHeight:n=15,beamNumber:s=12,lightColor:a="#ffffff",speed:o=2,noiseIntensity:f=1.75,scale:v=.2,rotation:g=0})=>{const i=t.useRef(null),d=t.useMemo(()=>ve(J,{header:`
  varying vec3 vEye;
  varying float vNoise;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  ${ye}`,vertexHeader:`
  float getPos(vec3 pos) {
    vec3 noisePos =
      vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }
  vec3 getCurrentPos(vec3 pos) {
    vec3 newpos = pos;
    newpos.z += getPos(pos);
    return newpos;
  }
  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,fragmentHeader:"",vertex:{"#include <begin_vertex>":"transformed.z += getPos(transformed.xyz);","#include <beginnormal_vertex>":"objectNormal = getNormal(position.xyz);"},fragment:{"#include <dithering_fragment>":`
    float randomNoise = noise(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;`},material:{fog:!0},uniforms:{diffuse:new q(...xe("#000000")),time:{shared:!0,mixed:!0,linked:!0,value:0},roughness:.3,metalness:.3,uSpeed:{shared:!0,mixed:!0,linked:!0,value:o},envMapIntensity:10,uNoiseIntensity:f,uScale:v}}),[o,f,v]);return r.jsxs(de,{children:[r.jsxs("group",{rotation:[0,0,le(g)],children:[r.jsx(N,{ref:i,material:d,count:s,width:e,height:n}),r.jsx(be,{color:a,position:[0,3,10]})]}),r.jsx("ambientLight",{intensity:1}),r.jsx("color",{attach:"background",args:["#000000"]}),r.jsx(se,{makeDefault:!0,position:[0,0,20],fov:30})]})};function he(e,n,s,a,o){const f=new re,v=e*(o+1)*2,g=e*o*2,i=new Float32Array(v*3),d=new Uint32Array(g*3),u=new Float32Array(v*2);let x=0,y=0,l=0;const p=-(e*n+(e-1)*a)/2;for(let c=0;c<e;c++){const z=p+c*(n+a),w=Math.random()*300,R=Math.random()*300;for(let b=0;b<=o;b++){const M=s*(b/o-.5),I=[z,M,0],B=[z+n,M,0];i.set([...I,...B],x*3);const S=b/o;if(u.set([w,S+R,w+1,S+R],l),b<o){const _=x,H=x+1,T=x+2,j=x+3;d.set([_,H,T,T,H,j],y),y+=6}x+=2,l+=4}}return f.setAttribute("position",new P(i,3)),f.setAttribute("uv",new P(u,2)),f.setIndex(new P(d,1)),f.computeVertexNormals(),f}const O=t.forwardRef(({material:e,width:n,count:s,height:a},o)=>{const f=t.useRef(null);t.useImperativeHandle(o,()=>f.current);const v=t.useMemo(()=>he(s,n,a,0,100),[s,n,a]);return C((g,i)=>{f.current.material.uniforms.time.value+=.1*i}),r.jsx("mesh",{ref:f,geometry:v,material:e})});O.displayName="MergedPlanes";const N=t.forwardRef((e,n)=>r.jsx(O,{ref:n,material:e.material,width:e.width,count:e.count,height:e.height}));N.displayName="PlaneNoise";const be=({position:e,color:n})=>{const s=t.useRef(null);return t.useEffect(()=>{if(!s.current)return;const a=s.current.shadow.camera;a&&(a.top=24,a.bottom=-24,a.left=-24,a.right=24,a.far=64,s.current.shadow.bias=-.004)},[]),r.jsx("directionalLight",{ref:s,color:n,intensity:1,position:e})},Ne=()=>{const[e,n]=t.useState(3),[s,a]=t.useState(30),[o,f]=t.useState(20),[v,g]=t.useState("#ffffff"),[i,d]=t.useState(2),[u,x]=t.useState(1.75),[y,l]=t.useState(.2),[m,p]=t.useState(30),c=[{name:"beamWidth",type:"number",default:"2",description:"Width of each beam."},{name:"beamHeight",type:"number",default:"15",description:"Height of each beam."},{name:"beamNumber",type:"number",default:"12",description:"Number of beams to display."},{name:"lightColor",type:"string",default:"'#ffffff'",description:"Color of the directional light."},{name:"speed",type:"number",default:"2",description:"Speed of the animation."},{name:"noiseIntensity",type:"number",default:"1.75",description:"Intensity of the noise effect overlay."},{name:"scale",type:"number",default:"0.2",description:"Scale of the noise pattern."},{name:"rotation",type:"number",default:"0",description:"Rotation of the entire beams system in degrees."}];return r.jsxs(A,{children:[r.jsxs(G,{children:[r.jsxs($,{position:"relative",className:"demo-container",h:600,overflow:"hidden",p:0,children:[r.jsx(pe,{beamWidth:e,beamHeight:s,beamNumber:o,lightColor:v,speed:i,noiseIntensity:u,scale:y,rotation:m}),r.jsx(Z,{pillText:"New Background",headline:"Radiant beams for creative user interfaces"})]}),r.jsxs(V,{children:[r.jsxs(k,{align:"center",gap:2,children:[r.jsx(U,{fontSize:"sm",mr:1,children:"Color:"}),r.jsx(W,{type:"color",value:v,onChange:z=>{g(z.target.value)},width:"100px"})]}),r.jsx(h,{title:"Beam Width",min:.1,max:10,step:.1,value:e,onChange:n}),r.jsx(h,{title:"Beam Height",min:1,max:25,step:1,value:s,onChange:a}),r.jsx(h,{title:"Beam Count",min:1,max:50,step:1,value:o,onChange:f}),r.jsx(h,{title:"Speed",min:.1,max:10,step:.1,value:i,onChange:d}),r.jsx(h,{title:"Noise Intensity",min:0,max:5,step:.05,value:u,onChange:x}),r.jsx(h,{title:"Noise Scale",min:.01,max:1,step:.01,value:y,onChange:l}),r.jsx(h,{title:"Rotation",min:0,max:360,step:1,value:m,onChange:p})]}),r.jsx(D,{data:c}),r.jsx(Y,{dependencyList:["three","@react-three/fiber","@react-three/drei"]})]}),r.jsx(L,{children:r.jsx(X,{codeObject:ue})})]})};export{Ne as default};
