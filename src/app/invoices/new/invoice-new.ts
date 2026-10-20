import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashPage } from '../../shared/dash-page/dash-page';
import { InvoicesSidebar } from '../invoices-sidebar';
import { InvoiceSteps } from '../invoice-steps';

const FORM_CSS = `
  .set-form { display: flex; flex-direction: column; gap: 4px; }
  .upload-box {
    border: 1px solid var(--outline); border-radius: 12px; min-height: 130px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-size: 11px; font-weight: 900; letter-spacing: 0.4px; cursor: pointer; background: #fff;
    margin-bottom: 10px; font-family: inherit; color: var(--primary-dark);
  }
  .upload-box svg { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 28px; }
  .field { display: flex; flex-direction: column; padding: 10px 0; border-bottom: 1.5px solid var(--outline); }
  .field > span:first-child { font-size: 11px; color: var(--primary-grey); margin-bottom: 6px; }
  .field-control { display: flex; align-items: center; gap: 10px; }
  .field-control input, .field-control select {
    flex: 1; border: 0; outline: none; background: transparent;
    font-size: 13px; font-weight: 700; font-family: inherit;
    color: var(--primary-dark); padding: 0; min-width: 0; appearance: none;
  }
  .field-control input::placeholder { color: var(--primary-grey); font-weight: 400; }
  .field-icon { width: 16px; height: 16px; flex: 0 0 16px; stroke: var(--primary-grey); fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .form-actions { display: flex; gap: 12px; margin-top: auto; padding-top: 26px; }
  .form-actions .btn { flex: none; min-width: 170px; }
  .static-line { font-size: 13px; font-weight: 700; }
  .item-card { border: 1px solid var(--outline); border-radius: 12px; padding: 6px 18px 18px; margin-bottom: 14px; }
  .item-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--outline); margin-bottom: 6px; font-size: 11px; color: var(--primary-grey); }
  .remove-btn { display: inline-flex; align-items: center; gap: 6px; border: 0; background: transparent; cursor: pointer; font-size: 10.5px; font-weight: 900; color: var(--primary-dark); font-family: inherit; padding: 0; }
  .remove-btn:hover { color: #f0566b; }
  .remove-btn svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .add-more { display: inline-flex; align-items: center; gap: 8px; border: 0; background: transparent; cursor: pointer; font-size: 11px; font-weight: 900; color: var(--primary-dark); padding: 6px 0 14px; font-family: inherit; }
  .add-more:hover { color: var(--primary); }
  .add-more svg { width: 15px; height: 15px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; }
  .totals { list-style: none; margin: 0 0 0 auto; padding: 0; display: flex; flex-direction: column; gap: 8px; min-width: 220px; }
  .totals li { display: flex; justify-content: space-between; font-size: 12px; color: var(--primary-grey); }
  .totals li b { color: var(--primary-dark); }
  .totals .grand { font-weight: 900; }
  .totals .grand span, .totals .grand b { color: var(--primary-dark); }
`;

@Component({
  selector: 'app-invoice-new',
  standalone: true,
  imports: [FormsModule, DashPage, InvoicesSidebar, InvoiceSteps],
  template: `
    <div class="dash-grid" app-dash-page>
      <aside page-info class="info-panel">
        <app-invoices-sidebar />
      </aside>
      <div page-main class="dash-main">
        <div class="new-grid">
          <section class="dash-card">
            <form class="set-form" (ngSubmit)="$event.preventDefault()">
              <button class="upload-box" type="button">
                <svg viewBox="0 0 24 24"><path d="M7 18a4.5 4.5 0 1 1 .6-8.96A5.5 5.5 0 0 1 18.3 10H18a3.5 3.5 0 0 1 .5 6.96" /><path d="M12 12v8M8.5 15.5 12 12l3.5 3.5" /></svg>
                UPLOAD IMAGE
              </button>
              <div class="form-grid">
                <div class="field"><span>Invoice number</span><span class="static-line">AA-04-19-1890</span></div>
                <label class="field"><span>Template</span><span class="field-control">
                  <select [(ngModel)]="template" name="template"><option>Select invoice template</option><option>Standard</option></select>
                  <svg class="field-icon" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" /></svg>
                </span></label>
                <label class="field"><span>Company name</span><span class="field-control"><input [(ngModel)]="company" name="company" placeholder="Start typing..." /></span></label>
                <label class="field"><span>Date</span><span class="field-control"><input [(ngModel)]="date" name="date" placeholder="Select due date" /></span></label>
                <label class="field"><span>Business address</span><span class="field-control"><input [(ngModel)]="address" name="address" placeholder="Start typing..." /></span></label>
                <label class="field"><span>Country</span><span class="field-control">
                  <select [(ngModel)]="country" name="country"><option>Select country</option><option>England</option></select>
                  <svg class="field-icon" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" /></svg>
                </span></label>
                <label class="field"><span>City</span><span class="field-control">
                  <select [(ngModel)]="city" name="city"><option>Select city</option><option>Cardiff</option></select>
                  <svg class="field-icon" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" /></svg>
                </span></label>
                <label class="field"><span>Phone number</span><span class="field-control"><input [(ngModel)]="phone" name="phone" placeholder="Start typing..." /></span></label>
                <label class="field"><span>Email</span><span class="field-control"><input [(ngModel)]="email" name="email" placeholder="Start typing..." /></span></label>
                <label class="field"><span>Tax rate</span><span class="field-control"><input [(ngModel)]="tax" name="tax" placeholder="Start typing..." /></span></label>
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" type="submit">Save &amp; Send</button>
                <button class="btn btn-rest" type="button">Cancel</button>
              </div>
            </form>
          </section>
          <div class="new-side"><app-invoice-steps /></div>
        </div>
      </div>
    </div>
  `,
  styles: [FORM_CSS + `
    .new-grid { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 18px; flex: 1; min-height: 0; }
    .new-grid .dash-card { min-height: 0; overflow-y: auto; display: flex; flex-direction: column; }
    .new-grid .set-form { flex: 1; }
    .new-side { min-width: 0; }
    @media (max-width: 1100px) { .new-grid { grid-template-columns: minmax(0, 1fr); } }
  `],
})
export class InvoiceNew {
  template = 'Select invoice template';
  company = '';
  date = '';
  address = '';
  country = 'Select country';
  city = 'Select city';
  phone = '';
  email = '';
  tax = '';
}

@Component({
  selector: 'app-invoice-new-items',
  standalone: true,
  imports: [FormsModule, DashPage, InvoicesSidebar, InvoiceSteps],
  template: `
    <div class="dash-grid" app-dash-page>
      <aside page-info class="info-panel">
        <app-invoices-sidebar />
      </aside>
      <div page-main class="dash-main">
        <div class="new-grid">
          <section class="dash-card">
            <form class="set-form" (ngSubmit)="$event.preventDefault()">
              @for (item of items; track $index) {
                <div class="item-card">
                  <div class="item-head">
                    <span>Item</span>
                    <button class="remove-btn" type="button" (click)="removeItem($index)">
                      <svg viewBox="0 0 24 24"><rect x="5" y="6.5" width="14" height="13" rx="2"/><path d="M4 6.5h16M10 10.5v6M14 10.5v6"/></svg>
                      REMOVE
                    </button>
                  </div>
                  <div class="form-grid">
                    <label class="field"><span>Item description</span><span class="field-control"><input [(ngModel)]="item.desc" [name]="'desc' + $index" placeholder="Start typing..." /></span></label>
                    <span></span>
                    <label class="field"><span>Hours</span><span class="field-control"><input [(ngModel)]="item.hours" [name]="'h' + $index" placeholder="Start typing..." /></span></label>
                    <label class="field"><span>Rate</span><span class="field-control"><input [(ngModel)]="item.rate" [name]="'r' + $index" placeholder="Start typing..." /></span></label>
                  </div>
                  @if ($index === items.length - 1) {
                    <button class="add-more" type="button" (click)="addItem()">
                      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M12 8.5v7M8.5 12h7" /></svg>
                      ADD NEW ITEM
                    </button>
                  }
                </div>
              }
              <ul class="totals">
                <li><span>Subtotal</span><b>$11960</b></li>
                <li><span>Tax 10%</span><b>$1196</b></li>
                <li class="grand"><span>Total</span><b>$13156</b></li>
              </ul>
              <div class="form-actions">
                <button class="btn btn-primary" type="submit">Save &amp; Send</button>
                <button class="btn btn-rest" type="button">Cancel</button>
              </div>
            </form>
          </section>
          <div class="new-side"><app-invoice-steps /></div>
        </div>
      </div>
    </div>
  `,
  styles: [FORM_CSS + `
    .new-grid { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 18px; flex: 1; min-height: 0; }
    .new-grid .dash-card { min-height: 0; overflow-y: auto; display: flex; flex-direction: column; }
    .new-grid .set-form { flex: 1; }
    .new-side { min-width: 0; }
    @media (max-width: 1100px) { .new-grid { grid-template-columns: minmax(0, 1fr); } }
  `],
})
export class InvoiceNewItems {
  items = [
    { desc: 'CRM UI design', hours: '356', rate: '10' },
    { desc: 'CRM coding HTML & CSS', hours: '', rate: '' },
  ];

  addItem(): void {
    this.items.push({ desc: '', hours: '', rate: '' });
  }

  removeItem(i: number): void {
    if (this.items.length > 1) this.items.splice(i, 1);
  }
}
