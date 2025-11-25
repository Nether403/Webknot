import{r as i,j as e,g as s,B as O}from"./index-wsKSLPNH.js";import{T as B,P as z,a as H,C as G,b as U}from"./PropTable-C4uPWs8h.js";import{C as F}from"./Customize-1m_ZNqR9.js";import{P as j}from"./PreviewSlider-m1G_aiYP.js";import{P as Y}from"./PreviewSwitch-DqnF708j.js";import{D as W}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";const q=`import { useRef, useEffect, useCallback, useState } from 'react';\r
import { gsap } from 'gsap';\r
import './MagicBento.css';\r
\r
const DEFAULT_PARTICLE_COUNT = 12;\r
const DEFAULT_SPOTLIGHT_RADIUS = 300;\r
const DEFAULT_GLOW_COLOR = '132, 0, 255';\r
const MOBILE_BREAKPOINT = 768;\r
\r
const cardData = [\r
  {\r
    color: '#060010',\r
    title: 'Analytics',\r
    description: 'Track user behavior',\r
    label: 'Insights'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Dashboard',\r
    description: 'Centralized data view',\r
    label: 'Overview'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Collaboration',\r
    description: 'Work together seamlessly',\r
    label: 'Teamwork'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Automation',\r
    description: 'Streamline workflows',\r
    label: 'Efficiency'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Integration',\r
    description: 'Connect favorite tools',\r
    label: 'Connectivity'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Security',\r
    description: 'Enterprise-grade protection',\r
    label: 'Protection'\r
  }\r
];\r
\r
const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {\r
  const el = document.createElement('div');\r
  el.className = 'particle';\r
  el.style.cssText = \`\r
    position: absolute;\r
    width: 4px;\r
    height: 4px;\r
    border-radius: 50%;\r
    background: rgba(\${color}, 1);\r
    box-shadow: 0 0 6px rgba(\${color}, 0.6);\r
    pointer-events: none;\r
    z-index: 100;\r
    left: \${x}px;\r
    top: \${y}px;\r
  \`;\r
  return el;\r
};\r
\r
const calculateSpotlightValues = radius => ({\r
  proximity: radius * 0.5,\r
  fadeDistance: radius * 0.75\r
});\r
\r
const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {\r
  const rect = card.getBoundingClientRect();\r
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;\r
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;\r
\r
  card.style.setProperty('--glow-x', \`\${relativeX}%\`);\r
  card.style.setProperty('--glow-y', \`\${relativeY}%\`);\r
  card.style.setProperty('--glow-intensity', glow.toString());\r
  card.style.setProperty('--glow-radius', \`\${radius}px\`);\r
};\r
\r
const ParticleCard = ({\r
  children,\r
  className = '',\r
  disableAnimations = false,\r
  style,\r
  particleCount = DEFAULT_PARTICLE_COUNT,\r
  glowColor = DEFAULT_GLOW_COLOR,\r
  enableTilt = true,\r
  clickEffect = false,\r
  enableMagnetism = false\r
}) => {\r
  const cardRef = useRef(null);\r
  const particlesRef = useRef([]);\r
  const timeoutsRef = useRef([]);\r
  const isHoveredRef = useRef(false);\r
  const memoizedParticles = useRef([]);\r
  const particlesInitialized = useRef(false);\r
  const magnetismAnimationRef = useRef(null);\r
\r
  const initializeParticles = useCallback(() => {\r
    if (particlesInitialized.current || !cardRef.current) return;\r
\r
    const { width, height } = cardRef.current.getBoundingClientRect();\r
    memoizedParticles.current = Array.from({ length: particleCount }, () =>\r
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)\r
    );\r
    particlesInitialized.current = true;\r
  }, [particleCount, glowColor]);\r
\r
  const clearAllParticles = useCallback(() => {\r
    timeoutsRef.current.forEach(clearTimeout);\r
    timeoutsRef.current = [];\r
    magnetismAnimationRef.current?.kill();\r
\r
    particlesRef.current.forEach(particle => {\r
      gsap.to(particle, {\r
        scale: 0,\r
        opacity: 0,\r
        duration: 0.3,\r
        ease: 'back.in(1.7)',\r
        onComplete: () => {\r
          particle.parentNode?.removeChild(particle);\r
        }\r
      });\r
    });\r
    particlesRef.current = [];\r
  }, []);\r
\r
  const animateParticles = useCallback(() => {\r
    if (!cardRef.current || !isHoveredRef.current) return;\r
\r
    if (!particlesInitialized.current) {\r
      initializeParticles();\r
    }\r
\r
    memoizedParticles.current.forEach((particle, index) => {\r
      const timeoutId = setTimeout(() => {\r
        if (!isHoveredRef.current || !cardRef.current) return;\r
\r
        const clone = particle.cloneNode(true);\r
        cardRef.current.appendChild(clone);\r
        particlesRef.current.push(clone);\r
\r
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });\r
\r
        gsap.to(clone, {\r
          x: (Math.random() - 0.5) * 100,\r
          y: (Math.random() - 0.5) * 100,\r
          rotation: Math.random() * 360,\r
          duration: 2 + Math.random() * 2,\r
          ease: 'none',\r
          repeat: -1,\r
          yoyo: true\r
        });\r
\r
        gsap.to(clone, {\r
          opacity: 0.3,\r
          duration: 1.5,\r
          ease: 'power2.inOut',\r
          repeat: -1,\r
          yoyo: true\r
        });\r
      }, index * 100);\r
\r
      timeoutsRef.current.push(timeoutId);\r
    });\r
  }, [initializeParticles]);\r
\r
  useEffect(() => {\r
    if (disableAnimations || !cardRef.current) return;\r
\r
    const element = cardRef.current;\r
\r
    const handleMouseEnter = () => {\r
      isHoveredRef.current = true;\r
      animateParticles();\r
\r
      if (enableTilt) {\r
        gsap.to(element, {\r
          rotateX: 5,\r
          rotateY: 5,\r
          duration: 0.3,\r
          ease: 'power2.out',\r
          transformPerspective: 1000\r
        });\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      isHoveredRef.current = false;\r
      clearAllParticles();\r
\r
      if (enableTilt) {\r
        gsap.to(element, {\r
          rotateX: 0,\r
          rotateY: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
\r
      if (enableMagnetism) {\r
        gsap.to(element, {\r
          x: 0,\r
          y: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    const handleMouseMove = e => {\r
      if (!enableTilt && !enableMagnetism) return;\r
\r
      const rect = element.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
      const centerX = rect.width / 2;\r
      const centerY = rect.height / 2;\r
\r
      if (enableTilt) {\r
        const rotateX = ((y - centerY) / centerY) * -10;\r
        const rotateY = ((x - centerX) / centerX) * 10;\r
\r
        gsap.to(element, {\r
          rotateX,\r
          rotateY,\r
          duration: 0.1,\r
          ease: 'power2.out',\r
          transformPerspective: 1000\r
        });\r
      }\r
\r
      if (enableMagnetism) {\r
        const magnetX = (x - centerX) * 0.05;\r
        const magnetY = (y - centerY) * 0.05;\r
\r
        magnetismAnimationRef.current = gsap.to(element, {\r
          x: magnetX,\r
          y: magnetY,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    const handleClick = e => {\r
      if (!clickEffect) return;\r
\r
      const rect = element.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
\r
      const maxDistance = Math.max(\r
        Math.hypot(x, y),\r
        Math.hypot(x - rect.width, y),\r
        Math.hypot(x, y - rect.height),\r
        Math.hypot(x - rect.width, y - rect.height)\r
      );\r
\r
      const ripple = document.createElement('div');\r
      ripple.style.cssText = \`\r
        position: absolute;\r
        width: \${maxDistance * 2}px;\r
        height: \${maxDistance * 2}px;\r
        border-radius: 50%;\r
        background: radial-gradient(circle, rgba(\${glowColor}, 0.4) 0%, rgba(\${glowColor}, 0.2) 30%, transparent 70%);\r
        left: \${x - maxDistance}px;\r
        top: \${y - maxDistance}px;\r
        pointer-events: none;\r
        z-index: 1000;\r
      \`;\r
\r
      element.appendChild(ripple);\r
\r
      gsap.fromTo(\r
        ripple,\r
        {\r
          scale: 0,\r
          opacity: 1\r
        },\r
        {\r
          scale: 1,\r
          opacity: 0,\r
          duration: 0.8,\r
          ease: 'power2.out',\r
          onComplete: () => ripple.remove()\r
        }\r
      );\r
    };\r
\r
    element.addEventListener('mouseenter', handleMouseEnter);\r
    element.addEventListener('mouseleave', handleMouseLeave);\r
    element.addEventListener('mousemove', handleMouseMove);\r
    element.addEventListener('click', handleClick);\r
\r
    return () => {\r
      isHoveredRef.current = false;\r
      element.removeEventListener('mouseenter', handleMouseEnter);\r
      element.removeEventListener('mouseleave', handleMouseLeave);\r
      element.removeEventListener('mousemove', handleMouseMove);\r
      element.removeEventListener('click', handleClick);\r
      clearAllParticles();\r
    };\r
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);\r
\r
  return (\r
    <div\r
      ref={cardRef}\r
      className={\`\${className} particle-container\`}\r
      style={{ ...style, position: 'relative', overflow: 'hidden' }}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
const GlobalSpotlight = ({\r
  gridRef,\r
  disableAnimations = false,\r
  enabled = true,\r
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,\r
  glowColor = DEFAULT_GLOW_COLOR\r
}) => {\r
  const spotlightRef = useRef(null);\r
  const isInsideSection = useRef(false);\r
\r
  useEffect(() => {\r
    if (disableAnimations || !gridRef?.current || !enabled) return;\r
\r
    const spotlight = document.createElement('div');\r
    spotlight.className = 'global-spotlight';\r
    spotlight.style.cssText = \`\r
      position: fixed;\r
      width: 800px;\r
      height: 800px;\r
      border-radius: 50%;\r
      pointer-events: none;\r
      background: radial-gradient(circle,\r
        rgba(\${glowColor}, 0.15) 0%,\r
        rgba(\${glowColor}, 0.08) 15%,\r
        rgba(\${glowColor}, 0.04) 25%,\r
        rgba(\${glowColor}, 0.02) 40%,\r
        rgba(\${glowColor}, 0.01) 65%,\r
        transparent 70%\r
      );\r
      z-index: 200;\r
      opacity: 0;\r
      transform: translate(-50%, -50%);\r
      mix-blend-mode: screen;\r
    \`;\r
    document.body.appendChild(spotlight);\r
    spotlightRef.current = spotlight;\r
\r
    const handleMouseMove = e => {\r
      if (!spotlightRef.current || !gridRef.current) return;\r
\r
      const section = gridRef.current.closest('.bento-section');\r
      const rect = section?.getBoundingClientRect();\r
      const mouseInside =\r
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;\r
\r
      isInsideSection.current = mouseInside || false;\r
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');\r
\r
      if (!mouseInside) {\r
        gsap.to(spotlightRef.current, {\r
          opacity: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
        cards.forEach(card => {\r
          card.style.setProperty('--glow-intensity', '0');\r
        });\r
        return;\r
      }\r
\r
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);\r
      let minDistance = Infinity;\r
\r
      cards.forEach(card => {\r
        const cardElement = card;\r
        const cardRect = cardElement.getBoundingClientRect();\r
        const centerX = cardRect.left + cardRect.width / 2;\r
        const centerY = cardRect.top + cardRect.height / 2;\r
        const distance =\r
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;\r
        const effectiveDistance = Math.max(0, distance);\r
\r
        minDistance = Math.min(minDistance, effectiveDistance);\r
\r
        let glowIntensity = 0;\r
        if (effectiveDistance <= proximity) {\r
          glowIntensity = 1;\r
        } else if (effectiveDistance <= fadeDistance) {\r
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);\r
        }\r
\r
        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);\r
      });\r
\r
      gsap.to(spotlightRef.current, {\r
        left: e.clientX,\r
        top: e.clientY,\r
        duration: 0.1,\r
        ease: 'power2.out'\r
      });\r
\r
      const targetOpacity =\r
        minDistance <= proximity\r
          ? 0.8\r
          : minDistance <= fadeDistance\r
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8\r
            : 0;\r
\r
      gsap.to(spotlightRef.current, {\r
        opacity: targetOpacity,\r
        duration: targetOpacity > 0 ? 0.2 : 0.5,\r
        ease: 'power2.out'\r
      });\r
    };\r
\r
    const handleMouseLeave = () => {\r
      isInsideSection.current = false;\r
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => {\r
        card.style.setProperty('--glow-intensity', '0');\r
      });\r
      if (spotlightRef.current) {\r
        gsap.to(spotlightRef.current, {\r
          opacity: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    document.addEventListener('mousemove', handleMouseMove);\r
    document.addEventListener('mouseleave', handleMouseLeave);\r
\r
    return () => {\r
      document.removeEventListener('mousemove', handleMouseMove);\r
      document.removeEventListener('mouseleave', handleMouseLeave);\r
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);\r
    };\r
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);\r
\r
  return null;\r
};\r
\r
const BentoCardGrid = ({ children, gridRef }) => (\r
  <div className="card-grid bento-section" ref={gridRef}>\r
    {children}\r
  </div>\r
);\r
\r
const useMobileDetection = () => {\r
  const [isMobile, setIsMobile] = useState(false);\r
\r
  useEffect(() => {\r
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);\r
\r
    checkMobile();\r
    window.addEventListener('resize', checkMobile);\r
\r
    return () => window.removeEventListener('resize', checkMobile);\r
  }, []);\r
\r
  return isMobile;\r
};\r
\r
const MagicBento = ({\r
  textAutoHide = true,\r
  enableStars = true,\r
  enableSpotlight = true,\r
  enableBorderGlow = true,\r
  disableAnimations = false,\r
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,\r
  particleCount = DEFAULT_PARTICLE_COUNT,\r
  enableTilt = false,\r
  glowColor = DEFAULT_GLOW_COLOR,\r
  clickEffect = true,\r
  enableMagnetism = true\r
}) => {\r
  const gridRef = useRef(null);\r
  const isMobile = useMobileDetection();\r
  const shouldDisableAnimations = disableAnimations || isMobile;\r
\r
  return (\r
    <>\r
      {enableSpotlight && (\r
        <GlobalSpotlight\r
          gridRef={gridRef}\r
          disableAnimations={shouldDisableAnimations}\r
          enabled={enableSpotlight}\r
          spotlightRadius={spotlightRadius}\r
          glowColor={glowColor}\r
        />\r
      )}\r
\r
      <BentoCardGrid gridRef={gridRef}>\r
        {cardData.map((card, index) => {\r
          const baseClassName = \`magic-bento-card \${textAutoHide ? 'magic-bento-card--text-autohide' : ''} \${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}\`;\r
          const cardProps = {\r
            className: baseClassName,\r
            style: {\r
              backgroundColor: card.color,\r
              '--glow-color': glowColor\r
            }\r
          };\r
\r
          if (enableStars) {\r
            return (\r
              <ParticleCard\r
                key={index}\r
                {...cardProps}\r
                disableAnimations={shouldDisableAnimations}\r
                particleCount={particleCount}\r
                glowColor={glowColor}\r
                enableTilt={enableTilt}\r
                clickEffect={clickEffect}\r
                enableMagnetism={enableMagnetism}\r
              >\r
                <div className="magic-bento-card__header">\r
                  <div className="magic-bento-card__label">{card.label}</div>\r
                </div>\r
                <div className="magic-bento-card__content">\r
                  <h2 className="magic-bento-card__title">{card.title}</h2>\r
                  <p className="magic-bento-card__description">{card.description}</p>\r
                </div>\r
              </ParticleCard>\r
            );\r
          }\r
\r
          return (\r
            <div\r
              key={index}\r
              {...cardProps}\r
              ref={el => {\r
                if (!el) return;\r
\r
                const handleMouseMove = e => {\r
                  if (shouldDisableAnimations) return;\r
\r
                  const rect = el.getBoundingClientRect();\r
                  const x = e.clientX - rect.left;\r
                  const y = e.clientY - rect.top;\r
                  const centerX = rect.width / 2;\r
                  const centerY = rect.height / 2;\r
\r
                  if (enableTilt) {\r
                    const rotateX = ((y - centerY) / centerY) * -10;\r
                    const rotateY = ((x - centerX) / centerX) * 10;\r
                    gsap.to(el, {\r
                      rotateX,\r
                      rotateY,\r
                      duration: 0.1,\r
                      ease: 'power2.out',\r
                      transformPerspective: 1000\r
                    });\r
                  }\r
\r
                  if (enableMagnetism) {\r
                    const magnetX = (x - centerX) * 0.05;\r
                    const magnetY = (y - centerY) * 0.05;\r
                    gsap.to(el, {\r
                      x: magnetX,\r
                      y: magnetY,\r
                      duration: 0.3,\r
                      ease: 'power2.out'\r
                    });\r
                  }\r
                };\r
\r
                const handleMouseLeave = () => {\r
                  if (shouldDisableAnimations) return;\r
\r
                  if (enableTilt) {\r
                    gsap.to(el, {\r
                      rotateX: 0,\r
                      rotateY: 0,\r
                      duration: 0.3,\r
                      ease: 'power2.out'\r
                    });\r
                  }\r
\r
                  if (enableMagnetism) {\r
                    gsap.to(el, {\r
                      x: 0,\r
                      y: 0,\r
                      duration: 0.3,\r
                      ease: 'power2.out'\r
                    });\r
                  }\r
                };\r
\r
                const handleClick = e => {\r
                  if (!clickEffect || shouldDisableAnimations) return;\r
\r
                  const rect = el.getBoundingClientRect();\r
                  const x = e.clientX - rect.left;\r
                  const y = e.clientY - rect.top;\r
\r
                  const maxDistance = Math.max(\r
                    Math.hypot(x, y),\r
                    Math.hypot(x - rect.width, y),\r
                    Math.hypot(x, y - rect.height),\r
                    Math.hypot(x - rect.width, y - rect.height)\r
                  );\r
\r
                  const ripple = document.createElement('div');\r
                  ripple.style.cssText = \`\r
                    position: absolute;\r
                    width: \${maxDistance * 2}px;\r
                    height: \${maxDistance * 2}px;\r
                    border-radius: 50%;\r
                    background: radial-gradient(circle, rgba(\${glowColor}, 0.4) 0%, rgba(\${glowColor}, 0.2) 30%, transparent 70%);\r
                    left: \${x - maxDistance}px;\r
                    top: \${y - maxDistance}px;\r
                    pointer-events: none;\r
                    z-index: 1000;\r
                  \`;\r
\r
                  el.appendChild(ripple);\r
\r
                  gsap.fromTo(\r
                    ripple,\r
                    {\r
                      scale: 0,\r
                      opacity: 1\r
                    },\r
                    {\r
                      scale: 1,\r
                      opacity: 0,\r
                      duration: 0.8,\r
                      ease: 'power2.out',\r
                      onComplete: () => ripple.remove()\r
                    }\r
                  );\r
                };\r
\r
                el.addEventListener('mousemove', handleMouseMove);\r
                el.addEventListener('mouseleave', handleMouseLeave);\r
                el.addEventListener('click', handleClick);\r
              }}\r
            >\r
              <div className="magic-bento-card__header">\r
                <div className="magic-bento-card__label">{card.label}</div>\r
              </div>\r
              <div className="magic-bento-card__content">\r
                <h2 className="magic-bento-card__title">{card.title}</h2>\r
                <p className="magic-bento-card__description">{card.description}</p>\r
              </div>\r
            </div>\r
          );\r
        })}\r
      </BentoCardGrid>\r
    </>\r
  );\r
};\r
\r
export default MagicBento;\r
`,K=`:root {\r
  --hue: 27;\r
  --sat: 69%;\r
  --white: hsl(0, 0%, 100%);\r
  --purple-primary: rgba(132, 0, 255, 1);\r
  --purple-glow: rgba(132, 0, 255, 0.2);\r
  --purple-border: rgba(132, 0, 255, 0.8);\r
  --border-color: #392e4e;\r
  --background-dark: #060010;\r
  color-scheme: light dark;\r
}\r
\r
.card-grid {\r
  display: grid;\r
  gap: 0.5em;\r
  padding: 0.75em;\r
  max-width: 54em;\r
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem);\r
}\r
\r
.magic-bento-card {\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: space-between;\r
  position: relative;\r
  aspect-ratio: 4/3;\r
  min-height: 200px;\r
  width: 100%;\r
  max-width: 100%;\r
  padding: 1.25em;\r
  border-radius: 20px;\r
  border: 1px solid var(--border-color);\r
  background: var(--background-dark);\r
  font-weight: 300;\r
  overflow: hidden;\r
  transition: all 0.3s ease;\r
\r
  --glow-x: 50%;\r
  --glow-y: 50%;\r
  --glow-intensity: 0;\r
  --glow-radius: 200px;\r
}\r
\r
.magic-bento-card:hover {\r
  transform: translateY(-2px);\r
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\r
}\r
\r
.magic-bento-card__header,\r
.magic-bento-card__content {\r
  display: flex;\r
  position: relative;\r
  color: var(--white);\r
}\r
\r
.magic-bento-card__header {\r
  gap: 0.75em;\r
  justify-content: space-between;\r
}\r
\r
.magic-bento-card__content {\r
  flex-direction: column;\r
}\r
\r
.magic-bento-card__label {\r
  font-size: 16px;\r
}\r
\r
.magic-bento-card__title,\r
.magic-bento-card__description {\r
  --clamp-title: 1;\r
  --clamp-desc: 2;\r
}\r
\r
.magic-bento-card__title {\r
  font-weight: 400;\r
  font-size: 16px;\r
  margin: 0 0 0.25em;\r
}\r
\r
.magic-bento-card__description {\r
  font-size: 12px;\r
  line-height: 1.2;\r
  opacity: 0.9;\r
}\r
\r
.magic-bento-card--text-autohide .magic-bento-card__title,\r
.magic-bento-card--text-autohide .magic-bento-card__description {\r
  display: -webkit-box;\r
  -webkit-box-orient: vertical;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.magic-bento-card--text-autohide .magic-bento-card__title {\r
  -webkit-line-clamp: var(--clamp-title);\r
  line-clamp: var(--clamp-title);\r
}\r
\r
.magic-bento-card--text-autohide .magic-bento-card__description {\r
  -webkit-line-clamp: var(--clamp-desc);\r
  line-clamp: var(--clamp-desc);\r
}\r
\r
@media (max-width: 599px) {\r
  .card-grid {\r
    grid-template-columns: 1fr;\r
    width: 90%;\r
    margin: 0 auto;\r
    padding: 0.5em;\r
  }\r
\r
  .magic-bento-card {\r
    width: 100%;\r
    min-height: 180px;\r
  }\r
}\r
\r
@media (min-width: 600px) {\r
  .card-grid {\r
    grid-template-columns: repeat(2, 1fr);\r
  }\r
}\r
\r
@media (min-width: 1024px) {\r
  .card-grid {\r
    grid-template-columns: repeat(4, 1fr);\r
  }\r
\r
  .magic-bento-card:nth-child(3) {\r
    grid-column: span 2;\r
    grid-row: span 2;\r
  }\r
\r
  .magic-bento-card:nth-child(4) {\r
    grid-column: 1 / span 2;\r
    grid-row: 2 / span 2;\r
  }\r
\r
  .magic-bento-card:nth-child(6) {\r
    grid-column: 4;\r
    grid-row: 3;\r
  }\r
}\r
\r
/* Border glow effect */\r
.magic-bento-card--border-glow::after {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  padding: 6px;\r
  background: radial-gradient(\r
    var(--glow-radius) circle at var(--glow-x) var(--glow-y),\r
    rgba(132, 0, 255, calc(var(--glow-intensity) * 0.8)) 0%,\r
    rgba(132, 0, 255, calc(var(--glow-intensity) * 0.4)) 30%,\r
    transparent 60%\r
  );\r
  border-radius: inherit;\r
  mask:\r
    linear-gradient(#fff 0 0) content-box,\r
    linear-gradient(#fff 0 0);\r
  mask-composite: subtract;\r
  -webkit-mask:\r
    linear-gradient(#fff 0 0) content-box,\r
    linear-gradient(#fff 0 0);\r
  -webkit-mask-composite: xor;\r
  pointer-events: none;\r
  transition: opacity 0.3s ease;\r
  z-index: 1;\r
}\r
\r
.magic-bento-card--border-glow:hover::after {\r
  opacity: 1;\r
}\r
\r
.magic-bento-card--border-glow:hover {\r
  box-shadow:\r
    0 4px 20px rgba(46, 24, 78, 0.4),\r
    0 0 30px var(--purple-glow);\r
}\r
\r
.particle-container {\r
  position: relative;\r
  overflow: hidden;\r
}\r
\r
.particle::before {\r
  content: '';\r
  position: absolute;\r
  top: -2px;\r
  left: -2px;\r
  right: -2px;\r
  bottom: -2px;\r
  background: rgba(132, 0, 255, 0.2);\r
  border-radius: 50%;\r
  z-index: -1;\r
}\r
\r
.particle-container:hover {\r
  box-shadow:\r
    0 4px 20px rgba(46, 24, 78, 0.2),\r
    0 0 30px var(--purple-glow);\r
}\r
\r
/* Global spotlight styles */\r
.global-spotlight {\r
  mix-blend-mode: screen;\r
  will-change: transform, opacity;\r
  z-index: 200 !important;\r
  pointer-events: none;\r
}\r
\r
.bento-section {\r
  position: relative;\r
  user-select: none;\r
}\r
`,V=`import { useRef, useEffect, useState, useCallback } from 'react';\r
import { gsap } from 'gsap';\r
\r
const DEFAULT_PARTICLE_COUNT = 12;\r
const DEFAULT_SPOTLIGHT_RADIUS = 300;\r
const DEFAULT_GLOW_COLOR = '132, 0, 255';\r
const MOBILE_BREAKPOINT = 768;\r
\r
const cardData = [\r
  {\r
    color: '#060010',\r
    title: 'Analytics',\r
    description: 'Track user behavior',\r
    label: 'Insights'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Dashboard',\r
    description: 'Centralized data view',\r
    label: 'Overview'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Collaboration',\r
    description: 'Work together seamlessly',\r
    label: 'Teamwork'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Automation',\r
    description: 'Streamline workflows',\r
    label: 'Efficiency'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Integration',\r
    description: 'Connect favorite tools',\r
    label: 'Connectivity'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Security',\r
    description: 'Enterprise-grade protection',\r
    label: 'Protection'\r
  }\r
];\r
\r
const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {\r
  const el = document.createElement('div');\r
  el.className = 'particle';\r
  el.style.cssText = \`\r
    position: absolute;\r
    width: 4px;\r
    height: 4px;\r
    border-radius: 50%;\r
    background: rgba(\${color}, 1);\r
    box-shadow: 0 0 6px rgba(\${color}, 0.6);\r
    pointer-events: none;\r
    z-index: 100;\r
    left: \${x}px;\r
    top: \${y}px;\r
  \`;\r
  return el;\r
};\r
\r
const calculateSpotlightValues = radius => ({\r
  proximity: radius * 0.5,\r
  fadeDistance: radius * 0.75\r
});\r
\r
const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {\r
  const rect = card.getBoundingClientRect();\r
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;\r
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;\r
\r
  card.style.setProperty('--glow-x', \`\${relativeX}%\`);\r
  card.style.setProperty('--glow-y', \`\${relativeY}%\`);\r
  card.style.setProperty('--glow-intensity', glow.toString());\r
  card.style.setProperty('--glow-radius', \`\${radius}px\`);\r
};\r
\r
const ParticleCard = ({\r
  children,\r
  className = '',\r
  disableAnimations = false,\r
  style,\r
  particleCount = DEFAULT_PARTICLE_COUNT,\r
  glowColor = DEFAULT_GLOW_COLOR,\r
  enableTilt = true,\r
  clickEffect = false,\r
  enableMagnetism = false\r
}) => {\r
  const cardRef = useRef(null);\r
  const particlesRef = useRef([]);\r
  const timeoutsRef = useRef([]);\r
  const isHoveredRef = useRef(false);\r
  const memoizedParticles = useRef([]);\r
  const particlesInitialized = useRef(false);\r
  const magnetismAnimationRef = useRef(null);\r
\r
  const initializeParticles = useCallback(() => {\r
    if (particlesInitialized.current || !cardRef.current) return;\r
\r
    const { width, height } = cardRef.current.getBoundingClientRect();\r
    memoizedParticles.current = Array.from({ length: particleCount }, () =>\r
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)\r
    );\r
    particlesInitialized.current = true;\r
  }, [particleCount, glowColor]);\r
\r
  const clearAllParticles = useCallback(() => {\r
    timeoutsRef.current.forEach(clearTimeout);\r
    timeoutsRef.current = [];\r
    magnetismAnimationRef.current?.kill();\r
\r
    particlesRef.current.forEach(particle => {\r
      gsap.to(particle, {\r
        scale: 0,\r
        opacity: 0,\r
        duration: 0.3,\r
        ease: 'back.in(1.7)',\r
        onComplete: () => {\r
          particle.parentNode?.removeChild(particle);\r
        }\r
      });\r
    });\r
    particlesRef.current = [];\r
  }, []);\r
\r
  const animateParticles = useCallback(() => {\r
    if (!cardRef.current || !isHoveredRef.current) return;\r
\r
    if (!particlesInitialized.current) {\r
      initializeParticles();\r
    }\r
\r
    memoizedParticles.current.forEach((particle, index) => {\r
      const timeoutId = setTimeout(() => {\r
        if (!isHoveredRef.current || !cardRef.current) return;\r
\r
        const clone = particle.cloneNode(true);\r
        cardRef.current.appendChild(clone);\r
        particlesRef.current.push(clone);\r
\r
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });\r
\r
        gsap.to(clone, {\r
          x: (Math.random() - 0.5) * 100,\r
          y: (Math.random() - 0.5) * 100,\r
          rotation: Math.random() * 360,\r
          duration: 2 + Math.random() * 2,\r
          ease: 'none',\r
          repeat: -1,\r
          yoyo: true\r
        });\r
\r
        gsap.to(clone, {\r
          opacity: 0.3,\r
          duration: 1.5,\r
          ease: 'power2.inOut',\r
          repeat: -1,\r
          yoyo: true\r
        });\r
      }, index * 100);\r
\r
      timeoutsRef.current.push(timeoutId);\r
    });\r
  }, [initializeParticles]);\r
\r
  useEffect(() => {\r
    if (disableAnimations || !cardRef.current) return;\r
\r
    const element = cardRef.current;\r
\r
    const handleMouseEnter = () => {\r
      isHoveredRef.current = true;\r
      animateParticles();\r
\r
      if (enableTilt) {\r
        gsap.to(element, {\r
          rotateX: 5,\r
          rotateY: 5,\r
          duration: 0.3,\r
          ease: 'power2.out',\r
          transformPerspective: 1000\r
        });\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      isHoveredRef.current = false;\r
      clearAllParticles();\r
\r
      if (enableTilt) {\r
        gsap.to(element, {\r
          rotateX: 0,\r
          rotateY: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
\r
      if (enableMagnetism) {\r
        gsap.to(element, {\r
          x: 0,\r
          y: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    const handleMouseMove = e => {\r
      if (!enableTilt && !enableMagnetism) return;\r
\r
      const rect = element.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
      const centerX = rect.width / 2;\r
      const centerY = rect.height / 2;\r
\r
      if (enableTilt) {\r
        const rotateX = ((y - centerY) / centerY) * -10;\r
        const rotateY = ((x - centerX) / centerX) * 10;\r
\r
        gsap.to(element, {\r
          rotateX,\r
          rotateY,\r
          duration: 0.1,\r
          ease: 'power2.out',\r
          transformPerspective: 1000\r
        });\r
      }\r
\r
      if (enableMagnetism) {\r
        const magnetX = (x - centerX) * 0.05;\r
        const magnetY = (y - centerY) * 0.05;\r
\r
        magnetismAnimationRef.current = gsap.to(element, {\r
          x: magnetX,\r
          y: magnetY,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    const handleClick = e => {\r
      if (!clickEffect) return;\r
\r
      const rect = element.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
\r
      const maxDistance = Math.max(\r
        Math.hypot(x, y),\r
        Math.hypot(x - rect.width, y),\r
        Math.hypot(x, y - rect.height),\r
        Math.hypot(x - rect.width, y - rect.height)\r
      );\r
\r
      const ripple = document.createElement('div');\r
      ripple.style.cssText = \`\r
        position: absolute;\r
        width: \${maxDistance * 2}px;\r
        height: \${maxDistance * 2}px;\r
        border-radius: 50%;\r
        background: radial-gradient(circle, rgba(\${glowColor}, 0.4) 0%, rgba(\${glowColor}, 0.2) 30%, transparent 70%);\r
        left: \${x - maxDistance}px;\r
        top: \${y - maxDistance}px;\r
        pointer-events: none;\r
        z-index: 1000;\r
      \`;\r
\r
      element.appendChild(ripple);\r
\r
      gsap.fromTo(\r
        ripple,\r
        {\r
          scale: 0,\r
          opacity: 1\r
        },\r
        {\r
          scale: 1,\r
          opacity: 0,\r
          duration: 0.8,\r
          ease: 'power2.out',\r
          onComplete: () => ripple.remove()\r
        }\r
      );\r
    };\r
\r
    element.addEventListener('mouseenter', handleMouseEnter);\r
    element.addEventListener('mouseleave', handleMouseLeave);\r
    element.addEventListener('mousemove', handleMouseMove);\r
    element.addEventListener('click', handleClick);\r
\r
    return () => {\r
      isHoveredRef.current = false;\r
      element.removeEventListener('mouseenter', handleMouseEnter);\r
      element.removeEventListener('mouseleave', handleMouseLeave);\r
      element.removeEventListener('mousemove', handleMouseMove);\r
      element.removeEventListener('click', handleClick);\r
      clearAllParticles();\r
    };\r
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);\r
\r
  return (\r
    <div\r
      ref={cardRef}\r
      className={\`\${className} relative overflow-hidden\`}\r
      style={{ ...style, position: 'relative', overflow: 'hidden' }}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
const GlobalSpotlight = ({\r
  gridRef,\r
  disableAnimations = false,\r
  enabled = true,\r
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,\r
  glowColor = DEFAULT_GLOW_COLOR\r
}) => {\r
  const spotlightRef = useRef(null);\r
  const isInsideSection = useRef(false);\r
\r
  useEffect(() => {\r
    if (disableAnimations || !gridRef?.current || !enabled) return;\r
\r
    const spotlight = document.createElement('div');\r
    spotlight.className = 'global-spotlight';\r
    spotlight.style.cssText = \`\r
      position: fixed;\r
      width: 800px;\r
      height: 800px;\r
      border-radius: 50%;\r
      pointer-events: none;\r
      background: radial-gradient(circle,\r
        rgba(\${glowColor}, 0.15) 0%,\r
        rgba(\${glowColor}, 0.08) 15%,\r
        rgba(\${glowColor}, 0.04) 25%,\r
        rgba(\${glowColor}, 0.02) 40%,\r
        rgba(\${glowColor}, 0.01) 65%,\r
        transparent 70%\r
      );\r
      z-index: 200;\r
      opacity: 0;\r
      transform: translate(-50%, -50%);\r
      mix-blend-mode: screen;\r
    \`;\r
    document.body.appendChild(spotlight);\r
    spotlightRef.current = spotlight;\r
\r
    const handleMouseMove = e => {\r
      if (!spotlightRef.current || !gridRef.current) return;\r
\r
      const section = gridRef.current.closest('.bento-section');\r
      const rect = section?.getBoundingClientRect();\r
      const mouseInside =\r
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;\r
\r
      isInsideSection.current = mouseInside || false;\r
      const cards = gridRef.current.querySelectorAll('.card');\r
\r
      if (!mouseInside) {\r
        gsap.to(spotlightRef.current, {\r
          opacity: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
        cards.forEach(card => {\r
          card.style.setProperty('--glow-intensity', '0');\r
        });\r
        return;\r
      }\r
\r
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);\r
      let minDistance = Infinity;\r
\r
      cards.forEach(card => {\r
        const cardElement = card;\r
        const cardRect = cardElement.getBoundingClientRect();\r
        const centerX = cardRect.left + cardRect.width / 2;\r
        const centerY = cardRect.top + cardRect.height / 2;\r
        const distance =\r
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;\r
        const effectiveDistance = Math.max(0, distance);\r
\r
        minDistance = Math.min(minDistance, effectiveDistance);\r
\r
        let glowIntensity = 0;\r
        if (effectiveDistance <= proximity) {\r
          glowIntensity = 1;\r
        } else if (effectiveDistance <= fadeDistance) {\r
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);\r
        }\r
\r
        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);\r
      });\r
\r
      gsap.to(spotlightRef.current, {\r
        left: e.clientX,\r
        top: e.clientY,\r
        duration: 0.1,\r
        ease: 'power2.out'\r
      });\r
\r
      const targetOpacity =\r
        minDistance <= proximity\r
          ? 0.8\r
          : minDistance <= fadeDistance\r
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8\r
            : 0;\r
\r
      gsap.to(spotlightRef.current, {\r
        opacity: targetOpacity,\r
        duration: targetOpacity > 0 ? 0.2 : 0.5,\r
        ease: 'power2.out'\r
      });\r
    };\r
\r
    const handleMouseLeave = () => {\r
      isInsideSection.current = false;\r
      gridRef.current?.querySelectorAll('.card').forEach(card => {\r
        card.style.setProperty('--glow-intensity', '0');\r
      });\r
      if (spotlightRef.current) {\r
        gsap.to(spotlightRef.current, {\r
          opacity: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    document.addEventListener('mousemove', handleMouseMove);\r
    document.addEventListener('mouseleave', handleMouseLeave);\r
\r
    return () => {\r
      document.removeEventListener('mousemove', handleMouseMove);\r
      document.removeEventListener('mouseleave', handleMouseLeave);\r
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);\r
    };\r
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);\r
\r
  return null;\r
};\r
\r
const BentoCardGrid = ({ children, gridRef }) => (\r
  <div\r
    className="bento-section grid gap-2 p-3 max-w-[54rem] select-none relative"\r
    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}\r
    ref={gridRef}\r
  >\r
    {children}\r
  </div>\r
);\r
\r
const useMobileDetection = () => {\r
  const [isMobile, setIsMobile] = useState(false);\r
\r
  useEffect(() => {\r
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);\r
\r
    checkMobile();\r
    window.addEventListener('resize', checkMobile);\r
\r
    return () => window.removeEventListener('resize', checkMobile);\r
  }, []);\r
\r
  return isMobile;\r
};\r
\r
const MagicBento = ({\r
  textAutoHide = true,\r
  enableStars = true,\r
  enableSpotlight = true,\r
  enableBorderGlow = true,\r
  disableAnimations = false,\r
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,\r
  particleCount = DEFAULT_PARTICLE_COUNT,\r
  enableTilt = false,\r
  glowColor = DEFAULT_GLOW_COLOR,\r
  clickEffect = true,\r
  enableMagnetism = true\r
}) => {\r
  const gridRef = useRef(null);\r
  const isMobile = useMobileDetection();\r
  const shouldDisableAnimations = disableAnimations || isMobile;\r
\r
  return (\r
    <>\r
      <style>\r
        {\`\r
          .bento-section {\r
            --glow-x: 50%;\r
            --glow-y: 50%;\r
            --glow-intensity: 0;\r
            --glow-radius: 200px;\r
            --glow-color: \${glowColor};\r
            --border-color: #392e4e;\r
            --background-dark: #060010;\r
            --white: hsl(0, 0%, 100%);\r
            --purple-primary: rgba(132, 0, 255, 1);\r
            --purple-glow: rgba(132, 0, 255, 0.2);\r
            --purple-border: rgba(132, 0, 255, 0.8);\r
          }\r
          \r
          .card-responsive {\r
            grid-template-columns: 1fr;\r
            width: 90%;\r
            margin: 0 auto;\r
            padding: 0.5rem;\r
          }\r
          \r
          @media (min-width: 600px) {\r
            .card-responsive {\r
              grid-template-columns: repeat(2, 1fr);\r
            }\r
          }\r
          \r
          @media (min-width: 1024px) {\r
            .card-responsive {\r
              grid-template-columns: repeat(4, 1fr);\r
            }\r
            \r
            .card-responsive .card:nth-child(3) {\r
              grid-column: span 2;\r
              grid-row: span 2;\r
            }\r
            \r
            .card-responsive .card:nth-child(4) {\r
              grid-column: 1 / span 2;\r
              grid-row: 2 / span 2;\r
            }\r
            \r
            .card-responsive .card:nth-child(6) {\r
              grid-column: 4;\r
              grid-row: 3;\r
            }\r
          }\r
          \r
          .card--border-glow::after {\r
            content: '';\r
            position: absolute;\r
            inset: 0;\r
            padding: 6px;\r
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),\r
                rgba(\${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,\r
                rgba(\${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,\r
                transparent 60%);\r
            border-radius: inherit;\r
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\r
            mask-composite: subtract;\r
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\r
            -webkit-mask-composite: xor;\r
            pointer-events: none;\r
            transition: opacity 0.3s ease;\r
            z-index: 1;\r
          }\r
          \r
          .card--border-glow:hover::after {\r
            opacity: 1;\r
          }\r
          \r
          .card--border-glow:hover {\r
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(\${glowColor}, 0.2);\r
          }\r
          \r
          .particle::before {\r
            content: '';\r
            position: absolute;\r
            top: -2px;\r
            left: -2px;\r
            right: -2px;\r
            bottom: -2px;\r
            background: rgba(\${glowColor}, 0.2);\r
            border-radius: 50%;\r
            z-index: -1;\r
          }\r
          \r
          .particle-container:hover {\r
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(\${glowColor}, 0.2);\r
          }\r
          \r
          .text-clamp-1 {\r
            display: -webkit-box;\r
            -webkit-box-orient: vertical;\r
            -webkit-line-clamp: 1;\r
            line-clamp: 1;\r
            overflow: hidden;\r
            text-overflow: ellipsis;\r
          }\r
          \r
          .text-clamp-2 {\r
            display: -webkit-box;\r
            -webkit-box-orient: vertical;\r
            -webkit-line-clamp: 2;\r
            line-clamp: 2;\r
            overflow: hidden;\r
            text-overflow: ellipsis;\r
          }\r
          \r
          @media (max-width: 599px) {\r
            .card-responsive {\r
              grid-template-columns: 1fr;\r
              width: 90%;\r
              margin: 0 auto;\r
              padding: 0.5rem;\r
            }\r
            \r
            .card-responsive .card {\r
              width: 100%;\r
              min-height: 180px;\r
            }\r
          }\r
        \`}\r
      </style>\r
\r
      {enableSpotlight && (\r
        <GlobalSpotlight\r
          gridRef={gridRef}\r
          disableAnimations={shouldDisableAnimations}\r
          enabled={enableSpotlight}\r
          spotlightRadius={spotlightRadius}\r
          glowColor={glowColor}\r
        />\r
      )}\r
\r
      <BentoCardGrid gridRef={gridRef}>\r
        <div className="card-responsive grid gap-2">\r
          {cardData.map((card, index) => {\r
            const baseClassName = \`card flex flex-col justify-between relative aspect-[4/3] min-h-[200px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] \${\r
              enableBorderGlow ? 'card--border-glow' : ''\r
            }\`;\r
\r
            const cardStyle = {\r
              backgroundColor: card.color || 'var(--background-dark)',\r
              borderColor: 'var(--border-color)',\r
              color: 'var(--white)',\r
              '--glow-x': '50%',\r
              '--glow-y': '50%',\r
              '--glow-intensity': '0',\r
              '--glow-radius': '200px'\r
            };\r
\r
            if (enableStars) {\r
              return (\r
                <ParticleCard\r
                  key={index}\r
                  className={baseClassName}\r
                  style={cardStyle}\r
                  disableAnimations={shouldDisableAnimations}\r
                  particleCount={particleCount}\r
                  glowColor={glowColor}\r
                  enableTilt={enableTilt}\r
                  clickEffect={clickEffect}\r
                  enableMagnetism={enableMagnetism}\r
                >\r
                  <div className="card__header flex justify-between gap-3 relative text-white">\r
                    <span className="card__label text-base">{card.label}</span>\r
                  </div>\r
                  <div className="card__content flex flex-col relative text-white">\r
                    <h3 className={\`card__title font-normal text-base m-0 mb-1 \${textAutoHide ? 'text-clamp-1' : ''}\`}>\r
                      {card.title}\r
                    </h3>\r
                    <p\r
                      className={\`card__description text-xs leading-5 opacity-90 \${textAutoHide ? 'text-clamp-2' : ''}\`}\r
                    >\r
                      {card.description}\r
                    </p>\r
                  </div>\r
                </ParticleCard>\r
              );\r
            }\r
\r
            return (\r
              <div\r
                key={index}\r
                className={baseClassName}\r
                style={cardStyle}\r
                ref={el => {\r
                  if (!el) return;\r
\r
                  const handleMouseMove = e => {\r
                    if (shouldDisableAnimations) return;\r
\r
                    const rect = el.getBoundingClientRect();\r
                    const x = e.clientX - rect.left;\r
                    const y = e.clientY - rect.top;\r
                    const centerX = rect.width / 2;\r
                    const centerY = rect.height / 2;\r
\r
                    if (enableTilt) {\r
                      const rotateX = ((y - centerY) / centerY) * -10;\r
                      const rotateY = ((x - centerX) / centerX) * 10;\r
\r
                      gsap.to(el, {\r
                        rotateX,\r
                        rotateY,\r
                        duration: 0.1,\r
                        ease: 'power2.out',\r
                        transformPerspective: 1000\r
                      });\r
                    }\r
\r
                    if (enableMagnetism) {\r
                      const magnetX = (x - centerX) * 0.05;\r
                      const magnetY = (y - centerY) * 0.05;\r
\r
                      gsap.to(el, {\r
                        x: magnetX,\r
                        y: magnetY,\r
                        duration: 0.3,\r
                        ease: 'power2.out'\r
                      });\r
                    }\r
                  };\r
\r
                  const handleMouseLeave = () => {\r
                    if (shouldDisableAnimations) return;\r
\r
                    if (enableTilt) {\r
                      gsap.to(el, {\r
                        rotateX: 0,\r
                        rotateY: 0,\r
                        duration: 0.3,\r
                        ease: 'power2.out'\r
                      });\r
                    }\r
\r
                    if (enableMagnetism) {\r
                      gsap.to(el, {\r
                        x: 0,\r
                        y: 0,\r
                        duration: 0.3,\r
                        ease: 'power2.out'\r
                      });\r
                    }\r
                  };\r
\r
                  const handleClick = e => {\r
                    if (!clickEffect || shouldDisableAnimations) return;\r
\r
                    const rect = el.getBoundingClientRect();\r
                    const x = e.clientX - rect.left;\r
                    const y = e.clientY - rect.top;\r
\r
                    const maxDistance = Math.max(\r
                      Math.hypot(x, y),\r
                      Math.hypot(x - rect.width, y),\r
                      Math.hypot(x, y - rect.height),\r
                      Math.hypot(x - rect.width, y - rect.height)\r
                    );\r
\r
                    const ripple = document.createElement('div');\r
                    ripple.style.cssText = \`\r
                      position: absolute;\r
                      width: \${maxDistance * 2}px;\r
                      height: \${maxDistance * 2}px;\r
                      border-radius: 50%;\r
                      background: radial-gradient(circle, rgba(\${glowColor}, 0.4) 0%, rgba(\${glowColor}, 0.2) 30%, transparent 70%);\r
                      left: \${x - maxDistance}px;\r
                      top: \${y - maxDistance}px;\r
                      pointer-events: none;\r
                      z-index: 1000;\r
                    \`;\r
\r
                    el.appendChild(ripple);\r
\r
                    gsap.fromTo(\r
                      ripple,\r
                      {\r
                        scale: 0,\r
                        opacity: 1\r
                      },\r
                      {\r
                        scale: 1,\r
                        opacity: 0,\r
                        duration: 0.8,\r
                        ease: 'power2.out',\r
                        onComplete: () => ripple.remove()\r
                      }\r
                    );\r
                  };\r
\r
                  el.addEventListener('mousemove', handleMouseMove);\r
                  el.addEventListener('mouseleave', handleMouseLeave);\r
                  el.addEventListener('click', handleClick);\r
                }}\r
              >\r
                <div className="card__header flex justify-between gap-3 relative text-white">\r
                  <span className="card__label text-base">{card.label}</span>\r
                </div>\r
                <div className="card__content flex flex-col relative text-white">\r
                  <h3 className={\`card__title font-normal text-base m-0 mb-1 \${textAutoHide ? 'text-clamp-1' : ''}\`}>\r
                    {card.title}\r
                  </h3>\r
                  <p className={\`card__description text-xs leading-5 opacity-90 \${textAutoHide ? 'text-clamp-2' : ''}\`}>\r
                    {card.description}\r
                  </p>\r
                </div>\r
              </div>\r
            );\r
          })}\r
        </div>\r
      </BentoCardGrid>\r
    </>\r
  );\r
};\r
\r
export default MagicBento;\r
`,J=`import React, { useRef, useEffect, useCallback, useState } from 'react';\r
import { gsap } from 'gsap';\r
import './MagicBento.css';\r
\r
export interface BentoCardProps {\r
  color?: string;\r
  title?: string;\r
  description?: string;\r
  label?: string;\r
  textAutoHide?: boolean;\r
  disableAnimations?: boolean;\r
}\r
\r
export interface BentoProps {\r
  textAutoHide?: boolean;\r
  enableStars?: boolean;\r
  enableSpotlight?: boolean;\r
  enableBorderGlow?: boolean;\r
  disableAnimations?: boolean;\r
  spotlightRadius?: number;\r
  particleCount?: number;\r
  enableTilt?: boolean;\r
  glowColor?: string;\r
  clickEffect?: boolean;\r
  enableMagnetism?: boolean;\r
}\r
\r
const DEFAULT_PARTICLE_COUNT = 12;\r
const DEFAULT_SPOTLIGHT_RADIUS = 300;\r
const DEFAULT_GLOW_COLOR = '132, 0, 255';\r
const MOBILE_BREAKPOINT = 768;\r
\r
const cardData: BentoCardProps[] = [\r
  {\r
    color: '#060010',\r
    title: 'Analytics',\r
    description: 'Track user behavior',\r
    label: 'Insights'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Dashboard',\r
    description: 'Centralized data view',\r
    label: 'Overview'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Collaboration',\r
    description: 'Work together seamlessly',\r
    label: 'Teamwork'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Automation',\r
    description: 'Streamline workflows',\r
    label: 'Efficiency'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Integration',\r
    description: 'Connect favorite tools',\r
    label: 'Connectivity'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Security',\r
    description: 'Enterprise-grade protection',\r
    label: 'Protection'\r
  }\r
];\r
\r
const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {\r
  const el = document.createElement('div');\r
  el.className = 'particle';\r
  el.style.cssText = \`\r
    position: absolute;\r
    width: 4px;\r
    height: 4px;\r
    border-radius: 50%;\r
    background: rgba(\${color}, 1);\r
    box-shadow: 0 0 6px rgba(\${color}, 0.6);\r
    pointer-events: none;\r
    z-index: 100;\r
    left: \${x}px;\r
    top: \${y}px;\r
  \`;\r
  return el;\r
};\r
\r
const calculateSpotlightValues = (radius: number) => ({\r
  proximity: radius * 0.5,\r
  fadeDistance: radius * 0.75\r
});\r
\r
const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {\r
  const rect = card.getBoundingClientRect();\r
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;\r
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;\r
\r
  card.style.setProperty('--glow-x', \`\${relativeX}%\`);\r
  card.style.setProperty('--glow-y', \`\${relativeY}%\`);\r
  card.style.setProperty('--glow-intensity', glow.toString());\r
  card.style.setProperty('--glow-radius', \`\${radius}px\`);\r
};\r
\r
const ParticleCard: React.FC<{\r
  children: React.ReactNode;\r
  className?: string;\r
  disableAnimations?: boolean;\r
  style?: React.CSSProperties;\r
  particleCount?: number;\r
  glowColor?: string;\r
  enableTilt?: boolean;\r
  clickEffect?: boolean;\r
  enableMagnetism?: boolean;\r
}> = ({\r
  children,\r
  className = '',\r
  disableAnimations = false,\r
  style,\r
  particleCount = DEFAULT_PARTICLE_COUNT,\r
  glowColor = DEFAULT_GLOW_COLOR,\r
  enableTilt = true,\r
  clickEffect = false,\r
  enableMagnetism = false\r
}) => {\r
  const cardRef = useRef<HTMLDivElement>(null);\r
  const particlesRef = useRef<HTMLDivElement[]>([]);\r
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);\r
  const isHoveredRef = useRef(false);\r
  const memoizedParticles = useRef<HTMLDivElement[]>([]);\r
  const particlesInitialized = useRef(false);\r
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);\r
\r
  const initializeParticles = useCallback(() => {\r
    if (particlesInitialized.current || !cardRef.current) return;\r
\r
    const { width, height } = cardRef.current.getBoundingClientRect();\r
    memoizedParticles.current = Array.from({ length: particleCount }, () =>\r
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)\r
    );\r
    particlesInitialized.current = true;\r
  }, [particleCount, glowColor]);\r
\r
  const clearAllParticles = useCallback(() => {\r
    timeoutsRef.current.forEach(clearTimeout);\r
    timeoutsRef.current = [];\r
    magnetismAnimationRef.current?.kill();\r
\r
    particlesRef.current.forEach(particle => {\r
      gsap.to(particle, {\r
        scale: 0,\r
        opacity: 0,\r
        duration: 0.3,\r
        ease: 'back.in(1.7)',\r
        onComplete: () => {\r
          particle.parentNode?.removeChild(particle);\r
        }\r
      });\r
    });\r
    particlesRef.current = [];\r
  }, []);\r
\r
  const animateParticles = useCallback(() => {\r
    if (!cardRef.current || !isHoveredRef.current) return;\r
\r
    if (!particlesInitialized.current) {\r
      initializeParticles();\r
    }\r
\r
    memoizedParticles.current.forEach((particle, index) => {\r
      const timeoutId = setTimeout(() => {\r
        if (!isHoveredRef.current || !cardRef.current) return;\r
\r
        const clone = particle.cloneNode(true) as HTMLDivElement;\r
        cardRef.current.appendChild(clone);\r
        particlesRef.current.push(clone);\r
\r
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });\r
\r
        gsap.to(clone, {\r
          x: (Math.random() - 0.5) * 100,\r
          y: (Math.random() - 0.5) * 100,\r
          rotation: Math.random() * 360,\r
          duration: 2 + Math.random() * 2,\r
          ease: 'none',\r
          repeat: -1,\r
          yoyo: true\r
        });\r
\r
        gsap.to(clone, {\r
          opacity: 0.3,\r
          duration: 1.5,\r
          ease: 'power2.inOut',\r
          repeat: -1,\r
          yoyo: true\r
        });\r
      }, index * 100);\r
\r
      timeoutsRef.current.push(timeoutId);\r
    });\r
  }, [initializeParticles]);\r
\r
  useEffect(() => {\r
    if (disableAnimations || !cardRef.current) return;\r
\r
    const element = cardRef.current;\r
\r
    const handleMouseEnter = () => {\r
      isHoveredRef.current = true;\r
      animateParticles();\r
\r
      if (enableTilt) {\r
        gsap.to(element, {\r
          rotateX: 5,\r
          rotateY: 5,\r
          duration: 0.3,\r
          ease: 'power2.out',\r
          transformPerspective: 1000\r
        });\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      isHoveredRef.current = false;\r
      clearAllParticles();\r
\r
      if (enableTilt) {\r
        gsap.to(element, {\r
          rotateX: 0,\r
          rotateY: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
\r
      if (enableMagnetism) {\r
        gsap.to(element, {\r
          x: 0,\r
          y: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!enableTilt && !enableMagnetism) return;\r
\r
      const rect = element.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
      const centerX = rect.width / 2;\r
      const centerY = rect.height / 2;\r
\r
      if (enableTilt) {\r
        const rotateX = ((y - centerY) / centerY) * -10;\r
        const rotateY = ((x - centerX) / centerX) * 10;\r
\r
        gsap.to(element, {\r
          rotateX,\r
          rotateY,\r
          duration: 0.1,\r
          ease: 'power2.out',\r
          transformPerspective: 1000\r
        });\r
      }\r
\r
      if (enableMagnetism) {\r
        const magnetX = (x - centerX) * 0.05;\r
        const magnetY = (y - centerY) * 0.05;\r
\r
        magnetismAnimationRef.current = gsap.to(element, {\r
          x: magnetX,\r
          y: magnetY,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    const handleClick = (e: MouseEvent) => {\r
      if (!clickEffect) return;\r
\r
      const rect = element.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
\r
      const maxDistance = Math.max(\r
        Math.hypot(x, y),\r
        Math.hypot(x - rect.width, y),\r
        Math.hypot(x, y - rect.height),\r
        Math.hypot(x - rect.width, y - rect.height)\r
      );\r
\r
      const ripple = document.createElement('div');\r
      ripple.style.cssText = \`\r
        position: absolute;\r
        width: \${maxDistance * 2}px;\r
        height: \${maxDistance * 2}px;\r
        border-radius: 50%;\r
        background: radial-gradient(circle, rgba(\${glowColor}, 0.4) 0%, rgba(\${glowColor}, 0.2) 30%, transparent 70%);\r
        left: \${x - maxDistance}px;\r
        top: \${y - maxDistance}px;\r
        pointer-events: none;\r
        z-index: 1000;\r
      \`;\r
\r
      element.appendChild(ripple);\r
\r
      gsap.fromTo(\r
        ripple,\r
        {\r
          scale: 0,\r
          opacity: 1\r
        },\r
        {\r
          scale: 1,\r
          opacity: 0,\r
          duration: 0.8,\r
          ease: 'power2.out',\r
          onComplete: () => ripple.remove()\r
        }\r
      );\r
    };\r
\r
    element.addEventListener('mouseenter', handleMouseEnter);\r
    element.addEventListener('mouseleave', handleMouseLeave);\r
    element.addEventListener('mousemove', handleMouseMove);\r
    element.addEventListener('click', handleClick);\r
\r
    return () => {\r
      isHoveredRef.current = false;\r
      element.removeEventListener('mouseenter', handleMouseEnter);\r
      element.removeEventListener('mouseleave', handleMouseLeave);\r
      element.removeEventListener('mousemove', handleMouseMove);\r
      element.removeEventListener('click', handleClick);\r
      clearAllParticles();\r
    };\r
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);\r
\r
  return (\r
    <div\r
      ref={cardRef}\r
      className={\`\${className} particle-container\`}\r
      style={{ ...style, position: 'relative', overflow: 'hidden' }}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
const GlobalSpotlight: React.FC<{\r
  gridRef: React.RefObject<HTMLDivElement | null>;\r
  disableAnimations?: boolean;\r
  enabled?: boolean;\r
  spotlightRadius?: number;\r
  glowColor?: string;\r
}> = ({\r
  gridRef,\r
  disableAnimations = false,\r
  enabled = true,\r
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,\r
  glowColor = DEFAULT_GLOW_COLOR\r
}) => {\r
  const spotlightRef = useRef<HTMLDivElement | null>(null);\r
  const isInsideSection = useRef(false);\r
\r
  useEffect(() => {\r
    if (disableAnimations || !gridRef?.current || !enabled) return;\r
\r
    const spotlight = document.createElement('div');\r
    spotlight.className = 'global-spotlight';\r
    spotlight.style.cssText = \`\r
      position: fixed;\r
      width: 800px;\r
      height: 800px;\r
      border-radius: 50%;\r
      pointer-events: none;\r
      background: radial-gradient(circle,\r
        rgba(\${glowColor}, 0.15) 0%,\r
        rgba(\${glowColor}, 0.08) 15%,\r
        rgba(\${glowColor}, 0.04) 25%,\r
        rgba(\${glowColor}, 0.02) 40%,\r
        rgba(\${glowColor}, 0.01) 65%,\r
        transparent 70%\r
      );\r
      z-index: 200;\r
      opacity: 0;\r
      transform: translate(-50%, -50%);\r
      mix-blend-mode: screen;\r
    \`;\r
    document.body.appendChild(spotlight);\r
    spotlightRef.current = spotlight;\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!spotlightRef.current || !gridRef.current) return;\r
\r
      const section = gridRef.current.closest('.bento-section');\r
      const rect = section?.getBoundingClientRect();\r
      const mouseInside =\r
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;\r
\r
      isInsideSection.current = mouseInside || false;\r
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');\r
\r
      if (!mouseInside) {\r
        gsap.to(spotlightRef.current, {\r
          opacity: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
        cards.forEach(card => {\r
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');\r
        });\r
        return;\r
      }\r
\r
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);\r
      let minDistance = Infinity;\r
\r
      cards.forEach(card => {\r
        const cardElement = card as HTMLElement;\r
        const cardRect = cardElement.getBoundingClientRect();\r
        const centerX = cardRect.left + cardRect.width / 2;\r
        const centerY = cardRect.top + cardRect.height / 2;\r
        const distance =\r
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;\r
        const effectiveDistance = Math.max(0, distance);\r
\r
        minDistance = Math.min(minDistance, effectiveDistance);\r
\r
        let glowIntensity = 0;\r
        if (effectiveDistance <= proximity) {\r
          glowIntensity = 1;\r
        } else if (effectiveDistance <= fadeDistance) {\r
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);\r
        }\r
\r
        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);\r
      });\r
\r
      gsap.to(spotlightRef.current, {\r
        left: e.clientX,\r
        top: e.clientY,\r
        duration: 0.1,\r
        ease: 'power2.out'\r
      });\r
\r
      const targetOpacity =\r
        minDistance <= proximity\r
          ? 0.8\r
          : minDistance <= fadeDistance\r
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8\r
            : 0;\r
\r
      gsap.to(spotlightRef.current, {\r
        opacity: targetOpacity,\r
        duration: targetOpacity > 0 ? 0.2 : 0.5,\r
        ease: 'power2.out'\r
      });\r
    };\r
\r
    const handleMouseLeave = () => {\r
      isInsideSection.current = false;\r
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => {\r
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');\r
      });\r
      if (spotlightRef.current) {\r
        gsap.to(spotlightRef.current, {\r
          opacity: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    document.addEventListener('mousemove', handleMouseMove);\r
    document.addEventListener('mouseleave', handleMouseLeave);\r
\r
    return () => {\r
      document.removeEventListener('mousemove', handleMouseMove);\r
      document.removeEventListener('mouseleave', handleMouseLeave);\r
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);\r
    };\r
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);\r
\r
  return null;\r
};\r
\r
const BentoCardGrid: React.FC<{\r
  children: React.ReactNode;\r
  gridRef?: React.RefObject<HTMLDivElement | null>;\r
}> = ({ children, gridRef }) => (\r
  <div className="card-grid bento-section" ref={gridRef}>\r
    {children}\r
  </div>\r
);\r
\r
const useMobileDetection = () => {\r
  const [isMobile, setIsMobile] = useState(false);\r
\r
  useEffect(() => {\r
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);\r
\r
    checkMobile();\r
    window.addEventListener('resize', checkMobile);\r
\r
    return () => window.removeEventListener('resize', checkMobile);\r
  }, []);\r
\r
  return isMobile;\r
};\r
\r
const MagicBento: React.FC<BentoProps> = ({\r
  textAutoHide = true,\r
  enableStars = true,\r
  enableSpotlight = true,\r
  enableBorderGlow = true,\r
  disableAnimations = false,\r
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,\r
  particleCount = DEFAULT_PARTICLE_COUNT,\r
  enableTilt = false,\r
  glowColor = DEFAULT_GLOW_COLOR,\r
  clickEffect = true,\r
  enableMagnetism = true\r
}) => {\r
  const gridRef = useRef<HTMLDivElement>(null);\r
  const isMobile = useMobileDetection();\r
  const shouldDisableAnimations = disableAnimations || isMobile;\r
\r
  return (\r
    <>\r
      {enableSpotlight && (\r
        <GlobalSpotlight\r
          gridRef={gridRef}\r
          disableAnimations={shouldDisableAnimations}\r
          enabled={enableSpotlight}\r
          spotlightRadius={spotlightRadius}\r
          glowColor={glowColor}\r
        />\r
      )}\r
\r
      <BentoCardGrid gridRef={gridRef}>\r
        {cardData.map((card, index) => {\r
          const baseClassName = \`magic-bento-card \${textAutoHide ? 'magic-bento-card--text-autohide' : ''} \${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}\`;\r
          const cardProps = {\r
            className: baseClassName,\r
            style: {\r
              backgroundColor: card.color,\r
              '--glow-color': glowColor\r
            } as React.CSSProperties\r
          };\r
\r
          if (enableStars) {\r
            return (\r
              <ParticleCard\r
                key={index}\r
                {...cardProps}\r
                disableAnimations={shouldDisableAnimations}\r
                particleCount={particleCount}\r
                glowColor={glowColor}\r
                enableTilt={enableTilt}\r
                clickEffect={clickEffect}\r
                enableMagnetism={enableMagnetism}\r
              >\r
                <div className="magic-bento-card__header">\r
                  <div className="magic-bento-card__label">{card.label}</div>\r
                </div>\r
                <div className="magic-bento-card__content">\r
                  <h2 className="magic-bento-card__title">{card.title}</h2>\r
                  <p className="magic-bento-card__description">{card.description}</p>\r
                </div>\r
              </ParticleCard>\r
            );\r
          }\r
\r
          return (\r
            <div\r
              key={index}\r
              {...cardProps}\r
              ref={el => {\r
                if (!el) return;\r
\r
                const handleMouseMove = (e: MouseEvent) => {\r
                  if (shouldDisableAnimations) return;\r
\r
                  const rect = el.getBoundingClientRect();\r
                  const x = e.clientX - rect.left;\r
                  const y = e.clientY - rect.top;\r
                  const centerX = rect.width / 2;\r
                  const centerY = rect.height / 2;\r
\r
                  if (enableTilt) {\r
                    const rotateX = ((y - centerY) / centerY) * -10;\r
                    const rotateY = ((x - centerX) / centerX) * 10;\r
                    gsap.to(el, {\r
                      rotateX,\r
                      rotateY,\r
                      duration: 0.1,\r
                      ease: 'power2.out',\r
                      transformPerspective: 1000\r
                    });\r
                  }\r
\r
                  if (enableMagnetism) {\r
                    const magnetX = (x - centerX) * 0.05;\r
                    const magnetY = (y - centerY) * 0.05;\r
                    gsap.to(el, {\r
                      x: magnetX,\r
                      y: magnetY,\r
                      duration: 0.3,\r
                      ease: 'power2.out'\r
                    });\r
                  }\r
                };\r
\r
                const handleMouseLeave = () => {\r
                  if (shouldDisableAnimations) return;\r
\r
                  if (enableTilt) {\r
                    gsap.to(el, {\r
                      rotateX: 0,\r
                      rotateY: 0,\r
                      duration: 0.3,\r
                      ease: 'power2.out'\r
                    });\r
                  }\r
\r
                  if (enableMagnetism) {\r
                    gsap.to(el, {\r
                      x: 0,\r
                      y: 0,\r
                      duration: 0.3,\r
                      ease: 'power2.out'\r
                    });\r
                  }\r
                };\r
\r
                const handleClick = (e: MouseEvent) => {\r
                  if (!clickEffect || shouldDisableAnimations) return;\r
\r
                  const rect = el.getBoundingClientRect();\r
                  const x = e.clientX - rect.left;\r
                  const y = e.clientY - rect.top;\r
\r
                  // Calculate the maximum distance from click point to any corner\r
                  const maxDistance = Math.max(\r
                    Math.hypot(x, y),\r
                    Math.hypot(x - rect.width, y),\r
                    Math.hypot(x, y - rect.height),\r
                    Math.hypot(x - rect.width, y - rect.height)\r
                  );\r
\r
                  const ripple = document.createElement('div');\r
                  ripple.style.cssText = \`\r
                    position: absolute;\r
                    width: \${maxDistance * 2}px;\r
                    height: \${maxDistance * 2}px;\r
                    border-radius: 50%;\r
                    background: radial-gradient(circle, rgba(\${glowColor}, 0.4) 0%, rgba(\${glowColor}, 0.2) 30%, transparent 70%);\r
                    left: \${x - maxDistance}px;\r
                    top: \${y - maxDistance}px;\r
                    pointer-events: none;\r
                    z-index: 1000;\r
                  \`;\r
\r
                  el.appendChild(ripple);\r
\r
                  gsap.fromTo(\r
                    ripple,\r
                    {\r
                      scale: 0,\r
                      opacity: 1\r
                    },\r
                    {\r
                      scale: 1,\r
                      opacity: 0,\r
                      duration: 0.8,\r
                      ease: 'power2.out',\r
                      onComplete: () => ripple.remove()\r
                    }\r
                  );\r
                };\r
\r
                el.addEventListener('mousemove', handleMouseMove);\r
                el.addEventListener('mouseleave', handleMouseLeave);\r
                el.addEventListener('click', handleClick);\r
              }}\r
            >\r
              <div className="magic-bento-card__header">\r
                <div className="magic-bento-card__label">{card.label}</div>\r
              </div>\r
              <div className="magic-bento-card__content">\r
                <h2 className="magic-bento-card__title">{card.title}</h2>\r
                <p className="magic-bento-card__description">{card.description}</p>\r
              </div>\r
            </div>\r
          );\r
        })}\r
      </BentoCardGrid>\r
    </>\r
  );\r
};\r
\r
export default MagicBento;\r
`,Q=`import React, { useRef, useEffect, useState, useCallback } from 'react';\r
import { gsap } from 'gsap';\r
\r
export interface BentoCardProps {\r
  color?: string;\r
  title?: string;\r
  description?: string;\r
  label?: string;\r
  textAutoHide?: boolean;\r
  disableAnimations?: boolean;\r
}\r
\r
export interface BentoProps {\r
  textAutoHide?: boolean;\r
  enableStars?: boolean;\r
  enableSpotlight?: boolean;\r
  enableBorderGlow?: boolean;\r
  disableAnimations?: boolean;\r
  spotlightRadius?: number;\r
  particleCount?: number;\r
  enableTilt?: boolean;\r
  glowColor?: string;\r
  clickEffect?: boolean;\r
  enableMagnetism?: boolean;\r
}\r
\r
const DEFAULT_PARTICLE_COUNT = 12;\r
const DEFAULT_SPOTLIGHT_RADIUS = 300;\r
const DEFAULT_GLOW_COLOR = '132, 0, 255';\r
const MOBILE_BREAKPOINT = 768;\r
\r
const cardData: BentoCardProps[] = [\r
  {\r
    color: '#060010',\r
    title: 'Analytics',\r
    description: 'Track user behavior',\r
    label: 'Insights'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Dashboard',\r
    description: 'Centralized data view',\r
    label: 'Overview'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Collaboration',\r
    description: 'Work together seamlessly',\r
    label: 'Teamwork'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Automation',\r
    description: 'Streamline workflows',\r
    label: 'Efficiency'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Integration',\r
    description: 'Connect favorite tools',\r
    label: 'Connectivity'\r
  },\r
  {\r
    color: '#060010',\r
    title: 'Security',\r
    description: 'Enterprise-grade protection',\r
    label: 'Protection'\r
  }\r
];\r
\r
const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {\r
  const el = document.createElement('div');\r
  el.className = 'particle';\r
  el.style.cssText = \`\r
    position: absolute;\r
    width: 4px;\r
    height: 4px;\r
    border-radius: 50%;\r
    background: rgba(\${color}, 1);\r
    box-shadow: 0 0 6px rgba(\${color}, 0.6);\r
    pointer-events: none;\r
    z-index: 100;\r
    left: \${x}px;\r
    top: \${y}px;\r
  \`;\r
  return el;\r
};\r
\r
const calculateSpotlightValues = (radius: number) => ({\r
  proximity: radius * 0.5,\r
  fadeDistance: radius * 0.75\r
});\r
\r
const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {\r
  const rect = card.getBoundingClientRect();\r
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;\r
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;\r
\r
  card.style.setProperty('--glow-x', \`\${relativeX}%\`);\r
  card.style.setProperty('--glow-y', \`\${relativeY}%\`);\r
  card.style.setProperty('--glow-intensity', glow.toString());\r
  card.style.setProperty('--glow-radius', \`\${radius}px\`);\r
};\r
\r
const ParticleCard: React.FC<{\r
  children: React.ReactNode;\r
  className?: string;\r
  disableAnimations?: boolean;\r
  style?: React.CSSProperties;\r
  particleCount?: number;\r
  glowColor?: string;\r
  enableTilt?: boolean;\r
  clickEffect?: boolean;\r
  enableMagnetism?: boolean;\r
}> = ({\r
  children,\r
  className = '',\r
  disableAnimations = false,\r
  style,\r
  particleCount = DEFAULT_PARTICLE_COUNT,\r
  glowColor = DEFAULT_GLOW_COLOR,\r
  enableTilt = true,\r
  clickEffect = false,\r
  enableMagnetism = false\r
}) => {\r
  const cardRef = useRef<HTMLDivElement>(null);\r
  const particlesRef = useRef<HTMLDivElement[]>([]);\r
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);\r
  const isHoveredRef = useRef(false);\r
  const memoizedParticles = useRef<HTMLDivElement[]>([]);\r
  const particlesInitialized = useRef(false);\r
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);\r
\r
  const initializeParticles = useCallback(() => {\r
    if (particlesInitialized.current || !cardRef.current) return;\r
\r
    const { width, height } = cardRef.current.getBoundingClientRect();\r
    memoizedParticles.current = Array.from({ length: particleCount }, () =>\r
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)\r
    );\r
    particlesInitialized.current = true;\r
  }, [particleCount, glowColor]);\r
\r
  const clearAllParticles = useCallback(() => {\r
    timeoutsRef.current.forEach(clearTimeout);\r
    timeoutsRef.current = [];\r
    magnetismAnimationRef.current?.kill();\r
\r
    particlesRef.current.forEach(particle => {\r
      gsap.to(particle, {\r
        scale: 0,\r
        opacity: 0,\r
        duration: 0.3,\r
        ease: 'back.in(1.7)',\r
        onComplete: () => {\r
          particle.parentNode?.removeChild(particle);\r
        }\r
      });\r
    });\r
    particlesRef.current = [];\r
  }, []);\r
\r
  const animateParticles = useCallback(() => {\r
    if (!cardRef.current || !isHoveredRef.current) return;\r
\r
    if (!particlesInitialized.current) {\r
      initializeParticles();\r
    }\r
\r
    memoizedParticles.current.forEach((particle, index) => {\r
      const timeoutId = setTimeout(() => {\r
        if (!isHoveredRef.current || !cardRef.current) return;\r
\r
        const clone = particle.cloneNode(true) as HTMLDivElement;\r
        cardRef.current.appendChild(clone);\r
        particlesRef.current.push(clone);\r
\r
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });\r
\r
        gsap.to(clone, {\r
          x: (Math.random() - 0.5) * 100,\r
          y: (Math.random() - 0.5) * 100,\r
          rotation: Math.random() * 360,\r
          duration: 2 + Math.random() * 2,\r
          ease: 'none',\r
          repeat: -1,\r
          yoyo: true\r
        });\r
\r
        gsap.to(clone, {\r
          opacity: 0.3,\r
          duration: 1.5,\r
          ease: 'power2.inOut',\r
          repeat: -1,\r
          yoyo: true\r
        });\r
      }, index * 100);\r
\r
      timeoutsRef.current.push(timeoutId);\r
    });\r
  }, [initializeParticles]);\r
\r
  useEffect(() => {\r
    if (disableAnimations || !cardRef.current) return;\r
\r
    const element = cardRef.current;\r
\r
    const handleMouseEnter = () => {\r
      isHoveredRef.current = true;\r
      animateParticles();\r
\r
      if (enableTilt) {\r
        gsap.to(element, {\r
          rotateX: 5,\r
          rotateY: 5,\r
          duration: 0.3,\r
          ease: 'power2.out',\r
          transformPerspective: 1000\r
        });\r
      }\r
    };\r
\r
    const handleMouseLeave = () => {\r
      isHoveredRef.current = false;\r
      clearAllParticles();\r
\r
      if (enableTilt) {\r
        gsap.to(element, {\r
          rotateX: 0,\r
          rotateY: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
\r
      if (enableMagnetism) {\r
        gsap.to(element, {\r
          x: 0,\r
          y: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!enableTilt && !enableMagnetism) return;\r
\r
      const rect = element.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
      const centerX = rect.width / 2;\r
      const centerY = rect.height / 2;\r
\r
      if (enableTilt) {\r
        const rotateX = ((y - centerY) / centerY) * -10;\r
        const rotateY = ((x - centerX) / centerX) * 10;\r
\r
        gsap.to(element, {\r
          rotateX,\r
          rotateY,\r
          duration: 0.1,\r
          ease: 'power2.out',\r
          transformPerspective: 1000\r
        });\r
      }\r
\r
      if (enableMagnetism) {\r
        const magnetX = (x - centerX) * 0.05;\r
        const magnetY = (y - centerY) * 0.05;\r
\r
        magnetismAnimationRef.current = gsap.to(element, {\r
          x: magnetX,\r
          y: magnetY,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    const handleClick = (e: MouseEvent) => {\r
      if (!clickEffect) return;\r
\r
      const rect = element.getBoundingClientRect();\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
\r
      const maxDistance = Math.max(\r
        Math.hypot(x, y),\r
        Math.hypot(x - rect.width, y),\r
        Math.hypot(x, y - rect.height),\r
        Math.hypot(x - rect.width, y - rect.height)\r
      );\r
\r
      const ripple = document.createElement('div');\r
      ripple.style.cssText = \`\r
        position: absolute;\r
        width: \${maxDistance * 2}px;\r
        height: \${maxDistance * 2}px;\r
        border-radius: 50%;\r
        background: radial-gradient(circle, rgba(\${glowColor}, 0.4) 0%, rgba(\${glowColor}, 0.2) 30%, transparent 70%);\r
        left: \${x - maxDistance}px;\r
        top: \${y - maxDistance}px;\r
        pointer-events: none;\r
        z-index: 1000;\r
      \`;\r
\r
      element.appendChild(ripple);\r
\r
      gsap.fromTo(\r
        ripple,\r
        {\r
          scale: 0,\r
          opacity: 1\r
        },\r
        {\r
          scale: 1,\r
          opacity: 0,\r
          duration: 0.8,\r
          ease: 'power2.out',\r
          onComplete: () => ripple.remove()\r
        }\r
      );\r
    };\r
\r
    element.addEventListener('mouseenter', handleMouseEnter);\r
    element.addEventListener('mouseleave', handleMouseLeave);\r
    element.addEventListener('mousemove', handleMouseMove);\r
    element.addEventListener('click', handleClick);\r
\r
    return () => {\r
      isHoveredRef.current = false;\r
      element.removeEventListener('mouseenter', handleMouseEnter);\r
      element.removeEventListener('mouseleave', handleMouseLeave);\r
      element.removeEventListener('mousemove', handleMouseMove);\r
      element.removeEventListener('click', handleClick);\r
      clearAllParticles();\r
    };\r
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);\r
\r
  return (\r
    <div\r
      ref={cardRef}\r
      className={\`\${className} relative overflow-hidden\`}\r
      style={{ ...style, position: 'relative', overflow: 'hidden' }}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
const GlobalSpotlight: React.FC<{\r
  gridRef: React.RefObject<HTMLDivElement | null>;\r
  disableAnimations?: boolean;\r
  enabled?: boolean;\r
  spotlightRadius?: number;\r
  glowColor?: string;\r
}> = ({\r
  gridRef,\r
  disableAnimations = false,\r
  enabled = true,\r
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,\r
  glowColor = DEFAULT_GLOW_COLOR\r
}) => {\r
  const spotlightRef = useRef<HTMLDivElement | null>(null);\r
  const isInsideSection = useRef(false);\r
\r
  useEffect(() => {\r
    if (disableAnimations || !gridRef?.current || !enabled) return;\r
\r
    const spotlight = document.createElement('div');\r
    spotlight.className = 'global-spotlight';\r
    spotlight.style.cssText = \`\r
      position: fixed;\r
      width: 800px;\r
      height: 800px;\r
      border-radius: 50%;\r
      pointer-events: none;\r
      background: radial-gradient(circle,\r
        rgba(\${glowColor}, 0.15) 0%,\r
        rgba(\${glowColor}, 0.08) 15%,\r
        rgba(\${glowColor}, 0.04) 25%,\r
        rgba(\${glowColor}, 0.02) 40%,\r
        rgba(\${glowColor}, 0.01) 65%,\r
        transparent 70%\r
      );\r
      z-index: 200;\r
      opacity: 0;\r
      transform: translate(-50%, -50%);\r
      mix-blend-mode: screen;\r
    \`;\r
    document.body.appendChild(spotlight);\r
    spotlightRef.current = spotlight;\r
\r
    const handleMouseMove = (e: MouseEvent) => {\r
      if (!spotlightRef.current || !gridRef.current) return;\r
\r
      const section = gridRef.current.closest('.bento-section');\r
      const rect = section?.getBoundingClientRect();\r
      const mouseInside =\r
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;\r
\r
      isInsideSection.current = mouseInside || false;\r
      const cards = gridRef.current.querySelectorAll('.card');\r
\r
      if (!mouseInside) {\r
        gsap.to(spotlightRef.current, {\r
          opacity: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
        cards.forEach(card => {\r
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');\r
        });\r
        return;\r
      }\r
\r
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);\r
      let minDistance = Infinity;\r
\r
      cards.forEach(card => {\r
        const cardElement = card as HTMLElement;\r
        const cardRect = cardElement.getBoundingClientRect();\r
        const centerX = cardRect.left + cardRect.width / 2;\r
        const centerY = cardRect.top + cardRect.height / 2;\r
        const distance =\r
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;\r
        const effectiveDistance = Math.max(0, distance);\r
\r
        minDistance = Math.min(minDistance, effectiveDistance);\r
\r
        let glowIntensity = 0;\r
        if (effectiveDistance <= proximity) {\r
          glowIntensity = 1;\r
        } else if (effectiveDistance <= fadeDistance) {\r
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);\r
        }\r
\r
        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);\r
      });\r
\r
      gsap.to(spotlightRef.current, {\r
        left: e.clientX,\r
        top: e.clientY,\r
        duration: 0.1,\r
        ease: 'power2.out'\r
      });\r
\r
      const targetOpacity =\r
        minDistance <= proximity\r
          ? 0.8\r
          : minDistance <= fadeDistance\r
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8\r
            : 0;\r
\r
      gsap.to(spotlightRef.current, {\r
        opacity: targetOpacity,\r
        duration: targetOpacity > 0 ? 0.2 : 0.5,\r
        ease: 'power2.out'\r
      });\r
    };\r
\r
    const handleMouseLeave = () => {\r
      isInsideSection.current = false;\r
      gridRef.current?.querySelectorAll('.card').forEach(card => {\r
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');\r
      });\r
      if (spotlightRef.current) {\r
        gsap.to(spotlightRef.current, {\r
          opacity: 0,\r
          duration: 0.3,\r
          ease: 'power2.out'\r
        });\r
      }\r
    };\r
\r
    document.addEventListener('mousemove', handleMouseMove);\r
    document.addEventListener('mouseleave', handleMouseLeave);\r
\r
    return () => {\r
      document.removeEventListener('mousemove', handleMouseMove);\r
      document.removeEventListener('mouseleave', handleMouseLeave);\r
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);\r
    };\r
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);\r
\r
  return null;\r
};\r
\r
const BentoCardGrid: React.FC<{\r
  children: React.ReactNode;\r
  gridRef?: React.RefObject<HTMLDivElement | null>;\r
}> = ({ children, gridRef }) => (\r
  <div\r
    className="bento-section grid gap-2 p-3 max-w-[54rem] select-none relative"\r
    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}\r
    ref={gridRef}\r
  >\r
    {children}\r
  </div>\r
);\r
\r
const useMobileDetection = () => {\r
  const [isMobile, setIsMobile] = useState(false);\r
\r
  useEffect(() => {\r
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);\r
\r
    checkMobile();\r
    window.addEventListener('resize', checkMobile);\r
\r
    return () => window.removeEventListener('resize', checkMobile);\r
  }, []);\r
\r
  return isMobile;\r
};\r
\r
const MagicBento: React.FC<BentoProps> = ({\r
  textAutoHide = true,\r
  enableStars = true,\r
  enableSpotlight = true,\r
  enableBorderGlow = true,\r
  disableAnimations = false,\r
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,\r
  particleCount = DEFAULT_PARTICLE_COUNT,\r
  enableTilt = false,\r
  glowColor = DEFAULT_GLOW_COLOR,\r
  clickEffect = true,\r
  enableMagnetism = true\r
}) => {\r
  const gridRef = useRef<HTMLDivElement>(null);\r
  const isMobile = useMobileDetection();\r
  const shouldDisableAnimations = disableAnimations || isMobile;\r
\r
  return (\r
    <>\r
      <style>\r
        {\`\r
          .bento-section {\r
            --glow-x: 50%;\r
            --glow-y: 50%;\r
            --glow-intensity: 0;\r
            --glow-radius: 200px;\r
            --glow-color: \${glowColor};\r
            --border-color: #392e4e;\r
            --background-dark: #060010;\r
            --white: hsl(0, 0%, 100%);\r
            --purple-primary: rgba(132, 0, 255, 1);\r
            --purple-glow: rgba(132, 0, 255, 0.2);\r
            --purple-border: rgba(132, 0, 255, 0.8);\r
          }\r
          \r
          .card-responsive {\r
            grid-template-columns: 1fr;\r
            width: 90%;\r
            margin: 0 auto;\r
            padding: 0.5rem;\r
          }\r
          \r
          @media (min-width: 600px) {\r
            .card-responsive {\r
              grid-template-columns: repeat(2, 1fr);\r
            }\r
          }\r
          \r
          @media (min-width: 1024px) {\r
            .card-responsive {\r
              grid-template-columns: repeat(4, 1fr);\r
            }\r
            \r
            .card-responsive .card:nth-child(3) {\r
              grid-column: span 2;\r
              grid-row: span 2;\r
            }\r
            \r
            .card-responsive .card:nth-child(4) {\r
              grid-column: 1 / span 2;\r
              grid-row: 2 / span 2;\r
            }\r
            \r
            .card-responsive .card:nth-child(6) {\r
              grid-column: 4;\r
              grid-row: 3;\r
            }\r
          }\r
          \r
          .card--border-glow::after {\r
            content: '';\r
            position: absolute;\r
            inset: 0;\r
            padding: 6px;\r
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),\r
                rgba(\${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,\r
                rgba(\${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,\r
                transparent 60%);\r
            border-radius: inherit;\r
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\r
            mask-composite: subtract;\r
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\r
            -webkit-mask-composite: xor;\r
            pointer-events: none;\r
            transition: opacity 0.3s ease;\r
            z-index: 1;\r
          }\r
          \r
          .card--border-glow:hover::after {\r
            opacity: 1;\r
          }\r
          \r
          .card--border-glow:hover {\r
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(\${glowColor}, 0.2);\r
          }\r
          \r
          .particle::before {\r
            content: '';\r
            position: absolute;\r
            top: -2px;\r
            left: -2px;\r
            right: -2px;\r
            bottom: -2px;\r
            background: rgba(\${glowColor}, 0.2);\r
            border-radius: 50%;\r
            z-index: -1;\r
          }\r
          \r
          .particle-container:hover {\r
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(\${glowColor}, 0.2);\r
          }\r
          \r
          .text-clamp-1 {\r
            display: -webkit-box;\r
            -webkit-box-orient: vertical;\r
            -webkit-line-clamp: 1;\r
            line-clamp: 1;\r
            overflow: hidden;\r
            text-overflow: ellipsis;\r
          }\r
          \r
          .text-clamp-2 {\r
            display: -webkit-box;\r
            -webkit-box-orient: vertical;\r
            -webkit-line-clamp: 2;\r
            line-clamp: 2;\r
            overflow: hidden;\r
            text-overflow: ellipsis;\r
          }\r
          \r
          @media (max-width: 599px) {\r
            .card-responsive {\r
              grid-template-columns: 1fr;\r
              width: 90%;\r
              margin: 0 auto;\r
              padding: 0.5rem;\r
            }\r
            \r
            .card-responsive .card {\r
              width: 100%;\r
              min-height: 180px;\r
            }\r
          }\r
        \`}\r
      </style>\r
\r
      {enableSpotlight && (\r
        <GlobalSpotlight\r
          gridRef={gridRef}\r
          disableAnimations={shouldDisableAnimations}\r
          enabled={enableSpotlight}\r
          spotlightRadius={spotlightRadius}\r
          glowColor={glowColor}\r
        />\r
      )}\r
\r
      <BentoCardGrid gridRef={gridRef}>\r
        <div className="card-responsive grid gap-2">\r
          {cardData.map((card, index) => {\r
            const baseClassName = \`card flex flex-col justify-between relative aspect-[4/3] min-h-[200px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] \${\r
              enableBorderGlow ? 'card--border-glow' : ''\r
            }\`;\r
\r
            const cardStyle = {\r
              backgroundColor: card.color || 'var(--background-dark)',\r
              borderColor: 'var(--border-color)',\r
              color: 'var(--white)',\r
              '--glow-x': '50%',\r
              '--glow-y': '50%',\r
              '--glow-intensity': '0',\r
              '--glow-radius': '200px'\r
            } as React.CSSProperties;\r
\r
            if (enableStars) {\r
              return (\r
                <ParticleCard\r
                  key={index}\r
                  className={baseClassName}\r
                  style={cardStyle}\r
                  disableAnimations={shouldDisableAnimations}\r
                  particleCount={particleCount}\r
                  glowColor={glowColor}\r
                  enableTilt={enableTilt}\r
                  clickEffect={clickEffect}\r
                  enableMagnetism={enableMagnetism}\r
                >\r
                  <div className="card__header flex justify-between gap-3 relative text-white">\r
                    <span className="card__label text-base">{card.label}</span>\r
                  </div>\r
                  <div className="card__content flex flex-col relative text-white">\r
                    <h3 className={\`card__title font-normal text-base m-0 mb-1 \${textAutoHide ? 'text-clamp-1' : ''}\`}>\r
                      {card.title}\r
                    </h3>\r
                    <p\r
                      className={\`card__description text-xs leading-5 opacity-90 \${textAutoHide ? 'text-clamp-2' : ''}\`}\r
                    >\r
                      {card.description}\r
                    </p>\r
                  </div>\r
                </ParticleCard>\r
              );\r
            }\r
\r
            return (\r
              <div\r
                key={index}\r
                className={baseClassName}\r
                style={cardStyle}\r
                ref={el => {\r
                  if (!el) return;\r
\r
                  const handleMouseMove = (e: MouseEvent) => {\r
                    if (shouldDisableAnimations) return;\r
\r
                    const rect = el.getBoundingClientRect();\r
                    const x = e.clientX - rect.left;\r
                    const y = e.clientY - rect.top;\r
                    const centerX = rect.width / 2;\r
                    const centerY = rect.height / 2;\r
\r
                    if (enableTilt) {\r
                      const rotateX = ((y - centerY) / centerY) * -10;\r
                      const rotateY = ((x - centerX) / centerX) * 10;\r
\r
                      gsap.to(el, {\r
                        rotateX,\r
                        rotateY,\r
                        duration: 0.1,\r
                        ease: 'power2.out',\r
                        transformPerspective: 1000\r
                      });\r
                    }\r
\r
                    if (enableMagnetism) {\r
                      const magnetX = (x - centerX) * 0.05;\r
                      const magnetY = (y - centerY) * 0.05;\r
\r
                      gsap.to(el, {\r
                        x: magnetX,\r
                        y: magnetY,\r
                        duration: 0.3,\r
                        ease: 'power2.out'\r
                      });\r
                    }\r
                  };\r
\r
                  const handleMouseLeave = () => {\r
                    if (shouldDisableAnimations) return;\r
\r
                    if (enableTilt) {\r
                      gsap.to(el, {\r
                        rotateX: 0,\r
                        rotateY: 0,\r
                        duration: 0.3,\r
                        ease: 'power2.out'\r
                      });\r
                    }\r
\r
                    if (enableMagnetism) {\r
                      gsap.to(el, {\r
                        x: 0,\r
                        y: 0,\r
                        duration: 0.3,\r
                        ease: 'power2.out'\r
                      });\r
                    }\r
                  };\r
\r
                  const handleClick = (e: MouseEvent) => {\r
                    if (!clickEffect || shouldDisableAnimations) return;\r
\r
                    const rect = el.getBoundingClientRect();\r
                    const x = e.clientX - rect.left;\r
                    const y = e.clientY - rect.top;\r
\r
                    const maxDistance = Math.max(\r
                      Math.hypot(x, y),\r
                      Math.hypot(x - rect.width, y),\r
                      Math.hypot(x, y - rect.height),\r
                      Math.hypot(x - rect.width, y - rect.height)\r
                    );\r
\r
                    const ripple = document.createElement('div');\r
                    ripple.style.cssText = \`\r
                      position: absolute;\r
                      width: \${maxDistance * 2}px;\r
                      height: \${maxDistance * 2}px;\r
                      border-radius: 50%;\r
                      background: radial-gradient(circle, rgba(\${glowColor}, 0.4) 0%, rgba(\${glowColor}, 0.2) 30%, transparent 70%);\r
                      left: \${x - maxDistance}px;\r
                      top: \${y - maxDistance}px;\r
                      pointer-events: none;\r
                      z-index: 1000;\r
                    \`;\r
\r
                    el.appendChild(ripple);\r
\r
                    gsap.fromTo(\r
                      ripple,\r
                      {\r
                        scale: 0,\r
                        opacity: 1\r
                      },\r
                      {\r
                        scale: 1,\r
                        opacity: 0,\r
                        duration: 0.8,\r
                        ease: 'power2.out',\r
                        onComplete: () => ripple.remove()\r
                      }\r
                    );\r
                  };\r
\r
                  el.addEventListener('mousemove', handleMouseMove);\r
                  el.addEventListener('mouseleave', handleMouseLeave);\r
                  el.addEventListener('click', handleClick);\r
                }}\r
              >\r
                <div className="card__header flex justify-between gap-3 relative text-white">\r
                  <span className="card__label text-base">{card.label}</span>\r
                </div>\r
                <div className="card__content flex flex-col relative text-white">\r
                  <h3 className={\`card__title font-normal text-base m-0 mb-1 \${textAutoHide ? 'text-clamp-1' : ''}\`}>\r
                    {card.title}\r
                  </h3>\r
                  <p className={\`card__description text-xs leading-5 opacity-90 \${textAutoHide ? 'text-clamp-2' : ''}\`}>\r
                    {card.description}\r
                  </p>\r
                </div>\r
              </div>\r
            );\r
          })}\r
        </div>\r
      </BentoCardGrid>\r
    </>\r
  );\r
};\r
\r
export default MagicBento;\r
`,Z={dependencies:"gsap",usage:`import MagicBento from './MagicBento'

<MagicBento 
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/>`,code:q,css:K,tailwind:V,tsCode:J,tsTailwind:Q},I=12,N=300,X="132, 0, 255",ee=768,re=[{color:"#060010",title:"Analytics",description:"Track user behavior",label:"Insights"},{color:"#060010",title:"Dashboard",description:"Centralized data view",label:"Overview"},{color:"#060010",title:"Collaboration",description:"Work together seamlessly",label:"Teamwork"},{color:"#060010",title:"Automation",description:"Streamline workflows",label:"Efficiency"},{color:"#060010",title:"Integration",description:"Connect favorite tools",label:"Connectivity"},{color:"#060010",title:"Security",description:"Enterprise-grade protection",label:"Protection"}],ne=(r,m,c=X)=>{const C=document.createElement("div");return C.className="particle",C.style.cssText=`
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${c}, 1);
    box-shadow: 0 0 6px rgba(${c}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${r}px;
    top: ${m}px;
  `,C},te=r=>({proximity:r*.5,fadeDistance:r*.75}),oe=(r,m,c,C,g)=>{const a=r.getBoundingClientRect(),M=(m-a.left)/a.width*100,E=(c-a.top)/a.height*100;r.style.setProperty("--glow-x",`${M}%`),r.style.setProperty("--glow-y",`${E}%`),r.style.setProperty("--glow-intensity",C.toString()),r.style.setProperty("--glow-radius",`${g}px`)},ae=({children:r,className:m="",disableAnimations:c=!1,style:C,particleCount:g=I,glowColor:a=X,enableTilt:M=!0,clickEffect:E=!1,enableMagnetism:f=!1})=>{const h=i.useRef(null),t=i.useRef([]),d=i.useRef([]),b=i.useRef(!1),D=i.useRef([]),v=i.useRef(!1),_=i.useRef(null),P=i.useCallback(()=>{if(v.current||!h.current)return;const{width:n,height:L}=h.current.getBoundingClientRect();D.current=Array.from({length:g},()=>ne(Math.random()*n,Math.random()*L,a)),v.current=!0},[g,a]),T=i.useCallback(()=>{var n;d.current.forEach(clearTimeout),d.current=[],(n=_.current)==null||n.kill(),t.current.forEach(L=>{s.to(L,{scale:0,opacity:0,duration:.3,ease:"back.in(1.7)",onComplete:()=>{var x;(x=L.parentNode)==null||x.removeChild(L)}})}),t.current=[]},[]),u=i.useCallback(()=>{!h.current||!b.current||(v.current||P(),D.current.forEach((n,L)=>{const x=setTimeout(()=>{if(!b.current||!h.current)return;const w=n.cloneNode(!0);h.current.appendChild(w),t.current.push(w),s.fromTo(w,{scale:0,opacity:0},{scale:1,opacity:1,duration:.3,ease:"back.out(1.7)"}),s.to(w,{x:(Math.random()-.5)*100,y:(Math.random()-.5)*100,rotation:Math.random()*360,duration:2+Math.random()*2,ease:"none",repeat:-1,yoyo:!0}),s.to(w,{opacity:.3,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0})},L*100);d.current.push(x)}))},[P]);return i.useEffect(()=>{if(c||!h.current)return;const n=h.current,L=()=>{b.current=!0,u(),M&&s.to(n,{rotateX:5,rotateY:5,duration:.3,ease:"power2.out",transformPerspective:1e3})},x=()=>{b.current=!1,T(),M&&s.to(n,{rotateX:0,rotateY:0,duration:.3,ease:"power2.out"}),f&&s.to(n,{x:0,y:0,duration:.3,ease:"power2.out"})},w=R=>{if(!M&&!f)return;const o=n.getBoundingClientRect(),l=R.clientX-o.left,p=R.clientY-o.top,k=o.width/2,A=o.height/2;if(M){const S=(p-A)/A*-10,$=(l-k)/k*10;s.to(n,{rotateX:S,rotateY:$,duration:.1,ease:"power2.out",transformPerspective:1e3})}if(f){const S=(l-k)*.05,$=(p-A)*.05;_.current=s.to(n,{x:S,y:$,duration:.3,ease:"power2.out"})}},y=R=>{if(!E)return;const o=n.getBoundingClientRect(),l=R.clientX-o.left,p=R.clientY-o.top,k=Math.max(Math.hypot(l,p),Math.hypot(l-o.width,p),Math.hypot(l,p-o.height),Math.hypot(l-o.width,p-o.height)),A=document.createElement("div");A.style.cssText=`
        position: absolute;
        width: ${k*2}px;
        height: ${k*2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${a}, 0.4) 0%, rgba(${a}, 0.2) 30%, transparent 70%);
        left: ${l-k}px;
        top: ${p-k}px;
        pointer-events: none;
        z-index: 1000;
      `,n.appendChild(A),s.fromTo(A,{scale:0,opacity:1},{scale:1,opacity:0,duration:.8,ease:"power2.out",onComplete:()=>A.remove()})};return n.addEventListener("mouseenter",L),n.addEventListener("mouseleave",x),n.addEventListener("mousemove",w),n.addEventListener("click",y),()=>{b.current=!1,n.removeEventListener("mouseenter",L),n.removeEventListener("mouseleave",x),n.removeEventListener("mousemove",w),n.removeEventListener("click",y),T()}},[u,T,c,M,f,E,a]),e.jsx("div",{ref:h,className:`${m} particle-container`,style:{...C,position:"relative",overflow:"hidden"},children:r})},ie=({gridRef:r,disableAnimations:m=!1,enabled:c=!0,spotlightRadius:C=N,glowColor:g=X})=>{const a=i.useRef(null),M=i.useRef(!1);return i.useEffect(()=>{if(m||!(r!=null&&r.current)||!c)return;const E=document.createElement("div");E.className="global-spotlight",E.style.cssText=`
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${g}, 0.15) 0%,
        rgba(${g}, 0.08) 15%,
        rgba(${g}, 0.04) 25%,
        rgba(${g}, 0.02) 40%,
        rgba(${g}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `,document.body.appendChild(E),a.current=E;const f=t=>{if(!a.current||!r.current)return;const d=r.current.closest(".bento-section"),b=d==null?void 0:d.getBoundingClientRect(),D=b&&t.clientX>=b.left&&t.clientX<=b.right&&t.clientY>=b.top&&t.clientY<=b.bottom;M.current=D||!1;const v=r.current.querySelectorAll(".magic-bento-card");if(!D){s.to(a.current,{opacity:0,duration:.3,ease:"power2.out"}),v.forEach(n=>{n.style.setProperty("--glow-intensity","0")});return}const{proximity:_,fadeDistance:P}=te(C);let T=1/0;v.forEach(n=>{const L=n,x=L.getBoundingClientRect(),w=x.left+x.width/2,y=x.top+x.height/2,R=Math.hypot(t.clientX-w,t.clientY-y)-Math.max(x.width,x.height)/2,o=Math.max(0,R);T=Math.min(T,o);let l=0;o<=_?l=1:o<=P&&(l=(P-o)/(P-_)),oe(L,t.clientX,t.clientY,l,C)}),s.to(a.current,{left:t.clientX,top:t.clientY,duration:.1,ease:"power2.out"});const u=T<=_?.8:T<=P?(P-T)/(P-_)*.8:0;s.to(a.current,{opacity:u,duration:u>0?.2:.5,ease:"power2.out"})},h=()=>{var t;M.current=!1,(t=r.current)==null||t.querySelectorAll(".magic-bento-card").forEach(d=>{d.style.setProperty("--glow-intensity","0")}),a.current&&s.to(a.current,{opacity:0,duration:.3,ease:"power2.out"})};return document.addEventListener("mousemove",f),document.addEventListener("mouseleave",h),()=>{var t,d;document.removeEventListener("mousemove",f),document.removeEventListener("mouseleave",h),(d=(t=a.current)==null?void 0:t.parentNode)==null||d.removeChild(a.current)}},[r,m,c,C,g]),null},le=({children:r,gridRef:m})=>e.jsx("div",{className:"card-grid bento-section",ref:m,children:r}),ce=()=>{const[r,m]=i.useState(!1);return i.useEffect(()=>{const c=()=>m(window.innerWidth<=ee);return c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]),r},se=({textAutoHide:r=!0,enableStars:m=!0,enableSpotlight:c=!0,enableBorderGlow:C=!0,disableAnimations:g=!1,spotlightRadius:a=N,particleCount:M=I,enableTilt:E=!1,glowColor:f=X,clickEffect:h=!0,enableMagnetism:t=!0})=>{const d=i.useRef(null),b=ce(),D=g||b;return e.jsxs(e.Fragment,{children:[c&&e.jsx(ie,{gridRef:d,disableAnimations:D,enabled:c,spotlightRadius:a,glowColor:f}),e.jsx(le,{gridRef:d,children:re.map((v,_)=>{const T={className:`magic-bento-card ${r?"magic-bento-card--text-autohide":""} ${C?"magic-bento-card--border-glow":""}`,style:{backgroundColor:v.color,"--glow-color":f}};return m?e.jsxs(ae,{...T,disableAnimations:D,particleCount:M,glowColor:f,enableTilt:E,clickEffect:h,enableMagnetism:t,children:[e.jsx("div",{className:"magic-bento-card__header",children:e.jsx("div",{className:"magic-bento-card__label",children:v.label})}),e.jsxs("div",{className:"magic-bento-card__content",children:[e.jsx("h2",{className:"magic-bento-card__title",children:v.title}),e.jsx("p",{className:"magic-bento-card__description",children:v.description})]})]},_):e.jsxs("div",{...T,ref:u=>{if(!u)return;const n=w=>{if(D)return;const y=u.getBoundingClientRect(),R=w.clientX-y.left,o=w.clientY-y.top,l=y.width/2,p=y.height/2;if(E){const k=(o-p)/p*-10,A=(R-l)/l*10;s.to(u,{rotateX:k,rotateY:A,duration:.1,ease:"power2.out",transformPerspective:1e3})}if(t){const k=(R-l)*.05,A=(o-p)*.05;s.to(u,{x:k,y:A,duration:.3,ease:"power2.out"})}},L=()=>{D||(E&&s.to(u,{rotateX:0,rotateY:0,duration:.3,ease:"power2.out"}),t&&s.to(u,{x:0,y:0,duration:.3,ease:"power2.out"}))},x=w=>{if(!h||D)return;const y=u.getBoundingClientRect(),R=w.clientX-y.left,o=w.clientY-y.top,l=Math.max(Math.hypot(R,o),Math.hypot(R-y.width,o),Math.hypot(R,o-y.height),Math.hypot(R-y.width,o-y.height)),p=document.createElement("div");p.style.cssText=`
                    position: absolute;
                    width: ${l*2}px;
                    height: ${l*2}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(${f}, 0.4) 0%, rgba(${f}, 0.2) 30%, transparent 70%);
                    left: ${R-l}px;
                    top: ${o-l}px;
                    pointer-events: none;
                    z-index: 1000;
                  `,u.appendChild(p),s.fromTo(p,{scale:0,opacity:1},{scale:1,opacity:0,duration:.8,ease:"power2.out",onComplete:()=>p.remove()})};u.addEventListener("mousemove",n),u.addEventListener("mouseleave",L),u.addEventListener("click",x)},children:[e.jsx("div",{className:"magic-bento-card__header",children:e.jsx("div",{className:"magic-bento-card__label",children:v.label})}),e.jsxs("div",{className:"magic-bento-card__content",children:[e.jsx("h2",{className:"magic-bento-card__title",children:v.title}),e.jsx("p",{className:"magic-bento-card__description",children:v.description})]})]},_)})})]})},be=()=>{const[r,m]=i.useState(!0),[c,C]=i.useState(!0),[g,a]=i.useState(!1),[M,E]=i.useState(400),[f,h]=i.useState(!1),[t,d]=i.useState(!0),[b,D]=i.useState(!1),v=[{name:"textAutoHide",type:"boolean",default:"true",description:"Whether text content should auto-hide on hover"},{name:"enableStars",type:"boolean",default:"true",description:"Enable particle star animation effect"},{name:"enableSpotlight",type:"boolean",default:"true",description:"Enable spotlight cursor following effect"},{name:"enableBorderGlow",type:"boolean",default:"true",description:"Enable border glow effect that follows cursor"},{name:"disableAnimations",type:"boolean",default:"false",description:"Disable all animations (automatically enabled on mobile)"},{name:"spotlightRadius",type:"number",default:"300",description:"Radius of the spotlight effect in pixels"},{name:"particleCount",type:"number",default:"12",description:"Number of particles in the star animation"},{name:"enableTilt",type:"boolean",default:"false",description:"Enable 3D tilt effect on card hover"},{name:"glowColor",type:"string",default:'"132, 0, 255"',description:"RGB color values for glow effects (without rgba wrapper)"},{name:"clickEffect",type:"boolean",default:"true",description:"Enable ripple effect on card click"},{name:"enableMagnetism",type:"boolean",default:"true",description:"Enable subtle card attraction to cursor"}];return e.jsxs(B,{children:[e.jsxs(z,{children:[e.jsx(O,{position:"relative",py:8,className:"demo-container",h:"auto",overflow:"hidden",children:e.jsx(se,{enableStars:r,enableSpotlight:c,disableAnimations:g,spotlightRadius:M,enableTilt:f,clickEffect:t,enableMagnetism:b})}),e.jsxs(F,{children:[e.jsx(j,{title:"Spotlight Radius",min:50,max:800,step:10,value:M,onChange:E}),e.jsx(Y,{title:"Stars Effect",isChecked:r,onChange:m}),e.jsx(Y,{title:"Spotlight Effect",isChecked:c,onChange:C}),e.jsx(Y,{title:"Tilt Effect",isChecked:f,onChange:h}),e.jsx(Y,{title:"Click Effect",isChecked:t,onChange:d}),e.jsx(Y,{title:"Magnetism",isChecked:b,onChange:D}),e.jsx(Y,{title:"Disable All Animations",isChecked:g,onChange:a})]}),e.jsx(H,{data:v}),e.jsx(W,{dependencyList:["gsap"]})]}),e.jsx(G,{children:e.jsx(U,{codeObject:Z})})]})};export{be as default};
