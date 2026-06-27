import type { EmbedAdapter } from '../types';
import { createVideoEmbed, hasFileExtension } from '../utils';

const videoExtensions = ['.mp4', '.webm', '.ogg'];

const getVideoType = (url: URL, rawUrl: string) => {
  const path = (rawUrl.startsWith('/') ? rawUrl : url.pathname).toLowerCase();
  if (path.endsWith('.webm')) return 'video/webm';
  if (path.endsWith('.ogg')) return 'video/ogg';
  return 'video/mp4';
};

export const htmlVideoAdapter: EmbedAdapter = {
  id: 'html-video',
  label: 'Vídeo',
  matches: (url, rawUrl) => hasFileExtension(url, rawUrl, videoExtensions),
  create: ({ url, rawUrl, title }) => createVideoEmbed({
    platform: 'html-video',
    label: 'Vídeo',
    title,
    src: rawUrl.startsWith('/') ? rawUrl : url.toString(),
    layout: 'htmlVideo',
    type: getVideoType(url, rawUrl)
  })
};
