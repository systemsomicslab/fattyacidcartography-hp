<script setup>
import { fetchNews } from '~/contentful/fetchContent'
import { createClient as createContentfulClient } from 'contentful';
import { formatDate } from '~/utils/util'
import { useI18n } from 'vue-i18n';

const POSTS_PER_PAGE = 10

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.query.slug)
const page = computed(() => Number(route.query.page) || 1)
const { locale } = useI18n();
const config = useRuntimeConfig();
const contentfulLocale = config.public.localeMap[locale.value];

const client = createContentfulClient({
  space: config.public.contentfulSpace,
  accessToken: config.public.contentfulToken
})

const { data, pending, error } = useAsyncData(
  () => `news-${slug.value ?? ''}-${page.value ?? 1}`,
  async () =>
    fetchNews({
      skip: (page.value - 1) * POSTS_PER_PAGE,
      limit: POSTS_PER_PAGE,
      slug: slug.value,
      client,
      locale: contentfulLocale
    })
)

const news = computed(() => slug.value ? data.value?.newsList?.[0] : null)
const newsList = computed(() => data.value?.newsList ?? [])

const handlePageChange = newPage => {
  if (page.value === newPage) return
  router.push({
    query: {
      ...route.query,
      page: newPage
    }
  })
}
</script>

<template>
  <SubPageHeroSection title="News" />
  <section class="relative px-4 md:px-14 py-12 max-w-6xl mx-auto mt-8">
    <div class="absolute top-0 -left-[40%] w-[100%] h-[60%] min-w-80 min-h-[250px] bg-[#4ECEEF]/20 -z-10"></div>

    <!-- ローディング表示 -->
    <div v-if="pending">取得中...</div>

    <!-- エラー表示 -->
    <div v-else-if="error">記事の取得に失敗しました</div>

    <!-- 記事詳細 -->
    <div v-else-if="news">
      <h2 className="text-lg font-bold">{{ news.title }}</h2>
      <p className="text-sm text-gray-700">{{ formatDate(news.date) }}</p>
      <div className="mt-4 pb-8" v-html="news.body"></div>
    </div>

    <!-- slugが指定されていて記事がない場合 -->
    <div v-else-if="slug">記事が見つかりません。</div>

    <!-- 記事リスト -->
    <div v-else class="grid max-w-4xl">
      <div v-for="article in newsList" :key="article.slug" class="pb-6">
        <p class="text-sm text-gray-500 mb-1">{{ formatDate(article.date) }}</p>
        <NuxtLink :to="`/news?slug=${article.slug}`" class="text-sm md:text-base mb-1 hover:underline">
          {{ article.title }}
        </NuxtLink>
      </div>
      <NewsPagination :total-entry-count="data?.total || 0" :posts-per-page="POSTS_PER_PAGE"
        @handlePageChange="handlePageChange" />
    </div>
  </section>
</template>
