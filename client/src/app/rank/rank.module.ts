import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChartComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChartComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
    ]),
  ],
})
export class RankModule {}
