const fs = require('fs')

function generateRoutes(content, path) {
  fs.writeFile('C:/Users/Oceanxy/Desktop', content, err => {
    if (err) {
      console.error(err)
    } else {
      alert('文件写入成功。')
    }
  })
}

module.exports = generateRoutes
