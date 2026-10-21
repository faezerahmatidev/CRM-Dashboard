import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppShell } from '../shared/app-shell/app-shell';
import { UploadModal } from './upload-modal/upload-modal';
import { FilesStore } from './files-store';

@Component({
  selector: 'app-files-layout',
  standalone: true,
  imports: [RouterOutlet, AppShell, UploadModal],
  template: `
    <app-shell title="{{ title }}" activeIcon="files" actionIcon="plus" (action)="store.openUpload()" [showBack]="showBack" (back)="goGrid()">
      <router-outlet />
    </app-shell>
    <app-upload-modal [open]="store.modalOpen()" (openChange)="store.setModalOpen($event)" />
  `,
})
export class FilesLayout implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected store = inject(FilesStore);

  title = 'File Management';
  showBack = false;

  ngOnInit(): void {
    this.updateTitle();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.updateTitle());
  }

  goGrid(): void {
    this.router.navigate(['/files/grid'], { replaceUrl: true });
  }

  private updateTitle(): void {
    let snap: ActivatedRouteSnapshot | null = this.route.snapshot.firstChild;
    while (snap) {
      const dataTitle: unknown = snap.data?.['title'];
      if (typeof dataTitle === 'string') this.title = dataTitle;
      snap = snap.firstChild;
    }
    this.showBack = this.router.url.startsWith('/files/details');
  }
}
