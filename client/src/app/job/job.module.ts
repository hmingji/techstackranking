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

@NgModule({
  declarations: [ListComponent, JobComponent, DetailComponent, MapJoinPipe, CalendarModalComponent, TechStackModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: JobComponent }]),
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class JobModule {}
