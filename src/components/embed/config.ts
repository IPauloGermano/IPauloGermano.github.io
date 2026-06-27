import type { EmbedLayout, EmbedLayoutKey } from './types';

export const allowedEmbedHostnames = [
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'player.vimeo.com',
  'loom.com',
  'drive.google.com',
  'docs.google.com',
  'figma.com',
  'open.spotify.com',
  'gist.github.com',
  'stackblitz.com',
  'codesandbox.io',
  'codepen.io',
  'excalidraw.com',
  'link.excalidraw.com'
] as const;

export const embedLayouts: Record<EmbedLayoutKey, EmbedLayout> = {
  video: {
    mode: 'ratio',
    aspectRatio: '16 / 9',
    maxHeight: '32rem'
  },
  presentation: {
    mode: 'ratio',
    aspectRatio: '16 / 9',
    maxHeight: '32rem'
  },
  spotifyCompact: {
    mode: 'fixed',
    height: '9.5rem',
    maxHeight: '9.5rem'
  },
  spotifyLarge: {
    mode: 'fixed',
    height: '22rem',
    maxHeight: '22rem'
  },
  googlePreview: {
    mode: 'fixed',
    height: '28rem',
    maxHeight: '28rem',
    scrollable: true
  },
  googleDocument: {
    mode: 'fixed',
    height: '32rem',
    maxHeight: '32rem',
    scrollable: true
  },
  googleSheet: {
    mode: 'fixed',
    height: '30rem',
    maxHeight: '30rem',
    scrollable: true
  },
  pdf: {
    mode: 'fixed',
    height: '32rem',
    maxHeight: '32rem',
    scrollable: true
  },
  design: {
    mode: 'ratio',
    aspectRatio: '16 / 10',
    maxHeight: '32rem',
    scrollable: true
  },
  code: {
    mode: 'fixed',
    height: '32rem',
    maxHeight: '32rem',
    scrollable: true
  },
  gist: {
    mode: 'fixed',
    height: '26rem',
    maxHeight: '26rem',
    scrollable: true
  },
  htmlVideo: {
    mode: 'ratio',
    aspectRatio: '16 / 9',
    maxHeight: '32rem'
  }
};

const isLocalPath = (rawUrl: string) => {
  const value = rawUrl.trim();
  return value.startsWith('/') && !value.startsWith('//');
};

export const hostnameMatches = (hostname: string, allowedHostname: string) =>
  hostname === allowedHostname || hostname.endsWith(`.${allowedHostname}`);

export const isAllowedEmbedSource = (url: URL, rawUrl: string, currentOrigin: string) => {
  if (isLocalPath(rawUrl)) return true;
  if (url.origin === currentOrigin && (url.protocol === 'http:' || url.protocol === 'https:')) return true;
  if (url.protocol !== 'https:') return false;
  return allowedEmbedHostnames.some((hostname) => hostnameMatches(url.hostname, hostname));
};
