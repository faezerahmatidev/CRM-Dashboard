import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Signin } from './auth/signin/signin';
import { Recover } from './auth/recover/recover';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signup', component: Signup },
  { path: 'signin', component: Signin },
  { path: 'recover', component: Recover },
  { path: '**', redirectTo: 'signin' },
];
