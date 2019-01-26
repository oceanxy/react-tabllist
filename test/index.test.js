import 'jsdom-global/register'
import React from 'react'
import ReactTabllist from '../src'
import config from '../src/config'
import Enzyme from './enzyme.config'

const mockApp = ({ data = config.data, property = config.property }) => {
  // mock props
  const props = {
    data: data,
    property: property,
    // Jest 提供的 mock 函数
    onClick: jest.fn()
  }

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = Enzyme.mount(<ReactTabllist {...props} />)
  return {
    props,
    wrapper
  }
}

it('exports modules correctly', () => {
  expect(ReactTabllist).toMatchSnapshot()
})

describe('test data', () => {
  const { wrapper } = mockApp({})

  it('data is null', () => {
    wrapper.setProps({ data: [] })
    expect(wrapper.find('.list-header .list-cell').length).toBe(0)
  })

  it('only title', () => {
    wrapper.setProps({ data: [['t1', 't2', 't3', 't4', 't5']] })
    expect(wrapper.find('.list-header .list-cell').length).toBe(5)
  })

  it('1 row and 2 column', () => {
    wrapper.setProps({ data: [['t1', 't2'], ['c1', 'c2']] })
    expect(wrapper.find('.list-header .list-cell')).toHaveLength(2)
    expect(wrapper.find('.list-body').childAt(0).find('.list-row')).toHaveLength(1)
  })
})

describe('change property', () => {
  const { wrapper } = mockApp({ property: { style: { height: 300 } } })

  it('change property.style', () => {
    expect(wrapper.find('.list').getDOMNode().style.height).toBe('300px')
    wrapper.setProps({ property: { style: { height: 400 } } })
    expect(wrapper.find('.list').getDOMNode().style.height).toBe('400px')
  })

  it('change property.list.border', () => {
    wrapper.setProps({ property: { list: { border: { borderWidth: 2 } } } })
    expect(wrapper.find('.list').getDOMNode().style.borderWidth).toBe('2px')
  })

  it('close scroll', () => {
    wrapper.setProps({ property: { list: { isScroll: false } } })
    expect(wrapper.find('.list').getDOMNode().offsetTop).toBe(0)
  })

  it('open scroll', () => {
    wrapper.setProps({ property: { list: { speed: 60, isScroll: true } } })
    jest.setTimeout(1000)
    expect(wrapper.find('.list').getDOMNode().offsetTop).toBeGreaterThanOrEqual(0)
  })
})
