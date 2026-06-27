import type { EmbedAdapter } from '../types';
import { createIframeEmbed, getGoogleDocumentId, iframeAllow } from '../utils';

export const googleSheetsAdapter: EmbedAdapter = {
  id: 'google-sheets',
  label: 'Google Sheets',
  matches: (url) => url.hostname === 'docs.google.com' && url.pathname.startsWith('/spreadsheets/'),
  create: ({ url, title }) => {
    const spreadsheet = getGoogleDocumentId(url);
    if (!spreadsheet?.id) return null;

    const src = spreadsheet.published
      ? `https://docs.google.com/spreadsheets/d/e/${spreadsheet.id}/pubhtml?widget=true&headers=false`
      : `https://docs.google.com/spreadsheets/d/${spreadsheet.id}/preview`;

    return createIframeEmbed({
      platform: 'google-sheets',
      label: 'Google Sheets',
      title,
      src,
      layout: 'googleSheet',
      allow: iframeAllow.document
    });
  }
};
