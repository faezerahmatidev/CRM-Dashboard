import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppShell } from '../../shared/app-shell/app-shell';
import { ProjectModal, SavePayload } from '../project-modal/project-modal';
import { ProjectsStore } from '../projects-store';

@Component({
  selector: 'app-projects-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, ProjectModal],
  template: `
    <app-shell title="{{ title }}" activeIcon="briefcase" actionIcon="plus" (action)="store.openNew()" [showBack]="showBack" (back)="goList()">
      <router-outlet />
    </app-shell>
    <app-project-modal
      [open]="store.modalOpen()"
      (openChange)="store.setModalOpen($event)"
      [editProject]="store.editing()"
      (save)="onSave($event)"
    />
  `,
})
export class ProjectsLayout implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected store = inject(ProjectsStore);

  title = 'Projects';
  showBack = false;

  ngOnInit(): void {
    this.updateTitle();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.updateTitle());
  }

  onSave(payload: SavePayload): void {
    if (payload.original) {
      this.store.update(payload.original, payload.project);
    } else {
      this.store.add(payload.project);
      this.router.navigate(['/projects/list-01'], { replaceUrl: true });
    }
    this.store.setModalOpen(false);
  }

  private updateTitle(): void {
    let snap: ActivatedRouteSnapshot | null = this.route.snapshot.firstChild;
    while (snap) {
      const dataTitle: unknown = snap.data?.['title'];
      if (typeof dataTitle === 'string') this.title = dataTitle;
      snap = snap.firstChild;
    }
    this.showBack = this.router.url.startsWith('/projects/details');
  }

  goList(): void {
    this.router.navigate(['/projects/list-01'], { replaceUrl: true });
  }
}
