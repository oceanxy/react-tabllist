/**
 * 阿里云 OSS 文件服务
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
 * @param {Object} result - Response.body
 * @param {File} [file]
 * @return {void}
 */

/**
 * rcUploadResponse的上传发生错误回调函数
 * @global
 * @callback RcUploadResponse~onError
 * @param {Error} err - 错误信息
 * @param {Object} [response] - Response
 * @param {File} [file]
 * @return {void}
 */

/**
 * rcUploadResponse的上传中回调函数
 * @global
 * @callback RcUploadResponse~onProgress
 * @param {Object} event
 * @config {number} percent - 上传进度
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
import OSS from 'ali-oss'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { getFirstLetterOfEachWordOfAppName, uuid } from '@/utils/utilityFunction'
import { message } from 'ant-design-vue'
import moment from 'moment'

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
  async getOssToken(config) {
    const res = await apis.getStsToken({
      keyCode: process.env.VUE_APP_WUYOUXING_PUBLIC_KEY_CODE,
      appendDateFormatted: true,
      keySerialId: '',
      ...config
    })

    return res
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

    if (!ossClient || !ossConfig || force) {
      const { data, status } = await this.getOssToken(config)

      if (status) {
        store.commit('setState', {
          value: data,
          stateName: 'ossConfiguration',
          moduleName: this.moduleName
        })

        try {
          ossClient = new OSS({
            secure: true, // 解决报错： RequestError: XHR error (req "error"), PUT http://xxx.xxx/xx.jpg
            region: data.endpoint,
            accessKeyId: data.accessKeyId,
            accessKeySecret: data.accessKeySecret,
            bucket: data.bucketName,
            stsToken: data.securityToken,
            expiration: data.expiration, // 有效期
            refreshSTSToken: async () => { // 刷新临时访问凭证的回调，在上传文件时，过期自动刷新
              const res = await this.getOssToken()

              return {
                accessKeyId: res.data?.accessKeyId,
                accessKeySecret: res.data?.accessKeySecret,
                stsToken: res.data?.securityToken,
              }
            },
            // 过期时间是后端配置的，根据返回的时间换算成毫秒
            refreshSTSTokenInterval: new Date(data.expiration) - new Date()
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
   * @param {RcUploadResponse} rcUploadResponse - Antd Vue Upload 组件或 wangEditor 自定义上传函数的回调参数
   * @return {Promise<TGUploadFile>}
   */
  async put(rcUploadResponse) {
    let ossConfig = this.getOssConfig()
    let ossClient = this.getOssClient()
    let result = true

    if (!ossConfig || !ossClient) {

      result = await this.init()

      if (result) {
        ossConfig = this.getOssConfig()
        ossClient = this.getOssClient()
      }
    }

    if (result) {
      const {
        file: originFileObj,
        onProgress,
        onError,
        onSuccess
      } = rcUploadResponse

      // 模拟一个进度，按50%计算
      onProgress?.({ percent: 50 })

      try {
        const suffix = originFileObj.name.substring(originFileObj.name.lastIndexOf('.'))
        const ossResponse = await ossClient.put(ossConfig.filePath + uuid() + suffix, originFileObj)

        if (ossResponse.res.statusCode === 200) {
          // Antd Vue Upload 组件
          onProgress?.({ percent: 100 })
          onSuccess({
            ...ossResponse,
            status: true
          })
        } else {
          onError?.(new Error('上传出错！'))
        }
      } catch (error) {
        onError?.(error)
        // 暴露错误信息以供调试
        throw error
      }
    } else {
      message.error('初始化文件服务失败，请联系管理员处理。')
      throw new Error('初始化文件服务失败，请联系管理员处理。')
    }
  },
  /**
   * OSS 批量打包下载
   * @param jsonCollects // 需要传入一个被转译的json集合
   * @param fileName // 设置下载zip包文件名称
   */
  async batchDownload(jsonCollects, fileName) {
    const ossConfig = this.getOssConfig()

    if (!Object.keys(ossConfig).length) {
      return
    }

    message.loading({
      content: '压缩包生成中...',
      duration: 0
    })
    // promises 对象
    const promises = []
    // 创建JSZip实例
    const zip = new JSZip()
    const imageUrls = []
    const collects = JSON.parse(jsonCollects)

    collects?.forEach(d => {
      if (d?.url) {
        imageUrls.push(`${ossConfig?.ossUrl}/${d.url}`)
      } else {
        return message.warning('图片打包失败')
      }
    })

    // 创建一系列的 Promise 对象，用于获取图片数据
    for (const imageUrl of imageUrls) {
      const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', imageUrl, true)
        xhr.responseType = 'blob'
        xhr.onload = () => {
          const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
          const fileBlob = new Blob([xhr.response])

          resolve({ fileName, fileBlob })
        }

        xhr.onerror = () => {
          reject(new Error('Failed to fetch image'))
        }

        xhr.send()
      })

      promises.push(promise)
    }

    // 等待所有图片数据的获取完成
    const imageDataArray = await Promise
      .all(promises).then(results => {
        return results
      })
      .catch(err => {
        return message.warning('图片打包失败')
      })

    if (imageDataArray && imageDataArray.length) {
      message.destroy()
      // 将图片数据添加到 ZIP 文件中
      imageDataArray?.forEach(({ fileName, fileBlob }) => {
        zip.file(fileName, fileBlob)
      })
      // 生成 ZIP 文件并保存到本地
      zip.generateAsync({ type: 'blob' })
        .then(content => {
          saveAs(content, `${fileName}.zip`)
        })
        .catch(error => {
          console.error('Failed to generate ZIP file:', error)
        })
    }
  }
}

export default {
  ...useOss,
  init: useOss.init.bind(useOss),
  put: useOss.put.bind(useOss)
}
