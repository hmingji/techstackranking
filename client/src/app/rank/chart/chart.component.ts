import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['React', 'Vue.js', 'Java', 'Python', 'AWS', 'Docker', 'CI/CD'], //tech stack
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgb(104, 170,242)',
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
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
