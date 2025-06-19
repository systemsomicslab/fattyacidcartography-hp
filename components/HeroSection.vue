<template>
  <section
    class="relative bg-cover bg-center bg-no-repeat min-h-[400px] flex flex-col items-center justify-center text-center text-white"
    :style="{
      backgroundImage: `url('${useRuntimeConfig().app.baseURL}images/eyecatch.jpg')`,
      boxShadow: 'inset 0 0 9px 5px rgba(0,0,0,0.1)'
    }">
    <div class="bg-gradient-to-r from-primary-light-blue-hero-bg to-primary-light-green-hero-bg px-8 py-4">
      <h1
        class="text-2xl sm:text-4xl md:text-4xl font-bold mb-2 drop-shadow-lg"
        :style="{ textShadow: '0 0 6px rgba(0, 0, 0, 0.3)' }"
      >
        {{ $t('hero.title') }}
      </h1>
      <p
        class="text-sm sm:text-base md:text-lg font-medium"
        :style="{ textShadow: '0 0 6px rgba(0, 0, 0, 0.3)' }"
      >
        {{ $t('hero.subtitle') }}
      </p>
    </div>
  </section>
</template>