import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { ProjectInfoPanel } from '../../../shared/project-info-panel/project-info-panel';
import { DetailsTabs } from '../../../shared/details-tabs/details-tabs';
import { Pagination } from '../../../shared/pagination/pagination';
import { ProjectBrand } from '../../../shared/project-brand/project-brand';
import { AvatarStack } from '../../../shared/avatar-stack/avatar-stack';
import { DotsMenu } from '../../../shared/dots-menu/dots-menu';
import { DETAILS_INFO, DETAILS_FILES, DetailFile } from '../../details-data';

@Component({
  selector: 'app-project-files',
  standalone: true,
  imports: [DashPage, ProjectInfoPanel, DetailsTabs, Pagination, ProjectBrand, AvatarStack, FormsModule, DotsMenu],
  templateUrl: './files.html',
  styleUrl: './files.scss',
})
export class ProjectFiles {
  info = DETAILS_INFO;
  files: DetailFile[] = DETAILS_FILES.map((f) => ({ ...f }));
  page = 1;
  editing: string | null = null;
  draft = '';

  onEdit(f: DetailFile): void {
    this.editing = f.name;
    this.draft = f.name;
  }

  commitEdit(): void {
    if (this.editing === null) return;
    const next = this.draft.trim();
    if (next) {
      const target = this.files.find((x) => x.name === this.editing);
      if (target) target.name = next;
    }
    this.editing = null;
  }

  onRemove(f: DetailFile): void {
    if (this.editing === f.name) this.editing = null;
    this.files = this.files.filter((x) => x.name !== f.name);
  }
}
