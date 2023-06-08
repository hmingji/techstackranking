import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  combineLatest,
  first,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Command, CommandResponse } from './command';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ScrapService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:80';

  private pageKeys: (string | null)[] = [null];
  private pageNumSubject = new BehaviorSubject<number>(1);
  private isLastPageSubject = new BehaviorSubject<boolean>(false);
  private loadCommandSubject = new Subject();

  private pageNumAction$ = this.pageNumSubject.asObservable();
  private isLastPageAction$ = this.isLastPageSubject.asObservable();
  private loadCommandAction$ = this.loadCommandSubject.asObservable();

  commands$ = combineLatest([
    this.pageNumAction$,
    this.loadCommandAction$,
  ]).pipe(
    switchMap(([pageNum, _]) => {
      const key = this.pageKeys[pageNum - 1];
      let params = new HttpParams();
      if (key) params.append('exclusiveStartKey', key);
      return this.http.get<CommandResponse>(`${this.apiUrl}/commands`, {
        params,
      });
    }),
    catchError(this.handleError),
    tap((r) => {
      this.pageNumAction$.pipe(first()).subscribe((pageNum) => {
        if (pageNum === this.pageKeys.length && r.lastEvaluationKey)
          this.pageKeys.push(r.lastEvaluationKey);
        if (
          pageNum < this.pageKeys.length &&
          this.pageKeys[pageNum] !== r.lastEvaluationKey
        )
          this.pageKeys[pageNum] = r.lastEvaluationKey;
        this.changeIsLastPage(!r.lastEvaluationKey ? true : false);
      });
    })
  );

  deleteCommand(command: Command) {
    const url = `${this.apiUrl}/${command.id!}`;
    return this.http.delete(url);
  }

  updateCommand(command: Command) {
    const url = `${this.apiUrl}/${command.id!}`;
    return this.http.put<Command>(url, command, httpOptions);
  }

  addCommand(command: Command) {
    return this.http.post<Command>(
      `${this.apiUrl}/commands`,
      command,
      httpOptions
    );
  }

  startScrap(id: string) {
    return this.http.get(`${this.apiUrl}/startscrap/${id}`);
  }

  changePageNum(val: number) {
    if (val - 1 <= this.pageKeys.length) this.pageNumSubject.next(val);
  }

  changeIsLastPage(val: boolean) {
    this.isLastPageSubject.next(val);
  }

  loadCommand() {
    this.loadCommandSubject.next(1);
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
