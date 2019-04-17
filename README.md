<h1 align="center">React-tabllist</h1>
<div align="center" style="color: #999999">React-based customizable style table or list components that support event and callback functions.</div>

---

[![GitHub License](https://img.shields.io/github/license/oceanxy/react-tabllist.svg)](https://github.com/oceanxy/react-tabllist/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/react-tabllist.svg)](https://www.npmjs.com/package/react-tabllist)
[![Minified Size](https://img.shields.io/bundlephobia/min/react-tabllist.svg)](https://bundlephobia.com/result?p=react-tabllist)
[![CircleCI Status](https://img.shields.io/circleci/project/github/oceanxy/react-tabllist/master.svg)](https://circleci.com/gh/oceanxy/react-tabllist)
[![Codecov](https://img.shields.io/codecov/c/github/oceanxy/react-tabllist/master.svg)](https://codecov.io/gh/oceanxy/react-tabllist)
[![NPM Download](https://img.shields.io/npm/dw/react-tabllist.svg)](https://www.npmjs.com/package/react-tabllist)
[![Dependency React](https://img.shields.io/npm/dependency-version/react-tabllist/peer/react.svg)]()
[![Last Commit](https://img.shields.io/github/last-commit/oceanxy/react-tabllist.svg)](https://github.com/oceanxy/react-tabllist)

[![Code Qualite](https://img.shields.io/lgtm/grade/javascript/g/oceanxy/react-tabllist.svg)](https://lgtm.com/projects/g/oceanxy/react-tabllist/context:javascript)
[![Gitter](https://img.shields.io/gitter/room/oceanxy/react-tabllist.svg)](https://gitter.im/react-tabllist/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link)
[![Dependencies Status](https://david-dm.org/oceanxy/react-tabllist/status.svg)](https://david-dm.org/oceanxy/react-tabllist)
[![DevDependencies Status](https://david-dm.org/oceanxy/react-tabllist/dev-status.svg)](https://david-dm.org/oceanxy/react-tabllist?type=dev)
[![PeerDependencies Status](https://david-dm.org/oceanxy/react-tabllist/peer-status.svg)](https://david-dm.org/oceanxy/react-tabllist?type=peer)

### Install

```bash
npm install react-tabllist --save
```

### Usage

#### Use in browser

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

#### Use in ES6 & jsx

```jsx harmony
import ReactTabllist from 'react-tabllist';

ReactDOM.render(<ReactTabllist />, mountNode);

const data = [
   ['1st column', '2nd column', '3rd column'],
   ['1st cell', '2nd cell', '3rd cell']
]

const property = {}

ReactDOM.render(<ReactTabllist className='demo' data={data} property={property} />, mountNode);
```

### Development

```bash
$ git clone git@github.com:oceanxy/react-tabllist.git
$ cd react-tabllist
$ npm install
$ npm start
```

Open your browser and visit http://localhost:3001 , see more at [Development]().

### [Change Log](./CHANGELOG.md)

### Configuration

#### props

|**props** type                                  |description               |details                           |
|------------------------------------------------|--------------------------|----------------------------------|
|**data** <br> `{[Array, Array, Array,...]}`     |生成表格需要的数据          |[props.data](#data)         |
|**className** <br> `{string}`                   |自定义样式表名称            |''                                |
|**property** <br> `{Object}`                    |属性                       |[props.property](#property) |

#### data

props.data数据格式为一个二维数组，数组内每一个子数组元素代表一行，子数组内每一个元素代表一个单元格。
单元格的显示顺序为数组下标顺序，所以在重构数据时应当确定每一个单元格的显示内容。

单元格可解析的数据格式分为四类：

- 字符串
- 数组，数组内可以再次嵌套此四种数据格式
- jsx，如 `<button className='test-button' onclick='()=>{return null}'>click</button>`
- 对象（对象单元格），详细介绍如下：

**对象单元格**

|type         | description                 |
|-------------|-----------------------------|
|img          |在单元格内生成一个img标签          |
|button       |在单元格内生成一个按钮          |
|link         |在单元格内生成一个连接（a标签）  |
|radio        |在单元格内生成一个单选按钮      |
|checkbox     |在单元格内生成一个复选框        |

代码如下：

```json5
// button
{
  type: 'button',
  uid: '',
  value: 'click me',
  className: 'test-btn',
  callback: () => {
    alert('hello react-tabllist')
  }
}

// img
{
  type: 'img',
  uid: '',
  src: 'http://www.xieyangogo.cn/pic.png',
  alt: '',
  text: 'IMG description',
  className: 'test-img'
}

// link
{
  type: 'link',
  uid: '',
  href: 'https://github.com/oceanxy/react-tabllist',
  text: 'I am a link',
  className: 'test-link',
  event: 'onClick'
}

// radio
{
  type: 'radio',
  uid: '',
  name: 'group2',
  text: 'radio group 2-1',
  className: 'test-radio'
}

// checkbox
{
  type: 'checkbox',
  uid: '',
  name: 'checkbox1',
  text: 'checkbox',
  className: 'test-checkbox'
}
```

**对象单元格属性**

|**key** `{type}`                |description                                              |use                                                      |
|-------------|----------------------------------------------------------------------------|---------------------------------------------------------|
|**type** <br> `{string}`             |要在单元格内生成的节点类型                             | `button` `link` `img` `radio` `checkbox`                |
|**uid** <br> `{string}`              |要在单元格内生成的节点的唯一标识，可用来保存id等         | `button` `link` `img` `radio` `checkbox`                 |
|**name** <br>`{string}`              |radio和checkbox必须设置的属性，同HTML标签的name属性    | ~~`button`~~ ~~`link`~~ ~~`img`~~ `radio` `checkbox`     |
|**text** <br> `{string}`             |文本                                                | ~~`button`~~ `link` `img` `radio` `checkbox`             |
|**value** <br> `{number\|string}`    |值、文本（input类标签需要设置此属性，同HTML标签的value） | `button` ~~`link`~~ ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~ |
|**src** <br> `{string}`              |图片链接，如：'http(s)://xxx' 或 'data:image/xxx'     | ~~`button`~~ ~~`link`~~ `img` ~~`radio`~~ ~~`checkbox`~~ |
|**alt** <br> `{string}`              |图片的alt属性                                        | ~~`button`~~ ~~`link`~~ `img` ~~`radio`~~ ~~`checkbox`~~ |
|**href** <br> `{string}`             |link类型的超链接地址（同HTML a标签的href），也可不传此属性而使用event和callback的组合自定义事件回调          | ~~`button`~~ `link` ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~ |
|**className** <br> `{string}`        |样式表名                                             | `button` `link` `img` `radio` `checkbox`                 |
|**event** <br> `{string}`            |触发事件，需和`callback`配合使用                       | `button` `link` ~~`img`~~ `radio` `checkbox`             |
|**callback** <br> `{function}`       |触发事件后的回调函数，详细见`回调函数`介绍               | `button` `link` ~~`img`~~ `radio` `checkbox`             |
|REACT attributes may be required     |-                                                   | -                                                        |
|**key** <br> `{string}`              |jsx循环或数组需要用到的key属性                         | `button` `link` `img` `radio` `checkbox`                 |

**回调函数**

|callback(data, cellData, event) |自定义事件的回调函数，可以配合`event`使用。若event未定义，则默认单击事件触发后回调此函数 |
|--------------------------------|--------------------------------------------------------------------------------|
|data                            |用于渲染组件的原始数据。需要用户自定义，这是预留的一种方式用来保留原始数据               |
|cellData                        |经过转换后用于渲染该单元格的数据对象                                                 |
|event                           |触发单元格绑定的事件后返回的event对象                                               |

#### property

> 以下表格中的`...property`写法表示相对于上一个属性的同级属性

|**props.property** `{type}`                                    |default    |description                                                                                                                         |
|---------------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------|
|**border** <br> `{object}`                               |{...}      |`边框`样式`全局配置`，包括组件内部的`行`和`单元格`（如果行/单元格未设置边框样式，则默认使用此全局配置)                                                |
|**style** <br> `{object}`                                |{...}      |组件`最外层容器`的样式                                                                                                                       |
|**speed** <br> `{number}`                                |50         |组件滚动速度                                                                                                                                |
|**isScroll** <br> `{boolean}`                            |true       |是否开启组件滚动(当所有行的高度超过组件可视区域高度时生效)                                                                                                           |
|**header** <br> `{object}`                               |{...}      |header设置                                                                                                                                 |
|**header.show** <br> `{boolean}`                         |true       |是否显示header。为true时，`props.data`的第一个数据集为列表头数据                                                                                |
|**header.style** <br> `{object}`                         |{...}      |header内`行样式`                                                                                                                            |
|**header.cellStyle** <br> `{object}`                     |{...}      |header内`单元格的样式`。`注意`：此style里面的width将失效，因本组件的header单元格宽度自动根据body内单元格宽度进行适配                                  |
|**body** <br> `{object}`                                 |{...}      |body设置                                                                                                                                    |
|**body.row** <br> `{object}`                             |{...}      |body内`行设置`                                                                                                                              |
|**body.row.transition** <br> `{boolean}`                 |true       |是否开启body内`行的加载动画`                                                                                                                  |
|**body.row.spacing** <br> `{boolean}`                    |0          |行间距                                                                                                                                      |
|**body.row.rowCheckBox** <br> `{boolean}`                |false      |是否开启body内行选择功能                                                                                                                      |
|**body.row.style** <br> `{object}`                       |{...}      |行样式                                                                                                                                       |
|**body.row.specialStyle** <br> `{[object, object, ...]}` |\[]        |按照数组索引依次设置每一行的样式，如要跳过某个索引，直接使用一个逗号占位即可                                                                          |
|**body.row.visual** <br> `{object}`                      |{...}      |提升行的视觉：每隔N行设置另外一种行样式                                                                                                          |
|**body.row.visual.show** <br> `{boolean}`                |true       |是否开启视觉提升                                                                                                                              |
|**...interval** <br> `{number}`                          |1          |每隔N行交替一次                                                                                                                               |
|**...style** <br> `{object}`                             |{...}      |交替的行样式配置表                                                                                                                            |
|**body.row.silent** <br> `{object}`                      |{...}      |行与鼠标事件之间的交互配置                                                                                                                     |
|**body.row.silent.show** <br> `{boolean}`                |false      |行是否不响应鼠标事件，如hover效果等。默认为false，即响应鼠标事件                                                                                   |
|**body.row.silent.style** <br> `{object}`                |{...}      |响应鼠标事件时的样式配置                                                                                                                       |
|**body.row.serialNumber** <br> `{object}`                |{...}      |行号相关配置                                                                                                                                  |
|**body.row.serialNumber.show** <br> `{boolean}`          |false      |是否显示行号                                                                                                                                  |
|**...formatter** <br> `{string}`                         |'{index}.' |行号格式化。`{index}`解析为从0依次递增的数字                                                                                                     |
|**...style** <br> `{object}`                             |{...}      |显示行号的单元格（每行第一个单元格）的样式配置                                                                                                     |
|**...specialStyle** <br> `{[object, object, ...]}`       |\[]        |按照数组索引依次设置每一行的行号所在单元格的样式，如要跳过某个索引，直接使用一个逗号占位即可                                                             |
|**body.cellOfColumn** <br> `{object}`                    |{...}      |按照列来配置单元格样式                                                                                                                          |
|**...cellOfColumn.style** <br> `{[object, object, ...]}` |\[]        |按照数组索引依次设置每一列内所有单元格的样式，如要跳过某个索引，直接使用一个逗号占位即可                                                                 |
|**body.cell** <br> `{object}`                            |{...}      |每一行内的单元格的属性配置                                                                                                                       |
|**body.cell.style** <br> `{object}`                      |{...}      |行内所有单元格的样式配置表                                                                                                                       |
|**body.cell.style.width** <br> `{string\|Array\|number}` |'auto'     |width是style的属性之一，这里需要特别注意：它的用法不同于css的width，详见[cellWidth](#cellWidth)                                           |
|**~~body.cell.iconStyle~~** <br> `{object}`              |{...}      |单元格内的图标样式统一设置，需要配合对象单元格的img类型使用。这个特性可能在后面版本被移除。                                                              |

#### cellWidth

注意：无论通过何种方式，如果最终渲染出来的单元格宽度值小于style.minWidth，则使用style.minWidth值。

cellWidth可选值：
- 'auto'：完全根据单元格内的具体数据自动设置单元格宽度；
- 'avg'：每个单元格宽度趋近于相等，但会根据单元格内的具体数据适当调整宽度；
- \[10, 20, 10]：行内每一个单元格依次取数组的值。如果数组某索引的值为占位符（即“,”），则该单元格的宽度将被设置为“auto”；当数组长度小于列数时，其余的列默认设置为“auto”。
- '10,20,10'：根据逗号分隔值，每一列依次取值。详细规则同数组形式。


### Configuration Demonstration

```json5
{
  className: '',
  data: [
    ['1st cumn', '2nd column', '3rd column'],
    ['1st cell', '2nd cell', '3rd cell']
  ],
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
    }
  }
}
```
