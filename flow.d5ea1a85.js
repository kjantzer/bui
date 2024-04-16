// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"M7Yz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizeCache = void 0;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class SizeCache {
  constructor(config) {
    this._map = new Map();
    this._roundAverageSize = false;
    this.totalSize = 0;
    if (config?.roundAverageSize === true) {
      this._roundAverageSize = true;
    }
  }
  set(index, value) {
    const prev = this._map.get(index) || 0;
    this._map.set(index, value);
    this.totalSize += value - prev;
  }
  get averageSize() {
    if (this._map.size > 0) {
      const average = this.totalSize / this._map.size;
      return this._roundAverageSize ? Math.round(average) : average;
    }
    return 0;
  }
  getSize(index) {
    return this._map.get(index);
  }
  clear() {
    this._map.clear();
    this.totalSize = 0;
  }
}
exports.SizeCache = SizeCache;
},{}],"TLwk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseLayout = void 0;
exports.dim1 = dim1;
exports.dim2 = dim2;
exports.pos1 = pos1;
exports.pos2 = pos2;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function dim1(direction) {
  return direction === 'horizontal' ? 'width' : 'height';
}
function dim2(direction) {
  return direction === 'horizontal' ? 'height' : 'width';
}
function pos1(direction) {
  return direction === 'horizontal' ? 'left' : 'top';
}
function pos2(direction) {
  return direction === 'horizontal' ? 'top' : 'left';
}
class BaseLayout {
  _getDefaultConfig() {
    return {
      direction: 'vertical'
    };
  }
  constructor(hostSink, config) {
    /**
     * The last set viewport scroll position.
     */
    this._latestCoords = {
      left: 0,
      top: 0
    };
    /**
     * Scrolling direction.
     */
    this._direction = null;
    /**
     * Dimensions of the viewport.
     */
    this._viewportSize = {
      width: 0,
      height: 0
    };
    this.totalScrollSize = {
      width: 0,
      height: 0
    };
    this.offsetWithinScroller = {
      left: 0,
      top: 0
    };
    /**
     * Flag for debouncing asynchronous reflow requests.
     */
    this._pendingReflow = false;
    this._pendingLayoutUpdate = false;
    this._pin = null;
    /**
     * The index of the first item intersecting the viewport.
     */
    this._firstVisible = 0;
    /**
     * The index of the last item intersecting the viewport.
     */
    this._lastVisible = 0;
    /**
     * Pixel offset in the scroll direction of the first child.
     */
    this._physicalMin = 0;
    /**
     * Pixel offset in the scroll direction of the last child.
     */
    this._physicalMax = 0;
    /**
     * Index of the first child.
     */
    this._first = -1;
    /**
     * Index of the last child.
     */
    this._last = -1;
    /**
     * Length in the scrolling direction.
     */
    this._sizeDim = 'height';
    /**
     * Length in the non-scrolling direction.
     */
    this._secondarySizeDim = 'width';
    /**
     * Position in the scrolling direction.
     */
    this._positionDim = 'top';
    /**
     * Position in the non-scrolling direction.
     */
    this._secondaryPositionDim = 'left';
    /**
     * Current scroll offset in pixels.
     */
    this._scrollPosition = 0;
    /**
     * Difference between current scroll offset and scroll offset calculated due
     * to a reflow.
     */
    this._scrollError = 0;
    /**
     * Total number of items that could possibly be displayed. Used to help
     * calculate the scroll size.
     */
    this._items = [];
    /**
     * The total (estimated) length of all items in the scrolling direction.
     */
    this._scrollSize = 1;
    /**
     * Number of pixels beyond the viewport to still include
     * in the active range of items.
     */
    // TODO (graynorton): Probably want to make this something we calculate based
    // on viewport size, item size, other factors, possibly still with a dial of some kind
    this._overhang = 1000;
    this._hostSink = hostSink;
    // Delay setting config so that subclasses do setup work first
    Promise.resolve().then(() => this.config = config || this._getDefaultConfig());
  }
  set config(config) {
    Object.assign(this, Object.assign({}, this._getDefaultConfig(), config));
  }
  get config() {
    return {
      direction: this.direction
    };
  }
  /**
   * Maximum index of children + 1, to help estimate total height of the scroll
   * space.
   */
  get items() {
    return this._items;
  }
  set items(items) {
    this._setItems(items);
  }
  _setItems(items) {
    if (items !== this._items) {
      this._items = items;
      this._scheduleReflow();
    }
  }
  /**
   * Primary scrolling direction.
   */
  get direction() {
    return this._direction;
  }
  set direction(dir) {
    // Force it to be either horizontal or vertical.
    dir = dir === 'horizontal' ? dir : 'vertical';
    if (dir !== this._direction) {
      this._direction = dir;
      this._sizeDim = dir === 'horizontal' ? 'width' : 'height';
      this._secondarySizeDim = dir === 'horizontal' ? 'height' : 'width';
      this._positionDim = dir === 'horizontal' ? 'left' : 'top';
      this._secondaryPositionDim = dir === 'horizontal' ? 'top' : 'left';
      this._triggerReflow();
    }
  }
  /**
   * Height and width of the viewport.
   */
  get viewportSize() {
    return this._viewportSize;
  }
  set viewportSize(dims) {
    const {
      _viewDim1,
      _viewDim2
    } = this;
    Object.assign(this._viewportSize, dims);
    if (_viewDim2 !== this._viewDim2) {
      // this._viewDim2Changed();
      this._scheduleLayoutUpdate();
    } else if (_viewDim1 !== this._viewDim1) {
      this._checkThresholds();
    }
  }
  /**
   * Scroll offset of the viewport.
   */
  get viewportScroll() {
    return this._latestCoords;
  }
  set viewportScroll(coords) {
    Object.assign(this._latestCoords, coords);
    const oldPos = this._scrollPosition;
    this._scrollPosition = this._latestCoords[this._positionDim];
    const change = Math.abs(oldPos - this._scrollPosition);
    if (change >= 1) {
      this._checkThresholds();
    }
  }
  /**
   * Perform a reflow if one has been scheduled.
   */
  reflowIfNeeded(force = false) {
    if (force || this._pendingReflow) {
      this._pendingReflow = false;
      this._reflow();
    }
  }
  set pin(options) {
    this._pin = options;
    this._triggerReflow();
  }
  get pin() {
    if (this._pin !== null) {
      const {
        index,
        block
      } = this._pin;
      return {
        index: Math.max(0, Math.min(index, this.items.length - 1)),
        block
      };
    }
    return null;
  }
  _clampScrollPosition(val) {
    return Math.max(-this.offsetWithinScroller[this._positionDim], Math.min(val, this.totalScrollSize[dim1(this.direction)] - this._viewDim1));
  }
  unpin() {
    if (this._pin !== null) {
      this._sendUnpinnedMessage();
      this._pin = null;
    }
  }
  _updateLayout() {
    // Override
  }
  // protected _viewDim2Changed(): void {
  //   this._scheduleLayoutUpdate();
  // }
  /**
   * The height or width of the viewport, whichever corresponds to the scrolling direction.
   */
  get _viewDim1() {
    return this._viewportSize[this._sizeDim];
  }
  /**
   * The height or width of the viewport, whichever does NOT correspond to the scrolling direction.
   */
  get _viewDim2() {
    return this._viewportSize[this._secondarySizeDim];
  }
  _scheduleReflow() {
    this._pendingReflow = true;
  }
  _scheduleLayoutUpdate() {
    this._pendingLayoutUpdate = true;
    this._scheduleReflow();
  }
  // For triggering a reflow based on incoming changes to
  // the layout config.
  _triggerReflow() {
    this._scheduleLayoutUpdate();
    // TODO graynorton@: reflowIfNeeded() isn't really supposed
    // to be called internally. Address in larger cleanup
    // of virtualizer / layout interaction pattern.
    // this.reflowIfNeeded(true);
    Promise.resolve().then(() => this.reflowIfNeeded());
  }
  _reflow() {
    if (this._pendingLayoutUpdate) {
      this._updateLayout();
      this._pendingLayoutUpdate = false;
    }
    this._updateScrollSize();
    this._setPositionFromPin();
    this._getActiveItems();
    this._updateVisibleIndices();
    this._sendStateChangedMessage();
  }
  /**
   * If we are supposed to be pinned to a particular
   * item or set of coordinates, we set `_scrollPosition`
   * accordingly and adjust `_scrollError` as needed
   * so that the virtualizer can keep the scroll
   * position in the DOM in sync
   */
  _setPositionFromPin() {
    if (this.pin !== null) {
      const lastScrollPosition = this._scrollPosition;
      const {
        index,
        block
      } = this.pin;
      this._scrollPosition = this._calculateScrollIntoViewPosition({
        index,
        block: block || 'start'
      }) - this.offsetWithinScroller[this._positionDim];
      this._scrollError = lastScrollPosition - this._scrollPosition;
    }
  }
  /**
   * Calculate the coordinates to scroll to, given
   * a request to scroll to the element at a specific
   * index.
   *
   * Supports the same positioning options (`start`,
   * `center`, `end`, `nearest`) as the standard
   * `Element.scrollIntoView()` method, but currently
   * only considers the provided value in the `block`
   * dimension, since we don't yet have any layouts
   * that support virtualization in two dimensions.
   */
  _calculateScrollIntoViewPosition(options) {
    const {
      block
    } = options;
    const index = Math.min(this.items.length, Math.max(0, options.index));
    const itemStartPosition = this._getItemPosition(index)[this._positionDim];
    let scrollPosition = itemStartPosition;
    if (block !== 'start') {
      const itemSize = this._getItemSize(index)[this._sizeDim];
      if (block === 'center') {
        scrollPosition = itemStartPosition - 0.5 * this._viewDim1 + 0.5 * itemSize;
      } else {
        const itemEndPosition = itemStartPosition - this._viewDim1 + itemSize;
        if (block === 'end') {
          scrollPosition = itemEndPosition;
        } else {
          // block === 'nearest'
          const currentScrollPosition = this._scrollPosition;
          scrollPosition = Math.abs(currentScrollPosition - itemStartPosition) < Math.abs(currentScrollPosition - itemEndPosition) ? itemStartPosition : itemEndPosition;
        }
      }
    }
    scrollPosition += this.offsetWithinScroller[this._positionDim];
    return this._clampScrollPosition(scrollPosition);
  }
  getScrollIntoViewCoordinates(options) {
    return {
      [this._positionDim]: this._calculateScrollIntoViewPosition(options)
    };
  }
  _sendUnpinnedMessage() {
    this._hostSink({
      type: 'unpinned'
    });
  }
  _sendVisibilityChangedMessage() {
    this._hostSink({
      type: 'visibilityChanged',
      firstVisible: this._firstVisible,
      lastVisible: this._lastVisible
    });
  }
  _sendStateChangedMessage() {
    const childPositions = new Map();
    if (this._first !== -1 && this._last !== -1) {
      for (let idx = this._first; idx <= this._last; idx++) {
        childPositions.set(idx, this._getItemPosition(idx));
      }
    }
    const message = {
      type: 'stateChanged',
      scrollSize: {
        [this._sizeDim]: this._scrollSize,
        [this._secondarySizeDim]: null
      },
      range: {
        first: this._first,
        last: this._last,
        firstVisible: this._firstVisible,
        lastVisible: this._lastVisible
      },
      childPositions
    };
    if (this._scrollError) {
      message.scrollError = {
        [this._positionDim]: this._scrollError,
        [this._secondaryPositionDim]: 0
      };
      this._scrollError = 0;
    }
    this._hostSink(message);
  }
  /**
   * Number of items to display.
   */
  get _num() {
    if (this._first === -1 || this._last === -1) {
      return 0;
    }
    return this._last - this._first + 1;
  }
  _checkThresholds() {
    if (this._viewDim1 === 0 && this._num > 0 || this._pin !== null) {
      this._scheduleReflow();
    } else {
      const min = Math.max(0, this._scrollPosition - this._overhang);
      const max = Math.min(this._scrollSize, this._scrollPosition + this._viewDim1 + this._overhang);
      if (this._physicalMin > min || this._physicalMax < max) {
        this._scheduleReflow();
      } else {
        this._updateVisibleIndices({
          emit: true
        });
      }
    }
  }
  /**
   * Find the indices of the first and last items to intersect the viewport.
   * Emit a visibleindiceschange event when either index changes.
   */
  _updateVisibleIndices(options) {
    if (this._first === -1 || this._last === -1) return;
    let firstVisible = this._first;
    while (firstVisible < this._last && Math.round(this._getItemPosition(firstVisible)[this._positionDim] + this._getItemSize(firstVisible)[this._sizeDim]) <= Math.round(this._scrollPosition)) {
      firstVisible++;
    }
    let lastVisible = this._last;
    while (lastVisible > this._first && Math.round(this._getItemPosition(lastVisible)[this._positionDim]) >= Math.round(this._scrollPosition + this._viewDim1)) {
      lastVisible--;
    }
    if (firstVisible !== this._firstVisible || lastVisible !== this._lastVisible) {
      this._firstVisible = firstVisible;
      this._lastVisible = lastVisible;
      if (options && options.emit) {
        this._sendVisibilityChangedMessage();
      }
    }
  }
}
exports.BaseLayout = BaseLayout;
},{}],"Qwgb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flow = exports.FlowLayout = void 0;
var _SizeCache = require("./shared/SizeCache.js");
var _BaseLayout = require("./shared/BaseLayout.js");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

const flow = config => Object.assign({
  type: FlowLayout
}, config);
exports.flow = flow;
function leadingMargin(direction) {
  return direction === 'horizontal' ? 'marginLeft' : 'marginTop';
}
function trailingMargin(direction) {
  return direction === 'horizontal' ? 'marginRight' : 'marginBottom';
}
function offset(direction) {
  return direction === 'horizontal' ? 'xOffset' : 'yOffset';
}
function collapseMargins(a, b) {
  const m = [a, b].sort();
  return m[1] <= 0 ? Math.min(...m) : m[0] >= 0 ? Math.max(...m) : m[0] + m[1];
}
class MetricsCache {
  constructor() {
    this._childSizeCache = new _SizeCache.SizeCache();
    this._marginSizeCache = new _SizeCache.SizeCache();
    this._metricsCache = new Map();
  }
  update(metrics, direction) {
    const marginsToUpdate = new Set();
    Object.keys(metrics).forEach(key => {
      const k = Number(key);
      this._metricsCache.set(k, metrics[k]);
      this._childSizeCache.set(k, metrics[k][(0, _BaseLayout.dim1)(direction)]);
      marginsToUpdate.add(k);
      marginsToUpdate.add(k + 1);
    });
    for (const k of marginsToUpdate) {
      const a = this._metricsCache.get(k)?.[leadingMargin(direction)] || 0;
      const b = this._metricsCache.get(k - 1)?.[trailingMargin(direction)] || 0;
      this._marginSizeCache.set(k, collapseMargins(a, b));
    }
  }
  get averageChildSize() {
    return this._childSizeCache.averageSize;
  }
  get totalChildSize() {
    return this._childSizeCache.totalSize;
  }
  get averageMarginSize() {
    return this._marginSizeCache.averageSize;
  }
  get totalMarginSize() {
    return this._marginSizeCache.totalSize;
  }
  getLeadingMarginValue(index, direction) {
    return this._metricsCache.get(index)?.[leadingMargin(direction)] || 0;
  }
  getChildSize(index) {
    return this._childSizeCache.getSize(index);
  }
  getMarginSize(index) {
    return this._marginSizeCache.getSize(index);
  }
  clear() {
    this._childSizeCache.clear();
    this._marginSizeCache.clear();
    this._metricsCache.clear();
  }
}
class FlowLayout extends _BaseLayout.BaseLayout {
  constructor() {
    super(...arguments);
    /**
     * Initial estimate of item size
     */
    this._itemSize = {
      width: 100,
      height: 100
    };
    /**
     * Indices of children mapped to their (position and length) in the scrolling
     * direction. Used to keep track of children that are in range.
     */
    this._physicalItems = new Map();
    /**
     * Used in tandem with _physicalItems to track children in range across
     * reflows.
     */
    this._newPhysicalItems = new Map();
    /**
     * Width and height of children by their index.
     */
    this._metricsCache = new MetricsCache();
    /**
     * anchorIdx is the anchor around which we reflow. It is designed to allow
     * jumping to any point of the scroll size. We choose it once and stick with
     * it until stable. _first and _last are deduced around it.
     */
    this._anchorIdx = null;
    /**
     * Position in the scrolling direction of the anchor child.
     */
    this._anchorPos = null;
    /**
     * Whether all children in range were in range during the previous reflow.
     */
    this._stable = true;
    this._measureChildren = true;
    this._estimate = true;
  }
  // protected _defaultConfig: BaseLayoutConfig = Object.assign({}, super._defaultConfig, {
  // })
  // constructor(config: Layout1dConfig) {
  //   super(config);
  // }
  get measureChildren() {
    return this._measureChildren;
  }
  /**
   * Determine the average size of all children represented in the sizes
   * argument.
   */
  updateItemSizes(sizes) {
    this._metricsCache.update(sizes, this.direction);
    // if (this._nMeasured) {
    // this._updateItemSize();
    this._scheduleReflow();
    // }
  }
  /**
   * Set the average item size based on the total length and number of children
   * in range.
   */
  // _updateItemSize() {
  //   // Keep integer values.
  //   this._itemSize[this._sizeDim] = this._metricsCache.averageChildSize;
  // }
  _getPhysicalItem(idx) {
    return this._newPhysicalItems.get(idx) ?? this._physicalItems.get(idx);
  }
  _getSize(idx) {
    const item = this._getPhysicalItem(idx);
    return item && this._metricsCache.getChildSize(idx);
  }
  _getAverageSize() {
    return this._metricsCache.averageChildSize || this._itemSize[this._sizeDim];
  }
  _estimatePosition(idx) {
    const c = this._metricsCache;
    if (this._first === -1 || this._last === -1) {
      return c.averageMarginSize + idx * (c.averageMarginSize + this._getAverageSize());
    } else {
      if (idx < this._first) {
        const delta = this._first - idx;
        const refItem = this._getPhysicalItem(this._first);
        return refItem.pos - (c.getMarginSize(this._first - 1) || c.averageMarginSize) - (delta * c.averageChildSize + (delta - 1) * c.averageMarginSize);
      } else {
        const delta = idx - this._last;
        const refItem = this._getPhysicalItem(this._last);
        return refItem.pos + (c.getChildSize(this._last) || c.averageChildSize) + (c.getMarginSize(this._last) || c.averageMarginSize) + delta * (c.averageChildSize + c.averageMarginSize);
      }
    }
  }
  /**
   * Returns the position in the scrolling direction of the item at idx.
   * Estimates it if the item at idx is not in the DOM.
   */
  _getPosition(idx) {
    const item = this._getPhysicalItem(idx);
    const {
      averageMarginSize
    } = this._metricsCache;
    return idx === 0 ? this._metricsCache.getMarginSize(0) ?? averageMarginSize : item ? item.pos : this._estimatePosition(idx);
  }
  _calculateAnchor(lower, upper) {
    if (lower <= 0) {
      return 0;
    }
    if (upper > this._scrollSize - this._viewDim1) {
      return this.items.length - 1;
    }
    return Math.max(0, Math.min(this.items.length - 1, Math.floor((lower + upper) / 2 / this._delta)));
  }
  _getAnchor(lower, upper) {
    if (this._physicalItems.size === 0) {
      return this._calculateAnchor(lower, upper);
    }
    if (this._first < 0) {
      return this._calculateAnchor(lower, upper);
    }
    if (this._last < 0) {
      return this._calculateAnchor(lower, upper);
    }
    const firstItem = this._getPhysicalItem(this._first),
      lastItem = this._getPhysicalItem(this._last),
      firstMin = firstItem.pos,
      lastMin = lastItem.pos,
      lastMax = lastMin + this._metricsCache.getChildSize(this._last);
    if (lastMax < lower) {
      // Window is entirely past physical items, calculate new anchor
      return this._calculateAnchor(lower, upper);
    }
    if (firstMin > upper) {
      // Window is entirely before physical items, calculate new anchor
      return this._calculateAnchor(lower, upper);
    }
    // Window contains a physical item
    // Find one, starting with the one that was previously first visible
    let candidateIdx = this._firstVisible - 1;
    let cMax = -Infinity;
    while (cMax < lower) {
      const candidate = this._getPhysicalItem(++candidateIdx);
      cMax = candidate.pos + this._metricsCache.getChildSize(candidateIdx);
    }
    return candidateIdx;
  }
  /**
   * Updates _first and _last based on items that should be in the current
   * viewed range.
   */
  _getActiveItems() {
    if (this._viewDim1 === 0 || this.items.length === 0) {
      this._clearItems();
    } else {
      this._getItems();
    }
  }
  /**
   * Sets the range to empty.
   */
  _clearItems() {
    this._first = -1;
    this._last = -1;
    this._physicalMin = 0;
    this._physicalMax = 0;
    const items = this._newPhysicalItems;
    this._newPhysicalItems = this._physicalItems;
    this._newPhysicalItems.clear();
    this._physicalItems = items;
    this._stable = true;
  }
  /*
   * Updates _first and _last based on items that should be in the given range.
   */
  _getItems() {
    const items = this._newPhysicalItems;
    this._stable = true;
    let lower, upper;
    // The anchorIdx is the anchor around which we reflow. It is designed to
    // allow jumping to any point of the scroll size. We choose it once and
    // stick with it until stable. first and last are deduced around it.
    // If we have a pinned item, we anchor on it
    if (this.pin !== null) {
      const {
        index
      } = this.pin;
      this._anchorIdx = index;
      this._anchorPos = this._getPosition(index);
    }
    // Determine the lower and upper bounds of the region to be
    // rendered, relative to the viewport
    lower = this._scrollPosition - this._overhang; //leadingOverhang;
    upper = this._scrollPosition + this._viewDim1 + this._overhang; // trailingOverhang;
    if (upper < 0 || lower > this._scrollSize) {
      this._clearItems();
      return;
    }
    // If we are scrolling to a specific index or if we are doing another
    // pass to stabilize a previously started reflow, we will already
    // have an anchor. If not, establish an anchor now.
    if (this._anchorIdx === null || this._anchorPos === null) {
      this._anchorIdx = this._getAnchor(lower, upper);
      this._anchorPos = this._getPosition(this._anchorIdx);
    }
    let anchorSize = this._getSize(this._anchorIdx);
    if (anchorSize === undefined) {
      this._stable = false;
      anchorSize = this._getAverageSize();
    }
    const anchorLeadingMargin = this._metricsCache.getMarginSize(this._anchorIdx) ?? this._metricsCache.averageMarginSize;
    const anchorTrailingMargin = this._metricsCache.getMarginSize(this._anchorIdx + 1) ?? this._metricsCache.averageMarginSize;
    if (this._anchorIdx === 0) {
      this._anchorPos = anchorLeadingMargin;
    }
    if (this._anchorIdx === this.items.length - 1) {
      this._anchorPos = this._scrollSize - anchorTrailingMargin - anchorSize;
    }
    // Anchor might be outside bounds, so prefer correcting the error and keep
    // that anchorIdx.
    let anchorErr = 0;
    if (this._anchorPos + anchorSize + anchorTrailingMargin < lower) {
      anchorErr = lower - (this._anchorPos + anchorSize + anchorTrailingMargin);
    }
    if (this._anchorPos - anchorLeadingMargin > upper) {
      anchorErr = upper - (this._anchorPos - anchorLeadingMargin);
    }
    if (anchorErr) {
      this._scrollPosition -= anchorErr;
      lower -= anchorErr;
      upper -= anchorErr;
      this._scrollError += anchorErr;
    }
    items.set(this._anchorIdx, {
      pos: this._anchorPos,
      size: anchorSize
    });
    this._first = this._last = this._anchorIdx;
    this._physicalMin = this._anchorPos - anchorLeadingMargin;
    this._physicalMax = this._anchorPos + anchorSize + anchorTrailingMargin;
    while (this._physicalMin > lower && this._first > 0) {
      let size = this._getSize(--this._first);
      if (size === undefined) {
        this._stable = false;
        size = this._getAverageSize();
      }
      let margin = this._metricsCache.getMarginSize(this._first);
      if (margin === undefined) {
        this._stable = false;
        margin = this._metricsCache.averageMarginSize;
      }
      this._physicalMin -= size;
      const pos = this._physicalMin;
      items.set(this._first, {
        pos,
        size
      });
      this._physicalMin -= margin;
      if (this._stable === false && this._estimate === false) {
        break;
      }
    }
    while (this._physicalMax < upper && this._last < this.items.length - 1) {
      let size = this._getSize(++this._last);
      if (size === undefined) {
        this._stable = false;
        size = this._getAverageSize();
      }
      let margin = this._metricsCache.getMarginSize(this._last);
      if (margin === undefined) {
        this._stable = false;
        margin = this._metricsCache.averageMarginSize;
      }
      const pos = this._physicalMax;
      items.set(this._last, {
        pos,
        size
      });
      this._physicalMax += size + margin;
      if (!this._stable && !this._estimate) {
        break;
      }
    }
    // This handles the cases where we were relying on estimated sizes.
    const extentErr = this._calculateError();
    if (extentErr) {
      this._physicalMin -= extentErr;
      this._physicalMax -= extentErr;
      this._anchorPos -= extentErr;
      this._scrollPosition -= extentErr;
      items.forEach(item => item.pos -= extentErr);
      this._scrollError += extentErr;
    }
    if (this._stable) {
      this._newPhysicalItems = this._physicalItems;
      this._newPhysicalItems.clear();
      this._physicalItems = items;
    }
  }
  _calculateError() {
    if (this._first === 0) {
      return this._physicalMin;
    } else if (this._physicalMin <= 0) {
      return this._physicalMin - this._first * this._delta;
    } else if (this._last === this.items.length - 1) {
      return this._physicalMax - this._scrollSize;
    } else if (this._physicalMax >= this._scrollSize) {
      return this._physicalMax - this._scrollSize + (this.items.length - 1 - this._last) * this._delta;
    }
    return 0;
  }
  _reflow() {
    const {
      _first,
      _last
    } = this;
    super._reflow();
    if (this._first === -1 && this._last == -1 || this._first === _first && this._last === _last) {
      this._resetReflowState();
    }
  }
  _resetReflowState() {
    this._anchorIdx = null;
    this._anchorPos = null;
    this._stable = true;
  }
  _updateScrollSize() {
    const {
      averageMarginSize
    } = this._metricsCache;
    this._scrollSize = Math.max(1, this.items.length * (averageMarginSize + this._getAverageSize()) + averageMarginSize);
  }
  /**
   * Returns the average size (precise or estimated) of an item in the scrolling direction,
   * including any surrounding space.
   */
  get _delta() {
    const {
      averageMarginSize
    } = this._metricsCache;
    return this._getAverageSize() + averageMarginSize;
  }
  /**
   * Returns the top and left positioning of the item at idx.
   */
  _getItemPosition(idx) {
    return {
      [this._positionDim]: this._getPosition(idx),
      [this._secondaryPositionDim]: 0,
      [offset(this.direction)]: -(this._metricsCache.getLeadingMarginValue(idx, this.direction) ?? this._metricsCache.averageMarginSize)
    };
  }
  /**
   * Returns the height and width of the item at idx.
   */
  _getItemSize(idx) {
    return {
      [this._sizeDim]: this._getSize(idx) || this._getAverageSize(),
      [this._secondarySizeDim]: this._itemSize[this._secondarySizeDim]
    };
  }
  _viewDim2Changed() {
    this._metricsCache.clear();
    this._scheduleReflow();
  }
}
exports.FlowLayout = FlowLayout;
},{"./shared/SizeCache.js":"M7Yz","./shared/BaseLayout.js":"TLwk"}]},{},["Qwgb"], null)
//# sourceMappingURL=flow.d5ea1a85.js.map