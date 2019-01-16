if(process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-tabllist.min.js')
} else {
  module.exports = require('./dist/react-tabllist.js')
}
