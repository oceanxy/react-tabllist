const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
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
