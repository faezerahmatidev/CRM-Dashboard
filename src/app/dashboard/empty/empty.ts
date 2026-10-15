import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashWelcome } from '../widgets/welcome';
import { MessagesList } from '../widgets/messages-list';
import { ConversionArea } from '../widgets/conversion-area';
import { DashPage } from '../../shared/dash-page/dash-page';
import { EmptyState } from '../../shared/empty-state/empty-state';

@Component({
  selector: 'app-dash-empty',
  standalone: true,
  imports: [DashWelcome, MessagesList, ConversionArea, DashPage, EmptyState],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
})
export class DashEmpty {
  private router = inject(Router);


  onSetup(): void {
    this.router.navigate(['/details']);
  }
}
