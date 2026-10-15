import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { ProjectInfoPanel } from '../../../shared/project-info-panel/project-info-panel';
import { DetailsTabs } from '../../../shared/details-tabs/details-tabs';
import { AuthField } from '../../../shared/auth-field/auth-field';
import { DETAILS_INFO } from '../../details-data';

interface SettingsSection {
  icon: 'user' | 'apps' | 'privacy' | 'billing' | 'bell';
  title: string;
  sub: string;
}

@Component({
  selector: 'app-project-settings',
  standalone: true,
  imports: [FormsModule, DashPage, ProjectInfoPanel, DetailsTabs, AuthField],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class ProjectSettings {
  info = DETAILS_INFO;
  projectName = 'Behance Presentation';
  email = '';
  phone = '';
  assignee = '';
  activeSection = 'General Information';

  sections: SettingsSection[] = [
    { icon: 'user', title: 'General Information', sub: 'Main settings and details' },
    { icon: 'apps', title: 'Account & Apps', sub: 'Connected tools & services' },
    { icon: 'privacy', title: 'Privacy', sub: 'Private or public project' },
    { icon: 'billing', title: 'Billing', sub: 'Setup payment methods' },
    { icon: 'bell', title: 'Notifications', sub: 'Set your email notifications' },
  ];
}
