const dynamicModulesFiles = require.context('./modules', true, /\.js$/)

export default dynamicModulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = dynamicModulesFiles(modulePath)

  modules[moduleName] = value.default

  return modules
}, {})
