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

```jsx harmony
import ReactTabllist from 'react-tabllist';

ReactDOM.render(<ReactTabllist />, mountNode);

const data = [
   ['1st column', '2nd column', '3rd column'],
   ['1st cell', '2nd cell', '3rd cell']
]

const property = {}

ReactDOM.render(<ReactTabllist className='demo' data={data]} property={property} />, mountNode);
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

|props \| type                             |description               |default          |
|------------------------------------------|--------------------------|-----------------|
|data \| `{[Array, Array, Array,...]}`     |生成表格需要的数据          |see example      |
|className \| `{string}`                   |自定义样式表名称            |''               |
|property \| `{Object}`                    |属性                       |{}               |

#### props.data

data数据格式为一个二维数组，数组内每一个子数组元素代表一行，子数组内每一个元素代表一个单元格。
单元格的显示顺序为数组下标顺序，所以在重构数据时应当确定每一个单元格的显示内容。

单元格可解析的数据格式分为四类：
- 字符串
- 数组，数组内可以再次嵌套此四种数据格式
- jsx，如 `<button className='test-button' onclick='()=>{return null}'>click</button>`
- 对象（对象单元格），详细介绍如下：

**对象单元格**

|type         | description                 |use                                                   |
|-------------|-----------------------------|------------------------------------------------------|
|button       |在单元格内生成一个按钮          |{<div style='text-indent: 2em;'>type: 'button',</div>}|
|link         |在单元格内生成一个连接（a标签）  |{<div style='text-indent: 2em;'>type: 'link',</div>}  |
|radio        |在单元格内生成一个单选按钮      |{<div style='text-indent: 2em;'>type: 'button',</div>}|
|checkbox     |在单元格内生成一个复选框        |{<div style='text-indent: 2em;'>type: 'link',</div>}  |

**对象单元格属性**

|key \| type         |description                                                          |use                                           |
|-------------|---------------------------------------------------------------------|------------------------------------------------------|
|type \| `{string}`             |要在单元格内生成的节点类型                                   | <div>* [ ] button</div>    - [x] link    `radio` `checkbox`    |
|uid \| `{string}`              |要在单元格内生成的节点的唯一标识，可用来保存id等                | `button` `link` `radio` `checkbox`    |
|name \| `{string}`             |radio和checkbox必须设置的属性，同HTML标签的name属性           | ~~`button`~~ `~~link~~` `radio` `checkbox`    |
|text \| `{string}`             |文本                                                       | button `link` `radio` `checkbox`    |
|value \| `{number\|string}`    |值、文本（input类标签需要设置此属性，同HTML标签的value）        | `button` link radio checkbox    |
|href \| `{string}`             |link类型的超链接地址（同HTML a标签的href）                    | button `link` radio checkbox    |
|className \| `{string}`        |样式表名                                                   | `button` `link` `radio` `checkbox`    |
|event \| `{string}`            |触发事件，需和`callback`配合使用                             | `button` `link` `radio` `checkbox`    |
|callback \| `{function}`       |触发事件后的回调函数，需和`event`配合使用，详细见`回调函数`介绍  | `button` `link` `radio` `checkbox`    |

**回调函数**

|callback(data, cellData, event)        |自定义事件的回调函数                                                   |
|---------------------------------------|-------------------------------------------------------------------- |
|data                                   |用于渲染组件的原始数据。需要用户自定义，这是预留的一种方式用来保留原始数据    |
|cellData                               |经过转换后用于渲染该单元格的数据对象                                     |
|event                                  |触发单元格绑定的事件后返回的event对象                                    |

#### props.property

|**property \| type**|default        |description                                                                          |
|--------------------------|---------------|-------------------------------------------------------------------------------------|
|**border \| Object**      |{...}          |`边框`样式`全局配置`，包括组件内部的`行`和`单元格`（如果行/单元格未设置边框样式，则默认使用此全局配置)      |
|**style \| Object**       |{...}          |组件`最外层容器`的样式                                                                   |
|**speed \| Number**       |50             |组件滚动速度                                                                          |
|**isScroll \| Boolean**   |true           |是否开启组件滚动(当所有行的高度超过组件可视区域高度时生效)                                  |
|**header \| Object**      |{...}          |header设置                                                                            |
|**header.show \| Boolean**      |true          |是否显示header。为true时，`props.data`的第一个数据集为列表头数据                                                                        |
|**header.style \| Object**      |{...}          |header内`行的样式`                                                                            |
|**header.cellStyle \| Object**      |{...}          |header内`单元格的样式`。`注意`：此style里面的width将失效，因本组件的header单元格宽度自动根据body内单元格宽度进行适配，如要设置每一列单元格宽度，请见                                                                       |
|**body \| Object**        |{...}          |body设置                                                                              |
|**body.row \| Object**        |{...}          |body内`行设置`                                                                             |
|**body.row.transition \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.spacing \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.rowCheckBox \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.style \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.specialStyle \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.visual \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.visual.show \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.visual.interval \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.visual.style \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.silent \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.silent.show \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.silent.style \| Boolean**        |true         |是否开启body内`行的加载动画`                                                                             |
|**body.row.serialNumber \| Object**        |{...}         |body内`行号`设置                                                       |
|**body.row.serialNumber.show \| Boolean**        |false         |是否显示`行号`                                                        |
|**body.row.serialNumber.formatter \| String**        |'{index}.'         |行号格式化。`{index}`解析为从0依次递增的数字                                                      |
|**body.row.serialNumber.style \| String**        |'{index}.'         |行号格式化。`{index}`解析为从0依次递增的数字                                                      |
|**body.row.serialNumber.specialStyle \| String**        |'{index}.'         |行号格式化。`{index}`解析为从0依次递增的数字                                                      |
|**body.cellOfColumn \| String**        |'{index}.'         |行号格式化。`{index}`解析为从0依次递增的数字                                                      |
|**body.cellOfColumn.style \| String**        |'{index}.'         |行号格式化。`{index}`解析为从0依次递增的数字                                                      |
|**body.cell \| String**        |'{index}.'         |行号格式化。`{index}`解析为从0依次递增的数字                                                      |
|**body.cell.style \| String**        |'{index}.'         |行号格式化。`{index}`解析为从0依次递增的数字                                                      |
|**body.cell.style.width \| String**        |'{index}.'         |行号格式化。`{index}`解析为从0依次递增的数字                                                      |
|**body.cell.iconStyle \| String**        |'{index}.'         |行号格式化。`{index}`解析为从0依次递增的数字                                                      |

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
