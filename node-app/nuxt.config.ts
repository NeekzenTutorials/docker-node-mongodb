// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-server-utils',
    '@sidebase/nuxt-auth',
    'nuxt-icon',
    '@pinia/nuxt',
    'nuxt-headlessui',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/eslint',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    viewer: true,
  },

  colorMode: {
    classSuffix: '',
  },

  nuxtServerUtils: {
    mongodbUri: process.env.MONGODB_URI,
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs',
    },
  },

  googleFonts: {
    families: {
      Lato: true,
    },
  },
})
