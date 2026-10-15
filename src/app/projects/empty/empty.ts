import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { PanelHeader } from '../../shared/panel-header/panel-header';
import { MessagesList, Message } from '../../dashboard/widgets/messages-list';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';
import { EmptyState } from '../../shared/empty-state/empty-state';

@Component({
  selector: 'app-projects-empty',
  standalone: true,
  imports: [DashPage, PanelHeader, MessagesList, ConversionBars, EmptyState],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class ProjectsEmpty {
  messages: Message[] = [
    { name: 'Nicholas Gordon', text: 'Moreover the striking, brilliant and vivid colors', time: '10m', initials: 'NG', color: 'linear-gradient(135deg,#f4be5e,#ff808b)' },
    { name: 'Douglas Payne', text: 'In the history of modern astronomy, there is small', time: '1hr', initials: 'DP', color: 'linear-gradient(135deg,#5e81f4,#9698d6)' },
    { name: 'Harriett Robbins', text: 'Advertising on a budget with a monthly frequency', time: '2hr', initials: 'HR', color: 'linear-gradient(135deg,#34b26b,#7ce7ac)' },
    { name: 'Polly Robbins', text: 'Search Engine Optimization And Advertising', time: '1hr', initials: 'PR', color: 'linear-gradient(135deg,#ff808b,#f4be5e)' },
    { name: 'Willie Holloway', text: 'Effective forms advertising internet web site performance', time: '2hr', initials: 'WH', color: 'linear-gradient(135deg,#9698d6,#5e81f4)' },
  ];

  constructor(private router: Router) {}

  onSetup(): void {
    this.router.navigate(['/projects/list-01']);
  }
}
