import type { EmbedAdapter } from '../types';
import { createIframeEmbed, hasFileExtension, iframeAllow } from '../utils';

export const pdfAdapter: EmbedAdapter = {
  id: 'pdf',
  label: 'PDF',
  matches: (url, rawUrl) => hasFileExtension(url, rawUrl, ['.pdf']),
  create: ({ url, rawUrl, title }) => createIframeEmbed({
    platform: 'pdf',
    label: 'PDF',
    title,
    src: rawUrl.startsWith('/') ? rawUrl : url.toString(),
    layout: 'pdf',
    allow: iframeAllow.document
  })
};
