<h1 align="center">React-tabllist</h1>
<div align="center" style="color: #999999">基于React的列表（表格）组件，支持事件、回调函数和自定义样式。</div>

---

[![GitHub License](https://img.shields.io/github/license/oceanxy/react-tabllist.svg)](https://github.com/oceanxy/react-tabllist/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/react-tabllist.svg)](https://www.npmjs.com/package/react-tabllist)
[![Minified Size](https://img.shields.io/bundlephobia/min/react-tabllist.svg)](https://bundlephobia.com/result?p=react-tabllist)
[![CircleCI Status](https://img.shields.io/circleci/project/github/oceanxy/react-tabllist/master.svg)](https://circleci.com/gh/oceanxy/react-tabllist)
[![Codecov](https://img.shields.io/codecov/c/github/oceanxy/react-tabllist/master.svg)](https://codecov.io/gh/oceanxy/react-tabllist)
[![NPM Download](https://img.shields.io/npm/dw/react-tabllist.svg)](https://www.npmjs.com/package/react-tabllist)
[![Dependency React](https://img.shields.io/npm/dependency-version/react-tabllist/peer/react.svg)]()
[![Last Commit](https://img.shields.io/github/last-commit/oceanxy/react-tabllist.svg)](https://github.com/oceanxy/react-tabllist)

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/oceanxy/react-tabllist.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/oceanxy/react-tabllist/context:javascript)
[![Gitter](https://img.shields.io/gitter/room/oceanxy/react-tabllist.svg)](https://gitter.im/react-tabllist/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link)
[![Dependencies Status](https://david-dm.org/oceanxy/react-tabllist/status.svg)](https://david-dm.org/oceanxy/react-tabllist)
[![DevDependencies Status](https://david-dm.org/oceanxy/react-tabllist/dev-status.svg)](https://david-dm.org/oceanxy/react-tabllist?type=dev)
[![PeerDependencies Status](https://david-dm.org/oceanxy/react-tabllist/peer-status.svg)](https://david-dm.org/oceanxy/react-tabllist?type=peer)

[English](./README.md) | 简体中文

### 安装

```bash
npm install react-tabllist --save
```

### 使用

#### 在浏览器环境下使用

```html
<script src="https://cdn.bootcss.com/react/16.8.6/umd/react.development.js"></script>
<script src="https://cdn.bootcss.com/react-dom/16.8.6/umd/react-dom.development.js"></script>
<script src="https://cdn.bootcss.com/babel-standalone/7.0.0-beta.3/babel.min.js"></script>
<script src='https://cdn.bootcss.com/lodash.js/4.17.11/lodash.core.js'></script>
<script src='./react-tabllist.min.js'></script>

<div id='example'></div>
<script type='text/javascript'>
  var option = {
    data: [],
    property: {}
  }

  ReactDOM.render(
    React.createElement(ReactTabllist, option),
    document.getElementById('example')
  )
</script>
```

#### 在ES6 和 JSX环境下使用

```jsx harmony
import ReactTabllist from 'react-tabllist';

// 使用默认配置
ReactDOM.render(<ReactTabllist />, mountNode);

// 自定义数据及配置项
const props = {
	className: 'demo',
	property: {},
	data: [
       ['1st column', '2nd column', '3rd column'],
       ['1st cell', '2nd cell', '3rd cell']
    ]
}

ReactDOM.render(<ReactTabllist {...props} />, mountNode);
```

### 开发环境

如果你想加入开发来完善这个组件，请fork后按照下面的命令开始：

```bash
$ git clone git@github.com:oceanxy/react-tabllist.git
$ cd react-tabllist
$ npm install
$ npm start
```

在浏览器中打开 http://localhost:3001 ，更多开发细节见[开发文档](./)

### 版本信息

[版本更新日志](./CHANGELOG.md)

### 配置组件

#### props

|**props** type                                  |描述                      |详情                                     |
|------------------------------------------------|--------------------------|----------------------------------------|
|**data** <br> `{[Array, Array, Array,...]}`     |渲染表格需要的数据          |[props.data](#props.data)               |
|**className** <br> `{string}`                   |自定义样式表名称            |''                                      |
|**property** <br> `{Object}`                    |用于包装表格的属性          |[props.property](#props.property)       |

##### props.className

可以通过设置`props.className`属性来自定义样式

##### props.data

###### 数据格式

`data`为一个类似二维数组。

- 数组内每一个子数组代表一行，子数组内每一个元素代表一个单元格。单元格的显示顺序为数组下标顺序，所以在重构数据时应当确定每一个单元格的顺序及显示内容。

```
[
    [cell, cell, cell],   // 单元行
    [
        cell, // 单元格
        cell, 
        cell
    ], 
    [cell, cell, cell], 
    ...
]
```

- 数组内也可用对象表示一行，这个对象拥有两个必需属性：`type='row'`和`cells=[]`，分别表示标识该对象为单元行以及这个单元行内所包含的单元格：

```
[
    {  // 以对象的方式展示行，行内单元格为cells字段
        type: 'row',
        cells: [cell, cell, cell],
        ...
    }, 
    [  // 以数组的形式展示行，每一个元素代表一个单元格
        {type: 'button', ...},   // 在单元格内生成一个按钮
        cell,  // 单元格
        cell
    ], 
    [
        cell, 
        cell, 
        [
            {type: 'radio'}, {type: 'radio'}, ... // 同一个单元格内生成两个或以上单选按钮
        ]  
    ], 
    ...
]
```

###### 对象单元

单元格可解析的数据格式分为四类：

- 字符串
- 数组，数组内可以再次嵌套此四种数据格式
- jsx，如 `<button className='test-button' onclick='()=>{return null}'>click</button>`
- 对象（对象单元格），详细介绍如下：

|单元格类型                          | 描述                                                                |
|-----------------------------------|--------------------------------------------------------------------|
|row                                |生成一个单元行，`单元行对象`只可写在body内，其他地方无效                  |
|img                                |在单元格内生成一个img标签                                              |
|button                             |在单元格内生成一个按钮                                                 |
|link                               |在单元格内生成一个链接（a标签）                                         |
|radio                              |在单元格内生成一个单选按钮                                             |
|checkbox                           |在单元格内生成一个复选框                                               |
|select <sup>^1.4.1</sup>           |在单元格内生成一个下拉框                                               |
|text <sup>^1.5.0</sup>             |在单元格内生成一个普通文本，和直接在单元格内写字符串惟一的区别是可以增加事件  |

代码如下：

```
// row
{
    type: 'row',
    cells: [cell, cell, cell],
    data: 'row.id',
    value: 'row.typeID',
    event: 'onClick',
    callback: (data, cellData, event) => {},
    className: ''，
    key: ''
}

// button
{
    type: 'button',
    value: 'click me',
    className: 'test-btn',
    data: '123',
    event: 'onClick',
    callback: data => alert('hello react-tabllist', data) // hello react-tabllist, 123,
    key: ''
}

// img
{
    type: 'img',
    src: 'http://www.xieyangogo.cn/pic.png',
    alt: '',
    text: 'IMG description',
    className: 'test-img',
    key: '',
    value:''
}

// link (二选一即可)
{
    type: 'link',
    text: 'I am a link, I use the href attribute',
    className: 'test-link',
    key: ''，
    href: 'https://github.com/oceanxy/react-tabllist',
    value:''
}
{
    type: 'link',
    text: 'I am a link, I use event and callback to implement custom functions',
    className: 'test-link',
    key: ''，
    data:  {},
    event: 'onClick',
    callback: (data, cellData, event) => {},
    value:''
}

// radio
{
    type: 'radio',
    name: 'group2',
    text: 'radio group 2-1',
    className: 'test-radio',
    callback: (data, cellData, event) => {},
    key: '',
    value:''
}

// checkbox
{
    type: 'checkbox',
    name: 'checkbox1',
    text: 'checkbox',
    className: 'test-checkbox',
    callback: (data, cellData, event) => {},
    key: '',
    value:''
}

// select
{
    type: 'select',
    text: '请选择：',
    value: '',
    data: '',
    className: '',
    callback: (data, cellData, event) => {},
    option: [
        {
            id: '1',
            label: 'item 1',
            value: 1
        }
    ],
}

// text
{
    type: 'text',
    text: '我是一个普通文本',
    callback: (data, cellData, event) => {},
}
```

###### 对象单元的属性

|**键** `{类型}`                                   |描述                                                                                                                     |use                                                                                               |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
|**type** <br> `{string}`                         |要在单元格内生成的节点类型                                                                                                  | `row` `button` `link` `img` `radio` `checkbox` `select` `text`                                   |
|~~**uid**~~ <br> `{string}` **1.2.2版本之前可用**  |`已废弃` 单元格的唯一标识，可用来保存id等。该字段功能与key相似，也可以使用data字段结合回调函数来代替，故决定在1.2.2版本废弃该字段。    | ~~`row`~~ `button` `link` `img` `radio` `checkbox` ~~`select`~~ ~~`text`~~                       |
|**name** <br>`{string}`                          |radio和checkbox必须设置的属性，同HTML同类标签的name属性                                                                      | ~~`row`~~ ~~`button`~~ ~~`link`~~ ~~`img`~~ `radio` `checkbox` ~~`select`~~ `text`                |
|**text** <br> `{string}`                         |渲染后的HTML标签的文本                                                                                                     | ~~`row`~~ ~~`button`~~ `link` `img` `radio` `checkbox` `select` `text`                            |
|**value** <br> `{number\|string}`                |生成的HTML标签的`value`属性，`1.4.1版本开始所有对象单元都可使用`                                                               | 1.4.1版本之前： ~~`row`~~ `button` ~~`link`~~ ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~ <br /> 1.4.1版本开始： `row` `button` `link` `img` `radio` `checkbox` `select` `text`  |
|**src** <br> `{string}`                          |图片链接，如：'http(s)://xxx' 或 'data:image/xxx'                                                                          | ~~`row`~~ ~~`button`~~ ~~`link`~~ `img` ~~`radio`~~ ~~`checkbox`~~ ~~`select`~~ ~~`text`~~        |
|**alt** <br> `{string}`                          |图片的alt属性                                                                                                             | ~~`row`~~ ~~`button`~~ ~~`link`~~ `img` ~~`radio`~~ ~~`checkbox`~~ ~~`select`~~ ~~`text`~~        |
|**href** <br> `{string}`                         |link类型的超链接地址（同HTML a标签的href），也可不传此属性而使用event和callback的组合自定义事件回调                               | ~~`row`~~ ~~`button`~~ `link` ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~ ~~`select`~~ ~~`text`~~        |
|**className** <br> `{string}`                    |自定义样式表名称                                                                                                           | `row` `button` `link` `img` `radio` `checkbox` `select` `text`                                    |
|**event** <br> `{string}`                        |触发事件的方式，需和[回调函数](#callback)配合使用                                                                             | `row` `button` `link` ~~`img`~~ `radio` `checkbox` `select` `text`                                |
|**callback** <br> `{function}`                   |触发事件后的回调函数，详细见[回调函数](#callback)介绍                                                                         | `row` `button` `link` ~~`img`~~ `radio` `checkbox` `select` `text`                                |
|**option** <br> `{object[]}`                     |`select`类型专属属性, 详情见[option](#Option)介绍                                                                           | ~~`row`~~ ~~`button`~~ ~~`link`~~ ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~ `select` ~~`text`~~        |
|**cells** <br> `{object[]}`                      |`row`类型专属属性, 详情见[data](#props.data)介绍                                                                            | `row` ~~`button`~~ ~~`link`~~ ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~ ~~`select`~~ ~~`text`~~        |
|**data** <br>`{*}`                               |自定义属性，理论上可以传任何值。这个值在组件内部并不会使用，您可以在[回调函数](#callback)的第一个参数得到这个值                       | `row` `button` `link` `img` `radio` `checkbox` `select` `text`                                     |
|react的key属性                                    |-                                                                                                                        | -                                                                                                  |
|**key** <br> `{string}`                          |jsx循环或数组需要用到的key属性，`请确保key的唯一性`                                                                           | `row` `button` `link` `img` `radio` `checkbox` `select` `text`                                     |

###### callback 回调函数

|callback(data, objectUnit, event) |自定义事件的回调函数，可以配合`event`使用。若event未定义，则默认单击事件触发后回调此函数  |
|----------------------------------|---------------------------------------------------------------------------------|
|data                              |`对象单元格`属性中自定义的data属性，一般用来保存该单元格独一无二的信息。这是一个预留的属性 |
|objectUnit                        |用于渲染该单元格的对象，即data里面定义的[对象单元](#对象单元)对象                                 |
|event                             |触发单元格绑定的事件后返回的event对象                                                |

###### Option

`{type='select'}`对象单元特有属性。

|**key** `{type}`       |description    |
|-----------------------|---------------|
|**id**                 |option的id     |
|**label**              |option的文本    |
|**value**              |option的值      |

##### props.property

###### 属性

|**属性** `{类型}`                                                               |默认值      |描述                                                                                                                                       |
|-------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------|
|**border** <br> `{cssProperties border}`                                       |{...}      |全局`边框`样式配置，包括组件容器层及内部的`单元格`（如果单元格未设置边框样式，则默认使用此配置)                                                       |
|**style** <br> `{cssProperties}`                                               |{...}      |组件`最外层容器`的样式                                                                                                                       |
|**~~isScroll~~** <br> `{boolean}` &#9888;                                      |true       |是否开启组件滚动(当所有行的高度超过组件可视区域高度时生效) &#9888; 此属性在1.4.0版本被弃用，请使用`scroll.enable`代替                                |
|**~~speed~~** <br> `{number}` &#9888;                                          |50         |组件滚动速度 &#9888; 此属性在1.4.0版本被弃用，请使用`scroll.speed`代替                                                                          |
|**scroll <sup>^1.4.0</sup>** <br> `{object}`                                   |{...}      |组件`滚动功能`相关的设置项，`speed`毫秒滚动`distance`的距离                                                                                     |
|**scroll.enable <sup>^1.4.0</sup>** <br> `{boolean}`                           |true       |是否开启组件滚动(当所有行的高度超过组件可视区域高度时生效)                                                                                        |
|**scroll.speed <sup>^1.4.0</sup>** <br> `{number}`                             |50         |组件滚动一次的时间间隔，单位为`毫秒`。提示：设置较小的时间间隔即可实现连续滚动动画效果。如果与`scroll.distance`结合使用，则可以实现间隔滚动效果，并且可以一次滚动N行。  |
|**scroll.distance <sup>^1.4.0</sup>** <br> `{number\|any}`                     |1          |组件每次滚动的距离。如果值为正整数，单位为`像素`；为`0`，表示停用滚动，同`scroll.enable:false`；如果为负整数，则以行为单位进行滚动，行数等于该值的绝对值。如果为非数字，则取`0`；如果为正小数，则向上取整。如果为负小数，则向下取整。 |
|**header** <br> `{object}`                                                     |{...}      |header相关设置                                                                                                                              |
|**header.show** <br> `{boolean}`                                               |true       |是否显示header。为true时，`props.data`的第一个数据集为列表头数据                                                                                |
|**header.style** <br> `{cssProperties}`                                        |{...}      |header内`行样式`                                                                                                                            |
|**header.cellStyle** <br> `{cssProperties}`                                    |{...}      |header内`单元格的样式` &#9888; 此样式表里面的`width`将失效，因本组件的header单元格宽度自动根据body内单元格宽度进行适配                                |
|**body** <br> `{object}`                                                       |{...}      |body相关配置                                                                                                                                |
|**body.style <sup>^1.5.0</sup>** <br> `{cssProperties}`                        |{...}      |可以定义body的部分样式，这些样式通常不会影响列表的布局。比如，你可以使用"backgroundColor"、“backgroundImage”或"opacity"等，但是不能使用"width"、"height"、"padding"以及"margin"等会使body的尺寸或位置发生变化的属性。 |
|**body.row** <br> `{object}`                                                   |{...}      |body中的行的相关配置                                                                                                                         |
|**~~body.row.onClick~~ <sup>1.2.0</sup>** <br> `()=>{}` &#9888;                |null       |body中行的点击事件。&#9888; `此属性只在1.2.0版本可用`                                                                                           |
|**body.row.transition** <br> `{boolean}`                                       |true       |是否开启行的加载动画                                                                                                                          |
|**body.row.spacing** <br> `{number}`                                           |0          |行间距                                                                                                                                      |
|**~~body.row.rowCheckBox~~** <br> `{boolean}` &#9888;                          |false      |是否开启body内行选择功能 &#9888; 此属性在1.2.2版本被弃用，请使用`body.row.rowCheckbox`代替                                                        |
|**~~body.row.rowCheckbox~~<sup>^1.2.2</sup>** <br> `{boolean}` &#9888;         |false      |是否开启body内行选择功能 &#9888; 此属性的值在1.5.0版本从布尔值更改为一个对象，详情见下一行。                                                          |
|**body.row.rowCheckbox <sup>^1.5.0</sup>** <br> `{object}`                     |{...}      |body内行选择功能相关设置                                                                                                                       |
|**body.row.rowCheckbox.show <sup>^1.5.0</sup>** <br> `{boolean}`               |false      |是否开启body内行选择功能                                                                                                                       |
|**body.row.rowCheckbox.column <sup>^1.5.0</sup>** <br> `{number}`              |1          |将该列插入到列表（表格）的哪一列。注意，此值的优先级小于`row.serialNumber.column`，即如果两者值相同，则此列会排在后面                                   |
|**body.row.rowCheckbox.style <sup>^1.5.0</sup>** <br> `{cssProperties}`        |{...}      |包裹行选择框的标签的样式，非行选择框所在单元格的样式                                                                                               |
|**body.row.rowCheckbox.specialStyle <sup>^1.5.0</sup>** <br> `{cssProperties}` |\[]        |按照数组索引依次设置包裹行选择框的标签的样式，如要跳过某个索引，直接使用一个逗号占位即可                                                               |
|**body.row.style** <br> `{cssProperties}`                                      |{...}      |行的样式，注意行样式优先级顺序：row.style < row.visual.style < row.specialStyle < row.silent.style                                              |
|**body.row.specialStyle** <br> `{[cssProperties, cssProperties, ...]}`         |\[]        |按照数组索引依次设置每一行的样式，如要跳过某个索引，直接使用一个逗号占位即可                                                                          |
|**body.row.visual** <br> `{object}`                                            |{...}      |提升行的视觉：每隔N行设置另外一种行样式                                                                                                          |
|**body.row.visual.show** <br> `{boolean}`                                      |true       |是否开启视觉提升                                                                                                                              |
|**body.row.visual.interval** <br> `{number}`                                   |1          |每隔N行交替一次                                                                                                                               |
|**body.row.visual.style** <br> `{cssProperties}`                               |{...}      |交替行的样式                                                                                                                                  |
|**body.row.silent** <br> `{object}`                                            |{...}      |行与鼠标事件之间的交互相关配置                                                                                                                  |
|**body.row.silent.show** <br> `{boolean}`                                      |false      |行是否不响应鼠标事件，如hover事件等。默认为false，即响应鼠标事件                                                                                   |
|**body.row.silent.style** <br> `{cssProperties}`                               |{...}      |响应鼠标事件时的样式                                                                                                                           |
|**body.row.serialNumber** <br> `{object}`                                      |{...}      |行号相关配置                                                                                                                                  |
|**body.row.serialNumber.show** <br> `{boolean}`                                |false      |是否显示行号                                                                                                                                  |
|**body.row.serialNumber.columnName <sup>^1.5.0</sup>** <br> `{string}`         |'SN'       |该列的列名                                                                                                                                    |
|**body.row.serialNumber.formatter** <br> `{string}`                            |'{index}.' |行号格式化。`{index}`解析为从0依次递增的数字                                                                                                     |
|**body.row.serialNumber.column <sup>^1.5.0</sup>** <br> `{number}`             |1          |将该列插入到列表（表格）的哪一列。注意，此值的优先级大于`row.rowCheckbox.column`，即如果两者值相同，则此列会排在前面                                    |
|**body.row.serialNumber.style** <br> `{cssProperties}`                         |{...}      |包裹行号的标签的样式，非行号所在单元格的样式                                                                                                       |
|**body.row.serialNumber.specialStyle** <br> `{[cssProperties, ...]}`           |\[]        |按照数组索引依次设置包裹行号的标签的样式，如要跳过某个索引，直接使用一个逗号占位即可                                                                    |
|**body.cellOfColumn** <br> `{object}`                                          |{...}      |列样式相关配置                                                                                                                                 |
|**body.cellOfColumn.style** <br> `{[cssProperties, ...]}`                      |\[]        |按照数组索引依次设置每一列内所有单元格的样式，如要跳过某个索引，直接使用一个逗号占位即可                                                                |
|**body.cell** <br> `{object}`                                                  |{...}      |单元格相关配置                                                                                                                                 |
|**body.cell.style** <br> `{cssProperties}`                                     |{...}      |单元格的样式                                                                                                                                   |
|**body.cell.style.width** <br> `{string\|Array\|number}`                       |'auto'     |`width`是style的属性之一，这里需要特别注意：它的用法不同于css的width，详见[cellWidth](#cellWidth)                                                               |
|**~~body.cell.iconStyle~~** <br> `{cssProperties}`                             |{...}      |单元格内的图标样式统一设置，需要配合对象单元格的img类型使用。其实您只需在对象单元格内使用className即可。 &#9888; 这个属性显得很多余，所以它可能在后面某个版本被完全移除。|

###### cellWidth

cellWidth可选值：
- 'auto'：完全根据单元格内的具体数据自动设置单元格宽度；
- 'avg'：每个单元格宽度趋近于相等，但会根据单元格内的具体数据适当调整宽度；
- \[10, 20, 10]：行内每一个单元格依次取数组的值。如果数组某索引的值为占位符（即“,”），则该单元格的宽度将被设置为“auto”；当数组长度小于列数时，其余的列默认设置为“auto”。
- '10,20,10'：根据逗号分隔值，每一列依次取值。详细规则同数组形式。

注意：

1. 无论通过何种方式，如果最终渲染出来的单元格宽度值小于`style.minWidth`，则使用`style.minWidth`值。
2. 注意组件总宽度不能小于每列的宽度总和，否则后面超过宽度部分的列将被隐藏。
3. 当自定义多列的宽度值时，如果每一列都定义了一个具体的值，应保证这些值的总和等于组件的宽度值，否则渲染后列的实际宽度可能不是预期的值。正常情况下，我们应该保证至少一列的宽度为自动适应，即不设置值或使用逗号跳过。
4. 注意单元格样式的优先级顺序。

### 配置样例

组件的默认值以此配置表为准

```json5
{
  className: '',
  data: [
    ['1st column', '2nd column', '3rd column'],
    ['1st cell', '2nd cell', '3rd cell']
  ],
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
        visual: {
          show: false,
          interval: 1,
          style: {
            backgroundColor: '#e8f4fc'
          }
        },
        specialStyle: [],
        silent: {
          show: false, // false代表开启
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
}
```
