// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  runtimeConfig: {
    dataRepo:
      "https://raw.githubusercontent.com/gockelhahn/qual-o-mat-data/refs/heads/master/",
  },

  experimental: {
    inlineRouteRules: true,
    typedPages: true,
  },

  modules: ["@nuxt/eslint"],
});
