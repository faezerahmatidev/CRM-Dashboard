import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AppShell } from '../shared/app-shell/app-shell';
import { ComposeModal } from './compose-modal/compose-modal';
import { MessagesStore } from './messages-store';

@Component({
  selector: 'app-messages-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, ComposeModal],
  template: `
    <app-shell title="{{ title }}" activeIcon="messages" actionIcon="plus" (action)="store.openNew()">
      <router-outlet />
    </app-shell>
    <app-compose-modal [open]="store.modalOpen()" (openChange)="store.setModalOpen($event)" />
  `,
})
export class MessagesLayout implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected store = inject(MessagesStore);

  title = 'Messages';

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
