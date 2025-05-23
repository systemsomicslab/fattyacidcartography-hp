<script setup>
import { useI18n } from 'vue-i18n'
const { locale, setLocaleMessage } = useI18n()
const nuxtApp = useNuxtApp()
const availableLocales = nuxtApp.$i18n.locales
const selectedLocale = ref(locale.value)

function switchLocale() {
  const setLocale = nuxtApp.$i18n?.setLocale
  if (setLocale) {
    const path = setLocale(selectedLocale.value)
  }
}
</script>

<template>
  <header class="bg-white border-b shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- ロゴ -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Logo" class="h-10 w-auto" />
        <span class="font-semibold text-base sm:text-lg tracking-tight text-gray-700">
          Fatty Acid Diversity & Biology
        </span>
      </NuxtLink>
      <!-- ナビゲーション -->
      <nav class="flex items-center space-x-8">
        <NuxtLink to="/" class="font-semibold text-blue-600 hover:text-blue-400 transition-colors">
          {{ $t('nav.home') }}
        </NuxtLink>
        <NuxtLink to="/research" class="font-semibold text-blue-600 hover:text-blue-400 transition-colors">
          {{ $t('nav.research') }}
        </NuxtLink>
        <NuxtLink to="/members" class="font-semibold text-blue-600 hover:text-blue-400 transition-colors">
          {{ $t('nav.members') }}
        </NuxtLink>
        <NuxtLink to="/contact" class="font-semibold text-blue-600 hover:text-blue-400 transition-colors">
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
  </header>
</template>
