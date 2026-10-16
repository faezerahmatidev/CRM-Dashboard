import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { ProfileSidebar } from '../profile-sidebar';

interface SettingsNav {
  path: string;
  title: string;
  sub: string;
}

@Component({
  selector: 'app-contact-settings',
  standalone: true,
  imports: [DashPage, ProfileSidebar, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './settings-layout.html',
  styleUrl: './settings-layout.scss',
})
export class ContactSettings {
  nav: SettingsNav[] = [
    { path: 'general', title: 'General Information', sub: 'Profile foto, name & language' },
    { path: 'accounts', title: 'Account & Apps', sub: 'Connected tools & services' },
    { path: 'security', title: 'Security', sub: 'Password & security questions' },
    { path: 'billing', title: 'Billing', sub: 'Setup payment methods' },
    { path: 'notifications', title: 'Notifications', sub: 'Set your email notifications' },
  ];
}
