<script setup>
const route = useRoute();
const slug = route.query.slug;
const { data: newsList } = await useAsyncData('news', () => fetchAllNews());
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
    <div v-else>Loading...</div>
  </div>
</template>
