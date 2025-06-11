<script setup>
import { HEADER_HEIGHT_PC } from '~/components/Header.vue'
</script>

<template>
  <div>
    <Header />
    <div :style="`margin-top: ${HEADER_HEIGHT_PC}px;`">
      <slot />
    </div>
    <Footer />
  </div>
</template>
