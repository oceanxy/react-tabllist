module.exports = {
  extends: [
    'stylelint-config-standard',
    // 用于按照以下顺序将相关属性声明进行分组来对它们进行排序
    // 1.Positioning   2.Box Model    3.Typography    4.Visual    5.Animation    6.Misc
    'stylelint-config-rational-order',
    // 禁用与prettier规则冲突的规则
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-order',
    // 用于提示矛盾样式，比如下面的代码中 width 是会被浏览器忽略的，这可以避免我们犯一些低级错误～
    // { display: inline; width: 100px; }
    'stylelint-declaration-block-no-ignored-properties'
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': 'always'
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*']
}
