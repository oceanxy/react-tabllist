(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactTabllist"] = factory(require("lodash"), require("react"));
	else
		root["ReactTabllist"] = factory(root["_"], root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
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
}

module.exports = _defineProperty;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(2);

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(18);

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(21);

var iterableToArray = __webpack_require__(15);

var nonIterableSpread = __webpack_require__(22);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(19);

var assertThisInitialized = __webpack_require__(3);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(20);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(14);

var iterableToArrayLimit = __webpack_require__(23);

var nonIterableRest = __webpack_require__(16);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(14);

var iterableToArray = __webpack_require__(15);

var nonIterableRest = __webpack_require__(16);

function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
}

module.exports = _toArray;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(25);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(27)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)(false);
// Module
exports.push([module.i, ".list {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow: hidden; }\n  .list .list-cont {\n    margin: 0;\n    padding: 0;\n    display: table;\n    width: 100%;\n    height: auto;\n    -webkit-transition: all 400ms;\n    transition: all 400ms; }\n    .list .list-cont .list-row {\n      display: table-row;\n      list-style: none;\n      height: 58px;\n      -webkit-transition: all 300ms cubic-bezier(0, 0, 0.58, 1);\n      transition: all 300ms cubic-bezier(0, 0, 0.58, 1);\n      background: no-repeat center / 100% 100%; }\n      .list .list-cont .list-row.list-row-start {\n        -webkit-transform: scale(0.8);\n                transform: scale(0.8);\n        opacity: 0; }\n      .list .list-cont .list-row.list-row-end {\n        opacity: 1;\n        -webkit-transform: scale(1);\n                transform: scale(1); }\n      .list .list-cont .list-row.click-row {\n        cursor: pointer; }\n      .list .list-cont .list-row .list-cell {\n        display: table-cell;\n        text-align: center;\n        vertical-align: middle;\n        word-break: break-all;\n        border-left: none !important;\n        background: no-repeat center / 100% 100%; }\n        .list .list-cont .list-row .list-cell * {\n          vertical-align: middle; }\n        .list .list-cont .list-row .list-cell:last-child {\n          border-right: none !important; }\n        .list .list-cont .list-row .list-cell a {\n          color: currentColor;\n          -webkit-text-decoration: transparent;\n                  text-decoration: transparent; }\n        .list .list-cont .list-row .list-cell label {\n          vertical-align: middle; }\n          .list .list-cont .list-row .list-cell label span, .list .list-cont .list-row .list-cell label input {\n            vertical-align: middle;\n            padding: 0 5px; }\n  .list .list-header .list-row {\n    background: no-repeat center / 100% 100%; }\n    .list .list-header .list-row .list-cell {\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      border-bottom: none !important; }\n  .list .list-body .list-cont {\n    border-collapse: separate; }\n  .list .list-body .list-cell {\n    color: #666; }\n  .list.list-no-spacing .list-cell {\n    border-top: none !important; }\n", ""]);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(28);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 28 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(6);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(8);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(9);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(10);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(11);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(12);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(2);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"}
var external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_ = __webpack_require__(0);
var external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_);

// EXTERNAL MODULE: external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"}
var external_commonjs_react_commonjs2_react_amd_react_root_React_ = __webpack_require__(1);
var external_commonjs_react_commonjs2_react_amd_react_root_React_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_react_commonjs2_react_amd_react_root_React_);

// CONCATENATED MODULE: ./src/config.js
/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 配置文件
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-06-14 15:18:52
 */
/* harmony default export */ var config = ({
  className: '',
  data: [['1st column', '2nd column', '3rd column'], ['1st cell', '2nd cell', '3rd cell']],
  property: {
    style: {
      width: '100%',
      margin: '0 auto',
      height: 300
    },
    border: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#f4f4f4'
    },
    scroll: {
      enable: true,
      speed: 50,
      distance: 1
    },
    header: {
      show: true,
      style: {
        height: 30
      },
      cellStyle: {
        color: '#000000',
        border: ''
      }
    },
    body: {
      style: {
        backgroundImage: '',
        backgroundColor: ''
      },
      row: {
        transition: true,
        serialNumber: {
          show: false,
          columnName: 'SN',
          formatter: '{index}.',
          style: {
            width: 80,
            backgroundColor: '',
            backgroundImage: '',
            color: '#ffffff'
          },
          specialStyle: []
        },
        spacing: 0,
        rowCheckbox: false,
        style: {
          height: 30
        },
        visual: {
          show: false,
          interval: 1,
          style: {
            backgroundColor: '#e8f4fc'
          }
        },
        // 注意：单独指定每一行的样式的优先级高于visual.style的优先级
        specialStyle: [],
        silent: {
          show: false,
          // false is open
          style: {
            opacity: 0.8
          }
        },
        onClick: ''
      },
      cellOfColumn: {
        style: []
      },
      cell: {
        style: {
          fontSize: 16,
          minWidth: 50,
          color: '#000000',
          textAlign: 'center',
          border: '',
          width: 'auto'
        },
        iconStyle: {
          width: 24,
          height: 'auto'
        }
      }
    }
  }
  /**
   * 为过时的属性配置警告信息
   * @returns {{discard: string, version: string, replacement: string}[]}
   */

});
function getWaringProperty() {
  return [{
    version: '1.0.0',
    discard: 'property.body.cell.iconStyle',
    warn: 'Used obsolete configuration in React-tabllist: \'property.body.cell.iconStyle\' will be completely removed in future releases.Please use the object unit ({type: img, ...}) instead'
  }, {
    version: '1.2.0',
    discard: 'property.body.row.onClick',
    warn: 'Used obsolete configuration in React-tabllist: \'property.body.row.onClick\' can only be used in version 1.2.0.Please use the object unit ({type: row, ...}) instead'
  }, {
    version: '1.3.0',
    discard: 'property.body.row.rowCheckBox',
    replacement: 'property.body.row.rowCheckbox',
    warn: 'Used obsolete configuration in React-tabllist: \'property.body.row.rowCheckBox\' has been deprecated in version 1.3.0 and will be completely removed in future releases. You should use \'property.body.row.rowCheckbox\' instead.'
  }, {
    version: '1.4.0',
    discard: 'property.isScroll',
    replacement: 'property.scroll.enable',
    warn: 'Used obsolete configuration in React-tabllist: \'property.isScroll\' has been deprecated in version 1.4.0 and will be completely removed in future releases. You should use \'property.scroll.enable\' instead.'
  }, {
    version: '1.4.0',
    discard: 'property.speed',
    replacement: 'property.scroll.speed',
    warn: 'Used obsolete configuration in React-tabllist: \'property.speed\' has been deprecated in version 1.4.0 and will be completely removed in future releases. You should use \'property.scroll.speed\' instead.'
  }];
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toArray.js
var toArray = __webpack_require__(17);
var toArray_default = /*#__PURE__*/__webpack_require__.n(toArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(7);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectSpread.js
var objectSpread = __webpack_require__(4);
var objectSpread_default = /*#__PURE__*/__webpack_require__.n(objectSpread);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(13);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(3);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./src/index.scss
var src = __webpack_require__(24);

// CONCATENATED MODULE: ./src/util.js



/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: util
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-06-19 17:35:16
 */


/**
 * 从el元素向上选取第一个selector选择器匹配的元素
 * @param {Element} el DOM元素
 * @param {string} selector 选择器
 * @return {Element} 按照选择器筛选后的元素
 */

function closest(el, selector) {
  if (el) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
      if (matchesSelector.call(el, selector)) {
        break;
      }

      el = el.parentNode || el.parentElement;
    }

    return el;
  }

  return null;
}
/**
 * 设置屏幕滚动区域可见高度
 * @param {object} props props
 * @param {=} listComponent 列表组件实例对象
 * @returns {*} 列表滚动区域可见高度
 */

function getScrollHeight(props, listComponent) {
  var _props$property = props.property,
      _props$property$heade = _props$property.header,
      show = _props$property$heade.show,
      style = _props$property$heade.style,
      height = _props$property.style.height;

  if (listComponent) {
    var _getComputedStyle = getComputedStyle(listComponent, null),
        paddingTop = _getComputedStyle.paddingTop,
        paddingBottom = _getComputedStyle.paddingBottom,
        borderTopWidth = _getComputedStyle.borderTopWidth,
        borderBottomWidth = _getComputedStyle.borderBottomWidth;

    var result = parseInt(height) - parseInt(paddingTop) - parseInt(paddingBottom) - parseInt(borderTopWidth) - parseInt(borderBottomWidth);

    if (show) {
      return result - parseInt(style.height);
    }

    return result;
  } // 如果启用了表头


  if (show) {
    return parseInt(height) - parseInt(style.height);
  }

  return parseInt(height);
}
/**
 * 将用户设置的每一列单元格宽度值解析为组件程序需要的值，同时处理不合法数据
 * @param {string|array|number} width props传入的宽度数据
 * @returns {*} 用于渲染每列单元格的宽度值
 */

function setColWidth(width) {
  // 处理字符串形式的多列宽度数值
  if (Array.isArray(width)) {
    return width.map(function (o) {
      return !o ? 'auto' : o;
    });
  } // 处理字符串形式的多列宽度数值


  if (typeof width === 'string') {
    if (width.indexOf(',') >= 0) {
      return width.split(',').map(function (o) {
        if (o.indexOf('px') > -1) {
          return "".concat(parseFloat(o), "px");
        } else if (o.indexOf('%') > -1) {
          return "".concat(parseFloat(o), "%");
        } else if (o * 1) {
          return parseFloat(o);
        }

        return 'auto';
      });
    }

    if (width === 'avg') {
      return new Array(100).fill(1);
    }
  }

  return 'auto';
}
/**
 * 组件内部元素的事件处理
 * @param _objectUnit {object} 渲染组件结构的对象单元
 * @param _func {function} 内部逻辑函数
 * @param event event对象
 */

function handleEvent(_ref, event) {
  var _ref2 = slicedToArray_default()(_ref, 2),
      _objectUnit = _ref2[0],
      _func = _ref2[1];

  event.stopPropagation();

  if (_func && external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isFunction(_func)) {
    _func(event);
  } // 开放方法


  _objectUnit = objectSpread_default()({}, _objectUnit, {
    instanceObject: this
  });

  if (_objectUnit && _objectUnit.callback && external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isFunction(_objectUnit.callback)) {
    _objectUnit.callback(_objectUnit.data, _objectUnit, event);
  }
}
/**
 * 在控制台打印警告
 * @param property 用户的配置属性对象
 * @returns {*} 新的property
 */

function waring(property) {
  var waringProperty = getWaringProperty();
  /**
   * 检测指定key是否被用户定义
   * @param discard 被定义的过时属性
   * @param property 用户定义的整个配置对象
   * @returns {{isExist: boolean}|{isExist: boolean, value: *}} isExist:是否使用了过时属性 value:过时属性的值
   */

  function isKeyExists(discard, property) {
    if (!property || !discard) {
      return {
        isExist: false
      };
    } // 将传入的对象路径字符串拆分为数组


    var pathList = discard.split('.'); // 如果使用了过时的属性，则这边变量用来保存用户设置的属性的值

    var value; // 检测用户的配置对象是否存在警告

    for (var i = 1; i < pathList.length; i++) {
      if (typeof property[pathList[i]] === 'undefined') {
        return {
          isExist: false
        };
      }

      if (i === pathList.length - 1) {
        value = property[pathList[i]];
        property = pathList[i];
      } else {
        property = property[pathList[i]];
      }
    }

    return {
      isExist: true,
      value: value
    };
  }
  /**
   * 将用户使用的过时key赋值到正确的key
   * @param replacement 正确的key
   * @param property 用户定义的整个配置对象
   * @param valueOfDiscard 用户使用的过时key的值
   */


  function createNewProperty(replacement, property, valueOfDiscard) {
    if (!replacement) {
      return;
    } // 将传入的对象路径字符串拆分为数组


    var pathList = replacement.split('.'); // 替换过时属性，同时配置相对应的属性（如果存在）

    for (var i = 1; i < pathList.length; i++) {
      if (i === pathList.length - 1) {
        property[pathList[i]] = valueOfDiscard;
      } else {
        if (!property[pathList[i]] || external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isPlainObject(pathList[i])) {
          property[pathList[i]] = {};
        }

        property = property[pathList[i]];
      }
    }
  }

  waringProperty.map(function (_obj) {
    var result = isKeyExists(_obj.discard, property);

    if (result.isExist) {
      createNewProperty(_obj.replacement, property, result.value);

      if (false) {}
    }
  });
  return property;
}
/**
 * @desc 获取组件每次滚动的距离。
 - 如果值为正整数，单位为`像素`；
 - 为`0`，表示停用滚动，同`scroll.enable:false`；
 - 如果为负整数，则以行为单位进行滚动，行数等于该值的绝对值。
 - 如果为正小数，则向上取整。
 - 如果为负小数，则向下取整。
 - 如果为非数字或，则取`0`。
 * @param distanceConfig {number} 用户设置的滚动距离
 * @param rows {Array} 包含所有行的数组
 * @param counter {number} 当前可视区域第一行的索引
 * @returns {*} 处理后的滚动距离
 */

function getScrollTop(distanceConfig, rows, counter) {
  if (this === 'switch') {
    if (!counter) {
      return 0;
    }

    return rows[counter].offsetTop - rows[counter].parentElement.offsetTop;
  } else {
    if (isNaN(distanceConfig)) {
      return 0;
    } else {
      if (distanceConfig >= 0) {
        return Math.ceil(distanceConfig);
      }

      var nextRow = (counter + 1) * -distanceConfig; // 当设置一次滚动多行后，如果某一次递增的索引大于了总行数，则直接返回父容器的高度
      // 即接下来的一次滚动直接滚动到主容器最后的位置

      if (nextRow > rows.length - 1) {
        return rows[0].parentElement.offsetHeight;
      }

      return rows[nextRow].offsetTop - rows[0].offsetTop;
    }
  }
}
/**
 * 获取下一次滚动的速度(px/ms)
 * @param targetScrollTop {number} 滚动目标值
 * @param scroll {object} 滚动容器对象
 * @returns {number}
 */

function getSpeed(targetScrollTop, scroll) {
  var distance = targetScrollTop - scroll.scrollTop;

  if (distance > 0) {
    return Math.ceil(distance / 30);
  } else if (distance < 0) {
    return Math.floor(distance / 30);
  }

  return 1;
}
/**
 * 根据props及data获取过渡动画的样式表名
 * @param transition {boolean} 是否开启了过渡动画
 * @param isEqual {boolean} props数据
 * @returns {string}
 */

function getTransitionName(transition, isEqual) {
  if (transition) {
    if (!isEqual) {
      return 'list-row-start';
    } else {
      return 'list-row-end';
    }
  }

  return '';
}
/**
 * lodash.isEqualWith方法的第三个参数
 * https://www.lodashjs.com/docs/latest#_isequalwithvalue-other-customizer
 * @param objValue
 * @param othValue
 * @returns {boolean}
 */

function customizer(objValue, othValue) {
  if (typeof objValue === 'function' || typeof othValue === 'function') {
    return true;
  }
}
// CONCATENATED MODULE: ./src/list.js














/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: react-tabllist
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-08-01 11:15:17
 */






var list_default =
/*#__PURE__*/
function (_React$Component) {
  inherits_default()(_default, _React$Component);

  function _default(_props) {
    var _this;

    classCallCheck_default()(this, _default);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(_default).call(this, _props));

    defineProperty_default()(assertThisInitialized_default()(_this), "scrollList", function (isInnerScroll, e) {
      var _assertThisInitialize = assertThisInitialized_default()(_this),
          listContMain = _assertThisInitialize.listContMain,
          listContSupport = _assertThisInitialize.listContSupport,
          _assertThisInitialize2 = _assertThisInitialize.state,
          scrollHeight = _assertThisInitialize2.scrollHeight,
          enable = _assertThisInitialize2.property.scroll.enable; // 检测用于滚动的主容器和辅助容器是否存在


      if (listContMain && listContSupport) {
        // 删除上一次定时器，后续根据状态来判定是否定义新的定时器
        clearInterval(_this.marqueeInterval);

        if (isInnerScroll || isInnerScroll === undefined) {
          // 检测滚动条件
          // 根据滚动条件控制列表主体容器的辅助容器的显示状态
          if (enable && listContMain.clientHeight >= parseInt(scrollHeight)) {
            if (isInnerScroll !== undefined && e.type === 'mouseleave') {
              // 鼠标移除组件，恢复滚动
              _this.pause = false;
            }

            if (!_this.pause) {
              for (var i = 0; i < listContSupport.children.length; i++) {
                listContSupport.children[i].style.display = 'table-row';
              } // 调用滚动逻辑


              _this.marquee();
            }
          } else {
            for (var _i = 0; _i < listContSupport.children.length; _i++) {
              listContSupport.children[_i].style.display = 'none';
            }
          }
        }
      }
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "marquee", function () {
      var _assertThisInitialize3 = assertThisInitialized_default()(_this),
          _assertThisInitialize4 = _assertThisInitialize3.state.property.scroll,
          enable = _assertThisInitialize4.enable,
          speed = _assertThisInitialize4.speed,
          distance = _assertThisInitialize4.distance,
          listContMain = _assertThisInitialize3.listContMain,
          scroll = _assertThisInitialize3.scroll; // 设置定时器，实现列表滚动


      if (listContMain && enable) {
        _this.marqueeInterval = setInterval(function () {
          var scrollOffsetTop = getScrollTop(distance, listContMain.children, _this.rowIndex);

          if (distance < 0) {
            _this.scrollTo(NaN, scrollOffsetTop);
          } else {
            scroll.scrollTop += scrollOffsetTop;

            _this.checkScrollDistance();
          }
        }, speed);
      }
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "scrollTo", function (rowIndex, targetScrollTop) {
      var _assertThisInitialize5 = assertThisInitialized_default()(_this),
          distance = _assertThisInitialize5.state.property.scroll.distance,
          listContMain = _assertThisInitialize5.listContMain,
          scroll = _assertThisInitialize5.scroll;

      if (!isNaN(rowIndex) && rowIndex >= 0) {
        targetScrollTop = getScrollTop.bind('switch', null, listContMain.children, rowIndex)();
      } // 时间恒定，根据需要移动的总距离求速度


      var perIntervalMoveDistance = getSpeed(targetScrollTop, scroll); // 设置按次滚动定时器

      var marqueeIntervalRow = setInterval(function () {
        // 组件移动一次
        if (targetScrollTop !== scroll.scrollTop) {
          var nextScrollDistance; // 检测滚动目标值与当前的scrollTop值的差距是否大于每次速度值
          // 否则本次速度值按二者之间的差值计算

          if (Math.abs(targetScrollTop - scroll.scrollTop) >= Math.abs(perIntervalMoveDistance)) {
            nextScrollDistance = perIntervalMoveDistance;
          } else {
            nextScrollDistance = targetScrollTop - scroll.scrollTop;
          } // 当滚动目标值小于当前的scrollTop值时
          // 检测scrollTop值是否达到临界值
          // 如果是则当到达主容器高度临界值时重置scrollTop值并进入下一次滚动
          // 直到滚动到目标值为止


          scroll.scrollTop += nextScrollDistance;
        } else {
          if (!isNaN(rowIndex) && rowIndex >= 0) {
            if (++rowIndex > (listContMain.children.length - 1) / -distance) {
              _this.rowIndex = 0;
            } else {
              _this.rowIndex = rowIndex - 1;
            }
          } else {
            if (++_this.rowIndex > (listContMain.children.length - 1) / -distance) {
              _this.rowIndex = 0;
            }
          } // 检测滚动边界


          _this.checkScrollDistance(); // 当次滚动结束


          clearInterval(marqueeIntervalRow);
        }
      }, 1);
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "rowHover", function (e) {
      var _this$state$property$ = _this.state.property.body.row.silent,
          show = _this$state$property$.show,
          style = _this$state$property$.style;
      var target = e.target;
      var row = target;

      if (!show) {
        // 检测target是否是列表行元素，否则向上寻找，直到找到行元素为止
        if (!target.classList.contains('list-row')) {
          row = closest(target, '.list-row');
        } // 遍历style并依次赋值给元素


        Object.keys(style).map(function (key) {
          if (e.type === 'mouseenter') {
            if (key.indexOf('old') === -1) {
              style["old".concat(key)] = row.style[key];
              row.style[key] = style[key];
            }
          } else if (e.type === 'mouseleave') {
            if (style["old".concat(key)]) {
              row.style[key] = style["old".concat(key)];
              delete style["old".concat(key)];
            } else {
              row.style[key] = '';
            }
          }
        });
      }
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "checkCR", function (_ref, event) {
      var _ref2 = slicedToArray_default()(_ref, 2),
          cr = _ref2[0],
          _ref2$ = _ref2[1],
          rowIndex = _ref2$.rowIndex,
          cellIndex = _ref2$.cellIndex,
          index = _ref2$.index;

      var target = event.target;
      var _this$state = _this.state,
          selected = _this$state.selected,
          data = _this$state.data,
          property = _this$state.property;

      var selectedCur = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.cloneDeep(selected);

      var targetName = target.name;
      var indeterminate = _this.state.indeterminate; // 列表滚动控制（暂停/继续滚动）

      _this.pause = true; // 检测this.state.selected里与之对应的数组是否存在，否则初始化一个空数组
      // 而radio因为是单选按钮，决定了state数组里面有且仅有一个值为true，所以每次都初始化为空数组

      if (target.type === 'radio') {
        // 检测是否是radio，radio需要处理一下this.state.selected里与之对应的name属性
        targetName = targetName.substring(0, targetName.indexOf('-'));

        if (!selectedCur[targetName]) {
          selectedCur[targetName] = [];
        } // 将处理后结果赋值给state


        selectedCur[targetName][0] = "".concat(cr.key || "cr-".concat(rowIndex, "-").concat(cellIndex, "-").concat(index));
      } // 检测是否点击的是表头的checkbox，且是否启用表头
      else if (target.type === 'checkbox') {
          // 检测是否是行选择框
          if (target.name === 'rowCheckbox') {
            var showHeader = property.header.show; // 获取列表最外层容器

            var listContainer = closest(target, '.list'); // 获取列表内所有的行选择框

            var rowCheckboxes = listContainer.querySelectorAll('[name=\'rowCheckbox\']'); // 当启用表头时，点击表头的行选择框

            if (showHeader && external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqual(rowCheckboxes[0], target)) {
              indeterminate = false;
              selectedCur[targetName] = new Array(data.length).fill(target.checked);
            } else {
              /* 触发非表头的行选择框 */
              // 获取触发的行选择框的索引
              var clickedActualIndex = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.findIndex(rowCheckboxes, target); // 如果点击的是辅助容器内的行选择框，则对应到主容器内的行选择框的索引。


              var mainIndex = clickedActualIndex >= data.length ? clickedActualIndex - data.length + (showHeader ? 1 : 0) // 处理显示表头和不显示表头的情况
              : clickedActualIndex; // 将处理后结果赋值给state

              selectedCur[targetName][mainIndex] = target.checked; // 每次触发body被行选择框时都检查一次所有行选择框的状态

              var rowCheckboxSelected = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.compact(selectedCur[targetName].slice(1)).length;

              if (rowCheckboxSelected !== data.length - 1) {
                selectedCur[targetName][0] = false;
                indeterminate = rowCheckboxSelected > 0;
              } else {
                selectedCur[targetName][0] = true;
                indeterminate = false;
              }
            }
          } else {
            /* 非行选择框 */
            if (!selectedCur[targetName]) {
              selectedCur[targetName] = [];
            } // 获取复选框所在单元格元素


            var listCell = closest(target, '.list-cell'); // 获取同一单元格内相同name的复选框

            var checkboxes = listCell.querySelectorAll("[name='".concat(targetName, "']")); // 获取触发的radio的索引

            var clickedIndex = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.findIndex(checkboxes, target); // 将处理后结果赋值给state


            selectedCur[targetName][clickedIndex] = target.checked;
          }
        }

      _this.setState({
        indeterminate: indeterminate,
        selected: selectedCur
      });
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "getColClientWidth", function () {
      var _assertThisInitialize6 = assertThisInitialized_default()(_this),
          listContMain = _assertThisInitialize6.listContMain,
          props = _assertThisInitialize6.props;

      var borderWidth = props.property.border.borderWidth;
      var width = [];

      if (listContMain && listContMain.children.length) {
        for (var i = 0, l = listContMain.children[0].children; i < l.length; i++) {
          width.push(l[i].clientWidth - parseInt(borderWidth) || 0);
        }
      }

      return width;
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setCellLink", function (link) {
      var text = link.text,
          event = link.event,
          callback = link.callback,
          data = link.data,
          href = link.href,
          props = objectWithoutProperties_default()(link, ["text", "event", "callback", "data", "href"]);

      if (href) {
        // 防止事件冒泡
        props.onClick = handleEvent.bind(assertThisInitialized_default()(_this), [{}]);
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("a", extends_default()({
          href: href
        }, props), text);
      }

      var tagProps = objectSpread_default()({}, props, defineProperty_default()({}, event ? event : 'onClick', handleEvent.bind(assertThisInitialized_default()(_this), [link])));

      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("a", tagProps, text);
    });

    _this.state = {
      // 每列单元格的宽度数组
      colWidth: setColWidth(_props.property.body.cell.style.width),
      // body可见区域的高度
      scrollHeight: getScrollHeight(_props),
      // 复选框、单选框等标签的默认状态
      defaultSelected: false,
      // 所有复选框和单选按钮的状态
      selected: {
        rowCheckbox: []
      },
      // 行选择框的indeterminate状态
      indeterminate: false,
      // 当停用列表滚动且表头开启时，会自动计算这个值，以使表头的总宽度和列表主体相同
      // 主要目的是为了消除因滚动条占用部分位置使表头和列表主体形成的宽度差
      headerWidth: 0,
      // 列表行缓动动画的样式名
      transitionName: '',
      // 配置属性
      property: config.property,
      // 渲染数据
      data: config.data,
      // 列表的自定义样式表名
      className: config.className // 当一次滚动多行时可用，组件可视区域第一行的索引

    };
    _this.rowIndex = 0;
    return _this;
  }

  createClass_default()(_default, [{
    key: "componentDidMount",

    /**
     * 组件挂载后执行组件的滚动操作和设置表头单元格和主体单元格宽度对应
     */
    value: function componentDidMount() {
      var _this2 = this;

      var scroll = this.scroll,
          props = this.props;
      var colWidth = this.getColClientWidth(); // 如果列数为0，则停止后续操作

      if (colWidth.length) {
        // 组件第一次render之后，DOM结构已经生成，此时开始设置每个单元格宽度以及组件滚动区域高度
        // width设置规则以props里面的width字段为准，详情见width字段说明
        var scrollHeight = getScrollHeight(props, closest(scroll, '.list'));
        /* eslint-disable react/no-did-mount-set-state  */

        this.setState({
          colWidth: colWidth,
          scrollHeight: scrollHeight
        }); // 列表滚动相关逻辑入口

        this.scrollList(); // 检测浏览器当前标签页是否被激活，否则暂停滚动动画（如果启用了组件滚动）

        document.addEventListener('visibilitychange', function () {
          if (document.hidden) {
            _this2.scrollList(false);
          } else {
            _this2.scrollList(true, {
              type: 'mouseleave'
            });
          }
        });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // 避免闪动
      return !external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqualWith(this.props, nextProps, customizer) || !external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqualWith(this.state, nextState, customizer);
    }
    /**
     * 组件每次更新后执行
     * @param {object} preProps prev props
     * @param {object} preState prev state
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps, preState) {
      var _this3 = this;

      var colWidth = this.getColClientWidth();

      if (colWidth.length) {
        var _this$props$property$ = this.props.property.body.cell.style,
            colCellWidth = _this$props$property$.width,
            cellMinWidth = _this$props$property$.minWidth;
        var _preProps$property$bo = preProps.property.body.cell.style,
            preColCellWidth = _preProps$property$bo.width,
            preCellMinWidth = _preProps$property$bo.minWidth;
        var _this$state2 = this.state,
            _this$state2$property = _this$state2.property,
            _this$state2$property2 = _this$state2$property.style,
            conWidth = _this$state2$property2.width,
            height = _this$state2$property2.height,
            enable = _this$state2$property.scroll.enable,
            show = _this$state2$property.header.show,
            body = _this$state2$property.body,
            transitionName = _this$state2.transitionName,
            indeterminate = _this$state2.indeterminate;
        var _preState$property = preState.property,
            preBody = _preState$property.body,
            preShow = _preState$property.header.show,
            _preState$property$st = _preState$property.style,
            preConWidth = _preState$property$st.width,
            preHeight = _preState$property$st.height;
        var cell = body.cell,
            row = body.row;
        var iconWidth = cell.iconStyle.width;
        var preIconWidth = preBody.cell.iconStyle.width;
        var transition = row.transition,
            rowCheckbox = row.rowCheckbox; // 当滚动条显示时，重新计算header的宽度，和列表主体对齐

        if (show && !enable) {
          this.setState({
            headerWidth: this.listContMain.clientWidth
          });
        } // 适应单元格宽度，用于组件自身状态或从父级传递的props发生变化时


        if (preConWidth !== conWidth || iconWidth !== preIconWidth || colCellWidth !== preColCellWidth || cellMinWidth !== preCellMinWidth) {
          // 避免css动画未执行完时获取的列宽不正确，400为css动画的持续时间，见index.scss文件
          setTimeout(function () {
            /**
             * 组件更新之后，DOM结构已更新，此时重新设置每个单元格宽度
             * 设置规则以props里面的width字段为准
             * 详情见width字段说明
             */
            _this3.setState({
              colWidth: colWidth
            });
          }, colCellWidth === 'avg' ? 400 : 0);
        } // 适应滚动区域高度


        if (parseInt(preHeight) !== parseInt(height) || preShow !== show) {
          this.setState({
            scrollHeight: getScrollHeight(this.state)
          });
        } // 缓动动画


        if (transition && transitionName === 'list-row-start') {
          this.setState({
            transitionName: getTransitionName(transition, external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqualWith(preState.data, this.state.data, customizer))
          });
        } // 设置列表头行选择框的indeterminate
        // 如果开启了行选择功能且显示表头，根据每行的选择情况设置标题栏多选框的 indeterminate 状态


        if (show && rowCheckbox) {
          this.scroll.parentNode.querySelector('.list-header input[name=rowCheckbox]').indeterminate = indeterminate;
        } // 列表滚动相关逻辑入口


        this.scrollList();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.marqueeInterval);
    }
    /**
     * 列表滚动处理
     * @param {boolean?} isInnerScroll 内部滚动变量（用于事件控制）
     * @param {object?} e 事件回调参数
     */

  }, {
    key: "checkScrollDistance",

    /**
     * 检测主容器是否滚动完一个周期立即重置scrollTop值
     */
    value: function checkScrollDistance() {
      var listContMain = this.listContMain,
          scroll = this.scroll;

      if (listContMain.clientHeight <= scroll.scrollTop) {
        scroll.scrollTop = scroll.scrollTop - listContMain.clientHeight;
      }
    }
    /**
     * 行hover事件
     * @param {object} e event
     */

  }, {
    key: "fillRow",

    /**
     * 补齐单元格
     * 如果props数据不规范，则自动补齐单元格到缺少的行，直到每一行的单元格数量相等为止
     * @param {object} data 新数据
     * @returns {Array} 补齐后的用于生成单元格的数据
     */
    value: function fillRow(data) {
      var cellsOfRow = [];
      var _this$state$property$2 = this.state.property.body.row,
          rowCheckbox = _this$state$property$2.rowCheckbox,
          serialNumber = _this$state$property$2.serialNumber; // 获取每一行的数据量，存入数组 cellsOfRow 内

      external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.range(data.length).map(function (i) {
        // 如果行数据是一个对象，保证该对象内一定有一个cells字段
        if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isPlainObject(data[i]) && !data[i].cells) {
          data[i].cells = [];
        }

        cellsOfRow.push(external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(data[i]) ? data[i].length : data[i].cells.length);
      }); // 获取数据量最多的一行的数值


      var maxCellValue = Math.max.apply(Math, cellsOfRow);
      var newData = []; // 补齐空数据到缺失的行

      data.forEach(function (row, ind) {
        var rowCheck = {
          type: 'checkbox',
          text: '',
          key: "rowCheck".concat(ind),
          name: 'rowCheckbox'
        };

        if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(data[ind])) {
          newData[ind] = [].concat(toConsumableArray_default()(data[ind]), toConsumableArray_default()(new Array(maxCellValue - data[ind].length).fill(''))); // 检测是否开启行选择功能

          if (rowCheckbox) {
            newData[ind].unshift(rowCheck);
          } // 检测是否开启行序号功能


          if (serialNumber.show) {
            newData[ind].unshift(serialNumber.formatter);
          }
        } else {
          newData[ind] = objectSpread_default()({}, data[ind]);
          newData[ind].cells = [].concat(toConsumableArray_default()(data[ind].cells), toConsumableArray_default()(new Array(maxCellValue - data[ind].cells.length).fill(''))); // 检测是否开启行选择功能

          if (rowCheckbox) {
            newData[ind].cells.unshift(rowCheck);
          } // 检测是否开启行序号功能


          if (serialNumber.show) {
            newData[ind].cells.unshift(serialNumber.formatter);
          }
        }
      });
      return newData;
    }
    /**
     * 设置单元格图标
     * @param {object} icon icon对象
     * @param rowIndex {number} 行索引
     * @param cellIndex {number} 列索引
     * @returns {*[]} 单元格图标DOM || null
     */

  }, {
    key: "setCellIcon",
    value: function setCellIcon(icon, _ref3) {
      var rowIndex = _ref3.rowIndex,
          cellIndex = _ref3.cellIndex;
      var iconStyle = this.state.property.body.cell.iconStyle;

      if (icon.src && typeof icon.src === 'string' && (icon.src.indexOf('http://') !== -1 || icon.src.indexOf('https://') !== -1 || icon.src.indexOf('data:image/') !== -1)) {
        return [external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("img", {
          src: icon.src,
          alt: icon.alt || '',
          style: iconStyle,
          key: icon.key || "icon-".concat(rowIndex, "-").concat(cellIndex),
          className: icon.className
        }), external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", {
          key: "text".concat(-icon.key) || false
        }, icon.text || '')];
      }
    }
    /**
     * 设置单元格link(链接)
     * @param {object} link link对象
     * @returns {*} 单元格link DOM || null
     */

  }, {
    key: "setCellInput",

    /**
     * 设置单元格checkbox或radio
     * @param {object} cr cr对象
     * @param {number} rowIndex 所在行的索引
     * @param {number?} cellIndex 所在单元格的索引
     * @param {number?} index 当前索引
     * @param {string?} container 当前渲染元素所在的容器
     * @returns {*} 单元格checkbox或radio || null
     */
    value: function setCellInput(cr, _ref4, container) {
      var rowIndex = _ref4.rowIndex,
          cellIndex = _ref4.cellIndex,
          index = _ref4.index;
      var tagProps = {}; // 处理事件

      if (cr.type === 'button') {
        var _tagProps;

        tagProps = (_tagProps = {}, defineProperty_default()(_tagProps, cr.event ? cr.event : 'onClick', handleEvent.bind(this, [cr])), defineProperty_default()(_tagProps, "key", cr.key), defineProperty_default()(_tagProps, "type", cr.type), defineProperty_default()(_tagProps, "value", cr.value), defineProperty_default()(_tagProps, "className", cr.className), _tagProps);
      } else {
        var _this$state3 = this.state,
            selected = _this$state3.selected,
            defaultSelected = _this$state3.defaultSelected;
        var selectedCur = selected[cr.name] || [];
        tagProps = {
          type: cr.type,
          name: cr.type === 'radio' ? "".concat(cr.name, "-").concat(container) : cr.name,
          className: cr.className
        };

        if (cr.type === 'checkbox') {
          if (cr.name === 'rowCheckbox') {
            tagProps.checked = selectedCur[rowIndex] ? selectedCur[rowIndex] : defaultSelected;
          } else {
            tagProps.checked = selectedCur[index] ? selectedCur[index] : defaultSelected;
          }
        } else if (cr.type === 'radio') {
          tagProps.checked = selectedCur[0] === "".concat(cr.key || "cr-".concat(rowIndex, "-").concat(cellIndex, "-").concat(index)) ? true : defaultSelected;
        }

        if (!cr.event || cr.event === 'onClick' || cr.event === 'onChange') {
          tagProps.onChange = handleEvent.bind(this, [cr, this.checkCR.bind(null, [cr, {
            rowIndex: rowIndex,
            cellIndex: cellIndex,
            index: index
          }])]);
          tagProps.onClick = handleEvent.bind(this, [{}]);
        } else {
          // 当自定义事件不为‘onClick’或‘onChange’时，为radio或checkbox添加默认的点击事件
          tagProps[cr.event] = handleEvent.bind(this, [cr]);
          tagProps.onChange = this.checkCR.bind(null, [cr, {
            rowIndex: rowIndex,
            cellIndex: cellIndex,
            index: index
          }]);
          tagProps.onClick = handleEvent.bind(this, [{}]);
        }
      }

      if (cr.type === 'radio' && !container) {
        /* eslint-disable no-console, no-undef */
        console.error('When the type attribute of the input tag is radio, the third parameter "container" of setCellInput() is a required parameter, otherwise the function will be invalid!');
        /* eslint-enable no-console, no-undef */

        return null;
      }

      if (cr.type === 'radio' || cr.type === 'checkbox') {
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("label", {
          key: "".concat(cr.key || "cr-".concat(rowIndex, "-").concat(cellIndex, "-").concat(index)),
          onClick: handleEvent.bind(this, [{}])
        }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("input", tagProps), cr.text ? external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", null, cr.text) : null);
      } // button 等标签会执行以下代码


      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("input", tagProps);
    }
    /**
     * 设置单元格的下拉列表
     * @param cs {object} 对象单元
     */

  }, {
    key: "setCellSelect",
    value: function setCellSelect(cs) {
      var type = cs.type,
          text = cs.text,
          option = cs.option,
          data = cs.data,
          className = cs.className,
          event = cs.event,
          callback = cs.callback,
          props = objectWithoutProperties_default()(cs, ["type", "text", "option", "data", "className", "event", "callback"]);

      var tagProps = objectSpread_default()({}, props, defineProperty_default()({}, event ? event : 'onChange', handleEvent.bind(this, [cs])));

      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("label", {
        className: className
      }, text ? external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", null, text) : null, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("select", tagProps, option && option.map(function (item, index) {
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("option", extends_default()({
          key: index
        }, item));
      })));
    }
    /**
     * 设置单元格
     * @param rowData {Array} 行数据
     * @param rowIndex {number} 行索引
     * @param container {string} 当前所在容器的名称
     */

  }, {
    key: "setCell",
    value: function setCell(rowData, rowIndex, container) {
      var _this4 = this;

      var _this$state4 = this.state,
          colWidth = _this$state4.colWidth,
          property = _this$state4.property;
      var body = property.body;
      var _body$row$serialNumbe = body.row.serialNumber,
          serialNumberShow = _body$row$serialNumbe.show,
          serialNumberStyle = _body$row$serialNumbe.style,
          specialStyle = _body$row$serialNumbe.specialStyle,
          cellOfColumnStyle = body.cellOfColumn.style,
          style = body.cell.style; // 处理border属性值

      var listBorder = this.setBorder(style);
      return rowData.map(function (cellData, cellIndex) {
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
          key: "".concat(container, "-cell-r").concat(rowIndex, "-c").concat(cellIndex),
          className: "list-cell",
          style: serialNumberShow && !cellIndex // 如果开启行序号，且为每行第一个单元格
          ? objectSpread_default()({}, style, {
            width: typeof colWidth === 'string' ? colWidth : colWidth[cellIndex] || 'auto'
          }, serialNumberStyle, specialStyle[rowIndex], cellOfColumnStyle[cellIndex], listBorder) // 未开启行序号或不为行内第一个单元格
          : objectSpread_default()({}, style, {
            width: typeof colWidth === 'string' ? colWidth : colWidth[cellIndex] || 'auto'
          }, cellOfColumnStyle[cellIndex], listBorder)
        }, // 检测是否启用行号功能，并且为行内第一个单元格
        serialNumberShow && cellIndex === 0 && typeof cellData === 'string' ? cellData.replace('{index}', rowIndex + 1) : _this4.parsing(cellData, {
          rowIndex: rowIndex + 1,
          cellIndex: cellIndex
        }, container));
      });
    }
    /**
     * 解析数据里面的对象
     * @param {object} cellData 需要解析的单元格数据
     * @param {number} rowIndex 需要解析的单元格数据所在行的索引
     * @param {number} cellIndex 需要解析的单元格数据所在行的索引
     * @param {number?} index 当前循环遍历的index
     * @param {string?} container 当前渲染单元格所在的容器（此参数目前只在type为radio时生效）
     * @returns {*} 单元格数据或DOM
     */

  }, {
    key: "parsing",
    value: function parsing(cellData, _ref5, container) {
      var _this5 = this;

      var rowIndex = _ref5.rowIndex,
          cellIndex = _ref5.cellIndex,
          index = _ref5.index;

      if (Array.isArray(cellData)) {
        return cellData.map(function (o, i) {
          return _this5.parsing(o, {
            rowIndex: rowIndex,
            cellIndex: cellIndex,
            index: i
          }, container);
        });
      }

      if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isObject(cellData)) {
        switch (cellData.type) {
          case 'img':
            return this.setCellIcon(cellData, {
              rowIndex: rowIndex,
              cellIndex: cellIndex
            });

          case 'link':
            return this.setCellLink(cellData);

          case 'radio':
            return this.setCellInput(cellData, {
              rowIndex: rowIndex,
              cellIndex: cellIndex,
              index: index
            }, container);

          case 'checkbox':
            return this.setCellInput(cellData, {
              rowIndex: rowIndex,
              cellIndex: cellIndex,
              index: index
            });

          case 'button':
            return this.setCellInput(cellData, {
              rowIndex: rowIndex,
              cellIndex: cellIndex,
              index: index
            });

          case 'select':
            return this.setCellSelect(cellData);
        }
      } // 不是对象，返回原数据


      return cellData;
    }
    /**
     * 设置边框
     * 检测到空值则使用全局配置，而不是设置为无边框
     * @param {object} borderStyle 含有边框属性的对象
     * @returns {object} 返回包含border及其相关属性的对象
     */

  }, {
    key: "setBorder",
    value: function setBorder(borderStyle) {
      var border = this.state.property.border;
      var newBorder = {}; // borderStyle对象的border属性为空字符串

      if (borderStyle && borderStyle.border === '') {
        return border;
      } // borderStyle对象的border属性为空值以外的其他假值


      if (!borderStyle.border) {
        newBorder.borderWidth = borderStyle.borderWidth || border.borderWidth;
        newBorder.borderColor = borderStyle.borderColor || border.borderColor;
        newBorder.borderStyle = borderStyle.borderStyle || border.borderStyle;
        return newBorder;
      }

      return {
        border: borderStyle.border
      };
    }
    /**
     * 设置行
     * @param {array} bodyData 列表主体数据
     * @param {string} container 当前所在容器的名称
     * @returns {*} 列表主体DOM
     */

  }, {
    key: "setRow",
    value: function setRow(bodyData, container) {
      var _this6 = this;

      var _this$state5 = this.state,
          property = _this$state5.property,
          transitionName = _this$state5.transitionName;
      var body = property.body;
      var _body$row = body.row,
          transition = _body$row.transition,
          rowStyle = _body$row.style,
          specialRowStyle = _body$row.specialStyle,
          _body$row$visual = _body$row.visual,
          rowVisualShow = _body$row$visual.show,
          rowVisualInterval = _body$row$visual.interval; // 处理间隔行样式

      var isVisual = false;
      var rowVisualStyle = body.row.visual.style;

      if (rowVisualShow && rowVisualInterval && !Number.isNaN(rowVisualInterval)) {
        isVisual = true;
        rowVisualStyle = objectSpread_default()({}, rowStyle, rowVisualStyle);
      } // 处理行动画的样式


      var transitionClassName = transition ? " ".concat(transitionName) : '';
      return bodyData.map(function (rowData, rowIndex) {
        var customClassName = rowData.className ? " ".concat(rowData.className) : '';
        var LIElementProps = {
          className: "list-row".concat(customClassName).concat(transitionClassName),
          style: isVisual && rowIndex % (rowVisualInterval * 2) >= rowVisualInterval ? external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.defaultsDeep({}, specialRowStyle[rowIndex], rowVisualStyle, rowStyle) : external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.defaultsDeep({}, specialRowStyle[rowIndex], rowStyle),
          onMouseEnter: _this6.rowHover,
          onMouseLeave: _this6.rowHover // 检测行数据是一个对象还是一个数组
          // 如果是对象，则需要对行做一些处理，比如添加自定义事件等（目前只支持添加事件）

        };

        if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isPlainObject(rowData) && rowData.type === 'row') {
          LIElementProps[rowData.event] = handleEvent.bind(_this6, [rowData]);
          LIElementProps.value = rowData.value;
        } else {
          LIElementProps = objectSpread_default()({}, LIElementProps, {
            type: 'row'
          });
        }

        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("li", extends_default()({
          key: "".concat(container, "-list-row").concat(rowData.key ? rowData.key : rowIndex)
        }, LIElementProps), external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(rowData) ? _this6.setCell(rowData, rowIndex, container) : _this6.setCell(rowData.cells, rowIndex, container));
      });
    }
    /**
     * 加载列表头
     * @param {array} data 列表头数据
     * @returns {*} 列表头DOM
     */

  }, {
    key: "loadHeader",
    value: function loadHeader(data) {
      var _this7 = this;

      var _this$state6 = this.state,
          property = _this$state6.property,
          colWidth = _this$state6.colWidth,
          headerWidth = _this$state6.headerWidth;
      var enable = property.scroll.enable,
          _property$header = property.header,
          style = _property$header.style,
          cellStyle = _property$header.cellStyle,
          showHeader = _property$header.show;
      var _property$body = property.body,
          minWidth = _property$body.cell.style.minWidth,
          _property$body$row$se = _property$body.row.serialNumber,
          serialNumberShow = _property$body$row$se.show,
          columnName = _property$body$row$se.columnName; // 处理border属性值

      var listBorder = this.setBorder(cellStyle);

      if (showHeader && data && data.length) {
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("ul", {
          className: "list-header list-cont",
          style: !enable && headerWidth ? objectSpread_default()({}, style, {
            width: headerWidth
          }) : style
        }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("li", {
          key: "list-row",
          className: "list-row",
          style: style
        }, data.map(function (cell, index) {
          return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
            className: "list-cell",
            title: serialNumberShow && !index ? columnName : external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isObject(cell) ? cell.text : cell,
            key: "list-header-".concat(index),
            style: objectSpread_default()({}, cellStyle, {
              width: typeof colWidth === 'string' ? colWidth : colWidth[index] || 'auto',
              minWidth: minWidth
            }, listBorder)
          }, serialNumberShow && !index // index === 0
          ? columnName : _this7.parsing(cell, {
            rowIndex: 0,
            cellIndex: 0
          }));
        })));
      }

      return null;
    }
    /**
     * 加载列表主体
     * @param bodyData
     * @returns {*}
     */

  }, {
    key: "loadBody",
    value: function loadBody(bodyData) {
      var _this8 = this;

      var _this$state7 = this.state,
          scrollHeight = _this$state7.scrollHeight,
          _this$state7$property = _this$state7.property,
          _this$state7$property2 = _this$state7$property.body,
          style = _this$state7$property2.style,
          spacing = _this$state7$property2.row.spacing,
          enable = _this$state7$property.scroll.enable; // 处理行间距的值

      var borderSpacing = "".concat(spacing).indexOf('px') === -1 ? "0 ".concat(spacing, "px") : "0 ".concat(spacing);
      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
        className: "list-body",
        ref: function ref(ele) {
          return _this8.scroll = ele;
        },
        style: objectSpread_default()({}, style, {
          height: scrollHeight,
          overflow: enable ? 'hidden' : 'auto'
        })
      }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("ul", {
        className: "list-cont",
        style: {
          borderSpacing: borderSpacing
        },
        ref: function ref(ele) {
          return _this8.listContMain = ele;
        }
      }, this.setRow(bodyData, 'main')), external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("ul", {
        className: "list-cont",
        style: {
          borderSpacing: borderSpacing
        },
        ref: function ref(ele) {
          return _this8.listContSupport = ele;
        }
      }, this.setRow(bodyData, 'support')));
    }
    /**
     * 渲染 DOM 结构
     * @returns {*} 组件DOM
     */

  }, {
    key: "render",
    value: function render() {
      var _this$state8 = this.state,
          _this$state8$property = _this$state8.property,
          header = _this$state8$property.header,
          spacing = _this$state8$property.body.row.spacing,
          conStyle = _this$state8$property.style,
          data = _this$state8.data,
          className = _this$state8.className;
      var showHeader = header.show; // 处理border属性值

      var listBorder = this.setBorder(conStyle); // 当存在表头数据且表头是开启时处理数据

      var headerData;
      var bodyData;
      this.renderData = this.fillRow(data);

      if (showHeader && data.length) {
        var _this$renderData = toArray_default()(this.renderData);

        headerData = _this$renderData[0];
        bodyData = _this$renderData.slice(1);
      } else {
        bodyData = this.renderData;
      }

      var listClass = !Number.isNaN(parseInt(spacing)) && parseInt(spacing) > 0 ? '' : 'list-no-spacing';
      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
        style: objectSpread_default()({}, listBorder, conStyle),
        className: "list".concat(className ? " ".concat(className) : '').concat(listClass ? " ".concat(listClass) : ''),
        onMouseMove: this.scrollList.bind(this, false),
        onMouseLeave: this.scrollList.bind(this, true)
      }, this.loadHeader(headerData), this.loadBody(bodyData));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var property = state.property,
          data = state.data,
          className = state.className,
          restState = objectWithoutProperties_default()(state, ["property", "data", "className"]); // 检测本次渲染的数据是否有变化


      if (!external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqualWith(props, {
        property: property,
        data: data,
        className: className
      }, customizer)) {
        var propsHeight = props.property.style.height;
        var stateHeight = property.style.height;
        var propsCellWidth = props.property.body.cell.style.width;
        var stateCellWidth = property.body.cell.style.width;

        var isDataChanged = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqualWith(props.data, data, customizer);

        return objectSpread_default()({}, restState, props, {
          transitionName: !isDataChanged ? getTransitionName(props.property.body.row.transition, isDataChanged) : state.transitionName,
          colWidth: propsCellWidth !== stateCellWidth ? setColWidth(propsCellWidth) : state.colWidth,
          scrollHeight: propsHeight !== stateHeight ? getScrollHeight(props) : state.scrollHeight
        });
      } // 如果props未更新属性，则返回state


      return state;
    }
  }]);

  return _default;
}(external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.Component);


// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return src_default_0; });









/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 组件入口
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-05-30 15:47:10
 */






var src_default_0 =
/*#__PURE__*/
function (_Component) {
  inherits_default()(_default, _Component);

  function _default() {
    classCallCheck_default()(this, _default);

    return possibleConstructorReturn_default()(this, getPrototypeOf_default()(_default).apply(this, arguments));
  }

  createClass_default()(_default, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          property = _this$props.property,
          option = objectWithoutProperties_default()(_this$props, ["property"]);

      var newProperty = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.defaultsDeep({}, waring(property), config.property);

      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement(list_default, extends_default()({
        property: newProperty
      }, option));
    }
  }]);

  return _default;
}(external_commonjs_react_commonjs2_react_amd_react_root_React_["Component"]);

defineProperty_default()(src_default_0, "defaultProps", config);



/***/ })
/******/ ])["default"];
});