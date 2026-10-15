// ESLint flat config: TypeScript + Angular recommended sets.
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export default tseslint.config(
  {
    ignores: ['dist/', '.angular/', 'node_modules/', 'coverage/'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
  },
);
