import glsl from 'vite-plugin-glsl';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@tresjs/nuxt', '@nuxt/icon'],
  ssr: false,
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',
  vite: {
    assetsInclude: ['**/*.fbx', '**/*.glb'],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    plugins: [glsl()],
  },
});
