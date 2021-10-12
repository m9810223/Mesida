const prettierrc = require('./.prettierrc');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    // es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  rules: {
    'object-curly-newline': 'off',
    // https://eslint.org/docs/rules/
    // semi: ['warn', 'always'],
    // quotes: ['warn', 'single'],
    // 'no-console': 'error',
    'max-len': [2, { code: prettierrc.printWidth + 10, tabWidth: prettierrc.tabWidth }],
    // (prettier)
    'comma-dangle': ['error', 'only-multiline'],
    'operator-linebreak': ['error', 'after'],
  },
  globals: {
    __WINVAR__: 'readonly',
    __NAME__: 'readonly',
    __VERSION__: 'readonly',
    __MODE__: 'readonly',
  },
  plugins: ['jest', 'import'],
  ignorePatterns: ['examples/inject.js', 'dist/*.js', 'scripts/*.js', 'configs/*.js'],
  settings: {
    'import/resolver': {
      alias: [
        // alias:
        ['core', './src/core'],
      ],
    },
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
};
