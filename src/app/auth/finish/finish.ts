import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLayout } from '../auth-layout/auth-layout';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [AuthLayout, FormsModule],
  templateUrl: './finish.html',
  styleUrl: './finish.scss',
})
export class Finish {
  constructor(private router: Router) {}

  onSubmit(): void {
    this.router.navigate(['/signin']);
  }
}
