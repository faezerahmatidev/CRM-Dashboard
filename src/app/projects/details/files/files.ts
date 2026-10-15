import { Component } from '@angular/core';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { ProjectInfoPanel } from '../../../shared/project-info-panel/project-info-panel';
import { DetailsTabs } from '../../../shared/details-tabs/details-tabs';
import { Pagination } from '../../../shared/pagination/pagination';
import { ProjectBrand } from '../../../shared/project-brand/project-brand';
import { AvatarStack } from '../../../shared/avatar-stack/avatar-stack';
import { DETAILS_INFO, DETAILS_FILES } from '../../details-data';

@Component({
  selector: 'app-project-files',
  standalone: true,
  imports: [DashPage, ProjectInfoPanel, DetailsTabs, Pagination, ProjectBrand, AvatarStack],
  templateUrl: './files.html',
  styleUrl: './files.scss',
})
export class ProjectFiles {
  info = DETAILS_INFO;
  files = DETAILS_FILES;
  page = 1;
}
