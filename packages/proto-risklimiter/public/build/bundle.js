
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __rest(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	}

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __param(paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	}

	function __metadata(metadataKey, metadataValue) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	}

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	var __createBinding = Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	});

	function __exportStar(m, o) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
	}

	function __values(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	}

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	function __spreadArrays() {
	    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	    for (var r = Array(s), k = 0, i = 0; i < il; i++)
	        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	            r[k] = a[j];
	    return r;
	}
	function __await(v) {
	    return this instanceof __await ? (this.v = v, this) : new __await(v);
	}

	function __asyncGenerator(thisArg, _arguments, generator) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var g = generator.apply(thisArg, _arguments || []), i, q = [];
	    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
	    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
	    function fulfill(value) { resume("next", value); }
	    function reject(value) { resume("throw", value); }
	    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	}

	function __asyncDelegator(o) {
	    var i, p;
	    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
	    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
	}

	function __asyncValues(o) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var m = o[Symbol.asyncIterator], i;
	    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	}

	function __makeTemplateObject(cooked, raw) {
	    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
	    return cooked;
	}
	var __setModuleDefault = Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	};

	function __importStar(mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	}

	function __importDefault(mod) {
	    return (mod && mod.__esModule) ? mod : { default: mod };
	}

	function __classPrivateFieldGet(receiver, privateMap) {
	    if (!privateMap.has(receiver)) {
	        throw new TypeError("attempted to get private field on non-instance");
	    }
	    return privateMap.get(receiver);
	}

	function __classPrivateFieldSet(receiver, privateMap, value) {
	    if (!privateMap.has(receiver)) {
	        throw new TypeError("attempted to set private field on non-instance");
	    }
	    privateMap.set(receiver, value);
	    return value;
	}

	var tslib_es6 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		__extends: __extends,
		get __assign () { return __assign; },
		__rest: __rest,
		__decorate: __decorate,
		__param: __param,
		__metadata: __metadata,
		__awaiter: __awaiter,
		__generator: __generator,
		__createBinding: __createBinding,
		__exportStar: __exportStar,
		__values: __values,
		__read: __read,
		__spread: __spread,
		__spreadArrays: __spreadArrays,
		__await: __await,
		__asyncGenerator: __asyncGenerator,
		__asyncDelegator: __asyncDelegator,
		__asyncValues: __asyncValues,
		__makeTemplateObject: __makeTemplateObject,
		__importStar: __importStar,
		__importDefault: __importDefault,
		__classPrivateFieldGet: __classPrivateFieldGet,
		__classPrivateFieldSet: __classPrivateFieldSet
	});

	// Copyright Joyent, Inc. and other Node contributors.

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	var decode = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

	// Copyright Joyent, Inc. and other Node contributors.

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	var encode = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};

	var querystring = createCommonjsModule(function (module, exports) {

	exports.decode = exports.parse = decode;
	exports.encode = exports.stringify = encode;
	});

	var bind = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is a Buffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Buffer, otherwise false
	 */
	function isBuffer(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
	    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a plain Object
	 *
	 * @param {Object} val The value to test
	 * @return {boolean} True if value is a plain Object, otherwise false
	 */
	function isPlainObject(val) {
	  if (toString.call(val) !== '[object Object]') {
	    return false;
	  }

	  var prototype = Object.getPrototypeOf(val);
	  return prototype === null || prototype === Object.prototype;
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
	                                           navigator.product === 'NativeScript' ||
	                                           navigator.product === 'NS')) {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (isPlainObject(result[key]) && isPlainObject(val)) {
	      result[key] = merge(result[key], val);
	    } else if (isPlainObject(val)) {
	      result[key] = merge({}, val);
	    } else if (isArray(val)) {
	      result[key] = val.slice();
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	/**
	 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	 *
	 * @param {string} content with BOM
	 * @return {string} content value without BOM
	 */
	function stripBOM(content) {
	  if (content.charCodeAt(0) === 0xFEFF) {
	    content = content.slice(1);
	  }
	  return content;
	}

	var utils = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isPlainObject: isPlainObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim,
	  stripBOM: stripBOM
	};

	function encode$1(val) {
	  return encodeURIComponent(val).
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	var buildURL = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode$1(key) + '=' + encode$1(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    var hashmarkIndex = url.indexOf('#');
	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }

	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	var InterceptorManager_1 = InterceptorManager;

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	var transformData = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};

	var isCancel = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};

	var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	var enhanceError = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }

	  error.request = request;
	  error.response = response;
	  error.isAxiosError = true;

	  error.toJSON = function toJSON() {
	    return {
	      // Standard
	      message: this.message,
	      name: this.name,
	      // Microsoft
	      description: this.description,
	      number: this.number,
	      // Mozilla
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      columnNumber: this.columnNumber,
	      stack: this.stack,
	      // Axios
	      config: this.config,
	      code: this.code
	    };
	  };
	  return error;
	};

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	var createError = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	var settle = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};

	var cookies = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	    (function standardBrowserEnv() {
	      return {
	        write: function write(name, value, expires, path, domain, secure) {
	          var cookie = [];
	          cookie.push(name + '=' + encodeURIComponent(value));

	          if (utils.isNumber(expires)) {
	            cookie.push('expires=' + new Date(expires).toGMTString());
	          }

	          if (utils.isString(path)) {
	            cookie.push('path=' + path);
	          }

	          if (utils.isString(domain)) {
	            cookie.push('domain=' + domain);
	          }

	          if (secure === true) {
	            cookie.push('secure');
	          }

	          document.cookie = cookie.join('; ');
	        },

	        read: function read(name) {
	          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	          return (match ? decodeURIComponent(match[3]) : null);
	        },

	        remove: function remove(name) {
	          this.write(name, '', Date.now() - 86400000);
	        }
	      };
	    })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return {
	        write: function write() {},
	        read: function read() { return null; },
	        remove: function remove() {}
	      };
	    })()
	);

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	var isAbsoluteURL = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	var combineURLs = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};

	/**
	 * Creates a new URL by combining the baseURL with the requestedURL,
	 * only when the requestedURL is not already an absolute URL.
	 * If the requestURL is absolute, this function returns the requestedURL untouched.
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} requestedURL Absolute or relative URL to combine
	 * @returns {string} The combined full path
	 */
	var buildFullPath = function buildFullPath(baseURL, requestedURL) {
	  if (baseURL && !isAbsoluteURL(requestedURL)) {
	    return combineURLs(baseURL, requestedURL);
	  }
	  return requestedURL;
	};

	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	var parseHeaders = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });

	  return parsed;
	};

	var isURLSameOrigin = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	    (function standardBrowserEnv() {
	      var msie = /(msie|trident)/i.test(navigator.userAgent);
	      var urlParsingNode = document.createElement('a');
	      var originURL;

	      /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	      function resolveURL(url) {
	        var href = url;

	        if (msie) {
	        // IE needs attribute set twice to normalize properties
	          urlParsingNode.setAttribute('href', href);
	          href = urlParsingNode.href;
	        }

	        urlParsingNode.setAttribute('href', href);

	        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	        return {
	          href: urlParsingNode.href,
	          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	          host: urlParsingNode.host,
	          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	          hostname: urlParsingNode.hostname,
	          port: urlParsingNode.port,
	          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	            urlParsingNode.pathname :
	            '/' + urlParsingNode.pathname
	        };
	      }

	      originURL = resolveURL(window.location.href);

	      /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	      return function isURLSameOrigin(requestURL) {
	        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	        return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	      };
	    })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return function isURLSameOrigin() {
	        return true;
	      };
	    })()
	);

	var xhr = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    var fullPath = buildFullPath(config.baseURL, config.url);
	    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request.onreadystatechange = function handleLoad() {
	      if (!request || request.readyState !== 4) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle browser request cancellation (as opposed to a manual cancellation)
	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }

	      reject(createError('Request aborted', config, 'ECONNABORTED', request));

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
	      if (config.timeoutErrorMessage) {
	        timeoutErrorMessage = config.timeoutErrorMessage;
	      }
	      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (!utils.isUndefined(config.withCredentials)) {
	      request.withCredentials = !!config.withCredentials;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (!requestData) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = xhr;
	  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
	    // For node use HTTP adapter
	    adapter = xhr;
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Accept');
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,
	  maxBodyLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	var defaults_1 = defaults;

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	var dispatchRequest = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults_1.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};

	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	var mergeConfig = function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  var config = {};

	  var valueFromConfig2Keys = ['url', 'method', 'data'];
	  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
	  var defaultToConfig2Keys = [
	    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
	    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
	    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
	    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
	    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
	  ];
	  var directMergeKeys = ['validateStatus'];

	  function getMergedValue(target, source) {
	    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
	      return utils.merge(target, source);
	    } else if (utils.isPlainObject(source)) {
	      return utils.merge({}, source);
	    } else if (utils.isArray(source)) {
	      return source.slice();
	    }
	    return source;
	  }

	  function mergeDeepProperties(prop) {
	    if (!utils.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (!utils.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  }

	  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
	    if (!utils.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    }
	  });

	  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

	  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
	    if (!utils.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    } else if (!utils.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });

	  utils.forEach(directMergeKeys, function merge(prop) {
	    if (prop in config2) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (prop in config1) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });

	  var axiosKeys = valueFromConfig2Keys
	    .concat(mergeDeepPropertiesKeys)
	    .concat(defaultToConfig2Keys)
	    .concat(directMergeKeys);

	  var otherKeys = Object
	    .keys(config1)
	    .concat(Object.keys(config2))
	    .filter(function filterAxiosKeys(key) {
	      return axiosKeys.indexOf(key) === -1;
	    });

	  utils.forEach(otherKeys, mergeDeepProperties);

	  return config;
	};

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager_1(),
	    response: new InterceptorManager_1()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = arguments[1] || {};
	    config.url = arguments[0];
	  } else {
	    config = config || {};
	  }

	  config = mergeConfig(this.defaults, config);

	  // Set config.method
	  if (config.method) {
	    config.method = config.method.toLowerCase();
	  } else if (this.defaults.method) {
	    config.method = this.defaults.method.toLowerCase();
	  } else {
	    config.method = 'get';
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	Axios.prototype.getUri = function getUri(config) {
	  config = mergeConfig(this.defaults, config);
	  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(mergeConfig(config || {}, {
	      method: method,
	      url: url,
	      data: (config || {}).data
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(mergeConfig(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	var Axios_1 = Axios;

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	var Cancel_1 = Cancel;

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel_1(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	var CancelToken_1 = CancelToken;

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	var spread = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios_1(defaultConfig);
	  var instance = bind(Axios_1.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios_1.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults_1);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios_1;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(mergeConfig(axios.defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = Cancel_1;
	axios.CancelToken = CancelToken_1;
	axios.isCancel = isCancel;

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = spread;

	var axios_1 = axios;

	// Allow use of default import syntax in TypeScript
	var _default = axios;
	axios_1.default = _default;

	var axios$1 = axios_1;

	var lib = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.create = void 0;

	var querystring_1 = tslib_es6.__importDefault(querystring);
	var axios_1 = tslib_es6.__importDefault(axios$1);
	var apiUrl = "https://api.voicecompass.ai/v1";
	var parseContactInfo = function () {
	    var search = window.location.search;
	    var normalizedSearch = search && search[0] === "?" ? search.substring(1) : search;
	    var parsed = querystring_1.default.parse(normalizedSearch);
	    var contactId = parsed.cid
	        ? Array.isArray(parsed.cid)
	            ? parsed.cid.join("")
	            : parsed.cid
	        : localStorage.getItem("vc-cid");
	    if (contactId) {
	        localStorage.setItem("vc-cid", contactId);
	    }
	    var fromReferrer = parsed.r
	        ? Array.isArray(parsed.r)
	            ? parsed.r.join("")
	            : parsed.r
	        : localStorage.getItem("vc-r");
	    if (fromReferrer) {
	        localStorage.setItem("vc-r", fromReferrer);
	    }
	    var email = parsed.email
	        ? Array.isArray(parsed.email)
	            ? parsed.email.join("")
	            : parsed.email
	        : localStorage.getItem("vc-email");
	    if (email) {
	        localStorage.setItem("vc-email", email);
	    }
	    var phone = parsed.phone
	        ? Array.isArray(parsed.phone)
	            ? parsed.phone.join("")
	            : parsed.phone
	        : localStorage.getItem("vc-phone");
	    if (phone) {
	        localStorage.setItem("vc-phone", phone);
	    }
	    var voice = parsed.voice
	        ? Array.isArray(parsed.voice)
	            ? parsed.voice.join("")
	            : parsed.voice
	        : localStorage.getItem("vc-voice");
	    if (voice) {
	        localStorage.setItem("vc-voice", voice);
	    }
	    return {
	        contactId: contactId,
	        email: email,
	        phone: phone,
	        fromReferrer: fromReferrer,
	        voice: voice,
	    };
	};
	exports.create = function (config) {
	    var info = parseContactInfo();
	    var client = axios_1.default.create({
	        baseURL: apiUrl,
	        timeout: 15000,
	        headers: {
	            "x-api-key": config.apiKey,
	        },
	    });
	    var stepId = null;
	    var updateStep = function (stepData) {
	        // skip step if the previous stepId is the same as the current stepId
	        if (stepData.stepId === stepId) {
	            return;
	        }
	        // skip step if no contactId is set
	        if (!info.contactId) {
	            return;
	        }
	        client
	            .post("/track", {
	            stepId: stepData.stepId,
	            contactId: info.contactId,
	            voice: stepData.voice,
	            end: stepData.end,
	            escalate: stepData.escalate,
	            payload: stepData.payload,
	            botId: config.botId,
	            journeyId: stepData.journeyId,
	            language: info.voice,
	        })
	            .then(function () {
	            stepId = stepData.stepId;
	            // remove the voice from cache, if the call is ending
	            // this is to ensure consistency when a new call is placed
	            if (stepData.end) {
	                localStorage.removeItem("vc-voice");
	            }
	        });
	    };
	    return { updateStep: updateStep };
	};

	});

	var lib$1 = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	     factory(exports) ;
	}(commonjsGlobal, (function (exports) {
	    function noop() { }
	    const identity = x => x;
	    function assign(tar, src) {
	        // @ts-ignore
	        for (const k in src)
	            tar[k] = src[k];
	        return tar;
	    }
	    function add_location(element, file, line, column, char) {
	        element.__svelte_meta = {
	            loc: { file, line, column, char }
	        };
	    }
	    function run(fn) {
	        return fn();
	    }
	    function blank_object() {
	        return Object.create(null);
	    }
	    function run_all(fns) {
	        fns.forEach(run);
	    }
	    function is_function(thing) {
	        return typeof thing === 'function';
	    }
	    function safe_not_equal(a, b) {
	        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	    }
	    function is_empty(obj) {
	        return Object.keys(obj).length === 0;
	    }
	    function create_slot(definition, ctx, $$scope, fn) {
	        if (definition) {
	            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
	            return definition[0](slot_ctx);
	        }
	    }
	    function get_slot_context(definition, ctx, $$scope, fn) {
	        return definition[1] && fn
	            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
	            : $$scope.ctx;
	    }
	    function get_slot_changes(definition, $$scope, dirty, fn) {
	        if (definition[2] && fn) {
	            const lets = definition[2](fn(dirty));
	            if ($$scope.dirty === undefined) {
	                return lets;
	            }
	            if (typeof lets === 'object') {
	                const merged = [];
	                const len = Math.max($$scope.dirty.length, lets.length);
	                for (let i = 0; i < len; i += 1) {
	                    merged[i] = $$scope.dirty[i] | lets[i];
	                }
	                return merged;
	            }
	            return $$scope.dirty | lets;
	        }
	        return $$scope.dirty;
	    }
	    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
	        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
	        if (slot_changes) {
	            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
	            slot.p(slot_context, slot_changes);
	        }
	    }

	    const is_client = typeof window !== 'undefined';
	    let now = is_client
	        ? () => window.performance.now()
	        : () => Date.now();
	    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

	    const tasks = new Set();
	    function run_tasks(now) {
	        tasks.forEach(task => {
	            if (!task.c(now)) {
	                tasks.delete(task);
	                task.f();
	            }
	        });
	        if (tasks.size !== 0)
	            raf(run_tasks);
	    }
	    /**
	     * Creates a new task that runs on each raf frame
	     * until it returns a falsy value or is aborted
	     */
	    function loop(callback) {
	        let task;
	        if (tasks.size === 0)
	            raf(run_tasks);
	        return {
	            promise: new Promise(fulfill => {
	                tasks.add(task = { c: callback, f: fulfill });
	            }),
	            abort() {
	                tasks.delete(task);
	            }
	        };
	    }

	    function append(target, node) {
	        target.appendChild(node);
	    }
	    function insert(target, node, anchor) {
	        target.insertBefore(node, anchor || null);
	    }
	    function detach(node) {
	        node.parentNode.removeChild(node);
	    }
	    function destroy_each(iterations, detaching) {
	        for (let i = 0; i < iterations.length; i += 1) {
	            if (iterations[i])
	                iterations[i].d(detaching);
	        }
	    }
	    function element(name) {
	        return document.createElement(name);
	    }
	    function text(data) {
	        return document.createTextNode(data);
	    }
	    function space() {
	        return text(' ');
	    }
	    function empty() {
	        return text('');
	    }
	    function listen(node, event, handler, options) {
	        node.addEventListener(event, handler, options);
	        return () => node.removeEventListener(event, handler, options);
	    }
	    function attr(node, attribute, value) {
	        if (value == null)
	            node.removeAttribute(attribute);
	        else if (node.getAttribute(attribute) !== value)
	            node.setAttribute(attribute, value);
	    }
	    function children(element) {
	        return Array.from(element.childNodes);
	    }
	    function toggle_class(element, name, toggle) {
	        element.classList[toggle ? 'add' : 'remove'](name);
	    }
	    function custom_event(type, detail) {
	        const e = document.createEvent('CustomEvent');
	        e.initCustomEvent(type, false, false, detail);
	        return e;
	    }

	    const active_docs = new Set();
	    let active = 0;
	    // https://github.com/darkskyapp/string-hash/blob/master/index.js
	    function hash(str) {
	        let hash = 5381;
	        let i = str.length;
	        while (i--)
	            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	        return hash >>> 0;
	    }
	    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
	        const step = 16.666 / duration;
	        let keyframes = '{\n';
	        for (let p = 0; p <= 1; p += step) {
	            const t = a + (b - a) * ease(p);
	            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
	        }
	        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
	        const name = `__svelte_${hash(rule)}_${uid}`;
	        const doc = node.ownerDocument;
	        active_docs.add(doc);
	        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
	        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
	        if (!current_rules[name]) {
	            current_rules[name] = true;
	            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
	        }
	        const animation = node.style.animation || '';
	        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
	        active += 1;
	        return name;
	    }
	    function delete_rule(node, name) {
	        const previous = (node.style.animation || '').split(', ');
	        const next = previous.filter(name
	            ? anim => anim.indexOf(name) < 0 // remove specific animation
	            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
	        );
	        const deleted = previous.length - next.length;
	        if (deleted) {
	            node.style.animation = next.join(', ');
	            active -= deleted;
	            if (!active)
	                clear_rules();
	        }
	    }
	    function clear_rules() {
	        raf(() => {
	            if (active)
	                return;
	            active_docs.forEach(doc => {
	                const stylesheet = doc.__svelte_stylesheet;
	                let i = stylesheet.cssRules.length;
	                while (i--)
	                    stylesheet.deleteRule(i);
	                doc.__svelte_rules = {};
	            });
	            active_docs.clear();
	        });
	    }

	    let current_component;
	    function set_current_component(component) {
	        current_component = component;
	    }
	    function get_current_component() {
	        if (!current_component)
	            throw new Error('Function called outside component initialization');
	        return current_component;
	    }
	    function createEventDispatcher() {
	        const component = get_current_component();
	        return (type, detail) => {
	            const callbacks = component.$$.callbacks[type];
	            if (callbacks) {
	                // TODO are there situations where events could be dispatched
	                // in a server (non-DOM) environment?
	                const event = custom_event(type, detail);
	                callbacks.slice().forEach(fn => {
	                    fn.call(component, event);
	                });
	            }
	        };
	    }
	    // TODO figure out if we still want to support
	    // shorthand events, or if we want to implement
	    // a real bubbling mechanism
	    function bubble(component, event) {
	        const callbacks = component.$$.callbacks[event.type];
	        if (callbacks) {
	            callbacks.slice().forEach(fn => fn(event));
	        }
	    }

	    const dirty_components = [];
	    const binding_callbacks = [];
	    const render_callbacks = [];
	    const flush_callbacks = [];
	    const resolved_promise = Promise.resolve();
	    let update_scheduled = false;
	    function schedule_update() {
	        if (!update_scheduled) {
	            update_scheduled = true;
	            resolved_promise.then(flush);
	        }
	    }
	    function add_render_callback(fn) {
	        render_callbacks.push(fn);
	    }
	    function add_flush_callback(fn) {
	        flush_callbacks.push(fn);
	    }
	    let flushing = false;
	    const seen_callbacks = new Set();
	    function flush() {
	        if (flushing)
	            return;
	        flushing = true;
	        do {
	            // first, call beforeUpdate functions
	            // and update components
	            for (let i = 0; i < dirty_components.length; i += 1) {
	                const component = dirty_components[i];
	                set_current_component(component);
	                update(component.$$);
	            }
	            set_current_component(null);
	            dirty_components.length = 0;
	            while (binding_callbacks.length)
	                binding_callbacks.pop()();
	            // then, once components are updated, call
	            // afterUpdate functions. This may cause
	            // subsequent updates...
	            for (let i = 0; i < render_callbacks.length; i += 1) {
	                const callback = render_callbacks[i];
	                if (!seen_callbacks.has(callback)) {
	                    // ...so guard against infinite loops
	                    seen_callbacks.add(callback);
	                    callback();
	                }
	            }
	            render_callbacks.length = 0;
	        } while (dirty_components.length);
	        while (flush_callbacks.length) {
	            flush_callbacks.pop()();
	        }
	        update_scheduled = false;
	        flushing = false;
	        seen_callbacks.clear();
	    }
	    function update($$) {
	        if ($$.fragment !== null) {
	            $$.update();
	            run_all($$.before_update);
	            const dirty = $$.dirty;
	            $$.dirty = [-1];
	            $$.fragment && $$.fragment.p($$.ctx, dirty);
	            $$.after_update.forEach(add_render_callback);
	        }
	    }

	    let promise;
	    function wait() {
	        if (!promise) {
	            promise = Promise.resolve();
	            promise.then(() => {
	                promise = null;
	            });
	        }
	        return promise;
	    }
	    function dispatch(node, direction, kind) {
	        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
	    }
	    const outroing = new Set();
	    let outros;
	    function group_outros() {
	        outros = {
	            r: 0,
	            c: [],
	            p: outros // parent group
	        };
	    }
	    function check_outros() {
	        if (!outros.r) {
	            run_all(outros.c);
	        }
	        outros = outros.p;
	    }
	    function transition_in(block, local) {
	        if (block && block.i) {
	            outroing.delete(block);
	            block.i(local);
	        }
	    }
	    function transition_out(block, local, detach, callback) {
	        if (block && block.o) {
	            if (outroing.has(block))
	                return;
	            outroing.add(block);
	            outros.c.push(() => {
	                outroing.delete(block);
	                if (callback) {
	                    if (detach)
	                        block.d(1);
	                    callback();
	                }
	            });
	            block.o(local);
	        }
	    }
	    const null_transition = { duration: 0 };
	    function create_bidirectional_transition(node, fn, params, intro) {
	        let config = fn(node, params);
	        let t = intro ? 0 : 1;
	        let running_program = null;
	        let pending_program = null;
	        let animation_name = null;
	        function clear_animation() {
	            if (animation_name)
	                delete_rule(node, animation_name);
	        }
	        function init(program, duration) {
	            const d = program.b - t;
	            duration *= Math.abs(d);
	            return {
	                a: t,
	                b: program.b,
	                d,
	                duration,
	                start: program.start,
	                end: program.start + duration,
	                group: program.group
	            };
	        }
	        function go(b) {
	            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
	            const program = {
	                start: now() + delay,
	                b
	            };
	            if (!b) {
	                // @ts-ignore todo: improve typings
	                program.group = outros;
	                outros.r += 1;
	            }
	            if (running_program || pending_program) {
	                pending_program = program;
	            }
	            else {
	                // if this is an intro, and there's a delay, we need to do
	                // an initial tick and/or apply CSS animation immediately
	                if (css) {
	                    clear_animation();
	                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
	                }
	                if (b)
	                    tick(0, 1);
	                running_program = init(program, duration);
	                add_render_callback(() => dispatch(node, b, 'start'));
	                loop(now => {
	                    if (pending_program && now > pending_program.start) {
	                        running_program = init(pending_program, duration);
	                        pending_program = null;
	                        dispatch(node, running_program.b, 'start');
	                        if (css) {
	                            clear_animation();
	                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
	                        }
	                    }
	                    if (running_program) {
	                        if (now >= running_program.end) {
	                            tick(t = running_program.b, 1 - t);
	                            dispatch(node, running_program.b, 'end');
	                            if (!pending_program) {
	                                // we're done
	                                if (running_program.b) {
	                                    // intro — we can tidy up immediately
	                                    clear_animation();
	                                }
	                                else {
	                                    // outro — needs to be coordinated
	                                    if (!--running_program.group.r)
	                                        run_all(running_program.group.c);
	                                }
	                            }
	                            running_program = null;
	                        }
	                        else if (now >= running_program.start) {
	                            const p = now - running_program.start;
	                            t = running_program.a + running_program.d * easing(p / running_program.duration);
	                            tick(t, 1 - t);
	                        }
	                    }
	                    return !!(running_program || pending_program);
	                });
	            }
	        }
	        return {
	            run(b) {
	                if (is_function(config)) {
	                    wait().then(() => {
	                        // @ts-ignore
	                        config = config();
	                        go(b);
	                    });
	                }
	                else {
	                    go(b);
	                }
	            },
	            end() {
	                clear_animation();
	                running_program = pending_program = null;
	            }
	        };
	    }

	    const globals = (typeof window !== 'undefined'
	        ? window
	        : typeof globalThis !== 'undefined'
	            ? globalThis
	            : commonjsGlobal);

	    function bind(component, name, callback) {
	        const index = component.$$.props[name];
	        if (index !== undefined) {
	            component.$$.bound[index] = callback;
	            callback(component.$$.ctx[index]);
	        }
	    }
	    function create_component(block) {
	        block && block.c();
	    }
	    function mount_component(component, target, anchor) {
	        const { fragment, on_mount, on_destroy, after_update } = component.$$;
	        fragment && fragment.m(target, anchor);
	        // onMount happens before the initial afterUpdate
	        add_render_callback(() => {
	            const new_on_destroy = on_mount.map(run).filter(is_function);
	            if (on_destroy) {
	                on_destroy.push(...new_on_destroy);
	            }
	            else {
	                // Edge case - component was destroyed immediately,
	                // most likely as a result of a binding initialising
	                run_all(new_on_destroy);
	            }
	            component.$$.on_mount = [];
	        });
	        after_update.forEach(add_render_callback);
	    }
	    function destroy_component(component, detaching) {
	        const $$ = component.$$;
	        if ($$.fragment !== null) {
	            run_all($$.on_destroy);
	            $$.fragment && $$.fragment.d(detaching);
	            // TODO null out other refs, including component.$$ (but need to
	            // preserve final state?)
	            $$.on_destroy = $$.fragment = null;
	            $$.ctx = [];
	        }
	    }
	    function make_dirty(component, i) {
	        if (component.$$.dirty[0] === -1) {
	            dirty_components.push(component);
	            schedule_update();
	            component.$$.dirty.fill(0);
	        }
	        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
	    }
	    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
	        const parent_component = current_component;
	        set_current_component(component);
	        const prop_values = options.props || {};
	        const $$ = component.$$ = {
	            fragment: null,
	            ctx: null,
	            // state
	            props,
	            update: noop,
	            not_equal,
	            bound: blank_object(),
	            // lifecycle
	            on_mount: [],
	            on_destroy: [],
	            before_update: [],
	            after_update: [],
	            context: new Map(parent_component ? parent_component.$$.context : []),
	            // everything else
	            callbacks: blank_object(),
	            dirty,
	            skip_bound: false
	        };
	        let ready = false;
	        $$.ctx = instance
	            ? instance(component, prop_values, (i, ret, ...rest) => {
	                const value = rest.length ? rest[0] : ret;
	                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
	                    if (!$$.skip_bound && $$.bound[i])
	                        $$.bound[i](value);
	                    if (ready)
	                        make_dirty(component, i);
	                }
	                return ret;
	            })
	            : [];
	        $$.update();
	        ready = true;
	        run_all($$.before_update);
	        // `false` as a special case of no DOM component
	        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	        if (options.target) {
	            if (options.hydrate) {
	                const nodes = children(options.target);
	                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                $$.fragment && $$.fragment.l(nodes);
	                nodes.forEach(detach);
	            }
	            else {
	                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                $$.fragment && $$.fragment.c();
	            }
	            if (options.intro)
	                transition_in(component.$$.fragment);
	            mount_component(component, options.target, options.anchor);
	            flush();
	        }
	        set_current_component(parent_component);
	    }
	    class SvelteComponent {
	        $destroy() {
	            destroy_component(this, 1);
	            this.$destroy = noop;
	        }
	        $on(type, callback) {
	            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
	            callbacks.push(callback);
	            return () => {
	                const index = callbacks.indexOf(callback);
	                if (index !== -1)
	                    callbacks.splice(index, 1);
	            };
	        }
	        $set($$props) {
	            if (this.$$set && !is_empty($$props)) {
	                this.$$.skip_bound = true;
	                this.$$set($$props);
	                this.$$.skip_bound = false;
	            }
	        }
	    }

	    function dispatch_dev(type, detail) {
	        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.29.4' }, detail)));
	    }
	    function append_dev(target, node) {
	        dispatch_dev('SvelteDOMInsert', { target, node });
	        append(target, node);
	    }
	    function insert_dev(target, node, anchor) {
	        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
	        insert(target, node, anchor);
	    }
	    function detach_dev(node) {
	        dispatch_dev('SvelteDOMRemove', { node });
	        detach(node);
	    }
	    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
	        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
	        if (has_prevent_default)
	            modifiers.push('preventDefault');
	        if (has_stop_propagation)
	            modifiers.push('stopPropagation');
	        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
	        const dispose = listen(node, event, handler, options);
	        return () => {
	            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
	            dispose();
	        };
	    }
	    function attr_dev(node, attribute, value) {
	        attr(node, attribute, value);
	        if (value == null)
	            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
	        else
	            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
	    }
	    function prop_dev(node, property, value) {
	        node[property] = value;
	        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
	    }
	    function set_data_dev(text, data) {
	        data = '' + data;
	        if (text.wholeText === data)
	            return;
	        dispatch_dev('SvelteDOMSetData', { node: text, data });
	        text.data = data;
	    }
	    function validate_each_argument(arg) {
	        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
	            let msg = '{#each} only iterates over array-like objects.';
	            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
	                msg += ' You can use a spread to convert this iterable into an array.';
	            }
	            throw new Error(msg);
	        }
	    }
	    function validate_slots(name, slot, keys) {
	        for (const slot_key of Object.keys(slot)) {
	            if (!~keys.indexOf(slot_key)) {
	                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
	            }
	        }
	    }
	    class SvelteComponentDev extends SvelteComponent {
	        constructor(options) {
	            if (!options || (!options.target && !options.$$inline)) {
	                throw new Error("'target' is a required option");
	            }
	            super();
	        }
	        $destroy() {
	            super.$destroy();
	            this.$destroy = () => {
	                console.warn('Component was already destroyed'); // eslint-disable-line no-console
	            };
	        }
	        $capture_state() { }
	        $inject_state() { }
	    }

	    function fade(node, { delay = 0, duration = 400, easing = identity }) {
	        const o = +getComputedStyle(node).opacity;
	        return {
	            delay,
	            duration,
	            easing,
	            css: t => `opacity: ${t * o}`
	        };
	    }

	    const isChoiceInput = (stepInput) => {
	        return stepInput.type === "choice";
	    };
	    const isTextInput = (stepInput) => {
	        return stepInput.type === "text";
	    };

	    const none = {
	        type: "none",
	    };
	    const pending = {
	        type: "pending",
	    };

	    /* src/components/Button.svelte generated by Svelte v3.29.4 */
	    const file = "src/components/Button.svelte";

	    // (69:2) {#if pending_}
	    function create_if_block(ctx) {
	    	let div3;
	    	let div0;
	    	let t0;
	    	let div1;
	    	let t1;
	    	let div2;

	    	const block = {
	    		c: function create() {
	    			div3 = element("div");
	    			div0 = element("div");
	    			t0 = space();
	    			div1 = element("div");
	    			t1 = space();
	    			div2 = element("div");
	    			attr_dev(div0, "class", "dot svelte-8wnct8");
	    			add_location(div0, file, 70, 6, 1361);
	    			attr_dev(div1, "class", "dot svelte-8wnct8");
	    			add_location(div1, file, 71, 6, 1387);
	    			attr_dev(div2, "class", "dot svelte-8wnct8");
	    			add_location(div2, file, 72, 6, 1413);
	    			attr_dev(div3, "class", "dots svelte-8wnct8");
	    			add_location(div3, file, 69, 4, 1336);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div3, anchor);
	    			append_dev(div3, div0);
	    			append_dev(div3, t0);
	    			append_dev(div3, div1);
	    			append_dev(div3, t1);
	    			append_dev(div3, div2);
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div3);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block.name,
	    		type: "if",
	    		source: "(69:2) {#if pending_}",
	    		ctx
	    	});

	    	return block;
	    }

	    function create_fragment(ctx) {
	    	let button;
	    	let t;
	    	let current;
	    	let mounted;
	    	let dispose;
	    	const default_slot_template = /*#slots*/ ctx[5].default;
	    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);
	    	let if_block = /*pending_*/ ctx[1] && create_if_block(ctx);

	    	const block = {
	    		c: function create() {
	    			button = element("button");
	    			if (default_slot) default_slot.c();
	    			t = space();
	    			if (if_block) if_block.c();
	    			attr_dev(button, "class", "relative inline-block w-full px-3 py-3 tracking-wider text-white uppercase bg-blue-600 border-none rounded transition duration-500 hover:bg-blue-700");
	    			toggle_class(button, "opacity-50", /*disabled_*/ ctx[0]);
	    			add_location(button, file, 63, 0, 1094);
	    		},
	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, button, anchor);

	    			if (default_slot) {
	    				default_slot.m(button, null);
	    			}

	    			append_dev(button, t);
	    			if (if_block) if_block.m(button, null);
	    			current = true;

	    			if (!mounted) {
	    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[6], false, false, false);
	    				mounted = true;
	    			}
	    		},
	    		p: function update(ctx, [dirty]) {
	    			if (default_slot) {
	    				if (default_slot.p && dirty & /*$$scope*/ 16) {
	    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[4], dirty, null, null);
	    				}
	    			}

	    			if (/*pending_*/ ctx[1]) {
	    				if (if_block) ; else {
	    					if_block = create_if_block(ctx);
	    					if_block.c();
	    					if_block.m(button, null);
	    				}
	    			} else if (if_block) {
	    				if_block.d(1);
	    				if_block = null;
	    			}

	    			if (dirty & /*disabled_*/ 1) {
	    				toggle_class(button, "opacity-50", /*disabled_*/ ctx[0]);
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(default_slot, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(default_slot, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(button);
	    			if (default_slot) default_slot.d(detaching);
	    			if (if_block) if_block.d();
	    			mounted = false;
	    			dispose();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_fragment.name,
	    		type: "component",
	    		source: "",
	    		ctx
	    	});

	    	return block;
	    }

	    function instance($$self, $$props, $$invalidate) {
	    	let { $$slots: slots = {}, $$scope } = $$props;
	    	validate_slots("Button", slots, ['default']);
	    	
	    	let { disabled = false } = $$props;
	    	let { status = none } = $$props;
	    	const writable_props = ["disabled", "status"];

	    	Object.keys($$props).forEach(key => {
	    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
	    	});

	    	function click_handler(event) {
	    		bubble($$self, event);
	    	}

	    	$$self.$$set = $$props => {
	    		if ("disabled" in $$props) $$invalidate(2, disabled = $$props.disabled);
	    		if ("status" in $$props) $$invalidate(3, status = $$props.status);
	    		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
	    	};

	    	$$self.$capture_state = () => ({
	    		none,
	    		disabled,
	    		status,
	    		disabled_,
	    		pending_,
	    		error_
	    	});

	    	$$self.$inject_state = $$props => {
	    		if ("disabled" in $$props) $$invalidate(2, disabled = $$props.disabled);
	    		if ("status" in $$props) $$invalidate(3, status = $$props.status);
	    		if ("disabled_" in $$props) $$invalidate(0, disabled_ = $$props.disabled_);
	    		if ("pending_" in $$props) $$invalidate(1, pending_ = $$props.pending_);
	    		if ("error_" in $$props) error_ = $$props.error_;
	    	};

	    	let disabled_;
	    	let pending_;
	    	let error_;

	    	if ($$props && "$$inject" in $$props) {
	    		$$self.$inject_state($$props.$$inject);
	    	}

	    	$$self.$$.update = () => {
	    		if ($$self.$$.dirty & /*disabled, status*/ 12) {
	    			 $$invalidate(0, disabled_ = disabled || status.type === "pending");
	    		}

	    		if ($$self.$$.dirty & /*status*/ 8) {
	    			 $$invalidate(1, pending_ = status.type === "pending");
	    		}

	    		if ($$self.$$.dirty & /*status*/ 8) {
	    			 error_ = status.type === "error" ? status.payload : undefined;
	    		}
	    	};

	    	return [disabled_, pending_, disabled, status, $$scope, slots, click_handler];
	    }

	    class Button extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);
	    		init(this, options, instance, create_fragment, safe_not_equal, { disabled: 2, status: 3 });

	    		dispatch_dev("SvelteRegisterComponent", {
	    			component: this,
	    			tagName: "Button",
	    			options,
	    			id: create_fragment.name
	    		});
	    	}

	    	get disabled() {
	    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set disabled(value) {
	    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get status() {
	    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set status(value) {
	    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}
	    }

	    /* src/App.svelte generated by Svelte v3.29.4 */
	    const file$1 = "src/App.svelte";

	    // (77:4) {:else}
	    function create_else_block(ctx) {
	    	let p;

	    	const block = {
	    		c: function create() {
	    			p = element("p");
	    			p.textContent = "Step not found";
	    			add_location(p, file$1, 77, 6, 1871);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, p, anchor);
	    		},
	    		p: noop,
	    		i: noop,
	    		o: noop,
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(p);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_else_block.name,
	    		type: "else",
	    		source: "(77:4) {:else}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (46:4) {#if step}
	    function create_if_block$1(ctx) {
	    	let div;
	    	let previous_key = /*stepId*/ ctx[2];
	    	let current;
	    	let key_block = create_key_block(ctx);

	    	const block = {
	    		c: function create() {
	    			div = element("div");
	    			key_block.c();
	    			attr_dev(div, "class", "relative");
	    			add_location(div, file$1, 46, 6, 862);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div, anchor);
	    			key_block.m(div, null);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			if (dirty & /*stepId*/ 4 && safe_not_equal(previous_key, previous_key = /*stepId*/ ctx[2])) {
	    				group_outros();
	    				transition_out(key_block, 1, 1, noop);
	    				check_outros();
	    				key_block = create_key_block(ctx);
	    				key_block.c();
	    				transition_in(key_block);
	    				key_block.m(div, null);
	    			} else {
	    				key_block.p(ctx, dirty);
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(key_block);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(key_block);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div);
	    			key_block.d(detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block$1.name,
	    		type: "if",
	    		source: "(46:4) {#if step}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (54:12) {#if step.input}
	    function create_if_block_1(ctx) {
	    	let show_if_1 = isTextInput(/*step*/ ctx[4].input);
	    	let t;
	    	let show_if = isChoiceInput(/*step*/ ctx[4].input);
	    	let if_block1_anchor;
	    	let current;
	    	let if_block0 = show_if_1 && create_if_block_3(ctx);
	    	let if_block1 = show_if && create_if_block_2(ctx);

	    	const block = {
	    		c: function create() {
	    			if (if_block0) if_block0.c();
	    			t = space();
	    			if (if_block1) if_block1.c();
	    			if_block1_anchor = empty();
	    		},
	    		m: function mount(target, anchor) {
	    			if (if_block0) if_block0.m(target, anchor);
	    			insert_dev(target, t, anchor);
	    			if (if_block1) if_block1.m(target, anchor);
	    			insert_dev(target, if_block1_anchor, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			if (dirty & /*step*/ 16) show_if_1 = isTextInput(/*step*/ ctx[4].input);

	    			if (show_if_1) {
	    				if (if_block0) {
	    					if_block0.p(ctx, dirty);

	    					if (dirty & /*step*/ 16) {
	    						transition_in(if_block0, 1);
	    					}
	    				} else {
	    					if_block0 = create_if_block_3(ctx);
	    					if_block0.c();
	    					transition_in(if_block0, 1);
	    					if_block0.m(t.parentNode, t);
	    				}
	    			} else if (if_block0) {
	    				group_outros();

	    				transition_out(if_block0, 1, 1, () => {
	    					if_block0 = null;
	    				});

	    				check_outros();
	    			}

	    			if (dirty & /*step*/ 16) show_if = isChoiceInput(/*step*/ ctx[4].input);

	    			if (show_if) {
	    				if (if_block1) {
	    					if_block1.p(ctx, dirty);

	    					if (dirty & /*step*/ 16) {
	    						transition_in(if_block1, 1);
	    					}
	    				} else {
	    					if_block1 = create_if_block_2(ctx);
	    					if_block1.c();
	    					transition_in(if_block1, 1);
	    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
	    				}
	    			} else if (if_block1) {
	    				group_outros();

	    				transition_out(if_block1, 1, 1, () => {
	    					if_block1 = null;
	    				});

	    				check_outros();
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block0);
	    			transition_in(if_block1);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(if_block0);
	    			transition_out(if_block1);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (if_block0) if_block0.d(detaching);
	    			if (detaching) detach_dev(t);
	    			if (if_block1) if_block1.d(detaching);
	    			if (detaching) detach_dev(if_block1_anchor);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_1.name,
	    		type: "if",
	    		source: "(54:12) {#if step.input}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (55:14) {#if isTextInput(step.input)}
	    function create_if_block_3(ctx) {
	    	let switch_instance;
	    	let updating_state;
	    	let switch_instance_anchor;
	    	let current;

	    	function switch_instance_state_binding(value) {
	    		/*switch_instance_state_binding*/ ctx[7].call(null, value);
	    	}

	    	var switch_value = /*TextInput*/ ctx[0];

	    	function switch_props(ctx) {
	    		let switch_instance_props = { input: /*step*/ ctx[4].input };

	    		if (/*state*/ ctx[3] !== void 0) {
	    			switch_instance_props.state = /*state*/ ctx[3];
	    		}

	    		return {
	    			props: switch_instance_props,
	    			$$inline: true
	    		};
	    	}

	    	if (switch_value) {
	    		switch_instance = new switch_value(switch_props(ctx));
	    		binding_callbacks.push(() => bind(switch_instance, "state", switch_instance_state_binding));
	    		switch_instance.$on("next", /*next_handler*/ ctx[8]);
	    	}

	    	const block = {
	    		c: function create() {
	    			if (switch_instance) create_component(switch_instance.$$.fragment);
	    			switch_instance_anchor = empty();
	    		},
	    		m: function mount(target, anchor) {
	    			if (switch_instance) {
	    				mount_component(switch_instance, target, anchor);
	    			}

	    			insert_dev(target, switch_instance_anchor, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			const switch_instance_changes = {};
	    			if (dirty & /*step*/ 16) switch_instance_changes.input = /*step*/ ctx[4].input;

	    			if (!updating_state && dirty & /*state*/ 8) {
	    				updating_state = true;
	    				switch_instance_changes.state = /*state*/ ctx[3];
	    				add_flush_callback(() => updating_state = false);
	    			}

	    			if (switch_value !== (switch_value = /*TextInput*/ ctx[0])) {
	    				if (switch_instance) {
	    					group_outros();
	    					const old_component = switch_instance;

	    					transition_out(old_component.$$.fragment, 1, 0, () => {
	    						destroy_component(old_component, 1);
	    					});

	    					check_outros();
	    				}

	    				if (switch_value) {
	    					switch_instance = new switch_value(switch_props(ctx));
	    					binding_callbacks.push(() => bind(switch_instance, "state", switch_instance_state_binding));
	    					switch_instance.$on("next", /*next_handler*/ ctx[8]);
	    					create_component(switch_instance.$$.fragment);
	    					transition_in(switch_instance.$$.fragment, 1);
	    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
	    				} else {
	    					switch_instance = null;
	    				}
	    			} else if (switch_value) {
	    				switch_instance.$set(switch_instance_changes);
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(switch_instance_anchor);
	    			if (switch_instance) destroy_component(switch_instance, detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_3.name,
	    		type: "if",
	    		source: "(55:14) {#if isTextInput(step.input)}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (64:14) {#if isChoiceInput(step.input)}
	    function create_if_block_2(ctx) {
	    	let switch_instance;
	    	let updating_state;
	    	let switch_instance_anchor;
	    	let current;

	    	function switch_instance_state_binding_1(value) {
	    		/*switch_instance_state_binding_1*/ ctx[9].call(null, value);
	    	}

	    	var switch_value = /*ChoiceInput*/ ctx[1];

	    	function switch_props(ctx) {
	    		let switch_instance_props = { input: /*step*/ ctx[4].input };

	    		if (/*state*/ ctx[3] !== void 0) {
	    			switch_instance_props.state = /*state*/ ctx[3];
	    		}

	    		return {
	    			props: switch_instance_props,
	    			$$inline: true
	    		};
	    	}

	    	if (switch_value) {
	    		switch_instance = new switch_value(switch_props(ctx));
	    		binding_callbacks.push(() => bind(switch_instance, "state", switch_instance_state_binding_1));
	    		switch_instance.$on("next", /*next_handler_1*/ ctx[10]);
	    	}

	    	const block = {
	    		c: function create() {
	    			if (switch_instance) create_component(switch_instance.$$.fragment);
	    			switch_instance_anchor = empty();
	    		},
	    		m: function mount(target, anchor) {
	    			if (switch_instance) {
	    				mount_component(switch_instance, target, anchor);
	    			}

	    			insert_dev(target, switch_instance_anchor, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			const switch_instance_changes = {};
	    			if (dirty & /*step*/ 16) switch_instance_changes.input = /*step*/ ctx[4].input;

	    			if (!updating_state && dirty & /*state*/ 8) {
	    				updating_state = true;
	    				switch_instance_changes.state = /*state*/ ctx[3];
	    				add_flush_callback(() => updating_state = false);
	    			}

	    			if (switch_value !== (switch_value = /*ChoiceInput*/ ctx[1])) {
	    				if (switch_instance) {
	    					group_outros();
	    					const old_component = switch_instance;

	    					transition_out(old_component.$$.fragment, 1, 0, () => {
	    						destroy_component(old_component, 1);
	    					});

	    					check_outros();
	    				}

	    				if (switch_value) {
	    					switch_instance = new switch_value(switch_props(ctx));
	    					binding_callbacks.push(() => bind(switch_instance, "state", switch_instance_state_binding_1));
	    					switch_instance.$on("next", /*next_handler_1*/ ctx[10]);
	    					create_component(switch_instance.$$.fragment);
	    					transition_in(switch_instance.$$.fragment, 1);
	    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
	    				} else {
	    					switch_instance = null;
	    				}
	    			} else if (switch_value) {
	    				switch_instance.$set(switch_instance_changes);
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(switch_instance_anchor);
	    			if (switch_instance) destroy_component(switch_instance, detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_2.name,
	    		type: "if",
	    		source: "(64:14) {#if isChoiceInput(step.input)}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (48:8) {#key stepId}
	    function create_key_block(ctx) {
	    	let div1;
	    	let div0;
	    	let h1;
	    	let t0_value = /*step*/ ctx[4].title + "";
	    	let t0;
	    	let t1;
	    	let p;
	    	let t2_value = /*interpolate*/ ctx[5](/*step*/ ctx[4].body) + "";
	    	let t2;
	    	let t3;
	    	let div1_transition;
	    	let current;
	    	let if_block = /*step*/ ctx[4].input && create_if_block_1(ctx);

	    	const block = {
	    		c: function create() {
	    			div1 = element("div");
	    			div0 = element("div");
	    			h1 = element("h1");
	    			t0 = text(t0_value);
	    			t1 = space();
	    			p = element("p");
	    			t2 = text(t2_value);
	    			t3 = space();
	    			if (if_block) if_block.c();
	    			attr_dev(h1, "class", "text-4xl font-bold");
	    			add_location(h1, file$1, 50, 14, 1043);
	    			add_location(p, file$1, 51, 14, 1106);
	    			attr_dev(div0, "class", "text-center space-y-2");
	    			add_location(div0, file$1, 49, 12, 993);
	    			attr_dev(div1, "class", "absolute left-0 right-0 space-y-4");
	    			add_location(div1, file$1, 48, 10, 917);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div1, anchor);
	    			append_dev(div1, div0);
	    			append_dev(div0, h1);
	    			append_dev(h1, t0);
	    			append_dev(div0, t1);
	    			append_dev(div0, p);
	    			append_dev(p, t2);
	    			append_dev(div1, t3);
	    			if (if_block) if_block.m(div1, null);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			if ((!current || dirty & /*step*/ 16) && t0_value !== (t0_value = /*step*/ ctx[4].title + "")) set_data_dev(t0, t0_value);
	    			if ((!current || dirty & /*step*/ 16) && t2_value !== (t2_value = /*interpolate*/ ctx[5](/*step*/ ctx[4].body) + "")) set_data_dev(t2, t2_value);

	    			if (/*step*/ ctx[4].input) {
	    				if (if_block) {
	    					if_block.p(ctx, dirty);

	    					if (dirty & /*step*/ 16) {
	    						transition_in(if_block, 1);
	    					}
	    				} else {
	    					if_block = create_if_block_1(ctx);
	    					if_block.c();
	    					transition_in(if_block, 1);
	    					if_block.m(div1, null);
	    				}
	    			} else if (if_block) {
	    				group_outros();

	    				transition_out(if_block, 1, 1, () => {
	    					if_block = null;
	    				});

	    				check_outros();
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block);

	    			add_render_callback(() => {
	    				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, {}, true);
	    				div1_transition.run(1);
	    			});

	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(if_block);
	    			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, {}, false);
	    			div1_transition.run(0);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div1);
	    			if (if_block) if_block.d();
	    			if (detaching && div1_transition) div1_transition.end();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_key_block.name,
	    		type: "key",
	    		source: "(48:8) {#key stepId}",
	    		ctx
	    	});

	    	return block;
	    }

	    function create_fragment$1(ctx) {
	    	let main;
	    	let div;
	    	let current_block_type_index;
	    	let if_block;
	    	let current;
	    	const if_block_creators = [create_if_block$1, create_else_block];
	    	const if_blocks = [];

	    	function select_block_type(ctx, dirty) {
	    		if (/*step*/ ctx[4]) return 0;
	    		return 1;
	    	}

	    	current_block_type_index = select_block_type(ctx);
	    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	    	const block = {
	    		c: function create() {
	    			main = element("main");
	    			div = element("div");
	    			if_block.c();
	    			attr_dev(div, "class", "max-w-md mx-auto");
	    			add_location(div, file$1, 44, 2, 810);
	    			attr_dev(main, "class", "svelte-t6b1s9");
	    			add_location(main, file$1, 43, 0, 801);
	    		},
	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, main, anchor);
	    			append_dev(main, div);
	    			if_blocks[current_block_type_index].m(div, null);
	    			current = true;
	    		},
	    		p: function update(ctx, [dirty]) {
	    			let previous_block_index = current_block_type_index;
	    			current_block_type_index = select_block_type(ctx);

	    			if (current_block_type_index === previous_block_index) {
	    				if_blocks[current_block_type_index].p(ctx, dirty);
	    			} else {
	    				group_outros();

	    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
	    					if_blocks[previous_block_index] = null;
	    				});

	    				check_outros();
	    				if_block = if_blocks[current_block_type_index];

	    				if (!if_block) {
	    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	    					if_block.c();
	    				}

	    				transition_in(if_block, 1);
	    				if_block.m(div, null);
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(if_block);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(main);
	    			if_blocks[current_block_type_index].d();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_fragment$1.name,
	    		type: "component",
	    		source: "",
	    		ctx
	    	});

	    	return block;
	    }

	    function instance$1($$self, $$props, $$invalidate) {
	    	let { $$slots: slots = {}, $$scope } = $$props;
	    	validate_slots("App", slots, []);
	    	
	    	let { TextInput } = $$props;
	    	let { ChoiceInput } = $$props;
	    	let { logic = {} } = $$props;
	    	let stepId = "root";
	    	let state = {};

	    	const interpolate = str => {
	    		return str.replace(/{(.*?)}/g, val => {
	    			const key = val.slice(1, -1);
	    			const stateVal = state[key];
	    			return stateVal || val;
	    		});
	    	};

	    	const writable_props = ["TextInput", "ChoiceInput", "logic"];

	    	Object.keys($$props).forEach(key => {
	    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	    	});

	    	function switch_instance_state_binding(value) {
	    		state = value;
	    		$$invalidate(3, state);
	    	}

	    	const next_handler = ev => {
	    		$$invalidate(2, stepId = ev.detail);
	    	};

	    	function switch_instance_state_binding_1(value) {
	    		state = value;
	    		$$invalidate(3, state);
	    	}

	    	const next_handler_1 = ev => {
	    		$$invalidate(2, stepId = ev.detail);
	    	};

	    	$$self.$$set = $$props => {
	    		if ("TextInput" in $$props) $$invalidate(0, TextInput = $$props.TextInput);
	    		if ("ChoiceInput" in $$props) $$invalidate(1, ChoiceInput = $$props.ChoiceInput);
	    		if ("logic" in $$props) $$invalidate(6, logic = $$props.logic);
	    	};

	    	$$self.$capture_state = () => ({
	    		fade,
	    		isTextInput,
	    		isChoiceInput,
	    		Button,
	    		pending,
	    		TextInput,
	    		ChoiceInput,
	    		logic,
	    		stepId,
	    		state,
	    		interpolate,
	    		step
	    	});

	    	$$self.$inject_state = $$props => {
	    		if ("TextInput" in $$props) $$invalidate(0, TextInput = $$props.TextInput);
	    		if ("ChoiceInput" in $$props) $$invalidate(1, ChoiceInput = $$props.ChoiceInput);
	    		if ("logic" in $$props) $$invalidate(6, logic = $$props.logic);
	    		if ("stepId" in $$props) $$invalidate(2, stepId = $$props.stepId);
	    		if ("state" in $$props) $$invalidate(3, state = $$props.state);
	    		if ("step" in $$props) $$invalidate(4, step = $$props.step);
	    	};

	    	let step;

	    	if ($$props && "$$inject" in $$props) {
	    		$$self.$inject_state($$props.$$inject);
	    	}

	    	$$self.$$.update = () => {
	    		if ($$self.$$.dirty & /*logic, stepId*/ 68) {
	    			 $$invalidate(4, step = logic[stepId]);
	    		}
	    	};

	    	return [
	    		TextInput,
	    		ChoiceInput,
	    		stepId,
	    		state,
	    		step,
	    		interpolate,
	    		logic,
	    		switch_instance_state_binding,
	    		next_handler,
	    		switch_instance_state_binding_1,
	    		next_handler_1
	    	];
	    }

	    class App extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);
	    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { TextInput: 0, ChoiceInput: 1, logic: 6 });

	    		dispatch_dev("SvelteRegisterComponent", {
	    			component: this,
	    			tagName: "App",
	    			options,
	    			id: create_fragment$1.name
	    		});

	    		const { ctx } = this.$$;
	    		const props = options.props || {};

	    		if (/*TextInput*/ ctx[0] === undefined && !("TextInput" in props)) {
	    			console.warn("<App> was created without expected prop 'TextInput'");
	    		}

	    		if (/*ChoiceInput*/ ctx[1] === undefined && !("ChoiceInput" in props)) {
	    			console.warn("<App> was created without expected prop 'ChoiceInput'");
	    		}
	    	}

	    	get TextInput() {
	    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set TextInput(value) {
	    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get ChoiceInput() {
	    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set ChoiceInput(value) {
	    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get logic() {
	    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set logic(value) {
	    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}
	    }

	    /* src/widgets/TextInput.svelte generated by Svelte v3.29.4 */

	    const { Object: Object_1 } = globals;
	    const file$2 = "src/widgets/TextInput.svelte";

	    // (20:2) <Button on:click={continueText}>
	    function create_default_slot(ctx) {
	    	let t;

	    	const block = {
	    		c: function create() {
	    			t = text("Continue");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, t, anchor);
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(t);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_default_slot.name,
	    		type: "slot",
	    		source: "(20:2) <Button on:click={continueText}>",
	    		ctx
	    	});

	    	return block;
	    }

	    function create_fragment$2(ctx) {
	    	let div;
	    	let input_1;
	    	let input_1_value_value;
	    	let t;
	    	let button;
	    	let current;
	    	let mounted;
	    	let dispose;

	    	button = new Button({
	    			props: {
	    				$$slots: { default: [create_default_slot] },
	    				$$scope: { ctx }
	    			},
	    			$$inline: true
	    		});

	    	button.$on("click", /*continueText*/ ctx[3]);

	    	const block = {
	    		c: function create() {
	    			div = element("div");
	    			input_1 = element("input");
	    			t = space();
	    			create_component(button.$$.fragment);
	    			attr_dev(input_1, "class", "block w-full p-1 border border-gray-300 rounded");
	    			input_1.value = input_1_value_value = /*state*/ ctx[0][/*input*/ ctx[1].set] || "";
	    			add_location(input_1, file$2, 15, 2, 424);
	    			attr_dev(div, "class", "space-y-4");
	    			add_location(div, file$2, 14, 0, 398);
	    		},
	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div, anchor);
	    			append_dev(div, input_1);
	    			append_dev(div, t);
	    			mount_component(button, div, null);
	    			current = true;

	    			if (!mounted) {
	    				dispose = listen_dev(input_1, "input", /*typeInInput*/ ctx[2], false, false, false);
	    				mounted = true;
	    			}
	    		},
	    		p: function update(ctx, [dirty]) {
	    			if (!current || dirty & /*state, input*/ 3 && input_1_value_value !== (input_1_value_value = /*state*/ ctx[0][/*input*/ ctx[1].set] || "") && input_1.value !== input_1_value_value) {
	    				prop_dev(input_1, "value", input_1_value_value);
	    			}

	    			const button_changes = {};

	    			if (dirty & /*$$scope*/ 32) {
	    				button_changes.$$scope = { dirty, ctx };
	    			}

	    			button.$set(button_changes);
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(button.$$.fragment, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(button.$$.fragment, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div);
	    			destroy_component(button);
	    			mounted = false;
	    			dispose();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_fragment$2.name,
	    		type: "component",
	    		source: "",
	    		ctx
	    	});

	    	return block;
	    }

	    function instance$2($$self, $$props, $$invalidate) {
	    	let { $$slots: slots = {}, $$scope } = $$props;
	    	validate_slots("TextInput", slots, []);
	    	
	    	const dispatch = createEventDispatcher();
	    	let { state = {} } = $$props;
	    	let { input } = $$props;

	    	const typeInInput = ev => {
	    		$$invalidate(0, state = Object.assign(Object.assign({}, state), { [input.set]: ev.target.value }));
	    	};

	    	const continueText = () => {
	    		dispatch("next", input.next);
	    	};

	    	const writable_props = ["state", "input"];

	    	Object_1.keys($$props).forEach(key => {
	    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TextInput> was created with unknown prop '${key}'`);
	    	});

	    	$$self.$$set = $$props => {
	    		if ("state" in $$props) $$invalidate(0, state = $$props.state);
	    		if ("input" in $$props) $$invalidate(1, input = $$props.input);
	    	};

	    	$$self.$capture_state = () => ({
	    		createEventDispatcher,
	    		Button,
	    		dispatch,
	    		state,
	    		input,
	    		typeInInput,
	    		continueText
	    	});

	    	$$self.$inject_state = $$props => {
	    		if ("state" in $$props) $$invalidate(0, state = $$props.state);
	    		if ("input" in $$props) $$invalidate(1, input = $$props.input);
	    	};

	    	if ($$props && "$$inject" in $$props) {
	    		$$self.$inject_state($$props.$$inject);
	    	}

	    	return [state, input, typeInInput, continueText];
	    }

	    class TextInput extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);
	    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { state: 0, input: 1 });

	    		dispatch_dev("SvelteRegisterComponent", {
	    			component: this,
	    			tagName: "TextInput",
	    			options,
	    			id: create_fragment$2.name
	    		});

	    		const { ctx } = this.$$;
	    		const props = options.props || {};

	    		if (/*input*/ ctx[1] === undefined && !("input" in props)) {
	    			console.warn("<TextInput> was created without expected prop 'input'");
	    		}
	    	}

	    	get state() {
	    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set state(value) {
	    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get input() {
	    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set input(value) {
	    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}
	    }

	    /* src/widgets/ChoiceInput.svelte generated by Svelte v3.29.4 */

	    const { Object: Object_1$1 } = globals;
	    const file$3 = "src/widgets/ChoiceInput.svelte";

	    function get_each_context(ctx, list, i) {
	    	const child_ctx = ctx.slice();
	    	child_ctx[7] = list[i];
	    	return child_ctx;
	    }

	    // (24:2) {#each input.choices as choice}
	    function create_each_block(ctx) {
	    	let li;
	    	let t0_value = /*choice*/ ctx[7].label + "";
	    	let t0;
	    	let t1;
	    	let mounted;
	    	let dispose;

	    	function click_handler(...args) {
	    		return /*click_handler*/ ctx[4](/*choice*/ ctx[7], ...args);
	    	}

	    	const block = {
	    		c: function create() {
	    			li = element("li");
	    			t0 = text(t0_value);
	    			t1 = space();
	    			attr_dev(li, "class", "p-2 border border-transparent rounded shadow cursor-pointer hover:bg-gray-100");
	    			toggle_class(li, "border-green-600", /*state*/ ctx[0][/*input*/ ctx[1].set] === /*choice*/ ctx[7].value);
	    			add_location(li, file$3, 24, 4, 701);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, li, anchor);
	    			append_dev(li, t0);
	    			append_dev(li, t1);

	    			if (!mounted) {
	    				dispose = listen_dev(li, "click", click_handler, false, false, false);
	    				mounted = true;
	    			}
	    		},
	    		p: function update(new_ctx, dirty) {
	    			ctx = new_ctx;
	    			if (dirty & /*input*/ 2 && t0_value !== (t0_value = /*choice*/ ctx[7].label + "")) set_data_dev(t0, t0_value);

	    			if (dirty & /*state, input*/ 3) {
	    				toggle_class(li, "border-green-600", /*state*/ ctx[0][/*input*/ ctx[1].set] === /*choice*/ ctx[7].value);
	    			}
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(li);
	    			mounted = false;
	    			dispose();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_each_block.name,
	    		type: "each",
	    		source: "(24:2) {#each input.choices as choice}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (35:0) {#if !input.immediate}
	    function create_if_block$2(ctx) {
	    	let button;
	    	let current;

	    	button = new Button({
	    			props: {
	    				disabled: !/*state*/ ctx[0][/*input*/ ctx[1].set],
	    				$$slots: { default: [create_default_slot$1] },
	    				$$scope: { ctx }
	    			},
	    			$$inline: true
	    		});

	    	button.$on("click", /*handleButtonClick*/ ctx[3]);

	    	const block = {
	    		c: function create() {
	    			create_component(button.$$.fragment);
	    		},
	    		m: function mount(target, anchor) {
	    			mount_component(button, target, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			const button_changes = {};
	    			if (dirty & /*state, input*/ 3) button_changes.disabled = !/*state*/ ctx[0][/*input*/ ctx[1].set];

	    			if (dirty & /*$$scope*/ 1024) {
	    				button_changes.$$scope = { dirty, ctx };
	    			}

	    			button.$set(button_changes);
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(button.$$.fragment, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(button.$$.fragment, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			destroy_component(button, detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block$2.name,
	    		type: "if",
	    		source: "(35:0) {#if !input.immediate}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (36:2) <Button disabled={!state[input.set]} on:click={handleButtonClick}>
	    function create_default_slot$1(ctx) {
	    	let t;

	    	const block = {
	    		c: function create() {
	    			t = text("Continue");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, t, anchor);
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(t);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_default_slot$1.name,
	    		type: "slot",
	    		source: "(36:2) <Button disabled={!state[input.set]} on:click={handleButtonClick}>",
	    		ctx
	    	});

	    	return block;
	    }

	    function create_fragment$3(ctx) {
	    	let ul;
	    	let t;
	    	let if_block_anchor;
	    	let current;
	    	let each_value = /*input*/ ctx[1].choices;
	    	validate_each_argument(each_value);
	    	let each_blocks = [];

	    	for (let i = 0; i < each_value.length; i += 1) {
	    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	    	}

	    	let if_block = !/*input*/ ctx[1].immediate && create_if_block$2(ctx);

	    	const block = {
	    		c: function create() {
	    			ul = element("ul");

	    			for (let i = 0; i < each_blocks.length; i += 1) {
	    				each_blocks[i].c();
	    			}

	    			t = space();
	    			if (if_block) if_block.c();
	    			if_block_anchor = empty();
	    			attr_dev(ul, "class", "space-y-4");
	    			add_location(ul, file$3, 22, 0, 640);
	    		},
	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, ul, anchor);

	    			for (let i = 0; i < each_blocks.length; i += 1) {
	    				each_blocks[i].m(ul, null);
	    			}

	    			insert_dev(target, t, anchor);
	    			if (if_block) if_block.m(target, anchor);
	    			insert_dev(target, if_block_anchor, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, [dirty]) {
	    			if (dirty & /*state, input, selectChoice*/ 7) {
	    				each_value = /*input*/ ctx[1].choices;
	    				validate_each_argument(each_value);
	    				let i;

	    				for (i = 0; i < each_value.length; i += 1) {
	    					const child_ctx = get_each_context(ctx, each_value, i);

	    					if (each_blocks[i]) {
	    						each_blocks[i].p(child_ctx, dirty);
	    					} else {
	    						each_blocks[i] = create_each_block(child_ctx);
	    						each_blocks[i].c();
	    						each_blocks[i].m(ul, null);
	    					}
	    				}

	    				for (; i < each_blocks.length; i += 1) {
	    					each_blocks[i].d(1);
	    				}

	    				each_blocks.length = each_value.length;
	    			}

	    			if (!/*input*/ ctx[1].immediate) {
	    				if (if_block) {
	    					if_block.p(ctx, dirty);

	    					if (dirty & /*input*/ 2) {
	    						transition_in(if_block, 1);
	    					}
	    				} else {
	    					if_block = create_if_block$2(ctx);
	    					if_block.c();
	    					transition_in(if_block, 1);
	    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
	    				}
	    			} else if (if_block) {
	    				group_outros();

	    				transition_out(if_block, 1, 1, () => {
	    					if_block = null;
	    				});

	    				check_outros();
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(if_block);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(ul);
	    			destroy_each(each_blocks, detaching);
	    			if (detaching) detach_dev(t);
	    			if (if_block) if_block.d(detaching);
	    			if (detaching) detach_dev(if_block_anchor);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_fragment$3.name,
	    		type: "component",
	    		source: "",
	    		ctx
	    	});

	    	return block;
	    }

	    function instance$3($$self, $$props, $$invalidate) {
	    	let { $$slots: slots = {}, $$scope } = $$props;
	    	validate_slots("ChoiceInput", slots, []);
	    	
	    	let { input } = $$props;
	    	let { state = {} } = $$props;
	    	const dispatch = createEventDispatcher();

	    	const selectChoice = choice => {
	    		if (input.set) {
	    			$$invalidate(0, state = Object.assign(Object.assign({}, state), { [input.set]: choice.value }));
	    		}

	    		if (input.immediate) {
	    			dispatch("next", choice.next);
	    		}
	    	};

	    	const handleButtonClick = () => {
	    		if (selectedChoice) {
	    			dispatch("next", selectedChoice.next);
	    		}
	    	};

	    	const writable_props = ["input", "state"];

	    	Object_1$1.keys($$props).forEach(key => {
	    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ChoiceInput> was created with unknown prop '${key}'`);
	    	});

	    	const click_handler = choice => {
	    		selectChoice(choice);
	    	};

	    	$$self.$$set = $$props => {
	    		if ("input" in $$props) $$invalidate(1, input = $$props.input);
	    		if ("state" in $$props) $$invalidate(0, state = $$props.state);
	    	};

	    	$$self.$capture_state = () => ({
	    		createEventDispatcher,
	    		Button,
	    		input,
	    		state,
	    		dispatch,
	    		selectChoice,
	    		handleButtonClick,
	    		selectedChoice
	    	});

	    	$$self.$inject_state = $$props => {
	    		if ("input" in $$props) $$invalidate(1, input = $$props.input);
	    		if ("state" in $$props) $$invalidate(0, state = $$props.state);
	    		if ("selectedChoice" in $$props) selectedChoice = $$props.selectedChoice;
	    	};

	    	let selectedChoice;

	    	if ($$props && "$$inject" in $$props) {
	    		$$self.$inject_state($$props.$$inject);
	    	}

	    	$$self.$$.update = () => {
	    		if ($$self.$$.dirty & /*input, state*/ 3) {
	    			 selectedChoice = input.choices.find(choice => choice.value === state[input.set]);
	    		}
	    	};

	    	return [state, input, selectChoice, handleButtonClick, click_handler];
	    }

	    class ChoiceInput extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);
	    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { input: 1, state: 0 });

	    		dispatch_dev("SvelteRegisterComponent", {
	    			component: this,
	    			tagName: "ChoiceInput",
	    			options,
	    			id: create_fragment$3.name
	    		});

	    		const { ctx } = this.$$;
	    		const props = options.props || {};

	    		if (/*input*/ ctx[1] === undefined && !("input" in props)) {
	    			console.warn("<ChoiceInput> was created without expected prop 'input'");
	    		}
	    	}

	    	get input() {
	    		throw new Error("<ChoiceInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set input(value) {
	    		throw new Error("<ChoiceInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get state() {
	    		throw new Error("<ChoiceInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set state(value) {
	    		throw new Error("<ChoiceInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}
	    }

	    exports.App = App;
	    exports.ChoiceInput = ChoiceInput;
	    exports.TextInput = TextInput;

	    Object.defineProperty(exports, '__esModule', { value: true });

	})));

	});

	const isValidEmail = (str) => {
	    // eslint-disable-next-line
	    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return regex.test(str);
	};

	const journeyId = "abcd";
	const logic = {
	    root: {
	        title: "Support",
	        body: "What can I assist you with?",
	        $enter: {
	            stepId: "83803968-85bf-45ed-8301-4c8b8057da6d",
	            journeyId,
	        },
	        input: {
	            type: "choice",
	            set: "topic",
	            choices: [
	                {
	                    label: "Buttons",
	                    value: "buttons",
	                    next: "location-name",
	                    $select: {
	                        stepId: "cb023f0f-cbf8-4ec4-a884-753ffd616fba",
	                        journeyId,
	                    },
	                },
	                {
	                    label: "User Request",
	                    value: "user-request",
	                    next: "location-name",
	                    $select: {
	                        stepId: "319927bd-92ce-425e-8aaa-168bec2e334e",
	                        journeyId,
	                    },
	                },
	                {
	                    label: "Inspection Changes",
	                    value: "inspection-changes",
	                    next: "location-name",
	                    $select: {
	                        stepId: "ee7c5349-8b72-4d49-8765-dd633c51e14c",
	                        journeyId,
	                    },
	                },
	                {
	                    label: "Request for Troubleshooting",
	                    value: "troubleshooting",
	                    next: "location-name",
	                    $select: {
	                        stepId: "95e31fe1-9b6f-4a41-8150-284b6162bb5b",
	                        journeyId,
	                    },
	                },
	            ],
	        },
	    },
	    "location-name": {
	        title: "Support",
	        body: "What location are you contacting us about?",
	        $enter: {
	            stepId: "befd65ef-a0ee-4bc3-be61-548be3fef0a0",
	            journeyId,
	        },
	        input: {
	            type: "choice",
	            set: "location",
	            choices: [
	                {
	                    label: "Location 1",
	                    value: "location-1",
	                    next: "location-phone",
	                    $select: {
	                        stepId: "",
	                        journeyId,
	                    },
	                },
	                {
	                    label: "Location 2",
	                    value: "location-2",
	                    next: "location-phone",
	                    $select: {
	                        stepId: "",
	                        journeyId,
	                    },
	                },
	                {
	                    label: "Location 3",
	                    value: "location-3",
	                    next: "location-phone",
	                    $select: {
	                        stepId: "",
	                        journeyId,
	                    },
	                },
	            ],
	        },
	    },
	    "location-phone": {
	        title: "Support",
	        body: "What is the phone number at {location}?",
	        $enter: {
	            stepId: "bfa9057f-f134-4c7d-a65c-84807ecf2863",
	            journeyId,
	        },
	        input: {
	            type: "text",
	            set: "locationPhone",
	            isValid: (val) => val.length === 10,
	            $invalid: {
	                stepId: "a17eee61-8f39-4f8d-bf9b-e132f76e3e8d",
	                journeyId,
	            },
	            next: "location-id",
	        },
	    },
	    "location-id": {
	        title: "Support",
	        body: `What is the location's 3 letter identifier?`,
	        $enter: {
	            stepId: "dfd5197a-5ca9-4c3b-9f80-c46307ffb276",
	            journeyId,
	        },
	        input: {
	            type: "text",
	            set: "locationId",
	            isValid: (val) => /^[A-Za-z]{3}$/g.test(val),
	            $invalid: {
	                stepId: "873d0f15-25d6-4f90-bb23-015f3df72424",
	                journeyId,
	            },
	            next: "email",
	        },
	    },
	    email: {
	        title: "Support",
	        body: "Do you have an email address or addresses you would like to be contacted regarding this request?",
	        $enter: {
	            stepId: "fa08941f-6d17-4ff8-b200-7eec14089e8c",
	            journeyId,
	        },
	        input: {
	            type: "text",
	            inputType: "email",
	            set: "email",
	            isValid: isValidEmail,
	            $invalid: {
	                stepId: "019c78a7-b7ff-4cce-9c47-afab3c4da440",
	                journeyId,
	            },
	            next: "button-type",
	        },
	    },
	    "button-type": {
	        title: "Support",
	        body: "What type of button would you like to order?",
	        $enter: {
	            stepId: "e49afe2e-7516-427d-9c44-8a9c2e79e5bc",
	            journeyId,
	        },
	        input: {
	            type: "choice",
	            set: "buttonType",
	            choices: [
	                {
	                    label: "Silver buttons",
	                    value: "silver",
	                    $select: {
	                        stepId: "d43f1b2c-926f-44e3-a0af-8a512298b129",
	                        journeyId,
	                    },
	                    next: "button-location",
	                },
	                {
	                    label: "Black buttons with white sticker",
	                    value: "black",
	                    $select: {
	                        stepId: "801e50fa-1408-486f-99d5-b237ece44b40",
	                        journeyId,
	                    },
	                    next: "button-location",
	                },
	            ],
	        },
	    },
	    "button-location": {
	        title: "Support",
	        body: "What is the name of the button's location?",
	        $enter: {
	            stepId: "f2101e3b-4fbb-48c0-9043-61b3fef13f9b",
	            journeyId,
	        },
	        input: {
	            type: "text",
	            set: "buttonLocation",
	            isValid: (val) => val.length > 0,
	            next: "location-asset-name",
	        },
	    },
	    "location-asset-name": {
	        title: "Support",
	        body: "What is the location/asset name?",
	        $enter: {
	            stepId: "01a5b0ff-84ab-48b6-975e-1e1aca29cf13",
	            journeyId,
	        },
	        input: {
	            type: "text",
	            set: "locationAssetName",
	            isValid: (val) => val.length > 0,
	            next: "shipping-method",
	        },
	    },
	    "shipping-method": {
	        title: "Support",
	        body: "How would you like this shipped?",
	        $enter: {
	            stepId: "8a79c8cf-6397-4e5a-b559-6a2e4319ee5f",
	            journeyId,
	        },
	        buttonLabel: "Submit order",
	        input: {
	            type: "choice",
	            set: "shippingMethod",
	            choices: [
	                {
	                    label: "UPS Ground",
	                    value: "ups-ground",
	                    $select: {
	                        stepId: "168b8642-9082-4528-a2f8-8fbf53debbf5",
	                        journeyId,
	                    },
	                    next: "any-more-buttons",
	                    action: "orderButton",
	                },
	                {
	                    label: "UPS 2nd Day Air",
	                    value: "ups-air",
	                    $select: {
	                        stepId: "1709143c-bbee-4047-b699-d6f3d3c56197",
	                        journeyId,
	                    },
	                    next: "any-more-buttons",
	                    action: "orderButton",
	                },
	                {
	                    label: "UPS Overnight",
	                    value: "ups-overnight",
	                    $select: {
	                        stepId: "1478556b-24f6-48ba-93fb-855a9c20b33d",
	                        journeyId,
	                    },
	                    next: "any-more-buttons",
	                    action: "orderButton",
	                },
	            ],
	        },
	    },
	    "any-more-buttons": {
	        title: "Support",
	        body: "Your order has been placed. Do you need any more buttons?",
	        $enter: {
	            stepId: "0e447819-1e0f-4016-a5a0-ac8c0cf3db6d",
	            journeyId,
	        },
	        input: {
	            type: "choice",
	            immediate: true,
	            choices: [
	                {
	                    label: "Yes",
	                    value: "yes",
	                    $select: {
	                        stepId: "5f6a141f-bf94-4ad4-af35-2895207de2a1",
	                        journeyId,
	                    },
	                    next: "button-type",
	                },
	                {
	                    label: "No",
	                    value: "no",
	                    $select: {
	                        stepId: "0e9fdf72-2c95-4741-957e-4c1651c0ce71",
	                        journeyId,
	                    },
	                    next: "anything-else",
	                },
	            ],
	        },
	    },
	    "anything-else": {
	        title: "Support",
	        body: "Can we help you with anything else?",
	        input: {
	            type: "choice",
	            immediate: true,
	            choices: [
	                {
	                    label: "Yes",
	                    value: "yes",
	                    next: "root",
	                },
	                {
	                    label: "No",
	                    value: "no",
	                    next: "end",
	                    action: "end",
	                },
	            ],
	        },
	    },
	    end: {
	        title: "Support",
	        body: "Thank you for reaching out to us! A ticket has been created and you will be receiving an email confirmation of your request soon.",
	        $enter: {
	            stepId: "4b3040b0-efb0-4cd3-8454-71c7a0339782",
	            journeyId,
	        },
	        buttonLabel: "End",
	    },
	};

	const app = new lib$1.App({
	    target: document.body,
	    props: {
	        logic,
	        TextInput: lib$1.TextInput,
	        ChoiceInput: lib$1.ChoiceInput,
	    },
	});

	return app;

}());
//# sourceMappingURL=bundle.js.map
