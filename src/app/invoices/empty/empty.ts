import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashPage } from '../../shared/dash-page/dash-page';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ViewCard } from '../../shared/view-card/view-card';
import { InvoicesSidebar } from '../invoices-sidebar';

@Component({
  selector: 'app-invoices-empty',
  standalone: true,
  imports: [DashPage, InvoicesSidebar, EmptyState, ViewCard],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class InvoicesEmpty {
  private router = inject(Router);

  onSetup(): void {
    this.router.navigate(['/invoices/new'], { replaceUrl: true });
  }
}
