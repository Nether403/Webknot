import{r as o,bh as u,bx as n,j as e,q as m,B as z}from"./index-wsKSLPNH.js";import{T as B,P as G,a as K,C as Z,b as D}from"./PropTable-C4uPWs8h.js";import{P as X}from"./PreviewSwitch-DqnF708j.js";import{C as q}from"./Customize-1m_ZNqR9.js";import{P as W}from"./PreviewSlider-m1G_aiYP.js";import{D as U}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";const T={damping:30,stiffness:100,mass:2};function I({imageSrc:a,altText:g="Tilted card image",captionText:s="",containerHeight:f="300px",containerWidth:l="100%",imageHeight:c="300px",imageWidth:i="300px",scaleOnHover:h=1.1,rotateAmplitude:d=14,showMobileWarning:r=!0,showTooltip:N=!0,overlayContent:Y=null,displayOverlayContent:V=!1}){const y=o.useRef(null),S=u(),H=u(),x=n(u(0),T),v=n(u(0),T),M=n(1,T),b=n(0),C=n(0,{stiffness:350,damping:30,mass:1}),[L,R]=o.useState(0);function O(p){if(!y.current)return;const t=y.current.getBoundingClientRect(),A=p.clientX-t.left-t.width/2,w=p.clientY-t.top-t.height/2,E=w/(t.height/2)*-d,P=A/(t.width/2)*d;x.set(E),v.set(P),S.set(p.clientX-t.left),H.set(p.clientY-t.top);const F=w-L;C.set(-F*.6),R(w)}function j(){M.set(h),b.set(1)}function k(){b.set(0),M.set(1),x.set(0),v.set(0),C.set(0)}return e.jsxs("figure",{ref:y,className:"tilted-card-figure",style:{height:f,width:l},onMouseMove:O,onMouseEnter:j,onMouseLeave:k,children:[r&&e.jsx("div",{className:"tilted-card-mobile-alert",children:"This effect is not optimized for mobile. Check on desktop."}),e.jsxs(m.div,{className:"tilted-card-inner",style:{width:i,height:c,rotateX:x,rotateY:v,scale:M},children:[e.jsx(m.img,{src:a,alt:g,className:"tilted-card-img",style:{width:i,height:c}}),V&&Y&&e.jsx(m.div,{className:"tilted-card-overlay",children:Y})]}),N&&e.jsx(m.figcaption,{className:"tilted-card-caption",style:{x:S,y:H,opacity:b,rotate:C},children:s})]})}const J=`import { useRef, useState } from 'react';\r
import { motion, useMotionValue, useSpring } from 'motion/react';\r
import './TiltedCard.css';\r
\r
const springValues = {\r
  damping: 30,\r
  stiffness: 100,\r
  mass: 2\r
};\r
\r
export default function TiltedCard({\r
  imageSrc,\r
  altText = 'Tilted card image',\r
  captionText = '',\r
  containerHeight = '300px',\r
  containerWidth = '100%',\r
  imageHeight = '300px',\r
  imageWidth = '300px',\r
  scaleOnHover = 1.1,\r
  rotateAmplitude = 14,\r
  showMobileWarning = true,\r
  showTooltip = true,\r
  overlayContent = null,\r
  displayOverlayContent = false\r
}) {\r
  const ref = useRef(null);\r
\r
  const x = useMotionValue();\r
  const y = useMotionValue();\r
  const rotateX = useSpring(useMotionValue(0), springValues);\r
  const rotateY = useSpring(useMotionValue(0), springValues);\r
  const scale = useSpring(1, springValues);\r
  const opacity = useSpring(0);\r
  const rotateFigcaption = useSpring(0, {\r
    stiffness: 350,\r
    damping: 30,\r
    mass: 1\r
  });\r
\r
  const [lastY, setLastY] = useState(0);\r
\r
  function handleMouse(e) {\r
    if (!ref.current) return;\r
\r
    const rect = ref.current.getBoundingClientRect();\r
    const offsetX = e.clientX - rect.left - rect.width / 2;\r
    const offsetY = e.clientY - rect.top - rect.height / 2;\r
\r
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;\r
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;\r
\r
    rotateX.set(rotationX);\r
    rotateY.set(rotationY);\r
\r
    x.set(e.clientX - rect.left);\r
    y.set(e.clientY - rect.top);\r
\r
    const velocityY = offsetY - lastY;\r
    rotateFigcaption.set(-velocityY * 0.6);\r
    setLastY(offsetY);\r
  }\r
\r
  function handleMouseEnter() {\r
    scale.set(scaleOnHover);\r
    opacity.set(1);\r
  }\r
\r
  function handleMouseLeave() {\r
    opacity.set(0);\r
    scale.set(1);\r
    rotateX.set(0);\r
    rotateY.set(0);\r
    rotateFigcaption.set(0);\r
  }\r
\r
  return (\r
    <figure\r
      ref={ref}\r
      className="tilted-card-figure"\r
      style={{\r
        height: containerHeight,\r
        width: containerWidth\r
      }}\r
      onMouseMove={handleMouse}\r
      onMouseEnter={handleMouseEnter}\r
      onMouseLeave={handleMouseLeave}\r
    >\r
      {showMobileWarning && (\r
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>\r
      )}\r
\r
      <motion.div\r
        className="tilted-card-inner"\r
        style={{\r
          width: imageWidth,\r
          height: imageHeight,\r
          rotateX,\r
          rotateY,\r
          scale\r
        }}\r
      >\r
        <motion.img\r
          src={imageSrc}\r
          alt={altText}\r
          className="tilted-card-img"\r
          style={{\r
            width: imageWidth,\r
            height: imageHeight\r
          }}\r
        />\r
\r
        {displayOverlayContent && overlayContent && (\r
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>\r
        )}\r
      </motion.div>\r
\r
      {showTooltip && (\r
        <motion.figcaption\r
          className="tilted-card-caption"\r
          style={{\r
            x,\r
            y,\r
            opacity,\r
            rotate: rotateFigcaption\r
          }}\r
        >\r
          {captionText}\r
        </motion.figcaption>\r
      )}\r
    </figure>\r
  );\r
}\r
`,Q=`.tilted-card-figure {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  perspective: 800px;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.tilted-card-mobile-alert {\r
  position: absolute;\r
  top: 1rem;\r
  text-align: center;\r
  font-size: 0.875rem;\r
  display: none;\r
}\r
\r
@media (max-width: 640px) {\r
  .tilted-card-mobile-alert {\r
    display: block;\r
  }\r
  .tilted-card-caption {\r
    display: none;\r
  }\r
}\r
\r
.tilted-card-inner {\r
  position: relative;\r
  transform-style: preserve-3d;\r
}\r
\r
.tilted-card-img {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  object-fit: cover;\r
  border-radius: 15px;\r
  will-change: transform;\r
  transform: translateZ(0);\r
}\r
\r
.tilted-card-overlay {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  z-index: 2;\r
  will-change: transform;\r
  transform: translateZ(30px);\r
}\r
\r
.tilted-card-caption {\r
  pointer-events: none;\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  border-radius: 4px;\r
  background-color: #fff;\r
  padding: 4px 10px;\r
  font-size: 10px;\r
  color: #2d2d2d;\r
  opacity: 0;\r
  z-index: 3;\r
}\r
`,_=`import { useRef, useState } from 'react';\r
import { motion, useMotionValue, useSpring } from 'motion/react';\r
\r
const springValues = {\r
  damping: 30,\r
  stiffness: 100,\r
  mass: 2\r
};\r
\r
export default function TiltedCard({\r
  imageSrc,\r
  altText = 'Tilted card image',\r
  captionText = '',\r
  containerHeight = '300px',\r
  containerWidth = '100%',\r
  imageHeight = '300px',\r
  imageWidth = '300px',\r
  scaleOnHover = 1.1,\r
  rotateAmplitude = 14,\r
  showMobileWarning = true,\r
  showTooltip = true,\r
  overlayContent = null,\r
  displayOverlayContent = false\r
}) {\r
  const ref = useRef(null);\r
  const x = useMotionValue(0);\r
  const y = useMotionValue(0);\r
  const rotateX = useSpring(useMotionValue(0), springValues);\r
  const rotateY = useSpring(useMotionValue(0), springValues);\r
  const scale = useSpring(1, springValues);\r
  const opacity = useSpring(0);\r
  const rotateFigcaption = useSpring(0, {\r
    stiffness: 350,\r
    damping: 30,\r
    mass: 1\r
  });\r
\r
  const [lastY, setLastY] = useState(0);\r
\r
  function handleMouse(e) {\r
    if (!ref.current) return;\r
\r
    const rect = ref.current.getBoundingClientRect();\r
    const offsetX = e.clientX - rect.left - rect.width / 2;\r
    const offsetY = e.clientY - rect.top - rect.height / 2;\r
\r
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;\r
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;\r
\r
    rotateX.set(rotationX);\r
    rotateY.set(rotationY);\r
\r
    x.set(e.clientX - rect.left);\r
    y.set(e.clientY - rect.top);\r
\r
    const velocityY = offsetY - lastY;\r
    rotateFigcaption.set(-velocityY * 0.6);\r
    setLastY(offsetY);\r
  }\r
\r
  function handleMouseEnter() {\r
    scale.set(scaleOnHover);\r
    opacity.set(1);\r
  }\r
\r
  function handleMouseLeave() {\r
    opacity.set(0);\r
    scale.set(1);\r
    rotateX.set(0);\r
    rotateY.set(0);\r
    rotateFigcaption.set(0);\r
  }\r
\r
  return (\r
    <figure\r
      ref={ref}\r
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"\r
      style={{\r
        height: containerHeight,\r
        width: containerWidth\r
      }}\r
      onMouseMove={handleMouse}\r
      onMouseEnter={handleMouseEnter}\r
      onMouseLeave={handleMouseLeave}\r
    >\r
      {showMobileWarning && (\r
        <div className="absolute top-4 text-center text-sm block sm:hidden">\r
          This effect is not optimized for mobile. Check on desktop.\r
        </div>\r
      )}\r
\r
      <motion.div\r
        className="relative [transform-style:preserve-3d]"\r
        style={{\r
          width: imageWidth,\r
          height: imageHeight,\r
          rotateX,\r
          rotateY,\r
          scale\r
        }}\r
      >\r
        <motion.img\r
          src={imageSrc}\r
          alt={altText}\r
          className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"\r
          style={{\r
            width: imageWidth,\r
            height: imageHeight\r
          }}\r
        />\r
\r
        {displayOverlayContent && overlayContent && (\r
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">\r
            {overlayContent}\r
          </motion.div>\r
        )}\r
      </motion.div>\r
\r
      {showTooltip && (\r
        <motion.figcaption\r
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"\r
          style={{\r
            x,\r
            y,\r
            opacity,\r
            rotate: rotateFigcaption\r
          }}\r
        >\r
          {captionText}\r
        </motion.figcaption>\r
      )}\r
    </figure>\r
  );\r
}\r
`,$=`import type { SpringOptions } from 'motion/react';\r
import { useRef, useState } from 'react';\r
import { motion, useMotionValue, useSpring } from 'motion/react';\r
import './TiltedCard.css';\r
\r
interface TiltedCardProps {\r
  imageSrc: React.ComponentProps<'img'>['src'];\r
  altText?: string;\r
  captionText?: string;\r
  containerHeight?: React.CSSProperties['height'];\r
  containerWidth?: React.CSSProperties['width'];\r
  imageHeight?: React.CSSProperties['height'];\r
  imageWidth?: React.CSSProperties['width'];\r
  scaleOnHover?: number;\r
  rotateAmplitude?: number;\r
  showMobileWarning?: boolean;\r
  showTooltip?: boolean;\r
  overlayContent?: React.ReactNode;\r
  displayOverlayContent?: boolean;\r
}\r
\r
const springValues: SpringOptions = {\r
  damping: 30,\r
  stiffness: 100,\r
  mass: 2\r
};\r
\r
export default function TiltedCard({\r
  imageSrc,\r
  altText = 'Tilted card image',\r
  captionText = '',\r
  containerHeight = '300px',\r
  containerWidth = '100%',\r
  imageHeight = '300px',\r
  imageWidth = '300px',\r
  scaleOnHover = 1.1,\r
  rotateAmplitude = 14,\r
  showMobileWarning = true,\r
  showTooltip = true,\r
  overlayContent = null,\r
  displayOverlayContent = false\r
}: TiltedCardProps) {\r
  const ref = useRef<HTMLElement>(null);\r
\r
  const x = useMotionValue(0);\r
  const y = useMotionValue(0);\r
  const rotateX = useSpring(useMotionValue(0), springValues);\r
  const rotateY = useSpring(useMotionValue(0), springValues);\r
  const scale = useSpring(1, springValues);\r
  const opacity = useSpring(0);\r
  const rotateFigcaption = useSpring(0, {\r
    stiffness: 350,\r
    damping: 30,\r
    mass: 1\r
  });\r
\r
  const [lastY, setLastY] = useState<number>(0);\r
\r
  function handleMouse(e: React.MouseEvent<HTMLElement>) {\r
    if (!ref.current) return;\r
\r
    const rect = ref.current.getBoundingClientRect();\r
    const offsetX = e.clientX - rect.left - rect.width / 2;\r
    const offsetY = e.clientY - rect.top - rect.height / 2;\r
\r
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;\r
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;\r
\r
    rotateX.set(rotationX);\r
    rotateY.set(rotationY);\r
\r
    x.set(e.clientX - rect.left);\r
    y.set(e.clientY - rect.top);\r
\r
    const velocityY = offsetY - lastY;\r
    rotateFigcaption.set(-velocityY * 0.6);\r
    setLastY(offsetY);\r
  }\r
\r
  function handleMouseEnter() {\r
    scale.set(scaleOnHover);\r
    opacity.set(1);\r
  }\r
\r
  function handleMouseLeave() {\r
    opacity.set(0);\r
    scale.set(1);\r
    rotateX.set(0);\r
    rotateY.set(0);\r
    rotateFigcaption.set(0);\r
  }\r
\r
  return (\r
    <figure\r
      ref={ref}\r
      className="tilted-card-figure"\r
      style={{\r
        height: containerHeight,\r
        width: containerWidth\r
      }}\r
      onMouseMove={handleMouse}\r
      onMouseEnter={handleMouseEnter}\r
      onMouseLeave={handleMouseLeave}\r
    >\r
      {showMobileWarning && (\r
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>\r
      )}\r
\r
      <motion.div\r
        className="tilted-card-inner"\r
        style={{\r
          width: imageWidth,\r
          height: imageHeight,\r
          rotateX,\r
          rotateY,\r
          scale\r
        }}\r
      >\r
        <motion.img\r
          src={imageSrc}\r
          alt={altText}\r
          className="tilted-card-img"\r
          style={{\r
            width: imageWidth,\r
            height: imageHeight\r
          }}\r
        />\r
\r
        {displayOverlayContent && overlayContent && (\r
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>\r
        )}\r
      </motion.div>\r
\r
      {showTooltip && (\r
        <motion.figcaption\r
          className="tilted-card-caption"\r
          style={{\r
            x,\r
            y,\r
            opacity,\r
            rotate: rotateFigcaption\r
          }}\r
        >\r
          {captionText}\r
        </motion.figcaption>\r
      )}\r
    </figure>\r
  );\r
}\r
`,ee=`import type { SpringOptions } from 'motion/react';\r
import { useRef, useState } from 'react';\r
import { motion, useMotionValue, useSpring } from 'motion/react';\r
\r
interface TiltedCardProps {\r
  imageSrc: React.ComponentProps<'img'>['src'];\r
  altText?: string;\r
  captionText?: string;\r
  containerHeight?: React.CSSProperties['height'];\r
  containerWidth?: React.CSSProperties['width'];\r
  imageHeight?: React.CSSProperties['height'];\r
  imageWidth?: React.CSSProperties['width'];\r
  scaleOnHover?: number;\r
  rotateAmplitude?: number;\r
  showMobileWarning?: boolean;\r
  showTooltip?: boolean;\r
  overlayContent?: React.ReactNode;\r
  displayOverlayContent?: boolean;\r
}\r
\r
const springValues: SpringOptions = {\r
  damping: 30,\r
  stiffness: 100,\r
  mass: 2\r
};\r
\r
export default function TiltedCard({\r
  imageSrc,\r
  altText = 'Tilted card image',\r
  captionText = '',\r
  containerHeight = '300px',\r
  containerWidth = '100%',\r
  imageHeight = '300px',\r
  imageWidth = '300px',\r
  scaleOnHover = 1.1,\r
  rotateAmplitude = 14,\r
  showMobileWarning = true,\r
  showTooltip = true,\r
  overlayContent = null,\r
  displayOverlayContent = false\r
}: TiltedCardProps) {\r
  const ref = useRef<HTMLElement>(null);\r
  const x = useMotionValue(0);\r
  const y = useMotionValue(0);\r
  const rotateX = useSpring(useMotionValue(0), springValues);\r
  const rotateY = useSpring(useMotionValue(0), springValues);\r
  const scale = useSpring(1, springValues);\r
  const opacity = useSpring(0);\r
  const rotateFigcaption = useSpring(0, {\r
    stiffness: 350,\r
    damping: 30,\r
    mass: 1\r
  });\r
\r
  const [lastY, setLastY] = useState(0);\r
\r
  function handleMouse(e: React.MouseEvent<HTMLElement>) {\r
    if (!ref.current) return;\r
\r
    const rect = ref.current.getBoundingClientRect();\r
    const offsetX = e.clientX - rect.left - rect.width / 2;\r
    const offsetY = e.clientY - rect.top - rect.height / 2;\r
\r
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;\r
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;\r
\r
    rotateX.set(rotationX);\r
    rotateY.set(rotationY);\r
\r
    x.set(e.clientX - rect.left);\r
    y.set(e.clientY - rect.top);\r
\r
    const velocityY = offsetY - lastY;\r
    rotateFigcaption.set(-velocityY * 0.6);\r
    setLastY(offsetY);\r
  }\r
\r
  function handleMouseEnter() {\r
    scale.set(scaleOnHover);\r
    opacity.set(1);\r
  }\r
\r
  function handleMouseLeave() {\r
    opacity.set(0);\r
    scale.set(1);\r
    rotateX.set(0);\r
    rotateY.set(0);\r
    rotateFigcaption.set(0);\r
  }\r
\r
  return (\r
    <figure\r
      ref={ref}\r
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"\r
      style={{\r
        height: containerHeight,\r
        width: containerWidth\r
      }}\r
      onMouseMove={handleMouse}\r
      onMouseEnter={handleMouseEnter}\r
      onMouseLeave={handleMouseLeave}\r
    >\r
      {showMobileWarning && (\r
        <div className="absolute top-4 text-center text-sm block sm:hidden">\r
          This effect is not optimized for mobile. Check on desktop.\r
        </div>\r
      )}\r
\r
      <motion.div\r
        className="relative [transform-style:preserve-3d]"\r
        style={{\r
          width: imageWidth,\r
          height: imageHeight,\r
          rotateX,\r
          rotateY,\r
          scale\r
        }}\r
      >\r
        <motion.img\r
          src={imageSrc}\r
          alt={altText}\r
          className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"\r
          style={{\r
            width: imageWidth,\r
            height: imageHeight\r
          }}\r
        />\r
\r
        {displayOverlayContent && overlayContent && (\r
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">\r
            {overlayContent}\r
          </motion.div>\r
        )}\r
      </motion.div>\r
\r
      {showTooltip && (\r
        <motion.figcaption\r
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"\r
          style={{\r
            x,\r
            y,\r
            opacity,\r
            rotate: rotateFigcaption\r
          }}\r
        >\r
          {captionText}\r
        </motion.figcaption>\r
      )}\r
    </figure>\r
  );\r
}\r
`,te={dependencies:"motion",usage:`import TiltedCard from './TiltedCard';

<TiltedCard
  imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
  altText="Kendrick Lamar - GNX Album Cover"
  captionText="Kendrick Lamar - GNX"
  containerHeight="300px"
  containerWidth="300px"
  imageHeight="300px"
  imageWidth="300px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={true}
  displayOverlayContent={true}
  overlayContent={
    <p className="tilted-card-demo-text">
      Kendrick Lamar - GNX
    </p>
  }
/>
  `,code:J,css:Q,tailwind:_,tsCode:$,tsTailwind:ee},ce=()=>{const[a,g]=o.useState(12),[s,f]=o.useState(1.05),[l,c]=o.useState(!0),[i,h]=o.useState(!0),d=[{name:"imageSrc",type:"string",default:"N/A",description:"The source URL of the image."},{name:"altText",type:"string",default:"Tilted card image",description:"Alternative text for the image."},{name:"captionText",type:"string",default:"",description:"Text for the tooltip caption."},{name:"containerHeight",type:"string",default:"600px",description:"Height of the overall card container."},{name:"containerWidth",type:"string",default:"100%",description:"Width of the overall card container."},{name:"imageHeight",type:"string",default:"300px",description:"Height of the inner image."},{name:"imageWidth",type:"string",default:"300px",description:"Width of the inner image."},{name:"scaleOnHover",type:"number",default:"1.1",description:"Scaling factor applied on hover."},{name:"rotateAmplitude",type:"number",default:"14",description:"Controls how much the card tilts with mouse movement."},{name:"showMobileWarning",type:"boolean",default:"true",description:"Whether to show a small alert about mobile usage."},{name:"showTooltip",type:"boolean",default:"true",description:"Toggles the visibility of the tooltip (figcaption)."},{name:"displayOverlayContent",type:"boolean",default:"false",description:"Whether to display any overlayContent on top of the image."},{name:"overlayContent",type:"ReactNode",default:"null",description:"A React node to display as an overlay on the card."}];return e.jsxs(B,{children:[e.jsxs(G,{children:[e.jsx(z,{position:"relative",className:"demo-container",minH:500,overflow:"hidden",children:e.jsx(I,{imageSrc:"https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",altText:"Kendrick Lamar - GNX Album Cover",captionText:"Kendrick Lamar - GNX",containerHeight:"300px",containerWidth:"300px",imageHeight:"300px",imageWidth:"300px",rotateAmplitude:a,scaleOnHover:s,showMobileWarning:!1,showTooltip:l,displayOverlayContent:i,overlayContent:e.jsx("p",{className:"tilted-card-demo-text",children:"Kendrick Lamar - GNX"})})}),e.jsxs(q,{className:"preview-options",children:[e.jsx(W,{title:"Rotate Amplitude",min:0,max:30,step:1,value:a,onChange:g}),e.jsx(W,{title:"Scale on Hover",min:1,max:1.5,step:.05,value:s,onChange:f,displayValue:r=>r.toFixed(2)}),e.jsx(X,{title:"Show Tooltip",isChecked:l,onChange:r=>{c(r)}}),e.jsx(X,{title:"Show Overlay Content",isChecked:i,onChange:r=>{h(r)}})]}),e.jsx(K,{data:d}),e.jsx(U,{dependencyList:["motion"]})]}),e.jsx(Z,{children:e.jsx(D,{codeObject:te})})]})};export{ce as default};
