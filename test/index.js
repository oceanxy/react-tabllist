/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 主文件入口
 * @Date: 2019-01-14 17:47:41
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-01-15 09:39:55
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Tabllist from '../src'

const Demo = () => {
  return (
    <div>
      <h1>demo：</h1>
      <Tabllist />
    </div>
  )
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
)
