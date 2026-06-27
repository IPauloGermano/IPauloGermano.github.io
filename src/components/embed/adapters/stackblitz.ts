import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow, withQueryParam } from '../utils';

export const stackBlitzAdapter: EmbedAdapter = {
  id: 'stackblitz',
  label: 'StackBlitz',
  matches: (url) => url.hostname === 'stackblitz.com' || url.hostname.endsWith('.stackblitz.com'),
  create: ({ url, title }) => {
    if (!url.pathname.startsWith('/edit/') && !url.pathname.startsWith('/github/')) return null;

    return createIframeEmbed({
      platform: 'stackblitz',
      label: 'StackBlitz',
      title,
      src: withQueryParam(url, 'embed', '1'),
      layout: 'code',
      allow: iframeAllow.code
    });
  }
};
