export default {
  '/deploy/application/getApplicationPageList': {
    status: true,
    code: 10000,
    message: '',
    data: {
      pageIndex: 0, // 当前页索引	integer(int64)
      pageSize: 10, // 每页大小	integer(int64)
      totalNum: 10, // 总条数,没查总条数则为-1	integer(int64)
      totalPage: 10, // 总页数	integer(int64)
      'rows|5-10': [
        {
          appName: '@ctitle(4,10)', // 名称	string
          'collectType|1': [1, 2], // 采集类型（1、全量采集，默认；2、可视化埋点）	string
          collectTypeStr: '', // 采集类型文本	string
          createTime: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）	integer
          createTimeStr: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
          creatorId: '', // 创建人ID	string
          creatorName: '', // 创建人姓名	string
          defaultUrl: '', // 默认页面地址（例如：http://nlp.ckcest.cn/）	string
          description: '', // 描述	string
          domain: '', // 域名（例如：nlp.ckcest.cn）	string
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
          platformType: '', // 平台类型（web：1，h5：2，android：3，ios：4）	string
          platformTypeStr: '', // 平台类型文本	string
          protocol: '', // 传输协议类型（https：1，http：2）	string
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
  '/deploy/application/updateStatus': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  }
}
