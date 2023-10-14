module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['lodash', 'jest'],
  extends: ['eslint:recommended', 'standard', 'plugin:lodash/recommended'],
  rules: {
    // 允許只引入部分包
    'lodash/import-scope': [2, 'member'],
    'lodash/chaining': [2, 'always']
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s', '**/?(*.)+(spec|test).[jt]s'],
      extends: ['plugin:jest/all'],
      env: {
        jest: true,
        node: true
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
        createDefaultProgram: true
      },
      plugins: ['@typescript-eslint', 'lodash', 'deprecation'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'standard',
        'standard-with-typescript',
        'plugin:lodash/recommended'
      ]
    },
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      extends: ['plugin:yml/standard']
    },
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-jsonc']
    }
  ]
}
