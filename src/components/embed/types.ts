export type EmbedLayoutKey =
  | 'video'
  | 'presentation'
  | 'spotifyCompact'
  | 'spotifyLarge'
  | 'googlePreview'
  | 'googleDocument'
  | 'googleSheet'
  | 'pdf'
  | 'design'
  | 'code'
  | 'gist'
  | 'htmlVideo';

export type EmbedLayoutMode = 'ratio' | 'fixed';

export interface EmbedLayout {
  mode: EmbedLayoutMode;
  aspectRatio?: string;
  height?: string;
  maxHeight?: string;
  scrollable?: boolean;
}

export interface EmbedRequest {
  url: URL;
  rawUrl: string;
  title: string;
}

export interface BaseEmbedDefinition {
  platform: string;
  label: string;
  title: string;
  src: string;
  layout: EmbedLayoutKey;
}

export interface IframeEmbedDefinition extends BaseEmbedDefinition {
  kind: 'iframe';
  allow?: string;
  allowFullscreen?: boolean;
  referrerPolicy?: ReferrerPolicy;
  sandbox?: string;
}

export interface VideoEmbedDefinition extends BaseEmbedDefinition {
  kind: 'video';
  type?: string;
}

export type EmbedDefinition = IframeEmbedDefinition | VideoEmbedDefinition;

export interface EmbedAdapter {
  id: string;
  label: string;
  matches: (url: URL, rawUrl: string) => boolean;
  create: (request: EmbedRequest) => EmbedDefinition | null;
}
