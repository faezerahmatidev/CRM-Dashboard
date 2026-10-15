import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthLayout } from '../auth-layout/auth-layout';
import { AuthSocial } from '../auth-social';
import { AuthField } from '../../shared/auth-field/auth-field';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthLayout, AuthSocial, RouterLink, FormsModule, AuthField],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  constructor(private router: Router) {}

  onSubmit(): void {
    this.router.navigate(['/details']);
  }
}
