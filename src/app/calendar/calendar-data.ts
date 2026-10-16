export type EventColor = 'blue' | 'green' | 'red' | 'yellow';
export type CalView = 'month' | 'week' | 'day';

export interface CalEvent {
  id: string;
  title: string;
  sub: string;
  /** ISO date `YYYY-MM-DD`. */
  date: string;
  /** Display range, e.g. `10:00-11:00`. */
  time: string;
  color: EventColor;
  /** Hour position inside the week/day time grid (7 = 7am). */
  startHour: number;
  /** Height in hour rows. */
  span: number;
  done: boolean;
}

export interface Upcoming {
  time: string;
  color: EventColor;
  title: string;
  sub: string;
}

function ev(
  id: string,
  title: string,
  sub: string,
  date: string,
  time: string,
  color: EventColor,
  startHour: number,
  span: number,
): CalEvent {
  return { id, title, sub, date, time, color, startHour, span, done: false };
}

export const SEED_EVENTS: CalEvent[] = [
  ev('ce-01', 'Meeting', 'Tell How To Boost Website Traffic', '2018-08-27', '10:00-11:00', 'blue', 10, 1),
  ev('ce-02', 'Design new pages', 'Design new pages for the website', '2018-08-29', '10:00-11:00', 'green', 10, 1),
  ev('ce-03', 'Meeting', 'Tell How To Boost Website Traffic', '2018-09-03', '7:30 - 9:00', 'blue', 7.5, 1.5),
  ev('ce-04', 'Meeting', 'Tell How To Boost Website Traffic', '2018-09-04', '12:30 - 1:00', 'blue', 12.5, 1),
  ev('ce-05', 'Design new pages', 'Design new pages for the website', '2018-09-05', '9:00 - 11:00', 'green', 9, 2),
  ev('ce-06', 'Visit course', 'Check updates about design course', '2018-09-07', '7:30 - 9:00', 'red', 7.5, 1.5),
  ev('ce-07', 'Design new UI', 'Find new pages and check analytics', '2018-09-07', '9:00-13:00', 'yellow', 9, 4),
  ev('ce-08', 'Visit course', 'Check updates about design course', '2018-09-08', '10:00-11:00', 'red', 10, 1),
  ev('ce-09', 'Design new UI and check sales', 'Find new pages and check analytics', '2018-09-12', '9:00-13:00', 'yellow', 9, 4),
  ev('ce-10', 'Visit course', 'Check updates about design course', '2018-09-21', '10:00-11:00', 'red', 10, 1),
  ev('ce-11', 'Meeting', 'Tell How To Boost Website Traffic', '2018-09-25', '10:00-11:00', 'blue', 10, 1),
];

export const UPCOMING: Upcoming[] = [
  { time: '10:00-11:00', color: 'blue', title: 'Meeting with a client', sub: 'Tell How To Boost Website Traffic' },
  { time: '12:00-14:00', color: 'green', title: 'Design new pages', sub: 'Design new pages for the website' },
  { time: '9:00-13:00', color: 'yellow', title: 'Design new UI and check sales', sub: 'Find new pages and check analytics' },
  { time: '05:40-13:20', color: 'red', title: 'Visit online course', sub: 'Check updates about design course' },
];

/** Demo anchor: the dataset lives in September 2018, so "Today" returns here. */
export const DEMO_TODAY = { y: 2018, m: 8, d: 7 };

export function blankEvent(date: string, title: string): CalEvent {
  return {
    id: `ce-${Date.now()}`,
    title: title.trim() || 'New event',
    sub: 'New scheduled event',
    date,
    time: '10:00 - 11:00',
    color: 'blue',
    startHour: 10,
    span: 1,
    done: false,
  };
}

export function toISO(y: number, m0: number, d: number): string {
  return `${y}-${String(m0 + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function addDaysISO(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + n);
  return toISO(dt.getFullYear(), dt.getMonth(), dt.getDate());
}
