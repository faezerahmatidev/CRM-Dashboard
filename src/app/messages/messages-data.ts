import { avatar } from '../shared/avatar';
import type { StackMember } from '../shared/avatar-stack/avatar-stack';

export interface Conversation {
  id: string;
  name: string;
  subject: string;
  snippet: string;
  time: string;
  starred: boolean;
  hasAttach: boolean;
  member: StackMember;
}

function conversation(
  id: string,
  name: string,
  subject: string,
  snippet: string,
  time: string,
  palette: number,
  hasAttach = true,
): Conversation {
  const parts = name.split(' ');
  return {
    id,
    name,
    subject,
    snippet,
    time,
    starred: false,
    hasAttach,
    member: avatar(`${parts[0].charAt(0)}${parts[1].charAt(0)}`, palette),
  };
}

export const CONVERSATIONS: Conversation[] = [
  conversation('m1', 'Helena Chavez', 'About our new project', 'How To Write Better Advertising Copy', '11:52AM', 0),
  conversation('m2', 'Sallie Wade', 'Where To Look For', 'What Is Hdmi', '10:04AM', 1),
  conversation('m3', 'Peter Patterson', 'Decorate For Less With Art', 'Protective Preventative Maintenance', '03:19AM', 2),
  conversation('m4', 'Blake Howard', 'Finally A Top Secret Way You Can', 'The Best Answers', '08:31AM', 3),
  conversation('m5', 'Jimmy Marsh', 'Promotional Advertising Specialty', 'The Flash Tutorial', '12:54AM', 4),
  conversation('m6', 'Devin Williams', 'Decorate For Less With Art', 'Cleaning And Organizing', '08:01PM', 5),
  conversation('m7', 'Cole Glover', 'Get Best Advertiser In Your Side', 'Baby Monitor Technology', '09:50AM', 0),
  conversation('m8', 'Kyle Williamson', 'Creative Outdoor Ads', 'Addiction When Gambling Becomes A Problem', '02:23AM', 1),
  conversation('m9', 'Jay Morrison', 'Advertising Secrets', 'Going Wireless With Your Headphones', '12:20PM', 2),
];

/** Left mini-list preview text per conversation (conversation/media/about views). */
export const PREVIEWS: Record<string, string> = {
  m1: 'How To Write Better Advertising Copy Examples',
  m2: 'Recently I came across an exciting video on the internet video',
  m3: 'Consider the following scenario; it should serve to give you a clear',
  m4: 'When two people are working in cooperation, each can stand',
  m5: 'Promotional Advertising Specialty The Flash Tutorial',
  m6: 'Then once the testing was complete the person would have to return',
  m7: 'Get Best Advertiser In Your Side Baby Monitor Technology',
  m8: 'This concept, that there is no competition in your industry',
  m9: 'he two people would continue doing so, along the full length of the wall',
};

export interface ThreadMsg {
  from: 'them' | 'me' | 'typing';
  text: string;
  time: string;
}

export const THREAD: ThreadMsg[] = [
  { from: 'them', text: 'Ever wondered how some graphic designers always manage to produce', time: '8:00 PM' },
  { from: 'me', text: 'Freelance Design Tricks', time: '8:20 PM' },
  { from: 'them', text: "Successful businesses have many things in common, today we'll look", time: '' },
  { from: 'them', text: 'Marketers advertisers usually focus their efforts on the people', time: '8:00 PM' },
  { from: 'me', text: 'Attending a trade show can be a very effective method', time: '8:20 PM' },
  { from: 'them', text: 'Some graphic designers always manage to produce', time: '8:00 PM' },
  { from: 'me', text: 'Ui Design Tricks', time: '8:20 PM' },
];

export type MediaKind = 'file' | 'photo';

export interface MediaFile {
  name: string;
  size: string;
  kind: MediaKind;
  /** File badge glyph for `file` kind, gradient seed for `photo` kind. */
  badge: string;
  tint?: string;
  color?: string;
}

export const MEDIA_FILES: MediaFile[] = [
  { name: 'CRM UI kit.sketch', size: '162 Mb', kind: 'file', badge: '◆', tint: '#fdf3e0', color: '#d99a2b' },
  { name: 'User stories.docx', size: '1.2 Mb', kind: 'file', badge: 'W', tint: '#eef2fe', color: '#5e81f4' },
  { name: 'Budget estimates', size: '1.2 Mb', kind: 'file', badge: '✦', tint: '#ffe9ec', color: '#f0566b' },
  { name: 'Workspace', size: '', kind: 'photo', badge: '0' },
  { name: 'Logo and branding.ai', size: '16.2 Mb', kind: 'file', badge: 'Ai', tint: '#fdf3e0', color: '#d99a2b' },
  { name: 'Team offsite', size: '', kind: 'photo', badge: '1' },
  { name: 'CRM UI kit.psd', size: '128.9 Mb', kind: 'file', badge: 'Ps', tint: '#eef2fe', color: '#5e81f4' },
  { name: 'Product shoot', size: '', kind: 'photo', badge: '2' },
  { name: 'Presentation Invest.pptx', size: '1.2 Mb', kind: 'file', badge: 'P', tint: '#ffe9ec', color: '#f0566b' },
];

export const PHOTO_GRADIENTS = [
  'linear-gradient(135deg,#c9b8a8,#8a7a6a)',
  'linear-gradient(135deg,#7a8a9a,#4a5a6a)',
  'linear-gradient(135deg,#a8c8b8,#6a8a7a)',
];

export function fullName(c: Conversation): string {
  return c.name;
}
