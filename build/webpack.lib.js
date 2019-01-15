module.exports = {
  // 入口文件
  entry: {},
  // 出口文件
  output: {},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192',
        options: {
          // 不超过3000字节的资源直接用base64
          limit: 3000,
          name: 'images/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
