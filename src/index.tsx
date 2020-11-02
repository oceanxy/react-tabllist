import _ from 'lodash'
import React from 'react'
import listConfig from './config'
import List from './list'
import { waring } from './util'
import ReactTabllist from './list'

const {property: listConfigProps, ...rest} = listConfig

export default class extends ReactTabllist {
  static defaultProps = rest

  // @ts-ignore
  render() {
    const {property, ...option} = this.props
    const newProperty = _.defaultsDeep({}, waring(property!), listConfigProps)

    return (
      <List property={newProperty} {...option} />
    )
  }
}
