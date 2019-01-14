/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 列表/表格 组件 配置文件
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-01-07 15:37:44
 */

import rowBg from './images/row-bg.png'

export default {
  /**
   * 数据集
   */
  data: [
    ['1st column', '2nd column', '3rd column'],
    ['1st column', '2nd column', '3rd column'],
    ['1st column', '2nd column', '3rd column'],
    ['1st column', '2nd column', '3rd column'],
    ['1st column', '2nd column', '3rd column'],
    ['1st column', '2nd column', '3rd column'],
    ['1st column', '2nd column', '3rd column'],
    ['1st column', '2nd column', '3rd column'],
    ['1st column', '2nd column', '3rd column']
  ],
  /**
   * 组件属性及其配套组件属性
   */
  property: {
    /**
     * 列表最外层容器样式
     */
    style: {
      width: '94%',
      margin: '0 auto',
      height: 200
    },
    /**
     * 列表属性配置表
     */
    list: {
      // 全局边框配置
      // 如果props.style配置了容器的边框，则此配置只对单元格生效
      // 如果header或body各自指定了单元格边框样式，则忽略此配置
      border: {
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: '#f4f4f4'
      },
      // header 配置
      header: {
        // 是否显示列表头。显示时，props.data 数据的第一个数据集为列表头数据
        show: true,
        // 表头行样式（注意不是表头的单元格样式）
        style: {
          height: 30
        },
        // 表头行内单元格样式，参照css样式表
        // 此配置里面的width将失效，因本组件的header单元格宽度自动根据body单元格宽度进行适配
        cellStyle: {
          // 字体颜色
          color: '#ffffff',
          // 这里空值不代表不设置边框，而代表引用全局边框设置，取消边框请设置border为none
          border: ''
        }
      },
      // body 配置
      body: {
        // 行配置（非行内的单元格的配置）
        row: {
          // 当列表数据发生变化时激活缓动效果
          transition: true,
          // 行序号
          serialNumber: {
            show: false,
            // 默认空，可自定义格式
            // '{index}'：可设置从1开始自增的数
            formatter: '{index}.',
            // 序号单元格样式，优先级高于body.cell.style
            // 但width受全局单元格minWidth影响，也可在此设置minWidth消除这个影响
            style: {
              backgroundColor: '',
              backgroundImage: '',
              color: '#ffffff'
            },
            // 指定样式
            // 按照索引依次设置每一行序列单元格的样式
            // [style, style, style]
            specialStyle: []
          },
          // 行间距
          spacing: 10,
          // 是否开启每一行的checkbox功能
          rowCheckBox: false,
          // 行样式
          style: {
            height: 30,
            background: `url(${rowBg}) no-repeat center / 100% 100%`
          },
          /**
           * 指定样式
           * 按照索引依次设置每一行的样式，空字符串跳过该索引
           * [style, style, style, ...]
           */
          specialStyle: [],
          /**
           * 每一行的style交替出现配置项
           */
          visual: {
            // 开关
            show: false,
            /**
             * 交替间隔
             *    0 相当于show设置为false
             *    1 每1行交替一次
             *    2 每2行交替一次
             *    ...依次类推
             */
            interval: 1,
            // 交替行的样式配置
            // 在交替的行上会覆盖body.row.style相关属性的配置项
            style: {
              backgroundColor: '#E8F4FC',
              backgroundImage: ''
            }
          },
          // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
          silent: {
            show: false,
            // 鼠标交互时的样式，目前只支持hover
            style: {
              opacity: 0.8
            }
          }
        },
        // 一列内的所有单元格的配置（优先级低于body.cell）
        cellOfColumn: {
          /**
           * 按列索引依次设置style，空字符串跳过该索引
           * [style, style, style, ...]
           */
          style: []
        },
        // 单元格配置
        cell: {
          style: {
            fontSize: 16,
            minWidth: 50,
            color: '#ffffff',
            textAlign: 'left',
            // 这里空值不代表不设置边框，而代表引用全局边框设置
            border: '',
            /**
             * 每一列的单元格的宽度(受限于minWidth)
             * 如果单元格宽度值小于minWidth，则使用minWidth值
             * 可选
             *    'auto'：完全根据单元格内的具体数据自动设置单元格宽度；
             *    'avg'：每个单元格宽度趋近于相等，但会根据单元格内的具体数据适当调整宽度；
             *    [10, 20, 10]：每一列依次取数组的值，数组长度小于列数时多余的列默认'auto'
             *    '10,20,10'：根据逗号分隔值，同数组。每一列依次取值。
             */
            width: 'auto'
          },
          iconStyle: {
            width: 24,
            height: 'auto'
          }
        }
      },
      // 列表滚动速度
      speed: 50,
      // 是否开启列表滚动
      isScroll: true
    }
  }
}
