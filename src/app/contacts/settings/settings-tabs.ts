import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Toggle } from '../../shared/toggle/toggle';

const FORM_CSS = `
  .set-form { display: flex; flex-direction: column; gap: 4px; }
  .upload-box {
    border: 1px solid var(--outline);
    border-radius: 12px;
    min-height: 150px;
    display: grid;
    place-items: center;
    gap: 8px;
    color: var(--primary-dark);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.4px;
    cursor: pointer;
    background: #fff;
    margin-bottom: 10px;
  }
  .upload-box svg { width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 28px; }
  .field { display: flex; flex-direction: column; padding: 10px 0; border-bottom: 1.5px solid var(--outline); }
  .field > span:first-child { font-size: 11px; color: var(--primary-grey); margin-bottom: 6px; }
  .field-control { display: flex; align-items: center; gap: 10px; }
  .field-control input, .field-control select {
    flex: 1; border: 0; outline: none; background: transparent;
    font-size: 13px; font-weight: 700; font-family: inherit;
    color: var(--primary-dark); padding: 0; min-width: 0; appearance: none;
  }
  .field-icon { width: 16px; height: 16px; flex: 0 0 16px; stroke: var(--primary-grey); fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .form-actions { display: flex; gap: 12px; margin-top: auto; padding-top: 26px; }
  .form-actions .btn { flex: none; min-width: 170px; }
  .add-more {
    display: inline-flex; align-items: center; gap: 8px;
    border: 0; background: transparent; cursor: pointer;
    font-size: 11px; font-weight: 900; color: var(--primary-dark);
    padding: 14px 0; align-self: flex-start;
  }
  .add-more svg { width: 15px; height: 15px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; }
  .add-more:hover { color: var(--primary); }
`;

@Component({
  selector: 'app-settings-general',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="set-form" (ngSubmit)="$event.preventDefault()">
      <button class="upload-box" type="button">
        <svg viewBox="0 0 24 24"><path d="M7 18a4.5 4.5 0 1 1 .6-8.96A5.5 5.5 0 0 1 18.3 10H18a3.5 3.5 0 0 1 .5 6.96" /><path d="M12 12v8M8.5 15.5 12 12l3.5 3.5" /></svg>
        UPLOAD IMAGE
      </button>
      <div class="form-grid">
        <label class="field"><span>Full name</span><span class="field-control"><input [(ngModel)]="fullName" name="fullName" /></span></label>
        <label class="field"><span>Role</span><span class="field-control"><input [(ngModel)]="role" name="role" /></span></label>
        <label class="field"><span>Email</span><span class="field-control"><input [(ngModel)]="email" name="email" placeholder="Start typing..." /></span></label>
        <label class="field"><span>Phone</span><span class="field-control"><input [(ngModel)]="phone" name="phone" placeholder="Start typing..." /></span></label>
        <label class="field" style="grid-column: 1 / -1"><span>Address line</span><span class="field-control"><input [(ngModel)]="address" name="address" placeholder="Start typing..." /></span></label>
        <label class="field"><span>Language</span><span class="field-control">
          <select [(ngModel)]="language" name="language">
            <option>Select language</option><option>English</option><option>Persian</option>
          </select>
          <svg class="field-icon" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" /></svg>
        </span></label>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS],
})
export class SettingsGeneral {
  fullName = 'Eliza Gray';
  role = 'Developer';
  email = '';
  phone = '';
  address = '';
  language = 'Select language';
}

@Component({
  selector: 'app-settings-accounts',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="set-form" (ngSubmit)="$event.preventDefault()">
      @for (a of accounts; track a.name) {
        <div class="form-grid">
          <label class="field"><span>Account</span><span class="field-control"><input [(ngModel)]="a.name" [name]="'n' + $index" /></span></label>
          <label class="field"><span>Link</span><span class="field-control"><input [(ngModel)]="a.link" [name]="'l' + $index" placeholder="Start typing..." /></span></label>
        </div>
      }
      <button class="add-more" type="button" (click)="addRow()">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M12 8.5v7M8.5 12h7" /></svg>
        ADD MORE
      </button>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS],
})
export class SettingsAccounts {
  accounts = [
    { name: 'Facebook', link: 'fb.com/eliza.gray' },
    { name: 'Twitter', link: 'twitter.com/eliza.gray' },
    { name: 'Skype', link: 'eliza-gray' },
    { name: 'Behance', link: '' },
  ];

  addRow(): void {
    this.accounts.push({ name: '', link: '' });
  }
}

@Component({
  selector: 'app-settings-security',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="set-form" (ngSubmit)="$event.preventDefault()">
      <h3 class="set-title">Change password</h3>
      <div class="form-grid">
        <label class="field"><span>Current password</span><span class="field-control"><input type="password" value="????????" readonly /></span></label>
        <label class="field"><span>New password</span><span class="field-control"><input type="password" placeholder="Start typing..." /></span></label>
      </div>
      <h3 class="set-title">Security questions</h3>
      @for (q of questions; track $index) {
        <div class="form-grid">
          <label class="field"><span>Questions #{{ $index + 1 }}</span><span class="field-control"><input placeholder="Start typing..." /></span></label>
          <label class="field"><span>Answer</span><span class="field-control"><input placeholder="Start typing..." /></span></label>
        </div>
      }
      <button class="add-more" type="button" (click)="questions.push(1)">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M12 8.5v7M8.5 12h7" /></svg>
        ADD MORE
      </button>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS + `.set-title { font-size: 13px; font-weight: 900; margin: 14px 0 4px; }`],
})
export class SettingsSecurity {
  questions = [1, 1];
}

@Component({
  selector: 'app-settings-billing',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="set-form" (ngSubmit)="$event.preventDefault()">
      <h3 class="set-title">Payment details</h3>
      <ul class="pay-rows">
        <li><span>Payment method</span><span class="pay-right">MasterCard ending in 4078, exp: 08/2020 <button type="button">Update</button></span></li>
        <li><span>Billing period</span><span class="pay-right">Plan billed monthly <button type="button">Update</button></span></li>
        <li><span>License keys</span><span class="pay-right"><button type="button" class="link">Redeem a license key</button></span></li>
      </ul>
      <h3 class="set-title">Payment history</h3>
      <ul class="pay-rows">
        @for (h of history; track h.date) {
          <li><span class="muted">{{ h.date }}</span><span class="grow">{{ h.plan }}</span><b>{{ h.amount }}</b><button type="button" class="link">Invoice</button></li>
        }
      </ul>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS + `
    .set-title { font-size: 13px; font-weight: 900; margin: 14px 0 4px; }
    .pay-rows { list-style: none; margin: 0; padding: 0; border: 1px solid var(--outline); border-radius: 12px; }
    .pay-rows li { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-bottom: 1px solid var(--outline); font-size: 12px; }
    .pay-rows li:last-child { border-bottom: 0; }
    .pay-rows li > span:first-child { color: var(--primary-grey); min-width: 130px; }
    .pay-rows .muted { color: var(--primary-grey); min-width: 90px; }
    .pay-rows .grow { flex: 1; font-weight: 700; min-width: 0; }
    .pay-rows b { white-space: nowrap; }
    .pay-rows .pay-right { flex: 1; display: flex; justify-content: flex-end; align-items: center; gap: 16px; font-weight: 700; }
    .pay-rows button { border: 0; background: transparent; cursor: pointer; color: var(--primary); font-size: 11.5px; font-weight: 700; padding: 0; }
    .pay-rows button.link { color: var(--primary); }
  `],
})
export class SettingsBilling {
  history = [
    { date: '21 Oct 2018', plan: 'CRM Pro (9/21/2018 to 10/21/2019)', amount: '$34.00' },
    { date: '21 Sep 2018', plan: 'CRM Pro (8/21/2018 to 9/21/2019)', amount: '$34.00' },
    { date: '21 Aug 2018', plan: 'CRM Pro (7/21/2018 to 8/21/2019)', amount: '$34.00' },
  ];
}

@Component({
  selector: 'app-settings-notifications',
  standalone: true,
  imports: [FormsModule, Toggle],
  template: `
    <form class="set-form notif" (ngSubmit)="$event.preventDefault()">
      @for (n of rows; track n.title) {
        <label class="notif-row">
          <span class="notif-text"><b>{{ n.title }}</b><span>{{ n.sub }}</span></span>
          <button app-toggle type="button" [checked]="n.on" (checkedChange)="n.on = $event" [attr.aria-label]="n.title"></button>
        </label>
      }
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Update Settings</button>
        <button class="btn btn-rest" type="button">Cancel</button>
      </div>
    </form>
  `,
  styles: [FORM_CSS + `
    .notif-row {
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      padding: 18px 0; border-bottom: 1px solid var(--outline); cursor: pointer;
    }
    .notif-text { display: flex; flex-direction: column; gap: 3px; }
    .notif-text b { font-size: 12.5px; }
    .notif-text span { font-size: 11px; color: var(--primary-grey); }
  `],
})
export class SettingsNotifications {
  rows = [
    { title: 'Product updates', sub: 'Stair Lifts Feel The Freedom Of Your Home', on: true },
    { title: 'Product updates', sub: 'A Right Media Mix Can Make The Difference', on: false },
    { title: 'Comments', sub: 'Advertising Relationships Vs Business Decisions', on: false },
    { title: 'Notifications', sub: 'Creating Remarkable Poster Prints Through', on: false },
  ];
}
