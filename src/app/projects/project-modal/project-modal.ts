import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarStack } from '../../shared/avatar-stack/avatar-stack';
import { avatar } from '../details-data';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [FormsModule, AvatarStack],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.scss',
})
export class ProjectModal {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() create = new EventEmitter<string>();

  name = '';
  comment = '';
  assignees = [avatar('NG', 0), avatar('DP', 1), avatar('HR', 2), avatar('PR', 3)];

  close(): void {
    this.open = false;
    this.openChange.emit(false);
  }

  submit(): void {
    this.create.emit(this.name.trim() || 'New Project');
    this.name = '';
    this.comment = '';
    this.close();
  }
}
