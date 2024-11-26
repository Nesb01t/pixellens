import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    ignores: ['node_modules', 'dist', '.nuxt'],
  },
  {
    rules: {
      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          allowSingleExtends: true,
        },
      ],
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'vue/attribute-hyphenation': [
        'error',
        'always',
        {
          ignore: ['shadow-mapSize-width', 'shadow-mapSize-height', 'colorCenterLine', 'colorGrid'],
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/multi-word-component-names': 'off',
    },
  },
);
