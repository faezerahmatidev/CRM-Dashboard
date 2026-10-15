import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLayout } from '../auth-layout/auth-layout';
import { AuthField } from '../../shared/auth-field/auth-field';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [AuthLayout, FormsModule, AuthField],
  templateUrl: './finish.html',
  styleUrl: './finish.scss',
})
export class Finish {
  private router = inject(Router);


  onSubmit(): void {
    this.router.navigate(['/signin']);
  }
}
