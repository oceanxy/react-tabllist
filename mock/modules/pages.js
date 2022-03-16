export default {
  /**
   * 参数
   * pageIndex  当前页索引(从0开始)  query  true integer(int32)
   * pageSize  每页条数  query  true integer(int32)
   * allPath  页面全路径（传输协议类型+域名+路径+参数,例如：http://nlp.ckcest.cn/news?type=1）  query  false string
   * appId  应用ID  query  false string
   * classify  页面业务类型（1：综合页面，2：资源页面-公共，3：资源页面-专有，4：专题应用页面）  query  false string(byte)
   * healthState  健康状态(1、正常，0、异常)  query  false string(byte)
   * isMonitor  是否开启监控(1、是，0、否)  query  false string(byte)
   * isProduct  是否产品(1、是，0、否)  query  false string(byte)
   * isRes  是否资源(1、是，0、否)  query  false string(byte)
   * isSameGroup  是否同组(1、是，0、否)  query  false string(byte)
   * pageLevel  页面级别  query  false integer(int32)
   * paramText  参数文本(例如：name=zhao&age=12)  query  false string
   * parentId  父页面ID  query  false string
   * status  状态 （-1：删除，1：正常 2：停用）  query  false string(byte)
   */
  '/deploy/page/getPagePageList': {
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
          appId: '', // 应用ID	string
          appName: '', // 应用名称	string
          classify: '', // 页面业务类型（1：综合页面，2：资源页面-公共，3：资源页面-专有，4：专题应用页面）	string
          classifyStr: '', // 业务类型	string
          createTime: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）	integer
          createTimeStr: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
          creatorId: '', // 创建人ID	string
          creatorName: '', // 创建人姓名	string
          description: '', // 描述	string
          domain: '', // 域名（例如：nlp.ckcest.cn）	string
          domainUrl: '', // 域名全路径（传输协议类型+域名,例如：http://nlp.ckcest.cn）	string
          healthState: '', // 健康状态(1、正常，0、异常)	string
          id: '', // 页面ID	string
          ip: '', // IP	string
          ipAddress: '', // IP地址	string
          isMonitor: '', // 是否开启监控(1、是，0、否)	string
          isMonitorStr: '', // 是否开启监控文本	string
          isProduct: '', // 是否产品	string
          isProductStr: '', // 是否产品文本	string
          isRes: '', // 是否资源	string
          isResStr: '', // 是否资源值文本	string
          isSameGroup: '', // 是否同组(1、是，0、否)	string
          isSameGroupStr: '', // 是否同组文本	string
          lastOperateIp: '', // 最后操作IP	string
          lastOperateIpAddress: '', // 最后操作IP地址	string
          lastOperateTime: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）	integer
          lastOperateTimeStr: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
          lastOperatorId: '', // 最后操作人ID	string
          lastOperatorName: '', // 最后操作人姓名	string
          moduleId: '', // 模块ID	string
          moduleName: '', // 模块名称	string
          pageLevel: '', // 页面级别	integer
          pageListInfo: '', // 页面集合信息JSON	string
          pageName: '', // 页面名称	string
          'pagePathList|2-3': [ //	页面路径	array	页面路径视图对象
            {
              allPath: '', // 页面全路径（传输协议类型+域名+路径+参数,例如：http://nlp.ckcest.cn/news?type=1）	string
              appId: '', // 应用id	string
              domain: '', // 域名（例如：nlp.ckcest.cn）	string
              domainUrl: '', // 域名全路径（传输协议类型+域名,例如：http://nlp.ckcest.cn）	string
              pageId: '', // 页面ID	string
              pageName: '', // 页面名称	string
              pagePath: '', // 页面路径（传输协议类型+域名+路径,例如：http://nlp.ckcest.cn/news）	string
              pageUri: '', // 页面资源名称（例如：/home/index）	string
              paramText: '', // 参数文本(例如：name=zhao&age=12)	string
              remark: '', // 备注	string
              sortIndex: '' // 排序值（越大排在越前）	integer
            }
          ],
          parentId: '', // 父页面ID	string
          score: '', // 优先级评分(得分最高的优先匹配)	integer
          status: '', // 状态 （-1：删除，1：正常 2：停用）	string
          statusStr: '' // 状态文本	string
        }
      ]
    }
  },
  '/deploy/page/getDicList': {
    status: true,
    code: 10000,
    message: '',
    'data|10': [
      {
        appId: '', // 应用ID	string
        appName: '', // 应用名称	string
        classify: '', // 页面业务类型（1：综合页面，2：资源页面-公共，3：资源页面-专有，4：专题应用页面）	string
        classifyStr: '', // 业务类型	string
        createTime: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）	integer
        createTimeStr: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
        creatorId: '', // 创建人ID	string
        creatorName: '', // 创建人姓名	string
        description: '', // 描述	string
        domain: '', // 域名（例如：nlp.ckcest.cn）	string
        domainUrl: '', // 域名全路径（传输协议类型+域名,例如：http://nlp.ckcest.cn）	string
        healthState: '', // 健康状态(1、正常，0、异常)	string
        id: '', // 页面ID	string
        ip: '', // IP	string
        ipAddress: '', // IP地址	string
        isMonitor: '', // 是否开启监控(1、是，0、否)	string
        isMonitorStr: '', // 是否开启监控文本	string
        isProduct: '', // 是否产品	string
        isProductStr: '', // 是否产品文本	string
        isRes: '', // 是否资源	string
        isResStr: '', // 是否资源值文本	string
        isSameGroup: '', // 是否同组(1、是，0、否)	string
        isSameGroupStr: '', // 是否同组文本	string
        lastOperateIp: '', // 最后操作IP	string
        lastOperateIpAddress: '', // 最后操作IP地址	string
        lastOperateTime: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）	integer
        lastOperateTimeStr: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
        lastOperatorId: '', // 最后操作人ID	string
        lastOperatorName: '', // 最后操作人姓名	string
        moduleId: '', // 模块ID	string
        moduleName: '', // 模块名称	string
        pageLevel: '', // 页面级别	integer
        pageListInfo: '', // 页面集合信息JSON	string
        pageName: '', // 页面名称	string
        'pagePathList|2-3': [ //	页面路径	array	页面路径视图对象
          {
            allPath: '', // 页面全路径（传输协议类型+域名+路径+参数,例如：http://nlp.ckcest.cn/news?type=1）	string
            appId: '', // 应用id	string
            domain: '', // 域名（例如：nlp.ckcest.cn）	string
            domainUrl: '', // 域名全路径（传输协议类型+域名,例如：http://nlp.ckcest.cn）	string
            pageId: '', // 页面ID	string
            pageName: '', // 页面名称	string
            pagePath: '', // 页面路径（传输协议类型+域名+路径,例如：http://nlp.ckcest.cn/news）	string
            pageUri: '', // 页面资源名称（例如：/home/index）	string
            paramText: '', // 参数文本(例如：name=zhao&age=12)	string
            remark: '', // 备注	string
            sortIndex: '' // 排序值（越大排在越前）	integer
          }
        ],
        parentId: '', // 父页面ID	string
        score: '', // 优先级评分(得分最高的优先匹配)	integer
        status: '', // 状态 （-1：删除，1：正常 2：停用）	string
        statusStr: '' // 状态文本	string
      }
    ]
  },
  /**
   * 参数
   * id  id  query  true string
   * status  状态，1或2  query  true string(byte)
   */
  '/deploy/page/updateStatus': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  /**
   * 参数
   * id  id  query  true string
   * status  状态，1或2  query  true string(byte)
   */
  '/deploy/page/updateMonitorStatus': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  /**
   * 参数
   * ids  ID多个以逗号分割  query  true string
   */
  '/deploy/page/delete': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  /**
   * 参数
   * appId  应用ID    false string
   * classify  页面业务类型（1：综合页面，2：资源页面-公共，3：资源页面-专有，4：专题应用页面） false string(byte)
   * description  描述    false string
   * groupPath  同组路径    false string
   * id  页面ID    false string
   * isMonitor  是否开启监控(1、是，0、否)    false string(byte)
   * isProduct  是否产品    false string(byte)
   * isRes  是否资源    false string(byte)
   * isSameGroup  是否同组(1、是，0、否)    false string(byte)
   * moduleId  模块ID    false string
   * pageLevel  页面级别    false integer(int32)
   * pageName  页面名称    false string
   * pagePathList  页面路径集合    false array 页面路径参数对象
   *  allPath  页面全路径（传输协议类型+域名+路径+参数,例如：http://nlp.ckcest.cn/news?type=1） false string
   *  remark  备注    false string
   * parentId  父页面ID    false string
   * score  优先级评分(得分最高的优先匹配)    false integer(int32)
   * sortIndex  排序值（越大排在越前）    false integer(int64)
   * status  状态 （-1：删除，1：正常 2：停用） false string(byte)
   */
  '/deploy/page/update': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  /**
   * 参数
   * appId  应用ID    false string
   * classify  页面业务类型（1：综合页面，2：资源页面-公共，3：资源页面-专有，4：专题应用页面） false string(byte)
   * description  描述    false string
   * groupPath  同组路径    false string
   * isMonitor  是否开启监控(1、是，0、否)    false string(byte)
   * isProduct  是否产品    false string(byte)
   * isRes  是否资源    false string(byte)
   * isSameGroup  是否同组(1、是，0、否)    false string(byte)
   * moduleId  模块ID    false string
   * pageLevel  页面级别    false integer(int32)
   * pageName  页面名称    false string
   * pagePathList  页面路径集合    false array 页面路径参数对象
   *  allPath  页面全路径（传输协议类型+域名+路径+参数,例如：http://nlp.ckcest.cn/news?type=1） false string
   *  remark  备注    false string
   * parentId  父页面ID    false string
   * score  优先级评分(得分最高的优先匹配)    false integer(int32)
   * sortIndex  排序值（越大排在越前）    false integer(int64)
   * status  状态 （-1：删除，1：正常 2：停用） false string(byte)
   */
  '/deploy/page/add': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  /**
   * 参数
   * id  ID  query  true string
   */
  '/deploy/page/getPage': {
    status: true,
    code: 10000,
    message: '',
    data: {
      appId: '', // 应用ID	string
      appName: '', // 应用名称	string
      classify: '', // 页面业务类型（1：综合页面，2：资源页面-公共，3：资源页面-专有，4：专题应用页面）	string
      classifyStr: '', // 业务类型	string
      createTime: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）	integer
      createTimeStr: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
      creatorId: '', // 创建人ID	string
      creatorName: '', // 创建人姓名	string
      description: '', // 描述	string
      domain: '', // 域名（例如：nlp.ckcest.cn）	string
      domainUrl: '', // 域名全路径（传输协议类型+域名,例如：http://nlp.ckcest.cn）	string
      healthState: '', // 健康状态(1、正常，0、异常)	string
      id: '', // 页面ID	string
      ip: '', // IP	string
      ipAddress: '', // IP地址	string
      isMonitor: '', // 是否开启监控(1、是，0、否)	string
      isMonitorStr: '', // 是否开启监控文本	string
      isProduct: '', // 是否产品	string
      isProductStr: '', // 是否产品文本	string
      isRes: '', // 是否资源	string
      isResStr: '', // 是否资源值文本	string
      isSameGroup: '', // 是否同组(1、是，0、否)	string
      isSameGroupStr: '', // 是否同组文本	string
      lastOperateIp: '', // 最后操作IP	string
      lastOperateIpAddress: '', // 最后操作IP地址	string
      lastOperateTime: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）	integer
      lastOperateTimeStr: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
      lastOperatorId: '', // 最后操作人ID	string
      lastOperatorName: '', // 最后操作人姓名	string
      moduleId: '', // 模块ID	string
      moduleName: '', // 模块名称	string
      pageLevel: '', // 页面级别	integer
      pageListInfo: '', // 页面集合信息JSON	string
      pageName: '', // 页面名称	string
      'pagePathList|2-3': [ //	页面路径	array	页面路径视图对象
        {
          allPath: '', // 页面全路径（传输协议类型+域名+路径+参数,例如：http://nlp.ckcest.cn/news?type=1）	string
          appId: '', // 应用id	string
          domain: '', // 域名（例如：nlp.ckcest.cn）	string
          domainUrl: '', // 域名全路径（传输协议类型+域名,例如：http://nlp.ckcest.cn）	string
          pageId: '', // 页面ID	string
          pageName: '', // 页面名称	string
          pagePath: '', // 页面路径（传输协议类型+域名+路径,例如：http://nlp.ckcest.cn/news）	string
          pageUri: '', // 页面资源名称（例如：/home/index）	string
          paramText: '', // 参数文本(例如：name=zhao&age=12)	string
          remark: '', // 备注	string
          sortIndex: '' // 排序值（越大排在越前）	integer
        }
      ],
      parentId: '', // 父页面ID	string
      score: '', // 优先级评分(得分最高的优先匹配)	integer
      status: '', // 状态 （-1：删除，1：正常 2：停用）	string
      statusStr: '' // 状态文本	string
    }
  }
}
