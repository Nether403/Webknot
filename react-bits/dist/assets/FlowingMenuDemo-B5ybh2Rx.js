import{j as e,e as f,g as x,B as M}from"./index-wsKSLPNH.js";import{T as q,P as y,a as _,C as b,b as E}from"./PropTable-C4uPWs8h.js";import{D}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";function I({items:m=[]}){return e.jsx("div",{className:"menu-wrap",children:e.jsx("nav",{className:"menu",children:m.map((a,d)=>e.jsx(k,{...a},d))})})}function k({link:m,text:a,image:d}){const c=f.useRef(null),o=f.useRef(null),u=f.useRef(null),p={duration:.6,ease:"expo"},g=(t,r,i,s)=>{const n=h(t,r,i/2,0),l=h(t,r,i/2,s);return n<l?"top":"bottom"},h=(t,r,i,s)=>{const n=t-i,l=r-s;return n*n+l*l},v=t=>{if(!c.current||!o.current||!u.current)return;const r=c.current.getBoundingClientRect(),i=t.clientX-r.left,s=t.clientY-r.top,n=g(i,s,r.width,r.height);x.timeline({defaults:p}).set(o.current,{y:n==="top"?"-101%":"101%"},0).set(u.current,{y:n==="top"?"101%":"-101%"},0).to([o.current,u.current],{y:"0%"},0)},R=t=>{if(!c.current||!o.current||!u.current)return;const r=c.current.getBoundingClientRect(),i=t.clientX-r.left,s=t.clientY-r.top,n=g(i,s,r.width,r.height);x.timeline({defaults:p}).to(o.current,{y:n==="top"?"-101%":"101%"},0).to(u.current,{y:n==="top"?"101%":"-101%"},0)},w=Array.from({length:4}).map((t,r)=>e.jsxs(f.Fragment,{children:[e.jsx("span",{children:a}),e.jsx("div",{className:"marquee__img",style:{backgroundImage:`url(${d})`}})]},r));return e.jsxs("div",{className:"menu__item",ref:c,children:[e.jsx("a",{className:"menu__item-link",href:m,onMouseEnter:v,onMouseLeave:R,children:a}),e.jsx("div",{className:"marquee",ref:o,children:e.jsx("div",{className:"marquee__inner-wrap",ref:u,children:e.jsx("div",{className:"marquee__inner","aria-hidden":"true",children:w})})})]})}const N=`import React from 'react';\r
import { gsap } from 'gsap';\r
\r
import './FlowingMenu.css';\r
\r
function FlowingMenu({ items = [] }) {\r
  return (\r
    <div className="menu-wrap">\r
      <nav className="menu">\r
        {items.map((item, idx) => (\r
          <MenuItem key={idx} {...item} />\r
        ))}\r
      </nav>\r
    </div>\r
  );\r
}\r
\r
function MenuItem({ link, text, image }) {\r
  const itemRef = React.useRef(null);\r
  const marqueeRef = React.useRef(null);\r
  const marqueeInnerRef = React.useRef(null);\r
\r
  const animationDefaults = { duration: 0.6, ease: 'expo' };\r
\r
  const findClosestEdge = (mouseX, mouseY, width, height) => {\r
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);\r
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);\r
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';\r
  };\r
\r
  const distMetric = (x, y, x2, y2) => {\r
    const xDiff = x - x2;\r
    const yDiff = y - y2;\r
    return xDiff * xDiff + yDiff * yDiff;\r
  };\r
\r
  const handleMouseEnter = ev => {\r
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;\r
    const rect = itemRef.current.getBoundingClientRect();\r
    const x = ev.clientX - rect.left;\r
    const y = ev.clientY - rect.top;\r
    const edge = findClosestEdge(x, y, rect.width, rect.height);\r
\r
    gsap\r
      .timeline({ defaults: animationDefaults })\r
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)\r
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)\r
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);\r
  };\r
\r
  const handleMouseLeave = ev => {\r
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;\r
    const rect = itemRef.current.getBoundingClientRect();\r
    const x = ev.clientX - rect.left;\r
    const y = ev.clientY - rect.top;\r
    const edge = findClosestEdge(x, y, rect.width, rect.height);\r
\r
    gsap\r
      .timeline({ defaults: animationDefaults })\r
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)\r
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);\r
  };\r
\r
  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (\r
    <React.Fragment key={idx}>\r
      <span>{text}</span>\r
      <div className="marquee__img" style={{ backgroundImage: \`url(\${image})\` }} />\r
    </React.Fragment>\r
  ));\r
\r
  return (\r
    <div className="menu__item" ref={itemRef}>\r
      <a className="menu__item-link" href={link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>\r
        {text}\r
      </a>\r
      <div className="marquee" ref={marqueeRef}>\r
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>\r
          <div className="marquee__inner" aria-hidden="true">\r
            {repeatedMarqueeContent}\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
}\r
\r
export default FlowingMenu;\r
`,C=`.menu-wrap {\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
}\r
\r
.menu {\r
  display: flex;\r
  flex-direction: column;\r
  height: 100%;\r
  margin: 0;\r
  padding: 0;\r
}\r
\r
.menu__item {\r
  flex: 1;\r
  position: relative;\r
  overflow: hidden;\r
  text-align: center;\r
  box-shadow: 0 -1px #fff;\r
}\r
\r
.menu__item-link {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  height: 100%;\r
  position: relative;\r
  cursor: pointer;\r
  text-transform: uppercase;\r
  text-decoration: none;\r
  white-space: nowrap;\r
  font-weight: 600;\r
  color: #fff;\r
  font-size: 4vh;\r
}\r
\r
.menu__item-link:hover {\r
  color: #060010;\r
}\r
\r
.menu__item-link:focus:not(:focus-visible) {\r
  color: #fff;\r
}\r
\r
.marquee {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  overflow: hidden;\r
  width: 100%;\r
  height: 100%;\r
  pointer-events: none;\r
  background: #fff;\r
  transform: translate3d(0, 101%, 0);\r
  transition: transform 0.6s ease-expo;\r
}\r
\r
.marquee__inner-wrap {\r
  height: 100%;\r
  width: 200%;\r
  display: flex;\r
  transform: translateX(0);\r
}\r
\r
.marquee__inner {\r
  display: flex;\r
  align-items: center;\r
  position: relative;\r
  height: 100%;\r
  width: 200%;\r
  will-change: transform;\r
  animation: marquee 15s linear infinite;\r
}\r
\r
.marquee span {\r
  color: #060010;\r
  white-space: nowrap;\r
  text-transform: uppercase;\r
  font-weight: 400;\r
  font-size: 4vh;\r
  line-height: 1.2;\r
  padding: 1vh 1vw 0;\r
}\r
\r
.marquee__img {\r
  width: 200px;\r
  height: 7vh;\r
  margin: 2em 2vw;\r
  padding: 1em 0;\r
  border-radius: 50px;\r
  background-size: cover;\r
  background-position: 50% 50%;\r
}\r
\r
.menu__item-link:hover + .marquee {\r
  transform: translate3d(0, 0%, 0);\r
}\r
\r
@keyframes marquee {\r
  from {\r
    transform: translateX(0);\r
  }\r
\r
  to {\r
    transform: translateX(-50%);\r
  }\r
}\r
`,j=`import React from 'react';\r
import { gsap } from 'gsap';\r
\r
function FlowingMenu({ items = [] }) {\r
  return (\r
    <div className="w-full h-full overflow-hidden">\r
      <nav className="flex flex-col h-full m-0 p-0">\r
        {items.map((item, idx) => (\r
          <MenuItem key={idx} {...item} />\r
        ))}\r
      </nav>\r
    </div>\r
  );\r
}\r
\r
function MenuItem({ link, text, image }) {\r
  const itemRef = React.useRef(null);\r
  const marqueeRef = React.useRef(null);\r
  const marqueeInnerRef = React.useRef(null);\r
\r
  const animationDefaults = { duration: 0.6, ease: 'expo' };\r
\r
  const findClosestEdge = (mouseX, mouseY, width, height) => {\r
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;\r
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;\r
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';\r
  };\r
\r
  const handleMouseEnter = ev => {\r
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;\r
    const rect = itemRef.current.getBoundingClientRect();\r
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);\r
\r
    gsap\r
      .timeline({ defaults: animationDefaults })\r
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })\r
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })\r
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });\r
  };\r
\r
  const handleMouseLeave = ev => {\r
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;\r
    const rect = itemRef.current.getBoundingClientRect();\r
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);\r
\r
    gsap\r
      .timeline({ defaults: animationDefaults })\r
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })\r
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });\r
  };\r
\r
  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (\r
    <React.Fragment key={idx}>\r
      <span className="text-[#060010] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">{text}</span>\r
      <div\r
        className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"\r
        style={{ backgroundImage: \`url(\${image})\` }}\r
      />\r
    </React.Fragment>\r
  ));\r
\r
  return (\r
    <div className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" ref={itemRef}>\r
      <a\r
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"\r
        href={link}\r
        onMouseEnter={handleMouseEnter}\r
        onMouseLeave={handleMouseLeave}\r
      >\r
        {text}\r
      </a>\r
      <div\r
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"\r
        ref={marqueeRef}\r
      >\r
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>\r
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">\r
            {repeatedMarqueeContent}\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
}\r
\r
export default FlowingMenu;\r
\r
// Note: this is also needed\r
// /** @type {import('tailwindcss').Config} */\r
// export default {\r
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],\r
//   theme: {\r
//     extend: {\r
//       translate: {\r
//         '101': '101%',\r
//       },\r
//       keyframes: {\r
//         marquee: {\r
//           'from': { transform: 'translateX(0%)' },\r
//           'to': { transform: 'translateX(-50%)' }\r
//         }\r
//       },\r
//       animation: {\r
//         marquee: 'marquee 15s linear infinite'\r
//       }\r
//     }\r
//   },\r
//   plugins: [],\r
// };\r
`,F=`import React from 'react';\r
import { gsap } from 'gsap';\r
\r
import './FlowingMenu.css';\r
\r
interface MenuItemProps {\r
  link: string;\r
  text: string;\r
  image: string;\r
}\r
\r
interface FlowingMenuProps {\r
  items?: MenuItemProps[];\r
}\r
\r
const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {\r
  return (\r
    <div className="menu-wrap">\r
      <nav className="menu">\r
        {items.map((item, idx) => (\r
          <MenuItem key={idx} {...item} />\r
        ))}\r
      </nav>\r
    </div>\r
  );\r
};\r
\r
const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {\r
  const itemRef = React.useRef<HTMLDivElement>(null);\r
  const marqueeRef = React.useRef<HTMLDivElement>(null);\r
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);\r
\r
  const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: 'expo' };\r
\r
  const distMetric = (x: number, y: number, x2: number, y2: number): number => {\r
    const xDiff = x - x2;\r
    const yDiff = y - y2;\r
    return xDiff * xDiff + yDiff * yDiff;\r
  };\r
\r
  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {\r
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);\r
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);\r
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';\r
  };\r
\r
  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {\r
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;\r
    const rect = itemRef.current.getBoundingClientRect();\r
    const x = ev.clientX - rect.left;\r
    const y = ev.clientY - rect.top;\r
    const edge = findClosestEdge(x, y, rect.width, rect.height);\r
\r
    const tl = gsap.timeline({ defaults: animationDefaults });\r
\r
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)\r
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)\r
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);\r
  };\r
\r
  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {\r
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;\r
    const rect = itemRef.current.getBoundingClientRect();\r
    const x = ev.clientX - rect.left;\r
    const y = ev.clientY - rect.top;\r
    const edge = findClosestEdge(x, y, rect.width, rect.height);\r
\r
    const tl = gsap.timeline({ defaults: animationDefaults });\r
\r
    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0).to(\r
      marqueeInnerRef.current,\r
      { y: edge === 'top' ? '101%' : '-101%' },\r
      0\r
    );\r
  };\r
\r
  const repeatedMarqueeContent = React.useMemo(() => {\r
    return Array.from({ length: 4 }).map((_, idx) => (\r
      <React.Fragment key={idx}>\r
        <span>{text}</span>\r
        <div className="marquee__img" style={{ backgroundImage: \`url(\${image})\` }} />\r
      </React.Fragment>\r
    ));\r
  }, [text, image]);\r
\r
  return (\r
    <div className="menu__item" ref={itemRef}>\r
      <a className="menu__item-link" href={link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>\r
        {text}\r
      </a>\r
      <div className="marquee" ref={marqueeRef}>\r
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>\r
          <div className="marquee__inner" aria-hidden="true">\r
            {repeatedMarqueeContent}\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default FlowingMenu;\r
`,X=`import React from 'react';\r
import { gsap } from 'gsap';\r
\r
interface MenuItemProps {\r
  link: string;\r
  text: string;\r
  image: string;\r
}\r
\r
interface FlowingMenuProps {\r
  items?: MenuItemProps[];\r
}\r
\r
const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {\r
  return (\r
    <div className="w-full h-full overflow-hidden">\r
      <nav className="flex flex-col h-full m-0 p-0">\r
        {items.map((item, idx) => (\r
          <MenuItem key={idx} {...item} />\r
        ))}\r
      </nav>\r
    </div>\r
  );\r
};\r
\r
const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {\r
  const itemRef = React.useRef<HTMLDivElement>(null);\r
  const marqueeRef = React.useRef<HTMLDivElement>(null);\r
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);\r
\r
  const animationDefaults = { duration: 0.6, ease: 'expo' };\r
\r
  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {\r
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);\r
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);\r
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';\r
  };\r
\r
  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {\r
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;\r
    const rect = itemRef.current.getBoundingClientRect();\r
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);\r
\r
    const tl = gsap.timeline({ defaults: animationDefaults });\r
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })\r
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })\r
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });\r
  };\r
\r
  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {\r
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;\r
    const rect = itemRef.current.getBoundingClientRect();\r
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);\r
\r
    const tl = gsap.timeline({ defaults: animationDefaults }) as TimelineMax;\r
    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }).to(marqueeInnerRef.current, {\r
      y: edge === 'top' ? '101%' : '-101%'\r
    });\r
  };\r
\r
  const repeatedMarqueeContent = React.useMemo(() => {\r
    return Array.from({ length: 4 }).map((_, idx) => (\r
      <React.Fragment key={idx}>\r
        <span className="text-[#060010] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">{text}</span>\r
        <div\r
          className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"\r
          style={{ backgroundImage: \`url(\${image})\` }}\r
        />\r
      </React.Fragment>\r
    ));\r
  }, [text, image]);\r
\r
  return (\r
    <div className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" ref={itemRef}>\r
      <a\r
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"\r
        href={link}\r
        onMouseEnter={handleMouseEnter}\r
        onMouseLeave={handleMouseLeave}\r
      >\r
        {text}\r
      </a>\r
      <div\r
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"\r
        ref={marqueeRef}\r
      >\r
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>\r
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">\r
            {repeatedMarqueeContent}\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default FlowingMenu;\r
\r
// Note: this is also needed\r
// /** @type {import('tailwindcss').Config} */\r
// export default {\r
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],\r
//   theme: {\r
//     extend: {\r
//       translate: {\r
//         '101': '101%',\r
//       },\r
//       keyframes: {\r
//         marquee: {\r
//           'from': { transform: 'translateX(0%)' },\r
//           'to': { transform: 'translateX(-50%)' }\r
//         }\r
//       },\r
//       animation: {\r
//         marquee: 'marquee 15s linear infinite'\r
//       }\r
//     }\r
//   },\r
//   plugins: [],\r
// };\r
`,L={dependencies:"gsap",usage:`import FlowingMenu from './FlowingMenu'

const demoItems = [
  { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
];

<div style={{ height: '600px', position: 'relative' }}>
  <FlowingMenu items={demoItems} />
</div>`,code:N,css:C,tailwind:j,tsCode:F,tsTailwind:X},A=()=>{const m=[{name:"items",type:"object[]",default:"[]",description:"An array of object scontaining: link, text, image."}],a=[{link:"#",text:"Mojave",image:"https://picsum.photos/600/400?random=1"},{link:"#",text:"Sonoma",image:"https://picsum.photos/600/400?random=2"},{link:"#",text:"Monterey",image:"https://picsum.photos/600/400?random=3"},{link:"#",text:"Sequoia",image:"https://picsum.photos/600/400?random=4"}];return e.jsxs(q,{children:[e.jsxs(y,{children:[e.jsx(M,{position:"relative",className:"demo-container",h:600,overflow:"hidden",px:0,pt:"100px",pb:"100px",children:e.jsx(I,{items:a})}),e.jsx(_,{data:m}),e.jsx(D,{dependencyList:["gsap"]})]}),e.jsx(b,{children:e.jsx(E,{codeObject:L})})]})};export{A as default};
