import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashPage } from '../../../shared/dash-page/dash-page';
import { ProductPanel } from '../../product-panel';

interface SettingsNav {
  path: string;
  title: string;
  sub: string;
}

@Component({
  selector: 'app-item-settings',
  standalone: true,
  imports: [DashPage, ProductPanel, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './settings-layout.html',
  styleUrl: './settings-layout.scss',
})
export class ItemSettings {
  nav: SettingsNav[] = [
    { path: 'general', title: 'General Information', sub: 'Profile foto, name & language' },
    { path: 'description', title: 'Item Description', sub: 'Detailed item description' },
    { path: 'shipping', title: 'Shipping Rates', sub: 'Setup shipping options' },
    { path: 'discount', title: 'Discount Codes', sub: 'Setup sales and promo codes' },
    { path: 'notifications', title: 'Notifications', sub: 'Set your email notifications' },
  ];
}
