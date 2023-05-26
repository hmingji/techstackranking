import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(private jobService: JobService, private router: Router) {}
  //next: do fetch and construct table first, and pagination
  jobList$ = this.jobService.jobList$;
  //use route to navigate pagination (try)
}
