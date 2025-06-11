<script setup>
import { HEADER_HEIGHT_PC } from '~/components/Header.vue'
const isSP = computed(() => {
    if (process.client) {
      return window.innerWidth < 768;
    }
    return false;
});
</script>

<template>
  <div>
    <Header />
    <div :style="{ marginTop: isSP ? 0 : `${HEADER_HEIGHT_PC}px`  }">
      <slot />
    </div>
    <Footer />
  </div>
</template>
