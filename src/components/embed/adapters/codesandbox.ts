import type { EmbedAdapter } from '../types';
import { createIframeEmbed, iframeAllow, pathSegments, withQueryParam } from '../utils';

const getCodeSandboxSource = (url: URL) => {
  const segments = pathSegments(url);
  if (segments[0] === 'embed') return withQueryParam(url, 'view', 'preview');
  if (segments[0] === 's' && segments[1]) {
    const embedUrl = new URL(`https://codesandbox.io/embed/${segments[1]}`);
    return withQueryParam(embedUrl, 'view', 'preview');
  }
  if (segments[0] === 'p' && segments[1] === 'sandbox') return withQueryParam(url, 'view', 'preview');
  return '';
};

export const codeSandboxAdapter: EmbedAdapter = {
  id: 'codesandbox',
  label: 'CodeSandbox',
  matches: (url) => url.hostname === 'codesandbox.io' || url.hostname.endsWith('.codesandbox.io'),
  create: ({ url, title }) => {
    const src = getCodeSandboxSource(url);
    if (!src) return null;

    return createIframeEmbed({
      platform: 'codesandbox',
      label: 'CodeSandbox',
      title,
      src,
      layout: 'code',
      allow: iframeAllow.code
    });
  }
};
