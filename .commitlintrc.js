module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // 改变了build工具 如 webpack
        'build',
        // 持续集成新增
        'ci',
        // 构建过程或辅助工具的变动
        'chore',
        // 文档改变
        'docs',
        // 新功能
        'feat',
        // 修复bug
        'fix',
        // 性能优化
        'perf',
        // 某个已有功能重构
        'refactor',
        // 撤销上一次的 commit
        'revert',
        // 代码格式改变
        'style',
        // 增加测试
        'test',
        // 增加注释
        'anno'
      ]
    ]
  }
}
