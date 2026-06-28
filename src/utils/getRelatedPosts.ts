interface TaggedPost {
  id: string;
  data: {
    tags: string[];
    publishedAt: Date;
    draft?: boolean;
    series?: {
      id: string;
      order?: number;
    };
  };
}

const normalizeTag = (tag: string) => tag.trim().toLocaleLowerCase('pt-BR');

export function getRelatedPosts<T extends TaggedPost>(currentPost: T, posts: T[], limit = 3): T[] {
  const currentTags = new Set(currentPost.data.tags.map(normalizeTag));
  const currentSeriesId = currentPost.data.series?.id;

  const sameSeriesPosts = currentSeriesId
    ? posts
      .filter((post) => post.id !== currentPost.id && !post.data.draft && post.data.series?.id === currentSeriesId)
      .sort((left, right) =>
        (left.data.series?.order ?? 0) - (right.data.series?.order ?? 0)
        || left.id.localeCompare(right.id, 'pt-BR')
      )
    : [];

  const selectedIds = new Set(sameSeriesPosts.map((post) => post.id));

  const tagRelatedPosts = posts
    .filter((post) => post.id !== currentPost.id && !post.data.draft && !selectedIds.has(post.id))
    .map((post) => ({
      post,
      commonTags: post.data.tags.reduce(
        (total, tag) => total + Number(currentTags.has(normalizeTag(tag))),
        0
      )
    }))
    .filter(({ commonTags }) => commonTags > 0)
    .sort((left, right) =>
      right.commonTags - left.commonTags
      || right.post.data.publishedAt.valueOf() - left.post.data.publishedAt.valueOf()
      || left.post.id.localeCompare(right.post.id, 'pt-BR')
    )
    .map(({ post }) => post);

  return [...sameSeriesPosts, ...tagRelatedPosts].slice(0, limit);
}
