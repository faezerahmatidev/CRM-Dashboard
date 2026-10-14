import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashWelcome } from '../widgets/welcome';
import { MessagesList } from '../widgets/messages-list';
import { ConversionArea } from '../widgets/conversion-area';

@Component({
  selector: 'app-dash-empty',
  standalone: true,
  imports: [DashWelcome, MessagesList, ConversionArea],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class DashEmpty {
  constructor(private router: Router) {}

  onSetup(): void {
    this.router.navigate(['/details']);
  }
}
