import{r as t,g as s,e as ue,j as r,B as me,F as ne,T as se,d as le}from"./index-wsKSLPNH.js";import{T as fe,P as ge,a as de,C as he,b as ye}from"./PropTable-C4uPWs8h.js";import{C as be}from"./Customize-1m_ZNqR9.js";import{D as xe}from"./Dependencies-BHoMfJUj.js";import{P as Re}from"./PreviewSwitch-DqnF708j.js";import{P as we}from"./PreviewSelect-B8u33nUa.js";import{u as ke}from"./useForceRerender-BCFU-k0M.js";import{l as Ce}from"./reactbits-gh-white-BS28Ibpe.js";import"./index-Bpz4cGEA.js";import"./field-bd7p2HAb.js";const ve=`import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
import './StaggeredMenu.css';\r
\r
export const StaggeredMenu = ({\r
  position = 'right',\r
  colors = ['#B19EEF', '#5227FF'],\r
  items = [],\r
  socialItems = [],\r
  displaySocials = true,\r
  displayItemNumbering = true,\r
  className,\r
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',\r
  menuButtonColor = '#fff',\r
  openMenuButtonColor = '#fff',\r
  accentColor = '#5227FF',\r
  changeMenuColorOnOpen = true,\r
  isFixed = false,\r
  onMenuOpen,\r
  onMenuClose\r
}) => {\r
  const [open, setOpen] = useState(false);\r
  const openRef = useRef(false);\r
  const panelRef = useRef(null);\r
  const preLayersRef = useRef(null);\r
  const preLayerElsRef = useRef([]);\r
  const plusHRef = useRef(null);\r
  const plusVRef = useRef(null);\r
  const iconRef = useRef(null);\r
  const textInnerRef = useRef(null);\r
  const textWrapRef = useRef(null);\r
  const [textLines, setTextLines] = useState(['Menu', 'Close']);\r
\r
  const openTlRef = useRef(null);\r
  const closeTweenRef = useRef(null);\r
  const spinTweenRef = useRef(null);\r
  const textCycleAnimRef = useRef(null);\r
  const colorTweenRef = useRef(null);\r
  const toggleBtnRef = useRef(null);\r
  const busyRef = useRef(false);\r
  const itemEntranceTweenRef = useRef(null);\r
\r
  useLayoutEffect(() => {\r
    const ctx = gsap.context(() => {\r
      const panel = panelRef.current;\r
      const preContainer = preLayersRef.current;\r
      const plusH = plusHRef.current;\r
      const plusV = plusVRef.current;\r
      const icon = iconRef.current;\r
      const textInner = textInnerRef.current;\r
      if (!panel || !plusH || !plusV || !icon || !textInner) return;\r
\r
      let preLayers = [];\r
      if (preContainer) {\r
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));\r
      }\r
      preLayerElsRef.current = preLayers;\r
\r
      const offscreen = position === 'left' ? -100 : 100;\r
      gsap.set([panel, ...preLayers], { xPercent: offscreen });\r
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });\r
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });\r
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });\r
      gsap.set(textInner, { yPercent: 0 });\r
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });\r
    });\r
    return () => ctx.revert();\r
  }, [menuButtonColor, position]);\r
\r
  const buildOpenTimeline = useCallback(() => {\r
    const panel = panelRef.current;\r
    const layers = preLayerElsRef.current;\r
    if (!panel) return null;\r
\r
    openTlRef.current?.kill();\r
    if (closeTweenRef.current) {\r
      closeTweenRef.current.kill();\r
      closeTweenRef.current = null;\r
    }\r
    itemEntranceTweenRef.current?.kill();\r
\r
    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));\r
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));\r
    const socialTitle = panel.querySelector('.sm-socials-title');\r
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));\r
\r
    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));\r
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));\r
\r
    if (itemEls.length) {\r
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });\r
    }\r
    if (numberEls.length) {\r
      gsap.set(numberEls, { '--sm-num-opacity': 0 });\r
    }\r
    if (socialTitle) {\r
      gsap.set(socialTitle, { opacity: 0 });\r
    }\r
    if (socialLinks.length) {\r
      gsap.set(socialLinks, { y: 25, opacity: 0 });\r
    }\r
\r
    const tl = gsap.timeline({ paused: true });\r
\r
    layerStates.forEach((ls, i) => {\r
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);\r
    });\r
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;\r
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);\r
    const panelDuration = 0.65;\r
    tl.fromTo(\r
      panel,\r
      { xPercent: panelStart },\r
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },\r
      panelInsertTime\r
    );\r
\r
    if (itemEls.length) {\r
      const itemsStartRatio = 0.15;\r
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;\r
      tl.to(\r
        itemEls,\r
        {\r
          yPercent: 0,\r
          rotate: 0,\r
          duration: 1,\r
          ease: 'power4.out',\r
          stagger: { each: 0.1, from: 'start' }\r
        },\r
        itemsStart\r
      );\r
      if (numberEls.length) {\r
        tl.to(\r
          numberEls,\r
          {\r
            duration: 0.6,\r
            ease: 'power2.out',\r
            '--sm-num-opacity': 1,\r
            stagger: { each: 0.08, from: 'start' }\r
          },\r
          itemsStart + 0.1\r
        );\r
      }\r
    }\r
\r
    if (socialTitle || socialLinks.length) {\r
      const socialsStart = panelInsertTime + panelDuration * 0.4;\r
      if (socialTitle) {\r
        tl.to(\r
          socialTitle,\r
          {\r
            opacity: 1,\r
            duration: 0.5,\r
            ease: 'power2.out'\r
          },\r
          socialsStart\r
        );\r
      }\r
      if (socialLinks.length) {\r
        tl.to(\r
          socialLinks,\r
          {\r
            y: 0,\r
            opacity: 1,\r
            duration: 0.55,\r
            ease: 'power3.out',\r
            stagger: { each: 0.08, from: 'start' },\r
            onComplete: () => {\r
              gsap.set(socialLinks, { clearProps: 'opacity' });\r
            }\r
          },\r
          socialsStart + 0.04\r
        );\r
      }\r
    }\r
\r
    openTlRef.current = tl;\r
    return tl;\r
  }, []);\r
\r
  const playOpen = useCallback(() => {\r
    if (busyRef.current) return;\r
    busyRef.current = true;\r
    const tl = buildOpenTimeline();\r
    if (tl) {\r
      tl.eventCallback('onComplete', () => {\r
        busyRef.current = false;\r
      });\r
      tl.play(0);\r
    } else {\r
      busyRef.current = false;\r
    }\r
  }, [buildOpenTimeline]);\r
\r
  const playClose = useCallback(() => {\r
    openTlRef.current?.kill();\r
    openTlRef.current = null;\r
    itemEntranceTweenRef.current?.kill();\r
\r
    const panel = panelRef.current;\r
    const layers = preLayerElsRef.current;\r
    if (!panel) return;\r
\r
    const all = [...layers, panel];\r
    closeTweenRef.current?.kill();\r
    const offscreen = position === 'left' ? -100 : 100;\r
    closeTweenRef.current = gsap.to(all, {\r
      xPercent: offscreen,\r
      duration: 0.32,\r
      ease: 'power3.in',\r
      overwrite: 'auto',\r
      onComplete: () => {\r
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));\r
        if (itemEls.length) {\r
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });\r
        }\r
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));\r
        if (numberEls.length) {\r
          gsap.set(numberEls, { '--sm-num-opacity': 0 });\r
        }\r
        const socialTitle = panel.querySelector('.sm-socials-title');\r
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));\r
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });\r
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });\r
        busyRef.current = false;\r
      }\r
    });\r
  }, [position]);\r
\r
  const animateIcon = useCallback(opening => {\r
    const icon = iconRef.current;\r
    if (!icon) return;\r
    spinTweenRef.current?.kill();\r
    if (opening) {\r
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });\r
    } else {\r
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });\r
    }\r
  }, []);\r
\r
  const animateColor = useCallback(\r
    opening => {\r
      const btn = toggleBtnRef.current;\r
      if (!btn) return;\r
      colorTweenRef.current?.kill();\r
      if (changeMenuColorOnOpen) {\r
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;\r
        colorTweenRef.current = gsap.to(btn, {\r
          color: targetColor,\r
          delay: 0.18,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      } else {\r
        gsap.set(btn, { color: menuButtonColor });\r
      }\r
    },\r
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]\r
  );\r
\r
  React.useEffect(() => {\r
    if (toggleBtnRef.current) {\r
      if (changeMenuColorOnOpen) {\r
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;\r
        gsap.set(toggleBtnRef.current, { color: targetColor });\r
      } else {\r
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });\r
      }\r
    }\r
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);\r
\r
  const animateText = useCallback(opening => {\r
    const inner = textInnerRef.current;\r
    if (!inner) return;\r
    textCycleAnimRef.current?.kill();\r
\r
    const currentLabel = opening ? 'Menu' : 'Close';\r
    const targetLabel = opening ? 'Close' : 'Menu';\r
    const cycles = 3;\r
    const seq = [currentLabel];\r
    let last = currentLabel;\r
    for (let i = 0; i < cycles; i++) {\r
      last = last === 'Menu' ? 'Close' : 'Menu';\r
      seq.push(last);\r
    }\r
    if (last !== targetLabel) seq.push(targetLabel);\r
    seq.push(targetLabel);\r
    setTextLines(seq);\r
\r
    gsap.set(inner, { yPercent: 0 });\r
    const lineCount = seq.length;\r
    const finalShift = ((lineCount - 1) / lineCount) * 100;\r
    textCycleAnimRef.current = gsap.to(inner, {\r
      yPercent: -finalShift,\r
      duration: 0.5 + lineCount * 0.07,\r
      ease: 'power4.out'\r
    });\r
  }, []);\r
\r
  const toggleMenu = useCallback(() => {\r
    const target = !openRef.current;\r
    openRef.current = target;\r
    setOpen(target);\r
    if (target) {\r
      onMenuOpen?.();\r
      playOpen();\r
    } else {\r
      onMenuClose?.();\r
      playClose();\r
    }\r
    animateIcon(target);\r
    animateColor(target);\r
    animateText(target);\r
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);\r
\r
  return (\r
    <div\r
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}\r
      style={accentColor ? { ['--sm-accent']: accentColor } : undefined}\r
      data-position={position}\r
      data-open={open || undefined}\r
    >\r
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">\r
        {(() => {\r
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];\r
          let arr = [...raw];\r
          if (arr.length >= 3) {\r
            const mid = Math.floor(arr.length / 2);\r
            arr.splice(mid, 1);\r
          }\r
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);\r
        })()}\r
      </div>\r
      <header className="staggered-menu-header" aria-label="Main navigation header">\r
        <div className="sm-logo" aria-label="Logo">\r
          <img\r
            src={logoUrl || '/src/assets/logos/reactbits-gh-white.svg'}\r
            alt="Logo"\r
            className="sm-logo-img"\r
            draggable={false}\r
            width={110}\r
            height={24}\r
          />\r
        </div>\r
        <button\r
          ref={toggleBtnRef}\r
          className="sm-toggle"\r
          aria-label={open ? 'Close menu' : 'Open menu'}\r
          aria-expanded={open}\r
          aria-controls="staggered-menu-panel"\r
          onClick={toggleMenu}\r
          type="button"\r
        >\r
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">\r
            <span ref={textInnerRef} className="sm-toggle-textInner">\r
              {textLines.map((l, i) => (\r
                <span className="sm-toggle-line" key={i}>\r
                  {l}\r
                </span>\r
              ))}\r
            </span>\r
          </span>\r
          <span ref={iconRef} className="sm-icon" aria-hidden="true">\r
            <span ref={plusHRef} className="sm-icon-line" />\r
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />\r
          </span>\r
        </button>\r
      </header>\r
\r
      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>\r
        <div className="sm-panel-inner">\r
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>\r
            {items && items.length ? (\r
              items.map((it, idx) => (\r
                <li className="sm-panel-itemWrap" key={it.label + idx}>\r
                  <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel} data-index={idx + 1}>\r
                    <span className="sm-panel-itemLabel">{it.label}</span>\r
                  </a>\r
                </li>\r
              ))\r
            ) : (\r
              <li className="sm-panel-itemWrap" aria-hidden="true">\r
                <span className="sm-panel-item">\r
                  <span className="sm-panel-itemLabel">No items</span>\r
                </span>\r
              </li>\r
            )}\r
          </ul>\r
          {displaySocials && socialItems && socialItems.length > 0 && (\r
            <div className="sm-socials" aria-label="Social links">\r
              <h3 className="sm-socials-title">Socials</h3>\r
              <ul className="sm-socials-list" role="list">\r
                {socialItems.map((s, i) => (\r
                  <li key={s.label + i} className="sm-socials-item">\r
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">\r
                      {s.label}\r
                    </a>\r
                  </li>\r
                ))}\r
              </ul>\r
            </div>\r
          )}\r
        </div>\r
      </aside>\r
    </div>\r
  );\r
};\r
\r
export default StaggeredMenu;\r
`,Te=`.staggered-menu-wrapper {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  z-index: 40;\r
}\r
\r
.staggered-menu-wrapper.fixed-wrapper {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  width: 100vw;\r
  height: 100vh;\r
  z-index: 40;\r
  overflow: hidden;\r
}\r
\r
.staggered-menu-header {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding: 2em;\r
  background: transparent;\r
  pointer-events: none;\r
  z-index: 20;\r
}\r
\r
.staggered-menu-header > * {\r
  pointer-events: auto;\r
}\r
\r
.sm-logo {\r
  display: flex;\r
  align-items: center;\r
  user-select: none;\r
}\r
\r
.sm-logo-img {\r
  display: block;\r
  height: 32px;\r
  width: auto;\r
  object-fit: contain;\r
}\r
\r
.sm-toggle {\r
  position: relative;\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 0.3rem;\r
  background: transparent;\r
  border: none;\r
  cursor: pointer;\r
  color: #e9e9ef;\r
  font-weight: 500;\r
  line-height: 1;\r
  overflow: visible;\r
}\r
\r
.sm-toggle:focus-visible {\r
  outline: 2px solid #ffffffaa;\r
  outline-offset: 4px;\r
  border-radius: 4px;\r
}\r
\r
.sm-line:last-of-type {\r
  margin-top: 6px;\r
}\r
\r
.sm-toggle-textWrap {\r
  position: relative;\r
  display: inline-block;\r
  height: 1em;\r
  overflow: hidden;\r
  white-space: nowrap;\r
  width: var(--sm-toggle-width, auto);\r
  min-width: var(--sm-toggle-width, auto);\r
}\r
\r
.sm-toggle-textInner {\r
  display: flex;\r
  flex-direction: column;\r
  line-height: 1;\r
}\r
\r
.sm-toggle-line {\r
  display: block;\r
  height: 1em;\r
  line-height: 1;\r
}\r
\r
.sm-icon {\r
  position: relative;\r
  width: 14px;\r
  height: 14px;\r
  flex: 0 0 14px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  will-change: transform;\r
}\r
\r
.sm-panel-itemWrap {\r
  position: relative;\r
  overflow: hidden;\r
  line-height: 1;\r
}\r
\r
.sm-icon-line {\r
  position: absolute;\r
  left: 50%;\r
  top: 50%;\r
  width: 100%;\r
  height: 2px;\r
  background: currentColor;\r
  border-radius: 2px;\r
  transform: translate(-50%, -50%);\r
  will-change: transform;\r
}\r
\r
.sm-line {\r
  display: none !important;\r
}\r
\r
.staggered-menu-panel {\r
  position: absolute;\r
  top: 0;\r
  right: 0;\r
  width: clamp(260px, 38vw, 420px);\r
  height: 100%;\r
  background: white;\r
  backdrop-filter: blur(12px);\r
  -webkit-backdrop-filter: blur(12px);\r
  display: flex;\r
  flex-direction: column;\r
  padding: 6em 2em 2em 2em;\r
  overflow-y: auto;\r
  z-index: 10;\r
}\r
\r
[data-position='left'] .staggered-menu-panel {\r
  right: auto;\r
  left: 0;\r
}\r
\r
.sm-prelayers {\r
  position: absolute;\r
  top: 0;\r
  right: 0;\r
  bottom: 0;\r
  width: clamp(260px, 38vw, 420px);\r
  pointer-events: none;\r
  z-index: 5;\r
}\r
\r
[data-position='left'] .sm-prelayers {\r
  right: auto;\r
  left: 0;\r
}\r
\r
.sm-prelayer {\r
  position: absolute;\r
  top: 0;\r
  right: 0;\r
  height: 100%;\r
  width: 100%;\r
  transform: translateX(0);\r
}\r
\r
.sm-panel-inner {\r
  flex: 1;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1.25rem;\r
}\r
\r
.sm-socials {\r
  margin-top: auto;\r
  padding-top: 2rem;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.75rem;\r
}\r
\r
.sm-socials-title {\r
  margin: 0;\r
  font-size: 1rem;\r
  font-weight: 500;\r
  color: var(--sm-accent, #ff0000);\r
}\r
\r
.sm-socials-list {\r
  list-style: none;\r
  margin: 0;\r
  padding: 0;\r
  display: flex;\r
  flex-direction: row;\r
  align-items: center;\r
  gap: 1rem;\r
  flex-wrap: wrap;\r
}\r
\r
.sm-socials-list .sm-socials-link {\r
  opacity: 1;\r
}\r
\r
.sm-socials-list:hover .sm-socials-link {\r
  opacity: 0.35;\r
}\r
\r
.sm-socials-list:hover .sm-socials-link:hover {\r
  opacity: 1;\r
}\r
\r
.sm-socials-link:focus-visible {\r
  outline: 2px solid var(--sm-accent, #ff0000);\r
  outline-offset: 3px;\r
}\r
\r
.sm-socials-list:focus-within .sm-socials-link {\r
  opacity: 0.35;\r
}\r
\r
.sm-socials-list:focus-within .sm-socials-link:focus-visible {\r
  opacity: 1;\r
}\r
\r
.sm-socials-link {\r
  font-size: 1.2rem;\r
  font-weight: 500;\r
  color: #111;\r
  text-decoration: none;\r
  position: relative;\r
  padding: 2px 0;\r
  display: inline-block;\r
  transition:\r
    color 0.3s ease,\r
    opacity 0.3s ease;\r
}\r
\r
.sm-socials-link:hover {\r
  color: var(--sm-accent, #ff0000);\r
}\r
\r
.sm-panel-title {\r
  margin: 0;\r
  font-size: 1rem;\r
  font-weight: 600;\r
  color: #fff;\r
  text-transform: uppercase;\r
}\r
\r
.sm-panel-list {\r
  list-style: none;\r
  margin: 0;\r
  padding: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.5rem;\r
}\r
\r
.sm-panel-item {\r
  position: relative;\r
  color: #000;\r
  font-weight: 600;\r
  font-size: 3.5rem;\r
  cursor: pointer;\r
  line-height: 1;\r
  letter-spacing: -2px;\r
  text-transform: uppercase;\r
  transition:\r
    background 0.25s,\r
    color 0.25s;\r
  display: inline-block;\r
  text-decoration: none;\r
  padding-right: 1.4em;\r
}\r
\r
.staggered-menu-panel .sm-socials-list .sm-socials-link {\r
  opacity: 1;\r
  transition: opacity 0.3s ease;\r
}\r
\r
.staggered-menu-panel .sm-socials-list:hover .sm-socials-link:not(:hover) {\r
  opacity: 0.35;\r
}\r
\r
.staggered-menu-panel .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) {\r
  opacity: 0.35;\r
}\r
\r
.staggered-menu-panel .sm-socials-list .sm-socials-link:hover,\r
.staggered-menu-panel .sm-socials-list .sm-socials-link:focus-visible {\r
  opacity: 1;\r
}\r
\r
.sm-panel-itemLabel {\r
  display: inline-block;\r
  will-change: transform;\r
  transform-origin: 50% 100%;\r
}\r
\r
.sm-panel-item:hover {\r
  color: var(--sm-accent, #5227ff);\r
}\r
\r
.sm-panel-list[data-numbering] {\r
  counter-reset: smItem;\r
}\r
\r
.sm-panel-list[data-numbering] .sm-panel-item::after {\r
  counter-increment: smItem;\r
  content: counter(smItem, decimal-leading-zero);\r
  position: absolute;\r
  top: 0.1em;\r
  right: 2.8em;\r
  font-size: 18px;\r
  font-weight: 400;\r
  color: var(--sm-accent, #5227ff);\r
  letter-spacing: 0;\r
  pointer-events: none;\r
  user-select: none;\r
  opacity: var(--sm-num-opacity, 0);\r
}\r
\r
@media (max-width: 1024px) {\r
  .staggered-menu-panel {\r
    width: 100%;\r
    left: 0;\r
    right: 0;\r
  }\r
\r
  .staggered-menu-wrapper[data-open] .sm-logo-img {\r
    filter: invert(100%);\r
  }\r
}\r
\r
@media (max-width: 640px) {\r
  .staggered-menu-panel {\r
    width: 100%;\r
    left: 0;\r
    right: 0;\r
  }\r
\r
  .staggered-menu-wrapper[data-open] .sm-logo-img {\r
    filter: invert(100%);\r
  }\r
}\r
`,Le=`import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
\r
export const StaggeredMenu = ({\r
  position = 'right',\r
  colors = ['#B19EEF', '#5227FF'],\r
  items = [],\r
  socialItems = [],\r
  displaySocials = true,\r
  displayItemNumbering = true,\r
  className,\r
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',\r
  menuButtonColor = '#fff',\r
  openMenuButtonColor = '#fff',\r
  changeMenuColorOnOpen = true,\r
  isFixed = false,\r
  accentColor = '#5227FF',\r
  onMenuOpen,\r
  onMenuClose\r
}) => {\r
  const [open, setOpen] = useState(false);\r
  const openRef = useRef(false);\r
\r
  const panelRef = useRef(null);\r
  const preLayersRef = useRef(null);\r
  const preLayerElsRef = useRef([]);\r
\r
  const plusHRef = useRef(null);\r
  const plusVRef = useRef(null);\r
  const iconRef = useRef(null);\r
\r
  const textInnerRef = useRef(null);\r
  const textWrapRef = useRef(null);\r
  const [textLines, setTextLines] = useState(['Menu', 'Close']);\r
\r
  const openTlRef = useRef(null);\r
  const closeTweenRef = useRef(null);\r
  const spinTweenRef = useRef(null);\r
  const textCycleAnimRef = useRef(null);\r
  const colorTweenRef = useRef(null);\r
\r
  const toggleBtnRef = useRef(null);\r
  const busyRef = useRef(false);\r
\r
  const itemEntranceTweenRef = useRef(null);\r
\r
  useLayoutEffect(() => {\r
    const ctx = gsap.context(() => {\r
      const panel = panelRef.current;\r
      const preContainer = preLayersRef.current;\r
\r
      const plusH = plusHRef.current;\r
      const plusV = plusVRef.current;\r
      const icon = iconRef.current;\r
      const textInner = textInnerRef.current;\r
\r
      if (!panel || !plusH || !plusV || !icon || !textInner) return;\r
\r
      let preLayers = [];\r
      if (preContainer) {\r
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));\r
      }\r
      preLayerElsRef.current = preLayers;\r
\r
      const offscreen = position === 'left' ? -100 : 100;\r
      gsap.set([panel, ...preLayers], { xPercent: offscreen });\r
\r
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });\r
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });\r
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });\r
\r
      gsap.set(textInner, { yPercent: 0 });\r
\r
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });\r
    });\r
    return () => ctx.revert();\r
  }, [menuButtonColor, position]);\r
\r
  const buildOpenTimeline = useCallback(() => {\r
    const panel = panelRef.current;\r
    const layers = preLayerElsRef.current;\r
    if (!panel) return null;\r
\r
    openTlRef.current?.kill();\r
    if (closeTweenRef.current) {\r
      closeTweenRef.current.kill();\r
      closeTweenRef.current = null;\r
    }\r
    itemEntranceTweenRef.current?.kill();\r
\r
    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));\r
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));\r
    const socialTitle = panel.querySelector('.sm-socials-title');\r
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));\r
\r
    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));\r
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));\r
\r
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });\r
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity']: 0 });\r
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });\r
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });\r
\r
    const tl = gsap.timeline({ paused: true });\r
\r
    layerStates.forEach((ls, i) => {\r
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);\r
    });\r
\r
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;\r
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);\r
    const panelDuration = 0.65;\r
\r
    tl.fromTo(\r
      panel,\r
      { xPercent: panelStart },\r
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },\r
      panelInsertTime\r
    );\r
\r
    if (itemEls.length) {\r
      const itemsStartRatio = 0.15;\r
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;\r
\r
      tl.to(\r
        itemEls,\r
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },\r
        itemsStart\r
      );\r
\r
      if (numberEls.length) {\r
        tl.to(\r
          numberEls,\r
          { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity']: 1, stagger: { each: 0.08, from: 'start' } },\r
          itemsStart + 0.1\r
        );\r
      }\r
    }\r
\r
    if (socialTitle || socialLinks.length) {\r
      const socialsStart = panelInsertTime + panelDuration * 0.4;\r
\r
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);\r
      if (socialLinks.length) {\r
        tl.to(\r
          socialLinks,\r
          {\r
            y: 0,\r
            opacity: 1,\r
            duration: 0.55,\r
            ease: 'power3.out',\r
            stagger: { each: 0.08, from: 'start' },\r
            onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' })\r
          },\r
          socialsStart + 0.04\r
        );\r
      }\r
    }\r
\r
    openTlRef.current = tl;\r
    return tl;\r
  }, []);\r
\r
  const playOpen = useCallback(() => {\r
    if (busyRef.current) return;\r
    busyRef.current = true;\r
    const tl = buildOpenTimeline();\r
    if (tl) {\r
      tl.eventCallback('onComplete', () => {\r
        busyRef.current = false;\r
      });\r
      tl.play(0);\r
    } else {\r
      busyRef.current = false;\r
    }\r
  }, [buildOpenTimeline]);\r
\r
  const playClose = useCallback(() => {\r
    openTlRef.current?.kill();\r
    openTlRef.current = null;\r
    itemEntranceTweenRef.current?.kill();\r
\r
    const panel = panelRef.current;\r
    const layers = preLayerElsRef.current;\r
    if (!panel) return;\r
\r
    const all = [...layers, panel];\r
    closeTweenRef.current?.kill();\r
\r
    const offscreen = position === 'left' ? -100 : 100;\r
\r
    closeTweenRef.current = gsap.to(all, {\r
      xPercent: offscreen,\r
      duration: 0.32,\r
      ease: 'power3.in',\r
      overwrite: 'auto',\r
      onComplete: () => {\r
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));\r
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });\r
\r
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));\r
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity']: 0 });\r
\r
        const socialTitle = panel.querySelector('.sm-socials-title');\r
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));\r
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });\r
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });\r
\r
        busyRef.current = false;\r
      }\r
    });\r
  }, [position]);\r
\r
  const animateIcon = useCallback(opening => {\r
    const icon = iconRef.current;\r
    const h = plusHRef.current;\r
    const v = plusVRef.current;\r
    if (!icon || !h || !v) return;\r
\r
    spinTweenRef.current?.kill();\r
\r
    if (opening) {\r
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });\r
      spinTweenRef.current = gsap\r
        .timeline({ defaults: { ease: 'power4.out' } })\r
        .to(h, { rotate: 45, duration: 0.5 }, 0)\r
        .to(v, { rotate: -45, duration: 0.5 }, 0);\r
    } else {\r
      spinTweenRef.current = gsap\r
        .timeline({ defaults: { ease: 'power3.inOut' } })\r
        .to(h, { rotate: 0, duration: 0.35 }, 0)\r
        .to(v, { rotate: 90, duration: 0.35 }, 0)\r
        .to(icon, { rotate: 0, duration: 0.001 }, 0);\r
    }\r
  }, []);\r
\r
  const animateColor = useCallback(\r
    opening => {\r
      const btn = toggleBtnRef.current;\r
      if (!btn) return;\r
      colorTweenRef.current?.kill();\r
      if (changeMenuColorOnOpen) {\r
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;\r
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });\r
      } else {\r
        gsap.set(btn, { color: menuButtonColor });\r
      }\r
    },\r
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]\r
  );\r
\r
  React.useEffect(() => {\r
    if (toggleBtnRef.current) {\r
      if (changeMenuColorOnOpen) {\r
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;\r
        gsap.set(toggleBtnRef.current, { color: targetColor });\r
      } else {\r
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });\r
      }\r
    }\r
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);\r
\r
  const animateText = useCallback(opening => {\r
    const inner = textInnerRef.current;\r
    if (!inner) return;\r
\r
    textCycleAnimRef.current?.kill();\r
\r
    const currentLabel = opening ? 'Menu' : 'Close';\r
    const targetLabel = opening ? 'Close' : 'Menu';\r
    const cycles = 3;\r
\r
    const seq = [currentLabel];\r
    let last = currentLabel;\r
    for (let i = 0; i < cycles; i++) {\r
      last = last === 'Menu' ? 'Close' : 'Menu';\r
      seq.push(last);\r
    }\r
    if (last !== targetLabel) seq.push(targetLabel);\r
    seq.push(targetLabel);\r
\r
    setTextLines(seq);\r
    gsap.set(inner, { yPercent: 0 });\r
\r
    const lineCount = seq.length;\r
    const finalShift = ((lineCount - 1) / lineCount) * 100;\r
\r
    textCycleAnimRef.current = gsap.to(inner, {\r
      yPercent: -finalShift,\r
      duration: 0.5 + lineCount * 0.07,\r
      ease: 'power4.out'\r
    });\r
  }, []);\r
\r
  const toggleMenu = useCallback(() => {\r
    const target = !openRef.current;\r
    openRef.current = target;\r
    setOpen(target);\r
\r
    if (target) {\r
      onMenuOpen?.();\r
      playOpen();\r
    } else {\r
      onMenuClose?.();\r
      playClose();\r
    }\r
\r
    animateIcon(target);\r
    animateColor(target);\r
    animateText(target);\r
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);\r
\r
  return (\r
    <div\r
      className={\`sm-scope z-40 \${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden' : 'w-full h-full'}\`}\r
    >\r
      <div\r
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper relative w-full h-full'}\r
        style={accentColor ? { ['--sm-accent']: accentColor } : undefined}\r
        data-position={position}\r
        data-open={open || undefined}\r
      >\r
        <div\r
          ref={preLayersRef}\r
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"\r
          aria-hidden="true"\r
        >\r
          {(() => {\r
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];\r
            let arr = [...raw];\r
            if (arr.length >= 3) {\r
              const mid = Math.floor(arr.length / 2);\r
              arr.splice(mid, 1);\r
            }\r
            return arr.map((c, i) => (\r
              <div\r
                key={i}\r
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"\r
                style={{ background: c }}\r
              />\r
            ));\r
          })()}\r
        </div>\r
\r
        <header\r
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between p-[2em] bg-transparent pointer-events-none z-20"\r
          aria-label="Main navigation header"\r
        >\r
          <div className="sm-logo flex items-center select-none pointer-events-auto" aria-label="Logo">\r
            <img\r
              src={logoUrl || '/src/assets/logos/reactbits-gh-white.svg'}\r
              alt="Logo"\r
              className="sm-logo-img block h-8 w-auto object-contain"\r
              draggable={false}\r
              width={110}\r
              height={24}\r
            />\r
          </div>\r
\r
          <button\r
            ref={toggleBtnRef}\r
            className="sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer text-[#e9e9ef] font-medium leading-none overflow-visible pointer-events-auto"\r
            aria-label={open ? 'Close menu' : 'Open menu'}\r
            aria-expanded={open}\r
            aria-controls="staggered-menu-panel"\r
            onClick={toggleMenu}\r
            type="button"\r
          >\r
            <span\r
              ref={textWrapRef}\r
              className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap w-[var(--sm-toggle-width,auto)] min-w-[var(--sm-toggle-width,auto)]"\r
              aria-hidden="true"\r
            >\r
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">\r
                {textLines.map((l, i) => (\r
                  <span className="sm-toggle-line block h-[1em] leading-none" key={i}>\r
                    {l}\r
                  </span>\r
                ))}\r
              </span>\r
            </span>\r
\r
            <span\r
              ref={iconRef}\r
              className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center [will-change:transform]"\r
              aria-hidden="true"\r
            >\r
              <span\r
                ref={plusHRef}\r
                className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"\r
              />\r
              <span\r
                ref={plusVRef}\r
                className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"\r
              />\r
            </span>\r
          </button>\r
        </header>\r
\r
        <aside\r
          id="staggered-menu-panel"\r
          ref={panelRef}\r
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px]"\r
          style={{ WebkitBackdropFilter: 'blur(12px)' }}\r
          aria-hidden={!open}\r
        >\r
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">\r
            <ul\r
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"\r
              role="list"\r
              data-numbering={displayItemNumbering || undefined}\r
            >\r
              {items && items.length ? (\r
                items.map((it, idx) => (\r
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>\r
                    <a\r
                      className="sm-panel-item relative text-black font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"\r
                      href={it.link}\r
                      aria-label={it.ariaLabel}\r
                      data-index={idx + 1}\r
                    >\r
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">\r
                        {it.label}\r
                      </span>\r
                    </a>\r
                  </li>\r
                ))\r
              ) : (\r
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">\r
                  <span className="sm-panel-item relative text-black font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">\r
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">\r
                      No items\r
                    </span>\r
                  </span>\r
                </li>\r
              )}\r
            </ul>\r
\r
            {displaySocials && socialItems && socialItems.length > 0 && (\r
              <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">\r
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#ff0000)]">Socials</h3>\r
                <ul\r
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"\r
                  role="list"\r
                >\r
                  {socialItems.map((s, i) => (\r
                    <li key={s.label + i} className="sm-socials-item">\r
                      <a\r
                        href={s.link}\r
                        target="_blank"\r
                        rel="noopener noreferrer"\r
                        className="sm-socials-link text-[1.2rem] font-medium text-[#111] no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"\r
                      >\r
                        {s.label}\r
                      </a>\r
                    </li>\r
                  ))}\r
                </ul>\r
              </div>\r
            )}\r
          </div>\r
        </aside>\r
      </div>\r
\r
      <style>{\`\r
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; }\r
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 2em; background: transparent; pointer-events: none; z-index: 20; }\r
.sm-scope .staggered-menu-header > * { pointer-events: auto; }\r
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }\r
.sm-scope .sm-logo-img { display: block; height: 32px; width: auto; object-fit: contain; }\r
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; color: #e9e9ef; font-weight: 500; line-height: 1; overflow: visible; }\r
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }\r
.sm-scope .sm-line:last-of-type { margin-top: 6px; }\r
.sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.5em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; width: var(--sm-toggle-width, auto); min-width: var(--sm-toggle-width, auto); }\r
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }\r
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }\r
.sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }\r
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }\r
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }\r
.sm-scope .sm-line { display: none !important; }\r
.sm-scope .staggered-menu-panel { poimport StaggeredMenu from '../../../ts-default/Components/StaggeredMenu/StaggeredMenu';\r
sition: absolute; top: 0; right: 0; width: clamp(260px, 38vw, 420px); height: 100%; background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto; z-index: 10; }\r
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }\r
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(260px, 38vw, 420px); pointer-events: none; z-index: 5; }\r
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }\r
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }\r
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }\r
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }\r
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: var(--sm-accent, #ff0000); }\r
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }\r
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }\r
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }\r
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }\r
.sm-scope .sm-socials-list .sm-socials-link:hover,\r
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }\r
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ff0000); outline-offset: 3px; }\r
.sm-scope .sm-socials-link { font-size: 1.2rem; font-weight: 500; color: #111; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }\r
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }\r
.sm-scope .sm-panel-title { margin: 0; font-size: 1rem; font-weight: 600; color: #fff; text-transform: uppercase; }\r
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }\r
.sm-scope .sm-panel-item { position: relative; color: #000; font-weight: 600; font-size: 4rem; cursor: pointer; line-height: 1; letter-spacing: -2px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: inline-block; text-decoration: none; padding-right: 1.4em; }\r
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }\r
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }\r
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }\r
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-size: 18px; font-weight: 400; color: var(--sm-accent, #ff0000); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }\r
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { filter: invert(100%); } }\r
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { filter: invert(100%); } }\r
      \`}</style>\r
    </div>\r
  );\r
};\r
\r
export default StaggeredMenu;\r
`,Se=`import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
import './StaggeredMenu.css';\r
\r
export interface StaggeredMenuItem {\r
  label: string;\r
  ariaLabel: string;\r
  link: string;\r
}\r
\r
export interface StaggeredMenuSocialItem {\r
  label: string;\r
  link: string;\r
}\r
\r
export interface StaggeredMenuProps {\r
  position?: 'left' | 'right';\r
  colors?: string[];\r
  items?: StaggeredMenuItem[];\r
  socialItems?: StaggeredMenuSocialItem[];\r
  displaySocials?: boolean;\r
  displayItemNumbering?: boolean;\r
  className?: string;\r
  logoUrl?: string;\r
  menuButtonColor?: string;\r
  openMenuButtonColor?: string;\r
  accentColor?: string;\r
  changeMenuColorOnOpen?: boolean;\r
  onMenuOpen?: () => void;\r
  onMenuClose?: () => void;\r
  isFixed?: boolean;\r
}\r
\r
export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({\r
  position = 'right',\r
  colors = ['#B19EEF', '#5227FF'],\r
  items = [],\r
  socialItems = [],\r
  displaySocials = true,\r
  displayItemNumbering = true,\r
  className,\r
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',\r
  menuButtonColor = '#fff',\r
  openMenuButtonColor = '#fff',\r
  changeMenuColorOnOpen = true,\r
  accentColor = '#5227FF',\r
  isFixed = false,\r
  onMenuOpen,\r
  onMenuClose\r
}: StaggeredMenuProps) => {\r
  const [open, setOpen] = useState(false);\r
  const openRef = useRef(false);\r
  const panelRef = useRef<HTMLDivElement | null>(null);\r
  const preLayersRef = useRef<HTMLDivElement | null>(null);\r
  const preLayerElsRef = useRef<HTMLElement[]>([]);\r
  const plusHRef = useRef<HTMLSpanElement | null>(null);\r
  const plusVRef = useRef<HTMLSpanElement | null>(null);\r
  const iconRef = useRef<HTMLSpanElement | null>(null);\r
  const textInnerRef = useRef<HTMLSpanElement | null>(null);\r
  const textWrapRef = useRef<HTMLSpanElement | null>(null);\r
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);\r
\r
  const openTlRef = useRef<gsap.core.Timeline | null>(null);\r
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);\r
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);\r
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);\r
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);\r
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);\r
  const busyRef = useRef(false);\r
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);\r
\r
  useLayoutEffect(() => {\r
    const ctx = gsap.context(() => {\r
      const panel = panelRef.current;\r
      const preContainer = preLayersRef.current;\r
      const plusH = plusHRef.current;\r
      const plusV = plusVRef.current;\r
      const icon = iconRef.current;\r
      const textInner = textInnerRef.current;\r
      if (!panel || !plusH || !plusV || !icon || !textInner) return;\r
\r
      let preLayers: HTMLElement[] = [];\r
      if (preContainer) {\r
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];\r
      }\r
      preLayerElsRef.current = preLayers;\r
\r
      const offscreen = position === 'left' ? -100 : 100;\r
      gsap.set([panel, ...preLayers], { xPercent: offscreen });\r
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });\r
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });\r
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });\r
      gsap.set(textInner, { yPercent: 0 });\r
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });\r
    });\r
    return () => ctx.revert();\r
  }, [menuButtonColor, position]);\r
\r
  const buildOpenTimeline = useCallback(() => {\r
    const panel = panelRef.current;\r
    const layers = preLayerElsRef.current;\r
    if (!panel) return null;\r
\r
    openTlRef.current?.kill();\r
    if (closeTweenRef.current) {\r
      closeTweenRef.current.kill();\r
      closeTweenRef.current = null;\r
    }\r
    itemEntranceTweenRef.current?.kill();\r
\r
    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];\r
    const numberEls = Array.from(\r
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')\r
    ) as HTMLElement[];\r
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;\r
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];\r
\r
    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));\r
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));\r
\r
    if (itemEls.length) {\r
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });\r
    }\r
    if (numberEls.length) {\r
      gsap.set(numberEls, { '--sm-num-opacity': 0 });\r
    }\r
    if (socialTitle) {\r
      gsap.set(socialTitle, { opacity: 0 });\r
    }\r
    if (socialLinks.length) {\r
      gsap.set(socialLinks, { y: 25, opacity: 0 });\r
    }\r
\r
    const tl = gsap.timeline({ paused: true });\r
\r
    layerStates.forEach((ls, i) => {\r
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);\r
    });\r
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;\r
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);\r
    const panelDuration = 0.65;\r
    tl.fromTo(\r
      panel,\r
      { xPercent: panelStart },\r
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },\r
      panelInsertTime\r
    );\r
\r
    if (itemEls.length) {\r
      const itemsStartRatio = 0.15;\r
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;\r
      tl.to(\r
        itemEls,\r
        {\r
          yPercent: 0,\r
          rotate: 0,\r
          duration: 1,\r
          ease: 'power4.out',\r
          stagger: { each: 0.1, from: 'start' }\r
        },\r
        itemsStart\r
      );\r
      if (numberEls.length) {\r
        tl.to(\r
          numberEls,\r
          {\r
            duration: 0.6,\r
            ease: 'power2.out',\r
            '--sm-num-opacity': 1,\r
            stagger: { each: 0.08, from: 'start' }\r
          },\r
          itemsStart + 0.1\r
        );\r
      }\r
    }\r
\r
    if (socialTitle || socialLinks.length) {\r
      const socialsStart = panelInsertTime + panelDuration * 0.4;\r
      if (socialTitle) {\r
        tl.to(\r
          socialTitle,\r
          {\r
            opacity: 1,\r
            duration: 0.5,\r
            ease: 'power2.out'\r
          },\r
          socialsStart\r
        );\r
      }\r
      if (socialLinks.length) {\r
        tl.to(\r
          socialLinks,\r
          {\r
            y: 0,\r
            opacity: 1,\r
            duration: 0.55,\r
            ease: 'power3.out',\r
            stagger: { each: 0.08, from: 'start' },\r
            onComplete: () => {\r
              gsap.set(socialLinks, { clearProps: 'opacity' });\r
            }\r
          },\r
          socialsStart + 0.04\r
        );\r
      }\r
    }\r
\r
    openTlRef.current = tl;\r
    return tl;\r
  }, [position]);\r
\r
  const playOpen = useCallback(() => {\r
    if (busyRef.current) return;\r
    busyRef.current = true;\r
    const tl = buildOpenTimeline();\r
    if (tl) {\r
      tl.eventCallback('onComplete', () => {\r
        busyRef.current = false;\r
      });\r
      tl.play(0);\r
    } else {\r
      busyRef.current = false;\r
    }\r
  }, [buildOpenTimeline]);\r
\r
  const playClose = useCallback(() => {\r
    openTlRef.current?.kill();\r
    openTlRef.current = null;\r
    itemEntranceTweenRef.current?.kill();\r
\r
    const panel = panelRef.current;\r
    const layers = preLayerElsRef.current;\r
    if (!panel) return;\r
\r
    const all: HTMLElement[] = [...layers, panel];\r
    closeTweenRef.current?.kill();\r
    const offscreen = position === 'left' ? -100 : 100;\r
    closeTweenRef.current = gsap.to(all, {\r
      xPercent: offscreen,\r
      duration: 0.32,\r
      ease: 'power3.in',\r
      overwrite: 'auto',\r
      onComplete: () => {\r
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];\r
        if (itemEls.length) {\r
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });\r
        }\r
        const numberEls = Array.from(\r
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')\r
        ) as HTMLElement[];\r
        if (numberEls.length) {\r
          gsap.set(numberEls, { '--sm-num-opacity': 0 });\r
        }\r
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;\r
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];\r
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });\r
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });\r
        busyRef.current = false;\r
      }\r
    });\r
  }, [position]);\r
\r
  const animateIcon = useCallback((opening: boolean) => {\r
    const icon = iconRef.current;\r
    if (!icon) return;\r
    spinTweenRef.current?.kill();\r
    if (opening) {\r
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });\r
    } else {\r
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });\r
    }\r
  }, []);\r
\r
  const animateColor = useCallback(\r
    (opening: boolean) => {\r
      const btn = toggleBtnRef.current;\r
      if (!btn) return;\r
      colorTweenRef.current?.kill();\r
      if (changeMenuColorOnOpen) {\r
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;\r
        colorTweenRef.current = gsap.to(btn, {\r
          color: targetColor,\r
          delay: 0.18,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      } else {\r
        gsap.set(btn, { color: menuButtonColor });\r
      }\r
    },\r
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]\r
  );\r
\r
  React.useEffect(() => {\r
    if (toggleBtnRef.current) {\r
      if (changeMenuColorOnOpen) {\r
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;\r
        gsap.set(toggleBtnRef.current, { color: targetColor });\r
      } else {\r
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });\r
      }\r
    }\r
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);\r
\r
  const animateText = useCallback((opening: boolean) => {\r
    const inner = textInnerRef.current;\r
    if (!inner) return;\r
    textCycleAnimRef.current?.kill();\r
\r
    const currentLabel = opening ? 'Menu' : 'Close';\r
    const targetLabel = opening ? 'Close' : 'Menu';\r
    const cycles = 3;\r
    const seq: string[] = [currentLabel];\r
    let last = currentLabel;\r
    for (let i = 0; i < cycles; i++) {\r
      last = last === 'Menu' ? 'Close' : 'Menu';\r
      seq.push(last);\r
    }\r
    if (last !== targetLabel) seq.push(targetLabel);\r
    seq.push(targetLabel);\r
    setTextLines(seq);\r
\r
    gsap.set(inner, { yPercent: 0 });\r
    const lineCount = seq.length;\r
    const finalShift = ((lineCount - 1) / lineCount) * 100;\r
    textCycleAnimRef.current = gsap.to(inner, {\r
      yPercent: -finalShift,\r
      duration: 0.5 + lineCount * 0.07,\r
      ease: 'power4.out'\r
    });\r
  }, []);\r
\r
  const toggleMenu = useCallback(() => {\r
    const target = !openRef.current;\r
    openRef.current = target;\r
    setOpen(target);\r
    if (target) {\r
      onMenuOpen?.();\r
      playOpen();\r
    } else {\r
      onMenuClose?.();\r
      playClose();\r
    }\r
    animateIcon(target);\r
    animateColor(target);\r
    animateText(target);\r
  }, [playOpen, playClose, animateIcon, animateColor, animateText]);\r
\r
  return (\r
    <div\r
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}\r
      style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}\r
      data-position={position}\r
      data-open={open || undefined}\r
    >\r
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">\r
        {(() => {\r
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];\r
          let arr = [...raw];\r
          if (arr.length >= 3) {\r
            const mid = Math.floor(arr.length / 2);\r
            arr.splice(mid, 1);\r
          }\r
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);\r
        })()}\r
      </div>\r
      <header className="staggered-menu-header" aria-label="Main navigation header">\r
        <div className="sm-logo" aria-label="Logo">\r
          <img\r
            src={logoUrl || '/src/assets/logos/reactbits-gh-white.svg'}\r
            alt="Logo"\r
            className="sm-logo-img"\r
            draggable={false}\r
            width={110}\r
            height={24}\r
          />\r
        </div>\r
        <button\r
          ref={toggleBtnRef}\r
          className="sm-toggle"\r
          aria-label={open ? 'Close menu' : 'Open menu'}\r
          aria-expanded={open}\r
          aria-controls="staggered-menu-panel"\r
          onClick={toggleMenu}\r
          type="button"\r
        >\r
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">\r
            <span ref={textInnerRef} className="sm-toggle-textInner">\r
              {textLines.map((l, i) => (\r
                <span className="sm-toggle-line" key={i}>\r
                  {l}\r
                </span>\r
              ))}\r
            </span>\r
          </span>\r
          <span ref={iconRef} className="sm-icon" aria-hidden="true">\r
            <span ref={plusHRef} className="sm-icon-line" />\r
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />\r
          </span>\r
        </button>\r
      </header>\r
\r
      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>\r
        <div className="sm-panel-inner">\r
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>\r
            {items && items.length ? (\r
              items.map((it, idx) => (\r
                <li className="sm-panel-itemWrap" key={it.label + idx}>\r
                  <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel} data-index={idx + 1}>\r
                    <span className="sm-panel-itemLabel">{it.label}</span>\r
                  </a>\r
                </li>\r
              ))\r
            ) : (\r
              <li className="sm-panel-itemWrap" aria-hidden="true">\r
                <span className="sm-panel-item">\r
                  <span className="sm-panel-itemLabel">No items</span>\r
                </span>\r
              </li>\r
            )}\r
          </ul>\r
          {displaySocials && socialItems && socialItems.length > 0 && (\r
            <div className="sm-socials" aria-label="Social links">\r
              <h3 className="sm-socials-title">Socials</h3>\r
              <ul className="sm-socials-list" role="list">\r
                {socialItems.map((s, i) => (\r
                  <li key={s.label + i} className="sm-socials-item">\r
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">\r
                      {s.label}\r
                    </a>\r
                  </li>\r
                ))}\r
              </ul>\r
            </div>\r
          )}\r
        </div>\r
      </aside>\r
    </div>\r
  );\r
};\r
\r
export default StaggeredMenu;\r
`,Me=`import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';\r
import { gsap } from 'gsap';\r
\r
export interface StaggeredMenuItem {\r
  label: string;\r
  ariaLabel: string;\r
  link: string;\r
}\r
export interface StaggeredMenuSocialItem {\r
  label: string;\r
  link: string;\r
}\r
export interface StaggeredMenuProps {\r
  position?: 'left' | 'right';\r
  colors?: string[];\r
  items?: StaggeredMenuItem[];\r
  socialItems?: StaggeredMenuSocialItem[];\r
  displaySocials?: boolean;\r
  displayItemNumbering?: boolean;\r
  className?: string;\r
  logoUrl?: string;\r
  menuButtonColor?: string;\r
  openMenuButtonColor?: string;\r
  accentColor?: string;\r
  isFixed: boolean;\r
  changeMenuColorOnOpen?: boolean;\r
  onMenuOpen?: () => void;\r
  onMenuClose?: () => void;\r
}\r
\r
export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({\r
  position = 'right',\r
  colors = ['#B19EEF', '#5227FF'],\r
  items = [],\r
  socialItems = [],\r
  displaySocials = true,\r
  displayItemNumbering = true,\r
  className,\r
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',\r
  menuButtonColor = '#fff',\r
  openMenuButtonColor = '#fff',\r
  changeMenuColorOnOpen = true,\r
  accentColor = '#5227FF',\r
  isFixed = false,\r
  onMenuOpen,\r
  onMenuClose\r
}: StaggeredMenuProps) => {\r
  const [open, setOpen] = useState(false);\r
  const openRef = useRef(false);\r
\r
  const panelRef = useRef<HTMLDivElement | null>(null);\r
  const preLayersRef = useRef<HTMLDivElement | null>(null);\r
  const preLayerElsRef = useRef<HTMLElement[]>([]);\r
\r
  const plusHRef = useRef<HTMLSpanElement | null>(null);\r
  const plusVRef = useRef<HTMLSpanElement | null>(null);\r
  const iconRef = useRef<HTMLSpanElement | null>(null);\r
\r
  const textInnerRef = useRef<HTMLSpanElement | null>(null);\r
  const textWrapRef = useRef<HTMLSpanElement | null>(null);\r
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);\r
\r
  const openTlRef = useRef<gsap.core.Timeline | null>(null);\r
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);\r
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);\r
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);\r
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);\r
\r
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);\r
  const busyRef = useRef(false);\r
\r
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);\r
\r
  useLayoutEffect(() => {\r
    const ctx = gsap.context(() => {\r
      const panel = panelRef.current;\r
      const preContainer = preLayersRef.current;\r
\r
      const plusH = plusHRef.current;\r
      const plusV = plusVRef.current;\r
      const icon = iconRef.current;\r
      const textInner = textInnerRef.current;\r
\r
      if (!panel || !plusH || !plusV || !icon || !textInner) return;\r
\r
      let preLayers: HTMLElement[] = [];\r
      if (preContainer) {\r
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];\r
      }\r
      preLayerElsRef.current = preLayers;\r
\r
      const offscreen = position === 'left' ? -100 : 100;\r
      gsap.set([panel, ...preLayers], { xPercent: offscreen });\r
\r
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });\r
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });\r
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });\r
\r
      gsap.set(textInner, { yPercent: 0 });\r
\r
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });\r
    });\r
    return () => ctx.revert();\r
  }, [menuButtonColor, position]);\r
\r
  const buildOpenTimeline = useCallback(() => {\r
    const panel = panelRef.current;\r
    const layers = preLayerElsRef.current;\r
    if (!panel) return null;\r
\r
    openTlRef.current?.kill();\r
    if (closeTweenRef.current) {\r
      closeTweenRef.current.kill();\r
      closeTweenRef.current = null;\r
    }\r
    itemEntranceTweenRef.current?.kill();\r
\r
    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];\r
    const numberEls = Array.from(\r
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')\r
    ) as HTMLElement[];\r
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;\r
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];\r
\r
    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));\r
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));\r
\r
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });\r
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });\r
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });\r
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });\r
\r
    const tl = gsap.timeline({ paused: true });\r
\r
    layerStates.forEach((ls, i) => {\r
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);\r
    });\r
\r
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;\r
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);\r
    const panelDuration = 0.65;\r
\r
    tl.fromTo(\r
      panel,\r
      { xPercent: panelStart },\r
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },\r
      panelInsertTime\r
    );\r
\r
    if (itemEls.length) {\r
      const itemsStartRatio = 0.15;\r
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;\r
\r
      tl.to(\r
        itemEls,\r
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },\r
        itemsStart\r
      );\r
\r
      if (numberEls.length) {\r
        tl.to(\r
          numberEls,\r
          { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } },\r
          itemsStart + 0.1\r
        );\r
      }\r
    }\r
\r
    if (socialTitle || socialLinks.length) {\r
      const socialsStart = panelInsertTime + panelDuration * 0.4;\r
\r
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);\r
      if (socialLinks.length) {\r
        tl.to(\r
          socialLinks,\r
          {\r
            y: 0,\r
            opacity: 1,\r
            duration: 0.55,\r
            ease: 'power3.out',\r
            stagger: { each: 0.08, from: 'start' },\r
            onComplete: () => {\r
              gsap.set(socialLinks, { clearProps: 'opacity' });\r
            }\r
          },\r
          socialsStart + 0.04\r
        );\r
      }\r
    }\r
\r
    openTlRef.current = tl;\r
    return tl;\r
  }, [position]);\r
\r
  const playOpen = useCallback(() => {\r
    if (busyRef.current) return;\r
    busyRef.current = true;\r
    const tl = buildOpenTimeline();\r
    if (tl) {\r
      tl.eventCallback('onComplete', () => {\r
        busyRef.current = false;\r
      });\r
      tl.play(0);\r
    } else {\r
      busyRef.current = false;\r
    }\r
  }, [buildOpenTimeline]);\r
\r
  const playClose = useCallback(() => {\r
    openTlRef.current?.kill();\r
    openTlRef.current = null;\r
    itemEntranceTweenRef.current?.kill();\r
\r
    const panel = panelRef.current;\r
    const layers = preLayerElsRef.current;\r
    if (!panel) return;\r
\r
    const all: HTMLElement[] = [...layers, panel];\r
    closeTweenRef.current?.kill();\r
\r
    const offscreen = position === 'left' ? -100 : 100;\r
\r
    closeTweenRef.current = gsap.to(all, {\r
      xPercent: offscreen,\r
      duration: 0.32,\r
      ease: 'power3.in',\r
      overwrite: 'auto',\r
      onComplete: () => {\r
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];\r
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });\r
\r
        const numberEls = Array.from(\r
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')\r
        ) as HTMLElement[];\r
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });\r
\r
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;\r
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];\r
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });\r
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });\r
\r
        busyRef.current = false;\r
      }\r
    });\r
  }, [position]);\r
\r
  const animateIcon = useCallback((opening: boolean) => {\r
    const icon = iconRef.current;\r
    const h = plusHRef.current;\r
    const v = plusVRef.current;\r
    if (!icon || !h || !v) return;\r
\r
    spinTweenRef.current?.kill();\r
\r
    if (opening) {\r
      // ensure container never rotates\r
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });\r
      spinTweenRef.current = gsap\r
        .timeline({ defaults: { ease: 'power4.out' } })\r
        .to(h, { rotate: 45, duration: 0.5 }, 0)\r
        .to(v, { rotate: -45, duration: 0.5 }, 0);\r
    } else {\r
      spinTweenRef.current = gsap\r
        .timeline({ defaults: { ease: 'power3.inOut' } })\r
        .to(h, { rotate: 0, duration: 0.35 }, 0)\r
        .to(v, { rotate: 90, duration: 0.35 }, 0)\r
        .to(icon, { rotate: 0, duration: 0.001 }, 0);\r
    }\r
  }, []);\r
\r
  const animateColor = useCallback(\r
    (opening: boolean) => {\r
      const btn = toggleBtnRef.current;\r
      if (!btn) return;\r
      colorTweenRef.current?.kill();\r
      if (changeMenuColorOnOpen) {\r
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;\r
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });\r
      } else {\r
        gsap.set(btn, { color: menuButtonColor });\r
      }\r
    },\r
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]\r
  );\r
\r
  React.useEffect(() => {\r
    if (toggleBtnRef.current) {\r
      if (changeMenuColorOnOpen) {\r
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;\r
        gsap.set(toggleBtnRef.current, { color: targetColor });\r
      } else {\r
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });\r
      }\r
    }\r
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);\r
\r
  const animateText = useCallback((opening: boolean) => {\r
    const inner = textInnerRef.current;\r
    if (!inner) return;\r
\r
    textCycleAnimRef.current?.kill();\r
\r
    const currentLabel = opening ? 'Menu' : 'Close';\r
    const targetLabel = opening ? 'Close' : 'Menu';\r
    const cycles = 3;\r
\r
    const seq: string[] = [currentLabel];\r
    let last = currentLabel;\r
    for (let i = 0; i < cycles; i++) {\r
      last = last === 'Menu' ? 'Close' : 'Menu';\r
      seq.push(last);\r
    }\r
    if (last !== targetLabel) seq.push(targetLabel);\r
    seq.push(targetLabel);\r
\r
    setTextLines(seq);\r
    gsap.set(inner, { yPercent: 0 });\r
\r
    const lineCount = seq.length;\r
    const finalShift = ((lineCount - 1) / lineCount) * 100;\r
\r
    textCycleAnimRef.current = gsap.to(inner, {\r
      yPercent: -finalShift,\r
      duration: 0.5 + lineCount * 0.07,\r
      ease: 'power4.out'\r
    });\r
  }, []);\r
\r
  const toggleMenu = useCallback(() => {\r
    const target = !openRef.current;\r
    openRef.current = target;\r
    setOpen(target);\r
\r
    if (target) {\r
      onMenuOpen?.();\r
      playOpen();\r
    } else {\r
      onMenuClose?.();\r
      playClose();\r
    }\r
\r
    animateIcon(target);\r
    animateColor(target);\r
    animateText(target);\r
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);\r
\r
  return (\r
    <div\r
      className={\`sm-scope z-40 \${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden' : 'w-full h-full'}\`}\r
    >\r
      <div\r
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper relative w-full h-full z-40'}\r
        style={accentColor ? ({ ['--sm-accent' as any]: accentColor } as React.CSSProperties) : undefined}\r
        data-position={position}\r
        data-open={open || undefined}\r
      >\r
        <div\r
          ref={preLayersRef}\r
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"\r
          aria-hidden="true"\r
        >\r
          {(() => {\r
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];\r
            let arr = [...raw];\r
            if (arr.length >= 3) {\r
              const mid = Math.floor(arr.length / 2);\r
              arr.splice(mid, 1);\r
            }\r
            return arr.map((c, i) => (\r
              <div\r
                key={i}\r
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"\r
                style={{ background: c }}\r
              />\r
            ));\r
          })()}\r
        </div>\r
\r
        <header\r
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between p-[2em] bg-transparent pointer-events-none z-20"\r
          aria-label="Main navigation header"\r
        >\r
          <div className="sm-logo flex items-center select-none pointer-events-auto" aria-label="Logo">\r
            <img\r
              src={logoUrl || '/src/assets/logos/reactbits-gh-white.svg'}\r
              alt="Logo"\r
              className="sm-logo-img block h-8 w-auto object-contain"\r
              draggable={false}\r
              width={110}\r
              height={24}\r
            />\r
          </div>\r
\r
          <button\r
            ref={toggleBtnRef}\r
            className={\`sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible pointer-events-auto \${\r
              open ? 'text-black' : 'text-[#e9e9ef]'\r
            }\`}\r
            aria-label={open ? 'Close menu' : 'Open menu'}\r
            aria-expanded={open}\r
            aria-controls="staggered-menu-panel"\r
            onClick={toggleMenu}\r
            type="button"\r
          >\r
            <span\r
              ref={textWrapRef}\r
              className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap w-[var(--sm-toggle-width,auto)] min-w-[var(--sm-toggle-width,auto)]"\r
              aria-hidden="true"\r
            >\r
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">\r
                {textLines.map((l, i) => (\r
                  <span className="sm-toggle-line block h-[1em] leading-none" key={i}>\r
                    {l}\r
                  </span>\r
                ))}\r
              </span>\r
            </span>\r
\r
            <span\r
              ref={iconRef}\r
              className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center [will-change:transform]"\r
              aria-hidden="true"\r
            >\r
              <span\r
                ref={plusHRef}\r
                className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"\r
              />\r
              <span\r
                ref={plusVRef}\r
                className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"\r
              />\r
            </span>\r
          </button>\r
        </header>\r
\r
        <aside\r
          id="staggered-menu-panel"\r
          ref={panelRef}\r
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px]"\r
          style={{ WebkitBackdropFilter: 'blur(12px)' }}\r
          aria-hidden={!open}\r
        >\r
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">\r
            <ul\r
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"\r
              role="list"\r
              data-numbering={displayItemNumbering || undefined}\r
            >\r
              {items && items.length ? (\r
                items.map((it, idx) => (\r
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>\r
                    <a\r
                      className="sm-panel-item relative text-black font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"\r
                      href={it.link}\r
                      aria-label={it.ariaLabel}\r
                      data-index={idx + 1}\r
                    >\r
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">\r
                        {it.label}\r
                      </span>\r
                    </a>\r
                  </li>\r
                ))\r
              ) : (\r
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">\r
                  <span className="sm-panel-item relative text-black font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">\r
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">\r
                      No items\r
                    </span>\r
                  </span>\r
                </li>\r
              )}\r
            </ul>\r
\r
            {displaySocials && socialItems && socialItems.length > 0 && (\r
              <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">\r
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#ff0000)]">Socials</h3>\r
                <ul\r
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"\r
                  role="list"\r
                >\r
                  {socialItems.map((s, i) => (\r
                    <li key={s.label + i} className="sm-socials-item">\r
                      <a\r
                        href={s.link}\r
                        target="_blank"\r
                        rel="noopener noreferrer"\r
                        className="sm-socials-link text-[1.2rem] font-medium text-[#111] no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"\r
                      >\r
                        {s.label}\r
                      </a>\r
                    </li>\r
                  ))}\r
                </ul>\r
              </div>\r
            )}\r
          </div>\r
        </aside>\r
      </div>\r
\r
      <style>{\`\r
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; }\r
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 2em; background: transparent; pointer-events: none; z-index: 20; }\r
.sm-scope .staggered-menu-header > * { pointer-events: auto; }\r
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }\r
.sm-scope .sm-logo-img { display: block; height: 32px; width: auto; object-fit: contain; }\r
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; color: #e9e9ef; font-weight: 500; line-height: 1; overflow: visible; }\r
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }\r
.sm-scope .sm-line:last-of-type { margin-top: 6px; }\r
.sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.5em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; width: var(--sm-toggle-width, auto); min-width: var(--sm-toggle-width, auto); }\r
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }\r
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }\r
.sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }\r
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }\r
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }\r
.sm-scope .sm-line { display: none !important; }\r
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(260px, 38vw, 420px); height: 100%; background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto; z-index: 10; }\r
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }\r
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(260px, 38vw, 420px); pointer-events: none; z-index: 5; }\r
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }\r
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }\r
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }\r
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }\r
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: var(--sm-accent, #ff0000); }\r
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }\r
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }\r
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }\r
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }\r
.sm-scope .sm-socials-list .sm-socials-link:hover,\r
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }\r
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ff0000); outline-offset: 3px; }\r
.sm-scope .sm-socials-link { font-size: 1.2rem; font-weight: 500; color: #111; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }\r
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }\r
.sm-scope .sm-panel-title { margin: 0; font-size: 1rem; font-weight: 600; color: #fff; text-transform: uppercase; }\r
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }\r
.sm-scope .sm-panel-item { position: relative; color: #000; font-weight: 600; font-size: 4rem; cursor: pointer; line-height: 1; letter-spacing: -2px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: inline-block; text-decoration: none; padding-right: 1.4em; }\r
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }\r
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }\r
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }\r
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-size: 18px; font-weight: 400; color: var(--sm-accent, #ff0000); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }\r
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { filter: invert(100%); } }\r
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { filter: invert(100%); } }\r
      \`}</style>\r
    </div>\r
  );\r
};\r
\r
export default StaggeredMenu;\r
`,Ne={dependencies:"gsap",usage:`import StaggeredMenu from './StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

<div style={{ height: '100vh', background: '#1a1a1a' }}>
  <StaggeredMenu
    position="right"
    items={menuItems}
    socialItems={socialItems}
    displaySocials={true}
    displayItemNumbering={true}
    menuButtonColor="#fff"
    openMenuButtonColor="#fff"
    changeMenuColorOnOpen={true}
    colors={['#B19EEF', '#5227FF']}
    logoUrl="/path-to-your-logo.svg"
    accentColor="#ff6b6b"
    onMenuOpen={() => console.log('Menu opened')}
    onMenuClose={() => console.log('Menu closed')}
  />
</div>`,code:ve,css:Te,tailwind:Le,tsCode:Se,tsTailwind:Me},Ee=({position:h="right",colors:C=["#B19EEF","#5227FF"],items:b=[],socialItems:v=[],displaySocials:S=!0,displayItemNumbering:P=!0,className:x,logoUrl:A="/src/assets/logos/reactbits-gh-white.svg",menuButtonColor:m="#fff",openMenuButtonColor:R="#fff",accentColor:M="#5227FF",changeMenuColorOnOpen:w=!0,isFixed:H=!1,onMenuOpen:f,onMenuClose:N})=>{const[E,ae]=t.useState(!1),q=t.useRef(!1),I=t.useRef(null),D=t.useRef(null),j=t.useRef([]),_=t.useRef(null),U=t.useRef(null),F=t.useRef(null),z=t.useRef(null),oe=t.useRef(null),[ie,ce]=t.useState(["Menu","Close"]),O=t.useRef(null),T=t.useRef(null),W=t.useRef(null),G=t.useRef(null),X=t.useRef(null),y=t.useRef(null),L=t.useRef(!1),$=t.useRef(null);t.useLayoutEffect(()=>{const e=s.context(()=>{const n=I.current,l=D.current,o=_.current,p=U.current,a=F.current,i=z.current;if(!n||!o||!p||!a||!i)return;let u=[];l&&(u=Array.from(l.querySelectorAll(".sm-prelayer"))),j.current=u;const c=h==="left"?-100:100;s.set([n,...u],{xPercent:c}),s.set(o,{transformOrigin:"50% 50%",rotate:0}),s.set(p,{transformOrigin:"50% 50%",rotate:90}),s.set(a,{rotate:0,transformOrigin:"50% 50%"}),s.set(i,{yPercent:0}),y.current&&s.set(y.current,{color:m})});return()=>e.revert()},[m,h]);const K=t.useCallback(()=>{var re,te;const e=I.current,n=j.current;if(!e)return null;(re=O.current)==null||re.kill(),T.current&&(T.current.kill(),T.current=null),(te=$.current)==null||te.kill();const l=Array.from(e.querySelectorAll(".sm-panel-itemLabel")),o=Array.from(e.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")),p=e.querySelector(".sm-socials-title"),a=Array.from(e.querySelectorAll(".sm-socials-link")),i=n.map(d=>({el:d,start:Number(s.getProperty(d,"xPercent"))})),u=Number(s.getProperty(e,"xPercent"));l.length&&s.set(l,{yPercent:140,rotate:10}),o.length&&s.set(o,{"--sm-num-opacity":0}),p&&s.set(p,{opacity:0}),a.length&&s.set(a,{y:25,opacity:0});const c=s.timeline({paused:!0});i.forEach((d,B)=>{c.fromTo(d.el,{xPercent:d.start},{xPercent:0,duration:.5,ease:"power4.out"},B*.07)});const g=(i.length?(i.length-1)*.07:0)+(i.length?.08:0),V=.65;if(c.fromTo(e,{xPercent:u},{xPercent:0,duration:V,ease:"power4.out"},g),l.length){const B=g+V*.15;c.to(l,{yPercent:0,rotate:0,duration:1,ease:"power4.out",stagger:{each:.1,from:"start"}},B),o.length&&c.to(o,{duration:.6,ease:"power2.out","--sm-num-opacity":1,stagger:{each:.08,from:"start"}},B+.1)}if(p||a.length){const d=g+V*.4;p&&c.to(p,{opacity:1,duration:.5,ease:"power2.out"},d),a.length&&c.to(a,{y:0,opacity:1,duration:.55,ease:"power3.out",stagger:{each:.08,from:"start"},onComplete:()=>{s.set(a,{clearProps:"opacity"})}},d+.04)}return O.current=c,c},[]),J=t.useCallback(()=>{if(L.current)return;L.current=!0;const e=K();e?(e.eventCallback("onComplete",()=>{L.current=!1}),e.play(0)):L.current=!1},[K]),Q=t.useCallback(()=>{var p,a,i;(p=O.current)==null||p.kill(),O.current=null,(a=$.current)==null||a.kill();const e=I.current,n=j.current;if(!e)return;const l=[...n,e];(i=T.current)==null||i.kill();const o=h==="left"?-100:100;T.current=s.to(l,{xPercent:o,duration:.32,ease:"power3.in",overwrite:"auto",onComplete:()=>{const u=Array.from(e.querySelectorAll(".sm-panel-itemLabel"));u.length&&s.set(u,{yPercent:140,rotate:10});const c=Array.from(e.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));c.length&&s.set(c,{"--sm-num-opacity":0});const k=e.querySelector(".sm-socials-title"),g=Array.from(e.querySelectorAll(".sm-socials-link"));k&&s.set(k,{opacity:0}),g.length&&s.set(g,{y:25,opacity:0}),L.current=!1}})},[h]),Y=t.useCallback(e=>{var l;const n=F.current;n&&((l=W.current)==null||l.kill(),e?W.current=s.to(n,{rotate:225,duration:.8,ease:"power4.out",overwrite:"auto"}):W.current=s.to(n,{rotate:0,duration:.35,ease:"power3.inOut",overwrite:"auto"}))},[]),Z=t.useCallback(e=>{var l;const n=y.current;if(n)if((l=X.current)==null||l.kill(),w){const o=e?R:m;X.current=s.to(n,{color:o,delay:.18,duration:.3,ease:"power2.out"})}else s.set(n,{color:m})},[R,m,w]);ue.useEffect(()=>{if(y.current)if(w){const e=q.current?R:m;s.set(y.current,{color:e})}else s.set(y.current,{color:m})},[w,m,R]);const ee=t.useCallback(e=>{var k;const n=z.current;if(!n)return;(k=G.current)==null||k.kill();const l=e?"Menu":"Close",o=e?"Close":"Menu",p=3,a=[l];let i=l;for(let g=0;g<p;g++)i=i==="Menu"?"Close":"Menu",a.push(i);i!==o&&a.push(o),a.push(o),ce(a),s.set(n,{yPercent:0});const u=a.length,c=(u-1)/u*100;G.current=s.to(n,{yPercent:-c,duration:.5+u*.07,ease:"power4.out"})},[]),pe=t.useCallback(()=>{const e=!q.current;q.current=e,ae(e),e?(f==null||f(),J()):(N==null||N(),Q()),Y(e),Z(e),ee(e)},[J,Q,Y,Z,ee,f,N]);return r.jsxs("div",{className:(x?x+" ":"")+"staggered-menu-wrapper"+(H?" fixed-wrapper":""),style:M?{"--sm-accent":M}:void 0,"data-position":h,"data-open":E||void 0,children:[r.jsx("div",{ref:D,className:"sm-prelayers","aria-hidden":"true",children:(()=>{let n=[...C&&C.length?C.slice(0,4):["#1e1e22","#35353c"]];if(n.length>=3){const l=Math.floor(n.length/2);n.splice(l,1)}return n.map((l,o)=>r.jsx("div",{className:"sm-prelayer",style:{background:l}},o))})()}),r.jsxs("header",{className:"staggered-menu-header","aria-label":"Main navigation header",children:[r.jsx("div",{className:"sm-logo","aria-label":"Logo",children:r.jsx("img",{src:A||"/src/assets/logos/reactbits-gh-white.svg",alt:"Logo",className:"sm-logo-img",draggable:!1,width:110,height:24})}),r.jsxs("button",{ref:y,className:"sm-toggle","aria-label":E?"Close menu":"Open menu","aria-expanded":E,"aria-controls":"staggered-menu-panel",onClick:pe,type:"button",children:[r.jsx("span",{ref:oe,className:"sm-toggle-textWrap","aria-hidden":"true",children:r.jsx("span",{ref:z,className:"sm-toggle-textInner",children:ie.map((e,n)=>r.jsx("span",{className:"sm-toggle-line",children:e},n))})}),r.jsxs("span",{ref:F,className:"sm-icon","aria-hidden":"true",children:[r.jsx("span",{ref:_,className:"sm-icon-line"}),r.jsx("span",{ref:U,className:"sm-icon-line sm-icon-line-v"})]})]})]}),r.jsx("aside",{id:"staggered-menu-panel",ref:I,className:"staggered-menu-panel","aria-hidden":!E,children:r.jsxs("div",{className:"sm-panel-inner",children:[r.jsx("ul",{className:"sm-panel-list",role:"list","data-numbering":P||void 0,children:b&&b.length?b.map((e,n)=>r.jsx("li",{className:"sm-panel-itemWrap",children:r.jsx("a",{className:"sm-panel-item",href:e.link,"aria-label":e.ariaLabel,"data-index":n+1,children:r.jsx("span",{className:"sm-panel-itemLabel",children:e.label})})},e.label+n)):r.jsx("li",{className:"sm-panel-itemWrap","aria-hidden":"true",children:r.jsx("span",{className:"sm-panel-item",children:r.jsx("span",{className:"sm-panel-itemLabel",children:"No items"})})})}),S&&v&&v.length>0&&r.jsxs("div",{className:"sm-socials","aria-label":"Social links",children:[r.jsx("h3",{className:"sm-socials-title",children:"Socials"}),r.jsx("ul",{className:"sm-socials-list",role:"list",children:v.map((e,n)=>r.jsx("li",{className:"sm-socials-item",children:r.jsx("a",{href:e.link,target:"_blank",rel:"noopener noreferrer",className:"sm-socials-link",children:e.label})},e.label+n))})]})]})})]})},We=()=>{const[h,C]=t.useState(!0),[b,v]=t.useState("#5227FF"),[S,P]=t.useState("#ffffff"),[x,A]=t.useState("right"),[m,R]=ke(),M=[{label:"Home",ariaLabel:"Go to Home section",link:"#home"},{label:"About",ariaLabel:"Go to About section",link:"#about"},{label:"Projects",ariaLabel:"Go to Projects section",link:"#projects"},{label:"Contact",ariaLabel:"Go to Contact section",link:"#contact"}],w=[{label:"GitHub",link:"https://github.com/your-handle"},{label:"Twitter",link:"https://twitter.com/your-handle"},{label:"LinkedIn",link:"https://linkedin.com/in/your-handle"}],H=[{name:"position",type:'"left" | "right"',default:'"right"',description:"Anchor position for the menu panel (left or right side)."},{name:"colors",type:"string[]",default:'["#B19EEF", "#5227FF"]',description:"Colors used for staggered underlay layers."},{name:"items",type:"StaggeredMenuItem[]",default:"[]",description:"Menu items rendered inside the panel."},{name:"socialItems",type:"StaggeredMenuSocialItem[]",default:"[]",description:"Social links displayed in the menu panel."},{name:"displaySocials",type:"boolean",default:"false",description:"Whether to display the social links section."},{name:"displayItemNumbering",type:"boolean",default:"true",description:"Whether to show numbering for menu items."},{name:"className",type:"string",default:"undefined",description:"Optional extra class names."},{name:"logoUrl",type:"string",default:"",description:"Path to the logo image."},{name:"menuButtonColor",type:"string",default:'"#fff"',description:"Color of the menu toggle button when closed."},{name:"openMenuButtonColor",type:"string",default:'"#fff"',description:"Color of the menu toggle button when open."},{name:"accentColor",type:"string",default:"undefined",description:"Hover accent color for menu items."},{name:"changeMenuColorOnOpen",type:"boolean",default:"true",description:"Whether to animate the button color when opening/closing."},{name:"onMenuOpen",type:"() => void",default:"undefined",description:"Callback function called when menu opens."},{name:"onMenuClose",type:"() => void",default:"undefined",description:"Callback function called when menu closes."}];return r.jsxs(fe,{children:[r.jsxs(ge,{children:[r.jsx(me,{position:"relative",className:"demo-container demo-container-dots",h:800,overflow:"hidden",p:0,children:r.jsx(Ee,{logoUrl:Ce,items:M,socialItems:w,openMenuButtonColor:x==="left"?"#fff":"#000",displaySocials:h,accentColor:b,menuButtonColor:S,position:x},m)}),r.jsxs(be,{children:[r.jsx(we,{title:"Position",value:x,onChange:f=>{A(f),R()},options:[{value:"right",label:"Right"},{value:"left",label:"Left"}],width:110}),r.jsxs(ne,{alignItems:"center",my:4,children:[r.jsx(se,{fontSize:"sm",mr:2,children:"Accent Color"}),r.jsx(le,{type:"color",value:b,onChange:f=>v(f.target.value),width:"50px",p:0,h:"32px",border:"none",bg:"transparent"})]}),r.jsxs(ne,{alignItems:"center",mb:4,children:[r.jsx(se,{fontSize:"sm",mr:2,children:"Menu Button Color"}),r.jsx(le,{type:"color",value:S,onChange:f=>P(f.target.value),width:"50px",p:0,h:"32px",border:"none",bg:"transparent"})]}),r.jsx(Re,{title:"Display Socials",isChecked:h,onChange:C})]}),r.jsx(de,{data:H}),r.jsx(xe,{dependencyList:["gsap"]})]}),r.jsx(he,{children:r.jsx(ye,{codeObject:Ne})})]})};export{We as default};
