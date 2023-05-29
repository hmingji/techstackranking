import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateRange } from './date-range';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
})
export class CalendarModalComponent {
  @Input() date?: Date;
  @Input() range?: 'gte' | 'lte';
  //date2 = new Date('1995-12-17T03:24:00');
  @Output() dateRangeSubmit = new EventEmitter<DateRange>();
  datepickerControl = this.date
    ? new FormControl(this.date)
    : new FormControl();
  dateRangeControl = new FormControl(this.range ?? 'lte');

  submit() {
    // console.log(
    //   this.datepickerControl.value as Date,
    //   this.dateRangeControl.value
    // );
    this.dateRangeSubmit.emit({
      date: this.datepickerControl.value as Date,
      range: this.dateRangeControl.value!,
    });
  }
}
