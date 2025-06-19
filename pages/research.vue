<script setup>
import { fetchPageContent } from '~/contentful/fetchContent';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const { data: researchContent } = await useAsyncData(
  () => `Research-${locale.value}`,
  () => fetchPageContent('Research'),
  {
    watch: [() => locale.value],
    server: false
  }
);
</script>

<template>
  <SubPageHeroSection title="Research" />
  <section class="relative px-4 md:px-14 py-4 md:py-12 max-w-6xl mx-auto md:mt-8">
    <div
      v-intersect="{ direction: 'left' }"
      class="absolute top-0 -left-[40%] w-[100%] h-[500px] min-w-80 md:bg-primary-light-blue-opacity -z-10 opacity-0"
    >
    </div>
    <div v-html="researchContent"
      class="researchContent prose prose-neutral max-w-none text-left mx-auto text-base leading-relaxed text-sm md:text-base">
    </div>
  </section>
</template>

<style>
.researchContent img {
  max-width: 80%;
  margin: 16px auto 0;
  height: auto;
}

.researchContent figcaption {
  text-align: center;
}

@media screen and (max-width: 599px) {
  .researchContent img {
    max-width: 100%;
  }
}
</style>