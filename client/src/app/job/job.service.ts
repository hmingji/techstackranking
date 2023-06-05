import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  filter,
  map,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  AllTechStacksResponse,
  JobDetailResponse,
  JobOrder,
  JobPageSize,
  JobResponse,
  JobSort,
  TechStackFilter,
  TechStackNameAndId,
} from './job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  private apiUrl = 'http://localhost:80';
  private pageSizeSubject = new BehaviorSubject<JobPageSize>(15);
  private sortSubject = new BehaviorSubject<JobSort>(undefined);
  private orderSubject = new BehaviorSubject<JobOrder>(undefined);

  private detailHeightSubject = new BehaviorSubject<number>(0);
  private showListSubject = new BehaviorSubject<boolean>(true);
  private smallScreenSubject = new BehaviorSubject<boolean>(false);

  pageSizeAction$ = this.pageSizeSubject.asObservable();
  sortAction$ = this.sortSubject.asObservable();
  orderAction$ = this.orderSubject.asObservable();

  detailHeightAction$ = this.detailHeightSubject.asObservable();
  showListAction$ = this.showListSubject.asObservable();
  smallScreenAction$ = this.smallScreenSubject.asObservable();

  techstacks$ = this.http
    .get<AllTechStacksResponse>(`${this.apiUrl}/techstacks/all`)
    .pipe(
      tap(() => console.log('requesting ts')),
      catchError(this.handleError),
      shareReplay()
    );

  jobList$ = combineLatest([
    this.route.queryParamMap,
    this.pageSizeAction$,
    this.sortAction$,
    this.orderAction$,
  ]).pipe(
    switchMap(([paramMap, pageSize, sort, order]) => {
      let params = new HttpParams();
      if (paramMap.has('entry'))
        params = params.append('entry', paramMap.get('entry')!);
      if (paramMap.has('techstacks'))
        params = params.append('techstacks', paramMap.get('techstacks')!);
      if (paramMap.has('created'))
        params = params.append('created', paramMap.get('created')!);
      if (paramMap.has('company'))
        params = params.append('company', paramMap.get('company')!);
      if (paramMap.has('page'))
        params = params.append(
          'offset',
          ((parseInt(paramMap.get('page')!) - 1) * pageSize).toString()
        );
      params = params.append('limit', pageSize.toString());
      if (sort) {
        params = params.append('sort', sort);
        params = params.append('order', order ?? 'desc');
      }

      return this.http.get<JobResponse>(`${this.apiUrl}/jobs`, {
        params,
      });
    }),
    tap((r) => console.log(r)),
    catchError(this.handleError)
  );

  totalResults$ = this.jobList$.pipe(map((res) => res.count));

  totalPages$ = combineLatest([this.totalResults$, this.pageSizeAction$]).pipe(
    map(([total, pageSize]) => Math.ceil(total / pageSize))
  );

  curPageNum$ = this.route.queryParamMap.pipe(
    map((paramMap) => parseInt(paramMap.get('page') ?? '1'))
  );

  jobDetail$ = this.route.queryParamMap.pipe(
    filter((paramMap) => !!paramMap.get('jd')),
    switchMap((paramMap) =>
      this.http
        .get<JobDetailResponse>(`${this.apiUrl}/jobs/${paramMap.get('jd')}`)
        .pipe(
          tap((r) => console.log(r)),
          catchError(this.handleError)
        )
    )
  );

  changePageSize(size: JobPageSize): void {
    this.pageSizeSubject.next(size);
  }

  changeJobSort(sort: JobSort) {
    this.sortSubject.next(sort);
  }

  changeJobOrder(order: JobOrder) {
    this.orderSubject.next(order);
  }

  changeDetailHeight(h: number) {
    this.detailHeightSubject.next(h);
  }

  changeShowList(v: boolean) {
    this.showListSubject.next(v);
  }

  changeSmallScreen(v: boolean) {
    this.smallScreenSubject.next(v);
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
