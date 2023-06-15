import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TechStackResponse } from './techstack';
import {
  BehaviorSubject,
  Observable,
  catchError,
  scan,
  switchMap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  private pageNumberSubject = new BehaviorSubject<number>(1);
  pageSize = 15;

  currentPage$ = this.pageNumberSubject.pipe(
    scan((acc, one) => {
      if (one === 0) {
        return 1;
      } else {
        return acc + one;
      }
    })
  );

  techStacks$ = this.http
    .get<TechStackResponse>(`${this.apiUrl}/techstacks`, {
      params: {
        limit: this.pageSize.toString(),
      },
    })
    .pipe(catchError(this.handleError));

  pagedTechStacks$ = this.currentPage$.pipe(
    switchMap((pageNum) =>
      this.http.get<TechStackResponse>(`${this.apiUrl}/techstacks`, {
        params: {
          limit: this.pageSize.toString(),
          offset: ((pageNum - 1) * 15).toString(),
        },
      })
    ),
    catchError(this.handleError)
  );

  incrementPage(amount: number): void {
    this.pageNumberSubject.next(amount);
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string = '';
    if (!(err instanceof HttpErrorResponse)) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.statusText}`;
    }
    console.error('error handler: ', err);
    return throwError(() => new Error(errorMessage));
  }
}
