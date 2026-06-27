import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow, pathSegments, withQueryParam } from '../utils';

const getCodePenSource = (url: URL) => {
  const segments = pathSegments(url);
  if (segments[1] === 'embed' && segments[2]) return withQueryParam(url, 'default-tab', 'result');
  if (segments[1] === 'pen' && segments[2]) {
    const embedUrl = new URL(`https://codepen.io/${segments[0]}/embed/${segments[2]}`);
    return withQueryParam(embedUrl, 'default-tab', 'result');
  }
  return '';
};

export const codePenAdapter: EmbedAdapter = {
  id: 'codepen',
  label: 'CodePen',
  matches: (url) => url.hostname === 'codepen.io' || url.hostname.endsWith('.codepen.io'),
  create: ({ url, title }) => {
    const src = getCodePenSource(url);
    if (!src) return null;

    return createIframeEmbed({
      platform: 'codepen',
      label: 'CodePen',
      title,
      src,
      layout: 'code',
      allow: iframeAllow.code
    });
  }
};
