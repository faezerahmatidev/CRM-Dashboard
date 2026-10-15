import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthLayout } from '../auth-layout/auth-layout';
import { AuthField } from '../../shared/auth-field/auth-field';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AuthLayout, RouterLink, FormsModule, AuthField],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  constructor(private router: Router) {}

  onSubmit(): void {
    this.router.navigate(['/finish']);
  }
}
