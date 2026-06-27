import type { EmbedAdapter } from '../types';
import { codePenAdapter } from './codepen';
import { codeSandboxAdapter } from './codesandbox';
import { excalidrawAdapter } from './excalidraw';
import { figmaAdapter } from './figma';
import { githubGistAdapter } from './github-gist';
import { googleDocsAdapter } from './google-docs';
import { googleDriveAdapter } from './google-drive';
import { googleSheetsAdapter } from './google-sheets';
import { googleSlidesAdapter } from './google-slides';
import { htmlVideoAdapter } from './html-video';
import { loomAdapter } from './loom';
import { pdfAdapter } from './pdf';
import { spotifyAdapter } from './spotify';
import { stackBlitzAdapter } from './stackblitz';
import { vimeoAdapter } from './vimeo';
import { youtubeAdapter } from './youtube';

export const embedAdapters: EmbedAdapter[] = [
  youtubeAdapter,
  vimeoAdapter,
  loomAdapter,
  googleDriveAdapter,
  googleDocsAdapter,
  googleSlidesAdapter,
  googleSheetsAdapter,
  spotifyAdapter,
  githubGistAdapter,
  stackBlitzAdapter,
  codeSandboxAdapter,
  codePenAdapter,
  figmaAdapter,
  excalidrawAdapter,
  pdfAdapter,
  htmlVideoAdapter
];
