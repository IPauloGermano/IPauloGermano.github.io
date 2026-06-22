interface TaggedPost {
  id: string;
  data: {
    tags: string[];
    publishedAt: Date;
    draft?: boolean;
  };
}

const normalizeTag = (tag: string) => tag.trim().toLocaleLowerCase('pt-BR');

export function getRelatedPosts<T extends TaggedPost>(currentPost: T, posts: T[], limit = 3): T[] {
  const currentTags = new Set(currentPost.data.tags.map(normalizeTag));

  return posts
    .filter((post) => post.id !== currentPost.id && !post.data.draft)
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
    .slice(0, limit)
    .map(({ post }) => post);
}
