const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.tsx', '.scss', '.css', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      { // 用于加载组件或者css中使用的图片
        test: /\.(jpg|jpeg|png|gif|cur|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name][hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};
