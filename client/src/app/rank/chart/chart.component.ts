import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { RankService } from '../rank.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  constructor(private rankService: RankService) {}
  barChartLegend = false;
  barChartPlugins = [];

  chartData$ = this.rankService.techStacks$.pipe(
    filter((res) => !!res),
    map(
      (res) =>
        ({
          labels: res.rows.map((t) => t.name),
          datasets: [
            {
              data: res.rows.map((t) => t.count),
              backgroundColor: 'rgb(104, 170,242)',
            },
          ],
        } as ChartConfiguration<'bar'>['data'])
    )
  );

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    aspectRatio: 1.5,
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        grid: {
          color: 'rgba(42, 43, 43)',
        },
      },
      y: {
        grid: {
          color: 'rgba(42, 43, 43)',
        },
        ticks: {
          color: 'rgb(255, 255, 255)',
          font: {
            family: 'Inter',
          },
        },
      },
    },
  };
}
