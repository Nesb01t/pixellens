// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@tresjs/nuxt'],
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
  },
});
