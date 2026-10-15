import { Component, Input } from '@angular/core';

/** Company / project switcher header used on top of info panels. */
@Component({
  selector: 'app-panel-header',
  standalone: true,
  template: `
    <div class="panel-header">
      <span class="panel-logo" [style.background]="logoTint || null" [style.color]="logoColor || null">{{ logo }}</span>
      <span class="panel-titles">
        <b>{{ title }}</b>
        <span>{{ sub }}</span>
      </span>
      <button class="panel-chevron" type="button" aria-label="Switch">
        <svg viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" /></svg>
      </button>
    </div>
  `,
  styles: [`
    .panel-header { display: flex; align-items: center; gap: 10px; }
    .panel-logo {
      width: 38px; height: 38px; flex: 0 0 38px;
      border-radius: 12px; background: var(--primary);
      color: #fff; font-weight: 900; font-size: 17px;
      display: grid; place-items: center;
    }
    .panel-titles { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
    .panel-titles b { font-size: 12px; white-space: nowrap; }
    .panel-titles span { font-size: 10px; color: var(--primary-grey); white-space: nowrap; }
    .panel-chevron {
      width: 28px; height: 28px; border: 0; border-radius: 8px;
      background: var(--bg-light); color: var(--primary-grey);
      cursor: pointer; display: grid; place-items: center;
    }
    .panel-chevron svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `],
})
export class PanelHeader {
  @Input() logo = 'C';
  @Input() logoTint = '';
  @Input() logoColor = '';
  @Input() title = '';
  @Input() sub = '';
}
