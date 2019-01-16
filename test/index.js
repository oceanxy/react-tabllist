/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: test demo
 * @Date: 2019-01-14 17:47:41
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-01-15 09:39:55
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Tabllist from '../src'
import './index.scss'

const Demo = () => {
  const option1 = {
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
  const option2 = {
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
  const option3 = {
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
                width: 60
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
  const option4 = {
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
      ['row 5; column 1', 'row 5; column 2', 'row 5; column 3', 'row 5; column 4'],
      ['row 6; column 1', 'row 6; column 2', 'row 6; column 3', 'row 6; column 4'],
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
          callback: () => {
            alert('hello react-tabllist')
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
            serialNumber: {
              show: true,
              formatter: 'No.{index}',
              style: {
                backgroundColor: '#1693ff',
                color: '#ffffff',
                width: 60
              }
            },
            rowCheckBox: true,
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

  return (
    <div className='container'>
      <h1>demo1：Basic use</h1>
      <Tabllist property={option1.property} data={option1.data} />

      <h1>demo2：Cell border and row background color</h1>
      <Tabllist property={option2.property} data={option2.data} />

      <h1>demo3：Header and line number</h1>
      <Tabllist property={option3.property} data={option3.data} />

      <h1>demo4：Add another tag to the cell and list scrolling automatically</h1>
      <Tabllist property={option4.property} data={option4.data} />
    </div>
  )
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
)
