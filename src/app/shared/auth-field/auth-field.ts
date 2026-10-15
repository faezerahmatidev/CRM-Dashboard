import { Component, Input } from '@angular/core';

export type FieldIcon = 'user' | 'mail' | 'lock' | 'building' | 'users' | 'phone' | 'chevron' | 'briefcase';

@Component({
  selector: 'app-auth-field',
  standalone: true,
  templateUrl: './auth-field.html',
})
export class AuthField {
  @Input() label = '';
  @Input() fieldId = '';
  @Input() icon: FieldIcon = 'mail';
}
