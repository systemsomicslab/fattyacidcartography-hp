<script setup>
const props = defineProps({
  postsPerPage: {
    type: Number,
    required: true
  },
  totalEntryCount: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['handlePageChange'])

const route = useRoute()
const currentPage = computed(() =>
  Number(route.query.page) || 1
)
const totalPage = computed(() =>
  Math.ceil(props.totalEntryCount / props.postsPerPage)
)

// ページ範囲ロジック
const visiblePages = computed(() => {
  const t = totalPage.value
  const c = currentPage.value
  if (t <= 5) {
    return Array.from({ length: t }, (_, i) => i + 1)
  }
  if (c <= 2) {
    return [1, 2, 3, 4, 5]
  }
  if (c >= t - 1) {
    return [t - 4, t - 3, t - 2, t - 1, t]
  }
  return [c - 2, c - 1, c, c + 1, c + 2]
})

function handlePageChange(page) {
  emit('handlePageChange', page)
}
</script>

<template>
  <div class="flex justify-center items-center space-x-2 my-4">
    <!-- 左矢印 -->
    <button v-if="currentPage !== 1" @click="handlePageChange(1)" class="text-gray-400 hover:text-[#0B5FA5] transition"
      aria-label="最初のページへ">&lt;</button>
    <!-- ページ番号リスト -->
    <ul class="flex space-x-2 mx-2">
      <li v-for="index in visiblePages" :key="index">
        <button @click="handlePageChange(index)" :class="[
          'w-8 h-8 flex items-center justify-center rounded font-bold text-sm',
          currentPage === index
            ? 'border border-[#0B5FA5] text-[#0B5FA5]'
            : 'text-gray-500 hover:text-white hover:bg-[#0B5FA5] transition'
        ]">{{ index }}</button>
      </li>
    </ul>
    <!-- 右矢印 -->
    <button v-if="currentPage !== totalPage" @click="handlePageChange(totalPage)"
      class="text-gray-400 hover:text-[#0B5FA5] transition" aria-label="最後のページへ">&gt;</button>
  </div>
</template>