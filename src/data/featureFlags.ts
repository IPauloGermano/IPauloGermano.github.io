export const featureFlags = {
  showSeriesUI: false,
  showBookshelfSidebar: true,
  showBookshelfPage: false,
  showBookshelfNav: false
} as const;

export const showSeriesUI = featureFlags.showSeriesUI;
