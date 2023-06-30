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
})({"NqYy":[function(require,module,exports) {
var define;
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = function (modules, cache, entry, globalName) {
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
    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }
    function resolve(x) {
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
}({
  "ViJI": [function (require, module, exports) {
    "use strict";

    // @ts-ignore
    try {
      self['workbox:core:6.1.5'] && _();
    } catch (e) {}
  }, {}],
  "uWXV": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.logger = void 0;
    require("../_version.js");
    /*
      Copyright 2019 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const logger = "production" === 'production' ? null : (() => {
      // Don't overwrite this value if it's already set.
      // See https://github.com/GoogleChrome/workbox/pull/2284#issuecomment-560470923
      if (!('__WB_DISABLE_DEV_LOGS' in self)) {
        self.__WB_DISABLE_DEV_LOGS = false;
      }
      let inGroup = false;
      const methodToColorMap = {
        debug: `#7f8c8d`,
        log: `#2ecc71`,
        warn: `#f39c12`,
        error: `#c0392b`,
        groupCollapsed: `#3498db`,
        groupEnd: null
      };
      const print = function (method, args) {
        if (self.__WB_DISABLE_DEV_LOGS) {
          return;
        }
        if (method === 'groupCollapsed') {
          // Safari doesn't print all console.groupCollapsed() arguments:
          // https://bugs.webkit.org/show_bug.cgi?id=182754
          if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            console[method](...args);
            return;
          }
        }
        const styles = [`background: ${methodToColorMap[method]}`, `border-radius: 0.5em`, `color: white`, `font-weight: bold`, `padding: 2px 0.5em`];
        // When in a group, the workbox prefix is not displayed.
        const logPrefix = inGroup ? [] : ['%cworkbox', styles.join(';')];
        console[method](...logPrefix, ...args);
        if (method === 'groupCollapsed') {
          inGroup = true;
        }
        if (method === 'groupEnd') {
          inGroup = false;
        }
      };
      const api = {};
      const loggerMethods = Object.keys(methodToColorMap);
      for (const key of loggerMethods) {
        const method = key;
        api[method] = (...args) => {
          print(method, args);
        };
      }
      return api;
    })();
    exports.logger = logger;
  }, {
    "../_version.js": "ViJI"
  }],
  "nxom": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.messages = void 0;
    require("../../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const messages = {
      'invalid-value': ({
        paramName,
        validValueDescription,
        value
      }) => {
        if (!paramName || !validValueDescription) {
          throw new Error(`Unexpected input to 'invalid-value' error.`);
        }
        return `The '${paramName}' parameter was given a value with an ` + `unexpected value. ${validValueDescription} Received a value of ` + `${JSON.stringify(value)}.`;
      },
      'not-an-array': ({
        moduleName,
        className,
        funcName,
        paramName
      }) => {
        if (!moduleName || !className || !funcName || !paramName) {
          throw new Error(`Unexpected input to 'not-an-array' error.`);
        }
        return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className}.${funcName}()' must be an array.`;
      },
      'incorrect-type': ({
        expectedType,
        paramName,
        moduleName,
        className,
        funcName
      }) => {
        if (!expectedType || !paramName || !moduleName || !funcName) {
          throw new Error(`Unexpected input to 'incorrect-type' error.`);
        }
        return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}` + `${funcName}()' must be of type ${expectedType}.`;
      },
      'incorrect-class': ({
        expectedClass,
        paramName,
        moduleName,
        className,
        funcName,
        isReturnValueProblem
      }) => {
        if (!expectedClass || !moduleName || !funcName) {
          throw new Error(`Unexpected input to 'incorrect-class' error.`);
        }
        if (isReturnValueProblem) {
          return `The return value from ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
        }
        return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
      },
      'missing-a-method': ({
        expectedMethod,
        paramName,
        moduleName,
        className,
        funcName
      }) => {
        if (!expectedMethod || !paramName || !moduleName || !className || !funcName) {
          throw new Error(`Unexpected input to 'missing-a-method' error.`);
        }
        return `${moduleName}.${className}.${funcName}() expected the ` + `'${paramName}' parameter to expose a '${expectedMethod}' method.`;
      },
      'add-to-cache-list-unexpected-type': ({
        entry
      }) => {
        return `An unexpected entry was passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` + `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` + `strings with one or more characters, objects with a url property or ` + `Request objects.`;
      },
      'add-to-cache-list-conflicting-entries': ({
        firstEntry,
        secondEntry
      }) => {
        if (!firstEntry || !secondEntry) {
          throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
        }
        return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${firstEntry._entryId} but different revision details. Workbox is ` + `unable to cache and version the asset correctly. Please remove one ` + `of the entries.`;
      },
      'plugin-error-request-will-fetch': ({
        thrownError
      }) => {
        if (!thrownError) {
          throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
        }
        return `An error was thrown by a plugins 'requestWillFetch()' method. ` + `The thrown error message was: '${thrownError.message}'.`;
      },
      'invalid-cache-name': ({
        cacheNameId,
        value
      }) => {
        if (!cacheNameId) {
          throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
        }
        return `You must provide a name containing at least one character for ` + `setCacheDetails({${cacheNameId}: '...'}). Received a value of ` + `'${JSON.stringify(value)}'`;
      },
      'unregister-route-but-not-found-with-method': ({
        method
      }) => {
        if (!method) {
          throw new Error(`Unexpected input to ` + `'unregister-route-but-not-found-with-method' error.`);
        }
        return `The route you're trying to unregister was not  previously ` + `registered for the method type '${method}'.`;
      },
      'unregister-route-route-not-registered': () => {
        return `The route you're trying to unregister was not previously ` + `registered.`;
      },
      'queue-replay-failed': ({
        name
      }) => {
        return `Replaying the background sync queue '${name}' failed.`;
      },
      'duplicate-queue-name': ({
        name
      }) => {
        return `The Queue name '${name}' is already being used. ` + `All instances of backgroundSync.Queue must be given unique names.`;
      },
      'expired-test-without-max-age': ({
        methodName,
        paramName
      }) => {
        return `The '${methodName}()' method can only be used when the ` + `'${paramName}' is used in the constructor.`;
      },
      'unsupported-route-type': ({
        moduleName,
        className,
        funcName,
        paramName
      }) => {
        return `The supplied '${paramName}' parameter was an unsupported type. ` + `Please check the docs for ${moduleName}.${className}.${funcName} for ` + `valid input types.`;
      },
      'not-array-of-class': ({
        value,
        expectedClass,
        moduleName,
        className,
        funcName,
        paramName
      }) => {
        return `The supplied '${paramName}' parameter must be an array of ` + `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` + `Please check the call to ${moduleName}.${className}.${funcName}() ` + `to fix the issue.`;
      },
      'max-entries-or-age-required': ({
        moduleName,
        className,
        funcName
      }) => {
        return `You must define either config.maxEntries or config.maxAgeSeconds` + `in ${moduleName}.${className}.${funcName}`;
      },
      'statuses-or-headers-required': ({
        moduleName,
        className,
        funcName
      }) => {
        return `You must define either config.statuses or config.headers` + `in ${moduleName}.${className}.${funcName}`;
      },
      'invalid-string': ({
        moduleName,
        funcName,
        paramName
      }) => {
        if (!paramName || !moduleName || !funcName) {
          throw new Error(`Unexpected input to 'invalid-string' error.`);
        }
        return `When using strings, the '${paramName}' parameter must start with ` + `'http' (for cross-origin matches) or '/' (for same-origin matches). ` + `Please see the docs for ${moduleName}.${funcName}() for ` + `more info.`;
      },
      'channel-name-required': () => {
        return `You must provide a channelName to construct a ` + `BroadcastCacheUpdate instance.`;
      },
      'invalid-responses-are-same-args': () => {
        return `The arguments passed into responsesAreSame() appear to be ` + `invalid. Please ensure valid Responses are used.`;
      },
      'expire-custom-caches-only': () => {
        return `You must provide a 'cacheName' property when using the ` + `expiration plugin with a runtime caching strategy.`;
      },
      'unit-must-be-bytes': ({
        normalizedRangeHeader
      }) => {
        if (!normalizedRangeHeader) {
          throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
        }
        return `The 'unit' portion of the Range header must be set to 'bytes'. ` + `The Range header provided was "${normalizedRangeHeader}"`;
      },
      'single-range-only': ({
        normalizedRangeHeader
      }) => {
        if (!normalizedRangeHeader) {
          throw new Error(`Unexpected input to 'single-range-only' error.`);
        }
        return `Multiple ranges are not supported. Please use a  single start ` + `value, and optional end value. The Range header provided was ` + `"${normalizedRangeHeader}"`;
      },
      'invalid-range-values': ({
        normalizedRangeHeader
      }) => {
        if (!normalizedRangeHeader) {
          throw new Error(`Unexpected input to 'invalid-range-values' error.`);
        }
        return `The Range header is missing both start and end values. At least ` + `one of those values is needed. The Range header provided was ` + `"${normalizedRangeHeader}"`;
      },
      'no-range-header': () => {
        return `No Range header was found in the Request provided.`;
      },
      'range-not-satisfiable': ({
        size,
        start,
        end
      }) => {
        return `The start (${start}) and end (${end}) values in the Range are ` + `not satisfiable by the cached response, which is ${size} bytes.`;
      },
      'attempt-to-cache-non-get-request': ({
        url,
        method
      }) => {
        return `Unable to cache '${url}' because it is a '${method}' request and ` + `only 'GET' requests can be cached.`;
      },
      'cache-put-with-no-response': ({
        url
      }) => {
        return `There was an attempt to cache '${url}' but the response was not ` + `defined.`;
      },
      'no-response': ({
        url,
        error
      }) => {
        let message = `The strategy could not generate a response for '${url}'.`;
        if (error) {
          message += ` The underlying error is ${error}.`;
        }
        return message;
      },
      'bad-precaching-response': ({
        url,
        status
      }) => {
        return `The precaching request for '${url}' failed` + (status ? ` with an HTTP status of ${status}.` : `.`);
      },
      'non-precached-url': ({
        url
      }) => {
        return `createHandlerBoundToURL('${url}') was called, but that URL is ` + `not precached. Please pass in a URL that is precached instead.`;
      },
      'add-to-cache-list-conflicting-integrities': ({
        url
      }) => {
        return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${url} with different integrity values. Please remove one of them.`;
      },
      'missing-precache-entry': ({
        cacheName,
        url
      }) => {
        return `Unable to find a precached response in ${cacheName} for ${url}.`;
      },
      'cross-origin-copy-response': ({
        origin
      }) => {
        return `workbox-core.copyResponse() can only be used with same-origin ` + `responses. It was passed a response with origin ${origin}.`;
      }
    };
    exports.messages = messages;
  }, {
    "../../_version.js": "ViJI"
  }],
  "SKdM": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.messageGenerator = void 0;
    var _messages = require("./messages.js");
    require("../../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const fallback = (code, ...args) => {
      let msg = code;
      if (args.length > 0) {
        msg += ` :: ${JSON.stringify(args)}`;
      }
      return msg;
    };
    const generatorFunction = (code, details = {}) => {
      const message = _messages.messages[code];
      if (!message) {
        throw new Error(`Unable to find message for code '${code}'.`);
      }
      return message(details);
    };
    const messageGenerator = "production" === 'production' ? fallback : generatorFunction;
    exports.messageGenerator = messageGenerator;
  }, {
    "./messages.js": "nxom",
    "../../_version.js": "ViJI"
  }],
  "hBTK": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WorkboxError = void 0;
    var _messageGenerator = require("../models/messages/messageGenerator.js");
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * Workbox errors should be thrown with this class.
     * This allows use to ensure the type easily in tests,
     * helps developers identify errors from workbox
     * easily and allows use to optimise error
     * messages correctly.
     *
     * @private
     */
    class WorkboxError extends Error {
      /**
       *
       * @param {string} errorCode The error code that
       * identifies this particular error.
       * @param {Object=} details Any relevant arguments
       * that will help developers identify issues should
       * be added as a key on the context object.
       */
      constructor(errorCode, details) {
        const message = (0, _messageGenerator.messageGenerator)(errorCode, details);
        super(message);
        this.name = errorCode;
        this.details = details;
      }
    }
    exports.WorkboxError = WorkboxError;
  }, {
    "../models/messages/messageGenerator.js": "SKdM",
    "../_version.js": "ViJI"
  }],
  "mFVs": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.assert = void 0;
    var _WorkboxError = require("../_private/WorkboxError.js");
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /*
     * This method throws if the supplied value is not an array.
     * The destructed values are required to produce a meaningful error for users.
     * The destructed and restructured object is so it's clear what is
     * needed.
     */
    const isArray = (value, details) => {
      if (!Array.isArray(value)) {
        throw new _WorkboxError.WorkboxError('not-an-array', details);
      }
    };
    const hasMethod = (object, expectedMethod, details) => {
      const type = typeof object[expectedMethod];
      if (type !== 'function') {
        details['expectedMethod'] = expectedMethod;
        throw new _WorkboxError.WorkboxError('missing-a-method', details);
      }
    };
    const isType = (object, expectedType, details) => {
      if (typeof object !== expectedType) {
        details['expectedType'] = expectedType;
        throw new _WorkboxError.WorkboxError('incorrect-type', details);
      }
    };
    const isInstance = (object, expectedClass, details) => {
      if (!(object instanceof expectedClass)) {
        details['expectedClass'] = expectedClass;
        throw new _WorkboxError.WorkboxError('incorrect-class', details);
      }
    };
    const isOneOf = (value, validValues, details) => {
      if (!validValues.includes(value)) {
        details['validValueDescription'] = `Valid values are ${JSON.stringify(validValues)}.`;
        throw new _WorkboxError.WorkboxError('invalid-value', details);
      }
    };
    const isArrayOfClass = (value, expectedClass, details) => {
      const error = new _WorkboxError.WorkboxError('not-array-of-class', details);
      if (!Array.isArray(value)) {
        throw error;
      }
      for (const item of value) {
        if (!(item instanceof expectedClass)) {
          throw error;
        }
      }
    };
    const finalAssertExports = "production" === 'production' ? null : {
      hasMethod,
      isArray,
      isInstance,
      isOneOf,
      isType,
      isArrayOfClass
    };
    exports.assert = finalAssertExports;
  }, {
    "../_private/WorkboxError.js": "hBTK",
    "../_version.js": "ViJI"
  }],
  "YAIL": [function (require, module, exports) {
    "use strict";

    // @ts-ignore
    try {
      self['workbox:routing:6.1.5'] && _();
    } catch (e) {}
  }, {}],
  "yxa7": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.validMethods = exports.defaultMethod = void 0;
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * The default HTTP method, 'GET', used when there's no specific method
     * configured for a route.
     *
     * @type {string}
     *
     * @private
     */
    const defaultMethod = 'GET';
    /**
     * The list of valid HTTP methods associated with requests that could be routed.
     *
     * @type {Array<string>}
     *
     * @private
     */
    exports.defaultMethod = defaultMethod;
    const validMethods = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'];
    exports.validMethods = validMethods;
  }, {
    "../_version.js": "YAIL"
  }],
  "HSyn": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.normalizeHandler = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * @param {function()|Object} handler Either a function, or an object with a
     * 'handle' method.
     * @return {Object} An object with a handle method.
     *
     * @private
     */
    const normalizeHandler = handler => {
      if (handler && typeof handler === 'object') {
        if ("production" !== 'production') {
          _assert.assert.hasMethod(handler, 'handle', {
            moduleName: 'workbox-routing',
            className: 'Route',
            funcName: 'constructor',
            paramName: 'handler'
          });
        }
        return handler;
      } else {
        if ("production" !== 'production') {
          _assert.assert.isType(handler, 'function', {
            moduleName: 'workbox-routing',
            className: 'Route',
            funcName: 'constructor',
            paramName: 'handler'
          });
        }
        return {
          handle: handler
        };
      }
    };
    exports.normalizeHandler = normalizeHandler;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "../_version.js": "YAIL"
  }],
  "EbcR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Route = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _constants = require("./utils/constants.js");
    var _normalizeHandler = require("./utils/normalizeHandler.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * A `Route` consists of a pair of callback functions, "match" and "handler".
     * The "match" callback determine if a route should be used to "handle" a
     * request by returning a non-falsy value if it can. The "handler" callback
     * is called when there is a match and should return a Promise that resolves
     * to a `Response`.
     *
     * @memberof module:workbox-routing
     */
    class Route {
      /**
       * Constructor for Route class.
       *
       * @param {module:workbox-routing~matchCallback} match
       * A callback function that determines whether the route matches a given
       * `fetch` event by returning a non-falsy value.
       * @param {module:workbox-routing~handlerCallback} handler A callback
       * function that returns a Promise resolving to a Response.
       * @param {string} [method='GET'] The HTTP method to match the Route
       * against.
       */
      constructor(match, handler, method = _constants.defaultMethod) {
        if ("production" !== 'production') {
          _assert.assert.isType(match, 'function', {
            moduleName: 'workbox-routing',
            className: 'Route',
            funcName: 'constructor',
            paramName: 'match'
          });
          if (method) {
            _assert.assert.isOneOf(method, _constants.validMethods, {
              paramName: 'method'
            });
          }
        }
        // These values are referenced directly by Router so cannot be
        // altered by minificaton.
        this.handler = (0, _normalizeHandler.normalizeHandler)(handler);
        this.match = match;
        this.method = method;
      }
      /**
       *
       * @param {module:workbox-routing-handlerCallback} handler A callback
       * function that returns a Promise resolving to a Response
       */
      setCatchHandler(handler) {
        this.catchHandler = (0, _normalizeHandler.normalizeHandler)(handler);
      }
    }
    exports.Route = Route;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "./utils/constants.js": "yxa7",
    "./utils/normalizeHandler.js": "HSyn",
    "./_version.js": "YAIL"
  }],
  "CMx5": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RegExpRoute = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _Route = require("./Route.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * RegExpRoute makes it easy to create a regular expression based
     * [Route]{@link module:workbox-routing.Route}.
     *
     * For same-origin requests the RegExp only needs to match part of the URL. For
     * requests against third-party servers, you must define a RegExp that matches
     * the start of the URL.
     *
     * [See the module docs for info.]{@link https://developers.google.com/web/tools/workbox/modules/workbox-routing}
     *
     * @memberof module:workbox-routing
     * @extends module:workbox-routing.Route
     */
    class RegExpRoute extends _Route.Route {
      /**
       * If the regular expression contains
       * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
       * the captured values will be passed to the
       * [handler's]{@link module:workbox-routing~handlerCallback} `params`
       * argument.
       *
       * @param {RegExp} regExp The regular expression to match against URLs.
       * @param {module:workbox-routing~handlerCallback} handler A callback
       * function that returns a Promise resulting in a Response.
       * @param {string} [method='GET'] The HTTP method to match the Route
       * against.
       */
      constructor(regExp, handler, method) {
        if ("production" !== 'production') {
          _assert.assert.isInstance(regExp, RegExp, {
            moduleName: 'workbox-routing',
            className: 'RegExpRoute',
            funcName: 'constructor',
            paramName: 'pattern'
          });
        }
        const match = ({
          url
        }) => {
          const result = regExp.exec(url.href);
          // Return immediately if there's no match.
          if (!result) {
            return;
          }
          // Require that the match start at the first character in the URL string
          // if it's a cross-origin request.
          // See https://github.com/GoogleChrome/workbox/issues/281 for the context
          // behind this behavior.
          if (url.origin !== location.origin && result.index !== 0) {
            if ("production" !== 'production') {
              _logger.logger.debug(`The regular expression '${regExp}' only partially matched ` + `against the cross-origin URL '${url}'. RegExpRoute's will only ` + `handle cross-origin requests if they match the entire URL.`);
            }
            return;
          }
          // If the route matches, but there aren't any capture groups defined, then
          // this will return [], which is truthy and therefore sufficient to
          // indicate a match.
          // If there are capture groups, then it will return their values.
          return result.slice(1);
        };
        super(match, handler, method);
      }
    }
    exports.RegExpRoute = RegExpRoute;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/logger.js": "uWXV",
    "./Route.js": "EbcR",
    "./_version.js": "YAIL"
  }],
  "FrDK": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getFriendlyURL = void 0;
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const getFriendlyURL = url => {
      const urlObj = new URL(String(url), location.href);
      // See https://github.com/GoogleChrome/workbox/issues/2323
      // We want to include everything, except for the origin if it's same-origin.
      return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
    };
    exports.getFriendlyURL = getFriendlyURL;
  }, {
    "../_version.js": "ViJI"
  }],
  "YjMu": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Router = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
    var _constants = require("./utils/constants.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _normalizeHandler = require("./utils/normalizeHandler.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * The Router can be used to process a FetchEvent through one or more
     * [Routes]{@link module:workbox-routing.Route} responding  with a Request if
     * a matching route exists.
     *
     * If no route matches a given a request, the Router will use a "default"
     * handler if one is defined.
     *
     * Should the matching Route throw an error, the Router will use a "catch"
     * handler if one is defined to gracefully deal with issues and respond with a
     * Request.
     *
     * If a request matches multiple routes, the **earliest** registered route will
     * be used to respond to the request.
     *
     * @memberof module:workbox-routing
     */
    class Router {
      /**
       * Initializes a new Router.
       */
      constructor() {
        this._routes = new Map();
        this._defaultHandlerMap = new Map();
      }
      /**
       * @return {Map<string, Array<module:workbox-routing.Route>>} routes A `Map` of HTTP
       * method name ('GET', etc.) to an array of all the corresponding `Route`
       * instances that are registered.
       */
      get routes() {
        return this._routes;
      }
      /**
       * Adds a fetch event listener to respond to events when a route matches
       * the event's request.
       */
      addFetchListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('fetch', event => {
          const {
            request
          } = event;
          const responsePromise = this.handleRequest({
            request,
            event
          });
          if (responsePromise) {
            event.respondWith(responsePromise);
          }
        });
      }
      /**
       * Adds a message event listener for URLs to cache from the window.
       * This is useful to cache resources loaded on the page prior to when the
       * service worker started controlling it.
       *
       * The format of the message data sent from the window should be as follows.
       * Where the `urlsToCache` array may consist of URL strings or an array of
       * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
       *
       * ```
       * {
       *   type: 'CACHE_URLS',
       *   payload: {
       *     urlsToCache: [
       *       './script1.js',
       *       './script2.js',
       *       ['./script3.js', {mode: 'no-cors'}],
       *     ],
       *   },
       * }
       * ```
       */
      addCacheListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('message', event => {
          if (event.data && event.data.type === 'CACHE_URLS') {
            const {
              payload
            } = event.data;
            if ("production" !== 'production') {
              _logger.logger.debug(`Caching URLs from the window`, payload.urlsToCache);
            }
            const requestPromises = Promise.all(payload.urlsToCache.map(entry => {
              if (typeof entry === 'string') {
                entry = [entry];
              }
              const request = new Request(...entry);
              return this.handleRequest({
                request,
                event
              });
              // TODO(philipwalton): TypeScript errors without this typecast for
              // some reason (probably a bug). The real type here should work but
              // doesn't: `Array<Promise<Response> | undefined>`.
            })); // TypeScript
            event.waitUntil(requestPromises);
            // If a MessageChannel was used, reply to the message on success.
            if (event.ports && event.ports[0]) {
              requestPromises.then(() => event.ports[0].postMessage(true));
            }
          }
        });
      }
      /**
       * Apply the routing rules to a FetchEvent object to get a Response from an
       * appropriate Route's handler.
       *
       * @param {Object} options
       * @param {Request} options.request The request to handle.
       * @param {ExtendableEvent} options.event The event that triggered the
       *     request.
       * @return {Promise<Response>|undefined} A promise is returned if a
       *     registered route can handle the request. If there is no matching
       *     route and there's no `defaultHandler`, `undefined` is returned.
       */
      handleRequest({
        request,
        event
      }) {
        if ("production" !== 'production') {
          _assert.assert.isInstance(request, Request, {
            moduleName: 'workbox-routing',
            className: 'Router',
            funcName: 'handleRequest',
            paramName: 'options.request'
          });
        }
        const url = new URL(request.url, location.href);
        if (!url.protocol.startsWith('http')) {
          if ("production" !== 'production') {
            _logger.logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
          }
          return;
        }
        const sameOrigin = url.origin === location.origin;
        const {
          params,
          route
        } = this.findMatchingRoute({
          event,
          request,
          sameOrigin,
          url
        });
        let handler = route && route.handler;
        const debugMessages = [];
        if ("production" !== 'production') {
          if (handler) {
            debugMessages.push([`Found a route to handle this request:`, route]);
            if (params) {
              debugMessages.push([`Passing the following params to the route's handler:`, params]);
            }
          }
        }
        // If we don't have a handler because there was no matching route, then
        // fall back to defaultHandler if that's defined.
        const method = request.method;
        if (!handler && this._defaultHandlerMap.has(method)) {
          if ("production" !== 'production') {
            debugMessages.push(`Failed to find a matching route. Falling ` + `back to the default handler for ${method}.`);
          }
          handler = this._defaultHandlerMap.get(method);
        }
        if (!handler) {
          if ("production" !== 'production') {
            // No handler so Workbox will do nothing. If logs is set of debug
            // i.e. verbose, we should print out this information.
            _logger.logger.debug(`No route found for: ${(0, _getFriendlyURL.getFriendlyURL)(url)}`);
          }
          return;
        }
        if ("production" !== 'production') {
          // We have a handler, meaning Workbox is going to handle the route.
          // print the routing details to the console.
          _logger.logger.groupCollapsed(`Router is responding to: ${(0, _getFriendlyURL.getFriendlyURL)(url)}`);
          debugMessages.forEach(msg => {
            if (Array.isArray(msg)) {
              _logger.logger.log(...msg);
            } else {
              _logger.logger.log(msg);
            }
          });
          _logger.logger.groupEnd();
        }
        // Wrap in try and catch in case the handle method throws a synchronous
        // error. It should still callback to the catch handler.
        let responsePromise;
        try {
          responsePromise = handler.handle({
            url,
            request,
            event,
            params
          });
        } catch (err) {
          responsePromise = Promise.reject(err);
        }
        // Get route's catch handler, if it exists
        const catchHandler = route && route.catchHandler;
        if (responsePromise instanceof Promise && (this._catchHandler || catchHandler)) {
          responsePromise = responsePromise.catch(async err => {
            // If there's a route catch handler, process that first
            if (catchHandler) {
              if ("production" !== 'production') {
                // Still include URL here as it will be async from the console group
                // and may not make sense without the URL
                _logger.logger.groupCollapsed(`Error thrown when responding to: ` + ` ${(0, _getFriendlyURL.getFriendlyURL)(url)}. Falling back to route's Catch Handler.`);
                _logger.logger.error(`Error thrown by:`, route);
                _logger.logger.error(err);
                _logger.logger.groupEnd();
              }
              try {
                return await catchHandler.handle({
                  url,
                  request,
                  event,
                  params
                });
              } catch (catchErr) {
                err = catchErr;
              }
            }
            if (this._catchHandler) {
              if ("production" !== 'production') {
                // Still include URL here as it will be async from the console group
                // and may not make sense without the URL
                _logger.logger.groupCollapsed(`Error thrown when responding to: ` + ` ${(0, _getFriendlyURL.getFriendlyURL)(url)}. Falling back to global Catch Handler.`);
                _logger.logger.error(`Error thrown by:`, route);
                _logger.logger.error(err);
                _logger.logger.groupEnd();
              }
              return this._catchHandler.handle({
                url,
                request,
                event
              });
            }
            throw err;
          });
        }
        return responsePromise;
      }
      /**
       * Checks a request and URL (and optionally an event) against the list of
       * registered routes, and if there's a match, returns the corresponding
       * route along with any params generated by the match.
       *
       * @param {Object} options
       * @param {URL} options.url
       * @param {boolean} options.sameOrigin The result of comparing `url.origin`
       *     against the current origin.
       * @param {Request} options.request The request to match.
       * @param {Event} options.event The corresponding event.
       * @return {Object} An object with `route` and `params` properties.
       *     They are populated if a matching route was found or `undefined`
       *     otherwise.
       */
      findMatchingRoute({
        url,
        sameOrigin,
        request,
        event
      }) {
        const routes = this._routes.get(request.method) || [];
        for (const route of routes) {
          let params;
          const matchResult = route.match({
            url,
            sameOrigin,
            request,
            event
          });
          if (matchResult) {
            if ("production" !== 'production') {
              // Warn developers that using an async matchCallback is almost always
              // not the right thing to do. 
              if (matchResult instanceof Promise) {
                _logger.logger.warn(`While routing ${(0, _getFriendlyURL.getFriendlyURL)(url)}, an async ` + `matchCallback function was used. Please convert the ` + `following route to use a synchronous matchCallback function:`, route);
              }
            }
            // See https://github.com/GoogleChrome/workbox/issues/2079
            params = matchResult;
            if (Array.isArray(matchResult) && matchResult.length === 0) {
              // Instead of passing an empty array in as params, use undefined.
              params = undefined;
            } else if (matchResult.constructor === Object && Object.keys(matchResult).length === 0) {
              // Instead of passing an empty object in as params, use undefined.
              params = undefined;
            } else if (typeof matchResult === 'boolean') {
              // For the boolean value true (rather than just something truth-y),
              // don't set params.
              // See https://github.com/GoogleChrome/workbox/pull/2134#issuecomment-513924353
              params = undefined;
            }
            // Return early if have a match.
            return {
              route,
              params
            };
          }
        }
        // If no match was found above, return and empty object.
        return {};
      }
      /**
       * Define a default `handler` that's called when no routes explicitly
       * match the incoming request.
       *
       * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
       *
       * Without a default handler, unmatched requests will go against the
       * network as if there were no service worker present.
       *
       * @param {module:workbox-routing~handlerCallback} handler A callback
       * function that returns a Promise resulting in a Response.
       * @param {string} [method='GET'] The HTTP method to associate with this
       * default handler. Each method has its own default.
       */
      setDefaultHandler(handler, method = _constants.defaultMethod) {
        this._defaultHandlerMap.set(method, (0, _normalizeHandler.normalizeHandler)(handler));
      }
      /**
       * If a Route throws an error while handling a request, this `handler`
       * will be called and given a chance to provide a response.
       *
       * @param {module:workbox-routing~handlerCallback} handler A callback
       * function that returns a Promise resulting in a Response.
       */
      setCatchHandler(handler) {
        this._catchHandler = (0, _normalizeHandler.normalizeHandler)(handler);
      }
      /**
       * Registers a route with the router.
       *
       * @param {module:workbox-routing.Route} route The route to register.
       */
      registerRoute(route) {
        if ("production" !== 'production') {
          _assert.assert.isType(route, 'object', {
            moduleName: 'workbox-routing',
            className: 'Router',
            funcName: 'registerRoute',
            paramName: 'route'
          });
          _assert.assert.hasMethod(route, 'match', {
            moduleName: 'workbox-routing',
            className: 'Router',
            funcName: 'registerRoute',
            paramName: 'route'
          });
          _assert.assert.isType(route.handler, 'object', {
            moduleName: 'workbox-routing',
            className: 'Router',
            funcName: 'registerRoute',
            paramName: 'route'
          });
          _assert.assert.hasMethod(route.handler, 'handle', {
            moduleName: 'workbox-routing',
            className: 'Router',
            funcName: 'registerRoute',
            paramName: 'route.handler'
          });
          _assert.assert.isType(route.method, 'string', {
            moduleName: 'workbox-routing',
            className: 'Router',
            funcName: 'registerRoute',
            paramName: 'route.method'
          });
        }
        if (!this._routes.has(route.method)) {
          this._routes.set(route.method, []);
        }
        // Give precedence to all of the earlier routes by adding this additional
        // route to the end of the array.
        this._routes.get(route.method).push(route);
      }
      /**
       * Unregisters a route with the router.
       *
       * @param {module:workbox-routing.Route} route The route to unregister.
       */
      unregisterRoute(route) {
        if (!this._routes.has(route.method)) {
          throw new _WorkboxError.WorkboxError('unregister-route-but-not-found-with-method', {
            method: route.method
          });
        }
        const routeIndex = this._routes.get(route.method).indexOf(route);
        if (routeIndex > -1) {
          this._routes.get(route.method).splice(routeIndex, 1);
        } else {
          throw new _WorkboxError.WorkboxError('unregister-route-route-not-registered');
        }
      }
    }
    exports.Router = Router;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/getFriendlyURL.js": "FrDK",
    "./utils/constants.js": "yxa7",
    "workbox-core/_private/logger.js": "uWXV",
    "./utils/normalizeHandler.js": "HSyn",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "./_version.js": "YAIL"
  }],
  "DQEO": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getOrCreateDefaultRouter = void 0;
    var _Router = require("../Router.js");
    require("../_version.js");
    /*
      Copyright 2019 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    let defaultRouter;
    /**
     * Creates a new, singleton Router instance if one does not exist. If one
     * does already exist, that instance is returned.
     *
     * @private
     * @return {Router}
     */
    const getOrCreateDefaultRouter = () => {
      if (!defaultRouter) {
        defaultRouter = new _Router.Router();
        // The helpers that use the default Router assume these listeners exist.
        defaultRouter.addFetchListener();
        defaultRouter.addCacheListener();
      }
      return defaultRouter;
    };
    exports.getOrCreateDefaultRouter = getOrCreateDefaultRouter;
  }, {
    "../Router.js": "YjMu",
    "../_version.js": "YAIL"
  }],
  "VLpG": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.registerRoute = registerRoute;
    var _logger = require("workbox-core/_private/logger.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _Route = require("./Route.js");
    var _RegExpRoute = require("./RegExpRoute.js");
    var _getOrCreateDefaultRouter = require("./utils/getOrCreateDefaultRouter.js");
    require("./_version.js");
    /*
      Copyright 2019 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * Easily register a RegExp, string, or function with a caching
     * strategy to a singleton Router instance.
     *
     * This method will generate a Route for you if needed and
     * call [registerRoute()]{@link module:workbox-routing.Router#registerRoute}.
     *
     * @param {RegExp|string|module:workbox-routing.Route~matchCallback|module:workbox-routing.Route} capture
     * If the capture param is a `Route`, all other arguments will be ignored.
     * @param {module:workbox-routing~handlerCallback} [handler] A callback
     * function that returns a Promise resulting in a Response. This parameter
     * is required if `capture` is not a `Route` object.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     * @return {module:workbox-routing.Route} The generated `Route`(Useful for
     * unregistering).
     *
     * @memberof module:workbox-routing
     */
    function registerRoute(capture, handler, method) {
      let route;
      if (typeof capture === 'string') {
        const captureUrl = new URL(capture, location.href);
        if ("production" !== 'production') {
          if (!(capture.startsWith('/') || capture.startsWith('http'))) {
            throw new _WorkboxError.WorkboxError('invalid-string', {
              moduleName: 'workbox-routing',
              funcName: 'registerRoute',
              paramName: 'capture'
            });
          }
          // We want to check if Express-style wildcards are in the pathname only.
          // TODO: Remove this log message in v4.
          const valueToCheck = capture.startsWith('http') ? captureUrl.pathname : capture;
          // See https://github.com/pillarjs/path-to-regexp#parameters
          const wildcards = '[*:?+]';
          if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
            _logger.logger.debug(`The '$capture' parameter contains an Express-style wildcard ` + `character (${wildcards}). Strings are now always interpreted as ` + `exact matches; use a RegExp for partial or wildcard matches.`);
          }
        }
        const matchCallback = ({
          url
        }) => {
          if ("production" !== 'production') {
            if (url.pathname === captureUrl.pathname && url.origin !== captureUrl.origin) {
              _logger.logger.debug(`${capture} only partially matches the cross-origin URL ` + `${url}. This route will only handle cross-origin requests ` + `if they match the entire URL.`);
            }
          }
          return url.href === captureUrl.href;
        };
        // If `capture` is a string then `handler` and `method` must be present.
        route = new _Route.Route(matchCallback, handler, method);
      } else if (capture instanceof RegExp) {
        // If `capture` is a `RegExp` then `handler` and `method` must be present.
        route = new _RegExpRoute.RegExpRoute(capture, handler, method);
      } else if (typeof capture === 'function') {
        // If `capture` is a function then `handler` and `method` must be present.
        route = new _Route.Route(capture, handler, method);
      } else if (capture instanceof _Route.Route) {
        route = capture;
      } else {
        throw new _WorkboxError.WorkboxError('unsupported-route-type', {
          moduleName: 'workbox-routing',
          funcName: 'registerRoute',
          paramName: 'capture'
        });
      }
      const defaultRouter = (0, _getOrCreateDefaultRouter.getOrCreateDefaultRouter)();
      defaultRouter.registerRoute(route);
      return route;
    }
  }, {
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "./Route.js": "EbcR",
    "./RegExpRoute.js": "CMx5",
    "./utils/getOrCreateDefaultRouter.js": "DQEO",
    "./_version.js": "YAIL"
  }],
  "Mf3Z": [function (require, module, exports) {
    "use strict";

    // @ts-ignore
    try {
      self['workbox:strategies:6.1.5'] && _();
    } catch (e) {}
  }, {}],
  "XnCC": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cacheOkAndOpaquePlugin = void 0;
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const cacheOkAndOpaquePlugin = {
      /**
       * Returns a valid response (to allow caching) if the status is 200 (OK) or
       * 0 (opaque).
       *
       * @param {Object} options
       * @param {Response} options.response
       * @return {Response|null}
       *
       * @private
       */
      cacheWillUpdate: async ({
        response
      }) => {
        if (response.status === 200 || response.status === 0) {
          return response;
        }
        return null;
      }
    };
    exports.cacheOkAndOpaquePlugin = cacheOkAndOpaquePlugin;
  }, {
    "../_version.js": "Mf3Z"
  }],
  "HFbW": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cacheNames = void 0;
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const _cacheNameDetails = {
      googleAnalytics: 'googleAnalytics',
      precache: 'precache-v2',
      prefix: 'workbox',
      runtime: 'runtime',
      suffix: typeof registration !== 'undefined' ? registration.scope : ''
    };
    const _createCacheName = cacheName => {
      return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix].filter(value => value && value.length > 0).join('-');
    };
    const eachCacheNameDetail = fn => {
      for (const key of Object.keys(_cacheNameDetails)) {
        fn(key);
      }
    };
    const cacheNames = {
      updateDetails: details => {
        eachCacheNameDetail(key => {
          if (typeof details[key] === 'string') {
            _cacheNameDetails[key] = details[key];
          }
        });
      },
      getGoogleAnalyticsName: userCacheName => {
        return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
      },
      getPrecacheName: userCacheName => {
        return userCacheName || _createCacheName(_cacheNameDetails.precache);
      },
      getPrefix: () => {
        return _cacheNameDetails.prefix;
      },
      getRuntimeName: userCacheName => {
        return userCacheName || _createCacheName(_cacheNameDetails.runtime);
      },
      getSuffix: () => {
        return _cacheNameDetails.suffix;
      }
    };
    exports.cacheNames = cacheNames;
  }, {
    "../_version.js": "ViJI"
  }],
  "tD5t": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cacheMatchIgnoreParams = cacheMatchIgnoreParams;
    require("../_version.js");
    /*
      Copyright 2020 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    function stripParams(fullURL, ignoreParams) {
      const strippedURL = new URL(fullURL);
      for (const param of ignoreParams) {
        strippedURL.searchParams.delete(param);
      }
      return strippedURL.href;
    }
    /**
     * Matches an item in the cache, ignoring specific URL params. This is similar
     * to the `ignoreSearch` option, but it allows you to ignore just specific
     * params (while continuing to match on the others).
     *
     * @private
     * @param {Cache} cache
     * @param {Request} request
     * @param {Object} matchOptions
     * @param {Array<string>} ignoreParams
     * @return {Promise<Response|undefined>}
     */
    async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
      const strippedRequestURL = stripParams(request.url, ignoreParams);
      // If the request doesn't include any ignored params, match as normal.
      if (request.url === strippedRequestURL) {
        return cache.match(request, matchOptions);
      }
      // Otherwise, match by comparing keys
      const keysOptions = {
        ...matchOptions,
        ignoreSearch: true
      };
      const cacheKeys = await cache.keys(request, keysOptions);
      for (const cacheKey of cacheKeys) {
        const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);
        if (strippedRequestURL === strippedCacheKeyURL) {
          return cache.match(cacheKey, matchOptions);
        }
      }
      return;
    }
  }, {
    "../_version.js": "ViJI"
  }],
  "EcMH": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Deferred = void 0;
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * The Deferred class composes Promises in a way that allows for them to be
     * resolved or rejected from outside the constructor. In most cases promises
     * should be used directly, but Deferreds can be necessary when the logic to
     * resolve a promise must be separate.
     *
     * @private
     */
    class Deferred {
      /**
       * Creates a promise and exposes its resolve and reject functions as methods.
       */
      constructor() {
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      }
    }
    exports.Deferred = Deferred;
  }, {
    "../_version.js": "ViJI"
  }],
  "cG08": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.quotaErrorCallbacks = void 0;
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    // Callbacks to be executed whenever there's a quota error.
    const quotaErrorCallbacks = new Set();
    exports.quotaErrorCallbacks = quotaErrorCallbacks;
  }, {
    "../_version.js": "ViJI"
  }],
  "m2ff": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.executeQuotaErrorCallbacks = executeQuotaErrorCallbacks;
    var _logger = require("../_private/logger.js");
    var _quotaErrorCallbacks = require("../models/quotaErrorCallbacks.js");
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * Runs all of the callback functions, one at a time sequentially, in the order
     * in which they were registered.
     *
     * @memberof module:workbox-core
     * @private
     */
    async function executeQuotaErrorCallbacks() {
      if ("production" !== 'production') {
        _logger.logger.log(`About to run ${_quotaErrorCallbacks.quotaErrorCallbacks.size} ` + `callbacks to clean up caches.`);
      }
      for (const callback of _quotaErrorCallbacks.quotaErrorCallbacks) {
        await callback();
        if ("production" !== 'production') {
          _logger.logger.log(callback, 'is complete.');
        }
      }
      if ("production" !== 'production') {
        _logger.logger.log('Finished running callbacks.');
      }
    }
  }, {
    "../_private/logger.js": "uWXV",
    "../models/quotaErrorCallbacks.js": "cG08",
    "../_version.js": "ViJI"
  }],
  "YPqU": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.timeout = timeout;
    require("../_version.js");
    /*
      Copyright 2019 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * Returns a promise that resolves and the passed number of milliseconds.
     * This utility is an async/await-friendly version of `setTimeout`.
     *
     * @param {number} ms
     * @return {Promise}
     * @private
     */
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }, {
    "../_version.js": "ViJI"
  }],
  "W2RL": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StrategyHandler = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _cacheMatchIgnoreParams = require("workbox-core/_private/cacheMatchIgnoreParams.js");
    var _Deferred = require("workbox-core/_private/Deferred.js");
    var _executeQuotaErrorCallbacks = require("workbox-core/_private/executeQuotaErrorCallbacks.js");
    var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _timeout = require("workbox-core/_private/timeout.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    require("./_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    function toRequest(input) {
      return typeof input === 'string' ? new Request(input) : input;
    }
    /**
     * A class created every time a Strategy instance instance calls
     * [handle()]{@link module:workbox-strategies.Strategy~handle} or
     * [handleAll()]{@link module:workbox-strategies.Strategy~handleAll} that wraps all fetch and
     * cache actions around plugin callbacks and keeps track of when the strategy
     * is "done" (i.e. all added `event.waitUntil()` promises have resolved).
     *
     * @memberof module:workbox-strategies
     */
    class StrategyHandler {
      /**
       * Creates a new instance associated with the passed strategy and event
       * that's handling the request.
       *
       * The constructor also initializes the state that will be passed to each of
       * the plugins handling this request.
       *
       * @param {module:workbox-strategies.Strategy} strategy
       * @param {Object} options
       * @param {Request|string} options.request A request to run this strategy for.
       * @param {ExtendableEvent} options.event The event associated with the
       *     request.
       * @param {URL} [options.url]
       * @param {*} [options.params]
       *     [match callback]{@link module:workbox-routing~matchCallback},
       *     (if applicable).
       */
      constructor(strategy, options) {
        this._cacheKeys = {};
        /**
         * The request the strategy is performing (passed to the strategy's
         * `handle()` or `handleAll()` method).
         * @name request
         * @instance
         * @type {Request}
         * @memberof module:workbox-strategies.StrategyHandler
         */
        /**
         * The event associated with this request.
         * @name event
         * @instance
         * @type {ExtendableEvent}
         * @memberof module:workbox-strategies.StrategyHandler
         */
        /**
         * A `URL` instance of `request.url` (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `url` param will be present if the strategy was invoked
         * from a workbox `Route` object.
         * @name url
         * @instance
         * @type {URL|undefined}
         * @memberof module:workbox-strategies.StrategyHandler
         */
        /**
         * A `param` value (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `param` param will be present if the strategy was invoked
         * from a workbox `Route` object and the
         * [match callback]{@link module:workbox-routing~matchCallback} returned
         * a truthy value (it will be that value).
         * @name params
         * @instance
         * @type {*|undefined}
         * @memberof module:workbox-strategies.StrategyHandler
         */
        if ("production" !== 'production') {
          _assert.assert.isInstance(options.event, ExtendableEvent, {
            moduleName: 'workbox-strategies',
            className: 'StrategyHandler',
            funcName: 'constructor',
            paramName: 'options.event'
          });
        }
        Object.assign(this, options);
        this.event = options.event;
        this._strategy = strategy;
        this._handlerDeferred = new _Deferred.Deferred();
        this._extendLifetimePromises = [];
        // Copy the plugins list (since it's mutable on the strategy),
        // so any mutations don't affect this handler instance.
        this._plugins = [...strategy.plugins];
        this._pluginStateMap = new Map();
        for (const plugin of this._plugins) {
          this._pluginStateMap.set(plugin, {});
        }
        this.event.waitUntil(this._handlerDeferred.promise);
      }
      /**
       * Fetches a given request (and invokes any applicable plugin callback
       * methods) using the `fetchOptions` (for non-navigation requests) and
       * `plugins` defined on the `Strategy` object.
       *
       * The following plugin lifecycle methods are invoked when using this method:
       * - `requestWillFetch()`
       * - `fetchDidSucceed()`
       * - `fetchDidFail()`
       *
       * @param {Request|string} input The URL or request to fetch.
       * @return {Promise<Response>}
       */
      async fetch(input) {
        const {
          event
        } = this;
        let request = toRequest(input);
        if (request.mode === 'navigate' && event instanceof FetchEvent && event.preloadResponse) {
          const possiblePreloadResponse = await event.preloadResponse;
          if (possiblePreloadResponse) {
            if ("production" !== 'production') {
              _logger.logger.log(`Using a preloaded navigation response for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(request.url)}'`);
            }
            return possiblePreloadResponse;
          }
        }
        // If there is a fetchDidFail plugin, we need to save a clone of the
        // original request before it's either modified by a requestWillFetch
        // plugin or before the original request's body is consumed via fetch().
        const originalRequest = this.hasCallback('fetchDidFail') ? request.clone() : null;
        try {
          for (const cb of this.iterateCallbacks('requestWillFetch')) {
            request = await cb({
              request: request.clone(),
              event
            });
          }
        } catch (err) {
          throw new _WorkboxError.WorkboxError('plugin-error-request-will-fetch', {
            thrownError: err
          });
        }
        // The request can be altered by plugins with `requestWillFetch` making
        // the original request (most likely from a `fetch` event) different
        // from the Request we make. Pass both to `fetchDidFail` to aid debugging.
        const pluginFilteredRequest = request.clone();
        try {
          let fetchResponse;
          // See https://github.com/GoogleChrome/workbox/issues/1796
          fetchResponse = await fetch(request, request.mode === 'navigate' ? undefined : this._strategy.fetchOptions);
          if ("production" !== 'production') {
            _logger.logger.debug(`Network request for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(request.url)}' returned a response with ` + `status '${fetchResponse.status}'.`);
          }
          for (const callback of this.iterateCallbacks('fetchDidSucceed')) {
            fetchResponse = await callback({
              event,
              request: pluginFilteredRequest,
              response: fetchResponse
            });
          }
          return fetchResponse;
        } catch (error) {
          if ("production" !== 'production') {
            _logger.logger.log(`Network request for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(request.url)}' threw an error.`, error);
          }
          // `originalRequest` will only exist if a `fetchDidFail` callback
          // is being used (see above).
          if (originalRequest) {
            await this.runCallbacks('fetchDidFail', {
              error,
              event,
              originalRequest: originalRequest.clone(),
              request: pluginFilteredRequest.clone()
            });
          }
          throw error;
        }
      }
      /**
       * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
       * the response generated by `this.fetch()`.
       *
       * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
       * so you do not have to manually call `waitUntil()` on the event.
       *
       * @param {Request|string} input The request or URL to fetch and cache.
       * @return {Promise<Response>}
       */
      async fetchAndCachePut(input) {
        const response = await this.fetch(input);
        const responseClone = response.clone();
        this.waitUntil(this.cachePut(input, responseClone));
        return response;
      }
      /**
       * Matches a request from the cache (and invokes any applicable plugin
       * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
       * defined on the strategy object.
       *
       * The following plugin lifecycle methods are invoked when using this method:
       * - cacheKeyWillByUsed()
       * - cachedResponseWillByUsed()
       *
       * @param {Request|string} key The Request or URL to use as the cache key.
       * @return {Promise<Response|undefined>} A matching response, if found.
       */
      async cacheMatch(key) {
        const request = toRequest(key);
        let cachedResponse;
        const {
          cacheName,
          matchOptions
        } = this._strategy;
        const effectiveRequest = await this.getCacheKey(request, 'read');
        const multiMatchOptions = {
          ...matchOptions,
          ...{
            cacheName
          }
        };
        cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
        if ("production" !== 'production') {
          if (cachedResponse) {
            _logger.logger.debug(`Found a cached response in '${cacheName}'.`);
          } else {
            _logger.logger.debug(`No cached response found in '${cacheName}'.`);
          }
        }
        for (const callback of this.iterateCallbacks('cachedResponseWillBeUsed')) {
          cachedResponse = (await callback({
            cacheName,
            matchOptions,
            cachedResponse,
            request: effectiveRequest,
            event: this.event
          })) || undefined;
        }
        return cachedResponse;
      }
      /**
       * Puts a request/response pair in the cache (and invokes any applicable
       * plugin callback methods) using the `cacheName` and `plugins` defined on
       * the strategy object.
       *
       * The following plugin lifecycle methods are invoked when using this method:
       * - cacheKeyWillByUsed()
       * - cacheWillUpdate()
       * - cacheDidUpdate()
       *
       * @param {Request|string} key The request or URL to use as the cache key.
       * @param {Response} response The response to cache.
       * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
       * not be cached, and `true` otherwise.
       */
      async cachePut(key, response) {
        const request = toRequest(key);
        // Run in the next task to avoid blocking other cache reads.
        // https://github.com/w3c/ServiceWorker/issues/1397
        await (0, _timeout.timeout)(0);
        const effectiveRequest = await this.getCacheKey(request, 'write');
        if ("production" !== 'production') {
          if (effectiveRequest.method && effectiveRequest.method !== 'GET') {
            throw new _WorkboxError.WorkboxError('attempt-to-cache-non-get-request', {
              url: (0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url),
              method: effectiveRequest.method
            });
          }
        }
        if (!response) {
          if ("production" !== 'production') {
            _logger.logger.error(`Cannot cache non-existent response for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)}'.`);
          }
          throw new _WorkboxError.WorkboxError('cache-put-with-no-response', {
            url: (0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)
          });
        }
        const responseToCache = await this._ensureResponseSafeToCache(response);
        if (!responseToCache) {
          if ("production" !== 'production') {
            _logger.logger.debug(`Response '${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)}' ` + `will not be cached.`, responseToCache);
          }
          return false;
        }
        const {
          cacheName,
          matchOptions
        } = this._strategy;
        const cache = await self.caches.open(cacheName);
        const hasCacheUpdateCallback = this.hasCallback('cacheDidUpdate');
        const oldResponse = hasCacheUpdateCallback ? await (0, _cacheMatchIgnoreParams.cacheMatchIgnoreParams)(
        // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
        // feature. Consider into ways to only add this behavior if using
        // precaching.
        cache, effectiveRequest.clone(), ['__WB_REVISION__'], matchOptions) : null;
        if ("production" !== 'production') {
          _logger.logger.debug(`Updating the '${cacheName}' cache with a new Response ` + `for ${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)}.`);
        }
        try {
          await cache.put(effectiveRequest, hasCacheUpdateCallback ? responseToCache.clone() : responseToCache);
        } catch (error) {
          // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
          if (error.name === 'QuotaExceededError') {
            await (0, _executeQuotaErrorCallbacks.executeQuotaErrorCallbacks)();
          }
          throw error;
        }
        for (const callback of this.iterateCallbacks('cacheDidUpdate')) {
          await callback({
            cacheName,
            oldResponse,
            newResponse: responseToCache.clone(),
            request: effectiveRequest,
            event: this.event
          });
        }
        return true;
      }
      /**
       * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
       * executes any of those callbacks found in sequence. The final `Request`
       * object returned by the last plugin is treated as the cache key for cache
       * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
       * been registered, the passed request is returned unmodified
       *
       * @param {Request} request
       * @param {string} mode
       * @return {Promise<Request>}
       */
      async getCacheKey(request, mode) {
        if (!this._cacheKeys[mode]) {
          let effectiveRequest = request;
          for (const callback of this.iterateCallbacks('cacheKeyWillBeUsed')) {
            effectiveRequest = toRequest(await callback({
              mode,
              request: effectiveRequest,
              event: this.event,
              params: this.params
            }));
          }
          this._cacheKeys[mode] = effectiveRequest;
        }
        return this._cacheKeys[mode];
      }
      /**
       * Returns true if the strategy has at least one plugin with the given
       * callback.
       *
       * @param {string} name The name of the callback to check for.
       * @return {boolean}
       */
      hasCallback(name) {
        for (const plugin of this._strategy.plugins) {
          if (name in plugin) {
            return true;
          }
        }
        return false;
      }
      /**
       * Runs all plugin callbacks matching the given name, in order, passing the
       * given param object (merged ith the current plugin state) as the only
       * argument.
       *
       * Note: since this method runs all plugins, it's not suitable for cases
       * where the return value of a callback needs to be applied prior to calling
       * the next callback. See
       * [`iterateCallbacks()`]{@link module:workbox-strategies.StrategyHandler#iterateCallbacks}
       * below for how to handle that case.
       *
       * @param {string} name The name of the callback to run within each plugin.
       * @param {Object} param The object to pass as the first (and only) param
       *     when executing each callback. This object will be merged with the
       *     current plugin state prior to callback execution.
       */
      async runCallbacks(name, param) {
        for (const callback of this.iterateCallbacks(name)) {
          // TODO(philipwalton): not sure why `any` is needed. It seems like
          // this should work with `as WorkboxPluginCallbackParam[C]`.
          await callback(param);
        }
      }
      /**
       * Accepts a callback and returns an iterable of matching plugin callbacks,
       * where each callback is wrapped with the current handler state (i.e. when
       * you call each callback, whatever object parameter you pass it will
       * be merged with the plugin's current state).
       *
       * @param {string} name The name fo the callback to run
       * @return {Array<Function>}
       */
      *iterateCallbacks(name) {
        for (const plugin of this._strategy.plugins) {
          if (typeof plugin[name] === 'function') {
            const state = this._pluginStateMap.get(plugin);
            const statefulCallback = param => {
              const statefulParam = {
                ...param,
                state
              };
              // TODO(philipwalton): not sure why `any` is needed. It seems like
              // this should work with `as WorkboxPluginCallbackParam[C]`.
              return plugin[name](statefulParam);
            };
            yield statefulCallback;
          }
        }
      }
      /**
       * Adds a promise to the
       * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
       * of the event event associated with the request being handled (usually a
       * `FetchEvent`).
       *
       * Note: you can await
       * [`doneWaiting()`]{@link module:workbox-strategies.StrategyHandler~doneWaiting}
       * to know when all added promises have settled.
       *
       * @param {Promise} promise A promise to add to the extend lifetime promises
       *     of the event that triggered the request.
       */
      waitUntil(promise) {
        this._extendLifetimePromises.push(promise);
        return promise;
      }
      /**
       * Returns a promise that resolves once all promises passed to
       * [`waitUntil()`]{@link module:workbox-strategies.StrategyHandler~waitUntil}
       * have settled.
       *
       * Note: any work done after `doneWaiting()` settles should be manually
       * passed to an event's `waitUntil()` method (not this handler's
       * `waitUntil()` method), otherwise the service worker thread my be killed
       * prior to your work completing.
       */
      async doneWaiting() {
        let promise;
        while (promise = this._extendLifetimePromises.shift()) {
          await promise;
        }
      }
      /**
       * Stops running the strategy and immediately resolves any pending
       * `waitUntil()` promises.
       */
      destroy() {
        this._handlerDeferred.resolve();
      }
      /**
       * This method will call cacheWillUpdate on the available plugins (or use
       * status === 200) to determine if the Response is safe and valid to cache.
       *
       * @param {Request} options.request
       * @param {Response} options.response
       * @return {Promise<Response|undefined>}
       *
       * @private
       */
      async _ensureResponseSafeToCache(response) {
        let responseToCache = response;
        let pluginsUsed = false;
        for (const callback of this.iterateCallbacks('cacheWillUpdate')) {
          responseToCache = (await callback({
            request: this.request,
            response: responseToCache,
            event: this.event
          })) || undefined;
          pluginsUsed = true;
          if (!responseToCache) {
            break;
          }
        }
        if (!pluginsUsed) {
          if (responseToCache && responseToCache.status !== 200) {
            responseToCache = undefined;
          }
          if ("production" !== 'production') {
            if (responseToCache) {
              if (responseToCache.status !== 200) {
                if (responseToCache.status === 0) {
                  _logger.logger.warn(`The response for '${this.request.url}' ` + `is an opaque response. The caching strategy that you're ` + `using will not cache opaque responses by default.`);
                } else {
                  _logger.logger.debug(`The response for '${this.request.url}' ` + `returned a status code of '${response.status}' and won't ` + `be cached as a result.`);
                }
              }
            }
          }
        }
        return responseToCache;
      }
    }
    exports.StrategyHandler = StrategyHandler;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/cacheMatchIgnoreParams.js": "tD5t",
    "workbox-core/_private/Deferred.js": "EcMH",
    "workbox-core/_private/executeQuotaErrorCallbacks.js": "m2ff",
    "workbox-core/_private/getFriendlyURL.js": "FrDK",
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/timeout.js": "YPqU",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "./_version.js": "Mf3Z"
  }],
  "BpUC": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Strategy = void 0;
    var _cacheNames = require("workbox-core/_private/cacheNames.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
    var _StrategyHandler = require("./StrategyHandler.js");
    require("./_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * An abstract base class that all other strategy classes must extend from:
     *
     * @memberof module:workbox-strategies
     */
    class Strategy {
      /**
       * Creates a new instance of the strategy and sets all documented option
       * properties as public instance properties.
       *
       * Note: if a custom strategy class extends the base Strategy class and does
       * not need more than these properties, it does not need to define its own
       * constructor.
       *
       * @param {Object} [options]
       * @param {string} [options.cacheName] Cache name to store and retrieve
       * requests. Defaults to the cache names provided by
       * [workbox-core]{@link module:workbox-core.cacheNames}.
       * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
       * to use in conjunction with this caching strategy.
       * @param {Object} [options.fetchOptions] Values passed along to the
       * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
       * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
       * `fetch()` requests made by this strategy.
       * @param {Object} [options.matchOptions] The
       * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
       * for any `cache.match()` or `cache.put()` calls made by this strategy.
       */
      constructor(options = {}) {
        /**
         * Cache name to store and retrieve
         * requests. Defaults to the cache names provided by
         * [workbox-core]{@link module:workbox-core.cacheNames}.
         *
         * @type {string}
         */
        this.cacheName = _cacheNames.cacheNames.getRuntimeName(options.cacheName);
        /**
         * The list
         * [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
         * used by this strategy.
         *
         * @type {Array<Object>}
         */
        this.plugins = options.plugins || [];
        /**
         * Values passed along to the
         * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
         * of all fetch() requests made by this strategy.
         *
         * @type {Object}
         */
        this.fetchOptions = options.fetchOptions;
        /**
         * The
         * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
         * for any `cache.match()` or `cache.put()` calls made by this strategy.
         *
         * @type {Object}
         */
        this.matchOptions = options.matchOptions;
      }
      /**
       * Perform a request strategy and returns a `Promise` that will resolve with
       * a `Response`, invoking all relevant plugin callbacks.
       *
       * When a strategy instance is registered with a Workbox
       * [route]{@link module:workbox-routing.Route}, this method is automatically
       * called when the route matches.
       *
       * Alternatively, this method can be used in a standalone `FetchEvent`
       * listener by passing it to `event.respondWith()`.
       *
       * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
       *     properties listed below.
       * @param {Request|string} options.request A request to run this strategy for.
       * @param {ExtendableEvent} options.event The event associated with the
       *     request.
       * @param {URL} [options.url]
       * @param {*} [options.params]
       */
      handle(options) {
        const [responseDone] = this.handleAll(options);
        return responseDone;
      }
      /**
       * Similar to [`handle()`]{@link module:workbox-strategies.Strategy~handle}, but
       * instead of just returning a `Promise` that resolves to a `Response` it
       * it will return an tuple of [response, done] promises, where the former
       * (`response`) is equivalent to what `handle()` returns, and the latter is a
       * Promise that will resolve once any promises that were added to
       * `event.waitUntil()` as part of performing the strategy have completed.
       *
       * You can await the `done` promise to ensure any extra work performed by
       * the strategy (usually caching responses) completes successfully.
       *
       * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
       *     properties listed below.
       * @param {Request|string} options.request A request to run this strategy for.
       * @param {ExtendableEvent} options.event The event associated with the
       *     request.
       * @param {URL} [options.url]
       * @param {*} [options.params]
       * @return {Array<Promise>} A tuple of [response, done]
       *     promises that can be used to determine when the response resolves as
       *     well as when the handler has completed all its work.
       */
      handleAll(options) {
        // Allow for flexible options to be passed.
        if (options instanceof FetchEvent) {
          options = {
            event: options,
            request: options.request
          };
        }
        const event = options.event;
        const request = typeof options.request === 'string' ? new Request(options.request) : options.request;
        const params = 'params' in options ? options.params : undefined;
        const handler = new _StrategyHandler.StrategyHandler(this, {
          event,
          request,
          params
        });
        const responseDone = this._getResponse(handler, request, event);
        const handlerDone = this._awaitComplete(responseDone, handler, request, event);
        // Return an array of promises, suitable for use with Promise.all().
        return [responseDone, handlerDone];
      }
      async _getResponse(handler, request, event) {
        await handler.runCallbacks('handlerWillStart', {
          event,
          request
        });
        let response = undefined;
        try {
          response = await this._handle(request, handler);
          // The "official" Strategy subclasses all throw this error automatically,
          // but in case a third-party Strategy doesn't, ensure that we have a
          // consistent failure when there's no response or an error response.
          if (!response || response.type === 'error') {
            throw new _WorkboxError.WorkboxError('no-response', {
              url: request.url
            });
          }
        } catch (error) {
          for (const callback of handler.iterateCallbacks('handlerDidError')) {
            response = await callback({
              error,
              event,
              request
            });
            if (response) {
              break;
            }
          }
          if (!response) {
            throw error;
          } else if ("production" !== 'production') {
            _logger.logger.log(`While responding to '${(0, _getFriendlyURL.getFriendlyURL)(request.url)}', ` + `an ${error} error occurred. Using a fallback response provided by ` + `a handlerDidError plugin.`);
          }
        }
        for (const callback of handler.iterateCallbacks('handlerWillRespond')) {
          response = await callback({
            event,
            request,
            response
          });
        }
        return response;
      }
      async _awaitComplete(responseDone, handler, request, event) {
        let response;
        let error;
        try {
          response = await responseDone;
        } catch (error) {
          // Ignore errors, as response errors should be caught via the `response`
          // promise above. The `done` promise will only throw for errors in
          // promises passed to `handler.waitUntil()`.
        }
        try {
          await handler.runCallbacks('handlerDidRespond', {
            event,
            request,
            response
          });
          await handler.doneWaiting();
        } catch (waitUntilError) {
          error = waitUntilError;
        }
        await handler.runCallbacks('handlerDidComplete', {
          event,
          request,
          response,
          error
        });
        handler.destroy();
        if (error) {
          throw error;
        }
      }
    }

    /**
     * Classes extending the `Strategy` based class should implement this method,
     * and leverage the [`handler`]{@link module:workbox-strategies.StrategyHandler}
     * arg to perform all fetching and cache logic, which will ensure all relevant
     * cache, cache options, fetch options and plugins are used (per the current
     * strategy instance).
     *
     * @name _handle
     * @instance
     * @abstract
     * @function
     * @param {Request} request
     * @param {module:workbox-strategies.StrategyHandler} handler
     * @return {Promise<Response>}
     *
     * @memberof module:workbox-strategies.Strategy
     */
    exports.Strategy = Strategy;
  }, {
    "workbox-core/_private/cacheNames.js": "HFbW",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/getFriendlyURL.js": "FrDK",
    "./StrategyHandler.js": "W2RL",
    "./_version.js": "Mf3Z"
  }],
  "BVKR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.messages = void 0;
    var _logger = require("workbox-core/_private/logger.js");
    var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const messages = {
      strategyStart: (strategyName, request) => `Using ${strategyName} to respond to '${(0, _getFriendlyURL.getFriendlyURL)(request.url)}'`,
      printFinalResponse: response => {
        if (response) {
          _logger.logger.groupCollapsed(`View the final response here.`);
          _logger.logger.log(response || '[No response returned]');
          _logger.logger.groupEnd();
        }
      }
    };
    exports.messages = messages;
  }, {
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/getFriendlyURL.js": "FrDK",
    "../_version.js": "Mf3Z"
  }],
  "OIcM": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StaleWhileRevalidate = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _cacheOkAndOpaquePlugin = require("./plugins/cacheOkAndOpaquePlugin.js");
    var _Strategy = require("./Strategy.js");
    var _messages = require("./utils/messages.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * An implementation of a
     * [stale-while-revalidate]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate}
     * request strategy.
     *
     * Resources are requested from both the cache and the network in parallel.
     * The strategy will respond with the cached version if available, otherwise
     * wait for the network response. The cache is updated with the network response
     * with each successful request.
     *
     * By default, this strategy will cache responses with a 200 status code as
     * well as [opaque responses]{@link https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests}.
     * Opaque responses are cross-origin requests where the response doesn't
     * support [CORS]{@link https://enable-cors.org/}.
     *
     * If the network request fails, and there is no cache match, this will throw
     * a `WorkboxError` exception.
     *
     * @extends module:workbox-strategies.Strategy
     * @memberof module:workbox-strategies
     */
    class StaleWhileRevalidate extends _Strategy.Strategy {
      /**
       * @param {Object} [options]
       * @param {string} [options.cacheName] Cache name to store and retrieve
       * requests. Defaults to cache names provided by
       * [workbox-core]{@link module:workbox-core.cacheNames}.
       * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
       * to use in conjunction with this caching strategy.
       * @param {Object} [options.fetchOptions] Values passed along to the
       * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
       * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
       * `fetch()` requests made by this strategy.
       * @param {Object} [options.matchOptions] [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
       */
      constructor(options) {
        super(options);
        // If this instance contains no plugins with a 'cacheWillUpdate' callback,
        // prepend the `cacheOkAndOpaquePlugin` plugin to the plugins list.
        if (!this.plugins.some(p => 'cacheWillUpdate' in p)) {
          this.plugins.unshift(_cacheOkAndOpaquePlugin.cacheOkAndOpaquePlugin);
        }
      }
      /**
       * @private
       * @param {Request|string} request A request to run this strategy for.
       * @param {module:workbox-strategies.StrategyHandler} handler The event that
       *     triggered the request.
       * @return {Promise<Response>}
       */
      async _handle(request, handler) {
        const logs = [];
        if ("production" !== 'production') {
          _assert.assert.isInstance(request, Request, {
            moduleName: 'workbox-strategies',
            className: this.constructor.name,
            funcName: 'handle',
            paramName: 'request'
          });
        }
        const fetchAndCachePromise = handler.fetchAndCachePut(request).catch(() => {
          // Swallow this error because a 'no-response' error will be thrown in
          // main handler return flow. This will be in the `waitUntil()` flow.
        });
        let response = await handler.cacheMatch(request);
        let error;
        if (response) {
          if ("production" !== 'production') {
            logs.push(`Found a cached response in the '${this.cacheName}'` + ` cache. Will update with the network response in the background.`);
          }
        } else {
          if ("production" !== 'production') {
            logs.push(`No response found in the '${this.cacheName}' cache. ` + `Will wait for the network response.`);
          }
          try {
            // NOTE(philipwalton): Really annoying that we have to type cast here.
            // https://github.com/microsoft/TypeScript/issues/20006
            response = await fetchAndCachePromise;
          } catch (err) {
            error = err;
          }
        }
        if ("production" !== 'production') {
          _logger.logger.groupCollapsed(_messages.messages.strategyStart(this.constructor.name, request));
          for (const log of logs) {
            _logger.logger.log(log);
          }
          _messages.messages.printFinalResponse(response);
          _logger.logger.groupEnd();
        }
        if (!response) {
          throw new _WorkboxError.WorkboxError('no-response', {
            url: request.url,
            error
          });
        }
        return response;
      }
    }
    exports.StaleWhileRevalidate = StaleWhileRevalidate;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "./plugins/cacheOkAndOpaquePlugin.js": "XnCC",
    "./Strategy.js": "BpUC",
    "./utils/messages.js": "BVKR",
    "./_version.js": "Mf3Z"
  }],
  "jY2Q": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CacheFirst = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _Strategy = require("./Strategy.js");
    var _messages = require("./utils/messages.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * An implementation of a [cache-first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network}
     * request strategy.
     *
     * A cache first strategy is useful for assets that have been revisioned,
     * such as URLs like `/styles/example.a8f5f1.css`, since they
     * can be cached for long periods of time.
     *
     * If the network request fails, and there is no cache match, this will throw
     * a `WorkboxError` exception.
     *
     * @extends module:workbox-strategies.Strategy
     * @memberof module:workbox-strategies
     */
    class CacheFirst extends _Strategy.Strategy {
      /**
       * @private
       * @param {Request|string} request A request to run this strategy for.
       * @param {module:workbox-strategies.StrategyHandler} handler The event that
       *     triggered the request.
       * @return {Promise<Response>}
       */
      async _handle(request, handler) {
        const logs = [];
        if ("production" !== 'production') {
          _assert.assert.isInstance(request, Request, {
            moduleName: 'workbox-strategies',
            className: this.constructor.name,
            funcName: 'makeRequest',
            paramName: 'request'
          });
        }
        let response = await handler.cacheMatch(request);
        let error;
        if (!response) {
          if ("production" !== 'production') {
            logs.push(`No response found in the '${this.cacheName}' cache. ` + `Will respond with a network request.`);
          }
          try {
            response = await handler.fetchAndCachePut(request);
          } catch (err) {
            error = err;
          }
          if ("production" !== 'production') {
            if (response) {
              logs.push(`Got response from network.`);
            } else {
              logs.push(`Unable to get a response from the network.`);
            }
          }
        } else {
          if ("production" !== 'production') {
            logs.push(`Found a cached response in the '${this.cacheName}' cache.`);
          }
        }
        if ("production" !== 'production') {
          _logger.logger.groupCollapsed(_messages.messages.strategyStart(this.constructor.name, request));
          for (const log of logs) {
            _logger.logger.log(log);
          }
          _messages.messages.printFinalResponse(response);
          _logger.logger.groupEnd();
        }
        if (!response) {
          throw new _WorkboxError.WorkboxError('no-response', {
            url: request.url,
            error
          });
        }
        return response;
      }
    }
    exports.CacheFirst = CacheFirst;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "./Strategy.js": "BpUC",
    "./utils/messages.js": "BVKR",
    "./_version.js": "Mf3Z"
  }],
  "wzmZ": [function (require, module, exports) {
    "use strict";

    // @ts-ignore
    try {
      self['workbox:cacheable-response:6.1.5'] && _();
    } catch (e) {}
  }, {}],
  "GuuX": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CacheableResponse = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
    var _logger = require("workbox-core/_private/logger.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * This class allows you to set up rules determining what
     * status codes and/or headers need to be present in order for a
     * [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)
     * to be considered cacheable.
     *
     * @memberof module:workbox-cacheable-response
     */
    class CacheableResponse {
      /**
       * To construct a new CacheableResponse instance you must provide at least
       * one of the `config` properties.
       *
       * If both `statuses` and `headers` are specified, then both conditions must
       * be met for the `Response` to be considered cacheable.
       *
       * @param {Object} config
       * @param {Array<number>} [config.statuses] One or more status codes that a
       * `Response` can have and be considered cacheable.
       * @param {Object<string,string>} [config.headers] A mapping of header names
       * and expected values that a `Response` can have and be considered cacheable.
       * If multiple headers are provided, only one needs to be present.
       */
      constructor(config = {}) {
        if ("production" !== 'production') {
          if (!(config.statuses || config.headers)) {
            throw new _WorkboxError.WorkboxError('statuses-or-headers-required', {
              moduleName: 'workbox-cacheable-response',
              className: 'CacheableResponse',
              funcName: 'constructor'
            });
          }
          if (config.statuses) {
            _assert.assert.isArray(config.statuses, {
              moduleName: 'workbox-cacheable-response',
              className: 'CacheableResponse',
              funcName: 'constructor',
              paramName: 'config.statuses'
            });
          }
          if (config.headers) {
            _assert.assert.isType(config.headers, 'object', {
              moduleName: 'workbox-cacheable-response',
              className: 'CacheableResponse',
              funcName: 'constructor',
              paramName: 'config.headers'
            });
          }
        }
        this._statuses = config.statuses;
        this._headers = config.headers;
      }
      /**
       * Checks a response to see whether it's cacheable or not, based on this
       * object's configuration.
       *
       * @param {Response} response The response whose cacheability is being
       * checked.
       * @return {boolean} `true` if the `Response` is cacheable, and `false`
       * otherwise.
       */
      isResponseCacheable(response) {
        if ("production" !== 'production') {
          _assert.assert.isInstance(response, Response, {
            moduleName: 'workbox-cacheable-response',
            className: 'CacheableResponse',
            funcName: 'isResponseCacheable',
            paramName: 'response'
          });
        }
        let cacheable = true;
        if (this._statuses) {
          cacheable = this._statuses.includes(response.status);
        }
        if (this._headers && cacheable) {
          cacheable = Object.keys(this._headers).some(headerName => {
            return response.headers.get(headerName) === this._headers[headerName];
          });
        }
        if ("production" !== 'production') {
          if (!cacheable) {
            _logger.logger.groupCollapsed(`The request for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(response.url)}' returned a response that does ` + `not meet the criteria for being cached.`);
            _logger.logger.groupCollapsed(`View cacheability criteria here.`);
            _logger.logger.log(`Cacheable statuses: ` + JSON.stringify(this._statuses));
            _logger.logger.log(`Cacheable headers: ` + JSON.stringify(this._headers, null, 2));
            _logger.logger.groupEnd();
            const logFriendlyHeaders = {};
            response.headers.forEach((value, key) => {
              logFriendlyHeaders[key] = value;
            });
            _logger.logger.groupCollapsed(`View response status and headers here.`);
            _logger.logger.log(`Response status: ` + response.status);
            _logger.logger.log(`Response headers: ` + JSON.stringify(logFriendlyHeaders, null, 2));
            _logger.logger.groupEnd();
            _logger.logger.groupCollapsed(`View full response details here.`);
            _logger.logger.log(response.headers);
            _logger.logger.log(response);
            _logger.logger.groupEnd();
            _logger.logger.groupEnd();
          }
        }
        return cacheable;
      }
    }
    exports.CacheableResponse = CacheableResponse;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "workbox-core/_private/getFriendlyURL.js": "FrDK",
    "workbox-core/_private/logger.js": "uWXV",
    "./_version.js": "wzmZ"
  }],
  "QlRw": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CacheableResponsePlugin = void 0;
    var _CacheableResponse = require("./CacheableResponse.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * A class implementing the `cacheWillUpdate` lifecycle callback. This makes it
     * easier to add in cacheability checks to requests made via Workbox's built-in
     * strategies.
     *
     * @memberof module:workbox-cacheable-response
     */
    class CacheableResponsePlugin {
      /**
       * To construct a new CacheableResponsePlugin instance you must provide at
       * least one of the `config` properties.
       *
       * If both `statuses` and `headers` are specified, then both conditions must
       * be met for the `Response` to be considered cacheable.
       *
       * @param {Object} config
       * @param {Array<number>} [config.statuses] One or more status codes that a
       * `Response` can have and be considered cacheable.
       * @param {Object<string,string>} [config.headers] A mapping of header names
       * and expected values that a `Response` can have and be considered cacheable.
       * If multiple headers are provided, only one needs to be present.
       */
      constructor(config) {
        /**
         * @param {Object} options
         * @param {Response} options.response
         * @return {Response|null}
         * @private
         */
        this.cacheWillUpdate = async ({
          response
        }) => {
          if (this._cacheableResponse.isResponseCacheable(response)) {
            return response;
          }
          return null;
        };
        this._cacheableResponse = new _CacheableResponse.CacheableResponse(config);
      }
    }
    exports.CacheableResponsePlugin = CacheableResponsePlugin;
  }, {
    "./CacheableResponse.js": "GuuX",
    "./_version.js": "wzmZ"
  }],
  "kdcg": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.dontWaitFor = dontWaitFor;
    require("../_version.js");
    /*
      Copyright 2019 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * A helper function that prevents a promise from being flagged as unused.
     *
     * @private
     **/
    function dontWaitFor(promise) {
      // Effective no-op.
      promise.then(() => {});
    }
  }, {
    "../_version.js": "ViJI"
  }],
  "BomW": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.registerQuotaErrorCallback = registerQuotaErrorCallback;
    var _logger = require("./_private/logger.js");
    var _assert = require("./_private/assert.js");
    var _quotaErrorCallbacks = require("./models/quotaErrorCallbacks.js");
    require("./_version.js");
    /*
      Copyright 2019 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * Adds a function to the set of quotaErrorCallbacks that will be executed if
     * there's a quota error.
     *
     * @param {Function} callback
     * @memberof module:workbox-core
     */
    function registerQuotaErrorCallback(callback) {
      if ("production" !== 'production') {
        _assert.assert.isType(callback, 'function', {
          moduleName: 'workbox-core',
          funcName: 'register',
          paramName: 'callback'
        });
      }
      _quotaErrorCallbacks.quotaErrorCallbacks.add(callback);
      if ("production" !== 'production') {
        _logger.logger.log('Registered a callback to respond to quota errors.', callback);
      }
    }
  }, {
    "./_private/logger.js": "uWXV",
    "./_private/assert.js": "mFVs",
    "./models/quotaErrorCallbacks.js": "cG08",
    "./_version.js": "ViJI"
  }],
  "biut": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DBWrapper = void 0;
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * A class that wraps common IndexedDB functionality in a promise-based API.
     * It exposes all the underlying power and functionality of IndexedDB, but
     * wraps the most commonly used features in a way that's much simpler to use.
     *
     * @private
     */
    class DBWrapper {
      /**
       * @param {string} name
       * @param {number} version
       * @param {Object=} [callback]
       * @param {!Function} [callbacks.onupgradeneeded]
       * @param {!Function} [callbacks.onversionchange] Defaults to
       *     DBWrapper.prototype._onversionchange when not specified.
       * @private
       */
      constructor(name, version, {
        onupgradeneeded,
        onversionchange
      } = {}) {
        this._db = null;
        this._name = name;
        this._version = version;
        this._onupgradeneeded = onupgradeneeded;
        this._onversionchange = onversionchange || (() => this.close());
      }
      /**
       * Returns the IDBDatabase instance (not normally needed).
       * @return {IDBDatabase|undefined}
       *
       * @private
       */
      get db() {
        return this._db;
      }
      /**
       * Opens a connected to an IDBDatabase, invokes any onupgradedneeded
       * callback, and added an onversionchange callback to the database.
       *
       * @return {IDBDatabase}
       * @private
       */
      async open() {
        if (this._db) return;
        this._db = await new Promise((resolve, reject) => {
          // This flag is flipped to true if the timeout callback runs prior
          // to the request failing or succeeding. Note: we use a timeout instead
          // of an onblocked handler since there are cases where onblocked will
          // never never run. A timeout better handles all possible scenarios:
          // https://github.com/w3c/IndexedDB/issues/223
          let openRequestTimedOut = false;
          setTimeout(() => {
            openRequestTimedOut = true;
            reject(new Error('The open request was blocked and timed out'));
          }, this.OPEN_TIMEOUT);
          const openRequest = indexedDB.open(this._name, this._version);
          openRequest.onerror = () => reject(openRequest.error);
          openRequest.onupgradeneeded = evt => {
            if (openRequestTimedOut) {
              openRequest.transaction.abort();
              openRequest.result.close();
            } else if (typeof this._onupgradeneeded === 'function') {
              this._onupgradeneeded(evt);
            }
          };
          openRequest.onsuccess = () => {
            const db = openRequest.result;
            if (openRequestTimedOut) {
              db.close();
            } else {
              db.onversionchange = this._onversionchange.bind(this);
              resolve(db);
            }
          };
        });
        return this;
      }
      /**
       * Polyfills the native `getKey()` method. Note, this is overridden at
       * runtime if the browser supports the native method.
       *
       * @param {string} storeName
       * @param {*} query
       * @return {Array}
       * @private
       */
      async getKey(storeName, query) {
        return (await this.getAllKeys(storeName, query, 1))[0];
      }
      /**
       * Polyfills the native `getAll()` method. Note, this is overridden at
       * runtime if the browser supports the native method.
       *
       * @param {string} storeName
       * @param {*} query
       * @param {number} count
       * @return {Array}
       * @private
       */
      async getAll(storeName, query, count) {
        return await this.getAllMatching(storeName, {
          query,
          count
        });
      }
      /**
       * Polyfills the native `getAllKeys()` method. Note, this is overridden at
       * runtime if the browser supports the native method.
       *
       * @param {string} storeName
       * @param {*} query
       * @param {number} count
       * @return {Array}
       * @private
       */
      async getAllKeys(storeName, query, count) {
        const entries = await this.getAllMatching(storeName, {
          query,
          count,
          includeKeys: true
        });
        return entries.map(entry => entry.key);
      }
      /**
       * Supports flexible lookup in an object store by specifying an index,
       * query, direction, and count. This method returns an array of objects
       * with the signature .
       *
       * @param {string} storeName
       * @param {Object} [opts]
       * @param {string} [opts.index] The index to use (if specified).
       * @param {*} [opts.query]
       * @param {IDBCursorDirection} [opts.direction]
       * @param {number} [opts.count] The max number of results to return.
       * @param {boolean} [opts.includeKeys] When true, the structure of the
       *     returned objects is changed from an array of values to an array of
       *     objects in the form {key, primaryKey, value}.
       * @return {Array}
       * @private
       */
      async getAllMatching(storeName, {
        index,
        query = null,
        // IE/Edge errors if query === `undefined`.
        direction = 'next',
        count,
        includeKeys = false
      } = {}) {
        return await this.transaction([storeName], 'readonly', (txn, done) => {
          const store = txn.objectStore(storeName);
          const target = index ? store.index(index) : store;
          const results = [];
          const request = target.openCursor(query, direction);
          request.onsuccess = () => {
            const cursor = request.result;
            if (cursor) {
              results.push(includeKeys ? cursor : cursor.value);
              if (count && results.length >= count) {
                done(results);
              } else {
                cursor.continue();
              }
            } else {
              done(results);
            }
          };
        });
      }
      /**
       * Accepts a list of stores, a transaction type, and a callback and
       * performs a transaction. A promise is returned that resolves to whatever
       * value the callback chooses. The callback holds all the transaction logic
       * and is invoked with two arguments:
       *   1. The IDBTransaction object
       *   2. A `done` function, that's used to resolve the promise when
       *      when the transaction is done, if passed a value, the promise is
       *      resolved to that value.
       *
       * @param {Array<string>} storeNames An array of object store names
       *     involved in the transaction.
       * @param {string} type Can be `readonly` or `readwrite`.
       * @param {!Function} callback
       * @return {*} The result of the transaction ran by the callback.
       * @private
       */
      async transaction(storeNames, type, callback) {
        await this.open();
        return await new Promise((resolve, reject) => {
          const txn = this._db.transaction(storeNames, type);
          txn.onabort = () => reject(txn.error);
          txn.oncomplete = () => resolve();
          callback(txn, value => resolve(value));
        });
      }
      /**
       * Delegates async to a native IDBObjectStore method.
       *
       * @param {string} method The method name.
       * @param {string} storeName The object store name.
       * @param {string} type Can be `readonly` or `readwrite`.
       * @param {...*} args The list of args to pass to the native method.
       * @return {*} The result of the transaction.
       * @private
       */
      async _call(method, storeName, type, ...args) {
        const callback = (txn, done) => {
          const objStore = txn.objectStore(storeName);
          // TODO(philipwalton): Fix this underlying TS2684 error.
          // @ts-ignore
          const request = objStore[method].apply(objStore, args);
          request.onsuccess = () => done(request.result);
        };
        return await this.transaction([storeName], type, callback);
      }
      /**
       * Closes the connection opened by `DBWrapper.open()`. Generally this method
       * doesn't need to be called since:
       *   1. It's usually better to keep a connection open since opening
       *      a new connection is somewhat slow.
       *   2. Connections are automatically closed when the reference is
       *      garbage collected.
       * The primary use case for needing to close a connection is when another
       * reference (typically in another tab) needs to upgrade it and would be
       * blocked by the current, open connection.
       *
       * @private
       */
      close() {
        if (this._db) {
          this._db.close();
          this._db = null;
        }
      }
    }
    // Exposed on the prototype to let users modify the default timeout on a
    // per-instance or global basis.
    exports.DBWrapper = DBWrapper;
    DBWrapper.prototype.OPEN_TIMEOUT = 2000;
    // Wrap native IDBObjectStore methods according to their mode.
    const methodsToWrap = {
      readonly: ['get', 'count', 'getKey', 'getAll', 'getAllKeys'],
      readwrite: ['add', 'put', 'clear', 'delete']
    };
    for (const [mode, methods] of Object.entries(methodsToWrap)) {
      for (const method of methods) {
        if (method in IDBObjectStore.prototype) {
          // Don't use arrow functions here since we're outside of the class.
          DBWrapper.prototype[method] = async function (storeName, ...args) {
            return await this._call(method, storeName, mode, ...args);
          };
        }
      }
    }
  }, {
    "../_version.js": "ViJI"
  }],
  "Yn1l": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.deleteDatabase = void 0;
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * Deletes the database.
     * Note: this is exported separately from the DBWrapper module because most
     * usages of IndexedDB in workbox dont need deleting, and this way it can be
     * reused in tests to delete databases without creating DBWrapper instances.
     *
     * @param {string} name The database name.
     * @private
     */
    const deleteDatabase = async name => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(name);
        request.onerror = () => {
          reject(request.error);
        };
        request.onblocked = () => {
          reject(new Error('Delete blocked'));
        };
        request.onsuccess = () => {
          resolve();
        };
      });
    };
    exports.deleteDatabase = deleteDatabase;
  }, {
    "../_version.js": "ViJI"
  }],
  "GYlP": [function (require, module, exports) {
    "use strict";

    // @ts-ignore
    try {
      self['workbox:expiration:6.1.5'] && _();
    } catch (e) {}
  }, {}],
  "MSee": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CacheTimestampsModel = void 0;
    var _DBWrapper = require("workbox-core/_private/DBWrapper.js");
    var _deleteDatabase = require("workbox-core/_private/deleteDatabase.js");
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const DB_NAME = 'workbox-expiration';
    const OBJECT_STORE_NAME = 'cache-entries';
    const normalizeURL = unNormalizedUrl => {
      const url = new URL(unNormalizedUrl, location.href);
      url.hash = '';
      return url.href;
    };
    /**
     * Returns the timestamp model.
     *
     * @private
     */
    class CacheTimestampsModel {
      /**
       *
       * @param {string} cacheName
       *
       * @private
       */
      constructor(cacheName) {
        this._cacheName = cacheName;
        this._db = new _DBWrapper.DBWrapper(DB_NAME, 1, {
          onupgradeneeded: event => this._handleUpgrade(event)
        });
      }
      /**
       * Should perform an upgrade of indexedDB.
       *
       * @param {Event} event
       *
       * @private
       */
      _handleUpgrade(event) {
        const db = event.target.result;
        // TODO(philipwalton): EdgeHTML doesn't support arrays as a keyPath, so we
        // have to use the `id` keyPath here and create our own values (a
        // concatenation of `url + cacheName`) instead of simply using
        // `keyPath: ['url', 'cacheName']`, which is supported in other browsers.
        const objStore = db.createObjectStore(OBJECT_STORE_NAME, {
          keyPath: 'id'
        });
        // TODO(philipwalton): once we don't have to support EdgeHTML, we can
        // create a single index with the keyPath `['cacheName', 'timestamp']`
        // instead of doing both these indexes.
        objStore.createIndex('cacheName', 'cacheName', {
          unique: false
        });
        objStore.createIndex('timestamp', 'timestamp', {
          unique: false
        });
        // Previous versions of `workbox-expiration` used `this._cacheName`
        // as the IDBDatabase name.
        (0, _deleteDatabase.deleteDatabase)(this._cacheName);
      }
      /**
       * @param {string} url
       * @param {number} timestamp
       *
       * @private
       */
      async setTimestamp(url, timestamp) {
        url = normalizeURL(url);
        const entry = {
          url,
          timestamp,
          cacheName: this._cacheName,
          // Creating an ID from the URL and cache name won't be necessary once
          // Edge switches to Chromium and all browsers we support work with
          // array keyPaths.
          id: this._getId(url)
        };
        await this._db.put(OBJECT_STORE_NAME, entry);
      }
      /**
       * Returns the timestamp stored for a given URL.
       *
       * @param {string} url
       * @return {number}
       *
       * @private
       */
      async getTimestamp(url) {
        const entry = await this._db.get(OBJECT_STORE_NAME, this._getId(url));
        return entry.timestamp;
      }
      /**
       * Iterates through all the entries in the object store (from newest to
       * oldest) and removes entries once either `maxCount` is reached or the
       * entry's timestamp is less than `minTimestamp`.
       *
       * @param {number} minTimestamp
       * @param {number} maxCount
       * @return {Array<string>}
       *
       * @private
       */
      async expireEntries(minTimestamp, maxCount) {
        const entriesToDelete = await this._db.transaction(OBJECT_STORE_NAME, 'readwrite', (txn, done) => {
          const store = txn.objectStore(OBJECT_STORE_NAME);
          const request = store.index('timestamp').openCursor(null, 'prev');
          const entriesToDelete = [];
          let entriesNotDeletedCount = 0;
          request.onsuccess = () => {
            const cursor = request.result;
            if (cursor) {
              const result = cursor.value;
              // TODO(philipwalton): once we can use a multi-key index, we
              // won't have to check `cacheName` here.
              if (result.cacheName === this._cacheName) {
                // Delete an entry if it's older than the max age or
                // if we already have the max number allowed.
                if (minTimestamp && result.timestamp < minTimestamp || maxCount && entriesNotDeletedCount >= maxCount) {
                  // TODO(philipwalton): we should be able to delete the
                  // entry right here, but doing so causes an iteration
                  // bug in Safari stable (fixed in TP). Instead we can
                  // store the keys of the entries to delete, and then
                  // delete the separate transactions.
                  // https://github.com/GoogleChrome/workbox/issues/1978
                  // cursor.delete();
                  // We only need to return the URL, not the whole entry.
                  entriesToDelete.push(cursor.value);
                } else {
                  entriesNotDeletedCount++;
                }
              }
              cursor.continue();
            } else {
              done(entriesToDelete);
            }
          };
        });
        // TODO(philipwalton): once the Safari bug in the following issue is fixed,
        // we should be able to remove this loop and do the entry deletion in the
        // cursor loop above:
        // https://github.com/GoogleChrome/workbox/issues/1978
        const urlsDeleted = [];
        for (const entry of entriesToDelete) {
          await this._db.delete(OBJECT_STORE_NAME, entry.id);
          urlsDeleted.push(entry.url);
        }
        return urlsDeleted;
      }
      /**
       * Takes a URL and returns an ID that will be unique in the object store.
       *
       * @param {string} url
       * @return {string}
       *
       * @private
       */
      _getId(url) {
        // Creating an ID from the URL and cache name won't be necessary once
        // Edge switches to Chromium and all browsers we support work with
        // array keyPaths.
        return this._cacheName + '|' + normalizeURL(url);
      }
    }
    exports.CacheTimestampsModel = CacheTimestampsModel;
  }, {
    "workbox-core/_private/DBWrapper.js": "biut",
    "workbox-core/_private/deleteDatabase.js": "Yn1l",
    "../_version.js": "GYlP"
  }],
  "Nq5x": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CacheExpiration = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _dontWaitFor = require("workbox-core/_private/dontWaitFor.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _CacheTimestampsModel = require("./models/CacheTimestampsModel.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * The `CacheExpiration` class allows you define an expiration and / or
     * limit on the number of responses stored in a
     * [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
     *
     * @memberof module:workbox-expiration
     */
    class CacheExpiration {
      /**
       * To construct a new CacheExpiration instance you must provide at least
       * one of the `config` properties.
       *
       * @param {string} cacheName Name of the cache to apply restrictions to.
       * @param {Object} config
       * @param {number} [config.maxEntries] The maximum number of entries to cache.
       * Entries used the least will be removed as the maximum is reached.
       * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
       * it's treated as stale and removed.
       * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
       * that will be used when calling `delete()` on the cache.
       */
      constructor(cacheName, config = {}) {
        this._isRunning = false;
        this._rerunRequested = false;
        if ("production" !== 'production') {
          _assert.assert.isType(cacheName, 'string', {
            moduleName: 'workbox-expiration',
            className: 'CacheExpiration',
            funcName: 'constructor',
            paramName: 'cacheName'
          });
          if (!(config.maxEntries || config.maxAgeSeconds)) {
            throw new _WorkboxError.WorkboxError('max-entries-or-age-required', {
              moduleName: 'workbox-expiration',
              className: 'CacheExpiration',
              funcName: 'constructor'
            });
          }
          if (config.maxEntries) {
            _assert.assert.isType(config.maxEntries, 'number', {
              moduleName: 'workbox-expiration',
              className: 'CacheExpiration',
              funcName: 'constructor',
              paramName: 'config.maxEntries'
            });
          }
          if (config.maxAgeSeconds) {
            _assert.assert.isType(config.maxAgeSeconds, 'number', {
              moduleName: 'workbox-expiration',
              className: 'CacheExpiration',
              funcName: 'constructor',
              paramName: 'config.maxAgeSeconds'
            });
          }
        }
        this._maxEntries = config.maxEntries;
        this._maxAgeSeconds = config.maxAgeSeconds;
        this._matchOptions = config.matchOptions;
        this._cacheName = cacheName;
        this._timestampModel = new _CacheTimestampsModel.CacheTimestampsModel(cacheName);
      }
      /**
       * Expires entries for the given cache and given criteria.
       */
      async expireEntries() {
        if (this._isRunning) {
          this._rerunRequested = true;
          return;
        }
        this._isRunning = true;
        const minTimestamp = this._maxAgeSeconds ? Date.now() - this._maxAgeSeconds * 1000 : 0;
        const urlsExpired = await this._timestampModel.expireEntries(minTimestamp, this._maxEntries);
        // Delete URLs from the cache
        const cache = await self.caches.open(this._cacheName);
        for (const url of urlsExpired) {
          await cache.delete(url, this._matchOptions);
        }
        if ("production" !== 'production') {
          if (urlsExpired.length > 0) {
            _logger.logger.groupCollapsed(`Expired ${urlsExpired.length} ` + `${urlsExpired.length === 1 ? 'entry' : 'entries'} and removed ` + `${urlsExpired.length === 1 ? 'it' : 'them'} from the ` + `'${this._cacheName}' cache.`);
            _logger.logger.log(`Expired the following ${urlsExpired.length === 1 ? 'URL' : 'URLs'}:`);
            urlsExpired.forEach(url => _logger.logger.log(`    ${url}`));
            _logger.logger.groupEnd();
          } else {
            _logger.logger.debug(`Cache expiration ran and found no entries to remove.`);
          }
        }
        this._isRunning = false;
        if (this._rerunRequested) {
          this._rerunRequested = false;
          (0, _dontWaitFor.dontWaitFor)(this.expireEntries());
        }
      }
      /**
       * Update the timestamp for the given URL. This ensures the when
       * removing entries based on maximum entries, most recently used
       * is accurate or when expiring, the timestamp is up-to-date.
       *
       * @param {string} url
       */
      async updateTimestamp(url) {
        if ("production" !== 'production') {
          _assert.assert.isType(url, 'string', {
            moduleName: 'workbox-expiration',
            className: 'CacheExpiration',
            funcName: 'updateTimestamp',
            paramName: 'url'
          });
        }
        await this._timestampModel.setTimestamp(url, Date.now());
      }
      /**
       * Can be used to check if a URL has expired or not before it's used.
       *
       * This requires a look up from IndexedDB, so can be slow.
       *
       * Note: This method will not remove the cached entry, call
       * `expireEntries()` to remove indexedDB and Cache entries.
       *
       * @param {string} url
       * @return {boolean}
       */
      async isURLExpired(url) {
        if (!this._maxAgeSeconds) {
          if ("production" !== 'production') {
            throw new _WorkboxError.WorkboxError(`expired-test-without-max-age`, {
              methodName: 'isURLExpired',
              paramName: 'maxAgeSeconds'
            });
          }
          return false;
        } else {
          const timestamp = await this._timestampModel.getTimestamp(url);
          const expireOlderThan = Date.now() - this._maxAgeSeconds * 1000;
          return timestamp < expireOlderThan;
        }
      }
      /**
       * Removes the IndexedDB object store used to keep track of cache expiration
       * metadata.
       */
      async delete() {
        // Make sure we don't attempt another rerun if we're called in the middle of
        // a cache expiration.
        this._rerunRequested = false;
        await this._timestampModel.expireEntries(Infinity); // Expires all.
      }
    }

    exports.CacheExpiration = CacheExpiration;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/dontWaitFor.js": "kdcg",
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "./models/CacheTimestampsModel.js": "MSee",
    "./_version.js": "GYlP"
  }],
  "PZ8a": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ExpirationPlugin = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _cacheNames = require("workbox-core/_private/cacheNames.js");
    var _dontWaitFor = require("workbox-core/_private/dontWaitFor.js");
    var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _registerQuotaErrorCallback = require("workbox-core/registerQuotaErrorCallback.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _CacheExpiration = require("./CacheExpiration.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * This plugin can be used in a `workbox-strategy` to regularly enforce a
     * limit on the age and / or the number of cached requests.
     *
     * It can only be used with `workbox-strategy` instances that have a
     * [custom `cacheName` property set](/web/tools/workbox/guides/configure-workbox#custom_cache_names_in_strategies).
     * In other words, it can't be used to expire entries in strategy that uses the
     * default runtime cache name.
     *
     * Whenever a cached request is used or updated, this plugin will look
     * at the associated cache and remove any old or extra requests.
     *
     * When using `maxAgeSeconds`, requests may be used *once* after expiring
     * because the expiration clean up will not have occurred until *after* the
     * cached request has been used. If the request has a "Date" header, then
     * a light weight expiration check is performed and the request will not be
     * used immediately.
     *
     * When using `maxEntries`, the entry least-recently requested will be removed
     * from the cache first.
     *
     * @memberof module:workbox-expiration
     */
    class ExpirationPlugin {
      /**
       * @param {Object} config
       * @param {number} [config.maxEntries] The maximum number of entries to cache.
       * Entries used the least will be removed as the maximum is reached.
       * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
       * it's treated as stale and removed.
       * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
       * that will be used when calling `delete()` on the cache.
       * @param {boolean} [config.purgeOnQuotaError] Whether to opt this cache in to
       * automatic deletion if the available storage quota has been exceeded.
       */
      constructor(config = {}) {
        /**
         * A "lifecycle" callback that will be triggered automatically by the
         * `workbox-strategies` handlers when a `Response` is about to be returned
         * from a [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) to
         * the handler. It allows the `Response` to be inspected for freshness and
         * prevents it from being used if the `Response`'s `Date` header value is
         * older than the configured `maxAgeSeconds`.
         *
         * @param {Object} options
         * @param {string} options.cacheName Name of the cache the response is in.
         * @param {Response} options.cachedResponse The `Response` object that's been
         *     read from a cache and whose freshness should be checked.
         * @return {Response} Either the `cachedResponse`, if it's
         *     fresh, or `null` if the `Response` is older than `maxAgeSeconds`.
         *
         * @private
         */
        this.cachedResponseWillBeUsed = async ({
          event,
          request,
          cacheName,
          cachedResponse
        }) => {
          if (!cachedResponse) {
            return null;
          }
          const isFresh = this._isResponseDateFresh(cachedResponse);
          // Expire entries to ensure that even if the expiration date has
          // expired, it'll only be used once.
          const cacheExpiration = this._getCacheExpiration(cacheName);
          (0, _dontWaitFor.dontWaitFor)(cacheExpiration.expireEntries());
          // Update the metadata for the request URL to the current timestamp,
          // but don't `await` it as we don't want to block the response.
          const updateTimestampDone = cacheExpiration.updateTimestamp(request.url);
          if (event) {
            try {
              event.waitUntil(updateTimestampDone);
            } catch (error) {
              if ("production" !== 'production') {
                // The event may not be a fetch event; only log the URL if it is.
                if ('request' in event) {
                  _logger.logger.warn(`Unable to ensure service worker stays alive when ` + `updating cache entry for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(event.request.url)}'.`);
                }
              }
            }
          }
          return isFresh ? cachedResponse : null;
        };
        /**
         * A "lifecycle" callback that will be triggered automatically by the
         * `workbox-strategies` handlers when an entry is added to a cache.
         *
         * @param {Object} options
         * @param {string} options.cacheName Name of the cache that was updated.
         * @param {string} options.request The Request for the cached entry.
         *
         * @private
         */
        this.cacheDidUpdate = async ({
          cacheName,
          request
        }) => {
          if ("production" !== 'production') {
            _assert.assert.isType(cacheName, 'string', {
              moduleName: 'workbox-expiration',
              className: 'Plugin',
              funcName: 'cacheDidUpdate',
              paramName: 'cacheName'
            });
            _assert.assert.isInstance(request, Request, {
              moduleName: 'workbox-expiration',
              className: 'Plugin',
              funcName: 'cacheDidUpdate',
              paramName: 'request'
            });
          }
          const cacheExpiration = this._getCacheExpiration(cacheName);
          await cacheExpiration.updateTimestamp(request.url);
          await cacheExpiration.expireEntries();
        };
        if ("production" !== 'production') {
          if (!(config.maxEntries || config.maxAgeSeconds)) {
            throw new _WorkboxError.WorkboxError('max-entries-or-age-required', {
              moduleName: 'workbox-expiration',
              className: 'Plugin',
              funcName: 'constructor'
            });
          }
          if (config.maxEntries) {
            _assert.assert.isType(config.maxEntries, 'number', {
              moduleName: 'workbox-expiration',
              className: 'Plugin',
              funcName: 'constructor',
              paramName: 'config.maxEntries'
            });
          }
          if (config.maxAgeSeconds) {
            _assert.assert.isType(config.maxAgeSeconds, 'number', {
              moduleName: 'workbox-expiration',
              className: 'Plugin',
              funcName: 'constructor',
              paramName: 'config.maxAgeSeconds'
            });
          }
        }
        this._config = config;
        this._maxAgeSeconds = config.maxAgeSeconds;
        this._cacheExpirations = new Map();
        if (config.purgeOnQuotaError) {
          (0, _registerQuotaErrorCallback.registerQuotaErrorCallback)(() => this.deleteCacheAndMetadata());
        }
      }
      /**
       * A simple helper method to return a CacheExpiration instance for a given
       * cache name.
       *
       * @param {string} cacheName
       * @return {CacheExpiration}
       *
       * @private
       */
      _getCacheExpiration(cacheName) {
        if (cacheName === _cacheNames.cacheNames.getRuntimeName()) {
          throw new _WorkboxError.WorkboxError('expire-custom-caches-only');
        }
        let cacheExpiration = this._cacheExpirations.get(cacheName);
        if (!cacheExpiration) {
          cacheExpiration = new _CacheExpiration.CacheExpiration(cacheName, this._config);
          this._cacheExpirations.set(cacheName, cacheExpiration);
        }
        return cacheExpiration;
      }
      /**
       * @param {Response} cachedResponse
       * @return {boolean}
       *
       * @private
       */
      _isResponseDateFresh(cachedResponse) {
        if (!this._maxAgeSeconds) {
          // We aren't expiring by age, so return true, it's fresh
          return true;
        }
        // Check if the 'date' header will suffice a quick expiration check.
        // See https://github.com/GoogleChromeLabs/sw-toolbox/issues/164 for
        // discussion.
        const dateHeaderTimestamp = this._getDateHeaderTimestamp(cachedResponse);
        if (dateHeaderTimestamp === null) {
          // Unable to parse date, so assume it's fresh.
          return true;
        }
        // If we have a valid headerTime, then our response is fresh iff the
        // headerTime plus maxAgeSeconds is greater than the current time.
        const now = Date.now();
        return dateHeaderTimestamp >= now - this._maxAgeSeconds * 1000;
      }
      /**
       * This method will extract the data header and parse it into a useful
       * value.
       *
       * @param {Response} cachedResponse
       * @return {number|null}
       *
       * @private
       */
      _getDateHeaderTimestamp(cachedResponse) {
        if (!cachedResponse.headers.has('date')) {
          return null;
        }
        const dateHeader = cachedResponse.headers.get('date');
        const parsedDate = new Date(dateHeader);
        const headerTime = parsedDate.getTime();
        // If the Date header was invalid for some reason, parsedDate.getTime()
        // will return NaN.
        if (isNaN(headerTime)) {
          return null;
        }
        return headerTime;
      }
      /**
       * This is a helper method that performs two operations:
       *
       * - Deletes *all* the underlying Cache instances associated with this plugin
       * instance, by calling caches.delete() on your behalf.
       * - Deletes the metadata from IndexedDB used to keep track of expiration
       * details for each Cache instance.
       *
       * When using cache expiration, calling this method is preferable to calling
       * `caches.delete()` directly, since this will ensure that the IndexedDB
       * metadata is also cleanly removed and open IndexedDB instances are deleted.
       *
       * Note that if you're *not* using cache expiration for a given cache, calling
       * `caches.delete()` and passing in the cache's name should be sufficient.
       * There is no Workbox-specific method needed for cleanup in that case.
       */
      async deleteCacheAndMetadata() {
        // Do this one at a time instead of all at once via `Promise.all()` to
        // reduce the chance of inconsistency if a promise rejects.
        for (const [cacheName, cacheExpiration] of this._cacheExpirations) {
          await self.caches.delete(cacheName);
          await cacheExpiration.delete();
        }
        // Reset this._cacheExpirations to its initial state.
        this._cacheExpirations = new Map();
      }
    }
    exports.ExpirationPlugin = ExpirationPlugin;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/cacheNames.js": "HFbW",
    "workbox-core/_private/dontWaitFor.js": "kdcg",
    "workbox-core/_private/getFriendlyURL.js": "FrDK",
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/registerQuotaErrorCallback.js": "BomW",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "./CacheExpiration.js": "Nq5x",
    "./_version.js": "GYlP"
  }],
  "NJTb": [function (require, module, exports) {
    "use strict";

    // @ts-ignore
    try {
      self['workbox:recipes:6.1.5'] && _();
    } catch (e) {}
  }, {}],
  "kaqY": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.googleFontsCache = googleFontsCache;
    var _registerRoute = require("workbox-routing/registerRoute.js");
    var _StaleWhileRevalidate = require("workbox-strategies/StaleWhileRevalidate.js");
    var _CacheFirst = require("workbox-strategies/CacheFirst.js");
    var _CacheableResponsePlugin = require("workbox-cacheable-response/CacheableResponsePlugin.js");
    var _ExpirationPlugin = require("workbox-expiration/ExpirationPlugin.js");
    require("./_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * An implementation of the [Google fonts]{@link https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts} caching recipe
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.cachePrefix] Cache prefix for caching stylesheets and webfonts. Defaults to google-fonts
     * @param {number} [options.maxAgeSeconds] Maximum age, in seconds, that font entries will be cached for. Defaults to 1 year
     * @param {number} [options.maxEntries] Maximum number of fonts that will be cached. Defaults to 30
     */
    function googleFontsCache(options = {}) {
      const sheetCacheName = `${options.cachePrefix || 'google-fonts'}-stylesheets`;
      const fontCacheName = `${options.cachePrefix || 'google-fonts'}-webfonts`;
      const maxAgeSeconds = options.maxAgeSeconds || 60 * 60 * 24 * 365;
      const maxEntries = options.maxEntries || 30;
      // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
      (0, _registerRoute.registerRoute)(({
        url
      }) => url.origin === 'https://fonts.googleapis.com', new _StaleWhileRevalidate.StaleWhileRevalidate({
        cacheName: sheetCacheName
      }));
      // Cache the underlying font files with a cache-first strategy for 1 year.
      (0, _registerRoute.registerRoute)(({
        url
      }) => url.origin === 'https://fonts.gstatic.com', new _CacheFirst.CacheFirst({
        cacheName: fontCacheName,
        plugins: [new _CacheableResponsePlugin.CacheableResponsePlugin({
          statuses: [0, 200]
        }), new _ExpirationPlugin.ExpirationPlugin({
          maxAgeSeconds,
          maxEntries
        })]
      }));
    }
  }, {
    "workbox-routing/registerRoute.js": "VLpG",
    "workbox-strategies/StaleWhileRevalidate.js": "OIcM",
    "workbox-strategies/CacheFirst.js": "jY2Q",
    "workbox-cacheable-response/CacheableResponsePlugin.js": "QlRw",
    "workbox-expiration/ExpirationPlugin.js": "PZ8a",
    "./_version.js": "NJTb"
  }],
  "oY6f": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.warmStrategyCache = warmStrategyCache;
    require("./_version.js");
    /**
     * @memberof module:workbox-recipes
     
     * @param {Object} options
     * @param {string[]} options.urls Paths to warm the strategy's cache with
     * @param {Strategy} options.strategy Strategy to use
     */
    function warmStrategyCache(options) {
      self.addEventListener('install', event => {
        const done = options.urls.map(path => options.strategy.handleAll({
          event,
          request: new Request(path)
        })[1]);
        event.waitUntil(Promise.all(done));
      });
    }
  }, {
    "./_version.js": "NJTb"
  }],
  "dbQ6": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.imageCache = imageCache;
    var _warmStrategyCache = require("./warmStrategyCache");
    var _registerRoute = require("workbox-routing/registerRoute.js");
    var _CacheFirst = require("workbox-strategies/CacheFirst.js");
    var _CacheableResponsePlugin = require("workbox-cacheable-response/CacheableResponsePlugin.js");
    var _ExpirationPlugin = require("workbox-expiration/ExpirationPlugin.js");
    require("./_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * An implementation of the [image caching recipe]{@link https://developers.google.com/web/tools/workbox/guides/common-recipes#caching_images}
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Name for cache. Defaults to images
    * @param {RouteMatchCallback} [options.matchCallback] Workbox callback function to call to match to. Defaults to request.destination === 'image';
     * @param {number} [options.maxAgeSeconds] Maximum age, in seconds, that font entries will be cached for. Defaults to 30 days
     * @param {number} [options.maxEntries] Maximum number of images that will be cached. Defaults to 60
     * @param {WorkboxPlugin[]} [options.plugins] Additional plugins to use for this recipe
     * @param {string[]} [options.warmCache] Paths to call to use to warm this cache
     */
    function imageCache(options = {}) {
      const defaultMatchCallback = ({
        request
      }) => request.destination === 'image';
      const cacheName = options.cacheName || 'images';
      const matchCallback = options.matchCallback || defaultMatchCallback;
      const maxAgeSeconds = options.maxAgeSeconds || 30 * 24 * 60 * 60;
      const maxEntries = options.maxEntries || 60;
      const plugins = options.plugins || [];
      plugins.push(new _CacheableResponsePlugin.CacheableResponsePlugin({
        statuses: [0, 200]
      }));
      plugins.push(new _ExpirationPlugin.ExpirationPlugin({
        maxEntries,
        maxAgeSeconds
      }));
      const strategy = new _CacheFirst.CacheFirst({
        cacheName,
        plugins
      });
      (0, _registerRoute.registerRoute)(matchCallback, strategy);
      // Warms the cache
      if (options.warmCache) {
        (0, _warmStrategyCache.warmStrategyCache)({
          urls: options.warmCache,
          strategy
        });
      }
    }
  }, {
    "./warmStrategyCache": "oY6f",
    "workbox-routing/registerRoute.js": "VLpG",
    "workbox-strategies/CacheFirst.js": "jY2Q",
    "workbox-cacheable-response/CacheableResponsePlugin.js": "QlRw",
    "workbox-expiration/ExpirationPlugin.js": "PZ8a",
    "./_version.js": "NJTb"
  }],
  "CRZg": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.staticResourceCache = staticResourceCache;
    var _warmStrategyCache = require("./warmStrategyCache");
    var _registerRoute = require("workbox-routing/registerRoute.js");
    var _StaleWhileRevalidate = require("workbox-strategies/StaleWhileRevalidate.js");
    var _CacheableResponsePlugin = require("workbox-cacheable-response/CacheableResponsePlugin.js");
    require("./_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * An implementation of the [CSS and JavaScript files recipe]{@link https://developers.google.com/web/tools/workbox/guides/common-recipes#cache_css_and_javascript_files}
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Name for cache. Defaults to static-resources
     * @param {RouteMatchCallback} [options.matchCallback] Workbox callback function to call to match to. Defaults to request.destination === 'style' || request.destination === 'script' || request.destination === 'worker';
     * @param {WorkboxPlugin[]} [options.plugins] Additional plugins to use for this recipe
     * @param {string[]} [options.warmCache] Paths to call to use to warm this cache
     */
    function staticResourceCache(options = {}) {
      const defaultMatchCallback = ({
        request
      }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker';
      const cacheName = options.cacheName || 'static-resources';
      const matchCallback = options.matchCallback || defaultMatchCallback;
      const plugins = options.plugins || [];
      plugins.push(new _CacheableResponsePlugin.CacheableResponsePlugin({
        statuses: [0, 200]
      }));
      const strategy = new _StaleWhileRevalidate.StaleWhileRevalidate({
        cacheName,
        plugins
      });
      (0, _registerRoute.registerRoute)(matchCallback, strategy);
      // Warms the cache
      if (options.warmCache) {
        (0, _warmStrategyCache.warmStrategyCache)({
          urls: options.warmCache,
          strategy
        });
      }
    }
  }, {
    "./warmStrategyCache": "oY6f",
    "workbox-routing/registerRoute.js": "VLpG",
    "workbox-strategies/StaleWhileRevalidate.js": "OIcM",
    "workbox-cacheable-response/CacheableResponsePlugin.js": "QlRw",
    "./_version.js": "NJTb"
  }],
  "zQPb": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NetworkFirst = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _cacheOkAndOpaquePlugin = require("./plugins/cacheOkAndOpaquePlugin.js");
    var _Strategy = require("./Strategy.js");
    var _messages = require("./utils/messages.js");
    require("./_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * An implementation of a
     * [network first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache}
     * request strategy.
     *
     * By default, this strategy will cache responses with a 200 status code as
     * well as [opaque responses]{@link https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests}.
     * Opaque responses are are cross-origin requests where the response doesn't
     * support [CORS]{@link https://enable-cors.org/}.
     *
     * If the network request fails, and there is no cache match, this will throw
     * a `WorkboxError` exception.
     *
     * @extends module:workbox-strategies.Strategy
     * @memberof module:workbox-strategies
     */
    class NetworkFirst extends _Strategy.Strategy {
      /**
       * @param {Object} [options]
       * @param {string} [options.cacheName] Cache name to store and retrieve
       * requests. Defaults to cache names provided by
       * [workbox-core]{@link module:workbox-core.cacheNames}.
       * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
       * to use in conjunction with this caching strategy.
       * @param {Object} [options.fetchOptions] Values passed along to the
       * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
       * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
       * `fetch()` requests made by this strategy.
       * @param {Object} [options.matchOptions] [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
       * @param {number} [options.networkTimeoutSeconds] If set, any network requests
       * that fail to respond within the timeout will fallback to the cache.
       *
       * This option can be used to combat
       * "[lie-fi]{@link https://developers.google.com/web/fundamentals/performance/poor-connectivity/#lie-fi}"
       * scenarios.
       */
      constructor(options = {}) {
        super(options);
        // If this instance contains no plugins with a 'cacheWillUpdate' callback,
        // prepend the `cacheOkAndOpaquePlugin` plugin to the plugins list.
        if (!this.plugins.some(p => 'cacheWillUpdate' in p)) {
          this.plugins.unshift(_cacheOkAndOpaquePlugin.cacheOkAndOpaquePlugin);
        }
        this._networkTimeoutSeconds = options.networkTimeoutSeconds || 0;
        if ("production" !== 'production') {
          if (this._networkTimeoutSeconds) {
            _assert.assert.isType(this._networkTimeoutSeconds, 'number', {
              moduleName: 'workbox-strategies',
              className: this.constructor.name,
              funcName: 'constructor',
              paramName: 'networkTimeoutSeconds'
            });
          }
        }
      }
      /**
       * @private
       * @param {Request|string} request A request to run this strategy for.
       * @param {module:workbox-strategies.StrategyHandler} handler The event that
       *     triggered the request.
       * @return {Promise<Response>}
       */
      async _handle(request, handler) {
        const logs = [];
        if ("production" !== 'production') {
          _assert.assert.isInstance(request, Request, {
            moduleName: 'workbox-strategies',
            className: this.constructor.name,
            funcName: 'handle',
            paramName: 'makeRequest'
          });
        }
        const promises = [];
        let timeoutId;
        if (this._networkTimeoutSeconds) {
          const {
            id,
            promise
          } = this._getTimeoutPromise({
            request,
            logs,
            handler
          });
          timeoutId = id;
          promises.push(promise);
        }
        const networkPromise = this._getNetworkPromise({
          timeoutId,
          request,
          logs,
          handler
        });
        promises.push(networkPromise);
        const response = await handler.waitUntil((async () => {
          // Promise.race() will resolve as soon as the first promise resolves.
          return (await handler.waitUntil(Promise.race(promises))) || (
          // If Promise.race() resolved with null, it might be due to a network
          // timeout + a cache miss. If that were to happen, we'd rather wait until
          // the networkPromise resolves instead of returning null.
          // Note that it's fine to await an already-resolved promise, so we don't
          // have to check to see if it's still "in flight".
          await networkPromise);
        })());
        if ("production" !== 'production') {
          _logger.logger.groupCollapsed(_messages.messages.strategyStart(this.constructor.name, request));
          for (const log of logs) {
            _logger.logger.log(log);
          }
          _messages.messages.printFinalResponse(response);
          _logger.logger.groupEnd();
        }
        if (!response) {
          throw new _WorkboxError.WorkboxError('no-response', {
            url: request.url
          });
        }
        return response;
      }
      /**
       * @param {Object} options
       * @param {Request} options.request
       * @param {Array} options.logs A reference to the logs array
       * @param {Event} options.event
       * @return {Promise<Response>}
       *
       * @private
       */
      _getTimeoutPromise({
        request,
        logs,
        handler
      }) {
        let timeoutId;
        const timeoutPromise = new Promise(resolve => {
          const onNetworkTimeout = async () => {
            if ("production" !== 'production') {
              logs.push(`Timing out the network response at ` + `${this._networkTimeoutSeconds} seconds.`);
            }
            resolve(await handler.cacheMatch(request));
          };
          timeoutId = setTimeout(onNetworkTimeout, this._networkTimeoutSeconds * 1000);
        });
        return {
          promise: timeoutPromise,
          id: timeoutId
        };
      }
      /**
       * @param {Object} options
       * @param {number|undefined} options.timeoutId
       * @param {Request} options.request
       * @param {Array} options.logs A reference to the logs Array.
       * @param {Event} options.event
       * @return {Promise<Response>}
       *
       * @private
       */
      async _getNetworkPromise({
        timeoutId,
        request,
        logs,
        handler
      }) {
        let error;
        let response;
        try {
          response = await handler.fetchAndCachePut(request);
        } catch (fetchError) {
          error = fetchError;
        }
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if ("production" !== 'production') {
          if (response) {
            logs.push(`Got response from network.`);
          } else {
            logs.push(`Unable to get a response from the network. Will respond ` + `with a cached response.`);
          }
        }
        if (error || !response) {
          response = await handler.cacheMatch(request);
          if ("production" !== 'production') {
            if (response) {
              logs.push(`Found a cached response in the '${this.cacheName}'` + ` cache.`);
            } else {
              logs.push(`No response found in the '${this.cacheName}' cache.`);
            }
          }
        }
        return response;
      }
    }
    exports.NetworkFirst = NetworkFirst;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "./plugins/cacheOkAndOpaquePlugin.js": "XnCC",
    "./Strategy.js": "BpUC",
    "./utils/messages.js": "BVKR",
    "./_version.js": "Mf3Z"
  }],
  "v7iH": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.pageCache = pageCache;
    var _warmStrategyCache = require("./warmStrategyCache");
    var _registerRoute = require("workbox-routing/registerRoute.js");
    var _NetworkFirst = require("workbox-strategies/NetworkFirst.js");
    var _CacheableResponsePlugin = require("workbox-cacheable-response/CacheableResponsePlugin.js");
    require("./_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * An implementation of a page caching recipe with a network timeout
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Name for cache. Defaults to pages
     * @param {RouteMatchCallback} [options.matchCallback] Workbox callback function to call to match to. Defaults to request.mode === 'navigate';
     * @param {number} [options.networkTimoutSeconds] Maximum amount of time, in seconds, to wait on the network before falling back to cache. Defaults to 3
     * @param {WorkboxPlugin[]} [options.plugins] Additional plugins to use for this recipe
     * @param {string[]} [options.warmCache] Paths to call to use to warm this cache
     */
    function pageCache(options = {}) {
      const defaultMatchCallback = ({
        request
      }) => request.mode === 'navigate';
      const cacheName = options.cacheName || 'pages';
      const matchCallback = options.matchCallback || defaultMatchCallback;
      const networkTimeoutSeconds = options.networkTimeoutSeconds || 3;
      const plugins = options.plugins || [];
      plugins.push(new _CacheableResponsePlugin.CacheableResponsePlugin({
        statuses: [0, 200]
      }));
      const strategy = new _NetworkFirst.NetworkFirst({
        networkTimeoutSeconds,
        cacheName,
        plugins
      });
      // Registers the route
      (0, _registerRoute.registerRoute)(matchCallback, strategy);
      // Warms the cache
      if (options.warmCache) {
        (0, _warmStrategyCache.warmStrategyCache)({
          urls: options.warmCache,
          strategy
        });
      }
    }
  }, {
    "./warmStrategyCache": "oY6f",
    "workbox-routing/registerRoute.js": "VLpG",
    "workbox-strategies/NetworkFirst.js": "zQPb",
    "workbox-cacheable-response/CacheableResponsePlugin.js": "QlRw",
    "./_version.js": "NJTb"
  }],
  "zYEn": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.setCatchHandler = setCatchHandler;
    var _getOrCreateDefaultRouter = require("./utils/getOrCreateDefaultRouter.js");
    require("./_version.js");
    /*
      Copyright 2019 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * If a Route throws an error while handling a request, this `handler`
     * will be called and given a chance to provide a response.
     *
     * @param {module:workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     *
     * @memberof module:workbox-routing
     */
    function setCatchHandler(handler) {
      const defaultRouter = (0, _getOrCreateDefaultRouter.getOrCreateDefaultRouter)();
      defaultRouter.setCatchHandler(handler);
    }
  }, {
    "./utils/getOrCreateDefaultRouter.js": "DQEO",
    "./_version.js": "YAIL"
  }],
  "zHrd": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.waitUntil = waitUntil;
    require("../_version.js");
    /*
      Copyright 2020 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * A utility method that makes it easier to use `event.waitUntil` with
     * async functions and return the result.
     *
     * @param {ExtendableEvent} event
     * @param {Function} asyncFn
     * @return {Function}
     * @private
     */
    function waitUntil(event, asyncFn) {
      const returnPromise = asyncFn();
      event.waitUntil(returnPromise);
      return returnPromise;
    }
  }, {
    "../_version.js": "ViJI"
  }],
  "riaL": [function (require, module, exports) {
    "use strict";

    // @ts-ignore
    try {
      self['workbox:precaching:6.1.5'] && _();
    } catch (e) {}
  }, {}],
  "xont": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.createCacheKey = createCacheKey;
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    // Name of the search parameter used to store revision info.
    const REVISION_SEARCH_PARAM = '__WB_REVISION__';
    /**
     * Converts a manifest entry into a versioned URL suitable for precaching.
     *
     * @param {Object|string} entry
     * @return {string} A URL with versioning info.
     *
     * @private
     * @memberof module:workbox-precaching
     */
    function createCacheKey(entry) {
      if (!entry) {
        throw new _WorkboxError.WorkboxError('add-to-cache-list-unexpected-type', {
          entry
        });
      }
      // If a precache manifest entry is a string, it's assumed to be a versioned
      // URL, like '/app.abcd1234.js'. Return as-is.
      if (typeof entry === 'string') {
        const urlObject = new URL(entry, location.href);
        return {
          cacheKey: urlObject.href,
          url: urlObject.href
        };
      }
      const {
        revision,
        url
      } = entry;
      if (!url) {
        throw new _WorkboxError.WorkboxError('add-to-cache-list-unexpected-type', {
          entry
        });
      }
      // If there's just a URL and no revision, then it's also assumed to be a
      // versioned URL.
      if (!revision) {
        const urlObject = new URL(url, location.href);
        return {
          cacheKey: urlObject.href,
          url: urlObject.href
        };
      }
      // Otherwise, construct a properly versioned URL using the custom Workbox
      // search parameter along with the revision info.
      const cacheKeyURL = new URL(url, location.href);
      const originalURL = new URL(url, location.href);
      cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
      return {
        cacheKey: cacheKeyURL.href,
        url: originalURL.href
      };
    }
  }, {
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "../_version.js": "riaL"
  }],
  "WNUo": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PrecacheInstallReportPlugin = void 0;
    require("../_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * A plugin, designed to be used with PrecacheController, to determine the
     * of assets that were updated (or not updated) during the install event.
     *
     * @private
     */
    class PrecacheInstallReportPlugin {
      constructor() {
        this.updatedURLs = [];
        this.notUpdatedURLs = [];
        this.handlerWillStart = async ({
          request,
          state
        }) => {
          // TODO: `state` should never be undefined...
          if (state) {
            state.originalRequest = request;
          }
        };
        this.cachedResponseWillBeUsed = async ({
          event,
          state,
          cachedResponse
        }) => {
          if (event.type === 'install') {
            // TODO: `state` should never be undefined...
            const url = state.originalRequest.url;
            if (cachedResponse) {
              this.notUpdatedURLs.push(url);
            } else {
              this.updatedURLs.push(url);
            }
          }
          return cachedResponse;
        };
      }
    }
    exports.PrecacheInstallReportPlugin = PrecacheInstallReportPlugin;
  }, {
    "../_version.js": "riaL"
  }],
  "vhgT": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PrecacheCacheKeyPlugin = void 0;
    require("../_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * A plugin, designed to be used with PrecacheController, to translate URLs into
     * the corresponding cache key, based on the current revision info.
     *
     * @private
     */
    class PrecacheCacheKeyPlugin {
      constructor({
        precacheController
      }) {
        this.cacheKeyWillBeUsed = async ({
          request,
          params
        }) => {
          const cacheKey = params && params.cacheKey || this._precacheController.getCacheKeyForURL(request.url);
          return cacheKey ? new Request(cacheKey) : request;
        };
        this._precacheController = precacheController;
      }
    }
    exports.PrecacheCacheKeyPlugin = PrecacheCacheKeyPlugin;
  }, {
    "../_version.js": "riaL"
  }],
  "QuaD": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.printCleanupDetails = printCleanupDetails;
    var _logger = require("workbox-core/_private/logger.js");
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * @param {string} groupTitle
     * @param {Array<string>} deletedURLs
     *
     * @private
     */
    const logGroup = (groupTitle, deletedURLs) => {
      _logger.logger.groupCollapsed(groupTitle);
      for (const url of deletedURLs) {
        _logger.logger.log(url);
      }
      _logger.logger.groupEnd();
    };
    /**
     * @param {Array<string>} deletedURLs
     *
     * @private
     * @memberof module:workbox-precaching
     */
    function printCleanupDetails(deletedURLs) {
      const deletionCount = deletedURLs.length;
      if (deletionCount > 0) {
        _logger.logger.groupCollapsed(`During precaching cleanup, ` + `${deletionCount} cached ` + `request${deletionCount === 1 ? ' was' : 's were'} deleted.`);
        logGroup('Deleted Cache Requests', deletedURLs);
        _logger.logger.groupEnd();
      }
    }
  }, {
    "workbox-core/_private/logger.js": "uWXV",
    "../_version.js": "riaL"
  }],
  "QulK": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.printInstallDetails = printInstallDetails;
    var _logger = require("workbox-core/_private/logger.js");
    require("../_version.js");
    /*
      Copyright 2018 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * @param {string} groupTitle
     * @param {Array<string>} urls
     *
     * @private
     */
    function _nestedGroup(groupTitle, urls) {
      if (urls.length === 0) {
        return;
      }
      _logger.logger.groupCollapsed(groupTitle);
      for (const url of urls) {
        _logger.logger.log(url);
      }
      _logger.logger.groupEnd();
    }
    /**
     * @param {Array<string>} urlsToPrecache
     * @param {Array<string>} urlsAlreadyPrecached
     *
     * @private
     * @memberof module:workbox-precaching
     */
    function printInstallDetails(urlsToPrecache, urlsAlreadyPrecached) {
      const precachedCount = urlsToPrecache.length;
      const alreadyPrecachedCount = urlsAlreadyPrecached.length;
      if (precachedCount || alreadyPrecachedCount) {
        let message = `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;
        if (alreadyPrecachedCount > 0) {
          message += ` ${alreadyPrecachedCount} ` + `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
        }
        _logger.logger.groupCollapsed(message);
        _nestedGroup(`View newly precached URLs.`, urlsToPrecache);
        _nestedGroup(`View previously precached URLs.`, urlsAlreadyPrecached);
        _logger.logger.groupEnd();
      }
    }
  }, {
    "workbox-core/_private/logger.js": "uWXV",
    "../_version.js": "riaL"
  }],
  "vyTr": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.canConstructResponseFromBodyStream = canConstructResponseFromBodyStream;
    require("../_version.js");
    /*
      Copyright 2019 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    let supportStatus;
    /**
     * A utility function that determines whether the current browser supports
     * constructing a new `Response` from a `response.body` stream.
     *
     * @return {boolean} `true`, if the current browser can successfully
     *     construct a `Response` from a `response.body` stream, `false` otherwise.
     *
     * @private
     */
    function canConstructResponseFromBodyStream() {
      if (supportStatus === undefined) {
        const testResponse = new Response('');
        if ('body' in testResponse) {
          try {
            new Response(testResponse.body);
            supportStatus = true;
          } catch (error) {
            supportStatus = false;
          }
        }
        supportStatus = false;
      }
      return supportStatus;
    }
  }, {
    "../_version.js": "ViJI"
  }],
  "ZN0t": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.copyResponse = copyResponse;
    var _canConstructResponseFromBodyStream = require("./_private/canConstructResponseFromBodyStream.js");
    var _WorkboxError = require("./_private/WorkboxError.js");
    require("./_version.js");
    /*
      Copyright 2019 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * Allows developers to copy a response and modify its `headers`, `status`,
     * or `statusText` values (the values settable via a
     * [`ResponseInit`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#Syntax}
     * object in the constructor).
     * To modify these values, pass a function as the second argument. That
     * function will be invoked with a single object with the response properties
     * `{headers, status, statusText}`. The return value of this function will
     * be used as the `ResponseInit` for the new `Response`. To change the values
     * either modify the passed parameter(s) and return it, or return a totally
     * new object.
     *
     * This method is intentionally limited to same-origin responses, regardless of
     * whether CORS was used or not.
     *
     * @param {Response} response
     * @param {Function} modifier
     * @memberof module:workbox-core
     */
    async function copyResponse(response, modifier) {
      let origin = null;
      // If response.url isn't set, assume it's cross-origin and keep origin null.
      if (response.url) {
        const responseURL = new URL(response.url);
        origin = responseURL.origin;
      }
      if (origin !== self.location.origin) {
        throw new _WorkboxError.WorkboxError('cross-origin-copy-response', {
          origin
        });
      }
      const clonedResponse = response.clone();
      // Create a fresh `ResponseInit` object by cloning the headers.
      const responseInit = {
        headers: new Headers(clonedResponse.headers),
        status: clonedResponse.status,
        statusText: clonedResponse.statusText
      };
      // Apply any user modifications.
      const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit;
      // Create the new response from the body stream and `ResponseInit`
      // modifications. Note: not all browsers support the Response.body stream,
      // so fall back to reading the entire body into memory as a blob.
      const body = (0, _canConstructResponseFromBodyStream.canConstructResponseFromBodyStream)() ? clonedResponse.body : await clonedResponse.blob();
      return new Response(body, modifiedResponseInit);
    }
  }, {
    "./_private/canConstructResponseFromBodyStream.js": "vyTr",
    "./_private/WorkboxError.js": "hBTK",
    "./_version.js": "ViJI"
  }],
  "Wdvg": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PrecacheStrategy = void 0;
    var _copyResponse = require("workbox-core/copyResponse.js");
    var _cacheNames = require("workbox-core/_private/cacheNames.js");
    var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _Strategy = require("workbox-strategies/Strategy.js");
    require("./_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * A [Strategy]{@link module:workbox-strategies.Strategy} implementation
     * specifically designed to work with
     * [PrecacheController]{@link module:workbox-precaching.PrecacheController}
     * to both cache and fetch precached assets.
     *
     * Note: an instance of this class is created automatically when creating a
     * `PrecacheController`; it's generally not necessary to create this yourself.
     *
     * @extends module:workbox-strategies.Strategy
     * @memberof module:workbox-precaching
     */
    class PrecacheStrategy extends _Strategy.Strategy {
      /**
       *
       * @param {Object} [options]
       * @param {string} [options.cacheName] Cache name to store and retrieve
       * requests. Defaults to the cache names provided by
       * [workbox-core]{@link module:workbox-core.cacheNames}.
       * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
       * to use in conjunction with this caching strategy.
       * @param {Object} [options.fetchOptions] Values passed along to the
       * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
       * of all fetch() requests made by this strategy.
       * @param {Object} [options.matchOptions] The
       * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
       * for any `cache.match()` or `cache.put()` calls made by this strategy.
       * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
       * get the response from the network if there's a precache miss.
       */
      constructor(options = {}) {
        options.cacheName = _cacheNames.cacheNames.getPrecacheName(options.cacheName);
        super(options);
        this._fallbackToNetwork = options.fallbackToNetwork === false ? false : true;
        // Redirected responses cannot be used to satisfy a navigation request, so
        // any redirected response must be "copied" rather than cloned, so the new
        // response doesn't contain the `redirected` flag. See:
        // https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
        this.plugins.push(PrecacheStrategy.copyRedirectedCacheableResponsesPlugin);
      }
      /**
       * @private
       * @param {Request|string} request A request to run this strategy for.
       * @param {module:workbox-strategies.StrategyHandler} handler The event that
       *     triggered the request.
       * @return {Promise<Response>}
       */
      async _handle(request, handler) {
        const response = await handler.cacheMatch(request);
        if (!response) {
          // If this is an `install` event then populate the cache. If this is a
          // `fetch` event (or any other event) then respond with the cached
          // response.
          if (handler.event && handler.event.type === 'install') {
            return await this._handleInstall(request, handler);
          }
          return await this._handleFetch(request, handler);
        }
        return response;
      }
      async _handleFetch(request, handler) {
        let response;
        // Fall back to the network if we don't have a cached response
        // (perhaps due to manual cache cleanup).
        if (this._fallbackToNetwork) {
          if ("production" !== 'production') {
            _logger.logger.warn(`The precached response for ` + `${(0, _getFriendlyURL.getFriendlyURL)(request.url)} in ${this.cacheName} was not ` + `found. Falling back to the network instead.`);
          }
          response = await handler.fetch(request);
        } else {
          // This shouldn't normally happen, but there are edge cases:
          // https://github.com/GoogleChrome/workbox/issues/1441
          throw new _WorkboxError.WorkboxError('missing-precache-entry', {
            cacheName: this.cacheName,
            url: request.url
          });
        }
        if ("production" !== 'production') {
          const cacheKey = handler.params && handler.params.cacheKey || (await handler.getCacheKey(request, 'read'));
          // Workbox is going to handle the route.
          // print the routing details to the console.
          _logger.logger.groupCollapsed(`Precaching is responding to: ` + (0, _getFriendlyURL.getFriendlyURL)(request.url));
          _logger.logger.log(`Serving the precached url: ${(0, _getFriendlyURL.getFriendlyURL)(cacheKey.url)}`);
          _logger.logger.groupCollapsed(`View request details here.`);
          _logger.logger.log(request);
          _logger.logger.groupEnd();
          _logger.logger.groupCollapsed(`View response details here.`);
          _logger.logger.log(response);
          _logger.logger.groupEnd();
          _logger.logger.groupEnd();
        }
        return response;
      }
      async _handleInstall(request, handler) {
        this._useDefaultCacheabilityPluginIfNeeded();
        const response = await handler.fetch(request);
        // Make sure we defer cachePut() until after we know the response
        // should be cached; see https://github.com/GoogleChrome/workbox/issues/2737
        const wasCached = await handler.cachePut(request, response.clone());
        if (!wasCached) {
          // Throwing here will lead to the `install` handler failing, which
          // we want to do if *any* of the responses aren't safe to cache.
          throw new _WorkboxError.WorkboxError('bad-precaching-response', {
            url: request.url,
            status: response.status
          });
        }
        return response;
      }
      /**
       * This method is complex, as there a number of things to account for:
       *
       * The `plugins` array can be set at construction, and/or it might be added to
       * to at any time before the strategy is used.
       *
       * At the time the strategy is used (i.e. during an `install` event), there
       * needs to be at least one plugin that implements `cacheWillUpdate` in the
       * array, other than `copyRedirectedCacheableResponsesPlugin`.
       *
       * - If this method is called and there are no suitable `cacheWillUpdate`
       * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
       *
       * - If this method is called and there is exactly one `cacheWillUpdate`, then
       * we don't have to do anything (this might be a previously added
       * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
       *
       * - If this method is called and there is more than one `cacheWillUpdate`,
       * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
       * we need to remove it. (This situation is unlikely, but it could happen if
       * the strategy is used multiple times, the first without a `cacheWillUpdate`,
       * and then later on after manually adding a custom `cacheWillUpdate`.)
       *
       * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
       *
       * @private
       */
      _useDefaultCacheabilityPluginIfNeeded() {
        let defaultPluginIndex = null;
        let cacheWillUpdatePluginCount = 0;
        for (const [index, plugin] of this.plugins.entries()) {
          // Ignore the copy redirected plugin when determining what to do.
          if (plugin === PrecacheStrategy.copyRedirectedCacheableResponsesPlugin) {
            continue;
          }
          // Save the default plugin's index, in case it needs to be removed.
          if (plugin === PrecacheStrategy.defaultPrecacheCacheabilityPlugin) {
            defaultPluginIndex = index;
          }
          if (plugin.cacheWillUpdate) {
            cacheWillUpdatePluginCount++;
          }
        }
        if (cacheWillUpdatePluginCount === 0) {
          this.plugins.push(PrecacheStrategy.defaultPrecacheCacheabilityPlugin);
        } else if (cacheWillUpdatePluginCount > 1 && defaultPluginIndex !== null) {
          // Only remove the default plugin; multiple custom plugins are allowed.
          this.plugins.splice(defaultPluginIndex, 1);
        }
        // Nothing needs to be done if cacheWillUpdatePluginCount is 1
      }
    }

    exports.PrecacheStrategy = PrecacheStrategy;
    PrecacheStrategy.defaultPrecacheCacheabilityPlugin = {
      async cacheWillUpdate({
        response
      }) {
        if (!response || response.status >= 400) {
          return null;
        }
        return response;
      }
    };
    PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
      async cacheWillUpdate({
        response
      }) {
        return response.redirected ? await (0, _copyResponse.copyResponse)(response) : response;
      }
    };
  }, {
    "workbox-core/copyResponse.js": "ZN0t",
    "workbox-core/_private/cacheNames.js": "HFbW",
    "workbox-core/_private/getFriendlyURL.js": "FrDK",
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "workbox-strategies/Strategy.js": "BpUC",
    "./_version.js": "riaL"
  }],
  "A5Oc": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PrecacheController = void 0;
    var _assert = require("workbox-core/_private/assert.js");
    var _cacheNames = require("workbox-core/_private/cacheNames.js");
    var _logger = require("workbox-core/_private/logger.js");
    var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
    var _waitUntil = require("workbox-core/_private/waitUntil.js");
    var _createCacheKey = require("./utils/createCacheKey.js");
    var _PrecacheInstallReportPlugin = require("./utils/PrecacheInstallReportPlugin.js");
    var _PrecacheCacheKeyPlugin = require("./utils/PrecacheCacheKeyPlugin.js");
    var _printCleanupDetails = require("./utils/printCleanupDetails.js");
    var _printInstallDetails = require("./utils/printInstallDetails.js");
    var _PrecacheStrategy = require("./PrecacheStrategy.js");
    require("./_version.js");
    /*
      Copyright 2019 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * Performs efficient precaching of assets.
     *
     * @memberof module:workbox-precaching
     */
    class PrecacheController {
      /**
       * Create a new PrecacheController.
       *
       * @param {Object} [options]
       * @param {string} [options.cacheName] The cache to use for precaching.
       * @param {string} [options.plugins] Plugins to use when precaching as well
       * as responding to fetch events for precached assets.
       * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
       * get the response from the network if there's a precache miss.
       */
      constructor({
        cacheName,
        plugins = [],
        fallbackToNetwork = true
      } = {}) {
        this._urlsToCacheKeys = new Map();
        this._urlsToCacheModes = new Map();
        this._cacheKeysToIntegrities = new Map();
        this._strategy = new _PrecacheStrategy.PrecacheStrategy({
          cacheName: _cacheNames.cacheNames.getPrecacheName(cacheName),
          plugins: [...plugins, new _PrecacheCacheKeyPlugin.PrecacheCacheKeyPlugin({
            precacheController: this
          })],
          fallbackToNetwork
        });
        // Bind the install and activate methods to the instance.
        this.install = this.install.bind(this);
        this.activate = this.activate.bind(this);
      }
      /**
       * @type {module:workbox-precaching.PrecacheStrategy} The strategy created by this controller and
       * used to cache assets and respond to fetch events.
       */
      get strategy() {
        return this._strategy;
      }
      /**
       * Adds items to the precache list, removing any duplicates and
       * stores the files in the
       * ["precache cache"]{@link module:workbox-core.cacheNames} when the service
       * worker installs.
       *
       * This method can be called multiple times.
       *
       * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
       */
      precache(entries) {
        this.addToCacheList(entries);
        if (!this._installAndActiveListenersAdded) {
          self.addEventListener('install', this.install);
          self.addEventListener('activate', this.activate);
          this._installAndActiveListenersAdded = true;
        }
      }
      /**
       * This method will add items to the precache list, removing duplicates
       * and ensuring the information is valid.
       *
       * @param {Array<module:workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
       *     Array of entries to precache.
       */
      addToCacheList(entries) {
        if ("production" !== 'production') {
          _assert.assert.isArray(entries, {
            moduleName: 'workbox-precaching',
            className: 'PrecacheController',
            funcName: 'addToCacheList',
            paramName: 'entries'
          });
        }
        const urlsToWarnAbout = [];
        for (const entry of entries) {
          // See https://github.com/GoogleChrome/workbox/issues/2259
          if (typeof entry === 'string') {
            urlsToWarnAbout.push(entry);
          } else if (entry && entry.revision === undefined) {
            urlsToWarnAbout.push(entry.url);
          }
          const {
            cacheKey,
            url
          } = (0, _createCacheKey.createCacheKey)(entry);
          const cacheMode = typeof entry !== 'string' && entry.revision ? 'reload' : 'default';
          if (this._urlsToCacheKeys.has(url) && this._urlsToCacheKeys.get(url) !== cacheKey) {
            throw new _WorkboxError.WorkboxError('add-to-cache-list-conflicting-entries', {
              firstEntry: this._urlsToCacheKeys.get(url),
              secondEntry: cacheKey
            });
          }
          if (typeof entry !== 'string' && entry.integrity) {
            if (this._cacheKeysToIntegrities.has(cacheKey) && this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
              throw new _WorkboxError.WorkboxError('add-to-cache-list-conflicting-integrities', {
                url
              });
            }
            this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
          }
          this._urlsToCacheKeys.set(url, cacheKey);
          this._urlsToCacheModes.set(url, cacheMode);
          if (urlsToWarnAbout.length > 0) {
            const warningMessage = `Workbox is precaching URLs without revision ` + `info: ${urlsToWarnAbout.join(', ')}\nThis is generally NOT safe. ` + `Learn more at https://bit.ly/wb-precache`;
            if ("production" === 'production') {
              // Use console directly to display this warning without bloating
              // bundle sizes by pulling in all of the logger codebase in prod.
              console.warn(warningMessage);
            } else {
              _logger.logger.warn(warningMessage);
            }
          }
        }
      }
      /**
       * Precaches new and updated assets. Call this method from the service worker
       * install event.
       *
       * Note: this method calls `event.waitUntil()` for you, so you do not need
       * to call it yourself in your event handlers.
       *
       * @param {ExtendableEvent} event
       * @return {Promise<module:workbox-precaching.InstallResult>}
       */
      install(event) {
        return (0, _waitUntil.waitUntil)(event, async () => {
          const installReportPlugin = new _PrecacheInstallReportPlugin.PrecacheInstallReportPlugin();
          this.strategy.plugins.push(installReportPlugin);
          // Cache entries one at a time.
          // See https://github.com/GoogleChrome/workbox/issues/2528
          for (const [url, cacheKey] of this._urlsToCacheKeys) {
            const integrity = this._cacheKeysToIntegrities.get(cacheKey);
            const cacheMode = this._urlsToCacheModes.get(url);
            const request = new Request(url, {
              integrity,
              cache: cacheMode,
              credentials: 'same-origin'
            });
            await Promise.all(this.strategy.handleAll({
              params: {
                cacheKey
              },
              request,
              event
            }));
          }
          const {
            updatedURLs,
            notUpdatedURLs
          } = installReportPlugin;
          if ("production" !== 'production') {
            (0, _printInstallDetails.printInstallDetails)(updatedURLs, notUpdatedURLs);
          }
          return {
            updatedURLs,
            notUpdatedURLs
          };
        });
      }
      /**
       * Deletes assets that are no longer present in the current precache manifest.
       * Call this method from the service worker activate event.
       *
       * Note: this method calls `event.waitUntil()` for you, so you do not need
       * to call it yourself in your event handlers.
       *
       * @param {ExtendableEvent} event
       * @return {Promise<module:workbox-precaching.CleanupResult>}
       */
      activate(event) {
        return (0, _waitUntil.waitUntil)(event, async () => {
          const cache = await self.caches.open(this.strategy.cacheName);
          const currentlyCachedRequests = await cache.keys();
          const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());
          const deletedURLs = [];
          for (const request of currentlyCachedRequests) {
            if (!expectedCacheKeys.has(request.url)) {
              await cache.delete(request);
              deletedURLs.push(request.url);
            }
          }
          if ("production" !== 'production') {
            (0, _printCleanupDetails.printCleanupDetails)(deletedURLs);
          }
          return {
            deletedURLs
          };
        });
      }
      /**
       * Returns a mapping of a precached URL to the corresponding cache key, taking
       * into account the revision information for the URL.
       *
       * @return {Map<string, string>} A URL to cache key mapping.
       */
      getURLsToCacheKeys() {
        return this._urlsToCacheKeys;
      }
      /**
       * Returns a list of all the URLs that have been precached by the current
       * service worker.
       *
       * @return {Array<string>} The precached URLs.
       */
      getCachedURLs() {
        return [...this._urlsToCacheKeys.keys()];
      }
      /**
       * Returns the cache key used for storing a given URL. If that URL is
       * unversioned, like `/index.html', then the cache key will be the original
       * URL with a search parameter appended to it.
       *
       * @param {string} url A URL whose cache key you want to look up.
       * @return {string} The versioned URL that corresponds to a cache key
       * for the original URL, or undefined if that URL isn't precached.
       */
      getCacheKeyForURL(url) {
        const urlObject = new URL(url, location.href);
        return this._urlsToCacheKeys.get(urlObject.href);
      }
      /**
       * This acts as a drop-in replacement for
       * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
       * with the following differences:
       *
       * - It knows what the name of the precache is, and only checks in that cache.
       * - It allows you to pass in an "original" URL without versioning parameters,
       * and it will automatically look up the correct cache key for the currently
       * active revision of that URL.
       *
       * E.g., `matchPrecache('index.html')` will find the correct precached
       * response for the currently active service worker, even if the actual cache
       * key is `'/index.html?__WB_REVISION__=1234abcd'`.
       *
       * @param {string|Request} request The key (without revisioning parameters)
       * to look up in the precache.
       * @return {Promise<Response|undefined>}
       */
      async matchPrecache(request) {
        const url = request instanceof Request ? request.url : request;
        const cacheKey = this.getCacheKeyForURL(url);
        if (cacheKey) {
          const cache = await self.caches.open(this.strategy.cacheName);
          return cache.match(cacheKey);
        }
        return undefined;
      }
      /**
       * Returns a function that looks up `url` in the precache (taking into
       * account revision information), and returns the corresponding `Response`.
       *
       * @param {string} url The precached URL which will be used to lookup the
       * `Response`.
       * @return {module:workbox-routing~handlerCallback}
       */
      createHandlerBoundToURL(url) {
        const cacheKey = this.getCacheKeyForURL(url);
        if (!cacheKey) {
          throw new _WorkboxError.WorkboxError('non-precached-url', {
            url
          });
        }
        return options => {
          options.request = new Request(url);
          options.params = {
            cacheKey,
            ...options.params
          };
          return this.strategy.handle(options);
        };
      }
    }
    exports.PrecacheController = PrecacheController;
  }, {
    "workbox-core/_private/assert.js": "mFVs",
    "workbox-core/_private/cacheNames.js": "HFbW",
    "workbox-core/_private/logger.js": "uWXV",
    "workbox-core/_private/WorkboxError.js": "hBTK",
    "workbox-core/_private/waitUntil.js": "zHrd",
    "./utils/createCacheKey.js": "xont",
    "./utils/PrecacheInstallReportPlugin.js": "WNUo",
    "./utils/PrecacheCacheKeyPlugin.js": "vhgT",
    "./utils/printCleanupDetails.js": "QuaD",
    "./utils/printInstallDetails.js": "QulK",
    "./PrecacheStrategy.js": "Wdvg",
    "./_version.js": "riaL"
  }],
  "jmKR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getOrCreatePrecacheController = void 0;
    var _PrecacheController = require("../PrecacheController.js");
    require("../_version.js");
    /*
      Copyright 2019 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    let precacheController;
    /**
     * @return {PrecacheController}
     * @private
     */
    const getOrCreatePrecacheController = () => {
      if (!precacheController) {
        precacheController = new _PrecacheController.PrecacheController();
      }
      return precacheController;
    };
    exports.getOrCreatePrecacheController = getOrCreatePrecacheController;
  }, {
    "../PrecacheController.js": "A5Oc",
    "../_version.js": "riaL"
  }],
  "QJNW": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.matchPrecache = matchPrecache;
    var _getOrCreatePrecacheController = require("./utils/getOrCreatePrecacheController.js");
    require("./_version.js");
    /*
      Copyright 2019 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * Helper function that calls
     * {@link PrecacheController#matchPrecache} on the default
     * {@link PrecacheController} instance.
     *
     * If you are creating your own {@link PrecacheController}, then call
     * {@link PrecacheController#matchPrecache} on that instance,
     * instead of using this function.
     *
     * @param {string|Request} request The key (without revisioning parameters)
     * to look up in the precache.
     * @return {Promise<Response|undefined>}
     *
     * @memberof module:workbox-precaching
     */
    function matchPrecache(request) {
      const precacheController = (0, _getOrCreatePrecacheController.getOrCreatePrecacheController)();
      return precacheController.matchPrecache(request);
    }
  }, {
    "./utils/getOrCreatePrecacheController.js": "jmKR",
    "./_version.js": "riaL"
  }],
  "CqfF": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.offlineFallback = offlineFallback;
    var _setCatchHandler = require("workbox-routing/setCatchHandler.js");
    var _matchPrecache = require("workbox-precaching/matchPrecache.js");
    require("./_version.js");
    /*
      Copyright 2020 Google LLC
    
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    /**
     * An implementation of the [comprehensive fallbacks recipe]{@link https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks}. Be sure to include the fallbacks in your precache injection
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.pageFallback] Precache name to match for pag fallbacks. Defaults to offline.html
     * @param {string} [options.imageFallback] Precache name to match for image fallbacks.
     * @param {string} [options.fontFallback] Precache name to match for font fallbacks.
     */
    function offlineFallback(options = {}) {
      const pageFallback = options.pageFallback || 'offline.html';
      const imageFallback = options.imageFallback || false;
      const fontFallback = options.fontFallback || false;
      self.addEventListener('install', event => {
        const files = [pageFallback];
        if (imageFallback) {
          files.push(imageFallback);
        }
        if (fontFallback) {
          files.push(fontFallback);
        }
        event.waitUntil(self.caches.open('workbox-offline-fallbacks').then(cache => cache.addAll(files)));
      });
      const handler = async options => {
        const dest = options.request.destination;
        const cache = await self.caches.open('workbox-offline-fallbacks');
        if (dest === "document") {
          const match = (await (0, _matchPrecache.matchPrecache)(pageFallback)) || (await cache.match(pageFallback));
          return match || Response.error();
        }
        if (dest === "image" && imageFallback !== false) {
          const match = (await (0, _matchPrecache.matchPrecache)(imageFallback)) || (await cache.match(imageFallback));
          return match || Response.error();
        }
        if (dest === "font" && fontFallback !== false) {
          const match = (await (0, _matchPrecache.matchPrecache)(fontFallback)) || (await cache.match(fontFallback));
          return match || Response.error();
        }
        return Response.error();
      };
      (0, _setCatchHandler.setCatchHandler)(handler);
    }
  }, {
    "workbox-routing/setCatchHandler.js": "zYEn",
    "workbox-precaching/matchPrecache.js": "QJNW",
    "./_version.js": "NJTb"
  }],
  "OMtl": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "googleFontsCache", {
      enumerable: true,
      get: function () {
        return _googleFontsCache.googleFontsCache;
      }
    });
    Object.defineProperty(exports, "imageCache", {
      enumerable: true,
      get: function () {
        return _imageCache.imageCache;
      }
    });
    Object.defineProperty(exports, "offlineFallback", {
      enumerable: true,
      get: function () {
        return _offlineFallback.offlineFallback;
      }
    });
    Object.defineProperty(exports, "pageCache", {
      enumerable: true,
      get: function () {
        return _pageCache.pageCache;
      }
    });
    Object.defineProperty(exports, "staticResourceCache", {
      enumerable: true,
      get: function () {
        return _staticResourceCache.staticResourceCache;
      }
    });
    Object.defineProperty(exports, "warmStrategyCache", {
      enumerable: true,
      get: function () {
        return _warmStrategyCache.warmStrategyCache;
      }
    });
    var _googleFontsCache = require("./googleFontsCache");
    var _imageCache = require("./imageCache");
    var _staticResourceCache = require("./staticResourceCache");
    var _pageCache = require("./pageCache");
    var _offlineFallback = require("./offlineFallback");
    var _warmStrategyCache = require("./warmStrategyCache");
    require("./_version.js");
  }, {
    "./googleFontsCache": "kaqY",
    "./imageCache": "dbQ6",
    "./staticResourceCache": "CRZg",
    "./pageCache": "v7iH",
    "./offlineFallback": "CqfF",
    "./warmStrategyCache": "oY6f",
    "./_version.js": "NJTb"
  }],
  "inZT": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _index = require("./index.js");
    Object.keys(_index).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _index[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index[key];
        }
      });
    });
  }, {
    "./index.js": "OMtl"
  }],
  "Focm": [function (require, module, exports) {
    "use strict";

    var _workboxRecipes = require("workbox-recipes");
    // cache any loaded google fonts
    (0, _workboxRecipes.googleFontsCache)();

    // listen for a client giving us messages
    self.addEventListener('message', function (event) {
      // client asked to begin using this new worker (see onAppUpdated)
      if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
      }
    });
  }, {
    "workbox-recipes": "inZT"
  }]
}, {}, ["Focm"], null);
},{}]},{},["NqYy"], null)
//# sourceMappingURL=sw.js.map