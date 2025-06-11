import { useI18n } from 'vue-i18n';
import { createClient as createContentfulClient } from 'contentful';
import { marked } from 'marked';

export async function fetchNews({
  skip = 0,
  limit = 0,
  slug = '',
  client,
  locale,
}: {
  skip?: number
  limit?: number
  slug?: string
  client: any
  locale: string
}) {
  const res = await client.getEntries({
    content_type: 'news',
    order: ['-fields.publishDate'],
    locale,
    limit: limit || undefined,
    skip: skip || undefined,
    'sys.id': slug || undefined
  })

  const newsList = res.items.map(item => ({
    title: item.fields.title,
    slug: item.sys.id,
    body: typeof item.fields.body === 'string' ? marked.parse(item.fields.body) : null,
    date: item.fields.publishDate,
  }))

  return {
    newsList,
    total: res.total
  }
}

function getContentfulContext() {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const contentfulLocale = config.public.localeMap[locale.value];

  const client = createContentfulClient({
    space: config.public.contentfulSpace,
    accessToken: config.public.contentfulToken
  });

  return { client, locale: contentfulLocale };
}

export async function fetchPageContent(title: string) {
  const { client, locale } = getContentfulContext();
  const { $marked } = useNuxtApp();
  const res = await client.getEntries({
    content_type: 'page',
    'fields.title': title,
    locale
  });

  const body = res.items[0]?.fields?.body;
  return typeof body === 'string' ? $marked.parse(body) : null;
}

export async function fetchMembers(isForTop: boolean) {
  const { client, locale } = getContentfulContext();
  const { $marked } = useNuxtApp();

  const params: any = {
    content_type: 'member',
    locale,
    order: 'sys.createdAt',
  };
  if (isForTop) params['fields.top'] = true;

  const res = await client.getEntries(params);
  return res.items.map((item) => {
    item.fields.image = item.fields.image?.fields?.file?.url;
    const profileText = item.fields.text
    const parsedText = typeof profileText === 'string' ? $marked.parse(profileText) : null
    item.fields.text = typeof parsedText === 'string' ? parsedText : null
    return item.fields
  });
}
