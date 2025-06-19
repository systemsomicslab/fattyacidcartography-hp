<script setup lang="ts">
import { fetchPageContent } from '~/contentful/fetchContent';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { locale, t } = useI18n()

const { data: achievementContent } = await useAsyncData(
  () => `Achievement-${locale.value}`,
  () => fetchPageContent('Achievement'),
  {
    watch: [() => locale.value],
    server: false
  }
);

const activeSectionIds = ref<string[]>([])
const currentYear = new Date().getFullYear()
const links = computed(() => {
  const years = Array.from(
    { length: currentYear - 2022 + 1 },
    (_, i) => (2022 + i).toString()
  ).sort((y1, y2) => Number(y2) - Number(y1))
  const rawLinks = [...years, 'Reviews']
  return rawLinks.filter((key) => achievementContent.value?.includes(`<h2>${key}</h2>`))
})

const setIds = () => {
  const h2s = document.querySelectorAll('h2')
  h2s.forEach((h2) => {
    h2.setAttribute('id', h2.textContent || '')
    h2.classList.add('section')
  })
}

watch(achievementContent, async (newVal) => {
  if (newVal) {
    await nextTick()
    setIds()
  }
})

onMounted(async () => {
  if (achievementContent.value) {
    await nextTick()
    setIds()
  }
})

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div>
    <SubPageHeroSection title="Achievement" />
    <div class="flex justify-start">
      <aside class="w-[140px] min-w-[100px] text-2xl hidden sm:block py-4 md:py-12 sm:mt-4 md:mt-8 pl-8 font-bold text-[1.3rem]">
        <ul class="sticky top-[50px] mt-38">
          <li v-for="link in links" :key="link" class="mb-8">
            <a
              href="#"
              class="no-underline text-black transition-colors duration-300 visited:text-black"
              :class="{ active: activeSectionIds.includes(link) }"
              @click.prevent="scrollToSection(link)"
            >{{ link }}</a>
          </li>
        </ul>
      </aside>
      <section class="relative px-4 md:px-14 py-4 md:py-12 md:mt-8 sm:w-[calc(100%-140px)]">
        <div class="absolute top-0 left-0 w-[calc(100vw-140px)] h-full overflow-hidden">
          <div
            v-intersect="{ direction: 'right' }"
            class="absolute top-0 -right-[40%] w-[100%] h-[500px] min-w-80 md:bg-primary-light-green-opacity -z-10 opacity-0"
          ></div>
        </div>
        <div v-html="achievementContent"
          class="achievementContent prose prose-neutral max-w-none mx-auto text-base leading-relaxed text-sm md:text-base">
        </div>
      </section>
    </div>
  </div>
</template>

<style>
.achievementContent h2 {
  scroll-margin-top: 50px;
}
</style>