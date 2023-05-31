import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-actionable-badge',
  templateUrl: './actionable-badge.component.html',
  styleUrls: ['./actionable-badge.component.scss'],
})
export class ActionableBadgeComponent {
  @Input() text!: string;
  @Output() clicked = new EventEmitter();
  faCircleXmark = faCircleXmark;

  onClick() {
    this.clicked.emit();
  }
}
