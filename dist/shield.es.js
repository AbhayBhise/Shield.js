var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class EventTrapper {
  constructor() {
    __publicField(this, "controller");
    __publicField(this, "styleElement", null);
    this.controller = new AbortController();
    this.init();
  }
  init() {
    const { signal } = this.controller;
    const blockedEvents = ["contextmenu", "copy", "cut", "paste", "dragstart", "selectstart"];
    blockedEvents.forEach((evt) => {
      document.addEventListener(evt, this.preventDefault, { signal, capture: true });
    });
    this.styleElement = document.createElement("style");
    this.styleElement.textContent = `
            * {
                -webkit-touch-callout: none !important;
                -webkit-user-select: none !important;
                -khtml-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
        `;
    document.head.appendChild(this.styleElement);
    document.addEventListener("touchstart", (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { signal, passive: false });
  }
  preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  destroy() {
    this.controller.abort();
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
    }
  }
}
const BLOCKED_KEYS = {
  F12: "F12",
  U: "u",
  P: "p",
  S: "s",
  I: "i",
  J: "j"
};
const ZERO_WIDTH_CHARS = ["​", "‌", "‍", "\uFEFF"];
const BLUR_DELAY = 4e3;
class ShortcutBlocker {
  constructor() {
    __publicField(this, "controller");
    this.controller = new AbortController();
    this.init();
  }
  init() {
    document.addEventListener("keydown", (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      if (e.key === BLOCKED_KEYS.F12 || e.key === "ContextMenu" || isCtrlOrCmd && key === BLOCKED_KEYS.U || isCtrlOrCmd && key === BLOCKED_KEYS.P || isCtrlOrCmd && key === BLOCKED_KEYS.S || isCtrlOrCmd && e.shiftKey && key === BLOCKED_KEYS.I || isCtrlOrCmd && e.shiftKey && key === BLOCKED_KEYS.J || isCtrlOrCmd && e.shiftKey && key === "c" || // Mac Inspect Element
      isCtrlOrCmd && e.altKey && key === "i" || // Mac DevTools
      isCtrlOrCmd && e.altKey && key === "u") {
        e.preventDefault();
        e.stopPropagation();
      }
    }, { signal: this.controller.signal, capture: true });
  }
  destroy() {
    this.controller.abort();
  }
}
class DevToolsTrap {
  constructor() {
    __publicField(this, "threshold", 160);
    __publicField(this, "controller");
    __publicField(this, "hasTrapped", false);
    this.controller = new AbortController();
    this.init();
  }
  init() {
    window.addEventListener("resize", () => this.detectDevToolsDimensions(), { signal: this.controller.signal });
    this.detectDevToolsDimensions();
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: () => {
        this.triggerTrap();
      }
    });
    console.log("%cShield.js", element);
  }
  detectDevToolsDimensions() {
    if (this.hasTrapped) return;
    const widthDiff = window.outerWidth - window.innerWidth > this.threshold;
    const heightDiff = window.outerHeight - window.innerHeight > this.threshold;
    if (widthDiff || heightDiff) {
      this.triggerTrap();
    }
  }
  triggerTrap() {
    if (this.hasTrapped) return;
    this.hasTrapped = true;
    document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;font-size:2rem;font-weight:bold;color:red;background:black;">Nice Try</div>';
    this.destroy();
  }
  destroy() {
    this.controller.abort();
  }
}
class BlurShield {
  constructor() {
    __publicField(this, "controller");
    __publicField(this, "overlay", null);
    __publicField(this, "unblurTimeout", null);
    this.controller = new AbortController();
    this.init();
  }
  init() {
    const options = { signal: this.controller.signal, capture: true };
    window.addEventListener("blur", () => this.applyBlur(), options);
    window.addEventListener("focus", () => this.removeBlur(), options);
    window.addEventListener("keydown", (e) => this.handleKeyDown(e), options);
    window.addEventListener("keyup", (e) => this.handleKeyUp(e), options);
    window.addEventListener("pointerdown", () => {
      if (this.overlay && document.hasFocus()) this.removeBlur();
    }, options);
  }
  triggerProtection() {
    this.applyBlur();
    this.scheduleUnblur(BLUR_DELAY);
  }
  handleKeyDown(e) {
    if (e.metaKey && e.shiftKey || e.key === "PrintScreen") {
      this.triggerProtection();
    }
  }
  handleKeyUp(e) {
    if (e.key === "PrintScreen") {
      this.triggerProtection();
      return;
    }
    if (this.overlay && (!e.metaKey || !e.shiftKey) && document.hasFocus()) {
      this.scheduleUnblur(BLUR_DELAY);
    }
  }
  scheduleUnblur(ms) {
    if (this.unblurTimeout) clearTimeout(this.unblurTimeout);
    this.unblurTimeout = window.setTimeout(() => {
      if (document.hasFocus()) this.removeBlur();
    }, ms);
  }
  applyBlur() {
    if (this.unblurTimeout) {
      clearTimeout(this.unblurTimeout);
      this.unblurTimeout = null;
    }
    if (!this.overlay) {
      this.overlay = document.createElement("div");
      this.overlay.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 2147483647;
                background: black;
            `;
      document.body.appendChild(this.overlay);
      document.body.style.filter = "blur(20px)";
    }
  }
  removeBlur() {
    if (this.overlay) {
      if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      this.overlay = null;
      document.body.style.filter = "";
    }
  }
  destroy() {
    this.controller.abort();
    this.removeBlur();
    if (this.unblurTimeout) clearTimeout(this.unblurTimeout);
  }
}
class DOMPoisoner {
  constructor() {
    __publicField(this, "garbageWords", ["ads", "click", "subscribe", "free", "discount", "buy", "now"]);
    __publicField(this, "poisonedNodes", /* @__PURE__ */ new WeakSet());
  }
  getHiddenStyle() {
    const styles = [
      "display:none !important;",
      "position:absolute;left:-9999px;opacity:0;",
      "font-size:0;width:0;height:0;overflow:hidden;position:fixed;",
      "clip:rect(0,0,0,0);position:absolute;pointer-events:none;",
      "visibility:hidden;position:absolute;z-index:-1;"
    ];
    return styles[Math.floor(Math.random() * styles.length)];
  }
  poisonElement(el) {
    if (this.poisonedNodes.has(el)) return;
    const randomClass = "sh-" + Math.random().toString(36).substring(2, 8);
    el.classList.add(randomClass);
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    let node;
    const textNodes = [];
    while (node = walker.nextNode()) {
      if (node.nodeValue && node.nodeValue.trim().length > 0) {
        textNodes.push(node);
      }
    }
    textNodes.forEach((textNode) => {
      var _a;
      if (!textNode.parentNode) return;
      const words = ((_a = textNode.nodeValue) == null ? void 0 : _a.split(/\s+/)) || [];
      if (words.length <= 1) return;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < words.length; i++) {
        fragment.appendChild(document.createTextNode(words[i]));
        if (i < words.length - 1) {
          let separator = " ";
          if (Math.random() > 0.5) {
            separator += ZERO_WIDTH_CHARS[Math.floor(Math.random() * ZERO_WIDTH_CHARS.length)];
          }
          fragment.appendChild(document.createTextNode(separator));
          if (Math.random() > 0.8) {
            const span = document.createElement("span");
            span.style.cssText = this.getHiddenStyle();
            if (Math.random() > 0.5) {
              const b = document.createElement("b");
              b.style.cssText = span.style.cssText;
              span.style.cssText = "";
              b.textContent = this.garbageWords[Math.floor(Math.random() * this.garbageWords.length)];
              span.appendChild(b);
            } else {
              span.textContent = this.garbageWords[Math.floor(Math.random() * this.garbageWords.length)];
            }
            fragment.appendChild(span);
          }
        }
      }
      textNode.parentNode.replaceChild(fragment, textNode);
    });
    this.poisonedNodes.add(el);
  }
}
class MutationWatcher {
  constructor(poisoner, imageProtector) {
    __publicField(this, "observer", null);
    __publicField(this, "poisoner");
    __publicField(this, "imageProtector");
    __publicField(this, "frameId", null);
    __publicField(this, "pendingNodes", /* @__PURE__ */ new Set());
    __publicField(this, "pendingImages", /* @__PURE__ */ new Set());
    this.poisoner = poisoner;
    this.imageProtector = imageProtector;
    this.init();
  }
  init() {
    const initialParagraphs = document.querySelectorAll("p");
    initialParagraphs.forEach((p) => {
      if (!this.poisoner.poisonedNodes.has(p)) {
        this.pendingNodes.add(p);
      }
    });
    const initialImages = document.querySelectorAll("img");
    initialImages.forEach((img) => {
      this.pendingImages.add(img);
    });
    if (this.pendingNodes.size > 0 || this.pendingImages.size > 0) this.scheduleProcessing();
    this.observer = new MutationObserver((mutations) => {
      let hasAddedNodes = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node;
              if (el.tagName === "P" && !this.poisoner.poisonedNodes.has(el)) {
                this.pendingNodes.add(el);
                hasAddedNodes = true;
              } else if (el.tagName === "IMG") {
                this.pendingImages.add(el);
                hasAddedNodes = true;
              }
              const childParagraphs = el.querySelectorAll("p");
              if (childParagraphs.length > 0) {
                childParagraphs.forEach((p) => {
                  if (!this.poisoner.poisonedNodes.has(p)) {
                    this.pendingNodes.add(p);
                    hasAddedNodes = true;
                  }
                });
              }
              const childImages = el.querySelectorAll("img");
              if (childImages.length > 0) {
                childImages.forEach((img) => {
                  this.pendingImages.add(img);
                  hasAddedNodes = true;
                });
              }
            }
          });
        }
      }
      if (hasAddedNodes) {
        this.scheduleProcessing();
      }
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  scheduleProcessing() {
    if (this.frameId === null) {
      this.frameId = requestAnimationFrame(() => {
        this.processPendingNodes();
        this.frameId = null;
      });
    }
  }
  processPendingNodes() {
    this.pendingNodes.forEach((el) => {
      this.poisoner.poisonElement(el);
    });
    this.pendingNodes.clear();
    this.pendingImages.forEach((img) => {
      this.imageProtector.protectImage(img);
    });
    this.pendingImages.clear();
  }
  // processElements removed as it is now handled directly in init
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    this.pendingNodes.clear();
  }
}
class PrintBlocker {
  constructor() {
    __publicField(this, "styleElement", null);
    __publicField(this, "controller");
    this.controller = new AbortController();
    this.init();
  }
  init() {
    this.styleElement = document.createElement("style");
    this.styleElement.textContent = `
            @media print {
                body {
                    display: none !important;
                }
            }
        `;
    document.head.appendChild(this.styleElement);
    window.addEventListener("beforeprint", (e) => {
      e.preventDefault();
    }, { signal: this.controller.signal });
  }
  destroy() {
    this.controller.abort();
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
    }
  }
}
class ImageProtector {
  constructor() {
    __publicField(this, "protectedImages", /* @__PURE__ */ new WeakSet());
  }
  protectImage(img) {
    if (this.protectedImages.has(img)) return;
    const parent = img.parentElement;
    if (!parent) return;
    const overlay = document.createElement("div");
    overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 50;
            background: transparent;
        `;
    overlay.addEventListener("contextmenu", (e) => e.preventDefault());
    overlay.addEventListener("dragstart", (e) => e.preventDefault());
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "position: relative; display: inline-block; padding: 0; margin: 0; max-width: 100%;";
    const computedStyle = window.getComputedStyle(img);
    wrapper.style.marginTop = computedStyle.marginTop;
    wrapper.style.marginRight = computedStyle.marginRight;
    wrapper.style.marginBottom = computedStyle.marginBottom;
    wrapper.style.marginLeft = computedStyle.marginLeft;
    img.style.margin = "0";
    parent.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(overlay);
    this.protectedImages.add(img);
  }
}
class FrameBuster {
  constructor() {
    this.init();
  }
  init() {
    try {
      if (window.top !== window.self) {
        if (window.top) {
          window.top.location.href = window.self.location.href;
        }
      }
    } catch (e) {
      document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;font-size:2rem;font-weight:bold;color:red;background:black;">Unauthorized Framing Detected</div>';
    }
  }
}
class Shield {
  constructor() {
    __publicField(this, "eventTrapper");
    __publicField(this, "shortcutBlocker");
    __publicField(this, "devToolsTrap");
    __publicField(this, "blurShield");
    __publicField(this, "domPoisoner");
    __publicField(this, "imageProtector");
    __publicField(this, "mutationWatcher");
    __publicField(this, "printBlocker");
    this.eventTrapper = new EventTrapper();
    this.shortcutBlocker = new ShortcutBlocker();
    this.devToolsTrap = new DevToolsTrap();
    this.blurShield = new BlurShield();
    this.domPoisoner = new DOMPoisoner();
    this.imageProtector = new ImageProtector();
    this.mutationWatcher = new MutationWatcher(this.domPoisoner, this.imageProtector);
    this.printBlocker = new PrintBlocker();
    new FrameBuster();
    console.log("Shield.js initialized. Content protected.");
  }
  destroy() {
    this.eventTrapper.destroy();
    this.shortcutBlocker.destroy();
    this.devToolsTrap.destroy();
    this.blurShield.destroy();
    this.mutationWatcher.destroy();
    this.printBlocker.destroy();
  }
}
if (typeof window !== "undefined") {
  if (!window.__shield_initialized) {
    window.__shield_initialized = true;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        new Shield();
      });
    } else {
      new Shield();
    }
  }
}
export {
  Shield
};
