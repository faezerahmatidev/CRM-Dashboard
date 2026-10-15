import { Component, Input } from '@angular/core';
import { PanelHeader } from '../panel-header/panel-header';
import { AvatarStack, StackMember } from '../avatar-stack/avatar-stack';
import { ConversionBars } from '../../dashboard/widgets/conversion-bars';

export interface DetailsInfo {
  logo: string;
  name: string;
  category: string;
  description: string;
  due: string;
  files: string;
  assigned: StackMember[];
  clients: StackMember[];
  spendings: string;
  spendPct: number;
}

/** Left info panel shared by all project-details views. */
@Component({
  selector: 'app-project-info-panel',
  standalone: true,
  imports: [PanelHeader, AvatarStack, ConversionBars],
  templateUrl: './project-info-panel.html',
  styleUrl: './project-info-panel.scss',
})
export class ProjectInfoPanel {
  @Input() info!: DetailsInfo;
}
