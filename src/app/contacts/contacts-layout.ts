import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AppShell } from '../shared/app-shell/app-shell';
import { ContactModal } from './contact-modal/contact-modal';
import { ContactsStore } from './contacts-store';

@Component({
  selector: 'app-contacts-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, ContactModal],
  template: `
    <app-shell title="{{ title }}" activeIcon="team" actionIcon="plus" (action)="store.openNew()">
      <router-outlet />
    </app-shell>
    <app-contact-modal
      [open]="store.modalOpen()"
      (openChange)="store.setModalOpen($event)"
      [contact]="store.selected()"
    />
  `,
})
export class ContactsLayout implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected store = inject(ContactsStore);

  title = 'Contacts';

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
