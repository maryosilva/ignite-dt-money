import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended, // Configuração base do ESLint
  ...tseslint.configs.recommended, // Configuração do TypeScript
  {
    // Configurações específicas para React
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: pluginReact, // Plugin do React como objeto
    },
    languageOptions: {
      globals: {
        ...globals.browser, // Variáveis globais do navegador (window, document, etc.)
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Habilita JSX
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      semi: ['error', 'always'], // Ponto e vírgula obrigatório
      quotes: ['error', 'single'], // Aspas simples
      indent: ['error', 2], // Indentação com 2 espaços
      eqeqeq: 'error', // Exige `===` em vez de `==`
    },
  },
]);
