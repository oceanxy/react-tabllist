const express = require('express')

const app = express()

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})

app.get('/generateRoutes', (req, res) => {
  res.send('ok')
})
