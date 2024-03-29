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
import { SearchInputComponent } from './search-input/search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionableBadgeComponent } from './actionable-badge/actionable-badge.component';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';

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
    SearchInputComponent,
    ActionableBadgeComponent,
    DropdownButtonComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [
    DropdownComponent,
    ClickOutsideDirective,
    PaginatorComponent,
    CalendarComponent,
    SearchInputComponent,
    ActionableBadgeComponent,
    DropdownButtonComponent,
  ],
})
export class SharedModule {}
