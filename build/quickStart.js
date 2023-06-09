const dotenv = require('dotenv')
const child_process = require('child_process')
const { on } = require('./configs')
const args = require('minimist')(process.argv.slice(2))

dotenv.config({ path: `src/apps/${args['app-proj']}/config/.env.development` })

on(
  child_process.exec(
    `vue-cli-service serve --app-proj ${args['app-proj']} --app-separately 1`
  )
)
