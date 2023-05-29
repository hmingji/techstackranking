import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { startOfMonth, addMonths } from '../date-utils';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-month-header',
  templateUrl: './month-header.component.html',
  styleUrls: ['./month-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthHeaderComponent {
  @Input() month = startOfMonth(new Date());
  @Input() activeMonth?: Date = startOfMonth(new Date());
  @Input() showMonthStepper = true;
  @Input() monthAndYearFormat?: string;
  @Input() locale?: string;

  @Output() activeMonthChange = new EventEmitter<Date>();

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  stepMonth<Delta extends number>(delta: Delta) {
    const activeMonth = addMonths(this.activeMonth || new Date(), delta);
    this.activeMonthChange.emit(activeMonth);
  }
}
