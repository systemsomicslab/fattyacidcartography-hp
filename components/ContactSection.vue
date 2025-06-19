<script setup>
import { fetchPageContent } from '~/contentful/fetchContent';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const { data: topContactContent } = await useAsyncData(
  () => `Top-contact-${locale.value}`,
  () => fetchPageContent('Top-contact'),
  {
    watch: [() => locale.value],
    server: false
  }
);
</script>

<template>
  <section class="relative px-4 md:px-14 mt-14 pt-12 md:py-12 max-w-6xl mx-auto ">
    <div
      v-intersect="{ direction: 'right' }"
      class="absolute top-16 -right-[20%] md:-right-[40%] w-[100%] h-[350px] min-w-80 bg-primary-light-green-opacity -z-10 opacity-0">
    </div>
    <h2 class="text-2xl md:text-3xl font-bold text-right mb-6">Contact</h2>
    <div v-html="topContactContent"
      class="topContactContent prose prose-neutral max-w-none text-right ml-auto text-base leading-relaxed text-sm md:text-base whitespace-break-spaces">
    </div>
  </section>
</template>


<style>
.topContactContent img {
  width: 188px;
  height: 188px;
  margin: 10px 0 0 auto;
  object-fit: cover;
}
</style>
