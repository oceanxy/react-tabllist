(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["ReactTabllist"] = factory(require("react"), require("lodash"));
	else
		root["ReactTabllist"] = factory(root["React"], root["_"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(3);

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
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(15);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(20);

var iterableToArray = __webpack_require__(12);

var nonIterableSpread = __webpack_require__(21);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(16);

var assertThisInitialized = __webpack_require__(2);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(17);

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
/* 12 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(18);

var iterableToArray = __webpack_require__(12);

var nonIterableRest = __webpack_require__(19);

function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
}

module.exports = _toArray;

/***/ }),
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(23);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(25)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(false);
// Module
exports.push([module.i, ".list {\n  display: block;\n  overflow: hidden; }\n  .list .list-cont {\n    margin: 0;\n    padding: 0;\n    display: table;\n    width: 100%;\n    height: auto;\n    transition: all 400ms; }\n    .list .list-cont .list-row {\n      display: table-row;\n      list-style: none;\n      height: 58px;\n      transition: all 300ms cubic-bezier(0, 0, 0.58, 1);\n      background: no-repeat center / 100% 100%; }\n      .list .list-cont .list-row.list-row-start {\n        -webkit-transform: scale(0.8);\n                transform: scale(0.8);\n        opacity: 0; }\n      .list .list-cont .list-row.list-row-transition {\n        opacity: 1;\n        -webkit-transform: scale(1);\n                transform: scale(1); }\n      .list .list-cont .list-row .list-cell {\n        display: table-cell;\n        text-align: center;\n        vertical-align: middle;\n        word-break: break-all;\n        border-left: none !important;\n        background: no-repeat center / 100% 100%; }\n        .list .list-cont .list-row .list-cell * {\n          vertical-align: middle; }\n        .list .list-cont .list-row .list-cell:last-child {\n          border-right: none !important; }\n        .list .list-cont .list-row .list-cell a {\n          color: currentColor;\n          -webkit-text-decoration: transparent;\n                  text-decoration: transparent; }\n        .list .list-cont .list-row .list-cell label {\n          vertical-align: middle; }\n          .list .list-cont .list-row .list-cell label span, .list .list-cont .list-row .list-cell label input {\n            vertical-align: middle;\n            padding: 0 5px; }\n  .list .list-header .list-row {\n    background: no-repeat center / 100% 100%; }\n    .list .list-header .list-row .list-cell {\n      border-bottom: none !important; }\n  .list .list-body .list-cont {\n    border-collapse: separate; }\n  .list .list-body .list-cell {\n    color: #666; }\n  .list.list-no-spacing .list-cell {\n    border-top: none !important; }\n", ""]);



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 25 */
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

var	fixUrls = __webpack_require__(26);

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
/* 26 */
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(13);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(5);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(7);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(8);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(9);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(10);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(11);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(3);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"}
var external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_ = __webpack_require__(1);
var external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_);

// EXTERNAL MODULE: external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"}
var external_commonjs_react_commonjs2_react_amd_react_root_React_ = __webpack_require__(0);
var external_commonjs_react_commonjs2_react_amd_react_root_React_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_react_commonjs2_react_amd_react_root_React_);

// CONCATENATED MODULE: ./src/config.js
/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 配置文件
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xyzsyx@163.com）
 * @LastModifiedTime: 2019-01-23 15:03:05
 */
/* harmony default export */ var config = ({
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
    speed: 50,
    isScroll: true,
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
        padding: '10px'
      },
      row: {
        transition: true,
        serialNumber: {
          show: false,
          formatter: '{index}.',
          style: {
            backgroundColor: '',
            backgroundImage: '',
            color: '#ffffff'
          },
          specialStyle: []
        },
        spacing: 0,
        rowCheckBox: false,
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
});
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toArray.js
var toArray = __webpack_require__(14);
var toArray_default = /*#__PURE__*/__webpack_require__.n(toArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectSpread.js
var objectSpread = __webpack_require__(4);
var objectSpread_default = /*#__PURE__*/__webpack_require__.n(objectSpread);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(6);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(2);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./src/index.scss
var src = __webpack_require__(22);

// CONCATENATED MODULE: ./src/util.js
/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: util
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xyzsyx@163.com）
 * @LastModifiedTime: 2019-01-23 15:03:56
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
 * @returns {*} 列表滚动区域可见高度
 */

function setScrollHeight(props) {
  var _props$property = props.property,
      _props$property$heade = _props$property.header,
      show = _props$property$heade.show,
      style = _props$property$heade.style,
      height = _props$property.style.height; // 开启表头

  if (show) {
    return parseInt(height) - parseInt(style.height);
  } // 隐藏表头


  return height;
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
// CONCATENATED MODULE: ./src/list.js












/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: react-tabllist
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xyzsyx@163.com）
 * @LastModifiedTime: 2019-01-23 15:03:38
 */





var list_default =
/*#__PURE__*/
function (_Component) {
  inherits_default()(_default, _Component);

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
          _assertThisInitialize3 = _assertThisInitialize2.property,
          isScroll = _assertThisInitialize3.isScroll,
          speed = _assertThisInitialize3.speed;

      if (listContMain && listContSupport) {
        // 删除上一次定时器，后续根据状态来判定是否定义新的定时器
        clearInterval(_this.marqueeInterval);

        if (isInnerScroll || isInnerScroll === undefined) {
          // 检测滚动条件
          // 根据滚动条件控制列表主体容器的辅助容器的显示状态
          if (isScroll && listContMain.clientHeight >= parseInt(scrollHeight)) {
            if (isInnerScroll !== undefined && e.type === 'mouseleave') {
              _this.pause = false;
            }

            if (!_this.pause) {
              for (var i = 0; i < listContSupport.children.length; i++) {
                listContSupport.children[i].style.display = 'table-row';
              } // 设置定时器，实现列表滚动


              _this.marqueeInterval = setInterval(_this.marquee, speed);
            }
          } else {
            for (var _i = 0; _i < listContSupport.children.length; _i++) {
              listContSupport.children[_i].style.display = 'none';
            }
          }
        }
      }
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

    defineProperty_default()(assertThisInitialized_default()(_this), "handleEvent", function (_elementData, event) {
      if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isFunction(_elementData.callback)) {
        _elementData.callback(_elementData.data, _elementData, event);
      }

      event.stopPropagation();
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "checkCR", function (event) {
      var target = event.target;
      var _this$state = _this.state,
          selected = _this$state.selected,
          data = _this$state.data,
          property = _this$state.property;
      var showHeader = property.header.show;

      var selectedCur = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.cloneDeep(selected);

      var index = target.getAttribute('data-index');
      var targetName = target.name;
      _this.pause = true; // 检测是否点击的标题栏的checkbox 且是否开启显示表头

      if (target.name === 'rowCheckBox' && index === '0' && showHeader) {
        selectedCur[targetName] = new Array(data.length).fill(target.checked);
      } else {
        // 检测是否是radio。radio需要处理一下this.state.selected里与之对应的name属性
        if (target.type === 'radio') {
          targetName = targetName.substring(0, targetName.indexOf('-'));
        } // 检测this.state.selected里与之对应的数组是否存在，否则初始化一个空数组
        // 而radio因为是单选按钮，决定了state数组里面有且仅有一个值为true，所以每次都初始化为空数组


        if (!selectedCur[targetName] || target.type === 'radio') {
          selectedCur[targetName] = [];
        } // 将处理后的state数组赋值


        selectedCur[targetName][index] = target.checked; // 如果触发的是每一行的行选择框且header的状态为开启，则检测是否body里面的每行都选中了
        // 根据此状态来给header里面的复选框加状态（全选/全不选）

        if (targetName === 'rowCheckBox' && showHeader) {
          if (data.length === selectedCur[targetName].length) {
            for (var i = 1, k = selectedCur[targetName].length; i < k; i++) {
              if (!selectedCur[targetName][i]) {
                selectedCur[targetName][0] = false;
                break;
              }

              if (i === data.length - 1) {
                selectedCur[targetName][0] = true;
              }
            }
          } else {
            selectedCur[targetName][0] = false;
          }
        }
      }

      _this.setState({
        selected: selectedCur
      });

      event.stopPropagation();
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "getColClientWidth", function () {
      var _assertThisInitialize4 = assertThisInitialized_default()(_this),
          listContMain = _assertThisInitialize4.listContMain,
          props = _assertThisInitialize4.props;

      var borderWidth = props.property.border.borderWidth;
      var width = [];

      if (listContMain && listContMain.children.length) {
        for (var i = 0, l = listContMain.children[0].children; i < l.length; i++) {
          width.push(l[i].clientWidth - parseInt(borderWidth) || 0);
        }
      }

      return width;
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "marquee", function () {
      var _assertThisInitialize5 = assertThisInitialized_default()(_this),
          listContMain = _assertThisInitialize5.listContMain,
          scroll = _assertThisInitialize5.scroll;

      if (listContMain && scroll) {
        scroll.scrollTop++; // 滚动完一个完整周期后立即重置滚动区域的scrollTop值为0

        if (listContMain.clientHeight <= scroll.scrollTop) {
          scroll.scrollTop = 0;
        }
      }
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setCellLink", function (link) {
      var text = link.text,
          callback = link.callback,
          data = link.data,
          props = objectWithoutProperties_default()(link, ["text", "callback", "data"]);

      delete props.type;

      if (link) {
        if (props.href) {
          // 防止事件冒泡
          props.onClick = function (event) {
            return event.stopPropagation();
          };

          return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("a", props, text);
        }

        if (props.event) {
          props[props.event] = function (event) {
            event.preventDefault();
            var list = closest(event.target, '.list');

            if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isFunction(callback)) {
              callback(data, list, event);
            }

            event.stopPropagation();
          };

          delete props.event;
        } // 防止未传入自定义事件而导致点击事件冒泡


        if (!props.event || props.event !== 'onClick') {
          props.onClick = function (event) {
            return event.stopPropagation();
          };
        }

        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("a", props, text);
      }

      return null;
    });

    _this.state = {
      // 每列单元格的宽度数组
      colWidth: setColWidth(_props.property.body.cell.style.width),
      // body可见区域的高度
      scrollHeight: setScrollHeight(_props),
      // 复选框、单选框等标签的状态
      selected: {},
      // 列表行缓动动画的样式名
      transitionName: '',
      // 当停用列表滚动且表头开启时，会自动计算这个值，以使表头的总宽度和列表主体相同
      // 主要目的是为了消除因滚动条占用部分位置使表头和列表主体形成的宽度差
      headerWidth: 0
    };
    return _this;
  }

  createClass_default()(_default, [{
    key: "componentDidMount",

    /**
     * 组件挂载后执行组件的滚动操作和设置表头单元格和主体单元格宽度对应
     */
    value: function componentDidMount() {
      var colWidth = this.getColClientWidth(); // 如果列数为0，则停止后续操作

      if (colWidth.length) {
        /**
         * 组件第一次render之后，DOM结构已经生成，此时开始设置每个单元格宽度
         * 设置规则以props里面的width字段为准
         * 详情见width字段说明
         */

        /* eslint-disable react/no-did-mount-set-state  */
        this.setState({
          colWidth: colWidth
        }); // 列表滚动相关逻辑入口

        this.scrollList();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // 避免闪动
      return !external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqual(this.props, nextProps) || !external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqualWith(this.state, nextState);
    }
    /**
     * 组件每次更新后执行
     * @param {object} preProps prev props
     * @param {object} preState prev state
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps, preState) {
      var _this2 = this;

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
            show = _this$state2$property.header.show,
            body = _this$state2$property.body,
            isScroll = _this$state2$property.isScroll,
            transitionName = _this$state2.transitionName,
            selected = _this$state2.selected;
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
            rowCheckBox = row.rowCheckBox; // 当滚动条显示时，重新计算header的宽度，和列表主体对齐

        if (show && !isScroll) {
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
            _this2.setState({
              colWidth: colWidth
            });
          }, colCellWidth === 'avg' ? 400 : 0);
        } // 适应滚动区域高度


        if (parseInt(preHeight) !== parseInt(height) || preShow !== show) {
          this.setState({
            scrollHeight: setScrollHeight(this.state)
          });
        } // 缓动动画


        if (transition && transitionName === 'list-row-start') {
          this.setState({
            transitionName: 'list-row-start list-row-transition'
          });
        } // 如果开启了行选择功能且显示表头，根据每行的选择情况设置标题栏多选框的 indeterminate 状态


        if (show && rowCheckBox) {
          var rowCheckBoxArr = selected['rowCheckBox'];

          if (rowCheckBoxArr && !external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEmpty(rowCheckBoxArr)) {
            for (var i = 1, j = rowCheckBoxArr.length; i < j; i++) {
              // 当某一行的选中状态为false且存在选中行的时候，设置标题栏多选框的 indeterminate 状态为true
              if (!rowCheckBoxArr[i] && rowCheckBoxArr.join(',').indexOf('true') > -1) {
                this.scroll.parentNode.querySelector('.list-header input[name=rowCheckBox]').indeterminate = true;
                break;
              }
            }
          }
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
     * 列表滚动逻辑
     * @param {boolean?} isInnerScroll 内部滚动变量（用于事件控制）
     * @param {object?} e 事件回调参数
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
          rowCheckBox = _this$state$property$2.rowCheckBox,
          serialNumber = _this$state$property$2.serialNumber; // 获取每一行的数据量，存入数组 cellsOfRow 内

      external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.range(data.length).map(function (i) {
        // 如果行数据是一个对象，保证该对象内一定有一个cells字段
        if (!data[i].cells) {
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
          uid: "ck".concat(ind),
          name: 'rowCheckBox'
        };

        if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(data[ind])) {
          newData[ind] = [].concat(toConsumableArray_default()(data[ind]), toConsumableArray_default()(new Array(maxCellValue - data[ind].length).fill(''))); // 检测是否开启行选择功能

          if (rowCheckBox) {
            newData[ind].unshift(rowCheck);
          } // 检测是否开启行序号功能


          if (serialNumber.show) {
            newData[ind].unshift(serialNumber.formatter);
          }
        } else {
          newData[ind] = objectSpread_default()({}, data[ind]);
          newData[ind].cells = [].concat(toConsumableArray_default()(data[ind].cells), toConsumableArray_default()(new Array(maxCellValue - data[ind].cells.length).fill(''))); // 检测是否开启行选择功能

          if (rowCheckBox) {
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
     * @returns {*} 单元格图标DOM || null
     */

  }, {
    key: "setCellIcon",
    value: function setCellIcon(icon) {
      if (icon) {
        var iconStyle = this.state.property.body.cell.iconStyle;

        if (icon.src && typeof icon.src === 'string' && (icon.src.indexOf('http://') !== -1 || icon.src.indexOf('https://') !== -1 || icon.src.indexOf('data:image/') !== -1)) {
          return [external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("img", {
            src: icon.src,
            alt: icon.alt || '',
            style: iconStyle,
            key: Math.random(),
            className: icon.className
          }), external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", {
            key: Math.random()
          }, icon.text || '')];
        }
      }

      return null;
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
     * @param {string?} container 当前渲染元素所在的容器
     * @returns {*} 单元格checkbox或radio || null
     */
    value: function setCellInput(cr, rowIndex, container) {
      var selected = this.state.selected;
      var selectedCur = selected[cr.name] || [];

      if (cr.type === 'radio' && !container) {
        /* eslint-disable no-console */
        console.error('When the type attribute of the input tag is radio, the third parameter "container" of setCellInput() is a required parameter, otherwise the function will be invalid!');
        return null;
      }

      if (cr) {
        if (cr.type === 'radio' || cr.type === 'checkbox') {
          return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("label", {
            key: Math.random()
          }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("input", {
            "data-id": cr.uid,
            "data-index": rowIndex,
            type: cr.type,
            name: cr.type === 'radio' ? "".concat(cr.name, "-").concat(container) : cr.name,
            className: cr.className,
            defaultChecked: selectedCur[rowIndex],
            onClick: this.checkCR
          }), cr.text ? external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", null, cr.text) : null);
        } // button 等标签会执行以下代码


        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("input", {
          "data-id": cr.uid,
          "data-index": rowIndex,
          type: cr.type,
          value: cr.value,
          className: cr.className,
          onClick: this.handleEvent.bind(null, cr)
        });
      }

      return null;
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
      var _this3 = this;

      var _this$state3 = this.state,
          colWidth = _this$state3.colWidth,
          property = _this$state3.property;
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
          className: "list-cell",
          style: serialNumberShow && !cellIndex // 如果开启行序号，且为每行第一个单元格
          ? objectSpread_default()({}, style, {
            width: typeof colWidth === 'string' ? colWidth : colWidth[cellIndex] || 'auto'
          }, serialNumberStyle, specialStyle[rowIndex], cellOfColumnStyle[cellIndex], listBorder) // 未开启行序号或不为行内第一个单元格
          : objectSpread_default()({}, style, {
            width: typeof colWidth === 'string' ? colWidth : colWidth[cellIndex] || 'auto'
          }, cellOfColumnStyle[cellIndex], listBorder),
          key: "".concat(rowIndex).concat(cellIndex)
        }, serialNumberShow && cellIndex === 0 && typeof cellData === 'string' ? cellData.replace('{index}', rowIndex + 1) : _this3.parsing(cellData, rowIndex + 1, container));
      });
    }
    /**
     * 解析数据里面的对象
     * @param {object} cellData 需要解析的单元格数据
     * @param {number} rowIndex 需要解析的单元格数据所在行的索引
     * @param {string?} container 当前渲染单元格所在的容器（此参数目前只在type为radio时生效）
     * @returns {*} 单元格数据或DOM
     */

  }, {
    key: "parsing",
    value: function parsing(cellData, rowIndex, container) {
      var _this4 = this;

      if (Array.isArray(cellData)) {
        return cellData.map(function (o, i) {
          return _this4.parsing(o, i, container);
        });
      }

      if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isObject(cellData)) {
        switch (cellData.type) {
          case 'img':
            return this.setCellIcon(cellData);

          case 'link':
            return this.setCellLink(cellData);

          case 'radio':
            return this.setCellInput(cellData, rowIndex, container);

          case 'checkbox':
            return this.setCellInput(cellData, rowIndex);

          case 'button':
            return this.setCellInput(cellData, rowIndex);

          default:
            return null;
        }
      } // 不是对象，返回源数据


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
      var _this5 = this;

      var _this$state4 = this.state,
          property = _this$state4.property,
          transitionName = _this$state4.transitionName;
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
      }

      return bodyData.map(function (rowData, rowIndex) {
        var LIElementProps = {
          key: rowIndex,
          className: "list-row ".concat(transition ? transitionName : ''),
          style: isVisual && rowIndex % (rowVisualInterval * 2) >= rowVisualInterval ? external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.defaultsDeep({}, specialRowStyle[rowIndex], rowVisualStyle, rowStyle) : external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.defaultsDeep({}, specialRowStyle[rowIndex], rowStyle),
          onMouseEnter: _this5.rowHover,
          onMouseLeave: _this5.rowHover // 检测行数据是一个对象还是一个数组
          // 如果是对象，则需要对行做一些处理，比如添加自定义事件等（目前只支持添加事件）

        };

        if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isObject(rowData) && rowData.type === 'row') {
          LIElementProps[rowData.event] = _this5.handleEvent.bind(null, rowData);
        }

        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("li", LIElementProps, external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(rowData) ? _this5.setCell(rowData, rowIndex, container) : _this5.setCell(rowData.cells, rowIndex, container));
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
      var _this6 = this;

      var _this$state5 = this.state,
          property = _this$state5.property,
          colWidth = _this$state5.colWidth,
          headerWidth = _this$state5.headerWidth;
      var isScroll = property.isScroll,
          _property$header = property.header,
          style = _property$header.style,
          cellStyle = _property$header.cellStyle,
          showHeader = _property$header.show;
      var _property$body = property.body,
          minWidth = _property$body.cell.style.minWidth,
          show = _property$body.row.serialNumber.show; // 处理border属性值

      var listBorder = this.setBorder(cellStyle);

      if (showHeader && data && data.length) {
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("ul", {
          className: "list-header list-cont",
          style: !isScroll && headerWidth ? objectSpread_default()({}, style, {
            width: headerWidth
          }) : style
        }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("li", {
          key: "list-row",
          className: "list-row",
          style: style
        }, data.map(function (cell, index) {
          return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
            className: "list-cell",
            key: index,
            style: objectSpread_default()({}, cellStyle, {
              width: typeof colWidth === 'string' ? colWidth : colWidth[index] || 'auto',
              minWidth: minWidth
            }, listBorder)
          }, show && !index ? 'number' : _this6.parsing(cell, 0));
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
      var _this7 = this;

      var _this$state6 = this.state,
          scrollHeight = _this$state6.scrollHeight,
          _this$state6$property = _this$state6.property,
          spacing = _this$state6$property.body.row.spacing,
          isScroll = _this$state6$property.isScroll; // 处理行间距的值

      var borderSpacing = "".concat(spacing).indexOf('px') === -1 ? "0 ".concat(spacing, "px") : "0 ".concat(spacing);
      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
        className: "list-body",
        ref: function ref(ele) {
          return _this7.scroll = ele;
        },
        style: {
          height: scrollHeight,
          overflow: isScroll ? 'hidden' : 'auto'
        }
      }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("ul", {
        className: "list-cont",
        style: {
          borderSpacing: borderSpacing
        },
        ref: function ref(ele) {
          return _this7.listContMain = ele;
        }
      }, this.setRow(bodyData, 'main')), external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("ul", {
        className: "list-cont",
        style: {
          borderSpacing: borderSpacing
        },
        ref: function ref(ele) {
          return _this7.listContSupport = ele;
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
      var _this$state7 = this.state,
          _this$state7$property = _this$state7.property,
          header = _this$state7$property.header,
          spacing = _this$state7$property.body.row.spacing,
          conStyle = _this$state7$property.style,
          data = _this$state7.data,
          className = _this$state7.className;
      var showHeader = header.show; // 处理border属性值

      var listBorder = this.setBorder(conStyle); // 当存在表头数据且表头是开启时处理数据

      var headerData;
      var bodyData;

      if (showHeader && data.length) {
        var _this$fillRow = this.fillRow(data);

        var _this$fillRow2 = toArray_default()(_this$fillRow);

        headerData = _this$fillRow2[0];
        bodyData = _this$fillRow2.slice(1);
      } else {
        bodyData = this.fillRow(data);
      }

      var listClass = !Number.isNaN(parseInt(spacing)) && parseInt(spacing) > 0 ? '' : 'list-no-spacing';
      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
        style: objectSpread_default()({}, listBorder, conStyle),
        className: "list ".concat(className || '', " ").concat(listClass),
        onMouseMove: this.scrollList.bind(this, false),
        onMouseLeave: this.scrollList.bind(this, true)
      }, this.loadHeader(headerData), this.loadBody(bodyData));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      // 以下值由props控制
      var data = props.data,
          property = props.property,
          className = props.className,
          option = objectWithoutProperties_default()(props, ["data", "property", "className"]);

      var transition = property.body.row.transition;

      var propsUpdate = objectSpread_default()({
        data: data,
        property: property,
        className: className
      }, option); // 以下值由组件本身控制


      var colWidth = state.colWidth,
          scrollHeight = state.scrollHeight,
          selected = state.selected,
          stateProperty = state.property,
          stateData = state.data,
          headerWidth = state.headerWidth;
      var transitionName = state.transitionName;

      if (transition) {
        if (!external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqual(data, stateData)) {
          transitionName = 'list-row-start';
        }
      } else {
        transitionName = '';
      }

      var stateUpdate = {
        colWidth: colWidth,
        scrollHeight: scrollHeight,
        selected: selected,
        transitionName: transitionName,
        headerWidth: headerWidth
      };
      var width = property.body.cell.style.width; // 由props和state同时控制的colWidth

      if (stateProperty && width !== stateProperty.body.cell.style.width) {
        stateUpdate.colWidth = setColWidth(width);
      } // 检测props是否发生改变


      var propsUpdateArray = Object.keys(propsUpdate);
      propsUpdateArray.map(function (prop) {
        if (propsUpdate[prop] === state[prop]) {
          delete propsUpdate[prop];
        } else if (prop === 'property') {
          external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.defaultsDeep(propsUpdate[prop], state[prop]);
        }
      }); // 如果props更新了属性，则返回props和state合并的配置项

      if (propsUpdateArray.length) {
        return objectSpread_default()({}, propsUpdate, stateUpdate);
      } // 如果props未更新属性，则返回组件自身从setState通道更新的状态值


      return stateUpdate;
    }
  }]);

  return _default;
}(external_commonjs_react_commonjs2_react_amd_react_root_React_["Component"]);


// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return src_default_0; });









/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 组件入口
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xyzsyx@163.com）
 * @LastModifiedTime: 2019-01-23 15:03:17
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

      var newProperty = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.defaultsDeep({}, property, config.property);

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