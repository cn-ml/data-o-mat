import type { SitemapUrlInput } from "#sitemap/types";

export default defineSitemapEventHandler(async () => {
  const elections = await $fetch("/api/elections");
  return elections.map((i) => ({
    loc: `/${i.year}/${i.slug}`,
  })) satisfies SitemapUrlInput[];
});
