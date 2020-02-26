(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["ReactTabllist"] = factory(require("react"), require("lodash"));
	else
		root["ReactTabllist"] = factory(root["React"], root["_"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__) {
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(19);

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
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(17);

var assertThisInitialized = __webpack_require__(0);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(18);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(25);

var iterableToArray = __webpack_require__(13);

var nonIterableSpread = __webpack_require__(26);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(12);

var iterableToArray = __webpack_require__(13);

var nonIterableRest = __webpack_require__(14);

function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
}

module.exports = _toArray;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(12);

var iterableToArrayLimit = __webpack_require__(24);

var nonIterableRest = __webpack_require__(14);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(21);
            var content = __webpack_require__(22);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(23);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".list{overflow:hidden;box-sizing:border-box}.list .list-header .list-cont{border-collapse:collapse}.list .list-header .list-row{background:no-repeat center / 100% 100%}.list .list-header .list-row .list-cell{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.list .list-body{overflow-x:hidden}.list .list-cont{margin:0;padding:0;display:table;box-sizing:border-box;table-layout:fixed;width:100%;height:auto;transition:all 400ms}.list .list-cont .list-row{display:table-row;list-style:none;border:none !important;transition:all 300ms cubic-bezier(0, 0, 0.58, 1);background:no-repeat center / 100% 100%}.list .list-cont .list-row.list-row-start{transform:scale(0.8);opacity:0}.list .list-cont .list-row.list-row-end{opacity:1;transform:scale(1)}.list .list-cont .list-row.click-row{cursor:pointer}.list .list-cont .list-row .list-cell{display:table-cell;box-sizing:border-box;text-align:center;vertical-align:middle;word-break:break-all;overflow:hidden;background:no-repeat center / 100% 100%}.list .list-cont .list-row .list-cell *{vertical-align:middle}.list .list-cont .list-row .list-cell a{color:currentColor;-webkit-text-decoration:transparent;text-decoration:transparent}.list .list-cont .list-row .list-cell label{vertical-align:middle}.list .list-cont .list-row .list-cell label span,.list .list-cont .list-row .list-cell label input{vertical-align:middle;padding:0 5px}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 23 */
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
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
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
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
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
/* 24 */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

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
/* 25 */
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
/* 26 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(4);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(6);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(7);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(8);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(9);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(10);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(1);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(5);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"}
var external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_ = __webpack_require__(3);
var external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_);

// EXTERNAL MODULE: external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"}
var external_commonjs_react_commonjs2_react_amd_react_root_React_ = __webpack_require__(2);
var external_commonjs_react_commonjs2_react_amd_react_root_React_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_react_commonjs2_react_amd_react_root_React_);

// CONCATENATED MODULE: ./src/config.js
/* harmony default export */ var config = ({
  className: '',
  data: [['1st column', '2nd column', '3rd column'], ['1st cell', '2nd cell', '3rd cell']],
  property: {
    border: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#f4f4f4'
    },
    style: {
      width: '100%',
      margin: '0 auto',
      height: 300
    },
    scroll: {
      enable: true,
      speed: 50,
      distance: 1
    },
    header: {
      show: true,
      style: {
        height: 40
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
        spacing: 0,
        style: {
          height: 30
        },
        serialNumber: {
          show: false,
          columnName: 'SN',
          formatter: '{index}.',
          column: 1,
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '',
            backgroundImage: '',
            color: '#ffffff'
          },
          specialStyle: []
        },
        rowCheckbox: {
          show: false,
          column: 1,
          style: {},
          specialStyle: []
        },
        // visual样式高于row.style
        visual: {
          show: false,
          interval: 1,
          style: {
            backgroundColor: '#e8f4fc'
          }
        },
        // 注意：单独指定每一行的样式的优先级高于visual.style的优先级
        specialStyle: [],
        // silent的样式优先级高于specialStyle
        silent: {
          show: false,
          // false is open
          style: {
            opacity: 0.8
          }
        }
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
/**
 * 为过时的属性配置警告信息
 * @returns {{discard: string, version: string, replacement: string}[]}
 */

function getWaringProperty() {
  return [{
    version: '1.0.0',
    discard: 'property.body.cell.iconStyle',
    warn: 'Used obsolete configuration in React-tabllist: \'property.body.cell.iconStyle\' will be completely removed in future releases.Please use the object unit ({type: img, ...}) instead.'
  }, {
    version: '1.2.0',
    discard: 'property.body.row.onClick',
    warn: 'Used obsolete configuration in React-tabllist: \'property.body.row.onClick\' can only be used in version 1.2.0, Please use the object unit ({type: row, ...}) instead.'
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
  }, {
    version: '1.5.0',
    discard: ['property.body.row.rowCheckbox', 'Object'],
    replacement: 'property.body.row.rowCheckbox.show',
    warn: 'Used obsolete configuration in React-tabllist: \'property.body.row.rowCheckbox\' is no longer directly set to a boolean value in version 1.5.0, but an object. For example: {show: boolean, style: cssProperties}.'
  }];
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toArray.js
var toArray = __webpack_require__(15);
var toArray_default = /*#__PURE__*/__webpack_require__.n(toArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(0);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./src/index.scss
var src_0 = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(16);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(11);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// CONCATENATED MODULE: ./src/util.js





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



/**
 * 从el元素向上选取第一个selector选择器匹配的元素
 * @param {Element || Node} el DOM元素
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

  if (listComponent && window) {
    var _getComputedStyle = getComputedStyle(listComponent, null),
        paddingTop = _getComputedStyle.paddingTop,
        paddingBottom = _getComputedStyle.paddingBottom,
        borderTopWidth = _getComputedStyle.borderTopWidth,
        borderBottomWidth = _getComputedStyle.borderBottomWidth;

    var result = parseInt(height) - parseInt(paddingTop || 0) - parseInt(paddingBottom || 0) - parseInt(borderTopWidth || 0) - parseInt(borderBottomWidth || 0);

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
 * 获取DOM内每一列单元格的实际宽度
 * @param listContMain 滚动主容器对象
 * @returns {Array} 列表每列的宽度值，数组长度代表列数
 */

function getColClientWidth(listContMain) {
  var widthArr = [];

  if (listContMain && listContMain.children.length) {
    for (var i = 0, l = listContMain.children[0].children; i < l.length; i++) {
      widthArr.push(l[i].offsetWidth || 'auto');
    }
  }

  return widthArr;
}
/**
 * 将用户设置的每一列单元格宽度值解析为组件程序需要的值，同时处理不合法数据
 * @param {object} props 组件的props
 * @param {array} data 用于渲染组件的数据
 * @returns {*} 用于渲染每列单元格的宽度值
 */

function handleColWidth(props, data) {
  function isString(widthValue) {
    if (widthValue.includes('px')) {
      return "".concat(parseFloat(widthValue), "px");
    } else if (widthValue.includes('%')) {
      return "".concat(parseFloat(widthValue), "%");
    } else if (widthValue * 1) {
      return parseFloat(widthValue);
    }

    return 'auto';
  }

  function isArray(width) {
    return width.map(function (o) {
      if (o === 0 || !o) {
        return 'auto';
      } else if (typeof o === 'string') {
        return isString(o);
      }

      return o;
    });
  }

  var width = props.property.body.cell.style.width;

  if (Array.isArray(width)) {
    // 处理数组形式的多列宽度数值
    return isArray(width);
  } else if (typeof width === 'string') {
    // 处理字符串形式的宽度数值
    if (width.includes(',')) {
      return isArray(width.split(',')); // 处理字符串形式的多列宽度数值
    } else if (width === 'avg') {
      // 处理平均值
      var maxCellNumber = getMaxCellOfRow(data, props);

      if (maxCellNumber > 1) {
        return new Array(maxCellNumber - 1).fill("".concat(1 / maxCellNumber * 100, "%"));
      }
    }
  }

  return 'auto';
}
/**
 * 从原始数据(配置的二维数组)中获取每行的单元格数量（以最多单元格的一行为准）
 * @param data 用于渲染的数据
 * @returns {number}
 */

function getMaxCellFromData(data) {
  var cellsOfRow = []; // 获取每一行的数据量，存入数组 cellsOfRow 内

  external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.range(data.length).map(function (i) {
    // 如果行数据是一个对象，保证该对象内一定有一个cells字段
    if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isPlainObject(data[i]) && !data[i].cells) {
      data[i].cells = [];
    }

    cellsOfRow.push(external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(data[i]) ? data[i].length : data[i].cells.length);
  }); // 获取数据量最多的一行的数值


  return Math.max.apply(Math, cellsOfRow);
}
/**
 * 获取行的单元格数量
 * @param data {array[]} 用于渲染的数据
 * @param props {object} 组件的props
 * @returns {number}
 */

function getMaxCellOfRow(data, props) {
  var maxCellFromData = getMaxCellFromData(data);
  var _props$property$body$ = props.property.body.row,
      serialNumber = _props$property$body$.serialNumber,
      rowCheckbox = _props$property$body$.rowCheckbox;

  if (serialNumber.show) {
    maxCellFromData++;
  }

  if (rowCheckbox.show) {
    maxCellFromData++;
  }

  return maxCellFromData;
}
/**
 * 补齐单元格
 * 如果props数据不规范，则自动补齐单元格到缺少的行，直到每一行的单元格数量相等为止
 * @param {object} data 新数据
 * @param {object} state 组件当前状态
 * @returns {Array} 补齐后的用于生成单元格的数据
 */

function fillRow(data, state) {
  /**
   * 生成对象单元插入到行内
   * @param insertedRow 被插入的行
   * @param rowIndex 行索引
   * @returns {*}
   */
  function insertCellToRow(insertedRow, rowIndex) {
    var rowCheck = {
      type: 'checkbox',
      text: '',
      key: "rowCheck".concat(rowIndex),
      name: 'rowCheckbox'
    };
    var SNCell = {
      type: 'text',
      text: header.show && rowIndex === 0 ? serialNumber.columnName : serialNumber.formatter.replace('{index}', rowIndex),
      key: "listSN".concat(rowIndex)
    };
    var insertList = [];

    if (rowCheckbox.column > serialNumber.column) {
      insertList.push([SNCell, serialNumber]);
      insertList.push([rowCheck, rowCheckbox]);
    } else {
      insertList.push([rowCheck, rowCheckbox]);
      insertList.push([SNCell, serialNumber]);
    }

    insertList.forEach(function (list) {
      if (list[1].show) {
        insertedRow.splice(list[1].column - 1, 0, list[0]);
      }
    });
    return insertedRow;
  }
  /**
   * 处理行数据
   * @param insertedRow 被处理的行
   * @param rowIndex 行索引
   * @param cloneRow 从源数据中克隆的行
   * @returns {*}
   */


  function handleRow(insertedRow, rowIndex, cloneRow) {
    insertedRow = [].concat(toConsumableArray_default()(cloneRow), toConsumableArray_default()(new Array(maxCellValue - cloneRow.length).fill('')));
    return insertCellToRow(insertedRow, rowIndex);
  }

  var _state$property = state.property,
      header = _state$property.header,
      body = _state$property.body;
  var _body$row = body.row,
      rowCheckbox = _body$row.rowCheckbox,
      serialNumber = _body$row.serialNumber;

  var cloneData = toConsumableArray_default()(data); // 获取数据量最多的一行的数值


  var maxCellValue = getMaxCellFromData(cloneData);
  var newData = []; // 补齐空数据到缺失的行

  cloneData.forEach(function (row, ind) {
    if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(cloneData[ind])) {
      newData.push(handleRow(newData[ind], ind, cloneData[ind]));
    } else {
      newData[ind] = _objectSpread({}, cloneData[ind]);
      newData[ind].cells = handleRow(newData[ind].cells, ind, cloneData[ind].cells);
    }
  });
  return newData;
}
/**
 * 组件内部元素的事件处理
 * @param param {array} 保存渲染组件结构的对象单元以及内部逻辑函数的数组
 * @param event event对象
 */

function handleEvent(param, event) {
  event.stopPropagation();

  if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(param)) {
    event.persist();

    var _param = slicedToArray_default()(param, 2),
        _objectUnit = _param[0],
        _func = _param[1]; // 如果有内部逻辑事件，执行之


    if (_func && external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isFunction(_func)) {
      _func(event);
    } else {
      // 没有内部逻辑事件，且对象单元存在时，执行用户的回调函数
      if (_objectUnit && Object.keys(_objectUnit).length) {
        expPropsAndMethods(this, _objectUnit, event);
      }
    }
  }
}
/**
 * 给回调函数注入必要的属性和方法，暴露给外界使用
 * @param comp {object} 组件实例对象
 * @param _objectUnit {object} 渲染组件结构的对象单元
 * @param event event对象
 */

function expPropsAndMethods(comp, _objectUnit, event) {
  if (_objectUnit.callback && external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isFunction(_objectUnit.callback)) {
    var scrollTo = comp.scrollTo,
        props = comp.props,
        renderData = comp.renderData,
        state = comp.state;

    var cloneState = _objectSpread({}, state);

    delete cloneState.property;
    delete cloneState.data;
    delete cloneState.className;

    _objectUnit.callback({
      scrollTo: scrollTo,
      props: props,
      state: cloneState,
      renderData: renderData
    }, _objectUnit, event);
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
   * @param property 用户配置的property对象
   * @returns {{isExist: boolean}|{isExist: boolean, value: *}} isExist:是否使用了过时属性 value:过时属性的值
   */

  function isKeyExists(discard, property) {
    if (!property || !discard || !discard[0]) {
      return {
        isExist: false
      };
    } // 将传入的对象路径字符串拆分为数组


    var isDiscardArray = Array.isArray(discard);
    var pathList = isDiscardArray ? discard[0].split('.') : discard.split('.'); // 如果使用了过时的属性，则此变量用来保存用户设置的属性值

    var value; // 检测用户的配置对象是否存在警告

    for (var i = 1; i < pathList.length; i++) {
      if (typeof property[pathList[i]] === 'undefined') {
        return {
          isExist: false
        };
      }

      if (i !== pathList.length - 1) {
        property = property[pathList[i]];
      } else {
        value = property[pathList[i]];

        if (isDiscardArray && Object.prototype.toString.apply(value) === "[object ".concat(discard[1], "]")) {
          return {
            isExist: false
          };
        } else {
          property = pathList[i];
        }
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
      if (i !== pathList.length - 1) {
        // 确保给定的属性路径是对象的形式，防止报错：获取未定义的对象的属性
        if (property[pathList[i]] === 'undefined' || !external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isPlainObject(property[pathList[i]])) {
          property[pathList[i]] = {};
        }

        property = property[pathList[i]];
      } else {
        property[pathList[i]] = valueOfDiscard;
      }
    }
  }

  waringProperty.map(function (_obj) {
    var result = isKeyExists(_obj.discard, property);

    if (result.isExist) {
      createNewProperty(_obj.replacement, property, result.value);

      if (false) {} // lgtm [js/unreachable-statement]

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
    return rows[counter].offsetTop - rows[counter].parentElement.parentElement.offsetTop;
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
 * @param isDataChanged {boolean} 渲染数据是否发生变化
 * @returns {null|string}
 */

function getTransitionName(transition, isDataChanged) {
  if (transition) {
    if (isDataChanged) {
      return 'list-row-start';
    } else {
      return 'list-row-end';
    }
  }

  return '';
}
/**
 * 获取行的样式
 * 行样式的优先级顺序：row.style < row.visual.style < row.specialStyle < silent.style
 * @param rowState
 * @param event
 */

function getRowStyle(rowState, event) {
  var data = rowState.data,
      property = rowState.property;
  var body = property.body,
      header = property.header;
  var headerShow = header.show;
  var row = body.row;
  var style = row.style,
      _row$visual = row.visual,
      visualShow = _row$visual.show,
      visualStyle = _row$visual.style,
      interval = _row$visual.interval,
      specialStyle = row.specialStyle,
      _row$silent = row.silent,
      silentShow = _row$silent.show,
      silentStyle = _row$silent.style;
  var rowStyle = [];

  external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.range(headerShow ? data.length - 1 : data.length).map(function (index) {
    var tempStyle = style;

    if (visualShow && interval && !Number.isNaN(interval) && index % (interval * 2) >= interval) {
      tempStyle = _objectSpread({}, tempStyle, {}, visualStyle);
    }

    if (specialStyle && external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(specialStyle)) {
      tempStyle = _objectSpread({}, tempStyle, {}, specialStyle[index]);
    }

    if (event) {
      var rowElement = closest(event.target, '.list-row');
      var rowIndex = Array.prototype.indexOf.call(rowElement.parentNode.childNodes, rowElement);

      if (!silentShow && index === rowIndex && event.type === 'mouseenter') {
        tempStyle = _objectSpread({}, tempStyle, {}, silentStyle);
      }
    }

    rowStyle.push(tempStyle);
  });

  return rowStyle;
}
/**
 * 处理css属性‘border-collapse’与‘border-spacing’的值
 * @param spacing {number|string} 行间距
 * @returns {{borderCollapse: string}|{borderSpacing: string}}
 */

function getListContStyle(spacing) {
  if (!spacing || !parseInt(spacing)) {
    return {
      borderCollapse: 'collapse',
      borderSpacing: '0px'
    };
  }

  return {
    borderSpacing: "".concat(spacing).includes('px') ? "0 ".concat(spacing) : "0 ".concat(spacing, "px"),
    borderCollapse: 'separate'
  };
}
/**
 * 处理自定义对象单元格的内置属性（剔除不存在的内置属性）
 * @param objectCell {object} 自定义对象单元格对象
 * @returns {{attrs: *, builtInAttrs: {}}}
 *    builtInAttrs: 可用的内置属性集合
 *    attrs: 剔除内置属性后剩下的其余属性
 */

function handleBuiltInAttributes(objectCell) {
  var type = objectCell.type,
      text = objectCell.text,
      event = objectCell.event,
      callback = objectCell.callback,
      cells = objectCell.cells,
      data = objectCell.data,
      option = objectCell.option,
      attrs = objectWithoutProperties_default()(objectCell, ["type", "text", "event", "callback", "cells", "data", "option"]);

  var builtInAttrs = {
    type: type,
    text: text,
    event: event,
    callback: callback,
    cells: cells,
    data: data,
    option: option
  };
  builtInAttrs = Object.entries(builtInAttrs).reduce(function (object, arr) {
    if (arr[1] !== undefined && arr[1] !== null) {
      return _objectSpread({}, object, defineProperty_default()({}, arr[0], arr[1]));
    }

    return object;
  }, {});
  return {
    builtInAttrs: builtInAttrs,
    attrs: attrs
  };
}
/**
 * 生成ID和key。如果未定义key，则key的值与新生成的id相同。
 * @param key {string} 唯一标识符
 * @param type {string} 单元格类型
 * @returns {{id: string, key: string}} 包含新生成的ID和key的对象
 */

function generateIdAndKeyForTag(key, type) {
  var id = "rt-".concat(type, "-").concat((Math.random() * Math.pow(10, 10)).toFixed(0));

  if (key) {
    return {
      key: key,
      id: id
    };
  }

  return {
    id: id,
    key: id
  };
}
// CONCATENATED MODULE: ./src/list.js











function list_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function list_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { list_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { list_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







var list_default =
/*#__PURE__*/
function (_React$Component) {
  inherits_default()(_default, _React$Component);

  function _default(props) {
    var _this;

    classCallCheck_default()(this, _default);

    _this = possibleConstructorReturn_default()(this, getPrototypeOf_default()(_default).call(this, props));

    defineProperty_default()(assertThisInitialized_default()(_this), "scrollList", function (isInnerScroll, e) {
      var _assertThisInitialize = assertThisInitialized_default()(_this),
          listContMain = _assertThisInitialize.listContMain,
          listContSupport = _assertThisInitialize.listContSupport,
          _assertThisInitialize2 = _assertThisInitialize.state,
          scrollHeight = _assertThisInitialize2.scrollHeight,
          enable = _assertThisInitialize2.property.scroll.enable; // 检测实现滚动的主容器和辅助容器是否存在


      if (listContMain && listContSupport) {
        // 删除上一次定时器，后续根据状态来判定是否定义新的定时器
        clearInterval(_this.marqueeInterval);

        if (isInnerScroll || isInnerScroll === undefined) {
          // 检测滚动条件
          // 根据滚动条件控制辅助容器的显示状态
          if (enable && listContMain.clientHeight >= parseInt(scrollHeight)) {
            if (isInnerScroll !== undefined && e.type === 'mouseleave') {
              // 鼠标移出组件，恢复滚动
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

      if (!isNaN(rowIndex) && rowIndex > 0) {
        targetScrollTop = getScrollTop.bind('switch', null, listContMain.children, rowIndex)();
      } else if (rowIndex === 0) {
        targetScrollTop = 0;
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
      }, 4);
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "checkScrollDistance", function () {
      var _assertThisInitialize6 = assertThisInitialized_default()(_this),
          listContMain = _assertThisInitialize6.listContMain,
          scroll = _assertThisInitialize6.scroll;

      if (listContMain.clientHeight <= scroll.scrollTop) {
        scroll.scrollTop = scroll.scrollTop - listContMain.clientHeight;
      }
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "rowHover", function (e) {
      e.stopPropagation();
      e.persist();

      _this.setState(function (prevState) {
        return {
          rowStyle: getRowStyle(prevState, e)
        };
      });
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "checkCR", function (cr, event) {
      var target = event.target;
      var _this$state = _this.state,
          selected = _this$state.selected,
          data = _this$state.data,
          property = _this$state.property;

      var selectedCur = list_objectSpread({}, selected);

      var targetName = target.name;
      var indeterminate = _this.state.indeterminate; // 列表滚动控制（暂停/继续滚动）

      _this.pause = true; // 检测this.state.selected里与之对应的数组是否存在，否则初始化一个空数组
      // 而radio因为是单选按钮，决定了state数组里面有且仅有一个值来表示被选中的按钮，所以每次都初始化为空数组

      if (target.type === 'radio') {
        // 检测是否是radio，radio需要处理一下this.state.selected里与之对应的name属性
        targetName = targetName.substring(0, targetName.lastIndexOf('-'));

        if (!selectedCur[targetName]) {
          selectedCur[targetName] = [];
        } // 将处理后结果赋值给state


        selectedCur[targetName][0] = target;
      } // 检测是否点击的是表头的checkbox，且是否启用表头
      else if (target.type === 'checkbox') {
          // 检测是否是行选择框
          if (target.name === 'rowCheckbox') {
            var showHeader = property.header.show; // 获取列表内所有的行选择框

            var rowCheckboxes = _this.scroll.parentNode.querySelectorAll('[name=\'rowCheckbox\']'); // 当启用表头时，点击表头的行选择框


            if (showHeader && external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqual(rowCheckboxes[0], target)) {
              indeterminate = false;
              selectedCur[targetName] = new Array(data.length).fill(target);
            } else {
              /* 触发非表头的行选择框 */
              // 获取触发的行选择框所在行的索引
              var clickedActualIndex = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.findIndex(rowCheckboxes, target); // 如果点击的是辅助容器内的行选择框，则对应到主容器内的行选择框的索引。


              var mainIndex = clickedActualIndex >= data.length ? clickedActualIndex - data.length + (showHeader ? 1 : 0) // 处理显示表头和不显示表头的情况
              : clickedActualIndex; // 将处理后结果赋值给state

              selectedCur[targetName][mainIndex] = target; // 每次触发body内的行选择框时都检查一次所有行选择框的状态

              var rowCheckboxSelectedQuantity = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.compact(selectedCur[targetName].map(function (chk) {
                return chk.checked;
              }).slice(1)).length; // body内行选择框未全选中


              if (rowCheckboxSelectedQuantity !== data.length - 1) {
                selectedCur[targetName][0] = {
                  checked: false
                };
                indeterminate = rowCheckboxSelectedQuantity > 0;
              } else {
                selectedCur[targetName][0] = {
                  checked: true
                };
                indeterminate = false;
              }
            }
          } else {
            /* 非行选择框 */
            if (!selectedCur[targetName]) {
              selectedCur[targetName] = [];
            } // 获取同一单元格内相同name的复选框


            var checkboxes = _this.listContMain.querySelectorAll("[name='".concat(targetName, "']")); // 获取触发的checkbox的索引


            var clickedIndex = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.findIndex(checkboxes, target); // 将处理后结果赋值给state


            selectedCur[targetName][clickedIndex] = target;
          }
        }

      _this.setState(function () {
        return {
          indeterminate: indeterminate,
          selected: selectedCur
        };
      }, function () {
        return expPropsAndMethods(assertThisInitialized_default()(_this), cr, event);
      });
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setCellImage", function (ci) {
      var iconStyle = _this.state.property.body.cell.iconStyle;

      var _util$handleBuiltInAt = handleBuiltInAttributes(ci),
          builtInAttrs = _util$handleBuiltInAt.builtInAttrs,
          attrs = _util$handleBuiltInAt.attrs;

      var src = attrs.src;

      var _util$generateIdAndKe = generateIdAndKeyForTag(attrs.key, builtInAttrs.type),
          id = _util$generateIdAndKe.id,
          key = _util$generateIdAndKe.key;

      if (src && typeof src === 'string' && (src.indexOf('http://') !== -1 || src.indexOf('https://') !== -1 || src.indexOf('data:image/') !== -1)) {
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("label", {
          htmlFor: id,
          key: key,
          style: iconStyle,
          className: "list-cell-img"
        }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("img", extends_default()({
          id: id,
          alt: attrs.alt || id
        }, attrs)), ci.text ? external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", null, ci.text) : null);
      }
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setCellLink", function (cl) {
      var _util$handleBuiltInAt2 = handleBuiltInAttributes(cl),
          builtInAttrs = _util$handleBuiltInAt2.builtInAttrs,
          attrs = _util$handleBuiltInAt2.attrs;

      var text = builtInAttrs.text,
          event = builtInAttrs.event,
          type = builtInAttrs.type;

      var tagProps = list_objectSpread({}, generateIdAndKeyForTag(attrs.key, type), {}, attrs); // 如果存在href属性，则不再另行添加事件


      if (attrs.href) {
        tagProps = list_objectSpread({}, tagProps, {
          onClick: handleEvent.bind(assertThisInitialized_default()(_this)) // 此函数是为了防止事件冒泡

        });
      } else {
        tagProps = list_objectSpread({}, tagProps, defineProperty_default()({}, event ? event : 'onClick', handleEvent.bind(assertThisInitialized_default()(_this), [cl])));
      }

      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("a", tagProps, text);
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setCellInput", function (cr, _ref, container) {
      var rowIndex = _ref.rowIndex,
          cellIndex = _ref.cellIndex,
          index = _ref.index;
      var tagProps;

      var _util$handleBuiltInAt3 = handleBuiltInAttributes(cr),
          builtInAttrs = _util$handleBuiltInAt3.builtInAttrs,
          attrs = _util$handleBuiltInAt3.attrs;

      if (cr.type === 'button') {
        var _objectSpread3;

        tagProps = list_objectSpread((_objectSpread3 = {}, defineProperty_default()(_objectSpread3, cr.event ? cr.event : 'onClick', handleEvent.bind(assertThisInitialized_default()(_this), [cr])), defineProperty_default()(_objectSpread3, "type", 'button'), _objectSpread3), generateIdAndKeyForTag(attrs.key, 'button'), {}, attrs);
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("input", tagProps);
      } else if (cr.type === 'input') {
        var _objectSpread4;

        var event = builtInAttrs.event,
            text = builtInAttrs.text;

        var _util$generateIdAndKe2 = generateIdAndKeyForTag(attrs.key, 'input'),
            id = _util$generateIdAndKe2.id,
            key = _util$generateIdAndKe2.key;

        tagProps = list_objectSpread((_objectSpread4 = {}, defineProperty_default()(_objectSpread4, event ? event : 'onClick', handleEvent.bind(assertThisInitialized_default()(_this), [cr])), defineProperty_default()(_objectSpread4, "type", 'text'), defineProperty_default()(_objectSpread4, "id", id), _objectSpread4), attrs);
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("label", {
          htmlFor: tagProps.id,
          className: "list-cell-input",
          key: key
        }, text ? external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", null, text + ' ') : '', external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("input", extends_default()({
          id: tagProps.id
        }, tagProps)));
      } else {
        // checkbox or radio
        var _event = builtInAttrs.event,
            type = builtInAttrs.type,
            _text = builtInAttrs.text;
        var value = attrs.value,
            name = attrs.name;
        var selected = _this.state.selected;
        var selectedCur = selected[name] || [];

        var _util$generateIdAndKe3 = generateIdAndKeyForTag(attrs.key, type),
            _id = _util$generateIdAndKe3.id,
            _key = _util$generateIdAndKe3.key; // 处理标签属性


        tagProps = list_objectSpread({
          id: _id,
          type: type
        }, attrs, {
          value: value !== undefined ? value : name === 'rowCheckbox' ? "rowChk-".concat(rowIndex) : "react-tabllist-value-".concat(rowIndex, "-").concat(cellIndex, "-").concat(index),
          name: type === 'radio' ? "".concat(name, "-").concat(container) : name,
          className: "".concat(type === 'radio' ? 'list-cell-radio' : 'list-cell-chk').concat(attrs.className ? " ".concat(attrs.className) : '')
        }); // 处理选中状态

        var tempIndex;

        if (type === 'checkbox') {
          // 复选框保存被选中框的索引
          if (name === 'rowCheckbox') {
            tempIndex = rowIndex;
          } else {
            tempIndex = index;
          }

          tagProps.checked = !!(selectedCur[tempIndex] && selectedCur[tempIndex].checked);
        } else if (type === 'radio') {
          // 单选按钮保存被选中按钮的key值
          tagProps.checked = !!(selectedCur[0] && selectedCur[0].name.substring(0, selectedCur[0].name.lastIndexOf('-')) === name + '' && selectedCur[0].value === tagProps.value + '');
        } // 处理事件


        if (_event && _event !== 'onClick' && _event !== 'onChange') {
          tagProps[_event] = handleEvent.bind(assertThisInitialized_default()(_this), [cr]);
        }

        tagProps.onChange = handleEvent.bind(assertThisInitialized_default()(_this), [cr, _this.checkCR.bind(null, cr)]);
        tagProps.onClick = handleEvent.bind(assertThisInitialized_default()(_this), []); // 打印警告信息

        if (type === 'radio' && !container) {
          console.error('When the type attribute of the input tag is radio, the third parameter "container" of setCellInput() is a required parameter, otherwise the function will be invalid!');
          return null;
        } // 处理 JSX


        if (type === 'radio' || type === 'checkbox') {
          var _this$state$property$ = _this.state.property.body.row.rowCheckbox,
              rowCheckboxShow = _this$state$property$.show,
              rowCheckboxStyle = _this$state$property$.style,
              specialStyle = _this$state$property$.specialStyle;
          var style = rowCheckboxShow && _key && _key.match(/^rowCheck\d+/) ? list_objectSpread({}, rowCheckboxStyle, {}, specialStyle[rowIndex - 1]) : {};
          return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("label", {
            htmlFor: _id,
            key: _key,
            onClick: handleEvent.bind(assertThisInitialized_default()(_this), []) // 处理冒泡
            ,
            style: style,
            className: "list-cell-".concat(type) // className is list-cell-radio or list-cell-checkbox

          }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("input", tagProps), _text ? external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", null, _text) : null);
        }
      }
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setCellSelect", function (cs) {
      var _util$handleBuiltInAt4 = handleBuiltInAttributes(cs),
          builtInAttrs = _util$handleBuiltInAt4.builtInAttrs,
          attrs = _util$handleBuiltInAt4.attrs;

      var text = builtInAttrs.text,
          option = builtInAttrs.option,
          event = builtInAttrs.event,
          type = builtInAttrs.type;

      var _util$generateIdAndKe4 = generateIdAndKeyForTag(attrs.key, type),
          id = _util$generateIdAndKe4.id,
          key = _util$generateIdAndKe4.key;

      var tagProps = list_objectSpread(defineProperty_default()({
        id: id
      }, event ? event : 'onChange', handleEvent.bind(assertThisInitialized_default()(_this), [cs])), attrs);

      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("label", {
        htmlFor: id,
        key: key,
        className: "list-cell-select"
      }, text ? external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", null, text) : null, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("select", tagProps, option && option.map(function (item, index) {
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("option", extends_default()({
          key: "".concat(id, "-option-").concat(index)
        }, item));
      })));
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setCellText", function (ct, _ref2) {
      var rowIndex = _ref2.rowIndex;
      var _this$state$property = _this.state.property,
          header = _this$state$property.header,
          body = _this$state$property.body;
      var _body$row$serialNumbe = body.row.serialNumber,
          serialNumberShow = _body$row$serialNumbe.show,
          serialNumberStyle = _body$row$serialNumbe.style,
          specialStyle = _body$row$serialNumbe.specialStyle;

      var _util$handleBuiltInAt5 = handleBuiltInAttributes(ct),
          builtInAttrs = _util$handleBuiltInAt5.builtInAttrs,
          attrs = _util$handleBuiltInAt5.attrs;

      var _util$generateIdAndKe5 = generateIdAndKeyForTag(attrs.key, builtInAttrs.type),
          id = _util$generateIdAndKe5.id,
          key = _util$generateIdAndKe5.key;

      var text = builtInAttrs.text,
          event = builtInAttrs.event,
          callback = builtInAttrs.callback;
      var style = serialNumberShow && key.match(/^listSN\d+/) ? list_objectSpread({}, !header.show || rowIndex !== 0 ? serialNumberStyle : {}, {}, specialStyle[rowIndex - 1], {}, attrs.style) : attrs.style; // 处理内置样式表

      attrs.className = attrs.className ? "list-cell-text ".concat(attrs.className) : attrs.className; // 处理默认事件及回调函数

      if (typeof callback === 'function') {
        style = list_objectSpread({}, style, {
          cursor: 'pointer'
        });

        if (event) {
          attrs[event] = handleEvent.bind(assertThisInitialized_default()(_this), [ct]);
        } else {
          attrs['onClick'] = handleEvent.bind(assertThisInitialized_default()(_this), [ct]);
        }
      }

      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("span", extends_default()({
        id: id,
        key: key
      }, attrs, {
        style: style
      }), text);
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setCell", function (rowData, rowIndex, container) {
      var _this$state2 = _this.state,
          colWidth = _this$state2.colWidth,
          property = _this$state2.property,
          rowStyle = _this$state2.rowStyle;
      var _property$body = property.body,
          cellOfColumnStyle = _property$body.cellOfColumn.style,
          style = _property$body.cell.style; // 处理border属性值

      var listBorder = _this.setBorder(style);

      return rowData.map(function (cellData, cellIndex) {
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
          key: "".concat(container, "-cell-r").concat(rowIndex, "-c").concat(cellIndex),
          className: "list-cell",
          style: list_objectSpread({
            height: rowStyle[rowIndex] ? rowStyle[rowIndex].height : 'auto'
          }, style, {
            width: typeof colWidth === 'string' ? colWidth : colWidth[cellIndex] || 'auto'
          }, cellOfColumnStyle[cellIndex], {}, listBorder)
        }, _this.parsing(cellData, {
          rowIndex: rowIndex + 1,
          cellIndex: cellIndex
        }, container));
      });
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "parsing", function (cellData, _ref3, container) {
      var rowIndex = _ref3.rowIndex,
          cellIndex = _ref3.cellIndex,
          index = _ref3.index;

      if (Array.isArray(cellData)) {
        return cellData.map(function (o, i) {
          return _this.parsing(o, {
            rowIndex: rowIndex,
            cellIndex: cellIndex,
            index: i
          }, container);
        });
      }

      if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isObject(cellData)) {
        switch (cellData.type) {
          case 'link':
            return _this.setCellLink(cellData);

          case 'select':
            return _this.setCellSelect(cellData);

          case 'img':
            return _this.setCellImage(cellData);

          case 'text':
            return _this.setCellText(cellData, {
              rowIndex: rowIndex
            });

          case 'input':
            return _this.setCellInput(cellData, {
              rowIndex: rowIndex,
              cellIndex: cellIndex,
              index: index
            });

          case 'radio':
          case 'checkbox':
          case 'button':
            return _this.setCellInput(cellData, {
              rowIndex: rowIndex,
              cellIndex: cellIndex,
              index: index
            }, container);
        }
      } // 不是指定对象，返回原数据


      return cellData;
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setBorder", function (borderStyle) {
      var border = _this.state.property.border;
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
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "setRow", function (bodyData, container) {
      var _this$state3 = _this.state,
          property = _this$state3.property,
          transitionName = _this$state3.transitionName,
          rowStyle = _this$state3.rowStyle;
      var transition = property.body.row.transition; // 处理行动画的样式

      var transitionClassName = transition ? " ".concat(transitionName) : '';
      return bodyData.map(function (rowData, rowIndex) {
        var customClassName = rowData.className ? " ".concat(rowData.className) : '';
        var LIElementProps = {
          className: "list-row".concat(customClassName).concat(transitionClassName),
          style: rowStyle[rowIndex],
          onMouseEnter: _this.rowHover,
          onMouseLeave: _this.rowHover
        }; // 检测行数据是一个对象还是一个数组
        // 如果是对象，则需要对行数据做一些处理，比如添加自定义事件等（目前只支持添加事件）

        if (external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isPlainObject(rowData) && rowData.type === 'row') {
          LIElementProps[rowData.event] = handleEvent.bind(assertThisInitialized_default()(_this), [rowData]);
          LIElementProps.value = rowData.value;
        } else {
          LIElementProps = list_objectSpread({}, LIElementProps, {
            type: 'row'
          });
        }

        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("li", extends_default()({
          key: "list-row-".concat(container, "-").concat(rowData.key ? rowData.key : rowIndex)
        }, LIElementProps), external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isArray(rowData) ? _this.setCell(rowData, rowIndex, container) : _this.setCell(rowData.cells, rowIndex, container));
      });
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "loadHeader", function (data) {
      var _this$state4 = _this.state,
          property = _this$state4.property,
          colWidth = _this$state4.colWidth,
          headerWidth = _this$state4.headerWidth;
      var enable = property.scroll.enable,
          _property$header = property.header,
          style = _property$header.style,
          cellStyle = _property$header.cellStyle,
          showHeader = _property$header.show;
      var minWidth = property.body.cell.style.minWidth; // 处理border属性值

      var listBorder = _this.setBorder(cellStyle);

      if (showHeader && data && data.length) {
        return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("ul", {
          className: "list-header list-cont",
          style: !enable && headerWidth ? {
            width: headerWidth
          } : null
        }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("li", {
          key: "list-row",
          className: "list-row",
          style: style
        }, data.map(function (cell, index) {
          return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
            className: "list-cell",
            title: external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isObject(cell) ? cell.text : cell,
            key: "list-header-".concat(index),
            style: list_objectSpread({}, cellStyle, {
              width: typeof colWidth === 'string' ? colWidth : colWidth[index] || 'auto',
              minWidth: minWidth
            }, listBorder)
          }, _this.parsing(cell, {
            rowIndex: 0,
            cellIndex: 0
          }));
        })));
      }

      return null;
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "loadBody", function (bodyData) {
      var _this$state5 = _this.state,
          scrollHeight = _this$state5.scrollHeight,
          _this$state5$property = _this$state5.property,
          _this$state5$property2 = _this$state5$property.body,
          style = _this$state5$property2.style,
          spacing = _this$state5$property2.row.spacing,
          enable = _this$state5$property.scroll.enable; // 处理css属性‘border-collapse’与‘border-spacing’的值

      var listContStyle = getListContStyle(spacing);
      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
        className: "list-body",
        ref: function ref(ele) {
          return _this.scroll = ele;
        },
        style: list_objectSpread({}, style, {
          height: scrollHeight,
          overflowY: enable ? 'hidden' : 'auto'
        })
      }, external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("ul", {
        className: "list-cont",
        style: listContStyle,
        ref: function ref(ele) {
          return _this.listContMain = ele;
        }
      }, _this.setRow(bodyData, 'main')), external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("ul", {
        className: "list-cont",
        style: listContStyle,
        ref: function ref(ele) {
          return _this.listContSupport = ele;
        }
      }, _this.setRow(bodyData, 'support')));
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "render", function () {
      var _this$state6 = _this.state,
          _this$state6$property = _this$state6.property,
          showHeader = _this$state6$property.header.show,
          spacing = _this$state6$property.body.row.spacing,
          conStyle = _this$state6$property.style,
          data = _this$state6.data,
          className = _this$state6.className; // 处理border属性值

      var listBorder = _this.setBorder(conStyle); // 当存在表头数据且表头是开启时处理数据


      var headerData;
      var bodyData;
      _this.renderData = fillRow(data, _this.state);

      if (showHeader && data.length) {
        var _this$renderData = toArray_default()(_this.renderData);

        headerData = _this$renderData[0];
        bodyData = _this$renderData.slice(1);
      } else {
        bodyData = _this.renderData;
      }

      var listClass = !Number.isNaN(parseInt(spacing)) && parseInt(spacing) > 0 ? '' : 'list-no-spacing';
      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement("div", {
        style: list_objectSpread({}, listBorder, {}, conStyle),
        className: "list".concat(listClass ? " ".concat(listClass) : '').concat(className ? " ".concat(className) : ''),
        onMouseMove: _this.scrollList.bind(assertThisInitialized_default()(_this), false),
        onMouseLeave: _this.scrollList.bind(assertThisInitialized_default()(_this), true)
      }, _this.loadHeader(headerData), _this.loadBody(bodyData));
    });

    _this.state = {
      // 每列单元格的宽度数组
      colWidth: [],
      // body可见区域的高度
      scrollHeight: getScrollHeight(props),
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
      // 行样式
      rowStyle: [],
      // 配置属性
      property: config.property,
      // 渲染数据
      data: config.data,
      // 列表的自定义样式表名
      className: config.className
    }; // 当一次滚动多行时可用，组件可视区域第一行的索引

    _this.rowIndex = 0;
    return _this;
  }

  createClass_default()(_default, [{
    key: "componentDidMount",

    /**   * 组件挂载后执行组件的滚动操作和设置表头单元格和主体单元格宽度对应   */
    value: function componentDidMount() {
      var _this2 = this;

      var scroll = this.scroll,
          props = this.props,
          listContMain = this.listContMain;
      var colWidth = getColClientWidth(listContMain); // 如果列数为0，则停止后续操作

      if (colWidth.length) {
        // 组件第一次render之后，DOM结构已经生成，此时开始设置每个单元格宽度以及组件滚动区域高度
        // width设置规则以props里面的width字段为准，详情见width字段说明
        var scrollHeight = getScrollHeight(props, closest(scroll, '.list'));
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
    /**   * 组件每次更新后执行   * @param {object} preProps prev props   * @param {object} preState prev state   */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps, preState) {
      var _this3 = this;

      var listContMain = this.listContMain,
          props = this.props,
          scroll = this.scroll;
      var colWidth = getColClientWidth(listContMain);

      if (colWidth.length) {
        var _props$property$body$ = props.property.body.cell.style,
            colCellWidth = _props$property$body$.width,
            cellMinWidth = _props$property$body$.minWidth;
        var _preProps$property$bo = preProps.property.body.cell.style,
            preColCellWidth = _preProps$property$bo.width,
            preCellMinWidth = _preProps$property$bo.minWidth;
        var _this$state7 = this.state,
            _this$state7$property = _this$state7.property,
            _this$state7$property2 = _this$state7$property.style,
            conWidth = _this$state7$property2.width,
            height = _this$state7$property2.height,
            enable = _this$state7$property.scroll.enable,
            show = _this$state7$property.header.show,
            body = _this$state7$property.body,
            transitionName = _this$state7.transitionName,
            indeterminate = _this$state7.indeterminate;
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
            rowCheckboxShow = row.rowCheckbox.show; // 当滚动条显示时，重新计算header的宽度，和列表主体对齐

        if (show && !enable && !external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqual(this.state, preState)) {
          this.setState({
            headerWidth: this.listContMain.clientWidth
          });
        } // 适应单元格宽度，用于组件自身状态或从父级传递的props发生变化时


        if (preConWidth !== conWidth || iconWidth !== preIconWidth || colCellWidth !== preColCellWidth || cellMinWidth !== preCellMinWidth) {
          // 避免css动画未执行完时获取的列宽不正确，400为css动画的持续时间，见index.scss文件
          setTimeout(function () {
            /**           * 组件更新之后，DOM结构已更新，此时重新设置每个单元格宽度           * 设置规则以props里面的width字段为准           * 详情见width字段说明           */
            _this3.setState({
              colWidth: colWidth
            });
          }, colCellWidth === 'avg' ? 400 : 0);
        } // 适应滚动区域高度


        if (parseInt(preHeight) !== parseInt(height) || preShow !== show) {
          this.setState(function (prevState) {
            return {
              scrollHeight: getScrollHeight(prevState, closest(scroll, '.list'))
            };
          });
        } // 缓动动画


        if (transition) {
          if (!transitionName) {
            this.setState({
              transitionName: getTransitionName(transition, true)
            });
          } else if (transitionName === 'list-row-start') {
            this.setState({
              transitionName: getTransitionName(transition, false)
            });
          }
        } // 设置列表头行选择框的indeterminate
        // 如果开启了行选择功能且显示表头，根据每行的选择情况设置标题栏多选框的indeterminate状态


        if (show && rowCheckboxShow) {
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
    /**   * 列表滚动处理   * @param {boolean?} isInnerScroll 内部滚动变量（用于事件控制）   * @param {object?} e 事件回调参数   */

  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var property = state.property,
          stateData = state.data,
          className = state.className,
          restState = objectWithoutProperties_default()(state, ["property", "data", "className"]);

      var propsProperty = props.property,
          propsData = props.data,
          propsClassName = props.className;
      var isDataChanged = !external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqual(propsData, stateData); // 检测本次渲染的数据是否有变化

      if (!external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqual(propsProperty, property) || !external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.isEqual(propsClassName, className) || isDataChanged) {
        var propsHeight = props.property.style.height;
        var stateHeight = property.style.height;
        var propsCellWidth = props.property.body.cell.style.width;
        var stateCellWidth = property.body.cell.style.width;
        var row = props.property.body.row;
        var transitionName = property.body.row.transition ? getTransitionName(row.transition, isDataChanged) : state.transitionName;
        return list_objectSpread({}, restState, {}, props, {
          transitionName: transitionName,
          rowStyle: getRowStyle(props),
          colWidth: propsCellWidth !== stateCellWidth ? handleColWidth(props, propsData) : state.colWidth,
          scrollHeight: propsHeight !== stateHeight ? getScrollHeight(props) : state.scrollHeight
        });
      } // 如果props未更新属性，则返回state。此state已包含setState更新的值。


      return state;
    }
  }]);

  return _default;
}(external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.Component);


// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return src_default_0; });














var listConfigProps = config.property,
    rest = objectWithoutProperties_default()(config, ["property"]);

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

      var newProperty = external_commonjs_lodash_commonjs2_lodash_amd_lodash_root_default.a.defaultsDeep({}, waring(property), listConfigProps);

      return external_commonjs_react_commonjs2_react_amd_react_root_React_default.a.createElement(list_default, extends_default()({
        property: newProperty
      }, option));
    }
  }]);

  return _default;
}(external_commonjs_react_commonjs2_react_amd_react_root_React_["Component"]);

defineProperty_default()(src_default_0, "defaultProps", rest);



/***/ })
/******/ ])["default"];
});