import { createClient } from 'contentful';
import { useI18n } from 'vue-i18n';

export async function fetchAllNews() {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const contentfulLocale = config.public.localeMap[locale.value];
  const client = createClient({
    space: config.public.contentfulSpace,
    accessToken: config.public.contentfulToken
  });
  const res = await client.getEntries({
    content_type: 'news',
    order: ['-fields.publishDate'],
    locale: contentfulLocale,
  });
  return res.items.map(item => ({
    title: item.fields.title,
    slug: item.sys.id,
    body: item.fields.body,
    date: item.fields.publishDate,
    category: item.fields.category?.fields?.id ?? ''
  }));
}
