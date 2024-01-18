/**
 * 自动压缩打包文件
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2024-01-16 周二 10:32:35
 */

const fs = require('fs')
const archiver = require('archiver')
const path = require('path')
const moment = require('moment')
const { subDir } = require('./params')

function createZip(zipName) {
  /* 打包环境用来区分 正式包还是测试包 */
  const env = process.env.VUE_APP_ENV
  const buildTime = moment().format('YYMMDD.HHmm')
  const sourceFile = path.resolve(__dirname, `${zipName}.${env}.${buildTime}.zip`)
  const destPath = path.resolve(__dirname, `../dist/${zipName}.${env}.${buildTime}.zip`)

  console.log('压缩文件中...')

  // 创建一个文件来流数据, 即将文件压缩得到的文件地址。
  const output = fs.createWriteStream(sourceFile)
  const archive = archiver('zip', { zlib: { level: 9 } }) // 设置压缩级别

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    console.log('压缩程序已完成，输出文件描述符已关闭')
  })

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function() {
    console.log('数据流已流完')
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
      console.warn('stat故障和其他非阻塞错误')
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    console.error('压缩文件时出错')
    throw err
  })

  archive.on('finish', function(err) {
    if (err) throw err

    fs.rename(sourceFile, destPath, function(err) {
      if (err) throw err

      console.log('压缩包已移动到dist目录')
    })

    // 移动文件
    console.log('正在移动压缩包到dist目录中...')
  })

  // pipe archive data to the file
  // 通过管道将数据归档到压缩文件
  archive.pipe(output)
  // 打包后的压缩包一律移动到 dist 目录下
  archive.directory(path.resolve(__dirname, `../dist${subDir ? `/${subDir}` : ''}`), false)

  // 压缩文件
  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize()
}

module.exports = createZip
