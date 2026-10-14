import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  @Input() illustration = 'assets/auth-signup.png';
  @Input() illustrationAlt = 'CRM illustration';
}
