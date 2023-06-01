import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { FormArray, FormControl } from '@angular/forms';
import { TechStackNameAndId } from '../job';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(
    private jobService: JobService,
    private router: Router,
    private elementRef: ElementRef
  ) {}
  jobList$ = this.jobService.jobList$;
  totalPages$ = this.jobService.totalPages$;
  curPageNum$ = this.jobService.curPageNum$;

  pagination$ = combineLatest([this.totalPages$, this.curPageNum$]).pipe(
    map(([totalPages, curPageNum]) => ({ totalPages, curPageNum }))
  );

  //next add ordering adjust
  pageSizes = this.jobService.pageSizes;
  currentPageSizeTitle = this.pageSizes[0].toString().concat(' / page');

  setPageSize(pageSize: string) {
    this.currentPageSizeTitle = pageSize.toString().concat(' / page');
    this.jobService.changePageSize(parseInt(pageSize));
    this.router.navigate([], {
      queryParams: {
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
    this.elementRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  setPageNum(pageNum: number) {
    this.router.navigate([], {
      queryParams: {
        page: pageNum,
      },
      queryParamsHandling: 'merge',
    });
  }
}
