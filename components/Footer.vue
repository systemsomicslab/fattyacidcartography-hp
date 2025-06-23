<template>
  <footer class="w-full border-t border-gray-200 mt-2 md:mt-12 pb-8 pt-8 bg-white">
    <div class="max-w-5xl mx-auto flex flex-col items-center px-4">
      <!-- ロゴ群 -->
      <div class="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-6 w-full">
        <a href="https://www.mext.go.jp/" target="_blank" rel="noopener noreferrer">
          <img :src="`${useRuntimeConfig().app.baseURL}images/mext.png`" alt="文部科学省" class="h-10 md:h-12" />
        </a>
        <a href="https://www.jsps.go.jp/index.html" target="_blank" rel="noopener noreferrer">
          <img :src="`${useRuntimeConfig().app.baseURL}images/jsps.png`" alt="学術振興会" class="h-10 md:h-12" />
        </a>
      </div>
      <!-- コピーライト・制作 -->
      <div class="text-xs text-gray-600 text-center w-full">
        Copyright© 2025 学術変革領域研究B 脂肪酸代謝創生学 All Rights Reserved.
      </div>
    </div>
  </footer>
</template>
