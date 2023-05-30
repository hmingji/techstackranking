import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class ListComponent implements OnChanges, OnInit {
  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  options = ['a', 'b', 'c'];
  checkboxFormControl = new FormControl();
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.checkboxFormControl.value);
  }
  techstacks?: TechStackNameAndId[];
  techstackControls?: FormArray;
  ngOnInit(): void {
    this.jobService.techstacks$.subscribe((res) => {
      this.techstacks = res.rows;
      console.log(this.techstacks);
      //if (this.route.queryParamMap.subscribe())
    });

    combineLatest([this.jobService.techstacks$, this.route.queryParamMap]);
  }
  onClick() {
    console.log(this.techstacks);
    console.log(this.techstackControls);
  }

  jobList$ = this.jobService.jobList$;
  totalPages$ = this.jobService.totalPages$;
  curPageNum$ = this.jobService.curPageNum$;

  pagination$ = combineLatest([this.totalPages$, this.curPageNum$]).pipe(
    map(([totalPages, curPageNum]) => ({ totalPages, curPageNum }))
  );

  onValueChange(val: string) {
    console.log(val);
  }
  placeholderText = 'Search';
  //next => service and backend api need to add all tech stacks fetching
  //improvement => scroll to beginning of list upon change of page size or page num
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
