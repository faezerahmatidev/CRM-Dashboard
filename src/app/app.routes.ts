import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Signin } from './auth/signin/signin';
import { Recover } from './auth/recover/recover';
import { Finish } from './auth/finish/finish';
import { Details } from './auth/details/details';
import { DashboardLayout } from './dashboard/dashboard-layout/dashboard-layout';
import { DashSales } from './dashboard/sales/sales';
import { DashOverview } from './dashboard/overview/overview';
import { DashOrders } from './dashboard/orders/orders';
import { DashEmpty } from './dashboard/empty/empty';
import { ProjectsLayout } from './projects/projects-layout/projects-layout';
import { ProjectsEmpty } from './projects/empty/empty';
import { ProjectsList01 } from './projects/list-01/list-01';
import { ProjectsGrid01 } from './projects/grid-01/grid-01';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signup', component: Signup },
  { path: 'signin', component: Signin },
  { path: 'recover', component: Recover },
  { path: 'finish', component: Finish },
  { path: 'details', component: Details },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: '', pathMatch: 'full', component: DashSales },
      { path: 'overview', component: DashOverview },
      { path: 'orders', component: DashOrders },
      { path: 'messages', component: DashEmpty },
    ],
  },
  {
    path: 'projects',
    component: ProjectsLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list-01' },
      { path: 'empty', component: ProjectsEmpty, data: { title: 'Projects' } },
      { path: 'list-01', component: ProjectsList01, data: { title: 'Projects' } },
      { path: 'grid-01', component: ProjectsGrid01, data: { title: 'Projects' } },
    ],
  },
  { path: '**', redirectTo: 'signin' },
];
