import{r as o,g as l,j as e,L as j,B as tr}from"./index-wsKSLPNH.js";import{T as lr,P as nr,a as ir,C as ar,b as or}from"./PropTable-C4uPWs8h.js";import{C as sr}from"./Customize-1m_ZNqR9.js";import{P as cr}from"./PreviewSelect-B8u33nUa.js";import{P as ur}from"./PreviewSwitch-DqnF708j.js";import{D as fr}from"./Dependencies-BHoMfJUj.js";import{l as G}from"./react-bits-logo-small-black-B4yUq05Y.js";import{l as mr}from"./react-bits-logo-small-CT1j6F_f.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const pr=({logo:g,logoAlt:d="Logo",items:s,activeHref:u,className:M="",ease:i="power3.easeOut",baseColor:c="#fff",pillColor:L="#060010",hoveredPillTextColor:U="#060010",pillTextColor:X,onMobileMenuClick:C,initialLoadAnimation:A=!0})=>{var V,B;const J=X??c,[K,N]=o.useState(!1),b=o.useRef([]),v=o.useRef([]),x=o.useRef([]),T=o.useRef(null),z=o.useRef(null),H=o.useRef(null),E=o.useRef(null),$=o.useRef(null),P=o.useRef(null);o.useEffect(()=>{var f;const r=()=>{b.current.forEach(a=>{var F;if(!(a!=null&&a.parentElement))return;const m=a.parentElement,rr=m.getBoundingClientRect(),{width:y,height:p}=rr,w=(y*y/4+p*p)/(2*p),S=Math.ceil(2*w)+2,_=Math.ceil(w-Math.sqrt(Math.max(0,w*w-y*y/4)))+1,er=S-_;a.style.width=`${S}px`,a.style.height=`${S}px`,a.style.bottom=`-${_}px`,l.set(a,{xPercent:-50,scale:0,transformOrigin:`50% ${er}px`});const R=m.querySelector(".pill-label"),h=m.querySelector(".pill-label-hover");R&&l.set(R,{y:0}),h&&l.set(h,{y:p+12,opacity:0});const O=b.current.indexOf(a);if(O===-1)return;(F=v.current[O])==null||F.kill();const k=l.timeline({paused:!0});k.to(a,{scale:1.2,xPercent:-50,duration:2,ease:i,overwrite:"auto"},0),R&&k.to(R,{y:-(p+8),duration:2,ease:i,overwrite:"auto"},0),h&&(l.set(h,{y:Math.ceil(p+100),opacity:0}),k.to(h,{y:0,opacity:1,duration:2,ease:i,overwrite:"auto"},0)),v.current[O]=k})};r();const t=()=>r();window.addEventListener("resize",t),(f=document.fonts)!=null&&f.ready&&document.fonts.ready.then(r).catch(()=>{});const n=E.current;if(n&&l.set(n,{visibility:"hidden",opacity:0,scaleY:1}),A){const a=P.current,m=$.current;a&&(l.set(a,{scale:0}),l.to(a,{scale:1,duration:.6,ease:i})),m&&(l.set(m,{width:0,overflow:"hidden"}),l.to(m,{width:"auto",duration:.6,ease:i}))}return()=>window.removeEventListener("resize",t)},[s,i,A]);const W=r=>{var n;const t=v.current[r];t&&((n=x.current[r])==null||n.kill(),x.current[r]=t.tweenTo(t.duration(),{duration:.3,ease:i,overwrite:"auto"}))},Y=r=>{var n;const t=v.current[r];t&&((n=x.current[r])==null||n.kill(),x.current[r]=t.tweenTo(0,{duration:.2,ease:i,overwrite:"auto"}))},D=()=>{var t;const r=T.current;r&&((t=z.current)==null||t.kill(),l.set(r,{rotate:0}),z.current=l.to(r,{rotate:360,duration:.2,ease:i,overwrite:"auto"}))},Q=()=>{const r=!K;N(r);const t=H.current,n=E.current;if(t){const f=t.querySelectorAll(".hamburger-line");r?(l.to(f[0],{rotation:45,y:3,duration:.3,ease:i}),l.to(f[1],{rotation:-45,y:-3,duration:.3,ease:i})):(l.to(f[0],{rotation:0,y:0,duration:.3,ease:i}),l.to(f[1],{rotation:0,y:0,duration:.3,ease:i}))}n&&(r?(l.set(n,{visibility:"visible"}),l.fromTo(n,{opacity:0,y:10,scaleY:1},{opacity:1,y:0,scaleY:1,duration:.3,ease:i,transformOrigin:"top center"})):l.to(n,{opacity:0,y:10,scaleY:1,duration:.2,ease:i,transformOrigin:"top center",onComplete:()=>{l.set(n,{visibility:"hidden"})}})),C==null||C()},Z=r=>r.startsWith("http://")||r.startsWith("https://")||r.startsWith("//")||r.startsWith("mailto:")||r.startsWith("tel:")||r.startsWith("#"),I=r=>r&&!Z(r),q={"--base":c,"--pill-bg":L,"--hover-text":U,"--pill-text":J};return e.jsxs("div",{className:"pill-nav-container",children:[e.jsxs("nav",{className:`pill-nav ${M}`,"aria-label":"Primary",style:q,children:[I((V=s==null?void 0:s[0])==null?void 0:V.href)?e.jsx(j,{className:"pill-logo",to:s[0].href,"aria-label":"Home",onMouseEnter:D,role:"menuitem",ref:r=>{P.current=r},children:e.jsx("img",{src:g,alt:d,ref:T})}):e.jsx("a",{className:"pill-logo",href:((B=s==null?void 0:s[0])==null?void 0:B.href)||"#","aria-label":"Home",onMouseEnter:D,ref:r=>{P.current=r},children:e.jsx("img",{src:g,alt:d,ref:T})}),e.jsx("div",{className:"pill-nav-items desktop-only",ref:$,children:e.jsx("ul",{className:"pill-list",role:"menubar",children:s.map((r,t)=>e.jsx("li",{role:"none",children:I(r.href)?e.jsxs(j,{role:"menuitem",to:r.href,className:`pill${u===r.href?" is-active":""}`,"aria-label":r.ariaLabel||r.label,onMouseEnter:()=>W(t),onMouseLeave:()=>Y(t),children:[e.jsx("span",{className:"hover-circle","aria-hidden":"true",ref:n=>{b.current[t]=n}}),e.jsxs("span",{className:"label-stack",children:[e.jsx("span",{className:"pill-label",children:r.label}),e.jsx("span",{className:"pill-label-hover","aria-hidden":"true",children:r.label})]})]}):e.jsxs("a",{role:"menuitem",href:r.href,className:`pill${u===r.href?" is-active":""}`,"aria-label":r.ariaLabel||r.label,onMouseEnter:()=>W(t),onMouseLeave:()=>Y(t),children:[e.jsx("span",{className:"hover-circle","aria-hidden":"true",ref:n=>{b.current[t]=n}}),e.jsxs("span",{className:"label-stack",children:[e.jsx("span",{className:"pill-label",children:r.label}),e.jsx("span",{className:"pill-label-hover","aria-hidden":"true",children:r.label})]})]})},r.href||`item-${t}`))})}),e.jsxs("button",{className:"mobile-menu-button mobile-only",onClick:Q,"aria-label":"Toggle menu",ref:H,children:[e.jsx("span",{className:"hamburger-line"}),e.jsx("span",{className:"hamburger-line"})]})]}),e.jsx("div",{className:"mobile-menu-popover mobile-only",ref:E,style:q,children:e.jsx("ul",{className:"mobile-menu-list",children:s.map((r,t)=>e.jsx("li",{children:I(r.href)?e.jsx(j,{to:r.href,className:`mobile-menu-link${u===r.href?" is-active":""}`,onClick:()=>N(!1),children:r.label}):e.jsx("a",{href:r.href,className:`mobile-menu-link${u===r.href?" is-active":""}`,onClick:()=>N(!1),children:r.label})},r.href||`mobile-item-${t}`))})})]})},dr=`import { useEffect, useRef, useState } from 'react';\r
import { Link } from 'react-router-dom';\r
import { gsap } from 'gsap';\r
import './PillNav.css';\r
\r
const PillNav = ({\r
  logo,\r
  logoAlt = 'Logo',\r
  items,\r
  activeHref,\r
  className = '',\r
  ease = 'power3.easeOut',\r
  baseColor = '#fff',\r
  pillColor = '#060010',\r
  hoveredPillTextColor = '#060010',\r
  pillTextColor,\r
  onMobileMenuClick,\r
  initialLoadAnimation = true\r
}) => {\r
  const resolvedPillTextColor = pillTextColor ?? baseColor;\r
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\r
  const circleRefs = useRef([]);\r
  const tlRefs = useRef([]);\r
  const activeTweenRefs = useRef([]);\r
  const logoImgRef = useRef(null);\r
  const logoTweenRef = useRef(null);\r
  const hamburgerRef = useRef(null);\r
  const mobileMenuRef = useRef(null);\r
  const navItemsRef = useRef(null);\r
  const logoRef = useRef(null);\r
\r
  useEffect(() => {\r
    const layout = () => {\r
      circleRefs.current.forEach(circle => {\r
        if (!circle?.parentElement) return;\r
\r
        const pill = circle.parentElement;\r
        const rect = pill.getBoundingClientRect();\r
        const { width: w, height: h } = rect;\r
        const R = ((w * w) / 4 + h * h) / (2 * h);\r
        const D = Math.ceil(2 * R) + 2;\r
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;\r
        const originY = D - delta;\r
\r
        circle.style.width = \`\${D}px\`;\r
        circle.style.height = \`\${D}px\`;\r
        circle.style.bottom = \`-\${delta}px\`;\r
\r
        gsap.set(circle, {\r
          xPercent: -50,\r
          scale: 0,\r
          transformOrigin: \`50% \${originY}px\`\r
        });\r
\r
        const label = pill.querySelector('.pill-label');\r
        const white = pill.querySelector('.pill-label-hover');\r
\r
        if (label) gsap.set(label, { y: 0 });\r
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });\r
\r
        const index = circleRefs.current.indexOf(circle);\r
        if (index === -1) return;\r
\r
        tlRefs.current[index]?.kill();\r
        const tl = gsap.timeline({ paused: true });\r
\r
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);\r
\r
        if (label) {\r
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);\r
        }\r
\r
        if (white) {\r
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });\r
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);\r
        }\r
\r
        tlRefs.current[index] = tl;\r
      });\r
    };\r
\r
    layout();\r
\r
    const onResize = () => layout();\r
    window.addEventListener('resize', onResize);\r
\r
    if (document.fonts?.ready) {\r
      document.fonts.ready.then(layout).catch(() => {});\r
    }\r
\r
    const menu = mobileMenuRef.current;\r
    if (menu) {\r
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });\r
    }\r
\r
    if (initialLoadAnimation) {\r
      const logo = logoRef.current;\r
      const navItems = navItemsRef.current;\r
\r
      if (logo) {\r
        gsap.set(logo, { scale: 0 });\r
        gsap.to(logo, {\r
          scale: 1,\r
          duration: 0.6,\r
          ease\r
        });\r
      }\r
\r
      if (navItems) {\r
        gsap.set(navItems, { width: 0, overflow: 'hidden' });\r
        gsap.to(navItems, {\r
          width: 'auto',\r
          duration: 0.6,\r
          ease\r
        });\r
      }\r
    }\r
\r
    return () => window.removeEventListener('resize', onResize);\r
  }, [items, ease, initialLoadAnimation]);\r
\r
  const handleEnter = i => {\r
    const tl = tlRefs.current[i];\r
    if (!tl) return;\r
    activeTweenRefs.current[i]?.kill();\r
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {\r
      duration: 0.3,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const handleLeave = i => {\r
    const tl = tlRefs.current[i];\r
    if (!tl) return;\r
    activeTweenRefs.current[i]?.kill();\r
    activeTweenRefs.current[i] = tl.tweenTo(0, {\r
      duration: 0.2,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const handleLogoEnter = () => {\r
    const img = logoImgRef.current;\r
    if (!img) return;\r
    logoTweenRef.current?.kill();\r
    gsap.set(img, { rotate: 0 });\r
    logoTweenRef.current = gsap.to(img, {\r
      rotate: 360,\r
      duration: 0.2,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const toggleMobileMenu = () => {\r
    const newState = !isMobileMenuOpen;\r
    setIsMobileMenuOpen(newState);\r
\r
    const hamburger = hamburgerRef.current;\r
    const menu = mobileMenuRef.current;\r
\r
    if (hamburger) {\r
      const lines = hamburger.querySelectorAll('.hamburger-line');\r
      if (newState) {\r
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });\r
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });\r
      } else {\r
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });\r
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });\r
      }\r
    }\r
\r
    if (menu) {\r
      if (newState) {\r
        gsap.set(menu, { visibility: 'visible' });\r
        gsap.fromTo(\r
          menu,\r
          { opacity: 0, y: 10, scaleY: 1 },\r
          {\r
            opacity: 1,\r
            y: 0,\r
            scaleY: 1,\r
            duration: 0.3,\r
            ease,\r
            transformOrigin: 'top center'\r
          }\r
        );\r
      } else {\r
        gsap.to(menu, {\r
          opacity: 0,\r
          y: 10,\r
          scaleY: 1,\r
          duration: 0.2,\r
          ease,\r
          transformOrigin: 'top center',\r
          onComplete: () => {\r
            gsap.set(menu, { visibility: 'hidden' });\r
          }\r
        });\r
      }\r
    }\r
\r
    onMobileMenuClick?.();\r
  };\r
\r
  const isExternalLink = href =>\r
    href.startsWith('http://') ||\r
    href.startsWith('https://') ||\r
    href.startsWith('//') ||\r
    href.startsWith('mailto:') ||\r
    href.startsWith('tel:') ||\r
    href.startsWith('#');\r
\r
  const isRouterLink = href => href && !isExternalLink(href);\r
\r
  const cssVars = {\r
    ['--base']: baseColor,\r
    ['--pill-bg']: pillColor,\r
    ['--hover-text']: hoveredPillTextColor,\r
    ['--pill-text']: resolvedPillTextColor\r
  };\r
\r
  return (\r
    <div className="pill-nav-container">\r
      <nav className={\`pill-nav \${className}\`} aria-label="Primary" style={cssVars}>\r
        {isRouterLink(items?.[0]?.href) ? (\r
          <Link\r
            className="pill-logo"\r
            to={items[0].href}\r
            aria-label="Home"\r
            onMouseEnter={handleLogoEnter}\r
            role="menuitem"\r
            ref={el => {\r
              logoRef.current = el;\r
            }}\r
          >\r
            <img src={logo} alt={logoAlt} ref={logoImgRef} />\r
          </Link>\r
        ) : (\r
          <a\r
            className="pill-logo"\r
            href={items?.[0]?.href || '#'}\r
            aria-label="Home"\r
            onMouseEnter={handleLogoEnter}\r
            ref={el => {\r
              logoRef.current = el;\r
            }}\r
          >\r
            <img src={logo} alt={logoAlt} ref={logoImgRef} />\r
          </a>\r
        )}\r
\r
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>\r
          <ul className="pill-list" role="menubar">\r
            {items.map((item, i) => (\r
              <li key={item.href || \`item-\${i}\`} role="none">\r
                {isRouterLink(item.href) ? (\r
                  <Link\r
                    role="menuitem"\r
                    to={item.href}\r
                    className={\`pill\${activeHref === item.href ? ' is-active' : ''}\`}\r
                    aria-label={item.ariaLabel || item.label}\r
                    onMouseEnter={() => handleEnter(i)}\r
                    onMouseLeave={() => handleLeave(i)}\r
                  >\r
                    <span\r
                      className="hover-circle"\r
                      aria-hidden="true"\r
                      ref={el => {\r
                        circleRefs.current[i] = el;\r
                      }}\r
                    />\r
                    <span className="label-stack">\r
                      <span className="pill-label">{item.label}</span>\r
                      <span className="pill-label-hover" aria-hidden="true">\r
                        {item.label}\r
                      </span>\r
                    </span>\r
                  </Link>\r
                ) : (\r
                  <a\r
                    role="menuitem"\r
                    href={item.href}\r
                    className={\`pill\${activeHref === item.href ? ' is-active' : ''}\`}\r
                    aria-label={item.ariaLabel || item.label}\r
                    onMouseEnter={() => handleEnter(i)}\r
                    onMouseLeave={() => handleLeave(i)}\r
                  >\r
                    <span\r
                      className="hover-circle"\r
                      aria-hidden="true"\r
                      ref={el => {\r
                        circleRefs.current[i] = el;\r
                      }}\r
                    />\r
                    <span className="label-stack">\r
                      <span className="pill-label">{item.label}</span>\r
                      <span className="pill-label-hover" aria-hidden="true">\r
                        {item.label}\r
                      </span>\r
                    </span>\r
                  </a>\r
                )}\r
              </li>\r
            ))}\r
          </ul>\r
        </div>\r
\r
        <button\r
          className="mobile-menu-button mobile-only"\r
          onClick={toggleMobileMenu}\r
          aria-label="Toggle menu"\r
          ref={hamburgerRef}\r
        >\r
          <span className="hamburger-line" />\r
          <span className="hamburger-line" />\r
        </button>\r
      </nav>\r
\r
      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>\r
        <ul className="mobile-menu-list">\r
          {items.map((item, i) => (\r
            <li key={item.href || \`mobile-item-\${i}\`}>\r
              {isRouterLink(item.href) ? (\r
                <Link\r
                  to={item.href}\r
                  className={\`mobile-menu-link\${activeHref === item.href ? ' is-active' : ''}\`}\r
                  onClick={() => setIsMobileMenuOpen(false)}\r
                >\r
                  {item.label}\r
                </Link>\r
              ) : (\r
                <a\r
                  href={item.href}\r
                  className={\`mobile-menu-link\${activeHref === item.href ? ' is-active' : ''}\`}\r
                  onClick={() => setIsMobileMenuOpen(false)}\r
                >\r
                  {item.label}\r
                </a>\r
              )}\r
            </li>\r
          ))}\r
        </ul>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default PillNav;\r
`,hr=`.pill-nav-container {\r
  position: absolute;\r
  top: 1em;\r
  z-index: 99;\r
}\r
\r
@media (max-width: 768px) {\r
  .pill-nav-container {\r
    width: 100%;\r
    left: 0;\r
  }\r
}\r
\r
.pill-nav {\r
  --nav-h: 42px;\r
  --logo: 36px;\r
  --pill-pad-x: 18px;\r
  --pill-gap: 3px;\r
  width: max-content;\r
  display: flex;\r
  align-items: center;\r
  box-sizing: border-box;\r
}\r
\r
@media (max-width: 768px) {\r
  .pill-nav {\r
    width: 100%;\r
    justify-content: space-between;\r
    padding: 0 1rem;\r
    background: transparent;\r
  }\r
}\r
\r
.pill-nav-items {\r
  position: relative;\r
  display: flex;\r
  align-items: center;\r
  height: var(--nav-h);\r
  background: var(--base, #000);\r
  border-radius: 9999px;\r
}\r
\r
.pill-logo {\r
  width: var(--nav-h);\r
  height: var(--nav-h);\r
  border-radius: 50%;\r
  background: var(--base, #000);\r
  padding: 8px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  overflow: hidden;\r
}\r
\r
.pill-logo img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
  display: block;\r
}\r
\r
.pill-list {\r
  list-style: none;\r
  display: flex;\r
  align-items: stretch;\r
  gap: var(--pill-gap);\r
  margin: 0;\r
  padding: 3px;\r
  height: 100%;\r
}\r
\r
.pill-list > li {\r
  display: flex;\r
  height: 100%;\r
}\r
\r
.pill {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  height: 100%;\r
  padding: 0 var(--pill-pad-x);\r
  background: var(--pill-bg, #fff);\r
  color: var(--pill-text, var(--base, #000));\r
  text-decoration: none;\r
  border-radius: 9999px;\r
  box-sizing: border-box;\r
  font-weight: 600;\r
  font-size: 16px;\r
  line-height: 0;\r
  text-transform: uppercase;\r
  letter-spacing: 0.2px;\r
  white-space: nowrap;\r
  cursor: pointer;\r
  position: relative;\r
  overflow: hidden;\r
}\r
\r
.pill .hover-circle {\r
  position: absolute;\r
  left: 50%;\r
  bottom: 0;\r
  border-radius: 50%;\r
  background: var(--base, #000);\r
  z-index: 1;\r
  display: block;\r
  pointer-events: none;\r
  will-change: transform;\r
}\r
\r
.pill .label-stack {\r
  position: relative;\r
  display: inline-block;\r
  line-height: 1;\r
  z-index: 2;\r
}\r
\r
.pill .pill-label {\r
  position: relative;\r
  z-index: 2;\r
  display: inline-block;\r
  line-height: 1;\r
  will-change: transform;\r
}\r
\r
.pill .pill-label-hover {\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  color: var(--hover-text, #fff);\r
  z-index: 3;\r
  display: inline-block;\r
  will-change: transform, opacity;\r
}\r
\r
.pill.is-active::after {\r
  content: '';\r
  position: absolute;\r
  bottom: -6px;\r
  left: 50%;\r
  transform: translateX(-50%);\r
  width: 12px;\r
  height: 12px;\r
  background: var(--base, #000);\r
  border-radius: 50px;\r
  z-index: 4;\r
}\r
\r
.desktop-only {\r
  display: block;\r
}\r
\r
.mobile-only {\r
  display: none;\r
}\r
\r
@media (max-width: 768px) {\r
  .desktop-only {\r
    display: none;\r
  }\r
\r
  .mobile-only {\r
    display: block;\r
  }\r
}\r
\r
.mobile-menu-button {\r
  width: var(--nav-h);\r
  height: var(--nav-h);\r
  border-radius: 50%;\r
  background: var(--base, #000);\r
  border: none;\r
  display: none;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 4px;\r
  cursor: pointer;\r
  padding: 0;\r
  position: relative;\r
}\r
\r
@media (max-width: 768px) {\r
  .mobile-menu-button {\r
    display: flex;\r
  }\r
}\r
\r
.hamburger-line {\r
  width: 16px;\r
  height: 2px;\r
  background: var(--pill-bg, #fff);\r
  border-radius: 1px;\r
  transition: all 0.01s ease;\r
  transform-origin: center;\r
}\r
\r
.mobile-menu-popover {\r
  position: absolute;\r
  top: 3em;\r
  left: 1rem;\r
  right: 1rem;\r
  background: var(--base, #f0f0f0);\r
  border-radius: 27px;\r
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\r
  z-index: 998;\r
  opacity: 0;\r
  transform-origin: top center;\r
  visibility: hidden;\r
}\r
\r
.mobile-menu-list {\r
  list-style: none;\r
  margin: 0;\r
  padding: 3px;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 3px;\r
}\r
\r
.mobile-menu-popover .mobile-menu-link {\r
  display: block;\r
  padding: 12px 16px;\r
  color: var(--pill-text, #fff);\r
  background-color: var(--pill-bg, #fff);\r
  text-decoration: none;\r
  font-size: 16px;\r
  font-weight: 500;\r
  border-radius: 50px;\r
  transition: all 0.2s ease;\r
}\r
\r
.mobile-menu-popover .mobile-menu-link:hover {\r
  cursor: pointer;\r
  background-color: var(--base);\r
  color: var(--hover-text, #fff);\r
}\r
`,gr=`import { useEffect, useRef, useState } from 'react';\r
import { Link } from 'react-router-dom';\r
import { gsap } from 'gsap';\r
\r
const PillNav = ({\r
  logo,\r
  logoAlt = 'Logo',\r
  items,\r
  activeHref,\r
  className = '',\r
  ease = 'power3.easeOut',\r
  baseColor = '#fff',\r
  pillColor = '#060010',\r
  hoveredPillTextColor = '#060010',\r
  pillTextColor,\r
  onMobileMenuClick,\r
  initialLoadAnimation = true\r
}) => {\r
  const resolvedPillTextColor = pillTextColor ?? baseColor;\r
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\r
  const circleRefs = useRef([]);\r
  const tlRefs = useRef([]);\r
  const activeTweenRefs = useRef([]);\r
  const logoImgRef = useRef(null);\r
  const logoTweenRef = useRef(null);\r
  const hamburgerRef = useRef(null);\r
  const mobileMenuRef = useRef(null);\r
  const navItemsRef = useRef(null);\r
  const logoRef = useRef(null);\r
\r
  useEffect(() => {\r
    const layout = () => {\r
      circleRefs.current.forEach(circle => {\r
        if (!circle?.parentElement) return;\r
\r
        const pill = circle.parentElement;\r
        const rect = pill.getBoundingClientRect();\r
        const { width: w, height: h } = rect;\r
        const R = ((w * w) / 4 + h * h) / (2 * h);\r
        const D = Math.ceil(2 * R) + 2;\r
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;\r
        const originY = D - delta;\r
\r
        circle.style.width = \`\${D}px\`;\r
        circle.style.height = \`\${D}px\`;\r
        circle.style.bottom = \`-\${delta}px\`;\r
\r
        gsap.set(circle, {\r
          xPercent: -50,\r
          scale: 0,\r
          transformOrigin: \`50% \${originY}px\`\r
        });\r
\r
        const label = pill.querySelector('.pill-label');\r
        const white = pill.querySelector('.pill-label-hover');\r
\r
        if (label) gsap.set(label, { y: 0 });\r
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });\r
\r
        const index = circleRefs.current.indexOf(circle);\r
        if (index === -1) return;\r
\r
        tlRefs.current[index]?.kill();\r
        const tl = gsap.timeline({ paused: true });\r
\r
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);\r
\r
        if (label) {\r
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);\r
        }\r
\r
        if (white) {\r
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });\r
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);\r
        }\r
\r
        tlRefs.current[index] = tl;\r
      });\r
    };\r
\r
    layout();\r
\r
    const onResize = () => layout();\r
    window.addEventListener('resize', onResize);\r
\r
    if (document.fonts?.ready) {\r
      document.fonts.ready.then(layout).catch(() => {});\r
    }\r
\r
    const menu = mobileMenuRef.current;\r
    if (menu) {\r
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });\r
    }\r
\r
    if (initialLoadAnimation) {\r
      const logo = logoRef.current;\r
      const navItems = navItemsRef.current;\r
\r
      if (logo) {\r
        gsap.set(logo, { scale: 0 });\r
        gsap.to(logo, {\r
          scale: 1,\r
          duration: 0.6,\r
          ease\r
        });\r
      }\r
\r
      if (navItems) {\r
        gsap.set(navItems, { width: 0, overflow: 'hidden' });\r
        gsap.to(navItems, {\r
          width: 'auto',\r
          duration: 0.6,\r
          ease\r
        });\r
      }\r
    }\r
\r
    return () => window.removeEventListener('resize', onResize);\r
  }, [items, ease, initialLoadAnimation]);\r
\r
  const handleEnter = i => {\r
    const tl = tlRefs.current[i];\r
    if (!tl) return;\r
    activeTweenRefs.current[i]?.kill();\r
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {\r
      duration: 0.3,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const handleLeave = i => {\r
    const tl = tlRefs.current[i];\r
    if (!tl) return;\r
    activeTweenRefs.current[i]?.kill();\r
    activeTweenRefs.current[i] = tl.tweenTo(0, {\r
      duration: 0.2,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const handleLogoEnter = () => {\r
    const img = logoImgRef.current;\r
    if (!img) return;\r
    logoTweenRef.current?.kill();\r
    gsap.set(img, { rotate: 0 });\r
    logoTweenRef.current = gsap.to(img, {\r
      rotate: 360,\r
      duration: 0.2,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const toggleMobileMenu = () => {\r
    const newState = !isMobileMenuOpen;\r
    setIsMobileMenuOpen(newState);\r
\r
    const hamburger = hamburgerRef.current;\r
    const menu = mobileMenuRef.current;\r
\r
    if (hamburger) {\r
      const lines = hamburger.querySelectorAll('.hamburger-line');\r
      if (newState) {\r
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });\r
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });\r
      } else {\r
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });\r
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });\r
      }\r
    }\r
\r
    if (menu) {\r
      if (newState) {\r
        gsap.set(menu, { visibility: 'visible' });\r
        gsap.fromTo(\r
          menu,\r
          { opacity: 0, y: 10, scaleY: 1 },\r
          {\r
            opacity: 1,\r
            y: 0,\r
            scaleY: 1,\r
            duration: 0.3,\r
            ease,\r
            transformOrigin: 'top center'\r
          }\r
        );\r
      } else {\r
        gsap.to(menu, {\r
          opacity: 0,\r
          y: 10,\r
          scaleY: 1,\r
          duration: 0.2,\r
          ease,\r
          transformOrigin: 'top center',\r
          onComplete: () => {\r
            gsap.set(menu, { visibility: 'hidden' });\r
          }\r
        });\r
      }\r
    }\r
\r
    onMobileMenuClick?.();\r
  };\r
\r
  const isExternalLink = href =>\r
    href.startsWith('http://') ||\r
    href.startsWith('https://') ||\r
    href.startsWith('//') ||\r
    href.startsWith('mailto:') ||\r
    href.startsWith('tel:') ||\r
    href.startsWith('#');\r
\r
  const isRouterLink = href => href && !isExternalLink(href);\r
\r
  const cssVars = {\r
    ['--base']: baseColor,\r
    ['--pill-bg']: pillColor,\r
    ['--hover-text']: hoveredPillTextColor,\r
    ['--pill-text']: resolvedPillTextColor,\r
    ['--nav-h']: '42px',\r
    ['--logo']: '36px',\r
    ['--pill-pad-x']: '18px',\r
    ['--pill-gap']: '3px'\r
  };\r
\r
  return (\r
    <div className="absolute top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto">\r
      <nav\r
        className={\`w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 \${className}\`}\r
        aria-label="Primary"\r
        style={cssVars}\r
      >\r
        {isRouterLink(items?.[0]?.href) ? (\r
          <Link\r
            to={items[0].href}\r
            aria-label="Home"\r
            onMouseEnter={handleLogoEnter}\r
            role="menuitem"\r
            ref={el => {\r
              logoRef.current = el;\r
            }}\r
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"\r
            style={{\r
              width: 'var(--nav-h)',\r
              height: 'var(--nav-h)',\r
              background: 'var(--base, #000)'\r
            }}\r
          >\r
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />\r
          </Link>\r
        ) : (\r
          <a\r
            href={items?.[0]?.href || '#'}\r
            aria-label="Home"\r
            onMouseEnter={handleLogoEnter}\r
            ref={el => {\r
              logoRef.current = el;\r
            }}\r
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"\r
            style={{\r
              width: 'var(--nav-h)',\r
              height: 'var(--nav-h)',\r
              background: 'var(--base, #000)'\r
            }}\r
          >\r
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />\r
          </a>\r
        )}\r
\r
        <div\r
          ref={navItemsRef}\r
          className="relative items-center rounded-full hidden md:flex ml-2"\r
          style={{\r
            height: 'var(--nav-h)',\r
            background: 'var(--base, #000)'\r
          }}\r
        >\r
          <ul\r
            role="menubar"\r
            className="list-none flex items-stretch m-0 p-[3px] h-full"\r
            style={{ gap: 'var(--pill-gap)' }}\r
          >\r
            {items.map((item, i) => {\r
              const isActive = activeHref === item.href;\r
\r
              const pillStyle = {\r
                background: 'var(--pill-bg, #fff)',\r
                color: 'var(--pill-text, var(--base, #000))',\r
                paddingLeft: 'var(--pill-pad-x)',\r
                paddingRight: 'var(--pill-pad-x)'\r
              };\r
\r
              const PillContent = (\r
                <>\r
                  <span\r
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"\r
                    style={{\r
                      background: 'var(--base, #000)',\r
                      willChange: 'transform'\r
                    }}\r
                    aria-hidden="true"\r
                    ref={el => {\r
                      circleRefs.current[i] = el;\r
                    }}\r
                  />\r
                  <span className="label-stack relative inline-block leading-[1] z-[2]">\r
                    <span\r
                      className="pill-label relative z-[2] inline-block leading-[1]"\r
                      style={{ willChange: 'transform' }}\r
                    >\r
                      {item.label}\r
                    </span>\r
                    <span\r
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"\r
                      style={{\r
                        color: 'var(--hover-text, #fff)',\r
                        willChange: 'transform, opacity'\r
                      }}\r
                      aria-hidden="true"\r
                    >\r
                      {item.label}\r
                    </span>\r
                  </span>\r
                  {isActive && (\r
                    <span\r
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"\r
                      style={{ background: 'var(--base, #000)' }}\r
                      aria-hidden="true"\r
                    />\r
                  )}\r
                </>\r
              );\r
\r
              const basePillClasses =\r
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0';\r
\r
              return (\r
                <li key={item.href} role="none" className="flex h-full">\r
                  {isRouterLink(item.href) ? (\r
                    <Link\r
                      role="menuitem"\r
                      to={item.href}\r
                      className={basePillClasses}\r
                      style={pillStyle}\r
                      aria-label={item.ariaLabel || item.label}\r
                      onMouseEnter={() => handleEnter(i)}\r
                      onMouseLeave={() => handleLeave(i)}\r
                    >\r
                      {PillContent}\r
                    </Link>\r
                  ) : (\r
                    <a\r
                      role="menuitem"\r
                      href={item.href}\r
                      className={basePillClasses}\r
                      style={pillStyle}\r
                      aria-label={item.ariaLabel || item.label}\r
                      onMouseEnter={() => handleEnter(i)}\r
                      onMouseLeave={() => handleLeave(i)}\r
                    >\r
                      {PillContent}\r
                    </a>\r
                  )}\r
                </li>\r
              );\r
            })}\r
          </ul>\r
        </div>\r
\r
        <button\r
          ref={hamburgerRef}\r
          onClick={toggleMobileMenu}\r
          aria-label="Toggle menu"\r
          aria-expanded={isMobileMenuOpen}\r
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"\r
          style={{\r
            width: 'var(--nav-h)',\r
            height: 'var(--nav-h)',\r
            background: 'var(--base, #000)'\r
          }}\r
        >\r
          <span\r
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"\r
            style={{ background: 'var(--pill-bg, #fff)' }}\r
          />\r
          <span\r
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"\r
            style={{ background: 'var(--pill-bg, #fff)' }}\r
          />\r
        </button>\r
      </nav>\r
\r
      <div\r
        ref={mobileMenuRef}\r
        className="md:hidden absolute top-[3em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top"\r
        style={{\r
          ...cssVars,\r
          background: 'var(--base, #f0f0f0)'\r
        }}\r
      >\r
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">\r
          {items.map(item => {\r
            const defaultStyle = {\r
              background: 'var(--pill-bg, #fff)',\r
              color: 'var(--pill-text, #fff)'\r
            };\r
            const hoverIn = e => {\r
              e.currentTarget.style.background = 'var(--base)';\r
              e.currentTarget.style.color = 'var(--hover-text, #fff)';\r
            };\r
            const hoverOut = e => {\r
              e.currentTarget.style.background = 'var(--pill-bg, #fff)';\r
              e.currentTarget.style.color = 'var(--pill-text, #fff)';\r
            };\r
\r
            const linkClasses =\r
              'block py-3 px-4 text-[16px] font-medium rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]';\r
\r
            return (\r
              <li key={item.href}>\r
                {isRouterLink(item.href) ? (\r
                  <Link\r
                    to={item.href}\r
                    className={linkClasses}\r
                    style={defaultStyle}\r
                    onMouseEnter={hoverIn}\r
                    onMouseLeave={hoverOut}\r
                    onClick={() => setIsMobileMenuOpen(false)}\r
                  >\r
                    {item.label}\r
                  </Link>\r
                ) : (\r
                  <a\r
                    href={item.href}\r
                    className={linkClasses}\r
                    style={defaultStyle}\r
                    onMouseEnter={hoverIn}\r
                    onMouseLeave={hoverOut}\r
                    onClick={() => setIsMobileMenuOpen(false)}\r
                  >\r
                    {item.label}\r
                  </a>\r
                )}\r
              </li>\r
            );\r
          })}\r
        </ul>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default PillNav;\r
`,br=`import React, { useEffect, useRef, useState } from 'react';\r
import { Link } from 'react-router-dom';\r
import { gsap } from 'gsap';\r
import './PillNav.css';\r
\r
export type PillNavItem = {\r
  label: string;\r
  href: string;\r
  ariaLabel?: string;\r
};\r
\r
export interface PillNavProps {\r
  logo: string;\r
  logoAlt?: string;\r
  items: PillNavItem[];\r
  activeHref?: string;\r
  className?: string;\r
  ease?: string;\r
  baseColor?: string;\r
  pillColor?: string;\r
  hoveredPillTextColor?: string;\r
  pillTextColor?: string;\r
  onMobileMenuClick?: () => void;\r
  initialLoadAnimation?: boolean;\r
}\r
\r
const PillNav: React.FC<PillNavProps> = ({\r
  logo,\r
  logoAlt = 'Logo',\r
  items,\r
  activeHref,\r
  className = '',\r
  ease = 'power3.easeOut',\r
  baseColor = '#fff',\r
  pillColor = '#060010',\r
  hoveredPillTextColor = '#060010',\r
  pillTextColor,\r
  onMobileMenuClick,\r
  initialLoadAnimation = true\r
}) => {\r
  const resolvedPillTextColor = pillTextColor ?? baseColor;\r
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\r
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);\r
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);\r
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);\r
  const logoImgRef = useRef<HTMLImageElement | null>(null);\r
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);\r
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);\r
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);\r
  const navItemsRef = useRef<HTMLDivElement | null>(null);\r
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);\r
\r
  useEffect(() => {\r
    const layout = () => {\r
      circleRefs.current.forEach(circle => {\r
        if (!circle?.parentElement) return;\r
\r
        const pill = circle.parentElement as HTMLElement;\r
        const rect = pill.getBoundingClientRect();\r
        const { width: w, height: h } = rect;\r
        const R = ((w * w) / 4 + h * h) / (2 * h);\r
        const D = Math.ceil(2 * R) + 2;\r
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;\r
        const originY = D - delta;\r
\r
        circle.style.width = \`\${D}px\`;\r
        circle.style.height = \`\${D}px\`;\r
        circle.style.bottom = \`-\${delta}px\`;\r
\r
        gsap.set(circle, {\r
          xPercent: -50,\r
          scale: 0,\r
          transformOrigin: \`50% \${originY}px\`\r
        });\r
\r
        const label = pill.querySelector<HTMLElement>('.pill-label');\r
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');\r
\r
        if (label) gsap.set(label, { y: 0 });\r
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });\r
\r
        const index = circleRefs.current.indexOf(circle);\r
        if (index === -1) return;\r
\r
        tlRefs.current[index]?.kill();\r
        const tl = gsap.timeline({ paused: true });\r
\r
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);\r
\r
        if (label) {\r
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);\r
        }\r
\r
        if (white) {\r
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });\r
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);\r
        }\r
\r
        tlRefs.current[index] = tl;\r
      });\r
    };\r
\r
    layout();\r
\r
    const onResize = () => layout();\r
    window.addEventListener('resize', onResize);\r
\r
    if (document.fonts?.ready) {\r
      document.fonts.ready.then(layout).catch(() => {});\r
    }\r
\r
    const menu = mobileMenuRef.current;\r
    if (menu) {\r
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });\r
    }\r
\r
    if (initialLoadAnimation) {\r
      const logo = logoRef.current;\r
      const navItems = navItemsRef.current;\r
\r
      if (logo) {\r
        gsap.set(logo, { scale: 0 });\r
        gsap.to(logo, {\r
          scale: 1,\r
          duration: 0.6,\r
          ease\r
        });\r
      }\r
\r
      if (navItems) {\r
        gsap.set(navItems, { width: 0, overflow: 'hidden' });\r
        gsap.to(navItems, {\r
          width: 'auto',\r
          duration: 0.6,\r
          ease\r
        });\r
      }\r
    }\r
\r
    return () => window.removeEventListener('resize', onResize);\r
  }, [items, ease, initialLoadAnimation]);\r
\r
  const handleEnter = (i: number) => {\r
    const tl = tlRefs.current[i];\r
    if (!tl) return;\r
    activeTweenRefs.current[i]?.kill();\r
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {\r
      duration: 0.3,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const handleLeave = (i: number) => {\r
    const tl = tlRefs.current[i];\r
    if (!tl) return;\r
    activeTweenRefs.current[i]?.kill();\r
    activeTweenRefs.current[i] = tl.tweenTo(0, {\r
      duration: 0.2,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const handleLogoEnter = () => {\r
    const img = logoImgRef.current;\r
    if (!img) return;\r
    logoTweenRef.current?.kill();\r
    gsap.set(img, { rotate: 0 });\r
    logoTweenRef.current = gsap.to(img, {\r
      rotate: 360,\r
      duration: 0.2,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const toggleMobileMenu = () => {\r
    const newState = !isMobileMenuOpen;\r
    setIsMobileMenuOpen(newState);\r
\r
    const hamburger = hamburgerRef.current;\r
    const menu = mobileMenuRef.current;\r
\r
    if (hamburger) {\r
      const lines = hamburger.querySelectorAll('.hamburger-line');\r
      if (newState) {\r
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });\r
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });\r
      } else {\r
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });\r
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });\r
      }\r
    }\r
\r
    if (menu) {\r
      if (newState) {\r
        gsap.set(menu, { visibility: 'visible' });\r
        gsap.fromTo(\r
          menu,\r
          { opacity: 0, y: 10, scaleY: 1 },\r
          {\r
            opacity: 1,\r
            y: 0,\r
            scaleY: 1,\r
            duration: 0.3,\r
            ease,\r
            transformOrigin: 'top center'\r
          }\r
        );\r
      } else {\r
        gsap.to(menu, {\r
          opacity: 0,\r
          y: 10,\r
          scaleY: 1,\r
          duration: 0.2,\r
          ease,\r
          transformOrigin: 'top center',\r
          onComplete: () => {\r
            gsap.set(menu, { visibility: 'hidden' });\r
          }\r
        });\r
      }\r
    }\r
\r
    onMobileMenuClick?.();\r
  };\r
\r
  const isExternalLink = (href: string) =>\r
    href.startsWith('http://') ||\r
    href.startsWith('https://') ||\r
    href.startsWith('//') ||\r
    href.startsWith('mailto:') ||\r
    href.startsWith('tel:') ||\r
    href.startsWith('#');\r
\r
  const isRouterLink = (href?: string) => href && !isExternalLink(href);\r
\r
  const cssVars = {\r
    ['--base']: baseColor,\r
    ['--pill-bg']: pillColor,\r
    ['--hover-text']: hoveredPillTextColor,\r
    ['--pill-text']: resolvedPillTextColor\r
  } as React.CSSProperties;\r
\r
  return (\r
    <div className="pill-nav-container">\r
      <nav className={\`pill-nav \${className}\`} aria-label="Primary" style={cssVars}>\r
        {isRouterLink(items?.[0]?.href) ? (\r
          <Link\r
            className="pill-logo"\r
            to={items[0].href}\r
            aria-label="Home"\r
            onMouseEnter={handleLogoEnter}\r
            role="menuitem"\r
            ref={el => {\r
              logoRef.current = el;\r
            }}\r
          >\r
            <img src={logo} alt={logoAlt} ref={logoImgRef} />\r
          </Link>\r
        ) : (\r
          <a\r
            className="pill-logo"\r
            href={items?.[0]?.href || '#'}\r
            aria-label="Home"\r
            onMouseEnter={handleLogoEnter}\r
            ref={el => {\r
              logoRef.current = el;\r
            }}\r
          >\r
            <img src={logo} alt={logoAlt} ref={logoImgRef} />\r
          </a>\r
        )}\r
\r
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>\r
          <ul className="pill-list" role="menubar">\r
            {items.map((item, i) => (\r
              <li key={item.href} role="none">\r
                {isRouterLink(item.href) ? (\r
                  <Link\r
                    role="menuitem"\r
                    to={item.href}\r
                    className={\`pill\${activeHref === item.href ? ' is-active' : ''}\`}\r
                    aria-label={item.ariaLabel || item.label}\r
                    onMouseEnter={() => handleEnter(i)}\r
                    onMouseLeave={() => handleLeave(i)}\r
                  >\r
                    <span\r
                      className="hover-circle"\r
                      aria-hidden="true"\r
                      ref={el => {\r
                        circleRefs.current[i] = el;\r
                      }}\r
                    />\r
                    <span className="label-stack">\r
                      <span className="pill-label">{item.label}</span>\r
                      <span className="pill-label-hover" aria-hidden="true">\r
                        {item.label}\r
                      </span>\r
                    </span>\r
                  </Link>\r
                ) : (\r
                  <a\r
                    role="menuitem"\r
                    href={item.href}\r
                    className={\`pill\${activeHref === item.href ? ' is-active' : ''}\`}\r
                    aria-label={item.ariaLabel || item.label}\r
                    onMouseEnter={() => handleEnter(i)}\r
                    onMouseLeave={() => handleLeave(i)}\r
                  >\r
                    <span\r
                      className="hover-circle"\r
                      aria-hidden="true"\r
                      ref={el => {\r
                        circleRefs.current[i] = el;\r
                      }}\r
                    />\r
                    <span className="label-stack">\r
                      <span className="pill-label">{item.label}</span>\r
                      <span className="pill-label-hover" aria-hidden="true">\r
                        {item.label}\r
                      </span>\r
                    </span>\r
                  </a>\r
                )}\r
              </li>\r
            ))}\r
          </ul>\r
        </div>\r
\r
        <button\r
          className="mobile-menu-button mobile-only"\r
          onClick={toggleMobileMenu}\r
          aria-label="Toggle menu"\r
          ref={hamburgerRef}\r
        >\r
          <span className="hamburger-line" />\r
          <span className="hamburger-line" />\r
        </button>\r
      </nav>\r
\r
      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>\r
        <ul className="mobile-menu-list">\r
          {items.map(item => (\r
            <li key={item.href}>\r
              {isRouterLink(item.href) ? (\r
                <Link\r
                  to={item.href}\r
                  className={\`mobile-menu-link\${activeHref === item.href ? ' is-active' : ''}\`}\r
                  onClick={() => setIsMobileMenuOpen(false)}\r
                >\r
                  {item.label}\r
                </Link>\r
              ) : (\r
                <a\r
                  href={item.href}\r
                  className={\`mobile-menu-link\${activeHref === item.href ? ' is-active' : ''}\`}\r
                  onClick={() => setIsMobileMenuOpen(false)}\r
                >\r
                  {item.label}\r
                </a>\r
              )}\r
            </li>\r
          ))}\r
        </ul>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default PillNav;\r
`,vr=`import React, { useEffect, useRef, useState } from 'react';\r
import { Link } from 'react-router-dom';\r
import { gsap } from 'gsap';\r
\r
export type PillNavItem = {\r
  label: string;\r
  href: string;\r
  ariaLabel?: string;\r
};\r
\r
export interface PillNavProps {\r
  logo: string;\r
  logoAlt?: string;\r
  items: PillNavItem[];\r
  activeHref?: string;\r
  className?: string;\r
  ease?: string;\r
  baseColor?: string;\r
  pillColor?: string;\r
  hoveredPillTextColor?: string;\r
  pillTextColor?: string;\r
  onMobileMenuClick?: () => void;\r
  initialLoadAnimation?: boolean;\r
}\r
\r
const PillNav: React.FC<PillNavProps> = ({\r
  logo,\r
  logoAlt = 'Logo',\r
  items,\r
  activeHref,\r
  className = '',\r
  ease = 'power3.easeOut',\r
  baseColor = '#fff',\r
  pillColor = '#060010',\r
  hoveredPillTextColor = '#060010',\r
  pillTextColor,\r
  onMobileMenuClick,\r
  initialLoadAnimation = true\r
}) => {\r
  const resolvedPillTextColor = pillTextColor ?? baseColor;\r
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\r
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);\r
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);\r
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);\r
  const logoImgRef = useRef<HTMLImageElement | null>(null);\r
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);\r
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);\r
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);\r
  const navItemsRef = useRef<HTMLDivElement | null>(null);\r
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);\r
\r
  useEffect(() => {\r
    const layout = () => {\r
      circleRefs.current.forEach(circle => {\r
        if (!circle?.parentElement) return;\r
\r
        const pill = circle.parentElement as HTMLElement;\r
        const rect = pill.getBoundingClientRect();\r
        const { width: w, height: h } = rect;\r
        const R = ((w * w) / 4 + h * h) / (2 * h);\r
        const D = Math.ceil(2 * R) + 2;\r
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;\r
        const originY = D - delta;\r
\r
        circle.style.width = \`\${D}px\`;\r
        circle.style.height = \`\${D}px\`;\r
        circle.style.bottom = \`-\${delta}px\`;\r
\r
        gsap.set(circle, {\r
          xPercent: -50,\r
          scale: 0,\r
          transformOrigin: \`50% \${originY}px\`\r
        });\r
\r
        const label = pill.querySelector<HTMLElement>('.pill-label');\r
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');\r
\r
        if (label) gsap.set(label, { y: 0 });\r
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });\r
\r
        const index = circleRefs.current.indexOf(circle);\r
        if (index === -1) return;\r
\r
        tlRefs.current[index]?.kill();\r
        const tl = gsap.timeline({ paused: true });\r
\r
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);\r
\r
        if (label) {\r
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);\r
        }\r
\r
        if (white) {\r
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });\r
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);\r
        }\r
\r
        tlRefs.current[index] = tl;\r
      });\r
    };\r
\r
    layout();\r
\r
    const onResize = () => layout();\r
    window.addEventListener('resize', onResize);\r
\r
    if (document.fonts) {\r
      document.fonts.ready.then(layout).catch(() => {});\r
    }\r
\r
    const menu = mobileMenuRef.current;\r
    if (menu) {\r
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });\r
    }\r
\r
    if (initialLoadAnimation) {\r
      const logo = logoRef.current;\r
      const navItems = navItemsRef.current;\r
\r
      if (logo) {\r
        gsap.set(logo, { scale: 0 });\r
        gsap.to(logo, {\r
          scale: 1,\r
          duration: 0.6,\r
          ease\r
        });\r
      }\r
\r
      if (navItems) {\r
        gsap.set(navItems, { width: 0, overflow: 'hidden' });\r
        gsap.to(navItems, {\r
          width: 'auto',\r
          duration: 0.6,\r
          ease\r
        });\r
      }\r
    }\r
\r
    return () => window.removeEventListener('resize', onResize);\r
  }, [items, ease, initialLoadAnimation]);\r
\r
  const handleEnter = (i: number) => {\r
    const tl = tlRefs.current[i];\r
    if (!tl) return;\r
    activeTweenRefs.current[i]?.kill();\r
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {\r
      duration: 0.3,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const handleLeave = (i: number) => {\r
    const tl = tlRefs.current[i];\r
    if (!tl) return;\r
    activeTweenRefs.current[i]?.kill();\r
    activeTweenRefs.current[i] = tl.tweenTo(0, {\r
      duration: 0.2,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const handleLogoEnter = () => {\r
    const img = logoImgRef.current;\r
    if (!img) return;\r
    logoTweenRef.current?.kill();\r
    gsap.set(img, { rotate: 0 });\r
    logoTweenRef.current = gsap.to(img, {\r
      rotate: 360,\r
      duration: 0.2,\r
      ease,\r
      overwrite: 'auto'\r
    });\r
  };\r
\r
  const toggleMobileMenu = () => {\r
    const newState = !isMobileMenuOpen;\r
    setIsMobileMenuOpen(newState);\r
\r
    const hamburger = hamburgerRef.current;\r
    const menu = mobileMenuRef.current;\r
\r
    if (hamburger) {\r
      const lines = hamburger.querySelectorAll('.hamburger-line');\r
      if (newState) {\r
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });\r
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });\r
      } else {\r
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });\r
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });\r
      }\r
    }\r
\r
    if (menu) {\r
      if (newState) {\r
        gsap.set(menu, { visibility: 'visible' });\r
        gsap.fromTo(\r
          menu,\r
          { opacity: 0, y: 10, scaleY: 1 },\r
          {\r
            opacity: 1,\r
            y: 0,\r
            scaleY: 1,\r
            duration: 0.3,\r
            ease,\r
            transformOrigin: 'top center'\r
          }\r
        );\r
      } else {\r
        gsap.to(menu, {\r
          opacity: 0,\r
          y: 10,\r
          scaleY: 1,\r
          duration: 0.2,\r
          ease,\r
          transformOrigin: 'top center',\r
          onComplete: () => {\r
            gsap.set(menu, { visibility: 'hidden' });\r
          }\r
        });\r
      }\r
    }\r
\r
    onMobileMenuClick?.();\r
  };\r
\r
  const isExternalLink = (href: string) =>\r
    href.startsWith('http://') ||\r
    href.startsWith('https://') ||\r
    href.startsWith('//') ||\r
    href.startsWith('mailto:') ||\r
    href.startsWith('tel:') ||\r
    href.startsWith('#');\r
\r
  const isRouterLink = (href?: string) => href && !isExternalLink(href);\r
\r
  const cssVars = {\r
    ['--base']: baseColor,\r
    ['--pill-bg']: pillColor,\r
    ['--hover-text']: hoveredPillTextColor,\r
    ['--pill-text']: resolvedPillTextColor,\r
    ['--nav-h']: '42px',\r
    ['--logo']: '36px',\r
    ['--pill-pad-x']: '18px',\r
    ['--pill-gap']: '3px'\r
  } as React.CSSProperties;\r
\r
  return (\r
    <div className="absolute top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto">\r
      <nav\r
        className={\`w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 \${className}\`}\r
        aria-label="Primary"\r
        style={cssVars}\r
      >\r
        {isRouterLink(items?.[0]?.href) ? (\r
          <Link\r
            to={items[0].href}\r
            aria-label="Home"\r
            onMouseEnter={handleLogoEnter}\r
            role="menuitem"\r
            ref={el => {\r
              logoRef.current = el;\r
            }}\r
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"\r
            style={{\r
              width: 'var(--nav-h)',\r
              height: 'var(--nav-h)',\r
              background: 'var(--base, #000)'\r
            }}\r
          >\r
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />\r
          </Link>\r
        ) : (\r
          <a\r
            href={items?.[0]?.href || '#'}\r
            aria-label="Home"\r
            onMouseEnter={handleLogoEnter}\r
            ref={el => {\r
              logoRef.current = el;\r
            }}\r
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"\r
            style={{\r
              width: 'var(--nav-h)',\r
              height: 'var(--nav-h)',\r
              background: 'var(--base, #000)'\r
            }}\r
          >\r
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />\r
          </a>\r
        )}\r
\r
        <div\r
          ref={navItemsRef}\r
          className="relative items-center rounded-full hidden md:flex ml-2"\r
          style={{\r
            height: 'var(--nav-h)',\r
            background: 'var(--base, #000)'\r
          }}\r
        >\r
          <ul\r
            role="menubar"\r
            className="list-none flex items-stretch m-0 p-[3px] h-full"\r
            style={{ gap: 'var(--pill-gap)' }}\r
          >\r
            {items.map((item, i) => {\r
              const isActive = activeHref === item.href;\r
\r
              const pillStyle: React.CSSProperties = {\r
                background: 'var(--pill-bg, #fff)',\r
                color: 'var(--pill-text, var(--base, #000))',\r
                paddingLeft: 'var(--pill-pad-x)',\r
                paddingRight: 'var(--pill-pad-x)'\r
              };\r
\r
              const PillContent = (\r
                <>\r
                  <span\r
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"\r
                    style={{\r
                      background: 'var(--base, #000)',\r
                      willChange: 'transform'\r
                    }}\r
                    aria-hidden="true"\r
                    ref={el => {\r
                      circleRefs.current[i] = el;\r
                    }}\r
                  />\r
                  <span className="label-stack relative inline-block leading-[1] z-[2]">\r
                    <span\r
                      className="pill-label relative z-[2] inline-block leading-[1]"\r
                      style={{ willChange: 'transform' }}\r
                    >\r
                      {item.label}\r
                    </span>\r
                    <span\r
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"\r
                      style={{\r
                        color: 'var(--hover-text, #fff)',\r
                        willChange: 'transform, opacity'\r
                      }}\r
                      aria-hidden="true"\r
                    >\r
                      {item.label}\r
                    </span>\r
                  </span>\r
                  {isActive && (\r
                    <span\r
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"\r
                      style={{ background: 'var(--base, #000)' }}\r
                      aria-hidden="true"\r
                    />\r
                  )}\r
                </>\r
              );\r
\r
              const basePillClasses =\r
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0';\r
\r
              return (\r
                <li key={item.href} role="none" className="flex h-full">\r
                  {isRouterLink(item.href) ? (\r
                    <Link\r
                      role="menuitem"\r
                      to={item.href}\r
                      className={basePillClasses}\r
                      style={pillStyle}\r
                      aria-label={item.ariaLabel || item.label}\r
                      onMouseEnter={() => handleEnter(i)}\r
                      onMouseLeave={() => handleLeave(i)}\r
                    >\r
                      {PillContent}\r
                    </Link>\r
                  ) : (\r
                    <a\r
                      role="menuitem"\r
                      href={item.href}\r
                      className={basePillClasses}\r
                      style={pillStyle}\r
                      aria-label={item.ariaLabel || item.label}\r
                      onMouseEnter={() => handleEnter(i)}\r
                      onMouseLeave={() => handleLeave(i)}\r
                    >\r
                      {PillContent}\r
                    </a>\r
                  )}\r
                </li>\r
              );\r
            })}\r
          </ul>\r
        </div>\r
\r
        <button\r
          ref={hamburgerRef}\r
          onClick={toggleMobileMenu}\r
          aria-label="Toggle menu"\r
          aria-expanded={isMobileMenuOpen}\r
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"\r
          style={{\r
            width: 'var(--nav-h)',\r
            height: 'var(--nav-h)',\r
            background: 'var(--base, #000)'\r
          }}\r
        >\r
          <span\r
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"\r
            style={{ background: 'var(--pill-bg, #fff)' }}\r
          />\r
          <span\r
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"\r
            style={{ background: 'var(--pill-bg, #fff)' }}\r
          />\r
        </button>\r
      </nav>\r
\r
      <div\r
        ref={mobileMenuRef}\r
        className="md:hidden absolute top-[3em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top"\r
        style={{\r
          ...cssVars,\r
          background: 'var(--base, #f0f0f0)'\r
        }}\r
      >\r
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">\r
          {items.map(item => {\r
            const defaultStyle: React.CSSProperties = {\r
              background: 'var(--pill-bg, #fff)',\r
              color: 'var(--pill-text, #fff)'\r
            };\r
            const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {\r
              e.currentTarget.style.background = 'var(--base)';\r
              e.currentTarget.style.color = 'var(--hover-text, #fff)';\r
            };\r
            const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {\r
              e.currentTarget.style.background = 'var(--pill-bg, #fff)';\r
              e.currentTarget.style.color = 'var(--pill-text, #fff)';\r
            };\r
\r
            const linkClasses =\r
              'block py-3 px-4 text-[16px] font-medium rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]';\r
\r
            return (\r
              <li key={item.href}>\r
                {isRouterLink(item.href) ? (\r
                  <Link\r
                    to={item.href}\r
                    className={linkClasses}\r
                    style={defaultStyle}\r
                    onMouseEnter={hoverIn}\r
                    onMouseLeave={hoverOut}\r
                    onClick={() => setIsMobileMenuOpen(false)}\r
                  >\r
                    {item.label}\r
                  </Link>\r
                ) : (\r
                  <a\r
                    href={item.href}\r
                    className={linkClasses}\r
                    style={defaultStyle}\r
                    onMouseEnter={hoverIn}\r
                    onMouseLeave={hoverOut}\r
                    onClick={() => setIsMobileMenuOpen(false)}\r
                  >\r
                    {item.label}\r
                  </a>\r
                )}\r
              </li>\r
            );\r
          })}\r
        </ul>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default PillNav;\r
`,xr={dependencies:"gsap",usage:`import PillNav from './PillNav';
import logo from '/path/to/logo.svg';

<PillNav
  logo={logo}
  logoAlt="Company Logo"
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]}
  activeHref="/"
  className="custom-nav"
  ease="power2.easeOut"
  baseColor="#000000"
  pillColor="#ffffff"
  hoveredPillTextColor="#ffffff"
  pillTextColor="#000000"
/>`,code:dr,css:hr,tailwind:gr,tsCode:br,tsTailwind:vr},Pr=()=>{const g=[{name:"logo",type:"string",default:"-",description:"URL for the logo image"},{name:"logoAlt",type:"string",default:"Logo",description:"Alt text for the logo image"},{name:"items",type:"PillNavItem[]",default:"-",description:"Array of navigation items with label, href, and optional ariaLabel"},{name:"activeHref",type:"string",default:"undefined",description:"The href of the currently active navigation item"},{name:"className",type:"string",default:"''",description:"Additional CSS classes for the navigation container"},{name:"ease",type:"string",default:"power3.easeOut",description:"GSAP easing function for animations"},{name:"baseColor",type:"string",default:"#fff",description:"Base background color for the navigation"},{name:"pillColor",type:"string",default:"#060010",description:"Background color for navigation pills"},{name:"hoveredPillTextColor",type:"string",default:"#060010",description:"Text color when hovering over pills"},{name:"pillTextColor",type:"string",default:"baseColor",description:"Text color for navigation pills"},{name:"onMobileMenuClick",type:"() => void",default:"undefined",description:"Callback function triggered when mobile menu button is clicked"},{name:"initialLoadAnimation",type:"boolean",default:"false",description:"Enable initial load animation for logo scale and nav items reveal"}],[d,s]=o.useState("light"),[u,M]=o.useState(!1),c={light:{logo:mr,baseColor:"#000",pillColor:"#f0f0f0",hoveredPillTextColor:"#fff",pillTextColor:"#000",backgroundColor:"#f0f0f0"},dark:{logo:G,baseColor:"#fff",pillColor:"#060010",hoveredPillTextColor:"#000",pillTextColor:"#fff",backgroundColor:"#060010"},color:{logo:G,baseColor:"#B19EEF",pillColor:"#060010",hoveredPillTextColor:"#060010",pillTextColor:"#fff",backgroundColor:"#060010"}}[d],L=[{value:"light",label:"Light Mode"},{value:"dark",label:"Dark Mode"},{value:"color",label:"Colorful"}];return e.jsxs(lr,{children:[e.jsxs(nr,{children:[e.jsx(tr,{position:"relative",className:"demo-container demo-container-dots",h:300,overflow:"hidden",bg:c.backgroundColor,children:e.jsx(pr,{logo:c.logo,baseColor:c.baseColor,pillColor:c.pillColor,hoveredPillTextColor:c.hoveredPillTextColor,pillTextColor:c.pillTextColor,initialLoadAnimation:u,items:[{label:"Home"},{label:"About"},{label:"Contact"}],activeHref:"/"})}),e.jsxs(sr,{children:[e.jsx(cr,{title:"Example",options:L,value:d,onChange:s,width:150}),e.jsx(ur,{title:"Initial Load Animation",value:u,onChange:M})]}),e.jsx(ir,{data:g}),e.jsx(fr,{dependencyList:["gsap"]})]}),e.jsx(ar,{children:e.jsx(or,{codeObject:xr})})]})};export{Pr as default};
