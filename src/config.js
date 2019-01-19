/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 配置文件
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-01-15 11:50:26
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
}
