import { avatar } from '../shared/avatar';
import type { StackMember } from '../shared/avatar-stack/avatar-stack';

export interface PostComment {
  author: string;
  text: string;
  date: string;
  member: StackMember;
}

export interface Post {
  id: string;
  author: string;
  date: string;
  /** Sortable date key, ISO-like. */
  stamp: string;
  text: string;
  /** Gradient seeds for the photo thumbs. */
  photos: number[];
  member: StackMember;
  comments: PostComment[];
}

function comment(author: string, text: string, date: string, palette: number): PostComment {
  const parts = author.split(' ');
  return {
    author, text, date,
    member: avatar(`${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`, palette),
  };
}

function post(
  id: string,
  author: string,
  date: string,
  stamp: string,
  text: string,
  photos: number[],
  palette: number,
  comments: PostComment[] = [],
): Post {
  const parts = author.split(' ');
  return {
    id, author, date, stamp, text, photos, comments,
    member: avatar(`${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`, palette),
  };
}

export const POSTS: Post[] = [
  post(
    'n1', 'Johnny Bowers', '02 Jun 2019', '2019-06-02',
    'Color is so powerful that it can persuade, motivate, inspire and touch people\u2019s soft spot the heart. This is the reason why understanding colors is pretty crucial in relating and communicating with other people. Not only that, it is also important to businesses.',
    [0, 1, 2], 0,
    [comment('Teammate', 'Very nice photos, please upload even more details to our new web app', '04 May 2019', 3)],
  ),
  post(
    'n2', 'Elizabeth Cooper', '03 Jun 2019', '2019-06-03',
    'In efforts to expand our horizons, we welcome every investment-minded individual to join us in the Condotel Investment Opportunity. We can also freely advertise with us, exchange links with us, or be a member of our webring when you register. When you get to be a part of our webring, you get free exposure.',
    [], 1,
  ),
  post(
    'n3', 'Leila Robbins', '02 Jun 2019', '2019-06-02',
    'Color is so powerful that it can persuade, motivate, inspire and touch people\u2019s soft spot the heart. This is the reason why understanding colors is pretty crucial in relating and communicating with other people.',
    [], 2,
  ),
  post(
    'n4', 'Ida Spencer', '02 Jun 2019', '2019-06-02',
    'Moreover the striking, brilliant and vivid colors are the reason why we are attracted to the posters that we see. Posters had been a very beneficial marketing tool because it had paved to deliver an effective message.',
    [1, 2], 3,
    [comment('Teammate', 'Effective Forms Advertising Internet Web Site', '04 May 2019', 4)],
  ),
];

export interface Member {
  name: string;
  email: string;
  member: StackMember;
}

function member(name: string, email: string, palette: number): Member {
  const parts = name.split(' ');
  return {
    name, email,
    member: avatar(`${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`, palette),
  };
}

export const MEMBERS: Member[] = [
  member('Randy Atkins', 'randy.atkins@gmail.com', 0),
  member('Johnny Bowers', 'johnny.bowers@gmail.com', 1),
  member('Blanche Hall', 'blanche.hall@gmail.com', 2),
  member('Bobby Silva', 'bobby.silva@gmail.com', 3),
  member('Pearl Morrison', 'pearl.morrison@gmail.com', 4),
  member('Alberta Rogers', 'alberta.rogers@gmail.com', 5),
  member('Chase McCoy', 'chase.mccoy@gmail.com', 0),
  member('Elizabeth Cooper', 'eliz.cooper@gmail.com', 1),
];
