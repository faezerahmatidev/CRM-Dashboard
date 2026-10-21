export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: 'Personal' | 'Business' | 'Payments' | 'Invoices' | 'Settings';
}

export const FAQS: Faq[] = [
  {
    id: 'f1',
    question: 'What is the Prepaid Mastercard?',
    answer:
      'A good logo works in the simplest form. It is a memorable representation of your brand and inspires confidence in your customers.',
    category: 'Payments',
  },
  {
    id: 'f2',
    question: 'How do I know if I am eligible',
    answer:
      'Eligibility depends on your account verification level and your country of residence. Check the requirements in your profile.',
    category: 'Personal',
  },
  {
    id: 'f3',
    question: 'How do I order a Prepaid Mastercard?',
    answer:
      'A good logo works in the simplest form. It is a memorable representation of your brand and inspires confidence in your customers. It should be fresh and original — without visual cliches or amateur effects. A logo is well-designed when it looks as good on a business card as it does on a web page or a billboard. To be functional, a good logo must reduce well to simple black & white or grayscale for use on faxes or in newspaper ads. The best logos are elegantly simple.',
    category: 'Payments',
  },
  {
    id: 'f4',
    question: 'I have more than one currency balance',
    answer:
      'You can hold several currency balances at once and convert between them from the balances screen.',
    category: 'Business',
  },
  {
    id: 'f5',
    question: 'Can I have more than one active card',
    answer:
      'Yes, you can order additional cards for different currencies or team members from the cards section.',
    category: 'Payments',
  },
];

export interface HelpCategory {
  title: string;
  links: string[];
}

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    title: 'Getting started',
    links: ['Account with Card', 'Withdraw to Bank', 'Bank Accounts', 'How Do I Reset My Password?', 'How to get paid with Payoneer'],
  },
  {
    title: 'Transactions',
    links: ['What is the Prepaid Mastercard?', 'How do I know if I am eligible', 'How do I order a Prepaid Mastercard?', 'I have more than one currency balance', 'Can I have more than one active card'],
  },
  {
    title: 'Account management',
    links: ['How can I access Bank Accounts?', 'How can I add a new bank account?', 'After I added a bank account', 'What can I do when I have reached', 'How can I remove a bank account?'],
  },
];

export type TicketStatus = 'open' | 'started' | 'snoozed' | 'draft' | 'deleted';

export interface Ticket {
  id: string;
  number: string;
  subject: string;
  time: string;
  checked: boolean;
  status: TicketStatus;
}

function ticket(id: string, number: string, subject: string, time: string, checked: boolean): Ticket {
  return { id, number, subject, time, checked, status: 'open' };
}

export const TICKETS: Ticket[] = [
  ticket('t1', 'Ticket #2020-3454', 'How To Write Better Advertising Copy', '11:52AM', true),
  ticket('t2', 'Ticket #2020-8909', 'What Is Hdmi', '10:04AM', true),
  ticket('t3', 'Ticket #2020-1545', 'Protective Preventative Maintenance', '03:19AM', true),
  ticket('t4', 'Ticket #2020-0091', 'The Best Answers', '08:31AM', false),
  ticket('t5', 'Ticket #2020-1787', 'The Flash Tutorial', '12:54AM', false),
  ticket('t6', 'Ticket #2020-3452', 'Cleaning And Organizing', '08:01PM', false),
  ticket('t7', 'Ticket #2020-0032', 'Baby Monitor Technology', '09:50AM', false),
  ticket('t8', 'Ticket #2020-0098', 'Addiction When Gambling Becomes A Problem', '02:23AM', false),
  ticket('t9', 'Ticket #2020-3248', 'Going Wireless With Your Headphones', '12:20PM', false),
];

export interface TicketThread {
  ticketId: string;
  number: string;
  time: string;
  subject: string;
  body: string;
  author: string;
  tags: string[];
  attach: number;
  comments: number;
}

export const THREADS: TicketThread[] = [
  {
    ticketId: 't1',
    number: 'Ticket #2020-3454',
    time: '11:52AM',
    subject: 'How To Write Better Advertising Copy',
    body: 'I hate peeping Toms. For one thing they usually step all over the hedges and plants on the side of someone\u2019s house killing them and setting back the vegetation\u2019s gardener countless time and effort. Another thing I don\u2019t really like about them is that they\u2019re such sideline actors.',
    author: 'Lida Simpson',
    tags: ['Design', 'Help', 'UI', 'Installation'],
    attach: 4,
    comments: 1,
  },
  {
    ticketId: 't6',
    number: 'Ticket #2020-3452',
    time: '08:01PM',
    subject: 'Cleaning And Organizing',
    body: 'To a general advertiser outdoor advertising is worthy of consideration. Outdoor advertising is considered as the oldest form of advertising. Posting bills on wooden boards in the late 19th century led to the birth of the term billboard. Today, outdoor advertising includes',
    author: 'Cory Reid',
    tags: ['Design', 'Help', 'UI', 'Sketch App'],
    attach: 8,
    comments: 3,
  },
  {
    ticketId: 't7',
    number: 'Ticket #2020-0032',
    time: '09:50AM',
    subject: 'Baby Monitor Technology',
    body: 'I hate peeping Toms. For one thing they usually step all over the hedges and plants on the side of someone\u2019s house killing them and setting back the vegetation\u2019s gardener countless time and effort. Another thing I don\u2019t really like about them is that they\u2019re such sideline actors.',
    author: 'Chase Warner',
    tags: ['Design', 'Help', 'UI', 'Installation'],
    attach: 4,
    comments: 1,
  },
];

export const RECENT_TICKETS = [
  { number: 'Ticket #2020-1021', text: 'Moreover the striking, brilliant and vivid colors' },
  { number: 'Ticket #2020-4359', text: 'In the history of modern astronomy, there is small' },
  { number: 'Ticket #2020-4234', text: 'Advertising on a budget with a monthly frequency' },
  { number: 'Ticket #2020-9838', text: 'Search Engine Optimization And Advertising' },
  { number: 'Ticket #2020-1989', text: 'Moreover the striking, brilliant and vivid colors' },
];
