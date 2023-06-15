import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  first,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Command, CommandResponse } from './command';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

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
  private apiUrl = environment.apiUrl;

  private toastMessageSubject = new BehaviorSubject<string>('');
  private showToastSubject = new BehaviorSubject<boolean>(false);

  private pageKeys: (string | null)[] = [null];
  private pageNumSubject = new BehaviorSubject<number>(1);
  private isLastPageSubject = new BehaviorSubject<boolean>(false);
  private loadCommandSubject = new BehaviorSubject<void>(undefined);

  //todo: add pagination to command listing
  private pageNumAction$ = this.pageNumSubject.asObservable();
  private isLastPageAction$ = this.isLastPageSubject.asObservable();
  private loadCommandAction$ = this.loadCommandSubject.asObservable();
  toastMessage$ = this.toastMessageSubject.asObservable();
  showToast$ = this.showToastSubject.asObservable();

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
      console.log(r);
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
    const url = `${this.apiUrl}/commands/${command.id!}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  updateCommand(command: Command) {
    const url = `${this.apiUrl}/commands/${command.id!}`;
    return this.http
      .put<Command>(url, command, httpOptions)
      .pipe(catchError(this.handleError));
  }

  addCommand(command: Command) {
    return this.http
      .post<Command>(`${this.apiUrl}/commands`, command, httpOptions)
      .pipe(catchError(this.handleError));
  }

  pushToastNotification(message: string) {
    this.closeToastNotification();
    this.toastMessageSubject.next(message);
    this.showToastSubject.next(true);
    this.debouncedCloseToast();
  }

  closeToastNotification() {
    this.showToastSubject.next(false);
    this.toastMessageSubject.next('');
  }

  debouncedCloseToast = _.debounce(this.closeToastNotification, 3000);

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
    this.loadCommandSubject.next();
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
