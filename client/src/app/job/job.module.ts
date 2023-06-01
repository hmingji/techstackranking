import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { JobComponent } from './job.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { MapJoinPipe } from './map-join.pipe';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { TechStackModalComponent } from './tech-stack-modal/tech-stack-modal.component';
import { FilterSettingComponent } from './filter-setting/filter-setting.component';
import { ActiveFilterListComponent } from './active-filter-list/active-filter-list.component';
import { EntryModalComponent } from './entry-modal/entry-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ListComponent,
    JobComponent,
    DetailComponent,
    MapJoinPipe,
    CalendarModalComponent,
    TechStackModalComponent,
    FilterSettingComponent,
    ActiveFilterListComponent,
    EntryModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: JobComponent }]),
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class JobModule {}
