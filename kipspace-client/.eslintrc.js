module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    // 'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 4,
        multiline: {
          max: 2,
          allowFirstLine: false,
        },
      },
    ],
    'vue/name-property-casing': ['error', 'kebab-case'],
  },
}
