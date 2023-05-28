import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  private _totalPages = 1;
  private _currentPage = 1;
  interval = 5;
  lb = Math.max(1, this._currentPage - 2);
  ub = Math.min(this.lb + this.interval, this._totalPages + 1);
  pageNums = _.range(this.lb, Math.min(this.ub, this._totalPages + 1));
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  @Input()
  get totalPages(): number {
    return this.totalPages;
  }
  set totalPages(totalPages: number) {
    this._totalPages = totalPages;
  }

  @Input()
  get currentPage(): number {
    return this._currentPage;
  }
  set currentPage(currentPage: number) {
    this._currentPage = currentPage;
    this.lb = Math.max(1, this.currentPage - 2);
    this.ub = Math.min(this.lb + this.interval, this._totalPages + 1);
    this.pageNums = _.range(this.lb, this.ub);
  }

  @Output() pageChange = new EventEmitter<number>();

  incrementPage() {
    this.pageChange.emit(this._currentPage + 1);
  }

  decrementPage() {
    if (this._currentPage - 1 > 0) {
      this.pageChange.emit(this._currentPage - 1);
    }
  }

  setPage(pageNum: number) {
    this.pageChange.emit(pageNum);
  }
}
