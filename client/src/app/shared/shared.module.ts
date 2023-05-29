import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClickOutsideDirective } from './click-outside.directive';
import { PaginatorComponent } from './paginator/paginator.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MonthComponent } from './calendar/month/month.component';
import { MonthHeaderComponent } from './calendar/month-header/month-header.component';
import { DaysOfWeekComponent } from './calendar/days-of-week/days-of-week.component';
import { MonthAndYearPipe } from './calendar/month-and-year/month-and-year.pipe';
import { DebouncedInputComponent } from './debounced-input/debounced-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DropdownComponent,
    ClickOutsideDirective,
    PaginatorComponent,
    CalendarComponent,
    MonthComponent,
    MonthHeaderComponent,
    DaysOfWeekComponent,
    MonthAndYearPipe,
    DebouncedInputComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  exports: [
    DropdownComponent,
    ClickOutsideDirective,
    PaginatorComponent,
    CalendarComponent,
    DebouncedInputComponent,
  ],
})
export class SharedModule {}
