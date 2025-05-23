<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{
  title: string;
}>();
</script>
<template>
  <section class="relative bg-cover bg-center bg-no-repeat min-h-[200px] flex flex-col justify-center text-white"
    :style="{ backgroundImage: `url('/images/hero-background.png')` }">
    <h1 class="text-2xl sm:text-4xl md:text-4xl font-bold mb-2 sm:mb-4 drop-shadow-lg max-w-6xl px-4 md:px-14 mx-auto">
      {{ props.title }}
    </h1>
  </section>
</template>