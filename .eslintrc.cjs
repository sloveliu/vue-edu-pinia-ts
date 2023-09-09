/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
    // '.eslintrc-auto-import.json', // 9/4 沒加不影響，加入 eslintrc: { enabled: true } 生成的文件，解決 eslint 報錯問題
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 自定義規則
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: true, // 結尾分號
        wrapAttributes: 'false', // 屬性是否單一行 -> 不要刻意換行
        printWidth: 100, // 每一行多寬
        endOfLine: 'auto' // Linux 換行是一個符號，Windows 是 Enter 換行，用 auto 自動處理
      }
    ]
  }
};
