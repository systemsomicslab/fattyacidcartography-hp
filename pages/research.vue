<script setup>
import { fetchPageContent } from '~/contentful/fetchContent';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const { data: researchContent } = await useAsyncData('Research',
  () => fetchPageContent('Research'),
  {
    watch: [() => locale.value]
  }
);
</script>

<template>
  <SubPageHeroSection title="Research" />
  <section class="relative px-4 md:px-14 pt-12 max-w-6xl mx-auto mt-10">
    <div class="absolute top-0 -left-[40%] w-[100%] h-[60%] min-w-80 bg-[#4ECEEF]/20 -z-10"></div>
    <div v-html="researchContent"
      class="prose prose-neutral max-w-none text-left mx-auto text-base leading-relaxed text-sm md:text-base">
    </div>
  </section>
</template>
