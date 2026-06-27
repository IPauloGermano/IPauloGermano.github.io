import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow, pathSegments } from '../utils';

const supportedFigmaKinds = new Set(['file', 'design', 'proto', 'board']);

export const figmaAdapter: EmbedAdapter = {
  id: 'figma',
  label: 'Figma',
  matches: (url) => url.hostname === 'figma.com' || url.hostname.endsWith('.figma.com'),
  create: ({ url, title }) => {
    const [kind] = pathSegments(url);
    if (!supportedFigmaKinds.has(kind)) return null;

    const embedUrl = new URL('https://www.figma.com/embed');
    embedUrl.searchParams.set('embed_host', 'share');
    embedUrl.searchParams.set('url', url.toString());

    return createIframeEmbed({
      platform: 'figma',
      label: 'Figma',
      title,
      src: embedUrl.toString(),
      layout: 'design',
      allow: iframeAllow.design
    });
  }
};
