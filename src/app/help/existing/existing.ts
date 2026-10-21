import { Component, inject } from '@angular/core';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ViewToolbar } from '../../shared/view-toolbar/view-toolbar';
import { ViewCard } from '../../shared/view-card/view-card';
import { NewButton } from '../../shared/new-button/new-button';
import { ActionsButton } from '../../shared/actions-button/actions-button';
import { Pagination } from '../../shared/pagination/pagination';
import { Fab } from '../../shared/fab/fab';
import { ContactAvatar } from '../../shared/contact-avatar/contact-avatar';
import { TicketsSidebar } from '../tickets-sidebar';
import { THREADS } from '../help-data';
import { HelpStore } from '../help-store';
import { avatar } from '../../shared/avatar';

@Component({
  selector: 'app-help-existing',
  standalone: true,
  imports: [DashPage, TicketsSidebar, ViewToolbar, ViewCard, NewButton, ActionsButton, Pagination, Fab, ContactAvatar],
  templateUrl: './existing.html',
  styleUrl: './existing.scss',
})
export class HelpExisting {
  protected store = inject(HelpStore);

  threads = THREADS;
  memberOf = (name: string, seed: number) => {
    const parts = name.split(' ');
    return avatar(`${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`, seed);
  };
}
