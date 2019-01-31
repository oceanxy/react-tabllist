/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 组件入口
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xyzsyx@163.com）
 * @LastModifiedTime: 2019-01-23 15:03:17
 */

import _ from 'lodash'
import React, { Component } from 'react'
import listConfig from './config'
import List from './list'

export default class extends Component {
  static defaultProps = listConfig

  render() {
    const { property, ...option } = this.props
    const newProperty = _.defaultsDeep({}, property, listConfig.property)

    return (
      <List property={newProperty} {...option} />
    )
  }
}
