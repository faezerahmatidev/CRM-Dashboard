import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthLayout } from '../auth-layout/auth-layout';
import { AuthSocial } from '../auth-social';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthLayout, AuthSocial, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  constructor(private router: Router) {}

  onSubmit(): void {
    this.router.navigate(['/details']);
  }
}
