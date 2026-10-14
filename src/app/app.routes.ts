import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signup' },
  { path: 'signup', component: Signup },
  { path: '**', redirectTo: 'signup' },
];
