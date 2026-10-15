import { Message } from '../dashboard/widgets/messages-list';

const AVATAR_COLORS = [
  'linear-gradient(135deg,#5e81f4,#9698d6)',
  'linear-gradient(135deg,#f4be5e,#ff808b)',
  'linear-gradient(135deg,#34b26b,#7ce7ac)',
  'linear-gradient(135deg,#ff808b,#f4be5e)',
  'linear-gradient(135deg,#9698d6,#5e81f4)',
  'linear-gradient(135deg,#7ce7ac,#34b26b)',
];

export interface ProjectMember {
  initials: string;
  color: string;
}

export interface Project {
  name: string;
  category: string;
  tasksDone: number;
  tasksTotal: number;
  budget: string;
  due: string;
  brand: { glyph: string; tint: string; color: string };
  members: ProjectMember[];
  extra: number;
  /** "Tasks complete" pair shown on grid cards (differs from list counters). */
  complete?: string;
  /** Mini progress bar 0-100 shown on grid cards. */
  progress?: number;
  progressColor?: string;
}

function members(initials: string[]): ProjectMember[] {
  return initials.map((name, i) => ({
    initials: name,
    color: AVATAR_COLORS[i % AVATAR_COLORS.length],
  }));
}

export const PROJECT_MESSAGES: Message[] = [
  { name: 'Nicholas Gordon', text: 'Moreover the striking, brilliant and vivid colors', time: '10m', initials: 'NG', color: AVATAR_COLORS[1] },
  { name: 'Douglas Payne', text: 'In the history of modern astronomy, there is small', time: '1hr', initials: 'DP', color: AVATAR_COLORS[0] },
  { name: 'Harriett Robbins', text: 'Advertising on a budget with a monthly frequency', time: '2hr', initials: 'HR', color: AVATAR_COLORS[2] },
  { name: 'Polly Robbins', text: 'Search Engine Optimization And Advertising', time: '1hr', initials: 'PR', color: AVATAR_COLORS[3] },
  { name: 'Willie Holloway', text: 'Effective forms advertising internet web site performance', time: '2hr', initials: 'WH', color: AVATAR_COLORS[4] },
];

export const LIST_PROJECTS: Project[] = [
  { name: 'Dribbble Website', category: 'Development', tasksDone: 90, tasksTotal: 90, budget: '$12.500', due: '17 Nov 2019', brand: { glyph: 'D', tint: '#ffe9ec', color: '#ff808b' }, members: members(['NG', 'DP', 'HR', 'PR']), extra: 5 },
  { name: 'Theme Development', category: 'Development', tasksDone: 20, tasksTotal: 45, budget: '$36.900', due: '07 Mar 2019', brand: { glyph: 'T', tint: '#e4f8ec', color: '#34b26b' }, members: members(['WH', 'NG', 'DP', 'HR']), extra: 5 },
  { name: 'Dropbox App Design', category: 'Design', tasksDone: 15, tasksTotal: 85, budget: '$62.300', due: '26 Jul 2019', brand: { glyph: 'D', tint: '#e9eefe', color: '#5e81f4' }, members: members(['PR', 'WH', 'NG', 'DP']), extra: 5 },
  { name: 'Airbnb Development', category: 'Development', tasksDone: 45, tasksTotal: 70, budget: '$12.800', due: '02 Mar 2019', brand: { glyph: 'A', tint: '#ffe9ec', color: '#f0566b' }, members: members(['HR', 'PR', 'WH', 'NG']), extra: 5 },
  { name: 'Kickstarter Campaign', category: 'Marketing', tasksDone: 34, tasksTotal: 93, budget: '$52.900', due: '04 Oct 2019', brand: { glyph: 'K', tint: '#e4f8ec', color: '#2fbf71' }, members: members(['DP', 'HR', 'PR', 'WH']), extra: 5 },
  { name: 'Pinterest Promotion', category: 'Social', tasksDone: 42, tasksTotal: 89, budget: '$142.800', due: '06 Apr 2019', brand: { glyph: 'P', tint: '#ffe9ec', color: '#ff808b' }, members: members(['NG', 'WH', 'DP', 'HR']), extra: 5 },
  { name: 'Behance UI Presentation', category: 'Design', tasksDone: 90, tasksTotal: 110, budget: '$32.800', due: '21 Jan 2019', brand: { glyph: 'Bē', tint: '#e9eefe', color: '#5e81f4' }, members: members(['PR', 'NG', 'WH', 'DP']), extra: 5 },
];

export const GRID_PROJECTS: Project[] = [
  { name: 'Dribbble Website', category: 'Development', tasksDone: 90, tasksTotal: 90, budget: '', due: '', brand: { glyph: 'D', tint: '#ffe9ec', color: '#ff808b' }, members: members(['NG', 'DP', 'HR']), extra: 5, complete: '90 / 148', progress: 62, progressColor: '#7ce7ac' },
  { name: 'Theme Development', category: 'Development', tasksDone: 20, tasksTotal: 45, budget: '', due: '', brand: { glyph: 'T', tint: '#e4f8ec', color: '#34b26b' }, members: members(['WH', 'NG', 'DP']), extra: 2, complete: '20 / 145', progress: 18, progressColor: '#ff808b' },
  { name: 'Dropbox App Design', category: 'Design', tasksDone: 15, tasksTotal: 85, budget: '', due: '', brand: { glyph: 'D', tint: '#e9eefe', color: '#5e81f4' }, members: members(['PR', 'WH', 'NG']), extra: 9, complete: '90 / 110', progress: 80, progressColor: '#7ce7ac' },
  { name: 'Airbnb Development', category: 'Development', tasksDone: 45, tasksTotal: 70, budget: '', due: '', brand: { glyph: 'A', tint: '#ffe9ec', color: '#f0566b' }, members: members(['HR', 'PR', 'WH']), extra: 3, complete: '50 / 150', progress: 34, progressColor: '#f4be5e' },
  { name: 'Kickstarter Campaign', category: 'Marketing', tasksDone: 34, tasksTotal: 93, budget: '', due: '', brand: { glyph: 'K', tint: '#e4f8ec', color: '#2fbf71' }, members: members(['DP', 'HR', 'PR']), extra: 7, complete: '80 / 270', progress: 30, progressColor: '#f4be5e' },
  { name: 'Pinterest Promotion', category: 'Social', tasksDone: 42, tasksTotal: 89, budget: '', due: '', brand: { glyph: 'P', tint: '#ffe9ec', color: '#ff808b' }, members: members(['NG', 'WH', 'DP']), extra: 6, complete: '98 / 124', progress: 79, progressColor: '#7ce7ac' },
  { name: 'Behance UI Presentation', category: 'Design', tasksDone: 90, tasksTotal: 110, budget: '', due: '', brand: { glyph: 'Bē', tint: '#e9eefe', color: '#5e81f4' }, members: members(['PR', 'NG', 'WH']), extra: 5, complete: '94 / 116', progress: 81, progressColor: '#7ce7ac' },
  { name: 'Google Optimization', category: 'Marketing', tasksDone: 70, tasksTotal: 190, budget: '', due: '', brand: { glyph: 'G', tint: '#fdf3e0', color: '#d99a2b' }, members: members(['HR', 'DP', 'NG']), extra: 9, complete: '70 / 190', progress: 37, progressColor: '#ff808b' },
];
