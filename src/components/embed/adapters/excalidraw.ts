import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow } from '../utils';

export const excalidrawAdapter: EmbedAdapter = {
  id: 'excalidraw',
  label: 'Excalidraw',
  matches: (url) => url.hostname === 'excalidraw.com' || url.hostname.endsWith('.excalidraw.com'),
  create: ({ url, title }) => {
    if (url.pathname === '/' && !url.hash) return null;

    return createIframeEmbed({
      platform: 'excalidraw',
      label: 'Excalidraw',
      title,
      src: url.toString(),
      layout: 'design',
      allow: iframeAllow.design
    });
  }
};
