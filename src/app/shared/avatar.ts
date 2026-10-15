import { StackMember } from '../shared/avatar-stack/avatar-stack';

const AVATAR_COLORS = [
  'linear-gradient(135deg,#5e81f4,#9698d6)',
  'linear-gradient(135deg,#f4be5e,#ff808b)',
  'linear-gradient(135deg,#34b26b,#7ce7ac)',
  'linear-gradient(135deg,#ff808b,#f4be5e)',
  'linear-gradient(135deg,#9698d6,#5e81f4)',
  'linear-gradient(135deg,#7ce7ac,#34b26b)',
];

export function avatar(initials: string, i: number): StackMember {
  return { initials, color: AVATAR_COLORS[i % AVATAR_COLORS.length] };
}

export function members(initials: string[]): StackMember[] {
  return initials.map((name, i) => avatar(name, i));
}
