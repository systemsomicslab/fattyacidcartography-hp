import { createClient } from 'contentful';
const config = useRuntimeConfig();

const client = createClient({
  space: config.public.contentfulSpace,
  accessToken: config.public.contentfulToken
});

export async function fetchAllNews() {
  const res = await client.getEntries({ content_type: 'news', order: '-fields.publishDate' });
  return res.items.map(item => ({
    title: item.fields.title,
    slug: item.sys.id,
    body: item.fields.body,
    date: item.fields.publishDate,
    category: item.fields.category?.fields?.name ?? ''
  }));
}
