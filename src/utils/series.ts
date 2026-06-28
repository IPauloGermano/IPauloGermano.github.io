import type { CollectionEntry } from 'astro:content';
import { seriesCatalog, type SeriesId } from '../data/series';

type BlogPost = CollectionEntry<'blog'>;

export interface SeriesGroup {
  id: SeriesId;
  title: string;
  description?: string;
  posts: BlogPost[];
  updatedAt: Date;
}

export interface CurrentSeries {
  group: SeriesGroup;
  current: BlogPost;
  previous?: BlogPost;
  next?: BlogPost;
  currentIndex: number;
  total: number;
}

const isPublished = (post: BlogPost) => !post.data.draft;

const getSeries = (post: BlogPost) => post.data.series;

const getPostLabel = (post: BlogPost) => `${post.data.title} (${post.id})`;

export const getSeriesMetadata = (id: string) =>
  seriesCatalog[id as SeriesId];

export const getSeriesTitle = (post: BlogPost) => {
  const series = getSeries(post);
  if (!series) return '';
  return getSeriesMetadata(series.id)?.title ?? series.title ?? '';
};

export function validateSeriesEntries(posts: BlogPost[]) {
  const grouped = new Map<string, BlogPost[]>();

  for (const post of posts) {
    const series = getSeries(post);
    if (!series) continue;

    if (!getSeriesMetadata(series.id)) {
      throw new Error(
        `Série inexistente no catálogo: "${series.id}" em ${getPostLabel(post)}. ` +
        'Cadastre a série em src/data/series.ts.'
      );
    }

    if (series.order === undefined) {
      throw new Error(
        `Ordem ausente na série "${series.id}" em ${getPostLabel(post)}. ` +
        'Adicione series.order no frontmatter.'
      );
    }

    if (!Number.isInteger(series.order) || series.order < 1) {
      throw new Error(
        `Ordem inválida na série "${series.id}" em ${getPostLabel(post)}. ` +
        'series.order deve ser um número inteiro maior ou igual a 1.'
      );
    }

    const entries = grouped.get(series.id) ?? [];
    entries.push(post);
    grouped.set(series.id, entries);
  }

  for (const [seriesId, entries] of grouped) {
    const byOrder = new Map<number, BlogPost[]>();

    for (const entry of entries) {
      const order = entry.data.series?.order;
      if (order === undefined) continue;
      const sameOrder = byOrder.get(order) ?? [];
      sameOrder.push(entry);
      byOrder.set(order, sameOrder);
    }

    for (const [order, sameOrder] of byOrder) {
      if (sameOrder.length > 1) {
        throw new Error(
          `Ordem duplicada na série "${seriesId}": parte ${order}. ` +
          `Artigos: ${sameOrder.map(getPostLabel).join(', ')}.`
        );
      }
    }

    const ordered = [...byOrder.keys()].sort((a, b) => a - b);
    for (const [index, order] of ordered.entries()) {
      const expected = index + 1;
      if (order !== expected) {
        throw new Error(
          `Lacuna na ordem da série "${seriesId}". ` +
          `Esperado series.order ${expected}, mas foi encontrado ${order}. ` +
          'A ordem deve ser contínua começando em 1.'
        );
      }
    }
  }
}

export function getSeriesGroups(posts: BlogPost[], includeDrafts = false): SeriesGroup[] {
  validateSeriesEntries(posts);

  const grouped = new Map<SeriesId, BlogPost[]>();
  const eligiblePosts = includeDrafts ? posts : posts.filter(isPublished);

  for (const post of eligiblePosts) {
    const series = getSeries(post);
    if (!series) continue;
    const metadata = getSeriesMetadata(series.id);
    if (!metadata) continue;

    const seriesId = series.id as SeriesId;
    const entries = grouped.get(seriesId) ?? [];
    entries.push(post);
    grouped.set(seriesId, entries);
  }

  return [...grouped.entries()]
    .map(([id, entries]) => {
      const metadata = seriesCatalog[id];
      const postsInSeries = entries
        .sort((a, b) => (a.data.series?.order ?? 0) - (b.data.series?.order ?? 0));
      const updatedAt = postsInSeries
        .map((post) => post.data.publishedAt)
        .sort((a, b) => b.valueOf() - a.valueOf())[0] ?? new Date(0);

      return {
        id,
        title: metadata.title,
        description: metadata.description,
        posts: postsInSeries,
        updatedAt
      };
    })
    .filter((group) => group.posts.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
}

export function getSeriesGroup(posts: BlogPost[], id: string) {
  return getSeriesGroups(posts).find((group) => group.id === id);
}

export function getCurrentSeries(post: BlogPost, posts: BlogPost[]): CurrentSeries | null {
  const series = getSeries(post);
  if (!series) return null;

  const group = getSeriesGroup(posts, series.id);
  if (!group) return null;

  const currentIndex = group.posts.findIndex((entry) => entry.id === post.id);
  if (currentIndex < 0) return null;

  return {
    group,
    current: post,
    previous: group.posts[currentIndex - 1],
    next: group.posts[currentIndex + 1],
    currentIndex: currentIndex + 1,
    total: group.posts.length
  };
}

export function getSeriesPath(seriesId: string, order?: number) {
  const hash = order ? `#parte-${order}` : '';
  return `/series/${seriesId}/${hash}`;
}
