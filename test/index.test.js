import React from 'react'
import ReactTabllist from '../src'
import Enzyme from './enzyme.config'

it('exports modules correctly', () => {
  expect(Object.keys(ReactTabllist)).toMatchSnapshot()
})

// test('CheckboxWithLabel changes the text after click', () => {
//   // Render a checkbox with label in the document
//   const checkbox = shallow(<ReactTabllist data={} />);
//
//   expect(checkbox.text()).toEqual('Off');
//
//   checkbox.find('input').simulate('change');
//
//   expect(checkbox.text()).toEqual('On');
// });

const { shallow } = Enzyme

describe('Enzyme的浅渲染测试套件', function() {
  it('Example组件中按钮的名字为text的值', function() {
    let app = shallow(<ReactTabllist data={['title 1', 'title 2', 'title 3']} />)
    console.log(app)
    // assert.equal(app.find('button').text(),name)
  })
})
