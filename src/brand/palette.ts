/** Authoritative Phase 0 palette. Do not sample generated review-board images. */
export const PALETTE = {
  skyBlue: "#63B5D6",
  riverTeal: "#319C9A",
  terracotta: "#C96B50",
  foliage: "#6F9959",
  warmPlaster: "#F0D8AD",
  marigold: "#E6B74F",
  slateBlue: "#537C9B",
  inkNavy: "#293746",
  burgundy: "#8B3A3A",
  paperCream: "#EFE6D2",
  parchment: "#F7EEDB",
  stone: "#C8BCA7",
  charcoal: "#4A4A4A",
  crimson: "#D64541",
  imperialGold: "#C8A24A",
} as const;

export const TYPOGRAPHY = {
  display: '"Cinzel", "Georgia", serif',
  editorial: '"Playfair Display", "Georgia", serif',
  narrative: '"Source Serif 4", "Georgia", serif',
  utility: '"Inter", "Arial", sans-serif',
} as const;

export const MATERIALS = {
  paperNoiseOpacity: 0.055,
  mapPaper: "#E9DCC1",
  mapBorder: "#857A69",
  mapRoute: PALETTE.burgundy,
  mapMarker: PALETTE.inkNavy,
} as const;
