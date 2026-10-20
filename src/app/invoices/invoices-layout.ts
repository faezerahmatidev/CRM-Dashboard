import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AppShell } from '../shared/app-shell/app-shell';
import { InvoiceModal } from './invoice-modal/invoice-modal';
import { InvoicesStore } from './invoices-store';

@Component({
  selector: 'app-invoices-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, InvoiceModal],
  template: `
    <app-shell title="{{ title }}" activeIcon="invoices" actionIcon="plus" (action)="goNew()" [showBack]="showBack" (back)="goList()">
      <router-outlet />
    </app-shell>
    <app-invoice-modal [open]="store.selected() !== null" />
  `,
})
export class InvoicesLayout implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected store = inject(InvoicesStore);

  title = 'Invoices';
  showBack = false;

  ngOnInit(): void {
    this.updateTitle();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
  }

  goNew(): void {
    this.router.navigate(['/invoices/new'], { replaceUrl: true });
  }

  goList(): void {
    this.router.navigate(['/invoices/list-01'], { replaceUrl: true });
  }

  private updateTitle(): void {
    let snap: ActivatedRouteSnapshot | null = this.route.snapshot.firstChild;
    while (snap) {
      const dataTitle: unknown = snap.data?.['title'];
      if (typeof dataTitle === 'string') this.title = dataTitle;
      snap = snap.firstChild;
    }
    this.showBack = this.router.url.startsWith('/invoices/new');
  }
}
