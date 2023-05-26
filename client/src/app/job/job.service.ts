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
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { JobDetailResponse, JobResponse } from './job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  private apiUrl = 'http://localhost:80/jobs';
  pageSizes = [15, 25, 50];
  private pageSizeSubject = new BehaviorSubject<number>(this.pageSizes[0]);
  pageSizeAction$ = this.pageSizeSubject.asObservable();

  jobList$ = combineLatest([
    this.route.queryParamMap,
    this.pageSizeAction$,
  ]).pipe(
    switchMap(([paramMap, pageSize]) => {
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
      return this.http.get<JobResponse>(this.apiUrl, {
        params,
      });
    }),
    tap((r) => console.log(r)),
    catchError(this.handleError)
  );

  jobDetail$ = this.route.queryParamMap.pipe(
    filter((paramMap) => !!paramMap.get('jd')),
    switchMap((paramMap) =>
      this.http
        .get<JobDetailResponse>(`${this.apiUrl}/${paramMap.get('jd')}`)
        .pipe(catchError(this.handleError))
    )
  );

  changePageSize(size: number): void {
    this.pageSizeSubject.next(size);
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
