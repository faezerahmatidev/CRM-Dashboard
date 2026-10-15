import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

/** On/off switch used for project rows and grid cards. */
@Component({
  selector: 'button[app-toggle]',
  standalone: true,
  template: `<span class="knob"></span>`,
  styles: [`
    :host {
      width: 38px; height: 21px; flex: 0 0 38px;
      border: 0; border-radius: 11px; background: #d9dcea;
      cursor: pointer; position: relative; padding: 0;
      transition: background 0.2s;
    }
    :host(.on) { background: #7ce7ac; }
    .knob {
      position: absolute; top: 2.5px; left: 3px;
      width: 16px; height: 16px; border-radius: 50%;
      background: #fff; transition: left 0.2s;
      box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
    }
    :host(.on) .knob { left: 19px; }
  `],
})
export class Toggle {
  @Input() checked = true;
  @Output() checkedChange = new EventEmitter<boolean>();

  @HostBinding('class.on')
  get isOn(): boolean {
    return this.checked;
  }

  @HostListener('click')
  toggle(): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
