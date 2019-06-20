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

English | [简体中文](./README_zh-CN.md)

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

|**props** type                                  |description                                     |details                           |
|------------------------------------------------|------------------------------------------------|----------------------------------|
|**data** <br> `{[Array, Array, Array,...]}`     |Render table data                               |[props.data](#data)               |
|**className** <br> `{string}`                   |Table outermost container style sheet name      |''                                |
|**property** <br> `{Object}`                    |Wrapper table properties                        |[props.property](#property)       |

##### data

- The 'data' data format is very similar to a two-dimensional array。
- Each subarray in the array represents a row, and each element in the subarray represents a cell. The order in which cells are displayed is the order in which the arrays are indexed, so the order and display of each cell should be determined when reconstructing the data.

```
[
    [cell, cell, cell],   // row
    [
        cell, // cell
        cell, 
        cell
    ], 
    [cell, cell, cell], 
    ...
]
```

- An object can also represent a row in a two-dimensional array. This object has two required attributes: `type='row'` and `cells=[]`, which respectively identify the object as a row and the cells contained in the row:

```
[
    {  // The rows are displayed as objects, and the in-row cells are contained in the cells field as an array.
        type: 'row',
        cells: [cell, cell, cell],
        ...
    }, 
    [  // Display rows as an array, each element representing a cell
        {type: 'button', ...},   // Generate a button in the cell
        cell,  // cell
        cell
    ], 
    [
        cell, 
        cell, 
        [{type: 'radio'}, {type: 'radio'}, ...]  // Generate two or more radios in the same cell
    ], 
    ...
]
```

The data format that cells can parse is divided into the following four categories:

- String
- Array，These four data formats can be nested inside the array again.
- jsx,Such as: `<button className='test-button' onclick='()=>{return null}'>click</button>`
- Object（Object cell），Details are as follows：

**Object cell**

|type                         | description                                                                                             |
|-----------------------------|---------------------------------------------------------------------------------------------------------|
|row                          |Generate a unit row, `unit row object` can only be written in the body, invalid elsewhere                |
|img                          |Generate an img tag inside the cell                                                                      |
|button                       |Generate a button in the cell                                                                            |
|link                         |Generate a link in the cell (a tag)                                                                      |
|radio                        |Generate a radio in the cell                                                                             |
|checkbox                     |Generate a checkbox in the cell                                                                          |
|select <sup>^1.4.1</sup>     |Generate a select in the cell                                                                            |

Here are some examples：

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

// link (Choose one of the two)
{
    type: 'link',
    text: 'I am a link, I use the href attribute',
    className: 'test-link',
    key: '',
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
    key: '',
    value:''
}

// checkbox
{
    type: 'checkbox',
    name: 'checkbox1',
    text: 'checkbox',
    className: 'test-checkbox',
    key: '',
    value:''
}

// select
{
    type: 'select',
    text: 'please choose：',
    value: '',
    data: '',
    className: '',
    option: [
        {
            id: '1',
            label: 'item 1',
            value: 1
        }
    ],
}
```

**Object cell attribute**

|**key** `{type}`                                                       |description                                                                                                                                                                                                                                                                      |use                                                                                     |
|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
|**type** <br> `{string}`                                               |The type of HTML tag to be generated in the cell                                                                                                                                                                                                                                 | `row` `button` `link` `img` `radio` `checkbox`                                         |
|~~**uid**~~ <br> `{string}` **Available before version 1.2.2**         |`Deprecated` A unique identifier for a cell that can be used to save ids, and so on. This field function is similar to the key, and can also be replaced with a data field in conjunction with a callback function, so it is decided to discard this field in version 1.2.2.     | ~~`row`~~ `button` `link` `img` `radio` `checkbox`                                     |
|**name** <br>`{string}`                                                |The attributes that the radio and checkbox must set, the same as the name attribute of the HTML-like tag.                                                                                                                                                                        | ~~`row`~~ ~~`button`~~ ~~`link`~~ ~~`img`~~ `radio` `checkbox`                         |
|**text** <br> `{string}`                                               |The text of the rendered HTML tag                                                                                                                                                                                                                                                | ~~`row`~~ ~~`button`~~ `link` `img` `radio` `checkbox`                                 |
|**value** <br> `{number\|string}`                                      |The `value` attribute of the generated HTML tag, `All object units can be used starting with version 1.4.1`                                                                                                                                                                      | Before version 1.4.1: ~~`row`~~ `button` ~~`link`~~ ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~ <br /> ^1.4.1: `row` `button` `link` `img` `radio` `checkbox` `select`   |
|**src** <br> `{string}`                                                |Image link, such as: 'http(s)://xxx' or 'data:image/xxx'                                                                                                                                                                                                                         | ~~`row`~~ ~~`button`~~ ~~`link`~~ `img` ~~`radio`~~ ~~`checkbox`~~                     |
|**alt** <br> `{string}`                                                |The alt attribute of the image                                                                                                                                                                                                                                                   | ~~`row`~~ ~~`button`~~ ~~`link`~~ `img` ~~`radio`~~ ~~`checkbox`~~                     |
|**href** <br> `{string}`                                               |The hyperlink type of the link type (the same as the href of the HTML a tag), or you can use this combination of event and callback to customize the event callback without passing this attribute.                                                                              | ~~`row`~~ ~~`button`~~ `link` ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~                     |
|**className** <br> `{string}`                                          |Custom style sheet name                                                                                                                                                                                                                                                          | `row` `button` `link` `img` `radio` `checkbox`                                         |
|**event** <br> `{string}`                                              |The way to trigger an event needs to be used with `callback`                                                                                                                                                                                                                     | `row` `button` `link` ~~`img`~~ `radio` `checkbox`                                     |
|**callback** <br> `{function}`                                         |The callback function after the trigger event, see the `callback function` for details.                                                                                                                                                                                          | `row` `button` `link` ~~`img`~~ `radio` `checkbox`                                     |
|**option** <br> `{object[]}`                                           |Can only be used with the `select` type, see the `option` for details.                                                                                                                                                                                                           | ~~`row`~~ ~~`button`~~ ~~`link`~~ ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~ `select`        |
|**cells** <br> `{object[]}`                                            |Can only be used with the `row` type, see the [data](#data) for details.                                                                                                                                                                                                         | ~~`row`~~ ~~`button`~~ ~~`link`~~ ~~`img`~~ ~~`radio`~~ ~~`checkbox`~~ `select`        |
|**data** <br>`{*}`                                                     |Custom attributes can theoretically pass any value. This value is not used inside the component, you can get this value in the first parameter of the `callback function`                                                                                                        | `row` `button` `link` `img` `radio` `checkbox` `select`                                |
|REACT attributes may be required                                       |-                                                                                                                                                                                                                                                                                | -                                                                                      |
|**key** <br> `{string}`                                                |Jsx loop or array need to use the key attribute, `Please ensure the uniqueness of the key`                                                                                                                                                                                       | `row` `button` `link` `img` `radio` `checkbox`                                         |

**Callback**

|callback(data, objectUnit, event) |Custom event callback function, can be used with `event`. If the event is undefined, the default click event is triggered after the callback.           |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
|data                              |Custom data attribute in `object cell`                                                                                                                  |
|objectUnit                        |The object used to render the cell, ie the `object unit` object defined in data                                                                         |
|event                             |Event Object                                                                                                                                            |

**Option**

|**key** `{type}`       |description    |
|-----------------------|---------------|
|**id**                 |option id      |
|**label**              |option text    |
|**value**              |option value   |

##### property

|**props.property** `{type}`                                           |default    |description                                                                                                                                                                                                                                                  |
|----------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|**border** <br> `{object}`                                            |{...}      |The border configuration of the table, including the `row` and `cell` inside the component (if the row or cell does not have a border style, this global configuration is used by default)                                                                   |
|**style** <br> `{object}`                                             |{...}      |The style of the outermost container of the component                                                                                                                                                                                                        |
|**~~isScroll~~** <br> `{boolean}` &#9888;                             |true       |Whether to enable component scrolling (valid when the height of all rows exceeds the height of the component's viewable area) &#9888; This property is deprecated in version 1.4.0, please use `scroll.enable` instead                                       |
|**~~speed~~** <br> `{number}` &#9888;                                 |50         |The scrolling speed of the component list when scrolling is enabled &#9888; This property is deprecated in version 1.4.0, please use `scroll.speed` instead                                                                                                  |
|**scroll <sup>^1.4.0</sup>** <br> `{object}`                          |{...}      |Component scrolling related settings. `speed` milliseconds scrolling `distance` distance.                                                                                                                                                                    |
|**scroll.enable <sup>^1.4.0</sup>** <br> `{boolean}`                  |true       |Whether to enable component scrolling (valid when the height of all rows exceeds the height of the component's viewable area)                                                                                                                                |
|**scroll.speed <sup>^1.4.0</sup>** <br> `{number}`                    |50         |The interval at which the component scrolls once, in milliseconds. Tip: Set a small time interval to achieve continuous scrolling animation                                                                                                                  |
|**scroll.distance <sup>^1.4.0</sup>** <br> `{number}`                 |1          |The distance at which the component scrolls each time. If the value is a positive integer, the unit is `pixel`; if `0`, it means stop scrolling, the same as `scroll. enable: false`; if it is a negative integer, it scrolls in the unit of `row`, and the number of rows equals the absolute value of the value. If it is a non-numeric, take `0`; if it is a positive decimal, take an integral upward. If it is a negative decimal, it is rounded down.  |
|**header** <br> `{object}`                                            |{...}      |Header related settings                                                                                                                                                                                                                                      |
|**header.show** <br> `{boolean}`                                      |true       |Whether to display the header. When true, the first subarray of data is the header data.                                                                                                                                                                     |
|**header.style** <br> `{object}`                                      |{...}      |Header style                                                                                                                                                                                                                                                 |
|**header.cellStyle** <br> `{object}`                                  |{...}      |The style of the cell inside the header. `Note`: The width value in this style will be invalid, because the header cell width of this component is automatically adapted according to the cell width in the body.                                            |
|**body** <br> `{object}`                                              |{...}      |Body related configuration                                                                                                                                                                                                                                   |
|**body.row** <br> `{object}`                                          |{...}      |Row configuration in the body                                                                                                                                                                                                                                |
|**body.row.onClick <sup>1.2.0</sup>** <br> `()=>{}` &#9888;           |null       |`Deprecated` Row click event, &#9888; `This property is only available in version 1.2.0.`                                                                                                                                                                    |
|**body.row.transition** <br> `{boolean}`                              |true       |Whether to enable the loading animation of the row inside the body                                                                                                                                                                                           |
|**body.row.spacing** <br> `{boolean}`                                 |0          |Row spacing                                                                                                                                                                                                                                                  |
|**~~body.row.rowCheckBox~~** <br> `{boolean}` &#9888;                 |false      |`Deprecated` Whether to enable row selection &#9888; This property is deprecated in version 1.2.2, please use `body.row.rowCheckbox` instead                                                                                                                 |
|**body.row.rowCheckbox <sup>^1.2.2</sup>** <br> `{boolean}`           |false      |Whether to enable row selection                                                                                                                                                                                                                              |
|**body.row.style** <br> `{object}`                                    |{...}      |The style of the row inside the body                                                                                                                                                                                                                         |
|**body.row.specialStyle** <br> `{[object, object, ...]}`              |\[]        |Set the style of each row according to the array index. If you want to skip an index, you can use a comma placeholder.                                                                                                                                       |
|**body.row.visual** <br> `{object}`                                   |{...}      |Improve the visual of the line: set another line style every N lines                                                                                                                                                                                         |
|**body.row.visual.show** <br> `{boolean}`                             |true       |Whether to turn on visual enhancement                                                                                                                                                                                                                        |
|**body.row.visual.interval** <br> `{number}`                          |1          |Alternate every N lines                                                                                                                                                                                                                                      |
|**body.row.visual.style** <br> `{object}`                             |{...}      |Alternate row style configuration                                                                                                                                                                                                                            |
|**body.row.silent** <br> `{object}`                                   |{...}      |Whether to respond to mouse interaction                                                                                                                                                                                                                      |
|**body.row.silent.show** <br> `{boolean}`                             |false      |Whether row does not respond to mouse events, such as hover events. The default is false, that is, respond to mouse events                                                                                                                                   |
|**body.row.silent.style** <br> `{object}`                             |{...}      |Style when responding to mouse events                                                                                                                                                                                                                        |
|**body.row.serialNumber** <br> `{object}`                             |{...}      |Line number related configuration                                                                                                                                                                                                                            |
|**body.row.serialNumber.show** <br> `{boolean}`                       |false      |Whether to display the line number                                                                                                                                                                                                                           |
|**body.row.serialNumber.formatter** <br> `{string}`                   |'{index}.' |Line number formatting. `{index}` resolves to a number that increments from 0                                                                                                                                                                                |
|**body.row.serialNumber.style** <br> `{object}`                       |{...}      |The style of the cell showing the line number (the first cell in each row)                                                                                                                                                                                   |
|**body.row.serialNumber.specialStyle** <br> `{[object, object, ...]}` |\[]        |According to the array index, set the style of the cell where each row has the row number. If you want to skip an index, you can use a comma placeholder.                                                                                                    |
|**body.cellOfColumn** <br> `{object}`                                 |{...}      |Configure cell styles by column                                                                                                                                                                                                                              |
|**body.cellOfColumn.style** <br> `{[object, object, ...]}`            |\[]        |According to the array index, set the style of all the cells in each column. If you want to skip an index, you can use a comma placeholder.                                                                                                                  |
|**body.cell** <br> `{object}`                                         |{...}      |Cell related configuration                                                                                                                                                                                                                                   |
|**body.cell.style** <br> `{object}`                                   |{...}      |Cell style                                                                                                                                                                                                                                                   |
|**body.cell.style.width** <br> `{string\|Array\|number}`              |'auto'     |`width` is one of the properties of style, here you need to pay special attention: its usage is different from the width of css, see `cellWidth`                                                                                                             |
|**~~body.cell.iconStyle~~** <br> `{object}`                           |{...}      |`Deprecated` The icon style inside the cell needs to match the img of the object cell. In fact, you only need to use className instead of it in the object cell. &#9888; it looks a lot more, so it will be completely removed in a later version.           |

**cellWidth**

Note: Regardless of the method, if the final rendered cell width value is less than style.minWidth, the style.minWidth value is used.

Optional value for cellWidth：

- 'auto'：Automatically set the cell width based on the specific data in the cell.
- 'avg'：Each cell width approaches equal, but the width is appropriately adjusted based on the specific data in the cell.
- \[10, 20, 10]：Each cell in the row takes the value of the array in turn. If the value of an array index is a placeholder (ie ","), the width of the cell will be set to "auto"; when the length of the array is less than the number of columns, the remaining columns are set to "auto" by default.
- '10,20,10'：Each column takes values in turn, based on comma-separated values. The detailed rules are the same as the array form.


### Configuration Demonstration

```json5
{
  className: '',
  data: [
    ['1st column', '2nd column', '3rd column'],
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
