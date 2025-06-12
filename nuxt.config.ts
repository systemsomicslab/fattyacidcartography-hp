// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxt/image-edge', '@nuxtjs/tailwindcss'],
  css: [
    '@/assets/css/markdown.css',
  ],
  runtimeConfig: {
    public: {
      contentfulSpace: process.env.CONTENTFUL_SPACE_ID,
      contentfulToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      localeMap: {
        ja: 'ja-JP',
        en: 'en-US'
      }
    }
  },
  i18n: {
    locales: [
      { code: 'ja', iso: 'ja-JP', file: 'ja.json', name: '日本語' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],
    defaultLocale: 'ja',
    lazy: true,
    langDir: 'locales/'
  },
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'] // 追加ルートはfetchNews.tsで生成可能
    },
    output: {
      publicDir: './dist'
    }
  },
  app: {
    baseURL: '/fattyacidcartography/'
  }
});