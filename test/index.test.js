import pkg from '../package.json'

let reactTabllist = require('../src')

describe('react-tabllist dist files', () => {
  it('exports modules correctly', () => {
    expect(Object.keys(reactTabllist)).toMatchSnapshot()
  })
})
