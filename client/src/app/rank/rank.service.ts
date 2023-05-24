import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TechStack, TechStackResponse } from './techstack';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  scan,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  //next to do api call, add button and page number observable
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:80/techstacks';
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
    .get<TechStackResponse>(this.apiUrl, {
      params: {
        limit: this.pageSize.toString(),
      },
    })
    .pipe(catchError(this.handleError));

  pagedTechStacks$ = this.currentPage$.pipe(
    switchMap((pageNum) =>
      this.http.get<TechStackResponse>(this.apiUrl, {
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
