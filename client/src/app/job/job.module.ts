import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { JobComponent } from './job.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { MapJoinPipe } from './map-join.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListComponent, JobComponent, DetailComponent, MapJoinPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: JobComponent }]),
    SharedModule,
  ],
})
export class JobModule {}
