<script setup>
import { fetchNews } from '~/contentful/fetchContent';
import { createClient as createContentfulClient } from 'contentful';
import { formatDate } from '~/utils/util';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const config = useRuntimeConfig();
const contentfulLocale = config.public.localeMap[locale.value];

const client = createContentfulClient({
  space: config.public.contentfulSpace,
  accessToken: config.public.contentfulToken
})

const { data } = await useAsyncData('topNews', async () => await fetchNews({ skip: 0, limit: 3, client, locale: contentfulLocale }));
</script>

<template>
  <section class="relative px-4 md:px-14 pt-12 max-w-6xl mx-auto">
    <div class="absolute top-16 -left-[40%] w-[100%] h-[65%] min-w-80 bg-[#4ECEEF]/20 -z-10"></div>
    <h2 class="text-2xl md:text-3xl font-bold text-left mb-6">News</h2>
    <div class="grid max-w-4xl">
      <div v-for="article in data.newsList" :key="article.slug" class="pb-6">
        <p class="text-sm text-gray-500 mb-1">{{ formatDate(article.date) }}</p>
        <NuxtLink :to="`/news?slug=${article.slug}`" class="text-sm md:text-base mb-1 hover:underline">
          {{ article.title }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
