import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-welcome',
  standalone: true,
  template: `
    <div>
      <div class="welcome-logo">C</div>
      <p class="welcome-sub">Welcome,</p>
      <p class="welcome-name">CRAFTUI</p>
    </div>
  `,
})
export class DashWelcome {}
