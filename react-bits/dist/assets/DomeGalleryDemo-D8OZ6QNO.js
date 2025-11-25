import{e as Ae,r as m,j as p,B as xr,T as br,b7 as wr}from"./index-wsKSLPNH.js";import{T as Tr,P as Dr,a as Er,C as Ar,b as Mr}from"./PropTable-C4uPWs8h.js";import{C as _r}from"./Customize-1m_ZNqR9.js";import{P as oe}from"./PreviewSlider-m1G_aiYP.js";import{P as Ir}from"./PreviewSwitch-DqnF708j.js";import{D as Sr}from"./Dependencies-BHoMfJUj.js";import"./index-Bpz4cGEA.js";function kr(t,e,r){return Math.max(e,Math.min(t,r))}const R={toVector(t,e){return t===void 0&&(t=e),Array.isArray(t)?t:[t,t]},add(t,e){return[t[0]+e[0],t[1]+e[1]]},sub(t,e){return[t[0]-e[0],t[1]-e[1]]},addTo(t,e){t[0]+=e[0],t[1]+=e[1]},subTo(t,e){t[0]-=e[0],t[1]-=e[1]}};function Fe(t,e,r){return e===0||Math.abs(e)===1/0?Math.pow(t,r*5):t*e*r/(e+r*t)}function Oe(t,e,r,n=.15){return n===0?kr(t,e,r):t<e?-Fe(e-t,r-e,n)+e:t>r?+Fe(t-r,r-e,n)+r:t}function Pr(t,[e,r],[n,i]){const[[a,s],[f,d]]=t;return[Oe(e,a,s,n),Oe(r,f,d,i)]}function Yr(t,e){if(typeof t!="object"||t===null)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Cr(t){var e=Yr(t,"string");return typeof e=="symbol"?e:String(e)}function A(t,e,r){return e=Cr(e),e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Ne(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,n)}return r}function w(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Ne(Object(r),!0).forEach(function(n){A(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ne(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}const rr={pointer:{start:"down",change:"move",end:"up"},mouse:{start:"down",change:"move",end:"up"},touch:{start:"start",change:"move",end:"end"},gesture:{start:"start",change:"change",end:"end"}};function Ge(t){return t?t[0].toUpperCase()+t.slice(1):""}const Xr=["enter","leave"];function $r(t=!1,e){return t&&!Xr.includes(e)}function Br(t,e="",r=!1){const n=rr[t],i=n&&n[e]||e;return"on"+Ge(t)+Ge(i)+($r(r,i)?"Capture":"")}const Lr=["gotpointercapture","lostpointercapture"];function zr(t){let e=t.substring(2).toLowerCase();const r=!!~e.indexOf("passive");r&&(e=e.replace("passive",""));const n=Lr.includes(e)?"capturecapture":"capture",i=!!~e.indexOf(n);return i&&(e=e.replace("capture","")),{device:e,capture:i,passive:r}}function Hr(t,e=""){const r=rr[t],n=r&&r[e]||e;return t+n}function be(t){return"touches"in t}function tr(t){return be(t)?"touch":"pointerType"in t?t.pointerType:"mouse"}function Fr(t){return Array.from(t.touches).filter(e=>{var r,n;return e.target===t.currentTarget||((r=t.currentTarget)===null||r===void 0||(n=r.contains)===null||n===void 0?void 0:n.call(r,e.target))})}function Or(t){return t.type==="touchend"||t.type==="touchcancel"?t.changedTouches:t.targetTouches}function nr(t){return be(t)?Or(t)[0]:t}function _e(t,e){try{const r=e.clientX-t.clientX,n=e.clientY-t.clientY,i=(e.clientX+t.clientX)/2,a=(e.clientY+t.clientY)/2,s=Math.hypot(r,n);return{angle:-(Math.atan2(r,n)*180)/Math.PI,distance:s,origin:[i,a]}}catch{}return null}function Nr(t){return Fr(t).map(e=>e.identifier)}function je(t,e){const[r,n]=Array.from(t.touches).filter(i=>e.includes(i.identifier));return _e(r,n)}function Me(t){const e=nr(t);return be(t)?e.identifier:e.pointerId}function ne(t){const e=nr(t);return[e.clientX,e.clientY]}const Ve=40,qe=800;function ir(t){let{deltaX:e,deltaY:r,deltaMode:n}=t;return n===1?(e*=Ve,r*=Ve):n===2&&(e*=qe,r*=qe),[e,r]}function Gr(t){var e,r;const{scrollX:n,scrollY:i,scrollLeft:a,scrollTop:s}=t.currentTarget;return[(e=n??a)!==null&&e!==void 0?e:0,(r=i??s)!==null&&r!==void 0?r:0]}function jr(t){const e={};if("buttons"in t&&(e.buttons=t.buttons),"shiftKey"in t){const{shiftKey:r,altKey:n,metaKey:i,ctrlKey:a}=t;Object.assign(e,{shiftKey:r,altKey:n,metaKey:i,ctrlKey:a})}return e}function xe(t,...e){return typeof t=="function"?t(...e):t}function Vr(){}function qr(...t){return t.length===0?Vr:t.length===1?t[0]:function(){let e;for(const r of t)e=r.apply(this,arguments)||e;return e}}function We(t,e){return Object.assign({},e,t||{})}const Wr=32;class ar{constructor(e,r,n){this.ctrl=e,this.args=r,this.key=n,this.state||(this.state={},this.computeValues([0,0]),this.computeInitial(),this.init&&this.init(),this.reset())}get state(){return this.ctrl.state[this.key]}set state(e){this.ctrl.state[this.key]=e}get shared(){return this.ctrl.state.shared}get eventStore(){return this.ctrl.gestureEventStores[this.key]}get timeoutStore(){return this.ctrl.gestureTimeoutStores[this.key]}get config(){return this.ctrl.config[this.key]}get sharedConfig(){return this.ctrl.config.shared}get handler(){return this.ctrl.handlers[this.key]}reset(){const{state:e,shared:r,ingKey:n,args:i}=this;r[n]=e._active=e.active=e._blocked=e._force=!1,e._step=[!1,!1],e.intentional=!1,e._movement=[0,0],e._distance=[0,0],e._direction=[0,0],e._delta=[0,0],e._bounds=[[-1/0,1/0],[-1/0,1/0]],e.args=i,e.axis=void 0,e.memo=void 0,e.elapsedTime=e.timeDelta=0,e.direction=[0,0],e.distance=[0,0],e.overflow=[0,0],e._movementBound=[!1,!1],e.velocity=[0,0],e.movement=[0,0],e.delta=[0,0],e.timeStamp=0}start(e){const r=this.state,n=this.config;r._active||(this.reset(),this.computeInitial(),r._active=!0,r.target=e.target,r.currentTarget=e.currentTarget,r.lastOffset=n.from?xe(n.from,r):r.offset,r.offset=r.lastOffset,r.startTime=r.timeStamp=e.timeStamp)}computeValues(e){const r=this.state;r._values=e,r.values=this.config.transform(e)}computeInitial(){const e=this.state;e._initial=e._values,e.initial=e.values}compute(e){const{state:r,config:n,shared:i}=this;r.args=this.args;let a=0;if(e&&(r.event=e,n.preventDefault&&e.cancelable&&r.event.preventDefault(),r.type=e.type,i.touches=this.ctrl.pointerIds.size||this.ctrl.touchIds.size,i.locked=!!document.pointerLockElement,Object.assign(i,jr(e)),i.down=i.pressed=i.buttons%2===1||i.touches>0,a=e.timeStamp-r.timeStamp,r.timeStamp=e.timeStamp,r.elapsedTime=r.timeStamp-r.startTime),r._active){const H=r._delta.map(Math.abs);R.addTo(r._distance,H)}this.axisIntent&&this.axisIntent(e);const[s,f]=r._movement,[d,l]=n.threshold,{_step:o,values:_}=r;if(n.hasCustomTransform?(o[0]===!1&&(o[0]=Math.abs(s)>=d&&_[0]),o[1]===!1&&(o[1]=Math.abs(f)>=l&&_[1])):(o[0]===!1&&(o[0]=Math.abs(s)>=d&&Math.sign(s)*d),o[1]===!1&&(o[1]=Math.abs(f)>=l&&Math.sign(f)*l)),r.intentional=o[0]!==!1||o[1]!==!1,!r.intentional)return;const x=[0,0];if(n.hasCustomTransform){const[H,F]=_;x[0]=o[0]!==!1?H-o[0]:0,x[1]=o[1]!==!1?F-o[1]:0}else x[0]=o[0]!==!1?s-o[0]:0,x[1]=o[1]!==!1?f-o[1]:0;this.restrictToAxis&&!r._blocked&&this.restrictToAxis(x);const b=r.offset,N=r._active&&!r._blocked||r.active;N&&(r.first=r._active&&!r.active,r.last=!r._active&&r.active,r.active=i[this.ingKey]=r._active,e&&(r.first&&("bounds"in n&&(r._bounds=xe(n.bounds,r)),this.setup&&this.setup()),r.movement=x,this.computeOffset()));const[G,j]=r.offset,[[C,q],[ue,J]]=r._bounds;r.overflow=[G<C?-1:G>q?1:0,j<ue?-1:j>J?1:0],r._movementBound[0]=r.overflow[0]?r._movementBound[0]===!1?r._movement[0]:r._movementBound[0]:!1,r._movementBound[1]=r.overflow[1]?r._movementBound[1]===!1?r._movement[1]:r._movementBound[1]:!1;const Q=r._active?n.rubberband||[0,0]:[0,0];if(r.offset=Pr(r._bounds,r.offset,Q),r.delta=R.sub(r.offset,b),this.computeMovement(),N&&(!r.last||a>Wr)){r.delta=R.sub(r.offset,b);const H=r.delta.map(Math.abs);R.addTo(r.distance,H),r.direction=r.delta.map(Math.sign),r._direction=r._delta.map(Math.sign),!r.first&&a>0&&(r.velocity=[H[0]/a,H[1]/a],r.timeDelta=a)}}emit(){const e=this.state,r=this.shared,n=this.config;if(e._active||this.clean(),(e._blocked||!e.intentional)&&!e._force&&!n.triggerAllEvents)return;const i=this.handler(w(w(w({},r),e),{},{[this.aliasKey]:e.values}));i!==void 0&&(e.memo=i)}clean(){this.eventStore.clean(),this.timeoutStore.clean()}}function Ur([t,e],r){const n=Math.abs(t),i=Math.abs(e);if(n>i&&n>r)return"x";if(i>n&&i>r)return"y"}class le extends ar{constructor(...e){super(...e),A(this,"aliasKey","xy")}reset(){super.reset(),this.state.axis=void 0}init(){this.state.offset=[0,0],this.state.lastOffset=[0,0]}computeOffset(){this.state.offset=R.add(this.state.lastOffset,this.state.movement)}computeMovement(){this.state.movement=R.sub(this.state.offset,this.state.lastOffset)}axisIntent(e){const r=this.state,n=this.config;if(!r.axis&&e){const i=typeof n.axisThreshold=="object"?n.axisThreshold[tr(e)]:n.axisThreshold;r.axis=Ur(r._movement,i)}r._blocked=(n.lockDirection||!!n.axis)&&!r.axis||!!n.axis&&n.axis!==r.axis}restrictToAxis(e){if(this.config.axis||this.config.lockDirection)switch(this.state.axis){case"x":e[1]=0;break;case"y":e[0]=0;break}}}const Kr=t=>t,Ue=.15,sr={enabled(t=!0){return t},eventOptions(t,e,r){return w(w({},r.shared.eventOptions),t)},preventDefault(t=!1){return t},triggerAllEvents(t=!1){return t},rubberband(t=0){switch(t){case!0:return[Ue,Ue];case!1:return[0,0];default:return R.toVector(t)}},from(t){if(typeof t=="function")return t;if(t!=null)return R.toVector(t)},transform(t,e,r){const n=t||r.shared.transform;return this.hasCustomTransform=!!n,n||Kr},threshold(t){return R.toVector(t,0)}},Zr=0,Z=w(w({},sr),{},{axis(t,e,{axis:r}){if(this.lockDirection=r==="lock",!this.lockDirection)return r},axisThreshold(t=Zr){return t},bounds(t={}){if(typeof t=="function")return a=>Z.bounds(t(a));if("current"in t)return()=>t.current;if(typeof HTMLElement=="function"&&t instanceof HTMLElement)return t;const{left:e=-1/0,right:r=1/0,top:n=-1/0,bottom:i=1/0}=t;return[[e,r],[n,i]]}}),Ke={ArrowRight:(t,e=1)=>[t*e,0],ArrowLeft:(t,e=1)=>[-1*t*e,0],ArrowUp:(t,e=1)=>[0,-1*t*e],ArrowDown:(t,e=1)=>[0,t*e]};class Jr extends le{constructor(...e){super(...e),A(this,"ingKey","dragging")}reset(){super.reset();const e=this.state;e._pointerId=void 0,e._pointerActive=!1,e._keyboardActive=!1,e._preventScroll=!1,e._delayed=!1,e.swipe=[0,0],e.tap=!1,e.canceled=!1,e.cancel=this.cancel.bind(this)}setup(){const e=this.state;if(e._bounds instanceof HTMLElement){const r=e._bounds.getBoundingClientRect(),n=e.currentTarget.getBoundingClientRect(),i={left:r.left-n.left+e.offset[0],right:r.right-n.right+e.offset[0],top:r.top-n.top+e.offset[1],bottom:r.bottom-n.bottom+e.offset[1]};e._bounds=Z.bounds(i)}}cancel(){const e=this.state;e.canceled||(e.canceled=!0,e._active=!1,setTimeout(()=>{this.compute(),this.emit()},0))}setActive(){this.state._active=this.state._pointerActive||this.state._keyboardActive}clean(){this.pointerClean(),this.state._pointerActive=!1,this.state._keyboardActive=!1,super.clean()}pointerDown(e){const r=this.config,n=this.state;if(e.buttons!=null&&(Array.isArray(r.pointerButtons)?!r.pointerButtons.includes(e.buttons):r.pointerButtons!==-1&&r.pointerButtons!==e.buttons))return;const i=this.ctrl.setEventIds(e);r.pointerCapture&&e.target.setPointerCapture(e.pointerId),!(i&&i.size>1&&n._pointerActive)&&(this.start(e),this.setupPointer(e),n._pointerId=Me(e),n._pointerActive=!0,this.computeValues(ne(e)),this.computeInitial(),r.preventScrollAxis&&tr(e)!=="mouse"?(n._active=!1,this.setupScrollPrevention(e)):r.delay>0?(this.setupDelayTrigger(e),r.triggerAllEvents&&(this.compute(e),this.emit())):this.startPointerDrag(e))}startPointerDrag(e){const r=this.state;r._active=!0,r._preventScroll=!0,r._delayed=!1,this.compute(e),this.emit()}pointerMove(e){const r=this.state,n=this.config;if(!r._pointerActive)return;const i=Me(e);if(r._pointerId!==void 0&&i!==r._pointerId)return;const a=ne(e);if(document.pointerLockElement===e.target?r._delta=[e.movementX,e.movementY]:(r._delta=R.sub(a,r._values),this.computeValues(a)),R.addTo(r._movement,r._delta),this.compute(e),r._delayed&&r.intentional){this.timeoutStore.remove("dragDelay"),r.active=!1,this.startPointerDrag(e);return}if(n.preventScrollAxis&&!r._preventScroll)if(r.axis)if(r.axis===n.preventScrollAxis||n.preventScrollAxis==="xy"){r._active=!1,this.clean();return}else{this.timeoutStore.remove("startPointerDrag"),this.startPointerDrag(e);return}else return;this.emit()}pointerUp(e){this.ctrl.setEventIds(e);try{this.config.pointerCapture&&e.target.hasPointerCapture(e.pointerId)&&e.target.releasePointerCapture(e.pointerId)}catch{}const r=this.state,n=this.config;if(!r._active||!r._pointerActive)return;const i=Me(e);if(r._pointerId!==void 0&&i!==r._pointerId)return;this.state._pointerActive=!1,this.setActive(),this.compute(e);const[a,s]=r._distance;if(r.tap=a<=n.tapsThreshold&&s<=n.tapsThreshold,r.tap&&n.filterTaps)r._force=!0;else{const[f,d]=r._delta,[l,o]=r._movement,[_,x]=n.swipe.velocity,[b,N]=n.swipe.distance,G=n.swipe.duration;if(r.elapsedTime<G){const j=Math.abs(f/r.timeDelta),C=Math.abs(d/r.timeDelta);j>_&&Math.abs(l)>b&&(r.swipe[0]=Math.sign(f)),C>x&&Math.abs(o)>N&&(r.swipe[1]=Math.sign(d))}}this.emit()}pointerClick(e){!this.state.tap&&e.detail>0&&(e.preventDefault(),e.stopPropagation())}setupPointer(e){const r=this.config,n=r.device;r.pointerLock&&e.currentTarget.requestPointerLock(),r.pointerCapture||(this.eventStore.add(this.sharedConfig.window,n,"change",this.pointerMove.bind(this)),this.eventStore.add(this.sharedConfig.window,n,"end",this.pointerUp.bind(this)),this.eventStore.add(this.sharedConfig.window,n,"cancel",this.pointerUp.bind(this)))}pointerClean(){this.config.pointerLock&&document.pointerLockElement===this.state.currentTarget&&document.exitPointerLock()}preventScroll(e){this.state._preventScroll&&e.cancelable&&e.preventDefault()}setupScrollPrevention(e){this.state._preventScroll=!1,Qr(e);const r=this.eventStore.add(this.sharedConfig.window,"touch","change",this.preventScroll.bind(this),{passive:!1});this.eventStore.add(this.sharedConfig.window,"touch","end",r),this.eventStore.add(this.sharedConfig.window,"touch","cancel",r),this.timeoutStore.add("startPointerDrag",this.startPointerDrag.bind(this),this.config.preventScrollDelay,e)}setupDelayTrigger(e){this.state._delayed=!0,this.timeoutStore.add("dragDelay",()=>{this.state._step=[0,0],this.startPointerDrag(e)},this.config.delay)}keyDown(e){const r=Ke[e.key];if(r){const n=this.state,i=e.shiftKey?10:e.altKey?.1:1;this.start(e),n._delta=r(this.config.keyboardDisplacement,i),n._keyboardActive=!0,R.addTo(n._movement,n._delta),this.compute(e),this.emit()}}keyUp(e){e.key in Ke&&(this.state._keyboardActive=!1,this.setActive(),this.compute(e),this.emit())}bind(e){const r=this.config.device;e(r,"start",this.pointerDown.bind(this)),this.config.pointerCapture&&(e(r,"change",this.pointerMove.bind(this)),e(r,"end",this.pointerUp.bind(this)),e(r,"cancel",this.pointerUp.bind(this)),e("lostPointerCapture","",this.pointerUp.bind(this))),this.config.keys&&(e("key","down",this.keyDown.bind(this)),e("key","up",this.keyUp.bind(this))),this.config.filterTaps&&e("click","",this.pointerClick.bind(this),{capture:!0,passive:!1})}}function Qr(t){"persist"in t&&typeof t.persist=="function"&&t.persist()}const ce=typeof window<"u"&&window.document&&window.document.createElement;function or(){return ce&&"ontouchstart"in window}function et(){return or()||ce&&window.navigator.maxTouchPoints>1}function rt(){return ce&&"onpointerdown"in window}function tt(){return ce&&"exitPointerLock"in window.document}function nt(){try{return"constructor"in GestureEvent}catch{return!1}}const B={isBrowser:ce,gesture:nt(),touch:or(),touchscreen:et(),pointer:rt(),pointerLock:tt()},it=250,at=180,st=.5,ot=50,lt=250,ct=10,Ze={mouse:0,touch:0,pen:8},ut=w(w({},Z),{},{device(t,e,{pointer:{touch:r=!1,lock:n=!1,mouse:i=!1}={}}){return this.pointerLock=n&&B.pointerLock,B.touch&&r?"touch":this.pointerLock?"mouse":B.pointer&&!i?"pointer":B.touch?"touch":"mouse"},preventScrollAxis(t,e,{preventScroll:r}){if(this.preventScrollDelay=typeof r=="number"?r:r||r===void 0&&t?it:void 0,!(!B.touchscreen||r===!1))return t||(r!==void 0?"y":void 0)},pointerCapture(t,e,{pointer:{capture:r=!0,buttons:n=1,keys:i=!0}={}}){return this.pointerButtons=n,this.keys=i,!this.pointerLock&&this.device==="pointer"&&r},threshold(t,e,{filterTaps:r=!1,tapsThreshold:n=3,axis:i=void 0}){const a=R.toVector(t,r?n:i?1:0);return this.filterTaps=r,this.tapsThreshold=n,a},swipe({velocity:t=st,distance:e=ot,duration:r=lt}={}){return{velocity:this.transform(R.toVector(t)),distance:this.transform(R.toVector(e)),duration:r}},delay(t=0){switch(t){case!0:return at;case!1:return 0;default:return t}},axisThreshold(t){return t?w(w({},Ze),t):Ze},keyboardDisplacement(t=ct){return t}});function lr(t){const[e,r]=t.overflow,[n,i]=t._delta,[a,s]=t._direction;(e<0&&n>0&&a<0||e>0&&n<0&&a>0)&&(t._movement[0]=t._movementBound[0]),(r<0&&i>0&&s<0||r>0&&i<0&&s>0)&&(t._movement[1]=t._movementBound[1])}const ft=30,dt=100;class mt extends ar{constructor(...e){super(...e),A(this,"ingKey","pinching"),A(this,"aliasKey","da")}init(){this.state.offset=[1,0],this.state.lastOffset=[1,0],this.state._pointerEvents=new Map}reset(){super.reset();const e=this.state;e._touchIds=[],e.canceled=!1,e.cancel=this.cancel.bind(this),e.turns=0}computeOffset(){const{type:e,movement:r,lastOffset:n}=this.state;e==="wheel"?this.state.offset=R.add(r,n):this.state.offset=[(1+r[0])*n[0],r[1]+n[1]]}computeMovement(){const{offset:e,lastOffset:r}=this.state;this.state.movement=[e[0]/r[0],e[1]-r[1]]}axisIntent(){const e=this.state,[r,n]=e._movement;if(!e.axis){const i=Math.abs(r)*ft-Math.abs(n);i<0?e.axis="angle":i>0&&(e.axis="scale")}}restrictToAxis(e){this.config.lockDirection&&(this.state.axis==="scale"?e[1]=0:this.state.axis==="angle"&&(e[0]=0))}cancel(){const e=this.state;e.canceled||setTimeout(()=>{e.canceled=!0,e._active=!1,this.compute(),this.emit()},0)}touchStart(e){this.ctrl.setEventIds(e);const r=this.state,n=this.ctrl.touchIds;if(r._active&&r._touchIds.every(a=>n.has(a))||n.size<2)return;this.start(e),r._touchIds=Array.from(n).slice(0,2);const i=je(e,r._touchIds);i&&this.pinchStart(e,i)}pointerStart(e){if(e.buttons!=null&&e.buttons%2!==1)return;this.ctrl.setEventIds(e),e.target.setPointerCapture(e.pointerId);const r=this.state,n=r._pointerEvents,i=this.ctrl.pointerIds;if(r._active&&Array.from(n.keys()).every(s=>i.has(s))||(n.size<2&&n.set(e.pointerId,e),r._pointerEvents.size<2))return;this.start(e);const a=_e(...Array.from(n.values()));a&&this.pinchStart(e,a)}pinchStart(e,r){const n=this.state;n.origin=r.origin,this.computeValues([r.distance,r.angle]),this.computeInitial(),this.compute(e),this.emit()}touchMove(e){if(!this.state._active)return;const r=je(e,this.state._touchIds);r&&this.pinchMove(e,r)}pointerMove(e){const r=this.state._pointerEvents;if(r.has(e.pointerId)&&r.set(e.pointerId,e),!this.state._active)return;const n=_e(...Array.from(r.values()));n&&this.pinchMove(e,n)}pinchMove(e,r){const n=this.state,i=n._values[1],a=r.angle-i;let s=0;Math.abs(a)>270&&(s+=Math.sign(a)),this.computeValues([r.distance,r.angle-360*s]),n.origin=r.origin,n.turns=s,n._movement=[n._values[0]/n._initial[0]-1,n._values[1]-n._initial[1]],this.compute(e),this.emit()}touchEnd(e){this.ctrl.setEventIds(e),this.state._active&&this.state._touchIds.some(r=>!this.ctrl.touchIds.has(r))&&(this.state._active=!1,this.compute(e),this.emit())}pointerEnd(e){const r=this.state;this.ctrl.setEventIds(e);try{e.target.releasePointerCapture(e.pointerId)}catch{}r._pointerEvents.has(e.pointerId)&&r._pointerEvents.delete(e.pointerId),r._active&&r._pointerEvents.size<2&&(r._active=!1,this.compute(e),this.emit())}gestureStart(e){e.cancelable&&e.preventDefault();const r=this.state;r._active||(this.start(e),this.computeValues([e.scale,e.rotation]),r.origin=[e.clientX,e.clientY],this.compute(e),this.emit())}gestureMove(e){if(e.cancelable&&e.preventDefault(),!this.state._active)return;const r=this.state;this.computeValues([e.scale,e.rotation]),r.origin=[e.clientX,e.clientY];const n=r._movement;r._movement=[e.scale-1,e.rotation],r._delta=R.sub(r._movement,n),this.compute(e),this.emit()}gestureEnd(e){this.state._active&&(this.state._active=!1,this.compute(e),this.emit())}wheel(e){const r=this.config.modifierKey;r&&(Array.isArray(r)?!r.find(n=>e[n]):!e[r])||(this.state._active?this.wheelChange(e):this.wheelStart(e),this.timeoutStore.add("wheelEnd",this.wheelEnd.bind(this)))}wheelStart(e){this.start(e),this.wheelChange(e)}wheelChange(e){"uv"in e||e.cancelable&&e.preventDefault();const n=this.state;n._delta=[-ir(e)[1]/dt*n.offset[0],0],R.addTo(n._movement,n._delta),lr(n),this.state.origin=[e.clientX,e.clientY],this.compute(e),this.emit()}wheelEnd(){this.state._active&&(this.state._active=!1,this.compute(),this.emit())}bind(e){const r=this.config.device;r&&(e(r,"start",this[r+"Start"].bind(this)),e(r,"change",this[r+"Move"].bind(this)),e(r,"end",this[r+"End"].bind(this)),e(r,"cancel",this[r+"End"].bind(this)),e("lostPointerCapture","",this[r+"End"].bind(this))),this.config.pinchOnWheel&&e("wheel","",this.wheel.bind(this),{passive:!1})}}const pt=w(w({},sr),{},{device(t,e,{shared:r,pointer:{touch:n=!1}={}}){if(r.target&&!B.touch&&B.gesture)return"gesture";if(B.touch&&n)return"touch";if(B.touchscreen){if(B.pointer)return"pointer";if(B.touch)return"touch"}},bounds(t,e,{scaleBounds:r={},angleBounds:n={}}){const i=s=>{const f=We(xe(r,s),{min:-1/0,max:1/0});return[f.min,f.max]},a=s=>{const f=We(xe(n,s),{min:-1/0,max:1/0});return[f.min,f.max]};return typeof r!="function"&&typeof n!="function"?[i(),a()]:s=>[i(s),a(s)]},threshold(t,e,r){return this.lockDirection=r.axis==="lock",R.toVector(t,this.lockDirection?[.1,3]:0)},modifierKey(t){return t===void 0?"ctrlKey":t},pinchOnWheel(t=!0){return t}});class gt extends le{constructor(...e){super(...e),A(this,"ingKey","moving")}move(e){this.config.mouseOnly&&e.pointerType!=="mouse"||(this.state._active?this.moveChange(e):this.moveStart(e),this.timeoutStore.add("moveEnd",this.moveEnd.bind(this)))}moveStart(e){this.start(e),this.computeValues(ne(e)),this.compute(e),this.computeInitial(),this.emit()}moveChange(e){if(!this.state._active)return;const r=ne(e),n=this.state;n._delta=R.sub(r,n._values),R.addTo(n._movement,n._delta),this.computeValues(r),this.compute(e),this.emit()}moveEnd(e){this.state._active&&(this.state._active=!1,this.compute(e),this.emit())}bind(e){e("pointer","change",this.move.bind(this)),e("pointer","leave",this.moveEnd.bind(this))}}const ht=w(w({},Z),{},{mouseOnly:(t=!0)=>t});class yt extends le{constructor(...e){super(...e),A(this,"ingKey","scrolling")}scroll(e){this.state._active||this.start(e),this.scrollChange(e),this.timeoutStore.add("scrollEnd",this.scrollEnd.bind(this))}scrollChange(e){e.cancelable&&e.preventDefault();const r=this.state,n=Gr(e);r._delta=R.sub(n,r._values),R.addTo(r._movement,r._delta),this.computeValues(n),this.compute(e),this.emit()}scrollEnd(){this.state._active&&(this.state._active=!1,this.compute(),this.emit())}bind(e){e("scroll","",this.scroll.bind(this))}}const vt=Z;class Rt extends le{constructor(...e){super(...e),A(this,"ingKey","wheeling")}wheel(e){this.state._active||this.start(e),this.wheelChange(e),this.timeoutStore.add("wheelEnd",this.wheelEnd.bind(this))}wheelChange(e){const r=this.state;r._delta=ir(e),R.addTo(r._movement,r._delta),lr(r),this.compute(e),this.emit()}wheelEnd(){this.state._active&&(this.state._active=!1,this.compute(),this.emit())}bind(e){e("wheel","",this.wheel.bind(this))}}const xt=Z;class bt extends le{constructor(...e){super(...e),A(this,"ingKey","hovering")}enter(e){this.config.mouseOnly&&e.pointerType!=="mouse"||(this.start(e),this.computeValues(ne(e)),this.compute(e),this.emit())}leave(e){if(this.config.mouseOnly&&e.pointerType!=="mouse")return;const r=this.state;if(!r._active)return;r._active=!1;const n=ne(e);r._movement=r._delta=R.sub(n,r._values),this.computeValues(n),this.compute(e),r.delta=r.movement,this.emit()}bind(e){e("pointer","enter",this.enter.bind(this)),e("pointer","leave",this.leave.bind(this))}}const wt=w(w({},Z),{},{mouseOnly:(t=!0)=>t}),Se=new Map,Ie=new Map;function Tt(t){Se.set(t.key,t.engine),Ie.set(t.key,t.resolver)}const Dt={key:"drag",engine:Jr,resolver:ut},Et={key:"hover",engine:bt,resolver:wt},At={key:"move",engine:gt,resolver:ht},Mt={key:"pinch",engine:mt,resolver:pt},_t={key:"scroll",engine:yt,resolver:vt},It={key:"wheel",engine:Rt,resolver:xt};function St(t,e){if(t==null)return{};var r={},n=Object.keys(t),i,a;for(a=0;a<n.length;a++)i=n[a],!(e.indexOf(i)>=0)&&(r[i]=t[i]);return r}function kt(t,e){if(t==null)return{};var r=St(t,e),n,i;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(i=0;i<a.length;i++)n=a[i],!(e.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}const Pt={target(t){if(t)return()=>"current"in t?t.current:t},enabled(t=!0){return t},window(t=B.isBrowser?window:void 0){return t},eventOptions({passive:t=!0,capture:e=!1}={}){return{passive:t,capture:e}},transform(t){return t}},Yt=["target","eventOptions","window","enabled","transform"];function Re(t={},e){const r={};for(const[n,i]of Object.entries(e))switch(typeof i){case"function":r[n]=i.call(r,t[n],n,t);break;case"object":r[n]=Re(t[n],i);break;case"boolean":i&&(r[n]=t[n]);break}return r}function Ct(t,e,r={}){const n=t,{target:i,eventOptions:a,window:s,enabled:f,transform:d}=n,l=kt(n,Yt);if(r.shared=Re({target:i,eventOptions:a,window:s,enabled:f,transform:d},Pt),e){const o=Ie.get(e);r[e]=Re(w({shared:r.shared},l),o)}else for(const o in l){const _=Ie.get(o);_&&(r[o]=Re(w({shared:r.shared},l[o]),_))}return r}class cr{constructor(e,r){A(this,"_listeners",new Set),this._ctrl=e,this._gestureKey=r}add(e,r,n,i,a){const s=this._listeners,f=Hr(r,n),d=this._gestureKey?this._ctrl.config[this._gestureKey].eventOptions:{},l=w(w({},d),a);e.addEventListener(f,i,l);const o=()=>{e.removeEventListener(f,i,l),s.delete(o)};return s.add(o),o}clean(){this._listeners.forEach(e=>e()),this._listeners.clear()}}class Xt{constructor(){A(this,"_timeouts",new Map)}add(e,r,n=140,...i){this.remove(e),this._timeouts.set(e,window.setTimeout(r,n,...i))}remove(e){const r=this._timeouts.get(e);r&&window.clearTimeout(r)}clean(){this._timeouts.forEach(e=>void window.clearTimeout(e)),this._timeouts.clear()}}class $t{constructor(e){A(this,"gestures",new Set),A(this,"_targetEventStore",new cr(this)),A(this,"gestureEventStores",{}),A(this,"gestureTimeoutStores",{}),A(this,"handlers",{}),A(this,"config",{}),A(this,"pointerIds",new Set),A(this,"touchIds",new Set),A(this,"state",{shared:{shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1}}),Bt(this,e)}setEventIds(e){if(be(e))return this.touchIds=new Set(Nr(e)),this.touchIds;if("pointerId"in e)return e.type==="pointerup"||e.type==="pointercancel"?this.pointerIds.delete(e.pointerId):e.type==="pointerdown"&&this.pointerIds.add(e.pointerId),this.pointerIds}applyHandlers(e,r){this.handlers=e,this.nativeHandlers=r}applyConfig(e,r){this.config=Ct(e,r,this.config)}clean(){this._targetEventStore.clean();for(const e of this.gestures)this.gestureEventStores[e].clean(),this.gestureTimeoutStores[e].clean()}effect(){return this.config.shared.target&&this.bind(),()=>this._targetEventStore.clean()}bind(...e){const r=this.config.shared,n={};let i;if(!(r.target&&(i=r.target(),!i))){if(r.enabled){for(const s of this.gestures){const f=this.config[s],d=Je(n,f.eventOptions,!!i);if(f.enabled){const l=Se.get(s);new l(this,e,s).bind(d)}}const a=Je(n,r.eventOptions,!!i);for(const s in this.nativeHandlers)a(s,"",f=>this.nativeHandlers[s](w(w({},this.state.shared),{},{event:f,args:e})),void 0,!0)}for(const a in n)n[a]=qr(...n[a]);if(!i)return n;for(const a in n){const{device:s,capture:f,passive:d}=zr(a);this._targetEventStore.add(i,s,"",n[a],{capture:f,passive:d})}}}}function re(t,e){t.gestures.add(e),t.gestureEventStores[e]=new cr(t,e),t.gestureTimeoutStores[e]=new Xt}function Bt(t,e){e.drag&&re(t,"drag"),e.wheel&&re(t,"wheel"),e.scroll&&re(t,"scroll"),e.move&&re(t,"move"),e.pinch&&re(t,"pinch"),e.hover&&re(t,"hover")}const Je=(t,e,r)=>(n,i,a,s={},f=!1)=>{var d,l;const o=(d=s.capture)!==null&&d!==void 0?d:e.capture,_=(l=s.passive)!==null&&l!==void 0?l:e.passive;let x=f?n:Br(n,i,o);r&&_&&(x+="Passive"),t[x]=t[x]||[],t[x].push(a)},Lt=/^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;function zt(t){const e={},r={},n=new Set;for(let i in t)Lt.test(i)?(n.add(RegExp.lastMatch),r[i]=t[i]):e[i]=t[i];return[r,e,n]}function te(t,e,r,n,i,a){if(!t.has(r)||!Se.has(n))return;const s=r+"Start",f=r+"End",d=l=>{let o;return l.first&&s in e&&e[s](l),r in e&&(o=e[r](l)),l.last&&f in e&&e[f](l),o};i[n]=d,a[n]=a[n]||{}}function Ht(t,e){const[r,n,i]=zt(t),a={};return te(i,r,"onDrag","drag",a,e),te(i,r,"onWheel","wheel",a,e),te(i,r,"onScroll","scroll",a,e),te(i,r,"onPinch","pinch",a,e),te(i,r,"onMove","move",a,e),te(i,r,"onHover","hover",a,e),{handlers:a,config:e,nativeHandlers:n}}function Ft(t,e={},r,n){const i=Ae.useMemo(()=>new $t(t),[]);if(i.applyHandlers(t,n),i.applyConfig(e,r),Ae.useEffect(i.effect.bind(i)),Ae.useEffect(()=>i.clean.bind(i),[]),e.target===void 0)return i.bind.bind(i)}function Ot(t){return t.forEach(Tt),function(r,n){const{handlers:i,nativeHandlers:a,config:s}=Ht(r,n||{});return Ft(i,s,void 0,a)}}function Nt(t,e){return Ot([Dt,Mt,_t,It,At,Et])(t,e||{})}const Gt=`import { useEffect, useMemo, useRef, useCallback } from 'react';\r
import { useGesture } from '@use-gesture/react';\r
import './DomeGallery.css';\r
\r
const DEFAULT_IMAGES = [\r
  {\r
    src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Abstract art'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Modern sculpture'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Digital artwork'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Contemporary art'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Geometric pattern'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Textured surface'\r
  },\r
  { src: 'https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large', alt: 'Social media image' }\r
];\r
\r
const DEFAULTS = {\r
  maxVerticalRotationDeg: 5,\r
  dragSensitivity: 20,\r
  enlargeTransitionMs: 300,\r
  segments: 35\r
};\r
\r
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);\r
const normalizeAngle = d => ((d % 360) + 360) % 360;\r
const wrapAngleSigned = deg => {\r
  const a = (((deg + 180) % 360) + 360) % 360;\r
  return a - 180;\r
};\r
const getDataNumber = (el, name, fallback) => {\r
  const attr = el.dataset[name] ?? el.getAttribute(\`data-\${name}\`);\r
  const n = attr == null ? NaN : parseFloat(attr);\r
  return Number.isFinite(n) ? n : fallback;\r
};\r
\r
function buildItems(pool, seg) {\r
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);\r
  const evenYs = [-4, -2, 0, 2, 4];\r
  const oddYs = [-3, -1, 1, 3, 5];\r
\r
  const coords = xCols.flatMap((x, c) => {\r
    const ys = c % 2 === 0 ? evenYs : oddYs;\r
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));\r
  });\r
\r
  const totalSlots = coords.length;\r
  if (pool.length === 0) {\r
    return coords.map(c => ({ ...c, src: '', alt: '' }));\r
  }\r
  if (pool.length > totalSlots) {\r
    console.warn(\r
      \`[DomeGallery] Provided image count (\${pool.length}) exceeds available tiles (\${totalSlots}). Some images will not be shown.\`\r
    );\r
  }\r
\r
  const normalizedImages = pool.map(image => {\r
    if (typeof image === 'string') {\r
      return { src: image, alt: '' };\r
    }\r
    return { src: image.src || '', alt: image.alt || '' };\r
  });\r
\r
  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);\r
\r
  for (let i = 1; i < usedImages.length; i++) {\r
    if (usedImages[i].src === usedImages[i - 1].src) {\r
      for (let j = i + 1; j < usedImages.length; j++) {\r
        if (usedImages[j].src !== usedImages[i].src) {\r
          const tmp = usedImages[i];\r
          usedImages[i] = usedImages[j];\r
          usedImages[j] = tmp;\r
          break;\r
        }\r
      }\r
    }\r
  }\r
\r
  return coords.map((c, i) => ({\r
    ...c,\r
    src: usedImages[i].src,\r
    alt: usedImages[i].alt\r
  }));\r
}\r
\r
function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {\r
  const unit = 360 / segments / 2;\r
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);\r
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);\r
  return { rotateX, rotateY };\r
}\r
\r
export default function DomeGallery({\r
  images = DEFAULT_IMAGES,\r
  fit = 0.5,\r
  fitBasis = 'auto',\r
  minRadius = 600,\r
  maxRadius = Infinity,\r
  padFactor = 0.25,\r
  overlayBlurColor = '#060010',\r
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,\r
  dragSensitivity = DEFAULTS.dragSensitivity,\r
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,\r
  segments = DEFAULTS.segments,\r
  dragDampening = 2,\r
  openedImageWidth = '250px',\r
  openedImageHeight = '350px',\r
  imageBorderRadius = '30px',\r
  openedImageBorderRadius = '30px',\r
  grayscale = true\r
}) {\r
  const rootRef = useRef(null);\r
  const mainRef = useRef(null);\r
  const sphereRef = useRef(null);\r
  const frameRef = useRef(null);\r
  const viewerRef = useRef(null);\r
  const scrimRef = useRef(null);\r
  const focusedElRef = useRef(null);\r
  const originalTilePositionRef = useRef(null);\r
\r
  const rotationRef = useRef({ x: 0, y: 0 });\r
  const startRotRef = useRef({ x: 0, y: 0 });\r
  const startPosRef = useRef(null);\r
  const draggingRef = useRef(false);\r
  const movedRef = useRef(false);\r
  const inertiaRAF = useRef(null);\r
  const openingRef = useRef(false);\r
  const openStartedAtRef = useRef(0);\r
  const lastDragEndAt = useRef(0);\r
\r
  const scrollLockedRef = useRef(false);\r
  const lockScroll = useCallback(() => {\r
    if (scrollLockedRef.current) return;\r
    scrollLockedRef.current = true;\r
    document.body.classList.add('dg-scroll-lock');\r
  }, []);\r
  const unlockScroll = useCallback(() => {\r
    if (!scrollLockedRef.current) return;\r
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;\r
    scrollLockedRef.current = false;\r
    document.body.classList.remove('dg-scroll-lock');\r
  }, []);\r
\r
  const items = useMemo(() => buildItems(images, segments), [images, segments]);\r
\r
  const applyTransform = (xDeg, yDeg) => {\r
    const el = sphereRef.current;\r
    if (el) {\r
      el.style.transform = \`translateZ(calc(var(--radius) * -1)) rotateX(\${xDeg}deg) rotateY(\${yDeg}deg)\`;\r
    }\r
  };\r
\r
  const lockedRadiusRef = useRef(null);\r
\r
  useEffect(() => {\r
    const root = rootRef.current;\r
    if (!root) return;\r
    const ro = new ResizeObserver(entries => {\r
      const cr = entries[0].contentRect;\r
      const w = Math.max(1, cr.width),\r
        h = Math.max(1, cr.height);\r
      const minDim = Math.min(w, h),\r
        maxDim = Math.max(w, h),\r
        aspect = w / h;\r
      let basis;\r
      switch (fitBasis) {\r
        case 'min':\r
          basis = minDim;\r
          break;\r
        case 'max':\r
          basis = maxDim;\r
          break;\r
        case 'width':\r
          basis = w;\r
          break;\r
        case 'height':\r
          basis = h;\r
          break;\r
        default:\r
          basis = aspect >= 1.3 ? w : minDim;\r
      }\r
      let radius = basis * fit;\r
      const heightGuard = h * 1.35;\r
      radius = Math.min(radius, heightGuard);\r
      radius = clamp(radius, minRadius, maxRadius);\r
      lockedRadiusRef.current = Math.round(radius);\r
\r
      const viewerPad = Math.max(8, Math.round(minDim * padFactor));\r
      root.style.setProperty('--radius', \`\${lockedRadiusRef.current}px\`);\r
      root.style.setProperty('--viewer-pad', \`\${viewerPad}px\`);\r
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);\r
      root.style.setProperty('--tile-radius', imageBorderRadius);\r
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);\r
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');\r
      applyTransform(rotationRef.current.x, rotationRef.current.y);\r
\r
      const enlargedOverlay = viewerRef.current?.querySelector('.enlarge');\r
      if (enlargedOverlay && frameRef.current && mainRef.current) {\r
        const frameR = frameRef.current.getBoundingClientRect();\r
        const mainR = mainRef.current.getBoundingClientRect();\r
\r
        const hasCustomSize = openedImageWidth && openedImageHeight;\r
        if (hasCustomSize) {\r
          const tempDiv = document.createElement('div');\r
          tempDiv.style.cssText = \`position: absolute; width: \${openedImageWidth}; height: \${openedImageHeight}; visibility: hidden;\`;\r
          document.body.appendChild(tempDiv);\r
          const tempRect = tempDiv.getBoundingClientRect();\r
          document.body.removeChild(tempDiv);\r
\r
          const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;\r
          const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;\r
\r
          enlargedOverlay.style.left = \`\${centeredLeft}px\`;\r
          enlargedOverlay.style.top = \`\${centeredTop}px\`;\r
        } else {\r
          enlargedOverlay.style.left = \`\${frameR.left - mainR.left}px\`;\r
          enlargedOverlay.style.top = \`\${frameR.top - mainR.top}px\`;\r
          enlargedOverlay.style.width = \`\${frameR.width}px\`;\r
          enlargedOverlay.style.height = \`\${frameR.height}px\`;\r
        }\r
      }\r
    });\r
    ro.observe(root);\r
    return () => ro.disconnect();\r
  }, [\r
    fit,\r
    fitBasis,\r
    minRadius,\r
    maxRadius,\r
    padFactor,\r
    overlayBlurColor,\r
    grayscale,\r
    imageBorderRadius,\r
    openedImageBorderRadius,\r
    openedImageWidth,\r
    openedImageHeight\r
  ]);\r
\r
  useEffect(() => {\r
    applyTransform(rotationRef.current.x, rotationRef.current.y);\r
  }, []);\r
\r
  const stopInertia = useCallback(() => {\r
    if (inertiaRAF.current) {\r
      cancelAnimationFrame(inertiaRAF.current);\r
      inertiaRAF.current = null;\r
    }\r
  }, []);\r
\r
  const startInertia = useCallback(\r
    (vx, vy) => {\r
      const MAX_V = 1.4;\r
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;\r
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;\r
      let frames = 0;\r
      const d = clamp(dragDampening ?? 0.6, 0, 1);\r
      const frictionMul = 0.94 + 0.055 * d;\r
      const stopThreshold = 0.015 - 0.01 * d;\r
      const maxFrames = Math.round(90 + 270 * d);\r
      const step = () => {\r
        vX *= frictionMul;\r
        vY *= frictionMul;\r
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {\r
          inertiaRAF.current = null;\r
          return;\r
        }\r
        if (++frames > maxFrames) {\r
          inertiaRAF.current = null;\r
          return;\r
        }\r
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);\r
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);\r
        rotationRef.current = { x: nextX, y: nextY };\r
        applyTransform(nextX, nextY);\r
        inertiaRAF.current = requestAnimationFrame(step);\r
      };\r
      stopInertia();\r
      inertiaRAF.current = requestAnimationFrame(step);\r
    },\r
    [dragDampening, maxVerticalRotationDeg, stopInertia]\r
  );\r
\r
  useGesture(\r
    {\r
      onDragStart: ({ event }) => {\r
        if (focusedElRef.current) return;\r
        stopInertia();\r
        const evt = event;\r
        draggingRef.current = true;\r
        movedRef.current = false;\r
        startRotRef.current = { ...rotationRef.current };\r
        startPosRef.current = { x: evt.clientX, y: evt.clientY };\r
      },\r
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {\r
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;\r
        const evt = event;\r
        const dxTotal = evt.clientX - startPosRef.current.x;\r
        const dyTotal = evt.clientY - startPosRef.current.y;\r
        if (!movedRef.current) {\r
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;\r
          if (dist2 > 16) movedRef.current = true;\r
        }\r
        const nextX = clamp(\r
          startRotRef.current.x - dyTotal / dragSensitivity,\r
          -maxVerticalRotationDeg,\r
          maxVerticalRotationDeg\r
        );\r
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);\r
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {\r
          rotationRef.current = { x: nextX, y: nextY };\r
          applyTransform(nextX, nextY);\r
        }\r
        if (last) {\r
          draggingRef.current = false;\r
          let [vMagX, vMagY] = velocity;\r
          const [dirX, dirY] = direction;\r
          let vx = vMagX * dirX;\r
          let vy = vMagY * dirY;\r
          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {\r
            const [mx, my] = movement;\r
            vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);\r
            vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);\r
          }\r
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);\r
          if (movedRef.current) lastDragEndAt.current = performance.now();\r
          movedRef.current = false;\r
        }\r
      }\r
    },\r
    { target: mainRef, eventOptions: { passive: true } }\r
  );\r
\r
  useEffect(() => {\r
    const scrim = scrimRef.current;\r
    if (!scrim) return;\r
    const close = () => {\r
      if (performance.now() - openStartedAtRef.current < 250) return;\r
      const el = focusedElRef.current;\r
      if (!el) return;\r
      const parent = el.parentElement;\r
      const overlay = viewerRef.current?.querySelector('.enlarge');\r
      if (!overlay) return;\r
      const refDiv = parent.querySelector('.item__image--reference');\r
      const originalPos = originalTilePositionRef.current;\r
      if (!originalPos) {\r
        overlay.remove();\r
        if (refDiv) refDiv.remove();\r
        parent.style.setProperty('--rot-y-delta', '0deg');\r
        parent.style.setProperty('--rot-x-delta', '0deg');\r
        el.style.visibility = '';\r
        el.style.zIndex = 0;\r
        focusedElRef.current = null;\r
        rootRef.current?.removeAttribute('data-enlarging');\r
        openingRef.current = false;\r
        unlockScroll();\r
        return;\r
      }\r
      const currentRect = overlay.getBoundingClientRect();\r
      const rootRect = rootRef.current.getBoundingClientRect();\r
      const originalPosRelativeToRoot = {\r
        left: originalPos.left - rootRect.left,\r
        top: originalPos.top - rootRect.top,\r
        width: originalPos.width,\r
        height: originalPos.height\r
      };\r
      const overlayRelativeToRoot = {\r
        left: currentRect.left - rootRect.left,\r
        top: currentRect.top - rootRect.top,\r
        width: currentRect.width,\r
        height: currentRect.height\r
      };\r
      const animatingOverlay = document.createElement('div');\r
      animatingOverlay.className = 'enlarge-closing';\r
      animatingOverlay.style.cssText = \`position:absolute;left:\${overlayRelativeToRoot.left}px;top:\${overlayRelativeToRoot.top}px;width:\${overlayRelativeToRoot.width}px;height:\${overlayRelativeToRoot.height}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all \${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;\`;\r
      const originalImg = overlay.querySelector('img');\r
      if (originalImg) {\r
        const img = originalImg.cloneNode();\r
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';\r
        animatingOverlay.appendChild(img);\r
      }\r
      overlay.remove();\r
      rootRef.current.appendChild(animatingOverlay);\r
      void animatingOverlay.getBoundingClientRect();\r
      requestAnimationFrame(() => {\r
        animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';\r
        animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';\r
        animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';\r
        animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';\r
        animatingOverlay.style.opacity = '0';\r
      });\r
      const cleanup = () => {\r
        animatingOverlay.remove();\r
        originalTilePositionRef.current = null;\r
        if (refDiv) refDiv.remove();\r
        parent.style.transition = 'none';\r
        el.style.transition = 'none';\r
        parent.style.setProperty('--rot-y-delta', '0deg');\r
        parent.style.setProperty('--rot-x-delta', '0deg');\r
        requestAnimationFrame(() => {\r
          el.style.visibility = '';\r
          el.style.opacity = '0';\r
          el.style.zIndex = 0;\r
          focusedElRef.current = null;\r
          rootRef.current?.removeAttribute('data-enlarging');\r
          requestAnimationFrame(() => {\r
            parent.style.transition = '';\r
            el.style.transition = 'opacity 300ms ease-out';\r
            requestAnimationFrame(() => {\r
              el.style.opacity = '1';\r
              setTimeout(() => {\r
                el.style.transition = '';\r
                el.style.opacity = '';\r
                openingRef.current = false;\r
                if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true')\r
                  document.body.classList.remove('dg-scroll-lock');\r
              }, 300);\r
            });\r
          });\r
        });\r
      };\r
      animatingOverlay.addEventListener('transitionend', cleanup, { once: true });\r
    };\r
    scrim.addEventListener('click', close);\r
    const onKey = e => {\r
      if (e.key === 'Escape') close();\r
    };\r
    window.addEventListener('keydown', onKey);\r
    return () => {\r
      scrim.removeEventListener('click', close);\r
      window.removeEventListener('keydown', onKey);\r
    };\r
  }, [enlargeTransitionMs, unlockScroll]);\r
\r
  const openItemFromElement = useCallback(\r
    el => {\r
      if (openingRef.current) return;\r
      openingRef.current = true;\r
      openStartedAtRef.current = performance.now();\r
      lockScroll();\r
      const parent = el.parentElement;\r
      focusedElRef.current = el;\r
      el.setAttribute('data-focused', 'true');\r
      const offsetX = getDataNumber(parent, 'offsetX', 0);\r
      const offsetY = getDataNumber(parent, 'offsetY', 0);\r
      const sizeX = getDataNumber(parent, 'sizeX', 2);\r
      const sizeY = getDataNumber(parent, 'sizeY', 2);\r
      const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);\r
      const parentY = normalizeAngle(parentRot.rotateY);\r
      const globalY = normalizeAngle(rotationRef.current.y);\r
      let rotY = -(parentY + globalY) % 360;\r
      if (rotY < -180) rotY += 360;\r
      const rotX = -parentRot.rotateX - rotationRef.current.x;\r
      parent.style.setProperty('--rot-y-delta', \`\${rotY}deg\`);\r
      parent.style.setProperty('--rot-x-delta', \`\${rotX}deg\`);\r
      const refDiv = document.createElement('div');\r
      refDiv.className = 'item__image item__image--reference';\r
      refDiv.style.opacity = '0';\r
      refDiv.style.transform = \`rotateX(\${-parentRot.rotateX}deg) rotateY(\${-parentRot.rotateY}deg)\`;\r
      parent.appendChild(refDiv);\r
\r
      void refDiv.offsetHeight;\r
\r
      const tileR = refDiv.getBoundingClientRect();\r
      const mainR = mainRef.current?.getBoundingClientRect();\r
      const frameR = frameRef.current?.getBoundingClientRect();\r
\r
      if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {\r
        openingRef.current = false;\r
        focusedElRef.current = null;\r
        parent.removeChild(refDiv);\r
        unlockScroll();\r
        return;\r
      }\r
\r
      originalTilePositionRef.current = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };\r
      el.style.visibility = 'hidden';\r
      el.style.zIndex = 0;\r
      const overlay = document.createElement('div');\r
      overlay.className = 'enlarge';\r
      overlay.style.position = 'absolute';\r
      overlay.style.left = frameR.left - mainR.left + 'px';\r
      overlay.style.top = frameR.top - mainR.top + 'px';\r
      overlay.style.width = frameR.width + 'px';\r
      overlay.style.height = frameR.height + 'px';\r
      overlay.style.opacity = '0';\r
      overlay.style.zIndex = '30';\r
      overlay.style.willChange = 'transform, opacity';\r
      overlay.style.transformOrigin = 'top left';\r
      overlay.style.transition = \`transform \${enlargeTransitionMs}ms ease, opacity \${enlargeTransitionMs}ms ease\`;\r
      const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';\r
      const img = document.createElement('img');\r
      img.src = rawSrc;\r
      overlay.appendChild(img);\r
      viewerRef.current.appendChild(overlay);\r
      const tx0 = tileR.left - frameR.left;\r
      const ty0 = tileR.top - frameR.top;\r
      const sx0 = tileR.width / frameR.width;\r
      const sy0 = tileR.height / frameR.height;\r
\r
      const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;\r
      const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;\r
\r
      overlay.style.transform = \`translate(\${tx0}px, \${ty0}px) scale(\${validSx0}, \${validSy0})\`;\r
\r
      setTimeout(() => {\r
        if (!overlay.parentElement) return;\r
        overlay.style.opacity = '1';\r
        overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';\r
        rootRef.current?.setAttribute('data-enlarging', 'true');\r
      }, 16);\r
\r
      const wantsResize = openedImageWidth || openedImageHeight;\r
      if (wantsResize) {\r
        const onFirstEnd = ev => {\r
          if (ev.propertyName !== 'transform') return;\r
          overlay.removeEventListener('transitionend', onFirstEnd);\r
          const prevTransition = overlay.style.transition;\r
          overlay.style.transition = 'none';\r
          const tempWidth = openedImageWidth || \`\${frameR.width}px\`;\r
          const tempHeight = openedImageHeight || \`\${frameR.height}px\`;\r
          overlay.style.width = tempWidth;\r
          overlay.style.height = tempHeight;\r
          const newRect = overlay.getBoundingClientRect();\r
          overlay.style.width = frameR.width + 'px';\r
          overlay.style.height = frameR.height + 'px';\r
          void overlay.offsetWidth;\r
          overlay.style.transition = \`left \${enlargeTransitionMs}ms ease, top \${enlargeTransitionMs}ms ease, width \${enlargeTransitionMs}ms ease, height \${enlargeTransitionMs}ms ease\`;\r
          const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;\r
          const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;\r
          requestAnimationFrame(() => {\r
            overlay.style.left = \`\${centeredLeft}px\`;\r
            overlay.style.top = \`\${centeredTop}px\`;\r
            overlay.style.width = tempWidth;\r
            overlay.style.height = tempHeight;\r
          });\r
          const cleanupSecond = () => {\r
            overlay.removeEventListener('transitionend', cleanupSecond);\r
            overlay.style.transition = prevTransition;\r
          };\r
          overlay.addEventListener('transitionend', cleanupSecond, { once: true });\r
        };\r
        overlay.addEventListener('transitionend', onFirstEnd);\r
      }\r
    },\r
    [enlargeTransitionMs, lockScroll, openedImageHeight, openedImageWidth, segments, unlockScroll]\r
  );\r
\r
  const onTileClick = useCallback(\r
    e => {\r
      if (draggingRef.current) return;\r
      if (movedRef.current) return;\r
      if (performance.now() - lastDragEndAt.current < 80) return;\r
      if (openingRef.current) return;\r
      openItemFromElement(e.currentTarget);\r
    },\r
    [openItemFromElement]\r
  );\r
\r
  const onTilePointerUp = useCallback(\r
    e => {\r
      if (e.pointerType !== 'touch') return;\r
      if (draggingRef.current) return;\r
      if (movedRef.current) return;\r
      if (performance.now() - lastDragEndAt.current < 80) return;\r
      if (openingRef.current) return;\r
      openItemFromElement(e.currentTarget);\r
    },\r
    [openItemFromElement]\r
  );\r
\r
  useEffect(() => {\r
    return () => {\r
      document.body.classList.remove('dg-scroll-lock');\r
    };\r
  }, []);\r
\r
  return (\r
    <div\r
      ref={rootRef}\r
      className="sphere-root"\r
      style={{\r
        ['--segments-x']: segments,\r
        ['--segments-y']: segments,\r
        ['--overlay-blur-color']: overlayBlurColor,\r
        ['--tile-radius']: imageBorderRadius,\r
        ['--enlarge-radius']: openedImageBorderRadius,\r
        ['--image-filter']: grayscale ? 'grayscale(1)' : 'none'\r
      }}\r
    >\r
      <main ref={mainRef} className="sphere-main">\r
        <div className="stage">\r
          <div ref={sphereRef} className="sphere">\r
            {items.map((it, i) => (\r
              <div\r
                key={\`\${it.x},\${it.y},\${i}\`}\r
                className="item"\r
                data-src={it.src}\r
                data-offset-x={it.x}\r
                data-offset-y={it.y}\r
                data-size-x={it.sizeX}\r
                data-size-y={it.sizeY}\r
                style={{\r
                  ['--offset-x']: it.x,\r
                  ['--offset-y']: it.y,\r
                  ['--item-size-x']: it.sizeX,\r
                  ['--item-size-y']: it.sizeY\r
                }}\r
              >\r
                <div\r
                  className="item__image"\r
                  role="button"\r
                  tabIndex={0}\r
                  aria-label={it.alt || 'Open image'}\r
                  onClick={onTileClick}\r
                  onPointerUp={onTilePointerUp}\r
                >\r
                  <img src={it.src} draggable={false} alt={it.alt} />\r
                </div>\r
              </div>\r
            ))}\r
          </div>\r
        </div>\r
\r
        <div className="overlay" />\r
        <div className="overlay overlay--blur" />\r
        <div className="edge-fade edge-fade--top" />\r
        <div className="edge-fade edge-fade--bottom" />\r
\r
        <div className="viewer" ref={viewerRef}>\r
          <div ref={scrimRef} className="scrim" />\r
          <div ref={frameRef} className="frame" />\r
        </div>\r
      </main>\r
    </div>\r
  );\r
}\r
`,jt=`.sphere-root {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  --radius: 520px;\r
  --viewer-pad: 72px;\r
  --circ: calc(var(--radius) * 3.14);\r
  --rot-y: calc((360deg / var(--segments-x)) / 2);\r
  --rot-x: calc((360deg / var(--segments-y)) / 2);\r
  --item-width: calc(var(--circ) / var(--segments-x));\r
  --item-height: calc(var(--circ) / var(--segments-y));\r
}\r
\r
.sphere-root * {\r
  box-sizing: border-box;\r
}\r
\r
.sphere,\r
.item,\r
.item__image {\r
  transform-style: preserve-3d;\r
}\r
\r
main.sphere-main {\r
  position: absolute;\r
  inset: 0;\r
  display: grid;\r
  place-items: center;\r
  overflow: hidden;\r
  touch-action: none;\r
  user-select: none;\r
  -webkit-user-select: none;\r
  background: transparent;\r
}\r
\r
.stage {\r
  width: 100%;\r
  height: 100%;\r
  display: grid;\r
  place-items: center;\r
  perspective: calc(var(--radius) * 2);\r
  perspective-origin: 50% 50%;\r
  contain: layout paint size;\r
}\r
\r
.sphere {\r
  transform: translateZ(calc(var(--radius) * -1));\r
  will-change: transform;\r
}\r
\r
.overlay,\r
.overlay--blur {\r
  position: absolute;\r
  inset: 0;\r
  margin: auto;\r
  z-index: 3;\r
  pointer-events: none;\r
}\r
\r
.overlay {\r
  background-image: radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, #060010) 100%);\r
}\r
\r
.overlay--blur {\r
  -webkit-mask-image: radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, #060010) 90%);\r
  mask-image: radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, #060010) 90%);\r
  backdrop-filter: blur(3px);\r
}\r
\r
.item {\r
  width: calc(var(--item-width) * var(--item-size-x));\r
  height: calc(var(--item-height) * var(--item-size-y));\r
  position: absolute;\r
  top: -999px;\r
  bottom: -999px;\r
  left: -999px;\r
  right: -999px;\r
  margin: auto;\r
  transform-origin: 50% 50%;\r
  backface-visibility: hidden;\r
  transition: transform 300ms;\r
  transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg)))\r
    rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg)))\r
    translateZ(var(--radius));\r
}\r
\r
.item__image {\r
  position: absolute;\r
  display: block;\r
  inset: 10px;\r
  border-radius: var(--tile-radius, 12px);\r
  background: transparent;\r
  overflow: hidden;\r
  backface-visibility: hidden;\r
  transition: transform 300ms;\r
  cursor: pointer;\r
  -webkit-tap-highlight-color: transparent;\r
  touch-action: manipulation;\r
  pointer-events: auto;\r
  -webkit-transform: translateZ(0);\r
  transform: translateZ(0);\r
}\r
\r
.item__image:focus {\r
  outline: none;\r
}\r
\r
.item__image img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
  pointer-events: none;\r
  backface-visibility: hidden;\r
  filter: var(--image-filter, none);\r
}\r
\r
.viewer {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 20;\r
  pointer-events: none;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: var(--viewer-pad);\r
}\r
\r
.viewer .frame {\r
  height: 100%;\r
  aspect-ratio: 1;\r
  border-radius: var(--enlarge-radius, 32px);\r
  display: flex;\r
}\r
\r
@media (max-aspect-ratio: 1/1) {\r
  .viewer .frame {\r
    height: auto;\r
    width: 100%;\r
  }\r
}\r
\r
.viewer .scrim {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 10;\r
  background: rgba(0, 0, 0, 0.4);\r
  pointer-events: none;\r
  opacity: 0;\r
  transition: opacity 500ms ease;\r
  backdrop-filter: blur(3px);\r
}\r
\r
.sphere-root[data-enlarging='true'] .viewer .scrim {\r
  opacity: 1;\r
  pointer-events: all;\r
}\r
\r
.viewer .enlarge {\r
  position: absolute;\r
  z-index: 30;\r
  border-radius: var(--enlarge-radius, 32px);\r
  overflow: hidden;\r
  transition:\r
    transform 500ms ease,\r
    opacity 500ms ease;\r
  transform-origin: top left;\r
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);\r
}\r
\r
.viewer .enlarge img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
  filter: var(--image-filter, none);\r
}\r
\r
.sphere-root .enlarge-closing img {\r
  filter: var(--image-filter, none);\r
}\r
\r
.edge-fade {\r
  position: absolute;\r
  left: 0;\r
  right: 0;\r
  height: 120px;\r
  z-index: 5;\r
  pointer-events: none;\r
  background: linear-gradient(to bottom, transparent, var(--overlay-blur-color, #060010));\r
}\r
\r
.edge-fade--top {\r
  top: 0;\r
  transform: rotate(180deg);\r
}\r
\r
.edge-fade--bottom {\r
  bottom: 0;\r
}\r
`,Vt=`import { useEffect, useMemo, useRef, useCallback } from 'react';\r
import { useGesture } from '@use-gesture/react';\r
\r
const DEFAULT_IMAGES = [\r
  {\r
    src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Abstract art'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Modern sculpture'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Digital artwork'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Contemporary art'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Geometric pattern'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Textured surface'\r
  },\r
  {\r
    src: 'https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large',\r
    alt: 'Social media image'\r
  }\r
];\r
\r
const DEFAULTS = {\r
  maxVerticalRotationDeg: 5,\r
  dragSensitivity: 20,\r
  enlargeTransitionMs: 300,\r
  segments: 35\r
};\r
\r
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);\r
const normalizeAngle = d => ((d % 360) + 360) % 360;\r
const wrapAngleSigned = deg => {\r
  const a = (((deg + 180) % 360) + 360) % 360;\r
  return a - 180;\r
};\r
const getDataNumber = (el, name, fallback) => {\r
  const attr = el.dataset[name] ?? el.getAttribute(\`data-\${name}\`);\r
  const n = attr == null ? NaN : parseFloat(attr);\r
  return Number.isFinite(n) ? n : fallback;\r
};\r
\r
function buildItems(pool, seg) {\r
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);\r
  const evenYs = [-4, -2, 0, 2, 4];\r
  const oddYs = [-3, -1, 1, 3, 5];\r
\r
  const coords = xCols.flatMap((x, c) => {\r
    const ys = c % 2 === 0 ? evenYs : oddYs;\r
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));\r
  });\r
\r
  const totalSlots = coords.length;\r
  if (pool.length === 0) {\r
    return coords.map(c => ({ ...c, src: '', alt: '' }));\r
  }\r
  if (pool.length > totalSlots) {\r
    console.warn(\r
      \`[DomeGallery] Provided image count (\${pool.length}) exceeds available tiles (\${totalSlots}). Some images will not be shown.\`\r
    );\r
  }\r
\r
  const normalizedImages = pool.map(image => {\r
    if (typeof image === 'string') {\r
      return { src: image, alt: '' };\r
    }\r
    return { src: image.src || '', alt: image.alt || '' };\r
  });\r
\r
  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);\r
\r
  for (let i = 1; i < usedImages.length; i++) {\r
    if (usedImages[i].src === usedImages[i - 1].src) {\r
      for (let j = i + 1; j < usedImages.length; j++) {\r
        if (usedImages[j].src !== usedImages[i].src) {\r
          const tmp = usedImages[i];\r
          usedImages[i] = usedImages[j];\r
          usedImages[j] = tmp;\r
          break;\r
        }\r
      }\r
    }\r
  }\r
\r
  return coords.map((c, i) => ({\r
    ...c,\r
    src: usedImages[i].src,\r
    alt: usedImages[i].alt\r
  }));\r
}\r
\r
function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {\r
  const unit = 360 / segments / 2;\r
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);\r
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);\r
  return { rotateX, rotateY };\r
}\r
\r
export default function DomeGallery({\r
  images = DEFAULT_IMAGES,\r
  fit = 0.5,\r
  fitBasis = 'auto',\r
  minRadius = 600,\r
  maxRadius = Infinity,\r
  padFactor = 0.25,\r
  overlayBlurColor = '#060010',\r
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,\r
  dragSensitivity = DEFAULTS.dragSensitivity,\r
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,\r
  segments = DEFAULTS.segments,\r
  dragDampening = 2,\r
  openedImageWidth = '400px',\r
  openedImageHeight = '400px',\r
  imageBorderRadius = '30px',\r
  openedImageBorderRadius = '30px',\r
  grayscale = true\r
}) {\r
  const rootRef = useRef(null);\r
  const mainRef = useRef(null);\r
  const sphereRef = useRef(null);\r
  const frameRef = useRef(null);\r
  const viewerRef = useRef(null);\r
  const scrimRef = useRef(null);\r
  const focusedElRef = useRef(null);\r
  const originalTilePositionRef = useRef(null);\r
\r
  const rotationRef = useRef({ x: 0, y: 0 });\r
  const startRotRef = useRef({ x: 0, y: 0 });\r
  const startPosRef = useRef(null);\r
  const draggingRef = useRef(false);\r
  const cancelTapRef = useRef(false);\r
  const movedRef = useRef(false);\r
  const inertiaRAF = useRef(null);\r
  const pointerTypeRef = useRef('mouse');\r
  const tapTargetRef = useRef(null);\r
  const openingRef = useRef(false);\r
  const openStartedAtRef = useRef(0);\r
  const lastDragEndAt = useRef(0);\r
\r
  const scrollLockedRef = useRef(false);\r
  const lockScroll = useCallback(() => {\r
    if (scrollLockedRef.current) return;\r
    scrollLockedRef.current = true;\r
    document.body.classList.add('dg-scroll-lock');\r
  }, []);\r
  const unlockScroll = useCallback(() => {\r
    if (!scrollLockedRef.current) return;\r
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;\r
    scrollLockedRef.current = false;\r
    document.body.classList.remove('dg-scroll-lock');\r
  }, []);\r
\r
  const items = useMemo(() => buildItems(images, segments), [images, segments]);\r
\r
  const applyTransform = (xDeg, yDeg) => {\r
    const el = sphereRef.current;\r
    if (el) {\r
      el.style.transform = \`translateZ(calc(var(--radius) * -1)) rotateX(\${xDeg}deg) rotateY(\${yDeg}deg)\`;\r
    }\r
  };\r
\r
  const lockedRadiusRef = useRef(null);\r
\r
  useEffect(() => {\r
    const root = rootRef.current;\r
    if (!root) return;\r
    const ro = new ResizeObserver(entries => {\r
      const cr = entries[0].contentRect;\r
      const w = Math.max(1, cr.width),\r
        h = Math.max(1, cr.height);\r
      const minDim = Math.min(w, h),\r
        maxDim = Math.max(w, h),\r
        aspect = w / h;\r
      let basis;\r
      switch (fitBasis) {\r
        case 'min':\r
          basis = minDim;\r
          break;\r
        case 'max':\r
          basis = maxDim;\r
          break;\r
        case 'width':\r
          basis = w;\r
          break;\r
        case 'height':\r
          basis = h;\r
          break;\r
        default:\r
          basis = aspect >= 1.3 ? w : minDim;\r
      }\r
      let radius = basis * fit;\r
      const heightGuard = h * 1.35;\r
      radius = Math.min(radius, heightGuard);\r
      radius = clamp(radius, minRadius, maxRadius);\r
      lockedRadiusRef.current = Math.round(radius);\r
\r
      const viewerPad = Math.max(8, Math.round(minDim * padFactor));\r
      root.style.setProperty('--radius', \`\${lockedRadiusRef.current}px\`);\r
      root.style.setProperty('--viewer-pad', \`\${viewerPad}px\`);\r
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);\r
      root.style.setProperty('--tile-radius', imageBorderRadius);\r
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);\r
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');\r
      applyTransform(rotationRef.current.x, rotationRef.current.y);\r
\r
      const enlargedOverlay = viewerRef.current?.querySelector('.enlarge');\r
      if (enlargedOverlay && frameRef.current && mainRef.current) {\r
        const frameR = frameRef.current.getBoundingClientRect();\r
        const mainR = mainRef.current.getBoundingClientRect();\r
\r
        const hasCustomSize = openedImageWidth && openedImageHeight;\r
        if (hasCustomSize) {\r
          const tempDiv = document.createElement('div');\r
          tempDiv.style.cssText = \`position: absolute; width: \${openedImageWidth}; height: \${openedImageHeight}; visibility: hidden;\`;\r
          document.body.appendChild(tempDiv);\r
          const tempRect = tempDiv.getBoundingClientRect();\r
          document.body.removeChild(tempDiv);\r
\r
          const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;\r
          const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;\r
\r
          enlargedOverlay.style.left = \`\${centeredLeft}px\`;\r
          enlargedOverlay.style.top = \`\${centeredTop}px\`;\r
        } else {\r
          enlargedOverlay.style.left = \`\${frameR.left - mainR.left}px\`;\r
          enlargedOverlay.style.top = \`\${frameR.top - mainR.top}px\`;\r
          enlargedOverlay.style.width = \`\${frameR.width}px\`;\r
          enlargedOverlay.style.height = \`\${frameR.height}px\`;\r
        }\r
      }\r
    });\r
    ro.observe(root);\r
    return () => ro.disconnect();\r
  }, [\r
    fit,\r
    fitBasis,\r
    minRadius,\r
    maxRadius,\r
    padFactor,\r
    overlayBlurColor,\r
    grayscale,\r
    imageBorderRadius,\r
    openedImageBorderRadius,\r
    openedImageWidth,\r
    openedImageHeight\r
  ]);\r
\r
  useEffect(() => {\r
    applyTransform(rotationRef.current.x, rotationRef.current.y);\r
  }, []);\r
\r
  const stopInertia = useCallback(() => {\r
    if (inertiaRAF.current) {\r
      cancelAnimationFrame(inertiaRAF.current);\r
      inertiaRAF.current = null;\r
    }\r
  }, []);\r
\r
  const startInertia = useCallback(\r
    (vx, vy) => {\r
      const MAX_V = 1.4;\r
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;\r
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;\r
      let frames = 0;\r
      const d = clamp(dragDampening ?? 0.6, 0, 1);\r
      const frictionMul = 0.94 + 0.055 * d;\r
      const stopThreshold = 0.015 - 0.01 * d;\r
      const maxFrames = Math.round(90 + 270 * d);\r
      const step = () => {\r
        vX *= frictionMul;\r
        vY *= frictionMul;\r
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {\r
          inertiaRAF.current = null;\r
          return;\r
        }\r
        if (++frames > maxFrames) {\r
          inertiaRAF.current = null;\r
          return;\r
        }\r
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);\r
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);\r
        rotationRef.current = { x: nextX, y: nextY };\r
        applyTransform(nextX, nextY);\r
        inertiaRAF.current = requestAnimationFrame(step);\r
      };\r
      stopInertia();\r
      inertiaRAF.current = requestAnimationFrame(step);\r
    },\r
    [dragDampening, maxVerticalRotationDeg, stopInertia]\r
  );\r
\r
  useGesture(\r
    {\r
      onDragStart: ({ event }) => {\r
        if (focusedElRef.current) return;\r
        stopInertia();\r
\r
        pointerTypeRef.current = event.pointerType || 'mouse';\r
        if (pointerTypeRef.current === 'touch') event.preventDefault();\r
        if (pointerTypeRef.current === 'touch') lockScroll();\r
        draggingRef.current = true;\r
        cancelTapRef.current = false;\r
        movedRef.current = false;\r
        startRotRef.current = { ...rotationRef.current };\r
        startPosRef.current = { x: event.clientX, y: event.clientY };\r
        const potential = event.target.closest?.('.item__image');\r
        tapTargetRef.current = potential || null;\r
      },\r
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {\r
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;\r
\r
        if (pointerTypeRef.current === 'touch') event.preventDefault();\r
\r
        const dxTotal = event.clientX - startPosRef.current.x;\r
        const dyTotal = event.clientY - startPosRef.current.y;\r
\r
        if (!movedRef.current) {\r
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;\r
          if (dist2 > 16) movedRef.current = true;\r
        }\r
\r
        const nextX = clamp(\r
          startRotRef.current.x - dyTotal / dragSensitivity,\r
          -maxVerticalRotationDeg,\r
          maxVerticalRotationDeg\r
        );\r
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;\r
\r
        const cur = rotationRef.current;\r
        if (cur.x !== nextX || cur.y !== nextY) {\r
          rotationRef.current = { x: nextX, y: nextY };\r
          applyTransform(nextX, nextY);\r
        }\r
\r
        if (last) {\r
          draggingRef.current = false;\r
          let isTap = false;\r
\r
          if (startPosRef.current) {\r
            const dx = event.clientX - startPosRef.current.x;\r
            const dy = event.clientY - startPosRef.current.y;\r
            const dist2 = dx * dx + dy * dy;\r
            const TAP_THRESH_PX = pointerTypeRef.current === 'touch' ? 10 : 6;\r
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {\r
              isTap = true;\r
            }\r
          }\r
\r
          let [vMagX, vMagY] = velArr;\r
          const [dirX, dirY] = dirArr;\r
          let vx = vMagX * dirX;\r
          let vy = vMagY * dirY;\r
\r
          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {\r
            const [mx, my] = movement;\r
            vx = (mx / dragSensitivity) * 0.02;\r
            vy = (my / dragSensitivity) * 0.02;\r
          }\r
\r
          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {\r
            startInertia(vx, vy);\r
          }\r
          startPosRef.current = null;\r
          cancelTapRef.current = !isTap;\r
\r
          if (isTap && tapTargetRef.current && !focusedElRef.current) {\r
            openItemFromElement(tapTargetRef.current);\r
          }\r
          tapTargetRef.current = null;\r
\r
          if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120);\r
          if (movedRef.current) lastDragEndAt.current = performance.now();\r
          movedRef.current = false;\r
          if (pointerTypeRef.current === 'touch') unlockScroll();\r
        }\r
      }\r
    },\r
    { target: mainRef, eventOptions: { passive: false } }\r
  );\r
\r
  useEffect(() => {\r
    const scrim = scrimRef.current;\r
    if (!scrim) return;\r
\r
    const close = () => {\r
      if (performance.now() - openStartedAtRef.current < 250) return;\r
      const el = focusedElRef.current;\r
      if (!el) return;\r
      const parent = el.parentElement;\r
      const overlay = viewerRef.current?.querySelector('.enlarge');\r
      if (!overlay) return;\r
\r
      const refDiv = parent.querySelector('.item__image--reference');\r
\r
      const originalPos = originalTilePositionRef.current;\r
      if (!originalPos) {\r
        overlay.remove();\r
        if (refDiv) refDiv.remove();\r
        parent.style.setProperty('--rot-y-delta', \`0deg\`);\r
        parent.style.setProperty('--rot-x-delta', \`0deg\`);\r
        el.style.visibility = '';\r
        el.style.zIndex = 0;\r
        focusedElRef.current = null;\r
        rootRef.current?.removeAttribute('data-enlarging');\r
        openingRef.current = false;\r
        return;\r
      }\r
\r
      const currentRect = overlay.getBoundingClientRect();\r
      const rootRect = rootRef.current.getBoundingClientRect();\r
\r
      const originalPosRelativeToRoot = {\r
        left: originalPos.left - rootRect.left,\r
        top: originalPos.top - rootRect.top,\r
        width: originalPos.width,\r
        height: originalPos.height\r
      };\r
\r
      const overlayRelativeToRoot = {\r
        left: currentRect.left - rootRect.left,\r
        top: currentRect.top - rootRect.top,\r
        width: currentRect.width,\r
        height: currentRect.height\r
      };\r
\r
      const animatingOverlay = document.createElement('div');\r
      animatingOverlay.className = 'enlarge-closing';\r
      animatingOverlay.style.cssText = \`\r
        position: absolute;\r
        left: \${overlayRelativeToRoot.left}px;\r
        top: \${overlayRelativeToRoot.top}px;\r
        width: \${overlayRelativeToRoot.width}px;\r
        height: \${overlayRelativeToRoot.height}px;\r
        z-index: 9999;\r
        border-radius: \${openedImageBorderRadius};\r
        overflow: hidden;\r
        box-shadow: 0 10px 30px rgba(0,0,0,.35);\r
        transition: all \${enlargeTransitionMs}ms ease-out;\r
        pointer-events: none;\r
        margin: 0;\r
        transform: none;\r
        filter: \${grayscale ? 'grayscale(1)' : 'none'};\r
      \`;\r
\r
      const originalImg = overlay.querySelector('img');\r
      if (originalImg) {\r
        const img = originalImg.cloneNode();\r
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';\r
        animatingOverlay.appendChild(img);\r
      }\r
\r
      overlay.remove();\r
      rootRef.current.appendChild(animatingOverlay);\r
\r
      void animatingOverlay.getBoundingClientRect();\r
\r
      requestAnimationFrame(() => {\r
        animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';\r
        animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';\r
        animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';\r
        animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';\r
        animatingOverlay.style.opacity = '0';\r
      });\r
\r
      const cleanup = () => {\r
        animatingOverlay.remove();\r
        originalTilePositionRef.current = null;\r
\r
        if (refDiv) refDiv.remove();\r
        parent.style.transition = 'none';\r
        el.style.transition = 'none';\r
\r
        parent.style.setProperty('--rot-y-delta', \`0deg\`);\r
        parent.style.setProperty('--rot-x-delta', \`0deg\`);\r
\r
        requestAnimationFrame(() => {\r
          el.style.visibility = '';\r
          el.style.opacity = '0';\r
          el.style.zIndex = 0;\r
          focusedElRef.current = null;\r
          rootRef.current?.removeAttribute('data-enlarging');\r
\r
          requestAnimationFrame(() => {\r
            parent.style.transition = '';\r
            el.style.transition = 'opacity 300ms ease-out';\r
\r
            requestAnimationFrame(() => {\r
              el.style.opacity = '1';\r
              setTimeout(() => {\r
                el.style.transition = '';\r
                el.style.opacity = '';\r
                openingRef.current = false;\r
                if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true')\r
                  document.body.classList.remove('dg-scroll-lock');\r
              }, 300);\r
            });\r
          });\r
        });\r
      };\r
\r
      animatingOverlay.addEventListener('transitionend', cleanup, {\r
        once: true\r
      });\r
    };\r
\r
    scrim.addEventListener('click', close);\r
    const onKey = e => {\r
      if (e.key === 'Escape') close();\r
    };\r
    window.addEventListener('keydown', onKey);\r
\r
    return () => {\r
      scrim.removeEventListener('click', close);\r
      window.removeEventListener('keydown', onKey);\r
    };\r
  }, [enlargeTransitionMs, openedImageBorderRadius, grayscale]);\r
\r
  const openItemFromElement = el => {\r
    if (openingRef.current) return;\r
    openingRef.current = true;\r
    openStartedAtRef.current = performance.now();\r
    lockScroll();\r
    const parent = el.parentElement;\r
    focusedElRef.current = el;\r
    el.setAttribute('data-focused', 'true');\r
\r
    const offsetX = getDataNumber(parent, 'offsetX', 0);\r
    const offsetY = getDataNumber(parent, 'offsetY', 0);\r
    const sizeX = getDataNumber(parent, 'sizeX', 2);\r
    const sizeY = getDataNumber(parent, 'sizeY', 2);\r
\r
    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);\r
    const parentY = normalizeAngle(parentRot.rotateY);\r
    const globalY = normalizeAngle(rotationRef.current.y);\r
    let rotY = -(parentY + globalY) % 360;\r
    if (rotY < -180) rotY += 360;\r
    const rotX = -parentRot.rotateX - rotationRef.current.x;\r
\r
    parent.style.setProperty('--rot-y-delta', \`\${rotY}deg\`);\r
    parent.style.setProperty('--rot-x-delta', \`\${rotX}deg\`);\r
\r
    const refDiv = document.createElement('div');\r
    refDiv.className = 'item__image item__image--reference opacity-0';\r
    refDiv.style.transform = \`rotateX(\${-parentRot.rotateX}deg) rotateY(\${-parentRot.rotateY}deg)\`;\r
    parent.appendChild(refDiv);\r
\r
    void refDiv.offsetHeight;\r
\r
    const tileR = refDiv.getBoundingClientRect();\r
    const mainR = mainRef.current?.getBoundingClientRect();\r
    const frameR = frameRef.current?.getBoundingClientRect();\r
\r
    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {\r
      openingRef.current = false;\r
      focusedElRef.current = null;\r
      parent.removeChild(refDiv);\r
      unlockScroll();\r
      return;\r
    }\r
\r
    originalTilePositionRef.current = {\r
      left: tileR.left,\r
      top: tileR.top,\r
      width: tileR.width,\r
      height: tileR.height\r
    };\r
\r
    el.style.visibility = 'hidden';\r
    el.style.zIndex = 0;\r
\r
    const overlay = document.createElement('div');\r
    overlay.className = 'enlarge';\r
    overlay.style.position = 'absolute';\r
    overlay.style.left = frameR.left - mainR.left + 'px';\r
    overlay.style.top = frameR.top - mainR.top + 'px';\r
    overlay.style.width = frameR.width + 'px';\r
    overlay.style.height = frameR.height + 'px';\r
    overlay.style.opacity = '0';\r
    overlay.style.zIndex = '30';\r
    overlay.style.willChange = 'transform, opacity';\r
    overlay.style.transformOrigin = 'top left';\r
    overlay.style.transition = \`transform \${enlargeTransitionMs}ms ease, opacity \${enlargeTransitionMs}ms ease\`;\r
    overlay.style.borderRadius = openedImageBorderRadius;\r
    overlay.style.overflow = 'hidden';\r
    overlay.style.boxShadow = '0 10px 30px rgba(0,0,0,.35)';\r
\r
    const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';\r
    const rawAlt = parent.dataset.alt || el.querySelector('img')?.alt || '';\r
    const img = document.createElement('img');\r
    img.src = rawSrc;\r
    img.alt = rawAlt;\r
    img.style.width = '100%';\r
    img.style.height = '100%';\r
    img.style.objectFit = 'cover';\r
    img.style.filter = grayscale ? 'grayscale(1)' : 'none';\r
    overlay.appendChild(img);\r
    viewerRef.current.appendChild(overlay);\r
\r
    const tx0 = tileR.left - frameR.left;\r
    const ty0 = tileR.top - frameR.top;\r
    const sx0 = tileR.width / frameR.width;\r
    const sy0 = tileR.height / frameR.height;\r
\r
    const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;\r
    const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;\r
\r
    overlay.style.transform = \`translate(\${tx0}px, \${ty0}px) scale(\${validSx0}, \${validSy0})\`;\r
\r
    setTimeout(() => {\r
      if (!overlay.parentElement) return;\r
      overlay.style.opacity = '1';\r
      overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';\r
      rootRef.current?.setAttribute('data-enlarging', 'true');\r
    }, 16);\r
\r
    const wantsResize = openedImageWidth || openedImageHeight;\r
    if (wantsResize) {\r
      const onFirstEnd = ev => {\r
        if (ev.propertyName !== 'transform') return;\r
        overlay.removeEventListener('transitionend', onFirstEnd);\r
        const prevTransition = overlay.style.transition;\r
        overlay.style.transition = 'none';\r
        const tempWidth = openedImageWidth || \`\${frameR.width}px\`;\r
        const tempHeight = openedImageHeight || \`\${frameR.height}px\`;\r
        overlay.style.width = tempWidth;\r
        overlay.style.height = tempHeight;\r
        const newRect = overlay.getBoundingClientRect();\r
        overlay.style.width = frameR.width + 'px';\r
        overlay.style.height = frameR.height + 'px';\r
        void overlay.offsetWidth;\r
        overlay.style.transition = \`left \${enlargeTransitionMs}ms ease, top \${enlargeTransitionMs}ms ease, width \${enlargeTransitionMs}ms ease, height \${enlargeTransitionMs}ms ease\`;\r
        const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;\r
        const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;\r
        requestAnimationFrame(() => {\r
          overlay.style.left = \`\${centeredLeft}px\`;\r
          overlay.style.top = \`\${centeredTop}px\`;\r
          overlay.style.width = tempWidth;\r
          overlay.style.height = tempHeight;\r
        });\r
        const cleanupSecond = () => {\r
          overlay.removeEventListener('transitionend', cleanupSecond);\r
          overlay.style.transition = prevTransition;\r
        };\r
        overlay.addEventListener('transitionend', cleanupSecond, {\r
          once: true\r
        });\r
      };\r
      overlay.addEventListener('transitionend', onFirstEnd);\r
    }\r
  };\r
\r
  useEffect(() => {\r
    return () => {\r
      document.body.classList.remove('dg-scroll-lock');\r
    };\r
  }, []);\r
\r
  const cssStyles = \`\r
    .sphere-root {\r
      --radius: 520px;\r
      --viewer-pad: 72px;\r
      --circ: calc(var(--radius) * 3.14);\r
      --rot-y: calc((360deg / var(--segments-x)) / 2);\r
      --rot-x: calc((360deg / var(--segments-y)) / 2);\r
      --item-width: calc(var(--circ) / var(--segments-x));\r
      --item-height: calc(var(--circ) / var(--segments-y));\r
    }\r
    \r
    .sphere-root * {\r
      box-sizing: border-box;\r
    }\r
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }\r
    \r
    .stage {\r
      width: 100%;\r
      height: 100%;\r
      display: grid;\r
      place-items: center;\r
      position: absolute;\r
      inset: 0;\r
      margin: auto;\r
      perspective: calc(var(--radius) * 2);\r
      perspective-origin: 50% 50%;\r
    }\r
    \r
    .sphere {\r
      transform: translateZ(calc(var(--radius) * -1));\r
      will-change: transform;\r
      position: absolute;\r
    }\r
    \r
    .sphere-item {\r
      width: calc(var(--item-width) * var(--item-size-x));\r
      height: calc(var(--item-height) * var(--item-size-y));\r
      position: absolute;\r
      top: -999px;\r
      bottom: -999px;\r
      left: -999px;\r
      right: -999px;\r
      margin: auto;\r
      transform-origin: 50% 50%;\r
      backface-visibility: hidden;\r
      transition: transform 300ms;\r
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) \r
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) \r
                 translateZ(var(--radius));\r
    }\r
    \r
    .sphere-root[data-enlarging="true"] .scrim {\r
      opacity: 1 !important;\r
      pointer-events: all !important;\r
    }\r
    \r
    @media (max-aspect-ratio: 1/1) {\r
      .viewer-frame {\r
        height: auto !important;\r
        width: 100% !important;\r
      }\r
    }\r
    \r
    // body.dg-scroll-lock {\r
    //   position: fixed !important;\r
    //   top: 0;\r
    //   left: 0;\r
    //   width: 100% !important;\r
    //   height: 100% !important;\r
    //   overflow: hidden !important;\r
    //   touch-action: none !important;\r
    //   overscroll-behavior: contain !important;\r
    // }\r
    .item__image {\r
      position: absolute;\r
      inset: 10px;\r
      border-radius: var(--tile-radius, 12px);\r
      overflow: hidden;\r
      cursor: pointer;\r
      backface-visibility: hidden;\r
      -webkit-backface-visibility: hidden;\r
      transition: transform 300ms;\r
      pointer-events: auto;\r
      -webkit-transform: translateZ(0);\r
      transform: translateZ(0);\r
    }\r
    .item__image--reference {\r
      position: absolute;\r
      inset: 10px;\r
      pointer-events: none;\r
    }\r
  \`;\r
\r
  return (\r
    <>\r
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />\r
      <div\r
        ref={rootRef}\r
        className="sphere-root relative w-full h-full"\r
        style={{\r
          ['--segments-x']: segments,\r
          ['--segments-y']: segments,\r
          ['--overlay-blur-color']: overlayBlurColor,\r
          ['--tile-radius']: imageBorderRadius,\r
          ['--enlarge-radius']: openedImageBorderRadius,\r
          ['--image-filter']: grayscale ? 'grayscale(1)' : 'none'\r
        }}\r
      >\r
        <main\r
          ref={mainRef}\r
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"\r
          style={{\r
            touchAction: 'none',\r
            WebkitUserSelect: 'none'\r
          }}\r
        >\r
          <div className="stage">\r
            <div ref={sphereRef} className="sphere">\r
              {items.map((it, i) => (\r
                <div\r
                  key={\`\${it.x},\${it.y},\${i}\`}\r
                  className="sphere-item absolute m-auto"\r
                  data-src={it.src}\r
                  data-alt={it.alt}\r
                  data-offset-x={it.x}\r
                  data-offset-y={it.y}\r
                  data-size-x={it.sizeX}\r
                  data-size-y={it.sizeY}\r
                  style={{\r
                    ['--offset-x']: it.x,\r
                    ['--offset-y']: it.y,\r
                    ['--item-size-x']: it.sizeX,\r
                    ['--item-size-y']: it.sizeY,\r
                    top: '-999px',\r
                    bottom: '-999px',\r
                    left: '-999px',\r
                    right: '-999px'\r
                  }}\r
                >\r
                  <div\r
                    className="item__image absolute block overflow-hidden cursor-pointer bg-gray-200 transition-transform duration-300"\r
                    role="button"\r
                    tabIndex={0}\r
                    aria-label={it.alt || 'Open image'}\r
                    onClick={e => {\r
                      if (draggingRef.current) return;\r
                      if (movedRef.current) return;\r
                      if (performance.now() - lastDragEndAt.current < 80) return;\r
                      if (openingRef.current) return;\r
                      openItemFromElement(e.currentTarget);\r
                    }}\r
                    onPointerUp={e => {\r
                      if (e.pointerType !== 'touch') return;\r
                      if (draggingRef.current) return;\r
                      if (movedRef.current) return;\r
                      if (performance.now() - lastDragEndAt.current < 80) return;\r
                      if (openingRef.current) return;\r
                      openItemFromElement(e.currentTarget);\r
                    }}\r
                    style={{\r
                      inset: '10px',\r
                      borderRadius: \`var(--tile-radius, \${imageBorderRadius})\`,\r
                      backfaceVisibility: 'hidden'\r
                    }}\r
                  >\r
                    <img\r
                      src={it.src}\r
                      draggable={false}\r
                      alt={it.alt}\r
                      className="w-full h-full object-cover pointer-events-none"\r
                      style={{\r
                        backfaceVisibility: 'hidden',\r
                        filter: \`var(--image-filter, \${grayscale ? 'grayscale(1)' : 'none'})\`\r
                      }}\r
                    />\r
                  </div>\r
                </div>\r
              ))}\r
            </div>\r
          </div>\r
\r
          <div\r
            className="absolute inset-0 m-auto z-[3] pointer-events-none"\r
            style={{\r
              backgroundImage: \`radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, \${overlayBlurColor}) 100%)\`\r
            }}\r
          />\r
\r
          <div\r
            className="absolute inset-0 m-auto z-[3] pointer-events-none"\r
            style={{\r
              WebkitMaskImage: \`radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, \${overlayBlurColor}) 90%)\`,\r
              maskImage: \`radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, \${overlayBlurColor}) 90%)\`,\r
              backdropFilter: 'blur(3px)'\r
            }}\r
          />\r
\r
          <div\r
            className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180"\r
            style={{\r
              background: \`linear-gradient(to bottom, transparent, var(--overlay-blur-color, \${overlayBlurColor}))\`\r
            }}\r
          />\r
          <div\r
            className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none"\r
            style={{\r
              background: \`linear-gradient(to bottom, transparent, var(--overlay-blur-color, \${overlayBlurColor}))\`\r
            }}\r
          />\r
\r
          <div\r
            ref={viewerRef}\r
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"\r
            style={{ padding: 'var(--viewer-pad)' }}\r
          >\r
            <div\r
              ref={scrimRef}\r
              className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500"\r
              style={{\r
                background: 'rgba(0, 0, 0, 0.4)',\r
                backdropFilter: 'blur(3px)'\r
              }}\r
            />\r
            <div\r
              ref={frameRef}\r
              className="viewer-frame h-full aspect-square flex"\r
              style={{ borderRadius: \`var(--enlarge-radius, \${openedImageBorderRadius})\` }}\r
            />\r
          </div>\r
        </main>\r
      </div>\r
    </>\r
  );\r
}\r
`,qt=`import { useEffect, useMemo, useRef, useCallback } from 'react';\r
import { useGesture } from '@use-gesture/react';\r
import './DomeGallery.css';\r
\r
type ImageItem = string | { src: string; alt?: string };\r
\r
type DomeGalleryProps = {\r
  images?: ImageItem[];\r
  fit?: number;\r
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';\r
  minRadius?: number;\r
  maxRadius?: number;\r
  padFactor?: number;\r
  overlayBlurColor?: string;\r
  maxVerticalRotationDeg?: number;\r
  dragSensitivity?: number;\r
  enlargeTransitionMs?: number;\r
  segments?: number;\r
  dragDampening?: number;\r
  openedImageWidth?: string;\r
  openedImageHeight?: string;\r
  imageBorderRadius?: string;\r
  openedImageBorderRadius?: string;\r
  grayscale?: boolean;\r
};\r
\r
type ItemDef = {\r
  src: string;\r
  alt: string;\r
  x: number;\r
  y: number;\r
  sizeX: number;\r
  sizeY: number;\r
};\r
\r
const DEFAULT_IMAGES: ImageItem[] = [\r
  {\r
    src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Abstract art'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Modern sculpture'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Digital artwork'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Contemporary art'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Geometric pattern'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Textured surface'\r
  },\r
  {\r
    src: 'https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large',\r
    alt: 'Social media image'\r
  }\r
];\r
\r
const DEFAULTS = {\r
  maxVerticalRotationDeg: 5,\r
  dragSensitivity: 20,\r
  enlargeTransitionMs: 300,\r
  segments: 35\r
};\r
\r
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);\r
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;\r
const wrapAngleSigned = (deg: number) => {\r
  const a = (((deg + 180) % 360) + 360) % 360;\r
  return a - 180;\r
};\r
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {\r
  const attr = el.dataset[name] ?? el.getAttribute(\`data-\${name}\`);\r
  const n = attr == null ? NaN : parseFloat(attr);\r
  return Number.isFinite(n) ? n : fallback;\r
};\r
\r
function buildItems(pool: ImageItem[], seg: number): ItemDef[] {\r
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);\r
  const evenYs = [-4, -2, 0, 2, 4];\r
  const oddYs = [-3, -1, 1, 3, 5];\r
\r
  const coords = xCols.flatMap((x, c) => {\r
    const ys = c % 2 === 0 ? evenYs : oddYs;\r
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));\r
  });\r
\r
  const totalSlots = coords.length;\r
  if (pool.length === 0) {\r
    return coords.map(c => ({ ...c, src: '', alt: '' }));\r
  }\r
  if (pool.length > totalSlots) {\r
    console.warn(\r
      \`[DomeGallery] Provided image count (\${pool.length}) exceeds available tiles (\${totalSlots}). Some images will not be shown.\`\r
    );\r
  }\r
\r
  const normalizedImages = pool.map(image => {\r
    if (typeof image === 'string') {\r
      return { src: image, alt: '' };\r
    }\r
    return { src: image.src || '', alt: image.alt || '' };\r
  });\r
\r
  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);\r
\r
  for (let i = 1; i < usedImages.length; i++) {\r
    if (usedImages[i].src === usedImages[i - 1].src) {\r
      for (let j = i + 1; j < usedImages.length; j++) {\r
        if (usedImages[j].src !== usedImages[i].src) {\r
          const tmp = usedImages[i];\r
          usedImages[i] = usedImages[j];\r
          usedImages[j] = tmp;\r
          break;\r
        }\r
      }\r
    }\r
  }\r
\r
  return coords.map((c, i) => ({\r
    ...c,\r
    src: usedImages[i].src,\r
    alt: usedImages[i].alt\r
  }));\r
}\r
\r
function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {\r
  const unit = 360 / segments / 2;\r
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);\r
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);\r
  return { rotateX, rotateY };\r
}\r
\r
export default function DomeGallery({\r
  images = DEFAULT_IMAGES,\r
  fit = 0.5,\r
  fitBasis = 'auto',\r
  minRadius = 600,\r
  maxRadius = Infinity,\r
  padFactor = 0.25,\r
  overlayBlurColor = '#060010',\r
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,\r
  dragSensitivity = DEFAULTS.dragSensitivity,\r
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,\r
  segments = DEFAULTS.segments,\r
  dragDampening = 2,\r
  openedImageWidth = '400px',\r
  openedImageHeight = '400px',\r
  imageBorderRadius = '30px',\r
  openedImageBorderRadius = '30px',\r
  grayscale = true\r
}: DomeGalleryProps) {\r
  const rootRef = useRef<HTMLDivElement>(null);\r
  const mainRef = useRef<HTMLDivElement>(null);\r
  const sphereRef = useRef<HTMLDivElement>(null);\r
  const frameRef = useRef<HTMLDivElement>(null);\r
  const viewerRef = useRef<HTMLDivElement>(null);\r
  const scrimRef = useRef<HTMLDivElement>(null);\r
  const focusedElRef = useRef<HTMLElement | null>(null);\r
  const originalTilePositionRef = useRef<{\r
    left: number;\r
    top: number;\r
    width: number;\r
    height: number;\r
  } | null>(null);\r
\r
  const rotationRef = useRef({ x: 0, y: 0 });\r
  const startRotRef = useRef({ x: 0, y: 0 });\r
  const startPosRef = useRef<{ x: number; y: number } | null>(null);\r
  const draggingRef = useRef(false);\r
  const movedRef = useRef(false);\r
  const inertiaRAF = useRef<number | null>(null);\r
\r
  const openingRef = useRef(false);\r
  const openStartedAtRef = useRef(0);\r
  const lastDragEndAt = useRef(0);\r
\r
  const scrollLockedRef = useRef(false);\r
  const lockScroll = useCallback(() => {\r
    if (scrollLockedRef.current) return;\r
    scrollLockedRef.current = true;\r
    document.body.classList.add('dg-scroll-lock');\r
  }, []);\r
  const unlockScroll = useCallback(() => {\r
    if (!scrollLockedRef.current) return;\r
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;\r
    scrollLockedRef.current = false;\r
    document.body.classList.remove('dg-scroll-lock');\r
  }, []);\r
\r
  const items = useMemo(() => buildItems(images, segments), [images, segments]);\r
\r
  const applyTransform = (xDeg: number, yDeg: number) => {\r
    const el = sphereRef.current;\r
    if (el) {\r
      el.style.transform = \`translateZ(calc(var(--radius) * -1)) rotateX(\${xDeg}deg) rotateY(\${yDeg}deg)\`;\r
    }\r
  };\r
\r
  const lockedRadiusRef = useRef<number | null>(null);\r
\r
  useEffect(() => {\r
    const root = rootRef.current;\r
    if (!root) return;\r
    const ro = new ResizeObserver(entries => {\r
      const cr = entries[0].contentRect;\r
      const w = Math.max(1, cr.width),\r
        h = Math.max(1, cr.height);\r
      const minDim = Math.min(w, h),\r
        maxDim = Math.max(w, h),\r
        aspect = w / h;\r
      let basis: number;\r
      switch (fitBasis) {\r
        case 'min':\r
          basis = minDim;\r
          break;\r
        case 'max':\r
          basis = maxDim;\r
          break;\r
        case 'width':\r
          basis = w;\r
          break;\r
        case 'height':\r
          basis = h;\r
          break;\r
        default:\r
          basis = aspect >= 1.3 ? w : minDim;\r
      }\r
      let radius = basis * fit;\r
      const heightGuard = h * 1.35;\r
      radius = Math.min(radius, heightGuard);\r
      radius = clamp(radius, minRadius, maxRadius);\r
      lockedRadiusRef.current = Math.round(radius);\r
\r
      const viewerPad = Math.max(8, Math.round(minDim * padFactor));\r
      root.style.setProperty('--radius', \`\${lockedRadiusRef.current}px\`);\r
      root.style.setProperty('--viewer-pad', \`\${viewerPad}px\`);\r
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);\r
      root.style.setProperty('--tile-radius', imageBorderRadius);\r
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);\r
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');\r
      applyTransform(rotationRef.current.x, rotationRef.current.y);\r
\r
      const enlargedOverlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement;\r
      if (enlargedOverlay && frameRef.current && mainRef.current) {\r
        const frameR = frameRef.current.getBoundingClientRect();\r
        const mainR = mainRef.current.getBoundingClientRect();\r
\r
        const hasCustomSize = openedImageWidth && openedImageHeight;\r
        if (hasCustomSize) {\r
          const tempDiv = document.createElement('div');\r
          tempDiv.style.cssText = \`position: absolute; width: \${openedImageWidth}; height: \${openedImageHeight}; visibility: hidden;\`;\r
          document.body.appendChild(tempDiv);\r
          const tempRect = tempDiv.getBoundingClientRect();\r
          document.body.removeChild(tempDiv);\r
\r
          const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;\r
          const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;\r
\r
          enlargedOverlay.style.left = \`\${centeredLeft}px\`;\r
          enlargedOverlay.style.top = \`\${centeredTop}px\`;\r
        } else {\r
          enlargedOverlay.style.left = \`\${frameR.left - mainR.left}px\`;\r
          enlargedOverlay.style.top = \`\${frameR.top - mainR.top}px\`;\r
          enlargedOverlay.style.width = \`\${frameR.width}px\`;\r
          enlargedOverlay.style.height = \`\${frameR.height}px\`;\r
        }\r
      }\r
    });\r
    ro.observe(root);\r
    return () => ro.disconnect();\r
  }, [\r
    fit,\r
    fitBasis,\r
    minRadius,\r
    maxRadius,\r
    padFactor,\r
    overlayBlurColor,\r
    grayscale,\r
    imageBorderRadius,\r
    openedImageBorderRadius,\r
    openedImageWidth,\r
    openedImageHeight\r
  ]);\r
\r
  useEffect(() => {\r
    applyTransform(rotationRef.current.x, rotationRef.current.y);\r
  }, []);\r
\r
  const stopInertia = useCallback(() => {\r
    if (inertiaRAF.current) {\r
      cancelAnimationFrame(inertiaRAF.current);\r
      inertiaRAF.current = null;\r
    }\r
  }, []);\r
\r
  const startInertia = useCallback(\r
    (vx: number, vy: number) => {\r
      const MAX_V = 1.4;\r
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;\r
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;\r
\r
      let frames = 0;\r
      const d = clamp(dragDampening ?? 0.6, 0, 1);\r
      const frictionMul = 0.94 + 0.055 * d;\r
      const stopThreshold = 0.015 - 0.01 * d;\r
      const maxFrames = Math.round(90 + 270 * d);\r
\r
      const step = () => {\r
        vX *= frictionMul;\r
        vY *= frictionMul;\r
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {\r
          inertiaRAF.current = null;\r
          return;\r
        }\r
        if (++frames > maxFrames) {\r
          inertiaRAF.current = null;\r
          return;\r
        }\r
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);\r
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);\r
        rotationRef.current = { x: nextX, y: nextY };\r
        applyTransform(nextX, nextY);\r
        inertiaRAF.current = requestAnimationFrame(step);\r
      };\r
      stopInertia();\r
      inertiaRAF.current = requestAnimationFrame(step);\r
    },\r
    [dragDampening, maxVerticalRotationDeg, stopInertia]\r
  );\r
\r
  useGesture(\r
    {\r
      onDragStart: ({ event }) => {\r
        if (focusedElRef.current) return;\r
        stopInertia();\r
        const evt = event as PointerEvent;\r
        draggingRef.current = true;\r
        movedRef.current = false;\r
        startRotRef.current = { ...rotationRef.current };\r
        startPosRef.current = { x: evt.clientX, y: evt.clientY };\r
      },\r
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {\r
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;\r
\r
        const evt = event as PointerEvent;\r
        const dxTotal = evt.clientX - startPosRef.current.x;\r
        const dyTotal = evt.clientY - startPosRef.current.y;\r
\r
        if (!movedRef.current) {\r
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;\r
          if (dist2 > 16) movedRef.current = true;\r
        }\r
\r
        const nextX = clamp(\r
          startRotRef.current.x - dyTotal / dragSensitivity,\r
          -maxVerticalRotationDeg,\r
          maxVerticalRotationDeg\r
        );\r
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);\r
\r
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {\r
          rotationRef.current = { x: nextX, y: nextY };\r
          applyTransform(nextX, nextY);\r
        }\r
\r
        if (last) {\r
          draggingRef.current = false;\r
\r
          let [vMagX, vMagY] = velocity;\r
          const [dirX, dirY] = direction;\r
          let vx = vMagX * dirX;\r
          let vy = vMagY * dirY;\r
\r
          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {\r
            const [mx, my] = movement;\r
            vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);\r
            vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);\r
          }\r
\r
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) {\r
            startInertia(vx, vy);\r
          }\r
\r
          if (movedRef.current) lastDragEndAt.current = performance.now();\r
\r
          movedRef.current = false;\r
        }\r
      }\r
    },\r
    { target: mainRef, eventOptions: { passive: true } }\r
  );\r
\r
  const openItemFromElement = (el: HTMLElement) => {\r
    if (openingRef.current) return;\r
    openingRef.current = true;\r
    openStartedAtRef.current = performance.now();\r
    lockScroll();\r
\r
    const parent = el.parentElement as HTMLElement;\r
    focusedElRef.current = el;\r
    el.setAttribute('data-focused', 'true');\r
\r
    const offsetX = getDataNumber(parent, 'offsetX', 0);\r
    const offsetY = getDataNumber(parent, 'offsetY', 0);\r
    const sizeX = getDataNumber(parent, 'sizeX', 2);\r
    const sizeY = getDataNumber(parent, 'sizeY', 2);\r
\r
    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);\r
    const parentY = normalizeAngle(parentRot.rotateY);\r
    const globalY = normalizeAngle(rotationRef.current.y);\r
    let rotY = -(parentY + globalY) % 360;\r
    if (rotY < -180) rotY += 360;\r
    const rotX = -parentRot.rotateX - rotationRef.current.x;\r
    parent.style.setProperty('--rot-y-delta', \`\${rotY}deg\`);\r
    parent.style.setProperty('--rot-x-delta', \`\${rotX}deg\`);\r
\r
    const refDiv = document.createElement('div');\r
    refDiv.className = 'item__image item__image--reference';\r
    refDiv.style.opacity = '0';\r
    refDiv.style.transform = \`rotateX(\${-parentRot.rotateX}deg) rotateY(\${-parentRot.rotateY}deg)\`;\r
    parent.appendChild(refDiv);\r
\r
    void refDiv.offsetHeight;\r
\r
    const tileR = refDiv.getBoundingClientRect();\r
    const mainR = mainRef.current?.getBoundingClientRect();\r
    const frameR = frameRef.current?.getBoundingClientRect();\r
\r
    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {\r
      openingRef.current = false;\r
      focusedElRef.current = null;\r
      parent.removeChild(refDiv);\r
      unlockScroll();\r
      return;\r
    }\r
\r
    originalTilePositionRef.current = {\r
      left: tileR.left,\r
      top: tileR.top,\r
      width: tileR.width,\r
      height: tileR.height\r
    };\r
\r
    el.style.visibility = 'hidden';\r
    (el.style as any).zIndex = 0;\r
\r
    const overlay = document.createElement('div');\r
    overlay.className = 'enlarge';\r
    overlay.style.position = 'absolute';\r
    overlay.style.left = frameR.left - mainR.left + 'px';\r
    overlay.style.top = frameR.top - mainR.top + 'px';\r
    overlay.style.width = frameR.width + 'px';\r
    overlay.style.height = frameR.height + 'px';\r
    overlay.style.opacity = '0';\r
    overlay.style.zIndex = '30';\r
    overlay.style.willChange = 'transform, opacity';\r
    overlay.style.transformOrigin = 'top left';\r
    overlay.style.transition = \`transform \${enlargeTransitionMs}ms ease, opacity \${enlargeTransitionMs}ms ease\`;\r
\r
    const rawSrc = parent.dataset.src || (el.querySelector('img') as HTMLImageElement)?.src || '';\r
    const img = document.createElement('img');\r
    img.src = rawSrc;\r
    overlay.appendChild(img);\r
    viewerRef.current!.appendChild(overlay);\r
\r
    const tx0 = tileR.left - frameR.left;\r
    const ty0 = tileR.top - frameR.top;\r
    const sx0 = tileR.width / frameR.width;\r
    const sy0 = tileR.height / frameR.height;\r
\r
    const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;\r
    const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;\r
\r
    overlay.style.transform = \`translate(\${tx0}px, \${ty0}px) scale(\${validSx0}, \${validSy0})\`;\r
\r
    setTimeout(() => {\r
      if (!overlay.parentElement) return;\r
      overlay.style.opacity = '1';\r
      overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';\r
      rootRef.current?.setAttribute('data-enlarging', 'true');\r
    }, 16);\r
\r
    const wantsResize = openedImageWidth || openedImageHeight;\r
    if (wantsResize) {\r
      const onFirstEnd = (ev: TransitionEvent) => {\r
        if (ev.propertyName !== 'transform') return;\r
        overlay.removeEventListener('transitionend', onFirstEnd);\r
        const prevTransition = overlay.style.transition;\r
        overlay.style.transition = 'none';\r
        const tempWidth = openedImageWidth || \`\${frameR.width}px\`;\r
        const tempHeight = openedImageHeight || \`\${frameR.height}px\`;\r
        overlay.style.width = tempWidth;\r
        overlay.style.height = tempHeight;\r
        const newRect = overlay.getBoundingClientRect();\r
        overlay.style.width = frameR.width + 'px';\r
        overlay.style.height = frameR.height + 'px';\r
        void overlay.offsetWidth;\r
        overlay.style.transition = \`left \${enlargeTransitionMs}ms ease, top \${enlargeTransitionMs}ms ease, width \${enlargeTransitionMs}ms ease, height \${enlargeTransitionMs}ms ease\`;\r
        const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;\r
        const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;\r
        requestAnimationFrame(() => {\r
          overlay.style.left = \`\${centeredLeft}px\`;\r
          overlay.style.top = \`\${centeredTop}px\`;\r
          overlay.style.width = tempWidth;\r
          overlay.style.height = tempHeight;\r
        });\r
        const cleanupSecond = () => {\r
          overlay.removeEventListener('transitionend', cleanupSecond);\r
          overlay.style.transition = prevTransition;\r
        };\r
        overlay.addEventListener('transitionend', cleanupSecond, {\r
          once: true\r
        });\r
      };\r
      overlay.addEventListener('transitionend', onFirstEnd);\r
    }\r
  };\r
\r
  const onTileClick = useCallback(\r
    (e: React.MouseEvent<HTMLDivElement>) => {\r
      if (draggingRef.current) return;\r
      if (movedRef.current) return;\r
      if (performance.now() - lastDragEndAt.current < 80) return;\r
      if (openingRef.current) return;\r
      openItemFromElement(e.currentTarget);\r
    },\r
    [openItemFromElement]\r
  );\r
\r
  const onTilePointerUp = useCallback(\r
    (e: React.PointerEvent<HTMLDivElement>) => {\r
      if (e.pointerType !== 'touch') return;\r
      if (draggingRef.current) return;\r
      if (movedRef.current) return;\r
      if (performance.now() - lastDragEndAt.current < 80) return;\r
      if (openingRef.current) return;\r
      openItemFromElement(e.currentTarget);\r
    },\r
    [openItemFromElement]\r
  );\r
\r
  useEffect(() => {\r
    const scrim = scrimRef.current;\r
    if (!scrim) return;\r
\r
    const close = () => {\r
      if (performance.now() - openStartedAtRef.current < 250) return;\r
\r
      const el = focusedElRef.current;\r
      if (!el) return;\r
      const parent = el.parentElement as HTMLElement;\r
      const overlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement | null;\r
      if (!overlay) return;\r
\r
      const refDiv = parent.querySelector('.item__image--reference') as HTMLElement | null;\r
\r
      const originalPos = originalTilePositionRef.current;\r
      if (!originalPos) {\r
        overlay.remove();\r
        if (refDiv) refDiv.remove();\r
        parent.style.setProperty('--rot-y-delta', \`0deg\`);\r
        parent.style.setProperty('--rot-x-delta', \`0deg\`);\r
        el.style.visibility = '';\r
        (el.style as any).zIndex = 0;\r
        focusedElRef.current = null;\r
        rootRef.current?.removeAttribute('data-enlarging');\r
        openingRef.current = false;\r
        unlockScroll();\r
        return;\r
      }\r
\r
      const currentRect = overlay.getBoundingClientRect();\r
      const rootRect = rootRef.current!.getBoundingClientRect();\r
\r
      const originalPosRelativeToRoot = {\r
        left: originalPos.left - rootRect.left,\r
        top: originalPos.top - rootRect.top,\r
        width: originalPos.width,\r
        height: originalPos.height\r
      };\r
\r
      const overlayRelativeToRoot = {\r
        left: currentRect.left - rootRect.left,\r
        top: currentRect.top - rootRect.top,\r
        width: currentRect.width,\r
        height: currentRect.height\r
      };\r
\r
      const animatingOverlay = document.createElement('div');\r
      animatingOverlay.className = 'enlarge-closing';\r
      animatingOverlay.style.cssText = \`\r
        position: absolute;\r
        left: \${overlayRelativeToRoot.left}px;\r
        top: \${overlayRelativeToRoot.top}px;\r
        width: \${overlayRelativeToRoot.width}px;\r
        height: \${overlayRelativeToRoot.height}px;\r
        z-index: 9999;\r
        border-radius: var(--enlarge-radius, 32px);\r
        overflow: hidden;\r
        box-shadow: 0 10px 30px rgba(0,0,0,.35);\r
        transition: all \${enlargeTransitionMs}ms ease-out;\r
        pointer-events: none;\r
        margin: 0;\r
        transform: none;\r
      \`;\r
\r
      const originalImg = overlay.querySelector('img');\r
      if (originalImg) {\r
        const img = originalImg.cloneNode() as HTMLImageElement;\r
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';\r
        animatingOverlay.appendChild(img);\r
      }\r
\r
      overlay.remove();\r
      rootRef.current!.appendChild(animatingOverlay);\r
\r
      void animatingOverlay.getBoundingClientRect();\r
\r
      requestAnimationFrame(() => {\r
        animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';\r
        animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';\r
        animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';\r
        animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';\r
        animatingOverlay.style.opacity = '0';\r
      });\r
\r
      const cleanup = () => {\r
        animatingOverlay.remove();\r
        originalTilePositionRef.current = null;\r
\r
        if (refDiv) refDiv.remove();\r
        parent.style.transition = 'none';\r
        el.style.transition = 'none';\r
\r
        parent.style.setProperty('--rot-y-delta', \`0deg\`);\r
        parent.style.setProperty('--rot-x-delta', \`0deg\`);\r
\r
        requestAnimationFrame(() => {\r
          el.style.visibility = '';\r
          el.style.opacity = '0';\r
          (el.style as any).zIndex = 0;\r
          focusedElRef.current = null;\r
          rootRef.current?.removeAttribute('data-enlarging');\r
\r
          requestAnimationFrame(() => {\r
            parent.style.transition = '';\r
            el.style.transition = 'opacity 300ms ease-out';\r
\r
            requestAnimationFrame(() => {\r
              el.style.opacity = '1';\r
              setTimeout(() => {\r
                el.style.transition = '';\r
                el.style.opacity = '';\r
                openingRef.current = false;\r
                if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true') {\r
                  document.body.classList.remove('dg-scroll-lock');\r
                }\r
              }, 300);\r
            });\r
          });\r
        });\r
      };\r
\r
      animatingOverlay.addEventListener('transitionend', cleanup, {\r
        once: true\r
      });\r
    };\r
\r
    scrim.addEventListener('click', close);\r
    const onKey = (e: KeyboardEvent) => {\r
      if (e.key === 'Escape') close();\r
    };\r
    window.addEventListener('keydown', onKey);\r
\r
    return () => {\r
      scrim.removeEventListener('click', close);\r
      window.removeEventListener('keydown', onKey);\r
    };\r
  }, [enlargeTransitionMs, unlockScroll]);\r
\r
  useEffect(() => {\r
    return () => {\r
      document.body.classList.remove('dg-scroll-lock');\r
    };\r
  }, []);\r
\r
  return (\r
    <div\r
      ref={rootRef}\r
      className="sphere-root"\r
      style={\r
        {\r
          ['--segments-x' as any]: segments,\r
          ['--segments-y' as any]: segments,\r
          ['--overlay-blur-color' as any]: overlayBlurColor,\r
          ['--tile-radius' as any]: imageBorderRadius,\r
          ['--enlarge-radius' as any]: openedImageBorderRadius,\r
          ['--image-filter' as any]: grayscale ? 'grayscale(1)' : 'none'\r
        } as React.CSSProperties\r
      }\r
    >\r
      <main ref={mainRef} className="sphere-main">\r
        <div className="stage">\r
          <div ref={sphereRef} className="sphere">\r
            {items.map((it, i) => (\r
              <div\r
                key={\`\${it.x},\${it.y},\${i}\`}\r
                className="item"\r
                data-src={it.src}\r
                data-offset-x={it.x}\r
                data-offset-y={it.y}\r
                data-size-x={it.sizeX}\r
                data-size-y={it.sizeY}\r
                style={\r
                  {\r
                    ['--offset-x' as any]: it.x,\r
                    ['--offset-y' as any]: it.y,\r
                    ['--item-size-x' as any]: it.sizeX,\r
                    ['--item-size-y' as any]: it.sizeY\r
                  } as React.CSSProperties\r
                }\r
              >\r
                <div\r
                  className="item__image"\r
                  role="button"\r
                  tabIndex={0}\r
                  aria-label={it.alt || 'Open image'}\r
                  onClick={onTileClick}\r
                  onPointerUp={onTilePointerUp}\r
                >\r
                  <img src={it.src} draggable={false} alt={it.alt} />\r
                </div>\r
              </div>\r
            ))}\r
          </div>\r
        </div>\r
\r
        <div className="overlay" />\r
        <div className="overlay overlay--blur" />\r
        <div className="edge-fade edge-fade--top" />\r
        <div className="edge-fade edge-fade--bottom" />\r
\r
        <div className="viewer" ref={viewerRef}>\r
          <div ref={scrimRef} className="scrim" />\r
          <div ref={frameRef} className="frame" />\r
        </div>\r
      </main>\r
    </div>\r
  );\r
}\r
`,Wt=`import { useEffect, useMemo, useRef, useCallback } from 'react';\r
import { useGesture } from '@use-gesture/react';\r
\r
type ImageItem = string | { src: string; alt?: string };\r
\r
type DomeGalleryProps = {\r
  images?: ImageItem[];\r
  fit?: number;\r
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';\r
  minRadius?: number;\r
  maxRadius?: number;\r
  padFactor?: number;\r
  overlayBlurColor?: string;\r
  maxVerticalRotationDeg?: number;\r
  dragSensitivity?: number;\r
  enlargeTransitionMs?: number;\r
  segments?: number;\r
  dragDampening?: number;\r
  openedImageWidth?: string;\r
  openedImageHeight?: string;\r
  imageBorderRadius?: string;\r
  openedImageBorderRadius?: string;\r
  grayscale?: boolean;\r
};\r
\r
type ItemDef = {\r
  src: string;\r
  alt: string;\r
  x: number;\r
  y: number;\r
  sizeX: number;\r
  sizeY: number;\r
};\r
\r
const DEFAULT_IMAGES: ImageItem[] = [\r
  {\r
    src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Abstract art'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Modern sculpture'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Digital artwork'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Contemporary art'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Geometric pattern'\r
  },\r
  {\r
    src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',\r
    alt: 'Textured surface'\r
  },\r
  {\r
    src: 'https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large',\r
    alt: 'Social media image'\r
  }\r
];\r
\r
const DEFAULTS = {\r
  maxVerticalRotationDeg: 5,\r
  dragSensitivity: 20,\r
  enlargeTransitionMs: 300,\r
  segments: 35\r
};\r
\r
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);\r
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;\r
const wrapAngleSigned = (deg: number) => {\r
  const a = (((deg + 180) % 360) + 360) % 360;\r
  return a - 180;\r
};\r
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {\r
  const attr = el.dataset[name] ?? el.getAttribute(\`data-\${name}\`);\r
  const n = attr == null ? NaN : parseFloat(attr);\r
  return Number.isFinite(n) ? n : fallback;\r
};\r
\r
function buildItems(pool: ImageItem[], seg: number): ItemDef[] {\r
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);\r
  const evenYs = [-4, -2, 0, 2, 4];\r
  const oddYs = [-3, -1, 1, 3, 5];\r
\r
  const coords = xCols.flatMap((x, c) => {\r
    const ys = c % 2 === 0 ? evenYs : oddYs;\r
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));\r
  });\r
\r
  const totalSlots = coords.length;\r
  if (pool.length === 0) {\r
    return coords.map(c => ({ ...c, src: '', alt: '' }));\r
  }\r
  if (pool.length > totalSlots) {\r
    console.warn(\r
      \`[DomeGallery] Provided image count (\${pool.length}) exceeds available tiles (\${totalSlots}). Some images will not be shown.\`\r
    );\r
  }\r
\r
  const normalizedImages = pool.map(image => {\r
    if (typeof image === 'string') {\r
      return { src: image, alt: '' };\r
    }\r
    return { src: image.src || '', alt: image.alt || '' };\r
  });\r
\r
  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);\r
\r
  for (let i = 1; i < usedImages.length; i++) {\r
    if (usedImages[i].src === usedImages[i - 1].src) {\r
      for (let j = i + 1; j < usedImages.length; j++) {\r
        if (usedImages[j].src !== usedImages[i].src) {\r
          const tmp = usedImages[i];\r
          usedImages[i] = usedImages[j];\r
          usedImages[j] = tmp;\r
          break;\r
        }\r
      }\r
    }\r
  }\r
\r
  return coords.map((c, i) => ({\r
    ...c,\r
    src: usedImages[i].src,\r
    alt: usedImages[i].alt\r
  }));\r
}\r
\r
function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {\r
  const unit = 360 / segments / 2;\r
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);\r
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);\r
  return { rotateX, rotateY };\r
}\r
\r
export default function DomeGallery({\r
  images = DEFAULT_IMAGES,\r
  fit = 0.5,\r
  fitBasis = 'auto',\r
  minRadius = 600,\r
  maxRadius = Infinity,\r
  padFactor = 0.25,\r
  overlayBlurColor = '#060010',\r
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,\r
  dragSensitivity = DEFAULTS.dragSensitivity,\r
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,\r
  segments = DEFAULTS.segments,\r
  dragDampening = 2,\r
  openedImageWidth = '400px',\r
  openedImageHeight = '400px',\r
  imageBorderRadius = '30px',\r
  openedImageBorderRadius = '30px',\r
  grayscale = true\r
}: DomeGalleryProps) {\r
  const rootRef = useRef<HTMLDivElement>(null);\r
  const mainRef = useRef<HTMLDivElement>(null);\r
  const sphereRef = useRef<HTMLDivElement>(null);\r
  const frameRef = useRef<HTMLDivElement>(null);\r
  const viewerRef = useRef<HTMLDivElement>(null);\r
  const scrimRef = useRef<HTMLDivElement>(null);\r
  const focusedElRef = useRef<HTMLElement | null>(null);\r
  const originalTilePositionRef = useRef<{\r
    left: number;\r
    top: number;\r
    width: number;\r
    height: number;\r
  } | null>(null);\r
\r
  const rotationRef = useRef({ x: 0, y: 0 });\r
  const startRotRef = useRef({ x: 0, y: 0 });\r
  const startPosRef = useRef<{ x: number; y: number } | null>(null);\r
  const draggingRef = useRef(false);\r
  const cancelTapRef = useRef(false);\r
  const movedRef = useRef(false);\r
  const inertiaRAF = useRef<number | null>(null);\r
  const pointerTypeRef = useRef<'mouse' | 'pen' | 'touch'>('mouse');\r
  const tapTargetRef = useRef<HTMLElement | null>(null);\r
  const openingRef = useRef(false);\r
  const openStartedAtRef = useRef(0);\r
  const lastDragEndAt = useRef(0);\r
\r
  const scrollLockedRef = useRef(false);\r
  const lockScroll = useCallback(() => {\r
    if (scrollLockedRef.current) return;\r
    scrollLockedRef.current = true;\r
    document.body.classList.add('dg-scroll-lock');\r
  }, []);\r
  const unlockScroll = useCallback(() => {\r
    if (!scrollLockedRef.current) return;\r
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;\r
    scrollLockedRef.current = false;\r
    document.body.classList.remove('dg-scroll-lock');\r
  }, []);\r
\r
  const items = useMemo(() => buildItems(images, segments), [images, segments]);\r
\r
  const applyTransform = (xDeg: number, yDeg: number) => {\r
    const el = sphereRef.current;\r
    if (el) {\r
      el.style.transform = \`translateZ(calc(var(--radius) * -1)) rotateX(\${xDeg}deg) rotateY(\${yDeg}deg)\`;\r
    }\r
  };\r
\r
  const lockedRadiusRef = useRef<number | null>(null);\r
\r
  useEffect(() => {\r
    const root = rootRef.current;\r
    if (!root) return;\r
    const ro = new ResizeObserver(entries => {\r
      const cr = entries[0].contentRect;\r
      const w = Math.max(1, cr.width),\r
        h = Math.max(1, cr.height);\r
      const minDim = Math.min(w, h),\r
        maxDim = Math.max(w, h),\r
        aspect = w / h;\r
      let basis: number;\r
      switch (fitBasis) {\r
        case 'min':\r
          basis = minDim;\r
          break;\r
        case 'max':\r
          basis = maxDim;\r
          break;\r
        case 'width':\r
          basis = w;\r
          break;\r
        case 'height':\r
          basis = h;\r
          break;\r
        default:\r
          basis = aspect >= 1.3 ? w : minDim;\r
      }\r
      let radius = basis * fit;\r
      const heightGuard = h * 1.35;\r
      radius = Math.min(radius, heightGuard);\r
      radius = clamp(radius, minRadius, maxRadius);\r
      lockedRadiusRef.current = Math.round(radius);\r
\r
      const viewerPad = Math.max(8, Math.round(minDim * padFactor));\r
      root.style.setProperty('--radius', \`\${lockedRadiusRef.current}px\`);\r
      root.style.setProperty('--viewer-pad', \`\${viewerPad}px\`);\r
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);\r
      root.style.setProperty('--tile-radius', imageBorderRadius);\r
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);\r
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');\r
      applyTransform(rotationRef.current.x, rotationRef.current.y);\r
\r
      const enlargedOverlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement;\r
      if (enlargedOverlay && frameRef.current && mainRef.current) {\r
        const frameR = frameRef.current.getBoundingClientRect();\r
        const mainR = mainRef.current.getBoundingClientRect();\r
\r
        const hasCustomSize = openedImageWidth && openedImageHeight;\r
        if (hasCustomSize) {\r
          const tempDiv = document.createElement('div');\r
          tempDiv.style.cssText = \`position: absolute; width: \${openedImageWidth}; height: \${openedImageHeight}; visibility: hidden;\`;\r
          document.body.appendChild(tempDiv);\r
          const tempRect = tempDiv.getBoundingClientRect();\r
          document.body.removeChild(tempDiv);\r
\r
          const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;\r
          const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;\r
\r
          enlargedOverlay.style.left = \`\${centeredLeft}px\`;\r
          enlargedOverlay.style.top = \`\${centeredTop}px\`;\r
        } else {\r
          enlargedOverlay.style.left = \`\${frameR.left - mainR.left}px\`;\r
          enlargedOverlay.style.top = \`\${frameR.top - mainR.top}px\`;\r
          enlargedOverlay.style.width = \`\${frameR.width}px\`;\r
          enlargedOverlay.style.height = \`\${frameR.height}px\`;\r
        }\r
      }\r
    });\r
    ro.observe(root);\r
    return () => ro.disconnect();\r
  }, [\r
    fit,\r
    fitBasis,\r
    minRadius,\r
    maxRadius,\r
    padFactor,\r
    overlayBlurColor,\r
    grayscale,\r
    imageBorderRadius,\r
    openedImageBorderRadius,\r
    openedImageWidth,\r
    openedImageHeight\r
  ]);\r
\r
  useEffect(() => {\r
    applyTransform(rotationRef.current.x, rotationRef.current.y);\r
  }, []);\r
\r
  const stopInertia = useCallback(() => {\r
    if (inertiaRAF.current) {\r
      cancelAnimationFrame(inertiaRAF.current);\r
      inertiaRAF.current = null;\r
    }\r
  }, []);\r
\r
  const startInertia = useCallback(\r
    (vx: number, vy: number) => {\r
      const MAX_V = 1.4;\r
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;\r
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;\r
      let frames = 0;\r
      const d = clamp(dragDampening ?? 0.6, 0, 1);\r
      const frictionMul = 0.94 + 0.055 * d;\r
      const stopThreshold = 0.015 - 0.01 * d;\r
      const maxFrames = Math.round(90 + 270 * d);\r
      const step = () => {\r
        vX *= frictionMul;\r
        vY *= frictionMul;\r
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {\r
          inertiaRAF.current = null;\r
          return;\r
        }\r
        if (++frames > maxFrames) {\r
          inertiaRAF.current = null;\r
          return;\r
        }\r
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);\r
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);\r
        rotationRef.current = { x: nextX, y: nextY };\r
        applyTransform(nextX, nextY);\r
        inertiaRAF.current = requestAnimationFrame(step);\r
      };\r
      stopInertia();\r
      inertiaRAF.current = requestAnimationFrame(step);\r
    },\r
    [dragDampening, maxVerticalRotationDeg, stopInertia]\r
  );\r
\r
  useGesture(\r
    {\r
      onDragStart: ({ event }) => {\r
        if (focusedElRef.current) return;\r
        stopInertia();\r
\r
        const evt = event as PointerEvent;\r
        pointerTypeRef.current = (evt.pointerType as any) || 'mouse';\r
        if (pointerTypeRef.current === 'touch') evt.preventDefault();\r
        if (pointerTypeRef.current === 'touch') lockScroll();\r
        draggingRef.current = true;\r
        cancelTapRef.current = false;\r
        movedRef.current = false;\r
        startRotRef.current = { ...rotationRef.current };\r
        startPosRef.current = { x: evt.clientX, y: evt.clientY };\r
        const potential = (evt.target as Element).closest?.('.item__image') as HTMLElement | null;\r
        tapTargetRef.current = potential || null;\r
      },\r
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {\r
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;\r
\r
        const evt = event as PointerEvent;\r
        if (pointerTypeRef.current === 'touch') evt.preventDefault();\r
\r
        const dxTotal = evt.clientX - startPosRef.current.x;\r
        const dyTotal = evt.clientY - startPosRef.current.y;\r
\r
        if (!movedRef.current) {\r
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;\r
          if (dist2 > 16) movedRef.current = true;\r
        }\r
\r
        const nextX = clamp(\r
          startRotRef.current.x - dyTotal / dragSensitivity,\r
          -maxVerticalRotationDeg,\r
          maxVerticalRotationDeg\r
        );\r
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;\r
\r
        const cur = rotationRef.current;\r
        if (cur.x !== nextX || cur.y !== nextY) {\r
          rotationRef.current = { x: nextX, y: nextY };\r
          applyTransform(nextX, nextY);\r
        }\r
\r
        if (last) {\r
          draggingRef.current = false;\r
          let isTap = false;\r
\r
          if (startPosRef.current) {\r
            const dx = evt.clientX - startPosRef.current.x;\r
            const dy = evt.clientY - startPosRef.current.y;\r
            const dist2 = dx * dx + dy * dy;\r
            const TAP_THRESH_PX = pointerTypeRef.current === 'touch' ? 10 : 6;\r
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {\r
              isTap = true;\r
            }\r
          }\r
\r
          let [vMagX, vMagY] = velArr;\r
          const [dirX, dirY] = dirArr;\r
          let vx = vMagX * dirX;\r
          let vy = vMagY * dirY;\r
\r
          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {\r
            const [mx, my] = movement;\r
            vx = (mx / dragSensitivity) * 0.02;\r
            vy = (my / dragSensitivity) * 0.02;\r
          }\r
\r
          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {\r
            startInertia(vx, vy);\r
          }\r
          startPosRef.current = null;\r
          cancelTapRef.current = !isTap;\r
\r
          if (isTap && tapTargetRef.current && !focusedElRef.current) {\r
            openItemFromElement(tapTargetRef.current);\r
          }\r
          tapTargetRef.current = null;\r
\r
          if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120);\r
          if (pointerTypeRef.current === 'touch') unlockScroll();\r
          if (movedRef.current) lastDragEndAt.current = performance.now();\r
          movedRef.current = false;\r
        }\r
      }\r
    },\r
    { target: mainRef, eventOptions: { passive: false } }\r
  );\r
\r
  useEffect(() => {\r
    const scrim = scrimRef.current;\r
    if (!scrim) return;\r
\r
    const close = () => {\r
      if (performance.now() - openStartedAtRef.current < 250) return;\r
      const el = focusedElRef.current;\r
      if (!el) return;\r
      const parent = el.parentElement as HTMLElement;\r
      const overlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement | null;\r
      if (!overlay) return;\r
\r
      const refDiv = parent.querySelector('.item__image--reference') as HTMLElement | null;\r
\r
      const originalPos = originalTilePositionRef.current;\r
      if (!originalPos) {\r
        overlay.remove();\r
        if (refDiv) refDiv.remove();\r
        parent.style.setProperty('--rot-y-delta', \`0deg\`);\r
        parent.style.setProperty('--rot-x-delta', \`0deg\`);\r
        el.style.visibility = '';\r
        (el.style as any).zIndex = 0;\r
        focusedElRef.current = null;\r
        rootRef.current?.removeAttribute('data-enlarging');\r
        openingRef.current = false;\r
        return;\r
      }\r
\r
      const currentRect = overlay.getBoundingClientRect();\r
      const rootRect = rootRef.current!.getBoundingClientRect();\r
\r
      const originalPosRelativeToRoot = {\r
        left: originalPos.left - rootRect.left,\r
        top: originalPos.top - rootRect.top,\r
        width: originalPos.width,\r
        height: originalPos.height\r
      };\r
\r
      const overlayRelativeToRoot = {\r
        left: currentRect.left - rootRect.left,\r
        top: currentRect.top - rootRect.top,\r
        width: currentRect.width,\r
        height: currentRect.height\r
      };\r
\r
      const animatingOverlay = document.createElement('div');\r
      animatingOverlay.className = 'enlarge-closing';\r
      animatingOverlay.style.cssText = \`\r
        position: absolute;\r
        left: \${overlayRelativeToRoot.left}px;\r
        top: \${overlayRelativeToRoot.top}px;\r
        width: \${overlayRelativeToRoot.width}px;\r
        height: \${overlayRelativeToRoot.height}px;\r
        z-index: 9999;\r
        border-radius: \${openedImageBorderRadius};\r
        overflow: hidden;\r
        box-shadow: 0 10px 30px rgba(0,0,0,.35);\r
        transition: all \${enlargeTransitionMs}ms ease-out;\r
        pointer-events: none;\r
        margin: 0;\r
        transform: none;\r
        filter: \${grayscale ? 'grayscale(1)' : 'none'};\r
      \`;\r
\r
      const originalImg = overlay.querySelector('img');\r
      if (originalImg) {\r
        const img = originalImg.cloneNode() as HTMLImageElement;\r
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';\r
        animatingOverlay.appendChild(img);\r
      }\r
\r
      overlay.remove();\r
      rootRef.current!.appendChild(animatingOverlay);\r
\r
      void animatingOverlay.getBoundingClientRect();\r
\r
      requestAnimationFrame(() => {\r
        animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';\r
        animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';\r
        animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';\r
        animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';\r
        animatingOverlay.style.opacity = '0';\r
      });\r
\r
      const cleanup = () => {\r
        animatingOverlay.remove();\r
        originalTilePositionRef.current = null;\r
\r
        if (refDiv) refDiv.remove();\r
        parent.style.transition = 'none';\r
        el.style.transition = 'none';\r
\r
        parent.style.setProperty('--rot-y-delta', \`0deg\`);\r
        parent.style.setProperty('--rot-x-delta', \`0deg\`);\r
\r
        requestAnimationFrame(() => {\r
          el.style.visibility = '';\r
          el.style.opacity = '0';\r
          (el.style as any).zIndex = 0;\r
          focusedElRef.current = null;\r
          rootRef.current?.removeAttribute('data-enlarging');\r
\r
          requestAnimationFrame(() => {\r
            parent.style.transition = '';\r
            el.style.transition = 'opacity 300ms ease-out';\r
\r
            requestAnimationFrame(() => {\r
              el.style.opacity = '1';\r
              setTimeout(() => {\r
                el.style.transition = '';\r
                el.style.opacity = '';\r
                openingRef.current = false;\r
                if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true') {\r
                  document.body.classList.remove('dg-scroll-lock');\r
                }\r
              }, 300);\r
            });\r
          });\r
        });\r
      };\r
\r
      animatingOverlay.addEventListener('transitionend', cleanup, {\r
        once: true\r
      });\r
    };\r
\r
    scrim.addEventListener('click', close);\r
    const onKey = (e: KeyboardEvent) => {\r
      if (e.key === 'Escape') close();\r
    };\r
    window.addEventListener('keydown', onKey);\r
\r
    return () => {\r
      scrim.removeEventListener('click', close);\r
      window.removeEventListener('keydown', onKey);\r
    };\r
  }, [enlargeTransitionMs, openedImageBorderRadius, grayscale]);\r
\r
  const openItemFromElement = (el: HTMLElement) => {\r
    if (openingRef.current) return;\r
    openingRef.current = true;\r
    openStartedAtRef.current = performance.now();\r
    lockScroll();\r
    const parent = el.parentElement as HTMLElement;\r
    focusedElRef.current = el;\r
    el.setAttribute('data-focused', 'true');\r
    const offsetX = getDataNumber(parent, 'offsetX', 0);\r
    const offsetY = getDataNumber(parent, 'offsetY', 0);\r
    const sizeX = getDataNumber(parent, 'sizeX', 2);\r
    const sizeY = getDataNumber(parent, 'sizeY', 2);\r
    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);\r
    const parentY = normalizeAngle(parentRot.rotateY);\r
    const globalY = normalizeAngle(rotationRef.current.y);\r
    let rotY = -(parentY + globalY) % 360;\r
    if (rotY < -180) rotY += 360;\r
    const rotX = -parentRot.rotateX - rotationRef.current.x;\r
    parent.style.setProperty('--rot-y-delta', \`\${rotY}deg\`);\r
    parent.style.setProperty('--rot-x-delta', \`\${rotX}deg\`);\r
    const refDiv = document.createElement('div');\r
    refDiv.className = 'item__image item__image--reference opacity-0';\r
    refDiv.style.transform = \`rotateX(\${-parentRot.rotateX}deg) rotateY(\${-parentRot.rotateY}deg)\`;\r
    parent.appendChild(refDiv);\r
\r
    void refDiv.offsetHeight;\r
\r
    const tileR = refDiv.getBoundingClientRect();\r
    const mainR = mainRef.current?.getBoundingClientRect();\r
    const frameR = frameRef.current?.getBoundingClientRect();\r
\r
    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {\r
      openingRef.current = false;\r
      focusedElRef.current = null;\r
      parent.removeChild(refDiv);\r
      unlockScroll();\r
      return;\r
    }\r
\r
    originalTilePositionRef.current = {\r
      left: tileR.left,\r
      top: tileR.top,\r
      width: tileR.width,\r
      height: tileR.height\r
    };\r
    el.style.visibility = 'hidden';\r
    (el.style as any).zIndex = 0;\r
    const overlay = document.createElement('div');\r
    overlay.className = 'enlarge';\r
    overlay.style.cssText = \`position:absolute; left:\${frameR.left - mainR.left}px; top:\${frameR.top - mainR.top}px; width:\${frameR.width}px; height:\${frameR.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform \${enlargeTransitionMs}ms ease, opacity \${enlargeTransitionMs}ms ease; border-radius:\${openedImageBorderRadius}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);\`;\r
    const rawSrc = parent.dataset.src || (el.querySelector('img') as HTMLImageElement)?.src || '';\r
    const rawAlt = parent.dataset.alt || (el.querySelector('img') as HTMLImageElement)?.alt || '';\r
    const img = document.createElement('img');\r
    img.src = rawSrc;\r
    img.alt = rawAlt;\r
    img.style.cssText = \`width:100%; height:100%; object-fit:cover; filter:\${grayscale ? 'grayscale(1)' : 'none'};\`;\r
    overlay.appendChild(img);\r
    viewerRef.current!.appendChild(overlay);\r
    const tx0 = tileR.left - frameR.left;\r
    const ty0 = tileR.top - frameR.top;\r
    const sx0 = tileR.width / frameR.width;\r
    const sy0 = tileR.height / frameR.height;\r
\r
    const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;\r
    const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;\r
\r
    overlay.style.transform = \`translate(\${tx0}px, \${ty0}px) scale(\${validSx0}, \${validSy0})\`;\r
    setTimeout(() => {\r
      if (!overlay.parentElement) return;\r
      overlay.style.opacity = '1';\r
      overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';\r
      rootRef.current?.setAttribute('data-enlarging', 'true');\r
    }, 16);\r
    const wantsResize = openedImageWidth || openedImageHeight;\r
    if (wantsResize) {\r
      const onFirstEnd = (ev: TransitionEvent) => {\r
        if (ev.propertyName !== 'transform') return;\r
        overlay.removeEventListener('transitionend', onFirstEnd);\r
        const prevTransition = overlay.style.transition;\r
        overlay.style.transition = 'none';\r
        const tempWidth = openedImageWidth || \`\${frameR.width}px\`;\r
        const tempHeight = openedImageHeight || \`\${frameR.height}px\`;\r
        overlay.style.width = tempWidth;\r
        overlay.style.height = tempHeight;\r
        const newRect = overlay.getBoundingClientRect();\r
        overlay.style.width = frameR.width + 'px';\r
        overlay.style.height = frameR.height + 'px';\r
        void overlay.offsetWidth;\r
        overlay.style.transition = \`left \${enlargeTransitionMs}ms ease, top \${enlargeTransitionMs}ms ease, width \${enlargeTransitionMs}ms ease, height \${enlargeTransitionMs}ms ease\`;\r
        const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;\r
        const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;\r
        requestAnimationFrame(() => {\r
          overlay.style.left = \`\${centeredLeft}px\`;\r
          overlay.style.top = \`\${centeredTop}px\`;\r
          overlay.style.width = tempWidth;\r
          overlay.style.height = tempHeight;\r
        });\r
        const cleanupSecond = () => {\r
          overlay.removeEventListener('transitionend', cleanupSecond);\r
          overlay.style.transition = prevTransition;\r
        };\r
        overlay.addEventListener('transitionend', cleanupSecond, {\r
          once: true\r
        });\r
      };\r
      overlay.addEventListener('transitionend', onFirstEnd);\r
    }\r
  };\r
\r
  useEffect(() => {\r
    return () => {\r
      document.body.classList.remove('dg-scroll-lock');\r
    };\r
  }, []);\r
\r
  const cssStyles = \`\r
    .sphere-root {\r
      --radius: 520px;\r
      --viewer-pad: 72px;\r
      --circ: calc(var(--radius) * 3.14);\r
      --rot-y: calc((360deg / var(--segments-x)) / 2);\r
      --rot-x: calc((360deg / var(--segments-y)) / 2);\r
      --item-width: calc(var(--circ) / var(--segments-x));\r
      --item-height: calc(var(--circ) / var(--segments-y));\r
    }\r
    \r
    .sphere-root * { box-sizing: border-box; }\r
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }\r
    \r
    .stage {\r
      width: 100%;\r
      height: 100%;\r
      display: grid;\r
      place-items: center;\r
      position: absolute;\r
      inset: 0;\r
      margin: auto;\r
      perspective: calc(var(--radius) * 2);\r
      perspective-origin: 50% 50%;\r
    }\r
    \r
    .sphere {\r
      transform: translateZ(calc(var(--radius) * -1));\r
      will-change: transform;\r
      position: absolute;\r
    }\r
    \r
    .sphere-item {\r
      width: calc(var(--item-width) * var(--item-size-x));\r
      height: calc(var(--item-height) * var(--item-size-y));\r
      position: absolute;\r
      top: -999px;\r
      bottom: -999px;\r
      left: -999px;\r
      right: -999px;\r
      margin: auto;\r
      transform-origin: 50% 50%;\r
      backface-visibility: hidden;\r
      transition: transform 300ms;\r
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) \r
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) \r
                 translateZ(var(--radius));\r
    }\r
    \r
    .sphere-root[data-enlarging="true"] .scrim {\r
      opacity: 1 !important;\r
      pointer-events: all !important;\r
    }\r
    \r
    @media (max-aspect-ratio: 1/1) {\r
      .viewer-frame {\r
        height: auto !important;\r
        width: 100% !important;\r
      }\r
    }\r
    \r
    // body.dg-scroll-lock {\r
    //   position: fixed !important;\r
    //   top: 0;\r
    //   left: 0;\r
    //   width: 100% !important;\r
    //   height: 100% !important;\r
    //   overflow: hidden !important;\r
    //   touch-action: none !important;\r
    //   overscroll-behavior: contain !important;\r
    // }\r
    .item__image {\r
      position: absolute;\r
      inset: 10px;\r
      border-radius: var(--tile-radius, 12px);\r
      overflow: hidden;\r
      cursor: pointer;\r
      backface-visibility: hidden;\r
      -webkit-backface-visibility: hidden;\r
      transition: transform 300ms;\r
      pointer-events: auto;\r
      -webkit-transform: translateZ(0);\r
      transform: translateZ(0);\r
    }\r
    .item__image--reference {\r
      position: absolute;\r
      inset: 10px;\r
      pointer-events: none;\r
    }\r
  \`;\r
\r
  return (\r
    <>\r
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />\r
      <div\r
        ref={rootRef}\r
        className="sphere-root relative w-full h-full"\r
        style={\r
          {\r
            ['--segments-x' as any]: segments,\r
            ['--segments-y' as any]: segments,\r
            ['--overlay-blur-color' as any]: overlayBlurColor,\r
            ['--tile-radius' as any]: imageBorderRadius,\r
            ['--enlarge-radius' as any]: openedImageBorderRadius,\r
            ['--image-filter' as any]: grayscale ? 'grayscale(1)' : 'none'\r
          } as React.CSSProperties\r
        }\r
      >\r
        <main\r
          ref={mainRef}\r
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"\r
          style={{\r
            touchAction: 'none',\r
            WebkitUserSelect: 'none'\r
          }}\r
        >\r
          <div className="stage">\r
            <div ref={sphereRef} className="sphere">\r
              {items.map((it, i) => (\r
                <div\r
                  key={\`\${it.x},\${it.y},\${i}\`}\r
                  className="sphere-item absolute m-auto"\r
                  data-src={it.src}\r
                  data-alt={it.alt}\r
                  data-offset-x={it.x}\r
                  data-offset-y={it.y}\r
                  data-size-x={it.sizeX}\r
                  data-size-y={it.sizeY}\r
                  style={\r
                    {\r
                      ['--offset-x' as any]: it.x,\r
                      ['--offset-y' as any]: it.y,\r
                      ['--item-size-x' as any]: it.sizeX,\r
                      ['--item-size-y' as any]: it.sizeY,\r
                      top: '-999px',\r
                      bottom: '-999px',\r
                      left: '-999px',\r
                      right: '-999px'\r
                    } as React.CSSProperties\r
                  }\r
                >\r
                  <div\r
                    className="item__image absolute block overflow-hidden cursor-pointer bg-gray-200 transition-transform duration-300"\r
                    role="button"\r
                    tabIndex={0}\r
                    aria-label={it.alt || 'Open image'}\r
                    onClick={e => {\r
                      if (draggingRef.current) return;\r
                      if (movedRef.current) return;\r
                      if (performance.now() - lastDragEndAt.current < 80) return;\r
                      if (openingRef.current) return;\r
                      openItemFromElement(e.currentTarget as HTMLElement);\r
                    }}\r
                    onPointerUp={e => {\r
                      if ((e.nativeEvent as PointerEvent).pointerType !== 'touch') return;\r
                      if (draggingRef.current) return;\r
                      if (movedRef.current) return;\r
                      if (performance.now() - lastDragEndAt.current < 80) return;\r
                      if (openingRef.current) return;\r
                      openItemFromElement(e.currentTarget as HTMLElement);\r
                    }}\r
                    style={{\r
                      inset: '10px',\r
                      borderRadius: \`var(--tile-radius, \${imageBorderRadius})\`,\r
                      backfaceVisibility: 'hidden'\r
                    }}\r
                  >\r
                    <img\r
                      src={it.src}\r
                      draggable={false}\r
                      alt={it.alt}\r
                      className="w-full h-full object-cover pointer-events-none"\r
                      style={{\r
                        backfaceVisibility: 'hidden',\r
                        filter: \`var(--image-filter, \${grayscale ? 'grayscale(1)' : 'none'})\`\r
                      }}\r
                    />\r
                  </div>\r
                </div>\r
              ))}\r
            </div>\r
          </div>\r
\r
          <div\r
            className="absolute inset-0 m-auto z-[3] pointer-events-none"\r
            style={{\r
              backgroundImage: \`radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, \${overlayBlurColor}) 100%)\`\r
            }}\r
          />\r
\r
          <div\r
            className="absolute inset-0 m-auto z-[3] pointer-events-none"\r
            style={{\r
              WebkitMaskImage: \`radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, \${overlayBlurColor}) 90%)\`,\r
              maskImage: \`radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, \${overlayBlurColor}) 90%)\`,\r
              backdropFilter: 'blur(3px)'\r
            }}\r
          />\r
\r
          <div\r
            className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180"\r
            style={{\r
              background: \`linear-gradient(to bottom, transparent, var(--overlay-blur-color, \${overlayBlurColor}))\`\r
            }}\r
          />\r
          <div\r
            className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none"\r
            style={{\r
              background: \`linear-gradient(to bottom, transparent, var(--overlay-blur-color, \${overlayBlurColor}))\`\r
            }}\r
          />\r
\r
          <div\r
            ref={viewerRef}\r
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"\r
            style={{ padding: 'var(--viewer-pad)' }}\r
          >\r
            <div\r
              ref={scrimRef}\r
              className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500"\r
              style={{\r
                background: 'rgba(0, 0, 0, 0.4)',\r
                backdropFilter: 'blur(3px)'\r
              }}\r
            />\r
            <div\r
              ref={frameRef}\r
              className="viewer-frame h-full aspect-square flex"\r
              style={{\r
                borderRadius: \`var(--enlarge-radius, \${openedImageBorderRadius})\`\r
              }}\r
            />\r
          </div>\r
        </main>\r
      </div>\r
    </>\r
  );\r
}\r
`,Ut={dependencies:"@use-gesture/react",usage:`import DomeGallery from './DomeGallery';
export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <DomeGallery />
    </div>
  );
}`,code:Gt,css:jt,tailwind:Vt,tsCode:qt,tsTailwind:Wt},Kt=[{src:"https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"Abstract art"},{src:"https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"Modern sculpture"},{src:"https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"Digital artwork"},{src:"https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"Contemporary art"},{src:"https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"Geometric pattern"},{src:"https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"Textured surface"},{src:"https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",alt:"Social media image"}],ye={maxVerticalRotationDeg:5,dragSensitivity:20,enlargeTransitionMs:300,segments:35},V=(t,e,r)=>Math.min(Math.max(t,e),r),Qe=t=>(t%360+360)%360,er=t=>((t+180)%360+360)%360-180,ve=(t,e,r)=>{const n=t.dataset[e]??t.getAttribute(`data-${e}`),i=n==null?NaN:parseFloat(n);return Number.isFinite(i)?i:r};function Zt(t,e){const r=Array.from({length:e},(l,o)=>-37+o*2),n=[-4,-2,0,2,4],i=[-3,-1,1,3,5],a=r.flatMap((l,o)=>(o%2===0?n:i).map(x=>({x:l,y:x,sizeX:2,sizeY:2}))),s=a.length;if(t.length===0)return a.map(l=>({...l,src:"",alt:""}));t.length>s&&console.warn(`[DomeGallery] Provided image count (${t.length}) exceeds available tiles (${s}). Some images will not be shown.`);const f=t.map(l=>typeof l=="string"?{src:l,alt:""}:{src:l.src||"",alt:l.alt||""}),d=Array.from({length:s},(l,o)=>f[o%f.length]);for(let l=1;l<d.length;l++)if(d[l].src===d[l-1].src){for(let o=l+1;o<d.length;o++)if(d[o].src!==d[l].src){const _=d[l];d[l]=d[o],d[o]=_;break}}return a.map((l,o)=>({...l,src:d[o].src,alt:d[o].alt}))}function Jt(t,e,r,n,i){const a=360/i/2,s=a*(t+(r-1)/2);return{rotateX:a*(e-(n-1)/2),rotateY:s}}function Qt({images:t=Kt,fit:e=.5,fitBasis:r="auto",minRadius:n=600,maxRadius:i=1/0,padFactor:a=.25,overlayBlurColor:s="#060010",maxVerticalRotationDeg:f=ye.maxVerticalRotationDeg,dragSensitivity:d=ye.dragSensitivity,enlargeTransitionMs:l=ye.enlargeTransitionMs,segments:o=ye.segments,dragDampening:_=2,openedImageWidth:x="250px",openedImageHeight:b="350px",imageBorderRadius:N="30px",openedImageBorderRadius:G="30px",grayscale:j=!0}){const C=m.useRef(null),q=m.useRef(null),ue=m.useRef(null),J=m.useRef(null),Q=m.useRef(null),H=m.useRef(null),F=m.useRef(null),we=m.useRef(null),X=m.useRef({x:0,y:0}),Te=m.useRef({x:0,y:0}),fe=m.useRef(null),ee=m.useRef(!1),W=m.useRef(!1),U=m.useRef(null),K=m.useRef(!1),ke=m.useRef(0),De=m.useRef(0),de=m.useRef(!1),Pe=m.useCallback(()=>{de.current||(de.current=!0,document.body.classList.add("dg-scroll-lock"))},[]),me=m.useCallback(()=>{var u;de.current&&((u=C.current)==null?void 0:u.getAttribute("data-enlarging"))!=="true"&&(de.current=!1,document.body.classList.remove("dg-scroll-lock"))},[]),ur=m.useMemo(()=>Zt(t,o),[t,o]),pe=(u,h)=>{const $=ue.current;$&&($.style.transform=`translateZ(calc(var(--radius) * -1)) rotateX(${u}deg) rotateY(${h}deg)`)},Ye=m.useRef(null);m.useEffect(()=>{const u=C.current;if(!u)return;const h=new ResizeObserver($=>{var y;const v=$[0].contentRect,T=Math.max(1,v.width),I=Math.max(1,v.height),D=Math.min(T,I),P=Math.max(T,I),Y=T/I;let E;switch(r){case"min":E=D;break;case"max":E=P;break;case"width":E=T;break;case"height":E=I;break;default:E=Y>=1.3?T:D}let S=E*e;const M=I*1.35;S=Math.min(S,M),S=V(S,n,i),Ye.current=Math.round(S);const g=Math.max(8,Math.round(D*a));u.style.setProperty("--radius",`${Ye.current}px`),u.style.setProperty("--viewer-pad",`${g}px`),u.style.setProperty("--overlay-blur-color",s),u.style.setProperty("--tile-radius",N),u.style.setProperty("--enlarge-radius",G),u.style.setProperty("--image-filter",j?"grayscale(1)":"none"),pe(X.current.x,X.current.y);const k=(y=Q.current)==null?void 0:y.querySelector(".enlarge");if(k&&J.current&&q.current){const c=J.current.getBoundingClientRect(),L=q.current.getBoundingClientRect();if(x&&b){const O=document.createElement("div");O.style.cssText=`position: absolute; width: ${x}; height: ${b}; visibility: hidden;`,document.body.appendChild(O);const he=O.getBoundingClientRect();document.body.removeChild(O);const ie=c.left-L.left+(c.width-he.width)/2,ae=c.top-L.top+(c.height-he.height)/2;k.style.left=`${ie}px`,k.style.top=`${ae}px`}else k.style.left=`${c.left-L.left}px`,k.style.top=`${c.top-L.top}px`,k.style.width=`${c.width}px`,k.style.height=`${c.height}px`}});return h.observe(u),()=>h.disconnect()},[e,r,n,i,a,s,j,N,G,x,b]),m.useEffect(()=>{pe(X.current.x,X.current.y)},[]);const Ee=m.useCallback(()=>{U.current&&(cancelAnimationFrame(U.current),U.current=null)},[]),fr=m.useCallback((u,h)=>{let v=V(u,-1.4,1.4)*80,T=V(h,-1.4,1.4)*80,I=0;const D=V(_??.6,0,1),P=.94+.055*D,Y=.015-.01*D,E=Math.round(90+270*D),S=()=>{if(v*=P,T*=P,Math.abs(v)<Y&&Math.abs(T)<Y){U.current=null;return}if(++I>E){U.current=null;return}const M=V(X.current.x-T/200,-f,f),g=er(X.current.y+v/200);X.current={x:M,y:g},pe(M,g),U.current=requestAnimationFrame(S)};Ee(),U.current=requestAnimationFrame(S)},[_,f,Ee]);Nt({onDragStart:({event:u})=>{if(F.current)return;Ee();const h=u;ee.current=!0,W.current=!1,Te.current={...X.current},fe.current={x:h.clientX,y:h.clientY}},onDrag:({event:u,last:h,velocity:$=[0,0],direction:v=[0,0],movement:T})=>{if(F.current||!ee.current||!fe.current)return;const I=u,D=I.clientX-fe.current.x,P=I.clientY-fe.current.y;W.current||D*D+P*P>16&&(W.current=!0);const Y=V(Te.current.x-P/d,-f,f),E=er(Te.current.y+D/d);if((X.current.x!==Y||X.current.y!==E)&&(X.current={x:Y,y:E},pe(Y,E)),h){ee.current=!1;let[S,M]=$;const[g,k]=v;let y=S*g,c=M*k;if(Math.abs(y)<.001&&Math.abs(c)<.001&&Array.isArray(T)){const[L,z]=T;y=V(L/d*.02,-1.2,1.2),c=V(z/d*.02,-1.2,1.2)}(Math.abs(y)>.005||Math.abs(c)>.005)&&fr(y,c),W.current&&(De.current=performance.now()),W.current=!1}}},{target:q,eventOptions:{passive:!0}}),m.useEffect(()=>{const u=H.current;if(!u)return;const h=()=>{var c,L;if(performance.now()-ke.current<250)return;const v=F.current;if(!v)return;const T=v.parentElement,I=(c=Q.current)==null?void 0:c.querySelector(".enlarge");if(!I)return;const D=T.querySelector(".item__image--reference"),P=we.current;if(!P){I.remove(),D&&D.remove(),T.style.setProperty("--rot-y-delta","0deg"),T.style.setProperty("--rot-x-delta","0deg"),v.style.visibility="",v.style.zIndex=0,F.current=null,(L=C.current)==null||L.removeAttribute("data-enlarging"),K.current=!1,me();return}const Y=I.getBoundingClientRect(),E=C.current.getBoundingClientRect(),S={left:P.left-E.left,top:P.top-E.top,width:P.width,height:P.height},M={left:Y.left-E.left,top:Y.top-E.top,width:Y.width,height:Y.height},g=document.createElement("div");g.className="enlarge-closing",g.style.cssText=`position:absolute;left:${M.left}px;top:${M.top}px;width:${M.width}px;height:${M.height}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${l}ms ease-out;pointer-events:none;margin:0;transform:none;`;const k=I.querySelector("img");if(k){const z=k.cloneNode();z.style.cssText="width:100%;height:100%;object-fit:cover;",g.appendChild(z)}I.remove(),C.current.appendChild(g),g.getBoundingClientRect(),requestAnimationFrame(()=>{g.style.left=S.left+"px",g.style.top=S.top+"px",g.style.width=S.width+"px",g.style.height=S.height+"px",g.style.opacity="0"});const y=()=>{g.remove(),we.current=null,D&&D.remove(),T.style.transition="none",v.style.transition="none",T.style.setProperty("--rot-y-delta","0deg"),T.style.setProperty("--rot-x-delta","0deg"),requestAnimationFrame(()=>{var z;v.style.visibility="",v.style.opacity="0",v.style.zIndex=0,F.current=null,(z=C.current)==null||z.removeAttribute("data-enlarging"),requestAnimationFrame(()=>{T.style.transition="",v.style.transition="opacity 300ms ease-out",requestAnimationFrame(()=>{v.style.opacity="1",setTimeout(()=>{var O;v.style.transition="",v.style.opacity="",K.current=!1,!ee.current&&((O=C.current)==null?void 0:O.getAttribute("data-enlarging"))!=="true"&&document.body.classList.remove("dg-scroll-lock")},300)})})})};g.addEventListener("transitionend",y,{once:!0})};u.addEventListener("click",h);const $=v=>{v.key==="Escape"&&h()};return window.addEventListener("keydown",$),()=>{u.removeEventListener("click",h),window.removeEventListener("keydown",$)}},[l,me]);const ge=m.useCallback(u=>{var Ce,Xe,$e;if(K.current)return;K.current=!0,ke.current=performance.now(),Pe();const h=u.parentElement;F.current=u,u.setAttribute("data-focused","true");const $=ve(h,"offsetX",0),v=ve(h,"offsetY",0),T=ve(h,"sizeX",2),I=ve(h,"sizeY",2),D=Jt($,v,T,I,o),P=Qe(D.rotateY),Y=Qe(X.current.y);let E=-(P+Y)%360;E<-180&&(E+=360);const S=-D.rotateX-X.current.x;h.style.setProperty("--rot-y-delta",`${E}deg`),h.style.setProperty("--rot-x-delta",`${S}deg`);const M=document.createElement("div");M.className="item__image item__image--reference",M.style.opacity="0",M.style.transform=`rotateX(${-D.rotateX}deg) rotateY(${-D.rotateY}deg)`,h.appendChild(M),M.offsetHeight;const g=M.getBoundingClientRect(),k=(Ce=q.current)==null?void 0:Ce.getBoundingClientRect(),y=(Xe=J.current)==null?void 0:Xe.getBoundingClientRect();if(!k||!y||g.width<=0||g.height<=0){K.current=!1,F.current=null,h.removeChild(M),me();return}we.current={left:g.left,top:g.top,width:g.width,height:g.height},u.style.visibility="hidden",u.style.zIndex=0;const c=document.createElement("div");c.className="enlarge",c.style.position="absolute",c.style.left=y.left-k.left+"px",c.style.top=y.top-k.top+"px",c.style.width=y.width+"px",c.style.height=y.height+"px",c.style.opacity="0",c.style.zIndex="30",c.style.willChange="transform, opacity",c.style.transformOrigin="top left",c.style.transition=`transform ${l}ms ease, opacity ${l}ms ease`;const L=h.dataset.src||(($e=u.querySelector("img"))==null?void 0:$e.src)||"",z=document.createElement("img");z.src=L,c.appendChild(z),Q.current.appendChild(c);const O=g.left-y.left,he=g.top-y.top,ie=g.width/y.width,ae=g.height/y.height,pr=isFinite(ie)&&ie>0?ie:1,gr=isFinite(ae)&&ae>0?ae:1;if(c.style.transform=`translate(${O}px, ${he}px) scale(${pr}, ${gr})`,setTimeout(()=>{var se;c.parentElement&&(c.style.opacity="1",c.style.transform="translate(0px, 0px) scale(1, 1)",(se=C.current)==null||se.setAttribute("data-enlarging","true"))},16),x||b){const se=hr=>{if(hr.propertyName!=="transform")return;c.removeEventListener("transitionend",se);const yr=c.style.transition;c.style.transition="none";const Be=x||`${y.width}px`,Le=b||`${y.height}px`;c.style.width=Be,c.style.height=Le;const ze=c.getBoundingClientRect();c.style.width=y.width+"px",c.style.height=y.height+"px",c.offsetWidth,c.style.transition=`left ${l}ms ease, top ${l}ms ease, width ${l}ms ease, height ${l}ms ease`;const vr=y.left-k.left+(y.width-ze.width)/2,Rr=y.top-k.top+(y.height-ze.height)/2;requestAnimationFrame(()=>{c.style.left=`${vr}px`,c.style.top=`${Rr}px`,c.style.width=Be,c.style.height=Le});const He=()=>{c.removeEventListener("transitionend",He),c.style.transition=yr};c.addEventListener("transitionend",He,{once:!0})};c.addEventListener("transitionend",se)}},[l,Pe,b,x,o,me]),dr=m.useCallback(u=>{ee.current||W.current||performance.now()-De.current<80||K.current||ge(u.currentTarget)},[ge]),mr=m.useCallback(u=>{u.pointerType==="touch"&&(ee.current||W.current||performance.now()-De.current<80||K.current||ge(u.currentTarget))},[ge]);return m.useEffect(()=>()=>{document.body.classList.remove("dg-scroll-lock")},[]),p.jsx("div",{ref:C,className:"sphere-root",style:{"--segments-x":o,"--segments-y":o,"--overlay-blur-color":s,"--tile-radius":N,"--enlarge-radius":G,"--image-filter":j?"grayscale(1)":"none"},children:p.jsxs("main",{ref:q,className:"sphere-main",children:[p.jsx("div",{className:"stage",children:p.jsx("div",{ref:ue,className:"sphere",children:ur.map((u,h)=>p.jsx("div",{className:"item","data-src":u.src,"data-offset-x":u.x,"data-offset-y":u.y,"data-size-x":u.sizeX,"data-size-y":u.sizeY,style:{"--offset-x":u.x,"--offset-y":u.y,"--item-size-x":u.sizeX,"--item-size-y":u.sizeY},children:p.jsx("div",{className:"item__image",role:"button",tabIndex:0,"aria-label":u.alt||"Open image",onClick:dr,onPointerUp:mr,children:p.jsx("img",{src:u.src,draggable:!1,alt:u.alt})})},`${u.x},${u.y},${h}`))})}),p.jsx("div",{className:"overlay"}),p.jsx("div",{className:"overlay overlay--blur"}),p.jsx("div",{className:"edge-fade edge-fade--top"}),p.jsx("div",{className:"edge-fade edge-fade--bottom"}),p.jsxs("div",{className:"viewer",ref:Q,children:[p.jsx("div",{ref:H,className:"scrim"}),p.jsx("div",{ref:J,className:"frame"})]})]})})}const cn=()=>{const[t,e]=m.useState(.8),[r,n]=m.useState(600),[i,a]=m.useState(0),[s,f]=m.useState(34),[d,l]=m.useState(2),[o,_]=m.useState(!0),x=[{name:"images",type:"(string | { src: string; alt?: string })[]",default:"DEFAULT_IMAGES",description:"Array of image URLs (strings) or image objects with src and optional alt text"},{name:"fit",type:"number",default:"0.5",description:"Size factor for the dome radius based on container dimensions"},{name:"fitBasis",type:"'auto' | 'min' | 'max' | 'width' | 'height'",default:"'auto'",description:"Basis for calculating the dome size"},{name:"minRadius",type:"number",default:"600",description:"Minimum radius for the dome in pixels"},{name:"maxRadius",type:"number",default:"Infinity",description:"Maximum radius for the dome in pixels"},{name:"padFactor",type:"number",default:"0.25",description:"Padding factor for the viewer area"},{name:"overlayBlurColor",type:"string",default:"'#060010'",description:"Color for the outer portion of the radial overlay blur"},{name:"maxVerticalRotationDeg",type:"number",default:"5",description:"Maximum vertical rotation angle in degrees"},{name:"dragSensitivity",type:"number",default:"20",description:"Sensitivity of drag interactions"},{name:"enlargeTransitionMs",type:"number",default:"300",description:"Duration of image enlargement transition in milliseconds"},{name:"segments",type:"number",default:"35",description:"Number of segments for both X and Y to keep the dome proportional"},{name:"dragDampening",type:"number",default:"2",description:"Damping factor for drag inertia (0-1, higher = more damping)"},{name:"openedImageWidth",type:"string",default:"'400px'",description:"Width of the enlarged image"},{name:"openedImageHeight",type:"string",default:"'400px'",description:"Height of the enlarged image"},{name:"imageBorderRadius",type:"string",default:"'30px'",description:"Border radius for closed tile images"},{name:"openedImageBorderRadius",type:"string",default:"'30px'",description:"Border radius for opened/enlarged images"},{name:"grayscale",type:"boolean",default:"true",description:"Whether to render all images in grayscale"}];return p.jsxs(Tr,{children:[p.jsxs(Dr,{children:[p.jsx(xr,{position:"relative",className:"demo-container",h:600,p:0,overflow:"hidden",children:p.jsx(Qt,{fit:t,minRadius:r,maxVerticalRotationDeg:i,segments:s,dragDampening:d,grayscale:o})}),p.jsxs(br,{display:"flex",gap:"0.4em",mt:"1em",color:"#B19EEF",alignItems:"center",children:[p.jsx(wr,{}),"Click images to expand"]}),p.jsxs(_r,{children:[p.jsx(oe,{title:"Fit",min:.5,max:1,step:.05,value:t,onChange:b=>{e(b)}}),p.jsx(oe,{title:"Min Radius",min:300,max:1e3,step:50,value:r,valueUnit:"px",onChange:b=>{n(b)}}),p.jsx(oe,{title:"Max Vertical Rotation",min:0,max:20,step:1,value:i,valueUnit:"°",onChange:b=>{a(b)}}),p.jsx(oe,{title:"Segments",min:20,max:34,step:2,value:s,onChange:b=>{f(b)}}),p.jsx(oe,{title:"Drag Dampening",min:0,max:5,step:.2,value:d,onChange:b=>{l(b)}}),p.jsx(Ir,{title:"Grayscale",isChecked:o,onChange:b=>{_(b)}})]}),p.jsx(Er,{data:x}),p.jsx(Sr,{dependencyList:["@use-gesture/react"]})]}),p.jsx(Ar,{children:p.jsx(Mr,{codeObject:Ut})})]})};export{cn as default};
