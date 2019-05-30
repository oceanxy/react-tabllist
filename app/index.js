/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: dev
 * @Date: 2019-05-23 11:41:43
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-05-30 15:46:57
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Tabllist from '../src'
import './index.scss'

const Dev = () => {
  const option = {
    data: [
      ['1st column', '2nd column', '3rd column', '4rd column'],
      [
        <span>span</span>,
        <div onClick={() => alert('测试事件')}>测试事件</div>,
        <a href='http://www.xieyangogo.cn/react-tabllist/'>demo</a>,
        <div>div</div>
      ],
      {
        type: 'row',
        data: 123,
        event: 'onClick',
        callback: (restData, elementData, event) => {
          alert('测试行点击事件')
          console.log(restData, elementData, event)
        },
        cells: [
          'row 1; column 1',
          {
            type: 'link',
            text: 'I am a first link',
            className: 'test-link',
            callback: () => {console.log('I am a first link')}
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
      [
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
      ],
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
      [
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
      ],
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
          callback: (data, cellObject, cellElement) => {
            if(!data) {
              data = 'data of button is undefined'
            }

            cellElement.target.value = 'you clicked me!!'
            cellElement.target.style.width = '150px'

            console.log(data)
            console.log(cellObject)
            console.log(cellElement)

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
          onClick: () => {}, // 仅在1.2.0版本生效，此处用于测试控制台打印警告信息
          style: {
            height: 34
          },
          serialNumber: {
            show: true,
            formatter: 'No.{index}',
            style: {
              backgroundColor: 'red',
              width: 80,
              fontSize: 20,
              color: '#2cff41'
            },
            specialStyle: [
              {
                backgroundColor: 'blue'
              },
              {
                backgroundColor: 'black'
              },
              {
                backgroundColor: 'yellow'
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
      speed: 40,
      isScroll: true
    }
  }

  return (
    <div className='container'>
      <Tabllist property={option.property} data={option.data} />
    </div>
  )
}

ReactDOM.render(
  <Dev />,
  document.getElementById('root')
)
