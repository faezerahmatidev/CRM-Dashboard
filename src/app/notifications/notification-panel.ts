import { Component } from '@angular/core';
import { PanelHeader } from '../shared/panel-header/panel-header';
import { AvatarStack } from '../shared/avatar-stack/avatar-stack';
import { ConversionBars } from '../dashboard/widgets/conversion-bars';
import { members } from '../shared/avatar';

/** Left project panel for the notifications views. */
@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [PanelHeader, AvatarStack, ConversionBars],
  template: `
    <app-panel-header logo="Be" title="Behance Presentation" sub="Design" />

    <section>
      <h3 class="p-title">Description</h3>
      <p class="p-text">
        Color is so powerful that it can persuade, motivate, inspire and touch people's soft
        spot the heart. This is the reason why understanding colors is pretty crucial in
        relating and communicating with other people. Not only that, it is also important to
        businesses.
      </p>
    </section>

    <section>
      <h3 class="p-title">Due to</h3>
      <div class="pills">
        <span>14 Aug 2018</span>
        <span>128 Files</span>
      </div>
    </section>

    <section>
      <h3 class="p-title">Assigned to</h3>
      <div class="stack-row">
        <app-avatar-stack [members]="assigned" [extra]="5" [size]="30" />
        <button class="add-btn" type="button" aria-label="Add member">+</button>
      </div>
    </section>

    <section>
      <h3 class="p-title">Client members</h3>
      <div class="stack-row">
        <app-avatar-stack [members]="clients" [extra]="5" [size]="30" />
        <button class="add-btn" type="button" aria-label="Add client member">+</button>
      </div>
    </section>

    <section>
      <h3 class="p-title">Overall progress</h3>
      <div class="overall">
        <span class="overall-top"><span>Spendings</span><b>$5600 <span>/ $9800</span></b></span>
        <span class="overall-bar"><span style="width: 57%"></span></span>
      </div>
    </section>

    <section>
      <h3 class="p-title">Tasks progress</h3>
      <p class="conv-sub">Week to week performance</p>
      <app-conversion-bars />
    </section>
  `,
  styles: [`
    .p-title { font-size: 11.5px; font-weight: 900; margin: 0 0 8px; }
    .p-text { font-size: 10.5px; line-height: 1.7; color: var(--primary-grey); margin: 0; }
    .pills { display: flex; gap: 8px; flex-wrap: wrap; }
    .pills span {
      font-size: 10.5px; font-weight: 700; color: var(--primary-grey);
      background: var(--bg-light); border-radius: 7px; padding: 8px 16px;
    }
    .stack-row { display: flex; align-items: center; gap: 8px; }
    .add-btn {
      width: 30px; height: 30px; border-radius: 50%;
      border: 1px dashed var(--outline); background: transparent;
      color: var(--primary-grey); font-size: 15px; cursor: pointer;
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
  `],
})
export class NotificationPanel {
  assigned = members(['NG', 'DP', 'HR', 'PR', 'WH']);
  clients = members(['AT', 'NG', 'DP']);
}
