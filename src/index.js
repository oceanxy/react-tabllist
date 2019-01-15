/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 组件入口
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2018-12-18 10:00:07
 */

import _ from 'lodash'
import React, { Component } from 'react'
import listConfig from './config'
import List from './list'

const list = () => {
  return class extends Component {
    static defaultProps = listConfig

    render() {
      const { property, data } = this.props
      const newProperty = _.defaultsDeep({}, property, listConfig.property)

      return <List property={newProperty} data={data} />
    }
  }
}

export default list()
