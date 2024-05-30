module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '!.storybook'],
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'react-refresh'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['type', 'builtin', 'external', 'internal', 'parent', ['sibling', 'index']],
        'newlines-between': 'always',
      },
    ],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: true,
        locale: 'auto',
      },
    ],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  settings: {
    'import/internal-regex': '^{@,~}/*',
    'import/resolver': {
      node: true,
      typescript: true,
    },
    react: {
      version: 'detect',
    },
  },
}
