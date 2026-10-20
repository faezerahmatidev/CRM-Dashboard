import { avatar } from '../shared/avatar';
import type { StackMember } from '../shared/avatar-stack/avatar-stack';

export type InvoiceStatus = 'Paid' | 'Scheduled' | 'Unpaid';
export type InvoiceCategory = 'Business' | 'Sales' | 'Services';

export interface Invoice {
  id: string;
  number: string;
  date: string;
  customer: string;
  status: InvoiceStatus;
  amount: string;
  category: InvoiceCategory;
  member: StackMember;
}

function invoice(
  id: string,
  number: string,
  date: string,
  customer: string,
  status: InvoiceStatus,
  amount: string,
  category: InvoiceCategory,
  palette: number,
): Invoice {
  const parts = customer.split(' ');
  return {
    id, number, date, customer, status, amount, category,
    member: avatar(`${parts[0].charAt(0)}${parts[1].charAt(0)}`, palette),
  };
}

export const INVOICES: Invoice[] = [
  invoice('i1', 'AA-04-19-1890', '18 May 2019', 'Sophia Wagner', 'Paid', '$1890.00', 'Business', 0),
  invoice('i2', 'AA-04-19-1090', '07 Jul 2019', 'Daniel Gonzales', 'Scheduled', '$2190.00', 'Sales', 1),
  invoice('i3', 'AA-04-12-2830', '24 Jan 2019', 'Jesus Hughes', 'Unpaid', '$2450.00', 'Services', 2),
  invoice('i4', 'AA-04-15-2132', '12 Jul 2019', 'Theresa Walters', 'Paid', '$1900.00', 'Sales', 3),
  invoice('i5', 'AA-04-19-1567', '26 Oct 2019', 'Jeanette Hines', 'Scheduled', '$3550.00', 'Services', 4),
  invoice('i6', 'AA-04-19-1983', '22 Jul 2019', 'Mason Arnold', 'Paid', '$1670.00', 'Business', 5),
  invoice('i7', 'AA-04-11-3550', '12 Mar 2019', 'Nicholas Cross', 'Paid', '$4800.00', 'Business', 0),
];

export type InvoiceFilter = 'All' | 'Draft' | 'Scheduled' | 'Paid';

export const BREAKDOWN = [
  { label: 'All Invoices', sub: 'Week comparison', value: '1.345', bar: 72, color: '#5e81f4' },
  { label: 'Scheduled', sub: 'Month comparison', value: '3.820', bar: 58, color: '#f4be5e' },
  { label: 'Unpaid', sub: 'Week comparison', value: '$4690', bar: 64, color: '#ff808b' },
  { label: 'Paid', sub: 'Month comparison', value: '$3820', bar: 81, color: '#7ce7ac' },
];

export interface Activity {
  title: string;
  date: string;
  amount: string;
  kind: 'created' | 'due' | 'paid';
}

export const ACTIVITIES: Activity[] = [
  { title: 'Created invoice #AA-04-19-1890', date: '04 Aug 2019', amount: '$1890.00', kind: 'created' },
  { title: 'Set due date to 13 Nov 2019', date: '05 May 2019', amount: '$2190.00', kind: 'due' },
];

export interface InvoiceLine {
  item: string;
  hours: string;
  rate: string;
  amount: string;
}

export const INVOICE_LINES: InvoiceLine[] = [
  { item: 'CRM UI design', hours: '356', rate: '$10', amount: '$3560' },
  { item: 'CRM coding HTML & CSS', hours: '420', rate: '$20', amount: '$8400' },
];

export const INVOICE_DETAIL = {
  number: 'AA-04-19-1890',
  company: 'Dropbox Inc.',
  date: '13 Nov 2019',
  fromName: 'WhiteOnWhite',
  fromLines: ['The Business Centre', '61 Wellfield Road', 'Roath', 'Cardiff', 'CF24 3DG', 'mail@wowww.xyz', '+1 456-980-3004'],
  toName: 'Dropbox Inc.',
  toLines: ['3 Edgar Buildings', 'George Street', 'Bath', 'England', 'BA1 2FJ', 'mail@dropbox.com', '+1 736-140-1003'],
  subtotal: '$11960',
  tax: '$1196',
  total: '$13156',
};
