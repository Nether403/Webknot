import{j as e,bx as G,r as s,by as N,q as z,B as V,F as j,a as y}from"./index-wsKSLPNH.js";import{T as k,P as w,a as $,C as D,b as F}from"./PropTable-C4uPWs8h.js";import{C as W}from"./Customize-1m_ZNqR9.js";import{P as u}from"./PreviewSlider-m1G_aiYP.js";import{D as E}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";function H({mv:r,number:n,height:i}){let d=N(r,o=>{let a=o%10,l=(10+n-a)%10,t=l*i;return l>5&&(t-=10*i),t});return e.jsx(z.span,{className:"counter-number",style:{y:d},children:n})}function B({place:r,value:n,height:i,digitStyle:d}){let o=Math.floor(n/r),a=G(o);return s.useEffect(()=>{a.set(o)},[a,o]),e.jsx("div",{className:"counter-digit",style:{height:i,...d},children:Array.from({length:10},(l,t)=>e.jsx(H,{mv:a,number:t,height:i},t))})}function M({value:r,fontSize:n=100,padding:i=0,places:d=[100,10,1],gap:o=8,borderRadius:a=4,horizontalPadding:l=8,textColor:t="white",fontWeight:S="bold",containerStyle:b,counterStyle:v,digitStyle:C,gradientHeight:c=16,gradientFrom:g="black",gradientTo:m="transparent",topGradientStyle:p,bottomGradientStyle:h}){const P=n+i,R={fontSize:n,gap:o,borderRadius:a,paddingLeft:l,paddingRight:l,color:t,fontWeight:S},x={height:c,background:`linear-gradient(to bottom, ${g}, ${m})`},T={height:c,background:`linear-gradient(to top, ${g}, ${m})`};return e.jsxs("div",{className:"counter-container",style:b,children:[e.jsx("div",{className:"counter-counter",style:{...R,...v},children:d.map(f=>e.jsx(B,{place:f,value:r,height:P,digitStyle:C},f))}),e.jsxs("div",{className:"gradient-container",children:[e.jsx("div",{className:"top-gradient",style:p||x}),e.jsx("div",{className:"bottom-gradient",style:h||T})]})]})}const A=`import { motion, useSpring, useTransform } from 'motion/react';\r
import { useEffect } from 'react';\r
\r
import './Counter.css';\r
\r
function Number({ mv, number, height }) {\r
  let y = useTransform(mv, latest => {\r
    let placeValue = latest % 10;\r
    let offset = (10 + number - placeValue) % 10;\r
    let memo = offset * height;\r
    if (offset > 5) {\r
      memo -= 10 * height;\r
    }\r
    return memo;\r
  });\r
  return (\r
    <motion.span className="counter-number" style={{ y }}>\r
      {number}\r
    </motion.span>\r
  );\r
}\r
\r
function Digit({ place, value, height, digitStyle }) {\r
  let valueRoundedToPlace = Math.floor(value / place);\r
  let animatedValue = useSpring(valueRoundedToPlace);\r
  useEffect(() => {\r
    animatedValue.set(valueRoundedToPlace);\r
  }, [animatedValue, valueRoundedToPlace]);\r
  return (\r
    <div className="counter-digit" style={{ height, ...digitStyle }}>\r
      {Array.from({ length: 10 }, (_, i) => (\r
        <Number key={i} mv={animatedValue} number={i} height={height} />\r
      ))}\r
    </div>\r
  );\r
}\r
\r
export default function Counter({\r
  value,\r
  fontSize = 100,\r
  padding = 0,\r
  places = [100, 10, 1],\r
  gap = 8,\r
  borderRadius = 4,\r
  horizontalPadding = 8,\r
  textColor = 'white',\r
  fontWeight = 'bold',\r
  containerStyle,\r
  counterStyle,\r
  digitStyle,\r
  gradientHeight = 16,\r
  gradientFrom = 'black',\r
  gradientTo = 'transparent',\r
  topGradientStyle,\r
  bottomGradientStyle\r
}) {\r
  const height = fontSize + padding;\r
  const defaultCounterStyle = {\r
    fontSize,\r
    gap: gap,\r
    borderRadius: borderRadius,\r
    paddingLeft: horizontalPadding,\r
    paddingRight: horizontalPadding,\r
    color: textColor,\r
    fontWeight: fontWeight\r
  };\r
  const defaultTopGradientStyle = {\r
    height: gradientHeight,\r
    background: \`linear-gradient(to bottom, \${gradientFrom}, \${gradientTo})\`\r
  };\r
  const defaultBottomGradientStyle = {\r
    height: gradientHeight,\r
    background: \`linear-gradient(to top, \${gradientFrom}, \${gradientTo})\`\r
  };\r
  return (\r
    <div className="counter-container" style={containerStyle}>\r
      <div className="counter-counter" style={{ ...defaultCounterStyle, ...counterStyle }}>\r
        {places.map(place => (\r
          <Digit key={place} place={place} value={value} height={height} digitStyle={digitStyle} />\r
        ))}\r
      </div>\r
      <div className="gradient-container">\r
        <div className="top-gradient" style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}></div>\r
        <div\r
          className="bottom-gradient"\r
          style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle}\r
        ></div>\r
      </div>\r
    </div>\r
  );\r
}\r
`,L=`.counter-container {\r
  position: relative;\r
  display: inline-block;\r
}\r
\r
.counter-counter {\r
  display: flex;\r
  overflow: hidden;\r
  line-height: 1;\r
}\r
\r
.counter-digit {\r
  position: relative;\r
  width: 1ch;\r
  font-variant-numeric: tabular-nums;\r
}\r
\r
.counter-number {\r
  position: absolute;\r
  top: 0;\r
  right: 0;\r
  bottom: 0;\r
  left: 0;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.gradient-container {\r
  pointer-events: none;\r
  position: absolute;\r
  top: 0;\r
  bottom: 0;\r
  left: 0;\r
  right: 0;\r
}\r
\r
.bottom-gradient {\r
  position: absolute;\r
  bottom: 0;\r
  width: 100%;\r
}\r
`,_=`import { motion, useSpring, useTransform } from 'motion/react';\r
import { useEffect } from 'react';\r
\r
function Number({ mv, number, height }) {\r
  let y = useTransform(mv, latest => {\r
    let placeValue = latest % 10;\r
    let offset = (10 + number - placeValue) % 10;\r
    let memo = offset * height;\r
    if (offset > 5) {\r
      memo -= 10 * height;\r
    }\r
    return memo;\r
  });\r
\r
  const style = {\r
    position: 'absolute',\r
    top: 0,\r
    right: 0,\r
    bottom: 0,\r
    left: 0,\r
    display: 'flex',\r
    alignItems: 'center',\r
    justifyContent: 'center'\r
  };\r
\r
  return <motion.span style={{ ...style, y }}>{number}</motion.span>;\r
}\r
\r
function Digit({ place, value, height, digitStyle }) {\r
  let valueRoundedToPlace = Math.floor(value / place);\r
  let animatedValue = useSpring(valueRoundedToPlace);\r
\r
  useEffect(() => {\r
    animatedValue.set(valueRoundedToPlace);\r
  }, [animatedValue, valueRoundedToPlace]);\r
\r
  const defaultStyle = {\r
    height,\r
    position: 'relative',\r
    width: '1ch',\r
    fontVariantNumeric: 'tabular-nums'\r
  };\r
\r
  return (\r
    <div style={{ ...defaultStyle, ...digitStyle }}>\r
      {Array.from({ length: 10 }, (_, i) => (\r
        <Number key={i} mv={animatedValue} number={i} height={height} />\r
      ))}\r
    </div>\r
  );\r
}\r
\r
export default function Counter({\r
  value,\r
  fontSize = 100,\r
  padding = 0,\r
  places = [100, 10, 1],\r
  gap = 8,\r
  borderRadius = 4,\r
  horizontalPadding = 8,\r
  textColor = 'white',\r
  fontWeight = 'bold',\r
  containerStyle,\r
  counterStyle,\r
  digitStyle,\r
  gradientHeight = 16,\r
  gradientFrom = 'black',\r
  gradientTo = 'transparent',\r
  topGradientStyle,\r
  bottomGradientStyle\r
}) {\r
  const height = fontSize + padding;\r
\r
  const defaultContainerStyle = {\r
    position: 'relative',\r
    display: 'inline-block'\r
  };\r
\r
  const defaultCounterStyle = {\r
    fontSize,\r
    display: 'flex',\r
    gap: gap,\r
    overflow: 'hidden',\r
    borderRadius: borderRadius,\r
    paddingLeft: horizontalPadding,\r
    paddingRight: horizontalPadding,\r
    lineHeight: 1,\r
    color: textColor,\r
    fontWeight: fontWeight\r
  };\r
\r
  const gradientContainerStyle = {\r
    pointerEvents: 'none',\r
    position: 'absolute',\r
    top: 0,\r
    bottom: 0,\r
    left: 0,\r
    right: 0\r
  };\r
\r
  const defaultTopGradientStyle = {\r
    height: gradientHeight,\r
    background: \`linear-gradient(to bottom, \${gradientFrom}, \${gradientTo})\`\r
  };\r
\r
  const defaultBottomGradientStyle = {\r
    position: 'absolute',\r
    bottom: 0,\r
    width: '100%',\r
    height: gradientHeight,\r
    background: \`linear-gradient(to top, \${gradientFrom}, \${gradientTo})\`\r
  };\r
\r
  return (\r
    <div style={{ ...defaultContainerStyle, ...containerStyle }}>\r
      <div style={{ ...defaultCounterStyle, ...counterStyle }}>\r
        {places.map(place => (\r
          <Digit key={place} place={place} value={value} height={height} digitStyle={digitStyle} />\r
        ))}\r
      </div>\r
      <div style={gradientContainerStyle}>\r
        <div style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle} />\r
        <div style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle} />\r
      </div>\r
    </div>\r
  );\r
}\r
`,q=`import { MotionValue, motion, useSpring, useTransform } from 'motion/react';\r
import { useEffect } from 'react';\r
\r
import './Counter.css';\r
\r
interface NumberProps {\r
  mv: MotionValue<number>;\r
  number: number;\r
  height: number;\r
}\r
\r
function Number({ mv, number, height }: NumberProps) {\r
  let y = useTransform(mv, latest => {\r
    let placeValue = latest % 10;\r
    let offset = (10 + number - placeValue) % 10;\r
    let memo = offset * height;\r
    if (offset > 5) {\r
      memo -= 10 * height;\r
    }\r
    return memo;\r
  });\r
  return (\r
    <motion.span className="counter-number" style={{ y }}>\r
      {number}\r
    </motion.span>\r
  );\r
}\r
\r
interface DigitProps {\r
  place: number;\r
  value: number;\r
  height: number;\r
  digitStyle?: React.CSSProperties;\r
}\r
\r
function Digit({ place, value, height, digitStyle }: DigitProps) {\r
  let valueRoundedToPlace = Math.floor(value / place);\r
  let animatedValue = useSpring(valueRoundedToPlace);\r
  useEffect(() => {\r
    animatedValue.set(valueRoundedToPlace);\r
  }, [animatedValue, valueRoundedToPlace]);\r
  return (\r
    <div className="counter-digit" style={{ height, ...digitStyle }}>\r
      {Array.from({ length: 10 }, (_, i) => (\r
        <Number key={i} mv={animatedValue} number={i} height={height} />\r
      ))}\r
    </div>\r
  );\r
}\r
\r
interface CounterProps {\r
  value: number;\r
  fontSize?: number;\r
  padding?: number;\r
  places?: number[];\r
  gap?: number;\r
  borderRadius?: number;\r
  horizontalPadding?: number;\r
  textColor?: string;\r
  fontWeight?: React.CSSProperties['fontWeight'];\r
  containerStyle?: React.CSSProperties;\r
  counterStyle?: React.CSSProperties;\r
  digitStyle?: React.CSSProperties;\r
  gradientHeight?: number;\r
  gradientFrom?: string;\r
  gradientTo?: string;\r
  topGradientStyle?: React.CSSProperties;\r
  bottomGradientStyle?: React.CSSProperties;\r
}\r
\r
export default function Counter({\r
  value,\r
  fontSize = 100,\r
  padding = 0,\r
  places = [100, 10, 1],\r
  gap = 8,\r
  borderRadius = 4,\r
  horizontalPadding = 8,\r
  textColor = 'white',\r
  fontWeight = 'bold',\r
  containerStyle,\r
  counterStyle,\r
  digitStyle,\r
  gradientHeight = 16,\r
  gradientFrom = 'black',\r
  gradientTo = 'transparent',\r
  topGradientStyle,\r
  bottomGradientStyle\r
}: CounterProps) {\r
  const height = fontSize + padding;\r
  const defaultCounterStyle: React.CSSProperties = {\r
    fontSize,\r
    gap: gap,\r
    borderRadius: borderRadius,\r
    paddingLeft: horizontalPadding,\r
    paddingRight: horizontalPadding,\r
    color: textColor,\r
    fontWeight: fontWeight\r
  };\r
  const defaultTopGradientStyle: React.CSSProperties = {\r
    height: gradientHeight,\r
    background: \`linear-gradient(to bottom, \${gradientFrom}, \${gradientTo})\`\r
  };\r
  const defaultBottomGradientStyle: React.CSSProperties = {\r
    height: gradientHeight,\r
    background: \`linear-gradient(to top, \${gradientFrom}, \${gradientTo})\`\r
  };\r
  return (\r
    <div className="counter-container" style={containerStyle}>\r
      <div className="counter-counter" style={{ ...defaultCounterStyle, ...counterStyle }}>\r
        {places.map(place => (\r
          <Digit key={place} place={place} value={value} height={height} digitStyle={digitStyle} />\r
        ))}\r
      </div>\r
      <div className="gradient-container">\r
        <div className="top-gradient" style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}></div>\r
        <div\r
          className="bottom-gradient"\r
          style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle}\r
        ></div>\r
      </div>\r
    </div>\r
  );\r
}\r
`,I=`import { MotionValue, motion, useSpring, useTransform } from 'motion/react';\r
import { useEffect } from 'react';\r
\r
interface NumberProps {\r
  mv: MotionValue<number>;\r
  number: number;\r
  height: number;\r
}\r
\r
function Number({ mv, number, height }: NumberProps) {\r
  let y = useTransform(mv, latest => {\r
    let placeValue = latest % 10;\r
    let offset = (10 + number - placeValue) % 10;\r
    let memo = offset * height;\r
    if (offset > 5) {\r
      memo -= 10 * height;\r
    }\r
    return memo;\r
  });\r
\r
  const style: React.CSSProperties = {\r
    position: 'absolute',\r
    top: 0,\r
    right: 0,\r
    bottom: 0,\r
    left: 0,\r
    display: 'flex',\r
    alignItems: 'center',\r
    justifyContent: 'center'\r
  };\r
\r
  return <motion.span style={{ ...style, y }}>{number}</motion.span>;\r
}\r
\r
interface DigitProps {\r
  place: number;\r
  value: number;\r
  height: number;\r
  digitStyle?: React.CSSProperties;\r
}\r
\r
function Digit({ place, value, height, digitStyle }: DigitProps) {\r
  let valueRoundedToPlace = Math.floor(value / place);\r
  let animatedValue = useSpring(valueRoundedToPlace);\r
\r
  useEffect(() => {\r
    animatedValue.set(valueRoundedToPlace);\r
  }, [animatedValue, valueRoundedToPlace]);\r
\r
  const defaultStyle: React.CSSProperties = {\r
    height,\r
    position: 'relative',\r
    width: '1ch',\r
    fontVariantNumeric: 'tabular-nums'\r
  };\r
\r
  return (\r
    <div style={{ ...defaultStyle, ...digitStyle }}>\r
      {Array.from({ length: 10 }, (_, i) => (\r
        <Number key={i} mv={animatedValue} number={i} height={height} />\r
      ))}\r
    </div>\r
  );\r
}\r
\r
interface CounterProps {\r
  value: number;\r
  fontSize?: number;\r
  padding?: number;\r
  places?: number[];\r
  gap?: number;\r
  borderRadius?: number;\r
  horizontalPadding?: number;\r
  textColor?: string;\r
  fontWeight?: React.CSSProperties['fontWeight'];\r
  containerStyle?: React.CSSProperties;\r
  counterStyle?: React.CSSProperties;\r
  digitStyle?: React.CSSProperties;\r
  gradientHeight?: number;\r
  gradientFrom?: string;\r
  gradientTo?: string;\r
  topGradientStyle?: React.CSSProperties;\r
  bottomGradientStyle?: React.CSSProperties;\r
}\r
\r
export default function Counter({\r
  value,\r
  fontSize = 100,\r
  padding = 0,\r
  places = [100, 10, 1],\r
  gap = 8,\r
  borderRadius = 4,\r
  horizontalPadding = 8,\r
  textColor = 'white',\r
  fontWeight = 'bold',\r
  containerStyle,\r
  counterStyle,\r
  digitStyle,\r
  gradientHeight = 16,\r
  gradientFrom = 'black',\r
  gradientTo = 'transparent',\r
  topGradientStyle,\r
  bottomGradientStyle\r
}: CounterProps) {\r
  const height = fontSize + padding;\r
\r
  const defaultContainerStyle: React.CSSProperties = {\r
    position: 'relative',\r
    display: 'inline-block'\r
  };\r
\r
  const defaultCounterStyle: React.CSSProperties = {\r
    fontSize,\r
    display: 'flex',\r
    gap: gap,\r
    overflow: 'hidden',\r
    borderRadius: borderRadius,\r
    paddingLeft: horizontalPadding,\r
    paddingRight: horizontalPadding,\r
    lineHeight: 1,\r
    color: textColor,\r
    fontWeight: fontWeight\r
  };\r
\r
  const gradientContainerStyle: React.CSSProperties = {\r
    pointerEvents: 'none',\r
    position: 'absolute',\r
    top: 0,\r
    bottom: 0,\r
    left: 0,\r
    right: 0\r
  };\r
\r
  const defaultTopGradientStyle: React.CSSProperties = {\r
    height: gradientHeight,\r
    background: \`linear-gradient(to bottom, \${gradientFrom}, \${gradientTo})\`\r
  };\r
\r
  const defaultBottomGradientStyle: React.CSSProperties = {\r
    position: 'absolute',\r
    bottom: 0,\r
    width: '100%',\r
    height: gradientHeight,\r
    background: \`linear-gradient(to top, \${gradientFrom}, \${gradientTo})\`\r
  };\r
\r
  return (\r
    <div style={{ ...defaultContainerStyle, ...containerStyle }}>\r
      <div style={{ ...defaultCounterStyle, ...counterStyle }}>\r
        {places.map(place => (\r
          <Digit key={place} place={place} value={value} height={height} digitStyle={digitStyle} />\r
        ))}\r
      </div>\r
      <div style={gradientContainerStyle}>\r
        <div style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle} />\r
        <div style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle} />\r
      </div>\r
    </div>\r
  );\r
}\r
`,O={dependencies:"motion",usage:`import Counter from './Counter';

<Counter
  value={1}
  places={[100, 10, 1]}
  fontSize={80}
  padding={5}
  gap={10}
  textColor="white"
  fontWeight={900}
/>`,code:A,css:L,tailwind:_,tsCode:q,tsTailwind:I},Z=()=>{const[r,n]=s.useState(1),[i,d]=s.useState(80),[o,a]=s.useState(10),l=[{name:"value",type:"number",default:"N/A (required)",description:"The numeric value to display in the counter."},{name:"fontSize",type:"number",default:"100",description:"The base font size used for the counter digits."},{name:"padding",type:"number",default:"0",description:"Additional padding added to the digit height."},{name:"places",type:"number[]",default:"[100, 10, 1]",description:"An array of place values to determine which digits to display."},{name:"gap",type:"number",default:"8",description:"The gap (in pixels) between each digit."},{name:"borderRadius",type:"number",default:"4",description:"The border radius (in pixels) for the counter container."},{name:"horizontalPadding",type:"number",default:"8",description:"The horizontal padding (in pixels) for the counter container."},{name:"textColor",type:"string",default:"'white'",description:"The text color for the counter digits."},{name:"fontWeight",type:"string | number",default:"'bold'",description:"The font weight of the counter digits."},{name:"containerStyle",type:"React.CSSProperties",default:"{}",description:"Custom inline styles for the outer container."},{name:"counterStyle",type:"React.CSSProperties",default:"{}",description:"Custom inline styles for the counter element."},{name:"digitStyle",type:"React.CSSProperties",default:"{}",description:"Custom inline styles for each digit container."},{name:"gradientHeight",type:"number",default:"16",description:"The height (in pixels) of the gradient overlays."},{name:"gradientFrom",type:"string",default:"'black'",description:"The starting color for the gradient overlays."},{name:"gradientTo",type:"string",default:"'transparent'",description:"The ending color for the gradient overlays."},{name:"topGradientStyle",type:"React.CSSProperties",default:"undefined",description:"Custom inline styles for the top gradient overlay."},{name:"bottomGradientStyle",type:"React.CSSProperties",default:"undefined",description:"Custom inline styles for the bottom gradient overlay."}];return e.jsxs(k,{children:[e.jsxs(w,{children:[e.jsxs(V,{position:"relative",className:"demo-container",h:400,overflow:"hidden",children:[e.jsx(M,{value:r,places:[100,10,1],gradientFrom:"#060010",fontSize:i,padding:5,gap:o,borderRadius:10,horizontalPadding:15,textColor:"white",fontWeight:900}),e.jsxs(j,{gap:4,bottom:"1em",direction:"row",justify:"center",mt:4,position:"absolute",children:[e.jsx(y,{bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:10,w:10,onClick:()=>n(r-1),children:"-"}),e.jsx(y,{bg:"#170D27",borderRadius:"10px",border:"1px solid #271E37",_hover:{bg:"#271E37"},color:"#fff",h:10,w:10,onClick:()=>r<999&&n(r+1),children:"+"})]})]}),e.jsxs(W,{children:[e.jsx(u,{title:"Value",min:0,max:999,step:1,value:r,onChange:t=>n(t)}),e.jsx(u,{title:"Gap",min:0,max:50,step:10,value:o,onChange:t=>a(t)}),e.jsx(u,{title:"Font Size",min:40,max:200,step:10,value:i,onChange:t=>d(t)})]}),e.jsx($,{data:l}),e.jsx(E,{dependencyList:["motion"]})]}),e.jsx(D,{children:e.jsx(F,{codeObject:O})})]})};export{Z as default};
