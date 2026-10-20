import { Component, Input } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';
import { ConversionBars } from '../dashboard/widgets/conversion-bars';

interface Folder {
  title: string;
  sub: string;
}

/** Left info panel shared by the files views. */
@Component({
  selector: 'app-files-sidebar',
  standalone: true,
  imports: [PanelHeader, ConversionBars],
  template: `
    <app-panel-header logo="C" title="CRAFTUI LLC" sub="8484 Ross Wells" />

    <nav class="folders" aria-label="File folders">
      @for (f of folders; track f.title) {
        <button type="button" [class.active]="f.title === active" (click)="pick(f.title)">
          <span class="f-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4.5 7A1.5 1.5 0 0 1 6 5.5h5l2 2.5h5A1.5 1.5 0 0 1 19.5 9.5V16A1.5 1.5 0 0 1 18 17.5H6A1.5 1.5 0 0 1 4.5 16V7Z" /></svg>
          </span>
          <span class="f-titles">
            <b>{{ f.title }}</b>
            <span>{{ f.sub }}</span>
          </span>
        </button>
      }
    </nav>

    <section class="history">
      <app-conversion-bars title="Files history" sub="Week to week performance" />
      <div class="sales-row">
        <span><b>42.6 Gb</b><span>Files uploaded</span></span>
        <span><b>24.8 Gb</b><span>Files shared</span></span>
      </div>
    </section>
  `,
  styles: [`
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 12px; }
    .folders { display: flex; flex-direction: column; gap: 8px; }
    .folders button {
      display: flex; align-items: center; gap: 12px;
      border: 1px solid var(--outline); border-radius: 12px; background: #fff;
      padding: 13px 14px; cursor: pointer; text-align: left; font-family: inherit;
      color: inherit; width: 100%;
    }
    .folders button.active { border-color: var(--primary); box-shadow: 0 0 0 1px var(--primary); }
    .folders button:hover { border-color: var(--primary); }
    .f-icon {
      width: 34px; height: 34px; flex: 0 0 34px; border-radius: 9px;
      background: var(--bg-light); color: var(--primary-grey);
      display: grid; place-items: center;
    }
    .folders button.active .f-icon { color: var(--primary); }
    .f-icon svg {
      width: 16px; height: 16px; stroke: currentColor; fill: none;
      stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;
    }
    .f-titles { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .f-titles b { font-size: 11.5px; }
    .f-titles > span { font-size: 10px; color: var(--primary-grey); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sales-row {
      display: grid; grid-template-columns: 1fr 1fr;
      margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--outline);
    }
    .sales-row > span { display: flex; flex-direction: column; align-items: center; gap: 2px; }
    .sales-row b { font-size: 13px; }
    .sales-row span span { font-size: 10px; color: var(--primary-grey); }
  `],
})
export class FilesSidebar {
  @Input() active = 'My Files';

  folders: Folder[] = [
    { title: 'My Files', sub: 'Files that your own' },
    { title: 'Sharing', sub: 'Files that others share with you' },
    { title: 'Archieve', sub: 'Files that you store in archieve' },
    { title: 'Deleted Files', sub: 'Files that will be deleted soon' },
  ];

  pick(title: string): void {
    this.active = title;
  }
}
