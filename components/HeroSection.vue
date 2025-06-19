<template>
  <section
    class="relative bg-cover bg-center bg-no-repeat min-h-[400px] flex flex-col items-center justify-center text-center text-white px-4"
    :style="{
      backgroundImage: `url('${useRuntimeConfig().app.baseURL}images/eyecatch.jpg')`,
      boxShadow: 'inset 0 0 9px 4px rgba(0,0,0,0.3)'
    }">
    <h1
      class="text-2xl sm:text-4xl md:text-4xl font-bold mb-2 sm:mb-4 drop-shadow-lg"
      :style="{ textShadow: '0 0 6px rgba(0, 0, 0, 0.4)' }"
    >
      {{ $t('hero.title') }}
    </h1>
    <p class="text-sm sm:text-base md:text-lg font-medium bg-black bg-opacity-70 px-4 py-2">
      {{ $t('hero.subtitle') }}
    </p>
  </section>
</template>