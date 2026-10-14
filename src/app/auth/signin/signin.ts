import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthLayout } from '../auth-layout/auth-layout';
import { AuthSocial } from '../auth-social';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AuthLayout, AuthSocial, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  constructor(private router: Router) {}

  onSubmit(): void {
    this.router.navigate(['/dashboard']);
  }
}
