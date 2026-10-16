import { avatar } from '../shared/avatar';
import type { StackMember } from '../shared/avatar-stack/avatar-stack';

export type ContactGroup = 'A' | 'B';

export interface Contact {
  id: string;
  first: string;
  last: string;
  role: string;
  email: string;
  phone: string;
  /** $/hr */
  rate: number;
  tag: string;
  /** 0-100 */
  progress: number;
  /** Left caption of the progress row in grid-02. */
  progressCaption: string;
  group: ContactGroup;
  member: StackMember;
}

function contact(
  id: string,
  first: string,
  last: string,
  role: string,
  email: string,
  phone: string,
  rate: number,
  progress: number,
  group: ContactGroup,
  palette: number,
  progressCaption?: string,
): Contact {
  return {
    id,
    first,
    last,
    role,
    email,
    phone,
    rate,
    tag: role,
    progress,
    progressCaption: progressCaption ?? 'Job progress',
    group,
    member: avatar(`${first.charAt(0)}${last.charAt(0)}`, palette),
  };
}

export const CONTACTS: Contact[] = [
  contact('c-a1', 'Nicholas', 'Gordon', 'Developer', 'ernest.mason@gmail.com', '561-303-6106', 17, 72, 'A', 0),
  contact('c-a2', 'Bradley', 'Malone', 'Manager', 'bradley.m@gmail.com', '242-576-7666', 15, 64, 'A', 1),
  contact('c-a3', 'Janie', 'Todd', 'Designer', 'stroman.hanna@yahoo.com', '467-624-8505', 16, 81, 'A', 2),
  contact('c-a4', 'Marvin', 'Lambert', 'Developer', 'micaela.okuneva@zemlak.biz', '716-937-5782', 19, 45, 'A', 3),
  contact('c-a5', 'Teresa', 'Lloyd', 'Designer', 'carlee_erdman@gmail.com', '496-144-8261', 13, 58, 'A', 4),
  contact('c-a6', 'Fred', 'Haynes', 'Manager', 'jarod.miller@hotmail.com', '305-305-1123', 17, 90, 'A', 5),
  contact('c-a7', 'Rose', 'Peters', 'Designer', 'oma.russel@hotmail.com', '828-963-3958', 15, 77, 'A', 0),
  contact('c-a8', 'Adeline', 'Frank', 'Manager', 'adeline.f@yahoo.com', '555-014-2288', 18, 69, 'A', 1),
  contact('c-b1', 'Bryan', 'Boyd', 'Developer', 'bryan.b@gmail.com', '561-303-6106', 17, 50, 'B', 2),
  contact('c-b2', 'Danny', 'Lawson', 'Manager', 'danny.l@gmail.com', '242-576-7666', 16, 84, 'B', 3, 'Manager'),
  contact('c-b3', 'Eric', 'Munoz', 'Designer', 'eric.m@yahoo.com', '467-624-8505', 14, 80, 'B', 4, 'Designer'),
  contact('c-b4', 'Russell', 'Roberts', 'Developer', 'russell.r@zemlak.biz', '716-937-5782', 19, 28, 'B', 5),
  contact('c-b5', 'Francisco', 'Salazar', 'Designer', 'francisco.s@gmail.com', '496-144-8261', 20, 55, 'B', 0, 'Designer'),
  contact('c-b6', 'David', 'Moss', 'Manager', 'david.m@hotmail.com', '305-305-1123', 17, 99, 'B', 1, 'Manager'),
  contact('c-b7', 'Luella', 'McCarthy', 'Designer', 'luella.m@hotmail.com', '828-963-3958', 18, 50, 'B', 2),
  contact('c-b8', 'Ethan', 'Griffin', 'Designer', 'ethan.g@hotmail.com', '828-963-3958', 15, 79, 'B', 3, 'Designer'),
];

export const OVERVIEW_A = [
  { value: '1.345', label: 'Employees', icon: 'team', tint: '#eef2fe', color: '#5e81f4' },
  { value: '342', label: 'Partners', icon: 'team', tint: '#fdf3e0', color: '#d99a2b' },
  { value: '3.980', label: 'Customers', icon: 'team', tint: '#eef2fe', color: '#5e81f4' },
];

export const OVERVIEW_B = [
  { value: '5.667', label: 'All Contacts', icon: 'team', tint: '#eef2fe', color: '#5e81f4' },
  { value: '1.345', label: 'Employees', icon: 'user', tint: '#f5f5fa', color: '#8181a5' },
  { value: '342', label: 'Partners', icon: 'team', tint: '#fdf3e0', color: '#d99a2b' },
  { value: '3.980', label: 'Customers', icon: 'team', tint: '#e4f8ec', color: '#34b26b' },
];

export const PROFILE = {
  name: 'Johanna Stevens',
  role: 'UI/UX Designer',
  email: 'johanna.stevens@gmail.com',
  phone: '402-001-4477',
  address: '05 Otilia Brook Apt. 181',
  about:
    'Color is so powerful that it can persuade, motivate, inspire and touch people\u2019s soft spot the heart. This is the reason why understanding colors is pretty crucial in relating.',
};

export function fullName(c: Contact): string {
  return `${c.first} ${c.last}`;
}

export function progressColor(pct: number): string {
  if (pct >= 80) return '#7ce7ac';
  if (pct >= 50) return '#f4be5e';
  return '#ff808b';
}

export function blankContact(first: string, last: string): Contact {
  return {
    id: `c-${Date.now()}`,
    first: first.trim() || 'New',
    last: last.trim() || 'Contact',
    role: 'Developer',
    email: '',
    phone: '',
    rate: 15,
    tag: 'Developer',
    progress: 0,
    progressCaption: 'Job progress',
    group: 'A',
    member: avatar(`${(first.charAt(0) || 'N').toUpperCase()}${(last.charAt(0) || 'C').toUpperCase()}`, 0),
  };
}
