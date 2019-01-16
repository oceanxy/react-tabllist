(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["react-tabllist"] = factory();
	else
		root["react-tabllist"] = factory();
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(0);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _config = __webpack_require__(8);

var _config2 = _interopRequireDefault(_config);

var _list = __webpack_require__(9);

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 组件入口
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2018-12-18 10:00:07
 */

var _class = function (_Component) {
  (0, _inherits3.default)(_class, _Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          property = _props.property,
          data = _props.data;

      var newProperty = _lodash2.default.defaultsDeep({}, property, _config2.default.property);

      return _react2.default.createElement(_list2.default, { property: newProperty, data: data });
    }
  }]);
  return _class;
}(_react.Component);

_class.defaultProps = _config2.default;
exports.default = _class;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 配置文件
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-01-15 11:50:26
 */

exports.default = {
  data: [['1st column', '2nd column', '3rd column'], ['1st cell', '2nd cell', '3rd cell']],
  property: {
    style: {
      width: '94%',
      margin: '0 auto',
      height: 200
    },
    list: {
      border: {
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: '#f4f4f4'
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
          spacing: 10,
          rowCheckBox: false,
          style: {
            height: 30
          },
          specialStyle: [],
          visual: {
            show: false,
            interval: 1,
            style: {
              backgroundColor: '#E8F4FC',
              backgroundImage: ''
            }
          },
          silent: {
            show: false,
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
      },
      speed: 50,
      isScroll: true
    }
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = __webpack_require__(10);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _keys = __webpack_require__(11);

var _keys2 = _interopRequireDefault(_keys);

var _toArray2 = __webpack_require__(12);

var _toArray3 = _interopRequireDefault(_toArray2);

var _isNan = __webpack_require__(13);

var _isNan2 = _interopRequireDefault(_isNan);

var _extends2 = __webpack_require__(14);

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = __webpack_require__(15);

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = __webpack_require__(16);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(0);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(17);

var _util = __webpack_require__(22);

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: react-tabllist
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-01-02 14:52:40
 */

var List = function (_Component) {
  (0, _inherits3.default)(List, _Component);

  function List(props) {
    (0, _classCallCheck3.default)(this, List);

    var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      // 每列单元格的宽度数组
      colWidth: util.setColWidth(props.property.list.body.cell.style.width),
      // body可见区域的高度
      scrollHeight: util.setScrollHeight(props),
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

  (0, _createClass3.default)(List, [{
    key: 'componentDidMount',


    /**
     * 组件挂载后执行组件的滚动操作和设置表头单元格和主体单元格宽度对应
     */
    value: function componentDidMount() {
      var colWidth = this.getColClientWidth();

      // 如果列数为0，则停止后续操作
      if (colWidth.length) {
        /**
         * 组件第一次render之后，DOM结构已经生成，此时开始设置每个单元格宽度
         * 设置规则以props里面的width字段为准
         * 详情见width字段说明
         */
        /* eslint-disable react/no-did-mount-set-state  */
        this.setState({ colWidth: colWidth });

        // 列表滚动相关逻辑入口
        this.scrollList();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // 避免闪动
      return !_lodash2.default.isEqual(this.props, nextProps) || !_lodash2.default.isEqualWith(this.state, nextState);
    }

    /**
     * 组件每次更新后执行
     * @param {object} preProps prev props
     * @param {object} preState prev state
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.marqueeInterval);
    }

    /**
     * 列表滚动逻辑
     * @param {boolean?} isInnerScroll 内部滚动变量（用于事件控制）
     * @param {object?} e 事件回调参数
     */


    /**
     * 鼠标事件
     * 目前只实现了hover效果
     * @param {object} e event
     */


    /**
     * 复选框和单选按钮事件
     * @param {object} target 点击的input对象
     */


    /**
     * 获取DOM内每一列单元格的实际宽度
     * @returns {Array} 列表每列的宽度值，数组长度代表列数
     */


    /**
     * 列表滚动实现
     */

  }, {
    key: 'fillRow',


    /**
     * 补齐单元格
     * 如果props数据不规范，则自动补齐单元格到缺少的行，直到每一行的单元格数量相等为止
     * @param {object} data 新数据
     * @returns {Array} 补齐后的用于生成单元格的数据
     */
    value: function fillRow(data) {
      var cellsOfRow = [];
      var _state$property$list$ = this.state.property.list.body.row,
          rowCheckBox = _state$property$list$.rowCheckBox,
          serialNumber = _state$property$list$.serialNumber;

      // 获取每一行的数据量，存入数组 cellsOfRow 内

      _lodash2.default.range(data.length).map(function (i) {
        cellsOfRow.push(data[i].length);
      });

      // 获取数据量最多的一行的数值
      var maxCellValue = Math.max.apply(Math, cellsOfRow);
      var newData = [];

      // 补齐空数据到缺失的行
      data.forEach(function (row, ind) {
        newData[ind] = [].concat((0, _toConsumableArray3.default)(data[ind]), (0, _toConsumableArray3.default)(new Array(maxCellValue - data[ind].length).fill('')));

        // 检测是否开启行选择功能
        if (rowCheckBox) {
          newData[ind].unshift({
            type: 'checkbox',
            text: '',
            uid: 'ck' + ind,
            name: 'rowCheckBox'
          });
        }

        // 检测是否开启行序号功能
        if (serialNumber.show) {
          newData[ind].unshift(serialNumber.formatter);
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
    key: 'setCellIcon',
    value: function setCellIcon(icon) {
      if (icon) {
        var iconStyle = this.state.property.list.body.cell.iconStyle;


        if (icon.src && typeof icon.src === 'string' && (icon.src.indexOf('http://') !== -1 || icon.src.indexOf('https://') !== -1 || icon.src.indexOf('data:image/') !== -1)) {
          return [_react2.default.createElement('img', { src: icon.src, alt: icon.alt || '', style: iconStyle, key: Math.random() }), _react2.default.createElement(
            'span',
            { key: Math.random() },
            icon.text || ''
          )];
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
    key: 'setCellInput',


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
        console.error('当input为radio时，setCellInput()的第三个参数“container”为必需参数，否则radio功能将失效！');
        return null;
      }

      if (cr) {
        if (cr.type === 'radio' || cr.type === 'checkbox') {
          return _react2.default.createElement(
            'label',
            { key: Math.random() },
            _react2.default.createElement('input', {
              type: cr.type,
              'data-id': cr.uid,
              'data-index': rowIndex,
              name: cr.type === 'radio' ? cr.name + '-' + container : cr.name,
              defaultChecked: selectedCur[rowIndex],
              onInput: this.checkCR
            }),
            cr.text ? _react2.default.createElement(
              'span',
              null,
              cr.text
            ) : null
          );
        }

        // button 等会执行以下代码
        return _react2.default.createElement('input', {
          type: cr.type,
          'data-id': cr.uid,
          'data-index': rowIndex,
          value: cr.value,
          onClick: cr.callback.bind(this, cr)
        });
      }

      return null;
    }

    /**
     * 解析数据里面的对象
     * @param {object} cellData 需要解析的单元格数据
     * @param {number} rowIndex 需要解析的单元格数据所在行的索引
     * @param {string?} container 当前渲染单元格所在的容器
     * @returns {*} 单元格数据或DOM
     */

  }, {
    key: 'parsing',
    value: function parsing(cellData, rowIndex, container) {
      var _this2 = this;

      if (Array.isArray(cellData)) {
        return cellData.map(function (o, i) {
          return _this2.parsing(o, i, container);
        });
      }

      if ((typeof cellData === 'undefined' ? 'undefined' : (0, _typeof3.default)(cellData)) === 'object') {
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
      }

      return cellData;
    }

    /**
     * 设置边框
     * 检测空值则使用全局配置，而不是设置为无边框
     * @param {object} borderStyle 含有边框属性的对象
     * @returns {object} 返回包含border及其相关属性的对象
     */

  }, {
    key: 'setBorder',
    value: function setBorder(borderStyle) {
      var border = this.state.property.list.border;

      var newBorder = {};

      // borderStyle对象的border属性为空字符串
      if (borderStyle && borderStyle.border === '') {
        return border;
      }

      // borderStyle对象的border属性为空值以外的其他假值
      if (!borderStyle.border) {
        newBorder.borderWidth = borderStyle.borderWidth || border.borderWidth;
        newBorder.borderColor = borderStyle.borderColor || border.borderColor;
        newBorder.borderStyle = borderStyle.borderStyle || border.borderStyle;

        return newBorder;
      }

      return { border: borderStyle.border };
    }

    /**
     * 加载列表头
     * @param {array} data 列表头数据
     * @returns {*} 列表头DOM
     */

  }, {
    key: 'loadHeader',
    value: function loadHeader(data) {
      var _this3 = this;

      var _state = this.state,
          property = _state.property,
          colWidth = _state.colWidth;
      var _property$list$header = property.list.header,
          style = _property$list$header.style,
          cellStyle = _property$list$header.cellStyle;
      var _property$list$body = property.list.body,
          minWidth = _property$list$body.cell.style.minWidth,
          show = _property$list$body.row.serialNumber.show;

      // 处理border属性值

      var listBorder = this.setBorder(cellStyle);

      if (data && data.length) {
        return _react2.default.createElement(
          'li',
          { key: 'list-row', className: 'list-row', style: style },
          data.map(function (cell, index) {
            return _react2.default.createElement(
              'div',
              {
                className: 'list-cell',
                key: index,
                style: (0, _extends3.default)({}, cellStyle, {
                  width: typeof colWidth === 'string' ? colWidth : colWidth[index] || 'auto',
                  minWidth: minWidth
                }, listBorder)
              },
              show && !index ? '序号' : _this3.parsing(cell, 0)
            );
          })
        );
      }

      return null;
    }

    /**
     * 加载列表主体
     * @param {array} bodyData 列表主体数据
     * @param {string} container 当前所在容器的名称
     * @returns {*} 列表主体DOM
     */

  }, {
    key: 'loadBody',
    value: function loadBody(bodyData, container) {
      var _this4 = this;

      var _state2 = this.state,
          colWidth = _state2.colWidth,
          property = _state2.property,
          transitionName = _state2.transitionName;
      var body = property.list.body;
      var _body$row = body.row,
          transition = _body$row.transition,
          rowStyle = _body$row.style,
          specialRowStyle = _body$row.specialStyle,
          _body$row$visual = _body$row.visual,
          rowVisualShow = _body$row$visual.show,
          rowVisualInterval = _body$row$visual.interval,
          _body$row$serialNumbe = _body$row.serialNumber,
          serialNumberShow = _body$row$serialNumbe.show,
          serialNumberStyle = _body$row$serialNumbe.style,
          specialStyle = _body$row$serialNumbe.specialStyle,
          cellOfColumnStyle = body.cellOfColumn.style,
          style = body.cell.style;

      // 处理border属性值

      var listBorder = this.setBorder(style);

      // 处理间隔行样式
      var isVisual = false;
      var rowVisualStyle = body.row.visual.style;

      if (rowVisualShow && rowVisualInterval && !(0, _isNan2.default)(rowVisualInterval)) {
        isVisual = true;
        rowVisualStyle = (0, _extends3.default)({}, rowStyle, rowVisualStyle);
      }

      return bodyData.map(function (rowData, rowIndex) {
        return _react2.default.createElement(
          'li',
          {
            className: 'list-row ' + (transition ? transitionName : ''),
            key: rowIndex,
            style: isVisual && rowIndex % (rowVisualInterval * 2) >= rowVisualInterval ? (0, _extends3.default)({}, rowVisualStyle, specialRowStyle[rowIndex]) : (0, _extends3.default)({}, rowStyle, specialRowStyle[rowIndex]),
            onMouseEnter: _this4.hover,
            onMouseLeave: _this4.hover
          },
          rowData.map(function (cellData, index) {
            return _react2.default.createElement(
              'div',
              {
                className: 'list-cell',
                style: serialNumberShow && !index
                // 如果开启行序号，且为每行第一个单元格
                ? (0, _extends3.default)({}, style, {
                  width: typeof colWidth === 'string' ? colWidth : colWidth[index] || 'auto'
                }, serialNumberStyle, specialStyle[rowIndex], cellOfColumnStyle[index], listBorder)
                // 未开启行序号或不为行内第一个单元格
                : (0, _extends3.default)({}, style, {
                  width: typeof colWidth === 'string' ? colWidth : colWidth[index] || 'auto'
                }, specialStyle[rowIndex], cellOfColumnStyle[index], listBorder),
                key: '' + rowIndex + index
              },
              serialNumberShow && index === 0 ? typeof cellData === 'string' ? cellData : cellData.text.replace('{index}', rowIndex + 1) : _this4.parsing(cellData, rowIndex + 1, container)
            );
          })
        );
      });
    }

    /**
     * 渲染 DOM 结构
     * @returns {*} 组件DOM
     */

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state3 = this.state,
          scrollHeight = _state3.scrollHeight,
          headerWidth = _state3.headerWidth,
          _state3$property = _state3.property,
          conStyle = _state3$property.style,
          _state3$property$list = _state3$property.list,
          header = _state3$property$list.header,
          body = _state3$property$list.body,
          isScroll = _state3$property$list.isScroll,
          data = _state3.data;
      var showHeader = header.show,
          headerStyle = header.style;

      // 处理行间距的值

      var spacing = body.row.spacing;

      var borderSpacing = ('' + spacing).indexOf('px') === -1 ? '0 ' + spacing + 'px' : '0 ' + spacing;

      // 处理border属性值
      var listBorder = this.setBorder(conStyle);

      // 当存在表头数据且表头是开启时处理数据
      var headerData = void 0;
      var bodyData = void 0;
      if (showHeader && data.length) {
        var _data = (0, _toArray3.default)(data);

        headerData = _data[0];
        bodyData = _data.slice(1);
      } else {
        bodyData = data;
      }

      var listClass = !(0, _isNan2.default)(parseInt(spacing)) && parseInt(spacing) > 0 ? '' : 'list-no-spacing';

      return _react2.default.createElement(
        'div',
        {
          style: (0, _extends3.default)({}, listBorder, conStyle),
          className: 'list ' + listClass,
          onMouseMove: this.scrollList.bind(this, false),
          onMouseLeave: this.scrollList.bind(this, true)
        },
        showHeader ? _react2.default.createElement(
          'ul',
          {
            className: 'list-header list-cont',
            style: !isScroll && headerWidth ? (0, _extends3.default)({}, headerStyle, { width: headerWidth }) : headerStyle
          },
          this.loadHeader(headerData)
        ) : null,
        _react2.default.createElement(
          'div',
          {
            className: 'list-body',
            ref: function ref(ele) {
              return _this5.scroll = ele;
            },
            style: {
              height: scrollHeight,
              overflow: isScroll ? 'hidden' : 'auto'
            }
          },
          _react2.default.createElement(
            'ul',
            {
              className: 'list-cont',
              style: { borderSpacing: borderSpacing },
              ref: function ref(ele) {
                return _this5.list1 = ele;
              }
            },
            this.loadBody(bodyData, 'main')
          ),
          _react2.default.createElement(
            'ul',
            {
              className: 'list-cont',
              style: { borderSpacing: borderSpacing },
              ref: function ref(ele) {
                return _this5.list2 = ele;
              }
            },
            this.loadBody(bodyData, 'support')
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      // 以下值由props控制
      var data = props.data,
          property = props.property;
      var transition = property.list.body.row.transition;

      var propsUpdate = { data: data, property: property

        // 以下值由list组件本身控制
      };var colWidth = state.colWidth,
          scrollHeight = state.scrollHeight,
          selected = state.selected,
          stateProperty = state.property,
          stateData = state.data,
          headerWidth = state.headerWidth;
      var transitionName = state.transitionName;


      if (transition) {
        if (!_lodash2.default.isEqual(data, stateData)) {
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

      var width = property.list.body.cell.style.width;
      // 由props和state同时控制的colWidth

      if (stateProperty && width !== stateProperty.list.body.cell.style.width) {
        stateUpdate.colWidth = util.setColWidth(width);
      }

      // 检测props是否发生改变
      var propsUpdateArray = (0, _keys2.default)(propsUpdate);
      propsUpdateArray.map(function (prop) {
        if (propsUpdate[prop] === state[prop]) {
          delete propsUpdate[prop];
        } else if (prop === 'property') {
          _lodash2.default.defaultsDeep(propsUpdate[prop], state[prop]);
        }
      });

      // 如果props更新了属性，则返回props和state合并的配置项
      if (propsUpdateArray.length) {
        return (0, _extends3.default)({}, propsUpdate, stateUpdate);
      }

      // 如果props未更新属性，则返回组件自身从setState通道更新的状态值
      return stateUpdate;
    }
  }]);
  return List;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this6 = this;

  this.componentDidUpdate = function (preProps, preState) {
    var colWidth = _this6.getColClientWidth();

    if (colWidth.length) {
      var _props$property$list$ = _this6.props.property.list.body.cell.style,
          colCellWidth = _props$property$list$.width,
          cellMinWidth = _props$property$list$.minWidth;
      var _preProps$property$li = preProps.property.list.body.cell.style,
          preColCellWidth = _preProps$property$li.width,
          preCellMinWidth = _preProps$property$li.minWidth;
      var _state4 = _this6.state,
          _state4$property = _state4.property,
          _state4$property$styl = _state4$property.style,
          conWidth = _state4$property$styl.width,
          height = _state4$property$styl.height,
          _state4$property$list = _state4$property.list,
          show = _state4$property$list.header.show,
          body = _state4$property$list.body,
          isScroll = _state4$property$list.isScroll,
          transitionName = _state4.transitionName;
      var _preState$property = preState.property,
          _preState$property$st = _preState$property.style,
          preConWidth = _preState$property$st.width,
          preHeight = _preState$property$st.height,
          _preState$property$li = _preState$property.list,
          preBody = _preState$property$li.body,
          preShow = _preState$property$li.header.show;
      var iconWidth = body.cell.iconStyle.width;
      var preIconWidth = preBody.cell.iconStyle.width;
      var transition = body.row.transition;

      // 当滚动条显示时，重新计算header的宽度，和列表主体对齐

      if (show && !isScroll) {
        _this6.setState({ headerWidth: _this6.list1.clientWidth });
      }

      // 适应单元格宽度，用于组件自身状态或从父级传递的props发生变化时
      if (preConWidth !== conWidth || iconWidth !== preIconWidth || colCellWidth !== preColCellWidth || cellMinWidth !== preCellMinWidth) {
        // 避免css动画未执行完时获取的列宽不正确，400为css动画的持续时间，见index.scss文件
        setTimeout(function () {
          /**
           * 组件更新之后，DOM结构已更新，此时重新设置每个单元格宽度
           * 设置规则以props里面的width字段为准
           * 详情见width字段说明
           */
          _this6.setState({ colWidth: colWidth });
        }, colCellWidth === 'avg' ? 400 : 0);
      }

      // 适应滚动区域高度
      if (parseInt(preHeight) !== parseInt(height) || preShow !== show) {
        _this6.setState({
          scrollHeight: util.setScrollHeight(_this6.state)
        });
      }

      // 缓动动画
      if (transition && transitionName === 'list-row-start') {
        _this6.setState({ transitionName: 'list-row-start list-row-transition' });
      }

      // 列表滚动相关逻辑入口
      _this6.scrollList();
    }
  };

  this.scrollList = function (isInnerScroll, e) {
    var list1 = _this6.list1,
        list2 = _this6.list2,
        _state5 = _this6.state,
        scrollHeight = _state5.scrollHeight,
        _state5$property$list = _state5.property.list,
        isScroll = _state5$property$list.isScroll,
        speed = _state5$property$list.speed;


    if (list1 && list2) {
      // 删除上一次定时器，后续根据状态来判定是否定义新的定时器
      clearInterval(_this6.marqueeInterval);

      if (isInnerScroll || isInnerScroll === undefined) {
        // 检测滚动条件
        // 根据滚动条件控制列表主体容器的辅助容器的显示状态
        if (isScroll && list1.clientHeight >= parseInt(scrollHeight)) {
          if (isInnerScroll !== undefined && e.type === 'mouseleave') {
            _this6.pause = false;
          }
          if (!_this6.pause) {
            for (var i = 0; i < list2.children.length; i++) {
              list2.children[i].style.display = 'table-row';
            }

            // 设置定时器，实现列表滚动
            _this6.marqueeInterval = setInterval(_this6.marquee, speed);
          }
        } else {
          for (var _i = 0; _i < list2.children.length; _i++) {
            list2.children[_i].style.display = 'none';
          }
        }
      }
    }
  };

  this.hover = function (e) {
    var _state$property$list$2 = _this6.state.property.list.body.row.silent,
        show = _state$property$list$2.show,
        style = _state$property$list$2.style;
    var target = e.target;

    var row = target;

    if (!show) {
      // 检测target是否是列表行元素，否则向上寻找，直到找到行元素为止
      if (!target.classList.contains('list-row')) {
        row = util.closest(target, '.list-row');
      }

      // 遍历style并依次赋值给元素

      (0, _keys2.default)(style).map(function (key) {
        if (e.type === 'mouseenter') {
          if (key.indexOf('old') === -1) {
            style['old' + key] = row.style[key];
            row.style[key] = style[key];
          }
        } else if (e.type === 'mouseleave') {
          if (style['old' + key]) {
            row.style[key] = style['old' + key];
            delete style['old' + key];
          } else {
            row.style[key] = '';
          }
        }
      });
    }
  };

  this.checkCR = function (_ref) {
    var target = _ref.target;
    var _state6 = _this6.state,
        selected = _state6.selected,
        json = _state6.data.json,
        property = _state6.property;
    var showHeader = property.list.header.show;

    var selectedCur = selected;
    var index = target.getAttribute('data-index');
    var targetName = target.name;

    _this6.pause = true;

    // 检测是否点击的标题栏的checkbox 且是否开启显示表头
    if (target.name === 'rowCheckBox' && index === '0' && showHeader) {
      selectedCur[targetName] = new Array(json.length).fill(target.checked);
    } else {
      // 检测是否是radio。radio需要处理一下this.state.selected里与之对应的name属性
      if (target.type === 'radio') {
        targetName = targetName.substring(0, targetName.indexOf('-'));
      }

      // 检测this.state.selected里与之对应的数组是否存在，否则初始化一个空数组
      // 而radio因为是单选按钮，决定了state数组里面有且仅有一个值为true，所以每次都初始化为空数组
      if (!selectedCur[targetName] || target.type === 'radio') {
        selectedCur[targetName] = [];
      }

      // 将处理后的state数组赋值
      selectedCur[targetName][index] = target.checked;

      // 如果触发的是每一行的行选择框且header的状态为开启，则检测是否body里面的每行都选中了
      // 根据此状态来给header里面的复选框加状态（全选/全不选）
      if (targetName === 'rowCheckBox' && showHeader) {
        if (json.length === selectedCur[targetName].length) {
          for (var i = 1, k = selectedCur[targetName].length; i < k; i++) {
            if (!selectedCur[targetName][i]) {
              selectedCur[targetName][0] = false;
              break;
            }
            if (i === json.length - 1) {
              selectedCur[targetName][0] = true;
            }
          }
        } else {
          selectedCur[targetName][0] = false;
        }
      }
    }

    _this6.setState({
      selected: selectedCur
    });
  };

  this.getColClientWidth = function () {
    var list1 = _this6.list1,
        props = _this6.props;
    var borderWidth = props.property.list.border.borderWidth;

    var width = [];

    if (list1 && list1.children.length) {
      for (var i = 0, l = list1.children[0].children; i < l.length; i++) {
        width.push(l[i].clientWidth - parseInt(borderWidth) || 0);
      }
    }

    return width;
  };

  this.marquee = function () {
    var list1 = _this6.list1,
        scroll = _this6.scroll;


    if (list1 && scroll) {
      scroll.scrollTop++;

      // 滚动完一个完整周期后立即重置滚动区域的scrollTop值为0
      if (list1.clientHeight <= scroll.scrollTop) {
        scroll.scrollTop = 0;
      }
    }
  };

  this.setCellLink = function (link) {
    var text = link.text,
        callback = link.callback,
        data = link.data,
        props = (0, _objectWithoutProperties3.default)(link, ['text', 'callback', 'data']);


    delete props.type;

    if (link) {
      if (props.href) {
        return _react2.default.createElement(
          'a',
          props,
          text
        );
      }

      props.href = 'javascript: void(0)';

      if (props.event) {
        props[props.event] = function (event) {
          var list = util.closest(event.target, '.list');
          if (_lodash2.default.isFunction(callback)) {
            callback(data, list, event);
          }
        };

        delete props.event;
      }

      return _react2.default.createElement(
        'a',
        props,
        text
      );
    }

    return null;
  };
};

exports.default = List;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toArray");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/number/is-nan");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(18);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(20)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// Module
exports.push([module.i, ".list .list-cont {\n  margin: 0;\n  padding: 0;\n  display: table;\n  width: 100%;\n  height: auto;\n  transition: all 400ms; }\n  .list .list-cont .list-row {\n    display: table-row;\n    list-style: none;\n    height: 58px;\n    transition: all 300ms cubic-bezier(0, 0, 0.58, 1);\n    background: no-repeat center / 100% 100%; }\n    .list .list-cont .list-row.list-row-start {\n      transform: scale(0.8);\n      opacity: 0; }\n    .list .list-cont .list-row.list-row-transition {\n      opacity: 1;\n      transform: scale(1); }\n    .list .list-cont .list-row input[type=button] {\n      width: 97px;\n      height: 30px;\n      border: none;\n      outline: none;\n      cursor: pointer;\n      transition: all 400ms; }\n    .list .list-cont .list-row .list-cell {\n      display: table-cell;\n      text-align: center;\n      vertical-align: middle;\n      border-left: none !important;\n      box-sizing: border-box;\n      background: no-repeat center / 100% 100%; }\n      .list .list-cont .list-row .list-cell * {\n        vertical-align: middle; }\n      .list .list-cont .list-row .list-cell img {\n        margin: 0 5px; }\n      .list .list-cont .list-row .list-cell:last-child {\n        border-right: none !important; }\n      .list .list-cont .list-row .list-cell a {\n        color: currentColor;\n        text-decoration: none; }\n\n.list .list-header .list-row {\n  background: no-repeat center / 100% 100%; }\n  .list .list-header .list-row .list-cell {\n    border-bottom: none !important; }\n\n.list .list-body {\n  width: 100%; }\n  .list .list-body .list-cont {\n    border-collapse: separate; }\n  .list .list-body .list-cell {\n    color: #666666; }\n\n.list.list-no-spacing .list-cell {\n  border-top: none !important; }\n", ""]);



/***/ }),
/* 19 */
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
/* 20 */
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

var	fixUrls = __webpack_require__(21);

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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closest = closest;
exports.setScrollHeight = setScrollHeight;
exports.setColWidth = setColWidth;
/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: util
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2018-12-18 10:00:07
 */

/**
 * 从el元素向上选取第一个selector选择器匹配的元素
 * @param {Element} el DOM元素
 * @param {string} selector 选择器
 * @return {Element} 按照选择器筛选后的元素
 */
function closest(el, selector) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentNode || el.parentElement;
  }

  return el;
}

/**
 * 设置屏幕滚动区域可见高度
 * @param {object} props props
 * @returns {*} 列表滚动区域可见高度
 */
function setScrollHeight(props) {
  var _props$property = props.property,
      height = _props$property.style.height,
      _props$property$list$ = _props$property.list.header,
      show = _props$property$list$.show,
      style = _props$property$list$.style;

  // 开启表头

  if (show) {
    return parseInt(height) - parseInt(style.height);
  }
  // 隐藏表头
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
  }

  // 处理字符串形式的多列宽度数值
  if (typeof width === 'string') {
    if (width.indexOf(',') >= 0) {
      return width.split(',').map(function (o) {
        if (o.indexOf('px') > -1) {
          return parseFloat(o) + 'px';
        } else if (o.indexOf('%') > -1) {
          return parseFloat(o) + '%';
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

/***/ })
/******/ ])["default"];
});