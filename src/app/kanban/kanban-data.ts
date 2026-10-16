import { avatar } from '../shared/avatar';
import type { StackMember } from '../shared/avatar-stack/avatar-stack';

export type KanbanColumn = 'todo' | 'progress' | 'done';
export type DateTint = 'grey' | 'red' | 'yellow';

export interface KanbanCheck {
  title: string;
  done: boolean;
}

export interface KanbanCard {
  id: string;
  title: string;
  sub: string;
  done: number;
  total: number;
  date: string;
  dateTint: DateTint;
  barColor: string;
  column: KanbanColumn;
  comments: number;
  attach: number;
  members: StackMember[];
  extra: number;
  created: string;
  due: string;
  tag: string;
  description: string;
  checklist: KanbanCheck[];
}

export const KANBAN_OVERVIEW = [
  { label: 'To do', value: '1.345', pct: 75, color: '#7ce7ac' },
  { label: 'Pending', value: '840', pct: 30, color: '#f4be5e' },
  { label: 'Done', value: '1.084', pct: 80, color: '#5e81f4' },
];

const DESCRIPTION =
  'When I first got into the online advertising business, I was looking for the magical combination that would put my website into the top search engine rankings, catapult me to the forefront of the minds or individuals looking to buy my product, and generally make me rich beyond my wildest dreams.';

function card(
  id: string,
  title: string,
  sub: string,
  done: number,
  total: number,
  date: string,
  dateTint: DateTint,
  barColor: string,
  column: KanbanColumn,
  footer: { comments?: number; attach?: number; members?: string[]; extra?: number },
): KanbanCard {
  return {
    id,
    title,
    sub,
    done,
    total,
    date,
    dateTint,
    barColor,
    column,
    comments: footer.comments ?? 0,
    attach: footer.attach ?? 0,
    members: (footer.members ?? []).map((m, i) => avatar(m, i)),
    extra: footer.extra ?? 0,
    created: '07 Jun 2019',
    due: '14 Aug 2018',
    tag: 'Spotify',
    description: DESCRIPTION,
    checklist: [
      { title: 'Design new home page', done: true },
      { title: 'Send design samples to the customer', done: false },
    ],
  };
}

export const SEED_CARDS: KanbanCard[] = [
  card('kb-01', 'Design new UI presentation', 'Dribbble Presentation', 7, 14, '24 Aug 2019', 'grey', '#f4be5e', 'todo', { comments: 4, attach: 1 }),
  card('kb-02', 'Add more UI/UX mockups', 'Pinterest Promotion', 8, 16, '14 Mar 2019', 'red', '#f4be5e', 'todo', { members: ['NG', 'DP'], extra: 5 }),
  card('kb-03', 'Design few mobile screens', 'Dropbox Mobile App', 3, 14, '14 Jan 2019', 'yellow', '#ff808b', 'todo', { extra: 3 }),
  card('kb-04', 'Create a new wireframe', 'Website Development', 6, 12, '27 May 2019', 'grey', '#f4be5e', 'progress', { members: ['HR', 'PR'], extra: 5 }),
  card('kb-05', 'Create a twit and promote', 'Twitter Marketing', 4, 8, '04 Aug 2019', 'grey', '#ff808b', 'progress', { comments: 4, attach: 1 }),
  card('kb-06', 'Add product to the market', 'Envanto App Design', 4, 4, '21 Aug 2019', 'grey', '#7ce7ac', 'done', { members: ['WH', 'AT'], extra: 4 }),
  card('kb-07', 'Run and manage campaign', 'Adwords Campaign', 6, 6, '27 Nov 2019', 'red', '#7ce7ac', 'done', { comments: 4, attach: 1 }),
  card('kb-08', 'Launch product promotion', 'Kickstarter Campaign', 7, 8, '07 Sep 2019', 'yellow', '#7ce7ac', 'done', { comments: 4, attach: 1 }),
];

export function blankCard(column: KanbanColumn, title: string): KanbanCard {
  const name = title.trim() || 'New task';
  return {
    id: `kb-${Date.now()}`,
    title: name,
    sub: 'New Task',
    done: 0,
    total: 1,
    date: '14 Aug 2018',
    dateTint: 'grey',
    barColor: '#f4be5e',
    column,
    comments: 0,
    attach: 0,
    members: [],
    extra: 0,
    created: '07 Jun 2019',
    due: '14 Aug 2018',
    tag: 'Spotify',
    description: '',
    checklist: [],
  };
}
