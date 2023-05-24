import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ChartComponent, ListComponent],
  imports: [
    CommonModule,
    NgChartsModule,
    FontAwesomeModule,
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
