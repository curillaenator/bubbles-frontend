import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import google from 'eslint-config-google';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      google,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json'],

        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-console': 'warn',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-types': 'off',
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
    },

    ignores: [
      //
      '.firebase/*',
      '.husky/*',
      '.yarn/*',
      'node_modules',
      'build',
      'webpack.config.js',
    ],
  },
];
