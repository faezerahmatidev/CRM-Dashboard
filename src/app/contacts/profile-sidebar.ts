import { Component, Input } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';
import { ConversionBars } from '../dashboard/widgets/conversion-bars';
import { PROFILE } from './contacts-data';
import { avatar } from '../shared/avatar';

/** Profile info panel shared by the profile and settings views. */
@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [PanelHeader, ConversionBars],
  template: `
    <app-panel-header logo="C" [title]="name" [sub]="role" />

    <section>
      <h3 class="p-title">About</h3>
      <p class="p-text">{{ about }}</p>
    </section>

    <section>
      <h3 class="p-title">Members</h3>
      <div class="members-row">
        @for (m of members; track m) {
          <span class="mini-avatar" [style.background]="m.color">{{ m.initials }}</span>
        }
        <button class="add-btn" type="button" aria-label="Add member">+</button>
      </div>
    </section>

    <section>
      <h3 class="p-title">Contact details</h3>
      <ul class="details">
        <li>
          <svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 7.5 7.5 6 7.5-6"/></svg>
          {{ email }}
        </li>
        <li>
          <svg viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>
          {{ phone }}
        </li>
        <li>
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c-5.5 5-5.5 12 0 17M12 3.5c5.5 5 5.5 12 0 17"/></svg>
          {{ address }}
        </li>
      </ul>
    </section>

    <section>
      <h3 class="p-title">Categories</h3>
      <div class="pills">
        <span>Designers</span>
        <span>Employees</span>
      </div>
    </section>

    <section>
      <h3 class="p-title">Overall progress</h3>
      <div class="overall">
        <span class="overall-top"><span>Tasks</span><b>96 <span>/ 148</span></b></span>
        <span class="overall-bar"><span style="width: 65%"></span></span>
      </div>
    </section>

    @if (chart === 'area') {
      <section>
        <h3 class="widget-title">Conversion history</h3>
        <p class="conv-sub">Week to week performance</p>
        <svg class="area-chart" viewBox="0 0 220 110" role="img" aria-label="Conversion area chart">
          <defs>
            <linearGradient id="profile-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#5e81f4" stop-opacity="0.85" />
              <stop offset="1" stop-color="#5e81f4" stop-opacity="0.55" />
            </linearGradient>
          </defs>
          <path
            d="M 0,95 C 25,90 30,60 55,58 C 80,56 85,80 110,72 C 135,64 140,40 165,44 C 190,48 195,70 220,66 L 220,110 L 0,110 Z"
            fill="url(#profile-area)"
          />
        </svg>
      </section>
    } @else {
      <app-conversion-bars title="Conversion history" sub="Week to week performance" />
      <div class="sales-row">
        <span><b>$342.000</b><span>Total sales</span></span>
        <span><b>$200.000</b><span>Spendings</span></span>
      </div>
    }
  `,
  styles: [`
    .p-title { font-size: 11.5px; font-weight: 900; margin: 0 0 8px; }
    .p-text { font-size: 10.5px; line-height: 1.7; color: var(--primary-grey); margin: 0; }
    .members-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .mini-avatar {
      width: 30px; height: 30px; border-radius: 50%;
      color: #fff; font-size: 10px; font-weight: 900;
      display: grid; place-items: center;
    }
    .add-btn {
      width: 30px; height: 30px; border-radius: 50%;
      border: 1px dashed var(--outline); background: transparent;
      color: var(--primary-grey); font-size: 15px; cursor: pointer;
    }
    .details { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .details li { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 700; }
    .details svg {
      width: 15px; height: 15px; flex: 0 0 15px;
      stroke: var(--primary-grey); fill: none; stroke-width: 1.7;
      stroke-linecap: round; stroke-linejoin: round;
    }
    .pills { display: flex; gap: 8px; }
    .pills span {
      font-size: 10.5px; font-weight: 700; color: var(--primary-grey);
      background: var(--bg-light); border-radius: 7px; padding: 8px 16px;
    }
    .overall {
      background: var(--bg-light); border-radius: 10px; padding: 12px 14px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .overall-top { display: flex; justify-content: space-between; font-size: 10.5px; color: var(--primary-grey); }
    .overall-top b { color: var(--primary-dark); }
    .overall-top b span { color: var(--primary-grey); font-weight: 400; }
    .overall-bar { height: 4px; border-radius: 2px; background: var(--outline); overflow: hidden; }
    .overall-bar span { display: block; height: 100%; background: var(--primary); border-radius: 2px; }
    .conv-sub { font-size: 10px; color: var(--primary-grey); margin: 2px 0 8px; }
    .area-chart { width: 100%; height: auto; display: block; border-radius: 0 0 10px 10px; }
    .sales-row {
      display: grid; grid-template-columns: 1fr 1fr;
      margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--outline);
    }
    .sales-row > span { display: flex; flex-direction: column; align-items: center; gap: 2px; }
    .sales-row b { font-size: 13px; }
    .sales-row span span { font-size: 10px; color: var(--primary-grey); }
  `],
})
export class ProfileSidebar {
  @Input() name = PROFILE.name;
  @Input() role = PROFILE.role;
  @Input() email = PROFILE.email;
  @Input() phone = PROFILE.phone;
  @Input() address = PROFILE.address;
  @Input() about = PROFILE.about;
  @Input() chart: 'area' | 'bars' = 'area';

  members = [
    avatar('NG', 0), avatar('DP', 1), avatar('HR', 2),
    avatar('PR', 3), avatar('WH', 4), avatar('AT', 5),
  ];
}
