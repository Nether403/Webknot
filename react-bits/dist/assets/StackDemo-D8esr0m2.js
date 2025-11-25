import{r as g,j as r,q as w,bh as u,by as b,B as y}from"./index-wsKSLPNH.js";import{T as x,P as k,a as T,C as D,b as R}from"./PropTable-C4uPWs8h.js";import{P as S}from"./PreviewSwitch-DqnF708j.js";import{C as B}from"./Customize-1m_ZNqR9.js";import{P as p}from"./PreviewSlider-m1G_aiYP.js";import{D as q}from"./Dependencies-BHoMfJUj.js";import{u as M}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";function j({children:d,onSendToBack:m,sensitivity:e}){const n=u(0),i=u(0),h=b(i,[-100,100],[60,-60]),s=b(n,[-100,100],[-60,60]);function l(f,t){Math.abs(t.offset.x)>e||Math.abs(t.offset.y)>e?m():(n.set(0),i.set(0))}return r.jsx(w.div,{className:"card-rotate",style:{x:n,y:i,rotateX:h,rotateY:s},drag:!0,dragConstraints:{top:0,right:0,bottom:0,left:0},dragElastic:.6,whileTap:{cursor:"grabbing"},onDragEnd:l,children:d})}function N({randomRotation:d=!1,sensitivity:m=200,cardDimensions:e={width:208,height:208},cardsData:n=[],animationConfig:i={stiffness:260,damping:20},sendToBackOnClick:h=!1}){const[s,l]=g.useState(n.length?n:[{id:1,img:"https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"},{id:2,img:"https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"},{id:3,img:"https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"},{id:4,img:"https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"}]),f=t=>{l(c=>{const o=[...c],a=o.findIndex(v=>v.id===t),[C]=o.splice(a,1);return o.unshift(C),o})};return r.jsx("div",{className:"stack-container",style:{width:e.width,height:e.height,perspective:600},children:s.map((t,c)=>{const o=d?Math.random()*10-5:0;return r.jsx(j,{onSendToBack:()=>f(t.id),sensitivity:m,children:r.jsx(w.div,{className:"card",onClick:()=>h&&f(t.id),animate:{rotateZ:(s.length-c-1)*4+o,scale:1+c*.06-s.length*.06,transformOrigin:"90% 90%"},initial:!1,transition:{type:"spring",stiffness:i.stiffness,damping:i.damping},style:{width:e.width,height:e.height},children:r.jsx("img",{src:t.img,alt:`card-${t.id}`,className:"card-image"})})},t.id)})})}const E=`import { motion, useMotionValue, useTransform } from 'motion/react';\r
import { useState } from 'react';\r
import './Stack.css';\r
\r
function CardRotate({ children, onSendToBack, sensitivity }) {\r
  const x = useMotionValue(0);\r
  const y = useMotionValue(0);\r
  const rotateX = useTransform(y, [-100, 100], [60, -60]);\r
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);\r
\r
  function handleDragEnd(_, info) {\r
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {\r
      onSendToBack();\r
    } else {\r
      x.set(0);\r
      y.set(0);\r
    }\r
  }\r
\r
  return (\r
    <motion.div\r
      className="card-rotate"\r
      style={{ x, y, rotateX, rotateY }}\r
      drag\r
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}\r
      dragElastic={0.6}\r
      whileTap={{ cursor: 'grabbing' }}\r
      onDragEnd={handleDragEnd}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
}\r
\r
export default function Stack({\r
  randomRotation = false,\r
  sensitivity = 200,\r
  cardDimensions = { width: 208, height: 208 },\r
  cardsData = [],\r
  animationConfig = { stiffness: 260, damping: 20 },\r
  sendToBackOnClick = false\r
}) {\r
  const [cards, setCards] = useState(\r
    cardsData.length\r
      ? cardsData\r
      : [\r
          { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },\r
          { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },\r
          { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },\r
          { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' }\r
        ]\r
  );\r
\r
  const sendToBack = id => {\r
    setCards(prev => {\r
      const newCards = [...prev];\r
      const index = newCards.findIndex(card => card.id === id);\r
      const [card] = newCards.splice(index, 1);\r
      newCards.unshift(card);\r
      return newCards;\r
    });\r
  };\r
\r
  return (\r
    <div\r
      className="stack-container"\r
      style={{\r
        width: cardDimensions.width,\r
        height: cardDimensions.height,\r
        perspective: 600\r
      }}\r
    >\r
      {cards.map((card, index) => {\r
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;\r
\r
        return (\r
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>\r
            <motion.div\r
              className="card"\r
              onClick={() => sendToBackOnClick && sendToBack(card.id)}\r
              animate={{\r
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,\r
                scale: 1 + index * 0.06 - cards.length * 0.06,\r
                transformOrigin: '90% 90%'\r
              }}\r
              initial={false}\r
              transition={{\r
                type: 'spring',\r
                stiffness: animationConfig.stiffness,\r
                damping: animationConfig.damping\r
              }}\r
              style={{\r
                width: cardDimensions.width,\r
                height: cardDimensions.height\r
              }}\r
            >\r
              <img src={card.img} alt={\`card-\${card.id}\`} className="card-image" />\r
            </motion.div>\r
          </CardRotate>\r
        );\r
      })}\r
    </div>\r
  );\r
}\r
`,O=`.stack-container {\r
  position: relative;\r
  perspective: 600px;\r
}\r
\r
.card-rotate {\r
  position: absolute;\r
  cursor: grab;\r
}\r
\r
.card {\r
  border-radius: 20px;\r
  border: 5px solid #fff;\r
  overflow: hidden;\r
}\r
\r
.card-image {\r
  pointer-events: none;\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
}\r
`,P=`import { motion, useMotionValue, useTransform } from 'motion/react';\r
import { useState } from 'react';\r
\r
function CardRotate({ children, onSendToBack, sensitivity }) {\r
  const x = useMotionValue(0);\r
  const y = useMotionValue(0);\r
  const rotateX = useTransform(y, [-100, 100], [60, -60]);\r
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);\r
\r
  function handleDragEnd(_, info) {\r
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {\r
      onSendToBack();\r
    } else {\r
      x.set(0);\r
      y.set(0);\r
    }\r
  }\r
\r
  return (\r
    <motion.div\r
      className="absolute cursor-grab"\r
      style={{ x, y, rotateX, rotateY }}\r
      drag\r
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}\r
      dragElastic={0.6}\r
      whileTap={{ cursor: 'grabbing' }}\r
      onDragEnd={handleDragEnd}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
}\r
\r
export default function Stack({\r
  randomRotation = false,\r
  sensitivity = 200,\r
  cardDimensions = { width: 208, height: 208 },\r
  cardsData = [],\r
  animationConfig = { stiffness: 260, damping: 20 },\r
  sendToBackOnClick = false\r
}) {\r
  const [cards, setCards] = useState(\r
    cardsData.length\r
      ? cardsData\r
      : [\r
          { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },\r
          { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },\r
          { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },\r
          { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' }\r
        ]\r
  );\r
\r
  const sendToBack = id => {\r
    setCards(prev => {\r
      const newCards = [...prev];\r
      const index = newCards.findIndex(card => card.id === id);\r
      const [card] = newCards.splice(index, 1);\r
      newCards.unshift(card);\r
      return newCards;\r
    });\r
  };\r
\r
  return (\r
    <div\r
      className="relative"\r
      style={{\r
        width: cardDimensions.width,\r
        height: cardDimensions.height,\r
        perspective: 600\r
      }}\r
    >\r
      {cards.map((card, index) => {\r
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;\r
\r
        return (\r
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>\r
            <motion.div\r
              className="rounded-2xl overflow-hidden border-4 border-white"\r
              onClick={() => sendToBackOnClick && sendToBack(card.id)}\r
              animate={{\r
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,\r
                scale: 1 + index * 0.06 - cards.length * 0.06,\r
                transformOrigin: '90% 90%'\r
              }}\r
              initial={false}\r
              transition={{\r
                type: 'spring',\r
                stiffness: animationConfig.stiffness,\r
                damping: animationConfig.damping\r
              }}\r
              style={{\r
                width: cardDimensions.width,\r
                height: cardDimensions.height\r
              }}\r
            >\r
              <img src={card.img} alt={\`card-\${card.id}\`} className="w-full h-full object-cover pointer-events-none" />\r
            </motion.div>\r
          </CardRotate>\r
        );\r
      })}\r
    </div>\r
  );\r
}\r
`,V=`import { motion, useMotionValue, useTransform } from 'motion/react';\r
import { useState } from 'react';\r
import './Stack.css';\r
\r
interface CardRotateProps {\r
  children: React.ReactNode;\r
  onSendToBack: () => void;\r
  sensitivity: number;\r
}\r
\r
function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {\r
  const x = useMotionValue(0);\r
  const y = useMotionValue(0);\r
  const rotateX = useTransform(y, [-100, 100], [60, -60]);\r
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);\r
\r
  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {\r
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {\r
      onSendToBack();\r
    } else {\r
      x.set(0);\r
      y.set(0);\r
    }\r
  }\r
\r
  return (\r
    <motion.div\r
      className="card-rotate"\r
      style={{ x, y, rotateX, rotateY }}\r
      drag\r
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}\r
      dragElastic={0.6}\r
      whileTap={{ cursor: 'grabbing' }}\r
      onDragEnd={handleDragEnd}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
}\r
\r
interface StackProps {\r
  randomRotation?: boolean;\r
  sensitivity?: number;\r
  cardDimensions?: { width: number; height: number };\r
  sendToBackOnClick?: boolean;\r
  cardsData?: { id: number; img: string }[];\r
  animationConfig?: { stiffness: number; damping: number };\r
}\r
\r
export default function Stack({\r
  randomRotation = false,\r
  sensitivity = 200,\r
  cardDimensions = { width: 208, height: 208 },\r
  cardsData = [],\r
  animationConfig = { stiffness: 260, damping: 20 },\r
  sendToBackOnClick = false\r
}: StackProps) {\r
  const [cards, setCards] = useState(\r
    cardsData.length\r
      ? cardsData\r
      : [\r
          { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },\r
          { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },\r
          { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },\r
          { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' }\r
        ]\r
  );\r
\r
  const sendToBack = (id: number) => {\r
    setCards(prev => {\r
      const newCards = [...prev];\r
      const index = newCards.findIndex(card => card.id === id);\r
      const [card] = newCards.splice(index, 1);\r
      newCards.unshift(card);\r
      return newCards;\r
    });\r
  };\r
\r
  return (\r
    <div\r
      className="stack-container"\r
      style={{\r
        width: cardDimensions.width,\r
        height: cardDimensions.height,\r
        perspective: 600\r
      }}\r
    >\r
      {cards.map((card, index) => {\r
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;\r
\r
        return (\r
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>\r
            <motion.div\r
              className="card"\r
              onClick={() => sendToBackOnClick && sendToBack(card.id)}\r
              animate={{\r
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,\r
                scale: 1 + index * 0.06 - cards.length * 0.06,\r
                transformOrigin: '90% 90%'\r
              }}\r
              initial={false}\r
              transition={{\r
                type: 'spring',\r
                stiffness: animationConfig.stiffness,\r
                damping: animationConfig.damping\r
              }}\r
              style={{\r
                width: cardDimensions.width,\r
                height: cardDimensions.height\r
              }}\r
            >\r
              <img src={card.img} alt={\`card-\${card.id}\`} className="card-image" />\r
            </motion.div>\r
          </CardRotate>\r
        );\r
      })}\r
    </div>\r
  );\r
}\r
`,X=`import { motion, useMotionValue, useTransform } from 'motion/react';\r
import { useState } from 'react';\r
\r
interface CardRotateProps {\r
  children: React.ReactNode;\r
  onSendToBack: () => void;\r
  sensitivity: number;\r
}\r
\r
function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {\r
  const x = useMotionValue(0);\r
  const y = useMotionValue(0);\r
  const rotateX = useTransform(y, [-100, 100], [60, -60]);\r
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);\r
\r
  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {\r
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {\r
      onSendToBack();\r
    } else {\r
      x.set(0);\r
      y.set(0);\r
    }\r
  }\r
\r
  return (\r
    <motion.div\r
      className="absolute cursor-grab"\r
      style={{ x, y, rotateX, rotateY }}\r
      drag\r
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}\r
      dragElastic={0.6}\r
      whileTap={{ cursor: 'grabbing' }}\r
      onDragEnd={handleDragEnd}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
}\r
\r
interface StackProps {\r
  randomRotation?: boolean;\r
  sensitivity?: number;\r
  cardDimensions?: { width: number; height: number };\r
  sendToBackOnClick?: boolean;\r
  cardsData?: { id: number; img: string }[];\r
  animationConfig?: { stiffness: number; damping: number };\r
}\r
\r
export default function Stack({\r
  randomRotation = false,\r
  sensitivity = 200,\r
  cardDimensions = { width: 208, height: 208 },\r
  cardsData = [],\r
  animationConfig = { stiffness: 260, damping: 20 },\r
  sendToBackOnClick = false\r
}: StackProps) {\r
  const [cards, setCards] = useState(\r
    cardsData.length\r
      ? cardsData\r
      : [\r
          {\r
            id: 1,\r
            img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format'\r
          },\r
          {\r
            id: 2,\r
            img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format'\r
          },\r
          {\r
            id: 3,\r
            img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format'\r
          },\r
          {\r
            id: 4,\r
            img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'\r
          }\r
        ]\r
  );\r
\r
  const sendToBack = (id: number) => {\r
    setCards(prev => {\r
      const newCards = [...prev];\r
      const index = newCards.findIndex(card => card.id === id);\r
      const [card] = newCards.splice(index, 1);\r
      newCards.unshift(card);\r
      return newCards;\r
    });\r
  };\r
\r
  return (\r
    <div\r
      className="relative"\r
      style={{\r
        width: cardDimensions.width,\r
        height: cardDimensions.height,\r
        perspective: 600\r
      }}\r
    >\r
      {cards.map((card, index) => {\r
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;\r
\r
        return (\r
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>\r
            <motion.div\r
              className="rounded-2xl overflow-hidden border-4 border-white"\r
              onClick={() => sendToBackOnClick && sendToBack(card.id)}\r
              animate={{\r
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,\r
                scale: 1 + index * 0.06 - cards.length * 0.06,\r
                transformOrigin: '90% 90%'\r
              }}\r
              initial={false}\r
              transition={{\r
                type: 'spring',\r
                stiffness: animationConfig.stiffness,\r
                damping: animationConfig.damping\r
              }}\r
              style={{\r
                width: cardDimensions.width,\r
                height: cardDimensions.height\r
              }}\r
            >\r
              <img src={card.img} alt={\`card-\${card.id}\`} className="w-full h-full object-cover pointer-events-none" />\r
            </motion.div>\r
          </CardRotate>\r
        );\r
      })}\r
    </div>\r
  );\r
}\r
`,Y={dependencies:"motion",usage:`import Stack from './Stack'

const images = [
  { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
  { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
  { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
  { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
];
  
<Stack
  randomRotation={true}
  sensitivity={180}
  sendToBackOnClick={false}
  cardDimensions={{ width: 200, height: 200 }}
  cardsData={images}
/>`,code:E,css:O,tailwind:P,tsCode:V,tsTailwind:X},A=()=>{const[d,m]=g.useState(!1),[e,n]=g.useState(200),[i,h]=g.useState(208),[s,l]=g.useState(208),[f,t]=M(),c=[{name:"randomRotation",type:"boolean",default:!1,description:"Applies a random rotation to each card for a 'messy' look."},{name:"sensitivity",type:"number",default:200,description:"Drag sensitivity for sending a card to the back."},{name:"cardDimensions",type:"object",default:"{ width: 208, height: 208 }",description:"Defines the width and height of the cards."},{name:"sendToBackOnClick",type:"boolean",default:"false",description:"When enabled, the also stack shifts to the next card on click."},{name:"cardsData",type:"array",default:"[]",description:"The array of card data, including `id` and `img` properties."},{name:"animationConfig",type:"object",default:"{ stiffness: 260, damping: 20 }",description:"Configures the spring animation's stiffness and damping."}],o=[{id:1,img:"https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"},{id:2,img:"https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"},{id:3,img:"https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"},{id:4,img:"https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"}];return r.jsxs(x,{children:[r.jsxs(k,{children:[r.jsx(y,{position:"relative",className:"demo-container",minH:400,overflow:"hidden",children:r.jsx(N,{randomRotation:d,sensitivity:e,cardDimensions:{width:i,height:s},cardsData:o},f)}),r.jsxs(B,{children:[r.jsx(S,{title:"Random Rotation",isChecked:d,onChange:a=>{m(a),t()}}),r.jsx(p,{title:"Sensitivity",min:100,max:300,step:10,value:e,onChange:a=>{n(a),t()}}),r.jsx(p,{title:"Card Width",min:150,max:300,step:10,value:i,onChange:a=>{h(a),t()},displayValue:a=>`${a}px`}),r.jsx(p,{title:"Card Height",min:150,max:300,step:10,value:s,onChange:a=>{l(a),t()},displayValue:a=>`${a}px`})]}),r.jsx(T,{data:c}),r.jsx(q,{dependencyList:["motion"]})]}),r.jsx(D,{children:r.jsx(R,{codeObject:Y})})]})};export{A as default};
