import _ from 'lodash';
import React, { Component } from 'react';
import listConfig from './config';
import List from './list';
import { waring } from './util';

const { property: listConfigProps, ...rest } = listConfig;

export default class extends Component {
  static defaultProps = rest;

  render() {
    const { property, ...option } = this.props;
    const newProperty = _.defaultsDeep({}, waring(property), listConfigProps);

    return (
      <List property={newProperty} {...option} />
    );
  }
}
