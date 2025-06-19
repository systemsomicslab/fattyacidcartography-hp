<script setup>
import { fetchMembers } from '~/contentful/fetchContent';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const { data: members } = await useAsyncData(
  () => `Members-${locale.value}`,
  async () => await fetchMembers(),
  {
    watch: [() => locale.value],
    server: false
  }
);
</script>

<template>
  <div className="overflow-hidden">
    <SubPageHeroSection title="Members" />
    <section class="relative px-4 md:px-14 py-4 md:py-12 max-w-6xl mx-auto md:mt-8">
      <div
        v-intersect="{ direction: 'right' }"
        class="absolute top-0 -right-[40%] w-[100%] h-[500px] min-w-80 md:bg-primary-light-green-opacity -z-10 opacity-0">
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto relative pt-4">
        <div v-for="member in members" :key="member.name">
          <div
            class="translate-[12px] w-full aspect-square transition-all duration-300 hover:shadow-[6px_6px_0_2px_#4ECEEF] cursor-pointer hover:translate-x-[-6px] hover:translate-y-[-6px]">
            <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
          </div>
          <p class="text-left text-sm md:text-base mt-2">{{ member.name }}</p>
          <div v-html="member.text" class="text-xs md:text-sm prose prose-neutral max-w-none"></div>
        </div>
      </div>
    </section>
  </div>
</template>
