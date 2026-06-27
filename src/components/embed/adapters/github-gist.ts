import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow, pathSegments } from '../utils';

export const githubGistAdapter: EmbedAdapter = {
  id: 'github-gist',
  label: 'GitHub Gist',
  matches: (url) => url.hostname === 'gist.github.com',
  create: ({ url, title }) => {
    const [owner, gistId] = pathSegments(url);
    if (!owner || !/^[A-Za-z0-9_-]+$/.test(owner) || !/^[A-Fa-f0-9]+$/.test(gistId ?? '')) return null;

    return createIframeEmbed({
      platform: 'github-gist',
      label: 'GitHub Gist',
      title,
      src: `https://gist.github.com/${owner}/${gistId}.pibb`,
      layout: 'gist',
      allow: iframeAllow.code
    });
  }
};
