import type { EmbedAdapter } from '../types';
import { createIframeEmbed, getGoogleDocumentId, iframeAllow } from '../utils';

export const googleSlidesAdapter: EmbedAdapter = {
  id: 'google-slides',
  label: 'Google Slides',
  matches: (url) => url.hostname === 'docs.google.com' && url.pathname.startsWith('/presentation/'),
  create: ({ url, title }) => {
    const presentation = getGoogleDocumentId(url);
    if (!presentation?.id) return null;

    const src = presentation.published
      ? `https://docs.google.com/presentation/d/e/${presentation.id}/embed?start=false&loop=false&delayms=3000`
      : `https://docs.google.com/presentation/d/${presentation.id}/embed?start=false&loop=false&delayms=3000`;

    return createIframeEmbed({
      platform: 'google-slides',
      label: 'Google Slides',
      title,
      src,
      layout: 'presentation',
      allow: iframeAllow.document
    });
  }
};
