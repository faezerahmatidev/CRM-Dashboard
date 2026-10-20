import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AppShell } from '../shared/app-shell/app-shell';
import { NotificationsStore } from './notifications-store';

@Component({
  selector: 'app-notifications-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell],
  template: `
    <app-shell title="{{ title }}" activeIcon="activity">
      <router-outlet />
    </app-shell>
  `,
})
export class NotificationsLayout implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected store = inject(NotificationsStore);

  title = 'Notifications';

  ngOnInit(): void {
    this.updateTitle();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
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
