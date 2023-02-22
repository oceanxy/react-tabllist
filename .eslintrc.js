module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // eslint 官方规则。
    'eslint:recommended',
    // (eslint-config-)prettier 关闭所有可能和 Prettier 冲突的 ESLint 规则。
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  plugins: [
    'vue',
    // 将 Prettier 整合进 ESLint。配合 rules 里面的 prettier/prettier 规则使用。
    'prettier'
  ],
  rules: {
    // 在 plugins 数组中加入 prettier 插件，配合此规则，将任何格式化错误当成 ESLint 错误显示出来。
    'prettier/prettier': 0,
    'vue/multi-word-component-names': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/html-self-closing': 0,
    'vue/html-indent': 0,
    'vue/require-default-prop': 0,
    'vue/require-prop-types': 0,
    'vue/max-attributes-per-line': 0,
    'vue/no-template-shadow': 0,
    'vue/no-mutating-props': 0,

    'vue/no-unused-vars': 1,
    'vue/no-unused-components': 1,

    // 禁用 console
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    // 禁止在条件中使用常量表达式，比如 if (false)
    'no-constant-condition': 2,
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': [1, 'never'],
    // 行最大长度
    'max-len': [1, 120],
    // 禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止空语句块
    'no-empty': 2,
    // 禁止不必要的分号
    'no-extra-semi': 1,
    // 禁止在字符串和注释之外不规则的空白
    'no-irregular-whitespace': 2,
    // 禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': 2,
    // 强制把变量的使用限制在其定义的作用域范围内
    'block-scoped-var': 0,
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 0,
    // 强制所有控制语句使用一致的括号风格
    curly: 0,
    // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
    'default-case': 2,
    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: [2, 'allow-null'],
    // 禁用 alert、confirm 和 prompt
    'no-alert': 0,
    // 不允许在 case 子句中使用词法声明
    'no-case-declarations': 2,
    // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
    'no-empty-function': 1,
    // 禁止使用空解构模式no-empty-pattern
    'no-empty-pattern': 2,
    // 禁止在没有类型检查操作符的情况下与 null 进行比较
    'no-eq-null': 1,
    // 禁用 eval()
    'no-eval': 2,
    // 禁止扩展原生类型
    'no-extend-native': 1,
    // 禁止不必要的 .bind() 调用
    'no-extra-bind': 2,
    // 禁用不必要的标签
    'no-extra-label:': 0,
    // 禁止使用短符号进行类型转换(!!fOO)
    'no-implicit-coercion': 0,
    // 禁用不必要的嵌套块
    'no-lone-blocks': 2,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止对原生对象赋值
    'no-native-reassign': 2,
    // 不允许对 function 的参数进行重新赋值
    'no-param-reassign': 0,
    // 禁止使用 var 多次声明同一变量
    'no-redeclare': 2,
    // 禁用指定的通过 require 加载的模块
    'no-return-assign': 0,
    // 禁止出现未使用过的表达式。不允许 this.toast.finally && this.toast.finally();形式
    'no-unused-expressions': 0,
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 2,
    // 禁止不必要的字符串字面量或模板字面量的连接
    'no-useless-concat': 2,
    // 禁用不必要的转义字符
    'no-useless-escape': 0,
    // 不允许 catch 子句的参数与外层作用域中的变量同名
    'no-catch-shadow': 0,
    // 禁止出现未使用过的变量
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    // 不允许在变量定义之前使用它们
    'no-use-before-define': 0,
    // 不能使用动态require
    'import/no-dynamic-require': 0,
    // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    'array-bracket-spacing': [2, 'never'],
    // 禁止或强制在单行代码块中使用空格(禁用)
    'block-spacing': [1, 'never'],
    // 强制使用一致的缩进 第二个参数为 'tab' 时，会使用tab，
    // if while function 后面的{必须与if在同一行，java风格。
    'brace-style': [
      2,
      '1tbs',
      { allowSingleLine: true }
    ],
    // 双峰驼命名格式
    camelcase: 0,
    // 控制逗号前后的空格
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 控制逗号在行尾出现还是在行首出现 (默认行尾)
    // http://eslint.org/docs/rules/comma-style
    'comma-style': [2, 'last'],
    // 'SwitchCase' (默认：0) 强制 switch 语句中的 case 子句的缩进水平
    // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
    'computed-property-spacing': [2, 'never'],
    // 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了
    // e.g [0,'that'] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值
    'consistent-this': [0, 'that'],
    // 强制使用命名的 function 表达式
    'func-names': 0,
    // 文件末尾强制换行
    'eol-last': 2,
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    // 强制使用一致的换行风格
    // 'linebreak-style': [1, 'windows'],
    // 强制一致地使用函数声明或函数表达式，方法定义风格，参数：
    // declaration: 强制使用方法声明的方式，function f(){} e.g [2, 'declaration']
    // expression：强制使用方法表达式的方式，var f = function() {} e.g [2, 'expression']
    // allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, 'declaration', { 'allowArrowFunctions': true }]
    'func-style': 0,
    // 强制在关键字前后使用一致的空格 (前后腰需要)
    'keyword-spacing': 2,
    // 要求构造函数首字母大写 （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    // 要求调用无参构造函数时有圆括号
    'new-parens': 2,
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': 1,
    // 不允许多个空行
    'no-multiple-empty-lines': [
      2,
      { max: 2 }
    ],
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': 2,
    // 强制函数中的变量要么一起声明要么分开声明
    'one-var': [
      2,
      { initialized: 'never' }
    ],
    // 强制操作符使用一致的换行符
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    // 强制使用一致的反勾号、双引号或单引号
    quotes: [2, 'single', 'avoid-escape'],
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾分号的）
    semi: [2, 'never'],
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': [1, 'as-needed'],
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 强制 generator 函数中 * 号周围使用一致的空格
    'generator-star-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 禁止不必要的计算性能键对象的文字
    'no-useless-computed-key': 0,
    // 要求使用 let 或 const 而不是 var
    'no-var': 1,
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 2,
    // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'template-curly-spacing': 0,
    'indent': [
      2,
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['TemplateLiteral']
      }
    ],
    // 要求或禁止在语句间填充空行
    'padding-line-between-statements': [
      2,
      // 要求 return 之前要有空行
      {
        blankLine: 'always', prev: '*', next: 'return'
      },
      // 要求每一个变量声明之后都有空行
      {
        blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'
      },
      {
        blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']
      },
      // 要求所有的指令序言之后都有空行
      {
        blankLine: 'always', prev: 'directive', next: '*'
      },
      {
        blankLine: 'any', prev: 'directive', next: 'directive'
      },
      // 要求所有的 if 块前后要有空行
      {
        blankLine: 'always', prev: 'if', next: '*'
      },
      {
        blankLine: 'always', prev: '*', next: 'if'
      },
      // 要求所有的 import 块后要有空行
      {
        blankLine: 'always', prev: 'import', next: '*'
      },
      {
        blankLine: 'any', prev: 'import', next: 'import'
      },
      // 要求所有的 export 块前要有空行
      {
        blankLine: 'always', prev: '*', next: 'export'
      }
    ],
    // 在大括号内换行规则
    'object-curly-newline': [
      1,
      {
        'ObjectExpression': {
          'multiline': true,
          'minProperties': 3
        },
        'ObjectPattern': {
          'multiline': true,
          'minProperties': 3
        },
        'ImportDeclaration': 'never',
        'ExportDeclaration': {
          'multiline': true,
          'minProperties': 3
        }
      }
    ]
  }
}
