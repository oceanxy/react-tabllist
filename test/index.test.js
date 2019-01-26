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

  const wrapper = Enzyme.mount(<ReactTabllist {...props} />)
  return {
    props,
    wrapper
  }
}

const { wrapper } = mockApp({})

it('exports modules correctly', () => {
  expect(ReactTabllist).toMatchSnapshot()
})

describe('display header', () => {
  it('not display header', () => {
    wrapper.setProps({
      property: { list: { header: { show: false } } }
    })
    expect(wrapper.exists('.list-header')).toEqual(false)
  })

  it('change header row style', () => {
    const headerHeight = wrapper.find('.list-header').getDOMNode().style.height
    expect(headerHeight).toBe('30px')
    wrapper.setProps({
      property: { list: { header: { show: true, style: { height: 40 } } } }
    })
    expect(wrapper.exists('.list-header')).toEqual(true)
    expect(wrapper.find('.list-header').getDOMNode().style.height).not.toBe(headerHeight)
  })

  it('change header cell style', () => {
    expect(wrapper.find('.list-header .list-cell').at(0).getDOMNode().style.color).toBe('rgb(0, 0, 0)')
  })
})

describe('test data', () => {
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

describe('change property of body', () => {
  it('close row transition and display row serialNumber', () => {
    expect(
      wrapper
        .find('.list-body .list-row').at(0)
        .find('.list-cell').at(0).getDOMNode().style.width
    ).toBe('-1px')

    wrapper.setProps({
      property: {
        list: {
          body: {
            row: {
              transition: false,
              serialNumber: {
                show: true,
                formatter: 'test{index}',
                style: {
                  backgroundColor: 'red'
                },
                specialStyle: [
                  {
                    width: 100
                  }
                ]
              }
            }
          }
        }
      }
    })

    expect(
      wrapper
        .find('.list-body .list-row').at(0)
        .find('.list-cell').at(0).text()
    ).toEqual('test1')

    expect(
      wrapper
        .find('.list-body .list-row').at(0)
        .find('.list-cell').at(0).getDOMNode().style.width
    ).toEqual('100px')
  })

  it('row spacing', () => {
    wrapper.setProps({
      property: {
        list: {
          body: {
            row: {
              spacing: 10
            }
          }
        }
      }
    })

    expect(
      wrapper
        .find('.list-body .list-cont').at(0)
        .getDOMNode().style.borderSpacing
    ).toBe('0 10px')
  })
})
