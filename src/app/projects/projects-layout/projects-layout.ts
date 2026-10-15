import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AppShell } from '../../shared/app-shell/app-shell';
import { ProjectModal } from '../project-modal/project-modal';
import { ProjectsStore } from '../projects-store';
import { blankProject } from '../projects-data';

@Component({
  selector: 'app-projects-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, ProjectModal],
  template: `
    <app-shell title="{{ title }}" activeIcon="briefcase" actionIcon="plus" (action)="modalOpen = true" [showBack]="showBack" (back)="goList()">
      <router-outlet />
    </app-shell>
    <app-project-modal [(open)]="modalOpen" (create)="onCreate($event)" />
  `,
})
export class ProjectsLayout implements OnInit {
  title = 'Projects';
  modalOpen = false;
  showBack = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: ProjectsStore,
  ) {}

  ngOnInit(): void {
    this.updateTitle();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
  }

  onCreate(name: string): void {
    this.store.add(blankProject(name));
    this.router.navigate(['/projects/list-01'], { replaceUrl: true });
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
