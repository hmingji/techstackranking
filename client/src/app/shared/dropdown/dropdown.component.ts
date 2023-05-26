import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() options!: any[];
  @Input() title!: string;
  @Input() default: any;
  @Output() currentValueChange: EventEmitter<string> = new EventEmitter();

  currentValue: string | undefined | number;
  dropdownOpen: boolean = false;
  get dropdownElement(): Element {
    return this.elem.nativeElement.querySelector('.dropdown-list');
  }
  constructor(private elem: ElementRef) {}
  ngOnInit(): void {
    if (this.default) this.currentValue = this.default;
  }

  closeDropdown() {
    this.dropdownElement.setAttribute('aria-expanded', 'false');
    this.dropdownOpen = false;
  }

  select(value: string) {
    this.currentValue = value;
    this.closeDropdown();
    this.currentValueChange.emit(this.currentValue);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropdownElement.setAttribute(
      'aria-expanded',
      this.dropdownOpen ? 'true' : 'false'
    );
  }
}
