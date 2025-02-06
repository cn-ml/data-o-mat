// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  runtimeConfig: {
    dataRepo:
      "https://raw.githubusercontent.com/gockelhahn/qual-o-mat-data/refs/heads/master/",
  },
  site: {
    name: "Data-O-Mat",
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  experimental: {
    inlineRouteRules: true,
    typedPages: true,
  },

  modules: ["@nuxt/eslint", "@nuxtjs/sitemap"],
});
