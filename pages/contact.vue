<script setup>
import { fetchPageContent } from '~/contentful/fetchContent';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const { data: contactContent } = await useAsyncData('Contact',
  () => fetchPageContent('Contact'),
  {
    watch: [() => locale.value]
  }
);
</script>

<template>
  <div className="overflow-hidden">
    <SubPageHeroSection title="Contact" />
    <section class="relative px-4 md:px-14 py-12 max-w-6xl mx-auto mt-8">
      <div class="absolute top-0 -right-[40%] w-[100%] h-[70%] min-w-80 bg-[#78CC38]/20 -z-10"></div>
      <div v-html="contactContent"
        class="prose prose-neutral max-w-none mx-auto text-base leading-relaxed text-sm md:text-base">
      </div>
    </section>
  </div>
</template>
