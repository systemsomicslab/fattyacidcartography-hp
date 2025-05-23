<script setup>
import { fetchNews } from '~/contentful/fetchContent';

const route = useRoute();
const slug = route.query.slug;

const { data: newsList } = await useAsyncData('news', async () => await fetchNews());

const news = computed(() => newsList.value?.find(n => n.slug === slug));
</script>

<template>
  <div>
    <h1>News</h1>
    <div v-if="news">
      <h2>{{ news.title }}</h2>
      <p>{{ news.date }}</p>
      <div v-html="news.body"></div>
    </div>
    <div v-else-if="slug">記事が見つかりません。</div>
    <div v-else>記事を選択してください。</div>
  </div>
</template>
