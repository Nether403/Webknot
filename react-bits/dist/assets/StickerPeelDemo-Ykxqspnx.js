import{r as re,g as me,j as S,B as Ir,T as Nr}from"./index-wsKSLPNH.js";import{T as Xr,P as Yr,a as Br,C as Ar,b as Fr}from"./PropTable-C4uPWs8h.js";import{C as Hr}from"./Customize-1m_ZNqR9.js";import{P as ze}from"./PreviewSlider-m1G_aiYP.js";import{D as Or}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";const zr="/assets/react-bits-sticker-DuQtTs-F.png";/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var De,We,Qt,Tt,lt,Et,Lt,ft,ye="transform",$t=ye+"Origin",xr,kr=function(t){var i=t.ownerDocument||t;for(!(ye in t.style)&&("msTransform"in t.style)&&(ye="msTransform",$t=ye+"Origin");i.parentNode&&(i=i.parentNode););if(We=window,Lt=new Ue,i){De=i,Qt=i.documentElement,Tt=i.body,ft=De.createElementNS("http://www.w3.org/2000/svg","g"),ft.style.transform="none";var r=i.createElement("div"),o=i.createElement("div"),s=i&&(i.body||i.firstElementChild);s&&s.appendChild&&(s.appendChild(r),r.appendChild(o),r.setAttribute("style","position:static;transform:translate3d(0,0,1px)"),xr=o.offsetParent!==r,s.removeChild(r))}return i},$r=function(t){for(var i,r;t&&t!==Tt;)r=t._gsap,r&&r.uncache&&r.get(t,"x"),r&&!r.scaleX&&!r.scaleY&&r.renderTransform&&(r.scaleX=r.scaleY=1e-4,r.renderTransform(1,r),i?i.push(r):i=[r]),t=t.parentNode;return i},yr=[],wr=[],jr=function(){return We.pageYOffset||De.scrollTop||Qt.scrollTop||Tt.scrollTop||0},Gr=function(){return We.pageXOffset||De.scrollLeft||Qt.scrollLeft||Tt.scrollLeft||0},Kt=function(t){return t.ownerSVGElement||((t.tagName+"").toLowerCase()==="svg"?t:null)},Wr=function f(t){if(We.getComputedStyle(t).position==="fixed")return!0;if(t=t.parentNode,t&&t.nodeType===1)return f(t)},Yt=function f(t,i){if(t.parentNode&&(De||kr(t))){var r=Kt(t),o=r?r.getAttribute("xmlns")||"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",s=r?i?"rect":"g":"div",d=i!==2?0:100,l=i===3?100:0,m="position:absolute;display:block;pointer-events:none;margin:0;padding:0;",u=De.createElementNS?De.createElementNS(o.replace(/^https/,"http"),s):De.createElement(s);return i&&(r?(Et||(Et=f(t)),u.setAttribute("width",.01),u.setAttribute("height",.01),u.setAttribute("transform","translate("+d+","+l+")"),Et.appendChild(u)):(lt||(lt=f(t),lt.style.cssText=m),u.style.cssText=m+"width:0.1px;height:0.1px;top:"+l+"px;left:"+d+"px",lt.appendChild(u))),u}throw"Need document and parent."},Vr=function(t){for(var i=new Ue,r=0;r<t.numberOfItems;r++)i.multiply(t.getItem(r).matrix);return i},Ur=function(t){var i=t.getCTM(),r;return i||(r=t.style[ye],t.style[ye]="none",t.appendChild(ft),i=ft.getCTM(),t.removeChild(ft),r?t.style[ye]=r:t.style.removeProperty(ye.replace(/([A-Z])/g,"-$1").toLowerCase())),i||Lt.clone()},Qr=function(t,i){var r=Kt(t),o=t===r,s=r?yr:wr,d=t.parentNode,l=d&&!r&&d.shadowRoot&&d.shadowRoot.appendChild?d.shadowRoot:d,m,u,g,w,k,e;if(t===We)return t;if(s.length||s.push(Yt(t,1),Yt(t,2),Yt(t,3)),m=r?Et:lt,r)o?(g=Ur(t),w=-g.e/g.a,k=-g.f/g.d,u=Lt):t.getBBox?(g=t.getBBox(),u=t.transform?t.transform.baseVal:{},u=u.numberOfItems?u.numberOfItems>1?Vr(u):u.getItem(0).matrix:Lt,w=u.a*g.x+u.c*g.y,k=u.b*g.x+u.d*g.y):(u=new Ue,w=k=0),(o?r:d).appendChild(m),m.setAttribute("transform","matrix("+u.a+","+u.b+","+u.c+","+u.d+","+(u.e+w)+","+(u.f+k)+")");else{if(w=k=0,xr)for(u=t.offsetParent,g=t;g&&(g=g.parentNode)&&g!==u&&g.parentNode;)(We.getComputedStyle(g)[ye]+"").length>4&&(w=g.offsetLeft,k=g.offsetTop,g=0);if(e=We.getComputedStyle(t),e.position!=="absolute"&&e.position!=="fixed")for(u=t.offsetParent;d&&d!==u;)w+=d.scrollLeft||0,k+=d.scrollTop||0,d=d.parentNode;g=m.style,g.top=t.offsetTop-k+"px",g.left=t.offsetLeft-w+"px",g[ye]=e[ye],g[$t]=e[$t],g.position=e.position==="fixed"?"fixed":"absolute",l.appendChild(m)}return m},Bt=function(t,i,r,o,s,d,l){return t.a=i,t.b=r,t.c=o,t.d=s,t.e=d,t.f=l,t},Ue=function(){function f(i,r,o,s,d,l){i===void 0&&(i=1),r===void 0&&(r=0),o===void 0&&(o=0),s===void 0&&(s=1),d===void 0&&(d=0),l===void 0&&(l=0),Bt(this,i,r,o,s,d,l)}var t=f.prototype;return t.inverse=function(){var r=this.a,o=this.b,s=this.c,d=this.d,l=this.e,m=this.f,u=r*d-o*s||1e-10;return Bt(this,d/u,-o/u,-s/u,r/u,(s*m-d*l)/u,-(r*m-o*l)/u)},t.multiply=function(r){var o=this.a,s=this.b,d=this.c,l=this.d,m=this.e,u=this.f,g=r.a,w=r.c,k=r.b,e=r.d,b=r.e,_=r.f;return Bt(this,g*o+k*d,g*s+k*l,w*o+e*d,w*s+e*l,m+b*o+_*d,u+b*s+_*l)},t.clone=function(){return new f(this.a,this.b,this.c,this.d,this.e,this.f)},t.equals=function(r){var o=this.a,s=this.b,d=this.c,l=this.d,m=this.e,u=this.f;return o===r.a&&s===r.b&&d===r.c&&l===r.d&&m===r.e&&u===r.f},t.apply=function(r,o){o===void 0&&(o={});var s=r.x,d=r.y,l=this.a,m=this.b,u=this.c,g=this.d,w=this.e,k=this.f;return o.x=s*l+d*u+w||0,o.y=s*m+d*g+k||0,o},f}();function Ge(f,t,i,r){if(!f||!f.parentNode||(De||kr(f)).documentElement===f)return new Ue;var o=$r(f),s=Kt(f),d=s?yr:wr,l=Qr(f),m=d[0].getBoundingClientRect(),u=d[1].getBoundingClientRect(),g=d[2].getBoundingClientRect(),w=l.parentNode,k=Wr(f),e=new Ue((u.left-m.left)/100,(u.top-m.top)/100,(g.left-m.left)/100,(g.top-m.top)/100,m.left+(k?0:Gr()),m.top+(k?0:jr()));if(w.removeChild(l),o)for(m=o.length;m--;)u=o[m],u.scaleX=u.scaleY=0,u.renderTransform(1,u);return t?e.inverse():e}function sr(f){if(f===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return f}function Kr(f,t){f.prototype=Object.create(t.prototype),f.prototype.constructor=f,f.__proto__=t}var D,B,ae,we,Ce,At,Te,jt,ct,Be,br,Gt,ht,qt,dt,xe,ut,St,Er,Wt,Rt=0,Sr=function(){return typeof window<"u"},Pr=function(){return D||Sr()&&(D=window.gsap)&&D.registerPlugin&&D},Ye=function(t){return typeof t=="function"},pt=function(t){return typeof t=="object"},ke=function(t){return typeof t>"u"},Pt=function(){return!1},gt="transform",Vt="transformOrigin",Ne=function(t){return Math.round(t*1e4)/1e4},st=Array.isArray,wt=function(t,i){var r=ae.createElementNS?ae.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/,"http"),t):ae.createElement(t);return r.style?r:ae.createElement(t)},lr=180/Math.PI,$e=1e20,qr=new Ue,Xe=Date.now||function(){return new Date().getTime()},Ve=[],qe={},Zr=0,Jr=/^(?:a|input|textarea|button|select)$/i,cr=0,Qe={},Re={},Lr=function(t,i){var r={},o;for(o in t)r[o]=i?t[o]*i:t[o];return r},ei=function(t,i){for(var r in i)r in t||(t[r]=i[r]);return t},dr=function f(t,i){for(var r=t.length,o;r--;)i?t[r].style.touchAction=i:t[r].style.removeProperty("touch-action"),o=t[r].children,o&&o.length&&f(o,i)},Rr=function(){return Ve.forEach(function(t){return t()})},ti=function(t){Ve.push(t),Ve.length===1&&D.ticker.add(Rr)},ur=function(){return!Ve.length&&D.ticker.remove(Rr)},fr=function(t){for(var i=Ve.length;i--;)Ve[i]===t&&Ve.splice(i,1);D.to(ur,{overwrite:!0,delay:15,duration:0,onComplete:ur,data:"_draggable"})},ri=function(t,i){for(var r in i)r in t||(t[r]=i[r]);return t},q=function(t,i,r,o){if(t.addEventListener){var s=ht[i];o=o||(br?{passive:!1}:null),t.addEventListener(s||i,r,o),s&&i!==s&&t.addEventListener(i,r,o)}},U=function(t,i,r,o){if(t.removeEventListener){var s=ht[i];t.removeEventListener(s||i,r,o),s&&i!==s&&t.removeEventListener(i,r,o)}},ue=function(t){t.preventDefault&&t.preventDefault(),t.preventManipulation&&t.preventManipulation()},ii=function(t,i){for(var r=t.length;r--;)if(t[r].identifier===i)return!0},ni=function f(t){qt=t.touches&&Rt<t.touches.length,U(t.target,"touchend",f)},pr=function(t){qt=t.touches&&Rt<t.touches.length,q(t.target,"touchend",ni)},Ze=function(t){return B.pageYOffset||t.scrollTop||t.documentElement.scrollTop||t.body.scrollTop||0},Je=function(t){return B.pageXOffset||t.scrollLeft||t.documentElement.scrollLeft||t.body.scrollLeft||0},gr=function f(t,i){q(t,"scroll",i),et(t.parentNode)||f(t.parentNode,i)},hr=function f(t,i){U(t,"scroll",i),et(t.parentNode)||f(t.parentNode,i)},et=function(t){return!t||t===we||t.nodeType===9||t===ae.body||t===B||!t.nodeType||!t.parentNode},vr=function(t,i){var r=i==="x"?"Width":"Height",o="scroll"+r,s="client"+r;return Math.max(0,et(t)?Math.max(we[o],Ce[o])-(B["inner"+r]||we[s]||Ce[s]):t[o]-t[s])},Ft=function f(t,i){var r=vr(t,"x"),o=vr(t,"y");et(t)?t=Re:f(t.parentNode,i),t._gsMaxScrollX=r,t._gsMaxScrollY=o,i||(t._gsScrollX=t.scrollLeft||0,t._gsScrollY=t.scrollTop||0)},Ht=function(t,i,r){var o=t.style;o&&(ke(o[i])&&(i=ct(i,t)||i),r==null?o.removeProperty&&o.removeProperty(i.replace(/([A-Z])/g,"-$1").toLowerCase()):o[i]=r)},vt=function(t){return B.getComputedStyle(t instanceof Element?t:t.host||(t.parentNode||{}).host||t)},je={},Ke=function(t){if(t===B)return je.left=je.top=0,je.width=je.right=we.clientWidth||t.innerWidth||Ce.clientWidth||0,je.height=je.bottom=(t.innerHeight||0)-20<we.clientHeight?we.clientHeight:t.innerHeight||Ce.clientHeight||0,je;var i=t.ownerDocument||ae,r=ke(t.pageX)?!t.nodeType&&!ke(t.left)&&!ke(t.top)?t:Be(t)[0].getBoundingClientRect():{left:t.pageX-Je(i),top:t.pageY-Ze(i),right:t.pageX-Je(i)+1,bottom:t.pageY-Ze(i)+1};return ke(r.right)&&!ke(r.width)?(r.right=r.left+r.width,r.bottom=r.top+r.height):ke(r.width)&&(r={width:r.right-r.left,height:r.bottom-r.top,right:r.right,left:r.left,bottom:r.bottom,top:r.top}),r},j=function(t,i,r){var o=t.vars,s=o[r],d=t._listeners[i],l;return Ye(s)&&(l=s.apply(o.callbackScope||t,o[r+"Params"]||[t.pointerEvent])),d&&t.dispatchEvent(i)===!1&&(l=!1),l},mr=function(t,i){var r=Be(t)[0],o,s,d;return!r.nodeType&&r!==B?ke(t.left)?(s=t.min||t.minX||t.minRotation||0,o=t.min||t.minY||0,{left:s,top:o,width:(t.max||t.maxX||t.maxRotation||0)-s,height:(t.max||t.maxY||0)-o}):(d={x:0,y:0},{left:t.left-d.x,top:t.top-d.y,width:t.width,height:t.height}):oi(r,i)},fe={},oi=function(t,i){i=Be(i)[0];var r=t.getBBox&&t.ownerSVGElement,o=t.ownerDocument||ae,s,d,l,m,u,g,w,k,e,b,_,O,A;if(t===B)l=Ze(o),s=Je(o),d=s+(o.documentElement.clientWidth||t.innerWidth||o.body.clientWidth||0),m=l+((t.innerHeight||0)-20<o.documentElement.clientHeight?o.documentElement.clientHeight:t.innerHeight||o.body.clientHeight||0);else{if(i===B||ke(i))return t.getBoundingClientRect();s=l=0,r?(b=t.getBBox(),_=b.width,O=b.height):(t.viewBox&&(b=t.viewBox.baseVal)&&(s=b.x||0,l=b.y||0,_=b.width,O=b.height),_||(A=vt(t),b=A.boxSizing==="border-box",_=(parseFloat(A.width)||t.clientWidth||0)+(b?0:parseFloat(A.borderLeftWidth)+parseFloat(A.borderRightWidth)),O=(parseFloat(A.height)||t.clientHeight||0)+(b?0:parseFloat(A.borderTopWidth)+parseFloat(A.borderBottomWidth)))),d=_,m=O}return t===i?{left:s,top:l,width:d-s,height:m-l}:(u=Ge(i,!0).multiply(Ge(t)),g=u.apply({x:s,y:l}),w=u.apply({x:d,y:l}),k=u.apply({x:d,y:m}),e=u.apply({x:s,y:m}),s=Math.min(g.x,w.x,k.x,e.x),l=Math.min(g.y,w.y,k.y,e.y),{left:s,top:l,width:Math.max(g.x,w.x,k.x,e.x)-s,height:Math.max(g.y,w.y,k.y,e.y)-l})},Ot=function(t,i,r,o,s,d){var l={},m,u,g;if(i)if(s!==1&&i instanceof Array){if(l.end=m=[],g=i.length,pt(i[0]))for(u=0;u<g;u++)m[u]=Lr(i[u],s);else for(u=0;u<g;u++)m[u]=i[u]*s;r+=1.1,o-=1.1}else Ye(i)?l.end=function(w){var k=i.call(t,w),e,b;if(s!==1)if(pt(k)){e={};for(b in k)e[b]=k[b]*s;k=e}else k*=s;return k}:l.end=i;return(r||r===0)&&(l.max=r),(o||o===0)&&(l.min=o),d&&(l.velocity=0),l},ai=function f(t){var i;return!t||!t.getAttribute||t===Ce?!1:(i=t.getAttribute("data-clickable"))==="true"||i!=="false"&&(Jr.test(t.nodeName+"")||t.getAttribute("contentEditable")==="true")?!0:f(t.parentNode)},bt=function(t,i){for(var r=t.length,o;r--;)o=t[r],o.ondragstart=o.onselectstart=i?null:Pt,D.set(o,{lazy:!0,userSelect:i?"text":"none"})},si=function f(t){if(vt(t).position==="fixed")return!0;if(t=t.parentNode,t&&t.nodeType===1)return f(t)},Tr,Ut,li=function(t,i){t=D.utils.toArray(t)[0],i=i||{};var r=document.createElement("div"),o=r.style,s=t.firstChild,d=0,l=0,m=t.scrollTop,u=t.scrollLeft,g=t.scrollWidth,w=t.scrollHeight,k=0,e=0,b=0,_,O,A,Pe,R,G;Tr&&i.force3D!==!1?(R="translate3d(",G="px,0px)"):gt&&(R="translate(",G="px)"),this.scrollTop=function(E,F){if(!arguments.length)return-this.top();this.top(-E,F)},this.scrollLeft=function(E,F){if(!arguments.length)return-this.left();this.left(-E,F)},this.left=function(E,F){if(!arguments.length)return-(t.scrollLeft+l);var N=t.scrollLeft-u,T=l;if((N>2||N<-2)&&!F){u=t.scrollLeft,D.killTweensOf(this,{left:1,scrollLeft:1}),this.left(-u),i.onKill&&i.onKill();return}E=-E,E<0?(l=E-.5|0,E=0):E>e?(l=E-e|0,E=e):l=0,(l||T)&&(this._skip||(o[gt]=R+-l+"px,"+-d+G),l+k>=0&&(o.paddingRight=l+k+"px")),t.scrollLeft=E|0,u=t.scrollLeft},this.top=function(E,F){if(!arguments.length)return-(t.scrollTop+d);var N=t.scrollTop-m,T=d;if((N>2||N<-2)&&!F){m=t.scrollTop,D.killTweensOf(this,{top:1,scrollTop:1}),this.top(-m),i.onKill&&i.onKill();return}E=-E,E<0?(d=E-.5|0,E=0):E>b?(d=E-b|0,E=b):d=0,(d||T)&&(this._skip||(o[gt]=R+-l+"px,"+-d+G)),t.scrollTop=E|0,m=t.scrollTop},this.maxScrollTop=function(){return b},this.maxScrollLeft=function(){return e},this.disable=function(){for(s=r.firstChild;s;)Pe=s.nextSibling,t.appendChild(s),s=Pe;t===r.parentNode&&t.removeChild(r)},this.enable=function(){if(s=t.firstChild,s!==r){for(;s;)Pe=s.nextSibling,r.appendChild(s),s=Pe;t.appendChild(r),this.calibrate()}},this.calibrate=function(E){var F=t.clientWidth===_,N,T,ne;m=t.scrollTop,u=t.scrollLeft,!(F&&t.clientHeight===O&&r.offsetHeight===A&&g===t.scrollWidth&&w===t.scrollHeight&&!E)&&((d||l)&&(T=this.left(),ne=this.top(),this.left(-t.scrollLeft),this.top(-t.scrollTop)),N=vt(t),(!F||E)&&(o.display="block",o.width="auto",o.paddingRight="0px",k=Math.max(0,t.scrollWidth-t.clientWidth),k&&(k+=parseFloat(N.paddingLeft)+(Ut?parseFloat(N.paddingRight):0))),o.display="inline-block",o.position="relative",o.overflow="visible",o.verticalAlign="top",o.boxSizing="content-box",o.width="100%",o.paddingRight=k+"px",Ut&&(o.paddingBottom=N.paddingBottom),_=t.clientWidth,O=t.clientHeight,g=t.scrollWidth,w=t.scrollHeight,e=t.scrollWidth-_,b=t.scrollHeight-O,A=r.offsetHeight,o.display="block",(T||ne)&&(this.left(T),this.top(ne)))},this.content=r,this.element=t,this._skip=!1,this.enable()},zt=function(t){if(Sr()&&document.body){var i=window&&window.navigator;B=window,ae=document,we=ae.documentElement,Ce=ae.body,At=wt("div"),St=!!window.PointerEvent,Te=wt("div"),Te.style.cssText="visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab",ut=Te.style.cursor==="grab"?"grab":"move",dt=i&&i.userAgent.toLowerCase().indexOf("android")!==-1,Gt="ontouchstart"in we&&"orientation"in B||i&&(i.MaxTouchPoints>0||i.msMaxTouchPoints>0),Ut=function(){var r=wt("div"),o=wt("div"),s=o.style,d=Ce,l;return s.display="inline-block",s.position="relative",r.style.cssText="width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden",r.appendChild(o),d.appendChild(r),l=o.offsetHeight+18>r.scrollHeight,d.removeChild(r),l}(),ht=function(r){for(var o=r.split(","),s=("onpointerdown"in At?"pointerdown,pointermove,pointerup,pointercancel":"onmspointerdown"in At?"MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel":r).split(","),d={},l=4;--l>-1;)d[o[l]]=s[l],d[s[l]]=o[l];try{we.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){br=1}}))}catch{}return d}("touchstart,touchmove,touchend,touchcancel"),q(ae,"touchcancel",Pt),q(B,"touchmove",Pt),Ce&&Ce.addEventListener("touchstart",Pt),q(ae,"contextmenu",function(){for(var r in qe)qe[r].isPressed&&qe[r].endDrag()}),D=jt=Pr()}D?(xe=D.plugins.inertia,Er=D.core.context||function(){},ct=D.utils.checkPrefix,gt=ct(gt),Vt=ct(Vt),Be=D.utils.toArray,Wt=D.core.getStyleSaver,Tr=!!ct("perspective")):t&&console.warn("Please gsap.registerPlugin(Draggable)")},ci=function(){function f(i){this._listeners={},this.target=i||this}var t=f.prototype;return t.addEventListener=function(r,o){var s=this._listeners[r]||(this._listeners[r]=[]);~s.indexOf(o)||s.push(o)},t.removeEventListener=function(r,o){var s=this._listeners[r],d=s&&s.indexOf(o);d>=0&&s.splice(d,1)},t.dispatchEvent=function(r){var o=this,s;return(this._listeners[r]||[]).forEach(function(d){return d.call(o,{type:r,target:o.target})===!1&&(s=!1)}),s},f}(),tt=function(f){Kr(t,f);function t(i,r){var o;o=f.call(this)||this,jt||zt(1),i=Be(i)[0],o.styles=Wt&&Wt(i,"transform,left,top"),xe||(xe=D.plugins.inertia),o.vars=r=Lr(r||{}),o.target=i,o.x=o.y=o.rotation=0,o.dragResistance=parseFloat(r.dragResistance)||0,o.edgeResistance=isNaN(r.edgeResistance)?1:parseFloat(r.edgeResistance)||0,o.lockAxis=r.lockAxis,o.autoScroll=r.autoScroll||0,o.lockedAxis=null,o.allowEventDefault=!!r.allowEventDefault,D.getProperty(i,"x");var s=(r.type||"x,y").toLowerCase(),d=~s.indexOf("x")||~s.indexOf("y"),l=s.indexOf("rotation")!==-1,m=l?"rotation":d?"x":"left",u=d?"y":"top",g=!!(~s.indexOf("x")||~s.indexOf("left")||s==="scroll"),w=!!(~s.indexOf("y")||~s.indexOf("top")||s==="scroll"),k=r.minimumMovement||2,e=sr(o),b=Be(r.trigger||r.handle||i),_={},O=0,A=!1,Pe=r.autoScrollMarginTop||40,R=r.autoScrollMarginRight||40,G=r.autoScrollMarginBottom||40,E=r.autoScrollMarginLeft||40,F=r.clickableTest||ai,N=0,T=i._gsap||D.core.getCache(i),ne=si(i),pe=function(n,c){return parseFloat(T.get(i,n,c))},M=i.ownerDocument||ae,se,P,be,Ee,J,Q,Ae,Zt,Jt,z,H,K,W,mt,le,rt,Z,Dt,_e,Me,Fe,it,ee,I,er,ce,ge,Ct,_t,tr,oe,rr,xt,ir=function(n){return ue(n),n.stopImmediatePropagation&&n.stopImmediatePropagation(),!1},Se=function y(n){if(e.autoScroll&&e.isDragging&&(A||Z)){var c=i,a=e.autoScroll*15,p,h,v,L,x,X,C,Y;for(A=!1,Re.scrollTop=B.pageYOffset!=null?B.pageYOffset:M.documentElement.scrollTop!=null?M.documentElement.scrollTop:M.body.scrollTop,Re.scrollLeft=B.pageXOffset!=null?B.pageXOffset:M.documentElement.scrollLeft!=null?M.documentElement.scrollLeft:M.body.scrollLeft,L=e.pointerX-Re.scrollLeft,x=e.pointerY-Re.scrollTop;c&&!h;)h=et(c.parentNode),p=h?Re:c.parentNode,v=h?{bottom:Math.max(we.clientHeight,B.innerHeight||0),right:Math.max(we.clientWidth,B.innerWidth||0),left:0,top:0}:p.getBoundingClientRect(),X=C=0,w&&(Y=p._gsMaxScrollY-p.scrollTop,Y<0?C=Y:x>v.bottom-G&&Y?(A=!0,C=Math.min(Y,a*(1-Math.max(0,v.bottom-x)/G)|0)):x<v.top+Pe&&p.scrollTop&&(A=!0,C=-Math.min(p.scrollTop,a*(1-Math.max(0,x-v.top)/Pe)|0)),C&&(p.scrollTop+=C)),g&&(Y=p._gsMaxScrollX-p.scrollLeft,Y<0?X=Y:L>v.right-R&&Y?(A=!0,X=Math.min(Y,a*(1-Math.max(0,v.right-L)/R)|0)):L<v.left+E&&p.scrollLeft&&(A=!0,X=-Math.min(p.scrollLeft,a*(1-Math.max(0,L-v.left)/E)|0)),X&&(p.scrollLeft+=X)),h&&(X||C)&&(B.scrollTo(p.scrollLeft,p.scrollTop),at(e.pointerX+X,e.pointerY+C)),c=p}if(Z){var $=e.x,ie=e.y;l?(e.deltaX=$-parseFloat(T.rotation),e.rotation=$,T.rotation=$+"deg",T.renderTransform(1,T)):P?(w&&(e.deltaY=ie-P.top(),P.top(ie)),g&&(e.deltaX=$-P.left(),P.left($))):d?(w&&(e.deltaY=ie-parseFloat(T.y),T.y=ie+"px"),g&&(e.deltaX=$-parseFloat(T.x),T.x=$+"px"),T.renderTransform(1,T)):(w&&(e.deltaY=ie-parseFloat(i.style.top||0),i.style.top=ie+"px"),g&&(e.deltaX=$-parseFloat(i.style.left||0),i.style.left=$+"px")),Zt&&!n&&!Ct&&(Ct=!0,j(e,"drag","onDrag")===!1&&(g&&(e.x-=e.deltaX),w&&(e.y-=e.deltaY),y(!0)),Ct=!1)}Z=!1},He=function(n,c){var a=e.x,p=e.y,h,v;i._gsap||(T=D.core.getCache(i)),T.uncache&&D.getProperty(i,"x"),d?(e.x=parseFloat(T.x),e.y=parseFloat(T.y)):l?e.x=e.rotation=parseFloat(T.rotation):P?(e.y=P.top(),e.x=P.left()):(e.y=parseFloat(i.style.top||(v=vt(i))&&v.top)||0,e.x=parseFloat(i.style.left||(v||{}).left)||0),(_e||Me||Fe)&&!c&&(e.isDragging||e.isThrowing)&&(Fe&&(Qe.x=e.x,Qe.y=e.y,h=Fe(Qe),h.x!==e.x&&(e.x=h.x,Z=!0),h.y!==e.y&&(e.y=h.y,Z=!0)),_e&&(h=_e(e.x),h!==e.x&&(e.x=h,l&&(e.rotation=h),Z=!0)),Me&&(h=Me(e.y),h!==e.y&&(e.y=h),Z=!0)),Z&&Se(!0),n||(e.deltaX=e.x-a,e.deltaY=e.y-p,j(e,"throwupdate","onThrowUpdate"))},Mt=function(n,c,a,p){return c==null&&(c=-$e),a==null&&(a=$e),Ye(n)?function(h){var v=e.isPressed?1-e.edgeResistance:1;return n.call(e,(h>a?a+(h-a)*v:h<c?c+(h-c)*v:h)*p)*p}:st(n)?function(h){for(var v=n.length,L=0,x=$e,X,C;--v>-1;)X=n[v],C=X-h,C<0&&(C=-C),C<x&&X>=c&&X<=a&&(L=v,x=C);return n[L]}:isNaN(n)?function(h){return h}:function(){return n*p}},Dr=function(n,c,a,p,h,v,L){return v=v&&v<$e?v*v:$e,Ye(n)?function(x){var X=e.isPressed?1-e.edgeResistance:1,C=x.x,Y=x.y,$,ie,Le;return x.x=C=C>a?a+(C-a)*X:C<c?c+(C-c)*X:C,x.y=Y=Y>h?h+(Y-h)*X:Y<p?p+(Y-p)*X:Y,$=n.call(e,x),$!==x&&(x.x=$.x,x.y=$.y),L!==1&&(x.x*=L,x.y*=L),v<$e&&(ie=x.x-C,Le=x.y-Y,ie*ie+Le*Le>v&&(x.x=C,x.y=Y)),x}:st(n)?function(x){for(var X=n.length,C=0,Y=$e,$,ie,Le,de;--X>-1;)Le=n[X],$=Le.x-x.x,ie=Le.y-x.y,de=$*$+ie*ie,de<Y&&(C=X,Y=de);return Y<=v?n[C]:x}:function(x){return x}},It=function(){var n,c,a,p;Ae=!1,P?(P.calibrate(),e.minX=H=-P.maxScrollLeft(),e.minY=W=-P.maxScrollTop(),e.maxX=z=e.maxY=K=0,Ae=!0):r.bounds&&(n=mr(r.bounds,i.parentNode),l?(e.minX=H=n.left,e.maxX=z=n.left+n.width,e.minY=W=e.maxY=K=0):!ke(r.bounds.maxX)||!ke(r.bounds.maxY)?(n=r.bounds,e.minX=H=n.minX,e.minY=W=n.minY,e.maxX=z=n.maxX,e.maxY=K=n.maxY):(c=mr(i,i.parentNode),e.minX=H=Math.round(pe(m,"px")+n.left-c.left),e.minY=W=Math.round(pe(u,"px")+n.top-c.top),e.maxX=z=Math.round(H+(n.width-c.width)),e.maxY=K=Math.round(W+(n.height-c.height))),H>z&&(e.minX=z,e.maxX=z=H,H=e.minX),W>K&&(e.minY=K,e.maxY=K=W,W=e.minY),l&&(e.minRotation=H,e.maxRotation=z),Ae=!0),r.liveSnap&&(a=r.liveSnap===!0?r.snap||{}:r.liveSnap,p=st(a)||Ye(a),l?(_e=Mt(p?a:a.rotation,H,z,1),Me=null):a.points?Fe=Dr(p?a:a.points,H,z,W,K,a.radius,P?-1:1):(g&&(_e=Mt(p?a:a.x||a.left||a.scrollLeft,H,z,P?-1:1)),w&&(Me=Mt(p?a:a.y||a.top||a.scrollTop,W,K,P?-1:1))))},Cr=function(){e.isThrowing=!1,j(e,"throwcomplete","onThrowComplete")},_r=function(){e.isThrowing=!1},Nt=function(n,c){var a,p,h,v;n&&xe?(n===!0&&(a=r.snap||r.liveSnap||{},p=st(a)||Ye(a),n={resistance:(r.throwResistance||r.resistance||1e3)/(l?10:1)},l?n.rotation=Ot(e,p?a:a.rotation,z,H,1,c):(g&&(n[m]=Ot(e,p?a:a.points||a.x||a.left,z,H,P?-1:1,c||e.lockedAxis==="x")),w&&(n[u]=Ot(e,p?a:a.points||a.y||a.top,K,W,P?-1:1,c||e.lockedAxis==="y")),(a.points||st(a)&&pt(a[0]))&&(n.linkedProps=m+","+u,n.radius=a.radius))),e.isThrowing=!0,v=isNaN(r.overshootTolerance)?r.edgeResistance===1?0:1-e.edgeResistance+.2:r.overshootTolerance,n.duration||(n.duration={max:Math.max(r.minDuration||0,"maxDuration"in r?r.maxDuration:2),min:isNaN(r.minDuration)?v===0||pt(n)&&n.resistance>1e3?0:.5:r.minDuration,overshoot:v}),e.tween=h=D.to(P||i,{inertia:n,data:"_draggable",inherit:!1,onComplete:Cr,onInterrupt:_r,onUpdate:r.fastMode?j:He,onUpdateParams:r.fastMode?[e,"onthrowupdate","onThrowUpdate"]:a&&a.radius?[!1,!0]:[]}),r.fastMode||(P&&(P._skip=!0),h.render(1e9,!0,!0),He(!0,!0),e.endX=e.x,e.endY=e.y,l&&(e.endRotation=e.x),h.play(0),He(!0,!0),P&&(P._skip=!1))):Ae&&e.applyBounds()},nr=function(n){var c=I,a;I=Ge(i.parentNode,!0),n&&e.isPressed&&!I.equals(c||new Ue)&&(a=c.inverse().apply({x:be,y:Ee}),I.apply(a,a),be=a.x,Ee=a.y),I.equals(qr)&&(I=null)},kt=function(){var n=1-e.edgeResistance,c=ne?Je(M):0,a=ne?Ze(M):0,p,h,v;d&&(T.x=pe(m,"px")+"px",T.y=pe(u,"px")+"px",T.renderTransform()),nr(!1),fe.x=e.pointerX-c,fe.y=e.pointerY-a,I&&I.apply(fe,fe),be=fe.x,Ee=fe.y,Z&&(at(e.pointerX,e.pointerY),Se(!0)),rr=Ge(i),P?(It(),Q=P.top(),J=P.left()):(nt()?(He(!0,!0),It()):e.applyBounds(),l?(p=i.ownerSVGElement?[T.xOrigin-i.getBBox().x,T.yOrigin-i.getBBox().y]:(vt(i)[Vt]||"0 0").split(" "),rt=e.rotationOrigin=Ge(i).apply({x:parseFloat(p[0])||0,y:parseFloat(p[1])||0}),He(!0,!0),h=e.pointerX-rt.x-c,v=rt.y-e.pointerY+a,J=e.x,Q=e.y=Math.atan2(v,h)*lr):(Q=pe(u,"px"),J=pe(m,"px"))),Ae&&n&&(J>z?J=z+(J-z)/n:J<H&&(J=H-(H-J)/n),l||(Q>K?Q=K+(Q-K)/n:Q<W&&(Q=W-(W-Q)/n))),e.startX=J=Ne(J),e.startY=Q=Ne(Q)},nt=function(){return e.tween&&e.tween.isActive()},Mr=function(){Te.parentNode&&!nt()&&!e.isDragging&&Te.parentNode.removeChild(Te)},ot=function(n,c){var a;if(!se||e.isPressed||!n||(n.type==="mousedown"||n.type==="pointerdown")&&!c&&Xe()-N<30&&ht[e.pointerEvent.type]){oe&&n&&se&&ue(n);return}if(er=nt(),xt=!1,e.pointerEvent=n,ht[n.type]?(ee=~n.type.indexOf("touch")?n.currentTarget||n.target:M,q(ee,"touchend",he),q(ee,"touchmove",Oe),q(ee,"touchcancel",he),q(M,"touchstart",pr)):(ee=null,q(M,"mousemove",Oe)),ge=null,(!St||!ee)&&(q(M,"mouseup",he),n&&n.target&&q(n.target,"mouseup",he)),it=F.call(e,n.target)&&r.dragClickables===!1&&!c,it){q(n.target,"change",he),j(e,"pressInit","onPressInit"),j(e,"press","onPress"),bt(b,!0),oe=!1;return}if(ce=!ee||g===w||e.vars.allowNativeTouchScrolling===!1||e.vars.allowContextMenu&&n&&(n.ctrlKey||n.which>2)?!1:g?"y":"x",oe=!ce&&!e.allowEventDefault,oe&&(ue(n),q(B,"touchforcechange",ue)),n.changedTouches?(n=mt=n.changedTouches[0],le=n.identifier):n.pointerId?le=n.pointerId:mt=le=null,Rt++,ti(Se),Ee=e.pointerY=n.pageY,be=e.pointerX=n.pageX,j(e,"pressInit","onPressInit"),(ce||e.autoScroll)&&Ft(i.parentNode),i.parentNode&&e.autoScroll&&!P&&!l&&i.parentNode._gsMaxScrollX&&!Te.parentNode&&!i.getBBox&&(Te.style.width=i.parentNode.scrollWidth+"px",i.parentNode.appendChild(Te)),kt(),e.tween&&e.tween.kill(),e.isThrowing=!1,D.killTweensOf(P||i,_,!0),P&&D.killTweensOf(i,{scrollTo:1},!0),e.tween=e.lockedAxis=null,(r.zIndexBoost||!l&&!P&&r.zIndexBoost!==!1)&&(i.style.zIndex=t.zIndex++),e.isPressed=!0,Zt=!!(r.onDrag||e._listeners.drag),Jt=!!(r.onMove||e._listeners.move),r.cursor!==!1||r.activeCursor)for(a=b.length;--a>-1;)D.set(b[a],{cursor:r.activeCursor||r.cursor||(ut==="grab"?"grabbing":ut)});j(e,"press","onPress")},Oe=function(n){var c=n,a,p,h,v,L,x;if(!se||qt||!e.isPressed||!n){oe&&n&&se&&ue(n);return}if(e.pointerEvent=n,a=n.changedTouches,a){if(n=a[0],n!==mt&&n.identifier!==le){for(v=a.length;--v>-1&&(n=a[v]).identifier!==le&&n.target!==i;);if(v<0)return}}else if(n.pointerId&&le&&n.pointerId!==le)return;if(ee&&ce&&!ge&&(fe.x=n.pageX-(ne?Je(M):0),fe.y=n.pageY-(ne?Ze(M):0),I&&I.apply(fe,fe),p=fe.x,h=fe.y,L=Math.abs(p-be),x=Math.abs(h-Ee),(L!==x&&(L>k||x>k)||dt&&ce===ge)&&(ge=L>x&&g?"x":"y",ce&&ge!==ce&&q(B,"touchforcechange",ue),e.vars.lockAxisOnTouchScroll!==!1&&g&&w&&(e.lockedAxis=ge==="x"?"y":"x",Ye(e.vars.onLockAxis)&&e.vars.onLockAxis.call(e,c)),dt&&ce===ge))){he(c);return}!e.allowEventDefault&&(!ce||ge&&ce!==ge)&&c.cancelable!==!1?(ue(c),oe=!0):oe&&(oe=!1),e.autoScroll&&(A=!0),at(n.pageX,n.pageY,Jt)},at=function(n,c,a){var p=1-e.dragResistance,h=1-e.edgeResistance,v=e.pointerX,L=e.pointerY,x=Q,X=e.x,C=e.y,Y=e.endX,$=e.endY,ie=e.endRotation,Le=Z,de,Ie,te,V,Xt,ve;e.pointerX=n,e.pointerY=c,ne&&(n-=Je(M),c-=Ze(M)),l?(V=Math.atan2(rt.y-c,n-rt.x)*lr,Xt=e.y-V,Xt>180?(Q-=360,e.y=V):Xt<-180&&(Q+=360,e.y=V),e.x!==J||Math.max(Math.abs(be-n),Math.abs(Ee-c))>k?(e.y=V,te=J+(Q-V)*p):te=J):(I&&(ve=n*I.a+c*I.c+I.e,c=n*I.b+c*I.d+I.f,n=ve),Ie=c-Ee,de=n-be,Ie<k&&Ie>-k&&(Ie=0),de<k&&de>-k&&(de=0),(e.lockAxis||e.lockedAxis)&&(de||Ie)&&(ve=e.lockedAxis,ve||(e.lockedAxis=ve=g&&Math.abs(de)>Math.abs(Ie)?"y":w?"x":null,ve&&Ye(e.vars.onLockAxis)&&e.vars.onLockAxis.call(e,e.pointerEvent)),ve==="y"?Ie=0:ve==="x"&&(de=0)),te=Ne(J+de*p),V=Ne(Q+Ie*p)),(_e||Me||Fe)&&(e.x!==te||e.y!==V&&!l)&&(Fe&&(Qe.x=te,Qe.y=V,ve=Fe(Qe),te=Ne(ve.x),V=Ne(ve.y)),_e&&(te=Ne(_e(te))),Me&&(V=Ne(Me(V)))),Ae&&(te>z?te=z+Math.round((te-z)*h):te<H&&(te=H+Math.round((te-H)*h)),l||(V>K?V=Math.round(K+(V-K)*h):V<W&&(V=Math.round(W+(V-W)*h)))),(e.x!==te||e.y!==V&&!l)&&(l?(e.endRotation=e.x=e.endX=te,Z=!0):(w&&(e.y=e.endY=V,Z=!0),g&&(e.x=e.endX=te,Z=!0)),!a||j(e,"move","onMove")!==!1?!e.isDragging&&e.isPressed&&(e.isDragging=xt=!0,j(e,"dragstart","onDragStart")):(e.pointerX=v,e.pointerY=L,Q=x,e.x=X,e.y=C,e.endX=Y,e.endY=$,e.endRotation=ie,Z=Le))},he=function y(n,c){if(!se||!e.isPressed||n&&le!=null&&!c&&(n.pointerId&&n.pointerId!==le&&n.target!==i||n.changedTouches&&!ii(n.changedTouches,le))){oe&&n&&se&&ue(n);return}e.isPressed=!1;var a=n,p=e.isDragging,h=e.vars.allowContextMenu&&n&&(n.ctrlKey||n.which>2),v=D.delayedCall(.001,Mr),L,x,X,C,Y;if(ee?(U(ee,"touchend",y),U(ee,"touchmove",Oe),U(ee,"touchcancel",y),U(M,"touchstart",pr)):U(M,"mousemove",Oe),U(B,"touchforcechange",ue),(!St||!ee)&&(U(M,"mouseup",y),n&&n.target&&U(n.target,"mouseup",y)),Z=!1,p&&(O=cr=Xe(),e.isDragging=!1),fr(Se),it&&!h){n&&(U(n.target,"change",y),e.pointerEvent=a),bt(b,!1),j(e,"release","onRelease"),j(e,"click","onClick"),it=!1;return}for(x=b.length;--x>-1;)Ht(b[x],"cursor",r.cursor||(r.cursor!==!1?ut:null));if(Rt--,n){if(L=n.changedTouches,L&&(n=L[0],n!==mt&&n.identifier!==le)){for(x=L.length;--x>-1&&(n=L[x]).identifier!==le&&n.target!==i;);if(x<0&&!c)return}e.pointerEvent=a,e.pointerX=n.pageX,e.pointerY=n.pageY}return h&&a?(ue(a),oe=!0,j(e,"release","onRelease")):a&&!p?(oe=!1,er&&(r.snap||r.bounds)&&Nt(r.inertia||r.throwProps),j(e,"release","onRelease"),(!dt||a.type!=="touchmove")&&a.type.indexOf("cancel")===-1&&(j(e,"click","onClick"),Xe()-N<300&&j(e,"doubleclick","onDoubleClick"),C=a.target||i,N=Xe(),Y=function(){N!==_t&&e.enabled()&&!e.isPressed&&!a.defaultPrevented&&(C.click?C.click():M.createEvent&&(X=M.createEvent("MouseEvents"),X.initMouseEvent("click",!0,!0,B,1,e.pointerEvent.screenX,e.pointerEvent.screenY,e.pointerX,e.pointerY,!1,!1,!1,!1,0,null),C.dispatchEvent(X)))},!dt&&!a.defaultPrevented&&D.delayedCall(.05,Y))):(Nt(r.inertia||r.throwProps),!e.allowEventDefault&&a&&(r.dragClickables!==!1||!F.call(e,a.target))&&p&&(!ce||ge&&ce===ge)&&a.cancelable!==!1?(oe=!0,ue(a)):oe=!1,j(e,"release","onRelease")),nt()&&v.duration(e.tween.duration()),p&&j(e,"dragend","onDragEnd"),!0},yt=function(n){if(n&&e.isDragging&&!P){var c=n.target||i.parentNode,a=c.scrollLeft-c._gsScrollX,p=c.scrollTop-c._gsScrollY;(a||p)&&(I?(be-=a*I.a+p*I.c,Ee-=p*I.d+a*I.b):(be-=a,Ee-=p),c._gsScrollX+=a,c._gsScrollY+=p,at(e.pointerX,e.pointerY))}},or=function(n){var c=Xe(),a=c-N<100,p=c-O<50,h=a&&_t===N,v=e.pointerEvent&&e.pointerEvent.defaultPrevented,L=a&&tr===N,x=n.isTrusted||n.isTrusted==null&&a&&h;if((h||p&&e.vars.suppressClickOnDrag!==!1)&&n.stopImmediatePropagation&&n.stopImmediatePropagation(),a&&!(e.pointerEvent&&e.pointerEvent.defaultPrevented)&&(!h||x&&!L)){x&&h&&(tr=N),_t=N;return}(e.isPressed||p||a)&&(!x||!n.detail||!a||v)&&ue(n),!a&&!p&&!xt&&(n&&n.target&&(e.pointerEvent=n),j(e,"click","onClick"))},ar=function(n){return I?{x:n.x*I.a+n.y*I.c+I.e,y:n.x*I.b+n.y*I.d+I.f}:{x:n.x,y:n.y}};return Dt=t.get(i),Dt&&Dt.kill(),o.startDrag=function(y,n){var c,a,p,h;ot(y||e.pointerEvent,!0),n&&!e.hitTest(y||e.pointerEvent)&&(c=Ke(y||e.pointerEvent),a=Ke(i),p=ar({x:c.left+c.width/2,y:c.top+c.height/2}),h=ar({x:a.left+a.width/2,y:a.top+a.height/2}),be-=p.x-h.x,Ee-=p.y-h.y),e.isDragging||(e.isDragging=xt=!0,j(e,"dragstart","onDragStart"))},o.drag=Oe,o.endDrag=function(y){return he(y||e.pointerEvent,!0)},o.timeSinceDrag=function(){return e.isDragging?0:(Xe()-O)/1e3},o.timeSinceClick=function(){return(Xe()-N)/1e3},o.hitTest=function(y,n){return t.hitTest(e.target,y,n)},o.getDirection=function(y,n){var c=y==="velocity"&&xe?y:pt(y)&&!l?"element":"start",a,p,h,v,L,x;return c==="element"&&(L=Ke(e.target),x=Ke(y)),a=c==="start"?e.x-J:c==="velocity"?xe.getVelocity(i,m):L.left+L.width/2-(x.left+x.width/2),l?a<0?"counter-clockwise":"clockwise":(n=n||2,p=c==="start"?e.y-Q:c==="velocity"?xe.getVelocity(i,u):L.top+L.height/2-(x.top+x.height/2),h=Math.abs(a/p),v=h<1/n?"":a<0?"left":"right",h<n&&(v!==""&&(v+="-"),v+=p<0?"up":"down"),v)},o.applyBounds=function(y,n){var c,a,p,h,v,L;if(y&&r.bounds!==y)return r.bounds=y,e.update(!0,n);if(He(!0),It(),Ae&&!nt()){if(c=e.x,a=e.y,c>z?c=z:c<H&&(c=H),a>K?a=K:a<W&&(a=W),(e.x!==c||e.y!==a)&&(p=!0,e.x=e.endX=c,l?e.endRotation=c:e.y=e.endY=a,Z=!0,Se(!0),e.autoScroll&&!e.isDragging))for(Ft(i.parentNode),h=i,Re.scrollTop=B.pageYOffset!=null?B.pageYOffset:M.documentElement.scrollTop!=null?M.documentElement.scrollTop:M.body.scrollTop,Re.scrollLeft=B.pageXOffset!=null?B.pageXOffset:M.documentElement.scrollLeft!=null?M.documentElement.scrollLeft:M.body.scrollLeft;h&&!L;)L=et(h.parentNode),v=L?Re:h.parentNode,w&&v.scrollTop>v._gsMaxScrollY&&(v.scrollTop=v._gsMaxScrollY),g&&v.scrollLeft>v._gsMaxScrollX&&(v.scrollLeft=v._gsMaxScrollX),h=v;e.isThrowing&&(p||e.endX>z||e.endX<H||e.endY>K||e.endY<W)&&Nt(r.inertia||r.throwProps,p)}return e},o.update=function(y,n,c){if(n&&e.isPressed){var a=Ge(i),p=rr.apply({x:e.x-J,y:e.y-Q}),h=Ge(i.parentNode,!0);h.apply({x:a.e-p.x,y:a.f-p.y},p),e.x-=p.x-h.e,e.y-=p.y-h.f,Se(!0),kt()}var v=e.x,L=e.y;return nr(!n),y?e.applyBounds():(Z&&c&&Se(!0),He(!0)),n&&(at(e.pointerX,e.pointerY),Z&&Se(!0)),e.isPressed&&!n&&(g&&Math.abs(v-e.x)>.01||w&&Math.abs(L-e.y)>.01&&!l)&&kt(),e.autoScroll&&(Ft(i.parentNode,e.isDragging),A=e.isDragging,Se(!0),hr(i,yt),gr(i,yt)),e},o.enable=function(y){var n={lazy:!0},c,a,p;if(r.cursor!==!1&&(n.cursor=r.cursor||ut),D.utils.checkPrefix("touchCallout")&&(n.touchCallout="none"),y!=="soft"){for(dr(b,g===w?"none":r.allowNativeTouchScrolling&&i.scrollHeight===i.clientHeight==(i.scrollWidth===i.clientHeight)||r.allowEventDefault?"manipulation":g?"pan-y":"pan-x"),a=b.length;--a>-1;)p=b[a],St||q(p,"mousedown",ot),q(p,"touchstart",ot),q(p,"click",or,!0),D.set(p,n),p.getBBox&&p.ownerSVGElement&&g!==w&&D.set(p.ownerSVGElement,{touchAction:r.allowNativeTouchScrolling||r.allowEventDefault?"manipulation":g?"pan-y":"pan-x"}),r.allowContextMenu||q(p,"contextmenu",ir);bt(b,!1)}return gr(i,yt),se=!0,xe&&y!=="soft"&&xe.track(P||i,d?"x,y":l?"rotation":"top,left"),i._gsDragID=c=i._gsDragID||"d"+Zr++,qe[c]=e,P&&(P.enable(),P.element._gsDragID=c),(r.bounds||l)&&kt(),r.bounds&&e.applyBounds(),e},o.disable=function(y){for(var n=e.isDragging,c=b.length,a;--c>-1;)Ht(b[c],"cursor",null);if(y!=="soft"){for(dr(b,null),c=b.length;--c>-1;)a=b[c],Ht(a,"touchCallout",null),U(a,"mousedown",ot),U(a,"touchstart",ot),U(a,"click",or,!0),U(a,"contextmenu",ir);bt(b,!0),ee&&(U(ee,"touchcancel",he),U(ee,"touchend",he),U(ee,"touchmove",Oe)),U(M,"mouseup",he),U(M,"mousemove",Oe)}return hr(i,yt),se=!1,xe&&y!=="soft"&&(xe.untrack(P||i,d?"x,y":l?"rotation":"top,left"),e.tween&&e.tween.kill()),P&&P.disable(),fr(Se),e.isDragging=e.isPressed=it=!1,n&&j(e,"dragend","onDragEnd"),e},o.enabled=function(y,n){return arguments.length?y?e.enable(n):e.disable(n):se},o.kill=function(){return e.isThrowing=!1,e.tween&&e.tween.kill(),e.disable(),D.set(b,{clearProps:"userSelect"}),delete qe[i._gsDragID],e},o.revert=function(){this.kill(),this.styles&&this.styles.revert()},~s.indexOf("scroll")&&(P=o.scrollProxy=new li(i,ei({onKill:function(){e.isPressed&&he(null)}},r)),i.style.overflowY=w&&!Gt?"auto":"hidden",i.style.overflowX=g&&!Gt?"auto":"hidden",i=P.content),l?_.rotation=1:(g&&(_[m]=1),w&&(_[u]=1)),T.force3D="force3D"in r?r.force3D:!0,Er(sr(o)),o.enable(),o}return t.register=function(r){D=r,zt()},t.create=function(r,o){return jt||zt(!0),Be(r).map(function(s){return new t(s,o)})},t.get=function(r){return qe[(Be(r)[0]||{})._gsDragID]},t.timeSinceDrag=function(){return(Xe()-cr)/1e3},t.hitTest=function(r,o,s){if(r===o)return!1;var d=Ke(r),l=Ke(o),m=d.top,u=d.left,g=d.right,w=d.bottom,k=d.width,e=d.height,b=l.left>g||l.right<u||l.top>w||l.bottom<m,_,O,A;return b||!s?!b:(A=(s+"").indexOf("%")!==-1,s=parseFloat(s)||0,_={left:Math.max(u,l.left),top:Math.max(m,l.top)},_.width=Math.min(g,l.right)-_.left,_.height=Math.min(w,l.bottom)-_.top,_.width<0||_.height<0?!1:A?(s*=.01,O=_.width*_.height,O>=k*e*s||O>=l.width*l.height*s):_.width>s&&_.height>s)},t}(ci);ri(tt.prototype,{pointerX:0,pointerY:0,startX:0,startY:0,deltaX:0,deltaY:0,isDragging:!1,isPressed:!1});tt.zIndex=1e3;tt.version="3.13.0";Pr()&&D.registerPlugin(tt);me.registerPlugin(tt);const di=({imageSrc:f,rotate:t=30,peelBackHoverPct:i=30,peelBackActivePct:r=40,peelEasing:o="power3.out",peelHoverEasing:s="power2.out",width:d=200,shadowIntensity:l=.6,lightingIntensity:m=.1,initialPosition:u="center",peelDirection:g=0,className:w=""})=>{const k=re.useRef(null),e=re.useRef(null),b=re.useRef(null),_=re.useRef(null),O=re.useRef(null),A=10;re.useEffect(()=>{const R=e.current;if(!R)return;let G=0,E=0;u!=="center"&&(typeof u=="object"&&u.x!==void 0&&u.y!==void 0&&(G=u.x,E=u.y),me.set(R,{x:G,y:E}))},[u]),re.useEffect(()=>{const R=e.current,G=R.parentNode;O.current=tt.create(R,{type:"x,y",bounds:G,inertia:!0,onDrag(){const F=me.utils.clamp(-24,24,this.deltaX*.4);me.to(R,{rotation:F,duration:.15,ease:"power1.out"})},onDragEnd(){me.to(R,{rotation:0,duration:.8,ease:"power2.out"})}})[0];const E=()=>{if(O.current){O.current.update();const F=me.getProperty(R,"x"),N=me.getProperty(R,"y"),T=G.getBoundingClientRect(),ne=R.getBoundingClientRect(),pe=T.width-ne.width,M=T.height-ne.height,se=Math.max(0,Math.min(F,pe)),P=Math.max(0,Math.min(N,M));(se!==F||P!==N)&&me.to(R,{x:se,y:P,duration:.3,ease:"power2.out"})}};return window.addEventListener("resize",E),window.addEventListener("orientationchange",E),()=>{window.removeEventListener("resize",E),window.removeEventListener("orientationchange",E),O.current&&O.current.kill()}},[]),re.useEffect(()=>{const R=E=>{var pe;const F=(pe=k.current)==null?void 0:pe.getBoundingClientRect();if(!F)return;const N=E.clientX-F.left,T=E.clientY-F.top;me.set(b.current,{attr:{x:N,y:T}}),Math.abs(g%360)!==180?me.set(_.current,{attr:{x:N,y:F.height-T}}):me.set(_.current,{attr:{x:-1e3,y:-1e3}})},G=k.current;if(G)return G.addEventListener("mousemove",R),()=>G.removeEventListener("mousemove",R)},[g]),re.useEffect(()=>{const R=k.current;if(!R)return;const G=()=>{R.classList.add("touch-active")},E=()=>{R.classList.remove("touch-active")};return R.addEventListener("touchstart",G),R.addEventListener("touchend",E),R.addEventListener("touchcancel",E),()=>{R.removeEventListener("touchstart",G),R.removeEventListener("touchend",E),R.removeEventListener("touchcancel",E)}},[]);const Pe=re.useMemo(()=>({"--sticker-rotate":`${t}deg`,"--sticker-p":`${A}px`,"--sticker-peelback-hover":`${i}%`,"--sticker-peelback-active":`${r}%`,"--sticker-peel-easing":o,"--sticker-peel-hover-easing":s,"--sticker-width":`${d}px`,"--sticker-shadow-opacity":l,"--sticker-lighting-constant":m,"--peel-direction":`${g}deg`}),[t,i,r,o,s,d,l,m,g]);return S.jsxs("div",{className:`draggable ${w}`,ref:e,style:Pe,children:[S.jsx("svg",{width:"0",height:"0",children:S.jsxs("defs",{children:[S.jsxs("filter",{id:"pointLight",children:[S.jsx("feGaussianBlur",{stdDeviation:"1",result:"blur"}),S.jsx("feSpecularLighting",{result:"spec",in:"blur",specularExponent:"100",specularConstant:m,lightingColor:"white",children:S.jsx("fePointLight",{ref:b,x:"100",y:"100",z:"300"})}),S.jsx("feComposite",{in:"spec",in2:"SourceGraphic",result:"lit"}),S.jsx("feComposite",{in:"lit",in2:"SourceAlpha",operator:"in"})]}),S.jsxs("filter",{id:"pointLightFlipped",children:[S.jsx("feGaussianBlur",{stdDeviation:"10",result:"blur"}),S.jsx("feSpecularLighting",{result:"spec",in:"blur",specularExponent:"100",specularConstant:m*7,lightingColor:"white",children:S.jsx("fePointLight",{ref:_,x:"100",y:"100",z:"300"})}),S.jsx("feComposite",{in:"spec",in2:"SourceGraphic",result:"lit"}),S.jsx("feComposite",{in:"lit",in2:"SourceAlpha",operator:"in"})]}),S.jsx("filter",{id:"dropShadow",children:S.jsx("feDropShadow",{dx:"2",dy:"4",stdDeviation:3*l,floodColor:"black",floodOpacity:l})}),S.jsxs("filter",{id:"expandAndFill",children:[S.jsx("feOffset",{dx:"0",dy:"0",in:"SourceAlpha",result:"shape"}),S.jsx("feFlood",{floodColor:"rgb(179,179,179)",result:"flood"}),S.jsx("feComposite",{operator:"in",in:"flood",in2:"shape"})]})]})}),S.jsxs("div",{className:"sticker-container",ref:k,children:[S.jsx("div",{className:"sticker-main",children:S.jsx("div",{className:"sticker-lighting",children:S.jsx("img",{src:f,alt:"",className:"sticker-image",draggable:"false",onContextMenu:R=>R.preventDefault()})})}),S.jsx("div",{className:"flap",children:S.jsx("div",{className:"flap-lighting",children:S.jsx("img",{src:f,alt:"",className:"flap-image",draggable:"false",onContextMenu:R=>R.preventDefault()})})})]})]})},ui=`import { useRef, useEffect, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import { Draggable } from 'gsap/Draggable';\r
import './StickerPeel.css';\r
\r
gsap.registerPlugin(Draggable);\r
\r
const StickerPeel = ({\r
  imageSrc,\r
  rotate = 30,\r
  peelBackHoverPct = 30,\r
  peelBackActivePct = 40,\r
  peelEasing = 'power3.out',\r
  peelHoverEasing = 'power2.out',\r
  width = 200,\r
  shadowIntensity = 0.6,\r
  lightingIntensity = 0.1,\r
  initialPosition = 'center',\r
  peelDirection = 0,\r
  className = ''\r
}) => {\r
  const containerRef = useRef(null);\r
  const dragTargetRef = useRef(null);\r
  const pointLightRef = useRef(null);\r
  const pointLightFlippedRef = useRef(null);\r
  const draggableInstanceRef = useRef(null);\r
\r
  const defaultPadding = 10;\r
\r
  useEffect(() => {\r
    const target = dragTargetRef.current;\r
    if (!target) return;\r
\r
    let startX = 0,\r
      startY = 0;\r
\r
    if (initialPosition === 'center') {\r
      return;\r
    }\r
\r
    if (typeof initialPosition === 'object' && initialPosition.x !== undefined && initialPosition.y !== undefined) {\r
      startX = initialPosition.x;\r
      startY = initialPosition.y;\r
    }\r
\r
    gsap.set(target, { x: startX, y: startY });\r
  }, [initialPosition]);\r
\r
  useEffect(() => {\r
    const target = dragTargetRef.current;\r
    const boundsEl = target.parentNode;\r
\r
    draggableInstanceRef.current = Draggable.create(target, {\r
      type: 'x,y',\r
      bounds: boundsEl,\r
      inertia: true,\r
      onDrag() {\r
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);\r
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' });\r
      },\r
      onDragEnd() {\r
        const rotationEase = 'power2.out';\r
        const duration = 0.8;\r
        gsap.to(target, { rotation: 0, duration, ease: rotationEase });\r
      }\r
    })[0];\r
\r
    const handleResize = () => {\r
      if (draggableInstanceRef.current) {\r
        draggableInstanceRef.current.update();\r
\r
        const currentX = gsap.getProperty(target, 'x');\r
        const currentY = gsap.getProperty(target, 'y');\r
\r
        const boundsRect = boundsEl.getBoundingClientRect();\r
        const targetRect = target.getBoundingClientRect();\r
\r
        const maxX = boundsRect.width - targetRect.width;\r
        const maxY = boundsRect.height - targetRect.height;\r
\r
        const newX = Math.max(0, Math.min(currentX, maxX));\r
        const newY = Math.max(0, Math.min(currentY, maxY));\r
\r
        if (newX !== currentX || newY !== currentY) {\r
          gsap.to(target, {\r
            x: newX,\r
            y: newY,\r
            duration: 0.3,\r
            ease: 'power2.out'\r
          });\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    window.addEventListener('orientationchange', handleResize);\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
      window.removeEventListener('orientationchange', handleResize);\r
      if (draggableInstanceRef.current) {\r
        draggableInstanceRef.current.kill();\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    const updateLight = e => {\r
      const rect = containerRef.current?.getBoundingClientRect();\r
      if (!rect) return;\r
\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
\r
      gsap.set(pointLightRef.current, { attr: { x, y } });\r
\r
      const normalizedAngle = Math.abs(peelDirection % 360);\r
      if (normalizedAngle !== 180) {\r
        gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });\r
      } else {\r
        gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } });\r
      }\r
    };\r
\r
    const container = containerRef.current;\r
    if (container) {\r
      container.addEventListener('mousemove', updateLight);\r
      return () => container.removeEventListener('mousemove', updateLight);\r
    }\r
  }, [peelDirection]);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const handleTouchStart = () => {\r
      container.classList.add('touch-active');\r
    };\r
\r
    const handleTouchEnd = () => {\r
      container.classList.remove('touch-active');\r
    };\r
\r
    container.addEventListener('touchstart', handleTouchStart);\r
    container.addEventListener('touchend', handleTouchEnd);\r
    container.addEventListener('touchcancel', handleTouchEnd);\r
\r
    return () => {\r
      container.removeEventListener('touchstart', handleTouchStart);\r
      container.removeEventListener('touchend', handleTouchEnd);\r
      container.removeEventListener('touchcancel', handleTouchEnd);\r
    };\r
  }, []);\r
\r
  const cssVars = useMemo(\r
    () => ({\r
      '--sticker-rotate': \`\${rotate}deg\`,\r
      '--sticker-p': \`\${defaultPadding}px\`,\r
      '--sticker-peelback-hover': \`\${peelBackHoverPct}%\`,\r
      '--sticker-peelback-active': \`\${peelBackActivePct}%\`,\r
      '--sticker-peel-easing': peelEasing,\r
      '--sticker-peel-hover-easing': peelHoverEasing,\r
      '--sticker-width': \`\${width}px\`,\r
      '--sticker-shadow-opacity': shadowIntensity,\r
      '--sticker-lighting-constant': lightingIntensity,\r
      '--peel-direction': \`\${peelDirection}deg\`\r
    }),\r
    [\r
      rotate,\r
      peelBackHoverPct,\r
      peelBackActivePct,\r
      peelEasing,\r
      peelHoverEasing,\r
      width,\r
      shadowIntensity,\r
      lightingIntensity,\r
      peelDirection\r
    ]\r
  );\r
\r
  return (\r
    <div className={\`draggable \${className}\`} ref={dragTargetRef} style={cssVars}>\r
      <svg width="0" height="0">\r
        <defs>\r
          <filter id="pointLight">\r
            <feGaussianBlur stdDeviation="1" result="blur" />\r
            <feSpecularLighting\r
              result="spec"\r
              in="blur"\r
              specularExponent="100"\r
              specularConstant={lightingIntensity}\r
              lightingColor="white"\r
            >\r
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />\r
            </feSpecularLighting>\r
            <feComposite in="spec" in2="SourceGraphic" result="lit" />\r
            <feComposite in="lit" in2="SourceAlpha" operator="in" />\r
          </filter>\r
\r
          <filter id="pointLightFlipped">\r
            <feGaussianBlur stdDeviation="10" result="blur" />\r
            <feSpecularLighting\r
              result="spec"\r
              in="blur"\r
              specularExponent="100"\r
              specularConstant={lightingIntensity * 7}\r
              lightingColor="white"\r
            >\r
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />\r
            </feSpecularLighting>\r
            <feComposite in="spec" in2="SourceGraphic" result="lit" />\r
            <feComposite in="lit" in2="SourceAlpha" operator="in" />\r
          </filter>\r
\r
          <filter id="dropShadow">\r
            <feDropShadow\r
              dx="2"\r
              dy="4"\r
              stdDeviation={3 * shadowIntensity}\r
              floodColor="black"\r
              floodOpacity={shadowIntensity}\r
            />\r
          </filter>\r
\r
          <filter id="expandAndFill">\r
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />\r
            <feFlood floodColor="rgb(179,179,179)" result="flood" />\r
            <feComposite operator="in" in="flood" in2="shape" />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="sticker-container" ref={containerRef}>\r
        <div className="sticker-main">\r
          <div className="sticker-lighting">\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="sticker-image"\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
\r
        <div className="flap">\r
          <div className="flap-lighting">\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="flap-image"\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default StickerPeel;\r
`,fi=`:root {\r
  --sticker-rotate: 30deg;\r
  --sticker-p: 10px;\r
  --sticker-peelback-hover: 30%;\r
  --sticker-peelback-active: 40%;\r
  --sticker-peel-easing: power3.out;\r
  --sticker-peel-hover-easing: power2.out;\r
  --sticker-start: calc(-1 * var(--sticker-p));\r
  --sticker-end: calc(100% + var(--sticker-p));\r
  --sticker-shadow-opacity: 0.6;\r
  --sticker-lighting-constant: 0.1;\r
  --peel-direction: 0deg;\r
}\r
\r
.sticker-container {\r
  position: relative;\r
  transform: rotate(var(--peel-direction));\r
  transform-origin: center;\r
}\r
\r
.sticker-container * {\r
  -webkit-user-select: none;\r
  user-select: none;\r
  -webkit-touch-callout: none;\r
  -webkit-tap-highlight-color: transparent;\r
}\r
\r
.sticker-main {\r
  clip-path: polygon(\r
    var(--sticker-start) var(--sticker-start),\r
    var(--sticker-end) var(--sticker-start),\r
    var(--sticker-end) var(--sticker-end),\r
    var(--sticker-start) var(--sticker-end)\r
  );\r
  transition: clip-path 0.6s ease-out;\r
  filter: url(#dropShadow);\r
}\r
\r
.sticker-main > * {\r
  transform: rotate(calc(-1 * var(--peel-direction)));\r
}\r
\r
.sticker-lighting {\r
  filter: url(#pointLight);\r
}\r
\r
.sticker-container:hover .sticker-main,\r
.sticker-container.touch-active .sticker-main {\r
  clip-path: polygon(\r
    var(--sticker-start) var(--sticker-peelback-hover),\r
    var(--sticker-end) var(--sticker-peelback-hover),\r
    var(--sticker-end) var(--sticker-end),\r
    var(--sticker-start) var(--sticker-end)\r
  );\r
}\r
\r
.sticker-container:active .sticker-main {\r
  clip-path: polygon(\r
    var(--sticker-start) var(--sticker-peelback-active),\r
    var(--sticker-end) var(--sticker-peelback-active),\r
    var(--sticker-end) var(--sticker-end),\r
    var(--sticker-start) var(--sticker-end)\r
  );\r
}\r
\r
.sticker-image {\r
  transform: rotate(var(--sticker-rotate));\r
}\r
\r
.flap {\r
  position: absolute;\r
  width: 100%;\r
  height: 100%;\r
  left: 0;\r
  top: calc(-100% - var(--sticker-p) - var(--sticker-p));\r
  clip-path: polygon(\r
    var(--sticker-start) var(--sticker-start),\r
    var(--sticker-end) var(--sticker-start),\r
    var(--sticker-end) var(--sticker-start),\r
    var(--sticker-start) var(--sticker-start)\r
  );\r
  transform: scaleY(-1);\r
  transition: all 0.6s ease-out;\r
}\r
\r
.flap > * {\r
  transform: rotate(calc(-1 * var(--peel-direction)));\r
}\r
\r
.sticker-container:hover .flap,\r
.sticker-container.touch-active .flap {\r
  clip-path: polygon(\r
    var(--sticker-start) var(--sticker-start),\r
    var(--sticker-end) var(--sticker-start),\r
    var(--sticker-end) var(--sticker-peelback-hover),\r
    var(--sticker-start) var(--sticker-peelback-hover)\r
  );\r
  top: calc(-100% + 2 * var(--sticker-peelback-hover) - 1px);\r
}\r
\r
.sticker-container:active .flap {\r
  clip-path: polygon(\r
    var(--sticker-start) var(--sticker-start),\r
    var(--sticker-end) var(--sticker-start),\r
    var(--sticker-end) var(--sticker-peelback-active),\r
    var(--sticker-start) var(--sticker-peelback-active)\r
  );\r
  top: calc(-100% + 2 * var(--sticker-peelback-active) - 1px);\r
}\r
\r
.flap-lighting {\r
  filter: url(#pointLightFlipped);\r
}\r
\r
.flap-image {\r
  transform: rotate(var(--sticker-rotate));\r
  filter: url(#expandAndFill);\r
}\r
\r
.draggable {\r
  position: absolute;\r
  cursor: grab;\r
  -webkit-transform: translateZ(0);\r
  transform: translateZ(0);\r
}\r
\r
.draggable:active {\r
  cursor: grabbing;\r
}\r
\r
/* Mobile-specific optimizations */\r
@media (hover: none) and (pointer: coarse) {\r
  .draggable {\r
    cursor: default;\r
  }\r
\r
  .sticker-container {\r
    touch-action: none;\r
  }\r
}\r
\r
.sticker-image,\r
.flap-image {\r
  width: var(--sticker-width, 200px);\r
}\r
\r
.sticker-main,\r
.flap {\r
  will-change: clip-path, transform;\r
}\r
\r
.sticker-ripple {\r
  position: absolute;\r
  border-radius: 50%;\r
  background: rgba(255, 255, 255, 0.6);\r
  pointer-events: none;\r
  z-index: 10;\r
}\r
`,pi=`import { useRef, useEffect, useMemo } from 'react';\r
import { gsap } from 'gsap';\r
import { Draggable } from 'gsap/Draggable';\r
\r
gsap.registerPlugin(Draggable);\r
\r
const StickerPeel = ({\r
  imageSrc,\r
  rotate = 30,\r
  peelBackHoverPct = 30,\r
  peelBackActivePct = 40,\r
  peelEasing = 'power3.out',\r
  peelHoverEasing = 'power2.out',\r
  width = 200,\r
  shadowIntensity = 0.6,\r
  lightingIntensity = 0.1,\r
  initialPosition = 'center',\r
  peelDirection = 0,\r
  className = ''\r
}) => {\r
  const containerRef = useRef(null);\r
  const dragTargetRef = useRef(null);\r
  const pointLightRef = useRef(null);\r
  const pointLightFlippedRef = useRef(null);\r
  const draggableInstanceRef = useRef(null);\r
\r
  const defaultPadding = 10;\r
\r
  useEffect(() => {\r
    const target = dragTargetRef.current;\r
    if (!target) return;\r
\r
    let startX = 0,\r
      startY = 0;\r
\r
    if (initialPosition === 'center') {\r
      return;\r
    }\r
\r
    if (typeof initialPosition === 'object' && initialPosition.x !== undefined && initialPosition.y !== undefined) {\r
      startX = initialPosition.x;\r
      startY = initialPosition.y;\r
    }\r
\r
    gsap.set(target, { x: startX, y: startY });\r
  }, [initialPosition]);\r
\r
  useEffect(() => {\r
    const target = dragTargetRef.current;\r
    const boundsEl = target.parentNode;\r
\r
    draggableInstanceRef.current = Draggable.create(target, {\r
      type: 'x,y',\r
      bounds: boundsEl,\r
      inertia: true,\r
      onDrag() {\r
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);\r
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' });\r
      },\r
      onDragEnd() {\r
        const rotationEase = 'power2.out';\r
        const duration = 0.8;\r
        gsap.to(target, { rotation: 0, duration, ease: rotationEase });\r
      }\r
    })[0];\r
\r
    const handleResize = () => {\r
      if (draggableInstanceRef.current) {\r
        draggableInstanceRef.current.update();\r
\r
        const currentX = gsap.getProperty(target, 'x');\r
        const currentY = gsap.getProperty(target, 'y');\r
\r
        const boundsRect = boundsEl.getBoundingClientRect();\r
        const targetRect = target.getBoundingClientRect();\r
\r
        const maxX = boundsRect.width - targetRect.width;\r
        const maxY = boundsRect.height - targetRect.height;\r
\r
        const newX = Math.max(0, Math.min(currentX, maxX));\r
        const newY = Math.max(0, Math.min(currentY, maxY));\r
\r
        if (newX !== currentX || newY !== currentY) {\r
          gsap.to(target, {\r
            x: newX,\r
            y: newY,\r
            duration: 0.3,\r
            ease: 'power2.out'\r
          });\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    window.addEventListener('orientationchange', handleResize);\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
      window.removeEventListener('orientationchange', handleResize);\r
      if (draggableInstanceRef.current) {\r
        draggableInstanceRef.current.kill();\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    const updateLight = e => {\r
      const rect = containerRef.current?.getBoundingClientRect();\r
      if (!rect) return;\r
\r
      const x = e.clientX - rect.left;\r
      const y = e.clientY - rect.top;\r
\r
      gsap.set(pointLightRef.current, { attr: { x, y } });\r
\r
      const normalizedAngle = Math.abs(peelDirection % 360);\r
      if (normalizedAngle !== 180) {\r
        gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });\r
      } else {\r
        gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } });\r
      }\r
    };\r
\r
    const container = containerRef.current;\r
    if (container) {\r
      container.addEventListener('mousemove', updateLight);\r
      return () => container.removeEventListener('mousemove', updateLight);\r
    }\r
  }, [peelDirection]);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const handleTouchStart = () => {\r
      container.classList.add('touch-active');\r
    };\r
\r
    const handleTouchEnd = () => {\r
      container.classList.remove('touch-active');\r
    };\r
\r
    container.addEventListener('touchstart', handleTouchStart);\r
    container.addEventListener('touchend', handleTouchEnd);\r
    container.addEventListener('touchcancel', handleTouchEnd);\r
\r
    return () => {\r
      container.removeEventListener('touchstart', handleTouchStart);\r
      container.removeEventListener('touchend', handleTouchEnd);\r
      container.removeEventListener('touchcancel', handleTouchEnd);\r
    };\r
  }, []);\r
\r
  const cssVars = useMemo(\r
    () => ({\r
      '--sticker-rotate': \`\${rotate}deg\`,\r
      '--sticker-p': \`\${defaultPadding}px\`,\r
      '--sticker-peelback-hover': \`\${peelBackHoverPct}%\`,\r
      '--sticker-peelback-active': \`\${peelBackActivePct}%\`,\r
      '--sticker-peel-easing': peelEasing,\r
      '--sticker-peel-hover-easing': peelHoverEasing,\r
      '--sticker-width': \`\${width}px\`,\r
      '--sticker-shadow-opacity': shadowIntensity,\r
      '--sticker-lighting-constant': lightingIntensity,\r
      '--peel-direction': \`\${peelDirection}deg\`,\r
      '--sticker-start': \`calc(-1 * \${defaultPadding}px)\`,\r
      '--sticker-end': \`calc(100% + \${defaultPadding}px)\`\r
    }),\r
    [\r
      rotate,\r
      peelBackHoverPct,\r
      peelBackActivePct,\r
      peelEasing,\r
      peelHoverEasing,\r
      width,\r
      shadowIntensity,\r
      lightingIntensity,\r
      peelDirection,\r
      defaultPadding\r
    ]\r
  );\r
\r
  const stickerMainStyle = {\r
    clipPath: \`polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end))\`,\r
    transition: 'clip-path 0.6s ease-out',\r
    filter: 'url(#dropShadow)',\r
    willChange: 'clip-path, transform'\r
  };\r
\r
  const flapStyle = {\r
    clipPath: \`polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-start) var(--sticker-start))\`,\r
    top: \`calc(-100% - var(--sticker-p) - var(--sticker-p))\`,\r
    transform: 'scaleY(-1)',\r
    transition: 'all 0.6s ease-out',\r
    willChange: 'clip-path, transform'\r
  };\r
\r
  const imageStyle = {\r
    transform: \`rotate(calc(\${rotate}deg - \${peelDirection}deg))\`,\r
    width: \`\${width}px\`\r
  };\r
\r
  const shadowImageStyle = {\r
    ...imageStyle,\r
    filter: 'url(#expandAndFill)'\r
  };\r
\r
  return (\r
    <div\r
      className={\`absolute cursor-grab active:cursor-grabbing transform-gpu \${className}\`}\r
      ref={dragTargetRef}\r
      style={cssVars}\r
    >\r
      <style\r
        dangerouslySetInnerHTML={{\r
          __html: \`\r
          .sticker-container:hover .sticker-main,\r
          .sticker-container.touch-active .sticker-main {\r
            clip-path: polygon(var(--sticker-start) var(--sticker-peelback-hover), var(--sticker-end) var(--sticker-peelback-hover), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end)) !important;\r
          }\r
          .sticker-container:hover .sticker-flap,\r
          .sticker-container.touch-active .sticker-flap {\r
            clip-path: polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-peelback-hover), var(--sticker-start) var(--sticker-peelback-hover)) !important;\r
            top: calc(-100% + 2 * var(--sticker-peelback-hover) - 1px) !important;\r
          }\r
          .sticker-container:active .sticker-main {\r
            clip-path: polygon(var(--sticker-start) var(--sticker-peelback-active), var(--sticker-end) var(--sticker-peelback-active), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end)) !important;\r
          }\r
          .sticker-container:active .sticker-flap {\r
            clip-path: polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-peelback-active), var(--sticker-start) var(--sticker-peelback-active)) !important;\r
            top: calc(-100% + 2 * var(--sticker-peelback-active) - 1px) !important;\r
          }\r
        \`\r
        }}\r
      />\r
\r
      <svg width="0" height="0">\r
        <defs>\r
          <filter id="pointLight">\r
            <feGaussianBlur stdDeviation="1" result="blur" />\r
            <feSpecularLighting\r
              result="spec"\r
              in="blur"\r
              specularExponent="100"\r
              specularConstant={lightingIntensity}\r
              lightingColor="white"\r
            >\r
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />\r
            </feSpecularLighting>\r
            <feComposite in="spec" in2="SourceGraphic" result="lit" />\r
            <feComposite in="lit" in2="SourceAlpha" operator="in" />\r
          </filter>\r
\r
          <filter id="pointLightFlipped">\r
            <feGaussianBlur stdDeviation="10" result="blur" />\r
            <feSpecularLighting\r
              result="spec"\r
              in="blur"\r
              specularExponent="100"\r
              specularConstant={lightingIntensity * 7}\r
              lightingColor="white"\r
            >\r
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />\r
            </feSpecularLighting>\r
            <feComposite in="spec" in2="SourceGraphic" result="lit" />\r
            <feComposite in="lit" in2="SourceAlpha" operator="in" />\r
          </filter>\r
\r
          <filter id="dropShadow">\r
            <feDropShadow\r
              dx="2"\r
              dy="4"\r
              stdDeviation={3 * shadowIntensity}\r
              floodColor="black"\r
              floodOpacity={shadowIntensity}\r
            />\r
          </filter>\r
\r
          <filter id="expandAndFill">\r
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />\r
            <feFlood floodColor="rgb(179,179,179)" result="flood" />\r
            <feComposite operator="in" in="flood" in2="shape" />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div\r
        className="sticker-container relative select-none touch-none sm:touch-auto"\r
        ref={containerRef}\r
        style={{\r
          WebkitUserSelect: 'none',\r
          userSelect: 'none',\r
          WebkitTouchCallout: 'none',\r
          WebkitTapHighlightColor: 'transparent',\r
          transform: \`rotate(\${peelDirection}deg)\`,\r
          transformOrigin: 'center'\r
        }}\r
      >\r
        <div className="sticker-main" style={stickerMainStyle}>\r
          <div style={{ filter: 'url(#pointLight)' }}>\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="block"\r
              style={imageStyle}\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
\r
        <div className="absolute top-4 left-2 w-full h-full opacity-40" style={{ filter: 'brightness(0) blur(8px)' }}>\r
          <div className="sticker-flap" style={flapStyle}>\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="block"\r
              style={shadowImageStyle}\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
\r
        <div className="sticker-flap absolute w-full h-full left-0" style={flapStyle}>\r
          <div style={{ filter: 'url(#pointLightFlipped)' }}>\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="block"\r
              style={shadowImageStyle}\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default StickerPeel;\r
`,gi=`import { useRef, useEffect, useMemo, CSSProperties } from 'react';\r
import { gsap } from 'gsap';\r
import { Draggable } from 'gsap/Draggable';\r
import './StickerPeel.css';\r
\r
gsap.registerPlugin(Draggable);\r
\r
interface StickerPeelProps {\r
  imageSrc: string;\r
  rotate?: number;\r
  peelBackHoverPct?: number;\r
  peelBackActivePct?: number;\r
  peelEasing?: string;\r
  peelHoverEasing?: string;\r
  width?: number;\r
  shadowIntensity?: number;\r
  lightingIntensity?: number;\r
  initialPosition?: 'center' | 'random' | { x: number; y: number };\r
  peelDirection?: number;\r
  className?: string;\r
}\r
\r
interface CSSVars extends CSSProperties {\r
  '--sticker-rotate'?: string;\r
  '--sticker-p'?: string;\r
  '--sticker-peelback-hover'?: string;\r
  '--sticker-peelback-active'?: string;\r
  '--sticker-peel-easing'?: string;\r
  '--sticker-peel-hover-easing'?: string;\r
  '--sticker-width'?: string;\r
  '--sticker-shadow-opacity'?: number;\r
  '--sticker-lighting-constant'?: number;\r
  '--peel-direction'?: string;\r
}\r
\r
const StickerPeel: React.FC<StickerPeelProps> = ({\r
  imageSrc,\r
  rotate = 30,\r
  peelBackHoverPct = 30,\r
  peelBackActivePct = 40,\r
  peelEasing = 'power3.out',\r
  peelHoverEasing = 'power2.out',\r
  width = 200,\r
  shadowIntensity = 0.6,\r
  lightingIntensity = 0.1,\r
  initialPosition = 'center',\r
  peelDirection = 0,\r
  className = ''\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const dragTargetRef = useRef<HTMLDivElement>(null);\r
  const pointLightRef = useRef<SVGFEPointLightElement>(null);\r
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);\r
  const draggableInstanceRef = useRef<Draggable | null>(null);\r
\r
  const defaultPadding = 10;\r
\r
  useEffect(() => {\r
    const target = dragTargetRef.current;\r
    if (!target) return;\r
\r
    let startX = 0,\r
      startY = 0;\r
\r
    if (initialPosition === 'center') {\r
      return;\r
    }\r
\r
    if (typeof initialPosition === 'object' && initialPosition.x !== undefined && initialPosition.y !== undefined) {\r
      startX = initialPosition.x;\r
      startY = initialPosition.y;\r
    }\r
\r
    gsap.set(target, { x: startX, y: startY });\r
  }, [initialPosition]);\r
\r
  useEffect(() => {\r
    const target = dragTargetRef.current;\r
    if (!target) return;\r
\r
    const boundsEl = target.parentNode as HTMLElement;\r
\r
    const draggable = Draggable.create(target, {\r
      type: 'x,y',\r
      bounds: boundsEl,\r
      inertia: true,\r
      onDrag(this: Draggable) {\r
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);\r
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' });\r
      },\r
      onDragEnd() {\r
        const rotationEase = 'power2.out';\r
        const duration = 0.8;\r
        gsap.to(target, { rotation: 0, duration, ease: rotationEase });\r
      }\r
    });\r
\r
    draggableInstanceRef.current = draggable[0];\r
\r
    const handleResize = () => {\r
      if (draggableInstanceRef.current) {\r
        draggableInstanceRef.current.update();\r
\r
        const currentX = gsap.getProperty(target, 'x') as number;\r
        const currentY = gsap.getProperty(target, 'y') as number;\r
\r
        const boundsRect = boundsEl.getBoundingClientRect();\r
        const targetRect = target.getBoundingClientRect();\r
\r
        const maxX = boundsRect.width - targetRect.width;\r
        const maxY = boundsRect.height - targetRect.height;\r
\r
        const newX = Math.max(0, Math.min(currentX, maxX));\r
        const newY = Math.max(0, Math.min(currentY, maxY));\r
\r
        if (newX !== currentX || newY !== currentY) {\r
          gsap.to(target, {\r
            x: newX,\r
            y: newY,\r
            duration: 0.3,\r
            ease: 'power2.out'\r
          });\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    window.addEventListener('orientationchange', handleResize);\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
      window.removeEventListener('orientationchange', handleResize);\r
      if (draggableInstanceRef.current) {\r
        draggableInstanceRef.current.kill();\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    const updateLight = (e: Event) => {\r
      const mouseEvent = e as MouseEvent;\r
      const rect = containerRef.current?.getBoundingClientRect();\r
      if (!rect) return;\r
\r
      const x = mouseEvent.clientX - rect.left;\r
      const y = mouseEvent.clientY - rect.top;\r
\r
      if (pointLightRef.current) {\r
        gsap.set(pointLightRef.current, { attr: { x, y } });\r
      }\r
\r
      const normalizedAngle = Math.abs(peelDirection % 360);\r
      if (pointLightFlippedRef.current) {\r
        if (normalizedAngle !== 180) {\r
          gsap.set(pointLightFlippedRef.current, {\r
            attr: { x, y: rect.height - y }\r
          });\r
        } else {\r
          gsap.set(pointLightFlippedRef.current, {\r
            attr: { x: -1000, y: -1000 }\r
          });\r
        }\r
      }\r
    };\r
\r
    const container = containerRef.current;\r
    const eventType = 'mousemove';\r
\r
    if (container) {\r
      container.addEventListener(eventType, updateLight);\r
      return () => container.removeEventListener(eventType, updateLight);\r
    }\r
  }, [peelDirection]);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const handleTouchStart = () => {\r
      container.classList.add('touch-active');\r
    };\r
\r
    const handleTouchEnd = () => {\r
      container.classList.remove('touch-active');\r
    };\r
\r
    container.addEventListener('touchstart', handleTouchStart);\r
    container.addEventListener('touchend', handleTouchEnd);\r
    container.addEventListener('touchcancel', handleTouchEnd);\r
\r
    return () => {\r
      container.removeEventListener('touchstart', handleTouchStart);\r
      container.removeEventListener('touchend', handleTouchEnd);\r
      container.removeEventListener('touchcancel', handleTouchEnd);\r
    };\r
  }, []);\r
\r
  const cssVars: CSSVars = useMemo(\r
    () => ({\r
      '--sticker-rotate': \`\${rotate}deg\`,\r
      '--sticker-p': \`\${defaultPadding}px\`,\r
      '--sticker-peelback-hover': \`\${peelBackHoverPct}%\`,\r
      '--sticker-peelback-active': \`\${peelBackActivePct}%\`,\r
      '--sticker-peel-easing': peelEasing,\r
      '--sticker-peel-hover-easing': peelHoverEasing,\r
      '--sticker-width': \`\${width}px\`,\r
      '--sticker-shadow-opacity': shadowIntensity,\r
      '--sticker-lighting-constant': lightingIntensity,\r
      '--peel-direction': \`\${peelDirection}deg\`\r
    }),\r
    [\r
      rotate,\r
      peelBackHoverPct,\r
      peelBackActivePct,\r
      peelEasing,\r
      peelHoverEasing,\r
      width,\r
      shadowIntensity,\r
      lightingIntensity,\r
      peelDirection\r
    ]\r
  );\r
\r
  return (\r
    <div className={\`draggable \${className}\`} ref={dragTargetRef} style={cssVars}>\r
      <svg width="0" height="0">\r
        <defs>\r
          <filter id="pointLight">\r
            <feGaussianBlur stdDeviation="1" result="blur" />\r
            <feSpecularLighting\r
              result="spec"\r
              in="blur"\r
              specularExponent="100"\r
              specularConstant={lightingIntensity}\r
              lightingColor="white"\r
            >\r
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />\r
            </feSpecularLighting>\r
            <feComposite in="spec" in2="SourceGraphic" result="lit" />\r
            <feComposite in="lit" in2="SourceAlpha" operator="in" />\r
          </filter>\r
\r
          <filter id="pointLightFlipped">\r
            <feGaussianBlur stdDeviation="10" result="blur" />\r
            <feSpecularLighting\r
              result="spec"\r
              in="blur"\r
              specularExponent="100"\r
              specularConstant={lightingIntensity * 7}\r
              lightingColor="white"\r
            >\r
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />\r
            </feSpecularLighting>\r
            <feComposite in="spec" in2="SourceGraphic" result="lit" />\r
            <feComposite in="lit" in2="SourceAlpha" operator="in" />\r
          </filter>\r
\r
          <filter id="dropShadow">\r
            <feDropShadow\r
              dx="2"\r
              dy="4"\r
              stdDeviation={3 * shadowIntensity}\r
              floodColor="black"\r
              floodOpacity={shadowIntensity}\r
            />\r
          </filter>\r
\r
          <filter id="expandAndFill">\r
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />\r
            <feFlood floodColor="rgb(179,179,179)" result="flood" />\r
            <feComposite operator="in" in="flood" in2="shape" />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div className="sticker-container" ref={containerRef}>\r
        <div className="sticker-main">\r
          <div className="sticker-lighting">\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="sticker-image"\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
\r
        <div className="flap">\r
          <div className="flap-lighting">\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="flap-image"\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default StickerPeel;\r
`,hi=`import { useRef, useEffect, useMemo, CSSProperties } from 'react';\r
import { gsap } from 'gsap';\r
import { Draggable } from 'gsap/Draggable';\r
\r
gsap.registerPlugin(Draggable);\r
\r
interface StickerPeelProps {\r
  imageSrc: string;\r
  rotate?: number;\r
  peelBackHoverPct?: number;\r
  peelBackActivePct?: number;\r
  peelEasing?: string;\r
  peelHoverEasing?: string;\r
  width?: number;\r
  shadowIntensity?: number;\r
  lightingIntensity?: number;\r
  initialPosition?: 'center' | 'random' | { x: number; y: number };\r
  peelDirection?: number;\r
  className?: string;\r
}\r
\r
interface CSSVars extends CSSProperties {\r
  '--sticker-rotate'?: string;\r
  '--sticker-p'?: string;\r
  '--sticker-peelback-hover'?: string;\r
  '--sticker-peelback-active'?: string;\r
  '--sticker-peel-easing'?: string;\r
  '--sticker-peel-hover-easing'?: string;\r
  '--sticker-width'?: string;\r
  '--sticker-shadow-opacity'?: number;\r
  '--sticker-lighting-constant'?: number;\r
  '--peel-direction'?: string;\r
  '--sticker-start'?: string;\r
  '--sticker-end'?: string;\r
}\r
\r
const StickerPeel: React.FC<StickerPeelProps> = ({\r
  imageSrc,\r
  rotate = 30,\r
  peelBackHoverPct = 30,\r
  peelBackActivePct = 40,\r
  peelEasing = 'power3.out',\r
  peelHoverEasing = 'power2.out',\r
  width = 200,\r
  shadowIntensity = 0.6,\r
  lightingIntensity = 0.1,\r
  initialPosition = 'center',\r
  peelDirection = 0,\r
  className = ''\r
}) => {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
  const dragTargetRef = useRef<HTMLDivElement>(null);\r
  const pointLightRef = useRef<SVGFEPointLightElement>(null);\r
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);\r
  const draggableInstanceRef = useRef<Draggable | null>(null);\r
\r
  const defaultPadding = 12;\r
\r
  useEffect(() => {\r
    const target = dragTargetRef.current;\r
    if (!target) return;\r
\r
    let startX = 0,\r
      startY = 0;\r
\r
    if (initialPosition === 'center') {\r
      return;\r
    }\r
\r
    if (typeof initialPosition === 'object' && initialPosition.x !== undefined && initialPosition.y !== undefined) {\r
      startX = initialPosition.x;\r
      startY = initialPosition.y;\r
    }\r
\r
    gsap.set(target, { x: startX, y: startY });\r
  }, [initialPosition]);\r
\r
  useEffect(() => {\r
    const target = dragTargetRef.current;\r
    if (!target) return;\r
\r
    const boundsEl = target.parentNode as HTMLElement;\r
\r
    const draggable = Draggable.create(target, {\r
      type: 'x,y',\r
      bounds: boundsEl,\r
      inertia: true,\r
      onDrag(this: Draggable) {\r
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);\r
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' });\r
      },\r
      onDragEnd() {\r
        const rotationEase = 'power2.out';\r
        const duration = 0.8;\r
        gsap.to(target, { rotation: 0, duration, ease: rotationEase });\r
      }\r
    });\r
\r
    draggableInstanceRef.current = draggable[0];\r
\r
    const handleResize = () => {\r
      if (draggableInstanceRef.current) {\r
        draggableInstanceRef.current.update();\r
\r
        const currentX = gsap.getProperty(target, 'x') as number;\r
        const currentY = gsap.getProperty(target, 'y') as number;\r
\r
        const boundsRect = boundsEl.getBoundingClientRect();\r
        const targetRect = target.getBoundingClientRect();\r
\r
        const maxX = boundsRect.width - targetRect.width;\r
        const maxY = boundsRect.height - targetRect.height;\r
\r
        const newX = Math.max(0, Math.min(currentX, maxX));\r
        const newY = Math.max(0, Math.min(currentY, maxY));\r
\r
        if (newX !== currentX || newY !== currentY) {\r
          gsap.to(target, {\r
            x: newX,\r
            y: newY,\r
            duration: 0.3,\r
            ease: 'power2.out'\r
          });\r
        }\r
      }\r
    };\r
\r
    window.addEventListener('resize', handleResize);\r
    window.addEventListener('orientationchange', handleResize);\r
\r
    return () => {\r
      window.removeEventListener('resize', handleResize);\r
      window.removeEventListener('orientationchange', handleResize);\r
      if (draggableInstanceRef.current) {\r
        draggableInstanceRef.current.kill();\r
      }\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    const updateLight = (e: Event) => {\r
      const mouseEvent = e as MouseEvent;\r
      const rect = containerRef.current?.getBoundingClientRect();\r
      if (!rect) return;\r
\r
      const x = mouseEvent.clientX - rect.left;\r
      const y = mouseEvent.clientY - rect.top;\r
\r
      if (pointLightRef.current) {\r
        gsap.set(pointLightRef.current, { attr: { x, y } });\r
      }\r
\r
      const normalizedAngle = Math.abs(peelDirection % 360);\r
      if (pointLightFlippedRef.current) {\r
        if (normalizedAngle !== 180) {\r
          gsap.set(pointLightFlippedRef.current, {\r
            attr: { x, y: rect.height - y }\r
          });\r
        } else {\r
          gsap.set(pointLightFlippedRef.current, {\r
            attr: { x: -1000, y: -1000 }\r
          });\r
        }\r
      }\r
    };\r
\r
    const container = containerRef.current;\r
    const eventType = 'mousemove';\r
\r
    if (container) {\r
      container.addEventListener(eventType, updateLight);\r
      return () => container.removeEventListener(eventType, updateLight);\r
    }\r
  }, [peelDirection]);\r
\r
  useEffect(() => {\r
    const container = containerRef.current;\r
    if (!container) return;\r
\r
    const handleTouchStart = () => {\r
      container.classList.add('touch-active');\r
    };\r
\r
    const handleTouchEnd = () => {\r
      container.classList.remove('touch-active');\r
    };\r
\r
    container.addEventListener('touchstart', handleTouchStart);\r
    container.addEventListener('touchend', handleTouchEnd);\r
    container.addEventListener('touchcancel', handleTouchEnd);\r
\r
    return () => {\r
      container.removeEventListener('touchstart', handleTouchStart);\r
      container.removeEventListener('touchend', handleTouchEnd);\r
      container.removeEventListener('touchcancel', handleTouchEnd);\r
    };\r
  }, []);\r
\r
  const cssVars: CSSVars = useMemo(\r
    () => ({\r
      '--sticker-rotate': \`\${rotate}deg\`,\r
      '--sticker-p': \`\${defaultPadding}px\`,\r
      '--sticker-peelback-hover': \`\${peelBackHoverPct}%\`,\r
      '--sticker-peelback-active': \`\${peelBackActivePct}%\`,\r
      '--sticker-peel-easing': peelEasing,\r
      '--sticker-peel-hover-easing': peelHoverEasing,\r
      '--sticker-width': \`\${width}px\`,\r
      '--sticker-shadow-opacity': shadowIntensity,\r
      '--sticker-lighting-constant': lightingIntensity,\r
      '--peel-direction': \`\${peelDirection}deg\`,\r
      '--sticker-start': \`calc(-1 * \${defaultPadding}px)\`,\r
      '--sticker-end': \`calc(100% + \${defaultPadding}px)\`\r
    }),\r
    [\r
      rotate,\r
      peelBackHoverPct,\r
      peelBackActivePct,\r
      peelEasing,\r
      peelHoverEasing,\r
      width,\r
      shadowIntensity,\r
      lightingIntensity,\r
      peelDirection,\r
      defaultPadding\r
    ]\r
  );\r
\r
  const stickerMainStyle: CSSProperties = {\r
    clipPath: \`polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end))\`,\r
    transition: 'clip-path 0.6s ease-out',\r
    filter: 'url(#dropShadow)',\r
    willChange: 'clip-path, transform'\r
  };\r
\r
  const flapStyle: CSSProperties = {\r
    clipPath: \`polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-start) var(--sticker-start))\`,\r
    top: \`calc(-100% - var(--sticker-p) - var(--sticker-p))\`,\r
    transform: 'scaleY(-1)',\r
    transition: 'all 0.6s ease-out',\r
    willChange: 'clip-path, transform'\r
  };\r
\r
  const imageStyle: CSSProperties = {\r
    transform: \`rotate(calc(\${rotate}deg - \${peelDirection}deg))\`,\r
    width: \`\${width}px\`\r
  };\r
\r
  const shadowImageStyle: CSSProperties = {\r
    ...imageStyle,\r
    filter: 'url(#expandAndFill)'\r
  };\r
\r
  return (\r
    <div\r
      className={\`absolute cursor-grab active:cursor-grabbing transform-gpu \${className}\`}\r
      ref={dragTargetRef}\r
      style={cssVars}\r
    >\r
      <style\r
        dangerouslySetInnerHTML={{\r
          __html: \`\r
          .sticker-container:hover .sticker-main,\r
          .sticker-container.touch-active .sticker-main {\r
            clip-path: polygon(var(--sticker-start) var(--sticker-peelback-hover), var(--sticker-end) var(--sticker-peelback-hover), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end)) !important;\r
          }\r
          .sticker-container:hover .sticker-flap,\r
          .sticker-container.touch-active .sticker-flap {\r
            clip-path: polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-peelback-hover), var(--sticker-start) var(--sticker-peelback-hover)) !important;\r
            top: calc(-100% + 2 * var(--sticker-peelback-hover) - 1px) !important;\r
          }\r
          .sticker-container:active .sticker-main {\r
            clip-path: polygon(var(--sticker-start) var(--sticker-peelback-active), var(--sticker-end) var(--sticker-peelback-active), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end)) !important;\r
          }\r
          .sticker-container:active .sticker-flap {\r
            clip-path: polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-peelback-active), var(--sticker-start) var(--sticker-peelback-active)) !important;\r
            top: calc(-100% + 2 * var(--sticker-peelback-active) - 1px) !important;\r
          }\r
        \`\r
        }}\r
      />\r
\r
      <svg width="0" height="0">\r
        <defs>\r
          <filter id="pointLight">\r
            <feGaussianBlur stdDeviation="1" result="blur" />\r
            <feSpecularLighting\r
              result="spec"\r
              in="blur"\r
              specularExponent="100"\r
              specularConstant={lightingIntensity}\r
              lightingColor="white"\r
            >\r
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />\r
            </feSpecularLighting>\r
            <feComposite in="spec" in2="SourceGraphic" result="lit" />\r
            <feComposite in="lit" in2="SourceAlpha" operator="in" />\r
          </filter>\r
\r
          <filter id="pointLightFlipped">\r
            <feGaussianBlur stdDeviation="10" result="blur" />\r
            <feSpecularLighting\r
              result="spec"\r
              in="blur"\r
              specularExponent="100"\r
              specularConstant={lightingIntensity * 7}\r
              lightingColor="white"\r
            >\r
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />\r
            </feSpecularLighting>\r
            <feComposite in="spec" in2="SourceGraphic" result="lit" />\r
            <feComposite in="lit" in2="SourceAlpha" operator="in" />\r
          </filter>\r
\r
          <filter id="dropShadow">\r
            <feDropShadow\r
              dx="2"\r
              dy="4"\r
              stdDeviation={3 * shadowIntensity}\r
              floodColor="black"\r
              floodOpacity={shadowIntensity}\r
            />\r
          </filter>\r
\r
          <filter id="expandAndFill">\r
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />\r
            <feFlood floodColor="rgb(179,179,179)" result="flood" />\r
            <feComposite operator="in" in="flood" in2="shape" />\r
          </filter>\r
        </defs>\r
      </svg>\r
\r
      <div\r
        className="sticker-container relative select-none touch-none sm:touch-auto"\r
        ref={containerRef}\r
        style={{\r
          WebkitUserSelect: 'none',\r
          userSelect: 'none',\r
          WebkitTouchCallout: 'none',\r
          WebkitTapHighlightColor: 'transparent',\r
          transform: \`rotate(\${peelDirection}deg)\`,\r
          transformOrigin: 'center'\r
        }}\r
      >\r
        <div className="sticker-main" style={stickerMainStyle}>\r
          <div style={{ filter: 'url(#pointLight)' }}>\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="block"\r
              style={imageStyle}\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
\r
        <div className="absolute top-4 left-2 w-full h-full opacity-40" style={{ filter: 'brightness(0) blur(8px)' }}>\r
          <div className="sticker-flap" style={flapStyle}>\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="block"\r
              style={shadowImageStyle}\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
\r
        <div className="sticker-flap absolute w-full h-full left-0" style={flapStyle}>\r
          <div style={{ filter: 'url(#pointLightFlipped)' }}>\r
            <img\r
              src={imageSrc}\r
              alt=""\r
              className="block"\r
              style={shadowImageStyle}\r
              draggable="false"\r
              onContextMenu={e => e.preventDefault()}\r
            />\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  );\r
};\r
\r
export default StickerPeel;\r
`,vi={installation:"npm install gsap",usage:`import StickerPeel from './StickerPeel'
import logo from './assets/sticker.png'
  
<StickerPeel
  imageSrc={logo}
  width={200}
  rotate={30}
  peelBackHoverPct={20}
  peelBackActivePct={40}
  shadowIntensity={0.6}
  lightingIntensity={0.1}
  initialPosition={{ x: -100, y: 100 }}
/>`,code:ui,css:fi,tailwind:pi,tsCode:gi,tsTailwind:hi},Ei=()=>{const[f,t]=re.useState(0),[i,r]=re.useState(200),[o,s]=re.useState(30),[d,l]=re.useState(40),[m,u]=re.useState(.1),[g,w]=re.useState(.5),[k,e]=re.useState(0),b=[{name:"imageSrc",type:"string",default:"required",description:"The source URL for the sticker image"},{name:"rotate",type:"number",default:"30",description:"The rotation angle in degrees when dragging"},{name:"peelBackHoverPct",type:"number",default:"30",description:"Percentage of peel effect on hover (0-100)"},{name:"peelBackActivePct",type:"number",default:"40",description:"Percentage of peel effect when active/clicked (0-100)"},{name:"peelDirection",type:"number",default:"0",description:"Direction of the peel effect in degrees (0-360)"},{name:"peelEasing",type:"string",default:"power3.out",description:"GSAP easing function for peel animations"},{name:"peelHoverEasing",type:"string",default:"power2.out",description:"GSAP easing function for hover transitions"},{name:"width",type:"number",default:"200",description:"Width of the sticker in pixels"},{name:"shadowIntensity",type:"number",default:"0.6",description:"Intensity of the shadow effect (0-1)"},{name:"lightingIntensity",type:"number",default:"0.1",description:"Intensity of the lighting effect (0-1)"},{name:"initialPosition",type:"string",default:"center",description:"Initial position of the sticker ('center', 'top-left', 'top-right', 'bottom-left', 'bottom-right')"},{name:"className",type:"string",default:"",description:"Custom class name for additional styling"}];return S.jsxs(Xr,{children:[S.jsxs(Yr,{children:[S.jsxs(Ir,{position:"relative",className:"demo-container",h:500,overflow:"hidden",bg:"linear-gradient(to bottom, #060010, #0D0716, #0D0716 , #060010)",children:[S.jsx(di,{imageSrc:zr,rotate:f,width:i,peelBackHoverPct:o,peelBackActivePct:d,lightingIntensity:m,shadowIntensity:g,peelDirection:k,className:"sticker-peel-demo"}),S.jsx(Nr,{position:"absolute",zIndex:0,left:"50%",top:"1em",transform:"translateX(-50%)",fontSize:"clamp(1.5rem, 4vw, 3rem)",fontWeight:900,color:"#271E37",children:"Try dragging it!"})]}),S.jsxs(Hr,{children:[S.jsx(ze,{title:"Peel Direction",min:0,max:360,step:1,value:k,valueUnit:"°",width:200,onChange:e}),S.jsx(ze,{title:"Rotate",min:0,max:60,step:1,value:f,valueUnit:"°",width:200,onChange:t}),S.jsx(ze,{title:"Width",min:100,max:300,step:10,value:i,valueUnit:"px",width:200,onChange:r}),S.jsx(ze,{title:"Peel Hover %",min:0,max:50,step:1,value:o,valueUnit:"%",width:200,onChange:s}),S.jsx(ze,{title:"Peel Active %",min:0,max:70,step:1,value:d,valueUnit:"%",width:200,onChange:l}),S.jsx(ze,{title:"Lighting Intensity",min:0,max:.5,step:.01,value:m,valueUnit:"",width:200,onChange:u}),S.jsx(ze,{title:"Shadow Intensity",min:0,max:1,step:.01,value:g,valueUnit:"",width:200,onChange:w})]}),S.jsx(Br,{data:b}),S.jsx(Or,{dependencyList:["gsap"]})]}),S.jsx(Ar,{children:S.jsx(Fr,{codeObject:vi})})]})};export{Ei as default};
