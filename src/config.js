/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 配置文件
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xyzsyx@163.com）
 * @LastModifiedTime: 2019-01-23 15:03:05
 */

export default {
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
    list: {
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
          visual: {
            show: false,
            interval: 1,
            style: {
              backgroundColor: '#E8F4FC'
            }
          },
          // 注意：单独指定每一行的样式的优先级高于visual.style的优先级
          specialStyle: [],
          silent: {
            show: false, // false is open
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
}
