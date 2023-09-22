/**
 * 文件上传状态
 * @global
 * @typedef {'error' | 'success' | 'done' | 'uploading' | 'removed'} AntdVueUploadFileStatus
 */

/**
 * @typedef {Object} AntdVueUploadFile
 * @property {uid} [string] - UID
 * @property {string} [fileName] - 文件名
 * @property {string} [url] - 文件url
 * @property {File | Blob} [originFileObj] - 原始文件对象
 * @property {number} [percent] - 上传进度
 * @property {AntdVueUploadFileStatus} [status] - 文件上传状态
 * @property {string} [thumbUrl] - 缩略图地址
 * @property {any} [response]
 * @property {any} [error]
 * @property {any} [linkProps]
 * @property {any} [xhr]
 * @property {string} [preview]
 */

/**
 * Antd Vue Upload 组件 文件对象
 * @global
 * @typedef {AntdVueUploadFile & File} TGUploadFile
 */

/**
 * @global
 * @typedef {Object} RcUploadResponse
 * @property {File} file - 提供有关文件的信息。[MDN Reference](https://developer.mozilla.org/docs/Web/API/File)
 * @property {boolean} withCredentials - 上传请求时是否携带 cookie
 * @property {string} action - 上传的地址
 * @property {Object} headers - 设置上传的请求头部，IE10 以上有效
 * @property {string} filename - 文件名称
 * @property {Object | RcUploadResponse~data~callback} data - 上传所需参数或返回上传参数的方法
 * @property {RcUploadResponse~onSuccess} onSuccess - 上传成功的回调函数
 * @property {RcUploadResponse~onError} onError - 上传发生错误的回调函数
 * @property {RcUploadResponse~onProgress} onProgress - 上传中的回调函数
 */

/**
 * 初始化OSS文件服务的配置
 * @global
 * @typedef {Object} InitOssOptions
 * @property {string} accessKeyId
 * @property {string} accessKeySecret
 * @property {string} bucketName
 * @property {string} endpoint
 * @property {string} filePath
 * @property {string} ossUrl
 * @property {string} securityToken
 */

/**
 * rcUploadResponse的上传成功回调函数
 * @global
 * @callback RcUploadResponse~onSuccess
 * @param {Object} body
 * @return {void}
 */

/**
 * rcUploadResponse的上传发生错误回调函数
 * @global
 * @callback RcUploadResponse~onError
 * @param {Error} event
 * @param {Object} [body]
 * @return {void}
 */

/**
 * rcUploadResponse的上传中回调函数
 * @global
 * @callback RcUploadResponse~onProgress
 * @param {Object} event
 * @config {number} percent
 * @return {void}
 */

/**
 * 返回上传参数的方法
 * @global
 * @callback RcUploadResponse~data~callback
 * @param {Object} body
 * @return {Object}
 */

import apis from '@/apis'
import store from '@/store'
import { getBase64, getFirstLetterOfEachWordOfAppName, uuid } from '@/utils/utilityFunction'
import { message } from 'ant-design-vue'
import OSS from 'ali-oss'

const useOss = {
  /**
   * 定义 ossConfiguration 和 ossClient 保存的 store 模块名称
   * @type {string}
   */
  moduleName: `${getFirstLetterOfEachWordOfAppName()}/common`,
  /**
   * 获取初始化OSS实例的配置
   * @return {InitOssOptions}
   */
  getOssConfig() {
    return store.getters.getState('ossConfiguration', this.moduleName)
  },
  /**
   * 获取OSS实例
   * @return {OSS}
   */
  getOssClient() {
    return store.getters.getState('ossClient', this.moduleName)
  },
  /**
   * 初始化OSS服务
   * @param [config={}] ｛Object｝ 参数
   * @param [force] {boolean} 是否强制初始化（当store内存在已经实例化的 ossClient 对象时，需要强制执行才能重新初始化）
   * @param config.keyCode {string} 上传文件环境标识，不同环境code不同，私有文件和公有文件的code也不同
   * @param [config.appendDateFormatted] {boolean} 是否追加日期，上传时需要。日期格式：‘yyyy/m/d’。(例如：2023/8/15)
   * @param [config.keySerialId] {string} 二级子目录名，上传时需要。如订单号或文件夹名。（例如：/{STS_ROOT}/｛订单号｝）
   * @return {Promise<Awaited<boolean>>}
   */
  async init(config = {}, force) {
    const ossConfig = this.getOssConfig()
    let ossClient = this.getOssClient()

    if (!ossConfig || !ossClient || force) {
      const { status, data } = await apis.getStsToken({
        keyCode: process.env.VUE_APP_WUYOUXING_PUBLIC_KEY_CODE,
        appendDateFormatted: true,
        keySerialId: '',
        ...config
      })

      if (status) {
        store.commit('setState', {
          value: data,
          stateName: 'ossConfiguration',
          moduleName: this.moduleName
        })

        try {
          ossClient = new OSS({
            region: data.endpoint,
            accessKeyId: data.accessKeyId,
            accessKeySecret: data.accessKeySecret,
            bucket: data.bucketName,
            stsToken: data.securityToken
          })

          store.commit('setState', {
            value: ossClient,
            stateName: 'ossClient',
            moduleName: this.moduleName
          })

          return Promise.resolve(true)
        } catch (err) {
          store.commit('setState', {
            value: null,
            stateName: 'ossClient',
            moduleName: this.moduleName
          })

          message.error('初始化文件服务失败，请联系管理员处理。')

          return Promise.resolve(false)
        }
      } else {
        store.commit('setState', {
          value: null,
          stateName: 'ossConfiguration',
          moduleName: this.moduleName
        })

        message.error('初始化文件服务失败，请联系管理员处理。')

        return Promise.resolve(false)
      }
    } else {
      return Promise.resolve(true)
    }
  },
  /**
   * OSS 上传方法
   * @param {RcUploadResponse} rcUploadResponse
   // * @param {WrappedFormUtils} form
   * @param {(fileList: TGUploadFile) => void} setFileList
   * @return {Promise<TGUploadFile>}
   */
  async put(rcUploadResponse, setFileList) {
    const ossConfig = this.getOssConfig()
    const ossClient = this.getOssClient()
    let result = true

    if (!ossConfig || !ossClient) {
      result = await this.init()
    }

    if (result) {
      const { file: originFileObj } = rcUploadResponse

      /**
       * 本地文件转换base64，进度按50%计算
       * @type {TGUploadFile}
       */
      const file = {
        ...originFileObj,
        originFileObj,
        percent: 50,
        status: 'uploading',
        thumbUrl: await getBase64(originFileObj)
      }

      setFileList(file)

      try {
        const suffix = originFileObj.name.substring(originFileObj.name.lastIndexOf('.'))

        await ossClient.put(ossConfig.filePath + uuid() + suffix, originFileObj)

        file.percent = 100
        file.status = 'done'

        setFileList(file)
      } catch (error) {
        file.status = 'error'
        file.error = new Error(error)

        setFileList(file)

        throw new Error(error)
      }
    } else {
      message.error('初始化文件服务失败，请联系管理员处理。')
      throw new Error('初始化文件服务失败，请联系管理员处理。')
    }
  }
}

export default {
  ...useOss,
  put: useOss.put.bind(useOss)
}
