import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow, pathSegments } from '../utils';

const getVimeoVideoId = (url: URL) => {
  const segments = pathSegments(url);
  if (url.hostname === 'player.vimeo.com' && segments[0] === 'video') return segments[1] ?? '';
  return segments.find((segment) => /^\d+$/.test(segment)) ?? '';
};

export const vimeoAdapter: EmbedAdapter = {
  id: 'vimeo',
  label: 'Vimeo',
  matches: (url) => url.hostname === 'vimeo.com' || url.hostname.endsWith('.vimeo.com'),
  create: ({ url, title }) => {
    const videoId = getVimeoVideoId(url);
    if (!/^\d+$/.test(videoId)) return null;

    return createIframeEmbed({
      platform: 'vimeo',
      label: 'Vimeo',
      title,
      src: `https://player.vimeo.com/video/${videoId}`,
      layout: 'video',
      allow: iframeAllow.media
    });
  }
};
