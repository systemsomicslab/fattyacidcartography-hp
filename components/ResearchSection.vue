<script setup>
import { fetchPageContent } from '~/contentful/fetchContent';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const { data: topResearchContent } = await useAsyncData(
  () => `Top-research-${locale.value}`,
  () => fetchPageContent('Top-research'),
  {
    watch: [() => locale.value],
    server: false
  }
);
</script>

<template>
  <section class="relative px-4 md:px-14 pt-12 md:pt-12 pb-4 max-w-6xl mx-auto ">
    <div
      v-intersect="{ direction: 'left' }"
      class="absolute top-16 -left-[20%] md:-left-[40%] w-[100%] h-[350px] min-w-80 bg-primary-light-blue-opacity -z-10 opacity-0"
    ></div>
    <h2 class="text-2xl md:text-3xl font-bold text-left mb-6">
      <NuxtLink :to="$localePath('/research')"
        class="hover:text-primary-light-blue transition-colors duration-300">
        Research
      </NuxtLink>
    </h2>
    <div v-html="topResearchContent"
      class="topResearchContent prose prose-neutral max-w-none text-left mx-auto text-base leading-relaxed text-sm md:text-base">
    </div>
  </section>
</template>

<style>
.topResearchContent img {
  width: 80%;
  max-width: 600px;
  margin: 16px auto 0;
  height: auto;
}

.topResearchContent figcaption {
  text-align: center;
}

@media screen and (max-width: 599px) {
  .topResearchContent img {
    width: 100%;
  }
}
</style>