module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-refresh', '@typescript-eslint/eslint-plugin'],
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/no-unresolved': 'error',

    'react/prop-types': 'off',

    'no-console': ['warn', { allow: ['warn', 'error'] }],

    'react/jsx-no-bind': [
      'warn',
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
      },
    ],

    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': [
      'error',
      {
        functions: 'ignore',
      },
    ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
  },
  overrides: [],
};
