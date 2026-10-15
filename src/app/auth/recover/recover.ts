import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLayout } from '../auth-layout/auth-layout';
import { AuthSocial } from '../auth-social';
import { AuthField } from '../../shared/auth-field/auth-field';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [AuthLayout, AuthSocial, FormsModule, AuthField],
  templateUrl: './recover.html',
  styleUrl: './recover.scss',
})
export class Recover {
  constructor(private router: Router) {}

  onSubmit(): void {
    this.router.navigate(['/signin']);
  }
}
