"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/main.server.ts
var main_server_exports = {};
__export(main_server_exports, {
  default: () => main_server_default
});
module.exports = __toCommonJS(main_server_exports);
var import_platform_browser3 = require("@angular/platform-browser");

// src/app/app.ts
var import_core4 = require("@angular/core");
var import_router3 = require("@angular/router");

// src/app/navbar.ts
var import_core = require("@angular/core");
var import_router = require("@angular/router");
var import_icon = require("@angular/material/icon");
var import_common = require("@angular/common");
var Navbar = class {
  isMenuOpen = false;
};
Navbar = __decorateClass([
  (0, import_core.Component)({
    selector: "app-navbar",
    imports: [import_router.RouterLink, import_router.RouterLinkActive, import_icon.MatIconModule, import_common.NgClass],
    template: `
    <nav class="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center gap-2 group">
              <div class="w-28 h-14 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/img/nlogo.png" alt="Blucid Enterprise Logo" class="w-full h-full object-cover">
              </div>
            <!--  <span class="text-xl font-display font-bold text-secondary tracking-tight">Blucid<span class="text-primary">Enterprise</span></span> -->
            </a>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-gap-8">
            <a routerLink="/" routerLinkActive="text-primary" [routerLinkActiveOptions]="{exact: true}" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2">Home</a>
            <a routerLink="/services" routerLinkActive="text-primary" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2">Services</a>
            <a routerLink="/products" routerLinkActive="text-primary" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2">Products</a>
            <a routerLink="/about" routerLinkActive="text-primary" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2">About Us</a>
            <a routerLink="/faq" routerLinkActive="text-primary" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2">FAQ</a>
            <a routerLink="/contact" class="ml-4 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
              Contact Us
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="flex items-center md:hidden">
            <button (click)="isMenuOpen = !isMenuOpen" class="text-slate-600 hover:text-primary p-2">
              <mat-icon>{{ isMenuOpen ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div [ngClass]="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a routerLink="/" (click)="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50">Home</a>
          <a routerLink="/services" (click)="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50">Services</a>
          <a routerLink="/products" (click)="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50">Products</a>
          <a routerLink="/about" (click)="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50">About Us</a>
          <a routerLink="/faq" (click)="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50">FAQ</a>
          <a routerLink="/contact" (click)="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-primary font-bold">Contact Us</a>
        </div>
      </div>
    </nav>
  `,
    styles: [`
    :host { display: block; }
    .space-gap-8 > * + * { margin-left: 1rem; }
  `]
  })
], Navbar);

// src/app/footer.ts
var import_core2 = require("@angular/core");
var import_icon2 = require("@angular/material/icon");
var import_router2 = require("@angular/router");
var Footer = class {
};
Footer = __decorateClass([
  (0, import_core2.Component)({
    selector: "app-footer",
    imports: [import_icon2.MatIconModule, import_router2.RouterLink],
    template: `
    <footer class="bg-secondary text-white pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 mb-6">
              <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <mat-icon class="text-sm">solar_power</mat-icon>
              </div>
              <span class="text-lg font-display font-bold tracking-tight">Blucid<span class="text-primary">Enterprise</span></span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed mb-6">
              Leading the way in sustainable energy solutions. We provide high-quality solar installations and electrical services for a brighter, greener future.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <mat-icon class="text-sm">facebook</mat-icon>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <mat-icon class="text-sm">alternate_email</mat-icon>
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-6">Quick Links</h4>
            <ul class="space-y-4 text-sm text-slate-400">
              <li><a routerLink="/" class="hover:text-white transition-colors">Home</a></li>
              <li><a routerLink="/services" class="hover:text-white transition-colors">Services</a></li>
              <li><a routerLink="/products" class="hover:text-white transition-colors">Products</a></li>
              <li><a routerLink="/about" class="hover:text-white transition-colors">About Us</a></li>
              <li><a routerLink="/faq" class="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-6">Services</h4>
            <ul class="space-y-4 text-sm text-slate-400">
              <li>Solar Installation</li>
              <li>Wiring Setup</li>
              <li>Battery Supplies</li>
              <li>Volt Switch Panels</li>
              <li>Maintenance</li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-6">Contact Info</h4>
            <ul class="space-y-4 text-sm text-slate-400">
              <li class="flex items-start gap-3">
                <mat-icon class="text-primary mt-0.5">location_on</mat-icon>
                <span>B1 L12, Cuervo II Rd, Real,<br>Calamba, 4027 Laguna</span>
              </li>
              <li class="flex items-center gap-3">
                <mat-icon class="text-primary">phone</mat-icon>
                <span>(049) 520 5780</span>
              </li>
              <li class="flex items-center gap-3">
                <mat-icon class="text-primary">schedule</mat-icon>
                <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>&copy; 2026 Blucid Enterprise Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
  })
], Footer);

// src/app/back-to-top.ts
var import_core3 = require("@angular/core");
var import_icon3 = require("@angular/material/icon");
var import_common2 = require("@angular/common");

// node_modules/motion-utils/dist/es/array.mjs
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}

// node_modules/motion-utils/dist/es/clamp.mjs
var clamp = (min, max, v) => {
  if (v > max)
    return max;
  if (v < min)
    return min;
  return v;
};

// node_modules/motion-utils/dist/es/format-error-message.mjs
function formatErrorMessage(message, errorCode) {
  return errorCode ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}` : message;
}

// node_modules/motion-utils/dist/es/errors.mjs
var warning = () => {
};
var invariant = () => {
};
if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
  warning = (check, message, errorCode) => {
    if (!check && typeof console !== "undefined") {
      console.warn(formatErrorMessage(message, errorCode));
    }
  };
  invariant = (check, message, errorCode) => {
    if (!check) {
      throw new Error(formatErrorMessage(message, errorCode));
    }
  };
}

// node_modules/motion-utils/dist/es/global-config.mjs
var MotionGlobalConfig = {};

// node_modules/motion-utils/dist/es/is-numerical-string.mjs
var isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);

// node_modules/motion-utils/dist/es/is-object.mjs
function isObject(value) {
  return typeof value === "object" && value !== null;
}

// node_modules/motion-utils/dist/es/is-zero-value-string.mjs
var isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);

// node_modules/motion-utils/dist/es/memo.mjs
// @__NO_SIDE_EFFECTS__
function memo(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}

// node_modules/motion-utils/dist/es/noop.mjs
var noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;

// node_modules/motion-utils/dist/es/pipe.mjs
var combineFunctions = (a, b) => (v) => b(a(v));
var pipe = (...transformers) => transformers.reduce(combineFunctions);

// node_modules/motion-utils/dist/es/progress.mjs
var progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// node_modules/motion-utils/dist/es/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// node_modules/motion-utils/dist/es/time-conversion.mjs
var secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
var millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;

// node_modules/motion-utils/dist/es/velocity-per-second.mjs
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// node_modules/motion-utils/dist/es/warn-once.mjs
var warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, errorCode) {
  if (condition || warned.has(message))
    return;
  console.warn(formatErrorMessage(message, errorCode));
  warned.add(message);
}

// node_modules/motion-utils/dist/es/wrap.mjs
var wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};

// node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs
var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

// node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;

// node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs
var reverseEasing = (easing) => (p) => 1 - easing(1 - p);

// node_modules/motion-utils/dist/es/easing/back.mjs
var backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99);
var backIn = /* @__PURE__ */ reverseEasing(backOut);
var backInOut = /* @__PURE__ */ mirrorEasing(backIn);

// node_modules/motion-utils/dist/es/easing/anticipate.mjs
var anticipate = (p) => p >= 1 ? 1 : (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));

// node_modules/motion-utils/dist/es/easing/circ.mjs
var circIn = (p) => 1 - Math.sin(Math.acos(p));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circIn);

// node_modules/motion-utils/dist/es/easing/ease.mjs
var easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1);
var easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1);
var easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);

// node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray = (ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
};

// node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
function getEasingForSegment(easing, i) {
  return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing;
}

// node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";

// node_modules/motion-utils/dist/es/easing/utils/map.mjs
var easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
var isValidEasing = (easing) => {
  return typeof easing === "string";
};
var easingDefinitionToFunction = (definition) => {
  if (isBezierDefinition(definition)) {
    invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (isValidEasing(definition)) {
    invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`, "invalid-easing-type");
    return easingLookup[definition];
  }
  return definition;
};

// node_modules/motion-dom/dist/es/frameloop/order.mjs
var stepsOrder = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];

// node_modules/motion-dom/dist/es/stats/buffer.mjs
var statsBuffer = {
  value: null,
  addProjectionMetrics: null
};

// node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function createRenderStep(runNextFrame, stepName) {
  let thisFrame = /* @__PURE__ */ new Set();
  let nextFrame = /* @__PURE__ */ new Set();
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  let latestFrameData = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  let numCalls = 0;
  function triggerCallback(callback) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback);
      runNextFrame();
    }
    numCalls++;
    callback(latestFrameData);
  }
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      queue.add(callback);
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.delete(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData2) => {
      latestFrameData = frameData2;
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      const prevFrame = thisFrame;
      thisFrame = nextFrame;
      nextFrame = prevFrame;
      thisFrame.forEach(triggerCallback);
      if (stepName && statsBuffer.value) {
        statsBuffer.value.frameloop[stepName].push(numCalls);
      }
      numCalls = 0;
      thisFrame.clear();
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}

// node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const flagRunNextFrame = () => runNextFrame = true;
  const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(flagRunNextFrame, allowKeepAlive ? key : void 0);
    return acc;
  }, {});
  const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
  const processBatch = () => {
    const useManualTiming = MotionGlobalConfig.useManualTiming;
    const timestamp = useManualTiming ? state.timestamp : performance.now();
    runNextFrame = false;
    if (!useManualTiming) {
      state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
    }
    state.timestamp = timestamp;
    state.isProcessing = true;
    setup.process(state);
    read.process(state);
    resolveKeyframes.process(state);
    preUpdate.process(state);
    update.process(state);
    preRender.process(state);
    render.process(state);
    postRender.process(state);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process2) => {
    for (let i = 0; i < stepsOrder.length; i++) {
      steps[stepsOrder[i]].cancel(process2);
    }
  };
  return { schedule, cancel, state, steps };
}

// node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);

// node_modules/motion-dom/dist/es/frameloop/sync-time.mjs
var now;
function clearTime() {
  now = void 0;
}
var time = {
  now: () => {
    if (now === void 0) {
      time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
    }
    return now;
  },
  set: (newTime) => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};

// node_modules/motion-dom/dist/es/stats/animation-count.mjs
var activeAnimations = {
  layout: 0,
  mainThread: 0,
  waapi: 0
};

// node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
var startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
var isCSSVariableToken = (value) => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function containsCSSVariable(value) {
  if (typeof value !== "string")
    return false;
  return value.split("/*")[0].includes("var(--");
}

// node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
var alpha = {
  ...number,
  transform: (v) => clamp(0, 1, v)
};
var scale = {
  ...number,
  default: 1
};

// node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs
var sanitize = (v) => Math.round(v * 1e5) / 1e5;

// node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs
var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

// node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function isNullish(v) {
  return v == null;
}

// node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;

// node_modules/motion-dom/dist/es/value/types/color/utils.mjs
var isColorString = (type, testProp) => (v) => {
  return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
  if (typeof v !== "string")
    return v;
  const [a, b, c, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};

// node_modules/motion-dom/dist/es/value/types/color/rgba.mjs
var clampRgbUnit = (v) => clamp(0, 255, v);
var rgbUnit = {
  ...number,
  transform: (v) => Math.round(clampRgbUnit(v))
};
var rgba = {
  test: /* @__PURE__ */ isColorString("rgb", "red"),
  parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function parseHex(v) {
  let r = "";
  let g = "";
  let b = "";
  let a = "";
  if (v.length > 5) {
    r = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
  } else {
    r = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r += r;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
var hex = {
  test: /* @__PURE__ */ isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// node_modules/motion-dom/dist/es/value/types/numbers/units.mjs
var createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit) => ({
  test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
var degrees = /* @__PURE__ */ createUnitType("deg");
var percent = /* @__PURE__ */ createUnitType("%");
var px = /* @__PURE__ */ createUnitType("px");
var vh = /* @__PURE__ */ createUnitType("vh");
var vw = /* @__PURE__ */ createUnitType("vw");
var progressPercentage = /* @__PURE__ */ (() => ({
  ...percent,
  parse: (v) => percent.parse(v) / 100,
  transform: (v) => percent.transform(v * 100)
}))();

// node_modules/motion-dom/dist/es/value/types/color/hsla.mjs
var hsla = {
  test: /* @__PURE__ */ isColorString("hsl", "hue"),
  parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// node_modules/motion-dom/dist/es/value/types/color/index.mjs
var color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  },
  getAnimatableNone: (v) => {
    const parsed = color.parse(v);
    parsed.alpha = 0;
    return color.transform(parsed);
  }
};

// node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs
var colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

// node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function test(v) {
  return isNaN(v) && typeof v === "string" && (v.match(floatRegex)?.length || 0) + (v.match(colorRegex)?.length || 0) > 0;
}
var NUMBER_TOKEN = "number";
var COLOR_TOKEN = "color";
var VAR_TOKEN = "var";
var VAR_FUNCTION_TOKEN = "var(";
var SPLIT_TOKEN = "${}";
var complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i = 0;
  const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
    if (color.test(parsedValue)) {
      indexes.color.push(i);
      types.push(COLOR_TOKEN);
      values.push(color.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i);
      types.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
    ++i;
    return SPLIT_TOKEN;
  });
  const split = tokenised.split(SPLIT_TOKEN);
  return { values, split, indexes, types };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function buildTransformer({ split, types }) {
  const numSections = split.length;
  return (v) => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split[i];
      if (v[i] !== void 0) {
        const type = types[i];
        if (type === NUMBER_TOKEN) {
          output += sanitize(v[i]);
        } else if (type === COLOR_TOKEN) {
          output += color.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
function createTransformer(source) {
  return buildTransformer(analyseComplexValue(source));
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : color.test(v) ? color.getAnimatableNone(v) : v;
var convertToZero = (value, splitBefore) => {
  if (typeof value === "number") {
    return splitBefore?.trim().endsWith("/") ? value : 0;
  }
  return convertNumbersToZero(value);
};
function getAnimatableNone(v) {
  const info = analyseComplexValue(v);
  const transformer = buildTransformer(info);
  return transformer(info.values.map((value, i) => convertToZero(value, info.split[i])));
}
var complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone
};

// node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}

// node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function mixImmediate(a, b) {
  return (p) => p > 0 ? b : a;
}

// node_modules/motion-dom/dist/es/utils/mix/number.mjs
var mixNumber = (from, to, progress2) => {
  return from + (to - from) * progress2;
};

// node_modules/motion-dom/dist/es/utils/mix/color.mjs
var mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes = [hex, rgba, hsla];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color2) {
  const type = getColorType(color2);
  warning(Boolean(type), `'${color2}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
  if (!Boolean(type))
    return false;
  let model = type.parse(color2);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
var mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  if (!fromRGBA || !toRGBA) {
    return mixImmediate(from, to);
  }
  const blended = { ...fromRGBA };
  return (v) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v);
    return rgba.transform(blended);
  };
};

// node_modules/motion-dom/dist/es/utils/mix/visibility.mjs
var invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
  if (invisibleValues.has(origin)) {
    return (p) => p <= 0 ? origin : target;
  } else {
    return (p) => p >= 1 ? target : origin;
  }
}

// node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function mixNumber2(a, b) {
  return (p) => mixNumber(a, b, p);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber2;
  } else if (typeof a === "string") {
    return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return color.test(a) ? mixColor : mixObject;
  }
  return mixImmediate;
}
function mixArray(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return (p) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject(a, b) {
  const output = { ...a, ...b };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b[key] !== void 0) {
      blendValue[key] = getMixer(a[key])(a[key], b[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = origin.values[originIndex] ?? 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
      return mixVisibility(origin, target);
    }
    return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
    return mixImmediate(origin, target);
  }
};

// node_modules/motion-dom/dist/es/utils/mix/index.mjs
function mix(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return mixNumber(from, to, p);
  }
  const mixer = getMixer(from);
  return mixer(from, to);
}

// node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var frameloopDriver = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: (keepAlive = true) => frame.update(passTimestamp, keepAlive),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : time.now()
  };
};

// node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs
var generateLinearEasing = (easing, duration, resolution = 10) => {
  let points = "";
  const numPoints = Math.max(Math.round(duration / resolution), 2);
  for (let i = 0; i < numPoints; i++) {
    points += Math.round(easing(i / (numPoints - 1)) * 1e4) / 1e4 + ", ";
  }
  return `linear(${points.substring(0, points.length - 2)})`;
};

// node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
var maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}

// node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function createGeneratorEasing(options, scale2 = 100, createGenerator) {
  const generator = createGenerator({ ...options, keyframes: [0, scale2] });
  const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
  return {
    type: "keyframes",
    ease: (progress2) => {
      return generator.next(duration * progress2).value / scale2;
    },
    duration: millisecondsToSeconds(duration)
  };
}

// node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var springDefaults = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
var safeMin = 1e-3;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
  let envelope;
  let derivative;
  warning(duration <= secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
  duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq2, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin - a / b * c;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: springDefaults.velocity,
    stiffness: springDefaults.stiffness,
    damping: springDefaults.damping,
    mass: springDefaults.mass,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    springOptions.velocity = 0;
    if (options.visualDuration) {
      const visualDuration = options.visualDuration;
      const root = 2 * Math.PI / (visualDuration * 1.2);
      const stiffness = root * root;
      const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
      springOptions = {
        ...springOptions,
        mass: springDefaults.mass,
        stiffness,
        damping
      };
    } else {
      const derived = findSpring({ ...options, velocity: 0 });
      springOptions = {
        ...springOptions,
        ...derived,
        mass: springDefaults.mass
      };
      springOptions.isResolvedFromDuration = true;
    }
  }
  return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
  const options = typeof optionsOrVisualDuration !== "object" ? {
    visualDuration: optionsOrVisualDuration,
    keyframes: [0, 1],
    bounce
  } : optionsOrVisualDuration;
  let { restSpeed, restDelta } = options;
  const origin = options.keyframes[0];
  const target = options.keyframes[options.keyframes.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
  restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
  let resolveSpring;
  let resolveVelocity;
  let angularFreq;
  let A;
  let sinCoeff;
  let cosCoeff;
  if (dampingRatio < 1) {
    angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    A = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq;
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return target - envelope * (A * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
    };
    sinCoeff = dampingRatio * undampedAngularFreq * A + initialDelta * angularFreq;
    cosCoeff = dampingRatio * undampedAngularFreq * initialDelta - A * angularFreq;
    resolveVelocity = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return envelope * (sinCoeff * Math.sin(angularFreq * t) + cosCoeff * Math.cos(angularFreq * t));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    const C = initialVelocity + undampedAngularFreq * initialDelta;
    resolveVelocity = (t) => Math.exp(-undampedAngularFreq * t) * (undampedAngularFreq * C * t - initialVelocity);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
    const P = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / dampedAngularFreq;
    const sinhCoeff = dampingRatio * undampedAngularFreq * P - initialDelta * dampedAngularFreq;
    const coshCoeff = dampingRatio * undampedAngularFreq * initialDelta - P * dampedAngularFreq;
    resolveVelocity = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return envelope * (sinhCoeff * Math.sinh(freqForT) + coshCoeff * Math.cosh(freqForT));
    };
  }
  const generator = {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    velocity: (t) => secondsToMilliseconds(resolveVelocity(t)),
    next: (t) => {
      if (!isResolvedFromDuration && dampingRatio < 1) {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        const sin = Math.sin(angularFreq * t);
        const cos = Math.cos(angularFreq * t);
        const current2 = target - envelope * (A * sin + initialDelta * cos);
        const currentVelocity = secondsToMilliseconds(envelope * (sinCoeff * sin + cosCoeff * cos));
        state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current2) <= restDelta;
        state.value = state.done ? target : current2;
        return state;
      }
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        const currentVelocity = secondsToMilliseconds(resolveVelocity(t));
        state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current) <= restDelta;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    },
    toString: () => {
      const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
      const easing = generateLinearEasing((progress2) => generator.next(calculatedDuration * progress2).value, calculatedDuration, 30);
      return calculatedDuration + "ms " + easing;
    },
    toTransition: () => {
    }
  };
  return generator;
}
spring.applyToOptions = (options) => {
  const generatorOptions = createGeneratorEasing(options, 100, spring);
  options.ease = generatorOptions.ease;
  options.duration = secondsToMilliseconds(generatorOptions.duration);
  options.type = "keyframes";
  return options;
};

// node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration = 5;
function getGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}

// node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes2[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t;
    spring$1 = spring({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: getGeneratorVelocity(calcLatest, t, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t);
        checkCatchBoundary(t);
      }
      if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) {
        return spring$1.next(t - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t);
        return state;
      }
    }
  };
}

// node_modules/motion-dom/dist/es/utils/interpolate.mjs
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i] || noop : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1])
    return () => output[1];
  const isZeroDeltaRange = input[0] === input[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    if (isZeroDeltaRange && v < input[0])
      return output[0];
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = progress(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset.push(mixNumber(min, 1, offsetProgress));
  }
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function defaultOffset(arr) {
  const offset = [0];
  fillOffset(offset, arr.length - 1);
  return offset;
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}

// node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t) => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}

// node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
  const resolvedKeyframes = keyframes2.filter(isNotNull);
  const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
  const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var transitionTypeMap = {
  decay: inertia,
  inertia,
  tween: keyframes,
  keyframes,
  spring
};
function replaceTransitionType(transition) {
  if (typeof transition.type === "string") {
    transition.type = transitionTypeMap[transition.type];
  }
}

// node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var WithPromise = class {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(onResolve, onReject) {
    return this.finished.then(onResolve, onReject);
  }
};

// node_modules/motion-dom/dist/es/animation/JSAnimation.mjs
var percentToProgress = (percent2) => percent2 / 100;
var JSAnimation = class extends WithPromise {
  constructor(options) {
    super();
    this.state = "idle";
    this.startTime = null;
    this.isStopped = false;
    this.currentTime = 0;
    this.holdTime = null;
    this.playbackSpeed = 1;
    this.delayState = {
      done: false,
      value: void 0
    };
    this.stop = () => {
      const { motionValue: motionValue2 } = this.options;
      if (motionValue2 && motionValue2.updatedAt !== time.now()) {
        this.tick(time.now());
      }
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.teardown();
      this.options.onStop?.();
    };
    activeAnimations.mainThread++;
    this.options = options;
    this.initAnimation();
    this.play();
    if (options.autoplay === false)
      this.pause();
  }
  initAnimation() {
    const { options } = this;
    replaceTransitionType(options);
    const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
    let { keyframes: keyframes$1 } = options;
    const generatorFactory = type || keyframes;
    if (process.env.NODE_ENV !== "production" && generatorFactory !== keyframes) {
      invariant(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`, "spring-two-frames");
    }
    if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
      this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
      keyframes$1 = [0, 100];
    }
    const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
    if (repeatType === "mirror") {
      this.mirroredGenerator = generatorFactory({
        ...options,
        keyframes: [...keyframes$1].reverse(),
        velocity: -velocity
      });
    }
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = calcGeneratorDuration(generator);
    }
    const { calculatedDuration } = generator;
    this.calculatedDuration = calculatedDuration;
    this.resolvedDuration = calculatedDuration + repeatDelay;
    this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
    this.generator = generator;
  }
  updateTime(timestamp) {
    const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
    if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      this.currentTime = animationTime;
    }
  }
  tick(timestamp, sample = false) {
    const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
    if (this.startTime === null)
      return generator.next(0);
    const { delay = 0, keyframes: keyframes2, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    if (sample) {
      this.currentTime = timestamp;
    } else {
      this.updateTime(timestamp);
    }
    const timeWithoutDelay = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
    const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    let state;
    if (isInDelayPhase) {
      this.delayState.value = keyframes2[0];
      state = this.delayState;
    } else {
      state = frameGenerator.next(elapsed);
    }
    if (mixKeyframes && !isInDelayPhase) {
      state.value = mixKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && type !== inertia) {
      state.value = getFinalKeyframe(keyframes2, this.options, finalKeyframe, this.speed);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.finished.then(resolve, reject);
  }
  get duration() {
    return millisecondsToSeconds(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay = 0 } = this.options || {};
    return this.duration + millisecondsToSeconds(delay);
  }
  get time() {
    return millisecondsToSeconds(this.currentTime);
  }
  set time(newTime) {
    newTime = secondsToMilliseconds(newTime);
    this.currentTime = newTime;
    if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.playbackSpeed;
    }
    if (this.driver) {
      this.driver.start(false);
    } else {
      this.startTime = 0;
      this.state = "paused";
      this.holdTime = newTime;
      this.tick(newTime);
    }
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const t = this.currentTime;
    if (t <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity) {
      return this.generator.velocity(t);
    }
    const current = this.generator.next(t).value;
    return getGeneratorVelocity((s) => this.generator.next(s).value, t, current);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    const hasChanged = this.playbackSpeed !== newSpeed;
    if (hasChanged && this.driver) {
      this.updateTime(time.now());
    }
    this.playbackSpeed = newSpeed;
    if (hasChanged && this.driver) {
      this.time = millisecondsToSeconds(this.currentTime);
    }
  }
  play() {
    if (this.isStopped)
      return;
    const { driver = frameloopDriver, startTime } = this.options;
    if (!this.driver) {
      this.driver = driver((timestamp) => this.tick(timestamp));
    }
    this.options.onPlay?.();
    const now2 = this.driver.now();
    if (this.state === "finished") {
      this.updateFinished();
      this.startTime = now2;
    } else if (this.holdTime !== null) {
      this.startTime = now2 - this.holdTime;
    } else if (!this.startTime) {
      this.startTime = startTime ?? now2;
    }
    if (this.state === "finished" && this.speed < 0) {
      this.startTime += this.calculatedDuration;
    }
    this.holdTime = null;
    this.state = "running";
    this.driver.start();
  }
  pause() {
    this.state = "paused";
    this.updateTime(time.now());
    this.holdTime = this.currentTime;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    this.notifyFinished();
    this.teardown();
    this.state = "finished";
    this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null;
    this.startTime = 0;
    this.tick(0);
    this.teardown();
    this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle";
    this.stopDriver();
    this.startTime = this.holdTime = null;
    activeAnimations.mainThread--;
  }
  stopDriver() {
    if (!this.driver)
      return;
    this.driver.stop();
    this.driver = void 0;
  }
  sample(sampleTime) {
    this.startTime = 0;
    return this.tick(sampleTime, true);
  }
  attachTimeline(timeline) {
    if (this.options.allowFlatten) {
      this.options.type = "keyframes";
      this.options.ease = "linear";
      this.initAnimation();
    }
    this.driver?.stop();
    return timeline.observe(this);
  }
};

// node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function fillWildcards(keyframes2) {
  for (let i = 1; i < keyframes2.length; i++) {
    keyframes2[i] ?? (keyframes2[i] = keyframes2[i - 1]);
  }
}

// node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var radToDeg = (rad) => rad * 180 / Math.PI;
var rotate = (v) => {
  const angle = radToDeg(Math.atan2(v[1], v[0]));
  return rebaseAngle(angle);
};
var matrix2dParsers = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
  rotate,
  rotateZ: rotate,
  skewX: (v) => radToDeg(Math.atan(v[1])),
  skewY: (v) => radToDeg(Math.atan(v[2])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2
};
var rebaseAngle = (angle) => {
  angle = angle % 360;
  if (angle < 0)
    angle += 360;
  return angle;
};
var rotateZ = rotate;
var scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
var scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
var matrix3dParsers = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX,
  scaleY,
  scale: (v) => (scaleX(v) + scaleY(v)) / 2,
  rotateX: (v) => rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
  rotateY: (v) => rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
  rotateZ,
  rotate: rotateZ,
  skewX: (v) => radToDeg(Math.atan(v[4])),
  skewY: (v) => radToDeg(Math.atan(v[1])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
  return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
  if (!transform || transform === "none") {
    return defaultTransformValue(name);
  }
  const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let parsers;
  let match;
  if (matrix3dMatch) {
    parsers = matrix3dParsers;
    match = matrix3dMatch;
  } else {
    const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    parsers = matrix2dParsers;
    match = matrix2dMatch;
  }
  if (!match) {
    return defaultTransformValue(name);
  }
  const valueParser = parsers[name];
  const values = match[1].split(",").map(convertTransformToNumber);
  return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
var readTransformValue = (instance, name) => {
  const { transform = "none" } = getComputedStyle(instance);
  return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
  return parseFloat(value.trim());
}

// node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
var transformProps = /* @__PURE__ */ (() => new Set(transformPropOrder))();

// node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs
var isNumOrPxType = (v) => v === number || v === px;
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
var positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0", boxSizing }) => {
    const width = x.max - x.min;
    return boxSizing === "border-box" ? width : width - parseFloat(paddingLeft) - parseFloat(paddingRight);
  },
  height: ({ y }, { paddingTop = "0", paddingBottom = "0", boxSizing }) => {
    const height = y.max - y.min;
    return boxSizing === "border-box" ? height : height - parseFloat(paddingTop) - parseFloat(paddingBottom);
  },
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: (_bbox, { transform }) => parseValueFromTransform(transform, "x"),
  y: (_bbox, { transform }) => parseValueFromTransform(transform, "y")
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;

// node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var toResolve = /* @__PURE__ */ new Set();
var isScheduled = false;
var anyNeedsMeasurement = false;
var isForced = false;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
    const transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach((element) => {
      const removedTransforms = removeNonTranslationalTransform(element);
      if (!removedTransforms.length)
        return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
    elementsToMeasure.forEach((element) => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          element.getValue(key)?.set(value);
        });
      }
    });
    resolversToMeasure.forEach((resolver) => resolver.measureEndState());
    resolversToMeasure.forEach((resolver) => {
      if (resolver.suspendedScrollY !== void 0) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement = false;
  isScheduled = false;
  toResolve.forEach((resolver) => resolver.complete(isForced));
  toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach((resolver) => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement = true;
    }
  });
}
function flushKeyframeResolvers() {
  isForced = true;
  readAllKeyframes();
  measureAllKeyframes();
  isForced = false;
}
var KeyframeResolver = class {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
    this.state = "pending";
    this.isAsync = false;
    this.needsMeasurement = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue2;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.state = "scheduled";
    if (this.isAsync) {
      toResolve.add(this);
      if (!isScheduled) {
        isScheduled = true;
        frame.read(readAllKeyframes);
        frame.resolveKeyframes(measureAllKeyframes);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
    if (unresolvedKeyframes[0] === null) {
      const currentValue = motionValue2?.get();
      const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
      if (currentValue !== void 0) {
        unresolvedKeyframes[0] = currentValue;
      } else if (element && name) {
        const valueAsRead = element.readValue(name, finalKeyframe);
        if (valueAsRead !== void 0 && valueAsRead !== null) {
          unresolvedKeyframes[0] = valueAsRead;
        }
      }
      if (unresolvedKeyframes[0] === void 0) {
        unresolvedKeyframes[0] = finalKeyframe;
      }
      if (motionValue2 && currentValue === void 0) {
        motionValue2.set(unresolvedKeyframes[0]);
      }
    }
    fillWildcards(unresolvedKeyframes);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(isForcedComplete = false) {
    this.state = "complete";
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
    toResolve.delete(this);
  }
  cancel() {
    if (this.state === "scheduled") {
      toResolve.delete(this);
      this.state = "pending";
    }
  }
  resume() {
    if (this.state === "pending")
      this.scheduleResolve();
  }
};

// node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs
var isCSSVar = (name) => name.startsWith("--");

// node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function setStyle(element, name, value) {
  isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}

// node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var supportsFlags = {};

// node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function memoSupports(callback, supportsFlag) {
  const memoized = memo(callback);
  return () => supportsFlags[supportsFlag] ?? memoized();
}

// node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var supportsScrollTimeline = /* @__PURE__ */ memoSupports(() => window.ScrollTimeline !== void 0, "scrollTimeline");

// node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs
var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch (e) {
    return false;
  }
  return true;
}, "linearEasing");

// node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs
var cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

// node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs
var supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};

// node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function mapEasingToNativeEasing(easing, duration) {
  if (!easing) {
    return void 0;
  } else if (typeof easing === "function") {
    return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
  } else if (isBezierDefinition(easing)) {
    return cubicBezierAsString(easing);
  } else if (Array.isArray(easing)) {
    return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
  } else {
    return supportedWaapiEasing[easing];
  }
}

// node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function startWaapiAnimation(element, valueName, keyframes2, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2 = "easeOut", times } = {}, pseudoElement = void 0) {
  const keyframeOptions = {
    [valueName]: keyframes2
  };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease2, duration);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  if (statsBuffer.value) {
    activeAnimations.waapi++;
  }
  const options = {
    delay,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  };
  if (pseudoElement)
    options.pseudoElement = pseudoElement;
  const animation = element.animate(keyframeOptions, options);
  if (statsBuffer.value) {
    animation.finished.finally(() => {
      activeAnimations.waapi--;
    });
  }
  return animation;
}

// node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function isGenerator(type) {
  return typeof type === "function" && "applyToOptions" in type;
}

// node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function applyGeneratorOptions({ type, ...options }) {
  if (isGenerator(type) && supportsLinearEasing()) {
    return type.applyToOptions(options);
  } else {
    options.duration ?? (options.duration = 300);
    options.ease ?? (options.ease = "easeOut");
  }
  return options;
}

// node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var NativeAnimation = class extends WithPromise {
  constructor(options) {
    super();
    this.finishedTime = null;
    this.isStopped = false;
    this.manualStartTime = null;
    if (!options)
      return;
    const { element, name, keyframes: keyframes2, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
    this.isPseudoElement = Boolean(pseudoElement);
    this.allowFlatten = allowFlatten;
    this.options = options;
    invariant(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const transition = applyGeneratorOptions(options);
    this.animation = startWaapiAnimation(element, name, keyframes2, transition, pseudoElement);
    if (transition.autoplay === false) {
      this.animation.pause();
    }
    this.animation.onfinish = () => {
      this.finishedTime = this.time;
      if (!pseudoElement) {
        const keyframe = getFinalKeyframe(keyframes2, this.options, finalKeyframe, this.speed);
        if (this.updateMotionValue) {
          this.updateMotionValue(keyframe);
        }
        setStyle(element, name, keyframe);
        this.animation.cancel();
      }
      onComplete?.();
      this.notifyFinished();
    };
  }
  play() {
    if (this.isStopped)
      return;
    this.manualStartTime = null;
    this.animation.play();
    if (this.state === "finished") {
      this.updateFinished();
    }
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch (e) {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = true;
    const { state } = this;
    if (state === "idle" || state === "finished") {
      return;
    }
    if (this.updateMotionValue) {
      this.updateMotionValue();
    } else {
      this.commitStyles();
    }
    if (!this.isPseudoElement)
      this.cancel();
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const element = this.options?.element;
    if (!this.isPseudoElement && element?.isConnected) {
      this.animation.commitStyles?.();
    }
  }
  get duration() {
    const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
    return millisecondsToSeconds(Number(duration));
  }
  get iterationDuration() {
    const { delay = 0 } = this.options || {};
    return this.duration + millisecondsToSeconds(delay);
  }
  get time() {
    return millisecondsToSeconds(Number(this.animation.currentTime) || 0);
  }
  set time(newTime) {
    const wasFinished = this.finishedTime !== null;
    this.manualStartTime = null;
    this.finishedTime = null;
    this.animation.currentTime = secondsToMilliseconds(newTime);
    if (wasFinished) {
      this.animation.pause();
    }
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(newSpeed) {
    if (newSpeed < 0)
      this.finishedTime = null;
    this.animation.playbackRate = newSpeed;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(newStartTime) {
    this.manualStartTime = this.animation.startTime = newStartTime;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline, rangeStart, rangeEnd, observe }) {
    if (this.allowFlatten) {
      this.animation.effect?.updateTiming({ easing: "linear" });
    }
    this.animation.onfinish = null;
    if (timeline && supportsScrollTimeline()) {
      this.animation.timeline = timeline;
      if (rangeStart)
        this.animation.rangeStart = rangeStart;
      if (rangeEnd)
        this.animation.rangeEnd = rangeEnd;
      return noop;
    } else {
      return observe(this);
    }
  }
};

// node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs
var unsupportedEasingFunctions = {
  anticipate,
  backInOut,
  circInOut
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
  if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
    transition.ease = unsupportedEasingFunctions[transition.ease];
  }
}

// node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var sampleDelta = 10;
var NativeAnimationExtended = class extends NativeAnimation {
  constructor(options) {
    replaceStringEasing(options);
    replaceTransitionType(options);
    super(options);
    if (options.startTime !== void 0 && options.autoplay !== false) {
      this.startTime = options.startTime;
    }
    this.options = options;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(value) {
    const { motionValue: motionValue2, onUpdate, onComplete, element, ...options } = this.options;
    if (!motionValue2)
      return;
    if (value !== void 0) {
      motionValue2.set(value);
      return;
    }
    const sampleAnimation = new JSAnimation({
      ...options,
      autoplay: false
    });
    const sampleTime = Math.max(sampleDelta, time.now() - this.startTime);
    const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
    const current = sampleAnimation.sample(sampleTime).value;
    const { name } = this.options;
    if (element && name)
      setStyle(element, name, current);
    motionValue2.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, current, delta);
    sampleAnimation.stop();
  }
};

// node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs
var isAnimatable = (value, name) => {
  if (name === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function hasKeyframesChanged(keyframes2) {
  const current = keyframes2[0];
  if (keyframes2.length === 1)
    return true;
  for (let i = 0; i < keyframes2.length; i++) {
    if (keyframes2[i] !== current)
      return true;
  }
}
function canAnimate(keyframes2, name, type, velocity) {
  const originKeyframe = keyframes2[0];
  if (originKeyframe === null) {
    return false;
  }
  if (name === "display" || name === "visibility")
    return true;
  const targetKeyframe = keyframes2[keyframes2.length - 1];
  const isOriginAnimatable = isAnimatable(originKeyframe, name);
  const isTargetAnimatable = isAnimatable(targetKeyframe, name);
  warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes2) || (type === "spring" || isGenerator(type)) && velocity;
}

// node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function makeAnimationInstant(options) {
  options.duration = 0;
  options.type = "keyframes";
}

// node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);

// node_modules/motion-dom/dist/es/animation/waapi/utils/is-browser-color.mjs
var browserColorFunctions = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function hasBrowserOnlyColors(keyframes2) {
  for (let i = 0; i < keyframes2.length; i++) {
    if (typeof keyframes2[i] === "string" && browserColorFunctions.test(keyframes2[i])) {
      return true;
    }
  }
  return false;
}

// node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var colorProperties = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]);
var supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
  const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type, keyframes: keyframes2 } = options;
  const subject = motionValue2?.owner?.current;
  if (!(subject instanceof HTMLElement)) {
    return false;
  }
  const { onUpdate, transformTemplate } = motionValue2.owner.getProps();
  return supportsWaapi() && name && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (acceleratedValues.has(name) || colorProperties.has(name) && hasBrowserOnlyColors(keyframes2)) && (name !== "transform" || !transformTemplate) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}

// node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var MAX_RESOLVE_DELAY = 40;
var AsyncMotionValueAnimation = class extends WithPromise {
  constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes2, name, motionValue: motionValue2, element, ...options }) {
    super();
    this.stop = () => {
      if (this._animation) {
        this._animation.stop();
        this.stopTimeline?.();
      }
      this.keyframeResolver?.cancel();
    };
    this.createdAt = time.now();
    const optionsWithDefaults = {
      autoplay,
      delay,
      type,
      repeat,
      repeatDelay,
      repeatType,
      name,
      motionValue: motionValue2,
      element,
      ...options
    };
    const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
    this.keyframeResolver = new KeyframeResolver$1(keyframes2, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue2, element);
    this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(keyframes2, finalKeyframe, options, sync) {
    this.keyframeResolver = void 0;
    const { name, type, velocity, delay, isHandoff, onUpdate } = options;
    this.resolvedAt = time.now();
    let canAnimateValue = true;
    if (!canAnimate(keyframes2, name, type, velocity)) {
      canAnimateValue = false;
      if (MotionGlobalConfig.instantAnimations || !delay) {
        onUpdate?.(getFinalKeyframe(keyframes2, options, finalKeyframe));
      }
      keyframes2[0] = keyframes2[keyframes2.length - 1];
      makeAnimationInstant(options);
      options.repeat = 0;
    }
    const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
    const resolvedOptions = {
      startTime,
      finalKeyframe,
      ...options,
      keyframes: keyframes2
    };
    const useWaapi = canAnimateValue && !isHandoff && supportsBrowserAnimation(resolvedOptions);
    const element = resolvedOptions.motionValue?.owner?.current;
    let animation;
    if (useWaapi) {
      try {
        animation = new NativeAnimationExtended({
          ...resolvedOptions,
          element
        });
      } catch {
        animation = new JSAnimation(resolvedOptions);
      }
    } else {
      animation = new JSAnimation(resolvedOptions);
    }
    animation.finished.then(() => {
      this.notifyFinished();
    }).catch(noop);
    if (this.pendingTimeline) {
      this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
      this.pendingTimeline = void 0;
    }
    this._animation = animation;
  }
  get finished() {
    if (!this._animation) {
      return this._finished;
    } else {
      return this.animation.finished;
    }
  }
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
  get animation() {
    if (!this._animation) {
      this.keyframeResolver?.resume();
      flushKeyframeResolvers();
    }
    return this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(newTime) {
    this.animation.time = newTime;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(newSpeed) {
    this.animation.speed = newSpeed;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(timeline) {
    if (this._animation) {
      this.stopTimeline = this.animation.attachTimeline(timeline);
    } else {
      this.pendingTimeline = timeline;
    }
    return () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    if (this._animation) {
      this.animation.cancel();
    }
    this.keyframeResolver?.cancel();
  }
};

// node_modules/motion-dom/dist/es/animation/GroupAnimation.mjs
var GroupAnimation = class {
  constructor(animations) {
    this.stop = () => this.runAll("stop");
    this.animations = animations.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((animation) => animation.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(propName) {
    return this.animations[0][propName];
  }
  setAll(propName, newValue) {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i][propName] = newValue;
    }
  }
  attachTimeline(timeline) {
    const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
    return () => {
      subscriptions.forEach((cancel, i) => {
        cancel && cancel();
        this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(time2) {
    this.setAll("time", time2);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(speed) {
    this.setAll("speed", speed);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return getMax(this.animations, "duration");
  }
  get iterationDuration() {
    return getMax(this.animations, "iterationDuration");
  }
  runAll(methodName) {
    this.animations.forEach((controls) => controls[methodName]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
};
function getMax(animations, propName) {
  let max = 0;
  for (let i = 0; i < animations.length; i++) {
    const value = animations[i][propName];
    if (value !== null && value > max) {
      max = value;
    }
  }
  return max;
}

// node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var GroupAnimationWithThen = class extends GroupAnimation {
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
};

// node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs
var splitCSSVariableRegex = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 ?? token2}`, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}

// node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
var keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
var ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
var getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
  if (keyframes2.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
  }
  return ease;
};

// node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function resolveTransition(transition, parentTransition) {
  if (transition?.inherit && parentTransition) {
    const { inherit: _, ...rest } = transition;
    return { ...parentTransition, ...rest };
  }
  return transition;
}

// node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function getValueTransition(transition, key) {
  const valueTransition = transition?.[key] ?? transition?.["default"] ?? transition;
  if (valueTransition !== transition) {
    return resolveTransition(valueTransition, transition);
  }
  return valueTransition;
}

// node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs
var orchestrationKeys = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function isTransitionDefined(transition) {
  for (const key in transition) {
    if (!orchestrationKeys.has(key))
      return true;
  }
  return false;
}

// node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition(transition, name) || {};
  const delay = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - secondsToMilliseconds(delay);
  const options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v) => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined(valueTransition)) {
    Object.assign(options, getDefaultTransition(name, options));
  }
  options.duration && (options.duration = secondsToMilliseconds(options.duration));
  options.repeatDelay && (options.repeatDelay = secondsToMilliseconds(options.repeatDelay));
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    makeAnimationInstant(options);
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations || element?.shouldSkipAnimations) {
    shouldSkip = true;
    makeAnimationInstant(options);
    options.delay = 0;
  }
  options.allowFlatten = !valueTransition.type && !valueTransition.ease;
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return;
    }
  }
  return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
};

// node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
  const state = [{}, {}];
  visualElement?.values.forEach((value, key) => {
    state[0][key] = value.get();
    state[1][key] = value.getVelocity();
  });
  return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  return definition;
}

// node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}

// node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...transformPropOrder
]);

// node_modules/motion-dom/dist/es/value/index.mjs
var MAX_VELOCITY_DELTA = 30;
var isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
var collectMotionValues = {
  current: void 0
};
var MotionValue = class {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(init, options = {}) {
    this.canTrackVelocity = null;
    this.events = {};
    this.updateAndNotify = (v) => {
      const currentTime = time.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      if (this.current !== this.prev) {
        this.events.change?.notify(this.current);
        if (this.dependents) {
          for (const dependent of this.dependents) {
            dependent.dirty();
          }
        }
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = time.now();
    if (this.canTrackVelocity === null && current !== void 0) {
      this.canTrackVelocity = isFloat(this.current);
    }
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if (process.env.NODE_ENV !== "production") {
      warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v) {
    if (!this.passiveEffect) {
      this.updateAndNotify(v);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v, endAnimation = true) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    endAnimation && this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(dependent) {
    if (!this.dependents) {
      this.dependents = /* @__PURE__ */ new Set();
    }
    this.dependents.add(dependent);
  }
  removeDependent(dependent) {
    if (this.dependents) {
      this.dependents.delete(dependent);
    }
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues.current) {
      collectMotionValues.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear();
    this.events.destroy?.notify();
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
};
function motionValue(init, options) {
  return new MotionValue(init, options);
}

// node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs
var isKeyframesTarget = (v) => {
  return Array.isArray(v);
};

// node_modules/motion-dom/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function resolveFinalValueInKeyframes(v) {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}

// node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = (value) => Boolean(value && value.getVelocity);

// node_modules/motion-dom/dist/es/value/will-change/is.mjs
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}

// node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key);
  } else if (!willChange && MotionGlobalConfig.WillChange) {
    const newWillChange = new MotionGlobalConfig.WillChange("auto");
    visualElement.addValue("willChange", newWillChange);
    newWillChange.add(key);
  }
}

// node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function camelToDash(str) {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}

// node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs
var optimizedAppearDataId = "framerAppearId";
var optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

// node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId(visualElement) {
  return visualElement.props[optimizedAppearDataAttribute];
}

// node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
  let { transition, transitionEnd, ...target } = targetAndTransition;
  const defaultTransition = visualElement.getDefaultTransition();
  transition = transition ? resolveTransition(transition, defaultTransition) : defaultTransition;
  const reduceMotion = transition?.reduceMotion;
  if (transitionOverride)
    transition = transitionOverride;
  const animations = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
    const valueTarget = target[key];
    if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay,
      ...getValueTransition(transition || {}, key)
    };
    const currentValue = value.get();
    if (currentValue !== void 0 && !value.isAnimating() && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
      frame.update(() => value.set(valueTarget));
      continue;
    }
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId(visualElement);
      if (appearId) {
        const startTime = window.MotionHandoffAnimation(appearId, key, frame);
        if (startTime !== null) {
          valueTransition.startTime = startTime;
          isHandoff = true;
        }
      }
    }
    addValueToWillChange(visualElement, key);
    const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
    value.start(animateMotionValue(key, value, valueTarget, shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      animations.push(animation);
    }
  }
  if (transitionEnd) {
    const applyTransitionEnd = () => frame.update(() => {
      transitionEnd && setTarget(visualElement, transitionEnd);
    });
    if (animations.length) {
      Promise.all(animations).then(applyTransitionEnd);
    } else {
      applyTransitionEnd();
    }
  }
  return animations;
}

// node_modules/motion-dom/dist/es/value/types/auto.mjs
var auto = {
  test: (v) => v === "auto",
  parse: (v) => v
};

// node_modules/motion-dom/dist/es/value/types/test.mjs
var testValueType = (v) => (type) => type.test(v);

// node_modules/motion-dom/dist/es/value/types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));

// node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  } else {
    return true;
  }
}

// node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu;
var filter = {
  ...complex,
  getAnimatableNone: (v) => {
    const functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v;
  }
};

// node_modules/motion-dom/dist/es/value/types/complex/mask.mjs
var mask = {
  ...complex,
  getAnimatableNone: (v) => {
    const parsed = complex.parse(v);
    const transformer = complex.createTransformer(v);
    return transformer(parsed.map((v2) => typeof v2 === "number" ? 0 : typeof v2 === "object" ? { ...v2, alpha: 1 } : v2));
  }
};

// node_modules/motion-dom/dist/es/value/types/int.mjs
var int = {
  ...number,
  transform: Math.round
};

// node_modules/motion-dom/dist/es/value/types/maps/transform.mjs
var transformValueTypes = {
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px
};

// node_modules/motion-dom/dist/es/value/types/maps/number.mjs
var numberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  inset: px,
  insetBlock: px,
  insetBlockStart: px,
  insetBlockEnd: px,
  insetInline: px,
  insetInlineStart: px,
  insetInlineEnd: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  paddingBlock: px,
  paddingBlockStart: px,
  paddingBlockEnd: px,
  paddingInline: px,
  paddingInlineStart: px,
  paddingInlineEnd: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  marginBlock: px,
  marginBlockStart: px,
  marginBlockEnd: px,
  marginInline: px,
  marginInlineStart: px,
  marginInlineEnd: px,
  // Typography
  fontSize: px,
  // Misc
  backgroundPositionX: px,
  backgroundPositionY: px,
  ...transformValueTypes,
  zIndex: int,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs
var defaultValueTypes = {
  ...numberValueTypes,
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter,
  mask,
  WebkitMask: mask
};
var getDefaultValueType = (key) => defaultValueTypes[key];

// node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs
var customTypes = /* @__PURE__ */ new Set([filter, mask]);
function getAnimatableNone2(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (!customTypes.has(defaultValueType))
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}

// node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var invalidTemplates = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0;
  let animatableTemplate = void 0;
  while (i < unresolvedKeyframes.length && !animatableTemplate) {
    const keyframe = unresolvedKeyframes[i];
    if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
      animatableTemplate = unresolvedKeyframes[i];
    }
    i++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = getAnimatableNone2(name, animatableTemplate);
    }
  }
}

// node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var DOMKeyframesResolver = class extends KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue2, element, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes, element, name } = this;
    if (!element || !element.current)
      return;
    super.readKeyframes();
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      let keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string") {
        keyframe = keyframe.trim();
        if (isCSSVariableToken(keyframe)) {
          const resolved = getVariableValue(keyframe, element.current);
          if (resolved !== void 0) {
            unresolvedKeyframes[i] = resolved;
          }
          if (i === unresolvedKeyframes.length - 1) {
            this.finalKeyframe = keyframe;
          }
        }
      }
    }
    this.resolveNoneKeyframes();
    if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
      return;
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = findDimensionValueType(origin);
    const targetType = findDimensionValueType(target);
    const originHasVar = containsCSSVariable(origin);
    const targetHasVar = containsCSSVariable(target);
    if (originHasVar !== targetHasVar && positionalValues[name]) {
      this.needsMeasurement = true;
      return;
    }
    if (originType === targetType)
      return;
    if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        const value = unresolvedKeyframes[i];
        if (typeof value === "string") {
          unresolvedKeyframes[i] = parseFloat(value);
        }
      }
    } else if (positionalValues[name]) {
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes, name } = this;
    const noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (unresolvedKeyframes[i] === null || isNone(unresolvedKeyframes[i])) {
        noneKeyframeIndexes.push(i);
      }
    }
    if (noneKeyframeIndexes.length) {
      makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const { element, unresolvedKeyframes, name } = this;
    if (!element || !element.current)
      return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== void 0) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    const { element, name, unresolvedKeyframes } = this;
    if (!element || !element.current)
      return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === void 0) {
      this.finalKeyframe = finalKeyframe;
    }
    if (this.removedTransforms?.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
};

// node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function resolveElements(elementOrSelector, scope, selectorCache) {
  if (elementOrSelector == null) {
    return [];
  }
  if (elementOrSelector instanceof EventTarget) {
    return [elementOrSelector];
  } else if (typeof elementOrSelector === "string") {
    let root = document;
    if (scope) {
      root = scope.current;
    }
    const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
    return elements ? Array.from(elements) : [];
  }
  return Array.from(elementOrSelector).filter((element) => element != null);
}

// node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// node_modules/motion-dom/dist/es/frameloop/microtask.mjs
var { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);

// node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function isSVGElement(element) {
  return isObject(element) && "ownerSVGElement" in element;
}

// node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function isSVGSVGElement(element) {
  return isSVGElement(element) && element.tagName === "svg";
}

// node_modules/motion-dom/dist/es/utils/stagger.mjs
function getOriginIndex(from, total) {
  if (from === "first") {
    return 0;
  } else {
    const lastIndex = total - 1;
    return from === "last" ? lastIndex : lastIndex / 2;
  }
}
function stagger(duration = 0.1, { startDelay = 0, from = 0, ease: ease2 } = {}) {
  return (i, total) => {
    const fromIndex = typeof from === "number" ? from : getOriginIndex(from, total);
    const distance = Math.abs(fromIndex - i);
    let delay = duration * distance;
    if (ease2) {
      const maxDelay = total * duration;
      const easingFunction = easingDefinitionToFunction(ease2);
      delay = easingFunction(delay / maxDelay) * maxDelay;
    }
    return startDelay + delay;
  };
}

// node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var valueTypes = [...dimensionValueTypes, color, complex];
var findValueType = (v) => valueTypes.find(testValueType(v));

// node_modules/motion-dom/dist/es/projection/geometry/models.mjs
var createAxis = () => ({ min: 0, max: 0 });
var createBox = () => ({
  x: createAxis(),
  y: createAxis()
});

// node_modules/motion-dom/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();

// node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function isAnimationControls(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}

// node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}

// node_modules/motion-dom/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
var variantProps = ["initial", ...variantPriorityOrder];

// node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}

// node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };

// node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs
var isBrowser = typeof window !== "undefined";
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}

// node_modules/motion-dom/dist/es/render/VisualElement.mjs
var propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
var featureDefinitions = {};
var VisualElement = class {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.shouldSkipAnimations = false;
    this.values = /* @__PURE__ */ new Map();
    this.KeyframeResolver = KeyframeResolver;
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.hasBeenMounted = false;
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.renderScheduledAt = 0;
    this.scheduleRender = () => {
      const now2 = time.now();
      if (this.renderScheduledAt < now2) {
        this.renderScheduledAt = now2;
        frame.render(this.render, false, true);
      }
    };
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.skipAnimationsConfig = skipAnimations;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key]);
      }
    }
  }
  mount(instance) {
    if (this.hasBeenMounted) {
      for (const key in this.initialValues) {
        this.values.get(key)?.jump(this.initialValues[key]);
        this.latestValues[key] = this.initialValues[key];
      }
    }
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (this.reducedMotionConfig === "never") {
      this.shouldReduceMotion = false;
    } else if (this.reducedMotionConfig === "always") {
      this.shouldReduceMotion = true;
    } else {
      if (!hasReducedMotionListener.current) {
        initPrefersReducedMotion();
      }
      this.shouldReduceMotion = prefersReducedMotion.current;
    }
    if (process.env.NODE_ENV !== "production") {
      warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
    }
    this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
    this.parent?.addChild(this);
    this.update(this.props, this.presenceContext);
    this.hasBeenMounted = true;
  }
  unmount() {
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.valueSubscriptions.clear();
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent?.removeChild(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature) {
        feature.unmount();
        feature.isMounted = false;
      }
    }
    this.current = null;
  }
  addChild(child) {
    this.children.add(child);
    this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set());
    this.enteringChildren.add(child);
  }
  removeChild(child) {
    this.children.delete(child);
    this.enteringChildren && this.enteringChildren.delete(child);
  }
  bindToMotionValue(key, value) {
    if (this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.get(key)();
    }
    if (value.accelerate && acceleratedValues.has(key) && this.current instanceof HTMLElement) {
      const { factory, keyframes: keyframes2, times, ease: ease2, duration } = value.accelerate;
      const animation = new NativeAnimation({
        element: this.current,
        name: key,
        keyframes: keyframes2,
        times,
        ease: ease2,
        duration: secondsToMilliseconds(duration)
      });
      const cleanup = factory(animation);
      this.valueSubscriptions.set(key, () => {
        cleanup();
        animation.cancel();
      });
      return;
    }
    const valueIsTransform = transformProps.has(key);
    if (valueIsTransform && this.onBindTransform) {
      this.onBindTransform();
    }
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
      this.scheduleRender();
    });
    let removeSyncCheck;
    if (typeof window !== "undefined" && window.MotionCheckAppearSync) {
      removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
    }
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      if (removeSyncCheck)
        removeSyncCheck();
      if (value.owner)
        value.stop();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  updateFeatures() {
    let key = "animation";
    for (key in featureDefinitions) {
      const featureDefinition = featureDefinitions[key];
      if (!featureDefinition)
        continue;
      const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
      if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
        this.features[key] = new FeatureConstructor(this);
      }
      if (this.features[key]) {
        const feature = this.features[key];
        if (feature.isMounted) {
          feature.update();
        } else {
          feature.mount();
          feature.isMounted = true;
        }
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue)
        this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
    if (value !== void 0 && value !== null) {
      if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
        value = parseFloat(value);
      } else if (!findValueType(value) && complex.test(target)) {
        value = getAnimatableNone2(key, target);
      }
      this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
    }
    return isMotionValue(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    const { initial } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = resolveVariantFromProps(this.props, initial, this.presenceContext?.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
  scheduleRenderMicrotask() {
    microtask.render(this.render);
  }
};

// node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    const style = props.style;
    return style ? style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current) {
          this.current.textContent = `${latest}`;
        }
      });
    }
  }
};

// node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function transformBoxPoints(point, transformPoint) {
  if (!transformPoint)
    return point;
  const topLeft = transformPoint({ x: point.left, y: point.top });
  const bottomRight = transformPoint({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint));
}

// node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform, transformTemplate) {
  let transformString = "";
  let transformIsDefault = true;
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i];
    const value = latestValues[key];
    if (value === void 0)
      continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      const parsed = parseFloat(value);
      valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
    }
    if (!valueIsDefault || transformTemplate) {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (!valueIsDefault) {
        transformIsDefault = false;
        const transformName = translateAlias[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      if (transformTemplate) {
        transform[key] = valueAsType;
      }
    }
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}

// node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const { style, vars, transformOrigin } = state;
  let hasTransform = false;
  let hasTransformOrigin = false;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (transformProps.has(key)) {
      hasTransform = true;
      continue;
    } else if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    } else {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (key.startsWith("origin")) {
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform || transformTemplate) {
      style.transform = buildTransform(latestValues, state.transform, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}

// node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars }, styleProp, projection) {
  const elementStyle = element.style;
  let key;
  for (key in style) {
    elementStyle[key] = style[key];
  }
  projection?.applyProjectionStyles(elementStyle, styleProp);
  for (key in vars) {
    elementStyle.setProperty(key, vars[key]);
  }
}

// node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};

// node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mixNumber(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};

// node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  const style = props.style;
  const prevStyle = prevProps?.style;
  const newValues = {};
  if (!style)
    return newValues;
  for (const key in style) {
    if (isMotionValue(style[key]) || prevStyle && isMotionValue(prevStyle[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}

// node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = renderHTML;
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      return this.projection?.isProjecting ? defaultTransformValue(key) : readTransformValue(instance, key);
    } else {
      const computedStyle = getComputedStyle2(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
};

// node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
function isObjectKey(key, object) {
  return key in object;
}
var ObjectVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments);
    this.type = "object";
  }
  readValueFromInstance(instance, key) {
    if (isObjectKey(key, instance)) {
      const value = instance[key];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      }
    }
    return void 0;
  }
  getBaseTargetFromProps() {
    return void 0;
  }
  removeValueFromRenderState(key, renderState) {
    delete renderState.output[key];
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  build(renderState, latestValues) {
    Object.assign(renderState.output, latestValues);
  }
  renderInstance(instance, { output }) {
    Object.assign(instance, output);
  }
  sortInstanceNodePosition() {
    return 0;
  }
};

// node_modules/motion-dom/dist/es/render/svg/utils/path.mjs
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = `${-offset}`;
  attrs[keys.array] = `${length} ${spacing}`;
}

// node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var cssMotionPathProperties = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, isSVGTag2, transformTemplate, styleProp) {
  buildHTMLStyles(state, latest, transformTemplate);
  if (isSVGTag2) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style } = state;
  if (attrs.transform) {
    style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (style.transform || attrs.transformOrigin) {
    style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
    delete attrs.transformOrigin;
  }
  if (style.transform) {
    style.transformBox = styleProp?.transformBox ?? "fill-box";
    delete attrs.transformBox;
  }
  for (const key of cssMotionPathProperties) {
    if (attrs[key] !== void 0) {
      style[key] = attrs[key];
      delete attrs[key];
    }
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);

// node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

// node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
    this.measureInstanceViewportBox = createBox;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps2(props, prevProps, visualElement);
  }
  build(renderState, latestValues, props) {
    buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
};

// node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function animateSingleValue(value, keyframes2, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
  return motionValue$1.animation;
}

// node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function isDOMKeyframes(keyframes2) {
  return typeof keyframes2 === "object" && !Array.isArray(keyframes2);
}

// node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function resolveSubjects(subject, keyframes2, scope, selectorCache) {
  if (subject == null) {
    return [];
  }
  if (typeof subject === "string" && isDOMKeyframes(keyframes2)) {
    return resolveElements(subject, scope, selectorCache);
  } else if (subject instanceof NodeList) {
    return Array.from(subject);
  } else if (Array.isArray(subject)) {
    return subject.filter((s) => s != null);
  } else {
    return [subject];
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function calculateRepeatDuration(duration, repeat, _repeatDelay) {
  return duration * (repeat + 1);
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function calcNextTime(current, next, prev, labels) {
  if (typeof next === "number") {
    return next;
  } else if (next.startsWith("-") || next.startsWith("+")) {
    return Math.max(0, current + parseFloat(next));
  } else if (next === "<") {
    return prev;
  } else if (next.startsWith("<")) {
    return Math.max(0, prev + parseFloat(next.slice(1)));
  } else {
    return labels.get(next) ?? current;
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function eraseKeyframes(sequence, startTime, endTime) {
  for (let i = 0; i < sequence.length; i++) {
    const keyframe = sequence[i];
    if (keyframe.at > startTime && keyframe.at < endTime) {
      removeItem(sequence, keyframe);
      i--;
    }
  }
}
function addKeyframes(sequence, keyframes2, easing, offset, startTime, endTime) {
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes2.length; i++) {
    sequence.push({
      value: keyframes2[i],
      at: mixNumber(startTime, endTime, offset[i]),
      easing: getEasingForSegment(easing, i)
    });
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function normalizeTimes(times, repeat) {
  for (let i = 0; i < times.length; i++) {
    times[i] = times[i] / (repeat + 1);
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function compareByTime(a, b) {
  if (a.at === b.at) {
    if (a.value === null)
      return 1;
    if (b.value === null)
      return -1;
    return 0;
  } else {
    return a.at - b.at;
  }
}

// node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var defaultSegmentEasing = "easeInOut";
var MAX_REPEAT = 20;
function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
  const defaultDuration = defaultTransition.duration || 0.3;
  const animationDefinitions = /* @__PURE__ */ new Map();
  const sequences = /* @__PURE__ */ new Map();
  const elementCache = {};
  const timeLabels = /* @__PURE__ */ new Map();
  let prevTime = 0;
  let currentTime = 0;
  let totalDuration = 0;
  for (let i = 0; i < sequence.length; i++) {
    const segment = sequence[i];
    if (typeof segment === "string") {
      timeLabels.set(segment, currentTime);
      continue;
    } else if (!Array.isArray(segment)) {
      timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
      continue;
    }
    let [subject, keyframes2, transition = {}] = segment;
    if (transition.at !== void 0) {
      currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
    }
    let maxDuration = 0;
    const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
      const valueKeyframesAsList = keyframesAsList(valueKeyframes);
      const { delay = 0, times = defaultOffset(valueKeyframesAsList), type = defaultTransition.type || "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
      let { ease: ease2 = defaultTransition.ease || "easeOut", duration } = valueTransition;
      const calculatedDelay = typeof delay === "function" ? delay(elementIndex, numSubjects) : delay;
      const numKeyframes = valueKeyframesAsList.length;
      const createGenerator = isGenerator(type) ? type : generators?.[type || "keyframes"];
      if (numKeyframes <= 2 && createGenerator) {
        let absoluteDelta = 100;
        if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
          const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
          absoluteDelta = Math.abs(delta);
        }
        const springTransition = {
          ...defaultTransition,
          ...remainingTransition
        };
        if (duration !== void 0) {
          springTransition.duration = secondsToMilliseconds(duration);
        }
        const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
        ease2 = springEasing.ease;
        duration = springEasing.duration;
      }
      duration ?? (duration = defaultDuration);
      const startTime = currentTime + calculatedDelay;
      if (times.length === 1 && times[0] === 0) {
        times[1] = 1;
      }
      const remainder = times.length - valueKeyframesAsList.length;
      remainder > 0 && fillOffset(times, remainder);
      valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
      if (repeat) {
        invariant(repeat < MAX_REPEAT, "Repeat count too high, must be less than 20", "repeat-count-high");
        duration = calculateRepeatDuration(duration, repeat);
        const originalKeyframes = [...valueKeyframesAsList];
        const originalTimes = [...times];
        ease2 = Array.isArray(ease2) ? [...ease2] : [ease2];
        const originalEase = [...ease2];
        for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
          valueKeyframesAsList.push(...originalKeyframes);
          for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
            times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
            ease2.push(keyframeIndex === 0 ? "linear" : getEasingForSegment(originalEase, keyframeIndex - 1));
          }
        }
        normalizeTimes(times, repeat);
      }
      const targetTime = startTime + duration;
      addKeyframes(valueSequence, valueKeyframesAsList, ease2, times, startTime, targetTime);
      maxDuration = Math.max(calculatedDelay + duration, maxDuration);
      totalDuration = Math.max(targetTime, totalDuration);
    };
    if (isMotionValue(subject)) {
      const subjectSequence = getSubjectSequence(subject, sequences);
      resolveValueSequence(keyframes2, transition, getValueSequence("default", subjectSequence));
    } else {
      const subjects = resolveSubjects(subject, keyframes2, scope, elementCache);
      const numSubjects = subjects.length;
      for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
        keyframes2 = keyframes2;
        transition = transition;
        const thisSubject = subjects[subjectIndex];
        const subjectSequence = getSubjectSequence(thisSubject, sequences);
        for (const key in keyframes2) {
          resolveValueSequence(keyframes2[key], getValueTransition2(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
        }
      }
    }
    prevTime = currentTime;
    currentTime += maxDuration;
  }
  sequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key];
      valueSequence.sort(compareByTime);
      const keyframes2 = [];
      const valueOffset = [];
      const valueEasing = [];
      for (let i = 0; i < valueSequence.length; i++) {
        const { at, value, easing } = valueSequence[i];
        keyframes2.push(value);
        valueOffset.push(progress(0, totalDuration, at));
        valueEasing.push(easing || "easeOut");
      }
      if (valueOffset[0] !== 0) {
        valueOffset.unshift(0);
        keyframes2.unshift(keyframes2[0]);
        valueEasing.unshift(defaultSegmentEasing);
      }
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1);
        keyframes2.push(null);
      }
      if (!animationDefinitions.has(element)) {
        animationDefinitions.set(element, {
          keyframes: {},
          transition: {}
        });
      }
      const definition = animationDefinitions.get(element);
      definition.keyframes[key] = keyframes2;
      const { type: _type, ...remainingDefaultTransition } = defaultTransition;
      definition.transition[key] = {
        ...remainingDefaultTransition,
        duration: totalDuration,
        ease: valueEasing,
        times: valueOffset,
        ...sequenceTransition
      };
    }
  });
  return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
  !sequences.has(subject) && sequences.set(subject, {});
  return sequences.get(subject);
}
function getValueSequence(name, sequences) {
  if (!sequences[name])
    sequences[name] = [];
  return sequences[name];
}
function keyframesAsList(keyframes2) {
  return Array.isArray(keyframes2) ? keyframes2 : [keyframes2];
}
function getValueTransition2(transition, key) {
  return transition && transition[key] ? {
    ...transition,
    ...transition[key]
  } : { ...transition };
}
var isNumber = (keyframe) => typeof keyframe === "number";
var isNumberKeyframesArray = (keyframes2) => keyframes2.every(isNumber);

// node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
function createDOMVisualElement(element) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  };
  const node = isSVGElement(element) && !isSVGSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
  node.mount(element);
  visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  };
  const node = new ObjectVisualElement(options);
  node.mount(subject);
  visualElementStore.set(subject, node);
}

// node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function isSingleValue(subject, keyframes2) {
  return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes2);
}
function animateSubject(subject, keyframes2, options, scope) {
  const animations = [];
  if (isSingleValue(subject, keyframes2)) {
    animations.push(animateSingleValue(subject, isDOMKeyframes(keyframes2) ? keyframes2.default || keyframes2 : keyframes2, options ? options.default || options : options));
  } else {
    if (subject == null) {
      return animations;
    }
    const subjects = resolveSubjects(subject, keyframes2, scope);
    const numSubjects = subjects.length;
    invariant(Boolean(numSubjects), "No valid elements provided.", "no-valid-elements");
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i];
      const createVisualElement = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
      if (!visualElementStore.has(thisSubject)) {
        createVisualElement(thisSubject);
      }
      const visualElement = visualElementStore.get(thisSubject);
      const transition = { ...options };
      if ("delay" in transition && typeof transition.delay === "function") {
        transition.delay = transition.delay(i, numSubjects);
      }
      animations.push(...animateTarget(visualElement, { ...keyframes2, transition }, {}));
    }
  }
  return animations;
}

// node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function animateSequence(sequence, options, scope) {
  const animations = [];
  const processedSequence = sequence.map((segment) => {
    if (Array.isArray(segment) && typeof segment[0] === "function") {
      const callback = segment[0];
      const mv = motionValue(0);
      mv.on("change", callback);
      if (segment.length === 1) {
        return [mv, [0, 1]];
      } else if (segment.length === 2) {
        return [mv, [0, 1], segment[1]];
      } else {
        return [mv, segment[1], segment[2]];
      }
    }
    return segment;
  });
  const animationDefinitions = createAnimationsFromSequence(processedSequence, options, scope, { spring });
  animationDefinitions.forEach(({ keyframes: keyframes2, transition }, subject) => {
    animations.push(...animateSubject(subject, keyframes2, transition));
  });
  return animations;
}

// node_modules/framer-motion/dist/es/animation/animate/index.mjs
function isSequence(value) {
  return Array.isArray(value) && value.some(Array.isArray);
}
function createScopedAnimate(options = {}) {
  const { scope, reduceMotion } = options;
  function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options2) {
    let animations = [];
    let animationOnComplete;
    if (isSequence(subjectOrSequence)) {
      const { onComplete, ...sequenceOptions } = optionsOrKeyframes || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSequence(subjectOrSequence, reduceMotion !== void 0 ? { reduceMotion, ...sequenceOptions } : sequenceOptions, scope);
    } else {
      const { onComplete, ...rest } = options2 || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSubject(subjectOrSequence, optionsOrKeyframes, reduceMotion !== void 0 ? { reduceMotion, ...rest } : rest, scope);
    }
    const animation = new GroupAnimationWithThen(animations);
    if (animationOnComplete) {
      animation.finished.then(animationOnComplete);
    }
    if (scope) {
      scope.animations.push(animation);
      animation.finished.then(() => {
        removeItem(scope.animations, animation);
      });
    }
    return animation;
  }
  return scopedAnimate;
}
var animate = createScopedAnimate();

// src/app/back-to-top.ts
var BackToTop = class {
  isVisible = (0, import_core3.signal)(false);
  onWindowScroll() {
    this.isVisible.set(window.pageYOffset > 400);
  }
  scrollToTop() {
    const startY = window.pageYOffset;
    animate(startY, 0, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      // Custom cubic-bezier for a premium feel
      onUpdate: (latest) => {
        window.scrollTo(0, latest);
      }
    });
  }
};
__decorateClass([
  (0, import_core3.HostListener)("window:scroll", [])
], BackToTop.prototype, "onWindowScroll", 1);
BackToTop = __decorateClass([
  (0, import_core3.Component)({
    selector: "app-back-to-top",
    imports: [import_icon3.MatIconModule, import_common2.NgClass],
    template: `
    <button
      (click)="scrollToTop()"
      [ngClass]="{
        'opacity-100 translate-y-0 pointer-events-auto': isVisible(),
        'opacity-0 translate-y-10 pointer-events-none': !isVisible()
      }"
      class="fixed bottom-8 right-8 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-blue-200 flex items-center justify-center transition-all duration-500 hover:bg-primary-dark hover:-translate-y-2 active:scale-95 group overflow-hidden"
      aria-label="Back to top"
    >
      <div class="relative z-10 flex flex-col items-center transition-transform duration-500 group-active:-translate-y-full">
        <mat-icon class="group-hover:animate-bounce">arrow_upward</mat-icon>
        <mat-icon class="absolute top-full">rocket</mat-icon>
      </div>
      <div class="absolute inset-0 bg-white/20 scale-0 group-active:scale-150 transition-transform duration-700 rounded-full"></div>
    </button>
  `,
    styles: [`
    :host { display: block; }
  `]
  })
], BackToTop);

// src/app/app.ts
var import_operators = require("rxjs/operators");
var App = class {
  router = (0, import_core4.inject)(import_router3.Router);
  isAdminRoute = (0, import_core4.signal)(false);
  constructor() {
    this.router.events.pipe(
      (0, import_operators.filter)((event) => event instanceof import_router3.NavigationEnd)
    ).subscribe((event) => {
      const url = event.urlAfterRedirects;
      this.isAdminRoute.set(url.includes("/adminlogin") || url.includes("/admindashboard"));
    });
  }
};
App = __decorateClass([
  (0, import_core4.Component)({
    changeDetection: import_core4.ChangeDetectionStrategy.OnPush,
    selector: "app-root",
    imports: [import_router3.RouterOutlet, Navbar, Footer, BackToTop],
    templateUrl: "./app.html",
    styleUrl: "./app.css"
  })
], App);

// src/app/app.config.server.ts
var import_core17 = require("@angular/core");
var import_ssr2 = require("@angular/ssr");

// src/app/app.config.ts
var import_core16 = require("@angular/core");
var import_router12 = require("@angular/router");

// src/app/home.ts
var import_core5 = require("@angular/core");
var import_icon4 = require("@angular/material/icon");
var import_router4 = require("@angular/router");
var Home = class {
  brandLogos = [
    { name: "SOLARMAX", icon: "wb_sunny" },
    { name: "VOLTCORE", icon: "bolt" },
    { name: "LITHTECH", icon: "battery_charging_full" },
    { name: "GRIDSYNC", icon: "settings_input_component" },
    { name: "ECOFLOW", icon: "eco" },
    { name: "POWERLINK", icon: "cable" },
    { name: "SUNGUARD", icon: "security" }
  ];
  testimonials = [
    {
      name: "Roberto Santos",
      role: "Homeowner, Calamba",
      quote: "Switching to solar with Blucid was the best decision for our family. Our electric bill dropped by 80% and the installation was incredibly professional.",
      image: "https://picsum.photos/seed/person1/100/100"
    },
    {
      name: "Maria Clara",
      role: "Business Owner, Real",
      quote: "The team at Blucid handled everything from the wiring to the volt switch panels. Their technical expertise is unmatched in Laguna.",
      image: "https://picsum.photos/seed/person2/100/100"
    },
    {
      name: "Antonio Luna",
      role: "Facility Manager",
      quote: "We needed a robust battery backup system for our warehouse. Blucid delivered a high-capacity solution that has never failed us.",
      image: "https://picsum.photos/seed/person3/100/100"
    }
  ];
  isMuted = (0, import_core5.signal)(false);
  toggleMute() {
    this.isMuted.update((v) => !v);
  }
};
Home = __decorateClass([
  (0, import_core5.Component)({
    selector: "app-home",
    imports: [import_icon4.MatIconModule, import_router4.RouterLink],
    template: `
    <!-- Hero Section -->
    <section class="relative bg-slate-50 overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-7">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Sustainable Energy Solutions
            </div>
            <h1 class="text-5xl lg:text-7xl font-display font-black text-secondary leading-[1.1] mb-8">
              Power Your Future with <span class="text-primary italic">Clean Solar</span> Energy
            </h1>
            <p class="text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl">
              Blucid Enterprise Inc. provides professional solar system installations, high-quality panels, and complete electrical setups for residential and commercial properties in Laguna.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a routerLink="/contact" class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-bold shadow-xl shadow-blue-200 hover:bg-primary-dark hover:-translate-y-1 transition-all duration-300">
                Get a Free Quote
                <mat-icon class="ml-2">arrow_forward</mat-icon>
              </a>
              <a routerLink="/services" class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-secondary font-bold border border-slate-200 hover:bg-slate-50 transition-all">
                Our Services
              </a>
            </div>
            
            <div class="mt-12 flex items-center gap-8">
              <div class="flex -space-x-4">
                <img src="https://picsum.photos/seed/user1/100/100" alt="Customer 1" class="w-12 h-12 rounded-full border-4 border-white" referrerpolicy="no-referrer">
                <img src="https://picsum.photos/seed/user2/100/100" alt="Customer 2" class="w-12 h-12 rounded-full border-4 border-white" referrerpolicy="no-referrer">
                <img src="https://picsum.photos/seed/user3/100/100" alt="Customer 3" class="w-12 h-12 rounded-full border-4 border-white" referrerpolicy="no-referrer">
              </div>
              <div>
                <div class="flex text-amber-400">
                  <mat-icon class="text-sm">star</mat-icon>
                  <mat-icon class="text-sm">star</mat-icon>
                  <mat-icon class="text-sm">star</mat-icon>
                  <mat-icon class="text-sm">star</mat-icon>
                  <mat-icon class="text-sm">star</mat-icon>
                </div>
                <p class="text-sm font-bold text-secondary">Trusted by 500+ Businesses</p>
              </div>
            </div>
          </div>
          <div class="hidden lg:block lg:col-span-5 relative">
            <div class="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <div class="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVgh9oWfrFuDp4RP4of2ukqm1hC_xupXkvpA&s" alt="Solar Installation" class="w-full h-auto" referrerpolicy="no-referrer">
              <div class="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-6 rounded-2xl border border-white/20">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                    <mat-icon>bolt</mat-icon>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Energy Saved</p>
                    <p class="text-2xl font-display font-black text-secondary">85% Monthly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Banner -->
    <section class="py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div class="relative flex overflow-x-hidden">
        <div class="animate-marquee flex whitespace-nowrap items-center gap-16 py-4">
          @for (logo of brandLogos; track logo.name) {
            <div class="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
              <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2">
                <mat-icon class="text-3xl text-slate-400">{{logo.icon}}</mat-icon>
              </div>
              <span class="text-xl font-display font-black text-slate-300 tracking-tighter">{{logo.name}}</span>
            </div>
          }
        </div>
        <!-- Duplicate for seamless loop -->
        <div class="absolute top-0 animate-marquee2 flex whitespace-nowrap items-center gap-16 py-4">
          @for (logo of brandLogos; track logo.name + '-dup') {
            <div class="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
              <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2">
                <mat-icon class="text-3xl text-slate-400">{{logo.icon}}</mat-icon>
              </div>
              <span class="text-xl font-display font-black text-slate-300 tracking-tighter">{{logo.name}}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl lg:text-5xl font-display font-black text-secondary mb-6">Why Choose Blucid?</h2>
          <p class="text-slate-600">We don't just install panels; we build long-term energy independence for our clients with premium hardware and expert engineering.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group">
            <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <mat-icon>engineering</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-secondary mb-4">Expert Installation</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Our certified engineers ensure every panel and wire is perfectly placed for maximum efficiency and safety.</p>
          </div>
          
          <div class="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group">
            <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <mat-icon>verified</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-secondary mb-4">Premium Quality</h3>
            <p class="text-slate-600 text-sm leading-relaxed">We only use top-tier solar panels, battery supplies, and volt switch panels from trusted global manufacturers.</p>
          </div>
          
          <div class="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group">
            <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <mat-icon>support_agent</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-secondary mb-4">Lifetime Support</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Our relationship doesn't end at installation. We provide ongoing maintenance and technical support for your system.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotional Video Section -->
    <section class="py-24 bg-secondary relative overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <video 
          autoplay 
          muted 
          loop 
          playsinline 
          class="w-full h-full object-cover"
        >
          <source src="/video/blucid.mp4" type="video/mp4">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-solar-panels-on-a-roof-of-a-house-27751-large.mp4" type="video/mp4">
        </video>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div class="mb-12 lg:mb-0">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              Promotional Feature
            </div>
            <h2 class="text-3xl lg:text-5xl font-display font-black text-white mb-6 leading-tight">
              Experience the Power of the <span class="text-primary italic">Sun</span>
            </h2>
            <p class="text-slate-300 text-lg leading-relaxed mb-8">
              Watch how Blucid Enterprise transforms homes and businesses with sustainable energy. Our integrated solar solutions provide reliable, cost-effective power while reducing your carbon footprint. Join the green revolution today and secure your energy future.
            </p>
            <div class="flex items-center gap-6">
              <div class="flex flex-col">
                <span class="text-3xl font-black text-white">500+</span>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Installations</span>
              </div>
              <div class="w-px h-12 bg-slate-700"></div>
              <div class="flex flex-col">
                <span class="text-3xl font-black text-white">15MW</span>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Clean Energy</span>
              </div>
            </div>
          </div>
          <div class="relative group">
            <div class="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
            <div class="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <!-- Autoplay Video -->
              <video 
                autoplay 
                [muted]="isMuted()" 
                loop 
                playsinline 
                class="absolute inset-0 w-full h-full object-cover"
              >
                <source src="https://youbite-medical.web.app/blucid.mp4" type="video/mp4">
              </video>

              <!-- Mute/Unmute Toggle -->
              <button 
                (click)="toggleMute()"
                class="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-all duration-300 group/mute"
              >
                <mat-icon>{{ isMuted() ? 'volume_off' : 'volume_up' }}</mat-icon>
                <span class="absolute right-full mr-3 px-2 py-1 rounded bg-black/60 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover/mute:opacity-100 transition-opacity whitespace-nowrap">
                  {{ isMuted() ? 'Unmute' : 'Mute' }}
                </span>
              </button>

              <!-- Subtle Overlay for better text readability -->
              <div class="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent pointer-events-none"></div>
              
              <!-- Content Overlay -->
              <div class="absolute inset-0 hidden sm:flex flex-col justify-end p-8 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-lg backdrop-blur-sm">
                    <mat-icon class="animate-pulse">play_arrow</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-white font-bold tracking-wide">Blucid in Action</h3>
                    <p class="text-slate-300 text-xs">Sustainable Energy Solutions</p>
                  </div>
                </div>
              </div>

              <!-- Interactive Hover Glow -->
              <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-slate-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="max-w-2xl">
            <h4 class="text-primary font-bold uppercase tracking-widest text-xs mb-4">Testimonials</h4>
            <h2 class="text-3xl lg:text-5xl font-display font-black text-secondary leading-tight">What our clients say about <span class="text-primary italic">Blucid</span></h2>
          </div>
          <div class="flex gap-4">
            <div class="text-right">
              <p class="text-2xl font-display font-black text-secondary">4.9/5</p>
              <p class="text-xs text-slate-500 uppercase font-bold tracking-widest">Average Rating</p>
            </div>
            <div class="flex text-amber-400">
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (testimonial of testimonials; track testimonial.name) {
            <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500 group">
              <div class="flex text-amber-400 mb-6">
                @for (star of [1,2,3,4,5]; track star) {
                  <mat-icon class="text-sm">star</mat-icon>
                }
              </div>
              <p class="text-slate-600 italic mb-8 flex-grow leading-relaxed">"{{testimonial.quote}}"</p>
              <div class="flex items-center gap-4">
                <img [src]="testimonial.image" [alt]="testimonial.name" class="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerpolicy="no-referrer">
                <div>
                  <h4 class="font-bold text-secondary text-sm">{{testimonial.name}}</h4>
                  <p class="text-xs text-slate-400">{{testimonial.role}}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-secondary rounded-[3rem] overflow-hidden relative">
          <div class="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 translate-x-1/4"></div>
          <div class="px-8 py-16 lg:p-20 relative z-10 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div class="lg:max-w-2xl">
              <h2 class="text-3xl lg:text-5xl font-display font-black text-white mb-6">Ready to switch to solar?</h2>
              <p class="text-slate-400 text-lg">Join hundreds of satisfied customers in Laguna who are saving thousands on their electricity bills.</p>
            </div>
            <div class="mt-10 lg:mt-0">
              <a routerLink="/contact" class="inline-flex items-center justify-center px-10 py-5 rounded-full bg-primary text-white font-bold shadow-2xl shadow-blue-900/20 hover:bg-primary-dark hover:scale-105 transition-all">
                Start Your Journey
                <mat-icon class="ml-2">lightbulb</mat-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
  })
], Home);

// src/app/services.ts
var import_core6 = require("@angular/core");
var import_icon5 = require("@angular/material/icon");
var import_router5 = require("@angular/router");
var Services = class {
  services = [
    {
      id: "solar-installation",
      title: "Solar System Installation",
      icon: "solar_power",
      description: "Full-scale solar energy systems for homes and businesses, designed for maximum ROI.",
      features: ["Site Assessment", "Custom System Design", "Professional Mounting", "Grid Connection"]
    },
    {
      id: "wiring-setup",
      title: "Wiring & Electrical Setup",
      icon: "electrical_services",
      description: "Expert wiring services for new constructions and solar integration.",
      features: ["Industrial Wiring", "Residential Setups", "Safety Audits", "Load Balancing"]
    },
    {
      id: "battery-supply",
      title: "Battery Supply & Setup",
      icon: "battery_saver",
      description: "Reliable energy storage solutions to keep your power running 24/7.",
      features: ["Lithium-Ion Banks", "Inverter Integration", "Backup Configuration", "Capacity Planning"]
    },
    {
      id: "volt-switch-panels",
      title: "Volt Switch Panels",
      icon: "dashboard_customize",
      description: "Custom-built switch panels for efficient power distribution and control.",
      features: ["Custom Fabrication", "Smart Monitoring", "Circuit Protection", "Easy Maintenance"]
    },
    {
      id: "solar-panel-supply",
      title: "Solar Panel Supply",
      icon: "grid_view",
      description: "High-efficiency monocrystalline and polycrystalline panels from top brands.",
      features: ["Tier 1 Manufacturers", "Warranty Support", "Bulk Supplies", "Performance Testing"]
    },
    {
      id: "maintenance-repair",
      title: "Maintenance & Repair",
      icon: "build",
      description: "Keep your system running at peak performance with our regular checkups.",
      features: ["Panel Cleaning", "Wiring Inspection", "Performance Tuning", "Emergency Repairs"]
    }
  ];
};
Services = __decorateClass([
  (0, import_core6.Component)({
    selector: "app-services",
    imports: [import_icon5.MatIconModule, import_router5.RouterLink],
    template: `
    <section class="pt-20 pb-12 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-6xl font-display font-black text-secondary mb-6">Our Services</h1>
        <p class="text-slate-600 max-w-2xl mx-auto">Comprehensive solar and electrical solutions tailored for your specific needs.</p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of services; track service.title) {
            <div class="group relative p-8 rounded-3xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 flex flex-col overflow-hidden">
              <!-- Subtle Color Overlay -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div class="relative z-10 w-16 h-16 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                <mat-icon class="text-3xl">{{service.icon}}</mat-icon>
              </div>
              <h3 class="relative z-10 text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors duration-300">{{service.title}}</h3>
              <p class="relative z-10 text-slate-600 leading-relaxed mb-6 flex-grow">{{service.description}}</p>
              <ul class="relative z-10 space-y-3 mb-8">
                @for (item of service.features; track item) {
                  <li class="flex items-center gap-3 text-sm text-slate-500">
                    <mat-icon class="text-primary text-sm group-hover:scale-110 transition-transform">check_circle</mat-icon>
                    {{item}}
                  </li>
                }
              </ul>
              <a [routerLink]="['/services', service.id]" class="relative z-10 inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                Learn More
                <mat-icon class="ml-1 text-sm">arrow_forward</mat-icon>
              </a>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="py-24 bg-secondary text-white overflow-hidden relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <h2 class="text-3xl lg:text-5xl font-display font-black mb-8">Custom Wiring & Installation</h2>
            <p class="text-slate-400 text-lg mb-10 leading-relaxed">
              Beyond solar panels, we specialize in complete wiring installation setups. Whether it's a new building or a retrofit, our team ensures your electrical infrastructure is robust, safe, and ready for high-efficiency energy.
            </p>
            <div class="space-y-6">
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <mat-icon>settings_input_component</mat-icon>
                </div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Volt Switch Panels</h4>
                  <p class="text-slate-400 text-sm">Advanced control panels for precise energy management and distribution.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <mat-icon>battery_charging_full</mat-icon>
                </div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Battery Storage Solutions</h4>
                  <p class="text-slate-400 text-sm">High-capacity battery banks to store your solar energy for night use or backup.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-16 lg:mt-0 relative">
            <div class="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
            <img src="https://cdn.shopify.com/s/files/1/0011/4102/files/photovoltaics-systems-failures_1_large.jpg?v=1532130633" alt="Electrical Wiring Setup" class="relative rounded-3xl shadow-2xl" referrerpolicy="no-referrer">
          </div>
        </div>
      </div>
    </section>
  `
  })
], Services);

// src/app/service-detail.ts
var import_core7 = require("@angular/core");
var import_router6 = require("@angular/router");
var import_icon6 = require("@angular/material/icon");
var import_common3 = require("@angular/common");
var import_platform_browser = require("@angular/platform-browser");
var ServiceDetail = class {
  route = (0, import_core7.inject)(import_router6.ActivatedRoute);
  title = (0, import_core7.inject)(import_platform_browser.Title);
  meta = (0, import_core7.inject)(import_platform_browser.Meta);
  serviceData = {
    "solar-installation": {
      title: "Solar System Installation",
      icon: "solar_power",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQctbPWABdXPJKsNvikAgQgGF8mU-tF2UDw&s",
      longDescription: "Our comprehensive solar installation service is designed to provide you with a seamless transition to clean energy. We handle everything from initial site assessment to final grid connection, ensuring your system is optimized for the specific conditions of your property in Laguna.",
      benefits: [
        { title: "Cost Savings", icon: "payments", desc: "Reduce your monthly electricity bills by up to 85%." },
        { title: "Eco-Friendly", icon: "eco", desc: "Significantly lower your carbon footprint." },
        { title: "Property Value", icon: "trending_up", desc: "Increase the market value of your home or business." },
        { title: "Energy Security", icon: "security", desc: "Protect yourself from rising utility costs." }
      ],
      process: [
        { title: "Consultation & Site Audit", desc: "We visit your property to analyze roof orientation, shading, and energy needs." },
        { title: "Custom Engineering", desc: "Our engineers design a system tailored to your specific energy profile and budget." },
        { title: "Professional Installation", desc: "Our certified team installs the panels, inverters, and mounting hardware with precision." },
        { title: "Testing & Commissioning", desc: "We rigorously test the system before connecting it to the grid and handing it over." }
      ],
      faqs: [
        { q: "How long does a typical installation take?", a: "Most residential installations are completed within 2-3 days, while larger commercial projects can take 1-2 weeks." },
        { q: "Will I still have power during an outage?", a: "Standard grid-tied systems shut down during outages for safety. To have power during an outage, you'll need a battery backup system." }
      ]
    },
    "wiring-setup": {
      title: "Wiring & Electrical Setup",
      icon: "electrical_services",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7_lL0dV4xZPt7GKHfcPdbajtWNEDqsK-VJw&s",
      longDescription: "Proper electrical infrastructure is the backbone of any solar system. We provide expert wiring services for new constructions and retrofits, ensuring your building is safe, compliant, and ready for high-efficiency energy distribution.",
      benefits: [
        { title: "Safety First", icon: "verified_user", desc: "All wiring is installed to meet or exceed national electrical codes." },
        { title: "High Efficiency", icon: "bolt", desc: "Minimizing energy loss through optimized cable routing." },
        { title: "Future Proof", icon: "update", desc: "Scalable infrastructure that can grow with your energy needs." },
        { title: "Expert Engineering", icon: "engineering", desc: "Calculated load balancing for stable power distribution." }
      ],
      process: [
        { title: "Load Analysis", desc: "We calculate your peak and average energy demands to size the infrastructure correctly." },
        { title: "Infrastructure Design", desc: "Detailed mapping of conduits, panels, and distribution points." },
        { title: "Precision Installation", desc: "Clean, organized, and labeled wiring for easy maintenance." },
        { title: "Safety Certification", desc: "Comprehensive testing of all circuits and grounding systems." }
      ],
      faqs: [
        { q: "Do you handle the permits for wiring?", a: "Yes, we handle all necessary electrical permits and coordinate with local authorities in Laguna for inspections." },
        { q: "Can you upgrade my existing electrical panel?", a: "Absolutely. We often perform panel upgrades to accommodate the additional loads and safety requirements of solar integration." }
      ]
    },
    "battery-supply": {
      title: "Battery Supply & Setup",
      icon: "battery_saver",
      image: "https://roadtrek.com.au/wp-content/uploads/2022/11/web-IMG_8873-1024x819.jpg",
      longDescription: "Energy storage allows you to maximize the benefits of your solar system by using clean energy even when the sun isn't shining. We supply and install high-capacity Lithium Iron Phosphate (LiFePO4) battery banks that provide reliable backup and peak-shaving capabilities.",
      benefits: [
        { title: "24/7 Power", icon: "schedule", desc: "Use your solar energy at night or during grid outages." },
        { title: "Peak Shaving", icon: "vertical_align_bottom", desc: "Avoid high utility rates by using stored energy during peak hours." },
        { title: "Long Life", icon: "history", desc: "Premium batteries with 6000+ cycle life (10+ years)." },
        { title: "Smart Monitoring", icon: "smartphone", desc: "Track your battery health and charge levels in real-time." }
      ],
      process: [
        { title: "Capacity Planning", desc: "Determining how much storage you need based on your critical loads." },
        { title: "Inverter Integration", desc: "Setting up the hybrid inverter to manage battery charging and discharging." },
        { title: "Physical Setup", desc: "Safe installation of battery racks in a temperature-controlled environment." },
        { title: "BMS Configuration", desc: "Fine-tuning the Battery Management System for optimal performance." }
      ],
      faqs: [
        { q: "How long will the battery power my home?", a: "This depends on your battery capacity and usage. A typical 10kWh battery can power essential loads (lights, fridge, fans) for 12-18 hours." },
        { q: "Are these batteries safe for indoor use?", a: "Yes, we use LiFePO4 technology which is non-combustible and safe for indoor installation when properly ventilated." }
      ]
    },
    "volt-switch-panels": {
      title: "Volt Switch Panels",
      icon: "dashboard_customize",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0O0aRFNgq27fQkvCQ0dXJscdkFyMsiVxZ2A&s",
      longDescription: "Our custom-built Volt Switch Panels are the brain of your electrical system. They manage the complex distribution of power between solar, batteries, and the grid, ensuring your critical appliances always have power while protecting your equipment from surges.",
      benefits: [
        { title: "Smart Distribution", icon: "account_tree", desc: "Intelligent routing of power to where it's needed most." },
        { title: "Surge Protection", icon: "flash_on", desc: "Built-in protection for your sensitive electronics." },
        { title: "Easy Control", icon: "tune", desc: "Simple, intuitive interface for manual or automatic switching." },
        { title: "Custom Built", icon: "build", desc: "Fabricated specifically for your building's electrical layout." }
      ],
      process: [
        { title: "Circuit Mapping", desc: "Identifying critical vs. non-critical loads for prioritization." },
        { title: "Panel Fabrication", desc: "Custom assembly of breakers, contactors, and smart meters." },
        { title: "Installation", desc: "Integration into your existing main distribution board." },
        { title: "Automation Setup", desc: "Programming the logic for automatic transfer and load shedding." }
      ],
      faqs: [
        { q: "Can I monitor my energy usage remotely?", a: "Yes, our smart panels can be integrated with mobile apps to monitor real-time consumption and solar production." },
        { q: "What happens if the panel fails?", a: "Our panels include manual bypass switches, ensuring you can always switch back to grid power if needed." }
      ]
    },
    "solar-panel-supply": {
      title: "Solar Panel Supply",
      icon: "grid_view",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOVLhJXtT7M2Y0dcH58JiWrPYx_aHA_AGTqw&s",
      longDescription: "We provide Tier 1 solar panels from the world's most trusted manufacturers. Whether you need high-efficiency monocrystalline panels for limited roof space or cost-effective polycrystalline panels for large-scale projects, we have the inventory to support your needs.",
      benefits: [
        { title: "Tier 1 Quality", icon: "workspace_premium", desc: "Only the highest-rated panels with proven performance." },
        { title: "High Efficiency", icon: "speed", desc: "Latest PERC and half-cut cell technologies." },
        { title: "Long Warranty", icon: "verified", desc: "25-year performance warranties on all panels." },
        { title: "Bulk Availability", icon: "inventory_2", desc: "Large stock ready for immediate delivery in Laguna." }
      ],
      process: [
        { title: "Requirement Analysis", desc: "Helping you choose the right panel type for your specific project." },
        { title: "Quality Inspection", desc: "Every batch is inspected for micro-cracks and defects." },
        { title: "Safe Delivery", desc: "Professional handling and transport to your site." },
        { title: "Documentation", desc: "Providing all technical datasheets and warranty certificates." }
      ],
      faqs: [
        { q: "What is the difference between Mono and Poly panels?", a: "Monocrystalline panels are more efficient and better for limited space, while Polycrystalline panels are typically more affordable for large ground-mount projects." },
        { q: "Do you offer delivery in Laguna?", a: "Yes, we provide free delivery for bulk orders within Calamba and neighboring cities in Laguna." }
      ]
    },
    "maintenance-repair": {
      title: "Maintenance & Repair",
      icon: "build",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTueFISMTp2wurRvIlQPlkPnk7hGkv35yd7WQ&s",
      longDescription: "To ensure your solar investment continues to provide maximum returns, regular maintenance is essential. We offer comprehensive service packages that include cleaning, electrical inspections, and performance tuning to keep your system running at peak efficiency.",
      benefits: [
        { title: "Peak Performance", icon: "auto_graph", desc: "Regular cleaning can increase energy yield by up to 20%." },
        { title: "Early Detection", icon: "troubleshoot", desc: "Finding and fixing small issues before they become costly repairs." },
        { title: "Extended Life", icon: "hourglass_empty", desc: "Proper care ensures your system lasts for 30+ years." },
        { title: "Peace of Mind", icon: "spa", desc: "Knowing your system is safe and operating correctly." }
      ],
      process: [
        { title: "Performance Audit", desc: "Analyzing your system's output data to identify any drops in efficiency." },
        { title: "Physical Inspection", desc: "Checking mounting hardware, cabling, and panel surfaces." },
        { title: "Cleaning & Tuning", desc: "Professional panel cleaning and inverter firmware updates." },
        { title: "Detailed Report", desc: "Providing a full status report and recommendations for your system." }
      ],
      faqs: [
        { q: "How often should I have my panels cleaned?", a: "In the Philippines, we recommend cleaning every 6 months due to dust and volcanic ash accumulation." },
        { q: "Can you repair systems installed by other companies?", a: "Yes, our engineers are trained to troubleshoot and repair most major solar equipment brands, regardless of the original installer." }
      ]
    }
  };
  openFaqIndex = (0, import_core7.signal)(0);
  ngOnInit() {
    this.route.params.subscribe(() => {
      const service = this.service;
      if (service) {
        const pageTitle = `${service.title} | Blucid Enterprise`;
        this.title.setTitle(pageTitle);
        this.meta.updateTag({ name: "description", content: service.longDescription });
        this.meta.updateTag({ property: "og:title", content: pageTitle });
        this.meta.updateTag({ property: "og:description", content: service.longDescription });
        this.meta.updateTag({ property: "og:image", content: service.image });
      }
    });
  }
  toggleFaq(index) {
    this.openFaqIndex.update((current) => current === index ? null : index);
  }
  get service() {
    const id = this.route.snapshot.paramMap.get("id");
    return id ? this.serviceData[id] : null;
  }
};
ServiceDetail = __decorateClass([
  (0, import_core7.Component)({
    selector: "app-service-detail",
    imports: [import_icon6.MatIconModule, import_router6.RouterLink, import_common3.NgClass],
    template: `
    @if (service) {
      <section class="pt-20 pb-12 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a routerLink="/services" class="inline-flex items-center text-sm font-bold text-primary hover:underline mb-8">
            <mat-icon class="mr-2">arrow_back</mat-icon>
            Back to Services
          </a>
          <div class="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div class="w-16 h-16 rounded-2xl bg-blue-100 text-primary flex items-center justify-center mb-6">
                <mat-icon class="text-3xl">{{service.icon}}</mat-icon>
              </div>
              <h1 class="text-4xl lg:text-6xl font-display font-black text-secondary mb-6">{{service.title}}</h1>
              <p class="text-lg text-slate-600 leading-relaxed mb-8">{{service.longDescription}}</p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                @for (benefit of service.benefits; track benefit.title) {
                  <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <mat-icon class="text-primary mb-3">{{benefit.icon}}</mat-icon>
                    <h4 class="font-bold text-secondary mb-2">{{benefit.title}}</h4>
                    <p class="text-slate-500 text-sm">{{benefit.desc}}</p>
                  </div>
                }
              </div>
            </div>
            <div class="relative">
              <div class="absolute -inset-4 bg-primary/10 blur-3xl rounded-full"></div>
              <img [src]="service.image" [alt]="service.title" class="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/5]" referrerpolicy="no-referrer">
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 class="text-3xl font-display font-black text-secondary mb-12">Our Step-by-Step Process</h2>
              <div class="space-y-0">
                @for (step of service.process; track step.title; let i = $index; let last = $last) {
                  <div class="flex gap-8 group">
                    <div class="flex flex-col items-center">
                      <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-black text-xl z-10 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
                        {{i + 1}}
                      </div>
                      @if (!last) {
                        <div class="w-0.5 h-full bg-slate-100 my-2 group-hover:bg-primary/30 transition-colors duration-500"></div>
                      }
                    </div>
                    <div class="pb-12">
                      <h3 class="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">{{step.title}}</h3>
                      <p class="text-slate-600 leading-relaxed">{{step.desc}}</p>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="mt-20 lg:mt-0">
              <h2 class="text-3xl font-display font-black text-secondary mb-8">Service FAQs</h2>
              <div class="space-y-4">
                @for (faq of service.faqs; track faq.q; let i = $index) {
                  <div class="border border-slate-100 rounded-2xl overflow-hidden transition-all" [ngClass]="{'shadow-lg shadow-slate-100 border-primary/20': openFaqIndex() === i}">
                    <button 
                      (click)="toggleFaq(i)"
                      class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                      <span class="font-bold text-secondary text-sm">{{faq.q}}</span>
                      <mat-icon class="text-primary transition-transform duration-300" [style.transform]="openFaqIndex() === i ? 'rotate(180deg)' : 'rotate(0)'">
                        expand_more
                      </mat-icon>
                    </button>
                    
                    <div 
                      class="px-6 overflow-hidden transition-all duration-300"
                      [style.max-height]="openFaqIndex() === i ? '300px' : '0'"
                      [style.padding-bottom]="openFaqIndex() === i ? '1rem' : '0'"
                    >
                      <p class="text-slate-600 text-sm leading-relaxed">
                        {{faq.a}}
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-secondary text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl lg:text-5xl font-display font-black mb-8">Ready to get started?</h2>
          <p class="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">Contact our experts today for a detailed consultation and customized quote for {{service.title}}.</p>
          <a [routerLink]="['/contact']" [queryParams]="{interest: service.title}" class="inline-flex items-center justify-center px-10 py-5 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all">
            Request a Quote
            <mat-icon class="ml-2">arrow_forward</mat-icon>
          </a>
        </div>
      </section>
    } @else {
      <div class="py-40 text-center">
        <h1 class="text-2xl font-bold text-secondary">Service not found</h1>
        <a routerLink="/services" class="text-primary font-bold hover:underline mt-4 inline-block">Return to Services</a>
      </div>
    }
  `
  })
], ServiceDetail);

// src/app/about.ts
var import_core8 = require("@angular/core");
var import_icon7 = require("@angular/material/icon");
var About = class {
  values = [
    { title: "Integrity", icon: "gavel", desc: "We operate with honesty and transparency in every project." },
    { title: "Innovation", icon: "psychology", desc: "Always adopting the latest solar technologies." },
    { title: "Reliability", icon: "handshake", desc: "Consistent performance and support you can count on." },
    { title: "Sustainability", icon: "eco", desc: "Committed to a greener planet for future generations." }
  ];
};
About = __decorateClass([
  (0, import_core8.Component)({
    selector: "app-about",
    imports: [import_icon7.MatIconModule],
    template: `
    <section class="pt-20 pb-32 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          <div class="relative">
            <div class="absolute -top-10 -left-10 w-64 h-64 bg-blue-50 rounded-full -z-10"></div>
            <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFEo-Ggl3RPxZgZNK_R-rShBFJ_jXkQruAokVbSoJ4wPaYRyNGVCz6E_-QcgBVfWSm7MXh-s69PMZRX3om11PHSx8cbOCvO1znX3gMgKIt_YCrppY2wDfEMDrQWQx5DLMvRoUI=s680-w680-h510-rw" alt="Blucid Enterprise Solar Installation" class="rounded-[3rem] shadow-2xl" referrerpolicy="no-referrer">
            <div class="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
              <p class="text-4xl font-display font-black text-primary mb-2">10+</p>
              <p class="text-secondary font-bold text-sm uppercase tracking-widest">Years of Excellence in Solar Energy</p>
            </div>
          </div>
          
          <div class="mt-20 lg:mt-0">
            <h4 class="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4">About Blucid Enterprise Inc.</h4>
            <h1 class="text-4xl lg:text-6xl font-display font-black text-secondary mb-8 leading-tight">
              Pioneering Sustainable <span class="text-primary italic">Energy</span> in Laguna
            </h1>
            <p class="text-slate-600 text-lg leading-relaxed mb-8">
              Founded with a vision to make clean energy accessible to everyone, Blucid Enterprise Inc. has grown into a leading provider of solar solutions in Calamba and the surrounding regions.
            </p>
            <p class="text-slate-600 leading-relaxed mb-12">
              We specialize in the complete lifecycle of solar energy\u2014from high-quality hardware supply to expert engineering and installation. Our team is dedicated to helping businesses and homeowners reduce their carbon footprint while significantly lowering their energy costs.
            </p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div class="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                  <mat-icon>visibility</mat-icon>
                </div>
                <h3 class="text-xl font-bold text-secondary mb-3">Our Vision</h3>
                <p class="text-slate-500 text-sm leading-relaxed">To be the most trusted partner in renewable energy, driving the transition to a sustainable future for every Filipino household and business.</p>
              </div>
              
              <div class="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                  <mat-icon>rocket_launch</mat-icon>
                </div>
                <h3 class="text-xl font-bold text-secondary mb-3">Our Mission</h3>
                <p class="text-slate-500 text-sm leading-relaxed">To provide innovative, high-quality, and cost-effective solar solutions through expert engineering and exceptional customer service.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-display font-black text-secondary mb-6">Our Core Values</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          @for (value of values; track value.title) {
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div class="text-primary mb-6 flex justify-center">
                <mat-icon class="text-4xl h-10 w-10">{{value.icon}}</mat-icon>
              </div>
              <h3 class="text-lg font-bold text-secondary mb-2">{{value.title}}</h3>
              <p class="text-slate-500 text-sm">{{value.desc}}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
  })
], About);

// src/app/faq.ts
var import_core9 = require("@angular/core");
var import_icon8 = require("@angular/material/icon");
var import_common4 = require("@angular/common");
var FAQ = class {
  openIndex = 0;
  faqs = [
    {
      q: "How much can I save with a solar system?",
      a: "Savings vary based on your energy consumption and system size, but most of our clients see a 50% to 85% reduction in their monthly electricity bills. In many cases, the system pays for itself within 3 to 5 years."
    },
    {
      q: "Do solar panels work on cloudy days?",
      a: "Yes, solar panels still generate electricity on cloudy days, though at a lower efficiency than on bright sunny days. Our systems are designed to maximize energy capture even in less-than-ideal weather conditions."
    },
    {
      q: "What maintenance is required for solar panels?",
      a: "Solar panels require very little maintenance. We recommend a professional cleaning twice a year and a routine inspection of the wiring and mounting every 1-2 years to ensure everything is operating at peak efficiency."
    },
    {
      q: "How long do solar panels last?",
      a: "Most high-quality solar panels come with a 25-year performance warranty and can continue to generate electricity for 30 years or more."
    },
    {
      q: "What is a Volt Switch Panel?",
      a: "A Volt Switch Panel is a specialized electrical control panel we design and install to manage the distribution of power between your solar system, the grid, and your building's electrical loads safely and efficiently."
    },
    {
      q: "Do you provide battery backup systems?",
      a: "Yes, we provide high-capacity battery storage solutions that allow you to store excess solar energy generated during the day for use at night or during power outages."
    }
  ];
  toggle(index) {
    this.openIndex = this.openIndex === index ? null : index;
  }
};
FAQ = __decorateClass([
  (0, import_core9.Component)({
    selector: "app-faq",
    imports: [import_icon8.MatIconModule, import_common4.NgClass],
    template: `
    <section class="pt-20 pb-12 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-6xl font-display font-black text-secondary mb-6">Frequently Asked Questions</h1>
        <p class="text-slate-600 max-w-2xl mx-auto">Everything you need to know about switching to solar energy with Blucid.</p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-4">
          @for (item of faqs; track item.q; let i = $index) {
            <div class="border border-slate-100 rounded-2xl overflow-hidden transition-all" [ngClass]="{'shadow-lg shadow-slate-100 border-primary/20': openIndex === i}">
              <button 
                (click)="toggle(i)"
                class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span class="font-bold text-secondary">{{item.q}}</span>
                <mat-icon class="text-primary transition-transform duration-300" [style.transform]="openIndex === i ? 'rotate(180deg)' : 'rotate(0)'">
                  expand_more
                </mat-icon>
              </button>
              
              <div 
                class="px-6 overflow-hidden transition-all duration-300"
                [style.max-height]="openIndex === i ? '500px' : '0'"
                [style.padding-bottom]="openIndex === i ? '1.25rem' : '0'"
              >
                <p class="text-slate-600 text-sm leading-relaxed">
                  {{item.a}}
                </p>
              </div>
            </div>
          }
        </div>
        
        <div class="mt-16 p-8 rounded-3xl bg-blue-50 border border-blue-100 text-center">
          <h3 class="text-xl font-bold text-secondary mb-2">Still have questions?</h3>
          <p class="text-slate-600 mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <a href="tel:0495205780" class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all">
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  `
  })
], FAQ);

// src/app/products.ts
var import_core10 = require("@angular/core");
var import_icon9 = require("@angular/material/icon");
var import_forms = require("@angular/forms");
var import_router7 = require("@angular/router");
var Products = class {
  activeCategory = (0, import_core10.signal)("All");
  categories = ["All", "Solar Panels", "Batteries", "Switch Panels", "Accessories"];
  sortBy = (0, import_core10.signal)("default");
  onlyInStock = (0, import_core10.signal)(false);
  brandLogos = [
    { name: "SOLARMAX", icon: "wb_sunny" },
    { name: "VOLTCORE", icon: "bolt" },
    { name: "LITHTECH", icon: "battery_charging_full" },
    { name: "GRIDSYNC", icon: "settings_input_component" },
    { name: "ECOFLOW", icon: "eco" },
    { name: "POWERLINK", icon: "cable" },
    { name: "SUNGUARD", icon: "security" }
  ];
  products = [
    {
      id: "mono-crystalline-550w",
      name: "Blucid Mono-Crystalline 550W",
      category: "Solar Panels",
      desc: "High-efficiency monocrystalline panel with PERC technology for maximum energy yield.",
      price: 12500,
      inStock: true,
      image: "https://www.seaforestpv.com/uploadfile/202104/15/c198d017f8916bec19d695977febcca9_medium.jpg"
    },
    {
      id: "lithium-battery-10kwh",
      name: "Lithium Iron Phosphate 10kWh",
      category: "Batteries",
      desc: "Deep cycle LFP battery bank with built-in BMS and 6000+ cycle life.",
      price: 145e3,
      inStock: true,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhO8GSDAFs44Gvq8NM_PFZM9bF86yBWf3xQ&s"
    },
    {
      id: "smart-volt-switch-v2",
      name: "Smart Volt Switch Panel V2",
      category: "Switch Panels",
      desc: "Custom-engineered switch panel with IoT monitoring and automatic transfer switch.",
      price: 28e3,
      inStock: false,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-pUJXe4qBbGMK5NTZ_Gd3qVH8jgfQTRvckg&s"
    },
    {
      name: "Hybrid Solar Inverter 5kW",
      category: "Accessories",
      desc: "Pure sine wave hybrid inverter with dual MPPT trackers and mobile app monitoring.",
      price: 45e3,
      inStock: true,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyH5UkAXeML7Om7yPwDB0jMP6WnyfaGuwH8w&s"
    },
    {
      name: "Blucid Poly-Crystalline 400W",
      category: "Solar Panels",
      desc: "Durable and cost-effective polycrystalline panel for residential installations.",
      price: 8500,
      inStock: true,
      image: "https://image.made-in-china.com/202f0j00MUuoJWGsagpf/PV-Panels-400W-Watt-Polycrystalline-Solar-Panels-with-72-Cells-for-Solar-Power-System-with-Solar-Inverter.webp"
    },
    {
      name: "Solar Mounting Rail System",
      category: "Accessories",
      desc: "Anodized aluminum mounting rails with high wind resistance and easy installation.",
      price: 3200,
      inStock: true,
      image: "https://www.solarpartscomponents.com/wp-content/uploads/2018/08/solar-mounting-rail-SPC-R001.jpg"
    }
  ];
  filteredProducts = (0, import_core10.computed)(() => {
    let result = [...this.products];
    if (this.activeCategory() !== "All") {
      result = result.filter((p) => p.category === this.activeCategory());
    }
    if (this.onlyInStock()) {
      result = result.filter((p) => p.inStock);
    }
    if (this.sortBy() === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy() === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  });
};
Products = __decorateClass([
  (0, import_core10.Component)({
    selector: "app-products",
    imports: [import_icon9.MatIconModule, import_forms.FormsModule, import_router7.RouterLink],
    template: `
    <section class="pt-20 pb-12 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-6xl font-display font-black text-secondary mb-6">Our Products</h1>
        <p class="text-slate-600 max-w-2xl mx-auto">High-performance solar hardware and electrical components for every installation.</p>
      </div>
    </section>

    <section class="py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 class="text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Trusted by Industry Leaders</h2>
      </div>
      <div class="relative flex overflow-x-hidden">
        <div class="animate-marquee flex whitespace-nowrap items-center gap-16 py-4">
          @for (logo of brandLogos; track logo.name) {
            <div class="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
              <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2">
                <mat-icon class="text-3xl text-slate-400">{{logo.icon}}</mat-icon>
              </div>
              <span class="text-xl font-display font-black text-slate-300 tracking-tighter">{{logo.name}}</span>
            </div>
          }
        </div>
        <!-- Duplicate for seamless loop -->
        <div class="absolute top-0 animate-marquee2 flex whitespace-nowrap items-center gap-16 py-4">
          @for (logo of brandLogos; track logo.name + '-dup') {
            <div class="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
              <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2">
                <mat-icon class="text-3xl text-slate-400">{{logo.icon}}</mat-icon>
              </div>
              <span class="text-xl font-display font-black text-slate-300 tracking-tighter">{{logo.name}}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filters & Sorting -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
          <div class="flex flex-wrap items-center gap-4">
            <span class="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2">Categories:</span>
            @for (cat of categories; track cat) {
              <button 
                (click)="activeCategory.set(cat)"
                [class]="activeCategory() === cat ? 'bg-primary text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'"
                class="px-6 py-2 rounded-full text-xs font-bold transition-all"
              >
                {{cat}}
              </button>
            }
          </div>

          <div class="flex flex-wrap items-center gap-6">
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Sort:</span>
              <select 
                [(ngModel)]="sortBy" 
                class="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <label class="flex items-center gap-3 cursor-pointer group">
              <div class="relative">
                <input type="checkbox" [(ngModel)]="onlyInStock" class="sr-only peer">
                <div class="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:bg-primary transition-colors"></div>
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
              </div>
              <span class="text-xs font-bold uppercase tracking-widest text-slate-600 group-hover:text-primary transition-colors">In Stock Only</span>
            </label>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          @for (product of filteredProducts(); track product.name) {
            <div class="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500">
              <div class="aspect-square overflow-hidden bg-slate-50 relative">
                <a [routerLink]="['/products', product.id]">
                  <img [src]="product.image" [alt]="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                </a>
                <div class="absolute top-4 left-4 flex gap-2">
                  <div class="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/10">
                    {{product.category}}
                  </div>
                  @if (!product.inStock) {
                    <div class="px-3 py-1 bg-rose-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Out of Stock
                    </div>
                  }
                </div>
              </div>
              <div class="p-8">
                <a [routerLink]="['/products', product.id]">
                  <h3 class="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{{product.name}}</h3>
                </a>
                <p class="text-slate-500 text-sm mb-6 leading-relaxed">{{product.desc}}</p>
                <div class="flex items-center justify-between">
                  <span class="text-primary font-black text-lg">\u20B1{{product.price.toLocaleString()}}</span>
                  <button 
                    [disabled]="!product.inStock"
                    [class.opacity-50]="!product.inStock"
                    class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-colors disabled:cursor-not-allowed"
                  >
                    <mat-icon class="text-sm">shopping_cart</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          } @empty {
            <div class="col-span-full py-20 text-center">
              <mat-icon class="text-6xl text-slate-200 mb-4">search_off</mat-icon>
              <h3 class="text-xl font-bold text-secondary">No products found</h3>
              <p class="text-slate-500">Try adjusting your filters or category selection.</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
  })
], Products);

// src/app/product-detail.ts
var import_core11 = require("@angular/core");
var import_router8 = require("@angular/router");
var import_icon10 = require("@angular/material/icon");
var import_platform_browser2 = require("@angular/platform-browser");
var ProductDetail = class {
  route = (0, import_core11.inject)(import_router8.ActivatedRoute);
  title = (0, import_core11.inject)(import_platform_browser2.Title);
  meta = (0, import_core11.inject)(import_platform_browser2.Meta);
  activeImageIndex = (0, import_core11.signal)(0);
  zoomOrigin = (0, import_core11.signal)("center");
  ngOnInit() {
    this.route.params.subscribe(() => {
      const product = this.product;
      if (product) {
        const pageTitle = `${product.name} | Blucid Enterprise Shop`;
        this.title.setTitle(pageTitle);
        this.meta.updateTag({ name: "description", content: product.desc });
        this.meta.updateTag({ property: "og:title", content: pageTitle });
        this.meta.updateTag({ property: "og:description", content: product.desc });
        this.meta.updateTag({ property: "og:image", content: product.images[0] });
      }
    });
  }
  productData = {
    "mono-crystalline-550w": {
      id: "mono-crystalline-550w",
      name: "Blucid Mono-Crystalline 550W",
      category: "Solar Panels",
      desc: "Our flagship solar panel featuring high-efficiency monocrystalline cells with PERC technology. Designed for maximum energy yield even in low-light conditions, making it perfect for the Philippine climate.",
      price: 12500,
      inStock: true,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu1dKGqsW14GL7Qy5Qg58SXAj2iKkTBn9s0g&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfd3i5tDxQI0VK1hPyaO5-g-wVNUKIGMMXcA&s",
        "https://lh3.googleusercontent.com/proxy/XU6vciaY1KRVNanrDT2ng31UnNkiSMIxAuTCRLuU9RwYZ-bZFZR-hg8MDAJ3_Lyfh5nRHVMsGqgvD79MslsUCO9oqC8j5C1IDKDyWeL8ZitU5HzeYxDdb09iaXtfwmfN3dmX"
      ],
      specs: [
        { label: "Max Power", value: "550W" },
        { label: "Efficiency", value: "21.3%" },
        { label: "Cell Type", value: "Monocrystalline" },
        { label: "Dimensions", value: "2279 x 1134 x 35mm" },
        { label: "Weight", value: "28.5 kg" },
        { label: "Warranty", value: "25 Years" }
      ]
    },
    "lithium-battery-10kwh": {
      id: "lithium-battery-10kwh",
      name: "Lithium Iron Phosphate 10kWh",
      category: "Batteries",
      desc: "A high-capacity energy storage solution using safe and durable LiFePO4 technology. This 10kWh bank is ideal for residential backup or off-grid setups, providing reliable power throughout the night.",
      price: 145e3,
      inStock: true,
      images: [
        "https://picsum.photos/seed/battery1/800/800",
        "https://picsum.photos/seed/battery-detail1/800/800",
        "https://picsum.photos/seed/battery-detail2/800/800"
      ],
      specs: [
        { label: "Capacity", value: "10kWh" },
        { label: "Voltage", value: "48V" },
        { label: "Cycle Life", value: "6000+ Cycles" },
        { label: "Max Discharge", value: "100A" },
        { label: "Chemistry", value: "LiFePO4" },
        { label: "Weight", value: "95 kg" }
      ]
    },
    "smart-volt-switch-v2": {
      id: "smart-volt-switch-v2",
      name: "Smart Volt Switch Panel V2",
      category: "Switch Panels",
      desc: "The ultimate control center for your solar-integrated home. This panel automatically manages power distribution between solar, batteries, and the grid, with real-time IoT monitoring via our mobile app.",
      price: 28e3,
      inStock: false,
      images: [
        "https://picsum.photos/seed/switch1/800/800",
        "https://picsum.photos/seed/switch-detail1/800/800"
      ],
      specs: [
        { label: "Max Current", value: "63A" },
        { label: "Connectivity", value: "Wi-Fi / Bluetooth" },
        { label: "Protection", value: "IP65 Rated" },
        { label: "Switch Time", value: "< 10ms" },
        { label: "Monitoring", value: "App-based" },
        { label: "Warranty", value: "2 Years" }
      ]
    }
  };
  get product() {
    const id = this.route.snapshot.paramMap.get("id");
    return id ? this.productData[id] : null;
  }
  handleZoom(event) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 100;
    const y = (event.clientY - rect.top) / rect.height * 100;
    this.zoomOrigin.set(`${x}% ${y}%`);
  }
  resetZoom() {
    this.zoomOrigin.set("center");
  }
  share(platform) {
    if (!this.product) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ${this.product.name} from Blucid Enterprise!`);
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  }
};
ProductDetail = __decorateClass([
  (0, import_core11.Component)({
    selector: "app-product-detail",
    imports: [import_icon10.MatIconModule, import_router8.RouterLink],
    template: `
    @if (product) {
      <section class="pt-20 pb-12 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a routerLink="/products" class="inline-flex items-center text-sm font-bold text-primary hover:underline mb-8">
            <mat-icon class="mr-2">arrow_back</mat-icon>
            Back to Products
          </a>

          <div class="lg:grid lg:grid-cols-2 lg:gap-16">
            <!-- Image Carousel & Zoom -->
            <div class="space-y-6">
              <div class="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 shadow-sm group cursor-zoom-in">
                <img 
                  [src]="product.images[activeImageIndex()]" 
                  [alt]="product.name" 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-150"
                  [style.transform-origin]="zoomOrigin()"
                  (mousemove)="handleZoom($event)"
                  (mouseleave)="resetZoom()"
                  referrerpolicy="no-referrer"
                >
                <div class="absolute top-4 left-4">
                  @if (!product.inStock) {
                    <div class="px-4 py-1.5 bg-rose-500 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                      Out of Stock
                    </div>
                  }
                </div>
              </div>

              <!-- Thumbnails -->
              <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                @for (img of product.images; track img; let i = $index) {
                  <button 
                    (click)="activeImageIndex.set(i)"
                    [class]="activeImageIndex() === i ? 'border-primary ring-2 ring-primary/20' : 'border-slate-100 hover:border-primary/50'"
                    class="flex-shrink-0 w-24 h-24 rounded-2xl border-2 overflow-hidden bg-white transition-all"
                  >
                    <img [src]="img" [alt]="product.name" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                  </button>
                }
              </div>
            </div>

            <!-- Product Info -->
            <div class="mt-12 lg:mt-0">
              <div class="mb-8">
                <div class="text-xs font-bold uppercase tracking-widest text-primary mb-4">{{product.category}}</div>
                <h1 class="text-4xl lg:text-5xl font-display font-black text-secondary mb-4">{{product.name}}</h1>
                <div class="text-3xl font-black text-primary">\u20B1{{product.price.toLocaleString()}}</div>
              </div>

              <p class="text-slate-600 text-lg leading-relaxed mb-10">{{product.desc}}</p>

              <div class="space-y-6 mb-10">
                <h3 class="text-sm font-bold uppercase tracking-widest text-secondary border-b border-slate-100 pb-4">Technical Specifications</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                  @for (spec of product.specs; track spec.label) {
                    <div class="flex justify-between items-center py-2 border-b border-slate-50">
                      <span class="text-slate-400 text-sm">{{spec.label}}</span>
                      <span class="text-secondary font-bold text-sm">{{spec.value}}</span>
                    </div>
                  }
                </div>
              </div>

              <div class="mb-10">
                <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Share this product:</h3>
                <div class="flex gap-3">
                  <button (click)="share('facebook')" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all" title="Share on Facebook">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button (click)="share('twitter')" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all" title="Share on X">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </button>
                  <button (click)="share('linkedin')" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all" title="Share on LinkedIn">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </button>
                  <button (click)="share('whatsapp')" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all" title="Share on WhatsApp">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </button>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <a 
                  [routerLink]="['/contact']" 
                  [queryParams]="{interest: product.name}"
                  class="flex-grow inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-primary transition-all shadow-xl shadow-blue-200"
                >
                  <mat-icon class="mr-2">request_quote</mat-icon>
                  Get a Quote
                </a>
                <button class="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-slate-200 text-secondary font-bold hover:bg-slate-50 transition-all">
                  <mat-icon class="mr-2">favorite_border</mat-icon>
                  Wishlist
                </button>
              </div>

              <div class="mt-10 flex items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-primary text-sm">verified</mat-icon>
                  Genuine Product
                </div>
                <div class="flex items-center gap-2">
                  <mat-icon class="text-primary text-sm">local_shipping</mat-icon>
                  Laguna Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    } @else {
      <div class="py-40 text-center">
        <h1 class="text-2xl font-bold text-secondary">Product not found</h1>
        <a routerLink="/products" class="text-primary font-bold hover:underline mt-4 inline-block">Return to Shop</a>
      </div>
    }
  `,
    styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `]
  })
], ProductDetail);

// src/app/contact.ts
var import_core12 = require("@angular/core");
var import_icon11 = require("@angular/material/icon");
var import_forms2 = require("@angular/forms");
var import_router9 = require("@angular/router");
var Contact = class {
  route = (0, import_core12.inject)(import_router9.ActivatedRoute);
  submitted = false;
  contactForm = new import_forms2.FormGroup({
    name: new import_forms2.FormControl("", [import_forms2.Validators.required]),
    email: new import_forms2.FormControl("", [import_forms2.Validators.required, import_forms2.Validators.email]),
    phone: new import_forms2.FormControl("", [import_forms2.Validators.required]),
    location: new import_forms2.FormControl("", [import_forms2.Validators.required]),
    interest: new import_forms2.FormControl("Solar System Installation", [import_forms2.Validators.required]),
    message: new import_forms2.FormControl("", [import_forms2.Validators.required])
  });
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["interest"]) {
        this.contactForm.patchValue({ interest: params["interest"] });
      }
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      console.log("Quote Request Submitted", this.contactForm.value);
      this.submitted = true;
      this.contactForm.reset({ interest: "Solar System Installation" });
    }
  }
};
Contact = __decorateClass([
  (0, import_core12.Component)({
    selector: "app-contact",
    imports: [import_icon11.MatIconModule, import_forms2.ReactiveFormsModule],
    template: `
    <section class="pt-20 pb-12 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-6xl font-display font-black text-secondary mb-6">Request a Quote</h1>
        <p class="text-slate-600 max-w-2xl mx-auto">Tell us about your project and our experts will provide a detailed customized proposal.</p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 class="text-3xl font-display font-black text-secondary mb-8">Project Details</h2>
            
            @if (submitted) {
              <div class="p-8 rounded-3xl bg-blue-50 border border-blue-100 text-center animate-in fade-in zoom-in duration-500">
                <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <mat-icon class="text-3xl">check</mat-icon>
                </div>
                <h3 class="text-2xl font-bold text-secondary mb-2">Quote Request Sent!</h3>
                <p class="text-slate-600 mb-8">Thank you for your interest. Our technical team will review your requirements and get back to you with a proposal within 24-48 hours.</p>
                <button (click)="submitted = false" class="text-primary font-bold hover:underline">Submit another request</button>
              </div>
            } @else {
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-bold text-secondary mb-2">Full Name</label>
                    <input id="name" type="text" formControlName="name" class="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="John Doe">
                    @if (contactForm.get('name')?.touched && contactForm.get('name')?.invalid) {
                      <p class="text-rose-500 text-xs mt-1 font-bold">Please enter your full name</p>
                    }
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-bold text-secondary mb-2">Email Address</label>
                    <input id="email" type="email" formControlName="email" class="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="john@example.com">
                    @if (contactForm.get('email')?.touched && contactForm.get('email')?.invalid) {
                      <p class="text-rose-500 text-xs mt-1 font-bold">Please enter a valid email address</p>
                    }
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label for="phone" class="block text-sm font-bold text-secondary mb-2">Phone Number</label>
                    <input id="phone" type="tel" formControlName="phone" class="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="09XX XXX XXXX">
                    @if (contactForm.get('phone')?.touched && contactForm.get('phone')?.invalid) {
                      <p class="text-rose-500 text-xs mt-1 font-bold">Please enter your phone number</p>
                    }
                  </div>
                  <div>
                    <label for="location" class="block text-sm font-bold text-secondary mb-2">Project Location</label>
                    <input id="location" type="text" formControlName="location" class="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Calamba, Laguna">
                    @if (contactForm.get('location')?.touched && contactForm.get('location')?.invalid) {
                      <p class="text-rose-500 text-xs mt-1 font-bold">Please enter the project location</p>
                    }
                  </div>
                </div>

                <div>
                  <label for="interest" class="block text-sm font-bold text-secondary mb-2">I am interested in:</label>
                  <select id="interest" formControlName="interest" class="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                    <optgroup label="Services">
                      <option value="Solar System Installation">Solar System Installation</option>
                      <option value="Wiring & Electrical Setup">Wiring & Electrical Setup</option>
                      <option value="Battery Supply & Setup">Battery Supply & Setup</option>
                      <option value="Volt Switch Panels">Volt Switch Panels</option>
                      <option value="Maintenance & Repair">Maintenance & Repair</option>
                    </optgroup>
                    <optgroup label="Products">
                      <option value="Blucid Mono-Crystalline 550W">Mono-Crystalline Panels</option>
                      <option value="Blucid Poly-Crystalline 400W">Poly-Crystalline Panels</option>
                      <option value="Lithium Iron Phosphate 10kWh">Lithium Batteries</option>
                      <option value="Hybrid Solar Inverter 5kW">Inverters</option>
                      <option value="Solar Mounting Rail System">Mounting Systems</option>
                    </optgroup>
                    <option value="Other">Other / General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label for="message" class="block text-sm font-bold text-secondary mb-2">Project Requirements / Message</label>
                  <textarea id="message" formControlName="message" rows="5" class="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Tell us more about your energy needs, roof type, or specific product requirements..."></textarea>
                  @if (contactForm.get('message')?.touched && contactForm.get('message')?.invalid) {
                    <p class="text-rose-500 text-xs mt-1 font-bold">Please describe your requirements</p>
                  }
                </div>

                <button type="submit" [disabled]="contactForm.invalid" class="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-xl shadow-blue-200 hover:bg-primary-dark disabled:opacity-50 disabled:shadow-none transition-all">
                  Submit Quote Request
                </button>
              </form>
            }
          </div>

          <div>
            <h2 class="text-3xl font-display font-black text-secondary mb-8">Our Office</h2>
            <div class="space-y-8 mb-12">
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                  <mat-icon>location_on</mat-icon>
                </div>
                <div>
                  <h4 class="font-bold text-secondary mb-1">Address</h4>
                  <p class="text-slate-500 text-sm leading-relaxed">B1 L12, Cuervo II Rd, Real, Calamba, 4027 Laguna</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                  <mat-icon>phone</mat-icon>
                </div>
                <div>
                  <h4 class="font-bold text-secondary mb-1">Phone</h4>
                  <p class="text-slate-500 text-sm leading-relaxed">(049) 520 5780</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                  <mat-icon>schedule</mat-icon>
                </div>
                <div>
                  <h4 class="font-bold text-secondary mb-1">Working Hours</h4>
                  <p class="text-slate-500 text-sm leading-relaxed">MON to FRI at 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <div class="rounded-3xl overflow-hidden shadow-lg border border-slate-100 h-80 bg-slate-100 relative">
              <!-- Google Map Placeholder -->
              <div class="absolute inset-0 flex items-center justify-center text-slate-400 flex-col gap-4">
                <mat-icon class="text-5xl">map</mat-icon>
                <p class="font-bold uppercase tracking-widest text-xs">Calamba, Laguna</p>
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.756204558455!2d121.1444!3d14.2111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63f8e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sReal%2C%20Calamba%2C%20Laguna!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy"
                class="relative z-10 opacity-80"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
  })
], Contact);

// src/app/admin-login.ts
var import_core13 = require("@angular/core");
var import_common5 = require("@angular/common");
var import_forms3 = require("@angular/forms");
var import_router10 = require("@angular/router");
var import_icon12 = require("@angular/material/icon");
var AdminLogin = class {
  loginForm = new import_forms3.FormGroup({
    username: new import_forms3.FormControl("", [import_forms3.Validators.required]),
    password: new import_forms3.FormControl("", [import_forms3.Validators.required])
  });
  showPassword = (0, import_core13.signal)(false);
  isLoading = (0, import_core13.signal)(false);
  errorMessage = (0, import_core13.signal)(null);
  router = (0, import_core13.inject)(import_router10.Router);
  platformId = (0, import_core13.inject)(import_core13.PLATFORM_ID);
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      setTimeout(() => {
        const { username, password } = this.loginForm.value;
        if (username === "admin" && password === "adminpass") {
          if ((0, import_common5.isPlatformBrowser)(this.platformId)) {
            localStorage.setItem("admin_logged_in", "true");
          }
          this.router.navigate(["/admindashboard"]);
        } else {
          this.errorMessage.set("Invalid credentials. Please try again.");
          this.isLoading.set(false);
        }
      }, 800);
    }
  }
};
AdminLogin = __decorateClass([
  (0, import_core13.Component)({
    selector: "app-admin-login",
    changeDetection: import_core13.ChangeDetectionStrategy.OnPush,
    imports: [import_forms3.ReactiveFormsModule, import_icon12.MatIconModule, import_router10.RouterLink],
    template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div class="max-w-md w-full">
        <!-- Brand -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white shadow-xl mb-4">
            <mat-icon class="text-3xl">admin_panel_settings</mat-icon>
          </div>
          <h1 class="text-3xl font-display font-black text-secondary">Admin Portal</h1>
          <p class="text-slate-500 mt-2">Blucid Enterprise Inc. Management</p>
        </div>

        <!-- Login Card -->
        <div class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 lg:p-10 border border-slate-100">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="username" class="block text-sm font-bold text-secondary mb-2 uppercase tracking-widest">Username</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <mat-icon class="text-xl">person</mat-icon>
                </div>
                <input 
                  id="username"
                  type="text" 
                  formControlName="username"
                  placeholder="admin"
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-hidden text-secondary"
                >
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-bold text-secondary mb-2 uppercase tracking-widest">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <mat-icon class="text-xl">lock</mat-icon>
                </div>
                <input 
                  id="password"
                  [type]="showPassword() ? 'text' : 'password'" 
                  formControlName="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  class="block w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-hidden text-secondary"
                >
                <button 
                  type="button"
                  (click)="showPassword.set(!showPassword())"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors"
                >
                  <mat-icon>{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </div>
            </div>

            @if (errorMessage()) {
              <div class="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm font-medium animate-shake">
                <mat-icon class="text-red-500">error_outline</mat-icon>
                {{ errorMessage() }}
              </div>
            }

            <button 
              type="submit" 
              [disabled]="loginForm.invalid || isLoading()"
              class="w-full py-5 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-blue-200 hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              @if (isLoading()) {
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              } @else {
                Sign In
                <mat-icon>login</mat-icon>
              }
            </button>
          </form>

          <div class="mt-8 pt-8 border-t border-slate-50 text-center">
            <a routerLink="/" class="text-sm font-bold text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-2">
              <mat-icon class="text-lg">arrow_back</mat-icon>
              Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .animate-shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
  `]
  })
], AdminLogin);

// src/app/admin-dashboard.ts
var import_core14 = require("@angular/core");
var import_common6 = require("@angular/common");
var import_router11 = require("@angular/router");
var import_icon13 = require("@angular/material/icon");
var import_core15 = require("@angular/material/core");
var import_menu = require("@angular/material/menu");
var import_button = require("@angular/material/button");
var import_badge = require("@angular/material/badge");
var AdminDashboard = class {
  router = (0, import_core14.inject)(import_router11.Router);
  platformId = (0, import_core14.inject)(import_core14.PLATFORM_ID);
  items;
  chartBars;
  constructor() {
    if ((0, import_common6.isPlatformBrowser)(this.platformId) && localStorage.getItem("admin_logged_in") !== "true") {
      this.router.navigate(["/adminlogin"]);
    }
  }
  logout() {
    if ((0, import_common6.isPlatformBrowser)(this.platformId)) {
      localStorage.removeItem("admin_logged_in");
    }
    this.router.navigate(["/adminlogin"]);
  }
  ngAfterViewInit() {
    if ((0, import_common6.isPlatformBrowser)(this.platformId)) {
      const htmlElements = this.items.map((r) => r.nativeElement);
      animate(
        htmlElements,
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1), duration: 0.8, ease: "backOut" }
      );
      const barElements = this.chartBars.map((r) => r.nativeElement);
      const targetHeights = this.chartData.map((d) => `${d.value}%`);
      barElements.forEach((bar, i) => {
        animate(
          bar,
          { height: ["5%", targetHeights[i]] },
          { delay: 0.4 + i * 0.05, duration: 1.2, ease: "backOut" }
        );
      });
    }
  }
  stats = [
    { label: "Total Projects", value: "524", icon: "solar_power", color: "bg-blue-100 text-blue-600", trend: "12" },
    { label: "Energy Generated", value: "15.2 MW", icon: "bolt", color: "bg-amber-100 text-amber-600", trend: "8" },
    { label: "Active Inquiries", value: "38", icon: "mark_email_unread", color: "bg-purple-100 text-purple-600", trend: "24" },
    { label: "Cust. Satisfaction", value: "98.5%", icon: "verified", color: "bg-emerald-100 text-emerald-600", trend: "3" }
  ];
  chartData = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 60 },
    { label: "Mar", value: 45 },
    { label: "Apr", value: 90 },
    { label: "May", value: 65 },
    { label: "Jun", value: 80 },
    { label: "Jul", value: 50 },
    { label: "Aug", value: 75 },
    { label: "Sep", value: 95 },
    { label: "Oct", value: 60 },
    { label: "Nov", value: 70 },
    { label: "Dec", value: 85 }
  ];
  activities = [
    { id: 1, title: "New project inquiry from Calamba", time: "12 minutes ago", icon: "email" },
    { id: 2, title: "Installation completed: SM City", time: "2 hours ago", icon: "task_alt" },
    { id: 3, title: "Inventory alert: Battery Supply low", time: "5 hours ago", icon: "warning" },
    { id: 4, title: "Maintenance report: Rizal Site", time: "Yesterday", icon: "construction" }
  ];
  projects = [
    { id: 1, client: "SM City Santa Rosa", location: "Santa Rosa, Laguna", size: "500kW System", status: "In Progress", progress: 65 },
    { id: 2, client: "Laguna Technopark", location: "Bi\xF1an, Laguna", size: "1.2MW Commercial", status: "Completed", progress: 100 },
    { id: 3, client: "Residenza Homes", location: "Calamba, Laguna", size: "5kW Residential", status: "In Progress", progress: 30 },
    { id: 4, client: "Green Meadows", location: "Cabuyao, Laguna", size: "10kW On-Grid", status: "Completed", progress: 100 }
  ];
};
__decorateClass([
  (0, import_core14.ViewChildren)("animateItem")
], AdminDashboard.prototype, "items", 2);
__decorateClass([
  (0, import_core14.ViewChildren)("chartBar")
], AdminDashboard.prototype, "chartBars", 2);
AdminDashboard = __decorateClass([
  (0, import_core14.Component)({
    selector: "app-admin-dashboard",
    changeDetection: import_core14.ChangeDetectionStrategy.OnPush,
    imports: [import_icon13.MatIconModule, import_router11.RouterLink, import_core15.MatRippleModule, import_menu.MatMenuModule, import_button.MatButtonModule, import_badge.MatBadgeModule],
    template: `
    <div class="min-h-screen bg-[#F8FAFC] lg:flex font-sans text-slate-900">
      <!-- Sidebar -->
      <aside class="hidden lg:flex flex-col w-72 bg-secondary text-white border-r border-slate-800 relative z-20 shadow-2xl">
        <div class="p-8">
          <div class="flex items-center gap-3 mb-10 cursor-pointer" matRipple>
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <mat-icon>bolt</mat-icon>
            </div>
            <span class="text-xl font-display font-black tracking-tight">Blucid <span class="text-primary italic">Admin</span></span>
          </div>

          <nav class="space-y-2">
            <a routerLink="/admindashboard" matRipple class="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-primary text-white font-bold transition-all shadow-md shadow-primary/20">
              <mat-icon class="text-white/80">dashboard</mat-icon>
              Dashboard
            </a>
            <a matRipple class="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <mat-icon>solar_power</mat-icon>
              Projects
            </a>
            <a matRipple class="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <mat-icon>inventory_2</mat-icon>
              Inventory
            </a>
            <a matRipple class="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <mat-icon>people</mat-icon>
              Customers
            </a>
          </nav>
        </div>

        <div class="mt-auto p-4 border-t border-white/10">
          <div class="bg-white/5 rounded-2xl p-4 flex items-center gap-4 mb-4">
            <div class="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold border-2 border-slate-500">A</div>
            <div class="flex-grow">
              <p class="text-sm font-bold">System Admin</p>
              <p class="text-xs text-slate-400">admin&#64;blucid.com</p>
            </div>
          </div>
          <button matRipple (click)="logout()" class="flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all w-full font-medium">
            <mat-icon>logout</mat-icon>
            Logout Securely
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow flex flex-col relative h-screen overflow-hidden">
        
        <!-- Top Header -->
        <header class="flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-10">
          <div>
            <h1 class="text-2xl font-display font-black text-secondary leading-tight">Dashboard Overview</h1>
            <p class="text-slate-500 text-sm mt-1">Real-time solar grid & business analytics</p>
          </div>
          
          <div class="flex items-center gap-4">
            <button mat-icon-button class="text-slate-500" matBadge="3" matBadgeColor="warn" matBadgeSize="small">
              <mat-icon>notifications_none</mat-icon>
            </button>
            
            <div class="h-8 w-px bg-slate-200 mx-2"></div>
            
            <button mat-button [matMenuTriggerFor]="profileMenu" class="!rounded-full !px-3 !py-2 hover:!bg-slate-50">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">A</div>
                <span class="hidden sm:block text-sm font-bold text-secondary">Settings</span>
                <mat-icon class="text-slate-400">expand_more</mat-icon>
              </div>
            </button>
            <mat-menu #profileMenu="matMenu" class="!rounded-2xl !mt-2">
              <button mat-menu-item>
                <mat-icon>person_outline</mat-icon>
                <span>My Profile</span>
              </button>
              <button mat-menu-item>
                <mat-icon>settings</mat-icon>
                <span>Account Settings</span>
              </button>
              <button mat-menu-item (click)="logout()" class="!text-red-600">
                <mat-icon class="!text-red-600">logout</mat-icon>
                <span>Logout</span>
              </button>
            </mat-menu>
          </div>
        </header>

        <!-- Scrollable Content View -->
        <div class="p-8 overflow-y-auto flex-grow" id="dashboard-scroll-area">
          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            @for (stat of stats; track stat.label) {
              <div #animateItem class="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-xs relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div class="absolute -top-4 -right-4 p-6 opacity-[0.03] group-hover:opacity-10 transition-all transform group-hover:scale-110 duration-500 pointer-events-none">
                  <mat-icon class="!w-32 !h-32 !text-[8rem]">{{stat.icon}}</mat-icon>
                </div>
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-6">
                    <div [class]="'w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ' + stat.color">
                      <mat-icon>{{stat.icon}}</mat-icon>
                    </div>
                    <span class="text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-1 border border-emerald-100">
                      <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">trending_up</mat-icon>
                      {{stat.trend}}%
                    </span>
                  </div>
                  <h3 class="text-4xl font-display font-black text-secondary mb-1 tracking-tight">{{stat.value}}</h3>
                  <p class="text-slate-500 text-[11px] font-bold uppercase tracking-widest">{{stat.label}}</p>
                </div>
              </div>
            }
          </div>

          <!-- Main Layout Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            <!-- Energy Analytics Chart -->
            <div #animateItem class="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-xs flex flex-col">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h3 class="font-display font-black text-secondary text-xl">Energy Generation</h3>
                  <p class="text-xs text-slate-500 mt-1 font-medium">Megawatts across all active installations</p>
                </div>
                <button mat-button class="!bg-slate-50 !text-secondary !rounded-full !font-bold">
                  Last 12 Months <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
                </button>
              </div>
              
              <div class="flex-grow flex items-end justify-between gap-1 sm:gap-2 px-1 sm:px-4 h-64 min-h-[250px] relative mt-4">
                <!-- Grid Lines -->
                <div class="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none opacity-20 hidden sm:flex">
                  <div class="border-b border-dashed border-slate-500 w-full"></div>
                  <div class="border-b border-dashed border-slate-500 w-full"></div>
                  <div class="border-b border-dashed border-slate-500 w-full"></div>
                  <div class="border-b border-slate-500 w-full mb-[1px]"></div>
                </div>
                <!-- Bars -->
                @for (item of chartData; track $index) {
                  <div 
                    #chartBar
                    class="w-full bg-blue-100/50 hover:bg-primary rounded-t-xl transition-colors duration-300 cursor-pointer relative group flex-1 origin-bottom border border-blue-200/30 hover:border-transparent"
                    style="height: 5%" 
                  >
                    <!-- Tooltip -->
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-secondary text-white text-xs font-bold py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform scale-95 group-hover:scale-100 whitespace-nowrap z-20 pointer-events-none shadow-xl">
                      {{item.value}} MW
                      <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-secondary"></div>
                    </div>
                  </div>
                }
              </div>
              <div class="flex justify-between mt-4 px-1 sm:px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                @for (item of chartData; track item.label) {
                  <span class="w-full text-center">{{item.label}}</span>
                }
              </div>
            </div>

            <!-- Activity Feed -->
            <div #animateItem class="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-xs flex flex-col h-full">
              <div class="flex items-center justify-between mb-8">
                <h3 class="font-display font-black text-secondary text-xl">Recent Logs</h3>
                <button mat-icon-button class="text-slate-400"><mat-icon>more_vert</mat-icon></button>
              </div>
              
              <div class="relative flex-grow">
                <!-- Timeline Line -->
                <div class="absolute left-[19px] top-4 bottom-8 w-px bg-slate-100"></div>
                
                <div class="space-y-6 relative z-10">
                  @for (activity of activities; track activity.id) {
                    <div class="flex gap-5">
                      <div class="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-primary shrink-0 shadow-sm relative z-10">
                        <mat-icon class="text-lg">{{activity.icon}}</mat-icon>
                      </div>
                      <div class="pt-2">
                        <p class="text-sm font-bold text-secondary leading-tight">{{activity.title}}</p>
                        <p class="text-xs text-slate-400 mt-1.5 font-medium">{{activity.time}}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
              
              <button mat-stroked-button class="!rounded-full !w-full !mt-6 !border-slate-200 !text-secondary font-bold">View Complete Log</button>
            </div>
          </div>

          <!-- Projects Table -->
          <div #animateItem class="bg-white rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-xs mb-8">
            <div class="p-6 sm:p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 class="font-display font-black text-secondary text-xl">Active Installations</h3>
                <p class="text-xs text-slate-500 mt-1 font-medium">Manage ongoing solar deployments</p>
              </div>
              <button mat-flat-button class="!rounded-full !bg-primary !text-white !font-bold !px-6 !py-5 shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                <mat-icon>add</mat-icon> New Project
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50/50 border-b border-slate-100">
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Client Name</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Location</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">System Size</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Progress</th>
                    <th class="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  @for (project of projects; track project.id) {
                    <tr class="group hover:bg-slate-50 transition-colors cursor-pointer" matRipple>
                      <td class="px-8 py-5">
                        <div class="flex items-center gap-4">
                          <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary text-sm font-black border border-blue-100 shadow-xs">
                            {{project.client.charAt(0)}}
                          </div>
                          <span class="font-bold text-secondary text-sm group-hover:text-primary transition-colors">{{project.client}}</span>
                        </div>
                      </td>
                      <td class="px-8 py-5 text-sm text-slate-500 font-medium whitespace-nowrap">{{project.location}}</td>
                      <td class="px-8 py-5 whitespace-nowrap">
                        <span class="px-3 py-1.5 bg-slate-100 text-secondary text-[11px] font-bold rounded-lg uppercase tracking-widest border border-slate-200">{{project.size}}</span>
                      </td>
                      <td class="px-8 py-5 whitespace-nowrap">
                        <div class="flex items-center gap-2.5">
                          <span class="relative flex h-2.5 w-2.5">
                            @if(project.status === 'In Progress') {
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            }
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5" [class.bg-emerald-500]="project.status === 'Completed'" [class.bg-amber-500]="project.status === 'In Progress'"></span>
                          </span>
                          <span class="text-sm font-bold text-secondary">{{project.status}}</span>
                        </div>
                      </td>
                      <td class="px-8 py-5 w-48 whitespace-nowrap">
                        <div class="flex items-center gap-4">
                          <div class="flex-grow h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div class="h-full rounded-full shadow-md" [class]="project.status === 'Completed' ? 'bg-emerald-500' : 'bg-primary'" [style.width.%]="project.progress"></div>
                          </div>
                          <span class="text-xs font-bold text-secondary min-w-[30px] text-right">{{project.progress}}%</span>
                        </div>
                      </td>
                      <td class="px-4 py-5 text-right">
                        <button mat-icon-button class="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <mat-icon>chevron_right</mat-icon>
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <!-- Mobile Bottom Nav -->
      <nav class="lg:hidden fixed bottom-6 left-6 right-6 bg-secondary/90 backdrop-blur rounded-2xl p-4 flex items-center justify-around text-white/60 border border-white/10 z-50 shadow-2xl">
        <button class="text-primary hover:text-white transition-colors"><mat-icon>dashboard</mat-icon></button>
        <button class="hover:text-white transition-colors"><mat-icon>solar_power</mat-icon></button>
        <button class="hover:text-white transition-colors"><mat-icon>inventory_2</mat-icon></button>
        <button class="hover:text-white transition-colors"><mat-icon>people</mat-icon></button>
        <button (click)="logout()" class="hover:text-red-400 transition-colors"><mat-icon>logout</mat-icon></button>
      </nav>
    </div>
  `,
    styles: [`
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `]
  })
], AdminDashboard);

// src/app/app.routes.ts
var routes = [
  { path: "", component: Home },
  { path: "services", component: Services },
  { path: "services/:id", component: ServiceDetail },
  { path: "about", component: About },
  { path: "faq", component: FAQ },
  { path: "products", component: Products },
  { path: "products/:id", component: ProductDetail },
  { path: "contact", component: Contact },
  { path: "adminlogin", component: AdminLogin },
  { path: "admindashboard", component: AdminDashboard },
  { path: "**", redirectTo: "" }
];

// src/app/app.config.ts
var appConfig = {
  providers: [(0, import_core16.provideBrowserGlobalErrorListeners)(), (0, import_router12.provideRouter)(routes)]
};

// src/app/app.routes.server.ts
var import_ssr = require("@angular/ssr");
var serverRoutes = [
  {
    path: "services/:id",
    renderMode: import_ssr.RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { id: "solar-installation" },
        { id: "wiring-setup" },
        { id: "battery-supply" },
        { id: "volt-switch-panels" },
        { id: "solar-panel-supply" },
        { id: "maintenance-repair" }
      ];
    }
  },
  {
    path: "products/:id",
    renderMode: import_ssr.RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { id: "mono-crystalline-550w" },
        { id: "lithium-battery-10kwh" },
        { id: "smart-volt-switch-v2" }
      ];
    }
  },
  {
    path: "**",
    renderMode: import_ssr.RenderMode.Prerender
  }
];

// src/app/app.config.server.ts
var serverConfig = {
  providers: [(0, import_ssr2.provideServerRendering)((0, import_ssr2.withRoutes)(serverRoutes))]
};
var config = (0, import_core17.mergeApplicationConfig)(appConfig, serverConfig);

// src/main.server.ts
var bootstrap = (context) => (0, import_platform_browser3.bootstrapApplication)(App, config, context);
var main_server_default = bootstrap;
