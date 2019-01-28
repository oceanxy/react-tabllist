/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: test demo
 * @Date: 2019-01-14 17:47:41
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-01-15 09:39:55
 */

import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import Tabllist from '../src'

import rowBg from './images/row-bg.png'
import './index.scss'

const Demo = () => {
  const option1 = {}
  const option2 = {
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
      list: {
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
  }
  const option3 = {
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
      list: {
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
                backgroundColor: '#E8F4FC'
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
  }
  const option4 = {
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
      list: {
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
                backgroundColor: '#E8F4FC'
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
  }
  const option5 = {
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
        height: 300,
        border: '1px solid #999999'
      },
      list: {
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
                backgroundColor: '#E8F4FC'
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
  }
  const option6 = {
    data: _.range(5).map((i) => {
      return [
        {
          type: 'link',
          uid: '',
          text: `test title ${i + 1}`,
          event: 'onClick',
          className: 'demo5-link',
          data: {
            datetime: '2019-01-17 17:58',
            author: 'Oceanxy'
          },
          callback: (data) => {
            alert(` author: ${data.author},\n datetime: ${data.datetime}`)
          }
        },
        {
          type: 'button',
          uid: '',
          value: `test button ${i + 1}`,
          className: 'demo5-btn',
          data: {
            message: `you clicked button ${i + 1} !`
          },
          callback: (data) => {
            alert(`${data.message}`)
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
      list: {
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
              width: ',28%'
            }
          },
          cellOfColumn: {
            style: [{ textIndent: '2em', textAlign: 'left' }, { textAlign: 'center' }]
          }
        }
      }
    }
  }

  return (
    <div className='container'>
      <h1>demo1：default</h1>
      <Tabllist />

      <h1>demo2：Basic use</h1>
      <Tabllist property={option2.property} data={option2.data} />

      <h1>demo3：Cell border and row background color</h1>
      <Tabllist property={option3.property} data={option3.data} />

      <h1>demo4：Serial number and scrollable list</h1>
      <Tabllist property={option4.property} data={option4.data} />

      <h1>demo5：Object cell: Add another tag to the cell</h1>
      <Tabllist property={option5.property} data={option5.data} />

      <h1>demo6：Use in actual projects</h1>
      <Tabllist property={option6.property} data={option6.data} />
    </div>
  )
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
)
