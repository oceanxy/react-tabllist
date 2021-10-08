<div align="center">

<h1>React-tabllist</h1>

React-based list (table) components that support events, callback functions, and custom styles.

---

[![GitHub License](https://img.shields.io/github/license/oceanxy/react-tabllist.svg)](https://github.com/oceanxy/react-tabllist/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/react-tabllist.svg)](https://www.npmjs.com/package/react-tabllist)
[![Minified Size](https://img.shields.io/bundlephobia/min/react-tabllist.svg)](https://bundlephobia.com/result?p=react-tabllist)
[![CircleCI Status](https://img.shields.io/circleci/project/github/oceanxy/react-tabllist/master.svg)](https://circleci.com/gh/oceanxy/react-tabllist)
[![NPM Download](https://img.shields.io/npm/dw/react-tabllist.svg)](https://www.npmjs.com/package/react-tabllist)

[![Codecov](https://img.shields.io/codecov/c/github/oceanxy/react-tabllist/master.svg)](https://codecov.io/gh/oceanxy/react-tabllist)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/oceanxy/react-tabllist.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/oceanxy/react-tabllist/context:javascript)
[![Dependency React](https://img.shields.io/npm/dependency-version/react-tabllist/peer/react.svg)]()
[![Last Commit](https://img.shields.io/github/last-commit/oceanxy/react-tabllist.svg)](https://github.com/oceanxy/react-tabllist)

[comment]: <> ([![Dependencies Status]&#40;https://david-dm.org/oceanxy/react-tabllist/status.svg&#41;]&#40;https://david-dm.org/oceanxy/react-tabllist&#41;&#41;)
[comment]: <> ([![DevDependencies Status]&#40;https://david-dm.org/oceanxy/react-tabllist/dev-status.svg&#41;]&#40;https://david-dm.org/oceanxy/react-tabllist?type=dev&#41;)
[comment]: <> ([![PeerDependencies Status]&#40;https://david-dm.org/oceanxy/react-tabllist/peer-status.svg&#41;]&#40;https://david-dm.org/oceanxy/react-tabllist?type=peer&#41;)
[comment]: <> ([![Gitter]&#40;https://img.shields.io/gitter/room/oceanxy/react-tabllist.svg&#41;]&#40;https://gitter.im/react-tabllist/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link&#41;)

</div>

English | [简体中文](./README_zh-CN.md)

---

## 🔧 Install

```bash
npm install react-tabllist --save
```

## 📚 Usage

  ### Use in browser
  
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

  ### Use in ES6 & jsx
  
  ```jsx harmony
    import ReactTabllist from 'react-tabllist';
  
    // Use default configuration
    ReactDOM.render(<ReactTabllist />, mountNode);
  
    // Custom data and configuration items
    const props = {
      className: 'demo',
      property: {},
      data: [
        ['1st column', '2nd column', '3rd column'],
        ['1st cell', '2nd cell', '3rd cell']
      ]
    }
  
    ReactDOM.render(<ReactTabllist {...props} />, mountNode);
  
    /**
     * Event callback function
     * @param {SyntheticEvent} event
     * @param {Exposes} exposes An object containing exposed properties and methods
     */
    function handleScroll(event, exposes) {
      // some code
    }
  
    // Use React native events
    ReactDOM.render(<ReactTabllist {...props} onScroll={handleScroll} />, mountNode);
  
    // Use custom events built into components
    ReactDOM.render(<ReactTabllist {...props} custom_onScrollToEnd={handleScroll} />, mountNode);
  ```

## 💻 Development

  If you want to join the development to improve this component, please fork and start with the following command:

  ```bash
    $ git clone git@github.com:oceanxy/react-tabllist.git
    $ cd react-tabllist
    $ npm install
    $ npm start
  ```

  Open your browser and visit `http://localhost:3001`.

## 📝 Version Information

  [Change Log](./CHANGELOG.md)

## 🧰 Configuration

  |**props**                                    |description                                     |details                           |
  |---------------------------------------------|------------------------------------------------|----------------------------------|
  |**data** <br> `{[Array, Array, Array,...]}`  |Render table data                               |[props.data](#props.data)         |
  |**className** <br> `{string}`                |Table outermost container style sheet name      |''                                |
  |**property** <br> `{Object}`                 |Wrapper table properties                        |[props.property](#props.property) |

  ### props.className

  You can customize the style through the `props.classname` attribute.

  ### props.data

  **_Data Format_**

  The `data` data format is very similar to a two-dimensional array。

  - Each subarray in the array represents a row, and each element in the subarray represents a cell. The order in which cells are displayed is the order in which the arrays are indexed, so the order and display of each cell should be determined when reconstructing the data.

  ```
    [
      [cell, cell, cell], // row
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
      [
          {type: 'radio'}, {type: 'radio'}, ... // Generate two or more radios in the same cell
      ]
    ],
    ...
  ]
  ```

  **_Object Unit_**

  The data format that cells can parse is divided into the following four categories:

  - String
  - Array，These four data formats can be nested inside the array again.
  - jsx,Such as: `<button className='test-button' onclick='()=>{return null}'>click</button>`
  - Object（Object cell），Details are as follows：

  |type                         | description                                                                                                                                               |
  |-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
  |row                          |Generate a unit row, `unit row object` can only be written in the body, invalid elsewhere                                                                  |
  |img                          |Generate an img tag inside the cell                                                                                                                        |
  |button                       |Generate a button in the cell                                                                                                                              |
  |link                         |Generate a link in the cell (a tag)                                                                                                                        |
  |radio                        |Generate a radio in the cell                                                                                                                               |
  |checkbox                     |Generate a checkbox in the cell                                                                                                                            |
  |select <sup>^1.4.1</sup>     |Generate a select in the cell                                                                                                                              |
  |text <sup>^1.5.0</sup>       |Generate a plain text inside the cell. You can also replace the object unit with a string. If you don't plan to add events to this cell, you can do that.  |
  |input <sup>^1.6.0</sup>      |Generate a text box in a cell.                                                                                                                             |

  > Here are some examples：
  >
  > ```
  > row
  >
  > {
  >   type: 'row',
  >   cells: [cell, cell, cell],
  >   data: 'row.id',
  >   value: 'row.typeID',
  >   event: 'onClick',
  >   callback: (data, cellData, event) => {},
  >   className: '',
  >   key: ''
  > }
  > 
  > button
  > 
  > {
  >   type: 'button',
  >   value: 'click me',
  >   className: 'test-btn',
  >   data: '123',
  >   event: 'onClick',
  >   callback: data => alert('hello react-tabllist', data) // hello react-tabllist, 123,
  >   key: ''
  > }
  > 
  > img
  > 
  > {
  >   type: 'img',
  >   src: 'http://www.xieyangogo.cn/pic.png',
  >   alt: '',
  >   text: 'IMG description',
  >   className: 'test-img',
  >   key: '',
  >   value:''
  > }
  > 
  > link (Choose one of the two)
  > 
  > {
  >   type: 'link',
  >   text: 'I am a link, I use the href attribute',
  >   className: 'test-link',
  >   key: '',
  >   href: 'https://github.com/oceanxy/react-tabllist',
  >   value:''
  > }
  > {
  >   type: 'link',
  >   text: 'I am a link, I use event and callback to implement custom functions',
  >   className: 'test-link',
  >   key: ''，
  >   data:  {},
  >   event: 'onClick',
  >   callback: (data, cellData, event) => {},
  >   value:''
  > }
  > 
  > radio
  > 
  > {
  >   type: 'radio',
  >   name: 'group2',
  >   text: 'radio group 2-1',
  >   className: 'test-radio',
  >   callback: (data, cellData, event) => {},
  >   key: '',
  >   value:''
  > }
  > 
  > checkbox
  > 
  > {
  >   type: 'checkbox',
  >   name: 'checkbox1',
  >   text: 'checkbox',
  >   className: 'test-checkbox',
  >   callback: (data, cellData, event) => {},
  >   key: '',
  >   value:''
  > }
  > 
  > select
  > 
  > {
  >   type: 'select',
  >   text: 'please choose：',
  >   value: '',
  >   data: '',
  >   className: '',
  >   callback: (data, cellData, event) => {},
  >   option: [
  >     {
  >       id: '1',
  >       label: 'item 1',
  >       value: 1
  >     }
  >   ]
  > }
  > 
  > text
  > 
  > {
  >   type: 'text',
  >   text: 'I am a normal text',
  >   callback: (data, cellData, event) => {}
  > }
  > 
  > input
  > 
  > {
  >   type: 'input',
  >   text: 'username:',
  >   placeholder: 'enter username',
  >   defaultValue: 'oceanxy' // This attribute is not a standard HTML tag attribute, but it is a property of the React element (the purpose is to set the default value of the text box). As you can see, you can also use React's officially defined properties in object cells.
  > }
  > ```

  **_Object Unit Attribute_**

  |**Attribute** `{type}`                                                 |Description                                                                                                                                                                                                                                                                          |row   |button  |link  |img       |radio     |checkbox  |input    |select   |text      |
  |-----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|--------|------|----------|----------|----------|---------|---------|----------|
  |~~**uid**~~ <br> `{string}` **Available before version 1.2.2**         |`Deprecated` A unique identifier for a cell that can be used to save ids, and so on. This field function is similar to the key, and can also be replaced with a data field in conjunction with a callback function, so it is decided to discard this field in version 1.2.2.             |❌    |✅     |✅    |✅       |✅        |✅        |❌      |❌       |❌        |
  |**type** <br> `{string}`                                               |The type of HTML tag to be generated in the cell                                                                                                                                                                                                                                     |✅    |✅     |✅    |✅       |✅        |✅        |✅      |✅       |✅        |
  |**text** <br> `{string}`                                               |The text of the rendered HTML tag                                                                                                                                                                                                                                                    |❌    |❌     |✅    |✅       |✅        |✅        |✅      |✅       |✅        |
  |**event** <br> `{string}`                                              |The way to trigger an event needs to be used with [callback](#Callback)                                                                                                                                                                                                              |✅    |✅     |✅    |❌       |✅        |✅        |✅      |✅       |✅        |
  |**callback** <br> `{function}`                                         |The callback function after the trigger event, see the [callback](#Callback) for details.                                                                                                                                                                                            |✅    |✅     |✅    |❌       |✅        |✅        |✅      |✅       |✅        |
  |**cells** <br> `{object[]}`                                            |Can only be used with the `row` type, see the [data](#props.data) for details.                                                                                                                                                                                                       |✅    |❌     |❌    |❌       |❌        |❌        |❌      |❌       |❌        |
  |**data** <br>`{*}`                                                     |Custom attributes can theoretically pass any value. This value is not used inside the component, you can get this value in the first parameter of the [callback](#Callback)                                                                                                           |✅    |✅     |✅    |✅       |✅        |✅        |✅      |✅       |✅        |
  |**option** <br> `{object[]}`                                           |Can only be used with the `select` type, see the [option](#Option) for details.                                                                                                                                                                                                      |❌    |❌     |❌    |❌       |❌        |❌        |❌      |✅       |❌        |


  **_HTML Attribute_**

  > The usage of these attributes is the same as that of native HTML tags. They are listed to indicate the points to be aware of when using them.

  |**Attribute** `{type}`                                                 |Description                                                                                                                                                                                           |
  |-----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  |**name** <br>`{string}`                                                |The attributes that the radio and checkbox must set, the same as the name attribute of the HTML-like tag.                                                                                             |
  |**value** <br> `{number\|string}`                                      |The `value` attribute of the generated HTML tag, `**All object cell can be used starting with version 1.4.1**`                                                                                        |
  |**src** <br> `{string}`                                                |Image link, such as: 'http(s)://xxx' or 'data:image/xxx'                                                                                                                                              |
  |**alt** <br> `{string}`                                                |The alt attribute of the image                                                                                                                                                                        |
  |**href** <br> `{string}`                                               |The hyperlink type of the link type (the same as the href of the HTML a tag), or you can use this combination of event and callback to customize the event callback without passing this attribute.   |

  > For more tag attributes please visit [w3schools](https://www.w3schools.com/tags/).

  **_React Element Attribute_**

  |**Attribute** `{type}`                                                 |Description                                                                                                                                                                                           |
  |-----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  |**key** <br> `{string}`                                                |Jsx loop or array need to use the key attribute, `Please ensure the uniqueness of the key`                                                                                                            |
  |**className** <br> `{string}`                                          |Custom style sheet name                                                                                                                                                                               |
  |**defaultValue** <br> `{string\|number}`                               |The default value of labels such as text boxes, different from value                                                                                                                                  |

  > For more attributes, see the `type definition file` (d.ts) of the react library.

  **_Callback_**

  - v1.5.0 and earlier

    `callback(data:Array[], objectUnit:object, event:SyntheticEvent)`

    Custom event callback function, can be used with `event`. If the event is undefined, the default click event is triggered after the callback.

    - data: Custom data attribute in [Object Unit](#Object\nUnit)
    - objectUnit: Object unit data in the cell
    - event: React SyntheticBaseEvent

  - v1.5.1 - v1.6.1

    `callback(instance:object, objectUnit:object, event:SyntheticEvent)`

    Custom event callback function, can be used with `event`. If the event is undefined, the default click event is triggered after the callback.

    - instance: Some properties and methods exposed by the component instance object
    - objectUnit: Object unit data in the cell
    - event: React SyntheticBaseEvent

    **instance**

      ```ecmascript 6
      {
        scrollTo(rowIndex, targetScrollTop), // Scroll the component to the specified row. If row Index is false, use a value to represent the scroll distance (target Scroll Top)
        props,                               // The properties passed to the component can be re-assigned to update the component
        readonlyState,                       // Component status (read only)
        renderData                           // Render component data
      }
      ```

  - v1.7.0 and later

    `callback(exposes:object, objectUnit:object, event:SyntheticEvent)`

    Custom event callback function, can be used with `event`. If the event is undefined, the default click event is triggered after the callback.

    - exposes: Some properties and methods exposed
    - objectUnit: Object unit data in the cell
    - event: React SyntheticBaseEvent

    **exposes**

    |Method                     |Parameter                       |Description                               |
    |---------------------------|--------------------------------|------------------------------------------|
    |scrollTo(rowIndex: number) |rowIndex`{number}`:row index    |scrolls the list to the specified row     |
    |pause(isPause?: boolean)   |isPause`{boolean}`:Is the list paused.<br>By default, you can pause scrolling or start scrolling according to the paused attribute inside the component. |Pause or start the scrolling of the list |

    |Attribute                     |Type             |description                | 
    |------------------------------|-----------------|---------------------------|
    |paused                        |`{boolean}`      |The scrolling status of the current component (effective when the component turns on the scrolling function). True means suspended; False means scrolling  |
    |props                         |`{object}`       |The `props` of the component can be re assigned to update the component |
    |indeterminate                 |`{boolean}`      |The `indeterminate` status of the row selection box in the header |
    |selected                      |`{object}`       |It includes row selection boxes, custom check boxes, and check status sets of custom radio buttons |
    |rowsHeight                    |`{number}`       |Total height of all rows |
    |scrollFrequency               |`{number}`       |Number of turns from component loading to current scrolling |
    |renderData                    |`{Array[]}`      |Final used for rendering list after processing `data` |
    |header                        |`{JSX.Element}`  |`Header container` element |
    |body                          |`{JSX.Element}`  |`Body container` element |
    |container                     |`{JSX.Element}`  |Component outermost container element |
    |firstRowIndexInViewableArea   |`{number}`       |The index of the first row in the current viewing area (the current version is only available when `scroll.distance < 0`) |

  **_Option_**

  `{type='select'}`Object unit unique attribute.

  |**key** `{type}`       |description    |
  |-----------------------|---------------|
  |**id**                 |option id      |
  |**label**              |option text    |
  |**value**              |option value   |

### props.property

  |**props.property** `{type}`                                                     |default    |description                                                                                                                                                                                                                                                  |
  |--------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  |**border** <br> `{cssProperties border}`                                        |{...}      |The border configuration of the table, including the `row` and `cell` inside the component (if the row or cell does not have a border style, this global configuration is used by default)                                                                   |
  |**style** <br> `{cssProperties}`                                                |{...}      |The style of the outermost container of the component                                                                                                                                                                                                        |
  |**~~isScroll~~** <br> `{boolean}` &#9888;                                       |true       |Whether to enable component scrolling (valid when the height of all rows exceeds the height of the component's viewable area) &#9888; This property is deprecated in version 1.4.0, please use `scroll.enable` instead                                       |
  |**~~speed~~** <br> `{number}` &#9888;                                           |50         |The scrolling speed of the component list when scrolling is enabled &#9888; This property is deprecated in version 1.4.0, please use `scroll.speed` instead                                                                                                  |
  |**scroll <sup>^1.4.0</sup>** <br> `{object}`                                    |{...}      |Component scrolling related settings. `speed` milliseconds scrolling `distance` distance.                                                                                                                                                                    |
  |**scroll.enable <sup>^1.4.0</sup>** <br> `{boolean}`                            |true       |Whether to enable component scrolling (valid when the height of all rows exceeds the height of the component's viewable area)                                                                                                                                |
  |**scroll.speed <sup>^1.4.0</sup>** <br> `{number}`                              |50         |The interval at which the component scrolls once, in milliseconds. Tip: Set a small time interval to achieve continuous scrolling animation.If combined with `scroll.distance`, you can achieve an interval scrolling effect, and you can scroll N rows at a time.  |
  |**scroll.distance <sup>^1.4.0</sup>** <br> `{number}`                           |1          |The distance at which the component scrolls each time. If the value is a positive integer, the unit is `pixel`; if `0`, it means stop scrolling, the same as `scroll.enable: false`; if it is a negative integer, it scrolls in the unit of `row`, and the number of rows equals the absolute value of the value. If it is a non-numeric, take `0`; if it is a positive decimal, take an integral upward. If it is a negative decimal, it is rounded down  |
  |**header** <br> `{object}`                                                      |{...}      |Header related settings                                                                                                                                                                                                                                      |
  |**header.show** <br> `{boolean}`                                                |true       |Whether to display the header. When true, the first subarray of data is the header data                                                                                                                                                                      |
  |**header.style** <br> `{cssProperties}`                                         |{...}      |Header style                                                                                                                                                                                                                                                 |
  |**header.cellStyle** <br> `{cssProperties}`                                     |{...}      |The style of the cell inside the header. `Note`: The width value in this style will be invalid, because the header cell width of this component is automatically adapted according to the cell width in the body                                             |
  |**body** <br> `{object}`                                                        |{...}      |Body related configuration                                                                                                                                                                                                                                   |
  |**body.style <sup>1.5.0</sup>** <br> `{cssProperties}`                          |{...}      |You can define partial styles for the body that usually do not affect the layout of the list. For example, you can use "backgroundColor", "backgroundImage" or "opacity", etc., but you can't use attributes such as "width", "height", "padding", and "margin" that change the size or position of the body |
  |**body.row** <br> `{object}`                                                    |{...}      |Row configuration in the body                                                                                                                                                                                                                                |
  |**~~body.row.onClick~~ <sup>1.2.0</sup>** <br> `()=>{}` &#9888;                 |null       |`Deprecated` Row click event, &#9888; `This property is only available in version 1.2.0`                                                                                                                                                                     |
  |**body.row.transition** <br> `{boolean}`                                        |true       |Whether to enable the loading animation of the row inside the body                                                                                                                                                                                           |
  |**body.row.spacing** <br> `{boolean}`                                           |0          |Row spacing                                                                                                                                                                                                                                                  |
  |**~~body.row.rowCheckBox~~** <br> `{boolean}` &#9888;                           |false      |`Deprecated` Whether to enable row selection &#9888; This property is deprecated in version 1.2.2, please use `body.row.rowCheckbox` instead                                                                                                                 |
  |**~~body.row.rowCheckbox~~<sup>^1.2.2</sup>** <br> `{boolean}` &#9888;          |false      |`Deprecated` Whether to enable row selection &#9888; The value of this property was changed from Boolean to an object in version 1.5.0, as detailed in the next line                                                                                         |
  |**body.row.rowCheckbox <sup>^1.5.0</sup>** <br> `{object}`                      |{...}      |Body row selection function related settings                                                                                                                                                                                                                 |
  |**body.row.rowCheckbox.show <sup>^1.5.0</sup>** <br> `{boolean}`                |false      |Whether to enable row selection                                                                                                                                                                                                                              |
  |**body.row.rowCheckbox.column <sup>^1.5.0</sup>** <br> `{number}`               |1          |Which column of the list (table) is inserted into the column. Note that this value has a priority less than `row.serialNumber.column`, ie if the two values are the same, then this column will be ranked later                                              |
  |**body.row.rowCheckbox.style <sup>^1.5.0</sup>** <br> `{cssProperties}`         |{...}      |The style of the label of the wrapped row selection box, not the style of the cell in which the row selection box is located                                                                                                                                 |
  |**body.row.rowCheckbox.specialStyle <sup>^1.5.0</sup>** <br> `{cssProperties}`  |\[]        |According to the array index, set the style of the label of the parcel row selection box. If you want to skip an index, you can use a comma placeholder                                                                                                      |
  |**body.row.style** <br> `{cssProperties}`                                       |{...}      |The style of the row inside the body                                                                                                                                                                                                                         |
  |**body.row.specialStyle** <br> `{[cssProperties, cssProperties, ...]}`          |\[]        |Set the style of each row according to the array index. If you want to skip an index, you can use a comma placeholder                                                                                                                                        |
  |**body.row.visual** <br> `{object}`                                             |{...}      |Improve the visual of the line: set another line style every N lines                                                                                                                                                                                         |
  |**body.row.visual.show** <br> `{boolean}`                                       |true       |Whether to turn on visual enhancement                                                                                                                                                                                                                        |
  |**body.row.visual.interval** <br> `{number}`                                    |1          |Alternate every N lines                                                                                                                                                                                                                                      |
  |**body.row.visual.style** <br> `{cssProperties}`                                |{...}      |Alternate row style configuration                                                                                                                                                                                                                            |
  |**body.row.silent** <br> `{object}`                                             |{...}      |Whether to respond to mouse interaction                                                                                                                                                                                                                      |
  |**body.row.silent.show** <br> `{boolean}`                                       |false      |Whether row does not respond to mouse events, such as hover events. The default is false, that is, respond to mouse events                                                                                                                                   |
  |**body.row.silent.style** <br> `{cssProperties}`                                |{...}      |Style when responding to mouse events                                                                                                                                                                                                                        |
  |**body.row.serialNumber** <br> `{object}`                                       |{...}      |Line number related configuration                                                                                                                                                                                                                            |
  |**body.row.serialNumber.show** <br> `{boolean}`                                 |false      |Whether to display the line number                                                                                                                                                                                                                           |
  |**body.row.serialNumber.columnName <sup>^1.5.0</sup>** <br> `{string}`          |'SN'       |The column name of the column                                                                                                                                                                                                                                |
  |**body.row.serialNumber.formatter** <br> `{string}`                             |'{index}.' |Line number formatting. `{index}` resolves to a number that increments from 0                                                                                                                                                                                |
  |**body.row.serialNumber.column <sup>^1.5.0</sup>** <br> `{number}`              |1          |Which column of the list (table) is inserted into the column. Note that this value has a priority greater than `row.rowCheckbox.column`, ie if the two values are the same, then this column will be in front                                                |
  |**body.row.serialNumber.style** <br> `{cssProperties}                           |{...}      |The style of the label that wraps the line number, not the style of the cell in which the line number is located                                                                                                                                             |
  |**body.row.serialNumber.specialStyle** <br> `{[cssProperties, ...]}`            |\[]        |According to the array index, set the style of the label of the package line number. If you want to skip an index, you can use a comma placeholder                                                                                                           |
  |**body.cellOfColumn** <br> `{object}`                                           |{...}      |Configure cell styles by column                                                                                                                                                                                                                              |
  |**body.cellOfColumn.style** <br> `{[cssProperties, ...]}`                       |\[]        |According to the array index, set the style of all the cells in each column. If you want to skip an index, you can use a comma placeholder                                                                                                                   |
  |**body.cell** <br> `{object}`                                                   |{...}      |Cell related configuration                                                                                                                                                                                                                                   |
  |**body.cell.style** <br> `{cssProperties}`                                      |{...}      |Cell style                                                                                                                                                                                                                                                   |
  |**body.cell.style.width** <br> `{string\|Array\|number}`                        |'auto'     |`width` is one of the properties of style, here you need to pay special attention: its usage is different from the width of css, see `cellWidth`                                                                                                             |
  |**~~body.cell.iconStyle~~** <br> `{cssProperties}`                              |{...}      |`Deprecated` The icon style inside the cell needs to match the img of the object cell. In fact, you only need to use className instead of it in the object cell. &#9888; it looks a lot more, so it will be completely removed in a later version            |

  **cellWidth**

  Optional value for cellWidth：

  - 'auto'：Automatically set the cell width based on the specific data in the cell.
  - 'avg'：Each cell width approaches equal, but the width is appropriately adjusted based on the specific data in the cell.
  - \[10, 20, 10]：Each cell in the row takes the value of the array in turn. If the value of an array index is a placeholder (ie ","), the width of the cell will be set to "auto"; when the length of the array is less than the number of columns, the remaining columns are set to "auto" by default.
  - '10,20,10'：Each column takes values in turn, based on comma-separated values. The detailed rules are the same as the array form.

  > Note:
  >
  > 1. Regardless of the method, if the final rendered cell width value is less than `style.minWidth`, the `style.minWidth` value is used.
  > 2. The total width of the component cannot be less than the sum of the widths of each column, otherwise the columns that exceed the width portion will be hidden.
  > 3. When customizing the width values of multiple columns, if each column defines a specific value, you should ensure that the sum of these values is equal to the width value of the component, otherwise the actual width of the column after rendering may not be the expected value. Under normal circumstances, we should ensure that the width of at least one column is automatically adapted, that is, no value is set or skipped with a comma.
  > 4. The priority order of the cell styles.

### Event

  - `v1.7.0` and later versions support React native events, and remove the event binding written inside the code in the previous version.
  - Added 3 custom scroll events：

    - custom_onScrollTo：Triggered after the end of discontinuous scrolling (when `scroll.distance < 0`) or after calling the public scroll to function.
    - custom_onScrollToEnd：Scroll to the end of the component to trigger. Triggered when the last line completely appears in the visible area of the component.
    - custom_onScrollFullCircle：Triggered after a complete roll.

  - For all events, including react native events and custom scroll events, there are two callback parameters:

    - event `{SyntheticEvent}`: Event callback parameter of event handle.
    - exposes `{object}`: An object that contains exposed properties and methods.

## ⛱️ Configuration Demonstration

  > _The default value of the component is based on this configuration table._

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

## 💖 Thanks

  The `react-tabllist` project can continue to serve everyone free of charge. One of the reasons is the free development tools provided by [jetbrains](https://www.jetbrains.com/?from=react-tabllist). Thank them here!

## 🙋 Q&A

---

 Q: Thanks to [AimLuo](https://github.com/AimLuo) for the question: Is it better to write `object units` in `data` or `JSX syntax`?

 A: [answer](https://github.com/oceanxy/react-tabllist/issues/1)

---



