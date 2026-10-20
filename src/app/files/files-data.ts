import { avatar } from '../shared/avatar';
import type { StackMember } from '../shared/avatar-stack/avatar-stack';

export type FileBadgeKind = 'diamond' | 'letter' | 'pdf' | 'folder';

export interface FileBadge {
  kind: FileBadgeKind;
  /** Letter(s) drawn inside the badge, e.g. `W`, `Ai`, `Ps`, `P`. */
  text?: string;
  tint: string;
  color: string;
}

export interface SharedFile {
  id: string;
  name: string;
  size: string;
  tag: 'Designer' | 'Employee' | 'Manager';
  badge: FileBadge;
  shared: StackMember[];
  extra: number;
}

function file(
  id: string,
  name: string,
  size: string,
  tag: SharedFile['tag'],
  badge: FileBadge,
  sharedInitials: string[],
  extra: number,
): SharedFile {
  return {
    id, name, size, tag, badge, extra,
    shared: sharedInitials.map((initials, i) => avatar(initials, i)),
  };
}

const YELLOW = { tint: '#fdf3e0', color: '#d99a2b' };
const BLUE = { tint: '#eef2fe', color: '#5e81f4' };
const RED = { tint: '#ffe9ec', color: '#f0566b' };
const TEAL = { tint: '#e4f8ec', color: '#34b26b' };

export const FILES: SharedFile[] = [
  file('f1', 'IOtask web UI kit.sketch', '162 Mb', 'Designer', { kind: 'diamond', ...YELLOW }, ['SW', 'HC', 'PP', 'BH'], 5),
  file('f2', 'User stories.docx', '1.2 Mb', 'Employee', { kind: 'letter', text: 'W', ...BLUE }, ['JM', 'DW', 'CG'], 5),
  file('f3', 'Budget estimates', '1.2 Mb', 'Employee', { kind: 'pdf', ...RED }, ['KW', 'JM', 'NG'], 5),
  file('f4', 'Additional materials', '24 Files', 'Manager', { kind: 'folder', ...TEAL }, ['DP', 'HR', 'PR'], 5),
  file('f5', 'Web Presentation.pdf', '26.9 Mb', 'Employee', { kind: 'pdf', ...RED }, ['WH', 'AT', 'NG'], 5),
  file('f6', 'Logo and branding.ai', '10.2 Mb', 'Designer', { kind: 'letter', text: 'Ai', ...YELLOW }, ['DP', 'SW', 'HC'], 5),
  file('f7', 'Converted files.psd', '16.2 Gb', 'Manager', { kind: 'letter', text: 'Ps', ...BLUE }, ['PP', 'BH', 'JM'], 5),
  file('f8', 'Presentation Invest.pptx', '3.6 Mb', 'Employee', { kind: 'letter', text: 'P', ...RED }, ['DW', 'CG', 'KW'], 5),
];

export interface FileComment {
  from: 'them' | 'me';
  text: string;
  time: string;
}

export const FILE_COMMENTS: FileComment[] = [
  { from: 'them', text: 'There is no denying the fact', time: '8:00 PM' },
  { from: 'me', text: 'Freelance Design Tricks', time: '8:20 PM' },
  { from: 'them', text: 'Not so many years ago businesses used to grunt', time: '8:21 PM' },
  { from: 'them', text: 'Another title for this article', time: '8:30 PM' },
  { from: 'them', text: 'Recently I came across an exciting video on the internet', time: '8:35 PM' },
  { from: 'me', text: 'There is no denying the fact that the success', time: '8:20 PM' },
];
