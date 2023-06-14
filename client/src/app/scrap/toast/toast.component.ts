import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() text!: string;
  @Output() closeToast = new EventEmitter();
  faXmark = faXmark;

  onCloseToast() {
    this.closeToast.emit();
  }
}
