import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow, pathSegments } from '../utils';

const getYouTubeVideoId = (url: URL) => {
  const segments = pathSegments(url);

  if (url.hostname === 'youtu.be') return segments[0] ?? '';
  if (segments[0] === 'embed' || segments[0] === 'shorts' || segments[0] === 'live' || segments[0] === 'v') {
    return segments[1] ?? '';
  }

  return url.searchParams.get('v') ?? '';
};

export const youtubeAdapter: EmbedAdapter = {
  id: 'youtube',
  label: 'YouTube',
  matches: (url) => url.hostname === 'youtu.be' || url.hostname === 'youtube.com' || url.hostname.endsWith('.youtube.com'),
  create: ({ url, title }) => {
    const videoId = getYouTubeVideoId(url);
    if (!/^[A-Za-z0-9_-]+$/.test(videoId)) return null;

    return createIframeEmbed({
      platform: 'youtube',
      label: 'YouTube',
      title,
      src: `https://www.youtube.com/embed/${videoId}`,
      layout: 'video',
      allow: iframeAllow.media
    });
  }
};
