<script setup>
import { HEADER_HEIGHT_PC } from '~/components/Header.vue'
const isSP = ref(false)

onMounted(() => {
    isSP.value = window.innerWidth < 768;
    window.addEventListener('resize', () => {
        isSP.value = window.innerWidth < 768;
    });
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
