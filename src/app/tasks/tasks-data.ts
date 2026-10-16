import { avatar } from '../shared/avatar';
import type { StackMember } from '../shared/avatar-stack/avatar-stack';

export type TaskStatus = 'Done' | 'Pending' | 'On Hold';

export interface SubTask {
  title: string;
  done: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  sub: string;
  attach: number;
  comments: number;
  status: TaskStatus;
  done: boolean;
  member: StackMember;
  created: string;
  due: string;
  tag: string;
  description: string;
  checklist: SubTask[];
}

function t(
  id: string,
  title: string,
  sub: string,
  attach: number,
  comments: number,
  status: TaskStatus,
  initials: string,
  palette: number,
): TaskItem {
  return {
    id,
    title,
    sub,
    attach,
    comments,
    status,
    done: status === 'Done',
    member: avatar(initials, palette),
    created: '07 Jun 2019',
    due: '14 Aug 2018',
    tag: 'Spotify',
    description:
      'When I first got into the online advertising business, I was looking for the magical combination that would put my website into the top search engine rankings, catapult me to the forefront of the minds or individuals looking to buy my product, and generally make me rich beyond my wildest dreams.',
    checklist: [
      { title: 'Design new home page', done: true },
      { title: 'Send design samples to the customer', done: false },
    ],
  };
}

export const TASK_OVERVIEW = { all: 298, pending: 84, complete: 214, archived: 380 };

export const SEED_TASKS: TaskItem[] = [
  t('task-01', 'Budget and contract', '0/3', 0, 5, 'Done', 'NG', 0),
  t('task-02', 'Search for a UI kit', '2/9', 7, 3, 'Done', 'DP', 1),
  t('task-03', 'Design new dashboard', '3/5', 2, 2, 'Done', 'HR', 2),
  t('task-04', 'Design search page', '4/6', 8, 6, 'Pending', 'PR', 3),
  t('task-05', 'Prepare HTML & CSS', '0/2', 1, 1, 'Pending', 'WH', 4),
  t('task-06', 'Fix issues', '5/9', 2, 3, 'On Hold', 'AT', 5),
  t('task-07', 'Budget and contract', '4/4', 3, 5, 'On Hold', 'NG', 1),
  t('task-08', 'Search for a UI kit', '0/1', 1, 9, 'On Hold', 'DP', 2),
  t('task-09', 'Search for a UI kit', '0/1', 1, 2, 'On Hold', 'HR', 3),
  t('task-10', 'Budget and contract', '4/4', 3, 4, 'On Hold', 'PR', 4),
];

export function blankTask(title: string): TaskItem {
  const name = title.trim() || 'New task';
  return {
    id: `task-${Date.now()}`,
    title: name,
    sub: '0/1',
    attach: 0,
    comments: 0,
    status: 'Pending',
    done: false,
    member: avatar('ME', 0),
    created: '07 Jun 2019',
    due: '14 Aug 2018',
    tag: 'Spotify',
    description: '',
    checklist: [],
  };
}
