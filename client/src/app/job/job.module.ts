import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { JobComponent } from './job.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListComponent, JobComponent, DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: JobComponent }]),
  ],
})
export class JobModule {}
