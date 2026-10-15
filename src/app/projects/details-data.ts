import { DetailsInfo } from '../shared/project-info-panel/project-info-panel';
import { StackMember } from '../shared/avatar-stack/avatar-stack';

const AVATARS: string[] = [
  'linear-gradient(135deg,#5e81f4,#9698d6)',
  'linear-gradient(135deg,#f4be5e,#ff808b)',
  'linear-gradient(135deg,#34b26b,#7ce7ac)',
  'linear-gradient(135deg,#ff808b,#f4be5e)',
  'linear-gradient(135deg,#9698d6,#5e81f4)',
  'linear-gradient(135deg,#7ce7ac,#34b26b)',
];

export function avatar(initials: string, i: number): StackMember {
  return { initials, color: AVATARS[i % AVATARS.length] };
}

export const DETAILS_INFO: DetailsInfo = {
  logo: 'Bē',
  name: 'Behance Presentation',
  category: 'Design',
  description:
    'Color is so powerful that it can persuade, motivate, inspire and touch people\u2019s soft spot the heart. This is the reason why understanding colors is pretty crucial in relating and communicating with other people. Not only that, it is also important to businesses.',
  due: '14 Aug 2018',
  files: '128 Files',
  assigned: [
    avatar('NG', 0), avatar('DP', 1), avatar('HR', 2),
    avatar('PR', 3), avatar('WH', 4), avatar('AT', 5),
  ],
  clients: [avatar('NG', 1), avatar('DP', 3), avatar('HR', 0)],
  spendings: '$5600 / $9800',
  spendPct: 57,
};

export type TaskStatus = 'Done' | 'Pending' | 'On Hold';

export interface DetailTask {
  title: string;
  sub: string;
  attach: number;
  comments: number;
  status: TaskStatus;
  member: StackMember;
}

export const DETAILS_TASKS: DetailTask[] = [
  { title: 'Budget and contract', sub: '0/3', attach: 0, comments: 5, status: 'Done', member: avatar('NG', 0) },
  { title: 'Search for a UI kit', sub: '2/9', attach: 7, comments: 3, status: 'Done', member: avatar('DP', 1) },
  { title: 'Design new dashboard', sub: '3/5', attach: 2, comments: 2, status: 'Done', member: avatar('HR', 2) },
  { title: 'Design search page', sub: '4/6', attach: 8, comments: 6, status: 'Pending', member: avatar('PR', 3) },
  { title: 'Prepare HTML & CSS', sub: '0/2', attach: 1, comments: 1, status: 'Pending', member: avatar('WH', 4) },
  { title: 'Fix issues', sub: '5/9', attach: 2, comments: 3, status: 'On Hold', member: avatar('AT', 5) },
  { title: 'Budget and contract', sub: '4/4', attach: 3, comments: 5, status: 'On Hold', member: avatar('NG', 1) },
  { title: 'Search for a UI kit', sub: '0/1', attach: 1, comments: 9, status: 'On Hold', member: avatar('DP', 2) },
  { title: 'Search for a UI kit', sub: '0/1', attach: 1, comments: 2, status: 'On Hold', member: avatar('HR', 3) },
  { title: 'Budget and contract', sub: '4/4', attach: 3, comments: 4, status: 'On Hold', member: avatar('AT', 0) },
];

export interface KanbanCard {
  title: string;
  project: string;
  prog: string;
  bar: number;
  barColor: string;
  date: string;
  dateTone: '' | 'red' | 'yellow';
  comments: number;
  attach: number;
  members: StackMember[];
  extra: number;
}

export interface KanbanColumn {
  title: string;
  cards: KanbanCard[];
}

export const DESK_COLUMNS: KanbanColumn[] = [
  {
    title: 'To do',
    cards: [
      { title: 'Design new UI presentation', project: 'Dribble Presentation', prog: '7/14', bar: 50, barColor: '#f4be5e', date: '24 Aug 2019', dateTone: '', comments: 4, attach: 1, members: [], extra: 0 },
      { title: 'Add more UI/UX mockups', project: 'Pinterest Promotion', prog: '8/16', bar: 50, barColor: '#f4be5e', date: '14 Mar 2019', dateTone: 'red', comments: 0, attach: 0, members: [avatar('NG', 0), avatar('DP', 1)], extra: 5 },
      { title: 'Design few mobile screens', project: 'Dropbox Mobile App', prog: '3/14', bar: 21, barColor: '#ff808b', date: '14 Jan 2019', dateTone: 'yellow', comments: 0, attach: 0, members: [avatar('HR', 2), avatar('PR', 3)], extra: 3 },
    ],
  },
  {
    title: 'In progress',
    cards: [
      { title: 'Create a new wireframe', project: 'Website Development', prog: '6/12', bar: 50, barColor: '#f4be5e', date: '27 May 2019', dateTone: '', comments: 0, attach: 0, members: [avatar('WH', 4), avatar('AT', 5)], extra: 5 },
      { title: 'Create a twit and promote', project: 'Twitter Marketing', prog: '4/8', bar: 50, barColor: '#ff808b', date: '04 Aug 2019', dateTone: '', comments: 4, attach: 1, members: [], extra: 0 },
    ],
  },
  {
    title: 'Done',
    cards: [
      { title: 'Add product to the market', project: 'Envanto App Design', prog: '4/4', bar: 100, barColor: '#7ce7ac', date: '21 Aug 2019', dateTone: '', comments: 0, attach: 0, members: [avatar('NG', 1), avatar('DP', 2)], extra: 4 },
      { title: 'Run and manage campaign', project: 'Adwords Campaign', prog: '6/6', bar: 100, barColor: '#7ce7ac', date: '27 Nov 2019', dateTone: 'red', comments: 4, attach: 1, members: [], extra: 0 },
      { title: 'Launch product promotion', project: 'Kickstarter Campaign', prog: '7/8', bar: 88, barColor: '#7ce7ac', date: '07 Sep 2019', dateTone: 'yellow', comments: 4, attach: 1, members: [], extra: 0 },
    ],
  },
];

export interface ActivityItem {
  title: string;
  text: string;
  author: string;
  photos: string[];
}

export interface ActivityGroup {
  date: string;
  items: ActivityItem[];
}

const PHOTOS = [
  'linear-gradient(135deg,#2b2d42,#5e81f4)',
  'linear-gradient(135deg,#5e81f4,#9698d6)',
  'linear-gradient(135deg,#343a5e,#7ce7ac)',
  'linear-gradient(135deg,#1c1d21,#8181a5)',
];

export const ACTIVITY_GROUPS: ActivityGroup[] = [
  {
    date: '14 NOV 2019',
    items: [
      {
        title: 'New comment',
        text: 'Business cards represent not only your business, but it also tells people your professionalism in the industry. In the business world today, the usage of business cards is far beyond just informing people who you are.',
        author: 'Alex Thomas',
        photos: [],
      },
      {
        title: 'New attachments',
        text: 'Business cards represent not only your business, but it also tells people your professionalism in the industry. In the business world today, the usage of business cards is far beyond just informing people who you are.',
        author: 'Alex Thomas',
        photos: PHOTOS,
      },
      {
        title: 'Changed project description',
        text: 'Businesses often become known today through effective marketing. The marketing may be in the form of a regular news item or half column society news in the Sunday newspaper. The marketing may be in the form of a heart to heart talk with Mr. Brown on his prominent local television show. These are all advertising. Businesses cannot get away from the force of advertising. If they want to make their products known in the marketplace',
        author: 'Alex Thomas',
        photos: [],
      },
    ],
  },
];

export interface DetailFile {
  name: string;
  size: string;
  tag: string;
  glyph: string;
  tint: string;
  color: string;
  members: StackMember[];
  extra: number;
}

export const DETAILS_FILES: DetailFile[] = [
  { name: 'IOtask web UI kit.sketch', size: '162 Mb', tag: 'Designer', glyph: '◆', tint: '#fdf3e0', color: '#d99a2b', members: [avatar('NG', 1), avatar('DP', 2), avatar('HR', 3), avatar('PR', 0)], extra: 5 },
  { name: 'Presentation Invest.pptx', size: '3.6 Mb', tag: 'Employee', glyph: 'P', tint: '#ffe9ec', color: '#ff808b', members: [avatar('WH', 4), avatar('AT', 5), avatar('NG', 0), avatar('DP', 1)], extra: 5 },
  { name: 'User stories.docx', size: '1.2 Mb', tag: 'Employee', glyph: 'W', tint: '#e9eefe', color: '#5e81f4', members: [avatar('HR', 2), avatar('PR', 3), avatar('WH', 4), avatar('AT', 5)], extra: 5 },
  { name: 'Budget estimates', size: '1.2 Mb', tag: 'Employee', glyph: '♨', tint: '#ffe9ec', color: '#f0566b', members: [avatar('NG', 0), avatar('DP', 1), avatar('HR', 2), avatar('WH', 4)], extra: 5 },
  { name: 'Additional materials', size: '24 Files', tag: 'Manager', glyph: '⧉', tint: '#e4f8ec', color: '#2fbf71', members: [avatar('PR', 3), avatar('AT', 5), avatar('NG', 1), avatar('DP', 0)], extra: 5 },
  { name: 'Logo and branding.ai', size: '10.2 Mb', tag: 'Designer', glyph: 'Ai', tint: '#fdf3e0', color: '#d99a2b', members: [avatar('HR', 2), avatar('WH', 4), avatar('PR', 0), avatar('AT', 1)], extra: 5 },
  { name: 'Converted files.psd', size: '16.2 Gb', tag: 'Manager', glyph: 'Ps', tint: '#e9eefe', color: '#5e81f4', members: [avatar('NG', 3), avatar('DP', 4), avatar('HR', 5), avatar('WH', 0)], extra: 5 },
];

export interface ReportSale {
  product: string;
  pid: string;
  customer: string;
  email: string;
  country: string;
  address: string;
  shipping: string;
  total: string;
  status: string;
  badge: string;
  color: string;
  initial: string;
}

export const REPORT_SALES: ReportSale[] = [
  { product: 'Macbook Pro', pid: 'ID 10-3290-08', customer: 'Rodney Cannon', email: 'rodney.cannon@gmail.com', country: 'United Kingdom', address: '193 Cole Plains Suite 649, 89120E', shipping: '$18.00', total: '$118.00', status: 'Shipped', badge: 'badge-green', color: 'linear-gradient(135deg,#5e81f4,#9698d6)', initial: 'M' },
  { product: 'Dell Laptop', pid: 'ID 10-3456-18', customer: 'Mike Franklin', email: 'mike.franklin@gmail.com', country: 'United States', address: '619 Jeffrey Freeway Apt. 273', shipping: '$28.00', total: '$208.00', status: 'Processing', badge: 'badge-yellow', color: 'linear-gradient(135deg,#1c1d21,#8181a5)', initial: 'D' },
  { product: 'Macbook Air', pid: 'ID 10-3786-23', customer: 'Louis Franklin', email: 'louis.franklin@gmail.com', country: 'Germany', address: '200 Davis Estates Suite 421', shipping: '$18.00', total: '$118.00', status: 'Processing', badge: 'badge-yellow', color: 'linear-gradient(135deg,#9698d6,#5e81f4)', initial: 'A' },
];
