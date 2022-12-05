module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true },
    ],
    // import
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { '': 'never', tsx: 'never', ts: 'never' },
    ],
    // prettier
    'prettier/prettier': 'error',
    // jsx-a11y
    'jsx-a11y/no-autofocus': 'off',
    // react
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/display-name': 'off',
    'no-extra-boolean-cast': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
  },
};
