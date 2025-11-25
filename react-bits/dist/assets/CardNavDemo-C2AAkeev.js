import{r as o,j as e,cb as A,g as b,B as M}from"./index-wsKSLPNH.js";import{T as O,P,a as B,C as D,b as G}from"./PropTable-C4uPWs8h.js";import{u as _}from"./useForceRerender-BCFU-k0M.js";import{C as F}from"./Customize-1m_ZNqR9.js";import{P as N}from"./PreviewSelect-B8u33nUa.js";import{D as U}from"./Dependencies-BHoMfJUj.js";import{l as T}from"./reactbits-gh-white-BS28Ibpe.js";import{l as V}from"./reactbits-gh-black-CUrwi4wC.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const q=({logo:h,logoAlt:m="Logo",items:p,className:g="",ease:d="power3.out",baseColor:x="#fff",menuColor:f,buttonBgColor:y,buttonTextColor:u})=>{const[R,a]=o.useState(!1),[l,i]=o.useState(!1),v=o.useRef(null),E=o.useRef([]),s=o.useRef(null),k=()=>{const r=v.current;if(!r)return 260;if(window.matchMedia("(max-width: 768px)").matches){const n=r.querySelector(".card-nav-content");if(n){const c=n.style.visibility,w=n.style.pointerEvents,j=n.style.position,$=n.style.height;n.style.visibility="visible",n.style.pointerEvents="auto",n.style.position="static",n.style.height="auto",n.offsetHeight;const I=60,z=16,S=n.scrollHeight;return n.style.visibility=c,n.style.pointerEvents=w,n.style.position=j,n.style.height=$,I+S+z}}return 260},C=()=>{const r=v.current;if(!r)return null;b.set(r,{height:60,overflow:"hidden"}),b.set(E.current,{y:50,opacity:0});const t=b.timeline({paused:!0});return t.to(r,{height:k,duration:.4,ease:d}),t.to(E.current,{y:0,opacity:1,duration:.4,ease:d,stagger:.08},"-=0.1"),t};o.useLayoutEffect(()=>{const r=C();return s.current=r,()=>{r==null||r.kill(),s.current=null}},[d,p]),o.useLayoutEffect(()=>{const r=()=>{if(s.current)if(l){const t=k();b.set(v.current,{height:t}),s.current.kill();const n=C();n&&(n.progress(1),s.current=n)}else{s.current.kill();const t=C();t&&(s.current=t)}};return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[l]);const H=()=>{const r=s.current;r&&(l?(a(!1),r.eventCallback("onReverseComplete",()=>i(!1)),r.reverse()):(a(!0),i(!0),r.play(0)))},L=r=>t=>{t&&(E.current[r]=t)};return e.jsx("div",{className:`card-nav-container ${g}`,children:e.jsxs("nav",{ref:v,className:`card-nav ${l?"open":""}`,style:{backgroundColor:x},children:[e.jsxs("div",{className:"card-nav-top",children:[e.jsxs("div",{className:`hamburger-menu ${R?"open":""}`,onClick:H,role:"button","aria-label":l?"Close menu":"Open menu",tabIndex:0,style:{color:f||"#000"},children:[e.jsx("div",{className:"hamburger-line"}),e.jsx("div",{className:"hamburger-line"})]}),e.jsx("div",{className:"logo-container",children:e.jsx("img",{src:h,alt:m,className:"logo"})}),e.jsx("button",{type:"button",className:"card-nav-cta-button",style:{backgroundColor:y,color:u},children:"Get Started"})]}),e.jsx("div",{className:"card-nav-content","aria-hidden":!l,children:(p||[]).slice(0,3).map((r,t)=>{var n;return e.jsxs("div",{className:"nav-card",ref:L(t),style:{backgroundColor:r.bgColor,color:r.textColor},children:[e.jsx("div",{className:"nav-card-label",children:r.label}),e.jsx("div",{className:"nav-card-links",children:(n=r.links)==null?void 0:n.map((c,w)=>e.jsxs("a",{className:"nav-card-link",href:c.href,"aria-label":c.ariaLabel,children:[e.jsx(A,{className:"nav-card-link-icon","aria-hidden":"true"}),c.label]},`${c.label}-${w}`))})]},`${r.label}-${t}`)})})]})})},Y=`import { useLayoutEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
// use your own icon import if react-icons is not available\r
import { GoArrowUpRight } from 'react-icons/go';\r
import './CardNav.css';\r
\r
const CardNav = ({\r
  logo,\r
  logoAlt = 'Logo',\r
  items,\r
  className = '',\r
  ease = 'power3.out',\r
  baseColor = '#fff',\r
  menuColor,\r
  buttonBgColor,\r
  buttonTextColor\r
}) => {\r
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);\r
  const [isExpanded, setIsExpanded] = useState(false);\r
  const navRef = useRef(null);\r
  const cardsRef = useRef([]);\r
  const tlRef = useRef(null);\r
\r
  const calculateHeight = () => {\r
    const navEl = navRef.current;\r
    if (!navEl) return 260;\r
\r
    const isMobile = window.matchMedia('(max-width: 768px)').matches;\r
    if (isMobile) {\r
      const contentEl = navEl.querySelector('.card-nav-content');\r
      if (contentEl) {\r
        const wasVisible = contentEl.style.visibility;\r
        const wasPointerEvents = contentEl.style.pointerEvents;\r
        const wasPosition = contentEl.style.position;\r
        const wasHeight = contentEl.style.height;\r
\r
        contentEl.style.visibility = 'visible';\r
        contentEl.style.pointerEvents = 'auto';\r
        contentEl.style.position = 'static';\r
        contentEl.style.height = 'auto';\r
\r
        contentEl.offsetHeight;\r
\r
        const topBar = 60;\r
        const padding = 16;\r
        const contentHeight = contentEl.scrollHeight;\r
\r
        contentEl.style.visibility = wasVisible;\r
        contentEl.style.pointerEvents = wasPointerEvents;\r
        contentEl.style.position = wasPosition;\r
        contentEl.style.height = wasHeight;\r
\r
        return topBar + contentHeight + padding;\r
      }\r
    }\r
    return 260;\r
  };\r
\r
  const createTimeline = () => {\r
    const navEl = navRef.current;\r
    if (!navEl) return null;\r
\r
    gsap.set(navEl, { height: 60, overflow: 'hidden' });\r
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });\r
\r
    const tl = gsap.timeline({ paused: true });\r
\r
    tl.to(navEl, {\r
      height: calculateHeight,\r
      duration: 0.4,\r
      ease\r
    });\r
\r
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');\r
\r
    return tl;\r
  };\r
\r
  useLayoutEffect(() => {\r
    const tl = createTimeline();\r
    tlRef.current = tl;\r
\r
    return () => {\r
      tl?.kill();\r
      tlRef.current = null;\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [ease, items]);\r
\r
  useLayoutEffect(() => {\r
    const handleResize = () => {\r
      if (!tlRef.current) return;\r
\r
      if (isExpanded) {\r
        const newHeight = calculateHeight();\r
        gsap.set(navRef.current, { height: newHeight });\r
\r
        tlRef.current.kill();\r
        const newTl = createTimeline();\r
        if (newTl) {\r
          newTl.progress(1);\r
          tlRef.current = newTl;\r
        }\r
      } else {\r
        tlRef.current.kill();\r
        const newTl = createTimeline();\r
        if (newTl) {\r
          tlRef.current = newTl;\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    return () => window.removeEventListener('resize', handleResize);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [isExpanded]);\r
\r
  const toggleMenu = () => {\r
    const tl = tlRef.current;\r
    if (!tl) return;\r
    if (!isExpanded) {\r
      setIsHamburgerOpen(true);\r
      setIsExpanded(true);\r
      tl.play(0);\r
    } else {\r
      setIsHamburgerOpen(false);\r
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));\r
      tl.reverse();\r
    }\r
  };\r
\r
  const setCardRef = i => el => {\r
    if (el) cardsRef.current[i] = el;\r
  };\r
\r
  return (\r
    <div className={\`card-nav-container \${className}\`}>\r
      <nav ref={navRef} className={\`card-nav \${isExpanded ? 'open' : ''}\`} style={{ backgroundColor: baseColor }}>\r
        <div className="card-nav-top">\r
          <div\r
            className={\`hamburger-menu \${isHamburgerOpen ? 'open' : ''}\`}\r
            onClick={toggleMenu}\r
            role="button"\r
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}\r
            tabIndex={0}\r
            style={{ color: menuColor || '#000' }}\r
          >\r
            <div className="hamburger-line" />\r
            <div className="hamburger-line" />\r
          </div>\r
\r
          <div className="logo-container">\r
            <img src={logo} alt={logoAlt} className="logo" />\r
          </div>\r
\r
          <button\r
            type="button"\r
            className="card-nav-cta-button"\r
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}\r
          >\r
            Get Started\r
          </button>\r
        </div>\r
\r
        <div className="card-nav-content" aria-hidden={!isExpanded}>\r
          {(items || []).slice(0, 3).map((item, idx) => (\r
            <div\r
              key={\`\${item.label}-\${idx}\`}\r
              className="nav-card"\r
              ref={setCardRef(idx)}\r
              style={{ backgroundColor: item.bgColor, color: item.textColor }}\r
            >\r
              <div className="nav-card-label">{item.label}</div>\r
              <div className="nav-card-links">\r
                {item.links?.map((lnk, i) => (\r
                  <a key={\`\${lnk.label}-\${i}\`} className="nav-card-link" href={lnk.href} aria-label={lnk.ariaLabel}>\r
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />\r
                    {lnk.label}\r
                  </a>\r
                ))}\r
              </div>\r
            </div>\r
          ))}\r
        </div>\r
      </nav>\r
    </div>\r
  );\r
};\r
\r
export default CardNav;\r
`,W=`.card-nav-container {\r
  position: absolute;\r
  top: 2em;\r
  left: 50%;\r
  transform: translateX(-50%);\r
  width: 90%;\r
  max-width: 800px;\r
  z-index: 99;\r
  box-sizing: border-box;\r
}\r
\r
.card-nav {\r
  display: block;\r
  height: 60px;\r
  padding: 0;\r
  background-color: white;\r
  border: 0.5px solid rgba(255, 255, 255, 0.1);\r
  border-radius: 0.75rem;\r
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\r
  position: relative;\r
  overflow: hidden;\r
  will-change: height;\r
}\r
\r
.card-nav-top {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  height: 60px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding: 0.5rem 0.45rem 0.55rem 1.1rem;\r
  z-index: 2;\r
}\r
\r
.hamburger-menu {\r
  height: 100%;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  cursor: pointer;\r
  gap: 6px;\r
}\r
\r
.hamburger-menu:hover .hamburger-line {\r
  opacity: 0.75;\r
}\r
\r
.hamburger-line {\r
  width: 30px;\r
  height: 2px;\r
  background-color: currentColor;\r
  transition:\r
    transform 0.25s ease,\r
    opacity 0.2s ease,\r
    margin 0.3s ease;\r
  transform-origin: 50% 50%;\r
}\r
\r
.hamburger-menu.open .hamburger-line:first-child {\r
  transform: translateY(4px) rotate(45deg);\r
}\r
\r
.hamburger-menu.open .hamburger-line:last-child {\r
  transform: translateY(-4px) rotate(-45deg);\r
}\r
\r
.logo-container {\r
  display: flex;\r
  align-items: center;\r
  position: absolute;\r
  left: 50%;\r
  top: 50%;\r
  transform: translate(-50%, -50%);\r
}\r
\r
.logo {\r
  height: 28px;\r
}\r
\r
.card-nav-cta-button {\r
  background-color: #111;\r
  color: white;\r
  border: none;\r
  border-radius: calc(0.75rem - 0.35rem);\r
  padding: 0 1rem;\r
  height: 100%;\r
  font-weight: 500;\r
  cursor: pointer;\r
  transition: background-color 0.3s ease;\r
}\r
\r
.card-nav-cta-button:hover {\r
  background-color: #333;\r
}\r
\r
.card-nav-content {\r
  position: absolute;\r
  left: 0;\r
  right: 0;\r
  top: 60px;\r
  bottom: 0;\r
  padding: 0.5rem;\r
  display: flex;\r
  align-items: flex-end;\r
  gap: 12px;\r
  visibility: hidden;\r
  pointer-events: none;\r
  z-index: 1;\r
}\r
\r
.card-nav.open .card-nav-content {\r
  visibility: visible;\r
  pointer-events: auto;\r
}\r
\r
.nav-card {\r
  height: 100%;\r
  flex: 1 1 0;\r
  min-width: 0;\r
  border-radius: calc(0.75rem - 0.2rem);\r
  position: relative;\r
  display: flex;\r
  flex-direction: column;\r
  padding: 12px 16px;\r
  gap: 8px;\r
  user-select: none;\r
}\r
\r
.nav-card-label {\r
  font-weight: 400;\r
  font-size: 22px;\r
  letter-spacing: -0.5px;\r
}\r
\r
.nav-card-links {\r
  margin-top: auto;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 2px;\r
}\r
\r
.nav-card-link {\r
  font-size: 16px;\r
  cursor: pointer;\r
  text-decoration: none;\r
  transition: opacity 0.3s ease;\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
}\r
\r
.nav-card-link:hover {\r
  opacity: 0.75;\r
}\r
\r
@media (max-width: 768px) {\r
  .card-nav-container {\r
    width: 90%;\r
    top: 1.2em;\r
  }\r
\r
  .card-nav-top {\r
    padding: 0.5rem 1rem;\r
    justify-content: space-between;\r
  }\r
\r
  .hamburger-menu {\r
    order: 2;\r
  }\r
\r
  .logo-container {\r
    position: static;\r
    transform: none;\r
    order: 1;\r
  }\r
\r
  .card-nav-cta-button {\r
    display: none;\r
  }\r
\r
  .card-nav-content {\r
    flex-direction: column;\r
    align-items: stretch;\r
    gap: 8px;\r
    padding: 0.5rem;\r
    bottom: 0;\r
    justify-content: flex-start;\r
  }\r
\r
  .nav-card {\r
    height: auto;\r
    min-height: 60px;\r
    flex: 1 1 auto;\r
    max-height: none;\r
  }\r
\r
  .nav-card-label {\r
    font-size: 18px;\r
  }\r
\r
  .nav-card-link {\r
    font-size: 15px;\r
  }\r
}\r
`,X=`import { useLayoutEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
// use your own icon import if react-icons is not available\r
import { GoArrowUpRight } from 'react-icons/go';\r
\r
const CardNav = ({\r
  logo,\r
  logoAlt = 'Logo',\r
  items,\r
  className = '',\r
  ease = 'power3.out',\r
  baseColor = '#fff',\r
  menuColor,\r
  buttonBgColor,\r
  buttonTextColor\r
}) => {\r
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);\r
  const [isExpanded, setIsExpanded] = useState(false);\r
  const navRef = useRef(null);\r
  const cardsRef = useRef([]);\r
  const tlRef = useRef(null);\r
\r
  const calculateHeight = () => {\r
    const navEl = navRef.current;\r
    if (!navEl) return 260;\r
\r
    const isMobile = window.matchMedia('(max-width: 768px)').matches;\r
    if (isMobile) {\r
      const contentEl = navEl.querySelector('.card-nav-content');\r
      if (contentEl) {\r
        const wasVisible = contentEl.style.visibility;\r
        const wasPointerEvents = contentEl.style.pointerEvents;\r
        const wasPosition = contentEl.style.position;\r
        const wasHeight = contentEl.style.height;\r
\r
        contentEl.style.visibility = 'visible';\r
        contentEl.style.pointerEvents = 'auto';\r
        contentEl.style.position = 'static';\r
        contentEl.style.height = 'auto';\r
\r
        contentEl.offsetHeight;\r
\r
        const topBar = 60;\r
        const padding = 16;\r
        const contentHeight = contentEl.scrollHeight;\r
\r
        contentEl.style.visibility = wasVisible;\r
        contentEl.style.pointerEvents = wasPointerEvents;\r
        contentEl.style.position = wasPosition;\r
        contentEl.style.height = wasHeight;\r
\r
        return topBar + contentHeight + padding;\r
      }\r
    }\r
    return 260;\r
  };\r
\r
  const createTimeline = () => {\r
    const navEl = navRef.current;\r
    if (!navEl) return null;\r
\r
    gsap.set(navEl, { height: 60, overflow: 'hidden' });\r
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });\r
\r
    const tl = gsap.timeline({ paused: true });\r
\r
    tl.to(navEl, {\r
      height: calculateHeight,\r
      duration: 0.4,\r
      ease\r
    });\r
\r
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');\r
\r
    return tl;\r
  };\r
\r
  useLayoutEffect(() => {\r
    const tl = createTimeline();\r
    tlRef.current = tl;\r
\r
    return () => {\r
      tl?.kill();\r
      tlRef.current = null;\r
    };\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [ease, items]);\r
\r
  useLayoutEffect(() => {\r
    const handleResize = () => {\r
      if (!tlRef.current) return;\r
\r
      if (isExpanded) {\r
        const newHeight = calculateHeight();\r
        gsap.set(navRef.current, { height: newHeight });\r
\r
        tlRef.current.kill();\r
        const newTl = createTimeline();\r
        if (newTl) {\r
          newTl.progress(1);\r
          tlRef.current = newTl;\r
        }\r
      } else {\r
        tlRef.current.kill();\r
        const newTl = createTimeline();\r
        if (newTl) {\r
          tlRef.current = newTl;\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    return () => window.removeEventListener('resize', handleResize);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [isExpanded]);\r
\r
  const toggleMenu = () => {\r
    const tl = tlRef.current;\r
    if (!tl) return;\r
    if (!isExpanded) {\r
      setIsHamburgerOpen(true);\r
      setIsExpanded(true);\r
      tl.play(0);\r
    } else {\r
      setIsHamburgerOpen(false);\r
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));\r
      tl.reverse();\r
    }\r
  };\r
\r
  const setCardRef = i => el => {\r
    if (el) cardsRef.current[i] = el;\r
  };\r
\r
  return (\r
    <div\r
      className={\`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] \${className}\`}\r
    >\r
      <nav\r
        ref={navRef}\r
        className={\`card-nav \${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]\`}\r
        style={{ backgroundColor: baseColor }}\r
      >\r
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">\r
          <div\r
            className={\`hamburger-menu \${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none\`}\r
            onClick={toggleMenu}\r
            role="button"\r
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}\r
            tabIndex={0}\r
            style={{ color: menuColor || '#000' }}\r
          >\r
            <div\r
              className={\`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] \${\r
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''\r
              } group-hover:opacity-75\`}\r
            />\r
            <div\r
              className={\`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] \${\r
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''\r
              } group-hover:opacity-75\`}\r
            />\r
          </div>\r
\r
          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">\r
            <img src={logo} alt={logoAlt} className="logo h-[28px]" />\r
          </div>\r
\r
          <button\r
            type="button"\r
            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 h-full font-medium cursor-pointer transition-colors duration-300"\r
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}\r
          >\r
            Get Started\r
          </button>\r
        </div>\r
\r
        <div\r
          className={\`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] \${\r
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'\r
          } md:flex-row md:items-end md:gap-[12px]\`}\r
          aria-hidden={!isExpanded}\r
        >\r
          {(items || []).slice(0, 3).map((item, idx) => (\r
            <div\r
              key={\`\${item.label}-\${idx}\`}\r
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"\r
              ref={setCardRef(idx)}\r
              style={{ backgroundColor: item.bgColor, color: item.textColor }}\r
            >\r
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">\r
                {item.label}\r
              </div>\r
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">\r
                {item.links?.map((lnk, i) => (\r
                  <a\r
                    key={\`\${lnk.label}-\${i}\`}\r
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"\r
                    href={lnk.href}\r
                    aria-label={lnk.ariaLabel}\r
                  >\r
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />\r
                    {lnk.label}\r
                  </a>\r
                ))}\r
              </div>\r
            </div>\r
          ))}\r
        </div>\r
      </nav>\r
    </div>\r
  );\r
};\r
\r
export default CardNav;\r
`,J=`import React, { useLayoutEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
// use your own icon import if react-icons is not available\r
import { GoArrowUpRight } from 'react-icons/go';\r
import './CardNav.css';\r
\r
type CardNavLink = {\r
  label: string;\r
  href: string;\r
  ariaLabel: string;\r
};\r
\r
export type CardNavItem = {\r
  label: string;\r
  bgColor: string;\r
  textColor: string;\r
  links: CardNavLink[];\r
};\r
\r
export interface CardNavProps {\r
  logo: string;\r
  logoAlt?: string;\r
  items: CardNavItem[];\r
  className?: string;\r
  ease?: string;\r
  baseColor?: string;\r
  menuColor?: string;\r
  buttonBgColor?: string;\r
  buttonTextColor?: string;\r
}\r
\r
const CardNav: React.FC<CardNavProps> = ({\r
  logo,\r
  logoAlt = 'Logo',\r
  items,\r
  className = '',\r
  ease = 'power3.out',\r
  baseColor = '#fff',\r
  menuColor,\r
  buttonBgColor,\r
  buttonTextColor\r
}) => {\r
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);\r
  const [isExpanded, setIsExpanded] = useState(false);\r
  const navRef = useRef<HTMLDivElement | null>(null);\r
  const cardsRef = useRef<HTMLDivElement[]>([]);\r
  const tlRef = useRef<gsap.core.Timeline | null>(null);\r
\r
  const calculateHeight = () => {\r
    const navEl = navRef.current;\r
    if (!navEl) return 260;\r
\r
    const isMobile = window.matchMedia('(max-width: 768px)').matches;\r
    if (isMobile) {\r
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;\r
      if (contentEl) {\r
        const wasVisible = contentEl.style.visibility;\r
        const wasPointerEvents = contentEl.style.pointerEvents;\r
        const wasPosition = contentEl.style.position;\r
        const wasHeight = contentEl.style.height;\r
\r
        contentEl.style.visibility = 'visible';\r
        contentEl.style.pointerEvents = 'auto';\r
        contentEl.style.position = 'static';\r
        contentEl.style.height = 'auto';\r
\r
        contentEl.offsetHeight;\r
\r
        const topBar = 60;\r
        const padding = 16;\r
        const contentHeight = contentEl.scrollHeight;\r
\r
        contentEl.style.visibility = wasVisible;\r
        contentEl.style.pointerEvents = wasPointerEvents;\r
        contentEl.style.position = wasPosition;\r
        contentEl.style.height = wasHeight;\r
\r
        return topBar + contentHeight + padding;\r
      }\r
    }\r
    return 260;\r
  };\r
\r
  const createTimeline = () => {\r
    const navEl = navRef.current;\r
    if (!navEl) return null;\r
\r
    gsap.set(navEl, { height: 60, overflow: 'hidden' });\r
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });\r
\r
    const tl = gsap.timeline({ paused: true });\r
\r
    tl.to(navEl, {\r
      height: calculateHeight,\r
      duration: 0.4,\r
      ease\r
    });\r
\r
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');\r
\r
    return tl;\r
  };\r
\r
  useLayoutEffect(() => {\r
    const tl = createTimeline();\r
    tlRef.current = tl;\r
\r
    return () => {\r
      tl?.kill();\r
      tlRef.current = null;\r
    };\r
  }, [ease, items]);\r
\r
  useLayoutEffect(() => {\r
    const handleResize = () => {\r
      if (!tlRef.current) return;\r
\r
      if (isExpanded) {\r
        const newHeight = calculateHeight();\r
        gsap.set(navRef.current, { height: newHeight });\r
\r
        tlRef.current.kill();\r
        const newTl = createTimeline();\r
        if (newTl) {\r
          newTl.progress(1);\r
          tlRef.current = newTl;\r
        }\r
      } else {\r
        tlRef.current.kill();\r
        const newTl = createTimeline();\r
        if (newTl) {\r
          tlRef.current = newTl;\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    return () => window.removeEventListener('resize', handleResize);\r
  }, [isExpanded]);\r
\r
  const toggleMenu = () => {\r
    const tl = tlRef.current;\r
    if (!tl) return;\r
    if (!isExpanded) {\r
      setIsHamburgerOpen(true);\r
      setIsExpanded(true);\r
      tl.play(0);\r
    } else {\r
      setIsHamburgerOpen(false);\r
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));\r
      tl.reverse();\r
    }\r
  };\r
\r
  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {\r
    if (el) cardsRef.current[i] = el;\r
  };\r
\r
  return (\r
    <div className={\`card-nav-container \${className}\`}>\r
      <nav ref={navRef} className={\`card-nav \${isExpanded ? 'open' : ''}\`} style={{ backgroundColor: baseColor }}>\r
        <div className="card-nav-top">\r
          <div\r
            className={\`hamburger-menu \${isHamburgerOpen ? 'open' : ''}\`}\r
            onClick={toggleMenu}\r
            role="button"\r
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}\r
            tabIndex={0}\r
            style={{ color: menuColor || '#000' }}\r
          >\r
            <div className="hamburger-line" />\r
            <div className="hamburger-line" />\r
          </div>\r
\r
          <div className="logo-container">\r
            <img src={logo} alt={logoAlt} className="logo" />\r
          </div>\r
\r
          <button\r
            type="button"\r
            className="card-nav-cta-button"\r
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}\r
          >\r
            Get Started\r
          </button>\r
        </div>\r
\r
        <div className="card-nav-content" aria-hidden={!isExpanded}>\r
          {(items || []).slice(0, 3).map((item, idx) => (\r
            <div\r
              key={\`\${item.label}-\${idx}\`}\r
              className="nav-card"\r
              ref={setCardRef(idx)}\r
              style={{ backgroundColor: item.bgColor, color: item.textColor }}\r
            >\r
              <div className="nav-card-label">{item.label}</div>\r
              <div className="nav-card-links">\r
                {item.links?.map((lnk, i) => (\r
                  <a key={\`\${lnk.label}-\${i}\`} className="nav-card-link" href={lnk.href} aria-label={lnk.ariaLabel}>\r
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />\r
                    {lnk.label}\r
                  </a>\r
                ))}\r
              </div>\r
            </div>\r
          ))}\r
        </div>\r
      </nav>\r
    </div>\r
  );\r
};\r
\r
export default CardNav;\r
`,K=`import React, { useLayoutEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
// use your own icon import if react-icons is not available\r
import { GoArrowUpRight } from 'react-icons/go';\r
\r
type CardNavLink = {\r
  label: string;\r
  href: string;\r
  ariaLabel: string;\r
};\r
\r
export type CardNavItem = {\r
  label: string;\r
  bgColor: string;\r
  textColor: string;\r
  links: CardNavLink[];\r
};\r
\r
export interface CardNavProps {\r
  logo: string;\r
  logoAlt?: string;\r
  items: CardNavItem[];\r
  className?: string;\r
  ease?: string;\r
  baseColor?: string;\r
  menuColor?: string;\r
  buttonBgColor?: string;\r
  buttonTextColor?: string;\r
}\r
\r
const CardNav: React.FC<CardNavProps> = ({\r
  logo,\r
  logoAlt = 'Logo',\r
  items,\r
  className = '',\r
  ease = 'power3.out',\r
  baseColor = '#fff',\r
  menuColor,\r
  buttonBgColor,\r
  buttonTextColor\r
}) => {\r
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);\r
  const [isExpanded, setIsExpanded] = useState(false);\r
  const navRef = useRef<HTMLDivElement | null>(null);\r
  const cardsRef = useRef<HTMLDivElement[]>([]);\r
  const tlRef = useRef<gsap.core.Timeline | null>(null);\r
\r
  const calculateHeight = () => {\r
    const navEl = navRef.current;\r
    if (!navEl) return 260;\r
\r
    const isMobile = window.matchMedia('(max-width: 768px)').matches;\r
    if (isMobile) {\r
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;\r
      if (contentEl) {\r
        const wasVisible = contentEl.style.visibility;\r
        const wasPointerEvents = contentEl.style.pointerEvents;\r
        const wasPosition = contentEl.style.position;\r
        const wasHeight = contentEl.style.height;\r
\r
        contentEl.style.visibility = 'visible';\r
        contentEl.style.pointerEvents = 'auto';\r
        contentEl.style.position = 'static';\r
        contentEl.style.height = 'auto';\r
\r
        contentEl.offsetHeight;\r
\r
        const topBar = 60;\r
        const padding = 16;\r
        const contentHeight = contentEl.scrollHeight;\r
\r
        contentEl.style.visibility = wasVisible;\r
        contentEl.style.pointerEvents = wasPointerEvents;\r
        contentEl.style.position = wasPosition;\r
        contentEl.style.height = wasHeight;\r
\r
        return topBar + contentHeight + padding;\r
      }\r
    }\r
    return 260;\r
  };\r
\r
  const createTimeline = () => {\r
    const navEl = navRef.current;\r
    if (!navEl) return null;\r
\r
    gsap.set(navEl, { height: 60, overflow: 'hidden' });\r
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });\r
\r
    const tl = gsap.timeline({ paused: true });\r
\r
    tl.to(navEl, {\r
      height: calculateHeight,\r
      duration: 0.4,\r
      ease\r
    });\r
\r
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');\r
\r
    return tl;\r
  };\r
\r
  useLayoutEffect(() => {\r
    const tl = createTimeline();\r
    tlRef.current = tl;\r
\r
    return () => {\r
      tl?.kill();\r
      tlRef.current = null;\r
    };\r
  }, [ease, items]);\r
\r
  useLayoutEffect(() => {\r
    const handleResize = () => {\r
      if (!tlRef.current) return;\r
\r
      if (isExpanded) {\r
        const newHeight = calculateHeight();\r
        gsap.set(navRef.current, { height: newHeight });\r
\r
        tlRef.current.kill();\r
        const newTl = createTimeline();\r
        if (newTl) {\r
          newTl.progress(1);\r
          tlRef.current = newTl;\r
        }\r
      } else {\r
        tlRef.current.kill();\r
        const newTl = createTimeline();\r
        if (newTl) {\r
          tlRef.current = newTl;\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    return () => window.removeEventListener('resize', handleResize);\r
  }, [isExpanded]);\r
\r
  const toggleMenu = () => {\r
    const tl = tlRef.current;\r
    if (!tl) return;\r
    if (!isExpanded) {\r
      setIsHamburgerOpen(true);\r
      setIsExpanded(true);\r
      tl.play(0);\r
    } else {\r
      setIsHamburgerOpen(false);\r
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));\r
      tl.reverse();\r
    }\r
  };\r
\r
  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {\r
    if (el) cardsRef.current[i] = el;\r
  };\r
\r
  return (\r
    <div\r
      className={\`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] \${className}\`}\r
    >\r
      <nav\r
        ref={navRef}\r
        className={\`card-nav \${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]\`}\r
        style={{ backgroundColor: baseColor }}\r
      >\r
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">\r
          <div\r
            className={\`hamburger-menu \${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none\`}\r
            onClick={toggleMenu}\r
            role="button"\r
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}\r
            tabIndex={0}\r
            style={{ color: menuColor || '#000' }}\r
          >\r
            <div\r
              className={\`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] \${\r
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''\r
              } group-hover:opacity-75\`}\r
            />\r
            <div\r
              className={\`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] \${\r
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''\r
              } group-hover:opacity-75\`}\r
            />\r
          </div>\r
\r
          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">\r
            <img src={logo} alt={logoAlt} className="logo h-[28px]" />\r
          </div>\r
\r
          <button\r
            type="button"\r
            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 h-full font-medium cursor-pointer transition-colors duration-300"\r
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}\r
          >\r
            Get Started\r
          </button>\r
        </div>\r
\r
        <div\r
          className={\`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] \${\r
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'\r
          } md:flex-row md:items-end md:gap-[12px]\`}\r
          aria-hidden={!isExpanded}\r
        >\r
          {(items || []).slice(0, 3).map((item, idx) => (\r
            <div\r
              key={\`\${item.label}-\${idx}\`}\r
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"\r
              ref={setCardRef(idx)}\r
              style={{ backgroundColor: item.bgColor, color: item.textColor }}\r
            >\r
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">\r
                {item.label}\r
              </div>\r
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">\r
                {item.links?.map((lnk, i) => (\r
                  <a\r
                    key={\`\${lnk.label}-\${i}\`}\r
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"\r
                    href={lnk.href}\r
                    aria-label={lnk.ariaLabel}\r
                  >\r
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />\r
                    {lnk.label}\r
                  </a>\r
                ))}\r
              </div>\r
            </div>\r
          ))}\r
        </div>\r
      </nav>\r
    </div>\r
  );\r
};\r
\r
export default CardNav;\r
`,Q={dependencies:"gsap",usage:`import CardNav from './CardNav'
import logo from './logo.svg';

const App = () => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};`,code:Y,css:W,tailwind:X,tsCode:J,tsTailwind:K},cr=()=>{const h=[{name:"logo",type:"string",default:"-",description:"URL for the logo image"},{name:"logoAlt",type:"string",default:"Logo",description:"Alt text for the logo image"},{name:"items",type:"CardNavItem[]",default:"-",description:"Array of navigation items with label, bgColor, textColor, and links"},{name:"className",type:"string",default:"''",description:"Additional CSS classes for the navigation container"},{name:"ease",type:"string",default:"power3.out",description:"GSAP easing function for animations"},{name:"baseColor",type:"string",default:"#fff",description:"Background color for the navigation container"},{name:"menuColor",type:"string",default:"undefined",description:"Color for the hamburger menu lines"},{name:"buttonBgColor",type:"string",default:"#111",description:"Background color for the CTA button"},{name:"buttonTextColor",type:"string",default:"white",description:"Text color for the CTA button"}],[m,p]=o.useState("light"),[g,d]=o.useState("power3.out"),[x,f]=_(),y=[{value:"power3.out",label:"power3.out"},{value:"back.out(1.7)",label:"back.out(1.7)"},{value:"elastic.out(1, 0.8)",label:"elastic.out(1, 0.8)"},{value:"circ.out",label:"circ.out"}],u=[{label:"About",bgColor:"#0D0716",textColor:"#fff",links:[{label:"Company",ariaLabel:"About Company"},{label:"Careers",ariaLabel:"About Careers"}]},{label:"Projects",bgColor:"#170D27",textColor:"#fff",links:[{label:"Featured",ariaLabel:"Featured Projects"},{label:"Case Studies",ariaLabel:"Project Case Studies"}]},{label:"Contact",bgColor:"#271E37",textColor:"#fff",links:[{label:"Email",ariaLabel:"Email us"},{label:"Twitter",ariaLabel:"Twitter"},{label:"LinkedIn",ariaLabel:"LinkedIn"}]}],a={light:{logo:V,baseColor:"#fff",menuColor:"#000",buttonBgColor:"#111",buttonTextColor:"#fff",backgroundColor:"#f5f5f5",items:u},dark:{logo:T,baseColor:"#060010",menuColor:"#fff",buttonBgColor:"#5227FF",buttonTextColor:"#fff",backgroundColor:"#060010",items:u},color:{logo:T,baseColor:"#5227FF",menuColor:"#fff",buttonBgColor:"#fff",buttonTextColor:"#5227FF",backgroundColor:"#060010",items:u}}[m],l=[{value:"light",label:"Light Mode"},{value:"dark",label:"Dark Mode"},{value:"color",label:"Colorful"}];return e.jsxs(O,{children:[e.jsxs(P,{children:[e.jsx(M,{position:"relative",className:"demo-container demo-container-dots",h:550,overflow:"hidden",bg:a.backgroundColor,children:e.jsx(q,{logo:a.logo,items:a.items,baseColor:a.baseColor,menuColor:a.menuColor,buttonBgColor:a.buttonBgColor,buttonTextColor:a.buttonTextColor,ease:g},x)}),e.jsxs(F,{children:[e.jsx(N,{title:"Example",options:l,value:m,onChange:i=>{p(i),f()},width:150}),e.jsx(N,{title:"Animation Ease",options:y,value:g,onChange:i=>{d(i),f()},width:170})]}),e.jsx(B,{data:h}),e.jsx(U,{dependencyList:["gsap"]})]}),e.jsx(D,{children:e.jsx(G,{codeObject:Q})})]})};export{cr as default};
