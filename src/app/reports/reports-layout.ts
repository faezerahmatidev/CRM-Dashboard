import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppShell } from '../shared/app-shell/app-shell';

@Component({
  selector: 'app-reports-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell],
  template: `
    <app-shell title="{{ title }}" activeIcon="reports" [showAction]="false">
      <router-outlet />
    </app-shell>
  `,
})
export class ReportsLayout implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  title = 'Reports';

  ngOnInit(): void {
    this.updateTitle();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.updateTitle());
  }

  private updateTitle(): void {
    let snap: ActivatedRouteSnapshot | null = this.route.snapshot.firstChild;
    while (snap) {
      const dataTitle: unknown = snap.data?.['title'];
      if (typeof dataTitle === 'string') this.title = dataTitle;
      snap = snap.firstChild;
    }
  }
}
