import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AppShell } from '../../shared/app-shell/app-shell';

@Component({
  selector: 'app-projects-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell],
  template: `
    <app-shell title="{{ title }}" activeIcon="briefcase" actionIcon="plus">
      <router-outlet />
    </app-shell>
  `,
})
export class ProjectsLayout implements OnInit {
  title = 'Projects';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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
