<script setup>
import { fetchNews } from '~/contentful/fetchContent';

const { data: topNews } = await useAsyncData('topNews', async () => await fetchNews(0, 3));

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
</script>

<template>
  <section class="relative px-4 md:px-14 pt-12 max-w-6xl mx-auto">
    <div class="absolute top-16 -left-[40%] w-[100%] h-[65%] min-w-80 bg-[#4ECEEF]/20 -z-10"></div>
    <h2 class="text-2xl md:text-3xl font-bold text-left mb-6">News</h2>
    <div class="grid max-w-4xl">
      <div v-for="article in topNews" :key="article.slug" class="pb-6">
        <p class="text-sm text-gray-500 mb-1">{{ formatDate(article.date) }}</p>
        <NuxtLink :to="`/news?slug=${article.slug}`" class="text-sm md:text-base mb-1 hover:underline">
          {{ article.title }}
        </NuxtLink>
        <br>
        <NuxtLink :to="`/news?category=${article.category}`" class="text-md mb-1 text-[#0B5FA5] hover:underline">
          {{ article.category }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
