import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Signin } from './auth/signin/signin';
import { Recover } from './auth/recover/recover';
import { Details } from './auth/details/details';
import { DashboardLayout } from './dashboard/dashboard-layout/dashboard-layout';
import { DashSales } from './dashboard/sales/sales';
import { DashOverview } from './dashboard/overview/overview';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signup', component: Signup },
  { path: 'signin', component: Signin },
  { path: 'recover', component: Recover },
  { path: 'details', component: Details },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: '', pathMatch: 'full', component: DashSales },
      { path: 'overview', component: DashOverview },
    ],
  },
  { path: '**', redirectTo: 'signin' },
];
