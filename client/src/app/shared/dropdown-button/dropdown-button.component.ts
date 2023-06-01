import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
})
export class DropdownButtonComponent {
  @Input() title!: string;
  @Output() toggled = new EventEmitter();
  @Input() dropdownOpen!: boolean;
  faChevronDown = faChevronDown;

  toggleDropdown() {
    //this.dropdownOpen = !this.dropdownOpen;
    this.toggled.emit();
  }

  // closeDropdown() {
  //   this.dropdownOpen = false;
  // }
}
