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
