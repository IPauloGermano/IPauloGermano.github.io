import type { EmbedAdapter } from '../types';
import { createIframeEmbed, getGoogleDocumentId, iframeAllow } from '../utils';

export const googleDocsAdapter: EmbedAdapter = {
  id: 'google-docs',
  label: 'Google Docs',
  matches: (url) => url.hostname === 'docs.google.com' && url.pathname.startsWith('/document/'),
  create: ({ url, title }) => {
    const document = getGoogleDocumentId(url);
    if (!document?.id) return null;

    const src = document.published
      ? `https://docs.google.com/document/d/e/${document.id}/pub?embedded=true`
      : `https://docs.google.com/document/d/${document.id}/preview`;

    return createIframeEmbed({
      platform: 'google-docs',
      label: 'Google Docs',
      title,
      src,
      layout: 'googleDocument',
      allow: iframeAllow.document
    });
  }
};
