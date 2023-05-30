import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-as-badge',
  templateUrl: './checkbox-as-badge.component.html',
  styleUrls: ['./checkbox-as-badge.component.scss'],
})
export class CheckboxAsBadgeComponent {
  @Input() control!: FormControl;
  @Input() name!: string;
  @Input() value!: string;
}
