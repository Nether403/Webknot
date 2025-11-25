import{e as Q,r as i,j as n,B as Z,a as rr}from"./index-wsKSLPNH.js";import{T as nr,P as er,a as ar,C as tr,b as ir}from"./PropTable-C4uPWs8h.js";import{C as or}from"./Customize-1m_ZNqR9.js";import{u as cr}from"./useForceRerender-BCFU-k0M.js";import{P as F}from"./PreviewSwitch-DqnF708j.js";import"./index-Bpz4cGEA.js";const sr=`import React, { useEffect, useRef, useCallback, useMemo } from 'react';\r
import './ProfileCard.css';\r
\r
const DEFAULT_BEHIND_GRADIENT =\r
  'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)';\r
\r
const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';\r
\r
const ANIMATION_CONFIG = {\r
  SMOOTH_DURATION: 600,\r
  INITIAL_DURATION: 1500,\r
  INITIAL_X_OFFSET: 70,\r
  INITIAL_Y_OFFSET: 60,\r
  DEVICE_BETA_OFFSET: 20\r
};\r
\r
const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);\r
\r
const round = (value, precision = 3) => parseFloat(value.toFixed(precision));\r
\r
const adjust = (value, fromMin, fromMax, toMin, toMax) =>\r
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));\r
\r
const easeInOutCubic = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);\r
\r
const ProfileCardComponent = ({\r
  avatarUrl = '<Placeholder for avatar URL>',\r
  iconUrl = '<Placeholder for icon URL>',\r
  grainUrl = '<Placeholder for grain URL>',\r
  behindGradient,\r
  innerGradient,\r
  showBehindGradient = true,\r
  className = '',\r
  enableTilt = true,\r
  enableMobileTilt = false,\r
  mobileTiltSensitivity = 5,\r
  miniAvatarUrl,\r
  name = 'Javi A. Torres',\r
  title = 'Software Engineer',\r
  handle = 'javicodes',\r
  status = 'Online',\r
  contactText = 'Contact',\r
  showUserInfo = true,\r
  onContactClick\r
}) => {\r
  const wrapRef = useRef(null);\r
  const cardRef = useRef(null);\r
\r
  const animationHandlers = useMemo(() => {\r
    if (!enableTilt) return null;\r
\r
    let rafId = null;\r
\r
    const updateCardTransform = (offsetX, offsetY, card, wrap) => {\r
      const width = card.clientWidth;\r
      const height = card.clientHeight;\r
\r
      const percentX = clamp((100 / width) * offsetX);\r
      const percentY = clamp((100 / height) * offsetY);\r
\r
      const centerX = percentX - 50;\r
      const centerY = percentY - 50;\r
\r
      const properties = {\r
        '--pointer-x': \`\${percentX}%\`,\r
        '--pointer-y': \`\${percentY}%\`,\r
        '--background-x': \`\${adjust(percentX, 0, 100, 35, 65)}%\`,\r
        '--background-y': \`\${adjust(percentY, 0, 100, 35, 65)}%\`,\r
        '--pointer-from-center': \`\${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}\`,\r
        '--pointer-from-top': \`\${percentY / 100}\`,\r
        '--pointer-from-left': \`\${percentX / 100}\`,\r
        '--rotate-x': \`\${round(-(centerX / 5))}deg\`,\r
        '--rotate-y': \`\${round(centerY / 4)}deg\`\r
      };\r
\r
      Object.entries(properties).forEach(([property, value]) => {\r
        wrap.style.setProperty(property, value);\r
      });\r
    };\r
\r
    const createSmoothAnimation = (duration, startX, startY, card, wrap) => {\r
      const startTime = performance.now();\r
      const targetX = wrap.clientWidth / 2;\r
      const targetY = wrap.clientHeight / 2;\r
\r
      const animationLoop = currentTime => {\r
        const elapsed = currentTime - startTime;\r
        const progress = clamp(elapsed / duration);\r
        const easedProgress = easeInOutCubic(progress);\r
\r
        const currentX = adjust(easedProgress, 0, 1, startX, targetX);\r
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);\r
\r
        updateCardTransform(currentX, currentY, card, wrap);\r
\r
        if (progress < 1) {\r
          rafId = requestAnimationFrame(animationLoop);\r
        }\r
      };\r
\r
      rafId = requestAnimationFrame(animationLoop);\r
    };\r
\r
    return {\r
      updateCardTransform,\r
      createSmoothAnimation,\r
      cancelAnimation: () => {\r
        if (rafId) {\r
          cancelAnimationFrame(rafId);\r
          rafId = null;\r
        }\r
      }\r
    };\r
  }, [enableTilt]);\r
\r
  const handlePointerMove = useCallback(\r
    event => {\r
      const card = cardRef.current;\r
      const wrap = wrapRef.current;\r
\r
      if (!card || !wrap || !animationHandlers) return;\r
\r
      const rect = card.getBoundingClientRect();\r
      animationHandlers.updateCardTransform(event.clientX - rect.left, event.clientY - rect.top, card, wrap);\r
    },\r
    [animationHandlers]\r
  );\r
\r
  const handlePointerEnter = useCallback(() => {\r
    const card = cardRef.current;\r
    const wrap = wrapRef.current;\r
\r
    if (!card || !wrap || !animationHandlers) return;\r
\r
    animationHandlers.cancelAnimation();\r
    wrap.classList.add('active');\r
    card.classList.add('active');\r
  }, [animationHandlers]);\r
\r
  const handlePointerLeave = useCallback(\r
    event => {\r
      const card = cardRef.current;\r
      const wrap = wrapRef.current;\r
\r
      if (!card || !wrap || !animationHandlers) return;\r
\r
      animationHandlers.createSmoothAnimation(\r
        ANIMATION_CONFIG.SMOOTH_DURATION,\r
        event.offsetX,\r
        event.offsetY,\r
        card,\r
        wrap\r
      );\r
      wrap.classList.remove('active');\r
      card.classList.remove('active');\r
    },\r
    [animationHandlers]\r
  );\r
\r
  const handleDeviceOrientation = useCallback(\r
    event => {\r
      const card = cardRef.current;\r
      const wrap = wrapRef.current;\r
\r
      if (!card || !wrap || !animationHandlers) return;\r
\r
      const { beta, gamma } = event;\r
      if (!beta || !gamma) return;\r
\r
      animationHandlers.updateCardTransform(\r
        card.clientHeight / 2 + gamma * mobileTiltSensitivity,\r
        card.clientWidth / 2 + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,\r
        card,\r
        wrap\r
      );\r
    },\r
    [animationHandlers, mobileTiltSensitivity]\r
  );\r
\r
  useEffect(() => {\r
    if (!enableTilt || !animationHandlers) return;\r
\r
    const card = cardRef.current;\r
    const wrap = wrapRef.current;\r
\r
    if (!card || !wrap) return;\r
\r
    const pointerMoveHandler = handlePointerMove;\r
    const pointerEnterHandler = handlePointerEnter;\r
    const pointerLeaveHandler = handlePointerLeave;\r
    const deviceOrientationHandler = handleDeviceOrientation;\r
\r
    const handleClick = () => {\r
      if (!enableMobileTilt || location.protocol !== 'https:') return;\r
      if (typeof window.DeviceMotionEvent.requestPermission === 'function') {\r
        window.DeviceMotionEvent.requestPermission()\r
          .then(state => {\r
            if (state === 'granted') {\r
              window.addEventListener('deviceorientation', deviceOrientationHandler);\r
            }\r
          })\r
          .catch(err => console.error(err));\r
      } else {\r
        window.addEventListener('deviceorientation', deviceOrientationHandler);\r
      }\r
    };\r
\r
    card.addEventListener('pointerenter', pointerEnterHandler);\r
    card.addEventListener('pointermove', pointerMoveHandler);\r
    card.addEventListener('pointerleave', pointerLeaveHandler);\r
    card.addEventListener('click', handleClick);\r
\r
    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;\r
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;\r
\r
    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);\r
    animationHandlers.createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY, card, wrap);\r
\r
    return () => {\r
      card.removeEventListener('pointerenter', pointerEnterHandler);\r
      card.removeEventListener('pointermove', pointerMoveHandler);\r
      card.removeEventListener('pointerleave', pointerLeaveHandler);\r
      card.removeEventListener('click', handleClick);\r
      window.removeEventListener('deviceorientation', deviceOrientationHandler);\r
      animationHandlers.cancelAnimation();\r
    };\r
  }, [\r
    enableTilt,\r
    enableMobileTilt,\r
    animationHandlers,\r
    handlePointerMove,\r
    handlePointerEnter,\r
    handlePointerLeave,\r
    handleDeviceOrientation\r
  ]);\r
\r
  const cardStyle = useMemo(\r
    () => ({\r
      '--icon': iconUrl ? \`url(\${iconUrl})\` : 'none',\r
      '--grain': grainUrl ? \`url(\${grainUrl})\` : 'none',\r
      '--behind-gradient': showBehindGradient ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT) : 'none',\r
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT\r
    }),\r
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]\r
  );\r
\r
  const handleContactClick = useCallback(() => {\r
    onContactClick?.();\r
  }, [onContactClick]);\r
\r
  return (\r
    <div ref={wrapRef} className={\`pc-card-wrapper \${className}\`.trim()} style={cardStyle}>\r
      <section ref={cardRef} className="pc-card">\r
        <div className="pc-inside">\r
          <div className="pc-shine" />\r
          <div className="pc-glare" />\r
          <div className="pc-content pc-avatar-content">\r
            <img\r
              className="avatar"\r
              src={avatarUrl}\r
              alt={\`\${name || 'User'} avatar\`}\r
              loading="lazy"\r
              onError={e => {\r
                const target = e.target;\r
                target.style.display = 'none';\r
              }}\r
            />\r
            {showUserInfo && (\r
              <div className="pc-user-info">\r
                <div className="pc-user-details">\r
                  <div className="pc-mini-avatar">\r
                    <img\r
                      src={miniAvatarUrl || avatarUrl}\r
                      alt={\`\${name || 'User'} mini avatar\`}\r
                      loading="lazy"\r
                      onError={e => {\r
                        const target = e.target;\r
                        target.style.opacity = '0.5';\r
                        target.src = avatarUrl;\r
                      }}\r
                    />\r
                  </div>\r
                  <div className="pc-user-text">\r
                    <div className="pc-handle">@{handle}</div>\r
                    <div className="pc-status">{status}</div>\r
                  </div>\r
                </div>\r
                <button\r
                  className="pc-contact-btn"\r
                  onClick={handleContactClick}\r
                  style={{ pointerEvents: 'auto' }}\r
                  type="button"\r
                  aria-label={\`Contact \${name || 'user'}\`}\r
                >\r
                  {contactText}\r
                </button>\r
              </div>\r
            )}\r
          </div>\r
          <div className="pc-content">\r
            <div className="pc-details">\r
              <h3>{name}</h3>\r
              <p>{title}</p>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
    </div>\r
  );\r
};\r
\r
const ProfileCard = React.memo(ProfileCardComponent);\r
\r
export default ProfileCard;\r
`,lr=`:root {\r
  --pointer-x: 50%;\r
  --pointer-y: 50%;\r
  --pointer-from-center: 0;\r
  --pointer-from-top: 0.5;\r
  --pointer-from-left: 0.5;\r
  --card-opacity: 0;\r
  --rotate-x: 0deg;\r
  --rotate-y: 0deg;\r
  --background-x: 50%;\r
  --background-y: 50%;\r
  --grain: none;\r
  --icon: none;\r
  --behind-gradient: none;\r
  --inner-gradient: none;\r
  --sunpillar-1: hsl(2, 100%, 73%);\r
  --sunpillar-2: hsl(53, 100%, 69%);\r
  --sunpillar-3: hsl(93, 100%, 69%);\r
  --sunpillar-4: hsl(176, 100%, 76%);\r
  --sunpillar-5: hsl(228, 100%, 74%);\r
  --sunpillar-6: hsl(283, 100%, 73%);\r
  --sunpillar-clr-1: var(--sunpillar-1);\r
  --sunpillar-clr-2: var(--sunpillar-2);\r
  --sunpillar-clr-3: var(--sunpillar-3);\r
  --sunpillar-clr-4: var(--sunpillar-4);\r
  --sunpillar-clr-5: var(--sunpillar-5);\r
  --sunpillar-clr-6: var(--sunpillar-6);\r
  --card-radius: 30px;\r
}\r
\r
.pc-card-wrapper {\r
  perspective: 500px;\r
  transform: translate3d(0, 0, 0.1px);\r
  position: relative;\r
  touch-action: none;\r
}\r
\r
.pc-card-wrapper::before {\r
  content: '';\r
  position: absolute;\r
  inset: -10px;\r
  background: inherit;\r
  background-position: inherit;\r
  border-radius: inherit;\r
  transition: all 0.5s ease;\r
  filter: contrast(2) saturate(2) blur(36px);\r
  transform: scale(0.8) translate3d(0, 0, 0.1px);\r
  background-size: 100% 100%;\r
  background-image: var(--behind-gradient);\r
}\r
\r
.pc-card-wrapper:hover,\r
.pc-card-wrapper.active {\r
  --card-opacity: 1;\r
}\r
\r
.pc-card-wrapper:hover::before,\r
.pc-card-wrapper.active::before {\r
  filter: contrast(1) saturate(2) blur(40px) opacity(1);\r
  transform: scale(0.9) translate3d(0, 0, 0.1px);\r
}\r
\r
.pc-card {\r
  height: 80svh;\r
  max-height: 540px;\r
  display: grid;\r
  aspect-ratio: 0.718;\r
  border-radius: var(--card-radius);\r
  position: relative;\r
  background-blend-mode: color-dodge, normal, normal, normal;\r
  animation: glow-bg 12s linear infinite;\r
  box-shadow: rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px)\r
    calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px;\r
  transition: transform 1s ease;\r
  transform: translate3d(0, 0, 0.1px) rotateX(0deg) rotateY(0deg);\r
  background-size: 100% 100%;\r
  background-position:\r
    0 0,\r
    0 0,\r
    50% 50%,\r
    0 0;\r
  background-image:\r
    radial-gradient(\r
      farthest-side circle at var(--pointer-x) var(--pointer-y),\r
      hsla(266, 100%, 90%, var(--card-opacity)) 4%,\r
      hsla(266, 50%, 80%, calc(var(--card-opacity) * 0.75)) 10%,\r
      hsla(266, 25%, 70%, calc(var(--card-opacity) * 0.5)) 50%,\r
      hsla(266, 0%, 60%, 0) 100%\r
    ),\r
    radial-gradient(35% 52% at 55% 20%, #00ffaac4 0%, #073aff00 100%),\r
    radial-gradient(100% 100% at 50% 50%, #00c1ffff 1%, #073aff00 76%),\r
    conic-gradient(from 124deg at 50% 50%, #c137ffff 0%, #07c6ffff 40%, #07c6ffff 60%, #c137ffff 100%);\r
  overflow: hidden;\r
}\r
\r
.pc-card:hover,\r
.pc-card.active {\r
  transition: none;\r
  transform: translate3d(0, 0, 0.1px) rotateX(var(--rotate-y)) rotateY(var(--rotate-x));\r
}\r
\r
.pc-card * {\r
  display: grid;\r
  grid-area: 1/-1;\r
  border-radius: var(--card-radius);\r
  transform: translate3d(0, 0, 0.1px);\r
  pointer-events: none;\r
}\r
\r
.pc-inside {\r
  inset: 1px;\r
  position: absolute;\r
  background-image: var(--inner-gradient);\r
  background-color: rgba(0, 0, 0, 0.9);\r
  transform: translate3d(0, 0, 0.01px);\r
}\r
\r
.pc-shine {\r
  mask-image: var(--icon);\r
  mask-mode: luminance;\r
  mask-repeat: repeat;\r
  mask-size: 150%;\r
  mask-position: top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x));\r
  transition: filter 0.6s ease;\r
  filter: brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5);\r
  animation: holo-bg 18s linear infinite;\r
  mix-blend-mode: color-dodge;\r
}\r
\r
.pc-shine,\r
.pc-shine::after {\r
  --space: 5%;\r
  --angle: -45deg;\r
  transform: translate3d(0, 0, 1px);\r
  overflow: hidden;\r
  z-index: 3;\r
  background: transparent;\r
  background-size: cover;\r
  background-position: center;\r
  background-image:\r
    repeating-linear-gradient(\r
      0deg,\r
      var(--sunpillar-clr-1) calc(var(--space) * 1),\r
      var(--sunpillar-clr-2) calc(var(--space) * 2),\r
      var(--sunpillar-clr-3) calc(var(--space) * 3),\r
      var(--sunpillar-clr-4) calc(var(--space) * 4),\r
      var(--sunpillar-clr-5) calc(var(--space) * 5),\r
      var(--sunpillar-clr-6) calc(var(--space) * 6),\r
      var(--sunpillar-clr-1) calc(var(--space) * 7)\r
    ),\r
    repeating-linear-gradient(\r
      var(--angle),\r
      #0e152e 0%,\r
      hsl(180, 10%, 60%) 3.8%,\r
      hsl(180, 29%, 66%) 4.5%,\r
      hsl(180, 10%, 60%) 5.2%,\r
      #0e152e 10%,\r
      #0e152e 12%\r
    ),\r
    radial-gradient(\r
      farthest-corner circle at var(--pointer-x) var(--pointer-y),\r
      hsla(0, 0%, 0%, 0.1) 12%,\r
      hsla(0, 0%, 0%, 0.15) 20%,\r
      hsla(0, 0%, 0%, 0.25) 120%\r
    );\r
  background-position:\r
    0 var(--background-y),\r
    var(--background-x) var(--background-y),\r
    center;\r
  background-blend-mode: color, hard-light;\r
  background-size:\r
    500% 500%,\r
    300% 300%,\r
    200% 200%;\r
  background-repeat: repeat;\r
}\r
\r
.pc-shine::before,\r
.pc-shine::after {\r
  content: '';\r
  background-position: center;\r
  background-size: cover;\r
  grid-area: 1/1;\r
  opacity: 0;\r
}\r
\r
.pc-card:hover .pc-shine,\r
.pc-card.active .pc-shine {\r
  filter: brightness(0.85) contrast(1.5) saturate(0.5);\r
  animation: none;\r
}\r
\r
.pc-card:hover .pc-shine::before,\r
.pc-card.active .pc-shine::before,\r
.pc-card:hover .pc-shine::after,\r
.pc-card.active .pc-shine::after {\r
  opacity: 1;\r
}\r
\r
.pc-shine::before {\r
  background-image:\r
    linear-gradient(\r
      45deg,\r
      var(--sunpillar-4),\r
      var(--sunpillar-5),\r
      var(--sunpillar-6),\r
      var(--sunpillar-1),\r
      var(--sunpillar-2),\r
      var(--sunpillar-3)\r
    ),\r
    radial-gradient(circle at var(--pointer-x) var(--pointer-y), hsl(0, 0%, 70%) 0%, hsla(0, 0%, 30%, 0.2) 90%),\r
    var(--grain);\r
  background-size:\r
    250% 250%,\r
    100% 100%,\r
    220px 220px;\r
  background-position:\r
    var(--pointer-x) var(--pointer-y),\r
    center,\r
    calc(var(--pointer-x) * 0.01) calc(var(--pointer-y) * 0.01);\r
  background-blend-mode: color-dodge;\r
  filter: brightness(calc(2 - var(--pointer-from-center))) contrast(calc(var(--pointer-from-center) + 2))\r
    saturate(calc(0.5 + var(--pointer-from-center)));\r
  mix-blend-mode: luminosity;\r
}\r
\r
.pc-shine::after {\r
  background-position:\r
    0 var(--background-y),\r
    calc(var(--background-x) * 0.4) calc(var(--background-y) * 0.5),\r
    center;\r
  background-size:\r
    200% 300%,\r
    700% 700%,\r
    100% 100%;\r
  mix-blend-mode: difference;\r
  filter: brightness(0.8) contrast(1.5);\r
}\r
\r
.pc-glare {\r
  transform: translate3d(0, 0, 1.1px);\r
  overflow: hidden;\r
  background-image: radial-gradient(\r
    farthest-corner circle at var(--pointer-x) var(--pointer-y),\r
    hsl(248, 25%, 80%) 12%,\r
    hsla(207, 40%, 30%, 0.8) 90%\r
  );\r
  mix-blend-mode: overlay;\r
  filter: brightness(0.8) contrast(1.2);\r
  z-index: 4;\r
}\r
\r
.pc-avatar-content {\r
  mix-blend-mode: screen;\r
  overflow: hidden;\r
}\r
\r
.pc-avatar-content .avatar {\r
  width: 100%;\r
  position: absolute;\r
  left: 50%;\r
  transform: translateX(-50%) scale(1);\r
  bottom: 2px;\r
  opacity: calc(1.75 - var(--pointer-from-center));\r
}\r
\r
.pc-avatar-content::before {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  z-index: 1;\r
  backdrop-filter: blur(30px);\r
  mask: linear-gradient(\r
    to bottom,\r
    rgba(0, 0, 0, 0) 0%,\r
    rgba(0, 0, 0, 0) 60%,\r
    rgba(0, 0, 0, 1) 90%,\r
    rgba(0, 0, 0, 1) 100%\r
  );\r
  pointer-events: none;\r
}\r
\r
.pc-user-info {\r
  position: absolute;\r
  bottom: 20px;\r
  left: 20px;\r
  right: 20px;\r
  z-index: 2;\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  background: rgba(255, 255, 255, 0.1);\r
  backdrop-filter: blur(30px);\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  border-radius: 15px;\r
  padding: 12px 14px;\r
  pointer-events: auto;\r
}\r
\r
.pc-user-details {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
}\r
\r
.pc-mini-avatar {\r
  width: 48px;\r
  height: 48px;\r
  border-radius: 50%;\r
  overflow: hidden;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  flex-shrink: 0;\r
}\r
\r
.pc-mini-avatar img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
  border-radius: 50%;\r
}\r
\r
.pc-user-text {\r
  display: flex;\r
  align-items: flex-start;\r
  flex-direction: column;\r
  gap: 6px;\r
}\r
\r
.pc-handle {\r
  font-size: 14px;\r
  font-weight: 500;\r
  color: rgba(255, 255, 255, 0.9);\r
  line-height: 1;\r
}\r
\r
.pc-status {\r
  font-size: 14px;\r
  color: rgba(255, 255, 255, 0.7);\r
  line-height: 1;\r
}\r
\r
.pc-contact-btn {\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  border-radius: 8px;\r
  padding: 8px 16px;\r
  font-size: 14px;\r
  font-weight: 600;\r
  color: rgba(255, 255, 255, 0.9);\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  backdrop-filter: blur(10px);\r
}\r
\r
.pc-contact-btn:hover {\r
  border-color: rgba(255, 255, 255, 0.4);\r
  transform: translateY(-1px);\r
  transition: all 0.2s ease;\r
}\r
\r
.pc-content {\r
  max-height: 100%;\r
  overflow: hidden;\r
  text-align: center;\r
  position: relative;\r
  transform: translate3d(\r
    calc(var(--pointer-from-left) * -6px + 3px),\r
    calc(var(--pointer-from-top) * -6px + 3px),\r
    0.1px\r
  ) !important;\r
  z-index: 5;\r
  mix-blend-mode: luminosity;\r
}\r
\r
.pc-details {\r
  width: 100%;\r
  position: absolute;\r
  top: 3em;\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
.pc-details h3 {\r
  font-weight: 600;\r
  margin: 0;\r
  font-size: min(5svh, 3em);\r
  margin: 0;\r
  background-image: linear-gradient(to bottom, #fff, #6f6fbe);\r
  background-size: 1em 1.5em;\r
  -webkit-text-fill-color: transparent;\r
  background-clip: text;\r
  -webkit-background-clip: text;\r
}\r
\r
.pc-details p {\r
  font-weight: 600;\r
  position: relative;\r
  top: -12px;\r
  white-space: nowrap;\r
  font-size: 16px;\r
  margin: 0 auto;\r
  width: min-content;\r
  background-image: linear-gradient(to bottom, #fff, #4a4ac0);\r
  background-size: 1em 1.5em;\r
  -webkit-text-fill-color: transparent;\r
  background-clip: text;\r
  -webkit-background-clip: text;\r
}\r
\r
@keyframes glow-bg {\r
  0% {\r
    --bgrotate: 0deg;\r
  }\r
\r
  100% {\r
    --bgrotate: 360deg;\r
  }\r
}\r
\r
@keyframes holo-bg {\r
  0% {\r
    background-position:\r
      0 var(--background-y),\r
      0 0,\r
      center;\r
  }\r
\r
  100% {\r
    background-position:\r
      0 var(--background-y),\r
      90% 90%,\r
      center;\r
  }\r
}\r
\r
@media (max-width: 768px) {\r
  .pc-card {\r
    height: 70svh;\r
    max-height: 450px;\r
  }\r
\r
  .pc-details {\r
    top: 2em;\r
  }\r
\r
  .pc-details h3 {\r
    font-size: min(4svh, 2.5em);\r
  }\r
\r
  .pc-details p {\r
    font-size: 14px;\r
  }\r
\r
  .pc-user-info {\r
    bottom: 15px;\r
    left: 15px;\r
    right: 15px;\r
    padding: 10px 12px;\r
  }\r
\r
  .pc-mini-avatar {\r
    width: 28px;\r
    height: 28px;\r
  }\r
\r
  .pc-user-details {\r
    gap: 10px;\r
  }\r
\r
  .pc-handle {\r
    font-size: 13px;\r
  }\r
\r
  .pc-status {\r
    font-size: 10px;\r
  }\r
\r
  .pc-contact-btn {\r
    padding: 6px 12px;\r
    font-size: 11px;\r
  }\r
}\r
\r
@media (max-width: 480px) {\r
  .pc-card {\r
    height: 60svh;\r
    max-height: 380px;\r
  }\r
\r
  .pc-details {\r
    top: 1.5em;\r
  }\r
\r
  .pc-details h3 {\r
    font-size: min(3.5svh, 2em);\r
  }\r
\r
  .pc-details p {\r
    font-size: 12px;\r
    top: -8px;\r
  }\r
\r
  .pc-user-info {\r
    bottom: 12px;\r
    left: 12px;\r
    right: 12px;\r
    padding: 8px 10px;\r
    border-radius: 50px;\r
  }\r
\r
  .pc-mini-avatar {\r
    width: 24px;\r
    height: 24px;\r
  }\r
\r
  .pc-user-details {\r
    gap: 8px;\r
  }\r
\r
  .pc-handle {\r
    font-size: 12px;\r
  }\r
\r
  .pc-status {\r
    font-size: 9px;\r
  }\r
\r
  .pc-contact-btn {\r
    padding: 5px 10px;\r
    font-size: 10px;\r
    border-radius: 50px;\r
  }\r
}\r
\r
@media (max-width: 320px) {\r
  .pc-card {\r
    height: 55svh;\r
    max-height: 320px;\r
  }\r
\r
  .pc-details h3 {\r
    font-size: min(3svh, 1.5em);\r
  }\r
\r
  .pc-details p {\r
    font-size: 11px;\r
  }\r
\r
  .pc-user-info {\r
    padding: 6px 8px;\r
    border-radius: 50px;\r
  }\r
\r
  .pc-mini-avatar {\r
    width: 20px;\r
    height: 20px;\r
  }\r
\r
  .pc-user-details {\r
    gap: 6px;\r
  }\r
\r
  .pc-handle {\r
    font-size: 11px;\r
  }\r
\r
  .pc-status {\r
    font-size: 8px;\r
  }\r
\r
  .pc-contact-btn {\r
    padding: 4px 8px;\r
    font-size: 9px;\r
    border-radius: 50px;\r
  }\r
}\r
`,dr=`import React, { useEffect, useRef, useCallback, useMemo } from 'react';\r
import './ProfileCard.css';\r
\r
interface ProfileCardProps {\r
  avatarUrl: string;\r
  iconUrl?: string;\r
  grainUrl?: string;\r
  behindGradient?: string;\r
  innerGradient?: string;\r
  showBehindGradient?: boolean;\r
  className?: string;\r
  enableTilt?: boolean;\r
  enableMobileTilt?: boolean;\r
  mobileTiltSensitivity?: number;\r
  miniAvatarUrl?: string;\r
  name?: string;\r
  title?: string;\r
  handle?: string;\r
  status?: string;\r
  contactText?: string;\r
  showUserInfo?: boolean;\r
  onContactClick?: () => void;\r
}\r
\r
const DEFAULT_BEHIND_GRADIENT =\r
  'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)';\r
\r
const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';\r
\r
const ANIMATION_CONFIG = {\r
  SMOOTH_DURATION: 600,\r
  INITIAL_DURATION: 1500,\r
  INITIAL_X_OFFSET: 70,\r
  INITIAL_Y_OFFSET: 60,\r
  DEVICE_BETA_OFFSET: 20\r
} as const;\r
\r
const clamp = (value: number, min = 0, max = 100): number => Math.min(Math.max(value, min), max);\r
\r
const round = (value: number, precision = 3): number => parseFloat(value.toFixed(precision));\r
\r
const adjust = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number =>\r
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));\r
\r
const easeInOutCubic = (x: number): number => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);\r
\r
const ProfileCardComponent: React.FC<ProfileCardProps> = ({\r
  avatarUrl = '<Placeholder for avatar URL>',\r
  iconUrl = '<Placeholder for icon URL>',\r
  grainUrl = '<Placeholder for grain URL>',\r
  behindGradient,\r
  innerGradient,\r
  showBehindGradient = true,\r
  className = '',\r
  enableTilt = true,\r
  enableMobileTilt = false,\r
  mobileTiltSensitivity = 5,\r
  miniAvatarUrl,\r
  name = 'Javi A. Torres',\r
  title = 'Software Engineer',\r
  handle = 'javicodes',\r
  status = 'Online',\r
  contactText = 'Contact',\r
  showUserInfo = true,\r
  onContactClick\r
}) => {\r
  const wrapRef = useRef<HTMLDivElement>(null);\r
  const cardRef = useRef<HTMLDivElement>(null);\r
\r
  const animationHandlers = useMemo(() => {\r
    if (!enableTilt) return null;\r
\r
    let rafId: number | null = null;\r
\r
    const updateCardTransform = (offsetX: number, offsetY: number, card: HTMLElement, wrap: HTMLElement) => {\r
      const width = card.clientWidth;\r
      const height = card.clientHeight;\r
\r
      const percentX = clamp((100 / width) * offsetX);\r
      const percentY = clamp((100 / height) * offsetY);\r
\r
      const centerX = percentX - 50;\r
      const centerY = percentY - 50;\r
\r
      const properties = {\r
        '--pointer-x': \`\${percentX}%\`,\r
        '--pointer-y': \`\${percentY}%\`,\r
        '--background-x': \`\${adjust(percentX, 0, 100, 35, 65)}%\`,\r
        '--background-y': \`\${adjust(percentY, 0, 100, 35, 65)}%\`,\r
        '--pointer-from-center': \`\${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}\`,\r
        '--pointer-from-top': \`\${percentY / 100}\`,\r
        '--pointer-from-left': \`\${percentX / 100}\`,\r
        '--rotate-x': \`\${round(-(centerX / 5))}deg\`,\r
        '--rotate-y': \`\${round(centerY / 4)}deg\`\r
      };\r
\r
      Object.entries(properties).forEach(([property, value]) => {\r
        wrap.style.setProperty(property, value);\r
      });\r
    };\r
\r
    const createSmoothAnimation = (\r
      duration: number,\r
      startX: number,\r
      startY: number,\r
      card: HTMLElement,\r
      wrap: HTMLElement\r
    ) => {\r
      const startTime = performance.now();\r
      const targetX = wrap.clientWidth / 2;\r
      const targetY = wrap.clientHeight / 2;\r
\r
      const animationLoop = (currentTime: number) => {\r
        const elapsed = currentTime - startTime;\r
        const progress = clamp(elapsed / duration);\r
        const easedProgress = easeInOutCubic(progress);\r
\r
        const currentX = adjust(easedProgress, 0, 1, startX, targetX);\r
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);\r
\r
        updateCardTransform(currentX, currentY, card, wrap);\r
\r
        if (progress < 1) {\r
          rafId = requestAnimationFrame(animationLoop);\r
        }\r
      };\r
\r
      rafId = requestAnimationFrame(animationLoop);\r
    };\r
\r
    return {\r
      updateCardTransform,\r
      createSmoothAnimation,\r
      cancelAnimation: () => {\r
        if (rafId) {\r
          cancelAnimationFrame(rafId);\r
          rafId = null;\r
        }\r
      }\r
    };\r
  }, [enableTilt]);\r
\r
  const handlePointerMove = useCallback(\r
    (event: PointerEvent) => {\r
      const card = cardRef.current;\r
      const wrap = wrapRef.current;\r
\r
      if (!card || !wrap || !animationHandlers) return;\r
\r
      const rect = card.getBoundingClientRect();\r
      animationHandlers.updateCardTransform(event.clientX - rect.left, event.clientY - rect.top, card, wrap);\r
    },\r
    [animationHandlers]\r
  );\r
\r
  const handlePointerEnter = useCallback(() => {\r
    const card = cardRef.current;\r
    const wrap = wrapRef.current;\r
\r
    if (!card || !wrap || !animationHandlers) return;\r
\r
    animationHandlers.cancelAnimation();\r
    wrap.classList.add('active');\r
    card.classList.add('active');\r
  }, [animationHandlers]);\r
\r
  const handlePointerLeave = useCallback(\r
    (event: PointerEvent) => {\r
      const card = cardRef.current;\r
      const wrap = wrapRef.current;\r
\r
      if (!card || !wrap || !animationHandlers) return;\r
\r
      animationHandlers.createSmoothAnimation(\r
        ANIMATION_CONFIG.SMOOTH_DURATION,\r
        event.offsetX,\r
        event.offsetY,\r
        card,\r
        wrap\r
      );\r
      wrap.classList.remove('active');\r
      card.classList.remove('active');\r
    },\r
    [animationHandlers]\r
  );\r
\r
  const handleDeviceOrientation = useCallback(\r
    (event: DeviceOrientationEvent) => {\r
      const card = cardRef.current;\r
      const wrap = wrapRef.current;\r
\r
      if (!card || !wrap || !animationHandlers) return;\r
\r
      const { beta, gamma } = event;\r
      if (!beta || !gamma) return;\r
\r
      animationHandlers.updateCardTransform(\r
        card.clientHeight / 2 + gamma * mobileTiltSensitivity,\r
        card.clientWidth / 2 + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,\r
        card,\r
        wrap\r
      );\r
    },\r
    [animationHandlers, mobileTiltSensitivity]\r
  );\r
\r
  useEffect(() => {\r
    if (!enableTilt || !animationHandlers) return;\r
\r
    const card = cardRef.current;\r
    const wrap = wrapRef.current;\r
\r
    if (!card || !wrap) return;\r
\r
    const pointerMoveHandler = handlePointerMove as EventListener;\r
    const pointerEnterHandler = handlePointerEnter as EventListener;\r
    const pointerLeaveHandler = handlePointerLeave as EventListener;\r
    const deviceOrientationHandler = handleDeviceOrientation as EventListener;\r
\r
    const handleClick = () => {\r
      if (!enableMobileTilt || location.protocol !== 'https:') return;\r
      if (typeof (window.DeviceMotionEvent as any).requestPermission === 'function') {\r
        (window.DeviceMotionEvent as any)\r
          .requestPermission()\r
          .then((state: string) => {\r
            if (state === 'granted') {\r
              window.addEventListener('deviceorientation', deviceOrientationHandler);\r
            }\r
          })\r
          .catch((err: any) => console.error(err));\r
      } else {\r
        window.addEventListener('deviceorientation', deviceOrientationHandler);\r
      }\r
    };\r
\r
    card.addEventListener('pointerenter', pointerEnterHandler);\r
    card.addEventListener('pointermove', pointerMoveHandler);\r
    card.addEventListener('pointerleave', pointerLeaveHandler);\r
    card.addEventListener('click', handleClick);\r
\r
    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;\r
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;\r
\r
    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);\r
    animationHandlers.createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY, card, wrap);\r
\r
    return () => {\r
      card.removeEventListener('pointerenter', pointerEnterHandler);\r
      card.removeEventListener('pointermove', pointerMoveHandler);\r
      card.removeEventListener('pointerleave', pointerLeaveHandler);\r
      card.removeEventListener('click', handleClick);\r
      window.removeEventListener('deviceorientation', deviceOrientationHandler);\r
      animationHandlers.cancelAnimation();\r
    };\r
  }, [\r
    enableTilt,\r
    enableMobileTilt,\r
    animationHandlers,\r
    handlePointerMove,\r
    handlePointerEnter,\r
    handlePointerLeave,\r
    handleDeviceOrientation\r
  ]);\r
\r
  const cardStyle = useMemo(\r
    () =>\r
      ({\r
        '--icon': iconUrl ? \`url(\${iconUrl})\` : 'none',\r
        '--grain': grainUrl ? \`url(\${grainUrl})\` : 'none',\r
        '--behind-gradient': showBehindGradient ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT) : 'none',\r
        '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT\r
      }) as React.CSSProperties,\r
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]\r
  );\r
\r
  const handleContactClick = useCallback(() => {\r
    onContactClick?.();\r
  }, [onContactClick]);\r
\r
  return (\r
    <div ref={wrapRef} className={\`pc-card-wrapper \${className}\`.trim()} style={cardStyle}>\r
      <section ref={cardRef} className="pc-card">\r
        <div className="pc-inside">\r
          <div className="pc-shine" />\r
          <div className="pc-glare" />\r
          <div className="pc-content pc-avatar-content">\r
            <img\r
              className="avatar"\r
              src={avatarUrl}\r
              alt={\`\${name || 'User'} avatar\`}\r
              loading="lazy"\r
              onError={e => {\r
                const target = e.target as HTMLImageElement;\r
                target.style.display = 'none';\r
              }}\r
            />\r
            {showUserInfo && (\r
              <div className="pc-user-info">\r
                <div className="pc-user-details">\r
                  <div className="pc-mini-avatar">\r
                    <img\r
                      src={miniAvatarUrl || avatarUrl}\r
                      alt={\`\${name || 'User'} mini avatar\`}\r
                      loading="lazy"\r
                      onError={e => {\r
                        const target = e.target as HTMLImageElement;\r
                        target.style.opacity = '0.5';\r
                        target.src = avatarUrl;\r
                      }}\r
                    />\r
                  </div>\r
                  <div className="pc-user-text">\r
                    <div className="pc-handle">@{handle}</div>\r
                    <div className="pc-status">{status}</div>\r
                  </div>\r
                </div>\r
                <button\r
                  className="pc-contact-btn"\r
                  onClick={handleContactClick}\r
                  style={{ pointerEvents: 'auto' }}\r
                  type="button"\r
                  aria-label={\`Contact \${name || 'user'}\`}\r
                >\r
                  {contactText}\r
                </button>\r
              </div>\r
            )}\r
          </div>\r
          <div className="pc-content">\r
            <div className="pc-details">\r
              <h3>{name}</h3>\r
              <p>{title}</p>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
    </div>\r
  );\r
};\r
\r
const ProfileCard = React.memo(ProfileCardComponent);\r
\r
export default ProfileCard;\r
`,pr={usage:`import ProfileCard from './ProfileCard'
  
<ProfileCard
  name="Javi A. Torres"
  title="Software Engineer"
  handle="javicodes"
  status="Online"
  contactText="Contact Me"
  avatarUrl="/path/to/avatar.jpg"
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={false}
  onContactClick={() => console.log('Contact clicked')}
/>`,code:sr,css:lr,tsCode:dr},fr="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)",mr="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)",A={SMOOTH_DURATION:600,INITIAL_DURATION:1500,INITIAL_X_OFFSET:70,INITIAL_Y_OFFSET:60,DEVICE_BETA_OFFSET:20},_=(a,c=0,l=100)=>Math.min(Math.max(a,c),l),$=(a,c=3)=>parseFloat(a.toFixed(c)),P=(a,c,l,b,u)=>$(b+(u-b)*(a-c)/(l-c)),ur=a=>a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2,vr=({avatarUrl:a="<Placeholder for avatar URL>",iconUrl:c="<Placeholder for icon URL>",grainUrl:l="<Placeholder for grain URL>",behindGradient:b,innerGradient:u,showBehindGradient:L=!0,className:N="",enableTilt:I=!0,enableMobileTilt:M=!1,mobileTiltSensitivity:k=5,miniAvatarUrl:S,name:E="Javi A. Torres",title:D="Software Engineer",handle:x="javicodes",status:j="Online",contactText:X="Contact",showUserInfo:w=!0,onContactClick:v})=>{const p=i.useRef(null),f=i.useRef(null),t=i.useMemo(()=>{if(!I)return null;let r=null;const e=(s,m,h,y)=>{const g=h.clientWidth,C=h.clientHeight,d=_(100/g*s),T=_(100/C*m),H=d-50,Y=T-50,G={"--pointer-x":`${d}%`,"--pointer-y":`${T}%`,"--background-x":`${P(d,0,100,35,65)}%`,"--background-y":`${P(T,0,100,35,65)}%`,"--pointer-from-center":`${_(Math.hypot(T-50,d-50)/50,0,1)}`,"--pointer-from-top":`${T/100}`,"--pointer-from-left":`${d/100}`,"--rotate-x":`${$(-(H/5))}deg`,"--rotate-y":`${$(Y/4)}deg`};Object.entries(G).forEach(([R,U])=>{y.style.setProperty(R,U)})};return{updateCardTransform:e,createSmoothAnimation:(s,m,h,y,g)=>{const C=performance.now(),d=g.clientWidth/2,T=g.clientHeight/2,H=Y=>{const G=Y-C,R=_(G/s),U=ur(R),V=P(U,0,1,m,d),K=P(U,0,1,h,T);e(V,K,y,g),R<1&&(r=requestAnimationFrame(H))};r=requestAnimationFrame(H)},cancelAnimation:()=>{r&&(cancelAnimationFrame(r),r=null)}}},[I]),O=i.useCallback(r=>{const e=f.current,o=p.current;if(!e||!o||!t)return;const s=e.getBoundingClientRect();t.updateCardTransform(r.clientX-s.left,r.clientY-s.top,e,o)},[t]),z=i.useCallback(()=>{const r=f.current,e=p.current;!r||!e||!t||(t.cancelAnimation(),e.classList.add("active"),r.classList.add("active"))},[t]),B=i.useCallback(r=>{const e=f.current,o=p.current;!e||!o||!t||(t.createSmoothAnimation(A.SMOOTH_DURATION,r.offsetX,r.offsetY,e,o),o.classList.remove("active"),e.classList.remove("active"))},[t]),W=i.useCallback(r=>{const e=f.current,o=p.current;if(!e||!o||!t)return;const{beta:s,gamma:m}=r;!s||!m||t.updateCardTransform(e.clientHeight/2+m*k,e.clientWidth/2+(s-A.DEVICE_BETA_OFFSET)*k,e,o)},[t,k]);i.useEffect(()=>{if(!I||!t)return;const r=f.current,e=p.current;if(!r||!e)return;const o=O,s=z,m=B,h=W,y=()=>{!M||location.protocol!=="https:"||(typeof window.DeviceMotionEvent.requestPermission=="function"?window.DeviceMotionEvent.requestPermission().then(d=>{d==="granted"&&window.addEventListener("deviceorientation",h)}).catch(d=>console.error(d)):window.addEventListener("deviceorientation",h))};r.addEventListener("pointerenter",s),r.addEventListener("pointermove",o),r.addEventListener("pointerleave",m),r.addEventListener("click",y);const g=e.clientWidth-A.INITIAL_X_OFFSET,C=A.INITIAL_Y_OFFSET;return t.updateCardTransform(g,C,r,e),t.createSmoothAnimation(A.INITIAL_DURATION,g,C,r,e),()=>{r.removeEventListener("pointerenter",s),r.removeEventListener("pointermove",o),r.removeEventListener("pointerleave",m),r.removeEventListener("click",y),window.removeEventListener("deviceorientation",h),t.cancelAnimation()}},[I,M,t,O,z,B,W]);const q=i.useMemo(()=>({"--icon":c?`url(${c})`:"none","--grain":l?`url(${l})`:"none","--behind-gradient":L?b??fr:"none","--inner-gradient":u??mr}),[c,l,L,b,u]),J=i.useCallback(()=>{v==null||v()},[v]);return n.jsx("div",{ref:p,className:`pc-card-wrapper ${N}`.trim(),style:q,children:n.jsx("section",{ref:f,className:"pc-card",children:n.jsxs("div",{className:"pc-inside",children:[n.jsx("div",{className:"pc-shine"}),n.jsx("div",{className:"pc-glare"}),n.jsxs("div",{className:"pc-content pc-avatar-content",children:[n.jsx("img",{className:"avatar",src:a,alt:`${E||"User"} avatar`,loading:"lazy",onError:r=>{const e=r.target;e.style.display="none"}}),w&&n.jsxs("div",{className:"pc-user-info",children:[n.jsxs("div",{className:"pc-user-details",children:[n.jsx("div",{className:"pc-mini-avatar",children:n.jsx("img",{src:S||a,alt:`${E||"User"} mini avatar`,loading:"lazy",onError:r=>{const e=r.target;e.style.opacity="0.5",e.src=a}})}),n.jsxs("div",{className:"pc-user-text",children:[n.jsxs("div",{className:"pc-handle",children:["@",x]}),n.jsx("div",{className:"pc-status",children:j})]})]}),n.jsx("button",{className:"pc-contact-btn",onClick:J,style:{pointerEvents:"auto"},type:"button","aria-label":`Contact ${E||"user"}`,children:X})]})]}),n.jsx("div",{className:"pc-content",children:n.jsxs("div",{className:"pc-details",children:[n.jsx("h3",{children:E}),n.jsx("p",{children:D})]})})]})})})},hr=Q.memo(vr),Er=()=>{const[a,c]=i.useState(!0),[l,b]=i.useState(!0),[u,L]=i.useState(!0),[N,I]=i.useState(!1),[M,k]=i.useState("radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)"),[S,E]=i.useState("linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"),[D,x]=cr(),j=()=>{const w=Math.floor(Math.random()*360),v=Math.floor(Math.random()*360),p=Math.floor(Math.random()*360),f=Math.floor(Math.random()*360),t=`radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(${w},100%,90%,var(--card-opacity)) 4%,hsla(${w},50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(${w},25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(${w},0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,hsl(${v}, 100%, 70%) 0%,transparent 100%),radial-gradient(100% 100% at 50% 50%,hsl(${p}, 100%, 65%) 1%,transparent 76%),conic-gradient(from 124deg at 50% 50%,hsl(${f}, 100%, 70%) 0%,hsl(${v}, 100%, 70%) 40%,hsl(${v}, 100%, 70%) 60%,hsl(${f}, 100%, 70%) 100%)`,O=`linear-gradient(145deg,hsla(${w}, 40%, 45%, 0.55) 0%,hsla(${p}, 60%, 70%, 0.27) 100%)`;k(t),E(O),x()},X=[{name:"avatarUrl",type:"string",default:'"<Placeholder for avatar URL>"',description:"URL for the main avatar image displayed on the card"},{name:"iconUrl",type:"string",default:'"<Placeholder for icon URL>"',description:"Optional URL for an icon pattern overlay on the card background"},{name:"grainUrl",type:"string",default:'"<Placeholder for grain URL>"',description:"Optional URL for a grain texture overlay effect"},{name:"behindGradient",type:"string",default:"undefined",description:"Custom CSS gradient string for the background gradient effect"},{name:"innerGradient",type:"string",default:"undefined",description:"Custom CSS gradient string for the inner card gradient"},{name:"showBehindGradient",type:"boolean",default:"true",description:"Whether to display the background gradient effect"},{name:"className",type:"string",default:'""',description:"Additional CSS classes to apply to the card wrapper"},{name:"enableTilt",type:"boolean",default:"true",description:"Enable or disable the 3D tilt effect on mouse hover"},{name:"enableMobileTilt",type:"boolean",default:"false",description:"Enable or disable the 3D tilt effect on mobile devices"},{name:"mobileTiltSensitivity",type:"number",default:"5",description:"Sensitivity of the 3D tilt effect on mobile devices"},{name:"miniAvatarUrl",type:"string",default:"undefined",description:"Optional URL for a smaller avatar in the user info section"},{name:"name",type:"string",default:'"Javi A. Torres"',description:"User's display name"},{name:"title",type:"string",default:'"Software Engineer"',description:"User's job title or role"},{name:"handle",type:"string",default:'"javicodes"',description:"User's handle or username (displayed with @ prefix)"},{name:"status",type:"string",default:'"Online"',description:"User's current status"},{name:"contactText",type:"string",default:'"Contact"',description:"Text displayed on the contact button"},{name:"showUserInfo",type:"boolean",default:"true",description:"Whether to display the user information section"},{name:"onContactClick",type:"function",default:"undefined",description:"Callback function called when the contact button is clicked"}];return n.jsxs(nr,{children:[n.jsxs(er,{children:[n.jsx(Z,{position:"relative",className:"demo-container",h:700,overflow:"hidden",children:n.jsx(hr,{name:"Javi A. Torres",title:"Software Engineer",handle:"javicodes",status:"Online",contactText:"Contact Me",avatarUrl:"/assets/demo/person.png",iconUrl:a?"/assets/demo/iconpattern.png":"",showUserInfo:l,showBehindGradient:u,grainUrl:"/assets/demo/grain.webp",behindGradient:M,innerGradient:S,enableMobileTilt:N},D)})," ",n.jsxs(or,{children:[n.jsx(rr,{onClick:j,fontSize:"xs",bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:8,children:"Randomize Colors"}),n.jsx(F,{title:"Show Icon Pattern",isChecked:a,onChange:()=>{c(!a),x()}}),n.jsx(F,{title:"Show User Info",isChecked:l,onChange:()=>{b(!l),x()}}),n.jsx(F,{title:"Show BG Gradient",isChecked:u,onChange:()=>{L(!u),x()}}),n.jsx(F,{title:"Enable Mobile Tilt",isChecked:N,onChange:()=>{I(!N),x()}})]}),n.jsx(ar,{data:X})]}),n.jsx(tr,{children:n.jsx(ir,{codeObject:pr})})]})};export{Er as default};
