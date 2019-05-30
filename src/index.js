/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 组件入口
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-05-30 15:47:10
 */

import _ from 'lodash'
import React, { Component } from 'react'
import listConfig from './config'
import List from './list'
import { waring } from './util'

export default class extends Component {
  static defaultProps = listConfig

  render() {
    const { property, ...option } = this.props
    const newProperty = _.defaultsDeep({}, waring(property), listConfig.property)

    return (
      <List property={newProperty} {...option} />
    )
  }
}
