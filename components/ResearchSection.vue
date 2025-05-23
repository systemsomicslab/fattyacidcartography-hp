<script setup>
import { fetchPageContent } from '~/contentful/fetchContent';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const { data: topResearchContent } = await useAsyncData('Top-research',
  () => fetchPageContent('Top-research'),
  {
    watch: [() => locale.value]
  }
);
</script>

<template>
  <section class="relative px-4 md:px-14 pt-12 max-w-6xl mx-auto">
    <div class="absolute top-16 -left-[40%] w-[100%] h-[60%] min-w-80 bg-[#4ECEEF]/20 -z-10"></div>
    <h2 class="text-2xl md:text-3xl font-bold text-left mb-6">Research</h2>
    <div v-html="topResearchContent"
      class="prose prose-neutral max-w-none text-left mx-auto text-base leading-relaxed text-sm md:text-base">
    </div>
  </section>
</template>
