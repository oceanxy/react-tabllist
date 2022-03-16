export default {
  /**
   * 参数
   * pageIndex  当前页索引(从0开始)  query  true integer(int32)
   * pageSize  每页条数  query  true integer(int32)
   * moduleName  模块名称  query  false string
   */
  '/deploy/module/getModulePageList': {
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
          appId: '@uuid', // 应用ID	string
          appName: '@ctitle(2,4)', // 应用名称	string
          companyId: '', // 公司ID	string
          createTime: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）	integer
          createTimeStr: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
          creatorId: '', // 创建人ID	string
          creatorName: '', // 创建人姓名	string
          deptId: '@uuid', // 部门Id	string
          id: '@uuid', // ID	string
          ip: '192.168.0.0', // IP	string
          ipAddress: '', // IP地址	string
          lastOperateIp: '', // 最后操作IP	string
          lastOperateIpAddress: '', // 最后操作IP地址	string
          lastOperateTime: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）	integer
          lastOperateTimeStr: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
          lastOperatorId: '', // 最后操作人ID	string
          lastOperatorName: '', // 最后操作人姓名	string
          moduleName: '@ctitle(2,4)', // 模块名称	string
          parentId: '', // 父级别ID	string
          parentName: '', // 父级名称	string
          remark: '', // 备注	string
          sortIndex: '', // 排序值（越大排在越前）	integer
          status: '@integer(1,2)', // 状态 （-1：删除，1：正常 2：停用）	string
          statusStr: '' // 	string
        }
      ]
    }
  },
  '/deploy/module/getDicList': {
    status: true,
    code: 10000,
    message: '',
    'data|10': [
      {
        appId: '@uuid', // 应用ID	string
        appName: '@ctitle(2,4)', // 应用名称	string
        companyId: '', // 公司ID	string
        createTime: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）	integer
        createTimeStr: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
        creatorId: '', // 创建人ID	string
        creatorName: '', // 创建人姓名	string
        deptId: '@uuid', // 部门Id	string
        id: '@uuid', // ID	string
        ip: '192.168.0.0', // IP	string
        ipAddress: '', // IP地址	string
        lastOperateIp: '', // 最后操作IP	string
        lastOperateIpAddress: '', // 最后操作IP地址	string
        lastOperateTime: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）	integer
        lastOperateTimeStr: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
        lastOperatorId: '', // 最后操作人ID	string
        lastOperatorName: '', // 最后操作人姓名	string
        moduleName: '@ctitle(2,4)', // 模块名称	string
        parentId: '', // 父级别ID	string
        parentName: '', // 父级名称	string
        remark: '', // 备注	string
        sortIndex: '', // 排序值（越大排在越前）	integer
        status: '@integer(1,2)', // 状态 （-1：删除，1：正常 2：停用）	string
        statusStr: '' // 	string
      }
    ]
  },
  /**
   * 参数
   * id  id  query  true string
   * status  状态，1或2  query  true string(byte)
   */
  '/deploy/module/updateStatus': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  /**
   * 参数
   * ids  ID多个以逗号分割  query  true string
   */
  '/deploy/module/delete': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  /**
   * 参数
   * appId  应用ID    false string
   * appName  应用名称    false string
   * companyId  公司ID    false string
   * deptId  部门Id    false string
   * ip  IP    false string
   * ipAddress  IP地址    false string
   * lastOperateIp  最后操作IP    false string
   * lastOperateIpAddress  最后操作IP地址 false string
   * lastOperateTime  最后操作时间（格式17位 yyyyMMddHHmmssSSS） false integer(int64)
   * lastOperatorId  最后操作人ID    false string
   * lastOperatorName  最后操作人姓名    false string
   * moduleName  模块名称    false string
   * parentId  父级别ID    false string
   * parentName  父级名称    false string
   * remark  备注    false string
   * sortIndex  排序值（越大排在越前）    false integer(int64)
   * status  状态 （-1：删除，1：正常 2：停用）    false string(byte)
   */
  '/deploy/module/update': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  /**
   * 参数
   * appId  应用ID    false string
   * appName  应用名称    false string
   * companyId  公司ID    false string
   * deptId  部门Id    false string
   * ip  IP    false string
   * ipAddress  IP地址    false string
   * lastOperateIp  最后操作IP    false string
   * lastOperateIpAddress  最后操作IP地址 false string
   * lastOperateTime  最后操作时间（格式17位 yyyyMMddHHmmssSSS） false integer(int64)
   * lastOperatorId  最后操作人ID    false string
   * lastOperatorName  最后操作人姓名    false string
   * moduleName  模块名称    false string
   * parentId  父级别ID    false string
   * parentName  父级名称    false string
   * remark  备注    false string
   * sortIndex  排序值（越大排在越前）    false integer(int64)
   * status  状态 （-1：删除，1：正常 2：停用）    false string(byte)
   */
  '/deploy/module/add': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  },
  // 参数 id
  '/deploy/module/getModule': {
    status: true,
    code: 10000,
    message: '',
    data: {
      appId: '@uuid', // 应用ID	string
      appName: '@ctitle(2,4)', // 应用名称	string
      companyId: '', // 公司ID	string
      createTime: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）	integer
      createTimeStr: '', // 创建时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
      creatorId: '', // 创建人ID	string
      creatorName: '', // 创建人姓名	string
      deptId: '@uuid', // 部门Id	string
      id: '@uuid', // ID	string
      ip: '192.168.0.0', // IP	string
      ipAddress: '', // IP地址	string
      lastOperateIp: '', // 最后操作IP	string
      lastOperateIpAddress: '', // 最后操作IP地址	string
      lastOperateTime: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）	integer
      lastOperateTimeStr: '', // 最后操作时间（格式17位 yyyyMMddHHmmssSSS）YYYY_MM_DD_HH_MM	string
      lastOperatorId: '', // 最后操作人ID	string
      lastOperatorName: '', // 最后操作人姓名	string
      moduleName: '@ctitle(2,4)', // 模块名称	string
      parentId: '', // 父级别ID	string
      parentName: '', // 父级名称	string
      remark: '', // 备注	string
      sortIndex: '', // 排序值（越大排在越前）	integer
      status: '@integer(1,2)', // 状态 （-1：删除，1：正常 2：停用）	string
      statusStr: '' // 	string
    }
  }
}
