import type { EmbedAdapter, EmbedLayoutKey } from '../types';
import { createIframeEmbed, iframeAllow, pathSegments } from '../utils';

const compactTypes = new Set(['track', 'episode']);
const largeTypes = new Set(['album', 'artist', 'playlist', 'show']);
const supportedTypes = new Set([...compactTypes, ...largeTypes]);

const getSpotifyTarget = (url: URL) => {
  const segments = pathSegments(url);
  const offset = segments[0] === 'embed' ? 1 : 0;
  const type = segments[offset] ?? '';
  const id = segments[offset + 1] ?? '';
  return { type, id };
};

const getLayout = (type: string): EmbedLayoutKey =>
  compactTypes.has(type) ? 'spotifyCompact' : 'spotifyLarge';

export const spotifyAdapter: EmbedAdapter = {
  id: 'spotify',
  label: 'Spotify',
  matches: (url) => url.hostname === 'open.spotify.com',
  create: ({ url, title }) => {
    const { type, id } = getSpotifyTarget(url);
    if (!supportedTypes.has(type) || !/^[A-Za-z0-9]+$/.test(id)) return null;

    return createIframeEmbed({
      platform: 'spotify',
      label: 'Spotify',
      title,
      src: `https://open.spotify.com/embed/${type}/${id}`,
      layout: getLayout(type),
      allow: iframeAllow.audio,
      allowFullscreen: false,
      sandbox: 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox'
    });
  }
};
