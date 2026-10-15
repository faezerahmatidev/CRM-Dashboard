import { Component } from '@angular/core';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { ProjectInfoPanel } from '../../../shared/project-info-panel/project-info-panel';
import { DetailsTabs } from '../../../shared/details-tabs/details-tabs';
import { SortControl } from '../../../shared/sort-control/sort-control';
import { DETAILS_INFO, ACTIVITY_GROUPS } from '../../details-data';

@Component({
  selector: 'app-project-activity',
  standalone: true,
  imports: [DashPage, ProjectInfoPanel, DetailsTabs, SortControl],
  templateUrl: './activity.html',
  styleUrl: './activity.scss',
})
export class ProjectActivity {
  info = DETAILS_INFO;
  groups = ACTIVITY_GROUPS;
}
