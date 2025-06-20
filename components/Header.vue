<script>
export const HEADER_HEIGHT_PC = 64
</script>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const nuxtApp = useNuxtApp()
const availableLocales = nuxtApp.$i18n.locales
const selectedLocale = ref(locale.value)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > HEADER_HEIGHT_PC
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function switchLocale() {
  const setLocale = nuxtApp.$i18n?.setLocale
  if (setLocale) {
    setLocale(selectedLocale.value)
  }
}

// モバイル用メニュー開閉状態
const menuOpen = ref(false)
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="md:bg-white md:border-b shadow-s z-50 fixed top-0 left-0 w-full">
    <div
      class="max-w-7xl mx-auto flex items-center px-4 transition-all duration-300 justify-end gap-4"
      :class="isScrolled ? 'md:justify-center py-2' : 'md:justify-between py-3'"
    >
      <!-- ロゴ -->
      <NuxtLink
        :to="$localePath('/')"
        class="items-center space-x-2 transition-all duration-300 mr-8"
        :class="isScrolled ? 'hidden' : 'hidden md:flex'"
      >
        <img :src="`${useRuntimeConfig().app.baseURL}images/logo.png`" alt="Logo" class="h-10 w-auto" />
        <span class="font-semibold text-base sm:text-lg tracking-tight text-gray-700 whitespace-nowrap">
          Fatty Acid Cartography
        </span>
      </NuxtLink>

      <!-- ハンバーガー: モバイルのみ表示 -->
      <button @click="toggleMenu" class="md:hidden flex items-center p-2 rounded bg-link-color transition"
        aria-label="Open menu">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- PCナビ -->
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink :to="$localePath('/')"
          class="font-semibold text-link-color transition-colors whitespace-nowrap">
          {{ $t('nav.home') }}
        </NuxtLink>
        <NuxtLink :to="$localePath('/research')"
          class="font-semibold text-link-color transition-colors whitespace-nowrap">
          {{ $t('nav.research') }}
        </NuxtLink>
        <NuxtLink :to="$localePath('/group')"
          class="font-semibold text-link-color transition-colors whitespace-nowrap">
          {{ $t('nav.group') }}
        </NuxtLink>
        <NuxtLink :to="$localePath('/achievement')"
          class="font-semibold text-link-color transition-colors whitespace-nowrap">
          {{ $t('nav.achievement') }}
        </NuxtLink>
        <NuxtLink :to="$localePath('/news')"
          class="font-semibold text-link-color transition-colors whitespace-nowrap">
          {{ $t('nav.news') }}
        </NuxtLink>
        <!-- 言語切り替え -->
        <select v-model="selectedLocale" @change="switchLocale"
          class="ml-4 border rounded px-2 py-1 focus:outline-none">
          <option v-for="l in availableLocales" :key="l.code" :value="l.code">
            {{ l.name }}
          </option>
        </select>
      </nav>
    </div>

    <!-- モバイルドロワー -->
    <transition name="fade">
      <div v-if="menuOpen" class="fixed inset-0 z-40 bg-black/40 md:hidden" @click="closeMenu"></div>
    </transition>
    <transition name="slide">
      <nav
        v-if="menuOpen"
        class="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-lg z-50 p-6 flex flex-col space-y-6 md:hidden"
      >
        <div class="flex items-center justify-between mb-8">
          <NuxtLink
            :to="$localePath('/')"
            class="flex items-center space-x-2 transition-all duration-300 mr-8"
             @click="closeMenu"
          >
            <img :src="`${useRuntimeConfig().app.baseURL}images/logo.png`" alt="Logo" class="h-10 w-auto" />
            <span class="font-semibold text-sm tracking-tight text-gray-700 whitespace-nowrap">
              Fatty Acid Cartography
            </span>
          </NuxtLink>
          <button @click="closeMenu" class="self-end mb-4" aria-label="Close menu">
            <svg class="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <NuxtLink :to="$localePath('/')" class="font-semibold text-link-color" @click="closeMenu">
          {{ $t('nav.home') }}
        </NuxtLink>
        <NuxtLink :to="$localePath('/research')" class="font-semibold text-link-color" @click="closeMenu">
          {{ $t('nav.research') }}
        </NuxtLink>
        <NuxtLink :to="$localePath('/group')" class="font-semibold text-link-color" @click="closeMenu">
          {{ $t('nav.group') }}
        </NuxtLink>
        <NuxtLink :to="$localePath('/achievement')" class="font-semibold text-link-color" @click="closeMenu">
          {{ $t('nav.achievement') }}
        </NuxtLink>
        <NuxtLink :to="$localePath('/news')" class="font-semibold text-link-color" @click="closeMenu">
          {{ $t('nav.news') }}
        </NuxtLink>
        <select v-model="selectedLocale" @change="switchLocale"
          class="border rounded px-2 py-1 text-base focus:outline-none mt-4">
          <option v-for="l in availableLocales" :key="l.code" :value="l.code">
            {{ l.name }}
          </option>
        </select>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
/* スムーズなfade/slideトランジション例 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .2s;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
