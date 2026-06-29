export const featureFlags = {
  showSeriesUI: false,
  showBookshelfSidebar: true,
  showBookshelfPage: true,
  showBookshelfNav: true
} as const;

export const showSeriesUI = featureFlags.showSeriesUI;
