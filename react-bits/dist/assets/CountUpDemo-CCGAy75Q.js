import{r as p,j as n,B as g,b8 as r,F as t,a as h,L as x}from"./index-wsKSLPNH.js";import{T as b,P as D,a as V,C as y,b as w}from"./PropTable-C4uPWs8h.js";import{G as I}from"./GradientText-EsAXXgs6.js";import{R as e}from"./RefreshButton-CA3SFRlq.js";import{D as S}from"./Dependencies-BHoMfJUj.js";import{u as o}from"./useForceRerender-BCFU-k0M.js";import"./index-Bpz4cGEA.js";const N=`import { useEffect, useRef } from 'react';\r
import { useInView, useMotionValue, useSpring } from 'motion/react';\r
\r
export default function CountUp({\r
  to,\r
  from = 0,\r
  direction = 'up',\r
  delay = 0,\r
  duration = 2,\r
  className = '',\r
  startWhen = true,\r
  separator = '',\r
  onStart,\r
  onEnd\r
}) {\r
  const ref = useRef(null);\r
  const motionValue = useMotionValue(direction === 'down' ? to : from);\r
\r
  const damping = 20 + 40 * (1 / duration);\r
  const stiffness = 100 * (1 / duration);\r
\r
  const springValue = useSpring(motionValue, {\r
    damping,\r
    stiffness\r
  });\r
\r
  const isInView = useInView(ref, { once: true, margin: '0px' });\r
\r
  const getDecimalPlaces = num => {\r
    const str = num.toString();\r
\r
    if (str.includes('.')) {\r
      const decimals = str.split('.')[1];\r
\r
      if (parseInt(decimals) !== 0) {\r
        return decimals.length;\r
      }\r
    }\r
\r
    return 0;\r
  };\r
\r
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));\r
\r
  useEffect(() => {\r
    if (ref.current) {\r
      ref.current.textContent = String(direction === 'down' ? to : from);\r
    }\r
  }, [from, to, direction]);\r
\r
  useEffect(() => {\r
    if (isInView && startWhen) {\r
      if (typeof onStart === 'function') onStart();\r
\r
      const timeoutId = setTimeout(() => {\r
        motionValue.set(direction === 'down' ? from : to);\r
      }, delay * 1000);\r
\r
      const durationTimeoutId = setTimeout(\r
        () => {\r
          if (typeof onEnd === 'function') onEnd();\r
        },\r
        delay * 1000 + duration * 1000\r
      );\r
\r
      return () => {\r
        clearTimeout(timeoutId);\r
        clearTimeout(durationTimeoutId);\r
      };\r
    }\r
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);\r
\r
  useEffect(() => {\r
    const unsubscribe = springValue.on('change', latest => {\r
      if (ref.current) {\r
        const hasDecimals = maxDecimals > 0;\r
\r
        const options = {\r
          useGrouping: !!separator,\r
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,\r
          maximumFractionDigits: hasDecimals ? maxDecimals : 0\r
        };\r
\r
        const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);\r
\r
        ref.current.textContent = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;\r
      }\r
    });\r
\r
    return () => unsubscribe();\r
  }, [springValue, separator, maxDecimals]);\r
\r
  return <span className={className} ref={ref} />;\r
}\r
`,E=`import { useEffect, useRef } from 'react';\r
import { useInView, useMotionValue, useSpring } from 'motion/react';\r
\r
export default function CountUp({\r
  to,\r
  from = 0,\r
  direction = 'up',\r
  delay = 0,\r
  duration = 2,\r
  className = '',\r
  startWhen = true,\r
  separator = '',\r
  onStart,\r
  onEnd\r
}) {\r
  const ref = useRef(null);\r
  const motionValue = useMotionValue(direction === 'down' ? to : from);\r
\r
  const damping = 20 + 40 * (1 / duration);\r
  const stiffness = 100 * (1 / duration);\r
\r
  const springValue = useSpring(motionValue, {\r
    damping,\r
    stiffness\r
  });\r
\r
  const isInView = useInView(ref, { once: true, margin: '0px' });\r
\r
  const getDecimalPlaces = num => {\r
    const str = num.toString();\r
\r
    if (str.includes('.')) {\r
      const decimals = str.split('.')[1];\r
\r
      if (parseInt(decimals) !== 0) {\r
        return decimals.length;\r
      }\r
    }\r
\r
    return 0;\r
  };\r
\r
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));\r
\r
  useEffect(() => {\r
    if (ref.current) {\r
      ref.current.textContent = String(direction === 'down' ? to : from);\r
    }\r
  }, [from, to, direction]);\r
\r
  useEffect(() => {\r
    if (isInView && startWhen) {\r
      if (typeof onStart === 'function') onStart();\r
\r
      const timeoutId = setTimeout(() => {\r
        motionValue.set(direction === 'down' ? from : to);\r
      }, delay * 1000);\r
\r
      const durationTimeoutId = setTimeout(\r
        () => {\r
          if (typeof onEnd === 'function') onEnd();\r
        },\r
        delay * 1000 + duration * 1000\r
      );\r
\r
      return () => {\r
        clearTimeout(timeoutId);\r
        clearTimeout(durationTimeoutId);\r
      };\r
    }\r
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);\r
\r
  useEffect(() => {\r
    const unsubscribe = springValue.on('change', latest => {\r
      if (ref.current) {\r
        const hasDecimals = maxDecimals > 0;\r
\r
        const options = {\r
          useGrouping: !!separator,\r
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,\r
          maximumFractionDigits: hasDecimals ? maxDecimals : 0\r
        };\r
\r
        const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);\r
\r
        ref.current.textContent = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;\r
      }\r
    });\r
\r
    return () => unsubscribe();\r
  }, [springValue, separator, maxDecimals]);\r
\r
  return <span className={className} ref={ref} />;\r
}\r
`,C=`import { useEffect, useRef } from 'react';\r
import { useInView, useMotionValue, useSpring } from 'motion/react';\r
\r
interface CountUpProps {\r
  to: number;\r
  from?: number;\r
  direction?: 'up' | 'down';\r
  delay?: number;\r
  duration?: number;\r
  className?: string;\r
  startWhen?: boolean;\r
  separator?: string;\r
  onStart?: () => void;\r
  onEnd?: () => void;\r
}\r
\r
export default function CountUp({\r
  to,\r
  from = 0,\r
  direction = 'up',\r
  delay = 0,\r
  duration = 2,\r
  className = '',\r
  startWhen = true,\r
  separator = '',\r
  onStart,\r
  onEnd\r
}: CountUpProps) {\r
  const ref = useRef<HTMLSpanElement>(null);\r
  const motionValue = useMotionValue(direction === 'down' ? to : from);\r
\r
  const damping = 20 + 40 * (1 / duration);\r
  const stiffness = 100 * (1 / duration);\r
\r
  const springValue = useSpring(motionValue, {\r
    damping,\r
    stiffness\r
  });\r
\r
  const isInView = useInView(ref, { once: true, margin: '0px' });\r
\r
  const getDecimalPlaces = (num: number): number => {\r
    const str = num.toString();\r
    if (str.includes('.')) {\r
      const decimals = str.split('.')[1];\r
      if (parseInt(decimals) !== 0) {\r
        return decimals.length;\r
      }\r
    }\r
    return 0;\r
  };\r
\r
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));\r
\r
  useEffect(() => {\r
    if (ref.current) {\r
      ref.current.textContent = String(direction === 'down' ? to : from);\r
    }\r
  }, [from, to, direction]);\r
\r
  useEffect(() => {\r
    if (isInView && startWhen) {\r
      if (typeof onStart === 'function') {\r
        onStart();\r
      }\r
\r
      const timeoutId = setTimeout(() => {\r
        motionValue.set(direction === 'down' ? from : to);\r
      }, delay * 1000);\r
\r
      const durationTimeoutId = setTimeout(\r
        () => {\r
          if (typeof onEnd === 'function') {\r
            onEnd();\r
          }\r
        },\r
        delay * 1000 + duration * 1000\r
      );\r
\r
      return () => {\r
        clearTimeout(timeoutId);\r
        clearTimeout(durationTimeoutId);\r
      };\r
    }\r
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);\r
\r
  useEffect(() => {\r
    const unsubscribe = springValue.on('change', latest => {\r
      if (ref.current) {\r
        const hasDecimals = maxDecimals > 0;\r
\r
        const options: Intl.NumberFormatOptions = {\r
          useGrouping: !!separator,\r
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,\r
          maximumFractionDigits: hasDecimals ? maxDecimals : 0\r
        };\r
\r
        const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);\r
\r
        ref.current.textContent = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;\r
      }\r
    });\r
\r
    return () => unsubscribe();\r
  }, [springValue, separator, maxDecimals]);\r
\r
  return <span className={className} ref={ref} />;\r
}\r
`,T=`import { useEffect, useRef } from 'react';\r
import { useInView, useMotionValue, useSpring } from 'motion/react';\r
\r
interface CountUpProps {\r
  to: number;\r
  from?: number;\r
  direction?: 'up' | 'down';\r
  delay?: number;\r
  duration?: number;\r
  className?: string;\r
  startWhen?: boolean;\r
  separator?: string;\r
  onStart?: () => void;\r
  onEnd?: () => void;\r
}\r
\r
export default function CountUp({\r
  to,\r
  from = 0,\r
  direction = 'up',\r
  delay = 0,\r
  duration = 2,\r
  className = '',\r
  startWhen = true,\r
  separator = '',\r
  onStart,\r
  onEnd\r
}: CountUpProps) {\r
  const ref = useRef<HTMLSpanElement>(null);\r
  const motionValue = useMotionValue(direction === 'down' ? to : from);\r
\r
  const damping = 20 + 40 * (1 / duration);\r
  const stiffness = 100 * (1 / duration);\r
\r
  const springValue = useSpring(motionValue, {\r
    damping,\r
    stiffness\r
  });\r
\r
  const isInView = useInView(ref, { once: true, margin: '0px' });\r
\r
  const getDecimalPlaces = (num: number): number => {\r
    const str = num.toString();\r
    if (str.includes('.')) {\r
      const decimals = str.split('.')[1];\r
      if (parseInt(decimals) !== 0) {\r
        return decimals.length;\r
      }\r
    }\r
    return 0;\r
  };\r
\r
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));\r
\r
  useEffect(() => {\r
    if (ref.current) {\r
      ref.current.textContent = String(direction === 'down' ? to : from);\r
    }\r
  }, [from, to, direction]);\r
\r
  useEffect(() => {\r
    if (isInView && startWhen) {\r
      if (typeof onStart === 'function') {\r
        onStart();\r
      }\r
\r
      const timeoutId = setTimeout(() => {\r
        motionValue.set(direction === 'down' ? from : to);\r
      }, delay * 1000);\r
\r
      const durationTimeoutId = setTimeout(\r
        () => {\r
          if (typeof onEnd === 'function') {\r
            onEnd();\r
          }\r
        },\r
        delay * 1000 + duration * 1000\r
      );\r
\r
      return () => {\r
        clearTimeout(timeoutId);\r
        clearTimeout(durationTimeoutId);\r
      };\r
    }\r
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);\r
\r
  useEffect(() => {\r
    const unsubscribe = springValue.on('change', latest => {\r
      if (ref.current) {\r
        const hasDecimals = maxDecimals > 0;\r
\r
        const options: Intl.NumberFormatOptions = {\r
          useGrouping: !!separator,\r
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,\r
          maximumFractionDigits: hasDecimals ? maxDecimals : 0\r
        };\r
\r
        const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);\r
\r
        ref.current.textContent = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;\r
      }\r
    });\r
\r
    return () => unsubscribe();\r
  }, [springValue, separator, maxDecimals]);\r
\r
  return <span className={className} ref={ref} />;\r
}\r
`,j={dependencies:"motion",usage:`import CountUp from './CountUp'

<CountUp
  from={0}
  to={100}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>`,code:N,tailwind:E,tsCode:C,tsTailwind:T},v=()=>{const[a,i]=p.useState(!1),[s,c]=o(),[u,m]=o(),[l,d]=o(),f=[{name:"to",type:"number",default:"—",description:"The target number to count up to."},{name:"from",type:"number",default:"0",description:"The initial number from which the count starts."},{name:"direction",type:"string",default:'"up"',description:'Direction of the count; can be "up" or "down". When this is set to "down", "from" and "to" become reversed, in order to count down.'},{name:"delay",type:"number",default:"0",description:"Delay in seconds before the counting starts."},{name:"duration",type:"number",default:"2",description:"Duration of the count animation - based on the damping and stiffness configured inside the component."},{name:"className",type:"string",default:'""',description:"CSS class to apply to the component for additional styling."},{name:"startWhen",type:"boolean",default:"true",description:"A boolean to control whether the animation should start when the component is in view. It basically works like an if statement, if this is true, the count will start."},{name:"separator",type:"string",default:'""',description:"Character to use as a thousands separator in the displayed number."},{name:"onStart",type:"function",default:"—",description:"Callback function that is called when the count animation starts."},{name:"onEnd",type:"function",default:"—",description:"Callback function that is called when the count animation ends."}];return n.jsxs(b,{children:[n.jsxs(D,{children:[n.jsx("h2",{className:"demo-title-extra",children:"Default"}),n.jsxs(g,{position:"relative",className:"demo-container",minH:200,children:[n.jsx(r,{from:0,to:100,separator:",",direction:"up",duration:1,className:"count-up-text"},s),n.jsx(e,{onClick:c})]}),n.jsx("h2",{className:"demo-title-extra",children:"Start Programatically"}),n.jsxs(t,{direction:"column",justifyContent:"center",alignItems:"center",position:"relative",className:"demo-container",minH:200,children:[n.jsx(h,{bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",color:"#fff",onClick:()=>i(!0),children:"Count to 500!"}),n.jsx(r,{from:100,to:500,startWhen:a,duration:5,className:"count-up-text"},u),a&&n.jsx(e,{onClick:m})]}),n.jsx("h2",{className:"demo-title-extra",children:"With Gradient"}),n.jsx("p",{className:"demo-extra-info",children:n.jsx(t,{children:n.jsxs("span",{children:["You can wrap the counter with other components such as ",n.jsx(x,{style:{display:"inline",whiteSpace:"nowrap"},to:"/text-animations/gradient-text/",children:"<GradientText />"})]})})}),n.jsxs(t,{direction:"column",justifyContent:"center",alignItems:"center",position:"relative",className:"demo-container",minH:200,children:[n.jsx(I,{children:n.jsx(r,{from:0,to:100,separator:",",duration:1,className:"count-up-text"},l)}),n.jsx(e,{onClick:d})]}),n.jsx(V,{data:f}),n.jsx(S,{dependencyList:["motion"]})]}),n.jsx(y,{children:n.jsx(w,{codeObject:j})})]})};export{v as default};
