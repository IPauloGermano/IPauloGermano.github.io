export const seriesCatalog = {
  'demo-series': {
    title: 'Demonstração de séries',
    description: 'Série de rascunho usada apenas para validar localmente o sistema de séries.'
  }
} as const;

export type SeriesId = keyof typeof seriesCatalog;
