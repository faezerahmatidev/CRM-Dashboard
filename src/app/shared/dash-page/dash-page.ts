import { Component } from '@angular/core';

@Component({
  // Attribute selector: keeps .dash-grid on the host so layout CSS applies unchanged.
  selector: '[app-dash-page]',
  standalone: true,
  templateUrl: './dash-page.html',
})
export class DashPage {}
