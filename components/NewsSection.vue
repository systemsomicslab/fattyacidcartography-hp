<script setup>
import { fetchNews } from '~/contentful/fetchContent';
import { createClient as createContentfulClient } from 'contentful';
import { formatDate } from '~/utils/util';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const config = useRuntimeConfig();
const contentfulLocale = computed(() => config.public.localeMap[locale.value]);

const client = createContentfulClient({
  space: config.public.contentfulSpace,
  accessToken: config.public.contentfulToken
})

const { data } = await useAsyncData(
  () => `Top-news-${locale.value}`,
  async () => await fetchNews({ skip: 0, limit: 3, client, locale: contentfulLocale.value }),
  {
    watch: [() => locale.value],
    server: false
  }
);

const newsList = computed(() => data.value?.newsList ?? [])
</script>

<template>
  <section class="relative px-4 md:px-14 pt-12 max-w-6xl mx-auto">
    <div
      v-intersect="{ direction: 'left' }"
      class="absolute top-16 -left-[20%] md:-left-[40%] w-[100%] h-[350px] min-w-80 bg-primary-light-blue-opacity -z-10 opacity-0">
    </div>
    <h2 class="text-2xl md:text-3xl font-bold text-left mb-6">
      <NuxtLink :to="$localePath('/news')"
        class="hover:text-primary-light-blue transition-colors duration-300">
        News
      </NuxtLink>
    </h2>
    <div class="grid max-w-4xl">
      <div v-for="article in newsList" :key="article.slug" class="pb-6">
        <p class="text-sm text-gray-500 mb-1">{{ formatDate(article.date) }}</p>
        <NuxtLink :to="`/news?slug=${article.slug}`" class="text-sm md:text-base mb-1 hover:underline">
          {{ article.title }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
