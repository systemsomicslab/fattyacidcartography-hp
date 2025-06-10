<script setup>
import { fetchMembers } from '~/contentful/fetchContent';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const { data: members } = await useAsyncData('members', async () => {
  return await fetchMembers();
}, {
  watch: [locale]
});
</script>

<template>
  <div className="overflow-hidden">
    <SubPageHeroSection title="Members" />
    <section class="relative px-4 md:px-14 py-12 max-w-6xl mx-auto mt-8">
      <div class="absolute top-0 -right-[40%] w-[100%] h-[70%] min-w-80 bg-[#78CC38]/20 -z-10"></div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto relative pt-4">
        <div v-for="member in members" :key="member.name">
          <div
            class="translate-[12px] w-full aspect-square transition-all duration-300 hover:shadow-[6px_6px_0_2px_#4ECEEF] cursor-pointer hover:translate-x-[-6px] hover:translate-y-[-6px]">
            <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
          </div>
          <p class="text-left text-sm md:text-base mt-2">{{ member.name }}</p>
          <div v-html="member.text" class="text-xs md:text-sm text-[#0B5FA5]"></div>
        </div>
      </div>
    </section>
  </div>
</template>
