import _ from 'lodash'
import React from 'react'
import listConfig from './config'
import List from './list'
import { waring } from './util'
import { TableConfig } from '@/types/config'

const {property: listConfigProps, ...rest} = listConfig

export default (props: TableConfig) => {
  const {property, ...option} = props
  const newProperty = _.defaultsDeep({}, waring(property!), listConfigProps)

  return (
    <List property={{...rest, ...newProperty}} {...option} />
  )
}
