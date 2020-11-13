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
})({"ytxR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */

exports.isCEPolyfill = isCEPolyfill;

const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */


exports.reparentNodes = reparentNodes;

const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};

exports.removeNodes = removeNodes;
},{}],"Av0K":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

exports.marker = marker;
const nodeMarker = `<!--${marker}-->`;
exports.nodeMarker = nodeMarker;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */

exports.markerRegex = markerRegex;
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */

exports.boundAttributeSuffix = boundAttributeSuffix;

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(element.content, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false); // Keeps track of the last index associated with a part. We try to delete
    // unnecessary nodes, but we never want to associate two different parts
    // to the same index. They must have a constant node between.

    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {
      strings,
      values: {
        length
      }
    } = result;

    while (partIndex < length) {
      const node = walker.nextNode();

      if (node === null) {
        // We've exhausted the content inside a nested template element.
        // Because we still have parts (the outer for-loop), we know:
        // - There is a template in the stack
        // - The walker will find a nextNode outside the template
        walker.currentNode = stack.pop();
        continue;
      }

      index++;

      if (node.nodeType === 1
      /* Node.ELEMENT_NODE */
      ) {
          if (node.hasAttributes()) {
            const attributes = node.attributes;
            const {
              length
            } = attributes; // Per
            // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
            // attributes are not guaranteed to be returned in document order.
            // In particular, Edge/IE can return them out of order, so we cannot
            // assume a correspondence between part index and attribute index.

            let count = 0;

            for (let i = 0; i < length; i++) {
              if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                count++;
              }
            }

            while (count-- > 0) {
              // Get the template literal section leading up to the first
              // expression in this attribute
              const stringForPart = strings[partIndex]; // Find the attribute name

              const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
              // All bound attributes have had a suffix added in
              // TemplateResult#getHTML to opt out of special attribute
              // handling. To look up the attribute value we also need to add
              // the suffix.

              const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
              const attributeValue = node.getAttribute(attributeLookupName);
              node.removeAttribute(attributeLookupName);
              const statics = attributeValue.split(markerRegex);
              this.parts.push({
                type: 'attribute',
                index,
                name,
                strings: statics
              });
              partIndex += statics.length - 1;
            }
          }

          if (node.tagName === 'TEMPLATE') {
            stack.push(node);
            walker.currentNode = node.content;
          }
        } else if (node.nodeType === 3
      /* Node.TEXT_NODE */
      ) {
          const data = node.data;

          if (data.indexOf(marker) >= 0) {
            const parent = node.parentNode;
            const strings = data.split(markerRegex);
            const lastIndex = strings.length - 1; // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts

            for (let i = 0; i < lastIndex; i++) {
              let insert;
              let s = strings[i];

              if (s === '') {
                insert = createMarker();
              } else {
                const match = lastAttributeNameRegex.exec(s);

                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                  s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                }

                insert = document.createTextNode(s);
              }

              parent.insertBefore(insert, node);
              this.parts.push({
                type: 'node',
                index: ++index
              });
            } // If there's no text, we must insert a comment to mark our place.
            // Else, we can trust it will stick around after cloning.


            if (strings[lastIndex] === '') {
              parent.insertBefore(createMarker(), node);
              nodesToRemove.push(node);
            } else {
              node.data = strings[lastIndex];
            } // We have a part for each match found


            partIndex += lastIndex;
          }
        } else if (node.nodeType === 8
      /* Node.COMMENT_NODE */
      ) {
          if (node.data === marker) {
            const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
            // the following are true:
            //  * We don't have a previousSibling
            //  * The previousSibling is already the start of a previous part

            if (node.previousSibling === null || index === lastPartIndex) {
              index++;
              parent.insertBefore(createMarker(), node);
            }

            lastPartIndex = index;
            this.parts.push({
              type: 'node',
              index
            }); // If we don't have a nextSibling, keep this node so we have an end.
            // Else, we can remove it to save future costs.

            if (node.nextSibling === null) {
              node.data = '';
            } else {
              nodesToRemove.push(node);
              index--;
            }

            partIndex++;
          } else {
            let i = -1;

            while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
              // Comment node has a binding marker inside, make an inactive part
              // The binding won't work, but subsequent bindings will
              // TODO (justinfagnani): consider whether it's even worth it to
              // make bindings in comments work
              this.parts.push({
                type: 'node',
                index: -1
              });
              partIndex++;
            }
          }
        }
    } // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}

exports.Template = Template;

const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};

const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.


exports.isTemplatePartActive = isTemplatePartActive;

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */


exports.createMarker = createMarker;
const lastAttributeNameRegex = // eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
exports.lastAttributeNameRegex = lastAttributeNameRegex;
},{}],"NXoq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodesFromTemplate = removeNodesFromTemplate;
exports.insertNodeIntoTemplate = insertNodeIntoTemplate;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */

function removeNodesFromTemplate(template, nodesToRemove) {
  const {
    element: {
      content
    },
    parts
  } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let part = parts[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;

  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode; // End removal if stepped past the removing node

    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    } // A node to remove was found in the template


    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node); // Track node we're removing

      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    } // When removing, increment count by which to adjust subsequent part indices


    if (currentRemovingNode !== null) {
      removeCount++;
    }

    while (part !== undefined && part.index === nodeIndex) {
      // If part is in a removed node deactivate it by setting index to -1 or
      // adjust the index as needed.
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      part = parts[partIndex];
    }
  }

  nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
}

const countNodes = node => {
  let count = node.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

  while (walker.nextNode()) {
    count++;
  }

  return count;
};

const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
  for (let i = startIndex + 1; i < parts.length; i++) {
    const part = parts[i];

    if ((0, _template.isTemplatePartActive)(part)) {
      return i;
    }
  }

  return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */


function insertNodeIntoTemplate(template, node, refNode = null) {
  const {
    element: {
      content
    },
    parts
  } = template; // If there's no refNode, then put node at end of template.
  // No part indices need to be shifted in this case.

  if (refNode === null || refNode === undefined) {
    content.appendChild(node);
    return;
  }

  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let insertCount = 0;
  let walkerIndex = -1;

  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;

    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }

    while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
      // If we've inserted the node, simply adjust all subsequent parts
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }

        return;
      }

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
    }
  }
}
},{"./template.js":"Av0K"}],"uWh2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirective = exports.directive = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */

const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};

exports.directive = directive;

const isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

exports.isDirective = isDirective;
},{}],"pnLb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nothing = exports.noChange = void 0;

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

exports.noChange = noChange;
const nothing = {};
exports.nothing = nothing;
},{}],"bn5t":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateInstance = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // There are a number of steps in the lifecycle of a template instance's
    // DOM fragment:
    //  1. Clone - create the instance fragment
    //  2. Adopt - adopt into the main document
    //  3. Process - find part markers and create parts
    //  4. Upgrade - upgrade custom elements
    //  5. Update - set node, attribute, property, etc., values
    //  6. Connect - connect to the document. Optional and outside of this
    //     method.
    //
    // We have a few constraints on the ordering of these steps:
    //  * We need to upgrade before updating, so that property values will pass
    //    through any property setters.
    //  * We would like to process before upgrading so that we're sure that the
    //    cloned fragment is inert and not disturbed by self-modifying DOM.
    //  * We want custom elements to upgrade even in disconnected fragments.
    //
    // Given these constraints, with full custom elements support we would
    // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
    //
    // But Safari does not implement CustomElementRegistry#upgrade, so we
    // can not implement that order and still have upgrade-before-update and
    // upgrade disconnected fragments. So we instead sacrifice the
    // process-before-upgrade constraint, since in Custom Elements v1 elements
    // must not modify their light DOM in the constructor. We still have issues
    // when co-existing with CEv0 elements like Polymer 1, and with polyfills
    // that don't strictly adhere to the no-modification rule because shadow
    // DOM, which may be created in the constructor, is emulated by being placed
    // in the light DOM.
    //
    // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
    // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
    // in one step.
    //
    // The Custom Elements v1 polyfill supports upgrade(), so the order when
    // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
    // Connect.
    const fragment = _dom.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(fragment, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode(); // Loop through all the nodes and parts of a template

    while (partIndex < parts.length) {
      part = parts[partIndex];

      if (!(0, _template.isTemplatePartActive)(part)) {
        this.__parts.push(undefined);

        partIndex++;
        continue;
      } // Progress the tree walker until we find our next part's node.
      // Note that multiple parts may share the same node (attribute parts
      // on a single element), so this loop may not run at all.


      while (nodeIndex < part.index) {
        nodeIndex++;

        if (node.nodeName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }

        if ((node = walker.nextNode()) === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      } // We've arrived at our part's node.


      if (part.type === 'node') {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);

        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }

      partIndex++;
    }

    if (_dom.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

exports.TemplateInstance = TemplateInstance;
},{"./dom.js":"ytxR","./template.js":"Av0K"}],"cVNN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGTemplateResult = exports.TemplateResult = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */

/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
  createHTML: s => s
});
const commentMarker = ` ${_template.marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */

class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isCommentBinding = false;

    for (let i = 0; i < l; i++) {
      const s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
      // into the template source before it's parsed by the browser's HTML
      // parser. The marker type is based on whether the expression is in an
      // attribute, text, or comment position.
      //   * For node-position bindings we insert a comment with the marker
      //     sentinel as its text content, like <!--{{lit-guid}}-->.
      //   * For attribute bindings we insert just the marker sentinel for the
      //     first binding, so that we support unquoted attribute bindings.
      //     Subsequent bindings can use a comment marker because multi-binding
      //     attributes must be quoted.
      //   * For comment bindings we insert just the marker sentinel so we don't
      //     close the comment.
      //
      // The following code scans the template source, but is *not* an HTML
      // parser. We don't need to track the tree structure of the HTML, only
      // whether a binding is inside a comment, and if not, if it appears to be
      // the first binding in an attribute.

      const commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
      // comment close. Because <-- can appear in an attribute value there can
      // be false positives.

      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceding the
      // expression. This can match "name=value" like structures in text,
      // comments, and attribute values, so there can be false-positives.

      const attributeMatch = _template.lastAttributeNameRegex.exec(s);

      if (attributeMatch === null) {
        // We're only in this branch if we don't have a attribute-like
        // preceding sequence. For comments, this guards against unusual
        // attribute values like <div foo="<!--${'bar'}">. Cases like
        // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
        // below.
        html += s + (isCommentBinding ? commentMarker : _template.nodeMarker);
      } else {
        // For attributes we use just a marker sentinel, and also append a
        // $lit$ suffix to the name to opt-out of attribute-specific parsing
        // that IE and Edge do for style and certain SVG attributes.
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + _template.boundAttributeSuffix + attributeMatch[3] + _template.marker;
      }
    }

    html += this.strings[l];
    return html;
  }

  getTemplateElement() {
    const template = document.createElement('template');
    let value = this.getHTML();

    if (policy !== undefined) {
      // this is secure because `this.strings` is a TemplateStringsArray.
      // TODO: validate this when
      // https://github.com/tc39/proposal-array-is-template-object is
      // implemented.
      value = policy.createHTML(value);
    }

    template.innerHTML = value;
    return template;
  }

}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */


exports.TemplateResult = TemplateResult;

class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }

  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    (0, _dom.reparentNodes)(content, svgElement.firstChild);
    return template;
  }

}

exports.SVGTemplateResult = SVGTemplateResult;
},{"./dom.js":"ytxR","./template.js":"Av0K"}],"atl2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isIterable = exports.isPrimitive = void 0;

var _directive = require("./directive.js");

var _dom = require("./dom.js");

var _part = require("./part.js");

var _templateInstance = require("./template-instance.js");

var _templateResult = require("./template-result.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};

exports.isPrimitive = isPrimitive;

const isIterable = value => {
  return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */


exports.isIterable = isIterable;

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts = this.parts; // If we're assigning an attribute via syntax like:
    //    attr="${foo}"  or  attr=${foo}
    // but not
    //    attr="${foo} ${bar}" or attr="${foo} baz"
    // then we don't want to coerce the attribute value into one long
    // string. Instead we want to just return the value itself directly,
    // so that sanitizeDOMValue can get the actual value rather than
    // String(value)
    // The exception is if v is an array, in which case we do want to smash
    // it together into a string without calling String() on the array.
    //
    // This also allows trusted values (when using TrustedTypes) being
    // assigned to DOM sinks without being stringified in the process.

    if (l === 1 && strings[0] === '' && strings[1] === '') {
      const v = parts[0].value;

      if (typeof v === 'symbol') {
        return String(v);
      }

      if (typeof v === 'string' || !isIterable(v)) {
        return v;
      }
    }

    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === 'string' ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}
/**
 * A Part that controls all or part of an attribute value.
 */


exports.AttributeCommitter = AttributeCommitter;

class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }

  setValue(value) {
    if (value !== _part.noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!(0, _directive.isDirective)(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while ((0, _directive.isDirective)(this.value)) {
      const directive = this.value;
      this.value = _part.noChange;
      directive(this);
    }

    if (this.value === _part.noChange) {
      return;
    }

    this.committer.commit();
  }

}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */


exports.AttributePart = AttributePart;

class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild((0, _template.createMarker)());
    this.endNode = container.appendChild((0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part.__insert(this.startNode = (0, _template.createMarker)());

    part.__insert(this.endNode = (0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref.__insert(this.startNode = (0, _template.createMarker)());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }

    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    const value = this.__pendingValue;

    if (value === _part.noChange) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof _templateResult.TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === _part.nothing) {
      this.value = _part.nothing;
      this.clear();
    } else {
      // Fallback, will render the string representation
      this.__commitText(value);
    }
  }

  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  __commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this.__insert(value);

    this.value = value;
  }

  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value; // If `value` isn't already a string, we explicitly convert it here in case
    // it can't be implicitly converted - i.e. it's a symbol.

    const valueAsString = typeof value === 'string' ? value : String(value);

    if (node === this.endNode.previousSibling && node.nodeType === 3
    /* Node.TEXT_NODE */
    ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = valueAsString;
      } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }

    this.value = value;
  }

  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value instanceof _templateInstance.TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new _templateInstance.TemplateInstance(template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this.__commitNode(fragment);

      this.value = instance;
    }
  }

  __commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  clear(startNode = this.startNode) {
    (0, _dom.removeNodes)(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */


exports.NodePart = NodePart;

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const value = !!this.__pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }

      this.value = value;
    }

    this.__pendingValue = _part.noChange;
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */


exports.BooleanAttributePart = BooleanAttributePart;

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false; // eslint-disable-next-line @typescript-eslint/no-explicit-any

      this.element[this.name] = this._getValue();
    }
  }

}

exports.PropertyCommitter = PropertyCommitter;

class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.


exports.PropertyPart = PropertyPart;
let eventOptionsSupported = false; // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module

(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.addEventListener('test', options, options); // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.removeEventListener('test', options, options);
  } catch (_e) {// event options not supported
  }
})();

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this.__boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    this.value = newListener;
    this.__pendingValue = _part.noChange;
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.


exports.EventPart = EventPart;

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);
},{"./directive.js":"uWh2","./dom.js":"ytxR","./part.js":"pnLb","./template-instance.js":"bn5t","./template-result.js":"cVNN","./template.js":"Av0K"}],"gbKZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateFactory = templateFactory;
exports.templateCaches = void 0;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  } // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content


  const key = result.strings.join(_template.marker); // Check if we already have a Template for this key

  template = templateCache.keyString.get(key);

  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new _template.Template(result, result.getTemplateElement()); // Cache the Template for this key

    templateCache.keyString.set(key, template);
  } // Cache all future queries for this TemplateStringsArray


  templateCache.stringsArray.set(result.strings, template);
  return template;
}

const templateCaches = new Map();
exports.templateCaches = templateCaches;
},{"./template.js":"Av0K"}],"Fhpq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.parts = void 0;

var _dom = require("./dom.js");

var _parts = require("./parts.js");

var _templateFactory = require("./template-factory.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

exports.parts = parts;

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    (0, _dom.removeNodes)(container, container.firstChild);
    parts.set(container, part = new _parts.NodePart(Object.assign({
      templateFactory: _templateFactory.templateFactory
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

exports.render = render;
},{"./dom.js":"ytxR","./parts.js":"atl2","./template-factory.js":"gbKZ"}],"LBiL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

var _parts = require("./parts.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const committer = new _parts.PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }

    if (prefix === '@') {
      return [new _parts.EventPart(element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new _parts.BooleanAttributePart(element, name.slice(1), strings)];
    }

    const committer = new _parts.AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new _parts.NodePart(options);
  }

}

exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
const defaultTemplateProcessor = new DefaultTemplateProcessor();
exports.defaultTemplateProcessor = defaultTemplateProcessor;
},{"./parts.js":"atl2"}],"SPDu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.DefaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "defaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.defaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.SVGTemplateResult;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.TemplateResult;
  }
});
Object.defineProperty(exports, "directive", {
  enumerable: true,
  get: function () {
    return _directive.directive;
  }
});
Object.defineProperty(exports, "isDirective", {
  enumerable: true,
  get: function () {
    return _directive.isDirective;
  }
});
Object.defineProperty(exports, "removeNodes", {
  enumerable: true,
  get: function () {
    return _dom.removeNodes;
  }
});
Object.defineProperty(exports, "reparentNodes", {
  enumerable: true,
  get: function () {
    return _dom.reparentNodes;
  }
});
Object.defineProperty(exports, "noChange", {
  enumerable: true,
  get: function () {
    return _part.noChange;
  }
});
Object.defineProperty(exports, "nothing", {
  enumerable: true,
  get: function () {
    return _part.nothing;
  }
});
Object.defineProperty(exports, "AttributeCommitter", {
  enumerable: true,
  get: function () {
    return _parts.AttributeCommitter;
  }
});
Object.defineProperty(exports, "AttributePart", {
  enumerable: true,
  get: function () {
    return _parts.AttributePart;
  }
});
Object.defineProperty(exports, "BooleanAttributePart", {
  enumerable: true,
  get: function () {
    return _parts.BooleanAttributePart;
  }
});
Object.defineProperty(exports, "EventPart", {
  enumerable: true,
  get: function () {
    return _parts.EventPart;
  }
});
Object.defineProperty(exports, "isIterable", {
  enumerable: true,
  get: function () {
    return _parts.isIterable;
  }
});
Object.defineProperty(exports, "isPrimitive", {
  enumerable: true,
  get: function () {
    return _parts.isPrimitive;
  }
});
Object.defineProperty(exports, "NodePart", {
  enumerable: true,
  get: function () {
    return _parts.NodePart;
  }
});
Object.defineProperty(exports, "PropertyCommitter", {
  enumerable: true,
  get: function () {
    return _parts.PropertyCommitter;
  }
});
Object.defineProperty(exports, "PropertyPart", {
  enumerable: true,
  get: function () {
    return _parts.PropertyPart;
  }
});
Object.defineProperty(exports, "parts", {
  enumerable: true,
  get: function () {
    return _render.parts;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.render;
  }
});
Object.defineProperty(exports, "templateCaches", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateCaches;
  }
});
Object.defineProperty(exports, "templateFactory", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateFactory;
  }
});
Object.defineProperty(exports, "TemplateInstance", {
  enumerable: true,
  get: function () {
    return _templateInstance.TemplateInstance;
  }
});
Object.defineProperty(exports, "createMarker", {
  enumerable: true,
  get: function () {
    return _template.createMarker;
  }
});
Object.defineProperty(exports, "isTemplatePartActive", {
  enumerable: true,
  get: function () {
    return _template.isTemplatePartActive;
  }
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function () {
    return _template.Template;
  }
});
exports.svg = exports.html = void 0;

var _defaultTemplateProcessor = require("./lib/default-template-processor.js");

var _templateResult = require("./lib/template-result.js");

var _directive = require("./lib/directive.js");

var _dom = require("./lib/dom.js");

var _part = require("./lib/part.js");

var _parts = require("./lib/parts.js");

var _render = require("./lib/render.js");

var _templateFactory = require("./lib/template-factory.js");

var _templateInstance = require("./lib/template-instance.js");

var _template = require("./lib/template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @packageDocumentation
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// TODO(justinfagnani): remove line when we get NodePart moving methods
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */


const html = (strings, ...values) => new _templateResult.TemplateResult(strings, values, 'html', _defaultTemplateProcessor.defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */


exports.html = html;

const svg = (strings, ...values) => new _templateResult.SVGTemplateResult(strings, values, 'svg', _defaultTemplateProcessor.defaultTemplateProcessor);

exports.svg = svg;
},{"./lib/default-template-processor.js":"LBiL","./lib/template-result.js":"cVNN","./lib/directive.js":"uWh2","./lib/dom.js":"ytxR","./lib/part.js":"pnLb","./lib/parts.js":"atl2","./lib/render.js":"Fhpq","./lib/template-factory.js":"gbKZ","./lib/template-instance.js":"bn5t","./lib/template.js":"Av0K"}],"eBH8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml.svg;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml.TemplateResult;
  }
});
exports.render = exports.shadyTemplateFactory = void 0;

var _dom = require("./dom.js");

var _modifyTemplate = require("./modify-template.js");

var _render = require("./render.js");

var _templateFactory = require("./template-factory.js");

var _templateInstance = require("./template-instance.js");

var _template = require("./template.js");

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Module to add shady DOM/shady CSS polyfill support to lit-html template
 * rendering. See the [[render]] method for details.
 *
 * @packageDocumentation
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

let compatibleShadyCSSVersion = true;

if (typeof window.ShadyCSS === 'undefined') {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn(`Incompatible ShadyCSS version detected. ` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` + `@webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */


const shadyTemplateFactory = scopeName => result => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);

  let templateCache = _templateFactory.templateCaches.get(cacheKey);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };

    _templateFactory.templateCaches.set(cacheKey, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  }

  const key = result.strings.join(_template.marker);
  template = templateCache.keyString.get(key);

  if (template === undefined) {
    const element = result.getTemplateElement();

    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }

    template = new _template.Template(result, element);
    templateCache.keyString.set(key, template);
  }

  templateCache.stringsArray.set(result.strings, template);
  return template;
};

exports.shadyTemplateFactory = shadyTemplateFactory;
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */

const removeStylesFromLitTemplates = scopeName => {
  TEMPLATE_TYPES.forEach(type => {
    const templates = _templateFactory.templateCaches.get(getTemplateCacheKey(type, scopeName));

    if (templates !== undefined) {
      templates.keyString.forEach(template => {
        const {
          element: {
            content
          }
        } = template; // IE 11 doesn't support the iterable param Set constructor

        const styles = new Set();
        Array.from(content.querySelectorAll('style')).forEach(s => {
          styles.add(s);
        });
        (0, _modifyTemplate.removeNodesFromTemplate)(template, styles);
      });
    }
  });
};

const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */

const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
  shadyRenderSet.add(scopeName); // If `renderedDOM` is stamped from a Template, then we need to edit that
  // Template's underlying template element. Otherwise, we create one here
  // to give to ShadyCSS, which still requires one while scoping.

  const templateElement = !!template ? template.element : document.createElement('template'); // Move styles out of rendered DOM and store.

  const styles = renderedDOM.querySelectorAll('style');
  const {
    length
  } = styles; // If there are no styles, skip unnecessary work

  if (length === 0) {
    // Ensure prepareTemplateStyles is called to support adding
    // styles via `prepareAdoptedCssText` since that requires that
    // `prepareTemplateStyles` is called.
    //
    // ShadyCSS will only update styles containing @apply in the template
    // given to `prepareTemplateStyles`. If no lit Template was given,
    // ShadyCSS will not be able to update uses of @apply in any relevant
    // template. However, this is not a problem because we only create the
    // template for the purpose of supporting `prepareAdoptedCssText`,
    // which doesn't support @apply at all.
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    return;
  }

  const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
  // manipulations will not prevent us from being able to fix up template
  // part indices.
  // NOTE: collecting styles is inefficient for browsers but ShadyCSS
  // currently does this anyway. When it does not, this should be changed.

  for (let i = 0; i < length; i++) {
    const style = styles[i];
    style.parentNode.removeChild(style);
    condensedStyle.textContent += style.textContent;
  } // Remove styles from nested templates in this scope.


  removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
  // `template`.

  const content = templateElement.content;

  if (!!template) {
    (0, _modifyTemplate.insertNodeIntoTemplate)(template, condensedStyle, content.firstChild);
  } else {
    content.insertBefore(condensedStyle, content.firstChild);
  } // Note, it's important that ShadyCSS gets the template that `lit-html`
  // will actually render so that it can update the style inside when
  // needed (e.g. @apply native Shadow DOM case).


  window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
  const style = content.querySelector('style');

  if (window.ShadyCSS.nativeShadow && style !== null) {
    // When in native Shadow DOM, ensure the style created by ShadyCSS is
    // included in initially rendered output (`renderedDOM`).
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else if (!!template) {
    // When no style is left in the template, parts will be broken as a
    // result. To fix this, we put back the style node ShadyCSS removed
    // and then tell lit to remove that node from the template.
    // There can be no style in the template in 2 cases (1) when Shady DOM
    // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
    // is in use ShadyCSS removes the style if it contains no content.
    // NOTE, ShadyCSS creates its own style so we can safely add/remove
    // `condensedStyle` here.
    content.insertBefore(condensedStyle, content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    (0, _modifyTemplate.removeNodesFromTemplate)(template, removes);
  }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */


const render = (result, container, options) => {
  if (!options || typeof options !== 'object' || !options.scopeName) {
    throw new Error('The `scopeName` option is required.');
  }

  const scopeName = options.scopeName;

  const hasRendered = _render.parts.has(container);

  const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  && !!container.host; // Handle first render to a scope specially...

  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
  // fragment that is reused since nested renders can occur synchronously.

  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  (0, _render.render)(result, renderContainer, Object.assign({
    templateFactory: shadyTemplateFactory(scopeName)
  }, options)); // When performing first scope render,
  // (1) We've rendered into a fragment so that there's a chance to
  // `prepareTemplateStyles` before sub-elements hit the DOM
  // (which might cause them to render based on a common pattern of
  // rendering in a custom element's `connectedCallback`);
  // (2) Scope the template with ShadyCSS one time only for this scope.
  // (3) Render the fragment into the container and make sure the
  // container knows its `part` is the one we just rendered. This ensures
  // DOM will be re-used on subsequent renders.

  if (firstScopeRender) {
    const part = _render.parts.get(renderContainer);

    _render.parts.delete(renderContainer); // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
    // that should apply to `renderContainer` even if the rendered value is
    // not a TemplateInstance. However, it will only insert scoped styles
    // into the document if `prepareTemplateStyles` has already been called
    // for the given scope name.


    const template = part.value instanceof _templateInstance.TemplateInstance ? part.value.template : undefined;
    prepareTemplateStyles(scopeName, renderContainer, template);
    (0, _dom.removeNodes)(container, container.firstChild);
    container.appendChild(renderContainer);

    _render.parts.set(container, part);
  } // After elements have hit the DOM, update styling if this is the
  // initial render to this container.
  // This is needed whenever dynamic changes are made so it would be
  // safest to do every render; however, this would regress performance
  // so we leave it up to the user to call `ShadyCSS.styleElement`
  // for dynamic changes.


  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};

exports.render = render;
},{"./dom.js":"ytxR","./modify-template.js":"NXoq","./render.js":"Fhpq","./template-factory.js":"gbKZ","./template-instance.js":"bn5t","./template.js":"Av0K","../lit-html.js":"SPDu"}],"fKvB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatingElement = exports.notEqual = exports.defaultConverter = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */

/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */


window.JSCompiler_renameProperty = (prop, _obj) => prop;

const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? '' : null;

      case Object:
      case Array:
        // if the value is `null` or `undefined` pass this through
        // to allow removing/no change behavior.
        return value == null ? value : JSON.stringify(value);
    }

    return value;
  },

  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;

      case Number:
        return value === null ? null : Number(value);

      case Object:
      case Array:
        return JSON.parse(value);
    }

    return value;
  }

};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */

exports.defaultConverter = defaultConverter;

const notEqual = (value, old) => {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};

exports.notEqual = notEqual;
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */

const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */

class UpdatingElement extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */


  static get observedAttributes() {
    // note: piggy backing on this to ensure we're finalized.
    this.finalize();
    const attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays

    this._classProperties.forEach((v, p) => {
      const attr = this._attributeNameForProperty(p, v);

      if (attr !== undefined) {
        this._attributeToPropertyMap.set(attr, p);

        attributes.push(attr);
      }
    });

    return attributes;
  }
  /**
   * Ensures the private `_classProperties` property metadata is created.
   * In addition to `finalize` this is also called in `createProperty` to
   * ensure the `@property` decorator can add property metadata.
   */

  /** @nocollapse */


  static _ensureClassProperties() {
    // ensure private storage for property declarations.
    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
      this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

      const superProperties = Object.getPrototypeOf(this)._classProperties;

      if (superProperties !== undefined) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a PropertyDeclaration for the property with the given options.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   *
   * @nocollapse
   */


  static createProperty(name, options = defaultPropertyDeclaration) {
    // Note, since this can be called by the `@property` decorator which
    // is called before `finalize`, we ensure storage exists for property
    // metadata.
    this._ensureClassProperties();

    this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
    // it would be lost otherwise and that would never be the user's intention;
    // Instead, we expect users to call `requestUpdate` themselves from
    // user-defined accessors. Note that if the super has an accessor we will
    // still overwrite it


    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }

    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
    const descriptor = this.getPropertyDescriptor(name, key, options);

    if (descriptor !== undefined) {
      Object.defineProperty(this.prototype, name, descriptor);
    }
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   *   class MyElement extends LitElement {
   *     static getPropertyDescriptor(name, key, options) {
   *       const defaultDescriptor =
   *           super.getPropertyDescriptor(name, key, options);
   *       const setter = defaultDescriptor.set;
   *       return {
   *         get: defaultDescriptor.get,
   *         set(value) {
   *           setter.call(this, value);
   *           // custom action.
   *         },
   *         configurable: true,
   *         enumerable: true
   *       }
   *     }
   *   }
   *
   * @nocollapse
   */


  static getPropertyDescriptor(name, key, options) {
    return {
      // tslint:disable-next-line:no-any no symbol in index
      get() {
        return this[key];
      },

      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdateInternal(name, oldValue, options);
      },

      configurable: true,
      enumerable: true
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a PropertyDeclaration via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override `createProperty`.
   *
   * @nocollapse
   * @final
   */


  static getPropertyOptions(name) {
    return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
  }
  /**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   * @nocollapse
   */


  static finalize() {
    // finalize any superclasses
    const superCtor = Object.getPrototypeOf(this);

    if (!superCtor.hasOwnProperty(finalized)) {
      superCtor.finalize();
    }

    this[finalized] = true;

    this._ensureClassProperties(); // initialize Map populated in observedAttributes


    this._attributeToPropertyMap = new Map(); // make any properties
    // Note, only process "own" properties since this element will inherit
    // any properties defined on the superClass, and finalization ensures
    // the entire prototype chain is finalized.

    if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
      const props = this.properties; // support symbols in properties (IE11 does not support this)

      const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])]; // This for/of is ok because propKeys is an array

      for (const p of propKeys) {
        // note, use of `any` is due to TypeSript lack of support for symbol in
        // index types
        // tslint:disable-next-line:no-any no symbol in index
        this.createProperty(p, props[p]);
      }
    }
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */


  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
  }
  /**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   * @nocollapse
   */


  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  /**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's
   * `converter` or `converter.fromAttribute` property option.
   * @nocollapse
   */


  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  /**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   * @nocollapse
   */


  static _propertyValueToAttribute(value, options) {
    if (options.reflect === undefined) {
      return;
    }

    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  /**
   * Performs element initialization. By default captures any pre-set values for
   * registered properties.
   */


  initialize() {
    this._updateState = 0;
    this._updatePromise = new Promise(res => this._enableUpdatingResolver = res);
    this._changedProperties = new Map();

    this._saveInstanceProperties(); // ensures first update will be caught by an early access of
    // `updateComplete`


    this.requestUpdateInternal();
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */


  _saveInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    this.constructor._classProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];

        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }

        this._instanceProperties.set(p, value);
      }
    });
  }
  /**
   * Applies previously saved instance properties.
   */


  _applyInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    // tslint:disable-next-line:no-any
    this._instanceProperties.forEach((v, p) => this[p] = v);

    this._instanceProperties = undefined;
  }

  connectedCallback() {
    // Ensure first connection completes an update. Updates cannot complete
    // before connection.
    this.enableUpdating();
  }

  enableUpdating() {
    if (this._enableUpdatingResolver !== undefined) {
      this._enableUpdatingResolver();

      this._enableUpdatingResolver = undefined;
    }
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */


  disconnectedCallback() {}
  /**
   * Synchronizes property values when attributes change.
   */


  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }

  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;

    const attr = ctor._attributeNameForProperty(name, options);

    if (attr !== undefined) {
      const attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


      if (attrValue === undefined) {
        return;
      } // Track if the property is being reflected to avoid
      // setting the property again via `attributeChangedCallback`. Note:
      // 1. this takes advantage of the fact that the callback is synchronous.
      // 2. will behave incorrectly if multiple attributes are in the reaction
      // stack at time of calling. However, since we process attributes
      // in `update` this should not be possible (or an extreme corner case
      // that we'd like to discover).
      // mark state reflecting


      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      } // mark state not reflecting


      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }

  _attributeToProperty(name, value) {
    // Use tracking info to avoid deserializing attribute value if it was
    // just set from a property setter.
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }

    const ctor = this.constructor; // Note, hint this as an `AttributeMap` so closure clearly understands
    // the type; it has issues with tracking types through statics
    // tslint:disable-next-line:no-unnecessary-type-assertion

    const propName = ctor._attributeToPropertyMap.get(name);

    if (propName !== undefined) {
      const options = ctor.getPropertyOptions(propName); // mark state reflecting

      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = // tslint:disable-next-line:no-any
      ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  /**
   * This protected version of `requestUpdate` does not access or return the
   * `updateComplete` promise. This promise can be overridden and is therefore
   * not free to access.
   */


  requestUpdateInternal(name, oldValue, options) {
    let shouldRequestUpdate = true; // If we have a property key, perform property update steps.

    if (name !== undefined) {
      const ctor = this.constructor;
      options = options || ctor.getPropertyOptions(name);

      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        } // Add to reflecting properties set.
        // Note, it's important that every change has a chance to add the
        // property to `_reflectingProperties`. This ensures setting
        // attribute + property reflects correctly.


        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === undefined) {
            this._reflectingProperties = new Map();
          }

          this._reflectingProperties.set(name, options);
        }
      } else {
        // Abort the request if the property should not be considered changed.
        shouldRequestUpdate = false;
      }
    }

    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._updatePromise = this._enqueueUpdate();
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */


  requestUpdate(name, oldValue) {
    this.requestUpdateInternal(name, oldValue);
    return this.updateComplete;
  }
  /**
   * Sets up the element to asynchronously update.
   */


  async _enqueueUpdate() {
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;

    try {
      // Ensure any previous update has resolved before updating.
      // This `await` also ensures that property changes are batched.
      await this._updatePromise;
    } catch (e) {// Ignore any previous errors. We only care that the previous cycle is
      // done. Any error should have been handled in the previous update.
    }

    const result = this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
    // enable coordinating updates with a scheduler. Note, the result is
    // checked to avoid delaying an additional microtask unless we need to.

    if (result != null) {
      await result;
    }

    return !this._hasRequestedUpdate;
  }

  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }

  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * You can override this method to change the timing of updates. If this
   * method is overridden, `super.performUpdate()` must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```
   * protected async performUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.performUpdate();
   * }
   * ```
   */


  performUpdate() {
    // Abort any update if one is not pending when this is called.
    // This can happen if `performUpdate` is called early to "flush"
    // the update.
    if (!this._hasRequestedUpdate) {
      return;
    } // Mixin instance properties once, if they exist.


    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }

    let shouldUpdate = false;
    const changedProperties = this._changedProperties;

    try {
      shouldUpdate = this.shouldUpdate(changedProperties);

      if (shouldUpdate) {
        this.update(changedProperties);
      } else {
        this._markUpdated();
      }
    } catch (e) {
      // Prevent `firstUpdated` and `updated` from running when there's an
      // update exception.
      shouldUpdate = false; // Ensure element can accept additional updates after an exception.

      this._markUpdated();

      throw e;
    }

    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }

      this.updated(changedProperties);
    }
  }

  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `_getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super._getUpdateComplete()`, then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */


  get updateComplete() {
    return this._getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   *   class MyElement extends LitElement {
   *     async _getUpdateComplete() {
   *       await super._getUpdateComplete();
   *       await this._myChild.updateComplete;
   *     }
   *   }
   */


  _getUpdateComplete() {
    return this._updatePromise;
  }
  /**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  update(_changedProperties) {
    if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
      // Use forEach so this works even if for/of loops are compiled to for
      // loops expecting arrays
      this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));

      this._reflectingProperties = undefined;
    }

    this._markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  updated(_changedProperties) {}
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  firstUpdated(_changedProperties) {}

}

exports.UpdatingElement = UpdatingElement;
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */

UpdatingElement[_a] = true;
},{}],"FzpZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.property = property;
exports.internalProperty = internalProperty;
exports.query = query;
exports.queryAsync = queryAsync;
exports.queryAll = queryAll;
exports.eventOptions = eventOptions;
exports.queryAssignedNodes = queryAssignedNodes;
exports.customElement = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
  window.customElements.define(tagName, clazz); // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.
  // tslint:disable-next-line:no-any

  return clazz;
};

const standardCustomElement = (tagName, descriptor) => {
  const {
    kind,
    elements
  } = descriptor;
  return {
    kind,
    elements,

    // This callback is called once the class is otherwise fully defined
    finisher(clazz) {
      window.customElements.define(tagName, clazz);
    }

  };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```
 * @customElement('my-element')
 * class MyElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The name of the custom element to define.
 */


const customElement = tagName => classOrDescriptor => typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);

exports.customElement = customElement;

const standardProperty = (options, element) => {
  // When decorating an accessor, pass it through and add property metadata.
  // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
  // stomp over the user's accessor.
  if (element.kind === 'method' && element.descriptor && !('value' in element.descriptor)) {
    return Object.assign(Object.assign({}, element), {
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    });
  } else {
    // createProperty() takes care of defining the property, but we still
    // must return some kind of descriptor, so return a descriptor for an
    // unused prototype field. The finisher calls createProperty().
    return {
      kind: 'field',
      key: Symbol(),
      placement: 'own',
      descriptor: {},

      // When @babel/plugin-proposal-decorators implements initializers,
      // do this instead of the initializer below. See:
      // https://github.com/babel/babel/issues/9260 extras: [
      //   {
      //     kind: 'initializer',
      //     placement: 'own',
      //     initializer: descriptor.initializer,
      //   }
      // ],
      initializer() {
        if (typeof element.initializer === 'function') {
          this[element.key] = element.initializer.call(this);
        }
      },

      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    };
  }
};

const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
 * supplied to configure property features.
 *
 * This decorator should only be used for public fields. Private or protected
 * fields should use the [[`internalProperty`]] decorator.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */


function property(options) {
  // tslint:disable-next-line:no-any decorator
  return (protoOrDescriptor, name) => name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}
/**
 * Declares a private or protected property that still triggers updates to the
 * element when it changes.
 *
 * Properties declared this way must not be used from HTML or HTML templating
 * systems, they're solely for properties internal to the element. These
 * properties may be renamed by optimization tools like closure compiler.
 * @category Decorator
 */


function internalProperty(options) {
  return property({
    attribute: false,
    hasChanged: options === null || options === void 0 ? void 0 : options.hasChanged
  });
}
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 * @param cache An optional boolean which when true performs the DOM query only
 * once and caches the result.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 *
 * ```ts
 * class MyElement {
 *   @query('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */


function query(selector, cache) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelector(selector);
      },

      enumerable: true,
      configurable: true
    };

    if (cache) {
      const key = typeof name === 'symbol' ? Symbol() : `__${name}`;

      descriptor.get = function () {
        if (this[key] === undefined) {
          this[key] = this.renderRoot.querySelector(selector);
        }

        return this[key];
      };
    }

    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
} // Note, in the future, we may extend this decorator to support the use case
// where the queried element may need to do work to become ready to interact
// with (e.g. load some implementation code). If so, we might elect to
// add a second argument defining a function that can be run to make the
// queried element loaded/updated/ready.

/**
 * A property decorator that converts a class property into a getter that
 * returns a promise that resolves to the result of a querySelector on the
 * element's renderRoot done after the element's `updateComplete` promise
 * resolves. When the queried property may change with element state, this
 * decorator can be used instead of requiring users to await the
 * `updateComplete` before accessing the property.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 * ```ts
 * class MyElement {
 *   @queryAsync('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 *
 * // external usage
 * async doSomethingWithFirst() {
 *  (await aMyElement.first).doSomething();
 * }
 * ```
 * @category Decorator
 */


function queryAsync(selector) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      async get() {
        await this.updateComplete;
        return this.renderRoot.querySelector(selector);
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 * @example
 * ```ts
 * class MyElement {
 *   @queryAll('div')
 *   divs;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */


function queryAll(selector) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelectorAll(selector);
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}

const legacyQuery = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};

const standardQuery = (descriptor, element) => ({
  kind: 'method',
  placement: 'prototype',
  key: element.key,
  descriptor
});

const standardEventOptions = (options, element) => {
  return Object.assign(Object.assign({}, element), {
    finisher(clazz) {
      Object.assign(clazz.prototype[element.key], options);
    }

  });
};

const legacyEventOptions = // tslint:disable-next-line:no-any legacy decorator
(options, proto, name) => {
  Object.assign(proto[name], options);
};
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifies event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 * ```ts
 * class MyElement {
 *   clicked = false;
 *
 *   render() {
 *     return html`
 *       <div @click=${this._onClick}`>
 *         <button></button>
 *       </div>
 *     `;
 *   }
 *
 *   @eventOptions({capture: true})
 *   _onClick(e) {
 *     this.clicked = true;
 *   }
 * }
 * ```
 * @category Decorator
 */


function eventOptions(options) {
  // Return value typed as any to prevent TypeScript from complaining that
  // standard decorator function signature does not match TypeScript decorator
  // signature
  // TODO(kschaaf): unclear why it was only failing on this decorator and not
  // the others
  return (protoOrDescriptor, name) => name !== undefined ? legacyEventOptions(options, protoOrDescriptor, name) : standardEventOptions(options, protoOrDescriptor);
} // x-browser support for matches
// tslint:disable-next-line:no-any


const ElementProto = Element.prototype;
const legacyMatches = ElementProto.msMatchesSelector || ElementProto.webkitMatchesSelector;
/**
 * A property decorator that converts a class property into a getter that
 * returns the `assignedNodes` of the given named `slot`. Note, the type of
 * this property should be annotated as `NodeListOf<HTMLElement>`.
 *
 * @param slotName A string name of the slot.
 * @param flatten A boolean which when true flattens the assigned nodes,
 * meaning any assigned nodes that are slot elements are replaced with their
 * assigned nodes.
 * @param selector A string which filters the results to elements that match
 * the given css selector.
 *
 * * @example
 * ```ts
 * class MyElement {
 *   @queryAssignedNodes('list', true, '.item')
 *   listItems;
 *
 *   render() {
 *     return html`
 *       <slot name="list"></slot>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */

function queryAssignedNodes(slotName = '', flatten = false, selector = '') {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        const slotSelector = `slot${slotName ? `[name=${slotName}]` : ':not([name])'}`;
        const slot = this.renderRoot.querySelector(slotSelector);
        let nodes = slot && slot.assignedNodes({
          flatten
        });

        if (nodes && selector) {
          nodes = nodes.filter(node => node.nodeType === Node.ELEMENT_NODE && node.matches ? node.matches(selector) : legacyMatches.call(node, selector));
        }

        return nodes;
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
},{}],"ZFCR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = exports.unsafeCSS = exports.CSSResult = exports.supportsAdoptingStyleSheets = void 0;

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
exports.supportsAdoptingStyleSheets = supportsAdoptingStyleSheets;
const constructionToken = Symbol();

class CSSResult {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    }

    this.cssText = cssText;
  } // Note, this is a getter so that it's lazy. In practice, this means
  // stylesheets are not created until the first element instance is made.


  get styleSheet() {
    if (this._styleSheet === undefined) {
      // Note, if `supportsAdoptingStyleSheets` is true then we assume
      // CSSStyleSheet is constructable.
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();

        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }

    return this._styleSheet;
  }

  toString() {
    return this.cssText;
  }

}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */


exports.CSSResult = CSSResult;

const unsafeCSS = value => {
  return new CSSResult(String(value), constructionToken);
};

exports.unsafeCSS = unsafeCSS;

const textFromCSSResult = value => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else if (typeof value === 'number') {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */


const css = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, constructionToken);
};

exports.css = css;
},{}],"bhxD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  html: true,
  svg: true,
  TemplateResult: true,
  SVGTemplateResult: true
};
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml.svg;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml.TemplateResult;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml.SVGTemplateResult;
  }
});
exports.LitElement = void 0;

var _shadyRender = require("lit-html/lib/shady-render.js");

var _updatingElement = require("./lib/updating-element.js");

Object.keys(_updatingElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _updatingElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updatingElement[key];
    }
  });
});

var _decorators = require("./lib/decorators.js");

Object.keys(_decorators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _decorators[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _decorators[key];
    }
  });
});

var _litHtml = require("lit-html/lit-html.js");

var _cssTag = require("./lib/css-tag.js");

Object.keys(_cssTag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cssTag[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cssTag[key];
    }
  });
});

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The main LitElement module, which defines the [[`LitElement`]] base class and
 * related APIs.
 *
 *  LitElement components can define a template and a set of observed
 * properties. Changing an observed property triggers a re-render of the
 * element.
 *
 *  Import [[`LitElement`]] and [[`html`]] from this module to create a
 * component:
 *
 *  ```js
 * import {LitElement, html} from 'lit-element';
 *
 * class MyElement extends LitElement {
 *
 *   // Declare observed properties
 *   static get properties() {
 *     return {
 *       adjective: {}
 *     }
 *   }
 *
 *   constructor() {
 *     this.adjective = 'awesome';
 *   }
 *
 *   // Define the element's template
 *   render() {
 *     return html`<p>your ${adjective} template here</p>`;
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 * ```
 *
 * `LitElement` extends [[`UpdatingElement`]] and adds lit-html templating.
 * The `UpdatingElement` class is provided for users that want to build
 * their own custom element base classes that don't use lit-html.
 *
 * @packageDocumentation
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.4.0');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */

const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */

class LitElement extends _updatingElement.UpdatingElement {
  /**
   * Return the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * @nocollapse
   */
  static getStyles() {
    return this.styles;
  }
  /** @nocollapse */


  static _getUniqueStyles() {
    // Only gather styles once per class
    if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
      return;
    } // Take care not to call `this.getStyles()` multiple times since this
    // generates new CSSResults each time.
    // TODO(sorvell): Since we do not cache CSSResults by input, any
    // shared styles will generate new stylesheet objects, which is wasteful.
    // This should be addressed when a browser ships constructable
    // stylesheets.


    const userStyles = this.getStyles();

    if (Array.isArray(userStyles)) {
      // De-duplicate styles preserving the _last_ instance in the set.
      // This is a performance optimization to avoid duplicated styles that can
      // occur especially when composing via subclassing.
      // The last item is kept to try to preserve the cascade order with the
      // assumption that it's most important that last added styles override
      // previous styles.
      const addStyles = (styles, set) => styles.reduceRight((set, s) => // Note: On IE set.add() does not return the set
      Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set); // Array.from does not work on Set in IE, otherwise return
      // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()


      const set = addStyles(userStyles, new Set());
      const styles = [];
      set.forEach(v => styles.unshift(v));
      this._styles = styles;
    } else {
      this._styles = userStyles === undefined ? [] : [userStyles];
    } // Ensure that there are no invalid CSSStyleSheet instances here. They are
    // invalid in two conditions.
    // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
    //     this is impossible to check except via .replaceSync or use
    // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
    //     false)


    this._styles = this._styles.map(s => {
      if (s instanceof CSSStyleSheet && !_cssTag.supportsAdoptingStyleSheets) {
        // Flatten the cssText from the passed constructible stylesheet (or
        // undetectable non-constructible stylesheet). The user might have
        // expected to update their stylesheets over time, but the alternative
        // is a crash.
        const cssText = Array.prototype.slice.call(s.cssRules).reduce((css, rule) => css + rule.cssText, '');
        return (0, _cssTag.unsafeCSS)(cssText);
      }

      return s;
    });
  }
  /**
   * Performs element initialization. By default this calls
   * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
   * captures any pre-set values for registered properties.
   */


  initialize() {
    super.initialize();

    this.constructor._getUniqueStyles();

    this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
    // element's getRootNode(). While this could be done, we're choosing not to
    // support this now since it would require different logic around de-duping.

    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */


  createRenderRoot() {
    return this.attachShadow({
      mode: 'open'
    });
  }
  /**
   * Applies styling to the element shadowRoot using the [[`styles`]]
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */


  adoptStyles() {
    const styles = this.constructor._styles;

    if (styles.length === 0) {
      return;
    } // There are three separate cases here based on Shadow DOM support.
    // (1) shadowRoot polyfilled: use ShadyCSS
    // (2) shadowRoot.adoptedStyleSheets available: use it
    // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
    // rendering


    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s => s.cssText), this.localName);
    } else if (_cssTag.supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map(s => s instanceof CSSStyleSheet ? s : s.styleSheet);
    } else {
      // This must be done after rendering so the actual style insertion is done
      // in `update`.
      this._needsShimAdoptedStyleSheets = true;
    }
  }

  connectedCallback() {
    super.connectedCallback(); // Note, first update/render handles styleElement so we only call this if
    // connected after first update.

    if (this.hasUpdated && window.ShadyCSS !== undefined) {
      window.ShadyCSS.styleElement(this);
    }
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param _changedProperties Map of changed properties with old values
   */


  update(changedProperties) {
    // Setting properties in `render` should not trigger an update. Since
    // updates are allowed after super.update, it's important to call `render`
    // before that.
    const templateResult = this.render();
    super.update(changedProperties); // If render is not implemented by the component, don't call lit-html render

    if (templateResult !== renderNotImplemented) {
      this.constructor.render(templateResult, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      });
    } // When native Shadow DOM is used but adoptedStyles are not supported,
    // insert styling after rendering to ensure adoptedStyles have highest
    // priority.


    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;

      this.constructor._styles.forEach(s => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `NodePart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   */


  render() {
    return renderNotImplemented;
  }

}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */


exports.LitElement = LitElement;
LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */

LitElement.render = _shadyRender.render;
},{"lit-html/lib/shady-render.js":"eBH8","./lib/updating-element.js":"fKvB","./lib/decorators.js":"FzpZ","lit-html/lit-html.js":"SPDu","./lib/css-tag.js":"ZFCR"}],"ncPe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconList = exports.IconElement = exports.svgIcons = void 0;

var _litElement = require("lit-element");

/*
	https://icomoon.io/app
*/
const svgDef = require('./icons.svg.html');

class SvgIcons {
  get prefix() {
    return 'icon-';
  }

  get svgDefElement() {
    if (!this.__svgDefElement) {
      let div = document.createElement('div');
      div.innerHTML = svgDef;
      this.__svgDefElement = div.firstChild; // remove all the <title> tags so they dont show as "tooltips" when hovering

      this.__svgDefElement.querySelectorAll('title').forEach(el => el.remove());

      div = null;
    }

    return this.__svgDefElement;
  }

  get names() {
    return Array.from(this.svgDefElement.querySelectorAll('symbol')).map(el => el.id.replace(this.prefix, '')).sort();
  }

  get(name) {
    let symbol = this.svgDefElement.querySelector(`#${this.prefix}${name}`);
    let svg = null;

    if (symbol) {
      let div = document.createElement('div');
      div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${symbol.innerHTML}</svg>`;
      svg = div.firstChild; // copy attributes

      Array.from(symbol.attributes).forEach(attr => {
        svg.setAttribute(attr.name, attr.value);
      });
    }

    return svg;
  }

}

const svgIcons = new SvgIcons();
exports.svgIcons = svgIcons;

class IconElement extends HTMLElement {
  // not ideal...
  get styles() {
    return `
		:host {
			display: inline-flex;
			vertical-align: middle;
			align-items: center;
			justify-content: center;
			color: inherit;
			--size: 1em;
			height: var(--size);
		}

		:host([hidden]) {
			display: none !important;
		}

		:host([link]) {
			cursor: pointer;
		}

		:host([muted]) {
			opacity: .5;
		}

		:host([square]) {
			width: var(--size);
		}

		:host([invalid]) {
			background: #f44336;
		}

		svg {
			height: 100%;
			/* width: 100%; */
			display: inline-block;
			fill: currentColor;
			color: currentColor;
		}

		@keyframes rotate360 {
			to { transform: rotate(360deg); }
		}

		@keyframes rotate360CCW {
			to { transform: rotate(-360deg); }
		}

		:host([spin]) svg {
			animation: 1600ms rotate360 infinite linear;
		}

		:host([name="arrows-ccw"][spin]) svg {
			animation: 1600ms rotate360CCW infinite linear;
		}
		`;
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    temp.innerHTML = `<style>
		${this.styles}
		</style>
		<slot></slot>
		`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
  }

  _setSVG() {
    if (this._svg) this._svg.remove();
    this._svg = svgIcons.get(this.name);

    if (this._svg) {
      this.removeAttribute('invalid');
      this.shadowRoot.appendChild(this._svg);
    } else {
      this.setAttribute('invalid', '');
    }
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') this._setSVG();
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(val) {
    return this.setAttribute('name', val);
  }

  set spin(val) {
    this.toggleAttribute('spin', Boolean(val));
  }

  get spin() {
    return this.hasAttribute('spin');
  }

}

exports.IconElement = IconElement;
customElements.define('b-icon', IconElement);

class IconList extends _litElement.LitElement {
  static get properties() {
    return {
      cols: {
        type: Number,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.cols = 6;
  }

  static get styles() {
    return (0, _litElement.css)`
		:host {
			display: block;
			column-count: 6;
			gap: 1em;
			width: 100%;
			font-size:1.2em;
			padding: 1em;
			overflow: auto;
		}

		:host([cols="1"]) { column-count: 1}
		:host([cols="2"]) { column-count: 2}
		:host([cols="3"]) { column-count: 3}
		:host([cols="4"]) { column-count: 4}
		:host([cols="5"]) { column-count: 5}
		:host([cols="6"]) { column-count: 6}

		:host > div {
			margin: .75em;
		}

		:host > div:first-child {
			margin-top: 0;
		}

		b-icon {
			width: 1.6em;
		}

		small {
			color: var(--theme-color-accent);
		}

		@media (max-width: 550px) {
            :host {
                column-count: 1 !important;
            }
        }
	`;
  }

  render() {
    return (0, _litElement.html)`
		${svgIcons.names.map(name => (0, _litElement.html)`
			<div>
				<b-icon name=${name}></b-icon> <small>${name}</small>
			</div>
		`)}
	`;
  }

}

exports.IconList = IconList;
customElements.define('b-icon-list', IconList);
},{"lit-element":"bhxD","./icons.svg.html":"pxeq"}],"EnCN":[function(require,module,exports) {
/*
	SVG and idea taken from https://ant.design/components/button/
	
	Examples: 
	<circle-spinner/>
	<circle-spinner style="--size:.8em; color: white"/>
*/
class SpinnerElement extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    temp.innerHTML = `<style>
			:host {
				--size: .8em;
				height: var(--size);
			    width: var(--size);
			    display: inline-block;
			    vertical-align: middle;
			}
			
			:host(.overlay) {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 10000;
			}
			
			@keyframes spin {
				100% {
				    transform: rotate(360deg);
				}
			}
			
			svg {
				animation: spin 1s infinite linear;
				transform-origin: center center;
			}
			</style>
			<svg viewBox="0 0 1024 1024" class="spin" data-icon="loading" width="100%" height="100%" fill="currentColor" aria-hidden="true">
				<path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
			</svg>`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
  }

}

customElements.define('b-spinner', SpinnerElement);
},{}],"DABr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

require("./spinner");

require("./icon");

class BtnElement extends _litElement.LitElement {
  static get properties() {
    return {
      href: {
        type: String,
        reflect: true
      },
      value: {
        type: String,
        reflect: true
      },
      icon: {
        type: String
      },
      spin: {
        type: Boolean,
        reflect: true,
        attribute: 'spin'
      }
    };
  }

  static get styles() {
    return (0, _litElement.css)`
    
        :host{
            --red: var(--red-700);
            /* --black: #333;
            --orange: #F57C00;
            --blue: #2196F3;
            --red: #d32f2f;
            --gray: #444444;
            --green: #27ae60;
            --yellow: #f2d57e;
            --teal: #009688;
            --purple: #7E57C2;
            --brown: #795548;
            --pink: #E91E63; */

            --radius: 3px;
            --color: var(--b-btn-bgd, var(--black)) ;
            --bgdColor: var(--color);
            --hoverBgdColor: rgba(255,255,255,.1);
            --textColor: var(--b-btn-color, #fff);
            --borderColor: var(--color);
            --borderStyle: solid;
            --borderWidth: 1px;
            --padding: .4em .6em;

            display: inline-grid;
            position: relative;
            box-sizing: border-box;
            background: var(--bgdColor);
            color: var(--textColor);
            border-radius: var(--radius);
            cursor: pointer;
            transition: 
                color 160ms,
                background-color 160ms,
                border 160ms;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-size: .9rem;
            line-height: 1rem;
            font-weight: bold;
            font-family: var(--b-btn-font);

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        /* hide by default */
        @media print {
            :host {
                display: none;
            }
        }

        :host([hidden]) {
            display: none !important;
        }

        main {
            border-radius: var(--radius);
            position: relative;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: var(--padding);
            box-sizing: border-box;
            /*padding-bottom: .3em;*/ /* remove descender line to make it look more centered*/
            text-overflow: ellipsis;
            border: var(--borderStyle) var(--borderWidth) var(--borderColor);
            /* transition: 120ms; */
        }

        main > span {
            display: inline-flex;
            justify-content: center;
        }

        slot {
            display: block;
            margin-bottom: -.1em; /* remove descender line to make it look more centered*/
        }

        slot::slotted(*) {
            display: inline-block;
            margin-top: 0;
            margin-bottom: 0;
        }

        .hover {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: var(--hoverBgdColor);
            visibility: hidden;
            opacity: 0;
            /* mix-blend-mode: saturation; */
            border-radius: var(--radius);
            /* transition: 120ms; */
        }

        @media (hover) {
            :host(:hover) .hover {
                opacity: 1;
                visibility: visible;
            }
        }

        /* b-icon,
        ::slotted(b-icon) {
            vertical-align: bottom;
        } */

        b-spinner {
            opacity: 0;
            visibility: hidden;
            --size: 1em;
            margin-left: -1.35em;
            margin-right: .35em;
            transition: 120ms;
        }

        :host([spin]) b-spinner {
            opacity: 1;
            visibility: visible;
            margin-left: 0;
        }

        :host([spin]) b-icon {
            display: none;
        }

        main b-icon {
            margin-right: .35em;
            margin-left: -.15em;
        }

        :host([stacked]) {
            --padding: .3em .5em .1em .5em;
        }

        :host([stacked]) main {
            display: inline-grid;
            align-content: center;
        }

        :host([stacked]) b-icon {
            font-size: 1.2em;
            margin: 0;
        }

        :host([stacked]) slot {
            font-size: .6em;
        }

        :host([stacked]) slot::slotted(*) {
            opacity: var(--b-btn-stacked-label-opacity, .5);
        }

        :host([stacked]) slot[name="icon"] {
            font-size: 1em;
            display: contents;
        }

        :host([stacked]) slot[name="icon"]::slotted(*),
        :host([stacked]) slot[name="icon"] b-icon{
            opacity: var(--b-btn-stacked-icon-opacity, 1);
        }

        :host([stacked]) b-spinner {
            font-size: 1.2em;
            margin-right: 0;
            margin-left: -1em;
        }
        :host([stacked][spin]) b-spinner {
            margin-left: 0;
        }

        :host([block]) {
            display: block;
            text-align: center
        }

        :host([block]) main {
            display: flex;
            justify-content: center
        }

        :host(:empty) {
            --padding: .4em .5em;
        }

        :host(:empty) main b-icon {
            margin-left: 0;
            margin-right: 0;
        }

        /* offset play icon to make it appear more centered */
        :host(:empty) main b-icon[name="play"] {
			margin: 0 -.1em 0 .1em;
        }

        :host([color^="primary"])  { --color: var(--color-primary); }
        :host([color^="theme"])  { --color: var(--theme); }
        :host([color^="black"])  { --color: var(--black); }
        :host([color^="white"])  { --color: var(--white); --textColor: var(--black); }
        :host([color^="orange"]) { --color: var(--orange); }
        :host([color^="blue"])   { --color: var(--blue); }
        :host([color^="red"])    { --color: var(--red); }
        :host([color^="gray"])   { --color: var(--gray); }
        :host([color^="green"])  { --color: var(--green); }
        :host([color^="yellow"]) { --color: var(--yellow); }
        :host([color^="teal"])   { --color: var(--teal); }
        :host([color^="purple"]) { --color: var(--purple); }
        :host([color^="brown"])  { --color: var(--brown); }
        :host([color^="pink"])   { --color: var(--pink); }

        @media (hover){
        :host([color*="hover-black"]:hover)  { --color: var(--black); }
        :host([color*="hover-orange"]:hover) { --color: var(--orange); }
        :host([color*="hover-blue"]:hover)   { --color: var(--blue); }
        :host([color*="hover-red"]:hover)    { --color: var(--red); }
        :host([color*="hover-gray"]:hover)   { --color: var(--gray); }
        :host([color*="hover-green"]:hover)  { --color: var(--green); }
        :host([color*="hover-yellow"]:hover) { --color: var(--yellow); }
        :host([color*="hover-teal"]:hover)   { --color: var(--teal); }
        :host([color*="hover-purple"]:hover) { --color: var(--purple); }
        :host([color*="hover-brown"]:hover)  { --color: var(--brown); }
        :host([color*="hover-pink"]:hover)   { --color: var(--pink); }
        }

        :host([pill]) {
            --radius: 1em;
        }

        /* @media (hover) { */
        :host([outline]:not(:hover)) {
            --bgdColor: transparent;
            --textColor: var(--color);
        }
        /* } */

        /* :host([outline]:hover){
            --bgdColor: var(--color);
            --textColor: inherit;
        } */

        :host([text]),
        :host([clear]) {
            --bgdColor: transparent;
            --textColor: var(--color);
            --borderColor: transparent;
        }

        /* :host([text]) .hover,
        :host([clear]) .hover {
            display: none;
        } */

        :host([text]) {
            font-size: 1em;
            font-weight: normal;
        }

        @media (hover){
        :host([text]:hover),
        :host([clear]:hover) {
            --bgdColor: rgba(0,0,0,.05);
        }}

        :host([text].popover-open),
        :host([clear].popover-open) {
            --bgdColor: rgba(0,0,0,.05);
        }

        :host([xs]) { font-size: .6rem; }
        :host([sm]) { font-size: .8rem; }
        :host([lg]) { font-size: 1.2rem; }
        :host([xl]) { font-size: 1.4rem; }

        /* floating action btn */
        :host([fab]) {
            position: absolute;
            z-index: 100;
            box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
                        0px 6px 10px 0px rgba(0,0,0,0.14),
                        0px 1px 18px 0px rgba(0,0,0,0.12);
            bottom: 1rem;
            right: 1rem;
            font-size: 1.4em;
            width: 2em;
            height: 2em;
            --radius: 2em;
            overflow: hidden;
        }

        :host([fab]) b-spinner {
            margin-right: 0;
            margin-left: -1em;
        }

        :host([fab][spin]) b-spinner {
            margin-left: 0;
        }

        @keyframes shake {
            from,
            to {
                transform: translate3d(0, 0, 0);
            }

            15%,
            45%,
            75% {
                transform: translate3d(-.25em, 0, 0);
            }

            30%,
            60%,
            90% {
                transform: translate3d(.25em, 0, 0);
            }
        }

        :host(.shake) {
            animation-name: shake;
            animation-duration: 700ms;
            animation-fill-mode: both;
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <div class="hover"></div>
        <main>
            <span>
                <b-spinner></b-spinner>
                <slot name="icon">
                    ${this.icon ? (0, _litElement.html)`<b-icon name="${this.icon}"></b-icon>` : ''}
                </slot>
            </span>
            <slot></slot>
        </main>
    `;
  }

  constructor() {
    super();
    this.icon = '';
    this.spin = false;
  }

  firstUpdated() {
    this.addEventListener('click', () => {
      if (this.href) if (this.getAttribute('target') == '_blank') window.open(this.href);else window.location = this.href;
    }, true);
  }

  shake() {
    this.classList.add('shake');
    setTimeout(() => {
      this.classList.remove('shake');
    }, 1000);
  }

}

exports.default = BtnElement;
customElements.define('b-btn', BtnElement);
},{"lit-element":"bhxD","./spinner":"EnCN","./icon":"ncPe"}],"pV6C":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-btn-group', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: inline-flex;
        }

        ::slotted(b-btn:first-of-type:not(:last-of-type)){
            border-radius: var(--radius) 0 0 var(--radius);
        }

        ::slotted(b-btn:not(:first-of-type):not(:last-of-type)){
            border-radius: 0;
            border-left: solid 1px rgba(0,0,0,.2);
        }

        ::slotted(b-btn:last-of-type:not(:first-of-type)){
            border-radius: 0 var(--radius) var(--radius) 0;
            border-left: solid 1px rgba(0,0,0,.2);
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <slot></slot>
    `;
  }

});

var _default = customElements.get('b-btn-group');

exports.default = _default;
},{"lit-element":"bhxD"}],"eyVY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpinnerOverlayElement = void 0;

var _litElement = require("lit-element");

require("./spinner");

class SpinnerOverlayElement extends _litElement.LitElement {
  static get properties() {
    return {
      show: {
        type: Boolean,
        reflect: true
      },
      label: {
        type: String,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.show = false;
    this.label = '';
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.parentNode && this.parentNode.host && !this.parentNode.host.spinner) {
      this.host = this.parentNode.host;
      this.host.spinner = this;
    } else if (this.parentElement && !this.parentElement.spinner) {
      this.host = this.parentElement;
      this.host.spinner = this;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.host) delete this.host.spinner;
  }

  static get styles() {
    return (0, _litElement.css)`
		:host {
			--spinnerBgd: var(--b-spinner-overlay-bgd, rgba(255,255,255 ,.6));
            --spinnerColor: inherit;
            --spinnerSize: 1.6em;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1200;
            background: var(--spinnerBgd);
            color: var(--spinnerColor);
			border-radius: var(--radius);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 1;
            transition: 140ms opacity;
        }

		:host([dark]) {
			--spinnerBgd: rgba(0,0,0,.6);
			--spinnerColor: #fff;
		}

		main {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		label:not(:empty) {
			margin-left: 1em;
		}

		:host([lg]) {
			--spinnerSize: 6em;
		}

		:host([lg]) main {
			flex-direction: column;
		}

		:host([lg]) label:not(:empty) {
			text-align: center;
			font-size: 2em;
			font-weight: bold;
			margin: 1em 0 0 0;
			background: rgba(0,0,0,.7);
			color: #fff;
			padding: .25em .5em;
			border-radius: 2em;
		}

		:host(:not([show])) {
            visibility: hidden;
            opacity: 0;
        }

		b-spinner {
			font-size: var(--spinnerSize);
		}
    `;
  }

  render() {
    return (0, _litElement.html)`
		<main>
			<b-spinner></b-spinner>
			<label>${this.label}</label>
		</main>
    `;
  }

}

exports.SpinnerOverlayElement = SpinnerOverlayElement;
customElements.define('b-spinner-overlay', SpinnerOverlayElement);
},{"lit-element":"bhxD","./spinner":"EnCN"}],"EqRM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AJAX {
  constructor(method, url) {
    this.method = method;
    this.url = url;
    this.xhr = new XMLHttpRequest();
    this.on('load', this._onDone, false);
    this.on('abort', this._onAbort, false);
    this.on('error', this._onError, false);
  }

  on(eventName, cb) {
    cb = cb.bind(this);
    this.xhr.addEventListener(eventName, cb, false); // upload progress must be set on .upload

    if (eventName == 'progress') this.xhr.upload.addEventListener(eventName, cb, false);
    return this;
  }

  send() {
    this.xhr.open(this.method, this.url);
    this.xhr.setRequestHeader('x-requested-with', 'xmlhttprequest');
    this.xhr.send(...arguments);
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  _onDone(e) {
    let resp = this.xhr.responseText;

    if (this.xhr.status != 200) {
      let err = new Error(this.xhr.statusText || 'Unknown error');
      err.errorCode = this.xhr.status;
      return this.reject && this.reject(err);
    } // parse JSON if it looks like it


    if (resp && (resp[0] == '{' || resp[0] == '[')) {
      try {
        resp = JSON.parse(resp);
      } catch (err) {
        return this.reject && this.reject(err);
      }
    }

    this.resolve && this.resolve(resp);
  }

  _onAbort(e) {
    // should error be thrown instead?
    this.resolve && this.resolve();
  }

  _onError(e) {
    this.reject && this.reject();
  }

}

exports.default = AJAX;
},{}],"trgA":[function(require,module,exports) {
Object.defineProperty(File.prototype, 'ext', {
  get: function () {
    return this.name.split('.').pop();
  }
});
Object.defineProperty(File.prototype, 'nameWithoutExt', {
  get: function () {
    return this.name.split('.').shift();
  }
});
},{}],"aYTp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploaderElement = void 0;

var _litElement = require("lit-element");

var _ajax = _interopRequireDefault(require("../util/ajax.js"));

require("../util/file.ext.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UploaderElement extends _litElement.LitElement {
  static get properties() {
    return {
      url: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      accept: {
        type: String
      },
      multiple: {
        type: Boolean
      },
      placeholder: {
        type: String
      },
      files: {
        type: Array
      },
      dragging: {
        type: Boolean,
        reflect: true
      },
      uploading: {
        type: Boolean,
        reflect: true
      }
    };
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            --hoverBgd: rgba(255,236,179 ,.7);
            --uploadingBgd: rgba(238,238,238 ,.8);
            --progressBgd: var(--hoverBgd);
            --hoverColor: currentColor;
            --uploadingColor: currentColor;
            background: var(--hoverBgd);
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            z-index: 10000;
            left: 0;
            top: 0;
            visibility: hidden;
            /* pointer-events: none; */
        }

        :host([dragging]),
        :host([uploading]) {
            visibility: visible;
        }

        .placeholder {
            color: var(--hoverColor)
        }

        .progress {
            color: var(--uploadingColor)
        }

        .placeholder,
        .progress {
            position: absolute;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }
        
        :host([uploading]) {
            background: var(--uploadingBgd);
        }

        :host(:not([dragging])) .placeholder,
        :host(:not([uploading])) .progress {
            display: none;
        }

        .progress > div {
            position: relative
        }

        .progress .bar {
            position: absolute;
            height: 100%;
            left: 0;
            background: var(--progressBgd);
        }

        .choose {
            display: none;
        }
    `;
  }

  constructor() {
    super();
    this.url = '';
    this.disabled = false;
    this.accept = '';
    this.multiple = false;
    this.placeholder = 'Drop to upload';
    this.files = [];
    this._numUploading = 0;
    this._numUploaded = 0;
    this._fileProgress = 0;
    this.dragging = false;
    this.uploading = false;
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(fn => {
      this[fn] = this['_' + fn].bind(this);
    });
  }

  get progress() {
    let progress = this.files.length > 0 ? this._numUploaded * 100 : 0;
    progress += this._fileProgress;
    return progress > 0 ? progress / (this.files.length * 100) * 100 : 0;
  }

  get autoUpload() {
    return this.hasAttribute('auto-upload');
  }

  render() {
    return (0, _litElement.html)`
        <input class="choose" type="file" @click=${e => e.stopPropagation()} @change=${this._inputChange} accept=${this.accept} ?multiple=${this.multiple}>
        <div class="placeholder">${this.placeholder}</div>
        <div class="progress">
            <div class="bar" style="width:${this.progress}%"></div>
            <div>
                <b-spinner></b-spinner>
                Uploading ${this._numUploading} of ${this.files.length}
            </div>
        </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.parent) return;
    this.parent = this.parentElement || this.getRootNode().host;
    this.parent.addEventListener('dragenter', this.dragenter, true);
    this.addEventListener('dragleave', this.dragleave, true);
    this.addEventListener('dragover', this.dragover, true);
    this.addEventListener('drop', this.drop, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.parent.removeEventListener('dragenter', this.dragenter);
    this.removeEventListener('dragleave', this.dragleave);
    this.removeEventListener('dragover', this.dragover);
    this.removeEventListener('drop', this.drop);
    this.parent = null;
  }

  _acceptFile(file) {
    let doAccept = true;
    let accept = this.accept;
    if (!accept) return true;
    return accept.split(',').find(patt => {
      patt = patt.trim();
      if (patt[0] == '.') return new RegExp(patt + '$').test(file.name);else return new RegExp(patt).test(file.type);
    });
  }

  chooseFile() {
    if (this.disabled) return;
    this.shadowRoot.querySelector('.choose').click();
  } // alias


  selectFile() {
    this.chooseFile();
  }

  _drop(e) {
    e.preventDefault();
    this.dragging = false; // let files = new Files(e.dataTransfer)

    this._selectFiles(e.dataTransfer.files);
  }

  _inputChange(e) {
    this._selectFiles(e.target.files);
  }

  _selectFiles(files) {
    if (this.uploading) return;
    files = Array.from(files);
    if (!this.multiple) files = files.slice(0, 1);
    let valid = [];
    let invalid = [];
    files.forEach(file => {
      if (this._acceptFile(file)) valid.push(file);else invalid.push(file);
    });
    this.files = valid;
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        invalid: invalid.length > 0 ? invalid : false
      }
    }));

    if (this.autoUpload && this.url) {
      this.upload();
    }
  }

  _dragover(e) {
    e.preventDefault(); // needed to allow `drop` event to trigger
  }

  _dragenter(e) {
    if (this.disabled || this.hidden || !e.dataTransfer.types.includes('Files') || window.getComputedStyle(this).display == 'none') return;
    this.dragging = true;
  }

  _dragleave(e) {
    this.dragging = false;
  }

  async upload({
    url = '',
    method = 'POST',
    fileKey = 'file',
    formData = {}
  } = {}) {
    if (this.uploading) throw new Error("Already uploading");
    url = url || this.url;
    if (!url) throw new Error("Missing URL");
    this._numUploading = 0;
    this._numUploaded = 0;
    this._fileProgress = 0;
    this.uploading = true;
    let resp = [];

    for (let i in this.files) {
      let file = this.files[i];

      let _formData = new FormData();

      _formData.append(fileKey, file);

      _formData.append('totalFiles', this.files.length);

      _formData.append('fileNum', parseInt(i) + 1);

      for (let key in formData) {
        if (typeof formData[key] === 'function') _formData.append(key, formData[key](file));else _formData.append(key, formData[key]);
      }

      this._numUploading++;
      this.requestUpdate();

      try {
        let req = new _ajax.default(method, url);
        req.on('progress', e => {
          this._fileProgress = Math.round(e.loaded / e.total * 100);
          this.requestUpdate();
        });
        let uploadResp = await req.send(_formData);
        this._numUploaded++;
        this.requestUpdate();
        resp.push(uploadResp);
      } catch (e) {
        console.log(e);
        resp.push({
          error: e,
          file: file
        });
      }
    }

    this._numUploading = 0;
    this._numUploaded = 0;
    this._fileProgress = 0;
    this.files = [];
    this.uploading = false;
    this.dispatchEvent(new CustomEvent('upload-done', {
      bubbles: true,
      composed: true,
      detail: resp
    }));
    return this.multiple ? resp : resp[0];
  }

}

exports.UploaderElement = UploaderElement;
customElements.define('b-uploader', UploaderElement); // WIP for uploading directories

class Files {
  constructor(dataTransfer) {
    this.getFiles(dataTransfer);
  }

  async getFiles(dataTransfer) {
    if (dataTransfer.items[0].webkitGetAsEntry) {
      Array.from(dataTransfer.items).forEach(async item => {
        item = item.webkitGetAsEntry();

        if (item.isFile) {
          console.log('file', item);
        } else {
          console.log('dir', item);
          let items = await Files.getDirItems(item);
          console.log(items);
        }
      });
    }
  }

  static async getDirItems(item) {
    let entries = await dirEntries(item);
    let items = await Promise.all(entries.map(async entry => {
      if (entry.isFile) return await entryFile(entry);else return await Files.getDirItems(entry);
    }));
    return {
      name: item.name,
      items: items
    };
  }

}

const entryFile = entry => {
  return new Promise(resolve => {
    entry.file(file => {
      resolve(file);
    });
  });
};

const dirEntries = dir => {
  return new Promise(resolve => {
    dir.createReader().readEntries(entries => {
      resolve(entries);
    });
  });
};
},{"lit-element":"bhxD","../util/ajax.js":"EqRM","../util/file.ext.js":"trgA"}],"Yy3A":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaperElement = void 0;

var _litElement = require("lit-element");

class PaperElement extends _litElement.LitElement {
  static get properties() {
    return {
      color: {
        type: String,
        reflect: true
      },
      empty: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.color = '';
    this.empty = false;
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            box-sizing: border-box;
            display: block;
            background: var(--bgd);
            box-shadow: var(--b-paper-shadow, rgba(0,0,0,.1) 0 1px 5px);
            border: solid 1px transparent;
            --radius: var(--b-paper-radius, 3px);
            border-radius: var(--radius);
            --padding: 1em;
            padding: var(--padding);
            position: relative;
            --bgd: var(--b-paper-bgd, #fff);
            --bgdAccent: var(--bgd);
        }

        :host([hidden]) {
            display: none;
        }

        :host([overshadow]) {
            box-shadow: var(--b-paper-overshadow, rgba(0, 0, 0, 0.1) 0px 0px 20px);
        }

        :host([inline]) {
            display: inline-block;
        }

        :host([empty]) {
            background: none;
            box-shadow: none;
            border: 1px dashed rgba(0,0,0,.3);
        }

        :host([centered]) {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        :host([border]) {
            border-left: solid 5px var(--bgdAccent);
        }

        :host([outline]) {
            box-shadow: none;
            border-color: rgba(0, 0, 0, 0.1);
        }

        :host([noshadow]) {
            box-shadow: none;
        }

        :host([dense]) {
            --padding: .5em;
        }

        :host([compact]) {
            --padding: 0;
        }

        ::slotted(header:first-child) {
            border-radius: 3px 3px 0 0;
            margin: calc(var(--padding) * -1);
            margin-bottom: var(--padding);
            padding: var(--padding);
            display: flex; 
            align-items: center;
            justify-content: space-between;
        }

        ::slotted(b-icon:first-of-type) {
            /* color: var(--bgdAccent); */
            color: #000;
            opacity: .5;
            margin-right: .15em;
        }

        :host([color="gray"]) {
            --bgd: #EEEEEE;
            --bgdAccent: #BDBDBD;
            color: #212121;
        }

        :host([color="blue"]) {
            --bgd: #2196F3;
            --bgdAccent: #1565C0;
            color: #fff;
        }

        :host([color="green"]) {
            --bgd: #27ae60;
            --bgdAccent: #00695C;
            color: #fff;
        }

        :host([color="red"]) {
            --bgd: #f44336;
            --bgdAccent: #c62828;
            color: #fff;
        }

        :host([color="orange"]) {
            --bgd: #FF9800;
            --bgdAccent: #EF6C00;
            color: #fff;
        }

        :host([color="yellow"]) {
            --bgd: #FFC107;
            --bgdAccent: #F9A825;
            color: #fff;
        }

        :host([color="purple"]) {
            --bgd: #673AB7;
            --bgdAccent: #4527A0;
            color: #fff;
        }

        :host([color="postit"]) {
            color: var(--b-paper-postit-color, inherit);
            --bgd: var(--b-paper-postit-bgd, #FFF8E1);
            --bgdAccent: var(--b-paper-postit-bgd-accent, var(--orange));
        }

        :host([color="info"]) {
            color: var(--b-paper-info-color, inherit);
            --bgd: var(--b-paper-info-bgd, var(--blue-50));
            --bgdAccent: var(--b-paper-info-bgd-accent, var(--blue));
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <slot></slot>
    `;
  }

}

exports.PaperElement = PaperElement;
customElements.define('b-paper', PaperElement);
},{"lit-element":"bhxD"}],"yukA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-text', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: inline-block;
        }

        :host([block]) {
            display: block;
        }

        :host([inline]) {
            display: inline;
        }

        :host([hidden]) {
            display: none;
        }

        :host([clip]) {
            max-width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            vertical-align: text-bottom;
        }

        :host([monospace]) {
            font-family: var(--b-text-monospace, 'Source Code Pro', 'Courier New', Courier, monospace)
        }

        :host([bold]) { font-weight: bold; }
        :host([italic]) { font-style: italic; }

        :host([capitalize]) { text-transform: capitalize; }
        :host([ucase]) { text-transform: uppercase; }
        :host([lcase]) { text-transform: lowercase }

        :host([breakall]) { word-break: break-all; }

        :host([align="left"]) { text-align: left; }
        :host([align="right"]) { text-align: right; }
        :host([align="center"]) { text-align: center; }
        :host([align="justify"]) { text-align: justify; }

        :host([xs]) { font-size: .65em; line-height: 1.1em; }
        :host([sm]) { font-size: .8em; line-height: 1.1em; }
        :host([md]) { font-size: 1.2em; line-height: 1.1em; }
        :host([lg]) { font-size: 1.4em; line-height: 1.1em; }
        :host([xl]) { font-size: 1.7em; line-height: 1.1em; }
        :host([xxl]) { font-size: 2em; line-height: 1.1em; }

        :host([tone="muted"]), :host([muted]) { color: rgba(var(--theme-rgb, 0,0,0),.4); }
        :host([tone="theme"]) { color: var(--theme); }
        :host([tone="critical"]) { color: var(--b-text-tone-critical, var(--red-A400, red)); }
        :host([tone="warning"]) { color: var(--b-text-tone-warning, var(--orange, orange)); }
        :host([tone="info"]) { color: var(--b-text-tone-info, var(--blue, blue)); }
        :host([tone="good"]) { color: var(--b-text-tone-good, var(--green, blue)); }

        :host([link]),
        :host([href]) {
            cursor: default;
        }

        :host([nopointer]) {
            pointer-events: none;
        }

        :host([link].popover-open),
        :host([href]){
            color: var(--b-text-link-color, var(--theme, var(--blue, blue)));
        }

        @media (hover){
            :host([link]:hover){
                color: var(--b-text-link-color, var(--theme, var(--blue, blue)));
            }

            :host([href]:hover) {
                text-decoration: underline;
            }
        }

        :host([sup]) {
            vertical-align: super;
            margin-top: -1em;
        }

        :host([sub]) {
            vertical-align: sub;
            margin-bottom: -1em;
        }

        ::slotted(b-icon) {
            vertical-align: bottom;
        }
    `;
  }

  firstUpdated() {
    this.addEventListener('click', this.onClick);
    if (this.hasAttribute('clip') && !this.hasAttribute('title')) this.title = this.innerText;
  }

  onClick() {
    let href = this.getAttribute('href');

    if (href) {
      if (href.match(/@/)) href = 'mailto:' + href;
      window.open(href);
    }
  }

  render() {
    return (0, _litElement.html)`
        <slot></slot>
    `;
  }

});

var _default = customElements.get('b-text');

exports.default = _default;
},{"lit-element":"bhxD"}],"BALQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-grid', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: max-content;
            align-content: flex-start;
            gap: 1em;
            min-width: 0;
        }

        ::slotted(*) {
            min-width: 0;
            min-height: 0;
        }

        /* standard/simple colums */
        :host([cols="1"]) { grid-template-columns: 1fr; }
        :host([cols="2"]) { grid-template-columns: repeat(2, 1fr); }
        :host([cols="3"]) { grid-template-columns: repeat(3, 1fr); }
        :host([cols="4"]) { grid-template-columns: repeat(4, 1fr); }
        :host([cols="5"]) { grid-template-columns: repeat(5, 1fr); }
        :host([cols="6"]) { grid-template-columns: repeat(6, 1fr); }
        :host([cols="7"]) { grid-template-columns: repeat(7, 1fr); }
        :host([cols="8"]) { grid-template-columns: repeat(8, 1fr); }

        /* two-thirds, one-third */
        :host([cols="2,1"]) { grid-template-columns: 2fr 1fr; }
        :host([cols="1,2"]) { grid-template-columns: 1fr 2fr; }

        /* half, quarter, quarter */
        :host([cols="2,1,1"]) { grid-template-columns: 2fr 1fr 1fr; }
        :host([cols="1,1,2"]) { grid-template-columns: 1fr 1fr 2fr; }

        :host([cols="auto,1"]) { grid-template-columns: auto 1fr; }
        :host([cols="1,auto"]) { grid-template-columns: auto 1fr; }

        :host([rows="auto,1"]) { grid-template-rows: auto 1fr; }
        :host([rows="1,auto"]) { grid-template-rows: auto 1fr; }

        @media (max-width:699px){
            :host([cols-mobile="1"]) { grid-template-columns: 1fr; }
            :host([cols-mobile="2"]) { grid-template-columns: repeat(2, 1fr); }
            :host([cols-mobile="3"]) { grid-template-columns: repeat(3, 1fr); }
            :host([cols-mobile="2,1"]) { grid-template-columns: 2fr 1fr; }
            :host([cols-mobile="1,2"]) { grid-template-columns: 1fr 2fr; }

            :host([cols-mobile]) ::slotted([colspan]) {grid-column: 1/-1;}

            :host([rows-mobile="auto,1"]) { grid-template-rows: auto 1fr; }
            :host([rows-mobile="1,auto"]) { grid-template-rows: auto 1fr; }
        }

        :host([gap="0"]), :host([gap="none"]) { gap: 0; }
        :host([gap=".5"]) { gap: .5em; }
        :host([gap="1"]) { gap: 1em; }
        :host([gap="2"]) { gap: 2em; }

        :host([align="start"]) { justify-items: flex-start; }
        :host([align="center"]) { justify-items: center; }
        :host([align="end"]) { justify-items: flex-end; }

        ::slotted([colspan]) { grid-column: 1/-1; }
        ::slotted([colspan="2"]) { grid-column: span 2; }
        ::slotted([colspan="3"]) { grid-column: span 3; }
        ::slotted([colspan="4"]) { grid-column: span 4; }
        ::slotted([colspan="5"]) { grid-column: span 5; }
        ::slotted([colspan="6"]) { grid-column: span 6; }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <slot></slot>
    `;
  }

});

var _default = customElements.get('b-grid');

exports.default = _default;
},{"lit-element":"bhxD"}],"inC5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

/*
    TODO:
    - add sliding animation?
*/
customElements.define('b-carousel', class extends _litElement.LitElement {
  static get properties() {
    return {
      views: {
        type: Array
      }
    };
  }

  constructor() {
    super();
    this.views = [];
    this.active = 0;
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: block;
            position:relative;
            --dotSize: 14px;
            --dotPadding: 4px;
            --dotMargin: 5px;
            --dotExpand: scale(1.4);
        }

        [hidden] {
            display: none;
        }

        nav {
            display: flex;
            margin: 1em 0;
            justify-content: center;
            align-items: center;
        }

        nav > div {
            width: var(--dotSize);
            height: var(--dotSize);
            margin: var(--dotMargin);
            padding: var(--dotPadding);
            cursor: pointer;
        }

        nav > div > div {
            height: 100%;
            width: 100%;
            border-radius: 20px;
            background: #ccc;
            transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }

        nav > div:hover > div {
            transform: var(--dotExpand);
        }

        nav > div[active] > div {
            background: #2196F3;
        }
        
        @media print {
            nav {
                display: none;
            }

            ::slotted(*) {
                display: block !important
            }
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <slot></slot>
        <nav ?hidden=${this.views.length <= 1}>${this.views.map((v, i) => (0, _litElement.html)`
            <div i=${i} ?active=${i == this.active} @click=${this.navTo}>
                <div></div>
            </div>
        `)}</nav>
    `;
  }

  get active() {
    return this.__active;
  }

  set active(val) {
    this.__active = val;
    this.views.forEach(v => v.hidden = true);
    if (!this.views[val]) return;
    this.views[val].hidden = false;
    this.update();
  }

  navTo(e) {
    let i = e.currentTarget.getAttribute('i');
    this.active = i;
  }

  firstUpdated() {
    let slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', e => {
      this.views = slot.assignedElements();
      this.active = 0;
    });
  }

});

var _default = customElements.get('b-carousel');

exports.default = _default;
},{"lit-element":"bhxD"}],"dZYI":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.dayjs=e()}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t(e,S,v),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});

},{}],"oxIj":[function(require,module,exports) {
var define;
!function(t,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s():"function"==typeof define&&define.amd?define(s):t.dayjs_plugin_duration=s()}(this,function(){"use strict";var t,s,n=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,i={years:31536e6,months:2592e6,days:864e5,hours:36e5,minutes:6e4,seconds:1e3,milliseconds:1,weeks:6048e5},e=function(t){return t instanceof u},r=function(t,s,n){return new u(t,n,s.$l)},o=function(t){return s.p(t)+"s"},u=function(){function s(t,s,e){var u=this;if(this.$d={},this.$l=e,s)return r(t*i[o(s)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach(function(s){u.$d[o(s)]=t[s]}),this.calMilliseconds(),this;if("string"==typeof t){var h=t.match(n);if(h)return this.$d.years=h[2],this.$d.months=h[3],this.$d.weeks=h[4],this.$d.days=h[5],this.$d.hours=h[6],this.$d.minutes=h[7],this.$d.seconds=h[8],this.calMilliseconds(),this}return this}var u=s.prototype;return u.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce(function(s,n){return s+(t.$d[n]||0)*i[n]},0)},u.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=Math.floor(t/31536e6),t%=31536e6,this.$d.months=Math.floor(t/2592e6),t%=2592e6,this.$d.days=Math.floor(t/864e5),t%=864e5,this.$d.hours=Math.floor(t/36e5),t%=36e5,this.$d.minutes=Math.floor(t/6e4),t%=6e4,this.$d.seconds=Math.floor(t/1e3),t%=1e3,this.$d.milliseconds=t},u.toISOString=function(){var t=this.$d.years?this.$d.years+"Y":"",s=this.$d.months?this.$d.months+"M":"",n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=n?n+"D":"",e=this.$d.hours?this.$d.hours+"H":"",r=this.$d.minutes?this.$d.minutes+"M":"",o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var u=o?o+"S":"",h="P"+t+s+i+(e||r||u?"T":"")+e+r+u;return"P"===h?"P0D":h},u.toJSON=function(){return this.toISOString()},u.as=function(t){return this.$ms/i[o(t)]},u.get=function(t){var s=this.$ms,n=o(t);return"milliseconds"===n?s%=1e3:s="weeks"===n?Math.floor(s/i[n]):this.$d[n],s},u.add=function(t,s,n){var u;return u=s?t*i[o(s)]:e(t)?t.$ms:r(t,this).$ms,r(this.$ms+u*(n?-1:1),this)},u.subtract=function(t,s){return this.add(t,s,!0)},u.locale=function(t){var s=this.clone();return s.$l=t,s},u.clone=function(){return r(this.$ms,this)},u.humanize=function(s){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!s)},u.milliseconds=function(){return this.get("milliseconds")},u.asMilliseconds=function(){return this.as("milliseconds")},u.seconds=function(){return this.get("seconds")},u.asSeconds=function(){return this.as("seconds")},u.minutes=function(){return this.get("minutes")},u.asMinutes=function(){return this.as("minutes")},u.hours=function(){return this.get("hours")},u.asHours=function(){return this.as("hours")},u.days=function(){return this.get("days")},u.asDays=function(){return this.as("days")},u.weeks=function(){return this.get("weeks")},u.asWeeks=function(){return this.as("weeks")},u.months=function(){return this.get("months")},u.asMonths=function(){return this.as("months")},u.years=function(){return this.get("years")},u.asYears=function(){return this.as("years")},s}();return function(n,i,o){t=o,s=o().$utils(),o.duration=function(t,s){var n=o.locale();return r(t,{$l:n},s)},o.isDuration=e;var u=i.prototype.add,h=i.prototype.subtract;i.prototype.add=function(t,s){return e(t)&&(t=t.asMilliseconds()),u.bind(this)(t,s)},i.prototype.subtract=function(t,s){return e(t)&&(t=t.asMilliseconds()),h.bind(this)(t,s)}}});

},{}],"uEYO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerElement = void 0;

var _litElement = require("lit-element");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _duration = _interopRequireDefault(require("dayjs/plugin/duration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_duration.default);

class TimerElement extends _litElement.LitElement {
  static get properties() {
    return {
      time: {
        type: Number
      },
      ms: {
        type: Boolean
      },
      short: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.time = 0;
    this.ms = false;
    this.short = false;
    this.running = this.hasAttribute('running') ? true : false;
  }

  get time() {
    return this.__time;
  }

  set time(val) {
    const oldVal = this.__time;
    if (!this.dur) this.dur = _dayjs.default.duration(val);else {
      let delta = val - oldVal;
      this.dur = this.dur.add(delta);
    }
    if (val == 0) this.setAttribute('zero', '');else this.removeAttribute('zero');
    this.__time = val;
    this.requestUpdate('time', oldVal);
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: inline-flex;
			--zeroColor: rgba(0,0,0,.5);
        }

		.hours[value="0"],
		.hours[value="00"] {
			display: none;
		}

		.hours[value="0"] + span,
		.hours[value="00"] + span {
			display: none;
		}

		:host([short]) .hours[value="00"] ~ .minutes[value="0"],
		:host([short]) .hours[value="00"] ~ .minutes[value="00"] {
			display: none;
		}

		:host([short]) .hours[value="00"] ~ .minutes[value="0"] + span,
		:host([short]) .hours[value="00"] ~ .minutes[value="00"] + span {
			display: none;
		}

		/* span, */
		/* unit[value="00"] {
			color: var(--zeroColor);
		} */
    `;
  }

  render() {
    return (0, _litElement.html)`
		<unit class="hours" value="${this.hours}">${this.hours}</unit>
		<span>:</span>
		<unit class="minutes" value="${this.minutes}">${this.minutes}</unit>
		<span>:</span>
		<unit class="seconds" value="${this.seconds}">${this.seconds}</unit>
		${this.ms ? (0, _litElement.html)`<unit class="ms">.${this.milliseconds}</unit>` : ''}
    `;
  }

  get running() {
    return this._lastTS != null;
  }

  set running(run) {
    if (!run) {
      this.removeAttribute('running');
      this._lastTS = null;
      clearInterval(this._progressInterval);
    } else if (!this.running) {
      this._lastTS = new Date().getTime();
      this._progressInterval = setInterval(this._progress.bind(this), 100);
      this.setAttribute('running', '');
    }
  }

  start() {
    this.running = true;
  }

  stop() {
    this.running = false;
  }

  _progress() {
    let ts = new Date().getTime();
    let elapsedTime = ts - this._lastTS;
    this._lastTS = ts;
    this.time += elapsedTime;
  }

  get hours() {
    return String(this.dur.hours()).padStart(2, '0');
  }

  get minutes() {
    return String(this.dur.minutes()).padStart(2, '0');
  }

  get seconds() {
    return String(this.dur.seconds()).padStart(2, '0');
  }

  get milliseconds() {
    return Math.round(this.dur.milliseconds() / 100);
  }

  get format() {
    let str = [this.hours, this.minutes, this.seconds].join(':');
    if (this.ms) str += '.' + this.milliseconds;
    return str;
  }

}

exports.TimerElement = TimerElement;
customElements.define('b-timer', TimerElement);
},{"lit-element":"bhxD","dayjs":"dZYI","dayjs/plugin/duration":"oxIj"}],"dUnZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

/*
    https://undraw.co/illustrations
*/
class EmptyState extends _litElement.LitElement {
  static get properties() {
    return {
      value: {
        type: String
      }
    };
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: var(--b-empty-state-color, rgba(55,71,79,.2));
            font-size: 2em;
            text-align: center;
            padding: 1em;
            box-sizing: border-box;
            line-height: 1.2em;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }

        :host([ondark]) {
            color: rgba(255,255,255,.1);
        }

        :host([static]) {
            position: static;
            height: auto;
            min-height: 1em;
        }

        :host([hidden]) {
            display: none;
        }

        :host([xs]) { font-size: .8em; }
        :host([sm]) { font-size: 1em; }
        :host([md]) { font-size: 1.4em; }
        :host([lg]) { font-size: 3em; }

        :host([must-be="first"]:not(:first-child)) {
            display: none;
        }

        :host([must-be="last"]:not(:last-child)) {
            display: none;
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <slot>${this.value}</slot>
    `;
  }

}

exports.default = EmptyState;
customElements.define('b-empty-state', EmptyState);
},{"lit-element":"bhxD"}],"DcCw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

class Label extends _litElement.LitElement {
  static get properties() {
    return {
      'filled': {
        type: String,
        reflect: true
      },
      'badge': {
        type: String,
        reflect: true
      },
      'outline': {
        type: String,
        reflect: true
      }
    };
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            position: relative;
            z-index: 1;
            display: inline-block;
            text-transform: uppercase;
            color: var(--b-label-color, rgba(0,0,0,.33));
            font-weight: bold;
            font-size: 1rem;
            line-height: 1rem;
            --dividerThickness: 1px;
            vertical-align: middle;
            border-radius: var(--radius, 0);

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        :host([text]) {
            font-weight: normal;
            text-transform: none;
        }

        :host([hidden]) {
            display: none !important;
        }

        :host([filled]),
        :host([badge]),
        :host([outline]) {
            --bgd: #aaa;
            --color: #fff;
            padding: 0.15em 0.3em 0.1em;
            --radius: 3px;
            font-size: .8rem;
            text-transform: none;
            background: var(--bgd);
            color: var(--color);
        }

        :host([xs]) { font-size: .6rem; line-height: .6rem; }
        :host([sm]) { font-size: .8rem; line-height: .8rem; }
        :host([lg]) { font-size: 1.2rem; line-height: 1.2rem; }
        :host([xl]) { font-size: 1.4rem; line-height: 1.4rem; }
        :host([xxl]) { font-size: 1.8rem; line-height: 1.8rem; }

        :host([outline]) {
            background: none;
            border: solid 1px;
            border-color: var(--bgd);
            --color: var(--bgd);
        }

        :host([badge]) {
            --radius: 30px;
            /* padding-left: .6em;
            padding-right: .6em; */
            padding-right: .45em;
            padding-left: .45em;
            min-width: .3em;
            text-align: center;
            min-height: 1em;
        }

        :host([dot]) {
            height: 6px;
            width: 6px;
            min-width: 0;
            min-height: 0;
            padding: 0;
        }

        :host([filled="clear"]), :host([badge="black"]) { --bgd: transparent; --color: inherit; }
        :host([filled="black"]), :host([badge="black"]) { --bgd: var(--theme-color, #333); }
        :host([filled="white"]), :host([badge="white"]) { --bgd: var(--theme-bgd, #fff); --color: var(--theme-color, #333); }
        :host([filled="gray"]), :host([badge="gray"]) { --bgd: #ddd; --color: #777; }
        :host([filled="theme"]), :host([badge="theme"]) { --bgd: var(--theme); }
        :host([filled="blue"]), :host([badge="blue"]) { --bgd: var(--blue); }
        :host([filled="red"]), :host([badge="red"]) { --bgd: var(--red); }
        :host([filled="orange"]), :host([badge="orange"]) { --bgd: var(--orange); }
        :host([filled="green"]), :host([badge="green"]) { --bgd: var(--green); }
        :host([filled="pink"]), :host([badge="pink"]) { --bgd: var(--pink); }
        :host([filled="purple"]), :host([badge="purple"]) { --bgd: var(--deep-purple); }

        :host([filled="text"]), :host([badge="text"]) { 
            --bgd: var(--theme-color, #333);
            --color: var(--theme-bgd, #fff);
        }
        :host([filled="accent"]), :host([badge="accent"]) {
            --bgd: rgba(var(--theme-rgb, 0,0,0), .2);
            --color: var(--theme-color, #333);
        }
        

        :host([outline="clear"]) { --bgd: transparent; --color: inherit; }
        :host([outline="black"]) { --bgd: #333; }
        :host([outline="gray"]) { --bgd: #ddd; }
        :host([outline="theme"]) { --bgd: var(--theme); }
        :host([outline="blue"]) { --bgd: var(--blue); }
        :host([outline="red"]) { --bgd: var(--red); }
        :host([outline="orange"]) { --bgd: var(--orange); }
        :host([outline="green"]) { --bgd: var(--green); }
        :host([outline="pink"]) { --bgd: var(--pink); }
        :host([outline="purple"]) { --bgd: var(--deep-purple); }

        .bgd {
            display: none;
            background: var(--bgd);
            opacity: .2;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: var(--radius);
        }

        :host([muted]) {
            background: none;
            --color: var(--bgd);
        }

        :host([muted]) .bgd {
            display: block;
        }

        /* causes unwanted wrap on chrome */
        /* slot {
            display: flex;
        } */

        b-hr {
            display: none;
            grid-column: initial; /* remove default 100% width */
            margin: 0;
            width: auto;
            height: var(--dividerThickness);
        }

        b-hr:first-child {
            margin-right: 1em;
        }

        b-hr:last-child {
            margin-left: 1em;
        }

        :host([divider]) {
            display: grid;
            align-items: center;
            grid-template-columns: 0 auto 1fr;
        }

        :host([divider]) b-hr {
            display: block;
        }

        :host([divider="center"]) {
            grid-template-columns: 1fr auto 1fr;
        }

        :host([divider="right"]) {
            grid-template-columns: 1fr auto 0;
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <div class="bgd"></div>
        <b-hr></b-hr>
        <slot></slot>
        <b-hr></b-hr>
    `;
  }

}

exports.default = Label;
customElements.define('b-label', Label);
},{"lit-element":"bhxD"}],"jV4C":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-ribbon', class extends _litElement.LitElement {
  static get properties() {
    return {
      pos: {
        type: String,
        reflect: true
      },
      value: {
        type: String,
        reflect: true
      },
      shadow: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.pos = 'left';
    this.value = '';
    this.shadow = true;
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            --width: 4em;
            --height: 1em;
            --padding: .25em;
            --color: var(--blue);
            --shadow: none;
            --offset: -2px;

            line-height: 1em;
            overflow: hidden;
            position: absolute;
            left: var(--offset);
            top: var(--offset);
            padding: 0 calc(var(--width) / 2) calc(var(--width) / 2) 0;
            pointer-events: none;

            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
        }

        :host([hidden]){ display: none; }
        
        :host([shadow]) {
            --shadow: rgba(0,0,0,.5) 0 10px 5px -10px;
        }

        :host([pos="right"]) {
            left: auto;
            right: var(--offset);
            padding: 0 0 calc(var(--width) / 2) calc(var(--width) / 2);
        }

        .wrap {
            /* background: yellow; */
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--width);
            height: var(--width);
        }

        .inner {
            width: var(--width);
            max-height: var(--height);
            overflow: hidden;
        }

        .ribbon {
            pointer-events:all;
            transform-origin: center center;
            position: relative;
            padding: var(--padding) calc(var(--width) / 1.5);
            width: var(--width);
            height: var(--height);
            background: var(--color);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow);
            text-align: center;
            transform: rotateZ(-45deg);
            backface-visibility: hidden;
            z-index: 10;
            font-weight: bold;
        }

        :host([pos="right"]) .ribbon {
            transform: rotateZ(45deg);
        }

    `;
  }

  render() {
    return (0, _litElement.html)`
        <div class="wrap">
            <div class="ribbon">
                <div class="inner">
                    <slot>${this.value}</slot>
                </div>
            </div>
        </div>
    `;
  }

});

var _default = customElements.get('b-ribbon');

exports.default = _default;
},{"lit-element":"bhxD"}],"IOAQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-hr', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            --bgd: var(--b-hr-bgd, rgba(0,0,0,.1));

            display: block;
            margin: 1em auto;
            height: 1px;
            width: 100%;
            background: var(--bgd);
            
            /* full width */
            grid-column: 1/-1;
        }

        :host([thick]) {
            height: 4px;
        }

        :host([short]) {
            width: 180px;
            max-width: 100%;
        }

        :host([vert]) {
            display: inline-block;
            vertical-align: middle;
            min-height: 1em;
            height: auto;
            width: 1px;
            margin: 0 .5em;
            align-self: stretch;
        }

        :host([vert][thick]) {
            height: auto;
            width: 4px;
        }
    `;
  } // dont support slotted content yet


  render() {
    return (0, _litElement.html)``;
  }

});

var _default = customElements.get('b-hr');

exports.default = _default;
},{"lit-element":"bhxD"}],"VANQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

/*
    DEPRECATED
*/
customElements.define('b-sub', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: inline;
            position:relative;
            color: var(--b-sub-color, rgba(0,0,0,.4));
            font-size: .8em;
            font-weight: normal;
        }

        :host([ondark]) {
            color: rgba(255,255,255,.4);
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <slot></slot>
    `;
  }

});

var _default = customElements.get('b-sub');

exports.default = _default;
},{"lit-element":"bhxD"}],"VfwF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('b-ts', class extends _litElement.LitElement {
  static get properties() {
    return {
      format: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.format = 'relative';
    this._extraTitle = this.getAttribute('title') || '';
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: inline-block;
            white-space: nowrap;
        }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.format == 'relative') this._updateInterval = setInterval(this.update.bind(this), 60 * 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._updateInterval);
  }

  get date() {
    return this.__date;
  }

  set date(date) {
    if (typeof date === 'string') date = (0, _dayjs.default)(date);
    this.__date = date;
    if (date) this.title = this._extraTitle + this.date.format('LT l');
    this.requestUpdate();
  }

  get displayTime() {
    if (!this.date) return '';
    if (this.format == 'relative' && this.date.fromNow) return this.date.fromNow();
    if (this.format == 'calendar' && this.date.calendarDate) return this.date.calendarDate();else return this.date.format(this.format);
  }

  render() {
    return (0, _litElement.html)`
        ${this.displayTime}
    `;
  }

});

var _default = customElements.get('b-ts');

exports.default = _default;
},{"lit-element":"bhxD","dayjs":"dZYI"}],"DaYz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DefaultBgd = exports.BgdColors = void 0;
const InvalidImages = [];
const BgdColors = ['#2196F3', '#f44336', '#673AB7', '#00BCD4', '#009688', '#4CAF50', '#FFC107', '#FF5722', '#795548', '#607D8B'];
exports.BgdColors = BgdColors;
const DefaultBgd = '#aaa';
exports.DefaultBgd = DefaultBgd;

class AvatarElement extends HTMLElement {
  static get observedAttributes() {
    return ['initials', 'bgd', 'color', 'size', 'url', 'gravatar'];
  }

  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    let aspectRatio = this.getAttribute('cover') == 'false' ? '' : 'xMinYMin slice';
    temp.innerHTML =
    /*html*/
    `<style>
			:host {
				--bgd: ${this.bgd};
				--bgdDefault: transparent;
				--color: ${this.color};
				height: var(--size, 1em);
			    width: var(--size, 1em);
			    display: inline-block;
			    vertical-align: middle;
				position: relative;
				border-radius: var(--b-avatar-radius, 50%);

				-webkit-touch-callout: none; /* iOS Safari */
				-webkit-user-select: none; /* Safari */
				-khtml-user-select: none; /* Konqueror HTML */
				-moz-user-select: none; /* Firefox */
				-ms-user-select: none; /* Internet Explorer/Edge */
				user-select: none; 
			}

			:host([shadow]) svg {
				box-shadow: rgba(0,0,0,.1) 0 1px 3px;
			}

			svg {
				border-radius: var(--b-avatar-radius, 50%);
			}
			
			svg rect {
				fill: var(--bgd);
			}
			
			svg text {
				fill: var(--color);
				font-size: var(--b-avatar-font-size, 60px);
			}
			
			:host([nobgd]) svg.imgloaded rect {
				fill: transparent;
			}
			
			svg.imgloaded text {
				visibility: hidden;
			}
			
			:host([imgicon]) svg image {
				width: 70%;
				height: 70%;
				x: 15%;
				y: 15%;
			}
			
			svg.imgloading rect {
				fill: #eee;
			}

			svg.imgloaded rect {
				fill: var(--bgdDefault);
			}
			</style>
			
		<svg class="imgloading" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="100%" height="100%" rx="0" ry="0"></rect>
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">${this.initials}</text>
			<image xlink:href="" x="0" y="0" width="100%" height="100%"
				preserveAspectRatio="${aspectRatio}"
				onload="this.parentElement.classList.add('imgloaded')">
        </svg>
		<slot></slot>`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
    this.img = this.shadowRoot.querySelector('image');
    this.img.addEventListener('error', e => {
      this.img.style.display = 'none';
      this.img.parentElement.classList.remove('imgloading');
      let src = this.img.getAttribute('xlink:href');
      if (src) InvalidImages.push(src);
    });
  }

  connectedCallback() {
    // NOTE: https://stackoverflow.com/a/43837330/484780
    // this.style.display = 'inline-block'
    // this.style.verticalAlign = 'middle'
    // this.style.lineHeight = '0'
    if (this.hasAttribute('gravatar')) this.gravatar = this.getAttr('gravatar');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
  }

  getAttr(name, defaultVal) {
    return this.hasAttribute(name) ? this.getAttribute(name) || defaultVal : defaultVal;
  }

  get initials() {
    return this.getAttr('initials', '-');
  }

  set initials(str) {
    this.shadowRoot.querySelector('text').innerHTML = str || '-';
    this.bgd = this.bgd; // update bgd to match initial change (wont change if user specified the bgd attr)
  }

  get bgd() {
    let color = this.getAttr('bgd');

    if (!color) {
      let initials = this.getAttr('initials', '').toLowerCase();

      if (!initials) {
        color = DefaultBgd;
      } else {
        let num = 0;

        for (let char of initials) {
          num += char.charCodeAt(0) - 97;
        }

        color = BgdColors[num % BgdColors.length];
      }
    }

    return color;
  }

  set bgd(color) {
    // if( this.style.getPropertyValue('--bgd') ) return
    this.style.setProperty('--bgd', color); // this.shadowRoot.querySelector('rect').setAttribute('fill', color||this.bgd)
  }

  get color() {
    return this.getAttr('color', '#fff');
  }

  set color(color) {
    this.style.setProperty('--color', color); // this.shadowRoot.querySelector('text').setAttribute('fill', color||this.color)
  }

  get size() {
    return this.getAttr('size', 24);
  }

  set size(size) {
    this.style.width = size + 'px';
    this.style.height = size + 'px'; // reload the gravatar to get the correct size

    this.gravatar = this.getAttr('gravatar');
  }

  set url(url) {
    this.img.parentElement.classList.remove('imgloaded');
    this.img.style.display = ''; // dont try to load an image we already know fails

    if (!url || InvalidImages.includes(url)) {
      this.img.style.display = 'none';
      this.img.setAttribute('xlink:href', '');
      return;
    }

    if (url) {
      this.img.parentElement.classList.add('imgloading');
      this.img.setAttribute('xlink:href', url);
    }
  }

  set gravatar(guid) {
    // wait until el is connected so we can determine the height of the avatar
    if (!this.isConnected || !guid) return; // FIXME: accessing offsetHeight is a perf hit...as it requires a reflow
    // https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/

    let size = this.offsetHeight * 2;
    if (size < 80) size = 80;
    this.url = guid ? `//gravatar.com/avatar/${guid}?d=404&s=${size}` : '';
  }

}

customElements.define('b-avatar', AvatarElement);

var _default = customElements.get('b-avatar');

exports.default = _default;
},{}],"v5wz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-code', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`

        :host {
            background: var(--theme-bgd-accent, #ccc);
            border-radius: 3px;
            color: initial;
            padding: 0 .3em;
        }

        code {
            color: var(--theme-color, inherit);
        }

        :host([block]) {
            display: block;
            font-family: monospace;
            padding: 1em;
            overflow-x: auto;
        }

        :host([block]) code {
            white-space: pre-wrap;
        }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.textContent = this.textContent.trim();
  }

  render() {
    return (0, _litElement.html)`
        <code><slot></slot></code>
    `;
  }

});

var _default = customElements.get('b-code');

exports.default = _default;
},{"lit-element":"bhxD"}],"bpDM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

// https://embedresponsively.com/ 
customElements.define('b-embed', class Embed extends _litElement.LitElement {
  static get properties() {
    return {
      url: {
        type: String,
        reflect: true
      }
    };
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: block;
            position:relative;
        }

        main {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            max-width: 100%;
        }

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <main>
            <iframe src='${this.formattedURL}' 
                    frameborder='0' 
                    allowfullscreen>
            </iframe>
        </main>
    `;
  }

  get formattedURL() {
    if (!this.url) return '';
    let match = Embed.isYoutube(this.url);

    if (match) {
      return 'https://www.youtube.com/embed/' + match[1];
    }

    return this.url;
  }

  static isYoutube(url) {
    return url.match(/(?:youtu\.be|youtube\.com)\/(?:watch\?v\=)?(?:embed\/)?(.+)/);
  }

});

var _default = customElements.get('b-embed');

exports.default = _default;
},{"lit-element":"bhxD"}],"FgfO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// https://blog.roomanna.com/09-24-2011/dynamically-coloring-a-favicon
let favicon;

var _default = (color = false, method = "lighten") => {
  let icon = document.querySelector("link[rel='icon']");

  if (!favicon) {
    ;
    favicon = icon.cloneNode();
  }

  if (!color) {
    icon.type = favicon.type;
    icon.href = favicon.href;
    return;
  }

  function onImageLoaded() {
    let canvas = document.createElement("canvas");
    let size = img.naturalHeight;
    let radius = size / 2;
    canvas.width = size;
    canvas.height = size;
    let context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    context.globalCompositeOperation = method;
    context.fillStyle = color;
    context.arc(radius, radius, radius, 0, 2 * Math.PI, false);
    context.fill();
    icon.type = "image/x-icon";
    icon.href = canvas.toDataURL();
  }

  ;
  var img = document.createElement("img");
  img.addEventListener("load", onImageLoaded);
  img.src = favicon.href;
};

exports.default = _default;
},{}],"la8o":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorScheme = exports.default = void 0;

var _colorizeFavicon = _interopRequireDefault(require("./colorize-favicon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UA = navigator.userAgent;
const device = {
  get is_ios() {
    return device.isiOS;
  },

  // DEPRECATED
  get is_android() {
    return device.isAndroid;
  },

  // DEPRECATED
  get is_mobile() {
    return device.isMobile;
  },

  // DEPRECATED
  get isWindows() {
    return /Win/.test(UA);
  },

  get isMac() {
    return /Mac/.test(UA);
  },

  get isLinux() {
    return /Linux/.test(UA);
  },

  get minScreenSize() {
    return window.outerWidth < window.outerHeight ? window.outerWidth : window.outerHeight;
  },

  get isiOS() {
    return /iPad|iPhone|iPod/.test(UA) || device.isMac && navigator.standalone !== undefined; // iPadOS 13+
  },

  get isiPad() {
    return /iPad/.test(UA) || !device.isiOS && device.isMac && navigator.standalone !== undefined;
  },

  get isAndroid() {
    return /android/i.test(UA);
  },

  get isTouch() {
    return 'ontouchstart' in window;
  },

  get isMobile() {
    return device.isiOS || device.isAndroid;
  },

  // https://developer.chrome.com/multidevice/user-agent
  get isiOSChrome() {
    return /CriOS/.test(UA);
  },

  get isElectron() {
    return /Electron/.test(UA);
  },

  get electronVersion() {
    let matches = UA.match(/Electron\/([\d\.]+) /);
    return matches ? matches[1] : 0;
  },

  get isChromeInstalledApp() {
    return this.isInstalled && /Chrome/.test(UA);
  },

  get isInstalled() {
    return navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
  },

  // alias
  get isStandalone() {
    return device.isInstalled;
  },

  applyClasses() {
    const html = document.documentElement;
    if (!html) return;
    html.classList.toggle('mobile', device.isMobile);
    html.classList.toggle('ios', device.isiOS);
    html.classList.toggle('electron', device.isElectron);
    html.classList.toggle('android', device.isAndroid);
    html.classList.toggle('mac', device.isMac);
    html.classList.toggle('windows', device.isWindows);
    html.classList.toggle('installed', device.isInstalled);
  }

};
var _default = device; // https://medium.com/@jonas_duri/enable-dark-mode-with-css-variables-and-javascript-today-66cedd3d7845

exports.default = _default;
const colorScheme = {
  get isDarkMode() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  },

  get isLightMode() {
    return window.matchMedia("(prefers-color-scheme: light)").matches;
  },

  get isUnset() {
    return window.matchMedia("(prefers-color-scheme: no-preference)").matches;
  },

  get isSupported() {
    return this.isDarkMode || this.isLightMode || this.isUnset;
  },

  onChange(cb) {
    // first time, setup watchers
    if (!this._watchers) {
      this._watchers = new Map();
      window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && this._dispatchChange('dark'));
      window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && this._dispatchChange('light'));
    }

    this._watchers.set(cb, cb);
  },

  _dispatchChange(mode) {
    this._watchers.forEach(cb => {
      cb(mode);
    });
  },

  apply({
    colorizeFaviconComposition = ''
  } = {}) {
    localStorage.setItem('theme-colorize-icon', colorizeFaviconComposition || localStorage.getItem('theme-colorize-icon') || 'lighten');
    this.onChange(this.setTheme);
    this.setTheme();
    this.setAccent();
  },

  get theme() {
    return localStorage.getItem('theme');
  },

  get accent() {
    return localStorage.getItem('theme-accent');
  },

  setTheme(theme) {
    const html = document.documentElement;
    let metaThemeColor = document.head.querySelector('meta[name="theme-color"]'); // create the meta theme color if not found
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color

    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }

    html.removeAttribute('light');
    html.removeAttribute('dark');
    if (theme === undefined) theme = localStorage.getItem('theme') || 'system';
    localStorage.setItem('theme', theme);
    if (theme == 'system') theme = this.isDarkMode ? 'dark' : 'light';
    html.setAttribute(theme, '');
    metaThemeColor.content = this.getCssVar('theme-bgd');
    localStorage.setItem('meta-theme-color', metaThemeColor.content);
  },

  setAccent(accent) {
    const html = document.documentElement;
    let colorizeFaviconComposition = localStorage.getItem('theme-colorize-icon');

    if (accent === undefined) {
      accent = localStorage.getItem('theme-accent');
    } else {
      localStorage.setItem('theme-accent', accent);
    }

    if (accent) {
      html.style.setProperty('--theme', `var(--${accent}, #${accent})`);
      html.style.setProperty('--theme-chosen', `var(--${accent}, #${accent})`);
      if (colorizeFaviconComposition) (0, _colorizeFavicon.default)(this.getCssVar('theme'), colorizeFaviconComposition);
    } else {
      html.style.removeProperty('--theme');
      html.style.removeProperty('--theme-chosen');
      (0, _colorizeFavicon.default)(false);
    }
  },

  getCssVar(name) {
    if (name[0] != '-') name = '--' + name;
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

};
exports.colorScheme = colorScheme;
},{"./colorize-favicon":"FgfO"}],"ZCfn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _device = _interopRequireDefault(require("../../../util/device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('range-slider', class extends _litElement.LitElement {
  static get properties() {
    return {
      min: {
        type: Number
      },
      max: {
        type: Number
      },
      step: {
        type: Number
      },
      range: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: Object
      },
      label: {
        type: String,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.label = 'auto';
    this.range = false;
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.valMin = 0;
    this.valMax = 0;
    this.value = [0, 0];
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            --size: 6px;
            --thumbSize: 18px;
            --color: var(--fc-theme);
            --thumbColor: var(--color);
            --bgd: var(--theme-color-accent, rgba(0,0,0,.4));
            --padding: 10px;

            display: inline-block;
            vertical-align: middle;
            position:relative;
            width: 140px;
            height: var(--size);
            margin: 0 auto;
            padding: var(--padding) 0;
            cursor: pointer;
            font-size: .9em;
            user-select: none;
            --label-rotation: 45deg;
        }

        rail, track {
            display: block;
            height: var(--size);
            width: 100%;
            background: var(--color);
            border-radius: 6px;
            position: absolute;
            top: var(--padding);
            left: 0;
        }

        rail {
            background: var(--bgd);
        }

        thumb {
            height: var(--thumbSize);
            width: var(--thumbSize);
            transform: translate(-50%, -50%);
            position: absolute;
            left: 0;
            top: calc(var(--padding) + (var(--size) / 2));
            background: var(--thumbColor);
            border-radius: var(--thumbSize);
            box-shadow: 0 0 0 1px var(--theme-bgd, var(--thumb-shadow, #fff)) inset
        }

        thumb:before {
            content: '';
            position: absolute;
            height: 250%;
            width: 250%;
            left: -75%;
            top: -75%;
            background: var(--thumbColor);
            opacity: .2;
            border-radius: 30px;
            z-index: -1;
            transform: scale(.3);
            transform-origin: center center;
            opacity: 0;
            transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        thumb:hover:before {
            transform: scale(.9);
            opacity: .2;
        }

        thumb[active]:before {
            transform: scale(1);
            opacity: .2;
        }

        thumb[active] {
            background: var(--color);
        }

        thumb > div {
            position: absolute;
            font-size: .9em;
            background: var(--color);
            color: #fff;
            height: 2.2em;
            width: 2.2em;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 100%;
            left: 50%;
            position: absolute;
            transform-origin: bottom left;
            transform: translate(0%,-4px) rotate(calc(-1 * var(--label-rotation))) scale(0);
            border-radius: 50% 50% 50% 0;
            transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            
        }

        :host([label*="bottom"]) thumb > div{
            bottom: auto;
            top: calc(0% - 4px);
            --label-rotation: -135deg;
        }

        thumb > div > span {
            transform: rotate(var(--label-rotation))
        }

        :host([label*="show"]) thumb > div,
        thumb:hover > div,
        thumb[active] > div {
            transform: translate(0%,-4px) rotate(calc(-1 * var(--label-rotation))) scale(1);
        }

        :host([label*="none"]) thumb > div {
            display: none !important;
        }

        :host(:not([range])) thumb[min] {
            display: none;
        }

        .labels {
            display: flex;
            justify-content: space-between;
            margin-top: .75em;
        }
    `;
  }

  _polishVal(val) {
    val = parseFloat((Math.round(val / this.step) * this.step).toFixed(2));
    if (val < this.min) val = this.min;
    if (val > this.max) val = this.max;
    return val;
  }

  set value(val) {
    let oldVal = this.value;
    let oldMin = this.valMin;
    let oldMax = this.valMax;
    if (typeof val == 'string') val = val.split(',').map(s => parseFloat(s)); // setting both min and max

    if (Array.isArray(val)) {
      if (typeof val[0] !== 'number' || typeof val[1] !== 'number') return;
      val.sort();
      if (this.range) this.valMin = this._polishVal(val[0]);
      this.valMax = this._polishVal(val[1]);
      this.requestUpdate('value', oldVal);
      return;
    }

    if (typeof val !== 'number') return;
    val = this._polishVal(val); // console.log(val);

    let dmin = Math.abs(this.valMin - val);
    let dmax = Math.abs(this.valMax - val);

    if (this._active == 'max' && val == this.valMin) {
      this.valMax = val;
      if (this.range) this._active = 'min';
    } else if (this._active == 'min' && val == this.valMax) {
      this.valMin = val;
      this._active = 'max';
    } else if (!this.range || dmin == dmax && this.valMax > this.valMin && this._active == 'max' || dmax < dmin || val > this.valMax) {
      this.valMax = val;
      this._active = 'max';
    } else {
      this.valMin = val;
      if (this.range) this._active = 'min';
    } // this.setAttribute('value', this.value.join(','))


    if (!this._mouseDown) this._active = null; // nothing changed

    if (oldMin == this.valMin && oldMax == this.valMax) return;
    this._didChange = true;
    let setPropOn = this.parentElement && this.parentElement.tagName == 'FORM-CONTROL' ? this.parentElement : this;

    if (this.range) {
      setPropOn.style.setProperty('--range-slider-min-val', `'${this.valMin}'`);
      setPropOn.style.setProperty('--range-slider-max-val', `'${this.valMax}'`);
    } else {
      setPropOn.style.setProperty('--range-slider-val', `'${this.valMax}'`);
    }

    this.requestUpdate('value', oldVal);
  }

  get value() {
    return this.range ? [this.valMin, this.valMax] : this.valMax;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(_device.default.isMobile ? 'touchstart' : 'mousedown', this.mouseDown, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(_device.default.isMobile ? 'touchstart' : 'mousedown', this.mouseDown, true);
  }

  get _len() {
    return this.max - this.min;
  }

  get _minLeft() {
    return this.valMin / this._len * 100;
  }

  get _maxLeft() {
    return (this.valMax - this.min) / this._len * 100;
  }

  get _trackLength() {
    return this._maxLeft - this._minLeft;
  }

  get atMin() {
    return (this.range ? this.valMin : this.valMax) == this.min;
  }

  get atMax() {
    return this.valMax == this.max;
  }

  reset() {
    this.valMin = this.min;
    this.valMax = this.min; // this.valMax = this.range ? this.max : this.min

    this.value = [this.valMin, this.valMax];
    this.update();
  }

  render() {
    return (0, _litElement.html)`
        <rail></rail>
        <track style="left:${this._minLeft}%; width:${this._trackLength}%"></track>
        <thumb min ?active=${this._active == 'min'} style="left:${this._minLeft}%">
            <div><span>${this.valMin}</span></div>
        </thumb>
        <thumb max ?active=${this._active == 'max'} style="left:${this._maxLeft}%">
            <div><span>${this.valMax}</span></div>
        </thumb>
        <div class="labels">
            <b-text sm muted><slot name="label:min"></slot></b-text>
            <b-text sm muted><slot name="label:max"></slot></b-text>
        </div>
    `;
  }

  mouseDown(e) {
    if (!_device.default.isMobile && e.which !== 1) return; // normal click

    window.addEventListener(_device.default.isMobile ? 'touchend' : 'mouseup', this.mouseUp, true);
    window.addEventListener(_device.default.isMobile ? 'touchmove' : 'mousemove', this.mouseMove, true);
    this._mouseDown = true;
    this.mouseMove(e);
  }

  mouseUp() {
    this._active = null;
    this._mouseDown = false;
    window.removeEventListener(_device.default.isMobile ? 'touchend' : 'mouseup', this.mouseUp, true);
    window.removeEventListener(_device.default.isMobile ? 'touchmove' : 'mousemove', this.mouseMove, true);
    this.update();

    if (this._didChange) {
      this._didChange = false;
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value
        }
      }));
    }
  }

  mouseMove(e) {
    // already at the min/max, stop tracking mouse move until within range again
    if (this._active == 'min' && e.pageX < this._lastMousePos && this.atMin) return;
    if (this._active == 'max' && e.pageX > this._lastMousePos && this.atMax) return;
    this._lastMousePos = e.pageX;
    let rect = this.getBoundingClientRect();
    let offset = {
      x: rect.x,
      y: rect.y
    }; // let mouseX = offset.x < e.pageX ? (e.offsetX + e.srcElement.offsetLeft) : e.pagex

    let eventScreenX = e.touches ? e.touches[0].screenX : e.screenX;
    let mouseX = eventScreenX - window.screenX;
    let x = mouseX - offset.x;
    let percent = x / this.clientWidth * 100;
    let val = percent / 100 * this._len + this.min;
    let oldVal = this.value;
    this.value = val;
    if (oldVal != this.value) this.dispatchEvent(new CustomEvent('changing', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value
      }
    }));
  }

});

var _default = customElements.get('range-slider');

exports.default = _default;
},{"lit-element":"bhxD","../../../util/device":"la8o"}],"z4Ln":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceStorageEventsLocally = forceStorageEventsLocally;
exports.default = exports.sessionStore = exports.localStore = void 0;

// TODO: support prefixing?
const store = (store, key, val) => {
  if (val === undefined) {
    let data = store.getItem(key);
    if (data === null || data === undefined) return undefined;
    var val = '';

    try {
      val = JSON.parse(data);
    } catch (e) {
      val = data;
    }

    return val;
  }

  if (val === null) {
    return store.removeItem(key);
  }

  val = JSON.stringify(val);
  return store.setItem(key, val);
};

const localStore = (key, val) => {
  return store(window.localStorage, key, val);
};

exports.localStore = localStore;

const sessionStore = (key, val) => {
  return store(window.sessionStorage, key, val);
};

exports.sessionStore = sessionStore;
var _default = localStore;
exports.default = _default;

function forceStorageEventsLocally() {
  let setItem = window.localStorage.setItem;
  let removeItem = window.localStorage.removeItem;

  window.localStorage.setItem = function (key, val) {
    setItem.call(window.localStorage, key, val);
    window.dispatchEvent(new CustomEvent('storage', {
      bubbles: true,
      composed: true,
      detail: {
        key: key,
        oldVal: null,
        newVal: val
      }
    }));
  };

  window.localStorage.removeItem = function (key) {
    removeItem.call(window.localStorage, key);
    window.dispatchEvent(new CustomEvent('storage', {
      bubbles: true,
      composed: true,
      detail: {
        key: key,
        oldVal: null,
        newVal: null
      }
    }));
  };
}
},{}],"EIVk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

require("./icon");

require("../presenters/form-control/controls/range-slider");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _duration = _interopRequireDefault(require("dayjs/plugin/duration"));

var _store = _interopRequireDefault(require("../util/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Menu from '../presenters/menu'
_dayjs.default.extend(_duration.default); // TODO: hook up settings menu


const formatTime = sec => {
  var dur = _dayjs.default.duration(sec * 1000);

  var hours = dur.hours();
  var min = hours > 0 ? String(dur.minutes()).padStart(2, '0') : dur.minutes();
  return (hours ? hours + ':' : '') + min + ':' + String(dur.seconds()).padStart(2, '0');
};

let ACTIVE_PLAYER = null;
customElements.define('b-audio', class extends _litElement.LitElement {
  static get properties() {
    return {
      src: {
        type: String,
        reflect: true
      },
      autoplay: {
        type: Boolean,
        reflect: true
      },
      playing: {
        type: Boolean,
        reflect: true
      } // currentTime: {type: Number},

    };
  }

  constructor(src = '', {
    autoplay = false
  } = {}) {
    super();
    this.src = src;
    this.autoplay = autoplay;
    this.playing = false;
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: block;
            position:relative;
            /* padding: 1em; */
            border: solid 1px rgba(0,0,0,.1);
            background: var(--theme-bgd, #fff);
            border-radius: var(--radius);
            --radius: 4px;
        }

        main {
            display: grid;
            grid-template-columns: 2em 45px 1fr 45px;
            align-items: center;
            justify-content: space-between;
            gap: .25em;
            padding-right: .5em;
        }

        .time {
            font-weight: bold;
        }

        .time.elapsed {
            text-align: right;
        }

        .btn-play {
            cursor: pointer;
            height: 1.5em;
            width: 1.5em;
            margin: .25em;
            padding: .25em;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            border-radius: 20px;
            /* margin-right: .5em; */
            background: var(--theme-bgd-accent, #eee);
            /* color: #fff; */
            /* border: solid 2px; */
            transition: color .15s ease-in-out, border-color .15s ease-in-out;
        }

        :host([status="error"]) {
            background: var(--red-50) !important;
        }

        :host([status="error"]) .btn-play {
            color: var(--red);
            background: var(--red-100);
        }


        .btn-play:hover {
            color: var(--blue);
        }

        input[type=range] {
            -webkit-appearance: none;
            min-width: 100px;
            height: 10px;
            border-radius: 5px;
            background: var(--theme-color, var(--black));
            outline: none;
            padding: 0;
            margin: 0 .5em;
            border: none;
            box-shadow: none;
        }

        input[type=range]::-webkit-slider-runnable-track {
            border: none;
            height: 100%;
        }

        input[type=range]::-webkit-slider-thumb {
            display: none;
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: solid 2px var(--theme-bgd, #fff);
            background: var(--theme-color, var(--black));
            cursor: pointer;
            box-shadow: none;
            margin-top: -4px;
        }

        input[type=range]::-webkit-slider-thumb:hover {
            background: var(--blue);
        }

        input[type=range]:active::-webkit-slider-thumb {
            background: var(--blue);
        }

        input[type=range]:hover::-webkit-slider-thumb {
            display: block;
        }

        .settings {
            transform: rotate(90deg);
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <main @mouseenter=${this.onHover} @mouseleave=${this.onHoverLeave}>
            <audio
                @loadedmetadata=${this.audioLoaded}
                @timeupdate=${this.audioTimeChange}
                @ended=${this.pause}
                @error=${this.audioLoadError}
            ></audio>
            <span class="btn-play icon-play" @click=${this.playPause}>
                <b-icon name=${this.playing ? 'pause' : 'play'}></b-icon>
            </span>
            <span class="elapsed time">00:00</span>
            <input type="range" value="0" disabled
                @input=${this.progressSliderChanging}
                @change=${this.progressSliderChangingDone}
                class="progress"/>
            <span class="remaining time">00:00</span>
            <!-- <b-btn clear icon="dot-3" class="settings" @click=${this.viewSettings}></b-btn> -->
        </main>
    `;
  } // events: {
  //     'mouseenter': 'onHover',
  //     'mouseleave': 'onHoverLeave',
  //     'mouseenter .progress': 'progressHover',
  //     'mouseleave .progress': 'progressHoverLeave',
  //     'input .progress': 'progressSliderChanging',
  //     'change .progress': 'progressSliderChangingDone',
  //     'click .btn-settings': 'viewSettings',
  //     'click .btn-play': 'playPause'
  // },


  firstUpdated() {
    this.audio = this.shadowRoot.querySelector('audio');
    this.progress = this.shadowRoot.querySelector('.progress');
    this.elapsed = this.shadowRoot.querySelector('.elapsed');
    this.remaining = this.shadowRoot.querySelector('.remaining');
    this.loadAudio(this.src);
  }

  get status() {
    return this.getAttribute('status');
  }

  set status(val) {
    this.setAttribute('status', val);
  }

  playPause() {
    this.audio.paused ? this.play() : this.pause();
  }

  play(src) {
    // if another audio player is playing, pause it
    if (ACTIVE_PLAYER && ACTIVE_PLAYER != this) ACTIVE_PLAYER.pause(); // if audio src has not loaded yet or we have been given a new src, load it now

    if (!this._loaded || src) {
      this.loadAudio(src || this.src);
      return;
    }

    if (this.status == 'error') return;
    ACTIVE_PLAYER = this;
    this.audio.play();
    this.playing = true;
  }

  pause() {
    ACTIVE_PLAYER = null;
    this.clip = null; // clear any clips

    this.audio.pause();
    this.playing = false;
  }

  skipBack(val) {
    this.skip(-val || -10);
  }

  skipForward(val) {
    this.skip(val || 10);
  }

  skip(amt) {
    var time = this.audio.currentTime + amt;
    if (time < 0) time = 0;
    if (time > this.audio.duration) time = this.audio.duration;
    this.audio.currentTime = time;
  }

  loadAudio(src) {
    this.status = 'loading';
    this.audio.src = src;
  } // Events ==================================================================


  audioLoadError() {
    this._loaded = true;
    this.status = 'error';
    this.progress.disabled = true;
  }

  audioLoaded() {
    this.status = 'loaded';
    this._loaded = true;
    this.progress.disabled = false;
    this.progress.max = this.audio.duration;
    this.setProgress(); // clips were set before fully loaded, so set them again if needed

    if (this.clip && this.clip.length == 2 && isNaN(this.clip[1])) this.playLastClip();else if (this.clip && this.clip.length > 2 && isNaN(this.clip[2])) this.playEndClips();else if (this.autoplay) this.play();
  }
  /*
      Playing <audio> time has changed
  */


  audioTimeChange() {
    // update the progress slider unless currently seeking
    if (!this.seeking) this.progress.value = this.audio.currentTime;
    this.setProgress(); // reached end of clip, stop

    if (this.clip && this.audio.currentTime >= this.clip[1]) {
      // more than one clip is given, remove the just finished clip and begin playing the next one
      if (this.clip.length > 2) {
        this.audio.pause();
        setTimeout(function () {
          // play next clip after 700ms pause
          this.playClip(this.clip.splice(2));
        }.bind(this), 700);
      } else {
        this.pause();
      }
    }
  }
  /*
      Set Progress: uses current poisition to adjust background of proress slider on and updates elapsed/remaining times
  */


  setProgress() {
    var percent = this.progress.value / this.audio.duration * 100;
    var time = this.progress.value;
    var color = 'var(--theme-color, #333)';
    var color2 = 'var(--theme-bgd-accent, #bbb)';
    this.progress.style.background = `linear-gradient(to right, ${color} ${percent}%, ${color2} ${percent}%)`;
    this.elapsed.innerHTML = formatTime(time);
    this.remaining.innerHTML = this.audio.duration == Infinity ? '' : formatTime(this.audio.duration - time);
  }

  progressSliderChanging() {
    this.seeking = true;
    this.wasPlaying = this.wasPlaying || !this.audio.paused;
    this.audio.pause();
    this.setProgress();
  }

  progressSliderChangingDone() {
    this.audio.currentTime = this.progress.value;
    this.wasPlaying && this.play();
    this.wasPlaying = null;
    this.seeking = false;
    this.progress.blur(); // so slider doesn't hijack the keyboard events
  }

  progressHover() {
    this.classList.add('progress-hover');
    this.setProgress();
  }

  progressHoverLeave() {
    this.classList.remove('progress-hover');
    this.setProgress();
  } // Clips ====================================================================


  setClipLength(item) {
    (0, _store.default)('audioplayer:clip-length', item.val);
  }

  clipLength() {
    return (0, _store.default)('audioplayer:clip-length') || 15;
  }

  playFirstClip() {
    if (this.audio.duration < this.clipLength()) return; // TODO: improve

    this.playClip([0, this.clipLength()]);
  }

  playLastClip() {
    if (this.audio.duration < this.clipLength()) return;
    this.playClip([this.audio.duration - this.clipLength(), this.audio.duration]);
  }

  playEndClips() {
    if (this.audio.duration < this.clipLength()) return;
    this.playClip([0, this.clipLength(), this.audio.duration - this.clipLength(), this.audio.duration]);
  }

  playClip(clip) {
    this.clip = clip;
    if (!isNaN(this.clip[0])) this.audio.currentTime = this.clip[0];
    this.play();
  } // Keyboard Shortcuts =======================================================


  onKeyPress(e) {
    if (this.status == 'error') return;
    e.preventDefault();
    e.stopPropagation();

    switch (e.which) {
      case 32:
        this.playPause();
        break;
      // space

      case 27:
        this.pause();
        break;
      // esc

      case 70:
        this.playFirstClip();
        break;
      // f

      case 76:
        this.playLastClip();
        break;
      // l

      case 69:
        this.playEndClips();
        break;
      // e

      case 37:
        // left
        if (e.shiftKey) this.audio.currentTime = 0;else this.skipBack(_.metaKey() ? 30 : 10);
        break;

      case 39:
        // right
        if (e.shiftKey) this.audio.currentTime = this.audio.duration;else this.skipForward(_.metaKey() ? 30 : 10);
        break;
    }
  }

  onHover() {
    this._onKeyPress = this._onKeyPress || this.onKeyPress.bind(this);
    window.addEventListener('keydown', this._onKeyPress);
  }

  onHoverLeave() {
    window.removeEventListener('keydown', this._onKeyPress);
  }

});

var _default = customElements.get('b-audio');

exports.default = _default;
},{"lit-element":"bhxD","./icon":"ncPe","../presenters/form-control/controls/range-slider":"ZCfn","dayjs":"dZYI","dayjs/plugin/duration":"oxIj","../util/store":"z4Ln"}],"jTPt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeHTML = void 0;

var _parts = require("../lib/parts.js");

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// For each part, remember the value that was last rendered to the part by the
// unsafeHTML directive, and the DocumentFragment that was last set as a value.
// The DocumentFragment is used as a unique key to check if the last value
// rendered to the part was with unsafeHTML. If not, we'll always re-render the
// value passed to unsafeHTML.
const previousValues = new WeakMap();
/**
 * Renders the result as HTML, rather than text.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */

const unsafeHTML = (0, _litHtml.directive)(value => part => {
  if (!(part instanceof _litHtml.NodePart)) {
    throw new Error('unsafeHTML can only be used in text bindings');
  }

  const previousValue = previousValues.get(part);

  if (previousValue !== undefined && (0, _parts.isPrimitive)(value) && value === previousValue.value && part.value === previousValue.fragment) {
    return;
  }

  const template = document.createElement('template');
  template.innerHTML = value; // innerHTML casts to string internally

  const fragment = document.importNode(template.content, true);
  part.setValue(fragment);
  previousValues.set(part, {
    value,
    fragment
  });
});
exports.unsafeHTML = unsafeHTML;
},{"../lib/parts.js":"atl2","../lit-html.js":"SPDu"}],"RaiV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.live = void 0;

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Checks binding values against live DOM values, instead of previously bound
 * values, when determining whether to update the value.
 *
 * This is useful for cases where the DOM value may change from outside of
 * lit-html, such as with a binding to an `<input>` element's `value` property,
 * a content editable elements text, or to a custom element that changes it's
 * own properties or attributes.
 *
 * In these cases if the DOM value changes, but the value set through lit-html
 * bindings hasn't, lit-html won't know to update the DOM value and will leave
 * it alone. If this is not what you want—if you want to overwrite the DOM
 * value with the bound value no matter what—use the `live()` directive:
 *
 *     html`<input .value=${live(x)}>`
 *
 * `live()` performs a strict equality check agains the live DOM value, and if
 * the new value is equal to the live value, does nothing. This means that
 * `live()` should not be used when the binding will cause a type conversion. If
 * you use `live()` with an attribute binding, make sure that only strings are
 * passed in, or the binding will update every render.
 */
const live = (0, _litHtml.directive)(value => part => {
  let previousValue;

  if (part instanceof _litHtml.EventPart || part instanceof _litHtml.NodePart) {
    throw new Error('The `live` directive is not allowed on text or event bindings');
  }

  if (part instanceof _litHtml.BooleanAttributePart) {
    checkStrings(part.strings);
    previousValue = part.element.hasAttribute(part.name); // This is a hack needed because BooleanAttributePart doesn't have a
    // committer and does its own dirty checking after directives

    part.value = previousValue;
  } else {
    const {
      element,
      name,
      strings
    } = part.committer;
    checkStrings(strings);

    if (part instanceof _litHtml.PropertyPart) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      previousValue = element[name];

      if (previousValue === value) {
        return;
      }
    } else if (part instanceof _litHtml.AttributePart) {
      previousValue = element.getAttribute(name);
    }

    if (previousValue === String(value)) {
      return;
    }
  }

  part.setValue(value);
});
exports.live = live;

const checkStrings = strings => {
  if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
    throw new Error('`live` bindings can only contain a single expression');
  }
};
},{"../lit-html.js":"SPDu"}],"loUd":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.15.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;

for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;
/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/

var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */


function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  } // NOTE: 1 DOM access here


  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}
/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */


function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }

  return element.parentNode || element.host;
}
/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */


function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;

    case '#document':
      return element.body;
  } // Firefox want us to check `-x` and `-y` variations as well


  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */

function isIE(version) {
  if (version === 11) {
    return isIE11;
  }

  if (version === 10) {
    return isIE10;
  }

  return isIE11 || isIE10;
}
/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */


function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

  var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  } // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...


  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }

  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}
/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */


function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}
/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */


function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  } // Here we make sure to give as "start" the element that comes first in the DOM


  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1; // Get common ancestor container

  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  } // one of the nodes is inside shadowDOM, find which one


  var element1root = getRoot(element1);

  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */


function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}
/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */


function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */


function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */


function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */


function getBoundingClientRect(element) {
  var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11

  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }; // subtract scrollbar size from sizes

  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons

  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.

  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };
  return getClientRect(offset);
}
/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */


function isFixed(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }

  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }

  var parentNode = getParentNode(element);

  if (!parentNode) {
    return false;
  }

  return isFixed(parentNode);
}
/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */


function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }

  var el = element.parentElement;

  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }

  return el || document.documentElement;
}
/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */


function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

  var boundaries = {
    top: 0,
    left: 0
  };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference); // Handle viewport case

  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;

    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));

      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  } // Add paddings


  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return width * height;
}
/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split('-')[1];
  return computedPlacement + (variation ? '-' + variation : '');
}
/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */


function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */


function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */


function getOppositePlacement(placement) {
  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */


function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0]; // Get popper node sizes

  var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  }; // depending by the popper placement we have to compute its offsets slightly differently

  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}
/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  } // use `filter` to obtain the same behavior of `find`


  return arr.filter(check)[0];
}
/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  } // use `find` + `indexOf` if `findIndex` isn't supported


  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */


function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }

    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */


function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  }; // compute reference element offsets

  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed; // compute the popper offsets

  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

  data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback

  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */


function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}
/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */


function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;

    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }

  return null;
}
/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */


function destroy() {
  this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners(); // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it

  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }

  return this;
}
/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */


function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, {
    passive: true
  });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }

  scrollParents.push(target);
}
/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, {
    passive: true
  }); // Scroll event listener on scroll parents

  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */


function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  }); // Reset state

  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */


function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */


function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = ''; // add unit if the value is numeric and is one of the following

    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }

    element.style[prop] = styles[prop] + unit;
  });
}
/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];

    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */


function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element

  setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}
/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */


function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations

  setStyles(popper, {
    position: options.positionFixed ? 'fixed' : 'absolute'
  });
  return options;
}
/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */


function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);
  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;
  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;

  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }

  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

  var styles = {
    position: popper.position
  };
  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed

  var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.

  var left = void 0,
      top = void 0;

  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }

  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }

  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  } // Attributes


  var attributes = {
    'x-placement': data.placement
  }; // Update `data` attributes, styles and arrowStyles

  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */


function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';

    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }

  return isRequired;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function arrow(data, options) {
  var _data$offsets$arrow; // arrow depends on keepTogether in order to work


  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isVertical = ['left', 'right'].indexOf(placement) !== -1;
  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len]; //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //
  // top/left side

  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  } // bottom/right side


  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available

  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
  return data;
}
/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */


function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }

  return variation;
}
/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */


var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

var validPlacements = placements.slice(3);
/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */

function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';
  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;

    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;

    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;

    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1; // flips variation if reference element overflows boundaries

    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom); // flips variation if popper content overflows boundaries

    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);
    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future

      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }

  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}
/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */


function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2]; // If it's not a number it's an operator, I guess

  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;

    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;

      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;

    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}
/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */


function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one

  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  }); // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space

  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  } // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.


  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []) // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  }); // Loop trough the offsets arrays and execute the operations

  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */


function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var basePlacement = placement.split('-')[0];
  var offsets = void 0;

  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken

  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  } // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself


  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification

  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];
  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed

  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];

      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }

      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];

      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }

      return defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;
    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';
    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */


var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: offset,

    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: preventOverflow,

    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],

    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: arrow,

    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: flip,

    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',

    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',

    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,

    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,

    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,

    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: computeStyle,

    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,

    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',

    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: applyStyle,

    /** @prop {Function} */
    onLoad: applyStyleOnLoad,

    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};
/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */

var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};
/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */
// Utils
// Methods

var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    }; // make update() debounced, so that it only runs at most once-per-tick


    this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

    this.options = _extends({}, Popper.Defaults, options); // init state

    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    }; // get reference and popper elements (allow jQuery wrappers)

    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    }); // Refactoring modifiers' list (Object => Array)

    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    }) // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    }); // fire the first update to position the popper in the right place

    this.update();
    var eventsEnabled = this.options.eventsEnabled;

    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  } // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }
    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();
/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;
var _default = Popper;
exports.default = _default;
},{}],"r4vn":[function(require,module,exports) {

},{}],"Soyf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DefaultOpts = void 0;

var _popper = _interopRequireDefault(require("popper.js"));

var _device = _interopRequireDefault(require("../../util/device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	Popover
*/
const styles = require('./style.less');

const DefaultOpts = {
  align: 'bottom',
  className: '',
  clickToggles: true,
  closeOnHide: true,
  maxHeight: 'auto',
  maxHeightThreshold: 400,
  maxWidth: '',
  width: '',
  flip: true,
  overflowBoundry: 'scrollParent',
  onClose: () => {},
  onKeydown: e => {}
};
exports.DefaultOpts = DefaultOpts;
const OpenPopovers = [];
let WatchingClicks = false;
let WatchingKeyboard = false;

const WatchClicks = function (e) {
  let found = false;
  let close = [];
  let target = e.path ? e.path.find(el => el.popover) : e.target; // the clicked target already has a popover and has the "toggle" setting, so close the current popover

  if (target && target.popover && target.popover.view != target && target.popover.opts.clickToggles) {
    target.popover._close();

    e.preventDefault();
    e.stopPropagation();
    return false;
  } // close all popovers not part (nested) within the clicked target


  OpenPopovers.slice(0).reverse().forEach(dd => {
    if (!found && !dd.contains(target)) {
      close.push(dd); // as soon as one of the popovers is nested, all others that follow will be nested, no reason to continue testing
    } else {
      found = true;
    }
  });
  close.forEach(dd => dd._close());
};

const WatchKeyboard = function (e) {
  let popover = OpenPopovers.slice(0).pop();

  popover._onKeydown(e);
};

class Popover {
  constructor(target, view, opts = {}) {
    opts = Object.assign({}, DefaultOpts, opts);

    if (!WatchingClicks) {
      WatchingClicks = true;
      window.addEventListener(_device.default.isMobile ? 'touchend' : 'mousedown', WatchClicks, !_device.default.isMobile);
    }

    if (!WatchingKeyboard) {
      WatchingKeyboard = true;
      window.addEventListener('keydown', WatchKeyboard, !_device.default.isMobile);
    }

    if (typeof view == 'string') {
      if (customElements.get(view)) {
        view = document.createElement(view);
      } else {
        let _view = document.createElement('div');

        _view.classList.add('tooltip');

        _view.innerHTML = view;
        view = _view;
      }
    }

    if (window.Backbone && view instanceof window.Backbone.View) view = view.el;
    this.opts = opts;
    this.view = view;
    this.view.classList.add('__view');
    this.el = document.createElement('div');
    this.el.classList.add('popover');
    this.el.innerHTML = '<span class="__arrow" x-arrow><span class="__arrow" x-arrow></span></span>';
    this.el.appendChild(view);
    document.body.append(this.el);

    if (this.opts.className) {
      this.opts.className.split(' ').forEach(className => this.el.classList.add(className));
    }

    this.el.popover = this;
    this.view.popover = this;
    this.positionOver(target); // watch for the view to add elements so we can adjust position

    this.mutationObserver = new MutationObserver(this.viewMutated.bind(this));
    this.mutationObserver.observe(this.view, {
      attributes: true,
      childList: true,
      subtree: false
    }); // keep track of open popovers so we can remove them later

    OpenPopovers.push(this);
  }

  positionOver(target) {
    this.clearTarget();
    let opts = this.opts;
    if (!target) return;

    if (target instanceof MouseEvent || target instanceof KeyboardEvent) {
      target = this.createInvisiblePlaceholderTarget(target);
    }

    this.target = target;
    this.target.popover = this;
    if (this.target._popoverTarget) this.target._popoverTarget.classList.add('popover-open');else this.target.classList.add('popover-open');

    if (!this.popper) {
      // set position of the popover using Popper
      this.popper = new _popper.default(target, this.el, {
        placement: opts.align,
        removeOnDestroy: true,
        onCreate: this._onPositionCreate.bind(this),
        onUpdate: this._onPositionUpdate.bind(this),
        modifiers: {
          inner: {
            enabled: opts.inner || false
          },
          offset: {
            enabled: opts.offset ? true : false,
            offset: opts.offset
          },
          flip: {
            enabled: opts.flip
          },
          preventOverflow: {
            enabled: opts.preventDefault !== undefined ? opts.preventDefault : true,
            // FIXME: confusing naming and not sure it works
            boundariesElement: opts.overflowBoundry || 'scrollParent',
            // priority: []
            priority: ['top', 'bottom'].includes(opts.align) ? ['left', 'right'] : ['top', 'bottom']
          }
        }
      });
    } else {
      this.popper.reference = target;
      this.popper.update();
    }
  }

  createInvisiblePlaceholderTarget(e) {
    let target = document.createElement('div');
    target._popoverTarget = e._popoverTarget = e._popoverTarget || e.currentTarget;
    target.classList.add('popover-invisible-placeholder');
    target.style.position = 'absolute';

    if (e instanceof MouseEvent) {
      target.style.left = e.clientX + 'px';
      target.style.top = e.clientY + 'px';
    } else if (e instanceof KeyboardEvent) {
      // https://stackoverflow.com/a/16210994/484780
      let root = e.target.getRootNode(); // shadowRoot or window

      let range = root.getSelection().getRangeAt(0);
      let rect = range.getBoundingClientRect();
      target.style.left = rect.x + 'px';
      target.style.top = rect.y + 'px';
      target.style.height = rect.height + 'px';
    }

    document.body.appendChild(target);
    return target;
  }

  contains(target) {
    if (!target) return false;
    if (this.el.contains(target)) return true; // let parentPopover = this.parentPopover
    // if( parentPopover && parentPopover.contains(target) )
    // 	return true

    let targetParent = target.parentElement && target.parentElement.popover;
    if (targetParent && this.el.contains(targetParent.target)) return true;
    return false;
  }

  get parentPopover() {
    let parentPopover = false;
    let parent = this.target;

    while (parent && !parentPopover) {
      parent = parent.parentElement;
      if (parent && parent.popover) parentPopover = parent;
    }

    return parentPopover;
  }

  get isNested() {
    return !!this.parentPopover;
  }

  viewMutated(mutationsList, observer) {
    this._updatePosition();
  }

  clearTarget() {
    if (!this.target) return;
    this.target.popover = null;

    if (this.target._popoverTarget) {
      this.target._popoverTarget.classList.remove('popover-open');

      this.target.remove();
    } else this.target.classList.remove('popover-open');
  }

  close() {
    if (!this.target.popover) return;
    this.el.popover = null;
    this.view.popover = null;
    this.mutationObserver.disconnect();
    this.popper.destroy();
    this.clearTarget(); // remove this from the list of open popovers as well as all popovers after it

    var indx = OpenPopovers.indexOf(this);

    if (indx > -1) {
      OpenPopovers.splice(indx).forEach((dd, i) => {
        if (i > 0) dd._close(); // close all popovers nested inside of this one
      });
    } // no more popovers, remove event listners


    if (OpenPopovers.length == 0) {
      WatchingClicks = false;
      window.removeEventListener(_device.default.isMobile ? 'touchend' : 'mousedown', WatchClicks, true);
      WatchingKeyboard = false;
      window.removeEventListener('keydown', WatchKeyboard, !_device.default.isMobile);
    }
  } // internal close method that also triggers the onClose callback


  _close() {
    this.close();
    this.opts.onClose && this.opts.onClose();
  }

  _updatePosition() {
    this.popper.update();
  }

  _onPositionCreate(data) {
    this._setDimensions(data);
  }

  _onPositionUpdate(data) {
    if (data.hide && this.opts.closeOnHide) this._close();
  }

  _setDimensions(data) {
    let arrowH = data.arrowElement.offsetHeight;
    let top = data.offsets.reference.top; // NOTE: bottom of element in relation to top of window

    let bottom = data.offsets.reference.bottom;
    data.instance.modifiers.forEach(m => {
      if (m.name == 'preventOverflow' && m.boundaries) {
        // TODO: needs improvement when alignmen is not bottom-*
        let h = window.innerHeight - bottom - arrowH * 2;
        if (bottom > window.innerHeight / 2) h = top - arrowH * 2;
        this.maxHeight = h;
        this.view.style.width = this.opts.width || this.view.style.width;
        this.view.style.maxWidth = this.opts.maxWidth || this.view.style.maxWidth;
      }
    });
  }

  _onKeydown(e) {
    if (this.opts.onKeydown) this.opts.onKeydown(e);
  }

  set maxHeight(val) {
    if (this.opts.maxHeight != 'auto') this.view.style.maxHeight = this.opts.maxHeight;else if (this.opts.maxHeight !== false) this.view.style.maxHeight = val + 'px';
  }

}

exports.default = Popover;
},{"popper.js":"loUd","../../util/device":"la8o","./style.less":"r4vn"}],"AZEX":[function(require,module,exports) {
var define;
// Generated by CoffeeScript 1.10.0
var slice = [].slice;

(function (root, factory) {
  if ('function' === typeof define && define.amd != null) {
    return define([], factory);
  } else if (typeof exports !== "undefined" && exports !== null) {
    return module.exports = factory();
  } else {
    return root.UrlPattern = factory();
  }
})(this, function () {
  var P, UrlPattern, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;

  escapeForRegex = function (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  concatMap = function (array, f) {
    var i, length, results;
    results = [];
    i = -1;
    length = array.length;

    while (++i < length) {
      results = results.concat(f(array[i]));
    }

    return results;
  };

  stringConcatMap = function (array, f) {
    var i, length, result;
    result = '';
    i = -1;
    length = array.length;

    while (++i < length) {
      result += f(array[i]);
    }

    return result;
  };

  regexGroupCount = function (regex) {
    return new RegExp(regex.toString() + '|').exec('').length - 1;
  };

  keysAndValuesToObject = function (keys, values) {
    var i, key, length, object, value;
    object = {};
    i = -1;
    length = keys.length;

    while (++i < length) {
      key = keys[i];
      value = values[i];

      if (value == null) {
        continue;
      }

      if (object[key] != null) {
        if (!Array.isArray(object[key])) {
          object[key] = [object[key]];
        }

        object[key].push(value);
      } else {
        object[key] = value;
      }
    }

    return object;
  };

  P = {};

  P.Result = function (value, rest) {
    this.value = value;
    this.rest = rest;
  };

  P.Tagged = function (tag, value) {
    this.tag = tag;
    this.value = value;
  };

  P.tag = function (tag, parser) {
    return function (input) {
      var result, tagged;
      result = parser(input);

      if (result == null) {
        return;
      }

      tagged = new P.Tagged(tag, result.value);
      return new P.Result(tagged, result.rest);
    };
  };

  P.regex = function (regex) {
    return function (input) {
      var matches, result;
      matches = regex.exec(input);

      if (matches == null) {
        return;
      }

      result = matches[0];
      return new P.Result(result, input.slice(result.length));
    };
  };

  P.sequence = function () {
    var parsers;
    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function (input) {
      var i, length, parser, rest, result, values;
      i = -1;
      length = parsers.length;
      values = [];
      rest = input;

      while (++i < length) {
        parser = parsers[i];
        result = parser(rest);

        if (result == null) {
          return;
        }

        values.push(result.value);
        rest = result.rest;
      }

      return new P.Result(values, rest);
    };
  };

  P.pick = function () {
    var indexes, parsers;
    indexes = arguments[0], parsers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return function (input) {
      var array, result;
      result = P.sequence.apply(P, parsers)(input);

      if (result == null) {
        return;
      }

      array = result.value;
      result.value = array[indexes];
      return result;
    };
  };

  P.string = function (string) {
    var length;
    length = string.length;
    return function (input) {
      if (input.slice(0, length) === string) {
        return new P.Result(string, input.slice(length));
      }
    };
  };

  P.lazy = function (fn) {
    var cached;
    cached = null;
    return function (input) {
      if (cached == null) {
        cached = fn();
      }

      return cached(input);
    };
  };

  P.baseMany = function (parser, end, stringResult, atLeastOneResultRequired, input) {
    var endResult, parserResult, rest, results;
    rest = input;
    results = stringResult ? '' : [];

    while (true) {
      if (end != null) {
        endResult = end(rest);

        if (endResult != null) {
          break;
        }
      }

      parserResult = parser(rest);

      if (parserResult == null) {
        break;
      }

      if (stringResult) {
        results += parserResult.value;
      } else {
        results.push(parserResult.value);
      }

      rest = parserResult.rest;
    }

    if (atLeastOneResultRequired && results.length === 0) {
      return;
    }

    return new P.Result(results, rest);
  };

  P.many1 = function (parser) {
    return function (input) {
      return P.baseMany(parser, null, false, true, input);
    };
  };

  P.concatMany1Till = function (parser, end) {
    return function (input) {
      return P.baseMany(parser, end, true, true, input);
    };
  };

  P.firstChoice = function () {
    var parsers;
    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function (input) {
      var i, length, parser, result;
      i = -1;
      length = parsers.length;

      while (++i < length) {
        parser = parsers[i];
        result = parser(input);

        if (result != null) {
          return result;
        }
      }
    };
  };

  newParser = function (options) {
    var U;
    U = {};
    U.wildcard = P.tag('wildcard', P.string(options.wildcardChar));
    U.optional = P.tag('optional', P.pick(1, P.string(options.optionalSegmentStartChar), P.lazy(function () {
      return U.pattern;
    }), P.string(options.optionalSegmentEndChar)));
    U.name = P.regex(new RegExp("^[" + options.segmentNameCharset + "]+"));
    U.named = P.tag('named', P.pick(1, P.string(options.segmentNameStartChar), P.lazy(function () {
      return U.name;
    })));
    U.escapedChar = P.pick(1, P.string(options.escapeChar), P.regex(/^./));
    U["static"] = P.tag('static', P.concatMany1Till(P.firstChoice(P.lazy(function () {
      return U.escapedChar;
    }), P.regex(/^./)), P.firstChoice(P.string(options.segmentNameStartChar), P.string(options.optionalSegmentStartChar), P.string(options.optionalSegmentEndChar), U.wildcard)));
    U.token = P.lazy(function () {
      return P.firstChoice(U.wildcard, U.optional, U.named, U["static"]);
    });
    U.pattern = P.many1(P.lazy(function () {
      return U.token;
    }));
    return U;
  };

  defaultOptions = {
    escapeChar: '\\',
    segmentNameStartChar: ':',
    segmentValueCharset: 'a-zA-Z0-9-_~ %',
    segmentNameCharset: 'a-zA-Z0-9',
    optionalSegmentStartChar: '(',
    optionalSegmentEndChar: ')',
    wildcardChar: '*'
  };

  baseAstNodeToRegexString = function (astNode, segmentValueCharset) {
    if (Array.isArray(astNode)) {
      return stringConcatMap(astNode, function (node) {
        return baseAstNodeToRegexString(node, segmentValueCharset);
      });
    }

    switch (astNode.tag) {
      case 'wildcard':
        return '(.*?)';

      case 'named':
        return "([" + segmentValueCharset + "]+)";

      case 'static':
        return escapeForRegex(astNode.value);

      case 'optional':
        return '(?:' + baseAstNodeToRegexString(astNode.value, segmentValueCharset) + ')?';
    }
  };

  astNodeToRegexString = function (astNode, segmentValueCharset) {
    if (segmentValueCharset == null) {
      segmentValueCharset = defaultOptions.segmentValueCharset;
    }

    return '^' + baseAstNodeToRegexString(astNode, segmentValueCharset) + '$';
  };

  astNodeToNames = function (astNode) {
    if (Array.isArray(astNode)) {
      return concatMap(astNode, astNodeToNames);
    }

    switch (astNode.tag) {
      case 'wildcard':
        return ['_'];

      case 'named':
        return [astNode.value];

      case 'static':
        return [];

      case 'optional':
        return astNodeToNames(astNode.value);
    }
  };

  getParam = function (params, key, nextIndexes, sideEffects) {
    var index, maxIndex, result, value;

    if (sideEffects == null) {
      sideEffects = false;
    }

    value = params[key];

    if (value == null) {
      if (sideEffects) {
        throw new Error("no values provided for key `" + key + "`");
      } else {
        return;
      }
    }

    index = nextIndexes[key] || 0;
    maxIndex = Array.isArray(value) ? value.length - 1 : 0;

    if (index > maxIndex) {
      if (sideEffects) {
        throw new Error("too few values provided for key `" + key + "`");
      } else {
        return;
      }
    }

    result = Array.isArray(value) ? value[index] : value;

    if (sideEffects) {
      nextIndexes[key] = index + 1;
    }

    return result;
  };

  astNodeContainsSegmentsForProvidedParams = function (astNode, params, nextIndexes) {
    var i, length;

    if (Array.isArray(astNode)) {
      i = -1;
      length = astNode.length;

      while (++i < length) {
        if (astNodeContainsSegmentsForProvidedParams(astNode[i], params, nextIndexes)) {
          return true;
        }
      }

      return false;
    }

    switch (astNode.tag) {
      case 'wildcard':
        return getParam(params, '_', nextIndexes, false) != null;

      case 'named':
        return getParam(params, astNode.value, nextIndexes, false) != null;

      case 'static':
        return false;

      case 'optional':
        return astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes);
    }
  };

  stringify = function (astNode, params, nextIndexes) {
    if (Array.isArray(astNode)) {
      return stringConcatMap(astNode, function (node) {
        return stringify(node, params, nextIndexes);
      });
    }

    switch (astNode.tag) {
      case 'wildcard':
        return getParam(params, '_', nextIndexes, true);

      case 'named':
        return getParam(params, astNode.value, nextIndexes, true);

      case 'static':
        return astNode.value;

      case 'optional':
        if (astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes)) {
          return stringify(astNode.value, params, nextIndexes);
        } else {
          return '';
        }

    }
  };

  UrlPattern = function (arg1, arg2) {
    var groupCount, options, parsed, parser, withoutWhitespace;

    if (arg1 instanceof UrlPattern) {
      this.isRegex = arg1.isRegex;
      this.regex = arg1.regex;
      this.ast = arg1.ast;
      this.names = arg1.names;
      return;
    }

    this.isRegex = arg1 instanceof RegExp;

    if (!('string' === typeof arg1 || this.isRegex)) {
      throw new TypeError('argument must be a regex or a string');
    }

    if (this.isRegex) {
      this.regex = arg1;

      if (arg2 != null) {
        if (!Array.isArray(arg2)) {
          throw new Error('if first argument is a regex the second argument may be an array of group names but you provided something else');
        }

        groupCount = regexGroupCount(this.regex);

        if (arg2.length !== groupCount) {
          throw new Error("regex contains " + groupCount + " groups but array of group names contains " + arg2.length);
        }

        this.names = arg2;
      }

      return;
    }

    if (arg1 === '') {
      throw new Error('argument must not be the empty string');
    }

    withoutWhitespace = arg1.replace(/\s+/g, '');

    if (withoutWhitespace !== arg1) {
      throw new Error('argument must not contain whitespace');
    }

    options = {
      escapeChar: (arg2 != null ? arg2.escapeChar : void 0) || defaultOptions.escapeChar,
      segmentNameStartChar: (arg2 != null ? arg2.segmentNameStartChar : void 0) || defaultOptions.segmentNameStartChar,
      segmentNameCharset: (arg2 != null ? arg2.segmentNameCharset : void 0) || defaultOptions.segmentNameCharset,
      segmentValueCharset: (arg2 != null ? arg2.segmentValueCharset : void 0) || defaultOptions.segmentValueCharset,
      optionalSegmentStartChar: (arg2 != null ? arg2.optionalSegmentStartChar : void 0) || defaultOptions.optionalSegmentStartChar,
      optionalSegmentEndChar: (arg2 != null ? arg2.optionalSegmentEndChar : void 0) || defaultOptions.optionalSegmentEndChar,
      wildcardChar: (arg2 != null ? arg2.wildcardChar : void 0) || defaultOptions.wildcardChar
    };
    parser = newParser(options);
    parsed = parser.pattern(arg1);

    if (parsed == null) {
      throw new Error("couldn't parse pattern");
    }

    if (parsed.rest !== '') {
      throw new Error("could only partially parse pattern");
    }

    this.ast = parsed.value;
    this.regex = new RegExp(astNodeToRegexString(this.ast, options.segmentValueCharset));
    this.names = astNodeToNames(this.ast);
  };

  UrlPattern.prototype.match = function (url) {
    var groups, match;
    match = this.regex.exec(url);

    if (match == null) {
      return null;
    }

    groups = match.slice(1);

    if (this.names) {
      return keysAndValuesToObject(this.names, groups);
    } else {
      return groups;
    }
  };

  UrlPattern.prototype.stringify = function (params) {
    if (params == null) {
      params = {};
    }

    if (this.isRegex) {
      throw new Error("can't stringify patterns generated from a regex");
    }

    if (params !== Object(params)) {
      throw new Error("argument must be an object or undefined");
    }

    return stringify(this.ast, params, {});
  };

  UrlPattern.escapeForRegex = escapeForRegex;
  UrlPattern.concatMap = concatMap;
  UrlPattern.stringConcatMap = stringConcatMap;
  UrlPattern.regexGroupCount = regexGroupCount;
  UrlPattern.keysAndValuesToObject = keysAndValuesToObject;
  UrlPattern.P = P;
  UrlPattern.newParser = newParser;
  UrlPattern.defaultOptions = defaultOptions;
  UrlPattern.astNodeToRegexString = astNodeToRegexString;
  UrlPattern.astNodeToNames = astNodeToNames;
  UrlPattern.getParam = getParam;
  UrlPattern.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
  UrlPattern.stringify = stringify;
  return UrlPattern;
});
},{}],"TSI8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleansePath = exports.normalizePath = exports.default = void 0;
const config = {
  APP_TITLE: document.title,
  PATH_ROOT: location.pathname,
  PATH_PREFIX: '',
  clearInvalidPath: true,

  handleInvalidRoute(state, config) {
    if (config.clearInvalidPath) state.path = config.PATH_ROOT;
  }

};
var _default = config; // normalize path (always begin with prefix and path root)

exports.default = _default;

const normalizePath = path => {
  return path ? config.PATH_ROOT + config.PATH_PREFIX + cleansePath(path) : path;
};

exports.normalizePath = normalizePath;

const cleansePath = path => {
  return path.replace(new RegExp(`^(${config.PATH_ROOT})?(${config.PATH_PREFIX})?`), '');
};

exports.cleansePath = cleansePath;
},{}],"WZSr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _urlPattern = _interopRequireDefault(require("url-pattern"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/snd/url-pattern 
class Route {
  constructor(path, onChange) {
    path = (0, _config.normalizePath)(path);
    this.path = path;
    this.patt = new _urlPattern.default(path);
    this.onChange = onChange;
  }

  get params() {
    return this.state ? this.state.params : {};
  }

  get rootPath() {
    return this.patt.ast[0].value;
  }

  get isCurrent() {
    return this.state && this.state.isCurrent;
  }

  makePath(params) {
    return this.patt.stringify(params);
  }

  update(props) {
    this.state && this.state.isCurrent && this.state.update(props);
  }

  matches(state) {
    // array of states, get the last matched state in the list
    if (Array.isArray(state)) {
      let matchedState = null;

      for (let i in state) {
        if (this.matches(state[i])) matchedState = state[i];
      }

      return matchedState;
    }

    let params = state ? this.patt.match(state.path ? state.path : state) : false;

    if (params) {
      this.state = state;
      state.params = params;
      return state;
    }

    return null;
  }

  _change(oldState, newState, dir) {
    oldState = this.matches(oldState);
    newState = this.matches(newState); // TODO: change signature to pass newState first

    if (oldState || newState) this.onChange(oldState, newState, dir);
    return !!newState;
  }

}

exports.default = Route;
},{"url-pattern":"AZEX","./config":"TSI8"}],"phBv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireWildcard(require("./config"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class HistoryState {
  constructor(parent, props = {}) {
    this.parent = parent;
    if (!props.path) props.path = '';
    let [path, query] = props.path.split('?');
    let queryData = {};
    this.query = new URLSearchParams(query || props.query || '');

    if (query) {
      this.query.forEach((v, k) => {
        queryData[k] = v;
      });
    } // removing leading slash and #


    props.path = (0, _config.cleansePath)(path);
    this.props = Object.assign({
      query: queryData,
      title: _config.default.APP_TITLE
    }, props);
  }

  get num() {
    return this.props.num;
  }

  get isCurrent() {
    return !history.state || history.state.num == this.num;
  }

  get isBefore() {
    return history.state && history.state.num > this.num;
  }

  get isBack() {
    return this.isBefore();
  }

  get isAfter() {
    return !history.state || history.state.num < this.num;
  }

  get isForward() {
    return this.isAfter();
  }

  get title() {
    return this.props.title;
  }

  set title(title) {
    this.update({
      title: title
    });
  }

  set path(path) {
    path = (0, _config.cleansePath)(path);
    this.update({
      path: path
    });
  }

  get path() {
    return (0, _config.normalizePath)(this.props.path);
  }

  get normalizePath() {
    let path = this.props.path ? this.path : _config.default.PATH_ROOT + _config.default.PATH_PREFIX; // return path

    let query = this.query.toString();
    return path + (query ? '?' + query : '');
  }

  push(props = {}) {
    this.props = Object.assign(this.props, props);
    history.pushState(this.props, null, this.normalizePath);
    this.parent.save();
    if (this.props.title && this.isCurrent) document.title = this.props.title;
  }

  update(props = {}) {
    // do not let num be updated, this is set when newly created
    delete props.num;
    this.props = Object.assign(this.props, props);
    this.parent.save();
    if (!this.isCurrent) return;
    history.replaceState(this.props, null, this.normalizePath);
    if (this.props.title) document.title = this.props.title;
  }

  toJSON() {
    return JSON.stringify(this.props);
  }

}

exports.default = HistoryState;
},{"./config":"TSI8"}],"OLbi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _historyState = _interopRequireDefault(require("./history-state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HistoryStates {
  constructor() {
    let storedData = sessionStorage.getItem('history-states');
    this.states = JSON.parse(storedData || '[]').map(props => new _historyState.default(this, JSON.parse(props)));
    this._current = history.state && history.state.num || -1; // set initial state data

    this.add({
      path: location.pathname + location.hash + location.search
    });
  }

  get length() {
    return this.states.length;
  }

  get current() {
    return this.get(this._current);
  }

  save() {
    sessionStorage.setItem('history-states', JSON.stringify(this.states));
  }

  get(num, create = false, props = {}) {
    if (!this.states[num] && create) {
      props.num = num;
      this.states[num] = new _historyState.default(this, props);
    }

    return this.states[num];
  }

  add(props = {}, push = false) {
    let oldNum = this._current;
    let num = history.state && history.state.num;

    if (num == undefined || push) {
      num = ++this._current; // remove trailing states as they are no longer valid

      this.states.splice(num + 1).forEach(state => {
        state.parent = null;
      });
    } // else if( push )
    //     num++


    let state = this.get(num, true, props); // or create

    if (push) state.push(props);else state.update(props);
    this._current = state.num;
    let step = oldNum > this._current ? -1 : 1;
    let oldStates = []; // console.log(oldNum, this._current);

    while (oldNum != this._current) {
      let oldState = this.get(oldNum);
      if (oldState) oldStates.push(oldState);
      oldNum += step;
    } // console.log(oldStates);


    return [state, oldStates];
  }

}

exports.default = HistoryStates;
},{"./history-state":"phBv"}],"Qeq3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Router = void 0;

var _route = _interopRequireDefault(require("./route"));

var _historyStates = _interopRequireDefault(require("./history-states"));

var _config = _interopRequireWildcard(require("./config"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ROUTES = [];

class Router {
  // NOTE: this must be setup before anything uses router.add()
  config(opts) {
    if (opts.root != undefined) {
      _config.default.PATH_ROOT = opts.root;
      delete opts.root;
    }

    if (opts.prefix != undefined) {
      _config.default.PATH_PREFIX = opts.prefix;
      delete opts.prefix;
    }

    if (opts.title != undefined) {
      _config.default.APP_TITLE = opts.title;
      delete opts.title;
    }

    for (let key in opts) {
      _config.default[key] = opts[key];
    }
  }

  start(opts = {}) {
    opts = Object.assign({
      currentState: null,
      requireState: false
    }, opts);
    this.states = new _historyStates.default(); // listen for state changes and change routes accordingly

    window.addEventListener('popstate', e => {
      if (opts.requireState && !e.state) return; // probably a sheetview change, ignore

      let [newState, oldStates] = this.states.add();
      window.dispatchEvent(new CustomEvent('router:popstate', {
        bubbles: true,
        composed: true,
        detail: {
          path: newState.path,
          state: newState,
          oldStates: oldStates
        }
      }));

      this._changeRoute(oldStates, newState);
    }); // trigger initial route

    this._changeRoute([], this.states.current); // update current state if no path


    if (!this.states.current.path && opts.currentState) {
      this.states.current.update(opts.currentState);
    }
  } // pushes new path/state onto stack (does not trigger route change)


  push(path, props = {}) {
    if (path instanceof _route.default) path = path.state ? path.state.props.path : path.rootPath;
    props.path = path;
    let [newState, oldStates] = this.states.add(props, true);
    window.dispatchEvent(new CustomEvent('router:push', {
      bubbles: true,
      composed: true,
      detail: {
        path: newState.path,
        state: newState,
        oldStates: oldStates
      }
    }));
    return [newState, oldStates];
  } // pushes new path/state and triggers route change


  goTo(path, props) {
    let [newState, oldStates] = this.push(path, props);

    this._changeRoute(oldStates, newState);
  }

  _changeRoute(oldStates, newState) {
    let dir = oldStates.length == 0 || oldStates[0].num < newState.num ? 'forward' : 'back';
    let didMatch = false;
    ROUTES.forEach(route => {
      if (route._change(oldStates, newState, dir)) didMatch = true;
    }); // if none of the routes matched, change current state path back to the root

    if (!didMatch) _config.default.handleInvalidRoute(this.states.current, _config.default);
  }

  add(path, onChange) {
    let route = new _route.default(path, onChange);
    ROUTES.push(route);
    return route;
  }

  get routes() {
    return ROUTES.map(route => route.path);
  }

  get rootRoutes() {
    return ROUTES.map(route => route.rootPath);
  }

} // singleton


exports.Router = Router;

var _default = new Router();

exports.default = _default;
},{"./route":"WZSr","./history-states":"OLbi","./config":"TSI8"}],"R9Fe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _menu = _interopRequireDefault(require("../menu"));

var _router = _interopRequireDefault(require("../../router"));

var _device = _interopRequireDefault(require("../../util/device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PanelControllers = {};

class PanelController extends _litElement.LitElement {
  static for(name) {
    // create a root panel controller if there isn't one
    if (name == 'root' && !PanelControllers[name]) {
      let rootPanelController = document.createElement('b-panels');
      rootPanelController.setAttribute('name', 'root');
      document.body.appendChild(rootPanelController);
      PanelControllers[name] = rootPanelController;
    }

    return PanelControllers[name];
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            position: relative;
            /* z-index: 10; */
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
        }
    `;
  }

  get name() {
    return this.hasAttribute('name') ? this.getAttribute('name') : undefined;
  }

  constructor() {
    super();
    this.panels = new Map();
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.name) {
      if (PanelControllers[this.name]) console.warn('A panel-controller already exists with the name: ', this.name);else PanelControllers[this.name] = this;
    } // TODO: support his in Android? make feature opt in?


    if (this.name == 'root' && _device.default.isiOS) {
      let overflowScrollAt = 0;
      let topPanel = null;
      window.addEventListener('touchend', e => {
        if (overflowScrollAt < -40) {
          topPanel && topPanel.close();
          setTimeout(() => {
            if (topPanel) topPanel.style.top = 0;
            topPanel = null;
          }, 300);
        } else {
          topPanel = null;
        }
      });
      window.addEventListener('scroll', e => {
        if (this.panels.size > 0 && !topPanel) topPanel = this.panelOnTop;
        if (!topPanel || topPanel.opts.disableOverscrollClose === true) return;
        overflowScrollAt = document.scrollingElement.scrollTop;

        if (overflowScrollAt < 0 && topPanel) {
          topPanel.style.top = Math.abs(overflowScrollAt) * 1 + 'px';
        }
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.hasAttribute('name') && PanelControllers[this.name] == this) delete PanelControllers[this.name];
  }

  render() {
    return (0, _litElement.html)`        
        <slot></slot>
    `;
  }

  remove(panel) {
    this.panels.delete(panel);

    this._updatePanels();
  }

  add(panel) {
    // let SheetView and Panel work together
    document.body.setAttribute('ontop', 'panel');
    this.panels.delete(panel);
    this.panels.set(panel, panel);
    if (!this.contains(panel)) this.append(panel);

    this._updatePanels();
  }

  get panelOnTop() {
    let onTop = null;
    this.panels.forEach(panel => {
      if (!onTop && panel.hasAttribute('ontop')) onTop = panel;
    });
    return onTop;
  }

  get panelOnTopWithRoute() {
    let onTop = null;
    this.panels.forEach(panel => {
      if (panel.route) onTop = panel;
    });
    return onTop;
  }

  _updatePanels(updateRoutes = false) {
    let i = 0; // if( this.length == 0 && updateRoutes )
    //     router.push('')
    // else

    this.panels.forEach(panel => {
      if (panel.type != 'modal' && panel.type != 'actionsheet') panel.style.zIndex = 100 + i++;
      let wasOnTop = panel.onTop;

      if (i == this.length) {
        panel.setAttribute('ontop', '');
        if (!wasOnTop && panel.view) panel.view.didBecomeActive && panel.view.didBecomeActive(); // if( updateRoutes && panel.route && !panel.route.isCurrent ){
        //     console.log(panel.route);
        //     // router.push(panel.route.path)
        // }
      } else {
        panel.removeAttribute('ontop');
        if (wasOnTop) setTimeout(() => {
          if (panel.view && panel.view.didBecomeInactive) panel.view.didBecomeInactive();
        });
      }
    });
    let hostEl = this.getRootNode();
    hostEl = hostEl.host || hostEl.body || hostEl;

    if (hostEl) {
      if (this.length == 0) {
        hostEl.classList.remove('b-panel-open');
        hostEl.style.overflow = '';
      } else {
        hostEl.classList.add('b-panel-open');
        hostEl.style.overflow = 'hidden';
      }
    }
  }

  _updateRoute() {
    let i = 0;

    if (this.length == 0) {
      // TEMP - improve interoperability with Groundwork
      if (window.app && app.sv('sheets').sheets.length > 0) app.sv('sheets').setHash();else _router.default.push('');
      this.dispatchEvent(new CustomEvent('panels-closed', {
        bubbles: true,
        composed: true,
        detail: {
          controller: this
        }
      }));
    } else this.panels.forEach(panel => {
      if (panel.onTop && panel.route && !panel.route.isCurrent) {
        // console.log(panel.route, panel.route.state.path);
        _router.default.push(panel.route);
      }
    });
  }

  get length() {
    return this.panels.size;
  }

  map(fn) {
    let resp = [];
    this.panels.forEach(p => resp.push(fn(p)));
    return resp.reverse(); // most recent first
  }

  async quickJump(el) {
    let menu = this.map(panel => {
      return {
        label: panel.title,
        icon: panel.icon || 'window',
        description: panel.path,
        panel: panel
      };
    });
    menu.shift(); // remove first menu as its the open view

    let ts = new Date().getTime(); // quick jump is already open

    if (el.popover) {
      // if quick jump triggered within a second, auto switch to the last opened view
      if (el.quickJumpOpened && ts - el.quickJumpOpened <= 1000 && menu.length > 0) {
        el.popover.close();
        menu[0].panel.open();
      }

      return;
    }

    el.quickJumpOpened = ts;
    if (menu.length == 0) menu.push({
      text: 'No other views open'
    });
    menu.unshift({
      divider: 'Quick Jump Menu'
    }, 'divider');
    let selected = await new _menu.default(menu).popover(el, {
      align: 'bottom-start'
    });
    if (selected) selected.panel.open();
  }

}

customElements.define('b-panels', PanelController);

var _default = customElements.get('b-panels');

exports.default = _default;
},{"lit-element":"bhxD","../menu":"tCYJ","../../router":"Qeq3","../../util/device":"la8o"}],"ZNP1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

class PanelToolbar extends _litElement.LitElement {
  static get properties() {
    return {
      title: {
        type: String
      },
      look: {
        type: String,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.title = '';
    this.look = '';
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: grid;
            grid-template-columns: 1fr max-content 1fr;
            /* background: linear-gradient(to bottom, #fff, #f5f5f5); */
            padding: .5em;
            padding: .4em .5em .3em;
            box-sizing: border-box;
            justify-content: space-between;
            align-items: center;
            border-radius: 4px 4px 0 0;
            min-height: 40px;
            grid-column: 1/-1; /* full width */
        }

        :host([hidden]) { display: none; }

        /* @media (max-width: 699px) {
            .middle {
                display: none;
            }

            :host {
                grid-template-columns: auto auto;
            }
        } */

        :host([overlay]) {
            background: none;
            box-shadow: none;
            position: absolute;
            z-index: 100;
            pointer-events: none;
            top: 0;
            left: 0;
            width: 100%;
        }

        :host([overlay]) > div * {
            pointer-events: initial;
        }

        :host([shadow]) {
            box-shadow: rgba(0,0,0,.2) 0 0 6px;
        }

        :host([look="white"]) {
            background: #fff;
        }

        :host([look="silver"]) {
            background: linear-gradient(to bottom,#eee,#ddd);
            border-bottom: solid 1px #bbb;
        }

        :host([look="clear"]) {
            background: transparent;
        }

        :host([look="dark"]) {
            /* background: #2c3033; */
            background: linear-gradient(to bottom,#303538,#2c3033);
            color: #fff;
        }

        :host([look="dark"]) b-btn[outline] {
            --color: #ddd
        }

        slot[name="title"] {
            font-weight: bold;
            font-size: 1.1em;
        }

        :host([notitle]) slot[name="title"] {
            display: none;
        }

        .right {
            text-align: right;
        }

        @media print {
            b-btn {
                display: none; /* assume we dont want buttons to display on print */
            }
        }

    `;
  }

  render() {
    return (0, _litElement.html)`
        <div class="left">
            <slot name="close-btn">
                <b-btn outline icon="cancel-1" title="Right+click for quick jump menu"
                    @click=${this.close} @contextmenu=${this.quickJump}></b-btn>
            </slot>
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot name="title">${this.title}</slot>
            <slot name="middle"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    `;
  }

  close() {
    this.panel && this.panel.close();
  }

  quickJump(e) {
    if (!this.panel || this.panel.opts.quickJump !== true) return;
    e.preventDefault();
    this.panel && this.panel.panelController && this.panel.panelController.quickJump(e.target);
  }

}

customElements.define('b-panel-toolbar', PanelToolbar);

var _default = customElements.get('b-panel-toolbar');

exports.default = _default;
},{"lit-element":"bhxD"}],"cmZt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Panel = exports.ActionSheet = exports.Modal = exports.register = exports.PanelDefaults = void 0;

var _litElement = require("lit-element");

var _controller = _interopRequireDefault(require("./controller"));

var _router = _interopRequireDefault(require("../../router"));

var _route = _interopRequireDefault(require("../../router/route"));

var _device = _interopRequireDefault(require("../../util/device"));

require("./toolbar");

require("../../elements/btn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PanelDefaults = {
  type: '',
  closeBtn: false,
  title: '',
  width: '100%',
  height: '100%',
  anchor: 'right',
  animation: '',
  quickJump: true,
  closeOnEsc: false,
  controller: null,
  // root controller will be created and used
  disableBackdropClick: false,
  disableOverscrollClose: false
};
exports.PanelDefaults = PanelDefaults;

class RegisteredPanels {
  constructor() {
    this.register = new Map();
  }

  set(key, data) {
    return this.register.set(key, data);
  }

  get(path) {
    return this.register.get(path);
  }

  add(path, view, opts = {}) {
    if (this.get(path)) {
      return console.warn(`A panel is already registered for ${path}`);
    }

    this.set(path, {
      view,
      opts
    });
    if (opts.route !== false) this.get(path).route = _router.default.add(path, (oldState, newState, dir) => {
      if (this._initiate(path)) this.get(path).panel._routeChange(oldState, newState, dir);
    });
  }

  _initiate(path) {
    let registered = this.get(path);

    if (!registered) {
      console.error(`Panel for ${path} not found`);
      return false;
    } // first time this panel is being requested


    if (!registered.panel) {
      if (typeof registered.view == 'function') {
        registered.panel = new Panel();
        registered.panel.html = registered.view;
      } else registered.panel = new Panel(registered.view, registered.opts || {});

      if (registered.route) registered.panel.route = registered.route; // copy properties to panel

      if (registered.opts) {
        for (let key in registered.opts) {
          if (key != 'route') registered.panel[key] = registered.opts[key];
        }
      }
    }

    return true;
  }

  open(path) {
    if (!this._initiate(path)) return;
    let registered = this.get(path);
    if (registered.route) _router.default.goTo(registered.route);else registered.panel.open();
  }

}

const register = new RegisteredPanels();
exports.register = register;

const Modal = function (view, opts = {}) {
  opts = Object.assign({
    type: 'modal'
  }, opts);
  if (opts.closeBtn && opts.closeOnEsc === undefined) opts.closeOnEsc = true;
  return new Panel(view, opts).open();
};

exports.Modal = Modal;

const ActionSheet = function (view, opts = {}) {
  opts = Object.assign({
    type: 'actionsheet'
  }, opts);
  if (opts.closeOnEsc === undefined) opts.closeOnEsc = true;
  return new Panel(view, opts).open();
};

exports.ActionSheet = ActionSheet;

class Panel extends _litElement.LitElement {
  static get properties() {
    return {
      title: {
        type: String
      },
      width: {
        type: String
      },
      height: {
        type: String
      },
      anchor: {
        type: String,
        reflect: true
      },
      type: {
        type: String,
        reflect: true
      },
      animation: {
        type: String,
        reflect: true
      }
    };
  }

  static register(path, view, opts) {
    // move register to end of call stack
    setTimeout(() => {
      register.add(path, view, opts);
    });
  }

  static open(path) {
    register.open(path);
  }

  static get animationTime() {
    return 300;
  }

  constructor(view, opts = {}) {
    super();
    let defaultOpts = Object.assign({}, PanelDefaults);

    if (opts.type == 'modal') {
      defaultOpts.width = '';
      defaultOpts.height = '';
      defaultOpts.anchor = 'center';
      defaultOpts.animation = 'scale';
    }

    if (opts.type == 'actionsheet') {
      defaultOpts.width = '100%';
      defaultOpts.height = '';
      defaultOpts.anchor = 'bottom';
    }

    opts = Object.assign(defaultOpts, opts);
    this.animation = opts.animation;
    this.type = opts.type;
    this.closeBtn = opts.closeBtn;
    this.title = opts.title;
    this.width = opts.width;
    this.height = opts.height;
    this.anchor = opts.anchor;
    this.panelController = opts.controller;
    this.opts = opts;

    if (typeof view == 'function') {
      this.html = view;
    } else if (typeof view == 'string') {
      this.view = document.createElement(view);
    } else if (view instanceof HTMLElement) {
      this.view = view;
    }
  }

  onKeydown(e) {
    if (!this.onTop) return;
    if (this.opts.closeOnEsc && e.key == 'Escape') this.close();
    this.opts.onKeydown && this.opts.onKeydown(e);
    this.view.onKeydown && this.view.onKeydown(e);
  } // DEPRECATED: hash changed to path


  get hash() {
    console.warn('Panel: `.hash` is deprecated; use `.path`');
    this.path;
  }

  get path() {
    return this.route && this.route.state.props.path;
  }

  get route() {
    return this.__route;
  }

  set route(route) {
    if (this.route) {
      return console.warn('Panel routes can only be set once');
    }

    this.__route = route instanceof _route.default ? route : _router.default.add(route, this._routeChange.bind(this));
  }

  _routeChange(oldState, newState, dir) {
    // console.log(this.title, dir, oldState, newState);
    let detail = {
      oldState: oldState,
      newState: newState
    };

    if (newState) {
      newState.update({
        title: this.title
      });
      if (!this.isOpen && dir == 'forward') newState.update({
        didEnter: true
      });
      this.open();
      detail.opened = true;
    }

    if (oldState && !newState) {
      if (oldState.isAfter && oldState.props.didEnter || oldState.isBefore && oldState.props.didExit) {
        this._close(_device.default.isiOS);

        detail.closed = true;
      } // if( (oldState.isBefore && oldState.props.didEnter)
      // || (oldState.isAfter && oldState.props.didExit) )
      //     this.open()

    }

    if (oldState && newState) {// console.log('same view, but new state', newState.params);
      // if( this.view && this.view.onOpen ){
      //     this.view.onOpen(this.route.state)
      // }
    }

    this.dispatchEvent(new CustomEvent('route-changed', {
      bubbles: true,
      composed: true,
      detail: detail
    }));
  }

  render() {
    return (0, _litElement.html)`
        <div class="backdrop"></div>
        <main style="${this.width ? `width:${this.width};` : ''}${this.height ? `height:${this.height};` : ''}">
            <b-btn icon="cancel-1" pill class="modal-close-btn" @click=${this.close} ?hidden=${this.closeBtn !== true}></b-btn>
            <slot></slot>
            <div class="inlinehtml">
                ${this.html}
            </div>
        </main>
    `;
  }

  animate(effect) {
    if (!effect) return;
    let main = this.shadowRoot.querySelector('main');
    main.classList.add(effect);
    setTimeout(function () {
      main.classList.remove(effect);
    }, 1000);
  }

  bounce() {
    this.animate('bounce');
  }

  shake() {
    this.animate('shake');
  }

  set html(fn) {
    this.__html = fn;
  }

  get html() {
    return this.__html ? this.__html.call(this) : '';
  }

  set view(view) {
    if (this.view) {
      this.view.panel = null;
      this.view.remove();
    }

    if (this.toolbar) {
      this.toolbar.panel = null;
      this.toolbar = null;
    }

    this.__view = view;

    if (this.view) {
      // already in the DOM, add a placeholder so we can put this view back after closing
      if (this.view.offsetParent) {
        this.__viewOriginalPlacement = document.createElement('span');

        this.__viewOriginalPlacement.classList.add('panel-view-placeholder');

        this.__viewOriginalPlacement.style.position = 'absolute';
        this.view.replaceWith(this.__viewOriginalPlacement);
      }

      this.view.panel = this;
      this.appendChild(this.view);

      this._linkToolbar();
    }
  }

  get view() {
    return this.__view;
  }

  get isOpen() {
    return this.hasAttribute('open');
  }

  get onTop() {
    return this.hasAttribute('ontop') || this.type == 'modal' && this.parentElement.lastElementChild == this;
  }

  firstUpdated() {
    this._linkToolbar();

    this.shadowRoot.querySelector('.backdrop').addEventListener('click', e => {
      if (this.opts.onBackdropClick && this.opts.onBackdropClick() === false) return;
      if (this.opts.disableBackdropClick !== true) this.close();
    });
  }

  _linkToolbar() {
    setTimeout(() => {
      if (this.view && this.view.shadowRoot) this.toolbar = this.view.shadowRoot.querySelector('b-panel-toolbar');else this.toolbar = this.shadowRoot.querySelector('b-panel-toolbar') || this.querySelector('b-panel-toolbar');

      if (this.toolbar) {
        this.toolbar.panel = this;
        this.toolbar.title = this.title;
      }
    }, 0);
  }

  get panelController() {
    return this.__panelController;
  }

  set controller(val) {
    this.panelController = val;
  }

  set panelController(val) {
    if (typeof val === 'string') {
      let _val = val;
      val = _controller.default.for(val);
      if (!val) console.warn('Panel controller `' + _val + '` does not exist, root will be used');
    }

    this.__panelController = val;
  }

  async open(...args) {
    if (this.route && this.route.state.props.controller) this.controller = this.route.state.props.controller; // if no controller set, use the root controller

    if (!this.panelController) {
      this.panelController = _controller.default.for('root');
    }

    if (this.view && this.view.willOpen) {
      if ((await this.view.willOpen(this.route.state)) === false) return false;
    }

    this._onKeydown = this._onKeydown || this.onKeydown.bind(this);
    window.removeEventListener('keydown', this._onKeydown, true);
    window.addEventListener('keydown', this._onKeydown, true);
    this.panelController.add(this);
    setTimeout(() => {
      this.setAttribute('open', '');

      if (this.view && this.view.onOpen) {
        if (this.route) args.unshift(this.route.state);
        this.view.onOpen(...args);
      }
    }, 100);
    return this;
  }

  set title(str) {
    this.__title = str;
    this.route && this.route.update({
      title: str
    });
    if (this.toolbar) this.toolbar.title = str;
  }

  get title() {
    return this.__title;
  }

  get params() {
    return this.route ? this.route.state.params : {};
  }

  async close() {
    if (this.opts.onClose && (await this.opts.onClose()) === false) return;
    if (this.view && this.view.onClose && (await this.view.onClose()) === false) return;
    this.route && this.route.update({
      didExit: true
    });

    this._close();

    if (this.route) this.panelController._updateRoute(); // put the view back to it's original DOM location (if it had one)

    if (this.__viewOriginalPlacement) {
      this.__viewOriginalPlacement.replaceWith(this.view);

      delete this.__viewOriginalPlacement;
    }

    return this;
  }

  _close(immediate = false) {
    window.removeEventListener('keydown', this._onKeydown, true);
    this.panelController.remove(this);
    this.removeAttribute('open');
    if (immediate) this.remove();else setTimeout(() => {
      this.remove();
    }, Panel.animationTime);
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            pointer-events: initial;
            display: flex;
            position: absolute;
            overflow: visible;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--b-panel-overlay, rgba(0,0,0,.4)); /* overlay */
            opacity: 0;
            transition: opacity ${Panel.animationTime}ms cubic-bezier(0.4, 0, 0.2, 1),
                        background-color ${Panel.animationTime}ms cubic-bezier(0.4, 0, 0.2, 1);
            --radius: var(--b-panel-radius, 5px);
            --radius-top: var(--radius);
            --radius-bottom: 0;
        }

        :host([type="modal"]) {
            z-index: 1000; /* always on top */
        }

        :host([type="actionsheet"]) {
            z-index: 1001 !important;
        }

        :host > main {
            pointer-events: none;
            position: absolute;
            right: 0;
            min-width: min(80vw, 300px);
            min-height: 1em;
            max-width: var(--max-width, 100%);
            max-height: var(--max-height, 100%);
            overflow: visible;
            display: flex;
            flex-direction: column;
            background: var(--b-panel-bgd, #fff);
            box-shadow: var(--b-panel-shadow, rgba(0,0,0,.2) 0 3px 10px);
            border-radius: var(--radius-top) var(--radius-top) var(--radius-bottom) var(--radius-bottom);
            transition: ${Panel.animationTime}ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([type="modal"]) > main {
            max-height: var(--max-height, 96%);
            max-width: var(--max-width, 96%);
        }

        :host([type="actionsheet"]) main {
            max-width: var(--b-panel-actionsheet-max-w, 500px);
            margin-bottom: 0;
            max-height: var(--b-panel-actionsheet-max-h, 70vh);
            /* --radius: 12px; */
        }

        :host([type="actionsheet"]) > main {
            transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* :host([type="actionsheet"][anchor="top"]) > main {
            padding-top: env(safe-area-inset-top);
        } */

        :host([type="actionsheet"][anchor="bottom"]) > main {
            padding-bottom: env(safe-area-inset-bottom);
        }

        :host([open]) {
            opacity: 1;
        }

        :host([open]) > main {
            opacity: 1;
            transform: none !important;
        }

        :host([anchor="right"]) > main {
            transform: translateX(100px);
            height: 100%;
        }

        :host([anchor="left"]) > main {
            right: auto;
            left: 0;
            transform: translateX(-100px);
            height: 100%;
        }

        :host([anchor="center"]) > main,
        :host([anchor="top"]) > main,
        :host([anchor="bottom"]) > main {
            position: relative;
            margin: auto auto;
            transform: translateY(100px);
        }

        :host([anchor="center"]) > main {
            border-radius: var(--radius);
        }

        :host([anchor="center"][animation="scale"]) > main {
            transform: scale(.5);
        }

        :host([anchor="center"][animation="fade"]) > main {
            transform: none;
        }

        :host([anchor="top"]) > main {
            margin-top: 0;
            transform: translateY(-100px);
            border-radius: 0 0 var(--radius) var(--radius);
        }

        :host([anchor="bottom"]) > main {
            margin-bottom: 0;
        }

        .backdrop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .modal-close-btn {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 10000;
            transform: translate(50%, -50%);
        }

        main > slot::slotted(*) {
            width: 100%;
            pointer-events: all;
            /* display: grid;
            grid-template-rows: auto 1fr; */
        }

        main > slot::slotted(.dialog) {
            font-size: 1.1em;
        }

        main > slot::slotted(b-embed) {
            border-radius: var(--radius);
            overflow: hidden;
        }

        main {
            display: grid;
        }

        main > section {
            padding: 1em;
        }

        .inlinehtml {
            display: contents;
        }

        .inlinehtml > * {
            pointer-events: all;
        }

        @media print {
            :host {
                background: none;
                position: static;
            }

            :host(:not([ontop])) {
                display: none !important;
            }

            :host > main {
                width: 100% !important;
                border-radius: 0;
                box-shadow: none;
            }
        }

        @keyframes bounce {
            from,
            20%,
            53%,
            80%,
            to {
                -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }

            40%,
            43% {
                -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -30px, 0);
                transform: translate3d(0, -30px, 0);
            }

            70% {
                -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -15px, 0);
                transform: translate3d(0, -15px, 0);
            }

            90% {
                -webkit-transform: translate3d(0, -4px, 0);
                transform: translate3d(0, -4px, 0);
            }
        }

        @keyframes shake {
            from,
            to {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }

            15%,
            45%,
            75% {
                -webkit-transform: translate3d(-10px, 0, 0);
                transform: translate3d(-10px, 0, 0);
            }

            30%,
            60%,
            90% {
                -webkit-transform: translate3d(10px, 0, 0);
                transform: translate3d(10px, 0, 0);
            }
        }

        .bounce {
            animation-name: bounce;
            transform-origin: center bottom;
            animation-duration: 1s;
            animation-fill-mode: both;
        }

        .shake {
            animation-name: shake;
            animation-duration: 700ms;
            animation-fill-mode: both;
        }
    `;
  }

}

exports.Panel = Panel;
customElements.define('b-panel', Panel);

var _default = customElements.get('b-panel');

exports.default = _default;
},{"lit-element":"bhxD","./controller":"R9Fe","../../router":"Qeq3","../../router/route":"WZSr","../../util/device":"la8o","./toolbar":"ZNP1","../../elements/btn":"DABr"}],"sHUN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

const NotifControllers = {};
customElements.define('b-notifs', class extends _litElement.LitElement {
  // createRenderRoot(){ return this }
  static get(name = 'main') {
    if (name == 'main' && !NotifControllers[name]) {
      let controller = document.createElement('b-notifs');
      controller.setAttribute('name', 'main');
      document.body.appendChild(controller);
      NotifControllers[name] = controller;
    }

    return NotifControllers[name];
  }

  get name() {
    return this.hasAttribute('name') ? this.getAttribute('name') : undefined;
  }

  constructor() {
    super();

    if (this.name) {
      if (NotifControllers[this.name]) console.warn('A `b-notifs` controller already exists with the name: ', this.name);else NotifControllers[this.name] = this;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.name) delete NotifControllers[this.name];
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.name && !NotifControllers[this.name]) NotifControllers[this.name] = this;
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: block;
            pointer-events: none;
            
            overflow: hidden;
            position:absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1200;
            --padding: var(--b-notif-padding, 1em);
        }

        :host([name="main"]) {
            position: fixed;
            top: env(safe-area-inset-top);
            left: env(safe-area-inset-left);
            bottom: env(safe-area-inset-bottom);
            right: env(safe-area-inset-right);
        }

        @media (max-width:699px), (max-height: 699px) {
            :host {
                position: fixed;
                top: env(safe-area-inset-top);
                left: env(safe-area-inset-left);
                bottom: env(safe-area-inset-bottom);
                right: env(safe-area-inset-right);
            }
        }

        slot {
            position: absolute;
            display: flex;
        }

        slot[name="top"],
        slot[name="bottom"] {
            width: 100%;
            align-items: center;
        }

        slot[name*="top"] {
            top: 0;
            flex-direction: column;
            padding-top: var(--padding);
        }

        slot[name*="bottom"] {
            bottom: 0;
            flex-direction: column-reverse;
            padding-bottom: var(--padding);
        }

        slot[name*="left"] {
            left: 0;
            padding-left: var(--padding);
            align-items: flex-start;
        }

        slot[name*="right"] {
            right: 0;
            padding-right: var(--padding);
            align-items: flex-end;
        }

        @media (max-width:699px) {
            slot {
                padding: 0 !important;
                position: static !important;
                --b-notif-width: 100%;
            }

            .top {
                position: absolute;
                top: 0;
                display: flex;
                flex-direction: column;
                width: 100%;
                padding: var(--padding);
                box-sizing: border-box;
            }

            .bottom {
                position: absolute;
                bottom: 0;
                display: flex;
                flex-direction: column;
                width: 100%;
                padding: var(--padding);
                box-sizing: border-box;
            }
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <div class="bottom">
            <slot name="bottom-left"></slot>
            <slot name="bottom"></slot>
            <slot name="bottom-right"></slot>
        </div>

        <div class="top">
            <slot name="top-left"></slot>
            <slot name="top"></slot>
            <slot name="top-right"></slot>
        </div>
        
    `;
  }

});

var _default = customElements.get('b-notifs');

exports.default = _default;
},{"lit-element":"bhxD"}],"HXsq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _default = (0, _litElement.css)`
:host {
    display: block;
    position:relative;
    pointer-events: all;
    width: var(--b-notif-width, 300px);
    max-width: 100%;

    /* overflow: hidden; */

    transition: 
        height 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms,
        opacity 300ms,
        transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

    opacity: 0;
    will-change: transform; 
}

:host([slot*="right"]) { transform: translateX(100%); }
:host([slot*="left"]) { transform: translateX(-100%); }
:host([slot="top"]) { transform: translateY(-100%); }
:host([slot="bottom"]) { transform: translateY(100%); }

:host([animation="grow"]) {
    transform: scale(.8)
}

:host([animation="bounce"]) {
    transform: none;
}

:host([animation="bounce"].entered) {
    animation-name: bounce;
    animation-duration: 700ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: forwards;
}

:host([animation="fade"]) {
    transform: none;
}

:host([slot*="top"]) {
    --spacing-bottom: var(--padding);
}

:host([slot*="bottom"]) {
    --spacing-top: var(--padding);
}

:host(.entered) {
    opacity: 1;
    transform: none;
}

:host(.exit) {
    height: 0 !important;
}

:host([color="red"]) {
    --b-notif-color: #fff;
    --b-notif-bgd: var(--red);
}

:host([color="blue"]) {
    --b-notif-color: #fff;
    --b-notif-bgd: var(--blue);
}

:host([color="green"]) {
    --b-notif-color: #fff;
    --b-notif-bgd: var(--green);
}

:host([color="orange"]) {
    --b-notif-color: #222;
    --b-notif-bgd: var(--orange);
}

:host([color="amber"]) {
    --b-notif-color: var(--gray-900);
    --b-notif-bgd: var(--amber);
}

main {
    --radius: var(--b-notif-radius, 4px);
    border-radius: var(--radius);
    color: var(--b-notif-color, #fff);
    background: var(--b-notif-bgd, #333);
    margin-top: var(--spacing-top, 0);
    margin-bottom: var(--spacing-bottom, 0);

    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
                0px 6px 10px 0px rgba(0,0,0,0.14),
                0px 1px 18px 0px rgba(0,0,0,0.12);
}

slot {
    display: block;
}


:host {
    --b-notif-btn-color: var(--b-notif-color);
}

:host([color]) {
    --b-notif-btn-bgd: rgba(255,255,255,.1);
}

@keyframes bounce {
  0% { transform: scale(0.8); }
  14% { transform: scale(1.1); }
  28% { transform: scale(.9); }
  42% { transform: scale(1.1); }
  70% { transform: scale(1); }
`;

exports.default = _default;
},{"lit-element":"bhxD"}],"tUj8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  sticky: {
    closeOnClick: false,
    autoClose: false
  },
  alert: {},
  error: {
    icon: 'attention-circle',
    color: 'red',
    animation: 'bounce'
  },
  failed: {
    icon: 'cancel-circled',
    color: 'red'
  },
  success: {
    icon: 'ok-circled',
    color: 'green'
  },
  info: {
    icon: 'info-circled',
    color: 'blue'
  },
  warning: {
    icon: 'attention-1',
    color: 'orange'
  }
};
exports.default = _default;
},{}],"TZ6L":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeBtn;
exports.cancelBtns = void 0;
const btnPresets = {
  'dismiss': {
    label: 'Dismiss'
  },
  'cancel': {
    label: 'Cancel'
  },
  'no': {
    label: 'No'
  },
  'done': {
    label: 'Done'
  },
  'ok': {
    label: 'Okay',
    color: 'primary'
  },
  'yes': {
    label: 'Yes',
    color: 'primary'
  },
  'save': {
    label: 'Save',
    color: 'primary'
  },
  'create': {
    label: 'Create',
    color: 'primary'
  },
  'delete': {
    label: 'Delete',
    color: 'red'
  }
};
const cancelBtns = ['dismiss', 'cancel', 'no'];
exports.cancelBtns = cancelBtns;

function makeBtn(opts = {}, i) {
  if (typeof opts == 'string') {
    if (!btnPresets[opts]) return console.warn('Button preset `' + opts + '` does not exist');
    opts = btnPresets[opts];
  }

  let {
    label = '',
    className = '',
    //'text-btn fw-bold',
    color = '',
    icon = '',
    text = true
  } = opts; // icon = icon ? 'icon-'+icon : ''

  return `<b-btn ${text && 'text'} icon="${icon}" color="${color}" class="${className}">${label}</b-btn>`; // return `<span class="btn ${className} ${color} ${icon}">${label}</span>`
}
},{}],"euwv":[function(require,module,exports) {
"use strict";

var _litElement = require("lit-element");

_litElement.LitElement.prototype.emitEvent = function (eventName, detail = null) {
  var event = new CustomEvent(eventName, {
    bubbles: true,
    composed: true,
    detail: detail
  });
  this.dispatchEvent(event);
};
},{"lit-element":"bhxD"}],"Cw18":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _unsafeHtml = require("lit-html/directives/unsafe-html");

var _makeBtn = _interopRequireWildcard(require("../dialog/make-btn"));

require("../../helpers/lit-element/events");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

customElements.define('b-snackbar', class extends _litElement.LitElement {
  static get properties() {
    return {
      msg: {
        type: String
      },
      btns: {
        type: Array
      },
      icon: {
        type: String
      }
    };
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            padding: var(--b-snackbar-padding, .85em 1em);
            display: grid;
            grid-template-columns: auto 1fr max-content;
            align-items: center;
        }

        .icon {
            line-height: 0;
        }

        .icon > b-icon,
        .icon > .icon {
            margin: -.5em 0;
            margin-right: .75em;
            --size: 1.2em;
            vertical-align: middle;
        }

        .msg {
            margin: 0.05em 0 -.05em; /* better alignment with icon and btns */
        }

        .btns {
            margin-top: -0.05em;
            margin-right: calc(-.5 * var(--padding));
            margin-left: calc(-.5 * var(--padding));
        }

        .btns b-btn {
            font-weight: bold;
            text-transform: uppercase;
            margin: -1em 0;
            vertical-align: middle;
        }

        .btns b-btn[color=''] {
            color: var(--b-notif-btn-color, #fff);
        }

        :host([color]) .btns b-btn  {
            color: var(--b-notif-btn-color, #fff);
        }

        @media (hover){
            .btns b-btn:hover {
                --bgdColor: var(--b-notif-btn-bgd, rgba(0,0,0,.05));
            }
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <div class="icon">${this.renderIcon()}</div>
        <div class="msg">${this.msg}</div>
        <div class="btns" @click=${this.onBtnClick}>
            ${this.btns.map(btn => this.renderBtn(btn))}
        </div>
    `;
  }

  renderIcon() {
    if (!this.icon) return '';
    if (typeof this.icon == 'string') return (0, _litElement.html)`<b-icon name="${this.icon}"></b-icon>`;else return this.icon;
  }

  renderBtn(btn) {
    return (0, _litElement.html)`${(0, _unsafeHtml.unsafeHTML)((0, _makeBtn.default)(btn))}`;
  }

  onBtnClick(e) {
    e.stopPropagation();
    let index = Array.from(e.currentTarget.children).indexOf(e.target);
    let btnData = index > -1 ? this.btns[index] : e.target;
    if (_makeBtn.cancelBtns.includes(btnData)) btnData = undefined;
    this.emitEvent('click', btnData);
  }

});

var _default = customElements.get('b-snackbar');

exports.default = _default;
},{"lit-element":"bhxD","lit-html/directives/unsafe-html":"jTPt","../dialog/make-btn":"TZ6L","../../helpers/lit-element/events":"euwv"}],"XAiK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _controller = _interopRequireDefault(require("./controller"));

var _device = _interopRequireDefault(require("../../util/device"));

var _style = _interopRequireDefault(require("./style"));

var _types = _interopRequireDefault(require("./types"));

require("./snackbar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// list of open notifs
const NOTIFS = new Map();
window.NOTIFS = NOTIFS;
customElements.define('b-notif', class extends _litElement.LitElement {
  static get styles() {
    return _style.default;
  }

  static get properties() {
    return {
      nid: {
        type: String,
        reflect: true
      },
      msg: {
        type: String
      },
      btns: {
        type: Array
      },
      icon: {
        type: String
      },
      color: {
        type: String,
        reflect: true
      },
      width: {
        type: String
      },
      animation: {
        type: String,
        reflect: true
      }
    };
  }

  constructor(opts = {}) {
    super();
    this.onWindowFocus = this.onWindowFocus.bind(this);
    this.onWindowBlur = this.onWindowBlur.bind(this);

    let controller = _controller.default.get(opts.controller || 'main');

    this.opts = Object.assign({
      nid: String(Math.round(Math.random() * 10000)),
      msg: '',
      icon: '',
      btns: [],
      animation: _device.default.minScreenSize <= 699 ? 'grow' : 'slide',
      animationForReplace: 'grow',
      autoClose: 4000,
      closeOnClick: true,
      anchor: 'bottom-right',

      //device.minScreenSize <= 699 ? 'bottom' : 'bottom-right',
      onClose() {},

      onClick() {}

    }, _types.default[opts.type] || {}, controller.defaults || {}, opts);
    let props = this.constructor.properties;

    for (let key in this.opts) {
      if (props[key] != undefined) this[key] = this.opts[key];
    }

    this.slot = this.opts.anchor;
    this.addEventListener('click', this.onClick, false);
    this.addEventListener(_device.default.isMobile ? 'touchdown' : 'mouseover', this.onMouseOver);
    this.addEventListener(_device.default.isMobile ? 'touchend' : 'mouseout', this.onMouseOut);

    if (this.opts.view) {
      this.appendChild(this.opts.view);
      this.opts.view.notif = this;
    }

    let existingNotif = NOTIFS.get(this.nid);
    NOTIFS.set(this.nid, this);

    if (existingNotif) {
      existingNotif.replaceWith(this);
      return;
    }

    if (controller) controller.appendChild(this);
  }

  close(btn) {
    return new Promise(resolve => {
      this.style.height = this.getBoundingClientRect().height + 'px';
      this.classList.remove('entered');
      setTimeout(() => {
        this.classList.add('exit');
      }, 100);
      setTimeout(() => {
        this.remove();
        NOTIFS.delete(this.nid);
        this.opts.onClose(this);
        if (this.opts.view) delete this.opts.view.notif;
        resolve(btn);
      }, 700);
    });
  }

  replaceWith(el) {
    let animation = el.animation; // let's reduce visual animation when replacing

    if (animation == 'slide') {
      this.animation = this.opts.animationForReplace;
      el.animation = this.opts.animationForReplace;
    }

    this.classList.remove('entered'); // setTimeout(()=>{

    super.replaceWith(el);
    this.opts.onClose(this);
    if (this.opts.view) delete this.opts.view.notif;
    setTimeout(() => {
      el.animation = animation;
    }, 310); // },310)
  }

  onClick(btn) {
    if (btn instanceof MouseEvent || window.TouchEvent && btn instanceof TouchEvent) btn = undefined;
    if (this.opts.onClick(this, btn) !== false && this.opts.closeOnClick) this.close(btn);
  }

  onWindowFocus() {
    this.autoClose(3000);
  }

  onWindowBlur() {// this.autoClose(false)
  }

  onMouseOver(e) {
    e.stopPropagation();
    this.autoClose(false);
  }

  onMouseOut(e) {
    e.stopPropagation();
    this.autoClose(3000);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('blur', this.onWindowBlur);
    window.addEventListener('focus', this.onWindowFocus);
    if (this.opts.width) this.style.width = this.opts.width;
    setTimeout(() => {
      this.classList.add('entered');
    }, 100);
    this.autoClose();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('blur', this.onWindowBlur);
    window.removeEventListener('focus', this.onWindowFocus);
  }

  autoClose(start = true) {
    clearTimeout(this._autoCloseTimeout);
    if (!document.hasFocus()) return; // use the `autoClose` delay if no time given OR we've never started the autoClose

    let delay = start === true || !this._autoCloseTimeout ? this.opts.autoClose : start; // requested to stop, or setting turned off

    if (!start || !this.opts.autoClose) return;
    this._autoCloseTimeout = setTimeout(() => {
      this.close();
    }, delay);
  }

  render() {
    return (0, _litElement.html)`
        <main>
        <slot>
            <b-snackbar
                .icon=${this.icon}
                .msg=${this.msg}
                .btns=${this.btns}
                ?color=${!!this.color}
                @click=${this.onSnackbarClick}></b-snackbar>
        </slot>
        </main>
    `;
  }

  onSnackbarClick(e) {
    e.stopPropagation();
    let data = e.constructor.name == 'CustomEvent' ? e.detail : undefined;
    this.onClick(data);
  }

});

var _default = customElements.get('b-notif');

exports.default = _default;
let notifClass = customElements.get('b-notif');

for (let key in _types.default) {
  if (!notifClass[key]) notifClass[key] = (msg, opts = {}) => {
    // string or lit-html
    if (typeof msg == 'string' || msg.constructor.name == 'TemplateResult') {
      opts = opts || {};
      opts.msg = msg;
    }

    let Notif = customElements.get('b-notif');
    return new Notif(Object.assign({}, _types.default[key], opts));
  };
}
},{"lit-element":"bhxD","./controller":"sHUN","../../util/device":"la8o","./style":"HXsq","./types":"tUj8","./snackbar":"Cw18"}],"HbKK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litHtml = require("lit-html");

var _device = _interopRequireDefault(require("../../util/device"));

var _panel = _interopRequireDefault(require("../panel"));

var _notif = _interopRequireDefault(require("../notif"));

var _popover = _interopRequireDefault(require("../popover"));

var _makeBtn = _interopRequireWildcard(require("./make-btn"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FIXME: this module needs to be refactored using lit-element to better apply styles
const styles = require('./style.less');

class Dialog {
  constructor(opts = {}) {
    this.opts = opts = Object.assign({
      icon: '',
      title: '',
      msg: '',
      view: null,
      w: null,
      btns: ['dismiss'],
      className: ''
    }, opts);
    this.el = document.createElement('div');
    opts.className += ' nopadding dialog';
    if (this.opts.icon) opts.className += ' sideicon';
    opts.className.split(' ').forEach(className => className && this.el.classList.add(className));
    let [iconName, iconClass] = (opts.icon || '').split(' ');
    let icon = opts.icon ? `<b-icon name="${iconName}" class="${iconClass || ''}"></b-icon>` : '';
    let btns = opts.btns ? opts.btns.map(btn => btn && (0, _makeBtn.default)(btn)).join("\n") : '';
    if (opts.icon === 'spinner') icon = `<b-spinner></b-spinner>`;else if (opts.icon && opts.icon[0] == '<') icon = opts.icon;else if (customElements.get(opts.icon)) icon = `<${opts.icon}></${opts.icon}>`;
    this.el.innerHTML = `${typeof styles === 'string' ? `<style>${styles}</style>` : ''}
							<div class="d-icon">${icon}</div>
							<h2 class="d-title">${opts.title}</h2>
							<div class="d-msg">${opts.msg}</div>
							<div class="d-btns">${btns}</div>`;

    if (opts.msg instanceof _litHtml.TemplateResult) {
      (0, _litHtml.render)(opts.msg, this.el.querySelector('.d-msg'));
    }

    if (this.opts.w) this.el.style.width = typeof this.opts.w == 'number' ? this.opts.w + 'px' : this.opts.w;

    if (this.opts.view) {
      if (!this.opts.icon && !this.opts.title && !this.opts.msg) {
        if (this.opts.view instanceof HTMLElement) {
          this.el.innerHTML = `<div class="d-btns">${btns}</div>`;
          this.el.prepend(this.opts.view);
        } else {
          this.el.innerHTML = `${this.opts.view}<div class="d-btns">${btns}</div>`;
        }
      } else {
        this.el.querySelector('.d-msg').classList.add('custom-view');
        this.el.querySelector('.d-msg').appendChild(this.opts.view);
      }
    }

    this.el.addEventListener('click', this.onClick.bind(this), true);
    this.promise = new Promise(resolve => {
      this._resolve = resolve;
    });
  }

  set title(str) {
    this.opts.title = str;
    let el = this.el.querySelector('.d-title');
    if (el) el.innerHTML = str;
  }

  set msg(str) {
    this.opts.msg = str;
    let el = this.el.querySelector('.d-msg');
    if (el) el.innerHTML = str;
  }

  set btns(btns) {
    this.opts.btns = btns;
    btns = btns ? btns.map(btn => (0, _makeBtn.default)(btn)).join("\n") : '';
    let el = this.el.querySelector('.d-btns');
    if (el) el.innerHTML = btns;
  }

  set icon(icon) {
    this.opts.icon = icon;
    let [iconName, iconClass] = (icon || '').split(' ');
    icon = this.opts.icon ? `<b-icon name="${iconName}" class="${iconClass || ''} animated speed-2 flipInY"></b-icon>` : '';
    if (this.opts.icon === 'spinner') icon = `<b-spinner></b-spinner>`;
    let el = this.el.querySelector('.d-icon');
    if (el) el.innerHTML = icon;
  }

  onClick(e) {
    let el = e.target;

    if (el.tagName == 'B-BTN') {
      let index = Array.from(el.parentElement.children).indexOf(el);
      let btnInfo = this.opts.btns[index];
      this.resolveBtn(btnInfo);
    }
  }

  onKeydown(e) {
    let btnInfo = undefined;

    if (this.opts.btns && e.code == 'Escape') {
      btnInfo = this.opts.btns.find(btn => _makeBtn.cancelBtns.includes(btn));
    } else if (this.opts.btns && e.code == 'Enter') {
      btnInfo = this.opts.btns.reverse().find(btn => !_makeBtn.cancelBtns.includes(btn));
    }

    if (btnInfo != undefined) {
      // let other views finish with keydown before we process (ex: Dialog.prompt)
      setTimeout(() => {
        if (document.activeElement == document.body) this.resolveBtn(btnInfo);
      }, 0);
    }
  }

  resolveBtn(btnInfo) {
    if (_makeBtn.cancelBtns.includes(btnInfo)) btnInfo = false;
    if (this.resolve(btnInfo) === true) this.close();
  }

  resolve(resp) {
    if (this.opts.onResolve) {
      try {
        resp = this.opts.onResolve(resp, this);
      } catch (err) {
        console.log('failed to resolve');
        return false;
      }
    }

    if (this._resolve) this._resolve(resp);
    return true;
  }

  close() {
    if (this.presenter) this.presenter.close();
  }

  $(str) {
    return this.el.querySelector(str);
  }

  $$(str) {
    return this.el.querySelectorAll(str);
  }
  /*
  	Presenters
  */


  popover(target, opts = {}) {
    if (opts.adjustForMobile && _device.default.is_mobile) return this.modal(typeof opts.adjustForMobile == 'object' ? opts.adjustForMobile : {});
    if (target.currentTarget) target = target.currentTarget;
    let onClose = opts.onClose;

    opts.onClose = () => {
      onClose && onClose();
      this.resolve(false);
    };

    opts.onKeydown = this.onKeydown.bind(this);
    this.presenter = new _popover.default(target, this.el, opts); // layout timing issue on Safari (mac and iOS)... this will fix it for now

    setTimeout(() => {
      this.presenter._updatePosition();
    });
    return this.promise;
  }

  modal(opts = {}, mobileOpts) {
    if (mobileOpts && _device.default.isMobile) return this.panel(mobileOpts);else return this.panel(opts);
  }

  actionsheet(opts = {}) {
    return this.panel(Object.assign({
      type: 'actionsheet'
    }, opts));
  }

  panel(opts = {}) {
    opts = Object.assign({
      type: 'modal',
      animation: 'scale',
      disableBackdropClick: true
    }, opts);
    opts.onKeydown = this.onKeydown.bind(this);
    let onClose = opts.onClose;

    opts.onClose = () => {
      onClose && onClose();
      this.resolve(false);
    };

    this.presenter = new _panel.default(this.el, opts);
    this.presenter.open();
    return this.promise;
  }

  notif(opts) {
    opts = Object.assign({
      autoClose: this.opts.btns ? false : 3000,
      closeOnClick: !this.opts.btns,
      onClose: () => {
        this.resolve(false);
      }
    }, opts);
    opts.view = this.el;
    this.presenter = new _notif.default(opts);
    return this.promise;
  }

}

exports.default = Dialog;
},{"lit-html":"SPDu","../../util/device":"la8o","../panel":"cmZt","../notif":"XAiK","../popover":"Soyf","./make-btn":"TZ6L","./style.less":"r4vn"}],"pos3":[function(require,module,exports) {
const Dialog = require('./dialog').default;

module.exports = Dialog;

Dialog.waiting = function (opts = {}) {
  return new Dialog(Object.assign({
    icon: 'spinner',
    title: 'Processing...',
    msg: '',
    btns: false
  }, opts));
};

Dialog.confirm = function (opts = {}) {
  return new Dialog(Object.assign({
    // icon: 'trash text-red',
    title: 'Continue?',
    msg: 'Are you sure?',
    btns: ['cancel', 'ok']
  }, opts));
};

Dialog.confirmDelete = function (opts = {}) {
  return new Dialog(Object.assign({
    icon: opts.title || opts.msg ? 'trash red' : '',
    btns: ['cancel', 'delete']
  }, opts));
};

Dialog.alert = function (opts = {}) {
  return new Dialog(Object.assign({
    icon: 'info-circled',
    btns: ['dismiss']
  }, opts));
};

Dialog.error = function (opts = {}) {
  return new Dialog(Object.assign({
    icon: 'alert red',
    btns: ['dismiss']
  }, opts));
};

Dialog.warn = function (opts = {}) {
  return new Dialog(Object.assign({
    icon: 'attention-1 orange',
    btns: ['dismiss']
  }, opts));
};

Dialog.success = function (opts = {}) {
  return new Dialog(Object.assign({
    icon: 'ok-circled green',
    title: 'Success',
    btns: ['dismiss']
  }, opts));
};

Dialog.prompt = function (opts = {}) {
  opts = Object.assign({
    val: '',
    msg: '',
    prefix: '',
    suffix: '',
    pattern: '',
    html: false,
    required: false,
    label: '',
    placeholder: '',
    helpText: '',
    w: 300,
    type: '',
    multiline: false,
    multiple: false,
    btns: ['cancel', 'save'],

    onSubmit(val, control, blur) {}

  }, opts);
  if (opts.msg) opts.msg = `<div>${opts.msg}</div>`;

  opts.onResolve = function (resp, dialog) {
    let control = dialog.$('form-control');
    control.removeEventListener('change', onSubmit);
    if (!resp) return opts.btns.length > 2 ? [resp] : resp;
    if (control.isInvalid) throw Error('Invalid data');
    let val = opts.html ? control.value : control.control.textValue || control.value;
    return opts.btns.length > 2 ? [resp, val] : val;
  };

  let prefix = '';
  let suffix = '';

  if (opts.prefix.match(/^icon/)) {
    prefix = `<span slot="prefix" class="${opts.prefix}"></span>`;
    opts.prefix = '';
  }

  if (opts.suffix.match(/^icon/)) {
    suffix = `<span slot="suffix" class="${opts.suffix}"></span>`;
    opts.suffix = '';
  }

  let control = `<text-field
		pattern="${opts.pattern}"
		placeholder="${opts.placeholder}"
		${opts.html ? 'html' : ''}
		${opts.multiline ? 'multiline' : ''}
		${opts.required ? 'required' : ''}>${opts.val}</text-field>`;
  if (opts.type) control = `<input
					slot="control"
					type=${opts.type} 
					pattern="${opts.pattern}" 
					placeholder="${opts.placeholder}"
					value="${opts.val}"
					autocomplete="off"
					${opts.required ? 'required' : ''}>`;
  if (opts.options) control = `<select-field
					placeholder="${opts.placeholder}"
					${opts.multiple ? 'multiple' : ''}
					></select-field>`;
  opts.msg += `
			<form-control material="filled" 
			${opts.label ? `label="${opts.label}"` : ''} 
			show="suffix prefix"
			prefix="${opts.prefix}"
			suffix="${opts.suffix}">
				${control}
				<div slot="help">${opts.helpText}</div>
				${prefix}
				${suffix}
			</form-control>
			`;
  let dialog = new Dialog(opts);
  control = dialog.$('form-control');

  let onSubmit = e => {
    if (['TEXT-FIELD', 'INPUT'].includes(e.target.tagName)) {
      // if onSubmit given, dont close input...let function do that if 
      if (opts.onSubmit) {
        let val = opts.html ? control.value : control.control.textValue || control.value;

        let blur = function () {
          control.control.blur();
        };

        opts.onSubmit(val, control, blur);
      } else {
        control.control.blur();
      }
    }
  };

  control.addEventListener('change', onSubmit);
  if (opts.options) control.options = opts.options;
  setTimeout(function () {
    control.focus();
  }, 500);
  return dialog;
};
},{"./dialog":"HbKK"}],"Wp9p":[function(require,module,exports) {
var define;
/*!
 * Fuse.js v3.4.5 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Fuse", [], t) : "object" == typeof exports ? exports.Fuse = t() : e.Fuse = t();
}(this, function () {
  return function (e) {
    var t = {};

    function n(r) {
      if (t[r]) return t[r].exports;
      var o = t[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }

    return n.m = e, n.c = t, n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: r
      });
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
        return e[t];
      }.bind(null, o));
      return r;
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 1);
  }([function (e, t) {
    e.exports = function (e) {
      return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e);
    };
  }, function (e, t, n) {
    function r(e) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function o(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var i = n(2),
        a = n(8),
        s = n(0),
        c = function () {
      function e(t, n) {
        var r = n.location,
            o = void 0 === r ? 0 : r,
            i = n.distance,
            s = void 0 === i ? 100 : i,
            c = n.threshold,
            h = void 0 === c ? .6 : c,
            l = n.maxPatternLength,
            u = void 0 === l ? 32 : l,
            f = n.caseSensitive,
            d = void 0 !== f && f,
            v = n.tokenSeparator,
            p = void 0 === v ? / +/g : v,
            g = n.findAllMatches,
            y = void 0 !== g && g,
            m = n.minMatchCharLength,
            k = void 0 === m ? 1 : m,
            S = n.id,
            x = void 0 === S ? null : S,
            b = n.keys,
            M = void 0 === b ? [] : b,
            _ = n.shouldSort,
            L = void 0 === _ || _,
            w = n.getFn,
            A = void 0 === w ? a : w,
            C = n.sortFn,
            I = void 0 === C ? function (e, t) {
          return e.score - t.score;
        } : C,
            O = n.tokenize,
            j = void 0 !== O && O,
            P = n.matchAllTokens,
            F = void 0 !== P && P,
            T = n.includeMatches,
            z = void 0 !== T && T,
            E = n.includeScore,
            K = void 0 !== E && E,
            $ = n.verbose,
            J = void 0 !== $ && $;
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.options = {
          location: o,
          distance: s,
          threshold: h,
          maxPatternLength: u,
          isCaseSensitive: d,
          tokenSeparator: p,
          findAllMatches: y,
          minMatchCharLength: k,
          id: x,
          keys: M,
          includeMatches: z,
          includeScore: K,
          shouldSort: L,
          getFn: A,
          sortFn: I,
          verbose: J,
          tokenize: j,
          matchAllTokens: F
        }, this.setCollection(t);
      }

      var t, n, c;
      return t = e, (n = [{
        key: "setCollection",
        value: function (e) {
          return this.list = e, e;
        }
      }, {
        key: "search",
        value: function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            limit: !1
          };

          this._log('---------\nSearch pattern: "'.concat(e, '"'));

          var n = this._prepareSearchers(e),
              r = n.tokenSearchers,
              o = n.fullSearcher,
              i = this._search(r, o),
              a = i.weights,
              s = i.results;

          return this._computeScore(a, s), this.options.shouldSort && this._sort(s), t.limit && "number" == typeof t.limit && (s = s.slice(0, t.limit)), this._format(s);
        }
      }, {
        key: "_prepareSearchers",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              t = [];
          if (this.options.tokenize) for (var n = e.split(this.options.tokenSeparator), r = 0, o = n.length; r < o; r += 1) t.push(new i(n[r], this.options));
          return {
            tokenSearchers: t,
            fullSearcher: new i(e, this.options)
          };
        }
      }, {
        key: "_search",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
              t = arguments.length > 1 ? arguments[1] : void 0,
              n = this.list,
              r = {},
              o = [];

          if ("string" == typeof n[0]) {
            for (var i = 0, a = n.length; i < a; i += 1) this._analyze({
              key: "",
              value: n[i],
              record: i,
              index: i
            }, {
              resultMap: r,
              results: o,
              tokenSearchers: e,
              fullSearcher: t
            });

            return {
              weights: null,
              results: o
            };
          }

          for (var s = {}, c = 0, h = n.length; c < h; c += 1) for (var l = n[c], u = 0, f = this.options.keys.length; u < f; u += 1) {
            var d = this.options.keys[u];

            if ("string" != typeof d) {
              if (s[d.name] = {
                weight: 1 - d.weight || 1
              }, d.weight <= 0 || d.weight > 1) throw new Error("Key weight has to be > 0 and <= 1");
              d = d.name;
            } else s[d] = {
              weight: 1
            };

            this._analyze({
              key: d,
              value: this.options.getFn(l, d),
              record: l,
              index: c
            }, {
              resultMap: r,
              results: o,
              tokenSearchers: e,
              fullSearcher: t
            });
          }

          return {
            weights: s,
            results: o
          };
        }
      }, {
        key: "_analyze",
        value: function (e, t) {
          var n = e.key,
              r = e.arrayIndex,
              o = void 0 === r ? -1 : r,
              i = e.value,
              a = e.record,
              c = e.index,
              h = t.tokenSearchers,
              l = void 0 === h ? [] : h,
              u = t.fullSearcher,
              f = void 0 === u ? [] : u,
              d = t.resultMap,
              v = void 0 === d ? {} : d,
              p = t.results,
              g = void 0 === p ? [] : p;

          if (null != i) {
            var y = !1,
                m = -1,
                k = 0;

            if ("string" == typeof i) {
              this._log("\nKey: ".concat("" === n ? "-" : n));

              var S = f.search(i);

              if (this._log('Full text: "'.concat(i, '", score: ').concat(S.score)), this.options.tokenize) {
                for (var x = i.split(this.options.tokenSeparator), b = [], M = 0; M < l.length; M += 1) {
                  var _ = l[M];

                  this._log('\nPattern: "'.concat(_.pattern, '"'));

                  for (var L = !1, w = 0; w < x.length; w += 1) {
                    var A = x[w],
                        C = _.search(A),
                        I = {};

                    C.isMatch ? (I[A] = C.score, y = !0, L = !0, b.push(C.score)) : (I[A] = 1, this.options.matchAllTokens || b.push(1)), this._log('Token: "'.concat(A, '", score: ').concat(I[A]));
                  }

                  L && (k += 1);
                }

                m = b[0];

                for (var O = b.length, j = 1; j < O; j += 1) m += b[j];

                m /= O, this._log("Token score average:", m);
              }

              var P = S.score;
              m > -1 && (P = (P + m) / 2), this._log("Score average:", P);
              var F = !this.options.tokenize || !this.options.matchAllTokens || k >= l.length;

              if (this._log("\nCheck Matches: ".concat(F)), (y || S.isMatch) && F) {
                var T = v[c];
                T ? T.output.push({
                  key: n,
                  arrayIndex: o,
                  value: i,
                  score: P,
                  matchedIndices: S.matchedIndices
                }) : (v[c] = {
                  item: a,
                  output: [{
                    key: n,
                    arrayIndex: o,
                    value: i,
                    score: P,
                    matchedIndices: S.matchedIndices
                  }]
                }, g.push(v[c]));
              }
            } else if (s(i)) for (var z = 0, E = i.length; z < E; z += 1) this._analyze({
              key: n,
              arrayIndex: z,
              value: i[z],
              record: a,
              index: c
            }, {
              resultMap: v,
              results: g,
              tokenSearchers: l,
              fullSearcher: f
            });
          }
        }
      }, {
        key: "_computeScore",
        value: function (e, t) {
          this._log("\n\nComputing score:\n");

          for (var n = 0, r = t.length; n < r; n += 1) {
            for (var o = t[n].output, i = o.length, a = 1, s = 1, c = 0; c < i; c += 1) {
              var h = e ? e[o[c].key].weight : 1,
                  l = (1 === h ? o[c].score : o[c].score || .001) * h;
              1 !== h ? s = Math.min(s, l) : (o[c].nScore = l, a *= l);
            }

            t[n].score = 1 === s ? a : s, this._log(t[n]);
          }
        }
      }, {
        key: "_sort",
        value: function (e) {
          this._log("\n\nSorting...."), e.sort(this.options.sortFn);
        }
      }, {
        key: "_format",
        value: function (e) {
          var t = [];

          if (this.options.verbose) {
            var n = [];
            this._log("\n\nOutput:\n\n", JSON.stringify(e, function (e, t) {
              if ("object" === r(t) && null !== t) {
                if (-1 !== n.indexOf(t)) return;
                n.push(t);
              }

              return t;
            })), n = null;
          }

          var o = [];
          this.options.includeMatches && o.push(function (e, t) {
            var n = e.output;
            t.matches = [];

            for (var r = 0, o = n.length; r < o; r += 1) {
              var i = n[r];

              if (0 !== i.matchedIndices.length) {
                var a = {
                  indices: i.matchedIndices,
                  value: i.value
                };
                i.key && (a.key = i.key), i.hasOwnProperty("arrayIndex") && i.arrayIndex > -1 && (a.arrayIndex = i.arrayIndex), t.matches.push(a);
              }
            }
          }), this.options.includeScore && o.push(function (e, t) {
            t.score = e.score;
          });

          for (var i = 0, a = e.length; i < a; i += 1) {
            var s = e[i];

            if (this.options.id && (s.item = this.options.getFn(s.item, this.options.id)[0]), o.length) {
              for (var c = {
                item: s.item
              }, h = 0, l = o.length; h < l; h += 1) o[h](s, c);

              t.push(c);
            } else t.push(s.item);
          }

          return t;
        }
      }, {
        key: "_log",
        value: function () {
          var e;
          this.options.verbose && (e = console).log.apply(e, arguments);
        }
      }]) && o(t.prototype, n), c && o(t, c), e;
    }();

    e.exports = c;
  }, function (e, t, n) {
    function r(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var o = n(3),
        i = n(4),
        a = n(7),
        s = function () {
      function e(t, n) {
        var r = n.location,
            o = void 0 === r ? 0 : r,
            i = n.distance,
            s = void 0 === i ? 100 : i,
            c = n.threshold,
            h = void 0 === c ? .6 : c,
            l = n.maxPatternLength,
            u = void 0 === l ? 32 : l,
            f = n.isCaseSensitive,
            d = void 0 !== f && f,
            v = n.tokenSeparator,
            p = void 0 === v ? / +/g : v,
            g = n.findAllMatches,
            y = void 0 !== g && g,
            m = n.minMatchCharLength,
            k = void 0 === m ? 1 : m;
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.options = {
          location: o,
          distance: s,
          threshold: h,
          maxPatternLength: u,
          isCaseSensitive: d,
          tokenSeparator: p,
          findAllMatches: y,
          minMatchCharLength: k
        }, this.pattern = this.options.isCaseSensitive ? t : t.toLowerCase(), this.pattern.length <= u && (this.patternAlphabet = a(this.pattern));
      }

      var t, n, s;
      return t = e, (n = [{
        key: "search",
        value: function (e) {
          if (this.options.isCaseSensitive || (e = e.toLowerCase()), this.pattern === e) return {
            isMatch: !0,
            score: 0,
            matchedIndices: [[0, e.length - 1]]
          };
          var t = this.options,
              n = t.maxPatternLength,
              r = t.tokenSeparator;
          if (this.pattern.length > n) return o(e, this.pattern, r);
          var a = this.options,
              s = a.location,
              c = a.distance,
              h = a.threshold,
              l = a.findAllMatches,
              u = a.minMatchCharLength;
          return i(e, this.pattern, this.patternAlphabet, {
            location: s,
            distance: c,
            threshold: h,
            findAllMatches: l,
            minMatchCharLength: u
          });
        }
      }]) && r(t.prototype, n), s && r(t, s), e;
    }();

    e.exports = s;
  }, function (e, t) {
    var n = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

    e.exports = function (e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : / +/g,
          o = new RegExp(t.replace(n, "\\$&").replace(r, "|")),
          i = e.match(o),
          a = !!i,
          s = [];
      if (a) for (var c = 0, h = i.length; c < h; c += 1) {
        var l = i[c];
        s.push([e.indexOf(l), l.length - 1]);
      }
      return {
        score: a ? .5 : 1,
        isMatch: a,
        matchedIndices: s
      };
    };
  }, function (e, t, n) {
    var r = n(5),
        o = n(6);

    e.exports = function (e, t, n, i) {
      for (var a = i.location, s = void 0 === a ? 0 : a, c = i.distance, h = void 0 === c ? 100 : c, l = i.threshold, u = void 0 === l ? .6 : l, f = i.findAllMatches, d = void 0 !== f && f, v = i.minMatchCharLength, p = void 0 === v ? 1 : v, g = s, y = e.length, m = u, k = e.indexOf(t, g), S = t.length, x = [], b = 0; b < y; b += 1) x[b] = 0;

      if (-1 !== k) {
        var M = r(t, {
          errors: 0,
          currentLocation: k,
          expectedLocation: g,
          distance: h
        });

        if (m = Math.min(M, m), -1 !== (k = e.lastIndexOf(t, g + S))) {
          var _ = r(t, {
            errors: 0,
            currentLocation: k,
            expectedLocation: g,
            distance: h
          });

          m = Math.min(_, m);
        }
      }

      k = -1;

      for (var L = [], w = 1, A = S + y, C = 1 << S - 1, I = 0; I < S; I += 1) {
        for (var O = 0, j = A; O < j;) {
          r(t, {
            errors: I,
            currentLocation: g + j,
            expectedLocation: g,
            distance: h
          }) <= m ? O = j : A = j, j = Math.floor((A - O) / 2 + O);
        }

        A = j;
        var P = Math.max(1, g - j + 1),
            F = d ? y : Math.min(g + j, y) + S,
            T = Array(F + 2);
        T[F + 1] = (1 << I) - 1;

        for (var z = F; z >= P; z -= 1) {
          var E = z - 1,
              K = n[e.charAt(E)];

          if (K && (x[E] = 1), T[z] = (T[z + 1] << 1 | 1) & K, 0 !== I && (T[z] |= (L[z + 1] | L[z]) << 1 | 1 | L[z + 1]), T[z] & C && (w = r(t, {
            errors: I,
            currentLocation: E,
            expectedLocation: g,
            distance: h
          })) <= m) {
            if (m = w, (k = E) <= g) break;
            P = Math.max(1, 2 * g - k);
          }
        }

        if (r(t, {
          errors: I + 1,
          currentLocation: g,
          expectedLocation: g,
          distance: h
        }) > m) break;
        L = T;
      }

      return {
        isMatch: k >= 0,
        score: 0 === w ? .001 : w,
        matchedIndices: o(x, p)
      };
    };
  }, function (e, t) {
    e.exports = function (e, t) {
      var n = t.errors,
          r = void 0 === n ? 0 : n,
          o = t.currentLocation,
          i = void 0 === o ? 0 : o,
          a = t.expectedLocation,
          s = void 0 === a ? 0 : a,
          c = t.distance,
          h = void 0 === c ? 100 : c,
          l = r / e.length,
          u = Math.abs(s - i);
      return h ? l + u / h : u ? 1 : l;
    };
  }, function (e, t) {
    e.exports = function () {
      for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = [], r = -1, o = -1, i = 0, a = e.length; i < a; i += 1) {
        var s = e[i];
        s && -1 === r ? r = i : s || -1 === r || ((o = i - 1) - r + 1 >= t && n.push([r, o]), r = -1);
      }

      return e[i - 1] && i - r >= t && n.push([r, i - 1]), n;
    };
  }, function (e, t) {
    e.exports = function (e) {
      for (var t = {}, n = e.length, r = 0; r < n; r += 1) t[e.charAt(r)] = 0;

      for (var o = 0; o < n; o += 1) t[e.charAt(o)] |= 1 << n - o - 1;

      return t;
    };
  }, function (e, t, n) {
    var r = n(0);

    e.exports = function (e, t) {
      return function e(t, n, o) {
        if (n) {
          var i = n.indexOf("."),
              a = n,
              s = null;
          -1 !== i && (a = n.slice(0, i), s = n.slice(i + 1));
          var c = t[a];
          if (null != c) if (s || "string" != typeof c && "number" != typeof c) {
            if (r(c)) for (var h = 0, l = c.length; h < l; h += 1) e(c[h], s, o);else s && e(c, s, o);
          } else o.push(c.toString());
        } else o.push(t);

        return o;
      }(e, t, []);
    };
  }]);
});
},{}],"uH6r":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

const styles = (0, _litElement.css)`

:host {
	opacity: 0;
	position: absolute;
	/* left: -7px;
	top: -7px;
	width: 48px;
	height: 48px; */
	width: 120%;
	height: 120%;
	left: -10%;
	top: -10%;
	display: block;
	z-index: 100;
	background: currentColor;
	border-radius: 50px;
}

:host(.enter) {
	opacity: 0.3;
	/* transform: scale(.5); */
	animation: ripple-enter 550ms cubic-bezier(0.4, 0, 0.2, 1);
	animation-name: ripple-enter;
}

:host(.exit) {
	opacity: 0;
	/* transform: scale(1); */
	animation: ripple-exit 550ms cubic-bezier(0.4, 0, 0.2, 1);
	animation-name: ripple-exit;
}


@-webkit-keyframes ripple-enter {
  0% {
    opacity: 0.1;
    transform: scale(0);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}
@-webkit-keyframes ripple-exit {
  0% {
    opacity: .3;
	transform: scale(.7);
  }
  100% {
    opacity: 0;
	transform: scale(1.2);
  }
}
@-webkit-keyframes ripple-pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.92);
  }
  100% {
    transform: scale(1);
  }
}
`;

class TouchRippleElement extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    temp.innerHTML = `
			<style>${styles.cssText}</style>
		`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
  }

  ripple() {
    this.animate('exit');
  }

  enter() {
    this.classList.add('enter');
  }

  hide() {
    this.classList.remove('exit');
    this.classList.remove('enter');
  }

  animate(str) {
    this.hide();
    this.classList.add(str);
    setTimeout(() => this.classList.remove(str), 550);
  }

}

customElements.define('touch-ripple', TouchRippleElement);

var _default = customElements.get('touch-ripple');

exports.default = _default;
},{"lit-element":"bhxD"}],"jNfL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

require("./touch-ripple");

const styles = (0, _litElement.css)`

:host {
	--size: 1.6em;
	--color: var(--fc-theme);
	--colorDisabled: var(--fc-disabled-color, rgba(0, 0, 0, 0.26));
	display: inline-block;
	vertical-align: middle;
	flex-grow: 0 !important;
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	outline: none;
}

:host([hidden]) { display: none; }

:host([checked]) svg.uncheck,
:host(:not([checked])) svg.check {
	display: none
}

main {
	position: relative;
	display: inherit;
}

:host([placement="top"]) { flex-direction: column-reverse; }
:host([placement="bottom"]) { flex-direction: column; }
:host([placement="left"]) { flex-direction: row-reverse; }
:host([placement="right"]) { flex-direction: row; }

svg {
	fill: currentColor;
	width: var(--size);
	height: var(--size);
	display: inline-block;
	transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	user-select: none;
	flex-shrink: 0;
	padding: .25em;
}

.switch {
	display: none
}

:host([type="switch"]) svg { display: none; }

:host([type="switch"]) .switch {
	display: inline-block;
}

:host([checked]) {
	color: var(--color)
}

:host([disabled]) {
	cursor: default;
}

:host([disabled]) svg {
	fill: var(--colorDisabled)
}

:host([disabled]) label {
	color: var(--colorDisabled);
}

main label {
	cursor: pointer;
}

.indeterminate {
	display: none;
}

.switch {
	position: relative;
	align-items: center;
	margin: .5em;
}

.switch:before, .switch:after {
	content: "";
	margin: 0;
	outline: 0;
	transition: all 0.3s ease;
}

.switch:before {
	display: block;
	width: 2em;
	height: 1em;
	background-color: #9E9E9E;
	border-radius: 1em;
}

.switch:after {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translate(0, -50%);
	width: 1.3em;
	height: 1.3em;
	background-color: #FAFAFA;
	border-radius: 50%;
	box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
}


:host([checked]) .switch:before {
	background-color: var(--color);
	opacity: .5
}

:host([checked]) .switch:after {
	background-color: var(--color);
	transform: translate(80%, -50%);
}
`;

class CheckBoxElement extends HTMLElement {
  get key() {
    return this.getAttribute('key');
  }

  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    let label = this.getAttribute('label') || '<slot name="label"></slot>';
    temp.innerHTML = `
			<style>
			${styles.cssText}
			</style>
			<main>
				<svg class="uncheck" focusable="false" viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg>
				<svg class="check" focusable="false" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
				<div class="switch"></div>
				<touch-ripple></touch-ripple>
			</main>
			<label>${label}</label>
			`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
    this.ripple = this.shadowRoot.querySelector('touch-ripple');
    this.addEventListener('click', this._onClick.bind(this));
    this.addEventListener('keydown', e => {
      if (['Space', 'Enter'].includes(e.code)) this._onClick();
    });
    this.addEventListener('focus', e => {
      if (e.relatedTarget && e.relatedTarget != this) this.ripple.enter();
    });
    this.addEventListener('blur', e => {
      if (e.relatedTarget && e.relatedTarget != this) this.ripple.hide();
    });
  }

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
  }

  _onClick() {
    if (this.disabled) return;
    this.ripple.ripple();
    this.checked = !this.checked;
    var event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.checked
      }
    });
    this.dispatchEvent(event); // this.blur()
  }

  set checked(val) {
    if (val === '0' || val === '') val = false;
    val ? this.setAttribute('checked', '') : this.removeAttribute('checked');
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  get value() {
    return this.checked;
  }

  set value(val) {
    this.checked = val;
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val = true) {
    val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

}

customElements.define('check-box', CheckBoxElement);

var _default = customElements.get('check-box');

exports.default = _default;
},{"lit-element":"bhxD","./touch-ripple":"uH6r"}],"h8fl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSearchType = registerSearchType;
exports.default = void 0;

var _litElement = require("lit-element");

var _menu = _interopRequireDefault(require("../../menu"));

var _device = _interopRequireDefault(require("../../../util/device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	Select Field
*/
const SHOW_ALL_RESULTS_THRESHOLD = 100;
const styles = (0, _litElement.css)`

:host(:not([disabled])) {
	cursor: pointer;
}

main {
	display: flex;
	align-items: center;
	min-width: 1em;
	position: relative;
}

main > svg {
	height: 1em;
	width: 1em;
	flex-shrink: 0;
	fill: var(--theme-color-accent, #333);
}

slot#options {
	display: none;
}

main input {
	position: absolute;
	z-index: -1;
	opacity: 0;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}


#value {
	flex-grow: 1;
	min-width: 1em;
}

#value:empty:before {
	content: attr(data-placeholder);
	color: var(--placeholderColor);
}

#value > span {
	display: inline-block;
	padding: 0;
    min-width: 1em;
	vertical-align: bottom;
}

:host(:not([chip])) #value > span:not(:last-child):after {
	content: ', ';
	margin-right: .5em;
}

:host([chip]) #value {
	margin-top: -.15em;
	margin-bottom: -.15em;
}

:host([chip]) #value > span {
	background: rgba(0,0,0,.1);
    margin: .1em;
    padding: .15em .5em;
    border-radius: 20px;
	line-height: 1em;
	display: inline-flex;
	justify-content: center;
	align-items: center;
}`;
const SearchTypes = new Map(); // search opts should match `Menu.options.search`

function registerSearchType(type, searchOpts = {}) {
  if (!opts.url) return console.warn(`Cannot register select-field search type: '${type}' - opts.url is required`);
  if (SearchTypes.get(type)) return console.warn(`select-field search type ${type} already set`);
  SearchTypes.set(type, Object.assign({// no defaults yet
  }, searchOpts));
}

class SelectFieldElement extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    let placeholder = this.getAttribute('placeholder') || '';
    let arrow = this.hasAttribute('no-arrow') ? '' : '<svg focusable="false" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg>';
    temp.innerHTML = `<style>${styles.cssText}</style>
			<main>
				<input type="input" readonly="true"/>
				<div id="value" data-placeholder="${placeholder}"></div>
				${arrow}
			</main>
			<slot id="options"></slot>`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
    this._input = this.$('input');
    this._value = this.$('#value');
    this._selected = [];
    let options = this.$('#options');
    this.options = [];
    options.assignedNodes && options.assignedNodes().map(el => {
      if (!el.tagName) return; // skip comments and empty text blocks

      if (el.tagName == 'HR') return this.options.push('divider');
      if (el.tagName == 'OPTGROUP') return this.options.push({
        'divider': el.innerHTML
      });

      if (el.tagName != 'OPTION') {
        return this.options.push({
          'text': el.innerHTML
        });
      }

      if (el.hasAttribute('selected')) this._selected.push(el.value);
      let attrs = {};
      Array.from(el.attributes).forEach(attr => {
        if (!['value', 'selected'].includes(attr.name)) attrs[attr.name] = attr.value;
      });
      this.options.push(Object.assign(attrs, {
        label: el.innerHTML,
        val: el.value || null
      }));
    });
    this.addEventListener('click', this.focus.bind(this));
    this.addEventListener('keypress', this.onKeypress.bind(this));
  }

  onKeypress(e) {
    if (e.code == 'Space') {
      this.toggleMenu();
    }
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') this._input.disabled = this.disabled;
  }

  setAttributes() {
    if (this.isEmpty && !this.showEmpty && !this.getAttribute('placeholder')) this.setAttribute('empty', true);else this.removeAttribute('empty');
  }

  $(str) {
    return this.shadowRoot.querySelector(str);
  }

  $$(str) {
    return this.shadowRoot.querySelectorAll(str);
  }

  connectedCallback() {
    this.selected = this._selected;
  }

  disconnectedCallback() {}

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val = true) {
    val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get multiple() {
    return this.hasAttribute('multiple');
  }

  get showEmpty() {
    return this.hasAttribute('show-empty');
  }

  get value() {
    if (this.multiple) return this.selected && this.selected.map(m => m.val);else return this.selected && this.selected.val;
  }

  set value(val) {
    this.selected = val;
  }

  get isEmpty() {
    let val = this.value;
    return this.multiple ? val.length <= 1 && !val[0] : !val;
  }

  set isInvalid(invalid) {
    this._isInvalid = invalid;
    if (invalid) this.setAttribute('invalid', true);else this.removeAttribute('invalid');
  }

  get isInvalid() {
    return this._isInvalid;
  }

  set options(opts) {
    if (opts instanceof Promise) {
      opts.then(result => {
        this.options = result;
        return result;
      });
      opts = []; // clear options until promise resolves
    }

    if (Array.isArray(opts)) opts = opts.map(o => {
      if (typeof o != 'object') return {
        label: o,
        val: o
      };else return Object.assign({}, o, {
        val: String(o.val)
      });
    });else if (typeof opts == 'object') {
      let _opts = [];

      for (let k in opts) {
        _opts.push({
          label: opts[k],
          val: k
        });
      }

      opts = _opts;
    }
    this.__options = opts;
    this.selected = this._selected;
  }

  get options() {
    return this.__options;
  }

  set selected(val) {
    this._oldSelected = this._selected.slice(0);
    if (val === undefined || val === null) val = [];else if (!Array.isArray(val)) val = [String(val)];
    let selected = this.options.filter(m => {
      return val.includes(m.val) || val.length == 0 && !m.val;
    }); // keep selected values in the order that they were selected

    selected = selected.sort((a, b) => {
      return val.indexOf(a.val) - val.indexOf(b.val);
    });
    this._selected = []; // if no options, keep the selected value
    // FIXME: could be improved with the `labels`

    if (this.options.length == 0) this._selected = val;
    let labels = '';
    selected.forEach(m => {
      this._selected.push(m.val);

      if (m.val || this.showEmpty) labels += `<span value="${m.val}">${m.label}</span>`;
    });
    this._value.innerHTML = labels;
    this.setAttribute('value', val.join(','));
    this.setAttributes();
  }

  get selected() {
    let selected = this.options.filter(m => {
      return this._selected.includes(m.val);
    }); // keep selected values in the order that they were selected

    selected = selected.sort((a, b) => {
      return this._selected.indexOf(a.val) - this._selected.indexOf(b.val);
    });
    return this.multiple ? selected : selected[0];
  }

  get isFocused() {
    return this.shadowRoot.activeElement == this._input || this.hasAttribute('focused');
  }

  focus() {
    this.toggleMenu();
  }

  set focused(focused) {
    if (focused) {
      this._input.focus();

      this.setAttribute('focused', '');
    } else {
      this._input.blur();

      this.removeAttribute('focused');
    }
  }

  async toggleMenu() {
    if (this.disabled) return;

    if (this.openMenu) {
      this.openMenu.resolve(false);
      return;
    }

    this.focused = true;
    let menuOpts = {
      minW: this.offsetWidth,
      selected: this._selected,
      multiple: this.multiple ? 'always' : false,
      jumpNav: this.hasAttribute('jump-nav'),
      // only called when in multiple mode
      onSelect: selected => {
        this.selected = Array.isArray(selected) ? selected.map(m => m.val) : selected.val;
      }
    };

    if (this.search && typeof this.search == "object") {
      if (!this.search.url) console.warn('select-field .search=${} must contain a `url`');else menuOpts.search = this.search;
    } else if (this.hasAttribute('search')) {
      let search = this.getAttribute('search'); // use search type or assume a URL was given

      menuOpts.search = SearchTypes.get(search) || {
        url: search
      };
    }

    if (menuOpts.search && this.multiple) {
      delete menuOpts.search;
      console.warn('select-field[multiple] does work with `search`');
    } else if (menuOpts.search) menuOpts.autoSelectFirst = true;

    if (this.getAttribute('search') == 'false') menuOpts.search = false; // change "search.showAll" to false when over 100 results
    // lots of results are slow to render to DOM

    if (this.options.length > SHOW_ALL_RESULTS_THRESHOLD) {
      menuOpts.search = Object.assign({
        showAll: false,
        placeholder: `Search (${this.options.length} results)`
      }, menuOpts.search);
    }

    let menu = this.options;
    let popoverOpts = {
      align: this.getAttribute('menu-align') || 'bottom',
      maxHeight: this.getAttribute('menu-max-height') || 'auto',
      maxWidth: this.getAttribute('menu-max-width') || 'none',
      overflowBoundry: this.getAttribute('menu-overflow') ? 'window' : null,
      adjustForMobile: this.getAttribute('adjust-for-mobile') == 'false' ? false : {
        type: 'actionsheet'
      }
    };
    if (!menu || menu.length == 0) menu = [{
      'divider': 'No options available'
    }];
    this.openMenu = new _menu.default(menu, menuOpts);
    this.openMenu.el.setAttribute('select-field', this.className);
    let val = await this.openMenu.popover(this.$('main'), popoverOpts);
    this.openMenu = null;
    this.focused = false;
    if (!_device.default.is_mobile) this._input.focus(); // retain focus

    if (val === false) return;
    val = this.multiple ? val : [val];

    if (menuOpts.search && menuOpts.search.url) {
      let optionVals = this.options.map(o => o.val);
      val.forEach(v => {
        if (!optionVals.includes(v.val)) this.__options.push(v);
      });
    }

    this.selected = val.map(m => m.val);
    var event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value
      }
    });
    this.dispatchEvent(event);
  }

}

customElements.define('select-field', SelectFieldElement);

var _default = customElements.get('select-field');

exports.default = _default;
},{"lit-element":"bhxD","../../menu":"tCYJ","../../../util/device":"la8o"}],"tCYJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DefaultOpts = void 0;

var _litHtml = require("lit-html");

var _unsafeHtml = require("lit-html/directives/unsafe-html");

var _live = require("lit-html/directives/live");

var _popover = _interopRequireDefault(require("../popover"));

var _dialog = _interopRequireDefault(require("../dialog"));

var _panel = _interopRequireDefault(require("../panel"));

var _fuse = _interopRequireDefault(require("fuse.js"));

require("../../elements/hr");

require("../form-control/controls/check-box");

require("../form-control/controls/select-field");

var _device = _interopRequireDefault(require("../../util/device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = require('./style.less');

const DefaultOpts = {
  selected: false,
  multiple: false,
  search: 20,
  // true (always show) or number of results for it to show
  minW: false,
  width: null,
  autoSelectFirst: false,
  jumpNav: false,
  // true (always show) or number of results for it to show
  typeDelay: 700,
  // how long until typed characters reset
  hasMenuIcon: 'right-open',
  onSelect: () => {}
};
exports.DefaultOpts = DefaultOpts;
const SearchDefaults = {
  placeholder: 'Search',
  icon: 'search',
  parse: row => {
    return {
      label: row.label || row.name || row.title || 'Unknown',
      val: row.val || row.id || null,
      description: row.description || ''
    };
  }
};

class Menu {
  static handle(selected, handler, args) {
    if (!selected) return true;
    if (!args) args = [];else if (!Array.isArray(args)) args = [args];

    if (selected.fn && typeof selected.fn == 'function') {
      setTimeout(() => {
        // move to end of call stack
        selected.fn.apply(handler, args);
      });
      return true;
    }

    if (selected.fn && typeof handler[selected.fn] == 'function') {
      setTimeout(() => {
        // move to end of call stack
        handler[selected.fn].apply(handler, args);
      });
      return true;
    }

    return false; // NOT handled
  }

  constructor(menu = [], opts = {}) {
    this.el = document.createElement('div');
    this.el.classList.add('b-menu');
    this.el.classList.add('nopadding');
    this.el.menu = this;
    if (opts.className) opts.className.split(' ').forEach(cn => {
      this.el.classList.add(cn.trim());
    });
    this.opts = Object.assign({}, DefaultOpts, opts);
    this.menu = menu;
    if (opts.multiple == undefined && this.opts.selected instanceof Array) this.opts.multiple = true;
    let selected = this.opts.selected !== undefined ? this.opts.selected : [];
    if (Array.isArray(selected)) selected = selected.slice(0); // clone

    this.selected = selected;
    if (this.opts.minW) this.el.style.minWidth = this.opts.minW;
    if (this.opts.maxW) this.el.style.maxWidth = this.opts.maxW;
    if (this.opts.width) this.el.style.width = this.opts.width;
    if (this.opts.matching) this.matching(this.opts.matching);
    this.el.addEventListener('click', this.onClick.bind(this));
  }

  get promise() {
    if (!this._promise) this._promise = new Promise(resolve => {
      this._resolve = resolve;
    });
    return this._promise;
  }

  set promise(val) {
    this._promise = val;
    if (!val) this._resolve = null;
  }

  updateMenu(menu, selected) {
    this.menu = menu;
    if (selected != undefined) this.selected = selected;
    this.render();
  }

  set menu(menu) {
    if (typeof menu == 'function') menu = menu();
    this.__menu = menu;
    if (this.searchUrl && !this.__origMenu) this.__origMenu = menu || [];
    if (!this.searchUrl) this.__fuse = new _fuse.default(this.__menu, {
      keys: [{
        name: 'dataTitle',
        weight: 0.7
      }, {
        name: 'label',
        weight: 0.5
      }, {
        name: 'description',
        weight: 0.3
      }],
      minMatchCharLength: 3,
      threshold: 0.4,
      location: 0,
      distance: 300
    });
  }

  get menu() {
    return this.__menu || [];
  }

  get displayMenu() {
    if (this.__filteredMenu) return this.__filteredMenu;
    if (this.searchIsOn && !this.searchShouldShowAll) return [];
    if (this.searchIsOn && this.hideUnselected) return this.menu.filter(m => m.label === undefined || m.selected);
    return this.menu;
  }

  set selected(keys) {
    // always store selected values as an array
    if (!Array.isArray(keys)) keys = [keys];
    let keyVals = keys.map(k => k && k.val || k); // store selected values as the actual values (not just the keys)

    this.__selected = this.menu.filter(m => {
      if (m.val === undefined) return false;
      let matchedIndex = keyVals.indexOf(m.val); // select/deselect each value

      if (matchedIndex > -1) {
        let mergeData = keys[matchedIndex];
        if (mergeData && typeof mergeData == 'object') Object.assign(m, mergeData);
        m.selected = true;
      } else {
        delete m.selected;
        delete m.selection;
      }

      return m.selected;
    }); // keep values in the order that they were selected

    this.__selected = this.__selected.sort((a, b) => {
      return keyVals.indexOf(a.val) - keyVals.indexOf(b.val);
    });
  }

  get selected() {
    return this.opts.multiple ? this.__selected : this.__selected[0];
  }

  toggleSelected(item) {
    let index = this.__selected.indexOf(item);

    if (index > -1 && !item.selection) {
      item.selected = false;

      this.__selected.splice(index, 1);

      return false;
    } else {
      item.selected = true;

      this.__selected.push(item);

      return true;
    }
  }

  focusSearch() {
    let input = this.el.querySelector('.menu-search-bar input');
    input && input.focus();
  }

  get searchIsOn() {
    let s = this.opts.search;
    return s === true || typeof s == 'object' || typeof s == 'number' && this.menu.length >= s;
  }

  get searchUrl() {
    return this.opts.search && this.opts.search.url;
  }

  get searchShouldShowAll() {
    return this.opts.search && this.opts.search.showAll !== false;
  }

  get hideUnselected() {
    return this.opts.search && this.opts.search.hideUnselected === true;
  }

  get searchParse() {
    let parse = this.opts.search && this.opts.search.parse;
    if (typeof parse !== 'function') parse = SearchDefaults.parse;
    return parse;
  }

  get searchIcon() {
    return this.opts.search && this.opts.search.icon || SearchDefaults.icon;
  }

  get searchPlaceholder() {
    return this.opts.search && this.opts.search.placeholder || SearchDefaults.placeholder;
  }

  get searchSpinner() {
    return this.__searchSpinner = this.__searchSpinner || this.el.querySelector('.menu-search-bar b-spinner');
  }

  async fetchResults(term) {
    // already in process of looking up this term
    if (this._fetchingTerm === term) return;
    this._fetchingTerm = term;
    let url = this.searchUrl; // URL can be a dynamic function

    if (typeof url == 'function') url = url(term);else url += term;
    this.searchSpinner.hidden = false;
    let resp = await fetch(url).then(resp => resp.json()); // looks like we started searching for another term before we got
    // this response back, so ignore the results

    if (this._fetchingTerm !== term) return; // parse the search results to fit the expected "menu" structure

    if (Array.isArray(resp)) this.menu = resp.map(row => this.searchParse(row));else this.menu = [];
    this._fetchingTerm = null;
    this.searchSpinner.hidden = true;
    this.render();
  }

  appendTo(el) {
    el.appendElement(this.el);
    this.render();
  }

  render() {
    let showJumpNav = this.opts.jumpNav === true || typeof this.opts.jumpNav == 'number' && this.displayMenu.length >= this.opts.jumpNav;
    this._active = this.opts.autoSelectFirst ? 0 : null;
    (0, _litHtml.render)((0, _litHtml.html)`

			${this.searchIsOn ? (0, _litHtml.html)`
				<div class="menu-search-bar">
					<b-icon name="${this.searchIcon}"></b-icon>
					<b-spinner hidden></b-spinner>
					<input type="text" placeholder="${this.searchPlaceholder}" value=${this.opts.matching || ''}>
				</div>
			` : ''}

			<div class="results">
				
				${showJumpNav ? (0, _litHtml.html)`
					<alphabet-jump-nav>
						<span style="color: red">'alphabet-jump-nav' custom element not loaded</span>
					</alphabet-jump-nav>` : ''}

				${this.displayMenu.map((m, i) => this.renderItem(m, i))}
			</div>

		`, this.el); // update popover position

    if (this.presenter && this.presenter._updatePosition) this.presenter._updatePosition();
    return this;
  }

  renderItem(m, i) {
    if (m == 'divider' || m.label == 'divider' && m.val == 'divider') return (0, _litHtml.html)`<b-hr></b-hr>`;
    if (m.divider !== undefined) return (0, _litHtml.html)`<div class="menu-divider">${m.divider}</div>`;
    if (m.text !== undefined) return (0, _litHtml.html)`<div class="menu-text">${m.text}</div>`;
    if (m.title) return (0, _litHtml.html)`<div class="menu-title"><h2>${m.title}</h2></div>`; // capture menu item index for use in resolve (if so desired)

    m.index = i;
    let icon = '';
    if (m.icon && typeof m.icon == 'string') icon = (0, _litHtml.html)`<b-icon name="${m.icon}"></b-icon>`;else if (m.icon) icon = (0, _litHtml.html)`<span class="icon">${m.icon}</span>`;
    let checkbox = this.opts.multiple && !m.clearsAll || m.selected ? (0, _litHtml.html)`<check-box ?checked=${(0, _live.live)(m.selected)}></check-box>` : '';
    let menuIcon = m.menu && this.opts.hasMenuIcon ? (0, _litHtml.html)`<b-icon class="has-menu" name="${this.opts.hasMenuIcon}"></b-icon>` : '';

    if (m.selections) {
      let selections = m.selections;
      if (this.opts.multiple) selections = [{
        label: 'unset',
        val: ''
      }].concat(selections);
      checkbox = (0, _litHtml.html)`<select-field 
							.options=${selections} 
							placeholder="unset"
							@change=${this.selectOptionsChanged.bind(this)}
							.selected=${m.selection}
							></select-field>`;
    }

    let extras = '';

    if (m.extras) {
      extras = m.extras.map(elName => {
        if (typeof elName == 'string' && customElements.get(elName)) {
          let el = document.createElement(elName);
          el.item = m;
          el.classList.add('menu-item-extra');
          return el;
        }

        return elName;
      });
    }

    let dataTitle = (m.dataTitle || m.label + ' ' + m.description).trim().toLowerCase();
    let label = m.label && m.label.constructor.name == 'TemplateResult' ? m.label : (0, _unsafeHtml.unsafeHTML)(m.label || '');
    let description = m.description && m.description.constructor.name == 'TemplateResult' ? m.description : (0, _unsafeHtml.unsafeHTML)(m.description || '');
    return (0, _litHtml.html)`
			<div class="menu-item ${m.className}" val=${m.val} index=${i}
				data-title=${dataTitle}
				?active=${this._active == i}
				?icon-only=${!m.label && !m.description} ?selected=${m.selected}>
				${checkbox}
				${icon}
				${m.view && m.view instanceof HTMLElement ? m.view : (0, _litHtml.html)`
					<span class="mi-content">
						<div class="mi-label">${label}</div>
						<div class="mi-description">${description}</div>
					</span>
				`}
				${extras}
				${menuIcon}
			</div>
		`;
  }

  selectOptionsChanged(e) {
    let val = e.currentTarget.value;
    let data = this.displayMenu[e.currentTarget.parentElement.getAttribute('index')];
    data.selection = val;
    if (!this.opts.multiple) this.resolve(data);else this.toggleSelected(data);
  }

  onClick(e) {
    let target = e.target;
    if (target.tagName == 'SELECT-FIELD') return;
    let didClickCheckbox = target.tagName == 'CHECK-BOX';

    while (target && !target.classList.contains('menu-item')) {
      target = target.parentElement;
    }

    if (target) {
      let data = this.displayMenu[target.getAttribute('index')];
      if (data.selections && !data.selection) data.selection = data.selections[0] && data.selections[0].val || data.selections[0];
      if (data.menu) return this._itemMenu(target, data);

      if (this.opts.multiple) {
        if (data.clearsAll || this.opts.multiple !== 'always' && !didClickCheckbox) {
          this.opts.onSelect && this.opts.onSelect([data]);
          return this.resolve([data]);
        }

        let isSelected = this.toggleSelected(data);

        if (this.searchIsOn && this.hideUnselected) {
          this.render(); // update popover position

          if (this.presenter && this.presenter._updatePosition) this.presenter._updatePosition();
        } else if (isSelected) {
          target.classList.add('selected');
          target.querySelector('check-box').checked = true;
        } else {
          target.classList.remove('selected');
          target.querySelector('check-box').checked = false;
        }

        this.opts.onSelect && this.opts.onSelect(this.selected);
      } else {
        this.opts.onSelect && this.opts.onSelect(data);
        this.resolve(data);
      }
    }
  }

  clear() {
    let input = this.el.querySelector('.menu-search-bar input');
    if (input) input.value = '';
    this.menu = this.__origMenu;
    this.render();
  }

  async _itemMenu(target, data) {
    let menu = new Menu(data.menu, data.menuOpts || {});
    let popoverOpts = data.menuOpts && data.menuOpts.popover || {};
    let val = await menu.popover(target, popoverOpts);

    if (val) {
      data.menuSelected = val;
      this.resolve(data);
    }
  }

  onKeydown(e) {
    if (e.which >= 65 && e.which <= 90 || // a-z
    e.which >= 48 && e.which <= 57 // 0-9
    || [8].includes(e.which)) {
      // delete
      this.onLetterPress(e);
      return;
    }

    if (e.code == 'Escape') {
      this.resolve(false);
      return;
    } // if( e.target.tagName == 'INPUT' && ['ArrowLeft', 'ArrowRight'].includes(e.code) )


    if (['ArrowLeft', 'ArrowRight'].includes(e.code)) return; // stop processing the keypress unless it is one of these

    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space'].includes(e.code)) return;
    if (!this.opts.multiple && e.code == 'Space') return;
    let items = this.el.querySelectorAll('.menu-item');
    let activeItem = items[this._active]; // if active item has a menu open, dont perform any actions

    if (activeItem && activeItem.classList.contains('popover-open')) return;

    if (this.opts.multiple && e.code == 'Space') {
      if (activeItem) {
        activeItem.click();
        e.preventDefault();
        e.stopPropagation();
      }

      return;
    }

    if (this.opts.multiple && e.code == 'Enter') {
      this.resolve(this.selected);
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (e.code == 'Enter') {
      if (activeItem) activeItem.click();
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this._active == null) this._active = -1;
    this._active += ['ArrowUp', 'ArrowLeft'].includes(e.code) ? -1 : 1;
    if (this._active < 0) this._active = items.length - 1;
    if (this._active >= items.length) this._active = 0;
    this.setActiveItem(items[this._active]);
    e.preventDefault();
    e.stopPropagation();
  }

  set active(index) {
    if (index == null) index = 0;
    if (index < 0) index = this.displayMenu.length - 1;
    if (index >= this.displayMenu.length) index = 0;
    this._active = index;
    let items = this.el.querySelectorAll('.menu-item');
    if (items.length == 0) return;
    this.setActiveItem(items[this._active]);
  }

  setActiveItem(el) {
    let items = Array.from(this.el.querySelectorAll('.menu-item'));
    items.forEach(el => el.removeAttribute('active'));
    if (typeof el === 'number') el = items[el];
    this._active = null;

    if (el) {
      this._active = items.indexOf(el);
      el.setAttribute('active', '');
      el.scrollIntoViewIfNeeded();
    }
  }

  onLetterPress(e) {
    if (e.target.tagName == 'INPUT') {
      setTimeout(() => {
        let val = e.target.value; // interpret only 1 character as "empty"

        if (!val || val.length < 2) val = '';
        if (val === this.__lastFilterVal) return;
        this.__lastFilterVal = val;

        if (this.searchUrl) {
          // must stop typing for a moment before fetching results
          clearTimeout(this.__searchTermDelay);

          if (!val) {
            this.menu = this.__origMenu;
            this.render(); // update popover position

            if (this.presenter && this.presenter._updatePosition) this.presenter._updatePosition();
            return;
          }

          this.__searchTermDelay = setTimeout(() => {
            this.fetchResults(val);
          }, 700);
        } else {
          this.matching(val);
          this.render();
          this.setActiveItem(this.opts.autoSelectFirst ? 0 : null);
        }
      }, 0);
      return;
    }

    let ts = new Date().getTime();
    if (!this._lastLetterPressTS || ts - this._lastLetterPressTS > this.opts.typeDelay) this._lastLetterPress = '';
    this._lastLetterPressTS = ts;
    this._lastLetterPress += e.key;
    let li = this.el.querySelector(`.menu-item[data-title^="${this._lastLetterPress}"]`);
    if (li) this.setActiveItem(li);
  }

  matching(val) {
    if (!val) this.__filteredMenu = null;else this.__filteredMenu = this.__fuse.search(val);
  }

  resolve(data) {
    // if( this.opts.onSelect )
    // 	this.opts.onSelect(data)
    let didHandle = false;
    if (this.opts.handler) didHandle = Menu.handle(data, this.opts.handler, this.opts.handlerArgs);

    if (!didHandle && this._resolve) {
      this._resolve(data);

      this._resolve = null;
    }

    if (this.presenter) this.presenter.close();
  }

  scrollToSelected() {
    setTimeout(() => {
      let el = this.el.querySelector('.selected');
      el && this.setActiveItem(el);
    }, 0);
  }

  close() {
    this.presenter && this.presenter.close();
    this.presenter = null;
    this._resolve = null;
    this.promise = null;
  }
  /*
  	Presenters
  */


  popover(target, opts = {}) {
    if (this.__filteredMenu && this.__filteredMenu.length == 0) {
      this.promise = null;
      return Promise.resolve(false);
    }

    if (this.presenter && this.presenter instanceof _popover.default) {
      this.presenter.positionOver(target);
      return this.promise;
    }

    if (opts.adjustForMobile && _device.default.isMobile && !_device.default.isiPad) {
      let modalOpts = {
        btns: ['cancel', 'done']
      };
      if (this.searchIsOn) modalOpts.anchor = 'top';
      if (typeof opts.adjustForMobile == 'object') modalOpts = Object.assign(modalOpts, opts.adjustForMobile);
      return this.modal(modalOpts);
    }

    this.render();
    let onClose = opts.onClose;

    opts.onClose = () => {
      onClose && onClose();
      this.presenter = null;
      if (this.opts.multiple) this.resolve(this.selected);else this.resolve(false);
    };

    opts.onKeydown = this.onKeydown.bind(this);
    this.presenter = new _popover.default(target, this.el, opts);
    this.scrollToSelected();
    if (this.searchIsOn) this.focusSearch();
    return this.promise;
  }

  modal(opts = {}, mobileOpts) {
    if (mobileOpts && _device.default.isMobile && _device.default.minScreenSize <= 699) return this.panel(mobileOpts);else return this.panel(opts);
  }

  actionsheet(opts = {}) {
    return this.panel(Object.assign({
      type: 'actionsheet'
    }, opts));
  }

  panel(opts = {}) {
    this.render();
    opts = Object.assign({
      type: 'modal' // animation: 'scale'

    }, opts);
    opts.onKeydown = this.onKeydown.bind(this);
    let onClose = opts.onClose;

    opts.onClose = () => {
      onClose && onClose();
      this.presenter = null;
      if (this.opts.multiple) this.resolve(this.selected);else this.resolve(false);
    };

    let dialog = new _dialog.default({
      icon: opts.icon || '',
      title: opts.title || '',
      view: this.el,
      btns: opts.btns || false
    });
    this.presenter = new _panel.default(dialog.el, opts);
    this.presenter.open(); // if dialog btn clicked, take action

    dialog.promise.then(btn => {
      if (btn) this.resolve(btn); // this.presenter.close()
      else this.resolve(false);
    });
    this.scrollToSelected();
    if (this.searchIsOn) this.focusSearch();
    return this.promise;
  }

}

exports.default = Menu;
},{"lit-html":"SPDu","lit-html/directives/unsafe-html":"jTPt","lit-html/directives/live":"RaiV","../popover":"Soyf","../dialog":"pos3","../panel":"cmZt","fuse.js":"Wp9p","../../elements/hr":"IOAQ","../form-control/controls/check-box":"jNfL","../form-control/controls/select-field":"h8fl","../../util/device":"la8o","./style.less":"r4vn"}],"P61z":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litHtml = require("lit-html");

class TabView {
  constructor(view) {
    // custom element - we lazy load these
    if (typeof view === 'string') {
      this._viewName = view;
      this._viewClass = customElements.get(view);

      if (this._viewClass && this._viewClass.title) {
        this.__title = this._viewClass.title;
        this.__options = this._viewClass.tabOptions || {};
        this.__icon = this._viewClass.icon;
        this.__id = this.__title;
      } else {
        this.__id = this._viewName;
      }

      if (this._viewClass.id) this.__id = this._viewClass.id; // HTML element
    } else {
      view.hidden = true;
      this.__view = view;
      this.__title = view.title;
      this.__icon = view.getAttribute('icon');

      if (view.hasAttribute('view-id')) {
        this.__id = view.getAttribute('view-id');
      } else {
        this.__id = this.__title;

        this.__view.setAttribute('view-id', this.id);
      }

      this.__view.tabView = this;
      view.title = '';
    }
  }

  render(onClick) {
    return this.canDisplay ? (0, _litHtml.html)`
            <div class="tab-bar-item" ?active=${this.active} .tabView=${this} @click=${onClick}>
                <slot name="menu:${this.id}">${this.title}</slot>
            </div>
        ` : '';
  }

  get active() {
    return this.__active;
  }

  set active(isActive) {
    let didChange = this.__active != isActive;
    this.__active = isActive;
    if (!this.__view) return; // view not created yet

    if (!didChange) didChange = this.view.hidden == isActive;
    this.view.hidden = !isActive;
    if (!didChange) return;
    if (isActive) this.view.didBecomeActive && this.view.didBecomeActive();else this.view.didBecomeInactive && this.view.didBecomeInactive();
  }

  get view() {
    // lazy loading the html element view
    if (!this.__view) {
      if (this._viewClass) {
        this.__view = new this._viewClass();
        this.__view.tabView = this;
      } else {
        this.__view = document.createElement('section');
        this.__view.innerHTML = `<b-paper color="red" border dense><b>${this._viewName}</b> is not a custom element</b-paper>`;
      }

      this.__view.setAttribute('view-id', this.id);
    }

    return this.__view;
  }

  get id() {
    return this.__id;
  }

  get title() {
    return this.__title || 'No Title';
  }

  get options() {
    return this.__options || {};
  }

  get icon() {
    return this.__icon;
  } // NOTE: rename to "route" ?


  get path() {
    if (this._viewClass) {
      return this._viewClass.path || this.id;
    } else if (this.__view) {
      return this.__view.path || this.__view.getAttribute('path') || this.id;
    }
  }

  get canDisplay() {
    if (!this._viewClass || this._viewClass.canDisplay === undefined) return true;
    return this._viewClass.canDisplay;
  }

}

exports.default = TabView;
},{"lit-html":"SPDu"}],"jVU8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TabViews extends Map {
  set active(view) {
    if (view instanceof HTMLElement) view = view.tabBar.id;
    if (view instanceof _view.default) view = view.id;
    view = this.get(view) || this.first; // view is already the active one
    // if( view && view == this.active )
    //     return 

    if (view && !view.canDisplay) {
      // find the first view we can display
      let fallbackView;
      this.forEach(v => {
        if (!fallbackView && v.canDisplay) fallbackView = v;
      });
      this.active = fallbackView;
      return false;
    }

    this.forEach(v => v.active = false);

    if (view) {
      this.__active = view.id;
      view.active = true;
    }

    if (this.key) view ? localStorage.setItem('tab-bar:' + this.key + ':active', view.id) : localStorage.removeItem('tab-bar:' + this.key + ':active');
  }

  get active() {
    let active = this.key ? localStorage.getItem('tab-bar:' + this.key + ':active') : this.__active;
    return active && this.get(active);
  }

  get first() {
    return this.at(0);
  }

  at(i) {
    return Array.from(this.values())[i];
  }

  get last() {
    return this.at(this.size - 1);
  }

  map(fn) {
    let resp = [];
    this.forEach((v, key) => resp.push(fn(v, key)));
    return resp;
  }

}

exports.default = TabViews;
},{"./view":"P61z"}],"u9vI":[function(require,module,exports) {
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],"j3D9":[function(require,module,exports) {
var global = arguments[3];
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

},{}],"MIhM":[function(require,module,exports) {
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":"j3D9"}],"pJf5":[function(require,module,exports) {
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":"MIhM"}],"wppe":[function(require,module,exports) {
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":"MIhM"}],"uiOY":[function(require,module,exports) {
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":"wppe"}],"lPmd":[function(require,module,exports) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],"e5TX":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":"wppe","./_getRawTag":"uiOY","./_objectToString":"lPmd"}],"OuyB":[function(require,module,exports) {
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"bgO7":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":"e5TX","./isObjectLike":"OuyB"}],"iS0Z":[function(require,module,exports) {
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":"u9vI","./isSymbol":"bgO7"}],"CXfR":[function(require,module,exports) {
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":"u9vI","./now":"pJf5","./toNumber":"iS0Z"}],"BsQP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _menu = _interopRequireDefault(require("../menu"));

var _views2 = _interopRequireDefault(require("./views"));

var _view = _interopRequireDefault(require("./view"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('b-tabs', class extends _litElement.LitElement {
  static get properties() {
    return {
      key: {
        type: String,
        reflect: true
      },
      layout: {
        type: String,
        reflect: true
      },
      singlemenu: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.singlemenu = false;
    this.key = '';
    this.layout = 'top';
    this._resizeHandler = (0, _debounce.default)(() => {
      this.singlemenu = this.shouldBeSingleMenu;
    }, 250);
  }

  connectedCallback() {
    super.connectedCallback(); // window.addEventListener('resize', this._resizeHandler)

    if (!this.views) {
      let views = [];
      this.childNodes.forEach(node => {
        if (node.nodeName == '#text') {
          let str = node.textContent.trim();
          if (!str) return;

          let _views = str.split("\n").map(s => s.trim());

          _views = _views.filter(v => v); // ignore empty lines

          views.push(..._views);
          node.textContent = '';
        } else if (node.slot || ['#comment', 'SCRIPT', 'STYLE'].includes(node.nodeName)) {// ignore views that have a slot name
        } else if (node.title) {
          views.push(node);
        } else {
          node.hidden = true;
          console.error('Cannot use `' + node.tagName + '` as it is missing a `title`');
        }
      });
      this.views = views;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback(); // window.removeEventListener('resize', this._resizeHandler)
  } // this breaks down when last item is hidden


  get shouldBeSingleMenu() {
    if (this.offsetWidth == 0) return false;
    let menuItems = this.shadowRoot.querySelectorAll('.tab-bar-item');
    let last = menuItems[menuItems.length - 1];
    if (!last) return false;
    return last.offsetLeft + last.offsetWidth >= this.offsetWidth || last.offsetTop + last.offsetHeight >= this.offsetHeight;
  }

  get views() {
    return this.__views;
  }

  set views(views) {
    this.__views = this.__views || new _views2.default();
    this.__views.key = this.key;
    views.forEach(v => {
      v = new _view.default(v);

      this.__views.set(v.id, v);
    });
    this.active = this.getAttribute('active') || this.views.active || this.views.first;
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            position: relative;
            display: grid;
            flex: 1;
            min-height: 0;

            --menuBgd: none;
            --menuFontSize: 1em;
            --contentPadding: var(--view-gutter);
            --menuItemPadding: .75em 1em;
            --menuItemRadius: 4px;
            --inactiveColor: var(--b-tabs-inactive-color, rgba(0,0,0,.4));
            --activeColor:  var(--b-tabs-active-color, inherit);
            --border-color: var(--b-tabs-border-color, rgba(0, 0, 0, 0.1));
            --contentBgd: none;
            --contentShadow: none;
            --contentRadius: 0;
        }

        .tab-bar {
            display: flex;
            font-size: var(--menuFontSize);
            min-width: 0;
            overflow: hidden;
            background: var(--menuBgd);
        }

        .tab-bar-item {
            padding: var(--menuItemPadding);
            cursor: pointer;
            box-sizing: border-box;
            color: var(--inactiveColor);
        }

        .tab-bar-item[active] {
            color: var(--activeColor)
        }

        :host(:not([singlemenu])) .single-menu {display: none;}
        :host([singlemenu]) .tab-bar-item:not(.single-menu) {display: none;}

        :host([sticky]) {
            --menuBgd: #fff;
        }
        
        :host([sticky]) header {
            position: sticky;
            top: 0px;
            z-index: 1000;
        }

        :host([layout="top"]) { grid-template-rows: auto 1fr; }
        :host([layout="bottom"]) { grid-template-rows: 1fr auto; }
        :host([layout="left"]) { grid-template-columns: auto 1fr; }
        :host([layout="right"]) { grid-template-columns: 1fr auto; }

        :host([layout="left"]) .tab-bar,
        :host([layout="right"]) .tab-bar {
            flex-direction: column;
        }

        :host([layout="bottom"]) .tab-bar,
        :host([layout="right"]) .tab-bar {
            order: 2;
        }

        :host([layout="top"]) .tab-bar { border-bottom: solid 1px var(--border-color); }
        :host([layout="bottom"]) .tab-bar { border-top: solid 1px var(--border-color); }
        :host([layout="left"]) .tab-bar { border-right: solid 1px var(--border-color); }
        :host([layout="right"]) .tab-bar { border-left: solid 1px var(--border-color); }

        :host([layout="top"]) .tab-bar-item { border-bottom: solid 2px transparent; }
        :host([layout="bottom"]) .tab-bar-item { border-top: solid 2px transparent; }
        :host([layout="left"]) .tab-bar-item { border-right: solid 2px transparent; }
        :host([layout="right"]) .tab-bar-item { border-left: solid 2px transparent; }

        :host([layout="top"]) .tab-bar-item:hover { border-bottom-color: currentColor; }
        :host([layout="bottom"]) .tab-bar-item:hover { border-top-color: currentColor; }
        :host([layout="left"]) .tab-bar-item:hover { border-right-color: currentColor; }
        :host([layout="right"]) .tab-bar-item:hover { border-left-color: currentColor; }

        :host([layout="top"]) .tab-bar-item[active] { border-bottom-color: currentColor; }
        :host([layout="bottom"]) .tab-bar-item[active] { border-top-color: currentColor; }
        :host([layout="left"]) .tab-bar-item[active] { border-right-color: currentColor; }
        :host([layout="right"]) .tab-bar-item[active] { border-left-color: currentColor; }

        @media (max-width: 550px) {

            :host([layout="left"]),
            :host([layout="right"]) {
                grid-template-columns: none;
                grid-template-rows: auto 1fr;
            }

            :host([layout="left"]) .tab-bar,
            :host([layout="right"]) .tab-bar {
                flex-direction: row;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
                border-bottom: solid 1px rgba(0,0,0,.1);
            }

            :host([layout="left"]) .tab-bar-item { border-right: none; }
            :host([layout="right"]) .tab-bar-item { border-left: none; }

            :host([layout="left"]) .tab-bar-item, 
            :host([layout="right"]) .tab-bar-item {
                border-bottom: solid 2px transparent;
                flex-shrink: 0;
            }

            :host([layout="left"]) .tab-bar-item:hover, 
            :host([layout="right"]) .tab-bar-item:hover { border-bottom-color: currentColor; }

            :host([layout="left"]) .tab-bar-item[active], 
            :host([layout="right"]) .tab-bar-item[active] { border-bottom-color: currentColor; }
        }

        /*
            Slotted Content
        */
        slot.content {
            display: flex;
            background: var(--contentBgd);
            box-shadow: var(--contentShadow);
            border-radius: var(--contentRadius);
            overflow: var(--overflow, auto);
        }

        .content::slotted(*) {
            flex: 1;
            align-self: flex-start;
            max-height: 100%;
            box-sizing: border-box;
        }
        
        /* dont add padding to custom elements */
        .content::slotted(.padded),
        .content::slotted(div),
        .content::slotted(section) {
            padding: var(--contentPadding);
        }

        .content::slotted([hidden]) {
            display: none !important;
        }
        
        /*
        THEME: root-tabs
        */
        :host(.root-tabs) {
            --activeColor: inherit;
            --contentBgd: #fff;
            --contentShadow: rgba(0,0,0,.2) 0 0 3px;
            --menuFontSize: 1.1em;
            --menuItemPadding: .65em 1em;
        }

        :host(.root-tabs) slot.content {
            border-radius: 4px 0 0 0;
        }

        :host(.root-tabs) .tab-bar {
            border: none !important;
            padding-left: .35em;
            padding-top: .25em;
            z-index: 1;
        }

        :host(.root-tabs[layout="top"]) .tab-bar { padding: .5em 0 0 .5em; }
        :host(.root-tabs[layout="bottom"]) .tab-bar { padding: 0 0 .5em .5em; }
        :host(.root-tabs[layout="left"]) .tab-bar { padding: .5em 0 0 .5em; }
        :host(.root-tabs[layout="right"]) .tab-bar { padding: .5em .5em 0 0; }

        :host(.root-tabs) .tab-bar-item {
            border: solid 1px transparent;
        }

        :host(.root-tabs[layout="top"]) .tab-bar-item {
            border-bottom: none !important;
            border-radius: var(--menuItemRadius) var(--menuItemRadius) 0 0;
        }

        :host(.root-tabs[layout="bottom"]) .tab-bar-item {
            border-top: none !important;
            border-radius: 0 0 var(--menuItemRadius) var(--menuItemRadius);
        }

        :host(.root-tabs[layout="left"]) .tab-bar-item {
            border-right: none !important;
            border-radius: var(--menuItemRadius) 0 0 var(--menuItemRadius);
        }

        :host(.root-tabs[layout="right"]) .tab-bar-item {
            border-left: none !important;
            border-radius: 0 var(--menuItemRadius) var(--menuItemRadius) 0;
        }

        :host(.root-tabs) .tab-bar-item:hover:not([active]) {
            border-color: rgba(0,0,0,.1);
            color: rgba(0,0,0,.5);
        }

        :host(.root-tabs) .tab-bar-item[active] {
            background: var(--contentBgd);
            /* border: solid 1px rgba(0,0,0,.1); */
            box-shadow: rgba(0,0,0,.2) 0 0 3px;
        }
    `;
  }

  renderTabBar() {
    if (['none', 'false'].includes(this.getAttribute('tab-bar'))) return (0, _litElement.html)`<div></div>`;

    if (this.getAttribute('tab-bar')) {
      if (!this.__customTabBar) {
        let TabBar = customElements.get(this.getAttribute('tab-bar'));
        if (!TabBar) return console.error(`Tabs: ${this.getAttribute('tab-bar')} does not exist`);
        this.__customTabBar = new TabBar();
        this.__customTabBar.host = this;
        this.__customTabBar.model = this.model;
        this.__customTabBar.views = this.views;
        this.__customTabBar.onMenuClick = this.menuClick.bind(this);

        this.__customTabBar.classList.add('tab-bar');

        this.__customTabBar.innerHTML =
        /*html*/
        `
                    <span slot="menu:before"><slot name="menu:before"></slot></span>
                    <span slot="menu:after"><slot name="menu:after"></slot></span>
                `;
      } else {
        this.__customTabBar.update();
      }

      return this.__customTabBar;
    } else {
      return (0, _litElement.html)`
            <header class="tab-bar">
                <slot name="menu:before"></slot>
                <div class="tab-bar-item single-menu" active @click=${this.popoverMenu}>
                    <b-icon name="menu"></b-icon>
                    ${this.views.active.title}
                </div>
                ${this.views.map(v => v.render(this.menuClick))}
                <slot name="menu:after"></slot>
            </header>`;
    }
  }

  render() {
    return (0, _litElement.html)`
        ${this.renderTabBar()}
        <slot class="content"></slot>
    `;
  }

  async popoverMenu(e) {
    let selected = await new _menu.default(this.views.map(v => {
      return {
        label: v.title,
        val: v
      };
    })).popover(e.target);
    if (selected) this.active = selected.val;
  }

  menuClick(e) {
    let oldVal = this.active;

    if (!e.currentTarget.tabView) {
      return console.error(`Tabs: tab menu items must have .tabView set`);
    }

    this.dispatchEvent(new CustomEvent('menu-clicked', {
      detail: {
        tabView: e.currentTarget.tabView,
        oldTabView: this.views.get(oldVal)
      },
      bubbles: false,
      composed: true
    }));
    this.active = e.currentTarget.tabView;
    if (this.active != oldVal) this.dispatchEvent(new CustomEvent('active-changed', {
      detail: {
        tabView: this.views.active
      },
      bubbles: false,
      composed: true
    }));
  }

  onModelChange() {
    // once a model has been set on the tabs (even if setting to null)
    // we will then begin propagating the model to the tab views
    this._propagateModel = true;
    if (this.views) this.views.active.view.model = this.model;
  }

  get active() {
    return this.views && this.views.active && this.views.active.id;
  }

  set active(val) {
    this.views.active = val;
    this.update();
    let view = this.views.active.view;
    this.setAttribute('active', this.views.active.id);
    if (this._propagateModel) view.model = this.model;
    if (view.parentElement != this) this.appendChild(view);
  }

});

var _default = customElements.get('b-tabs');

exports.default = _default;
},{"lit-element":"bhxD","../menu":"tCYJ","./views":"jVU8","./view":"P61z","lodash/debounce":"CXfR"}],"ZQnj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("../../util/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormHandler extends HTMLElement {
  constructor() {
    super();
    this.controlsByKey = {}; // bind context to functions

    this.onModelSync = this.onModelSync.bind(this);
    this.onModelChange = this.onModelChange.bind(this);
    this.onModelEdited = this.onModelEdited.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  get autoGridArea() {
    return this.hasAttribute('auto-grid-area');
  }

  get autoSave() {
    return this.hasAttribute('autosave');
  }

  set autoSave(val) {
    val ? this.setAttribute('autosave', '') : this.removeAttribute('autosave');
  }

  get patchSave() {
    return this.hasAttribute('patchsave');
  }

  set patchSave(val) {
    val ? this.setAttribute('patchsave', '') : this.removeAttribute('patchsave');
  }

  connectedCallback() {
    let host = this.getRootNode().host;
    if (host && !host.formHandler) host.formHandler = this; // allow for nested custom elements to render first

    setTimeout(() => {
      this.bindControls();
    }, 0);
  }

  get values() {
    let vals = {};
    this.controls.forEach(control => {
      if (control.key) vals[control.key] = control.value;
    });
    return vals;
  }

  bindControls() {
    // TODO: change to `controls`?
    this.controls = this.editors = Array.from(this.querySelectorAll('form-control[key], check-box[key], radio-group[key], text-field[key], select-field[key]'));
    this.controls.forEach(el => {
      let key = el.getAttribute('key');

      if (key) {
        this.controlsByKey[key] = el;
        if (this.autoGridArea) el.style.gridArea = key;
      }
    });
    if (this.disabled || this.hasAttribute('disabled')) this.disabled = true;
    this.addEventListener('change', this.onEditorChange, true);

    this._updateEditors();
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'disabled') this.disabled = newValue !== null;
  }

  disconnectedCallback() {
    this.controls = this.editors = [];
    this.controlsByKey = {};
    this.model = null;
    this.removeEventListener('change', this.onEditorChange);
  }

  get model() {
    return this._model;
  }

  set model(model) {
    if (model == this.model) return;

    if (this.model) {
      this.model.off('sync', null, this);
      this.model.off('change', null, this);
      this.model.off('edited', null, this);
      delete this._model;
    }

    if (!model) return;
    this._model = model;
    this.model._editedAttrs = this.model._editedAttrs || {};
    this.model.on('sync', this.onModelSync, this);
    this.model.on('change', this.onModelChange, this);
    this.model.on('edited', this.onModelEdited, this);

    this._updateEditors();
  }

  store(vals) {
    let key = this.getAttribute('store');
    if (!key) return undefined;
    let data = (0, _store.default)(key) || {};
    if (vals === undefined) return data;
    data = Object.assign(data, vals);
    (0, _store.default)(key, data);
  }

  storedValue(key, defaultVal = null) {
    if (this.model) return this.model.has(key) ? this.model.get(key) : defaultVal;
    let data = this.store();
    return data ? data[key] : defaultVal;
  }

  _updateEditors() {
    if (this.controls && (this.model || this.hasAttribute('store'))) {
      this.controls.forEach(el => {
        // set the value of each editor based on the value in the model
        let key = el.getAttribute('key');
        let val = this.storedValue(key);
        if (val && val.format) val = val.format(el.control._datePicker ? el.control._datePicker.format : 'MM/DD/YYYY');
        if (val !== undefined) el.value = val;
      });
      this.setControlIfs();
    }
  }

  onModelSync(m, attrs, opts) {
    let trigger = false; // see if we need to clear any "edited" attributes

    for (let key in attrs) {
      if (m._editedAttrs && m._editedAttrs[key] !== undefined) {
        trigger = true;
        delete m._editedAttrs[key];
      }
    } // if we cleared any edited attributes, trigger the change


    if (trigger) this.model.trigger('edited', this.model.isEdited(), this.model.editedAttrs());
  }

  onModelEdited(isEdited, editedAttrs) {
    this.controls.forEach(el => {
      if (editedAttrs[el.key] != undefined && !this.autoSave) el.setAttribute('unsaved', '');else el.removeAttribute('unsaved');
    });
    if (!isEdited) this.setControlIfs();
  }

  onModelChange(m, opts = {}) {
    for (let key in m.changed) {
      // if changed value is different than edited value, clear the edited value
      if (m._editedAttrs && m._editedAttrs[key] && m._editedAttrs[key] != m.changed[key]) {
        delete m._editedAttrs[key];
      } // set the editor with the new value


      if (this.controlsByKey[key]) {
        this.controlsByKey[key].value = m.changed[key];
        this.controlsByKey[key].removeAttribute('unsaved'); // this causes problems with tracking "editedAttr"
        // if( m._origAttrs )
        // 	m._origAttrs[key] = m.changed[key]
      }
    }
  }

  async onEditorChange(e) {
    if (!e.detail) return;
    let m = this.model;
    let el = e.target;
    let key = el.getAttribute('key');
    let val = e.detail.value;
    if (!key) return;
    let changes = {};
    changes[key] = val;

    if (this.validateChange && (await this.validateChange(m, changes, key, val)) === false) {
      el.value = changes[key] !== undefined ? changes[key] : el.value;
      return;
    } // optionally make other changes based on this change
    // TODO: think of a way to implement this again for the custom element?
    // if( this.opts.onEditorChange && this.opts.onEditorChange(m, changes, key, val) === false )
    // 	return
    // if other changes where made from validate, propagate to other controls


    if (this.validateChange) for (let _key in changes) {
      if (_key != key) {
        let _el = this.get(_key);

        if (_el) _el.value = changes[_key];
      }
    } // ugh, this is hacky and should be solved a better way

    if (el.control && el.control.type == 'date' && val) {
      changes[key] = el.control._datePicker.formatted('YYYY-MM-DD');
    }

    this.store(changes);

    if (this.model) {
      if (this.autoSave === true) {
        this.model.save(changes, {
          patch: this.patchSave || false
        });
        this.model.trigger('edited', false, changes);
        this.model.trigger('saved', changes);
      } else {
        this.model.editAttr(changes);
      }
    }

    this.setControlIfs(key);
    this.onChange && this.onChange(changes);
  }

  setControlIfs(ifKey) {
    let toggleTypes = Object.keys(toggleIf);
    this.controls.forEach(control => {
      toggleTypes.forEach(toggleKey => {
        // skip controls that dont need testing
        if (!control[toggleKey]) return;
        let valid = true;

        if (typeof control[toggleKey] == 'function') {
          valid = control[toggleKey](this, control);
        } else {
          if (ifKey && control[toggleKey][ifKey] === undefined) return;

          for (let key in control[toggleKey]) {
            let allowedVal = control[toggleKey][key]; // prefer the model, but 

            let val = this.model ? this.model.get(key) : this.get(key).value;

            if (Array.isArray(allowedVal)) {
              if (!allowedVal.includes(val)) valid = false;
            } else {
              if (allowedVal != val) valid = false;
            }
          }
        }

        toggleIf[toggleKey](control, valid);
      });
    });
  }

  get disabled() {
    return this.__disabled || false;
  }

  set disabled(disabled = false) {
    this.__disabled = disabled === true;
    this.controls && this.controls.forEach(el => el.disabled = this.__disabled);
  }

  get isInvalid() {
    return !!this.controls.find(el => el.isInvalid);
  }

  focus(index = 0) {
    this.controls[index] && this.controls[index].focus();
  }

  get(key) {
    if (typeof key == 'number') return this.controls[key];
    return Array.from(this.controls).find(ed => ed.key == key);
  }

}

customElements.define('form-handler', FormHandler);

var _default = customElements.get('form-handler');

exports.default = _default;
const toggleIf = {
  displayIf(control, valid) {
    if (valid) control.hidden = false;else control.hidden = true;
  },

  hideIf(control, valid) {
    if (valid) control.hidden = true;else control.hidden = false;
  },

  disableIf(control, valid) {
    if (valid) control.disabled = true;else control.disabled = false;
  },

  enableIf(control, valid) {
    if (valid) control.disabled = false;else control.disabled = true;
  }

};
},{"../../util/store":"z4Ln"}],"Sclr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _default = (0, _litElement.css)`
slot#value {
	display: none;
}

slot[name="before"] { grid-area: before }
slot[name="help"] { grid-area: help }
slot[name="after"] { grid-area: after }

slot[name="before"],
slot[name="help"],
slot[name="after"]{
	display: block;
}

:host {
	align-self: flex-start;
	/* contain: content; */
	position: relative;
	display: inline-block;
	vertical-align: top;
	--placeholderColor: var(--fc-placeholder-color, rgba(0,0,0,.3));
	--selectionBgd: #FFECB3;
	--focusBgd: #FFF8E1;
	--focusColor: var(--fc-theme);
	 --bgd:var(--fc-bgd, #fff);
	--borderColor: rgba(0,0,0,.3);
	--invalidColor: #ff1744;
	--unsavedColor: transparent; /*#FFC107;*/
	--disabledColor: var(--fc-disabled-color, rgba(0,0,0,.3));
	--labelFontFamily: inherit;
	--labelFontSize: inherit;
	--padY: 0;
	--padX: 0;
}

:host main {
	grid-area: main;
	width: 100%;
	position: relative;
	z-index: 10;
	display: flex;
	line-height: 1em;
	caret-color: #E91E63;
	box-sizing: border-box;
}

/* :host(:not([disabled]):hover) main, */
/* :host(:not([disabled]):focus-within) main */
/* :host(:not([disabled])[focused]) main { */
	/* background: var(--focusBgd);
} */

:host([disabled]) main {
	color: var(--disabledColor);
}

:host(:not([disabled])) main ::selection {
	background: var(--selectionBgd);
}

/* :host(:not([disabled])) main {
	cursor: text;
} */

.label {
	position: absolute;
	z-index: 0;
	box-sizing: border-box;
	width: 100%;
	white-space: nowrap;
	font-family: var(--labelFontFamily);
	font-size: var(--labelFontSize);
}

:host([nolabel]) .label {
	display: none !important;
}

.prefix {
	order: 10;
}

.suffix {
	order: 30;
}

.prefix, .suffix {
	position: relative;
	z-index: 10;
	flex-shrink: 0;
    color: var(--placeholderColor);
	display: flex;
	align-items: center;
}

slot[name="prefix"]::slotted(form-control),
slot[name="suffix"]::slotted(form-control) {
	color: #333;
}

/* .control {
	order: 20;
	flex-grow: 1;
	outline: none;
	min-width: .25em;
	position: relative;
	z-index: 10;
} */

slot[name="control"]::slotted(*) {
	/* background: red; */
	order: 20;
	flex-grow: 1;
	outline: none;
	min-width: .25em;
	position: relative;
	z-index: 10;
}

:host(:not([disabled])) slot[name="control"]::slotted(*) {
	-webkit-user-select: text;
}

/* .control[empty]:before {
	content: attr(data-placeholder);
	color: var(--placeholderColor);
} */

:host(:not([material])[invalid]) main {
	color: var(--invalidColor)
}

.btns {
	display: none;
}

:host([btns]) .btns {
	order: 40;
	display: grid;
	/* height: 100%; */
	top: 0;
	flex-direction: column;
	min-width: 0;
	flex-grow: 0;
	font-size: 50%;
	position: relative;
	cursor: pointer;
}

.btns > span {
	padding: 0 .25em;
	display: flex;
	justify-content: center;
	align-items: center;
}

.btns > span svg {
	height: 2em;
	width: 2em;
}

.btn-save:hover {
	color: green;
	/* background: blue; */
}

.btn-cancel:hover {
	color: red;
	/* background: orange; */
}

:host([hidden]),
[hidden] {
	display: none !important;
}

slot[name="help"] {
	margin: .5em 0 0;
	font-size: .8em;
	color: var(--fc-help-color, rgba(0,0,0,.6));
	display: block;
}

/* some default styles for native input controls */ 
::slotted(input) {
	font-family: inherit;
	font-size: inherit;
	color: inherit;
	width: 4em; /* flex will make it grow */
	border: none;
	background: none;
	padding: var(--padX) var(--padY);
}

/* doesn't appear to work */
::slotted(input::placeholder) {
	color: var(--placeholderColor);
}

/* remove autofill blue/yellow background */
::slotted(input:-webkit-autofill) {
    -webkit-box-shadow:0 0 0 50px var(--bgd) inset;
	-webkit-text-fill-color: var(--theme-color);
}

::slotted(input:-webkit-autofill:focus) {
    -webkit-box-shadow: 0 0 0 50px var(--bgd) inset;
}

:host([label]:not([material])) {
	margin-top: 1em;
}

:host(:not([material])) .label {
	top: -1em;
}


/*
	Material
*/

:host([material]) {
	--focusBgd: transparent;
	/* padding-top: .25em; */
	--padY: .6em;
	--borderColor: var(--fc-border-color, rgba(0,0,0,.2));
}

:host([material]) main {
	border-bottom: solid var(--fc-border-size, 1px) var(--borderColor);
	padding-top: var(--padY);
	border-radius: var(--fc-border-radius, 0px);
}

:host([material]:not(:focus-within):not([focused]):hover) main {
	background: var(--bgd);
}

:host([material]) main:before {
	content: '';
	border: solid 2px transparent;
	position: absolute;
	width: calc(100% + 2px);
	height: calc(100% + 2px);
	box-sizing: border-box;
	top: -1px;
	left: -1px;
	border-radius: var(--fc-border-radius, 0px);
}

:host([material]) slot[name="control"]::slotted(*) {
	padding: var(--padY) 0;
	/* border-bottom: solid 1px transparent; */
}

:host([material]) slot[name="control"]::slotted(radio-group) {
	--padY: .25em;
	--padX: .25em;
}

:host slot[name="control"]::slotted(check-box) {
	 border-bottom: solid 2px transparent
}

/* :host([unsaved]:not([material])) slot[name="control"]::slotted(check-box) {
	border-bottom-color: var(--unsavedColor);
} */

:host([material]) .label {
	color: var(--placeholderColor);
	display: block;
	transition: 120ms;
	position: absolute;
	padding: var(--padY) 0;
}

:host([material]) .prefix,
:host([material]) .suffix {
	padding: var(--padY) 0;
}

:host([material]:not([empty])),
:host([material][show*="placeholder"]),
:host([material]:focus-within),
:host([material][focused]) {
	--labelFontSize: .7em;
}

:host([material]) .control:not([empty]) ~ .label,
:host([material]:not([empty])) .label,
:host([material][show*="placeholder"]) .label,
:host([material]:focus-within) .label,
:host([material][focused]) .label {
	color: inherit;
	transform: translateY(calc(-50% - (var(--padY) / 2)));
	z-index: 11;
}

:host([material][empty]:not([nolabel]):not(:focus-within)) [name="control"]::slotted(*),
:host([material][empty]:not([nolabel]):not(:focus-within)) [name="main"]::slotted(*) {
	opacity: 0;
}

:host([material]:not([show*="prefix"])) .prefix,
:host([material]:not([show*="suffix"])) .suffix {
	opacity: 0;
	transition: 120ms;
}

:host([material][show*="placeholder"]) [name="control"]::slotted(*) {
	opacity: 1 !important;
}

/* :host([material]) .control:not([empty]) ~ .prefix,
:host([material]) .control:not([empty]) ~ .suffix, */
:host([material]:not([empty])) .prefix,
:host([material]:not([empty])) .suffix,
:host([material]:focus-within) .prefix,
:host([material]:focus-within) .suffix,
:host([material][focused]) .prefix,
:host([material][focused]) .suffix {
	opacity: 1;
}

:host([material]:focus-within) main:before,
:host([material][focused]) main:before {
	border-bottom-color: var(--focusColor);
}

:host([material][invalid]) main:before {
	border-bottom-color: var(--invalidColor);
}

/* :host([material][unsaved]) main:before {
	border-bottom-color: var(--unsavedColor);
} */

:host([material]:focus-within) .label,
:host([material][focused]) .label {
	color: var(--focusColor);
}

:host([material][invalid]) .label {
	color: var(--invalidColor);
}


/*
	Material Outline
*/
:host([material="outline"]) {
	/* margin: 0 .5em .5em 0; */
	--padY: .75em;
	--padX: .75em;
}

:host([material="outline"]),
:host([material="outline"]) main,
:host([material="outline"]) main:before {
	border-radius: var(--fc-border-radius, 4px);
}
	
:host([material="outline"]) main {
	border: solid 1px var(--borderColor);
	padding-top: 0;
	background: var(--bgd);
}

/* :host([material="outline"]) .control, */
:host([material="outline"]) slot[name="control"]::slotted(*),
:host([material="outline"]) .label {
	padding: var(--padX) var(--padY);
	border-radius: var(--fc-border-radius, 3px);
}

:host([material="outline"]) slot[name="control"]::slotted(radio-group) {
	--padY: .25em;
	--padX: .5em;
}

:host([material="outline"]) .label {
	width: auto;
}

:host([material="outline"]) .prefix {
	padding: var(--padX) var(--padY);
    padding-right: 0;
    margin-right: calc(var(--padX) * -1);
}

:host([material="outline"]) .suffix {
	padding: var(--padX) var(--padY);
    padding-left: 0;
    margin-left: calc(var(--padX) * -1);
}

:host([material="outline"]) .control:not([empty]) ~ .label,
:host([material="outline"]:not([empty])) .label,
:host([material="outline"]:focus-within) .label,
:host([material="outline"][focused]) .label {
	background: var(--bgd);
	padding: 0 .35em;
	margin-left: var(--padX);
	transform: translateY(-50%);
}

:host([material="outline"]:focus-within) main:before,
:host([material="outline"][focused]) main:before {
	border-color: var(--focusColor);
}	

:host([material="outline"][invalid]) main:before {
	border-color: var(--invalidColor);
}

/* :host([material="outline"][unsaved]) main:before {
	border-color: var(--unsavedColor);
} */

:host([material="outline"]) slot[name="help"] {
	margin: .5em var(--padX) 0
}

/*
	Filled
*/		
:host([material="filled"]) {
	--bgd: var(--fc-bgd, #eee);
	--focusBgd: var(--bgd);
	--padY: .75em;
	--padX: .75em;
	--placeholderColor: var(--fc-placeholder-color, rgba(0,0,0,.3));
	/* margin: 0 0 .5em 0; */
}

:host([material="filled"]) main {
	border: solid 1px var(--bgd);
	padding-top: 1em;
	border-radius: var(--fc-border-radius, 4px);
	background: var(--bgd);
}

:host([material="filled"][outside]) main {
	padding-top: 0;
}

:host([material="filled"].nolabel) main, /* deprecated, use attribute */
:host([material="filled"][nolabel]) main {
	padding-top: 0;
}

:host([material="filled"].dense) main, /* deprecated, use attribute */
:host([material="filled"][dense]) main {
	--padY: .5em;
}

:host([material="filled"]) main:before {
	border-radius: var(--fc-border-radius, 4px);
}

:host([material="filled"]) .control,
:host([material="filled"]) slot[name="control"]::slotted(*),
:host([material="filled"]) .label {
	padding: var(--padY) var(--padX);
	border-radius: 3px;
}

:host([material="filled"]) slot[name="control"]::slotted(input) {
	padding: 0;
    margin: var(--padY) var(--padX);
    border-radius: 0;
}

:host([material="filled"]) .label {
	transform: translateY(-20%);
	width: auto;
}

:host([material="filled"][outside]) .label {
	transform: translateY(0%);
}

:host([material="filled"]) .prefix {
	padding: var(--padY) var(--padX);
    padding-right: 0;
    margin-right: calc(-1 * var(--padX));
}

:host([material="filled"]) .suffix {
	padding: var(--padY) var(--padX);
    padding-left: 0;
    margin-left: calc(-1 * var(--padX));
}

:host([material="filled"]:not([empty])) .label,
:host([material="filled"][show*="placeholder"]) .label,
:host([material="filled"]:focus-within) .label,
:host([material="filled"][focused]) .label {
	background: var(--bgd);
	padding: 0 .35em;
	margin-left: var(--padX);
	transform: translateY(-50%);
}

:host([material="filled"][outside]:not([empty])) .label,
:host([material="filled"][outside][show*="placeholder"]) .label,
:host([material="filled"][outside]:focus-within) .label,
:host([material="filled"][outside][focused]) .label {
	transform: translateY(-100%);
	background: none;
	margin-left: 0;
}

:host([material="filled"]:focus-within) main:before,
:host([material="filled"][focused]) main:before {
	border-color: var(--focusColor);
}	

:host([material="filled"][invalid]) main:before {
	border-color: var(--invalidColor);
}

/* :host([material="filled"][unsaved]) main:before {
	border-color: var(--unsavedColor);
} */

:host([material="filled"]) slot[name="help"] {
	margin: var(--padY) var(--padX) 0;
}
`;

exports.default = _default;
},{"lit-element":"bhxD"}],"pZT1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (el, val) => {
  if (!val || val === '0') el.setAttribute('falsy', '');else el.removeAttribute('falsy');
  if (!val) el.setAttribute('no-value', '');else el.removeAttribute('no-value');
  if (!val && !el.getAttribute('placeholder')) el.setAttribute('empty', '');else el.removeAttribute('empty');
};

exports.default = _default;
},{}],"hx3P":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (el, val) => {
  let required = el.hasAttribute('required'); // `validate` is deprecated, use `pattern`

  let pattern = el.getAttribute('pattern') || el.getAttribute('validate');
  if (!pattern && el.validate) return el.validate(val, el) !== false;
  if (!pattern) return required ? !!val : true;

  switch (pattern) {
    case 'int':
      pattern = '^\\d+$';
      break;

    case 'float':
    case 'decimal':
      pattern = '^\\d+(\\.\\d*)?$|^\\.\\d+$';
      break;

    case 'email':
      pattern = '^\\S+@\\S+\\.\\S+$';
      break;
  }

  return !required && !val ? true : new RegExp(pattern).test(val);
};

exports.default = _default;
},{}],"h6i7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (e, el, val) => {
  let okKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Backspace', 'Delete', 'Tab'];
  let metaKey = e.metaKey || e.ctrlKey;
  let okPress = okKeys.includes(e.key) || metaKey;
  let max = el.getAttribute('maxlength') || el.getAttribute('max');
  if (max && val.length >= max && !okPress) return true;
  return false;
};

exports.default = _default;
},{}],"wYzd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _setValueAttrs = _interopRequireDefault(require("./setValueAttrs"));

var _validatePattern = _interopRequireDefault(require("./validatePattern"));

var _stopMaxLength = _interopRequireDefault(require("./stopMaxLength"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(input) {
  setTimeout(() => {
    (0, _setValueAttrs.default)(input, input.value);
  });
  input.addEventListener('change:value', onChange);
  input.addEventListener('input', onInput);
  input.addEventListener('focus', onFocus);
  input.addEventListener('blur', onBlur);
  input.addEventListener('keydown', onKeyDown); // let hasPattern = input.hasAttribute('pattern')
  // let hasAutocomplete = input.hasAttribute('autoComplete')

  if (input.type == 'email') {
    if (!input.pattern) input.pattern = 'email';
    if (!input.autocomplete) input.autocomplete = 'email';
  }

  if (input.type == 'tel') {
    if (!input.autocomplete) input.autocomplete = 'phone';
  }
}

const testPattern = input => {
  if ((0, _validatePattern.default)(input, input.value)) {
    delete input.isInvalid;
    input.removeAttribute('invalid');
  } else if (input.hasAttribute('reset-invalid')) {
    input.value = input._originalVal || '';
    delete input.isInvalid;
    input.removeAttribute('invalid');
  } else {
    input.isInvalid = true;
    input.setAttribute('invalid', '');
  }
};

const onChange = e => {
  (0, _setValueAttrs.default)(e.target, e.target.value);
};

const onFocus = e => {
  e.target._originalVal = e.target.value;
};

const onBlur = e => {
  testPattern(e.target);
  (0, _setValueAttrs.default)(e.target, e.target.value);
  delete e.target._originalVal;
};

const onInput = e => {
  (0, _setValueAttrs.default)(e.target, e.target.value);
};

const onKeyDown = e => {
  if (e.target.hasAttribute('invalid')) e.target.removeAttribute('invalid');

  if (e.key == 'Escape') {
    e.target.value = e.target._originalVal || '';
    e.target.blur();
  } // maxlength doesn't work on iOS, so let's implement our own


  if ((0, _stopMaxLength.default)(e, e.target, e.target.value)) e.preventDefault();
};
},{"./setValueAttrs":"pZT1","./validatePattern":"hx3P","./stopMaxLength":"h6i7"}],"swB1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formControlCss = _interopRequireDefault(require("./form-control.css.js"));

var _nativeInputHelper = _interopRequireDefault(require("./util/nativeInputHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	Form Control
*/
const CONTROLS = '[slot="control"], .control, text-field, rich-text-field, select-field, check-box, radio-group, token-text-field';
const MIRROR_CONTROL_ATTRS = ['invalid', 'empty', 'no-value', 'falsy', 'focused', 'value'];

class FormControlElement extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    let label = this.getAttribute('label') || '<slot name="label"></slot>';
    let prefix = this.getAttribute('prefix') || '<slot name="prefix"></slot>';
    let suffix = this.getAttribute('suffix') || '<slot name="suffix"></slot>'; // if prefix/suffix have spaces at the beginning or end of string assume the
    // developer wanted the sapce to show and replace with non-breaking space so it does

    prefix = prefix.replace(/^\s+/, '&nbsp;');
    prefix = prefix.replace(/\s+$/, '&nbsp;');
    suffix = suffix.replace(/^\s+/, '&nbsp;');
    suffix = suffix.replace(/\s+$/, '&nbsp;');
    temp.innerHTML = `
			<style>${_formControlCss.default.cssText}</style>
			<slot name="before"></slot>
			<main>
				<slot name="control"></slot>
				<slot name="main"></slot>
				<div class="prefix">${prefix}</div>
				<div class="label">${label}</div>
				<div class="suffix">${suffix}</div>
				<div class="btns">
					<span class="btn-save">
						<svg class="check" focusable="false" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
					</span>
					<span class="btn-cancel">
						<svg class="j2dfb39" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
					</span>
				</div>
			</main>
			<slot name="help"></slot>
			<slot name="after"></slot>
			<slot id="value"></slot>`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
    let value = this.$('#value');
    this._val = value.assignedNodes().map(el => el.textContent.trim()).join(' ');
    this._val = this._val.replace(/^\n|\n$/g, '').trim();
    this.control = this.querySelector(CONTROLS);

    if (this.control) {
      this.control.slot = 'control';
      this.mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(m => {
          // mirror these attributes from the control onto the form-control
          if (MIRROR_CONTROL_ATTRS.includes(m.attributeName)) {
            if (this.control.hasAttribute(m.attributeName)) this.setAttribute(m.attributeName, this.control.getAttribute(m.attributeName));else this.removeAttribute(m.attributeName);
          }
        });
      });
      this.mutationObserver.observe(this.control, {
        attributes: true,
        childList: false,
        subtree: false
      }); // if native input, we need to add a helper to set expected values for mutation observer above

      if (this.control.tagName == 'INPUT') (0, _nativeInputHelper.default)(this.control);
    }

    this.addEventListener('click', this._onClick.bind(this), true);
    this.addEventListener('change', this._onChange);
    this.$$('slot').forEach(slot => {
      slot.addEventListener('slotchange', e => {
        if (slot.assignedNodes().length == 0) slot.setAttribute('hidden', '');else slot.removeAttribute('hidden');
      });
    });
  }

  _onChange(e) {
    if (e.target == this) return;
    if (e.target.tagName == 'FORM-CONTROL') return;
    e.stopPropagation();
    var event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        key: this.key
      }
    });
    this.dispatchEvent(event);
  }

  $(str) {
    return this.shadowRoot.querySelector(str);
  }

  $$(str) {
    return this.shadowRoot.querySelectorAll(str);
  }

  connectedCallback() {
    this._setClassNames(); // hide slots that are empty


    this.$$('slot').forEach(slot => {
      if (slot.assignedNodes().length == 0) slot.setAttribute('hidden', '');else slot.removeAttribute('hidden');
    }); // defer - then make sure the form-control remains as wide as the label

    setTimeout(() => {
      if (this.style.minWidth == '') this.style.minWidth = this.$('.label').offsetWidth;
      if (this.control) this.control.disabled = this.disabled;
    }, 0);
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled' && this.control && this.control.disabled !== undefined) this.control.disabled = this.disabled;
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val = true) {
    val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get key() {
    return this.getAttribute('key');
  }

  get value() {
    return this.control && this.control.value;
  }

  set value(val) {
    if (this.control) this.control.value = val;
    if (this.control && this.control.tagName == 'INPUT') this.control.dispatchEvent(new CustomEvent('change:value'));
  }

  get dbValue() {
    let control = this.control;
    if (!control) return undefined;
    let val = control.dbValue;
    return val !== undefined ? val : control.value;
  }

  get options() {
    return this.control && this.control.options;
  }

  set options(val) {
    if (this.control) this.control.options = val;
  }

  get isInvalid() {
    return this.control && this.control.isInvalid;
  }

  get label() {
    return this.$('.label').innerText;
  }

  set label(str) {
    this.$('.label').innerHTML = str;

    if (str) {
      this.setAttribute('nolabel', '');
    } else {
      this.removeAttribute('nolabel');
    }
  }

  _setClassNames() {
    let labelNodes = this.$('.label').childNodes;
    if (labelNodes.length == 0 || labelNodes[0].tagName == 'SLOT' && labelNodes[0].assignedNodes().length == 0) this.setAttribute('nolabel', '');
  }

  _onClick(e) {
    // console.log(e.target);
    if (e.target == this) this.focus(); // if( !e.target.isFocused && !e.target.slot)
    // 	this.focus()
  }

  focus() {
    this.control && this.control.focus();
  }

}

customElements.define('form-control', FormControlElement);

var _default = customElements.get('form-control');

exports.default = _default;
},{"./form-control.css.js":"Sclr","./util/nativeInputHelper":"wYzd"}],"VxKk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _litElement = require("lit-element");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = (0, _litElement.css)`

:host {
    display: inline-block;
    --color: var(--fc-theme);
    --radius: 4px;
    text-align: left;
    border-radius: var(--radius);
    /* background: #fff; */
}

main > header {
    background: var(--color);
    color: #fff;
    padding: 1em 1em 1.25em 1em;
    border-radius: var(--radius) var(--radius) 0 0;
    display: grid;
    grid-template-columns: 1fr auto
}

main > header * {
    margin: 0;
    padding: 0;
    font-weight: normal;
    cursor: pointer;
    display: inline-block;
    justify-self: flex-start;
}

main > header .today {
    text-transform: uppercase;
    font-size: .7em;
    font-weight: bold;
    justify-self: flex-end;
    align-self: flex-start;
    opacity: .6;
}

main > header .today:hover {
    opacity: 1;
}

main > header h4 {
    margin: 0 0 .75em 0;
}

main:not(.pick-year) > header h4 {
    color: rgba(255,255,255,.5);
}

main.pick-year > header h1 {
    color: rgba(255,255,255,.5);
}

section {
    padding: 1em;
    position: relative;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
}

nav > svg {
    height: 1.4em;
    padding: .25em;
    margin: -.25em;
	color: var(--theme-color, #000);
	fill: currentColor;
    opacity: .4;
    cursor: pointer;

}

nav > svg:hover {
    opacity: 1;
}

svg > * {
	pointer-events: none;
}

section header,
section .days {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    font-size: .8em;
    text-align: center;
}

main.pick-year section > *,
main.pick-month section > *{
	visibility: hidden
}

section header {
    color: var(--theme-color-accent, rgba(0,0,0,.3));
    margin: 1em 0;
    font-size: .7em;
}

day {
    padding: .7em;
    height: 1.4em;
    width: 1.4em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2em;
    cursor: pointer;
}

day[active] {
    background: var(--color);
    color: #fff;
}

day[today]:not([active]) {
    color: var(--color)
}


years,
months {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    overflow: auto;
    /* background: #fff; */
    border-radius: 0 0 var(--radius) var(--radius);
	visibility: visible !important;
}

main:not(.pick-year) years {
    display: none;
}

year {
    padding: .5em 0;
    cursor: pointer;
}

year[active],
month[active] {
    color: var(--color);
    font-size: 1.4em;
}

months {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
	align-content: space-around;
}

month {
    justify-self: stretch;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
}

main:not(.pick-month) months {
    display: none;
}

:host([calendar-only]) main > header {
    display: none;
}`;

const changeEvent = function (el, details = {}) {
  var event = new CustomEvent('change', {
    bubbles: true,
    composed: true,
    detail: Object.assign({}, details, {
      value: el.value
    })
  });
  el.dispatchEvent(event);
};

class DatePickerElement extends HTMLElement {
  constructor() {
    super();

    let htmlDaysHeader = _dayjs.default.weekdaysMin().map(str => `<div>${str}</div>`).join("\n");

    let startYear = parseInt(this.getAttribute('year-start') || '1900');
    let endYear = parseInt(this.getAttribute('year-end') || '2099');
    let years = '';

    while (startYear <= endYear) {
      years += `<year value="${startYear}">${startYear++}</year>`;
    }

    let months = _dayjs.default.monthsShort().map((m, i) => `<month value="${i}">${m}</month>`).join("\n");

    this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    temp.innerHTML = `
			<style>${styles.cssText}</style>
			<main>
				<header>
					<h4 class="selected-year">Year</h4>
					<a class="today">Today</a>
					<h1 class="selected-date">Date, Day</h1>
				</header>
				<section>
					<nav>
						<svg class="back" focusable="false" viewBox="0 0 24 24">
							<path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
							<path fill="none" d="M0 0h24v24H0V0z"></path>
						</svg>
						<div class="viewing-month">Month</div>
						<svg class="forward" focusable="false" viewBox="0 0 24 24">
							<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
							<path fill="none" d="M0 0h24v24H0V0z"></path>
						</svg>
					</nav>
					<header>${htmlDaysHeader}</header>
					<div class="days"></div>
                    <years>${years}</years>
                    <months>${months}</months>
				</section>
			</main>`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
    this._yearEl = this.$('.selected-year');
    this._dateEl = this.$('.selected-date');
    this._monthEl = this.$('.viewing-month');
    this._monthDays = this.$('main .days');
    this.shadowRoot.querySelector('main').addEventListener('click', this._onClick.bind(this));
  }

  connectedCallback() {
    this._setDate(this.value);
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    this._setDate(val);
  }

  get format() {
    return this.getAttribute('format') || 'MM/DD/YYYY';
  }

  set format(val) {
    this.setAttribute('format', val);
  }

  get date() {
    return this._dateSelected.clone();
  }

  get isValid() {
    return this._dateSelected.isValid();
  }

  formatted(format) {
    if (format === undefined) format = this.format;
    return this._dateSelected.format(format);
  }

  _renderMonth() {
    let start = this._date.day();

    let numDays = this._date.daysInMonth();

    let days = new Array(7 * 6).fill('');
    let i = 0;

    while (i < numDays) {
      days[i + start] = ++i;
    }

    this._monthDays.innerHTML = days.map(day => `<day value="${day}">${day}</day>`).join("\n");
    this._monthEl.innerHTML = this._date.format('MMMM YYYY');

    if (this._lookingAtSelectedMonth) {
      let elSelected = this.$(`day[value="${this._dateSelected.date()}"]`);
      if (elSelected) elSelected.setAttribute('active', '');
    }

    if (this._lookingAtToday) {
      let el = this.$(`day[value="${this._today.date()}"]`);
      if (el) el.setAttribute('today', '');
    }
  }

  nextMonth() {
    this._date = this._date.add(1, 'month');

    this._renderMonth();
  }

  prevMonth() {
    this._date = this._date.add(-1, 'month');

    this._renderMonth();
  }

  pickYear(show = true) {
    this.pickMonth(false);

    if (show) {
      this.$('main').classList.add('pick-year');
      let activeYear = this.$('year[active]');
      if (activeYear) activeYear.scrollIntoView();
    } else this.$('main').classList.remove('pick-year');
  }

  pickMonth(show = true) {
    if (show) {
      this.$('main').classList.add('pick-month');
    } else this.$('main').classList.remove('pick-month');
  }

  $(str) {
    return this.shadowRoot.querySelector(str);
  }

  $$(str) {
    return this.shadowRoot.querySelectorAll(str);
  }

  _onClick(e) {
    if (e.target.tagName == 'DAY') {
      let val = e.target.getAttribute('value');

      if (val) {
        this._setDate({
          year: this._date.year(),
          month: this._date.month(),
          date: parseInt(val)
        });
      }

      return;
    }

    if (e.target.tagName == 'YEAR') {
      let val = e.target.getAttribute('value');

      if (val) {
        this._setDate({
          year: parseInt(val)
        });

        this.pickYear(false);
      }

      return;
    }

    if (e.target.tagName == 'MONTH') {
      let val = e.target.getAttribute('value');

      if (val) {
        this._setDate({
          date: 1,
          month: parseInt(val)
        });

        this.pickMonth(false);
      }

      return;
    }

    if (e.target.classList.contains('selected-year')) return this.pickYear();
    if (e.target.classList.contains('selected-date')) return this.pickYear(false);

    if (e.target.classList.contains('today')) {
      this.pickMonth(false);
      this.pickYear(false);
      return this._setDate();
    }

    if (e.target.classList.contains('viewing-month')) return this.pickMonth();

    if (e.target.tagName == 'svg') {
      e.target.classList.contains('back') ? this.prevMonth() : this.nextMonth();
      return;
    }
  }

  get _lookingAtToday() {
    this._today = this._today || (0, _dayjs.default)();
    return this._date.year() == this._today.year() && this._date.month() == this._today.month();
  }

  get _lookingAtSelectedMonth() {
    this._today = this._today || (0, _dayjs.default)();
    return this._date.year() == this._dateSelected.year() && this._date.month() == this._dateSelected.month();
  }

  _setDate(val) {
    if (val && typeof val == 'object') {
      this._dateSelected = this._dateSelected.set(val);
      this._date = this._date.set(val);
      changeEvent(this, val);
    } else {
      this._date = val ? (0, _dayjs.default)(val, this.format) : (0, _dayjs.default)();
      this._dateSelected = this._date.clone();
    }

    this._date = this._date.set({
      date: 1
    });

    this._renderMonth();

    this._refresh();
  }

  _refresh() {
    if (this._dateSelected.isValid()) this.removeAttribute('invalid');else this.setAttribute('invalid', '');
    this.setAttribute('value', this.formatted());
    this.$$('[active]').forEach(el => el.removeAttribute('active'));

    if (!this._dateSelected.isValid()) {
      this._yearEl.innerHTML = '–';
      this._dateEl.innerHTML = 'Invalid';
      return;
    }

    if (this._lookingAtSelectedMonth) {
      let el = this.$(`day[value="${this._dateSelected.date()}"]`);
      if (el) el.setAttribute('active', '');
    }

    let yearEl = this.$(`year[value="${this._dateSelected.year()}"]`);

    if (yearEl) {
      yearEl.setAttribute('active', '');
    }

    let monthEl = this.$(`month[value="${this._dateSelected.month()}"]`);

    if (monthEl) {
      monthEl.setAttribute('active', '');
    }

    this._yearEl.innerHTML = this._dateSelected.year();
    this._dateEl.innerHTML = this.formatted('ddd, MMM D');
  }

}

customElements.define('date-picker', DatePickerElement);

var _default = customElements.get('date-picker');

exports.default = _default;
},{"dayjs":"dZYI","lit-element":"bhxD"}],"E0RO":[function(require,module,exports) {
/*
    HTML Cleaner

    Takes a string of html and removes non-standard
    html, removes inline styles and classes, and removes
    any new lines. The end result is a much cleaner
    underlying html structure.

    ```
    import {htmlCleaner} from 'util/html-cleander'
    let html = htmlCleaner.clean(strOfHtml)
    ```

    You can override the parser if you need (for example, in node.js)
    
    ```
    htmlCleaner.parser = function(str){ return [document, body] }
    ```
*/
const DEFAULT_ALLOW_TAGS = ['p', 'br', 'b', 'strong', 'em', 'i', 'ul', 'ol', 'li']; // TODO: move to param

const DEFAULT_ALLOW_STYLES = {
  fontStyle: ['italic'],
  fontWeight: ['bold'],
  textAlign: ['left', 'justify', 'right', 'center']
};

function parser(str) {
  if (typeof DOMParser === 'undefined') throw Error('DOMParser does not exist');
  var dom = new DOMParser().parseFromString(str, "text/html");
  return [typeof document !== 'undefined' ? document : dom, dom.body || dom];
}

function stripHTML(str) {
  var [document, body] = this.parser(str);
  let childNodes = Array.from(body.childNodes);
  return childNodes.map(node => node.textContent).join(' ');
}

function clean(str, opts = {}) {
  opts = Object.assign({
    keepParent: true,
    allowTags: DEFAULT_ALLOW_TAGS,
    allowStyles: DEFAULT_ALLOW_STYLES
  }, opts);
  var [document, body] = this.parser(str);
  var el = document.createElement('div');
  var p = null;
  let childNodes = Array.from(body.childNodes); // if there is only one child node and its a paragraph, lets loop 
  // through its child nodes (we'll recreate the <p> tag down below)
  // we do this because I've seen copy that has fake paragraphs 
  // using br tags inside a paragraph: <p>para 1<br><br>para 2</p>

  if (childNodes.length == 1 && childNodes[0].tagName == 'P') childNodes = Array.from(childNodes[0].childNodes);
  childNodes.forEach(node => {
    // top level <br> tags terminate the current <p>
    if (node.nodeName == 'BR') return p = null; // if we have a top level <p>, lets keep it

    if (childNodes.length == 1 && node.nodeName == 'P') {
      p = node; // clean all its children

      cleanNode(null, p, opts); // if NOT empty after cleaning, keep it

      if (p.innerText !== '') el.appendChild(p);
      return; // all other tags
    } else {
      // create a top level <p> if we dont have one
      if (!p) {
        p = document.createElement('p');
        el.appendChild(p);
      } // cleaning will append to `p`


      cleanNode(p, node, opts);
    }
  });
  if (opts.keepParent === 'never') el = el.childNodes[0] || el;
  if (opts.keepParent === false && el.childNodes[0].childNodes.length > 1) el = el.childNodes[0] || el;
  let html = el.innerHTML ? el.innerHTML : Array.from(el.childNodes).map(node => node.toString()).join(''); // remove line breaks as they dont provide anything and can cause problems in csv exports

  html = html.replace(/[\n\r]/g, ' '); // replace non-breaking spaces with normal spaces

  html = html.replace(/&nbsp;/g, ' ');
  return html;
}

function cleanNode(parent, node, opts = {}) {
  opts.allowTags = opts.allowTags != undefined ? opts.allowTags : DEFAULT_ALLOW_TAGS;
  opts.allowStyles = opts.allowStyles != undefined ? opts.allowStyles : DEFAULT_ALLOW_STYLES; // remove all attributes known to be a problem

  if (node.removeAttribute) {
    let styles = Object.assign({}, node.style);
    node.removeAttribute('id');
    node.removeAttribute('class');
    node.removeAttribute('style');

    for (let styleName in opts.allowStyles) {
      let allow = opts.allowStyles[styleName];

      if (allow === true && styles[styleName]) {
        node.style[styleName] = styles[styleName];
      } else {
        allow = Array.isArray(allow) ? allow : [allow];

        if (allow.includes(styles[styleName])) {
          node.style[styleName] = styles[styleName];
        }
      }
    }
  } // if the node is a comment or a known weird tag (word docs have things like <o:p>) remove it


  if (node.nodeName == '#comment' || node.nodeName.match(/:/)) return node.remove(); // if text node, do some cleaning
  else if (node.nodeName == "#text") {
      // if the text node is just spaces, remove them
      // node.textContent = node.textContent.replace(/^\s+$/g, '')
      // swap multiple spaces in a row for just one space
      node.textContent = node.textContent.replace(/\s{2,}/g, ' '); // optionally clean more data for platforms that need it
      // TEST
      // simplifyTextNode(node)
    } // clean all child nodes of this node

  let childNodes = node.childNodes ? Array.from(node.childNodes) : [];
  childNodes.forEach(n => cleanNode(node, n, opts)); // remove any empty nodes (but keep <br> which are always empty)

  if (node.nodeName != 'BR' && node.innerText == '') return node.remove(); // if( parent && parent.tagName == 'P' ){

  if (parent) {
    // keep spans that have styles since they will be bold/italics
    if (node.nodeName == 'SPAN' && node.hasAttribute('style')) {
      parent.appendChild(node); // keep tags we want
    } else if (['#text'].concat(opts.allowTags).includes(node.nodeName.toLowerCase())) {
      // make sure inline elements dont start with a <br> tag ie <br><i><br> as this will parse to <p><i><br> and break Quill
      if (['i', 'b', 'strong', 'em'].includes(node.nodeName.toLowerCase())) {
        if (node.childNodes[0] && node.childNodes[0].nodeName == 'BR') node.childNodes[0].remove();
      } // if( parent.tagName == 'P' )


      parent.appendChild(node); // remove tags we dont want, but keep their contents
      // example: <font>we want to keep this text and any <b>good</b> tags</font>
    } else {
      if (node.remove) node.remove();else node.parentNode.removeChild(node); // node.js xmldom

      childNodes = Array.from(node.childNodes);
      childNodes.forEach(child => {
        parent.appendChild(child);
      });
    }
  }

  return node;
}

function simplifyTextNode(node) {
  // replace fancy quotes with simple ones
  node.textContent = node.textContent.replace(/[“”]/g, '"');
  node.textContent = node.textContent.replace(/[‘’]/g, "'"); // replace mdash and ndash with regular dashes

  node.textContent = node.textContent.replace(/[–—]/g, "-"); // replace ellipsis

  node.textContent = node.textContent.replace(/…/g, "...");
}

module.exports = {
  clean: clean,
  stripHTML: stripHTML,
  parser: parser
};
},{}],"hNKD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (str = '') => {
  return str.replace(/\b'\b/g, "\u2019") // apostrophes
  .replace(/'(?=[^>]*<)\b/g, "\u2018") // Opening singles
  .replace(/\b([\.\?\!,]*)(?=[^>]*<)'/g, "$1\u2019") // Closing singles
  .replace(/"(?=[^>]*<)\b/g, "\u201c") // Opening doubles
  .replace(/\b([\.\?\!,]*)(?=[^>]*<)"/g, "$1\u201d") // Closing doubles
  .replace(/\.\.\./g, "\u2026") // ellipsis
  .replace(/--/g, "\u2014"); // em-dashes
};

exports.default = _default;
},{}],"dMpr":[function(require,module,exports) {
// https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript
module.exports = {
  round(num, decimals = 2) {
    if (typeof num == 'string') num = parseFloat(num);
    let divisor = Math.pow(10, decimals);
    return Math.round(num * divisor) / divisor;
  },

  /**
   * The "median" is the "middle" value in the list of numbers.
   *
   * @param {Array} numbers An array of numbers.
   * @return {Number} The calculated median value from the specified numbers.
   */
  median(numbers) {
    // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
    var median = 0,
        numsLen = numbers.length;
    numbers.sort();

    if (numsLen % 2 === 0 // is even
    ) {
        // average of two middle numbers
        median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
      } else {
      // is odd
      // middle number only
      median = numbers[(numsLen - 1) / 2];
    }

    return median;
  },

  /**
   * The "mode" is the number that is repeated most often.
   *
   * For example, the "mode" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 3, 4].
   *
   * @param {Array} numbers An array of numbers.
   * @return {Array} The mode of the specified numbers.
   */
  mode(numbers) {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    var modes = [],
        count = [],
        i,
        number,
        maxIndex = 0;

    for (i = 0; i < numbers.length; i += 1) {
      number = numbers[i];
      count[number] = (count[number] || 0) + 1;

      if (count[number] > maxIndex) {
        maxIndex = count[number];
      }
    }

    for (i in count) if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }

    return modes;
  },

  roundTo(num, ratio = 2) {
    num = parseFloat(num);
    if (isNaN(num)) return '';
    return Math.round(num * ratio) / ratio;
  },

  prettyDecimal(val = '', ratio = null) {
    if (ratio != null) val = this.roundTo(val, ratio);
    val = String(val);
    val = val.replace(/\.00?$/, '');
    val = val.replace(/\.25$/, '¼');
    val = val.replace(/\.50?$/, '½');
    val = val.replace(/\.75$/, '¾');
    val = val.replace(/^0*/, ''); // remove leading 0s

    return val;
  }

};
},{}],"E8jA":[function(require,module,exports) {
// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
const mode = require('./math').mode;

module.exports = (strData, {
  strDelimiter = ',',
  hasHeader = true
} = {}) => {
  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp( // Delimiters.
  "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + // Quoted fields.
  "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + // Standard fields.
  "([^\"\\" + strDelimiter + "\\r\\n]*))", "gi"); // Create an array to hold our data. Give the array
  // a default empty first row.

  var arrData = [[]]; // Create an array to hold our individual pattern
  // matching groups.

  var arrMatches = null;
  strData = strData.trim(); // Keep looping over the regular expression matches
  // until we can no longer find a match.

  while (arrMatches = objPattern.exec(strData)) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1]; // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.

    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    var strMatchedValue; // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).

    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    } // Now that we have our value string, let's add
    // it to the data array.


    arrData[arrData.length - 1].push(strMatchedValue);
  }

  let header = [];
  let footer = [];
  let foundRow = false;
  let rowLengths = arrData.map(r => r.length);
  let rowLength = mode(rowLengths)[0];
  arrData = arrData.filter(row => {
    if (row.length < rowLength) {
      if (row[0] && foundRow) footer.push(row);else if (row[0]) header.push(row);
      return false;
    }

    foundRow = true;
    return true;
  });

  if (hasHeader) {
    let header = arrData.shift();
    arrData = arrData.map(line => {
      let obj = {};
      header.forEach((key, i) => obj[key] = line[i]);
      return obj;
    });
  }

  arrData.header = header;
  arrData.footer = footer; // Return the parsed data.

  return arrData;
};
},{"./math":"dMpr"}],"Zwl6":[function(require,module,exports) {
/*
	Plural - create singular or plural sentence based on number given (all numbers but 1 return plural sentence)

	New Plural (tagged template)
	plural`There {are|is} ${num} item[s]`
	
	Placeholders:
	{plural|singular} => evaluates based on the following number
	[plural|singular] => evaulates based on the preceding number
	[plural]

	Old Plural:
	var str = "Do you want to delete this? There {are|is} [num] book{s} attached."

	var num = 2 // or 0, 3, 4, ...
		"Do you want to delete this? There are 2 books attached."

	var num = 1
		"Do you want to delete this? There is 1 book attached."
*/
module.exports = function (strings, ...keys) {
  if (typeof strings == 'string') return oldPlural(strings, keys[0]);
  let str = '';
  strings.forEach((s, i) => {
    let valAfter = keys[i] || '';

    if (valAfter && typeof valAfter == 'number') {
      let indx = valAfter == 1 ? 1 : 0;
      s = s.replace(/\{(.[^}]*)}/g, function (wholematch, firstmatch) {
        var values = firstmatch.split('|');
        return values[indx] || '';
      });
    }

    let valBefore = keys[i - 1] || '';

    if (valBefore && typeof valBefore == 'number') {
      let indx = valBefore == 1 ? 1 : 0;
      s = s.replace(/\[(.[^\]]*)\]/g, function (wholematch, firstmatch) {
        var values = firstmatch.split('|');
        return values[indx] || '';
      });
    }

    str += valBefore + s;
  });
  return str;
}; // DEPRECATED


function oldPlural(str, num) {
  if (num instanceof Array) num = num.length;
  if (num instanceof Object) num = Object.keys(num).length;
  var indx = num == 1 ? 1 : 0;

  if (typeof num != 'number') {
    if (globalThis._ === undefined) return console.warn('underscore not installed');
    if (!_.numberFormat) return console.warn('underscore.string not installed');
    num = parseFloat(num);
    num = _.numberFormat(parseFloat(num), num % 1 > 0 ? 1 : 0);
  }

  str = str.replace(/\[num\]/, num);
  str = str.replace(/{(.[^}]*)}/g, function (wholematch, firstmatch) {
    var values = firstmatch.split('|');
    return values[indx] || '';
  });
  return str;
}
},{}],"MqKw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = file => {
  return new Promise(resolve => {
    var reader = new FileReader();

    reader.onload = e => {
      var text = reader.result;
      resolve(text);
    };

    reader.readAsText(file);
  });
};

exports.default = _default;
},{}],"BblM":[function(require,module,exports) {
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],"p0cq":[function(require,module,exports) {
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],"w4yJ":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":"wppe","./_arrayMap":"BblM","./isArray":"p0cq","./isSymbol":"bgO7"}],"A8RV":[function(require,module,exports) {
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":"w4yJ"}],"Chbn":[function(require,module,exports) {
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],"Kr2C":[function(require,module,exports) {
var baseSlice = require('./_baseSlice');

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;

},{"./_baseSlice":"Chbn"}],"oxMD":[function(require,module,exports) {
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;

},{}],"ACee":[function(require,module,exports) {
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;

},{}],"NNKx":[function(require,module,exports) {
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;

},{}],"smkV":[function(require,module,exports) {
var asciiToArray = require('./_asciiToArray'),
    hasUnicode = require('./_hasUnicode'),
    unicodeToArray = require('./_unicodeToArray');

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;

},{"./_asciiToArray":"ACee","./_hasUnicode":"oxMD","./_unicodeToArray":"NNKx"}],"prUu":[function(require,module,exports) {
var castSlice = require('./_castSlice'),
    hasUnicode = require('./_hasUnicode'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

module.exports = createCaseFirst;

},{"./_castSlice":"Kr2C","./_hasUnicode":"oxMD","./_stringToArray":"smkV","./toString":"A8RV"}],"SwE8":[function(require,module,exports) {
var createCaseFirst = require('./_createCaseFirst');

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = upperFirst;

},{"./_createCaseFirst":"prUu"}],"NEda":[function(require,module,exports) {
var toString = require('./toString'),
    upperFirst = require('./upperFirst');

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;

},{"./toString":"A8RV","./upperFirst":"SwE8"}],"NUHt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _capitalize = _interopRequireDefault(require("lodash/capitalize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = str => {
  return str.replace(/[\-_]/g, ' ').split(' ').map(word => (0, _capitalize.default)(word)).join(' ');
};

exports.default = _default;
},{"lodash/capitalize":"NEda"}],"TuEj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (rawData, opts) => {
  opts = Object.assign({
    delimiter: ',',
    newline: "\n",
    title: '',
    description: '',
    header: true
  }, opts);
  if (!rawData || rawData.length == 0) return console.log('No data to export'); // see if the array of data contains Backbone Models or custom classes that implement `toCSV` or `toJSON`

  rawData = rawData.map(d => {
    if (d && d.toCSV) return d.toCSV();
    if (d && d.toJSON) return d.toJSON();
    return d;
  });
  var header = Object.keys(rawData[0]);
  var rows = rawData.map(d => Object.values(d));
  var data = opts.header === false ? rows : [header].concat(rows);
  if (opts.title || opts.description) data.unshift([]);
  if (opts.description) data.unshift([opts.description]);
  if (opts.title) data.unshift([opts.title]); // clean data

  data = data.map(row => {
    return row.map(val => {
      // encapsulate in "" if the value contains a delimiter or new line
      // TODO: this needs to be dynamic to match the opts
      if (typeof val === 'string' && val.match(/,|\n|"/)) {
        val = '"' + val.replace(/"/gi, '""') + '"';
      }

      if (Array.isArray(val)) {
        val = '[array]';
      }

      return val;
    });
  });
  let csvContent = "\ufeff"; // utf-8 bom

  data.forEach(function (infoArray, index) {
    let dataString = infoArray.join(opts.delimiter);
    csvContent += index < data.length ? dataString + opts.newline : dataString;
  });
  return csvContent;
};

exports.default = _default;
},{}],"DKKB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (ts = 0) => {
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve();
    }, ts);
  });
};

exports.default = _default;
},{}],"xBze":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "htmlCleaner", {
  enumerable: true,
  get: function () {
    return _htmlCleaner.default;
  }
});
Object.defineProperty(exports, "normalizeText", {
  enumerable: true,
  get: function () {
    return _normalizeText.default;
  }
});
Object.defineProperty(exports, "csvToArray", {
  enumerable: true,
  get: function () {
    return _csvToArray.default;
  }
});
Object.defineProperty(exports, "plural", {
  enumerable: true,
  get: function () {
    return _plural.default;
  }
});
Object.defineProperty(exports, "readFile", {
  enumerable: true,
  get: function () {
    return _readFile.default;
  }
});
Object.defineProperty(exports, "titleize", {
  enumerable: true,
  get: function () {
    return _titleize.default;
  }
});
Object.defineProperty(exports, "toCSV", {
  enumerable: true,
  get: function () {
    return _toCSV.default;
  }
});
Object.defineProperty(exports, "wait", {
  enumerable: true,
  get: function () {
    return _wait.default;
  }
});

var _htmlCleaner = _interopRequireDefault(require("./htmlCleaner"));

var _normalizeText = _interopRequireDefault(require("./normalizeText"));

var _csvToArray = _interopRequireDefault(require("./csvToArray"));

var _plural = _interopRequireDefault(require("./plural"));

var _readFile = _interopRequireDefault(require("./readFile"));

var _titleize = _interopRequireDefault(require("./titleize"));

var _toCSV = _interopRequireDefault(require("./toCSV"));

var _wait = _interopRequireDefault(require("./wait"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./htmlCleaner":"E0RO","./normalizeText":"hNKD","./csvToArray":"E8jA","./plural":"Zwl6","./readFile":"MqKw","./titleize":"NUHt","./toCSV":"TuEj","./wait":"DKKB"}],"ezNL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _dialog = _interopRequireDefault(require("../../dialog"));

require("./date-picker");

var _setValueAttrs = _interopRequireDefault(require("../util/setValueAttrs"));

var _validatePattern = _interopRequireDefault(require("../util/validatePattern"));

var _stopMaxLength = _interopRequireDefault(require("../util/stopMaxLength"));

var _util = require("../../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = (0, _litElement.css)`
:host {
	display: inline-block;
	contain: layout;
	min-width: .25em;
}

:host(:not([disabled])){
	cursor: text;
}

:host(:not([disabled])) main ::selection {
	background: var(--selectionBgd, #FFF8E1);
}

main {
	display: flex;
}

:host([input]) .editor {
	display: none;
}

:host(:not([input])) .input {
	display: none;
}

.input {
	outline: none;
	width: 100%;
	display: inline-block;
	min-height: 1em;
	font-size: inherit;
	font-family: inherit;
	line-height: 1.2em;
	margin: -.1em 0;
	border: none;
	background: transparent;
	/* background: yellow; */
}

.editor {
	position: relative;
	outline: none;
	width: 100%;
	display: inline-block;
	white-space: pre-wrap;
	min-height: 1em;
	line-height: 1.2em;
	margin: -.1em 0;
}

.editor p {
	margin: var(--b-text-field-paragraph-margin, 1em) 0;
}

.editor p:first-child{ margin-top: 0;}
.editor p:last-child{ margin-bottom: 0;}

/* :host([single-line]) .editor {
	white-space: nowrap;
	overflow-x: auto;
	overflow-x: -moz-scrollbars-none; 
}

:host([single-line]) .editor::-webkit-scrollbar {
	width: 0 !important;
} */

:host([empty]) .editor:before {
	content: attr(data-placeholder);
	color: var(--placeholderColor);
	/* position: absolute; */
}

:host([multiline]) .editor:before {
	position: absolute;
	left: 0;
    right: 0;
}

/* keep placeholder on one line, clipping to ellipsis when overflowed */
:host(:not([multiline])) .editor:before {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.calendar {
	display: none;
	opacity: .3;
	height: 1.2em;
    margin: -0.3em -.5em -.5em 0;
    padding: .25em;
	cursor: pointer;
	position: relative;
	z-index: 1000;
}

:host([type="date"]) .calendar {
	display: inline-block;
}

:host([type="date"][disabled]) .calendar {
	display: none;
}

/* .calendar:hover,
.calendar.popover-open {
	opacity: .7;
} */

.input::-webkit-calendar-picker-indicator,
.input::-webkit-inner-spin-button { 
    display: none;
}

input:-webkit-autofill {
	font-size: inherit;
	font-family: inherit;
	background: red;
}

/* remove autofill blue/yellow background */
input:-webkit-autofill {
    -webkit-box-shadow:0 0 0 50px var(--bgd) inset;
    /* -webkit-text-fill-color: #333; */
}

input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 50px var(--bgd) inset;
    /* -webkit-text-fill-color: #333; */
} 
`;

class TextFieldElement extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    let placeholder = this.getAttribute('placeholder') || '';
    temp.innerHTML = `<style>${styles.cssText}</style>
			<main>
				
				<div class="editor" contenteditable="true" data-placeholder="${placeholder}"></div>
				
				<input class="input" placeholder="${placeholder}" 
						type="${this.input || 'text'}" 
						name="${this.name || this.input}"
						autocomplete="${this.autocomplete}">
						
				<b-icon name="calendar-3" class="calendar"></b-icon>
			</main>
			<slot id="value"></slot>`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
    if (this.isMultiline) this.removeAttribute('input');
    let value = this.$('#value');
    this._val = value.assignedNodes().map(el => el.textContent.trim()).join(' ');
    this._val = this._val.replace(/^\n|\n$/g, '').trim();
    this._editor = this.$('.editor');
    this._input = this.$('.input');

    if (this.type == 'date') {
      this._datePicker = document.createElement('date-picker');
      this._datePicker.value = this.value;
      this._datePicker.format = this.format;

      if (!this._datePicker.isValid) {
        let date = (0, _dayjs.default)(this._val);
        this._val = this._datePicker.value = date.format(this._datePicker.format);
      }
    }

    if (this._val) {
      this._editor.innerHTML = _util.htmlCleaner.clean(this._val, this.htmlClean || {});
      this._input.value = this._val;
    }

    if (!this._val && this.isMultiline && !this.isPlain) {
      this._val = '<p><br></p>';
      this._editor.innerHTML = this._val;
    }

    this.innerText = '';

    this._editor.addEventListener('paste', this._onPaste.bind(this), true);

    this._editor.addEventListener('keydown', this._onKeydown.bind(this), true);

    this._input.addEventListener('keydown', this._onKeydown.bind(this), true);

    this._editor.addEventListener('keyup', this._onKeypress.bind(this), true);

    this._editor.addEventListener('blur', this._onBlur.bind(this));

    this._input.addEventListener('blur', this._onBlur.bind(this));

    this.shadowRoot.addEventListener('click', this._onClick.bind(this));
    this.addEventListener('click', this._onClick.bind(this));
    this.shadowRoot.querySelector('.calendar').addEventListener('click', this._onClick.bind(this));
  }

  $(str) {
    return this.shadowRoot.querySelector(str);
  }

  $$(str) {
    return this.shadowRoot.querySelectorAll(str);
  }

  connectedCallback() {
    this._setClassNames();
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ['disabled', 'placeholder'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') this._editor.contentEditable = !this.disabled;
    if (name === 'placeholder') this._editor.dataset.placeholder = newValue;
  }

  get input() {
    return this.getAttribute('input');
  }

  get type() {
    return this.getAttribute('type');
  }

  get name() {
    return this.getAttribute('name');
  }

  get autocomplete() {
    return this.getAttribute('autocomplete');
  }

  get format() {
    return this.getAttribute('format') || 'MM/DD/YYYY';
  }

  get isMultiline() {
    return this.hasAttribute('multiline');
  }

  get isHTML() {
    return this.hasAttribute('html');
  } // get isPlain(){ return this.hasAttribute('plain') }


  get isPlain() {
    return !this.isHTML;
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val = true) {
    val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get value() {
    return this._val;
  }

  get textValue() {
    if (!this.value) return this.value;
    let doc = new DOMParser().parseFromString(this.value, 'text/html');
    return Array.from(doc.body.childNodes).map(node => node.nodeValue || node.innerText).join("\n");
  }

  insertText(text) {
    if (!this.isFocused) this.focus();
    document.execCommand('insertText', false, text);

    this._updateValue();
  }

  set value(val) {
    this._oldVal = this._val;

    if (this.hasAttribute('default') && !val) {
      val = this.getAttribute('default');
      this._val = val;
      let selection = this.select();
      document.execCommand('insertText', false, val);
      selection.removeAllRanges();
    } else {
      if (this.type == 'date') {
        if (val === 'Invalid date') val = null;
        this._datePicker.value = val;

        if (!this._datePicker.isValid) {
          let date = (0, _dayjs.default)(val);
          val = this._datePicker.value = date.format(this._datePicker.format);
        }

        if (!this._datePicker.isValid) {
          val = this._val;
          this._datePicker.value = val;
        }
      }

      this._val = val;

      if (this._editor.innerHTML != val) {
        if (this.isMultiline && !this.isPlain) val = val || '<p><br></p>';else val = val || '';
        this._editor.innerHTML = val;
      }

      if (this._input.value != val) this._input.value = val;
    }

    this._setClassNames();
  }

  get dbValue() {
    if (this._datePicker) return this.value ? this._datePicker.formatted('YYYY-MM-DD') : this.value;
    return this.value;
  }

  get currentValue() {
    // retain current empty value
    let emptyVal = this.value === null ? null : '';
    if (this.input) return this._input.value || emptyVal;else if (this._editor.innerHTML === '<p><br></p>' || this._editor.innerHTML === '<br>') return emptyVal;else if (this.isHTML) return this._editor.innerHTML || emptyVal;else return this._editor.innerText || this._editor.innerHTML || emptyVal;
  }

  set isInvalid(invalid) {
    this._isInvalid = invalid;
    if (invalid) this.setAttribute('invalid', true);else this.removeAttribute('invalid');
  }

  get isInvalid() {
    return this._isInvalid;
  }

  get isFocused() {
    return this.shadowRoot.activeElement == this._editor || this.shadowRoot.activeElement == this._input;
  }

  _setClassNames() {
    (0, _setValueAttrs.default)(this, this._val);
    if (this._val && this._val !== '<p><br></p>') this.removeAttribute('empty');else this.setAttribute('empty', '');
  }

  _onClick(e) {
    // was calendar icon clicked?
    if (e.target.classList.contains('calendar')) {
      e.stopPropagation();
      return this.pickDate();
    }

    if (e.target != this) return;
    if (!e.target.isFocused) this.focus();
  }

  async pickDate() {
    this._datePicker.value = this.value;
    let picker = new _dialog.default({
      view: this._datePicker,
      btns: ['cancel', 'ok']
    });

    if (await picker.popover(this.$('.calendar'), {
      align: 'left',
      overflowBoundry: 'window',
      maxHeight: false,
      adjustForMobile: true
    })) {
      this._changeValue(picker.$('date-picker').value);
    }
  }

  _onPaste(e) {
    e.preventDefault();
    let val = '';

    if (this.isHTML && !e.clipboardData.types.includes('text/rtf') && e.clipboardData.types.includes('text/html')) {
      val = e.clipboardData.getData('text/html');
      val = _util.htmlCleaner.clean(val, this.htmlClean || {});
    } else {
      val = e.clipboardData.getData('text'); // remove excessive line breaks

      val = val.replace(/\n{2,}/g, "\n");
      if (this.isHTML) val = '<p>' + val.split(`\n`).join(`</p>\n<p>`) + '</p>';else val = val.split(`\n`).join(`<br>\n`);
    }

    let eventDetail = {
      str: val,
      extras: []
    }; // only keep first line, but send extra lines in the event detail

    if (!this.isMultiline) {
      let lines = [];
      let div = document.createElement('div');
      let cleanOpts = Object.assign({
        keepParent: false,
        allowTags: ['p', 'b', 'i', 'strong', 'em']
      }, this.htmlClean || {});
      div.innerHTML = _util.htmlCleaner.clean(val, cleanOpts);
      let isInlineText = div.firstChild instanceof Text || !['P', 'DIV'].includes(div.firstChild.tagName);
      if (cleanOpts.keepParent == 'never' || isInlineText) lines.push(this.isHTML ? div.innerHTML : div.textContent);else for (let child of div.childNodes) {
        lines.push(this.isHTML ? child.outerHTML || child.textContent : child.textContent);
      }
      eventDetail.str = val = lines.shift();
      eventDetail.extras = lines;
    } // NOTE: using insertHTML (rather than insertText) keeps the browser from
    // converting line breaks to <div> and <br> tags


    document.execCommand('insertHTML', false, val);

    this._updateValue();

    this.dispatchEvent(new CustomEvent("pasted", {
      detail: eventDetail
    }));
  }

  get editorEl() {
    return this.input ? this._input : this._editor;
  }

  select(range = 'all') {
    let el = this.editorEl,
        s = window.getSelection(),
        r = document.createRange();

    if (range == 'start') {
      r.setStart(el, 0);
      r.setEnd(el, 0);
    } else if (range == 'end') {
      r.setStart(el, el.childNodes.length);
      r.setEnd(el, el.childNodes.length);
    } else {
      r.selectNodeContents(el);
    }

    s.removeAllRanges();
    s.addRange(r);
    return s;
  }

  _onKeypress(e) {
    if (!this.input && this._editor.innerText.trim() == '') this.setAttribute('empty', '');else this.removeAttribute('empty');
  }

  _onKeydown(e) {
    let stop = false;
    this.isInvalid = false;
    if (e.key.length == 1) this.removeAttribute('empty'); // make sure to remove trailing <br> when deleting content

    if (e.key == 'Backspace' && this.isHTML) {
      setTimeout(() => {
        if (this._editor.innerHTML == '<br>') this._editor.innerHTML = '';
      });
    }

    if (e.key == 'Backspace' && this.isMultiline && this._editor.innerText.trim() == '') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    } // Multiline Plain – only use newlines (keep divs/br from appearing)


    if (e.key == 'Enter' && this.isMultiline && this.isPlain) {
      e.preventDefault();
      e.stopPropagation();
      let charLen = this._editor.innerText.length;
      let lastChar = this._editor.innerText[charLen - 1];
      let sel = this.shadowRoot.getSelection();
      let range = sel.getRangeAt(0);
      if (range.endOffset < charLen || lastChar == '\n') document.execCommand("insertHTML", false, '\n');else document.execCommand("insertHTML", false, '\n\n');
      return false;
    }

    if (e.key == 'Enter' && (!this.isMultiline || e.metaKey || e.ctrlKey)) {
      stop = true;
      e.preventDefault();
      e.stopPropagation(); // NOTE: will this be weird to not blur on enter?

      this._updateValue(); // this.blur() // will trigger a change if there is one


      let detail = {
        shiftKey: e.shiftKey,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey
      }; // Force change event for empty search/ re-search

      if (!this.value) this.dispatchEvent(new CustomEvent("change", {
        detail
      }));
      this.dispatchEvent(new Event("enterkey")); // DEPRECATED

      this.dispatchEvent(new CustomEvent("submit", {
        detail
      })); // I think this makes more sense
    }

    if (e.key == 'Escape') {
      this.value = this.value; // reset the value

      this.blur();
      this.dispatchEvent(new Event("esckey"));
    }

    this._didPressKey = true;
    let val = this.input ? this._input.value : this._editor.innerText;
    stop = (0, _stopMaxLength.default)(e, this, val);
    let delay = this.getAttribute('change-delay');
    clearTimeout(this._changeDelay);

    if (delay !== null) {
      delay = delay || 500;
      this._changeDelay = setTimeout(this._updateValue.bind(this), delay);
    }

    if (stop) {
      e.preventDefault();
    } else if (!this.hasAttribute('bubble-keypress')) {
      e.stopPropagation();
    }
  }

  focus() {
    if (this.input) this._input.focus();else this.select('end');
  }

  _onBlur() {
    if (this._didPressKey) this._updateValue();
    delete this._didPressKey;
  }

  _updateValue() {
    let val = this.currentValue;

    if (!(0, _validatePattern.default)(this, val)) {
      if (this.hasAttribute('reset-invalid')) {
        this.value = this.value;
      } else {
        this.value = val;
        this.isInvalid = true;

        this._setClassNames();
      } // }else{
      // 	
      // 	this.focus()
      // }


      return;
    }

    if (val == this.value) return;
    let max = this.getAttribute('max');
    if (max) val = val.slice(0, max);

    this._changeValue(val);
  }

  _changeValue(val) {
    this.value = val;
    var event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        oldVal: this._oldVal
      }
    });
    this.dispatchEvent(event);
  }

}

customElements.define('text-field', TextFieldElement);

var _default = customElements.get('text-field');

exports.default = _default;
},{"lit-element":"bhxD","dayjs":"dZYI","../../dialog":"pos3","./date-picker":"VxKk","../util/setValueAttrs":"pZT1","../util/validatePattern":"hx3P","../util/stopMaxLength":"h6i7","../../../util":"xBze"}],"GLLF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

const styles = (0, _litElement.css)`

:host {
	--size: 1.6em;
	--color: var(--fc-theme);
	--colorDisabled: var(--fc-disabled-color, rgba(0, 0, 0, 0.26));
	--labelSize: 1em;
	--labelColor: currentColor;
	display: inline-block;
	vertical-align: middle;
}

:host(.control) {
	flex-grow: 0 !important;
}

:host([active]) svg.inactive,
:host(:not([active])) svg.active {
	display: none
}

main {
	display: flex;
	align-items: center;
	cursor: pointer;
}

:host([placement="top"]) main { flex-direction: column-reverse; }
:host([placement="bottom"]) main { flex-direction: column; }
:host([placement="left"]) main { flex-direction: row-reverse; }
:host([placement="right"]) main { flex-direction: row; }

svg {
	fill: currentColor;
	width: var(--size);
	height: var(--size);
	display: inline-block;
	transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	user-select: none;
	flex-shrink: 0;
	padding: .25em;
}

svg.active {
	fill: var(--color);
}

:host([disabled]) svg {
	fill: var(--colorDisabled);
}

:host([disabled]) label {
	color: var(--colorDisabled);
}

label {
	font-size: var(--labelSize);
	color: var(--labelColor);
}

main label {
	cursor: pointer;
}`;

class RadioBtnElement extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: 'open'
    });
    let temp = document.createElement('template');
    let label = this.getAttribute('label') || '<slot name="label"></slot>';
    temp.innerHTML = `<style>${styles.cssText}</style>
			<main>
				<svg class="inactive" focusable="false" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
				<svg class="active" focusable="false" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
				<label>${label}</label>
			</main>
			`;
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
    this.addEventListener('click', this._onClick.bind(this));
  }

  _onClick() {
    if (this.disabled) return;
    this.active = !this.active;
    var event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value
      }
    });
    this.dispatchEvent(event);
  }

  set active(val) {
    val ? this.setAttribute('active', '') : this.removeAttribute('active');
  }

  get active() {
    return this.hasAttribute('active');
  }

  get value() {
    return this.hasAttribute('value') ? this.getAttribute('value') || null : this.getAttribute('label');
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val = true) {
    val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

}

customElements.define('radio-btn', RadioBtnElement);

var _default = customElements.get('radio-btn');

exports.default = _default;
},{"lit-element":"bhxD"}],"mCnW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class RadioGroupElement extends HTMLElement {
  get key() {
    return this.getAttribute('key');
  }

  constructor() {
    super(); // let shadow = this.attachShadow({mode: 'open'})
    // let temp = document.createElement('template')
    // temp.innerHTML = `<style>${styles}</style>`
    // this.shadowRoot.appendChild(temp.content.cloneNode(true));

    this.style.outline = 'none';
    this.addEventListener('change', this._onChange.bind(this), true);
    this.addEventListener('keydown', e => {
      if (['ArrowLeft', 'ArrowUp'].includes(e.code)) {
        this.nav(-1);
      } else if (['ArrowRight', 'ArrowDown'].includes(e.code)) {
        this.nav(1);
      }
    });
    this.onChildrenChange = this.onChildrenChange.bind(this);
    const observer = new MutationObserver(this.onChildrenChange);
    observer.observe(this, {
      attributes: false,
      childList: true,
      subtree: false
    });
  }

  onChildrenChange(e) {
    this.radios = Array.from(this.querySelectorAll('radio-btn'));
  }

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
    this.radios = Array.from(this.querySelectorAll('radio-btn'));
  }

  nav(dir = 1) {
    let i = this.radios.indexOf(this.active);
    if (i == undefined) i = dir < 0 ? this.radios.length - 1 : 0;else i += dir;
    if (i >= this.radios.length) i = 0;else if (i < 0) i = this.radios.length - 1;
    this.value = this.radios[i].value;
  }

  _onChange(e) {
    if (e.target == this) return;
    this.value = e.target.value;
    this.setAttribute('value', this.value);
    e.stopPropagation();
    var event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value
      }
    });
    this.dispatchEvent(event);
  }

  get active() {
    return this.radios.find(el => el.active);
  }

  get value() {
    let radio = this.active;
    return radio && radio.value;
  }

  set value(val) {
    (this.radios || []).forEach(el => {
      if (el.value == val) el.active = true;else el.active = false;
    });
    this.setAttribute('value', val);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val = true) {
    val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
    this.radios.forEach(el => el.disabled = val);
  }

}

customElements.define('radio-group', RadioGroupElement);

var _default = customElements.get('radio-group');

exports.default = _default;
},{}],"wbVn":[function(require,module,exports) {
"use strict";

require("./form-handler");

require("./form-control");

require("./controls/text-field");

require("./controls/select-field");

require("./controls/check-box");

require("./controls/radio-btn");

require("./controls/radio-group");

require("./controls/touch-ripple");

require("./controls/range-slider");
},{"./form-handler":"ZQnj","./form-control":"swB1","./controls/text-field":"ezNL","./controls/select-field":"h8fl","./controls/check-box":"jNfL","./controls/radio-btn":"GLLF","./controls/radio-group":"mCnW","./controls/touch-ripple":"uH6r","./controls/range-slider":"ZCfn"}],"Wr69":[function(require,module,exports) {

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],"zXhY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _componentEmitter = _interopRequireDefault(require("component-emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataSource {
  constructor(opts = {}) {
    this.reset();
    this.opts = Object.assign({
      perPage: 30,
      fetch: true,
      fetchOnLoad: true
    }, opts);
  }

  reset() {
    this._pageFetched = null;
    this.lastFiltered = 0;
    this._rawData = []; // unaltered data from server

    this._filteredData = []; // raw data with after filters applied

    this.data = []; // filtered data with "search term" applied
  }

  set coll(coll) {
    this.hasFetched = false;
    this.__coll = coll;
  }

  get coll() {
    return this.__coll;
  }

  async refilter() {
    this.lastFiltered = 0;
    this._rawData = this.coll && this.coll.models || this.coll || [];
    this._filteredData = this._rawData;
    this.data = this._rawData;
    await this.applyFilters();
  }

  get perPage() {
    return this.opts.perPage;
  }

  async length() {
    if (this._fetching) await this._fetching;
    return this.data.length;
  }

  at(i) {
    return this.data[i];
  }

  first(i) {
    return this.data[0];
  }

  last() {
    return this.data[this.data.length - 1];
  }

  forEach(fn) {
    return this.data.forEach(fn);
  }

  map(fn) {
    return this.data.map(fn);
  }

  flatMap(fn) {
    return this.data.flatMap(fn);
  }

  filter(fn) {
    return this.data.filter(fn);
  }

  reduce(fn, start = 0) {
    return this.data.reduce(fn, start);
  }

  async _fetchFromServer(pageAt) {
    // TODO: support fetching data with `fetch` and a url?
    if (this.coll && this.coll.fetchSync) {
      let data = {
        term: this.filters.term || ''
      };

      if (this.opts.fetch == 'more') {
        data.pageAt = pageAt;
        data.perPage = this.perPage;
      }

      if (this.filters) data.filters = this.filters.toPostData();
      if (this.sorts) data.sorts = this.sorts.value;
      await this.coll.fetchSync({
        data: data,
        merge: true,
        // for Backone 0.9.10/0.9.9, 'update' is needed to register change events on the model, rather than mass "reset" (see line 815 in backbone source)
        update: true
      });
    }
  }

  fetch(pageAt) {
    return this._fetching = new Promise(async (resolve, reject) => {
      if (pageAt == 0 && this._rawData.length == 0 || this._pageFetched != pageAt && this._rawData.length == pageAt && this.opts.fetch == 'more') {
        this._pageFetched = pageAt;
        if (this.opts.fetch) await this._fetchFromServer(pageAt).catch(err => {
          reject(err);
        });
        await this.refilter();
      } // why was I doing this? it doesn't work when data is filtered
      // if( this._rawData.length > pageAt )
      //     this.emit('change:count', this._rawData.length)


      if (this._filtering) await this._filtering;
      if (this._sorting) await this._sorting;
      this.hasFetched = true;
      resolve(this.data.slice(pageAt, pageAt + this.opts.perPage));
    }).finally(_ => delete this._fetching);
  }

  applyFilters() {
    return this._filtering = new Promise(async resolve => {
      if (!this.filters) return resolve(this.data);

      if (this.lastFiltered < this.filters.lastChanged) {
        this.data = await this.filters.filter(this._rawData);
        await this.sort();
        this._filteredData = this.data;
      }

      this.data = await this.filters.filterByTerm(this._filteredData);
      resolve(this.data);
      this.lastFiltered = new Date().getTime();
      clearTimeout(this._applyFiltersEventEmit);
      this._applyFiltersEventEmit = setTimeout(() => {
        this.emit('changed');
      }, 500);
    }).finally(_ => delete this._filtering);
  }

  sort() {
    return this._sorting = new Promise(async resolve => {
      if (!this.sorts) return resolve(this.data);
      this.data = await this.sorts.sort(this.data);
      resolve(this.data);
    }).finally(_ => delete this._sorting);
  }

}

exports.default = DataSource;
(0, _componentEmitter.default)(DataSource.prototype);
},{"component-emitter":"Wr69"}],"YNHW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('b-list-filter-view-date', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: grid;
            position:relative;
            padding: .25em;
        }

        header {
            display: grid;
        }

        footer {
            display: flex;
            justify-content: flex-end;
        }

        b-btn {
            margin: .05em 0;
            padding: .1em;
        }

        b-btn:hover {
            --bgdColor: rgba(0, 0, 0, 0.1);
        }

        text-field {
            /* padding-right: .5em; */
            /* margin-right: -.5em; */
            /* width: 160px; */
        }

        b-hr {
            margin: .25em -.25em;
        }
        
        .controls {
            padding: .25em .5em;
            /* font-size: 1.4em; */
            /* display: flex; */
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            /* flex-direction: column; */
        }

        .controls span {
            margin: 0 .25em;
        }

        form-control:first-child {
            margin-bottom: .35em;
        }

        footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        b-label {
            margin: 0 .5rem;
        }
    `;
  }

  constructor(opts = {}) {
    super();
    this.opts = Object.assign({
      defaultLabel: '-',
      presets: true // TODO: support custom presets?

    }, opts);
  }

  firstUpdated() {
    this.editors = this.shadowRoot.querySelectorAll('form-control');
    let value = this.filter.value;
    if (value) this.editors.forEach((el, i) => el.value = value[i]);
  }

  render() {
    return (0, _litElement.html)`

        <b-btn text md @click=${this.clearDates}>Clear</b-btn>
        <b-hr></b-hr>

        <div class="controls">
            <form-control material="filled" key="date1">
                <text-field reset-invalid placeholder="00/00/0000" type="date" @enterkey=${this.onEnter}></text-field>
            </form-control>
            
            <span>–</span>
            
            <form-control material="filled" key="date2">
                <text-field reset-invalid placeholder="00/00/0000" type="date" @enterkey=${this.onEnter}></text-field>
            </form-control>
        </div>

        ${this.opts.presets !== false ? (0, _litElement.html)`
        <b-label sm divider>Presets</b-label>
        <footer>
            <b-btn text md @click=${this.usePreset}>Today</b-btn>
            <b-btn text md @click=${this.usePreset}>Yesterday</b-btn>
            <b-btn text md @click=${this.usePreset}>30 Days</b-btn>
            <b-btn text md @click=${this.usePreset}>This Month</b-btn>
            <b-btn text md @click=${this.usePreset}>This Year</b-btn>
        </footer>
        ` : ''}
    `;
  }

  get value() {
    let value = []; // editors not setup yet, so just use the value from the filter object

    if (!this.editors) return this.filter.value;
    this.editors.forEach(el => {
      let v = el.dbValue;
      if (v) value.push(v);
    });
    if (value.length == 0) return null;
    if (value.length == 1) value = [value[0], value[0]];
    value.sort();
    return value;
  }

  set value(val) {
    if (!val || val.length == 0) val = [null, null];
    if (typeof val == 'string') val = [val, val];
    if (val.length == 0) val = [val[0], val[0]];
    if (this.editors) this.editors.forEach((el, i) => {
      el.value = val[i] || null;
    });
  }
  /*
      We do a bunch of fancy logic to display a label that is hopefully
      the easy to scan while taking up the least amount of space
  */


  get label() {
    let val = this.value;
    if (!val) return this.opts.defaultLabel;
    let [d1, d2] = val;
    let m = (0, _dayjs.default)().startOf('day');
    let m1 = (0, _dayjs.default)(d1);
    let m2 = (0, _dayjs.default)(d2);
    let thisYear = m1.year() == m.year() && m2.year() == m2.year();
    let sameYear = m1.year() == m2.year(); // single day selected

    if (d1 == d2) {
      let m1 = (0, _dayjs.default)(d1);
      if (m.isSame(m1)) return 'Today';
      let diffDays = m.diff(m1, 'days');
      if (diffDays == 1) return 'Yesterday';
      if (diffDays > 1 && diffDays <= 14) return diffDays + ' days ago'; // leave off the year since it's this year

      if (thisYear) return m1.format('MMM D');
      return m1.format('M/D/YY');
    } // month range (beginning of one month to end of another month)


    if (m1.date() == 1 && m2.date() == m2.clone().endOf('month').date()) {
      let month1 = m1.format('MMM');
      let month2 = m2.format('MMM');

      if (month1 == month2 && sameYear) {
        if (month1 == m.format('MMM') && thisYear) return 'This Month';
        if (thisYear) return month1;
        return month1 + ' ‘' + m1.format('YY');
      }

      if (thisYear && sameYear && m1.month() == 0 && m2.month() == 11) return 'This Year';else if (thisYear && sameYear) return month1 + ' - ' + month2;else if (sameYear) return month1 + ' - ' + month2 + ' ' + m2.format('YYYY');else return month1 + ' ‘' + m1.format('YY') + ' - ' + month2 + ' ‘' + m2.format('YY');
    } // leave off the year since it's this year


    if (thisYear) return m1.format('MMM D') + ' - ' + m2.format('MMM D');
    return m1.format('M/D/YY') + ' - ' + m2.format('M/D/YY');
  }

  onEnter() {
    this.close();
  }

  clearDates() {
    this.value = null;
    this.close();
  }

  usePreset(e) {
    let preset = e.target.innerText;
    let values = [];
    let date = (0, _dayjs.default)();
    let format = 'YYYY-MM-DD';

    switch (preset) {
      case 'Today':
        values = [date.format(format)];
        break;

      case 'Yesterday':
        values = [date.subtract('1', 'day').format(format)];
        break;

      case '30 Days':
        values = [date.clone().subtract('30', 'day').format(format), date.format(format)];
        break;

      case 'This Month':
        values = [date.startOf('month').format(format), date.endOf('month').format(format)];
        break;

      case 'This Year':
        values = [date.startOf('year').format(format), date.endOf('year').format(format)];
        break;
    }

    this.value = values;
    this.close();
  }

});

var _default = customElements.get('b-list-filter-view-date');

exports.default = _default;
},{"lit-element":"bhxD","dayjs":"dZYI"}],"J1Yi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-list-filter-view-input', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: grid;
            position:relative;
            padding: .5em;
        }

        form-control {
            margin:0;
        }

        b-btn.cancel {
            margin: -.5em -.5em -.5em 0;
            vertical-align: middle;
        }

        [empty] ~ b-btn.cancel {
            visibility: hidden;
        }

    `;
  }

  constructor(opts) {
    super();
    this.opts = opts;
  }

  firstUpdated() {
    this.input = this.shadowRoot.querySelector('form-control');
    let value = this.filter.value;
    if (value) this.input.value = value;
  }

  render() {
    return (0, _litElement.html)`
        <form-control material="filled">
            <text-field reset-invalid placeholder="${this.get('placeholder')}" @enterkey=${this.onEnter}></text-field>
            <span slot="help">${this.get('helpText')}</span>
            <b-btn slot="suffix" class="cancel" icon="cancel-circled" text @click=${this.clearValue}></b-btn>
        </form-control>
    `;
  }

  get(key, defaultVal = '') {
    let val = this.opts[key]; // legacy - should use viewOpts now

    if (val == undefined) val = this.filter.attrs[key];
    return val != undefined ? val : defaultVal;
  }

  get value() {
    let value = ''; // editors not setup yet, so just use the value from the filter object

    if (!this.input) return this.filter.value;
    return this.input.value;
  }

  set value(val) {
    if (this.input) this.input.value = val;
  }
  /*
      We do a bunch of fancy logic to display a label that is hopefully
      the easy to scan while taking up the least amount of space
  */


  get label() {
    return this.value || this.get('defaultLabel', 'unset');
  }

  onEnter() {
    this.close();
  }

  clearValue() {
    this.value = null;
    this.close();
  }

});

var _default = customElements.get('b-list-filter-view-input');

exports.default = _default;
},{"lit-element":"bhxD"}],"vufV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-list-filter-view-slider', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: grid;
            position:relative;
            padding: .25em;
        }

        range-slider {
            width: 100%;
            margin: 1em 1.5em .5em 1.5em;
        }
    `;
  }

  constructor(opts = {}) {
    super();
    this.opts = Object.assign({
      range: false,
      min: 0,
      max: 100,
      step: 1,
      label: 'show',
      width: '160px',
      prefix: '',
      suffix: ''
    }, opts);
  }

  render() {
    return (0, _litElement.html)`
        
        <b-btn text @click=${this.clearVal}>Clear</b-btn>

        <b-hr></b-hr>

        <range-slider 
            style="width:${this.opts.width}"
            @change=${this.onChange}
            ?range=${this.opts.range}
            min=${this.opts.min}
            max=${this.opts.max}
            step=${this.opts.step}
            label=${this.opts.label}
            .value=${this.value}
        ></range-slider>
    `;
  }

  clearVal() {
    this.value = null;
    this.shadowRoot.querySelector('range-slider').reset();
    this.close();
  }

  onChange(e) {
    this.value = e.target.value; // this.close()
  }

  get value() {
    if (this.__value === undefined) this.__value = this.filter.value || null;
    return this.__value;
  }

  set value(val) {
    // let oldVal = this.value
    this.__value = val; // this.requestUpdate('value', oldVal)
  }

  get label() {
    let val = this.value;
    if (val === null || val === '') return '–';
    let str = Array.isArray(val) ? val[0] == val[1] ? val[0] : val.join('-') : val;
    return this.opts.prefix + str + this.opts.suffix;
  }

});

var _default = customElements.get('b-list-filter-view-slider');

exports.default = _default;
},{"lit-element":"bhxD"}],"cUXh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _menu = _interopRequireDefault(require("../../../menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('b-list-filter-view-search', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: block;
            position:relative;
            width: 200px;
            /* min-height: 300px; */
            max-height: 70vh;
        }
    `;
  }

  constructor(opts = {}) {
    super();
    this.opts = opts;
  }

  render() {
    return (0, _litElement.html)`
        <slot></slot>
    `;
  }

  onKeydown(e) {
    if (e.key == 'Escape') {
      this.value = this.filter.value;
      this.close();
      return;
    }

    this.menu.onKeydown.call(this.menu, e);
  }

  onSelect(item) {
    this._values.push(item);

    this.value = this._values;
    this.menu.clear();
    this.focus();
  }

  onDeselect(items) {
    if (items.length == 1 && items[0].val == '') items = [];
    this.value = items;
    if (items.length == 0) this.close();else this.focus();
  }

  get menuForValues() {
    let menu = [];

    let selected = this._values.map(d => d.val);

    if (this._values.length > 0) {
      menu.push({
        label: 'Any',
        val: '',
        clearsAll: true
      }, 'divider');
      menu.push(...this._values.map(d => {
        d.selected = true;
        return d;
      }));
    }

    return [menu, selected];
  }

  firstUpdated() {
    this._values = this.filter.value || [];
    let [menu, selected] = this.menuForValues;
    this.valueMenu = new _menu.default(menu, {
      multiple: 'always',
      selected: selected,
      onSelect: this.onDeselect.bind(this)
    });
    this.appendChild(this.valueMenu.el);
    this.valueMenu.render();
    this.menu = new _menu.default([], {
      typeDelay: 200,
      autoSelectFirst: true,
      onSelect: this.onSelect.bind(this),
      search: {
        url: this.opts.url,
        placeholder: this.opts.placeholder || 'Search',
        parse: this.opts.parseResult
      }
    });
    this.appendChild(this.menu.el);
    this.menu.render();
  }

  didClose() {
    this.menu && this.menu.clear();
  }

  connectedCallback() {
    super.connectedCallback();
    this.focus();
  }

  focus() {
    setTimeout(() => {
      if (this.menu) this.menu.focusSearch();
    }, 100);
  }

  get value() {
    if (!this._values) return this.filter.value;
    return this._values.map(d => {
      return {
        label: d.label,
        val: d.val
      };
    });
  }

  set value(val) {
    this._values = (val || []).map(o => Object.assign({}, o));

    if (this.valueMenu) {
      let [menu, selected] = this.menuForValues;
      this.valueMenu.updateMenu(menu, selected);
    }
  }

  get label() {
    let val = this.value;
    if (!val || val.length == 0) return '–';
    return val.map(d => d.label).join(', ');
  } // OPTIONAL


  get defaultVal() {
    // when the filters are cleared/reset, what value should be the default?
    return null;
  }

  filterBy(model, val, key) {
    return this.value.find(d => d.val == model.get(key));
  }

});

var _default = customElements.get('b-list-filter-view-search');

exports.default = _default;
},{"lit-element":"bhxD","../../../menu":"tCYJ"}],"HGW8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = exports.default = void 0;

var _menu = _interopRequireDefault(require("../../menu"));

var _dialog = _interopRequireDefault(require("../../dialog"));

var _popover = _interopRequireDefault(require("../../popover"));

var _titleize = _interopRequireDefault(require("../../../util/titleize"));

var _fuse = _interopRequireDefault(require("fuse.js"));

var _componentEmitter = _interopRequireDefault(require("component-emitter"));

var _filterViewDate = _interopRequireDefault(require("../toolbar/filter-view-date"));

var _filterViewInput = _interopRequireDefault(require("../toolbar/filter-view-input"));

var _filterViewSlider = _interopRequireDefault(require("../toolbar/filter-view-slider"));

var _search = _interopRequireDefault(require("../toolbar/filter-view/search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import FilterViewToken from '../toolbar/filter-view/token'
const CustomViews = {
  'date': _filterViewDate.default,
  'input': _filterViewInput.default,
  'slider': _filterViewSlider.default,
  'search': _search.default // 'token': FilterViewToken

}; // do NOT include 0 or false as unset values

const unsetValues = [undefined, null, ''];

const defaultSearch = model => {
  let data = {};
  ['id', 'title', 'name', 'label', 'file', 'dir'].forEach(key => {
    if (model.has !== undefined) {
      if (model.has(key)) data[key] = model.get(key);
    } else if (model[key] !== undefined) data[key] = model[key];
  });
  return data;
};

const defaultFilterby = (model, val, key) => {
  if (Array.isArray(val)) return val.includes(model.get(key));else return val == model.get(key);
};

class Filters extends Map {
  get _storeKey() {
    return 'b-list:' + this.key + ':filters';
  }

  reset(values = {}) {
    this.queuing = false;
    let resetData = {};
    this.map(filter => {
      resetData[filter.key] = values[filter.key] !== undefined ? values[filter.key] : filter.defaultVal;
    });
    this.value(resetData);
  }

  toString() {
    let active = [];
    this.forEach(filter => {
      if (filter.isActive) active.push(`${filter.label}: ${filter.valueLabel}`);
    });
    return active.join(' | ');
  } // alias that makes more sense when working programically


  update(filters) {
    this.value(filters);
  }

  value(key, val) {
    // first time getting value, get it from local storage
    if (this.__value === undefined) {
      this.__value = this.key && JSON.parse(localStorage.getItem(this._storeKey)) || {};
    } // SETTING


    if (val !== undefined || typeof key == 'object') {
      this.lastChanged = new Date().getTime(); // may be setting more than one value

      let changes = typeof key == 'object' ? key : {
        [key]: val
      };
      let didChange = [];

      for (let k in changes) {
        let changeFrom = this.__value[k];
        let changeTo = changes[k]; // is the selected value effectively "unset" (`multi` filters will be an array: `[null]` )

        if ([null, undefined].includes(changeTo) || Array.isArray(changeTo) && [null, undefined].includes(changeTo[0])) delete this.__value[k];else this.__value[k] = changeTo; // converting to JSON string so we can compare arrays

        if (JSON.stringify(this.__value[k]) != JSON.stringify(changeFrom)) {
          didChange.push(k);
        } else {
          delete changes[k];
        }
      }

      if (this.key) localStorage.setItem(this._storeKey, JSON.stringify(this.__value));

      if (didChange.length > 0) {
        // emit a change on each filter
        didChange.forEach(k => {
          let filter = this.get(k);
          if (filter.isCustomView) filter.customView.value = this.value(k);
          filter.emit('change', this.value(k));
        });
        if (this.queuing) this.queuedChanges = changes;else this.emit('change', changes);
      } // GETTING

    } else {
      return key ? this.__value[key] : this.__value;
    }
  }

  toPostData() {
    let value = this.value();
    let data = {};

    for (let key in value) {
      let d = value[key]; // only send "values" from the `search` filter view

      if (Array.isArray(d)) data[key] = d.map(item => {
        return item.val != undefined ? item.val : item;
      });else data[key] = d;
    }

    return data;
  }

  get queuing() {
    return this.__queue || false;
  }

  set queuing(val) {
    this.__queue = Boolean(val);

    if (!this.queuing && this.queuedChanges) {
      this.emit('change', this.queuedChanges);
      this.queuedChanges = null;
    }
  }

  get queuedChanges() {
    return this.__queuedChanges;
  }

  set queuedChanges(changes) {
    if (!changes) {
      delete this.__queuedChanges;
      this.emit('queuing', false);
      return;
    }

    this.__queuedChanges = Object.assign(this.__queuedChanges || {}, changes);
    this.emit('queuing', Object.keys(this.__queuedChanges).length);
  }

  use(filters) {
    if (filters == this.__lastFilters) return;
    this.__lastFilters = filters;
    this.forEach(filter => delete filter.parent);
    this.clear();

    for (let key in filters) {
      if (!filters[key]) continue;

      if (key == 'search') {
        this.searchOptions = filters[key];
        continue;
      }

      let filter = new Filter(key, filters[key]);
      filter.parent = this;
      this.set(key, filter);
    }

    this.lastChanged = new Date().getTime();
  }

  map(fn) {
    let resp = [];
    this.forEach((v, key) => resp.push(fn(v, key)));
    return resp;
  }

  set searchOptions(opts) {
    if (opts === false) this.__searchOptions = {
      data: false
    }; // turns search off

    if (typeof opts == 'object') this.__searchOptions = opts;
  }

  get searchOptions() {
    return Object.assign({
      data: defaultSearch,
      includeMatches: true,
      minMatchCharLength: 3,
      threshold: 0.2,
      location: 0,
      distance: 100,
      placeholder: 'Search',
      delay: 0
    }, this.__searchOptions || {});
  }

  get showSearch() {
    return !!this.searchOptions.data;
  }

  filterByTerm(data) {
    return new Promise(resolve => {
      let searchOptions = Object.assign({}, this.searchOptions);
      let keys = searchOptions.keys;
      data.forEach(m => {
        m.searchMatches = {};
      });
      if (!this.term || !searchOptions.data || searchOptions.data === 'db' || this.term.length < searchOptions.minMatchCharLength) return resolve(data);
      data.forEach(m => {
        m._fuseSearch = searchOptions.data(m); // no search option keys set yet, so set them automatically

        if (!keys) keys = Object.keys(m._fuseSearch);
      }); // prefix all keys with `_fuseSearch.` so the data is searched properly
      // keys can be an array of strings or objects with name/weight

      if (keys) searchOptions.keys = keys.map(key => {
        if (typeof key == 'string') return '_fuseSearch.' + key;
        let newKey = Object.assign({}, key);
        newKey.name = '_fuseSearch.' + newKey.name;
        return newKey;
      });
      let fuse = new _fuse.default(data, searchOptions);
      data = fuse.search(this.term); // reformat to array of models

      if (searchOptions.includeMatches) data = data.map(d => {
        d.item.searchMatches = {};
        d.matches.forEach(m => {
          d.item.searchMatches[m.key.replace('_fuseSearch.', '')] = m.value;
        });
        return d.item;
      });
      resolve(data);
    });
  }

  async filter(data) {
    let filters = this.map(filter => filter); // apply each filter, waiting for the first one to finish before moving on to the next filter

    return filters.reduce((promise, filter) => {
      return promise.then(data => filter.filterData(data));
    }, Promise.resolve(data));
  }

  needsDatabaseFetch(changes) {
    for (let key in changes) {
      if (this.get(key).isDB) return true;
    }

    return false;
  }

}
/*
    Filter
*/


exports.default = Filters;

class Filter {
  constructor(key, attrs) {
    this.key = key;
    this.attrs = attrs;
  }

  get values() {
    // TODO: implement "context" for function?
    let values = this.attrs.values;
    values = typeof values == 'function' ? values.call(this.parent.list, this) : values;
    values = values.map(v => {
      if (typeof v == 'string' && !['divider'].includes(v)) v = {
        label: v,
        val: v
      }; // make "unset" values uniform

      if (typeof v == 'object' && unsetValues.includes(v.val)) {
        v.val = null;
        v.clearsAll = true;
      }

      return v;
    });
    return values;
  }

  get label() {
    return this.attrs.label || (0, _titleize.default)(this.key);
  }

  get icon() {
    return this.attrs.icon || null;
  }

  get filterBy() {
    if (!this.attrs.filterBy && this.isCustomView && this.customView.filterBy) return this.customView.filterBy;
    return this.attrs.filterBy || defaultFilterby;
  } // is a database filter


  get isDB() {
    return this.attrs.db === true;
  }

  get isCustomView() {
    return !!this.attrs.view;
  }

  get isActive() {
    let val = this.isMulti ? this.value && this.value[0] : this.value;
    return !unsetValues.includes(val);
  }

  get isMulti() {
    return this.attrs.multi === true;
  }

  get value() {
    return this.parent.value(this.key);
  }

  set value(val) {
    this.parent.value(this.key, val);
  }

  get defaultVal() {
    if (this.attrs.defaultVal) return this.attrs.defaultVal;
    if (this.isCustomView) return this.customView.defaultVal ? this.customView.defaultVal : null;
    let first = this.values[0];
    return first ? first.val : null;
  }

  get valueLabel() {
    let val = this.value;
    if (Array.isArray(val)) val = val.map(v => v.val || v);else val = val && (val.val || val);

    if (this.isCustomView) {
      let view = this.customView;
      return view ? view.label : 'UNSUPORRTED';
    }

    let matchedVal = this.values.filter((v, i) => {
      if (typeof v == 'string' || v.divider || v.text || v.noDisplay) return false; // return v.val==val

      if (!Array.isArray(val)) {
        if (v.val == val) {
          Object.assign(v, this.value);
          return true;
        }

        return false;
      }

      let matchedIndex = val.indexOf(v.val);

      if (matchedIndex > -1) {
        let mergeData = this.value[matchedIndex];

        if (mergeData && typeof mergeData == 'object') {
          Object.assign(v, mergeData);
        }

        return true;
      }

      return false;
    });
    return matchedVal ? matchedVal.map(f => {
      return [f.selection, f.toolbarLabel || f.label].filter(s => s).join(' ');
    }).join(', ') : val;
  }

  async showMenu(el) {
    if (this.isCustomView) return this.showCustomView(el);
    let selected = await new _menu.default(this.values, {
      selected: this.value,
      multiple: this.isMulti,
      width: this.attrs.width || null
    }).popover(el, {
      overflowBoundry: this.attrs.overflowBoundry || 'scrollParent',
      maxHeight: this.attrs.maxHeight || '60vh',
      adjustForMobile: true
    });
    let oldVal = this.value;
    if (selected === false || selected.length == 0) return; // this.value = null
    else if (Array.isArray(selected)) this.value = selected.map(s => {
        return s.selection ? {
          val: s.val,
          selection: s.selection
        } : s.val;
      });else this.value = selected.selection ? {
        val: selected.val,
        selection: selected.selection
      } : selected.val;
  }

  get customView() {
    let viewName = this.attrs.view;
    let View = null;

    if (!this._customView) {
      if (CustomViews[viewName]) {
        View = CustomViews[viewName];
      } else if (typeof viewName == 'string') {
        View = customElements.get(viewName);
      } else if (typeof viewName == HTMLElement) {
        View = viewName;
      }

      if (View) {
        View.prototype.close = function () {
          this.popover && this.popover._close(); // to trigger onClose
        };

        this._customView = new View(this.attrs.viewOpts || {});
        this._customView.filter = this;
      }
    }

    return this._customView;
  }

  async showCustomView(el) {
    if (!this.customView) return _dialog.default.warn({
      msg: `${this.key}: unsupported view`
    }).popover(el);

    let onClose = _ => {
      // let menu close before attempting to set value
      // with larger datasets, a user can feel it lag for a split second
      setTimeout(() => {
        this.value = this.customView.value;
        this.customView.didClose && this.customView.didClose();
      });
    }; // TODO: support `adjustForMobile`


    new _popover.default(el, this.customView, {
      width: this.attrs.width || null,
      onClose: onClose,
      onKeydown: (...args) => {
        if (this.customView.onKeydown) {
          this.customView.onKeydown(...args);
        }
      }
    });
  }

  filterData(data) {
    return new Promise(resolve => {
      // pass through the data unchanged if any of these are met
      if (!this.isActive) return resolve(data);
      if (!this.filterBy) return resolve(data);
      if (this.isDB) return resolve(data);
      let val = this.value;
      data = data.filter(m => this.filterBy.call(this.parent.list, m, val, this.key));
      resolve(data);
    });
  }

}

exports.Filter = Filter;
(0, _componentEmitter.default)(Filters.prototype);
(0, _componentEmitter.default)(Filter.prototype);
},{"../../menu":"tCYJ","../../dialog":"pos3","../../popover":"Soyf","../../../util/titleize":"NUHt","fuse.js":"Wp9p","component-emitter":"Wr69","../toolbar/filter-view-date":"YNHW","../toolbar/filter-view-input":"J1Yi","../toolbar/filter-view-slider":"vufV","../toolbar/filter-view/search":"cUXh"}],"sAKI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _menu = _interopRequireDefault(require("../../menu"));

var _titleize = _interopRequireDefault(require("../../../util/titleize"));

var _device = _interopRequireDefault(require("../../../util/device"));

var _componentEmitter = _interopRequireDefault(require("component-emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Sorts extends Map {
  get _storeKey() {
    return 'b-list:' + this.key + ':sort';
  }

  get value() {
    // first time getting value, get it from local storage
    if (this.__value === undefined) {
      this.__value = this.key && JSON.parse(localStorage.getItem(this._storeKey)) || {};
    }

    return this.__value;
  }

  set value(val) {
    let didChange = JSON.stringify(this.__value) != JSON.stringify(val);
    this.__value = val;

    if (this.key) {
      if (val == null || val == undefined) localStorage.removeItem(this._storeKey);else localStorage.setItem(this._storeKey, JSON.stringify(val));
    }

    this.forEach(sort => sort.selected = this.value[sort.key]);
    if (didChange) this.emit('change', val);
  }

  get unset() {
    return Object.keys(this.value).length == 0;
  }

  use(sorts) {
    if (sorts.db) {
      this.sortOnDB = true;
      delete sorts.db;
    }

    if (sorts.defaults) {
      let defaultVals = {};
      sorts.defaults.map(key => {
        if (!sorts[key]) return;
        defaultVals[key] = {
          desc: sorts[key].desc || false
        };
      });

      if (this.unset) {
        this.__value = defaultVals;
        localStorage.setItem(this._storeKey, JSON.stringify(defaultVals));
      }

      delete sorts.defaults;
    }

    if (sorts == this.__lastSorts) return;
    this.__lastSorts = sorts;
    this.clear();

    for (let key in sorts) {
      let sort = new Sort(key, sorts[key]);
      sort.sorts = this;
      sort.selected = this.value[key];
      this.set(key, sort);
    }
  }

  map(fn) {
    let resp = [];
    this.forEach((v, key) => resp.push(fn(v, key)));
    return resp;
  }

  get label() {
    let active = this.active;
    return active.length == 0 ? 'None' : active.map(sort => sort.label).join(', ');
  }

  get active() {
    let active = [];
    Object.keys(this.value).forEach(key => {
      if (this.get(key)) active.push(this.get(key));
    });
    return active;
  }

  async showMenu(el) {
    let oldVal = this.value;
    let menu = this.map(sort => {
      return {
        label: sort.label,
        val: sort.key,
        description: sort.description,
        desc: sort.isDesc,
        extras: ['b-list-sort-dir-btn']
      };
    });
    menu.push({
      text: (0, _litElement.html)`Sorts will be applied in the order they are chosen.`
    });
    let selected = await new _menu.default(menu, {
      className: 'b-list-sort-menu',
      multiple: true,
      selected: Object.keys(oldVal)
    }).popover(el, {
      adjustForMobile: true,
      maxHeight: '50vh'
    });
    if (selected === false) return; // reformat selected values to what we need

    let val = {};
    selected.forEach(s => val[s.val] = {
      desc: s.desc
    });
    this.value = val;
  }

  sort(data) {
    // return
    let sorts = this.active;
    return new Promise(resolve => {
      if (sorts.length == 0) return resolve(data);
      data.sort(function (m1, m2) {
        for (let sort of sorts) {
          let val = sort.sortCompare(m1, m2); // the sort compare found different values

          if (val !== false) return val;
        }
      });
      resolve(data);
    });
  }

}

exports.default = Sorts;
(0, _componentEmitter.default)(Sorts.prototype);

class Sort {
  constructor(key, attrs) {
    this.key = key;
    if (typeof attrs == 'function') attrs = {
      sortBy: attrs
    };
    this.attrs = attrs;
  }

  get sortBy() {
    return this.attrs.sortBy || (m => m.get(this.key));
  }

  get label() {
    return this.attrs.label || (0, _titleize.default)(this.key);
  }

  get description() {
    return this.attrs.description || null;
  }

  get isDesc() {
    return this.selected ? this.selected.desc : this.attrs.desc || false;
  }

  sortCompare(m1, m2) {
    let v1 = this.sortBy(m1);
    let v2 = this.sortBy(m2);
    if (v1 > v2) return this.isDesc ? -1 : 1;
    if (v1 < v2) return this.isDesc ? 1 : -1;
    return false;
  }

}
},{"lit-element":"bhxD","../../menu":"tCYJ","../../../util/titleize":"NUHt","../../../util/device":"la8o","component-emitter":"Wr69"}],"ZTm8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _componentEmitter = _interopRequireDefault(require("component-emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Layouts extends Map {
  get _storeKey() {
    return 'b-list:' + this.key + ':layout';
  }

  constructor(layouts) {
    if (!Array.isArray(layouts)) layouts = Object.entries(layouts);
    super(layouts);
  }

  at(index) {
    return Array.from(this.keys())[index];
  }

  next() {
    let keys = Array.from(this.keys());
    let index = keys.indexOf(this.active);
    index++;
    if (index >= keys.length) index = 0;
    this.active = this.at(index);
  }

  get active() {
    return this.__layout || localStorage.getItem(this._storeKey) || this.at(0);
  }

  set active(val) {
    let oldVal = this.active;
    if (!this.has(val)) val = this.at(0);
    this.__layout = val;
    if (this.key && val) localStorage.setItem(this._storeKey, this.__layout);else if (this.key && !val) localStorage.removeItem(this._storeKey);
    if (val != oldVal) this.emit('change', val);
  }

}

exports.default = Layouts;
(0, _componentEmitter.default)(Layouts.prototype);
},{"component-emitter":"Wr69"}],"FOqU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-list-sort-btn', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: block
        }

        b-btn {
            --color: var(--toolbarTextColor);
        }

        main {
            display: inline-grid;
            line-height: 1.2em;
        }

        b-label {
            color: var(--toolbarTextColor);
            grid-area: unset !important;
        }

        .none:not(:first-child) {
            display: none;
        }

        .count {
            display: none;
            vertical-align: super;
            margin: -1em 0;
            font-weight: normal;
            opacity: .5;
            font-size: .8em;
        }

        @media (max-width:999px){
            .count:not([val="0"]) {
                display: inline-block;
            }

            .sort ~ .sort {
                display: none;
            }
        }

        b-icon {
            font-size: .8em;
            vertical-align: baseline;
            color: var(--toolbarTextColor);
            opacity: .5;
        }

        /* b-icon:hover {
            cursor: pointer;
            color: var(--primaryColor)
        } */
    `;
  }

  render() {
    return (0, _litElement.html)`
        <b-btn text class="sorts" @click=${this.sortMenu}>
            <main>
                <b-label xs>Sort</b-label>

                <div>
                    ${this.sorts.active.map(sort => (0, _litElement.html)`
                        <span class="sort" .sort=${sort}>
                            <b-icon name="${sort.isDesc ? 'sort-alt-down' : 'sort-alt-up'}"></b-icon> ${sort.label}
                        </span>
                    `)}
                    
                    <span class="none">None</span>
                    
                    <span class="count" val="${this.sorts.active.length - 1}">
                        +${this.sorts.active.length - 1}
                    </span>
                </div>
            </main>
        </b-btn>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.update = this.update.bind(this);
    this.sorts.on('change', this.update);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.sorts.off('change', this.update);
  } // changeDir(e){
  //     e.stopPropagation()
  //     let sort = e.currentTarget.parentElement.sort
  // }


  sortMenu(e) {
    this.sorts.showMenu(e.currentTarget);
  }

});

var _default = customElements.get('b-list-sort-btn');

exports.default = _default;
},{"lit-element":"bhxD"}],"pUXj":[function(require,module,exports) {
"use strict";

var _litElement = require("lit-element");

customElements.define('b-list-sort-dir-btn', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: block
        }

        b-btn {
            margin-top: -.5em;
            margin-bottom: -.5em;
            margin-right: -.5em;
        }

        b-btn:hover {
            --bgdColor: none !important;
            --textColor: var(--primaryColor)
        }
    `;
  }

  firstUpdated() {
    this.classList.add('when-active');
  }

  render() {
    return (0, _litElement.html)`
        <b-btn clear icon="${this.item.desc ? 'sort-alt-down' : 'sort-alt-up'}" @click=${this.onClick}></b-btn>
    `;
  }

  onClick(e) {
    e.stopPropagation();
    this.item.desc = !this.item.desc;
    this.update();
  }

});
},{"lit-element":"bhxD"}],"zIYl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-list-filter-btn', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: inline-block;
        }

        b-btn {
            --color: var(--toolbarTextColor);
        }

        main {
            display: inline-grid;
            line-height: 1.2em;
        }

        b-label {
            grid-area: unset;
            color: var(--toolbarTextColor);
            /* opacity: .4; */
        }

        b-icon {
            font-size: .8em;
            vertical-align: baseline;
            color: var(--toolbarTextColor);
            opacity: .4;
        }

        b-btn:not([active]) {
            color: var(--toolbarTextColor);
            opacity: .4;
        }

        b-btn[active] {
            font-weight: bold;
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <b-btn text ?active=${this.filter.isActive} @click=${this.showMenu}>
            <main>
                <b-label xs>${this.filter.label}</b-label>
                <div>
                    ${this.filter.icon ? (0, _litElement.html)`<b-icon name="${this.filter.icon}"></b-icon>` : ''}
                    ${this.filter.valueLabel}
                </div>
            </main>
        </b-btn>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.update = this.update.bind(this);
    this.filter.on('change', this.update); // this.addEventListener('filter-changed', this.update, true)
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.filter.off('change', this.update); // this.removeEventListener('filter-changed', this.update, true)
  }

  showMenu(e) {
    this.filter.showMenu(e.currentTarget);
  }

});

var _default = customElements.get('b-list-filter-btn');

exports.default = _default;
},{"lit-element":"bhxD"}],"x6cT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

require("./filter-btn");

customElements.define('b-list-filters', class extends _litElement.LitElement {
  static get properties() {
    return {
      count: {
        type: Number
      },
      queuing: {
        type: Number
      }
    };
  }

  constructor() {
    super();
    this.onFilterQueuing = this.onFilterQueuing.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: flex;
            align-items: center;
            overflow: -moz-scrollbars-none;
            flex: 1;
        }

        [icon='erase'] { display: none; }
        b-list-filter-btn[active] ~ [icon="erase"] {
            display: inline-block
        }

        b-list-filter-btn {
            flex-shrink: 0;
        }

        @media (max-width:699px) {
            /* move active filters  to front on small devices */
            .filters b-list-filter-btn[active] {
                order: -1;
            }
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <b-btn icon="layers" ?hidden=${!this.queuing} title="Apply queued filters" text
            @click=${this.applyQueuedFilters}>${this.queuing}</b-btn>
        
        ${this.filters.map(filter => (0, _litElement.html)`
            <b-list-filter-btn ?active=${filter.isActive} .filter=${filter}></b-list-filter-btn>
        `)}
        
        <b-btn color="hover-red" title="Clear filters" icon="erase" text @click=${this.resetFilters}></b-btn>
    `;
  }

  applyQueuedFilters() {
    this.filters.queuing = false;
  }

  resetFilters() {
    this.filters.reset();
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.filters) {
      this.filters.on('queuing', this.onFilterQueuing);
      this.filters.on('change', this.onFilterChange);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.filters) {
      this.filters.off('queuing', this.onFilterQueuing);
      this.filters.off('change', this.onFilterChange);
    }
  }

  onFilterQueuing(length) {
    this.queuing = length;
  }

  onFilterChange() {
    this.update();
  }

});

var _default = customElements.get('b-list-filters');

exports.default = _default;
},{"lit-element":"bhxD","./filter-btn":"zIYl"}],"XQL9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _btn = _interopRequireDefault(require("../../../elements/btn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('b-list-layout-btn', class extends _btn.default {
  firstUpdated() {
    this.setIcon();
    this.addEventListener('click', e => {
      this.layouts.next();
    });
  }

  setIcon() {
    this.icon = this.layouts.get(this.layouts.active);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setIcon = this.setIcon.bind(this);
    this.layouts.on('change', this.setIcon);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.layouts.off('change', this.setIcon);
  }

});

var _default = customElements.get('b-list-layout-btn');

exports.default = _default;
},{"../../../elements/btn":"DABr"}],"uCjH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

require("../../form-control/form-control");

require("../../form-control/controls/text-field");

customElements.define('b-list-search-bar', class extends _litElement.LitElement {
  static get properties() {
    return {
      placeholder: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.placeholder = 'Search';
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: block
        }

        form-control {
            padding: .5em .65em;
            background: var(--searchBgd, #f5f5f5); /* backwards comp */
            background: var(--list-search-bgd, var(--searchBgd));
            border-radius: 30px;
            /* max-width: 140px; */
        }

        text-field {
            min-width: 70px;
            /* transition: 300ms; */
        }

        form-control[falsy]:not(:focus-within):not(:hover){
            background: none;
        }

        form-control[falsy]:not(:focus-within){
            cursor: pointer;
        }

        form-control[falsy]:not(:focus-within) text-field {
            height: 1em;
            overflow: hidden;
            min-width: 0;
            width: 0;
            margin-right: -.5em;
        }

        b-icon {
            color: var(--theme-color,#444);
            margin-right: .5em;
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <form-control>
            <text-field placeholder="${this.placeholder}" bubble-keypress single-line></text-field>
            <b-icon @click=${this.focus} name="search" slot="prefix"></b-icon>
        </form-control>
    `;
  }

  focus() {
    this.shadowRoot.querySelector('form-control').focus();
  }

  get value() {
    this.textField = this.textField || this.shadowRoot.querySelector('text-field');
    return this.textField.currentValue;
  }

});

var _default = customElements.get('b-list-search-bar');

exports.default = _default;
},{"lit-element":"bhxD","../../form-control/form-control":"swB1","../../form-control/controls/text-field":"ezNL"}],"iwaU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _popover = _interopRequireDefault(require("../../popover"));

require("./sort-btn");

require("./sort-dir-btn");

require("./filters-view");

require("./layout-btn");

require("./search");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('b-list-toolbar', class extends _litElement.LitElement {
  static get properties() {
    return {
      count: {
        type: Number
      }
    };
  }

  constructor() {
    super();
    this.count = 0;
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: flex;
            align-items: center;
            min-width: 0;
            position: relative;
        }

        [hidden] { display: none; }

        b-list-sort-btn {
            flex-shrink: 0;
        }

        b-btn {
            color: var(--toolbarTextColor);
        }

        .scroller {
            display: flex;
            overflow-y: auto;
            align-items: center;
            overflow: -moz-scrollbars-none;
            flex: 1;
        }

        .scroller::-webkit-scrollbar { width: 0 !important; height: 0 !important; }

        b-list-sort-btn + b-list-filters {
            border-left: solid 2px rgba(0,0,0,.1);
            margin-left: .25em;
            padding-left: .25em;
        }

        .after {
            margin-left: auto;
            display: flex;
            align-items: center;
        }

        .count {
            align-self: stretch;
            display: flex;
            align-items: center;
            border-right: 2px solid rgba(0, 0, 0, 0.1);
            padding: 0 .75em 0 .25em;
            margin-right: .25em;
        }

        .controls {
            display: inline-grid;
        }

        .controls > b-icon {
            font-size: .8em;
            padding: .2em .35em;
            color: rgba(0, 0, 0, 0.4);
        }

        .controls > b-icon:hover {
            color: #333;
        }
    `;
  }

  render() {
    return (0, _litElement.html)`
        <slot name="before"></slot>

        <div class="count">${this.count}</div>

        <div class="scroller">

            ${!this.sorts ? '' : (0, _litElement.html)`
                <b-list-sort-btn .sorts=${this.sorts}></b-list-sort-btn>
            `}
            
            ${!this.filters ? '' : (0, _litElement.html)`
                <b-list-filters .filters=${this.filters}></b-list-filters>
            `}

        </div>
        
        <div class="after">

            ${!this.filters || !this.filters.showSearch ? '' : (0, _litElement.html)`
            <b-list-search-bar @keydown=${this.onKeyDown} placeholder=${this.filters.searchOptions.placeholder}></b-list-search-bar>
            `}

            ${!this.layouts ? '' : (0, _litElement.html)`
                <b-list-layout-btn .layouts=${this.layouts} pill text></b-list-layout-btn>
            `}

            <slot name="refresh-btn"></slot>

            <slot name="after"></slot>

            <slot></slot>
        </div>
    `;
  } // not used, testing idea


  openOver(el, opts) {
    new _popover.default(el, this, opts);
  }

  onKeyDown(e) {
    let target = e.target;
    let ts = this.filters.searchOptions.delay;
    clearTimeout(this._keydownTimeout);
    this._keydownTimeout = setTimeout(_ => {
      let term = target.value;
      if (term == this.filters.term) return;
      this.filters.term = term;
      this.dispatchEvent(new CustomEvent('filter-term-changed', {
        bubbles: true,
        composed: true,
        detail: {
          term: term
        }
      }));
    }, ts);
  }

});

var _default = customElements.get('b-list-toolbar');

exports.default = _default;
},{"lit-element":"bhxD","../../popover":"Soyf","./sort-btn":"FOqU","./sort-dir-btn":"pUXj","./filters-view":"x6cT","./layout-btn":"XQL9","./search":"uCjH"}],"xA0J":[function(require,module,exports) {
"use strict";

var _litElement = require("lit-element");

customElements.define('b-list-selection-bar', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: block;
            position:absolute;
            z-index: 10;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            background: var(--theme-bgd, #fff);

            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 0;
            padding: 0 .5em;
        }

        :host(:not(.show)) {
            display: none;
        }

        .cancel-btn {
            margin-right: .5em;
            /* margin: 0 1em; */
        }

        @media (max-width: 699px) {
            .count > span {
                display: none;
            }
        }

    `;
  }

  set selection(selection) {
    this.__selection = selection; // TODO: unbind when changing?

    selection.on('begin', e => {
      this.classList.add('show');
      this.update();
    });
    selection.on('end', e => {
      this.classList.remove('show');
    });
    selection.on('change', result => {
      this.update();
    });
  }

  get selection() {
    return this.__selection;
  }

  render() {
    return (0, _litElement.html)`
        ${this.selection ? (0, _litElement.html)`

            <div>
                <b-btn class="cancel-btn" icon="cancel-1" @click=${this.end} outline></b-btn>

                <span class="count">
                ${this.selection.result.size} <span>selected</span>
                </span>

                <slot name="left"></slot>
            </div>

            <div>
                <slot name="right"></slot>
            </div>
        ` : ''}
    `;
  }

  end() {
    this.selection.end();
  }

});
},{"lit-element":"bhxD"}],"zwrR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

require("../../elements/empty-state");

customElements.define('b-infinite-list', class extends _litElement.LitElement {
  createRenderRoot() {
    return this;
  } // static get styles(){return css`
  //     :host {
  //         display: block
  //     }
  // `}


  constructor() {
    super();
    this.pageAt = 0;
    this.threshold = 400;
  }

  firstUpdated() {
    // after first updating, reset and get content
    let loadContent = this.getAttribute('fetch-on-load') !== 'false';
    this.reset(loadContent);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('scroll', this.onScroll, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('scroll', this.onScroll, true);
  }

  async reset(andLoadContent = true) {
    this.pageAt = 0;
    this.scrollTop = 0;
    this.prevModel = null;
    if (andLoadContent) await this.getContent({
      clear: true
    });else this.addContent([], {
      clear: true
    });
  }

  onScroll() {
    let delta = this.scrollHeight - this.scrollTop - this.offsetHeight;
    let down = !this._scrollDelta || delta < this._scrollDelta;
    this._scrollDelta = delta;
    if (!down || delta == 0) return;
    if (delta <= this.threshold) this.getContent();
  }

  async getContent({
    clear = false
  } = {}) {
    if (!this.dataSource) return;
    if (this._fetching) return;
    let pageAt = this.pageAt;
    this._fetching = true;
    this._fetchFailed = false;

    try {
      let models = await this.dataSource.fetch(pageAt);
      this.addContent(models, {
        clear: clear
      });
    } catch (err) {
      this._fetchFailed = err;
      this.addContent([], {
        clear: clear
      });
    }

    this._fetching = null;

    if (pageAt == 0) {
      this.dispatchEvent(new CustomEvent('content-changed', {
        detail: {
          data: this.dataSource
        },
        bubbles: true,
        composed: true
      }));
    }

    if (this._fetchFailed) throw this._fetchFailed;
  } // get emptyElement(){return this.getAttribute('empty') || 'b-empty-state'}


  addContent(models, {
    clear = false
  } = {}) {
    this.pageAt += models.length;
    if (clear) this.innerHTML = '';

    if (this.pageAt == 0) {
      let emptyView = this.empty && this.empty();

      if (emptyView) {
        emptyView.fetchFailed = this._fetchFailed;
        this.appendChild(emptyView);
      }

      return;
    }

    models.forEach(model => {
      let divider = this.divider && this.divider(this.prevModel, model);

      if (divider) {
        this.appendChild(divider);
      }

      let row = this.row && this.row(model);

      if (row) {
        this.appendChild(row);
      }

      this.prevModel = model;
    });
    setTimeout(this.checkNotEnoughContent.bind(this));
  }

  checkNotEnoughContent() {
    if (this.scrollHeight <= this.offsetHeight) {
      this.getContent();
    }
  }

});

var _default = customElements.get('b-infinite-list');

exports.default = _default;
},{"lit-element":"bhxD","../../elements/empty-state":"dUnZ"}],"yvN8":[function(require,module,exports) {
"use strict";

var _litElement = require("lit-element");

/*
    Creates shortcuts for selector querying
*/
_litElement.LitElement.prototype.$ = function (query) {
  return this.querySelector(query);
};

_litElement.LitElement.prototype.$all = function (query) {
  return this.querySelectorAll(query);
};

_litElement.LitElement.prototype.$$ = function (query) {
  return this.shadowRoot ? this.shadowRoot.querySelector(query) : this.querySelector(query);
};

_litElement.LitElement.prototype.$$all = function (query) {
  return this.shadowRoot ? this.shadowRoot.querySelectorAll(query) : this.querySelectorAll(query);
};
},{"lit-element":"bhxD"}],"aR3g":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _componentEmitter = _interopRequireDefault(require("component-emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isTouch = ('ontouchstart' in window);

class ResultMap extends Map {
  get models() {
    return Array.from(this.values());
  }

  get elements() {
    return Array.from(this.keys());
  }

  get length() {
    return this.size;
  }

}

const DISABLE_EVENTS = ['longpress', 'contextmenu', 'dragstart', 'mouseenter', 'mousemove', 'click'];

class Selection {
  constructor(list, itemTagName, opts = {}) {
    this.opts = Object.assign({
      toolbar: null,
      selectedAttr: 'isSelected',
      endWhenNoResults: true,
      endOnEsc: true,
      autoScrollThreshold: 48,
      autoScrollAcceleration: 5,
      onBegin: () => {},
      onEnd: () => {},
      onChange: result => {}
    }, opts);
    this.EVENTS = {
      DOWN: isTouch ? 'touchstart' : 'mousedown',
      UP: isTouch ? 'touchend' : 'mouseup',
      DRAG: isTouch ? 'touchmove' : 'mouseover'
    };
    if (this.opts.toolbar) this.opts.toolbar.selection = this;
    this.result = new ResultMap();
    this.list = list;
    this.itemTagName = itemTagName.toUpperCase();
    this.SELECTED = this.opts.selectedAttr; // bind method context

    this.stopPropagation = this.stopPropagation.bind(this); // this.onClick = this.onClick.bind(this)

    this.onScroll = this.onScroll.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.onEventDown = this.onEventDown.bind(this);
    this.onEventUp = this.onEventUp.bind(this);
    this.onEventDrag = this.onEventDrag.bind(this);
  }

  get isOn() {
    return this.__on === true;
  }

  begin(e) {
    if (this.isOn) return;
    this.__on = true;
    this.list.setAttribute('selection-on', '');
    this.bindEvents(e); // select the item that triggered the selection

    if (e) {
      this._dragging = true;
      this._startItem = this.itemInEvent(e);
      this.select(this._startItem);
    }

    this.opts.onBegin();
    this.emit('begin');
  }

  end() {
    this.__on = false;
    this.list.removeAttribute('selection-on');
    this.unbindEvents();
    let {
      items
    } = this.getItems();
    items.forEach(item => {
      this._deselect(item);
    });
    this.opts.onEnd();
    this.emit('end');
  }

  bindEvents(e) {
    // incase other code is listening for these events
    // disable them while we are in selection mode
    DISABLE_EVENTS.forEach(evt => {
      this.list.addEventListener(evt, this.stopPropagation, true);
    });
    window.addEventListener('keydown', this.onKeydown);
    this.list.addEventListener('scroll', this.onScroll, true);
    this.list.addEventListener(this.EVENTS.DOWN, this.onEventDown, true);
    this.list.addEventListener(this.EVENTS.UP, this.onEventUp, true);
    if (e && e.detail && e.detail.dragging) this.list.addEventListener(this.EVENTS.DRAG, this.onEventDrag, true);
  }

  unbindEvents() {
    DISABLE_EVENTS.forEach(evt => {
      this.list.removeEventListener(evt, this.stopPropagation, true);
    });
    window.removeEventListener('keydown', this.onKeydown);
    this.list.removeEventListener('scroll', this.onScroll, true);
    this.list.removeEventListener(this.EVENTS.DRAG, this.onEventDrag, true);
    this.list.removeEventListener(this.EVENTS.DOWN, this.onEventDown, true);
    this.list.removeEventListener(this.EVENTS.UP, this.onEventUp, true);
  }

  getItems(start, end) {
    let items = Array.from(this.list.querySelectorAll(this.itemTagName));
    if (typeof start === 'number') start = items[start];
    if (typeof end === 'number') end = items[end];
    let oldStart = this._dragging && this._dragging.start;
    let oldEnd = this._dragging && this._dragging.end;

    if (start && end) {
      let startIndex = items.indexOf(start);
      let endIndex = items.indexOf(end);

      if (startIndex == -1 || endIndex == -1) {
        start = null;
        end = null;
      } else {
        start = startIndex < endIndex ? startIndex : endIndex;
        end = startIndex < endIndex ? endIndex : startIndex;
      }

      this._dragging = {
        items,
        start,
        end
      };
    }

    return {
      items,
      start,
      end,
      oldStart,
      oldEnd
    };
  }

  select(item, startItem) {
    if (item instanceof Event) item = this.itemInEvent(item);
    if (!item) return;

    if (!startItem) {
      this._toggleSelect(item);

      this.opts.onChange(this.result);
      this.emit('change', this.result);
      if (this.opts.endWhenNoResults && this.result.size == 0) setTimeout(() => this.end()); // let mouseup finish

      return;
    }

    let {
      items,
      start,
      end,
      oldStart,
      oldEnd
    } = this.getItems(startItem, item);
    let shouldSelect = startItem.hasAttribute(this.SELECTED);
    items.forEach((_item, i) => {
      if (i >= start && i <= end) shouldSelect ? this._select(_item) : this._deselect(_item);else if (oldStart !== false && oldEnd !== false && i >= oldStart && i <= oldEnd) this._deselect(_item);
    });
    this.emit('change', this.result);
    if (this.opts.endWhenNoResults && this.result.size == 0) setTimeout(() => this.end()); // let mouseup finish
  }

  _toggleSelect(item) {
    if (item.hasAttribute(this.SELECTED)) this._deselect(item);else this._select(item);
  }

  _select(item) {
    item.setAttribute(this.SELECTED, '');
    this.result.set(item, item.model || item);
  }

  _deselect(item) {
    item.removeAttribute(this.SELECTED);
    this.result.delete(item);
  }

  stopPropagation(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
  }

  onScroll() {
    if (isTouch && !this._autoScroll && !this._dragging) {
      this._scrolling = new Date().getTime();
    }
  }

  onKeydown(e) {
    if (this.opts.endOnEsc && e.key == 'Escape') this.end();
  }

  onEventDown(e) {
    // only work on "main" buttons
    if (e.button !== undefined && e.button !== 0) return;
    e.stopPropagation(); // while mouse/touch is down...watch dragging

    this.list.addEventListener(this.EVENTS.DRAG, this.onEventDrag, true);
    let item = this.itemInEvent(e);
    if (item) this.isClickEvent = setTimeout(() => {
      let ts = new Date().getTime(); // no longer a mouse click

      delete this.isClickEvent;
      if (this._scrolling && ts - this._scrolling <= 50) return;
      delete this._scrolling;
      this._dragging = true;
      this._startItem = item;

      this._select(item);
    }, 200);
  }

  onEventUp(e) {
    this.stopPropagation(e);
    this._dragging = false;
    this.autoScroll(false);
    clearTimeout(this.isClickEvent);
    let ts = new Date().getTime();

    if (this.isClickEvent && (!this._scrolling || ts - this._scrolling > 50)) {
      delete this.isClickEvent;
      let item = this.itemInEvent(e);
      this.select(item, e.shiftKey ? this._startItem : null);
      if (!e.shiftKey) this._startItem = item;
    } else {
      delete this._startItem;
      delete this._lastTouchItem;
    }

    delete this._scrolling;
    this.list.removeEventListener(this.EVENTS.DRAG, this.onEventDrag, true);
  }

  onEventDrag(e) {
    if (this._dragging) this.stopPropagation(e);
    if (this.isClickEvent || this._scrolling && !this._autoScroll) return; // touch devices

    if (e.changedTouches) {
      let {
        clientX,
        clientY
      } = e.changedTouches[0];

      if (this.opts.autoScrollThreshold !== false) {
        let listRect = this.list.getBoundingClientRect();
        let top = listRect.y + this.opts.autoScrollThreshold;
        let bottom = listRect.y + listRect.height - this.opts.autoScrollThreshold;
        let acceleration = (this.opts.autoScrollAcceleration || 1) / 10; // scroll up

        if (clientY < top) this.autoScroll(-1 - Math.round(Math.pow(top - clientY, acceleration))); // scroll down
        else if (clientY > bottom) this.autoScroll(1 + Math.round(Math.pow(clientY - bottom, acceleration))); // not within threshold, stop scrolling
          else this.autoScroll(false);
      }

      let item = this.list.getRootNode().elementFromPoint(clientX, clientY);

      if (item && item.tagName == this.itemTagName && item != this._lastTouchItem) {
        this._lastTouchItem = item;
        this.select(item, this._startItem);
      } // mouse event

    } else {
      // hmm....why relatedTarget? it doesn't work right
      // let item = e.relatedTarget && e.relatedTarget.tagName == this.itemTagName ? e.relatedTarget : e
      let item = e;
      this.select(item, this._startItem);
    }
  }

  itemInEvent(e) {
    let path = e.composedPath();
    return path.find(_el => _el.tagName == this.itemTagName);
  }

  autoScroll(speed = 2) {
    if (speed == false || this._autoScrollSpeed != speed) {
      clearInterval(this._autoScroll);

      if (speed == false) {
        delete this._autoScroll;
        delete this._autoScrollSpeed;
      }
    }

    if (speed !== false && this._autoScrollSpeed != speed) {
      this._autoScrollSpeed = speed;
      this.list.scrollTop = this.list.scrollTop + this._autoScrollSpeed;
      this._autoScroll = setInterval(() => {
        this.list.scrollTop = this.list.scrollTop + this._autoScrollSpeed;
      }, 10);
    }
  }

}

exports.default = Selection;
(0, _componentEmitter.default)(Selection.prototype);
},{"component-emitter":"Wr69"}],"tkaB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

var _source = _interopRequireDefault(require("./data/source"));

var _filters = _interopRequireDefault(require("./data/filters"));

var _sorts = _interopRequireDefault(require("./data/sorts"));

var _layouts = _interopRequireDefault(require("./data/layouts"));

require("./toolbar");

require("./toolbar/selection-bar");

require("./infinite-list");

require("../../elements/spinner-overlay");

require("../../helpers/lit-element/selectors");

var _selection = _interopRequireDefault(require("../selection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('b-list', class extends _litElement.LitElement {
  constructor() {
    super();
    this.onKeydown = this.onKeydown.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.createRow = this.createRow.bind(this);
    this.createEmptyElement = this.createEmptyElement.bind(this);
    this.createDivider = this.createDivider.bind(this);
  }

  get coll() {
    return this.__coll;
  }

  set coll(coll) {
    let didChange = this.__collHasBeenSetOnce && this.__coll != coll;
    this.__coll = coll;
    this.dataSource.coll = coll;
    this.__collHasBeenSetOnce = true; // I think this is ok to do here

    if (didChange) this.shouldFetchData ? this.refresh() : this.reload();
  }

  set key(key) {
    this.__key = key;
  }

  get key() {
    return this.__key || this.getAttribute('key');
  }

  get filters() {
    if (!this.__filters) this.filters = {};
    return this.__filters;
  }

  set filters(filters) {
    if (!this.__filters) {
      this.__filters = new _filters.default();
      this.filters.key = this.key;
      this.filters.list = this;
      this.dataSource.filters = this.filters;
      this.filters.on('change', this.onFilterChange.bind(this));
    }

    this.filters.use(filters);
  }

  get sorts() {
    return this.__sorts;
  }

  set sorts(sorts) {
    if (!this.__sorts) {
      this.__sorts = new _sorts.default();
      this.sorts.key = this.key;
      this.sorts.list = this;
      this.dataSource.sorts = this.sorts;
      this.sorts.on('change', this.onSortChange.bind(this));
    }

    this.sorts.use(sorts);
  }

  get layout() {
    return this.layouts && this.layouts.active;
  }

  set layout(val) {
    if (this.layouts) this.layouts.active = val;
  }

  get layouts() {
    if (!this.__layouts && this.listOptions && this.listOptions.layouts) {
      this.__layouts = new _layouts.default(this.listOptions.layouts);
      this.layouts.key = this.key;
      this.layouts.list = this;
      this.setAttribute('layout', this.layout);
      this.layouts.on('change', layout => {
        this.setAttribute('layout', this.layout);
        this.update();
        this.reload();
      });
    }

    return this.__layouts;
  }

  get dataSource() {
    if (!this.__dataSource) {
      this.__dataSource = new _source.default(this.listOptions);

      this.__dataSource.on('change:count', count => {
        this.toolbar.count = count;
      });
    }

    return this.__dataSource;
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: grid;
            grid-template-rows: auto auto 1fr auto;
            overflow: hidden;
            flex: 1;
            position: relative;
            z-index: 10;
        }

        slot[name="header"],
        slot[name="footer"] {
            display: block;
            overflow-x: auto;
        }

        slot[name="header"]::-webkit-scrollbar,
        slot[name="footer"]::-webkit-scrollbar {
            display: none;
            width: 0 !important;
            height: 0 !important;
        }

        b-spinner-overlay {
            --spinnerSize: 6em;
        }

        b-list-toolbar {
            box-shadow: var(--list-toolbar-shadow, rgba(0,0,0,.2) 0 0 6px);
            padding: .25em .5em;
            z-index: 10;
        }

        b-list-toolbar b-btn {
            color: var(--toolbarTextColor);
        }

        b-infinite-list {
            display: block;
            flex: 1;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
        }

        b-infinite-list[selection-on] {
            user-select: none;
        }

        b-infinite-list > [isselected] {
            position: relative;
            z-index: 0;
        }

        b-infinite-list > [isselected]:before {
            position: absolute;
            content: '';
            background: var(--theme, #2196F3);
            opacity: .1;
            /* border: solid 1.4em #E3F2FD;
            border-left-width: 2em; */
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            z-index: -1;
        }

        contract-draft-row { /* FIXME: remove? */
            padding: 2em;
        }

        contract-draft-row:not(:last-child) {
            border-bottom: solid 1px rgba(0,0,0,.1);
        }

        /* .queuing-overlay {
            display: none;
            background: rgba(255,255,255,.8);
            color: #888;
            z-index: 1000;
        }

        :host([queuing]) .queuing-overlay {
            display: flex;
        } */
    `;
  }

  get spinner() {
    return this.__spinner = this.__spinner || this.querySelector('[slot="spinner"]') || this.shadowRoot.querySelector('b-spinner-overlay');
  }

  render() {
    return (0, _litElement.html)`

        <style>${this.customStyles || ''}</style>
        
        <slot name="spinner">
            <b-spinner-overlay></b-spinner-overlay>
        </slot>
        
        <b-list-toolbar .filters=${this.filters} .sorts=${this.sorts} .layouts=${this.layouts}
            @filter-term-changed=${this.onFilterTermChange}>
            <slot name="toolbar:before" slot="before"></slot>
            <slot name="toolbar:after" slot="after"></slot>
            <slot name="toolbar:refresh" slot="refresh-btn">
                <b-btn text pill icon="arrows-ccw" @click=${this.refresh}></b-btn>
            </slot>
            <!-- <b-label slot="after" class="queuing-label">Queuing filters, release to apply</b-label> -->
            <b-list-selection-bar>
                <slot name="actions:left" slot="left"></slot>
                <slot name="actions:right" slot="right"></slot>
            </b-list-selection-bar>
        </b-list-toolbar>

        <slot name="header"></slot>
        <b-infinite-list
            .empty="${this.createEmptyElement}"
            .row="${this.createRow}"
            .divider=${this.createDivider}
            .dataSource=${this.dataSource}
            fetch-on-load=${this.listOptions && this.listOptions.fetchOnLoad}
            layout="${this.layout}"
        ></b-infinite-list>
        <slot name="footer"></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.onKeydown, true);
    window.addEventListener('keyup', this.onKeyup, true);
    let host = this.getRootNode().host;

    if (host) {
      this.host = host;
      host.list = host.list || this;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.onKeydown, true);
    window.removeEventListener('keyup', this.onKeyup, true);
    if (this.host && this.host.list == this) delete this.host;
  }

  onKeydown(e) {
    if (e.target !== document.body) return;
    if (!e.metaKey && !e.ctrlKey) return;
    this.queuing = true;
  }

  onKeyup(e) {
    if (this.queuing && !this.filters.queuedChanges) this.queuing = false;
  }

  get queuing() {
    return this.filters && this.filters.queuing;
  }

  set queuing(doQueue) {
    if (!this.filters) return;
    this.filters.queuing = doQueue;
    doQueue ? this.setAttribute('queuing', '') : this.removeAttribute('queuing');
  }

  get rowElement() {
    return this.getAttribute('row') || '';
  }

  get emptyElement() {
    return this.getAttribute('empty') || 'b-empty-state';
  }

  get toolbar() {
    return this.shadowRoot.querySelector('b-list-toolbar');
  }

  get list() {
    return this.shadowRoot.querySelector('b-infinite-list');
  }

  createRow(model) {
    let row = customElements.get(this.rowElement);

    if (row) {
      row = new row();
      row.model = model;
      row.list = this;
      return row;
    }
  }

  createEmptyElement() {
    this.emptyView = this.emptyView || document.createElement(this.emptyElement);
    this.emptyView.list = this;
    this.emptyView.dataSource = this.dataSource; // this.emptyView.innerHTML = '<slot name="empty"></slot>'

    let term = this.dataSource.filters && this.dataSource.filters.term;
    this.emptyView.value = term ? `No results for “${term}”` : this.getAttribute('placeholder') || 'No results';
    this.emptyView.requestUpdate();
    return this.emptyView;
  }

  createDivider(prevModel, model) {
    let divider = this.getAttribute('divider');
    divider = divider && customElements.get(divider);

    if (divider && divider.shouldDisplay && divider.shouldDisplay(prevModel, model, this)) {
      divider = new divider(prevModel, model, this);
      divider.list = this;
      divider.model = model;
      divider.prevModel = prevModel;
      return divider;
    }

    return null;
  }

  async firstUpdated() {
    // defer to end of callstack to let infinite list view render and begin fetching
    setTimeout(async () => {
      this.spinner.show = true;

      try {
        this.toolbar.count = await this.dataSource.length();
      } catch (err) {}

      this.spinner.show = false;
    });
    this.header = this.$$('[name="header"]').assignedNodes()[0];
    this.footer = this.$$('[name="footer"]').assignedNodes()[0];
    if (this.header || this.footer) this.list.addEventListener('scroll', e => {
      if (this.header) this.header.scrollLeft = e.currentTarget.scrollLeft;
      if (this.footer) this.footer.scrollLeft = e.currentTarget.scrollLeft;
      if (e.currentTarget.scrollLeft == 0) this.removeAttribute('scrolled-x');else this.setAttribute('scrolled-x', '');
    }); // TODO: unbind on disconnect?

    this.selection = new _selection.default(this.list, this.rowElement, Object.assign({
      toolbar: this.shadowRoot.querySelector('b-list-selection-bar')
    }, this.selectionOptions || {}));
    this.selection.on('begin', () => {
      this.setAttribute('selection-on', '');
    });
    this.selection.on('end', () => {
      this.removeAttribute('selection-on');
    });
    this.addEventListener('selection:begin', e => {
      e.stopPropagation();
      this.selection.begin(e);
    });
  }

  async refresh() {
    this.spinner.show = true;

    try {
      this.selection.end();
      this.dataSource.reset();
      this.list.reset();
      this.toolbar.count = await this.dataSource.length();
    } catch (err) {}

    this.spinner.show = false;
  }

  async reload() {
    this.selection.end();
    this.dataSource.refilter();
    this.list.reset(this.shouldFetchData);
    this.toolbar.count = await this.dataSource.length();
  }

  get shouldFetchData() {
    return this.dataSource.hasFetched || this.listOptions && this.listOptions.fetchOnLoad;
  }

  async onFilterTermChange(changes) {
    // TODO: probably need an opt in feature
    if (this.listOptions && this.listOptions.fetch == 'more') {
      this.dataSource.reset();
    }

    this.dataSource.applyFilters();
    this.list.reset(this.shouldFetchData);
    this.toolbar.count = await this.dataSource.length();
  }

  async onFilterChange(changes) {
    if (this.filters.needsDatabaseFetch(changes)) {
      this.spinner.show = true;
      this.dataSource.reset();
    }

    this.dataSource.applyFilters();
    this.list.reset(this.shouldFetchData);
    this.toolbar.count = await this.dataSource.length();
    this.spinner.show = false;
  }

  async onSortChange() {
    if (this.sorts.sortOnDB === true) {
      this.spinner.show = true;
      this.dataSource.reset();
    } else {
      this.dataSource.sort();
    }

    this.list.reset(this.shouldFetchData);
    this.toolbar.count = await this.dataSource.length();
    this.spinner.show = false;
  }

});

var _default = customElements.get('b-list');

exports.default = _default;
},{"lit-element":"bhxD","./data/source":"zXhY","./data/filters":"HGW8","./data/sorts":"sAKI","./data/layouts":"ZTm8","./toolbar":"iwaU","./toolbar/selection-bar":"xA0J","./infinite-list":"zwrR","../../elements/spinner-overlay":"eyVY","../../helpers/lit-element/selectors":"yvN8","../selection":"aR3g"}],"Qy1v":[function(require,module,exports) {
var define;
!function(r,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):r.dayjs_plugin_relativeTime=t()}(this,function(){"use strict";return function(r,t,e){r=r||{};var n=t.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};e.en.relativeTime=o;var d=function(t,n,d,i){for(var u,a,s,f=d.$locale().relativeTime||o,l=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],h=l.length,m=0;m<h;m+=1){var c=l[m];c.d&&(u=i?e(t).diff(d,c.d,!0):d.diff(t,c.d,!0));var y=(r.rounding||Math.round)(Math.abs(u));if(s=u>0,y<=c.r||!c.r){y<=1&&m>0&&(c=l[m-1]);var p=f[c.l];a="string"==typeof p?p.replace("%d",y):p(y,n,c.l,s);break}}return n?a:(s?f.future:f.past).replace("%s",a)};n.to=function(r,t){return d(r,t,this,!0)},n.from=function(r,t){return d(r,t,this)};var i=function(r){return r.$u?e.utc():e()};n.toNow=function(r){return this.to(i(this),r)},n.fromNow=function(r){return this.from(i(this),r)}}});

},{}],"Agap":[function(require,module,exports) {
var define;
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.dayjs_plugin_localizedFormat=t()}(this,function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(t,n,o){var r=n.prototype,M=r.format;o.en.formats=e,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var n=this.$locale().formats,o=function(t,n){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(t,o,r){var M=r&&r.toUpperCase();return o||n[r]||e[r]||n[M].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(e,t,n){return t||n.slice(1)})})}(t,void 0===n?{}:n);return M.call(this,o)}}});

},{}],"B5kD":[function(require,module,exports) {
var define;
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.dayjs_plugin_calendar=t()}(this,function(){"use strict";return function(e,t,a){var n="h:mm A",d={lastDay:"[Yesterday at] "+n,sameDay:"[Today at] "+n,nextDay:"[Tomorrow at] "+n,nextWeek:"dddd [at] "+n,lastWeek:"[Last] dddd [at] "+n,sameElse:"MM/DD/YYYY"};t.prototype.calendar=function(e,t){var n=t||this.$locale().calendar||d,s=a(e||void 0).startOf("d"),o=this.diff(s,"d",!0),i=o<-6?"sameElse":o<-1?"lastWeek":o<0?"lastDay":o<1?"sameDay":o<2?"nextDay":o<7?"nextWeek":"sameElse",f=n[i]||d[i];return"function"==typeof f?f.call(this,a()):this.format(f)}}});

},{}],"yPwf":[function(require,module,exports) {
/*
    Adds Day.js plugins that matches Blackstone's use of moment.js

    - Also changes 'Invalid Date' in .format() to empty string
    - adds dayjs.months()
    - adds dayjs.weekdays()
    - supports hash of changes in `.set()`
*/
var dayjs = require('dayjs');

var relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

var localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(localizedFormat);

var calendar = require('dayjs/plugin/calendar');

dayjs.extend(calendar);

dayjs.prototype.calendarDate = function (formats = {}) {
  formats = Object.assign({
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'l'
  }, formats);
  return this.calendar(null, formats);
};

const DayJsFormat = dayjs.prototype.format;

dayjs.prototype.format = function (...args) {
  // https://github.com/iamkun/dayjs/blob/dev/src/index.js#L252
  if (!this.isValid()) return '';
  return DayJsFormat.call(this, ...args);
}; // let `.set` handle hash of changes


const DayJsSet = dayjs.prototype.set;

dayjs.prototype.set = function (...args) {
  if (args.length == 1 && typeof args[0] == 'object') {
    let date = this;

    for (let unit in args[0]) {
      date = DayJsSet.call(date, unit, args[0][unit]);
    }

    return date;
  }

  return DayJsSet.call(this, ...args);
};

const MONTH_NAMES = {};

dayjs.months = function (format = "MMMM") {
  // cached
  if (MONTH_NAMES[format]) return MONTH_NAMES[format];
  let d = dayjs();
  let months = [];
  let i = 0;

  while (i < 12) {
    months.push(d.set('month', i++).format(format));
  }

  MONTH_NAMES[format] = months;
  return months;
};

dayjs.monthsShort = function () {
  return dayjs.months('MMM');
};

const WEEKDAY_NAMES = {};

dayjs.weekdays = function (format = "dddd") {
  // cached
  if (WEEKDAY_NAMES[format]) return WEEKDAY_NAMES[format];
  let d = dayjs();
  let days = [];
  let i = 0;

  while (i < 7) {
    days.push(d.set('day', i++).format(format));
  }

  WEEKDAY_NAMES[format] = days;
  return days;
};

dayjs.weekdaysShort = function () {
  return dayjs.weekdays('ddd');
};

dayjs.weekdaysMin = function () {
  return dayjs.weekdays('dd');
};

module.exports = dayjs;
},{"dayjs":"dZYI","dayjs/plugin/relativeTime":"Qy1v","dayjs/plugin/localizedFormat":"Agap","dayjs/plugin/calendar":"B5kD"}],"tqEd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

customElements.define('b-cal-day', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: grid;
            grid-template-rows: auto 1fr;
            overflow: hidden;
            padding: .25em;
        }

        header {
            text-align: right;
        }

        main {
            overflow: auto;
        }

        .date {
            height: 1.8em;
            min-width: 1.8em;
            box-sizing: border-box;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-radius: 1em;
        }

        :host([overflow]) .date {
            color: var(--theme-color-accent, #999);
            padding: 0 .35em;
        }

        :host([today]) .date {
            color: #fff;
            background: var(--theme, var(--blue, #2196F3));
        }
    `;
  }

  get isOverflow() {
    return this.caldate.month() != this.date.month();
  }

  get isWeekend() {
    return [0, 6].includes(this.date.day());
  }

  get isToday() {
    return this.date.isSame(new Date(), 'day');
  }

  render() {
    return (0, _litElement.html)`

        <header>
            <div class="date">
                ${this.date.date() == 1 ? this.date.format('MMM') : ''}
                ${this.date.get('date')}
            </div>
        </header>
        <main>
            <slot></slot>
        </main>
    `;
  }

  set date(date) {
    this.__date = date;
    this.toggleAttribute('weekend', this.isWeekend);
    this.toggleAttribute('overflow', this.isOverflow);
    this.toggleAttribute('today', this.isToday);
    this.requestUpdate();
  }

  get date() {
    return this.__date;
  } // firstUpdated(){
  //     let slot = this.shadowRoot.querySelector('slot');
  //     this.main = this.shadowRoot.querySelector('main');
  //     slot.addEventListener('slotchange', this.onSlotChange.bind(this));
  // }
  // onSlotChange(e){
  //     let nodes = e.target.assignedNodes();
  //     if( nodes[0] && nodes[0].nodeName == '#text' )
  //         return
  //     let doesOverflow = this.main.offsetHeight < this.main.scrollHeight
  //     console.log(doesOverflow);
  // }


});

var _default = customElements.get('b-cal-day');

exports.default = _default;
},{"lit-element":"bhxD"}],"YTQF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litElement = require("lit-element");

require("../../elements/btn-group");

require("../../helpers/lit-element/events");

require("../../helpers/day-js");

var _dayjs = _interopRequireDefault(require("dayjs"));

require("./day");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('b-cal', class extends _litElement.LitElement {
  constructor() {
    super();
    this.weekdays = _dayjs.default.weekdaysMin();
    this.days = new Array(7 * 6).fill('');
    this.date = this._date || this.getAttribute('date') || (0, _dayjs.default)();
  }

  static get styles() {
    return (0, _litElement.css)`
        :host {
            /* height: 100%; */
            display: grid;
            position:relative;
            display: grid;
            grid-template-rows: auto 1fr;
            --grid-cols: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        }

        :host([collapse-weekend]) {
            --grid-cols: 2.5em 1fr 1fr 1fr 1fr 1fr 2.5em;
        }

        header {
            position: sticky;
            top: 0;
            z-index: 10;
            background: var(--b-cal-header-bgd, var(--theme-bgd, #fff));
            border-bottom: solid 1px rgba(var(--theme-rgb, 0,0,0), .1);
            display: grid;
            grid-template-columns: max-content max-content;
            justify-content: space-between;
            align-items: center;
            padding: .75em 1em 0;
        }

        header .title,
        header .nav {
            display: flex;
            align-items: center;
        }

        h1, h2, h3 {
            margin: 0;
        }

        .weekdays {
            margin: .75em -1em 0;
            grid-column: 1/-1;
            display: grid;
            grid-template-columns: var(--grid-cols);
            text-align: right;
        }

        .weekdays > div {
            padding-right: .75em;
            padding-bottom: .5em;
        }

        main {
            /* height: 100%; */
            display: grid;
            position:relative;
            display: grid;
            grid-template-columns: var(--grid-cols);
            grid-template-rows: repeat(6, 1fr);
            gap: 1px;
            /* min-height: 0; */
        }

        b-cal-day {
            border-right: solid 1px rgba(var(--theme-rgb, 0,0,0), .1);
            border-bottom: solid 1px rgba(var(--theme-rgb, 0,0,0), .1);
            flex-shrink: 0;
            min-width: 0;
        }

        b-cal-day[weekend] {
            background: var(--theme-bgd-accent, #f5f5f5);
        }
    `;
  }

  get date() {
    return this._date;
  }

  set date(val) {
    let oldDate = this._date && this._date.clone();

    if (val instanceof _dayjs.default) {
      this._date = val;
      this._dateSelected = this._date.clone();
    } else if (typeof val == 'string') {
      this._date = (0, _dayjs.default)(val);
      this._dateSelected = this._date.clone();
    } else if (val && typeof val == 'object') {
      this._dateSelected.set(val);

      this._date.set(val);
    }

    this._date.set({
      date: 1
    });

    if (oldDate && this._date.isSame(oldDate)) return;

    this._loadDays();

    this.emitEvent('date-changed', this.range);
  }

  firstUpdated() {
    this.emitEvent('date-changed', this.range);
  }

  _loadDays() {
    let start = this._date.day();

    let numDays = this._date.daysInMonth();

    this.days = this.days.map((_, i) => {
      return this._date.clone().add(i - start, 'day');
    });
  }

  get range() {
    return [this.days[0], this.days[this.days.length - 1]];
  }

  nextMonth() {
    this.date = this._date.clone().add(1, 'month');
    this.update();
  }

  prevMonth() {
    this.date = this._date.clone().add(-1, 'month');
    this.update();
  }

  goToToday() {
    this.date = (0, _dayjs.default)();
    this.update();
  }

  render() {
    return (0, _litElement.html)`
        <header>
            <div class="title">
                <h1>${this.date.format('MMMM YYYY')}</h1>
                <slot name="after-title"></slot>
            </div>
            <div class="nav">
                <slot name="before-nav"></slot>
                <div>
                    <b-btn text icon="left-open-big" @click=${this.prevMonth}></b-btn>
                    <b-btn text @click=${this.goToToday}>Today</b-btn>
                    <b-btn text icon="right-open-big" @click=${this.nextMonth}></b-btn>
                </div>
                <slot name="after-nav"></slot>
            </div>

            <div class="weekdays">${this.weekdays.map((str, i) => (0, _litElement.html)`
                ${i == 0 || i == 6 ? (0, _litElement.html)`
                    <div @click=${this.toggleCollapseWeekend}>${str}</div>
                ` : (0, _litElement.html)`
                    <div>${str}</div>
                `}
            `)}</div>

        </header>
        <main>
        ${this.days.map(date => (0, _litElement.html)`
            <b-cal-day .caldate=${this._date} .date=${date}>
                <slot name="${date.format('YYYY-MM-DD')}"></slot>
            </b-cal-day>
        `)}
        </main>
    `;
  }

  toggleCollapseWeekend() {
    this.toggleAttribute('collapse-weekend', !this.hasAttribute('collapse-weekend'));
  }

});

var _default = customElements.get('b-cal');

exports.default = _default;
},{"lit-element":"bhxD","../../elements/btn-group":"pV6C","../../helpers/lit-element/events":"euwv","../../helpers/day-js":"yPwf","dayjs":"dZYI","./day":"tqEd"}],"TMO9":[function(require,module,exports) {
"use strict";

var _litElement = require("lit-element");

customElements.define('b-list-of-colors', class extends _litElement.LitElement {
  static get styles() {
    return (0, _litElement.css)`
        :host {
            display: grid;
            --grids: 1fr 1fr 1fr 1fr;
            grid-template-columns: var(--grids);
            gap: 1em;
        }

        [group="default"] {
            grid-column: 1/5;
        }

        [group="default"] .colors {
            display: grid;
            grid-template-columns: var(--grids);
            gap: 1em;
        }

        .color {
            border: 1px solid rgba(0,0,0,.12);
            padding: .5em;
            /* display: flex;
            justify-content: space-between;
            align-items: center; */
        }

        [num="900"] + [num] {
            margin-top: .5em;
        }

        @media (max-width: 550px) {
            :host {
                --grids: 1fr 1fr;
            }

            [group="default"] {
                grid-column: 1/3
            }
        }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.colors = [];

    for (let sheet of document.styleSheets) {
      let rules = null;

      try {
        rules = sheet.cssRules;
      } catch (e) {}

      if (rules) for (let rule of rules) {
        if (rule.cssText.match(/:root { --color/)) {
          let matches = rule.cssText.match(/--.[^:)]+: (.[^;]+);/g);
          let colors = {};
          matches.map(v => {
            let [str, name, num, color] = v.match(/--(.[^\d(A\d)]+)(?:-(.+))?: (.[^;]+);/);
            let key = name + (num ? '-' + num : '');

            if (num) {
              colors[name] = colors[name] || {
                name: name,
                colors: []
              };
              colors[name].colors.push({
                key,
                name,
                num,
                color
              });
            } else {
              colors['default'] = colors['default'] || {
                name: 'default',
                colors: []
              };
              colors['default'].colors.push({
                key,
                name,
                num,
                color
              });
            }
          });
          this.colors = Object.values(colors);
        }
      }
    }
  }

  render() {
    return (0, _litElement.html)`
        ${this.colors.map(g => (0, _litElement.html)`
            <div group="${g.name}">
                <h3>${g.name}</h3>
                <div class="colors">
                ${g.colors.map(c => (0, _litElement.html)`
                    <div num=${c.num} key="${c.key}" class="color" style="background-color: var(--${c.key});">
                        <div>${c.key}</div>
                        <!-- <b-sub>${c.num ? c.color : ''}</b-sub> -->
                    </div>
                `)}
                </div>
            </div>
        `)}
    `;
  }

});
},{"lit-element":"bhxD"}],"u6Cc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.fileIconLabels = exports.fileIconColors = void 0;

var _litElement = require("lit-element");

const fileIconColors = {
  pdf: (0, _litElement.css)`:host([ext="pdf"]){ --bgd: #b40808; }`,
  js: (0, _litElement.css)` :host([ext="js"]){ --bgd: #f8dc3d; --color: #333;}`,
  json: (0, _litElement.css)`:host([ext="json"]){ --bgd: #f8dc3d; --color: #333;}`,
  video: (0, _litElement.css)`:host([ext="mp4"]){ --bgd: var(--red);}`,
  html: (0, _litElement.css)`:host([ext="html"]){ --bgd: #e54c21}`,
  xml: (0, _litElement.css)`:host([ext="xml"]){ --bgd: #f26524}`,
  onix: (0, _litElement.css)`:host([ext="onix"]){ --bgd: #626a7f;}`,
  zip: (0, _litElement.css)`:host([ext="zip"]){ --bgd: var(--gray-600);}`,
  jpg: (0, _litElement.css)`:host([ext="jpg"]){ --bgd: var(--blue); }`,
  jpeg: (0, _litElement.css)`:host([ext="jpeg"]){ --bgd: var(--blue); }`,
  png: (0, _litElement.css)`:host([ext="png"]){ --bgd: var(--blue); }`,
  gif: (0, _litElement.css)`:host([ext="gif"]){ --bgd: var(--blue); }`,
  wav: (0, _litElement.css)`:host([ext="wav"]){ --bgd: var(--deep-purple); }`,
  mp3: (0, _litElement.css)`:host([ext="mp3"]){ --bgd: var(--deep-purple); }`,
  flac: (0, _litElement.css)`:host([ext="flac"]){ --bgd: var(--deep-purple); }`,
  m4a: (0, _litElement.css)`:host([ext="m4a"]){ --bgd: var(--deep-purple); }`,
  // Microsoft
  word: (0, _litElement.css)`
        :host([ext="doc"]),
        :host([ext="docx"]) {
            --bgd: #0f52b7;
        }
    `,
  excel: (0, _litElement.css)`
        :host([ext="xls"]),
        :host([ext="xlsx"]),
        :host([ext="xlsm"]) {
            --bgd: #0a8144;
        }
    `,
  // Adobe
  psd: (0, _litElement.css)`
        :host([ext="psd"]) {
            --bgd: #011c24;
            --color: #00c8ff;
            --dog-ear-bgd: var(--color);
            --border-color: var(--color);
        }
    `,
  indd: (0, _litElement.css)`
        :host([ext="indd"]),
        :host([ext="idml"]) {
            --bgd: #2a020b;
            --color: #ff3c95;
            --dog-ear-bgd: var(--color);
            --border-color: var(--color);
        }
    `,
  icml: (0, _litElement.css)`
        :host([ext="icml"]) {
            --bgd: #2a0c2a;
            --color: #eb72eb;
            --dog-ear-bgd: var(--color);
            --border-color: var(--color);
        }
    `,
  ai: (0, _litElement.css)`
        :host([ext="ai"]),
        :host([ext="ait"]) {
            --bgd: #251300;
            --color: #fe7c00;
            --dog-ear-bgd: var(--color);
            --border-color: var(--color);
        }
    `,
  pdf: (0, _litElement.css)`
        :host([ext="pdf"]) {
            --bgd: #2f1208;
            --color: #fff;
            --dog-ear-bgd: #fd3406;
            --border-color: #fd3406;
        }
    `
};
exports.fileIconColors = fileIconColors;
const fileIconLabels = {
  'json': (0, _litElement.html)`<span>{ }</span>`,
  'mp4': (0, _litElement.html)`<b-icon name="videocam"></b-icon>`,
  'mp3': ext => (0, _litElement.html)`<b-icon name="music"></b-icon><sub>${ext}</sub>`,
  'wav': ext => (0, _litElement.html)`<b-icon name="music"></b-icon><sub>${ext}</sub>`,
  'flac': ext => (0, _litElement.html)`<b-icon name="music"></b-icon><sub>${ext}</sub>`,
  'html': ext => (0, _litElement.html)`<b-icon name="code"></b-icon><sub>${ext}</sub>`,
  'xml': ext => (0, _litElement.html)`<b-icon name="code"></b-icon><sub>${ext}</sub>`,
  'onix': ext => (0, _litElement.html)`<b-icon name="code"></b-icon><sub>${ext}</sub>`,
  'dpl': (0, _litElement.html)`<b-icon name="cd"></b-icon>`,
  'iso': (0, _litElement.html)`<b-icon name="cd"></b-icon>`,
  'zip': (0, _litElement.html)`<b-icon name="file-archive"></b-icon>`,
  'epub': ext => (0, _litElement.html)`<b-icon name="book-open"></b-icon><sub>${ext}</sub>`
};
exports.fileIconLabels = fileIconLabels;

function _default(customColors = {}, customLabels = {}) {
  Object.assign(fileIconColors, customColors);
  Object.assign(fileIconLabels, customLabels);
  customElements.define('b-file-icon', class extends _litElement.LitElement {
    static get properties() {
      return {
        ext: {
          type: String,
          reflect: true
        }
      };
    }

    static get styles() {
      return [(0, _litElement.css)`
        :host {
            display: inline-block;
            position:relative;
            --color: var(--b-file-icon-color-default, #fff);
            --bgd: var(--b-file-icon-bgd-default, #aaa);
            --size: var(--b-file-icon-size, 2em);
            --radius: var(--b-file-icon-radius, 0px);
            --border-color: transparent;

            width: calc(.8 * var(--size));
            height: var(--size);
            text-transform: uppercase;
        }

        main {
            padding: 20%;
            padding-top: 30%; /* appears more center */
            box-sizing: border-box;
            position: relative;
            width: 100%;
            height: 100%;
            background: var(--bgd);
            border-radius: var(--radius);
            border-bottom: calc(var(--size) * .02) solid rgba(0, 0, 0, 0.4);
            -webkit-clip-path: polygon(0 0, 66% 0, 100% 26.4%, 100% 100%, 0 100%);
            clip-path: polygon(0 0, 66% 0, 100% 26.4%, 100% 100%, 0 100%);

            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--color);
            box-shadow: 0 0 0 calc(.05 * var(--size)) var(--border-color) inset;
        }

        .dogear {
            position: absolute;
            top: 0;
            right: 0;
            background: var(--dog-ear-bgd, rgba(0,0,0,.4));
            border-radius: 0 0 0 var(--radius);

            height: calc(.8 * var(--size) * .34);
            width: calc(.8 * var(--size) * .34);
            -webkit-clip-path: polygon(0 0, 0% 100%, 100% 100%);
            clip-path: polygon(0 0, 0% 100%, 100% 100%);
        }

        label,
        ::slotted(*) {
            font-size: calc(var(--size) * .25);
            line-height: .5em;
        }

        label > span,
        label > b-icon {
            font-size: 1.4em;
        }

        label sub {
            font-size: .6em;
            vertical-align: baseline;
            line-height: 0em;
        }

        ::slotted(b-icon) {
            /* font-size: 1em; */
        }
    `].concat(Object.values(fileIconColors));
    }

    render() {
      return (0, _litElement.html)`
        <main>
            <div class="dogear"></div>
            <slot name="label">
                <label>${this.label}</label>
            </slot>
        </main>
        <slot></slot>
    `;
    }

    get label() {
      let label = fileIconLabels[this.ext];
      if (label) return typeof label == 'function' ? label(this.ext) : label;
      return this.ext;
    }

  });
}
},{"lit-element":"bhxD"}],"gE6T":[function(require,module,exports) {
"use strict";

require("../elements/icon");

require("../elements/btn");

require("../elements/btn-group");

require("../elements/spinner");

require("../elements/spinner-overlay");

require("../elements/uploader");

require("../elements/paper");

require("../elements/text");

require("../elements/grid");

require("../elements/carousel");

require("../elements/timer");

require("../elements/empty-state");

require("../elements/label");

require("../elements/ribbon");

require("../elements/hr");

require("../elements/sub");

require("../elements/ts");

require("../elements/avatar");

require("../elements/code");

require("../elements/embed");

require("../elements/audio");

require("../presenters/tabs");

require("../presenters/form-control");

require("../presenters/list");

require("../presenters/cal");

require("../helpers/colors-list");

require("../styles/colors.less");

var _fileIcon = _interopRequireDefault(require("../elements/file-icon"));

var _dialog = _interopRequireDefault(require("../presenters/dialog"));

var _menu = _interopRequireDefault(require("../presenters/menu"));

var _notif = _interopRequireDefault(require("../presenters/notif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _fileIcon.default)();
window.Dialog = _dialog.default;
window.Menu = _menu.default;
window.Notif = _notif.default;

function convertComments() {
  var tw = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT, null, null);
  var comment;
  var comments = [];

  while (comment = tw.nextNode()) {
    comments.push(comment);
  }

  comments.forEach(com => {
    let div = document.createElement('div');
    div.classList.add('demo-block');
    let str = com.textContent;
    let strs = str.split("\n");
    let type = strs.shift();
    str = strs.join("\n");
    div.innerHTML = str;
    if (type) div.setAttribute('type', type);
    let script = div.querySelector('script');
    if (script) eval(script.innerText);
    com.replaceWith(div);
  });
}

convertComments(); // popstate

history.pushState = (f => function pushState() {
  var ret = f.apply(this, arguments);
  convertComments();
  return ret;
})(history.pushState);

history.replaceState = (f => function replaceState() {
  var ret = f.apply(this, arguments);
  convertComments();
  return ret;
})(history.replaceState);

window.addEventListener('popstate', function () {
  convertComments();
});
},{"../elements/icon":"ncPe","../elements/btn":"DABr","../elements/btn-group":"pV6C","../elements/spinner":"EnCN","../elements/spinner-overlay":"eyVY","../elements/uploader":"aYTp","../elements/paper":"Yy3A","../elements/text":"yukA","../elements/grid":"BALQ","../elements/carousel":"inC5","../elements/timer":"uEYO","../elements/empty-state":"dUnZ","../elements/label":"DcCw","../elements/ribbon":"jV4C","../elements/hr":"IOAQ","../elements/sub":"VANQ","../elements/ts":"VfwF","../elements/avatar":"DaYz","../elements/code":"v5wz","../elements/embed":"bpDM","../elements/audio":"EIVk","../presenters/tabs":"BsQP","../presenters/form-control":"wbVn","../presenters/list":"tkaB","../presenters/cal":"YTQF","../helpers/colors-list":"TMO9","../styles/colors.less":"r4vn","../elements/file-icon":"u6Cc","../presenters/dialog":"pos3","../presenters/menu":"tCYJ","../presenters/notif":"XAiK"}],"FheM":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"TUK3":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"FheM"}],"A3BY":[function(require,module,exports) {
module.exports = function loadHTMLBundle(bundle) {
  return fetch(bundle).then(function (res) {
    return res.text();
  });
};
},{}],0:[function(require,module,exports) {
var b=require("TUK3");b.register("html",require("A3BY"));b.load([["icons.svg.10aef11a.html","pxeq"]]).then(function(){require("gE6T");});
},{}]},{},[0], null)
//# sourceMappingURL=/bui.js.map