import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';

@Component({
  selector: 'app-debounced-input',
  templateUrl: './debounced-input.component.html',
  styleUrls: ['./debounced-input.component.scss'],
})
export class DebouncedInputComponent {
  //@Input() default?: string;
  @Input() placeholderText!: string;
  @Input() control!: FormControl;
  //input: string = '';
  //@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  faMagnifyingGlass = faMagnifyingGlass;
  //debounced = _.debounce((val) => this.valueChange.emit(val), 400);

  // ngOnInit(): void {
  //   if (this.default) this.input = this.default;
  // }

  // onValueChange() {
  //   this.debounced(this.input);
  // }
}
