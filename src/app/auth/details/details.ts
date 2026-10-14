import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthLayout } from '../auth-layout/auth-layout';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AuthLayout, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  constructor(private router: Router) {}

  onSubmit(): void {
    this.router.navigate(['/finish']);
  }
}
