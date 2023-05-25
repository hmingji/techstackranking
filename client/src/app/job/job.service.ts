import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { JobResponse } from './job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  private apiUrl = 'http://localhost:80/jobs';

  joblist$ = this.route.queryParamMap.pipe(
    switchMap((paramMap) => {
      let params = new HttpParams();
      if (paramMap.has('entry'))
        params = params.append('entry', paramMap.get('entry')!);
      if (paramMap.has('techstacks'))
        params = params.append('techstacks', paramMap.get('techstacks')!);
      if (paramMap.has('created'))
        params = params.append('created', paramMap.get('created')!);
      if (paramMap.has('company'))
        params = params.append('company', paramMap.get('company')!);

      return this.http.get<JobResponse>(this.apiUrl, {
        params,
      });
    }),
    tap((r) => console.log(r)),
    catchError(this.handleError)
  );

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
