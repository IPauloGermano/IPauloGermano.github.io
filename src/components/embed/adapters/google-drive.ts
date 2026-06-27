import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow, pathSegments } from '../utils';

const getDriveFileId = (url: URL) => {
  const segments = pathSegments(url);
  const fileIndex = segments.indexOf('file');
  if (fileIndex >= 0 && segments[fileIndex + 1] === 'd' && segments[fileIndex + 2]) return segments[fileIndex + 2];
  return url.searchParams.get('id') ?? '';
};

export const googleDriveAdapter: EmbedAdapter = {
  id: 'google-drive',
  label: 'Google Drive',
  matches: (url) => url.hostname === 'drive.google.com',
  create: ({ url, title }) => {
    const fileId = getDriveFileId(url);
    if (!/^[A-Za-z0-9_-]+$/.test(fileId)) return null;

    return createIframeEmbed({
      platform: 'google-drive',
      label: 'Google Drive',
      title,
      src: `https://drive.google.com/file/d/${fileId}/preview`,
      layout: 'googlePreview',
      allow: iframeAllow.document
    });
  }
};
