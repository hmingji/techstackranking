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
  //service and backend api need to add all tech stacks fetching
  //use route to navigate pagination (try)
  //add drop down and paginator
  pageSizes = this.jobService.pageSizes;
  currentPageSizeTitle = this.pageSizes[0].toString().concat(' / page');
  setPageSize(pageSize: string) {
    //console.log(pageSize);
    this.currentPageSizeTitle = pageSize.toString().concat(' / page');
    this.jobService.changePageSize(parseInt(pageSize));
    //use router to update the page num into 1
    this.router.navigate([], {
      queryParams: {
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
