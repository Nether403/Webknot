import{r as l,j as t,B as N}from"./index-wsKSLPNH.js";import{T as z,P as D,a as S,C as j,b as O}from"./PropTable-C4uPWs8h.js";import{C as G}from"./Customize-1m_ZNqR9.js";import{P as T}from"./PreviewSlider-m1G_aiYP.js";import"./index-Bpz4cGEA.js";const H=({items:v,animationTime:x=600,particleCount:p=15,particleDistances:g=[90,10],particleR:y=100,timeVariance:b=300,colors:h=[1,2,3,1,2,3,1,4],initialActiveIndex:P=0})=>{const o=l.useRef(null),R=l.useRef(null),f=l.useRef(null),s=l.useRef(null),[d,$]=l.useState(P),m=(e=1)=>e/2-Math.random()*e,C=(e,r,n)=>{const a=(360+m(8))/n*r*(Math.PI/180);return[e*Math.cos(a),e*Math.sin(a)]},A=(e,r,n,a)=>{let i=m(a/10);return{start:C(n[0],p-e,p),end:C(n[1]+m(7),p-e,p),time:r,scale:1+m(.2),color:h[Math.floor(Math.random()*h.length)],rotate:i>0?(i+a/20)*10:(i-a/20)*10}},I=e=>{const r=g,n=y,a=x*2+b;e.style.setProperty("--time",`${a}ms`);for(let i=0;i<p;i++){const k=x*2+m(b*2),u=A(i,k,r,n);e.classList.remove("active"),setTimeout(()=>{const c=document.createElement("span"),w=document.createElement("span");c.classList.add("particle"),c.style.setProperty("--start-x",`${u.start[0]}px`),c.style.setProperty("--start-y",`${u.start[1]}px`),c.style.setProperty("--end-x",`${u.end[0]}px`),c.style.setProperty("--end-y",`${u.end[1]}px`),c.style.setProperty("--time",`${u.time}ms`),c.style.setProperty("--scale",`${u.scale}`),c.style.setProperty("--color",`var(--color-${u.color}, white)`),c.style.setProperty("--rotate",`${u.rotate}deg`),w.classList.add("point"),c.appendChild(w),e.appendChild(c),requestAnimationFrame(()=>{e.classList.add("active")}),setTimeout(()=>{try{e.removeChild(c)}catch{}},k)},30)}},E=e=>{if(!o.current||!f.current||!s.current)return;const r=o.current.getBoundingClientRect(),n=e.getBoundingClientRect(),a={left:`${n.x-r.x}px`,top:`${n.y-r.y}px`,width:`${n.width}px`,height:`${n.height}px`};Object.assign(f.current.style,a),Object.assign(s.current.style,a),s.current.innerText=e.innerText},L=(e,r)=>{const n=e.currentTarget;d!==r&&($(r),E(n),f.current&&f.current.querySelectorAll(".particle").forEach(i=>f.current.removeChild(i)),s.current&&(s.current.classList.remove("active"),s.current.offsetWidth,s.current.classList.add("active")),f.current&&I(f.current))},M=(e,r)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();const n=e.currentTarget.parentElement;n&&L({currentTarget:n},r)}};return l.useEffect(()=>{var n;if(!R.current||!o.current)return;const e=R.current.querySelectorAll("li")[d];e&&(E(e),(n=s.current)==null||n.classList.add("active"));const r=new ResizeObserver(()=>{var i;const a=(i=R.current)==null?void 0:i.querySelectorAll("li")[d];a&&E(a)});return r.observe(o.current),()=>r.disconnect()},[d]),t.jsxs("div",{className:"gooey-nav-container",ref:o,children:[t.jsx("nav",{children:t.jsx("ul",{ref:R,children:v.map((e,r)=>t.jsx("li",{className:d===r?"active":"",children:t.jsx("a",{href:e.href,onClick:n=>L(n,r),onKeyDown:n=>M(n,r),children:e.label})},r))})}),t.jsx("span",{className:"effect filter",ref:f}),t.jsx("span",{className:"effect text",ref:s})]})},q=`import { useRef, useEffect, useState } from 'react';\r
import './GooeyNav.css';\r
\r
const GooeyNav = ({\r
  items,\r
  animationTime = 600,\r
  particleCount = 15,\r
  particleDistances = [90, 10],\r
  particleR = 100,\r
  timeVariance = 300,\r
  colors = [1, 2, 3, 1, 2, 3, 1, 4],\r
  initialActiveIndex = 0\r
}) => {\r
  const containerRef = useRef(null);\r
  const navRef = useRef(null);\r
  const filterRef = useRef(null);\r
  const textRef = useRef(null);\r
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);\r
\r
  const noise = (n = 1) => n / 2 - Math.random() * n;\r
\r
  const getXY = (distance, pointIndex, totalPoints) => {\r
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);\r
    return [distance * Math.cos(angle), distance * Math.sin(angle)];\r
  };\r
\r
  const createParticle = (i, t, d, r) => {\r
    let rotate = noise(r / 10);\r
    return {\r
      start: getXY(d[0], particleCount - i, particleCount),\r
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),\r
      time: t,\r
      scale: 1 + noise(0.2),\r
      color: colors[Math.floor(Math.random() * colors.length)],\r
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10\r
    };\r
  };\r
\r
  const makeParticles = element => {\r
    const d = particleDistances;\r
    const r = particleR;\r
    const bubbleTime = animationTime * 2 + timeVariance;\r
    element.style.setProperty('--time', \`\${bubbleTime}ms\`);\r
\r
    for (let i = 0; i < particleCount; i++) {\r
      const t = animationTime * 2 + noise(timeVariance * 2);\r
      const p = createParticle(i, t, d, r);\r
      element.classList.remove('active');\r
\r
      setTimeout(() => {\r
        const particle = document.createElement('span');\r
        const point = document.createElement('span');\r
        particle.classList.add('particle');\r
        particle.style.setProperty('--start-x', \`\${p.start[0]}px\`);\r
        particle.style.setProperty('--start-y', \`\${p.start[1]}px\`);\r
        particle.style.setProperty('--end-x', \`\${p.end[0]}px\`);\r
        particle.style.setProperty('--end-y', \`\${p.end[1]}px\`);\r
        particle.style.setProperty('--time', \`\${p.time}ms\`);\r
        particle.style.setProperty('--scale', \`\${p.scale}\`);\r
        particle.style.setProperty('--color', \`var(--color-\${p.color}, white)\`);\r
        particle.style.setProperty('--rotate', \`\${p.rotate}deg\`);\r
\r
        point.classList.add('point');\r
        particle.appendChild(point);\r
        element.appendChild(particle);\r
        requestAnimationFrame(() => {\r
          element.classList.add('active');\r
        });\r
        setTimeout(() => {\r
          try {\r
            element.removeChild(particle);\r
          } catch {\r
            // Do nothing\r
          }\r
        }, t);\r
      }, 30);\r
    }\r
  };\r
\r
  const updateEffectPosition = element => {\r
    if (!containerRef.current || !filterRef.current || !textRef.current) return;\r
    const containerRect = containerRef.current.getBoundingClientRect();\r
    const pos = element.getBoundingClientRect();\r
\r
    const styles = {\r
      left: \`\${pos.x - containerRect.x}px\`,\r
      top: \`\${pos.y - containerRect.y}px\`,\r
      width: \`\${pos.width}px\`,\r
      height: \`\${pos.height}px\`\r
    };\r
    Object.assign(filterRef.current.style, styles);\r
    Object.assign(textRef.current.style, styles);\r
    textRef.current.innerText = element.innerText;\r
  };\r
\r
  const handleClick = (e, index) => {\r
    const liEl = e.currentTarget;\r
    if (activeIndex === index) return;\r
\r
    setActiveIndex(index);\r
    updateEffectPosition(liEl);\r
\r
    if (filterRef.current) {\r
      const particles = filterRef.current.querySelectorAll('.particle');\r
      particles.forEach(p => filterRef.current.removeChild(p));\r
    }\r
\r
    if (textRef.current) {\r
      textRef.current.classList.remove('active');\r
\r
      void textRef.current.offsetWidth;\r
      textRef.current.classList.add('active');\r
    }\r
\r
    if (filterRef.current) {\r
      makeParticles(filterRef.current);\r
    }\r
  };\r
\r
  const handleKeyDown = (e, index) => {\r
    if (e.key === 'Enter' || e.key === ' ') {\r
      e.preventDefault();\r
      const liEl = e.currentTarget.parentElement;\r
      if (liEl) {\r
        handleClick({ currentTarget: liEl }, index);\r
      }\r
    }\r
  };\r
\r
  useEffect(() => {\r
    if (!navRef.current || !containerRef.current) return;\r
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];\r
    if (activeLi) {\r
      updateEffectPosition(activeLi);\r
      textRef.current?.classList.add('active');\r
    }\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];\r
      if (currentActiveLi) {\r
        updateEffectPosition(currentActiveLi);\r
      }\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
    return () => resizeObserver.disconnect();\r
  }, [activeIndex]);\r
\r
  return (\r
    <div className="gooey-nav-container" ref={containerRef}>\r
      <nav>\r
        <ul ref={navRef}>\r
          {items.map((item, index) => (\r
            <li key={index} className={activeIndex === index ? 'active' : ''}>\r
              <a href={item.href} onClick={e => handleClick(e, index)} onKeyDown={e => handleKeyDown(e, index)}>\r
                {item.label}\r
              </a>\r
            </li>\r
          ))}\r
        </ul>\r
      </nav>\r
      <span className="effect filter" ref={filterRef} />\r
      <span className="effect text" ref={textRef} />\r
    </div>\r
  );\r
};\r
\r
export default GooeyNav;\r
`,V=`:root {\r
  --linear-ease: linear(\r
    0,\r
    0.068,\r
    0.19 2.7%,\r
    0.804 8.1%,\r
    1.037,\r
    1.199 13.2%,\r
    1.245,\r
    1.27 15.8%,\r
    1.274,\r
    1.272 17.4%,\r
    1.249 19.1%,\r
    0.996 28%,\r
    0.949,\r
    0.928 33.3%,\r
    0.926,\r
    0.933 36.8%,\r
    1.001 45.6%,\r
    1.013,\r
    1.019 50.8%,\r
    1.018 54.4%,\r
    1 63.1%,\r
    0.995 68%,\r
    1.001 85%,\r
    1\r
  );\r
}\r
\r
.gooey-nav-container {\r
  position: relative;\r
}\r
\r
.gooey-nav-container nav {\r
  display: flex;\r
  position: relative;\r
  transform: translate3d(0, 0, 0.01px);\r
}\r
\r
.gooey-nav-container nav ul {\r
  display: flex;\r
  gap: 2em;\r
  list-style: none;\r
  padding: 0 1em;\r
  margin: 0;\r
  position: relative;\r
  z-index: 3;\r
  color: white;\r
  text-shadow: 0 1px 1px hsl(205deg 30% 10% / 0.2);\r
}\r
\r
.gooey-nav-container nav ul li {\r
  border-radius: 100vw;\r
  position: relative;\r
  cursor: pointer;\r
  transition:\r
    background-color 0.3s ease,\r
    color 0.3s ease,\r
    box-shadow 0.3s ease;\r
  box-shadow: 0 0 0.5px 1.5px transparent;\r
  color: white;\r
}\r
\r
.gooey-nav-container nav ul li a {\r
  display: inline-block;\r
  padding: 0.6em 1em;\r
}\r
\r
.gooey-nav-container nav ul li:focus-within:has(:focus-visible) {\r
  box-shadow: 0 0 0.5px 1.5px white;\r
}\r
\r
.gooey-nav-container nav ul li::after {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  border-radius: 10px;\r
  background: white;\r
  opacity: 0;\r
  transform: scale(0);\r
  transition: all 0.3s ease;\r
  z-index: -1;\r
}\r
\r
.gooey-nav-container nav ul li.active {\r
  color: black;\r
  text-shadow: none;\r
}\r
\r
.gooey-nav-container nav ul li.active::after {\r
  opacity: 1;\r
  transform: scale(1);\r
}\r
\r
.gooey-nav-container .effect {\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  width: 0;\r
  height: 0;\r
  opacity: 1;\r
  pointer-events: none;\r
  display: grid;\r
  place-items: center;\r
  z-index: 1;\r
}\r
\r
.gooey-nav-container .effect.text {\r
  color: white;\r
  transition: color 0.3s ease;\r
}\r
\r
.gooey-nav-container .effect.text.active {\r
  color: black;\r
}\r
\r
.gooey-nav-container .effect.filter {\r
  filter: blur(7px) contrast(100) blur(0);\r
  mix-blend-mode: lighten;\r
}\r
\r
.gooey-nav-container .effect.filter::before {\r
  content: '';\r
  position: absolute;\r
  inset: -75px;\r
  z-index: -2;\r
  background: black;\r
}\r
\r
.gooey-nav-container .effect.filter::after {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  background: white;\r
  transform: scale(0);\r
  opacity: 0;\r
  z-index: -1;\r
  border-radius: 100vw;\r
}\r
\r
.gooey-nav-container .effect.active::after {\r
  animation: pill 0.3s ease both;\r
}\r
\r
@keyframes pill {\r
  to {\r
    transform: scale(1);\r
    opacity: 1;\r
  }\r
}\r
\r
.particle,\r
.point {\r
  display: block;\r
  opacity: 0;\r
  width: 20px;\r
  height: 20px;\r
  border-radius: 100%;\r
  transform-origin: center;\r
}\r
\r
.particle {\r
  --time: 5s;\r
  position: absolute;\r
  top: calc(50% - 8px);\r
  left: calc(50% - 8px);\r
  animation: particle calc(var(--time)) ease 1 -350ms;\r
}\r
\r
.point {\r
  background: var(--color);\r
  opacity: 1;\r
  animation: point calc(var(--time)) ease 1 -350ms;\r
}\r
\r
@keyframes particle {\r
  0% {\r
    transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));\r
    opacity: 1;\r
    animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);\r
  }\r
\r
  70% {\r
    transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));\r
    opacity: 1;\r
    animation-timing-function: ease;\r
  }\r
\r
  85% {\r
    transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));\r
    opacity: 1;\r
  }\r
}\r
\r
@keyframes point {\r
  0% {\r
    transform: scale(0);\r
    opacity: 0;\r
    animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);\r
  }\r
\r
  25% {\r
    transform: scale(calc(var(--scale) * 0.25));\r
  }\r
\r
  38% {\r
    opacity: 1;\r
  }\r
\r
  65% {\r
    transform: scale(var(--scale));\r
    opacity: 1;\r
    animation-timing-function: ease;\r
  }\r
\r
  85% {\r
    transform: scale(var(--scale));\r
    opacity: 1;\r
  }\r
\r
  100% {\r
    transform: scale(0);\r
    opacity: 0;\r
  }\r
}\r
`,K=`import { useRef, useEffect, useState } from 'react';\r
\r
const GooeyNav = ({\r
  items,\r
  animationTime = 600,\r
  particleCount = 15,\r
  particleDistances = [90, 10],\r
  particleR = 100,\r
  timeVariance = 300,\r
  colors = [1, 2, 3, 1, 2, 3, 1, 4],\r
  initialActiveIndex = 0\r
}) => {\r
  const containerRef = useRef(null);\r
  const navRef = useRef(null);\r
  const filterRef = useRef(null);\r
  const textRef = useRef(null);\r
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);\r
\r
  const noise = (n = 1) => n / 2 - Math.random() * n;\r
  const getXY = (distance, pointIndex, totalPoints) => {\r
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);\r
    return [distance * Math.cos(angle), distance * Math.sin(angle)];\r
  };\r
  const createParticle = (i, t, d, r) => {\r
    let rotate = noise(r / 10);\r
    return {\r
      start: getXY(d[0], particleCount - i, particleCount),\r
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),\r
      time: t,\r
      scale: 1 + noise(0.2),\r
      color: colors[Math.floor(Math.random() * colors.length)],\r
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10\r
    };\r
  };\r
  const makeParticles = element => {\r
    const d = particleDistances;\r
    const r = particleR;\r
    const bubbleTime = animationTime * 2 + timeVariance;\r
    element.style.setProperty('--time', \`\${bubbleTime}ms\`);\r
    for (let i = 0; i < particleCount; i++) {\r
      const t = animationTime * 2 + noise(timeVariance * 2);\r
      const p = createParticle(i, t, d, r);\r
      element.classList.remove('active');\r
      setTimeout(() => {\r
        const particle = document.createElement('span');\r
        const point = document.createElement('span');\r
        particle.classList.add('particle');\r
        particle.style.setProperty('--start-x', \`\${p.start[0]}px\`);\r
        particle.style.setProperty('--start-y', \`\${p.start[1]}px\`);\r
        particle.style.setProperty('--end-x', \`\${p.end[0]}px\`);\r
        particle.style.setProperty('--end-y', \`\${p.end[1]}px\`);\r
        particle.style.setProperty('--time', \`\${p.time}ms\`);\r
        particle.style.setProperty('--scale', \`\${p.scale}\`);\r
        particle.style.setProperty('--color', \`var(--color-\${p.color}, white)\`);\r
        particle.style.setProperty('--rotate', \`\${p.rotate}deg\`);\r
        point.classList.add('point');\r
        particle.appendChild(point);\r
        element.appendChild(particle);\r
        requestAnimationFrame(() => {\r
          element.classList.add('active');\r
        });\r
        setTimeout(() => {\r
          try {\r
            element.removeChild(particle);\r
          } catch {\r
            // do nothing\r
          }\r
        }, t);\r
      }, 30);\r
    }\r
  };\r
  const updateEffectPosition = element => {\r
    if (!containerRef.current || !filterRef.current || !textRef.current) return;\r
    const containerRect = containerRef.current.getBoundingClientRect();\r
    const pos = element.getBoundingClientRect();\r
    const styles = {\r
      left: \`\${pos.x - containerRect.x}px\`,\r
      top: \`\${pos.y - containerRect.y}px\`,\r
      width: \`\${pos.width}px\`,\r
      height: \`\${pos.height}px\`\r
    };\r
    Object.assign(filterRef.current.style, styles);\r
    Object.assign(textRef.current.style, styles);\r
    textRef.current.innerText = element.innerText;\r
  };\r
  const handleClick = (e, index) => {\r
    const liEl = e.currentTarget;\r
    if (activeIndex === index) return;\r
    setActiveIndex(index);\r
    updateEffectPosition(liEl);\r
    if (filterRef.current) {\r
      const particles = filterRef.current.querySelectorAll('.particle');\r
      particles.forEach(p => filterRef.current.removeChild(p));\r
    }\r
    if (textRef.current) {\r
      textRef.current.classList.remove('active');\r
      void textRef.current.offsetWidth;\r
      textRef.current.classList.add('active');\r
    }\r
    if (filterRef.current) {\r
      makeParticles(filterRef.current);\r
    }\r
  };\r
  const handleKeyDown = (e, index) => {\r
    if (e.key === 'Enter' || e.key === ' ') {\r
      e.preventDefault();\r
      const liEl = e.currentTarget.parentElement;\r
      if (liEl) {\r
        handleClick({ currentTarget: liEl }, index);\r
      }\r
    }\r
  };\r
  useEffect(() => {\r
    if (!navRef.current || !containerRef.current) return;\r
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];\r
    if (activeLi) {\r
      updateEffectPosition(activeLi);\r
      textRef.current?.classList.add('active');\r
    }\r
    const resizeObserver = new ResizeObserver(() => {\r
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];\r
      if (currentActiveLi) {\r
        updateEffectPosition(currentActiveLi);\r
      }\r
    });\r
    resizeObserver.observe(containerRef.current);\r
    return () => resizeObserver.disconnect();\r
  }, [activeIndex]);\r
\r
  return (\r
    <>\r
      {/* This effect is quite difficult to recreate faithfully using Tailwind, so a style tag is a necessary workaround */}\r
      <style>\r
        {\`\r
          :root {\r
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);\r
          }\r
          .effect {\r
            position: absolute;\r
            opacity: 1;\r
            pointer-events: none;\r
            display: grid;\r
            place-items: center;\r
            z-index: 1;\r
          }\r
          .effect.text {\r
            color: white;\r
            transition: color 0.3s ease;\r
          }\r
          .effect.text.active {\r
            color: black;\r
          }\r
          .effect.filter {\r
            filter: blur(7px) contrast(100) blur(0);\r
            mix-blend-mode: lighten;\r
          }\r
          .effect.filter::before {\r
            content: "";\r
            position: absolute;\r
            inset: -75px;\r
            z-index: -2;\r
            background: black;\r
          }\r
          .effect.filter::after {\r
            content: "";\r
            position: absolute;\r
            inset: 0;\r
            background: white;\r
            transform: scale(0);\r
            opacity: 0;\r
            z-index: -1;\r
            border-radius: 9999px;\r
          }\r
          .effect.active::after {\r
            animation: pill 0.3s ease both;\r
          }\r
          @keyframes pill {\r
            to {\r
              transform: scale(1);\r
              opacity: 1;\r
            }\r
          }\r
          .particle,\r
          .point {\r
            display: block;\r
            opacity: 0;\r
            width: 20px;\r
            height: 20px;\r
            border-radius: 9999px;\r
            transform-origin: center;\r
          }\r
          .particle {\r
            --time: 5s;\r
            position: absolute;\r
            top: calc(50% - 8px);\r
            left: calc(50% - 8px);\r
            animation: particle calc(var(--time)) ease 1 -350ms;\r
          }\r
          .point {\r
            background: var(--color);\r
            opacity: 1;\r
            animation: point calc(var(--time)) ease 1 -350ms;\r
          }\r
          @keyframes particle {\r
            0% {\r
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));\r
              opacity: 1;\r
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);\r
            }\r
            70% {\r
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));\r
              opacity: 1;\r
              animation-timing-function: ease;\r
            }\r
            85% {\r
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));\r
              opacity: 1;\r
            }\r
            100% {\r
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));\r
              opacity: 1;\r
            }\r
          }\r
          @keyframes point {\r
            0% {\r
              transform: scale(0);\r
              opacity: 0;\r
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);\r
            }\r
            25% {\r
              transform: scale(calc(var(--scale) * 0.25));\r
            }\r
            38% {\r
              opacity: 1;\r
            }\r
            65% {\r
              transform: scale(var(--scale));\r
              opacity: 1;\r
              animation-timing-function: ease;\r
            }\r
            85% {\r
              transform: scale(var(--scale));\r
              opacity: 1;\r
            }\r
            100% {\r
              transform: scale(0);\r
              opacity: 0;\r
            }\r
          }\r
          li.active {\r
            color: black;\r
            text-shadow: none;\r
          }\r
          li.active::after {\r
            opacity: 1;\r
            transform: scale(1);\r
          }\r
          li::after {\r
            content: "";\r
            position: absolute;\r
            inset: 0;\r
            border-radius: 8px;\r
            background: white;\r
            opacity: 0;\r
            transform: scale(0);\r
            transition: all 0.3s ease;\r
            z-index: -1;\r
          }\r
        \`}\r
      </style>\r
      <div className="relative" ref={containerRef}>\r
        <nav className="flex relative" style={{ transform: 'translate3d(0,0,0.01px)' }}>\r
          <ul\r
            ref={navRef}\r
            className="flex gap-8 list-none p-0 px-4 m-0 relative z-[3]"\r
            style={{\r
              color: 'white',\r
              textShadow: '0 1px 1px hsl(205deg 30% 10% / 0.2)'\r
            }}\r
          >\r
            {items.map((item, index) => (\r
              <li\r
                key={index}\r
                className={\`rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white \${\r
                  activeIndex === index ? 'active' : ''\r
                }\`}\r
              >\r
                <a\r
                  onClick={e => handleClick(e, index)}\r
                  href={item.href}\r
                  onKeyDown={e => handleKeyDown(e, index)}\r
                  className="outline-none py-[0.6em] px-[1em] inline-block"\r
                >\r
                  {item.label}\r
                </a>\r
              </li>\r
            ))}\r
          </ul>\r
        </nav>\r
        <span className="effect filter" ref={filterRef} />\r
        <span className="effect text" ref={textRef} />\r
      </div>\r
    </>\r
  );\r
};\r
\r
export default GooeyNav;\r
`,X=`import React, { useRef, useEffect, useState } from 'react';\r
import './GooeyNav.css';\r
\r
interface GooeyNavItem {\r
  label: string;\r
  href: string;\r
}\r
\r
export interface GooeyNavProps {\r
  items: GooeyNavItem[];\r
  animationTime?: number;\r
  particleCount?: number;\r
  particleDistances?: [number, number];\r
  particleR?: number;\r
  timeVariance?: number;\r
  colors?: number[];\r
  initialActiveIndex?: number;\r
}\r
\r
const GooeyNav: React.FC<GooeyNavProps> = ({\r
  items,\r
  animationTime = 600,\r
  particleCount = 15,\r
  particleDistances = [90, 10],\r
  particleR = 100,\r
  timeVariance = 300,\r
  colors = [1, 2, 3, 1, 2, 3, 1, 4],\r
  initialActiveIndex = 0\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const navRef = useRef<HTMLUListElement>(null);\r
  const filterRef = useRef<HTMLSpanElement>(null);\r
  const textRef = useRef<HTMLSpanElement>(null);\r
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);\r
\r
  const noise = (n = 1) => n / 2 - Math.random() * n;\r
\r
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {\r
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);\r
    return [distance * Math.cos(angle), distance * Math.sin(angle)];\r
  };\r
\r
  const createParticle = (i: number, t: number, d: [number, number], r: number) => {\r
    let rotate = noise(r / 10);\r
    return {\r
      start: getXY(d[0], particleCount - i, particleCount),\r
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),\r
      time: t,\r
      scale: 1 + noise(0.2),\r
      color: colors[Math.floor(Math.random() * colors.length)],\r
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10\r
    };\r
  };\r
\r
  const makeParticles = (element: HTMLElement) => {\r
    const d: [number, number] = particleDistances;\r
    const r = particleR;\r
    const bubbleTime = animationTime * 2 + timeVariance;\r
    element.style.setProperty('--time', \`\${bubbleTime}ms\`);\r
\r
    for (let i = 0; i < particleCount; i++) {\r
      const t = animationTime * 2 + noise(timeVariance * 2);\r
      const p = createParticle(i, t, d, r);\r
      element.classList.remove('active');\r
\r
      setTimeout(() => {\r
        const particle = document.createElement('span');\r
        const point = document.createElement('span');\r
        particle.classList.add('particle');\r
        particle.style.setProperty('--start-x', \`\${p.start[0]}px\`);\r
        particle.style.setProperty('--start-y', \`\${p.start[1]}px\`);\r
        particle.style.setProperty('--end-x', \`\${p.end[0]}px\`);\r
        particle.style.setProperty('--end-y', \`\${p.end[1]}px\`);\r
        particle.style.setProperty('--time', \`\${p.time}ms\`);\r
        particle.style.setProperty('--scale', \`\${p.scale}\`);\r
        particle.style.setProperty('--color', \`var(--color-\${p.color}, white)\`);\r
        particle.style.setProperty('--rotate', \`\${p.rotate}deg\`);\r
\r
        point.classList.add('point');\r
        particle.appendChild(point);\r
        element.appendChild(particle);\r
        requestAnimationFrame(() => {\r
          element.classList.add('active');\r
        });\r
        setTimeout(() => {\r
          try {\r
            element.removeChild(particle);\r
          } catch {\r
            // Do nothing\r
          }\r
        }, t);\r
      }, 30);\r
    }\r
  };\r
\r
  const updateEffectPosition = (element: HTMLElement) => {\r
    if (!containerRef.current || !filterRef.current || !textRef.current) return;\r
    const containerRect = containerRef.current.getBoundingClientRect();\r
    const pos = element.getBoundingClientRect();\r
\r
    const styles = {\r
      left: \`\${pos.x - containerRect.x}px\`,\r
      top: \`\${pos.y - containerRect.y}px\`,\r
      width: \`\${pos.width}px\`,\r
      height: \`\${pos.height}px\`\r
    };\r
    Object.assign(filterRef.current.style, styles);\r
    Object.assign(textRef.current.style, styles);\r
    textRef.current.innerText = element.innerText;\r
  };\r
\r
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {\r
    const liEl = e.currentTarget;\r
    if (activeIndex === index) return;\r
\r
    setActiveIndex(index);\r
    updateEffectPosition(liEl);\r
\r
    if (filterRef.current) {\r
      const particles = filterRef.current.querySelectorAll('.particle');\r
      particles.forEach(p => filterRef.current!.removeChild(p));\r
    }\r
\r
    if (textRef.current) {\r
      textRef.current.classList.remove('active');\r
\r
      void textRef.current.offsetWidth;\r
      textRef.current.classList.add('active');\r
    }\r
\r
    if (filterRef.current) {\r
      makeParticles(filterRef.current);\r
    }\r
  };\r
\r
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {\r
    if (e.key === 'Enter' || e.key === ' ') {\r
      e.preventDefault();\r
      const liEl = e.currentTarget.parentElement;\r
      if (liEl) {\r
        handleClick(\r
          {\r
            currentTarget: liEl\r
          } as React.MouseEvent<HTMLAnchorElement>,\r
          index\r
        );\r
      }\r
    }\r
  };\r
\r
  useEffect(() => {\r
    if (!navRef.current || !containerRef.current) return;\r
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement;\r
    if (activeLi) {\r
      updateEffectPosition(activeLi);\r
      textRef.current?.classList.add('active');\r
    }\r
\r
    const resizeObserver = new ResizeObserver(() => {\r
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;\r
      if (currentActiveLi) {\r
        updateEffectPosition(currentActiveLi);\r
      }\r
    });\r
\r
    resizeObserver.observe(containerRef.current);\r
    return () => resizeObserver.disconnect();\r
  }, [activeIndex]);\r
\r
  return (\r
    <div className="gooey-nav-container" ref={containerRef}>\r
      <nav>\r
        <ul ref={navRef}>\r
          {items.map((item, index) => (\r
            <li key={index} className={activeIndex === index ? 'active' : ''}>\r
              <a href={item.href} onClick={e => handleClick(e, index)} onKeyDown={e => handleKeyDown(e, index)}>\r
                {item.label}\r
              </a>\r
            </li>\r
          ))}\r
        </ul>\r
      </nav>\r
      <span className="effect filter" ref={filterRef} />\r
      <span className="effect text" ref={textRef} />\r
    </div>\r
  );\r
};\r
\r
export default GooeyNav;\r
`,Y=`import React, { useRef, useEffect, useState } from 'react';\r
\r
interface GooeyNavItem {\r
  label: string;\r
  href: string;\r
}\r
\r
export interface GooeyNavProps {\r
  items: GooeyNavItem[];\r
  animationTime?: number;\r
  particleCount?: number;\r
  particleDistances?: [number, number];\r
  particleR?: number;\r
  timeVariance?: number;\r
  colors?: number[];\r
  initialActiveIndex?: number;\r
}\r
\r
const GooeyNav: React.FC<GooeyNavProps> = ({\r
  items,\r
  animationTime = 600,\r
  particleCount = 15,\r
  particleDistances = [90, 10],\r
  particleR = 100,\r
  timeVariance = 300,\r
  colors = [1, 2, 3, 1, 2, 3, 1, 4],\r
  initialActiveIndex = 0\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const navRef = useRef<HTMLUListElement>(null);\r
  const filterRef = useRef<HTMLSpanElement>(null);\r
  const textRef = useRef<HTMLSpanElement>(null);\r
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);\r
\r
  const noise = (n = 1) => n / 2 - Math.random() * n;\r
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {\r
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);\r
    return [distance * Math.cos(angle), distance * Math.sin(angle)];\r
  };\r
  const createParticle = (i: number, t: number, d: [number, number], r: number) => {\r
    let rotate = noise(r / 10);\r
    return {\r
      start: getXY(d[0], particleCount - i, particleCount),\r
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),\r
      time: t,\r
      scale: 1 + noise(0.2),\r
      color: colors[Math.floor(Math.random() * colors.length)],\r
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10\r
    };\r
  };\r
  const makeParticles = (element: HTMLElement) => {\r
    const d: [number, number] = particleDistances;\r
    const r = particleR;\r
    const bubbleTime = animationTime * 2 + timeVariance;\r
    element.style.setProperty('--time', \`\${bubbleTime}ms\`);\r
    for (let i = 0; i < particleCount; i++) {\r
      const t = animationTime * 2 + noise(timeVariance * 2);\r
      const p = createParticle(i, t, d, r);\r
      element.classList.remove('active');\r
      setTimeout(() => {\r
        const particle = document.createElement('span');\r
        const point = document.createElement('span');\r
        particle.classList.add('particle');\r
        particle.style.setProperty('--start-x', \`\${p.start[0]}px\`);\r
        particle.style.setProperty('--start-y', \`\${p.start[1]}px\`);\r
        particle.style.setProperty('--end-x', \`\${p.end[0]}px\`);\r
        particle.style.setProperty('--end-y', \`\${p.end[1]}px\`);\r
        particle.style.setProperty('--time', \`\${p.time}ms\`);\r
        particle.style.setProperty('--scale', \`\${p.scale}\`);\r
        particle.style.setProperty('--color', \`var(--color-\${p.color}, white)\`);\r
        particle.style.setProperty('--rotate', \`\${p.rotate}deg\`);\r
        point.classList.add('point');\r
        particle.appendChild(point);\r
        element.appendChild(particle);\r
        requestAnimationFrame(() => {\r
          element.classList.add('active');\r
        });\r
        setTimeout(() => {\r
          try {\r
            element.removeChild(particle);\r
          } catch {}\r
        }, t);\r
      }, 30);\r
    }\r
  };\r
  const updateEffectPosition = (element: HTMLElement) => {\r
    if (!containerRef.current || !filterRef.current || !textRef.current) return;\r
    const containerRect = containerRef.current.getBoundingClientRect();\r
    const pos = element.getBoundingClientRect();\r
    const styles = {\r
      left: \`\${pos.x - containerRect.x}px\`,\r
      top: \`\${pos.y - containerRect.y}px\`,\r
      width: \`\${pos.width}px\`,\r
      height: \`\${pos.height}px\`\r
    };\r
    Object.assign(filterRef.current.style, styles);\r
    Object.assign(textRef.current.style, styles);\r
    textRef.current.innerText = element.innerText;\r
  };\r
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {\r
    const liEl = e.currentTarget;\r
    if (activeIndex === index) return;\r
    setActiveIndex(index);\r
    updateEffectPosition(liEl);\r
    if (filterRef.current) {\r
      const particles = filterRef.current.querySelectorAll('.particle');\r
      particles.forEach(p => filterRef.current!.removeChild(p));\r
    }\r
    if (textRef.current) {\r
      textRef.current.classList.remove('active');\r
      void textRef.current.offsetWidth;\r
      textRef.current.classList.add('active');\r
    }\r
    if (filterRef.current) {\r
      makeParticles(filterRef.current);\r
    }\r
  };\r
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {\r
    if (e.key === 'Enter' || e.key === ' ') {\r
      e.preventDefault();\r
      const liEl = e.currentTarget.parentElement;\r
      if (liEl) {\r
        handleClick(\r
          {\r
            currentTarget: liEl\r
          } as React.MouseEvent<HTMLAnchorElement>,\r
          index\r
        );\r
      }\r
    }\r
  };\r
  useEffect(() => {\r
    if (!navRef.current || !containerRef.current) return;\r
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement;\r
    if (activeLi) {\r
      updateEffectPosition(activeLi);\r
      textRef.current?.classList.add('active');\r
    }\r
    const resizeObserver = new ResizeObserver(() => {\r
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;\r
      if (currentActiveLi) {\r
        updateEffectPosition(currentActiveLi);\r
      }\r
    });\r
    resizeObserver.observe(containerRef.current);\r
    return () => resizeObserver.disconnect();\r
  }, [activeIndex]);\r
\r
  return (\r
    <>\r
      {/* This effect is quite difficult to recreate faithfully using Tailwind, so a style tag is a necessary workaround */}\r
      <style>\r
        {\`\r
          :root {\r
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);\r
          }\r
          .effect {\r
            position: absolute;\r
            opacity: 1;\r
            pointer-events: none;\r
            display: grid;\r
            place-items: center;\r
            z-index: 1;\r
          }\r
          .effect.text {\r
            color: white;\r
            transition: color 0.3s ease;\r
          }\r
          .effect.text.active {\r
            color: black;\r
          }\r
          .effect.filter {\r
            filter: blur(7px) contrast(100) blur(0);\r
            mix-blend-mode: lighten;\r
          }\r
          .effect.filter::before {\r
            content: "";\r
            position: absolute;\r
            inset: -75px;\r
            z-index: -2;\r
            background: black;\r
          }\r
          .effect.filter::after {\r
            content: "";\r
            position: absolute;\r
            inset: 0;\r
            background: white;\r
            transform: scale(0);\r
            opacity: 0;\r
            z-index: -1;\r
            border-radius: 9999px;\r
          }\r
          .effect.active::after {\r
            animation: pill 0.3s ease both;\r
          }\r
          @keyframes pill {\r
            to {\r
              transform: scale(1);\r
              opacity: 1;\r
            }\r
          }\r
          .particle,\r
          .point {\r
            display: block;\r
            opacity: 0;\r
            width: 20px;\r
            height: 20px;\r
            border-radius: 9999px;\r
            transform-origin: center;\r
          }\r
          .particle {\r
            --time: 5s;\r
            position: absolute;\r
            top: calc(50% - 8px);\r
            left: calc(50% - 8px);\r
            animation: particle calc(var(--time)) ease 1 -350ms;\r
          }\r
          .point {\r
            background: var(--color);\r
            opacity: 1;\r
            animation: point calc(var(--time)) ease 1 -350ms;\r
          }\r
          @keyframes particle {\r
            0% {\r
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));\r
              opacity: 1;\r
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);\r
            }\r
            70% {\r
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));\r
              opacity: 1;\r
              animation-timing-function: ease;\r
            }\r
            85% {\r
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));\r
              opacity: 1;\r
            }\r
            100% {\r
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));\r
              opacity: 1;\r
            }\r
          }\r
          @keyframes point {\r
            0% {\r
              transform: scale(0);\r
              opacity: 0;\r
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);\r
            }\r
            25% {\r
              transform: scale(calc(var(--scale) * 0.25));\r
            }\r
            38% {\r
              opacity: 1;\r
            }\r
            65% {\r
              transform: scale(var(--scale));\r
              opacity: 1;\r
              animation-timing-function: ease;\r
            }\r
            85% {\r
              transform: scale(var(--scale));\r
              opacity: 1;\r
            }\r
            100% {\r
              transform: scale(0);\r
              opacity: 0;\r
            }\r
          }\r
          li.active {\r
            color: black;\r
            text-shadow: none;\r
          }\r
          li.active::after {\r
            opacity: 1;\r
            transform: scale(1);\r
          }\r
          li::after {\r
            content: "";\r
            position: absolute;\r
            inset: 0;\r
            border-radius: 8px;\r
            background: white;\r
            opacity: 0;\r
            transform: scale(0);\r
            transition: all 0.3s ease;\r
            z-index: -1;\r
          }\r
        \`}\r
      </style>\r
      <div className="relative" ref={containerRef}>\r
        <nav className="flex relative" style={{ transform: 'translate3d(0,0,0.01px)' }}>\r
          <ul\r
            ref={navRef}\r
            className="flex gap-8 list-none p-0 px-4 m-0 relative z-[3]"\r
            style={{\r
              color: 'white',\r
              textShadow: '0 1px 1px hsl(205deg 30% 10% / 0.2)'\r
            }}\r
          >\r
            {items.map((item, index) => (\r
              <li\r
                key={index}\r
                className={\`rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white \${\r
                  activeIndex === index ? 'active' : ''\r
                }\`}\r
              >\r
                <a\r
                  href={item.href}\r
                  onClick={e => handleClick(e, index)}\r
                  onKeyDown={e => handleKeyDown(e, index)}\r
                  className="outline-none py-[0.6em] px-[1em] inline-block"\r
                >\r
                  {item.label}\r
                </a>\r
              </li>\r
            ))}\r
          </ul>\r
        </nav>\r
        <span className="effect filter" ref={filterRef} />\r
        <span className="effect text" ref={textRef} />\r
      </div>\r
    </>\r
  );\r
};\r
\r
export default GooeyNav;\r
`,B={usage:`import GooeyNav from './GooeyNav'

// update with your own items
const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

<div style={{ height: '600px', position: 'relative' }}>
  <GooeyNav
    items={items}
    particleCount={15}
    particleDistances={[90, 10]}
    particleR={100}
    initialActiveIndex={0}
    animationTime={600}
    timeVariance={300}
    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
  />
</div>`,code:q,css:V,tailwind:K,tsCode:X,tsTailwind:Y},Q=()=>{const[v,x]=l.useState(15),[p,g]=l.useState(300),[y,b]=l.useState(100),h=[{name:"items",type:"GooeyNavItem[]",default:"[]",description:"Array of navigation items."},{name:"animationTime",type:"number",default:"600",description:"Duration (ms) of the main animation."},{name:"particleCount",type:"number",default:"15",description:"Number of bubble particles per transition."},{name:"particleDistances",type:"[number, number]",default:"[90, 10]",description:"Outer and inner distances of bubble spread."},{name:"particleR",type:"number",default:"100",description:"Radius factor influencing random particle rotation."},{name:"timeVariance",type:"number",default:"300",description:"Random time variance (ms) for particle animations."},{name:"colors",type:"number[]",default:"[1, 2, 3, 1, 2, 3, 1, 4]",description:"Color indices used when creating bubble particles."},{name:"initialActiveIndex",type:"number",default:"0",description:"Which item is selected on mount."}],P=[{label:"Home",href:null},{label:"About",href:null},{label:"Contact",href:null}];return t.jsxs(z,{children:[t.jsxs(D,{children:[t.jsx(N,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:t.jsx(H,{items:P,animationTime:500,particleCount:v,particleDistances:[90,0],particleR:y,timeVariance:p,initialActiveIndex:0})}),t.jsxs(G,{children:[t.jsx(T,{title:"Particle Count",min:1,max:50,step:1,value:v,onChange:o=>{x(o)}}),t.jsx(T,{title:"Animation Variance",min:0,max:2e3,step:100,value:p,onChange:o=>{g(o)}}),t.jsx(T,{title:"Radius Factor",min:0,max:1e3,step:100,value:y,onChange:o=>{b(o)}})]}),t.jsx(S,{data:h})]}),t.jsx(j,{children:t.jsx(O,{codeObject:B})})]})};export{Q as default};
