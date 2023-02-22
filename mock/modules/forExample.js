// for example
// 1. URL 对应 src/apis 内同名的 URL，当 src/apis 内存在相同的 URL 时，会自动拦截该接口

/* eslint-disable max-len */
export default {
  '/getMap': {
    status: true,
    code: 10000,
    message: '',
    'data|33': [
      {
        // 数据集合	array	走访任务排行榜
        'dataList|5': [
          {
            count: '@integer(100,1000)', // 数量	string
            id: '@uuid', // id	string
            'name|+1': ['户数', '人口数', '网格员', '户情指标', '采集指标'] // 数据条目名称	string
          }
        ],
        'id|+1': [
          '500853', '500837', '500838', '500839', '500842', '500840', '500863', '500844', '500862', '500858', '500846',
          '500841', '500860', '500865', '500857', '500855', '500850', '500859', '500861', '500848', '500854', '500851',
          '500849', '500856', '500847', '500836', '500852', '500866', '500864', '500845', '500843'
        ], // string
        'name|+1': [
          '安坪镇',
          '夔门街道',
          '白帝镇',
          '草堂镇',
          '大树镇',
          '汾河镇',
          '冯坪乡',
          '公平镇',
          '鹤峰乡',
          '红土乡',
          '甲高镇',
          '康乐镇',
          '康坪乡',
          '龙桥土家族乡',
          '平安乡',
          '青莲镇',
          '青龙镇',
          '石岗乡',
          '太和土家族乡',
          '吐祥镇',
          '五马镇',
          '新民镇',
          '兴隆镇',
          '岩湾乡',
          '羊市镇',
          '鱼复街道',
          '永乐镇',
          '云雾土家族乡',
          '长安土家族乡',
          '朱衣镇',
          '竹园镇'
        ] // 名称  string
      }
    ]
  },
  '/getList': {
    status: true,
    code: 10000,
    message: '',
    data: {
      pageIndex: 0, // 当前页索引	integer(int64)
      pageSize: 10, // 每页大小	integer(int64)
      totalNum: 10, // 总条数,没查总条数则为-1	integer(int64)
      totalPage: 10, // 总页数	integer(int64)
      'rows|10': [
        {
          name: '@ctitle(4,10)', // 名称	string
          fullName: '@ctitle(4,10)', // 名称	string
          collectType: '@integer(1,2)', // 采集类型（1、全量采集，默认；2、可视化埋点）	string
          collectTypeStr: '', // 采集类型文本	string
          createTime: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）	integer
          createTimeStr: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
          creatorId: '', // 创建人ID	string
          creatorName: '', // 创建人姓名	string
          defaultUrl: 'http://nlp.ckcest.cn/', // 默认页面地址（例如：http://nlp.ckcest.cn/）	string
          description: '', // 描述	string
          domain: 'www.xxx.com', // 域名（例如：nlp.ckcest.cn）	string
          domainPath: '', // 	string
          frameType: '', // 框架类型(传统框架：1，Vue：2)	string
          frameTypeStr: '', // 框架类型文本	string
          id: '@uuid', // 应用ID	string
          ip: '', // IP	string
          ipAddress: '', // IP地址	string
          lastOperateIp: '', // 最后操作IP	string
          lastOperateIpAddress: '', // 最后操作IP地址	string
          lastOperateTime: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）	integer
          lastOperateTimeStr: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
          lastOperatorId: '', // 最后操作人ID	string
          lastOperatorName: '', // 最后操作人姓名	string
          pageMode: '', // 页面模式(1:多页面模式,2:单页面模式)	string
          pageModeStr: '', // 页面模式文本	string
          pathCaseSensitivity: '', // 路径是否大小写	string
          pathCaseSensitivityStr: '', // 路径是否大小写文本	string
          platformType: '@integer(1, 4)', // 平台类型（web：1，h5：2，android：3，ios：4）	string
          platformTypeStr: '', // 平台类型文本	string
          protocol: '@integer(1,2)', // 传输协议类型（https：1，http：2）	string
          protocolStr: '', // 传输协议类型文本	string
          remark: '', // 备注	string
          sdkInserted: '', // SDK是否接入(0 接入中 1接入成功)	string
          sdkInsertedStr: '', // SDK是否接入文本	string
          siteType: '', // 功能分类(1:综合性站点,2:专题应用类站点,3:搜索站点)	string
          siteTypeStr: '', // 功能分类文本	string
          sortIndex: '', // 排序值（越大排在越前）	integer
          'status|1': [1, 2], // 状态 （-1：删除，1：正常 2：停用）	string
          statusStr: '' // 	string
        }
      ]
    }
  },
  '/getDetails': {
    status: true,
    code: 10000,
    message: '',
    data: { signingStage: 3 } // 签约流程步骤控制字段
  },
  '/updateStatus': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  '/delete': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  '/update': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  '/add': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  }
}
