import { Component } from '@angular/core';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { CardTabs } from '../../../shared/card-tabs/card-tabs';
import { ProfileSidebar } from '../../profile-sidebar';
import { IncomeChart } from '../../income-chart';

interface Invoice {
  label: string;
  amount: string;
  status: 'Paid' | 'Pending';
}

interface ProfileEvent {
  title: string;
  sub: string;
  meta: string;
}

@Component({
  selector: 'app-profile-sales',
  standalone: true,
  imports: [DashPage, ProfileSidebar, CardTabs, IncomeChart],
  templateUrl: './sales.html',
  styleUrl: './sales.scss',
})
export class ProfileSales {
  invoices: Invoice[] = [
    { label: '4255 Murazik Trace Apt. 998', amount: '$2400.00', status: 'Paid' },
    { label: '8672 West Estate Suite 910', amount: '$1800.00', status: 'Pending' },
    { label: '507 Henderson Flat Suite 326', amount: '$1650.00', status: 'Pending' },
    { label: '7613 Parker Point Suite 087', amount: '$3460.00', status: 'Paid' },
    { label: '264 Trevor Turnpike', amount: '$4800.00', status: 'Pending' },
    { label: '406 Melissa Islands', amount: '$1380.00', status: 'Paid' },
    { label: '4255 Murazik Trace Apt. 998', amount: '$2400.00', status: 'Paid' },
  ];

  events: ProfileEvent[] = [
    { title: 'Invoice #AA-04-19-1890678', sub: 'New Madieton LLC.', meta: '$118.00' },
    { title: 'Client Bernard Stanley', sub: 'bernard.stanley@gmail.com', meta: '$3208.00' },
    { title: 'Meeting with the client', sub: '24 Vandervort Springs', meta: '29 Oct 2019' },
    { title: 'Invoice #AA-04-19-1890243', sub: 'Tyriquemouth LLC.', meta: '$578.00' },
  ];
}
