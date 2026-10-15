import { Component } from '@angular/core';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { ProjectInfoPanel } from '../../../shared/project-info-panel/project-info-panel';
import { DetailsTabs } from '../../../shared/details-tabs/details-tabs';
import { SortControl } from '../../../shared/sort-control/sort-control';
import { AvatarStack } from '../../../shared/avatar-stack/avatar-stack';
import { DETAILS_INFO, DESK_COLUMNS } from '../../details-data';

@Component({
  selector: 'app-project-desk',
  standalone: true,
  imports: [DashPage, ProjectInfoPanel, DetailsTabs, SortControl, AvatarStack],
  templateUrl: './desk.html',
  styleUrl: './desk.scss',
})
export class ProjectDesk {
  info = DETAILS_INFO;
  columns = DESK_COLUMNS;
}
