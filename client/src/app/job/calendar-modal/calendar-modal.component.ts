import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
})
export class CalendarModalComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  @Output() closeModal = new EventEmitter();
  datepickerControl = new FormControl<Date>(new Date());
  dateRangeControl = new FormControl<'lte' | 'gte'>('lte');

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap) => {
      if (paramMap.has('created')) {
        const param = paramMap.get('created')!.split(',');
        if (param.length < 2) return;
        if (this.isIsoDate(param[1]))
          this.datepickerControl.setValue(new Date(param[1]));
        if (['lte', 'gte'].includes(param[0]))
          this.dateRangeControl.setValue(param[0] as 'lte' | 'gte');
      }
    });
  }

  submit() {
    const dt = this.datepickerControl.value;
    if (this.dateRangeControl.value === 'lte') {
      dt?.setHours(23, 59, 59, 999);
    } else {
      dt?.setHours(0, 0, 0, 0);
    }
    const result = this.dateRangeControl.value + ',' + dt?.toISOString();
    this.router.navigate([], {
      queryParams: {
        created: result,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  setModalClose() {
    this.closeModal.emit();
  }

  private isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str; // valid date
  }
}
