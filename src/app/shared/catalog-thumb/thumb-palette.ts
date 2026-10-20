const THUMB_COLORS = [
  'linear-gradient(135deg,#5e81f4,#9698d6)',
  'linear-gradient(135deg,#f4be5e,#ff808b)',
  'linear-gradient(135deg,#34b26b,#7ce7ac)',
  'linear-gradient(135deg,#ff808b,#f4be5e)',
  'linear-gradient(135deg,#9698d6,#5e81f4)',
  'linear-gradient(135deg,#7ce7ac,#34b26b)',
];

/** Gradient seed picker shared by catalog thumbnails (mirrors the avatar palette). */
export function thumbPalette(i: number): string {
  return THUMB_COLORS[i % THUMB_COLORS.length];
}
