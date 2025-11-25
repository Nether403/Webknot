import{r as l,g as i,j as e,B as z,F as j,T as R,d as E}from"./index-wsKSLPNH.js";import{T as I,P,a as _,C as F,b as H}from"./PropTable-C4uPWs8h.js";import{C as $}from"./Customize-1m_ZNqR9.js";import{P as W}from"./PreviewSelect-B8u33nUa.js";import{P as D}from"./PreviewSlider-m1G_aiYP.js";import{D as U}from"./Dependencies-BHoMfJUj.js";import{l as Y}from"./reactbits-gh-black-CUrwi4wC.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const G=[{label:"home",href:"#",ariaLabel:"Home",rotation:-8,hoverStyles:{bgColor:"#3b82f6",textColor:"#ffffff"}},{label:"about",href:"#",ariaLabel:"About",rotation:8,hoverStyles:{bgColor:"#10b981",textColor:"#ffffff"}},{label:"projects",href:"#",ariaLabel:"Documentation",rotation:8,hoverStyles:{bgColor:"#f59e0b",textColor:"#ffffff"}},{label:"blog",href:"#",ariaLabel:"Blog",rotation:8,hoverStyles:{bgColor:"#ef4444",textColor:"#ffffff"}},{label:"contact",href:"#",ariaLabel:"Contact",rotation:-8,hoverStyles:{bgColor:"#8b5cf6",textColor:"#ffffff"}}];function J({logo:m,onMenuClick:c,className:g,style:C,menuAriaLabel:d="Toggle menu",menuBg:p="#fff",menuContentColor:s="#111",useFixedPosition:h=!1,items:b,animationEase:x="back.out(1.5)",animationDuration:f=.5,staggerDelay:v=.12}){const[n,B]=l.useState(!1),[S,O]=l.useState(!1),L=l.useRef(null),k=l.useRef([]),N=l.useRef([]),M=b!=null&&b.length?b:G,T=["bubble-menu",h?"fixed":"absolute",g].filter(Boolean).join(" "),A=()=>{const r=!n;r&&O(!0),B(r),c==null||c(r)};return l.useEffect(()=>{const r=L.current,t=k.current.filter(Boolean),o=N.current.filter(Boolean);!r||!t.length||(n?(i.set(r,{display:"flex"}),i.killTweensOf([...t,...o]),i.set(t,{scale:0,transformOrigin:"50% 50%"}),i.set(o,{y:24,autoAlpha:0}),t.forEach((u,a)=>{const y=a*v+i.utils.random(-.05,.05),w=i.timeline({delay:y});w.to(u,{scale:1,duration:f,ease:x}),o[a]&&w.to(o[a],{y:0,autoAlpha:1,duration:f,ease:"power3.out"},`-=${f*.9}`)})):S&&(i.killTweensOf([...t,...o]),i.to(o,{y:24,autoAlpha:0,duration:.2,ease:"power3.in"}),i.to(t,{scale:0,duration:.2,ease:"power3.in",onComplete:()=>{i.set(r,{display:"none"}),O(!1)}})))},[n,S,x,f,v]),l.useEffect(()=>{const r=()=>{if(n){const t=k.current.filter(Boolean),o=window.innerWidth>=900;t.forEach((u,a)=>{const y=M[a];if(u&&y){const w=o?y.rotation??0:0;i.set(u,{rotation:w})}})}};return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[n,M]),e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:T,style:C,"aria-label":"Main navigation",children:[e.jsx("div",{className:"bubble logo-bubble","aria-label":"Logo",style:{background:p},children:e.jsx("span",{className:"logo-content",children:typeof m=="string"?e.jsx("img",{src:m,alt:"Logo",className:"bubble-logo"}):m})}),e.jsxs("button",{type:"button",className:`bubble toggle-bubble menu-btn ${n?"open":""}`,onClick:A,"aria-label":d,"aria-pressed":n,style:{background:p},children:[e.jsx("span",{className:"menu-line",style:{background:s}}),e.jsx("span",{className:"menu-line short",style:{background:s}})]})]}),S&&e.jsx("div",{ref:L,className:`bubble-menu-items ${h?"fixed":"absolute"}`,"aria-hidden":!n,children:e.jsx("ul",{className:"pill-list",role:"menu","aria-label":"Menu links",children:M.map((r,t)=>{var o,u;return e.jsx("li",{role:"none",className:"pill-col",children:e.jsx("a",{role:"menuitem",href:r.href,"aria-label":r.ariaLabel||r.label,className:"pill-link",style:{"--item-rot":`${r.rotation??0}deg`,"--pill-bg":p,"--pill-color":s,"--hover-bg":((o=r.hoverStyles)==null?void 0:o.bgColor)||"#f3f4f6","--hover-color":((u=r.hoverStyles)==null?void 0:u.textColor)||s},ref:a=>{a&&(k.current[t]=a)},children:e.jsx("span",{className:"pill-label",ref:a=>{a&&(N.current[t]=a)},children:r.label})})},t)})})})]})}const X=`import { useState, useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
\r
import './BubbleMenu.css';\r
\r
const DEFAULT_ITEMS = [\r
  {\r
    label: 'home',\r
    href: '#',\r
    ariaLabel: 'Home',\r
    rotation: -8,\r
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'about',\r
    href: '#',\r
    ariaLabel: 'About',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'projects',\r
    href: '#',\r
    ariaLabel: 'Documentation',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'blog',\r
    href: '#',\r
    ariaLabel: 'Blog',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'contact',\r
    href: '#',\r
    ariaLabel: 'Contact',\r
    rotation: -8,\r
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }\r
  }\r
];\r
\r
export default function BubbleMenu({\r
  logo,\r
  onMenuClick,\r
  className,\r
  style,\r
  menuAriaLabel = 'Toggle menu',\r
  menuBg = '#fff',\r
  menuContentColor = '#111',\r
  useFixedPosition = false,\r
  items,\r
  animationEase = 'back.out(1.5)',\r
  animationDuration = 0.5,\r
  staggerDelay = 0.12\r
}) {\r
  const [isMenuOpen, setIsMenuOpen] = useState(false);\r
  const [showOverlay, setShowOverlay] = useState(false);\r
\r
  const overlayRef = useRef(null);\r
  const bubblesRef = useRef([]);\r
  const labelRefs = useRef([]);\r
\r
  const menuItems = items?.length ? items : DEFAULT_ITEMS;\r
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]\r
    .filter(Boolean)\r
    .join(' ');\r
\r
  const handleToggle = () => {\r
    const nextState = !isMenuOpen;\r
    if (nextState) setShowOverlay(true);\r
    setIsMenuOpen(nextState);\r
    onMenuClick?.(nextState);\r
  };\r
\r
  useEffect(() => {\r
    const overlay = overlayRef.current;\r
    const bubbles = bubblesRef.current.filter(Boolean);\r
    const labels = labelRefs.current.filter(Boolean);\r
\r
    if (!overlay || !bubbles.length) return;\r
\r
    if (isMenuOpen) {\r
      gsap.set(overlay, { display: 'flex' });\r
      gsap.killTweensOf([...bubbles, ...labels]);\r
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });\r
      gsap.set(labels, { y: 24, autoAlpha: 0 });\r
\r
      bubbles.forEach((bubble, i) => {\r
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);\r
        const tl = gsap.timeline({ delay });\r
\r
        tl.to(bubble, {\r
          scale: 1,\r
          duration: animationDuration,\r
          ease: animationEase\r
        });\r
        if (labels[i]) {\r
          tl.to(\r
            labels[i],\r
            {\r
              y: 0,\r
              autoAlpha: 1,\r
              duration: animationDuration,\r
              ease: 'power3.out'\r
            },\r
            \`-=\${animationDuration * 0.9}\`\r
          );\r
        }\r
      });\r
    } else if (showOverlay) {\r
      gsap.killTweensOf([...bubbles, ...labels]);\r
      gsap.to(labels, {\r
        y: 24,\r
        autoAlpha: 0,\r
        duration: 0.2,\r
        ease: 'power3.in'\r
      });\r
      gsap.to(bubbles, {\r
        scale: 0,\r
        duration: 0.2,\r
        ease: 'power3.in',\r
        onComplete: () => {\r
          gsap.set(overlay, { display: 'none' });\r
          setShowOverlay(false);\r
        }\r
      });\r
    }\r
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);\r
\r
  useEffect(() => {\r
    const handleResize = () => {\r
      if (isMenuOpen) {\r
        const bubbles = bubblesRef.current.filter(Boolean);\r
        const isDesktop = window.innerWidth >= 900;\r
\r
        bubbles.forEach((bubble, i) => {\r
          const item = menuItems[i];\r
          if (bubble && item) {\r
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;\r
            gsap.set(bubble, { rotation });\r
          }\r
        });\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    return () => window.removeEventListener('resize', handleResize);\r
  }, [isMenuOpen, menuItems]);\r
\r
  return (\r
    <>\r
      <nav className={containerClassName} style={style} aria-label="Main navigation">\r
        <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg }}>\r
          <span className="logo-content">\r
            {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}\r
          </span>\r
        </div>\r
\r
        <button\r
          type="button"\r
          className={\`bubble toggle-bubble menu-btn \${isMenuOpen ? 'open' : ''}\`}\r
          onClick={handleToggle}\r
          aria-label={menuAriaLabel}\r
          aria-pressed={isMenuOpen}\r
          style={{ background: menuBg }}\r
        >\r
          <span className="menu-line" style={{ background: menuContentColor }} />\r
          <span className="menu-line short" style={{ background: menuContentColor }} />\r
        </button>\r
      </nav>\r
      {showOverlay && (\r
        <div\r
          ref={overlayRef}\r
          className={\`bubble-menu-items \${useFixedPosition ? 'fixed' : 'absolute'}\`}\r
          aria-hidden={!isMenuOpen}\r
        >\r
          <ul className="pill-list" role="menu" aria-label="Menu links">\r
            {menuItems.map((item, idx) => (\r
              <li key={idx} role="none" className="pill-col">\r
                <a\r
                  role="menuitem"\r
                  href={item.href}\r
                  aria-label={item.ariaLabel || item.label}\r
                  className="pill-link"\r
                  style={{\r
                    '--item-rot': \`\${item.rotation ?? 0}deg\`,\r
                    '--pill-bg': menuBg,\r
                    '--pill-color': menuContentColor,\r
                    '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',\r
                    '--hover-color': item.hoverStyles?.textColor || menuContentColor\r
                  }}\r
                  ref={el => {\r
                    if (el) bubblesRef.current[idx] = el;\r
                  }}\r
                >\r
                  <span\r
                    className="pill-label"\r
                    ref={el => {\r
                      if (el) labelRefs.current[idx] = el;\r
                    }}\r
                  >\r
                    {item.label}\r
                  </span>\r
                </a>\r
              </li>\r
            ))}\r
          </ul>\r
        </div>\r
      )}\r
    </>\r
  );\r
}\r
`,q=`.bubble-menu {\r
  left: 0;\r
  right: 0;\r
  top: 2em;\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 16px;\r
  padding: 0 2em;\r
  pointer-events: none;\r
  z-index: 99;\r
}\r
\r
.bubble-menu.fixed {\r
  position: fixed;\r
}\r
\r
.bubble-menu.absolute {\r
  position: absolute;\r
}\r
\r
.bubble-menu .bubble {\r
  --bubble-size: 48px;\r
  width: var(--bubble-size);\r
  height: var(--bubble-size);\r
  border-radius: 50%;\r
  background: #fff;\r
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  pointer-events: auto;\r
}\r
\r
.bubble-menu .logo-bubble,\r
.bubble-menu .toggle-bubble {\r
  will-change: transform;\r
}\r
\r
.bubble-menu .logo-bubble {\r
  width: auto;\r
  min-height: var(--bubble-size);\r
  height: var(--bubble-size);\r
  padding: 0 16px;\r
  border-radius: calc(var(--bubble-size) / 2);\r
  gap: 8px;\r
}\r
\r
.bubble-menu .toggle-bubble {\r
  width: var(--bubble-size);\r
  height: var(--bubble-size);\r
}\r
\r
.bubble-menu .bubble-logo {\r
  max-height: 60%;\r
  max-width: 100%;\r
  object-fit: contain;\r
  display: block;\r
}\r
\r
.bubble-menu .logo-content {\r
  --logo-max-height: 60%;\r
  --logo-max-width: 100%;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 120px;\r
  height: 100%;\r
}\r
\r
.bubble-menu .logo-content > .bubble-logo,\r
.bubble-menu .logo-content > img,\r
.bubble-menu .logo-content > svg {\r
  max-height: var(--logo-max-height);\r
  max-width: var(--logo-max-width);\r
}\r
\r
.bubble-menu .menu-btn {\r
  border: none;\r
  background: #fff;\r
  cursor: pointer;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0;\r
}\r
\r
.bubble-menu .menu-line {\r
  width: 26px;\r
  height: 2px;\r
  background: #111;\r
  border-radius: 2px;\r
  display: block;\r
  margin: 0 auto;\r
  transition:\r
    transform 0.3s ease,\r
    opacity 0.3s ease;\r
  transform-origin: center;\r
}\r
\r
.bubble-menu .menu-line + .menu-line {\r
  margin-top: 6px;\r
}\r
\r
.bubble-menu .menu-btn.open .menu-line:first-child {\r
  transform: translateY(4px) rotate(45deg);\r
}\r
\r
.bubble-menu .menu-btn.open .menu-line:last-child {\r
  transform: translateY(-4px) rotate(-45deg);\r
}\r
\r
@media (min-width: 768px) {\r
  .bubble-menu .bubble {\r
    --bubble-size: 56px;\r
  }\r
\r
  .bubble-menu .logo-bubble {\r
    padding: 0 16px;\r
  }\r
}\r
\r
.bubble-menu-items {\r
  position: absolute;\r
  inset: 0;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  pointer-events: none;\r
  z-index: 98;\r
}\r
\r
.bubble-menu-items.fixed {\r
  position: fixed;\r
}\r
\r
.bubble-menu-items.absolute {\r
  position: absolute;\r
}\r
\r
.bubble-menu-items .pill-list {\r
  list-style: none;\r
  margin: 0;\r
  padding: 0 24px;\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 0;\r
  row-gap: 4px;\r
  width: 100%;\r
  max-width: 1600px;\r
  margin-left: auto;\r
  margin-right: auto;\r
  pointer-events: auto;\r
  justify-content: stretch;\r
}\r
\r
.bubble-menu-items .pill-list .pill-spacer {\r
  width: 100%;\r
  height: 0;\r
  pointer-events: none;\r
}\r
\r
.bubble-menu-items .pill-list .pill-col {\r
  display: flex;\r
  justify-content: center;\r
  align-items: stretch;\r
  flex: 0 0 calc(100% / 3);\r
  box-sizing: border-box;\r
}\r
\r
.bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {\r
  margin-left: calc(100% / 6);\r
}\r
\r
.bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {\r
  margin-left: calc(100% / 3);\r
}\r
\r
.bubble-menu-items .pill-link {\r
  --pill-bg: #ffffff;\r
  --pill-color: #111;\r
  --pill-border: rgba(0, 0, 0, 0.12);\r
  --item-rot: 0deg;\r
  --pill-min-h: 160px;\r
  --hover-bg: #f3f4f6;\r
  --hover-color: #111;\r
  width: 100%;\r
  min-height: var(--pill-min-h);\r
  padding: clamp(1.5rem, 3vw, 8rem) 0;\r
  font-size: clamp(1.5rem, 4vw, 4rem);\r
  font-weight: 400;\r
  line-height: 0;\r
  border-radius: 999px;\r
  background: var(--pill-bg);\r
  color: var(--pill-color);\r
  text-decoration: none;\r
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  position: relative;\r
  transition:\r
    background 0.3s ease,\r
    color 0.3s ease;\r
  will-change: transform;\r
  box-sizing: border-box;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  height: 10px;\r
}\r
\r
@media (min-width: 900px) {\r
  .bubble-menu-items .pill-link {\r
    transform: rotate(var(--item-rot));\r
  }\r
\r
  .bubble-menu-items .pill-link:hover {\r
    transform: rotate(var(--item-rot)) scale(1.06);\r
    background: var(--hover-bg);\r
    color: var(--hover-color);\r
  }\r
\r
  .bubble-menu-items .pill-link:active {\r
    transform: rotate(var(--item-rot)) scale(0.94);\r
  }\r
}\r
\r
.bubble-menu-items .pill-link .pill-label {\r
  display: inline-block;\r
  will-change: transform, opacity;\r
  height: 1.2em;\r
  line-height: 1.2;\r
}\r
\r
@media (max-width: 899px) {\r
  .bubble-menu-items {\r
    padding-top: 0px;\r
    align-items: flex-start;\r
    padding-top: 120px;\r
  }\r
\r
  .bubble-menu-items .pill-list {\r
    row-gap: 16px;\r
  }\r
\r
  .bubble-menu-items .pill-list .pill-col {\r
    flex: 0 0 100%;\r
    margin-left: 0 !important;\r
    overflow: visible;\r
  }\r
\r
  .bubble-menu-items .pill-link {\r
    font-size: clamp(1.2rem, 3vw, 4rem);\r
    padding: clamp(1rem, 2vw, 2rem) 0;\r
    min-height: 80px;\r
  }\r
\r
  .bubble-menu-items .pill-link:hover {\r
    transform: scale(1.06);\r
    background: var(--hover-bg);\r
    color: var(--hover-color);\r
  }\r
\r
  .bubble-menu-items .pill-link:active {\r
    transform: scale(0.94);\r
  }\r
}\r
`,K=`import { useEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
\r
const DEFAULT_ITEMS = [\r
  {\r
    label: 'home',\r
    href: '#',\r
    ariaLabel: 'Home',\r
    rotation: -8,\r
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'about',\r
    href: '#',\r
    ariaLabel: 'About',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'projects',\r
    href: '#',\r
    ariaLabel: 'Documentation',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'blog',\r
    href: '#',\r
    ariaLabel: 'Blog',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'contact',\r
    href: '#',\r
    ariaLabel: 'Contact',\r
    rotation: -8,\r
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }\r
  }\r
];\r
\r
export default function BubbleMenu({\r
  logo,\r
  onMenuClick,\r
  className,\r
  style,\r
  menuAriaLabel = 'Toggle menu',\r
  menuBg = '#fff',\r
  menuContentColor = '#111',\r
  useFixedPosition = false,\r
  items,\r
  animationEase = 'back.out(1.5)',\r
  animationDuration = 0.5,\r
  staggerDelay = 0.12\r
}) {\r
  const [isMenuOpen, setIsMenuOpen] = useState(false);\r
  const [showOverlay, setShowOverlay] = useState(false);\r
\r
  const overlayRef = useRef(null);\r
  const bubblesRef = useRef([]);\r
  const labelRefs = useRef([]);\r
\r
  const menuItems = items?.length ? items : DEFAULT_ITEMS;\r
\r
  const containerClassName = [\r
    'bubble-menu',\r
    useFixedPosition ? 'fixed' : 'absolute',\r
    'left-0 right-0 top-8',\r
    'flex items-center justify-between',\r
    'gap-4 px-8',\r
    'pointer-events-none',\r
    'z-[1001]',\r
    className\r
  ]\r
    .filter(Boolean)\r
    .join(' ');\r
\r
  const handleToggle = () => {\r
    const nextState = !isMenuOpen;\r
    if (nextState) setShowOverlay(true);\r
    setIsMenuOpen(nextState);\r
    onMenuClick?.(nextState);\r
  };\r
\r
  useEffect(() => {\r
    const overlay = overlayRef.current;\r
    const bubbles = bubblesRef.current.filter(Boolean);\r
    const labels = labelRefs.current.filter(Boolean);\r
    if (!overlay || !bubbles.length) return;\r
\r
    if (isMenuOpen) {\r
      gsap.set(overlay, { display: 'flex' });\r
      gsap.killTweensOf([...bubbles, ...labels]);\r
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });\r
      gsap.set(labels, { y: 24, autoAlpha: 0 });\r
\r
      bubbles.forEach((bubble, i) => {\r
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);\r
        const tl = gsap.timeline({ delay });\r
        tl.to(bubble, {\r
          scale: 1,\r
          duration: animationDuration,\r
          ease: animationEase\r
        });\r
        if (labels[i]) {\r
          tl.to(\r
            labels[i],\r
            {\r
              y: 0,\r
              autoAlpha: 1,\r
              duration: animationDuration,\r
              ease: 'power3.out'\r
            },\r
            '-=' + animationDuration * 0.9\r
          );\r
        }\r
      });\r
    } else if (showOverlay) {\r
      gsap.killTweensOf([...bubbles, ...labels]);\r
      gsap.to(labels, {\r
        y: 24,\r
        autoAlpha: 0,\r
        duration: 0.2,\r
        ease: 'power3.in'\r
      });\r
      gsap.to(bubbles, {\r
        scale: 0,\r
        duration: 0.2,\r
        ease: 'power3.in',\r
        onComplete: () => {\r
          gsap.set(overlay, { display: 'none' });\r
          setShowOverlay(false);\r
        }\r
      });\r
    }\r
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);\r
\r
  useEffect(() => {\r
    const handleResize = () => {\r
      if (isMenuOpen) {\r
        const bubbles = bubblesRef.current.filter(Boolean);\r
        const isDesktop = window.innerWidth >= 900;\r
        bubbles.forEach((bubble, i) => {\r
          const item = menuItems[i];\r
          if (bubble && item) {\r
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;\r
            gsap.set(bubble, { rotation });\r
          }\r
        });\r
      }\r
    };\r
    window.addEventListener('resize', handleResize);\r
    return () => window.removeEventListener('resize', handleResize);\r
  }, [isMenuOpen, menuItems]);\r
\r
  return (\r
    <>\r
      {/* Workaround for silly Tailwind capabilities */}\r
      <style>{\`\r
        .bubble-menu .menu-line {\r
          transition: transform 0.3s ease, opacity 0.3s ease;\r
          transform-origin: center;\r
        }\r
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {\r
          margin-left: calc(100% / 6);\r
        }\r
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {\r
          margin-left: calc(100% / 3);\r
        }\r
        @media (min-width: 900px) {\r
          .bubble-menu-items .pill-link {\r
            transform: rotate(var(--item-rot));\r
          }\r
          .bubble-menu-items .pill-link:hover {\r
            transform: rotate(var(--item-rot)) scale(1.06);\r
            background: var(--hover-bg) !important;\r
            color: var(--hover-color) !important;\r
          }\r
          .bubble-menu-items .pill-link:active {\r
            transform: rotate(var(--item-rot)) scale(.94);\r
          }\r
        }\r
        @media (max-width: 899px) {\r
          .bubble-menu-items {\r
            padding-top: 120px;\r
            align-items: flex-start;\r
          }\r
          .bubble-menu-items .pill-list {\r
            row-gap: 16px;\r
          }\r
          .bubble-menu-items .pill-list .pill-col {\r
            flex: 0 0 100% !important;\r
            margin-left: 0 !important;\r
            overflow: visible;\r
          }\r
          .bubble-menu-items .pill-link {\r
            font-size: clamp(1.2rem, 3vw, 4rem);\r
            padding: clamp(1rem, 2vw, 2rem) 0;\r
            min-height: 80px !important;\r
          }\r
          .bubble-menu-items .pill-link:hover {\r
            transform: scale(1.06);\r
            background: var(--hover-bg);\r
            color: var(--hover-color);\r
          }\r
          .bubble-menu-items .pill-link:active {\r
            transform: scale(.94);\r
          }\r
        }\r
      \`}</style>\r
\r
      <nav className={containerClassName} style={style} aria-label="Main navigation">\r
        <div\r
          className={[\r
            'bubble logo-bubble',\r
            'inline-flex items-center justify-center',\r
            'rounded-full',\r
            'bg-white',\r
            'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',\r
            'pointer-events-auto',\r
            'h-12 md:h-14',\r
            'px-4 md:px-8',\r
            'gap-2',\r
            'will-change-transform'\r
          ].join(' ')}\r
          aria-label="Logo"\r
          style={{\r
            background: menuBg,\r
            minHeight: '48px',\r
            borderRadius: '9999px'\r
          }}\r
        >\r
          <span\r
            className={['logo-content', 'inline-flex items-center justify-center', 'w-[120px] h-full'].join(' ')}\r
            style={{\r
              ['--logo-max-height']: '60%',\r
              ['--logo-max-width']: '100%'\r
            }}\r
          >\r
            {typeof logo === 'string' ? (\r
              <img src={logo} alt="Logo" className="bubble-logo max-h-[60%] max-w-full object-contain block" />\r
            ) : (\r
              logo\r
            )}\r
          </span>\r
        </div>\r
\r
        <button\r
          type="button"\r
          className={[\r
            'bubble toggle-bubble menu-btn',\r
            isMenuOpen ? 'open' : '',\r
            'inline-flex flex-col items-center justify-center',\r
            'rounded-full',\r
            'bg-white',\r
            'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',\r
            'pointer-events-auto',\r
            'w-12 h-12 md:w-14 md:h-14',\r
            'border-0 cursor-pointer p-0',\r
            'will-change-transform'\r
          ].join(' ')}\r
          onClick={handleToggle}\r
          aria-label={menuAriaLabel}\r
          aria-pressed={isMenuOpen}\r
          style={{ background: menuBg }}\r
        >\r
          <span\r
            className="menu-line block mx-auto rounded-[2px]"\r
            style={{\r
              width: 26,\r
              height: 2,\r
              background: menuContentColor,\r
              transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'\r
            }}\r
          />\r
          <span\r
            className="menu-line short block mx-auto rounded-[2px]"\r
            style={{\r
              marginTop: '6px',\r
              width: 26,\r
              height: 2,\r
              background: menuContentColor,\r
              transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'\r
            }}\r
          />\r
        </button>\r
      </nav>\r
\r
      {showOverlay && (\r
        <div\r
          ref={overlayRef}\r
          className={[\r
            'bubble-menu-items',\r
            useFixedPosition ? 'fixed' : 'absolute',\r
            'inset-0',\r
            'flex items-center justify-center',\r
            'pointer-events-none',\r
            'z-[1000]'\r
          ].join(' ')}\r
          aria-hidden={!isMenuOpen}\r
        >\r
          <ul\r
            className={[\r
              'pill-list',\r
              'list-none m-0 px-6',\r
              'w-full max-w-[1600px] mx-auto',\r
              'flex flex-wrap',\r
              'gap-x-0 gap-y-1',\r
              'pointer-events-auto'\r
            ].join(' ')}\r
            role="menu"\r
            aria-label="Menu links"\r
          >\r
            {menuItems.map((item, idx) => (\r
              <li\r
                key={idx}\r
                role="none"\r
                className={[\r
                  'pill-col',\r
                  'flex justify-center items-stretch',\r
                  '[flex:0_0_calc(100%/3)]',\r
                  'box-border'\r
                ].join(' ')}\r
              >\r
                <a\r
                  role="menuitem"\r
                  href={item.href}\r
                  aria-label={item.ariaLabel || item.label}\r
                  className={[\r
                    'pill-link',\r
                    'w-full',\r
                    'rounded-[999px]',\r
                    'no-underline',\r
                    'bg-white',\r
                    'text-inherit',\r
                    'shadow-[0_4px_14px_rgba(0,0,0,0.10)]',\r
                    'flex items-center justify-center',\r
                    'relative',\r
                    'transition-[background,color] duration-300 ease-in-out',\r
                    'box-border',\r
                    'whitespace-nowrap overflow-hidden'\r
                  ].join(' ')}\r
                  style={{\r
                    ['--item-rot']: \`\${item.rotation ?? 0}deg\`,\r
                    ['--pill-bg']: menuBg,\r
                    ['--pill-color']: menuContentColor,\r
                    ['--hover-bg']: item.hoverStyles?.bgColor || '#f3f4f6',\r
                    ['--hover-color']: item.hoverStyles?.textColor || menuContentColor,\r
                    background: 'var(--pill-bg)',\r
                    color: 'var(--pill-color)',\r
                    minHeight: 'var(--pill-min-h, 160px)',\r
                    padding: 'clamp(1.5rem, 3vw, 8rem) 0',\r
                    fontSize: 'clamp(1.5rem, 4vw, 4rem)',\r
                    fontWeight: 400,\r
                    lineHeight: 0,\r
                    willChange: 'transform',\r
                    height: 10\r
                  }}\r
                  ref={el => {\r
                    if (el) bubblesRef.current[idx] = el;\r
                  }}\r
                >\r
                  <span\r
                    className="pill-label inline-block"\r
                    style={{\r
                      willChange: 'transform, opacity',\r
                      height: '1.2em',\r
                      lineHeight: 1.2\r
                    }}\r
                    ref={el => {\r
                      if (el) labelRefs.current[idx] = el;\r
                    }}\r
                  >\r
                    {item.label}\r
                  </span>\r
                </a>\r
              </li>\r
            ))}\r
          </ul>\r
        </div>\r
      )}\r
    </>\r
  );\r
}\r
`,Q=`import type { CSSProperties, ReactNode } from 'react';\r
import { useState, useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
\r
import './BubbleMenu.css';\r
\r
type MenuItem = {\r
  label: string;\r
  href: string;\r
  ariaLabel?: string;\r
  rotation?: number;\r
  hoverStyles?: {\r
    bgColor?: string;\r
    textColor?: string;\r
  };\r
};\r
\r
export type BubbleMenuProps = {\r
  logo: ReactNode | string;\r
  onMenuClick?: (open: boolean) => void;\r
  className?: string;\r
  style?: CSSProperties;\r
  menuAriaLabel?: string;\r
  menuBg?: string;\r
  menuContentColor?: string;\r
  useFixedPosition?: boolean;\r
  items?: MenuItem[];\r
  animationEase?: string;\r
  animationDuration?: number;\r
  staggerDelay?: number;\r
};\r
\r
const DEFAULT_ITEMS: MenuItem[] = [\r
  {\r
    label: 'home',\r
    href: '#',\r
    ariaLabel: 'Home',\r
    rotation: -8,\r
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'about',\r
    href: '#',\r
    ariaLabel: 'About',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'projects',\r
    href: '#',\r
    ariaLabel: 'Documentation',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'blog',\r
    href: '#',\r
    ariaLabel: 'Blog',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'contact',\r
    href: '#',\r
    ariaLabel: 'Contact',\r
    rotation: -8,\r
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }\r
  }\r
];\r
\r
export default function BubbleMenu({\r
  logo,\r
  onMenuClick,\r
  className,\r
  style,\r
  menuAriaLabel = 'Toggle menu',\r
  menuBg = '#fff',\r
  menuContentColor = '#111',\r
  useFixedPosition = false,\r
  items,\r
  animationEase = 'back.out(1.5)',\r
  animationDuration = 0.5,\r
  staggerDelay = 0.12\r
}: BubbleMenuProps) {\r
  const [isMenuOpen, setIsMenuOpen] = useState(false);\r
  const [showOverlay, setShowOverlay] = useState(false);\r
\r
  const overlayRef = useRef<HTMLDivElement>(null);\r
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);\r
  const labelRefs = useRef<HTMLSpanElement[]>([]);\r
\r
  const menuItems = items?.length ? items : DEFAULT_ITEMS;\r
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]\r
    .filter(Boolean)\r
    .join(' ');\r
\r
  const handleToggle = () => {\r
    const nextState = !isMenuOpen;\r
    if (nextState) setShowOverlay(true);\r
    setIsMenuOpen(nextState);\r
    onMenuClick?.(nextState);\r
  };\r
\r
  useEffect(() => {\r
    const overlay = overlayRef.current;\r
    const bubbles = bubblesRef.current.filter(Boolean);\r
    const labels = labelRefs.current.filter(Boolean);\r
\r
    if (!overlay || !bubbles.length) return;\r
\r
    if (isMenuOpen) {\r
      gsap.set(overlay, { display: 'flex' });\r
      gsap.killTweensOf([...bubbles, ...labels]);\r
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });\r
      gsap.set(labels, { y: 24, autoAlpha: 0 });\r
\r
      bubbles.forEach((bubble, i) => {\r
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);\r
        const tl = gsap.timeline({ delay });\r
\r
        tl.to(bubble, {\r
          scale: 1,\r
          duration: animationDuration,\r
          ease: animationEase\r
        });\r
        if (labels[i]) {\r
          tl.to(\r
            labels[i],\r
            {\r
              y: 0,\r
              autoAlpha: 1,\r
              duration: animationDuration,\r
              ease: 'power3.out'\r
            },\r
            \`-=\${animationDuration * 0.9}\`\r
          );\r
        }\r
      });\r
    } else if (showOverlay) {\r
      gsap.killTweensOf([...bubbles, ...labels]);\r
      gsap.to(labels, {\r
        y: 24,\r
        autoAlpha: 0,\r
        duration: 0.2,\r
        ease: 'power3.in'\r
      });\r
      gsap.to(bubbles, {\r
        scale: 0,\r
        duration: 0.2,\r
        ease: 'power3.in',\r
        onComplete: () => {\r
          gsap.set(overlay, { display: 'none' });\r
          setShowOverlay(false);\r
        }\r
      });\r
    }\r
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);\r
\r
  useEffect(() => {\r
    const handleResize = () => {\r
      if (isMenuOpen) {\r
        const bubbles = bubblesRef.current.filter(Boolean);\r
        const isDesktop = window.innerWidth >= 900;\r
\r
        bubbles.forEach((bubble, i) => {\r
          const item = menuItems[i];\r
          if (bubble && item) {\r
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;\r
            gsap.set(bubble, { rotation });\r
          }\r
        });\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    return () => window.removeEventListener('resize', handleResize);\r
  }, [isMenuOpen, menuItems]);\r
\r
  return (\r
    <>\r
      <nav className={containerClassName} style={style} aria-label="Main navigation">\r
        <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg }}>\r
          <span className="logo-content">\r
            {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}\r
          </span>\r
        </div>\r
\r
        <button\r
          type="button"\r
          className={\`bubble toggle-bubble menu-btn \${isMenuOpen ? 'open' : ''}\`}\r
          onClick={handleToggle}\r
          aria-label={menuAriaLabel}\r
          aria-pressed={isMenuOpen}\r
          style={{ background: menuBg }}\r
        >\r
          <span className="menu-line" style={{ background: menuContentColor }} />\r
          <span className="menu-line short" style={{ background: menuContentColor }} />\r
        </button>\r
      </nav>\r
      {showOverlay && (\r
        <div\r
          ref={overlayRef}\r
          className={\`bubble-menu-items \${useFixedPosition ? 'fixed' : 'absolute'}\`}\r
          aria-hidden={!isMenuOpen}\r
        >\r
          <ul className="pill-list" role="menu" aria-label="Menu links">\r
            {menuItems.map((item, idx) => (\r
              <li key={idx} role="none" className="pill-col">\r
                <a\r
                  role="menuitem"\r
                  href={item.href}\r
                  aria-label={item.ariaLabel || item.label}\r
                  className="pill-link"\r
                  style={\r
                    {\r
                      '--item-rot': \`\${item.rotation ?? 0}deg\`,\r
                      '--pill-bg': menuBg,\r
                      '--pill-color': menuContentColor,\r
                      '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',\r
                      '--hover-color': item.hoverStyles?.textColor || menuContentColor\r
                    } as CSSProperties\r
                  }\r
                  ref={el => {\r
                    if (el) bubblesRef.current[idx] = el;\r
                  }}\r
                >\r
                  <span\r
                    className="pill-label"\r
                    ref={el => {\r
                      if (el) labelRefs.current[idx] = el;\r
                    }}\r
                  >\r
                    {item.label}\r
                  </span>\r
                </a>\r
              </li>\r
            ))}\r
          </ul>\r
        </div>\r
      )}\r
    </>\r
  );\r
}\r
`,V=`import type { CSSProperties, ReactNode } from 'react';\r
import { useEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
\r
type MenuItem = {\r
  label: string;\r
  href: string;\r
  ariaLabel?: string;\r
  rotation?: number;\r
  hoverStyles?: {\r
    bgColor?: string;\r
    textColor?: string;\r
  };\r
};\r
\r
export type BubbleMenuProps = {\r
  logo: ReactNode | string;\r
  onMenuClick?: (open: boolean) => void;\r
  className?: string;\r
  style?: CSSProperties;\r
  menuAriaLabel?: string;\r
  menuBg?: string;\r
  menuContentColor?: string;\r
  useFixedPosition?: boolean;\r
  items?: MenuItem[];\r
  animationEase?: string;\r
  animationDuration?: number;\r
  staggerDelay?: number;\r
};\r
\r
const DEFAULT_ITEMS: MenuItem[] = [\r
  {\r
    label: 'home',\r
    href: '#',\r
    ariaLabel: 'Home',\r
    rotation: -8,\r
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'about',\r
    href: '#',\r
    ariaLabel: 'About',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'projects',\r
    href: '#',\r
    ariaLabel: 'Documentation',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'blog',\r
    href: '#',\r
    ariaLabel: 'Blog',\r
    rotation: 8,\r
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }\r
  },\r
  {\r
    label: 'contact',\r
    href: '#',\r
    ariaLabel: 'Contact',\r
    rotation: -8,\r
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }\r
  }\r
];\r
\r
export default function BubbleMenu({\r
  logo,\r
  onMenuClick,\r
  className,\r
  style,\r
  menuAriaLabel = 'Toggle menu',\r
  menuBg = '#fff',\r
  menuContentColor = '#111',\r
  useFixedPosition = false,\r
  items,\r
  animationEase = 'back.out(1.5)',\r
  animationDuration = 0.5,\r
  staggerDelay = 0.12\r
}: BubbleMenuProps) {\r
  const [isMenuOpen, setIsMenuOpen] = useState(false);\r
  const [showOverlay, setShowOverlay] = useState(false);\r
\r
  const overlayRef = useRef<HTMLDivElement>(null);\r
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);\r
  const labelRefs = useRef<HTMLSpanElement[]>([]);\r
\r
  const menuItems = items?.length ? items : DEFAULT_ITEMS;\r
\r
  const containerClassName = [\r
    'bubble-menu',\r
    useFixedPosition ? 'fixed' : 'absolute',\r
    'left-0 right-0 top-8',\r
    'flex items-center justify-between',\r
    'gap-4 px-8',\r
    'pointer-events-none',\r
    'z-[1001]',\r
    className\r
  ]\r
    .filter(Boolean)\r
    .join(' ');\r
\r
  const handleToggle = () => {\r
    const nextState = !isMenuOpen;\r
    if (nextState) setShowOverlay(true);\r
    setIsMenuOpen(nextState);\r
    onMenuClick?.(nextState);\r
  };\r
\r
  useEffect(() => {\r
    const overlay = overlayRef.current;\r
    const bubbles = bubblesRef.current.filter(Boolean);\r
    const labels = labelRefs.current.filter(Boolean);\r
    if (!overlay || !bubbles.length) return;\r
\r
    if (isMenuOpen) {\r
      gsap.set(overlay, { display: 'flex' });\r
      gsap.killTweensOf([...bubbles, ...labels]);\r
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });\r
      gsap.set(labels, { y: 24, autoAlpha: 0 });\r
\r
      bubbles.forEach((bubble, i) => {\r
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);\r
        const tl = gsap.timeline({ delay });\r
        tl.to(bubble, {\r
          scale: 1,\r
          duration: animationDuration,\r
          ease: animationEase\r
        });\r
        if (labels[i]) {\r
          tl.to(\r
            labels[i],\r
            {\r
              y: 0,\r
              autoAlpha: 1,\r
              duration: animationDuration,\r
              ease: 'power3.out'\r
            },\r
            '-=' + animationDuration * 0.9\r
          );\r
        }\r
      });\r
    } else if (showOverlay) {\r
      gsap.killTweensOf([...bubbles, ...labels]);\r
      gsap.to(labels, {\r
        y: 24,\r
        autoAlpha: 0,\r
        duration: 0.2,\r
        ease: 'power3.in'\r
      });\r
      gsap.to(bubbles, {\r
        scale: 0,\r
        duration: 0.2,\r
        ease: 'power3.in',\r
        onComplete: () => {\r
          gsap.set(overlay, { display: 'none' });\r
          setShowOverlay(false);\r
        }\r
      });\r
    }\r
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);\r
\r
  useEffect(() => {\r
    const handleResize = () => {\r
      if (isMenuOpen) {\r
        const bubbles = bubblesRef.current.filter(Boolean);\r
        const isDesktop = window.innerWidth >= 900;\r
        bubbles.forEach((bubble, i) => {\r
          const item = menuItems[i];\r
          if (bubble && item) {\r
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;\r
            gsap.set(bubble, { rotation });\r
          }\r
        });\r
      }\r
    };\r
    window.addEventListener('resize', handleResize);\r
    return () => window.removeEventListener('resize', handleResize);\r
  }, [isMenuOpen, menuItems]);\r
\r
  return (\r
    <>\r
      {/* Workaround for silly Tailwind capabilities */}\r
      <style>{\`\r
        .bubble-menu .menu-line {\r
          transition: transform 0.3s ease, opacity 0.3s ease;\r
          transform-origin: center;\r
        }\r
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {\r
          margin-left: calc(100% / 6);\r
        }\r
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {\r
          margin-left: calc(100% / 3);\r
        }\r
        @media (min-width: 900px) {\r
          .bubble-menu-items .pill-link {\r
            transform: rotate(var(--item-rot));\r
          }\r
          .bubble-menu-items .pill-link:hover {\r
            transform: rotate(var(--item-rot)) scale(1.06);\r
            background: var(--hover-bg) !important;\r
            color: var(--hover-color) !important;\r
          }\r
          .bubble-menu-items .pill-link:active {\r
            transform: rotate(var(--item-rot)) scale(.94);\r
          }\r
        }\r
        @media (max-width: 899px) {\r
          .bubble-menu-items {\r
            padding-top: 120px;\r
            align-items: flex-start;\r
          }\r
          .bubble-menu-items .pill-list {\r
            row-gap: 16px;\r
          }\r
          .bubble-menu-items .pill-list .pill-col {\r
            flex: 0 0 100% !important;\r
            margin-left: 0 !important;\r
            overflow: visible;\r
          }\r
          .bubble-menu-items .pill-link {\r
            font-size: clamp(1.2rem, 3vw, 4rem);\r
            padding: clamp(1rem, 2vw, 2rem) 0;\r
            min-height: 80px !important;\r
          }\r
          .bubble-menu-items .pill-link:hover {\r
            transform: scale(1.06);\r
            background: var(--hover-bg);\r
            color: var(--hover-color);\r
          }\r
          .bubble-menu-items .pill-link:active {\r
            transform: scale(.94);\r
          }\r
        }\r
      \`}</style>\r
\r
      <nav className={containerClassName} style={style} aria-label="Main navigation">\r
        <div\r
          className={[\r
            'bubble logo-bubble',\r
            'inline-flex items-center justify-center',\r
            'rounded-full',\r
            'bg-white',\r
            'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',\r
            'pointer-events-auto',\r
            'h-12 md:h-14',\r
            'px-4 md:px-8',\r
            'gap-2',\r
            'will-change-transform'\r
          ].join(' ')}\r
          aria-label="Logo"\r
          style={{\r
            background: menuBg,\r
            minHeight: '48px',\r
            borderRadius: '9999px'\r
          }}\r
        >\r
          <span\r
            className={['logo-content', 'inline-flex items-center justify-center', 'w-[120px] h-full'].join(' ')}\r
            style={\r
              {\r
                ['--logo-max-height']: '60%',\r
                ['--logo-max-width']: '100%'\r
              } as CSSProperties\r
            }\r
          >\r
            {typeof logo === 'string' ? (\r
              <img src={logo} alt="Logo" className="bubble-logo max-h-[60%] max-w-full object-contain block" />\r
            ) : (\r
              logo\r
            )}\r
          </span>\r
        </div>\r
\r
        <button\r
          type="button"\r
          className={[\r
            'bubble toggle-bubble menu-btn',\r
            isMenuOpen ? 'open' : '',\r
            'inline-flex flex-col items-center justify-center',\r
            'rounded-full',\r
            'bg-white',\r
            'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',\r
            'pointer-events-auto',\r
            'w-12 h-12 md:w-14 md:h-14',\r
            'border-0 cursor-pointer p-0',\r
            'will-change-transform'\r
          ].join(' ')}\r
          onClick={handleToggle}\r
          aria-label={menuAriaLabel}\r
          aria-pressed={isMenuOpen}\r
          style={{ background: menuBg }}\r
        >\r
          <span\r
            className="menu-line block mx-auto rounded-[2px]"\r
            style={{\r
              width: 26,\r
              height: 2,\r
              background: menuContentColor,\r
              transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'\r
            }}\r
          />\r
          <span\r
            className="menu-line short block mx-auto rounded-[2px]"\r
            style={{\r
              marginTop: '6px',\r
              width: 26,\r
              height: 2,\r
              background: menuContentColor,\r
              transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'\r
            }}\r
          />\r
        </button>\r
      </nav>\r
\r
      {showOverlay && (\r
        <div\r
          ref={overlayRef}\r
          className={[\r
            'bubble-menu-items',\r
            useFixedPosition ? 'fixed' : 'absolute',\r
            'inset-0',\r
            'flex items-center justify-center',\r
            'pointer-events-none',\r
            'z-[1000]'\r
          ].join(' ')}\r
          aria-hidden={!isMenuOpen}\r
        >\r
          <ul\r
            className={[\r
              'pill-list',\r
              'list-none m-0 px-6',\r
              'w-full max-w-[1600px] mx-auto',\r
              'flex flex-wrap',\r
              'gap-x-0 gap-y-1',\r
              'pointer-events-auto'\r
            ].join(' ')}\r
            role="menu"\r
            aria-label="Menu links"\r
          >\r
            {menuItems.map((item, idx) => (\r
              <li\r
                key={idx}\r
                role="none"\r
                className={[\r
                  'pill-col',\r
                  'flex justify-center items-stretch',\r
                  '[flex:0_0_calc(100%/3)]',\r
                  'box-border'\r
                ].join(' ')}\r
              >\r
                <a\r
                  role="menuitem"\r
                  href={item.href}\r
                  aria-label={item.ariaLabel || item.label}\r
                  className={[\r
                    'pill-link',\r
                    'w-full',\r
                    'rounded-[999px]',\r
                    'no-underline',\r
                    'bg-white',\r
                    'text-inherit',\r
                    'shadow-[0_4px_14px_rgba(0,0,0,0.10)]',\r
                    'flex items-center justify-center',\r
                    'relative',\r
                    'transition-[background,color] duration-300 ease-in-out',\r
                    'box-border',\r
                    'whitespace-nowrap overflow-hidden'\r
                  ].join(' ')}\r
                  style={\r
                    {\r
                      ['--item-rot']: \`\${item.rotation ?? 0}deg\`,\r
                      ['--pill-bg']: menuBg,\r
                      ['--pill-color']: menuContentColor,\r
                      ['--hover-bg']: item.hoverStyles?.bgColor || '#f3f4f6',\r
                      ['--hover-color']: item.hoverStyles?.textColor || menuContentColor,\r
                      background: 'var(--pill-bg)',\r
                      color: 'var(--pill-color)',\r
                      minHeight: 'var(--pill-min-h, 160px)',\r
                      padding: 'clamp(1.5rem, 3vw, 8rem) 0',\r
                      fontSize: 'clamp(1.5rem, 4vw, 4rem)',\r
                      fontWeight: 400,\r
                      lineHeight: 0,\r
                      willChange: 'transform',\r
                      height: 10\r
                    } as CSSProperties\r
                  }\r
                  ref={el => {\r
                    if (el) bubblesRef.current[idx] = el;\r
                  }}\r
                >\r
                  <span\r
                    className="pill-label inline-block"\r
                    style={{\r
                      willChange: 'transform, opacity',\r
                      height: '1.2em',\r
                      lineHeight: 1.2\r
                    }}\r
                    ref={el => {\r
                      if (el) labelRefs.current[idx] = el;\r
                    }}\r
                  >\r
                    {item.label}\r
                  </span>\r
                </a>\r
              </li>\r
            ))}\r
          </ul>\r
        </div>\r
      )}\r
    </>\r
  );\r
}\r
`,Z={dependencies:"gsap",usage:`import BubbleMenu from './BubbleMenu'

const items = [
  {
    label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '#',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'projects',
    href: '#',
    ariaLabel: 'Projects',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'blog',
    href: '#',
    ariaLabel: 'Blog',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: '#',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

<BubbleMenu
  logo={<span style={{ fontWeight: 700 }}>RB</span>}
  items={items}
  menuAriaLabel="Toggle navigation"
  menuBg="#ffffff"
  menuContentColor="#111111"
  useFixedPosition={false}
  animationEase="back.out(1.5)"
  animationDuration={0.5}
  staggerDelay={0.12}
/>`,code:X,css:q,tailwind:K,tsCode:Q,tsTailwind:V},be=()=>{const[m,c]=l.useState("back.out(1.5)"),[g,C]=l.useState("#ffffff"),[d,p]=l.useState("#111111"),[s,h]=l.useState(.5),[b,x]=l.useState(.12),f=[{value:"back.out(1.5)",label:"back.out(1.5)"},{value:"power3.out",label:"power3.out"},{value:"power2.out",label:"power2.out"},{value:"elastic.out(1,0.5)",label:"elastic.out(1,0.5)"},{value:"bounce.out",label:"bounce.out"}],v=[{name:"logo",type:"ReactNode | string",default:"—",description:"Logo content shown in the central bubble (string src or JSX)."},{name:"onMenuClick",type:"(open: boolean) => void",default:"—",description:"Callback fired whenever the menu toggle changes; receives open state."},{name:"className",type:"string",default:"—",description:"Additional class names for the root nav wrapper."},{name:"style",type:"CSSProperties",default:"—",description:"Inline styles applied to the root nav wrapper."},{name:"menuAriaLabel",type:"string",default:'"Toggle menu"',description:"Accessible aria-label for the toggle button."},{name:"menuBg",type:"string",default:'"#fff"',description:"Background color for the logo & toggle bubbles and base pill background."},{name:"menuContentColor",type:"string",default:'"#111"',description:"Color for the menu icon lines and default pill text."},{name:"useFixedPosition",type:"boolean",default:"false",description:"If true positions the menu with fixed instead of absolute (follows viewport)."},{name:"items",type:"MenuItem[]",default:"DEFAULT_ITEMS",description:"Custom menu items; each = { label, href, ariaLabel?, rotation?, hoverStyles?: { bgColor?, textColor? } }."},{name:"animationEase",type:"string",default:'"back.out(1.5)"',description:"GSAP ease string used for bubble scale-in animation."},{name:"animationDuration",type:"number",default:"0.5",description:"Duration (s) for each bubble & label animation."},{name:"staggerDelay",type:"number",default:"0.12",description:"Base stagger (s) between bubble animations (with slight random variance)."}];return e.jsxs(I,{children:[e.jsxs(P,{children:[e.jsx(z,{position:"relative",className:"demo-container demo-container-dots",h:800,overflow:"hidden",children:e.jsx(J,{logo:Y,menuBg:g,menuContentColor:d,animationEase:m,animationDuration:s,staggerDelay:b})}),e.jsxs($,{children:[e.jsx(W,{title:"Ease",options:f,value:m,width:190,onChange:c}),e.jsxs(j,{alignItems:"center",mb:4,mt:4,gap:2,children:[e.jsx(R,{fontSize:"sm",children:"Menu BG"}),e.jsx(E,{type:"color",value:g,onChange:n=>C(n.target.value),width:"50px",p:0,h:"32px"})]}),e.jsxs(j,{alignItems:"center",mb:4,gap:2,children:[e.jsx(R,{fontSize:"sm",children:"Content Color"}),e.jsx(E,{type:"color",value:d,onChange:n=>p(n.target.value),width:"50px",p:0,h:"32px"})]}),e.jsx(D,{title:"Anim Duration",min:.1,max:2,step:.05,value:s,width:220,onChange:h}),e.jsx(D,{title:"Stagger",min:0,max:.5,step:.01,value:b,width:220,onChange:x})]}),e.jsx(_,{data:v}),e.jsx(U,{dependencyList:["gsap"]})]}),e.jsx(F,{children:e.jsx(H,{codeObject:Z})})]})};export{be as default};
