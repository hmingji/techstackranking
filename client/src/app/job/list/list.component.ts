import { Component, ElementRef } from '@angular/core';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { combineLatest, first, map } from 'rxjs';
import { JobPageSize, PAGE_SIZES } from '../job';
import {
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';

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
  faSort = faSort;
  faSortDown = faSortDown;
  faSortUp = faSortUp;
  jobList$ = this.jobService.jobList$;
  totalPages$ = this.jobService.totalPages$;
  curPageNum$ = this.jobService.curPageNum$;

  pagination$ = combineLatest([this.totalPages$, this.curPageNum$]).pipe(
    map(([totalPages, curPageNum]) => ({ totalPages, curPageNum }))
  );

  sortAndOrder$ = combineLatest([
    this.jobService.sortAction$,
    this.jobService.orderAction$,
  ]).pipe(map(([sort, order]) => ({ sort, order })));

  pageSizes = PAGE_SIZES;
  currentPageSizeTitle = this.pageSizes[0].toString().concat(' / page');

  setPageSize(pageSize: string) {
    this.currentPageSizeTitle = pageSize.toString().concat(' / page');
    this.jobService.changePageSize(parseInt(pageSize) as JobPageSize);
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
    this.elementRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  toggleTechStackOrder() {
    combineLatest([this.jobService.sortAction$, this.jobService.orderAction$])
      .pipe(first())
      .subscribe(([sort, order]) => {
        if (sort !== 'techstack') {
          this.jobService.changeJobSort('techstack');
          this.jobService.changeJobOrder('desc');
          return;
        }
        if (order === 'desc') {
          this.jobService.changeJobOrder('asc');
          return;
        }
        this.jobService.changeJobSort(undefined);
        this.jobService.changeJobOrder(undefined);
      });
  }

  toggleCreatedOrder() {
    combineLatest([this.jobService.sortAction$, this.jobService.orderAction$])
      .pipe(first())
      .subscribe(([sort, order]) => {
        if (sort !== 'created') {
          this.jobService.changeJobSort('created');
          this.jobService.changeJobOrder('desc');
          return;
        }
        if (order === 'desc') {
          this.jobService.changeJobOrder('asc');
          return;
        }
        this.jobService.changeJobSort(undefined);
        this.jobService.changeJobOrder(undefined);
      });
  }

  setJobDetail(id: number) {
    this.router.navigate([], {
      queryParams: {
        jd: id,
      },
      queryParamsHandling: 'merge',
    });
    const smallScreen = window.innerWidth <= 900;
    if (smallScreen) this.jobService.changeShowList(false);
  }
}
