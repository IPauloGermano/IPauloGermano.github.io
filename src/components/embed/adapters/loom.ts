import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow, pathSegments } from '../utils';

const getLoomVideoId = (url: URL) => {
  const segments = pathSegments(url);
  const markerIndex = segments.findIndex((segment) => segment === 'share' || segment === 'embed');
  return markerIndex >= 0 ? segments[markerIndex + 1] ?? '' : '';
};

export const loomAdapter: EmbedAdapter = {
  id: 'loom',
  label: 'Loom',
  matches: (url) => url.hostname === 'loom.com' || url.hostname.endsWith('.loom.com'),
  create: ({ url, title }) => {
    const videoId = getLoomVideoId(url);
    if (!/^[A-Za-z0-9]+$/.test(videoId)) return null;

    return createIframeEmbed({
      platform: 'loom',
      label: 'Loom',
      title,
      src: `https://www.loom.com/embed/${videoId}`,
      layout: 'video',
      allow: iframeAllow.media
    });
  }
};
