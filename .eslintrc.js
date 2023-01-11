module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'indent': 'off',
    'vue/multi-word-component-names': 0,
    'unicorn/escape-case': 'off',
    'object-curly-spacing': 'off',
    'import/no-mutable-exports': 'warn'
  }
}
