/**
 * 子系统单独打包或同时打包多个子系统时使用
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-24 周五 15:36:04
 */
const rimraf = require('rimraf')
const path = require('path')
const child_process = require('child_process')
const { getAvailableProjectNames } = require('./configs')

async function build() {
  const availableProjectNames = getAvailableProjectNames()

  if (availableProjectNames.length) {
    try {
      await rimraf(path.join(__dirname, '..', 'dist'))

      availableProjectNames.forEach((filepath, index) => {
        console.log(`正在打包第 ${index + 1}/${availableProjectNames.length} 个APP(${filepath})...`)

        on(child_process.exec(`vue-cli-service build --app-proj ${filepath}`), index + 1, filepath)
      })
    } catch (err) {
      throw new Error(err)
    }
  } else {
    on(child_process.exec('vue-cli-service build'))
  }
}

function on(workerProcess, ordinal, filepath) {
  workerProcess.stdout.on('data', function(data) {
    if (data.replace(/\+/g, '').replace(/[\r\n]/g, '')) {
      if (ordinal) {
        console.log(`第${ordinal}个APP(${filepath})信息: ${data}`)
      } else {
        console.log(`信息: ${data}`)
      }
    }
  })

  workerProcess.stderr.on('data', function(data) {
    if (ordinal) {
      console.log(`第${ordinal}个APP(${filepath})信息: ${data}`)
    } else {
      console.log(`信息: ${data}`)
    }
  })

  workerProcess.on('close', function(code) {
    if (ordinal) {
      console.log(`第${ordinal}个APP(${filepath})已打包完成，退出码: ${code}`)
    } else {
      console.log(`打包已完成，退出码: ${code}`)
    }
  })
}

build()
