import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { JobComponent } from './job.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [
    ListComponent,
    JobComponent,
    DetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JobModule { }
