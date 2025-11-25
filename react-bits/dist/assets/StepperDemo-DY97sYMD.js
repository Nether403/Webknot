import{r as c,j as e,e as V,q as p,bd as W,B as E,u as f,T as w,d as M}from"./index-wsKSLPNH.js";import{T as _,P as G,a as O,C as Y,b as z}from"./PropTable-C4uPWs8h.js";import{D as q}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";function J({children:r,initialStep:n=1,onStepChange:i=()=>{},onFinalStepCompleted:o=()=>{},stepCircleContainerClassName:s="",stepContainerClassName:a="",contentClassName:b="",footerClassName:x="",backButtonProps:P={},nextButtonProps:B={},backButtonText:R="Back",nextButtonText:L="Continue",disableStepIndicators:j=!1,renderStepIndicator:k,...T}){const[t,F]=c.useState(n),[I,l]=c.useState(0),v=c.Children.toArray(r),d=v.length,N=t>d,g=t===d,u=S=>{F(S),S>d?o():i(S)},H=()=>{t>1&&(l(-1),u(t-1))},A=()=>{g||(l(1),u(t+1))},D=()=>{l(1),u(d+1)};return e.jsx("div",{className:"outer-container",...T,children:e.jsxs("div",{className:`step-circle-container ${s}`,style:{border:"1px solid #222"},children:[e.jsx("div",{className:`step-indicator-row ${a}`,children:v.map((S,y)=>{const h=y+1,$=y<d-1;return e.jsxs(V.Fragment,{children:[k?k({step:h,currentStep:t,onStepClick:m=>{l(m>t?1:-1),u(m)}}):e.jsx(U,{step:h,disableStepIndicators:j,currentStep:t,onClickStep:m=>{l(m>t?1:-1),u(m)}}),$&&e.jsx(Z,{isComplete:t>h})]},h)})}),e.jsx(X,{isCompleted:N,currentStep:t,direction:I,className:`step-content-default ${b}`,children:v[t-1]}),!N&&e.jsx("div",{className:`footer-container ${x}`,children:e.jsxs("div",{className:`footer-nav ${t!==1?"spread":"end"}`,children:[t!==1&&e.jsx("button",{onClick:H,className:`back-button ${t===1?"inactive":""}`,...P,children:R}),e.jsx("button",{onClick:g?D:A,className:"next-button",...B,children:g?"Complete":L})]})})]})})}function X({isCompleted:r,currentStep:n,direction:i,children:o,className:s}){const[a,b]=c.useState(0);return e.jsx(p.div,{className:s,style:{position:"relative",overflow:"hidden"},animate:{height:r?0:a},transition:{type:"spring",duration:.4},children:e.jsx(W,{initial:!1,mode:"sync",custom:i,children:!r&&e.jsx(K,{direction:i,onHeightReady:x=>b(x),children:o},n)})})}function K({children:r,direction:n,onHeightReady:i}){const o=c.useRef(null);return c.useLayoutEffect(()=>{o.current&&i(o.current.offsetHeight)},[r,i]),e.jsx(p.div,{ref:o,custom:n,variants:Q,initial:"enter",animate:"center",exit:"exit",transition:{duration:.4},style:{position:"absolute",left:0,right:0,top:0},children:r})}const Q={enter:r=>({x:r>=0?"-100%":"100%",opacity:0}),center:{x:"0%",opacity:1},exit:r=>({x:r>=0?"50%":"-50%",opacity:0})};function C({children:r}){return e.jsx("div",{className:"step-default",children:r})}function U({step:r,currentStep:n,onClickStep:i,disableStepIndicators:o}){const s=n===r?"active":n<r?"inactive":"complete",a=()=>{r!==n&&!o&&i(r)};return e.jsx(p.div,{onClick:a,className:"step-indicator",animate:s,initial:!1,children:e.jsx(p.div,{variants:{inactive:{scale:1,backgroundColor:"#222",color:"#a3a3a3"},active:{scale:1,backgroundColor:"#5227FF",color:"#5227FF"},complete:{scale:1,backgroundColor:"#5227FF",color:"#3b82f6"}},transition:{duration:.3},className:"step-indicator-inner",children:s==="complete"?e.jsx(ee,{className:"check-icon"}):s==="active"?e.jsx("div",{className:"active-dot"}):e.jsx("span",{className:"step-number",children:r})})})}function Z({isComplete:r}){const n={incomplete:{width:0,backgroundColor:"transparent"},complete:{width:"100%",backgroundColor:"#5227FF"}};return e.jsx("div",{className:"step-connector",children:e.jsx(p.div,{className:"step-connector-inner",variants:n,initial:!1,animate:r?"complete":"incomplete",transition:{duration:.4}})})}function ee(r){return e.jsx("svg",{...r,fill:"none",stroke:"currentColor",strokeWidth:2,viewBox:"0 0 24 24",children:e.jsx(p.path,{initial:{pathLength:0},animate:{pathLength:1},transition:{delay:.1,type:"tween",ease:"easeOut",duration:.3},strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}const re=`import React, { useState, Children, useRef, useLayoutEffect } from 'react';\r
import { motion, AnimatePresence } from 'motion/react';\r
\r
import './Stepper.css';\r
\r
export default function Stepper({\r
  children,\r
  initialStep = 1,\r
  onStepChange = () => {},\r
  onFinalStepCompleted = () => {},\r
  stepCircleContainerClassName = '',\r
  stepContainerClassName = '',\r
  contentClassName = '',\r
  footerClassName = '',\r
  backButtonProps = {},\r
  nextButtonProps = {},\r
  backButtonText = 'Back',\r
  nextButtonText = 'Continue',\r
  disableStepIndicators = false,\r
  renderStepIndicator,\r
  ...rest\r
}) {\r
  const [currentStep, setCurrentStep] = useState(initialStep);\r
  const [direction, setDirection] = useState(0);\r
  const stepsArray = Children.toArray(children);\r
  const totalSteps = stepsArray.length;\r
  const isCompleted = currentStep > totalSteps;\r
  const isLastStep = currentStep === totalSteps;\r
\r
  const updateStep = newStep => {\r
    setCurrentStep(newStep);\r
    if (newStep > totalSteps) {\r
      onFinalStepCompleted();\r
    } else {\r
      onStepChange(newStep);\r
    }\r
  };\r
\r
  const handleBack = () => {\r
    if (currentStep > 1) {\r
      setDirection(-1);\r
      updateStep(currentStep - 1);\r
    }\r
  };\r
\r
  const handleNext = () => {\r
    if (!isLastStep) {\r
      setDirection(1);\r
      updateStep(currentStep + 1);\r
    }\r
  };\r
\r
  const handleComplete = () => {\r
    setDirection(1);\r
    updateStep(totalSteps + 1);\r
  };\r
\r
  return (\r
    <div className="outer-container" {...rest}>\r
      <div className={\`step-circle-container \${stepCircleContainerClassName}\`} style={{ border: '1px solid #222' }}>\r
        <div className={\`step-indicator-row \${stepContainerClassName}\`}>\r
          {stepsArray.map((_, index) => {\r
            const stepNumber = index + 1;\r
            const isNotLastStep = index < totalSteps - 1;\r
            return (\r
              <React.Fragment key={stepNumber}>\r
                {renderStepIndicator ? (\r
                  renderStepIndicator({\r
                    step: stepNumber,\r
                    currentStep,\r
                    onStepClick: clicked => {\r
                      setDirection(clicked > currentStep ? 1 : -1);\r
                      updateStep(clicked);\r
                    }\r
                  })\r
                ) : (\r
                  <StepIndicator\r
                    step={stepNumber}\r
                    disableStepIndicators={disableStepIndicators}\r
                    currentStep={currentStep}\r
                    onClickStep={clicked => {\r
                      setDirection(clicked > currentStep ? 1 : -1);\r
                      updateStep(clicked);\r
                    }}\r
                  />\r
                )}\r
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}\r
              </React.Fragment>\r
            );\r
          })}\r
        </div>\r
\r
        <StepContentWrapper\r
          isCompleted={isCompleted}\r
          currentStep={currentStep}\r
          direction={direction}\r
          className={\`step-content-default \${contentClassName}\`}\r
        >\r
          {stepsArray[currentStep - 1]}\r
        </StepContentWrapper>\r
\r
        {!isCompleted && (\r
          <div className={\`footer-container \${footerClassName}\`}>\r
            <div className={\`footer-nav \${currentStep !== 1 ? 'spread' : 'end'}\`}>\r
              {currentStep !== 1 && (\r
                <button\r
                  onClick={handleBack}\r
                  className={\`back-button \${currentStep === 1 ? 'inactive' : ''}\`}\r
                  {...backButtonProps}\r
                >\r
                  {backButtonText}\r
                </button>\r
              )}\r
              <button onClick={isLastStep ? handleComplete : handleNext} className="next-button" {...nextButtonProps}>\r
                {isLastStep ? 'Complete' : nextButtonText}\r
              </button>\r
            </div>\r
          </div>\r
        )}\r
      </div>\r
    </div>\r
  );\r
}\r
\r
function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {\r
  const [parentHeight, setParentHeight] = useState(0);\r
\r
  return (\r
    <motion.div\r
      className={className}\r
      style={{ position: 'relative', overflow: 'hidden' }}\r
      animate={{ height: isCompleted ? 0 : parentHeight }}\r
      transition={{ type: 'spring', duration: 0.4 }}\r
    >\r
      <AnimatePresence initial={false} mode="sync" custom={direction}>\r
        {!isCompleted && (\r
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>\r
            {children}\r
          </SlideTransition>\r
        )}\r
      </AnimatePresence>\r
    </motion.div>\r
  );\r
}\r
\r
function SlideTransition({ children, direction, onHeightReady }) {\r
  const containerRef = useRef(null);\r
\r
  useLayoutEffect(() => {\r
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);\r
  }, [children, onHeightReady]);\r
\r
  return (\r
    <motion.div\r
      ref={containerRef}\r
      custom={direction}\r
      variants={stepVariants}\r
      initial="enter"\r
      animate="center"\r
      exit="exit"\r
      transition={{ duration: 0.4 }}\r
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
}\r
\r
const stepVariants = {\r
  enter: dir => ({\r
    x: dir >= 0 ? '-100%' : '100%',\r
    opacity: 0\r
  }),\r
  center: {\r
    x: '0%',\r
    opacity: 1\r
  },\r
  exit: dir => ({\r
    x: dir >= 0 ? '50%' : '-50%',\r
    opacity: 0\r
  })\r
};\r
\r
export function Step({ children }) {\r
  return <div className="step-default">{children}</div>;\r
}\r
\r
function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {\r
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';\r
\r
  const handleClick = () => {\r
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);\r
  };\r
\r
  return (\r
    <motion.div onClick={handleClick} className="step-indicator" animate={status} initial={false}>\r
      <motion.div\r
        variants={{\r
          inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },\r
          active: { scale: 1, backgroundColor: '#5227FF', color: '#5227FF' },\r
          complete: { scale: 1, backgroundColor: '#5227FF', color: '#3b82f6' }\r
        }}\r
        transition={{ duration: 0.3 }}\r
        className="step-indicator-inner"\r
      >\r
        {status === 'complete' ? (\r
          <CheckIcon className="check-icon" />\r
        ) : status === 'active' ? (\r
          <div className="active-dot" />\r
        ) : (\r
          <span className="step-number">{step}</span>\r
        )}\r
      </motion.div>\r
    </motion.div>\r
  );\r
}\r
\r
function StepConnector({ isComplete }) {\r
  const lineVariants = {\r
    incomplete: { width: 0, backgroundColor: 'transparent' },\r
    complete: { width: '100%', backgroundColor: '#5227FF' }\r
  };\r
\r
  return (\r
    <div className="step-connector">\r
      <motion.div\r
        className="step-connector-inner"\r
        variants={lineVariants}\r
        initial={false}\r
        animate={isComplete ? 'complete' : 'incomplete'}\r
        transition={{ duration: 0.4 }}\r
      />\r
    </div>\r
  );\r
}\r
\r
function CheckIcon(props) {\r
  return (\r
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">\r
      <motion.path\r
        initial={{ pathLength: 0 }}\r
        animate={{ pathLength: 1 }}\r
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}\r
        strokeLinecap="round"\r
        strokeLinejoin="round"\r
        d="M5 13l4 4L19 7"\r
      />\r
    </svg>\r
  );\r
}\r
`,te=`.outer-container {\r
  display: flex;\r
  min-height: 100%;\r
  flex: 1 1 0%;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 1rem;\r
}\r
\r
@media (min-width: 640px) {\r
  .outer-container {\r
    aspect-ratio: 4 / 3;\r
  }\r
}\r
\r
@media (min-width: 768px) {\r
  .outer-container {\r
    aspect-ratio: 2 / 1;\r
  }\r
}\r
\r
.step-circle-container {\r
  margin-left: auto;\r
  margin-right: auto;\r
  width: 100%;\r
  max-width: 28rem;\r
  border-radius: 2rem;\r
  box-shadow:\r
    0 20px 25px -5px rgba(0, 0, 0, 0.1),\r
    0 10px 10px -5px rgba(0, 0, 0, 0.04);\r
}\r
\r
.step-indicator-row {\r
  display: flex;\r
  width: 100%;\r
  align-items: center;\r
  padding: 2rem;\r
}\r
\r
.step-content-default {\r
  position: relative;\r
  overflow: hidden;\r
}\r
\r
.step-default {\r
  padding-left: 2rem;\r
  padding-right: 2rem;\r
}\r
\r
.footer-container {\r
  padding-left: 2rem;\r
  padding-right: 2rem;\r
  padding-bottom: 2rem;\r
}\r
\r
.footer-nav {\r
  margin-top: 2.5rem;\r
  display: flex;\r
}\r
\r
.footer-nav.spread {\r
  justify-content: space-between;\r
}\r
\r
.footer-nav.end {\r
  justify-content: flex-end;\r
}\r
\r
.back-button {\r
  transition: all 350ms;\r
  border-radius: 0.25rem;\r
  padding: 0.25rem 0.5rem;\r
  color: #a3a3a3;\r
  cursor: pointer;\r
}\r
\r
.back-button:hover {\r
  color: #52525b;\r
}\r
\r
.back-button.inactive {\r
  pointer-events: none;\r
  opacity: 0.5;\r
  color: #a3a3a3;\r
}\r
\r
.next-button {\r
  transition: all 350ms;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  border-radius: 9999px;\r
  background-color: #5227ff;\r
  color: #fff;\r
  font-weight: 500;\r
  letter-spacing: -0.025em;\r
  padding: 0.375rem 0.875rem;\r
  cursor: pointer;\r
}\r
\r
.next-button:hover {\r
  background-color: #5227ff;\r
}\r
\r
.next-button:active {\r
  background-color: #5227ff;\r
}\r
\r
.step-indicator {\r
  position: relative;\r
  cursor: pointer;\r
  outline: none;\r
}\r
\r
.step-indicator-inner {\r
  display: flex;\r
  height: 2rem;\r
  width: 2rem;\r
  align-items: center;\r
  justify-content: center;\r
  border-radius: 9999px;\r
  font-weight: 600;\r
}\r
\r
.active-dot {\r
  height: 0.75rem;\r
  width: 0.75rem;\r
  border-radius: 9999px;\r
  background-color: #fff;\r
}\r
\r
.step-number {\r
  font-size: 0.875rem;\r
}\r
\r
.step-connector {\r
  position: relative;\r
  margin-left: 0.5rem;\r
  margin-right: 0.5rem;\r
  height: 0.125rem;\r
  flex: 1;\r
  overflow: hidden;\r
  border-radius: 0.25rem;\r
  background-color: #52525b;\r
}\r
\r
.step-connector-inner {\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  height: 100%;\r
}\r
\r
.check-icon {\r
  height: 1rem;\r
  width: 1rem;\r
  color: #fff;\r
}\r
`,ne=`import React, { useState, Children, useRef, useLayoutEffect } from 'react';\r
import { motion, AnimatePresence } from 'motion/react';\r
\r
export default function Stepper({\r
  children,\r
  initialStep = 1,\r
  onStepChange = () => {},\r
  onFinalStepCompleted = () => {},\r
  stepCircleContainerClassName = '',\r
  stepContainerClassName = '',\r
  contentClassName = '',\r
  footerClassName = '',\r
  backButtonProps = {},\r
  nextButtonProps = {},\r
  backButtonText = 'Back',\r
  nextButtonText = 'Continue',\r
  disableStepIndicators = false,\r
  renderStepIndicator,\r
  ...rest\r
}) {\r
  const [currentStep, setCurrentStep] = useState(initialStep);\r
  const [direction, setDirection] = useState(0);\r
  const stepsArray = Children.toArray(children);\r
  const totalSteps = stepsArray.length;\r
  const isCompleted = currentStep > totalSteps;\r
  const isLastStep = currentStep === totalSteps;\r
\r
  const updateStep = newStep => {\r
    setCurrentStep(newStep);\r
    if (newStep > totalSteps) onFinalStepCompleted();\r
    else onStepChange(newStep);\r
  };\r
\r
  const handleBack = () => {\r
    if (currentStep > 1) {\r
      setDirection(-1);\r
      updateStep(currentStep - 1);\r
    }\r
  };\r
\r
  const handleNext = () => {\r
    if (!isLastStep) {\r
      setDirection(1);\r
      updateStep(currentStep + 1);\r
    }\r
  };\r
\r
  const handleComplete = () => {\r
    setDirection(1);\r
    updateStep(totalSteps + 1);\r
  };\r
\r
  return (\r
    <div\r
      className="flex min-h-full flex-1 flex-col items-center justify-center p-4 sm:aspect-[4/3] md:aspect-[2/1]"\r
      {...rest}\r
    >\r
      <div\r
        className={\`mx-auto w-full max-w-md rounded-4xl shadow-xl \${stepCircleContainerClassName}\`}\r
        style={{ border: '1px solid #222' }}\r
      >\r
        <div className={\`\${stepContainerClassName} flex w-full items-center p-8\`}>\r
          {stepsArray.map((_, index) => {\r
            const stepNumber = index + 1;\r
            const isNotLastStep = index < totalSteps - 1;\r
            return (\r
              <React.Fragment key={stepNumber}>\r
                {renderStepIndicator ? (\r
                  renderStepIndicator({\r
                    step: stepNumber,\r
                    currentStep,\r
                    onStepClick: clicked => {\r
                      setDirection(clicked > currentStep ? 1 : -1);\r
                      updateStep(clicked);\r
                    }\r
                  })\r
                ) : (\r
                  <StepIndicator\r
                    step={stepNumber}\r
                    disableStepIndicators={disableStepIndicators}\r
                    currentStep={currentStep}\r
                    onClickStep={clicked => {\r
                      setDirection(clicked > currentStep ? 1 : -1);\r
                      updateStep(clicked);\r
                    }}\r
                  />\r
                )}\r
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}\r
              </React.Fragment>\r
            );\r
          })}\r
        </div>\r
        <StepContentWrapper\r
          isCompleted={isCompleted}\r
          currentStep={currentStep}\r
          direction={direction}\r
          className={\`space-y-2 px-8 \${contentClassName}\`}\r
        >\r
          {stepsArray[currentStep - 1]}\r
        </StepContentWrapper>\r
        {!isCompleted && (\r
          <div className={\`px-8 pb-8 \${footerClassName}\`}>\r
            <div className={\`mt-10 flex \${currentStep !== 1 ? 'justify-between' : 'justify-end'}\`}>\r
              {currentStep !== 1 && (\r
                <button\r
                  onClick={handleBack}\r
                  className={\`duration-350 rounded px-2 py-1 transition \${\r
                    currentStep === 1\r
                      ? 'pointer-events-none opacity-50 text-neutral-400'\r
                      : 'text-neutral-400 hover:text-neutral-700'\r
                  }\`}\r
                  {...backButtonProps}\r
                >\r
                  {backButtonText}\r
                </button>\r
              )}\r
              <button\r
                onClick={isLastStep ? handleComplete : handleNext}\r
                className="duration-350 flex items-center justify-center rounded-full bg-green-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-green-600 active:bg-green-700"\r
                {...nextButtonProps}\r
              >\r
                {isLastStep ? 'Complete' : nextButtonText}\r
              </button>\r
            </div>\r
          </div>\r
        )}\r
      </div>\r
    </div>\r
  );\r
}\r
\r
function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {\r
  const [parentHeight, setParentHeight] = useState(0);\r
\r
  return (\r
    <motion.div\r
      style={{ position: 'relative', overflow: 'hidden' }}\r
      animate={{ height: isCompleted ? 0 : parentHeight }}\r
      transition={{ type: 'spring', duration: 0.4 }}\r
      className={className}\r
    >\r
      <AnimatePresence initial={false} mode="sync" custom={direction}>\r
        {!isCompleted && (\r
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>\r
            {children}\r
          </SlideTransition>\r
        )}\r
      </AnimatePresence>\r
    </motion.div>\r
  );\r
}\r
\r
function SlideTransition({ children, direction, onHeightReady }) {\r
  const containerRef = useRef(null);\r
\r
  useLayoutEffect(() => {\r
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);\r
  }, [children, onHeightReady]);\r
\r
  return (\r
    <motion.div\r
      ref={containerRef}\r
      custom={direction}\r
      variants={stepVariants}\r
      initial="enter"\r
      animate="center"\r
      exit="exit"\r
      transition={{ duration: 0.4 }}\r
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
}\r
\r
const stepVariants = {\r
  enter: dir => ({\r
    x: dir >= 0 ? '-100%' : '100%',\r
    opacity: 0\r
  }),\r
  center: {\r
    x: '0%',\r
    opacity: 1\r
  },\r
  exit: dir => ({\r
    x: dir >= 0 ? '50%' : '-50%',\r
    opacity: 0\r
  })\r
};\r
\r
export function Step({ children }) {\r
  return <div className="px-8">{children}</div>;\r
}\r
\r
function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {\r
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';\r
\r
  const handleClick = () => {\r
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);\r
  };\r
\r
  return (\r
    <motion.div\r
      onClick={handleClick}\r
      className="relative cursor-pointer outline-none focus:outline-none"\r
      animate={status}\r
      initial={false}\r
    >\r
      <motion.div\r
        variants={{\r
          inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },\r
          active: { scale: 1, backgroundColor: '#5227FF', color: '#5227FF' },\r
          complete: { scale: 1, backgroundColor: '#5227FF', color: '#3b82f6' }\r
        }}\r
        transition={{ duration: 0.3 }}\r
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"\r
      >\r
        {status === 'complete' ? (\r
          <CheckIcon className="h-4 w-4 text-black" />\r
        ) : status === 'active' ? (\r
          <div className="h-3 w-3 rounded-full bg-[#060010]" />\r
        ) : (\r
          <span className="text-sm">{step}</span>\r
        )}\r
      </motion.div>\r
    </motion.div>\r
  );\r
}\r
\r
function StepConnector({ isComplete }) {\r
  const lineVariants = {\r
    incomplete: { width: 0, backgroundColor: 'transparent' },\r
    complete: { width: '100%', backgroundColor: '#5227FF' }\r
  };\r
\r
  return (\r
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-neutral-600">\r
      <motion.div\r
        className="absolute left-0 top-0 h-full"\r
        variants={lineVariants}\r
        initial={false}\r
        animate={isComplete ? 'complete' : 'incomplete'}\r
        transition={{ duration: 0.4 }}\r
      />\r
    </div>\r
  );\r
}\r
\r
function CheckIcon(props) {\r
  return (\r
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">\r
      <motion.path\r
        initial={{ pathLength: 0 }}\r
        animate={{ pathLength: 1 }}\r
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}\r
        strokeLinecap="round"\r
        strokeLinejoin="round"\r
        d="M5 13l4 4L19 7"\r
      />\r
    </svg>\r
  );\r
}\r
`,ie=`import React, { useState, Children, useRef, useLayoutEffect, HTMLAttributes, ReactNode } from 'react';\r
import { motion, AnimatePresence, Variants } from 'motion/react';\r
\r
import './Stepper.css';\r
\r
interface StepperProps extends HTMLAttributes<HTMLDivElement> {\r
  children: ReactNode;\r
  initialStep?: number;\r
  onStepChange?: (step: number) => void;\r
  onFinalStepCompleted?: () => void;\r
  stepCircleContainerClassName?: string;\r
  stepContainerClassName?: string;\r
  contentClassName?: string;\r
  footerClassName?: string;\r
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;\r
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;\r
  backButtonText?: string;\r
  nextButtonText?: string;\r
  disableStepIndicators?: boolean;\r
  renderStepIndicator?: (props: RenderStepIndicatorProps) => ReactNode;\r
}\r
\r
interface RenderStepIndicatorProps {\r
  step: number;\r
  currentStep: number;\r
  onStepClick: (clicked: number) => void;\r
}\r
\r
export default function Stepper({\r
  children,\r
  initialStep = 1,\r
  onStepChange = () => {},\r
  onFinalStepCompleted = () => {},\r
  stepCircleContainerClassName = '',\r
  stepContainerClassName = '',\r
  contentClassName = '',\r
  footerClassName = '',\r
  backButtonProps = {},\r
  nextButtonProps = {},\r
  backButtonText = 'Back',\r
  nextButtonText = 'Continue',\r
  disableStepIndicators = false,\r
  renderStepIndicator,\r
  ...rest\r
}: StepperProps) {\r
  const [currentStep, setCurrentStep] = useState<number>(initialStep);\r
  const [direction, setDirection] = useState<number>(0);\r
  const stepsArray = Children.toArray(children);\r
  const totalSteps = stepsArray.length;\r
  const isCompleted = currentStep > totalSteps;\r
  const isLastStep = currentStep === totalSteps;\r
\r
  const updateStep = (newStep: number) => {\r
    setCurrentStep(newStep);\r
    if (newStep > totalSteps) {\r
      onFinalStepCompleted();\r
    } else {\r
      onStepChange(newStep);\r
    }\r
  };\r
\r
  const handleBack = () => {\r
    if (currentStep > 1) {\r
      setDirection(-1);\r
      updateStep(currentStep - 1);\r
    }\r
  };\r
\r
  const handleNext = () => {\r
    if (!isLastStep) {\r
      setDirection(1);\r
      updateStep(currentStep + 1);\r
    }\r
  };\r
\r
  const handleComplete = () => {\r
    setDirection(1);\r
    updateStep(totalSteps + 1);\r
  };\r
\r
  return (\r
    <div className="outer-container" {...rest}>\r
      <div className={\`step-circle-container \${stepCircleContainerClassName}\`} style={{ border: '1px solid #222' }}>\r
        <div className={\`step-indicator-row \${stepContainerClassName}\`}>\r
          {stepsArray.map((_, index) => {\r
            const stepNumber = index + 1;\r
            const isNotLastStep = index < totalSteps - 1;\r
            return (\r
              <React.Fragment key={stepNumber}>\r
                {renderStepIndicator ? (\r
                  renderStepIndicator({\r
                    step: stepNumber,\r
                    currentStep,\r
                    onStepClick: clicked => {\r
                      setDirection(clicked > currentStep ? 1 : -1);\r
                      updateStep(clicked);\r
                    }\r
                  })\r
                ) : (\r
                  <StepIndicator\r
                    step={stepNumber}\r
                    disableStepIndicators={disableStepIndicators}\r
                    currentStep={currentStep}\r
                    onClickStep={clicked => {\r
                      setDirection(clicked > currentStep ? 1 : -1);\r
                      updateStep(clicked);\r
                    }}\r
                  />\r
                )}\r
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}\r
              </React.Fragment>\r
            );\r
          })}\r
        </div>\r
\r
        <StepContentWrapper\r
          isCompleted={isCompleted}\r
          currentStep={currentStep}\r
          direction={direction}\r
          className={\`step-content-default \${contentClassName}\`}\r
        >\r
          {stepsArray[currentStep - 1]}\r
        </StepContentWrapper>\r
\r
        {!isCompleted && (\r
          <div className={\`footer-container \${footerClassName}\`}>\r
            <div className={\`footer-nav \${currentStep !== 1 ? 'spread' : 'end'}\`}>\r
              {currentStep !== 1 && (\r
                <button\r
                  onClick={handleBack}\r
                  className={\`back-button \${currentStep === 1 ? 'inactive' : ''}\`}\r
                  {...backButtonProps}\r
                >\r
                  {backButtonText}\r
                </button>\r
              )}\r
              <button onClick={isLastStep ? handleComplete : handleNext} className="next-button" {...nextButtonProps}>\r
                {isLastStep ? 'Complete' : nextButtonText}\r
              </button>\r
            </div>\r
          </div>\r
        )}\r
      </div>\r
    </div>\r
  );\r
}\r
\r
interface StepContentWrapperProps {\r
  isCompleted: boolean;\r
  currentStep: number;\r
  direction: number;\r
  children: ReactNode;\r
  className?: string;\r
}\r
\r
function StepContentWrapper({ isCompleted, currentStep, direction, children, className }: StepContentWrapperProps) {\r
  const [parentHeight, setParentHeight] = useState<number>(0);\r
\r
  return (\r
    <motion.div\r
      className={className}\r
      style={{ position: 'relative', overflow: 'hidden' }}\r
      animate={{ height: isCompleted ? 0 : parentHeight }}\r
      transition={{ type: 'spring', duration: 0.4 }}\r
    >\r
      <AnimatePresence initial={false} mode="sync" custom={direction}>\r
        {!isCompleted && (\r
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>\r
            {children}\r
          </SlideTransition>\r
        )}\r
      </AnimatePresence>\r
    </motion.div>\r
  );\r
}\r
\r
interface SlideTransitionProps {\r
  children: ReactNode;\r
  direction: number;\r
  onHeightReady: (h: number) => void;\r
}\r
\r
function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
\r
  useLayoutEffect(() => {\r
    if (containerRef.current) {\r
      onHeightReady(containerRef.current.offsetHeight);\r
    }\r
  }, [children, onHeightReady]);\r
\r
  return (\r
    <motion.div\r
      ref={containerRef}\r
      custom={direction}\r
      variants={stepVariants}\r
      initial="enter"\r
      animate="center"\r
      exit="exit"\r
      transition={{ duration: 0.4 }}\r
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
}\r
\r
const stepVariants: Variants = {\r
  enter: (dir: number) => ({\r
    x: dir >= 0 ? '-100%' : '100%',\r
    opacity: 0\r
  }),\r
  center: {\r
    x: '0%',\r
    opacity: 1\r
  },\r
  exit: (dir: number) => ({\r
    x: dir >= 0 ? '50%' : '-50%',\r
    opacity: 0\r
  })\r
};\r
\r
interface StepProps {\r
  children: ReactNode;\r
}\r
\r
export function Step({ children }: StepProps): JSX.Element {\r
  return <div className="step-default">{children}</div>;\r
}\r
\r
interface StepIndicatorProps {\r
  step: number;\r
  currentStep: number;\r
  onClickStep: (step: number) => void;\r
  disableStepIndicators?: boolean;\r
}\r
\r
function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }: StepIndicatorProps) {\r
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';\r
\r
  const handleClick = () => {\r
    if (step !== currentStep && !disableStepIndicators) {\r
      onClickStep(step);\r
    }\r
  };\r
\r
  return (\r
    <motion.div onClick={handleClick} className="step-indicator" animate={status} initial={false}>\r
      <motion.div\r
        variants={{\r
          inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },\r
          active: { scale: 1, backgroundColor: '#5227FF', color: '#5227FF' },\r
          complete: { scale: 1, backgroundColor: '#5227FF', color: '#3b82f6' }\r
        }}\r
        transition={{ duration: 0.3 }}\r
        className="step-indicator-inner"\r
      >\r
        {status === 'complete' ? (\r
          <CheckIcon className="check-icon" />\r
        ) : status === 'active' ? (\r
          <div className="active-dot" />\r
        ) : (\r
          <span className="step-number">{step}</span>\r
        )}\r
      </motion.div>\r
    </motion.div>\r
  );\r
}\r
\r
interface StepConnectorProps {\r
  isComplete: boolean;\r
}\r
\r
function StepConnector({ isComplete }: StepConnectorProps) {\r
  const lineVariants: Variants = {\r
    incomplete: { width: 0, backgroundColor: 'transparent' },\r
    complete: { width: '100%', backgroundColor: '#5227FF' }\r
  };\r
\r
  return (\r
    <div className="step-connector">\r
      <motion.div\r
        className="step-connector-inner"\r
        variants={lineVariants}\r
        initial={false}\r
        animate={isComplete ? 'complete' : 'incomplete'}\r
        transition={{ duration: 0.4 }}\r
      />\r
    </div>\r
  );\r
}\r
\r
interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}\r
\r
function CheckIcon(props: CheckIconProps) {\r
  return (\r
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">\r
      <motion.path\r
        initial={{ pathLength: 0 }}\r
        animate={{ pathLength: 1 }}\r
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}\r
        strokeLinecap="round"\r
        strokeLinejoin="round"\r
        d="M5 13l4 4L19 7"\r
      />\r
    </svg>\r
  );\r
}\r
`,oe=`import React, { useState, Children, useRef, useLayoutEffect, HTMLAttributes, ReactNode } from 'react';\r
import { motion, AnimatePresence, Variants } from 'motion/react';\r
\r
interface StepperProps extends HTMLAttributes<HTMLDivElement> {\r
  children: ReactNode;\r
  initialStep?: number;\r
  onStepChange?: (step: number) => void;\r
  onFinalStepCompleted?: () => void;\r
  stepCircleContainerClassName?: string;\r
  stepContainerClassName?: string;\r
  contentClassName?: string;\r
  footerClassName?: string;\r
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;\r
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;\r
  backButtonText?: string;\r
  nextButtonText?: string;\r
  disableStepIndicators?: boolean;\r
  renderStepIndicator?: (props: {\r
    step: number;\r
    currentStep: number;\r
    onStepClick: (clicked: number) => void;\r
  }) => ReactNode;\r
}\r
\r
export default function Stepper({\r
  children,\r
  initialStep = 1,\r
  onStepChange = () => {},\r
  onFinalStepCompleted = () => {},\r
  stepCircleContainerClassName = '',\r
  stepContainerClassName = '',\r
  contentClassName = '',\r
  footerClassName = '',\r
  backButtonProps = {},\r
  nextButtonProps = {},\r
  backButtonText = 'Back',\r
  nextButtonText = 'Continue',\r
  disableStepIndicators = false,\r
  renderStepIndicator,\r
  ...rest\r
}: StepperProps) {\r
  const [currentStep, setCurrentStep] = useState<number>(initialStep);\r
  const [direction, setDirection] = useState<number>(0);\r
  const stepsArray = Children.toArray(children);\r
  const totalSteps = stepsArray.length;\r
  const isCompleted = currentStep > totalSteps;\r
  const isLastStep = currentStep === totalSteps;\r
\r
  const updateStep = (newStep: number) => {\r
    setCurrentStep(newStep);\r
    if (newStep > totalSteps) {\r
      onFinalStepCompleted();\r
    } else {\r
      onStepChange(newStep);\r
    }\r
  };\r
\r
  const handleBack = () => {\r
    if (currentStep > 1) {\r
      setDirection(-1);\r
      updateStep(currentStep - 1);\r
    }\r
  };\r
\r
  const handleNext = () => {\r
    if (!isLastStep) {\r
      setDirection(1);\r
      updateStep(currentStep + 1);\r
    }\r
  };\r
\r
  const handleComplete = () => {\r
    setDirection(1);\r
    updateStep(totalSteps + 1);\r
  };\r
\r
  return (\r
    <div\r
      className="flex min-h-full flex-1 flex-col items-center justify-center p-4 sm:aspect-[4/3] md:aspect-[2/1]"\r
      {...rest}\r
    >\r
      <div\r
        className={\`mx-auto w-full max-w-md rounded-4xl shadow-xl \${stepCircleContainerClassName}\`}\r
        style={{ border: '1px solid #222' }}\r
      >\r
        <div className={\`\${stepContainerClassName} flex w-full items-center p-8\`}>\r
          {stepsArray.map((_, index) => {\r
            const stepNumber = index + 1;\r
            const isNotLastStep = index < totalSteps - 1;\r
            return (\r
              <React.Fragment key={stepNumber}>\r
                {renderStepIndicator ? (\r
                  renderStepIndicator({\r
                    step: stepNumber,\r
                    currentStep,\r
                    onStepClick: clicked => {\r
                      setDirection(clicked > currentStep ? 1 : -1);\r
                      updateStep(clicked);\r
                    }\r
                  })\r
                ) : (\r
                  <StepIndicator\r
                    step={stepNumber}\r
                    disableStepIndicators={disableStepIndicators}\r
                    currentStep={currentStep}\r
                    onClickStep={clicked => {\r
                      setDirection(clicked > currentStep ? 1 : -1);\r
                      updateStep(clicked);\r
                    }}\r
                  />\r
                )}\r
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}\r
              </React.Fragment>\r
            );\r
          })}\r
        </div>\r
\r
        <StepContentWrapper\r
          isCompleted={isCompleted}\r
          currentStep={currentStep}\r
          direction={direction}\r
          className={\`space-y-2 px-8 \${contentClassName}\`}\r
        >\r
          {stepsArray[currentStep - 1]}\r
        </StepContentWrapper>\r
\r
        {!isCompleted && (\r
          <div className={\`px-8 pb-8 \${footerClassName}\`}>\r
            <div className={\`mt-10 flex \${currentStep !== 1 ? 'justify-between' : 'justify-end'}\`}>\r
              {currentStep !== 1 && (\r
                <button\r
                  onClick={handleBack}\r
                  className={\`duration-350 rounded px-2 py-1 transition \${\r
                    currentStep === 1\r
                      ? 'pointer-events-none opacity-50 text-neutral-400'\r
                      : 'text-neutral-400 hover:text-neutral-700'\r
                  }\`}\r
                  {...backButtonProps}\r
                >\r
                  {backButtonText}\r
                </button>\r
              )}\r
              <button\r
                onClick={isLastStep ? handleComplete : handleNext}\r
                className="duration-350 flex items-center justify-center rounded-full bg-green-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-green-600 active:bg-green-700"\r
                {...nextButtonProps}\r
              >\r
                {isLastStep ? 'Complete' : nextButtonText}\r
              </button>\r
            </div>\r
          </div>\r
        )}\r
      </div>\r
    </div>\r
  );\r
}\r
\r
interface StepContentWrapperProps {\r
  isCompleted: boolean;\r
  currentStep: number;\r
  direction: number;\r
  children: ReactNode;\r
  className?: string;\r
}\r
\r
function StepContentWrapper({\r
  isCompleted,\r
  currentStep,\r
  direction,\r
  children,\r
  className = ''\r
}: StepContentWrapperProps) {\r
  const [parentHeight, setParentHeight] = useState<number>(0);\r
\r
  return (\r
    <motion.div\r
      style={{ position: 'relative', overflow: 'hidden' }}\r
      animate={{ height: isCompleted ? 0 : parentHeight }}\r
      transition={{ type: 'spring', duration: 0.4 }}\r
      className={className}\r
    >\r
      <AnimatePresence initial={false} mode="sync" custom={direction}>\r
        {!isCompleted && (\r
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>\r
            {children}\r
          </SlideTransition>\r
        )}\r
      </AnimatePresence>\r
    </motion.div>\r
  );\r
}\r
\r
interface SlideTransitionProps {\r
  children: ReactNode;\r
  direction: number;\r
  onHeightReady: (height: number) => void;\r
}\r
\r
function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {\r
  const containerRef = useRef<HTMLDivElement | null>(null);\r
\r
  useLayoutEffect(() => {\r
    if (containerRef.current) {\r
      onHeightReady(containerRef.current.offsetHeight);\r
    }\r
  }, [children, onHeightReady]);\r
\r
  return (\r
    <motion.div\r
      ref={containerRef}\r
      custom={direction}\r
      variants={stepVariants}\r
      initial="enter"\r
      animate="center"\r
      exit="exit"\r
      transition={{ duration: 0.4 }}\r
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}\r
    >\r
      {children}\r
    </motion.div>\r
  );\r
}\r
\r
const stepVariants: Variants = {\r
  enter: (dir: number) => ({\r
    x: dir >= 0 ? '-100%' : '100%',\r
    opacity: 0\r
  }),\r
  center: {\r
    x: '0%',\r
    opacity: 1\r
  },\r
  exit: (dir: number) => ({\r
    x: dir >= 0 ? '50%' : '-50%',\r
    opacity: 0\r
  })\r
};\r
\r
interface StepProps {\r
  children: ReactNode;\r
}\r
\r
export function Step({ children }: StepProps) {\r
  return <div className="px-8">{children}</div>;\r
}\r
\r
interface StepIndicatorProps {\r
  step: number;\r
  currentStep: number;\r
  onClickStep: (clicked: number) => void;\r
  disableStepIndicators?: boolean;\r
}\r
\r
function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators = false }: StepIndicatorProps) {\r
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';\r
\r
  const handleClick = () => {\r
    if (step !== currentStep && !disableStepIndicators) {\r
      onClickStep(step);\r
    }\r
  };\r
\r
  return (\r
    <motion.div\r
      onClick={handleClick}\r
      className="relative cursor-pointer outline-none focus:outline-none"\r
      animate={status}\r
      initial={false}\r
    >\r
      <motion.div\r
        variants={{\r
          inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },\r
          active: { scale: 1, backgroundColor: '#5227FF', color: '#5227FF' },\r
          complete: { scale: 1, backgroundColor: '#5227FF', color: '#3b82f6' }\r
        }}\r
        transition={{ duration: 0.3 }}\r
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"\r
      >\r
        {status === 'complete' ? (\r
          <CheckIcon className="h-4 w-4 text-black" />\r
        ) : status === 'active' ? (\r
          <div className="h-3 w-3 rounded-full bg-[#060010]" />\r
        ) : (\r
          <span className="text-sm">{step}</span>\r
        )}\r
      </motion.div>\r
    </motion.div>\r
  );\r
}\r
\r
interface StepConnectorProps {\r
  isComplete: boolean;\r
}\r
\r
function StepConnector({ isComplete }: StepConnectorProps) {\r
  const lineVariants: Variants = {\r
    incomplete: { width: 0, backgroundColor: 'transparent' },\r
    complete: { width: '100%', backgroundColor: '#5227FF' }\r
  };\r
\r
  return (\r
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-neutral-600">\r
      <motion.div\r
        className="absolute left-0 top-0 h-full"\r
        variants={lineVariants}\r
        initial={false}\r
        animate={isComplete ? 'complete' : 'incomplete'}\r
        transition={{ duration: 0.4 }}\r
      />\r
    </div>\r
  );\r
}\r
\r
interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}\r
\r
function CheckIcon(props: CheckIconProps) {\r
  return (\r
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">\r
      <motion.path\r
        initial={{ pathLength: 0 }}\r
        animate={{ pathLength: 1 }}\r
        transition={{\r
          delay: 0.1,\r
          type: 'tween',\r
          ease: 'easeOut',\r
          duration: 0.3\r
        }}\r
        strokeLinecap="round"\r
        strokeLinejoin="round"\r
        d="M5 13l4 4L19 7"\r
      />\r
    </svg>\r
  );\r
}\r
`,ae={dependencies:"motion",usage:`import Stepper, { Step } from './Stepper';
  
<Stepper
  initialStep={1}
  onStepChange={(step) => {
    console.log(step);
  }}
  onFinalStepCompleted={() => console.log("All steps completed!")}
  backButtonText="Previous"
  nextButtonText="Next"
>
  <Step>
    <h2>Welcome to the React Bits stepper!</h2>
    <p>Check out the next step!</p>
  </Step>
  <Step>
    <h2>Step 2</h2>
    <img style={{ height: '100px', width: '100%', objectFit: 'cover', objectPosition: 'center -70px', borderRadius: '15px', marginTop: '1em' }} src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" />
    <p>Custom step content!</p>
  </Step>
  <Step>
    <h2>How about an input?</h2>
    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
  </Step>
  <Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step>
</Stepper>`,code:re,css:te,tailwind:ne,tsCode:ie,tsTailwind:oe},de=()=>{const[r,n]=c.useState(""),[i,o]=c.useState(1),s=[{name:"children",type:"ReactNode",default:"—",description:"The Step components (or any custom content) rendered inside the stepper."},{name:"initialStep",type:"number",default:"1",description:"The first step to display when the stepper is initialized."},{name:"onStepChange",type:"(step: number) => void",default:"() => {}",description:"Callback fired whenever the step changes."},{name:"onFinalStepCompleted",type:"() => void",default:"() => {}",description:"Callback fired when the stepper completes its final step."},{name:"stepCircleContainerClassName",type:"string",default:"",description:"Custom class name for the container holding the step indicators."},{name:"stepContainerClassName",type:"string",default:"",description:"Custom class name for the row holding the step circles/connectors."},{name:"contentClassName",type:"string",default:"",description:"Custom class name for the step’s main content container."},{name:"footerClassName",type:"string",default:"",description:"Custom class name for the footer area containing navigation buttons."},{name:"backButtonProps",type:"object",default:"{}",description:"Extra props passed to the Back button."},{name:"nextButtonProps",type:"object",default:"{}",description:"Extra props passed to the Next/Complete button."},{name:"backButtonText",type:"string",default:'"Back"',description:"Text for the Back button."},{name:"nextButtonText",type:"string",default:'"Continue"',description:"Text for the Next button when not on the last step."},{name:"disableStepIndicators",type:"boolean",default:"false",description:"Disables click interaction on step indicators."},{name:"renderStepIndicator",type:"{}",default:"undefined",description:"Renders a custom step indicator."}];return e.jsxs(_,{children:[e.jsxs(G,{children:[e.jsx(E,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:e.jsxs(J,{initialStep:i,onStepChange:a=>{a===4?(r?f(`👋🏻 Hello ${r}!`):f("You didn't provide your name :("),o(4)):(f(`✅ Step ${a}!`),o(a))},onFinalStepCompleted:()=>f("✅ All steps completed!"),nextButtonProps:{disabled:i===3&&!r},disableStepIndicators:i===3&&!r,backButtonText:"Previous",nextButtonText:"Next",children:[e.jsxs(C,{children:[e.jsx(w,{color:"#5227FF",fontSize:"1.2rem",fontWeight:600,children:"Welcome to the React Bits stepper!"}),e.jsx("p",{children:"Check out the next step!"})]}),e.jsxs(C,{children:[e.jsx("h2",{children:"Step 2"}),e.jsx("img",{style:{height:"100px",width:"100%",objectFit:"cover",objectPosition:"center -70px",borderRadius:"15px",marginTop:"1em"},src:"https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"}),e.jsx("p",{style:{marginTop:"1em"},children:"Custom step content!"})]}),e.jsxs(C,{children:[e.jsx("h2",{children:"How about an input?"}),e.jsx(M,{value:r,onChange:a=>n(a.target.value),mt:2,placeholder:"Your name?"})]}),e.jsxs(C,{children:[e.jsx(w,{color:"#5227FF",fontSize:"1.2rem",fontWeight:600,children:"Final Step"}),e.jsx("p",{children:"You made it!"})]})]})}),e.jsx(O,{data:s}),e.jsx(q,{dependencyList:["motion"]})]}),e.jsx(Y,{children:e.jsx(z,{codeObject:ae})})]})};export{de as default};
