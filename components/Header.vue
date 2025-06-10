<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const nuxtApp = useNuxtApp()
const availableLocales = nuxtApp.$i18n.locales
const selectedLocale = ref(locale.value)

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
  <header class="bg-white border-b shadow-sm z-50 relative">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- ロゴ -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Logo" class="h-10 w-auto" />
        <span class="font-semibold text-base sm:text-lg tracking-tight text-gray-700">
          Fatty Acid Diversity & Biology
        </span>
      </NuxtLink>

      <!-- ハンバーガー: モバイルのみ表示 -->
      <button @click="toggleMenu" class="md:hidden flex items-center p-2 rounded hover:bg-gray-100 transition"
        aria-label="Open menu">
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- PCナビ -->
      <nav class="hidden md:flex items-center space-x-8">
        <NuxtLink to="/" class="font-semibold text-[#0B5FA5] text-sm transition-colors">
          {{ $t('nav.home') }}
        </NuxtLink>
        <NuxtLink to="/research" class="font-semibold text-[#0B5FA5] text-sm transition-colors">
          {{ $t('nav.research') }}
        </NuxtLink>
        <NuxtLink to="/members" class="font-semibold text-[#0B5FA5] text-sm transition-colors">
          {{ $t('nav.members') }}
        </NuxtLink>
        <NuxtLink to="/news" class="font-semibold text-[#0B5FA5] text-sm transition-colors">
          {{ $t('nav.news') }}
        </NuxtLink>
        <NuxtLink to="/contact" class="font-semibold text-[#0B5FA5] text-sm transition-colors">
          {{ $t('nav.contact') }}
        </NuxtLink>
        <!-- 言語切り替え -->
        <select v-model="selectedLocale" @change="switchLocale"
          class="ml-4 border rounded px-2 py-1 text-sm focus:outline-none">
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
      <nav v-if="menuOpen"
        class="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-lg z-50 p-6 flex flex-col space-y-6 md:hidden">
        <button @click="closeMenu" class="self-end mb-4" aria-label="Close menu">
          <svg class="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <NuxtLink to="/" class="font-semibold text-[#0B5FA5]" @click="closeMenu">
          {{ $t('nav.home') }}
        </NuxtLink>
        <NuxtLink to="/research" class="font-semibold text-[#0B5FA5]" @click="closeMenu">
          {{ $t('nav.research') }}
        </NuxtLink>
        <NuxtLink to="/members" class="font-semibold text-[#0B5FA5]" @click="closeMenu">
          {{ $t('nav.members') }}
        </NuxtLink>
        <NuxtLink to="/news" class="font-semibold text-[#0B5FA5]" @click="closeMenu">
          {{ $t('nav.news') }}
        </NuxtLink>
        <NuxtLink to="/contact" class="font-semibold text-[#0B5FA5]" @click="closeMenu">
          {{ $t('nav.contact') }}
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
