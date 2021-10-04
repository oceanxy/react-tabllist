/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: demo
 * @Date: 2019-01-14 17:47:41
 * @LastModified: Oceanxy(xyzsyx@163.com)
 * @LastModifiedTime: 2021-10-04 周一 15:56:55
 */

import hljs from 'highlight.js'
import 'highlight.js/lib/languages/javascript.js'
import 'highlight.js/styles/rainbow.css'
import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import Tabllist from '../../src'
import demo10_listHeaderBg from './images/demo10_header_bg.png'
import demo7_header_bg from './images/demo7_header_bg.png'
import demo7_row_bg from './images/demo7_row_bg.png'
import demo8_header_bg from './images/demo8_row_bg.png'
import demo8_row_bg from './images/demo8_row_bg.png'
import rowBg from './images/row-bg.png'
import './index.scss'

hljs.initHighlightingOnLoad()

function listDataset() {
  let data = [
    {
      name: '方娜',
      tel: '18484784543',
      avatar: '',
      group: '第一组',
      groupId: 1,
      operator: [
        { id: 3985, name: '谢超' },
        { id: 3881, name: '雷强' },
        { id: 1041, name: '崔刚' },
        { id: 3827, name: '邱芳' },
        { id: 7939, name: '朱平' }
      ]
    },
    {
      name: '唐平',
      tel: '13275647322',
      avatar: '',
      group: '第二组',
      groupId: 2,
      operator: [
        { id: 3014, name: '顾静' },
        { id: 5308, name: '方平' },
        { id: 1782, name: '孟杰' },
        { id: 2748, name: '顾静' },
        { id: 9714, name: '石敏' }
      ]
    },
    {
      name: '万静',
      tel: '19847859400',
      avatar: '',
      group: '第三组',
      groupId: 3,
      operator: [
        { id: 8773, name: '梁平' },
        { id: 1138, name: '姜桂英' },
        { id: 6874, name: '许强' },
        { id: 9581, name: '梁霞' },
        { id: 7084, name: '黎丽' }
      ]
    },
    {
      name: '林超',
      tel: '15638574857',
      avatar: '',
      group: '第四组',
      groupId: 4,
      operator: [
        { id: 7123, name: '薛洋' },
        { id: 7536, name: '赵军' },
        { id: 7049, name: '石艳' },
        { id: 3993, name: '孟刚' },
        { id: 5374, name: '魏洋' }
      ]
    },
    {
      name: '贺平',
      tel: '13984657487',
      avatar: '',
      group: '第五组',
      groupId: 5,
      operator: [
        { id: 7491, name: '史静' },
        { id: 6634, name: '于娜' },
        { id: 6801, name: '江静' },
        { id: 4349, name: '郝勇' },
        { id: 7141, name: '马艳' }
      ]
    }
  ]
  const type = [
    { id: 1, name: '第一组' },
    { id: 2, name: '第二组' },
    { id: 3, name: '第三组' },
    { id: 4, name: '第四组' },
    { id: 5, name: '第五组' }
  ]

  data = data.map(d => {
    return {
      type: 'row',
      value: d.groupId,
      cells: [
        <div key="group_info" className="group_info">
          <div className="avatar">
            <img src={d.avatar} alt="" />
          </div>
          <div className="group_h">
            <p>小组：{d.group}</p>
            <p>小组长：{d.name}</p>
            <p>联系电话：{d.tel}</p>
          </div>
        </div>,
        <div key="group_p" className="group_p">
          <p>组员：</p>
          <p>
            {d.operator.reduce((str, pn) => ` ${str + pn.name} `, '')}
          </p>
        </div>
      ]
    }
  })

  data.unshift([
    '',
    {
      type: 'select',
      text: '切换小组：',
      className: 'group_select',
      option: (() => {
        return type.map((item) => {
          return {
            id: item.id,
            label: item.name,
            value: item.id
          }
        })
      })(),
      event: 'onChange',
      callback: (instance, objectUnit, event) => {
        // step 1: Get the value of select
        const { value } = event.target
        // step 2: According to the value of select to match the value of the corresponding row in the data,
        // 				 and then get the index of the row
        const { scrollTo, renderData } = instance
        for (let i = 0, k = renderData; i < k.length; i++) {
          if (_.isPlainObject(renderData[i]) && parseInt(renderData[i].value) === parseInt(value)) {
            // step 3: Call method scrolling list
            scrollTo(i - 1)
            break
          }
        }
      }
    }
  ])

  return data
}

const Demo = () => {
  const demo2 = {
    className: 'demo2',
    data: [
      ['1st column title', '2nd column title', '3rd column title'],
      ['row 1; column 1', 'row 1; column 2', 'row 1; column 3'],
      ['row 2; column 1', 'row 2; column 2', 'row 2; column 3'],
      ['row 3; column 1', 'row 3; column 2', 'row 3; column 3'],
      ['row 4; column 1', 'row 4; column 2', 'row 4; column 3'],
      ['row 5; column 1', 'row 5; column 2', 'row 5; column 3'],
      ['row 6; column 1', 'row 6; column 2', 'row 6; column 3'],
      ['row 7; column 1', 'row 7; column 2', 'row 7; column 3'],
      ['row 8; column 1', 'row 8; column 2', 'row 8; column 3'],
      ['row 9; column 1', 'row 9; column 2', 'row 9; column 3']
    ],
    property: {
      // The style of the outermost container
      style: {
        width: '100%',
        margin: '0 auto',
        height: 200,
        border: '1px solid #999999'
      },
      border: {
        borderWidth: 0
      },
      header: {
        show: true,
        style: {
          borderBottom: '1px solid #999999'
        },
        cellStyle: {
          fontWeight: 'bolder',
          fontSize: 20,
          color: '#333333'
        }
      },
      isScroll: false
    }
  }
  const demo3 = {
    className: 'demo3',
    data: [
      ['row 1; column 1', 'row 1; column 2', 'row 1; column 3'],
      ['row 2; column 1', 'row 2; column 2', 'row 2; column 3'],
      ['row 3; column 1', 'row 3; column 2', 'row 3; column 3'],
      ['row 4; column 1', 'row 4; column 2', 'row 4; column 3'],
      ['row 5; column 1', 'row 5; column 2', 'row 5; column 3'],
      ['row 6; column 1', 'row 6; column 2', 'row 6; column 3'],
      ['row 7; column 1', 'row 7; column 2', 'row 7; column 3'],
      ['row 8; column 1', 'row 8; column 2', 'row 8; column 3']
    ],
    property: {
      // The style of the outermost container
      style: {
        width: '100%',
        margin: '0 auto',
        height: 300,
        border: '1px solid #999999'
      },
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#999999'
      },
      header: {
        show: false
      },
      body: {
        row: {
          visual: {
            show: true,
            interval: 1,
            style: {
              backgroundColor: '#e8f4fc'
            }
          },
          silent: {
            show: false,
            style: {
              backgroundColor: '#bcf0fc'
            }
          }
        }
      },
      speed: 50,
      isScroll: true
    }
  }
  const demo4 = {
    className: 'demo4',
    data: [
      ['1st column', '2nd column', '3rd column', '4rd column'],
      ['row 1; column 1', 'row 1; column 2', 'row 1; column 3', 'row 1; column 4'],
      ['row 2; column 1', 'row 2; column 2', 'row 2; column 3', 'row 2; column 4'],
      ['row 3; column 1', 'row 3; column 2', 'row 3; column 3', 'row 3; column 4'],
      ['row 4; column 1', 'row 4; column 2', 'row 4; column 3', 'row 4; column 4'],
      ['row 5; column 1', 'row 5; column 2', 'row 5; column 3', 'row 5; column 4'],
      ['row 6; column 1', 'row 6; column 2', 'row 6; column 3', 'row 6; column 4'],
      ['row 7; column 1', 'row 7; column 2', 'row 7; column 3', 'row 7; column 4'],
      ['row 8; column 1', 'row 8; column 2', 'row 8; column 3', 'row 8; column 4'],
      ['row 9; column 1', 'row 9; column 2', 'row 9; column 3', 'row 9; column 4']
    ],
    property: {
      // The style of the outermost container
      style: {
        width: '100%',
        margin: '0 auto',
        height: 300,
        border: '1px solid #999999'
      },
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ededed'
      },
      header: {
        show: true,
        style: {
          backgroundColor: '#1693ff',
          height: 40,
          borderBottom: '1px solid #999999'
        },
        cellStyle: {
          color: '#ffffff',
          fontWeight: 'bolder',
          fontSize: 20
        }
      },
      body: {
        row: {
          serialNumber: {
            show: true,
            formatter: 'No.{index}',
            style: {
              backgroundColor: '#1693ff',
              color: '#ffffff',
              width: 80
            }
          },
          style: {
            height: 34
          },
          visual: {
            show: true,
            style: {
              backgroundColor: '#e8f4fc'
            }
          },
          silent: {
            style: {
              backgroundColor: '#bcf0fc'
            }
          }
        },
        cell: {
          style: {
            fontSize: 16,
            minWidth: 50,
            color: '#000000',
            textAlign: 'center',
            border: '',
            width: 'auto'
          }
        }
      },
      speed: 40,
      isScroll: true
    }
  }
  const demo5 = {
    className: 'demo5',
    data: [
      ['1st column', '2nd column', '3rd column', '4rd column'],
      [
        'row 1; column 1',
        'row 1; column 2',
        {
          type: 'link',
          text: 'I am a link',
          event: 'onClick',
          href: 'https://github.com/oceanxy/react-tabllist',
          className: 'test-link'
        },
        {
          type: 'button',
          uid: '',
          value: 'click me',
          className: 'test-btn',
          callback: () => {
            alert('hello react-tabllist')
          }
        }
      ],
      [
        'row 2; column 1', 'row 2; column 2',
        {
          type: 'link',
          text: 'I am a link',
          event: 'onClick',
          href: 'https://github.com/oceanxy/react-tabllist',
          className: 'test-link'
        },
        {
          type: 'button',
          uid: '',
          value: 'click me',
          className: 'test-btn',
          callback: () => {
            alert('hello react-tabllist')
          }
        }
      ],
      ['row 3; column 1', 'row 3; column 2', 'row 3; column 3', 'row 3; column 4'],
      [
        {
          type: 'link',
          text: 'I am a link',
          event: 'onClick',
          href: 'https://github.com/oceanxy/react-tabllist',
          className: 'test-link'
        },
        {
          type: 'button',
          uid: '',
          value: 'click me',
          className: 'test-btn',
          callback: () => {
            alert('hello react-tabllist')
          }
        }, 'row 4; column 3', 'row 4; column 4'
      ],
      [
        [
          {
            type: 'radio',
            uid: '',
            name: 'group1',
            text: 'radio group 1-1',
            className: 'test-radio'
          },
          {
            type: 'radio',
            uid: '',
            name: 'group1',
            text: 'radio group 2-1',
            className: 'test-radio'
          }
        ],
        'row 5; column 2',
        'row 5; column 3',
        'row 5; column 4'
      ],
      [
        [
          {
            type: 'radio',
            uid: '',
            name: 'group2',
            text: 'radio group 2-1',
            className: 'test-radio'
          },
          {
            type: 'radio',
            uid: '',
            name: 'group2',
            text: 'radio group 2-2',
            className: 'test-radio'
          }
        ],
        'row 6; column 2',
        'row 6; column 3',
        'row 6; column 4'
      ],
      [
        'row 7; column 1', 'row 7; column 2',
        {
          type: 'link',
          text: 'I am a link',
          event: 'onClick',
          href: 'https://github.com/oceanxy/react-tabllist',
          className: 'test-link'
        },
        {
          type: 'button',
          uid: '',
          value: 'click me',
          className: 'test-btn',
          callback: (instance, objectUnit, event) => {
            if (!objectUnit?.data) {
              objectUnit.data = 'data of button is undefined'
            }

            event.target.value = 'you clicked me!!'
            event.target.style.width = '150px'

            console.log(instance)
            console.log(objectUnit)
            console.log(event)

            alert('hello react-tabllist, Please check the console')
          }
        }
      ],
      ['row 8; column 1', 'row 8; column 2', 'row 8; column 3', 'row 8; column 4'],
      ['row 9; column 1', 'row 9; column 2', 'row 9; column 3', 'row 9; column 4']
    ],
    property: {
      // The style of the outermost container
      style: {
        width: '100%',
        margin: '0 auto',
        height: 300,
        border: '1px solid #999999'
      },
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ededed'
      },
      header: {
        show: true,
        style: {
          backgroundColor: '#1693ff',
          height: 40,
          borderBottom: '1px solid #999999'
        },
        cellStyle: {
          color: '#ffffff',
          fontWeight: 'bolder',
          fontSize: 20
        }
      },
      body: {
        row: {
          rowCheckbox: true,
          style: {
            height: 34
          },
          specialStyle: [
            { height: 60 },
            { height: 40 },
            { height: 80 },
            { height: 100 },
            { height: 50 },
            { height: 80 }
          ],
          visual: {
            show: true,
            style: {
              backgroundColor: '#e8f4fc'
            }
          },
          silent: {
            style: {
              backgroundColor: '#bcf0fc'
            }
          }
        },
        cell: {
          style: {
            fontSize: 16,
            minWidth: 50,
            color: '#000000',
            textAlign: 'center',
            border: '',
            width: [60, '50%', '25%', '10%']
          }
        }
      },
      speed: 40,
      isScroll: true
    }
  }
  const demo6 = {
    className: 'demo6',
    data: [
      [
        '1st column',
        '2nd column',
        '3rd column',
        {
          type: 'select',
          text: '4rd column',
          data: 123,
          className: '',
          option: [
            {
              id: '1',
              label: 'Scroll to the 2nd row',
              value: 0
            },
            {
              id: '2',
              label: 'Scroll to the 5rd row',
              value: 1
            },
            {
              id: '3',
              label: 'Scroll to the 7rd row',
              value: 2
            }
          ],
          event: 'onChange',
          callback: (instance, objectUnit, event) => {
            // step 1: Get the value of select
            const { value } = event.target
            // step 2: According to the value of select to match the value of the corresponding row in the data,
            // 				 and then get the index of the row
            const { scrollTo, renderData } = instance
            for (let i = 0, k = renderData; i < k.length; i++) {
              if (_.isPlainObject(renderData[i]) && parseInt(renderData[i].value) === parseInt(value)) {
                // step 3: Call method scrolling list
                scrollTo(i - 1)
                break
              }
            }
          }
        }
      ],
      [
        <span key="text-span">I am span</span>,
        <div key="event" onClick={() => alert('test JSX event')}>test JSX event</div>,
        <a key="link" href="http://www.xieyangogo.cn/react-tabllist/">I am link</a>,
        <div key="text-div">I am div</div>
      ],
      {
        type: 'row',
        data: 1,
        value: 0,
        event: 'onClick',
        callback: (instance, objectUnit, event) => {
          alert('test event of row')
          console.log(instance, objectUnit, event)
        },
        className: 'click-row',
        cells: [
          'row 1; column 1',
          {
            type: 'link',
            text: 'I am a first link',
            className: 'test-link',
            callback: () => {
              console.log('I am a first link')
            }
          },
          {
            type: 'link',
            text: 'I am a second link',
            href: 'https://github.com/oceanxy/react-tabllist',
            className: 'test-link'
          },
          {
            type: 'button',
            value: 'click me',
            className: 'test-btn',
            callback: () => {
              alert('hello react-tabllist')
            }
          }
        ]
      },
      [
        'row 2; column 1', 'row 2; column 2',
        {
          type: 'link',
          text: 'I am a link',
          href: 'https://github.com/oceanxy/react-tabllist',
          className: 'test-link'
        },
        {
          type: 'button',
          value: 'click me',
          className: 'test-btn',
          callback: () => {
            alert('hello react-tabllist')
          }
        }
      ],
      ['row 3; column 1', 'row 3; column 2', 'row 3; column 3', 'row 3; column 4'],
      {
        type: 'row',
        data: 1,
        value: 1,
        event: 'onClick',
        callback: (instance, objectUnit, event) => {
          alert('test event of row')
          console.log(instance, objectUnit, event)
        },
        className: 'click-row',
        cells: [
          {
            type: 'link',
            text: 'I am a link',
            href: 'https://github.com/oceanxy/react-tabllist',
            className: 'test-link'
          },
          {
            type: 'button',
            value: 'click me',
            className: 'test-btn',
            callback: () => {
              alert('hello react-tabllist')
            }
          }, 'row 4; column 3', 'row 4; column 4'
        ]
      },
      [
        [
          {
            type: 'radio',
            name: 'group1',
            text: 'radio group 1-1',
            className: 'test-radio'
          },
          {
            type: 'radio',
            name: 'group1',
            text: 'radio group 2-1',
            className: 'test-radio'
          }
        ],
        'row 5; column 2',
        'row 5; column 3',
        'row 5; column 4'
      ],
      {
        type: 'row',
        data: 1,
        value: 2,
        event: 'onClick',
        callback: (instance, objectUnit, event) => {
          alert('test event of row')
          console.log(instance, objectUnit, event)
        },
        className: 'click-row',
        cells: [
          [
            {
              type: 'radio',
              name: 'group2',
              text: 'radio group 2-1',
              className: 'test-radio'
            },
            {
              type: 'radio',
              name: 'group2',
              text: 'radio group 2-2',
              className: 'test-radio'
            }
          ],
          'row 6; column 2',
          'row 6; column 3',
          'row 6; column 4'
        ]
      },
      [
        [
          {
            type: 'checkbox',
            name: 'chkxxx',
            text: 'chk1'
          },
          {
            type: 'checkbox',
            name: 'chkxxx',
            text: 'chk2'
          },
          {
            type: 'checkbox',
            name: 'chkxxx',
            text: 'chk3'
          }
        ],
        {
          type: 'link',
          text: 'I am a link',
          event: 'onClick',
          className: 'test-link',
          callback: () => {
            alert('clicked link')
          }
        },
        {
          type: 'button',
          value: 'click me',
          className: 'test-btn',
          callback: (instance, objectUnit, event) => {
            if (!objectUnit.data) {
              objectUnit.data = 'data of button is undefined'
            }

            event.target.value = 'you clicked me!!'
            event.target.style.width = '150px'

            console.log(instance, objectUnit, event)

            alert('hello react-tabllist, Please check the console')
          }
        }
      ],
      ['row 8; column 1', 'row 8; column 2', 'row 8; column 3', 'row 8; column 4'],
      ['row 9; column 1', 'row 9; column 2', 'row 9; column 3', 'row 9; column 4']
    ],
    property: {
      // The style of the outermost container
      style: {
        width: '100%',
        margin: '0 auto',
        height: 550,
        border: '1px solid #999999'
      },
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ededed'
      },
      header: {
        show: true,
        style: {
          backgroundColor: '#1693ff',
          height: 40,
          borderBottom: '1px solid #999999'
        },
        cellStyle: {
          color: '#ffffff',
          fontWeight: 'bolder',
          fontSize: 20
        }
      },
      body: {
        row: {
          rowCheckBox: true,
          onClick: () => {
          }, // 仅在1.2.0版本生效，此处用于测试控制台打印警告信息
          style: {
            height: 34
          },
          serialNumber: {
            show: true,
            formatter: 'No.{index}',
            style: {
              backgroundColor: '#3991ff',
              fontSize: 20,
              color: '#2cff41'
            },
            specialStyle: [
              {
                backgroundColor: '#203d7b'
              },
              {
                backgroundColor: '#2f4c99'
              },
              {
                backgroundColor: '#3960c0'
              }
            ]
          },
          specialStyle: [
            { height: 60 },
            { height: 40 },
            { height: 80 },
            { height: 100 },
            { height: 50 },
            { height: 80 }
          ],
          visual: {
            show: true,
            style: {
              backgroundColor: '#e8f4fc'
            }
          },
          silent: {
            style: {
              backgroundColor: '#bcf0fc'
            }
          }
        },
        cell: {
          style: {
            fontSize: 16,
            minWidth: 50,
            color: '#000000',
            textAlign: 'center',
            border: '',
            width: [60, 60, '30%', '25%', '10%']
          }
        }
      },
      scroll: {
        enable: true,
        speed: 2000,
        distance: -1
      }
    }
  }

  const case1 = {
    className: 'case1',
    data: _.range(7).map((i) => {
      return [
        {
          type: 'link',
          uid: '',
          text: `test title ${i + 1}`,
          event: 'onClick',
          className: 'link',
          data: {
            datetime: '2019-01-17 17:58',
            author: 'Oceanxy'
          },
          callback: (instance, objectUnit) => {
            alert(` author: ${objectUnit.data.author},\n datetime: ${objectUnit.data.datetime}`)
          }
        },
        {
          type: 'button',
          uid: '',
          value: `test button ${i + 1}`,
          className: 'btn',
          data: {
            message: `you clicked button ${i + 1} !`
          },
          callback: (instance, objectUnit) => {
            alert(`${objectUnit.data.message}`)
          }
        }
      ]
    }),
    property: {
      style: {
        padding: 10,
        border: 'none',
        background: '#060719',
        width: 450,
        height: 410,
        margin: 0
      },
      border: {
        borderWidth: 0
      },
      header: {
        show: false
      },
      body: {
        row: {
          style: {
            height: 40,
            background: `url(${rowBg}) no-repeat center / 100% 100%`
          },
          spacing: 10
        },
        cell: {
          style: {
            textDecoration: 'none',
            color: '#ffffff',
            width: ',38%'
          }
        },
        cellOfColumn: {
          style: [{ textIndent: '2em', textAlign: 'left' }, { textAlign: 'center' }]
        }
      }
    }
  }
  const case2 = {
    className: 'case2',
    data: (() => {
      const arr = _.range(7).map((i) => {
        return ['企业名称' + i, '积分' + i, '车牌' + i]
      })

      arr.unshift(['企业名称', '积分', '车牌'])

      return arr
    })(),
    property: {
      style: {
        padding: 10,
        border: 'none',
        background: '#060719',
        width: 558,
        height: 350,
        margin: 0
      },
      border: {
        borderWidth: 0
      },
      header: {
        show: true,
        style: {
          height: 50,
          background: `url(${demo7_header_bg}) no-repeat center / 100% 100%`
        },
        cellStyle: {
          color: '#ffffff'
        }
      },
      body: {
        row: {
          style: {
            height: 44,
            background: `url(${demo7_row_bg}) no-repeat center / 100% 100%`
          },
          spacing: 10
        },
        cell: {
          style: {
            color: '#ffffff',
            width: '35%,35%',
            textAlign: 'center'
          }
        }
      }
    }
  }
  const case3 = {
    className: 'case3',
    data: (() => {
      const arr = _.range(7).map((i) => {
        return [Math.random() * 1000, '种类' + i, '车牌' + i, '归属地' + i, '行驶地' + i, '预警时间' + i]
      })

      arr.unshift(['序号', '种类', '车牌号', '归属地', '行驶地', '预警时间'])

      return arr
    })(),
    property: {
      style: {
        padding: 10,
        border: 'none',
        background: '#060719',
        width: 1180,
        height: 350,
        margin: 0
      },
      border: {
        borderWidth: 0
      },
      header: {
        show: true,
        style: {
          height: 50,
          background: `url(${demo8_header_bg}) no-repeat center / 100% 100%`
        },
        cellStyle: {
          color: '#ffffff'
        }
      },
      body: {
        row: {
          style: {
            height: 44,
            background: `url(${demo8_row_bg}) no-repeat center / 100% 100%`
          },
          spacing: 10
        },
        cell: {
          style: {
            color: '#ffffff',
            width: '16.6%, 16.6%, 16.6%, 16.6%, 16.6%',
            textAlign: 'center'
          }
        }
      }
    }
  }
  const pt = {
    className: 'pt',
    data: listDataset(),
    property: {
      scroll: {
        enable: true,
        speed: 2000,
        distance: -1
      },
      style: {
        width: '100%',
        height: 234,
        padding: '10px 20px'
      },
      border: {
        borderWidth: 0
      },
      header: {
        show: true,
        style: {
          height: 54,
          background: `url(${demo10_listHeaderBg}) no-repeat center / 100% 100%`
        },
        cellStyle: {
          color: '#81b8e2',
          fontSize: '28px'
        }
      },
      body: {
        row: {
          spacing: 0,
          visual: {
            show: true,
            style: {
              backgroundColor: 'none'
            }
          },
          style: {
            height: 138
          }
        },
        cell: {
          style: {
            color: '#ffffff',
            width: [188, 400, 180, 180, 180],
            textAlign: 'left',
            padding: '10px 0',
            fontSize: '24px'
          }
        }
      }
    }
  }

  return (
    <div className="container">
      <h1>demo1：default</h1>
      <Tabllist />
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '  className: \'demo1\',\n' +
            '  data: [],\n' +
            '  property: {}\n' +
            '}'
          }
        </code>
      </pre>

      <h1>demo2：Basic use</h1>
      <Tabllist {...demo2} />
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '  className: \'demo2\',\n' +
            '  data: [\n' +
            '    [\'1st column title\', \'2nd column title\', \'3rd column title\'],\n' +
            '    [\'row 1; column 1\', \'row 1; column 2\', \'row 1; column 3\'],\n' +
            '    [\'row 2; column 1\', \'row 2; column 2\', \'row 2; column 3\'],\n' +
            '    [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\'],\n' +
            '    [\'row 4; column 1\', \'row 4; column 2\', \'row 4; column 3\'],\n' +
            '    [\'row 5; column 1\', \'row 5; column 2\', \'row 5; column 3\'],\n' +
            '    [\'row 6; column 1\', \'row 6; column 2\', \'row 6; column 3\'],\n' +
            '    [\'row 7; column 1\', \'row 7; column 2\', \'row 7; column 3\'],\n' +
            '    [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\'],\n' +
            '    [\'row 9; column 1\', \'row 9; column 2\', \'row 9; column 3\']\n' +
            '  ],\n' +
            '  property: {\n' +
            '    // The style of the outermost container\n' +
            '    style: {\n' +
            '      width: \'100%\',\n' +
            '      margin: \'0 auto\',\n' +
            '      height: 200,\n' +
            '      border: \'1px solid #999999\'\n' +
            '    },\n' +
            '    isScroll: false,\n' +
            '    border: {\n' +
            '      borderWidth: 0\n' +
            '    },\n' +
            '    header: {\n' +
            '      show: true,\n' +
            '      style: {\n' +
            '        borderBottom: \'1px solid #999999\'\n' +
            '      },\n' +
            '      cellStyle: {\n' +
            '        fontWeight: \'bolder\',\n' +
            '        fontSize: 20,\n' +
            '        color: \'#333333\'\n' +
            '      }\n' +
            '    }\n' +
            '  }\n' +
            '}'
          }
        </code>
      </pre>

      <h1>demo3：Cell border and row background color</h1>
      <Tabllist {...demo3} />
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '  className: \'demo3\',\n' +
            '  data: [\n' +
            '    [\'row 1; column 1\', \'row 1; column 2\', \'row 1; column 3\'],\n' +
            '    [\'row 2; column 1\', \'row 2; column 2\', \'row 2; column 3\'],\n' +
            '    [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\'],\n' +
            '    [\'row 4; column 1\', \'row 4; column 2\', \'row 4; column 3\'],\n' +
            '    [\'row 5; column 1\', \'row 5; column 2\', \'row 5; column 3\'],\n' +
            '    [\'row 6; column 1\', \'row 6; column 2\', \'row 6; column 3\'],\n' +
            '    [\'row 7; column 1\', \'row 7; column 2\', \'row 7; column 3\'],\n' +
            '    [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\']\n' +
            '  ],\n' +
            '  property: {\n' +
            '    // The style of the outermost container\n' +
            '    style: {\n' +
            '      width: \'100%\',\n' +
            '      margin: \'0 auto\',\n' +
            '      height: 300,\n' +
            '      border: \'1px solid #999999\'\n' +
            '    },\n' +
            '    speed: 50,\n' +
            '    isScroll: true,\n' +
            '    border: {\n' +
            '      borderWidth: 1,\n' +
            '      borderStyle: \'solid\',\n' +
            '      borderColor: \'#999999\'\n' +
            '    },\n' +
            '    header: {\n' +
            '      show: false\n' +
            '    },\n' +
            '    body: {\n' +
            '      row: {\n' +
            '        visual: {\n' +
            '          show: true,\n' +
            '          interval: 1,\n' +
            '          style: {\n' +
            '            backgroundColor: \'#E8F4FC\'\n' +
            '          }\n' +
            '        },\n' +
            '        silent: {\n' +
            '          show: false,\n' +
            '          style: {\n' +
            '            backgroundColor: \'#bcf0fc\'\n' +
            '          }\n' +
            '        }\n' +
            '      }\n' +
            '    }\n' +
            '  }\n' +
            '}'
          }
        </code>
      </pre>

      <h1>demo4：Serial number and scrollable list</h1>
      <Tabllist {...demo4} />
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '  className: \'demo4\',\n' +
            '  data: [\n' +
            '    [\'1st column\', \'2nd column\', \'3rd column\', \'4rd column\'],\n' +
            '    [\'row 1; column 1\', \'row 1; column 2\', \'row 1; column 3\', \'row 1; column 4\'],\n' +
            '    [\'row 2; column 1\', \'row 2; column 2\', \'row 2; column 3\', \'row 2; column 4\'],\n' +
            '    [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\', \'row 3; column 4\'],\n' +
            '    [\'row 4; column 1\', \'row 4; column 2\', \'row 4; column 3\', \'row 4; column 4\'],\n' +
            '    [\'row 5; column 1\', \'row 5; column 2\', \'row 5; column 3\', \'row 5; column 4\'],\n' +
            '    [\'row 6; column 1\', \'row 6; column 2\', \'row 6; column 3\', \'row 6; column 4\'],\n' +
            '    [\'row 7; column 1\', \'row 7; column 2\', \'row 7; column 3\', \'row 7; column 4\'],\n' +
            '    [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\', \'row 8; column 4\'],\n' +
            '    [\'row 9; column 1\', \'row 9; column 2\', \'row 9; column 3\', \'row 9; column 4\']\n' +
            '  ],\n' +
            '  property: {\n' +
            '    // The style of the outermost container\n' +
            '    style: {\n' +
            '      width: \'100%\',\n' +
            '      margin: \'0 auto\',\n' +
            '      height: 300,\n' +
            '      border: \'1px solid #999999\'\n' +
            '    },\n' +
            '    speed: 40,\n' +
            '    isScroll: true,\n' +
            '    border: {\n' +
            '      borderWidth: 1,\n' +
            '      borderStyle: \'solid\',\n' +
            '      borderColor: \'#ededed\'\n' +
            '    },\n' +
            '    header: {\n' +
            '      show: true,\n' +
            '      style: {\n' +
            '        backgroundColor: \'#1693ff\',\n' +
            '        height: 40,\n' +
            '        borderBottom: \'1px solid #999999\'\n' +
            '      },\n' +
            '      cellStyle: {\n' +
            '        color: \'#ffffff\',\n' +
            '        fontWeight: \'bolder\',\n' +
            '        fontSize: 20\n' +
            '      }\n' +
            '    },\n' +
            '    body: {\n' +
            '      row: {\n' +
            '        serialNumber: {\n' +
            '          show: true,\n' +
            '          formatter: \'No.{index}\',\n' +
            '          style: {\n' +
            '            backgroundColor: \'#1693ff\',\n' +
            '            color: \'#ffffff\',\n' +
            '            width: 80\n' +
            '          }\n' +
            '        },\n' +
            '        style: {\n' +
            '          height: 34\n' +
            '        },\n' +
            '        visual: {\n' +
            '          show: true,\n' +
            '          style: {\n' +
            '            backgroundColor: \'#E8F4FC\'\n' +
            '          }\n' +
            '        },\n' +
            '        silent: {\n' +
            '          style: {\n' +
            '            backgroundColor: \'#bcf0fc\'\n' +
            '          }\n' +
            '        }\n' +
            '      },\n' +
            '      cell: {\n' +
            '        style: {\n' +
            '          fontSize: 16,\n' +
            '          minWidth: 50,\n' +
            '          color: \'#000000\',\n' +
            '          textAlign: \'center\',\n' +
            '          border: \'\',\n' +
            '          width: \'auto\'\n' +
            '        }\n' +
            '      }\n' +
            '    }\n' +
            '  }\n' +
            '}'
          }
        </code>
      </pre>

      <h1>demo5：Object cell: Add another tag to the cell</h1>
      <Tabllist {...demo5} />
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '   className: \'demo5\',\n' +
            '   data: [\n' +
            '      [\'1st column\', \'2nd column\', \'3rd column\', \'4rd column\'],\n' +
            '      [\n' +
            '         \'row 1; column 1\',\n' +
            '         \'row 1; column 2\',\n' +
            '         {\n' +
            '            type: \'link\',\n' +
            '            text: \'I am a link\',\n' +
            '            event: \'onClick\',\n' +
            '            href: \'https://github.com/oceanxy/react-tabllist\',\n' +
            '            className: \'test-link\'\n' +
            '         },\n' +
            '         {\n' +
            '            type: \'button\',\n' +
            '            uid: \'\',\n' +
            '            value: \'click me\',\n' +
            '            className: \'test-btn\',\n' +
            '            callback: () => {\n' +
            '               alert(\'hello react-tabllist\')\n' +
            '            }\n' +
            '         }\n' +
            '      ],\n' +
            '      [\n' +
            '         \'row 2; column 1\', \'row 2; column 2\',\n' +
            '         {\n' +
            '            type: \'link\',\n' +
            '            text: \'I am a link\',\n' +
            '            event: \'onClick\',\n' +
            '            href: \'https://github.com/oceanxy/react-tabllist\',\n' +
            '            className: \'test-link\'\n' +
            '         },\n' +
            '         {\n' +
            '            type: \'button\',\n' +
            '            uid: \'\',\n' +
            '            value: \'click me\',\n' +
            '            className: \'test-btn\',\n' +
            '            callback: () => {\n' +
            '               alert(\'hello react-tabllist\')\n' +
            '            }\n' +
            '         }\n' +
            '      ],\n' +
            '      [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\', \'row 3; column 4\'],\n' +
            '      [\n' +
            '         {\n' +
            '            type: \'link\',\n' +
            '            text: \'I am a link\',\n' +
            '            event: \'onClick\',\n' +
            '            href: \'https://github.com/oceanxy/react-tabllist\',\n' +
            '            className: \'test-link\'\n' +
            '         },\n' +
            '         {\n' +
            '            type: \'button\',\n' +
            '            uid: \'\',\n' +
            '            value: \'click me\',\n' +
            '            className: \'test-btn\',\n' +
            '            callback: () => {\n' +
            '               alert(\'hello react-tabllist\')\n' +
            '            }\n' +
            '         }, \'row 4; column 3\', \'row 4; column 4\'\n' +
            '      ],\n' +
            '      [\n' +
            '         [\n' +
            '            {\n' +
            '               type: \'radio\',\n' +
            '               uid: \'\',\n' +
            '               name: \'group1\',\n' +
            '               text: \'radio group 1-1\',\n' +
            '               className: \'test-radio\'\n' +
            '            },\n' +
            '            {\n' +
            '               type: \'radio\',\n' +
            '               uid: \'\',\n' +
            '               name: \'group1\',\n' +
            '               text: \'radio group 2-1\',\n' +
            '               className: \'test-radio\'\n' +
            '            }\n' +
            '         ],\n' +
            '         \'row 5; column 2\',\n' +
            '         \'row 5; column 3\',\n' +
            '         \'row 5; column 4\'\n' +
            '      ],\n' +
            '      [\n' +
            '         [\n' +
            '            {\n' +
            '               type: \'radio\',\n' +
            '               uid: \'\',\n' +
            '               name: \'group2\',\n' +
            '               text: \'radio group 2-1\',\n' +
            '               className: \'test-radio\'\n' +
            '            },\n' +
            '            {\n' +
            '               type: \'radio\',\n' +
            '               uid: \'\',\n' +
            '               name: \'group2\',\n' +
            '               text: \'radio group 2-2\',\n' +
            '               className: \'test-radio\'\n' +
            '            }\n' +
            '         ],\n' +
            '         \'row 6; column 2\',\n' +
            '         \'row 6; column 3\',\n' +
            '         \'row 6; column 4\'\n' +
            '      ],\n' +
            '      [\n' +
            '         \'row 7; column 1\', \'row 7; column 2\',\n' +
            '         {\n' +
            '            type: \'link\',\n' +
            '            text: \'I am a link\',\n' +
            '            event: \'onClick\',\n' +
            '            href: \'https://github.com/oceanxy/react-tabllist\',\n' +
            '            className: \'test-link\'\n' +
            '         },\n' +
            '         {\n' +
            '            type: \'button\',\n' +
            '            uid: \'\',\n' +
            '            value: \'click me\',\n' +
            '            className: \'test-btn\',\n' +
            '            callback: (instance, objectUnit, event) => {\n' +
            '               if(!data) {\n' +
            '                  data = \'data of button is undefined\'\n' +
            '               }\n' +
            '\n' +
            '               event.target.value = \'you clicked me!!\'\n' +
            '               event.target.style.width = \'150px\'\n' +
            '\n' +
            '               console.log(instance)\n' +
            '               console.log(objectUnit)\n' +
            '               console.log(event)\n' +
            '\n' +
            '               alert(\'hello react-tabllist, Please check the console\')\n' +
            '            }\n' +
            '         }\n' +
            '      ],\n' +
            '      [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\', \'row 8; column 4\'],\n' +
            '      [\'row 9; column 1\', \'row 9; column 2\', \'row 9; column 3\', \'row 9; column 4\']\n' +
            '   ],\n' +
            '   property: {\n' +
            '      // The style of the outermost container\n' +
            '      style: {\n' +
            '         width: \'100%\',\n' +
            '         margin: \'0 auto\',\n' +
            '         height: 300,\n' +
            '         border: \'1px solid #999999\'\n' +
            '      },\n' +
            '      border: {\n' +
            '         borderWidth: 1,\n' +
            '         borderStyle: \'solid\',\n' +
            '         borderColor: \'#ededed\'\n' +
            '      },\n' +
            '      header: {\n' +
            '         show: true,\n' +
            '         style: {\n' +
            '            backgroundColor: \'#1693ff\',\n' +
            '            height: 40,\n' +
            '            borderBottom: \'1px solid #999999\'\n' +
            '         },\n' +
            '         cellStyle: {\n' +
            '            color: \'#ffffff\',\n' +
            '            fontWeight: \'bolder\',\n' +
            '            fontSize: 20\n' +
            '         }\n' +
            '      },\n' +
            '      body: {\n' +
            '         row: {\n' +
            '            rowCheckbox: true,\n' +
            '            style: {\n' +
            '               height: 34\n' +
            '            },\n' +
            '            specialStyle: [\n' +
            '               { height: 60 },\n' +
            '               { height: 40 },\n' +
            '               { height: 80 },\n' +
            '               { height: 100 },\n' +
            '               { height: 50 },\n' +
            '               { height: 80 }\n' +
            '            ],\n' +
            '            visual: {\n' +
            '               show: true,\n' +
            '               style: {\n' +
            '                  backgroundColor: \'#e8f4fc\'\n' +
            '               }\n' +
            '            },\n' +
            '            silent: {\n' +
            '               style: {\n' +
            '                  backgroundColor: \'#bcf0fc\'\n' +
            '               }\n' +
            '            }\n' +
            '         },\n' +
            '         cell: {\n' +
            '            style: {\n' +
            '               fontSize: 16,\n' +
            '               minWidth: 50,\n' +
            '               color: \'#000000\',\n' +
            '               textAlign: \'center\',\n' +
            '               border: \'\',\n' +
            '               width: [60, \'50%\', \'25%\', \'10%\']\n' +
            '            }\n' +
            '         }\n' +
            '      },\n' +
            '      speed: 40,\n' +
            '      isScroll: true\n' +
            '   }\n' +
            '}'
          }
        </code>
      </pre>

      <h1>demo6：object unit for select and scroll to the specified row</h1>
      <Tabllist {...demo6} />
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '   className: \'demo6\',\n' +
            '   data: [\n' +
            '      [\n' +
            '         \'1st column\',\n' +
            '         \'2nd column\',\n' +
            '         \'3rd column\',\n' +
            '         {\n' +
            '            type: \'select\',\n' +
            '            text: \'4rd column\',\n' +
            '            data: 123,\n' +
            '            className: \'\',\n' +
            '            option: [\n' +
            '               {\n' +
            '                  id: \'1\',\n' +
            '                  label: \'Scroll to the 2nd row\',\n' +
            '                  value: 0\n' +
            '               },\n' +
            '               {\n' +
            '                  id: \'2\',\n' +
            '                  label: \'Scroll to the 5rd row\',\n' +
            '                  value: 1\n' +
            '               },\n' +
            '               {\n' +
            '                  id: \'3\',\n' +
            '                  label: \'Scroll to the 7rd row\',\n' +
            '                  value: 2\n' +
            '               }\n' +
            '            ],\n' +
            '            event: \'onChange\',\n' +
            '            callback: (instance, objectUnit, event) => {\n' +
            '               // step 1: Get the value of select\n' +
            '               const { value } = event.target\n' +
            '               // step 2: According to the value of select to match the value of the corresponding row in the data,\n' +
            '               //              and then get the index of the row\n' +
            '               const { scrollTo, renderData } = instance\n' +
            '               for(let i = 0, k = renderData; i < k.length; i++) {\n' +
            '                  if(_.isPlainObject(renderData[i]) && parseInt(renderData[i].value) === parseInt(value)) {\n' +
            '                     // step 3: Call method scrolling list\n' +
            '                     scrollTo(i - 1)\n' +
            '                     break\n' +
            '                  }\n' +
            '               }\n' +
            '            }\n' +
            '         }\n' +
            '      ],\n' +
            '      [\n' +
            '         <span>I am span</span>,\n' +
            '         <div onClick={() => alert(\'test JSX event\')}>test JSX event</div>,\n' +
            '         <a href=\'http://www.xieyangogo.cn/react-tabllist/\'>I am link</a>,\n' +
            '         <div>I am div</div>\n' +
            '      ],\n' +
            '      {\n' +
            '         type: \'row\',\n' +
            '         data: 1,\n' +
            '         value: 0,\n' +
            '         event: \'onClick\',\n' +
            '         callback: (instance, objectUnit, event) => {\n' +
            '            alert(\'test event of row\')\n' +
            '            console.log(instance, objectUnit, event)\n' +
            '         },\n' +
            '         className: \'click-row\',\n' +
            '         cells: [\n' +
            '            \'row 1; column 1\',\n' +
            '            {\n' +
            '               type: \'link\',\n' +
            '               text: \'I am a first link\',\n' +
            '               className: \'test-link\',\n' +
            '               callback: () => {console.log(\'I am a first link\')}\n' +
            '            },\n' +
            '            {\n' +
            '               type: \'link\',\n' +
            '               text: \'I am a second link\',\n' +
            '               href: \'https://github.com/oceanxy/react-tabllist\',\n' +
            '               className: \'test-link\'\n' +
            '            },\n' +
            '            {\n' +
            '               type: \'button\',\n' +
            '               value: \'click me\',\n' +
            '               className: \'test-btn\',\n' +
            '               callback: () => {\n' +
            '                  alert(\'hello react-tabllist\')\n' +
            '               }\n' +
            '            }\n' +
            '         ]\n' +
            '      },\n' +
            '      [\n' +
            '         \'row 2; column 1\', \'row 2; column 2\',\n' +
            '         {\n' +
            '            type: \'link\',\n' +
            '            text: \'I am a link\',\n' +
            '            href: \'https://github.com/oceanxy/react-tabllist\',\n' +
            '            className: \'test-link\'\n' +
            '         },\n' +
            '         {\n' +
            '            type: \'button\',\n' +
            '            value: \'click me\',\n' +
            '            className: \'test-btn\',\n' +
            '            callback: () => {\n' +
            '               alert(\'hello react-tabllist\')\n' +
            '            }\n' +
            '         }\n' +
            '      ],\n' +
            '      [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\', \'row 3; column 4\'],\n' +
            '      {\n' +
            '         type: \'row\',\n' +
            '         data: 1,\n' +
            '         value: 1,\n' +
            '         event: \'onClick\',\n' +
            '         callback: (instance, objectUnit, event) => {\n' +
            '            alert(\'test event of row\')\n' +
            '            console.log(instance, objectUnit, event)\n' +
            '         },\n' +
            '         className: \'click-row\',\n' +
            '         cells: [\n' +
            '            {\n' +
            '               type: \'link\',\n' +
            '               text: \'I am a link\',\n' +
            '               href: \'https://github.com/oceanxy/react-tabllist\',\n' +
            '               className: \'test-link\'\n' +
            '            },\n' +
            '            {\n' +
            '               type: \'button\',\n' +
            '               value: \'click me\',\n' +
            '               className: \'test-btn\',\n' +
            '               callback: () => {\n' +
            '                  alert(\'hello react-tabllist\')\n' +
            '               }\n' +
            '            }, \'row 4; column 3\', \'row 4; column 4\'\n' +
            '         ]\n' +
            '      },\n' +
            '      [\n' +
            '         [\n' +
            '            {\n' +
            '               type: \'radio\',\n' +
            '               name: \'group1\',\n' +
            '               text: \'radio group 1-1\',\n' +
            '               className: \'test-radio\'\n' +
            '            },\n' +
            '            {\n' +
            '               type: \'radio\',\n' +
            '               name: \'group1\',\n' +
            '               text: \'radio group 2-1\',\n' +
            '               className: \'test-radio\'\n' +
            '            }\n' +
            '         ],\n' +
            '         \'row 5; column 2\',\n' +
            '         \'row 5; column 3\',\n' +
            '         \'row 5; column 4\'\n' +
            '      ],\n' +
            '      {\n' +
            '         type: \'row\',\n' +
            '         data: 1,\n' +
            '         value: 2,\n' +
            '         event: \'onClick\',\n' +
            '         callback: (instance, objectUnit, event) => {\n' +
            '            alert(\'test event of row\')\n' +
            '            console.log(instance, objectUnit, event)\n' +
            '         },\n' +
            '         className: \'click-row\',\n' +
            '         cells: [\n' +
            '            [\n' +
            '               {\n' +
            '                  type: \'radio\',\n' +
            '                  name: \'group2\',\n' +
            '                  text: \'radio group 2-1\',\n' +
            '                  className: \'test-radio\'\n' +
            '               },\n' +
            '               {\n' +
            '                  type: \'radio\',\n' +
            '                  name: \'group2\',\n' +
            '                  text: \'radio group 2-2\',\n' +
            '                  className: \'test-radio\'\n' +
            '               }\n' +
            '            ],\n' +
            '            \'row 6; column 2\',\n' +
            '            \'row 6; column 3\',\n' +
            '            \'row 6; column 4\'\n' +
            '         ]\n' +
            '      },\n' +
            '      [\n' +
            '         [\n' +
            '            {\n' +
            '               type: \'checkbox\',\n' +
            '               name: \'chkxxx\',\n' +
            '               text: \'chk1\'\n' +
            '            },\n' +
            '            {\n' +
            '               type: \'checkbox\',\n' +
            '               name: \'chkxxx\',\n' +
            '               text: \'chk2\'\n' +
            '            },\n' +
            '            {\n' +
            '               type: \'checkbox\',\n' +
            '               name: \'chkxxx\',\n' +
            '               text: \'chk3\'\n' +
            '            }\n' +
            '         ],\n' +
            '         {\n' +
            '            type: \'link\',\n' +
            '            text: \'I am a link\',\n' +
            '            event: \'onClick\',\n' +
            '            className: \'test-link\',\n' +
            '            callback: () => {\n' +
            '               alert(\'clicked link\')\n' +
            '            }\n' +
            '         },\n' +
            '         {\n' +
            '            type: \'button\',\n' +
            '            value: \'click me\',\n' +
            '            className: \'test-btn\',\n' +
            '            callback: (instance, objectUnit, event) => {\n' +
            '               if(!objectUnit.data) {\n' +
            '                  objectUnit.data = \'data of button is undefined\'\n' +
            '               }\n' +
            '\n' +
            '               event.target.value = \'you clicked me!!\'\n' +
            '               event.target.style.width = \'150px\'\n' +
            '\n' +
            '               console.log(instance, objectUnit, event)\n' +
            '\n' +
            '               alert(\'hello react-tabllist, Please check the console\')\n' +
            '            }\n' +
            '         }\n' +
            '      ],\n' +
            '      [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\', \'row 8; column 4\'],\n' +
            '      [\'row 9; column 1\', \'row 9; column 2\', \'row 9; column 3\', \'row 9; column 4\']\n' +
            '   ],\n' +
            '   property: {\n' +
            '      // The style of the outermost container\n' +
            '      style: {\n' +
            '         width: \'100%\',\n' +
            '         margin: \'0 auto\',\n' +
            '         height: 550,\n' +
            '         border: \'1px solid #999999\'\n' +
            '      },\n' +
            '      border: {\n' +
            '         borderWidth: 1,\n' +
            '         borderStyle: \'solid\',\n' +
            '         borderColor: \'#ededed\'\n' +
            '      },\n' +
            '      header: {\n' +
            '         show: true,\n' +
            '         style: {\n' +
            '            backgroundColor: \'#1693ff\',\n' +
            '            height: 40,\n' +
            '            borderBottom: \'1px solid #999999\'\n' +
            '         },\n' +
            '         cellStyle: {\n' +
            '            color: \'#ffffff\',\n' +
            '            fontWeight: \'bolder\',\n' +
            '            fontSize: 20\n' +
            '         }\n' +
            '      },\n' +
            '      body: {\n' +
            '         row: {\n' +
            '            rowCheckBox: true,\n' +
            '            onClick: () => {}, // 仅在1.2.0版本生效，此处用于测试控制台打印警告信息\n' +
            '            style: {\n' +
            '               height: 34\n' +
            '            },\n' +
            '            serialNumber: {\n' +
            '               show: true,\n' +
            '               formatter: \'No.{index}\',\n' +
            '               style: {\n' +
            '                  backgroundColor: \'#3991ff\',\n' +
            '                  fontSize: 20,\n' +
            '                  color: \'#2cff41\'\n' +
            '               },\n' +
            '               specialStyle: [\n' +
            '                  {\n' +
            '                     backgroundColor: \'#203d7b\'\n' +
            '                  },\n' +
            '                  {\n' +
            '                     backgroundColor: \'#2f4c99\'\n' +
            '                  },\n' +
            '                  {\n' +
            '                     backgroundColor: \'#3960c0\'\n' +
            '                  }\n' +
            '               ]\n' +
            '            },\n' +
            '            specialStyle: [\n' +
            '               { height: 60 },\n' +
            '               { height: 40 },\n' +
            '               { height: 80 },\n' +
            '               { height: 100 },\n' +
            '               { height: 50 },\n' +
            '               { height: 80 }\n' +
            '            ],\n' +
            '            visual: {\n' +
            '               show: true,\n' +
            '               style: {\n' +
            '                  backgroundColor: \'#e8f4fc\'\n' +
            '               }\n' +
            '            },\n' +
            '            silent: {\n' +
            '               style: {\n' +
            '                  backgroundColor: \'#bcf0fc\'\n' +
            '               }\n' +
            '            }\n' +
            '         },\n' +
            '         cell: {\n' +
            '            style: {\n' +
            '               fontSize: 16,\n' +
            '               minWidth: 50,\n' +
            '               color: \'#000000\',\n' +
            '               textAlign: \'center\',\n' +
            '               border: \'\',\n' +
            '               width: [60, 60, \'30%\', \'25%\', \'10%\']\n' +
            '            }\n' +
            '         }\n' +
            '      },\n' +
            '      scroll: {\n' +
            '         enable: true,\n' +
            '         speed: 2000,\n' +
            '         distance: -1\n' +
            '      }\n' +
            '   }\n' +
            '}'
          }
        </code>
      </pre>

      <h1 style={{ color: 'blue', textAlign: 'center', margin: '4em 0 2em' }}>Use in actual projects</h1>
      <h2>Case 1</h2>
      <Tabllist {...case1} />
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '   className: \'case1\',\n' +
            '   data: _.range(7).map((i) => {\n' +
            '      return [\n' +
            '         {\n' +
            '            type: \'link\',\n' +
            '            uid: \'\',\n' +
            '            text: `test title ${i + 1}`,\n' +
            '            event: \'onClick\',\n' +
            '            className: \'link\',\n' +
            '            data: {\n' +
            '               datetime: \'2019-01-17 17:58\',\n' +
            '               author: \'Oceanxy\'\n' +
            '            },\n' +
            '            callback: (instance, objectUnit) => {\n' +
            '               alert(` author: ${objectUnit.data.author},\\n datetime: ${objectUnit.data.datetime}`)\n' +
            '            }\n' +
            '         },\n' +
            '         {\n' +
            '            type: \'button\',\n' +
            '            uid: \'\',\n' +
            '            value: `test button ${i + 1}`,\n' +
            '            className: \'btn\',\n' +
            '            data: {\n' +
            '               message: `you clicked button ${i + 1} !`\n' +
            '            },\n' +
            '            callback: (instance, objectUnit) => {\n' +
            '               alert(`${objectUnit.data.message}`)\n' +
            '            }\n' +
            '         }\n' +
            '      ]\n' +
            '   }),\n' +
            '   property: {\n' +
            '      style: {\n' +
            '         padding: 10,\n' +
            '         border: \'none\',\n' +
            '         background: \'#060719\',\n' +
            '         width: 450,\n' +
            '         height: 410,\n' +
            '         margin: 0\n' +
            '      },\n' +
            '      border: {\n' +
            '         borderWidth: 0\n' +
            '      },\n' +
            '      header: {\n' +
            '         show: false\n' +
            '      },\n' +
            '      body: {\n' +
            '         row: {\n' +
            '            style: {\n' +
            '               height: 40,\n' +
            '               background: `url(${rowBg}) no-repeat center / 100% 100%`\n' +
            '            },\n' +
            '            spacing: 10\n' +
            '         },\n' +
            '         cell: {\n' +
            '            style: {\n' +
            '               textDecoration: \'none\',\n' +
            '               color: \'#ffffff\',\n' +
            '               width: \',38%\'\n' +
            '            }\n' +
            '         },\n' +
            '         cellOfColumn: {\n' +
            '            style: [{ textIndent: \'2em\', textAlign: \'left\' }, { textAlign: \'center\' }]\n' +
            '         }\n' +
            '      }\n' +
            '   }\n' +
            '}'
          }
        </code>
      </pre>

      <h2>Case 2</h2>
      <Tabllist {...case2} />
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '   className: \'case2\',\n' +
            '   data: (() => {\n' +
            '      const arr = _.range(7).map((i) => {\n' +
            '         return [\'企业名称\' + i, \'积分\' + i, \'车牌\' + i]\n' +
            '      })\n' +
            '\n' +
            '      arr.unshift([\'企业名称\', \'积分\', \'车牌\'])\n' +
            '\n' +
            '      return arr\n' +
            '   })(),\n' +
            '   property: {\n' +
            '      style: {\n' +
            '         padding: 10,\n' +
            '         border: \'none\',\n' +
            '         background: \'#060719\',\n' +
            '         width: 558,\n' +
            '         height: 350,\n' +
            '         margin: 0\n' +
            '      },\n' +
            '      border: {\n' +
            '         borderWidth: 0\n' +
            '      },\n' +
            '      header: {\n' +
            '         show: true,\n' +
            '         style: {\n' +
            '            height: 50,\n' +
            '            background: `url(${demo7_header_bg}) no-repeat center / 100% 100%`\n' +
            '         },\n' +
            '         cellStyle: {\n' +
            '            color: \'#ffffff\'\n' +
            '         }\n' +
            '      },\n' +
            '      body: {\n' +
            '         row: {\n' +
            '            style: {\n' +
            '               height: 44,\n' +
            '               background: `url(${demo7_row_bg}) no-repeat center / 100% 100%`\n' +
            '            },\n' +
            '            spacing: 10\n' +
            '         },\n' +
            '         cell: {\n' +
            '            style: {\n' +
            '               color: \'#ffffff\',\n' +
            '               width: \'35%,35%\',\n' +
            '               textAlign: \'center\'\n' +
            '            }\n' +
            '         }\n' +
            '      }\n' +
            '   }\n' +
            '}'
          }
        </code>
      </pre>

      <h2>Case 3</h2>
      <Tabllist {...case3} />
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '   className: \'case3\',\n' +
            '   data: (() => {\n' +
            '      const arr = _.range(7).map((i) => {\n' +
            '         return [Math.random() * 1000, \'种类\' + i, \'车牌\' + i, \'归属地\' + i, \'行驶地\' + i, \'预警时间\' + i]\n' +
            '      })\n' +
            '\n' +
            '      arr.unshift([\'序号\', \'种类\', \'车牌号\', \'归属地\', \'行驶地\', \'预警时间\'])\n' +
            '\n' +
            '      return arr\n' +
            '   })(),\n' +
            '   property: {\n' +
            '      style: {\n' +
            '         padding: 10,\n' +
            '         border: \'none\',\n' +
            '         background: \'#060719\',\n' +
            '         width: 1180,\n' +
            '         height: 350,\n' +
            '         margin: 0\n' +
            '      },\n' +
            '      border: {\n' +
            '         borderWidth: 0\n' +
            '      },\n' +
            '      header: {\n' +
            '         show: true,\n' +
            '         style: {\n' +
            '            height: 50,\n' +
            '            background: `url(${demo8_header_bg}) no-repeat center / 100% 100%`\n' +
            '         },\n' +
            '         cellStyle: {\n' +
            '            color: \'#ffffff\'\n' +
            '         }\n' +
            '      },\n' +
            '      body: {\n' +
            '         row: {\n' +
            '            style: {\n' +
            '               height: 44,\n' +
            '               background: `url(${demo8_row_bg}) no-repeat center / 100% 100%`\n' +
            '            },\n' +
            '            spacing: 10\n' +
            '         },\n' +
            '         cell: {\n' +
            '            style: {\n' +
            '               color: \'#ffffff\',\n' +
            '               width: \'16.6%, 16.6%, 16.6%, 16.6%, 16.6%\',\n' +
            '               textAlign: \'center\'\n' +
            '            }\n' +
            '         }\n' +
            '      }\n' +
            '   }\n' +
            '}'
          }
        </code>
      </pre>

      <h2>Case 4</h2>
      <div className="case4">
        <Tabllist {...pt} />
      </div>
      <pre>
        <code className="javascript">
          {
            'const option = {\n' +
            '   className: \'pt\',\n' +
            '   data: listDataset(),\n' +
            '   property: {\n' +
            '      scroll: {\n' +
            '         enable: true,\n' +
            '         speed: 2000,\n' +
            '         distance: -1\n' +
            '      },\n' +
            '      style: {\n' +
            '         width: \'100%\',\n' +
            '         height: 234,\n' +
            '         padding: \'10px 20px\'\n' +
            '      },\n' +
            '      border: {\n' +
            '         borderWidth: 0\n' +
            '      },\n' +
            '      header: {\n' +
            '         show: true,\n' +
            '         style: {\n' +
            '            height: 54,\n' +
            '            background: `url(${demo10_listHeaderBg}) no-repeat center / 100% 100%`\n' +
            '         },\n' +
            '         cellStyle: {\n' +
            '            color: \'#81b8e2\',\n' +
            '            fontSize: \'28px\'\n' +
            '         }\n' +
            '      },\n' +
            '      body: {\n' +
            '         row: {\n' +
            '            spacing: 0,\n' +
            '            visual: {\n' +
            '               show: true,\n' +
            '               style: {\n' +
            '                  backgroundColor: \'none\'\n' +
            '               }\n' +
            '            },\n' +
            '            style: {\n' +
            '               height: 138\n' +
            '            }\n' +
            '         },\n' +
            '         cell: {\n' +
            '            style: {\n' +
            '               color: \'#ffffff\',\n' +
            '               width: [188, 400, 180, 180, 180],\n' +
            '               textAlign: \'left\',\n' +
            '               padding: \'10px 0\',\n' +
            '               fontSize: \'24px\'\n' +
            '            }\n' +
            '         }\n' +
            '      }\n' +
            '   }\n' +
            '}'
          }
        </code>
      </pre>
      <pre style={{ marginTop: 0 }}>
        <code className="javascript">
          {
            'function listDataset() {\n' +
            '   let data = [\n' +
            '      {\n' +
            '         name: \'方娜\',\n' +
            '         tel: \'18484784543\',\n' +
            '         avatar: \'\',\n' +
            '         group: \'第一组\',\n' +
            '         groupId: 1,\n' +
            '         operator: [\n' +
            '            { id: 3985, name: \'谢超\' },\n' +
            '            { id: 3881, name: \'雷强\' },\n' +
            '            { id: 1041, name: \'崔刚\' },\n' +
            '            { id: 3827, name: \'邱芳\' },\n' +
            '            { id: 7939, name: \'朱平\' }\n' +
            '         ]\n' +
            '      },\n' +
            '      {\n' +
            '         name: \'唐平\',\n' +
            '         tel: \'13275647322\',\n' +
            '         avatar: \'\',\n' +
            '         group: \'第二组\',\n' +
            '         groupId: 2,\n' +
            '         operator: [\n' +
            '            { id: 3014, name: \'顾静\' },\n' +
            '            { id: 5308, name: \'方平\' },\n' +
            '            { id: 1782, name: \'孟杰\' },\n' +
            '            { id: 2748, name: \'顾静\' },\n' +
            '            { id: 9714, name: \'石敏\' }\n' +
            '         ]\n' +
            '      },\n' +
            '      {\n' +
            '         name: \'万静\',\n' +
            '         tel: \'19847859400\',\n' +
            '         avatar: \'\',\n' +
            '         group: \'第三组\',\n' +
            '         groupId: 3,\n' +
            '         operator: [\n' +
            '            { id: 8773, name: \'梁平\' },\n' +
            '            { id: 1138, name: \'姜桂英\' },\n' +
            '            { id: 6874, name: \'许强\' },\n' +
            '            { id: 9581, name: \'梁霞\' },\n' +
            '            { id: 7084, name: \'黎丽\' }\n' +
            '         ]\n' +
            '      },\n' +
            '      {\n' +
            '         name: \'林超\',\n' +
            '         tel: \'15638574857\',\n' +
            '         avatar: \'\',\n' +
            '         group: \'第四组\',\n' +
            '         groupId: 4,\n' +
            '         operator: [\n' +
            '            { id: 7123, name: \'薛洋\' },\n' +
            '            { id: 7536, name: \'赵军\' },\n' +
            '            { id: 7049, name: \'石艳\' },\n' +
            '            { id: 3993, name: \'孟刚\' },\n' +
            '            { id: 5374, name: \'魏洋\' }\n' +
            '         ]\n' +
            '      },\n' +
            '      {\n' +
            '         name: \'贺平\',\n' +
            '         tel: \'13984657487\',\n' +
            '         avatar: \'\',\n' +
            '         group: \'第五组\',\n' +
            '         groupId: 5,\n' +
            '         operator: [\n' +
            '            { id: 7491, name: \'史静\' },\n' +
            '            { id: 6634, name: \'于娜\' },\n' +
            '            { id: 6801, name: \'江静\' },\n' +
            '            { id: 4349, name: \'郝勇\' },\n' +
            '            { id: 7141, name: \'马艳\' }\n' +
            '         ]\n' +
            '      }\n' +
            '   ]\n' +
            '\n' +
            '   const type = [\n' +
            '      { id: 1, name: \'第一组\' },\n' +
            '      { id: 2, name: \'第二组\' },\n' +
            '      { id: 3, name: \'第三组\' },\n' +
            '      { id: 4, name: \'第四组\' },\n' +
            '      { id: 5, name: \'第五组\' }\n' +
            '   ]\n' +
            '\n' +
            '   data = data.map(d => {\n' +
            '      return {\n' +
            '         type: \'row\',\n' +
            '         value: d.groupId,\n' +
            '         cells: [\n' +
            '            <div className=\'group_info\'>\n' +
            '               <div className=\'avatar\'>\n' +
            '                  <img src={d.avatar} alt=\'\' />\n' +
            '               </div>\n' +
            '               <div className=\'group_h\'>\n' +
            '                  <p>小组：{d.group}</p>\n' +
            '                  <p>小组长：{d.name}</p>\n' +
            '                  <p>联系电话：{d.tel}</p>\n' +
            '               </div>\n' +
            '            </div>,\n' +
            '            <div className=\'group_p\'>\n' +
            '               <p>组员：</p>\n' +
            '               <p>\n' +
            '                  {d.operator.reduce((str, pn) => ` ${str + pn.name} `, \'\')}\n' +
            '               </p>\n' +
            '            </div>\n' +
            '         ]\n' +
            '      }\n' +
            '   })\n'
          }
        </code>
      </pre>
      <pre style={{ marginTop: 0 }}>
        <code className="javascript">
          {
            '   data.unshift([\n' +
            '      \'\',\n' +
            '      {\n' +
            '         type: \'select\',\n' +
            '         text: \'切换小组：\',\n' +
            '         className: \'group_select\',\n' +
            '         option: (() => {\n' +
            '            return type.map((item) => {\n' +
            '               return {\n' +
            '                  id: item.id,\n' +
            '                  label: item.name,\n' +
            '                  value: item.id\n' +
            '               }\n' +
            '            })\n' +
            '         })(),\n' +
            '         event: \'onChange\',\n' +
            '         callback: (instance, objectUnit, event) => {\n' +
            '            // step 1: Get the value of select\n' +
            '            const { value } = event.target\n' +
            '            // step 2: According to the value of select to match the value of the corresponding row in the data,\n' +
            '            //              and then get the index of the row\n' +
            '            const { scrollTo, renderData } = instance\n' +
            '            for(let i = 0, k = renderData; i < k.length; i++) {\n' +
            '               if(_.isPlainObject(renderData[i]) && parseInt(renderData[i].value) === parseInt(value)) {\n' +
            '                  // step 3: Call method scrolling list\n' +
            '                  scrollTo(i - 1)\n' +
            '                  break\n' +
            '               }\n' +
            '            }\n' +
            '         }\n' +
            '      }\n' +
            '   ])\n' +
            '\n' +
            '   return data\n' +
            '}'
          }
        </code>
      </pre>
    </div>
  )
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
)
