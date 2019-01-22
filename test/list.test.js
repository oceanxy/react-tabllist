import React from 'react'
import ReactTabllist from '../src/list'
import Enzyme from './enzyme.config'

it('exports modules correctly', () => {
  expect(ReactTabllist).toMatchSnapshot()
})
