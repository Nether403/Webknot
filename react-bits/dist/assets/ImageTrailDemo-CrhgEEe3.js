var T=Object.defineProperty;var E=(i,e,t)=>e in i?T(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var v=(i,e,t)=>E(i,typeof e!="symbol"?e+"":e,t);import{r as p,j as a,g as o,B as D,F as x,T as I,a as M}from"./index-wsKSLPNH.js";import{T as L,P as b,a as w,C as V,b as C}from"./PropTable-C4uPWs8h.js";import{D as z}from"./Dependencies-BHoMfJUj.js";import{u as R}from"./useForceRerender-BCFU-k0M.js";import{B as O}from"./button-group-B9LcRyTY.js";import"./index-Bpz4cGEA.js";const A=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
\r
import './ImageTrail.css';\r
\r
function lerp(a, b, n) {\r
  return (1 - n) * a + n * b;\r
}\r
\r
function getLocalPointerPos(e, rect) {\r
  let clientX = 0,\r
    clientY = 0;\r
  if (e.touches && e.touches.length > 0) {\r
    clientX = e.touches[0].clientX;\r
    clientY = e.touches[0].clientY;\r
  } else {\r
    clientX = e.clientX;\r
    clientY = e.clientY;\r
  }\r
  return {\r
    x: clientX - rect.left,\r
    y: clientY - rect.top\r
  };\r
}\r
function getMouseDistance(p1, p2) {\r
  const dx = p1.x - p2.x;\r
  const dy = p1.y - p2.y;\r
  return Math.hypot(dx, dy);\r
}\r
\r
class ImageItem {\r
  DOM = { el: null, inner: null };\r
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };\r
  rect = null;\r
\r
  constructor(DOM_el) {\r
    this.DOM.el = DOM_el;\r
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');\r
    this.getRect();\r
    this.initEvents();\r
  }\r
  initEvents() {\r
    this.resize = () => {\r
      gsap.set(this.DOM.el, this.defaultStyle);\r
      this.getRect();\r
    };\r
    window.addEventListener('resize', this.resize);\r
  }\r
  getRect() {\r
    this.rect = this.DOM.el.getBoundingClientRect();\r
  }\r
}\r
\r
class ImageTrailVariant1 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...this.DOM.el.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = this.container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = this.container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
\r
      requestAnimationFrame(() => this.render());\r
\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.4\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant2 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
\r
      requestAnimationFrame(() => this.render());\r
\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 2.8,\r
          filter: 'brightness(250%)'\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          filter: 'brightness(100%)'\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power2',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.45\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant3 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          xPercent: 0,\r
          yPercent: 0,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 1.2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.6,\r
          ease: 'power2',\r
          opacity: 0,\r
          scale: 0.2,\r
          xPercent: () => gsap.utils.random(-30, 30),\r
          yPercent: -200\r
        },\r
        0.6\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant4 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let distance = Math.sqrt(dx * dx + dy * dy);\r
    if (distance !== 0) {\r
      dx /= distance;\r
      dy /= distance;\r
    }\r
    dx *= distance / 100;\r
    dy *= distance / 100;\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 2,\r
          filter: \`brightness(\${Math.max((400 * distance) / 100, 100)}%) contrast(\${Math.max((400 * distance) / 100, 100)}%)\`\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          filter: 'brightness(100%) contrast(100%)'\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          opacity: 0\r
        },\r
        0.4\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 1.5,\r
          ease: 'power4',\r
          x: \`+=\${dx * 110}\`,\r
          y: \`+=\${dy * 110}\`\r
        },\r
        0.05\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant5 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
    this.lastAngle = 0;\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);\r
    if (angle < 0) angle += 360;\r
    if (angle > 90 && angle <= 270) angle += 180;\r
    const isMovingClockwise = angle >= this.lastAngle;\r
    this.lastAngle = angle;\r
    let startAngle = isMovingClockwise ? angle - 10 : angle + 10;\r
    let distance = Math.sqrt(dx * dx + dy * dy);\r
    if (distance !== 0) {\r
      dx /= distance;\r
      dy /= distance;\r
    }\r
    dx *= distance / 150;\r
    dy *= distance / 150;\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          filter: 'brightness(80%)',\r
          scale: 0.1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2,\r
          rotation: startAngle\r
        },\r
        {\r
          duration: 1,\r
          ease: 'power2',\r
          scale: 1,\r
          filter: 'brightness(100%)',\r
          x: this.mousePos.x - img.rect.width / 2 + dx * 70,\r
          y: this.mousePos.y - img.rect.height / 2 + dy * 70,\r
          rotation: this.lastAngle\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'expo',\r
          opacity: 0\r
        },\r
        0.5\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 1.5,\r
          ease: 'power4',\r
          x: \`+=\${dx * 120}\`,\r
          y: \`+=\${dy * 120}\`\r
        },\r
        0.05\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant6 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  mapSpeedToSize(speed, minSize, maxSize) {\r
    const maxSpeed = 200;\r
    return minSize + (maxSize - minSize) * Math.min(speed / maxSpeed, 1);\r
  }\r
  mapSpeedToBrightness(speed, minB, maxB) {\r
    const maxSpeed = 70;\r
    return minB + (maxB - minB) * Math.min(speed / maxSpeed, 1);\r
  }\r
  mapSpeedToBlur(speed, minBlur, maxBlur) {\r
    const maxSpeed = 90;\r
    return minBlur + (maxBlur - minBlur) * Math.min(speed / maxSpeed, 1);\r
  }\r
  mapSpeedToGrayscale(speed, minG, maxG) {\r
    const maxSpeed = 90;\r
    return minG + (maxG - minG) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  showNextImage() {\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let speed = Math.sqrt(dx * dx + dy * dy);\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    let scaleFactor = this.mapSpeedToSize(speed, 0.3, 2);\r
    let brightnessValue = this.mapSpeedToBrightness(speed, 0, 1.3);\r
    let blurValue = this.mapSpeedToBlur(speed, 20, 0);\r
    let grayscaleValue = this.mapSpeedToGrayscale(speed, 600, 0);\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.8,\r
          ease: 'power3',\r
          scale: scaleFactor,\r
          filter: \`grayscale(\${grayscaleValue * 100}%) brightness(\${brightnessValue * 100}%) blur(\${blurValue}px)\`,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 2\r
        },\r
        {\r
          duration: 0.8,\r
          ease: 'power3',\r
          scale: 1\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3.in',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.45\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
function getNewPosition(position, offset, arr) {\r
  const realOffset = Math.abs(offset) % arr.length;\r
  if (position - realOffset >= 0) {\r
    return position - realOffset;\r
  } else {\r
    return arr.length - (realOffset - position);\r
  }\r
}\r
class ImageTrailVariant7 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    this.visibleImagesCount = 0;\r
    this.visibleImagesTotal = 9;\r
    this.visibleImagesTotal = Math.min(this.visibleImagesTotal, this.imagesTotal - 1);\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    ++this.visibleImagesCount;\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    const scaleValue = gsap.utils.random(0.5, 1.6);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),\r
          rotationZ: 0,\r
          opacity: 1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          scale: scaleValue,\r
          rotationZ: gsap.utils.random(-3, 3),\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      );\r
\r
    if (this.visibleImagesCount >= this.visibleImagesTotal) {\r
      const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);\r
      const oldImg = this.images[lastInQueue];\r
      gsap.to(oldImg.DOM.el, {\r
        duration: 0.4,\r
        ease: 'power4',\r
        opacity: 0,\r
        scale: 1.3,\r
        onComplete: () => {\r
          if (this.activeImagesCount === 0) {\r
            this.isIdle = true;\r
          }\r
        }\r
      });\r
    }\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
  }\r
}\r
\r
class ImageTrailVariant8 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    this.rotation = { x: 0, y: 0 };\r
    this.cachedRotation = { x: 0, y: 0 };\r
    this.zValue = 0;\r
    this.cachedZValue = 0;\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    const rect = this.container.getBoundingClientRect();\r
    const centerX = rect.width / 2;\r
    const centerY = rect.height / 2;\r
    const relX = this.mousePos.x - centerX;\r
    const relY = this.mousePos.y - centerY;\r
\r
    this.rotation.x = -(relY / centerY) * 30;\r
    this.rotation.y = (relX / centerX) * 30;\r
    this.cachedRotation = { ...this.rotation };\r
\r
    const distanceFromCenter = Math.sqrt(relX * relX + relY * relY);\r
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);\r
    const proportion = distanceFromCenter / maxDistance;\r
    this.zValue = proportion * 1200 - 600;\r
    this.cachedZValue = this.zValue;\r
    const normalizedZ = (this.zValue + 600) / 1200;\r
    const brightness = 0.2 + normalizedZ * 2.3;\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .set(this.DOM.el, { perspective: 1000 }, 0)\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          z: 0,\r
          scale: 1 + this.cachedZValue / 1000,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2,\r
          rotationX: this.cachedRotation.x,\r
          rotationY: this.cachedRotation.y,\r
          filter: \`brightness(\${brightness})\`\r
        },\r
        {\r
          duration: 1,\r
          ease: 'expo',\r
          scale: 1 + this.zValue / 1000,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2,\r
          rotationX: this.rotation.x,\r
          rotationY: this.rotation.y\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power2',\r
          opacity: 0,\r
          z: -800\r
        },\r
        0.3\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
const variantMap = {\r
  1: ImageTrailVariant1,\r
  2: ImageTrailVariant2,\r
  3: ImageTrailVariant3,\r
  4: ImageTrailVariant4,\r
  5: ImageTrailVariant5,\r
  6: ImageTrailVariant6,\r
  7: ImageTrailVariant7,\r
  8: ImageTrailVariant8\r
};\r
\r
export default function ImageTrail({ items = [], variant = 1 }) {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const Cls = variantMap[variant] || variantMap[1];\r
    new Cls(containerRef.current);\r
  }, [variant, items]);\r
\r
  return (\r
    <div className="content" ref={containerRef}>\r
      {items.map((url, i) => (\r
        <div className="content__img" key={i}>\r
          <div className="content__img-inner" style={{ backgroundImage: \`url(\${url})\` }} />\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
`,S=`.content {\r
  width: 100%;\r
  height: 100%;\r
  position: relative;\r
  z-index: 100;\r
  border-radius: 8px;\r
  background: transparent;\r
  overflow: visible;\r
}\r
\r
.content__img {\r
  width: 190px;\r
  aspect-ratio: 1.1;\r
  border-radius: 15px;\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  opacity: 0;\r
  overflow: hidden;\r
  will-change: transform, filter;\r
}\r
\r
.content__img-inner {\r
  background-position: 50% 50%;\r
  width: calc(100% + 20px);\r
  height: calc(100% + 20px);\r
  background-size: cover;\r
  position: absolute;\r
  top: calc(-1 * 20px / 2);\r
  left: calc(-1 * 20px / 2);\r
}\r
`,B=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
\r
function lerp(a, b, n) {\r
  return (1 - n) * a + n * b;\r
}\r
\r
function getLocalPointerPos(e, rect) {\r
  let clientX = 0,\r
    clientY = 0;\r
  if (e.touches && e.touches.length > 0) {\r
    clientX = e.touches[0].clientX;\r
    clientY = e.touches[0].clientY;\r
  } else {\r
    clientX = e.clientX;\r
    clientY = e.clientY;\r
  }\r
  return {\r
    x: clientX - rect.left,\r
    y: clientY - rect.top\r
  };\r
}\r
function getMouseDistance(p1, p2) {\r
  const dx = p1.x - p2.x;\r
  const dy = p1.y - p2.y;\r
  return Math.hypot(dx, dy);\r
}\r
\r
class ImageItem {\r
  DOM = { el: null, inner: null };\r
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };\r
  rect = null;\r
\r
  constructor(DOM_el) {\r
    this.DOM.el = DOM_el;\r
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');\r
    this.getRect();\r
    this.initEvents();\r
  }\r
  initEvents() {\r
    this.resize = () => {\r
      gsap.set(this.DOM.el, this.defaultStyle);\r
      this.getRect();\r
    };\r
    window.addEventListener('resize', this.resize);\r
  }\r
  getRect() {\r
    this.rect = this.DOM.el.getBoundingClientRect();\r
  }\r
}\r
\r
class ImageTrailVariant1 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...this.DOM.el.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = this.container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = this.container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
\r
      requestAnimationFrame(() => this.render());\r
\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.4\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant2 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
\r
      requestAnimationFrame(() => this.render());\r
\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 2.8,\r
          filter: 'brightness(250%)'\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          filter: 'brightness(100%)'\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power2',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.45\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant3 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          xPercent: 0,\r
          yPercent: 0,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 1.2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.6,\r
          ease: 'power2',\r
          opacity: 0,\r
          scale: 0.2,\r
          xPercent: () => gsap.utils.random(-30, 30),\r
          yPercent: -200\r
        },\r
        0.6\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant4 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let distance = Math.sqrt(dx * dx + dy * dy);\r
    if (distance !== 0) {\r
      dx /= distance;\r
      dy /= distance;\r
    }\r
    dx *= distance / 100;\r
    dy *= distance / 100;\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 2,\r
          filter: \`brightness(\${Math.max((400 * distance) / 100, 100)}%) contrast(\${Math.max((400 * distance) / 100, 100)}%)\`\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          filter: 'brightness(100%) contrast(100%)'\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          opacity: 0\r
        },\r
        0.4\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 1.5,\r
          ease: 'power4',\r
          x: \`+=\${dx * 110}\`,\r
          y: \`+=\${dy * 110}\`\r
        },\r
        0.05\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant5 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
    this.lastAngle = 0;\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);\r
    if (angle < 0) angle += 360;\r
    if (angle > 90 && angle <= 270) angle += 180;\r
    const isMovingClockwise = angle >= this.lastAngle;\r
    this.lastAngle = angle;\r
    let startAngle = isMovingClockwise ? angle - 10 : angle + 10;\r
    let distance = Math.sqrt(dx * dx + dy * dy);\r
    if (distance !== 0) {\r
      dx /= distance;\r
      dy /= distance;\r
    }\r
    dx *= distance / 150;\r
    dy *= distance / 150;\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          filter: 'brightness(80%)',\r
          scale: 0.1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2,\r
          rotation: startAngle\r
        },\r
        {\r
          duration: 1,\r
          ease: 'power2',\r
          scale: 1,\r
          filter: 'brightness(100%)',\r
          x: this.mousePos.x - img.rect.width / 2 + dx * 70,\r
          y: this.mousePos.y - img.rect.height / 2 + dy * 70,\r
          rotation: this.lastAngle\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'expo',\r
          opacity: 0\r
        },\r
        0.5\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 1.5,\r
          ease: 'power4',\r
          x: \`+=\${dx * 120}\`,\r
          y: \`+=\${dy * 120}\`\r
        },\r
        0.05\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant6 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  mapSpeedToSize(speed, minSize, maxSize) {\r
    const maxSpeed = 200;\r
    return minSize + (maxSize - minSize) * Math.min(speed / maxSpeed, 1);\r
  }\r
  mapSpeedToBrightness(speed, minB, maxB) {\r
    const maxSpeed = 70;\r
    return minB + (maxB - minB) * Math.min(speed / maxSpeed, 1);\r
  }\r
  mapSpeedToBlur(speed, minBlur, maxBlur) {\r
    const maxSpeed = 90;\r
    return minBlur + (maxBlur - minBlur) * Math.min(speed / maxSpeed, 1);\r
  }\r
  mapSpeedToGrayscale(speed, minG, maxG) {\r
    const maxSpeed = 90;\r
    return minG + (maxG - minG) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  showNextImage() {\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let speed = Math.sqrt(dx * dx + dy * dy);\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    let scaleFactor = this.mapSpeedToSize(speed, 0.3, 2);\r
    let brightnessValue = this.mapSpeedToBrightness(speed, 0, 1.3);\r
    let blurValue = this.mapSpeedToBlur(speed, 20, 0);\r
    let grayscaleValue = this.mapSpeedToGrayscale(speed, 600, 0);\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.8,\r
          ease: 'power3',\r
          scale: scaleFactor,\r
          filter: \`grayscale(\${grayscaleValue * 100}%) brightness(\${brightnessValue * 100}%) blur(\${blurValue}px)\`,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 2\r
        },\r
        {\r
          duration: 0.8,\r
          ease: 'power3',\r
          scale: 1\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3.in',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.45\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
function getNewPosition(position, offset, arr) {\r
  const realOffset = Math.abs(offset) % arr.length;\r
  if (position - realOffset >= 0) {\r
    return position - realOffset;\r
  } else {\r
    return arr.length - (realOffset - position);\r
  }\r
}\r
class ImageTrailVariant7 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    this.visibleImagesCount = 0;\r
    this.visibleImagesTotal = 9;\r
    this.visibleImagesTotal = Math.min(this.visibleImagesTotal, this.imagesTotal - 1);\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    ++this.visibleImagesCount;\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    const scaleValue = gsap.utils.random(0.5, 1.6);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),\r
          rotationZ: 0,\r
          opacity: 1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          scale: scaleValue,\r
          rotationZ: gsap.utils.random(-3, 3),\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2\r
        },\r
        0\r
      );\r
\r
    if (this.visibleImagesCount >= this.visibleImagesTotal) {\r
      const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);\r
      const oldImg = this.images[lastInQueue];\r
      gsap.to(oldImg.DOM.el, {\r
        duration: 0.4,\r
        ease: 'power4',\r
        opacity: 0,\r
        scale: 1.3,\r
        onComplete: () => {\r
          if (this.activeImagesCount === 0) {\r
            this.isIdle = true;\r
          }\r
        }\r
      });\r
    }\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
  }\r
}\r
\r
class ImageTrailVariant8 {\r
  constructor(container) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    this.rotation = { x: 0, y: 0 };\r
    this.cachedRotation = { x: 0, y: 0 };\r
    this.zValue = 0;\r
    this.cachedZValue = 0;\r
\r
    const handlePointerMove = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = ev => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender);\r
      container.removeEventListener('touchmove', initRender);\r
    };\r
    container.addEventListener('mousemove', initRender);\r
    container.addEventListener('touchmove', initRender);\r
  }\r
\r
  render() {\r
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  showNextImage() {\r
    const rect = this.container.getBoundingClientRect();\r
    const centerX = rect.width / 2;\r
    const centerY = rect.height / 2;\r
    const relX = this.mousePos.x - centerX;\r
    const relY = this.mousePos.y - centerY;\r
\r
    this.rotation.x = -(relY / centerY) * 30;\r
    this.rotation.y = (relX / centerX) * 30;\r
    this.cachedRotation = { ...this.rotation };\r
\r
    const distanceFromCenter = Math.sqrt(relX * relX + relY * relY);\r
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);\r
    const proportion = distanceFromCenter / maxDistance;\r
    this.zValue = proportion * 1200 - 600;\r
    this.cachedZValue = this.zValue;\r
    const normalizedZ = (this.zValue + 600) / 1200;\r
    const brightness = 0.2 + normalizedZ * 2.3;\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .set(this.DOM.el, { perspective: 1000 }, 0)\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          z: 0,\r
          scale: 1 + this.cachedZValue / 1000,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - img.rect.width / 2,\r
          y: this.cacheMousePos.y - img.rect.height / 2,\r
          rotationX: this.cachedRotation.x,\r
          rotationY: this.cachedRotation.y,\r
          filter: \`brightness(\${brightness})\`\r
        },\r
        {\r
          duration: 1,\r
          ease: 'expo',\r
          scale: 1 + this.zValue / 1000,\r
          x: this.mousePos.x - img.rect.width / 2,\r
          y: this.mousePos.y - img.rect.height / 2,\r
          rotationX: this.rotation.x,\r
          rotationY: this.rotation.y\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power2',\r
          opacity: 0,\r
          z: -800\r
        },\r
        0.3\r
      );\r
  }\r
\r
  onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
  onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
const variantMap = {\r
  1: ImageTrailVariant1,\r
  2: ImageTrailVariant2,\r
  3: ImageTrailVariant3,\r
  4: ImageTrailVariant4,\r
  5: ImageTrailVariant5,\r
  6: ImageTrailVariant6,\r
  7: ImageTrailVariant7,\r
  8: ImageTrailVariant8\r
};\r
\r
export default function ImageTrail({ items = [], variant = 1 }) {\r
  const containerRef = useRef(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
\r
    const Cls = variantMap[variant] || variantMap[1];\r
    new Cls(containerRef.current);\r
  }, [variant, items]);\r
\r
  return (\r
    <div className="w-full h-full relative z-[100] rounded-lg bg-transparent overflow-visible" ref={containerRef}>\r
      {items.map((url, i) => (\r
        <div\r
          className="content__img w-[190px] aspect-[1.1] rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden [will-change:transform,filter]"\r
          key={i}\r
        >\r
          <div\r
            className="content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]"\r
            style={{ backgroundImage: \`url(\${url})\` }}\r
          />\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
`,q=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
import './ImageTrail.css';\r
\r
function lerp(a: number, b: number, n: number): number {\r
  return (1 - n) * a + n * b;\r
}\r
\r
function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect): { x: number; y: number } {\r
  let clientX = 0,\r
    clientY = 0;\r
  if ('touches' in e && e.touches.length > 0) {\r
    clientX = e.touches[0].clientX;\r
    clientY = e.touches[0].clientY;\r
  } else if ('clientX' in e) {\r
    clientX = e.clientX;\r
    clientY = e.clientY;\r
  }\r
  return {\r
    x: clientX - rect.left,\r
    y: clientY - rect.top\r
  };\r
}\r
\r
function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {\r
  const dx = p1.x - p2.x;\r
  const dy = p1.y - p2.y;\r
  return Math.hypot(dx, dy);\r
}\r
\r
class ImageItem {\r
  public DOM: { el: HTMLDivElement; inner: HTMLDivElement | null } = {\r
    el: null as unknown as HTMLDivElement,\r
    inner: null\r
  };\r
  public defaultStyle: gsap.TweenVars = { scale: 1, x: 0, y: 0, opacity: 0 };\r
  public rect: DOMRect | null = null;\r
  private resize!: () => void;\r
\r
  constructor(DOM_el: HTMLDivElement) {\r
    this.DOM.el = DOM_el;\r
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');\r
    this.getRect();\r
    this.initEvents();\r
  }\r
\r
  private initEvents() {\r
    this.resize = () => {\r
      gsap.set(this.DOM.el, this.defaultStyle);\r
      this.getRect();\r
    };\r
    window.addEventListener('resize', this.resize);\r
  }\r
\r
  private getRect() {\r
    this.rect = this.DOM.el.getBoundingClientRect();\r
  }\r
}\r
\r
class ImageTrailVariant1 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = this.container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = this.container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.4\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant2 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        { scale: 2.8, filter: 'brightness(250%)' },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          filter: 'brightness(100%)'\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power2',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.45\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant3 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          xPercent: 0,\r
          yPercent: 0,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        { scale: 1.2 },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.6,\r
          ease: 'power2',\r
          opacity: 0,\r
          scale: 0.2,\r
          xPercent: () => gsap.utils.random(-30, 30),\r
          yPercent: -200\r
        },\r
        0.6\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant4 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let distance = Math.sqrt(dx * dx + dy * dy);\r
    if (distance !== 0) {\r
      dx /= distance;\r
      dy /= distance;\r
    }\r
    dx *= distance / 100;\r
    dy *= distance / 100;\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 2,\r
          filter: \`brightness(\${Math.max((400 * distance) / 100, 100)}%) contrast(\${Math.max(\r
            (400 * distance) / 100,\r
            100\r
          )}%)\`\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          filter: 'brightness(100%) contrast(100%)'\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          opacity: 0\r
        },\r
        0.4\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 1.5,\r
          ease: 'power4',\r
          x: \`+=\${dx * 110}\`,\r
          y: \`+=\${dy * 110}\`\r
        },\r
        0.05\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant5 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
  private lastAngle: number;\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
    this.lastAngle = 0;\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);\r
    if (angle < 0) angle += 360;\r
    if (angle > 90 && angle <= 270) angle += 180;\r
    const isMovingClockwise = angle >= this.lastAngle;\r
    this.lastAngle = angle;\r
    let startAngle = isMovingClockwise ? angle - 10 : angle + 10;\r
    const distance = Math.sqrt(dx * dx + dy * dy);\r
    if (distance !== 0) {\r
      dx /= distance;\r
      dy /= distance;\r
    }\r
    dx *= distance / 150;\r
    dy *= distance / 150;\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          filter: 'brightness(80%)',\r
          scale: 0.1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,\r
          rotation: startAngle\r
        },\r
        {\r
          duration: 1,\r
          ease: 'power2',\r
          scale: 1,\r
          filter: 'brightness(100%)',\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2 + dx * 70,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2 + dy * 70,\r
          rotation: this.lastAngle\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'expo',\r
          opacity: 0\r
        },\r
        0.5\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 1.5,\r
          ease: 'power4',\r
          x: \`+=\${dx * 120}\`,\r
          y: \`+=\${dy * 120}\`\r
        },\r
        0.05\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant6 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private mapSpeedToSize(speed: number, minSize: number, maxSize: number) {\r
    const maxSpeed = 200;\r
    return minSize + (maxSize - minSize) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  private mapSpeedToBrightness(speed: number, minB: number, maxB: number) {\r
    const maxSpeed = 70;\r
    return minB + (maxB - minB) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  private mapSpeedToBlur(speed: number, minBlur: number, maxBlur: number) {\r
    const maxSpeed = 90;\r
    return minBlur + (maxBlur - minBlur) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  private mapSpeedToGrayscale(speed: number, minG: number, maxG: number) {\r
    const maxSpeed = 90;\r
    return minG + (maxG - minG) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  private showNextImage() {\r
    const dx = this.mousePos.x - this.cacheMousePos.x;\r
    const dy = this.mousePos.y - this.cacheMousePos.y;\r
    const speed = Math.sqrt(dx * dx + dy * dy);\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    const scaleFactor = this.mapSpeedToSize(speed, 0.3, 2);\r
    const brightnessValue = this.mapSpeedToBrightness(speed, 0, 1.3);\r
    const blurValue = this.mapSpeedToBlur(speed, 20, 0);\r
    const grayscaleValue = this.mapSpeedToGrayscale(speed, 600, 0);\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.8,\r
          ease: 'power3',\r
          scale: scaleFactor,\r
          filter: \`grayscale(\${grayscaleValue * 100}%) brightness(\${brightnessValue * 100}%) blur(\${blurValue}px)\`,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        { scale: 2 },\r
        {\r
          duration: 0.8,\r
          ease: 'power3',\r
          scale: 1\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3.in',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.45\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
function getNewPosition(position: number, offset: number, arr: ImageItem[]) {\r
  const realOffset = Math.abs(offset) % arr.length;\r
  if (position - realOffset >= 0) {\r
    return position - realOffset;\r
  } else {\r
    return arr.length - (realOffset - position);\r
  }\r
}\r
\r
class ImageTrailVariant7 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
  private visibleImagesCount: number;\r
  private visibleImagesTotal: number;\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
    this.visibleImagesCount = 0;\r
    this.visibleImagesTotal = 9;\r
    this.visibleImagesTotal = Math.min(this.visibleImagesTotal, this.imagesTotal - 1);\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    ++this.visibleImagesCount;\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    const scaleValue = gsap.utils.random(0.5, 1.6);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),\r
          rotationZ: 0,\r
          opacity: 1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          scale: scaleValue,\r
          rotationZ: gsap.utils.random(-3, 3),\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      );\r
\r
    if (this.visibleImagesCount >= this.visibleImagesTotal) {\r
      const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);\r
      const oldImg = this.images[lastInQueue];\r
      gsap.to(oldImg.DOM.el, {\r
        duration: 0.4,\r
        ease: 'power4',\r
        opacity: 0,\r
        scale: 1.3,\r
        onComplete: () => {\r
          if (this.activeImagesCount === 0) {\r
            this.isIdle = true;\r
          }\r
        }\r
      });\r
    }\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
  }\r
}\r
\r
class ImageTrailVariant8 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
  private rotation: { x: number; y: number };\r
  private cachedRotation: { x: number; y: number };\r
  private zValue: number;\r
  private cachedZValue: number;\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
    this.rotation = { x: 0, y: 0 };\r
    this.cachedRotation = { x: 0, y: 0 };\r
    this.zValue = 0;\r
    this.cachedZValue = 0;\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    const rect = this.container.getBoundingClientRect();\r
    const centerX = rect.width / 2;\r
    const centerY = rect.height / 2;\r
    const relX = this.mousePos.x - centerX;\r
    const relY = this.mousePos.y - centerY;\r
\r
    this.rotation.x = -(relY / centerY) * 30;\r
    this.rotation.y = (relX / centerX) * 30;\r
    this.cachedRotation = { ...this.rotation };\r
\r
    const distanceFromCenter = Math.sqrt(relX * relX + relY * relY);\r
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);\r
    const proportion = distanceFromCenter / maxDistance;\r
    this.zValue = proportion * 1200 - 600;\r
    this.cachedZValue = this.zValue;\r
    const normalizedZ = (this.zValue + 600) / 1200;\r
    const brightness = 0.2 + normalizedZ * 2.3;\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .set(this.DOM.el, { perspective: 1000 }, 0)\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          z: 0,\r
          scale: 1 + this.cachedZValue / 1000,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,\r
          rotationX: this.cachedRotation.x,\r
          rotationY: this.cachedRotation.y,\r
          filter: \`brightness(\${brightness})\`\r
        },\r
        {\r
          duration: 1,\r
          ease: 'expo',\r
          scale: 1 + this.zValue / 1000,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2,\r
          rotationX: this.rotation.x,\r
          rotationY: this.rotation.y\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power2',\r
          opacity: 0,\r
          z: -800\r
        },\r
        0.3\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
type ImageTrailConstructor =\r
  | typeof ImageTrailVariant1\r
  | typeof ImageTrailVariant2\r
  | typeof ImageTrailVariant3\r
  | typeof ImageTrailVariant4\r
  | typeof ImageTrailVariant5\r
  | typeof ImageTrailVariant6\r
  | typeof ImageTrailVariant7\r
  | typeof ImageTrailVariant8;\r
\r
const variantMap: Record<number, ImageTrailConstructor> = {\r
  1: ImageTrailVariant1,\r
  2: ImageTrailVariant2,\r
  3: ImageTrailVariant3,\r
  4: ImageTrailVariant4,\r
  5: ImageTrailVariant5,\r
  6: ImageTrailVariant6,\r
  7: ImageTrailVariant7,\r
  8: ImageTrailVariant8\r
};\r
\r
interface ImageTrailProps {\r
  items?: string[];\r
  variant?: number;\r
}\r
\r
export default function ImageTrail({ items = [], variant = 1 }: ImageTrailProps): JSX.Element {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const Cls = variantMap[variant] || variantMap[1];\r
    new Cls(containerRef.current);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [variant, items]);\r
\r
  return (\r
    <div className="content" ref={containerRef}>\r
      {items.map((url, i) => (\r
        <div className="content__img" key={i}>\r
          <div className="content__img-inner" style={{ backgroundImage: \`url(\${url})\` }} />\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
`,_=`import { useRef, useEffect } from 'react';\r
import { gsap } from 'gsap';\r
\r
function lerp(a: number, b: number, n: number): number {\r
  return (1 - n) * a + n * b;\r
}\r
\r
function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect): { x: number; y: number } {\r
  let clientX = 0,\r
    clientY = 0;\r
  if ('touches' in e && e.touches.length > 0) {\r
    clientX = e.touches[0].clientX;\r
    clientY = e.touches[0].clientY;\r
  } else if ('clientX' in e) {\r
    clientX = e.clientX;\r
    clientY = e.clientY;\r
  }\r
  return {\r
    x: clientX - rect.left,\r
    y: clientY - rect.top\r
  };\r
}\r
\r
function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {\r
  const dx = p1.x - p2.x;\r
  const dy = p1.y - p2.y;\r
  return Math.hypot(dx, dy);\r
}\r
\r
class ImageItem {\r
  public DOM: { el: HTMLDivElement; inner: HTMLDivElement | null } = {\r
    el: null as unknown as HTMLDivElement,\r
    inner: null\r
  };\r
  public defaultStyle: gsap.TweenVars = { scale: 1, x: 0, y: 0, opacity: 0 };\r
  public rect: DOMRect | null = null;\r
  private resize!: () => void;\r
\r
  constructor(DOM_el: HTMLDivElement) {\r
    this.DOM.el = DOM_el;\r
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');\r
    this.getRect();\r
    this.initEvents();\r
  }\r
\r
  private initEvents() {\r
    this.resize = () => {\r
      gsap.set(this.DOM.el, this.defaultStyle);\r
      this.getRect();\r
    };\r
    window.addEventListener('resize', this.resize);\r
  }\r
\r
  private getRect() {\r
    this.rect = this.DOM.el.getBoundingClientRect();\r
  }\r
}\r
\r
class ImageTrailVariant1 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = this.container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = this.container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.4\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant2 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        { scale: 2.8, filter: 'brightness(250%)' },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          filter: 'brightness(100%)'\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power2',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.45\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant3 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          xPercent: 0,\r
          yPercent: 0,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        { scale: 1.2 },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.6,\r
          ease: 'power2',\r
          opacity: 0,\r
          scale: 0.2,\r
          xPercent: () => gsap.utils.random(-30, 30),\r
          yPercent: -200\r
        },\r
        0.6\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant4 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let distance = Math.sqrt(dx * dx + dy * dy);\r
    if (distance !== 0) {\r
      dx /= distance;\r
      dy /= distance;\r
    }\r
    dx *= distance / 100;\r
    dy *= distance / 100;\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        {\r
          scale: 2,\r
          filter: \`brightness(\${Math.max((400 * distance) / 100, 100)}%) contrast(\${Math.max(\r
            (400 * distance) / 100,\r
            100\r
          )}%)\`\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power1',\r
          scale: 1,\r
          filter: 'brightness(100%) contrast(100%)'\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          opacity: 0\r
        },\r
        0.4\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 1.5,\r
          ease: 'power4',\r
          x: \`+=\${dx * 110}\`,\r
          y: \`+=\${dy * 110}\`\r
        },\r
        0.05\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
class ImageTrailVariant5 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
  private lastAngle: number;\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
    this.lastAngle = 0;\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    let dx = this.mousePos.x - this.cacheMousePos.x;\r
    let dy = this.mousePos.y - this.cacheMousePos.y;\r
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);\r
    if (angle < 0) angle += 360;\r
    if (angle > 90 && angle <= 270) angle += 180;\r
    const isMovingClockwise = angle >= this.lastAngle;\r
    this.lastAngle = angle;\r
    let startAngle = isMovingClockwise ? angle - 10 : angle + 10;\r
    const distance = Math.sqrt(dx * dx + dy * dy);\r
    if (distance !== 0) {\r
      dx /= distance;\r
      dy /= distance;\r
    }\r
    dx *= distance / 150;\r
    dy *= distance / 150;\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          filter: 'brightness(80%)',\r
          scale: 0.1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,\r
          rotation: startAngle\r
        },\r
        {\r
          duration: 1,\r
          ease: 'power2',\r
          scale: 1,\r
          filter: 'brightness(100%)',\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2 + dx * 70,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2 + dy * 70,\r
          rotation: this.lastAngle\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'expo',\r
          opacity: 0\r
        },\r
        0.5\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 1.5,\r
          ease: 'power4',\r
          x: \`+=\${dx * 120}\`,\r
          y: \`+=\${dy * 120}\`\r
        },\r
        0.05\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) this.isIdle = true;\r
  }\r
}\r
\r
class ImageTrailVariant6 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private mapSpeedToSize(speed: number, minSize: number, maxSize: number) {\r
    const maxSpeed = 200;\r
    return minSize + (maxSize - minSize) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  private mapSpeedToBrightness(speed: number, minB: number, maxB: number) {\r
    const maxSpeed = 70;\r
    return minB + (maxB - minB) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  private mapSpeedToBlur(speed: number, minBlur: number, maxBlur: number) {\r
    const maxSpeed = 90;\r
    return minBlur + (maxBlur - minBlur) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  private mapSpeedToGrayscale(speed: number, minG: number, maxG: number) {\r
    const maxSpeed = 90;\r
    return minG + (maxG - minG) * Math.min(speed / maxSpeed, 1);\r
  }\r
\r
  private showNextImage() {\r
    const dx = this.mousePos.x - this.cacheMousePos.x;\r
    const dy = this.mousePos.y - this.cacheMousePos.y;\r
    const speed = Math.sqrt(dx * dx + dy * dy);\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
\r
    const scaleFactor = this.mapSpeedToSize(speed, 0.3, 2);\r
    const brightnessValue = this.mapSpeedToBrightness(speed, 0, 1.3);\r
    const blurValue = this.mapSpeedToBlur(speed, 20, 0);\r
    const grayscaleValue = this.mapSpeedToGrayscale(speed, 600, 0);\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          scale: 0,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.8,\r
          ease: 'power3',\r
          scale: scaleFactor,\r
          filter: \`grayscale(\${grayscaleValue * 100}%) brightness(\${brightnessValue * 100}%) blur(\${blurValue}px)\`,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      )\r
      .fromTo(\r
        img.DOM.inner,\r
        { scale: 2 },\r
        {\r
          duration: 0.8,\r
          ease: 'power3',\r
          scale: 1\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power3.in',\r
          opacity: 0,\r
          scale: 0.2\r
        },\r
        0.45\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
function getNewPosition(position: number, offset: number, arr: ImageItem[]) {\r
  const realOffset = Math.abs(offset) % arr.length;\r
  if (position - realOffset >= 0) {\r
    return position - realOffset;\r
  } else {\r
    return arr.length - (realOffset - position);\r
  }\r
}\r
\r
class ImageTrailVariant7 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
  private visibleImagesCount: number;\r
  private visibleImagesTotal: number;\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
    this.visibleImagesCount = 0;\r
    this.visibleImagesTotal = 9;\r
    this.visibleImagesTotal = Math.min(this.visibleImagesTotal, this.imagesTotal - 1);\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;\r
\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    ++this.visibleImagesCount;\r
\r
    gsap.killTweensOf(img.DOM.el);\r
    const scaleValue = gsap.utils.random(0.5, 1.6);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),\r
          rotationZ: 0,\r
          opacity: 1,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        {\r
          duration: 0.4,\r
          ease: 'power3',\r
          scale: scaleValue,\r
          rotationZ: gsap.utils.random(-3, 3),\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2\r
        },\r
        0\r
      );\r
\r
    if (this.visibleImagesCount >= this.visibleImagesTotal) {\r
      const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);\r
      const oldImg = this.images[lastInQueue];\r
      gsap.to(oldImg.DOM.el, {\r
        duration: 0.4,\r
        ease: 'power4',\r
        opacity: 0,\r
        scale: 1.3,\r
        onComplete: () => {\r
          if (this.activeImagesCount === 0) {\r
            this.isIdle = true;\r
          }\r
        }\r
      });\r
    }\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
  }\r
}\r
\r
class ImageTrailVariant8 {\r
  private container: HTMLDivElement;\r
  private DOM: { el: HTMLDivElement };\r
  private images: ImageItem[];\r
  private imagesTotal: number;\r
  private imgPosition: number;\r
  private zIndexVal: number;\r
  private activeImagesCount: number;\r
  private isIdle: boolean;\r
  private threshold: number;\r
  private mousePos: { x: number; y: number };\r
  private lastMousePos: { x: number; y: number };\r
  private cacheMousePos: { x: number; y: number };\r
  private rotation: { x: number; y: number };\r
  private cachedRotation: { x: number; y: number };\r
  private zValue: number;\r
  private cachedZValue: number;\r
\r
  constructor(container: HTMLDivElement) {\r
    this.container = container;\r
    this.DOM = { el: container };\r
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img as HTMLDivElement));\r
    this.imagesTotal = this.images.length;\r
    this.imgPosition = 0;\r
    this.zIndexVal = 1;\r
    this.activeImagesCount = 0;\r
    this.isIdle = true;\r
    this.threshold = 80;\r
    this.mousePos = { x: 0, y: 0 };\r
    this.lastMousePos = { x: 0, y: 0 };\r
    this.cacheMousePos = { x: 0, y: 0 };\r
    this.rotation = { x: 0, y: 0 };\r
    this.cachedRotation = { x: 0, y: 0 };\r
    this.zValue = 0;\r
    this.cachedZValue = 0;\r
\r
    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
    };\r
    container.addEventListener('mousemove', handlePointerMove);\r
    container.addEventListener('touchmove', handlePointerMove);\r
\r
    const initRender = (ev: MouseEvent | TouchEvent) => {\r
      const rect = container.getBoundingClientRect();\r
      this.mousePos = getLocalPointerPos(ev, rect);\r
      this.cacheMousePos = { ...this.mousePos };\r
      requestAnimationFrame(() => this.render());\r
      container.removeEventListener('mousemove', initRender as EventListener);\r
      container.removeEventListener('touchmove', initRender as EventListener);\r
    };\r
    container.addEventListener('mousemove', initRender as EventListener);\r
    container.addEventListener('touchmove', initRender as EventListener);\r
  }\r
\r
  private render() {\r
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);\r
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);\r
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);\r
\r
    if (distance > this.threshold) {\r
      this.showNextImage();\r
      this.lastMousePos = { ...this.mousePos };\r
    }\r
    if (this.isIdle && this.zIndexVal !== 1) {\r
      this.zIndexVal = 1;\r
    }\r
    requestAnimationFrame(() => this.render());\r
  }\r
\r
  private showNextImage() {\r
    const rect = this.container.getBoundingClientRect();\r
    const centerX = rect.width / 2;\r
    const centerY = rect.height / 2;\r
    const relX = this.mousePos.x - centerX;\r
    const relY = this.mousePos.y - centerY;\r
\r
    this.rotation.x = -(relY / centerY) * 30;\r
    this.rotation.y = (relX / centerX) * 30;\r
    this.cachedRotation = { ...this.rotation };\r
\r
    const distanceFromCenter = Math.sqrt(relX * relX + relY * relY);\r
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);\r
    const proportion = distanceFromCenter / maxDistance;\r
    this.zValue = proportion * 1200 - 600;\r
    this.cachedZValue = this.zValue;\r
    const normalizedZ = (this.zValue + 600) / 1200;\r
    const brightness = 0.2 + normalizedZ * 2.3;\r
\r
    ++this.zIndexVal;\r
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;\r
    const img = this.images[this.imgPosition];\r
    gsap.killTweensOf(img.DOM.el);\r
\r
    gsap\r
      .timeline({\r
        onStart: () => this.onImageActivated(),\r
        onComplete: () => this.onImageDeactivated()\r
      })\r
      .set(this.DOM.el, { perspective: 1000 }, 0)\r
      .fromTo(\r
        img.DOM.el,\r
        {\r
          opacity: 1,\r
          z: 0,\r
          scale: 1 + this.cachedZValue / 1000,\r
          zIndex: this.zIndexVal,\r
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,\r
          rotationX: this.cachedRotation.x,\r
          rotationY: this.cachedRotation.y,\r
          filter: \`brightness(\${brightness})\`\r
        },\r
        {\r
          duration: 1,\r
          ease: 'expo',\r
          scale: 1 + this.zValue / 1000,\r
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,\r
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2,\r
          rotationX: this.rotation.x,\r
          rotationY: this.rotation.y\r
        },\r
        0\r
      )\r
      .to(\r
        img.DOM.el,\r
        {\r
          duration: 0.4,\r
          ease: 'power2',\r
          opacity: 0,\r
          z: -800\r
        },\r
        0.3\r
      );\r
  }\r
\r
  private onImageActivated() {\r
    this.activeImagesCount++;\r
    this.isIdle = false;\r
  }\r
\r
  private onImageDeactivated() {\r
    this.activeImagesCount--;\r
    if (this.activeImagesCount === 0) {\r
      this.isIdle = true;\r
    }\r
  }\r
}\r
\r
type ImageTrailConstructor =\r
  | typeof ImageTrailVariant1\r
  | typeof ImageTrailVariant2\r
  | typeof ImageTrailVariant3\r
  | typeof ImageTrailVariant4\r
  | typeof ImageTrailVariant5\r
  | typeof ImageTrailVariant6\r
  | typeof ImageTrailVariant7\r
  | typeof ImageTrailVariant8;\r
\r
const variantMap: Record<number, ImageTrailConstructor> = {\r
  1: ImageTrailVariant1,\r
  2: ImageTrailVariant2,\r
  3: ImageTrailVariant3,\r
  4: ImageTrailVariant4,\r
  5: ImageTrailVariant5,\r
  6: ImageTrailVariant6,\r
  7: ImageTrailVariant7,\r
  8: ImageTrailVariant8\r
};\r
\r
interface ImageTrailProps {\r
  items?: string[];\r
  variant?: number;\r
}\r
\r
export default function ImageTrail({ items = [], variant = 1 }: ImageTrailProps): JSX.Element {\r
  const containerRef = useRef<HTMLDivElement>(null);\r
\r
  useEffect(() => {\r
    if (!containerRef.current) return;\r
    const Cls = variantMap[variant] || variantMap[1];\r
    new Cls(containerRef.current);\r
    // eslint-disable-next-line react-hooks/exhaustive-deps\r
  }, [variant, items]);\r
\r
  return (\r
    <div className="w-full h-full relative z-[100] rounded-lg bg-transparent overflow-visible" ref={containerRef}>\r
      {items.map((url, i) => (\r
        <div\r
          className="content__img w-[190px] aspect-[1.1] rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden [will-change:transform,filter]"\r
          key={i}\r
        >\r
          <div\r
            className="content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]"\r
            style={{ backgroundImage: \`url(\${url})\` }}\r
          />\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
`,N={dependencies:"gsap",usage:`import ImageTrail from './ImageTrail;'

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <ImageTrail
    key={key}
    items={[
      'https://picsum.photos/id/287/300/300',
      'https://picsum.photos/id/1001/300/300',
      'https://picsum.photos/id/1025/300/300',
      'https://picsum.photos/id/1026/300/300',
      'https://picsum.photos/id/1027/300/300',
      'https://picsum.photos/id/1028/300/300',
      'https://picsum.photos/id/1029/300/300',
      'https://picsum.photos/id/1030/300/300',
      // ...
    ]}
    variant={1}
  />
</div>`,code:A,css:S,tailwind:B,tsCode:q,tsTailwind:_};function h(i,e,t){return(1-t)*i+t*e}function c(i,e){let t=0,n=0;return i.touches&&i.touches.length>0?(t=i.touches[0].clientX,n=i.touches[0].clientY):(t=i.clientX,n=i.clientY),{x:t-e.left,y:n-e.top}}function u(i,e){const t=i.x-e.x,n=i.y-e.y;return Math.hypot(t,n)}class d{constructor(e){v(this,"DOM",{el:null,inner:null});v(this,"defaultStyle",{scale:1,x:0,y:0,opacity:0});v(this,"rect",null);this.DOM.el=e,this.DOM.inner=this.DOM.el.querySelector(".content__img-inner"),this.getRect(),this.initEvents()}initEvents(){this.resize=()=>{o.set(this.DOM.el,this.defaultStyle),this.getRect()},window.addEventListener("resize",this.resize)}getRect(){this.rect=this.DOM.el.getBoundingClientRect()}}class F{constructor(e){this.container=e,this.DOM={el:e},this.images=[...this.DOM.el.querySelectorAll(".content__img")].map(r=>new d(r)),this.imagesTotal=this.images.length,this.imgPosition=0,this.zIndexVal=1,this.activeImagesCount=0,this.isIdle=!0,this.threshold=80,this.mousePos={x:0,y:0},this.lastMousePos={x:0,y:0},this.cacheMousePos={x:0,y:0};const t=r=>{const s=this.container.getBoundingClientRect();this.mousePos=c(r,s)};e.addEventListener("mousemove",t),e.addEventListener("touchmove",t);const n=r=>{const s=this.container.getBoundingClientRect();this.mousePos=c(r,s),this.cacheMousePos={...this.mousePos},requestAnimationFrame(()=>this.render()),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n)};e.addEventListener("mousemove",n),e.addEventListener("touchmove",n)}render(){let e=u(this.mousePos,this.lastMousePos);this.cacheMousePos.x=h(this.cacheMousePos.x,this.mousePos.x,.1),this.cacheMousePos.y=h(this.cacheMousePos.y,this.mousePos.y,.1),e>this.threshold&&(this.showNextImage(),this.lastMousePos={...this.mousePos}),this.isIdle&&this.zIndexVal!==1&&(this.zIndexVal=1),requestAnimationFrame(()=>this.render())}showNextImage(){++this.zIndexVal,this.imgPosition=this.imgPosition<this.imagesTotal-1?this.imgPosition+1:0;const e=this.images[this.imgPosition];o.killTweensOf(e.DOM.el),o.timeline({onStart:()=>this.onImageActivated(),onComplete:()=>this.onImageDeactivated()}).fromTo(e.DOM.el,{opacity:1,scale:1,zIndex:this.zIndexVal,x:this.cacheMousePos.x-e.rect.width/2,y:this.cacheMousePos.y-e.rect.height/2},{duration:.4,ease:"power1",x:this.mousePos.x-e.rect.width/2,y:this.mousePos.y-e.rect.height/2},0).to(e.DOM.el,{duration:.4,ease:"power3",opacity:0,scale:.2},.4)}onImageActivated(){this.activeImagesCount++,this.isIdle=!1}onImageDeactivated(){this.activeImagesCount--,this.activeImagesCount===0&&(this.isIdle=!0)}}class X{constructor(e){this.container=e,this.DOM={el:e},this.images=[...e.querySelectorAll(".content__img")].map(r=>new d(r)),this.imagesTotal=this.images.length,this.imgPosition=0,this.zIndexVal=1,this.activeImagesCount=0,this.isIdle=!0,this.threshold=80,this.mousePos={x:0,y:0},this.lastMousePos={x:0,y:0},this.cacheMousePos={x:0,y:0};const t=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s)};e.addEventListener("mousemove",t),e.addEventListener("touchmove",t);const n=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s),this.cacheMousePos={...this.mousePos},requestAnimationFrame(()=>this.render()),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n)};e.addEventListener("mousemove",n),e.addEventListener("touchmove",n)}render(){let e=u(this.mousePos,this.lastMousePos);this.cacheMousePos.x=h(this.cacheMousePos.x,this.mousePos.x,.1),this.cacheMousePos.y=h(this.cacheMousePos.y,this.mousePos.y,.1),e>this.threshold&&(this.showNextImage(),this.lastMousePos={...this.mousePos}),this.isIdle&&this.zIndexVal!==1&&(this.zIndexVal=1),requestAnimationFrame(()=>this.render())}showNextImage(){++this.zIndexVal,this.imgPosition=this.imgPosition<this.imagesTotal-1?this.imgPosition+1:0;const e=this.images[this.imgPosition];o.killTweensOf(e.DOM.el),o.timeline({onStart:()=>this.onImageActivated(),onComplete:()=>this.onImageDeactivated()}).fromTo(e.DOM.el,{opacity:1,scale:0,zIndex:this.zIndexVal,x:this.cacheMousePos.x-e.rect.width/2,y:this.cacheMousePos.y-e.rect.height/2},{duration:.4,ease:"power1",scale:1,x:this.mousePos.x-e.rect.width/2,y:this.mousePos.y-e.rect.height/2},0).fromTo(e.DOM.inner,{scale:2.8,filter:"brightness(250%)"},{duration:.4,ease:"power1",scale:1,filter:"brightness(100%)"},0).to(e.DOM.el,{duration:.4,ease:"power2",opacity:0,scale:.2},.45)}onImageActivated(){this.activeImagesCount++,this.isIdle=!1}onImageDeactivated(){this.activeImagesCount--,this.activeImagesCount===0&&(this.isIdle=!0)}}class H{constructor(e){this.container=e,this.DOM={el:e},this.images=[...e.querySelectorAll(".content__img")].map(r=>new d(r)),this.imagesTotal=this.images.length,this.imgPosition=0,this.zIndexVal=1,this.activeImagesCount=0,this.isIdle=!0,this.threshold=80,this.mousePos={x:0,y:0},this.lastMousePos={x:0,y:0},this.cacheMousePos={x:0,y:0};const t=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s)};e.addEventListener("mousemove",t),e.addEventListener("touchmove",t);const n=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s),this.cacheMousePos={...this.mousePos},requestAnimationFrame(()=>this.render()),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n)};e.addEventListener("mousemove",n),e.addEventListener("touchmove",n)}render(){let e=u(this.mousePos,this.lastMousePos);this.cacheMousePos.x=h(this.cacheMousePos.x,this.mousePos.x,.1),this.cacheMousePos.y=h(this.cacheMousePos.y,this.mousePos.y,.1),e>this.threshold&&(this.showNextImage(),this.lastMousePos={...this.mousePos}),this.isIdle&&this.zIndexVal!==1&&(this.zIndexVal=1),requestAnimationFrame(()=>this.render())}showNextImage(){++this.zIndexVal,this.imgPosition=this.imgPosition<this.imagesTotal-1?this.imgPosition+1:0;const e=this.images[this.imgPosition];o.killTweensOf(e.DOM.el),o.timeline({onStart:()=>this.onImageActivated(),onComplete:()=>this.onImageDeactivated()}).fromTo(e.DOM.el,{opacity:1,scale:0,zIndex:this.zIndexVal,xPercent:0,yPercent:0,x:this.cacheMousePos.x-e.rect.width/2,y:this.cacheMousePos.y-e.rect.height/2},{duration:.4,ease:"power1",scale:1,x:this.mousePos.x-e.rect.width/2,y:this.mousePos.y-e.rect.height/2},0).fromTo(e.DOM.inner,{scale:1.2},{duration:.4,ease:"power1",scale:1},0).to(e.DOM.el,{duration:.6,ease:"power2",opacity:0,scale:.2,xPercent:()=>o.utils.random(-30,30),yPercent:-200},.6)}onImageActivated(){this.activeImagesCount++,this.isIdle=!1}onImageDeactivated(){this.activeImagesCount--,this.activeImagesCount===0&&(this.isIdle=!0)}}class Y{constructor(e){this.container=e,this.DOM={el:e},this.images=[...e.querySelectorAll(".content__img")].map(r=>new d(r)),this.imagesTotal=this.images.length,this.imgPosition=0,this.zIndexVal=1,this.activeImagesCount=0,this.isIdle=!0,this.threshold=80,this.mousePos={x:0,y:0},this.lastMousePos={x:0,y:0},this.cacheMousePos={x:0,y:0};const t=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s)};e.addEventListener("mousemove",t),e.addEventListener("touchmove",t);const n=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s),this.cacheMousePos={...this.mousePos},requestAnimationFrame(()=>this.render()),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n)};e.addEventListener("mousemove",n),e.addEventListener("touchmove",n)}render(){u(this.mousePos,this.lastMousePos)>this.threshold&&(this.showNextImage(),this.lastMousePos={...this.mousePos}),this.cacheMousePos.x=h(this.cacheMousePos.x,this.mousePos.x,.1),this.cacheMousePos.y=h(this.cacheMousePos.y,this.mousePos.y,.1),this.isIdle&&this.zIndexVal!==1&&(this.zIndexVal=1),requestAnimationFrame(()=>this.render())}showNextImage(){++this.zIndexVal,this.imgPosition=this.imgPosition<this.imagesTotal-1?this.imgPosition+1:0;const e=this.images[this.imgPosition];o.killTweensOf(e.DOM.el);let t=this.mousePos.x-this.cacheMousePos.x,n=this.mousePos.y-this.cacheMousePos.y,r=Math.sqrt(t*t+n*n);r!==0&&(t/=r,n/=r),t*=r/100,n*=r/100,o.timeline({onStart:()=>this.onImageActivated(),onComplete:()=>this.onImageDeactivated()}).fromTo(e.DOM.el,{opacity:1,scale:0,zIndex:this.zIndexVal,x:this.cacheMousePos.x-e.rect.width/2,y:this.cacheMousePos.y-e.rect.height/2},{duration:.4,ease:"power1",scale:1,x:this.mousePos.x-e.rect.width/2,y:this.mousePos.y-e.rect.height/2},0).fromTo(e.DOM.inner,{scale:2,filter:`brightness(${Math.max(400*r/100,100)}%) contrast(${Math.max(400*r/100,100)}%)`},{duration:.4,ease:"power1",scale:1,filter:"brightness(100%) contrast(100%)"},0).to(e.DOM.el,{duration:.4,ease:"power3",opacity:0},.4).to(e.DOM.el,{duration:1.5,ease:"power4",x:`+=${t*110}`,y:`+=${n*110}`},.05)}onImageActivated(){this.activeImagesCount++,this.isIdle=!1}onImageDeactivated(){this.activeImagesCount--,this.activeImagesCount===0&&(this.isIdle=!0)}}class k{constructor(e){this.container=e,this.DOM={el:e},this.images=[...e.querySelectorAll(".content__img")].map(r=>new d(r)),this.imagesTotal=this.images.length,this.imgPosition=0,this.zIndexVal=1,this.activeImagesCount=0,this.isIdle=!0,this.threshold=80,this.mousePos={x:0,y:0},this.lastMousePos={x:0,y:0},this.cacheMousePos={x:0,y:0},this.lastAngle=0;const t=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s)};e.addEventListener("mousemove",t),e.addEventListener("touchmove",t);const n=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s),this.cacheMousePos={...this.mousePos},requestAnimationFrame(()=>this.render()),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n)};e.addEventListener("mousemove",n),e.addEventListener("touchmove",n)}render(){u(this.mousePos,this.lastMousePos)>this.threshold&&(this.showNextImage(),this.lastMousePos={...this.mousePos}),this.cacheMousePos.x=h(this.cacheMousePos.x,this.mousePos.x,.1),this.cacheMousePos.y=h(this.cacheMousePos.y,this.mousePos.y,.1),this.isIdle&&this.zIndexVal!==1&&(this.zIndexVal=1),requestAnimationFrame(()=>this.render())}showNextImage(){let e=this.mousePos.x-this.cacheMousePos.x,t=this.mousePos.y-this.cacheMousePos.y,n=Math.atan2(t,e)*(180/Math.PI);n<0&&(n+=360),n>90&&n<=270&&(n+=180);const r=n>=this.lastAngle;this.lastAngle=n;let s=r?n-10:n+10,m=Math.sqrt(e*e+t*t);m!==0&&(e/=m,t/=m),e*=m/150,t*=m/150,++this.zIndexVal,this.imgPosition=this.imgPosition<this.imagesTotal-1?this.imgPosition+1:0;const l=this.images[this.imgPosition];o.killTweensOf(l.DOM.el),o.timeline({onStart:()=>this.onImageActivated(),onComplete:()=>this.onImageDeactivated()}).fromTo(l.DOM.el,{opacity:1,filter:"brightness(80%)",scale:.1,zIndex:this.zIndexVal,x:this.cacheMousePos.x-l.rect.width/2,y:this.cacheMousePos.y-l.rect.height/2,rotation:s},{duration:1,ease:"power2",scale:1,filter:"brightness(100%)",x:this.mousePos.x-l.rect.width/2+e*70,y:this.mousePos.y-l.rect.height/2+t*70,rotation:this.lastAngle},0).to(l.DOM.el,{duration:.4,ease:"expo",opacity:0},.5).to(l.DOM.el,{duration:1.5,ease:"power4",x:`+=${e*120}`,y:`+=${t*120}`},.05)}onImageActivated(){this.activeImagesCount++,this.isIdle=!1}onImageDeactivated(){this.activeImagesCount--,this.activeImagesCount===0&&(this.isIdle=!0)}}class ${constructor(e){this.container=e,this.DOM={el:e},this.images=[...e.querySelectorAll(".content__img")].map(r=>new d(r)),this.imagesTotal=this.images.length,this.imgPosition=0,this.zIndexVal=1,this.activeImagesCount=0,this.isIdle=!0,this.threshold=80,this.mousePos={x:0,y:0},this.lastMousePos={x:0,y:0},this.cacheMousePos={x:0,y:0};const t=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s)};e.addEventListener("mousemove",t),e.addEventListener("touchmove",t);const n=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s),this.cacheMousePos={...this.mousePos},requestAnimationFrame(()=>this.render()),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n)};e.addEventListener("mousemove",n),e.addEventListener("touchmove",n)}render(){let e=u(this.mousePos,this.lastMousePos);this.cacheMousePos.x=h(this.cacheMousePos.x,this.mousePos.x,.3),this.cacheMousePos.y=h(this.cacheMousePos.y,this.mousePos.y,.3),e>this.threshold&&(this.showNextImage(),this.lastMousePos={...this.mousePos}),this.isIdle&&this.zIndexVal!==1&&(this.zIndexVal=1),requestAnimationFrame(()=>this.render())}mapSpeedToSize(e,t,n){return t+(n-t)*Math.min(e/200,1)}mapSpeedToBrightness(e,t,n){return t+(n-t)*Math.min(e/70,1)}mapSpeedToBlur(e,t,n){return t+(n-t)*Math.min(e/90,1)}mapSpeedToGrayscale(e,t,n){return t+(n-t)*Math.min(e/90,1)}showNextImage(){let e=this.mousePos.x-this.cacheMousePos.x,t=this.mousePos.y-this.cacheMousePos.y,n=Math.sqrt(e*e+t*t);++this.zIndexVal,this.imgPosition=this.imgPosition<this.imagesTotal-1?this.imgPosition+1:0;const r=this.images[this.imgPosition];let s=this.mapSpeedToSize(n,.3,2),m=this.mapSpeedToBrightness(n,0,1.3),l=this.mapSpeedToBlur(n,20,0),P=this.mapSpeedToGrayscale(n,600,0);o.killTweensOf(r.DOM.el),o.timeline({onStart:()=>this.onImageActivated(),onComplete:()=>this.onImageDeactivated()}).fromTo(r.DOM.el,{opacity:1,scale:0,zIndex:this.zIndexVal,x:this.cacheMousePos.x-r.rect.width/2,y:this.cacheMousePos.y-r.rect.height/2},{duration:.8,ease:"power3",scale:s,filter:`grayscale(${P*100}%) brightness(${m*100}%) blur(${l}px)`,x:this.mousePos.x-r.rect.width/2,y:this.mousePos.y-r.rect.height/2},0).fromTo(r.DOM.inner,{scale:2},{duration:.8,ease:"power3",scale:1},0).to(r.DOM.el,{duration:.4,ease:"power3.in",opacity:0,scale:.2},.45)}onImageActivated(){this.activeImagesCount++,this.isIdle=!1}onImageDeactivated(){this.activeImagesCount--,this.activeImagesCount===0&&(this.isIdle=!0)}}function Z(i,e,t){const n=Math.abs(e)%t.length;return i-n>=0?i-n:t.length-(n-i)}class G{constructor(e){this.container=e,this.DOM={el:e},this.images=[...e.querySelectorAll(".content__img")].map(r=>new d(r)),this.imagesTotal=this.images.length,this.imgPosition=0,this.zIndexVal=1,this.activeImagesCount=0,this.isIdle=!0,this.threshold=80,this.mousePos={x:0,y:0},this.lastMousePos={x:0,y:0},this.cacheMousePos={x:0,y:0},this.visibleImagesCount=0,this.visibleImagesTotal=9,this.visibleImagesTotal=Math.min(this.visibleImagesTotal,this.imagesTotal-1);const t=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s)};e.addEventListener("mousemove",t),e.addEventListener("touchmove",t);const n=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s),this.cacheMousePos={...this.mousePos},requestAnimationFrame(()=>this.render()),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n)};e.addEventListener("mousemove",n),e.addEventListener("touchmove",n)}render(){let e=u(this.mousePos,this.lastMousePos);this.cacheMousePos.x=h(this.cacheMousePos.x,this.mousePos.x,.3),this.cacheMousePos.y=h(this.cacheMousePos.y,this.mousePos.y,.3),e>this.threshold&&(this.showNextImage(),this.lastMousePos={...this.mousePos}),this.isIdle&&this.zIndexVal!==1&&(this.zIndexVal=1),requestAnimationFrame(()=>this.render())}showNextImage(){++this.zIndexVal,this.imgPosition=this.imgPosition<this.imagesTotal-1?this.imgPosition+1:0;const e=this.images[this.imgPosition];++this.visibleImagesCount,o.killTweensOf(e.DOM.el);const t=o.utils.random(.5,1.6);if(o.timeline({onStart:()=>this.onImageActivated(),onComplete:()=>this.onImageDeactivated()}).fromTo(e.DOM.el,{scale:t-Math.max(o.utils.random(.2,.6),0),rotationZ:0,opacity:1,zIndex:this.zIndexVal,x:this.cacheMousePos.x-e.rect.width/2,y:this.cacheMousePos.y-e.rect.height/2},{duration:.4,ease:"power3",scale:t,rotationZ:o.utils.random(-3,3),x:this.mousePos.x-e.rect.width/2,y:this.mousePos.y-e.rect.height/2},0),this.visibleImagesCount>=this.visibleImagesTotal){const n=Z(this.imgPosition,this.visibleImagesTotal,this.images),r=this.images[n];o.to(r.DOM.el,{duration:.4,ease:"power4",opacity:0,scale:1.3,onComplete:()=>{this.activeImagesCount===0&&(this.isIdle=!0)}})}}onImageActivated(){this.activeImagesCount++,this.isIdle=!1}onImageDeactivated(){this.activeImagesCount--}}class j{constructor(e){this.container=e,this.DOM={el:e},this.images=[...e.querySelectorAll(".content__img")].map(r=>new d(r)),this.imagesTotal=this.images.length,this.imgPosition=0,this.zIndexVal=1,this.activeImagesCount=0,this.isIdle=!0,this.threshold=80,this.mousePos={x:0,y:0},this.lastMousePos={x:0,y:0},this.cacheMousePos={x:0,y:0},this.rotation={x:0,y:0},this.cachedRotation={x:0,y:0},this.zValue=0,this.cachedZValue=0;const t=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s)};e.addEventListener("mousemove",t),e.addEventListener("touchmove",t);const n=r=>{const s=e.getBoundingClientRect();this.mousePos=c(r,s),this.cacheMousePos={...this.mousePos},requestAnimationFrame(()=>this.render()),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n)};e.addEventListener("mousemove",n),e.addEventListener("touchmove",n)}render(){let e=u(this.mousePos,this.lastMousePos);this.cacheMousePos.x=h(this.cacheMousePos.x,this.mousePos.x,.1),this.cacheMousePos.y=h(this.cacheMousePos.y,this.mousePos.y,.1),e>this.threshold&&(this.showNextImage(),this.lastMousePos={...this.mousePos}),this.isIdle&&this.zIndexVal!==1&&(this.zIndexVal=1),requestAnimationFrame(()=>this.render())}showNextImage(){const e=this.container.getBoundingClientRect(),t=e.width/2,n=e.height/2,r=this.mousePos.x-t,s=this.mousePos.y-n;this.rotation.x=-(s/n)*30,this.rotation.y=r/t*30,this.cachedRotation={...this.rotation};const m=Math.sqrt(r*r+s*s),l=Math.sqrt(t*t+n*n),P=m/l;this.zValue=P*1200-600,this.cachedZValue=this.zValue;const f=.2+(this.zValue+600)/1200*2.3;++this.zIndexVal,this.imgPosition=this.imgPosition<this.imagesTotal-1?this.imgPosition+1:0;const g=this.images[this.imgPosition];o.killTweensOf(g.DOM.el),o.timeline({onStart:()=>this.onImageActivated(),onComplete:()=>this.onImageDeactivated()}).set(this.DOM.el,{perspective:1e3},0).fromTo(g.DOM.el,{opacity:1,z:0,scale:1+this.cachedZValue/1e3,zIndex:this.zIndexVal,x:this.cacheMousePos.x-g.rect.width/2,y:this.cacheMousePos.y-g.rect.height/2,rotationX:this.cachedRotation.x,rotationY:this.cachedRotation.y,filter:`brightness(${f})`},{duration:1,ease:"expo",scale:1+this.zValue/1e3,x:this.mousePos.x-g.rect.width/2,y:this.mousePos.y-g.rect.height/2,rotationX:this.rotation.x,rotationY:this.rotation.y},0).to(g.DOM.el,{duration:.4,ease:"power2",opacity:0,z:-800},.3)}onImageActivated(){this.activeImagesCount++,this.isIdle=!1}onImageDeactivated(){this.activeImagesCount--,this.activeImagesCount===0&&(this.isIdle=!0)}}const y={1:F,2:X,3:H,4:Y,5:k,6:$,7:G,8:j};function Q({items:i=[],variant:e=1}){const t=p.useRef(null);return p.useEffect(()=>{if(!t.current)return;const n=y[e]||y[1];new n(t.current)},[e,i]),a.jsx("div",{className:"content",ref:t,children:i.map((n,r)=>a.jsx("div",{className:"content__img",children:a.jsx("div",{className:"content__img-inner",style:{backgroundImage:`url(${n})`}})},r))})}const se=()=>{const[i,e]=p.useState("1"),[t,n]=R(),r=[{name:"items",type:"string[]",default:"[]",description:"An array of image URLs which will be animated in the trail."},{name:"variant",type:"number",default:"1",description:"A number from 1 to 8 - all different animation styles."}];return a.jsxs(L,{children:[a.jsxs(b,{children:[a.jsxs(D,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:[a.jsx(Q,{items:["https://picsum.photos/id/287/300/300","https://picsum.photos/id/1001/300/300","https://picsum.photos/id/1025/300/300","https://picsum.photos/id/1026/300/300","https://picsum.photos/id/1027/300/300","https://picsum.photos/id/1028/300/300","https://picsum.photos/id/1029/300/300","https://picsum.photos/id/1030/300/300"],variant:i},t),a.jsxs(x,{position:"absolute",justifyContent:"center",flexDirection:"column",alignItems:"center",children:[a.jsx(I,{fontSize:"clamp(2rem, 6vw, 6rem)",fontWeight:900,color:"#271E37",mb:0,children:"Hover Me."}),a.jsxs(I,{fontSize:"18px",fontWeight:900,color:"#a6a6a6",mt:0,children:["Variant ",i]})]})]}),a.jsxs("div",{className:"preview-options",children:[a.jsx("h2",{className:"demo-title-extra",children:"Customize"}),a.jsx(x,{gap:6,direction:"column",children:a.jsxs(O,{isAttached:!0,size:"sm",children:[a.jsx(M,{fontSize:"xs",disabled:!0,border:"1px solid #271E37",h:8,_disabled:{bg:"#271E37",border:"1px solid #271E37",color:"#fff",cursor:"not-allowed",_hover:{bg:"#222"}},children:"Variant"}),[1,2,3,4,5,6,7,8].map(s=>{const m=i===String(s);return a.jsx(M,{bg:m?"#5227FF":"#0D0716",border:"1px solid #271E37",_hover:{backgroundColor:m?"#5227FF":"#0D0716"},color:"#fff",fontSize:"xs",h:8,onClick:()=>{e(String(s)),n()},children:s},s)})]})})]}),a.jsx(w,{data:r}),a.jsx(z,{dependencyList:["gsap"]})]}),a.jsx(V,{children:a.jsx(C,{codeObject:N})})]})};export{se as default};
