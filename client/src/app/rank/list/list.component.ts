import { Component, OnDestroy, OnInit } from '@angular/core';
import { RankService } from '../rank.service';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  combineLatest,
  map,
} from 'rxjs';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private rankService: RankService) {}
  ngOnInit(): void {
    this.setPage(1);
  }

  pageSize = this.rankService.pageSize;
  totalResults$ = this.rankService.techStacks$.pipe(map((r) => r.count));
  totalPages$ = this.totalResults$.pipe(
    map((c) => Math.ceil(c / this.pageSize))
  );
  currentPage$ = this.rankService.currentPage$;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  techStacks$ = combineLatest([
    this.currentPage$,
    this.rankService.pagedTechStacks$,
  ]).pipe(
    map(([pageNum, techStacks]) =>
      techStacks.rows.map((t, i) => ({
        rank: (pageNum - 1) * this.pageSize + i + 1,
        name: t.name,
        count: t.count,
      }))
    ),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  disablePrevious$: Observable<boolean> = this.currentPage$.pipe(
    map((pageNumber) => pageNumber === 1)
  );

  disableNext$: Observable<boolean> = combineLatest([
    this.currentPage$,
    this.totalPages$,
  ]).pipe(map(([currentPage, totalPages]) => currentPage === totalPages));

  setPage(amount: number): void {
    this.rankService.incrementPage(amount);
  }
}
