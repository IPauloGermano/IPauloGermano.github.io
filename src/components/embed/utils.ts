import type { EmbedDefinition, EmbedLayoutKey } from './types';

const DEFAULT_SANDBOX = 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms';
const DEFAULT_REFERRER_POLICY: ReferrerPolicy = 'strict-origin-when-cross-origin';

export const iframeAllow = {
  media: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
  document: 'clipboard-write; fullscreen',
  code: 'accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; fullscreen',
  design: 'clipboard-write; fullscreen',
  audio: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
} as const;

export const createIframeEmbed = ({
  platform,
  label,
  title,
  src,
  layout,
  allow,
  allowFullscreen = true,
  sandbox = DEFAULT_SANDBOX,
  referrerPolicy = DEFAULT_REFERRER_POLICY
}: {
  platform: string;
  label: string;
  title: string;
  src: string;
  layout: EmbedLayoutKey;
  allow?: string;
  allowFullscreen?: boolean;
  sandbox?: string;
  referrerPolicy?: ReferrerPolicy;
}): EmbedDefinition => ({
  kind: 'iframe',
  platform,
  label,
  title,
  src,
  layout,
  allow,
  allowFullscreen,
  sandbox,
  referrerPolicy
});

export const createVideoEmbed = ({
  platform,
  label,
  title,
  src,
  layout,
  type
}: {
  platform: string;
  label: string;
  title: string;
  src: string;
  layout: EmbedLayoutKey;
  type?: string;
}): EmbedDefinition => ({
  kind: 'video',
  platform,
  label,
  title,
  src,
  layout,
  type
});

export const pathSegments = (url: URL) =>
  url.pathname.split('/').filter(Boolean);

export const firstPathSegment = (url: URL) => pathSegments(url)[0] ?? '';

export const isLocalPath = (rawUrl: string) => {
  const value = rawUrl.trim();
  return value.startsWith('/') && !value.startsWith('//');
};

export const hasFileExtension = (url: URL, rawUrl: string, extensions: string[]) => {
  const pathname = isLocalPath(rawUrl) ? rawUrl : url.pathname;
  const normalizedPathname = pathname.toLowerCase().split('?')[0]?.split('#')[0] ?? pathname.toLowerCase();
  return extensions.some((extension) => normalizedPathname.endsWith(extension));
};

export const withQueryParam = (url: URL, key: string, value: string) => {
  const normalizedUrl = new URL(url.href);
  normalizedUrl.searchParams.set(key, value);
  return normalizedUrl.toString();
};

export const getGoogleDocumentId = (url: URL) => {
  const segments = pathSegments(url);
  const dIndex = segments.indexOf('d');
  if (dIndex >= 0 && segments[dIndex + 1] === 'e' && segments[dIndex + 2]) {
    return { id: segments[dIndex + 2], published: true };
  }
  if (dIndex >= 0 && segments[dIndex + 1]) return { id: segments[dIndex + 1], published: false };

  return null;
};

export const getCleanId = (value: string | undefined) =>
  value?.replace(/[^A-Za-z0-9_-]/g, '') ?? '';
