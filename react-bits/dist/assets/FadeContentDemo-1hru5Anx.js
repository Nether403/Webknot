import{r as t,j as e,B as y,c as v,F as g}from"./index-wsKSLPNH.js";import{T as x,P as C,a as w,C as F,b as O}from"./PropTable-C4uPWs8h.js";import{R as I}from"./RefreshButton-CA3SFRlq.js";import{u as N}from"./useForceRerender-BCFU-k0M.js";import{P as i}from"./PreviewSlider-m1G_aiYP.js";import{P as R}from"./PreviewSwitch-DqnF708j.js";import{C as V}from"./Customize-1m_ZNqR9.js";import"./index-Bpz4cGEA.js";const j=`import { useRef, useEffect, useState } from 'react';\r
\r
const FadeContent = ({\r
  children,\r
  blur = false,\r
  duration = 1000,\r
  easing = 'ease-out',\r
  delay = 0,\r
  threshold = 0.1,\r
  initialOpacity = 0,\r
  className = ''\r
}) => {\r
  const [inView, setInView] = useState(false);\r
  const ref = useRef(null);\r
\r
  useEffect(() => {\r
    if (!ref.current) return;\r
\r
    const observer = new IntersectionObserver(\r
      ([entry]) => {\r
        if (entry.isIntersecting) {\r
          observer.unobserve(ref.current);\r
          setTimeout(() => {\r
            setInView(true);\r
          }, delay);\r
        }\r
      },\r
      { threshold }\r
    );\r
\r
    observer.observe(ref.current);\r
\r
    return () => observer.disconnect();\r
  }, [threshold, delay]);\r
\r
  return (\r
    <div\r
      ref={ref}\r
      className={className}\r
      style={{\r
        opacity: inView ? 1 : initialOpacity,\r
        transition: \`opacity \${duration}ms \${easing}, filter \${duration}ms \${easing}\`,\r
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none'\r
      }}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default FadeContent;\r
`,S=`import { useRef, useEffect, useState } from 'react';\r
\r
const FadeContent = ({\r
  children,\r
  blur = false,\r
  duration = 1000,\r
  easing = 'ease-out',\r
  delay = 0,\r
  threshold = 0.1,\r
  initialOpacity = 0,\r
  className = ''\r
}) => {\r
  const [inView, setInView] = useState(false);\r
  const ref = useRef(null);\r
\r
  useEffect(() => {\r
    if (!ref.current) return;\r
\r
    const observer = new IntersectionObserver(\r
      ([entry]) => {\r
        if (entry.isIntersecting) {\r
          observer.unobserve(ref.current);\r
          setTimeout(() => {\r
            setInView(true);\r
          }, delay);\r
        }\r
      },\r
      { threshold }\r
    );\r
\r
    observer.observe(ref.current);\r
\r
    return () => observer.disconnect();\r
  }, [threshold, delay]);\r
\r
  return (\r
    <div\r
      ref={ref}\r
      className={className}\r
      style={{\r
        opacity: inView ? 1 : initialOpacity,\r
        transition: \`opacity \${duration}ms \${easing}, filter \${duration}ms \${easing}\`,\r
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none'\r
      }}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default FadeContent;\r
`,$=`import { useRef, useEffect, useState, ReactNode } from 'react';\r
\r
interface FadeContentProps {\r
  children: ReactNode;\r
  blur?: boolean;\r
  duration?: number;\r
  easing?: string;\r
  delay?: number;\r
  threshold?: number;\r
  initialOpacity?: number;\r
  className?: string;\r
}\r
\r
const FadeContent: React.FC<FadeContentProps> = ({\r
  children,\r
  blur = false,\r
  duration = 1000,\r
  easing = 'ease-out',\r
  delay = 0,\r
  threshold = 0.1,\r
  initialOpacity = 0,\r
  className = ''\r
}) => {\r
  const [inView, setInView] = useState(false);\r
  const ref = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    const element = ref.current;\r
    if (!element) return;\r
\r
    const observer = new IntersectionObserver(\r
      ([entry]) => {\r
        if (entry.isIntersecting) {\r
          observer.unobserve(element);\r
          setTimeout(() => {\r
            setInView(true);\r
          }, delay);\r
        }\r
      },\r
      { threshold }\r
    );\r
\r
    observer.observe(element);\r
\r
    return () => observer.disconnect();\r
  }, [threshold, delay]);\r
\r
  return (\r
    <div\r
      ref={ref}\r
      className={className}\r
      style={{\r
        opacity: inView ? 1 : initialOpacity,\r
        transition: \`opacity \${duration}ms \${easing}, filter \${duration}ms \${easing}\`,\r
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none'\r
      }}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default FadeContent;\r
`,E=`import { useRef, useEffect, useState, ReactNode } from 'react';\r
\r
interface FadeContentProps {\r
  children: ReactNode;\r
  blur?: boolean;\r
  duration?: number;\r
  easing?: string;\r
  delay?: number;\r
  threshold?: number;\r
  initialOpacity?: number;\r
  className?: string;\r
}\r
\r
const FadeContent: React.FC<FadeContentProps> = ({\r
  children,\r
  blur = false,\r
  duration = 1000,\r
  easing = 'ease-out',\r
  delay = 0,\r
  threshold = 0.1,\r
  initialOpacity = 0,\r
  className = ''\r
}) => {\r
  const [inView, setInView] = useState(false);\r
  const ref = useRef<HTMLDivElement | null>(null);\r
\r
  useEffect(() => {\r
    const element = ref.current;\r
    if (!element) return;\r
\r
    const observer = new IntersectionObserver(\r
      ([entry]) => {\r
        if (entry.isIntersecting) {\r
          observer.unobserve(element);\r
          setTimeout(() => {\r
            setInView(true);\r
          }, delay);\r
        }\r
      },\r
      { threshold }\r
    );\r
\r
    observer.observe(element);\r
\r
    return () => observer.disconnect();\r
  }, [threshold, delay]);\r
\r
  return (\r
    <div\r
      ref={ref}\r
      className={className}\r
      style={{\r
        opacity: inView ? 1 : initialOpacity,\r
        transition: \`opacity \${duration}ms \${easing}, filter \${duration}ms \${easing}\`,\r
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none'\r
      }}\r
    >\r
      {children}\r
    </div>\r
  );\r
};\r
\r
export default FadeContent;\r
`,T={usage:`import FadeContent from './FadeContent'
  
<FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
  {/* Anything placed inside this container will be fade into view */}
</FadeContent>`,code:j,tailwind:S,tsCode:$,tsTailwind:E},M=()=>{const[s,u]=t.useState(!1),[a,d]=t.useState(0),[o,f]=t.useState(1e3),[l,m]=t.useState(.1),[c,p]=t.useState(0),[b,r]=N(),h=[{name:"blur",type:"boolean",default:"false",description:"Enables a blur effect during the animation."},{name:"duration",type:"number",default:1e3,description:"Specifies the duration of the fade animation in milliseconds."},{name:"delay",type:"number",default:"0",description:"Adds a delay in milliseconds before triggering the animation."},{name:"easing",type:"string",default:"ease-out",description:"Defines the easing function for the fade transition."},{name:"threshold",type:"number",default:.1,description:"IntersectionObserver threshold for triggering the fade animation."},{name:"initialOpacity",type:"number",default:0,description:"The starting opacity of the component before it enters the viewport."},{name:"className",type:"string",default:"",description:"Custom class(es) to be added to the container."}];return e.jsxs(x,{children:[e.jsxs(C,{children:[e.jsxs(y,{position:"relative",className:"demo-container",h:400,children:[e.jsx(v,{blur:s,duration:o,delay:a,threshold:l,initialOpacity:c,children:e.jsx(g,{fontSize:"xl",fontWeight:"bolder",justifyContent:"center",alignItems:"center",color:"#fff",h:100,borderRadius:"25px",border:"1px solid #392e4e",w:200,bg:"#060010",children:"Fade"})},b),e.jsx(I,{onClick:r})]}),e.jsxs(V,{children:[e.jsx(R,{title:"Enable Blur",isChecked:s,onChange:n=>{u(n),r()}}),e.jsx(i,{title:"Duration",min:500,max:3e3,step:100,value:o,valueUnit:"ms",onChange:n=>{f(n),r()}}),e.jsx(i,{title:"Delay",min:0,max:2e3,step:100,value:a,valueUnit:"ms",onChange:n=>{d(n),r()}}),e.jsx(i,{title:"Threshold",min:.1,max:1,step:.1,value:l,onChange:n=>{m(n),r()}}),e.jsx(i,{title:"Initial Opacity",min:0,max:1,step:.1,value:c,onChange:n=>{p(n),r()}})]}),e.jsx(w,{data:h})]}),e.jsx(F,{children:e.jsx(O,{codeObject:T})})]})};export{M as default};
